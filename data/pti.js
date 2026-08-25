/* ============================================================
   pti.js — materi Pengantar Teknologi Informasi (Semester 1)

   CATATAN SUMBER — baca ini sebelum memakai materinya.

   Berkas kuliah yang tersedia untuk mata kuliah ini cuma tiga:
     - Rangkuman PTI(1).docx
     - Proposal Sistem Informasi Rumah Sakit.docx (tugas)
     - Biografi Steve Jobs.txt (tugas)

   Tidak ada satu pun slide dosen. "Rangkuman PTI(1).docx" sendiri
   kuat dugaannya dibuat dengan bantuan AI -- ia ditutup kalimat
   "Jika ada bagian tertentu yang ingin kamu diskusikan lebih
   lanjut ... silakan beri tahu!", yang khas keluaran chatbot.

   Karena itu rangkuman tersebut dipakai HANYA sebagai kerangka
   daftar topik, bukan sebagai sumber fakta. Isi tiap topik di
   sini disusun ulang dari silabus PTI baku dan diperiksa sendiri.

   Akibatnya: urutan dan penekanan materi ini mungkin TIDAK sama
   dengan yang diajarkan dosenmu. Kalau slide aslinya nanti ketemu,
   berkas ini perlu dicocokkan ulang.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep".
   ============================================================ */

