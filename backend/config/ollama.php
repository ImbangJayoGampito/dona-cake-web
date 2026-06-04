<?php

return [
    'base_url' => env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'),
    'model' => env('OLLAMA_MODEL', 'llama2'),
    'max_tokens' => env('OLLAMA_MAX_TOKENS', 512),
    'temperature' => env('OLLAMA_TEMPERATURE', 0.2),
];
