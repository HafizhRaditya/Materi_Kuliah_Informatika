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

   Empat topik tambahan (pembayaran, persediaan, CRM, harga &
   iklan) disusun dari REFERENSI LUAR -- pokok bahasan yang
   berulang di beberapa RPS E-Commerce kampus lain. Keterangan
   lengkapnya ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (empat topik di bawah).

   Dua topik pertama berkas ini berasal dari tugas kuliah
   sendiri. Empat topik berikutnya disusun dari pokok bahasan
   yang berulang di beberapa RPS E-Commerce kampus lain --
   sistem pembayaran elektronik, rantai nilai dan rantai pasok,
   CRM, strategi iklan, serta aspek keamanan dan hukum --
   ditambah pengetahuan umum. Dipilih bagian yang bisa DIHITUNG
   supaya bisa diperiksa sendiri.

   Tarif pembayaran di topik pembayaran adalah ANGKA CONTOH
   yang strukturnya mirip pasar; tarif sebenarnya berbeda antar
   penyedia dan berubah dari waktu ke waktu.
   ------------------------------------------------------------ */

TOPICS.push({
  id: 'ecom-pembayaran',
  judul: 'Sistem Pembayaran Elektronik',
  kategori: 'ecommerce',
  tag: ['payment gateway', 'virtual account', 'QRIS', 'idempotensi', 'webhook', 'tokenisasi', 'COD'],
  ringkas: 'Lima pesanan, lima kali timeout, dan tanpa satu kunci pembeli ditagih dua kali lipat.',

  fungsi: `**Menerima uang dengan benar: tidak dobel, tidak hilang, tidak menyimpan yang tidak perlu, dan tidak lebih mahal dari yang perlu.**

Terpakai di:

- **Memasang payment gateway** di toko atau aplikasi mana pun — dan memahami bahwa yang kamu pasang adalah percakapan dengan pihak ketiga, bukan satu panggilan fungsi
- **Menulis endpoint pembayaran** yang aman dicoba ulang, dan penerima webhook yang tahan terhadap pesan dobel dan tidak berurutan
- **Memilih cara bayar** yang ditawarkan berdasarkan nilai keranjang, bukan menawarkan semuanya
- **Menghitung apakah COD layak** untuk usahamu
- **Tugas akhir** yang membangun sistem transaksi — bagian pembayaran hampir selalu ditanyakan di sidang

Yang paling berbahaya dan paling sering diremehkan: **timeout tidak berarti gagal.** Ia berarti *tidak tahu*. Permintaannya mungkin sudah diproses dan cuma balasannya yang hilang — dan mencoba ulang tanpa kunci idempotensi mengubah setiap timeout menjadi tagihan kedua.

Dan satu keputusan yang menghemat banyak masalah: **jangan menyimpan nomor kartu.** Simpan token dari gateway. Nomor kartu yang tidak kamu simpan tidak bisa bocor dari sistemmu.`,
  praktik: {
    tujuan: 'Kamu bisa merancang alur pembayaran yang aman dicoba ulang, menerima webhook dengan benar walau dobel dan tidak berurutan, memilih cara bayar berdasarkan biaya, dan menghitung dampak COD pada laba.',
    alat: ['Akun sandbox payment gateway (hampir semua penyedia menyediakannya gratis)', 'Python atau bahasa backend yang kamu pakai', 'Spreadsheet untuk hitungan biaya'],
    langkah: [
      { judul: 'Gambar dulu siapa bicara dengan siapa',
        isi: `Pembeli, toko, gateway, bank, dan jaringan antarbank. Toko **tidak** berbicara langsung dengan bank.

Gambar ini menjelaskan kenapa "pembayaran berhasil" datang sebagai **pesan terpisah** dari gateway, bukan sebagai hasil fungsi yang kamu panggil — dan kenapa pesan itu bisa terlambat, dobel, atau tidak datang.` },
      { judul: 'Hitung biaya tiap cara bayar per nilai keranjang',
        isi: `Tulis struktur biaya penyedia yang kamu pakai: persen, tetap, atau keduanya. Hitung biayanya sebagai persen untuk keranjang kecil, sedang, dan besar.

Cari **titik impas** antara cara berbiaya tetap dan berbiaya persen. Di bawah titik itu yang persen lebih murah; di atasnya yang tetap.` },
      { judul: 'Hitung uang yang tertahan karena waktu cair',
        isi: `Kalikan omzet harian dengan jumlah hari sampai dana cair.

Untuk usaha kecil, uang yang tertahan ini sering lebih menentukan daripada selisih tarif setengah persen — karena ia modal kerja yang tidak bisa dipakai untuk belanja stok atau iklan.` },
      { judul: 'Pasang kunci idempotensi dari id pesanan',
        isi: `Setiap permintaan tagih membawa kunci yang dibuat dari **id pesanan**, bukan acak per percobaan. Kalau kunci acak dibuat ulang tiap percobaan, gateway tidak bisa mengenali bahwa itu permintaan yang sama.

Uji dengan sengaja: buat timeout di sandbox, coba ulang, lalu periksa berapa kali dana ditarik.` },
      { judul: 'Tangani webhook sebagai pesan yang tidak bisa dipercaya urutannya',
        isi: `Simpan setiap webhook yang sudah diproses dan **abaikan duplikatnya**. Pakai nomor urut atau waktu kejadian dari gateway — bukan waktu tiba — dan biarkan status hanya **maju**, tidak mundur.

Lalu verifikasi tanda tangan webhook. Endpoint webhook yang tidak memeriksa tanda tangan bisa dipanggil siapa pun untuk menandai pesanan sebagai lunas.` },
      { judul: 'Jangan hanya percaya halaman "terima kasih"',
        isi: `Pembeli bisa menutup peramban sebelum dialihkan kembali ke tokomu, atau membuka halaman sukses secara langsung.

Status pesanan harus ditentukan dari **webhook terverifikasi** atau dari menanyakan langsung ke gateway, bukan dari fakta bahwa pembeli sampai di halaman sukses.` },
      { judul: 'Simpan token, bukan nomor kartu',
        isi: `Pakai formulir atau SDK dari gateway supaya nomor kartu tidak pernah melewati peladenmu. Yang kamu simpan: token, empat angka terakhir, merek kartu.

Keputusan ini sekaligus memindahkan sebagian besar beban kepatuhan PCI DSS ke gateway.` },
      { judul: 'Hitung dampak COD dengan tingkat tolak nyata',
        isi: `Ambil tingkat penolakan COD dari data tokomu sendiri, lalu hitung laba bersih: laba dari yang diterima dikurangi ongkir pergi-pulang untuk yang ditolak.

Bandingkan dengan kenaikan konversi yang dibawa COD. Kalau kenaikannya tidak menutup biaya penolakan, COD sedang merugikanmu.` }
    ],
    cek: [
      'Mencoba ulang pembayaran yang timeout tidak pernah menagih dua kali',
      'Penerima webhook-mu mengabaikan duplikat, tidak membiarkan status mundur, dan memeriksa tanda tangan',
      'Peladenmu tidak pernah menyimpan maupun melihat nomor kartu lengkap',
      'Kamu tahu titik impas antara cara bayar berbiaya tetap dan berbiaya persen'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kenapa timeout harus dianggap "tidak tahu"',

  konsep: `Dari sisi pembeli, membayar adalah satu klik. Dari sisi sistem, satu klik itu adalah percakapan antara lima pihak yang tidak saling percaya, lewat jaringan yang bisa kehilangan pesan kapan saja. Hampir semua masalah pembayaran berasal dari melupakan fakta kedua.

**Lima pihak dalam satu pembayaran**

| Pihak | Perannya |
|---|---|
| Pembeli | memilih cara bayar, mengisi data |
| Toko (merchant) | membuat pesanan, menunggu kabar |
| Payment gateway | menerima data, meneruskan, melapor |
| Bank / penerbit | memeriksa saldo atau limit, memutuskan |
| Jaringan antarbank | menyambungkan bank yang berbeda |

Toko **tidak** berbicara langsung dengan bank. Ia berbicara dengan gateway, dan gateway yang mengurus sisanya.

Akibatnya penting: "pembayaran berhasil" datang ke toko sebagai **pesan** dari gateway — sering lewat webhook, terpisah dari halaman yang dilihat pembeli. Pesan itu bisa terlambat, dobel, atau tidak datang sama sekali, dan sistem yang baik dirancang dengan anggapan itu.

**Biaya: persen lawan tetap**

Angka di bawah adalah **contoh** dengan struktur yang mirip pasar; tarif sebenarnya berbeda antar penyedia.

| Cara | Rp 25 rb | Rp 100 rb | Rp 500 rb | Rp 2 jt |
|---|---|---|---|---|
| Virtual account (tetap Rp 4.000) | 16,0% | 4,0% | 0,8% | 0,2% |
| QRIS (0,7%) | 0,7% | 0,7% | 0,7% | 0,7% |
| E-wallet (1,5%) | 1,5% | 1,5% | 1,5% | 1,5% |
| Kartu kredit (2,9% + Rp 2.000) | 10,9% | 4,9% | 3,3% | 3,0% |

Biaya **tetap** mahal untuk belanja kecil dan murah untuk belanja besar; biaya **persen** sebaliknya.

Titik impas virtual account lawan e-wallet: \`4.000 = 1,5% x nilai\`, jadi sekitar **Rp 266.667**. Di bawahnya e-wallet lebih murah bagi toko; di atasnya virtual account.

Toko yang menawarkan semua cara bayar tanpa melihat nilai keranjang membayar lebih mahal dari yang perlu — dan tidak menyadarinya, karena biayanya dipotong sebelum uang masuk.

**Waktu cair: biaya yang tidak tertulis di tarif**

Dengan omzet Rp 15 juta sehari dan pencairan T+7, toko selalu punya **Rp 105 juta** yang sudah terjual tetapi belum bisa dipakai. Itu modal kerja yang terkunci — dan untuk usaha kecil ia sering lebih menentukan daripada selisih tarif setengah persen.

**Timeout bukan gagal**

Ini bagian yang paling penting, dan paling sering salah.

Toko mengirim permintaan tagih ke gateway. Gateway memproses, menarik dana dari pembeli, lalu mengirim balasan. Balasan itu **hilang di jaringan**. Toko menunggu, lalu menyatakan timeout.

Apa yang sebenarnya terjadi? Toko tidak tahu. Dananya mungkin sudah ditarik, mungkin belum.

Naluri pemrogram: coba ulang. Dan kalau dananya ternyata sudah ditarik, percobaan kedua **menarik lagi**.

| Keadaan | 5 pesanan @ Rp 150.000, tiap pesanan kena satu timeout |
|---|---|
| Tanpa kunci idempotensi | ditarik **10 kali**, total **Rp 1.500.000** |
| Dengan kunci idempotensi | ditarik **5 kali**, total Rp 750.000 |

Penyelesaiannya **kunci idempotensi**: setiap permintaan membawa kunci unik yang dibuat dari **id pesanan**. Gateway menyimpan kunci yang sudah diproses, dan permintaan kedua dengan kunci yang sama mengembalikan hasil yang pertama tanpa menarik dana lagi.

Syaratnya satu dan sering dilanggar: kuncinya harus **sama** untuk percobaan ulang. Kunci yang dibuat acak ulang tiap percobaan tidak melindungi apa pun.

**Webhook datang dobel dan tidak berurutan**

Urutan kejadian sebenarnya: PENDING → PAID → REFUNDED. Urutan webhook tiba: PAID → PENDING → PAID → REFUNDED.

| Webhook ke- | Tiba | Cara naif (ambil yang terakhir) | Nomor urut |
|---|---|---|---|
| 1 | PAID | PAID | PAID |
| 2 | PENDING | **PENDING** — salah | PAID |
| 3 | PAID | PAID | PAID |
| 4 | REFUNDED | REFUNDED | REFUNDED |

Pada webhook kedua, cara naif menyimpulkan pesanan belum dibayar — karena webhook PENDING kebetulan tiba sesudah PAID. Toko menahan barang yang sudah lunas.

Dan perhatikan baris terakhir: cara naif akhirnya benar, tetapi cuma karena kebetulan. **Kode yang benar karena kebetulan lolos pengujian dan gagal di produksi.**

Aturannya dua: **status hanya boleh maju**, dan webhook yang sudah diproses **diabaikan**. Keduanya butuh nomor urut atau waktu kejadian dari gateway, bukan waktu tiba.

**Yang disimpan toko: token, bukan nomor kartu**

| Data | Disimpan toko? | Alasan |
|---|---|---|
| Nomor kartu lengkap | **tidak** | dipegang gateway saja |
| CVV | **tidak** | tidak boleh disimpan siapa pun |
| Token | ya | tidak berguna di luar toko ini |
| 4 angka terakhir | ya | untuk ditampilkan ke pembeli |
| Merek kartu | ya | untuk ditampilkan ke pembeli |

Token cuma berarti bagi gateway yang menerbitkannya, untuk toko yang memintanya. Kalau basis data toko bocor, token itu tidak bisa dipakai belanja di tempat lain.

Dan toko yang menyimpan nomor kartu sendiri terkena seluruh kewajiban standar **PCI DSS** — audit, pemindaian, dan biaya yang tidak sebanding untuk usaha kecil. Menyerahkannya ke gateway memindahkan sebagian besar beban itu.

**Biaya COD yang tidak terlihat**

1.000 pesanan, nilai rata-rata Rp 180.000, marjin 25%, ongkir pergi-pulang ditanggung toko bila barang ditolak:

| Tingkat tolak | Laba kotor | Rugi ongkir | Laba bersih |
|---|---|---|---|
| 0% | Rp 45.000.000 | Rp 0 | Rp 45.000.000 |
| 10% | Rp 40.500.000 | Rp 3.000.000 | Rp 37.500.000 |
| 20% | Rp 36.000.000 | Rp 6.000.000 | Rp 30.000.000 |
| 30% | Rp 31.500.000 | Rp 9.000.000 | **Rp 22.500.000** |

Dari tolak 0% ke 30%, laba bersih tinggal **separuh**. Dua hal terjadi sekaligus: barang tidak terjual, **dan** ongkirnya tetap dibayar dua kali.

COD menaikkan konversi karena menghapus rasa takut pembeli. Yang harus dihitung: apakah kenaikan itu lebih besar daripada biaya penolakan yang ikut datang.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def bayar(gateway, pesanan, jumlah, maks_coba=3):\n    kunci = 'pesanan-' + str(pesanan)   # SAMA tiap percobaan\n    for coba in range(1, maks_coba + 1):\n        try:\n            return gateway.tagih(jumlah, kunci)\n        except TimeoutError:\n            continue                      # 'tidak tahu', bukan 'gagal'\n\n# 5 pesanan, tiap pesanan kena satu timeout:\n#   TANPA kunci   ->  ditarik 10 kali   Rp 1.500.000\n#   DENGAN kunci  ->  ditarik  5 kali   Rp   750.000",
      penjelasan: `Delapan baris yang menentukan apakah pelangganmu akan ditagih dua kali — dan satu baris di antaranya memikul hampir seluruh bebannya.

**Mulai dari cara berpikir yang keliru, karena ia sangat wajar.**

Pemrogram yang terbiasa dengan fungsi lokal memperlakukan panggilan jaringan seperti panggilan fungsi: kalau ia mengembalikan nilai, berhasil; kalau ia melempar galat, gagal. Kalau gagal, coba lagi.

Pada fungsi lokal, anggapan itu benar. Fungsi yang melempar galat memang tidak menyelesaikan pekerjaannya.

Pada panggilan jaringan, anggapan itu **salah**, dan salahnya berbahaya. Ada tiga kemungkinan ketika toko tidak menerima balasan:

- permintaan tidak pernah sampai ke gateway
- permintaan sampai, diproses, **gagal**, dan balasan gagalnya hilang
- permintaan sampai, diproses, **berhasil**, dan balasan berhasilnya hilang

Dari sisi toko, ketiganya terlihat **persis sama**: timeout. Dan kemungkinan ketiga berarti dana pembeli sudah ditarik.

Jadi timeout bukan "gagal". Ia **"tidak tahu"** — dan itu kategori yang berbeda, dengan penanganan yang berbeda.

**Sekarang lihat baris kedua.**

\`kunci = 'pesanan-' + str(pesanan)\`

Kunci dibuat dari id pesanan, **di luar** perulangan. Artinya setiap percobaan ulang untuk pesanan yang sama membawa kunci yang **sama**.

Di sisi gateway, kunci itu disimpan saat permintaan pertama diproses. Ketika permintaan kedua datang dengan kunci yang sama, gateway tidak menarik dana lagi — ia mengembalikan hasil permintaan pertama.

Hasilnya: mencoba ulang menjadi **aman**. Toko boleh mencoba sebanyak apa pun, dan dana cuma ditarik sekali. Itulah arti idempoten: menjalankan sekali atau berkali-kali memberi hasil yang sama.

**Kesalahan yang paling sering: kunci di tempat yang salah.**

Bayangkan barisnya dipindah ke **dalam** perulangan, dan kuncinya dibuat acak:

\`for coba in ...: kunci = uuid4()\`

Kodenya masih terlihat memakai kunci idempotensi. Pemeriksa kode mungkin melihat kata "idempotency key" dan menganggapnya beres.

Tetapi setiap percobaan sekarang membawa kunci **baru**, dan gateway melihatnya sebagai permintaan yang berbeda. Perlindungannya hilang sepenuhnya, dan tidak ada yang terlihat salah.

Ini jenis bug yang paling mahal: kode yang tampak menerapkan pola yang benar, dengan satu detail penempatan yang membatalkan seluruh maknanya.

**Satu hal lagi yang sama pentingnya.**

Setelah semua percobaan habis dan masih timeout, apa status pesanannya?

Jawaban yang benar: **"belum diketahui"** — bukan "gagal". Toko harus menanyakan status ke gateway dengan kunci yang sama, atau menunggu webhook.

Menandai pesanan sebagai gagal lalu menyuruh pembeli membayar ulang adalah cara lain untuk menagih dua kali — cuma lewat jalan yang lebih panjang.`
    },
    {
      bahasa: 'python',
      kode: "def proses_benar(pesan):\n    status, versi, dilihat = None, 0, set()\n    for v, s in pesan:              # v = nomor urut dari gateway\n        if (v, s) in dilihat:\n            continue                # duplikat, abaikan\n        dilihat.add((v, s))\n        if v > versi:               # hanya MAJU, tidak mundur\n            versi, status = v, s\n    return status\n\n# tiba: PAID -> PENDING -> PAID -> REFUNDED\n#   ambil yang terakhir tiba : PENDING setelah webhook ke-2  (SALAH)\n#   pakai nomor urut         : PAID    setelah webhook ke-2",
      penjelasan: `Sembilan baris yang menangani dua sifat webhook yang hampir tidak pernah muncul saat pengujian, dan hampir selalu muncul di produksi.

**Sifat pertama: webhook bisa datang lebih dari sekali.**

Gateway mengirim webhook, lalu menunggu balasan "diterima" dari toko. Kalau balasan itu tidak sampai — karena peladen toko lambat, jaringan terputus, atau toko sedang memuat ulang — gateway **mengirim ulang**.

Ini disengaja. Gateway lebih suka mengirim dua kali daripada tidak mengirim sama sekali, karena pesan yang hilang berarti toko tidak pernah tahu pembayarannya berhasil.

Akibatnya toko harus siap menerima pesan yang sama berkali-kali, dan memprosesnya **seolah sekali**. Itu yang dikerjakan \`dilihat\`: setiap pesan yang sudah diproses dicatat, dan kedatangan berikutnya diabaikan.

Tanpa itu, kiriman ulang webhook PAID bisa memicu pengiriman barang dua kali, atau pengurangan stok dua kali, atau surel terima kasih dua kali.

**Sifat kedua: webhook tidak datang berurutan.**

Ini yang lebih mengejutkan. Gateway mengirim PENDING lebih dulu, lalu PAID. Tetapi keduanya lewat jalur jaringan yang mungkin berbeda, dan antrean pengiriman ulang yang berbeda. PAID bisa tiba **lebih dulu**.

Cara naif — ambil status dari pesan yang terakhir tiba — lalu menyimpulkan pesanan masih PENDING setelah webhook kedua. Toko menahan barang yang sudah lunas.

Baris \`if v > versi\` menyelesaikannya. Status hanya berubah kalau pesan yang datang **lebih baru** dari status yang sudah dipegang, menurut nomor urut dari gateway. PENDING bernomor 1 tidak bisa menimpa PAID bernomor 2, dari mana pun datangnya.

**Kenapa pakai nomor urut dari gateway, bukan waktu tiba.**

Waktu tiba adalah waktu di sisi toko — ia mencatat kapan pesan sampai, bukan kapan kejadiannya. Dan justru itulah yang tidak bisa dipercaya.

Nomor urut atau cap waktu kejadian dibuat **oleh gateway** saat kejadian itu terjadi. Ia tidak berubah seberapa lama pun pesannya tertahan di jalan.

**Sekarang baris terakhir tabel, dan kenapa ia berbahaya.**

Setelah webhook keempat, cara naif memberi REFUNDED — benar. Kalau pengujianmu cuma memeriksa status akhir, cara naif **lolos**.

Itu bentuk bug yang paling licik: kode yang benar karena kebetulan. Ia lolos seluruh pengujian yang ditulis dengan urutan rapi, lalu gagal di produksi pada satu dari seratus pesanan, pada saat jaringan sedang tidak stabil — dan tidak bisa direproduksi ketika dicari.

Pengujian yang benar untuk penerima webhook harus sengaja mengacak urutan dan menggandakan pesan. Kalau pengujianmu tidak melakukan itu, ia tidak menguji hal yang sebenarnya bisa salah.

**Satu hal yang tidak ada di kode ini dan wajib ada di kode sungguhan: verifikasi tanda tangan.** Endpoint webhook terbuka di internet. Tanpa memeriksa tanda tangan dari gateway, siapa pun bisa mengirim pesan PAID palsu dan mendapatkan barang tanpa membayar.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Sistem pembayaran elektronik
# ============================================

def rp(n):
    return "Rp " + f"{int(round(n)):,}".replace(",", ".")

# --------------------------------------------
# 1. Siapa saja yang terlibat dalam satu pembayaran
# --------------------------------------------
print("--- satu klik 'Bayar', lima pihak ---")
PIHAK = [
    ("Pembeli",          "memilih cara bayar, mengisi data"),
    ("Toko (merchant)",  "membuat pesanan, menunggu kabar"),
    ("Payment gateway",  "menerima data, meneruskan, melapor"),
    ("Bank / penerbit",  "memeriksa saldo atau limit, memutuskan"),
    ("Jaringan (switch)", "menyambungkan bank yang berbeda"),
]
for a, b in PIHAK:
    print("  " + a.ljust(19) + b)
print("")
print("  Toko TIDAK berbicara langsung dengan bank. Ia bicara")
print("  dengan gateway, dan gateway yang mengurus sisanya.")
print("")
print("  Akibat penting: 'pembayaran berhasil' datang ke toko")
print("  sebagai PESAN dari gateway -- sering lewat webhook,")
print("  terpisah dari halaman yang dilihat pembeli. Dan pesan")
print("  itu bisa terlambat, dobel, atau tidak datang sama sekali.")

# --------------------------------------------
# 2. Biaya: persen vs tetap
# --------------------------------------------
print("")
print("--- biaya tiap cara bayar (ANGKA CONTOH) ---")
# struktur biaya dibuat mirip yang lazim di pasar, tetapi angkanya
# contoh -- tarif sebenarnya berbeda antar penyedia dan berubah
CARA = [
    ("Virtual account",   0.0,    4000),
    ("QRIS",              0.007,  0),
    ("E-wallet",          0.015,  0),
    ("Kartu kredit",      0.029,  2000),
]
NILAI = [25_000, 100_000, 500_000, 2_000_000]
print("  " + "cara".ljust(18)
      + "".join(("%s" % (f"{n // 1000}rb")).rjust(10) for n in NILAI))
for nama, persen, tetap in CARA:
    baris = ""
    for n in NILAI:
        biaya = n * persen + tetap
        baris += ("%.1f%%" % (biaya / n * 100)).rjust(10)
    print("  " + nama.ljust(18) + baris)
print("")
print("  (angka dalam tabel: biaya sebagai persen nilai belanja)")
print("")
print("  Virtual account berbiaya TETAP, jadi mahal untuk belanja")
print("  kecil dan murah untuk belanja besar. Yang berbiaya")
print("  PERSEN justru sebaliknya.")
print("")
# titik impas VA vs e-wallet
titik = 4000 / 0.015
print("  Titik impas virtual account lawan e-wallet:")
print("    4.000 = 1,5% x nilai  ->  nilai = " + rp(titik))
print("")
print("  Di bawah itu e-wallet lebih murah bagi toko; di atas")
print("  itu virtual account. Toko yang menawarkan semua cara")
print("  bayar tanpa melihat nilai keranjang membayar lebih")
print("  mahal dari yang perlu -- dan tidak pernah menyadarinya,")
print("  karena biayanya dipotong sebelum uang masuk.")

# --------------------------------------------
# 3. Waktu cair: biaya yang tidak terlihat di tarif
# --------------------------------------------
print("")
print("--- kapan uangnya benar-benar masuk ---")
OMZET_HARIAN = 15_000_000
print("  omzet harian: " + rp(OMZET_HARIAN))
print("")
print("  " + "waktu cair".ljust(14) + "uang tertahan".rjust(20))
for hari in (0, 1, 2, 3, 7):
    tertahan = OMZET_HARIAN * hari
    label = "seketika" if hari == 0 else ("T+" + str(hari))
    print("  " + label.ljust(14) + rp(tertahan).rjust(20))
print("")
print("  Dengan pencairan T+7, toko ini selalu punya lebih dari")
print("  seratus juta yang sudah terjual tetapi belum bisa")
print("  dipakai -- untuk belanja stok, gaji, atau iklan.")
print("")
print("  Itu modal kerja yang terkunci, dan untuk usaha kecil ia")
print("  sering lebih menentukan daripada selisih tarif 0,5 persen.")

# --------------------------------------------
# 4. Masalah paling berbahaya: tagihan dobel
# --------------------------------------------
print("")
print("--- kenapa pembayaran harus IDEMPOTEN ---")

class Gateway:
    """Gateway tiruan: kadang memproses tapi balasannya hilang."""
    def __init__(self, pakai_kunci):
        self.pakai_kunci = pakai_kunci
        self.terproses = {}          # kunci -> id transaksi
        self.tagihan = []            # seluruh penarikan dana
        self.hitung = 0

    def tagih(self, jumlah, kunci):
        self.hitung += 1
        if self.pakai_kunci and kunci in self.terproses:
            return self.terproses[kunci], True   # tidak menarik lagi
        idt = "TRX" + str(len(self.tagihan) + 1)
        self.tagihan.append((idt, jumlah))
        if self.pakai_kunci:
            self.terproses[kunci] = idt
        # permintaan pertama tiap pesanan: diproses, balasan HILANG
        if self.hitung % 2 == 1:
            raise TimeoutError("balasan tidak sampai")
        return idt, False

def bayar(gateway, pesanan, jumlah, maks_coba=3):
    kunci = "pesanan-" + str(pesanan)
    for coba in range(1, maks_coba + 1):
        try:
            idt, ulang = gateway.tagih(jumlah, kunci)
            return idt, coba
        except TimeoutError:
            continue
    return None, maks_coba

for nama, pakai in (("TANPA kunci idempotensi", False),
                    ("DENGAN kunci idempotensi", True)):
    g = Gateway(pakai)
    for p in range(1, 6):
        bayar(g, p, 150_000)
    total = sum(j for _, j in g.tagihan)
    print("  " + nama)
    print("      5 pesanan @ Rp 150.000, tiap pesanan kena satu")
    print("      timeout lalu dicoba ulang")
    print("      penarikan dana : " + str(len(g.tagihan)) + " kali")
    print("      total ditarik  : " + rp(total)
          + "  (seharusnya " + rp(5 * 150_000) + ")")
    print("")
print("  Timeout TIDAK berarti gagal. Ia berarti 'tidak tahu'.")
print("  Permintaannya mungkin sudah diproses, dan yang hilang")
print("  cuma balasannya.")
print("")
print("  Mencoba ulang tanpa kunci membuat setiap timeout menjadi")
print("  tagihan kedua. Dengan kunci -- dibuat dari id pesanan,")
print("  bukan acak tiap percobaan -- gateway mengenali permintaan")
print("  yang sama dan mengembalikan hasil yang pertama.")

# --------------------------------------------
# 5. Webhook datang dobel dan tidak berurutan
# --------------------------------------------
print("")
print("--- webhook: jangan percaya urutan kedatangannya ---")
# urutan kejadian sebenarnya, lalu urutan webhook yang sampai
KEJADIAN = [(1, "PENDING"), (2, "PAID"), (3, "REFUNDED")]
DATANG = [(2, "PAID"), (1, "PENDING"), (2, "PAID"), (3, "REFUNDED")]

def proses_naif(pesan):
    status = None
    for _, s in pesan:
        status = s
    return status

def proses_benar(pesan):
    status, versi, dilihat = None, 0, set()
    for v, s in pesan:
        if (v, s) in dilihat:
            continue            # duplikat, abaikan
        dilihat.add((v, s))
        if v > versi:           # hanya maju, tidak mundur
            versi, status = v, s
    return status

print("  urutan kejadian sebenarnya : "
      + " -> ".join(s for _, s in KEJADIAN))
print("  urutan webhook tiba        : "
      + " -> ".join(s for _, s in DATANG))
print("")
print("  " + "setelah webhook ke-".ljust(21) + "tiba".ljust(11)
      + "cara naif".ljust(12) + "nomor urut")
for k in range(1, len(DATANG) + 1):
    naif = proses_naif(DATANG[:k])
    benar = proses_benar(DATANG[:k])
    tanda = "   <- SALAH" if naif != benar else ""
    print("  " + str(k).ljust(21) + DATANG[k - 1][1].ljust(11)
          + naif.ljust(12) + benar + tanda)
print("")
print("  Pada webhook kedua, cara naif menyimpulkan pesanan masih")
print("  PENDING, padahal sudah dibayar -- karena webhook PENDING")
print("  kebetulan tiba SESUDAH webhook PAID. Toko menahan barang")
print("  yang sudah lunas, dan pembeli menulis ulasan bintang satu.")
print("")
print("  Perhatikan juga baris terakhir: cara naif akhirnya BENAR,")
print("  tetapi cuma karena webhook terakhir kebetulan juga")
print("  kejadian terakhir. Kode yang benar karena kebetulan akan")
print("  lolos pengujian dan gagal di produksi.")
print("")
print("  Aturannya: status hanya boleh MAJU, dan webhook yang")
print("  sudah pernah diproses diabaikan. Keduanya butuh nomor")
print("  urut atau waktu kejadian dari gateway, bukan waktu tiba.")

# --------------------------------------------
# 6. Yang disimpan toko: token, bukan nomor kartu
# --------------------------------------------
print("")
print("--- tokenisasi: toko tidak menyimpan nomor kartu ---")
DISIMPAN = [
    ("Nomor kartu lengkap", "TIDAK", "dipegang gateway saja"),
    ("CVV",                 "TIDAK", "tidak boleh disimpan siapa pun"),
    ("Token",               "ya",    "tidak berguna di luar toko ini"),
    ("4 angka terakhir",    "ya",    "untuk ditampilkan ke pembeli"),
    ("Merek kartu",         "ya",    "untuk ditampilkan ke pembeli"),
]
for a, b, c in DISIMPAN:
    print("  " + a.ljust(21) + b.ljust(7) + c)
print("")
print("  Token cuma berarti bagi gateway yang menerbitkannya,")
print("  untuk toko yang memintanya. Kalau basis data toko")
print("  bocor, token itu tidak bisa dipakai belanja di tempat")
print("  lain.")
print("")
print("  Dan ini bukan cuma soal keamanan. Toko yang menyimpan")
print("  nomor kartu sendiri terkena seluruh kewajiban standar")
print("  PCI DSS -- audit, pemindaian, dan biaya yang tidak")
print("  sebanding untuk usaha kecil. Menyerahkannya ke gateway")
print("  memindahkan sebagian besar beban itu.")

# --------------------------------------------
# 7. Retur, refund, dan COD
# --------------------------------------------
print("")
print("--- biaya bayar di tempat (COD) yang tidak terlihat ---")
PESANAN = 1000
NILAI_RATA = 180_000
MARJIN = 0.25
ONGKIR = 15_000
print("  " + str(PESANAN) + " pesanan, nilai rata-rata " + rp(NILAI_RATA)
      + ", marjin " + ("%.0f%%" % (MARJIN * 100)))
print("  ongkir pergi-pulang ditanggung toko bila barang ditolak")
print("")
print("  " + "tingkat tolak".rjust(14) + "laba kotor".rjust(16)
      + "rugi ongkir".rjust(15) + "laba bersih".rjust(16))
for tolak in (0.00, 0.05, 0.10, 0.20, 0.30):
    diterima = PESANAN * (1 - tolak)
    laba = diterima * NILAI_RATA * MARJIN
    rugi = PESANAN * tolak * ONGKIR * 2
    print("  " + ("%.0f%%" % (tolak * 100)).rjust(14)
          + rp(laba).rjust(16) + rp(rugi).rjust(15)
          + rp(laba - rugi).rjust(16))
print("")
bersih0 = PESANAN * NILAI_RATA * MARJIN
bersih30 = (PESANAN * 0.7 * NILAI_RATA * MARJIN
            - PESANAN * 0.3 * ONGKIR * 2)
print("  Dari tolak 0% ke 30%, laba bersih turun dari "
      + rp(bersih0))
print("  ke " + rp(bersih30) + " -- tinggal "
      + ("%.0f%%" % (bersih30 / bersih0 * 100)) + ". Separuhnya hilang")
print("  karena dua hal sekaligus: barang tidak terjual, DAN")
print("  ongkirnya tetap dibayar dua kali. Itu belum menghitung")
print("  barang yang rusak di jalan dan waktu mengurusnya.")
print("")
print("  COD menaikkan konversi karena menghapus rasa takut")
print("  pembeli. Yang harus dihitung: apakah kenaikan itu lebih")
print("  besar daripada biaya penolakan yang ikut datang.")` },
  output: `--- satu klik 'Bayar', lima pihak ---
  Pembeli            memilih cara bayar, mengisi data
  Toko (merchant)    membuat pesanan, menunggu kabar
  Payment gateway    menerima data, meneruskan, melapor
  Bank / penerbit    memeriksa saldo atau limit, memutuskan
  Jaringan (switch)  menyambungkan bank yang berbeda

  Toko TIDAK berbicara langsung dengan bank. Ia bicara
  dengan gateway, dan gateway yang mengurus sisanya.

  Akibat penting: 'pembayaran berhasil' datang ke toko
  sebagai PESAN dari gateway -- sering lewat webhook,
  terpisah dari halaman yang dilihat pembeli. Dan pesan
  itu bisa terlambat, dobel, atau tidak datang sama sekali.

--- biaya tiap cara bayar (ANGKA CONTOH) ---
  cara                    25rb     100rb     500rb    2000rb
  Virtual account        16.0%      4.0%      0.8%      0.2%
  QRIS                    0.7%      0.7%      0.7%      0.7%
  E-wallet                1.5%      1.5%      1.5%      1.5%
  Kartu kredit           10.9%      4.9%      3.3%      3.0%

  (angka dalam tabel: biaya sebagai persen nilai belanja)

  Virtual account berbiaya TETAP, jadi mahal untuk belanja
  kecil dan murah untuk belanja besar. Yang berbiaya
  PERSEN justru sebaliknya.

  Titik impas virtual account lawan e-wallet:
    4.000 = 1,5% x nilai  ->  nilai = Rp 266.667

  Di bawah itu e-wallet lebih murah bagi toko; di atas
  itu virtual account. Toko yang menawarkan semua cara
  bayar tanpa melihat nilai keranjang membayar lebih
  mahal dari yang perlu -- dan tidak pernah menyadarinya,
  karena biayanya dipotong sebelum uang masuk.

--- kapan uangnya benar-benar masuk ---
  omzet harian: Rp 15.000.000

  waktu cair           uang tertahan
  seketika                      Rp 0
  T+1                  Rp 15.000.000
  T+2                  Rp 30.000.000
  T+3                  Rp 45.000.000
  T+7                 Rp 105.000.000

  Dengan pencairan T+7, toko ini selalu punya lebih dari
  seratus juta yang sudah terjual tetapi belum bisa
  dipakai -- untuk belanja stok, gaji, atau iklan.

  Itu modal kerja yang terkunci, dan untuk usaha kecil ia
  sering lebih menentukan daripada selisih tarif 0,5 persen.

--- kenapa pembayaran harus IDEMPOTEN ---
  TANPA kunci idempotensi
      5 pesanan @ Rp 150.000, tiap pesanan kena satu
      timeout lalu dicoba ulang
      penarikan dana : 10 kali
      total ditarik  : Rp 1.500.000  (seharusnya Rp 750.000)

  DENGAN kunci idempotensi
      5 pesanan @ Rp 150.000, tiap pesanan kena satu
      timeout lalu dicoba ulang
      penarikan dana : 5 kali
      total ditarik  : Rp 750.000  (seharusnya Rp 750.000)

  Timeout TIDAK berarti gagal. Ia berarti 'tidak tahu'.
  Permintaannya mungkin sudah diproses, dan yang hilang
  cuma balasannya.

  Mencoba ulang tanpa kunci membuat setiap timeout menjadi
  tagihan kedua. Dengan kunci -- dibuat dari id pesanan,
  bukan acak tiap percobaan -- gateway mengenali permintaan
  yang sama dan mengembalikan hasil yang pertama.

--- webhook: jangan percaya urutan kedatangannya ---
  urutan kejadian sebenarnya : PENDING -> PAID -> REFUNDED
  urutan webhook tiba        : PAID -> PENDING -> PAID -> REFUNDED

  setelah webhook ke-  tiba       cara naif   nomor urut
  1                    PAID       PAID        PAID
  2                    PENDING    PENDING     PAID   <- SALAH
  3                    PAID       PAID        PAID
  4                    REFUNDED   REFUNDED    REFUNDED

  Pada webhook kedua, cara naif menyimpulkan pesanan masih
  PENDING, padahal sudah dibayar -- karena webhook PENDING
  kebetulan tiba SESUDAH webhook PAID. Toko menahan barang
  yang sudah lunas, dan pembeli menulis ulasan bintang satu.

  Perhatikan juga baris terakhir: cara naif akhirnya BENAR,
  tetapi cuma karena webhook terakhir kebetulan juga
  kejadian terakhir. Kode yang benar karena kebetulan akan
  lolos pengujian dan gagal di produksi.

  Aturannya: status hanya boleh MAJU, dan webhook yang
  sudah pernah diproses diabaikan. Keduanya butuh nomor
  urut atau waktu kejadian dari gateway, bukan waktu tiba.

--- tokenisasi: toko tidak menyimpan nomor kartu ---
  Nomor kartu lengkap  TIDAK  dipegang gateway saja
  CVV                  TIDAK  tidak boleh disimpan siapa pun
  Token                ya     tidak berguna di luar toko ini
  4 angka terakhir     ya     untuk ditampilkan ke pembeli
  Merek kartu          ya     untuk ditampilkan ke pembeli

  Token cuma berarti bagi gateway yang menerbitkannya,
  untuk toko yang memintanya. Kalau basis data toko
  bocor, token itu tidak bisa dipakai belanja di tempat
  lain.

  Dan ini bukan cuma soal keamanan. Toko yang menyimpan
  nomor kartu sendiri terkena seluruh kewajiban standar
  PCI DSS -- audit, pemindaian, dan biaya yang tidak
  sebanding untuk usaha kecil. Menyerahkannya ke gateway
  memindahkan sebagian besar beban itu.

--- biaya bayar di tempat (COD) yang tidak terlihat ---
  1000 pesanan, nilai rata-rata Rp 180.000, marjin 25%
  ongkir pergi-pulang ditanggung toko bila barang ditolak

   tingkat tolak      laba kotor    rugi ongkir     laba bersih
              0%   Rp 45.000.000           Rp 0   Rp 45.000.000
              5%   Rp 42.750.000   Rp 1.500.000   Rp 41.250.000
             10%   Rp 40.500.000   Rp 3.000.000   Rp 37.500.000
             20%   Rp 36.000.000   Rp 6.000.000   Rp 30.000.000
             30%   Rp 31.500.000   Rp 9.000.000   Rp 22.500.000

  Dari tolak 0% ke 30%, laba bersih turun dari Rp 45.000.000
  ke Rp 22.500.000 -- tinggal 50%. Separuhnya hilang
  karena dua hal sekaligus: barang tidak terjual, DAN
  ongkirnya tetap dibayar dua kali. Itu belum menghitung
  barang yang rusak di jalan dan waktu mengurusnya.

  COD menaikkan konversi karena menghapus rasa takut
  pembeli. Yang harus dihitung: apakah kenaikan itu lebih
  besar daripada biaya penolakan yang ikut datang.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Periksa kunci idempotensi di gateway', waktu: 'O(1)', memori: 'satu pencarian di tabel hash' },
      { operasi: 'Proses satu webhook', waktu: 'O(1)', memori: 'simpan id webhook yang sudah diproses' },
      { operasi: 'Hitung biaya tiap cara bayar', waktu: 'O(c)', memori: 'c = jumlah cara bayar' },
      { operasi: 'Hitung titik impas dua struktur biaya', waktu: 'O(1)', memori: 'satu pembagian' },
      { operasi: 'Simpan catatan idempotensi', waktu: 'O(n) ruang', memori: 'bisa dibuang setelah masa berlaku lewat' }
    ],
    intuisi: `Seluruh pelindung di topik ini murah secara komputasi — satu pencarian di tabel hash per permintaan. Tidak ada alasan performa untuk tidak memasangnya.

Satu-satunya biaya nyata adalah **ruang** untuk menyimpan kunci idempotensi dan id webhook yang sudah diproses. Biaya itu dibatasi dengan masa berlaku: kunci cukup disimpan selama percobaan ulang masih mungkin terjadi — beberapa jam sampai beberapa hari — lalu dibuang.

Bandingkan dengan biaya tidak memasangnya: setiap tagihan dobel berarti pengembalian dana, biaya transaksi yang hilang, keluhan, dan pelanggan yang tidak kembali. Satu kejadian pun sudah jauh lebih mahal daripada seluruh tabel hash itu.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap timeout pada permintaan pembayaran sebagai kegagalan lalu mencoba ulang begitu saja.',
      kenapa: 'Timeout berarti balasannya tidak sampai, sementara permintaannya mungkin sudah diproses dan dana sudah ditarik. Mencoba ulang tanpa perlindungan mengubah setiap timeout seperti itu menjadi tagihan kedua.',
      benar: 'Perlakukan timeout sebagai status tidak diketahui, pakai kunci idempotensi, dan tanyakan status ke gateway sebelum menyatakan gagal.'
    },
    {
      salah: 'Membangkitkan kunci idempotensi acak baru di setiap percobaan ulang.',
      kenapa: 'Gateway mengenali permintaan yang sama dari kuncinya, sehingga kunci yang berbeda tiap percobaan membuat setiap percobaan dianggap permintaan baru. Kodenya tampak menerapkan pola yang benar sementara perlindungannya hilang seluruhnya.',
      benar: 'Bentuk kunci dari id pesanan atau buat sekali sebelum perulangan, lalu pakai kunci yang sama untuk seluruh percobaan.'
    },
    {
      salah: 'Menentukan status pesanan dari webhook yang terakhir tiba.',
      kenapa: 'Webhook bisa tiba dengan urutan yang berbeda dari urutan kejadiannya, sehingga status lama bisa menimpa status baru. Pesanan yang sudah lunas bisa tercatat belum dibayar karena pesan PENDING tertahan lebih lama di jalan.',
      benar: 'Pakai nomor urut atau waktu kejadian dari gateway, dan izinkan status hanya bergerak maju.'
    },
    {
      salah: 'Memproses setiap webhook yang datang tanpa memeriksa apakah sudah pernah diproses.',
      kenapa: 'Gateway sengaja mengirim ulang webhook bila balasan penerimaannya tidak sampai, sehingga pesan yang sama bisa datang berkali-kali. Tanpa pemeriksaan, pengiriman barang atau pengurangan stok bisa terjadi dua kali.',
      benar: 'Simpan id setiap webhook yang sudah diproses dan abaikan kedatangan berikutnya dengan id yang sama.'
    },
    {
      salah: 'Menerima webhook tanpa memverifikasi tanda tangannya.',
      kenapa: 'Endpoint webhook terbuka di internet, sehingga tanpa verifikasi siapa pun bisa mengirim pesan pembayaran berhasil yang palsu. Toko lalu mengirim barang untuk pesanan yang tidak pernah dibayar.',
      benar: 'Periksa tanda tangan setiap webhook dengan kunci rahasia dari gateway sebelum memprosesnya, dan tolak yang tidak cocok.'
    },
    {
      salah: 'Menandai pesanan lunas karena pembeli sampai di halaman terima kasih.',
      kenapa: 'Halaman itu bisa dibuka langsung tanpa pembayaran, dan sebaliknya pembeli yang sudah membayar bisa menutup peramban sebelum dialihkan kembali. Keduanya membuat status pesanan salah.',
      benar: 'Tentukan status dari webhook terverifikasi atau dari pertanyaan langsung ke gateway, dan jadikan halaman terima kasih sekadar tampilan.'
    },
    {
      salah: 'Menyimpan nomor kartu pelanggan di basis data toko supaya pembelian berikutnya lebih cepat.',
      kenapa: 'Nomor kartu yang tersimpan menjadi sasaran bernilai tinggi bila basis data bocor, dan penyimpanannya membawa seluruh kewajiban PCI DSS yang mahal untuk usaha kecil. Manfaat kecepatan yang sama bisa didapat tanpa risiko itu.',
      benar: 'Simpan token dari gateway beserta empat angka terakhir dan merek kartu, dan biarkan nomor lengkapnya hanya dipegang gateway.'
    }
  ],

  analogi: `Bayangkan kamu **menitip uang lewat kurir** untuk membayar utang ke temanmu di kota lain.

Kurir berangkat. Kamu menunggu kabar. Seharian tidak ada kabar.

Apa yang terjadi? Mungkin kurirnya tidak jadi berangkat. Mungkin uangnya sudah sampai tetapi kurirnya lupa mengabari. Mungkin uangnya sudah sampai dan kurirnya sudah mengabari, tetapi pesannya tidak sampai ke kamu.

Dari tempatmu duduk, ketiganya terlihat sama: **tidak ada kabar**.

Sekarang, kamu mengirim uang lagi lewat kurir kedua?

Kalau uang pertama ternyata sudah sampai, temanmu sekarang menerima dua kali. Mungkin ia jujur dan mengembalikan. Mungkin tidak.

Cara yang benar: kirim ulang dengan **catatan yang sama** — "pembayaran utang bulan Maret, nomor 17". Temanmu yang sudah menerima nomor 17 cukup menjawab "sudah kuterima, ini tanda terimanya", tanpa menerima uang kedua.

Catatan bernomor itulah kunci idempotensi. Dan perhatikan: catatannya harus **sama persis** di pengiriman kedua. Kalau kamu menulis "nomor 18" di pengiriman ulang, temanmu tidak tahu itu pembayaran yang sama.

**Sekarang soal kabar yang datang terbalik.**

Temanmu mengirim dua pesan lewat dua kurir berbeda: pagi hari *"uangnya belum sampai"*, sore hari *"uangnya sudah sampai, terima kasih"*.

Kurir sore ternyata lebih cepat. Pesan sore tiba lebih dulu, pesan pagi tiba belakangan.

Kalau kamu cuma percaya pesan yang **terakhir kamu terima**, kamu akan menyimpulkan uangnya belum sampai — dan mengirim lagi.

Yang benar: lihat **jam yang ditulis di suratnya**, bukan jam suratnya kamu terima. Surat berjam lebih awal tidak boleh menimpa surat berjam lebih akhir, kapan pun ia tiba.

**Terakhir, soal nomor kartu.**

Kamu tidak memberi temanmu **kunci brankasmu** supaya ia bisa mengambil uang sendiri setiap bulan. Kamu memberinya **kupon** yang cuma bisa dicairkan di bank tertentu, untuk jumlah tertentu, oleh dia saja.

Kalau kupon itu hilang atau dicuri, orang lain tidak bisa memakainya. Kalau kunci brankas yang hilang, seluruh isinya ikut hilang.

Token dari gateway adalah kupon. Nomor kartu adalah kunci brankas.`,

  latihan: [
    'Gambar alur satu pembayaran kartu dari klik pembeli sampai dana cair, lengkap dengan kelima pihaknya.',
    'Hitung biaya tiga cara bayar sebagai persen untuk lima nilai keranjang, lalu tentukan titik impas antara cara berbiaya tetap dan berbiaya persen.',
    'Hitung uang yang tertahan untuk pencairan T+1, T+3, dan T+7 pada omzet usahamu atau usaha contoh.',
    'Jelaskan tiga kemungkinan yang terjadi di balik satu timeout pembayaran, dan kenapa ketiganya tidak bisa dibedakan dari sisi toko.',
    'Tulis fungsi pembayaran dengan kunci idempotensi, lalu buktikan dengan gateway tiruan bahwa mencoba ulang tidak menarik dana dua kali.',
    'Pindahkan pembuatan kunci ke dalam perulangan dan buat acak, lalu tunjukkan bahwa perlindungannya hilang.',
    'Tulis penerima webhook yang mengabaikan duplikat dan hanya membiarkan status maju, lalu uji dengan urutan kedatangan yang diacak.',
    'Tunjukkan satu urutan kedatangan webhook yang membuat cara naif salah di tengah tetapi benar di akhir, lalu jelaskan kenapa pengujian status akhir saja tidak cukup.',
    'Daftar data kartu yang disimpan dan tidak disimpan oleh toko yang memakai tokenisasi, beserta alasannya.',
    'Hitung laba bersih COD untuk empat tingkat penolakan, lalu tentukan kenaikan konversi minimum yang dibutuhkan agar COD layak.'
  ]
});


