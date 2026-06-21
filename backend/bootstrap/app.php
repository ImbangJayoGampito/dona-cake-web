<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

if (!class_exists('RequestParseBodyException')) {
    class RequestParseBodyException extends \Exception {}
}

if (!function_exists('request_parse_body')) {
    function request_parse_body(): array {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        $post = [];
        $files = [];

        if (str_contains($contentType, 'application/x-www-form-urlencoded')) {
            parse_str(file_get_contents('php://input'), $post);
        }

        return [$post ?: $_POST, $files ?: $_FILES];
    }
}


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
