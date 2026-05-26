<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('histori_aktivitas', function (Blueprint $table) {
            $table->string('produk_terkait')->nullable()->after('jenis_aktivitas');
            $table->float('bobot_interaksi')->default(0)->after('produk_terkait');
        });
    }

    public function down(): void
    {
        Schema::table('histori_aktivitas', function (Blueprint $table) {
            $table->dropColumn(['produk_terkait', 'bobot_interaksi']);
        });
    }
};