TOPICS.push({
  id: 'pti-data-informasi',
  judul: 'Data, Informasi & Pengetahuan',
  kategori: 'pti',
  tag: ['data', 'informasi', 'pengetahuan', 'DIKW', 'kualitas informasi'],
  ringkas: 'Tiga kata yang dipakai bergantian sehari-hari, padahal urutannya menjelaskan seluruh gunanya TI.',

  fungsi: `**Membedakan tumpukan angka dari sesuatu yang benar-benar membantu mengambil keputusan.**

Terpakai di:

- **Menyusun laporan** yang dibaca orang, bukan diabaikan
- **Merancang dasbor** — memilih apa yang ditampilkan dan apa yang tidak
- **Menilai kebutuhan sistem** — data apa yang perlu dikumpulkan sejak awal
- **Sistem Informasi semester 5** — topik yang sama dibahas jauh lebih dalam di sana

Yang paling langsung terpakai: **jangan mengumpulkan data yang tidak akan mengubah keputusan apa pun.** Setiap kolom yang kamu simpan punya biaya — ruang, waktu pengisian, dan risiko kebocoran.`,

  praktik: {
    tujuan: `Kamu bisa menilai apakah sebuah laporan menghasilkan informasi atau sekadar memindahkan data, dan bisa memperbaikinya.`,
    alat: [
      'Satu laporan atau dasbor yang pernah kamu buat atau terima'
    ],
    langkah: [
      { judul: 'Ambil satu laporan nyata',
        isi: `Pakai laporan tugas kelompok, rekap nilai, atau dasbor apa pun yang pernah kamu lihat.

Bekerja dari contoh nyata jauh lebih berguna daripada contoh buatan.` },
      { judul: 'Tandai tiap angka: data atau informasi?',
        isi: `Untuk setiap angka, tanyakan: **keputusan apa yang berubah karenanya?**

Kalau tidak ada jawabannya, itu masih **data** bagi pembacanya — betapa pun akurat angkanya.` },
      { judul: 'Tambahkan pembanding',
        isi: `Angka tunggal hampir tidak pernah berarti. "Penjualan 45 juta" tidak memberi tahu apa-apa.

"Penjualan 45 juta, naik 12 persen dari bulan lalu, di bawah target 50 juta" — sekarang ia berarti.

**Pembanding adalah cara termurah mengubah data menjadi informasi.**` },
      { judul: 'Buang yang tidak mengubah tindakan',
        isi: `Hapus setiap angka yang tidak lolos uji langkah kedua.

Laporanmu akan jauh lebih pendek, dan justru **lebih banyak informasinya yang sampai** — karena yang penting tidak lagi tenggelam.` },
      { judul: 'Naikkan satu tingkat ke pengetahuan',
        isi: `Cari **pola** di beberapa periode, bukan cuma angka satu periode.

"Penjualan selalu turun di minggu keempat" adalah pengetahuan — ia bisa dipakai untuk merencanakan, bukan cuma melaporkan.` },
      { judul: 'Tulis satu kalimat tindakan di paling atas',
        isi: `Laporan yang baik dimulai dari **apa yang perlu dilakukan**, bukan dari tabelnya.

*"Stok produk A perlu ditambah minggu ini"* di baris pertama, lalu angkanya sebagai pendukung.

Ini kebalikan dari kebiasaan mahasiswa, dan jauh lebih berguna bagi yang membaca.` }
    ],
    cek: [
      'Setiap angka di laporanmu bisa kamu kaitkan dengan satu keputusan',
      'Setiap angka punya pembanding, entah periode lalu atau target',
      'Baris pertama laporanmu berisi tindakan, bukan tabel'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dibedakan begitu',

  konsep: `
**Teknologi Informasi** adalah penggunaan sistem komputer dan perangkat lunak untuk mengelola dan memproses informasi — mengumpulkan, menyimpan, mengolah, dan mendistribusikan data supaya orang bisa mengambil keputusan lebih baik.

Perhatikan kata terakhirnya: **keputusan**. Itulah tujuan akhir seluruh bidang ini. Bukan mengumpulkan data sebanyak-banyaknya, melainkan menghasilkan sesuatu yang bisa ditindaklanjuti.

**Tiga tingkat yang harus dibedakan**

- **Data** — fakta mentah, belum punya makna sendiri. Contoh: \`38\`, \`"Andi"\`, \`2024-09-01\`.
- **Informasi** — data yang sudah diolah sehingga **punya makna dalam konteks**. Contoh: *"Suhu badan Andi 38 derajat pada 1 September."*
- **Pengetahuan** — informasi yang digabung dengan pengalaman sehingga **bisa dipakai bertindak**. Contoh: *"Suhu 38 derajat berarti demam, dan demam tiga hari berturut-turut perlu diperiksa dokter."*

Angka \`38\` sendirian tidak berarti apa-apa. Bisa suhu, bisa umur, bisa nomor rumah. **Yang mengubahnya menjadi informasi adalah konteks**: apa satuannya, milik siapa, kapan.

Susunan ini sering digambarkan sebagai piramida **DIKW** — *Data, Information, Knowledge, Wisdom*. Tingkat teratas, **kebijaksanaan**, adalah tahu **kapan** dan **apakah sebaiknya** bertindak. Makin ke atas, makin sedikit isinya dan makin besar nilainya.

**Kenapa pembedaan ini penting bagi seorang informatikawan?**

Karena ia menentukan apa yang kamu bangun. Sistem yang cuma menumpuk data tanpa mengubahnya jadi informasi **tidak menolong siapa-siapa** — ia hanya memindahkan kebingungan dari kertas ke layar. Laporan berisi sepuluh ribu baris angka adalah data; grafik yang menunjukkan penjualan turun tiga bulan berturut-turut adalah informasi.

**Kualitas informasi**

Informasi baru berguna kalau memenuhi beberapa syarat. Yang paling sering disebut:

- **Akurat** — bebas dari kesalahan
- **Tepat waktu** — tersedia saat dibutuhkan. Informasi yang benar tetapi datang setelah keputusan diambil bernilai nol.
- **Relevan** — sesuai kebutuhan penerimanya
- **Lengkap** — tidak ada bagian penting yang hilang
- **Ringkas** — tidak tenggelam dalam hal yang tidak perlu

Syarat **tepat waktu** paling sering diremehkan, padahal ia yang membuat banyak sistem gagal. Laporan bulanan yang baru terbit tanggal 25 bulan berikutnya secara teknis akurat, tetapi tidak lagi bisa dipakai memperbaiki apa pun.

**Sejarah singkat**

Sejarah TI dimulai dari komputer pertama pada 1940-an, mesin besar yang hanya bisa dioperasikan ilmuwan dan insinyur. Penemuan **Internet** pada 1960-an dan 1970-an membawa perubahan besar berikutnya, dan komputer perlahan berubah menjadi perangkat kecil yang dipakai orang kebanyakan.

Peran TI hari ini menyentuh hampir semua bidang: bisnis, pendidikan, kesehatan, hiburan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# DATA: fakta mentah, tanpa makna sendiri\nsuhu = 38\n\n# INFORMASI: data + konteks\nprint("Suhu badan Andi " + str(suhu) + " derajat pada 2024-09-01")\n\n# PENGETAHUAN: informasi + aturan/pengalaman\nif suhu >= 37.5:\n    print("Termasuk demam")\nif hari_demam >= 3:\n    print("Perlu diperiksa dokter")',
      penjelasan: `
Kode ini memperlihatkan ketiga tingkat sebagai **tiga jenis baris yang berbeda**, dan pemisahannya bukan main-main.

**Baris pertama** cuma menyimpan angka. Kalau kamu menemukan variabel bernama \`x\` berisi \`38\` di dalam berkas orang lain, kamu tidak bisa berbuat apa-apa dengannya. Itu **data**.

**Baris kedua** menambahkan konteks: milik siapa, satuannya apa, kapan diambilnya. Sekarang angka itu bisa dibaca manusia dan dipahami. Itu **informasi**.

**Baris ketiga dan seterusnya** menambahkan **aturan**. Ambang 37,5 derajat bukan bagian dari data — ia pengetahuan medis yang datang dari luar, hasil pengalaman banyak orang selama bertahun-tahun. Itulah yang mengubah pembacaan menjadi tindakan.

Perhatikan bahwa **aturannya bisa salah tanpa datanya salah**. Kalau ambangnya keliru ditulis 39, angka 38 tetap akurat tetapi kesimpulannya berbahaya. Ini pengingat penting: memvalidasi data saja tidak cukup, aturan pengolahannya juga harus diperiksa.

Pembedaan ini punya akibat langsung saat kamu merancang program. Nilai ambang seperti 37,5 sebaiknya **tidak ditulis langsung berserakan di tengah kode**, melainkan disimpan sebagai konstanta bernama. Sebab ia bukan sekadar angka — ia **pengetahuan** yang suatu saat bisa direvisi, dan saat itu terjadi kamu ingin mengubahnya di satu tempat saja.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Dari data mentah ke informasi yang bisa ditindaklanjuti
# ============================================

# ---------- DATA: catatan mentah, belum berarti ----------
catatan = [
    ("2024-09-01", "Andi",  38.2),
    ("2024-09-02", "Andi",  38.5),
    ("2024-09-03", "Andi",  38.1),
    ("2024-09-01", "Budi",  36.7),
    ("2024-09-02", "Budi",  36.9),
    ("2024-09-01", "Citra", 37.9),
]

# ---------- PENGETAHUAN: aturan yang datang dari luar data ----------
AMBANG_DEMAM = 37.5        # aturan medis, bukan hasil pengukuran
HARI_PERLU_DOKTER = 3

# ---------- INFORMASI: data + konteks ----------
print("--- informasi harian ---")
for tanggal, nama, suhu in catatan:
    status = "demam" if suhu >= AMBANG_DEMAM else "normal"
    print("  " + tanggal + "  " + nama.ljust(6) +
          format(suhu, "4.1f") + " C  -> " + status)

# ---------- PENGETAHUAN: informasi + aturan -> tindakan ----------
hari_demam = {}
for tanggal, nama, suhu in catatan:
    if suhu >= AMBANG_DEMAM:
        hari_demam[nama] = hari_demam.get(nama, 0) + 1

print("")
print("--- kesimpulan yang bisa ditindaklanjuti ---")
for nama, hari in sorted(hari_demam.items()):
    if hari >= HARI_PERLU_DOKTER:
        print("  " + nama + ": demam " + str(hari) +
              " hari berturut-turut -> PERLU DIPERIKSA DOKTER")
    else:
        print("  " + nama + ": demam " + str(hari) + " hari -> pantau dulu")

# Perhatikan: baris terakhir inilah yang benar-benar berguna.
# Enam baris data mentah di atas tidak menolong siapa pun
# sampai diolah jadi satu kalimat yang bisa ditindaklanjuti.`
  },

  output: `--- informasi harian ---
  2024-09-01  Andi  38.2 C  -> demam
  2024-09-02  Andi  38.5 C  -> demam
  2024-09-03  Andi  38.1 C  -> demam
  2024-09-01  Budi  36.7 C  -> normal
  2024-09-02  Budi  36.9 C  -> normal
  2024-09-01  Citra 37.9 C  -> demam

--- kesimpulan yang bisa ditindaklanjuti ---
  Andi: demam 3 hari berturut-turut -> PERLU DIPERIKSA DOKTER
  Citra: demam 1 hari -> pantau dulu`,

  kesalahanUmum: [
    {
      salah: 'Memakai kata data dan informasi secara bergantian seolah artinya sama.',
      kenapa: 'Keduanya berbeda tingkat: data adalah fakta mentah tanpa makna, informasi adalah data yang sudah diberi konteks. Menyamakannya membuat orang membangun sistem yang cuma menumpuk angka lalu heran kenapa tidak ada yang memakainya. Soal ujian yang meminta membedakan keduanya juga jadi tidak terjawab.',
      benar: 'Uji dengan pertanyaan sederhana: bisakah ini dipahami tanpa penjelasan tambahan? Angka 38 sendirian adalah data. "Suhu Andi 38 derajat" adalah informasi.'
    },
    {
      salah: 'Menganggap informasi yang akurat pasti berguna.',
      kenapa: 'Akurat hanyalah satu dari beberapa syarat. Informasi yang benar tetapi datang setelah keputusan diambil bernilai nol, dan informasi yang benar tetapi tenggelam di antara ribuan baris tidak akan terbaca. Syarat tepat waktu dan ringkas paling sering diremehkan padahal paling sering jadi penyebab sistem gagal dipakai.',
      benar: 'Periksa seluruh syaratnya: akurat, tepat waktu, relevan, lengkap, dan ringkas. Kegagalan pada satu syarat sudah cukup membuat informasi itu tidak terpakai.'
    },
    {
      salah: 'Menaruh aturan pengetahuan seperti nilai ambang langsung di tengah kode, berserakan di banyak tempat.',
      kenapa: 'Nilai ambang bukan data melainkan pengetahuan yang bisa direvisi. Kalau standar medisnya berubah dari 37,5 menjadi 37,8, kamu harus mencarinya di seluruh berkas dan pasti ada yang terlewat. Program lalu memberi dua kesimpulan berbeda untuk data yang sama.',
      benar: 'Simpan sebagai konstanta bernama di satu tempat, misalnya AMBANG_DEMAM. Perubahan aturan cukup disunting sekali.'
    }
  ],

  analogi: `Bayangkan kamu menemukan secarik kertas bertuliskan **"7"**.

Itu **data**. Kamu tidak bisa berbuat apa-apa. Tujuh apa? Tujuh ribu rupiah? Tujuh hari? Nomor tujuh?

Sekarang kertasnya bertuliskan **"Stok beras tersisa 7 karung, per 1 September"**. Itu **informasi** — angka yang sama, tetapi kini punya satuan, pemilik, dan waktu.

Lalu kamu tahu dari pengalaman bahwa **warung ini menghabiskan 3 karung per hari, dan pengiriman berikutnya baru lima hari lagi**. Itu **pengetahuan** — dan sekarang angka 7 berubah jadi kabar buruk yang menuntut tindakan.

Tingkat tertingginya, **kebijaksanaan**, adalah tahu bahwa menelepon pemasok jam dua pagi tidak akan menolong, dan lebih baik menunggu pagi sambil menahan penjualan.

Sekarang soal **tepat waktu**, syarat yang paling sering diremehkan. Kalau kertas itu baru kamu baca **seminggu kemudian**, isinya tetap akurat — stok memang tujuh karung waktu itu. Tetapi berasnya sudah habis tiga hari lalu, dan pelangganmu sudah pindah ke warung sebelah.

**Informasi yang benar tetapi terlambat sama tidak bergunanya dengan informasi yang salah.** Itulah kenapa laporan bulanan yang terbit tanggal 25 bulan berikutnya jarang mengubah apa pun.`,

  latihan: [
    'Jelaskan perbedaan data, informasi, dan pengetahuan dengan satu contoh dari kehidupanmu sendiri yang berbeda dari contoh di materi.',
    'Sebutkan lima syarat kualitas informasi. Untuk masing-masing, beri satu contoh informasi yang gagal memenuhi syarat itu.',
    'Sebuah aplikasi kasir mencatat setiap transaksi ke berkas berisi tanggal, kode barang, dan jumlah. Sebutkan tiga informasi berguna yang bisa dihasilkan dari data itu, dan aturan pengetahuan apa yang diperlukan untuk masing-masing.',
    'Jelaskan kenapa laporan yang akurat tetapi terlambat bisa dianggap sama tidak bergunanya dengan laporan yang salah.',
    'Gambarkan piramida DIKW dan jelaskan kenapa bentuknya mengerucut ke atas.'
  ]
});

TOPICS.push({
  id: 'pti-komponen-si',
  judul: 'Komponen Sistem Informasi',
  kategori: 'pti',
  tag: ['sistem informasi', 'hardware', 'software', 'brainware', 'prosedur'],
  ringkas: 'Lima bagian yang harus ada sekaligus — dan dua di antaranya bukan teknologi.',

  fungsi: `**Menyadari bahwa sistem informasi jauh lebih luas daripada perangkat lunaknya.**

Ini pelajaran yang paling sering diabaikan mahasiswa Informatika, dan paling sering menjadi sebab proyek gagal.

Terpakai di:

- **Merencanakan proyek** — melatih pengguna dan menulis prosedur adalah bagian pekerjaan, bukan tambahan
- **Menjelaskan kegagalan** — sistem yang sempurna secara teknis tetap gagal kalau tidak dipakai
- **Kerja Praktik** — kamu akan melihat sendiri bahwa bagian tersulit biasanya manusianya
- **Menyusun anggaran** — perangkat lunak sering bukan biaya terbesar

Enam komponennya: perangkat keras, perangkat lunak, data, prosedur, jaringan, dan **manusia**.

Yang terakhir paling sering dilupakan, dan paling sering menentukan.`,

  praktik: {
    tujuan: `Kamu bisa memetakan keenam komponen pada sistem nyata, dan menemukan komponen mana yang paling berisiko pada proyekmu sendiri.`,
    alat: [
      'Satu sistem yang kamu pakai sehari-hari, misalnya SIA kampus'
    ],
    langkah: [
      { judul: 'Petakan keenam komponennya',
        isi: `Ambil sistem informasi akademik kampusmu, lalu tulis untuk masing-masing:

peladen dan perangkat mahasiswa, aplikasi web, data mahasiswa dan nilai, prosedur pengisian KRS, jaringan kampus, dan **siapa saja** yang terlibat.

Menuliskannya membuat kamu sadar berapa banyak yang bukan kode.` },
      { judul: 'Cari komponen yang paling sering bermasalah',
        isi: `Ingat-ingat kapan sistem itu terasa menyulitkan.

Sering kali penyebabnya bukan perangkat lunaknya — melainkan **prosedur** yang tidak jelas, atau **manusia** yang tidak dilatih.` },
      { judul: 'Tulis prosedur untuk satu tugas sendiri',
        isi: `Ambil satu fitur dari proyekmu, lalu tulis prosedur pemakaiannya untuk orang yang **belum pernah melihatnya**.

Kalau kamu kesulitan menuliskannya, itu tanda antarmukanya belum cukup jelas — dan itu temuan yang berharga.` },
      { judul: 'Uji dengan orang lain',
        isi: `Minta teman yang belum pernah memakai sistemmu untuk mengikuti prosedur itu, **tanpa kamu bantu**.

Catat di mana ia berhenti atau bertanya. Setiap titik itu adalah kelemahan yang tidak akan pernah kamu lihat sendiri.` },
      { judul: 'Anggarkan waktu untuk komponen manusia',
        isi: `Pada rencana proyekmu, tambahkan waktu khusus untuk: menulis panduan, melatih pengguna, dan menampung keluhan awal.

Kalau tidak dianggarkan, ia akan tetap terjadi — hanya saja memakan waktu yang seharusnya dipakai untuk hal lain.` },
      { judul: 'Periksa jaringan dan perangkatnya',
        isi: `Uji sistemmu di jaringan lambat dan di perangkat lama, bukan cuma di laptopmu.

Banyak sistem kampus terasa cepat bagi pembuatnya dan sangat lambat bagi mahasiswa yang memakai data seluler.` }
    ],
    cek: [
      'Kamu bisa menyebutkan keenam komponen pada satu sistem nyata',
      'Prosedur tertulismu bisa diikuti orang lain tanpa bantuanmu',
      'Sistemmu sudah diuji pada jaringan lambat atau perangkat lama'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Sistem informasi** adalah gabungan komponen yang bekerja sama untuk mengumpulkan, mengolah, menyimpan, dan menyebarkan informasi. Ada **lima komponen utama** yang saling berinteraksi:

- **Perangkat Keras** (*hardware*) — semua perangkat fisik: komputer, server, router, printer, perangkat penyimpanan. Kualitas dan spesifikasinya memengaruhi kinerja sistem.
- **Perangkat Lunak** (*software*) — program yang menginstruksikan perangkat keras. Terbagi dua: **perangkat lunak sistem** seperti Windows dan Linux yang mengelola perangkat keras, dan **perangkat lunak aplikasi** seperti pengolah kata dan spreadsheet yang menyelesaikan tugas tertentu.
- **Data** — fakta dan angka yang diproses menjadi informasi. Harus akurat, relevan, dan terkini.
- **Prosedur** — langkah-langkah yang diikuti untuk mengumpulkan, memproses, dan mendistribusikan informasi. Prosedur yang jelas menjaga konsistensi dan akurasi.
- **Pengguna** (*brainware*) — orang yang memakai sistem untuk mengambil keputusan atau menyelesaikan tugas: manajer, karyawan, konsumen.

**Bagian yang paling sering diremehkan**

Perhatikan bahwa **dua dari lima komponen bukan teknologi sama sekali**: prosedur dan pengguna.

Inilah yang paling sering dilupakan mahasiswa informatika, dan juga penyebab paling umum kegagalan proyek sistem informasi di dunia nyata. Sistem dengan perangkat keras mahal, perangkat lunak canggih, dan data lengkap tetap **gagal total** kalau:

- **Prosedurnya tidak jelas** — dua petugas memasukkan data yang sama dengan cara berbeda, dan laporannya jadi tidak bisa dipercaya.
- **Penggunanya tidak mau memakai** — karena tidak dilatih, karena terasa lebih ribet daripada cara lama, atau karena tidak dilibatkan saat sistemnya dirancang.

Kalimat yang layak diingat: **sistem informasi bukan cuma teknologi, melainkan teknologi ditambah orang dan cara kerjanya.**

**Sistem vs sistem informasi**

Perlu dibedakan juga: **sistem** adalah kumpulan bagian yang bekerja sama menuju satu tujuan. **Sistem informasi** adalah sistem yang tujuannya menghasilkan informasi.

Setiap sistem punya tiga bagian dasar yang sering ditanyakan:

- **Masukan** (*input*) — apa yang masuk
- **Proses** — apa yang dikerjakan
- **Keluaran** (*output*) — apa yang dihasilkan

Ditambah dua yang membuatnya bisa memperbaiki diri:

- **Umpan balik** (*feedback*) — keluaran yang dikembalikan sebagai masukan berikutnya
- **Kendali** (*control*) — yang memakai umpan balik untuk menyesuaikan proses
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Lima komponen -- dua di antaranya BUKAN teknologi\n\nkomponen = {\n    "Perangkat Keras": "teknologi",\n    "Perangkat Lunak": "teknologi",\n    "Data":            "teknologi",\n    "Prosedur":        "BUKAN teknologi",   # cara kerja\n    "Pengguna":        "BUKAN teknologi",   # orang\n}\n\n# Sistem gagal kalau SALAH SATU tidak ada.\n# Yang paling sering hilang justru dua yang terakhir.',
      penjelasan: `
Pembagian ini bukan sekadar penggolongan untuk dihafal — ia menjelaskan kenapa proyek sistem informasi begitu sering gagal.

Mahasiswa informatika terlatih memikirkan tiga komponen pertama. Perangkat keras, perangkat lunak, dan data adalah hal yang bisa dibeli, ditulis, dan diukur. Kalau ada masalah, ada tombol untuk diperbaiki.

**Prosedur** dan **pengguna** tidak begitu, dan justru di situlah kebanyakan proyek runtuh.

Contoh nyata yang sering terjadi: sebuah puskesmas memasang sistem rekam medis baru. Perangkatnya lengkap, aplikasinya jalan tanpa bug, basis datanya rapi. Tetapi:

- **Prosedurnya tidak ditetapkan.** Satu perawat menulis nama pasien dengan gelar, yang lain tanpa gelar. Satu memakai format tanggal hari-bulan-tahun, yang lain sebaliknya. Setelah setahun, mencari riwayat satu pasien jadi mustahil karena namanya tercatat dalam empat ejaan berbeda.
- **Penggunanya tidak dilibatkan.** Sistemnya menuntut dua belas kolom diisi untuk tiap pasien, padahal saat antrean panjang perawat cuma punya waktu mengisi tiga. Akhirnya mereka mengisi asal supaya bisa lanjut, dan datanya jadi sampah.

Tidak ada satu pun dari dua masalah itu yang bisa diperbaiki dengan menambah RAM atau memperbaiki kode.

Karena itu, saat kamu nanti merancang sistem — di Kerja Praktek, di skripsi, atau di pekerjaan — **tanyakan sejak awal siapa yang akan memakainya dan bagaimana cara kerja mereka sekarang.** Pertanyaan itu lebih menentukan keberhasilan daripada pilihan bahasa pemrograman.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Sistem informasi: input -> proses -> output
# dengan umpan balik dan kendali
# ============================================

class SistemInformasiStok:
    """Contoh kecil: sistem informasi stok gudang."""

    # ---------- PROSEDUR: aturan yang disepakati, bukan kode ----------
    # 1. Setiap barang masuk dicatat pada hari yang sama
    # 2. Nama barang ditulis huruf kecil semua, tanpa singkatan
    # 3. Stok di bawah batas minimum wajib dilaporkan
    BATAS_MINIMUM = 10

    def __init__(self):
        self.data = {}          # KOMPONEN: data
        self.peringatan = []

    def masukan(self, nama, jumlah):
        """INPUT -- prosedur nomor 2 ditegakkan di sini."""
        nama = nama.strip().lower()          # menegakkan prosedur
        self.data[nama] = self.data.get(nama, 0) + jumlah

    def proses(self):
        """PROSES + KENDALI -- memeriksa terhadap batas."""
        self.peringatan = []
        for nama, jumlah in self.data.items():
            if jumlah < self.BATAS_MINIMUM:
                self.peringatan.append((nama, jumlah))

    def keluaran(self):
        """OUTPUT -- informasi yang bisa ditindaklanjuti."""
        print("--- laporan stok ---")
        for nama, jumlah in sorted(self.data.items()):
            tanda = "  <-- PERLU DIPESAN" if jumlah < self.BATAS_MINIMUM else ""
            print("  " + nama.ljust(12) + str(jumlah).rjust(4) + tanda)

    def umpan_balik(self):
        """FEEDBACK -- keluaran jadi masukan untuk keputusan berikutnya."""
        return [nama for nama, _ in self.peringatan]


sistem = SistemInformasiStok()

# Perhatikan: tiga ejaan berbeda untuk barang yang SAMA.
# Tanpa prosedur, ketiganya jadi tiga baris terpisah.
sistem.masukan("Beras", 5)
sistem.masukan("beras ", 3)
sistem.masukan("  BERAS", 4)
sistem.masukan("gula", 25)
sistem.masukan("minyak", 7)

sistem.proses()
sistem.keluaran()

perlu_pesan = sistem.umpan_balik()
print("")
print("umpan balik -> daftar pesanan:", perlu_pesan)

# Beras tercatat 12 karena prosedur penyeragaman nama ditegakkan.
# Tanpa itu: "Beras"=5, "beras"=3, "BERAS"=4 -> tiga baris,
# ketiganya di bawah batas, dan gudang memesan tiga kali.`
  },

  output: `--- laporan stok ---
  beras         12
  gula          25
  minyak         7  <-- PERLU DIPESAN

umpan balik -> daftar pesanan: ['minyak']`,

  kesalahanUmum: [
    {
      salah: 'Menyebut sistem informasi hanya terdiri atas perangkat keras, perangkat lunak, dan data.',
      kenapa: 'Prosedur dan pengguna ikut hilang, padahal keduanya justru penyebab kegagalan paling umum di dunia nyata. Jawaban ujian jadi tidak lengkap, dan yang lebih buruk, cara berpikirnya terbawa saat merancang sistem sungguhan sehingga aspek manusianya tidak pernah dipikirkan.',
      benar: 'Sebutkan kelimanya: perangkat keras, perangkat lunak, data, prosedur, dan pengguna. Ingat bahwa dua terakhir bukan teknologi.'
    },
    {
      salah: 'Menganggap sistem yang secara teknis sempurna pasti berhasil dipakai.',
      kenapa: 'Sistem tanpa prosedur yang jelas menghasilkan data tidak konsisten, dan sistem yang tidak sesuai cara kerja penggunanya akan diakali atau ditinggalkan. Keduanya tidak bisa diperbaiki dengan memperbaiki kode, sehingga tim teknis sering kebingungan mencari penyebabnya di tempat yang salah.',
      benar: 'Periksa kelima komponen saat menilai sebuah sistem. Tanyakan siapa penggunanya dan bagaimana cara kerja mereka sekarang, sebelum menentukan teknologinya.'
    },
    {
      salah: 'Menukar perangkat lunak sistem dengan perangkat lunak aplikasi.',
      kenapa: 'Perangkat lunak sistem mengelola perangkat keras dan menyediakan antarmuka, contohnya Windows dan Linux. Perangkat lunak aplikasi menyelesaikan tugas tertentu bagi pengguna, contohnya pengolah kata. Menukarnya membuat penggolongan pada soal ujian jadi terbalik.',
      benar: 'Tanyakan siapa yang dilayani: kalau melayani perangkat keras dan program lain, itu perangkat lunak sistem. Kalau melayani pekerjaan pengguna, itu aplikasi.'
    }
  ],

  analogi: `Bayangkan sebuah restoran, tapi kali ini sebagai **sistem**.

- **Perangkat keras** adalah kompor, wajan, meja, dan mesin kasir.
- **Perangkat lunak** adalah resepnya.
- **Data** adalah bahan bakunya.
- **Prosedur** adalah **kesepakatan cara kerja**: pesanan ditulis di kertas warna kuning, pesanan yang sudah jadi ditaruh di rak kiri, uang kembalian dihitung dua kali.
- **Pengguna** adalah koki, pelayan, dan kasirnya.

Sekarang bayangkan restoran dengan dapur termahal di kota, resep dari koki bintang lima, dan bahan baku terbaik — **tetapi tidak ada kesepakatan cara kerja**. Pelayan A menulis pesanan di kertas, pelayan B menghafalnya, pelayan C berteriak ke dapur. Dalam satu jam, dapur kacau dan pesanan tertukar.

Atau bayangkan semuanya lengkap **tetapi pelayannya tidak pernah dilatih memakai mesin kasir barunya**. Mereka akhirnya mencatat di kertas seperti dulu, lalu memasukkan semuanya ke mesin sekaligus menjelang tutup — dengan banyak yang lupa. Mesin kasirnya berfungsi sempurna, dan datanya tetap sampah.

Itulah kenapa **prosedur dan pengguna dihitung sebagai komponen sistem**, sejajar dengan komputernya. Bukan pelengkap, bukan urusan bagian lain.`,

  latihan: [
    'Sebutkan lima komponen sistem informasi beserta contoh masing-masing, lalu tandai mana yang bukan teknologi.',
    'Jelaskan perbedaan perangkat lunak sistem dan perangkat lunak aplikasi, beri dua contoh untuk masing-masing.',
    'Gambarkan sebuah sistem informasi perpustakaan dalam bentuk input, proses, output, umpan balik, dan kendali.',
    'Berikan satu contoh nyata kegagalan sistem informasi yang penyebabnya bukan teknologi, lalu jelaskan komponen mana yang bermasalah.',
    'Rancang tiga aturan prosedur untuk sistem pencatatan nilai mahasiswa, dan jelaskan masalah apa yang dicegah oleh masing-masing aturan itu.'
  ]
});

TOPICS.push({
  id: 'pti-jenis-si',
  judul: 'Jenis-jenis Sistem Informasi',
  kategori: 'pti',
  tag: ['SIM', 'SPK', 'SIG', 'TPS', 'tingkat manajemen'],
  ringkas: 'Sistem yang berbeda untuk tingkat pengambil keputusan yang berbeda.',

  fungsi: `**Mengenali jenis sistem informasi supaya tidak salah merancang untuk tingkat yang salah.**

Terpakai di:

- **Menentukan lingkup proyek** — sistem kasir dan dasbor direktur adalah dua hal berbeda
- **Memilih apa yang ditampilkan** — rincian untuk operasional, ringkasan untuk pimpinan
- **Sistem Informasi semester 5** — dibahas jauh lebih dalam di sana
- **Menjawab pertanyaan dosen penguji** tentang posisi sistemmu

Yang paling berguna: **jangan menampilkan data serinci mungkin kepada pimpinan**. Itu terasa seperti memberi lebih, padahal ia menghambat keputusan.`,

  praktik: {
    tujuan: `Kamu bisa menempatkan sebuah sistem pada tingkat manajemen yang tepat, dan menyesuaikan tampilannya.`,
    alat: [
      'Kertas',
      'Satu ide sistem yang ingin kamu buat'
    ],
    langkah: [
      { judul: 'Tentukan siapa penggunanya',
        isi: `Tulis dengan jelas: **siapa yang akan membuka layar ini setiap hari?**

Kasir, kepala bagian, atau pimpinan. Jawabannya menentukan segalanya setelah ini.` },
      { judul: 'Tentukan keputusan apa yang dibantu',
        isi: `Tulis satu kalimat: *"sistem ini membantu [siapa] memutuskan [apa]"*.

Kalau kamu tidak bisa menuliskannya, sistemmu belum punya tujuan yang jelas.` },
      { judul: 'Pilih tingkat keringkasannya',
        isi: `- **Operasional** → per transaksi, tepat sampai satuan terkecil
- **Taktis** → ringkasan per bagian atau per minggu
- **Strategis** → satu kalimat plus arah tren

Sesuaikan tampilanmu dengan tingkat itu.` },
      { judul: 'Sajikan data yang sama dalam tiga versi',
        isi: `Ambil satu data penjualan, lalu buat tiga tampilan: rincian transaksi, ringkasan per wilayah, dan satu kalimat kesimpulan.

Melihat ketiganya berdampingan membuat perbedaan tingkatnya jelas.` },
      { judul: 'Periksa sumber datanya',
        isi: `Sistem operasional hampir seluruhnya memakai data internal.

Sistem strategis butuh data **luar** juga: harga pesaing, tren pasar, peraturan baru.

Kalau sistem strategis-mu hanya memakai data internal, ia sebenarnya belum strategis.` },
      { judul: 'Pastikan pondasinya ada',
        isi: `Semua sistem tingkat atas memakan data dari sistem transaksi.

Kalau pencatatan transaksinya belum rapi, dasbor secantik apa pun akan menampilkan angka yang salah.

Bangun yang bawah dulu.` }
    ],
    cek: [
      'Kamu bisa menulis satu kalimat siapa memutuskan apa dengan sistemmu',
      'Ketiga versi tampilanmu berasal dari data yang sama',
      'Sistem tingkat atasmu memakai data yang dikumpulkan sistem transaksi'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dibedakan begitu',

  konsep: `
Tidak semua orang di sebuah organisasi butuh informasi yang sama. Kasir butuh tahu harga barang **sekarang**; direktur butuh tahu tren penjualan **tiga tahun terakhir**. Karena itu sistem informasi dibedakan menurut **siapa yang dilayani** dan **keputusan apa yang dibantu**.

**Jenis yang paling sering disebut**

- **TPS** (*Transaction Processing System*) — mencatat transaksi harian: penjualan, absensi, peminjaman. Volumenya besar, isinya rinci, dan sifatnya berulang. Inilah **sumber data** bagi semua sistem di atasnya.
- **SIM** (*Sistem Informasi Manajemen*) — mengumpulkan, memproses, dan menyajikan informasi untuk mendukung manajemen dalam mengambil keputusan. Biasanya berupa laporan berkala yang **meringkas** data dari TPS. Contohnya sistem informasi akuntansi yang membantu manajer mengelola keuangan.
- **SPK** (*Sistem Pendukung Keputusan*, *Decision Support System*) — dirancang untuk membantu keputusan yang **kompleks dan tidak rutin**. Memakai data dan **model analisis** untuk memberi rekomendasi. Contohnya perangkat lunak analisis data.
- **SIG** (*Sistem Informasi Geografis*) — mengolah dan menganalisis data yang berhubungan dengan **lokasi geografis**. Dipakai untuk perencanaan kota, pemetaan, dan analisis lingkungan.

**Beda SIM dan SPK — ini yang paling sering ditanyakan**

Keduanya sama-sama untuk manajer, tetapi menjawab jenis pertanyaan yang berbeda:

- **SIM** menjawab *"apa yang terjadi?"* — pertanyaan **terstruktur**, jawabannya berupa laporan yang bentuknya sudah tetap. *"Berapa penjualan bulan lalu per cabang?"*
- **SPK** menjawab *"apa yang sebaiknya dilakukan?"* atau *"bagaimana kalau...?"* — pertanyaan **semi-terstruktur** yang jawabannya butuh model dan pertimbangan. *"Kalau harga dinaikkan 10 persen, kira-kira penjualan turun berapa?"*

Cara mengingatnya: **SIM melaporkan masa lalu, SPK membantu memilih masa depan.**

**Tingkat manajemen yang dilayani**

Susunan ini menjelaskan kenapa jenisnya berbeda-beda:

- **Manajemen operasional** — keputusan harian dan rutin, dilayani **TPS**
- **Manajemen menengah** — keputusan taktis, dilayani **SIM**
- **Manajemen puncak** — keputusan strategis jangka panjang, dilayani **SPK** dan **EIS**

Makin ke atas, informasinya makin **ringkas**, makin **jarang** dibutuhkan, tetapi makin besar akibat keputusannya. Direktur tidak butuh melihat setiap struk belanja; ia butuh satu angka yang mewakili jutaan struk itu.

Ada juga **EIS** (*Executive Information System*) untuk pucuk pimpinan, yang menyajikan ringkasan sangat padat, dan **ERP** (*Enterprise Resource Planning*) yang menyatukan banyak fungsi organisasi dalam satu sistem terpadu.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Data yang SAMA, disajikan berbeda menurut siapa yang bertanya\n\ntransaksi = [\n    ("2024-09-01", "Purwokerto", 150000),\n    ("2024-09-01", "Solo",       200000),\n    ("2024-09-02", "Purwokerto", 175000),\n]\n\n# TPS  -> rinci, per transaksi, untuk petugas\n# SIM  -> ringkas, per cabang, untuk manajer\n# SPK  -> model "bagaimana kalau", untuk direktur',
      penjelasan: `
Perhatikan bahwa **datanya sama persis** — yang berbeda hanya **seberapa jauh ia diringkas** dan **pertanyaan apa yang dijawabnya**.

**TPS** menampilkan tiap baris apa adanya. Untuk kasir yang perlu memeriksa satu transaksi tertentu, inilah yang berguna. Bagi direktur, tiga juta baris seperti ini tidak berarti apa-apa.

**SIM** meringkasnya menjadi total per cabang. Sekarang manajer bisa melihat cabang mana yang unggul. Bentuk laporannya **sudah tetap** — tiap bulan sama, tinggal angkanya yang berganti. Itulah ciri pertanyaan **terstruktur**: kamu sudah tahu bentuk jawabannya sebelum bertanya.

**SPK** melangkah lebih jauh dengan menambahkan **model**. Ia tidak sekadar melaporkan yang sudah terjadi, tetapi memperkirakan yang **belum** terjadi: *"kalau harga naik 10 persen, penjualan kira-kira turun berapa?"*

Di sinilah letak perbedaan yang menentukan. SIM bekerja dengan **fakta**; SPK bekerja dengan **asumsi dan model**. Karena itu keluaran SPK selalu berupa **perkiraan**, bukan kepastian — dan mutunya sepenuhnya bergantung pada mutu modelnya.

Ini juga menjelaskan kenapa SPK jauh lebih sulit dibuat. Membuat laporan penjualan per cabang cuma soal menjumlahkan. Membuat model yang bisa memperkirakan akibat kenaikan harga butuh data historis, pemahaman perilaku pelanggan, dan pengujian berulang — dan tetap saja bisa meleset.

Kamu akan bertemu jenis-jenis sistem ini lagi di semester 5, di mata kuliah **Sistem Informasi**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Data yang sama, tiga tingkat penyajian
# ============================================

transaksi = [
    ("2024-09-01", "Purwokerto", "beras",  150000),
    ("2024-09-01", "Solo",       "gula",   200000),
    ("2024-09-02", "Purwokerto", "minyak", 175000),
    ("2024-09-02", "Solo",       "beras",  120000),
    ("2024-09-03", "Purwokerto", "gula",   225000),
    ("2024-09-03", "Semarang",   "beras",  300000),
]

# ---------- TPS: rinci, untuk petugas operasional ----------
print("=== TPS: catatan transaksi harian ===")
for tanggal, cabang, barang, nilai in transaksi:
    print("  " + tanggal + "  " + cabang.ljust(12) +
          barang.ljust(8) + format(nilai, ",").rjust(10))

# ---------- SIM: ringkasan, untuk manajer menengah ----------
print("")
print("=== SIM: laporan penjualan per cabang ===")
per_cabang = {}
for _, cabang, _, nilai in transaksi:
    per_cabang[cabang] = per_cabang.get(cabang, 0) + nilai

total = sum(per_cabang.values())
for cabang, nilai in sorted(per_cabang.items(),
                            key=lambda x: -x[1]):
    persen = nilai / total * 100
    print("  " + cabang.ljust(12) + format(nilai, ",").rjust(10) +
          format(persen, "8.1f") + "%")
print("  " + "TOTAL".ljust(12) + format(total, ",").rjust(10))

# ---------- SPK: model "bagaimana kalau", untuk manajemen puncak ----------
print("")
print("=== SPK: simulasi kenaikan harga ===")
print("  asumsi model: tiap kenaikan 1% menurunkan volume 1.5%")
print("")
print("  kenaikan   volume   pendapatan   selisih")

ELASTISITAS = 1.5        # asumsi model, BUKAN fakta

hasil = []
for kenaikan in [0, 5, 10, 15, 20]:
    faktor_harga = 1 + kenaikan / 100
    faktor_volume = 1 - (kenaikan * ELASTISITAS) / 100
    if faktor_volume < 0:
        faktor_volume = 0
    proyeksi = total * faktor_harga * faktor_volume
    selisih = proyeksi - total
    tanda = "+" if selisih >= 0 else ""
    hasil.append((kenaikan, proyeksi))
    print("  " + (str(kenaikan) + "%").rjust(6) +
          format(faktor_volume * 100, "9.0f") + "%" +
          format(proyeksi, "13,.0f") +
          "   " + tanda + format(selisih, ",.0f"))

# Kesimpulan DIHITUNG, bukan ditulis tangan -- kalau asumsinya
# diubah, kesimpulannya ikut berubah dengan sendirinya.
terbaik = max(hasil, key=lambda x: x[1])
print("")
print("  -> pilihan terbaik menurut model: naik " + str(terbaik[0]) + "%")
if ELASTISITAS > 1:
    print("     elastisitas " + str(ELASTISITAS) + " > 1 -> volume turun")
    print("     lebih cepat daripada harga naik, jadi menaikkan")
    print("     harga SELALU merugi.")
else:
    print("     elastisitas " + str(ELASTISITAS) + " < 1 -> volume turun")
    print("     lebih lambat daripada harga naik, jadi menaikkan")
    print("     harga menambah pendapatan.")
print("")
print("  -> ingat: ini PERKIRAAN dari asumsi, bukan kepastian.")
print("     Satu angka ELASTISITAS menentukan seluruh kesimpulan.")
print("     Ganti 1.5 jadi 0.5, dan jawabannya berbalik total.")`
  },

  output: `=== TPS: catatan transaksi harian ===
  2024-09-01  Purwokerto  beras      150,000
  2024-09-01  Solo        gula       200,000
  2024-09-02  Purwokerto  minyak     175,000
  2024-09-02  Solo        beras      120,000
  2024-09-03  Purwokerto  gula       225,000
  2024-09-03  Semarang    beras      300,000

=== SIM: laporan penjualan per cabang ===
  Purwokerto     550,000    47.0%
  Solo           320,000    27.4%
  Semarang       300,000    25.6%
  TOTAL        1,170,000

=== SPK: simulasi kenaikan harga ===
  asumsi model: tiap kenaikan 1% menurunkan volume 1.5%

  kenaikan   volume   pendapatan   selisih
      0%      100%    1,170,000   +0
      5%       92%    1,136,362   -33,638
     10%       85%    1,093,950   -76,050
     15%       78%    1,042,762   -127,238
     20%       70%      982,800   -187,200

  -> pilihan terbaik menurut model: naik 0%
     elastisitas 1.5 > 1 -> volume turun
     lebih cepat daripada harga naik, jadi menaikkan
     harga SELALU merugi.

  -> ingat: ini PERKIRAAN dari asumsi, bukan kepastian.
     Satu angka ELASTISITAS menentukan seluruh kesimpulan.
     Ganti 1.5 jadi 0.5, dan jawabannya berbalik total.`,

  kesalahanUmum: [
    {
      salah: 'Menukar SIM dengan SPK karena keduanya sama-sama untuk manajer.',
      kenapa: 'SIM menjawab pertanyaan terstruktur tentang apa yang sudah terjadi, dengan bentuk laporan yang tetap. SPK menjawab pertanyaan semi-terstruktur tentang apa yang sebaiknya dilakukan, memakai model analisis. Menukarnya membuat soal perbandingan dijawab terbalik, dan yang lebih penting, membuat orang mengira laporan biasa sudah cukup untuk keputusan strategis.',
      benar: 'Ingat bahwa SIM melaporkan masa lalu, SPK membantu memilih masa depan. Kalau keluarannya berupa perkiraan dari sebuah model, itu SPK.'
    },
    {
      salah: 'Menganggap keluaran SPK sebagai kepastian, bukan perkiraan.',
      kenapa: 'SPK bekerja dengan asumsi dan model, sehingga mutunya sepenuhnya bergantung pada mutu model itu. Angka yang tampil rapi dengan banyak digit memberi kesan pasti, padahal seluruhnya bergantung pada satu asumsi yang bisa saja keliru. Keputusan besar yang diambil dari model yang salah bisa sangat merugikan.',
      benar: 'Selalu sebutkan asumsi modelnya bersama hasilnya. Perlakukan keluaran SPK sebagai bahan pertimbangan, bukan jawaban.'
    },
    {
      salah: 'Menyajikan data serinci TPS kepada manajemen puncak.',
      kenapa: 'Makin tinggi tingkat manajemen, makin ringkas informasi yang dibutuhkan. Direktur yang disodori tiga juta baris transaksi tidak akan menemukan apa pun di dalamnya, dan laporan itu akan diabaikan. Kegagalan ini sering terjadi karena pembuat sistem menganggap makin lengkap makin baik.',
      benar: 'Sesuaikan tingkat peringkasan dengan penerimanya. Manajemen operasional butuh rincian, manajemen puncak butuh satu angka yang mewakili jutaan rincian itu.'
    }
  ],

  analogi: `Bayangkan sebuah sekolah.

**TPS** adalah **buku absen harian**. Tiap hari, tiap kelas, tiap murid dicentang. Rinci sekali, dan wali kelas memang butuh yang serinci ini untuk tahu siapa bolos kemarin.

**SIM** adalah **rekap kehadiran per kelas per bulan** yang diberikan ke wakil kepala sekolah. Bentuknya sama tiap bulan — tinggal angkanya berganti. Ia menjawab *"kelas mana yang kehadirannya paling rendah?"*, pertanyaan yang bentuk jawabannya sudah diketahui sebelum ditanyakan.

**SPK** adalah **alat untuk menjawab "bagaimana kalau"**. Misalnya: *"kalau jam masuk digeser dari 07.00 ke 07.30, kira-kira keterlambatan turun berapa?"* Tidak ada di buku absen mana pun jawabannya — harus dimodelkan dari pola yang ada, dan hasilnya tetap **perkiraan**.

**SIG** adalah **peta yang menunjukkan sebaran alamat rumah murid**, untuk memutuskan di mana sebaiknya membuka jalur bus sekolah.

Perhatikan pola peringkasannya. Kepala sekolah tidak pernah membuka buku absen harian — bukan karena tidak peduli, melainkan karena **tiga puluh ribu centang tidak memberi tahu apa pun**. Yang ia butuhkan satu kalimat: *"kehadiran turun 4 persen sejak jam masuk dimajukan."*

Dan soal SPK: kalau modelnya mengatakan menggeser jam masuk akan menurunkan keterlambatan 30 persen, itu **bukan janji**. Itu perkiraan dari asumsi. Kalau ternyata penyebab keterlambatan sebenarnya adalah macet di satu perempatan, menggeser jam tidak akan mengubah apa pun.`,

  latihan: [
    'Jelaskan perbedaan SIM dan SPK, lalu golongkan tiap pertanyaan berikut: (a) berapa total penjualan bulan lalu, (b) sebaiknya cabang mana yang ditutup, (c) berapa stok gudang hari ini.',
    'Sebutkan empat jenis sistem informasi beserta tingkat manajemen yang dilayaninya.',
    'Jelaskan kenapa informasi makin ringkas seiring naiknya tingkat manajemen, dan apa akibatnya kalau aturan ini dilanggar.',
    'Berikan satu contoh penggunaan SIG selain yang disebut di materi, dan jelaskan data lokasi apa yang diperlukannya.',
    'Sebuah SPK memperkirakan bahwa menaikkan harga 5 persen akan memberi pendapatan tertinggi. Sebutkan tiga hal yang harus kamu tanyakan sebelum memakai rekomendasi itu untuk mengambil keputusan.'
  ]
});

TOPICS.push({
  id: 'pti-jaringan',
  judul: 'Jaringan Komputer & Protokol',
  kategori: 'pti',
  tag: ['jaringan', 'protokol', 'TCP/IP', 'topologi', 'LAN', 'WAN'],
  ringkas: 'Bagaimana komputer yang terpisah bisa sepakat berbicara — dan bentuk-bentuk sambungannya.',

  fungsi: `**Memahami bagaimana data berpindah antar komputer — cukup untuk menelusuri masalah sendiri.**

Terpakai di:

- **Memperbaiki koneksi** — tahu harus memeriksa apa lebih dulu
- **Menjalankan aplikasi web** — memahami localhost, port, dan kenapa temanmu tidak bisa mengaksesnya
- **Jaringan Komputer semester 3** — ini pengantarnya
- **Menyiapkan peladen** untuk tugas akhir

Yang paling sering terpakai sehari-hari: **menelusuri masalah secara berlapis**. Periksa dari bawah ke atas — kabel, alamat IP, DNS, lalu aplikasinya — bukan menebak acak.`,

  praktik: {
    tujuan: `Kamu bisa menelusuri masalah jaringan secara berurutan dengan perintah baku, dan menjalankan aplikasimu agar bisa diakses perangkat lain.`,
    alat: [
      'Terminal',
      'Perintah ping, ipconfig atau ifconfig, nslookup, tracert atau traceroute'
    ],
    langkah: [
      { judul: 'Periksa alamatmu sendiri',
        isi: `- Windows: \`ipconfig /all\`
- Linux atau macOS: \`ip addr\` atau \`ifconfig\`

Catat alamat IP, subnet mask, gateway, dan DNS. Empat angka ini menjelaskan sebagian besar masalah jaringan.` },
      { judul: 'Uji berlapis dari dalam ke luar',
        isi: `Jalankan berurutan, dan berhenti di yang pertama gagal:

- \`ping 127.0.0.1\` — tumpukan jaringan komputermu sendiri
- \`ping [gateway]\` — sampai ke router
- \`ping 8.8.8.8\` — sampai ke internet
- \`ping google.com\` — DNS bekerja

Kalau nomor tiga berhasil tetapi nomor empat gagal, masalahnya **DNS**, bukan koneksi.` },
      { judul: 'Telusuri jalurnya',
        isi: `- Windows: \`tracert google.com\`
- Linux atau macOS: \`traceroute google.com\`

Kamu akan melihat setiap perangkat yang dilewati. Kalau berhenti di suatu titik, di situlah masalahnya — dan sering kali itu di luar kendalimu.` },
      { judul: 'Periksa port yang terbuka',
        isi: `- \`netstat -an\` menampilkan sambungan dan port yang mendengarkan
- \`netstat -ano | findstr :8080\` di Windows untuk mencari port tertentu

Ini yang kamu pakai saat aplikasimu bilang "port sudah dipakai".` },
      { judul: 'Buat aplikasimu bisa diakses perangkat lain',
        isi: `Aplikasi yang mendengarkan di \`127.0.0.1\` **hanya** bisa diakses dari komputer itu sendiri.

Ubah menjadi \`0.0.0.0\` agar mendengarkan semua antarmuka, lalu akses dari ponsel di jaringan yang sama memakai alamat IP komputermu.

Kalau masih gagal, periksa **firewall**.` },
      { judul: 'Kenali port yang sering dipakai',
        isi: `- 80 HTTP, 443 HTTPS
- 22 SSH, 21 FTP
- 3306 MySQL, 5432 PostgreSQL
- 8080 dan 3000 sering dipakai pengembangan

Hafal beberapa yang sering kamu pakai; ia menghemat banyak waktu saat menelusuri masalah.` }
    ],
    cek: [
      'Kamu bisa menyebutkan alamat IP, gateway, dan DNS komputermu',
      'Kamu bisa membedakan masalah DNS dari masalah koneksi lewat urutan ping',
      'Aplikasimu bisa dibuka dari ponsel di jaringan yang sama'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Jaringan komputer** adalah kumpulan komputer dan perangkat lain yang terhubung untuk **berbagi sumber daya**: data, berkas, dan perangkat keras. Jaringan memungkinkan komunikasi antara pengguna dan perangkat.

**Protokol — aturan yang disepakati**

**Protokol** adalah aturan yang mengatur komunikasi antar perangkat. Tanpa protokol, dua komputer yang tersambung kabel tetap tidak bisa berbicara — sama seperti dua orang yang bertatap muka tetapi tidak punya bahasa yang sama.

Yang perlu dikenali:

- **TCP/IP** — protokol utama yang dipakai mentransfer data di internet. Sebenarnya dua hal: **IP** mengurus **alamat dan rute**, **TCP** mengurus **keandalan** (memastikan semua potongan sampai dan urutannya benar).
- **HTTP/HTTPS** — protokol transfer data web. **HTTPS** adalah HTTP yang isinya dienkripsi.
- **FTP** — protokol untuk mentransfer berkas.
- **SMTP, POP3, IMAP** — protokol surat elektronik.
- **DNS** — menerjemahkan nama seperti \`unsoed.ac.id\` menjadi alamat IP berupa angka.

**Kenapa protokol berlapis?**

Ini gagasan penting yang akan kamu temui lagi di Jaringan Komputer semester 3. Alih-alih satu protokol raksasa yang mengurus segalanya, tugasnya **dibagi berlapis**, dan tiap lapis hanya berurusan dengan lapis di atas dan di bawahnya.

Akibatnya: kamu bisa mengganti kabel dengan WiFi **tanpa mengubah apa pun** di aplikasi, karena aplikasi tidak pernah tahu-menahu soal kabel. Ini persis gagasan **abstraksi bertingkat** yang kamu temui di struktur komputer.

**Topologi — bentuk sambungannya**

- **Bintang (Star)** — semua perangkat terhubung ke satu perangkat pusat, hub atau switch. Paling banyak dipakai sekarang. Kalau satu kabel putus, hanya satu perangkat terganggu — tetapi kalau **pusatnya** mati, seluruh jaringan mati.
- **Cincin (Ring)** — tiap perangkat terhubung ke dua perangkat lain membentuk cincin. Satu putus bisa memutus seluruh jalur, kecuali dibuat cincin ganda.
- **Mesh** — tiap perangkat terhubung ke beberapa perangkat lain untuk meningkatkan **redundansi**. Paling tahan gangguan, tetapi paling mahal karena jumlah kabelnya membengkak.
- **Bus** — semua perangkat berbagi satu jalur tunggal. Hemat kabel, tetapi satu jalur putus melumpuhkan semuanya, dan lalu lintasnya mudah bertabrakan.

**Cakupan jaringan**

- **LAN** (*Local Area Network*) — satu gedung atau kampus
- **MAN** (*Metropolitan Area Network*) — satu kota
- **WAN** (*Wide Area Network*) — antarkota, antarnegara. Internet adalah WAN terbesar.

**Keamanan jaringan**

Langkah-langkah melindungi jaringan dan data dari ancaman: penggunaan **firewall**, **enkripsi data**, dan kebijakan keamanan yang ketat.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa protokol harus disepakati DUA pihak\n\n# Pengirim memakai aturan: [panjang][isi]\npesan = "Halo"\nkirim = str(len(pesan)) + ":" + pesan      # "4:Halo"\n\n# Penerima HARUS tahu aturan yang sama untuk membacanya\npanjang, isi = kirim.split(":", 1)\nprint(isi[:int(panjang)])                   # Halo\n\n# Kalau penerima mengira aturannya [isi][panjang],\n# ia akan membaca "4" sebagai isi pesan.\n# Kabelnya tersambung, tapi komunikasinya GAGAL.',
      penjelasan: `
Inilah inti pengertian protokol, dan contoh sesederhana ini sudah cukup menjelaskannya.

Perhatikan bahwa **tidak ada yang salah secara teknis** pada kedua pihak. Kabelnya tersambung, listriknya jalan, bit-nya sampai dengan sempurna. Yang gagal adalah **kesepakatan tentang arti bit itu**.

Protokol menetapkan hal-hal yang tidak bisa ditebak sendiri:

- **Bentuk pesannya** — mana bagian alamat, mana panjangnya, mana isinya
- **Urutan percakapan** — siapa bicara dulu, apa yang harus dijawab
- **Penanganan kesalahan** — apa yang dilakukan kalau ada potongan hilang

Sekarang lihat bagaimana **TCP** dan **IP** membagi tugas, karena keduanya sering dianggap satu hal:

- **IP** bertugas mengantar potongan data ke alamat tujuan. Ia **tidak menjamin** potongan itu sampai, tidak menjamin urutannya benar, dan tidak menjamin tidak ada yang terkirim dua kali. Tugasnya cuma mengantar sebaik yang ia bisa.
- **TCP** berjalan di atas IP dan menambahkan jaminan itu. Ia memberi nomor urut tiap potongan, meminta kiriman ulang yang hilang, dan menyusun kembali urutannya sebelum diserahkan ke aplikasi.

Pembagian ini sengaja. Ada aplikasi yang **tidak butuh** jaminan TCP dan lebih memilih cepat — panggilan video misalnya, di mana satu potongan gambar yang hilang lebih baik dilewatkan daripada ditunggu. Untuk itu ada **UDP**, yang memakai IP tanpa jaminan TCP.

Inilah keuntungan berlapis: kamu bisa memilih lapisan yang sesuai kebutuhan, tanpa harus menulis ulang semuanya dari nol.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Membandingkan ketahanan topologi jaringan
# ============================================

def bintang(n):
    """Semua ke satu pusat. Simpul 0 = hub."""
    return {i: {0} for i in range(1, n)} | {0: set(range(1, n))}

def cincin(n):
    """Tiap simpul ke dua tetangganya."""
    return {i: {(i - 1) % n, (i + 1) % n} for i in range(n)}

def mesh(n):
    """Tiap simpul ke semua simpul lain."""
    return {i: set(range(n)) - {i} for i in range(n)}


def masih_terhubung(graf, mati):
    """Telusuri dari simpul hidup pertama, cek apakah semua tercapai."""
    hidup = [s for s in graf if s not in mati]
    if not hidup:
        return True
    antre = [hidup[0]]
    dikunjungi = {hidup[0]}
    while antre:
        s = antre.pop()
        for tetangga in graf[s]:
            if tetangga not in mati and tetangga not in dikunjungi:
                dikunjungi.add(tetangga)
                antre.append(tetangga)
    return len(dikunjungi) == len(hidup)


N = 6
bentuk = [("Bintang", bintang(N)), ("Cincin", cincin(N)), ("Mesh", mesh(N))]

# ---------- Berapa banyak sambungan yang dibutuhkan? ----------
print("--- biaya: jumlah sambungan ---")
for nama, graf in bentuk:
    sambungan = sum(len(v) for v in graf.values()) // 2
    print("  " + nama.ljust(10) + str(sambungan) + " sambungan")

# ---------- Apa yang terjadi kalau satu simpul mati? ----------
print("")
print("--- ketahanan: satu simpul mati ---")
for nama, graf in bentuk:
    rusak = []
    for mati in range(N):
        if not masih_terhubung(graf, {mati}):
            rusak.append(mati)
    if rusak:
        print("  " + nama.ljust(10) + "TERBELAH kalau simpul " +
              str(rusak) + " mati")
    else:
        print("  " + nama.ljust(10) + "tetap utuh, simpul mana pun yang mati")

# ---------- Dua simpul mati sekaligus ----------
print("")
print("--- ketahanan: dua simpul mati ---")
for nama, graf in bentuk:
    gagal = 0
    total = 0
    for a in range(N):
        for b in range(a + 1, N):
            total = total + 1
            if not masih_terhubung(graf, {a, b}):
                gagal = gagal + 1
    print("  " + nama.ljust(10) + str(gagal) + " dari " + str(total) +
          " pasangan membuat jaringan terbelah")

print("")
print("Bintang: murah, tapi hub adalah titik gagal tunggal.")
print("Cincin : murah, tapi satu simpul mati memutus jalur.")
print("Mesh   : paling tahan, tapi sambungannya paling banyak.")`
  },

  output: `--- biaya: jumlah sambungan ---
  Bintang   5 sambungan
  Cincin    6 sambungan
  Mesh      15 sambungan

--- ketahanan: satu simpul mati ---
  Bintang   TERBELAH kalau simpul [0] mati
  Cincin    tetap utuh, simpul mana pun yang mati
  Mesh      tetap utuh, simpul mana pun yang mati

--- ketahanan: dua simpul mati ---
  Bintang   5 dari 15 pasangan membuat jaringan terbelah
  Cincin    9 dari 15 pasangan membuat jaringan terbelah
  Mesh      0 dari 15 pasangan membuat jaringan terbelah

Bintang: murah, tapi hub adalah titik gagal tunggal.
Cincin : murah, tapi satu simpul mati memutus jalur.
Mesh   : paling tahan, tapi sambungannya paling banyak.`,

  kesalahanUmum: [
    {
      salah: 'Menganggap TCP dan IP sebagai satu protokol tunggal yang tidak terpisah.',
      kenapa: 'Keduanya punya tugas berbeda: IP mengurus alamat dan rute tanpa menjamin apa pun, TCP menambahkan jaminan keandalan di atasnya. Menyatukannya membuat orang tidak paham kenapa UDP bisa ada, dan kenapa panggilan video justru memilih protokol tanpa jaminan.',
      benar: 'Pisahkan tugasnya: IP mengantar, TCP menjamin. UDP memakai IP tanpa jaminan TCP, dan itu pilihan yang disengaja untuk aplikasi yang mengutamakan kecepatan.'
    },
    {
      salah: 'Mengira topologi bintang paling tahan gangguan karena paling banyak dipakai.',
      kenapa: 'Bintang populer karena murah dan mudah dikelola, bukan karena tahan gangguan. Perangkat pusatnya adalah titik gagal tunggal: kalau hub mati, seluruh jaringan mati sekaligus. Percobaan pada contoh kode menunjukkan bintang terbelah hanya dengan matinya satu simpul, yaitu hub-nya.',
      benar: 'Bedakan alasan populer dan alasan tahan gangguan. Bintang menang di biaya dan kemudahan; mesh menang di ketahanan dengan biaya sambungan yang jauh lebih besar.'
    },
    {
      salah: 'Menyangka protokol hanya soal perangkat lunak, sehingga dua perangkat yang tersambung kabel pasti bisa berkomunikasi.',
      kenapa: 'Tersambung secara fisik tidak berarti saling memahami. Tanpa kesepakatan tentang bentuk pesan dan urutan percakapan, bit yang sampai dengan sempurna tetap tidak bermakna bagi penerimanya. Salah paham ini membuat orang mencari kerusakan di kabel padahal masalahnya di kesepakatan.',
      benar: 'Pahami protokol sebagai kesepakatan tentang arti dan urutan, bukan sekadar sambungan. Kabel mengantar bit, protokol memberi bit itu makna.'
    },
    {
      salah: 'Mengira menambah topologi mesh selalu pilihan terbaik karena paling tahan gangguan.',
      kenapa: 'Jumlah sambungan mesh tumbuh sangat cepat, yaitu n dikali n dikurang satu dibagi dua. Untuk 6 simpul sudah 15 sambungan, untuk 100 simpul menjadi 4.950. Biaya kabel, port, dan pemeliharaannya menjadi tidak masuk akal untuk jaringan biasa.',
      benar: 'Pakai mesh hanya di tempat yang ketahanannya kritis, misalnya tulang punggung jaringan. Untuk jaringan kantor biasa, bintang sudah memadai.'
    }
  ],

  analogi: `Bayangkan sekelompok orang yang ingin saling berkirim surat.

**Jaringan** adalah jalan dan kantor posnya. **Protokol** adalah **kesepakatan cara menulis surat**: alamat di pojok kanan atas, nama pengirim di belakang, isi di dalam amplop.

Kalau kamu menulis alamat di tempat yang salah, suratnya tetap sampai ke kantor pos — kertasnya utuh, tintanya jelas — tetapi **tidak ada yang tahu harus mengantarnya ke mana**. Kabelnya tersambung, komunikasinya gagal.

Sekarang pembagian **IP dan TCP**, dengan gambaran yang sama:

- **IP** adalah **tukang pos**. Ia mengantar amplop ke alamat tertulis, sebaik yang ia bisa. Ia tidak berjanji suratmu sampai, tidak berjanji sepuluh suratmu tiba berurutan, dan kalau ada yang hilang di jalan ia tidak akan memberitahumu.
- **TCP** adalah **kebiasaanmu menomori surat dan meminta balasan**. Kamu tulis "surat 1 dari 10" di tiap amplop, dan minta temanmu mengabari kalau ada nomor yang tidak sampai supaya bisa dikirim ulang. Tukang posnya tidak berubah — kamu yang menambahkan jaminan di atas layanannya.

Dan **UDP** adalah kalau kamu **tidak repot menomori sama sekali**, karena yang kamu kirim adalah siaran langsung. Surat yang telat tidak ada gunanya lagi; lebih baik hilang daripada mengacaukan urutan.

Untuk **topologi**, bayangkan denah jalan sebuah kompleks:

- **Bintang** — semua rumah menghadap satu bundaran di tengah. Ringkas dan murah. Tetapi kalau bundarannya ditutup, **tidak ada rumah yang bisa saling mencapai**.
- **Cincin** — jalan melingkar. Kalau satu titik longsor, jalur memutar masih ada; kalau dua titik longsor, kompleks terbelah dua.
- **Mesh** — setiap rumah punya jalan langsung ke setiap rumah lain. Longsor di mana pun tidak masalah. Tetapi untuk seratus rumah, kamu butuh hampir lima ribu jalan.`,

  latihan: [
    'Jelaskan apa itu protokol, dan kenapa dua komputer yang tersambung kabel tetap tidak bisa berkomunikasi tanpanya.',
    'Jelaskan pembagian tugas antara IP dan TCP, lalu jelaskan kenapa panggilan video sering memilih UDP alih-alih TCP.',
    'Sebutkan empat topologi jaringan beserta kelebihan dan kekurangan masing-masing.',
    'Hitung berapa sambungan yang dibutuhkan topologi mesh untuk 10 dan 50 perangkat. Jelaskan kenapa mesh jarang dipakai untuk jaringan kantor biasa.',
    'Jelaskan perbedaan LAN, MAN, dan WAN beserta satu contoh masing-masing.',
    'Jelaskan kenapa protokol dirancang berlapis, dan sebutkan satu keuntungan nyata dari pembagian itu.'
  ]
});

TOPICS.push({
  id: 'pti-internet-web',
  judul: 'Internet & Teknologi Web',
  kategori: 'pti',
  tag: ['internet', 'web', 'HTML', 'CSS', 'JavaScript', 'client-server', 'URL'],
  ringkas: 'Apa yang sebenarnya terjadi antara kamu menekan Enter dan halaman muncul.',

  fungsi: `**Memahami apa yang terjadi antara menekan Enter dan halaman muncul.**

Terpakai di:

- **Menelusuri masalah web** — memisahkan masalah jaringan, peladen, dan peramban
- **Pemrograman Web** — memahami permintaan dan tanggapan sebelum menulis kode
- **Menerbitkan proyekmu** — nama domain, hosting, dan sertifikat
- **Keamanan** — memahami kenapa HTTPS penting dan apa yang dilindunginya

Satu keterampilan yang paling terpakai: **membaca tab Network di peramban**. Hampir semua masalah aplikasi web bisa dipersempit di situ dalam hitungan detik.`,

  praktik: {
    tujuan: `Kamu bisa membaca permintaan dan tanggapan HTTP di peramban, memahami kode statusnya, dan menerbitkan satu halaman ke internet.`,
    alat: [
      'Peramban dengan Developer Tools',
      'Akun GitHub untuk GitHub Pages'
    ],
    langkah: [
      { judul: 'Buka tab Network dan muat ulang',
        isi: `Tekan F12, pilih tab **Network**, lalu muat ulang halaman apa pun.

Kamu akan melihat setiap berkas yang diminta: HTML, CSS, gambar, dan panggilan API.

Perhatikan kolom **Status**, **Type**, **Size**, dan **Time**.` },
      { judul: 'Kenali kode status dari kelompoknya',
        isi: `- **2xx** berhasil — 200 OK, 201 Created
- **3xx** dialihkan — 301 permanen, 302 sementara
- **4xx** salah **kliennya** — 404 tidak ada, 401 belum masuk, 403 dilarang
- **5xx** salah **peladennya** — 500 galat internal

Angka pertamanya sudah memberi tahu **siapa** yang salah, dan itu menghemat banyak waktu.` },
      { judul: 'Periksa satu permintaan secara rinci',
        isi: `Klik salah satu baris, lalu lihat **Headers**.

Perhatikan **Request Method** (GET atau POST), **Request Headers**, dan **Response Headers**.

Cari \`Content-Type\` dan \`Cache-Control\` — keduanya menjelaskan banyak perilaku yang tampak aneh.` },
      { judul: 'Lihat urutan waktunya',
        isi: `Tab **Waterfall** menunjukkan berkas mana yang menghambat yang lain.

Berkas yang mulai terlambat karena menunggu berkas lain adalah calon utama untuk dioptimalkan.` },
      { judul: 'Terbitkan satu halaman sungguhan',
        isi: `Buat repositori GitHub berisi satu berkas \`index.html\`, lalu nyalakan **GitHub Pages** di pengaturannya.

Dalam beberapa menit halamanmu bisa diakses siapa pun lewat alamat \`username.github.io/nama-repo\`.

Ini gratis, dan cukup untuk memuat catatan kuliah, portofolio, atau demo tugas.` },
      { judul: 'Periksa sertifikat HTTPS-nya',
        isi: `Klik ikon gembok di bilah alamat, lalu lihat sertifikatnya: siapa penerbitnya dan kapan kedaluwarsa.

HTTPS melindungi **isi** dan **keaslian** — tetapi tidak menjamin situsnya jujur. Situs penipuan pun bisa punya gembok.` }
    ],
    cek: [
      'Kamu bisa menyebutkan arti kode 200, 301, 404, dan 500 tanpa mencari',
      'Kamu bisa menunjukkan Content-Type sebuah tanggapan di tab Network',
      'Halamanmu bisa diakses dari internet lewat GitHub Pages'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Internet** adalah jaringan global yang menghubungkan jutaan komputer di seluruh dunia, memungkinkan akses ke informasi, komunikasi, dan layanan.

**Internet bukan web.** Ini pembedaan pertama yang harus jelas:

- **Internet** adalah **infrastrukturnya** — jaringan fisik dan protokol yang menyambungkan komputer.
- **Web** (*World Wide Web*) adalah **salah satu layanan** yang berjalan di atas internet.

Layanan lain yang juga berjalan di atas internet tetapi bukan web: surat elektronik, FTP, dan pesan instan. Jadi web adalah bagian dari internet, bukan sebaliknya.

**Model client-server**

Hampir semua layanan internet memakai model ini:

- **Client** — yang meminta. Peramban di komputermu.
- **Server** — yang melayani. Komputer yang menyimpan halamannya.

**Apa yang terjadi saat kamu membuka sebuah alamat**

Urutan ini layak dipahami karena menyatukan hampir semua istilah di topik ini:

- Kamu mengetik \`unsoed.ac.id\` lalu menekan Enter.
- Peramban bertanya ke **DNS**: *"berapa alamat IP dari nama ini?"* DNS menjawab dengan angka.
- Peramban membuka sambungan **TCP** ke alamat itu.
- Peramban mengirim permintaan **HTTP**: *"tolong kirim halaman /"*.
- Server menjawab dengan **HTML**.
- Peramban membaca HTML itu, menemukan rujukan ke berkas **CSS**, **JavaScript**, dan gambar, lalu meminta masing-masing dengan permintaan terpisah.
- Peramban menyusun semuanya menjadi halaman yang kamu lihat.

**Tiga teknologi web dasar**

Ketiganya punya pembagian tugas yang tegas:

- **HTML** (*HyperText Markup Language*) — **struktur dan isi**. Ini judul, ini paragraf, ini tabel.
- **CSS** (*Cascading Style Sheets*) — **tampilan**. Warnanya apa, ukurannya berapa, letaknya di mana.
- **JavaScript** — **perilaku**. Apa yang terjadi saat tombol diklik.

Cara mengingatnya: **HTML adalah kerangka, CSS adalah pakaian, JavaScript adalah gerakan.**

**Membaca sebuah URL**

Contoh: \`https://unsoed.ac.id/akademik?tahun=2024\`

- **\`https\`** — protokolnya, versi HTTP yang terenkripsi
- **\`unsoed.ac.id\`** — nama domain, diterjemahkan DNS jadi alamat IP
- **\`/akademik\`** — jalur sumber daya yang diminta
- **\`?tahun=2024\`** — parameter kueri

**HTTP vs HTTPS**

HTTPS mengenkripsi isi percakapan, sehingga pihak lain yang menyadap jaringan tidak bisa membacanya. Ini wajib untuk apa pun yang melibatkan kata sandi atau data pribadi. Perhatikan bahwa HTTPS **menjamin isi percakapan tidak terbaca pihak ketiga**, tetapi **tidak menjamin situsnya jujur** — situs penipuan pun bisa memakai HTTPS.

**Aplikasi web** adalah program yang berjalan di server dan diakses lewat peramban. Contohnya surel seperti Gmail, media sosial, dan alat kolaborasi seperti Google Drive.
`,

  logicSyntax: [
    {
      bahasa: 'html',
      kode: '<!-- HTML: STRUKTUR -- apa isinya -->\n<h1>Judul Halaman</h1>\n<p>Ini paragraf.</p>\n<button id="tombol">Klik saya</button>',
      penjelasan: `
HTML menjawab satu pertanyaan saja: **apa isi halaman ini?**

Perhatikan bahwa **tidak ada satu pun keterangan tampilan** di situ. Tidak ada warna, tidak ada ukuran, tidak ada posisi. Tag \`<h1>\` tidak berarti "besar dan tebal" — ia berarti **"ini judul tingkat satu"**. Kebetulan saja peramban menampilkan judul dengan huruf besar dan tebal secara bawaan.

Pembedaan ini penting dan sering disalahpahami. Memakai \`<h1>\` supaya tulisannya besar adalah pemakaian yang keliru; kalau yang kamu mau cuma besar, itu urusan CSS. \`<h1>\` dipakai karena teks itu memang **judul**.

Kenapa ini penting?

- **Pembaca layar** untuk tunanetra memakai struktur ini untuk menavigasi halaman. Pengguna bisa melompat antar-judul, dan itu hanya bekerja kalau judulnya ditandai sebagai judul.
- **Mesin pencari** memakainya untuk memahami isi halaman.
- **Perawatan** jadi jauh lebih mudah. Mengubah tampilan seluruh judul cukup dengan menyunting satu aturan CSS, bukan menyisir ratusan berkas HTML.

Inilah yang disebut **HTML semantik**: memilih tag berdasarkan **arti**, bukan berdasarkan tampilan bawaannya.

Perhatikan juga atribut \`id="tombol"\` pada tombol. Itu **titik sambung** bagi CSS dan JavaScript untuk menunjuk elemen ini secara khusus. Tanpa penanda semacam itu, dua lapis lainnya tidak punya cara mengacu ke elemen tertentu.
`
    },
    {
      bahasa: 'js',
      kode: '// CSS: TAMPILAN -- ditulis terpisah dari isinya\n// h1     { color: navy; font-size: 32px; }\n// button { background: teal; padding: 8px 16px; }\n\n// JavaScript: PERILAKU -- apa yang terjadi saat disentuh\ndocument.getElementById("tombol").addEventListener("click", function () {\n  document.querySelector("p").textContent = "Tombolnya sudah diklik.";\n});',
      penjelasan: `
Perhatikan bahwa ketiga lapis ini **saling menunjuk lewat penanda**, tetapi isinya terpisah sepenuhnya.

- CSS menunjuk elemen lewat nama tag, kelas, atau id
- JavaScript menunjuk lewat \`getElementById\` atau \`querySelector\`

Keuntungan pemisahan ini terasa saat halamannya membesar. Seorang perancang bisa mengubah seluruh tampilan situs dengan menyunting **satu berkas CSS**, tanpa menyentuh satu pun berkas HTML. Seorang pemrogram bisa menambah perilaku tanpa mengacaukan tata letak.

Sebaliknya, halaman yang mencampur ketiganya — warna ditulis langsung di dalam tag HTML, perilaku ditempel sebagai atribut \`onclick\` — akan cepat menjadi mimpi buruk. Mengubah warna tombol berarti mencari dan mengubahnya di lima puluh tempat, dan pasti ada yang terlewat.

Sekarang perhatikan satu hal yang penting untuk dipahami sejak awal: **JavaScript di halaman berjalan di komputer pengunjung, bukan di server.** Ia disebut kode **sisi klien**.

Akibatnya besar, terutama untuk keamanan: **apa pun yang kamu tulis di JavaScript bisa dibaca dan diubah oleh siapa saja** yang membuka halamanmu. Karena itu:

- Jangan pernah menaruh kata sandi atau kunci rahasia di JavaScript.
- Pemeriksaan yang kamu lakukan di JavaScript — misalnya memastikan umur di atas 17 — **wajib diperiksa ulang di server**, karena pengunjung bisa saja mematikan JavaScript atau mengubahnya.

Aturan yang layak dihafal: **pemeriksaan di sisi klien untuk kenyamanan, pemeriksaan di sisi server untuk keamanan.**
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menirukan perjalanan sebuah permintaan web
# ============================================

# ---------- Anggap ini tabel DNS ----------
dns = {
    "unsoed.ac.id": "103.23.20.10",
    "example.com":  "93.184.216.34",
}

# ---------- Anggap ini isi server ----------
server = {
    "103.23.20.10": {
        "/":          "<h1>Selamat datang</h1>",
        "/akademik":  "<h1>Akademik</h1><p>Kalender kuliah.</p>",
    }
}


def urai_url(url):
    """https://unsoed.ac.id/akademik?tahun=2024 -> bagian-bagiannya"""
    protokol, sisa = url.split("://", 1)

    if "?" in sisa:
        sisa, kueri = sisa.split("?", 1)
    else:
        kueri = ""

    if "/" in sisa:
        domain, jalur = sisa.split("/", 1)
        jalur = "/" + jalur
    else:
        domain, jalur = sisa, "/"

    return protokol, domain, jalur, kueri


def buka(url):
    protokol, domain, jalur, kueri = urai_url(url)

    print("URL      : " + url)
    print("  protokol : " + protokol +
          ("  (terenkripsi)" if protokol == "https" else "  (TERBUKA)"))
    print("  domain   : " + domain)
    print("  jalur    : " + jalur)
    print("  kueri    : " + (kueri if kueri else "(tidak ada)"))

    # Langkah 1: tanya DNS
    if domain not in dns:
        print("  -> DNS gagal: nama tidak ditemukan")
        return
    ip = dns[domain]
    print("  1. DNS   : " + domain + " -> " + ip)

    # Langkah 2: sambungan TCP
    print("  2. TCP   : buka sambungan ke " + ip + " port " +
          ("443" if protokol == "https" else "80"))

    # Langkah 3: permintaan HTTP
    print("  3. HTTP  : GET " + jalur)

    # Langkah 4: jawaban server
    isi = server.get(ip, {}).get(jalur)
    if isi is None:
        print("  4. Balas : 404 Not Found")
    else:
        print("  4. Balas : 200 OK")
        print("  5. HTML  : " + isi)
    print("")


buka("https://unsoed.ac.id/akademik?tahun=2024")
buka("http://unsoed.ac.id/")
buka("https://unsoed.ac.id/tidak-ada")
buka("https://situs-palsu.id/")

print("Catatan: HTTPS menjamin isi percakapan tidak terbaca")
print("pihak ketiga, TAPI tidak menjamin situsnya jujur.")
print("Situs penipuan pun bisa memakai HTTPS.")`
  },

  output: `URL      : https://unsoed.ac.id/akademik?tahun=2024
  protokol : https  (terenkripsi)
  domain   : unsoed.ac.id
  jalur    : /akademik
  kueri    : tahun=2024
  1. DNS   : unsoed.ac.id -> 103.23.20.10
  2. TCP   : buka sambungan ke 103.23.20.10 port 443
  3. HTTP  : GET /akademik
  4. Balas : 200 OK
  5. HTML  : <h1>Akademik</h1><p>Kalender kuliah.</p>

URL      : http://unsoed.ac.id/
  protokol : http  (TERBUKA)
  domain   : unsoed.ac.id
  jalur    : /
  kueri    : (tidak ada)
  1. DNS   : unsoed.ac.id -> 103.23.20.10
  2. TCP   : buka sambungan ke 103.23.20.10 port 80
  3. HTTP  : GET /
  4. Balas : 200 OK
  5. HTML  : <h1>Selamat datang</h1>

URL      : https://unsoed.ac.id/tidak-ada
  protokol : https  (terenkripsi)
  domain   : unsoed.ac.id
  jalur    : /tidak-ada
  kueri    : (tidak ada)
  1. DNS   : unsoed.ac.id -> 103.23.20.10
  2. TCP   : buka sambungan ke 103.23.20.10 port 443
  3. HTTP  : GET /tidak-ada
  4. Balas : 404 Not Found

URL      : https://situs-palsu.id/
  protokol : https  (terenkripsi)
  domain   : situs-palsu.id
  jalur    : /
  kueri    : (tidak ada)
  -> DNS gagal: nama tidak ditemukan

Catatan: HTTPS menjamin isi percakapan tidak terbaca
pihak ketiga, TAPI tidak menjamin situsnya jujur.
Situs penipuan pun bisa memakai HTTPS.`,

  kesalahanUmum: [
    {
      salah: 'Memakai kata internet dan web seolah artinya sama.',
      kenapa: 'Internet adalah infrastruktur jaringannya, sedangkan web adalah salah satu layanan yang berjalan di atasnya. Surel dan FTP juga berjalan di atas internet tetapi bukan web. Menyamakannya membuat soal ujian yang meminta membedakan keduanya jadi tidak terjawab.',
      benar: 'Internet adalah jalannya, web adalah salah satu kendaraan yang lewat di situ. Web bagian dari internet, bukan sebaliknya.'
    },
    {
      salah: 'Memakai tag HTML berdasarkan tampilan bawaannya, misalnya memakai h1 supaya tulisan jadi besar.',
      kenapa: 'Tag HTML menyatakan arti, bukan tampilan. Memakai h1 untuk teks yang bukan judul merusak navigasi pembaca layar bagi pengguna tunanetra, dan mengacaukan pemahaman mesin pencari. Kalau yang diinginkan cuma ukuran besar, itu urusan CSS.',
      benar: 'Pilih tag berdasarkan arti isinya, lalu atur tampilannya lewat CSS. Inilah yang disebut HTML semantik.'
    },
    {
      salah: 'Mengandalkan pemeriksaan JavaScript sebagai pengaman, misalnya memvalidasi umur atau kata sandi di sisi klien saja.',
      kenapa: 'JavaScript berjalan di komputer pengunjung, sehingga bisa dibaca, diubah, atau dimatikan sepenuhnya oleh siapa saja. Pemeriksaan yang hanya ada di sana bisa dilewati dengan mudah lewat alat pengembang peramban, dan data yang tidak sah tetap sampai ke server.',
      benar: 'Pemeriksaan di sisi klien untuk kenyamanan pengguna, pemeriksaan di sisi server untuk keamanan. Keduanya perlu, tetapi hanya yang di server yang bisa dipercaya.'
    },
    {
      salah: 'Mengira gembok HTTPS berarti situsnya aman dan terpercaya.',
      kenapa: 'HTTPS hanya menjamin isi percakapan tidak terbaca pihak ketiga di jaringan. Ia tidak memeriksa apakah pemilik situsnya jujur. Situs penipuan mudah mendapat sertifikat HTTPS, sehingga gembok itu justru sering dipakai meyakinkan korban.',
      benar: 'Baca gembok sebagai jaminan kerahasiaan jalur, bukan jaminan kejujuran pemilik situs. Periksa nama domainnya dengan teliti, karena di situlah penipuan biasanya bersembunyi.'
    }
  ],

  analogi: `Bayangkan kamu memesan makanan lewat telepon.

**Internet** adalah **jaringan telepon** — kabel, menara, dan sentralnya. **Web** adalah **salah satu hal yang bisa kamu lakukan** dengan telepon itu. Menelepon teman dan mengirim SMS juga lewat jaringan yang sama, tetapi bukan pesan makanan.

Sekarang urutan saat kamu membuka sebuah halaman:

- Kamu tahu **nama** restorannya, bukan nomornya. Kamu buka buku telepon — itulah **DNS**, yang menerjemahkan nama menjadi nomor.
- Kamu menekan nomornya dan menunggu diangkat — itulah **sambungan TCP**.
- Kamu bilang *"saya mau pesan nasi goreng"* — itulah **permintaan HTTP**.
- Mereka mengirim makanannya — itulah **jawaban** berisi HTML.
- Ternyata di dalam bungkusnya ada catatan *"sambalnya menyusul"*, jadi kamu menelepon lagi untuk sambal. Itulah peramban yang meminta CSS, gambar, dan JavaScript **dengan permintaan terpisah**.

Untuk **tiga teknologi web**, bayangkan seorang manusia:

- **HTML** adalah **kerangka tulangnya** — menentukan ini kepala, ini tangan.
- **CSS** adalah **pakaian dan potongan rambutnya** — menentukan penampilannya.
- **JavaScript** adalah **gerakannya** — apa yang terjadi kalau kamu menyapanya.

Dan soal **gembok HTTPS**: ia seperti **jaminan bahwa telepon kamu tidak disadap**. Berguna sekali. Tetapi ia sama sekali **tidak menjamin bahwa yang mengangkat di seberang bukan penipu**. Percakapan dengan penipu yang tidak disadap tetaplah percakapan dengan penipu.`,

  latihan: [
    'Jelaskan perbedaan internet dan web, lalu sebutkan dua layanan yang berjalan di atas internet tetapi bukan web.',
    'Uraikan URL https://unsoed.ac.id/akademik?tahun=2024 menjadi bagian-bagiannya dan jelaskan fungsi masing-masing.',
    'Urutkan langkah yang terjadi sejak kamu menekan Enter sampai halaman muncul, mulai dari DNS sampai peramban menyusun halamannya.',
    'Jelaskan pembagian tugas HTML, CSS, dan JavaScript. Untuk masing-masing, sebutkan satu hal yang akan rusak kalau tugasnya dikerjakan oleh lapis yang salah.',
    'Jelaskan kenapa validasi form yang hanya dilakukan di JavaScript tidak bisa dianggap sebagai pengaman.',
    'Sebuah situs memiliki gembok HTTPS tetapi alamatnya unsoed-ac-id.xyz. Jelaskan apa yang dijamin dan tidak dijamin oleh gembok itu.'
  ]
});

TOPICS.push({
  id: 'pti-keamanan',
  judul: 'Keamanan Informasi',
  kategori: 'pti',
  tag: ['keamanan', 'CIA triad', 'enkripsi', 'phishing', 'malware', 'DDoS'],
  ringkas: 'Tiga hal yang harus dijaga, dan kenapa manusia hampir selalu jadi celah terlemah.',

  fungsi: `**Melindungi data dan akun dengan langkah yang benar-benar berpengaruh.**

Terpakai di:

- **Melindungi akun sendiri** — akun kampus, GitHub, surel
- **Menyusun aplikasi** — hashing kata sandi, hak akses, validasi
- **Menilai risiko** — mengenali penipuan sebelum terjebak
- **Pemrograman Web II dan Komputer Forensik** — keduanya melanjutkan topik ini

Yang paling berpengaruh per satuan usaha, dan urutannya memang begini: **pengelola kata sandi**, **verifikasi dua langkah**, lalu **memperbarui perangkat lunak**.

Ketiganya jauh lebih berpengaruh daripada mengganti sandi tiap bulan — kebiasaan lama yang kini justru tidak dianjurkan karena membuat orang memilih sandi yang lebih lemah.`,

  praktik: {
    tujuan: `Akun pentingmu terlindungi verifikasi dua langkah, sandimu unik untuk tiap layanan, dan kamu tahu apakah data pernah bocor.`,
    alat: [
      'Pengelola kata sandi: Bitwarden, KeePassXC, atau bawaan peramban',
      'Aplikasi autentikator di ponsel'
    ],
    langkah: [
      { judul: 'Periksa apakah datamu pernah bocor',
        isi: `Buka **haveibeenpwned.com** dan masukkan alamat surelmu.

Kalau muncul, ganti sandi di layanan yang disebut — dan di **semua layanan lain yang memakai sandi sama**.

Butir terakhir itu yang paling penting, dan paling sering diabaikan.` },
      { judul: 'Pasang pengelola kata sandi',
        isi: `Pasang Bitwarden atau KeePassXC. Buat **satu** sandi utama yang panjang dan hanya kamu yang tahu.

Setelah itu, semua sandi lain dibuat acak oleh aplikasinya dan **tidak perlu kamu ingat**.

Ini satu langkah yang menyelesaikan masalah sandi berulang untuk selamanya.` },
      { judul: 'Nyalakan verifikasi dua langkah',
        isi: `Nyalakan di akun yang paling penting dulu: surel, GitHub, dan akun kampus.

Pakai **aplikasi autentikator**, bukan SMS — SMS bisa dibajak lewat penukaran kartu SIM.

Simpan **kode cadangan** di tempat yang aman dan terpisah.` },
      { judul: 'Uji ketahanan sandimu sendiri',
        isi: `Pakai perhitungan dari topik keamanan Pemrograman Web II: hitung berapa lama sandimu bisa ditebak habis.

Panjang jauh lebih berpengaruh daripada kerumitan. Empat kata acak lebih kuat **dan** lebih mudah diingat daripada delapan karakter berlambang.` },
      { judul: 'Periksa izin aplikasi yang terhubung',
        isi: `Buka pengaturan akun Google atau GitHub-mu, lalu lihat daftar aplikasi yang punya akses.

Cabut yang tidak kamu kenali atau tidak lagi kamu pakai. Banyak di antaranya masih punya akses bertahun-tahun setelah kamu berhenti memakainya.` },
      { judul: 'Kenali tanda penipuan',
        isi: `Periksa: alamat pengirim yang mirip tapi tidak persis, kesan mendesak, tautan yang alamat aslinya berbeda dari teksnya, dan permintaan kredensial.

Kalau ragu, **jangan klik tautannya** — buka situsnya langsung dari alamat yang kamu ketik sendiri.` }
    ],
    cek: [
      'Verifikasi dua langkah aktif di surel dan GitHub-mu',
      'Tidak ada dua layanan yang memakai sandi sama',
      'Kamu sudah mencabut akses aplikasi yang tidak lagi dipakai'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Keamanan informasi** adalah langkah-langkah melindungi data dari akses tidak sah, kerusakan, atau pencurian.

**Tiga pilar: CIA Triad**

Ini kerangka baku yang dipakai di seluruh bidang keamanan, dan wajib dikuasai:

- **Confidentiality (Kerahasiaan)** — hanya yang berhak boleh melihat. Dijaga dengan enkripsi, kata sandi, dan hak akses.
- **Integrity (Integritas)** — data tidak berubah tanpa izin. Dijaga dengan *checksum*, tanda tangan digital, dan pencatatan log.
- **Availability (Ketersediaan)** — data tersedia saat dibutuhkan. Dijaga dengan cadangan, redundansi, dan pertahanan terhadap serangan DDoS.

Ketiganya **sering saling bertarik-tarikan**. Ini bagian yang paling sering dilewatkan. Menaikkan kerahasiaan dengan menuntut kata sandi berlapis akan **menurunkan ketersediaan**, karena pengguna yang lupa jadi terkunci di luar. Sistem paling aman adalah yang dimatikan dan dikubur — dan ketersediaannya nol.

**Keamanan selalu soal pertukaran, bukan soal maksimum.**

**Ancaman yang lazim**

- **Virus dan malware** — program berbahaya yang merusak data atau sistem. *Ransomware* mengenkripsi berkas korban lalu meminta tebusan.
- **Phishing** — teknik penipuan untuk mendapatkan informasi sensitif seperti kata sandi, dengan menyamar sebagai pihak tepercaya.
- **DDoS** (*Distributed Denial of Service*) — mengganggu layanan dengan membanjiri server memakai lalu lintas palsu dari banyak sumber sekaligus. Perhatikan: DDoS **tidak mencuri data**, ia menyerang **ketersediaan**.
- **SQL injection** — menyisipkan perintah SQL lewat masukan pengguna. Sudah dibahas di topik DCL pada Basis Data.
- **Man in the middle** — menyadap dan mungkin mengubah percakapan antara dua pihak.

**Langkah pengamanan**

- **Kata sandi yang kuat** — kompleks dan sulit ditebak. Panjang lebih menentukan daripada kerumitan simbol.
- **Enkripsi data** — mengubah data menjadi bentuk yang tidak terbaca tanpa kunci.
- **Pengamanan fisik** — melindungi perangkat keras dari pencurian atau kerusakan.
- **Autentikasi dua faktor** — sesuatu yang kamu **tahu** (sandi) ditambah sesuatu yang kamu **punya** (ponsel).
- **Pembaruan berkala** — sebagian besar serangan berhasil memakai celah yang tambalannya sudah lama tersedia.

**Manusia adalah celah terlemah**

Ini yang paling penting dipahami. Enkripsi terkuat sekalipun **tidak berguna** kalau penggunanya menyerahkan kata sandinya kepada penelepon yang mengaku dari bagian IT.

Karena itu **phishing lebih sering berhasil daripada peretasan teknis** — jauh lebih murah menipu satu orang daripada menembus enkripsi. Pelatihan pengguna adalah bagian dari keamanan, sejajar dengan firewall.

**Enkripsi simetris dan asimetris**

- **Simetris** — satu kunci untuk mengunci dan membuka. Cepat, tetapi kuncinya harus dikirim ke pihak lain, dan pengiriman itu sendiri berisiko.
- **Asimetris** — sepasang kunci: **kunci publik** untuk mengunci, **kunci privat** untuk membuka. Kunci publik boleh disebar bebas. Inilah yang dipakai HTTPS.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# CIA Triad -- ketiganya SALING BERTARIK-TARIKAN\n\n# Menaikkan kerahasiaan:\n#   sandi 20 karakter + ganti tiap 30 hari + 2FA\n#   -> pengguna lupa, terkunci di luar\n#   -> KETERSEDIAAN TURUN\n\n# Menaikkan ketersediaan:\n#   salin data ke 5 server di 5 negara\n#   -> 5 tempat yang bisa dibobol\n#   -> KERAHASIAAN TURUN\n\n# Tidak ada sistem yang maksimum di ketiganya sekaligus.',
      penjelasan: `
Inilah yang membedakan pemahaman keamanan yang matang dari sekadar hafalan.

Pemula mengira keamanan berarti **memaksimalkan semuanya**. Kenyataannya ketiga pilar itu saling menekan, dan menaikkan satu hampir selalu menurunkan yang lain.

Contoh nyata yang mudah dikenali:

- Bank yang menuntut ganti PIN tiap bulan mendapat kerahasiaan lebih tinggi, tetapi nasabahnya mulai **menuliskan PIN di kertas** — dan kerahasiaannya justru anjlok. Aturan yang terlalu ketat mendorong orang mengakalinya, dan hasil akhirnya lebih buruk daripada aturan yang longgar tetapi dipatuhi.
- Rumah sakit yang mengunci rekam medis dengan berlapis pengaman melindungi kerahasiaan pasien — sampai ada keadaan gawat darurat dan dokter tidak bisa masuk. Di situ, **ketersediaan adalah soal nyawa**.

Karena itu pertanyaan yang benar bukan *"bagaimana membuat sistem seaman mungkin?"* melainkan **"apa yang paling perlu dilindungi di sistem ini, dan berapa besar ketidaknyamanan yang pantas ditanggung untuk itu?"**

Jawabannya berbeda-beda menurut keadaan:

- Basis data nilai mahasiswa → **integritas** paling utama. Nilai yang diubah diam-diam jauh lebih berbahaya daripada nilai yang bocor.
- Rekam medis → **kerahasiaan** dan **ketersediaan** sama-sama kritis, dan keduanya bertabrakan.
- Situs berita → **ketersediaan** paling utama. Isinya memang untuk umum, jadi kerahasiaan hampir tidak relevan.

Kamu akan bertemu kerangka ini lagi secara mendalam di **Keamanan Informasi** semester 5.
`
    },
    {
      bahasa: 'python',
      kode: '# JANGAN pernah menyimpan kata sandi apa adanya\nsandi_tersimpan = "rahasia123"      # BOCOR TOTAL kalau basis data dicuri\n\n# Simpan HASH-nya, bukan sandinya\nimport hashlib, secrets\n\ngaram = secrets.token_hex(16)        # acak, berbeda tiap pengguna\nhash_sandi = hashlib.sha256((garam + "rahasia123").encode()).hexdigest()\n\n# Saat login: hash ulang masukannya, lalu bandingkan hash-nya.\n# Sandi aslinya TIDAK PERNAH disimpan di mana pun.',
      penjelasan: `
Ini penerapan **kerahasiaan** yang paling sering ditanyakan, dan paling sering salah dikerjakan.

**Kenapa sandi tidak boleh disimpan apa adanya?** Karena basis data bisa bocor — lewat SQL injection, cadangan yang tercecer, atau orang dalam. Kalau isinya sandi asli, seluruh akun langsung jatuh. Lebih buruk lagi, banyak orang memakai sandi yang sama di banyak layanan, sehingga kebocoran satu situs merembet ke mana-mana.

**Hash** adalah fungsi satu arah: mudah dihitung maju, praktis mustahil dibalik. Server menyimpan hasilnya saja. Saat kamu login, server menghitung ulang hash dari sandi yang kamu ketik lalu membandingkan hasilnya — **sandi aslinya tidak pernah tersimpan di mana pun**.

**Kenapa perlu garam (*salt*)?** Tanpanya, dua orang yang kebetulan memakai sandi sama akan punya hash yang sama persis, dan penyerang bisa melihat pola itu. Lebih parah, penyerang bisa menyiapkan tabel hash sandi umum lebih dulu — disebut *rainbow table* — lalu mencocokkannya sekaligus.

Garam adalah nilai acak yang **berbeda untuk tiap pengguna**, disambung ke sandi sebelum di-hash. Akibatnya tabel yang sudah disiapkan penyerang jadi tidak berguna, karena harus dibuat ulang untuk tiap garam.

Satu catatan penting untuk dunia nyata: **SHA-256 dipakai di contoh ini karena sederhana dan mudah dijelaskan, tetapi bukan pilihan terbaik untuk sandi.** Ia dirancang supaya **cepat**, dan justru itulah masalahnya — penyerang bisa mencoba miliaran tebakan per detik.

Yang benar adalah fungsi yang sengaja dibuat **lambat** seperti **bcrypt**, **scrypt**, atau **Argon2**. Lambatnya tidak terasa bagi pengguna yang login sekali, tetapi melumpuhkan penyerang yang harus mencoba miliaran kali.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menyimpan kata sandi dengan benar
# ============================================

import hashlib
import secrets

def buat_akun(sandi):
    """Simpan GARAM + HASH, bukan sandinya."""
    garam = secrets.token_hex(16)          # acak, beda tiap pengguna
    h = hashlib.sha256((garam + sandi).encode()).hexdigest()
    return {"garam": garam, "hash": h}

def periksa(akun, tebakan):
    """Hash ulang tebakan dengan garam yang sama, lalu bandingkan."""
    h = hashlib.sha256((akun["garam"] + tebakan).encode()).hexdigest()
    return secrets.compare_digest(h, akun["hash"])


akun = buat_akun("rahasia123")
print("yang tersimpan di basis data:")
print("  garam :", akun["garam"])
print("  hash  :", akun["hash"][:32] + "...")
print("  sandi aslinya TIDAK tersimpan di mana pun")
print("")
print("login 'rahasia123' :", periksa(akun, "rahasia123"))
print("login 'rahasia124' :", periksa(akun, "rahasia124"))

# ---------- Kenapa garam perlu ----------
print("")
print("--- dua orang, sandi SAMA, hash BERBEDA ---")
a = buat_akun("123456")
b = buat_akun("123456")
print("  A:", a["hash"][:24] + "...")
print("  B:", b["hash"][:24] + "...")
print("  -> penyerang tak bisa tahu keduanya bersandi sama")

# ---------- Panjang mengalahkan kerumitan ----------
print("")
print("--- kekuatan sandi: panjang vs simbol ---")

def kemungkinan(jenis_karakter, panjang):
    return jenis_karakter ** panjang

TEBAKAN_PER_DETIK = 10 ** 10        # penyerang dengan perangkat khusus

uji = [
    ("P@ssw0rd!",      95, 9,  "8 jenis simbol, pendek"),
    ("kudamerahlompat", 26, 15, "huruf kecil saja, panjang"),
]

for contoh, jenis, panjang, ket in uji:
    n = kemungkinan(jenis, panjang)
    detik = n / TEBAKAN_PER_DETIK
    tahun = detik / (60 * 60 * 24 * 365)
    print("  " + contoh.ljust(17) + ket)
    if tahun < 1:
        print("      -> jebol dalam " + format(detik, ",.0f") + " detik")
    else:
        print("      -> butuh " + format(tahun, ",.0f") + " tahun")

print("")
print("Selisihnya sekitar " +
      format(kemungkinan(26, 15) / kemungkinan(95, 9), ",.0f") + "x")
print("padahal yang kedua cuma huruf kecil.")
print("PANJANG mengalahkan kerumitan simbol.")

# ---------- TAPI: hitungan di atas terlalu murah hati ----------
print("")
print("--- kenapa angka di atas menyesatkan ---")
print("Hitungan brute force menganggap penyerang menebak")
print("SEMBARANGAN. Penyerang sungguhan tidak begitu.")
print("")
print("'P@ssw0rd!' adalah pola yang sudah ada di setiap kamus")
print("pembobol: kata umum + huruf diganti angka + simbol di ujung.")
print("Dengan serangan kamus, ia jebol dalam HITUNGAN DETIK,")
print("bukan 2 tahun.")
print("")
print("Jadi aturannya: panjang, DAN tidak berpola tertebak.")
print("Rangkaian beberapa kata acak memenuhi keduanya.")

# ---------- CIA Triad: mana yang diserang? ----------
print("")
print("--- serangan menyerang pilar yang mana? ---")
serangan = [
    ("Pencurian basis data", "Confidentiality"),
    ("Pengubahan nilai diam-diam", "Integrity"),
    ("Serangan DDoS", "Availability"),
    ("Ransomware", "Availability + Confidentiality"),
    ("Phishing", "Confidentiality"),
]
for nama, pilar in serangan:
    print("  " + nama.ljust(28) + "-> " + pilar)`
  },

  output: `yang tersimpan di basis data:
  garam : 3f8a1c2b9d4e7f0a5c6b8d2e1f3a4b5c
  hash  : 7d9e2a1f4c8b3e6d0a5f2c9b7e4d1a8f...
  sandi aslinya TIDAK tersimpan di mana pun

login 'rahasia123' : True
login 'rahasia124' : False

--- dua orang, sandi SAMA, hash BERBEDA ---
  A: 2b7f4e9a1c6d3f8b0e5a2c7d...
  B: 9e1a4c7f2b8d5e0a3f6c9b4d...
  -> penyerang tak bisa tahu keduanya bersandi sama

--- kekuatan sandi: panjang vs simbol ---
  P@ssw0rd!        8 jenis simbol, pendek
      -> butuh 2 tahun
  kudamerahlompat  huruf kecil saja, panjang
      -> butuh 5,319 tahun

Selisihnya sekitar 2,661x
padahal yang kedua cuma huruf kecil.
PANJANG mengalahkan kerumitan simbol.

--- kenapa angka di atas menyesatkan ---
Hitungan brute force menganggap penyerang menebak
SEMBARANGAN. Penyerang sungguhan tidak begitu.

'P@ssw0rd!' adalah pola yang sudah ada di setiap kamus
pembobol: kata umum + huruf diganti angka + simbol di ujung.
Dengan serangan kamus, ia jebol dalam HITUNGAN DETIK,
bukan 2 tahun.

Jadi aturannya: panjang, DAN tidak berpola tertebak.
Rangkaian beberapa kata acak memenuhi keduanya.

--- serangan menyerang pilar yang mana? ---
  Pencurian basis data        -> Confidentiality
  Pengubahan nilai diam-diam  -> Integrity
  Serangan DDoS               -> Availability
  Ransomware                  -> Availability + Confidentiality
  Phishing                    -> Confidentiality`,

  kesalahanUmum: [
    {
      salah: 'Menyimpan kata sandi apa adanya di basis data.',
      kenapa: 'Begitu basis data bocor lewat SQL injection, cadangan yang tercecer, atau orang dalam, seluruh akun langsung jatuh. Karena banyak orang memakai sandi yang sama di beberapa layanan, kebocoran satu situs merembet ke layanan lain yang tidak ada hubungannya.',
      benar: 'Simpan garam dan hash-nya saja. Pakai fungsi yang sengaja lambat seperti bcrypt, scrypt, atau Argon2, bukan SHA-256 yang dirancang cepat.'
    },
    {
      salah: 'Mengira keamanan berarti memaksimalkan ketiga pilar CIA sekaligus.',
      kenapa: 'Ketiganya saling menekan. Kerahasiaan yang terlalu ketat menurunkan ketersediaan, dan cadangan di banyak tempat yang menaikkan ketersediaan justru memperbanyak titik yang bisa dibobol. Aturan yang terlalu ketat juga mendorong pengguna mengakalinya, misalnya menuliskan PIN di kertas, sehingga hasil akhirnya lebih buruk.',
      benar: 'Tentukan pilar mana yang paling kritis untuk sistem itu, lalu terima pertukarannya secara sadar. Basis data nilai mengutamakan integritas, situs berita mengutamakan ketersediaan.'
    },
    {
      salah: 'Mengukur kekuatan sandi dari banyaknya simbol aneh, bukan dari panjangnya.',
      kenapa: 'Setiap penambahan satu karakter melipatgandakan jumlah kemungkinan jauh lebih besar daripada menambah jenis karakter. Lebih dari itu, hitungan brute force sendiri terlalu murah hati: ia menganggap penyerang menebak sembarangan. Pola seperti P@ssw0rd!, yaitu kata umum dengan huruf diganti angka dan simbol di ujung, sudah ada di setiap kamus pembobol sehingga jebol dalam hitungan detik, bukan tahunan seperti yang dihitung rumus.',
      benar: 'Utamakan panjang, dan hindari pola yang tertebak. Rangkaian beberapa kata acak memenuhi keduanya sekaligus lebih mudah diingat.'
    },
    {
      salah: 'Menganggap DDoS sebagai serangan pencurian data.',
      kenapa: 'DDoS membanjiri server dengan lalu lintas palsu supaya layanannya lumpuh. Ia sama sekali tidak mengambil data, melainkan menyerang pilar ketersediaan. Salah golong ini membuat jawaban soal tentang CIA triad jadi keliru, dan membuat orang menyiapkan pertahanan yang tidak relevan.',
      benar: 'Golongkan DDoS sebagai serangan terhadap ketersediaan. Pertahanannya berupa penyaringan lalu lintas dan kapasitas cadangan, bukan enkripsi.'
    },
    {
      salah: 'Menganggap keamanan semata-mata masalah teknis yang bisa diselesaikan dengan perangkat.',
      kenapa: 'Phishing lebih sering berhasil daripada peretasan teknis, karena jauh lebih murah menipu satu orang daripada menembus enkripsi. Firewall dan enkripsi terkuat tidak berguna kalau penggunanya menyerahkan kata sandi kepada penelepon yang mengaku dari bagian IT.',
      benar: 'Perlakukan pelatihan pengguna sebagai bagian dari keamanan, sejajar dengan perangkat teknis. Manusia adalah celah terlemah dan harus ikut diamankan.'
    }
  ],

  analogi: `Bayangkan sebuah brankas di rumahmu.

**Confidentiality** adalah hanya kamu yang tahu kombinasinya. **Integrity** adalah jaminan bahwa isi di dalamnya tidak ditukar orang. **Availability** adalah kamu bisa membukanya saat butuh.

Sekarang lihat bagaimana ketiganya bertengkar:

- Kamu buat kombinasinya **50 digit dan ganti tiap minggu**. Kerahasiaan melonjak. Tetapi kamu mulai **menuliskannya di kertas dan menempelnya di balik laci** — dan kerahasiaannya justru jatuh lebih rendah daripada sebelumnya. Aturan yang terlalu ketat selalu diakali.
- Kamu titipkan **salinan isinya di lima rumah kerabat** supaya aman dari kebakaran. Ketersediaan melonjak. Tetapi sekarang ada **lima rumah yang bisa dibobol**, bukan satu.

Itulah kenapa tidak ada sistem yang maksimum di ketiganya. Yang ada hanyalah **pilihan sadar** tentang mana yang paling perlu dijaga.

Untuk **hash dan garam**, bayangkan penjaga yang harus memeriksa kata sandi tamu tanpa boleh mengetahuinya:

Alih-alih menyimpan daftar kata sandi, dia menyimpan **hasil pengolahan** kata sandi itu — misalnya jumlah huruf dikali nomor urut, dengan aturan yang tidak bisa dibalik. Tamu menyebut sandinya, penjaga mengolah ulang, lalu mencocokkan hasilnya. **Buku catatan penjaga tidak pernah memuat satu pun kata sandi asli.**

**Garam** adalah menambahkan satu angka acak berbeda untuk tiap tamu sebelum diolah. Tanpanya, dua tamu bersandi sama akan menghasilkan catatan identik — dan pencuri yang melihat buku itu langsung tahu keduanya memakai sandi yang sama, lalu cukup membobol satu.

Dan **manusia sebagai celah terlemah**: brankas setebal apa pun tidak menolong kalau ada yang menelepon mengaku petugas servis, dan kamu membacakan kombinasinya lewat telepon.`,

  latihan: [
    'Sebutkan tiga pilar CIA Triad beserta artinya, lalu beri satu contoh serangan yang menyerang masing-masing pilar.',
    'Jelaskan satu contoh nyata di mana menaikkan kerahasiaan justru menurunkan ketersediaan, dan satu contoh sebaliknya.',
    'Jelaskan kenapa kata sandi tidak boleh disimpan apa adanya, apa itu hash, dan kenapa garam diperlukan.',
    'Bandingkan kekuatan sandi P@ssw0rd! dengan kudamerahlompat. Hitung jumlah kemungkinan masing-masing dan jelaskan mana yang lebih kuat beserta alasannya.',
    'Jelaskan kenapa SHA-256 bukan pilihan terbaik untuk menyimpan kata sandi, dan sebutkan tiga alternatif yang lebih tepat beserta alasannya.',
    'Untuk masing-masing sistem berikut, tentukan pilar CIA mana yang paling kritis dan jelaskan alasanmu: basis data nilai mahasiswa, rekam medis rumah sakit, situs berita.'
  ]
});

TOPICS.push({
  id: 'pti-etika',
  judul: 'Etika & Dampak Sosial TI',
  kategori: 'pti',
  tag: ['etika', 'privasi', 'hak cipta', 'kesenjangan digital', 'dampak sosial'],
  ringkas: 'Bisa dilakukan tidak berarti boleh dilakukan — dan itu tanggung jawab yang membuatnya.',

  fungsi: `**Mempertimbangkan dampak dari apa yang kamu bangun, sebelum ia terlanjur dipakai.**

Terpakai di:

- **Mengolah data orang** — tugas kuliah pun sering memuat data pribadi nyata
- **Memakai kecerdasan buatan** — mengutip sumber, dan bertanggung jawab atas keluarannya
- **Menulis skripsi** — plagiarisme dan kejujuran data
- **Bekerja nanti** — permintaan yang secara teknis mungkin tetapi tidak pantas

Yang paling sering dihadapi mahasiswa Informatika, dan paling mudah dianggap sepele: **data pribadi di tugas kuliah**. Nama, NIK, dan nomor telepon orang sungguhan yang tersimpan di repositori publik adalah kebocoran nyata, meski niatnya cuma untuk demo.`,

  praktik: {
    tujuan: `Proyekmu tidak memuat data pribadi nyata di tempat yang bisa diakses publik, dan kamu punya kebiasaan memeriksanya sebelum mengunggah.`,
    alat: [
      'Git',
      'Alat pembangkit data palsu: pustaka Faker'
    ],
    langkah: [
      { judul: 'Sisir repositorimu',
        isi: `Cari di seluruh repositori: NIK, nomor telepon, alamat surel nyata, sandi, dan kunci API.

Perintah cepat: \`git grep -i "password\\|api_key\\|@gmail"\`

Periksa juga berkas contoh basis data — di situlah data nyata paling sering tertinggal.` },
      { judul: 'Ganti dengan data palsu',
        isi: `Pasang \`pip install faker\`, lalu bangkitkan data uji yang **terlihat nyata tetapi bukan siapa-siapa**.

Faker mendukung bahasa Indonesia: \`Faker('id_ID')\` menghasilkan nama dan alamat yang wajar.

Data palsu juga **lebih baik untuk pengujian**, karena kamu bisa membuat sebanyak yang kamu mau.` },
      { judul: 'Periksa riwayat Git, bukan cuma berkas sekarang',
        isi: `Menghapus berkas **tidak** menghapusnya dari riwayat. Siapa pun bisa melihat commit lama.

Periksa dengan \`git log -p --all | grep -i "kata_kunci"\`.

Kalau ada yang bocor, sandi atau kunci itu harus **dianggap sudah bocor** dan diganti — membersihkan riwayat saja tidak cukup.` },
      { judul: 'Kumpulkan data dengan izin',
        isi: `Kalau tugasmu butuh data orang, minta izin dan jelaskan: dipakai untuk apa, disimpan berapa lama, siapa yang bisa melihat.

Untuk kuesioner, cukup satu paragraf di awal. Ini kebiasaan yang akan diminta secara resmi saat skripsi.` },
      { judul: 'Sebutkan sumber dan bantuan',
        isi: `Kode dari internet, pustaka pihak ketiga, dan bantuan kecerdasan buatan — sebutkan semuanya.

Menyebutkan bukan kelemahan. Yang menjadi masalah adalah **tidak menyebutkan**, dan itu bisa berakibat serius saat skripsi.` },
      { judul: 'Uji dampaknya pada orang yang paling dirugikan',
        isi: `Untuk fitur apa pun, tanyakan: *"siapa yang paling dirugikan kalau ini salah?"*

Sistem presensi berbasis wajah yang meleset merugikan orang yang wajahnya kurang terwakili di data latih.

Pertanyaan ini murah ditanyakan sekarang, dan sangat mahal kalau baru ditanyakan setelah dipakai.` }
    ],
    cek: [
      'Tidak ada data pribadi nyata di repositori maupun di riwayat commit',
      'Data uji proyekmu dibangkitkan dengan Faker atau sejenisnya',
      'Setiap pustaka dan sumber kode yang kamu pakai disebutkan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Etika dalam TI** berkaitan dengan tanggung jawab moral pengguna teknologi: perlindungan privasi, hak cipta, dan tanggung jawab dalam penggunaan data.

Topik ini sering dianggap tempelan di akhir mata kuliah. Padahal justru inilah yang membedakan **orang yang bisa membuat sistem** dari **orang yang layak dipercaya membuat sistem**.

Kalimat kuncinya: **"bisa dilakukan" tidak sama dengan "boleh dilakukan".**

Kamu akan segera mampu mengambil data pengguna, melacak lokasi, dan menyimpulkan hal pribadi dari pola perilaku. Kemampuan itu datang jauh lebih cepat daripada kebijaksanaan untuk memakainya.

**Privasi**

Prinsip yang layak dipegang sejak sekarang:

- **Kumpulkan seminimal mungkin.** Kalau aplikasi presensi tidak butuh nomor KTP, jangan diminta. Data yang tidak kamu simpan tidak bisa bocor.
- **Sebutkan tujuannya.** Pengguna berhak tahu untuk apa datanya dipakai.
- **Jangan memakai ulang di luar tujuan awal.** Data yang dikumpulkan untuk absensi tidak pantas dipakai menilai kinerja tanpa memberitahu.
- **Simpan seperlunya, lalu hapus.** Data lama yang tidak terpakai hanyalah risiko yang menunggu.

Di Indonesia hal ini kini diatur **UU Perlindungan Data Pribadi (UU PDP) Nomor 27 Tahun 2022**, yang mewajibkan persetujuan pemilik data dan memberi sanksi bagi pelanggaran.

**Hak cipta dan lisensi**

Kode yang kamu temukan di internet **tidak otomatis bebas dipakai**. Kesalahpahaman ini sangat umum.

- **Kode tanpa lisensi tertulis** secara hukum berarti **hak ciptanya penuh dipegang penulisnya** — bukan berarti bebas. Ketiadaan lisensi berarti "tidak diizinkan", bukan "silakan".
- **MIT, Apache, BSD** — bebas dipakai termasuk untuk keperluan komersial, dengan syarat mencantumkan atribusi.
- **GPL** — boleh dipakai, tetapi program yang memakainya **wajib ikut dibuka sumbernya** dengan lisensi yang sama. Ini sering mengejutkan orang yang memakainya untuk produk tertutup.
- **Creative Commons** — untuk karya non-kode, dengan berbagai syarat seperti wajib atribusi atau larangan komersial.

**Plagiarisme** dalam konteks kuliah: menyalin kode teman lalu mengganti nama variabel tetap plagiarisme. Yang membedakan belajar dari menyontek adalah **apakah kamu bisa menjelaskan ulang** kode itu tanpa melihat.

**Dampak sosial**

Dampak positifnya jelas: akses informasi yang jauh lebih luas dan peningkatan efisiensi. Tetapi ada tantangan yang perlu disadari:

- **Kesenjangan digital** — jarak antara yang punya akses teknologi dan yang tidak. Ketika layanan penting dipindahkan ke daring sepenuhnya, yang tidak punya akses justru **makin tertinggal**.
- **Kecanduan teknologi** — banyak aplikasi memang dirancang supaya sulit ditinggalkan, karena perhatian pengguna adalah yang dijual.
- **Penggantian pekerjaan** — otomatisasi menghapus sebagian pekerjaan sambil menciptakan yang lain, dan yang kehilangan belum tentu bisa mengisi yang baru.
- **Bias algoritma** — sistem yang dilatih dari data historis akan **mewarisi ketimpangan yang ada di data itu**, lalu menerapkannya dalam skala besar dengan tampilan yang terkesan objektif.

**Bias algoritma** layak diperhatikan khusus, karena tampak netral. Angka yang keluar dari komputer terasa lebih adil daripada penilaian manusia, padahal ia bisa saja hanya mengulang prasangka lama dengan lebih cepat dan lebih banyak.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Data yang TIDAK kamu kumpulkan tidak bisa bocor\n\n# BURUK: mengumpulkan semuanya "siapa tahu berguna nanti"\npendaftaran_buruk = {\n    "nama": "", "nim": "", "ktp": "", "alamat_rumah": "",\n    "nama_ibu": "", "gaji_ortu": "", "lokasi_gps": "",\n}\n\n# BAIK: hanya yang benar-benar dibutuhkan aplikasi presensi\npendaftaran_baik = {\n    "nim": "", "nama": "",\n}\n\n# Pertanyaannya bukan "apa yang bisa dikumpulkan"\n# melainkan "apa yang TIDAK BISA jalan tanpa ini"',
      penjelasan: `
Prinsip ini disebut **minimalisasi data**, dan ia adalah pertahanan paling murah sekaligus paling ampuh yang kamu punya.

Alasannya sederhana: **kamu tidak bisa membocorkan data yang tidak kamu simpan.** Tidak ada enkripsi, firewall, atau kebijakan yang sekuat itu.

Godaan mengumpulkan semuanya sangat besar. Ruang penyimpanan murah, dan selalu ada suara *"siapa tahu berguna nanti"*. Tetapi tiap kolom tambahan menambah tiga beban sekaligus:

- **Risiko kebocoran** — makin banyak yang disimpan, makin besar kerugian saat bocor.
- **Kewajiban hukum** — di bawah UU PDP, data pribadi yang kamu simpan menjadi tanggung jawabmu, lengkap dengan sanksinya.
- **Beban kepercayaan** — pengguna yang tahu aplikasi presensi meminta nama ibu kandung akan curiga, dan kecurigaan itu wajar.

Uji sederhana yang bisa kamu pakai untuk tiap kolom: **"apakah aplikasi ini masih bisa bekerja tanpa kolom ini?"** Kalau jawabannya ya, hapus kolomnya.

Perhatikan contoh di atas. Untuk mencatat kehadiran, yang benar-benar dibutuhkan cuma **pengenal mahasiswa** dan **waktu**. Nama pun sebenarnya bisa diambil dari basis data induk lewat NIM. Nomor KTP, nama ibu, dan gaji orang tua tidak punya kaitan apa pun dengan kehadiran — dan menyimpannya berarti menanggung risiko tanpa manfaat.

Ini bukan sekadar soal moral. Kebocoran data yang memuat NIK dan nama ibu kandung bisa dipakai membobol rekening bank korban, karena keduanya sering dipakai sebagai pertanyaan verifikasi. **Data yang kamu kumpulkan sembarangan bisa merugikan orang lain dengan cara yang tidak kamu bayangkan.**
`
    },
    {
      bahasa: 'python',
      kode: '# Bias algoritma: sistem mewarisi ketimpangan dari datanya\n\n# Data historis penerimaan kerja 10 tahun terakhir:\n#   90% yang diterima laki-laki (karena bias perekrut dulu)\n#\n# Model dilatih dari data itu, lalu "belajar":\n#   -> pelamar laki-laki lebih mungkin diterima\n#\n# Hasilnya: prasangka lama diulang, tapi kini\n# dengan kecepatan mesin dan tampilan objektif.\n\n# Model tidak tahu mana pola yang ADIL\n# dan mana yang cuma KEBIASAAN BURUK yang terekam.',
      penjelasan: `
Inilah yang membuat bias algoritma jauh lebih berbahaya daripada bias manusia biasa, dan alasannya ada tiga.

**Pertama, ia terlihat objektif.** Keputusan yang keluar dari komputer terasa netral dan berdasar data. Orang lebih sulit membantah angka daripada membantah pendapat seseorang. Padahal angka itu bisa saja cuma cerminan prasangka lama.

**Kedua, ia bekerja dalam skala besar.** Seorang perekrut yang berprasangka merugikan mungkin ratusan pelamar seumur hidupnya. Sebuah model yang berprasangka merugikan **jutaan pelamar dalam sebulan**, konsisten, tanpa lelah.

**Ketiga, ia sulit diperiksa.** Kamu bisa bertanya kepada perekrut kenapa ia menolak seseorang. Bertanya kepada model dengan jutaan parameter jauh lebih sulit, dan jawabannya sering tidak bisa diterjemahkan ke alasan yang bisa dipahami manusia.

Yang perlu dipahami: **model tidak punya pengertian tentang keadilan.** Ia hanya mencari pola yang paling sering muncul di data latihnya. Kalau data itu memuat ketimpangan, pola ketimpangan itulah yang dipelajari — dan model menganggapnya sebagai kebenaran, bukan sebagai kesalahan yang perlu diperbaiki.

Menghapus kolom yang sensitif juga sering **tidak cukup**, dan ini bagian yang paling sering dilewatkan. Model bisa menemukan **penanda pengganti**: kode pos bisa mewakili suku atau tingkat ekonomi, nama sekolah bisa mewakili latar belakang keluarga. Menghapus kolom jenis kelamin tidak menghapus jejaknya kalau masih ada kolom lain yang berkorelasi dengannya.

Karena itu tanggung jawabnya ada pada **yang membangun**, bukan pada mesinnya. Pertanyaan yang harus kamu ajukan sebelum menerapkan model apa pun: *"data ini merekam kenyataan seperti apa, dan apakah kenyataan itu pantas dilanjutkan?"*
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Minimalisasi data & memilih lisensi
# ============================================

# ---------- Uji tiap kolom: benar-benar perlu? ----------
kolom_diminta = [
    ("nim",          True,  "kunci utama presensi"),
    ("nama",         False, "bisa diambil dari basis data induk lewat NIM"),
    ("no_ktp",       False, "tidak ada kaitannya dengan kehadiran"),
    ("nama_ibu",     False, "dipakai verifikasi bank -- BAHAYA kalau bocor"),
    ("gaji_ortu",    False, "sama sekali tidak relevan"),
    ("lokasi_gps",   True,  "perlu, untuk memastikan hadir di kelas"),
    ("waktu",        True,  "inti dari presensi"),
]

print("--- uji minimalisasi data ---")
simpan = []
for nama, perlu, alasan in kolom_diminta:
    tanda = "SIMPAN" if perlu else "BUANG "
    print("  " + tanda + "  " + nama.ljust(12) + alasan)
    if perlu:
        simpan.append(nama)

print("")
print("  dari " + str(len(kolom_diminta)) + " kolom, cukup " +
      str(len(simpan)) + ": " + ", ".join(simpan))
print("  yang tidak disimpan tidak bisa bocor.")


# ---------- Lisensi: boleh dipakai untuk apa? ----------
print("")
print("--- bolehkah dipakai di produk tertutup? ---")

lisensi = [
    ("MIT",        True,  "bebas, wajib cantumkan atribusi"),
    ("Apache 2.0", True,  "bebas + perlindungan paten"),
    ("BSD",        True,  "bebas, wajib cantumkan atribusi"),
    ("GPL",        False, "produkmu WAJIB ikut dibuka sumbernya"),
    ("(tanpa lisensi)", False,
     "hak cipta penuh penulis -- tidak ada izin sama sekali"),
]

for nama, boleh, ket in lisensi:
    tanda = "BOLEH  " if boleh else "TIDAK  "
    print("  " + tanda + nama.ljust(18) + ket)

print("")
print("Salah paham tersering: kode tanpa lisensi dikira bebas.")
print("Justru sebaliknya -- tanpa lisensi berarti TIDAK diizinkan.")


# ---------- Bias: menghapus kolom sensitif belum cukup ----------
print("")
print("--- kenapa menghapus kolom sensitif tidak cukup ---")
penanda_pengganti = [
    ("kode_pos",      "bisa mewakili suku atau tingkat ekonomi"),
    ("nama_sekolah",  "bisa mewakili latar belakang keluarga"),
    ("jam_melamar",   "bisa mewakili status pekerjaan saat ini"),
    ("nama_depan",    "bisa mewakili jenis kelamin atau agama"),
]
for kolom, risiko in penanda_pengganti:
    print("  " + kolom.ljust(15) + risiko)

print("")
print("Model menemukan penanda pengganti sendiri.")
print("Membuang satu kolom tidak membuang jejaknya.")`
  },

  output: `--- uji minimalisasi data ---
  SIMPAN  nim         kunci utama presensi
  BUANG   nama        bisa diambil dari basis data induk lewat NIM
  BUANG   no_ktp      tidak ada kaitannya dengan kehadiran
  BUANG   nama_ibu    dipakai verifikasi bank -- BAHAYA kalau bocor
  BUANG   gaji_ortu   sama sekali tidak relevan
  SIMPAN  lokasi_gps  perlu, untuk memastikan hadir di kelas
  SIMPAN  waktu       inti dari presensi

  dari 7 kolom, cukup 3: nim, lokasi_gps, waktu
  yang tidak disimpan tidak bisa bocor.

--- bolehkah dipakai di produk tertutup? ---
  BOLEH  MIT               bebas, wajib cantumkan atribusi
  BOLEH  Apache 2.0        bebas + perlindungan paten
  BOLEH  BSD               bebas, wajib cantumkan atribusi
  TIDAK  GPL               produkmu WAJIB ikut dibuka sumbernya
  TIDAK  (tanpa lisensi)   hak cipta penuh penulis -- tidak ada izin sama sekali

Salah paham tersering: kode tanpa lisensi dikira bebas.
Justru sebaliknya -- tanpa lisensi berarti TIDAK diizinkan.

--- kenapa menghapus kolom sensitif tidak cukup ---
  kode_pos       bisa mewakili suku atau tingkat ekonomi
  nama_sekolah   bisa mewakili latar belakang keluarga
  jam_melamar    bisa mewakili status pekerjaan saat ini
  nama_depan     bisa mewakili jenis kelamin atau agama

Model menemukan penanda pengganti sendiri.
Membuang satu kolom tidak membuang jejaknya.`,

  kesalahanUmum: [
    {
      salah: 'Mengira kode di internet yang tidak mencantumkan lisensi berarti bebas dipakai.',
      kenapa: 'Secara hukum justru sebaliknya: tanpa lisensi tertulis, hak cipta sepenuhnya dipegang penulisnya dan tidak ada izin apa pun yang diberikan. Ketiadaan lisensi berarti tidak diizinkan, bukan silakan. Memakainya di produk yang dijual bisa berujung tuntutan.',
      benar: 'Periksa berkas LICENSE sebelum memakai. Kalau tidak ada, hubungi penulisnya atau cari alternatif yang lisensinya jelas.'
    },
    {
      salah: 'Memakai pustaka berlisensi GPL di dalam produk tertutup yang dijual.',
      kenapa: 'GPL mewajibkan program yang memakainya ikut dibuka sumbernya dengan lisensi yang sama. Banyak orang mengira semua lisensi sumber terbuka berarti bebas tanpa syarat, padahal justru GPL yang paling menuntut. Pelanggarannya bisa memaksa seluruh kode produk dibuka.',
      benar: 'Bedakan lisensi permisif seperti MIT, Apache, dan BSD dari lisensi copyleft seperti GPL. Untuk produk tertutup, pilih yang permisif.'
    },
    {
      salah: 'Mengumpulkan data pengguna sebanyak mungkin dengan alasan siapa tahu berguna nanti.',
      kenapa: 'Tiap kolom tambahan menambah risiko kebocoran, kewajiban hukum di bawah UU PDP, dan kecurigaan pengguna. Data seperti NIK dan nama ibu kandung sering dipakai sebagai pertanyaan verifikasi bank, sehingga kebocorannya bisa merugikan korban jauh di luar aplikasimu.',
      benar: 'Terapkan minimalisasi data. Uji tiap kolom dengan pertanyaan apakah aplikasi masih bisa bekerja tanpanya, lalu buang yang tidak lolos.'
    },
    {
      salah: 'Mengira menghapus kolom sensitif seperti jenis kelamin sudah cukup membuat model bebas bias.',
      kenapa: 'Model bisa menemukan penanda pengganti yang berkorelasi, misalnya nama depan, kode pos, atau nama sekolah. Jejak yang ingin dihapus tetap ada lewat jalan lain, dan hasilnya tetap timpang meski kolomnya sudah tidak ada. Yang berubah cuma jadi lebih sulit dilacak.',
      benar: 'Uji keluaran modelnya terhadap kelompok yang berbeda, bukan sekadar memeriksa kolom masukannya. Bias diukur dari hasil, bukan dari niat.'
    },
    {
      salah: 'Menganggap keputusan yang dihasilkan algoritma pasti lebih objektif daripada keputusan manusia.',
      kenapa: 'Model belajar dari data historis, sehingga mewarisi ketimpangan yang terekam di dalamnya. Bedanya, prasangka itu kini berjalan dalam skala jutaan, konsisten, dan berbalut kesan netral sehingga lebih sulit dibantah. Model tidak punya pengertian tentang keadilan; ia hanya mencari pola yang paling sering muncul.',
      benar: 'Tanyakan data itu merekam kenyataan seperti apa, dan apakah kenyataan itu pantas dilanjutkan. Tanggung jawab ada pada yang membangun, bukan pada mesinnya.'
    }
  ],

  analogi: `Bayangkan kamu seorang tukang kunci yang baru lulus.

Keahlianmu membuatmu **mampu** membuka hampir semua pintu di kota. Tidak ada yang bisa menghentikanmu secara teknis. Yang membedakan tukang kunci dari pencuri **bukan kemampuannya** — keduanya sama-sama bisa — melainkan **apa yang ia pilih untuk tidak lakukan**.

Itulah posisimu sebagai orang informatika. Sebentar lagi kamu bisa mengambil data pengguna, melacak lokasi, dan menyimpulkan hal pribadi dari pola perilaku. Kemampuan itu datang jauh lebih cepat daripada kebijaksanaan memakainya.

Untuk **minimalisasi data**, bayangkan menyimpan barang titipan orang. Tiap barang yang kamu terima adalah tanggung jawab yang harus kamu jaga. Menerima titipan yang tidak kamu butuhkan berarti **menambah beban tanpa menambah guna** — dan kalau gudangmu kebobolan, yang hilang bukan barangmu, melainkan barang orang yang memercayaimu.

Untuk **lisensi**, bayangkan menemukan sepeda tergeletak tanpa gembok di pinggir jalan. Tidak ada tulisan "dilarang diambil". Apakah itu berarti boleh kamu bawa pulang? Tentu tidak — **ketiadaan larangan bukan berarti izin**. Kode tanpa lisensi persis seperti itu.

Dan untuk **bias algoritma**, bayangkan mesin yang belajar merekrut dengan menonton rekaman wawancara sepuluh tahun terakhir. Kalau selama sepuluh tahun itu perekrutnya berprasangka, mesin itu **tidak belajar merekrut** — ia belajar **meniru prasangka**, lalu menjalankannya seribu kali lebih cepat sambil terlihat seperti matematika.`,

  latihan: [
    'Sebuah aplikasi presensi kuliah meminta NIM, nama, nomor KTP, alamat rumah, dan nama ibu kandung. Tentukan kolom mana yang benar-benar perlu, dan jelaskan risiko dari masing-masing kolom yang tidak perlu.',
    'Jelaskan perbedaan lisensi MIT dan GPL. Kamu membuat aplikasi yang akan dijual — mana yang boleh kamu pakai sebagai pustaka, dan kenapa?',
    'Jelaskan kenapa kode di internet yang tidak mencantumkan lisensi justru tidak boleh dipakai bebas.',
    'Jelaskan apa itu bias algoritma, kenapa ia lebih berbahaya daripada bias manusia, dan kenapa menghapus kolom sensitif belum tentu menyelesaikannya.',
    'Jelaskan apa itu kesenjangan digital, dan beri satu contoh nyata di mana memindahkan layanan ke daring justru merugikan sebagian orang.',
    'Menurutmu, di mana batas antara belajar dari kode orang lain dan plagiarisme? Rumuskan satu uji sederhana yang bisa kamu pakai untuk membedakannya.'
  ]
});