TOPICS.push({
  id: 'ecom-persediaan',
  judul: 'Rantai Pasok & Persediaan: EOQ, Stok Pengaman, Efek Cambuk',
  kategori: 'ecommerce',
  tag: ['rantai pasok', 'persediaan', 'EOQ', 'stok pengaman', 'titik pesan ulang', 'tingkat layanan', 'efek cambuk'],
  ringkas: 'Meleset 20 persen dari jumlah pesan optimal cuma menambah biaya 2 persen — tetapi goyangan kecil di kasir bisa menjadi sembilan kali lipat di pabrik.',

  fungsi: `**Memutuskan berapa banyak memesan, kapan memesan, dan berapa cadangan yang layak — dengan hitungan, bukan firasat.**

Terpakai di:

- **Toko daring yang menyimpan stok sendiri** — setiap barang yang habis adalah penjualan yang hilang, dan setiap barang yang menumpuk adalah uang yang terkunci
- **Membangun fitur manajemen stok** di aplikasi kasir atau sistem gudang: titik pesan ulang dan peringatan stok minimum
- **Memilih antara stok sendiri dan dropship** dengan membandingkan biaya penyimpanan
- **Tugas akhir** sistem informasi persediaan — EOQ dan titik pesan ulang hampir selalu diminta di bab perhitungan
- **Berbagi data** dengan pemasok supaya rantai pasok tidak bergoyang berlebihan

Yang paling menenangkan dari bab ini: **EOQ tidak harus tepat.** Dasar kurva biayanya landai — meleset 20 persen cuma menambah biaya sekitar 2 persen. Jadi taksiran kasar sudah cukup, dan jumlahnya boleh dibulatkan ke ukuran kemasan.

Dan yang paling mengejutkan: **efek cambuk.** Penjualan yang bergoyang tipis di kasir bisa menjadi pesanan yang bergoyang sembilan kali lebih liar di pabrik — tanpa satu pun pihak yang bereaksi berlebihan.`,
  praktik: {
    tujuan: 'Kamu bisa menghitung EOQ, stok pengaman, dan titik pesan ulang untuk barang nyata, memverifikasi tingkat layanannya dengan simulasi, dan menjelaskan efek cambuk beserta obatnya.',
    alat: ['Data penjualan harian satu barang, minimal beberapa minggu', 'Informasi biaya pesan, biaya simpan, dan lama tunggu dari pemasok', 'Python atau spreadsheet'],
    langkah: [
      { judul: 'Kumpulkan tiga angka biaya',
        isi: `**D**: permintaan setahun. **S**: biaya sekali pesan — ongkir, administrasi, waktu orang mengurusnya. **H**: biaya menyimpan satu unit setahun — sewa tempat, modal yang terkunci, risiko rusak atau usang.

H paling sering diremehkan. Modal yang terkunci dalam stok adalah uang yang tidak bisa dipakai untuk hal lain, dan itu biaya nyata walau tidak ada tagihannya.` },
      { judul: 'Hitung EOQ dan periksa keseimbangannya',
        isi: `\`EOQ = akar(2DS / H)\`. Lalu hitung biaya pesan dan biaya simpan di titik itu.

Keduanya harus **sama besar**. Kalau tidak sama, ada salah hitung — ini pemeriksaan termurah untuk angkamu sendiri.` },
      { judul: 'Bulatkan tanpa takut',
        isi: `Hitung total biaya untuk 80% dan 120% EOQ. Selisihnya cuma sekitar 2 persen.

Jadi bulatkan ke ukuran karton, palet, atau kelipatan minimum pemasok. Memaksakan angka EOQ yang ganjil sering justru lebih mahal karena kemasan tidak penuh.` },
      { judul: 'Ukur penyimpangan permintaan, bukan cuma rata-ratanya',
        isi: `Dari data harian, hitung rata-rata **dan** simpangan bakunya. Catat juga lama tunggu dari pemasok.

Stok pengaman menanggung **penyimpangan**. Dua barang dengan rata-rata sama tetapi yang satu bergoyang liar butuh stok pengaman yang jauh berbeda.` },
      { judul: 'Pilih tingkat layanan, lalu hitung titik pesan ulang',
        isi: `\`stok pengaman = z x simpangan x akar(lama tunggu)\` dan \`titik pesan ulang = rata-rata x lama tunggu + stok pengaman\`.

Pilih tingkat layanan per barang. Barang laris yang kehabisannya membuat pelanggan pindah toko layak 95 atau 99 persen; barang pelengkap cukup 80 atau 90 persen.` },
      { judul: 'Verifikasi dengan simulasi',
        isi: `Bangkitkan permintaan acak dengan rata-rata dan simpangan yang sama, jalankan ribuan siklus, lalu hitung berapa persen yang tidak kehabisan stok.

Kalau hasilnya jauh dari target, ada yang salah — entah rumusnya, entah anggapan bahwa permintaannya berdistribusi normal.` },
      { judul: 'Bedakan dua jenis tingkat layanan',
        isi: `"Layanan 95 persen" di rumus ini berarti 95 dari 100 **siklus pesan ulang** tidak kehabisan stok — bukan 95 persen **pembeli** terlayani.

Yang kedua biasanya jauh lebih tinggi, karena kehabisan stok biasanya cuma sebentar di akhir siklus. Menyebut yang satu dengan nama yang lain membuat laporan menyesatkan.` },
      { judul: 'Bagikan data penjualan ke pemasok',
        isi: `Kalau pemasokmu cuma melihat pesananmu, ia melihat angka yang sudah bergoyang karena keputusan berjagamu. Kalau ia melihat penjualan harianmu, ia melihat permintaan yang sebenarnya.

Itu obat efek cambuk yang paling murah, dan sering cukup dengan berbagi satu laporan mingguan.` }
    ],
    cek: [
      'Di EOQ hitunganmu, biaya pesan dan biaya simpan sama besar',
      'Stok pengamanmu dihitung dari simpangan permintaan, bukan persen tetap dari rata-rata',
      'Simulasimu memberi tingkat layanan yang dekat dengan target',
      'Kamu bisa menjelaskan beda layanan per siklus dan layanan per pembeli'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — lembah yang landai, dan cambuk yang membesar',

  konsep: `Setiap toko yang menyimpan barang menghadapi dua ketakutan yang berlawanan: kehabisan, dan kelebihan. Bab ini mengubah kedua ketakutan itu menjadi hitungan.

**Dua biaya yang saling tarik**

Permintaan 3.600 unit setahun, biaya sekali pesan Rp 150.000, biaya simpan Rp 12.000 per unit per tahun:

| Sekali pesan | Biaya pesan | Biaya simpan | Total |
|---|---|---|---|
| 50 unit | Rp 10.800.000 | Rp 300.000 | Rp 11.100.000 |
| 100 unit | Rp 5.400.000 | Rp 600.000 | Rp 6.000.000 |
| 200 unit | Rp 2.700.000 | Rp 1.200.000 | Rp 3.900.000 |
| **300 unit** | Rp 1.800.000 | Rp 1.800.000 | **Rp 3.600.000** |
| 600 unit | Rp 900.000 | Rp 3.600.000 | Rp 4.500.000 |
| 1.200 unit | Rp 450.000 | Rp 7.200.000 | Rp 7.650.000 |

Pesan sedikit-sedikit: ongkir dan administrasi menumpuk. Pesan sekaligus banyak: gudang penuh, modal terkunci, barang berisiko usang. Ada titik di tengah.

**EOQ: titik terendahnya bisa dihitung**

\`EOQ = akar(2DS / H) = akar(2 x 3600 x 150000 / 12000) = 300 unit\`

Pesan 300 unit sekali, 12 kali setahun, total biaya Rp 3.600.000.

Perhatikan bahwa di titik itu **biaya pesan dan biaya simpan sama besar** — masing-masing Rp 1.800.000. Itu bukan kebetulan: turunan total biaya bernilai nol tepat ketika keduanya seimbang. Dan itu memberi pemeriksaan gratis — kalau di hitunganmu keduanya tidak sama, ada yang salah.

**Dasar lembahnya landai**

| Pesan | Terhadap EOQ | Total | Lebih mahal |
|---|---|---|---|
| 150 | 50% | Rp 4.500.000 | +25,0% |
| 240 | 80% | Rp 3.690.000 | **+2,5%** |
| 300 | 100% | Rp 3.600.000 | — |
| 360 | 120% | Rp 3.660.000 | **+1,7%** |
| 600 | 200% | Rp 4.500.000 | +25,0% |

Meleset 20 persen ke arah mana pun cuma menambah biaya sekitar **2 persen**.

Akibatnya dua hal, keduanya melegakan. **Pertama**, EOQ boleh dibulatkan ke ukuran karton atau palet tanpa rugi berarti. **Kedua**, taksiran D, S, dan H yang kasar sudah cukup — kesalahan masukan teredam oleh akar kuadrat di rumusnya. Menggandakan taksiran S cuma menaikkan EOQ sekitar 41 persen.

**Kapan memesan: stok pengaman**

Permintaan harian rata-rata 10 dengan simpangan baku 4, lama tunggu 5 hari:

| Tingkat layanan | z | Stok pengaman | Titik pesan ulang | Biaya simpan ekstra |
|---|---|---|---|---|
| 50% | 0,00 | 0 | 50 | Rp 0 |
| 80% | 0,84 | 8 | 58 | Rp 90.158 |
| 90% | 1,28 | 11 | 61 | Rp 137.384 |
| 95% | 1,65 | 15 | 65 | Rp 176.560 |
| 99% | 2,33 | 21 | 71 | Rp 250.082 |

\`titik pesan ulang = rata-rata x lama tunggu + stok pengaman\`

\`stok pengaman = z x simpangan x akar(lama tunggu)\`

Stok pengaman menanggung **penyimpangan**, bukan rata-rata. Tanpa stok pengaman, layanannya cuma 50 persen — separuh siklus kehabisan, karena permintaan selama menunggu melebihi rata-rata separuh dari waktu.

Dan perhatikan kenaikannya: dari 95 ke 99 persen, stok pengamannya naik sekitar **40 persen**. Tiap tambahan kepastian makin mahal — dan 100 persen tidak ada harganya, karena ekor sebarannya tidak berujung.

**Verifikasi dengan simulasi**

| Target | Simulasi 2.000 siklus |
|---|---|
| 80% | 79,8% |
| 90% | 89,3% |
| 95% | 95,4% |
| 99% | 99,0% |

Simulasinya mendekati target di setiap baris. Selisih kecil wajar: permintaan tidak mungkin negatif, jadi sebarannya sedikit terpotong di sisi kiri.

Satu pembedaan yang sering dikacaukan: layanan 95 persen di sini berarti 95 dari 100 **siklus pesan ulang** tidak kehabisan stok — **bukan** 95 persen pembeli terlayani. Yang kedua biasanya jauh lebih tinggi, karena kehabisan biasanya terjadi sebentar saja di akhir siklus.

**Efek cambuk: goyangan membesar ke hulu**

Penjualan ke pembeli bergoyang tipis di sekitar 100 unit per minggu. Tiap tingkat di atasnya memesan sebesar permintaan yang ia lihat, ditambah **separuh** dari kenaikan yang ia lihat di atas rata-rata terakhir — sekadar berjaga.

| Aliran pesanan | Rata-rata | Simpangan | Ragam, kali lipat |
|---|---|---|---|
| Pembeli ke toko | 100 | 8,0 | 1,0x |
| Toko ke distributor | 101 | 11,4 | 2,0x |
| Distributor ke grosir | 101 | 16,5 | 4,2x |
| Grosir ke pabrik | 101 | 24,0 | **8,9x** |

Rata-ratanya nyaris sama di setiap tingkat — tidak ada yang memesan lebih banyak dalam jangka panjang. Tetapi **goyangannya** membesar berlipat ke hulu.

Yang paling penting dari tabel ini: **tidak ada satu tingkat pun yang bereaksi berlebihan.** Masing-masing cuma menambah separuh dari kenaikan yang dilihatnya. Pelipatan itu muncul dari **rantainya**, bukan dari satu keputusan yang buruk.

Dan itu sebabnya obatnya bukan meramal lebih pintar di tiap tingkat — setiap tingkat sudah berperilaku wajar. Obatnya **berbagi data penjualan yang sebenarnya ke hulu**, supaya pabrik tidak menebak permintaan dari pesanan grosir yang sudah bergoyang.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\nD, S, H = 3600, 150_000, 12_000\n\neoq = math.sqrt(2 * D * S / H)          # 300 unit\n\n# di EOQ: biaya pesan = biaya simpan = Rp 1.800.000\n#\n#   pesan   vs EOQ    lebih mahal\n#    240      80%       +2,5%\n#    300     100%        0\n#    360     120%       +1,7%\n#    600     200%      +25,0%\n#\n# Meleset 20% -> cuma ~2% lebih mahal.",
      penjelasan: `Satu rumus dengan akar kuadrat, dan akar kuadrat itulah yang membuatnya jauh lebih berguna daripada kelihatannya.

**Dari mana rumusnya.** Total biaya setahun adalah jumlah dua bagian:

- **biaya pesan** = berapa kali memesan x biaya sekali pesan = \`(D/Q) x S\`
- **biaya simpan** = stok rata-rata x biaya simpan per unit = \`(Q/2) x H\`

Stok rata-rata \`Q/2\` karena stok turun dari Q ke nol secara merata sepanjang siklus, lalu naik lagi ke Q saat kiriman datang.

Bagian pertama **turun** kalau Q membesar — makin jarang memesan. Bagian kedua **naik** — makin banyak yang disimpan. Jumlahnya membentuk lembah, dan dasar lembah itu ada di titik ketika kemiringan keduanya saling membatalkan.

Menurunkan dan menyamakan dengan nol memberi \`Q = akar(2DS/H)\` — dan sekaligus memberi sifat yang lebih mudah diingat: **di dasar lembah, kedua biaya sama besar.**

**Sekarang kenapa akar kuadrat itu penting secara praktis.**

Lihat tabelnya. Meleset 20 persen cuma menambah biaya 1,7 sampai 2,5 persen. Lembahnya **landai di dasar**.

Ini punya akibat yang sangat melegakan bagi orang yang harus memakainya di dunia nyata.

**Akibat pertama: angka masukan yang kasar sudah cukup.**

Kamu hampir tidak pernah tahu S dan H dengan tepat. Berapa biaya satu kali memesan kalau dihitung dengan waktu orang yang mengurusnya? Berapa biaya modal yang terkunci?

Tidak masalah. Karena ada akar kuadrat, kalau taksiran S-mu dua kali terlalu besar, EOQ-mu cuma meleset sekitar 41 persen — \`akar(2) = 1,41\`. Dan meleset 41 persen di lembah yang landai cuma menambah biaya beberapa persen.

Kesalahan masukan **teredam dua kali**: sekali oleh akar kuadrat, sekali lagi oleh dasar lembah yang landai.

**Akibat kedua: bulatkan dengan tenang.**

EOQ hitungan mungkin 287 unit. Kartonnya berisi 50. Pemasoknya minimum 100.

Pesan 300. Atau 250. Selisih biayanya tidak akan terasa — tetapi kemasan yang penuh dan kesepakatan dengan pemasok yang sederhana adalah penghematan nyata yang tidak ada di rumusnya.

**Akibat ketiga, dan ini peringatan: jangan meleset jauh.**

Lembahnya landai di dasar, tetapi dinding di kedua sisinya curam. Meleset separuh — pesan 150 atau 600 — menambah biaya **25 persen**. Meleset ke 50 unit menambah lebih dari tiga kali lipat.

Jadi pelajarannya bukan "EOQ tidak penting". Pelajarannya: **kira-kira di sekitarnya sudah cukup, asal benar-benar di sekitarnya.** Toko yang memesan 50 unit tiap minggu karena "biasanya begitu" sedang membayar tiga kali lipat biaya yang perlu.

Satu catatan jujur tentang batas rumus ini: EOQ mengandaikan permintaan tetap dan harga tidak bergantung jumlah pesan. Kalau pemasok memberi potongan untuk pesanan besar, atau permintaannya musiman, rumus dasarnya perlu diperluas — tetapi cara berpikirnya tetap sama: dua biaya yang saling tarik, dan titik tengah di antaranya.`
    },
    {
      bahasa: 'python',
      kode: "def pesanan_hulu(permintaan, jendela=4):\n    hasil, riwayat = [], []\n    for d in permintaan:\n        riwayat.append(d)\n        rata = sum(riwayat[-jendela:]) / min(len(riwayat), jendela)\n        tren = d - rata\n        hasil.append(max(0.0, d + 0.5 * tren))   # berjaga SEDIKIT\n    return hasil\n\n#   aliran                 rata-rata  ragam, kali lipat\n#   Pembeli ke toko            100        1,0x\n#   Toko ke distributor        101        2,0x\n#   Distributor ke grosir      101        4,2x\n#   Grosir ke pabrik           101        8,9x",
      penjelasan: `Tujuh baris aturan pemesanan yang sepenuhnya wajar — dan ketika dirangkai empat tingkat, menghasilkan goyangan sembilan kali lipat.

**Lihat dulu aturannya, karena ia tidak bodoh.**

Setiap tingkat memesan sebesar permintaan yang baru ia lihat, **ditambah separuh** dari selisih antara permintaan itu dan rata-rata empat minggu terakhir.

Kalau minggu ini penjualan naik sedikit di atas biasanya, ia memesan sedikit lebih — berjaga-jaga kalau kenaikan itu awal tren. Kalau turun, ia memesan sedikit kurang.

Itu perilaku yang **masuk akal**. Tidak ada yang menimbun. Tidak ada yang panik. Faktor separuh itu bahkan termasuk hati-hati.

**Sekarang lihat apa yang terjadi di tingkat kedua.**

Distributor tidak melihat penjualan ke pembeli. Ia cuma melihat **pesanan dari toko**. Dan pesanan dari toko sudah bergoyang dua kali lebih besar daripada penjualannya, karena setiap goyangan kecil sudah diperbesar oleh aturan berjaga si toko.

Distributor menerapkan aturan yang sama wajarnya — pada angka yang sudah diperbesar. Ia melihat kenaikan yang lebih tajam, lalu berjaga sedikit di atasnya.

Grosir melihat pesanan distributor, yang sudah diperbesar dua kali. Pabrik melihat pesanan grosir, yang sudah diperbesar tiga kali.

Hasilnya: pabrik melihat permintaan yang ragamnya **8,9 kali** penjualan sesungguhnya — padahal rata-ratanya tetap 101 di setiap tingkat.

**Tiga hal yang membuat contoh ini penting.**

**Pertama, tidak ada penjahatnya.** Kalau kamu memeriksa setiap tingkat satu per satu, tidak ada yang salah. Setiap keputusan bisa dipertahankan. Masalahnya **hanya ada di tingkat sistem**, dan itu membuatnya sulit ditemukan dengan cara biasa — mencari siapa yang keliru.

**Kedua, rata-ratanya tidak bohong, dan justru itu yang menyesatkan.** Laporan yang cuma memuat rata-rata pesanan akan menunjukkan semua tingkat memesan kira-kira sama. Yang tidak kelihatan adalah goyangannya — dan goyangan itulah yang mahal. Pabrik harus menyiapkan kapasitas untuk puncak yang jauh di atas rata-rata, lalu menganggur di lembahnya.

**Ketiga, dan ini yang praktis: obatnya bukan di aturan pemesanan.**

Naluri pertama: suruh setiap tingkat berjaga lebih sedikit. Itu mengecilkan pelipatannya, tetapi tidak menghilangkannya, dan membuat setiap tingkat lebih sering kehabisan.

Obat yang sebenarnya: **pabrik melihat data penjualan ke pembeli secara langsung.** Begitu ia menebak dari sumber aslinya dan bukan dari pesanan grosir, seluruh rantai pelipatan terputus.

Itu sebabnya perusahaan ritel besar berbagi data kasir harian dengan pemasoknya. Bukan karena kemurahan hati — karena itu cara paling murah membuat seluruh rantai lebih stabil, termasuk untuk dirinya sendiri.

Satu catatan tentang kolom terakhir: yang dibandingkan adalah **ragam** — kuadrat simpangan — karena itu ukuran baku efek cambuk. Dalam simpangan biasa, pelipatannya sekitar tiga kali (dari 8 ke 24).`
    }
  ],

  kode: { python: String.raw`# ============================================
# Rantai pasok & persediaan toko daring
# ============================================
import math
import random

def rp(n):
    return "Rp " + f"{int(round(n)):,}".replace(",", ".")

# --------------------------------------------
# 1. Dua biaya yang saling tarik
# --------------------------------------------
print("--- pesan sering atau pesan banyak? ---")
D = 3600          # permintaan setahun (unit)
S = 150_000       # biaya sekali pesan (ongkir, administrasi)
H = 12_000        # biaya simpan per unit per tahun
print("  permintaan setahun   : " + str(D) + " unit")
print("  biaya sekali pesan   : " + rp(S))
print("  biaya simpan / unit  : " + rp(H) + " per tahun")
print("")

def biaya_total(q):
    pesan = (D / q) * S          # makin kecil q, makin sering pesan
    simpan = (q / 2) * H         # rata-rata stok = q/2
    return pesan, simpan, pesan + simpan

print("  " + "sekali pesan".rjust(13) + "biaya pesan".rjust(15)
      + "biaya simpan".rjust(15) + "total".rjust(15))
for q in (50, 100, 200, 300, 400, 600, 1200):
    p, s_, t = biaya_total(q)
    print("  " + (str(q) + " unit").rjust(13) + rp(p).rjust(15)
          + rp(s_).rjust(15) + rp(t).rjust(15))
print("")
print("  Pesan sedikit-sedikit: ongkir dan administrasi menumpuk.")
print("  Pesan sekaligus banyak: gudang penuh, modal terkunci,")
print("  barang berisiko usang. Ada titik di tengah.")

# --------------------------------------------
# 2. EOQ: titik terendahnya bisa dihitung
# --------------------------------------------
print("")
print("--- EOQ: jumlah pesan yang paling murah ---")
eoq = math.sqrt(2 * D * S / H)
_, _, t_eoq = biaya_total(eoq)
print("  EOQ = akar(2DS / H) = akar(2 x " + str(D) + " x "
      + str(S) + " / " + str(H) + ")")
print("      = " + ("%.0f" % eoq) + " unit sekali pesan")
print("  total biaya di EOQ  : " + rp(t_eoq) + " setahun")
print("  pesan sebanyak      : " + ("%.1f" % (D / eoq))
      + " kali setahun")
print("")
print("  Di titik itu biaya pesan dan biaya simpan SAMA besar.")
p_e, s_e, _ = biaya_total(eoq)
print("    biaya pesan  : " + rp(p_e))
print("    biaya simpan : " + rp(s_e))
print("")
print("  Itu bukan kebetulan: turunan total biaya bernilai nol")
print("  tepat ketika keduanya seimbang.")

# --------------------------------------------
# 3. Dasar lembahnya landai: EOQ tidak harus tepat
# --------------------------------------------
print("")
print("--- seberapa mahal kalau meleset dari EOQ? ---")
print("  " + "pesan".rjust(10) + "vs EOQ".rjust(9)
      + "total".rjust(15) + "  lebih mahal")
for f in (0.5, 0.7, 0.8, 1.0, 1.2, 1.5, 2.0):
    q = eoq * f
    _, _, t = biaya_total(q)
    print("  " + ("%.0f" % q).rjust(10) + ("%.0f%%" % (f * 100)).rjust(9)
          + rp(t).rjust(15)
          + ("  +%.1f%%" % ((t / t_eoq - 1) * 100)))
print("")
print("  Meleset 20 persen ke arah mana pun cuma menambah biaya")
print("  sekitar 2 persen. Meleset separuhnya menambah 25 persen.")
print("")
print("  Artinya dua hal. Pertama, EOQ boleh dibulatkan ke ukuran")
print("  kemasan atau kelipatan palet tanpa rugi berarti. Kedua,")
print("  taksiran D, S, dan H yang kasar sudah cukup -- kesalahan")
print("  masukan teredam oleh akar kuadrat di rumusnya.")

# --------------------------------------------
# 4. Kapan memesan: titik pesan ulang & stok pengaman
# --------------------------------------------
print("")
print("--- kapan memesan ulang: stok pengaman ---")
RATA = 10          # permintaan rata-rata per hari
SIMPANG = 4        # simpangan baku permintaan harian
TUNGGU = 5         # lama tunggu kiriman (hari)
print("  permintaan harian : rata-rata " + str(RATA)
      + ", simpangan baku " + str(SIMPANG))
print("  lama tunggu       : " + str(TUNGGU) + " hari")
print("")
Z = [(0.50, 0.00), (0.80, 0.84), (0.90, 1.28), (0.95, 1.645),
     (0.99, 2.33)]
print("  " + "layanan".rjust(9) + "z".rjust(7) + "stok aman".rjust(11)
      + "pesan ulang".rjust(13) + "  biaya simpan ekstra")
for layanan, z in Z:
    aman = z * SIMPANG * math.sqrt(TUNGGU)
    rop = RATA * TUNGGU + aman
    ekstra = aman * H
    print("  " + ("%.0f%%" % (layanan * 100)).rjust(9)
          + ("%.2f" % z).rjust(7) + ("%.0f" % aman).rjust(11)
          + ("%.0f" % rop).rjust(13) + "  " + rp(ekstra))
print("")
print("  Titik pesan ulang = permintaan selama menunggu + stok")
print("  pengaman. Stok pengaman menanggung PENYIMPANGAN, bukan")
print("  rata-rata.")
print("")
print("  Perhatikan kenaikannya: dari 95 ke 99 persen, stok")
print("  pengamannya naik sekitar 40 persen. Tiap tambahan")
print("  kepastian makin mahal -- dan 100 persen tidak ada")
print("  harganya, karena ekor sebarannya tidak berujung.")

# --------------------------------------------
# 5. Buktikan dengan simulasi
# --------------------------------------------
print("")
print("--- simulasi 2.000 siklus pesan ulang ---")
acak = random.Random(7)
print("  " + "layanan target".rjust(15) + "siklus tanpa habis".rjust(21))
for layanan, z in Z[1:]:
    aman = z * SIMPANG * math.sqrt(TUNGGU)
    rop = RATA * TUNGGU + aman
    selamat = 0
    for _ in range(2000):
        pakai = sum(max(0, acak.gauss(RATA, SIMPANG))
                    for _ in range(TUNGGU))
        if pakai <= rop:
            selamat += 1
    print("  " + ("%.0f%%" % (layanan * 100)).rjust(15)
          + ("%.1f%%" % (selamat / 2000 * 100)).rjust(21))
print("")
print("  Simulasinya mendekati target di tiap baris. Selisih kecil")
print("  wajar: permintaan tidak mungkin negatif, jadi sebarannya")
print("  sedikit terpotong di sisi kiri.")
print("")
print("  Dan perhatikan arti 'layanan 95 persen' di sini: 95")
print("  dari 100 siklus pesan ulang tidak kehabisan stok --")
print("  BUKAN 95 persen pembeli terlayani. Dua ukuran itu sering")
print("  dicampur, dan yang kedua biasanya jauh lebih tinggi.")

# --------------------------------------------
# 6. Efek cambuk (bullwhip)
# --------------------------------------------
print("")
print("--- efek cambuk: goyangan kecil membesar ke hulu ---")
acak = random.Random(11)
MINGGU = 52
jual = [100 + acak.gauss(0, 8) for _ in range(MINGGU)]

def pesanan_hulu(permintaan, jendela=4):
    """Tiap tingkat memesan = permintaan kini + separuh
    kenaikan yang ia lihat di atas rata-rata terakhir."""
    hasil = []
    riwayat = []
    for d in permintaan:
        riwayat.append(d)
        rata = sum(riwayat[-jendela:]) / min(len(riwayat), jendela)
        tren = d - rata
        hasil.append(max(0.0, d + 0.5 * tren))
    return hasil

def ragam(x):
    m = sum(x) / len(x)
    return sum((v - m) ** 2 for v in x) / len(x)

tingkat = [("Pembeli ke toko", jual)]
aliran = jual
for nama in ("Toko ke distributor", "Distributor ke grosir",
             "Grosir ke pabrik"):
    aliran = pesanan_hulu(aliran)
    tingkat.append((nama, aliran))

dasar = ragam(jual)
print("  " + "aliran pesanan".ljust(24) + "rata-rata".rjust(10)
      + "simpangan".rjust(11) + "ragam, kali".rjust(12))
for nama, x in tingkat:
    print("  " + nama.ljust(24)
          + ("%.0f" % (sum(x) / len(x))).rjust(10)
          + ("%.1f" % math.sqrt(ragam(x))).rjust(11)
          + ("%.1fx" % (ragam(x) / dasar)).rjust(12))
print("")
print("  Rata-ratanya nyaris sama di setiap tingkat -- tidak ada")
print("  yang memesan lebih banyak dalam jangka panjang. Tetapi")
print("  GOYANGANNYA membesar berlipat ke hulu.")
print("")
print("  Sebabnya: tiap tingkat melihat kenaikan kecil sebagai")
print("  awal tren, lalu memesan SEDIKIT lebih untuk berjaga --")
print("  cuma separuh dari kenaikan yang ia lihat. Tingkat di")
print("  atasnya melihat pesanan yang sudah bergoyang itu, dan")
print("  berjaga lagi di atasnya.")
print("")
print("  Tidak ada satu tingkat pun yang bereaksi berlebihan.")
print("  Pelipatan itu muncul dari RANTAINYA, bukan dari satu")
print("  keputusan yang buruk.")
print("")
print("  Obatnya bukan meramal lebih pintar di tiap tingkat,")
print("  melainkan BERBAGI DATA PENJUALAN yang sebenarnya ke hulu,")
print("  supaya pabrik tidak menebak dari pesanan grosir.")` },
  output: `--- pesan sering atau pesan banyak? ---
  permintaan setahun   : 3600 unit
  biaya sekali pesan   : Rp 150.000
  biaya simpan / unit  : Rp 12.000 per tahun

   sekali pesan    biaya pesan   biaya simpan          total
        50 unit  Rp 10.800.000     Rp 300.000  Rp 11.100.000
       100 unit   Rp 5.400.000     Rp 600.000   Rp 6.000.000
       200 unit   Rp 2.700.000   Rp 1.200.000   Rp 3.900.000
       300 unit   Rp 1.800.000   Rp 1.800.000   Rp 3.600.000
       400 unit   Rp 1.350.000   Rp 2.400.000   Rp 3.750.000
       600 unit     Rp 900.000   Rp 3.600.000   Rp 4.500.000
      1200 unit     Rp 450.000   Rp 7.200.000   Rp 7.650.000

  Pesan sedikit-sedikit: ongkir dan administrasi menumpuk.
  Pesan sekaligus banyak: gudang penuh, modal terkunci,
  barang berisiko usang. Ada titik di tengah.

--- EOQ: jumlah pesan yang paling murah ---
  EOQ = akar(2DS / H) = akar(2 x 3600 x 150000 / 12000)
      = 300 unit sekali pesan
  total biaya di EOQ  : Rp 3.600.000 setahun
  pesan sebanyak      : 12.0 kali setahun

  Di titik itu biaya pesan dan biaya simpan SAMA besar.
    biaya pesan  : Rp 1.800.000
    biaya simpan : Rp 1.800.000

  Itu bukan kebetulan: turunan total biaya bernilai nol
  tepat ketika keduanya seimbang.

--- seberapa mahal kalau meleset dari EOQ? ---
       pesan   vs EOQ          total  lebih mahal
         150      50%   Rp 4.500.000  +25.0%
         210      70%   Rp 3.831.429  +6.4%
         240      80%   Rp 3.690.000  +2.5%
         300     100%   Rp 3.600.000  +0.0%
         360     120%   Rp 3.660.000  +1.7%
         450     150%   Rp 3.900.000  +8.3%
         600     200%   Rp 4.500.000  +25.0%

  Meleset 20 persen ke arah mana pun cuma menambah biaya
  sekitar 2 persen. Meleset separuhnya menambah 25 persen.

  Artinya dua hal. Pertama, EOQ boleh dibulatkan ke ukuran
  kemasan atau kelipatan palet tanpa rugi berarti. Kedua,
  taksiran D, S, dan H yang kasar sudah cukup -- kesalahan
  masukan teredam oleh akar kuadrat di rumusnya.

--- kapan memesan ulang: stok pengaman ---
  permintaan harian : rata-rata 10, simpangan baku 4
  lama tunggu       : 5 hari

    layanan      z  stok aman  pesan ulang  biaya simpan ekstra
        50%   0.00          0           50  Rp 0
        80%   0.84          8           58  Rp 90.158
        90%   1.28         11           61  Rp 137.384
        95%   1.65         15           65  Rp 176.560
        99%   2.33         21           71  Rp 250.082

  Titik pesan ulang = permintaan selama menunggu + stok
  pengaman. Stok pengaman menanggung PENYIMPANGAN, bukan
  rata-rata.

  Perhatikan kenaikannya: dari 95 ke 99 persen, stok
  pengamannya naik sekitar 40 persen. Tiap tambahan
  kepastian makin mahal -- dan 100 persen tidak ada
  harganya, karena ekor sebarannya tidak berujung.

--- simulasi 2.000 siklus pesan ulang ---
   layanan target   siklus tanpa habis
              80%                79.8%
              90%                89.3%
              95%                95.4%
              99%                99.0%

  Simulasinya mendekati target di tiap baris. Selisih kecil
  wajar: permintaan tidak mungkin negatif, jadi sebarannya
  sedikit terpotong di sisi kiri.

  Dan perhatikan arti 'layanan 95 persen' di sini: 95
  dari 100 siklus pesan ulang tidak kehabisan stok --
  BUKAN 95 persen pembeli terlayani. Dua ukuran itu sering
  dicampur, dan yang kedua biasanya jauh lebih tinggi.

--- efek cambuk: goyangan kecil membesar ke hulu ---
  aliran pesanan           rata-rata  simpangan ragam, kali
  Pembeli ke toko                100        8.0        1.0x
  Toko ke distributor            101       11.4        2.0x
  Distributor ke grosir          101       16.5        4.2x
  Grosir ke pabrik               101       24.0        8.9x

  Rata-ratanya nyaris sama di setiap tingkat -- tidak ada
  yang memesan lebih banyak dalam jangka panjang. Tetapi
  GOYANGANNYA membesar berlipat ke hulu.

  Sebabnya: tiap tingkat melihat kenaikan kecil sebagai
  awal tren, lalu memesan SEDIKIT lebih untuk berjaga --
  cuma separuh dari kenaikan yang ia lihat. Tingkat di
  atasnya melihat pesanan yang sudah bergoyang itu, dan
  berjaga lagi di atasnya.

  Tidak ada satu tingkat pun yang bereaksi berlebihan.
  Pelipatan itu muncul dari RANTAINYA, bukan dari satu
  keputusan yang buruk.

  Obatnya bukan meramal lebih pintar di tiap tingkat,
  melainkan BERBAGI DATA PENJUALAN yang sebenarnya ke hulu,
  supaya pabrik tidak menebak dari pesanan grosir.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung EOQ', waktu: 'O(1)', memori: 'satu akar kuadrat' },
      { operasi: 'Hitung stok pengaman & titik pesan ulang', waktu: 'O(1)', memori: 'per barang' },
      { operasi: 'Hitung rata-rata & simpangan dari data harian', waktu: 'O(h)', memori: 'h = jumlah hari data' },
      { operasi: 'Simulasi tingkat layanan', waktu: 'O(s . L)', memori: 's siklus, L hari tunggu' },
      { operasi: 'Simulasi efek cambuk', waktu: 'O(t . m)', memori: 't tingkat, m minggu' }
    ],
    intuisi: `Semua hitungan di sini murah, termasuk untuk toko dengan puluhan ribu barang: EOQ dan titik pesan ulang cuma beberapa operasi per barang.

Yang mahal adalah **data**. Simpangan permintaan harian butuh riwayat penjualan yang rapi, dan banyak toko kecil tidak punya itu karena tidak pernah mencatat penjualan per hari per barang.

Karena itu langkah pertama yang paling berharga sering bukan rumusnya, melainkan **mulai mencatat**. Tiga bulan data harian sudah cukup untuk menghitung stok pengaman yang jauh lebih baik daripada tebakan "sepuluh persen dari rata-rata".`
  },

  kesalahanUmum: [
    {
      salah: 'Mengabaikan biaya simpan karena tidak ada tagihannya.',
      kenapa: 'Modal yang terkunci dalam stok tidak bisa dipakai untuk belanja lain, dan barang yang disimpan lama berisiko rusak atau usang. Tanpa biaya simpan, rumus menyarankan memesan sebanyak mungkin, yang menguras kas dan memenuhi gudang dengan barang yang lambat laku.',
      benar: 'Taksir biaya simpan dari biaya modal, sewa tempat, dan risiko rusak atau usang, lalu masukkan ke hitungan meski angkanya kasar.'
    },
    {
      salah: 'Memaksakan jumlah pesan tepat sama dengan hasil EOQ.',
      kenapa: 'Dasar kurva biayanya landai, sehingga meleset dua puluh persen hanya menambah biaya sekitar dua persen. Memaksakan angka ganjil bisa lebih mahal karena kemasan tidak penuh atau tidak sesuai kelipatan minimum pemasok.',
      benar: 'Bulatkan EOQ ke ukuran kemasan atau kelipatan pesanan pemasok di sekitar hasil hitungan.'
    },
    {
      salah: 'Menetapkan stok pengaman sebagai persen tetap dari rata-rata permintaan.',
      kenapa: 'Stok pengaman menanggung penyimpangan permintaan selama menunggu, bukan rata-ratanya. Dua barang dengan rata-rata sama tetapi goyangan berbeda membutuhkan stok pengaman yang sangat berbeda, dan persen tetap memberi terlalu banyak untuk yang stabil dan terlalu sedikit untuk yang bergoyang.',
      benar: 'Hitung stok pengaman dari simpangan baku permintaan, akar lama tunggu, dan faktor z sesuai tingkat layanan.'
    },
    {
      salah: 'Mengejar tingkat layanan setinggi mungkin untuk semua barang.',
      kenapa: 'Stok pengaman naik makin tajam mendekati seratus persen, sehingga tiap tambahan kepastian makin mahal. Dari sembilan puluh lima ke sembilan puluh sembilan persen saja stok pengaman naik sekitar empat puluh persen, dan seratus persen tidak bisa dicapai berapa pun biayanya.',
      benar: 'Tetapkan tingkat layanan per barang sesuai akibat kehabisannya, tinggi untuk barang laris dan lebih rendah untuk barang pelengkap.'
    },
    {
      salah: 'Menyebut layanan per siklus sebagai persen pembeli yang terlayani.',
      kenapa: 'Layanan per siklus menghitung berapa siklus pesan ulang yang tidak kehabisan stok, sementara layanan per pembeli menghitung porsi permintaan yang terpenuhi. Yang kedua biasanya jauh lebih tinggi karena kehabisan hanya berlangsung sebentar di akhir siklus.',
      benar: 'Sebut jenis tingkat layanan yang dipakai secara eksplisit di setiap laporan.'
    },
    {
      salah: 'Mencari penyebab efek cambuk dengan memeriksa pihak mana yang bereaksi berlebihan.',
      kenapa: 'Pelipatan goyangan bisa muncul meski setiap tingkat berperilaku wajar, karena setiap tingkat menerapkan aturan berjaga pada angka yang sudah diperbesar tingkat di bawahnya. Pemeriksaan per tingkat tidak akan menemukan kesalahan apa pun.',
      benar: 'Perlakukan efek cambuk sebagai masalah sistem, dan putus rantainya dengan berbagi data penjualan sebenarnya ke hulu.'
    },
    {
      salah: 'Menilai kestabilan pesanan dari rata-ratanya saja.',
      kenapa: 'Rata-rata pesanan bisa sama di setiap tingkat sementara goyangannya berlipat, sehingga laporan rata-rata tampak normal padahal pabrik harus menyiapkan kapasitas untuk puncak yang jauh di atas rata-rata.',
      benar: 'Laporkan simpangan atau ragam pesanan di setiap tingkat bersama rata-ratanya.'
    }
  ],

  analogi: `Bayangkan kamu mengelola **warung** dan harus membeli beras dari agen di kota.

Setiap kali ke kota, kamu menghabiskan ongkos angkot dan setengah hari. Jadi naluri pertama: beli sebanyak mungkin sekali jalan.

Tapi gudangmu cuma satu kamar. Beras yang terlalu lama bisa berkutu. Dan uang yang kamu belikan beras sekarung-karung tidak bisa dipakai untuk membeli minyak atau telur yang juga dicari pembeli.

Jadi ada dua kerugian yang saling tarik: **sering ke kota** menghabiskan ongkos dan waktu, **jarang ke kota** menghabiskan tempat dan modal. Di suatu titik di tengah, keduanya seimbang.

Kabar baiknya: titik itu tidak perlu tepat. Beli 10 karung atau 12 karung, bedanya hampir tidak terasa. Yang terasa adalah kalau kamu beli 2 karung dan bolak-balik ke kota tiap dua hari.

**Sekarang soal kapan pergi.**

Agen butuh tiga hari untuk mengantar. Kalau kamu baru memesan saat beras tinggal sekarung, dan tiga hari ini pembeli ramai, kamu kehabisan di hari kedua.

Jadi kamu memesan saat beras masih cukup untuk tiga hari **ditambah sedikit cadangan**. Cadangan itu bukan untuk rata-rata pembeli — rata-rata sudah dihitung. Cadangan itu untuk hari-hari ketika pembeli lebih ramai dari biasanya.

Warung yang pembelinya selalu tetap butuh cadangan kecil. Warung dekat sekolah yang ramainya tidak menentu butuh cadangan besar — walau rata-ratanya sama.

**Terakhir, soal cambuk.**

Minggu ini pembelimu sedikit lebih ramai. Kamu memesan beras sedikit lebih banyak dari biasanya, sekadar berjaga.

Agenmu melihat pesananmu naik. Ia tidak tahu kamu cuma berjaga — ia mengira permintaan sedang naik. Ia memesan ke distributor sedikit lebih banyak lagi, juga sekadar berjaga.

Distributor melihat pesanan agen naik tajam. Ia memesan ke penggilingan lebih banyak lagi.

Penggilingan melihat lonjakan besar, lalu menambah jam kerja dan membeli gabah ekstra.

Minggu depannya pembelimu kembali normal. Kamu memesan seperti biasa. Agen melihat pesananmu **turun** — dan ia berjaga ke arah sebaliknya. Seterusnya ke atas.

Penggilingan yang baru saja menambah jam kerja sekarang tiba-tiba sepi.

Tidak ada satu orang pun yang panik. Semua cuma berjaga sedikit. Dan satu goyangan kecil di warungmu menjadi gelombang besar di penggilingan.

Obatnya sederhana, dan tidak butuh siapa pun menjadi lebih pintar: **kirim catatan penjualan warungmu langsung ke penggilingan**. Begitu penggilingan melihat pembeli sebenarnya dan bukan pesanan yang sudah berlapis tebakan, gelombangnya hilang.`,

  latihan: [
    'Taksir D, S, dan H untuk satu barang nyata, lalu hitung EOQ-nya dan periksa bahwa biaya pesan dan biaya simpan sama besar.',
    'Hitung total biaya untuk lima jumlah pesan di sekitar EOQ, lalu gambar kurvanya dan tunjukkan dasar lembah yang landai.',
    'Gandakan taksiran biaya sekali pesan, lalu hitung berapa persen EOQ berubah dan jelaskan peran akar kuadratnya.',
    'Dari data penjualan harian minimal empat minggu, hitung rata-rata dan simpangan baku permintaannya.',
    'Hitung stok pengaman dan titik pesan ulang untuk tingkat layanan delapan puluh, sembilan puluh lima, dan sembilan puluh sembilan persen.',
    'Simulasikan dua ribu siklus pesan ulang untuk titik pesan ulang yang kamu hitung, lalu bandingkan tingkat layanannya dengan target.',
    'Jelaskan beda tingkat layanan per siklus dan per pembeli dengan satu contoh angka.',
    'Bandingkan stok pengaman dua barang dengan rata-rata permintaan sama tetapi simpangan baku berbeda.',
    'Simulasikan efek cambuk dengan tiga, empat, dan lima tingkat, lalu tunjukkan bagaimana pelipatan ragamnya tumbuh.',
    'Ubah simulasimu sehingga tingkat teratas melihat penjualan ke pembeli secara langsung, lalu bandingkan ragam pesanannya.'
  ]
});


TOPICS.push({
  id: 'ecom-crm',
  judul: 'CRM: Segmentasi RFM & Retensi per Kohort',
  kategori: 'ecommerce',
  tag: ['CRM', 'RFM', 'segmentasi pelanggan', 'kohort', 'retensi', 'Pareto', 'UU PDP'],
  ringkas: 'Pembeli aktif naik delapan kali lipat, sementara pelanggan baru yang kembali turun separuh — dan laporan bulanan cuma memuat angka pertama.',

  fungsi: `**Mengenali pelanggan mana yang layak dipertahankan, dan membaca apakah toko benar-benar makin baik atau cuma makin banyak membeli iklan.**

Terpakai di:

- **Menentukan siapa yang dikirimi promo** — memanggil kembali pelanggan yang hampir pergi jauh lebih murah daripada mendatangkan yang baru
- **Membaca laporan pertumbuhan** dengan benar, dan tidak tertipu angka agregat yang naik
- **Membangun fitur dasbor** untuk toko daring atau aplikasi berlangganan
- **Tugas akhir** yang menganalisis data transaksi — RFM dan analisis kohort adalah metode yang mapan dan bisa dijelaskan di sidang
- **Memutuskan data pelanggan apa yang perlu disimpan**, sesuai UU Perlindungan Data Pribadi

Yang paling mengubah cara membaca laporan: **angka agregat bisa naik sementara keadaan sebenarnya memburuk.** Pada contoh di topik ini, pembeli aktif naik dari 80 menjadi 667, sementara pelanggan baru yang kembali sebulan kemudian turun dari 44 persen menjadi 21 persen. Keduanya benar sekaligus — dan hanya tabel kohort yang bisa memisahkannya.

Dan satu hal yang sering terbalik: segmen yang paling layak digarap bukan pelanggan terbaik, melainkan **yang berisiko pergi** — dulu sering belanja, sekarang lama tidak muncul. Mereka masih bisa dipanggil kembali, dan nilainya sudah terbukti.`,
  praktik: {
    tujuan: 'Kamu bisa menghitung skor RFM dari data transaksi, mengelompokkan pelanggan ke segmen yang bisa ditindaklanjuti, menyusun tabel retensi per kohort, dan mengenali pertumbuhan yang ditopang akuisisi alih-alih retensi.',
    alat: ['Data transaksi dengan tiga kolom: id pelanggan, tanggal, nilai', 'Python dengan pustaka bawaan, atau pandas bila tersedia', 'Spreadsheet untuk menampilkan tabel kohort'],
    langkah: [
      { judul: 'Siapkan cuma tiga kolom',
        isi: `Id pelanggan, tanggal transaksi, nilai transaksi. Itu seluruh bahan RFM dan kohort.

Kalau datamu memuat nama lengkap, alamat, atau nomor telepon, kamu tidak butuh itu untuk analisis ini. Pakai id saja — lebih aman dan lebih sederhana.` },
      { judul: 'Periksa bentuk Pareto-nya',
        isi: `Urutkan pelanggan dari belanja terbesar, lalu hitung porsi omzet dari 1, 5, 10, 20, dan 50 persen teratas.

Angkanya tidak harus 80/20. Yang penting bentuknya: kalau sedikit pelanggan membawa sebagian besar uang, perlakuan yang disamaratakan berarti perhatian yang salah alamat.` },
      { judul: 'Hitung R, F, dan M untuk tiap pelanggan',
        isi: `**R**: berapa lama sejak transaksi terakhir. **F**: berapa kali bertransaksi. **M**: total nilainya.

Beri skor 1–5 untuk masing-masing berdasarkan urutan, bukan batas angka tetap. Skor berdasarkan urutan tetap bermakna walau skala tokomu berubah.` },
      { judul: 'Kelompokkan ke segmen yang punya TINDAKAN',
        isi: `Juara, Setia, Baru, Perlu perhatian, Berisiko pergi, Sudah hilang — masing-masing harus punya tindakan yang berbeda.

Segmen yang tidak mengubah apa yang kamu lakukan tidak berguna, secantik apa pun namanya.` },
      { judul: 'Garap segmen "berisiko pergi" lebih dulu',
        isi: `Mereka dulu sering belanja dan sudah lama tidak muncul. Nilainya terbukti, dan hubungannya belum putus.

Bandingkan dengan "sudah hilang" — pada contoh di topik ini, seluruhnya cuma pernah belanja sekali. Memanggil mereka mahal, dan hubungannya memang tidak pernah terbentuk.` },
      { judul: 'Susun tabel kohort',
        isi: `Kelompokkan pelanggan berdasarkan **bulan pertama** mereka belanja. Untuk tiap kohort, hitung porsi yang belanja lagi di bulan +1, +2, +3, dan seterusnya.

Baca per baris untuk melihat bentuk kurva satu kohort, dan per kolom untuk melihat apakah kohort yang lebih baru bertahan lebih baik atau lebih buruk.` },
      { judul: 'Bandingkan kolom +1 antar kohort',
        isi: `Ini angka yang paling cepat memberi peringatan. Kalau kohort baru makin jarang kembali sebulan kemudian, ada yang memburuk — produk, layanan, atau kualitas pelanggan yang didatangkan iklan.

Periksa ini **sebelum** menambah anggaran iklan. Iklan yang mendatangkan pelanggan yang tidak kembali cuma membeli angka.` },
      { judul: 'Tinjau kolom data yang kamu simpan',
        isi: `Untuk setiap kolom data pelanggan, tanyakan: apa tujuannya, dan apakah ada cara mencapai tujuan itu dengan data yang lebih sedikit?

UU Perlindungan Data Pribadi mewajibkan data dikumpulkan sesuai tujuan yang jelas. Data yang tidak diperlukan bukan aset — ia kewajiban yang harus dijaga.` }
    ],
    cek: [
      'Analisis RFM dan kohortmu cuma memakai id, tanggal, dan nilai transaksi',
      'Setiap segmen RFM-mu punya satu tindakan yang berbeda dari segmen lain',
      'Kamu punya tabel kohort dan bisa menyebut apakah kolom +1 membaik atau memburuk',
      'Setiap kolom data pelanggan yang kamu simpan punya tujuan tertulis'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa angka yang naik bisa menyembunyikan yang turun',

  konsep: `CRM sering diartikan sebagai perangkat lunak. Isinya sebenarnya satu gagasan: **pelanggan tidak sama nilainya, dan hubungan dengan mereka berubah dari waktu ke waktu.** Bab ini memberi dua alat untuk melihat keduanya.

Data uji: 1.116 pelanggan, 2.593 transaksi, selama 12 bulan.

**Pareto: siapa yang membawa uang**

| Pelanggan teratas | Porsi omzet |
|---|---|
| 1% | 7,0% |
| 5% | 22,1% |
| 10% | 34,6% |
| 20% | **52,6%** |
| 50% | 82,9% |

Seperlima pelanggan membawa lebih dari separuh omzet. Angkanya tidak harus tepat 80 — yang penting bentuknya: **sedikit pelanggan membawa sebagian besar uang.**

Rata-rata belanja 1% teratas Rp 2.886.255; rata-rata separuh terbawah Rp 139.749. Jadi kehilangan **satu** pelanggan dari 1% teratas setara dengan kehilangan **21** pelanggan dari separuh terbawah.

**RFM: tiga pertanyaan tentang tiap pelanggan**

| Huruf | Pertanyaannya | Skor tinggi berarti |
|---|---|---|
| **R** — recency | kapan terakhir belanja? | baru-baru ini |
| **F** — frequency | berapa kali belanja? | sering |
| **M** — monetary | berapa total uangnya? | banyak |

Skor tiap huruf 1–5, dibagi rata berdasarkan **urutan**, bukan batas angka tetap. Skor berdasarkan urutan tetap bermakna walau skala tokomu berubah.

| Segmen | Orang | % orang | % omzet |
|---|---|---|---|
| Juara | 232 | 21% | 44% |
| Setia | 232 | 21% | 24% |
| Baru / menjanjikan | 126 | 11% | 4% |
| Perlu perhatian | 80 | 7% | 2% |
| **Berisiko pergi** | 206 | 18% | **18%** |
| Sudah hilang | 240 | 22% | 8% |

Segmen yang paling layak ditindaklanjuti **bukan** Juara — mereka sudah datang sendiri. Yang paling layak adalah **berisiko pergi**: dulu sering belanja, sekarang sudah lama tidak muncul. Mereka membawa 18 persen omzet historis, hubungannya belum putus, dan nilainya sudah terbukti.

"Sudah hilang" sebaliknya: pada data ini, seluruh 240 orangnya cuma pernah belanja **sekali**. Memanggil mereka mahal, dan hubungannya memang tidak pernah terbentuk.

**Retensi per kohort**

Kohort adalah kelompok pelanggan yang **mulai** pada bulan yang sama. Tabelnya menunjukkan porsi yang belanja lagi di bulan ke-k sejak mereka mulai:

| Kohort | Ukuran | +0 | +1 | +2 | +3 |
|---|---|---|---|---|---|
| bulan 0 | 60 | 100% | 27% | 23% | 28% |
| bulan 2 | 72 | 100% | 28% | 25% | 25% |
| bulan 4 | 84 | 100% | 24% | 32% | 20% |
| bulan 6 | 96 | 100% | 31% | 28% | 34% |
| bulan 8 | 108 | 100% | 29% | 23% | 23% |

Kolom +0 selalu 100% — itu bulan mereka mulai. **Kolom +1 adalah angka terpenting:** ia menunjukkan berapa yang kembali sekali lagi, dan ia yang paling cepat memberi peringatan bila sesuatu memburuk.

Pada data ini kohortnya stabil — sekitar seperempat sampai sepertiga kembali tiap bulan, dan tidak ada tren memburuk.

**Angka yang naik bisa menyembunyikan yang turun**

Sekarang skenario kedua: toko yang terus menaikkan anggaran iklan, sementara pelayanannya diam-diam memburuk.

| Bulan | Pembeli aktif | Kohort baru | Kembali di +1 |
|---|---|---|---|
| 0 | 80 | 80 | 44% |
| 2 | 200 | 130 | 50% |
| 4 | 342 | 180 | 34% |
| 6 | 450 | 230 | 30% |
| 8 | 567 | 280 | 28% |
| 10 | **667** | 330 | **21%** |

Kolom kedua naik dari 80 ke 667 — lebih dari delapan kali lipat. Laporan yang cuma memuat angka itu akan tampak sangat baik.

Kolom terakhir bercerita lain: dari kohort bulan 0, 44 persen kembali sebulan kemudian. Dari kohort bulan 10, tinggal 21 persen.

**Keduanya benar sekaligus**, dan itu intinya. Angka aktif naik karena kohort **baru** terus ditambahkan, makin besar tiap bulan. Tambahan itu menutupi kenyataan bahwa tiap kohort bertahan makin buruk.

Angka agregat tidak bisa memisahkan dua hal itu. Tabel kohort bisa — dan karena itu ia yang harus dibaca sebelum memutuskan menambah anggaran iklan.

**Data mana yang benar-benar perlu**

| Data | Perlu? | Alasan |
|---|---|---|
| Nama & alamat kirim | ya | tanpanya barang tak sampai |
| Nomor telepon | ya | kurir butuh menghubungi |
| Riwayat belanja | ya | bahan RFM dan kohort |
| Tanggal lahir lengkap | ragu | cukup bulan, untuk promo |
| Nomor KTP | **tidak** | tidak ada gunanya bagi toko |
| Foto selfie + KTP | **tidak** | risiko besar, manfaat nol |

Seluruh analisis di bab ini cuma butuh id pelanggan, waktu transaksi, dan nilainya.

**UU Perlindungan Data Pribadi** (UU 27/2022) mewajibkan data dikumpulkan sesuai tujuan yang jelas. Data yang tidak diperlukan bukan aset — ia **kewajiban**: harus dijaga, dan bocornya menjadi tanggung jawab toko. Periksa isi undang-undangnya langsung untuk kewajiban rinci yang berlaku pada usahamu.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def skor_kuintil(nilai, balik=False):\n    kunci = sorted(nilai, key=lambda k: nilai[k], reverse=not balik)\n    return {k: 5 - (i * 5 // len(kunci)) for i, k in enumerate(kunci)}\n\nR = skor_kuintil({n: KINI - terakhir[n] for n in belanja}, balik=True)\nF = skor_kuintil(kali)\nM = skor_kuintil(belanja)\n\n#   segmen            orang  % orang  % omzet\n#   Juara               232      21%      44%\n#   BERISIKO pergi      206      18%      18%\n#   Sudah hilang        240      22%       8%   <- 100% cuma belanja sekali",
      penjelasan: `Tiga baris untuk memberi skor, dan satu keputusan rancangan di dalamnya yang sering tidak disadari.

**Mulai dari keputusan itu: skor berdasarkan urutan, bukan batas angka.**

Cara yang terasa lebih wajar: tetapkan batas. "M = 5 kalau belanja di atas Rp 2 juta, M = 4 kalau di atas Rp 1 juta", dan seterusnya.

Masalahnya, batas itu **membeku**. Kalau tokomu tumbuh dan rata-rata belanja naik, makin banyak pelanggan masuk skor 5, dan skor itu berhenti membedakan apa pun. Kalau harga naik karena inflasi, pelanggan yang perilakunya tidak berubah tiba-tiba naik kelas.

Skor berdasarkan urutan tidak punya masalah itu. Seperlima teratas selalu dapat 5, seperlima terbawah selalu dapat 1 — apa pun skalanya. Skornya mengukur **posisi relatif**, dan posisi relatif itulah yang dipakai untuk memutuskan siapa diprioritaskan.

**Perhatikan \`balik=True\` pada R.**

Untuk F dan M, angka besar itu baik: sering dan banyak. Untuk R, angka yang dihitung adalah **berapa bulan sejak belanja terakhir** — dan di sini angka **kecil** yang baik.

Membalik urutannya memastikan skor 5 selalu berarti "terbaik" di ketiga huruf. Kalau lupa membaliknya, pelanggan yang sudah setahun tidak muncul mendapat R = 5 dan masuk segmen Juara. Kodenya tetap jalan, tabelnya tetap rapi, dan seluruh kesimpulannya terbalik.

**Sekarang baca tabelnya dengan benar.**

Juara: 21 persen orang, 44 persen omzet. Ini kelompok yang paling berharga — dan justru yang **paling sedikit butuh perhatian**. Mereka sudah datang sendiri. Mengirimi mereka diskon sering cuma memberi potongan harga untuk belanja yang toh akan terjadi.

Berisiko pergi: 18 persen orang, 18 persen omzet historis. Mereka punya F tinggi — dulu sering belanja — tetapi R rendah — sudah lama tidak muncul.

Ini kelompok yang paling layak digarap, dan alasannya jelas begitu ditulis: **nilai mereka sudah terbukti, dan hubungannya belum putus.** Satu pesan yang tepat bisa mengembalikan pelanggan yang dulu belanja sepuluh kali. Mendatangkan pelanggan baru yang akan belanja sepuluh kali jauh lebih mahal dan jauh lebih tidak pasti.

Sudah hilang: 22 persen orang, dan **seluruhnya** cuma pernah belanja sekali. Ini temuan yang penting — bukan kebetulan pada data ini, melainkan pola yang lazim. Kebanyakan pelanggan yang "hilang" sebenarnya tidak pernah benar-benar datang; mereka mencoba sekali dan tidak kembali.

Memanggil mereka mahal dan hasilnya kecil. Yang lebih berguna: tanyakan kenapa mereka tidak kembali setelah pembelian pertama — dan itu mengarah ke tabel kohort.

**Satu peringatan tentang segmentasi.** Nama segmen seperti "Juara" dan "Berisiko" terdengar sangat meyakinkan, tetapi batasnya adalah pilihan. Mengubah aturan "R >= 4 dan F >= 4" menjadi "R >= 3 dan F >= 4" memindahkan puluhan orang antar segmen.

Jadi uji segmentasimu dengan satu pertanyaan: **apakah setiap segmen punya tindakan yang berbeda?** Kalau dua segmen diperlakukan sama, gabungkan. Segmentasi yang tidak mengubah tindakan cuma hiasan laporan.`
    },
    {
      bahasa: 'python',
      kode: "#   bulan  pembeli aktif  kohort baru  kembali di +1\n#       0             80           80            44%\n#       2            200          130            50%\n#       4            342          180            34%\n#       6            450          230            30%\n#       8            567          280            28%\n#      10            667          330            21%\n#\n# Aktif naik 8 kali lipat.\n# Kohort yang kembali sebulan kemudian turun separuh.\n#\n# Keduanya BENAR sekaligus.",
      penjelasan: `Satu tabel yang menunjukkan kenapa hampir semua dasbor pertumbuhan menyesatkan — bukan karena angkanya salah, melainkan karena angka yang benar menjawab pertanyaan yang keliru.

**Baca kolom kedua dulu, seperti yang dilakukan kebanyakan laporan.**

Pembeli aktif: 80, 200, 342, 450, 567, 667. Naik setiap bulan, tanpa satu pun penurunan. Kalau ini grafik di rapat bulanan, semua orang pulang puas.

**Sekarang baca kolom terakhir.**

Dari kohort bulan 0, 44 persen kembali sebulan kemudian. Dari kohort bulan 10, 21 persen. Toko ini makin gagal membuat orang kembali — kemampuannya mempertahankan pelanggan tinggal **separuh**.

Dan kedua kolom itu benar pada saat yang sama. Tidak ada angka yang dimanipulasi.

**Bagaimana keduanya bisa benar?**

Lihat kolom ketiga. Kohort baru: 80, 130, 180, 230, 280, 330. Toko terus menaikkan anggaran iklan, dan setiap bulan mendatangkan lebih banyak pelanggan baru daripada bulan sebelumnya.

Pembeli aktif adalah **jumlah** dari pelanggan baru bulan ini dan pelanggan lama yang kembali. Selama pelanggan baru terus bertambah cukup cepat, jumlahnya naik — walau porsi yang kembali terus turun.

Jadi angka agregat mencampur dua hal yang sangat berbeda:

- **berapa banyak yang didatangkan** — ditentukan anggaran iklan
- **seberapa baik yang datang dipertahankan** — ditentukan produk dan layanan

Yang pertama bisa dibeli. Yang kedua tidak.

**Kenapa ini berbahaya, dan bukan sekadar menarik.**

Pertumbuhan yang ditopang akuisisi punya sifat khas: ia **berhenti begitu pembeliannya berhenti**. Kalau anggaran iklan tidak bisa naik lagi, yang menopang angka aktif tinggal pelanggan yang kembali — dan justru bagian itulah yang sedang memburuk.

Pada titik itu grafik yang tadinya naik mulus tiba-tiba mendatar lalu turun, dan semua orang bertanya apa yang terjadi bulan itu. Jawabannya: tidak ada yang terjadi bulan itu. Yang terjadi sudah berlangsung sepuluh bulan, dan terlihat jelas di kolom terakhir sejak bulan keempat.

**Kenapa tabel kohort bisa melihatnya dan angka agregat tidak.**

Tabel kohort memisahkan pelanggan berdasarkan **kapan mereka mulai**. Dengan begitu, penurunan pada kohort baru tidak tertutup oleh penambahan jumlah — karena setiap kohort dinilai terhadap ukurannya sendiri.

Ini pola yang berlaku jauh di luar e-commerce. Setiap kali sebuah angka agregat naik, tanyakan: **apakah naiknya karena setiap bagian membaik, atau karena bagian baru terus ditambahkan?** Jumlah mahasiswa yang lulus bisa naik karena penerimaan naik, sementara tingkat kelulusan tiap angkatan turun. Jumlah pengguna aplikasi bisa naik karena promosi, sementara pengguna yang bertahan seminggu makin sedikit.

Pertanyaan itu memisahkan pertumbuhan yang sehat dari pertumbuhan yang dibeli — dan tabel kohort adalah cara menjawabnya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# CRM: segmentasi RFM & retensi per kohort
# ============================================
import random

def rp(n):
    return "Rp " + f"{int(round(n)):,}".replace(",", ".")

# --------------------------------------------
# 1. Data uji: 12 bulan transaksi toko daring
# --------------------------------------------
acak = random.Random(2024)
PELANGGAN = []
# tiap bulan datang pelanggan baru; tiap jenis punya kebiasaan
JENIS = [("setia", 0.70, 1.8, 0.10), ("biasa", 0.35, 1.0, 0.55),
         ("sekali", 0.08, 0.8, 0.35)]
TRANSAKSI = []
nomor = 0
for bulan_daftar in range(12):
    baru = 60 + bulan_daftar * 6       # akuisisi naik tiap bulan
    for _ in range(baru):
        nomor += 1
        r = acak.random()
        batas = 0.0
        for nama, p_kembali, skala, porsi in JENIS:
            batas += porsi
            if r <= batas:
                break
        PELANGGAN.append((nomor, bulan_daftar, nama))
        for bulan in range(bulan_daftar, 12):
            if bulan == bulan_daftar or acak.random() < p_kembali:
                nilai = acak.lognormvariate(11.8, 0.6) * skala
                TRANSAKSI.append((nomor, bulan, nilai))

print("--- data uji ---")
print("  pelanggan : " + f"{len(PELANGGAN):,}".replace(",", "."))
print("  transaksi : " + f"{len(TRANSAKSI):,}".replace(",", "."))
print("  rentang   : 12 bulan (bulan 0 sampai 11)")

# --------------------------------------------
# 2. Prinsip Pareto: siapa yang membawa uang
# --------------------------------------------
print("")
print("--- berapa bagian omzet dari pelanggan teratas ---")
belanja = {}
for n, b, v in TRANSAKSI:
    belanja[n] = belanja.get(n, 0) + v
urut = sorted(belanja.values(), reverse=True)
total = sum(urut)
print("  " + "pelanggan teratas".ljust(20) + "bagian omzet".rjust(14))
for persen in (1, 5, 10, 20, 50):
    k = max(1, len(urut) * persen // 100)
    print("  " + (str(persen) + "%").ljust(20)
          + ("%.1f%%" % (sum(urut[:k]) / total * 100)).rjust(14))
print("")
k20 = len(urut) * 20 // 100
bagian20 = sum(urut[:k20]) / total * 100
print("  Seperlima pelanggan membawa " + ("%.0f%%" % bagian20)
      + " omzet. Angkanya tidak")
print("  harus tepat 80 -- yang penting bentuknya: sedikit")
print("  pelanggan membawa sebagian besar uang.")
print("")
k1 = max(1, len(urut) // 100)
rata_atas = sum(urut[:k1]) / k1
separuh = urut[len(urut) // 2:]
rata_bawah = sum(separuh) / len(separuh)
print("  Rata-rata belanja 1% teratas : " + rp(rata_atas))
print("  Rata-rata separuh terbawah   : " + rp(rata_bawah))
print("")
print("  Kehilangan satu pelanggan dari 1% teratas setara dengan")
print("  kehilangan " + ("%.0f" % (rata_atas / rata_bawah))
      + " pelanggan dari separuh terbawah. Perlakuan")
print("  yang disamaratakan berarti perhatian yang salah alamat.")

# --------------------------------------------
# 3. RFM: tiga pertanyaan tentang tiap pelanggan
# --------------------------------------------
print("")
print("--- RFM: kapan terakhir, seberapa sering, seberapa banyak ---")
KINI = 12   # "hari ini" = awal bulan 12
terakhir, kali = {}, {}
for n, b, v in TRANSAKSI:
    terakhir[n] = max(terakhir.get(n, -1), b)
    kali[n] = kali.get(n, 0) + 1

def skor_kuintil(nilai, balik=False):
    """Beri skor 1-5 berdasarkan urutan (5 = terbaik)."""
    kunci = sorted(nilai, key=lambda k: nilai[k], reverse=not balik)
    hasil = {}
    for i, k in enumerate(kunci):
        hasil[k] = 5 - (i * 5 // len(kunci))
    return hasil

R = skor_kuintil({n: KINI - terakhir[n] for n in belanja}, balik=True)
F = skor_kuintil(kali)
M = skor_kuintil(belanja)

def segmen(r, f, m):
    if r >= 4 and f >= 4:
        return "Juara"
    if r >= 3 and f >= 3:
        return "Setia"
    if r >= 4 and f <= 2:
        return "Baru / menjanjikan"
    if r <= 2 and f >= 3:
        return "BERISIKO pergi"
    if r <= 2 and f <= 2:
        return "Sudah hilang"
    return "Perlu perhatian"

hitung, uang = {}, {}
for n in belanja:
    s = segmen(R[n], F[n], M[n])
    hitung[s] = hitung.get(s, 0) + 1
    uang[s] = uang.get(s, 0) + belanja[n]
URUT_SEG = ["Juara", "Setia", "Baru / menjanjikan", "Perlu perhatian",
            "BERISIKO pergi", "Sudah hilang"]
print("  " + "segmen".ljust(20) + "orang".rjust(7) + "% orang".rjust(9)
      + "% omzet".rjust(9))
for s in URUT_SEG:
    print("  " + s.ljust(20) + str(hitung.get(s, 0)).rjust(7)
          + ("%.0f%%" % (hitung.get(s, 0) / len(belanja) * 100)).rjust(9)
          + ("%.0f%%" % (uang.get(s, 0) / total * 100)).rjust(9))
print("")
print("  Skor tiap huruf 1-5, dibagi rata berdasarkan urutan.")
print("  R tinggi = belanja BARU-BARU ini; F tinggi = SERING;")
print("  M tinggi = BANYAK uangnya.")
print("")
print("  Segmen yang paling berharga untuk ditindaklanjuti bukan")
print("  Juara, melainkan 'BERISIKO pergi': dulu sering belanja,")
print("  sekarang sudah lama tidak muncul. Mereka masih bisa")
print("  dipanggil kembali, dan nilainya sudah terbukti.")
print("")
hilang = [n for n in belanja if segmen(R[n], F[n], M[n]) == "Sudah hilang"]
sekali = sum(1 for n in hilang if kali[n] == 1)
print("  'Sudah hilang' sebaliknya: " + str(sekali) + " dari "
      + str(len(hilang)) + " orang ("
      + ("%.0f%%" % (sekali / len(hilang) * 100)) + ")")
print("  cuma pernah belanja SEKALI. Memanggil mereka mahal, dan")
print("  hubungannya memang tidak pernah terbentuk.")

# --------------------------------------------
# 4. Retensi per kohort
# --------------------------------------------
print("")
print("--- retensi kohort: berapa yang kembali tiap bulan ---")
aktif = {}
for n, b, v in TRANSAKSI:
    aktif.setdefault(n, set()).add(b)
kohort = {}
for n, bd, _ in PELANGGAN:
    kohort.setdefault(bd, []).append(n)
print("  (% pelanggan kohort yang belanja di bulan ke-k sejak daftar)")
print("")
KOLOM = 6
print("  " + "kohort".ljust(9) + "ukuran".rjust(7)
      + "".join(("+" + str(k)).rjust(7) for k in range(KOLOM)))
for bd in range(0, 12, 2):
    anggota = kohort[bd]
    isi = ""
    for k in range(KOLOM):
        if bd + k > 11:
            isi += "".rjust(7)
            continue
        kembali = sum(1 for n in anggota if (bd + k) in aktif[n])
        isi += ("%.0f%%" % (kembali / len(anggota) * 100)).rjust(7)
    print("  " + ("bulan " + str(bd)).ljust(9) + str(len(anggota)).rjust(7)
          + isi)
print("")
print("  Kolom +0 selalu 100% -- itu bulan mereka mendaftar.")
print("  Kolom +1 adalah angka terpenting di seluruh tabel: ia")
print("  menunjukkan berapa yang kembali SEKALI LAGI. Sesudahnya")
print("  kurvanya melandai, karena yang tersisa adalah yang")
print("  memang cocok dengan tokonya.")

# --------------------------------------------
# 5. Angka yang naik bisa menyembunyikan yang turun
# --------------------------------------------
print("")
print("--- 'pembeli aktif naik terus' -- tapi coba lihat ini ---")
# skenario kedua: retensi MEMBURUK tiap bulan, akuisisi naik cepat
acak2 = random.Random(5)
aktif_bulan, baru_bulan = [], []
populasi = []           # [bulan daftar, peluang kembali, id]
kembali_di = {}         # (bulan daftar, bulan) -> jumlah yang kembali
nid = 0
for bulan in range(12):
    p_kembali = 0.45 - bulan * 0.025   # makin buruk tiap bulan
    baru = 80 + bulan * 25             # iklan dinaikkan terus
    kembali_bulan_ini = 0
    for bd, p, _ in populasi:
        if acak2.random() < p * (0.85 ** (bulan - bd - 1)):
            kembali_bulan_ini += 1
            kembali_di[(bd, bulan)] = kembali_di.get((bd, bulan), 0) + 1
    for _ in range(baru):
        nid += 1
        populasi.append((bulan, p_kembali, nid))
    aktif_bulan.append(baru + kembali_bulan_ini)
    baru_bulan.append(baru)
print("  " + "bulan".rjust(6) + "pembeli aktif".rjust(15)
      + "kohort baru".rjust(13) + "kembali di +1".rjust(15))
ret1 = {}
for b in range(0, 11, 2):
    ret1[b] = kembali_di.get((b, b + 1), 0) / baru_bulan[b] * 100
    print("  " + str(b).rjust(6) + str(aktif_bulan[b]).rjust(15)
          + str(baru_bulan[b]).rjust(13)
          + ("%.0f%%" % ret1[b]).rjust(15))
print("")
print("  Kolom kedua naik dari " + str(aktif_bulan[0]) + " ke "
      + str(aktif_bulan[10]) + ". Laporan yang cuma")
print("  memuat angka itu akan tampak sangat baik.")
print("")
print("  Kolom terakhir bercerita lain: dari kohort bulan 0,")
print("  " + ("%.0f%%" % ret1[0]) + " kembali sebulan kemudian. Dari kohort bulan 10,")
print("  tinggal " + ("%.0f%%" % ret1[10]) + ". Toko makin gagal membuat orang kembali.")
print("")
print("  Keduanya benar sekaligus, dan itu intinya. Angka aktif")
print("  naik karena kohort BARU terus ditambahkan, makin besar")
print("  tiap bulan. Tambahan itu menutupi kenyataan bahwa tiap")
print("  kohort bertahan makin buruk.")
print("")
print("  Angka agregat tidak bisa memisahkan dua hal itu. Tabel")
print("  kohort bisa -- dan karena itu ia yang harus dibaca")
print("  sebelum memutuskan menambah anggaran iklan.")

# --------------------------------------------
# 6. Data pelanggan dan UU Perlindungan Data Pribadi
# --------------------------------------------
print("")
print("--- data mana yang benar-benar perlu disimpan ---")
KOLOM_DATA = [
    ("Nama & alamat kirim",   "YA",    "tanpanya barang tak sampai"),
    ("Nomor telepon",         "YA",    "kurir butuh menghubungi"),
    ("Riwayat belanja",       "YA",    "bahan RFM & kohort di atas"),
    ("Tanggal lahir lengkap", "ragu",  "cukup bulan, untuk promo"),
    ("Nomor KTP",             "TIDAK", "tidak ada gunanya bagi toko"),
    ("Foto selfie + KTP",     "TIDAK", "risiko besar, manfaat nol"),
]
for a, b, c in KOLOM_DATA:
    print("  " + a.ljust(23) + b.ljust(7) + c)
print("")
print("  Seluruh analisis di atas cuma butuh id pelanggan, waktu")
print("  transaksi, dan nilainya. Tidak ada satu pun yang butuh")
print("  nomor KTP atau tanggal lahir lengkap.")
print("")
print("  UU Perlindungan Data Pribadi (UU 27/2022) mewajibkan")
print("  data dikumpulkan sesuai tujuan yang jelas. Data yang")
print("  tidak diperlukan bukan aset -- ia kewajiban: harus")
print("  dijaga, dan bocornya jadi tanggung jawab toko.")` },
  output: `--- data uji ---
  pelanggan : 1.116
  transaksi : 2.593
  rentang   : 12 bulan (bulan 0 sampai 11)

--- berapa bagian omzet dari pelanggan teratas ---
  pelanggan teratas     bagian omzet
  1%                            7.0%
  5%                           22.1%
  10%                          34.6%
  20%                          52.6%
  50%                          82.9%

  Seperlima pelanggan membawa 53% omzet. Angkanya tidak
  harus tepat 80 -- yang penting bentuknya: sedikit
  pelanggan membawa sebagian besar uang.

  Rata-rata belanja 1% teratas : Rp 2.886.255
  Rata-rata separuh terbawah   : Rp 139.749

  Kehilangan satu pelanggan dari 1% teratas setara dengan
  kehilangan 21 pelanggan dari separuh terbawah. Perlakuan
  yang disamaratakan berarti perhatian yang salah alamat.

--- RFM: kapan terakhir, seberapa sering, seberapa banyak ---
  segmen                orang  % orang  % omzet
  Juara                   232      21%      44%
  Setia                   232      21%      24%
  Baru / menjanjikan      126      11%       4%
  Perlu perhatian          80       7%       2%
  BERISIKO pergi          206      18%      18%
  Sudah hilang            240      22%       8%

  Skor tiap huruf 1-5, dibagi rata berdasarkan urutan.
  R tinggi = belanja BARU-BARU ini; F tinggi = SERING;
  M tinggi = BANYAK uangnya.

  Segmen yang paling berharga untuk ditindaklanjuti bukan
  Juara, melainkan 'BERISIKO pergi': dulu sering belanja,
  sekarang sudah lama tidak muncul. Mereka masih bisa
  dipanggil kembali, dan nilainya sudah terbukti.

  'Sudah hilang' sebaliknya: 240 dari 240 orang (100%)
  cuma pernah belanja SEKALI. Memanggil mereka mahal, dan
  hubungannya memang tidak pernah terbentuk.

--- retensi kohort: berapa yang kembali tiap bulan ---
  (% pelanggan kohort yang belanja di bulan ke-k sejak daftar)

  kohort    ukuran     +0     +1     +2     +3     +4     +5
  bulan 0       60   100%    27%    23%    28%    32%    27%
  bulan 2       72   100%    28%    25%    25%    25%    29%
  bulan 4       84   100%    24%    32%    20%    33%    29%
  bulan 6       96   100%    31%    28%    34%    30%    25%
  bulan 8      108   100%    29%    23%    23%              
  bulan 10     120   100%    33%                            

  Kolom +0 selalu 100% -- itu bulan mereka mendaftar.
  Kolom +1 adalah angka terpenting di seluruh tabel: ia
  menunjukkan berapa yang kembali SEKALI LAGI. Sesudahnya
  kurvanya melandai, karena yang tersisa adalah yang
  memang cocok dengan tokonya.

--- 'pembeli aktif naik terus' -- tapi coba lihat ini ---
   bulan  pembeli aktif  kohort baru  kembali di +1
       0             80           80            44%
       2            200          130            50%
       4            342          180            34%
       6            450          230            30%
       8            567          280            28%
      10            667          330            21%

  Kolom kedua naik dari 80 ke 667. Laporan yang cuma
  memuat angka itu akan tampak sangat baik.

  Kolom terakhir bercerita lain: dari kohort bulan 0,
  44% kembali sebulan kemudian. Dari kohort bulan 10,
  tinggal 21%. Toko makin gagal membuat orang kembali.

  Keduanya benar sekaligus, dan itu intinya. Angka aktif
  naik karena kohort BARU terus ditambahkan, makin besar
  tiap bulan. Tambahan itu menutupi kenyataan bahwa tiap
  kohort bertahan makin buruk.

  Angka agregat tidak bisa memisahkan dua hal itu. Tabel
  kohort bisa -- dan karena itu ia yang harus dibaca
  sebelum memutuskan menambah anggaran iklan.

--- data mana yang benar-benar perlu disimpan ---
  Nama & alamat kirim    YA     tanpanya barang tak sampai
  Nomor telepon          YA     kurir butuh menghubungi
  Riwayat belanja        YA     bahan RFM & kohort di atas
  Tanggal lahir lengkap  ragu   cukup bulan, untuk promo
  Nomor KTP              TIDAK  tidak ada gunanya bagi toko
  Foto selfie + KTP      TIDAK  risiko besar, manfaat nol

  Seluruh analisis di atas cuma butuh id pelanggan, waktu
  transaksi, dan nilainya. Tidak ada satu pun yang butuh
  nomor KTP atau tanggal lahir lengkap.

  UU Perlindungan Data Pribadi (UU 27/2022) mewajibkan
  data dikumpulkan sesuai tujuan yang jelas. Data yang
  tidak diperlukan bukan aset -- ia kewajiban: harus
  dijaga, dan bocornya jadi tanggung jawab toko.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Jumlahkan belanja per pelanggan', waktu: 'O(T)', memori: 'T = jumlah transaksi' },
      { operasi: 'Skor RFM berdasarkan urutan', waktu: 'O(P log P)', memori: 'P = jumlah pelanggan, didominasi pengurutan' },
      { operasi: 'Kelompokkan ke segmen', waktu: 'O(P)', memori: 'satu aturan per pelanggan' },
      { operasi: 'Tabel kohort', waktu: 'O(T + K . B)', memori: 'K kohort, B kolom bulan' },
      { operasi: 'Analisis Pareto', waktu: 'O(P log P)', memori: 'urutkan pelanggan per belanja' }
    ],
    intuisi: `Seluruh analisis di bab ini cukup satu atau dua kali telusur data transaksi ditambah satu pengurutan. Untuk toko dengan jutaan transaksi, ia selesai dalam hitungan detik — bahkan di spreadsheet untuk toko kecil.

Yang mahal bukan komputasinya, melainkan **kebiasaan membacanya**. Dasbor yang cuma menampilkan pembeli aktif, omzet, dan jumlah pesanan lebih mudah dibuat dan lebih enak dilihat. Tabel kohort lebih sulit dibaca dan sering menampilkan kabar buruk.

Tetapi justru karena itu ia berharga: ukuran yang cuma pernah menampilkan kabar baik tidak memberi informasi apa pun.`
  },

  kesalahanUmum: [
    {
      salah: 'Menilai kesehatan toko dari jumlah pembeli aktif saja.',
      kenapa: 'Jumlah aktif mencampur pelanggan baru yang didatangkan iklan dengan pelanggan lama yang kembali. Angkanya bisa terus naik karena akuisisi bertambah, sementara kemampuan mempertahankan pelanggan terus memburuk.',
      benar: 'Pisahkan pelanggan baru dan yang kembali, dan pantau retensi per kohort di samping angka agregat.'
    },
    {
      salah: 'Memberi skor RFM dengan batas angka tetap.',
      kenapa: 'Batas tetap membeku sementara skala toko berubah, sehingga ketika rata-rata belanja naik makin banyak pelanggan masuk skor tertinggi dan skornya berhenti membedakan. Inflasi harga juga menaikkan kelas pelanggan yang perilakunya tidak berubah.',
      benar: 'Beri skor berdasarkan urutan relatif, misalnya kuintil, sehingga setiap skor selalu mewakili porsi pelanggan yang sama.'
    },
    {
      salah: 'Lupa membalik arah skor recency.',
      kenapa: 'Recency diukur sebagai lama sejak transaksi terakhir, sehingga angka kecil yang baik, berlawanan dengan frequency dan monetary. Tanpa pembalikan, pelanggan yang sudah lama tidak muncul mendapat skor tertinggi dan seluruh segmentasinya terbalik tanpa ada galat.',
      benar: 'Balik urutan untuk recency sehingga skor tertinggi di ketiga huruf selalu berarti terbaik, lalu periksa beberapa pelanggan secara manual.'
    },
    {
      salah: 'Mengarahkan promo terbesar kepada pelanggan terbaik.',
      kenapa: 'Pelanggan terbaik sudah datang sendiri, sehingga diskon untuk mereka sering hanya memotong harga pembelian yang toh akan terjadi. Pelanggan yang dulu sering belanja lalu menghilang lebih layak dipanggil kembali karena nilainya sudah terbukti.',
      benar: 'Prioritaskan segmen berisiko pergi untuk upaya memanggil kembali, dan beri pelanggan terbaik pengakuan alih-alih potongan harga.'
    },
    {
      salah: 'Membuat banyak segmen yang diperlakukan dengan cara yang sama.',
      kenapa: 'Segmentasi berguna hanya bila tiap segmen mengubah tindakan yang diambil. Segmen yang diperlakukan sama cuma menambah kerumitan laporan tanpa menambah keputusan.',
      benar: 'Tetapkan satu tindakan berbeda untuk setiap segmen, dan gabungkan segmen yang tindakannya ternyata sama.'
    },
    {
      salah: 'Menambah anggaran iklan tanpa memeriksa retensi kohort terbaru.',
      kenapa: 'Iklan yang mendatangkan pelanggan yang tidak kembali hanya membeli angka sementara, dan pertumbuhannya berhenti begitu anggarannya berhenti naik. Penurunan retensi kohort baru biasanya terlihat berbulan-bulan sebelum angka agregat mendatar.',
      benar: 'Periksa kolom retensi bulan pertama untuk kohort terbaru sebelum setiap keputusan menaikkan anggaran akuisisi.'
    },
    {
      salah: 'Mengumpulkan data pelanggan sebanyak mungkin untuk berjaga-jaga.',
      kenapa: 'Data yang tidak punya tujuan jelas tetap harus dijaga, dan kebocorannya menjadi tanggung jawab toko menurut UU Perlindungan Data Pribadi. Analisis RFM dan kohort hanya membutuhkan id, waktu, dan nilai transaksi.',
      benar: 'Tulis tujuan setiap kolom data pelanggan, dan berhenti mengumpulkan kolom yang tidak punya tujuan.'
    }
  ],

  analogi: `Bayangkan kamu mengelola **warung makan** dekat kampus.

Setiap bulan kamu menghitung berapa orang yang makan di warungmu. Bulan pertama 80 orang. Bulan berikutnya 200. Lalu 340, 450, 570, 670. Naik terus.

Kamu senang, dan terus menyebar brosur lebih banyak setiap bulan.

Sekarang coba hitung dengan cara lain. Dari mahasiswa baru yang pertama kali makan di warungmu **bulan Januari**, berapa yang datang lagi di Februari? Dan dari yang pertama kali makan di **bulan Oktober**, berapa yang datang lagi di November?

Ternyata: dari angkatan Januari, hampir separuh kembali. Dari angkatan Oktober, cuma seperlima.

Ada yang memburuk. Mungkin porsinya mengecil. Mungkin rasanya berubah sejak juru masak ganti. Mungkin antreannya makin panjang karena warungnya makin ramai.

Yang jelas: **orang makin jarang kembali**, dan kamu tidak menyadarinya karena brosurmu terus mendatangkan wajah baru.

Hitungan pertama — jumlah pengunjung bulanan — tidak salah. Ia cuma menjawab pertanyaan yang keliru.

**Sekarang soal siapa yang diperhatikan.**

Di antara pelangganmu ada tiga jenis orang.

Ada **langganan tetap** yang makan hampir tiap hari. Mereka tidak butuh diskon — mereka sudah datang. Memberi mereka potongan harga cuma mengurangi pemasukanmu dari makanan yang toh akan mereka beli.

Ada **mahasiswa yang dulu hampir tiap hari datang**, tetapi sebulan terakhir tidak kelihatan. Ini yang paling layak kamu cari tahu. Mungkin ia pindah kos. Mungkin ia kecewa dengan sesuatu. Satu pertanyaan atau satu tawaran kecil bisa mengembalikan pelanggan yang dulu makan dua puluh kali sebulan.

Dan ada **yang cuma pernah makan sekali**, setahun lalu, lalu tidak pernah kembali. Mengejar mereka mahal dan hasilnya kecil — hubungannya memang tidak pernah terbentuk.

**Terakhir, soal catatan.**

Untuk mengetahui semua ini, kamu cuma perlu satu buku: siapa yang makan, kapan, dan berapa bayarnya. Nama panggilan cukup.

Kamu tidak butuh fotokopi KTP pelanggan, tanggal lahirnya, atau alamat rumah orang tuanya. Kalau buku itu hilang, yang ada di dalamnya cuma catatan makan — bukan data yang bisa disalahgunakan orang lain.`,

  latihan: [
    'Siapkan data transaksi tiga kolom dari toko nyata atau data contoh, lalu jelaskan kenapa kolom lain tidak diperlukan.',
    'Hitung porsi omzet dari satu, lima, sepuluh, dua puluh, dan lima puluh persen pelanggan teratas.',
    'Hitung berapa pelanggan separuh terbawah yang setara dengan satu pelanggan dari satu persen teratas.',
    'Beri skor RFM berdasarkan kuintil, lalu periksa lima pelanggan secara manual untuk memastikan arah skor recency sudah benar.',
    'Kelompokkan pelanggan ke enam segmen, lalu tulis satu tindakan berbeda untuk setiap segmen.',
    'Hitung porsi pelanggan segmen sudah hilang yang cuma pernah belanja sekali, lalu jelaskan akibatnya bagi strategi memanggil kembali.',
    'Susun tabel kohort bulanan dengan enam kolom, lalu jelaskan cara membacanya per baris dan per kolom.',
    'Buat simulasi toko dengan akuisisi naik dan retensi turun, lalu tunjukkan bahwa jumlah aktif tetap naik.',
    'Sebutkan dua contoh di luar e-commerce di mana angka agregat bisa naik sementara setiap bagiannya memburuk.',
    'Tinjau formulir pendaftaran sebuah toko daring, lalu tentukan kolom mana yang tidak punya tujuan yang jelas.'
  ]
});


TOPICS.push({
  id: 'ecom-harga-iklan',
  judul: 'Harga, Diskon, Gratis Ongkir & Iklan Berbayar',
  kategori: 'ecommerce',
  tag: ['diskon', 'marjin', 'harga optimal', 'gratis ongkir', 'CPM', 'CPC', 'ROAS', 'iklan berbayar'],
  ringkas: 'Diskon 10 persen pada marjin 20 persen menuntut penjualan naik dua kali lipat — cuma supaya laba tidak turun.',

  fungsi: `**Menghitung apakah sebuah promo, harga, atau kampanye iklan benar-benar menambah laba — bukan cuma menambah omzet.**

Terpakai di:

- **Merancang promo** diskon dan gratis ongkir yang tidak diam-diam merugikan
- **Menetapkan harga** berdasarkan laba, bukan berdasarkan harga pesaing atau "yang terasa pas"
- **Menilai kampanye iklan** di marketplace dan media sosial — dan menetapkan target ROAS per produk
- **Menjawab klien** yang meminta "diskon besar-besaran supaya ramai"
- **Tugas akhir** bertema strategi pemasaran digital atau sistem pendukung keputusan harga

Yang paling sering menjebak: **diskon dipotong dari harga, tetapi yang berkurang adalah marjin.** Dengan marjin 20 persen, diskon 10 persen memotong laba per barang menjadi separuh — dan penjualan harus naik dua kali lipat hanya untuk impas.

Dan satu angka yang sering dirayakan padahal merugikan: **ROAS yang terdengar bagus.** ROAS 2,16 berarti setiap seribu rupiah iklan kembali jadi 2.160 rupiah **omzet** — bukan laba. Untuk barang bermarjin 25 persen, kampanye yang sama itu rugi.`,
  praktik: {
    tujuan: 'Kamu bisa menghitung kenaikan penjualan yang dibutuhkan sebuah diskon, mencari harga dengan laba terbesar dari kurva permintaan, menilai biaya sesungguhnya ambang gratis ongkir, dan menetapkan ROAS impas per produk.',
    alat: ['Data harga pokok dan harga jual beberapa produk', 'Data nilai keranjang pesanan, minimal beberapa ratus', 'Laporan iklan: tayangan, klik, pesanan, biaya'],
    langkah: [
      { judul: 'Hitung marjin setiap produk lebih dulu',
        isi: `\`marjin = (harga - HPP) / harga\`. Semua keputusan di bab ini bergantung pada angka ini, dan banyak toko tidak tahu marjin per produknya.

Masukkan seluruh biaya variabel ke HPP: harga beli, kemasan, komisi marketplace, biaya pembayaran. Marjin yang terlihat 40 persen sering tinggal 25 setelah semua potongan dihitung.` },
      { judul: 'Hitung kenaikan penjualan yang dibutuhkan diskonmu',
        isi: `\`kenaikan = diskon / (marjin - diskon)\`. Kalau hasilnya tidak masuk akal untuk dicapai, diskonnya merugikan.

Tulis angka ini di proposal promo. Ia mengubah percakapan dari "ramaikan toko" menjadi "promo ini harus menambah penjualan sekian persen untuk impas".` },
      { judul: 'Taksir kurva permintaan dari data harga lama',
        isi: `Kalau pernah mengubah harga, catat berapa unit terjual di tiap harga. Dua atau tiga titik sudah cukup untuk menaksir garis kasar.

Lalu hitung laba — bukan omzet — di berbagai harga. Harga dengan omzet terbesar hampir selalu lebih rendah daripada harga dengan laba terbesar.` },
      { judul: 'Pisahkan penerima gratis ongkir menjadi dua kelompok',
        isi: `Yang **menambah belanja** karena ambang, dan yang **sudah di atas ambang** sebelum promo. Kelompok kedua mendapat hadiah tanpa mengubah apa pun.

Hitung porsinya dari data keranjang sebelum promo. Pada contoh di topik ini, 61 persen penerima gratis ongkir sudah di atas ambang.` },
      { judul: 'Bandingkan beberapa ambang',
        isi: `Hitung selisih laba untuk beberapa ambang berbeda: laba dari belanja tambahan dikurangi seluruh ongkir yang ditanggung.

Ambang yang lebih tinggi hampir selalu mengecilkan kerugian. Lalu putuskan apakah kenaikan konversi yang dibawa promo — yang tidak ada di hitungan ini — cukup untuk menutup sisanya.` },
      { judul: 'Susun rantai iklan dari tayangan ke pesanan',
        isi: `Tayangan → klik (CTR) → pesanan (konversi) → omzet. Hitung biaya per klik dan biaya per pesanan.

Rantai ini menunjukkan di mana perbaikan paling berharga. Menggandakan konversi halaman produk sama nilainya dengan memotong separuh biaya iklan.` },
      { judul: 'Tetapkan ROAS impas per produk',
        isi: `\`ROAS impas = 1 / marjin\`. Produk bermarjin 25 persen butuh ROAS 4 hanya untuk impas; produk bermarjin 50 persen cukup ROAS 2.

Jangan pakai satu target ROAS untuk seluruh toko. Target yang diseragamkan membuat produk bermarjin tipis diiklankan dengan rugi, dan produk bermarjin tebal kurang diiklankan.` },
      { judul: 'Laporkan laba iklan, bukan omzet iklan',
        isi: `\`laba iklan = omzet x marjin - biaya iklan\`. Tambahkan kolom ini ke laporan iklanmu.

Setelah kolom ini ada, kampanye yang "ROAS-nya bagus" tapi merugi akan terlihat sendiri — tanpa perlu diperdebatkan.` }
    ],
    cek: [
      'Kamu tahu marjin setiap produk yang kamu promosikan, setelah seluruh potongan',
      'Setiap usulan diskonmu disertai kenaikan penjualan yang dibutuhkan untuk impas',
      'Kamu tahu berapa persen penerima gratis ongkir yang sudah di atas ambang sebelum promo',
      'Laporan iklanmu memuat laba, bukan cuma ROAS'
    ]
  },

  judulLogicSyntax: 'Bedah Rumus — kenapa diskon kecil butuh kenaikan besar',

  konsep: `Hampir semua keputusan pemasaran di toko daring diambil dengan melihat **omzet**. Bab ini menghitung ulang keputusan yang sama dengan melihat **laba** — dan hasilnya sering berlawanan.

**Diskon memakan marjin, bukan harga**

Berapa penjualan harus naik agar laba kotor tetap sama setelah diskon?

\`kenaikan = diskon / (marjin - diskon)\`

| Marjin | Diskon 5% | Diskon 10% | Diskon 15% | Diskon 20% |
|---|---|---|---|---|
| 20% | +33% | **+100%** | +300% | rugi |
| 30% | +20% | +50% | +100% | +200% |
| 40% | +14% | +33% | +60% | +100% |
| 50% | +11% | +25% | +43% | +67% |

Baca baris pertama. Dengan marjin 20 persen, diskon 10 persen menuntut penjualan naik **100 persen — dua kali lipat** — hanya supaya laba kotornya tetap sama.

Sebabnya: diskon dipotong dari **harga**, tetapi yang berkurang adalah **marjin**. Dari marjin 20 ke 10, laba per barang tinggal separuh. Menutupnya butuh dua kali lipat barang.

Diskon 20 persen pada marjin 20 persen berarti menjual tanpa laba sama sekali. Menjual lebih banyak cuma melipatgandakan nol.

**Satu contoh lengkap**

Harga Rp 200.000, HPP Rp 150.000 (marjin 25%), terjual 400 unit, laba Rp 20.000.000:

| Diskon | Harga | Laba/unit | Unit yang perlu | Naik |
|---|---|---|---|---|
| 0% | Rp 200.000 | Rp 50.000 | 400 | — |
| 5% | Rp 190.000 | Rp 40.000 | 500 | +25% |
| 10% | Rp 180.000 | Rp 30.000 | 667 | +67% |
| 15% | Rp 170.000 | Rp 20.000 | 1.000 | **+150%** |
| 20% | Rp 160.000 | Rp 10.000 | 2.000 | +400% |

Kalau promo diskon 15 persen "berhasil" menaikkan penjualan 30 persen — yang sudah tergolong sukses untuk promo — labanya jadi **Rp 10.400.000**. Hampir separuh hilang, padahal penjualannya naik.

**Harga yang memberi laba terbesar**

Dengan permintaan \`unit = 1800 - 0,008 x harga\` dan biaya per unit Rp 80.000:

| Harga | Unit | Omzet | Laba |
|---|---|---|---|
| Rp 112.500 | 900 | **Rp 101.250.000** | Rp 29.250.000 |
| Rp 137.500 | 700 | Rp 96.250.000 | Rp 40.250.000 |
| Rp 150.000 | 600 | Rp 90.000.000 | Rp 42.000.000 |
| Rp 162.500 | 500 | Rp 81.250.000 | Rp 41.250.000 |
| Rp 187.500 | 300 | Rp 56.250.000 | Rp 32.250.000 |

- omzet terbesar di harga **Rp 112.500**
- laba terbesar di harga **Rp 152.500** — laba Rp 42.050.000

Dua harga itu berbeda, dan yang pertama lebih murah. Toko yang mengejar omzet menjual 900 unit alih-alih 580, bekerja lebih keras, dan untungnya **30 persen lebih kecil**.

Rumusnya: harga dengan laba terbesar ada **di tengah** antara biaya per unit dan harga saat permintaan jadi nol. Biaya menarik harga optimal ke atas — setiap unit yang terjual harus menanggungnya.

**Ambang gratis ongkir**

5.000 keranjang, ambang Rp 150.000, ongkir ditanggung toko Rp 18.000. Pembeli yang kurang sampai Rp 25.000 dari ambang menambah barang secukupnya.

- rata-rata keranjang naik **2,2 persen**
- 737 pembeli menambah barang
- 1.881 pesanan mendapat gratis ongkir

| | |
|---|---|
| laba dari belanja tambahan (marjin 25%) | Rp 3.313.828 |
| ongkir yang ditanggung | Rp 33.858.000 |
| **selisih** | **Rp −30.544.172** |

Dari 1.881 penerima gratis ongkir, **1.144 (61 persen)** sudah di atas ambang sebelum ada promo. Toko membayar ongkir mereka tanpa mengubah apa pun.

| Ambang | Menambah belanja | Sudah di atas | Selisih laba |
|---|---|---|---|
| Rp 150.000 | 737 | 1.144 | Rp −30.544.172 |
| Rp 200.000 | 271 | 402 | Rp −10.849.542 |
| Rp 250.000 | 90 | 142 | Rp −3.751.662 |
| Rp 300.000 | 25 | 57 | Rp −1.362.650 |

Menaikkan ambang mengecilkan kerugian. Tetapi pada data ini **tidak ada ambang yang membuat promonya untung** dari penambahan belanja saja.

Pelajarannya bukan "jangan gratis ongkir". Gratis ongkir sering tetap layak karena ia menaikkan **konversi** — pembeli yang tadinya batal jadi membeli — dan itu tidak ada di hitungan ini. Pelajarannya: **hitung biayanya dengan jujur**, lalu putuskan apakah kenaikan konversinya cukup untuk menutupnya.

**Iklan: dari tayangan ke pesanan**

| Tahap | Nilai |
|---|---|
| Tayangan | 200.000 |
| Biaya iklan (CPM Rp 25.000) | Rp 5.000.000 |
| Klik (CTR 1,2%) | 2.400 — Rp 2.083 per klik |
| Pesanan (konversi 2,5%) | 60 — Rp 83.333 per pesanan |
| Omzet | Rp 10.800.000 |
| **ROAS** | **2,16** |

**ROAS impas bergantung pada marjin**

\`ROAS impas = 1 / marjin\`

| Marjin | ROAS impas | Kampanye yang sama (ROAS 2,16) |
|---|---|---|
| 15% | 6,7 | rugi Rp 3.380.000 |
| 25% | 4,0 | rugi Rp 2.300.000 |
| 35% | 2,9 | rugi Rp 1.220.000 |
| 50% | 2,0 | untung Rp 400.000 |
| 70% | 1,4 | untung Rp 2.560.000 |

Kampanye yang sama, ROAS yang sama — hasilnya rugi atau untung tergantung marjin barangnya.

ROAS 2,16 terdengar seperti "setiap seribu rupiah iklan kembali jadi 2.160 rupiah". Padahal yang kembali **omzet**, bukan laba. Karena itu target ROAS tidak boleh diseragamkan antar produk: barang bermarjin tipis butuh ROAS jauh lebih tinggi hanya untuk impas.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def kenaikan_perlu(marjin, diskon):\n    if diskon >= marjin:\n        return None                      # rugi berapa pun jualnya\n    return diskon / (marjin - diskon)\n\n# marjin 20%, diskon 10%  ->  +100%  (dua kali lipat)\n# marjin 25%, diskon 15%  ->  +150%\n# marjin 50%, diskon 10%  ->   +25%\n#\n# Contoh: diskon 15% 'berhasil' menaikkan penjualan 30%\n#   laba awal   Rp 20.000.000\n#   laba promo  Rp 10.400.000   <- penjualan naik, laba hampir separuh",
      penjelasan: `Satu rumus yang hampir tidak pernah dihitung sebelum promo diluncurkan — dan menjelaskan kenapa banyak toko yang ramai tetap tidak untung.

