<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\UlasanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatbotLogController;
use App\Http\Controllers\GambarController;
use App\Http\Controllers\PelangganController;
use App\Http\Controllers\HistoriAktivitasController;
use App\Services\RecommendationService;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes - Dona Cake Backend
|--------------------------------------------------------------------------
*/

// Test endpoint
Route::get("/test", function () {
    return response()->json([
        "status" => "success",
        "message" => "Dona Cake API is running",
    ]);
});

// =========================================================================
// PUBLIC ROUTES (No authentication required)
// =========================================================================

// Auth routes
Route::prefix("auth")->group(function () {
    Route::post("/login", [ApiAuthController::class, "login"]);
    Route::post("/register", [ApiAuthController::class, "register"]);
});

// Public product catalog
Route::prefix("produk")->group(function () {
    Route::get("/", [ProdukController::class, "index"]);
    Route::get("/categories", [ProdukController::class, "categories"]);
    Route::get("/{produk}", [ProdukController::class, "show"]);
});

// Public reviews
Route::get("/ulasan", [UlasanController::class, "index"]);

// Popular products (for unauthenticated recommendations)
Route::get("/popular", function (RecommendationService $service) {
    $products = $service->getPopularProducts(10);
    return response()->json([
        "status" => "success",
        "data" => $products,
    ]);
});

// =========================================================================
// PROTECTED ROUTES (Authentication required via Sanctum)
// =========================================================================

