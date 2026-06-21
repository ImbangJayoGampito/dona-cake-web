<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Pesanan;
use App\Models\ItemPesanan;
use App\Models\Transaksi;
use App\Models\Booking;
use App\Models\Notifikasi;
use App\Models\Kategori;
use App\Enums\BookingStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PesananSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Get or create some customers (pelanggan)
        $pelanggans = Pelanggan::all();
        if ($pelanggans->isEmpty()) {
            $users = User::role('user')->limit(5)->get();
            if ($users->isEmpty()) {
                $users = User::factory(5)->create()->each(fn($u) => $u->assignRole('user'));
            }
            foreach ($users as $user) {
                Pelanggan::firstOrCreate(['user_id' => $user->id], [
                    'alamat' => 'Jl. Mawar No. ' . rand(1, 100) . ', Kota Bandung',
                    'no_telepon' => '08123456' . rand(1000, 9999),
                ]);
            }
            $pelanggans = Pelanggan::all();
        }

        // Get all products
        $products = Produk::all();
        if ($products->isEmpty()) {
            $this->command->error("Tolong seed produk terlebih dahulu!");
            return;
        }

        // Get staff & admin users to send notifications to
        $staffUsers = User::role(['admin', 'karyawan'])->get();

        // 2. Clear old data to prevent duplication during re-seed
        Pesanan::query()->delete();
        Transaksi::query()->delete();
        Booking::query()->delete();
        Notifikasi::query()->delete();

        $this->command->info("Clearing old orders, transactions, bookings, and notifications...");

        // 3. Define helper for creating notifications
        $createStaffNotifications = function ($title, $message, $type, $notifiableType = null, $notifiableId = null) use ($staffUsers) {
            foreach ($staffUsers as $staff) {
                Notifikasi::create([
                    'user_id' => $staff->id,
                    'judul' => $title,
                    'pesan' => $message,
                    'tipe' => $type,
                    'is_read' => false,
                    'notifiable_type' => $notifiableType,
                    'notifiable_id' => $notifiableId,
                ]);
            }
        };

        // 4. Seeding Transaksi & Pesanan (Orders)
        $orderStatuses = [
            Pesanan::STATUS_MENUNGGU_PEMBAYARAN,
            Pesanan::STATUS_MENUNGGU_KONFIRMASI_PEMBAYARAN,
            Pesanan::STATUS_DIBAYAR,
            Pesanan::STATUS_DIPROSES,
            Pesanan::STATUS_SELESAI,
        ];

        $paymentMethods = ['Transfer Bank', 'GoPay', 'OVO', 'ShopeePay'];

        foreach ($orderStatuses as $index => $status) {
            $pelanggan = $pelanggans->random();
            $tglPesanan = Carbon::now()->subDays(5 - $index)->subHours(rand(1, 12));

            // Create Transaction if status is not 'menunggu_pembayaran'
            $transaksi = null;
            if ($status !== Pesanan::STATUS_MENUNGGU_PEMBAYARAN) {
                $statusTransaksi = Transaksi::STATUS_DIBAYAR;
                if ($status === Pesanan::STATUS_MENUNGGU_KONFIRMASI_PEMBAYARAN) {
                    $statusTransaksi = Transaksi::STATUS_MENUNGGU_KONFIRMASI;
                }

                $transaksi = Transaksi::create([
                    'user_id' => $pelanggan->user_id,
                    'jumlah_bayar' => 0, // Will update later
                    'metode_pembayaran' => $paymentMethods[array_rand($paymentMethods)],
                    'status_transaksi' => $statusTransaksi,
                    'id_transaksi_gateway' => 'TX-' . strtoupper(uniqid()),
                    'tgl_transaksi' => $tglPesanan->copy()->addMinutes(rand(10, 60)),
                ]);
            }

            // Create Order
            $pesanan = Pesanan::create([
                'pelanggan_id' => $pelanggan->id,
                'transaksi_id' => $transaksi ? $transaksi->id : null,
                'tgl_pesanan' => $tglPesanan,
                'total_harga' => 0, // Will calculate
                'status_pesanan' => $status,
            ]);

            // Add 1-3 items
            $totalHarga = 0;
            $itemsCount = rand(1, 3);
            $selectedProducts = $products->random($itemsCount);

            foreach ($selectedProducts as $prod) {
                $qty = rand(1, 3);
                $subtotal = $prod->harga * $qty;
                $totalHarga += $subtotal;

                ItemPesanan::create([
                    'pesanan_id' => $pesanan->id,
                    'produk_id' => $prod->id,
                    'kuantitas' => $qty,
                    'subtotal' => $subtotal,
                ]);
            }

            // Update total_harga on Order and Transaksi
            $pesanan->update(['total_harga' => $totalHarga]);
            if ($transaksi) {
                $transaksi->update(['jumlah_bayar' => $totalHarga]);
            }

            // Create notifications for the event
            if ($status === Pesanan::STATUS_MENUNGGU_PEMBAYARAN) {
                $createStaffNotifications(
                    "Pesanan Baru Masuk",
                    "Pelanggan {$pelanggan->user->name} membuat pesanan #ORD-" . str_pad($pesanan->id, 4, '0', STR_PAD_LEFT) . ".",
                    'payment',
                    Pesanan::class,
                    $pesanan->id
                );
            } elseif ($status === Pesanan::STATUS_MENUNGGU_KONFIRMASI_PEMBAYARAN) {
                $createStaffNotifications(
                    "Konfirmasi Pembayaran",
                    "Pelanggan {$pelanggan->user->name} mengunggah bukti pembayaran untuk #ORD-" . str_pad($pesanan->id, 4, '0', STR_PAD_LEFT) . ".",
                    'payment',
                    Pesanan::class,
                    $pesanan->id
                );
            }
        }

        // 5. Seeding Bookings (Custom Orders)
        $categories = Kategori::all();
        $frostings = ['Buttercream', 'Whipped Cream', 'Fondant', 'Ganache'];
        $flavors = ['Cokelat', 'Vanilla', 'Red Velvet', 'Strawberry', 'Keju'];
        $sizes = ['15cm', '20cm', '22cm', '24cm'];

        $bookingStatuses = [
            BookingStatus::MENUNGGU_VERIFIKASI,
            BookingStatus::DISETUJUI,
            BookingStatus::SELESAI,
        ];

        foreach ($bookingStatuses as $bIndex => $bStatus) {
            $pelanggan = $pelanggans->random();
            $category = !$categories->isEmpty() ? $categories->random() : null;

            $booking = Booking::create([
                'pelanggan_id' => $pelanggan->id,
                'transaksi_id' => null, // No transaction yet for simplicity
                'kategori_id' => $category ? $category->id : null,
                'desain_custom_url' => 'https://picsum.photos/400/400',
                'deskripsi_custom' => 'Request desain custom kue tema ulang tahun anak laki-laki.',
                'jenis_frosting' => $frostings[array_rand($frostings)],
                'rasa_kue' => $flavors[array_rand($flavors)],
                'tema_dekorasi' => 'Tema Superhero',
                'ukuran' => $sizes[array_rand($sizes)],
                'tgl_ambil' => Carbon::now()->addDays(5 + $bIndex),
                'harga_final' => 250000 + (rand(1, 10) * 10000),
                'status_verifikasi' => $bStatus,
                'catatan' => 'Pastikan warna frosting dominan biru.',
            ]);

            // Notify staff for booking status events
            if ($bStatus === BookingStatus::MENUNGGU_VERIFIKASI) {
                $createStaffNotifications(
                    "Custom Booking Baru",
                    "Pelanggan {$pelanggan->user->name} mengajukan pesanan custom kue.",
                    'booking',
                    Booking::class,
                    $booking->id
                );
            }
        }

        $this->command->info("Pesanan, Transaksi, Bookings, dan Notifikasi seeded successfully!");
        $this->command->info("Total Pesanan: " . Pesanan::count());
        $this->command->info("Total Transaksi: " . Transaksi::count());
        $this->command->info("Total Bookings: " . Booking::count());
        $this->command->info("Total Notifikasi: " . Notifikasi::count());
    }
}
