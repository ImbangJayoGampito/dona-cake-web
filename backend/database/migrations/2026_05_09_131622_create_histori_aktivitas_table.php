<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('histori_aktivitas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->constrained('pelanggans')->onDelete('cascade');
            $table->string('jenis_aktivitas');
            $table->dateTime('waktu_akses');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('histori_aktivitas');
    }
};
