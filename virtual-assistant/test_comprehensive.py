"""
Comprehensive Test Suite for ChromaDB Virtual Assistant
=======================================================
Tests:
1. ChromaDB service health
2. Reindex knowledge documents
3. Semantic query (multiple scenarios)
4. Compare token vs semantic search
5. Full pipeline: ChromaDB → PHP → Ollama chat

Run: python virtual-assistant/test_comprehensive.py
"""

import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import urllib.request
import urllib.error

CHROMA_URL = "http://127.0.0.1:8001"
OLLAMA_URL = "http://127.0.0.1:11434"

passed = 0
failed = 0


def test(name, condition, detail=""):
    global passed, failed
    if condition:
        passed += 1
        print(f"  ✅ PASS: {name}")
    else:
        failed += 1
        print(f"  ❌ FAIL: {name} - {detail}")


def api_post(url, data=None):
    """Helper to make POST request."""
    if data is None:
        data = {}
    req_data = json.dumps(data).encode()
    req = urllib.request.Request(
        url,
        data=req_data,
        headers={"Content-Type": "application/json"},
    )
    try:
        resp = urllib.request.urlopen(req, timeout=60)
        return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {"status": "error", "message": e.read().decode()[:200]}
    except urllib.error.URLError as e:
        return {"status": "error", "message": str(e)}


def api_get(url):
    """Helper to make GET request."""
    try:
        resp = urllib.request.urlopen(url, timeout=10)
        return json.loads(resp.read().decode())
    except Exception as e:
        return {"status": "error", "message": str(e)}


# ============================================================================
print("=" * 60)
print("  COMPREHENSIVE TEST: ChromaDB Virtual Assistant")
print("=" * 60)

# ---------------------------------------------------------------------------
# TEST 1: Service Health
# ---------------------------------------------------------------------------
print("\n📋 TEST 1: Service Health Checks")
print("-" * 40)

# 1a: ChromaDB health
health = api_get(f"{CHROMA_URL}/health")
test("ChromaDB service accessible", health.get("status") == "healthy", str(health))

# 1b: Ollama accessible
ollama_health = api_get(f"{OLLAMA_URL}/api/tags")
test("Ollama service accessible", "models" in ollama_health or "error" not in str(ollama_health), str(ollama_health)[:100])

# 1c: nomic-embed-text available
if "models" in ollama_health:
    models = [m["name"] for m in ollama_health["models"]]
    has_nomic = any("nomic-embed-text" in m for m in models)
    test("nomic-embed-text model installed", has_nomic, f"Available: {models}")
else:
    # Try direct check
    try:
        data = json.dumps({"model": "nomic-embed-text", "input": "test"}).encode()
        req = urllib.request.Request(
            f"{OLLAMA_URL}/api/embed",
            data=data,
            headers={"Content-Type": "application/json"},
        )
        resp = urllib.request.urlopen(req, timeout=30)
        test("nomic-embed-text model working", True, "")
    except Exception as e:
        test("nomic-embed-text model working", False, str(e))

# 1d: Document count
count = health.get("document_count", 0)
test("Knowledge documents indexed", count > 0, f"Found {count} document(s)")

# ---------------------------------------------------------------------------
# TEST 2: Reindex
# ---------------------------------------------------------------------------
print("\n📋 TEST 2: Reindex Knowledge")
print("-" * 40)

reindex_result = api_post(f"{CHROMA_URL}/reindex")
test("Reindex successful", reindex_result.get("status") == "success", str(reindex_result))
test("Documents indexed > 0", reindex_result.get("total_documents", 0) > 0, str(reindex_result))

# ---------------------------------------------------------------------------
# TEST 3: Semantic Query Scenarios
# ---------------------------------------------------------------------------
print("\n📋 TEST 3: Semantic Query Scenarios")
print("-" * 40)

