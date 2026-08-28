/* ============================================================
   kategori.js — daftar mata kuliah & urutannya di sidebar.
   Urutan di sini menentukan urutan tampil: disusun per semester.

   Menambah mata kuliah baru? Tambahkan satu blok di sini, lalu
   buat berkas materinya di /data dan daftarkan di index.html.
   ============================================================ */

KATEGORI.push(
  {
    id: 'logika',
    nama: 'Logika Informatika',
    ringkas: 'Semester 1 — proposisi, tabel kebenaran, inferensi, kuantor, himpunan.'
  },
  {
    id: 'algoritma',
    nama: 'Algoritma dan Pemrograman',
    ringkas: 'Semester 1 — variabel, percabangan, perulangan, fungsi, pointer, sorting.'
  },
  {
    id: 'basis-data',
    nama: 'Basis Data',
    ringkas: 'Semester 1 — ERD, DDL, DML, SELECT, JOIN, view, trigger, DCL, normalisasi.'
  },
  {
    id: 'orkom',
    nama: 'Organisasi dan Struktur Komputer',
    ringkas: 'Semester 1 — arsitektur vs organisasi, CPU, siklus instruksi, memori, cache, bus.'
  },
  {
    id: 'pti',
    nama: 'Pengantar Teknologi Informasi',
    ringkas: 'Semester 1 — komponen sistem informasi, jaringan, web, keamanan, etika TI.'
  },
  {
    id: 'matematika-dasar',
    nama: 'Matematika Dasar',
    ringkas: 'Semester 1 — relasi dan fungsi, sifat relasi, limit fungsi, limit tak hingga.'
  },
  {
    id: 'struktur-data',
    nama: 'Struktur Data',
    ringkas: 'Semester 2 — linked list, stack, queue, hash, tree, heap, graph.'
  },
  {
    id: 'basis-data-2',
    nama: 'Basis Data II',
    ringkas: 'Semester 2 — PL/SQL Oracle: blok, procedure, kontrol alur, exception, cursor.'
  },
  {
    id: 'sistem-operasi',
    nama: 'Sistem Operasi',
    ringkas: 'Semester 2 — proses, thread, penjadwalan CPU, sinkronisasi, deadlock, memori.'
  },
  {
    id: 'web-desain',
    nama: 'Web Desain',
    ringkas: 'Semester 2 — HTML semantik, CSS selector & box model, flexbox, responsif, DOM.'
  },
  {
    id: 'matematika-diskrit',
    nama: 'Matematika Diskrit',
    ringkas: 'Semester 2 — permutasi, kombinasi, dan brute force pada ruang pencarian.'
  },
  {
    id: 'probstat',
    nama: 'Probabilitas dan Statistika',
    ringkas: 'Semester 2 — meringkas data tanpa menyesatkan, peluang bersyarat, Bayes, dan penarikan kesimpulan.'
  },
  {
    id: 'ecommerce',
    nama: 'E-Commerce',
    ringkas: 'Semester 2 — model bisnis daring, efek jaringan, corong konversi, dan kepercayaan pembeli.'
  },
  {
    id: 'oop',
    nama: 'Pemrograman Berorientasi Objek',
    ringkas: 'Semester 3 — class, object, pewarisan, polymorphism, abstraksi.'
  },
  {
    id: 'kecerdasan-buatan',
    nama: 'Kecerdasan Buatan',
    ringkas: 'Semester 3 — representasi pengetahuan, sistem pakar, JST, algoritma genetika, NLP, LLM.'
  },
  {
    id: 'jaringan-komputer',
    nama: 'Jaringan Komputer',
    ringkas: 'Semester 3 — model OSI & TCP/IP, pengalamatan IP, subnetting, dan analisis paket.'
  },
  {
    id: 'pemrograman-web',
    nama: 'Pemrograman Web',
    ringkas: 'Semester 3 — PHP, client-server, MVC, dan framework CodeIgniter.'
  },
  {
    id: 'ads',
    nama: 'Analisis & Desain Sistem',
    ringkas: 'Semester 3 — kebutuhan sistem, use case, activity diagram, class diagram, mockup.'
  },
  {
    id: 'aljabar-linear',
    nama: 'Aljabar Linear',
    ringkas: 'Semester 3 — vektor, matriks sebagai tindakan, sistem persamaan linear, dan eigenvector.'
  },
  {
    id: 'data-mining',
    nama: 'Data Mining',
    ringkas: 'Semester 4 — persiapan data, association rules, klasifikasi, dan clustering.'
  },
  {
    id: 'spk',
    nama: 'Sistem Pendukung Keputusan',
    ringkas: 'Semester 4 — konsep SPK, metode SAW, Weighted Product, dan TOPSIS.'
  },
  {
    id: 'rpl',
    nama: 'Rekayasa Perangkat Lunak',
    ringkas: 'Semester 4 — SDLC, model Waterfall, SRS, perancangan, dan pengujian.'
  },
  {
    id: 'imk',
    nama: 'Interaksi Manusia & Komputer',
    ringkas: 'Semester 4 — prinsip usability, heuristik Nielsen, dan evaluasi antarmuka.'
  },
  {
    id: 'multimedia',
    nama: 'Teknologi Multimedia',
    ringkas: 'Semester 4 — representasi gambar, audio, video, dan kompresi.'
  },
  {
    id: 'forensik',
    nama: 'Komputer Forensik',
    ringkas: 'Semester 4 — bukti digital, chain of custody, hashing, dan steganografi.'
  },
  {
    id: 'fuzzy',
    nama: 'Logika Fuzzy',
    ringkas: 'Semester 4 — derajat keanggotaan, operator fuzzy, dan inferensi Mamdani, Sugeno, Tsukamoto.'
  },
  {
    id: 'pemweb2',
    nama: 'Pemrograman Web II',
    ringkas: 'Semester 4 — basis data di sisi peladen, CRUD, dan keamanan aplikasi web.'
  },
  {
    id: 'sisfo',
    nama: 'Sistem Informasi',
    ringkas: 'Semester 5 — konsep sistem, data jadi informasi, dan klasifikasi sistem informasi di organisasi.'
  },
  {
    id: 'ukpl',
    nama: 'Uji Kualitas Perangkat Lunak',
    ringkas: 'Semester 5 — STLC, teknik black/white/grey box, cakupan, dan otomatisasi pengujian.'
  },
  {
    id: 'mpi',
    nama: 'Manajemen Proyek Informatika',
    ringkas: 'Semester 5 — lingkup, jalur kritis, risiko, earned value, dan Scrum untuk proyek perangkat lunak.'
  },
  {
    id: 'audit',
    nama: 'Audit Sistem Informasi',
    ringkas: 'Semester 5 — risiko audit, pengendalian internal, tata kelola TI, CAAT, dan kelangsungan usaha.'
  },
  {
    id: 'mobile',
    nama: 'Pemrograman Mobile',
    ringkas: 'Semester 5 — Kotlin & Jetpack Compose, lalu Dart & Flutter untuk lintas peron.'
  },
  {
    id: 'kwu',
    nama: 'Kewirausahaan',
    ringkas: 'Semester 5 — pola pikir wirausaha, gagasan usaha, pemasaran, keuangan, dan rencana bisnis.'
  },
  {
    id: 'kaminfo',
    nama: 'Keamanan Informasi',
    ringkas: 'Di luar berkas kuliah — CIA & risiko, kriptografi terapan, autentikasi & hak akses, serta SMKI.'
  },
  {
    id: 'lanjutan',
    nama: 'Materi Pelengkap',
    ringkas: 'Di luar silabus — Big-O, sorting O(n log n), dynamic programming, Dijkstra.'
  }
);
