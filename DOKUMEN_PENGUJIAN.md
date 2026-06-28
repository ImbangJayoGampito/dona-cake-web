# Dokumen Pengujian Sistem - Dona Cake Web

**Nomor Dokumen:** CP300-TA2026.08.00X  
**Tanggal:** 28/06/2026  
**Status:** Draft  

---

## Daftar Isi

1. [MODUL 1: Autentikasi dan Authorisasi](#modul-1-autentikasi-dan-authorisasi)
2. [MODUL 2: Asisten Virtual](#modul-2-asisten-virtual)
3. [MODUL 3: Katalog Menu](#modul-3-katalog-menu)
4. [MODUL 4: Pemesanan](#modul-4-pemesanan)
5. [MODUL 5: Booking](#modul-5-booking)
6. [MODUL 6: Keuangan](#modul-6-keuangan)
7. [MODUL 7: Ulasan dan Laporan](#modul-7-ulasan-dan-laporan)

---

# MODUL 1: Autentikasi dan Authorisasi

**Referensi Kode:** `backend/app/Http/Controllers/Auth/ApiAuthController.php`, `frontend/src/pages/auth/login.tsx`, `frontend/src/pages/auth/register.tsx`

## PENGUJIAN 1.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil fungsi `register()` dengan data username, name, email, password valid | User baru terdaftar di database, role "user" ter-assign, token Bearer dikembalikan, response status 201 | - | - |
| 2 | Memanggil fungsi `login()` dengan username/email dan password yang benar | Token `plainTextToken` di-generate, response JSON berisi data user + token + token_type "Bearer", status 200 | - | - |
| 3 | Memanggil fungsi `changePassword()` dengan current_password salah | Response error dengan message "Current password is incorrect", status 422, password tidak berubah | - | - |

## PENGUJIAN 1.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Registrasi user: ApiAuthController@register → User::create → Pelanggan::create → assignRole → createToken | User, Pelanggan, role, dan token terbuat dalam satu flow, data konsisten di database | - | - |
| 2 | Login → middleware auth → akses endpoint `/me` → validasi token | Token yang dihasilkan saat login dapat digunakan untuk mengakses `/me` dan mengembalikan data user + relasi pelanggan | - | - |
| 3 | Login → logout → gunakan token yang sama untuk akses endpoint | Token yang sudah di-revoke saat logout tidak bisa digunakan lagi, response 401 | - | - |

## PENGUJIAN 1.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna mengisi form login di `frontend/src/pages/auth/login.tsx` dengan username dan password benar, klik "Masuk" | UserService.login() dipanggil, navigate ke halaman Home, tidak ada error | - | - |
| 2 | Pengguna mengisi form login dengan username kosong atau password kosong | Fungsi `handleSubmit` men-set error "Please fill in both fields.", form tidak di-submit | - | - |
| 3 | Pengguna mengisi form register dengan password dan password confirmation tidak cocok | Validasi `confirmed` pada Rules\Password gagal, response error validasi dikembalikan | - | - |

## PENGUJIAN 1.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | 50 user melakukan login secara simultan ke endpoint POST `/api/login` | Waktu respons rata-rata < 2 detik, tidak ada error timeout, semua token ter-generate | - | - |
| 2 | 30 user melakukan registrasi secara simultan ke endpoint POST `/api/register` | Waktu respons rata-rata < 3 detik, semua user terdaftar, tidak ada duplicate entry | - | - |
| 3 | 100 request berturut-turut ke endpoint GET `/api/me` dengan token valid | Server mampu melayani tanpa error, response time < 500ms per request | - | - |

## PENGUJIAN 1.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Input email dengan format tidak valid pada form register (contoh: "bukan-email") | Validasi Laravel `email` menolak input, response error "The email field must be a valid email address" | - | - |
| 2 | Login dengan field `username` tidak terdaftar | `Auth::attempt()` mengembalikan false, response error "Invalid credentials", status 401 | - | - |
| 3 | Mengakses endpoint `/me` tanpa header Authorization | Method `fromToken()` mendeteksi token kosong, response "Authorization token is required", status 401 | - | - |

## PENGUJIAN 1.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Validasi unique email: mendaftarkan user dengan email yang sudah ada | Validasi Laravel `unique:users` menolak, response error "The email has already been taken" | - | - |
| 2 | Validasi unique username: mendaftarkan user dengan username yang sudah ada | Validasi `unique:users` pada field username menolak duplikasi | - | - |
| 3 | Validasi password minimal: input password < 8 karakter | `Rules\Password::defaults()` biasanya membutuhkan minimal 8 karakter, response error validasi | - | - |

## PENGUJIAN 1.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna baru membuka halaman login, melihat form dengan field username/email dan password | Form login tampil dengan ikon User dan Lock, input placeholder "contoh@email.com" dan "Masukkan password" | - | - |
| 2 | Pengguna menekan tombol "Daftar sekarang" dan diarahkan ke halaman register | Link navigasi ke `PublicRoutes.Register` berfungsi, halaman register terbuka | - | - |
| 3 | Pengguna mencentang "Ingat saya" sebelum login | Checkbox "rememberMe" state berubah, nilai `rememberMe` menjadi true | - | - |

## PENGUJIAN 1.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Registrasi akun baru → login → akses halaman dashboard → logout | Semua langkah berjalan sukses, data pengguna konsisten di database | - | - |
| 2 | Flow end-to-end: Login → update profil via `updateProfile()` → verifikasi data berubah | Profil user berhasil diupdate, response JSON mengembalikan data baru | - | - |
| 3 | Flow end-to-end: Login → change password → logout → login dengan password baru | Password berubah, login dengan password baru berhasil, login dengan password lama gagal | - | - |

---

# MODUL 2: Asisten Virtual

**Referensi Kode:** `backend/app/Services/VirtualAssistantService.php`, `backend/app/Services/ChromaDBService.php`

## PENGUJIAN 2.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil method `answer("rekomendasi kue coklat")` tanpa history | Response JSON berisi field `id`, `jawaban` (string dari LLM), dan `id_produk` (array matched product IDs) | - | - |
| 2 | Memanggil method `tokenize("Kue Coklat 123!")` | Output array ['kue', 'coklat', '123'], karakter non-alfanumerik dihapus, token di-unique | - | - |
| 3 | Memanggil method `getMatchedProductIds()` dengan array produk dan prompt "coklat" | Hanya produk dengan token overlap pada nama/keterangan/harga yang dikembalikan dalam array | - | - |

## PENGUJIAN 2.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Integrasi VirtualAssistantService dengan ChromaDBService: query semantic search | ChromaDB mengembalikan dokumen relevan yang mengandung field source, excerpt, dan products | - | - |
| 2 | Integrasi ChromaDB dengan database Produk: pencocokan nama produk | Method `getRelevantDocuments()` melakukan join antara data ChromaDB dengan tabel `produks` via `strcasecmp` nama produk | - | - |
| 3 | Integrasi dengan Ollama LLM: callOllama mengirim request ke endpoint `/v1/chat/completions` | Response dari Ollama mengandung `choices[0].message.content`, dikembalikan sebagai jawaban | - | - |

## PENGUJIAN 2.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna bertanya "Apa saja kue yang tersedia?" ke asisten virtual | Asisten menjawab berdasarkan knowledge yang relevan, merespon dalam Bahasa Indonesia | - | - |
| 2 | Pengguna bertanya tentang produk spesifik, sistem melakukan semantic search | ChromaDB.query() dipanggil dengan prompt, 3 dokumen teratas diambil, produk dicocokkan dengan database | - | - |
| 3 | Pengguna bertanya, tetapi ChromaDB tidak tersedia (exception) | Method `getRelevantDocuments()` mengembalikan array kosong, jawaban LLM berisi "Tidak ada dokumen pengetahuan yang relevan" | - | - |

## PENGUJIAN 2.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Waktu respons asisten untuk pertanyaan sederhana dengan ChromaDB aktif | Waktu respons dipengaruhi oleh Ollama (timeout 120 detik), target < 5 detik untuk pertanyaan sederhana | - | - |
| 2 | Query dengan 10.000 embedding di ChromaDB untuk semantic search | Waktu pencarian < 1 detik untuk query semantic dengan collection besar | - | - |
| 3 | Histori percakapan panjang (> 10 pesan) di-slice untuk dikirim ke LLM | Method `array_slice($history, -10)` membatasi histori ke 10 pesan terakhir untuk menjaga token limit | - | - |

## PENGUJIAN 2.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Ollama service tidak merespon (timeout atau connection refused) | Exception tertangkap, method `answer()` mengembalikan "Maaf, asisten virtual sedang tidak tersedia saat ini. Silakan coba lagi beberapa saat lagi." | - | - |
| 2 | ChromaDB mengembalikan dokumen tanpa field `products` atau null | Check `empty($document['products'])` dan `is_array($document['products'])` mencegah error, dokumen diproses dengan aman | - | - |
| 3 | Input prompt kosong ke method `answer()` | `getMatchedProductIds()` mengembalikan array kosong, LLM tetap merespon tanpa konteks produk | - | - |

## PENGUJIAN 2.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Histori percakapan memiliki entry tanpa field `role` atau `content` | Entry tersebut di-skip, hanya entry valid yang diproses | - | - |
| 2 | Tokenisasi teks dengan karakter spesial dan angka | Regex `/[\p{L}\p{N} ]+/u` hanya mempertahankan huruf dan angka, spasi sebagai pemisah | - | - |
| 3 | Produk dari ChromaDB tidak ditemukan di database (nama berbeda) | `$id_produk` tetap null, produk tetap masuk ke array tanpa ID | - | - |

## PENGUJIAN 2.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna menanyakan harga produk dan asisten memberikan informasi | Asisten menjawab dengan informasi dari knowledge, harga dan detail produk disebutkan | - | - |
| 2 | Pengguna menanyakan produk yang tidak ada di knowledge | Asisten menjawab sesuai instruksi "Jika tidak tahu, katakan tidak tahu" | - | - |
| 3 | Pengguna menggunakan bahasa campuran (Indonesia-English) | Asisten tetap merespon dalam Bahasa Indonesia, knowledge tetap diakses sesuai prompt | - | - |

## PENGUJIAN 2.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: User mengirim pesan → ChromaDB query → Ollama proses → response JSON dikembalikan | Seluruh flow berjalan, response berisi jawaban + ID produk relevan | - | - |
| 2 | Flow end-to-end dengan histori: Tanya → jawab → tanya lanjutan → konteks terjaga | Histori terkirim ke LLM, konteks percakapan berkesinambungan | - | - |
| 3 | Skenario ChromaDB down: User bertanya → ChromaDB exception → fallback → Ollama tetap jawab | Sistem tetap berjalan dengan dokumen kosong, tidak crash | - | - |

---

# MODUL 3: Katalog Menu

**Referensi Kode:** `frontend/src/services/keranjang-service.ts`, `frontend/src/pages/keranjang/Step1PurchaseCartPage.tsx`, `frontend/src/pages/keranjang/tests/lihat_keranjang.test.tsx`

## PENGUJIAN 3.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil `KeranjangService.getKeranjang()` saat user memiliki item di keranjang | Response berisi `items` (array Keranjang), `total_harga`, `jumlah_item` | - | - |
| 2 | Memanggil `KeranjangService.createKeranjang(keranjangItem)` dengan data produk_id dan kuantitas | POST request ke endpoint Cart, response berisi Keranjang baru yang terbuat | - | - |
| 3 | Memanggil `KeranjangService.updateKeranjang(id, keranjangItem)` untuk update kuantitas | PUT request ke endpoint CartItem dengan ID, response berisi data keranjang terupdate | - | - |

## PENGUJIAN 3.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Integrasi KeranjangService dengan API backend: getKeranjang memanggil `api.get(ProtectedRoutes.Cart)` | HTTP GET request terkirim, response dari backend diolah menjadi `ApiResponse<KeranjangResponse>` | - | - |
| 2 | Integrasi halaman keranjang (`Step1PurchaseCartPage.tsx`) dengan KeranjangService | `KeranjangService.getKeranjang()` dipanggil saat mount, data items ditampilkan di tabel | - | - |
| 3 | Flow checkbox pemilihan item → enable/disable tombol "Lanjut ke Pembayaran" | Checkbox mengubah state, tombol "Lanjut ke Pembayaran" disabled jika tidak ada item terpilih | - | - |

## PENGUJIAN 3.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna membuka halaman keranjang, melihat daftar item yang sudah ditambahkan | Halaman menampilkan "Keranjang Belanja", jumlah item, nama produk, harga, dan tombol aksi | - | - |
| 2 | Pengguna mencentang checkbox item di keranjang | Checkbox berubah menjadi `aria-checked="true"`, tombol "Lanjut ke Pembayaran" menjadi aktif (tidak disabled) | - | - |
| 3 | Pengguna mengubah kuantitas item di keranjang (jika ada fitur) | `KeranjangService.updateKeranjang()` dipanggil, total harga berubah sesuai kuantitas baru | - | - |

## PENGUJIAN 3.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Waktu loading halaman keranjang dengan 20 item di dalamnya | Data termuat dalam < 2 detik, halaman tidak terasa lag | - | - |
| 2 | Waktu respons API `getKeranjang` dengan banyak item di database | Response backend < 500ms untuk query keranjang per user | - | - |
| 3 | Rendering ulang komponen setelah update kuantitas | State berubah, komponen re-render dalam < 100ms | - | - |

## PENGUJIAN 3.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | `KeranjangService.getKeranjang()` gagal karena network error | `catch` block menangkap error, mengembalikan `ApiResponse` dengan status "error" dan pesan error | - | - |
| 2 | `KeranjangService.createKeranjang()` gagal karena duplicate item | Backend harus menangani duplikasi, response error ditangkap di `catch` | - | - |
| 3 | Mengirim data invalid ke `updateKeranjang()` (kuantitas 0 atau negatif) | Backend validasi menolak, catch block mengembalikan `ApiResponse` dengan status error | - | - |

## PENGUJIAN 3.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Data keranjang response memiliki items null atau undefined | Transform function `(data) => { items: (data.items || []) ... }` memastikan items selalu array | - | - |
| 2 | Format harga: `ProdukService.formatPrice` dipanggil untuk menampilkan harga | Harga diformat dengan prefix "Rp" dan pemisah ribuan (contoh: "Rp 100.000") | - | - |
| 3 | User belum login mengakses halaman keranjang | Middleware auth seharusnya redirect ke halaman login | - | - |

## PENGUJIAN 3.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna melihat halaman "Keranjang Belanja" menampilkan item yang dipilih sebelumnya | Item tampil dengan nama produk, harga, kuantitas, dan gambar | - | - |
| 2 | Tombol "Lanjut ke Pembayaran" disabled saat tidak ada item yang dicentang | User tidak bisa lanjut tanpa memilih produk, UX jelas dengan tombol yang tampak disabled | - | - |
| 3 | Checkbox selection memungkinkan user memilih produk tertentu untuk dibayar | User bisa memilih hanya produk yang ingin dibayarkan, fleksibel | - | - |

## PENGUJIAN 3.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Lihat produk → tambah ke keranjang → buka keranjang → pilih item → lanjut pembayaran | Semua langkah berfungsi, data item konsisten dari pemilihan hingga checkout | - | - |
| 2 | Flow end-to-end: Keranjang → ubah kuantitas → verifikasi total harga berubah | Kuantitas berubah, subtotal dan total harga dihitung ulang dengan benar | - | - |
| 3 | Kompatibilitas tampilan keranjang di berbagai ukuran layar | Tampilan tabel/responsive tetap rapi di mobile dan desktop | - | - |

---

# MODUL 4: Pemesanan

**Referensi Kode:** `backend/app/Http/Controllers/PesananController.php`, `frontend/src/services/pesanan-service.ts`, `frontend/src/pages/transaksi/PayOrderPage.tsx`

## PENGUJIAN 4.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil method `PesananController@store()` dengan data items valid | Pesanan terbuat dengan status `menunggu_pembayaran`, item_pesanan terbuat, notifikasi staff terkirim, response status 201 | - | - |
| 2 | Memanggil method `PesananController@cancel()` oleh pemilik pesanan dengan status `menunggu_pembayaran` | Status pesanan berubah menjadi `dibatalkan`, response "Pesanan berhasil dibatalkan." | - | - |
| 3 | Memanggil `PesananService.createPesanan(pesanan)` dari frontend | Payload dikirim ke endpoint Orders, response data diparse menjadi instance Pesanan | - | - |

## PENGUJIAN 4.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | PesananController@store: transaksi database dengan DB::beginTransaction dan DB::commit | Semua operasi (create pesanan + create itemPesanans) dalam satu transaksi, rollback jika terjadi error | - | - |
| 2 | Integrasi notifikasi: setelah store sukses, `NotificationService@sendToStaff` dipanggil | Staff mendapat notifikasi "Pesanan Baru Masuk" dengan detail pesanan | - | - |
| 3 | Integrasi otorisasi: user role "user" hanya melihat pesanan miliknya sendiri di method `index()` | Query difilter dengan `pelanggan_id` milik user yang login, user lain tidak bisa melihat data pesanan orang lain | - | - |

## PENGUJIAN 4.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna membuat pesanan baru melalui form checkout | Pesanan terbuat, status awal "menunggu_pembayaran", data items tercatat, user diarahkan ke pembayaran | - | - |
| 2 | Admin/karyawan mengupdate status pesanan via `PesananController@update()` | Status berubah sesuai transisi valid, notifikasi dikirim ke pelanggan, response data fresh | - | - |
| 3 | Pelanggan melihat daftar pesanan via `PesananController@index()` dengan filter status | Pesanan difilter sesuai parameter status (single atau comma-separated), diurutkan descending | - | - |

## PENGUJIAN 4.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | 30 user membuat pesanan secara simultan | Database transaction handling mencegah race condition, semua pesanan terbuat dengan benar | - | - |
| 2 | Loading daftar pesanan dengan pagination (20 per page) dan relasi (pelanggan, user, itemPesanan, produk) | Query dengan eager loading `with()` mengoptimasi performa, loading < 2 detik | - | - |
| 3 | Filter dan pencarian pesanan dengan berbagai parameter (status, tanggal_mulai, tanggal_selesai) | Query building berfungsi, response time tetap < 1 detik untuk ribuan pesanan | - | - |

## PENGUJIAN 4.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Stok produk tidak mencukupi saat store (kuantitas > stok) | Response error "Stok {produk} tidak mencukupi. Tersedia: {stok}", status 400, transaksi rollback | - | - |
| 2 | User mencoba cancel pesanan yang statusnya bukan `menunggu_pembayaran` | Response error "Pesanan hanya dapat dibatalkan sebelum pembayaran.", status 400 | - | - |
| 3 | Update status ke transisi yang tidak valid via `canTransitionTo()` | Method `canTransitionTo()` mengembalikan false, response error detail | - | - |

## PENGUJIAN 4.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | User belum memiliki profil pelanggan mencoba membuat pesanan | Response error "Profil pelanggan tidak ditemukan. Silakan lengkapi profil terlebih dahulu.", status 400 | - | - |
| 2 | User mengakses pesanan milik orang lain via `show()` | Role check: jika user, `pelanggan_id` harus sesuai, jika tidak, response 403 | - | - |
| 3 | Payload `items` pada request store tidak diisi atau kosong | Validasi dari `PesananRequest` (class terpisah) seharusnya menolak request dengan items kosong | - | - |

## PENGUJIAN 4.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna melakukan checkout dari keranjang, data produk terbawa dengan benar | Produk yang dipilih di keranjang terbawa ke halaman checkout, total harga sesuai | - | - |
| 2 | Pengguna mendapat notifikasi status pesanan setelah admin mengupdate | Notifikasi real-time/push notification diterima pengguna saat status berubah | - | - |
| 3 | Pengguna membatalkan pesanan sebelum membayar | Pesanan berubah status menjadi "dibatalkan", konfirmasi tampil | - | - |

## PENGUJIAN 4.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Pilih produk di katalog → tambah ke keranjang → checkout → pesanan terbuat | Data produk konsisten dari katalog hingga pesanan sukses | - | - |
| 2 | Flow end-to-end: Pesanan baru → admin update status "diproses" → user lihat update | Status berubah, notifikasi ke user, histori perubahan tercatat | - | - |
| 3 | Skenario error: user tanpa profil pelanggan coba checkout → diarahkan lengkapi profil | Flow error handling mengarahkan user ke halaman profil | - | - |

---

# MODUL 5: Booking

**Referensi Kode:** `backend/app/Http/Controllers/BookingController.php`, `backend/app/Http/Requests/BookingRequest.php`

## PENGUJIAN 5.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil `BookingController@store()` dengan data booking valid (ukuran, tgl_ambil, rasa_kue, jenis_frosting, harga_final) | Booking terbuat dengan status `menunggu_verifikasi`, notifikasi staff terkirim, response 201 | - | - |
| 2 | Memanggil `BookingController@verify()` dengan status "disetujui" | Status booking berubah menjadi `disetujui`, notifikasi ke pelanggan "Booking custom anda telah disetujui!" | - | - |
| 3 | Memanggil `BookingController@cancel()` oleh pemilik booking yang statusnya `menunggu_verifikasi` | Status booking berubah menjadi `dibatalkan`, response "Booking berhasil dibatalkan." | - | - |

## PENGUJIAN 5.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Integrasi BookingController dengan Gambar: upload file `desain_custom_file` → Gambar::createForModel → URL tersimpan | File gambar terupload ke storage, record Gambar terbuat, `desain_custom_url` terisi URL | - | - |
| 2 | Integrasi notifikasi: `sendToStaff` dan `create` untuk pelanggan saat booking baru dan verifikasi | Staff dan pelanggan mendapat notifikasi sesuai event (booking baru, disetujui, ditolak, selesai) | - | - |
| 3 | Integrasi database transaction: store di dalam DB::beginTransaction/commit/rollBack | Data booking dan gambar konsisten, rollback jika ada error | - | - |

## PENGUJIAN 5.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna membuat booking custom dengan mengisi ukuran, tanggal ambil, rasa kue, jenis frosting, dan upload desain | Booking terbuat, desain custom terupload, status "Menunggu Verifikasi" | - | - |
| 2 | Admin memverifikasi booking dengan status "disetujui" atau "ditolak" disertai catatan | Booking terupdate, pelanggan mendapat notifikasi sesuai status | - | - |
| 3 | Admin menyelesaikan booking yang sudah disetujui (status "selesai") | Booking selesai, notifikasi "Pesanan kue custom Anda telah selesai dan siap untuk diambil!" | - | - |

## PENGUJIAN 5.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | 20 user membuat booking secara simultan | Transaction handling mencegah race condition, semua booking terbuat dengan ID unik | - | - |
| 2 | Load daftar booking dengan pagination (20 per page) + eager loading | Relasi pelanggan dan user di-load dengan `with()`, query optimal | - | - |
| 3 | Upload file desain custom dengan ukuran maksimal 2MB | Validasi `max:2048` membatasi ukuran, upload stabil tidak memakan memori berlebih | - | - |

## PENGUJIAN 5.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | User mencoba verify booking yang sudah pernah diverifikasi | Check `status_verifikasi !== MENUNGGU_VERIFIKASI`, response error "Booking sudah pernah diverifikasi sebelumnya." | - | - |
| 2 | User menyelesaikan booking yang belum disetujui | Check `status_verifikasi !== DISETUJUI`, response error "Hanya booking yang telah disetujui yang dapat diselesaikan." | - | - |
| 3 | User mencoba cancel booking dengan status `selesai` atau `dibatalkan` | Check `in_array` hanya mengizinkan `menunggu_verifikasi` dan `disetujui`, response error | - | - |

## PENGUJIAN 5.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Upload file desain dengan format selain jpeg, png, jpg, webp | Validasi `mimes:jpeg,png,jpg,webp` menolak file, response error validasi | - | - |
| 2 | User mengakses booking milik orang lain via `show()` | Role check: jika user dan `pelanggan_id` tidak sesuai, response 403 | - | - |
| 3 | Field `catatan` pada verify melebihi 500 karakter | Validasi `max:500` menolak, response error validasi | - | - |

## PENGUJIAN 5.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna mengisi form booking dengan ukuran, rasa, frosting, tanggal ambil | Form lengkap, pilihan jelas, user dapat mengisi dengan mudah | - | - |
| 2 | Pengguna upload gambar desain custom untuk kue | Upload mudah, format didukung (jpeg, png, jpg, webp), ada preview | - | - |
| 3 | Pengguna mendapat notifikasi setelah booking diverifikasi oleh admin | Notifikasi jelas (disetujui/ditolak dengan alasan), user tahu status booking | - | - |

## PENGUJIAN 5.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Booking → upload desain → admin verifikasi (setujui) → pembayaran → selesai | Semua status berubah sesuai alur, notifikasi di setiap langkah | - | - |
| 2 | Flow end-to-end: Booking → admin verifikasi (tolak) → user dapat booking ulang | Booking ditolak dengan alasan, user bisa membuat booking baru | - | - |
| 3 | Flow end-to-end: Booking → cancel oleh user sebelum diverifikasi | Booking dibatalkan, tidak ada notifikasi ke admin | - | - |

---

# MODUL 6: Keuangan

**Referensi Kode:** `backend/app/Http/Controllers/TransaksiController.php`, `backend/app/Services/FinancialService.php`, `frontend/src/pages/transaksi/tests/PayOrderPage.test.tsx`

## PENGUJIAN 6.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil `FinancialService@getSummary()` untuk periode tertentu | Return array berisi `total_pendapatan`, `jumlah_transaksi`, `rata_rata_transaksi` berdasarkan transaksi dengan status "dibayar" | - | - |
| 2 | Memanggil `FinancialService@getRevenueByCategory()` dalam periode | Return data pendapatan per kategori (join item_pesanan → produk → kategori → pesanan → transaksi) dengan total_revenue dan total_sold | - | - |
| 3 | Memanggil `FinancialService@getPopularProducts(limit: 5)` | Return 5 produk teratas berdasarkan total_terjual, diurutkan descending | - | - |

## PENGUJIAN 6.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Integrasi FinancialService dengan multi-table join (item_pesanan, produks, kategoris, pesanans, transaksis) | Query join berjalan, data agregat akurat untuk laporan keuangan | - | - |
| 2 | TransaksiController: flow pembayaran pesanan → transaksi terbuat → status pesanan berubah → notifikasi staff | `payOrder()` membuat transaksi, upload bukti bayar, update status pesanan, kirim notifikasi | - | - |
| 3 | TransaksiController: staff konfirmasi pembayaran → transaksi status "dibayar" → notifikasi ke pelanggan | `confirmPayment()` mengupdate status, mengirim notifikasi sukses ke pelanggan | - | - |

## PENGUJIAN 6.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pelanggan melakukan pembayaran pesanan dengan upload bukti transfer | `payOrder()` dipanggil, transaksi "menunggu_konfirmasi" terbuat, bukti bayar tersimpan | - | - |
| 2 | Staff melihat daftar pembayaran yang menunggu konfirmasi via `pendingConfirmations()` | Endpoint mengembalikan semua transaksi dengan status `menunggu_konfirmasi`, diurutkan descending | - | - |
| 3 | Staff mengkonfirmasi pembayaran (accept/reject) | `confirmPayment()` memproses, status transaksi berubah, notifikasi ke pelanggan | - | - |

## PENGUJIAN 6.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Query `getSummary()` dengan 10.000+ transaksi di database | Waktu eksekusi < 1 detik, query SUM dan COUNT di-optimasi | - | - |
| 2 | Query `getRevenueByPeriod()` dengan format date SQLite vs MySQL | Kondisional `isSqlite` memilih format date function yang sesuai | - | - |
| 3 | Pagination transaksi dengan filter (status, metode, tanggal, search) | Query dengan eager loading, response < 2 detik untuk ribuan transaksi | - | - |

## PENGUJIAN 6.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Staff mencoba konfirmasi transaksi yang sudah dikonfirmasi sebelumnya | Check `status_transaksi !== menunggu_konfirmasi`, response error 400 | - | - |
| 2 | Staff mencoba konfirmasi tanpa bukti pembayaran (gambars kosong) | Check `$transaksi->gambars()->count() === 0`, response error 400 | - | - |
| 3 | Exception di tengah proses `confirmPayment` | `DB::rollBack()` dipanggil, data kembali ke keadaan awal | - | - |

## PENGUJIAN 6.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pembayaran booking dengan `jumlah_bayar` negatif atau 0 | Validasi `numeric|min:0` menolak nilai < 0 | - | - |
| 2 | Upload bukti bayar dengan format file tidak didukung | Validasi `image|mimes:jpeg,png,jpg,webp|max:2048` menolak | - | - |
| 3 | User mengakses transaksi milik orang lain | Check `user_id` pada show, response 403 jika tidak sama | - | - |

## PENGUJIAN 6.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pelanggan membayar pesanan dengan upload bukti transfer | Upload mudah, konfirmasi "Pembayaran berhasil dikirim. Menunggu konfirmasi dari staff." | - | - |
| 2 | Staff melihat daftar pembayaran pending dan mengkonfirmasi | Antarmuka jelas, staff bisa melihat bukti bayar sebelum konfirmasi | - | - |
| 3 | Owner melihat dashboard keuangan dengan ringkasan pendapatan | Data akurat, grafik membantu memahami tren penjualan | - | - |

## PENGUJIAN 6.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Pesanan → bayar (upload bukti) → staff konfirmasi → transaksi "dibayar" | Status berubah: menunggu_pembayaran → menunggu_konfirmasi_pembayaran → dibayar | - | - |
| 2 | Flow end-to-end: Booking → disetujui → bayar → staff konfirmasi | Booking terbayar, data masuk ke laporan keuangan | - | - |
| 3 | Flow end-to-end: Pembayaran ditolak staff → status pesanan "pembayaran_dibatalkan" → user upload ulang | Flow error handling berjalan, user bisa melakukan pembayaran ulang | - | - |

---

# MODUL 7: Ulasan dan Laporan

**Referensi Kode:** `frontend/src/services/ulasan-service.ts`, `backend/app/Http/Controllers/HistoriAktivitasController.php`

## PENGUJIAN 7.1: Unit Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Memanggil `UlasanService.getAllUlasanOnProdukId(id)` dengan ID produk valid | GET request ke endpoint Ulasan dengan parameter `produk_id`, response array Ulasan | - | - |
| 2 | Memanggil `UlasanService.createUlasan(payload)` dengan rating dan komentar | POST request ke endpoint CreateUlasan, Ulasan baru terbuat dengan data yang dikirim | - | - |
| 3 | Memanggil `UlasanService.deleteUlasan(id)` untuk menghapus ulasan | DELETE request ke endpoint DeleteUlasan dengan ID, ulasan terhapus dari database | - | - |

## PENGUJIAN 7.2: Integration Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Integrasi UlasanService dengan API backend: getAllUlasanOnProdukId memanggil `api.get(PublicRoutes.Ulasan?produk_id=...)` | HTTP request terkirim dengan query parameter, response diparse menjadi array Ulasan | - | - |
| 2 | Integrasi createUlasan dengan backend: POST data rating + komentar | Data ulasan tersimpan di database, terkait dengan user dan produk yang benar | - | - |
| 3 | Integrasi deleteUlasan: DELETE request → backend hapus data → response | Ulasan terhapus, data tidak bisa diakses lagi | - | - |

## PENGUJIAN 7.3: Functional Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna mengirim ulasan dengan rating bintang dan komentar untuk produk yang dibeli | Ulasan tersimpan, rating produk terupdate | - | - |
| 2 | Pengguna melihat daftar ulasan pada halaman detail produk | Semua ulasan yang sudah disetujui tampil dengan rating, komentar, dan nama pengulas | - | - |
| 3 | Pengguna mengupdate ulasan yang sudah dibuat (misal: mengubah rating atau komentar) | `UlasanService.updateUlasan(id, payload)` dipanggil, data ulasan berubah | - | - |

## PENGUJIAN 7.4: Performance Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Load ulasan untuk produk dengan 100+ ulasan | Waktu loading < 2 detik, pagination berfungsi | - | - |
| 2 | 50 user mengirim ulasan secara simultan ke endpoint yang sama | Semua ulasan masuk, tidak ada duplikasi atau data loss | - | - |
| 3 | Update rating produk setelah banyak ulasan masuk | Kalkulasi rating rata-rata berjalan efisien, tidak membebani server | - | - |

## PENGUJIAN 7.5: Bug Handling

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | `UlasanService.getAllUlasanOnProdukId` gagal karena network error | `catch` mengembalikan `ApiResponse` dengan array kosong dan status "error" | - | - |
| 2 | `UlasanService.createUlasan` gagal karena payload tidak valid | `catch` mengembalikan response error dengan pesan dari exception | - | - |
| 3 | User mencoba menghapus ulasan milik orang lain | Backend harus memvalidasi kepemilikan, response 403 jika bukan pemilik | - | - |

## PENGUJIAN 7.6: Validasi Sistem

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Rating tidak diisi (0) atau melebihi 5 | Backend validasi seharusnya membatasi rating 1-5 | - | - |
| 2 | Komentar ulasan kosong | Validasi minimal karakter (backend) menolak komentar kosong | - | - |
| 3 | User yang belum login mencoba mengakses endpoint ulasan | Middleware auth menolak, response 401 | - | - |

## PENGUJIAN 7.7: UAT (User Acceptance Testing)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Pengguna memberikan rating bintang (1-5) pada produk | Komponen rating interaktif, mudah digunakan | - | - |
| 2 | Pengguna menulis komentar ulasan setelah membeli produk | Form komentar tersedia, user bisa menulis pengalaman | - | - |
| 3 | Ulasan yang sudah dikirim muncul di halaman produk | Ulasan tampil dengan rating, komentar, dan nama pengguna | - | - |

## PENGUJIAN 7.8: System Testing

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil yang Didapatkan | Keterangan |
|----|--------------------|----------------------|----------------------|------------|
| 1 | Flow end-to-end: Beli produk → terima pesanan → buka halaman produk → tulis ulasan | User bisa menulis ulasan setelah transaksi selesai | - | - |
| 2 | Flow end-to-end: Lihat ulasan orang lain di halaman produk | Rating rata-rata dan daftar ulasan tampil dengan benar | - | - |
| 3 | Flow end-to-end: Hapus ulasan sendiri → verifikasi ulasan hilang dari halaman produk | Ulasan terhapus, rating produk terupdate | - | - |

---

> **Catatan:**  
> - Kolom "Hasil yang Didapatkan" dan "Keterangan" sengaja dikosongkan (diisi "-") karena perlu diisi setelah pengujian aktual dilakukan.  
> - Setiap skenario pengujian dibuat berdasarkan kode aktual yang ada di repository (file dan baris kode dirujuk).  
> - Total: 7 modul × 8 jenis pengujian × 3 skenario = 168+ skenario pengujian.