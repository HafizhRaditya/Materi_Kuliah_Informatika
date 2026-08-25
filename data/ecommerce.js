/* ============================================================
   ecommerce.js — materi E-Commerce (Semester 2)

   Materi kuliahnya tidak tersimpan; yang ada di
   "Semester Dua/E - Commerce" hanya tugas dan proyek sendiri:
     - Riset Pasar: layanan langganan Spotify di Indonesia
     - Tugas Lynk.Id
     - Proposal Bisnis "Optimax Digital Services" (jasa
       pemasaran digital untuk UMKM)

   Kedua tugas itu dipakai sebagai bahan contoh: model
   freemium dan riset pasar dari yang pertama, corong konversi
   dan hitungan CAC/LTV dari yang kedua. Sisanya disusun dari
   pengetahuan umum, dipilih yang bisa dihitung dan diperiksa.
   ============================================================ */

TOPICS.push({
  id: 'ecom-model-bisnis',
  judul: 'Model Bisnis E-Commerce',
  kategori: 'ecommerce',
  tag: ['B2B', 'B2C', 'C2C', 'B2G', 'marketplace', 'freemium', 'efek jaringan', 'ekor panjang'],
  ringkas: 'Komisi 8 persen dari Rp 100.000 cuma Rp 8.000 — dan itu hampir selalu lebih murah daripada iklan.',

  fungsi: `**Menentukan dari mana uangnya datang, sebelum membangun apa pun.**

Terpakai di:

- **Rencana bisnis** dan proposal — bab model pendapatan
- **Memutuskan** berjualan di lapak orang atau membuat toko sendiri
- **Menilai gagasan** usaha daring sebelum mengerjakannya
- **Tugas riset pasar** — memahami kenapa pemain besar sulit dikejar

Yang paling sering salah dihitung: **pindah dari marketplace demi menghemat komisi.**

Komisi 8 persen dari Rp 100.000 cuma Rp 8.000 — dan mendapat satu pelanggan **baru** lewat iklan hampir selalu lebih mahal dari itu. Toko sendiri baru menang pada pelanggan yang **beli ulang**.

Dan kaidah yang menjelaskan kenapa pemain besar sulit dikejar: **jumlah pasangan yang mungkin tumbuh seperti kuadrat.** Lapak dua kali lebih besar bernilai empat kali — bukan karena kodenya lebih baik.`,

  praktik: {
    tujuan: 'Kamu bisa memilih model pendapatan dan kanal penjualan berdasarkan hitungan, bukan dugaan.',
    alat: [
      'Spreadsheet atau Python',
      'Data harga dan komisi nyata dari satu lapak'
    ],
    langkah: [
      { judul: 'Tetapkan pola transaksimu',
        isi: `B2C, B2B, C2C, atau B2G?

Jawaban ini menentukan rancangan sistemnya. B2B butuh penawaran, persetujuan berlapis, harga per pelanggan, dan tempo pembayaran — tidak satu pun ada di alur belanja ala B2C.` },
      { judul: 'Hitung marjin per pesanan di kedua kanal',
        isi: `Ambil satu produk nyata. Untuk marketplace: harga dikurangi HPP dikurangi komisi.

Untuk toko sendiri: harga dikurangi HPP dikurangi komisi pembayaran dikurangi **biaya iklan per pesanan**.

Yang terakhir yang paling sering dilupakan, dan biasanya yang terbesar.` },
      { judul: 'Cari titik impasnya',
        isi: `Kalau marjin toko sendiri **lebih besar**, hitung berapa pesanan per bulan untuk menutup biaya tetapnya.

Kalau **lebih kecil**, hitungannya selesai: biaya tetapnya tidak akan pernah tertutup, berapa pun pesanannya.` },
      { judul: 'Pisahkan pelanggan baru dan pelanggan lama',
        isi: `Hitung ulang dengan biaya iklan yang **dibagi** ke jumlah pembelian ulang.

Di situlah toko sendiri biasanya mulai menang — dan itu menjelaskan kenapa banyak penjual memakai kedua kanal sekaligus.` },
      { judul: 'Hitung konversi impas kalau memakai freemium',
        isi: `Perkirakan biaya per pengguna gratis dan marjin per pengguna berbayar, lalu cari konversi yang membuat labanya nol.

Bandingkan dengan konversi nyatamu. Di bawah angka itu, menambah pengguna gratis **menambah kerugian**.` },
      { judul: 'Uji apakah usahamu punya efek jaringan',
        isi: `Tanyakan satu hal: **apakah produkmu jadi lebih berguna bagi satu pengguna ketika pengguna lain bertambah?**

Kalau ya, kamu menghadapi masalah ayam dan telur — dan strategimu harus mulai dari **satu sisi** atau **ceruk sempit**, bukan keduanya sekaligus.` },
      { judul: 'Periksa apakah ada ekor panjang yang bisa diambil',
        isi: `Daftar barang yang **tidak mungkin dipajang** pesaing fisik karena terlalu jarang laku.

Kalau ada, itu keunggulanmu — bukan harga murah, yang hampir selalu bisa ditiru.` },
      { judul: 'Tentukan siapa memegang hubungan pelanggan',
        isi: `Untuk rantaimu, tanyakan: setelah transaksi selesai, **siapa yang tahu nomor pelanggannya?**

Kalau jawabannya lapak, kamu memanfaatkan jaringannya tanpa memilikinya — dan itu keputusan yang harus diambil sadar, bukan kebetulan.` }
    ],
    cek: [
      'Kamu punya angka marjin per pesanan untuk kedua kanal, bukan perkiraan',
      'Kamu tahu konversi impas freemium-mu bila memakai model itu',
      'Kamu tahu siapa yang memegang hubungan dengan pelangganmu'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa lapak besar makin besar',

  konsep: `
E-commerce adalah **transaksi bisnis yang dilakukan secara elektronik**. Definisinya sederhana; yang tidak sederhana adalah **dari mana uangnya datang**, dan itulah yang dibahas di sini.

**Empat pola transaksi**

| Pola | Arah | Contoh |
|---|---|---|
| **B2C** | perusahaan → konsumen | toko daring, langganan |
| **B2B** | perusahaan → perusahaan | pemasok bahan, layanan awan |
| **C2C** | konsumen → konsumen | lapak barang bekas, lelang |
| **B2G** | perusahaan → pemerintah | pengadaan, e-katalog |

Yang membedakannya **bukan teknologinya**. B2B nilainya besar per transaksi tetapi jarang dan lama diputuskan — sering butuh penawaran, negosiasi, dan tempo pembayaran. B2C kecil per transaksi tetapi banyak dan cepat.

Rancangan sistemnya ikut berbeda karenanya: B2B butuh alur persetujuan dan harga per pelanggan; B2C butuh kecepatan dan pembayaran seketika.

**Empat penentu perkembangannya**

- **akses internet** — tanpa ini tidak ada pasarnya
- **kepercayaan pengguna** — mau menyerahkan uang dan data
- **sistem pembayaran** — makin mudah, makin sedikit yang batal
- **keamanan** — satu kebocoran menghapus kepercayaan

Perhatikan bahwa **tiga dari empat bukan soal teknologi web**. Itu sebabnya e-commerce tumbuh sangat berbeda di tiap negara meski teknologinya sama persis.

**Lapak orang lain atau toko sendiri**

Ini keputusan pertama yang harus diambil penjual, dan hitungannya sering mengejutkan.

Marketplace memungut komisi. Toko sendiri komisinya lebih kecil, tetapi kamu harus **membeli trafiknya sendiri** lewat iklan, plus biaya tetap.

Kaidah yang menentukan: **komisi marketplace adalah harga trafik.**

Untuk barang Rp 100.000, komisi 8 persen cuma **Rp 8.000**. Mendapat satu pelanggan **baru** lewat iklan hampir selalu lebih mahal dari itu. Jadi untuk pembeli pertama, marketplace hampir selalu menang.

Toko sendiri baru menang pada pelanggan yang **beli ulang** — biaya mendapatkannya dibagi ke banyak pesanan, sehingga iklan per pesanan jatuh jauh.

Itu sebabnya banyak penjual memakai **keduanya**: marketplace untuk berkenalan, toko sendiri untuk pelanggan yang sudah kembali.

**Model pendapatan**

- **jual barang** — marjin per unit
- **komisi** — potongan dari transaksi orang lain
- **langganan** — pendapatan berulang, paling stabil
- **iklan** — pengguna gratis dibayar oleh pemasang iklan
- **freemium** — gratis dengan batas, berbayar untuk lebih

**Freemium: siapa membiayai siapa**

Ini model yang paling sering disalahpahami. Pengguna gratis **bukan gratis bagi penyedianya** — mereka tetap memakan peladen, dukungan, dan hak cipta konten.

Yang membiayai mereka adalah pengguna berbayar. Karena itu ada **konversi impas**: di bawah angka itu, menambah pengguna gratis justru **menambah kerugian**.

Freemium bukan *"gratis dulu, untung nanti"*. Ia **taruhan** bahwa cukup banyak yang akan membayar.

**Efek jaringan**

Pada lapak dua sisi, nilai bagi pembeli tumbuh mengikuti jumlah penjual, dan sebaliknya. Jumlah pasangan yang mungkin tumbuh seperti **kuadrat**.

Akibatnya: lapak yang dua kali lebih besar bernilai kira-kira **empat kali**. Pasar seperti ini cenderung dimenangkan satu atau dua pemain saja.

Dan dari situ muncul masalah **ayam dan telur**: pendatang baru tidak punya penjual karena tidak punya pembeli, dan sebaliknya. Jalan keluarnya hampir selalu **mulai dari satu sisi dulu**, atau mulai dari satu ceruk yang sangat sempit.

**Ekor panjang**

Toko fisik dibatasi rak. Toko daring tidak.

Barang yang masing-masing hanya laku beberapa kali setahun, **kalau digabungkan**, bisa menyumbang bagian besar pendapatan — bagian yang mustahil diraih toko fisik.

Ini keunggulan e-commerce yang paling sering salah disebut. Keunggulannya **bukan harga murah**, melainkan **barang yang tidak mungkin dipajang** toko fisik.

**Rantai nilai berubah**

E-commerce memungkinkan **memotong perantara**: produsen langsung ke konsumen. Tetapi perantara tidak sekadar hilang — sering ia **digantikan** oleh perantara jenis baru, yaitu lapak dan penyedia logistik.

Yang berubah bukan jumlah lapisannya, melainkan **siapa yang memegang hubungan dengan pelanggan** — dan itu yang menentukan siapa mengambil bagian terbesar.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# EFEK JARINGAN: NILAI TUMBUH SEPERTI KUADRAT\n#\n#   penjual  pembeli   pasangan mungkin\n#        10      100              1.000\n#       100     1000            100.000\n#      1000    10000         10.000.000\n#     10000   100000      1.000.000.000\n#\n# Lapak 10x lebih besar -> 100x lebih banyak pasangan.\n#\n# Akibatnya: pemain terbesar makin sulit dikejar,\n# bukan karena teknologinya lebih baik, melainkan\n# karena PENGGUNANYA LEBIH BANYAK.\n#\n# Pendatang baru harus mulai dari SATU SISI dulu.',
      penjelasan: `
Kenapa lapak daring cenderung dimenangkan satu atau dua pemain, sementara toko kelontong bisa hidup ribuan di kota yang sama? Jawabannya ada pada satu perbedaan yang bisa dihitung.

Toko kelontong bersaing pada **jarak dan harga**. Toko yang dekat rumahmu berguna bagimu terlepas dari berapa banyak orang lain yang berbelanja di sana. Nilainya **tidak bergantung** pada jumlah penggunanya.

Lapak daring berbeda. Nilainya bagi kamu **justru ditentukan** oleh berapa banyak orang lain yang ada di sana.

Sebagai pembeli, kamu ingin banyak penjual — supaya ada pilihan dan harganya bersaing. Sebagai penjual, kamu ingin banyak pembeli — supaya daganganmu laku.

Sekarang hitung. Kalau ada \`p\` penjual dan \`b\` pembeli, jumlah pasangan yang mungkin bertemu adalah \`p x b\`. Kalau keduanya tumbuh bersama, jumlah pasangan tumbuh seperti **kuadrat**.

Lapak yang sepuluh kali lebih besar bukan sepuluh kali lebih berguna — ia **seratus kali**.

Dan dari situ semuanya mengikuti.

**Pertama, yang menang makin sulit dikejar.** Bukan karena teknologinya lebih baik — kode lapak besar dan kecil hampir sama. Melainkan karena penggunanya lebih banyak, dan pengguna itu sendiri yang menjadi nilainya.

Pendatang baru dengan aplikasi **lebih bagus** tetap kalah, karena yang dijual bukan aplikasinya.

**Kedua, masalah ayam dan telur.** Lapak baru tidak punya pembeli karena tidak punya penjual, dan tidak punya penjual karena tidak punya pembeli. Kedua sisi saling menunggu, dan tidak ada yang bergerak.

Ada beberapa jalan keluar yang benar-benar dipakai, dan semuanya berbentuk **melanggar simetri**.

Yang pertama: **mulai dari satu sisi dan subsidi sisi itu**. Bayar penjual untuk hadir sebelum ada pembeli, atau gratiskan pembeli sampai penjualnya datang sendiri.

Yang kedua: **mulai dari ceruk yang sangat sempit**. Satu kampus, satu kota, satu jenis barang. Di ceruk sekecil itu, seratus penjual sudah terasa lengkap — sementara di pasar nasional, seratus penjual terasa kosong.

Yang ketiga: **berguna sejak satu pengguna**. Buat alatnya bermanfaat bahkan tanpa sisi lain — misalnya alat pencatat stok yang berguna sendiri, lalu perlahan menghubungkan penggunanya satu sama lain.

**Ketiga, dan ini yang penting bagi penjual**: kalau kamu berjualan di lapak besar, kamu memanfaatkan efek jaringannya — dan sekaligus **tidak memilikinya**.

Hubungan dengan pelanggan dipegang lapaknya, bukan olehmu. Pelanggan mengingat nama lapaknya, bukan namamu. Kalau komisinya dinaikkan, kamu tidak punya banyak pilihan.

Itulah alasan sesungguhnya penjual membangun toko sendiri, dan alasannya **bukan menghemat komisi** — hitungannya sering justru merugi. Alasannya **memiliki hubungan dengan pelanggan**, supaya ada pilihan di kemudian hari.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Model bisnis e-commerce: hitungannya
# ============================================
import math

# --------------------------------------------
# 1. Empat pola transaksi
# --------------------------------------------
print("--- empat pola transaksi elektronik ---")
POLA = [
    ("B2C", "perusahaan -> konsumen", "toko daring, langganan"),
    ("B2B", "perusahaan -> perusahaan", "pemasok bahan, layanan awan"),
    ("C2C", "konsumen -> konsumen", "lapak bekas, lelang"),
    ("B2G", "perusahaan -> pemerintah", "pengadaan, e-katalog"),
]
print("  " + "pola".ljust(6) + "arah".ljust(28) + "contoh")
for a, b, c in POLA:
    print("  " + a.ljust(6) + b.ljust(28) + c)
print("")
print("  Yang membedakannya bukan teknologinya. B2B nilainya")
print("  besar per transaksi tapi jarang dan lama diputuskan;")
print("  B2C kecil per transaksi tapi banyak dan cepat.")
print("  Rancangan sistemnya ikut berbeda karenanya.")

# --------------------------------------------
# 2. Lapak orang lain vs toko sendiri
# --------------------------------------------
print("")
print("--- jual di marketplace atau toko sendiri? ---")
harga = 100_000
hpp = 60_000
KANAL = [
    ("Marketplace",      0.08,         0,      0),
    ("Toko, iklan mahal",0.03, 1_500_000, 25_000),
    ("Toko, beli ulang",  0.03, 1_500_000,  3_000),
]
print("  harga jual Rp " + f"{harga:,}".replace(",", ".")
      + ", HPP Rp " + f"{hpp:,}".replace(",", "."))
print("")
print("  " + "kanal".ljust(20) + "komisi".rjust(8) + "tetap/bln".rjust(12)
      + "iklan/order".rjust(13) + "marjin/order".rjust(14))
for nama, komisi, tetap, iklan in KANAL:
    marjin = harga - hpp - harga * komisi - iklan
    print("  " + nama.ljust(20) + ("%.0f%%" % (komisi * 100)).rjust(8)
          + f"{tetap:>12,}".replace(",", ".")
          + f"{iklan:>13,}".replace(",", ".")
          + f"{int(marjin):>14,}".replace(",", "."))

m_mp = harga - hpp - harga * 0.08
print("")
print("  Titik impas terhadap marketplace:")
for nama, komisi, tetap, iklan in KANAL[1:]:
    m = harga - hpp - harga * komisi - iklan
    if m > m_mp:
        n = math.ceil(tetap / (m - m_mp))
        print("    " + nama + " : butuh " + str(n)
              + " order/bulan untuk menyamai")
    else:
        print("    " + nama + " : marjinnya LEBIH KECIL ("
              + f"{int(m):,}".replace(",", ".") + " vs "
              + f"{int(m_mp):,}".replace(",", ".") + "),")
        print("      biaya tetapnya tidak akan pernah tertutup,")
        print("      berapa pun ordernya.")
print("")
print("  Komisi 8% dari Rp 100.000 cuma Rp 8.000. Mendapat")
print("  satu pelanggan baru lewat iklan hampir selalu lebih")
print("  mahal dari itu -- jadi untuk pembeli PERTAMA,")
print("  marketplace hampir selalu menang.")
print("")
print("  Toko sendiri baru menang pada pelanggan yang")
print("  BELI ULANG: biaya mendapatkannya dibagi ke banyak")
print("  pesanan, sehingga iklan per order jatuh jauh.")
print("  Itu sebabnya banyak penjual memakai keduanya:")
print("  marketplace untuk berkenalan, toko sendiri untuk")
print("  pelanggan yang sudah kembali.")

# --------------------------------------------
# 3. Freemium: siapa membiayai siapa
# --------------------------------------------
print("")
print("--- freemium: pengguna gratis dibiayai yang berbayar ---")
pengguna = 100_000
biaya_gratis = 500          # rupiah/bulan/pengguna gratis
harga_premium = 54_990      # rupiah/bulan
biaya_premium = 15_000      # royalti + peladen
print("  " + "konversi".rjust(9) + "berbayar".rjust(10)
      + "pendapatan".rjust(14) + "biaya".rjust(14) + "laba".rjust(14))
for k in (0.005, 0.01, 0.02, 0.05, 0.10):
    bayar = int(pengguna * k)
    gratis = pengguna - bayar
    pendapatan = bayar * harga_premium
    biaya = bayar * biaya_premium + gratis * biaya_gratis
    laba = pendapatan - biaya
    print("  " + ("%.1f%%" % (k * 100)).rjust(9) + str(bayar).rjust(10)
          + f"{pendapatan:>14,}".replace(",", ".")
          + f"{biaya:>14,}".replace(",", ".")
          + f"{laba:>14,}".replace(",", "."))
print("")
impas = biaya_gratis * pengguna / (harga_premium - biaya_premium + biaya_gratis)
print("  Konversi impas: " + ("%.2f%%" % (impas / pengguna * 100)))
print("  Di bawah itu, menambah pengguna gratis MENAMBAH")
print("  kerugian. Freemium bukan 'gratis lalu untung' --")
print("  ia taruhan bahwa cukup banyak yang akan membayar.")

# --------------------------------------------
# 4. Efek jaringan
# --------------------------------------------
print("")
print("--- kenapa lapak besar makin besar ---")
print("  Nilai bagi PEMBELI  ~ jumlah penjual")
print("  Nilai bagi PENJUAL  ~ jumlah pembeli")
print("")
print("  " + "penjual".rjust(9) + "pembeli".rjust(9)
      + "pasangan mungkin".rjust(19))
for n in (10, 100, 1000, 10000):
    print("  " + str(n).rjust(9) + str(n * 10).rjust(9)
          + f"{n * n * 10:>19,}".replace(",", "."))
print("")
print("  Pasangan yang mungkin tumbuh seperti KUADRAT, jadi")
print("  lapak yang dua kali lebih besar bernilai empat kali.")
print("  Ini sebab pasar seperti ini cenderung dimenangkan")
print("  satu atau dua pemain -- dan sebab pendatang baru")
print("  harus mulai dari satu sisi dulu, bukan keduanya.")

# --------------------------------------------
# 5. Ekor panjang
# --------------------------------------------
print("")
print("--- ekor panjang: barang yang jarang laku ---")
JUDUL = 100_000
def zipf(n, s=1.0):
    return [1.0 / (i ** s) for i in range(1, n + 1)]
bobot = zipf(JUDUL)
total = sum(bobot)
print("  " + "batas rak".rjust(11) + "judul".rjust(9)
      + "bagian pendapatan".rjust(20))
for batas in (100, 1000, 10000, 100000):
    bagian = sum(bobot[:batas]) / total
    print("  " + ("top " + str(batas)).rjust(11) + str(batas).rjust(9)
          + ("%.1f%%" % (bagian * 100)).rjust(20))
print("")
ekor = 1 - sum(bobot[:1000]) / total
print("  Toko fisik cuma muat sekitar 1000 judul, jadi ia")
print("  kehilangan " + ("%.0f%%" % (ekor * 100)) + " pendapatan yang ada di ekornya.")
print("  Toko daring tidak punya batas rak, dan di situlah")
print("  keunggulannya -- bukan pada harga, melainkan pada")
print("  BARANG YANG TIDAK MUNGKIN DIPAJANG toko fisik.")
print("")
print("  Angka Zipf ini model, bukan data nyata. Yang nyata")
print("  bentuknya: sedikit judul menguasai banyak penjualan,")
print("  dan ekornya panjang sekali.")

# --------------------------------------------
# 6. Empat penentu perkembangan e-commerce
# --------------------------------------------
print("")
print("--- empat penentu perkembangan e-commerce ---")
PENENTU = [
    ("Akses internet",     "tanpa ini tidak ada pasarnya"),
    ("Kepercayaan pengguna", "mau menyerahkan uang dan data"),
    ("Sistem pembayaran",  "makin mudah, makin sedikit yang batal"),
    ("Keamanan",           "satu kebocoran menghapus kepercayaan"),
]
for a, b in PENENTU:
    print("  " + a.ljust(22) + b)
print("")
print("  Perhatikan tiga dari empat BUKAN soal teknologi web.")
print("  Itu sebabnya e-commerce tumbuh berbeda-beda di tiap")
print("  negara meski teknologinya sama persis.")` },
  output: `--- empat pola transaksi elektronik ---
  pola  arah                        contoh
  B2C   perusahaan -> konsumen      toko daring, langganan
  B2B   perusahaan -> perusahaan    pemasok bahan, layanan awan
  C2C   konsumen -> konsumen        lapak bekas, lelang
  B2G   perusahaan -> pemerintah    pengadaan, e-katalog

  Yang membedakannya bukan teknologinya. B2B nilainya
  besar per transaksi tapi jarang dan lama diputuskan;
  B2C kecil per transaksi tapi banyak dan cepat.
  Rancangan sistemnya ikut berbeda karenanya.

--- jual di marketplace atau toko sendiri? ---
  harga jual Rp 100.000, HPP Rp 60.000

  kanal                 komisi   tetap/bln  iklan/order  marjin/order
  Marketplace               8%           0            0        32.000
  Toko, iklan mahal         3%   1.500.000       25.000        12.000
  Toko, beli ulang          3%   1.500.000        3.000        34.000

  Titik impas terhadap marketplace:
    Toko, iklan mahal : marjinnya LEBIH KECIL (12.000 vs 32.000),
      biaya tetapnya tidak akan pernah tertutup,
      berapa pun ordernya.
    Toko, beli ulang : butuh 750 order/bulan untuk menyamai

  Komisi 8% dari Rp 100.000 cuma Rp 8.000. Mendapat
  satu pelanggan baru lewat iklan hampir selalu lebih
  mahal dari itu -- jadi untuk pembeli PERTAMA,
  marketplace hampir selalu menang.

  Toko sendiri baru menang pada pelanggan yang
  BELI ULANG: biaya mendapatkannya dibagi ke banyak
  pesanan, sehingga iklan per order jatuh jauh.
  Itu sebabnya banyak penjual memakai keduanya:
  marketplace untuk berkenalan, toko sendiri untuk
  pelanggan yang sudah kembali.

--- freemium: pengguna gratis dibiayai yang berbayar ---
   konversi  berbayar    pendapatan         biaya          laba
       0.5%       500    27.495.000    57.250.000   -29.755.000
       1.0%      1000    54.990.000    64.500.000    -9.510.000
       2.0%      2000   109.980.000    79.000.000    30.980.000
       5.0%      5000   274.950.000   122.500.000   152.450.000
      10.0%     10000   549.900.000   195.000.000   354.900.000

  Konversi impas: 1.23%
  Di bawah itu, menambah pengguna gratis MENAMBAH
  kerugian. Freemium bukan 'gratis lalu untung' --
  ia taruhan bahwa cukup banyak yang akan membayar.

--- kenapa lapak besar makin besar ---
  Nilai bagi PEMBELI  ~ jumlah penjual
  Nilai bagi PENJUAL  ~ jumlah pembeli

    penjual  pembeli   pasangan mungkin
         10      100              1.000
        100     1000            100.000
       1000    10000         10.000.000
      10000   100000      1.000.000.000

  Pasangan yang mungkin tumbuh seperti KUADRAT, jadi
  lapak yang dua kali lebih besar bernilai empat kali.
  Ini sebab pasar seperti ini cenderung dimenangkan
  satu atau dua pemain -- dan sebab pendatang baru
  harus mulai dari satu sisi dulu, bukan keduanya.

--- ekor panjang: barang yang jarang laku ---
    batas rak    judul   bagian pendapatan
      top 100      100               42.9%
     top 1000     1000               61.9%
    top 10000    10000               81.0%
   top 100000   100000              100.0%

  Toko fisik cuma muat sekitar 1000 judul, jadi ia
  kehilangan 38% pendapatan yang ada di ekornya.
  Toko daring tidak punya batas rak, dan di situlah
  keunggulannya -- bukan pada harga, melainkan pada
  BARANG YANG TIDAK MUNGKIN DIPAJANG toko fisik.

  Angka Zipf ini model, bukan data nyata. Yang nyata
  bentuknya: sedikit judul menguasai banyak penjualan,
  dan ekornya panjang sekali.

--- empat penentu perkembangan e-commerce ---
  Akses internet        tanpa ini tidak ada pasarnya
  Kepercayaan pengguna  mau menyerahkan uang dan data
  Sistem pembayaran     makin mudah, makin sedikit yang batal
  Keamanan              satu kebocoran menghapus kepercayaan

  Perhatikan tiga dari empat BUKAN soal teknologi web.
  Itu sebabnya e-commerce tumbuh berbeda-beda di tiap
  negara meski teknologinya sama persis.`,

  kesalahanUmum: [
    {
      salah: 'Pindah dari marketplace ke toko sendiri untuk menghemat komisi.',
      kenapa: 'Komisi adalah harga trafik, dan untuk barang seharga ratusan ribu komisinya cuma beberapa ribu rupiah. Mendapat satu pelanggan baru lewat iklan hampir selalu lebih mahal dari itu, sehingga marjin per pesanan justru turun setelah pindah.',
      benar: 'Pakai marketplace untuk pelanggan baru dan toko sendiri untuk pelanggan yang beli ulang, lalu bandingkan marjin per pesanan pada keduanya.'
    },
    {
      salah: 'Menganggap pengguna gratis pada model freemium tidak menimbulkan biaya.',
      kenapa: 'Pengguna gratis tetap memakan peladen, lebar pita, dukungan, dan sering juga royalti konten. Di bawah konversi impas, menambah pengguna gratis menambah kerugian alih-alih membangun pasar.',
      benar: 'Hitung konversi impasnya lebih dulu, lalu pantau konversi nyatamu terhadap angka itu sebelum menambah pengguna gratis.'
    },
    {
      salah: 'Membangun lapak dua sisi dengan menggarap kedua sisinya sekaligus dari awal.',
      kenapa: 'Nilai tiap sisi bergantung pada besarnya sisi lain, sehingga keduanya saling menunggu dan tidak ada yang bergerak. Anggaran habis untuk menarik dua kelompok yang masing-masing melihat lapak yang masih kosong.',
      benar: 'Mulai dari satu sisi lalu subsidi sisi itu, atau mulai dari ceruk sempit yang cukup dianggap lengkap dengan sedikit peserta.'
    },
    {
      salah: 'Menyebut harga murah sebagai keunggulan utama e-commerce.',
      kenapa: 'Toko daring juga menanggung biaya logistik, pengembalian, dan iklan yang sering tidak lebih murah daripada sewa toko. Keunggulan yang benar-benar tidak bisa ditandingi adalah ketiadaan batas rak, sehingga barang yang jarang laku pun bisa dijual.',
      benar: 'Bangun keunggulan pada kelengkapan dan penemuan barang, dan bandingkan biaya totalmu dengan toko fisik secara jujur.'
    },
    {
      salah: 'Mengira memotong perantara selalu membuat rantainya lebih pendek.',
      kenapa: 'Perantara lama sering digantikan perantara baru berupa lapak dan penyedia logistik, sehingga jumlah lapisannya tidak berkurang. Yang berubah adalah siapa yang memegang hubungan dengan pelanggan, dan pihak itulah yang mengambil bagian terbesar.',
      benar: 'Petakan siapa yang memegang hubungan dengan pelanggan di rantaimu, dan putuskan secara sadar apakah kamu bersedia menyerahkannya.'
    },
    {
      salah: 'Merancang sistem B2B dengan pola yang sama seperti B2C.',
      kenapa: 'Transaksi B2B nilainya besar, jarang, dan melewati persetujuan berlapis dengan harga yang berbeda tiap pelanggan serta tempo pembayaran. Alur belanja seketika ala B2C tidak menyediakan satu pun dari kebutuhan itu.',
      benar: 'Sediakan penawaran, alur persetujuan, harga per pelanggan, dan tempo pembayaran untuk sistem B2B.'
    }
  ],

  analogi: `Bayangkan **dua pasar di kota yang sama**.

Yang pertama **pasar tradisional**. Kamu datang karena dekat rumah. Ada seratus pedagang atau seribu, bagimu tidak terlalu berbeda — kamu cuma butuh sayur, dan tiga pedagang sudah cukup.

Yang kedua **pasar barang langka** — pengumpul perangko, komik lama, suku cadang motor tua.

Di pasar kedua, jumlah pedagang **menentukan segalanya**. Kalau cuma ada tiga pedagang, kemungkinan barang yang kamu cari ada di sana kecil sekali. Kalau ada tiga ratus, hampir pasti ketemu.

Dan pedagangnya berpikir sama: mereka datang ke pasar yang **pembelinya paling banyak**, karena barang langka butuh pembeli langka.

Sekarang bayangkan seseorang membuka **pasar barang langka baru** di seberang jalan. Tempatnya lebih bagus, parkirnya lebih luas, atapnya tidak bocor.

Pasar itu akan **kosong**. Bukan karena tempatnya jelek — tempatnya jelas lebih baik. Melainkan karena pembeli tidak datang ke tempat yang bagus; mereka datang ke tempat **yang ada barangnya**. Dan pedagang tidak datang ke tempat yang sepi.

Bagaimana pasar baru itu bisa hidup?

Ia harus **melanggar kesetimbangan itu**. Gratiskan lapak setahun supaya pedagang mau pindah. Atau mulai dari satu jenis barang saja — cuma perangko — sampai bagian itu terasa **lengkap**, lalu melebar.

Dan satu hal terakhir yang sering dilupakan pedagang: **pembeli mengingat nama pasarnya, bukan nama pedagangnya.**

Itulah yang sebenarnya dibayar dengan sewa lapak.`,

  latihan: [
    'Sebutkan empat pola transaksi elektronik beserta contohnya, dan jelaskan bagaimana rancangan sistemnya berbeda.',
    'Hitung marjin per pesanan untuk berjualan di marketplace dan di toko sendiri, dengan angka nyata dari satu produk.',
    'Jelaskan kenapa komisi marketplace sebaiknya dibaca sebagai harga trafik, dan kapan toko sendiri baru menang.',
    'Hitung konversi impas untuk model freemium dengan angka biaya dan harga yang kamu tentukan.',
    'Jelaskan kenapa menambah pengguna gratis bisa menambah kerugian, dan kapan justru menguntungkan.',
    'Hitung jumlah pasangan yang mungkin pada lapak dua sisi untuk empat ukuran berbeda, dan jelaskan akibatnya.',
    'Sebutkan tiga cara mengatasi masalah ayam dan telur pada lapak baru, beserta contoh nyatanya.',
    'Hitung berapa bagian pendapatan yang hilang bila rak dibatasi seribu judul dari seratus ribu judul.',
    'Jelaskan kenapa keunggulan utama e-commerce bukan harga murah, melainkan ketiadaan batas rak.',
    'Ambil satu produk nyata, telusuri rantainya dari produsen sampai konsumen, dan tentukan siapa yang memegang hubungan dengan pelanggan.'
  ]
});


TOPICS.push({
  id: 'ecom-konversi-kepercayaan',
  judul: 'Konversi, Biaya Pelanggan & Kepercayaan',
  kategori: 'ecommerce',
  tag: ['corong konversi', 'CAC', 'LTV', 'uji A/B', 'riset pasar', 'keranjang ditinggalkan', 'SEO'],
  ringkas: 'Enam tahap yang masing-masing meloloskan sebagian, dan konversinya berakhir di bawah setengah persen.',

  fungsi: `**Membuat orang datang, dan membuat mereka menyelesaikan pembelian.**

Terpakai di:

- **Memperbaiki toko daring** yang trafiknya ada tapi penjualannya sepi
- **Menghitung** berapa boleh dibelanjakan untuk iklan
- **Merancang uji A/B** yang hasilnya bisa dipercaya
- **Proposal bisnis** — bab pemasaran dan proyeksi

Kesalahan hitung yang paling mahal: **memakai harga jual, bukan marjin, saat menghitung LTV.**

Kesalahan ini membesar-besarkan nilai pelanggan sampai tiga kali lipat, dan seluruh keputusan tentang anggaran iklan yang dibangun di atasnya jadi salah.

Dan kaidah yang mengubah cara memilih pekerjaan: **karena tahapnya berlipat, semua tahap sama pentingnya.** Yang menentukan bukan mana yang paling bocor, melainkan mana yang paling **murah** dinaikkan.`,

  praktik: {
    tujuan: `Kamu punya angka corong yang nyata, tahu berapa boleh dibelanjakan per pelanggan, dan bisa menguji perubahan tanpa tertipu.`,
    alat: [
      'Spreadsheet atau Python',
      'Google Analytics atau catatan pesanan',
      'Satu toko atau halaman nyata'
    ],
    langkah: [
      { judul: 'Ukur corongmu sendiri',
        isi: `Catat jumlah orang di tiap tahap: melihat, membuka, melihat produk, masuk keranjang, mulai bayar, selesai.

Tanpa angka nyata, seluruh langkah berikutnya cuma tebakan.` },
      { judul: 'Hitung tingkat lolos tiap tahap',
        isi: `Bagi tiap tahap dengan tahap sebelumnya, bukan dengan jumlah awal.

Lalu kalikan semuanya untuk mendapat konversi menyeluruh. Angkanya akan kecil — dan itu normal.` },
      { judul: 'Buktikan semua tahap sama pentingnya',
        isi: `Naikkan tiap tahap 10 persen satu per satu, lalu hitung ulang hasil akhirnya.

Semuanya memberi tambahan yang **sama persis**. Melihatnya sendiri mengubah cara memilih pekerjaan.` },
      { judul: 'Pilih tahap yang paling murah dinaikkan',
        isi: `Biasanya yang bocornya paling parah — bukan karena lebih penting, melainkan karena di situ ada hal yang **jelas-jelas salah**.

Dan jangan lupakan tahap sebelum corongnya: **menggandakan pengunjung** memberi hasil yang sama dengan menggandakan konversi.` },
      { judul: 'Hitung CAC dan LTV dengan marjin',
        isi: `- CAC = biaya pemasaran dibagi pelanggan baru
- LTV = **marjin** per pesanan × frekuensi × lama bertahan

Pakai **marjin**, bukan harga jual. Patokannya LTV minimal tiga kali CAC.` },
      { judul: 'Hitung juga waktu balik modalnya',
        isi: `LTV sehat tidak berarti kas aman. CAC dibayar hari ini; marjinnya terkumpul berbulan-bulan.

Hitung bulan ke berapa marjin kumulatifnya melewati CAC. Sampai saat itu, tiap pelanggan baru **mengurangi kas**.` },
      { judul: 'Hitung ukuran sampel SEBELUM menguji A/B',
        isi: `Perbaikan yang kecil menuntut pengunjung yang **jauh** lebih banyak — naik seperti kuadrat.

Kalau angkanya melebihi pengunjungmu setahun, jangan uji perubahan itu. Uji yang lebih besar.` },
      { judul: 'Jangan mengintip',
        isi: `Tetapkan ukuran sampel di awal, lalu **tunggu** sampai tercapai.

Memeriksa berkali-kali dan berhenti begitu terlihat signifikan menaikkan peluang tertipu jauh di atas 5 persen.` },
      { judul: 'Telusuri keranjang yang ditinggalkan',
        isi: `Untuk toko sendiri, periksa berapa yang berhenti di tiap langkah pembayaran.

Lalu periksa enam sebab yang lazim: ongkir mendadak, wajib akun, cara bayar kurang, terasa tidak aman, terlalu panjang, tanpa ulasan.

Hampir semuanya bisa diperbaiki **tanpa memotong marjin**.` },
      { judul: 'Riset pasar dengan pertanyaan yang ada harganya',
        isi: `Jangan bertanya *"mau pakai nggak?"* — menjawabnya gratis.

Tanyakan **apa yang sudah mereka lakukan** untuk masalah itu sekarang, dan berapa yang sudah mereka keluarkan.

Kaidah yang sama seperti di Kewirausahaan.` }
    ],
    cek: [
      'Kamu punya angka tingkat lolos tiap tahap corongmu dari data nyata',
      'LTV-mu dihitung dari marjin, dan kamu tahu berapa bulan sampai balik modal',
      'Ukuran sampel uji A/B-mu ditetapkan sebelum ujinya dijalankan'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa tiap tahap sama pentingnya',

  konsep: `
Membangun toko daring itu bagian yang mudah. Bagian yang sulit: **membuat orang datang, dan membuat mereka menyelesaikan pembelian.**

**Corong konversi**

Pengunjung melewati beberapa tahap, dan **menyusut di setiap tahap**:

melihat iklan → membuka situs → melihat produk → masuk keranjang → mulai bayar → **pesanan selesai**

Yang paling penting dipahami: **tahapnya berlipat, bukan bertambah.**

Enam tahap yang masing-masing meloloskan sebagian saja tetap berakhir di bawah **setengah persen**. Itu bukan tanda ada yang rusak — itu bentuk normal sebuah corong.

**Tahap mana yang harus diperbaiki**

Karena tahapnya berlipat, menaikkan tahap **mana pun** sebesar 10 persen menaikkan hasil akhirnya 10 persen juga. Semua tahap **sama pentingnya**.

Jadi pertanyaannya bukan *"mana yang paling besar bocornya"*, melainkan **"mana yang paling murah dinaikkan"**.

Dan itu hampir selalu tahap yang bocornya paling parah — karena di situ biasanya ada hal yang **jelas-jelas salah**, bukan sekadar kurang optimal.

**CAC dan LTV**

- **CAC** — *Customer Acquisition Cost*, biaya mendapat satu pelanggan
- **LTV** — *Lifetime Value*, nilai satu pelanggan seumur hubungannya

\`LTV = marjin per pesanan x frekuensi x lama bertahan\`

Patokan yang lazim: **LTV minimal tiga kali CAC**. Di bawah itu, tidak ada ruang untuk biaya tetap dan risiko.

**Kesalahan yang paling sering di sini**: memakai **harga jual**, bukan **marjin**. Kesalahan ini membesar-besarkan LTV beberapa kali lipat, dan seluruh keputusan yang dibangun di atasnya jadi salah.

**Waktu balik modal**

LTV yang sehat tidak berarti kasnya aman.

Kalau CAC dibayar **hari ini** dan marjinnya baru terkumpul selama berbulan-bulan, maka tiap pelanggan baru **mengurangi kas** sampai titik balik modalnya tercapai.

Inilah sebab usaha yang tumbuh cepat justru sering kehabisan uang — hitungan yang sama dengan yang kamu pelajari di Kewirausahaan.

**Mendatangkan pengunjung**

- **SEO** — lambat, tetapi trafiknya tidak berhenti saat berhenti membayar
- **Iklan berbayar** — cepat, terukur, dan **berhenti saat uangnya habis**
- **Media sosial** — murah, tidak terduga, butuh ketekunan
- **Rujukan** — paling murah dan paling dipercaya, tetapi tidak bisa dipaksa

Perbedaan yang menentukan: SEO adalah **aset**, iklan adalah **sewa**. Keduanya sah, dan mencampurnya dalam satu perhitungan biaya membuat keduanya salah dinilai.

**Uji A/B**

Bagi pengunjung menjadi dua kelompok acak, tunjukkan versi berbeda, bandingkan konversinya.

Yang sering dilupakan: **berapa pengunjung yang dibutuhkan**. Mencari perbaikan yang kecil menuntut pengunjung yang jauh lebih banyak — naik seperti **kuadrat**, hitungan yang sama dengan ukuran sampel di Probabilitas dan Statistika.

Akibat praktisnya: **situs kecil tidak bisa menguji perubahan halus.** Ujilah perubahan besar dulu, dan untuk yang halus percayalah pada penalaran.

**Jangan mengintip**

Memeriksa hasil berkali-kali lalu berhenti begitu terlihat signifikan **menaikkan peluang tertipu**. Tiap pengintipan adalah kesempatan baru menemukan kebetulan.

Tetapkan ukuran sampel di awal, lalu **tunggu**.

**Kenapa keranjang ditinggalkan**

| Sebab | Penawarnya |
|---|---|
| Ongkir muncul di akhir | tampilkan sejak awal |
| Wajib membuat akun | izinkan checkout tamu |
| Cara bayar tidak tersedia | tambah pilihan lokal |
| Situs terasa tidak aman | HTTPS, kebijakan jelas |
| Proses terlalu panjang | kurangi kolom dan langkah |
| Tidak ada ulasan | tampilkan ulasan asli |

Perhatikan bahwa hampir semuanya **bukan soal harga**. Sebagian besar soal **kejutan** dan **kepercayaan** — dan keduanya bisa diperbaiki tanpa memotong marjin.

**Riset pasar**

Sebelum membangun, jawab tiga hal: **siapa** yang membeli, **berapa besar** pasarnya, dan **apa yang sekarang mereka pakai**.

Sumber yang bisa dipakai tanpa biaya: data statistik resmi, laporan industri, Google Trends, ulasan pesaing, dan **wawancara langsung**.

Kaidah yang berlaku sama seperti di Kewirausahaan: **tanyakan apa yang sudah mereka lakukan**, bukan apa yang mereka mau. Yang pertama menanyakan kenyataan; yang kedua menanyakan niat, dan niat itu gratis.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SEMUA TAHAP SAMA PENTINGNYA\n#\n# 100.000 -> 12.000 -> 4.800 -> 1.200 -> 600 -> 390\n#   konversi menyeluruh: 0.39%\n#\n# Naikkan SATU tahap 10%, hasil akhirnya:\n#\n#   tahap yang diperbaiki   pesanan   tambahan\n#   Membuka situs               429        +39\n#   Melihat produk              429        +39\n#   Masuk keranjang             429        +39\n#   Mulai bayar                 429        +39\n#   Pesanan selesai             429        +39\n#\n# SEMUANYA SAMA. Karena tahapnya berlipat.\n#\n# Jadi pilih tahap yang paling MURAH dinaikkan,\n# bukan yang paling besar bocornya.',
      penjelasan: `
Hasil bahwa **semua tahap sama pentingnya** sering mengejutkan, dan ia langsung mengubah cara memilih pekerjaan.

Alasannya matematis dan sederhana. Konversi menyeluruh adalah **hasil kali** semua tahapnya:

\`total = t1 x t2 x t3 x t4 x t5\`

Kalikan salah satu faktor dengan 1,1, dan seluruh hasilnya ikut dikalikan 1,1. **Faktor yang mana tidak berpengaruh** — perkalian tidak peduli urutan.

Naluri berkata sebaliknya. Melihat tahap yang meloloskan cuma 12 persen, dorongan pertama adalah *"di sinilah kebocoran terbesarnya, perbaiki ini"*.

Dorongan itu **tidak salah**, tetapi alasannya salah — dan alasan yang salah akan menyesatkan di kasus berikutnya.

Tahap yang bocor parah bukan lebih penting. Ia cuma **lebih mudah dinaikkan**, karena di angka serendah itu biasanya ada hal yang jelas-jelas salah: halaman terlalu lambat, iklannya menjanjikan hal yang berbeda dari isinya, atau tombolnya tidak terlihat.

Bandingkan dengan tahap yang sudah meloloskan 65 persen. Menaikkannya menjadi 71,5 persen menuntut pekerjaan yang jauh lebih halus, karena yang mudah sudah dikerjakan.

Jadi kaidah yang benar: **pilih tahap yang paling murah dinaikkan 10 persen**, dan itu biasanya — tetapi tidak selalu — yang paling bocor.

Sekarang bagian yang lebih penting, dan sering terlewat: **jangan lupa tahap sebelum corongnya.**

Corong di atas mulai dari "melihat iklan". Tetapi jumlah orang yang melihat iklan itu sendiri **bisa dinaikkan**, dan menaikkannya dua kali lipat menggandakan hasil akhirnya — sama seperti menaikkan tahap mana pun dua kali lipat.

Banyak toko menghabiskan berbulan-bulan mengutak-atik warna tombol pada corong yang cuma dilihat seratus orang sehari. Hitungannya jelas: **menggandakan pengunjung dan menggandakan konversi memberi hasil yang sama persis**, dan yang pertama sering jauh lebih mudah.

Terakhir, satu peringatan yang datang dari Probabilitas dan Statistika.

Menaikkan konversi dari 3,9 persen menjadi 4,3 persen — kenaikan 10 persen — butuh sekitar **empat puluh ribu pengunjung per kelompok** untuk bisa dibuktikan. Untuk kenaikan 5 persen, angkanya melebihi **seratus lima puluh ribu**.

Toko yang dikunjungi seratus orang sehari butuh **lebih dari dua tahun** untuk menyelesaikan satu uji seperti itu.

Kesimpulannya bukan "jangan menguji". Kesimpulannya: **uji perubahan besar**, yang bisa dibuktikan dengan pengunjung yang kamu punya. Untuk perubahan halus, andalkan penalaran dan praktik yang sudah mapan — karena angkanya tidak akan pernah cukup untuk memutuskan, dan menunggu sampai "signifikan" hanya akan membuatmu tertipu oleh kebetulan.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Corong konversi, biaya pelanggan, dan uji A/B
# ============================================
import math

# --------------------------------------------
# 1. Corong berlipat, bukan bertambah
# --------------------------------------------
CORONG = [
    ("Melihat iklan",        100_000),
    ("Membuka situs",         12_000),
    ("Melihat produk",         4_800),
    ("Masuk keranjang",        1_200),
    ("Mulai bayar",              600),
    ("Pesanan selesai",          390),
]
print("--- corong konversi ---")
print("  " + "tahap".ljust(20) + "orang".rjust(9)
      + "lolos".rjust(9) + "  yang HILANG di sini")
for i, (nama, n) in enumerate(CORONG):
    if i == 0:
        print("  " + nama.ljust(20) + f"{n:>9,}".replace(",", ".")
              + "".rjust(9))
        continue
    sebelum = CORONG[i - 1][1]
    lolos = n / sebelum
    hilang = sebelum - n
    print("  " + nama.ljust(20) + f"{n:>9,}".replace(",", ".")
          + ("%.0f%%" % (lolos * 100)).rjust(9)
          + f"   {hilang:,}".replace(",", "."))
total = CORONG[-1][1] / CORONG[0][1]
print("")
print("  konversi menyeluruh : " + ("%.2f%%" % (total * 100)))
print("")
print("  Tahap berlipat, tidak bertambah. Enam tahap yang")
print("  masing-masing meloloskan sebagian tetap berakhir")
print("  di bawah setengah persen.")

# --------------------------------------------
# 2. Perbaiki tahap mana?
# --------------------------------------------
print("")
print("--- naikkan satu tahap 10 persen, mana yang berdampak? ---")
akhir = CORONG[-1][1]
print("  " + "tahap yang diperbaiki".ljust(24)
      + "pesanan baru".rjust(14) + "tambahan".rjust(11))
for i in range(1, len(CORONG)):
    n = akhir * 1.10
    print("  " + CORONG[i][0].ljust(24)
          + ("%.0f" % n).rjust(14)
          + ("+%.0f" % (n - akhir)).rjust(11))
print("")
print("  Semuanya SAMA. Karena tahapnya berlipat, menaikkan")
print("  tahap mana pun sebesar 10 persen menaikkan hasil")
print("  akhirnya 10 persen juga.")
print("")
print("  Jadi yang menentukan bukan tahap mana yang paling")
print("  besar bocornya, melainkan tahap mana yang paling")
print("  MURAH dinaikkan. Dan itu hampir selalu tahap yang")
print("  bocornya paling parah -- karena di situ biasanya")
print("  ada hal yang jelas-jelas salah.")

# --------------------------------------------
# 3. Biaya mendapat pelanggan vs nilainya
# --------------------------------------------
print("")
print("--- CAC vs LTV ---")
biaya_iklan = 5_000_000
pelanggan_baru = 100
cac = biaya_iklan / pelanggan_baru

marjin_per_order = 34_000
order_per_tahun = 6
tahun_bertahan = 2
ltv = marjin_per_order * order_per_tahun * tahun_bertahan

print("  biaya iklan sebulan   : Rp "
      + f"{biaya_iklan:,}".replace(",", "."))
print("  pelanggan baru        : " + str(pelanggan_baru))
print("  CAC                   : Rp "
      + f"{int(cac):,}".replace(",", "."))
print("")
print("  marjin per pesanan    : Rp "
      + f"{marjin_per_order:,}".replace(",", "."))
print("  beli " + str(order_per_tahun) + "x/tahun, bertahan "
      + str(tahun_bertahan) + " tahun")
print("  LTV                   : Rp "
      + f"{int(ltv):,}".replace(",", "."))
print("")
print("  LTV / CAC             : " + ("%.1f" % (ltv / cac)))
print("  " + ("SEHAT (patokan minimal 3)" if ltv / cac >= 3
              else "TERLALU RENDAH (patokan minimal 3)"))
print("")
print("  Kesalahan yang paling sering: memakai HARGA JUAL,")
print("  bukan MARJIN, saat menghitung LTV. Dengan harga")
print("  jual Rp 100.000, LTV-nya terlihat Rp "
      + f"{100_000 * order_per_tahun * tahun_bertahan:,}".replace(",", "."))
print("  -- hampir tiga kali lipat, dan seluruh keputusan")
print("  yang dibangun di atasnya jadi salah.")

# --------------------------------------------
# 4. Berapa lama modal iklan kembali
# --------------------------------------------
print("")
print("--- kapan biaya iklan kembali ---")
print("  " + "bulan".rjust(6) + "marjin kumulatif".rjust(19)
      + "  status")
per_bulan = marjin_per_order * order_per_tahun / 12
kum = 0.0
balik = None
for b in range(1, 13):
    kum += per_bulan
    if balik is None and kum >= cac:
        balik = b
    if b in (1, 3, 6, 9, 12):
        st = "sudah balik modal" if kum >= cac else "belum"
        print("  " + str(b).rjust(6)
              + f"{int(kum):>19,}".replace(",", ".") + "  " + st)
print("")
print("  Balik modal di bulan " + str(balik) + ". Sampai saat itu,")
print("  tiap pelanggan baru MENGURANGI kas -- meski")
print("  perusahaannya untung di atas kertas.")
print("  Ini sebab usaha yang tumbuh cepat justru sering")
print("  kehabisan uang.")

# --------------------------------------------
# 5. Uji A/B: berapa pengunjung yang dibutuhkan
# --------------------------------------------
print("")
print("--- uji A/B butuh berapa pengunjung? ---")
def sampel_ab(p1, kenaikan_relatif, alpha=1.96, daya=0.84):
    p2 = p1 * (1 + kenaikan_relatif)
    pbar = (p1 + p2) / 2
    n = ((alpha + daya) ** 2 * 2 * pbar * (1 - pbar)) / (p2 - p1) ** 2
    return math.ceil(n)

p0 = 0.039     # konversi sekarang 3,9 persen
print("  konversi sekarang : " + ("%.1f%%" % (p0 * 100)))
print("  " + "kenaikan dicari".rjust(16) + "n per kelompok".rjust(17)
      + "total".rjust(12))
for k in (0.50, 0.20, 0.10, 0.05):
    n = sampel_ab(p0, k)
    print("  " + ("+%.0f%%" % (k * 100)).rjust(16)
          + f"{n:>17,}".replace(",", ".")
          + f"{2 * n:>12,}".replace(",", "."))
print("")
print("  Mencari perbaikan yang KECIL menuntut pengunjung")
print("  yang JAUH lebih banyak -- naik seperti kuadrat,")
print("  hitungan yang sama dengan ukuran sampel di Probstat.")
print("")
print("  Akibat praktisnya: situs kecil tidak bisa menguji")
print("  perubahan halus. Ujilah perubahan BESAR dulu, dan")
print("  untuk yang halus percayalah pada penalaran -- bukan")
print("  pada angka yang tidak akan pernah cukup meyakinkan.")

# --------------------------------------------
# 6. Berhenti mengintip
# --------------------------------------------
print("")
print("--- kenapa mengintip hasil uji itu berbahaya ---")
print("  Tiap kali kamu memeriksa lalu berhenti begitu")
print("  hasilnya terlihat signifikan, kamu menambah")
print("  kesempatan menemukan kebetulan.")
print("")
print("  " + "berapa kali mengintip".rjust(22)
      + "peluang temuan palsu".rjust(23))
for k in (1, 2, 5, 10, 20):
    p = 1 - (1 - 0.05) ** k
    print("  " + str(k).rjust(22) + ("%.1f%%" % (p * 100)).rjust(23))
print("")
print("  Angka ini batas atas kasar, bukan hitungan tepat --")
print("  pengintipan berurutan saling berkaitan sehingga")
print("  angkanya sedikit lebih rendah. Yang nyata ARAHNYA:")
print("  makin sering mengintip, makin besar peluang tertipu.")
print("  Tetapkan ukuran sampel di awal, lalu TUNGGU.")

# --------------------------------------------
# 7. Kepercayaan: yang membuat orang jadi membayar
# --------------------------------------------
print("")
print("--- kenapa keranjang ditinggalkan ---")
SEBAB = [
    ("Ongkir muncul di akhir",     "tampilkan sejak awal"),
    ("Wajib membuat akun",         "izinkan checkout tamu"),
    ("Cara bayar tidak tersedia",  "tambah pilihan lokal"),
    ("Situs terasa tidak aman",    "HTTPS, kebijakan jelas"),
    ("Proses terlalu panjang",     "kurangi kolom & langkah"),
    ("Tidak ada ulasan",           "tampilkan ulasan asli"),
]
print("  " + "sebab".ljust(30) + "penawarnya")
for a, b in SEBAB:
    print("  " + a.ljust(30) + b)
print("")
print("  Perhatikan: hampir semuanya BUKAN soal harga.")
print("  Sebagian besar soal KEJUTAN dan KEPERCAYAAN --")
print("  dan keduanya bisa diperbaiki tanpa memotong marjin.")` },
  output: `--- corong konversi ---
  tahap                   orang    lolos  yang HILANG di sini
  Melihat iklan         100.000         
  Membuka situs          12.000      12%   88.000
  Melihat produk          4.800      40%   7.200
  Masuk keranjang         1.200      25%   3.600
  Mulai bayar               600      50%   600
  Pesanan selesai           390      65%   210

  konversi menyeluruh : 0.39%

  Tahap berlipat, tidak bertambah. Enam tahap yang
  masing-masing meloloskan sebagian tetap berakhir
  di bawah setengah persen.

--- naikkan satu tahap 10 persen, mana yang berdampak? ---
  tahap yang diperbaiki     pesanan baru   tambahan
  Membuka situs                      429        +39
  Melihat produk                     429        +39
  Masuk keranjang                    429        +39
  Mulai bayar                        429        +39
  Pesanan selesai                    429        +39

  Semuanya SAMA. Karena tahapnya berlipat, menaikkan
  tahap mana pun sebesar 10 persen menaikkan hasil
  akhirnya 10 persen juga.

  Jadi yang menentukan bukan tahap mana yang paling
  besar bocornya, melainkan tahap mana yang paling
  MURAH dinaikkan. Dan itu hampir selalu tahap yang
  bocornya paling parah -- karena di situ biasanya
  ada hal yang jelas-jelas salah.

--- CAC vs LTV ---
  biaya iklan sebulan   : Rp 5.000.000
  pelanggan baru        : 100
  CAC                   : Rp 50.000

  marjin per pesanan    : Rp 34.000
  beli 6x/tahun, bertahan 2 tahun
  LTV                   : Rp 408.000

  LTV / CAC             : 8.2
  SEHAT (patokan minimal 3)

  Kesalahan yang paling sering: memakai HARGA JUAL,
  bukan MARJIN, saat menghitung LTV. Dengan harga
  jual Rp 100.000, LTV-nya terlihat Rp 1.200.000
  -- hampir tiga kali lipat, dan seluruh keputusan
  yang dibangun di atasnya jadi salah.

--- kapan biaya iklan kembali ---
   bulan   marjin kumulatif  status
       1             17.000  belum
       3             51.000  sudah balik modal
       6            102.000  sudah balik modal
       9            153.000  sudah balik modal
      12            204.000  sudah balik modal

  Balik modal di bulan 3. Sampai saat itu,
  tiap pelanggan baru MENGURANGI kas -- meski
  perusahaannya untung di atas kertas.
  Ini sebab usaha yang tumbuh cepat justru sering
  kehabisan uang.

--- uji A/B butuh berapa pengunjung? ---
  konversi sekarang : 3.9%
   kenaikan dicari   n per kelompok       total
              +50%            1.913       3.826
              +20%           10.583      21.166
              +10%           40.487      80.974
               +5%          158.252     316.504

  Mencari perbaikan yang KECIL menuntut pengunjung
  yang JAUH lebih banyak -- naik seperti kuadrat,
  hitungan yang sama dengan ukuran sampel di Probstat.

  Akibat praktisnya: situs kecil tidak bisa menguji
  perubahan halus. Ujilah perubahan BESAR dulu, dan
  untuk yang halus percayalah pada penalaran -- bukan
  pada angka yang tidak akan pernah cukup meyakinkan.

--- kenapa mengintip hasil uji itu berbahaya ---
  Tiap kali kamu memeriksa lalu berhenti begitu
  hasilnya terlihat signifikan, kamu menambah
  kesempatan menemukan kebetulan.

   berapa kali mengintip   peluang temuan palsu
                       1                   5.0%
                       2                   9.8%
                       5                  22.6%
                      10                  40.1%
                      20                  64.2%

  Angka ini batas atas kasar, bukan hitungan tepat --
  pengintipan berurutan saling berkaitan sehingga
  angkanya sedikit lebih rendah. Yang nyata ARAHNYA:
  makin sering mengintip, makin besar peluang tertipu.
  Tetapkan ukuran sampel di awal, lalu TUNGGU.

--- kenapa keranjang ditinggalkan ---
  sebab                         penawarnya
  Ongkir muncul di akhir        tampilkan sejak awal
  Wajib membuat akun            izinkan checkout tamu
  Cara bayar tidak tersedia     tambah pilihan lokal
  Situs terasa tidak aman       HTTPS, kebijakan jelas
  Proses terlalu panjang        kurangi kolom & langkah
  Tidak ada ulasan              tampilkan ulasan asli

  Perhatikan: hampir semuanya BUKAN soal harga.
  Sebagian besar soal KEJUTAN dan KEPERCAYAAN --
  dan keduanya bisa diperbaiki tanpa memotong marjin.`,

  kesalahanUmum: [
    {
      salah: 'Menghitung LTV dari harga jual, bukan dari marjin.',
      kenapa: 'Harga jual belum dikurangi harga pokok, ongkos kirim, dan biaya transaksi, sehingga LTV yang dihasilkan bisa tiga kali lipat dari yang sebenarnya. Seluruh keputusan tentang berapa banyak boleh dibelanjakan untuk iklan lalu dibangun di atas angka yang salah.',
      benar: 'Pakai marjin per pesanan, bukan harga jual, dan sebutkan komponen apa saja yang sudah dikurangkan.'
    },
    {
      salah: 'Menganggap LTV yang jauh di atas CAC berarti kasnya aman.',
      kenapa: 'CAC dibayar hari ini sementara marjinnya baru terkumpul selama berbulan-bulan, sehingga tiap pelanggan baru mengurangi kas sampai titik balik modalnya tercapai. Usaha yang tumbuh cepat bisa untung di atas kertas dan tetap kehabisan uang.',
      benar: 'Hitung juga berapa bulan sampai balik modal, dan proyeksikan kasnya bukan hanya labanya.'
    },
    {
      salah: 'Memusatkan seluruh perbaikan pada tahap yang bocornya paling parah karena dianggap paling penting.',
      kenapa: 'Konversi menyeluruh adalah hasil kali semua tahap, sehingga menaikkan tahap mana pun sepuluh persen menaikkan hasil akhirnya sepuluh persen juga. Tahap yang bocor parah bukan lebih penting, ia hanya biasanya lebih murah diperbaiki.',
      benar: 'Pilih tahap berdasarkan biaya menaikkannya, dan jangan lupakan menambah jumlah pengunjung di ujung depan corong.'
    },
    {
      salah: 'Menjalankan uji A/B lalu memeriksanya tiap hari dan berhenti begitu terlihat signifikan.',
      kenapa: 'Tiap pemeriksaan adalah kesempatan baru menemukan kebetulan, sehingga peluang menyimpulkan hal yang salah naik jauh di atas lima persen. Setelah sepuluh kali mengintip, peluang temuan palsu sudah mendekati separuh.',
      benar: 'Tetapkan ukuran sampel di awal dengan rumus, lalu tunggu sampai tercapai sebelum melihat hasilnya.'
    },
    {
      salah: 'Menguji perubahan halus pada situs yang pengunjungnya sedikit.',
      kenapa: 'Ukuran sampel yang dibutuhkan naik seperti kuadrat dari kecilnya perbedaan yang dicari, sehingga membuktikan kenaikan lima persen bisa menuntut ratusan ribu pengunjung. Situs kecil akan berhenti sebelum datanya cukup, dan menyimpulkan dari data yang belum cukup lebih buruk daripada tidak menguji.',
      benar: 'Uji perubahan besar yang bisa dibuktikan dengan pengunjung yang ada, dan andalkan penalaran untuk perubahan halus.'
    },
    {
      salah: 'Menampilkan ongkos kirim baru di halaman pembayaran terakhir.',
      kenapa: 'Kejutan biaya di akhir adalah sebab keranjang ditinggalkan yang paling sering muncul, karena pembeli sudah membuat keputusan berdasarkan angka yang berbeda. Yang merusak bukan besar ongkirnya, melainkan bahwa ia baru muncul setelah pembeli merasa selesai memutuskan.',
      benar: 'Tampilkan perkiraan ongkos kirim sejak halaman produk atau keranjang, bahkan bila angkanya belum tepat.'
    },
    {
      salah: 'Mencampur SEO dan iklan berbayar dalam satu perhitungan biaya per pelanggan.',
      kenapa: 'Iklan berhenti mendatangkan pengunjung begitu pembayarannya berhenti, sedangkan SEO terus bekerja setelah pekerjaannya selesai. Menggabungkan keduanya menyembunyikan bahwa yang satu sewa dan yang lain aset, sehingga anggaran mengalir ke tempat yang salah.',
      benar: 'Hitung biaya per pelanggan secara terpisah untuk tiap saluran, dan bandingkan juga berapa lama pengaruhnya bertahan.'
    },
    {
      salah: 'Melakukan riset pasar dengan menanyakan apakah orang mau memakai produkmu.',
      kenapa: 'Menjawab pertanyaan itu tidak ada biayanya, sehingga jawabannya tidak memberi keterangan apa pun tentang apa yang akan benar-benar mereka lakukan. Yang menjawab iya karena tidak enak menolak tidak bisa dibedakan dari calon pembeli sungguhan.',
      benar: 'Tanyakan apa yang sudah mereka lakukan sekarang untuk masalah itu, dan berapa yang sudah mereka keluarkan.'
    }
  ],

  analogi: `Bayangkan **antrean masuk konser** yang harus melewati lima pintu.

Pintu pertama meloloskan 12 dari 100 orang. Pintu kedua meloloskan 4 dari 10 yang lolos. Begitu seterusnya.

Dari seratus ribu orang yang melihat posternya, yang benar-benar masuk **kurang dari empat ratus**.

Sekarang panitia berdebat: pintu mana yang harus diperlebar?

Ada yang bilang **pintu pertama** — di situ paling banyak orang berguguran. Ada yang bilang **pintu terakhir** — sayang sekali kehilangan orang yang sudah hampir masuk.

Keduanya melewatkan hal yang sama. **Melebarkan pintu mana pun sebesar sepuluh persen menambah jumlah penonton yang sama persis.**

Karena tiap pintu mengalikan, bukan menambahkan.

Jadi pertanyaannya berubah: **pintu mana yang paling murah dilebarkan?**

Dan jawabannya biasanya pintu pertama — bukan karena ia lebih penting, melainkan karena pintu yang meloloskan cuma 12 persen hampir pasti punya sesuatu yang **jelas rusak**: petugasnya cuma satu, atau papan petunjuknya tidak terbaca.

Pintu yang sudah meloloskan 65 persen sudah diurus dengan baik. Memperbaikinya butuh usaha yang jauh lebih halus.

Dan satu hal yang paling sering dilupakan panitia: **berapa banyak orang yang melihat posternya sama sekali?**

Menggandakan jumlah poster menggandakan penonton — persis sama dengan menggandakan kelolosan pintu mana pun. Dan sering jauh lebih mudah daripada mengutak-atik pintu.`,

  latihan: [
    'Susun corong konversi untuk satu toko daring dengan lima tahap, lalu hitung konversi menyeluruhnya.',
    'Tunjukkan dengan hitungan bahwa menaikkan tahap mana pun sepuluh persen memberi tambahan pesanan yang sama.',
    'Jelaskan kenapa tahap yang bocornya paling parah biasanya yang paling murah diperbaiki, meski bukan yang paling penting.',
    'Hitung CAC dan LTV untuk satu usaha nyata, lalu nilai rasionya terhadap patokan tiga.',
    'Hitung ulang LTV yang sama dengan memakai harga jual alih-alih marjin, dan tunjukkan seberapa besar selisihnya.',
    'Hitung berapa bulan sampai biaya mendapatkan pelanggan kembali, dan jelaskan akibatnya bagi kas.',
    'Bandingkan SEO dan iklan berbayar sebagai aset dan sewa, lalu jelaskan kenapa keduanya tidak boleh dicampur dalam satu perhitungan.',
    'Hitung ukuran sampel uji A/B untuk mencari kenaikan 50, 20, dan 5 persen, lalu jelaskan akibatnya bagi situs kecil.',
    'Hitung peluang temuan palsu setelah lima, sepuluh, dan dua puluh kali mengintip hasil uji.',
    'Sebutkan enam sebab keranjang ditinggalkan beserta penawarnya, dan jelaskan kenapa hampir semuanya bukan soal harga.'
  ]
});
