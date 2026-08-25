/* ============================================================
   orkom.js — materi Organisasi dan Struktur Komputer (Semester 1)

   Disusun dari slide kuliah sendiri, Pertemuan 2-7:
     Pert-02  Pengantar Organisasi Komputer
     Pert-03  Evolusi dan Kinerja Komputer
     Pert-04  Evolusi dan Kinerja Komputer 2
     Pert-05  CPU
     Pert-06  Memori
     Pert-07  Sistem Bus

   Slide-slidenya mengikuti buku William Stallings, "Computer
   Organization and Architecture" — beberapa slide mengutipnya
   langsung dengan penanda [STA96].

   Catatan: Pertemuan 1 dan 8 ke atas tidak ada berkasnya, jadi
   materi di sini berhenti sampai Sistem Bus. Kalau slide sisanya
   ketemu, topik I/O dan set instruksi bisa menyusul.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep",
   karena yang dibedah konsep perangkat keras, bukan syntax.
   Contoh kode dipakai hanya bila ia benar-benar memperjelas —
   misalnya menirukan siklus fetch-execute atau menghitung
   pemetaan cache — bukan sebagai tempelan.
   ============================================================ */

TOPICS.push({
  id: 'orkom-arsitektur-organisasi',
  judul: 'Arsitektur vs Organisasi Komputer',
  kategori: 'orkom',
  tag: ['arsitektur', 'organisasi', 'struktur', 'fungsi', 'x86'],
  ringkas: 'Dua istilah yang paling sering tertukar, padahal bedanya menjelaskan kenapa program lama tetap jalan di komputer baru.',

  fungsi: `**Memisahkan apa yang dijanjikan komputer kepada program dari bagaimana janji itu dipenuhi.**

Pembedaan ini menjelaskan hal-hal yang terasa membingungkan:

- **Kenapa program lama tetap jalan di prosesor baru** — arsitekturnya sama, organisasinya berbeda
- **Kenapa aplikasi Windows tidak jalan di Mac M-series tanpa penerjemah** — arsitekturnya beda, x86 lawan ARM
- **Kenapa dua laptop dengan prosesor "sama" bisa beda kecepatan** — organisasinya berbeda: cache, jumlah inti, kecepatan bus

Terpakai di:

- **Memilih perangkat** — memahami apa yang sebenarnya kamu bandingkan pada spesifikasi
- **Mengompilasi program** — \`-march\` dan target arsitektur
- **Docker dan peladen** — citra untuk amd64 tidak jalan di arm64
- **Sistem Operasi** — kernel dibangun untuk arsitektur tertentu

Intinya: **arsitektur adalah kontrak, organisasi adalah caranya ditepati.**`,

  praktik: {
    tujuan: `Kamu bisa membaca spesifikasi prosesor dan memisahkan mana yang arsitektur dan mana yang organisasi, serta tahu arsitektur apa yang dipakai komputermu sendiri.`,
    alat: [
      'Terminal',
      'Situs resmi produsen prosesor untuk membandingkan spesifikasi'
    ],
    langkah: [
      { judul: 'Cari tahu arsitektur komputermu sendiri',
        isi: `- Windows: \`echo %PROCESSOR_ARCHITECTURE%\` di CMD, atau buka Task Manager lalu tab Performance
- Linux: \`uname -m\` dan \`lscpu\`
- macOS: \`uname -m\` — hasilnya \`arm64\` untuk cip M-series, \`x86_64\` untuk Intel

Catat hasilnya. Ini menentukan perangkat lunak mana yang bisa kamu jalankan.` },
      { judul: 'Pisahkan spesifikasi menjadi dua kolom',
        isi: `Ambil spesifikasi satu prosesor, lalu bagi:

**Arsitektur** — set instruksi, jumlah dan jenis register, mode pengalamatan, ukuran word

**Organisasi** — ukuran cache, jumlah inti, kecepatan clock, jumlah tahap pipeline, lebar bus

Kalau kamu ragu, tanyakan: *"apakah program harus ditulis ulang kalau ini berubah?"* Kalau ya, itu arsitektur.` },
      { judul: 'Bandingkan dua prosesor berarsitektur sama',
        isi: `Ambil Intel Core i3 dan i7 dari generasi yang sama. Keduanya **x86-64** — arsitektur identik.

Yang berbeda: jumlah inti, ukuran cache, kecepatan. Semuanya **organisasi**.

Karena arsitekturnya sama, **program yang sama berjalan di keduanya tanpa diubah** — hanya kecepatannya berbeda.` },
      { judul: 'Buktikan bahwa arsitektur berbeda tidak kompatibel',
        isi: `Coba unduh citra Docker yang hanya tersedia untuk amd64, lalu jalankan di mesin arm64 — atau sebaliknya.

Kamu akan mendapat pesan seperti \`exec format error\` atau peringatan platform tidak cocok.

Ini bukti langsung bahwa arsitektur adalah **kontrak yang tidak bisa dilanggar**.` },
      { judul: 'Lihat set instruksinya sendiri',
        isi: `Tulis program C sederhana, lalu kompilasi menjadi assembly:

- \`gcc -S -O0 program.c -o program.s\`

Buka \`program.s\`. Yang kamu lihat adalah **arsitektur** — instruksi yang dijanjikan prosesor kepada program.

Cara prosesor menjalankan instruksi itu, dengan pipeline dan cache, adalah organisasinya, dan tidak terlihat di berkas ini sama sekali.` },
      { judul: 'Kenali RISC dan CISC dari contohnya',
        isi: `- **CISC** (x86) — instruksi banyak dan rumit, satu instruksi bisa melakukan beberapa hal
- **RISC** (ARM, RISC-V) — instruksi sedikit dan sederhana, tetapi cepat dan hemat daya

Ini alasan ponsel dan cip Apple M-series memakai ARM: **hemat daya per operasi**.

Perhatikan bahwa pembedaan ini sudah kabur — prosesor x86 modern menerjemahkan instruksi CISC menjadi operasi mirip RISC di dalamnya.` }
    ],
    cek: [
      'Kamu tahu arsitektur komputermu sendiri dan bisa menyebutkannya',
      'Kamu bisa memilah sepuluh butir spesifikasi prosesor menjadi arsitektur dan organisasi',
      'Kamu sudah melihat berkas assembly hasil kompilasi sendiri'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dibedakan begitu',

  konsep: `
Ini pertanyaan pembuka mata kuliah, dan hampir pasti keluar di ujian.

**Arsitektur komputer** adalah atribut sistem yang **terlihat oleh pemrogram** — hal-hal yang berpengaruh langsung pada hasil program. Contohnya: set instruksi, jumlah bit yang dipakai mewakili suatu tipe data, teknik pengalamatan, dan mekanisme I/O.

**Organisasi komputer** adalah **unit-unit operasional dan cara menghubungkannya**, yang mewujudkan arsitektur itu. Contohnya: teknologi perangkat keras, perangkat antarmuka, teknologi memori, dan sinyal-sinyal kontrol.

Cara membedakannya dengan satu pertanyaan:

- *"Apakah pemrogram perlu tahu ini untuk menulis programnya?"* → **arsitektur**
- *"Ini soal bagaimana rangkaiannya diwujudkan?"* → **organisasi**

Contoh baku yang dipakai di kuliah: **apakah komputer punya instruksi perkalian** adalah pertanyaan arsitektur. **Apakah perkalian itu dikerjakan oleh unit perkalian khusus, atau ditiru dengan penjumlahan berulang** adalah pertanyaan organisasi.

**Kenapa pembedaan ini penting?**

Karena inilah yang membuat **satu program berjalan di banyak komputer berbeda**.

Seluruh keluarga Intel x86 memakai **arsitektur dasar yang sama**, dari 8086 sampai prosesor hari ini. Begitu pula keluarga IBM System/370. Artinya program yang ditulis untuk prosesor lama tetap bisa dijalankan di prosesor baru — sifat ini disebut **kompatibilitas mundur** (*backwards compatibility*).

Tetapi **organisasinya berbeda jauh antar versi**. Prosesor hari ini punya cache berlapis, eksekusi paralel, dan miliaran transistor yang tidak dimiliki 8086. Semua itu berubah tanpa mengubah arsitekturnya, sehingga program lama tidak perlu ditulis ulang.

**Struktur dan Fungsi**

Dua istilah lain yang perlu dibedakan:

- **Struktur** — bagaimana komponen saling berhubungan dan berinteraksi dengan dunia luar.
- **Fungsi** — operasi dari masing-masing komponen sebagai bagian dari struktur itu.

**Empat fungsi dasar komputer:**

- **Pengolahan data** — mengubah data menjadi bentuk lain
- **Penyimpanan data** — menyimpan untuk dipakai nanti
- **Pemindahan data** — memindahkan antar-perangkat
- **Kontrol** — mengatur ketiga fungsi di atas

**Struktur internalnya bertingkat.** Di tingkat teratas komputer terdiri atas **CPU, memori utama, I/O, dan sistem interkoneksi**. Kalau CPU-nya dibuka, isinya **control unit, ALU, register, dan interkoneksi CPU**. Kalau control unit-nya dibuka lagi, ada isinya sendiri. Setiap tingkat menyembunyikan kerumitan tingkat di bawahnya — cara berpikir yang akan kamu temui lagi di hampir semua bidang informatika.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Pertanyaan ARSITEKTUR: apakah ada instruksi perkalian?\n#   -> memengaruhi program yang ditulis pemrogram\n\n# Pertanyaan ORGANISASI: bagaimana perkalian itu diwujudkan?\n#   -> tidak terlihat oleh pemrogram\n\n# Cara A: unit perkalian khusus  -> cepat, transistor banyak\n# Cara B: penjumlahan berulang   -> lambat, rangkaian sederhana\n\ndef kali_cara_b(a, b):\n    hasil = 0\n    for _ in range(b):\n        hasil = hasil + a\n    return hasil\n\nprint(kali_cara_b(6, 7))   # 42 -- hasilnya SAMA',
      penjelasan: `
Inilah contoh yang paling sering dipakai untuk menjelaskan perbedaan keduanya, dan patut kamu hafalkan bentuknya.

Bagi **pemrogram**, yang penting cuma satu: *ada tidaknya instruksi perkalian*, dan berapa hasilnya. Kalau instruksinya ada, ia menulis \`a * b\` dan selesai. Itu urusan **arsitektur**.

Bagaimana perkalian itu **sebenarnya dikerjakan** di dalam prosesor sama sekali tidak memengaruhi jawaban yang keluar. Bisa lewat unit perkalian khusus yang selesai dalam satu detak, bisa juga ditiru dengan penjumlahan berulang seperti kode di atas. Itu urusan **organisasi**.

Perhatikan bahwa \`kali_cara_b(6, 7)\` tetap menghasilkan 42, sama persis dengan \`6 * 7\`. Yang berbeda hanya **berapa lama** dan **berapa banyak transistor** yang dibutuhkan.

Dari sini muncul akibat yang sangat praktis. Prosesor murah bisa memilih cara B untuk menekan harga, prosesor mahal memilih cara A untuk kecepatan, dan **program yang sama tetap jalan di keduanya**. Pemrogram tidak perlu menulis dua versi.

Inilah yang membuat keluarga x86 bisa bertahan berpuluh tahun. Arsitekturnya dijaga tetap, organisasinya boleh dirombak habis-habisan. Prosesor hari ini bahkan **menerjemahkan** instruksi x86 menjadi perintah internal yang sama sekali berbeda — dan program dari tahun 1990 tetap berjalan.
`
    },
    {
      bahasa: 'python',
      kode: '# Struktur bertingkat: tiap tingkat menyembunyikan tingkat di bawahnya\n\nkomputer = {\n    "CPU": {\n        "Control Unit": "mengatur urutan kerja",\n        "ALU":          "menghitung aritmetika dan logika",\n        "Register":     "penyimpan super cepat di dalam CPU",\n        "Interkoneksi": "penghubung antar bagian CPU"\n    },\n    "Memori Utama":       "menyimpan program dan data yang aktif",\n    "I/O":                "penghubung ke dunia luar",\n    "Sistem Interkoneksi": "bus yang menyambung ketiganya"\n}',
      penjelasan: `
Struktur komputer digambarkan **bertingkat**, dan cara berpikir ini terus dipakai di seluruh mata kuliah.

Di **tingkat teratas**, komputer cuma empat bagian: CPU, memori utama, I/O, dan sistem interkoneksi yang menyambungkan ketiganya.

Kalau **CPU dibuka**, di dalamnya ada empat bagian lagi: control unit, ALU, register, dan interkoneksi CPU. Kalau **control unit dibuka**, ada isinya sendiri lagi.

Kenapa digambarkan bertingkat, bukan sekaligus semuanya? Karena **satu prosesor modern memuat miliaran transistor**. Tidak ada manusia yang bisa memahaminya sebagai satu gambar utuh. Dengan bertingkat, kamu bisa memahami satu lapis pada satu waktu, dan menganggap lapis di bawahnya sebagai kotak hitam yang "pokoknya bekerja".

Ini persis cara yang kamu pakai saat memanggil \`print()\` tanpa memikirkan bagaimana huruf sampai ke layar, atau memakai \`sort()\` tanpa memikirkan algoritma di dalamnya. Namanya **abstraksi**, dan kamu akan bertemu istilah ini lagi di OOP, Sistem Operasi, dan Jaringan Komputer.

Untuk ujian, hafalkan dua daftar ini terpisah dan jangan sampai tertukar:

- **Struktur internal komputer**: CPU, memori utama, I/O, sistem interkoneksi.
- **Struktur internal CPU**: control unit, ALU, register, interkoneksi CPU.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Empat fungsi dasar komputer, dengan contohnya
# ============================================

fungsi_dasar = [
    ("Pengolahan Data",
     "mengubah data jadi bentuk lain",
     "menghitung total belanja"),

    ("Penyimpanan Data",
     "menyimpan untuk dipakai nanti",
     "unduh berkas dari internet ke disk"),

    ("Pemindahan Data",
     "memindahkan antar perangkat",
     "ketikan keyboard tampil di layar"),

    ("Kontrol",
     "mengatur ketiga fungsi di atas",
     "menentukan instruksi mana yang dijalankan berikutnya"),
]

for nama, arti, contoh in fungsi_dasar:
    print(nama)
    print("   arti   : " + arti)
    print("   contoh : " + contoh)

# ============================================
# Menggolongkan pertanyaan: arsitektur atau organisasi?
# ============================================

pertanyaan = [
    ("Apakah tersedia instruksi perkalian?",          "arsitektur"),
    ("Berapa bit lebar register?",                    "arsitektur"),
    ("Bagaimana cara mengalamati memori?",            "arsitektur"),
    ("Perkalian pakai unit khusus atau penjumlahan?", "organisasi"),
    ("Berapa besar cache level 1?",                   "organisasi"),
    ("Teknologi memori apa yang dipakai?",            "organisasi"),
    ("Sinyal kontrol apa saja yang ada di bus?",      "organisasi"),
]

for soal, jawab in pertanyaan:
    print(jawab.upper().ljust(12) + soal)

# Kunci membedakannya:
#   "perlu diketahui pemrogram?"  -> arsitektur
#   "soal perwujudan rangkaian?"  -> organisasi`
  },

  output: `Pengolahan Data
   arti   : mengubah data jadi bentuk lain
   contoh : menghitung total belanja
Penyimpanan Data
   arti   : menyimpan untuk dipakai nanti
   contoh : unduh berkas dari internet ke disk
Pemindahan Data
   arti   : memindahkan antar perangkat
   contoh : ketikan keyboard tampil di layar
Kontrol
   arti   : mengatur ketiga fungsi di atas
   contoh : menentukan instruksi mana yang dijalankan berikutnya

ARSITEKTUR  Apakah tersedia instruksi perkalian?
ARSITEKTUR  Berapa bit lebar register?
ARSITEKTUR  Bagaimana cara mengalamati memori?
ORGANISASI  Perkalian pakai unit khusus atau penjumlahan?
ORGANISASI  Berapa besar cache level 1?
ORGANISASI  Teknologi memori apa yang dipakai?
ORGANISASI  Sinyal kontrol apa saja yang ada di bus?`,

  kesalahanUmum: [
    {
      salah: 'Menukar arsitektur dengan organisasi, dan mengira arsitektur berarti "perangkat kerasnya".',
      kenapa: 'Kata arsitektur dalam bahasa sehari-hari mengesankan bangunan fisik, sehingga terasa wajar mengaitkannya dengan perangkat keras. Padahal justru sebaliknya: arsitektur adalah yang terlihat pemrogram, sedangkan organisasi yang mengurus perwujudan fisiknya. Kekeliruan ini membuat seluruh soal perbandingan dijawab terbalik.',
      benar: 'Ingat pertanyaan penyaringnya: kalau pemrogram perlu tahu untuk menulis programnya, itu arsitektur. Kalau soal bagaimana rangkaiannya dibuat, itu organisasi.'
    },
    {
      salah: 'Menyebut struktur internal CPU padahal yang ditanya struktur internal komputer.',
      kenapa: 'Keduanya sama-sama berisi empat komponen dan sama-sama memuat kata interkoneksi, sehingga mudah tertukar saat terburu-buru. Jawaban jadi salah seluruhnya meski hafalannya sebenarnya ada.',
      benar: 'Komputer: CPU, memori utama, I/O, sistem interkoneksi. CPU: control unit, ALU, register, interkoneksi CPU. Perhatikan kata "utama" dan "sistem" sebagai penanda tingkat komputer.'
    },
    {
      salah: 'Mengira kompatibilitas mundur berarti organisasi prosesornya juga tidak berubah.',
      kenapa: 'Justru sebaliknya. Arsitektur x86 dijaga tetap supaya program lama jalan, tetapi organisasinya dirombak total tiap generasi. Prosesor hari ini bahkan menerjemahkan instruksi x86 menjadi perintah internal yang berbeda. Salah paham ini membuat orang mengira prosesor baru cuma versi cepat dari yang lama.',
      benar: 'Arsitektur tetap supaya program lama jalan; organisasi bebas berubah supaya makin cepat. Justru pemisahan inilah gunanya.'
    },
    {
      salah: 'Menyebut hanya tiga fungsi dasar komputer dan melupakan fungsi kontrol.',
      kenapa: 'Pengolahan, penyimpanan, dan pemindahan data terasa paling nyata karena hasilnya terlihat. Fungsi kontrol tidak menghasilkan apa-apa yang kasat mata, padahal ia yang mengatur kapan ketiga fungsi lain dijalankan, sehingga justru paling menentukan.',
      benar: 'Empat fungsi: pengolahan, penyimpanan, pemindahan, dan kontrol. Kontrol adalah yang mengatur ketiganya.'
    }
  ],

  analogi: `Bayangkan sebuah restoran.

**Arsitektur** adalah **menunya**. Pelanggan membaca menu untuk tahu apa yang bisa dipesan: ada nasi goreng, ada soto. Itulah yang perlu diketahui pemesan, dan tidak lebih.

**Organisasi** adalah **dapurnya**. Apakah nasi gorengnya dimasak dengan kompor gas atau kompor induksi, apakah kokinya satu atau lima, apakah bumbunya diulek atau diblender — pelanggan tidak perlu tahu, dan hasilnya tetap nasi goreng.

Dari sini kompatibilitas mundur jadi mudah dipahami. Restoran boleh mengganti seluruh isi dapur: kompor baru, koki baru, wajan baru. **Selama menunya tidak berubah, pelanggan lama tetap bisa memesan hal yang sama** dan mendapat hidangan yang sama. Itulah kenapa program dari tahun 1990 masih jalan di laptopmu.

Sebaliknya, kalau menunya diubah — nasi goreng dihapus — pelanggan lama langsung terganggu. Itulah kenapa produsen prosesor sangat enggan mengubah arsitektur, tetapi merombak organisasi setiap tahun tanpa ragu.

Untuk **struktur bertingkat**, bayangkan denah restoran: ada ruang makan, dapur, gudang, dan lorong yang menghubungkannya. Buka pintu dapur, di dalamnya ada bagian penggorengan, bagian potong, bagian cuci. Buka lagi bagian penggorengan, ada isinya sendiri. **Kamu tidak pernah perlu melihat semuanya sekaligus** — dan itu justru yang membuatnya bisa dipahami.`,

  latihan: [
    'Golongkan tiap pertanyaan berikut sebagai arsitektur atau organisasi, beserta alasannya: (a) berapa bit alamat memori, (b) berapa kapasitas cache L2, (c) apakah ada instruksi pembagian, (d) teknologi apa yang dipakai membuat register.',
    'Jelaskan dengan kalimatmu sendiri kenapa program yang ditulis untuk Intel 8086 masih bisa berjalan di prosesor keluaran hari ini, dengan memakai istilah arsitektur dan organisasi.',
    'Sebutkan struktur internal komputer dan struktur internal CPU. Jelaskan kenapa keduanya sering tertukar dan bagaimana cara membedakannya.',
    'Sebutkan empat fungsi dasar komputer, lalu beri satu contoh nyata untuk masing-masing yang berbeda dari contoh di materi ini.',
    'Dua prosesor punya arsitektur sama tetapi organisasi berbeda: yang satu punya cache besar, yang lain tidak. Jelaskan apa yang berbeda bagi pemrogram dan apa yang berbeda bagi pengguna.'
  ]
});

TOPICS.push({
  id: 'orkom-von-neumann',
  judul: 'Arsitektur von Neumann & Evolusi Komputer',
  kategori: 'orkom',
  tag: ['von Neumann', 'IAS', 'ENIAC', 'stored program', 'generasi komputer', 'Moore'],
  ringkas: 'Gagasan menyimpan program di memori — satu ide yang membentuk hampir semua komputer sampai hari ini.',

  fungsi: `**Memahami rancangan dasar yang dipakai hampir semua komputer sampai hari ini.**

Gagasan pokoknya — **program disimpan di memori yang sama dengan data** — terdengar biasa, dan justru itu yang membuatnya revolusioner. Sebelumnya, mengubah program berarti mengubah kabelnya.

Terpakai di:

- **Memahami kenapa program bisa dimuat dan dijalankan** tanpa merakit ulang komputer
- **Keamanan** — karena kode dan data satu tempat, data yang salah tangani bisa **dijalankan sebagai kode**. Itulah dasar buffer overflow
- **Memahami hambatan kinerja** — CPU jauh lebih cepat daripada memori, dan itu masalah utama komputer modern
- **Sistem Operasi** — memuat program ke memori adalah tugas pokoknya

Yang paling berguna dipahami: **hambatan von Neumann**. CPU dan memori berbagi satu jalur, sehingga CPU sering **menunggu** data. Seluruh keberadaan cache adalah usaha mengurangi penungguan itu.`,

  praktik: {
    tujuan: `Kamu bisa menunjukkan kelima komponen von Neumann pada komputer nyata, dan sudah mengukur sendiri selisih kecepatan CPU dengan memori.`,
    alat: [
      'Terminal',
      'Python 3',
      'Task Manager atau htop'
    ],
    langkah: [
      { judul: 'Tunjuk kelima komponennya di komputermu',
        isi: `- **Unit masukan** — papan ketik, tetikus
- **Unit keluaran** — layar, pengeras suara
- **Memori utama** — RAM
- **ALU** dan **Control Unit** — keduanya di dalam CPU

Buka Task Manager atau \`htop\` dan cari masing-masing. Melihatnya pada perangkat nyata membuat diagramnya berhenti terasa abstrak.` },
      { judul: 'Lihat program dimuat ke memori',
        isi: `Jalankan sebuah program besar, lalu perhatikan pemakaian RAM sebelum dan sesudahnya.

Selisih itu adalah **programnya sendiri** yang dimuat ke memori — bukti langsung dari gagasan program tersimpan.

Di Linux: \`cat /proc/[pid]/maps\` menunjukkan bagian memori mana yang berisi kode dan mana yang berisi data.` },
      { judul: 'Ukur hambatan von Neumann sendiri',
        isi: `Buat dua percobaan di Python dengan jumlah operasi yang sama:

- menjumlahkan angka yang **sudah ada di variabel**, berulang kali
- menjumlahkan angka dari **daftar besar yang tersebar di memori**

Yang kedua jauh lebih lambat, dan bukan karena operasi tambahnya berbeda — melainkan karena **menunggu data dari memori**.` },
      { judul: 'Buktikan urutan akses berpengaruh',
        isi: `Buat matriks 2000 kali 2000, lalu jumlahkan isinya dengan dua cara:

- **baris demi baris** — \`for i: for j: total += m[i][j]\`
- **kolom demi kolom** — \`for j: for i: total += m[i][j]\`

Operasinya sama persis, jumlahnya sama persis. Tetapi yang pertama bisa **beberapa kali lebih cepat**, karena data yang berdekatan di memori diambil sekaligus.

Ini pengantar langsung ke topik cache.` },
      { judul: 'Kenali arsitektur Harvard sebagai pembanding',
        isi: `Harvard memisahkan memori **instruksi** dan memori **data**, sehingga keduanya bisa diakses bersamaan.

Dipakai pada mikrokontroler seperti Arduino, dan di dalam CPU modern pada tingkat cache — ada cache instruksi terpisah dari cache data.

Jadi komputer modern sebenarnya **campuran**: von Neumann di luar, Harvard di dalam.` },
      { judul: 'Telusuri evolusinya lewat satu ukuran',
        isi: `Cari jumlah transistor pada beberapa prosesor dari 1971 sampai sekarang, lalu buat grafiknya dengan skala logaritmik.

Kamu akan melihat garis yang hampir lurus — itulah **hukum Moore**.

Lalu cari data sepuluh tahun terakhir. Garisnya mulai melandai, dan itu alasan produsen beralih menambah **jumlah inti** alih-alih menaikkan kecepatan.` }
    ],
    cek: [
      'Kamu bisa menunjuk kelima komponen von Neumann pada komputermu sendiri',
      'Penjumlahan matriks baris demi baris terbukti lebih cepat daripada kolom demi kolom',
      'Kamu bisa menjelaskan apa itu hambatan von Neumann dengan kalimatmu sendiri'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**ENIAC** (1946) adalah komputer elektronik serbaguna pertama. Ukurannya 30 ton, memakai 18.000 tabung vakum, dan menghabiskan 140 kilowatt. Ia dirancang untuk menghitung tabel tembakan artileri Angkatan Darat Amerika.

Kelemahan terbesarnya bukan ukuran, melainkan **cara memprogramnya**: pemrograman dilakukan secara manual dengan **memasang ulang kabel dan mengatur sakelar**. Mengubah program bisa memakan waktu **berhari-hari**.

**Gagasan stored program**

John von Neumann mengusulkan gagasan yang terdengar sederhana tetapi mengubah segalanya: **simpan programnya di memori, sama seperti data**.

Akibatnya besar. Mengganti program cukup dengan memuat isi memori yang berbeda — hitungan detik, bukan hari. Dan karena program tersimpan sebagai angka, **program bisa memperlakukan program lain sebagai data**. Dari sinilah lahir kompiler, sistem operasi, dan hampir semua perangkat lunak yang kamu kenal.

Gagasan ini diwujudkan pada mesin **IAS** (*Institute for Advanced Studies*), yang menjadi cetak biru hampir semua komputer sesudahnya.

**Struktur mesin von Neumann**

- **Memori utama** — menyimpan **data maupun instruksi**, di ruang yang sama
- **ALU** — melakukan operasi aritmetika dan logika terhadap data biner
- **Unit kontrol** — menafsirkan instruksi dan memerintahkan pelaksanaannya
- **Perangkat I/O** — dioperasikan oleh unit kontrol

Komputer IAS punya **21 instruksi**, dan bekerja secara berulang membentuk **siklus instruksi**.

**Kelemahan bawaannya: von Neumann bottleneck**

Karena instruksi dan data melewati **jalur yang sama** menuju CPU, keduanya tidak bisa diambil bersamaan. Jalur inilah yang menjadi penyempitan, dan namanya *von Neumann bottleneck*. Sebagian besar teknik yang dipelajari nanti — cache, pipeline, bus terpisah — pada dasarnya adalah usaha menyiasati penyempitan ini.

**Generasi komputer**

- **Generasi 1 — Tabung vakum** (1946-1957). ENIAC, IAS. Besar, panas, sering putus.
- **Generasi 2 — Transistor** (1958-1964). Lebih kecil, lebih hemat, lebih andal. IBM 7094.
- **Generasi 3 — IC** (1965-1971). Banyak transistor dalam satu keping. IBM System/360, DEC PDP-8.
- **Generasi 4 — LSI dan VLSI** (1972-sekarang). Mikroprosesor. Ribuan sampai miliaran transistor per keping.

**Hukum Moore**

Gordon Moore mengamati pada 1965 bahwa **jumlah transistor dalam satu keping berlipat ganda kira-kira setiap 18 sampai 24 bulan**. Perhatikan bahwa ini **pengamatan tren, bukan hukum alam** — dan laju itu kini melambat karena transistor sudah mendekati batas ukuran atom.

**CISC dan RISC**

Dua falsafah perancangan set instruksi yang muncul dari evolusi ini:

- **CISC** (*Complex Instruction Set Computer*) — instruksinya banyak dan rumit, satu instruksi bisa mengerjakan banyak hal. Dipakai keluarga **Intel Pentium**.
- **RISC** (*Reduced Instruction Set Computer*) — instruksinya sedikit dan sederhana, tetapi tiap instruksi cepat. Dipakai **PowerPC**, dan juga ARM yang ada di ponselmu.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SEBELUM stored program (ENIAC):\n#   program = susunan kabel dan sakelar\n#   ganti program = pasang ulang kabel, BERHARI-HARI\n\n# SESUDAH stored program (IAS):\n#   program = angka di memori, sama seperti data\n\nmemori = [\n    ("instruksi", "LOAD  alamat_5"),\n    ("instruksi", "ADD   alamat_6"),\n    ("instruksi", "STORE alamat_7"),\n    ("instruksi", "HALT"),\n    ("data",      0),\n    ("data",      12),      # alamat_5\n    ("data",      30),      # alamat_6\n    ("data",      0),       # alamat_7, tempat hasil\n]\n\n# Ganti program = ganti isi memori. Hitungan DETIK.',
      penjelasan: `
Perhatikan satu hal yang mudah terlewat pada daftar \`memori\` di atas: **instruksi dan data berada di daftar yang sama**.

Itulah inti gagasan *stored program*. Tidak ada memori khusus program dan memori khusus data — keduanya sama-sama angka, di ruang yang sama, dan yang membedakan hanya **bagaimana CPU memperlakukannya** saat itu.

Akibat pertama sudah jelas: mengganti program cukup dengan mengganti isi memori. Dari berhari-hari menjadi sepersekian detik.

Akibat kedua jauh lebih dalam, dan inilah yang benar-benar mengubah dunia: **program bisa memperlakukan program lain sebagai data**. Karena kode hanyalah angka, sebuah program bisa membaca, menulis, dan menghasilkan program lain.

Dari sinilah lahir hampir semua hal yang kamu pakai:

- **Kompiler** — program yang membaca kode sumber sebagai data, lalu menghasilkan program lain.
- **Sistem operasi** — program yang memuat dan menjalankan program lain.
- **Interpreter Python** — program yang membaca skripmu sebagai teks lalu menjalankannya.

Sisi buruknya juga berasal dari sini. Karena CPU tidak bisa membedakan sendiri mana instruksi dan mana data, **data yang salah tempat bisa dieksekusi sebagai instruksi**. Inilah dasar serangan *buffer overflow*, di mana penyerang menyelipkan kode ke tempat yang seharusnya berisi data. Perlindungan modern seperti bit **NX** (*no-execute*) ditambahkan justru untuk menambal celah bawaan gagasan ini.
`
    },
    {
      bahasa: 'python',
      kode: '# von Neumann bottleneck: instruksi dan data lewat jalur yang SAMA\n#\n#   +-----+         satu jalur          +--------+\n#   | CPU | <========================> | Memori |\n#   +-----+   instruksi DAN data        +--------+\n#\n# Akibatnya tidak bisa diambil bersamaan.\n\n# Arsitektur Harvard memakai jalur terpisah:\n#\n#   +-----+ <====> | Memori Instruksi |\n#   | CPU |\n#   +-----+ <====> | Memori Data      |',
      penjelasan: `
Kelemahan ini bukan cacat perancangan, melainkan **akibat langsung** dari gagasan menyimpan instruksi dan data di tempat yang sama.

Karena keduanya melewati jalur yang sama menuju CPU, mereka **harus bergantian**. Saat CPU mengambil instruksi, ia tidak bisa sekaligus mengambil data yang dibutuhkan instruksi itu.

Masalahnya makin terasa seiring waktu, dan alasannya menarik: **kecepatan prosesor tumbuh jauh lebih cepat daripada kecepatan memori**. Prosesor makin lama makin sering menunggu. Hari ini, satu akses ke memori utama bisa memakan ratusan detak — waktu yang cukup bagi prosesor untuk mengerjakan ratusan instruksi seandainya datanya sudah tersedia.

Hampir semua teknik yang dipelajari di sisa mata kuliah ini adalah usaha menyiasatinya:

- **Cache** — menyimpan salinan data yang sering dipakai lebih dekat ke CPU.
- **Register** — penyimpanan tercepat, langsung di dalam CPU.
- **Pipeline** — mengerjakan beberapa tahap instruksi secara tumpang tindih.
- **Bus lebih lebar** — memindahkan lebih banyak bit sekali jalan.

**Arsitektur Harvard** menyelesaikannya secara langsung dengan memakai jalur dan memori terpisah untuk instruksi dan data, sehingga keduanya bisa diambil bersamaan. Kelemahannya, rancangannya lebih rumit dan kurang luwes.

Yang dipakai kebanyakan prosesor sekarang adalah gabungan keduanya, disebut *modified Harvard*: **cache instruksi dan cache data dipisah** di tingkat L1 sehingga bisa diakses bersamaan, tetapi memori utamanya tetap satu seperti von Neumann. Kamu akan bertemu pilihan ini lagi di topik cache sebagai istilah **split cache** dan **unified cache**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Empat generasi komputer & Hukum Moore
# ============================================

generasi = [
    (1, "Tabung Vakum", "1946-1957", "ENIAC, IAS",
     "besar, panas, tabung sering putus"),
    (2, "Transistor",   "1958-1964", "IBM 7094",
     "lebih kecil, hemat daya, jauh lebih andal"),
    (3, "IC",           "1965-1971", "IBM System/360, DEC PDP-8",
     "banyak transistor dalam satu keping"),
    (4, "LSI dan VLSI", "1972-kini", "mikroprosesor Intel, PowerPC",
     "ribuan sampai miliaran transistor per keping"),
]

for no, teknologi, tahun, contoh, ciri in generasi:
    print("Generasi " + str(no) + " -- " + teknologi + " (" + tahun + ")")
    print("   contoh : " + contoh)
    print("   ciri   : " + ciri)

# ============================================
# Hukum Moore: berlipat ganda tiap ~2 tahun
# ============================================

transistor = 2300          # Intel 4004, tahun 1971
tahun = 1971

print("")
print("tahun    transistor")
while tahun <= 2001:
    print(str(tahun).ljust(9) + format(transistor, ","))
    transistor = transistor * 2
    tahun = tahun + 2

# Catatan: ini PENGAMATAN TREN, bukan hukum alam.
# Lajunya melambat karena transistor sudah mendekati
# batas ukuran atom.

# ============================================
# CISC vs RISC
# ============================================

print("")
print("CISC (Intel Pentium)")
print("   instruksi banyak dan rumit")
print("   satu instruksi bisa mengerjakan banyak hal")
print("   program lebih pendek, tiap instruksi lebih lambat")

print("RISC (PowerPC, ARM)")
print("   instruksi sedikit dan sederhana")
print("   satu instruksi mengerjakan satu hal")
print("   program lebih panjang, tiap instruksi lebih cepat")`
  },

  output: `Generasi 1 -- Tabung Vakum (1946-1957)
   contoh : ENIAC, IAS
   ciri   : besar, panas, tabung sering putus
Generasi 2 -- Transistor (1958-1964)
   contoh : IBM 7094
   ciri   : lebih kecil, hemat daya, jauh lebih andal
Generasi 3 -- IC (1965-1971)
   contoh : IBM System/360, DEC PDP-8
   ciri   : banyak transistor dalam satu keping
Generasi 4 -- LSI dan VLSI (1972-kini)
   contoh : mikroprosesor Intel, PowerPC
   ciri   : ribuan sampai miliaran transistor per keping

tahun    transistor
1971     2,300
1973     4,600
1975     9,200
...
1999     2,355,200
2001     4,710,400`,

  kesalahanUmum: [
    {
      salah: 'Mengira von Neumann yang menciptakan komputer pertama.',
      kenapa: 'Komputer elektronik sudah ada sebelumnya, yaitu ENIAC. Sumbangan von Neumann adalah gagasan stored program, bukan mesinnya. Kekeliruan ini membuat jawaban soal sejarah kehilangan inti persoalannya, yaitu apa sebenarnya yang berubah setelah gagasan itu muncul.',
      benar: 'ENIAC adalah komputer elektronik serbaguna pertama, diprogram dengan kabel. Gagasan von Neumann adalah menyimpan program di memori, dan diwujudkan pada mesin IAS.'
    },
    {
      salah: 'Menyebut Hukum Moore sebagai hukum fisika yang pasti berlaku.',
      kenapa: 'Moore hanya mengamati tren pada 1965 dan memperkirakan kelanjutannya. Tidak ada hukum alam yang mewajibkan transistor berlipat ganda. Menganggapnya pasti membuat orang bingung ketika laju itu melambat, padahal perlambatan justru wajar karena transistor sudah mendekati batas ukuran atom.',
      benar: 'Sebut sebagai pengamatan atau perkiraan tren: jumlah transistor per keping berlipat ganda kira-kira tiap 18 sampai 24 bulan. Sadari bahwa lajunya kini melambat.'
    },
    {
      salah: 'Mengira von Neumann bottleneck berarti prosesornya lambat.',
      kenapa: 'Penyempitannya bukan pada prosesor, melainkan pada jalur antara prosesor dan memori. Prosesornya justru sangat cepat, dan itulah sebabnya masalah ini makin terasa: kecepatan prosesor tumbuh lebih cepat daripada kecepatan memori, sehingga prosesor makin sering menunggu.',
      benar: 'Penyempitannya ada di jalur ke memori, karena instruksi dan data harus bergantian lewat jalur yang sama. Cache dan register ada untuk mengurangi keharusan melewati jalur itu.'
    },
    {
      salah: 'Menganggap RISC selalu lebih cepat daripada CISC karena instruksinya sederhana.',
      kenapa: 'Instruksi RISC memang lebih cepat satuan, tetapi programnya butuh lebih banyak instruksi untuk pekerjaan yang sama. Kecepatan akhir bergantung pada perkalian keduanya, ditambah faktor lain seperti cache dan pipeline. Prosesor Intel modern bahkan menerjemahkan instruksi CISC menjadi operasi mirip RISC di dalamnya.',
      benar: 'Bandingkan sebagai pertukaran: CISC memberi program lebih pendek dengan instruksi lebih lambat, RISC sebaliknya. Tidak ada yang mutlak menang.'
    }
  ],

  analogi: `Bayangkan sebuah pabrik kue.

**ENIAC** adalah pabrik yang mesinnya **dirakit khusus untuk satu resep**. Mau ganti dari kue lapis ke bolu? Bongkar seluruh jalur produksi, pasang ulang pipa dan sabuk berjalan. Berhari-hari.

**Gagasan stored program** adalah menyadari bahwa **resep bisa ditulis di kertas dan ditaruh di rak yang sama dengan bahan baku**. Ganti resep cukup dengan mengambil kertas lain dari rak. Hitungan detik.

Dan di sinilah bagian yang benar-benar mengubah segalanya: karena resep hanyalah tulisan di kertas, **sebuah resep bisa berisi perintah untuk menulis resep lain**. Itulah kompiler. Pabrik yang menghasilkan resep, bukan cuma kue.

Sisi buruknya juga muncul dari situ. Karena resep dan bahan baku ditaruh di rak yang sama, **ada kemungkinan kertas resep tercampur dan ikut masuk adonan**, atau sebaliknya, secarik catatan belanja terbaca sebagai resep dan dikerjakan mesin. Itulah gambaran serangan *buffer overflow*.

**Von Neumann bottleneck** adalah kalau rak resep dan rak bahan baku berada di ujung lorong yang sama, dan cuma ada **satu troli**. Kokinya secepat apa pun, dia tetap harus bolak-balik lewat lorong itu satu per satu. Menaruh bahan yang sering dipakai di meja dekat kompor — itulah **cache**.`,

  latihan: [
    'Jelaskan apa kelemahan utama ENIAC dan bagaimana gagasan stored program mengatasinya. Sebutkan berapa lama waktu yang dihemat.',
    'Sebutkan empat komponen mesin von Neumann beserta tugasnya masing-masing.',
    'Jelaskan apa itu von Neumann bottleneck, kenapa masalahnya makin terasa dari waktu ke waktu, dan sebutkan tiga teknik untuk menyiasatinya.',
    'Buat tabel empat generasi komputer berisi teknologi, rentang tahun, dan satu contoh mesin untuk masing-masing.',
    'Jelaskan perbedaan CISC dan RISC, sebutkan satu contoh prosesor untuk masing-masing, lalu jelaskan kenapa tidak bisa dikatakan salah satunya mutlak lebih cepat.'
  ]
});

TOPICS.push({
  id: 'orkom-cpu',
  judul: 'Struktur CPU — ALU, Control Unit & Register',
  kategori: 'orkom',
  tag: ['CPU', 'ALU', 'control unit', 'register', 'PC', 'IR', 'MAR', 'MBR'],
  ringkas: 'Membuka isi prosesor: siapa yang menghitung, siapa yang memerintah, dan siapa yang menyimpan.',

  fungsi: `**Memahami apa yang sebenarnya terjadi di dalam prosesor saat programmu berjalan.**

Ini menjelaskan hal-hal yang tidak terlihat dari kode:

- **Kenapa variabel lokal lebih cepat** daripada yang di memori — ia bisa tinggal di register
- **Kenapa jumlah register berpengaruh** pada kecepatan program
- **Apa yang dilihat debugger** saat kamu memeriksa nilai register
- **Kenapa program bisa dilanjutkan setelah interupsi** — isi register disimpan dan dipulihkan

Terpakai di:

- **Membaca assembly** saat menelusuri bug yang sulit
- **Sistem Operasi** — pergantian konteks adalah menyimpan dan memulihkan register
- **Optimasi** — memahami kenapa kompiler menyusun ulang kodemu
- **Komputer Forensik** — isi register dan memori adalah bukti yang paling cepat hilang

Yang paling berguna diingat: **register adalah tempat penyimpanan tercepat yang ada**, dan jumlahnya sangat sedikit — belasan sampai puluhan. Seluruh permainan optimasi adalah menjaga data yang sering dipakai tetap di sana.`,

  praktik: {
    tujuan: `Kamu bisa membaca assembly sederhana, mengenali register yang dipakai, dan melihat sendiri isinya lewat debugger.`,
    alat: [
      'gcc atau g++',
      'gdb (Linux/WSL) atau debugger bawaan editor',
      'Situs godbolt.org sebagai alternatif tanpa pemasangan'
    ],
    langkah: [
      { judul: 'Hasilkan assembly dari kode C sederhana',
        isi: `Tulis fungsi yang menjumlahkan dua angka, lalu:

- \`gcc -S -O0 -masm=intel program.c -o program.s\`

Buka \`program.s\`. Cari nama seperti \`eax\`, \`ebx\`, \`rsp\`, \`rbp\` — itulah registernya.

Kalau tidak ingin memasang apa pun, tempel kodemu di **godbolt.org** dan lihat hasilnya berdampingan.` },
      { judul: 'Kenali peran register yang sering muncul',
        isi: `- \`rax\` / \`eax\` — akumulator, dan tempat nilai kembalian fungsi
- \`rsp\` — penunjuk puncak stack
- \`rbp\` — penunjuk basis frame fungsi saat ini
- \`rip\` — **program counter**, menunjuk instruksi berikutnya

Perhatikan \`rip\` secara khusus: itulah yang membuat program tahu di mana ia berada, dan yang diubah setiap kali ada lompatan atau pemanggilan fungsi.` },
      { judul: 'Bandingkan hasil kompilasi tanpa dan dengan optimasi',
        isi: `Kompilasi program yang sama dua kali: dengan \`-O0\` lalu dengan \`-O2\`.

Bandingkan panjang assembly-nya. Versi teroptimasi sering **jauh lebih pendek**, karena kompiler menyimpan nilai di register alih-alih bolak-balik ke memori.

Kadang seluruh perhitunganmu bahkan dihitung saat kompilasi dan diganti satu angka.` },
      { judul: 'Lihat isi register saat program berjalan',
        isi: `Di gdb:

- \`gdb ./program\`
- \`break main\` lalu \`run\`
- \`info registers\` untuk melihat semuanya
- \`stepi\` untuk maju satu instruksi, lalu lihat lagi

Melihat angkanya berubah satu instruksi demi satu instruksi membuat konsep ini berhenti abstrak.` },
      { judul: 'Amati apa yang dilakukan ALU',
        isi: `Cari instruksi \`add\`, \`sub\`, \`imul\`, \`cmp\`, dan \`and\` di assembly-mu.

Semua itu dikerjakan **ALU**. Perhatikan bahwa \`cmp\` sebenarnya pengurangan yang hasilnya dibuang — yang disimpan hanya **flag**-nya.

Lalu cari \`jz\`, \`jne\`, atau \`jg\` tepat sesudahnya. Itulah cara percabangan \`if\`-mu diwujudkan: bandingkan, lalu lompat berdasarkan flag.` },
      { judul: 'Hitung sendiri hierarki kecepatannya',
        isi: `Catat perkiraan waktu akses:

- register — kurang dari satu siklus
- cache L1 — sekitar 4 siklus
- RAM — sekitar 200 siklus
- SSD — puluhan ribu siklus

Selisih register ke RAM sekitar **dua ratus kali**. Itu sebabnya kompiler bekerja sangat keras menjaga data tetap di register.` }
    ],
    cek: [
      'Kamu bisa menunjukkan register mana yang membawa nilai kembalian fungsimu',
      'Versi -O2 menghasilkan assembly yang lebih pendek daripada -O0 untuk kode yang sama',
      'Kamu sudah melihat isi register berubah saat melangkah satu instruksi di debugger'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**CPU** (*Central Processing Unit*) adalah komponen pengolah data berdasarkan instruksi yang diberikan kepadanya. Di dalamnya ada **empat komponen utama**:

- **ALU** (*Arithmetic and Logic Unit*) — melakukan perhitungan aritmetika dan operasi logika. Inilah satu-satunya bagian yang benar-benar **menghitung**; komponen lain hanya memindahkan dan mengatur.
- **Control Unit** — mengatur urutan kerja seluruh bagian, menafsirkan instruksi, dan menghasilkan sinyal kontrol.
- **Register** — penyimpan berkecepatan sangat tinggi di dalam CPU.
- **Interkoneksi CPU** — jalur yang menghubungkan ketiganya, sering disebut *internal bus*.

**Register — kenapa perlu ada?**

Kalau sudah ada memori utama, kenapa CPU masih butuh penyimpanan sendiri? Karena **memori utama terlalu lambat**. Satu akses ke memori bisa memakan ratusan detak, sedangkan register bisa dibaca dalam **satu detak**.

Register terbagi dua kelompok:

**Register untuk pemrogram** (terlihat di arsitektur):

- **Register data umum** — menyimpan nilai yang sedang diolah
- **Register alamat** — menyimpan alamat memori
- **Accumulator** — register khusus penampung hasil operasi ALU

**Register kontrol dan status** (tidak terlihat pemrogram, tapi wajib dipahami):

- **PC** (*Program Counter*) — menyimpan alamat instruksi **berikutnya**. Nilainya bertambah setiap kali CPU membaca instruksi.
- **IR** (*Instruction Register*) — menyimpan instruksi yang **sedang** dikerjakan.
- **MAR** (*Memory Address Register*) — alamat yang sedang diakses di memori.
- **MBR** (*Memory Buffer Register*) — data yang baru dibaca dari, atau akan ditulis ke, memori.
- **PSW** (*Program Status Word*) — kumpulan penanda hasil operasi: apakah hasilnya nol, negatif, ada limpahan, dan seterusnya.

**PC dan IR adalah pasangan yang wajib dikuasai.** PC menunjuk ke **masa depan** (instruksi berikutnya), IR menyimpan **masa kini** (instruksi yang sedang jalan). Keduanya sangat sering tertukar di ujian.

**Empat jenis aksi CPU**

Apa pun instruksinya, aksi CPU selalu jatuh ke salah satu dari empat golongan ini:

- **CPU ke memori** — memindahkan data dari CPU ke memori atau sebaliknya
- **CPU ke I/O** — memindahkan data dari CPU ke modul I/O atau sebaliknya
- **Pengolahan data** — membentuk operasi aritmetika atau logika terhadap data
- **Kontrol** — mengubah urutan eksekusi, misalnya melompat ke instruksi lain
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# PC menunjuk MASA DEPAN, IR menyimpan MASA KINI\n\nPC = 0      # alamat instruksi BERIKUTNYA yang akan diambil\nIR = None   # instruksi yang SEDANG dikerjakan\n\nmemori = ["LOAD 10", "ADD 11", "STORE 12", "HALT"]\n\n# Satu putaran pengambilan instruksi:\nIR = memori[PC]     # ambil instruksi yang ditunjuk PC\nPC = PC + 1         # PC langsung maju, SEBELUM IR dikerjakan\n\nprint("IR (sedang dikerjakan):", IR)   # LOAD 10\nprint("PC (berikutnya)      :", PC)    # 1',
      penjelasan: `
Perhatikan urutannya baik-baik, karena inilah yang paling sering salah dipahami: **PC dinaikkan sebelum instruksinya dikerjakan**, bukan sesudah.

Kenapa begitu? Karena instruksi yang sedang dikerjakan **mungkin ingin mengubah PC**. Instruksi lompat seperti \`JMP 20\` bekerja dengan menimpa isi PC. Kalau PC baru dinaikkan sesudah eksekusi, kenaikan itu akan merusak hasil lompatan.

Dengan menaikkan PC lebih dulu, urutannya jadi rapi: PC otomatis menunjuk instruksi berikutnya, dan instruksi lompat tinggal menimpanya kalau perlu.

Sekarang bedakan keduanya dengan tegas, karena ini bahan ujian yang hampir pasti muncul:

- **PC menyimpan ALAMAT**, yaitu nomor lokasi di memori. Isinya angka penunjuk.
- **IR menyimpan INSTRUKSINYA SENDIRI**, yaitu kode biner yang sudah diambil dari lokasi itu.

Analoginya, PC adalah **nomor halaman** yang akan kamu baca berikutnya, sedangkan IR adalah **kalimat** yang sedang kamu baca sekarang.

Dua register lain melengkapi pasangan ini saat berurusan dengan memori:

- **MAR** menyimpan alamat yang sedang diakses — ia yang dikirim ke bus alamat.
- **MBR** menyimpan datanya — ia yang lewat bus data.

Jadi saat pengambilan instruksi berlangsung, alurnya: isi PC disalin ke MAR, memori membaca alamat itu, isinya masuk ke MBR, lalu dipindahkan ke IR. Empat register bekerja sama untuk satu langkah yang terlihat sederhana.
`
    },
    {
      bahasa: 'python',
      kode: '# Kenapa register ada, padahal sudah ada memori?\n# Jawabannya: selisih kecepatan yang sangat besar\n\nhierarki = [\n    ("Register",      "1 detak",        "beberapa ratus byte"),\n    ("Cache L1",      "3-4 detak",      "32-64 KB"),\n    ("Cache L2",      "10-20 detak",    "256 KB - 1 MB"),\n    ("Cache L3",      "40-50 detak",    "8-32 MB"),\n    ("Memori Utama",  "200-300 detak",  "8-32 GB"),\n    ("SSD",           "puluhan ribu",   "512 GB - 2 TB"),\n]\n\nfor nama, waktu, ukuran in hierarki:\n    print(nama.ljust(14) + waktu.ljust(17) + ukuran)',
      penjelasan: `
Angka-angka ini menjelaskan kenapa seluruh rancangan CPU terlihat seperti sekarang.

Perhatikan pola yang muncul di kedua kolom: **makin cepat, makin kecil, dan makin mahal.** Ini bukan kebetulan atau kemalasan perancang — ia akibat hukum fisika dan ekonomi:

- Penyimpanan cepat butuh rangkaian rumit dan banyak transistor per bit, jadi mahal per byte.
- Penyimpanan cepat harus **dekat secara fisik** dengan CPU, karena sinyal listrik butuh waktu menempuh jarak. Ruang di dekat CPU sangat terbatas.

Bandingkan ujung ke ujung: register bisa dibaca dalam **1 detak**, memori utama butuh **200 sampai 300 detak**. Selisihnya ratusan kali lipat.

Artinya, kalau CPU harus mengambil data dari memori utama setiap kali menghitung, ia akan **menganggur ratusan detak** untuk tiap operasi. Prosesor secepat apa pun jadi percuma.

Register adalah jawaban paling langsung: simpan nilai yang sedang diolah **di dalam CPU itu sendiri**. Instruksi seperti \`ADD R1, R2\` sama sekali tidak menyentuh memori, sehingga selesai dalam hitungan detak.

Itu pula sebabnya jumlah register selalu sedikit — biasanya belasan sampai puluhan. Menambah register berarti menambah rangkaian di ruang tersempit dan termahal di seluruh komputer.

Kamu akan bertemu lagi dengan tabel ini di topik **hierarki memori**, di mana cache mengisi celah menganga antara register dan memori utama.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menirukan struktur internal CPU
# ============================================

class CPU:
    def __init__(self, memori):
        # ---------- Register kontrol & status ----------
        self.PC  = 0        # alamat instruksi BERIKUTNYA
        self.IR  = None     # instruksi yang SEDANG dikerjakan
        self.MAR = 0        # alamat yang sedang diakses
        self.MBR = None     # data yang lewat ke/dari memori

        # ---------- Register untuk pemrogram ----------
        self.AC = 0         # accumulator, penampung hasil ALU

        # ---------- Penanda status (PSW) ----------
        self.zero = False
        self.negatif = False

        self.memori = memori
        self.jalan = True

    # ---------- ALU: satu-satunya yang MENGHITUNG ----------
    def alu(self, operasi, a, b):
        if operasi == "ADD":
            hasil = a + b
        elif operasi == "SUB":
            hasil = a - b
        elif operasi == "AND":
            hasil = a & b
        else:
            raise ValueError("operasi tidak dikenal: " + operasi)

        # ALU juga memperbarui penanda status
        self.zero = (hasil == 0)
        self.negatif = (hasil < 0)
        return hasil

    # ---------- Membaca memori lewat MAR dan MBR ----------
    def baca_memori(self, alamat):
        self.MAR = alamat              # alamat keluar lewat bus alamat
        self.MBR = self.memori[alamat] # data masuk lewat bus data
        return self.MBR

    # ---------- Control unit: mengatur, tidak menghitung ----------
    def satu_siklus(self):
        # FETCH -- PC dinaikkan SEBELUM instruksi dikerjakan,
        # supaya instruksi lompat bisa menimpanya
        self.IR = self.baca_memori(self.PC)
        self.PC = self.PC + 1

        # DECODE
        bagian = self.IR.split()
        opcode = bagian[0]
        operand = int(bagian[1]) if len(bagian) > 1 else None

        # EXECUTE
        if opcode == "LOAD":
            self.AC = self.baca_memori(operand)
        elif opcode == "ADD":
            self.AC = self.alu("ADD", self.AC, self.baca_memori(operand))
        elif opcode == "STORE":
            self.memori[operand] = self.AC
        elif opcode == "JMP":
            self.PC = operand          # menimpa PC -- inilah lompatan
        elif opcode == "HALT":
            self.jalan = False


# memori: instruksi dan data di ruang yang SAMA (von Neumann)
mem = ["LOAD 6", "ADD 7", "STORE 8", "HALT", 0, 0, 12, 30, 0]

cpu = CPU(mem)
while cpu.jalan:
    sebelum = cpu.PC
    cpu.satu_siklus()
    print("PC " + str(sebelum) + " -> " + str(cpu.PC) +
          " | IR=" + str(cpu.IR).ljust(9) +
          " | AC=" + str(cpu.AC))

print("Hasil tersimpan di alamat 8:", mem[8])`
  },

  output: `PC 0 -> 1 | IR=LOAD 6    | AC=12
PC 1 -> 2 | IR=ADD 7     | AC=42
PC 2 -> 3 | IR=STORE 8   | AC=42
PC 3 -> 4 | IR=HALT      | AC=42
Hasil tersimpan di alamat 8: 42`,

  kesalahanUmum: [
    {
      salah: 'Menukar PC dengan IR saat menjelaskan pengambilan instruksi.',
      kenapa: 'Keduanya sama-sama berurusan dengan instruksi sehingga mudah tertukar. Padahal isinya berbeda jenis: PC berisi alamat berupa angka penunjuk, sedangkan IR berisi instruksinya sendiri berupa kode biner. Menukarnya membuat penjelasan siklus instruksi jadi tidak masuk akal.',
      benar: 'PC menyimpan alamat instruksi berikutnya, IR menyimpan instruksi yang sedang dikerjakan. PC menunjuk masa depan, IR memegang masa kini.'
    },
    {
      salah: 'Mengira PC dinaikkan setelah instruksi selesai dieksekusi.',
      kenapa: 'Kalau begitu urutannya, instruksi lompat akan rusak: JMP menimpa PC dengan alamat tujuan, lalu kenaikan sesudahnya membuat CPU melompat ke alamat yang meleset satu. Kesalahan ini baru terlihat saat menelusuri program bercabang, bukan pada program lurus.',
      benar: 'PC dinaikkan segera setelah instruksi diambil, sebelum dieksekusi. Dengan begitu instruksi lompat tinggal menimpanya.'
    },
    {
      salah: 'Mengira control unit yang melakukan perhitungan.',
      kenapa: 'Namanya terdengar seperti pusat segalanya, sehingga terasa wajar menganggapnya juga menghitung. Padahal control unit hanya menafsirkan instruksi dan mengeluarkan sinyal kontrol. Yang benar-benar menghitung hanya ALU.',
      benar: 'ALU menghitung, control unit memerintah. Control unit menentukan operasi apa yang harus dilakukan ALU, tetapi tidak melakukannya sendiri.'
    },
    {
      salah: 'Menganggap register cuma versi kecil dari memori utama, jadi bisa diperbanyak sesuka hati.',
      kenapa: 'Register jauh lebih mahal per bit dan harus berada sangat dekat dengan CPU, sedangkan ruang di situ paling terbatas di seluruh komputer. Menambah register berarti menambah rangkaian, memperbesar keping, dan menaikkan harga. Itu sebabnya jumlahnya hanya belasan sampai puluhan.',
      benar: 'Pahami sebagai pertukaran: makin cepat berarti makin kecil dan makin mahal. Register cepat justru karena sedikit dan dekat.'
    },
    {
      salah: 'Melupakan MAR dan MBR saat menjelaskan bagaimana CPU mengakses memori.',
      kenapa: 'Keduanya tidak terlihat pemrogram sehingga mudah dianggap tidak penting. Padahal tanpa keduanya, penjelasan bagaimana alamat keluar dan data masuk jadi menggantung. MAR yang mengisi bus alamat, MBR yang menampung isi bus data.',
      benar: 'Sebutkan alurnya lengkap: isi PC disalin ke MAR, memori dibaca, isinya masuk ke MBR, lalu dipindahkan ke IR.'
    }
  ],

  analogi: `Bayangkan seorang juru masak di dapur.

**Control Unit** adalah **kepala koki**. Dia tidak memegang wajan. Tugasnya membaca resep, memutuskan langkah berikutnya, dan memerintah siapa mengerjakan apa.

**ALU** adalah **tukang masak**. Dia satu-satunya yang benar-benar mengaduk, memotong, dan menggoreng. Tetapi dia tidak pernah memutuskan sendiri — dia menunggu perintah kepala koki.

**Register** adalah **meja kecil di sebelah kompor**. Muat cuma beberapa mangkuk, tapi tinggal julurkan tangan. Bahan yang sedang dipakai ditaruh di situ.

**Memori utama** adalah **gudang di ujung lorong**. Muat segalanya, tetapi harus berjalan ke sana. Itulah sebabnya tukang masak tidak bolak-balik ke gudang untuk tiap sendok garam.

Sekarang untuk **PC dan IR**, bayangkan kepala koki memegang buku resep:

- **PC** adalah **jarinya yang menunjuk baris berikutnya** yang akan dibaca. Isinya cuma penunjuk posisi.
- **IR** adalah **kalimat yang sedang dia baca keras-keras** kepada tukang masak. Isinya perintahnya sendiri.

Dan kenapa jari langsung digeser sebelum perintahnya selesai dikerjakan? Karena beberapa perintah berbunyi *"lompat ke halaman 20"*. Kalau jarinya baru digeser sesudah perintah itu dijalankan, geseran itu justru merusak lompatannya — dia akan mendarat di baris 21, bukan 20.

**MAR dan MBR** adalah **kertas pesanan dan nampan**. Kepala koki menulis nomor rak di kertas, pelayan membawanya ke gudang, lalu kembali membawa nampan berisi barangnya.`,

  latihan: [
    'Sebutkan empat komponen utama CPU beserta tugas masing-masing, lalu tunjukkan mana yang benar-benar melakukan perhitungan.',
    'Jelaskan perbedaan PC dan IR, termasuk jenis isi masing-masing. Kenapa keduanya sering tertukar?',
    'Jelaskan kenapa PC harus dinaikkan sebelum instruksi dieksekusi, bukan sesudahnya. Gunakan contoh instruksi lompat.',
    'Telusuri jalannya program berikut langkah demi langkah, catat isi PC, IR, dan AC di tiap langkah: LOAD 5, ADD 6, STORE 7, HALT, dengan alamat 5 berisi 8 dan alamat 6 berisi 4.',
    'Jelaskan peran MAR dan MBR saat CPU membaca satu instruksi dari memori, mulai dari isi PC sampai instruksinya berada di IR.'
  ]
});

TOPICS.push({
  id: 'orkom-siklus-instruksi',
  judul: 'Siklus Instruksi — Fetch & Execute',
  kategori: 'orkom',
  tag: ['siklus instruksi', 'fetch', 'execute', 'decode', 'IAC', 'IOD', 'OAC'],
  ringkas: 'Putaran yang dikerjakan prosesor miliaran kali per detik, dan tujuh tahap di dalamnya.',

  fungsi: `**Memahami langkah yang diulang prosesor miliaran kali per detik.**

Setiap instruksi melewati siklus yang sama: **ambil, kode, jalankan, simpan**.

Terpakai di:

- **Memahami pipeline** — kenapa prosesor modern bisa mengerjakan beberapa instruksi sekaligus
- **Memahami interupsi** — kapan tepatnya prosesor boleh dialihkan ke pekerjaan lain
- **Sistem Operasi** — penjadwalan bekerja dengan menyela siklus ini
- **Menjelaskan kenapa percabangan mahal** — pipeline harus dikosongkan kalau tebakannya salah

Yang paling berguna dipahami: **prediksi percabangan**. Prosesor menebak arah \`if\` sebelum tahu jawabannya, supaya pipeline tetap penuh. Kalau tebakannya salah, pekerjaan yang sudah dimulai dibuang.

Ini menjelaskan hasil yang mengejutkan: **memproses array yang sudah terurut bisa jauh lebih cepat daripada array acak**, meski jumlah operasinya sama persis.`,

  praktik: {
    tujuan: `Kamu sudah mengukur sendiri pengaruh prediksi percabangan, dan bisa menjelaskan kenapa data terurut lebih cepat diproses.`,
    alat: [
      'C++ dengan g++',
      'Python 3 untuk pembanding',
      'Modul waktu berpresisi tinggi'
    ],
    langkah: [
      { judul: 'Tulis keempat tahapnya sebagai kalimat',
        isi: `- **Fetch** — ambil instruksi dari alamat yang ditunjuk program counter
- **Decode** — terjemahkan menjadi sinyal kendali
- **Execute** — ALU mengerjakannya
- **Writeback** — simpan hasilnya ke register atau memori

Lalu program counter bertambah, dan siklusnya berulang.` },
      { judul: 'Gambarkan pipeline di kertas',
        isi: `Buat tabel: baris untuk instruksi, kolom untuk siklus waktu.

Tanpa pipeline, instruksi kedua baru mulai setelah yang pertama selesai — empat siklus per instruksi.

Dengan pipeline, instruksi kedua mulai **saat instruksi pertama masuk tahap decode**. Setelah pipeline penuh, satu instruksi selesai **tiap siklus**.

Hitung sendiri: berapa siklus untuk sepuluh instruksi, dengan dan tanpa pipeline?` },
      { judul: 'Ukur pengaruh prediksi percabangan',
        isi: `Buat array 32.768 angka acak antara 0 dan 255. Jumlahkan hanya yang nilainya di atas 128, dan ukur waktunya.

Lalu **urutkan array itu** dan jalankan penjumlahan yang sama persis. Ukur lagi.

Yang terurut akan jauh lebih cepat — pada C++ sering **tiga sampai enam kali**. Jumlah operasinya identik.` },
      { judul: 'Jelaskan hasilnya',
        isi: `Pada array acak, prosesor **tidak bisa menebak** apakah \`if\` akan benar atau salah. Tebakannya salah sekitar separuh waktu, dan tiap kesalahan mengosongkan pipeline.

Pada array terurut, jawabannya **selalu salah** untuk paruh pertama lalu **selalu benar** untuk paruh kedua. Prediksinya hampir selalu tepat.

Ini salah satu hasil paling terkenal dalam pemrograman kinerja, dan kamu baru saja mengukurnya sendiri.` },
      { judul: 'Coba menghilangkan percabangannya',
        isi: `Ganti \`if (a[i] > 128) total += a[i];\` dengan bentuk tanpa cabang:

- \`int t = (a[i] - 128) >> 31; total += ~t & a[i];\`

Ukur lagi pada array acak. Sekarang kecepatannya mendekati versi terurut, karena **tidak ada cabang untuk ditebak**.

Ini teknik nyata yang dipakai pada kode yang menuntut kinerja tinggi.` },
      { judul: 'Kenali jenis hazard',
        isi: `Tiga hal yang membuat pipeline tersendat:

- **Data hazard** — instruksi butuh hasil instruksi sebelumnya yang belum selesai
- **Control hazard** — percabangan, seperti yang baru kamu ukur
- **Structural hazard** — dua instruksi butuh sumber daya yang sama

Prosesor modern mengatasi sebagian besar dengan penerusan hasil dan eksekusi tak berurutan, tetapi cabang yang salah tebak tetap mahal.` }
    ],
    cek: [
      'Array terurut terbukti lebih cepat diproses daripada array acak dengan jumlah operasi sama',
      'Kamu bisa menghitung berapa siklus dibutuhkan sepuluh instruksi dengan dan tanpa pipeline',
      'Versi tanpa cabang mendekati kecepatan versi terurut pada data acak'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Fungsi CPU adalah menjalankan program yang tersimpan di memori utama, dengan cara **mengambil instruksi, menguji instruksi tersebut, dan mengeksekusinya satu per satu** sesuai alur perintah.

Pandangan paling sederhananya terdiri atas **dua langkah** yang berulang tanpa henti:

- **Fetch** — operasi pembacaan instruksi dari memori
- **Execute** — operasi pelaksanaan instruksi

Putaran ini disebut **siklus instruksi**, dan prosesor modern mengerjakannya **miliaran kali per detik**.

**Bagaimana fetch bekerja**

Pada setiap siklus, CPU membaca instruksi dari memori. Yang mengawasi dan menghitung instruksi berikutnya adalah register **PC** (*Program Counter*). **PC bertambah satu setiap kali CPU membaca instruksi.**

Instruksi yang dibaca ditempatkan di register **IR** (*Instruction Register*). Isinya berupa **kode biner** yang kemudian ditafsirkan CPU, lalu dilakukan aksi yang diperlukan.

**Tujuh tahap siklus eksekusi**

Kalau dua langkah tadi dirinci, ada tujuh tahap. Ini bahan ujian yang hampir pasti muncul, jadi hafalkan singkatannya:

- **IAC** (*Instruction Address Calculation*) — menentukan alamat instruksi berikutnya. Biasanya dengan menambahkan bilangan tetap ke alamat sebelumnya. Contoh: bila panjang tiap instruksi 16 bit sedangkan tiap sel memori 8 bit, maka **tambahkan 2** ke alamat sebelumnya.
- **IF** (*Instruction Fetch*) — membaca instruksi dari lokasi memorinya ke CPU.
- **IOD** (*Instruction Operation Decoding*) — menganalisa instruksi untuk menentukan jenis operasi yang akan dibentuk dan operand yang akan digunakan.
- **OAC** (*Operand Address Calculation*) — menentukan alamat operand. Dilakukan **hanya bila** instruksinya melibatkan referensi operand di memori.
- **OF** (*Operand Fetch*) — mengambil operand dari memori atau dari modul I/O.
- **DO** (*Data Operation*) — membentuk operasi yang diperintahkan instruksi. **Inilah tahap yang dikerjakan ALU.**
- **OS** (*Operand Store*) — menyimpan hasil eksekusi ke memori.

Perhatikan bahwa **tidak semua instruksi melewati ketujuh tahap**. Instruksi \`HALT\` berhenti setelah decoding. Instruksi yang operandnya sudah ada di register melewatkan OAC dan OF. Tahap OS hanya dijalankan kalau memang ada hasil yang perlu disimpan.

**Empat jenis aksi CPU**

Apa pun instruksinya, aksinya selalu jatuh ke salah satu golongan:

- **CPU ke memori** — perpindahan data dari CPU ke memori atau sebaliknya
- **CPU ke I/O** — perpindahan data dari CPU ke modul I/O atau sebaliknya
- **Pengolahan data** — operasi aritmetika dan logika terhadap data
- **Kontrol** — instruksi pengontrolan, misalnya mengubah urutan eksekusi
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Siklus instruksi versi paling sederhana\n\nwhile berjalan:\n    instruksi = memori[PC]     # FETCH\n    PC = PC + 1                # PC maju\n    eksekusi(instruksi)        # EXECUTE\n\n# Putaran ini berjalan MILIARAN kali per detik.\n# Prosesor 3 GHz -> 3 miliar detak per detik.',
      penjelasan: `
Seluruh isi mata kuliah ini pada akhirnya bermuara pada tiga baris di dalam \`while\` itu.

Yang membuatnya menakjubkan bukan kerumitannya, melainkan **kesederhanaannya**. Prosesor tidak pernah "memahami" programmu. Ia hanya mengulang: ambil, majukan penunjuk, kerjakan. Terus-menerus, tanpa henti, sampai listriknya dicabut.

Semua yang kamu lihat di layar — permainan, peramban, pemutar musik — adalah putaran ini yang dikerjakan miliaran kali per detik dengan isi memori yang berbeda-beda.

Perhatikan lagi bahwa **PC dinaikkan di antara fetch dan execute**, bukan sesudah keduanya. Alasannya sudah dibahas di topik CPU: instruksi lompat bekerja dengan menimpa PC, dan kenaikan yang datang belakangan akan merusaknya.

Soal kecepatan: prosesor 3 GHz berarti **3 miliar detak per detik**. Tetapi hati-hati, **satu instruksi belum tentu satu detak**. Instruksi sederhana bisa selesai dalam satu detak, sedangkan instruksi yang harus mengambil data dari memori utama bisa menunggu ratusan detak.

Karena itulah ukuran kecepatan yang lebih jujur adalah **IPC** (*instructions per cycle*), bukan sekadar angka GHz. Prosesor 3 GHz dengan IPC tinggi bisa mengalahkan prosesor 4 GHz dengan IPC rendah — dan inilah sebabnya perbandingan prosesor tidak pernah cukup dengan melihat angka gigahertz-nya saja.
`
    },
    {
      bahasa: 'python',
      kode: '# Kenapa IAC menambahkan 2, bukan 1?\n#\n# Panjang instruksi : 16 bit\n# Lebar sel memori  : 8 bit  (1 byte per alamat)\n#\n#  alamat | isi\n#  -------+---------------------------\n#    100  | 8 bit pertama instruksi A\n#    101  | 8 bit kedua   instruksi A\n#    102  | 8 bit pertama instruksi B   <- instruksi berikutnya\n#\n# Jadi PC harus melompat 2, bukan 1.\n\nPANJANG_INSTRUKSI = 16   # bit\nLEBAR_SEL = 8            # bit per alamat\nlangkah = PANJANG_INSTRUKSI // LEBAR_SEL     # = 2\nPC = PC + langkah',
      penjelasan: `
Contoh ini diambil langsung dari slide kuliah, dan sering ditanyakan karena jawabannya berlawanan dengan dugaan.

Naluri pertama menyuruh menambahkan **1**, karena "instruksi berikutnya" terdengar seperti "yang sebelah". Tetapi yang bertambah satu adalah **alamat**, dan satu alamat belum tentu memuat satu instruksi utuh.

Kuncinya: **alamat memori menunjuk ke byte, bukan ke instruksi.** Kalau satu instruksi butuh 16 bit sedangkan satu alamat hanya memuat 8 bit, maka satu instruksi menempati **dua alamat**. Untuk melompat ke instruksi berikutnya, PC harus bertambah 2.

Rumus umumnya: **langkah = panjang instruksi dibagi lebar sel memori.** Instruksi 32 bit pada memori byte-addressable berarti langkahnya 4.

Ini juga menjelaskan istilah yang akan sering kamu temui:

- **Byte-addressable** — tiap alamat menunjuk satu byte. Hampir semua komputer modern begini.
- **Word-addressable** — tiap alamat menunjuk satu word yang lebih besar.

Ada satu kerumitan tambahan yang layak diketahui. Pada arsitektur **CISC** seperti x86, **panjang instruksi tidak tetap** — ada yang 1 byte, ada yang 15 byte. Akibatnya CPU tidak bisa sekadar menambah bilangan tetap; ia baru tahu panjangnya **setelah** instruksi itu didekode.

Pada **RISC**, panjang instruksi seragam, biasanya 4 byte. Itu sebabnya perancangan RISC lebih mudah dibuat pipeline: prosesor bisa mengambil instruksi berikutnya tanpa menunggu yang sekarang selesai didekode.
`
    },
    {
      bahasa: 'python',
      kode: '# Tidak semua instruksi melewati ketujuh tahap\n\n# ADD R1, [200]  -> operand ada di MEMORI, tahap lengkap\n#   IAC -> IF -> IOD -> OAC -> OF -> DO -> OS\n\n# ADD R1, R2     -> operand sudah di REGISTER\n#   IAC -> IF -> IOD ->  --   --  -> DO  --\n#                     (OAC, OF, OS dilewati)\n\n# HALT           -> berhenti setelah dikenali\n#   IAC -> IF -> IOD',
      penjelasan: `
Tujuh tahap itu adalah **daftar kemungkinan**, bukan urutan wajib yang selalu dilalui.

Perhatikan ketiga contohnya:

**\`ADD R1, [200]\`** menjumlahkan isi register dengan isi alamat 200. Karena operandnya ada di memori, CPU harus menghitung alamatnya (**OAC**), mengambilnya (**OF**), lalu menyimpan hasilnya kembali (**OS**). Lengkap tujuh tahap.

**\`ADD R1, R2\`** menjumlahkan dua register. Operandnya **sudah ada di dalam CPU**, jadi tidak ada alamat yang perlu dihitung dan tidak ada yang perlu diambil dari memori. OAC, OF, dan OS dilewati.

**\`HALT\`** tidak mengolah apa pun. Setelah dikenali di tahap decoding, CPU langsung berhenti.

Dari sini muncul pemahaman penting: **instruksi yang menyentuh memori jauh lebih mahal** daripada instruksi yang hanya bermain di register. Bukan karena operasinya lebih rumit — penjumlahannya sama saja — melainkan karena ada tiga tahap tambahan, dan tahap OF bisa memakan ratusan detak kalau datanya tidak ada di cache.

Inilah alasan teknis di balik nasihat yang sering kamu dengar di pemrograman: **simpan nilai yang dipakai berulang di variabel lokal**, jangan membacanya berulang kali dari struktur data yang besar. Kompiler akan berusaha menaruh variabel lokal itu di register, sehingga tahap-tahap mahal tadi bisa dilewati.

Ini juga menjelaskan kenapa arsitektur RISC disebut *load-store*: hanya instruksi \`LOAD\` dan \`STORE\` yang boleh menyentuh memori, sisanya wajib bekerja antar-register. Dengan begitu, tahap mana yang mahal jadi jelas terpisah dan mudah dioptimalkan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Siklus instruksi tujuh tahap, dilacak langkah demi langkah
# ============================================

PANJANG_INSTRUKSI = 16      # bit
LEBAR_SEL = 8               # bit per alamat -> 1 instruksi = 2 alamat
LANGKAH = PANJANG_INSTRUKSI // LEBAR_SEL

# Memori: instruksi memakai dua alamat, data memakai satu
memori = {
    100: ("LOAD", 200),     # ambil isi alamat 200 ke AC
    102: ("ADD",  201),     # tambahkan isi alamat 201
    104: ("STORE", 202),    # simpan AC ke alamat 202
    106: ("HALT", None),
    200: 12,
    201: 30,
    202: 0,
}

PC = 100
IR = None
AC = 0
jejak = []

while True:
    # ---------- IAC: hitung alamat instruksi berikutnya ----------
    alamat_ini = PC
    PC = PC + LANGKAH

    # ---------- IF: ambil instruksi ----------
    IR = memori[alamat_ini]

    # ---------- IOD: tafsirkan ----------
    opcode, operand = IR
    tahap = ["IAC", "IF", "IOD"]

    if opcode == "HALT":
        jejak.append((alamat_ini, opcode, tahap, AC))
        break

    # ---------- OAC + OF: hanya bila operand ada di memori ----------
    nilai = None
    if opcode in ("LOAD", "ADD"):
        tahap.append("OAC")
        tahap.append("OF")
        nilai = memori[operand]

    # ---------- DO: dikerjakan ALU ----------
    tahap.append("DO")
    if opcode == "LOAD":
        AC = nilai
    elif opcode == "ADD":
        AC = AC + nilai
    elif opcode == "STORE":
        pass                # tidak ada hitungan, langsung simpan

    # ---------- OS: hanya bila ada yang perlu disimpan ----------
    if opcode == "STORE":
        tahap.append("OS")
        memori[operand] = AC

    jejak.append((alamat_ini, opcode, tahap, AC))

for alamat, opcode, tahap, ac in jejak:
    print(str(alamat).ljust(5) + opcode.ljust(7) +
          " -> ".join(tahap).ljust(38) + "AC=" + str(ac))

print("")
print("Hasil di alamat 202 :", memori[202])
print("Perhatikan PC melompat 2, karena 1 instruksi = 2 alamat.")`
  },

  output: `100  LOAD   IAC -> IF -> IOD -> OAC -> OF -> DO   AC=12
102  ADD    IAC -> IF -> IOD -> OAC -> OF -> DO   AC=42
104  STORE  IAC -> IF -> IOD -> DO -> OS          AC=42
106  HALT   IAC -> IF -> IOD                      AC=42

Hasil di alamat 202 : 42
Perhatikan PC melompat 2, karena 1 instruksi = 2 alamat.`,

  kesalahanUmum: [
    {
      salah: 'Mengira PC selalu bertambah satu setiap siklus.',
      kenapa: 'Alamat memori menunjuk ke byte, bukan ke instruksi. Kalau satu instruksi butuh 16 bit sedangkan satu alamat memuat 8 bit, instruksi itu menempati dua alamat sehingga PC harus bertambah 2. Menjawab 1 pada soal ujian yang menyebutkan panjang instruksi dan lebar sel akan langsung salah.',
      benar: 'Hitung langkahnya: panjang instruksi dibagi lebar sel memori. Instruksi 16 bit pada memori 8 bit berarti langkahnya 2, instruksi 32 bit berarti 4.'
    },
    {
      salah: 'Mengira setiap instruksi selalu melewati ketujuh tahap siklus eksekusi.',
      kenapa: 'Tujuh tahap itu daftar kemungkinan, bukan urutan wajib. Instruksi yang operandnya sudah ada di register melewatkan OAC dan OF, instruksi yang tidak menghasilkan apa-apa melewatkan OS, dan HALT berhenti setelah decoding. Menjawab bahwa semuanya selalu tujuh tahap menunjukkan hafalan tanpa pemahaman.',
      benar: 'Sebutkan ketujuhnya sebagai kemungkinan, lalu jelaskan tahap mana yang dilewati untuk jenis instruksi tertentu beserta alasannya.'
    },
    {
      salah: 'Menyamakan jumlah detak dengan jumlah instruksi, lalu menyimpulkan prosesor 3 GHz menjalankan 3 miliar instruksi per detik.',
      kenapa: 'Satu instruksi bisa memakan lebih dari satu detak, terutama yang harus menunggu data dari memori utama. Sebaliknya prosesor modern juga bisa menyelesaikan lebih dari satu instruksi per detak lewat eksekusi paralel. Angka GHz saja tidak cukup untuk membandingkan kecepatan.',
      benar: 'Pakai ukuran IPC, yaitu instruksi per detak, bersama frekuensinya. Prosesor dengan GHz lebih rendah tapi IPC lebih tinggi bisa lebih cepat.'
    },
    {
      salah: 'Menganggap tahap DO dikerjakan oleh control unit.',
      kenapa: 'Control unit hanya menentukan operasi apa yang harus dilakukan dan mengeluarkan sinyal kontrolnya. Yang benar-benar membentuk operasi aritmetika atau logika pada tahap DO adalah ALU. Menukar keduanya membuat pembagian tugas di dalam CPU jadi kabur.',
      benar: 'DO adalah tahap milik ALU. Control unit mengatur seluruh tahap lain dan memerintahkan ALU, tetapi tidak menghitung sendiri.'
    }
  ],

  analogi: `Bayangkan seorang tukang yang bekerja dari lembar perintah.

Putarannya selalu sama, seumur hidup: **ambil lembar berikutnya, baca, kerjakan.** Lalu ulangi. Dia tidak pernah tahu sedang membangun apa — dia cuma mengerjakan satu lembar pada satu waktu.

Sekarang tujuh tahapnya, diterjemahkan ke pekerjaan tukang itu:

- **IAC** — melihat nomor lembar berikutnya di catatannya
- **IF** — mengambil lembar itu dari tumpukan
- **IOD** — membaca dan memahami perintahnya
- **OAC** — kalau perintahnya menyebut "bahan di rak nomor sekian", cari tahu di mana rak itu
- **OF** — berjalan ke rak dan mengambil bahannya
- **DO** — mengerjakan perintahnya
- **OS** — menaruh hasilnya kembali ke rak

Dari gambaran ini langsung terlihat kenapa **tidak semua lembar butuh tujuh tahap**. Perintah *"gabungkan dua benda yang sudah ada di mejamu"* tidak butuh berjalan ke rak sama sekali — tiga tahap terpotong. Dan perintah *"berhenti bekerja"* selesai begitu dibaca.

Terlihat juga kenapa **menyentuh memori itu mahal**: berjalan ke rak jauh lebih lama daripada mengambil dari meja sendiri, sekalipun pekerjaan yang dilakukan sesudahnya sama persis.

Terakhir, soal PC bertambah 2: bayangkan **satu perintah ditulis di dua lembar** karena kepanjangan. Untuk pindah ke perintah berikutnya, tukang itu harus melewati **dua** lembar, bukan satu. Nomor lembar dan nomor perintah bukan hal yang sama.`,

  latihan: [
    'Sebutkan tujuh tahap siklus eksekusi beserta kepanjangan singkatannya dan tugas masing-masing.',
    'Sebuah komputer punya panjang instruksi 32 bit dan memori yang tiap alamatnya memuat 8 bit. Berapa nilai yang ditambahkan ke PC setiap kali instruksi diambil? Tunjukkan perhitungannya.',
    'Untuk masing-masing instruksi berikut, sebutkan tahap mana yang dilalui dan mana yang dilewati beserta alasannya: ADD R1, R2 dan STORE R1, [500] dan HALT.',
    'Jelaskan kenapa PC harus dinaikkan di antara fetch dan execute, bukan sesudah keduanya selesai.',
    'Jelaskan kenapa prosesor 4 GHz belum tentu lebih cepat daripada prosesor 3 GHz. Sebutkan istilah yang dipakai untuk mengukurnya secara lebih jujur.'
  ]
});

TOPICS.push({
  id: 'orkom-cache',
  judul: 'Hierarki Memori & Cache',
  kategori: 'orkom',
  tag: ['hierarki memori', 'cache', 'hit ratio', 'lokalitas', 'blok', 'kapasitas'],
  ringkas: 'Kenapa komputer punya banyak jenis memori sekaligus, dan kenapa cache yang besar justru bisa memperlambat.',

  fungsi: `**Memahami kenapa dua program dengan jumlah operasi sama bisa berbeda kecepatan berkali-kali lipat.**

Jawabannya hampir selalu cache. Dan yang menentukan bukan berapa banyak data yang kamu sentuh, melainkan **urutan** menyentuhnya.

Terpakai di:

- **Menulis kode yang cepat** tanpa mengubah algoritmanya sama sekali
- **Memilih struktur data** — array sering mengalahkan linked list meski Big-O-nya sama
- **Pengolahan citra dan matriks** — urutan perulangan menentukan segalanya
- **Basis data** — ukuran halaman dan indeks dirancang mengikuti prinsip yang sama

Dua prinsip yang menjelaskan semuanya:

- **Lokalitas temporal** — yang baru dipakai kemungkinan dipakai lagi
- **Lokalitas spasial** — yang letaknya berdekatan kemungkinan dipakai berdekatan pula

Cache mengambil **seluruh baris** sekaligus, bukan satu byte. Jadi mengakses data yang berdekatan hampir gratis, dan melompat-lompat sangat mahal.`,

  praktik: {
    tujuan: `Kamu sudah mengukur sendiri pengaruh cache, dan bisa mempercepat program berkali-kali lipat hanya dengan mengubah urutan aksesnya.`,
    alat: [
      'C++ dengan g++ (selisihnya paling jelas di sini)',
      'Python 3 sebagai pembanding'
    ],
    langkah: [
      { judul: 'Cari ukuran cache komputermu',
        isi: `- Linux: \`lscpu | grep -i cache\`
- Windows: \`wmic cpu get L2CacheSize,L3CacheSize\`, atau pakai CPU-Z
- macOS: \`sysctl -a | grep cachesize\`

Catat ukuran L1, L2, dan L3. Angka ini akan menjelaskan hasil pengukuranmu nanti.` },
      { judul: 'Ukur baris lawan kolom pada matriks besar',
        isi: `Buat matriks 4000 kali 4000, lalu jumlahkan seluruh isinya dengan dua urutan perulangan:

- \`for i: for j: total += m[i][j]\` — mengikuti tata letak memori
- \`for j: for i: total += m[i][j]\` — melompat sejauh satu baris tiap langkah

Ukur keduanya. Selisihnya bisa **lima sampai sepuluh kali** di C++.

Jumlah operasinya **sama persis**. Yang berbeda cuma urutannya.` },
      { judul: 'Jelaskan kenapa',
        isi: `Matriks disimpan **baris demi baris** secara berurutan di memori.

Membaca \`m[i][j]\` lalu \`m[i][j+1]\` berarti membaca dua tempat bersebelahan — dan keduanya **sudah terbawa** dalam satu baris cache.

Membaca \`m[i][j]\` lalu \`m[i+1][j]\` berarti melompat sejauh ribuan byte — setiap akses adalah **cache miss** yang harus menunggu RAM.` },
      { judul: 'Temukan batas cache dari grafik',
        isi: `Ulangi pengukuran dengan array berukuran bertambah: 1 KB, 4 KB, 32 KB, 256 KB, 2 MB, 16 MB, 128 MB.

Akses tiap elemen berulang kali, lalu hitung waktu per akses.

Kamu akan melihat **lompatan mendadak** pada beberapa ukuran tertentu. Bandingkan dengan ukuran cache yang kamu catat di langkah pertama — lompatan itu terjadi saat datanya tidak lagi muat.` },
      { judul: 'Bandingkan array dan linked list',
        isi: `Jumlahkan satu juta angka yang disimpan sebagai \`vector\`, lalu sebagai linked list.

Keduanya \`O(n)\` menurut Big-O. Tetapi array menang telak, karena elemennya **berdekatan di memori** sedangkan simpul linked list tersebar.

Ini contoh penting bahwa **Big-O tidak menceritakan segalanya**.` },
      { judul: 'Terapkan pada satu kode nyatamu',
        isi: `Cari perulangan bersarang di tugas lamamu yang mengakses array dua dimensi.

Periksa urutan indeksnya. Kalau perulangan luar mengubah indeks kedua, tukar urutannya dan ukur lagi.

Ini optimasi yang **tidak mengubah logika sama sekali** — dan sering memberi percepatan terbesar dengan usaha terkecil.` }
    ],
    cek: [
      'Penjumlahan baris demi baris terbukti beberapa kali lebih cepat daripada kolom demi kolom',
      `Grafik waktu-per-akses menunjukkan lompatan pada ukuran yang mendekati ukuran cache komputermu`,
      'Array mengalahkan linked list dalam penjumlahan sejuta angka'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Kalau ada memori yang cepat, kenapa tidak semuanya dibuat begitu? Karena tiga sifat memori **saling bertentangan**:

- Makin **cepat**, makin **mahal** per bit
- Makin **besar** kapasitasnya, makin **lambat** aksesnya
- Makin **besar**, makin **murah** per bit

Tidak ada satu jenis memori yang cepat, besar, dan murah sekaligus. Jalan keluarnya adalah **memakai beberapa jenis sekaligus, disusun bertingkat** — itulah hierarki memori. Yang cepat dan kecil ditaruh dekat CPU, yang lambat dan besar ditaruh jauh.

**Kenapa hierarki ini bekerja: prinsip lokalitas**

Hierarki hanya masuk akal kalau program **cenderung mengakses hal yang itu-itu saja**. Dan memang begitu kenyataannya:

- **Lokalitas temporal** — data yang baru saja dipakai, kemungkinan besar akan dipakai lagi. Contohnya variabel penghitung di dalam perulangan.
- **Lokalitas spasial** — data yang letaknya berdekatan cenderung dipakai bersamaan. Contohnya elemen array yang diakses berurutan.

Kedua sifat inilah yang membuat cache berhasil. Kalau program mengakses memori secara benar-benar acak, cache tidak akan menolong sama sekali.

**Hit ratio**

Ukuran keberhasilan cache adalah **hit ratio**: berapa persen permintaan yang bisa dilayani cache tanpa perlu ke memori utama.

- **Hit** — data yang dicari **ada** di cache. Cepat.
- **Miss** — data **tidak ada**, harus diambil dari memori utama. Lambat.

Waktu akses rata-rata dihitung: **(hit ratio × waktu cache) + (miss ratio × waktu memori)**. Karena selisih waktu cache dan memori sangat besar, **kenaikan hit ratio sedikit saja berpengaruh besar** pada kecepatan keseluruhan.

**Cache bekerja per blok, bukan per byte**

Saat terjadi miss, cache **tidak** mengambil satu byte yang diminta saja. Ia mengambil **satu blok utuh** yang memuat byte itu. Ini langsung memanfaatkan lokalitas spasial: kalau kamu butuh elemen array ke-0, kemungkinan besar sebentar lagi kamu butuh elemen ke-1 sampai ke-7, dan semuanya sudah ikut terbawa.

**Enam elemen rancangan cache**

Slide kuliah menyebutnya sebagai unsur yang harus ditentukan saat merancang cache:

- **Kapasitas** — seberapa besar
- **Ukuran blok** — seberapa besar satuan yang dipindahkan
- **Pemetaan** — pemetaan langsung, asosiatif, atau asosiatif set
- **Algoritma penggantian** — LRU, FIFO, LFU, atau acak
- **Write policy** — write through, write back, atau write once
- **Jumlah cache** — satu atau dua tingkat; *unified* atau *split*

**Kapasitas: lebih besar tidak selalu lebih baik**

Ini bagian yang paling berlawanan dengan dugaan, dan sering ditanyakan.

**Makin besar kapasitas cache, makin lambat operasi cache itu sendiri**, karena mencari di antara lebih banyak saluran butuh rangkaian yang lebih rumit. Ditambah lagi harganya sangat mahal.

Slide kuliah memberi dua contoh nyata:

- **AMD K5 dan K6** memakai cache besar 1 MB, tetapi kinerjanya **tidak bagus**.
- **Intel Celeron** (sekitar 1998) dikeluarkan **tanpa cache** demi harga murah, dan kinerjanya **sangat buruk**, terutama untuk operasi data besar, floating point, dan 3D.

Sejumlah penelitian menganjurkan ukuran cache antara **1 KB dan 512 KB** sebagai yang lebih optimum [STA96].

**Ukuran blok** juga tidak punya nilai optimum pasti. Hubungannya dengan hit ratio sangat rumit dan bergantung pada karakteristik lokalitas programnya. Ukuran antara **4 hingga 8 satuan** yang dapat dialamati dianggap cukup mendekati optimum [STA96].
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Waktu akses rata-rata = (hit x waktu_cache) + (miss x waktu_memori)\n\nwaktu_cache  = 4      # detak\nwaktu_memori = 200    # detak\n\nfor hit in [0.50, 0.80, 0.90, 0.95, 0.99]:\n    miss = 1 - hit\n    rata = hit * waktu_cache + miss * waktu_memori\n    print("hit " + str(int(hit*100)) + "%  ->  " +\n          format(rata, ".1f") + " detak")',
      penjelasan: `
Jalankan angkanya dan perhatikan betapa **tidak seimbang** pengaruhnya.

Pada hit ratio 50%, waktu rata-ratanya sekitar 102 detak — hampir sama buruknya dengan tidak punya cache sama sekali. Pada 99%, waktunya turun menjadi sekitar 6 detak.

Yang menarik: **naik dari 90% ke 95% memangkas waktu jauh lebih banyak daripada naik dari 50% ke 55%**, meski kenaikan hit ratio-nya sama-sama 5 poin. Sebabnya, yang menentukan waktu total adalah **miss**, dan yang terjadi pada 90% ke 95% adalah miss-nya **berkurang separuh**, dari 10% menjadi 5%.

Ini pelajaran yang berlaku jauh di luar mata kuliah ini: kalau satu kejadian jauh lebih mahal daripada yang lain, **yang perlu kamu kejar adalah mengurangi jumlah kejadian mahal itu**, bukan mempercepat yang murah.

Terapannya langsung: mempercepat cache dari 4 detak menjadi 3 detak hampir tidak terasa. Menaikkan hit ratio dari 90% ke 95% terasa sekali. Karena itu perancang prosesor lebih banyak menghabiskan usaha pada **pemetaan dan algoritma penggantian** daripada pada kecepatan cache-nya sendiri.

Cara berpikir yang sama nanti kamu pakai lagi di Basis Data — di sana yang mahal adalah akses disk, dan seluruh gunanya indeks adalah mengurangi jumlah akses itu.
`
    },
    {
      bahasa: 'python',
      kode: '# Lokalitas spasial: kenapa cache mengambil satu BLOK, bukan satu byte\n\n# Akses berurutan -> ramah cache\ntotal = 0\nfor i in range(1000):\n    total = total + array[i]      # 1 miss, lalu 7 hit, berulang\n\n# Akses melompat-lompat -> memusnahkan cache\ntotal = 0\nfor i in range(0, 1000, 64):\n    total = total + array[i]      # hampir SELALU miss',
      penjelasan: `
Dua perulangan ini sama-sama menjumlahkan isi array, tetapi kecepatannya bisa berbeda **berkali-kali lipat**. Bedanya bukan pada jumlah operasi, melainkan pada **pola aksesnya**.

Pada perulangan pertama, saat \`array[0]\` diminta dan ternyata miss, cache **tidak mengambil satu elemen saja**. Ia mengambil **satu blok utuh** yang memuat elemen 0 sampai 7. Akibatnya tujuh akses berikutnya semuanya **hit** — gratis. Pola ini berulang, dan hit ratio-nya mendekati 87%.

Pada perulangan kedua, langkahnya 64 sehingga **setiap akses jatuh di blok yang berbeda**. Tiap akses berarti satu miss, dan tiap miss menyeret satu blok utuh dari memori — padahal yang dipakai cuma satu elemen dari blok itu. Sisanya terbuang percuma.

Inilah wujud nyata **lokalitas spasial**, dan ini punya akibat langsung pada cara kamu menulis program.

Contoh yang paling sering ditemui adalah **menelusuri matriks**. Menelusuri baris demi baris jauh lebih cepat daripada kolom demi kolom, karena di memori, matriks disimpan baris demi baris secara berurutan. Menelusuri per kolom berarti melompat sejauh satu baris penuh pada setiap langkah — persis pola perulangan kedua.

Perbedaannya bisa mencapai lima sampai sepuluh kali lipat pada matriks besar, **tanpa mengubah satu pun operasi yang dikerjakan**. Kamu akan bertemu lagi dengan hal ini di topik Array dan di Struktur Data, ketika membandingkan array dengan linked list: array menang bukan karena operasinya lebih sedikit, melainkan karena letaknya berurutan sehingga ramah cache.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menirukan cache sederhana, lalu mengukur hit ratio
# ============================================

UKURAN_BLOK = 8         # 8 elemen per blok
JUMLAH_SALURAN = 16     # kapasitas cache: 16 blok

class CacheSederhana:
    def __init__(self):
        self.saluran = {}       # nomor_blok -> True
        self.hit = 0
        self.miss = 0

    def akses(self, alamat):
        blok = alamat // UKURAN_BLOK

        if blok in self.saluran:
            self.hit = self.hit + 1
            return "HIT"

        self.miss = self.miss + 1
        # Miss -> ambil SATU BLOK UTUH, bukan satu elemen
        if len(self.saluran) >= JUMLAH_SALURAN:
            self.saluran.pop(next(iter(self.saluran)))   # buang yang tertua
        self.saluran[blok] = True
        return "MISS"

    def ratio(self):
        total = self.hit + self.miss
        return self.hit / total if total else 0


def uji(nama, alamat_list):
    c = CacheSederhana()
    for a in alamat_list:
        c.akses(a)
    print(nama.ljust(28) +
          "hit " + str(c.hit).rjust(4) +
          "   miss " + str(c.miss).rjust(4) +
          "   hit ratio " + format(c.ratio() * 100, "5.1f") + "%")


# ---------- Berurutan: ramah lokalitas spasial ----------
uji("akses berurutan", list(range(1000)))

# ---------- Melompat 64: tiap akses blok berbeda ----------
uji("akses melompat 64", list(range(0, 1000, 64)))

# ---------- Berulang di wilayah sempit: lokalitas temporal ----------
uji("perulangan di 64 elemen", [i % 64 for i in range(1000)])

# ---------- Acak: cache hampir tak menolong ----------
import random
random.seed(42)
uji("akses acak", [random.randint(0, 100000) for _ in range(1000)])


# ============================================
# Pengaruh hit ratio pada waktu akses rata-rata
# ============================================

waktu_cache = 4
waktu_memori = 200

print("")
print("hit ratio   waktu rata-rata   dibanding tanpa cache")
for hit in [0.50, 0.80, 0.90, 0.95, 0.99]:
    rata = hit * waktu_cache + (1 - hit) * waktu_memori
    print(format(hit * 100, "6.0f") + "%" +
          format(rata, "14.1f") + " detak" +
          format(waktu_memori / rata, "13.1f") + "x lebih cepat")

# Perhatikan: 90% -> 95% memangkas waktu jauh lebih banyak
# daripada 50% -> 55%, karena MISS-nya yang berkurang separuh.`
  },

  output: `akses berurutan             hit  875   miss  125   hit ratio  87.5%
akses melompat 64           hit    0   miss   16   hit ratio   0.0%
perulangan di 64 elemen     hit  992   miss    8   hit ratio  99.2%
akses acak                  hit    2   miss  998   hit ratio   0.2%

hit ratio   waktu rata-rata   dibanding tanpa cache
    50%         102.0 detak          2.0x lebih cepat
    80%          43.2 detak          4.6x lebih cepat
    90%          23.6 detak          8.5x lebih cepat
    95%          13.8 detak         14.5x lebih cepat
    99%           6.0 detak         33.6x lebih cepat`,

  kesalahanUmum: [
    {
      salah: 'Mengira cache yang lebih besar selalu memberi kinerja lebih baik.',
      kenapa: 'Makin besar kapasitas cache, makin lambat operasi pencarian di dalamnya, karena harus menyisir lebih banyak saluran dengan rangkaian yang lebih rumit. Slide kuliah mencontohkan AMD K5 dan K6 yang memakai cache 1 MB tetapi kinerjanya tidak bagus. Penelitian menganjurkan rentang 1 KB sampai 512 KB sebagai lebih optimum.',
      benar: 'Perlakukan kapasitas sebagai pertukaran, bukan makin besar makin baik. Sebutkan bahwa ada titik optimum, dan cache yang terlalu besar memperlambat dirinya sendiri.'
    },
    {
      salah: 'Mengira cache mengambil tepat satu byte atau satu kata yang diminta saat terjadi miss.',
      kenapa: 'Cache selalu memindahkan satu blok utuh. Salah paham ini membuat prinsip lokalitas spasial jadi tidak masuk akal, dan membuat orang tidak mengerti kenapa akses berurutan jauh lebih cepat daripada akses melompat, padahal jumlah datanya sama.',
      benar: 'Ingat bahwa satuan pemindahan cache adalah blok. Satu miss membawa seluruh blok, sehingga akses berikutnya di blok yang sama menjadi hit.'
    },
    {
      salah: 'Menganggap hit ratio 90 persen sudah sangat baik sehingga tidak perlu diperbaiki lagi.',
      kenapa: 'Yang menentukan waktu total adalah miss, dan pada 90 persen masih ada 10 persen akses yang memakan ratusan detak. Menaikkannya ke 95 persen memangkas miss menjadi separuh, dan waktu rata-ratanya turun hampir dua kali lipat. Angka persentase yang terdengar tinggi menyembunyikan besarnya sisa biaya.',
      benar: 'Hitung waktu akses rata-ratanya, jangan menilai dari persentase saja. Perhatikan bahwa yang perlu dikejar adalah pengurangan miss, bukan percepatan hit.'
    },
    {
      salah: 'Mengira cache selalu menolong, apa pun pola akses programnya.',
      kenapa: 'Cache hanya berhasil kalau program memenuhi prinsip lokalitas. Pada akses yang benar-benar acak di wilayah yang jauh lebih besar daripada cache, hampir semua akses menjadi miss dan cache justru menambah pekerjaan tanpa manfaat. Percobaan akses acak di contoh kode menunjukkan hit ratio yang mendekati nol.',
      benar: 'Kaitkan keberhasilan cache dengan lokalitas temporal dan spasial. Kalau pola aksesnya tidak punya lokalitas, cache tidak bisa menolong.'
    },
    {
      salah: 'Menelusuri matriks kolom demi kolom karena dianggap sama saja dengan baris demi baris.',
      kenapa: 'Matriks disimpan di memori baris demi baris secara berurutan, sehingga menelusuri per kolom berarti melompat sejauh satu baris penuh pada tiap langkah. Setiap akses jatuh di blok berbeda dan hampir selalu miss. Perbedaannya bisa lima sampai sepuluh kali lipat, padahal operasi yang dikerjakan sama persis.',
      benar: 'Telusuri mengikuti tata letaknya di memori, yaitu baris demi baris untuk bahasa seperti C, C++, Java, dan Python.'
    }
  ],

  analogi: `Bayangkan kamu mengerjakan tugas di perpustakaan.

**Register** adalah **buku yang sedang terbuka di depanmu**. Cuma muat dua tiga buku, tapi tinggal lihat.

**Cache** adalah **tumpukan di meja**. Muat belasan buku, tinggal julurkan tangan.

**Memori utama** adalah **rak di ruangan itu**. Muat ribuan, tapi harus berdiri dan berjalan.

**Disk** adalah **gudang di gedung sebelah**. Muat segalanya, tapi butuh setengah jam pulang pergi.

Kenapa susunan ini bekerja? Karena **kamu tidak membaca ribuan buku secara acak**. Kamu membolak-balik beberapa buku yang sama berulang kali — itu **lokalitas temporal**. Dan buku yang kamu butuhkan biasanya bertetangga di rak yang sama — itu **lokalitas spasial**.

Karena itulah, saat kamu berjalan ke rak untuk satu buku, kamu **membawa pulang seluruh jajaran buku di sekitarnya sekalian**. Itulah kenapa cache mengambil satu blok, bukan satu byte.

Sekarang bagian yang berlawanan dengan dugaan: **kenapa meja yang terlalu besar justru memperlambat?** Karena kalau mejamu selebar lapangan dan ditumpuki lima ratus buku, mencari satu judul di atasnya bisa lebih lama daripada berjalan ke rak. Meja yang berguna adalah meja yang **cukup kecil untuk disapu sekali pandang**.

Dan kalau tugasmu menuntut membuka buku yang letaknya berjauhan secara acak — satu di rak A, berikutnya di rak Z — maka meja seluas apa pun tidak menolong. Kamu tetap berjalan setiap kali. Itulah program tanpa lokalitas.`,

  latihan: [
    'Jelaskan tiga sifat memori yang saling bertentangan, dan bagaimana hierarki memori menyiasatinya.',
    'Sebuah cache punya waktu akses 5 detak dan memori utama 250 detak. Hitung waktu akses rata-rata untuk hit ratio 85 persen dan 95 persen, lalu jelaskan kenapa selisihnya sebesar itu.',
    'Jelaskan perbedaan lokalitas temporal dan lokalitas spasial, beri satu contoh kode untuk masing-masing.',
    'Sebutkan enam elemen rancangan cache beserta pilihan yang tersedia untuk masing-masing.',
    'Jelaskan kenapa cache berkapasitas 1 MB bisa memberi kinerja lebih buruk daripada cache 256 KB. Sebutkan contoh prosesor nyata yang disebut di materi.',
    'Tulis dua perulangan yang menjumlahkan seluruh elemen matriks 1000x1000, satu per baris dan satu per kolom. Jelaskan mana yang lebih cepat dan kenapa, tanpa menyebut jumlah operasi.'
  ]
});

TOPICS.push({
  id: 'orkom-pemetaan-cache',
  judul: 'Pemetaan Cache & Kebijakan Penulisan',
  kategori: 'orkom',
  tag: ['pemetaan langsung', 'asosiatif', 'asosiatif set', 'LRU', 'FIFO', 'write back', 'write through'],
  ringkas: 'Tiga cara menentukan blok memori boleh menempati saluran cache mana, lengkap dengan rumusnya.',

  fungsi: `**Memahami bagaimana cache memutuskan data mana disimpan di mana — dan kenapa kadang ia meleset padahal datanya sedikit.**

Ini menjelaskan gejala yang membingungkan: program yang tiba-tiba lambat hanya karena ukuran arraynya diubah dari 1024 menjadi 1023, atau sebaliknya.

Terpakai di:

- **Menjelaskan kinerja yang aneh** yang tidak bisa dijelaskan Big-O
- **Memilih ukuran struktur data** — menghindari ukuran yang kelipatan besar dua
- **Memahami padding** pada struct — kenapa kompiler menambahkan byte kosong
- **Pemrograman multi-inti** — *false sharing* terjadi karena dua inti memperebutkan satu baris cache

Tiga cara pemetaan yang perlu dikenali: **direct mapped** yang paling sederhana tetapi paling mudah bentrok, **fully associative** yang paling fleksibel tetapi mahal, dan **set associative** yang dipakai hampir semua prosesor nyata sebagai jalan tengah.`,

  praktik: {
    tujuan: `Kamu bisa menghitung ke slot mana sebuah alamat dipetakan, dan sudah membuktikan sendiri bahwa ukuran array tertentu bisa membuat program jauh lebih lambat.`,
    alat: [
      'C++ dengan g++',
      'Kertas untuk hitungan alamat'
    ],
    langkah: [
      { judul: 'Hitung pembagian alamat dengan tangan',
        isi: `Untuk cache direct mapped dengan 64 baris berukuran 64 byte:

- **offset** — 6 bit terakhir, menunjuk byte di dalam baris
- **index** — 6 bit berikutnya, menunjuk baris cache mana
- **tag** — sisanya, disimpan untuk memastikan datanya benar

Ambil alamat \`0x1A2B3C40\` dan hitung ketiganya. Lalu ambil alamat lain yang **index-nya sama** — itulah yang akan saling menendang.` },
      { judul: 'Bandingkan ketiga pemetaan',
        isi: `- **Direct mapped** — tiap blok memori punya **tepat satu** slot. Cepat dicari, tetapi dua data yang berbeda bisa terus bergantian menendang
- **Fully associative** — boleh di slot mana saja. Tidak pernah bentrok, tetapi mencarinya mahal
- **Set associative** — kompromi: beberapa slot per set. Yang dipakai prosesor nyata, biasanya 4-way sampai 16-way` },
      { judul: 'Buktikan konflik cache dengan percobaan',
        isi: `Jumlahkan array dengan lompatan tetap. Coba beberapa besaran lompatan: 1, 16, 64, 256, 1024, 4096 elemen.

Ukur waktu per akses untuk masing-masing.

Kamu akan menemukan lompatan tertentu yang **jauh lebih lambat** — itulah yang menyebabkan semua aksesnya jatuh ke set cache yang sama.` },
      { judul: 'Coba trik padding',
        isi: `Buat matriks berukuran 1024 kali 1024 dan jumlahkan kolom demi kolom. Ukur waktunya.

Lalu ubah lebarnya menjadi **1025** — satu elemen lebih — dan ukur lagi.

Sering kali yang **lebih besar justru lebih cepat**, karena barisnya tidak lagi jatuh ke set cache yang sama. Ini terlihat berlawanan dengan akal sampai kamu memahami pemetaannya.` },
      { judul: 'Bandingkan write-through dan write-back',
        isi: `- **Write-through** — setiap penulisan langsung diteruskan ke memori. Sederhana dan selalu sinkron, tetapi lambat
- **Write-back** — penulisan hanya ke cache, ditandai kotor, dan diteruskan saat baris itu digusur. Jauh lebih cepat, tetapi memori sempat tidak sinkron

Hampir semua prosesor modern memakai write-back, dan itu sebabnya sistem multi-inti butuh protokol koherensi.` },
      { judul: 'Lihat padding pada struct',
        isi: `Buat struct berisi \`char\`, \`int\`, dan \`char\` lalu cetak \`sizeof\`-nya. Hasilnya lebih besar dari jumlah anggotanya.

Susun ulang menjadi \`int\`, \`char\`, \`char\` dan cetak lagi. Sering kali lebih kecil.

Kompiler menambahkan **padding** agar setiap anggota jatuh di alamat yang selaras — dan urutan penulisan anggotanya berpengaruh pada besar pemborosannya.` }
    ],
    cek: [
      'Kamu bisa membagi sebuah alamat menjadi tag, index, dan offset dengan benar',
      'Kamu menemukan besaran lompatan yang membuat aksesnya jauh lebih lambat',
      'Mengubah ukuran struct dengan menyusun ulang anggotanya mengubah hasil sizeof'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Cache berkapasitas jauh lebih kecil daripada memori utama. Karena itu harus ada **aturan blok mana boleh diletakkan di saluran cache mana**. Itulah pemetaan, dan ada **tiga metode**.

**1. Pemetaan Langsung (Direct Mapping)**

Teknik paling sederhana: satu blok memori utama hanya boleh dipetakan ke **satu saluran cache tertentu saja**.

Rumusnya:

**i = j modulo m**, dengan **m = 2^r**

- **i** = nomor saluran cache
- **j** = nomor blok memori utama
- **m** = jumlah saluran yang terdapat dalam cache

Alamat memori dibagi menjadi tiga bagian: **tag**, **line**, dan **word**.

Kelebihannya sederhana dan murah. Kekurangannya fatal: kalau program mengakses dua blok yang **kebetulan dipetakan ke saluran yang sama** secara bergantian, keduanya saling mengusir terus-menerus. Hit ratio anjlok meski cache-nya masih kosong di tempat lain. Gejala ini disebut **thrashing**.

**2. Pemetaan Asosiatif (Associative Mapping)**

Dibuat untuk mengatasi kekurangan pemetaan langsung. **Tiap blok memori utama dapat dimuat ke sembarang saluran cache.**

Alamat memori ditafsirkan hanya dalam dua bagian: **tag** dan **word**. Tag secara unik mengidentifikasi sebuah blok memori utama. Untuk mengetahui apakah suatu blok ada di cache, kontrol logika **memeriksa setiap tag saluran cache**.

- **Kelebihan** — fleksibel menempatkan blok, sehingga algoritma penggantian bisa dirancang untuk memaksimalkan hit ratio. Kelemahan pemetaan langsung hilang.
- **Kekurangan** — kompleksitas rangkaian tinggi, sehingga **mahal secara ekonomi**. Memeriksa semua tag sekaligus butuh pembanding sebanyak jumlah saluran.

**3. Pemetaan Asosiatif Set (Set Associative Mapping)**

Menggabungkan kelebihan keduanya. Cache dibagi menjadi **set-set**, dan **tiap blok boleh menempati sembarang saluran di dalam set yang ditentukan**.

Rumusnya:

**m = v × k** dan **i = j modulo v**, dengan **v = 2^d**

- **i** = nomor set cache
- **j** = nomor blok memori utama
- **v** = jumlah set
- **k** = jumlah saluran per set
- **m** = jumlah saluran seluruhnya

Alamat ditafsirkan dalam tiga bagian: **tag**, **set**, dan **word**.

Kalau **k = 1**, ini menjadi pemetaan langsung. Kalau **v = 1**, ini menjadi pemetaan asosiatif penuh. Jadi kedua metode sebelumnya sebenarnya **kasus khusus** dari yang ini. Nilai k yang lazim adalah 2, 4, atau 8, dan disebut *2-way*, *4-way*, *8-way set associative*.

**Algoritma penggantian**

Saat cache penuh dan ada blok baru masuk, blok lama mana yang dibuang?

- **LRU** (*Least Recently Used*) — buang yang paling lama tidak dipakai. Paling banyak dipakai karena paling sesuai dengan lokalitas temporal.
- **FIFO** (*First In First Out*) — buang yang paling lama berada di cache.
- **LFU** (*Least Frequently Used*) — buang yang paling jarang dipakai.
- **Random** — buang sembarang. Ternyata hasilnya tidak jauh lebih buruk, dan rangkaiannya paling sederhana.

Perhatikan: **pemetaan langsung tidak memerlukan algoritma penggantian sama sekali**, karena tidak ada pilihan — satu blok hanya punya satu tempat yang mungkin.

**Write policy**

Kalau isi cache diubah, kapan memori utama ikut diperbarui?

- **Write through** — setiap penulisan langsung diteruskan ke memori utama. Sederhana dan selalu konsisten, tetapi lalu lintas ke memori tinggi sehingga lambat.
- **Write back** — penulisan hanya di cache, ditandai dengan bit *dirty*. Memori baru diperbarui saat blok itu digusur. Jauh lebih cepat, tetapi selama itu isi memori **kedaluwarsa**, yang menjadi masalah kalau ada perangkat lain seperti modul I/O atau prosesor lain yang membacanya.
- **Write once** — dipakai pada sistem multiprosesor untuk mengatur cache yang lebih dari satu.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Pemetaan langsung:  i = j modulo m\n\nm = 8          # jumlah saluran cache\n\nfor j in [0, 1, 7, 8, 9, 16, 17]:\n    i = j % m\n    print("blok " + str(j).rjust(3) + "  ->  saluran " + str(i))\n\n# blok  0 dan  8 dan 16  -> saluran 0  (SALING MENGUSIR)\n# blok  1 dan  9 dan 17  -> saluran 1',
      penjelasan: `
Rumus \`i = j modulo m\` inilah yang harus kamu kuasai, karena hampir selalu keluar di ujian dalam bentuk soal hitungan.

Cara membacanya: **blok memori nomor j hanya boleh menempati saluran cache nomor i**, dan tidak ada tempat lain yang mungkin.

Perhatikan pola yang muncul di keluaran. Dengan 8 saluran, blok 0, 8, 16, 24, dan seterusnya **semuanya berebut saluran 0**. Slide kuliah menuliskannya sebagai tabel: saluran 0 diperebutkan blok 0, m, 2m, dan seterusnya; saluran 1 diperebutkan blok 1, m+1, 2m+1, dan seterusnya.

Di sinilah kelemahan fatalnya. Bayangkan program yang bergantian mengakses blok 0 dan blok 8:

- Akses blok 0 → miss, blok 0 masuk saluran 0
- Akses blok 8 → miss, blok 8 **mengusir** blok 0 dari saluran 0
- Akses blok 0 lagi → miss, blok 0 mengusir blok 8
- Dan seterusnya, selamanya

Hit ratio-nya **nol persen**, padahal tujuh saluran lain menganggur kosong. Gejala ini disebut **thrashing**, dan ia bukan kejadian langka — array besar yang ukurannya kebetulan kelipatan ukuran cache sangat mudah memicunya.

Kenapa \`m\` harus **pangkat dua**? Karena kalau m = 2^r, operasi modulo bisa dikerjakan hanya dengan **mengambil r bit terendah** dari nomor blok. Tidak perlu rangkaian pembagi sama sekali — cukup memilih kabel yang tepat. Inilah sebabnya semua ukuran cache selalu pangkat dua, dan kenapa slide menuliskan syarat **m = 2^r** secara khusus.
`
    },
    {
      bahasa: 'python',
      kode: '# Asosiatif set:  m = v x k,  i = j modulo v\n\nk = 2          # 2 saluran per set -> "2-way"\nv = 4          # jumlah set\nm = v * k      # 8 saluran seluruhnya\n\nfor j in [0, 1, 4, 5, 8]:\n    i = j % v\n    print("blok " + str(j).rjust(2) + "  ->  set " + str(i) +\n          "  (boleh di salah satu dari " + str(k) + " saluran)")\n\n# blok 0, 4, 8 -> set 0, tapi set 0 muat DUA blok sekaligus\n# -> tidak saling mengusir seperti pemetaan langsung',
      penjelasan: `
Perhatikan perbedaan penting dari rumus sebelumnya: **modulonya terhadap \`v\` (jumlah set), bukan terhadap \`m\` (jumlah saluran)**. Ini sering tertukar di ujian.

Dengan \`v = 4\` dan \`k = 2\`, blok 0, 4, dan 8 sama-sama diarahkan ke **set 0**. Bedanya dengan pemetaan langsung: set 0 punya **dua saluran**, sehingga **dua blok bisa tinggal bersama di sana**.

Jadi masalah thrashing tadi langsung teratasi. Program yang bergantian mengakses blok 0 dan blok 4 kini bisa menyimpan **keduanya sekaligus** di set 0, dan hit ratio-nya melonjak dari nol menjadi hampir sempurna.

Sekarang lihat kenapa metode ini disebut menggabungkan kelebihan keduanya:

- Dari **pemetaan langsung**, ia mewarisi pencarian yang cepat. Untuk mencari sebuah blok, kontrol logika cukup memeriksa **k tag** di dalam satu set, bukan seluruh saluran cache. Dengan k = 2, cuma dua pembanding.
- Dari **pemetaan asosiatif**, ia mewarisi kelenturan. Blok punya lebih dari satu tempat yang mungkin, sehingga algoritma penggantian punya pilihan.

Kedua metode lain sebenarnya **kasus khusus** dari yang ini, dan ini layak diingat:

- \`k = 1\` → tiap set cuma satu saluran → **pemetaan langsung**
- \`v = 1\` → seluruh cache satu set → **asosiatif penuh**

Prosesor nyata hampir selalu memakai set asosiatif dengan k bernilai 2, 4, 8, atau 16. Menambah k terus-menerus memberi hasil yang makin sedikit sementara biayanya terus naik — di atas 8-way, perbaikan hit ratio-nya sudah nyaris tidak terasa.
`
    },
    {
      bahasa: 'python',
      kode: '# Write through: tulis ke cache DAN memori sekaligus\ndef tulis_through(cache, memori, alamat, nilai):\n    cache[alamat] = nilai\n    memori[alamat] = nilai        # selalu konsisten, tapi lambat\n\n# Write back: tulis ke cache saja, tandai kotor\ndef tulis_back(cache, dirty, alamat, nilai):\n    cache[alamat] = nilai\n    dirty[alamat] = True          # memori BELUM diperbarui\n\ndef gusur(cache, dirty, memori, alamat):\n    if dirty.get(alamat):\n        memori[alamat] = cache[alamat]   # baru ditulis saat digusur\n        dirty[alamat] = False',
      penjelasan: `
Pilihan antara keduanya adalah pertukaran klasik: **kesederhanaan lawan kecepatan**.

**Write through** menulis ke dua tempat setiap kali. Memori utama **selalu benar**, sehingga tidak ada kerumitan sama sekali. Harganya: setiap penulisan menanggung biaya penuh akses memori, ratusan detak. Pada program yang banyak menulis, ini sangat mahal.

**Write back** hanya menulis ke cache, lalu menandai bloknya sebagai **dirty**. Memori baru diperbarui **saat blok itu digusur**. Untungnya besar: variabel yang ditulis seribu kali di dalam perulangan hanya sekali menyentuh memori, bukan seribu kali.

Kerugiannya juga jelas: selama blok masih dirty, **isi memori utama kedaluwarsa**. Selama cuma CPU itu yang mengakses, tidak masalah. Persoalan muncul kalau ada pihak lain yang membaca memori langsung:

- **Modul I/O** yang memakai DMA membaca langsung dari memori, dan bisa mendapat data lama.
- **Prosesor lain** pada sistem multiprosesor punya cache sendiri, dan bisa memuat salinan yang sudah basi.

Persoalan ini disebut **cache coherence**, dan inilah alasan adanya **write once** yang disebut di slide — kebijakan khusus untuk sistem dengan cache lebih dari satu.

Untuk ujian, ingat pasangannya seperti ini: **write through itu aman tapi lambat, write back itu cepat tapi butuh penjagaan konsistensi.** Hampir semua prosesor modern memakai write back, karena selisih kecepatan CPU dan memori sudah terlalu besar untuk menanggung write through.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Membandingkan tiga metode pemetaan pada pola akses
# yang memicu thrashing
# ============================================

JUMLAH_SALURAN = 8

class Langsung:
    """i = j modulo m -- satu blok, satu tempat."""
    nama = "Pemetaan Langsung"
    def __init__(self):
        self.saluran = [None] * JUMLAH_SALURAN
    def akses(self, blok):
        i = blok % JUMLAH_SALURAN
        if self.saluran[i] == blok:
            return True
        self.saluran[i] = blok          # tidak ada pilihan, timpa saja
        return False


class Asosiatif:
    """Blok boleh di saluran mana pun. Penggantian: LRU."""
    nama = "Asosiatif Penuh"
    def __init__(self):
        self.isi = []                   # urutan = paling lama dipakai di depan
    def akses(self, blok):
        if blok in self.isi:
            self.isi.remove(blok)
            self.isi.append(blok)       # segarkan posisi LRU
            return True
        if len(self.isi) >= JUMLAH_SALURAN:
            self.isi.pop(0)             # buang yang paling lama tak dipakai
        self.isi.append(blok)
        return False


class AsosiatifSet:
    """m = v x k, i = j modulo v. Di sini k=2 -> 2-way."""
    nama = "Asosiatif Set (2-way)"
    def __init__(self, k=2):
        self.k = k
        self.v = JUMLAH_SALURAN // k
        self.set_ = [[] for _ in range(self.v)]
    def akses(self, blok):
        i = blok % self.v               # modulo v, BUKAN m
        s = self.set_[i]
        if blok in s:
            s.remove(blok)
            s.append(blok)
            return True
        if len(s) >= self.k:
            s.pop(0)                    # LRU di dalam set saja
        s.append(blok)
        return False


def uji(pola, nama_pola):
    print(nama_pola)
    for kelas in (Langsung, Asosiatif, AsosiatifSet):
        c = kelas()
        hit = sum(1 for b in pola if c.akses(b))
        ratio = hit / len(pola) * 100
        print("   " + c.nama.ljust(24) +
              "hit " + str(hit).rjust(4) + " / " + str(len(pola)) +
              "   " + format(ratio, "5.1f") + "%")
    print("")


# ---------- Pola jahat: blok 0 dan 8 berebut saluran yang sama ----------
uji([0, 8] * 50, "Bergantian blok 0 dan 8 (jarak = jumlah saluran)")

# ---------- Working set PAS memenuhi cache: ketiganya seri ----------
uji(list(range(8)) * 5, "Berulang blok 0..7 (pas sebesar cache)")

# ---------- Sekali lewat: semua miss, tak terhindarkan ----------
uji(list(range(40)), "Berurutan 0..39, tiap blok sekali saja")

# ---------- Pola berulang di wilayah sempit ----------
uji([i % 6 for i in range(100)], "Berulang di 6 blok saja")


# ============================================
# Rumus yang wajib dihafal
# ============================================
print("Pemetaan langsung : i = j mod m,  m = 2^r")
print("   i = nomor saluran, j = nomor blok, m = jumlah saluran")
print("Asosiatif set     : m = v x k,  i = j mod v,  v = 2^d")
print("   i = nomor set, v = jumlah set, k = saluran per set")
print("")
print("k = 1  -> menjadi pemetaan langsung")
print("v = 1  -> menjadi asosiatif penuh")`
  },

  output: `Bergantian blok 0 dan 8 (jarak = jumlah saluran)
   Pemetaan Langsung       hit    0 / 100     0.0%
   Asosiatif Penuh         hit   98 / 100    98.0%
   Asosiatif Set (2-way)   hit   98 / 100    98.0%

Berulang blok 0..7 (pas sebesar cache)
   Pemetaan Langsung       hit   32 / 40    80.0%
   Asosiatif Penuh         hit   32 / 40    80.0%
   Asosiatif Set (2-way)   hit   32 / 40    80.0%

Berurutan 0..39, tiap blok sekali saja
   Pemetaan Langsung       hit    0 / 40     0.0%
   Asosiatif Penuh         hit    0 / 40     0.0%
   Asosiatif Set (2-way)   hit    0 / 40     0.0%

Berulang di 6 blok saja
   Pemetaan Langsung       hit   94 / 100    94.0%
   Asosiatif Penuh         hit   94 / 100    94.0%
   Asosiatif Set (2-way)   hit   94 / 100    94.0%

Pemetaan langsung : i = j mod m,  m = 2^r
   i = nomor saluran, j = nomor blok, m = jumlah saluran
Asosiatif set     : m = v x k,  i = j mod v,  v = 2^d
   i = nomor set, v = jumlah set, k = saluran per set

k = 1  -> menjadi pemetaan langsung
v = 1  -> menjadi asosiatif penuh

Bacaan hasilnya:
  uji 1 -> pemetaan menentukan segalanya saat ada bentrokan
  uji 2 -> saat working set muat, ketiganya setara
  uji 3 -> miss pertama tak terhindarkan, sebagus apa pun pemetaannya`,

  kesalahanUmum: [
    {
      salah: 'Memakai modulo m pada pemetaan asosiatif set, padahal seharusnya modulo v.',
      kenapa: 'Pada pemetaan langsung memang i = j mod m dengan m jumlah saluran, tetapi pada asosiatif set rumusnya i = j mod v dengan v jumlah set. Karena m = v kali k, memakai m menghasilkan nomor set yang salah dan seluruh perhitungan berikutnya ikut meleset.',
      benar: 'Ingat bahwa yang dibagi adalah jumlah kelompoknya. Pemetaan langsung membagi ke saluran, asosiatif set membagi ke set: i = j mod v.'
    },
    {
      salah: 'Menyebut pemetaan langsung membutuhkan algoritma penggantian seperti LRU.',
      kenapa: 'Pada pemetaan langsung tidak ada pilihan sama sekali, karena satu blok hanya punya satu saluran yang mungkin ditempati. Blok lama pasti ditimpa, tanpa perlu memutuskan apa pun. Slide kuliah menyebutkan hal ini secara khusus.',
      benar: 'Algoritma penggantian hanya diperlukan saat ada lebih dari satu tempat yang mungkin, yaitu pada pemetaan asosiatif dan asosiatif set.'
    },
    {
      salah: 'Mengira pemetaan asosiatif penuh selalu pilihan terbaik karena paling fleksibel.',
      kenapa: 'Fleksibilitasnya harus dibayar dengan memeriksa seluruh tag saluran secara bersamaan, yang berarti pembanding sebanyak jumlah saluran. Rangkaiannya sangat rumit dan mahal, sehingga tidak dipakai untuk cache berkapasitas besar. Slide menyebut kekurangannya sebagai kompleksitas rangkaian yang mahal secara ekonomi.',
      benar: 'Sebutkan pertukarannya: asosiatif penuh memberi hit ratio terbaik tetapi termahal. Asosiatif set dipilih karena mendekati kualitasnya dengan biaya jauh lebih rendah.'
    },
    {
      salah: 'Mengira write back selalu lebih baik karena lebih cepat.',
      kenapa: 'Write back membuat isi memori utama kedaluwarsa selama bloknya masih dirty. Kalau ada modul I/O yang membaca memori langsung lewat DMA, atau prosesor lain yang punya cache sendiri, mereka bisa mendapat data basi. Persoalan cache coherence ini tidak ada pada write through.',
      benar: 'Sebutkan pertukarannya: write back cepat tetapi menuntut penjagaan konsistensi, write through selalu konsisten tetapi lambat.'
    },
    {
      salah: 'Menganggap thrashing terjadi karena cache-nya terlalu kecil.',
      kenapa: 'Thrashing pada pemetaan langsung bisa terjadi meski sebagian besar cache kosong, karena blok-blok yang berebut dipetakan ke saluran yang sama persis. Menambah kapasitas tidak menolong kalau pola aksesnya tetap berjarak kelipatan jumlah saluran.',
      benar: 'Jelaskan bahwa penyebabnya adalah keterbatasan pemetaan, bukan kapasitas. Jalan keluarnya menaikkan asosiativitas, bukan memperbesar cache.'
    }
  ],

  analogi: `Bayangkan loker di sekolah.

**Pemetaan langsung** adalah aturan *"nomor lokermu ditentukan dari nomor absenmu"*. Ada 8 loker, dan absen 0, 8, 16 semuanya kebagian loker nomor 0.

Sederhana sekali: mencari barang seseorang cukup hitung sisa baginya, langsung ketemu. Tetapi kalau absen 0 dan absen 8 sama-sama sering datang, mereka **saling mengeluarkan barang** sepanjang hari — padahal tujuh loker lain melompong. Itulah **thrashing**.

**Pemetaan asosiatif** adalah aturan *"taruh di loker mana saja yang kosong"*. Masalah tadi hilang sepenuhnya. Tetapi sekarang mencari barang berarti **membuka semua loker satu per satu**. Untuk 8 loker masih wajar; untuk 8.000 loker, mustahil.

**Pemetaan asosiatif set** adalah jalan tengah yang dipakai di dunia nyata: *"absenmu menentukan **deret** lokermu, dan di deret itu kamu boleh pakai loker mana saja"*. Ada 4 deret, tiap deret 2 loker.

Absen 0 dan 8 sama-sama kebagian deret 0 — tetapi deret 0 punya **dua** loker, jadi keduanya muat bersama. Masalah selesai. Dan mencari barang cukup membuka **dua** loker, bukan delapan.

Untuk **write policy**, bayangkan buku catatan di sakumu dan buku besar di kantor:

- **Write through** — setiap kali mencatat di saku, kamu langsung lari ke kantor menyalinnya. Buku besar selalu benar, tapi kakimu capek.
- **Write back** — kamu mencatat di saku saja seharian, dan baru menyalin ke kantor saat pulang. Jauh lebih hemat tenaga. Risikonya, **selama seharian itu buku besar di kantor salah** — dan kalau ada orang lain yang membacanya, dia dapat informasi basi.`,

  latihan: [
    'Sebuah cache punya 16 saluran. Tentukan saluran mana yang ditempati blok memori nomor 5, 21, dan 37 dengan pemetaan langsung. Tunjukkan perhitungannya.',
    'Sebuah cache asosiatif set punya 32 saluran dengan k = 4. Hitung jumlah set, lalu tentukan set mana yang ditempati blok nomor 10 dan 18.',
    'Jelaskan kenapa pemetaan langsung tidak memerlukan algoritma penggantian, sedangkan dua metode lainnya memerlukannya.',
    'Sebutkan kelebihan dan kekurangan pemetaan asosiatif penuh menurut slide kuliah, lalu jelaskan kenapa asosiatif set lebih banyak dipakai di prosesor nyata.',
    'Tunjukkan satu pola akses yang membuat pemetaan langsung menghasilkan hit ratio nol persen padahal sebagian besar cache kosong. Jelaskan kenapa memperbesar cache tidak menyelesaikannya.',
    'Jelaskan perbedaan write through dan write back, lalu jelaskan persoalan apa yang muncul pada write back ketika ada modul I/O yang membaca memori lewat DMA.'
  ]
});

TOPICS.push({
  id: 'orkom-hamming',
  judul: 'Koreksi Error & Kode Hamming',
  kategori: 'orkom',
  tag: ['koreksi error', 'kode Hamming', 'paritas', 'SEC', 'DED', 'sindrom'],
  ringkas: 'Bagaimana memori bisa tahu bit mana yang rusak — dan membetulkannya sendiri.',

  fungsi: `**Mendeteksi dan memperbaiki data yang rusak saat disimpan atau dikirim.**

Bit bisa berubah sendiri — karena radiasi, gangguan listrik, atau media yang menua. Pada peladen yang berjalan bertahun-tahun, ini bukan kemungkinan melainkan kepastian.

Terpakai di:

- **RAM ECC** pada peladen — memperbaiki kesalahan satu bit tanpa ada yang menyadarinya
- **Penyimpanan** — RAID dan SSD memakai kode koreksi yang lebih maju
- **Komunikasi** — dari sinyal satelit sampai kode QR
- **Jaringan Komputer** — checksum dan CRC memakai gagasan yang sama, meski hanya mendeteksi

Pembedaan yang penting: **mendeteksi** dan **memperbaiki** itu berbeda, dan yang kedua jauh lebih mahal.

Bit paritas tunggal cuma bisa bilang *"ada yang salah"*. Kode Hamming bisa bilang *"bit ke-11 yang salah"* — dan itu cukup untuk memperbaikinya, karena bit hanya punya dua kemungkinan.`,

  praktik: {
    tujuan: `Kamu bisa membangun kode Hamming untuk sebuah data, merusaknya sengaja, dan membuktikan penerimanya menemukan bit mana yang rusak.`,
    alat: [
      'Python 3',
      'Kertas untuk hitungan pertama'
    ],
    langkah: [
      { judul: 'Hitung berapa bit paritas dibutuhkan',
        isi: `Pakai pertidaksamaan \`2^r >= m + r + 1\`, dengan m jumlah bit data dan r jumlah bit paritas.

Untuk 4 bit data: coba r=3, maka \`8 >= 4+3+1 = 8\`. Cukup.

Untuk 8 bit data: r=4, karena \`16 >= 8+4+1 = 13\`. Cukup.

Hitung sendiri untuk 16 bit data sebelum lanjut.` },
      { judul: 'Susun posisinya',
        isi: `Bit paritas ditaruh di posisi **pangkat dua**: 1, 2, 4, 8, 16. Sisanya diisi bit data berurutan.

Untuk 4 bit data \`d1 d2 d3 d4\`, susunannya menjadi:

\`p1 p2 d1 p4 d2 d3 d4\` pada posisi 1 sampai 7.

Tulis tabelnya di kertas sebelum menulis kode. Ini bagian yang paling mudah salah.` },
      { judul: 'Hitung tiap bit paritas',
        isi: `Bit paritas di posisi \`p\` memeriksa semua posisi yang **bit ke-p dalam nomor posisinya bernilai 1**.

- \`p1\` memeriksa posisi 1, 3, 5, 7
- \`p2\` memeriksa posisi 2, 3, 6, 7
- \`p4\` memeriksa posisi 4, 5, 6, 7

Setiap paritas dibuat agar jumlah bit satu dalam kelompoknya **genap**.` },
      { judul: 'Rusakkan satu bit dengan sengaja',
        isi: `Balik satu bit di posisi mana pun, lalu hitung ulang ketiga paritasnya di sisi penerima.

Susun hasilnya sebagai bilangan biner: \`p4 p2 p1\`. Angka yang keluar adalah **nomor posisi bit yang rusak**.

Ini bagian yang paling memuaskan — angkanya menunjuk langsung, tanpa perlu mencari.` },
      { judul: 'Tulis kodenya dan uji semua posisi',
        isi: `Buat fungsi \`encode(data)\` dan \`decode(kode)\` di Python.

Lalu uji **secara menyeluruh**: untuk setiap posisi bit, balikkan, dekode, dan pastikan hasilnya kembali ke data asli.

Kalau ada satu posisi yang gagal, biasanya kesalahan ada pada penyusunan posisi paritasnya.` },
      { judul: 'Uji batasnya dengan dua bit rusak',
        isi: `Balikkan **dua** bit sekaligus, lalu jalankan dekodenya.

Hasilnya akan **salah** — dan lebih buruk lagi, ia "memperbaiki" bit yang sebenarnya benar.

Hamming dasar hanya menjamin **satu** bit. Untuk mendeteksi dua bit, tambahkan satu bit paritas keseluruhan — itu disebut **SECDED**, dan itulah yang dipakai RAM ECC sungguhan.` }
    ],
    cek: [
      'Untuk 4 bit data, kodemu menghasilkan 7 bit total',
      'Membalik bit di posisi mana pun terdeteksi dengan nomor posisi yang tepat',
      'Setelah dikoreksi, data yang dipulihkan identik dengan aslinya untuk semua posisi'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Memori semikonduktor **bisa mengalami kesalahan**. Ada dua jenisnya:

- **Kesalahan berat** (*hard failure*) — kerusakan fisik memori. Permanen, tidak bisa dikoreksi.
- **Kesalahan ringan** (*soft error*) — data yang tersimpan berubah tanpa kerusakan fisik. Bisa disebabkan gangguan listrik atau bahkan partikel radiasi. **Kesalahan ringan bisa dikoreksi kembali.**

Untuk menanganinya diperlukan **dua mekanisme**: mekanisme **pendeteksian** kesalahan, dan mekanisme **perbaikan** kesalahan.

**Kode Hamming**

Diciptakan **Richard Hamming di Bell Lab pada 1950**. Mekanismenya: data word (**D**) ditambah dengan sejumlah **bit cek paritas** (**C**). Data yang disimpan jadi berpanjang **D + C**. Kesalahan diketahui dengan menganalisa data dan bit paritas tersebut.

**Paritas — dasarnya**

Sebelum ke Hamming, pahami dulu **paritas sederhana**. Satu bit tambahan dipasang supaya jumlah bit bernilai 1 selalu genap (*even parity*) atau ganjil (*odd parity*).

Kemampuannya terbatas: paritas sederhana bisa **mendeteksi** satu bit yang berubah, tetapi **tidak tahu bit mana**, sehingga tidak bisa memperbaikinya. Dan kalau **dua** bit berubah sekaligus, paritasnya kembali cocok sehingga kesalahannya **lolos tanpa terdeteksi**.

**Gagasan Hamming**

Alih-alih satu bit paritas untuk seluruh data, pakai **beberapa bit paritas yang masing-masing mengawasi sebagian data**, dengan pembagian yang **tumpang tindih**. Kalau ada bit rusak, pola bit paritas mana saja yang gagal akan **menunjuk langsung ke posisi bit yang rusak**.

Aturan penempatannya:

- Bit paritas ditaruh di posisi **pangkat dua**: 1, 2, 4, 8, 16, dan seterusnya.
- Bit data mengisi sisanya: posisi 3, 5, 6, 7, 9, dan seterusnya.
- Bit paritas di posisi **p** mengawasi semua posisi yang **bit ke-p dari nomor posisinya bernilai 1**.

Sehingga:

- **C1** mengawasi posisi 1, 3, 5, 7, 9, 11, 13, 15 — yaitu yang nomornya ganjil
- **C2** mengawasi posisi 2, 3, 6, 7, 10, 11, 14, 15
- **C4** mengawasi posisi 4, 5, 6, 7, 12, 13, 14, 15
- **C8** mengawasi posisi 8 sampai 15

**Sindrom — penunjuk letak kesalahan**

Saat data dibaca, semua bit paritas dihitung ulang lalu dibandingkan dengan yang tersimpan. Hasil perbandingannya disebut **sindrom**.

- Sindrom **0** → tidak ada kesalahan
- Sindrom **bukan 0** → nilainya **adalah nomor posisi bit yang rusak**

Inilah keindahannya. Kalau C2, C4, dan C8 gagal sementara C1 lolos, sindromnya adalah 2 + 4 + 8 = **14**. Artinya **bit di posisi 14 yang rusak**, dan cukup dibalik untuk memperbaikinya.

**Berapa bit paritas yang dibutuhkan?**

Slide kuliah memberi tabelnya:

| Bit data | Bit paritas SEC | Bit paritas DEC |
|---|---|---|
| 8 | 4 | 5 |
| 16 | 5 | 6 |
| 32 | 6 | 7 |
| 64 | 7 | 8 |
| 128 | 8 | 9 |
| 512 | 9 | 10 |

**SEC** berarti *Single Error Correction* — sanggup memperbaiki satu bit rusak. Menambah **satu** bit paritas lagi menghasilkan **SEC-DED**, yang bisa memperbaiki satu bit rusak **sekaligus mendeteksi** adanya dua bit rusak (walau tidak bisa memperbaiki yang dua).

Perhatikan polanya: makin besar datanya, **makin kecil persentase biaya paritasnya**. Untuk 8 bit data butuh 4 bit paritas (50%), tetapi untuk 512 bit data cukup 9 bit (kurang dari 2%). Inilah sebabnya koreksi error jadi murah pada memori berukuran besar, dan kenapa **ECC RAM** yang dipakai server memakai prinsip ini.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa bit paritas ditaruh di posisi PANGKAT DUA?\n#\n# posisi:  1  2  3  4  5  6  7\n# biner :001 010 011 100 101 110 111\n#          ^   ^       ^\n#         C1  C2      C4\n#\n# C1 mengawasi posisi yang bit ke-0 nya 1 -> 1,3,5,7\n# C2 mengawasi posisi yang bit ke-1 nya 1 -> 2,3,6,7\n# C4 mengawasi posisi yang bit ke-2 nya 1 -> 4,5,6,7\n\nfor posisi in range(1, 8):\n    diawasi = [c for c in (1, 2, 4) if posisi & c]\n    print("posisi " + str(posisi) + " (" + format(posisi, "03b") +\n          ") diawasi oleh C" + ", C".join(str(d) for d in diawasi))',
      penjelasan: `
Inilah bagian yang membuat kode Hamming terasa seperti sulap, padahal murni aritmetika biner.

Perhatikan: **nomor posisi ditulis dalam biner**, lalu bit paritas C1, C2, C4 masing-masing mengawasi posisi yang bit tertentunya bernilai 1.

Sekarang lihat akibatnya. Setiap posisi punya **kombinasi pengawas yang unik**:

- Posisi 3 = biner 011 → diawasi C1 dan C2
- Posisi 5 = biner 101 → diawasi C1 dan C4
- Posisi 6 = biner 110 → diawasi C2 dan C4
- Posisi 7 = biner 111 → diawasi C1, C2, dan C4

Tidak ada dua posisi yang punya kombinasi sama, karena **kombinasi itu sebenarnya adalah nomor posisinya sendiri dalam biner**.

Jadi kalau bit posisi 6 rusak, yang gagal adalah C2 dan C4. Jumlahkan: 2 + 4 = **6**. Langsung menunjuk posisi yang rusak, tanpa pencarian apa pun.

Inilah yang membuat bit paritas **harus** ditaruh di posisi pangkat dua. Posisi 1, 2, 4, 8 adalah posisi yang binernya cuma punya **satu** bit bernilai 1. Artinya tiap bit paritas hanya diawasi oleh dirinya sendiri, sehingga tidak saling mengganggu perhitungan.

Contoh dari slide kuliah: sindrom yang dihasilkan adalah **2 + 4 + 8 = 14**, yang berarti bit posisi 14 yang rusak. Perhatikan bahwa C1 tidak ikut, dan memang 14 dalam biner adalah 1110 — bit ke-0 nya nol.
`
    },
    {
      bahasa: 'python',
      kode: '# Paritas sederhana: bisa MENDETEKSI, tidak bisa MEMPERBAIKI\n\ndata = [1, 0, 1, 1, 0, 0, 1]\nparitas = sum(data) % 2          # even parity -> 0\n\n# Satu bit berubah saat disimpan\ndata[3] = 0\nprint(sum(data) % 2 != paritas)  # True -> terdeteksi\n# tapi bit MANA? Tidak ada yang tahu.\n\n# Dua bit berubah -> LOLOS tanpa terdeteksi\ndata[3] = 1\ndata[0] = 0\ndata[1] = 1\nprint(sum(data) % 2 != paritas)  # False -> tidak terdeteksi!',
      penjelasan: `
Ini menjelaskan **kenapa paritas sederhana tidak cukup**, dan karenanya kenapa Hamming perlu ada.

Paritas sederhana punya dua keterbatasan yang keduanya serius:

**Pertama, ia tidak tahu bit mana yang rusak.** Ia cuma bisa bilang *"ada yang salah"*. Untuk memori, ini berarti satu-satunya tindakan yang mungkin adalah melaporkan kegagalan dan menghentikan sistem — tidak ada perbaikan.

**Kedua, kesalahan berjumlah genap lolos sepenuhnya.** Kalau dua bit berubah, jumlah bit bernilai 1 kembali berubah sebanyak nol modulo dua, sehingga paritasnya cocok lagi. Sistem melaporkan *"data baik-baik saja"* padahal rusak. Ini lebih berbahaya daripada tidak punya pemeriksaan sama sekali, karena memberi rasa aman yang keliru.

Kode Hamming mengatasi keterbatasan pertama sepenuhnya: ia **menunjuk posisi** bit yang rusak, sehingga bisa langsung dibalik dan diperbaiki. Itulah arti **SEC**, *Single Error Correction*.

Untuk keterbatasan kedua, Hamming dasar juga masih bisa tertipu oleh dua bit rusak — ia akan menghitung sindrom yang menunjuk posisi yang salah, lalu "memperbaiki" bit yang sebenarnya sehat, sehingga datanya justru tambah rusak.

Karena itu ditambahkan **satu bit paritas menyeluruh** untuk membentuk **SEC-DED**. Bit tambahan ini memeriksa paritas seluruh rangkaian, sehingga kombinasinya dengan sindrom bisa membedakan tiga keadaan: tidak ada kesalahan, satu bit rusak yang bisa diperbaiki, atau dua bit rusak yang hanya bisa dilaporkan. Itulah yang dipakai **ECC RAM** pada server.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Kode Hamming SEC: menyisipkan, merusak, lalu memperbaiki
# ============================================

def posisi_paritas(panjang_total):
    """Posisi pangkat dua: 1, 2, 4, 8, ..."""
    p = 1
    hasil = []
    while p <= panjang_total:
        hasil.append(p)
        p = p * 2
    return hasil


def jumlah_bit_paritas(bit_data):
    """Cari r terkecil sehingga 2^r >= bit_data + r + 1."""
    r = 0
    while (2 ** r) < (bit_data + r + 1):
        r = r + 1
    return r


def sisipkan(data):
    """Bangun rangkaian Hamming. Indeks 1-based, indeks 0 tak dipakai."""
    r = jumlah_bit_paritas(len(data))
    total = len(data) + r
    kode = [0] * (total + 1)

    # Taruh bit data di posisi yang BUKAN pangkat dua
    pp = set(posisi_paritas(total))
    i = 0
    for posisi in range(1, total + 1):
        if posisi not in pp:
            kode[posisi] = data[i]
            i = i + 1

    # Hitung tiap bit paritas
    for p in posisi_paritas(total):
        nyala = 0
        for posisi in range(1, total + 1):
            if posisi != p and (posisi & p) and kode[posisi]:
                nyala = nyala + 1
        kode[p] = nyala % 2          # even parity

    return kode


def sindrom(kode):
    """0 = tidak ada error. Bukan 0 = nomor posisi yang rusak."""
    total = len(kode) - 1
    s = 0
    for p in posisi_paritas(total):
        nyala = 0
        for posisi in range(1, total + 1):
            if (posisi & p) and kode[posisi]:
                nyala = nyala + 1
        if nyala % 2 != 0:
            s = s + p                # bit paritas ini GAGAL
    return s


def tampil(kode, judul):
    total = len(kode) - 1
    pp = set(posisi_paritas(total))
    baris_posisi = ""
    baris_nilai = ""
    for posisi in range(1, total + 1):
        tanda = "C" if posisi in pp else "D"
        baris_posisi = baris_posisi + (tanda + str(posisi)).rjust(4)
        baris_nilai = baris_nilai + str(kode[posisi]).rjust(4)
    print(judul)
    print("  " + baris_posisi)
    print("  " + baris_nilai)


# ---------- Simpan ----------
data = [1, 0, 1, 1, 0, 0, 1, 0]
kode = sisipkan(data)
print("bit data   :", len(data))
print("bit paritas:", jumlah_bit_paritas(len(data)))
tampil(kode, "Rangkaian tersimpan (C = paritas, D = data):")
print("  sindrom saat dibaca:", sindrom(kode), "-> tidak ada error")

# ---------- Rusakkan satu bit ----------
for rusak in (6, 11, 1):
    salinan = kode[:]
    salinan[rusak] = 1 - salinan[rusak]
    s = sindrom(salinan)
    print("")
    print("bit posisi " + str(rusak) + " dibalik -> sindrom = " + str(s))
    if s == rusak:
        salinan[s] = 1 - salinan[s]
        print("  sindrom menunjuk posisi " + str(s) + ", dibalik kembali")
        print("  pulih benar:", salinan == kode)

# ---------- Dua bit rusak: Hamming SEC tertipu ----------
salinan = kode[:]
salinan[6] = 1 - salinan[6]
salinan[11] = 1 - salinan[11]
print("")
print("dua bit rusak (6 dan 11) -> sindrom =", sindrom(salinan))
print("  sindrom menunjuk posisi yang SALAH.")
print("  Inilah kenapa perlu satu bit tambahan: SEC-DED.")`
  },

  output: `bit data   : 8
bit paritas: 4
Rangkaian tersimpan (C = paritas, D = data):
    C1  C2  D3  C4  D5  D6  D7  C8  D9 D10 D11 D12
     1   0   1   0   0   1   1   1   0   0   1   0
  sindrom saat dibaca: 0 -> tidak ada error

bit posisi 6 dibalik -> sindrom = 6
  sindrom menunjuk posisi 6, dibalik kembali
  pulih benar: True

bit posisi 11 dibalik -> sindrom = 11
  sindrom menunjuk posisi 11, dibalik kembali
  pulih benar: True

bit posisi 1 dibalik -> sindrom = 1
  sindrom menunjuk posisi 1, dibalik kembali
  pulih benar: True

dua bit rusak (6 dan 11) -> sindrom = 13
  sindrom menunjuk posisi yang SALAH.
  Inilah kenapa perlu satu bit tambahan: SEC-DED.`,

  kesalahanUmum: [
    {
      salah: 'Mengira paritas sederhana bisa memperbaiki kesalahan, bukan sekadar mendeteksi.',
      kenapa: 'Paritas sederhana hanya memberi satu jawaban ya atau tidak untuk seluruh rangkaian, sehingga tidak ada keterangan bit mana yang rusak. Tanpa mengetahui posisinya, tidak ada yang bisa dibalik. Kode Hamming perlu ada justru untuk mengisi kekurangan ini.',
      benar: 'Paritas sederhana mendeteksi satu bit rusak tanpa bisa memperbaikinya. Hamming menghasilkan sindrom yang menunjuk posisi, sehingga bisa diperbaiki.'
    },
    {
      salah: 'Menaruh bit paritas di posisi 0, 1, 2, 3 atau di ujung rangkaian.',
      kenapa: 'Penomoran Hamming dimulai dari 1, dan bit paritas harus berada di posisi pangkat dua yaitu 1, 2, 4, 8. Posisi itu dipilih karena binernya hanya punya satu bit bernilai 1, sehingga tiap bit paritas tidak ikut diawasi bit paritas lain. Menaruhnya di tempat lain membuat sindrom tidak lagi menunjuk posisi yang benar.',
      benar: 'Bit paritas di posisi 1, 2, 4, 8, 16. Bit data mengisi sisanya, dan penomoran dimulai dari 1 bukan 0.'
    },
    {
      salah: 'Mengira sindrom hanya menandakan ada atau tidaknya kesalahan.',
      kenapa: 'Nilai sindrom bukan sekadar penanda, melainkan nomor posisi bit yang rusak. Menganggapnya sekadar bendera membuat seluruh keunggulan Hamming hilang, dan soal ujian yang meminta menentukan bit mana yang rusak jadi tidak terjawab.',
      benar: 'Sindrom 0 berarti tidak ada kesalahan. Sindrom bukan 0 adalah nomor posisi bit yang rusak, tinggal dibalik untuk memperbaikinya.'
    },
    {
      salah: 'Mengira kode Hamming dasar sanggup memperbaiki dua bit yang rusak sekaligus.',
      kenapa: 'Dengan dua bit rusak, sindrom yang dihasilkan adalah gabungan keduanya dan menunjuk posisi ketiga yang sebenarnya sehat. Kalau bit itu ikut dibalik, datanya justru bertambah rusak. Pada contoh kode, bit 6 dan 11 yang rusak menghasilkan sindrom 13.',
      benar: 'Hamming dasar bersifat SEC, hanya memperbaiki satu bit. Untuk mendeteksi dua bit rusak perlu satu bit paritas menyeluruh tambahan, membentuk SEC-DED.'
    },
    {
      salah: 'Menganggap biaya bit paritas selalu berat karena untuk 8 bit data butuh 4 bit paritas.',
      kenapa: 'Persentasenya menurun tajam seiring bertambahnya data. Untuk 8 bit data memang 50 persen, tetapi untuk 512 bit data cukup 9 bit paritas, kurang dari 2 persen. Menyimpulkan dari kasus terkecil membuat orang mengira koreksi error tidak praktis, padahal justru murah pada memori besar.',
      benar: 'Lihat tabelnya secara utuh dan perhatikan tren persentasenya. Inilah sebabnya ECC RAM pada server bisa memakai prinsip ini tanpa pemborosan berarti.'
    }
  ],

  analogi: `Bayangkan kamu menitipkan pesan berisi delapan angka lewat kurir, dan khawatir ada satu angka yang salah tulis di jalan.

**Paritas sederhana** adalah menambahkan catatan *"jumlah seluruh angka ini genap"*. Kalau sampai tujuan jumlahnya ganjil, kamu tahu **ada yang salah** — tetapi tidak tahu angka yang mana. Delapan angka, delapan tersangka, dan tidak ada cara memilih. Lebih buruk lagi, kalau **dua** angka salah, jumlahnya bisa genap kembali dan kesalahannya lolos begitu saja.

**Kode Hamming** adalah menambahkan **beberapa catatan yang wilayah pengawasannya sengaja tumpang tindih**:

- Catatan 1 mengawasi angka di posisi ganjil
- Catatan 2 mengawasi posisi 2, 3, 6, 7
- Catatan 4 mengawasi posisi 4, 5, 6, 7

Sekarang bayangkan angka di posisi 6 yang salah. Catatan 2 mengeluh, catatan 4 mengeluh, catatan 1 diam. Kamu jumlahkan yang mengeluh: **2 + 4 = 6**. Ketemu, tanpa perlu memeriksa satu per satu.

Kenapa ini bekerja? Karena setiap posisi punya **himpunan pengawas yang unik**, dan himpunan itu sebenarnya **nomor posisinya sendiri yang ditulis dalam biner**. Bukan kebetulan — memang begitu dirancangnya.

Dan kenapa dua kesalahan menipunya? Karena kalau posisi 6 dan 11 sama-sama salah, keluhan yang muncul adalah gabungan keduanya, dan jumlahnya menunjuk **posisi ketiga yang sebenarnya baik-baik saja**. Kamu akan "memperbaiki" angka yang benar, dan pesannya justru makin kacau. Itulah kenapa perlu satu catatan tambahan yang mengawasi **seluruhnya** — supaya kamu setidaknya tahu kapan harus menyerah dan minta kiriman ulang.`,

  latihan: [
    'Jelaskan perbedaan kesalahan berat dan kesalahan ringan pada memori, dan mana yang bisa dikoreksi.',
    'Tuliskan posisi mana saja yang diawasi C1, C2, C4, dan C8 pada rangkaian sepanjang 15 bit. Tunjukkan bagaimana kamu menentukannya dari bentuk biner nomor posisinya.',
    'Sebuah rangkaian Hamming menghasilkan sindrom bernilai 11. Bit posisi berapa yang rusak, dan bit paritas mana saja yang gagal?',
    'Jelaskan kenapa bit paritas harus ditaruh di posisi pangkat dua, bukan di ujung rangkaian.',
    'Berapa bit paritas SEC yang dibutuhkan untuk 32 bit data dan untuk 512 bit data? Hitung persentasenya masing-masing terhadap bit data, lalu jelaskan apa artinya bagi ECC RAM.',
    'Jelaskan apa yang terjadi kalau dua bit rusak sekaligus pada kode Hamming SEC, dan kenapa hasilnya bisa lebih buruk daripada tidak melakukan koreksi sama sekali.'
  ]
});

TOPICS.push({
  id: 'orkom-bus',
  judul: 'Sistem Bus',
  kategori: 'orkom',
  tag: ['bus', 'interkoneksi', 'arbitrasi', 'sinkron', 'asinkron', 'USB', 'lebar bus'],
  ringkas: 'Jalan raya yang menghubungkan CPU, memori, dan I/O — beserta aturan lalu lintasnya.',

  fungsi: `**Memahami jalur yang menghubungkan seluruh bagian komputer — dan kenapa ia sering jadi penghambat.**

Prosesor bisa secepat apa pun, tetapi kalau jalur ke memori atau ke kartu grafis sempit, kecepatan itu terbuang menunggu.

Terpakai di:

- **Membaca spesifikasi** — PCIe 4.0 x16 lawan x8, DDR4 lawan DDR5, apa artinya
- **Merakit komputer** — memasang SSD NVMe di slot yang salah membuatnya berjalan setengah kecepatan
- **Menjelaskan hambatan** — kartu grafis kencang yang terhambat jalur sempit
- **Sistem tertanam** — I2C, SPI, dan UART adalah bus dengan prinsip yang sama

Tiga jenis jalurnya, dan masing-masing membawa hal berbeda: **bus alamat** menentukan **berapa banyak memori** yang bisa dijangkau, **bus data** menentukan **berapa banyak sekaligus**, dan **bus kendali** menentukan **operasi apa** yang sedang terjadi.

Yang paling sering terpakai: lebar bus alamat menentukan batas memori. Ini alasan sistem 32 bit tidak bisa memakai RAM lebih dari sekitar 4 GB.`,

  praktik: {
    tujuan: `Kamu bisa menghitung batas memori dari lebar bus alamat, membaca spesifikasi bus pada komputermu, dan menemukan hambatan pada jalur datanya.`,
    alat: [
      'Terminal',
      'Alat informasi perangkat keras: CPU-Z, HWiNFO, atau lspci di Linux'
    ],
    langkah: [
      { judul: 'Hitung batas memori dari lebar alamat',
        isi: `Jumlah alamat yang bisa dijangkau adalah \`2^lebar\`.

- 16 bit → 65.536 alamat = 64 KB
- 32 bit → sekitar 4,29 miliar = **4 GB**
- 64 bit → sekitar 18,4 triliun GB, jauh melampaui kebutuhan

Hitung sendiri dengan Python: \`2**32 / (1024**3)\`. Ini jawaban langsung atas pertanyaan kenapa Windows 32 bit mentok di 4 GB.` },
      { judul: 'Hitung lebar pita bus data',
        isi: `Lebar pita = lebar bus dikali frekuensi.

Bus 64 bit pada 3200 MHz memberi \`8 byte x 3.200.000.000 = 25,6 GB per detik\`.

Bandingkan dengan spesifikasi RAM DDR4-3200 yang tertulis. Angkanya akan cocok, dan sekarang kamu tahu dari mana asalnya.` },
      { judul: 'Lihat perangkat di bus komputermu',
        isi: `- Linux: \`lspci -v\` menampilkan semua perangkat PCI beserta lebar jalurnya
- Windows: Device Manager, atau HWiNFO untuk rinciannya

Cari kartu grafis dan SSD-mu. Periksa apakah ia berjalan pada lebar jalur maksimalnya — SSD NVMe yang terpasang di slot x2 alih-alih x4 berjalan setengah kecepatan.` },
      { judul: 'Ukur lebar pita nyata',
        isi: `Buat program yang menyalin array besar berulang kali, lalu hitung berapa GB per detik yang tercapai.

Bandingkan dengan angka teori dari langkah kedua. Yang nyata selalu lebih rendah — itulah **efisiensi bus**, yang dipengaruhi overhead protokol dan pola aksesmu.` },
      { judul: 'Bedakan bus paralel dan serial',
        isi: `Dulu bus lebar dan paralel dianggap lebih cepat. Sekarang justru sebaliknya: PCIe, SATA, dan USB semuanya **serial**.

Sebabnya: pada kecepatan tinggi, jalur paralel bermasalah karena sinyalnya tidak sampai bersamaan — disebut *clock skew*. Jalur serial yang sangat cepat lebih mudah dijaga.

Ini contoh bagus bahwa "lebih lebar berarti lebih cepat" tidak selalu benar.` },
      { judul: 'Kenali arbitrase bus',
        isi: `Kalau beberapa perangkat ingin memakai bus bersamaan, harus ada yang mengatur giliran.

Cara yang lazim: **terpusat** dengan satu pengatur, atau **terdistribusi** dengan aturan prioritas.

Ini masalah yang persis sama dengan **sinkronisasi** di Sistem Operasi — sumber daya bersama yang diperebutkan, dan butuh aturan agar tidak kacau.` }
    ],
    cek: [
      'Kamu bisa menghitung batas memori sistem 32 bit dan menjelaskan kenapa angkanya 4 GB',
      'Lebar pita teori yang kamu hitung cocok dengan spesifikasi RAM yang tertulis',
      'Kamu tahu berapa lebar jalur PCIe yang dipakai kartu grafis atau SSD-mu'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Bus** adalah lintasan penghubung yang dipakai bersama oleh beberapa modul komputer. Sifat "**dipakai bersama**" inilah yang melahirkan hampir semua persoalan di topik ini: kalau satu jalur dipakai banyak pihak, harus ada aturan siapa boleh memakai kapan.

**Tiga modul yang dihubungkan** adalah CPU, memori, dan I/O.

**Struktur bus — tiga saluran**

- **Bus data** — menyalurkan data yang dipindahkan. **Lebarnya menentukan berapa bit yang bisa dipindahkan sekali waktu.**
- **Bus alamat** — menyalurkan alamat tujuan. **Lebarnya menentukan berapa banyak lokasi yang bisa direferensikan.**
- **Bus kontrol** — menyalurkan sinyal perintah dan pewaktuan, misalnya *memory read*, *memory write*, *I/O read*.

**Lebar bus dan akibatnya**

Slide kuliah menyebutkannya singkat, tetapi akibatnya besar:

- Makin lebar **bus data**, makin besar data yang dapat ditransfer sekali waktu.
- Makin lebar **bus alamat**, makin banyak lokasi yang dapat direferensikan.

Hubungannya dengan bus alamat bersifat **pangkat dua**: bus alamat selebar **n bit** bisa mengalamati **2^n** lokasi. Inilah sebabnya sistem 32 bit terbatas pada 4 GB — 2 pangkat 32 sama dengan sekitar 4 miliar lokasi.

**Jenis bus**

- **Dedicated bus** — bus yang khusus menyalurkan jenis informasi tertentu saja, misalnya data saja atau alamat saja.
- **Multiplexed bus** — satu bus dilalui informasi yang berbeda-beda, baik data, alamat, maupun sinyal kontrol, dengan metode multipleks.

Keuntungan multiplexed adalah **hanya memerlukan saluran sedikit sehingga hemat tempat**. Kerugiannya, **kecepatan transfer menurun** dan diperlukan **mekanisme kompleks untuk mengurai** data yang telah dimultipleks.

**Metode arbitrasi — siapa yang boleh memakai bus**

Karena bus dipakai bersama, harus ada yang menentukan giliran. Perangkat yang sedang berhak disebut **master**.

- **Tersentral** — ada satu pengontrol bus sentral atau **arbiter** yang mengatur penggunaan bus oleh modul. Arbiter bisa berupa modul tersendiri atau bagian dari fungsi CPU.
- **Terdistribusi** — setiap modul memiliki **logika pengontrol akses** sendiri yang mengatur pertukaran data melalui bus.

Intinya sama: kedua metode menugaskan satu perangkat, bisa modul I/O maupun CPU, untuk bertindak sebagai master pengontrol pertukaran.

**Metode pewaktuan**

- **Sinkron** — kejadian di bus ditentukan oleh sebuah **pewaktu (clock)**. Satu transmisi 1 ke 0 disebut siklus bus dan menentukan besarnya slot waktu. Semua modul bisa membaca siklus clock, dan biasanya satu siklus untuk satu kejadian. **Mudah diterapkan dan cepat**, tetapi **kurang fleksibel** menangani peralatan yang berbeda kecepatan. Cocok untuk modul yang sudah jelas karakteristiknya.
- **Asinkron** — kejadian di bus **bergantung pada kejadian sebelumnya**, sehingga diperlukan sinyal validasi untuk mengidentifikasi data yang ditransfer. Sistem ini **mampu menggabungkan modul yang berbeda kecepatan maupun teknologinya**, asalkan aturan transfernya sama.

**Contoh bus nyata**: ISA, PCI, USB, dan SCSI. USB punya keuntungan khusus berupa kemampuan pasang-cabut tanpa mematikan komputer, dan menyediakan daya lewat kabelnya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Lebar bus alamat menentukan JANGKAUAN memori: 2^n lokasi\n\nfor n in [16, 20, 32, 40, 64]:\n    lokasi = 2 ** n\n    if lokasi >= 2**30:\n        ukuran = str(lokasi // 2**30) + " GB"\n    elif lokasi >= 2**20:\n        ukuran = str(lokasi // 2**20) + " MB"\n    else:\n        ukuran = str(lokasi // 2**10) + " KB"\n    print("bus alamat " + str(n).rjust(2) + " bit  ->  " +\n          format(lokasi, ",").rjust(22) + " lokasi  = " + ukuran)',
      penjelasan: `
Hubungan antara lebar bus alamat dan jangkauan memori bersifat **pangkat dua**, dan inilah yang menjelaskan banyak batasan yang pernah kamu dengar.

Setiap **satu bit** tambahan pada bus alamat **melipatgandakan** jangkauan. Bukan menambah sedikit — melipatgandakan.

Dari situ muncul angka-angka bersejarah yang mungkin sudah kamu kenal:

- **16 bit** → 64 KB. Inilah batas komputer 8-bit era 1970-an.
- **20 bit** → 1 MB. Batas legendaris Intel 8086, dan asal-usul kalimat yang sering dikutip tentang "cukup untuk siapa pun".
- **32 bit** → 4 GB. **Inilah sebabnya Windows 32-bit tidak bisa memakai RAM lebih dari 4 GB**, sekalipun kamu memasang 8 GB. Bukan karena perangkat lunaknya pelit, melainkan karena tidak ada nomor alamat untuk menunjuk byte di atas itu.
- **64 bit** → 16 exabyte. Jauh melampaui kebutuhan yang bisa dibayangkan sekarang, dan itulah sebabnya peralihan ke 64 bit dianggap akan bertahan sangat lama.

Perhatikan pembagian tugas antara kedua bus, karena ini sering ditanyakan:

- **Bus alamat** menentukan **berapa banyak** lokasi yang bisa dijangkau.
- **Bus data** menentukan **berapa banyak** bit yang bisa dipindahkan sekali jalan.

Keduanya tidak harus sama lebar. Prosesor 8088 memakai bus alamat 20 bit tetapi bus data hanya 8 bit — ia bisa menjangkau 1 MB, tetapi memindahkannya sedikit demi sedikit.
`
    },
    {
      bahasa: 'python',
      kode: '# Sinkron: semua bergerak mengikuti detak, terkunci\n#\n#  clock  ___|‾‾‾|___|‾‾‾|___|‾‾‾|___\n#  data      < D1  >< D2  >< D3  >\n#         setiap slot waktu SAMA panjang\n\n# Asinkron: pakai jabat tangan, tiap kejadian menunggu yang sebelumnya\n#\n#  master:  REQUEST  ‾‾‾‾|________________|‾‾‾\n#  slave :  ACK      _________|‾‾‾‾‾‾|________\n#         panjang waktunya BEBAS, ikut kesiapan slave',
      penjelasan: `
Perbedaan keduanya adalah pertukaran antara **kesederhanaan** dan **kelenturan**.

Pada **sinkron**, semua modul mengikuti satu detak bersama. Setiap kejadian dijatah satu slot waktu yang **sama panjangnya**, dan panjang slot itu harus ditetapkan mengikuti **perangkat paling lambat**.

Di situlah kelemahannya. Kalau ada satu perangkat lambat di bus, **semua perangkat ikut melambat** — meski perangkat cepat sebenarnya sudah selesai dan hanya menunggu slot berakhir. Slide kuliah menyebutnya "kurang fleksibel menangani peralatan yang beda kecepatan operasinya".

Karena itu sinkron dipilih untuk modul yang **sudah jelas karakteristiknya**, misalnya bus antara CPU dan memori yang kecepatannya diketahui pasti dan seragam.

Pada **asinkron**, tidak ada detak bersama. Setiap kejadian bergantung pada kejadian sebelumnya, dan diperlukan **sinyal validasi** untuk menandai bahwa datanya sudah sah. Polanya berupa **jabat tangan** (*handshaking*): master mengirim permintaan, slave menjawab siap, barulah data berpindah.

Keuntungannya besar: perangkat cepat selesai cepat, perangkat lambat diberi waktu selama yang ia butuhkan. Slide menyebut sistem ini "mampu menggabungkan kerja modul yang berbeda kecepatan maupun teknologinya, asalkan aturan transfernya sama".

Harganya adalah kerumitan. Setiap pemindahan butuh beberapa kali bolak-balik sinyal, dan untuk perangkat yang seragam kecepatannya, ini justru pemborosan.

Cara mengingatnya: **sinkron seperti aba-aba baris-berbaris**, semua melangkah bersama pada hitungan yang sama. **Asinkron seperti percakapan**, satu bicara lalu menunggu jawaban sebelum melanjutkan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Bus: jangkauan alamat, lebar data, dan arbitrasi
# ============================================

# ---------- Bus alamat menentukan jangkauan ----------
print("--- lebar bus alamat -> jangkauan memori ---")
for n in [16, 20, 32, 64]:
    lokasi = 2 ** n
    print("  " + str(n).rjust(2) + " bit  ->  2^" + str(n) +
          " = " + format(lokasi, ",") + " lokasi")

# ---------- Bus data menentukan kecepatan pindah ----------
print("")
print("--- lebar bus data -> waktu memindahkan 1 MB ---")
DATA = 1024 * 1024          # byte
for lebar_bit in [8, 16, 32, 64]:
    lebar_byte = lebar_bit // 8
    siklus = DATA // lebar_byte
    print("  " + str(lebar_bit).rjust(2) + " bit  ->  " +
          format(siklus, ",").rjust(10) + " siklus bus")


# ============================================
# Arbitrasi: siapa jadi master
# ============================================

class ArbiterTersentral:
    """Satu pengontrol memutuskan giliran semua modul."""
    def __init__(self, modul):
        self.modul = modul
        self.giliran = 0

    def beri_izin(self):
        m = self.modul[self.giliran]
        self.giliran = (self.giliran + 1) % len(self.modul)
        return m


class ArbiterTerdistribusi:
    """Tiap modul punya logika sendiri; prioritas tertinggi menang."""
    def __init__(self, modul):
        self.modul = modul          # urutan = prioritas

    def beri_izin(self, yang_minta):
        for m in self.modul:
            if m in yang_minta:
                return m
        return None


modul = ["CPU", "Disk", "Jaringan", "Printer"]

print("")
print("--- arbitrasi tersentral (bergilir) ---")
a = ArbiterTersentral(modul)
for _ in range(6):
    print("  master:", a.beri_izin())

print("")
print("--- arbitrasi terdistribusi (prioritas) ---")
b = ArbiterTerdistribusi(modul)
for permintaan in [{"Disk", "Printer"}, {"Printer"}, {"CPU", "Jaringan"}]:
    print("  yang minta " + str(sorted(permintaan)).ljust(26) +
          "-> master: " + str(b.beri_izin(permintaan)))

# Keduanya menugaskan SATU perangkat sebagai master.
# Bedanya cuma siapa yang memutuskan.`
  },

  output: `--- lebar bus alamat -> jangkauan memori ---
  16 bit  ->  2^16 = 65,536 lokasi
  20 bit  ->  2^20 = 1,048,576 lokasi
  32 bit  ->  2^32 = 4,294,967,296 lokasi
  64 bit  ->  2^64 = 18,446,744,073,709,551,616 lokasi

--- lebar bus data -> waktu memindahkan 1 MB ---
   8 bit  ->   1,048,576 siklus bus
  16 bit  ->     524,288 siklus bus
  32 bit  ->     262,144 siklus bus
  64 bit  ->     131,072 siklus bus

--- arbitrasi tersentral (bergilir) ---
  master: CPU
  master: Disk
  master: Jaringan
  master: Printer
  master: CPU
  master: Disk

--- arbitrasi terdistribusi (prioritas) ---
  yang minta ['Disk', 'Printer']       -> master: Disk
  yang minta ['Printer']               -> master: Printer
  yang minta ['CPU', 'Jaringan']       -> master: CPU`,

  kesalahanUmum: [
    {
      salah: 'Menukar peran bus data dan bus alamat.',
      kenapa: 'Keduanya sama-sama bus dan sama-sama diukur dalam bit, sehingga mudah tertukar. Padahal akibat lebarnya berbeda jenis: bus data menentukan berapa banyak bit dipindahkan sekali jalan, sedangkan bus alamat menentukan berapa banyak lokasi bisa dijangkau. Soal hitungan jangkauan memori akan salah total kalau memakai lebar bus data.',
      benar: 'Bus alamat menentukan jangkauan sebesar 2 pangkat n lokasi. Bus data menentukan berapa bit sekali pindah. Keduanya tidak harus sama lebar.'
    },
    {
      salah: 'Mengira sistem 32 bit tidak bisa memakai RAM di atas 4 GB karena keterbatasan sistem operasi.',
      kenapa: 'Batasnya berasal dari lebar bus alamat, yaitu 2 pangkat 32 sama dengan sekitar 4 miliar lokasi. Tidak ada nomor alamat untuk menunjuk byte di atas itu, sehingga memasang RAM lebih besar tidak menolong. Menyalahkan sistem operasi membuat orang mencari solusi perangkat lunak untuk masalah perangkat keras.',
      benar: 'Kaitkan langsung dengan lebar bus alamat. Jangkauan 2 pangkat 32 adalah batas keras, dan jalan keluarnya adalah bus alamat yang lebih lebar.'
    },
    {
      salah: 'Mengira pewaktuan sinkron selalu lebih cepat karena memakai clock.',
      kenapa: 'Slot waktu pada sinkron harus ditetapkan mengikuti perangkat paling lambat di bus, sehingga perangkat cepat ikut menunggu meski sudah selesai. Pada bus yang menghubungkan perangkat beragam kecepatan, asinkron justru lebih efisien karena tiap pemindahan hanya memakan waktu yang benar-benar dibutuhkan.',
      benar: 'Sinkron cepat dan sederhana untuk modul yang seragam dan sudah jelas karakteristiknya. Asinkron lebih luwes untuk modul yang berbeda-beda kecepatannya.'
    },
    {
      salah: 'Menganggap multiplexed bus selalu lebih baik karena hemat saluran.',
      kenapa: 'Penghematan tempatnya nyata, tetapi dibayar dengan kecepatan transfer yang menurun, karena data dan alamat harus bergantian lewat saluran yang sama. Selain itu diperlukan mekanisme kompleks untuk mengurai kembali informasi yang telah dimultipleks.',
      benar: 'Sebutkan pertukarannya sesuai slide: multiplexed hemat saluran tetapi lebih lambat dan lebih rumit, dedicated lebih cepat tetapi butuh lebih banyak jalur.'
    }
  ],

  analogi: `Bayangkan sebuah jalan raya satu jalur yang dipakai bersama seluruh warga kompleks.

**Bus data** adalah **lebar jalannya** — menentukan berapa banyak barang bisa lewat sekali angkut. **Bus alamat** adalah **sistem penomoran rumahnya** — menentukan sampai rumah nomor berapa kurir bisa mengantar. Nomor rumah tiga digit berarti maksimal seribu rumah, mau sepanjang apa pun jalannya.

Dari sini batas 4 GB jadi jelas: kalau nomor rumah cuma sampai 4 miliar, membangun rumah ke-4.000.000.001 percuma — **tidak ada alamat untuk menuliskannya**, jadi tidak ada kurir yang bisa menemukannya.

**Bus kontrol** adalah **rambu-rambunya**: perintah berhenti, jalan, ambil, antar.

**Arbitrasi** adalah aturan siapa boleh lewat duluan di persimpangan:

- **Tersentral** — ada **polisi lalu lintas** di tengah yang mengatur semuanya. Sederhana, tapi kalau polisinya pingsan, seluruh lalu lintas mati.
- **Terdistribusi** — tidak ada polisi, tapi **setiap pengemudi tahu aturan mainnya** dan mengalah sesuai prioritas. Lebih tahan gangguan, tapi tiap kendaraan jadi harus lebih pintar.

**Pewaktuan** adalah cara mengatur giliran:

- **Sinkron** adalah **lampu lalu lintas dengan hitungan tetap** — 30 detik untuk semua, tanpa peduli yang lewat sepeda atau truk. Sederhana dan tertib. Tapi kalau ada satu truk lambat, hitungan 30 detik itu harus dipatok mengikuti si truk, dan **semua sepeda ikut menunggu** meski sudah lewat sejak detik kelima.
- **Asinkron** adalah **persimpangan tanpa lampu, pakai lambaian tangan**. Kamu jalan, sampai, lalu melambai bahwa sudah aman. Yang cepat selesai cepat, yang lambat diberi waktu. Lebih efisien, tapi butuh lebih banyak isyarat bolak-balik.`,

  latihan: [
    'Sebutkan tiga saluran penyusun sistem bus beserta tugas masing-masing.',
    'Hitung berapa lokasi yang bisa dijangkau bus alamat 24 bit dan 36 bit. Jelaskan kenapa sistem 32 bit terbatas pada 4 GB.',
    'Jelaskan perbedaan dedicated bus dan multiplexed bus, lengkap dengan keuntungan dan kerugian multiplexed menurut slide kuliah.',
    'Jelaskan perbedaan arbitrasi tersentral dan terdistribusi, dan sebutkan persamaan tujuan keduanya.',
    'Jelaskan kenapa pewaktuan sinkron kurang cocok untuk bus yang menghubungkan perangkat dengan kecepatan sangat berbeda, lalu jelaskan bagaimana asinkron mengatasinya.',
    'Sebuah bus data selebar 16 bit dipakai memindahkan berkas 4 MB. Berapa siklus bus yang dibutuhkan? Bandingkan dengan bus 64 bit.'
  ]
});

