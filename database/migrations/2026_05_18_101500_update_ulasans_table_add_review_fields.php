<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ulasans', function (Blueprint $table) {
            if (!Schema::hasColumn('ulasans', 'pelanggan_id')) {
                $table->foreignId('pelanggan_id')->constrained('pelanggans')->onDelete('cascade');
            }
            if (!Schema::hasColumn('ulasans', 'produk_id')) {
                $table->foreignId('produk_id')->constrained('produks')->onDelete('cascade');
            }
            if (!Schema::hasColumn('ulasans', 'rating')) {
                $table->unsignedTinyInteger('rating')->default(5);
            }
            if (!Schema::hasColumn('ulasans', 'komentar')) {
                $table->text('komentar')->nullable();
            }
            if (!Schema::hasColumn('ulasans', 'is_visible')) {
                $table->boolean('is_visible')->default(true);
            }
        });
    }

    public function down(): void
    {
        Schema::table('ulasans', function (Blueprint $table) {
            if (Schema::hasColumn('ulasans', 'is_visible')) {
                $table->dropColumn('is_visible');
            }
            if (Schema::hasColumn('ulasans', 'komentar')) {
                $table->dropColumn('komentar');
            }
            if (Schema::hasColumn('ulasans', 'rating')) {
                $table->dropColumn('rating');
            }
            if (Schema::hasColumn('ulasans', 'produk_id')) {
                $table->dropForeign(['produk_id']);
                $table->dropColumn('produk_id');
            }
            if (Schema::hasColumn('ulasans', 'pelanggan_id')) {
                $table->dropForeign(['pelanggan_id']);
                $table->dropColumn('pelanggan_id');
            }
        });
    }
};
