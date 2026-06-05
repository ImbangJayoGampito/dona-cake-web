<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("ulasans", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("pelanggan_id");
            $table->unsignedBigInteger("produk_id");
            $table->integer("rating");
            $table->text("komentar")->nullable();
            $table->boolean("is_visible")->default(true);
            $table->timestamps();

            // Foreign keys (adjust table names if needed)
            $table
                ->foreign("pelanggan_id")
                ->references("id")
                ->on("pelanggans")
                ->onDelete("cascade");
            $table
                ->foreign("produk_id")
                ->references("id")
                ->on("produks")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("ulasans");
    }
};
