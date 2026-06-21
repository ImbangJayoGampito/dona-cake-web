"""
ChromaDB Service for Dona Cake Virtual Assistant
=================================================
Provides HTTP API for:
- POST /reindex  : Index all knowledge documents into ChromaDB
- POST /query    : Query ChromaDB for relevant documents

Uses Ollama nomic-embed-text for generating embeddings.
ChromaDB persists data to ./chroma_data directory.
"""

import json
import os
import glob
import time
import re
import logging
from typing import Optional

import chromadb
from chromadb.config import Settings
import requests
from flask import Flask, request, jsonify

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

CHROMADB_HOST = os.getenv("CHROMADB_HOST", "127.0.0.1")
CHROMADB_PORT = int(os.getenv("CHROMADB_PORT", "8001"))
CHROMADB_PERSIST_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "chroma_data"
)
COLLECTION_NAME = os.getenv("CHROMADB_COLLECTION", "dona_cake_knowledge")
KNOWLEDGE_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "knowledge"
)
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "nomic-embed-text")

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("chroma_service")

# ---------------------------------------------------------------------------
# Flask App
# ---------------------------------------------------------------------------

app = Flask(__name__)

# ---------------------------------------------------------------------------
# ChromaDB Client (lazy init per request to avoid forking issues)
# ---------------------------------------------------------------------------

_chroma_client: Optional[chromadb.Client] = None


def get_chroma_client() -> chromadb.Client:
    """Get or create the ChromaDB persistent client."""
    global _chroma_client
    if _chroma_client is None:
        os.makedirs(CHROMADB_PERSIST_DIR, exist_ok=True)
        _chroma_client = chromadb.PersistentClient(
            path=CHROMADB_PERSIST_DIR,
            settings=Settings(anonymized_telemetry=False),
        )
        logger.info(f"ChromaDB client initialized at {CHROMADB_PERSIST_DIR}")
    return _chroma_client


def get_or_create_collection():
    """Get existing collection or create a new one."""
    client = get_chroma_client()
    try:
        collection = client.get_collection(COLLECTION_NAME)
        logger.info(f"Using existing collection: {COLLECTION_NAME}")
        return collection
    except (ValueError, chromadb.errors.NotFoundError):
        collection = client.create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
        logger.info(f"Created new collection: {COLLECTION_NAME}")
        return collection


# ---------------------------------------------------------------------------
# Embedding via Ollama
# ---------------------------------------------------------------------------


def generate_embedding(text: str) -> list:
    """
    Generate embedding vector using Ollama's nomic-embed-text model.
    Returns a list of floats.
    """
    url = f"{OLLAMA_BASE_URL}/api/embed"
    payload = {
        "model": EMBEDDING_MODEL,
        "input": text,
    }

    response = requests.post(url, json=payload, timeout=30)
    response.raise_for_status()

    data = response.json()

    # Ollama /api/embed returns {"embeddings": [[...]]} or {"embedding": [...]}
    if "embeddings" in data and len(data["embeddings"]) > 0:
        return data["embeddings"][0]
    elif "embedding" in data:
        return data["embedding"]
    else:
        raise ValueError(
            f"Unexpected Ollama embedding response: {json.dumps(data)[:200]}"
        )


# ---------------------------------------------------------------------------
# Knowledge Document Loading & Parsing
# ---------------------------------------------------------------------------


def load_knowledge_files() -> list[dict]:
    """Load all knowledge files from the knowledge directory."""
    supported_extensions = {".txt", ".md", ".json", ".html", ".htm"}
    documents = []

    if not os.path.isdir(KNOWLEDGE_DIR):
        logger.warning(f"Knowledge directory not found: {KNOWLEDGE_DIR}")
        return documents

    for filepath in sorted(glob.glob(os.path.join(KNOWLEDGE_DIR, "**/*"), recursive=True)):
        if not os.path.isfile(filepath):
            continue
        ext = os.path.splitext(filepath)[1].lower()
        if ext not in supported_extensions:
            continue

        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read().strip()
            if not content:
                continue

            rel_path = os.path.relpath(filepath, KNOWLEDGE_DIR)
            normalized = re.sub(r"\s+", " ", content)
            excerpt = normalized[:600]

            products = parse_product_blocks(content)

            documents.append({
                "id": f"doc_{rel_path.replace(os.sep, '_').replace('.', '_')}",
                "source": rel_path,
                "content": normalized,
                "excerpt": excerpt,
                "products": products,
            })
            logger.info(f"Loaded: {rel_path} ({len(products)} products)")
        except Exception as e:
            logger.error(f"Error reading {filepath}: {e}")

    return documents


def parse_product_blocks(content: str) -> list[dict]:
    """Parse Nama:/Harga:/Keterangan: blocks into structured product list."""
    products = []
    blocks = re.split(r"---", content)

    for block in blocks:
        block = block.strip()
        if not block:
            continue

        nama = ""
        harga = ""
        keterangan = ""

        for line in block.split("\n"):
            line = line.strip()
            if line.startswith("Nama:"):
                nama = line[5:].strip()
            elif line.startswith("Harga:"):
                harga = line[6:].strip()
            elif line.startswith("Keterangan:"):
                keterangan = line[11:].strip()

        if nama and harga:
            products.append({
                "nama": nama,
                "harga": harga,
                "keterangan": keterangan,
            })

    return products


