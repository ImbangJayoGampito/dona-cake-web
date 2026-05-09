<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->constrained('pelanggans')->onDelete('cascade');
            $table->foreignId('transaksi_id')->nullable()->constrained('transaksis')->onDelete('set null');
            $table->string('desain_custom_url')->nullable();
            $table->string('ukuran')->nullable();
            $table->dateTime('tgl_ambil')->nullable();
            $table->float('harga_final')->nullable();
            $table->string('status_verifikasi')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
