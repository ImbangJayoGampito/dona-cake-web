<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\BookingStatus;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("bookings", function (Blueprint $table) {
            $table->id();

            $table
                ->foreignId("pelanggan_id")
                ->constrained("pelanggans")
                ->onDelete("cascade");

            $table
                ->foreignId("transaksi_id")
                ->nullable()
                ->constrained("transaksis")
                ->onDelete("set null");

            $table->string("desain_custom_url")->nullable();

            // Relate to kategoris migration
            $table
                ->foreignId("kategori_id")
                ->nullable()
                ->constrained("kategoris")
                ->onDelete("set null");

            $table->string("jenis_frosting");
            $table->string("rasa_kue");
            $table->string("tema_dekorasi")->nullable(); // Added theme field
            $table->string("ukuran")->nullable();
            $table->dateTime("tgl_ambil")->nullable();
            $table->decimal("harga_final", 12, 2)->nullable();
            $table->text("deskripsi_custom")->nullable(); // Added missing field
            $table
                ->enum("status_verifikasi", BookingStatus::getAll())
                ->default(BookingStatus::MENUNGGU_VERIFIKASI->value);
            $table->text("catatan")->nullable();
            $table->timestamps();

            // Add indexes for better performance
            $table->index("status_verifikasi");
            $table->index("tgl_ambil");
            $table->index("pelanggan_id");
            $table->index("kategori_id");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("bookings");
    }
};