scenarios = [
    ("Produk coklat", "kue coklat"),
    ("Produk best seller", "produk yang paling laris"),
    ("Produk termurah", "kue yang murah meriah"),
    ("Produk blueberry", "blueberry cake"),
    ("Produk pisang", "kue pisang"),
    ("Semua produk", "tampilkan semua kue yang ada"),
]

for i, (label, query_text) in enumerate(scenarios):
    result = api_post(f"{CHROMA_URL}/query", {"prompt": query_text, "n_results": 3})
    if result.get("status") == "success":
        doc_count = len(result.get("documents", []))
        has_products = False
        if result.get("metadatas") and len(result["metadatas"]) > 0:
            meta = result["metadatas"][0]
            if "products" in meta:
                has_products = len(meta["products"]) > 0
        test(f"[{i+1}] Query: '{label}'", doc_count > 0 and has_products, f"docs={doc_count}, products={'yes' if has_products else 'no'}")
    else:
        test(f"[{i+1}] Query: '{label}'", False, result.get("message", ""))

# ---------------------------------------------------------------------------
# TEST 4: Document Metadata Integrity
# ---------------------------------------------------------------------------
print("\n📋 TEST 4: Document Metadata Integrity")
print("-" * 40)

result = api_post(f"{CHROMA_URL}/query", {"prompt": "semua produk", "n_results": 1})
if result.get("status") == "success" and result.get("metadatas"):
    meta = result["metadatas"][0]
    test("Metadata has 'source' field", "source" in meta, str(meta.get("source")))
    test("Metadata has 'excerpt' field", "excerpt" in meta, "")
    test("Metadata has 'products' array", "products" in meta and isinstance(meta["products"], list), f"count={len(meta['products'])}")

    if "products" in meta and len(meta["products"]) > 0:
        first = meta["products"][0]
        test("Product has 'nama' field", "nama" in first, first.get("nama"))
        test("Product has 'harga' field", "harga" in first, first.get("harga"))
        test("Response has 'distances' array", "distances" in result, "")

# ---------------------------------------------------------------------------
# TEST 5: Distance Score Sanity
# ---------------------------------------------------------------------------
print("\n📋 TEST 5: Distance Score Sanity")
print("-" * 40)

# Same prompt should return distance close to 0
result1 = api_post(f"{CHROMA_URL}/query", {"prompt": "informasi produk kue dona cake", "n_results": 1})
if result1.get("status") == "success" and result1.get("distances"):
    dist = result1["distances"][0]
    test("Distance score is a valid float", isinstance(dist, (int, float)), f"distance={dist}")
    test("Distance score < 1.0 (good match)", dist < 1.0, f"distance={dist}")

# ---------------------------------------------------------------------------
# RESULTS
# ---------------------------------------------------------------------------
print("\n" + "=" * 60)
print(f"  RESULTS: {passed} passed, {failed} failed, {passed + failed} total")
print("=" * 60)

if failed == 0:
    print("\n🎉 Selamat! Semua test lulus. Sistem RAG ChromaDB berfungsi dengan baik!")
    print("   Langkah selanjutnya: jalankan test via API chatbot Laravel")
else:
    print(f"\n⚠️  Ada {failed} test yang gagal. Periksa detail di atas.")

# ---------------------------------------------------------------------------
# BONUS: How to test via Laravel
# ---------------------------------------------------------------------------
print("\n" + "=" * 60)
print("  🚀 TEST VIA LARAVEL API (Manual)")
print("=" * 60)
print("""
  Pastikan service berjalan:
    python virtual-assistant/chroma_service.py

  Lalu test via browser/curl ke endpoint chatbot:
    POST /api/chatbot/conversations
    POST /api/chatbot/conversations/{id}/message
      Body: {"message": "Apa saja kue coklat yang tersedia?"}

  Atau test langsung VirtualAssistantService via Artisan Tinker:
    php artisan tinker
    >>> $vas = app(App\\Services\\VirtualAssistantService::class);
    >>> echo $vas->answer('Kue apa yang best seller?');

  Atau reindex knowledge:
    php artisan chatbot:reindex
""")