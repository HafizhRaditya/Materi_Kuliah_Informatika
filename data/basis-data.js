/* ============================================================
   basis-data.js — materi mata kuliah Basis Data (Semester 1)

   Disusun dari berkas kuliah sendiri:
   - Praktikum Basis Data, Pertemuan 1-9 (tes awal & tes akhir).
     Ini sumber terkuat, karena menunjukkan apa yang benar-benar
     dikerjakan di lab: MySQL/MariaDB lewat XAMPP.
   - "Rangkuman Basis Data.docx" — dasar topik Normalisasi.
   - Slide Silberschatz, Database System Concepts 6e (ch1-24),
     dipakai untuk memastikan istilah dan urutannya baku.

   Catatan penulisan:
   - Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Kueri",
     karena yang dibedah perintah SQL, bukan syntax prosedural.
   - Semua contoh diuji dengan pola MySQL/MariaDB, sesuai praktikum.
   - JANGAN memakai backtick untuk nama tabel/kolom di blok kode.
     MySQL memang mengizinkannya, tetapi backtick akan menutup
     String.raw lebih awal dan merusak berkas ini.
   ============================================================ */

TOPICS.push({
  id: 'basdat-pengantar',
  judul: 'Pengantar Basis Data & DBMS',
  kategori: 'basis-data',
  tag: ['basis data', 'database', 'DBMS', 'MySQL', 'redundansi'],
  ringkas: 'Kenapa data tidak cukup disimpan di berkas biasa, dan apa sebenarnya tugas sebuah DBMS.',

  fungsi: `**Memutuskan kapan sebuah aplikasi butuh basis data, dan kenapa berkas biasa tidak cukup.**

Banyak tugas mahasiswa dimulai dengan menyimpan data ke berkas teks, lalu berhenti bekerja begitu datanya bertambah atau dipakai dua orang sekaligus.

DBMS menyelesaikan hal-hal yang sangat sulit dibuat sendiri:

- **Banyak pengguna sekaligus** tanpa saling merusak data
- **Pemulihan setelah mati listrik** — transaksi yang belum selesai dibatalkan utuh
- **Pencarian cepat** lewat indeks, tanpa membaca seluruh berkas
- **Aturan yang dijaga basis data**, bukan diandalkan pada kode aplikasi
- **Hak akses** per pengguna dan per tabel

Terpakai di hampir semua mata kuliah setelahnya: Pemrograman Web, Sistem Informasi, Data Mining, dan tugas akhir.

Yang perlu disadari sejak awal: **memakai DBMS tidak otomatis membuat datamu baik.** Rancangan yang buruk tetap buruk — hanya saja sekarang berjalan lebih cepat.`,

  praktik: {
    tujuan: `Kamu punya satu DBMS terpasang dan berjalan, satu basis data kosong siap pakai, dan sudah membandingkan sendiri dengan penyimpanan berkas biasa.`,
    alat: [
      'MySQL atau MariaDB (lewat XAMPP/Laragon), PostgreSQL, atau SQLite',
      'Klien: DBeaver, phpMyAdmin, atau terminal',
      'Python 3 untuk perbandingan'
    ],
    langkah: [
      { judul: 'Pasang satu DBMS dan pastikan ia menyala',
        isi: `Pilihan paling ringan untuk belajar adalah **SQLite** — tidak perlu dipasang sama sekali, sudah ada di Python lewat \`import sqlite3\`.

Untuk pengalaman yang lebih dekat dunia kerja, pasang **MySQL** lewat XAMPP atau Laragon.

Buktikan ia menyala dengan menyambung dari terminal: \`mysql -u root -p\` lalu ketik \`SELECT VERSION();\`` },
      { judul: 'Buat basis data pertamamu',
        isi: `- \`CREATE DATABASE kampus;\`
- \`USE kampus;\` (MySQL) atau \`\\c kampus\` (PostgreSQL)
- \`SHOW DATABASES;\` untuk memastikannya ada

Beri nama yang menyebut isinya, huruf kecil semua, tanpa spasi. Nama basis data akan muncul di banyak tempat dan sulit diubah nanti.` },
      { judul: 'Rasakan sendiri masalah berkas biasa',
        isi: `Buat berkas CSV berisi 200.000 baris data mahasiswa dengan Python. Lalu cari satu NIM tertentu dengan membaca berkasnya dari awal, dan ukur waktunya.

Sekarang masukkan data yang sama ke tabel basis data, beri indeks pada kolom NIM, dan cari hal yang sama.

Selisihnya akan sangat besar — dan itu jawaban paling meyakinkan atas pertanyaan "kenapa tidak pakai berkas saja".` },
      { judul: 'Coba dua penulis sekaligus',
        isi: `Buka dua terminal, sambungkan keduanya ke basis data yang sama, lalu jalankan \`UPDATE\` pada baris yang sama dari keduanya.

DBMS akan mengurusnya — yang satu menunggu yang lain selesai.

Coba hal yang sama dengan dua program yang menulis ke satu berkas CSV. Hasilnya kacau, dan tidak ada yang memberitahumu.` },
      { judul: 'Kenali tiga tingkat abstraksi',
        isi: `- **Fisik** — bagaimana data benar-benar disimpan di disk. Kamu hampir tidak pernah menyentuhnya.
- **Logis** — tabel, kolom, dan hubungannya. Di sinilah kamu bekerja.
- **View** — apa yang dilihat pengguna tertentu, bisa sebagian saja.

Gunanya: mengubah tingkat fisik, misalnya menambah indeks, **tidak mengubah** kueri yang sudah ada.` },
      { judul: 'Catat pilihanmu dan alasannya',
        isi: `Tulis di catatan proyekmu: DBMS apa yang dipakai, versinya berapa, dan kenapa dipilih.

Ini terdengar berlebihan sekarang, tetapi enam bulan lagi ketika kodemu tidak jalan di komputer lain, catatan ini yang menyelamatkanmu.` }
    ],
    cek: [
      'Perintah SELECT VERSION() mengembalikan nomor versi, artinya sambunganmu berhasil',
      'Pencarian di tabel berindeks terbukti jauh lebih cepat daripada membaca CSV 200.000 baris',
      'Dua sambungan yang menulis bersamaan tidak merusak data'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
**Basis data** adalah kumpulan data yang disusun secara terorganisir sehingga mudah diakses, dikelola, dan diperbarui. **DBMS** (*Database Management System*) adalah perangkat lunak yang mengurus basis data itu — MySQL, PostgreSQL, Oracle, SQL Server.

Dua istilah ini sering tertukar. Bedanya sederhana:

- **Basis data** = datanya. Kumpulan tabel berisi mahasiswa, mata kuliah, nilai.
- **DBMS** = programnya. Yang kamu jalankan, yang menerima perintah SQL, yang menyimpan ke disk.

Analoginya, basis data itu isi lemari arsip, DBMS itu petugas arsipnya.

**Kenapa tidak pakai Excel atau berkas teks saja?**

Pertanyaan ini penting, karena jawabannya menjelaskan seluruh mata kuliah ini. Bayangkan data penjualan disimpan di satu berkas seperti ini:

- Setiap baris memuat nama pelanggan, alamat, barang yang dibeli, dan harganya.
- Pelanggan yang belanja sepuluh kali, namanya tertulis sepuluh kali.

Muncul empat masalah yang punya nama resmi:

- **Redundansi data** — data yang sama ditulis berulang-ulang, memboroskan ruang.
- **Inkonsistensi data** — pelanggan pindah alamat, dan kamu hanya sempat memperbarui tujuh dari sepuluh baris. Sekarang basis datamu memuat dua kebenaran yang berbeda, dan tidak ada cara tahu mana yang betul.
- **Anomali penyisipan** — kamu tidak bisa mencatat pelanggan baru sebelum ia membeli sesuatu, karena satu baris wajib berisi transaksi.
- **Anomali penghapusan** — menghapus satu-satunya transaksi seorang pelanggan akan ikut menghapus identitasnya.

DBMS lahir untuk menyelesaikan persoalan itu. Selain menyimpan, ia menjamin **integritas** (data tetap masuk akal), **keamanan** (siapa boleh melihat apa), **akses bersamaan** (banyak orang menulis serentak tanpa saling merusak), dan **pemulihan** (listrik mati di tengah transaksi, data tetap utuh).

**Jenis basis data**

- **Relasional** — data disimpan sebagai tabel yang saling terhubung lewat kunci. Bahasanya SQL. Contoh: MySQL, PostgreSQL, Oracle. Ini yang dipelajari di mata kuliah ini.
- **Non-relasional (NoSQL)** — data disimpan sebagai dokumen, pasangan kunci-nilai, atau graf. Contoh: MongoDB (dokumen), Redis (kunci-nilai), Neo4j (graf).

Di praktikum, DBMS yang dipakai adalah **MariaDB** yang ikut terpasang bersama **XAMPP**. MariaDB adalah percabangan dari MySQL dan perintahnya nyaris sama persis, sehingga sering disebut MySQL saja.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'mysql -u root -p',
      penjelasan: `
Ini bukan perintah SQL, melainkan perintah **shell** untuk masuk ke DBMS. Dibedah per bagian:

- **\`mysql\`** — nama program klien. Ia hanya mengirim perintahmu ke server dan menampilkan balasannya. Server yang sesungguhnya bernama \`mysqld\` (huruf **d** berarti *daemon*, program yang berjalan diam-diam di latar belakang). Kalau XAMPP belum kamu nyalakan, server ini belum hidup dan klien akan menolak dengan pesan *"Can't connect to MySQL server"*.
- **\`-u root\`** — masuk sebagai pengguna \`root\`, yaitu pengguna dengan hak penuh. Perhatikan bahwa ini **root milik MySQL**, bukan administrator Windows. Keduanya tidak berhubungan sama sekali.
- **\`-p\`** — minta kata sandi. Sengaja dibiarkan kosong tanpa menuliskan sandinya, supaya sandi tidak tersimpan di riwayat perintah. MySQL akan menanyakannya setelah Enter ditekan.

Pada XAMPP bawaan, sandi \`root\` **kosong** — cukup tekan Enter saat ditanya. Ini praktis untuk belajar tetapi berbahaya untuk server sungguhan.

Setelah berhasil, prompt-nya berubah menjadi \`MariaDB [(none)]>\`. Tulisan **\`(none)\`** artinya kamu belum memilih basis data mana pun. Bagian itu akan berganti menjadi nama basis data setelah kamu menjalankan \`USE\`.
`
    },
    {
      bahasa: 'sql',
      kode: 'CREATE DATABASE Hafizh_H1D024061;\nUSE Hafizh_H1D024061;\nSHOW DATABASES;\nDROP DATABASE Hafizh_H1D024061;',
      penjelasan: `
Empat perintah pengurus basis data, sebelum menyentuh tabel sama sekali.

**\`CREATE DATABASE\`** membuat wadah kosong. Belum ada tabel di dalamnya — ini seperti membuat folder baru, bukan berkas.

**\`USE\`** memilih basis data yang aktif. Ini yang paling sering terlupa. Tanpa \`USE\`, perintah \`CREATE TABLE\` akan ditolak dengan *"No database selected"*, karena MySQL tidak tahu tabel itu harus ditaruh di mana. Perhatikan bahwa \`USE\` adalah satu-satunya perintah di sini yang **tidak wajib diakhiri titik koma** di klien MySQL, meski menuliskannya tetap aman.

Kesalahan yang lazim: menulis \`USE DATABASE nama;\`. Kata \`DATABASE\` tidak boleh ada di situ, dan MySQL akan mengira \`database\` adalah nama basis datanya, lalu mengeluh *"Unknown database 'database'"*.

**\`SHOW DATABASES;\`** menampilkan semua basis data di server. Kamu akan melihat beberapa nama bawaan yang **jangan disentuh**: \`mysql\` (menyimpan daftar pengguna dan hak akses), \`information_schema\` (katalog berisi keterangan tentang seluruh tabel), \`performance_schema\`, dan \`phpmyadmin\`.

**\`DROP DATABASE\`** menghapus basis data **beserta seluruh tabel dan isinya**, tanpa konfirmasi dan tanpa tong sampah. Tidak ada tombol urung. Perintah ini yang paling sering menimbulkan penyesalan.

Soal titik koma: ia menandai **akhir perintah**, bukan akhir baris. Kalau kamu menekan Enter sebelum menulis titik koma, MySQL menampilkan prompt lanjutan \`->\` dan menunggu. Itu bukan error — ia hanya belum menganggap perintahmu selesai. Ketik titik koma lalu Enter untuk menutupnya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Sesi pertama: dari nol sampai punya basis data
-- ============================================

-- 1. Lihat dulu apa yang sudah ada di server
SHOW DATABASES;

-- 2. Buat basis data baru
CREATE DATABASE Hafizh_H1D024061;

-- Lebih aman: hanya buat kalau belum ada,
-- supaya tidak error saat skrip dijalankan dua kali
CREATE DATABASE IF NOT EXISTS Hafizh_H1D024061;

-- 3. Pilih basis data yang mau dipakai
--    Tanpa baris ini, CREATE TABLE akan ditolak
USE Hafizh_H1D024061;

-- 4. Pastikan sedang berada di basis data yang benar
SELECT DATABASE();

-- 5. Lihat tabel di dalamnya (masih kosong)
SHOW TABLES;

-- 6. Menghapus basis data -- HATI-HATI, tidak bisa dibatalkan
DROP DATABASE Hafizh_H1D024061;`
  },

  output: `MariaDB [(none)]> CREATE DATABASE Hafizh_H1D024061;
Query OK, 1 row affected (0.001 sec)

MariaDB [(none)]> USE Hafizh_H1D024061;
Database changed

MariaDB [Hafizh_H1D024061]> SELECT DATABASE();
+------------------+
| DATABASE()       |
+------------------+
| hafizh_h1d024061 |
+------------------+
1 row in set (0.000 sec)

MariaDB [Hafizh_H1D024061]> SHOW TABLES;
Empty set (0.000 sec)`,

  kesalahanUmum: [
    {
      salah: 'Menjalankan CREATE TABLE langsung setelah masuk, tanpa USE lebih dulu.',
      kenapa: 'MySQL menolak dengan "ERROR 1046 (3D000): No database selected". Pesannya membingungkan pemula karena perintah CREATE TABLE-nya sendiri sudah benar — yang kurang justru langkah sebelumnya. Prompt yang masih menunjukkan [(none)] adalah petunjuk paling jelas.',
      benar: 'Jalankan USE nama_database; lebih dulu. Perhatikan prompt berubah dari [(none)] menjadi [nama_database], baru lanjut membuat tabel.'
    },
    {
      salah: 'Menulis USE DATABASE Penjualan_Barang;',
      kenapa: 'Kata DATABASE tidak termasuk sintaks USE. MySQL membacanya sebagai nama basis data, lalu melapor "ERROR 1049 (42000): Unknown database \'database\'". Kebingungan muncul karena CREATE DATABASE memang memakai kata itu, sehingga terasa wajar kalau USE juga.',
      benar: 'USE Penjualan_Barang; — langsung namanya saja, tanpa kata DATABASE.'
    },
    {
      salah: 'Menekan Enter tanpa titik koma, lalu panik melihat prompt berubah jadi ->',
      kenapa: 'Titik koma menandai akhir perintah, bukan akhir baris. MySQL menyangka perintahmu belum selesai dan menunggu kelanjutannya. Kalau kamu terus mengetik perintah baru di situ, keduanya akan menyatu menjadi satu perintah rusak dan memicu error sintaks yang menunjuk baris yang terlihat benar.',
      benar: 'Ketik titik koma lalu Enter untuk menutup perintah. Kalau sudah terlanjur kacau, ketik \\c lalu Enter untuk membatalkan perintah yang sedang disusun.'
    },
    {
      salah: 'Menyangka nama basis data di MySQL bersifat peka huruf besar-kecil, atau sebaliknya menyangka selalu tidak peka.',
      kenapa: 'Jawabannya bergantung sistem operasi. Di Windows nama basis data tidak peka huruf, dan MySQL bahkan menyimpannya sebagai huruf kecil semua — itu sebabnya Hafizh_H1D024061 muncul sebagai hafizh_h1d024061 di SHOW DATABASES. Di Linux nama itu peka huruf. Skrip yang jalan di laptop bisa gagal di server karena hal ini.',
      benar: 'Biasakan menulis nama basis data dan tabel dengan huruf kecil semua sejak awal, supaya perilakunya sama di mana pun.'
    }
  ],

  analogi: `Bayangkan sebuah perpustakaan.

**Basis data** adalah koleksi bukunya. **DBMS** adalah pustakawannya.

Kamu tidak masuk sendiri ke gudang untuk mengambil buku. Kamu bilang ke pustakawan judul yang dicari, dan dia yang tahu rak mana, bagaimana mencarinya cepat, siapa yang sedang meminjam, dan siapa yang boleh membaca koleksi terbatas.

Kalau tanpa pustakawan, dua orang bisa mengambil buku terakhir yang sama secara bersamaan — itulah masalah **akses bersamaan**. Kalau daftar alamat anggota ditulis ulang di setiap kartu peminjaman, satu anggota pindah rumah berarti puluhan kartu harus diperbaiki, dan pasti ada yang terlewat — itulah **redundansi** yang berujung **inkonsistensi**.

\`CREATE DATABASE\` berarti membuka cabang perpustakaan baru. \`USE\` berarti memberi tahu pustakawan cabang mana yang sedang kamu urus. Dan \`DROP DATABASE\` berarti membakar seluruh cabang itu — karena itulah ia perintah yang paling perlu kamu takuti.`,

  latihan: [
    'Jelaskan dengan kalimatmu sendiri perbedaan basis data dan DBMS, lalu beri satu contoh masing-masing.',
    'Sebutkan tiga kelebihan memakai DBMS dibandingkan menyimpan data di spreadsheet, dan kaitkan tiap kelebihan dengan salah satu masalah: redundansi, inkonsistensi, atau anomali.',
    'Buat basis data bernama latihan_toko, pilih basis data tersebut, lalu buktikan bahwa kamu sudah berada di dalamnya dengan SELECT DATABASE().',
    'Jalankan SHOW DATABASES; lalu catat basis data bawaan yang muncul. Cari tahu fungsi information_schema, dan jelaskan kenapa ia tidak boleh dihapus.',
    'Sebuah berkas Excel penjualan memuat kolom: nama_pelanggan, alamat, nama_barang, harga. Tunjukkan satu contoh nyata anomali penyisipan dan satu contoh anomali penghapusan yang bisa terjadi pada berkas itu.'
  ]
});

TOPICS.push({
  id: 'basdat-model-relasional',
  judul: 'Model Relasional & Kunci',
  kategori: 'basis-data',
  tag: ['tabel', 'relasi', 'primary key', 'foreign key', 'candidate key', 'NULL'],
  ringkas: 'Tabel, baris, kolom — dan kunci yang membuat tabel-tabel itu bisa saling menunjuk.',

  fungsi: `**Menyusun data ke dalam tabel yang saling terhubung, dengan kunci yang menjaga hubungannya tetap benar.**

Ini pondasi dari semua yang datang sesudahnya. Salah di sini, dan seluruh basis datamu akan menyulitkan sampai akhir.

Terpakai di:

- **Merancang tabel apa pun** — kunci utama dan kunci asing adalah keputusan pertama
- **Menjaga data tetap masuk akal** — basis data menolak menyimpan nilai mahasiswa yang NIM-nya tidak ada
- **JOIN** — hanya mungkin kalau ada kunci yang menghubungkan
- **ORM** di kerangka kerja web — relasi \`hasMany\` dan \`belongsTo\` adalah kunci asing
- **Analisis & Desain Sistem** — diagram kelas diterjemahkan ke tabel lewat aturan ini

Manfaat yang paling sering diremehkan: **integritas referensial**. Ia mencegah baris yatim — data nilai yang menunjuk mahasiswa yang sudah dihapus — dan mencegahnya di **tingkat basis data**, sehingga tetap berlaku meski datanya diubah lewat jalan lain.`,

  praktik: {
    tujuan: `Kamu punya tiga tabel bertautan dengan kunci yang benar, dan sudah membuktikan basis datamu menolak data yang melanggar hubungannya.`,
    alat: [
      'MySQL, PostgreSQL, atau SQLite',
      'Klien basis data'
    ],
    langkah: [
      { judul: 'Tentukan kunci utama tiap tabel',
        isi: `Kunci utama harus: **unik**, **tidak pernah kosong**, dan **tidak pernah berubah**.

Butir terakhir sering dilanggar. Memakai NIM sebagai kunci utama tampak wajar sampai ada mahasiswa yang NIM-nya harus dikoreksi — dan koreksi itu harus merambat ke semua tabel yang menunjuknya.

Karena itu banyak yang memakai **kunci buatan**: kolom \`id\` yang bertambah otomatis dan tidak punya arti apa pun di dunia nyata.` },
      { judul: 'Buat tabel induk lebih dulu',
        isi: `Kunci asing hanya bisa menunjuk tabel yang **sudah ada**. Jadi urutan pembuatannya penting.

Buat \`mahasiswa\` dan \`matakuliah\` dulu, baru \`krs\` yang menunjuk keduanya.

Kalau kamu terbalik, basis datanya akan menolak dengan pesan yang membingungkan.` },
      { judul: 'Nyatakan kunci asing dengan jelas',
        isi: `Tulis lengkap, jangan hanya menyimpan angkanya:

- \`FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id)\`

Menyimpan angka tanpa menyatakannya sebagai kunci asing berarti basis data **tidak menjaga apa-apa** — dan baris yatim akan muncul cepat atau lambat.

Di SQLite, nyalakan dulu dengan \`PRAGMA foreign_keys = ON;\`` },
      { judul: 'Buktikan bahwa ia benar-benar menjaga',
        isi: `Coba masukkan baris \`krs\` dengan \`mahasiswa_id\` yang **tidak ada** di tabel mahasiswa.

Basis datanya menolak. Itu bukti integritas referensial bekerja.

Lalu coba **hapus** mahasiswa yang masih punya baris KRS. Ia juga menolak — kecuali kamu menyatakan \`ON DELETE CASCADE\`.` },
      { judul: 'Pilih perilaku penghapusan dengan sadar',
        isi: `- \`ON DELETE RESTRICT\` — tolak penghapusan selama masih ada anaknya. Aman, dan bawaan di banyak DBMS.
- \`ON DELETE CASCADE\` — hapus anaknya sekalian. Cocok untuk data yang **tidak berarti tanpa induknya**, misalnya detail pesanan.
- \`ON DELETE SET NULL\` — kosongkan acuannya. Cocok kalau anaknya masih bermakna sendiri.

Pilih dengan sadar untuk tiap relasi. Salah pilih di sini bisa menghapus data yang seharusnya disimpan.` },
      { judul: 'Buat relasi banyak-ke-banyak dengan benar',
        isi: `Mahasiswa mengambil banyak mata kuliah, dan satu mata kuliah diambil banyak mahasiswa.

Ini **tidak bisa** diwakili dua tabel saja. Perlu **tabel penghubung** — \`krs\` — yang memuat kunci asing ke keduanya.

Kunci utamanya bisa gabungan keduanya, dan itu sekaligus mencegah satu mahasiswa mengambil mata kuliah yang sama dua kali.` }
    ],
    cek: [
      'Basis data menolak baris KRS yang menunjuk mahasiswa tidak ada',
      'Setiap tabelmu punya kunci utama yang tidak akan pernah perlu diubah',
      'Relasi banyak-ke-banyak memakai tabel penghubung, bukan kolom berisi daftar'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Dalam **model relasional**, seluruh data disimpan sebagai **tabel**. Tidak ada bentuk lain. Kesederhanaan inilah kekuatannya.

Satu tabel punya istilah resmi dan istilah sehari-hari yang berjalan bersamaan:

- **Relasi** = tabel. Perhatikan: dalam model relasional, kata "relasi" berarti **tabelnya sendiri**, bukan hubungan antartabel. Ini sumber kebingungan yang sering terjadi, karena di ERD kata "relasi" justru berarti hubungan.
- **Tupel** = baris = *record*. Satu tupel mewakili satu kenyataan, misalnya satu pelanggan.
- **Atribut** = kolom = *field*. Satu atribut mewakili satu sifat, misalnya alamat.
- **Domain** = himpunan nilai yang sah untuk sebuah kolom. Kolom \`umur\` berdomain bilangan bulat non-negatif.
- **Kardinalitas** = jumlah baris. **Derajat** = jumlah kolom.

Satu sifat penting: **urutan baris tidak bermakna**. Tabel adalah himpunan, bukan daftar. Kalau kamu ingin hasil berurutan, kamu **wajib** memintanya lewat \`ORDER BY\` — tanpa itu, DBMS boleh mengembalikan baris dalam urutan apa pun, dan urutannya bisa berubah dari waktu ke waktu.

**Kunci — inti dari seluruh model**

Kalau tabel adalah himpunan baris, harus ada cara membedakan satu baris dari yang lain. Itulah tugas kunci.

- **Super key** — kumpulan kolom apa pun yang nilainya unik untuk tiap baris. \`{NIM}\` unik, tetapi \`{NIM, Nama}\` juga unik. Keduanya super key.
- **Candidate key** — super key yang **tidak punya kolom berlebih**. \`{NIM, Nama}\` bukan candidate key karena \`Nama\` bisa dibuang tanpa merusak keunikan. \`{NIM}\` adalah candidate key.
- **Primary key** — satu candidate key yang **kamu pilih** sebagai identitas resmi. Kalau ada dua candidate key, misalnya NIM dan email, kamu memilih salah satu.
- **Alternate key** — candidate key yang tidak terpilih jadi primary key.
- **Foreign key** — kolom yang **menunjuk ke primary key tabel lain**. Inilah yang menyambung tabel-tabel.

**Aturan yang dijamin DBMS**

- **Integritas entitas** — primary key **tidak boleh NULL** dan tidak boleh kembar. Masuk akal: kalau identitasnya kosong, baris itu tidak bisa dibedakan dari baris lain.
- **Integritas referensial** — nilai foreign key **harus benar-benar ada** di tabel yang ditunjuk, atau NULL. Kamu tidak bisa mencatat pesanan atas nama pelanggan yang tidak terdaftar.

**NULL bukan nol, bukan string kosong**

\`NULL\` berarti **nilainya tidak diketahui atau tidak berlaku**. Ini bukan angka 0, bukan teks kosong \`''\`, bukan spasi. Akibatnya sangat praktis: \`NULL = NULL\` **tidak menghasilkan benar** — ia menghasilkan NULL, karena dua hal yang sama-sama tak diketahui belum tentu sama. Itu sebabnya menyaring nilai kosong harus memakai \`IS NULL\`, bukan \`= NULL\`.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'CREATE TABLE customers (\n  cust_id      CHAR(5)     NOT NULL,\n  cust_name    VARCHAR(25) NOT NULL,\n  cust_address VARCHAR(30) NULL,\n  PRIMARY KEY (cust_id)\n);',
      penjelasan: `
Perhatikan tiga keputusan yang dibuat di sini, karena tiap barisnya menyatakan aturan.

**\`cust_id CHAR(5)\`** — dipilih \`CHAR\` alih-alih \`INT\` karena kode pelanggan bukan bilangan yang dihitung. Kamu tidak akan pernah menjumlahkan dua kode pelanggan. Lagi pula kode seperti \`00123\` akan kehilangan nol di depannya kalau disimpan sebagai angka.

**\`NOT NULL\` pada nama, \`NULL\` pada alamat** — ini pernyataan tentang dunia nyata, bukan sekadar teknis. Kamu memutuskan bahwa pelanggan **wajib** punya nama, tetapi **boleh** tidak punya alamat tercatat. Setiap kali menulis \`NOT NULL\`, kamu sedang berjanji bahwa data itu selalu ada.

**\`PRIMARY KEY (cust_id)\`** ditulis terpisah di baris sendiri, bukan menempel seperti \`cust_id CHAR(5) PRIMARY KEY\`. Keduanya sah. Bentuk terpisah lebih disukai karena satu-satunya bentuk yang sanggup menangani **primary key gabungan** — misalnya \`PRIMARY KEY (nim, kode_mk)\` pada tabel KRS.

Satu hal yang tidak terlihat: \`PRIMARY KEY\` diam-diam melakukan tiga hal sekaligus — memaksa unik, memaksa \`NOT NULL\`, dan **membuat indeks**. Indeks inilah yang membuat pencarian berdasarkan \`cust_id\` tetap cepat meski tabelnya jutaan baris.
`
    },
    {
      bahasa: 'sql',
      kode: 'CREATE TABLE orders (\n  order_num  INT      NOT NULL,\n  order_date DATE     NOT NULL,\n  cust_id    CHAR(5)  NOT NULL,\n  PRIMARY KEY (order_num),\n  FOREIGN KEY (cust_id) REFERENCES customers(cust_id)\n);',
      penjelasan: `
Baris \`FOREIGN KEY\` inilah yang mengubah dua tabel terpisah menjadi sebuah basis data.

Bacanya: *"kolom \`cust_id\` di tabel ini menunjuk ke kolom \`cust_id\` di tabel \`customers\`."*

Setelah baris itu ada, DBMS akan **menolak** setiap pesanan yang menyebut pelanggan tak terdaftar. Cobalah menyisipkan pesanan dengan \`cust_id = '99999'\` yang tidak ada di \`customers\`, dan MySQL menjawab *"Cannot add or update a child row: a foreign key constraint fails"*. Penolakan itu bukan gangguan — itu justru layanan. Tanpanya, basis datamu perlahan terisi pesanan hantu.

Dua syarat yang sering menjegal saat membuat foreign key:

- **Tipe datanya harus cocok.** \`cust_id\` di sini \`CHAR(5)\`, sama persis dengan di \`customers\`. Kalau salah satunya \`VARCHAR(5)\` atau \`CHAR(13)\`, MySQL menolak dengan pesan yang tidak informatif, biasanya *errno 150*.
- **Tabel tujuan harus dibuat lebih dulu.** Kamu tidak bisa menunjuk ke sesuatu yang belum ada. Karena itu urutan pembuatan tabel penting: \`customers\` dulu, \`orders\` kemudian.

Di MySQL ada satu jebakan tambahan: foreign key hanya berlaku pada mesin penyimpanan **InnoDB**. Kalau tabelnya dibuat dengan MyISAM, MySQL menerima sintaksnya tanpa protes tetapi **mengabaikannya diam-diam**. MariaDB versi baru memakai InnoDB sebagai bawaan, jadi biasanya aman.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Salah: tidak pernah menemukan apa pun\nSELECT * FROM customers WHERE cust_address = NULL;\n\n-- Benar\nSELECT * FROM customers WHERE cust_address IS NULL;',
      penjelasan: `
Ini jebakan NULL yang paling sering memakan korban, dan gejalanya jahat: **tidak ada error sama sekali**, hanya hasil kosong.

Sebabnya, \`NULL\` bukan sebuah nilai melainkan **penanda ketiadaan nilai**. Membandingkan sesuatu dengan yang tidak diketahui menghasilkan "tidak diketahui" pula. Jadi \`cust_address = NULL\` tidak menghasilkan benar maupun salah — hasilnya NULL, dan \`WHERE\` hanya meloloskan baris yang kondisinya **benar**. Akibatnya tidak ada satu baris pun lolos.

Karena itulah SQL menyediakan operator khusus: **\`IS NULL\`** dan **\`IS NOT NULL\`**.

Akibat lain yang perlu diingat, karena sering muncul di soal:

- \`NULL + 100\` menghasilkan \`NULL\`, bukan 100. Satu nilai kosong mencemari seluruh perhitungan.
- \`COUNT(kolom)\` **melewatkan** baris NULL, sedangkan \`COUNT(*)\` menghitung semua baris. Dua angka ini bisa berbeda pada tabel yang sama.
- \`AVG(kolom)\` juga mengabaikan NULL, sehingga pembaginya bukan jumlah seluruh baris.

Cara membaca nilai NULL sebagai angka pengganti: \`IFNULL(cust_address, 'Belum diisi')\` di MySQL, atau \`COALESCE\` yang berlaku umum di semua dialek SQL.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Dua tabel yang saling terhubung
-- ============================================

CREATE TABLE customers (
  cust_id      CHAR(5)     NOT NULL,
  cust_name    VARCHAR(25) NOT NULL,
  cust_email   VARCHAR(50) NULL,
  cust_address VARCHAR(30) NULL,
  PRIMARY KEY (cust_id),
  UNIQUE (cust_email)          -- alternate key: unik, tapi boleh NULL
);

CREATE TABLE orders (
  order_num  INT     NOT NULL,
  order_date DATE    NOT NULL,
  cust_id    CHAR(5) NOT NULL,
  PRIMARY KEY (order_num),
  FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);

-- Primary key gabungan: satu mahasiswa boleh mengambil banyak
-- mata kuliah, tapi tidak boleh mengambil mata kuliah yang sama dua kali
CREATE TABLE krs (
  nim     CHAR(10) NOT NULL,
  kode_mk CHAR(6)  NOT NULL,
  nilai   CHAR(1)  NULL,
  PRIMARY KEY (nim, kode_mk)
);

-- Melihat struktur dan kunci sebuah tabel
DESC customers;

-- Membuktikan aturan integritas referensial
INSERT INTO customers VALUES ('10001', 'Hafizh', NULL, 'Purwokerto');
INSERT INTO orders    VALUES (2001, '2024-09-01', '10001');   -- berhasil
INSERT INTO orders    VALUES (2002, '2024-09-02', '99999');   -- DITOLAK

-- Menyaring nilai kosong: pakai IS NULL, bukan = NULL
SELECT cust_name FROM customers WHERE cust_email IS NULL;`
  },

  output: `MariaDB [toko]> DESC customers;
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| cust_id      | char(5)     | NO   | PRI | NULL    |       |
| cust_name    | varchar(25) | NO   |     | NULL    |       |
| cust_email   | varchar(50) | YES  | UNI | NULL    |       |
| cust_address | varchar(30) | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+
4 rows in set (0.002 sec)

MariaDB [toko]> INSERT INTO orders VALUES (2002, '2024-09-02', '99999');
ERROR 1452 (23000): Cannot add or update a child row: a foreign key
constraint fails ('toko'.'orders', CONSTRAINT 'orders_ibfk_1'
FOREIGN KEY ('cust_id') REFERENCES 'customers' ('cust_id'))

MariaDB [toko]> SELECT cust_name FROM customers WHERE cust_email IS NULL;
+-----------+
| cust_name |
+-----------+
| Hafizh    |
+-----------+
1 row in set (0.000 sec)`,

  kesalahanUmum: [
    {
      salah: 'Memakai WHERE kolom = NULL untuk mencari data yang kosong.',
      kenapa: 'Perbandingan apa pun dengan NULL menghasilkan NULL, bukan benar atau salah, sedangkan WHERE hanya meloloskan baris yang kondisinya benar. Hasilnya selalu kosong. Gejalanya menipu karena tidak ada pesan error sama sekali — kueri dianggap sukses, hanya saja tidak menemukan apa-apa.',
      benar: 'Pakai WHERE kolom IS NULL, atau IS NOT NULL untuk kebalikannya.'
    },
    {
      salah: 'Menyangka NULL sama dengan 0 atau dengan string kosong.',
      kenapa: 'Ketiganya berbeda. 0 adalah angka yang diketahui, string kosong adalah teks yang diketahui panjangnya nol, sedangkan NULL berarti nilainya memang tidak ada. Akibatnya SUM dan AVG memberi hasil yang berbeda: NULL diabaikan sepenuhnya, sedangkan 0 ikut dihitung dan menyeret rata-rata turun.',
      benar: 'Putuskan sejak awal maknanya. Kalau "belum diisi", pakai NULL. Kalau "nilainya memang nol", simpan 0. Jangan campur keduanya dalam satu kolom.'
    },
    {
      salah: 'Membuat foreign key dengan tipe data yang sedikit berbeda dari kolom yang ditunjuk, misalnya CHAR(13) menunjuk ke CHAR(5).',
      kenapa: 'MySQL menolak dengan "errno: 150 Foreign key constraint is incorrectly formed" — pesan yang tidak menyebutkan kolom mana yang bermasalah, sehingga sulit dilacak pada tabel dengan banyak kolom. Panjang dan tipe harus sama persis, termasuk soal bertanda atau tidak pada tipe angka.',
      benar: 'Salin persis tipe kolom yang ditunjuk. Jalankan DESC pada tabel tujuan lebih dulu untuk memastikan.'
    },
    {
      salah: 'Menganggap urutan baris hasil SELECT akan selalu sama dengan urutan saat data dimasukkan.',
      kenapa: 'Tabel relasional adalah himpunan, dan DBMS bebas mengembalikan baris dalam urutan mana pun. Selama tabel masih kecil, urutannya sering kebetulan sama dengan urutan penyisipan sehingga asumsi ini terasa benar. Setelah data bertambah atau indeks berubah, urutannya bisa berubah tanpa peringatan dan laporan yang tadinya rapi jadi berantakan.',
      benar: 'Selalu tulis ORDER BY secara eksplisit kalau urutan itu penting. Jangan pernah mengandalkan urutan bawaan.'
    },
    {
      salah: 'Mengira "relasi" pada model relasional berarti hubungan antartabel.',
      kenapa: 'Dalam model relasional, relasi justru berarti tabelnya sendiri. Hubungan antartabel diwujudkan lewat foreign key. Kekeliruan ini membuat soal ujian yang menanyakan derajat atau kardinalitas sebuah relasi jadi salah dijawab, karena yang dibayangkan adalah garis penghubung di ERD.',
      benar: 'Ingat: relasi = tabel. Kardinalitas relasi = jumlah barisnya, derajat relasi = jumlah kolomnya.'
    }
  ],

  analogi: `Bayangkan buku induk sekolah.

**Tabel** adalah satu halaman besar berisi daftar. **Baris** adalah satu murid. **Kolom** adalah satu jenis keterangan: nama, alamat, tanggal lahir.

**Primary key** adalah nomor induk. Kenapa bukan nama? Karena bisa ada dua murid bernama Budi Santoso, sedangkan nomor induk dijamin tidak pernah kembar. Dan kenapa nomor induk tidak boleh kosong? Karena murid tanpa nomor induk tidak bisa dibedakan dari murid lain yang juga tanpa nomor.

**Foreign key** adalah nomor induk yang ditulis ulang di buku peminjaman perpustakaan. Buku itu tidak mencatat nama dan alamat lagi — cukup nomornya, lalu lihat buku induk kalau butuh keterangan lengkap. Kalau petugas menulis nomor induk yang tidak terdaftar, kepala sekolah akan menolak buku itu. Itulah **integritas referensial**.

**NULL** adalah kolom yang **dikosongkan**, dan ini beda dengan ditulis angka nol. Kolom "nilai ujian" yang kosong berarti *belum ujian*; kolom yang ditulis 0 berarti *sudah ujian dan dapat nol*. Dua keadaan yang sangat berbeda nasibnya, dan itulah kenapa SQL memperlakukan NULL secara khusus.`,

  latihan: [
    'Untuk tabel Mahasiswa(NIM, Nama, Email, Jurusan), sebutkan satu super key yang bukan candidate key, dua candidate key, lalu tentukan mana yang paling pantas jadi primary key dan jelaskan alasanmu.',
    'Buat tabel dosen dan tabel mata_kuliah, dengan mata_kuliah memuat foreign key yang menunjuk ke dosen. Buktikan integritas referensial bekerja dengan sengaja menyisipkan mata kuliah yang dosennya tidak terdaftar, lalu catat pesan errornya.',
    'Jelaskan kenapa PRIMARY KEY (nim, kode_mk) pada tabel KRS lebih tepat daripada menambahkan kolom id tersendiri. Apa yang dicegah oleh kunci gabungan itu?',
    'Sebuah tabel nilai memuat 10 baris, 3 di antaranya kolom nilai-nya NULL. Berapa hasil COUNT(*), COUNT(nilai), dan bagaimana AVG(nilai) menghitung pembaginya? Jelaskan selisihnya.',
    'Rancang tabel buku dan peminjaman untuk perpustakaan, tentukan primary key dan foreign key-nya, lalu tuliskan satu contoh baris yang akan ditolak DBMS beserta alasannya.'
  ]
});

TOPICS.push({
  id: 'basdat-erd',
  judul: 'Entity Relationship Diagram (ERD)',
  kategori: 'basis-data',
  tag: ['ERD', 'entitas', 'atribut', 'relasi', 'kardinalitas', 'one-to-many'],
  ringkas: 'Menggambar dunia nyata sebelum menulis satu baris SQL pun — entitas, atribut, relasi, dan kardinalitasnya.',

  fungsi: `**Merancang struktur basis data di atas kertas sebelum satu tabel pun dibuat.**

Mengubah gambar butuh lima menit. Mengubah tabel yang sudah berisi sepuluh ribu baris dan dipakai lima halaman aplikasi butuh berhari-hari.

Terpakai di:

- **Bab perancangan** pada laporan tugas akhir dan Kerja Praktik — hampir selalu diminta
- **Menyepakati rancangan** dengan anggota kelompok sebelum siapa pun menulis kode
- **Membaca basis data orang lain** — ERD hasil rekayasa balik menjelaskan sistemnya lebih cepat daripada membaca kodenya
- **Analisis & Desain Sistem** — ERD dan diagram kelas saling melengkapi

Manfaat yang paling nyata: **kardinalitas memaksa pertanyaan yang belum terjawab**. Saat kamu harus memutuskan apakah satu dosen membimbing satu atau banyak mahasiswa, kamu menemukan bahwa aturannya **belum pernah ditetapkan siapa pun** — dan itu jauh lebih murah ditemukan sekarang.`,

  praktik: {
    tujuan: `Kamu punya satu ERD lengkap untuk sistem nyata, sudah diperiksa kardinalitasnya, dan siap diterjemahkan menjadi perintah CREATE TABLE.`,
    alat: [
      'draw.io (gratis, jalan di peramban) atau dbdiagram.io',
      'Kertas untuk sketsa pertama — lebih cepat daripada alat mana pun'
    ],
    langkah: [
      { judul: 'Daftar kata bendanya dulu',
        isi: `Tulis deskripsi sistemmu dalam beberapa kalimat, lalu **lingkari semua kata bendanya**.

*"Mahasiswa mengambil mata kuliah yang diajar dosen di ruang tertentu"* memberi empat kandidat entitas sekaligus.

Tidak semua kata benda jadi entitas, tetapi ini titik awal yang jauh lebih baik daripada menebak.` },
      { judul: 'Bedakan entitas dari atribut',
        isi: `Pertanyaan penentunya: **apakah ia punya sifat lain selain namanya?**

- "Jurusan" yang cuma berisi nama → cukup jadi **atribut**
- "Jurusan" yang punya kaprodi, akreditasi, dan tahun berdiri → jadi **entitas** sendiri

Kalau ragu, jadikan entitas. Memecah nanti lebih mudah daripada menggabung.` },
      { judul: 'Tentukan kardinalitas dengan bertanya DUA ARAH',
        isi: `Untuk setiap hubungan, tanyakan **dua kali**:

- *"Satu dosen membimbing berapa mahasiswa?"* → banyak
- *"Satu mahasiswa dibimbing berapa dosen?"* → satu

Jawaban dua arah itu menentukan jenisnya: satu-ke-banyak.

**Jangan lewatkan arah keduanya.** Di situlah kesalahan rancangan paling sering bersembunyi.` },
      { judul: 'Tandai yang wajib dan yang boleh kosong',
        isi: `Partisipasi **total** berarti setiap baris **harus** punya pasangan; **parsial** berarti boleh tidak punya.

Contoh: setiap KRS **harus** milik seorang mahasiswa (total), tetapi seorang mahasiswa **boleh** belum punya KRS sama sekali (parsial).

Ini yang nanti menentukan kolomnya \`NOT NULL\` atau tidak.` },
      { judul: 'Pecah relasi banyak-ke-banyak',
        isi: `Relasi banyak-ke-banyak **tidak bisa langsung jadi tabel**. Ia harus dipecah menjadi dua relasi satu-ke-banyak lewat entitas penghubung.

Dan sering kali entitas penghubung itu **punya atributnya sendiri** — KRS punya nilai dan semester, yang tidak dimiliki mahasiswa maupun mata kuliah.

Menemukan atribut itu adalah tanda pemecahannya benar.` },
      { judul: 'Terjemahkan ke tabel',
        isi: `Aturannya lugas:

- tiap **entitas** → satu tabel
- tiap **atribut** → satu kolom
- relasi **satu-ke-banyak** → kunci asing di sisi "banyak"
- relasi **banyak-ke-banyak** → tabel baru berisi dua kunci asing

Tulis \`CREATE TABLE\`-nya, jalankan, dan lihat apakah rancanganmu bertahan.` },
      { judul: 'Uji dengan pertanyaan nyata',
        isi: `Sebelum menganggapnya selesai, tulis lima pertanyaan yang **harus** bisa dijawab sistemmu — misalnya *"berapa IPK mahasiswa X semester 3?"*

Telusuri di ERD-mu apakah datanya tersedia. Kalau ada satu saja yang tidak bisa dijawab, rancangannya belum lengkap.

Ini jauh lebih murah dilakukan sekarang daripada setelah tabelnya berisi data.` }
    ],
    cek: [
      'Setiap hubungan di ERD-mu sudah ditanya dari dua arah',
      'Tidak ada relasi banyak-ke-banyak yang tersisa tanpa entitas penghubung',
      'Kelima pertanyaan ujimu bisa dijawab dari struktur yang kamu rancang'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa digambar begitu',

  konsep: `
**ERD** adalah gambar rancangan basis data, dibuat **sebelum** tabelnya dibikin. Gunanya memindahkan aturan dunia nyata ke atas kertas, di mana kesalahan masih murah diperbaiki. Mengubah garis di ERD butuh sepuluh detik; mengubah struktur tabel yang sudah berisi sejuta baris butuh semalaman.

**Empat komponen yang wajib dikuasai**

- **Entitas** — objek yang datanya ingin disimpan, dan yang bisa dibedakan satu sama lain. Digambar sebagai **persegi panjang**. Contoh: Mahasiswa, Mata Kuliah, Pelanggan. Cirinya: kalau kamu bisa bertanya *"ada berapa?"* dan jawabannya masuk akal, itu kemungkinan entitas.
- **Atribut** — sifat yang melekat pada entitas. Digambar sebagai **elips**. Contoh: NIM, Nama, Alamat.
- **Relasi** — hubungan antarentitas. Digambar sebagai **belah ketupat**, dan namanya sebaiknya **kata kerja**: *mengambil*, *memiliki*, *memesan*.
- **Kardinalitas** — angka yang menempel di garis relasi, menyatakan **berapa banyak** yang boleh terhubung.

**Jenis atribut yang sering ditanyakan**

- **Atribut kunci** — penanda unik. Digarisbawahi. Contoh: <u>NIM</u>.
- **Atribut komposit** — masih bisa dipecah. \`Alamat\` bisa dipecah menjadi Jalan, Kota, Kode Pos.
- **Atribut multinilai** — satu entitas boleh punya beberapa nilai sekaligus. Satu mahasiswa bisa punya dua nomor telepon. Digambar dengan **elips ganda**.
- **Atribut turunan** — bisa dihitung dari atribut lain, jadi sebenarnya tidak perlu disimpan. \`Umur\` diturunkan dari \`TanggalLahir\`. Digambar dengan **elips putus-putus**.

**Kardinalitas — bagian yang paling menentukan**

- **One-to-One (1:1)** — satu berbanding satu. Satu orang punya satu KTP, dan satu KTP milik satu orang.
- **One-to-Many (1:N)** — satu berbanding banyak. Satu dosen membimbing banyak mahasiswa, tetapi satu mahasiswa dibimbing satu dosen. **Ini yang paling sering muncul.**
- **Many-to-Many (M:N)** — banyak berbanding banyak. Satu mahasiswa mengambil banyak mata kuliah, dan satu mata kuliah diambil banyak mahasiswa.

**Aturan mengubah ERD menjadi tabel**

Inilah bagian yang sering ditanyakan di ujian, dan aturannya sebenarnya cuma tiga:

- **1:1** — foreign key boleh ditaruh di salah satu sisi. Pilih sisi yang lebih jarang kosong.
- **1:N** — foreign key **selalu ditaruh di sisi "banyak"**. Satu dosen membimbing banyak mahasiswa, maka \`kode_dosen\` ditaruh di tabel **mahasiswa**. Kalau dibalik, tabel dosen harus memuat banyak NIM dalam satu kolom — dan itu langsung melanggar 1NF.
- **M:N** — **wajib membuat tabel ketiga**. Tidak ada pilihan lain. Tabel penghubung ini memuat foreign key dari kedua sisi, dan biasanya keduanya sekaligus menjadi primary key gabungan. Tabel KRS adalah contoh klasiknya.

Aturan 1:N di atas layak dihafalkan, karena setengah kesalahan rancangan pemula berasal dari menaruh foreign key di sisi yang salah.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- ERD:  Dosen  1 ----< membimbing >---- N  Mahasiswa\n--\n-- Foreign key ditaruh di sisi BANYAK, yaitu mahasiswa\n\nCREATE TABLE dosen (\n  nip  CHAR(10) NOT NULL,\n  nama VARCHAR(50) NOT NULL,\n  PRIMARY KEY (nip)\n);\n\nCREATE TABLE mahasiswa (\n  nim         CHAR(10) NOT NULL,\n  nama        VARCHAR(50) NOT NULL,\n  nip_pembimbing CHAR(10) NULL,\n  PRIMARY KEY (nim),\n  FOREIGN KEY (nip_pembimbing) REFERENCES dosen(nip)\n);',
      penjelasan: `
Perhatikan di mana \`nip_pembimbing\` diletakkan: di tabel **mahasiswa**, yaitu sisi "banyak".

Kenapa harus begitu? Coba bayangkan kebalikannya. Kalau foreign key ditaruh di tabel \`dosen\`, satu baris dosen harus menampung NIM semua mahasiswa bimbingannya. Kolomnya jadi berisi \`"A001, A002, A003"\` — satu sel memuat banyak nilai. Itu melanggar aturan paling dasar basis data relasional, yaitu **setiap sel hanya boleh berisi satu nilai**, dan mencarinya pun jadi mimpi buruk.

Sebaliknya, di sisi banyak tiap baris cuma butuh **satu** nilai: satu mahasiswa punya satu pembimbing. Muat sempurna dalam satu kolom.

Cara cepat mengingatnya: **"foreign key ikut yang banyak"**, atau **"anak menunjuk ke induk"**. Mahasiswa (anak) menyimpan NIP induknya, bukan sebaliknya.

Perhatikan juga \`nip_pembimbing\` sengaja dibuat \`NULL\`. Itu keputusan sadar: mahasiswa baru boleh saja belum punya pembimbing. Kalau ditulis \`NOT NULL\`, setiap mahasiswa **wajib** langsung punya pembimbing saat pertama kali dicatat — dan itu belum tentu sesuai kenyataan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- ERD:  Mahasiswa  M ----< mengambil >---- N  MataKuliah\n--\n-- M:N tidak bisa langsung. WAJIB tabel ketiga.\n\nCREATE TABLE krs (\n  nim     CHAR(10) NOT NULL,\n  kode_mk CHAR(6)  NOT NULL,\n  nilai   CHAR(1)  NULL,\n  PRIMARY KEY (nim, kode_mk),\n  FOREIGN KEY (nim)     REFERENCES mahasiswa(nim),\n  FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk)\n);',
      penjelasan: `
Relasi banyak-ke-banyak **tidak bisa diwujudkan langsung** dengan foreign key. Coba saja: mau ditaruh di mana? Di tabel mahasiswa, satu baris harus menampung banyak kode mata kuliah. Di tabel mata kuliah, satu baris harus menampung banyak NIM. Dua-duanya melanggar aturan satu sel satu nilai.

Jalan keluarnya hanya satu: **memecahnya menjadi dua relasi 1:N** lewat tabel di tengah. Tabel \`krs\` ini punya beberapa nama: tabel penghubung, tabel asosiatif, atau *junction table*.

Perhatikan **\`PRIMARY KEY (nim, kode_mk)\`** — gabungan dua kolom. Ini bukan sekadar kerapian, melainkan aturan bisnis yang ditegakkan DBMS: **satu mahasiswa tidak boleh mengambil mata kuliah yang sama dua kali dalam satu KRS**. Kalau ada yang mencoba, MySQL menolak dengan *"Duplicate entry"*.

Kolom **\`nilai\`** menunjukkan hal penting lain: tabel penghubung sering punya atribut sendiri. Nilai bukan milik mahasiswa saja, bukan milik mata kuliah saja — ia milik **pasangan** keduanya. Atribut semacam ini disebut **atribut relasi**, dan tempatnya memang di tabel penghubung. Contoh lain: tanggal pinjam pada relasi anggota-buku, jumlah pada relasi pesanan-barang.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Atribut multinilai: satu mahasiswa boleh punya banyak nomor HP\n--\n-- SALAH -- satu sel memuat banyak nilai\n-- mahasiswa(nim, nama, no_hp)  ->  "0812..., 0813..."\n\n-- BENAR -- pecah jadi tabel sendiri\nCREATE TABLE mahasiswa_hp (\n  nim   CHAR(10)    NOT NULL,\n  no_hp VARCHAR(15) NOT NULL,\n  PRIMARY KEY (nim, no_hp),\n  FOREIGN KEY (nim) REFERENCES mahasiswa(nim)\n);',
      penjelasan: `
Atribut multinilai punya satu penyelesaian baku: **jadikan tabel sendiri**.

Godaan pemula biasanya dua-duanya buruk:

- Menyimpannya dalam satu kolom dipisah koma. Mencari siapa pemilik nomor tertentu jadi harus menyisir teks, tidak bisa diindeks, dan menambah satu nomor berarti membaca-mengubah-menulis ulang seluruh isi sel.
- Membuat kolom \`no_hp1\`, \`no_hp2\`, \`no_hp3\`. Kelihatan rapi sampai ada yang punya nomor keempat. Selain itu mencari satu nomor berarti memeriksa tiga kolom sekaligus dengan \`OR\`, dan kebanyakan barisnya akan berisi NULL.

Dengan tabel terpisah, jumlah nomor jadi tak terbatas, pencariannya satu baris kueri, dan tidak ada kolom terbuang.

Perhatikan primary key-nya \`(nim, no_hp)\` — gabungan. Artinya satu mahasiswa boleh punya banyak nomor, tetapi **tidak boleh mendaftarkan nomor yang sama dua kali**. Sekali lagi, aturan dunia nyata ditegakkan lewat pemilihan kunci.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Dari ERD ke tabel: kasus akademik lengkap
-- ============================================
--
-- ERD yang dirancang:
--
--   Dosen ---1---< membimbing >---N--- Mahasiswa
--   Mahasiswa ---M---< mengambil >---N--- MataKuliah
--
-- Aturan yang dipakai:
--   1:N  -> foreign key di sisi banyak
--   M:N  -> buat tabel ketiga

CREATE TABLE dosen (
  nip  CHAR(10)    NOT NULL,
  nama VARCHAR(50) NOT NULL,
  PRIMARY KEY (nip)
);

CREATE TABLE mata_kuliah (
  kode_mk CHAR(6)     NOT NULL,
  nama_mk VARCHAR(50) NOT NULL,
  sks     INT         NOT NULL,
  PRIMARY KEY (kode_mk)
);

-- Relasi 1:N -> nip_pembimbing ikut ke sisi banyak
CREATE TABLE mahasiswa (
  nim            CHAR(10)    NOT NULL,
  nama           VARCHAR(50) NOT NULL,
  tanggal_lahir  DATE        NULL,
  nip_pembimbing CHAR(10)    NULL,
  PRIMARY KEY (nim),
  FOREIGN KEY (nip_pembimbing) REFERENCES dosen(nip)
);

-- Relasi M:N -> tabel penghubung, dengan atribut relasi sendiri
CREATE TABLE krs (
  nim     CHAR(10) NOT NULL,
  kode_mk CHAR(6)  NOT NULL,
  nilai   CHAR(1)  NULL,
  PRIMARY KEY (nim, kode_mk),
  FOREIGN KEY (nim)     REFERENCES mahasiswa(nim),
  FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk)
);

-- Atribut multinilai -> tabel sendiri
CREATE TABLE mahasiswa_hp (
  nim   CHAR(10)    NOT NULL,
  no_hp VARCHAR(15) NOT NULL,
  PRIMARY KEY (nim, no_hp),
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Membuktikan kunci gabungan menolak KRS ganda
INSERT INTO krs VALUES ('H1D024061', 'MK001', NULL);
INSERT INTO krs VALUES ('H1D024061', 'MK001', NULL);   -- DITOLAK

-- Atribut turunan tidak disimpan, tapi dihitung saat dibutuhkan
SELECT nama, TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) AS umur
FROM mahasiswa;`
  },

  output: `MariaDB [akademik]> INSERT INTO krs VALUES ('H1D024061', 'MK001', NULL);
Query OK, 1 row affected (0.004 sec)

MariaDB [akademik]> INSERT INTO krs VALUES ('H1D024061', 'MK001', NULL);
ERROR 1062 (23000): Duplicate entry 'H1D024061-MK001' for key 'PRIMARY'

MariaDB [akademik]> SELECT nama, TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) AS umur
    -> FROM mahasiswa;
+--------+------+
| nama   | umur |
+--------+------+
| Hafizh |   20 |
+--------+------+
1 row in set (0.001 sec)`,

  kesalahanUmum: [
    {
      salah: 'Menaruh foreign key di sisi "satu" pada relasi one-to-many.',
      kenapa: 'Sisi "satu" jadi harus menampung banyak nilai dalam satu sel, misalnya kolom di tabel dosen berisi daftar NIM dipisah koma. Ini melanggar aturan satu sel satu nilai, membuat pencarian tidak bisa memakai indeks, dan menambah satu mahasiswa berarti menyunting teks di dalam sel. Kesalahan ini terasa wajar karena secara bahasa "dosen memiliki mahasiswa" terdengar seperti dosen yang harus menyimpan daftarnya.',
      benar: 'Foreign key selalu di sisi banyak. Ingat "anak menunjuk ke induk": mahasiswa menyimpan NIP pembimbingnya.'
    },
    {
      salah: 'Mencoba menghubungkan relasi many-to-many langsung dengan foreign key di kedua tabel.',
      kenapa: 'Tidak ada susunan yang berhasil. Menaruh kode mata kuliah di tabel mahasiswa memaksa satu sel memuat banyak kode, dan sebaliknya juga sama. Selain itu tidak ada tempat untuk menyimpan atribut milik pasangan, seperti nilai atau tanggal ambil.',
      benar: 'Selalu buat tabel penghubung dengan primary key gabungan dari kedua foreign key. Atribut milik pasangan diletakkan di tabel itu.'
    },
    {
      salah: 'Menyimpan atribut turunan seperti umur atau total_harga sebagai kolom biasa.',
      kenapa: 'Nilainya langsung basi. Umur bertambah tiap tahun tanpa ada yang memperbaruinya, dan total_harga tidak ikut berubah saat salah satu item pesanan disunting. Basis data jadi memuat dua kebenaran yang bertentangan, dan yang salah justru yang lebih sering dibaca orang.',
      benar: 'Simpan yang mendasar saja, yaitu tanggal_lahir dan harga satuan, lalu hitung saat dibutuhkan lewat SELECT. Kalau perhitungannya berat dan sering dipakai, barulah pertimbangkan view.'
    },
    {
      salah: 'Menamai relasi dengan kata benda, misalnya belah ketupat diberi nama "KRS" atau "Data".',
      kenapa: 'Relasi menyatakan tindakan atau keterhubungan, sehingga nama kata benda membuat ERD sulit dibaca sebagai kalimat. Diagram yang baik bisa dibaca lurus: "Mahasiswa mengambil MataKuliah". Kalau belah ketupatnya bernama "KRS", kalimatnya jadi "Mahasiswa KRS MataKuliah" yang tidak berarti apa-apa.',
      benar: 'Beri nama relasi dengan kata kerja: mengambil, membimbing, memesan, meminjam. Nama tabel hasilnya boleh saja tetap krs.'
    },
    {
      salah: 'Menjadikan nama orang sebagai primary key karena terlihat unik di data contoh.',
      kenapa: 'Unik pada sepuluh baris pertama tidak berarti unik selamanya. Begitu ada dua orang bernama sama, penyisipan ditolak dan tidak ada jalan keluar selain mengubah struktur tabel yang sudah berisi data. Nama juga bisa berubah karena pernikahan atau koreksi ejaan, sedangkan primary key idealnya tidak pernah berubah karena dirujuk banyak tabel lain.',
      benar: 'Pakai kode yang memang dirancang unik dan tidak berubah, seperti NIM atau NIP. Kalau tidak ada, buat kolom id tersendiri.'
    }
  ],

  analogi: `Bayangkan kamu merancang denah rumah sebelum membangunnya.

**Entitas** adalah ruangan: kamar, dapur, garasi. **Atribut** adalah sifat ruangan: luas, jumlah jendela. **Relasi** adalah pintu yang menghubungkan ruangan. **Kardinalitas** adalah keterangan berapa ruangan yang bisa dicapai lewat pintu itu.

Kenapa denah digambar dulu? Karena memindahkan tembok di kertas cukup dengan penghapus, sementara memindahkan tembok yang sudah berdiri butuh palu, tukang, dan uang.

Untuk kardinalitas, pakai cara bertanya dua arah — dan **wajib dua-duanya**, karena inilah yang menentukan bentuk tabelmu:

- *"Satu dosen membimbing berapa mahasiswa?"* → banyak
- *"Satu mahasiswa dibimbing berapa dosen?"* → satu

Satu jawaban "banyak" dan satu "satu" berarti **1:N**. Kalau kedua jawabannya "banyak", itu **M:N** dan kamu langsung tahu harus menyiapkan tabel ketiga. Kalau dua-duanya "satu", itu **1:1** dan patut dicurigai — sering kali dua entitas itu sebenarnya bisa digabung jadi satu tabel saja.`,

  latihan: [
    'Sebuah perusahaan punya beberapa departemen; setiap departemen punya banyak karyawan; setiap karyawan bekerja pada satu departemen. Gambarkan ERD-nya lengkap dengan entitas, atribut, relasi, dan kardinalitas, lalu tuliskan CREATE TABLE-nya.',
    'Tentukan kardinalitas untuk tiap pasangan berikut dengan cara bertanya dua arah: Penulis-Buku, Pasien-RekamMedis, Kelas-Siswa, Pesanan-Produk.',
    'Perpustakaan: satu anggota boleh meminjam banyak buku, satu judul buku boleh dipinjam banyak anggota pada waktu berbeda, dan tiap peminjaman punya tanggal pinjam serta tanggal kembali. Rancang tabelnya dan jelaskan kenapa tanggal pinjam harus berada di tabel penghubung.',
    'Diberikan tabel karyawan(nip, nama, no_telp) yang kolom no_telp-nya berisi "0812xxx, 0813xxx". Jelaskan tiga kerugian nyata dari bentuk ini, lalu perbaiki rancangannya.',
    'Kapan relasi 1:1 sebaiknya tetap dipisah menjadi dua tabel, dan kapan sebaiknya digabung jadi satu tabel? Beri satu contoh untuk masing-masing keadaan.'
  ]
});

TOPICS.push({
  id: 'basdat-normalisasi',
  judul: 'Normalisasi (1NF, 2NF, 3NF)',
  kategori: 'basis-data',
  tag: ['normalisasi', '1NF', '2NF', '3NF', 'anomali', 'ketergantungan fungsional'],
  ringkas: 'Memecah tabel gemuk supaya satu fakta hanya disimpan di satu tempat.',

  fungsi: `**Menyusun tabel supaya satu fakta hanya disimpan di satu tempat.**

Kalau nama dosen tersimpan di lima puluh baris, mengubah namanya berarti mengubah lima puluh baris — dan kalau satu terlewat, basis datamu memuat dua kebenaran yang bertentangan.

Terpakai di:

- **Merancang tabel** yang tidak menyulitkan setahun kemudian
- **Memperbaiki basis data warisan** yang datanya sudah kacau
- **Bab perancangan** laporan tugas akhir — hampir selalu diminta menunjukkan tahapan 1NF sampai 3NF
- **Data Warehouse** di Data Mining — di sana justru sengaja **di-denormalisasi**, dan kamu perlu tahu bedanya untuk mengerti kenapa

Tiga anomali yang dicegahnya, dan semuanya nyata:

- **Anomali pembaruan** — mengubah satu fakta menuntut banyak baris diubah
- **Anomali penyisipan** — tidak bisa mencatat dosen baru sebelum ia punya mahasiswa
- **Anomali penghapusan** — menghapus mahasiswa terakhir ikut menghapus data dosennya`,

  praktik: {
    tujuan: `Kamu bisa mengubah satu tabel berantakan menjadi bentuk 3NF, dan bisa menunjukkan anomali apa yang hilang di tiap tahap.`,
    alat: [
      'DBMS apa pun',
      'Kertas untuk mencatat ketergantungan fungsional'
    ],
    langkah: [
      { judul: 'Mulai dari tabel yang sengaja berantakan',
        isi: `Buat satu tabel yang memuat semuanya sekaligus: NIM, nama mahasiswa, daftar mata kuliah dalam satu kolom, nama dosen, dan ruang.

Isi sepuluh baris. Kamu akan langsung melihat nama dosen yang sama muncul berkali-kali.

Bekerja dari contoh yang buruk membuat perbaikannya masuk akal, bukan sekadar aturan yang dihafal.` },
      { judul: 'Capai 1NF: buang nilai jamak',
        isi: `Kolom yang berisi \`"Basdat, Alpro, Jarkom"\` melanggar 1NF.

Pecah menjadi **satu baris per mata kuliah**. Tabelnya jadi lebih panjang, dan itu memang benar — nilai jamak dalam satu sel membuat pencarian dan penggabungan mustahil dilakukan dengan SQL.

Tandanya kamu melanggar 1NF: kamu berpikir memakai \`LIKE '%Basdat%'\` untuk mencari.` },
      { judul: 'Tulis ketergantungan fungsionalnya',
        isi: `Untuk tiap kolom, tanyakan: **kolom mana yang menentukan nilainya?**

- \`NIM → nama_mahasiswa\`
- \`kode_mk → nama_mk, sks\`
- \`NIM, kode_mk → nilai\`

Daftar ini yang menentukan langkah berikutnya. Menuliskannya sepuluh menit menghemat berjam-jam menebak.` },
      { judul: 'Capai 2NF: buang ketergantungan sebagian',
        isi: `Kalau kunci utamanya gabungan (\`NIM, kode_mk\`), maka kolom yang cuma bergantung pada **sebagian** kunci harus pindah.

\`nama_mahasiswa\` hanya butuh \`NIM\`, bukan keduanya. Jadi ia pindah ke tabel \`mahasiswa\`.

\`nama_mk\` hanya butuh \`kode_mk\`. Pindah ke tabel \`matakuliah\`.

Yang tersisa di tabel penghubung adalah yang benar-benar butuh keduanya: **nilai**.` },
      { judul: 'Capai 3NF: buang ketergantungan transitif',
        isi: `Kalau \`kode_mk → kode_dosen\` dan \`kode_dosen → nama_dosen\`, maka \`nama_dosen\` bergantung pada kunci **secara tidak langsung**.

Pindahkan ke tabel \`dosen\` sendiri.

Uji cepatnya: **setiap kolom bukan-kunci harus bergantung pada kunci, seluruh kunci, dan tidak pada apa pun selain kunci.**` },
      { judul: 'Buktikan anomalinya benar-benar hilang',
        isi: `Sekarang lakukan ketiga hal yang tadinya bermasalah:

- **ubah nama dosen** — sekarang cukup satu baris
- **tambah dosen baru** yang belum mengajar — sekarang bisa
- **hapus satu-satunya mahasiswa** di sebuah kelas — data dosennya tetap ada

Ketiganya adalah bukti langsung bahwa normalisasinya berhasil, dan jauh lebih meyakinkan daripada mengatakan "sudah 3NF".` },
      { judul: 'Ketahui kapan sengaja tidak dinormalisasi',
        isi: `Normalisasi menambah jumlah \`JOIN\`, dan \`JOIN\` punya biaya.

Untuk **laporan dan analisis** yang dibaca jauh lebih sering daripada ditulis, data sering sengaja digabung kembali. Itu disebut **denormalisasi**, dan ia bukan kesalahan — ia pertukaran yang disadari.

Aturannya: **normalisasi dulu sampai 3NF, denormalisasi belakangan kalau memang terbukti lambat.**` }
    ],
    cek: [
      'Tidak ada sel yang berisi lebih dari satu nilai',
      'Mengubah nama seorang dosen hanya menyentuh satu baris',
      'Kamu bisa menambahkan dosen baru yang belum mengajar mata kuliah apa pun'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa dipecah begitu',

  konsep: `
**Normalisasi** adalah proses memecah tabel supaya **satu fakta hanya tersimpan di satu tempat**. Itu kalimat kuncinya. Semua aturan 1NF sampai 3NF sebenarnya cuma cara sistematis mencapai keadaan itu.

**Kenapa perlu?** Karena tabel gemuk melahirkan tiga penyakit yang disebut **anomali**:

Bayangkan tabel \`kuliah(nim, nama, kode_mk, nama_mk, dosen, ruang)\`, dengan satu baris untuk tiap mahasiswa di tiap mata kuliah.

- **Anomali pembaruan** — Pak Budi pindah ruang. Karena namanya tertulis di 200 baris, kamu harus mengubah 200 baris. Kalau 3 terlewat, basis datamu memuat dua ruang berbeda untuk mata kuliah yang sama, dan tidak ada cara tahu mana yang benar.
- **Anomali penyisipan** — mata kuliah baru dibuka tetapi belum ada yang mengambil. Kamu tidak bisa mencatatnya, karena tiap baris butuh \`nim\`. Data mata kuliah jadi sandera data mahasiswa.
- **Anomali penghapusan** — mahasiswa terakhir mengundurkan diri dari sebuah mata kuliah. Begitu barisnya dihapus, keterangan mata kuliah itu **ikut lenyap**, padahal mata kuliahnya masih ada.

**Ketergantungan fungsional — alat untuk melihat masalahnya**

Ditulis **A → B**, dibaca *"B bergantung pada A"*, artinya: kalau kamu tahu nilai A, kamu **pasti** tahu nilai B.

- \`nim → nama\` — tahu NIM, pasti tahu namanya. Benar.
- \`kode_mk → nama_mk\` — tahu kode, pasti tahu nama mata kuliahnya. Benar.
- \`nim → kode_mk\` — tahu NIM, pasti tahu mata kuliahnya? **Salah**, satu mahasiswa ambil banyak mata kuliah.

Seluruh normalisasi adalah soal menata ketergantungan ini supaya rapi.

**Tiga tingkat yang wajib dikuasai**

**1NF — semua nilai atomik.** Tidak ada sel yang memuat banyak nilai, tidak ada kelompok kolom berulang seperti \`mk1\`, \`mk2\`, \`mk3\`. Setiap sel berisi tepat satu nilai, dan setiap baris punya pembeda.

**2NF — sudah 1NF, dan tidak ada ketergantungan parsial.** *Ketergantungan parsial* artinya ada kolom yang hanya bergantung pada **sebagian** primary key gabungan. Aturan ini **hanya relevan kalau primary key-nya gabungan**; kalau kuncinya tunggal, 1NF otomatis sudah 2NF. Pada contoh di atas kuncinya \`(nim, kode_mk)\`, sementara \`nama\` cuma bergantung pada \`nim\` saja — itu parsial, dan harus dipisah.

**3NF — sudah 2NF, dan tidak ada ketergantungan transitif.** *Transitif* artinya kolom bukan-kunci bergantung pada kolom bukan-kunci lain. Kalau \`kode_mk → dosen\` dan \`dosen → ruang\`, maka \`ruang\` bergantung pada kunci lewat perantara. Pisahkan \`dosen\` dan \`ruang\` ke tabel sendiri.

Cara menghafal 3NF yang terkenal: **setiap kolom bukan-kunci harus bergantung pada kunci, seluruh kunci, dan tidak pada apa pun selain kunci.** Bagian "pada kunci" adalah 1NF, "seluruh kunci" adalah 2NF, "tidak pada apa pun selain kunci" adalah 3NF.

**Kapan berhenti?** Untuk hampir semua tugas kuliah dan aplikasi biasa, **3NF sudah cukup**. Ada tingkat lebih tinggi (BCNF, 4NF, 5NF) tetapi jarang diperlukan. Sebaliknya, memecah terlalu jauh membuat setiap kueri butuh banyak JOIN dan justru memperlambat — itulah sebabnya sistem pelaporan kadang sengaja **didenormalisasi** kembali.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- BELUM 1NF: satu sel memuat banyak nilai\n-- nim       | nama   | mata_kuliah\n-- H1D024061 | Hafizh | Basis Data, Algoritma\n\n-- SUDAH 1NF: dipecah jadi satu nilai per sel\n-- nim       | nama   | mata_kuliah\n-- H1D024061 | Hafizh | Basis Data\n-- H1D024061 | Hafizh | Algoritma',
      penjelasan: `
1NF menuntut **satu sel berisi tepat satu nilai**. Bentuk pertama melanggarnya karena \`"Basis Data, Algoritma"\` sebenarnya dua fakta yang dijejalkan jadi satu.

Kenapa ini masalah nyata, bukan sekadar kerapian?

- Mencari siapa saja yang mengambil Basis Data harus memakai pencarian teks \`LIKE '%Basis Data%'\`. Ini tidak bisa memanfaatkan indeks, jadi lambat, dan juga **salah** — mata kuliah bernama "Praktikum Basis Data" akan ikut terjaring.
- Menambah satu mata kuliah berarti membaca isi sel, menyambung teks, lalu menulis ulang. Tiga langkah untuk pekerjaan yang seharusnya satu.
- Menghitung jumlah mata kuliah yang diambil tidak bisa dengan \`COUNT\`; kamu harus menghitung koma.

Bentuk pelanggaran 1NF yang kedua lebih licik: **kolom berulang** seperti \`mk1\`, \`mk2\`, \`mk3\`. Ini kelihatan rapi dan tetap "satu nilai per sel", tetapi tetap salah — jumlah maksimumnya jadi terkunci pada tiga, sebagian besar sel berisi NULL, dan mencari satu mata kuliah berarti memeriksa tiga kolom dengan \`OR\`.

Perhatikan akibat 1NF di bentuk kedua: \`nama\` sekarang **berulang**. Itu memang belum selesai — dan justru itulah yang akan dibereskan 2NF.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Kunci gabungan: (nim, kode_mk)\n-- nama    bergantung hanya pada nim      -> PARSIAL\n-- nama_mk bergantung hanya pada kode_mk  -> PARSIAL\n-- nilai   bergantung pada KEDUANYA       -> penuh, benar\n\n-- 2NF: pisahkan yang parsial ke tabel sendiri\nCREATE TABLE mahasiswa   (nim CHAR(10) PRIMARY KEY, nama VARCHAR(50));\nCREATE TABLE mata_kuliah (kode_mk CHAR(6) PRIMARY KEY, nama_mk VARCHAR(50));\nCREATE TABLE krs (\n  nim CHAR(10), kode_mk CHAR(6), nilai CHAR(1),\n  PRIMARY KEY (nim, kode_mk)\n);',
      penjelasan: `
Cara memeriksa 2NF sebenarnya cuma satu pertanyaan, diajukan ke **setiap** kolom bukan-kunci:

*"Apakah kolom ini butuh **seluruh** primary key untuk ditentukan, atau cukup sebagiannya saja?"*

- \`nama\` — untuk tahu namanya, cukup tahu \`nim\`. \`kode_mk\` tidak berpengaruh sama sekali. **Cukup sebagian → parsial → langgar 2NF.**
- \`nama_mk\` — cukup tahu \`kode_mk\`. **Parsial juga.**
- \`nilai\` — tahu \`nim\` saja tidak cukup, tahu \`kode_mk\` saja juga tidak cukup. Butuh keduanya. **Ini benar, biarkan.**

Perhatikan bahwa \`nilai\` inilah satu-satunya kolom yang memang milik **pasangan**, dan karena itu ia satu-satunya yang berhak tinggal di tabel \`krs\`.

Hasil pemecahan ini persis sama dengan hasil rancangan ERD yang benar untuk relasi M:N. Bukan kebetulan: **ERD yang dirancang baik biasanya sudah menghasilkan tabel ber-3NF.** Normalisasi lebih sering dipakai untuk **memperbaiki** rancangan yang terlanjur salah, atau untuk membuktikan di ujian bahwa rancanganmu sudah benar.

Satu catatan penting: kalau primary key-nya **tunggal**, ketergantungan parsial mustahil terjadi — tidak ada "sebagian kunci" untuk dijadikan penggantung. Jadi tabel ber-1NF dengan kunci tunggal otomatis sudah 2NF.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Tabel mata_kuliah setelah 2NF:\n-- kode_mk | nama_mk    | dosen    | ruang\n-- MK001   | Basis Data | Pak Budi | R.101\n--\n-- kode_mk -> dosen  -> ruang     TRANSITIF, langgar 3NF\n\n-- 3NF: ruang menempel pada dosen, bukan pada mata kuliah\nCREATE TABLE dosen (\n  kode_dosen CHAR(5) PRIMARY KEY,\n  nama_dosen VARCHAR(50),\n  ruang      VARCHAR(10)\n);\nCREATE TABLE mata_kuliah (\n  kode_mk    CHAR(6) PRIMARY KEY,\n  nama_mk    VARCHAR(50),\n  kode_dosen CHAR(5),\n  FOREIGN KEY (kode_dosen) REFERENCES dosen(kode_dosen)\n);',
      penjelasan: `
Ketergantungan **transitif** artinya: kunci menentukan A, lalu A menentukan B. Jadi B bergantung pada kunci **lewat perantara**, bukan langsung.

Di sini \`kode_mk\` menentukan \`dosen\`, dan \`dosen\` menentukan \`ruang\`. Maka \`ruang\` bergantung pada \`kode_mk\` secara tidak langsung.

Kenapa ini merugikan? Karena ruang itu sebenarnya milik **dosen**, bukan milik mata kuliah. Kalau Pak Budi mengajar lima mata kuliah, ruangnya tertulis lima kali. Saat beliau pindah ruang, lima baris harus diubah bersamaan — dan itu persis anomali pembaruan yang ingin kita hindari sejak awal.

Cara memeriksanya juga satu pertanyaan sederhana, diajukan ke setiap kolom bukan-kunci:

*"Kalau aku tahu kolom bukan-kunci yang lain, apakah aku jadi tahu kolom ini?"*

Kalau jawabannya ya, ada ketergantungan transitif dan kolom itu salah tempat.

**Peringatan soal arah ketergantungan.** Kalau ternyata satu mata kuliah selalu diajar di ruang tetap tanpa peduli siapa dosennya, maka \`kode_mk → ruang\` bersifat langsung dan \`ruang\` memang berhak tinggal di tabel \`mata_kuliah\`. Jadi jawabannya **bergantung pada aturan dunia nyata**, bukan pada bentuk tabelnya. Normalisasi tidak bisa dikerjakan hanya dengan melihat data contoh — kamu harus tahu aturannya lebih dulu.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Normalisasi bertahap: dari satu tabel gemuk ke 3NF
-- ============================================

-- ---------- BENTUK AWAL (belum normal) ----------
-- nim       | nama   | mata_kuliah          | dosen    | ruang
-- H1D024061 | Hafizh | Basis Data,Algoritma | Pak Budi | R.101
--
-- Masalah: sel "mata_kuliah" memuat dua nilai.

-- ---------- 1NF: pecah nilai jamak ----------
-- nim       | nama   | kode_mk | nama_mk    | dosen    | ruang
-- H1D024061 | Hafizh | MK001   | Basis Data | Pak Budi | R.101
-- H1D024061 | Hafizh | MK002   | Algoritma  | Pak Andi | R.102
--
-- Sudah atomik, tapi "Hafizh" kini berulang.
-- Kunci: (nim, kode_mk)

-- ---------- 2NF: buang ketergantungan parsial ----------
CREATE TABLE mahasiswa (
  nim  CHAR(10)    NOT NULL,
  nama VARCHAR(50) NOT NULL,
  PRIMARY KEY (nim)
);

CREATE TABLE krs (
  nim     CHAR(10) NOT NULL,
  kode_mk CHAR(6)  NOT NULL,
  nilai   CHAR(1)  NULL,          -- hanya ini yang butuh kedua kunci
  PRIMARY KEY (nim, kode_mk)
);

-- ---------- 3NF: buang ketergantungan transitif ----------
-- ruang menempel pada dosen, bukan pada mata kuliah
CREATE TABLE dosen (
  kode_dosen CHAR(5)     NOT NULL,
  nama_dosen VARCHAR(50) NOT NULL,
  ruang      VARCHAR(10) NULL,
  PRIMARY KEY (kode_dosen)
);

CREATE TABLE mata_kuliah (
  kode_mk    CHAR(6)     NOT NULL,
  nama_mk    VARCHAR(50) NOT NULL,
  kode_dosen CHAR(5)     NULL,
  PRIMARY KEY (kode_mk),
  FOREIGN KEY (kode_dosen) REFERENCES dosen(kode_dosen)
);

-- ---------- Pak Budi pindah ruang: cukup SATU baris ----------
UPDATE dosen SET ruang = 'R.205' WHERE kode_dosen = 'D001';

-- ---------- Menyatukan kembali saat dibutuhkan ----------
SELECT m.nama, mk.nama_mk, d.nama_dosen, d.ruang, k.nilai
FROM krs k
JOIN mahasiswa   m  ON k.nim     = m.nim
JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk
JOIN dosen       d  ON mk.kode_dosen = d.kode_dosen;`
  },

  output: `MariaDB [akademik]> UPDATE dosen SET ruang = 'R.205' WHERE kode_dosen = 'D001';
Query OK, 1 row affected (0.005 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [akademik]> SELECT m.nama, mk.nama_mk, d.nama_dosen, d.ruang, k.nilai
    -> FROM krs k
    -> JOIN mahasiswa m ON k.nim = m.nim
    -> JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk
    -> JOIN dosen d ON mk.kode_dosen = d.kode_dosen;
+--------+------------+------------+-------+-------+
| nama   | nama_mk    | nama_dosen | ruang | nilai |
+--------+------------+------------+-------+-------+
| Hafizh | Basis Data | Pak Budi   | R.205 | A     |
| Hafizh | Algoritma  | Pak Andi   | R.102 | B     |
+--------+------------+------------+-------+-------+
2 rows in set (0.001 sec)`,

  kesalahanUmum: [
    {
      salah: 'Mengecek 2NF pada tabel yang primary key-nya tunggal, lalu bingung mencari ketergantungan parsial.',
      kenapa: 'Ketergantungan parsial hanya mungkin terjadi kalau kuncinya gabungan, karena harus ada "sebagian kunci" untuk digantungi. Mahasiswa sering membuang waktu mencari sesuatu yang secara definisi tidak ada, lalu ragu apakah jawabannya salah.',
      benar: 'Kalau primary key tunggal, tabel yang sudah 1NF otomatis 2NF. Langsung lanjut memeriksa 3NF.'
    },
    {
      salah: 'Menormalisasi berdasarkan data contoh yang kebetulan terlihat, bukan berdasarkan aturan dunia nyata.',
      kenapa: 'Pada sepuluh baris contoh, satu dosen mungkin kebetulan selalu memakai satu ruang, sehingga terlihat ada ketergantungan dosen ke ruang. Padahal aturan sebenarnya bisa saja ruang ditentukan mata kuliah. Rancangan yang dibangun dari kebetulan akan runtuh begitu data sungguhan masuk.',
      benar: 'Tanyakan dulu aturannya: "apakah ruang mengikuti dosen, atau mengikuti mata kuliah?" Baru tentukan ketergantungan fungsionalnya.'
    },
    {
      salah: 'Memecah tabel sampai sejauh mungkin karena mengira makin banyak tabel makin baik.',
      kenapa: 'Setiap pemecahan menambah satu JOIN pada kueri yang membutuhkan data itu. Kueri dengan tujuh JOIN sulit dibaca, sulit dioptimalkan, dan sering lebih lambat daripada tabel yang sedikit gemuk. Normalisasi adalah alat untuk mencegah anomali, bukan lomba memperbanyak tabel.',
      benar: 'Berhenti di 3NF untuk aplikasi biasa. Pecah lebih jauh hanya kalau ada anomali nyata yang benar-benar mengganggu.'
    },
    {
      salah: 'Menganggap kolom yang isinya berulang pasti melanggar normalisasi.',
      kenapa: 'Nilai foreign key memang seharusnya berulang. Kolom kode_dosen di tabel mata_kuliah akan memuat D001 berkali-kali kalau Pak Budi mengajar lima mata kuliah, dan itu benar. Yang dilarang adalah mengulang fakta yang sama, bukan mengulang rujukan.',
      benar: 'Bedakan mengulang rujukan dengan mengulang fakta. Menyimpan kode_dosen berkali-kali itu wajar; menyimpan nama_dosen dan ruang berkali-kali itu masalah.'
    },
    {
      salah: 'Menyebut tabel sudah 3NF tanpa memeriksa 1NF dan 2NF lebih dulu.',
      kenapa: 'Ketiga bentuk normal bertingkat: 3NF mensyaratkan 2NF, dan 2NF mensyaratkan 1NF. Tabel dengan sel berisi nilai jamak tidak mungkin 3NF, sekalipun tidak punya ketergantungan transitif. Jawaban ujian yang langsung melompat ke 3NF biasanya kehilangan nilai di langkah awal.',
      benar: 'Kerjakan berurutan dan tunjukkan tabelnya di tiap tahap: 1NF dulu, lalu 2NF, baru 3NF.'
    }
  ],

  analogi: `Bayangkan buku alamat yang ditulis tangan.

Awalnya kamu menulis satu baris per kiriman paket: nama penerima, alamat lengkap, isi paket, tanggal. Praktis, sampai orang yang sama kirim paket lima puluh kali — alamatnya tertulis lima puluh kali.

Lalu dia pindah rumah. Sekarang kamu harus mencari lima puluh baris dan memperbaikinya satu per satu. Yang terlewat akan mengirim paket ke alamat lama selamanya. **Itu anomali pembaruan.**

Kamu kenal orang baru, tapi belum pernah kirim paket ke dia. Tidak ada tempat menulis alamatnya, karena tiap baris wajib berisi paket. **Itu anomali penyisipan.**

Kamu hapus catatan paket terakhir seseorang, dan alamatnya ikut hilang padahal orangnya masih ada. **Itu anomali penghapusan.**

Jalan keluarnya persis normalisasi: **buat dua buku**. Satu buku alamat, satu buku pengiriman yang cuma menulis nomor orangnya. Pindah rumah cukup diperbaiki di satu tempat, orang baru bisa dicatat tanpa paket, dan menghapus catatan paket tidak menghapus orangnya.

Tapi jangan kebablasan. Kalau kamu bikin buku terpisah untuk nama jalan, buku lain untuk kota, dan buku lain lagi untuk kode pos, mencari satu alamat lengkap butuh membuka empat buku sekaligus. **Itu sebabnya berhenti di 3NF.**`,

  latihan: [
    'Tabel berikut belum normal: barang(kode_barang, nama_barang, kategori, nama_suplier, alamat_suplier). Tuliskan ketergantungan fungsionalnya, lalu normalisasikan sampai 3NF dengan menunjukkan tabel di setiap tahap.',
    'Jelaskan kenapa tabel dengan primary key tunggal yang sudah 1NF otomatis memenuhi 2NF. Gunakan definisi ketergantungan parsial dalam jawabanmu.',
    'Diberikan pesanan(no_pesanan, kode_produk, jumlah, harga_satuan, nama_produk, total). Tentukan kolom mana yang melanggar 2NF, mana yang melanggar 3NF, dan mana yang sebenarnya tidak boleh disimpan sama sekali.',
    'Buat satu contoh nyata di mana denormalisasi justru menguntungkan, lalu jelaskan risiko yang kamu terima sebagai gantinya.',
    'Tabel karyawan(nip, nama, kode_dept, nama_dept, kota_dept) berada di 2NF. Buktikan ia melanggar 3NF dengan menunjukkan rantai ketergantungannya, lalu perbaiki.'
  ]
});

TOPICS.push({
  id: 'basdat-ddl',
  judul: 'DDL — CREATE TABLE & Tipe Data',
  kategori: 'basis-data',
  tag: ['DDL', 'CREATE TABLE', 'tipe data', 'CHAR', 'VARCHAR', 'constraint'],
  ringkas: 'Membangun kerangka tabel, dan memilih tipe data yang tidak menyusahkan di kemudian hari.',

  fungsi: `**Membuat struktur tabel dengan tipe dan batasan yang menjaga datanya tetap benar.**

Batasan yang dinyatakan di sini bekerja **di tingkat basis data**, sehingga tetap berlaku meski data dimasukkan lewat skrip impor, lewat phpMyAdmin, atau lewat aplikasi lain yang lupa memvalidasi.

Terpakai di:

- **Setiap proyek** yang menyimpan data
- **Migrasi** di kerangka kerja web — Laravel dan CodeIgniter menuliskan DDL untukmu, tetapi kamu tetap harus tahu apa yang dihasilkannya
- **Menjaga mutu data** — \`NOT NULL\`, \`UNIQUE\`, dan \`CHECK\` menolak data buruk sebelum masuk
- **Kinerja** — tipe yang tepat menghemat ruang dan mempercepat pencarian

Kaidah yang layak dipegang: **aturan yang bisa dijaga basis data, jaga di basis data.** Validasi di aplikasi bisa dilewati; batasan di basis data tidak.`,

  praktik: {
    tujuan: `Kamu bisa membuat tabel dengan tipe dan batasan yang tepat, dan sudah membuktikan basis datamu menolak data yang melanggar.`,
    alat: [
      'MySQL, PostgreSQL, atau SQLite',
      'Klien basis data'
    ],
    langkah: [
      { judul: 'Pilih tipe menurut sifat datanya',
        isi: `Pakai kembali tabel keputusan dari topik Variabel:

- teks pendek berbatas → \`VARCHAR(n)\`, dengan n yang masuk akal
- teks panjang → \`TEXT\`
- bilangan bulat → \`INT\` atau \`BIGINT\`
- **uang** → \`DECIMAL(12,2)\`, **jangan pernah** \`FLOAT\`
- tanggal → \`DATE\`; tanggal dan jam → \`DATETIME\` atau \`TIMESTAMP\`
- pilihan terbatas → \`ENUM\` di MySQL, atau \`CHECK\` di yang lain` },
      { judul: 'Tentukan panjang VARCHAR dengan alasan',
        isi: `\`VARCHAR(255)\` untuk semuanya adalah kebiasaan malas.

Pikirkan: nama orang jarang lebih dari 100 karakter, NIM tepat 9, kode pos 5, nomor telepon 15.

Panjang yang masuk akal berfungsi sebagai **batasan tambahan** — ia menolak data yang jelas keliru sebelum sempat masuk.` },
      { judul: 'Nyatakan batasannya, jangan diandalkan pada aplikasi',
        isi: `- \`PRIMARY KEY\` — pengenal baris
- \`NOT NULL\` — wajib diisi
- \`UNIQUE\` — tidak boleh kembar, misalnya surel
- \`DEFAULT\` — nilai bawaan, misalnya \`DEFAULT CURRENT_TIMESTAMP\`
- \`CHECK\` — aturan nilai, misalnya \`CHECK (nilai BETWEEN 0 AND 100)\`
- \`FOREIGN KEY\` — menjaga hubungan antar tabel` },
      { judul: 'Uji setiap batasan dengan sengaja melanggarnya',
        isi: `Ini langkah yang paling sering dilewatkan, dan paling berguna.

Coba masukkan: baris tanpa kolom wajib, surel yang sudah ada, nilai 150 pada kolom yang dibatasi 0 sampai 100.

Ketiganya harus **ditolak**. Kalau ada yang lolos, batasanmu tidak terpasang seperti yang kamu kira.` },
      { judul: 'Perhatikan perbedaan antar DBMS',
        isi: `- \`AUTO_INCREMENT\` di MySQL, \`SERIAL\` di PostgreSQL, \`AUTOINCREMENT\` di SQLite
- \`ENUM\` ada di MySQL, tetapi tidak di SQLite
- \`CHECK\` lama diabaikan MySQL sebelum versi 8.0.16 — periksa versimu

Kalau proyekmu harus jalan di lebih dari satu DBMS, pakai yang paling umum saja.` },
      { judul: 'Simpan skemanya sebagai berkas',
        isi: `Jangan hanya mengetik perintahnya di klien lalu lupa. Simpan seluruh \`CREATE TABLE\` ke berkas \`skema.sql\` dan masukkan ke Git.

Dengan begitu siapa pun bisa membangun ulang basis datanya dari nol, dan perubahan strukturnya punya riwayat.

Ini kebiasaan yang membedakan proyek yang bisa diserahkan dari yang tidak.` }
    ],
    cek: [
      `Setiap batasan yang kamu tulis sudah kamu uji dengan sengaja melanggarnya, dan semuanya ditolak`,
      'Tidak ada kolom uang yang bertipe FLOAT',
      'Berkas skema.sql-mu bisa membangun ulang seluruh basis data dari nol'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
SQL dibagi menjadi beberapa sub-bahasa menurut tugasnya. Pembagian ini sering ditanyakan di ujian:

- **DDL** (*Data Definition Language*) — mengurus **struktur**: \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`.
- **DML** (*Data Manipulation Language*) — mengurus **isi**: \`INSERT\`, \`UPDATE\`, \`DELETE\`.
- **DQL** (*Data Query Language*) — membaca: \`SELECT\`. Sering dianggap bagian DML.
- **DCL** (*Data Control Language*) — mengurus **hak akses**: \`GRANT\`, \`REVOKE\`.
- **TCL** (*Transaction Control Language*) — \`COMMIT\`, \`ROLLBACK\`.

Topik ini membahas DDL, khususnya \`CREATE TABLE\`.

**Memilih tipe data**

Tipe data bukan sekadar formalitas. Ia menentukan berapa ruang yang dipakai, seberapa cepat pencarian, dan yang terpenting: **nilai apa yang mustahil masuk**. Kolom bertipe \`DATE\` tidak akan pernah menerima "kemarin sore".

**Tipe angka**

- **\`INT\`** — bilangan bulat, 4 byte, jangkauan sekitar minus 2,1 miliar sampai 2,1 miliar.
- **\`TINYINT\`**, **\`SMALLINT\`**, **\`BIGINT\`** — versi lebih kecil dan lebih besar.
- **\`DECIMAL(m, d)\`** — angka pecahan **pasti**, dengan \`m\` digit total dan \`d\` digit di belakang koma. \`DECIMAL(10,2)\` cocok untuk uang.
- **\`FLOAT\`**, **\`DOUBLE\`** — pecahan **hampiran**. Cepat, tapi \`0.1 + 0.2\` tidak persis \`0.3\`. **Jangan dipakai untuk uang.**

**Tipe teks**

- **\`CHAR(n)\`** — panjang **tetap** \`n\` karakter. Kalau diisi lebih pendek, sisanya diganjal spasi. Cocok untuk yang panjangnya memang selalu sama: kode pos, NIM, kode negara.
- **\`VARCHAR(n)\`** — panjang **berubah-ubah**, maksimum \`n\`. Hanya memakai ruang sebanyak isinya, ditambah 1-2 byte penanda panjang. Cocok untuk nama, alamat.
- **\`TEXT\`** — teks panjang, sampai 65 ribu karakter. Untuk artikel atau komentar.

Aturan praktisnya: **panjangnya selalu sama → \`CHAR\`; panjangnya berbeda-beda → \`VARCHAR\`.**

**Tipe tanggal**

- **\`DATE\`** — tanggal saja, formatnya **\`'YYYY-MM-DD'\`**. Perhatikan urutannya: tahun dulu. Menulis \`'01-09-2024'\` akan ditolak atau disalahartikan.
- **\`DATETIME\`** — tanggal dan jam.
- **\`TIMESTAMP\`** — mirip DATETIME tetapi ikut memperhitungkan zona waktu, dan bisa diisi otomatis.

**Constraint — aturan yang dijaga DBMS**

- **\`NOT NULL\`** — wajib diisi.
- **\`PRIMARY KEY\`** — identitas baris; otomatis unik dan \`NOT NULL\`.
- **\`UNIQUE\`** — tidak boleh kembar, tetapi **boleh NULL**. Ini beda pentingnya dengan primary key.
- **\`DEFAULT nilai\`** — dipakai kalau kolomnya tidak disebut saat \`INSERT\`.
- **\`AUTO_INCREMENT\`** — nomor urut otomatis, biasanya menempel pada primary key.
- **\`FOREIGN KEY\`** — menunjuk primary key tabel lain.
- **\`CHECK\`** — syarat bebas, misalnya \`CHECK (sks > 0)\`. MySQL baru benar-benar menegakkannya sejak versi 8.0; MariaDB sejak 10.2. Versi lama menerima sintaksnya lalu mengabaikannya.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'CREATE TABLE customers (\n  cust_id        CHAR(13)    NOT NULL PRIMARY KEY,\n  cust_name      VARCHAR(30) NOT NULL,\n  cust_address   VARCHAR(25) NULL,\n  cust_telephone CHAR(12)    NOT NULL,\n  cust_work      VARCHAR(15) NULL\n);',
      penjelasan: `
Ini bentuk yang dipakai di praktikum. Perhatikan pola tiap barisnya: **nama kolom, tipe data, lalu aturan**. Urutan ketiganya tidak boleh tertukar.

Kenapa \`cust_id\` memakai **\`CHAR(13)\`** dan bukan \`INT\`? Karena kode pelanggan bukan bilangan yang dihitung. Tiga alasan praktis:

- Kode seperti \`0001234567890\` akan kehilangan nol di depan kalau disimpan sebagai angka.
- Kamu tidak akan pernah menjumlahkan atau merata-ratakan kode pelanggan, jadi kemampuan berhitung tipe angka mubazir.
- Kode sering memuat huruf di kemudian hari, misalnya \`CUST-001\`. Kolom \`INT\` akan langsung menolaknya.

Kenapa \`cust_telephone\` juga \`CHAR\` dan bukan angka? Alasan yang sama, ditambah satu: nomor telepon Indonesia diawali \`0\`. Disimpan sebagai \`INT\`, \`081234567890\` berubah menjadi \`81234567890\`. Ini kesalahan klasik yang baru ketahuan setelah data terlanjur banyak.

Perhatikan juga **\`NULL\` ditulis eksplisit** pada \`cust_address\`. Sebenarnya kolom memang boleh NULL secara bawaan, jadi menuliskannya tidak mengubah apa pun. Tapi menuliskannya membuat niatmu jelas terbaca: *"alamat memang sengaja boleh kosong"*, bukan sekadar lupa memikirkannya.

Terakhir, jangan pernah ada **koma sesudah kolom terakhir**. Ini penyebab error sintaks yang paling sering pada \`CREATE TABLE\`, dan pesannya menunjuk ke tanda kurung penutup sehingga terasa membingungkan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- CHAR(5) menyimpan "AB" sebagai "AB   " -> 5 byte selalu\n-- VARCHAR(5) menyimpan "AB" sebagai "AB"    -> 3 byte\n\nCREATE TABLE contoh (\n  kode_pos  CHAR(5),      -- selalu 5 digit\n  nama_kota VARCHAR(50)   -- "Solo" sampai "Kota Administrasi Jakarta Selatan"\n);',
      penjelasan: `
Perbedaan \`CHAR\` dan \`VARCHAR\` sering dianggap sepele, padahal punya akibat nyata.

**\`CHAR(n)\`** selalu memakai tepat \`n\` byte, apa pun isinya. Kalau isinya lebih pendek, MySQL **mengganjalnya dengan spasi** sampai penuh. Keuntungannya: karena tiap baris berukuran sama persis, mesin bisa melompat ke baris ke-1000 dengan perkalian sederhana, tanpa membaca baris sebelumnya. Untuk kolom yang panjangnya memang tetap, ini sedikit lebih cepat.

**\`VARCHAR(n)\`** hanya memakai ruang sebanyak isinya ditambah 1 byte penanda panjang (2 byte kalau \`n\` lebih dari 255). Untuk \`nama_kota\`, ini jelas menang: menyimpan "Solo" di \`CHAR(50)\` memboroskan 46 byte per baris, dan pada satu juta baris itu 46 MB terbuang percuma.

Jebakan yang perlu diketahui: pada \`CHAR\`, **spasi ganjalan di akhir dibuang saat dibaca**. Jadi kalau kamu sengaja menyimpan \`'AB  '\` dengan dua spasi di \`CHAR(5)\`, yang keluar tetap \`'AB'\`. Kalau spasi di akhir itu bermakna bagi datamu, pakai \`VARCHAR\`.

Angka di dalam kurung, \`n\`, adalah **batas jumlah karakter**, bukan alokasi awal. \`VARCHAR(255)\` tidak lebih boros daripada \`VARCHAR(20)\` untuk isi yang sama. Jadi jangan pelit — tetapkan batas yang masuk akal, tetapi jangan terlalu mepet sampai data sungguhan terpotong.
`
    },
    {
      bahasa: 'sql',
      kode: 'CREATE TABLE mahasiswa (\n  id       INT AUTO_INCREMENT PRIMARY KEY,\n  nim      CHAR(10)    NOT NULL UNIQUE,\n  nama     VARCHAR(50) NOT NULL,\n  email    VARCHAR(50) NULL UNIQUE,\n  status   VARCHAR(10) NOT NULL DEFAULT \'aktif\',\n  sks      INT         NOT NULL DEFAULT 0,\n  dibuat   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP\n);',
      penjelasan: `
Tabel ini memperlihatkan constraint yang lebih lengkap, dan tiap barisnya menyatakan aturan yang berbeda.

**\`AUTO_INCREMENT\`** membuat MySQL mengisi sendiri nomor urut. Kamu tidak perlu menyebut kolom \`id\` saat \`INSERT\`. Perhatikan bahwa nomor yang sudah terpakai **tidak didaur ulang** — kalau baris nomor 5 dihapus, baris berikutnya tetap 6, dan lubang nomor 5 dibiarkan. Itu memang disengaja, karena nomor lama mungkin masih dirujuk tabel lain.

**Perbedaan \`PRIMARY KEY\` dan \`UNIQUE\`** terlihat jelas di sini, dan ini sering keluar di ujian:

- Satu tabel hanya boleh punya **satu** primary key, tetapi boleh punya **banyak** kolom \`UNIQUE\`.
- Primary key **tidak boleh NULL**; kolom \`UNIQUE\` **boleh NULL**, bahkan boleh beberapa baris sama-sama NULL.

Itu sebabnya \`email\` di sini \`UNIQUE\` tetapi bukan primary key: tidak semua mahasiswa punya email, tapi yang punya tidak boleh kembar.

Muncul juga pertanyaan lama: kalau \`nim\` sudah unik dan tidak berubah, kenapa masih ada kolom \`id\`? Ini pilihan rancangan. Memakai \`id\` buatan disebut *surrogate key*, dan enaknya kalau format NIM berubah suatu hari, tabel lain yang merujuknya tidak ikut terganggu. Memakai \`nim\` langsung disebut *natural key*, dan enaknya kueri jadi lebih sedikit JOIN. Keduanya sah.

**\`DEFAULT 'aktif'\`** dipakai kalau kolomnya tidak disebut saat \`INSERT\`. Perhatikan nilai teks dibungkus **kutip tunggal**. Sedangkan \`DEFAULT CURRENT_TIMESTAMP\` mengisi waktu saat baris dibuat — berguna untuk jejak audit tanpa kerja tambahan.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- DDL: membangun kerangka basis data penjualan
-- ============================================

CREATE DATABASE IF NOT EXISTS penjualan_barang;
USE penjualan_barang;

-- ---------- Tabel induk dibuat lebih dulu ----------
CREATE TABLE customers (
  cust_id        CHAR(13)    NOT NULL,
  cust_name      VARCHAR(30) NOT NULL,
  cust_address   VARCHAR(25) NULL,
  cust_telephone CHAR(12)    NOT NULL,
  cust_work      VARCHAR(15) NULL,
  PRIMARY KEY (cust_id)
);

CREATE TABLE stuff (
  stuff_id    CHAR(20)      NOT NULL,
  stuff_name  VARCHAR(20)   NOT NULL,
  stuff_cost  DECIMAL(10,2) NOT NULL,   -- uang: DECIMAL, bukan FLOAT
  stuff_stock INT           NOT NULL DEFAULT 0,
  PRIMARY KEY (stuff_id)
);

-- ---------- Tabel anak menyusul ----------
CREATE TABLE orders (
  order_num  INT      NOT NULL AUTO_INCREMENT,
  order_date DATE     NOT NULL,
  cust_id    CHAR(13) NOT NULL,
  PRIMARY KEY (order_num),
  FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);

-- ---------- Memeriksa hasilnya ----------
SHOW TABLES;
DESC customers;
SHOW CREATE TABLE orders;

-- ---------- Format tanggal WAJIB YYYY-MM-DD ----------
INSERT INTO customers VALUES
  ('0001234567890', 'Hafizh', 'Purwokerto', '081234567890', 'Mahasiswa');

INSERT INTO orders (order_date, cust_id)      -- order_num diisi otomatis
  VALUES ('2024-09-01', '0001234567890');

-- Salah format: MySQL menolak atau menyimpan 0000-00-00
-- INSERT INTO orders (order_date, cust_id)
--   VALUES ('01-09-2024', '0001234567890');`
  },

  output: `MariaDB [penjualan_barang]> DESC customers;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| cust_id        | char(13)    | NO   | PRI | NULL    |       |
| cust_name      | varchar(30) | NO   |     | NULL    |       |
| cust_address   | varchar(25) | YES  |     | NULL    |       |
| cust_telephone | char(12)    | NO   |     | NULL    |       |
| cust_work      | varchar(15) | YES  |     | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
5 rows in set (0.003 sec)

MariaDB [penjualan_barang]> INSERT INTO orders (order_date, cust_id)
    -> VALUES ('2024-09-01', '0001234567890');
Query OK, 1 row affected (0.004 sec)

MariaDB [penjualan_barang]> SELECT * FROM orders;
+-----------+------------+---------------+
| order_num | order_date | cust_id       |
+-----------+------------+---------------+
|         1 | 2024-09-01 | 0001234567890 |
+-----------+------------+---------------+
1 row in set (0.000 sec)`,

  kesalahanUmum: [
    {
      salah: 'Menaruh koma sesudah definisi kolom terakhir sebelum tanda kurung penutup.',
      kenapa: 'MySQL mengira masih ada kolom berikutnya, lalu menemukan tanda kurung tutup dan melapor "You have an error in your SQL syntax ... near \')\'". Pesannya menunjuk ke kurung penutup, padahal penyebabnya koma di baris sebelumnya, sehingga mata sering mencari di tempat yang salah.',
      benar: 'Koma memisahkan antarkolom, bukan mengakhiri tiap kolom. Baris terakhir tidak berkoma.'
    },
    {
      salah: 'Menyimpan nomor telepon atau NIM sebagai INT.',
      kenapa: 'Nol di depan hilang, karena bagi tipe angka 081234567890 sama dengan 81234567890. Selain itu nomor telepon panjang bisa melampaui jangkauan INT dan diam-diam terpotong. Kerusakan ini baru ketahuan setelah ratusan baris masuk, dan data aslinya sudah tidak bisa dipulihkan.',
      benar: 'Pakai CHAR atau VARCHAR untuk apa pun yang tidak pernah dihitung secara matematis, meski isinya angka semua.'
    },
    {
      salah: 'Memakai FLOAT atau DOUBLE untuk menyimpan harga dan uang.',
      kenapa: 'FLOAT menyimpan hampiran biner, sehingga 0.1 + 0.2 tidak persis sama dengan 0.3. Pada laporan keuangan, selisih receh ini menumpuk dan membuat total tidak pernah cocok. Yang lebih menjengkelkan, perbandingan seperti WHERE harga = 19.99 bisa gagal menemukan baris yang terlihat jelas ada.',
      benar: 'Pakai DECIMAL(10,2) untuk uang. Ia menyimpan angka desimal secara pasti, bukan hampiran.'
    },
    {
      salah: 'Menulis tanggal dengan format lokal seperti 01-09-2024 atau 1/9/2024.',
      kenapa: 'MySQL hanya mengenali YYYY-MM-DD. Format lain akan ditolak, atau lebih buruk lagi disimpan sebagai 0000-00-00 disertai warning yang mudah terlewat. Baris yang tampak berhasil masuk ternyata tanggalnya kosong, dan baru ketahuan saat dipakai mengurutkan.',
      benar: "Selalu tulis '2024-09-01'. Kalau ragu, jalankan SELECT setelah INSERT untuk memastikan tanggalnya benar-benar tersimpan."
    },
    {
      salah: 'Membuat tabel anak lebih dulu, lalu bingung kenapa FOREIGN KEY gagal.',
      kenapa: 'Foreign key menunjuk ke tabel yang harus sudah ada. Kalau tabel tujuannya belum dibuat, MySQL menolak dengan errno 150 yang tidak menyebutkan tabel mana yang hilang. Pada skrip berisi belasan tabel, penyebabnya sulit ditemukan.',
      benar: 'Buat tabel induk lebih dulu, tabel anak menyusul. Saat menghapus, urutannya justru dibalik: anak dulu, induk belakangan.'
    }
  ],

  analogi: `Bayangkan kamu membuat formulir pendaftaran di atas kertas.

**\`CREATE TABLE\`** adalah mencetak formulirnya, bukan mengisinya. Setelah dicetak, kertasnya masih kosong — itulah kenapa \`SELECT\` setelah \`CREATE TABLE\` menghasilkan *Empty set*.

**Tipe data** adalah bentuk kotak isiannya. Kotak tanggal yang sudah dicetak "__ __ / __ __ / __ __ __ __" memaksa orang menulis tanggal dengan benar. Kotak untuk nomor telepon dibuat 12 petak karena memang selalu segitu — itu \`CHAR\`. Kotak untuk alamat dibuat satu garis panjang karena panjangnya berbeda-beda tiap orang — itu \`VARCHAR\`.

**Constraint** adalah tulisan kecil di formulir. **\`NOT NULL\`** adalah tanda bintang merah "wajib diisi". **\`UNIQUE\`** adalah petugas yang mengecek apakah email itu sudah pernah dipakai orang lain. **\`DEFAULT\`** adalah kotak yang sudah tercetak "aktif", tinggal dibiarkan kalau memang begitu. Dan **\`AUTO_INCREMENT\`** adalah nomor antrean yang dicetak mesin, bukan ditulis pendaftar.

Kenapa memilih tipe data itu penting? Karena mengganti bentuk kotak setelah seribu formulir terisi berarti menyalin ulang seribu formulir. Di basis data, itulah \`ALTER TABLE\` pada tabel besar — bisa mengunci tabel berjam-jam.`,

  latihan: [
    'Buat tabel Dosen dengan kolom NIP sebagai primary key, Nama, dan Alamat. Tentukan tipe data tiap kolom beserta alasannya, lalu jalankan DESC untuk memeriksa hasilnya.',
    'Tulis CREATE TABLE untuk tabel Karyawan dengan ID_Karyawan sebagai primary key, Nama maksimal 50 karakter, Alamat maksimal 100 karakter, dan ID_Departemen sebagai foreign key ke tabel Departemen.',
    'Jelaskan kenapa kode pos sebaiknya CHAR(5) sementara nama kota sebaiknya VARCHAR(50). Hitung berapa byte terbuang per baris kalau nama kota disimpan sebagai CHAR(50) dan isinya rata-rata 8 karakter.',
    'Sebutkan tiga perbedaan antara PRIMARY KEY dan UNIQUE, lalu beri satu contoh kolom yang lebih pantas UNIQUE daripada PRIMARY KEY.',
    'Rancang tabel transaksi yang memuat kolom uang. Jelaskan kenapa DECIMAL(10,2) lebih tepat daripada FLOAT, dan tunjukkan satu kasus perhitungan yang akan meleset kalau memakai FLOAT.'
  ]
});

TOPICS.push({
  id: 'basdat-alter',
  judul: 'Mengubah Struktur — ALTER, DROP & TRUNCATE',
  kategori: 'basis-data',
  tag: ['ALTER TABLE', 'DROP', 'TRUNCATE', 'RENAME', 'MODIFY', 'CHANGE'],
  ringkas: 'Membetulkan tabel yang sudah terlanjur dibuat, dan tiga cara menghapus yang akibatnya sangat berbeda.',

  fungsi: `**Mengubah struktur tabel yang sudah berisi data — tanpa kehilangan apa pun.**

Kebutuhan berubah. Kolom baru dibutuhkan, tipe perlu diperbesar, kolom lama tidak terpakai lagi.

Terpakai di:

- **Migrasi basis data** — setiap penambahan fitur biasanya menuntut perubahan struktur
- **Memperbaiki rancangan** yang ternyata kurang tepat
- **Memperbesar kolom** yang ternyata terlalu pendek
- **Membersihkan** kolom yang sudah tidak dipakai

Yang harus dipahami sebelum menyentuhnya: **tiga perintah ini punya tingkat bahaya yang sangat berbeda.**

- \`ALTER\` mengubah struktur — bisa dibalik kalau hati-hati
- \`TRUNCATE\` mengosongkan isi, strukturnya tetap — **tidak bisa dibatalkan**
- \`DROP\` menghapus tabel beserta isinya — **tidak bisa dibatalkan**

Dua yang terakhir tidak menanyakan konfirmasi, dan tidak masuk ke tempat sampah.`,

  praktik: {
    tujuan: `Kamu bisa mengubah struktur tabel berisi data dengan aman, dan punya kebiasaan mencadangkan sebelum perintah yang tidak bisa dibatalkan.`,
    alat: [
      'DBMS apa pun',
      'Basis data latihan yang boleh dirusak'
    ],
    langkah: [
      { judul: 'Cadangkan dulu, selalu',
        isi: `Sebelum setiap perubahan struktur pada data yang berarti:

- MySQL: \`mysqldump -u root -p kampus > cadangan.sql\`
- PostgreSQL: \`pg_dump kampus > cadangan.sql\`
- SQLite: cukup salin berkasnya

Ini tiga puluh detik yang beberapa kali dalam hidupmu akan menyelamatkan pekerjaan berminggu-minggu.` },
      { judul: 'Coba dulu di salinan',
        isi: `Buat basis data \`kampus_uji\`, pulihkan cadangan ke sana, dan jalankan perubahanmu di situ lebih dulu.

Kalau berhasil dan hasilnya sesuai harapan, baru jalankan di yang asli.

Untuk perubahan yang rumit, ini bukan kehati-hatian berlebihan — ini prosedur baku.` },
      { judul: 'Tambah kolom dengan nilai bawaan',
        isi: `\`ALTER TABLE mahasiswa ADD COLUMN angkatan INT;\`

Baris yang sudah ada akan berisi \`NULL\`. Kalau kolomnya wajib, beri nilai bawaan:

- \`ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'aktif'\`

Menambah kolom \`NOT NULL\` **tanpa** nilai bawaan pada tabel berisi data akan ditolak — karena baris lama tidak punya nilai untuk diisi.` },
      { judul: 'Perbesar kolom, jangan perkecil',
        isi: `Memperbesar aman: \`VARCHAR(50)\` menjadi \`VARCHAR(100)\` tidak menghilangkan apa pun.

Memperkecil **memotong data diam-diam** di sebagian DBMS. Sebelum memperkecil, periksa dulu:

- \`SELECT MAX(LENGTH(nama)) FROM mahasiswa;\`

Kalau hasilnya melebihi ukuran barumu, jangan lanjutkan.` },
      { judul: 'Bedakan DELETE, TRUNCATE, dan DROP',
        isi: `- \`DELETE FROM t WHERE ...\` — menghapus **sebagian**, bisa dibatalkan dalam transaksi, lambat untuk data besar
- \`TRUNCATE TABLE t\` — mengosongkan **semua**, sangat cepat, **tidak bisa dibatalkan**, dan mengembalikan penghitung otomatis ke awal
- \`DROP TABLE t\` — menghapus **tabelnya sekalian**

Ketiganya sering tertukar, dan tertukar di sini berarti kehilangan data.` },
      { judul: 'Biasakan menulis WHERE lebih dulu',
        isi: `Ketik \`WHERE\`-nya **sebelum** mengetik \`DELETE\` atau \`UPDATE\`.

Terdengar aneh, tetapi ini mencegah kecelakaan paling klasik: menekan Enter sebelum sempat mengetik \`WHERE\`, dan seluruh tabel terhapus.

Cara lain: jalankan dulu sebagai \`SELECT\` dengan \`WHERE\` yang sama, lihat berapa baris yang kena, baru ubah jadi \`DELETE\`.` },
      { judul: 'Catat setiap perubahan struktur',
        isi: `Simpan tiap perintah \`ALTER\` ke berkas bernomor: \`001-tambah-angkatan.sql\`, \`002-perbesar-nama.sql\`.

Dengan begitu basis data di komputer lain bisa disamakan dengan menjalankan berkas yang belum dijalankan.

Inilah gagasan **migrasi** yang dipakai kerangka kerja web, dan kamu bisa memakainya tanpa kerangka kerja apa pun.` }
    ],
    cek: [
      'Kamu punya berkas cadangan sebelum setiap perubahan struktur',
      'Perintah SELECT dengan WHERE yang sama sudah kamu jalankan sebelum DELETE',
      'Setiap perubahan struktur tercatat sebagai berkas SQL bernomor'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Rancangan tabel jarang benar sejak percobaan pertama. \`ALTER TABLE\` adalah perintah untuk membetulkannya **tanpa membuang data yang sudah ada**.

**Yang bisa dilakukan \`ALTER TABLE\`**

- **\`ADD\`** — menambah kolom baru.
- **\`DROP COLUMN\`** — membuang kolom **beserta seluruh isinya**.
- **\`MODIFY\`** — mengubah **tipe data** kolom, namanya tetap.
- **\`CHANGE\`** — mengubah **nama sekaligus tipe** kolom.
- **\`RENAME\`** — mengubah nama tabel.
- **\`ADD/DROP CONSTRAINT\`** — menambah atau membuang aturan seperti foreign key.

**Beda \`MODIFY\` dan \`CHANGE\` — ini sering keluar di ujian**

Keduanya terlihat mirip tetapi tidak saling menggantikan:

- **\`MODIFY\`** hanya menyentuh tipe. Nama kolom disebut **sekali**.
  \`ALTER TABLE details MODIFY stuff_id INT(20);\`
- **\`CHANGE\`** mengganti nama, jadi nama kolom disebut **dua kali** — yang lama lalu yang baru — dan **tipenya wajib ikut ditulis ulang** meski tidak berubah.
  \`ALTER TABLE customers CHANGE cust_id cust_ktp CHAR(15);\`

Melupakan tipe data pada \`CHANGE\` adalah kesalahan yang paling sering terjadi, karena terasa mubazir menulis ulang sesuatu yang tidak diubah.

**Tiga cara menghapus, tiga akibat berbeda**

Bagian ini wajib dipahami betul, karena salah pilih berarti kehilangan data.

- **\`DELETE FROM tabel;\`** — menghapus **isi**, struktur tetap. Bisa disaring dengan \`WHERE\`. Termasuk **DML**, bukan DDL, sehingga bisa dibatalkan dengan \`ROLLBACK\` selama masih dalam transaksi.
- **\`TRUNCATE TABLE tabel;\`** — menghapus **seluruh isi** sekaligus, struktur tetap. **Tidak bisa** disaring dengan \`WHERE\`. Jauh lebih cepat karena tidak menghapus baris satu per satu, melainkan membuang lalu membuat ulang tabelnya. Termasuk **DDL**, jadi **tidak bisa di-\`ROLLBACK\`**, dan penghitung \`AUTO_INCREMENT\` **kembali ke 1**.
- **\`DROP TABLE tabel;\`** — menghapus **tabelnya sendiri**, isi dan struktur, lenyap semua.

Cara mengingatnya: **DELETE mengosongkan lemari, TRUNCATE mengganti lemari dengan yang baru dan kosong, DROP membuang lemarinya.**

**\`ALTER TABLE\` pada tabel besar bukan operasi gratis.** Pada MySQL versi lama, sebagian besar perubahan dikerjakan dengan **menyalin seluruh tabel** ke bentuk baru, lalu menukarnya. Tabel sejuta baris bisa terkunci beberapa menit, dan selama itu aplikasi lain menunggu. Versi baru sudah punya banyak perubahan yang bisa dilakukan di tempat, tetapi kebiasaan berhati-hati tetap berguna.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- Menambah kolom\nALTER TABLE orders ADD order_quantity INT(30);\n\n-- Mengubah TIPE saja: nama kolom disebut sekali\nALTER TABLE details MODIFY stuff_id INT(20);\n\n-- Mengubah NAMA: kolom disebut dua kali, tipe wajib ditulis ulang\nALTER TABLE customers CHANGE cust_id cust_ktp CHAR(15);\n\n-- Mengubah nama tabel\nALTER TABLE stuff RENAME goods;',
      penjelasan: `
Empat bentuk yang dipakai di praktikum, dan perbedaannya terletak pada berapa kali nama kolom disebut.

**\`ADD\`** menempatkan kolom baru di **paling belakang**. Kalau kamu ingin menaruhnya di posisi tertentu, tambahkan \`AFTER nama_kolom\` atau \`FIRST\`. Posisi kolom sebenarnya tidak memengaruhi apa pun secara teknis — \`SELECT\` tetap bisa menyebut kolom dalam urutan bebas — jadi ini murni soal kerapian saat membaca \`DESC\`.

Yang perlu dipikirkan saat menambah kolom ke tabel yang **sudah berisi data**: baris lama akan diisi apa? Jawabannya \`NULL\`, atau nilai \`DEFAULT\` kalau kamu menentukannya. Karena itu menambah kolom \`NOT NULL\` tanpa \`DEFAULT\` ke tabel berisi data akan **ditolak** — MySQL tidak tahu harus mengisi apa untuk baris lama.

**\`MODIFY\` vs \`CHANGE\`** — jumlah penyebutan nama kolom adalah petunjuk paling gampang:

- \`MODIFY stuff_id INT(20)\` → satu nama. Yang berubah cuma tipe.
- \`CHANGE cust_id cust_ktp CHAR(15)\` → dua nama. Yang pertama nama lama, kedua nama baru.

Kalau kamu menulis \`CHANGE cust_id cust_ktp\` tanpa \`CHAR(15)\`, MySQL menolak dengan error sintaks. Tipe data **selalu wajib** pada \`CHANGE\`, sekalipun tidak diubah, karena bentuk perintahnya memang menuntut definisi kolom yang lengkap.

**\`RENAME\`** mengganti nama tabel. Perhatikan bahwa **semua yang merujuk nama lama akan rusak** — view, trigger, prosedur, dan kode aplikasimu. MySQL tidak akan memperingatkan soal ini.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Mengosongkan isi, struktur tetap\nDELETE FROM orders;                    -- bisa di-ROLLBACK, AUTO_INCREMENT lanjut\nDELETE FROM orders WHERE order_num = 5;  -- bisa disaring\n\nTRUNCATE TABLE orders;                 -- cepat, AUTO_INCREMENT balik ke 1\n-- TRUNCATE TABLE orders WHERE ...;    -- TIDAK ADA. Selalu semua.\n\n-- Menghapus tabelnya sendiri\nDROP TABLE orders;\nDROP TABLE IF EXISTS orders;           -- aman dijalankan dua kali',
      penjelasan: `
Ketiganya menghapus, tetapi apa yang tersisa sesudahnya sangat berbeda. Salah pilih di server sungguhan berarti kehilangan data.

**\`DELETE\`** membuang baris **satu per satu**, dan tiap penghapusan dicatat di log transaksi. Itu sebabnya ia lambat pada tabel besar, tetapi juga sebabnya ia **bisa dibatalkan** dengan \`ROLLBACK\` selama transaksinya belum di-\`COMMIT\`. Penghitung \`AUTO_INCREMENT\` **tidak** direset — kalau baris terakhir bernomor 100, baris berikutnya tetap 101 meski tabelnya sudah kosong.

**\`TRUNCATE\`** tidak repot menghapus baris. Ia membuang tabelnya lalu membuat ulang yang kosong dengan struktur sama. Karena itu ia hampir seketika, tetapi juga karena itu ia **DDL** — tidak ada yang bisa di-\`ROLLBACK\`, dan \`AUTO_INCREMENT\` **kembali ke 1**.

Konsekuensi yang sering mengejutkan: karena TRUNCATE membuang lalu membuat ulang, ia **ditolak** kalau ada tabel lain yang menunjuk tabel ini lewat foreign key — bahkan ketika tabel penunjuk itu kosong. \`DELETE\` dalam keadaan sama justru berhasil.

**\`DROP TABLE\`** menghapus segalanya. Sesudahnya \`SELECT\` akan menjawab *"Table doesn't exist"*.

**\`IF EXISTS\`** layak dibiasakan pada skrip yang dijalankan berulang kali. Tanpanya, menjalankan skrip untuk kedua kalinya berhenti dengan error hanya karena tabelnya memang sudah tidak ada.

Untuk urutan penghapusan tabel yang saling terhubung: **kebalikan dari urutan pembuatan.** Kalau membuat \`customers\` lalu \`orders\`, maka menghapusnya \`orders\` dulu baru \`customers\`. Menghapus induk lebih dulu akan ditolak karena masih ada anak yang menunjuk padanya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Memperbaiki tabel yang sudah terlanjur dibuat
-- ============================================

USE penjualan_barang;

-- ---------- Keadaan awal ----------
DESC orders;

-- ---------- 1. Menambah kolom ----------
ALTER TABLE orders ADD order_quantity INT NOT NULL DEFAULT 1;

-- Menaruh kolom di posisi tertentu
ALTER TABLE orders ADD catatan VARCHAR(100) NULL AFTER order_date;

-- ---------- 2. Mengubah tipe (nama tetap) ----------
ALTER TABLE orders MODIFY order_quantity INT NOT NULL DEFAULT 0;

-- ---------- 3. Mengubah nama kolom (tipe wajib ditulis ulang) ----------
ALTER TABLE orders CHANGE catatan keterangan VARCHAR(150) NULL;

-- ---------- 4. Membuang kolom ----------
ALTER TABLE orders DROP COLUMN keterangan;

-- ---------- 5. Mengubah nama tabel ----------
ALTER TABLE stuff RENAME goods;

-- ---------- 6. Menambah dan membuang constraint ----------
ALTER TABLE orders ADD UNIQUE (order_num, order_date);
ALTER TABLE orders DROP INDEX order_num;

-- ---------- Tiga cara menghapus ----------
DELETE FROM orders WHERE order_num = 5;   -- satu baris, bisa dibatalkan
DELETE FROM orders;                       -- semua baris, AUTO_INCREMENT lanjut
TRUNCATE TABLE orders;                    -- semua baris, AUTO_INCREMENT reset
DROP TABLE IF EXISTS orders;              -- tabelnya ikut hilang

-- ---------- Urutan menghapus tabel berelasi: anak dulu ----------
DROP TABLE IF EXISTS orders;      -- anak
DROP TABLE IF EXISTS customers;   -- induk`
  },

  output: `MariaDB [penjualan_barang]> ALTER TABLE orders ADD order_quantity INT NOT NULL DEFAULT 1;
Query OK, 0 rows affected (0.031 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [penjualan_barang]> DESC orders;
+----------------+----------+------+-----+---------+----------------+
| Field          | Type     | Null | Key | Default | Extra          |
+----------------+----------+------+-----+---------+----------------+
| order_num      | int(11)  | NO   | PRI | NULL    | auto_increment |
| order_date     | date     | NO   |     | NULL    |                |
| cust_id        | char(13) | NO   | MUL | NULL    |                |
| order_quantity | int(11)  | NO   |     | 1       |                |
+----------------+----------+------+-----+---------+----------------+
4 rows in set (0.002 sec)

MariaDB [penjualan_barang]> ALTER TABLE orders CHANGE catatan keterangan;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual
that corresponds to your MariaDB server version for the right syntax to use
near '' at line 1

MariaDB [penjualan_barang]> DROP TABLE customers;
ERROR 1217 (23000): Cannot delete or update a parent row: a foreign key
constraint fails`,

  kesalahanUmum: [
    {
      salah: 'Menulis ALTER TABLE t CHANGE nama_lama nama_baru; tanpa menyertakan tipe data.',
      kenapa: 'Bentuk CHANGE menuntut definisi kolom yang lengkap, jadi tipe data wajib ditulis ulang meski tidak berubah. MySQL menolak dengan error sintaks yang menunjuk ke akhir baris dan bertuliskan near \'\', sehingga tidak jelas apa yang kurang.',
      benar: 'Sertakan tipenya: ALTER TABLE t CHANGE nama_lama nama_baru VARCHAR(50);. Kalau hanya ingin mengubah tipe tanpa mengganti nama, pakai MODIFY yang cukup menyebut nama sekali.'
    },
    {
      salah: 'Memakai TRUNCATE untuk menghapus sebagian baris dengan menambahkan WHERE.',
      kenapa: 'TRUNCATE tidak menerima WHERE sama sekali — ia selalu mengosongkan seluruh tabel. MySQL menolak dengan error sintaks. Kalau kebiasaan ini terbawa dan WHERE-nya terlanjur dihapus supaya perintahnya jalan, seluruh isi tabel lenyap tanpa bisa di-ROLLBACK.',
      benar: 'Pakai DELETE FROM tabel WHERE syarat; untuk menghapus sebagian. TRUNCATE hanya untuk mengosongkan semuanya.'
    },
    {
      salah: 'Menganggap TRUNCATE dan DELETE tanpa WHERE benar-benar setara.',
      kenapa: 'Tiga perbedaan yang bisa menggigit. TRUNCATE mereset AUTO_INCREMENT ke 1 sedangkan DELETE tidak, sehingga nomor baris baru bisa bentrok dengan nomor lama yang masih dirujuk tabel lain. TRUNCATE tidak bisa di-ROLLBACK. Dan TRUNCATE ditolak kalau ada foreign key yang menunjuk tabel itu.',
      benar: 'Pakai DELETE kalau butuh pembatalan atau ingin nomor urut lanjut. Pakai TRUNCATE kalau ingin benar-benar bersih dan cepat, dan yakin tidak akan menyesal.'
    },
    {
      salah: 'Menambahkan kolom NOT NULL tanpa DEFAULT ke tabel yang sudah berisi data.',
      kenapa: 'Baris lama tidak punya nilai untuk kolom baru itu, dan NOT NULL melarang mereka kosong. MySQL menolak, atau pada mode longgar diam-diam mengisi nilai palsu seperti string kosong dan angka nol, yang lebih berbahaya karena terlihat seperti data sungguhan.',
      benar: 'Sertakan DEFAULT saat menambah kolom NOT NULL ke tabel berisi data. Atau tambahkan dulu sebagai NULL, isi datanya, baru ubah menjadi NOT NULL lewat MODIFY.'
    },
    {
      salah: 'Menghapus tabel induk lebih dulu, sebelum tabel anak yang merujuknya.',
      kenapa: 'Foreign key mencegahnya, dan MySQL menjawab "Cannot delete or update a parent row". Pesan ini membingungkan pada DROP TABLE karena kata "row" terdengar seperti soal baris, padahal yang ditolak adalah penghapusan tabelnya.',
      benar: 'Hapus dari sisi anak ke induk, kebalikan dari urutan membuatnya. Kalau memang perlu memaksa, matikan sementara dengan SET FOREIGN_KEY_CHECKS = 0; lalu nyalakan lagi sesudahnya.'
    }
  ],

  analogi: `Bayangkan lemari arsip yang sudah penuh berkas.

**\`ALTER TABLE ADD\`** adalah menambah laci baru di bawah. Laci itu kosong, dan berkas lama tidak otomatis punya isian untuk laci itu — persis seperti kolom baru yang bernilai NULL untuk baris lama.

**\`MODIFY\`** adalah memperbesar laci yang sudah ada supaya muat map yang lebih tebal. Nama lacinya tetap. **\`CHANGE\`** adalah mengganti label lacinya sekaligus ukurannya — dan karena kamu memesan laci baru, kamu tetap harus menyebutkan ukurannya, meski ukurannya sama seperti dulu.

Untuk tiga cara menghapus, bayangkan lemari berisi map:

- **\`DELETE\`** — mengeluarkan map satu per satu sambil mencatat apa yang dikeluarkan. Lambat, tapi kalau salah, catatannya bisa dipakai mengembalikan. Nomor map berikutnya tetap melanjutkan yang terakhir.
- **\`TRUNCATE\`** — mengangkat seluruh lemari ke truk sampah, lalu menaruh lemari kosong yang identik di tempatnya. Sekejap, tapi tidak ada catatan, tidak ada yang bisa dikembalikan, dan penomoran map dimulai lagi dari satu.
- **\`DROP\`** — membuang lemarinya dan tidak menggantinya. Ruangan itu sekarang kosong melompong.

Dan soal urutan: kamu tidak bisa membuang lemari induk selama masih ada map di lemari lain yang menulis *"lihat berkas di lemari induk"*. Bereskan yang menunjuk dulu.`,

  latihan: [
    'Buat tabel Dosen dengan kolom NIP, Nama, dan Alamat. Tambahkan kolom Telepon setelah tabel jadi, lalu hapus kembali kolom itu. Tuliskan ketiga perintahnya.',
    'Jelaskan perbedaan MODIFY dan CHANGE, lalu tuliskan perintah untuk mengubah kolom cust_id bertipe CHAR(13) menjadi bernama cust_ktp bertipe CHAR(15).',
    'Buat tabel berisi lima baris dengan kolom AUTO_INCREMENT. Jalankan DELETE FROM, sisipkan satu baris, dan catat nomornya. Ulangi percobaan dengan TRUNCATE, lalu jelaskan kenapa hasilnya berbeda.',
    'Kamu punya tabel pesanan berisi satu juta baris dan ingin mengosongkannya secepat mungkin, tetapi ada tabel detail_pesanan yang menunjuk padanya. Perintah mana yang bisa dipakai, mana yang akan ditolak, dan kenapa?',
    'Sebuah tabel karyawan sudah berisi 500 baris. Kamu ingin menambahkan kolom status yang wajib diisi. Jelaskan kenapa ALTER TABLE karyawan ADD status VARCHAR(10) NOT NULL; bermasalah, lalu tuliskan urutan perintah yang aman.'
  ]
});

TOPICS.push({
  id: 'basdat-dml',
  judul: 'DML — INSERT, UPDATE & DELETE',
  kategori: 'basis-data',
  tag: ['DML', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'transaksi'],
  ringkas: 'Mengisi, mengubah, dan menghapus data — beserta satu kelalaian yang bisa merusak seluruh tabel.',

  fungsi: `**Memasukkan, mengubah, dan menghapus isi tabel — dengan pengaman supaya tidak salah sasaran.**

Ini perintah yang paling sering dijalankan aplikasi, dan yang paling sering merusak data kalau lengah.

Terpakai di:

- **Setiap fitur aplikasi** — mendaftar, menyunting profil, membatalkan pesanan
- **Mengisi data awal** saat menyiapkan basis data
- **Impor data** dari CSV atau sistem lama
- **Perbaikan data** — memperbaiki nilai yang salah masuk

Kecelakaan paling terkenal di seluruh dunia basis data adalah **UPDATE tanpa WHERE**. Satu Enter, dan setiap baris di tabel berubah.

Karena itu topik ini bukan sekadar sintaks — ia tentang **kebiasaan kerja yang mencegah kecelakaan**.`,

  praktik: {
    tujuan: `Kamu bisa mengubah data dengan aman memakai transaksi, dan punya kebiasaan yang membuat UPDATE tanpa WHERE hampir mustahil terjadi.`,
    alat: [
      'DBMS yang mendukung transaksi',
      'Klien basis data'
    ],
    langkah: [
      { judul: 'Sebutkan kolomnya saat INSERT',
        isi: `Tulis \`INSERT INTO mahasiswa (nim, nama, angkatan) VALUES (...)\`, bukan \`INSERT INTO mahasiswa VALUES (...)\`.

Bentuk kedua bergantung pada **urutan kolom**, dan urutan itu bisa berubah kalau ada yang menambah kolom baru.

Bentuk pertama tetap benar apa pun yang terjadi pada strukturnya.` },
      { judul: 'Masukkan banyak baris sekaligus',
        isi: `Satu perintah dengan banyak baris jauh lebih cepat daripada banyak perintah:

- \`INSERT INTO t (a, b) VALUES (1,2), (3,4), (5,6);\`

Untuk seribu baris, selisihnya bisa puluhan kali lipat, karena tiap perintah punya biaya tetap sendiri.` },
      { judul: 'Selalu jalankan SELECT dulu',
        isi: `Sebelum \`UPDATE\` atau \`DELETE\`, jalankan \`SELECT\` dengan **WHERE yang sama persis**.

Lihat berapa baris yang muncul. Kalau jumlahnya tidak sesuai harapanmu, WHERE-mu salah — dan kamu baru saja menghindari kerusakan.

Jadikan ini kebiasaan yang tidak pernah dilewati, bahkan untuk perubahan yang terasa sepele.` },
      { judul: 'Pakai transaksi sebagai jaring pengaman',
        isi: `- \`BEGIN;\` atau \`START TRANSACTION;\`
- jalankan perubahanmu
- \`SELECT\` untuk memeriksa hasilnya
- kalau benar \`COMMIT;\`, kalau salah \`ROLLBACK;\`

Selama belum \`COMMIT\`, semuanya masih bisa dibatalkan. Ini pengaman terbaik yang tersedia, dan gratis.

Catatan: di MySQL, tabel harus bertipe InnoDB agar transaksi bekerja.` },
      { judul: 'Nyalakan mode aman di MySQL',
        isi: `MySQL punya \`SET SQL_SAFE_UPDATES = 1;\` yang **menolak** \`UPDATE\` dan \`DELETE\` tanpa WHERE yang memakai kunci.

Ini pengaman tambahan yang layak dinyalakan di lingkungan pengembangan, dan sangat layak di produksi.` },
      { judul: 'Kenali empat operasi CRUD',
        isi: `Setiap aplikasi berputar di sekitar empat ini:

- **Create** → \`INSERT\`
- **Read** → \`SELECT\`
- **Update** → \`UPDATE\`
- **Delete** → \`DELETE\`

Latihannya: buat satu program kecil yang melakukan keempatnya pada satu tabel. Itu kerangka dari hampir semua aplikasi yang akan kamu buat.` },
      { judul: 'Pertimbangkan penghapusan lunak',
        isi: `Untuk data penting, sering lebih baik **menandai terhapus** daripada benar-benar menghapus:

- tambah kolom \`dihapus_pada DATETIME NULL\`
- alih-alih \`DELETE\`, jalankan \`UPDATE ... SET dihapus_pada = NOW()\`
- semua \`SELECT\` menambahkan \`WHERE dihapus_pada IS NULL\`

Datanya masih ada kalau ternyata dihapus keliru — dan itu sering terjadi.` }
    ],
    cek: [
      'Setiap UPDATE dan DELETE-mu didahului SELECT dengan WHERE yang sama',
      'Kamu sudah pernah membatalkan perubahan dengan ROLLBACK dan datanya kembali utuh',
      'Perintah INSERT-mu selalu menyebutkan nama kolomnya'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Kalau DDL mengurus kerangka, **DML** mengurus isinya. Hanya ada tiga perintah, tetapi satu di antaranya adalah perintah paling berbahaya di seluruh SQL.

**\`INSERT\` — memasukkan baris baru**

Ada dua bentuk, dan pilihannya bukan soal selera:

- **Tanpa menyebut kolom:** \`INSERT INTO data VALUES ('6104786', 'John Wick', '34th East Boulevard');\` Nilainya harus lengkap dan **urutannya harus persis sama** dengan urutan kolom di tabel.
- **Dengan menyebut kolom:** \`INSERT INTO data (id, nama) VALUES ('6104786', 'John Wick');\` Boleh sebagian kolom saja, urutannya bebas.

Bentuk kedua **lebih dianjurkan**, karena bentuk pertama akan diam-diam salah kalau suatu hari ada yang menambah kolom di tengah lewat \`ALTER TABLE ... AFTER\`.

**\`UPDATE\` — mengubah baris yang sudah ada**

\`UPDATE customer SET cust_address = 'Saphire Karangwangkal', cust_city = 'Purwokerto' WHERE cust_id = 10002;\`

Perhatikan polanya: **\`SET\` menyebut apa yang diubah, \`WHERE\` menyebut baris mana yang diubah.** Beberapa kolom dipisah **koma**, bukan \`AND\`. Ini kekeliruan yang sering terjadi karena \`AND\` terasa alami dalam kalimat "ubah alamat **dan** kota".

**\`DELETE\` — membuang baris**

\`DELETE FROM data WHERE data_id = '6104786';\`

**Bahaya \`WHERE\` yang terlupa**

Inilah bagian terpenting dari topik ini.

- \`UPDATE customers SET cust_city = 'Purwokerto';\` — **seluruh** pelanggan pindah ke Purwokerto.
- \`DELETE FROM customers;\` — **seluruh** pelanggan lenyap.

Keduanya dijalankan tanpa peringatan, tanpa konfirmasi. MySQL menganggap kamu memang bermaksud begitu. Kalau tabelnya sejuta baris, sejuta baris itu berubah dalam sekejap.

Dua kebiasaan yang menyelamatkan:

- **Jalankan \`SELECT\` dengan \`WHERE\` yang sama lebih dulu.** Lihat berapa baris yang kena. Kalau angkanya sesuai harapan, baru ganti \`SELECT *\` menjadi \`UPDATE ... SET\` atau \`DELETE\`.
- **Tulis \`WHERE\`-nya lebih dulu**, baru bagian depannya. Terdengar aneh, tetapi menghilangkan kemungkinan lupa.

**Transaksi — jaring pengaman**

\`START TRANSACTION;\` lalu perintahmu, lalu \`COMMIT;\` untuk mengesahkan atau \`ROLLBACK;\` untuk membatalkan. Selama belum \`COMMIT\`, perubahanmu belum permanen dan bisa dibatalkan sepenuhnya. Ini hanya berlaku pada mesin penyimpanan **InnoDB**, yang untungnya sudah menjadi bawaan MariaDB modern.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- Bentuk 1: tanpa nama kolom, urutan HARUS sama persis\nINSERT INTO data VALUES (\'6104786\', \'John Wick\', \'34th East Boulevard\');\n\n-- Bentuk 2: sebut kolomnya, urutan bebas, boleh sebagian\nINSERT INTO data (data_id, nama) VALUES (\'6104786\', \'John Wick\');\n\n-- Banyak baris sekaligus\nINSERT INTO data (data_id, nama) VALUES\n  (\'001\', \'Andi\'),\n  (\'002\', \'Budi\'),\n  (\'003\', \'Citra\');',
      penjelasan: `
Bentuk pertama lebih pendek, dan itulah yang membuatnya berbahaya.

Ia bergantung sepenuhnya pada **urutan kolom di tabel**. Selama tabelnya belum berubah, tidak masalah. Tapi begitu ada yang menjalankan \`ALTER TABLE data ADD email VARCHAR(50) AFTER nama;\`, seluruh perintah \`INSERT\` bentuk pertama yang sudah kamu tulis jadi salah — alamat akan masuk ke kolom email. Kalau jumlah nilainya jadi tidak cocok, MySQL setidaknya menolak dengan *"Column count doesn't match value count at row 1"*. Yang lebih buruk adalah ketika jumlahnya kebetulan tetap cocok: datanya masuk ke kolom yang salah **tanpa error sama sekali**.

Bentuk kedua kebal terhadap perubahan itu, karena menyebut tujuannya secara eksplisit. Ia juga memungkinkan mengisi sebagian kolom saja — sisanya diisi \`DEFAULT\` atau \`NULL\`. Ini yang kamu butuhkan saat ada kolom \`AUTO_INCREMENT\` yang tidak boleh kamu isi sendiri.

Soal tanda kutip: **nilai teks dan tanggal wajib pakai kutip tunggal**, angka tidak perlu. Menulis \`'123'\` untuk kolom \`INT\` memang tetap diterima MySQL karena ia mengubahnya sendiri, tetapi kebiasaan ini menyembunyikan kesalahan tipe dan sebaiknya dihindari.

Bentuk banyak baris sekaligus jauh lebih cepat daripada menjalankan \`INSERT\` berulang kali, karena hanya sekali perjalanan ke server dan sekali penulisan log.
`
    },
    {
      bahasa: 'sql',
      kode: '-- BENAR: beberapa kolom dipisah KOMA\nUPDATE customer\nSET cust_address = \'Saphire Karangwangkal\',\n    cust_city    = \'Purwokerto\',\n    cust_region  = \'BNY\'\nWHERE cust_id = 10002;\n\n-- SALAH: memakai AND -- tidak error, tapi hasilnya kacau\n-- UPDATE customer SET a = 1 AND b = 2 WHERE ...;',
      penjelasan: `
Dua kesalahan khas ada di sini, dan yang kedua jauh lebih licik.

**Pertama, pemisah antar kolom adalah koma, bukan \`AND\`.** Bagian \`SET\` adalah daftar penugasan, sama seperti daftar kolom pada \`CREATE TABLE\`.

Kenapa memakai \`AND\` berbahaya? Karena **MySQL tidak selalu menolaknya**. Ia akan membaca \`a = 1 AND b = 2\` sebagai satu ekspresi logika, menghitungnya menjadi \`0\` atau \`1\`, lalu menyimpan hasil itu ke kolom \`a\`. Kolom \`b\` tidak tersentuh sama sekali. Jadi perintahnya sukses, tidak ada pesan error, dan datamu rusak diam-diam. Ini jenis bug yang paling mahal.

**Kedua, perhatikan bahwa \`WHERE cust_id = 10002\` memakai satu tanda sama dengan.** Di SQL, \`=\` berarti perbandingan pada \`WHERE\` dan berarti penugasan pada \`SET\`. Tidak ada \`==\` seperti di bahasa pemrograman. Kalau kamu terbiasa dengan C atau Python, ini butuh penyesuaian.

Satu kebiasaan yang layak ditiru: sebelum menjalankan \`UPDATE\` ini, jalankan dulu

\`SELECT * FROM customer WHERE cust_id = 10002;\`

Kalau yang muncul memang baris yang kamu maksud, tinggal ganti bagian depannya. Perhatikan juga keluaran MySQL sesudahnya: *"Rows matched: 1 Changed: 1"*. Kalau **matched** menunjukkan angka yang jauh lebih besar dari dugaanmu, kamu baru saja mengubah lebih banyak baris daripada yang diinginkan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Jaring pengaman: coba dulu, batalkan kalau salah\nSTART TRANSACTION;\n\nDELETE FROM products WHERE prod_id = \'TNT2\';\nSELECT * FROM products;        -- periksa hasilnya\n\nROLLBACK;                      -- batalkan, data kembali utuh\n-- COMMIT;                     -- atau sahkan kalau sudah yakin',
      penjelasan: `
Transaksi adalah tombol urung yang tidak dimiliki perintah biasa.

Antara \`START TRANSACTION\` dan \`COMMIT\`, semua perubahanmu bersifat **sementara**. Kamu bisa melihat hasilnya lewat \`SELECT\`, tetapi pengguna lain **belum** melihatnya. Kalau ternyata salah, \`ROLLBACK\` mengembalikan segalanya seperti semula.

Ini menjawab ketakutan terbesar saat menjalankan \`DELETE\` di data sungguhan. Alih-alih berharap \`WHERE\`-nya benar, kamu bisa membuktikannya dulu.

Empat sifat yang dijamin transaksi dikenal dengan singkatan **ACID**, dan ini sering ditanyakan:

- **Atomicity** — semua berhasil, atau semua batal. Tidak ada setengah jadi.
- **Consistency** — basis data berpindah dari satu keadaan sah ke keadaan sah lain; aturan seperti foreign key tetap terjaga.
- **Isolation** — transaksi yang berjalan bersamaan tidak saling mengintip hasil setengah jadi.
- **Durability** — begitu \`COMMIT\` selesai, datanya bertahan meski listrik mati sedetik kemudian.

Contoh klasik kenapa **atomicity** penting: transfer uang. Kurangi saldo A, tambah saldo B. Kalau server mati di antara keduanya, uang lenyap. Dengan transaksi, keduanya dianggap satu kesatuan yang tidak bisa dipisah.

Perhatikan dua batasan penting: transaksi hanya bekerja pada mesin **InnoDB**, dan perintah **DDL seperti \`CREATE\`, \`ALTER\`, \`TRUNCATE\` tidak bisa di-\`ROLLBACK\`** — bahkan menjalankannya di tengah transaksi akan diam-diam meng-\`COMMIT\` transaksi yang sedang berjalan.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- DML: mengisi, mengubah, menghapus
-- ============================================

USE orderentry;

-- ---------- INSERT ----------
-- Bentuk aman: sebut kolomnya
INSERT INTO customers (cust_id, cust_name, cust_city)
  VALUES ('10002', 'Hafizh', 'Purwokerto');

-- Banyak baris sekaligus: satu perjalanan ke server
INSERT INTO orders (order_num, order_date, cust_id, order_quantity) VALUES
  (20005, '2005-09-01', '10002', 1),
  (20006, '2005-09-28', '10002', 1),
  (20007, '2005-09-30', '10004', 1);

-- Salah jumlah nilai -> ditolak, untung ketahuan
-- INSERT INTO orders VALUES ('2005', '2005-09-01', '10002');
-- ERROR 1136: Column count doesn't match value count at row 1

-- ---------- UPDATE ----------
-- Langkah 1: pastikan dulu baris mana yang kena
SELECT * FROM customers WHERE cust_id = '10002';

-- Langkah 2: baru ubah. Antar kolom dipisah KOMA
UPDATE customers
SET cust_address = 'Saphire Karangwangkal',
    cust_city    = 'Purwokerto'
WHERE cust_id = '10002';

-- ---------- DELETE ----------
DELETE FROM products WHERE prod_id = 'TNT2';
DELETE FROM vendors  WHERE vend_id = 1006;

-- ---------- Yang TIDAK boleh dilakukan ----------
-- UPDATE customers SET cust_city = 'Purwokerto';   -- SEMUA baris kena
-- DELETE FROM customers;                           -- SEMUA baris hilang

-- ---------- Jaring pengaman ----------
START TRANSACTION;
DELETE FROM orders WHERE order_date < '2005-01-01';
SELECT COUNT(*) FROM orders;      -- masih sesuai harapan?
ROLLBACK;                         -- batal; ganti COMMIT kalau sudah yakin`
  },

  output: `MariaDB [orderentry]> INSERT INTO orders VALUES ('2005', '2005-09-01', '10002');
ERROR 1136 (21S01): Column count doesn't match value count at row 1

MariaDB [orderentry]> DESC orders;
+----------------+---------+------+-----+---------+-------+
| Field          | Type    | Null | Key | Default | Extra |
+----------------+---------+------+-----+---------+-------+
| order_num      | int(11) | NO   | PRI | NULL    |       |
| order_date     | date    | NO   |     | NULL    |       |
| cust_id        | char(5) | NO   | MUL | NULL    |       |
| order_quantity | int(30) | YES  |     | NULL    |       |
+----------------+---------+------+-----+---------+-------+
4 rows in set (0.002 sec)

MariaDB [orderentry]> UPDATE customers SET cust_city = 'Purwokerto' WHERE cust_id = '10002';
Query OK, 1 row affected (0.005 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [orderentry]> DELETE FROM products WHERE prod_id = 'TNT2';
Query OK, 1 row affected (0.006 sec)`,

  kesalahanUmum: [
    {
      salah: 'Menjalankan UPDATE atau DELETE tanpa WHERE.',
      kenapa: 'Perintahnya berlaku untuk seluruh baris. Tidak ada konfirmasi, tidak ada peringatan, dan pada tabel besar semuanya selesai dalam sekejap. Kalau tidak sedang di dalam transaksi, tidak ada cara mengembalikan selain memulihkan dari cadangan. Ini kesalahan yang paling sering diceritakan orang sebagai pengalaman terburuknya dengan basis data.',
      benar: 'Selalu jalankan SELECT dengan WHERE yang sama lebih dulu untuk melihat baris mana yang kena. Biasakan mengetik bagian WHERE sebelum mengetik bagian UPDATE atau DELETE-nya.'
    },
    {
      salah: 'Memisahkan beberapa kolom pada UPDATE dengan AND, bukan koma.',
      kenapa: 'MySQL tidak selalu menolaknya. Ia membaca a = 1 AND b = 2 sebagai ekspresi logika bernilai 0 atau 1, lalu menyimpan angka itu ke kolom a, sementara kolom b tidak tersentuh. Perintahnya dilaporkan sukses sehingga kerusakan tidak terdeteksi sampai lama kemudian.',
      benar: 'UPDATE t SET a = 1, b = 2 WHERE ...; — koma antar kolom. AND hanya dipakai di bagian WHERE.'
    },
    {
      salah: 'Memakai INSERT INTO tabel VALUES (...) tanpa menyebut kolom.',
      kenapa: 'Perintahnya terikat pada urutan kolom saat itu. Begitu ada yang menambah atau menyisipkan kolom lewat ALTER TABLE, nilai-nilainya masuk ke kolom yang salah. Kalau jumlahnya kebetulan masih cocok, tidak ada error sama sekali dan data tercampur diam-diam.',
      benar: 'Selalu sebut kolomnya: INSERT INTO t (kolom1, kolom2) VALUES (...);. Sedikit lebih panjang, tetapi kebal terhadap perubahan struktur.'
    },
    {
      salah: 'Lupa memberi tanda kutip pada nilai teks dan tanggal.',
      kenapa: 'MySQL akan menganggapnya nama kolom, lalu melapor "Unknown column \'Purwokerto\' in \'where clause\'". Pesan ini membingungkan karena menyebut kata yang jelas-jelas bukan kolom, sehingga pemula sering mencari kesalahan di tempat lain.',
      benar: "Bungkus semua teks dan tanggal dengan kutip tunggal: WHERE cust_city = 'Purwokerto'. Angka murni tidak perlu dikutip."
    },
    {
      salah: 'Mengira transaksi bisa membatalkan segala hal, termasuk TRUNCATE dan ALTER TABLE.',
      kenapa: 'DDL tidak ikut aturan transaksi. Menjalankan TRUNCATE atau ALTER di tengah transaksi justru diam-diam meng-COMMIT transaksi yang sedang berjalan, sehingga perubahan sebelumnya yang tadinya masih bisa dibatalkan malah terlanjur permanen.',
      benar: 'Batasi transaksi untuk INSERT, UPDATE, dan DELETE. Untuk perubahan struktur, buat cadangan dulu dengan mysqldump.'
    }
  ],

  analogi: `Bayangkan buku besar keuangan yang ditulis dengan pena.

**\`INSERT\`** adalah menulis baris baru di bawah. Kalau kamu menulis angka di kolom yang salah karena tidak melihat judul kolomnya, tidak akan ada yang menegur — angkanya terlihat sah, hanya berada di tempat yang keliru. Itulah kenapa menyebut nama kolom pada \`INSERT\` sepadan dengan usahanya.

**\`UPDATE\`** adalah mencoret angka lama dan menulis yang baru. Bagian **\`WHERE\`** adalah jarimu yang menunjuk baris mana yang mau dicoret. **Tanpa jari penunjuk, kamu mencoret seluruh halaman.**

**\`DELETE\`** adalah menghapus baris itu sama sekali. Sama juga: tanpa jari penunjuk, seluruh halaman kosong.

**Transaksi** adalah menulis dulu di kertas buram. Kamu boleh coret-coret sesukanya, melihat hasilnya, dan baru menyalinnya ke buku besar kalau sudah yakin — itu \`COMMIT\`. Kalau ternyata salah, kertas buramnya diremas dan dibuang, buku besarnya tidak pernah tersentuh — itu \`ROLLBACK\`.

Yang perlu diingat: kertas buram ini tidak berlaku untuk pekerjaan tukang. Kalau kamu **merobek halaman** dari buku besar — itu \`TRUNCATE\` dan \`ALTER\` — remasan kertas buram tidak bisa mengembalikan halaman yang sudah robek.`,

  latihan: [
    'Buat tabel data(data_id, nama, alamat), sisipkan tiga baris dengan bentuk INSERT yang menyebut nama kolom, lalu tampilkan isinya.',
    'Tuliskan satu perintah UPDATE yang mengubah alamat, kota, dan wilayah seorang pelanggan sekaligus. Jelaskan kenapa pemisahnya koma dan apa yang terjadi kalau memakai AND.',
    'Jalankan SELECT COUNT(*) dengan syarat tertentu, lalu jalankan DELETE dengan syarat yang sama. Bandingkan angka dari COUNT dengan laporan "rows affected". Kenapa langkah ini layak dibiasakan?',
    'Di dalam transaksi, hapus semua pesanan sebelum tahun 2005, periksa jumlah baris yang tersisa, lalu batalkan dengan ROLLBACK. Buktikan datanya kembali utuh.',
    'Jelaskan keempat sifat ACID dengan contoh transfer uang antarrekening. Sifat mana yang mencegah uang lenyap ketika server mati di tengah proses?'
  ]
});

TOPICS.push({
  id: 'basdat-select',
  judul: 'SELECT — Menyaring & Mengurutkan',
  kategori: 'basis-data',
  tag: ['SELECT', 'WHERE', 'ORDER BY', 'LIKE', 'BETWEEN', 'IN', 'LIMIT', 'DISTINCT'],
  ringkas: 'Perintah yang paling sering dipakai seumur hidup: mengambil tepat baris yang kamu butuhkan.',

  fungsi: `**Mengambil data yang kamu butuhkan saja — bukan semuanya lalu disaring di aplikasi.**

Ini perintah yang paling sering dipakai, dan yang paling menentukan kecepatan aplikasimu.

Terpakai di:

- **Setiap halaman aplikasi** yang menampilkan data
- **Laporan** — dengan penyaringan, pengurutan, dan pembatasan
- **Pencarian** — kolom cari di aplikasi apa pun
- **Pemeriksaan data** sebelum UPDATE atau DELETE

Kesalahan yang paling mahal dan paling sering: **mengambil seluruh tabel lalu menyaring di kode**.

Basis data punya indeks, pengoptimal kueri, dan bertahun-tahun penyempurnaan. Aplikasimu tidak. Membiarkan basis data yang menyaring hampir selalu **puluhan sampai ribuan kali** lebih cepat.`,

  praktik: {
    tujuan: `Kamu bisa menulis SELECT dengan penyaringan, pengurutan, dan pembatasan yang tepat, dan sudah mengukur sendiri kenapa menyaring di basis data jauh lebih cepat.`,
    alat: [
      'DBMS apa pun',
      'Tabel berisi sedikitnya 100.000 baris untuk pengukuran'
    ],
    langkah: [
      { judul: 'Sebutkan kolomnya, jangan pakai bintang',
        isi: `\`SELECT nim, nama FROM mahasiswa\` lebih baik daripada \`SELECT *\`.

Alasannya bukan gaya:

- mengurangi data yang dikirim lewat jaringan
- kadang memungkinkan basis data menjawab **dari indeks saja** tanpa membuka tabelnya
- kodemu tidak rusak kalau ada yang menambah kolom baru

Pakai bintang hanya saat menjelajah data secara manual.` },
      { judul: 'Kuasai WHERE dan operatornya',
        isi: `- perbandingan biasa, \`BETWEEN\`, \`IN\`
- \`LIKE 'Ha%'\` — awalan; \`'%zh'\` akhiran; \`'%fiz%'\` di mana saja
- \`IS NULL\` dan \`IS NOT NULL\` — **bukan** \`= NULL\`

Butir terakhir penting: \`= NULL\` **tidak pernah** bernilai benar, karena NULL berarti "tidak diketahui" dan sesuatu yang tidak diketahui tidak bisa dibandingkan.` },
      { judul: 'Perhatikan bahwa awalan bisa memakai indeks',
        isi: `\`LIKE 'Ha%'\` bisa memakai indeks, karena basis data tahu harus mulai mencari dari mana.

\`LIKE '%zh'\` **tidak bisa** — ia harus memeriksa setiap baris.

Ini menjelaskan kenapa pencarian "mengandung" lambat pada tabel besar, dan kenapa mesin pencari memakai teknik lain untuk itu.` },
      { judul: 'Urutkan dan batasi hasilnya',
        isi: `- \`ORDER BY nilai DESC, nama ASC\` — bertingkat, untuk memecah nilai yang sama
- \`LIMIT 10\` — sepuluh teratas
- \`LIMIT 10 OFFSET 20\` — halaman ketiga

Selalu pasangkan \`LIMIT\` dengan \`ORDER BY\`. Tanpa pengurutan, urutan barisnya **tidak dijamin** — dan halaman kedua bisa memuat baris yang sama dengan halaman pertama.` },
      { judul: 'Ukur bedanya sendiri',
        isi: `Ambil tabel berisi 100.000 baris, lalu bandingkan dua cara mencari mahasiswa angkatan 2024:

- ambil semua ke Python, saring dengan perulangan
- \`SELECT ... WHERE angkatan = 2024\`

Ukur waktunya. Selisihnya akan meyakinkanmu lebih dari penjelasan apa pun.` },
      { judul: 'Baca rencana eksekusinya',
        isi: `Tambahkan \`EXPLAIN\` di depan kuerimu.

Cari kata **"index"** — artinya bagus. Cari **"full table scan"** atau \`type: ALL\` — artinya seluruh tabel dibaca satu per satu.

Lalu tambahkan indeks: \`CREATE INDEX idx_angkatan ON mahasiswa(angkatan);\` dan jalankan \`EXPLAIN\` lagi. Perhatikan perubahannya.

Ini keterampilan yang membedakan orang yang bisa SQL dari orang yang bisa membuat SQL **cepat**.` }
    ],
    cek: [
      'Menyaring di basis data terbukti jauh lebih cepat daripada menyaring di Python',
      'EXPLAIN menunjukkan indeks dipakai setelah kamu membuatnya',
      'Setiap LIMIT di kuerimu dipasangkan dengan ORDER BY'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
\`SELECT\` adalah perintah yang akan kamu tulis ribuan kali. Bentuk lengkapnya punya **urutan klausa yang tidak boleh ditukar**:

\`SELECT\` → \`FROM\` → \`WHERE\` → \`GROUP BY\` → \`HAVING\` → \`ORDER BY\` → \`LIMIT\`

Menukar urutannya langsung menghasilkan error sintaks. Yang menarik, **urutan penulisan berbeda dengan urutan pengerjaan** — dan memahami ini menjelaskan banyak hal yang terasa aneh nanti.

Urutan pengerjaan sesungguhnya:

**\`FROM\`** → **\`WHERE\`** → **\`GROUP BY\`** → **\`HAVING\`** → **\`SELECT\`** → **\`ORDER BY\`** → **\`LIMIT\`**

Perhatikan \`SELECT\` dikerjakan **hampir terakhir**. Inilah sebabnya alias yang kamu buat di \`SELECT\` **tidak bisa dipakai di \`WHERE\`** — saat \`WHERE\` berjalan, aliasnya belum ada. Tetapi alias itu **bisa** dipakai di \`ORDER BY\`, karena \`ORDER BY\` berjalan sesudahnya.

**Menyaring dengan \`WHERE\`**

- Pembanding: \`=\`, \`<>\` atau \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
- Penggabung: \`AND\`, \`OR\`, \`NOT\`
- **\`BETWEEN a AND b\`** — rentang, dan **kedua ujungnya ikut**.
- **\`IN (a, b, c)\`** — cocok dengan salah satu dari daftar. Lebih ringkas daripada berderet \`OR\`.
- **\`LIKE\`** — pencocokan pola. **\`%\`** berarti berapa pun karakter, **\`_\`** berarti tepat satu karakter.
- **\`IS NULL\`** — satu-satunya cara memeriksa nilai kosong.

**\`AND\` lebih kuat daripada \`OR\`.** Ini penyebab bug yang sering luput: \`WHERE kota = 'Solo' OR kota = 'Semarang' AND status = 'aktif'\` dibaca mesin sebagai \`kota = 'Solo' OR (kota = 'Semarang' AND status = 'aktif')\`. Semua orang Solo ikut terjaring, aktif maupun tidak. **Gunakan tanda kurung** setiap kali \`AND\` dan \`OR\` bercampur.

**Mengurutkan dengan \`ORDER BY\`**

\`ASC\` menaik (bawaan, boleh tidak ditulis), \`DESC\` menurun. Bisa beberapa kolom: \`ORDER BY kota ASC, nama DESC\` — urutkan kota dulu, dan di dalam kota yang sama urutkan nama terbalik.

**\`LIMIT\`** membatasi jumlah baris. \`LIMIT 5\` mengambil lima teratas; \`LIMIT 10, 5\` melewati sepuluh lalu mengambil lima — ini yang dipakai untuk halaman kedua dan seterusnya.

**\`DISTINCT\`** membuang baris kembar dari hasil. Perhatikan ia berlaku untuk **seluruh baris hasil**, bukan satu kolom saja.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'SELECT * FROM customers;                    -- semua kolom\nSELECT cust_name, cust_city FROM customers; -- kolom terpilih saja\nSELECT DISTINCT cust_city FROM customers;   -- daftar kota tanpa kembar',
      penjelasan: `
**\`SELECT *\`** mengambil semua kolom. Praktis saat menjelajah, tetapi **hindari di kode aplikasi** karena tiga alasan:

- Ia mengirim kolom yang tidak kamu butuhkan, memboroskan waktu baca dan lalu lintas jaringan. Pada tabel dengan kolom \`TEXT\` besar, bedanya terasa.
- Hasilnya berubah diam-diam kalau ada yang menambah kolom lewat \`ALTER TABLE\`, dan kode yang mengandalkan urutan kolom jadi salah.
- Ia menghalangi optimasi bernama *covering index*, yaitu ketika seluruh kolom yang diminta kebetulan sudah ada di dalam indeks sehingga tabelnya tidak perlu disentuh sama sekali.

**\`DISTINCT\`** membuang baris kembar. Yang sering disalahpahami: ia bekerja pada **seluruh baris hasil**, bukan pada kolom pertama saja. Jadi \`SELECT DISTINCT cust_city, cust_name FROM customers\` tidak memberi daftar kota unik — ia memberi daftar **pasangan** kota dan nama yang unik, dan karena namanya berbeda-beda, hampir semua baris akan lolos.

Kalau yang kamu mau benar-benar daftar kota, sebutkan kolom itu saja. Kalau kamu butuh satu nama contoh per kota, itu pekerjaan \`GROUP BY\`, bukan \`DISTINCT\`.
`
    },
    {
      bahasa: 'sql',
      kode: '-- LIKE: % = berapa pun karakter, _ = tepat satu karakter\nSELECT * FROM customers WHERE cust_name LIKE \'A%\';    -- diawali A\nSELECT * FROM customers WHERE cust_name LIKE \'%di\';   -- diakhiri di\nSELECT * FROM customers WHERE cust_name LIKE \'%an%\';  -- memuat an\nSELECT * FROM customers WHERE cust_id   LIKE \'1____\'; -- 1 lalu 4 karakter',
      penjelasan: `
\`LIKE\` memakai dua tanda pengganti, dan membedakannya penting:

- **\`%\`** — berapa pun karakter, **termasuk nol karakter**. Jadi \`'A%'\` juga cocok dengan teks yang isinya cuma \`"A"\`.
- **\`_\`** — **tepat satu** karakter, tidak boleh kurang tidak boleh lebih. \`'1____'\` hanya cocok dengan teks sepanjang tepat lima karakter yang diawali angka 1.

Perhatikan bahwa keduanya berbeda dari tanda pengganti di terminal, di mana \`*\` yang berarti banyak karakter. Di SQL, \`*\` tidak punya arti khusus di dalam \`LIKE\`.

Soal huruf besar-kecil: pada MySQL dengan pengaturan bawaan, \`LIKE\` **tidak peka huruf**, sehingga \`'a%'\` juga menemukan "Andi". Ini bergantung pada *collation* kolomnya, dan bisa berbeda di DBMS lain — PostgreSQL misalnya peka huruf pada \`LIKE\`.

**Yang penting untuk kinerja:** pola yang **diawali \`%\`** seperti \`'%an%'\` tidak bisa memanfaatkan indeks. Mesin terpaksa memeriksa setiap baris satu per satu. Pada tabel jutaan baris, ini perbedaan antara sepersekian detik dan belasan detik. Pola yang diawali huruf tetap seperti \`'A%'\` masih bisa memakai indeks dengan baik.

Kalau kamu benar-benar butuh pencarian kata di tengah teks panjang, yang tepat adalah **indeks FULLTEXT** dengan \`MATCH ... AGAINST\`, bukan \`LIKE '%kata%'\`.
`
    },
    {
      bahasa: 'sql',
      kode: '-- AND lebih kuat daripada OR -- ini sumber bug\nSELECT * FROM customers\nWHERE cust_city = \'Solo\' OR cust_city = \'Semarang\' AND status = \'aktif\';\n-- dibaca: Solo OR (Semarang AND aktif)\n\n-- Yang dimaksud biasanya ini:\nSELECT * FROM customers\nWHERE (cust_city = \'Solo\' OR cust_city = \'Semarang\') AND status = \'aktif\';\n\n-- Lebih ringkas dengan IN\nSELECT * FROM customers\nWHERE cust_city IN (\'Solo\', \'Semarang\') AND status = \'aktif\';',
      penjelasan: `
Ini bug yang tidak pernah menghasilkan pesan error, sehingga hanya ketahuan kalau kamu memeriksa hasilnya dengan teliti.

Sama seperti perkalian lebih kuat daripada penjumlahan dalam matematika, **\`AND\` lebih kuat daripada \`OR\`** dalam logika. Jadi \`a OR b AND c\` selalu berarti \`a OR (b AND c)\`, bukan \`(a OR b) AND c\`.

Akibatnya pada contoh pertama: semua pelanggan Solo ikut terjaring **tanpa peduli statusnya**, karena syarat \`status = 'aktif'\` hanya menempel pada Semarang. Kalau kebetulan sebagian besar pelanggan Solo memang aktif, kesalahan ini bisa bertahan berbulan-bulan tanpa disadari.

Aturan praktis yang layak dijadikan kebiasaan: **setiap kali \`AND\` dan \`OR\` muncul dalam satu \`WHERE\`, pasang tanda kurung.** Sekalipun urutannya kebetulan sudah benar, tanda kurung membuat maksudmu terbaca jelas oleh orang berikutnya — termasuk dirimu tiga bulan lagi.

Bentuk ketiga memakai **\`IN\`**, dan ini bukan sekadar lebih pendek. Karena daftar nilainya berada dalam satu kurung, tidak ada lagi peluang salah baca antara \`AND\` dan \`OR\`. Untuk daftar yang panjang, \`IN\` juga lebih mudah dibaca daripada sepuluh \`OR\` berderet.

Satu jebakan \`IN\` yang perlu diketahui: **\`NOT IN\` bersama nilai NULL selalu menghasilkan kosong.** Kalau daftarnya memuat NULL, \`x NOT IN (1, 2, NULL)\` tidak pernah bernilai benar, karena perbandingan dengan NULL menghasilkan "tidak diketahui".
`
    },
    {
      bahasa: 'sql',
      kode: 'SELECT cust_name AS nama, cust_city AS kota\nFROM customers\nWHERE cust_city = \'Purwokerto\'\nORDER BY nama ASC\nLIMIT 10;\n\n-- Alias TIDAK bisa dipakai di WHERE:\n-- SELECT harga * 2 AS diskon FROM produk WHERE diskon > 100;  -- ERROR',
      penjelasan: `
**\`AS\`** memberi nama baru pada kolom hasil. Kata \`AS\` sendiri sebenarnya boleh dihilangkan — \`cust_name nama\` sah — tetapi menuliskannya membuat kueri jauh lebih mudah dibaca, terutama saat ada banyak kolom.

Sekarang bagian yang membingungkan: **kenapa alias bisa dipakai di \`ORDER BY\` tetapi tidak di \`WHERE\`?**

Jawabannya ada pada urutan pengerjaan yang disebut di bagian konsep:

\`FROM\` → \`WHERE\` → \`GROUP BY\` → \`HAVING\` → **\`SELECT\`** → \`ORDER BY\` → \`LIMIT\`

Saat \`WHERE\` dikerjakan, klausa \`SELECT\` **belum** berjalan, sehingga alias \`diskon\` belum ada. Mesin menjawab *"Unknown column 'diskon' in 'where clause'"*. Sebaliknya \`ORDER BY\` berjalan **sesudah** \`SELECT\`, jadi aliasnya sudah tersedia.

Jalan keluarnya kalau kamu perlu menyaring berdasarkan hasil perhitungan: **tulis ulang perhitungannya di \`WHERE\`**, misalnya \`WHERE harga * 2 > 100\`. Atau bungkus kueri itu menjadi subkueri, lalu saring di lapisan luar.

**\`LIMIT\`** punya dua bentuk yang sering tertukar. \`LIMIT 10\` mengambil sepuluh baris pertama. \`LIMIT 10, 5\` **melewati** sepuluh baris lalu mengambil lima — angka pertama adalah pergeseran, bukan jumlah. Bentuk yang lebih jelas maksudnya adalah \`LIMIT 5 OFFSET 10\`, yang berarti sama persis.

Satu hal penting: **\`LIMIT\` tanpa \`ORDER BY\` hampir selalu keliru.** Tanpa urutan yang pasti, "sepuluh teratas" tidak punya arti — mesin boleh memberi sepuluh baris mana saja, dan pilihannya bisa berubah antar-jalan.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- SELECT: menyaring dan mengurutkan
-- ============================================

USE orderentry;

-- ---------- Dasar ----------
SELECT * FROM customers;
SELECT cust_name, cust_city FROM customers;
SELECT DISTINCT cust_city FROM customers;

-- ---------- Menyaring ----------
SELECT * FROM products WHERE prod_price > 10;
SELECT * FROM products WHERE prod_price BETWEEN 5 AND 20;    -- ujung ikut
SELECT * FROM customers WHERE cust_city IN ('Solo', 'Semarang');
SELECT * FROM customers WHERE cust_email IS NULL;
SELECT * FROM customers WHERE cust_name LIKE 'A%';

-- ---------- AND dan OR bercampur: WAJIB tanda kurung ----------
SELECT * FROM customers
WHERE (cust_city = 'Solo' OR cust_city = 'Semarang')
  AND cust_email IS NOT NULL;

-- ---------- Mengurutkan ----------
SELECT prod_name, prod_price
FROM products
ORDER BY prod_price DESC;

-- Dua kunci: kota menaik, lalu nama menurun di dalam tiap kota
SELECT cust_name, cust_city
FROM customers
ORDER BY cust_city ASC, cust_name DESC;

-- ---------- Alias dan pembatasan ----------
SELECT prod_name AS nama, prod_price AS harga
FROM products
WHERE prod_price > 5          -- pakai kolom asli, BUKAN alias
ORDER BY harga DESC           -- di sini alias boleh
LIMIT 5;

-- ---------- Halaman kedua: lewati 5, ambil 5 ----------
SELECT prod_name FROM products
ORDER BY prod_name
LIMIT 5 OFFSET 5;

-- ---------- Kolom hasil hitungan ----------
SELECT prod_name,
       prod_price,
       prod_price * 1.11 AS harga_ppn
FROM products
ORDER BY harga_ppn DESC;`
  },

  output: `MariaDB [orderentry]> SELECT prod_name, prod_price FROM products ORDER BY prod_price DESC LIMIT 3;
+----------------+------------+
| prod_name      | prod_price |
+----------------+------------+
| Bird bath      |      10.00 |
| Fuses          |       3.42 |
| Safe           |      50.00 |
+----------------+------------+
3 rows in set (0.001 sec)

MariaDB [orderentry]> SELECT prod_price * 2 AS diskon FROM products WHERE diskon > 10;
ERROR 1054 (42S22): Unknown column 'diskon' in 'where clause'

MariaDB [orderentry]> SELECT DISTINCT cust_city FROM customers;
+------------+
| cust_city  |
+------------+
| Purwokerto |
| Solo       |
| Semarang   |
+------------+
3 rows in set (0.000 sec)`,

  kesalahanUmum: [
    {
      salah: 'Mencampur AND dan OR dalam satu WHERE tanpa tanda kurung.',
      kenapa: 'AND diproses lebih dulu daripada OR, sehingga a OR b AND c berarti a OR (b AND c). Hasilnya memuat baris yang tidak kamu maksud, dan karena tidak ada pesan error, kekeliruan ini bisa bertahan lama. Pada laporan, gejalanya cuma berupa angka yang sedikit lebih besar dari seharusnya.',
      benar: 'Selalu bungkus dengan tanda kurung saat AND dan OR bercampur. Untuk daftar nilai pada kolom yang sama, pakai IN yang lebih aman sekaligus lebih pendek.'
    },
    {
      salah: 'Memakai alias dari SELECT di dalam WHERE.',
      kenapa: 'WHERE dikerjakan sebelum SELECT, jadi aliasnya belum ada saat penyaringan berlangsung. MySQL menjawab "Unknown column ... in \'where clause\'", yang membingungkan karena kolom itu jelas terlihat tertulis di kueri yang sama.',
      benar: 'Tulis ulang perhitungannya di WHERE, misalnya WHERE harga * 2 > 100. Alias tetap boleh dipakai di ORDER BY karena klausa itu berjalan setelah SELECT.'
    },
    {
      salah: 'Memakai LIMIT tanpa ORDER BY lalu menyebut hasilnya "sepuluh teratas".',
      kenapa: 'Tanpa urutan yang ditentukan, DBMS bebas mengembalikan baris mana pun. Hasilnya bisa berubah antar-jalan, terutama setelah data bertambah atau indeks berubah. Selama tabel masih kecil, urutannya sering kebetulan stabil sehingga kesalahan ini terasa aman.',
      benar: 'Selalu pasangkan LIMIT dengan ORDER BY. Kalau tidak ada urutan yang jelas, artinya pertanyaanmu sendiri yang belum lengkap.'
    },
    {
      salah: 'Mengira SELECT DISTINCT kolom1, kolom2 memberi daftar unik untuk kolom1.',
      kenapa: 'DISTINCT bekerja pada seluruh baris hasil, bukan kolom pertama. Karena kolom kedua nilainya berbeda-beda, hampir semua baris dianggap berbeda dan lolos. Hasilnya terlihat seperti tidak ada penyaringan sama sekali.',
      benar: 'Sebutkan hanya kolom yang ingin diunikkan. Kalau butuh keterangan tambahan per nilai unik, gunakan GROUP BY dengan fungsi agregat.'
    },
    {
      salah: 'Memakai LIKE dengan pola berawalan persen, seperti LIKE \'%kata%\', pada tabel besar.',
      kenapa: 'Pola yang diawali persen tidak bisa memanfaatkan indeks, sehingga mesin memeriksa setiap baris satu per satu. Pada tabel jutaan baris, kueri yang seharusnya sepersekian detik bisa memakan belasan detik dan mengunci sumber daya.',
      benar: 'Kalau mungkin, pakai pola berawalan tetap seperti LIKE \'kata%\'. Untuk pencarian kata di tengah teks panjang, gunakan indeks FULLTEXT dengan MATCH AGAINST.'
    }
  ],

  analogi: `Bayangkan kamu mencari buku di perpustakaan besar.

**\`FROM\`** adalah menentukan ruangan mana yang akan disisir. **\`WHERE\`** adalah syarat bukunya: terbit setelah 2010, berbahasa Indonesia. **\`SELECT\`** adalah memutuskan apa yang kamu catat dari tiap buku — cukup judul dan pengarang, tidak perlu seluruh isinya. **\`ORDER BY\`** adalah menyusun catatanmu, dan **\`LIMIT\`** adalah berhenti setelah sepuluh.

Urutan pengerjaannya memperjelas kenapa alias tidak bisa dipakai di \`WHERE\`: kamu **menyaring buku dulu di rak**, baru **mencatat** apa yang kamu ambil. Nama panggilan yang kamu berikan saat mencatat belum ada saat kamu masih berdiri di depan rak.

Untuk \`LIKE\`, bayangkan mencari berdasarkan judul: **\`'A%'\`** berarti "judulnya dimulai huruf A" — kamu bisa langsung menuju laci katalog huruf A. Cepat. Tetapi **\`'%anak%'\`** berarti "judulnya memuat kata anak di mana saja" — tidak ada laci untuk itu, kamu harus membaca **setiap** kartu katalog dari awal sampai akhir. Itulah kenapa persen di depan mahal.

Dan soal \`AND\` dengan \`OR\`: kalau kamu bilang *"ambilkan buku sejarah atau biografi yang terbit setelah 2010"*, petugas bisa saja mengambil **semua** buku sejarah dari tahun kapan pun. Tanda kurung adalah cara kamu memperjelas maksud sebelum dia bergerak.`,

  latihan: [
    'Tampilkan semua produk berharga antara 5 dan 20, diurutkan dari yang termahal, dan batasi lima teratas.',
    'Cari semua pelanggan yang namanya memuat huruf "an" di mana pun. Lalu jelaskan kenapa kueri ini akan melambat pada tabel berisi satu juta baris, dan apa gantinya.',
    'Tuliskan kueri untuk mencari pelanggan dari Solo atau Semarang yang emailnya sudah terisi. Kerjakan dua versi: satu dengan OR dan tanda kurung, satu dengan IN. Jelaskan mana yang lebih aman.',
    'Jelaskan kenapa SELECT harga * 1.11 AS harga_ppn FROM produk WHERE harga_ppn > 100; menghasilkan error, lalu tuliskan dua cara memperbaikinya.',
    'Tampilkan halaman ketiga dari daftar produk kalau setiap halaman memuat 10 baris. Jelaskan arti kedua angka pada LIMIT yang kamu tulis, dan kenapa ORDER BY wajib ada.'
  ]
});

TOPICS.push({
  id: 'basdat-agregat',
  judul: 'Fungsi Agregat & GROUP BY',
  kategori: 'basis-data',
  tag: ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'GROUP BY', 'HAVING'],
  ringkas: 'Meringkas banyak baris menjadi satu angka, lalu memecahnya per kelompok.',

  fungsi: `**Meringkas banyak baris menjadi angka yang berarti — total, rata-rata, jumlah, tertinggi.**

Hampir semua laporan adalah agregasi.

Terpakai di:

- **Dasbor dan laporan** — total penjualan per bulan, jumlah mahasiswa per angkatan
- **Menghitung IPK** — rata-rata nilai berbobot SKS
- **Data Mining** — perhitungan frekuensi dan support dimulai dari \`COUNT\`
- **Pemeriksaan data** — mencari duplikat dengan \`GROUP BY ... HAVING COUNT(*) > 1\`

Dua hal yang paling sering salah, dan keduanya diam-diam memberi angka yang keliru:

- **\`COUNT(*)\` versus \`COUNT(kolom)\`** — yang kedua **tidak menghitung NULL**
- **\`WHERE\` versus \`HAVING\`** — yang pertama menyaring **sebelum** dikelompokkan, yang kedua **sesudah**

Salah memilih di antara keduanya menghasilkan laporan yang terlihat wajar tetapi angkanya salah.`,

  praktik: {
    tujuan: `Kamu bisa membuat laporan ringkasan dengan pengelompokan yang benar, dan tahu persis kapan memakai WHERE dan kapan HAVING.`,
    alat: [
      'DBMS apa pun',
      'Tabel dengan data yang cukup beragam'
    ],
    langkah: [
      { judul: 'Kenali lima fungsi agregat pokok',
        isi: `- \`COUNT()\` — menghitung baris
- \`SUM()\` — menjumlahkan
- \`AVG()\` — rata-rata
- \`MAX()\` dan \`MIN()\` — tertinggi dan terendah

Kelimanya mengubah **banyak baris jadi satu nilai**, dan itulah yang membedakannya dari fungsi biasa.` },
      { judul: 'Buktikan perbedaan COUNT(*) dan COUNT(kolom)',
        isi: `Buat tabel yang sebagian kolomnya berisi NULL, lalu jalankan keduanya pada tabel yang sama.

\`COUNT(*)\` menghitung **semua baris**. \`COUNT(nilai)\` hanya menghitung yang **tidak NULL**.

Selisihnya adalah jumlah data yang hilang — dan itu sendiri informasi yang berguna.

Hal yang sama berlaku untuk \`AVG\`: ia **mengabaikan** NULL, bukan menganggapnya nol.` },
      { judul: 'Kelompokkan dengan GROUP BY',
        isi: `\`SELECT angkatan, COUNT(*) FROM mahasiswa GROUP BY angkatan;\`

Aturan yang harus dipatuhi: **setiap kolom di SELECT harus ada di GROUP BY, atau dibungkus fungsi agregat.**

PostgreSQL menolak kalau kamu melanggarnya. MySQL lama membiarkannya dan memberi **nilai sembarang** — yang jauh lebih berbahaya karena tidak ada yang memberitahumu.` },
      { judul: 'Bedakan WHERE dan HAVING dengan percobaan',
        isi: `Jalankan dua kueri pada data yang sama:

- \`WHERE nilai >= 80 GROUP BY kelas\` — buang dulu nilai di bawah 80, baru kelompokkan
- \`GROUP BY kelas HAVING AVG(nilai) >= 80\` — kelompokkan dulu, lalu ambil kelas yang rata-ratanya di atas 80

Hasilnya **berbeda**, dan bandingkan sendiri untuk melihat kenapa. Yang pertama menjawab "nilai bagus per kelas", yang kedua "kelas yang bagus".` },
      { judul: 'Cari duplikat dengan pola baku',
        isi: `\`SELECT surel, COUNT(*) FROM pengguna GROUP BY surel HAVING COUNT(*) > 1;\`

Ini pola yang akan kamu pakai berkali-kali seumur hidup — untuk mencari data kembar sebelum menambahkan batasan \`UNIQUE\`.

Jalankan ini **sebelum** menambah \`UNIQUE\`, karena kalau ada duplikat, penambahan batasannya akan gagal.` },
      { judul: 'Hitung rata-rata berbobot',
        isi: `IPK bukan rata-rata biasa — ia rata-rata **berbobot SKS**:

- \`SELECT SUM(nilai * sks) / SUM(sks) AS ipk FROM krs WHERE nim = '...'\`

Bandingkan dengan \`AVG(nilai)\` pada data yang sama. Keduanya berbeda, dan yang benar adalah yang pertama.

Ini contoh bahwa memilih fungsi agregat yang tepat bukan soal sintaks, melainkan soal **memahami apa yang dihitung**.` }
    ],
    cek: [
      'Kamu bisa menunjukkan selisih antara COUNT(*) dan COUNT(kolom) pada tabel yang punya NULL',
      'Kueri WHERE dan HAVING-mu memberi hasil berbeda, dan kamu bisa menjelaskan kenapa',
      'Rata-rata berbobot SKS memberi angka berbeda dari AVG biasa'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
**Fungsi agregat** memampatkan banyak baris menjadi **satu nilai**. Ada lima yang wajib dikuasai:

- **\`COUNT()\`** — menghitung jumlah baris
- **\`SUM()\`** — menjumlahkan
- **\`AVG()\`** — merata-ratakan
- **\`MAX()\`** — nilai terbesar
- **\`MIN()\`** — nilai terkecil

**Tiga bentuk \`COUNT\` yang berbeda hasilnya**

Ini sering ditanyakan, dan bedanya nyata:

- **\`COUNT(*)\`** — menghitung **semua baris**, termasuk yang kolomnya NULL.
- **\`COUNT(kolom)\`** — menghitung baris yang kolom itu **tidak NULL**. Baris ber-NULL dilewati.
- **\`COUNT(DISTINCT kolom)\`** — menghitung **nilai berbeda**, NULL tetap diabaikan.

Pada tabel 10 baris yang 3 di antaranya \`nilai\`-nya NULL, \`COUNT(*)\` memberi 10 sedangkan \`COUNT(nilai)\` memberi 7.

**Semua fungsi agregat mengabaikan NULL** — kecuali \`COUNT(*)\`. Ini penting untuk \`AVG\`: pembaginya adalah **jumlah baris yang tidak NULL**, bukan jumlah seluruh baris. Kalau kamu ingin NULL dihitung sebagai nol, ubah dulu dengan \`AVG(IFNULL(nilai, 0))\`.

**\`GROUP BY\` — agregat per kelompok**

Tanpa \`GROUP BY\`, agregat menghasilkan **satu baris** untuk seluruh tabel. Dengan \`GROUP BY kota\`, ia menghasilkan **satu baris per kota**.

Aturan besinya: **setiap kolom di \`SELECT\` harus berupa kolom yang di-\`GROUP BY\`, atau berada di dalam fungsi agregat.** Kalau tidak, pertanyaanmu tidak punya jawaban tunggal — meminta \`nama\` untuk kelompok berisi lima orang, maka nama siapa yang harus ditampilkan?

MySQL secara historis longgar soal ini dan diam-diam memilih salah satu nilai secara sembarang, yang membuat banyak orang tidak sadar kuerinya salah. Sejak MySQL 5.7, mode \`ONLY_FULL_GROUP_BY\` aktif secara bawaan dan menolaknya. DBMS lain seperti PostgreSQL selalu menolak sejak dulu.

**\`WHERE\` vs \`HAVING\` — perbedaan yang paling sering ditanyakan**

- **\`WHERE\`** menyaring **baris**, dan berjalan **sebelum** pengelompokan.
- **\`HAVING\`** menyaring **kelompok**, dan berjalan **sesudah** pengelompokan.

Akibat langsungnya: **\`WHERE\` tidak boleh memuat fungsi agregat**, karena saat ia berjalan, kelompoknya belum terbentuk sehingga \`COUNT\` belum punya nilai apa pun.

*"Tampilkan kota yang punya lebih dari 5 pelanggan aktif"* butuh keduanya sekaligus: \`WHERE status = 'aktif'\` menyaring barisnya lebih dulu, lalu \`HAVING COUNT(*) > 5\` menyaring kelompok hasilnya.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- 10 baris, 3 di antaranya kolom nilai bernilai NULL\nSELECT COUNT(*)              FROM krs;   -- 10, semua baris\nSELECT COUNT(nilai)          FROM krs;   --  7, NULL dilewati\nSELECT COUNT(DISTINCT nilai) FROM krs;   --  4, nilai berbeda saja\nSELECT AVG(nilai_angka)      FROM krs;   -- dibagi 7, bukan 10',
      penjelasan: `
Perbedaan ketiga bentuk \`COUNT\` adalah soal **apa yang dianggap layak dihitung**.

**\`COUNT(*)\`** menghitung baris, titik. Ia tidak peduli isi kolomnya, bahkan tidak perlu membaca kolom mana pun. Karena itu ia biasanya **paling cepat**, dan inilah yang kamu pakai kalau pertanyaannya *"ada berapa baris?"*.

**\`COUNT(nilai)\`** menghitung **berapa baris yang kolom \`nilai\`-nya terisi**. Ini menjawab pertanyaan berbeda: *"berapa mahasiswa yang sudah dinilai?"*.

Selisih antara keduanya sebenarnya informasi berguna: \`COUNT(*) - COUNT(nilai)\` memberi tahu berapa yang belum dinilai.

Yang paling sering menjebak adalah **\`AVG\`**. Pembaginya adalah jumlah baris yang tidak NULL. Kalau 3 dari 10 mahasiswa belum dinilai, rata-ratanya dihitung dari 7 orang. Ini biasanya memang yang kamu mau — mahasiswa yang belum ujian tidak seharusnya menyeret rata-rata turun.

Tetapi kalau aturannya *"yang belum mengumpulkan dianggap nol"*, hasil \`AVG\` bawaan itu **salah** dan akan terlihat terlalu tinggi. Perbaikannya \`AVG(IFNULL(nilai_angka, 0))\`, yang memaksa NULL dibaca sebagai nol sehingga pembaginya kembali 10.

Perbedaan ini bukan soal teknis semata — ia menentukan angka yang muncul di rapor.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Satu baris untuk seluruh tabel\nSELECT COUNT(*), AVG(prod_price) FROM products;\n\n-- Satu baris PER KELOMPOK\nSELECT vend_id,\n       COUNT(*)        AS jumlah_produk,\n       AVG(prod_price) AS rata_harga\nFROM products\nGROUP BY vend_id;',
      penjelasan: `
\`GROUP BY\` mengubah pertanyaan dari *"berapa seluruhnya?"* menjadi *"berapa untuk masing-masing?"*.

Cara membayangkan kerjanya: mesin **memilah baris menjadi tumpukan** berdasarkan nilai \`vend_id\`, lalu menjalankan fungsi agregat **pada tiap tumpukan secara terpisah**. Hasil akhirnya satu baris per tumpukan.

Dari sini muncul aturan yang harus dipatuhi: **kolom di \`SELECT\` harus di-\`GROUP BY\`, atau berada dalam fungsi agregat.**

Perhatikan kenapa. Kalau kamu menulis:

\`SELECT vend_id, prod_name, COUNT(*) FROM products GROUP BY vend_id;\`

satu tumpukan \`vend_id\` bisa berisi lima produk dengan lima nama berbeda. Mesin harus menampilkan **satu** nama — tapi yang mana? Pertanyaannya sendiri tidak punya jawaban.

MySQL lama menjawabnya dengan memilih sembarang, yang berbahaya karena kuerinya terlihat berhasil padahal jawabannya asal. Sejak MySQL 5.7 dan MariaDB 10.x, mode \`ONLY_FULL_GROUP_BY\` menolaknya dengan pesan *"Expression #2 of SELECT list is not in GROUP BY clause"*.

Kalau kamu memang butuh satu nama contoh per kelompok, nyatakan secara tegas mana yang kamu mau: \`MAX(prod_name)\` atau \`MIN(prod_name)\`. Kalau kamu butuh **semua** namanya, yang kamu cari bukan \`GROUP BY\` melainkan daftar biasa, atau \`GROUP_CONCAT(prod_name)\` yang menggabungkannya menjadi satu teks.
`
    },
    {
      bahasa: 'sql',
      kode: '-- WHERE menyaring BARIS, sebelum dikelompokkan\n-- HAVING menyaring KELOMPOK, sesudah dikelompokkan\n\nSELECT cust_city, COUNT(*) AS jumlah\nFROM customers\nWHERE cust_email IS NOT NULL     -- buang baris tanpa email dulu\nGROUP BY cust_city\nHAVING COUNT(*) > 5              -- lalu buang kota yang sedikit\nORDER BY jumlah DESC;\n\n-- SALAH: agregat tidak boleh di WHERE\n-- SELECT cust_city FROM customers WHERE COUNT(*) > 5 GROUP BY cust_city;',
      penjelasan: `
Kueri ini memakai \`WHERE\` dan \`HAVING\` sekaligus, dan itu justru cara terbaik memahami bedanya.

Ikuti urutan pengerjaannya:

- **\`FROM customers\`** — ambil semua baris.
- **\`WHERE cust_email IS NOT NULL\`** — buang baris yang emailnya kosong. Ini terjadi **pada tingkat baris**, satu per satu, sebelum ada kelompok apa pun.
- **\`GROUP BY cust_city\`** — baris yang tersisa dipilah menjadi tumpukan per kota.
- **\`HAVING COUNT(*) > 5\`** — buang **tumpukan** yang isinya kurang dari enam. Ini terjadi **pada tingkat kelompok**.
- **\`ORDER BY jumlah DESC\`** — susun hasil akhirnya.

Sekarang jelas kenapa contoh terakhir salah. Saat \`WHERE\` berjalan, pengelompokan **belum terjadi**, jadi \`COUNT(*)\` tidak punya nilai — tidak ada tumpukan untuk dihitung. MySQL menolak dengan *"Invalid use of group function"*.

Perbedaan ini juga punya akibat pada kecepatan. **\`WHERE\` menyaring lebih awal**, sehingga baris yang tidak perlu tidak ikut dikelompokkan. Kalau syarat yang sama bisa ditulis di \`WHERE\` maupun \`HAVING\`, **selalu pilih \`WHERE\`** — pekerjaan pengelompokan jadi lebih ringan.

Contohnya, \`HAVING cust_city <> 'Solo'\` memberi hasil yang sama dengan \`WHERE cust_city <> 'Solo'\`, tetapi versi \`HAVING\` memaksa mesin mengelompokkan Solo lebih dulu baru membuangnya. Sia-sia.

Aturan sederhananya: **kalau syaratmu memuat fungsi agregat, pakai \`HAVING\`; kalau tidak, pakai \`WHERE\`.**
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Fungsi agregat & pengelompokan
-- ============================================

USE orderentry;

-- ---------- Agregat untuk seluruh tabel ----------
SELECT COUNT(*)         AS jumlah_produk,
       SUM(prod_price)  AS total_harga,
       AVG(prod_price)  AS rata_harga,
       MAX(prod_price)  AS termahal,
       MIN(prod_price)  AS termurah
FROM products;

-- ---------- Tiga bentuk COUNT ----------
SELECT COUNT(*)                 AS semua_baris,
       COUNT(cust_email)        AS punya_email,
       COUNT(DISTINCT cust_city) AS jumlah_kota
FROM customers;

-- ---------- Agregat per kelompok ----------
SELECT vend_id,
       COUNT(*)        AS jumlah_produk,
       AVG(prod_price) AS rata_harga
FROM products
GROUP BY vend_id
ORDER BY jumlah_produk DESC;

-- ---------- WHERE dan HAVING bersama ----------
SELECT cust_city, COUNT(*) AS jumlah
FROM customers
WHERE cust_email IS NOT NULL     -- saring baris dulu
GROUP BY cust_city
HAVING COUNT(*) > 1              -- lalu saring kelompok
ORDER BY jumlah DESC;

-- ---------- NULL dianggap nol ----------
SELECT AVG(nilai_angka)              AS rata_yang_sudah_dinilai,
       AVG(IFNULL(nilai_angka, 0))   AS rata_belum_dinilai_jadi_nol
FROM krs;

-- ---------- Mengelompokkan lebih dari satu kolom ----------
SELECT cust_city, cust_country, COUNT(*) AS jumlah
FROM customers
GROUP BY cust_city, cust_country;

-- ---------- Yang DITOLAK ----------
-- SELECT cust_city FROM customers WHERE COUNT(*) > 5 GROUP BY cust_city;
-- ERROR 1111: Invalid use of group function`
  },

  output: `MariaDB [orderentry]> SELECT COUNT(*) AS semua, COUNT(cust_email) AS punya_email
    -> FROM customers;
+-------+-------------+
| semua | punya_email |
+-------+-------------+
|    10 |           7 |
+-------+-------------+
1 row in set (0.001 sec)

MariaDB [orderentry]> SELECT vend_id, COUNT(*) AS jumlah, AVG(prod_price) AS rata
    -> FROM products GROUP BY vend_id;
+---------+--------+-----------+
| vend_id | jumlah | rata      |
+---------+--------+-----------+
|    1001 |      3 |  6.146667 |
|    1002 |      2 |  5.995000 |
|    1003 |      7 | 12.212857 |
+---------+--------+-----------+
3 rows in set (0.001 sec)

MariaDB [orderentry]> SELECT cust_city FROM customers WHERE COUNT(*) > 5 GROUP BY cust_city;
ERROR 1111 (HY000): Invalid use of group function`,

  kesalahanUmum: [
    {
      salah: 'Menaruh fungsi agregat di dalam WHERE, misalnya WHERE COUNT(*) > 5.',
      kenapa: 'WHERE berjalan sebelum pengelompokan, sehingga saat itu belum ada kelompok untuk dihitung dan COUNT tidak punya nilai. MySQL menolak dengan "Invalid use of group function". Kesalahan ini wajar terjadi karena secara bahasa "tampilkan kota yang jumlahnya lebih dari lima" terdengar seperti satu penyaringan saja.',
      benar: 'Pakai HAVING untuk syarat yang memuat agregat. WHERE hanya untuk syarat pada kolom biasa.'
    },
    {
      salah: 'Menampilkan kolom yang tidak ada di GROUP BY dan tidak dibungkus fungsi agregat.',
      kenapa: 'Satu kelompok bisa memuat banyak nilai berbeda untuk kolom itu, sehingga tidak jelas mana yang harus ditampilkan. MySQL lama diam-diam memilih sembarang nilai, sehingga kuerinya terlihat berhasil padahal jawabannya asal-asalan dan bisa berubah sewaktu-waktu. MySQL 5.7 ke atas menolaknya.',
      benar: 'Masukkan kolom itu ke GROUP BY, atau bungkus dengan MAX, MIN, atau GROUP_CONCAT sesuai maksudmu yang sebenarnya.'
    },
    {
      salah: 'Menyangka AVG membagi dengan jumlah seluruh baris.',
      kenapa: 'AVG mengabaikan NULL, jadi pembaginya hanya baris yang terisi. Pada tabel 10 baris dengan 3 NULL, rata-ratanya dihitung dari 7 nilai. Kalau aturan sebenarnya adalah "yang kosong dianggap nol", angka yang keluar akan terlihat jauh lebih tinggi daripada seharusnya, dan kesalahannya sulit terdeteksi karena hasilnya tetap masuk akal.',
      benar: 'Putuskan dulu maknanya. Kalau NULL berarti nol, pakai AVG(IFNULL(kolom, 0)). Kalau NULL berarti belum ada data, biarkan AVG bawaan.'
    },
    {
      salah: 'Memakai HAVING untuk syarat yang sebenarnya tidak memuat agregat.',
      kenapa: 'Hasilnya memang benar, tetapi mesin terpaksa mengelompokkan semua baris lebih dulu baru membuang sebagiannya. Pekerjaan pengelompokan yang sia-sia ini terasa nyata pada tabel besar, dan kuerinya bisa berkali lipat lebih lambat daripada versi WHERE.',
      benar: 'Saring sedini mungkin. Kalau syaratnya bisa ditulis di WHERE, tulis di WHERE. Sisakan HAVING hanya untuk syarat yang memuat COUNT, SUM, AVG, MAX, atau MIN.'
    },
    {
      salah: 'Mengira COUNT(*) dan COUNT(nama_kolom) selalu memberi angka yang sama.',
      kenapa: 'Keduanya sama hanya kalau kolom itu tidak pernah NULL. Begitu ada nilai kosong, COUNT(kolom) memberi angka lebih kecil. Pada laporan, selisih ini muncul sebagai persentase yang tidak pernah mencapai seratus tanpa penjelasan yang jelas.',
      benar: 'Pakai COUNT(*) kalau pertanyaannya "ada berapa baris". Pakai COUNT(kolom) kalau pertanyaannya "berapa yang terisi". Sadari keduanya menjawab hal berbeda.'
    }
  ],

  analogi: `Bayangkan setumpuk lembar jawaban ujian.

**Fungsi agregat tanpa \`GROUP BY\`** adalah menghitung seluruh tumpukan sekaligus: berapa lembar, berapa nilai tertinggi, berapa rata-ratanya. Satu tumpukan, satu jawaban.

**\`GROUP BY kelas\`** adalah **memilah lembar itu ke tumpukan-tumpukan kecil per kelas** lebih dulu, lalu menghitung tiap tumpukan sendiri-sendiri. Sepuluh kelas berarti sepuluh baris hasil.

Dari gambaran itu, aturan \`SELECT\` jadi masuk akal: kalau kamu sudah memilah per kelas, kamu boleh menyebut **nama kelasnya** (sama untuk seluruh tumpukan) atau **hasil hitungan tumpukan itu**. Tetapi kamu tidak bisa menyebut **nama satu siswa**, karena satu tumpukan berisi tiga puluh nama dan tidak ada alasan memilih salah satunya.

Untuk \`WHERE\` dan \`HAVING\`:

- **\`WHERE\`** adalah membuang lembar jawaban **sebelum** dipilah — misalnya buang semua yang tidak ada namanya.
- **\`HAVING\`** adalah membuang **tumpukan** sesudah dipilah — misalnya buang kelas yang isinya kurang dari lima lembar.

Kamu tidak bisa bertanya *"kelas ini isinya berapa lembar?"* saat lembarnya masih tercampur di satu tumpukan besar. Itulah sebabnya \`COUNT\` tidak boleh ada di \`WHERE\`.

Dan soal \`AVG\` dengan NULL: lembar yang **kosong tak dikerjakan** disisihkan dan tidak ikut dibagi. Kalau menurut aturan sekolah lembar kosong itu bernilai nol, kamu harus menuliskannya nol dulu — mesin tidak bisa menebak niatmu.`,

  latihan: [
    'Tampilkan jumlah produk, harga tertinggi, harga terendah, dan rata-rata harga dari tabel produk dalam satu kueri.',
    'Pada tabel berisi 10 baris yang 3 di antaranya kolom nilai bernilai NULL, tuliskan hasil COUNT(*), COUNT(nilai), dan jelaskan pembagi yang dipakai AVG(nilai).',
    'Tampilkan jumlah pelanggan per kota, hanya untuk kota yang punya lebih dari dua pelanggan, diurutkan dari yang terbanyak.',
    'Jelaskan kenapa kueri SELECT vend_id, prod_name, COUNT(*) FROM products GROUP BY vend_id; ditolak MySQL modern. Tuliskan dua cara memperbaikinya sesuai maksud yang berbeda.',
    'Sebuah kueri memakai HAVING cust_city = \'Solo\' padahal syarat itu tidak memuat agregat. Jelaskan kenapa hasilnya tetap benar tetapi kuerinya boros, lalu tuliskan versi yang lebih efisien.'
  ]
});

TOPICS.push({
  id: 'basdat-join',
  judul: 'JOIN — Menggabungkan Tabel',
  kategori: 'basis-data',
  tag: ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'ON'],
  ringkas: 'Menyatukan kembali tabel yang sengaja dipisah saat normalisasi.',

  fungsi: `**Menggabungkan data dari beberapa tabel menjadi satu hasil.**

Normalisasi memecah data ke banyak tabel. \`JOIN\` adalah cara menyatukannya kembali saat dibutuhkan.

Terpakai di:

- **Hampir setiap laporan** — nama mahasiswa ada di satu tabel, nilainya di tabel lain
- **Menampilkan data di aplikasi** — tabel dengan kolom dari tiga sumber
- **Mencari data yang TIDAK punya pasangan** — mahasiswa yang belum mengisi KRS, produk yang belum pernah terjual
- **Memeriksa integritas** — mencari baris yatim yang menunjuk induk yang sudah tidak ada

Yang paling sering salah dipahami: **perbedaan INNER dan LEFT JOIN**.

\`INNER JOIN\` hanya menampilkan yang **punya pasangan di kedua sisi**. Kalau kamu memakainya untuk laporan "semua mahasiswa dan nilainya", mahasiswa yang belum punya nilai **hilang dari laporan** — dan tidak ada yang memberitahumu.`,

  praktik: {
    tujuan: `Kamu bisa memilih jenis JOIN yang tepat, dan sudah melihat sendiri data yang hilang saat memakai INNER JOIN untuk kebutuhan yang menuntut LEFT JOIN.`,
    alat: [
      'DBMS apa pun',
      'Sedikitnya tiga tabel bertautan'
    ],
    langkah: [
      { judul: 'Siapkan data yang sengaja timpang',
        isi: `Pastikan datamu memuat:

- mahasiswa yang **punya** KRS
- mahasiswa yang **belum punya** KRS sama sekali
- mata kuliah yang **belum ada** peminatnya

Tanpa data timpang seperti ini, semua jenis JOIN memberi hasil sama dan kamu tidak akan melihat bedanya.` },
      { judul: 'Bandingkan INNER dan LEFT pada data yang sama',
        isi: `Jalankan keduanya dan **hitung jumlah barisnya**:

- \`SELECT ... FROM mahasiswa INNER JOIN krs ON ...\`
- \`SELECT ... FROM mahasiswa LEFT JOIN krs ON ...\`

Selisihnya adalah mahasiswa yang belum punya KRS. Mereka **hilang** pada yang pertama.

Bayangkan kalau ini laporan resmi untuk kaprodi.` },
      { judul: 'Pakai pola baku untuk mencari yang TIDAK punya pasangan',
        isi: `\`SELECT m.* FROM mahasiswa m LEFT JOIN krs k ON m.id = k.mahasiswa_id WHERE k.id IS NULL;\`

Bagian \`WHERE k.id IS NULL\` itulah kuncinya: setelah LEFT JOIN, baris tanpa pasangan punya kolom kanan bernilai NULL.

Pola ini terpakai untuk: mahasiswa tanpa KRS, produk tanpa penjualan, pengguna tanpa aktivitas, dan mencari baris yatim.` },
      { judul: 'Beri alias pada tiap tabel',
        isi: `\`FROM mahasiswa m JOIN krs k ON m.id = k.mahasiswa_id\`

Alias membuat kueri jauh lebih pendek dan **memaksa kamu menyebutkan asal tiap kolom**.

Menyebutkan asalnya wajib begitu ada dua tabel yang punya nama kolom sama — dan hampir selalu ada, karena banyak tabel punya kolom \`id\` dan \`nama\`.` },
      { judul: 'Gabungkan tiga tabel bertahap',
        isi: `Jangan tulis tiga JOIN sekaligus lalu bingung mencari salahnya.

Tulis dua tabel dulu, jalankan, periksa hasilnya. Lalu tambah satu, jalankan lagi.

Kalau jumlah barisnya tiba-tiba melonjak setelah menambah satu JOIN, biasanya syarat \`ON\`-nya kurang lengkap.` },
      { judul: 'Waspadai JOIN yang menggandakan baris',
        isi: `Kalau satu mahasiswa punya lima baris KRS, maka setelah JOIN namanya muncul **lima kali**.

Ini benar dan memang seharusnya begitu — tetapi kalau kamu lalu menjumlahkan sesuatu dari sisi mahasiswa, angkanya akan **terhitung lima kali**.

Ini penyebab laporan keuangan yang totalnya membengkak tanpa sebab yang jelas. Periksa selalu jumlah baris sebelum dan sesudah JOIN.` },
      { judul: 'Kenali CROSS JOIN dan kapan ia tidak disengaja',
        isi: `\`CROSS JOIN\` memasangkan **setiap** baris kiri dengan **setiap** baris kanan. Seratus kali seratus menjadi sepuluh ribu.

Ia jarang disengaja. Kalau hasil kuerimu tiba-tiba berjumlah ribuan padahal datanya ratusan, periksa apakah ada \`JOIN\` yang **lupa syarat \`ON\`**-nya.` }
    ],
    cek: [
      'INNER dan LEFT JOIN memberi jumlah baris yang berbeda pada datamu',
      `Kueri pencari mahasiswa tanpa KRS mengembalikan tepat mahasiswa yang memang belum punya KRS`,
      'Jumlah baris setelah JOIN tiga tabel sesuai dengan yang kamu perkirakan'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Normalisasi memecah data menjadi banyak tabel supaya tidak ada fakta yang berulang. **\`JOIN\` adalah cara menyatukannya kembali saat dibutuhkan.** Keduanya dua sisi dari satu rancangan yang sama.

**Empat jenis JOIN**

- **\`INNER JOIN\`** — hanya baris yang **cocok di kedua tabel**. Ini irisan. Kalau seorang pelanggan belum pernah memesan, ia tidak muncul.
- **\`LEFT JOIN\`** — **semua baris tabel kiri**, ditambah yang cocok dari kanan. Yang tidak punya pasangan diisi **NULL**.
- **\`RIGHT JOIN\`** — kebalikannya: semua baris tabel kanan.
- **\`FULL OUTER JOIN\`** — semua baris dari kedua sisi. **MySQL dan MariaDB tidak mendukungnya**, jadi harus ditiru dengan \`LEFT JOIN\` di-\`UNION\` dengan \`RIGHT JOIN\`.

Mana yang "kiri" dan mana yang "kanan"? **Kiri adalah tabel yang disebut di \`FROM\`, kanan adalah yang disebut sesudah \`JOIN\`.** Sesederhana urutan penulisan.

**Kapan memilih yang mana**

Pertanyaannya selalu sama: *"apakah baris yang tidak punya pasangan perlu ikut muncul?"*

- *"Tampilkan pesanan beserta nama pelanggannya"* → \`INNER JOIN\`. Pesanan tanpa pelanggan memang tidak seharusnya ada.
- *"Tampilkan semua pelanggan beserta jumlah pesanannya, termasuk yang belum pernah memesan"* → \`LEFT JOIN\`. Pelanggan tanpa pesanan tetap harus muncul, dengan jumlah nol.

Kalimat **"termasuk yang belum"** hampir selalu menandakan \`LEFT JOIN\`.

**\`ON\` menyebut syarat penggabungan**

\`ON k.nim = m.nim\` berarti *"pasangkan baris yang nilai \`nim\`-nya sama"*. Ini biasanya menyandingkan foreign key dengan primary key yang ditunjuknya.

**Alias tabel** seperti \`FROM krs k\` membuat kueri jauh lebih pendek, dan **wajib** kalau kedua tabel punya kolom bernama sama. Menulis \`nim\` saja ketika dua tabel sama-sama punya kolom \`nim\` akan ditolak dengan *"Column 'nim' in field list is ambiguous"*.

**Bahaya melupakan \`ON\`**

\`SELECT * FROM a, b;\` tanpa syarat penggabungan menghasilkan **CROSS JOIN**, yaitu setiap baris \`a\` dipasangkan dengan **setiap** baris \`b\`. Dua tabel berisi 1.000 baris menghasilkan **satu juta** baris. Ini disebut *cartesian product*, dan hampir selalu merupakan kecelakaan.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'SELECT o.order_num, c.cust_name\nFROM orders o\nINNER JOIN customers c ON o.cust_id = c.cust_id;\n\n-- Bentuk lama, hasilnya sama:\nSELECT o.order_num, c.cust_name\nFROM orders o, customers c\nWHERE o.cust_id = c.cust_id;',
      penjelasan: `
Dibedah bagian per bagian:

- **\`FROM orders o\`** — \`o\` adalah alias. Sejak titik ini, \`orders\` bisa disebut \`o\` saja.
- **\`INNER JOIN customers c\`** — tabel kedua, diberi alias \`c\`.
- **\`ON o.cust_id = c.cust_id\`** — syarat pasangannya: baris dipasangkan kalau nilai \`cust_id\`-nya sama.

**Kenapa alias hampir selalu dipakai?** Karena kedua tabel punya kolom bernama \`cust_id\`. Tanpa awalan, MySQL tidak tahu yang mana yang kamu maksud dan menjawab *"Column 'cust_id' in on clause is ambiguous"*. Alias juga memperpendek kueri secara drastis begitu tabelnya bertambah.

Dua bentuk di atas memberi hasil **persis sama**, dan MySQL mengoptimalkannya dengan cara yang sama pula. Tetapi bentuk pertama lebih dianjurkan karena dua alasan nyata:

- **Syarat penggabungan terpisah dari syarat penyaringan.** \`ON\` menjelaskan bagaimana tabel disambung, \`WHERE\` menjelaskan baris mana yang diinginkan. Saat kuerinya panjang, pemisahan ini sangat membantu dibaca.
- **Lupa \`ON\` langsung terlihat sebagai kesalahan sintaks**, sedangkan lupa \`WHERE\` pada bentuk lama menghasilkan cartesian product yang jalan diam-diam dan mengembalikan jutaan baris.

Kata \`INNER\` sendiri boleh dihilangkan — \`JOIN\` saja sudah berarti inner join. Tetapi menuliskannya membuat niatmu jelas, terutama di kueri yang juga memuat \`LEFT JOIN\`.
`
    },
    {
      bahasa: 'sql',
      kode: '-- INNER: hanya yang punya pasangan\nSELECT c.cust_name, o.order_num\nFROM customers c\nINNER JOIN orders o ON c.cust_id = o.cust_id;\n\n-- LEFT: semua pelanggan, termasuk yang belum pernah memesan\nSELECT c.cust_name, o.order_num\nFROM customers c\nLEFT JOIN orders o ON c.cust_id = o.cust_id;\n-- pelanggan tanpa pesanan -> order_num bernilai NULL',
      penjelasan: `
Bandingkan kedua hasil ini pada data yang sama, karena di situlah perbedaannya terasa.

Misalkan ada 10 pelanggan, tetapi hanya 7 yang pernah memesan.

- **\`INNER JOIN\`** memberi baris hanya untuk 7 pelanggan itu. Tiga sisanya **hilang tanpa jejak**. Ini yang kamu mau kalau pertanyaannya *"siapa saja yang pernah memesan"*.
- **\`LEFT JOIN\`** memberi baris untuk **kesepuluh** pelanggan. Tiga yang belum memesan tetap muncul, dengan \`order_num\` bernilai \`NULL\`.

Dari sini muncul kegunaan yang sangat praktis: **mencari baris yang tidak punya pasangan.**

\`SELECT c.cust_name FROM customers c LEFT JOIN orders o ON c.cust_id = o.cust_id WHERE o.order_num IS NULL;\`

Ini menjawab *"pelanggan mana yang belum pernah memesan sama sekali?"* — pertanyaan yang tidak bisa dijawab \`INNER JOIN\`, karena baris yang kamu cari justru yang dibuangnya.

**Jebakan besar \`LEFT JOIN\`**: menaruh syarat tabel kanan di \`WHERE\` akan **mengubahnya diam-diam menjadi \`INNER JOIN\`**.

\`LEFT JOIN orders o ON c.cust_id = o.cust_id WHERE o.order_date > '2024-01-01'\`

Pelanggan tanpa pesanan punya \`order_date\` bernilai NULL, dan \`NULL > '2024-01-01'\` tidak bernilai benar. Maka mereka tersaring keluar, dan sifat "left" itu lenyap.

Perbaikannya: **pindahkan syarat itu ke \`ON\`**, yaitu \`ON c.cust_id = o.cust_id AND o.order_date > '2024-01-01'\`. Syarat di \`ON\` ikut menentukan pasangan, syarat di \`WHERE\` menyaring hasil akhir — dan pada \`LEFT JOIN\` bedanya menentukan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- MySQL tidak punya FULL OUTER JOIN. Ditiru begini:\nSELECT c.cust_name, o.order_num\nFROM customers c LEFT JOIN orders o ON c.cust_id = o.cust_id\nUNION\nSELECT c.cust_name, o.order_num\nFROM customers c RIGHT JOIN orders o ON c.cust_id = o.cust_id;\n\n-- BAHAYA: lupa ON -> cartesian product\n-- SELECT * FROM customers, orders;   -- 10 x 1000 = 10.000 baris',
      penjelasan: `
**\`FULL OUTER JOIN\`** menampilkan semua baris dari kedua sisi: yang berpasangan, yang hanya ada di kiri, dan yang hanya ada di kanan. PostgreSQL, Oracle, dan SQL Server mendukungnya langsung. **MySQL dan MariaDB tidak.**

Cara menirunya adalah menggabungkan \`LEFT JOIN\` dan \`RIGHT JOIN\` dengan \`UNION\`. Yang membuatnya bekerja: **\`UNION\` otomatis membuang baris kembar**, sehingga baris yang berpasangan — dan karenanya muncul di kedua bagian — hanya tampil sekali.

Perhatikan bedanya dengan \`UNION ALL\`, yang **tidak** membuang kembar dan akan menggandakan setiap baris berpasangan. Untuk keperluan ini, \`UNION\` biasa yang benar.

Sekarang bagian yang berbahaya. **Cartesian product** terjadi kalau kamu menyebut dua tabel tanpa syarat penggabungan. Setiap baris tabel pertama dipasangkan dengan **setiap** baris tabel kedua.

Hitungannya perkalian: 10 pelanggan dikali 1.000 pesanan menghasilkan **10.000 baris**. Pada tabel yang masing-masing berisi 100.000 baris, hasilnya sepuluh miliar baris — cukup untuk menggantung server.

Gejalanya khas dan mudah dikenali: **kueri berjalan sangat lama, lalu mengembalikan jauh lebih banyak baris daripada isi kedua tabel digabung**, dengan data yang terlihat berulang-ulang dalam pola aneh. Kalau kamu melihat itu, periksa \`ON\` atau \`WHERE\`-nya.

Ada satu kegunaan sah untuk cross join, misalnya membuat semua kombinasi ukuran dan warna produk. Kalau memang itu maksudmu, tulis \`CROSS JOIN\` secara terang-terangan supaya pembaca berikutnya tahu itu disengaja.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- JOIN: menyatukan kembali tabel yang dipisah
-- ============================================

USE akademik;

-- ---------- INNER JOIN: hanya yang berpasangan ----------
SELECT m.nama, mk.nama_mk, k.nilai
FROM krs k
INNER JOIN mahasiswa   m  ON k.nim     = m.nim
INNER JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;

-- ---------- LEFT JOIN: semua mahasiswa, termasuk yang belum ambil KRS ----------
SELECT m.nama, COUNT(k.kode_mk) AS jumlah_mk
FROM mahasiswa m
LEFT JOIN krs k ON m.nim = k.nim
GROUP BY m.nim, m.nama;
-- mahasiswa tanpa KRS -> jumlah_mk = 0
-- (COUNT(k.kode_mk) mengabaikan NULL, jadi hasilnya 0 bukan 1)

-- ---------- Mencari yang TIDAK punya pasangan ----------
SELECT m.nama
FROM mahasiswa m
LEFT JOIN krs k ON m.nim = k.nim
WHERE k.nim IS NULL;              -- belum mengambil satu pun mata kuliah

-- ---------- Jebakan: syarat tabel kanan di WHERE ----------
-- SALAH -- LEFT JOIN berubah jadi INNER JOIN diam-diam
SELECT m.nama, k.nilai
FROM mahasiswa m
LEFT JOIN krs k ON m.nim = k.nim
WHERE k.nilai = 'A';

-- BENAR -- syaratnya ikut menentukan pasangan
SELECT m.nama, k.nilai
FROM mahasiswa m
LEFT JOIN krs k ON m.nim = k.nim AND k.nilai = 'A';

-- ---------- Meniru FULL OUTER JOIN ----------
SELECT m.nama, k.kode_mk
FROM mahasiswa m LEFT JOIN krs k ON m.nim = k.nim
UNION
SELECT m.nama, k.kode_mk
FROM mahasiswa m RIGHT JOIN krs k ON m.nim = k.nim;

-- ---------- JOIN bertingkat dengan agregat ----------
SELECT d.nama_dosen,
       COUNT(DISTINCT mk.kode_mk) AS jumlah_mk,
       COUNT(k.nim)               AS total_peserta
FROM dosen d
LEFT JOIN mata_kuliah mk ON d.kode_dosen = mk.kode_dosen
LEFT JOIN krs         k  ON mk.kode_mk   = k.kode_mk
GROUP BY d.kode_dosen, d.nama_dosen
ORDER BY total_peserta DESC;`
  },

  output: `MariaDB [akademik]> SELECT m.nama, COUNT(k.kode_mk) AS jumlah_mk
    -> FROM mahasiswa m LEFT JOIN krs k ON m.nim = k.nim
    -> GROUP BY m.nim, m.nama;
+--------+-----------+
| nama   | jumlah_mk |
+--------+-----------+
| Hafizh |         2 |
| Andi   |         1 |
| Citra  |         0 |
+--------+-----------+
3 rows in set (0.001 sec)

MariaDB [akademik]> SELECT m.nama FROM mahasiswa m
    -> LEFT JOIN krs k ON m.nim = k.nim WHERE k.nim IS NULL;
+-------+
| nama  |
+-------+
| Citra |
+-------+
1 row in set (0.000 sec)

MariaDB [akademik]> SELECT nim FROM mahasiswa m JOIN krs k ON m.nim = k.nim;
ERROR 1052 (23000): Column 'nim' in field list is ambiguous`,

  kesalahanUmum: [
    {
      salah: 'Menaruh syarat untuk tabel kanan di WHERE pada sebuah LEFT JOIN.',
      kenapa: 'Baris tanpa pasangan punya nilai NULL di kolom tabel kanan, dan perbandingan apa pun dengan NULL tidak menghasilkan benar. Baris itu ikut tersaring keluar, sehingga LEFT JOIN berubah menjadi INNER JOIN tanpa pesan apa pun. Gejalanya berupa hilangnya baris yang seharusnya muncul dengan nilai kosong.',
      benar: 'Pindahkan syarat itu ke klausa ON: LEFT JOIN krs k ON m.nim = k.nim AND k.nilai = \'A\'. Syarat di ON menentukan pasangan, syarat di WHERE menyaring hasil akhir.'
    },
    {
      salah: 'Menyebut dua tabel di FROM tanpa syarat penggabungan.',
      kenapa: 'Hasilnya cartesian product: setiap baris tabel pertama dipasangkan dengan setiap baris tabel kedua. Dua tabel berisi seribu baris menghasilkan satu juta baris. Kueri berjalan sangat lama dan hasilnya terlihat berulang dalam pola aneh, tanpa satu pun pesan kesalahan.',
      benar: 'Selalu pakai bentuk JOIN ... ON, sehingga lupa menulis syarat langsung terdeteksi sebagai kesalahan sintaks. Kalau memang butuh semua kombinasi, tulis CROSS JOIN secara terang-terangan.'
    },
    {
      salah: 'Memakai COUNT(*) pada LEFT JOIN untuk menghitung anak per induk.',
      kenapa: 'Induk yang tidak punya anak tetap menghasilkan satu baris berisi NULL, dan COUNT(*) menghitung baris itu sebagai satu. Hasilnya setiap induk minimal bernilai 1, sehingga yang seharusnya nol terlihat punya satu anak. Kesalahan ini sulit disadari karena angkanya tetap masuk akal.',
      benar: 'Pakai COUNT(kolom_dari_tabel_kanan), misalnya COUNT(k.kode_mk). Fungsi agregat mengabaikan NULL, sehingga induk tanpa anak benar-benar bernilai 0.'
    },
    {
      salah: 'Menyebut nama kolom tanpa awalan tabel ketika kedua tabel punya kolom bernama sama.',
      kenapa: 'MySQL tidak bisa menebak yang mana yang dimaksud dan menolak dengan "Column ... is ambiguous". Pada kueri panjang dengan empat atau lima tabel, menemukan kolom mana yang bermasalah memakan waktu karena pesannya tidak menyebutkan posisinya.',
      benar: 'Beri alias pada setiap tabel dan selalu awali nama kolom dengan aliasnya, misalnya m.nim dan k.nim. Biasakan sejak kueri masih sederhana.'
    },
    {
      salah: 'Memakai INNER JOIN untuk pertanyaan yang mengandung kata "termasuk yang belum".',
      kenapa: 'INNER JOIN membuang baris yang tidak punya pasangan, padahal justru baris itulah yang diminta. Laporan jadi hanya memuat pelanggan yang sudah pernah memesan, dan yang belum pernah lenyap dari daftar tanpa jejak, sehingga totalnya terlihat lebih kecil daripada kenyataan.',
      benar: 'Kalimat "termasuk yang belum" atau "semua, meski tidak punya" hampir selalu berarti LEFT JOIN. Tanyakan pada dirimu apakah baris tanpa pasangan perlu muncul.'
    }
  ],

  analogi: `Bayangkan dua daftar di atas meja: **daftar anggota klub** dan **daftar kehadiran rapat**.

**\`INNER JOIN\`** adalah mencocokkan keduanya dan hanya mencatat yang **ada di dua-duanya**. Anggota yang tidak pernah hadir tidak masuk catatan, dan tamu yang hadir tanpa jadi anggota juga tidak.

**\`LEFT JOIN\`** adalah mengambil **seluruh daftar anggota**, lalu di sebelah tiap nama dituliskan rapat yang dia hadiri. Anggota yang belum pernah hadir tetap tertulis, tetapi kolom rapatnya **dikosongkan** — itulah NULL.

Dari situ muncul trik yang sering dipakai: kalau kamu ingin tahu **siapa yang belum pernah hadir**, ambil daftar gabungan itu lalu saring yang kolom rapatnya kosong. Dengan \`INNER JOIN\` hal ini mustahil, karena nama-nama itu sudah dibuang sejak awal.

Sekarang jebakannya. Kamu bilang *"ambil semua anggota, dan tuliskan rapat bulan Juni yang dia hadiri"*. Kalau kamu menyaring "bulan Juni" **setelah** daftar gabungan jadi, anggota yang tidak hadir sama sekali ikut terbuang — kolom rapatnya kosong, dan kosong itu bukan bulan Juni. Padahal kamu memintanya tetap muncul. Syarat "bulan Juni" harus ikut dipertimbangkan **saat mencocokkan**, bukan sesudahnya.

Dan **cartesian product** adalah kalau kamu lupa mencocokkan sama sekali: setiap anggota dipasangkan dengan setiap rapat, termasuk rapat yang tidak pernah dia hadiri. Tiga puluh anggota dikali dua puluh rapat menghasilkan enam ratus baris omong kosong.`,

  latihan: [
    'Tampilkan nama mahasiswa beserta nama mata kuliah yang diambilnya, memakai INNER JOIN melalui tabel KRS.',
    'Tampilkan semua mahasiswa beserta jumlah mata kuliah yang diambil, termasuk yang belum mengambil satu pun. Jelaskan kenapa COUNT harus menyebut kolom dari tabel kanan, bukan COUNT(*).',
    'Tuliskan kueri untuk mencari pelanggan yang belum pernah memesan sama sekali. Jelaskan kenapa INNER JOIN tidak bisa menjawab pertanyaan ini.',
    'Diberikan kueri LEFT JOIN yang syarat tabel kanannya berada di WHERE. Jelaskan kenapa hasilnya sama dengan INNER JOIN, lalu perbaiki agar sifat LEFT-nya kembali.',
    'Jelaskan keempat jenis JOIN dengan menggambar dua lingkaran bertumpuk, dan tandai bagian mana yang diambil masing-masing. Sebutkan juga jenis mana yang tidak didukung MySQL dan bagaimana menirunya.'
  ]
});

TOPICS.push({
  id: 'basdat-view-trigger',
  judul: 'View & Trigger',
  kategori: 'basis-data',
  tag: ['view', 'trigger', 'tabel virtual', 'BEFORE INSERT', 'AFTER UPDATE'],
  ringkas: 'Tabel palsu yang menyembunyikan kueri rumit, dan perintah yang berjalan sendiri saat data berubah.',

  fungsi: `**Menyimpan kueri rumit sebagai nama, dan menjalankan aksi otomatis saat data berubah.**

**View** menyembunyikan kerumitan. Kueri tujuh JOIN yang dipakai di sepuluh tempat cukup ditulis sekali, lalu dipanggil seperti tabel biasa.

**Trigger** menjalankan sesuatu secara otomatis setiap kali data berubah.

Terpakai di:

- **Menyederhanakan laporan** — view untuk data mahasiswa lengkap beserta IPK-nya
- **Membatasi akses** — beri pengguna akses ke view tanpa kolom gaji, bukan ke tabelnya
- **Pencatatan otomatis** — trigger yang mencatat siapa mengubah apa dan kapan
- **Menjaga data turunan** tetap sinkron — memperbarui stok saat transaksi masuk
- **Basis Data II** — PL/SQL memperluas keduanya jauh lebih dalam

Peringatan yang perlu diketahui sejak awal: **trigger berjalan diam-diam**. Ketika data berubah tanpa ada kode aplikasi yang melakukannya, trigger adalah tempat pertama yang harus dicurigai — dan tempat terakhir yang biasanya orang periksa.`,

  praktik: {
    tujuan: `Kamu punya satu view yang menyederhanakan kueri rumit dan satu trigger pencatat perubahan, serta tahu kapan keduanya sebaiknya tidak dipakai.`,
    alat: [
      'MySQL atau PostgreSQL (SQLite mendukung view tetapi trigger-nya terbatas)'
    ],
    langkah: [
      { judul: 'Mulai dari kueri yang sudah benar',
        isi: `Ambil kueri berJOIN yang sudah kamu tulis dan sudah kamu pastikan hasilnya benar.

**Jangan membuat view dari kueri yang belum diuji.** Kesalahan di dalam view jauh lebih sulit dilacak karena ia tersembunyi di balik namanya.` },
      { judul: 'Bungkus jadi view',
        isi: `\`CREATE VIEW v_mahasiswa_lengkap AS SELECT ...;\`

Lalu pakai seperti tabel: \`SELECT * FROM v_mahasiswa_lengkap WHERE angkatan = 2024;\`

Beri awalan \`v_\` pada namanya supaya siapa pun langsung tahu itu view, bukan tabel.` },
      { judul: 'Sadari bahwa view tidak menyimpan data',
        isi: `View bawaan **dihitung ulang setiap kali dipanggil**. Ia menyederhanakan penulisan, **bukan** mempercepat.

Kalau kuerinya berat dan sering dipanggil, yang kamu butuhkan adalah **materialized view** — tersedia di PostgreSQL, dan harus disegarkan sendiri dengan \`REFRESH MATERIALIZED VIEW\`.

MySQL tidak punya itu; padanannya adalah tabel ringkasan yang kamu perbarui sendiri.` },
      { judul: 'Buat tabel pencatat lebih dulu',
        isi: `Sebelum menulis trigger, buat tabelnya:

- \`log_nilai(id, krs_id, nilai_lama, nilai_baru, diubah_oleh, diubah_pada)\`

Trigger yang mencatat ke tabel yang belum ada akan gagal, dan pesan galatnya sering membingungkan.` },
      { judul: 'Tulis trigger pencatat',
        isi: `Di MySQL:

- \`CREATE TRIGGER trg_log_nilai AFTER UPDATE ON krs FOR EACH ROW INSERT INTO log_nilai VALUES (NULL, OLD.id, OLD.nilai, NEW.nilai, USER(), NOW());\`

\`OLD\` berisi nilai sebelum perubahan, \`NEW\` sesudahnya. Keduanya hanya tersedia sesuai jenis triggernya — \`OLD\` tidak ada pada INSERT, \`NEW\` tidak ada pada DELETE.` },
      { judul: 'Uji dan lihat efek tersembunyinya',
        isi: `Jalankan \`UPDATE\` pada tabel krs, lalu periksa tabel log.

Perhatikan bahwa **kamu tidak menulis satu baris pun** untuk memasukkan data log itu. Itulah kekuatan trigger — dan sekaligus bahayanya.

Bayangkan orang lain yang membaca kodemu dan bingung dari mana baris log itu datang.` },
      { judul: 'Tulis daftar triggermu di dokumentasi',
        isi: `Karena trigger tidak terlihat di kode aplikasi, **catat semuanya** di satu tempat: nama, tabel, kapan berjalan, dan apa yang dilakukannya.

Untuk melihat yang sudah ada: \`SHOW TRIGGERS;\` di MySQL.

Tanpa catatan ini, trigger berubah dari alat menjadi jebakan bagi orang berikutnya — termasuk dirimu sendiri enam bulan lagi.` }
    ],
    cek: [
      'View-mu bisa dipakai dengan WHERE dan ORDER BY seperti tabel biasa',
      'Setelah UPDATE, tabel log terisi tanpa kamu menulis INSERT apa pun',
      'Kamu punya daftar tertulis semua trigger di basis datamu'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Dua fitur ini sama-sama berjalan di sisi basis data, bukan di aplikasi. Keduanya menghemat pengulangan, tetapi dengan cara yang berbeda.

**View — tabel virtual**

**\`View\` adalah kueri yang diberi nama.** Ia terlihat dan dipakai seperti tabel biasa, tetapi **tidak menyimpan data sendiri** — setiap kali dipanggil, kueri di baliknya dijalankan ulang terhadap tabel aslinya.

Tiga kegunaan utamanya:

- **Menyederhanakan kueri rumit.** \`JOIN\` empat tabel yang dipakai berulang kali cukup ditulis sekali, lalu dipanggil dengan nama pendek.
- **Membatasi akses data sensitif.** Kamu bisa memberi seseorang izin pada view berisi nama dan jabatan saja, tanpa memberinya akses ke tabel karyawan yang juga memuat gaji.
- **Menjaga kestabilan.** Kalau struktur tabel berubah, definisi view bisa disesuaikan sehingga kode yang memakainya tidak perlu diubah.

Karena tidak menyimpan data, view **selalu menampilkan data terkini**. Tetapi juga tidak mempercepat apa pun — kueri di baliknya tetap berjalan penuh setiap kali. (Yang menyimpan hasil sungguhan disebut *materialized view*, dan MySQL tidak memilikinya.)

View **bisa** dipakai untuk \`INSERT\` dan \`UPDATE\` dalam keadaan sederhana, tetapi menjadi *read-only* begitu memuat \`JOIN\`, \`GROUP BY\`, \`DISTINCT\`, atau fungsi agregat. Masuk akal: kalau satu baris view adalah hasil rata-rata sepuluh baris, tidak jelas baris mana yang harus diubah.

**Trigger — perintah yang berjalan sendiri**

**\`Trigger\` adalah blok perintah yang dijalankan otomatis ketika suatu peristiwa terjadi** pada sebuah tabel. Kamu tidak pernah memanggilnya; ia dipicu sendiri.

Waktu pemicunya ada dua, dikali tiga peristiwa, menghasilkan enam kombinasi:

- **\`BEFORE\`** atau **\`AFTER\`**
- **\`INSERT\`**, **\`UPDATE\`**, atau **\`DELETE\`**

Kegunaan yang lazim: memvalidasi atau membetulkan data sebelum masuk, mencatat log perubahan secara otomatis, dan memperbarui kolom ringkasan seperti stok.

Di dalam trigger tersedia dua kata khusus:

- **\`NEW\`** — nilai baru. Ada pada \`INSERT\` dan \`UPDATE\`.
- **\`OLD\`** — nilai lama. Ada pada \`UPDATE\` dan \`DELETE\`.

Pada trigger **\`BEFORE\`**, nilai \`NEW\` masih **boleh diubah** — inilah cara membetulkan data sebelum tersimpan. Pada trigger \`AFTER\`, datanya sudah masuk sehingga \`NEW\` hanya bisa dibaca.

**Trigger perlu dipakai dengan hati-hati**, karena ia bekerja tak terlihat. Orang yang menjalankan \`INSERT\` sederhana bisa memicu rentetan perubahan di tabel lain tanpa tahu. Saat mencari penyebab data aneh, trigger adalah tempat terakhir yang orang periksa.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'CREATE VIEW v_nilai_mahasiswa AS\nSELECT m.nim, m.nama, mk.nama_mk, k.nilai\nFROM krs k\nJOIN mahasiswa   m  ON k.nim     = m.nim\nJOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;\n\n-- Dipakai persis seperti tabel biasa\nSELECT * FROM v_nilai_mahasiswa WHERE nilai = \'A\';',
      penjelasan: `
Setelah view ini dibuat, \`JOIN\` tiga tabel di atas **tidak perlu ditulis lagi**. Siapa pun cukup menulis \`SELECT * FROM v_nilai_mahasiswa\`.

Yang perlu dipahami: **view tidak menyimpan hasilnya.** Saat kamu menjalankan \`SELECT ... WHERE nilai = 'A'\`, MySQL menggabungkan kueri view dengan syarat tambahanmu, lalu menjalankan seluruhnya terhadap tabel asli. Jadi ada dua akibat:

- **Datanya selalu terkini.** Baris yang baru dimasukkan ke \`krs\` sedetik lalu langsung terlihat di view.
- **Tidak ada percepatan sama sekali.** Kalau \`JOIN\`-nya lambat, memanggilnya lewat view tetap sama lambatnya. View adalah kemudahan menulis, bukan optimasi.

Awalan **\`v_\`** pada namanya cuma kebiasaan, tetapi kebiasaan yang berguna: saat membaca kueri orang lain, kamu langsung tahu itu view dan bukan tabel sungguhan, sehingga tidak heran kalau \`INSERT\` ke situ ditolak.

Soal bisa-tidaknya diubah: view ini memuat \`JOIN\`, jadi ia **read-only**. Mencoba \`INSERT INTO v_nilai_mahasiswa\` akan ditolak, karena MySQL tidak tahu satu baris view harus dibagi ke tabel mana saja.

Untuk mengubah definisinya, pakai \`CREATE OR REPLACE VIEW\`. Untuk menghapusnya, \`DROP VIEW\` — dan perhatikan bahwa ini **tidak menyentuh data asli** sama sekali, karena memang tidak ada data yang disimpan view.
`
    },
    {
      bahasa: 'sql',
      kode: 'DELIMITER $$\n\nCREATE TRIGGER trg_stok_berkurang\nAFTER INSERT ON detail_pesanan\nFOR EACH ROW\nBEGIN\n  UPDATE produk\n  SET stok = stok - NEW.jumlah\n  WHERE kode_produk = NEW.kode_produk;\nEND$$\n\nDELIMITER ;',
      penjelasan: `
Dibedah baris per baris, karena bentuknya asing bagi yang baru pertama melihat.

**\`DELIMITER $$\`** — ini bukan SQL, melainkan perintah untuk klien MySQL. Masalahnya: badan trigger memuat titik koma di dalamnya, dan klien biasanya menganggap titik koma sebagai akhir perintah. Ia akan memutus trigger di tengah. Dengan mengganti penanda akhir sementara menjadi \`$$\`, seluruh blok bisa dikirim utuh. Setelah selesai, \`DELIMITER ;\` mengembalikannya seperti semula. **Melupakan ini adalah kesalahan paling umum saat membuat trigger.**

**\`AFTER INSERT ON detail_pesanan\`** — pemicunya. Dipilih \`AFTER\` karena barisnya memang perlu benar-benar tersimpan dulu sebelum stok dikurangi.

**\`FOR EACH ROW\`** — trigger berjalan **sekali untuk setiap baris**, bukan sekali per perintah. Kalau kamu menyisipkan lima baris dalam satu \`INSERT\`, trigger ini berjalan lima kali. MySQL hanya mendukung bentuk per-baris ini.

**\`NEW.jumlah\`** dan **\`NEW.kode_produk\`** — nilai dari baris yang baru saja masuk. Untuk trigger \`DELETE\`, yang tersedia adalah \`OLD\`; untuk \`UPDATE\`, keduanya ada sehingga kamu bisa membandingkan nilai sebelum dan sesudah.

Yang membuat trigger ini berguna: **stok berkurang otomatis**, tanpa aplikasi perlu mengingatnya. Yang membuatnya berbahaya: kalau suatu hari stok terlihat aneh, orang akan memeriksa kode aplikasi berjam-jam sebelum terpikir bahwa ada trigger yang bekerja diam-diam.
`
    },
    {
      bahasa: 'sql',
      kode: 'DELIMITER $$\n\n-- BEFORE: nilai NEW masih boleh DIUBAH\nCREATE TRIGGER trg_rapikan_email\nBEFORE INSERT ON pelanggan\nFOR EACH ROW\nBEGIN\n  SET NEW.email = LOWER(TRIM(NEW.email));\nEND$$\n\nDELIMITER ;',
      penjelasan: `
Inilah perbedaan praktis antara \`BEFORE\` dan \`AFTER\`, dan kenapa memilih yang tepat itu penting.

Pada trigger **\`BEFORE\`**, barisnya **belum tersimpan**. Nilai \`NEW\` masih berupa rancangan yang bisa kamu ubah dengan \`SET NEW.kolom = ...\`. Apa pun yang kamu tulis di situlah yang akhirnya masuk ke tabel.

Trigger ini merapikan email sebelum tersimpan: \`TRIM\` membuang spasi di ujung, \`LOWER\` menyeragamkan ke huruf kecil. Jadi \`"  Hafizh@Mail.COM "\` masuk sebagai \`"hafizh@mail.com"\`. Nilainya konsisten tanpa aplikasi perlu memikirkannya, dan kolom \`UNIQUE\` pada email jadi benar-benar bekerja — tanpa ini, \`"A@mail.com"\` dan \`"a@mail.com"\` akan dianggap dua nilai berbeda.

Pada trigger **\`AFTER\`**, barisnya **sudah tersimpan**. \`SET NEW.kolom\` di situ akan **ditolak** dengan pesan bahwa \`NEW\` tidak bisa diubah pada trigger after. Yang bisa dilakukan hanya membaca nilainya dan bertindak di tempat lain, seperti contoh stok sebelumnya.

Aturan memilihnya sederhana:

- Mau **memeriksa atau membetulkan** data yang masuk → **\`BEFORE\`**.
- Mau **bereaksi** terhadap data yang sudah masuk, misalnya mencatat log atau memperbarui tabel lain → **\`AFTER\`**.

Untuk menolak data yang tidak sah, cara bakunya adalah memicu kesalahan dengan \`SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'pesanmu'\` di dalam trigger \`BEFORE\`. Seluruh perintah \`INSERT\` akan dibatalkan.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- View & Trigger
-- ============================================

USE akademik;

-- ---------- VIEW: menyembunyikan JOIN yang rumit ----------
CREATE OR REPLACE VIEW v_nilai_mahasiswa AS
SELECT m.nim, m.nama, mk.nama_mk, mk.sks, k.nilai
FROM krs k
JOIN mahasiswa   m  ON k.nim     = m.nim
JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;

SELECT * FROM v_nilai_mahasiswa WHERE nilai = 'A';
SELECT nama, COUNT(*) FROM v_nilai_mahasiswa GROUP BY nama;

-- ---------- VIEW: menyembunyikan kolom sensitif ----------
CREATE VIEW v_karyawan_publik AS
SELECT nip, nama, jabatan          -- kolom gaji sengaja tidak ikut
FROM karyawan;

SHOW CREATE VIEW v_nilai_mahasiswa;
DROP VIEW IF EXISTS v_karyawan_publik;     -- data asli tidak tersentuh

-- ---------- TRIGGER: merapikan data sebelum masuk ----------
DELIMITER $$

CREATE TRIGGER trg_rapikan_email
BEFORE INSERT ON pelanggan
FOR EACH ROW
BEGIN
  SET NEW.email = LOWER(TRIM(NEW.email));
END$$

-- ---------- TRIGGER: menolak data tidak sah ----------
CREATE TRIGGER trg_cek_sks
BEFORE INSERT ON mata_kuliah
FOR EACH ROW
BEGIN
  IF NEW.sks <= 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'SKS harus lebih besar dari nol';
  END IF;
END$$

-- ---------- TRIGGER: mencatat log perubahan ----------
CREATE TRIGGER trg_log_nilai
AFTER UPDATE ON krs
FOR EACH ROW
BEGIN
  IF OLD.nilai <> NEW.nilai THEN
    INSERT INTO log_nilai (nim, kode_mk, nilai_lama, nilai_baru, waktu)
    VALUES (OLD.nim, OLD.kode_mk, OLD.nilai, NEW.nilai, NOW());
  END IF;
END$$

DELIMITER ;

-- ---------- Memeriksa dan menghapus trigger ----------
SHOW TRIGGERS;
DROP TRIGGER IF EXISTS trg_log_nilai;`
  },

  output: `MariaDB [akademik]> SELECT * FROM v_nilai_mahasiswa WHERE nilai = 'A';
+-----------+--------+------------+-----+-------+
| nim       | nama   | nama_mk    | sks | nilai |
+-----------+--------+------------+-----+-------+
| H1D024061 | Hafizh | Basis Data |   3 | A     |
+-----------+--------+------------+-----+-------+
1 row in set (0.001 sec)

MariaDB [akademik]> INSERT INTO pelanggan (nama, email)
    -> VALUES ('Hafizh', '  Hafizh@Mail.COM ');
Query OK, 1 row affected (0.005 sec)

MariaDB [akademik]> SELECT email FROM pelanggan;
+------------------+
| email            |
+------------------+
| hafizh@mail.com  |
+------------------+
1 row in set (0.000 sec)

MariaDB [akademik]> INSERT INTO mata_kuliah VALUES ('MK009', 'Uji Coba', 0, NULL);
ERROR 1644 (45000): SKS harus lebih besar dari nol

MariaDB [akademik]> INSERT INTO v_nilai_mahasiswa VALUES (...);
ERROR 1394 (HY000): Can not insert into join view 'akademik.v_nilai_mahasiswa'
without fields list`,

  kesalahanUmum: [
    {
      salah: 'Membuat trigger tanpa mengubah DELIMITER lebih dulu.',
      kenapa: 'Klien MySQL menganggap titik koma pertama di dalam badan trigger sebagai akhir perintah, lalu mengirim potongan yang belum lengkap ke server. Errornya berupa keluhan sintaks di dekat END, yang membingungkan karena bagian itu terlihat baik-baik saja. Penyebabnya berada beberapa baris sebelumnya.',
      benar: 'Bungkus dengan DELIMITER $$ sebelum CREATE TRIGGER, akhiri badan trigger dengan END$$, lalu kembalikan dengan DELIMITER ; sesudahnya.'
    },
    {
      salah: 'Mencoba mengubah nilai NEW di dalam trigger AFTER.',
      kenapa: 'Pada trigger AFTER, barisnya sudah tersimpan sehingga NEW hanya bisa dibaca. MySQL menolak dengan pesan bahwa NEW tidak bisa diubah pada trigger after. Kekeliruan ini muncul karena BEFORE dan AFTER terlihat cuma soal waktu, padahal keduanya menentukan apakah data masih bisa disentuh.',
      benar: 'Pakai BEFORE kalau tujuanmu memeriksa atau membetulkan data yang masuk. Sisakan AFTER untuk bereaksi, seperti menulis log atau memperbarui tabel lain.'
    },
    {
      salah: 'Mengira view menyimpan data sehingga bisa mempercepat kueri yang berat.',
      kenapa: 'View hanya menyimpan definisi kuerinya, bukan hasilnya. Setiap pemanggilan menjalankan ulang seluruh kueri terhadap tabel asli, jadi JOIN yang lambat tetap sama lambatnya. Harapan yang keliru ini membuat orang membungkus kueri berat dengan view lalu heran kenapa tidak ada perbaikan.',
      benar: 'Pakai view untuk kerapian dan pembatasan akses. Untuk mempercepat, benahi indeksnya, atau simpan hasilnya sendiri ke tabel ringkasan yang diperbarui berkala.'
    },
    {
      salah: 'Mencoba INSERT atau UPDATE ke view yang memuat JOIN atau GROUP BY.',
      kenapa: 'MySQL tidak bisa menentukan tabel asal mana yang harus diubah, apalagi kalau satu baris view berasal dari beberapa baris tabel yang diringkas. Penolakannya berbunyi "Can not insert into join view", yang sering tidak terduga karena view itu tampak persis seperti tabel biasa saat dibaca.',
      benar: 'Ubah data langsung di tabel aslinya. Sadari sejak awal bahwa view yang memuat JOIN, GROUP BY, DISTINCT, atau agregat bersifat baca saja.'
    },
    {
      salah: 'Menaruh terlalu banyak logika penting di dalam trigger.',
      kenapa: 'Trigger bekerja tanpa terlihat di kode aplikasi. Orang yang menjalankan INSERT sederhana bisa memicu rentetan perubahan di beberapa tabel tanpa tahu. Saat data terlihat aneh, trigger adalah tempat terakhir yang diperiksa, sehingga pelacakan kesalahan bisa memakan waktu berjam-jam.',
      benar: 'Batasi trigger untuk hal yang benar-benar harus terjamin di tingkat basis data, seperti jejak audit. Letakkan aturan bisnis yang rumit di aplikasi, di mana ia bisa dibaca, diuji, dan dilacak.'
    }
  ],

  analogi: `**View** adalah jendela di dinding gudang.

Gudangnya memuat segala macam barang. Kamu memasang jendela kecil yang hanya memperlihatkan rak tertentu, lalu memberi nama jendela itu "Rak Barang Laris". Siapa pun bisa melihat lewat jendela itu tanpa perlu tahu isi gudang seluruhnya, dan tanpa bisa menyentuh rak yang tidak terlihat.

Yang penting dipahami: **jendela tidak menyimpan barang.** Kalau ada yang menambah barang ke rak itu, jendela langsung memperlihatkannya. Dan kalau raknya jauh di ujung gudang sehingga melihatnya butuh berjalan lama, memasang jendela tidak membuatnya jadi lebih dekat.

**Trigger** adalah alarm yang dipasang di pintu.

Kamu tidak pernah menekan tombolnya. Ia berbunyi sendiri setiap kali pintu dibuka. Kamu bisa memasangnya **sebelum** pintu terbuka — untuk memeriksa dulu apakah orangnya boleh masuk, atau merapikan bawaannya — atau **sesudah** pintu terbuka, untuk mencatat siapa yang tadi lewat.

Kegunaannya jelas: tidak ada yang bisa lupa. Tetapi bahayanya juga jelas. Kalau suatu hari ada barang yang berpindah sendiri, orang akan menyalahkan petugas gudang berhari-hari sebelum ada yang ingat bahwa dulu pernah dipasang alarm yang ikut memindahkan barang. **Yang bekerja diam-diam juga sulit dicurigai.**`,

  latihan: [
    'Buat view yang menampilkan nama mahasiswa, nama mata kuliah, dan nilainya. Panggil view itu untuk mencari semua yang bernilai A, lalu jelaskan kenapa datanya selalu terkini.',
    'Buat view yang menyembunyikan kolom gaji dari tabel karyawan. Jelaskan bagaimana view ini bisa dipakai bersama GRANT untuk membatasi akses seorang pegawai.',
    'Jelaskan fungsi DELIMITER saat membuat trigger, dan tuliskan apa yang terjadi kalau perintah itu dilewatkan.',
    'Buat trigger BEFORE INSERT yang menolak penyisipan mata kuliah dengan SKS kurang dari satu, memakai SIGNAL. Uji dengan data yang sah dan yang tidak sah.',
    'Buat trigger AFTER UPDATE pada tabel KRS yang mencatat perubahan nilai ke tabel log, lengkap dengan nilai lama dan baru. Jelaskan kenapa OLD dan NEW keduanya tersedia di sini tetapi tidak pada trigger INSERT.'
  ]
});

TOPICS.push({
  id: 'basdat-dcl',
  judul: 'DCL — GRANT & REVOKE',
  kategori: 'basis-data',
  tag: ['DCL', 'GRANT', 'REVOKE', 'hak akses', 'privilege', 'keamanan'],
  ringkas: 'Menentukan siapa boleh melakukan apa — dan kenapa aplikasi tidak boleh memakai root.',

  fungsi: `**Mengatur siapa boleh melakukan apa pada basis data.**

Selama belajar, semua orang memakai akun \`root\` dan semuanya berjalan. Kebiasaan itu berbahaya, dan sulit dihilangkan kalau tidak dilatih sejak awal.

Terpakai di:

- **Aplikasi web** — akun aplikasi seharusnya **tidak boleh** menghapus tabel
- **Kerja kelompok** — tiap anggota punya akun sendiri, sehingga jejaknya terlacak
- **Kerja praktik dan magang** — kamu akan diberi akun terbatas, dan harus tahu kenapa
- **Membatasi kerusakan** — kalau aplikasimu diretas, penyerang hanya mendapat sebesar hak akun itu

Prinsipnya bernama **hak paling kecil**: beri hanya yang benar-benar dibutuhkan.

Bedanya nyata. Kalau aplikasimu memakai akun \`root\` dan ada celah SQL injection, penyerang bisa **menghapus seluruh basis data**. Kalau akunnya hanya boleh \`SELECT\` dan \`INSERT\` pada tiga tabel, kerusakannya terbatas pada itu.`,

  praktik: {
    tujuan: `Aplikasimu berjalan memakai akun terbatas, bukan root, dan kamu sudah membuktikan sendiri bahwa akun itu ditolak saat mencoba hal yang tidak diizinkan.`,
    alat: [
      'MySQL atau PostgreSQL',
      'Akses administrator untuk membuat akun'
    ],
    langkah: [
      { judul: 'Daftar dulu apa yang benar-benar dibutuhkan aplikasimu',
        isi: `Telusuri kodemu dan catat: tabel apa saja yang disentuh, dan operasi apa saja pada masing-masing.

Sebagian besar aplikasi hanya butuh \`SELECT\`, \`INSERT\`, dan \`UPDATE\` pada beberapa tabel. Hampir tidak ada yang butuh \`DROP\` atau \`CREATE\` saat berjalan.

Daftar ini yang menjadi dasar pemberian haknya.` },
      { judul: 'Buat akun khusus aplikasi',
        isi: `- \`CREATE USER 'app_kampus'@'localhost' IDENTIFIED BY 'sandi_kuat_dan_panjang';\`

Satu akun per aplikasi, bukan satu akun dipakai semua. Kalau salah satu bocor, yang lain tidak ikut.

Untuk PostgreSQL: \`CREATE ROLE app_kampus LOGIN PASSWORD '...';\`` },
      { judul: 'Beri hak sesempit mungkin',
        isi: `Jangan \`GRANT ALL\`. Sebutkan satu per satu:

- \`GRANT SELECT, INSERT, UPDATE ON kampus.mahasiswa TO 'app_kampus'@'localhost';\`
- \`GRANT SELECT ON kampus.matakuliah TO 'app_kampus'@'localhost';\`

Perhatikan bahwa mata kuliah hanya boleh dibaca — aplikasi tidak perlu mengubahnya.

Lalu \`FLUSH PRIVILEGES;\` di MySQL.` },
      { judul: 'Buktikan batasannya bekerja',
        isi: `Masuk sebagai akun baru itu, lalu coba hal-hal yang **seharusnya ditolak**:

- \`DROP TABLE mahasiswa;\`
- \`DELETE FROM mahasiswa;\`
- \`SELECT * FROM tabel_lain_yang_tidak_diberi_hak;\`

Ketiganya harus ditolak. Kalau ada yang lolos, hakmu terlalu longgar.

**Langkah ini yang paling sering dilewatkan**, dan tanpanya kamu tidak benar-benar tahu apakah pembatasanmu bekerja.` },
      { judul: 'Ganti kredensial di aplikasimu',
        isi: `Ubah berkas konfigurasi aplikasi dari \`root\` menjadi akun baru, lalu jalankan **seluruh** fiturnya.

Kalau ada yang gagal, itu berarti aplikasimu memakai hak yang belum kamu berikan — dan sekarang kamu tahu persis apa saja yang sebenarnya dipakainya.

Tambahkan haknya satu per satu sesuai kebutuhan, jangan langsung \`GRANT ALL\` begitu ada yang gagal.` },
      { judul: 'Jangan simpan sandi di dalam kode',
        isi: `Taruh di berkas \`.env\` yang **tidak dimasukkan ke Git**, dan tambahkan \`.env\` ke \`.gitignore\`.

Sandi basis data yang ikut terunggah ke repositori publik adalah salah satu kebocoran yang paling sering terjadi — dan pemindai otomatis menemukannya dalam hitungan menit.

Simpan \`.env.contoh\` berisi nama variabelnya saja, tanpa nilainya, supaya orang lain tahu apa yang perlu diisi.` },
      { judul: 'Periksa hak yang sudah diberikan',
        isi: `- MySQL: \`SHOW GRANTS FOR 'app_kampus'@'localhost';\`
- PostgreSQL: \`\\dp\` di psql

Periksa berkala, terutama setelah beberapa bulan pengembangan — hak sering bertambah diam-diam saat orang menambal masalah dengan \`GRANT\` tanpa mencatatnya.

Cabut yang tidak perlu dengan \`REVOKE\`.` }
    ],
    cek: [
      'Akun aplikasimu ditolak saat mencoba DROP TABLE',
      'Seluruh fitur aplikasi tetap berjalan memakai akun terbatas itu',
      'Berkas .env tidak muncul di hasil git status maupun di riwayat commit'
    ]
  },

  konsep: `
**DCL** (*Data Control Language*) mengurus **hak akses**. Hanya ada dua perintah utama, tetapi keduanya menentukan seberapa besar kerusakan yang mungkin terjadi kalau ada yang salah.

- **\`GRANT\`** — memberikan izin.
- **\`REVOKE\`** — mencabut izin yang sudah diberikan.

**Bentuk dasarnya**

\`GRANT hak ON objek TO pengguna;\`

Contoh: \`GRANT SELECT ON mahasiswa TO 'budi'@'localhost';\`

Dibaca: *"beri Budi izin membaca tabel mahasiswa"*. Perhatikan tiga bagiannya — **hak apa**, **pada objek mana**, **untuk siapa**.

**Hak yang sering dipakai**

- **\`SELECT\`** — membaca
- **\`INSERT\`**, **\`UPDATE\`**, **\`DELETE\`** — mengubah isi
- **\`CREATE\`**, **\`DROP\`**, **\`ALTER\`** — mengubah struktur
- **\`ALL PRIVILEGES\`** — semuanya

**Cakupan objeknya bertingkat**

- \`*.*\` — seluruh server
- \`toko.*\` — seluruh tabel di basis data \`toko\`
- \`toko.produk\` — satu tabel saja
- \`toko.produk(nama, harga)\` — bahkan bisa sampai tingkat kolom

**Pengguna ditulis dua bagian**

\`'budi'@'localhost'\` berarti pengguna \`budi\` yang **menyambung dari komputer ini saja**. \`'budi'@'%'\` berarti dari mana saja. Ini sering mengejutkan: \`'budi'@'localhost'\` dan \`'budi'@'%'\` adalah **dua pengguna berbeda** dengan hak masing-masing.

**Prinsip hak paling sedikit**

Aturan pokok keamanan basis data: **berikan hak sesedikit mungkin, secukupnya untuk bekerja.**

Aplikasi web yang hanya menampilkan katalog cukup diberi \`SELECT\`. Kalau suatu hari ada celah SQL injection, penyerang paling jauh hanya bisa membaca — tidak bisa menghapus tabel. Kalau aplikasi itu memakai \`root\`, satu celah kecil berarti seluruh basis data bisa lenyap.

Inilah sebabnya **aplikasi tidak boleh memakai \`root\`**, sekalipun terasa lebih praktis saat mengembangkan.

**\`FLUSH PRIVILEGES\`**

Perintah ini memaksa MySQL membaca ulang tabel hak akses. Ia **hanya perlu** kalau kamu mengubah tabel \`mysql.user\` secara langsung dengan \`UPDATE\`. Setelah \`GRANT\` atau \`REVOKE\` biasa, perubahannya sudah langsung berlaku — kebiasaan menuliskannya setiap kali sebenarnya berlebihan, meski tidak berbahaya.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- Buat penggunanya lebih dulu\nCREATE USER \'budi\'@\'localhost\' IDENTIFIED BY \'sandi_kuat_di_sini\';\n\n-- Beri hak secukupnya\nGRANT SELECT ON toko.produk TO \'budi\'@\'localhost\';\nGRANT SELECT, INSERT, UPDATE ON toko.pesanan TO \'budi\'@\'localhost\';\n\n-- Periksa hasilnya\nSHOW GRANTS FOR \'budi\'@\'localhost\';',
      penjelasan: `
Perhatikan urutannya: **pengguna dibuat dulu, baru diberi hak.** Pada MySQL versi lama, \`GRANT\` bisa sekaligus membuat pengguna baru, tetapi kebiasaan itu sudah dihapus sejak MySQL 8.0 karena rawan — salah ketik nama pengguna diam-diam membuat akun baru alih-alih memberi error.

**\`IDENTIFIED BY\`** menetapkan sandi. Sandinya disimpan sebagai *hash*, bukan teks asli, sehingga administrator pun tidak bisa membacanya kembali.

Sekarang bagian yang sering disalahpahami: **\`'budi'@'localhost'\`**.

Bagian setelah \`@\` disebut **host**, dan ia bagian dari identitas pengguna — bukan keterangan tambahan. Akibatnya:

- \`'budi'@'localhost'\` hanya bisa masuk dari komputer server itu sendiri.
- \`'budi'@'%'\` bisa masuk dari alamat mana pun.
- Keduanya adalah **dua akun terpisah**. Memberi hak pada yang satu tidak memengaruhi yang lain.

Ini penyebab kebingungan klasik: kamu memberi hak pada \`'budi'@'localhost'\`, lalu Budi mencoba menyambung dari laptopnya dan ditolak *"Access denied"*. Bukan sandinya yang salah — akun yang dipakainya memang berbeda.

Perhatikan juga hak yang diberikan **berbeda per tabel**: hanya membaca pada \`produk\`, tetapi boleh menulis pada \`pesanan\`. Inilah wujud nyata prinsip hak paling sedikit — Budi bisa menerima pesanan, tetapi tidak bisa mengubah daftar harga.

**\`SHOW GRANTS\`** layak dijalankan setelah setiap perubahan, karena ia menampilkan keadaan sesungguhnya, bukan yang kamu kira sudah kamu berikan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Mencabut sebagian\nREVOKE INSERT, UPDATE ON toko.pesanan FROM \'budi\'@\'localhost\';\n\n-- Mencabut semuanya\nREVOKE ALL PRIVILEGES ON toko.* FROM \'budi\'@\'localhost\';\n\n-- Menghapus penggunanya sekalian\nDROP USER \'budi\'@\'localhost\';',
      penjelasan: `
\`REVOKE\` adalah kebalikan \`GRANT\`, dan bentuknya sengaja dibuat mirip — bedanya cuma \`TO\` menjadi **\`FROM\`**.

Yang perlu diperhatikan: **\`REVOKE\` harus mencocokkan tingkat pemberiannya.** Kalau hak diberikan pada tingkat basis data dengan \`GRANT SELECT ON toko.*\`, mencabutnya dengan \`REVOKE SELECT ON toko.produk\` **tidak akan berhasil**. MySQL menolak dengan *"There is no such grant defined for user"*, karena pada tingkat tabel memang tidak pernah ada pemberian.

Karena itu **\`SHOW GRANTS\` sebaiknya dijalankan sebelum mencabut**, untuk melihat pada tingkat mana haknya sebenarnya diberikan.

Perbedaan penting antara **\`REVOKE ALL\`** dan **\`DROP USER\`**:

- \`REVOKE ALL\` mencabut semua hak, tetapi **akunnya masih ada** dan **masih bisa masuk** — hanya saja tidak bisa melihat apa-apa. Ini berguna untuk menonaktifkan sementara.
- \`DROP USER\` menghapus akunnya sama sekali.

Satu hal yang sering mengejutkan: **mencabut hak tidak memutus sesi yang sedang berjalan.** Kalau Budi sedang tersambung saat haknya dicabut, sebagian hak baru berlaku setelah ia menyambung ulang. Untuk memutusnya segera, gunakan \`KILL\` pada koneksinya.

Terakhir, hati-hati dengan \`WITH GRANT OPTION\` pada \`GRANT\`. Imbuhan itu memberi seseorang izin untuk **membagikan haknya kepada orang lain**, dan hak yang sudah terlanjur disebarkan tidak ikut tercabut otomatis saat kamu mencabut haknya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- DCL: mengatur siapa boleh apa
-- ============================================

-- ---------- Membuat pengguna ----------
CREATE USER 'app_baca'@'localhost'  IDENTIFIED BY 'sandi_kuat_1';
CREATE USER 'app_tulis'@'localhost' IDENTIFIED BY 'sandi_kuat_2';
CREATE USER 'admin_toko'@'%'        IDENTIFIED BY 'sandi_kuat_3';

-- ---------- Hak paling sedikit, sesuai tugasnya ----------

-- Akun untuk halaman katalog: cuma boleh membaca
GRANT SELECT ON toko.produk TO 'app_baca'@'localhost';

-- Akun untuk pemrosesan pesanan: boleh menulis pesanan,
-- tapi tetap hanya membaca produk
GRANT SELECT                 ON toko.produk  TO 'app_tulis'@'localhost';
GRANT SELECT, INSERT, UPDATE ON toko.pesanan TO 'app_tulis'@'localhost';

-- Akun pengelola: seluruh basis data toko, tapi bukan server
GRANT ALL PRIVILEGES ON toko.* TO 'admin_toko'@'%';

-- ---------- Hak sampai tingkat kolom ----------
GRANT SELECT (nip, nama, jabatan) ON hrd.karyawan TO 'app_baca'@'localhost';
-- kolom gaji tidak ikut terbaca

-- ---------- Memeriksa ----------
SHOW GRANTS FOR 'app_tulis'@'localhost';
SELECT user, host FROM mysql.user;

-- ---------- Mencabut ----------
REVOKE INSERT, UPDATE ON toko.pesanan FROM 'app_tulis'@'localhost';
REVOKE ALL PRIVILEGES ON toko.* FROM 'admin_toko'@'%';

-- ---------- Menghapus pengguna ----------
DROP USER IF EXISTS 'admin_toko'@'%';

-- ---------- Hanya perlu setelah mengubah mysql.user langsung ----------
FLUSH PRIVILEGES;`,

    python: String.raw`# Kenapa hak paling sedikit itu penting:
# contoh celah SQL injection yang klasik

import mysql.connector

# ---------- SALAH: menyambung sebagai root ----------
db = mysql.connector.connect(
    host="localhost", user="root", password="", database="toko"
)

# ---------- SALAH: menyambung string mentah ke kueri ----------
def cari_produk_rawan(nama):
    cur = db.cursor()
    cur.execute("SELECT * FROM produk WHERE nama = '" + nama + "'")
    return cur.fetchall()

# Kalau nama berisi:  ' OR '1'='1
# kuerinya jadi:      SELECT * FROM produk WHERE nama = '' OR '1'='1'
# -> seluruh isi tabel terbaca
#
# Kalau nama berisi:  '; DROP TABLE produk; --
# dan akunnya root    -> tabelnya benar-benar hilang
# dan akunnya SELECT saja -> serangan gagal, izin ditolak

# ---------- BENAR: akun terbatas + kueri berparameter ----------
db_aman = mysql.connector.connect(
    host="localhost", user="app_baca", password="sandi_kuat_1", database="toko"
)

def cari_produk(nama):
    cur = db_aman.cursor()
    cur.execute("SELECT * FROM produk WHERE nama = %s", (nama,))
    return cur.fetchall()

# Dua lapis pertahanan yang saling melengkapi:
# 1. Kueri berparameter -> nilainya tidak pernah dibaca sebagai perintah
# 2. Hak paling sedikit  -> kalaupun lapis pertama jebol, kerusakan terbatas`
  },

  output: `MariaDB [(none)]> GRANT SELECT ON toko.produk TO 'app_baca'@'localhost';
Query OK, 0 rows affected (0.008 sec)

MariaDB [(none)]> SHOW GRANTS FOR 'app_tulis'@'localhost';
+--------------------------------------------------------------------------+
| Grants for app_tulis@localhost                                           |
+--------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'app_tulis'@'localhost' IDENTIFIED BY PASSWORD ...  |
| GRANT SELECT ON 'toko'.'produk' TO 'app_tulis'@'localhost'               |
| GRANT SELECT, INSERT, UPDATE ON 'toko'.'pesanan' TO 'app_tulis'@'local...' |
+--------------------------------------------------------------------------+
3 rows in set (0.000 sec)

-- Saat app_baca mencoba menghapus:
MariaDB [toko]> DELETE FROM produk WHERE prod_id = 'TNT2';
ERROR 1142 (42000): DELETE command denied to user 'app_baca'@'localhost'
for table 'produk'

-- Mencabut pada tingkat yang salah:
MariaDB [(none)]> REVOKE SELECT ON toko.produk FROM 'admin_toko'@'%';
ERROR 1147 (42000): There is no such grant defined for user 'admin_toko'
on host '%' on table 'produk'`,

  kesalahanUmum: [
    {
      salah: 'Memakai akun root untuk aplikasi karena lebih praktis saat mengembangkan.',
      kenapa: 'Satu celah SQL injection berubah dari sekadar kebocoran data menjadi kehilangan seluruh basis data, karena root boleh menjalankan DROP dan DELETE apa pun. Akun sementara ini juga hampir selalu ikut terbawa saat aplikasi naik ke server sungguhan, sebab tidak ada yang mengingatkan untuk menggantinya.',
      benar: 'Buat akun khusus dengan hak sesuai tugasnya sejak awal pengembangan. Halaman yang hanya menampilkan data cukup diberi SELECT.'
    },
    {
      salah: 'Menyangka \'budi\'@\'localhost\' dan \'budi\'@\'%\' adalah pengguna yang sama.',
      kenapa: 'Host adalah bagian dari identitas pengguna, sehingga keduanya dua akun terpisah dengan hak masing-masing. Gejalanya membingungkan: hak sudah diberikan, sandi sudah benar, tetapi Budi tetap ditolak saat menyambung dari komputer lain karena akun yang dipakainya memang berbeda.',
      benar: 'Periksa dengan SELECT user, host FROM mysql.user; untuk melihat akun mana saja yang benar-benar ada, lalu berikan hak pada kombinasi yang tepat.'
    },
    {
      salah: 'Mencabut hak pada tingkat yang berbeda dari saat memberikannya.',
      kenapa: 'Hak yang diberikan pada tingkat basis data dengan toko.* tidak bisa dicabut sebagian pada tingkat tabel. MySQL menolak dengan "There is no such grant defined for user", yang terasa aneh karena pengguna itu jelas-jelas bisa mengakses tabel tersebut.',
      benar: 'Jalankan SHOW GRANTS lebih dulu untuk melihat tingkat pemberiannya, lalu cabut pada tingkat yang sama persis.'
    },
    {
      salah: 'Memberi WITH GRANT OPTION tanpa memikirkan akibatnya.',
      kenapa: 'Penerima jadi bisa membagikan haknya kepada orang lain. Hak yang sudah disebarkan itu tidak ikut tercabut otomatis saat kamu mencabut hak si penerima, sehingga akses bisa terus hidup lewat akun yang tidak pernah kamu buat dan tidak kamu ketahui.',
      benar: 'Jangan berikan WITH GRANT OPTION kecuali orang itu memang bertugas mengelola pengguna. Periksa berkala dengan SHOW GRANTS untuk seluruh akun.'
    },
    {
      salah: 'Mengira REVOKE langsung memutus pengguna yang sedang tersambung.',
      kenapa: 'Sesi yang sudah berjalan tidak otomatis kehilangan seluruh haknya; sebagian perubahan baru berlaku setelah pengguna menyambung ulang. Dalam penanganan insiden, jeda ini berarti akun yang sudah dicabut haknya masih bisa bekerja beberapa waktu.',
      benar: 'Setelah REVOKE, periksa SHOW PROCESSLIST dan putuskan koneksinya dengan KILL kalau memang mendesak.'
    }
  ],

  analogi: `Bayangkan kunci-kunci di sebuah kantor.

**\`GRANT\`** adalah memberi seseorang kunci. **\`REVOKE\`** adalah memintanya kembali.

Yang menarik, kuncinya bertingkat: ada kunci **gedung** (\`*.*\`), kunci **satu lantai** (\`toko.*\`), kunci **satu ruangan** (\`toko.produk\`), bahkan kunci **satu laci** di dalam ruangan (\`toko.produk(nama, harga)\`).

**Prinsip hak paling sedikit** artinya: petugas kebersihan diberi kunci ruangan yang harus dibersihkan, **bukan** kunci induk gedung. Bukan karena dia dicurigai, melainkan karena kalau kuncinya hilang, yang bisa dibuka orang lain terbatas.

Di situlah letak kesalahan memakai \`root\` untuk aplikasi. Itu sama dengan menitipkan **kunci induk** ke resepsionis yang tugasnya cuma membaca daftar tamu. Selama tidak ada yang jahat, tidak ada masalah. Tetapi kalau ada yang berhasil menipunya — dan SQL injection adalah bentuk penipuan itu — yang hilang bukan cuma daftar tamu, melainkan seluruh isi gedung.

Bagian **\`@'localhost'\`** adalah keterangan **dari pintu mana** kunci itu berlaku. Kunci Budi yang hanya berfungsi di pintu belakang berbeda benda dengan kunci Budi yang berfungsi di semua pintu — sekalipun sama-sama bertuliskan "Budi". Itu sebabnya memberi hak pada satu kunci tidak membuat kunci yang lain ikut bisa.`,

  latihan: [
    'Buat pengguna baru bernama app_baca yang hanya bisa membaca tabel produk pada basis data toko. Uji dengan mencoba DELETE dan catat pesan penolakannya.',
    'Jelaskan perbedaan GRANT SELECT ON toko.* dan GRANT SELECT ON toko.produk, lalu jelaskan kenapa REVOKE pada tingkat yang salah akan gagal.',
    'Tuliskan perintah untuk memberi seorang staf hak membaca kolom nip, nama, dan jabatan saja dari tabel karyawan, tanpa bisa melihat kolom gaji.',
    'Sebuah aplikasi web punya celah SQL injection. Jelaskan perbedaan kerusakan yang mungkin terjadi kalau aplikasi itu memakai akun root dibandingkan akun dengan hak SELECT saja.',
    'Jelaskan perbedaan REVOKE ALL PRIVILEGES dan DROP USER. Dalam keadaan apa kamu memilih yang pertama?'
  ]
});

