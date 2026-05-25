<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gambars', function (Blueprint $table) {
            $table->id();
            $table->string('gambar_url', 255);
            $table->string('gambar_alt', 255)->nullable();
            $table->string('gambar_title', 255)->nullable();
            $table->string('path', 500);
            $table->string('gambarable_type', 100);
            $table->unsignedBigInteger('gambarable_id');
            $table->timestamps();

            // Index untuk polymorphic relationship (wajib untuk performa)
            $table->index(['gambarable_type', 'gambarable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gambars');
    }
};