# ---------------------------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------------------------


@app.route("/reindex", methods=["POST"])
def reindex():
    """
    Re-index all knowledge documents into ChromaDB.
    1. Deletes existing collection
    2. Reloads all documents
    3. Generates embeddings via Ollama
    4. Stores in ChromaDB
    """
    logger.info("Starting reindex...")

    # Delete and recreate collection
    client = get_chroma_client()
    try:
        client.delete_collection(COLLECTION_NAME)
        logger.info(f"Deleted existing collection: {COLLECTION_NAME}")
    except (ValueError, chromadb.errors.NotFoundError):
        pass  # Collection didn't exist

    collection = get_or_create_collection()

    # Load documents
    documents = load_knowledge_files()
    if not documents:
        return jsonify({
            "status": "error",
            "message": "No documents found in knowledge directory",
        }), 400

    # Generate embeddings and store in ChromaDB
    ids = []
    embeddings = []
    metadatas = []
    documents_text = []

    for doc in documents:
        try:
            embedding = generate_embedding(doc["content"])
            ids.append(doc["id"])
            embeddings.append(embedding)
            metadatas.append({
                "source": doc["source"],
                "excerpt": doc["excerpt"],
                "products": json.dumps(doc["products"], ensure_ascii=False),
            })
            documents_text.append(doc["content"])
            logger.info(f"Embedded: {doc['source']}")
        except Exception as e:
            logger.error(f"Failed to embed {doc['source']}: {e}")

    if not ids:
        return jsonify({
            "status": "error",
            "message": "Failed to generate embeddings for any documents",
        }), 500

    # Batch add to ChromaDB (in chunks of 100)
    batch_size = 100
    for i in range(0, len(ids), batch_size):
        end = i + batch_size
        collection.add(
            ids=ids[i:end],
            embeddings=embeddings[i:end],
            metadatas=metadatas[i:end],
            documents=documents_text[i:end],
        )
        logger.info(f"Indexed batch {i//batch_size + 1}: {len(ids[i:end])} docs")

    return jsonify({
        "status": "success",
        "message": f"Successfully indexed {len(ids)} documents",
        "total_documents": len(ids),
    })


@app.route("/query", methods=["POST"])
def query():
    """
    Query ChromaDB for documents relevant to the given prompt.
    Input:  {"prompt": "...", "n_results": 3}
    Output: {"documents": [...], "metadatas": [...], "distances": [...]}
    """
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"status": "error", "message": "Missing 'prompt' in request body"}), 400

    prompt = data["prompt"]
    n_results = min(int(data.get("n_results", 3)), 20)

    logger.info(f"Query: prompt='{prompt[:50]}...' n_results={n_results}")

    try:
        collection = get_or_create_collection()

        # Generate embedding for the prompt
        query_embedding = generate_embedding(prompt)

        # Query ChromaDB
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            include=["documents", "metadatas", "distances"],
        )

        # Format response
        response_docs = []
        response_metadatas = []

        if results["ids"] and len(results["ids"][0]) > 0:
            for i in range(len(results["ids"][0])):
                meta = results["metadatas"][0][i] if results["metadatas"] else {}
                # Parse products JSON back to array
                if "products" in meta and isinstance(meta["products"], str):
                    try:
                        meta["products"] = json.loads(meta["products"])
                    except json.JSONDecodeError:
                        meta["products"] = []

                response_docs.append(results["documents"][0][i] if results["documents"] else "")
                response_metadatas.append(meta)

        return jsonify({
            "status": "success",
            "documents": response_docs,
            "metadatas": response_metadatas,
            "distances": results["distances"][0] if results["distances"] else [],
        })

    except Exception as e:
        logger.error(f"Query failed: {e}")
        return jsonify({
            "status": "error",
            "message": str(e),
        }), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    try:
        collection = get_or_create_collection()
        count = collection.count()
        return jsonify({
            "status": "healthy",
            "collection": COLLECTION_NAME,
            "document_count": count,
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
        }), 503


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    logger.info(f"Starting ChromaDB Service on {CHROMADB_HOST}:{CHROMADB_PORT}")
    logger.info(f"Knowledge directory: {KNOWLEDGE_DIR}")
    logger.info(f"ChromaDB persist dir: {CHROMADB_PERSIST_DIR}")
    logger.info(f"Embedding model: {EMBEDDING_MODEL} (via Ollama at {OLLAMA_BASE_URL})")

    # Ensure persist dir exists
    os.makedirs(CHROMADB_PERSIST_DIR, exist_ok=True)

    app.run(
        host=CHROMADB_HOST,
        port=CHROMADB_PORT,
        debug=False,
    )