Route::middleware("auth:sanctum")->group(function () {
    // ---- Auth Management ----
    Route::prefix("auth")->group(function () {
        Route::post("/logout", [ApiAuthController::class, "logout"]);
        Route::post("/logout-all", [ApiAuthController::class, "logoutAll"]);
        Route::get("/me", [ApiAuthController::class, "me"]);
        Route::post("/change-password", [
            ApiAuthController::class,
            "changePassword",
        ]);
        Route::put("/profile", [ApiAuthController::class, "updateProfile"]);
        Route::get("/from-token", [ApiAuthController::class, "fromToken"]);
    });

    // ---- Pelanggan Profile ----
    Route::prefix("pelanggan")->group(function () {
        Route::get("/profile", [PelangganController::class, "show"]);
        Route::put("/profile", [PelangganController::class, "update"]);
    });

    // ---- Produk Management (Admin & Karyawan) ----
    Route::prefix("produk")
        ->middleware("role:admin,karyawan")
        ->group(function () {
            Route::post("/", [ProdukController::class, "store"]);
            Route::put("/{produk}", [ProdukController::class, "update"]);
            Route::delete("/{produk}", [ProdukController::class, "destroy"]);
        });

    // ---- Keranjang (Cart) ----
    Route::prefix("keranjang")->group(function () {
        Route::get("/", [KeranjangController::class, "index"]);
        Route::post("/", [KeranjangController::class, "store"]);
        Route::put("/{keranjang}", [KeranjangController::class, "update"]);
        Route::delete("/{keranjang}", [KeranjangController::class, "destroy"]);
        Route::delete("/", [KeranjangController::class, "clear"]);
    });

    // ---- Pesanan (Orders) ----
    Route::prefix("pesanan")->group(function () {
        Route::get("/", [PesananController::class, "index"]);
        Route::post("/", [PesananController::class, "store"]);
        Route::get("/{pesanan}", [PesananController::class, "show"]);
        Route::post("/{pesanan}/cancel", [PesananController::class, "cancel"]);

        // Staff/Admin only
        Route::put("/{pesanan}/status", [
            PesananController::class,
            "update",
        ])->middleware("role:admin,karyawan");
    });

    // ---- Booking (Custom Orders) ----
    Route::prefix("booking")->group(function () {
        Route::get("/", [BookingController::class, "index"]);
        Route::post("/", [BookingController::class, "store"]);
        Route::get("/{booking}", [BookingController::class, "show"]);
        Route::post("/{booking}/cancel", [BookingController::class, "cancel"]);

        // Staff/Admin only
        Route::post("/{booking}/verify", [
            BookingController::class,
            "verify",
        ])->middleware("role:admin,karyawan");
    });

    // ---- Transaksi (Payments) ----
    Route::prefix("transaksi")->group(function () {
        Route::get("/", [TransaksiController::class, "index"]);
        Route::get("/{transaksi}", [TransaksiController::class, "show"]);
    });
    Route::post("/pesanan/{pesanan}/pay", [
        TransaksiController::class,
        "payOrder",
    ]);
    Route::post("/booking/{booking}/pay", [
        TransaksiController::class,
        "payBooking",
    ]);

    // ---- Ulasan (Reviews) ----
    Route::prefix("ulasan")->group(function () {
        
        Route::post("/", [UlasanController::class, "store"]);
        Route::put("/{ulasan}", [UlasanController::class, "update"]);
        Route::delete("/{ulasan}", [UlasanController::class, "destroy"]);

        // Admin only
        Route::post("/{ulasan}/toggle-visibility", [
            UlasanController::class,
            "toggleVisibility",
        ])->middleware("role:admin");
    });

    // ---- Notifikasi ----
    Route::prefix("notifikasi")->group(function () {
        Route::get("/", [NotifikasiController::class, "index"]);
        Route::post("/{notifikasi}/read", [
            NotifikasiController::class,
            "markAsRead",
        ]);
        Route::post("/read-all", [
            NotifikasiController::class,
            "markAllAsRead",
        ]);
        Route::get("/unread-count", [
            NotifikasiController::class,
            "unreadCount",
        ]);
    });

    // ---- Asisten Virtual (Chatbot) ----
    Route::prefix("chatbot")->group(function () {
        Route::get("/conversations", [ChatbotLogController::class, "index"]);
        Route::post("/conversations", [
            ChatbotLogController::class,
            "startConversation",
        ]);
        Route::post("/conversations/{chatbotLog}/message", [
            ChatbotLogController::class,
            "sendMessage",
        ]);
        Route::get("/conversations/{chatbotLog}", [
            ChatbotLogController::class,
            "show",
        ]);
        Route::post("/conversations/{chatbotLog}/reset", [
            ChatbotLogController::class,
            "resetConversation",
        ]);
        Route::post("/conversations/{chatbotLog}/report", [
            ChatbotLogController::class,
            "reportConversation",
        ]);
        Route::post("/conversations/{chatbotLog}/end", [
            ChatbotLogController::class,
            "endConversation",
        ]);

        // Admin: monitor conversations
        Route::get("/admin/conversations", [
            ChatbotLogController::class,
            "adminIndex",
        ])->middleware("role:admin");
        Route::get("/admin/conversations/{chatbotLog}", [
            ChatbotLogController::class,
            "adminShow",
        ])->middleware("role:admin");
    });

    // ---- Rekomendasi ----
    Route::prefix("rekomendasi")->group(function () {
        Route::get("/", function (
            RecommendationService $service,
            Request $request,
        ) {
            $products = $service->getRecommendations($request->user()->id);
            return response()->json([
                "status" => "success",
                "data" => $products,
            ]);
        });
        Route::get("/popular", function (RecommendationService $service) {
            $products = $service->getPopularProducts(10);
            return response()->json([
                "status" => "success",
                "data" => $products,
            ]);
        });
    });

    // ---- Histori Aktivitas (Track user activity) ----
    Route::prefix("aktivitas")->group(function () {
        Route::get("/", [HistoriAktivitasController::class, "index"]);
        Route::post("/", [HistoriAktivitasController::class, "store"]);
    });

    // ---- Gambar (Image upload/management) ----
    Route::prefix("gambar")->group(function () {
        Route::post("/upload", [GambarController::class, "upload"]);
        Route::delete("/{gambar}", [GambarController::class, "destroy"]);
    });

    // =====================================================================
    // STAFF/ADMIN ROUTES
    // =====================================================================
    Route::middleware("role:admin,karyawan")
        ->prefix("staff")
        ->group(function () {
            // Dashboard & Reports
            Route::get("/dashboard", [AdminController::class, "dashboard"]);

            // Financial Reports
            Route::get("/laporan/keuangan", [
                LaporanController::class,
                "financialSummary",
            ]);
            Route::get("/laporan/keuangan/chart", [
                LaporanController::class,
                "revenueChart",
            ]);
            Route::get("/laporan/perilaku-pelanggan", [
                LaporanController::class,
                "customerBehavior",
            ]);

            // Production Queue (KDS - Kitchen Display System)
            Route::get("/produksi/antrean", [
                LaporanController::class,
                "productionQueue",
            ]);
        });

    // =====================================================================
    // ADMIN ONLY ROUTES
    // =====================================================================
    Route::middleware("role:admin")
        ->prefix("admin")
        ->group(function () {
            // User Management
            Route::get("/users", [AdminController::class, "users"]);
            Route::post("/users", [AdminController::class, "createUser"]);
            Route::put("/users/{user}/role", [
                AdminController::class,
                "updateRole",
            ]);
            Route::delete("/users/{user}", [
                AdminController::class,
                "deleteUser",
            ]);

            // Admin dashboard
            Route::get("/dashboard", [AdminController::class, "dashboard"]);
        });
});