**Dari mana rumusnya.** Laba kotor sebelum diskon adalah \`unit x (harga x marjin)\`. Setelah diskon d, harga turun sebesar \`harga x d\`, dan seluruh penurunan itu diambil **dari marjin** — harga pokoknya tidak ikut turun. Jadi laba per unit menjadi \`harga x (marjin - d)\`.

Supaya laba total sama, unit harus naik dengan faktor \`marjin / (marjin - d)\`. Dikurangi satu, itulah kenaikan yang dibutuhkan: \`d / (marjin - d)\`.

**Sekarang lihat kenapa hasilnya mengejutkan.**

Penyebutnya \`marjin - d\`. Ketika diskon mendekati marjin, penyebut itu mendekati nol — dan kenaikan yang dibutuhkan meledak menuju tak hingga.

Dengan marjin 20 persen, diskon 10 persen sudah memakan **separuh** marjin. Laba per barang tinggal separuh, jadi penjualan harus dua kali lipat. Diskon 15 persen memakan tiga perempat marjin — penjualan harus empat kali lipat.

Naluri kita membaca "diskon 10 persen" sebagai "pengorbanan kecil, 10 persen". Rumus ini menunjukkan bahwa ukurannya yang benar adalah **diskon dibanding marjin**, bukan diskon dibanding harga. Dan dibanding marjin 20 persen, diskon 10 persen adalah pengorbanan **setengah**.

**Bagian kedua kode ini yang paling berguna untuk diingat.**

Promo diskon 15 persen yang menaikkan penjualan 30 persen akan dilaporkan sebagai sukses. Penjualan naik hampir sepertiga. Toko lebih ramai. Grafiknya naik.

Dan labanya turun dari Rp 20 juta menjadi Rp 10,4 juta — hampir separuh hilang.

Ini bentuk kegagalan yang licin karena **setiap ukuran yang biasa dilihat terlihat baik**. Omzet naik, jumlah pesanan naik, pelanggan senang. Yang turun cuma satu angka yang jarang ada di laporan harian.

**Kapan diskon tetap masuk akal.**

Rumus ini tidak mengatakan diskon selalu buruk. Ia mengatakan diskon punya **harga yang bisa dihitung**, dan ada beberapa keadaan yang membenarkannya:

- **marjin tebal** — dengan marjin 50 persen, diskon 10 persen cuma butuh kenaikan 25 persen
- **menghabiskan stok** yang akan usang — kalau alternatifnya barang dibuang, laba nol tetap lebih baik daripada rugi
- **mendatangkan pelanggan baru** yang akan kembali — asal tabel kohort menunjukkan mereka memang kembali
- **menjual barang lain** di keranjang yang sama — asal hitungannya memasukkan laba barang lain itu

Setiap alasan itu bisa dihitung. Yang tidak bisa dipertahankan adalah diskon tanpa hitungan, dengan alasan "supaya ramai".`
    },
    {
      bahasa: 'python',
      kode: "roas = omzet / biaya              # 10.800.000 / 5.000.000 = 2,16\n\nfor marjin in (0.15, 0.25, 0.35, 0.50, 0.70):\n    impas = 1 / marjin\n    laba = omzet * marjin - biaya\n\n#   marjin  ROAS impas   kampanye ROAS 2,16\n#     15%       6,7      RUGI   Rp 3.380.000\n#     25%       4,0      RUGI   Rp 2.300.000\n#     35%       2,9      RUGI   Rp 1.220.000\n#     50%       2,0      untung Rp   400.000\n#     70%       1,4      untung Rp 2.560.000",
      penjelasan: `Satu angka yang dirayakan di hampir setiap laporan iklan, dan satu rumus sederhana yang menunjukkan kapan perayaan itu salah.

**Apa sebenarnya ROAS.** Return on ad spend: omzet yang dihasilkan iklan dibagi biaya iklannya. ROAS 2,16 berarti setiap Rp 1.000 iklan menghasilkan Rp 2.160 **omzet**.

Kata yang harus digarisbawahi: **omzet**. Bukan laba.

Dari Rp 2.160 omzet itu, sebagian besar adalah harga pokok barang — uang yang harus dibayarkan ke pemasok. Yang tersisa untuk toko cuma marjinnya.

**Dari situ rumus ROAS impas.**

Laba iklan = omzet x marjin − biaya iklan. Impas ketika laba nol:

\`omzet x marjin = biaya\`, jadi \`omzet / biaya = 1 / marjin\`

ROAS impas adalah **kebalikan marjin**. Barang bermarjin 25 persen butuh ROAS 4 hanya untuk impas. Barang bermarjin 50 persen cukup ROAS 2.

**Sekarang baca tabelnya.**

Kampanye yang **sama persis** — tayangan sama, klik sama, pesanan sama, biaya sama, ROAS 2,16 — menghasilkan rugi Rp 3,38 juta kalau barangnya bermarjin 15 persen, dan untung Rp 2,56 juta kalau bermarjin 70 persen.

Tidak ada yang berbeda dari kampanyenya. Yang berbeda cuma **apa yang dijual**.

Artinya, ROAS sendirian **tidak bisa** memberi tahu apakah sebuah kampanye berhasil. Ia harus dibaca bersama marjin produknya.

**Kesalahan yang paling sering di lapangan: satu target ROAS untuk seluruh toko.**

Bayangkan toko menetapkan "target ROAS 3" untuk semua produk.

Untuk produk bermarjin 50 persen, ROAS 3 berarti untung besar — target itu terlalu ketat, dan toko **kurang** mengiklankan produk yang sebenarnya menguntungkan.

Untuk produk bermarjin 25 persen, ROAS 3 berarti rugi — target itu terlalu longgar, dan toko **terus** mengiklankan produk dengan rugi, sambil merasa kampanyenya memenuhi target.

Satu target yang seragam membuat kedua kesalahan sekaligus, ke arah berlawanan.

**Yang benar**: target ROAS per produk, minimal \`1 / marjin\`, ditambah sedikit ruang untuk laba yang diinginkan.

**Dan yang lebih baik lagi**: tambahkan kolom **laba iklan** ke laporan. Begitu kolom itu ada, perdebatan tentang target ROAS menjadi tidak perlu — kampanye yang merugi terlihat sendiri sebagai angka merah, apa pun ROAS-nya.

Satu catatan jujur: hitungan ini mengabaikan pembeli yang kembali belanja tanpa iklan setelah pembelian pertama. Kalau tabel kohort menunjukkan pelanggan dari iklan memang sering kembali, kampanye yang sedikit merugi di pembelian pertama bisa tetap layak. Tetapi itu harus **ditunjukkan dengan data kohort**, bukan diandaikan untuk membenarkan ROAS yang rendah.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Harga, diskon, gratis ongkir & iklan berbayar
# ============================================
import random

def rp(n):
    return "Rp " + f"{int(round(n)):,}".replace(",", ".")

# --------------------------------------------
# 1. Diskon memakan marjin, bukan harga
# --------------------------------------------
print("--- berapa penjualan HARUS naik agar laba tetap ---")
print("  rumus: kenaikan = diskon / (marjin - diskon)")
print("")
MARJIN = [0.20, 0.30, 0.40, 0.50]
DISKON = [0.05, 0.10, 0.15, 0.20]
print("  " + "marjin".ljust(9)
      + "".join(("diskon " + "%.0f%%" % (d * 100)).rjust(12)
                for d in DISKON))
for m in MARJIN:
    isi = ""
    for d in DISKON:
        if d >= m:
            isi += "RUGI".rjust(12)
        else:
            isi += ("+%.0f%%" % (d / (m - d) * 100)).rjust(12)
    print("  " + ("%.0f%%" % (m * 100)).ljust(9) + isi)
print("")
print("  Baca baris pertama. Dengan marjin 20 persen, diskon 10")
print("  persen menuntut penjualan naik 100 persen -- DUA KALI")
print("  LIPAT -- hanya supaya laba kotornya tetap sama.")
print("")
print("  Sebabnya: diskon dipotong dari HARGA, tetapi yang")
print("  berkurang adalah MARJIN. Dari marjin 20 ke 10, labanya")
print("  per barang tinggal separuh.")
print("")
print("  Diskon 20 persen pada marjin 20 persen berarti menjual")
print("  tanpa laba sama sekali. Menjual lebih banyak cuma")
print("  melipatgandakan nol.")

# --------------------------------------------
# 2. Buktikan dengan satu toko
# --------------------------------------------
print("")
print("--- satu contoh lengkap ---")
HARGA = 200_000
HPP = 150_000          # marjin 25%
JUAL = 400
print("  harga " + rp(HARGA) + ", HPP " + rp(HPP) + ", marjin "
      + ("%.0f%%" % ((HARGA - HPP) / HARGA * 100))
      + ", terjual " + str(JUAL) + " unit")
print("")
print("  " + "diskon".rjust(8) + "harga".rjust(13) + "laba/unit".rjust(12)
      + "unit perlu".rjust(12) + "naik".rjust(8))
laba_awal = (HARGA - HPP) * JUAL
for d in (0.0, 0.05, 0.10, 0.15, 0.20):
    h = HARGA * (1 - d)
    per_unit = h - HPP
    perlu = laba_awal / per_unit if per_unit > 0 else float('inf')
    naik = "-" if d == 0 else ("+%.0f%%" % ((perlu / JUAL - 1) * 100))
    print("  " + ("%.0f%%" % (d * 100)).rjust(8) + rp(h).rjust(13)
          + rp(per_unit).rjust(12) + ("%.0f" % perlu).rjust(12)
          + naik.rjust(8))
print("")
laba_30 = (HARGA * 0.85 - HPP) * JUAL * 1.3
print("  Laba awal " + rp(laba_awal) + ". Untuk mempertahankannya")
print("  dengan diskon 15 persen, toko harus menjual 1000 unit --")
print("  dua setengah kali lipat.")
print("")
print("  Kalau promonya 'berhasil' menaikkan penjualan 30 persen")
print("  -- yang sudah tergolong sukses -- labanya jadi")
print("  " + rp(laba_30) + ": hampir separuh hilang, padahal")
print("  penjualannya naik.")

# --------------------------------------------
# 3. Harga optimal dari kurva permintaan
# --------------------------------------------
print("")
print("--- harga yang memberi laba terbesar ---")
# permintaan linear: unit = a - b * harga (per bulan)
A, B = 1800, 0.008
BIAYA_UNIT = 80_000
print("  permintaan bulanan : unit = " + str(A) + " - " + str(B)
      + " x harga")
print("  biaya per unit     : " + rp(BIAYA_UNIT))
print("")
print("  " + "harga".rjust(12) + "unit".rjust(7) + "omzet".rjust(16)
      + "laba".rjust(16))
terbaik = None
for h in range(100_000, 225_001, 12_500):
    u = max(0, A - B * h)
    omzet = h * u
    laba = (h - BIAYA_UNIT) * u
    if terbaik is None or laba > terbaik[1]:
        terbaik = (h, laba, u, omzet)
    print("  " + rp(h).rjust(12) + ("%.0f" % u).rjust(7)
          + rp(omzet).rjust(16) + rp(laba).rjust(16))
h_omzet = A / (2 * B)
h_laba = (A / B + BIAYA_UNIT) / 2
print("")
print("  omzet terbesar di harga  " + rp(h_omzet))
print("  laba terbesar di harga   " + rp(h_laba))
print("")
def laba_di(h):
    return (h - BIAYA_UNIT) * max(0, A - B * h)
print("  Dua harga itu BERBEDA, dan yang pertama lebih murah.")
print("    laba di harga omzet terbesar : " + rp(laba_di(h_omzet)))
print("    laba di harga laba terbesar  : " + rp(laba_di(h_laba)))
print("")
print("  Toko yang mengejar omzet menjual "
      + ("%.0f" % (A - B * h_omzet)) + " unit alih-alih "
      + ("%.0f" % (A - B * h_laba)) + ",")
print("  bekerja lebih keras, dan untungnya "
      + ("%.0f%%" % ((1 - laba_di(h_omzet) / laba_di(h_laba)) * 100))
      + " lebih kecil.")
print("")
print("  Rumusnya: harga laba terbesar ada di tengah antara biaya")
print("  per unit dan harga saat permintaan jadi nol. Biaya")
print("  menarik harga optimal ke atas -- tiap unit yang terjual")
print("  harus menanggungnya.")

# --------------------------------------------
# 4. Ambang gratis ongkir menggeser keranjang
# --------------------------------------------
print("")
print("--- ambang gratis ongkir ---")
acak = random.Random(3)
KERANJANG = [acak.lognormvariate(11.6, 0.45) for _ in range(5000)]
AMBANG = 150_000
ONGKIR = 18_000
TAMBAH_MIN = 25_000        # pembeli rela menambah paling banyak ini

def dengan_ambang(k):
    kurang = AMBANG - k
    if 0 < kurang <= TAMBAH_MIN:
        return AMBANG + 5_000, True     # menambah barang secukupnya
    return k, False

sebelum = sum(KERANJANG) / len(KERANJANG)
hasil = [dengan_ambang(k) for k in KERANJANG]
sesudah = sum(k for k, _ in hasil) / len(hasil)
naik = sum(1 for _, t in hasil if t)
gratis = sum(1 for k, _ in hasil if k >= AMBANG)
print("  ambang : " + rp(AMBANG) + ", ongkir ditanggung toko " + rp(ONGKIR))
print("")
print("  rata-rata keranjang sebelum : " + rp(sebelum))
print("  rata-rata keranjang sesudah : " + rp(sesudah)
      + "  (+" + ("%.1f%%" % ((sesudah / sebelum - 1) * 100)) + ")")
print("  pembeli yang MENAMBAH barang : " + str(naik) + " dari "
      + str(len(KERANJANG)))
print("  pesanan yang dapat gratis    : " + str(gratis))
print("")
tambah_omzet = (sesudah - sebelum) * len(KERANJANG)
biaya_ongkir = gratis * ONGKIR
print("  omzet tambahan    : " + rp(tambah_omzet))
print("  ongkir ditanggung : " + rp(biaya_ongkir))
print("")
print("  Omzet tambahannya belasan juta. Tetapi yang harus")
print("  dibandingkan dengan ongkir bukan omzet, melainkan LABA")
print("  dari omzet tambahan itu:")
laba_tambah = tambah_omzet * 0.25
print("    laba tambahan (marjin 25%) : " + rp(laba_tambah))
print("    ongkir yang ditanggung     : " + rp(biaya_ongkir))
print("    selisih                    : " + rp(laba_tambah - biaya_ongkir))
print("")
sudah_atas = sum(1 for k in KERANJANG if k >= AMBANG)
print("  Dari " + str(gratis) + " pesanan yang dapat gratis ongkir, "
      + str(sudah_atas))
print("  (" + ("%.0f%%" % (sudah_atas / gratis * 100))
      + ") SUDAH di atas ambang sebelum ada promo. Toko")
print("  membayar ongkir mereka tanpa mengubah apa pun.")
print("")
print("  Bandingkan beberapa ambang:")
print("")
print("  " + "ambang".rjust(12) + "menambah".rjust(10)
      + "sudah di atas".rjust(15) + "selisih laba".rjust(17))
for amb in (150_000, 200_000, 250_000, 300_000):
    tambah = 0.0
    naik_ = 0
    atas_ = 0
    for k in KERANJANG:
        kurang = amb - k
        if 0 < kurang <= TAMBAH_MIN:
            tambah += amb + 5_000 - k
            naik_ += 1
        elif k >= amb:
            atas_ += 1
    selisih = tambah * 0.25 - (naik_ + atas_) * ONGKIR
    print("  " + rp(amb).rjust(12) + str(naik_).rjust(10)
          + str(atas_).rjust(15) + rp(selisih).rjust(17))
print("")
print("  Menaikkan ambang mengecilkan kerugian, karena makin")
print("  sedikit pesanan yang SUDAH di atasnya. Tetapi pada data")
print("  ini tidak ada ambang yang membuat promonya untung --")
print("  tambahan belanjanya terlalu kecil dibanding ongkirnya.")
print("")
print("  Pelajarannya bukan 'jangan gratis ongkir'. Gratis ongkir")
print("  sering tetap dipasang karena ia menaikkan KONVERSI,")
print("  sesuatu yang tidak ada di hitungan ini. Pelajarannya:")
print("  hitung biayanya dengan jujur, lalu putuskan apakah")
print("  kenaikan konversinya cukup untuk menutupnya.")

# --------------------------------------------
# 5. Iklan: CPM, CPC, CPA, dan ROAS
# --------------------------------------------
print("")
print("--- dari tayangan ke pesanan ---")
TAYANG = 200_000
CPM = 25_000             # biaya per 1000 tayangan
CTR = 0.012              # klik / tayang
KONVERSI = 0.025         # pesanan / klik
NILAI = 180_000          # nilai rata-rata pesanan
biaya = TAYANG / 1000 * CPM
klik = TAYANG * CTR
pesanan = klik * KONVERSI
omzet = pesanan * NILAI
print("  tayangan    : " + f"{TAYANG:,}".replace(",", "."))
print("  biaya iklan : " + rp(biaya) + "  (CPM " + rp(CPM) + ")")
print("  klik        : " + ("%.0f" % klik) + "  (CTR "
      + ("%.1f%%" % (CTR * 100)) + ")")
print("  biaya/klik  : " + rp(biaya / klik))
print("  pesanan     : " + ("%.0f" % pesanan) + "  (konversi "
      + ("%.1f%%" % (KONVERSI * 100)) + ")")
print("  biaya/pesan : " + rp(biaya / pesanan))
print("  omzet       : " + rp(omzet))
print("")
print("  ROAS = omzet / biaya iklan = " + ("%.2f" % (omzet / biaya)))

# --------------------------------------------
# 6. ROAS yang terdengar bagus bisa berarti rugi
# --------------------------------------------
print("")
print("--- ROAS impas bergantung pada marjin ---")
print("  ROAS impas = 1 / marjin")
print("")
roas = omzet / biaya
print("  " + "marjin".rjust(8) + "ROAS impas".rjust(12)
      + ("kampanye ROAS " + ("%.2f" % roas)).rjust(24))
for m in (0.15, 0.25, 0.35, 0.50, 0.70):
    impas = 1 / m
    laba = omzet * m - biaya
    hasil_ = ("untung " if laba > 0 else "RUGI ") + rp(abs(laba))
    print("  " + ("%.0f%%" % (m * 100)).rjust(8)
          + ("%.1f" % impas).rjust(12) + hasil_.rjust(24))
print("")
print("  Kampanye yang sama, ROAS yang sama " + ("%.2f" % roas) + " -- dan")
print("  hasilnya rugi atau untung tergantung marjin barangnya.")
print("")
print("  ROAS " + ("%.2f" % roas) + " terdengar seperti 'setiap seribu rupiah")
print("  iklan kembali jadi " + ("%.0f" % (roas * 1000))
      + " rupiah'. Padahal yang kembali OMZET,")
print("  bukan laba. Untuk barang bermarjin 25 persen, kampanye")
print("  itu rugi " + rp(biaya - omzet * 0.25) + ".")
print("")
print("  Karena itu target ROAS tidak boleh diseragamkan antar")
print("  produk. Barang bermarjin tipis butuh ROAS jauh lebih")
print("  tinggi hanya untuk impas.")` },
  output: `--- berapa penjualan HARUS naik agar laba tetap ---
  rumus: kenaikan = diskon / (marjin - diskon)

  marjin      diskon 5%  diskon 10%  diskon 15%  diskon 20%
  20%              +33%       +100%       +300%        RUGI
  30%              +20%        +50%       +100%       +200%
  40%              +14%        +33%        +60%       +100%
  50%              +11%        +25%        +43%        +67%

  Baca baris pertama. Dengan marjin 20 persen, diskon 10
  persen menuntut penjualan naik 100 persen -- DUA KALI
  LIPAT -- hanya supaya laba kotornya tetap sama.

  Sebabnya: diskon dipotong dari HARGA, tetapi yang
  berkurang adalah MARJIN. Dari marjin 20 ke 10, labanya
  per barang tinggal separuh.

  Diskon 20 persen pada marjin 20 persen berarti menjual
  tanpa laba sama sekali. Menjual lebih banyak cuma
  melipatgandakan nol.

--- satu contoh lengkap ---
  harga Rp 200.000, HPP Rp 150.000, marjin 25%, terjual 400 unit

    diskon        harga   laba/unit  unit perlu    naik
        0%   Rp 200.000   Rp 50.000         400       -
        5%   Rp 190.000   Rp 40.000         500    +25%
       10%   Rp 180.000   Rp 30.000         667    +67%
       15%   Rp 170.000   Rp 20.000        1000   +150%
       20%   Rp 160.000   Rp 10.000        2000   +400%

  Laba awal Rp 20.000.000. Untuk mempertahankannya
  dengan diskon 15 persen, toko harus menjual 1000 unit --
  dua setengah kali lipat.

  Kalau promonya 'berhasil' menaikkan penjualan 30 persen
  -- yang sudah tergolong sukses -- labanya jadi
  Rp 10.400.000: hampir separuh hilang, padahal
  penjualannya naik.

--- harga yang memberi laba terbesar ---
  permintaan bulanan : unit = 1800 - 0.008 x harga
  biaya per unit     : Rp 80.000

         harga   unit           omzet            laba
    Rp 100.000   1000  Rp 100.000.000   Rp 20.000.000
    Rp 112.500    900  Rp 101.250.000   Rp 29.250.000
    Rp 125.000    800  Rp 100.000.000   Rp 36.000.000
    Rp 137.500    700   Rp 96.250.000   Rp 40.250.000
    Rp 150.000    600   Rp 90.000.000   Rp 42.000.000
    Rp 162.500    500   Rp 81.250.000   Rp 41.250.000
    Rp 175.000    400   Rp 70.000.000   Rp 38.000.000
    Rp 187.500    300   Rp 56.250.000   Rp 32.250.000
    Rp 200.000    200   Rp 40.000.000   Rp 24.000.000
    Rp 212.500    100   Rp 21.250.000   Rp 13.250.000
    Rp 225.000      0            Rp 0            Rp 0

  omzet terbesar di harga  Rp 112.500
  laba terbesar di harga   Rp 152.500

  Dua harga itu BERBEDA, dan yang pertama lebih murah.
    laba di harga omzet terbesar : Rp 29.250.000
    laba di harga laba terbesar  : Rp 42.050.000

  Toko yang mengejar omzet menjual 900 unit alih-alih 580,
  bekerja lebih keras, dan untungnya 30% lebih kecil.

  Rumusnya: harga laba terbesar ada di tengah antara biaya
  per unit dan harga saat permintaan jadi nol. Biaya
  menarik harga optimal ke atas -- tiap unit yang terjual
  harus menanggungnya.

--- ambang gratis ongkir ---
  ambang : Rp 150.000, ongkir ditanggung toko Rp 18.000

  rata-rata keranjang sebelum : Rp 119.160
  rata-rata keranjang sesudah : Rp 121.811  (+2.2%)
  pembeli yang MENAMBAH barang : 737 dari 5000
  pesanan yang dapat gratis    : 1881

  omzet tambahan    : Rp 13.255.312
  ongkir ditanggung : Rp 33.858.000

  Omzet tambahannya belasan juta. Tetapi yang harus
  dibandingkan dengan ongkir bukan omzet, melainkan LABA
  dari omzet tambahan itu:
    laba tambahan (marjin 25%) : Rp 3.313.828
    ongkir yang ditanggung     : Rp 33.858.000
    selisih                    : Rp -30.544.172

  Dari 1881 pesanan yang dapat gratis ongkir, 1144
  (61%) SUDAH di atas ambang sebelum ada promo. Toko
  membayar ongkir mereka tanpa mengubah apa pun.

  Bandingkan beberapa ambang:

        ambang  menambah  sudah di atas     selisih laba
    Rp 150.000       737           1144   Rp -30.544.172
    Rp 200.000       271            402   Rp -10.849.542
    Rp 250.000        90            142    Rp -3.751.662
    Rp 300.000        25             57    Rp -1.362.650

  Menaikkan ambang mengecilkan kerugian, karena makin
  sedikit pesanan yang SUDAH di atasnya. Tetapi pada data
  ini tidak ada ambang yang membuat promonya untung --
  tambahan belanjanya terlalu kecil dibanding ongkirnya.

  Pelajarannya bukan 'jangan gratis ongkir'. Gratis ongkir
  sering tetap dipasang karena ia menaikkan KONVERSI,
  sesuatu yang tidak ada di hitungan ini. Pelajarannya:
  hitung biayanya dengan jujur, lalu putuskan apakah
  kenaikan konversinya cukup untuk menutupnya.

--- dari tayangan ke pesanan ---
  tayangan    : 200.000
  biaya iklan : Rp 5.000.000  (CPM Rp 25.000)
  klik        : 2400  (CTR 1.2%)
  biaya/klik  : Rp 2.083
  pesanan     : 60  (konversi 2.5%)
  biaya/pesan : Rp 83.333
  omzet       : Rp 10.800.000

  ROAS = omzet / biaya iklan = 2.16

--- ROAS impas bergantung pada marjin ---
  ROAS impas = 1 / marjin

    marjin  ROAS impas      kampanye ROAS 2.16
       15%         6.7       RUGI Rp 3.380.000
       25%         4.0       RUGI Rp 2.300.000
       35%         2.9       RUGI Rp 1.220.000
       50%         2.0       untung Rp 400.000
       70%         1.4     untung Rp 2.560.000

  Kampanye yang sama, ROAS yang sama 2.16 -- dan
  hasilnya rugi atau untung tergantung marjin barangnya.

  ROAS 2.16 terdengar seperti 'setiap seribu rupiah
  iklan kembali jadi 2160 rupiah'. Padahal yang kembali OMZET,
  bukan laba. Untuk barang bermarjin 25 persen, kampanye
  itu rugi Rp 2.300.000.

  Karena itu target ROAS tidak boleh diseragamkan antar
  produk. Barang bermarjin tipis butuh ROAS jauh lebih
  tinggi hanya untuk impas.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung kenaikan yang dibutuhkan diskon', waktu: 'O(1)', memori: 'satu pembagian' },
      { operasi: 'Cari harga laba terbesar (permintaan linear)', waktu: 'O(1)', memori: 'rumus tertutup' },
      { operasi: 'Cari harga laba terbesar (dicoba satu per satu)', waktu: 'O(h)', memori: 'h = jumlah harga yang dicoba' },
      { operasi: 'Simulasi ambang gratis ongkir', waktu: 'O(k . a)', memori: 'k keranjang, a ambang dicoba' },
      { operasi: 'Hitung laba iklan per produk', waktu: 'O(p)', memori: 'p = jumlah produk' }
    ],
    intuisi: `Tidak ada hitungan berat di bab ini — seluruhnya perkalian dan pembagian yang bisa dikerjakan di spreadsheet.

