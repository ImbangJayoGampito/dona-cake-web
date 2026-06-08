<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("produks", function (Blueprint $table) {
            $table->id();
            $table->string("nama_produk");
            $table->float("harga");
            $table->string("slug");
            $table->integer("stok")->default(0);

            $table->float("rating_rata_rata")->default(0);
            $table
                ->foreignId("kategori_id")
                ->nullable()
                ->constrained("kategoris")
                ->onDelete("set null");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("produks");
    }
};
