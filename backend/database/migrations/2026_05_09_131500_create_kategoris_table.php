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
        Schema::create("kategoris", function (Blueprint $table) {
            $table->id();
            $table->string("nama_kategori");
            $table->string("slug")->unique(); // Important for SEO and URLs
            $table->text("deskripsi")->nullable();
            $table->boolean("is_active")->default(true);
            $table->timestamps();

            // Indexes
            $table->index("slug");
            $table->index("is_active");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("kategoris");
    }
};