Yang membuat bab ini penting bukan kerumitannya, melainkan bahwa hitungan sesederhana ini **jarang dilakukan sebelum keputusan diambil**. Diskon diluncurkan karena pesaing diskon. Ambang gratis ongkir dipilih karena angkanya bulat. Target ROAS ditetapkan karena "biasanya segitu".

Setiap keputusan itu punya harga yang bisa dihitung dalam lima menit. Dan pada contoh-contoh di bab ini, harganya bisa separuh laba.`
  },

  kesalahanUmum: [
    {
      salah: 'Menilai besarnya diskon terhadap harga, bukan terhadap marjin.',
      kenapa: 'Seluruh potongan diskon diambil dari marjin karena harga pokok tidak ikut turun. Diskon sepuluh persen pada marjin dua puluh persen memotong laba per barang menjadi separuh, sehingga penjualan harus naik dua kali lipat hanya untuk impas.',
      benar: 'Hitung kenaikan penjualan yang dibutuhkan dengan diskon dibagi selisih marjin dan diskon sebelum meluncurkan promo.'
    },
    {
      salah: 'Menyatakan promo berhasil karena penjualannya naik.',
      kenapa: 'Kenaikan penjualan bisa lebih kecil dari yang dibutuhkan untuk menutup potongan marjin, sehingga laba turun meski omzet dan jumlah pesanan naik. Diskon lima belas persen yang menaikkan penjualan tiga puluh persen pada marjin dua puluh lima persen memotong laba hampir separuh.',
      benar: 'Nilai setiap promo dari perubahan laba kotor, dan tuliskan target kenaikan penjualan untuk impas di rencana promonya.'
    },
    {
      salah: 'Menetapkan harga yang memberi omzet terbesar.',
      kenapa: 'Harga dengan omzet terbesar selalu lebih rendah daripada harga dengan laba terbesar bila ada biaya per unit, karena setiap unit tambahan yang terjual harus menanggung biayanya. Toko yang mengejar omzet menjual lebih banyak dengan untung lebih kecil.',
      benar: 'Taksir kurva permintaan lalu cari harga yang memaksimalkan laba, yaitu di tengah antara biaya per unit dan harga saat permintaan nol.'
    },
    {
      salah: 'Menghitung manfaat gratis ongkir dari kenaikan omzet.',
      kenapa: 'Yang harus dibandingkan dengan biaya ongkir adalah laba dari belanja tambahan, bukan omzetnya. Selain itu sebagian besar penerima gratis ongkir sering sudah berada di atas ambang sebelum promo sehingga toko membayar ongkir tanpa mengubah apa pun.',
      benar: 'Pisahkan penerima yang menambah belanja dari yang sudah di atas ambang, lalu bandingkan laba tambahan dengan seluruh ongkir yang ditanggung.'
    },
    {
      salah: 'Memilih ambang gratis ongkir berdasarkan angka yang bulat atau yang dipakai pesaing.',
      kenapa: 'Posisi ambang terhadap sebaran nilai keranjang tokomu yang menentukan berapa banyak orang yang menambah belanja dan berapa yang menerima hadiah tanpa berubah. Ambang yang terlalu rendah bisa merugikan puluhan juta pada data yang sama.',
      benar: 'Hitung selisih laba untuk beberapa ambang dari data keranjang tokomu sendiri, lalu pilih berdasarkan hasilnya.'
    },
    {
      salah: 'Memakai satu target ROAS untuk seluruh produk.',
      kenapa: 'ROAS impas sama dengan satu dibagi marjin, sehingga produk bermarjin tipis butuh ROAS jauh lebih tinggi. Target yang seragam membuat produk bermarjin tipis diiklankan dengan rugi dan produk bermarjin tebal kurang diiklankan.',
      benar: 'Tetapkan target ROAS per produk minimal sebesar satu dibagi marjinnya, dan tambahkan kolom laba iklan ke laporan.'
    },
    {
      salah: 'Membaca ROAS sebagai uang yang kembali ke toko.',
      kenapa: 'ROAS menghitung omzet yang dihasilkan iklan, dan sebagian besar omzet adalah harga pokok yang dibayarkan ke pemasok. ROAS di atas satu tidak berarti untung kecuali marjinnya cukup besar.',
      benar: 'Hitung laba iklan sebagai omzet dikali marjin dikurangi biaya iklan, dan laporkan angka itu bersama ROAS.'
    }
  ],

  analogi: `Bayangkan kamu **menjual nasi goreng** seharga Rp 20.000. Bahan dan gasnya Rp 16.000. Untungmu Rp 4.000 per porsi.

