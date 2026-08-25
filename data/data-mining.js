/* ============================================================
   data-mining.js — materi Data Mining (Semester 4)

   Disusun dari slide kuliah sendiri di folder Materi/:
     1.  Pengenalan Data Mining
     2.  Data Warehouse
     3.  Persiapan Data
     4.  Persiapan Data II
     5.  Association Rules - Apriori
     6.  Association Rules - FP Growth
     9.  Klasifikasi - Naive Bayes
     10. Klasifikasi - Decision Tree
     11. Clustering - KMeans

   Rencana perkuliahan yang tertulis di slide pertama:
     1 Pengenalan          9  Klasifikasi (Naive Bayes)
     2 Data warehouse      10 Klasifikasi (Decision Tree, NN)
     3 Pre-processing      11 Klustering (K-Means)
     4 Pre-processing (L)  12 Klustering (Hierarchical)
     6 Analisis Asosiasi   13 Tools (RapidMiner)
     7 Analisis Asosiasi   14 Tools (Python)

   Ada juga projek sendiri: "Analisis Aturan Asosiasi pada Pola
   Pembelian Video Game Berdasarkan Perilaku Pengguna Platform
   Steam Menggunakan Algoritma FP-Growth" — dipakai sebagai contoh
   penerapan di topik Association Rules.

   Sebagian PDF slide memakai penyandian font yang tidak terbaca
   utuh oleh tools/baca-pdf.js, jadi rumus dan angkanya DIHITUNG
   ULANG sendiri dan diperiksa dengan kode.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Rumus".
   ============================================================ */

