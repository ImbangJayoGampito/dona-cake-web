<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transaksis', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->after('id');
            $table->string('status_transaksi')->default('menunggu')->after('metode_pembayaran');
            $table->string('id_transaksi_gateway')->nullable()->after('status_transaksi');
        });
    }

    public function down(): void
    {
        Schema::table('transaksis', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'status_transaksi', 'id_transaksi_gateway']);
        });
    }
};