Tetangga sebelah memasang spanduk: *"Diskon 10%!"* Kamu ikut-ikutan: nasi gorengmu jadi Rp 18.000.

Kelihatannya kamu cuma mengorbankan Rp 2.000 dari Rp 20.000 — kecil.

Tapi hitung dari sisi lain. Bahannya tetap Rp 16.000. Untungmu sekarang **Rp 2.000 per porsi** — tinggal separuh.

Dulu kamu menjual 50 porsi sehari dan untung Rp 200.000. Untuk tetap untung Rp 200.000 dengan harga baru, kamu harus menjual **100 porsi**. Dua kali lipat.

Dan kalau diskon itu cuma menambah pembeli dari 50 jadi 65 porsi — yang sudah terasa ramai — untungmu jadi Rp 130.000. Kamu bekerja lebih capek, warung lebih ramai, dan pulang dengan uang lebih sedikit.

**Sekarang soal harga.**

Kamu bisa menjual Rp 15.000 dan laku 150 porsi — omzetmu besar. Atau Rp 25.000 dan laku 60 porsi — omzet lebih kecil.

Tapi dengan bahan Rp 16.000, harga Rp 15.000 berarti **rugi di setiap porsi**. Makin laris, makin rugi. Harga Rp 25.000 memberi Rp 9.000 per porsi, dan 60 porsi berarti Rp 540.000.