TOPICS.push({
  id: 'dm-pengantar',
  judul: 'Pengenalan Data Mining & Data Warehouse',
  kategori: 'data-mining',
  tag: ['data mining', 'KDD', 'data warehouse', 'OLAP', 'OLTP', 'ETL'],
  ringkas: 'Menggali pengetahuan dari tumpukan data — dan tempat khusus yang menampung data itu.',

  fungsi: `**Menemukan pola berguna dari data yang jumlahnya terlalu besar untuk diperiksa manusia.**

Terpakai di:

- **Analisis penjualan** — produk apa yang sering dibeli bersama
- **Segmentasi pelanggan** — mengelompokkan tanpa aturan yang ditulis manusia
- **Deteksi kecurangan** — menemukan pola yang menyimpang
- **Tugas akhir** — salah satu tema yang paling sering diambil
- **Sistem rekomendasi**

Yang perlu jujur dipahami: **data mining menemukan korelasi, bukan sebab-akibat.**

Bahwa pembeli popok sering membeli bir tidak berarti popok **menyebabkan** orang membeli bir. Menyimpulkan sebab dari korelasi adalah kesalahan paling sering dalam laporan analisis data.

Dan yang paling menentukan hasilnya bukan algoritmanya, melainkan **mutu datanya**.`,

  praktik: {
    tujuan: `Kamu bisa merumuskan satu pertanyaan bisnis yang bisa dijawab data, dan tahu tahapan CRISP-DM yang akan kamu lalui.`,
    alat: [
      'Python 3 dengan pandas',
      'Satu dataset nyata, misalnya dari Kaggle atau data kampus'
    ],
    langkah: [
      { judul: 'Mulai dari pertanyaan, bukan dari data',
        isi: `Tulis satu kalimat: *"saya ingin tahu [apa] supaya bisa memutuskan [apa]"*.

Analisis yang dimulai dari *"data apa yang saya punya"* biasanya berakhir sebagai kumpulan grafik yang tidak dipakai siapa pun.

Ini prinsip yang sama dengan nilai informasi di Sistem Informasi.` },
      { judul: 'Ikuti enam tahap CRISP-DM',
        isi: `- **Business understanding** — apa yang mau dijawab
- **Data understanding** — apa yang tersedia dan sebaik apa
- **Data preparation** — biasanya memakan 60 sampai 80 persen waktu
- **Modeling** — bagian yang terlihat menarik, tetapi paling singkat
- **Evaluation** — apakah hasilnya benar-benar menjawab pertanyaannya
- **Deployment** — dipakai orang, bukan berhenti di laporan

Perhatikan proporsinya. Mahasiswa biasanya membalik: banyak waktu di modeling, sedikit di persiapan.` },
      { judul: 'Kenali datamu sebelum apa pun',
        isi: `Jalankan \`df.info()\`, \`df.describe()\`, dan \`df.isnull().sum()\`.

Lihat: berapa baris, tipe tiap kolom, berapa yang kosong, dan apakah rentang nilainya masuk akal.

Umur bernilai 200 atau harga negatif akan langsung terlihat, dan lebih baik ditemukan sekarang.` },
      { judul: 'Bedakan OLTP dan OLAP',
        isi: `- **OLTP** — basis data operasional, dinormalisasi, dioptimalkan untuk **menulis**
- **OLAP** — gudang data, sering **didenormalisasi**, dioptimalkan untuk **membaca dan meringkas**

Menjalankan analisis berat langsung di basis data operasional bisa memperlambat aplikasi yang sedang dipakai orang. Itu alasan gudang data ada.` },
      { judul: 'Pahami skema bintang',
        isi: `Satu **tabel fakta** di tengah berisi angka yang diukur, dikelilingi **tabel dimensi** berisi keterangannya.

Contoh: fakta penjualan dengan dimensi waktu, produk, pelanggan, dan lokasi.

Bentuk ini sengaja tidak dinormalisasi supaya kueri analisisnya cepat — kebalikan dari yang kamu pelajari di Basis Data, dan itu disengaja.` },
      { judul: 'Waspadai korelasi palsu',
        isi: `Cari dua kolom di datamu yang berkorelasi kuat tetapi jelas tidak berhubungan sebab-akibat.

Tulis kalimat kesimpulan yang **salah** dari korelasi itu, lalu tulis kenapa ia salah.

Latihan ini membuatmu jauh lebih hati-hati saat menulis kesimpulan di laporan.` }
    ],
    cek: [
      'Kamu punya satu kalimat pertanyaan yang jelas sebelum menyentuh data',
      'Kamu tahu berapa persen data yang kosong di tiap kolom',
      'Kamu bisa memberi satu contoh korelasi yang bukan sebab-akibat dari datamu sendiri'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa begitu',

  konsep: `
Slide pertama membuka dengan satu kalimat yang merangkum seluruh bidang ini: **"kebanjiran data tapi miskin pengetahuan"**.

Organisasi hari ini menyimpan data jauh lebih banyak daripada yang sanggup mereka pahami. **Data mining** adalah usaha mengubah tumpukan itu menjadi sesuatu yang bisa dipakai.

**Tangga yang dinaiki**

Slide menggambarkannya sebagai perjalanan: **Data → Informasi → Pengetahuan → Kebijakan**.

Kamu sudah bertemu tiga tingkat pertamanya di topik Data & Informasi pada PTI. Data mining bekerja pada **lompatan dari informasi ke pengetahuan** — menemukan pola yang tidak seorang pun tahu sebelumnya.

**Definisi**

Data mining adalah proses **menemukan pola yang menarik dan sebelumnya tidak diketahui** dari data berukuran besar.

Tiga kata di situ menentukan:

- **Menarik** — pola yang berguna, bukan sekadar ada. Bahwa semua pelanggan punya nama bukan pola menarik.
- **Sebelumnya tidak diketahui** — kalau kamu sudah tahu jawabannya, itu bukan mining melainkan pelaporan.
- **Berukuran besar** — pada data kecil, kamu cukup melihatnya langsung.

**Nama lain**

Slide menyebut bahwa bidang ini punya banyak nama: *knowledge discovery in databases* (**KDD**), *knowledge extraction*, *data analysis*, *pattern analysis*. Data mining sebenarnya **satu tahap** dalam proses KDD yang lebih luas, meski sehari-hari keduanya sering dipakai bergantian.

**Tahapan KDD**

- **Seleksi** — memilih data yang relevan
- **Pre-processing** — membersihkan
- **Transformasi** — mengubah bentuk agar siap
- **Data mining** — menerapkan algoritmanya
- **Interpretasi/Evaluasi** — menilai apakah polanya bermakna

Perhatikan bahwa **algoritmanya cuma satu langkah dari lima**. Di dunia nyata, tiga langkah pertama memakan **sekitar 70 persen waktu** — dan itulah kenapa dua pertemuan penuh di kelasmu dipakai untuk pre-processing.

**Data mining bukan basis data biasa**

Perbedaannya soal pertanyaan yang diajukan:

- **Basis data** menjawab *"berapa penjualan bulan lalu?"* — pertanyaan yang **kamu sudah tahu bentuk jawabannya**.
- **Data mining** menjawab *"pola pembelian seperti apa yang ada di data ini?"* — kamu **tidak tahu** apa yang akan ditemukan.

**Data Warehouse**

Basis data operasional dirancang untuk **transaksi cepat**: menyimpan pesanan, memperbarui stok. Ini disebut **OLTP** (*Online Transaction Processing*).

Analisis butuh hal yang berbeda: membaca **jutaan baris sekaligus**, menjumlahkan lintas tahun, membandingkan cabang. Menjalankan kueri seperti itu di basis data operasional akan **memperlambat sistem yang sedang dipakai pelanggan**.

**Data warehouse** adalah basis data terpisah yang dirancang khusus untuk analisis, disebut **OLAP** (*Online Analytical Processing*).

**Empat sifat data warehouse**

- **Subject-oriented** — disusun per topik analisis, bukan per proses
- **Integrated** — data dari banyak sumber diseragamkan
- **Time-variant** — menyimpan **riwayat**, bukan cuma keadaan sekarang
- **Non-volatile** — data tidak diubah maupun dihapus, hanya ditambah

Sifat **time-variant** yang paling membedakannya. Basis data operasional menyimpan **alamat pelanggan sekarang**; data warehouse menyimpan **seluruh riwayat alamatnya**, sehingga kamu bisa menganalisis perpindahan.

**ETL**

Proses memindahkan data ke warehouse: **Extract** (ambil dari sumber), **Transform** (bersihkan dan seragamkan), **Load** (muat ke warehouse).

Tahap **Transform** yang paling berat, karena data dari sistem berbeda hampir selalu memakai format, satuan, dan penamaan yang berbeda.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- OLTP: basis data operasional, transaksi cepat\nINSERT INTO pesanan VALUES (1001, \'2026-03-01\', 250000);\nUPDATE stok SET jumlah = jumlah - 1 WHERE id = 55;\n-- menyentuh SEDIKIT baris, harus SANGAT cepat\n\n-- OLAP: data warehouse, analisis besar\nSELECT tahun, bulan, cabang, SUM(nilai)\nFROM   fakta_penjualan\nGROUP  BY tahun, bulan, cabang;\n-- menyentuh JUTAAN baris, boleh lambat',
      penjelasan: `
Kedua kueri ini punya sifat yang **berlawanan**, dan itulah alasan keduanya butuh basis data terpisah.

Kueri **OLTP** menyentuh satu atau dua baris dan harus selesai dalam **milidetik**, karena ada pelanggan yang sedang menunggu di depan layar. Ia dioptimalkan untuk **menulis** dengan cepat dan aman.

Kueri **OLAP** menyisir **jutaan baris** untuk menghasilkan satu tabel ringkasan. Ia boleh memakan puluhan detik, karena yang menunggu adalah analis yang membuat laporan.

Sekarang bayangkan menjalankan kueri kedua **di basis data operasional**. Kueri itu akan memindai jutaan baris dan **menahan sumber daya** selama berjalan. Selama itu, pelanggan yang mencoba memesan mengalami **halaman yang lambat atau gagal**.

Inilah alasan praktis paling kuat untuk memisahkannya: **analisis tidak boleh mengganggu operasi.**

Ada alasan kedua yang menyangkut rancangan. Basis data operasional **dinormalisasi** — persis yang kamu pelajari di Basis Data — supaya tidak ada anomali saat menulis. Tetapi normalisasi berarti **banyak JOIN** saat membaca, dan pada analisis besar itu mahal.

Data warehouse justru **sengaja didenormalisasi**, biasanya berbentuk **star schema**: satu tabel fakta besar di tengah, dikelilingi tabel dimensi. Ada pengulangan data, dan itu **diterima dengan sadar** karena warehouse hampir tidak pernah diubah — sifat **non-volatile** membuat anomali pembaruan tidak relevan.

Jadi aturan normalisasi yang kamu pelajari **tidak dibuang**, melainkan **dipilih sesuai keperluan**: normalisasi untuk yang banyak menulis, denormalisasi untuk yang banyak membaca.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Data -> Informasi -> Pengetahuan -> Kebijakan
# ============================================

TRANSAKSI = [
    ("2026-01-05", "Purwokerto", "kopi",  25000),
    ("2026-01-05", "Purwokerto", "roti",  15000),
    ("2026-01-06", "Solo",       "kopi",  25000),
    ("2026-02-10", "Purwokerto", "kopi",  27000),
    ("2026-02-11", "Solo",       "teh",   12000),
    ("2026-03-01", "Purwokerto", "kopi",  27000),
    ("2026-03-02", "Semarang",   "kopi",  27000),
]

# ---------- DATA: fakta mentah ----------
print("--- DATA (mentah) ---")
for baris in TRANSAKSI[:3]:
    print("  " + str(baris))
print("  ... " + str(len(TRANSAKSI)) + " baris")

# ---------- INFORMASI: diringkas, diberi konteks ----------
print("")
print("--- INFORMASI (diringkas) ---")
per_cabang = {}
for _, cabang, _, nilai in TRANSAKSI:
    per_cabang[cabang] = per_cabang.get(cabang, 0) + nilai
for cabang, total in sorted(per_cabang.items(), key=lambda x: -x[1]):
    print("  " + cabang.ljust(12) + format(total, ">8,"))

# ---------- PENGETAHUAN: pola yang sebelumnya tak diketahui ----------
print("")
print("--- PENGETAHUAN (pola) ---")
harga_kopi = sorted({(t, n) for t, _, b, n in TRANSAKSI if b == "kopi"})
print("  harga kopi naik dari " + format(harga_kopi[0][1], ",") +
      " (Januari) ke " + format(harga_kopi[-1][1], ",") + " (Maret)")
jumlah_kopi = sum(1 for _, _, b, _ in TRANSAKSI if b == "kopi")
print("  kopi = " + str(jumlah_kopi) + " dari " + str(len(TRANSAKSI)) +
      " transaksi (" +
      format(jumlah_kopi / len(TRANSAKSI) * 100, ".0f") + "%)")

# ---------- KEBIJAKAN: keputusan ----------
print("")
print("--- KEBIJAKAN (tindakan) ---")
print("  kopi mendominasi & harganya naik")
print("  -> pertimbangkan pemasok tetap untuk menstabilkan harga")


# ============================================
# OLTP vs OLAP
# ============================================
print("")
print("--- OLTP vs OLAP ---")
BANDING = [
    ("tujuan",        "menjalankan operasi",   "menganalisis"),
    ("kueri khas",    "INSERT, UPDATE",        "SELECT + GROUP BY"),
    ("baris disentuh","sedikit (1-10)",        "banyak (jutaan)"),
    ("kecepatan",     "milidetik, wajib",      "detik, boleh"),
    ("rancangan",     "dinormalisasi (3NF)",   "denormalisasi (star)"),
    ("data",          "keadaan SEKARANG",      "seluruh RIWAYAT"),
    ("perubahan",     "sering diubah",         "hanya ditambah"),
]
print("  " + "aspek".ljust(16) + "OLTP".ljust(24) + "OLAP")
for aspek, oltp, olap in BANDING:
    print("  " + aspek.ljust(16) + oltp.ljust(24) + olap)


# ============================================
# Empat sifat data warehouse
# ============================================
print("")
print("--- empat sifat data warehouse ---")
SIFAT = [
    ("Subject-oriented", "disusun per topik analisis, bukan per proses"),
    ("Integrated",       "data banyak sumber diseragamkan formatnya"),
    ("Time-variant",     "menyimpan RIWAYAT, bukan cuma keadaan kini"),
    ("Non-volatile",     "tidak diubah/dihapus, hanya ditambah"),
]
for nama, arti in SIFAT:
    print("  " + nama.ljust(18) + arti)

print("")
print("  Time-variant yang paling membedakan. Basis data")
print("  operasional menyimpan alamat pelanggan SEKARANG.")
print("  Warehouse menyimpan SELURUH riwayat alamatnya --")
print("  sehingga perpindahan bisa dianalisis.")


# ============================================
# ETL: tahap Transform yang paling berat
# ============================================
print("")
print("--- ETL: kenapa Transform paling berat ---")
SUMBER = [
    ("Sistem kasir",   "2026-03-01", "PWT",        "27.000"),
    ("Aplikasi mobile","01/03/2026", "Purwokerto", "27000"),
    ("Marketplace",    "Mar 1, 2026","purwokerto", "Rp 27.000,-"),
]
print("  sumber berbeda, DATA YANG SAMA:")
for sumber, tanggal, kota, nilai in SUMBER:
    print("    " + sumber.ljust(18) + tanggal.ljust(13) +
          kota.ljust(13) + nilai)

print("")
print("  Setelah Transform, ketiganya harus menjadi:")
print("    2026-03-01   Purwokerto   27000")
print("")
print("  Tiga format tanggal, tiga penulisan kota, tiga bentuk")
print("  angka. Inilah kenapa Transform memakan waktu terbesar,")
print("  dan kenapa pre-processing dapat dua pertemuan penuh.")`
  },

  output: `--- DATA (mentah) ---
  ('2026-01-05', 'Purwokerto', 'kopi', 25000)
  ('2026-01-05', 'Purwokerto', 'roti', 15000)
  ('2026-01-06', 'Solo', 'kopi', 25000)
  ... 7 baris

--- INFORMASI (diringkas) ---
  Purwokerto    94,000
  Solo          37,000
  Semarang      27,000

--- PENGETAHUAN (pola) ---
  harga kopi naik dari 25,000 (Januari) ke 27,000 (Maret)
  kopi = 5 dari 7 transaksi (71%)

--- KEBIJAKAN (tindakan) ---
  kopi mendominasi & harganya naik
  -> pertimbangkan pemasok tetap untuk menstabilkan harga

--- OLTP vs OLAP ---
  aspek           OLTP                    OLAP
  tujuan          menjalankan operasi     menganalisis
  kueri khas      INSERT, UPDATE          SELECT + GROUP BY
  baris disentuh  sedikit (1-10)          banyak (jutaan)
  kecepatan       milidetik, wajib        detik, boleh
  rancangan       dinormalisasi (3NF)     denormalisasi (star)
  data            keadaan SEKARANG        seluruh RIWAYAT
  perubahan       sering diubah           hanya ditambah

--- empat sifat data warehouse ---
  Subject-oriented  disusun per topik analisis, bukan per proses
  Integrated        data banyak sumber diseragamkan formatnya
  Time-variant      menyimpan RIWAYAT, bukan cuma keadaan kini
  Non-volatile      tidak diubah/dihapus, hanya ditambah

  Time-variant yang paling membedakan. Basis data
  operasional menyimpan alamat pelanggan SEKARANG.
  Warehouse menyimpan SELURUH riwayat alamatnya --
  sehingga perpindahan bisa dianalisis.

--- ETL: kenapa Transform paling berat ---
  sumber berbeda, DATA YANG SAMA:
    Sistem kasir      2026-03-01   PWT          27.000
    Aplikasi mobile   01/03/2026   Purwokerto   27000
    Marketplace       Mar 1, 2026  purwokerto   Rp 27.000,-

  Setelah Transform, ketiganya harus menjadi:
    2026-03-01   Purwokerto   27000

  Tiga format tanggal, tiga penulisan kota, tiga bentuk
  angka. Inilah kenapa Transform memakan waktu terbesar,
  dan kenapa pre-processing dapat dua pertemuan penuh.`,

  kesalahanUmum: [
    {
      salah: 'Menganggap data mining sama dengan membuat laporan dari basis data.',
      kenapa: 'Laporan menjawab pertanyaan yang bentuk jawabannya sudah diketahui, seperti berapa penjualan bulan lalu. Data mining mencari pola yang sebelumnya tidak diketahui siapa pun. Menyamakannya membuat orang mengira sudah melakukan mining padahal cuma menjalankan GROUP BY.',
      benar: 'Uji dengan pertanyaan: apakah kamu sudah tahu bentuk jawabannya sebelum bertanya? Kalau ya, itu pelaporan.'
    },
    {
      salah: 'Menjalankan kueri analisis besar langsung di basis data operasional.',
      kenapa: 'Kueri yang memindai jutaan baris menahan sumber daya selama berjalan, sehingga pelanggan yang sedang bertransaksi mengalami halaman lambat atau gagal. Analisis yang seharusnya tidak mengganggu siapa pun justru melumpuhkan operasi.',
      benar: 'Pindahkan data ke data warehouse terpisah lewat ETL, lalu jalankan analisisnya di sana.'
    },
    {
      salah: 'Menerapkan normalisasi ketat pada data warehouse seperti pada basis data operasional.',
      kenapa: 'Normalisasi menuntut banyak JOIN saat membaca, dan pada analisis lintas jutaan baris itu sangat mahal. Alasan utama normalisasi adalah mencegah anomali saat menulis, padahal warehouse bersifat non-volatile dan hampir tidak pernah diubah.',
      benar: 'Pakai rancangan denormalisasi seperti star schema untuk warehouse. Normalisasi tetap benar untuk basis data operasional.'
    },
    {
      salah: 'Menganggap tahap algoritma adalah bagian terbesar dari pekerjaan data mining.',
      kenapa: 'Algoritma cuma satu dari lima tahap KDD, sementara seleksi, pembersihan, dan transformasi data memakan sekitar tujuh puluh persen waktu. Mengabaikannya membuat orang terkejut ketika projek nyata ternyata lebih banyak membersihkan data daripada menjalankan model.',
      benar: 'Alokasikan waktu terbesar untuk persiapan data. Itulah sebabnya pre-processing mendapat dua pertemuan penuh di rencana perkuliahan.'
    }
  ],

  analogi: `Bayangkan gudang arsip sebuah toko yang sudah berjalan sepuluh tahun.

**Data** adalah **jutaan lembar struk** yang menumpuk di sana. Semuanya benar, semuanya tersimpan rapi — dan **tidak ada yang membacanya**, karena tidak ada manusia yang sanggup.

Itulah *"kebanjiran data tapi miskin pengetahuan"*.

**Informasi** adalah **rekap bulanan** yang dibuat dari struk itu. **Pengetahuan** adalah menemukan bahwa **orang yang membeli kopi pagi hari hampir selalu kembali sore itu juga** — sesuatu yang tidak tertulis di satu pun struk, tetapi ada di dalam polanya.

Dan **kebijakan** adalah memutuskan membuka jam lebih awal.

Sekarang **kenapa gudang arsipnya harus terpisah dari kasir**.

Bayangkan kamu meminta kasir menghitung total penjualan sepuluh tahun **saat antrean sedang panjang**. Dia harus berhenti melayani, mengambil seluruh struk, dan menghitung berjam-jam. Antreannya mengular.

**Data warehouse** adalah **ruang analisis terpisah** dengan salinan seluruh arsip. Analis bekerja berjam-jam di sana, dan **kasir tetap melayani** tanpa terganggu.

Dan sifat **time-variant**: kasir cuma perlu tahu **alamat pelanggan sekarang** untuk mengirim barang. Ruang analisis menyimpan **semua alamat yang pernah dipakai pelanggan itu** — karena dari situlah kamu bisa tahu ke mana orang pindah, dan apakah mereka berhenti berbelanja setelah pindah.

Terakhir, **ETL** adalah pekerjaan menyeragamkan. Tiga cabang mencatat kota dengan tiga cara: "PWT", "Purwokerto", "purwokerto". Bagi manusia jelas sama; bagi komputer itu **tiga kota berbeda**.

Dan menyeragamkannya bukan pekerjaan sepele — ia yang memakan waktu terbesar dari seluruh proyek.`,

  latihan: [
    'Jelaskan maksud kalimat "kebanjiran data tapi miskin pengetahuan", lalu beri satu contoh dari lingkungan kampusmu.',
    'Sebutkan lima tahap KDD, dan jelaskan kenapa tahap algoritma bukan bagian terbesar dari pekerjaannya.',
    'Jelaskan perbedaan OLTP dan OLAP dari segi tujuan, kueri khas, dan rancangan basis datanya.',
    'Sebutkan empat sifat data warehouse, lalu jelaskan kenapa sifat time-variant paling membedakannya dari basis data operasional.',
    'Jelaskan kenapa data warehouse justru sengaja didenormalisasi, padahal normalisasi diajarkan sebagai hal yang benar di Basis Data.',
    'Diberikan data penjualan dari kasir, aplikasi mobile, dan marketplace dengan format tanggal dan penulisan kota yang berbeda. Tuliskan langkah Transform yang diperlukan.'
  ]
});

TOPICS.push({
  id: 'dm-persiapan-data',
  judul: 'Persiapan Data (Pre-processing)',
  kategori: 'data-mining',
  tag: ['pre-processing', 'missing value', 'outlier', 'normalisasi', 'encoding', 'duplikat'],
  ringkas: 'Tahap yang memakan 70 persen waktu — dan menentukan apakah modelmu berarti apa-apa.',

  fungsi: `**Membersihkan dan menyiapkan data — bagian yang memakan sebagian besar waktu dan paling menentukan hasil.**

Terpakai di:

- **Setiap analisis data** — tidak ada dataset nyata yang langsung bersih
- **Melatih model** — model sebagus apa pun gagal kalau datanya kotor
- **Laporan** — angka yang salah karena data kotor lebih berbahaya daripada tidak ada laporan
- **Migrasi sistem** — memindahkan data lama ke sistem baru

Kaidah yang paling penting: **garbage in, garbage out.**

Dan yang paling sering merusak diam-diam: **mengisi nilai kosong dengan nol**. Nol adalah angka yang punya arti; nilai kosong berarti "tidak diketahui". Menyamakan keduanya menggeser rata-rata dan merusak seluruh analisis.`,

  praktik: {
    tujuan: `Kamu punya alur pembersihan data yang tercatat, bisa diulang, dan setiap keputusannya punya alasan.`,
    alat: [
      'Python 3 dengan pandas',
      'Dataset nyata yang berantakan'
    ],
    langkah: [
      { judul: 'Periksa nilai kosong sebelum apa pun',
        isi: `- \`df.isnull().sum()\` per kolom
- \`df.isnull().mean() * 100\` untuk persentasenya

Kolom yang kosong lebih dari separuh biasanya lebih baik **dibuang** daripada diisi tebakan.` },
      { judul: 'Pilih cara mengisi dengan alasan',
        isi: `- **buang barisnya** — kalau yang kosong sedikit dan datanya banyak
- **isi dengan rata-rata** — untuk data numerik yang sebarannya normal
- **isi dengan median** — kalau ada pencilan; median jauh lebih tahan
- **isi dengan modus** — untuk data kategori
- **biarkan kosong** — kalau algoritmamu bisa menanganinya

**Jangan pernah otomatis mengisi dengan nol.** Catat alasanmu memilih untuk tiap kolom.` },
      { judul: 'Temukan pencilan dengan aturan IQR',
        isi: `Hitung kuartil satu dan tiga, lalu batasnya:

- bawah: \`Q1 - 1.5 * IQR\`
- atas: \`Q3 + 1.5 * IQR\`

Yang di luar itu adalah pencilan. Tetapi **jangan langsung dibuang** — periksa dulu apakah ia salah ketik atau memang data nyata yang penting.

Transaksi terbesar tahun ini adalah pencilan, dan justru itu yang paling ingin diketahui.` },
      { judul: 'Seragamkan format',
        isi: `Data nyata selalu berantakan:

- "Purwokerto", "purwokerto", "PWT", "Purwokerto " dengan spasi
- tanggal dalam beberapa format berbeda
- angka dengan pemisah ribuan sebagai teks

Buat pemetaan baku dan terapkan. Periksa hasilnya dengan \`df['kota'].value_counts()\` — nilai yang seharusnya sama tetapi masih terpisah akan langsung terlihat.` },
      { judul: 'Buang duplikat dengan hati-hati',
        isi: `- \`df.duplicated().sum()\` untuk menghitung
- \`df.drop_duplicates(subset=['nim'])\` untuk membuang berdasarkan kolom kunci

Periksa dulu **kenapa** ada duplikat. Kadang ia data nyata — satu orang memang bertransaksi dua kali dengan nilai sama.` },
      { judul: 'Normalisasi kalau skalanya berbeda jauh',
        isi: `Kolom gaji dalam jutaan dan umur dalam puluhan tidak bisa dibandingkan langsung.

- **Min-Max** ke rentang 0 sampai 1 — kalau batasnya jelas
- **Z-score** — kalau ada pencilan

Ini **wajib** untuk algoritma berbasis jarak seperti K-Means dan KNN. Tanpa itu, kolom bernilai besar mendominasi seluruh perhitungan.` },
      { judul: 'Simpan alurnya sebagai skrip',
        isi: `Jangan membersihkan data dengan mengklik di Excel — hasilnya tidak bisa diulang dan tidak ada yang tahu apa yang kamu lakukan.

Tulis sebagai skrip Python yang membaca data mentah dan menghasilkan data bersih.

Dengan begitu, saat datanya diperbarui, kamu cukup menjalankan ulang.` }
    ],
    cek: [
      'Setiap kolom yang kamu isi punya alasan tertulis kenapa memakai cara itu',
      'Nilai yang seharusnya sama sudah menyatu setelah penyeragaman',
      'Skrip pembersihanmu bisa dijalankan ulang dari data mentah dan memberi hasil sama'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa dihitung begitu',

  konsep: `
Rencana perkuliahanmu memberi **dua pertemuan penuh** untuk pre-processing. Itu bukan kebetulan — di projek nyata, tahap ini memakan **sekitar 70 persen** seluruh waktu.

Alasannya diringkas satu kalimat yang layak diingat: **garbage in, garbage out.** Algoritma secanggih apa pun yang diberi data buruk akan menghasilkan kesimpulan buruk — dan yang lebih berbahaya, **kesimpulan itu tetap terlihat meyakinkan**.

**Masalah yang lazim ditemui**

- **Missing value** — nilai kosong
- **Noise** — nilai yang salah atau menyimpang
- **Outlier** — nilai yang jauh berbeda dari sisanya
- **Duplikat** — baris yang sama tercatat berkali-kali
- **Tidak konsisten** — format berbeda untuk hal yang sama
- **Skala berbeda** — umur 0-100 bercampur pendapatan jutaan

**Menangani missing value**

- **Hapus barisnya** — aman kalau kosongnya sedikit. Berbahaya kalau banyak, karena kamu membuang data.
- **Hapus kolomnya** — kalau sebagian besar kolom itu kosong.
- **Isi dengan mean** — untuk data numerik yang sebarannya normal.
- **Isi dengan median** — lebih tahan outlier. **Lebih aman daripada mean** kalau ada nilai ekstrem.
- **Isi dengan modus** — untuk data kategorikal.
- **Isi dengan prediksi** — memakai model dari kolom lain.

Yang sering dilewatkan: **kadang kekosongan itu sendiri bermakna.** Kolom "tanggal berhenti berlangganan" yang kosong berarti pelanggannya **masih aktif** — mengisinya dengan rata-rata akan merusak maknanya sepenuhnya.

**Outlier: buang atau pertahankan?**

Ini keputusan yang menuntut pemikiran, bukan aturan otomatis:

- **Buang** kalau ia jelas kesalahan pencatatan. Umur 250 tahun.
- **Pertahankan** kalau ia kenyataan yang jarang tetapi benar. Transaksi 500 juta dari satu pelanggan korporat.

Pada **deteksi penipuan**, outlier justru **yang paling ingin kamu temukan**. Membuangnya sama dengan membuang jawabannya.

**Normalisasi dan standardisasi**

Banyak algoritma menghitung **jarak** antar-data — K-Means dan KNN misalnya. Kalau satu kolom berskala 0-100 dan kolom lain berskala jutaan, maka **kolom berskala besar mendominasi seluruh perhitungan**, dan kolom lain jadi seolah tidak ada.

Dua cara menyeragamkannya:

- **Min-Max normalization** — memampatkan ke rentang 0 sampai 1. Rumusnya: **(x − min) / (max − min)**. Peka terhadap outlier.
- **Z-score standardization** — mengubah agar rata-ratanya 0 dan simpangan bakunya 1. Rumusnya: **(x − mean) / stdev**. Lebih tahan outlier.

**Encoding data kategorikal**

Algoritma bekerja dengan angka, sehingga kategori harus diubah:

- **Label encoding** — tiap kategori diberi angka. **Berbahaya** untuk kategori tanpa urutan, karena model akan menyangka ada urutan: kalau Merah=1, Hijau=2, Biru=3, model mengira Biru **lebih besar** dari Merah.
- **One-hot encoding** — tiap kategori jadi kolom sendiri berisi 0 atau 1. Tidak menciptakan urutan palsu, tetapi menambah banyak kolom.

Aturannya: **label encoding hanya untuk kategori yang memang berurutan** seperti rendah-sedang-tinggi. Sisanya one-hot.

**Data bocor (data leakage)**

Kesalahan halus yang paling merusak: menghitung mean atau min-max dari **seluruh** data, termasuk data uji, lalu memakainya untuk normalisasi. Model jadi **sudah tahu sesuatu tentang data uji** sebelum diuji, dan akurasinya terlihat lebih bagus daripada kenyataannya.

Yang benar: hitung parameter normalisasi **hanya dari data latih**, lalu terapkan parameter itu ke data uji.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa skala harus diseragamkan\n#\n# Dua orang, dua kolom:\n#   A: umur 25, pendapatan 5.000.000\n#   B: umur 55, pendapatan 5.000.100\n#\n# Jarak Euclidean TANPA normalisasi:\n#   sqrt(30^2 + 100^2) = 104,4\n#   -> selisih pendapatan 100 rupiah MENGALAHKAN\n#      selisih umur 30 tahun\n#\n# Kolom berskala besar MENELAN kolom lain.\n# Model jadi seolah cuma melihat satu kolom.',
      penjelasan: `
Contoh ini menunjukkan kenapa normalisasi **bukan sekadar kerapian** — tanpanya, sebagian kolom **tidak berpengaruh sama sekali**.

Perhatikan angkanya. Selisih umur 30 tahun adalah perbedaan yang sangat besar bagi manusia. Selisih pendapatan **100 rupiah** praktis tidak berarti apa-apa.

Tetapi bagi rumus jarak, yang dilihat cuma **besaran angkanya**. Dan 100 jauh lebih besar daripada 30, sehingga pendapatanlah yang mendominasi.

Pada data sungguhan, selisih pendapatan bisa jutaan sementara selisih umur puluhan. Perbandingannya jadi **ratusan ribu kali lipat** — dan kolom umur benar-benar tidak berpengaruh apa pun terhadap hasil pengelompokan.

Ini memengaruhi setiap algoritma yang memakai jarak: **K-Means**, **KNN**, dan **SVM**. Algoritma berbasis pohon seperti **Decision Tree** justru **tidak terpengaruh**, karena ia membandingkan nilai dalam satu kolom saja, bukan menjumlahkan lintas kolom.

Jadi normalisasi **tidak selalu perlu** — ia perlu ketika algoritmanya menghitung jarak.

Sekarang memilih antara dua caranya:

**Min-Max** memampatkan ke rentang 0 sampai 1, sehingga hasilnya rapi dan mudah dibaca. Tetapi ia memakai nilai **min dan max**, yang berarti **satu outlier ekstrem menggencet seluruh data lain** ke wilayah sempit. Kalau ada satu pendapatan 1 miliar di antara data yang biasanya jutaan, seluruh data normal akan berdesakan di dekat nol.

**Z-score** memakai mean dan simpangan baku, sehingga jauh lebih tahan outlier. Hasilnya tidak terbatas pada rentang tertentu, dan itu justru berguna — outlier tetap terlihat sebagai nilai yang jauh, bukan dipaksa masuk ke dalam kotak.

Aturan praktisnya: **ada outlier, pakai Z-score. Butuh rentang pasti 0 sampai 1, pakai Min-Max.**
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Pre-processing: dari data kotor ke siap pakai
# ============================================
import math

# ---------- Data mentah: sengaja bermasalah ----------
MENTAH = [
    # nama,      umur, pendapatan, kota,          langganan
    ("Andi",     25,   5000000,    "Purwokerto",  "Premium"),
    ("Budi",     None, 4500000,    "purwokerto",  "Basic"),
    ("Citra",    30,   None,       "PWT",         "Premium"),
    ("Dedi",     250,  6000000,    "Solo",        "Basic"),      # umur mustahil
    ("Andi",     25,   5000000,    "Purwokerto",  "Premium"),    # duplikat
    ("Eka",      28,   950000000,  "Semarang",    "Enterprise"), # outlier asli
    ("Fani",     35,   5500000,    "solo",        "Basic"),
]

print("--- masalah yang ditemukan ---")
print("  baris 2 : umur kosong")
print("  baris 3 : pendapatan kosong")
print("  baris 4 : umur 250 -- mustahil, kesalahan catat")
print("  baris 5 : duplikat persis dari baris 1")
print("  baris 6 : pendapatan 950 juta -- outlier, tapi MUNGKIN BENAR")
print("  kota    : Purwokerto / purwokerto / PWT  -> tiga penulisan")
print("  skala   : umur 0-100 vs pendapatan jutaan")


# ---------- 1. Buang duplikat ----------
terlihat = set()
tahap1 = []
for baris in MENTAH:
    if baris not in terlihat:
        terlihat.add(baris)
        tahap1.append(baris)
print("")
print("--- 1. buang duplikat: " + str(len(MENTAH)) + " -> " +
      str(len(tahap1)) + " baris ---")


# ---------- 2. Seragamkan kategori ----------
PETA_KOTA = {"pwt": "Purwokerto", "purwokerto": "Purwokerto",
             "solo": "Solo", "semarang": "Semarang"}

tahap2 = [(n, u, p, PETA_KOTA[k.lower()], l) for n, u, p, k, l in tahap1]
print("")
print("--- 2. seragamkan kota ---")
print("  " + str(sorted({k for _, _, _, k, _ in tahap2})))


# ---------- 3. Tangani noise: umur mustahil ----------
tahap3 = [(n, (None if u is not None and (u < 0 or u > 120) else u), p, k, l)
          for n, u, p, k, l in tahap2]
print("")
print("--- 3. umur 250 dianggap SALAH CATAT -> jadikan kosong ---")
print("  Ini keputusan sadar: 250 mustahil, jadi ia noise.")
print("  Bandingkan pendapatan 950 juta yang MUNGKIN benar.")


# ---------- 4. Isi nilai kosong ----------
def median(angka):
    a = sorted(angka)
    n = len(a)
    return a[n // 2] if n % 2 else (a[n // 2 - 1] + a[n // 2]) / 2

umur_ada = [u for _, u, _, _, _ in tahap3 if u is not None]
dapat_ada = [p for _, _, p, _, _ in tahap3 if p is not None]

med_umur = median(umur_ada)
med_dapat = median(dapat_ada)
rata_dapat = sum(dapat_ada) / len(dapat_ada)

print("")
print("--- 4. isi nilai kosong ---")
print("  umur      -> median " + str(med_umur))
print("  pendapatan-> median " + format(med_dapat, ",.0f"))
print("  (bandingkan mean pendapatan: " + format(rata_dapat, ",.0f") + ")")
print("")
print("  MEDIAN dipilih karena outlier 950 juta menyeret MEAN")
print("  naik jauh melampaui pendapatan siapa pun yang nyata.")

tahap4 = [(n,
           med_umur if u is None else u,
           med_dapat if p is None else p,
           k, l)
          for n, u, p, k, l in tahap3]


# ---------- 5. Normalisasi ----------
def min_max(nilai, data):
    lo, hi = min(data), max(data)
    return (nilai - lo) / (hi - lo) if hi != lo else 0.0

def z_score(nilai, data):
    m = sum(data) / len(data)
    var = sum((x - m) ** 2 for x in data) / len(data)
    sd = math.sqrt(var)
    return (nilai - m) / sd if sd else 0.0

umur_semua = [u for _, u, _, _, _ in tahap4]
dapat_semua = [p for _, _, p, _, _ in tahap4]

print("")
print("--- 5. normalisasi: Min-Max vs Z-score ---")
print("  nama    pendapatan      min-max    z-score")
for n, u, p, k, l in tahap4:
    print("  " + n.ljust(8) + format(p, ">13,.0f") +
          format(min_max(p, dapat_semua), "11.3f") +
          format(z_score(p, dapat_semua), "11.3f"))

print("")
print("  Perhatikan kolom min-max: outlier 950 juta membuat")
print("  SELURUH data lain berdesakan di dekat 0. Rentangnya")
print("  memang 0-1, tapi perbedaan antar data normal HILANG.")
print("  Z-score menjaga mereka tetap terbedakan.")


# ---------- 6. Encoding kategorikal ----------
print("")
print("--- 6. encoding: label vs one-hot ---")
KOTA = sorted({k for _, _, _, k, _ in tahap4})
LANGGANAN = ["Basic", "Premium", "Enterprise"]     # ADA urutannya

print("  Kota TIDAK punya urutan -> ONE-HOT")
print("    " + "nama".ljust(8) + "  ".join(k[:9].rjust(11) for k in KOTA))
for n, u, p, k, l in tahap4:
    kolom = ["1" if k == kk else "0" for kk in KOTA]
    print("    " + n.ljust(8) + "  ".join(c.rjust(11) for c in kolom))

print("")
print("  Langganan PUNYA urutan -> LABEL encoding sah")
for n, u, p, k, l in tahap4:
    print("    " + n.ljust(8) + l.ljust(12) + "-> " +
          str(LANGGANAN.index(l)))

print("")
print("  Kalau kota di-label-encode (Purwokerto=0, Semarang=1,")
print("  Solo=2), model akan menyangka Solo LEBIH BESAR dari")
print("  Purwokerto -- urutan palsu yang tidak pernah ada.")


# ---------- Data bocor ----------
print("")
print("--- data bocor: kesalahan yang paling halus ---")
print("  SALAH : hitung min & max dari SELURUH data,")
print("          lalu normalisasi latih dan uji sekaligus")
print("          -> model sudah 'tahu' sesuatu tentang data uji")
print("          -> akurasi terlihat lebih bagus dari kenyataan")
print("")
print("  BENAR : hitung min & max HANYA dari data latih,")
print("          lalu terapkan parameter itu ke data uji")`
  },

  output: `--- masalah yang ditemukan ---
  baris 2 : umur kosong
  baris 3 : pendapatan kosong
  baris 4 : umur 250 -- mustahil, kesalahan catat
  baris 5 : duplikat persis dari baris 1
  baris 6 : pendapatan 950 juta -- outlier, tapi MUNGKIN BENAR
  kota    : Purwokerto / purwokerto / PWT  -> tiga penulisan
  skala   : umur 0-100 vs pendapatan jutaan

--- 1. buang duplikat: 7 -> 6 baris ---

--- 2. seragamkan kota ---
  ['Purwokerto', 'Semarang', 'Solo']

--- 3. umur 250 dianggap SALAH CATAT -> jadikan kosong ---
  Ini keputusan sadar: 250 mustahil, jadi ia noise.
  Bandingkan pendapatan 950 juta yang MUNGKIN benar.

--- 4. isi nilai kosong ---
  umur      -> median 29.0
  pendapatan-> median 5,500,000
  (bandingkan mean pendapatan: 194,200,000)

  MEDIAN dipilih karena outlier 950 juta menyeret MEAN
  naik jauh melampaui pendapatan siapa pun yang nyata.

--- 5. normalisasi: Min-Max vs Z-score ---
  nama    pendapatan      min-max    z-score
  Andi        5,000,000      0.001     -0.448
  Budi        4,500,000      0.000     -0.449
  Citra       5,500,000      0.001     -0.447
  Dedi        6,000,000      0.002     -0.445
  Eka       950,000,000      1.000      2.236
  Fani        5,500,000      0.001     -0.447

  Perhatikan kolom min-max: outlier 950 juta membuat
  SELURUH data lain berdesakan di dekat 0. Rentangnya
  memang 0-1, tapi perbedaan antar data normal HILANG.
  Z-score menjaga mereka tetap terbedakan.

--- 6. encoding: label vs one-hot ---
  Kota TIDAK punya urutan -> ONE-HOT
    nama      Purwokert     Semarang         Solo
    Andi              1            0            0
    Budi              1            0            0
    Citra             1            0            0
    Dedi              0            0            1
    Eka               0            1            0
    Fani              0            0            1

  Langganan PUNYA urutan -> LABEL encoding sah
    Andi    Premium     -> 1
    Budi    Basic       -> 0
    Citra   Premium     -> 1
    Dedi    Basic       -> 0
    Eka     Enterprise  -> 2
    Fani    Basic       -> 0

  Kalau kota di-label-encode (Purwokerto=0, Semarang=1,
  Solo=2), model akan menyangka Solo LEBIH BESAR dari
  Purwokerto -- urutan palsu yang tidak pernah ada.

--- data bocor: kesalahan yang paling halus ---
  SALAH : hitung min & max dari SELURUH data,
          lalu normalisasi latih dan uji sekaligus
          -> model sudah 'tahu' sesuatu tentang data uji
          -> akurasi terlihat lebih bagus dari kenyataan

  BENAR : hitung min & max HANYA dari data latih,
          lalu terapkan parameter itu ke data uji`,

  kesalahanUmum: [
    {
      salah: 'Mengisi nilai kosong dengan mean tanpa memeriksa adanya outlier.',
      kenapa: 'Mean tertarik jauh oleh nilai ekstrem. Pada contoh di materi, satu pendapatan 950 juta membuat mean menjadi 194 juta, padahal tidak ada seorang pun yang berpendapatan sebesar itu selain si outlier. Mengisi kekosongan dengan angka itu menciptakan data palsu yang jauh dari kenyataan.',
      benar: 'Pakai median untuk data yang punya outlier. Periksa sebaran datanya lebih dulu sebelum memilih cara pengisian.'
    },
    {
      salah: 'Membuang semua outlier secara otomatis.',
      kenapa: 'Sebagian outlier adalah kenyataan yang jarang tetapi benar, misalnya pelanggan korporat dengan transaksi sangat besar. Pada deteksi penipuan, outlier justru hal yang paling ingin ditemukan, sehingga membuangnya sama dengan membuang jawabannya.',
      benar: 'Bedakan noise dari outlier asli. Umur 250 tahun mustahil sehingga itu noise, tetapi transaksi 950 juta mungkin benar dan perlu diperiksa dulu.'
    },
    {
      salah: 'Memakai label encoding untuk kategori yang tidak punya urutan.',
      kenapa: 'Model akan menyangka ada urutan yang sebenarnya tidak ada. Kalau Purwokerto diberi nilai 0 dan Solo diberi 2, model memperlakukan Solo sebagai dua kali lebih besar dari Purwokerto, dan menghitung jaraknya seolah keduanya berjauhan sementara Semarang di tengah.',
      benar: 'Pakai one-hot encoding untuk kategori tanpa urutan. Label encoding hanya sah untuk yang memang berurutan seperti rendah, sedang, tinggi.'
    },
    {
      salah: 'Melewatkan normalisasi pada algoritma yang menghitung jarak.',
      kenapa: 'Kolom berskala besar akan mendominasi seluruh perhitungan jarak, sehingga kolom berskala kecil praktis tidak berpengaruh. Pada contoh di materi, selisih pendapatan seratus rupiah mengalahkan selisih umur tiga puluh tahun.',
      benar: 'Normalisasi sebelum memakai K-Means, KNN, atau SVM. Untuk algoritma berbasis pohon seperti Decision Tree, normalisasi tidak diperlukan.'
    },
    {
      salah: 'Menghitung parameter normalisasi dari seluruh data termasuk data uji.',
      kenapa: 'Model jadi sudah mengetahui sesuatu tentang data uji sebelum diuji, sehingga akurasinya terlihat lebih bagus daripada kenyataannya. Ini disebut data bocor, dan sangat sulit disadari karena tidak ada pesan kesalahan apa pun, hanya angka yang terlalu bagus.',
      benar: 'Hitung min, max, mean, dan simpangan baku hanya dari data latih, lalu terapkan parameter yang sama ke data uji.'
    }
  ],

  analogi: `Bayangkan menyiapkan bahan sebelum memasak untuk seratus orang.

**Missing value** adalah **bahan yang tidak ada di keranjang**. Kamu bisa membuang resepnya, mengganti dengan bahan lain, atau memakai perkiraan. Yang tidak boleh: **berpura-pura bahannya ada**.

Dan perhatikan satu hal: kadang **kekosongan itu sendiri adalah informasi**. Kolom "tanggal berhenti berlangganan" yang kosong berarti orang itu **masih berlangganan** — mengisinya dengan tanggal rata-rata sama dengan menyatakan semua orang sudah berhenti.

**Outlier** adalah **satu buah semangka di antara seratus jeruk**. Apakah itu kesalahan penyortir, atau memang ada yang memesan semangka?

Jawabannya menentukan. Kalau kamu **membuang semua yang aneh secara otomatis**, dan tugasmu justru **mencari pesanan tidak biasa**, kamu baru saja membuang satu-satunya hal yang kamu cari.

**Normalisasi** adalah menyeragamkan satuan. Bayangkan resep yang menyebut *"3 butir telur dan 500 gram tepung"*. Kalau kamu menganggap angkanya setara, kamu akan menyimpulkan tepung **167 kali lebih penting** daripada telur — padahal keduanya sama-sama menentukan.

Untuk **Min-Max lawan Z-score**: bayangkan mengukur tinggi badan sekelompok orang, lalu **seekor jerapah ikut berdiri di barisan**.

Dengan **Min-Max**, kamu menetapkan jerapah sebagai 1 dan orang terpendek sebagai 0. Akibatnya **seluruh manusia berdesakan di antara 0 dan 0,3** — perbedaan antara orang setinggi 150 dan 190 cm nyaris hilang.

Dengan **Z-score**, kamu mengukur seberapa jauh tiap orang dari rata-rata manusia. Jerapah tetap tercatat sebagai **sangat jauh**, tetapi perbedaan antar-manusia **tetap terlihat jelas**.

Dan **encoding**: memberi nomor pada kota — Purwokerto 1, Semarang 2, Solo 3 — membuat komputer menyimpulkan bahwa **Semarang berada tepat di tengah antara Purwokerto dan Solo**, dan bahwa Solo "tiga kali" Purwokerto. Urutan yang tidak pernah ada, dan tidak seorang pun memberitahunya bahwa itu salah.`,

  latihan: [
    'Sebutkan enam masalah data yang lazim ditemui saat pre-processing, dan beri satu contoh nyata untuk masing-masing.',
    'Jelaskan kapan mengisi nilai kosong dengan mean dan kapan dengan median. Hitung keduanya untuk data 5, 6, 7, 8, dan 900, lalu jelaskan mana yang lebih mewakili.',
    'Jelaskan perbedaan noise dan outlier asli, lalu tentukan mana yang harus dibuang untuk kasus: umur 250 tahun, transaksi 950 juta, dan suhu tubuh 5 derajat.',
    'Hitung Min-Max dan Z-score untuk nilai 5.000.000 dari data yang memuat outlier 950.000.000. Jelaskan kenapa hasilnya sangat berbeda.',
    'Jelaskan kenapa label encoding berbahaya untuk kolom kota tetapi sah untuk kolom tingkat langganan. Tunjukkan urutan palsu yang tercipta.',
    'Jelaskan apa itu data bocor pada tahap normalisasi, kenapa ia sulit disadari, dan bagaimana cara yang benar.'
  ]
});

TOPICS.push({
  id: 'dm-asosiasi',
  judul: 'Association Rules — Apriori & FP-Growth',
  kategori: 'data-mining',
  tag: ['association rules', 'Apriori', 'FP-Growth', 'support', 'confidence', 'lift'],
  ringkas: 'Menemukan barang yang sering dibeli bersamaan — dan satu ukuran yang menyelamatkanmu dari kesimpulan palsu.',

  fungsi: `**Menemukan barang atau kejadian yang sering muncul bersama.**

Terpakai di:

- **Tata letak toko** — menaruh barang yang sering dibeli bersama berdekatan
- **Rekomendasi** — "sering dibeli bersama" di toko daring
- **Paket bundling** dan penentuan promosi
- **Analisis log** — halaman apa yang sering dikunjungi berurutan
- **Tugas akhir** — Apriori adalah tema yang sangat sering diambil

Yang paling sering salah dipahami: **confidence tinggi tidak berarti aturannya berguna.**

Kalau 90 persen pembeli apa pun membeli kantong plastik, maka aturan "beli roti maka beli kantong plastik" punya confidence 90 persen — dan **tidak memberi tahu apa-apa**.

Untuk itulah ada **lift**. Lift di bawah satu berarti hubungannya justru **negatif**.`,

  praktik: {
    tujuan: `Kamu bisa menjalankan Apriori pada data transaksi nyata dan memilih aturan yang benar-benar berguna, bukan sekadar sering muncul.`,
    alat: [
      'Python 3',
      'pandas dan mlxtend',
      'Data transaksi nyata atau buatan'
    ],
    langkah: [
      { judul: 'Siapkan data dalam bentuk keranjang',
        isi: `Tiap baris adalah satu transaksi, tiap kolom satu barang, isinya benar atau salah.

Dari data transaksi biasa: \`TransactionEncoder\` di mlxtend mengubahnya untukmu.

Periksa hasilnya — jumlah baris harus sama dengan jumlah transaksi, bukan jumlah item.` },
      { judul: 'Pahami ketiga ukurannya',
        isi: `- **support** — seberapa sering muncul dari seluruh transaksi
- **confidence** — dari yang membeli A, berapa persen juga membeli B
- **lift** — berapa kali lebih mungkin dibanding kebetulan

Lift satu berarti tidak ada hubungan. Di bawah satu berarti **negatif** — membeli A justru mengurangi peluang membeli B.` },
      { judul: 'Pilih minimum support dengan sadar',
        isi: `Terlalu tinggi → cuma menemukan yang sudah jelas.
Terlalu rendah → ribuan aturan dan waktu hitung meledak.

Mulai dari sekitar 0,05 lalu sesuaikan. Perhatikan berapa aturan yang keluar di tiap nilai.

Untuk barang yang jarang tetapi mahal, support rendah justru yang menarik.` },
      { judul: 'Jalankan Apriori',
        isi: `- \`from mlxtend.frequent_patterns import apriori, association_rules\`
- \`freq = apriori(df, min_support=0.05, use_colnames=True)\`
- \`rules = association_rules(freq, metric='lift', min_threshold=1.2)\`

Urutkan hasilnya berdasarkan lift, bukan confidence.` },
      { judul: 'Buang aturan yang tidak berguna',
        isi: `Saring:

- lift di bawah 1,2 — hubungannya terlalu lemah
- aturan yang memuat barang yang **hampir selalu dibeli** — kantong plastik, nasi putih
- aturan yang cuma kebalikan dari aturan lain

Yang tersisa biasanya sedikit, dan justru itu yang berharga.` },
      { judul: 'Bandingkan dengan FP-Growth',
        isi: `- \`from mlxtend.frequent_patterns import fpgrowth\`

Jalankan keduanya pada data yang sama dan ukur waktunya. FP-Growth biasanya jauh lebih cepat karena hanya membaca data dua kali.

Hasilnya **harus identik** — kalau berbeda, ada parameter yang tidak sama.` },
      { judul: 'Terjemahkan jadi tindakan',
        isi: `Aturan tanpa tindakan tidak berguna.

Untuk tiga aturan teratasmu, tulis: *"karena A dan B sering dibeli bersama dengan lift 2,3, sebaiknya keduanya ditaruh berdekatan"* atau *"dijadikan paket"*.

Ini yang membedakan laporan analisis dari daftar angka.` }
    ],
    cek: [
      'Apriori dan FP-Growth memberi hasil identik pada data yang sama',
      'Kamu bisa menjelaskan kenapa sebuah aturan berconfidence tinggi bisa tidak berguna',
      'Tiga aturan teratasmu masing-masing punya tindakan yang disarankan'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa dihitung begitu',

  konsep: `
Slide merumuskannya: **algoritma asosiasi mencari aturan yang menghitung hubungan antara dua atau lebih atribut**. Ia berangkat dari **pola frekuensi tinggi** lalu menghasilkan aturan berbentuk **JIKA X MAKA Y**.

Contoh yang disebut slide: **{Teh} → {Gula}, support 40%, confidence 50%**. Artinya 40% dari seluruh transaksi memuat teh dan gula bersamaan, dan 50% pembeli teh juga membeli gula.

Penerapan paling terkenalnya disebut **market basket analysis** — menganalisis isi keranjang belanja.

Projek kelompokmu memakainya untuk hal yang berbeda: **pola pembelian video game di Steam**, dengan algoritma FP-Growth.

**Tiga ukuran**

**Support** — seberapa sering kombinasi itu muncul:

**support(X) = jumlah transaksi memuat X / total transaksi**

Untuk dua item: **support(X ∪ Y) = jumlah transaksi memuat X dan Y / total transaksi**

**Confidence** — seberapa sering Y muncul kalau X sudah ada:

**confidence(X → Y) = support(X ∪ Y) / support(X)**

**Lift** — seberapa besar X **meningkatkan peluang** Y dibanding kalau tidak ada hubungan:

**lift(X → Y) = confidence(X → Y) / support(Y)**

**Kenapa lift yang paling penting**

Ini bagian yang paling sering dilewatkan, dan paling menentukan.

Bayangkan **90% transaksi memuat kantong plastik**. Aturan {apa pun} → {kantong plastik} akan punya **confidence sangat tinggi**, dan terlihat seperti temuan hebat.

Padahal itu **tidak berarti apa-apa** — kantong plastik memang dibeli hampir semua orang, terlepas dari apa pun yang lain.

**Lift** menangkap ini:

- **lift > 1** — X **menaikkan** peluang Y. Ada hubungan sungguhan.
- **lift = 1** — **tidak ada hubungan**. X dan Y saling bebas.
- **lift < 1** — X **menurunkan** peluang Y. Mereka saling mengganti.

Untuk kantong plastik, lift-nya akan mendekati **1** — dan aturan itu langsung terbuka kedoknya.

**Aturan praktis: confidence tinggi tanpa lift tinggi adalah jebakan.**

**Apriori**

Bekerja bertahap, dari kombinasi 1 item, lalu 2, lalu 3, dan seterusnya.

Kuncinya adalah **prinsip Apriori**: kalau sebuah kombinasi **tidak sering muncul**, maka **semua kombinasi yang memuatnya juga tidak akan sering muncul**.

Ini masuk akal: kalau {roti} cuma muncul 3 kali, maka {roti, susu} **tidak mungkin** muncul lebih dari 3 kali. Menambah item hanya bisa **mengurangi** jumlahnya.

Prinsip ini memungkinkan **pemangkasan besar-besaran**: begitu satu kombinasi gugur, seluruh cabang di atasnya tidak perlu diperiksa sama sekali.

**Kelemahan Apriori**: ia harus **memindai basis data berkali-kali**, sekali untuk tiap ukuran kombinasi. Pada data besar, ini mahal.

**FP-Growth**

Menyelesaikan kelemahan itu. Ia membangun struktur pohon bernama **FP-Tree** yang memampatkan seluruh transaksi, lalu menambang polanya **dari pohon itu**.

Keunggulannya: hanya butuh **dua kali pemindaian** basis data, dan **tidak membangkitkan kandidat** satu per satu.

Itulah kenapa projek kelompokmu memilih FP-Growth untuk data Steam — jumlah judul game dan transaksinya terlalu besar untuk Apriori.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa CONFIDENCE saja menyesatkan\n#\n# 100 transaksi, 90 di antaranya memuat kantong plastik\n#\n# Aturan: {roti} -> {kantong plastik}\n#   support(roti)          = 20/100 = 0,20\n#   support(roti+kantong)  = 18/100 = 0,18\n#   confidence             = 0,18/0,20 = 0,90   <- TINGGI!\n#\n# Terlihat hebat. Tapi:\n#   support(kantong)       = 90/100 = 0,90\n#   lift = 0,90 / 0,90     = 1,00   <- TIDAK ADA HUBUNGAN\n#\n# Kantong plastik memang dibeli hampir semua orang.\n# Confidence tinggi TANPA lift tinggi adalah jebakan.',
      penjelasan: `
Inilah alasan **lift** harus selalu dilihat, dan kenapa mengandalkan confidence saja bisa menghasilkan kesimpulan yang **terlihat meyakinkan tetapi tidak berguna**.

Perhatikan cara kerja lift: ia membandingkan **peluang Y setelah tahu X** dengan **peluang Y begitu saja**.

- Kalau setelah tahu X peluang Y naik → **lift > 1**, ada hubungan
- Kalau peluangnya sama saja → **lift = 1**, X tidak memberi tahu apa pun tentang Y

Untuk kantong plastik, peluangnya 90% baik kamu tahu orang itu membeli roti maupun tidak. Jadi **membeli roti tidak memberi informasi tambahan apa pun**, dan lift-nya tepat 1.

Bahayanya nyata dalam praktik. Kalau kamu menyusun aturan berdasarkan confidence saja, seluruh **barang populer** akan muncul di sisi kanan setiap aturan — dan rekomendasimu berubah menjadi *"orang yang membeli apa pun, mungkin juga ingin membeli barang terlaris kami"*.

Itu benar, tetapi tidak ada gunanya.

Sekarang **lift < 1**, yang juga bermakna. Kalau lift {kopi} → {teh} bernilai 0,3, artinya orang yang membeli kopi **justru lebih jarang** membeli teh. Mereka **saling mengganti** — dan itu temuan yang berguna untuk penataan rak maupun penetapan harga.

Untuk **prinsip Apriori**, alasannya bisa ditalar tanpa rumus. Menambahkan syarat ke sebuah himpunan **tidak pernah menambah** jumlah transaksi yang memenuhinya. Kalau {roti} muncul 3 kali, maka {roti, susu} paling banyak 3 kali — karena transaksi yang memuat keduanya pasti juga memuat roti.

Sifat ini disebut **monoton menurun**, dan ia yang memungkinkan pemangkasan. Begitu {roti} dinyatakan tidak sering, **seluruh kombinasi yang memuat roti** bisa dicoret sekaligus tanpa diperiksa — dan pada data dengan ratusan item, itu memangkas jutaan kandidat.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Association Rules: Apriori & pentingnya lift
# ============================================
from itertools import combinations

# ---------- Data transaksi ----------
TRANSAKSI = [
    {"roti", "susu", "kantong"},
    {"roti", "telur", "kantong"},
    {"susu", "telur", "kantong"},
    {"roti", "susu", "telur", "kantong"},
    {"kopi", "gula", "kantong"},
    {"teh", "gula", "kantong"},
    {"teh", "gula", "roti", "kantong"},
    {"kopi", "gula", "kantong"},
    {"susu", "roti", "kantong"},
    {"teh", "gula", "kantong"},
]

N = len(TRANSAKSI)
MIN_SUPPORT = 0.2
MIN_CONFIDENCE = 0.5


def support(himpunan):
    cocok = sum(1 for t in TRANSAKSI if himpunan <= t)
    return cocok / N


# ============================================
# APRIORI: bertahap, dengan pemangkasan
# ============================================
def apriori():
    item = sorted({i for t in TRANSAKSI for i in t})
    sering = {}
    tingkat = [frozenset([i]) for i in item]
    k = 1
    total_diperiksa = 0
    total_dipangkas = 0

    while tingkat:
        lolos = []
        for kandidat in tingkat:
            total_diperiksa += 1
            s = support(set(kandidat))
            if s >= MIN_SUPPORT:
                sering[kandidat] = s
                lolos.append(kandidat)

        print("  ukuran " + str(k) + ": " + str(len(tingkat)) +
              " kandidat -> " + str(len(lolos)) + " sering")

        # Bangkitkan kandidat ukuran k+1 HANYA dari yang lolos.
        # Inilah pemangkasannya: kombinasi yang memuat item
        # tidak-sering TIDAK PERNAH dibangkitkan.
        baru = set()
        for a in lolos:
            for b in lolos:
                gabung = a | b
                if len(gabung) == k + 1:
                    baru.add(gabung)

        semua_mungkin = len(list(combinations(item, k + 1)))
        total_dipangkas += semua_mungkin - len(baru)

        tingkat = sorted(baru, key=lambda x: sorted(x))
        k += 1

    print("")
    print("  kandidat diperiksa : " + str(total_diperiksa))
    print("  kandidat dipangkas : " + str(total_dipangkas))
    print("  -> prinsip Apriori: kalau {X} tidak sering, maka")
    print("     SEMUA kombinasi yang memuat X juga tidak sering")
    return sering


print("--- APRIORI (min support " + str(MIN_SUPPORT) + ") ---")
SERING = apriori()


# ============================================
# Membentuk aturan, lalu menilainya
# ============================================
print("")
print("--- aturan asosiasi ---")
print("  aturan                        supp   conf   lift")

aturan = []
for himpunan, supp in SERING.items():
    if len(himpunan) < 2:
        continue
    for r in range(1, len(himpunan)):
        for kiri in combinations(sorted(himpunan), r):
            kiri = frozenset(kiri)
            kanan = himpunan - kiri
            conf = supp / support(set(kiri))
            lift = conf / support(set(kanan))
            if conf >= MIN_CONFIDENCE:
                aturan.append((kiri, kanan, supp, conf, lift))

for kiri, kanan, supp, conf, lift in sorted(aturan, key=lambda x: -x[4]):
    label = "{" + ",".join(sorted(kiri)) + "} -> {" + \
            ",".join(sorted(kanan)) + "}"
    tanda = ""
    if lift > 1.2:
        tanda = "  <- hubungan NYATA"
    elif abs(lift - 1) < 0.05:
        tanda = "  <- TIDAK ADA hubungan"
    print("  " + label.ljust(30) +
          format(supp, ".2f") + "  " +
          format(conf, ".2f") + "  " +
          format(lift, ".2f") + tanda)


# ============================================
# Jebakan: confidence tinggi, lift = 1
# ============================================
print("")
print("--- kenapa confidence saja menyesatkan ---")
kantong = frozenset(["kantong"])
print("  support(kantong) = " + format(support({"kantong"}), ".2f") +
      "   (hampir semua transaksi)")
print("")
for barang in ["roti", "susu", "teh", "kopi"]:
    b = frozenset([barang])
    supp_gab = support({barang, "kantong"})
    conf = supp_gab / support({barang})
    lift = conf / support({"kantong"})
    print("  {" + barang + "} -> {kantong}" +
          "   conf " + format(conf, ".2f") +
          "   lift " + format(lift, ".2f"))

print("")
print("  Confidence-nya SEMPURNA (1,00) untuk semuanya.")
print("  Tapi lift-nya juga 1,00 -- artinya membeli roti")
print("  TIDAK memberi tahu apa pun tentang kantong plastik.")
print("  Semua orang memang membelinya.")
print("")
print("  Aturan praktis: confidence tinggi TANPA lift tinggi")
print("  adalah jebakan. Selalu periksa lift.")


# ============================================
# Apriori vs FP-Growth
# ============================================
print("")
print("--- Apriori vs FP-Growth ---")
BANDING = [
    ("cara kerja",     "bangkitkan kandidat bertahap", "bangun FP-Tree"),
    ("pemindaian DB",  "berkali-kali (per ukuran)",    "cukup 2 kali"),
    ("kandidat",       "dibangkitkan & diuji",         "tidak dibangkitkan"),
    ("memori",         "hemat",                        "butuh pohon di memori"),
    ("data besar",     "lambat",                       "jauh lebih cepat"),
]
print("  " + "aspek".ljust(16) + "Apriori".ljust(32) + "FP-Growth")
for aspek, a, f in BANDING:
    print("  " + aspek.ljust(16) + a.ljust(32) + f)

print("")
print("  Projek Steam kelompokmu memilih FP-Growth karena")
print("  jumlah judul game dan transaksinya terlalu besar")
print("  untuk Apriori yang harus memindai berulang kali.")`
  },

  output: `--- APRIORI (min support 0.2) ---
  ukuran 1: 7 kandidat -> 7 sering
  ukuran 2: 21 kandidat -> 11 sering
  ukuran 3: 17 kandidat -> 5 sering
  ukuran 4: 2 kandidat -> 0 sering

  kandidat diperiksa : 47
  kandidat dipangkas : 72
  -> prinsip Apriori: kalau {X} tidak sering, maka
     SEMUA kombinasi yang memuat X juga tidak sering

--- aturan asosiasi ---
  aturan                        supp   conf   lift
  {kopi} -> {gula}              0.20  1.00  2.00  <- hubungan NYATA
  {gula} -> {teh}               0.30  0.60  2.00  <- hubungan NYATA
  {teh} -> {gula}               0.30  1.00  2.00  <- hubungan NYATA
  {kopi} -> {gula,kantong}      0.20  1.00  2.00  <- hubungan NYATA
  {kantong,kopi} -> {gula}      0.20  1.00  2.00  <- hubungan NYATA
  {susu} -> {telur}             0.20  0.50  1.67  <- hubungan NYATA
  {telur} -> {susu}             0.20  0.67  1.67  <- hubungan NYATA
  {roti} -> {susu}              0.30  0.60  1.50  <- hubungan NYATA
  {susu} -> {roti}              0.30  0.75  1.50  <- hubungan NYATA
  ... (aturan lain dengan lift 1,00 dipangkas dari tampilan)

--- kenapa confidence saja menyesatkan ---
  support(kantong) = 1.00   (hampir semua transaksi)

  {roti} -> {kantong}   conf 1.00   lift 1.00
  {susu} -> {kantong}   conf 1.00   lift 1.00
  {teh} -> {kantong}   conf 1.00   lift 1.00
  {kopi} -> {kantong}   conf 1.00   lift 1.00

  Confidence-nya SEMPURNA (1,00) untuk semuanya.
  Tapi lift-nya juga 1,00 -- artinya membeli roti
  TIDAK memberi tahu apa pun tentang kantong plastik.
  Semua orang memang membelinya.

  Aturan praktis: confidence tinggi TANPA lift tinggi
  adalah jebakan. Selalu periksa lift.

--- Apriori vs FP-Growth ---
  aspek           Apriori                         FP-Growth
  cara kerja      bangkitkan kandidat bertahap    bangun FP-Tree
  pemindaian DB   berkali-kali (per ukuran)       cukup 2 kali
  kandidat        dibangkitkan & diuji            tidak dibangkitkan
  memori          hemat                           butuh pohon di memori
  data besar      lambat                          jauh lebih cepat

  Projek Steam kelompokmu memilih FP-Growth karena
  jumlah judul game dan transaksinya terlalu besar
  untuk Apriori yang harus memindai berulang kali.`,

  kesalahanUmum: [
    {
      salah: 'Menilai aturan asosiasi hanya dari confidence-nya.',
      kenapa: 'Barang yang dibeli hampir semua orang akan selalu punya confidence tinggi di sisi kanan aturan, padahal tidak ada hubungan sungguhan. Rekomendasi yang dihasilkan berubah menjadi pernyataan kosong bahwa siapa pun mungkin ingin membeli barang terlaris.',
      benar: 'Selalu periksa lift bersama confidence. Lift mendekati satu berarti tidak ada hubungan, betapa pun tinggi confidence-nya.'
    },
    {
      salah: 'Menganggap lift kurang dari satu berarti aturannya tidak berguna.',
      kenapa: 'Lift di bawah satu justru bermakna: X menurunkan peluang Y, artinya keduanya saling mengganti. Temuan ini berguna untuk penataan rak dan penetapan harga, dan membuangnya berarti kehilangan separuh informasi yang tersedia.',
      benar: 'Baca lift sebagai arah hubungan. Di atas satu berarti saling melengkapi, di bawah satu berarti saling mengganti, tepat satu berarti tidak berhubungan.'
    },
    {
      salah: 'Menetapkan minimum support terlalu rendah supaya aturan yang ditemukan banyak.',
      kenapa: 'Jumlah kandidat meledak secara eksponensial, sehingga Apriori menjadi sangat lambat dan hasilnya penuh aturan yang muncul dari kebetulan pada sedikit transaksi. Aturan berdasar tiga transaksi dari sejuta tidak bisa dipercaya.',
      benar: 'Tetapkan minimum support yang masuk akal untuk jumlah datamu, lalu turunkan bertahap kalau hasilnya terlalu sedikit.'
    },
    {
      salah: 'Menyimpulkan hubungan sebab akibat dari aturan asosiasi.',
      kenapa: 'Aturan asosiasi hanya menunjukkan bahwa dua hal sering muncul bersamaan, bukan bahwa yang satu menyebabkan yang lain. Keduanya bisa saja disebabkan faktor ketiga yang tidak ada di data, misalnya musim atau promosi yang sedang berjalan.',
      benar: 'Sebut hasilnya sebagai keterkaitan, bukan sebab akibat. Untuk membuktikan sebab, dibutuhkan percobaan terkendali, bukan penambangan data historis.'
    }
  ],

  analogi: `Bayangkan kamu menjaga kasir minimarket selama sebulan, dan mencatat isi setiap keranjang.

**Support** menjawab: *"berapa sering kombinasi ini muncul?"* Kalau roti dan susu bersama muncul di 30 dari 100 keranjang, support-nya 30%.

**Confidence** menjawab: *"kalau sudah ada roti, seberapa sering susu ikut?"*

**Lift** menjawab pertanyaan yang jauh lebih tajam: *"apakah roti benar-benar memberitahuku sesuatu tentang susu?"*

Dan di sinilah letak jebakannya. Bayangkan **kantong plastik** yang dibeli hampir semua orang.

Kamu akan menemukan aturan *"orang yang membeli roti, 95% juga membeli kantong plastik"*. Angkanya mengesankan. Kamu mungkin ingin menaruh kantong plastik di dekat roti.

Tetapi coba periksa: **orang yang membeli apa pun** juga membeli kantong plastik 95% dari waktu. Roti sama sekali tidak berpengaruh. **Lift = 1.**

Memindahkan rak kantong plastik ke sebelah roti tidak akan menaikkan penjualan sepeser pun.

Sekarang **prinsip Apriori**, dan kenapa ia sangat menghemat. Bayangkan kamu mencari kombinasi yang muncul minimal 20 kali. Kamu memeriksa **durian**, dan ternyata cuma dibeli 3 kali sebulan.

Pada titik itu kamu bisa **langsung mencoret semua kombinasi yang memuat durian** — durian+susu, durian+roti, durian+telur, dan seluruh kombinasi tiga item yang memuatnya. Tanpa memeriksa satu pun.

Alasannya jelas: keranjang yang memuat durian **dan** susu pastilah juga keranjang yang memuat durian. Jadi jumlahnya tidak mungkin lebih dari 3.

Satu pemeriksaan, ratusan kombinasi tercoret. Itulah pemangkasan.

Dan **FP-Growth**? Alih-alih bolak-balik memeriksa tumpukan struk berkali-kali, ia **menyusun ulang seluruh struk menjadi satu pohon** lebih dulu, lalu membaca polanya dari pohon itu. Dua kali baca, selesai.`,

  latihan: [
    'Tuliskan rumus support, confidence, dan lift, lalu jelaskan pertanyaan apa yang dijawab masing-masing.',
    'Dari 200 transaksi, 60 memuat teh, 80 memuat gula, dan 45 memuat keduanya. Hitung support, confidence, dan lift untuk aturan teh menuju gula.',
    'Jelaskan kenapa aturan dengan confidence 0,95 tetapi lift 1,0 tidak berguna. Beri satu contoh barang yang memicu keadaan ini.',
    'Jelaskan prinsip Apriori, lalu tunjukkan berapa banyak kombinasi yang bisa dicoret kalau satu item dari sepuluh ternyata tidak sering muncul.',
    'Jelaskan arti lift kurang dari satu, dan beri satu contoh pasangan barang yang kemungkinan punya lift seperti itu.',
    'Bandingkan Apriori dan FP-Growth dari segi jumlah pemindaian basis data dan kebutuhan memori. Jelaskan kenapa projek Steam memilih FP-Growth.'
  ]
});

TOPICS.push({
  id: 'dm-klasifikasi-clustering',
  judul: 'Klasifikasi & Clustering',
  kategori: 'data-mining',
  tag: ['Naive Bayes', 'Decision Tree', 'K-Means', 'supervised', 'unsupervised', 'akurasi'],
  ringkas: 'Menebak label dari data berlabel, dan mengelompokkan data yang tidak berlabel sama sekali.',

  fungsi: `**Memisahkan data ke dalam kelompok — dengan label yang sudah ada, atau tanpa label sama sekali.**

Terpakai di:

- **Klasifikasi** — memprediksi apakah mahasiswa berisiko DO, apakah transaksi mencurigakan
- **Clustering** — mengelompokkan pelanggan tanpa tahu kelompoknya sejak awal
- **Deteksi anomali** — data yang tidak masuk kelompok mana pun
- **Tugas akhir** — Naive Bayes, C4.5, dan K-Means adalah tema yang sangat sering diambil

Perbedaan pokoknya: **klasifikasi butuh data berlabel, clustering tidak.**

Kalau kamu punya data mahasiswa yang sudah diketahui lulus atau DO, itu klasifikasi. Kalau kamu cuma punya datanya dan ingin tahu ada kelompok apa saja, itu clustering.

Dan satu peringatan: **akurasi bisa sangat menyesatkan** pada data yang tidak seimbang.`,

  praktik: {
    tujuan: `Kamu bisa melatih pengklasifikasi, menilainya dengan ukuran yang tepat, dan menentukan jumlah cluster dengan alasan.`,
    alat: [
      'Python 3',
      'scikit-learn',
      'matplotlib'
    ],
    langkah: [
      { judul: 'Pisahkan data latih dan uji lebih dulu',
        isi: `- \`train_test_split(X, y, test_size=0.2, random_state=42)\`

Lakukan ini **sebelum** apa pun, termasuk sebelum normalisasi. Kalau kamu menormalisasi seluruh data dulu, informasi dari data uji **bocor** ke proses pelatihan.

Kebocoran ini membuat hasilmu terlihat lebih baik daripada sebenarnya.` },
      { judul: 'Jangan percaya akurasi saja',
        isi: `Kalau 95 persen mahasiswa lulus, model yang **selalu menjawab lulus** punya akurasi 95 persen — dan sama sekali tidak berguna.

Pakai **confusion matrix**, lalu hitung **precision**, **recall**, dan **F1**.

Untuk mendeteksi mahasiswa berisiko DO, **recall** jauh lebih penting daripada akurasi — melewatkan satu yang berisiko lebih merugikan daripada salah menandai yang aman.` },
      { judul: 'Coba beberapa algoritma',
        isi: `- **Naive Bayes** — cepat, bekerja baik untuk teks
- **Decision Tree** — bisa dijelaskan, bisa digambar
- **KNN** — sederhana, tetapi butuh normalisasi
- **Random Forest** — biasanya paling akurat, tetapi sulit dijelaskan

Jalankan semuanya pada data yang sama dan bandingkan. Pilih berdasarkan **kebutuhan**, bukan hanya angka tertinggi — kalau hasilnya harus dijelaskan, Decision Tree menang meski akurasinya sedikit lebih rendah.` },
      { judul: 'Gambar pohon keputusanmu',
        isi: `- \`from sklearn.tree import plot_tree\`

Melihat pohonnya membuat kamu bisa memeriksa apakah aturannya **masuk akal**.

Kalau pohonnya memakai kolom yang seharusnya tidak berpengaruh, kemungkinan ada kebocoran data — misalnya kolom yang baru terisi **setelah** hasilnya diketahui.` },
      { judul: 'Normalisasi sebelum K-Means',
        isi: `K-Means memakai jarak, jadi kolom bernilai besar mendominasi.

Buktikan: jalankan tanpa normalisasi, lalu dengan normalisasi, dan bandingkan kelompok yang terbentuk.

Perbedaannya biasanya besar, dan yang tanpa normalisasi hampir selalu salah.` },
      { judul: 'Tentukan jumlah cluster dengan metode Elbow',
        isi: `Jalankan K-Means untuk k dari 1 sampai 10, catat WCSS-nya, lalu buat grafiknya.

Cari titik di mana penurunannya **melandai** — itu perkiraan k yang baik.

Periksa juga dengan **silhouette score**. Kalau keduanya menunjuk k yang berbeda, periksa datanya lagi.` },
      { judul: 'Jalankan beberapa kali dengan benih berbeda',
        isi: `K-Means bergantung pada titik awal acak, dan bisa **terjebak** di hasil yang buruk.

Jalankan lima sampai sepuluh kali dengan \`random_state\` berbeda, dan bandingkan WCSS-nya.

Kalau hasilnya jauh berbeda, ambil yang terbaik — dan sebutkan di laporanmu bahwa kamu melakukannya.` }
    ],
    cek: [
      'Kamu memakai precision dan recall, bukan hanya akurasi',
      'Grafik Elbow-mu menunjukkan titik lengkung yang jelas',
      'K-Means dengan benih berbeda memberi WCSS yang tidak jauh berbeda'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa dihitung begitu',

  konsep: `
Dua kelompok tugas yang paling banyak dipakai di data mining, dan pembedanya satu hal: **apakah datanya sudah punya label?**

- **Klasifikasi** — *supervised*. Data latih **sudah punya jawaban**, dan model belajar menebak jawaban untuk data baru.
- **Clustering** — *unsupervised*. **Tidak ada jawaban** sama sekali; model mencari kelompok alami dalam data.

Perbedaannya menentukan cara menilai hasilnya. Klasifikasi bisa diukur **akurasinya** karena ada jawaban benar untuk dibandingkan. Clustering **tidak punya jawaban benar**, sehingga penilaiannya jauh lebih rumit.

**Naive Bayes**

Memakai **Teorema Bayes** untuk menghitung peluang tiap kelas, lalu memilih yang tertinggi.

**P(kelas | fitur) ∝ P(kelas) × P(fitur₁|kelas) × P(fitur₂|kelas) × ...**

Kata **"naive"** merujuk pada satu asumsi besar: **semua fitur dianggap saling bebas**. Asumsi ini hampir selalu **salah** di dunia nyata — tinggi badan dan berat badan jelas berhubungan — tetapi Naive Bayes tetap bekerja baik pada banyak kasus, terutama **klasifikasi teks** seperti deteksi spam.

**Masalah peluang nol.** Kalau satu kata tidak pernah muncul di data latih untuk suatu kelas, peluangnya nol — dan karena rumusnya perkalian, **seluruh hasilnya jadi nol**, berapa pun bukti lainnya.

Penyelesaiannya **Laplace smoothing**: tambahkan 1 ke setiap hitungan, sehingga tidak ada peluang yang benar-benar nol.

**Decision Tree**

Membangun pohon keputusan dengan **memilih fitur yang paling memisahkan data** di tiap simpul.

Ukuran pemisahan yang lazim:

- **Entropy** — ukuran ketidakteraturan. Bernilai 0 kalau semua data satu kelas, dan maksimal kalau tercampur rata.
- **Information Gain** — berapa banyak entropy **berkurang** setelah dipisah dengan fitur tertentu. Fitur dengan gain tertinggi dipilih.
- **Gini Index** — alternatif yang lebih murah dihitung.

**Keunggulan besarnya: bisa dibaca manusia.** Pohonnya bisa diterjemahkan menjadi aturan JIKA-MAKA, sehingga bisa dijelaskan — persis keunggulan sistem pakar yang kamu pelajari di Kecerdasan Buatan, tetapi aturannya **ditemukan sendiri dari data**.

**Kelemahannya: mudah overfitting.** Pohon yang dibiarkan tumbuh penuh akan menghafal data latih sampai ke deraunya. Ditangani dengan **pruning** atau membatasi kedalaman.

**K-Means**

Mengelompokkan data menjadi **k kelompok** dengan langkah berulang:

- Pilih **k titik pusat** awal secara acak
- Masukkan tiap data ke pusat **terdekat**
- **Pindahkan** tiap pusat ke rata-rata anggotanya
- Ulangi sampai pusatnya tidak bergerak lagi

**Tiga hal yang harus disadari:**

- **k ditentukan manusia**, bukan ditemukan algoritma. Salah memilih k menghasilkan kelompok yang tidak bermakna.
- **Hasilnya bergantung pada pusat awal.** Menjalankan dua kali bisa memberi hasil berbeda. Ditangani dengan menjalankan beberapa kali, atau memakai **K-Means++** untuk memilih pusat awal yang lebih baik.
- **Wajib normalisasi**, karena ia menghitung jarak — persis alasan di topik pre-processing.

**Menentukan k: metode Elbow**

Hitung total jarak kuadrat ke pusat (disebut **WCSS**) untuk berbagai k, lalu gambar grafiknya. Titik di mana grafiknya **menekuk seperti siku** adalah k yang masuk akal.

**Mengukur klasifikasi**

Akurasi saja **menyesatkan pada data tidak seimbang**. Kalau 99% email bukan spam, model yang selalu menjawab "bukan spam" punya akurasi 99% — dan **tidak berguna sama sekali**.

Karena itu dipakai juga:

- **Precision** — dari yang ditebak positif, berapa yang benar
- **Recall** — dari yang sebenarnya positif, berapa yang tertangkap
- **F1-score** — rata-rata harmonik keduanya

Mana yang diutamakan bergantung akibat kesalahannya: pada deteksi penyakit, **recall** lebih penting karena melewatkan pasien sakit jauh lebih berbahaya daripada salah alarm.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa AKURASI saja menyesatkan\n#\n# 1000 email, 990 bukan spam, 10 spam\n#\n# Model bodoh: "semuanya bukan spam"\n#   benar: 990 dari 1000  -> AKURASI 99%\n#   spam tertangkap: 0    -> RECALL 0%\n#\n# Akurasi 99% terdengar hebat.\n# Modelnya sama sekali tidak berguna.\n\n# precision = dari yang ditebak spam, berapa benar spam\n# recall    = dari spam yang ADA, berapa tertangkap',
      penjelasan: `
Ini jebakan penilaian yang paling sering memakan korban, dan ia muncul setiap kali datanya **tidak seimbang**.

Perhatikan bahwa model bodoh itu **tidak melakukan apa pun** — ia menjawab hal yang sama untuk setiap masukan. Namun akurasinya **99 persen**, angka yang di laporan mana pun akan terlihat sangat baik.

Yang gagal ditangkap akurasi: dari 10 spam yang ada, **tidak satu pun tertangkap**. Bagi pengguna, filter spam itu **sama saja dengan tidak ada**.

**Recall** langsung membongkarnya: 0 dari 10, atau **0 persen**.

Sekarang memilih mana yang diutamakan, dan ini bergantung pada **akibat kesalahannya**:

**Deteksi penyakit** — mengutamakan **recall**. Melewatkan pasien yang benar-benar sakit berakibat fatal, sementara salah alarm cuma berujung pemeriksaan tambahan. Lebih baik memeriksa sepuluh orang sehat daripada melewatkan satu yang sakit.

**Filter spam** — mengutamakan **precision**. Email penting yang salah masuk folder spam bisa membuat orang kehilangan tawaran kerja. Kebalikannya, satu spam yang lolos ke kotak masuk cuma menjengkelkan sebentar.

Perhatikan bahwa keduanya **saling menekan**. Menaikkan recall berarti menebak positif lebih longgar, yang menurunkan precision. Menaikkan precision berarti menebak lebih hati-hati, yang menurunkan recall.

**F1-score** menggabungkan keduanya lewat rata-rata harmonik. Rata-rata harmonik dipakai — bukan rata-rata biasa — karena ia **menghukum ketimpangan**. Precision 100% dengan recall 0% menghasilkan F1 **nol**, bukan 50%.

Jadi F1 tidak bisa dibohongi oleh model yang unggul di satu sisi tetapi gagal di sisi lain.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Klasifikasi & Clustering dari nol
# ============================================
import math
import random
from collections import Counter

# ============================================
# 1. NAIVE BAYES: klasifikasi teks (deteksi spam)
# ============================================
LATIH = [
    ("menang hadiah undian klik sekarang",     "spam"),
    ("gratis promo diskon klik link",          "spam"),
    ("hadiah gratis menang sekarang",          "spam"),
    ("jadwal kuliah minggu depan",             "ham"),
    ("laporan tugas basis data",               "ham"),
    ("rapat kelompok besok pagi",              "ham"),
    ("kuliah pengganti hari sabtu",            "ham"),
]

def latih_nb(data, alpha=1.0):
    """alpha = Laplace smoothing, mencegah peluang NOL."""
    kelas = Counter(k for _, k in data)
    kata_per_kelas = {k: Counter() for k in kelas}
    for teks, k in data:
        kata_per_kelas[k].update(teks.split())

    kosakata = set()
    for c in kata_per_kelas.values():
        kosakata |= set(c)

    return kelas, kata_per_kelas, kosakata, alpha


def prediksi_nb(teks, model):
    kelas, kata_per_kelas, kosakata, alpha = model
    total = sum(kelas.values())
    skor = {}

    for k in kelas:
        # Pakai LOG supaya perkalian peluang kecil tidak jadi nol
        log_p = math.log(kelas[k] / total)
        total_kata = sum(kata_per_kelas[k].values())
        for kata in teks.split():
            jumlah = kata_per_kelas[k][kata]
            # Laplace: +alpha di atas, +alpha*|V| di bawah
            p = (jumlah + alpha) / (total_kata + alpha * len(kosakata))
            log_p += math.log(p)
        skor[k] = log_p

    return max(skor, key=skor.get), skor


model = latih_nb(LATIH)
print("--- NAIVE BAYES: deteksi spam ---")
UJI = [
    "gratis hadiah klik",
    "jadwal rapat kuliah",
    "menang undian besok",
]
for teks in UJI:
    hasil, skor = prediksi_nb(teks, model)
    print("  '" + teks + "'")
    print("      -> " + hasil.upper() +
          "   (log spam " + format(skor["spam"], ".2f") +
          ", ham " + format(skor["ham"], ".2f") + ")")

print("")
print("  Catatan: dipakai LOG peluang, bukan perkalian langsung.")
print("  Mengalikan puluhan peluang kecil membuat hasilnya")
print("  membulat jadi NOL di komputer -- disebut underflow.")
print("  Menjumlahkan log menghindarinya tanpa mengubah urutan.")


# ============================================
# 2. ENTROPY & INFORMATION GAIN (Decision Tree)
# ============================================
DATA_CUACA = [
    # cuaca,   suhu,    angin,  main?
    ("cerah",  "panas", "tidak", "tidak"),
    ("cerah",  "panas", "ya",    "tidak"),
    ("mendung","panas", "tidak", "ya"),
    ("hujan",  "sejuk", "tidak", "ya"),
    ("hujan",  "dingin","tidak", "ya"),
    ("hujan",  "dingin","ya",    "tidak"),
    ("mendung","dingin","ya",    "ya"),
    ("cerah",  "sejuk", "tidak", "tidak"),
    ("cerah",  "dingin","tidak", "ya"),
    ("hujan",  "sejuk", "tidak", "ya"),
]

def entropy(label):
    n = len(label)
    if n == 0:
        return 0.0
    hitung = Counter(label)
    return -sum((c / n) * math.log2(c / n) for c in hitung.values())

def info_gain(data, kolom):
    label_semua = [b[-1] for b in data]
    dasar = entropy(label_semua)
    n = len(data)

    nilai = {b[kolom] for b in data}
    sesudah = 0.0
    for v in nilai:
        bagian = [b for b in data if b[kolom] == v]
        sesudah += (len(bagian) / n) * entropy([b[-1] for b in bagian])
    return dasar - sesudah

print("")
print("--- DECISION TREE: memilih fitur pemisah terbaik ---")
NAMA_KOLOM = ["cuaca", "suhu", "angin"]
dasar = entropy([b[-1] for b in DATA_CUACA])
print("  entropy awal: " + format(dasar, ".4f"))
print("")
for i, nama in enumerate(NAMA_KOLOM):
    g = info_gain(DATA_CUACA, i)
    print("  gain(" + nama.ljust(6) + ") = " + format(g, ".4f"))

terbaik = max(range(3), key=lambda i: info_gain(DATA_CUACA, i))
print("")
print("  -> fitur pemisah terbaik: " + NAMA_KOLOM[terbaik])
print("     (gain tertinggi = paling banyak mengurangi ketidakteraturan)")


# ============================================
# 3. K-MEANS: clustering
# ============================================
def kmeans(titik, k, seed=0, maks=100):
    r = random.Random(seed)
    pusat = r.sample(titik, k)

    for putaran in range(maks):
        kelompok = [[] for _ in range(k)]
        for t in titik:
            jarak = [math.dist(t, p) for p in pusat]
            kelompok[jarak.index(min(jarak))].append(t)

        pusat_baru = []
        for i, g in enumerate(kelompok):
            if g:
                pusat_baru.append((sum(x for x, _ in g) / len(g),
                                   sum(y for _, y in g) / len(g)))
            else:
                pusat_baru.append(pusat[i])

        if pusat_baru == pusat:
            return pusat, kelompok, putaran + 1
        pusat = pusat_baru

    return pusat, kelompok, maks


TITIK = [(1,1),(1.5,2),(2,1.5),(1.2,1.8),
         (8,8),(9,8.5),(8.5,9),(9.2,8.2),
         (1,8),(1.5,8.5),(2,9)]

def hitung_wcss(pusat, kelompok):
    """Total jarak kuadrat tiap titik ke pusat kelompoknya."""
    return sum(math.dist(t, p) ** 2
               for p, g in zip(pusat, kelompok) for t in g)


# ---------- Pusat awal MENENTUKAN hasil ----------
print("")
print("--- K-MEANS k=3: hasilnya bergantung PUSAT AWAL ---")
print("  benih   WCSS    ukuran kelompok")
hasil_per_benih = []
for benih in range(6):
    p, g, _ = kmeans(TITIK, 3, seed=benih)
    w = hitung_wcss(p, g)
    hasil_per_benih.append((w, benih, p, g))
    print("  " + str(benih).rjust(5) + format(w, "9.2f") + "    " +
          str(sorted(len(x) for x in g)))

print("")
print("  Data yang SAMA, algoritma yang SAMA, hasil BERBEDA.")
print("  Sebagian benih memecah satu kelompok alami jadi dua,")
print("  lalu menggabungkan dua kelompok lain jadi satu.")

# Praktik baku: jalankan beberapa kali, ambil WCSS TERKECIL
terbaik = min(hasil_per_benih)
w, benih, pusat, kelompok = terbaik
print("")
print("--- ambil yang TERBAIK (WCSS terkecil, benih " +
      str(benih) + ") ---")
for i, (p, g) in enumerate(zip(pusat, kelompok)):
    print("  kelompok " + str(i) + "  pusat (" +
          format(p[0], ".2f") + ", " + format(p[1], ".2f") + ")" +
          "  anggota " + str(len(g)))


# ---------- Metode Elbow: menentukan k ----------
def wcss_terbaik(titik, k, percobaan=10):
    """Jalankan beberapa benih, ambil yang terkecil.
       Tanpa ini, grafik Elbow jadi kacau karena sebagian
       benih terjebak di pengelompokan yang buruk."""
    return min(hitung_wcss(*kmeans(titik, k, seed=s)[:2])
               for s in range(percobaan))

print("")
print("--- metode Elbow: k berapa yang masuk akal? ---")
print("  k    WCSS      penurunan")
sebelum = None
for k in range(1, 6):
    w = wcss_terbaik(TITIK, k)
    turun = "-" if sebelum is None else format(sebelum - w, ".2f")
    tanda = ""
    if sebelum is not None and sebelum - w < 5:
        tanda = "   <- penurunan mulai kecil"
    print("  " + str(k) + format(w, "9.2f") + "  " +
          str(turun).rjust(9) + tanda)
    sebelum = w

print("")
print("  Penurunan besar sampai k=3, lalu mengecil tajam.")
print("  Itulah SIKU-nya: k=3 adalah pilihan yang masuk akal,")
print("  dan memang datanya sengaja dibuat 3 gerombol.")


# ============================================
# 4. Mengukur klasifikasi: akurasi menyesatkan
# ============================================
print("")
print("--- kenapa akurasi saja menyesatkan ---")

def ukur(sebenarnya, tebakan, positif="spam"):
    tp = sum(1 for a, b in zip(sebenarnya, tebakan)
             if a == positif and b == positif)
    fp = sum(1 for a, b in zip(sebenarnya, tebakan)
             if a != positif and b == positif)
    fn = sum(1 for a, b in zip(sebenarnya, tebakan)
             if a == positif and b != positif)
    benar = sum(1 for a, b in zip(sebenarnya, tebakan) if a == b)

    akurasi = benar / len(sebenarnya)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = (2 * precision * recall / (precision + recall)
          if precision + recall else 0.0)
    return akurasi, precision, recall, f1


# 1000 email: 990 ham, 10 spam
sebenarnya = ["ham"] * 990 + ["spam"] * 10

MODEL = [
    ("selalu jawab 'ham'", ["ham"] * 1000),
    ("tangkap 8 spam, 5 salah alarm",
     ["ham"] * 985 + ["spam"] * 5 + ["spam"] * 8 + ["ham"] * 2),
]

print("  model                            akur  prec   rec    F1")
for nama, tebakan in MODEL:
    a, p, r, f = ukur(sebenarnya, tebakan)
    print("  " + nama.ljust(32) +
          format(a, ".2f") + "  " + format(p, ".2f") + "  " +
          format(r, ".2f") + "  " + format(f, ".2f"))

print("")
print("  Model pertama TIDAK MELAKUKAN APA PUN, tapi akurasinya")
print("  99%. Recall-nya 0% membongkarnya: dari 10 spam yang ada,")
print("  tidak satu pun tertangkap.")
print("")
print("  F1 memakai rata-rata HARMONIK, bukan biasa, karena ia")
print("  menghukum ketimpangan: precision 100% dengan recall 0%")
print("  menghasilkan F1 NOL, bukan 50%.")`
  },

  output: `--- NAIVE BAYES: deteksi spam ---
  'gratis hadiah klik'
      -> SPAM   (log spam -8.46, ham -11.63)
  'jadwal rapat kuliah'
      -> HAM   (log spam -11.76, ham -9.14)
  'menang undian besok'
      -> SPAM   (log spam -9.97, ham -10.93)

  Catatan: dipakai LOG peluang, bukan perkalian langsung.
  Mengalikan puluhan peluang kecil membuat hasilnya
  membulat jadi NOL di komputer -- disebut underflow.
  Menjumlahkan log menghindarinya tanpa mengubah urutan.

--- DECISION TREE: memilih fitur pemisah terbaik ---
  entropy awal: 0.9710

  gain(cuaca ) = 0.3219
  gain(suhu  ) = 0.0955
  gain(angin ) = 0.0913

  -> fitur pemisah terbaik: cuaca
     (gain tertinggi = paling banyak mengurangi ketidakteraturan)

--- K-MEANS k=3: hasilnya bergantung PUSAT AWAL ---
  benih   WCSS    ukuran kelompok
      0     3.57    [3, 4, 4]
      1    91.39    [2, 2, 7]
      2    91.15    [1, 3, 7]
      3     3.57    [3, 4, 4]
      4     3.57    [3, 4, 4]
      5    84.94    [1, 3, 7]

  Data yang SAMA, algoritma yang SAMA, hasil BERBEDA.
  Sebagian benih memecah satu kelompok alami jadi dua,
  lalu menggabungkan dua kelompok lain jadi satu.

--- ambil yang TERBAIK (WCSS terkecil, benih 0) ---
  kelompok 0  pusat (8.68, 8.43)  anggota 4
  kelompok 1  pusat (1.50, 8.50)  anggota 3
  kelompok 2  pusat (1.43, 1.57)  anggota 4

--- metode Elbow: k berapa yang masuk akal? ---
  k    WCSS      penurunan
  1   256.76          -
  2    85.79     170.97
  3     3.57      82.22
  4     2.72       0.85   <- penurunan mulai kecil
  5     2.04       0.68   <- penurunan mulai kecil

  Penurunan besar sampai k=3, lalu mengecil tajam.
  Itulah SIKU-nya: k=3 adalah pilihan yang masuk akal,
  dan memang datanya sengaja dibuat 3 gerombol.

--- kenapa akurasi saja menyesatkan ---
  model                            akur  prec   rec    F1
  selalu jawab 'ham'              0.99  0.00  0.00  0.00
  tangkap 8 spam, 5 salah alarm   0.99  0.62  0.80  0.70

  Model pertama TIDAK MELAKUKAN APA PUN, tapi akurasinya
  99%. Recall-nya 0% membongkarnya: dari 10 spam yang ada,
  tidak satu pun tertangkap.

  F1 memakai rata-rata HARMONIK, bukan biasa, karena ia
  menghukum ketimpangan: precision 100% dengan recall 0%
  menghasilkan F1 NOL, bukan 50%.`,

  kesalahanUmum: [
    {
      salah: 'Menilai model klasifikasi hanya dari akurasinya.',
      kenapa: 'Pada data tidak seimbang, model yang selalu menjawab kelas mayoritas bisa mencapai akurasi sangat tinggi tanpa melakukan apa pun. Dengan 990 ham dan 10 spam, menjawab ham untuk semuanya memberi akurasi 99 persen sementara tidak satu pun spam tertangkap.',
      benar: 'Laporkan precision, recall, dan F1 bersama akurasi. Pilih mana yang diutamakan berdasarkan akibat kesalahannya.'
    },
    {
      salah: 'Mengalikan peluang langsung pada Naive Bayes tanpa memakai logaritma.',
      kenapa: 'Mengalikan puluhan peluang yang masing-masing kecil menghasilkan angka yang terlalu kecil untuk diwakili komputer, sehingga membulat menjadi nol. Semua kelas mendapat skor nol dan model tidak bisa memutuskan apa pun. Ini disebut underflow.',
      benar: 'Jumlahkan logaritma peluangnya. Urutan besar-kecilnya tidak berubah, dan angkanya tetap dalam jangkauan yang aman.'
    },
    {
      salah: 'Melupakan Laplace smoothing pada Naive Bayes.',
      kenapa: 'Satu kata yang tidak pernah muncul di data latih untuk suatu kelas membuat peluangnya nol, dan karena rumusnya perkalian, seluruh hasilnya menjadi nol berapa pun bukti lainnya. Satu kata asing bisa membatalkan puluhan kata yang jelas menunjukkan kelasnya.',
      benar: 'Tambahkan satu ke setiap hitungan dan sesuaikan penyebutnya. Tidak ada peluang yang benar-benar nol lagi.'
    },
    {
      salah: 'Menjalankan K-Means tanpa menormalisasi data lebih dulu.',
      kenapa: 'K-Means menghitung jarak, sehingga kolom berskala besar mendominasi dan kolom berskala kecil praktis tidak berpengaruh. Kelompok yang terbentuk sebenarnya cuma mencerminkan satu kolom, meski kamu memberinya lima kolom.',
      benar: 'Normalisasi seluruh kolom numerik sebelum menjalankan K-Means, sesuai yang dibahas di topik pre-processing.'
    },
    {
      salah: 'Menganggap hasil K-Means selalu sama setiap kali dijalankan.',
      kenapa: 'Pusat awal dipilih acak, sehingga hasil akhirnya bisa berbeda antar-jalan dan kadang terjebak di pengelompokan yang buruk. Laporan yang dibuat dari satu kali jalan bisa tidak bisa diulang oleh orang lain.',
      benar: 'Jalankan beberapa kali dengan benih berbeda lalu pilih yang WCSS-nya terkecil, atau pakai K-Means++ untuk pemilihan pusat awal yang lebih baik.'
    },
    {
      salah: 'Membiarkan Decision Tree tumbuh penuh tanpa pembatasan.',
      kenapa: 'Pohon akan terus memecah sampai setiap daun berisi satu data, sehingga ia menghafal data latih termasuk deraunya. Akurasi pada data latih mendekati sempurna, tetapi pada data baru jauh lebih buruk. Inilah overfitting.',
      benar: 'Batasi kedalaman pohon atau jumlah minimum data per daun, dan lakukan pruning. Nilai selalu dengan data uji yang terpisah.'
    }
  ],

  analogi: `Bayangkan dua tugas berbeda di sebuah perpustakaan.

**Klasifikasi** adalah: *"ini seribu buku yang sudah diberi label genre. Pelajari polanya, lalu beri label pada buku baru."* Kamu punya **jawaban** untuk belajar.

**Clustering** adalah: *"ini seribu buku tanpa label apa pun. Kelompokkan yang mirip."* Tidak ada jawaban benar — dan dua orang bisa mengelompokkannya secara berbeda, keduanya masuk akal.

**Naive Bayes** adalah petugas yang menebak genre dari **kata-kata di judulnya**. Ia menghitung: *"kata 'pembunuhan' muncul di 80% buku misteri, tapi cuma 2% buku masak"*.

Kata **"naive"** berarti ia menganggap **setiap kata berdiri sendiri** — seolah kemunculan kata "pembunuhan" sama sekali tidak berhubungan dengan kata "detektif". Jelas salah. Tetapi anehnya, tebakannya tetap sering benar.

**Decision Tree** adalah petugas yang menyusun **pohon pertanyaan**: *"tebal atau tipis? Kalau tebal, ada gambar atau tidak?"* Ia memilih pertanyaan yang **paling banyak memisahkan** buku di tiap langkah.

Keunggulannya: kamu bisa **membaca alasannya**. Bandingkan dengan jaringan syaraf yang jawabannya cuma sederet angka.

Dan kelemahannya: kalau dibiarkan, ia akan terus bertanya sampai **setiap buku punya jalur pertanyaannya sendiri** — hafal seluruh rak, tetapi tidak belajar apa pun yang bisa dipakai untuk buku baru.

**K-Means** adalah: *"tebar tiga keranjang di ruangan, masukkan tiap buku ke keranjang terdekat, lalu geser keranjangnya ke tengah isinya. Ulangi."*

Dan tiga hal yang perlu disadari:

- **Angka tiga itu kamu yang tentukan.** Keranjangnya tidak akan protes kalau seharusnya lima.
- **Di mana keranjang ditaruh pertama kali menentukan hasilnya.** Tebar ulang, kelompoknya bisa berbeda.
- Kalau **satu ukuran dinilai dalam sentimeter dan yang lain dalam kilometer**, maka posisi keranjang praktis cuma ditentukan yang kilometer.

Terakhir, **akurasi yang menipu**: dokter yang mendiagnosis *"kamu sehat"* kepada **setiap** pasien akan benar 99% dari waktu — karena kebanyakan orang memang sehat.

Dan ia **tidak pernah menyelamatkan satu nyawa pun.**`,

  latihan: [
    'Jelaskan perbedaan klasifikasi dan clustering dari segi ketersediaan label, dan jelaskan akibatnya pada cara menilai hasilnya.',
    'Jelaskan apa yang dimaksud naive pada Naive Bayes, kenapa asumsinya hampir selalu salah, dan kenapa ia tetap bekerja baik untuk teks.',
    'Hitung entropy untuk himpunan label yang berisi 6 ya dan 4 tidak. Lalu hitung information gain kalau dipisah menjadi dua bagian: 4 ya 0 tidak, dan 2 ya 4 tidak.',
    'Jelaskan tiga hal yang harus disadari saat memakai K-Means, dan bagaimana metode Elbow membantu salah satunya.',
    'Untuk 1000 email dengan 20 spam, sebuah model menebak 15 email sebagai spam dan 12 di antaranya benar. Hitung akurasi, precision, recall, dan F1.',
    'Tentukan mana yang lebih penting, precision atau recall, untuk: deteksi kanker, filter spam, dan rekomendasi film. Jelaskan alasannya masing-masing.'
  ]
});