Harga yang membuat warung paling ramai bukan harga yang membuatmu paling untung.

**Terakhir, soal brosur.**

Kamu membayar Rp 100.000 untuk mencetak brosur. Brosur itu mendatangkan pembeli senilai Rp 250.000.

Temanmu bilang: *"Wah, balik dua setengah kali lipat!"*

Tapi dari Rp 250.000 itu, Rp 200.000 adalah uang bahan. Yang benar-benar masuk kantongmu cuma Rp 50.000 — dan kamu sudah membayar Rp 100.000 untuk brosurnya.

Kamu **rugi** Rp 50.000, sambil merasa brosurnya berhasil.

Seandainya kamu menjual es teh — modal Rp 1.000, harga Rp 5.000 — brosur yang sama dengan hasil Rp 250.000 memberi untung Rp 200.000 dari bahan, dan kamu untung bersih Rp 100.000.

Brosur yang sama. Hasil penjualan yang sama. Satu rugi, satu untung — dan bedanya cuma **apa yang kamu jual**.`,

  latihan: [
    'Hitung marjin lima produk nyata setelah memasukkan komisi marketplace, biaya pembayaran, dan kemasan ke harga pokoknya.',
    'Buat tabel kenaikan penjualan yang dibutuhkan untuk empat tingkat diskon pada setiap produk itu.',
    'Tunjukkan dengan angka satu promo yang menaikkan penjualan tetapi menurunkan laba.',
    'Taksir kurva permintaan linear dari dua titik harga dan penjualan, lalu hitung harga dengan omzet terbesar dan harga dengan laba terbesar.',
    'Jelaskan dengan rumus kenapa biaya per unit menarik harga optimal ke atas.',
    'Dari data nilai keranjang, hitung porsi penerima gratis ongkir yang sudah berada di atas ambang sebelum promo.',
    'Hitung selisih laba untuk empat ambang gratis ongkir, lalu tentukan kenaikan konversi yang dibutuhkan agar ambang terbaik impas.',
    'Susun rantai iklan dari tayangan sampai pesanan untuk satu kampanye nyata atau contoh, lalu hitung biaya per klik dan per pesanan.',
    'Hitung ROAS impas untuk setiap produkmu, lalu tunjukkan produk mana yang rugi bila diiklankan dengan target ROAS seragam tiga.',
    'Tambahkan kolom laba iklan ke satu laporan iklan, lalu tandai kampanye yang ROAS-nya tampak baik tetapi merugi.'
  ]
});
