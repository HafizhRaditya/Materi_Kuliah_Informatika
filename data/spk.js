/* ============================================================
   spk.js — materi Sistem Pendukung Keputusan (Semester 4)

   Disusun dari berkas kuliah sendiri:
     - Pertemuan 1 Pengantar Sistem Pendukung Keputusan.pdf
     - Pertemuan 3 Sistem Pendukung Keputusan.pdf
     - SAW dan WP.pdf
     - TOPSIS.pdf
     - app.py  (projek kelompok)
     - PENENTUAN TEMA PROJEK SPK_KELOMPOK 6_SPKB.docx

   Ketiga metode di sini (SAW, WP, TOPSIS) adalah metode
   MADM — Multi-Attribute Decision Making — yang menjadi inti
   mata kuliah ini.

   Seluruh perhitungan di materi ini DIJALANKAN dengan kode
   sebelum angkanya ditulis, karena metode MADM mudah salah
   di tahap normalisasi.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Rumus".

   Tiga topik tambahan (AHP, Profile Matching, analisis
   sensitivitas & rank reversal) disusun dari REFERENSI LUAR --
   keterangan lengkapnya ada di kepala bagian tambahan di bawah.
   ============================================================ */

TOPICS.push({
  id: 'spk-pengantar',
  judul: 'Konsep Sistem Pendukung Keputusan',
  kategori: 'spk',
  tag: ['SPK', 'DSS', 'MADM', 'kriteria', 'alternatif', 'bobot'],
  ringkas: 'Sistem yang membantu memutuskan — bukan menggantikan yang memutuskan.',

  fungsi: `**Membantu keputusan yang punya banyak kriteria dan tidak ada rumus tunggalnya.**

Terpakai di:

- **Pemilihan** — pemasok, karyawan, lokasi, penerima beasiswa
- **Perangkingan** — menyusun prioritas dari banyak pertimbangan
- **Tugas akhir** — SPK adalah salah satu tema paling sering diambil di Informatika
- **Membuat keputusan bisa dipertanggungjawabkan** — angkanya bisa ditunjukkan

Yang paling menentukan hasilnya bukan metodenya, melainkan **bobot dan kriterianya**.

Metode secanggih apa pun akan memberi jawaban yang salah kalau bobotnya ditentukan asal. Dan bobot yang ditentukan sendiri oleh mahasiswa tanpa dasar adalah kelemahan terbesar sebagian besar skripsi SPK.`,

  praktik: {
    tujuan: `Kamu punya matriks keputusan yang benar dengan kriteria dan bobot yang punya dasar, siap dipakai metode apa pun.`,
    alat: [
      'Spreadsheet atau Python',
      'Akses ke orang yang benar-benar mengambil keputusan itu'
    ],
    langkah: [
      { judul: 'Pastikan masalahnya memang cocok untuk SPK',
        isi: `SPK cocok untuk keputusan **semi-terstruktur** — ada beberapa alternatif, beberapa kriteria, dan tidak ada rumus tunggal.

Kalau ada rumus pasti, kamu tidak butuh SPK. Kalau tidak ada kriteria yang bisa diukur sama sekali, SPK juga tidak menolong.` },
      { judul: 'Tentukan kriteria bersama pengambil keputusannya',
        isi: `**Jangan menentukan sendiri.** Wawancarai orang yang benar-benar mengambil keputusan itu.

Tanyakan: *"apa saja yang Bapak pertimbangkan?"* lalu *"mana yang paling penting?"*

Kriteria yang kamu karang sendiri adalah kelemahan yang pasti ditanyakan penguji.` },
      { judul: 'Tandai tiap kriteria benefit atau cost',
        isi: `- **benefit** — makin besar makin baik: kualitas, ketepatan
- **cost** — makin kecil makin baik: harga, jarak, waktu

Tandai eksplisit di tabelmu. **Salah menandai membalik seluruh peringkat**, dan kesalahan ini sangat sering terjadi dan sulit terlihat.` },
      { judul: 'Tentukan bobot dengan dasar',
        isi: `Tiga cara yang bisa dipertanggungjawabkan:

- **langsung dari pakar** — minta pengambil keputusan membaginya, catat siapa dan kapan
- **AHP** — perbandingan berpasangan, lengkap dengan uji konsistensi
- **entropi** — dihitung dari sebaran datanya sendiri

Bobot harus berjumlah satu. Yang paling penting: **catat dari mana bobotnya berasal**.` },
      { judul: 'Susun matriks keputusannya',
        isi: `Baris untuk alternatif, kolom untuk kriteria.

Periksa: tidak ada sel kosong, satuannya konsisten, dan nilai kualitatif sudah diubah ke angka dengan skala yang jelas dan tertulis.

Skala seperti "sangat baik sampai sangat buruk menjadi 5 sampai 1" harus disebutkan di laporan.` },
      { judul: 'Uji sensitivitas bobotnya',
        isi: `Ubah satu bobot sebesar 10 persen, lalu jalankan lagi.

Kalau peringkat teratasnya **berubah**, keputusanmu **rapuh** — dan itu harus disebutkan, bukan disembunyikan.

Kalau tetap, kesimpulanmu kuat. Analisis sensitivitas ini sering menjadi nilai tambah besar saat sidang.` },
      { judul: 'Bandingkan beberapa metode',
        isi: `Jalankan SAW, WP, dan TOPSIS pada matriks yang sama.

Kalau ketiganya memberi peringkat sama, kesimpulanmu kuat. Kalau berbeda, alternatifnya memang berimbang — dan itu temuan yang jujur, bukan kegagalan.

Jangan pernah membandingkan **angka skornya** antar metode; hanya peringkatnya yang sebanding.` }
    ],
    cek: [
      'Kriteria dan bobotmu berasal dari wawancara, bukan dari dugaanmu sendiri',
      'Setiap kriteria sudah ditandai benefit atau cost dengan benar',
      'Kamu tahu apakah peringkat teratasmu berubah saat bobotnya digeser 10 persen'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa begitu',

  konsep: `
Kamu sudah bertemu **SPK** sekilas di topik Jenis Sistem Informasi pada PTI. Di sini ia dibahas tuntas.

**SPK** (*Decision Support System*) adalah sistem berbasis komputer yang membantu pengambil keputusan menghadapi masalah **semi-terstruktur** dan **tidak terstruktur**.

**Tiga jenis masalah**

- **Terstruktur** — prosedurnya jelas dan berulang. Menghitung gaji, mencetak tagihan. **Bisa diotomatiskan penuh**, tidak butuh SPK.
- **Semi-terstruktur** — sebagian bisa dihitung, sebagian butuh pertimbangan manusia. Memilih pemasok, menentukan lokasi cabang. **Inilah wilayah SPK.**
- **Tidak terstruktur** — tidak ada prosedur baku sama sekali. Menentukan arah perusahaan sepuluh tahun ke depan.

**Kalimat kunci yang sering ditanyakan: SPK MENDUKUNG, bukan MENGGANTIKAN.**

Keputusan akhir tetap di tangan manusia. SPK menyediakan perhitungan, perbandingan, dan simulasi — tetapi tidak menanggung akibatnya.

**Komponen SPK**

- **Subsistem manajemen data** — basis data dan aksesnya
- **Subsistem manajemen model** — kumpulan model perhitungan
- **Subsistem antarmuka** — tempat pengguna berinteraksi
- **Subsistem manajemen pengetahuan** — opsional, berisi keahlian tambahan

**Empat tahap pengambilan keputusan (Simon)**

- **Intelligence** — mengenali bahwa ada masalah
- **Design** — menyusun alternatif yang mungkin
- **Choice** — memilih salah satunya
- **Implementation** — menjalankan pilihan itu

SPK paling banyak membantu di tahap **Design** dan **Choice**.

**MADM**

*Multi-Attribute Decision Making* adalah kelompok metode untuk memilih **alternatif terbaik** dari sejumlah pilihan, dengan **banyak kriteria** yang saling bertentangan.

Istilah yang dipakai di seluruh metode:

- **Alternatif** — pilihan yang tersedia. Calon pemasok, calon karyawan, calon lokasi.
- **Kriteria** — aspek penilaian. Harga, kualitas, jarak.
- **Bobot** — seberapa penting tiap kriteria. Jumlahnya biasanya 1.
- **Matriks keputusan** — tabel berisi nilai tiap alternatif untuk tiap kriteria.

**Benefit dan Cost — pembedaan yang menentukan**

Ini yang paling sering salah dan **membalik seluruh hasil**:

- **Benefit** — **makin besar makin baik**. Kualitas, pengalaman, kapasitas.
- **Cost** — **makin kecil makin baik**. Harga, jarak, waktu pengerjaan.

Kalau harga salah digolongkan sebagai benefit, metodenya akan memilih **pemasok termahal** sebagai yang terbaik — dan hitungannya tetap "benar" secara matematis.

**Kenapa perlu normalisasi**

Kriteria punya **satuan yang berbeda**: harga dalam jutaan, jarak dalam kilometer, kualitas dalam skala 1-5. Menjumlahkannya langsung tidak bermakna.

Normalisasi mengubah semuanya ke skala yang sebanding, biasanya 0 sampai 1. Ini gagasan yang sama dengan normalisasi di Data Mining — dan sama pentingnya.

**Menentukan bobot**

Bobot bisa ditentukan **langsung oleh pengambil keputusan**, atau dihitung dengan metode seperti **AHP** yang membandingkan kriteria berpasangan.

Yang perlu disadari: **bobot adalah tempat masuknya penilaian manusia.** Dua orang dengan bobot berbeda akan mendapat pemenang berbeda dari data yang sama persis — dan keduanya sah.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Salah menggolongkan kriteria = hasil TERBALIK\n#\n# Harga digolongkan BENEFIT (makin besar makin baik):\n#   -> metode memilih pemasok TERMAHAL\n#   -> hitungannya tetap "benar" secara matematis\n#   -> tidak ada pesan kesalahan apa pun\n#\n# BENEFIT : kualitas, pengalaman, kapasitas, rating\n# COST    : harga, jarak, waktu, jumlah keluhan\n#\n# Uji sederhana: kalau angkanya NAIK, apakah keadaan\n# jadi LEBIH BAIK atau LEBIH BURUK?',
      penjelasan: `
Ini kesalahan yang paling merugikan di seluruh MADM, dan sifatnya **diam** — tidak ada tanda apa pun bahwa sesuatu keliru.

Perhatikan apa yang terjadi. Rumusnya tetap berjalan, matriksnya tetap ternormalisasi, peringkatnya tetap keluar rapi dengan angka sampai empat desimal. **Semuanya terlihat benar.**

Yang salah cuma satu hal: sistem itu sekarang meyakini bahwa **mahal itu bagus**.

Dan karena keluarannya berupa angka yang tampak ilmiah, orang cenderung mempercayainya — persis persoalan yang kamu temui di topik Etika PTI tentang keputusan algoritma yang terlihat objektif.

Uji pembedanya sederhana: **kalau angka pada kriteria itu naik, apakah alternatifnya jadi lebih menarik atau kurang menarik?**

- Rating naik → lebih menarik → **benefit**
- Harga naik → kurang menarik → **cost**
- Jarak naik → kurang menarik → **cost**
- Kapasitas naik → lebih menarik → **benefit**

Ada kriteria yang **membingungkan** dan perlu dipikirkan, bukan ditebak:

**Waktu pengerjaan** biasanya cost — makin cepat makin baik. Tetapi untuk **masa garansi**, waktu justru benefit — makin lama makin baik. Kata "waktu" muncul di keduanya, tetapi artinya berlawanan.

**Jumlah karyawan** bisa benefit kalau kamu menilai kapasitas produksi, tetapi cost kalau kamu menilai efisiensi biaya. **Kriteria yang sama, tujuan berbeda, penggolongan berbeda.**

Karena itu penggolongan **tidak bisa ditentukan dari nama kriterianya saja** — ia bergantung pada apa yang sedang kamu cari.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Kerangka MADM: matriks keputusan
# ============================================

# Kasus: memilih pemasok bahan baku
ALTERNATIF = ["PT Alfa", "PT Beta", "PT Gama", "PT Delta"]

# (nama kriteria, bobot, jenis)
KRITERIA = [
    ("Harga (juta)",     0.35, "cost"),
    ("Kualitas (1-5)",   0.30, "benefit"),
    ("Jarak (km)",       0.15, "cost"),
    ("Ketepatan (%)",    0.20, "benefit"),
]

# Matriks keputusan: baris = alternatif, kolom = kriteria
MATRIKS = [
    [25, 4, 30, 90],    # PT Alfa
    [30, 5, 45, 95],    # PT Beta
    [20, 3, 20, 80],    # PT Gama
    [28, 4, 35, 88],    # PT Delta
]

print("--- matriks keputusan ---")
print("  " + "alternatif".ljust(12) +
      "".join(k[0][:14].rjust(16) for k in KRITERIA))
print("  " + " " * 12 +
      "".join((k[2] + " w=" + str(k[1])).rjust(16) for k in KRITERIA))
for nama, baris in zip(ALTERNATIF, MATRIKS):
    print("  " + nama.ljust(12) +
          "".join(str(v).rjust(16) for v in baris))

print("")
print("  bobot total: " + str(sum(k[1] for k in KRITERIA)))


# ============================================
# Kenapa tidak bisa dijumlahkan langsung
# ============================================
print("")
print("--- kenapa TIDAK boleh dijumlahkan mentah ---")
for nama, baris in zip(ALTERNATIF, MATRIKS):
    total = sum(baris)
    print("  " + nama.ljust(12) + "jumlah mentah = " + str(total))

print("")
print("  PT Beta menang karena ketepatan 95 dan jarak 45.")
print("  Padahal jarak 45 km itu BURUK, dan harganya PALING MAHAL.")
print("  Menjumlahkan satuan berbeda tidak bermakna:")
print("  juta rupiah + skala 1-5 + kilometer + persen = ???")


# ============================================
# Benefit atau cost? Uji dengan satu pertanyaan
# ============================================
print("")
print("--- menggolongkan kriteria ---")
print("  Pertanyaan: kalau angkanya NAIK, alternatifnya jadi")
print("  lebih menarik atau kurang menarik?")
print("")

UJI = [
    ("Harga produk",        "cost",    "naik = lebih mahal = kurang menarik"),
    ("Rating pelanggan",    "benefit", "naik = lebih disukai"),
    ("Jarak pengiriman",    "cost",    "naik = lebih jauh"),
    ("Kapasitas produksi",  "benefit", "naik = sanggup lebih banyak"),
    ("Waktu pengerjaan",    "cost",    "naik = lebih lama selesai"),
    ("Masa garansi",        "benefit", "naik = lebih terjamin"),
    ("Jumlah keluhan",      "cost",    "naik = lebih bermasalah"),
]
for nama, jenis, alasan in UJI:
    print("  " + nama.ljust(20) + jenis.ljust(9) + alasan)

print("")
print("  Perhatikan 'Waktu pengerjaan' dan 'Masa garansi'.")
print("  Sama-sama satuan waktu, tapi jenisnya BERLAWANAN.")
print("  Penggolongan tidak bisa ditebak dari nama kriterianya.")


# ============================================
# Bobot: tempat masuknya penilaian manusia
# ============================================
print("")
print("--- bobot berbeda, pemenang berbeda ---")

def skor_sederhana(matriks, kriteria):
    """Normalisasi min-max sesuai jenis, lalu jumlahkan berbobot."""
    n_kol = len(kriteria)
    kolom = [[baris[j] for baris in matriks] for j in range(n_kol)]
    hasil = []
    for baris in matriks:
        total = 0.0
        for j, (_, bobot, jenis) in enumerate(kriteria):
            lo, hi = min(kolom[j]), max(kolom[j])
            if hi == lo:
                n = 1.0
            elif jenis == "benefit":
                n = (baris[j] - lo) / (hi - lo)
            else:
                n = (hi - baris[j]) / (hi - lo)     # cost: DIBALIK
            total += bobot * n
        hasil.append(total)
    return hasil


SKENARIO = [
    ("mengutamakan HARGA",    [0.60, 0.15, 0.10, 0.15]),
    ("mengutamakan KUALITAS", [0.15, 0.60, 0.10, 0.15]),
    ("seimbang",              [0.35, 0.30, 0.15, 0.20]),
]

for nama, bobot in SKENARIO:
    kriteria = [(k[0], b, k[2]) for k, b in zip(KRITERIA, bobot)]
    skor = skor_sederhana(MATRIKS, kriteria)
    urut = sorted(zip(ALTERNATIF, skor), key=lambda x: -x[1])
    print("  " + nama.ljust(24) + "pemenang: " + urut[0][0] +
          "   (" + format(urut[0][1], ".3f") + ")")

print("")
print("  Data yang SAMA PERSIS, bobot berbeda, pemenang berbeda.")
print("  Bobot adalah tempat masuknya PENILAIAN MANUSIA --")
print("  dan itulah sebabnya SPK mendukung, bukan menggantikan.")`
  },

  output: `--- matriks keputusan ---
  alternatif      Harga (juta)  Kualitas (1-5)      Jarak (km)   Ketepatan (%)
                   cost w=0.35   benefit w=0.3     cost w=0.15   benefit w=0.2
  PT Alfa                   25               4              30              90
  PT Beta                   30               5              45              95
  PT Gama                   20               3              20              80
  PT Delta                  28               4              35              88

  bobot total: 1.0

--- kenapa TIDAK boleh dijumlahkan mentah ---
  PT Alfa     jumlah mentah = 149
  PT Beta     jumlah mentah = 175
  PT Gama     jumlah mentah = 123
  PT Delta    jumlah mentah = 155

  PT Beta menang karena ketepatan 95 dan jarak 45.
  Padahal jarak 45 km itu BURUK, dan harganya PALING MAHAL.
  Menjumlahkan satuan berbeda tidak bermakna:
  juta rupiah + skala 1-5 + kilometer + persen = ???

--- menggolongkan kriteria ---
  Pertanyaan: kalau angkanya NAIK, alternatifnya jadi
  lebih menarik atau kurang menarik?

  Harga produk        cost     naik = lebih mahal = kurang menarik
  Rating pelanggan    benefit  naik = lebih disukai
  Jarak pengiriman    cost     naik = lebih jauh
  Kapasitas produksi  benefit  naik = sanggup lebih banyak
  Waktu pengerjaan    cost     naik = lebih lama selesai
  Masa garansi        benefit  naik = lebih terjamin
  Jumlah keluhan      cost     naik = lebih bermasalah

  Perhatikan 'Waktu pengerjaan' dan 'Masa garansi'.
  Sama-sama satuan waktu, tapi jenisnya BERLAWANAN.
  Penggolongan tidak bisa ditebak dari nama kriterianya.

--- bobot berbeda, pemenang berbeda ---
  mengutamakan HARGA      pemenang: PT Gama   (0.700)
  mengutamakan KUALITAS   pemenang: PT Beta   (0.750)
  seimbang                pemenang: PT Alfa   (0.548)

  Data yang SAMA PERSIS, bobot berbeda, pemenang berbeda.
  Bobot adalah tempat masuknya PENILAIAN MANUSIA --
  dan itulah sebabnya SPK mendukung, bukan menggantikan.`,

  kesalahanUmum: [
    {
      salah: 'Salah menggolongkan kriteria cost sebagai benefit, atau sebaliknya.',
      kenapa: 'Seluruh peringkat menjadi terbalik untuk kriteria itu, sehingga metode memilih alternatif termahal atau terjauh sebagai yang terbaik. Perhitungannya tetap berjalan tanpa pesan kesalahan apa pun, dan hasilnya keluar rapi dengan angka desimal yang terlihat meyakinkan.',
      benar: 'Uji tiap kriteria dengan satu pertanyaan: kalau angkanya naik, alternatifnya jadi lebih menarik atau kurang menarik? Naik berarti benefit, turun berarti cost.'
    },
    {
      salah: 'Menjumlahkan nilai kriteria langsung tanpa normalisasi.',
      kenapa: 'Satuan yang berbeda tidak bisa dijumlahkan secara bermakna, dan kriteria berskala besar akan mendominasi seluruh hasil. Menjumlahkan juta rupiah dengan skala satu sampai lima menghasilkan angka yang tidak berarti apa pun.',
      benar: 'Normalisasi semua kolom ke skala yang sebanding lebih dulu, dengan memperhatikan jenis benefit atau cost tiap kriteria.'
    },
    {
      salah: 'Menganggap hasil SPK sebagai keputusan final yang tidak perlu dipertimbangkan lagi.',
      kenapa: 'SPK dirancang untuk mendukung, bukan menggantikan. Hasilnya sepenuhnya bergantung pada bobot yang ditetapkan manusia, dan bobot berbeda menghasilkan pemenang berbeda dari data yang sama persis. Menganggapnya final berarti menyembunyikan penilaian manusia di balik angka yang terlihat objektif.',
      benar: 'Sajikan hasilnya sebagai bahan pertimbangan, sertakan bobot yang dipakai, dan tunjukkan bagaimana hasilnya berubah kalau bobotnya digeser.'
    },
    {
      salah: 'Menetapkan bobot tanpa dasar, sekadar supaya jumlahnya satu.',
      kenapa: 'Bobot adalah tempat masuknya penilaian manusia dan paling menentukan hasilnya. Bobot yang ditetapkan asal membuat seluruh perhitungan yang rumit di atasnya kehilangan makna, sebab pemenangnya sudah ditentukan sejak awal oleh angka yang tidak dipertanggungjawabkan.',
      benar: 'Tetapkan bobot bersama pengambil keputusan yang sesungguhnya, atau hitung dengan metode seperti AHP yang membandingkan kriteria berpasangan.'
    }
  ],

  analogi: `Bayangkan memilih kos.

Ada empat pilihan, dan kamu peduli pada **empat hal**: harga, jarak ke kampus, kebersihan, dan kecepatan WiFi.

Persoalannya, keempatnya **saling bertentangan**. Yang paling murah biasanya paling jauh. Yang paling bersih biasanya paling mahal. Tidak ada satu pun yang menang di semuanya.

Itulah **masalah semi-terstruktur** — sebagian bisa dihitung, tetapi tidak ada rumus tunggal yang langsung memberi jawaban.

**SPK** adalah **tabel perbandingan yang kamu buat** untuk membantu memutuskan. Ia tidak memilihkan; ia membuat perbandingannya terlihat.

Sekarang **kenapa tidak bisa dijumlahkan mentah**. Bayangkan menjumlahkan *"harga 800 ribu + jarak 3 km + kebersihan 4 + WiFi 50 Mbps"*. Angkanya keluar: 857. **Apa artinya?** Tidak ada.

Dan lebih buruk lagi: harga yang bernilai ratusan ribu akan **menelan** kebersihan yang cuma bernilai 4. Kos termahal otomatis menang, karena angkanya paling besar.

**Benefit dan cost** adalah menyadari bahwa **arah baiknya berbeda**. WiFi 50 Mbps lebih baik daripada 20. Tetapi harga 800 ribu **lebih buruk** daripada 500 ribu — meski angkanya lebih besar.

Kalau kamu lupa membalik arah harga, tabelmu akan dengan yakin merekomendasikan **kos termahal**, dan menyajikannya dengan skor sampai tiga desimal.

Dan **bobot** adalah bagian yang paling jujur dari seluruh proses: **kamu yang menentukan apa yang penting bagimu.**

Mahasiswa yang uangnya pas-pasan memberi bobot besar pada harga. Mahasiswa yang kuliahnya padat memberi bobot besar pada jarak. **Data kosnya sama persis, dan jawabannya berbeda** — dan keduanya benar.

Itulah kenapa SPK **mendukung**, bukan menggantikan. Ia tidak tahu dompetmu setipis apa.`,

  latihan: [
    'Jelaskan perbedaan masalah terstruktur, semi-terstruktur, dan tidak terstruktur, beserta satu contoh masing-masing. Mana yang menjadi wilayah SPK?',
    'Jelaskan maksud kalimat "SPK mendukung, bukan menggantikan", dan sebutkan bagian mana dari proses yang tetap menjadi tanggung jawab manusia.',
    'Sebutkan empat tahap pengambilan keputusan menurut Simon, dan tentukan di tahap mana SPK paling banyak membantu.',
    'Golongkan kriteria berikut sebagai benefit atau cost beserta alasannya: biaya kuliah, akreditasi, jarak dari rumah, jumlah alumni bekerja, lama masa studi.',
    'Buat matriks keputusan untuk memilih laptop dengan empat alternatif dan empat kriteria. Tentukan jenis dan bobot tiap kriteria.',
    'Jelaskan apa yang terjadi kalau kriteria harga salah digolongkan sebagai benefit, dan kenapa kesalahan ini sulit terdeteksi.'
  ]
});

TOPICS.push({
  id: 'spk-saw-wp',
  judul: 'Metode SAW & Weighted Product',
  kategori: 'spk',
  tag: ['SAW', 'WP', 'normalisasi', 'penjumlahan terbobot', 'perkalian terbobot'],
  ringkas: 'Dua metode MADM paling dasar — satu menjumlahkan, satu mengalikan, dan bedanya bukan sekadar operasi.',

  fungsi: `**Menghitung peringkat alternatif dengan dua metode paling sederhana dan paling sering dipakai.**

Terpakai di:

- **Tugas akhir SPK** — SAW adalah metode yang paling banyak dipakai
- **Pemilihan cepat** yang perlu bisa dijelaskan ke orang awam
- **Pembanding** untuk metode yang lebih rumit

Perbedaan pokoknya, dan ini menentukan pilihan:

- **SAW menjumlahkan** — kelemahan pada satu kriteria bisa **ditutupi** keunggulan di kriteria lain
- **WP mengalikan** — kelemahan pada satu kriteria **menyeret turun** keseluruhannya

Jadi pilih SAW kalau kriteria boleh saling menutupi, dan WP kalau **setiap** kriteria harus terpenuhi.

Contohnya nyata: untuk memilih pemasok, nilai 100 dan 12 lebih buruk daripada 60 dan 60 — dan hanya WP yang menangkap itu.`,

  praktik: {
    tujuan: `Kamu bisa menghitung SAW dan WP dengan benar, termasuk membedakan penanganan kriteria cost, dan memilih di antara keduanya dengan alasan.`,
    alat: [
      'Spreadsheet untuk hitungan pertama',
      'Python untuk versi akhir'
    ],
    langkah: [
      { judul: 'Hitung sekali dengan tangan lebih dulu',
        isi: `Pakai tiga alternatif dan tiga kriteria saja, di kertas atau spreadsheet.

Hitungan tangan ini akan jadi **jawaban acuan** untuk memeriksa kodemu nanti. Tanpa itu, kamu tidak punya cara tahu apakah kodemu benar.` },
      { judul: 'Normalisasi SAW dengan rumus yang tepat',
        isi: `- **benefit**: nilai dibagi **nilai maksimum** di kolom itu
- **cost**: **nilai minimum** di kolom itu dibagi nilai

Perhatikan bahwa keduanya **terbalik**. Memakai rumus benefit untuk kriteria cost adalah kesalahan paling sering, dan hasilnya membalik peringkat tanpa terlihat salah.

Setelah normalisasi, semua nilai berada antara 0 dan 1, dan yang terbaik bernilai 1.` },
      { judul: 'Hitung nilai akhir SAW',
        isi: `Kalikan tiap nilai ternormalisasi dengan bobot kriterianya, lalu jumlahkan per baris.

Nilai tertinggi adalah peringkat pertama.

Periksa: kalau semua bobotmu berjumlah satu, nilai akhir juga berada antara 0 dan 1.` },
      { judul: 'Perbaiki bobot untuk WP',
        isi: `WP memakai bobot sebagai **pangkat**, dan bobot untuk kriteria **cost** harus **negatif**.

Perbaiki dulu agar berjumlah satu: bagi tiap bobot dengan jumlah seluruh bobot.

Lalu beri tanda negatif pada yang cost. Melewatkan langkah ini membuat kriteria cost diperlakukan seperti benefit.` },
      { judul: 'Hitung vektor S dan V',
        isi: `- \`S\` = hasil kali semua nilai dipangkatkan bobotnya
- \`V\` = S dibagi jumlah seluruh S

Jumlah seluruh V selalu tepat satu — itu pemeriksaan cepat yang bagus untuk memastikan hitunganmu benar.` },
      { judul: 'Waspadai nilai nol pada WP',
        isi: `Kalau satu kriteria bernilai nol, maka S menjadi **nol** — dan alternatif itu langsung gugur seunggul apa pun di kriteria lain.

Kadang itu memang yang diinginkan. Kalau tidak, geser seluruh nilainya, misalnya tambah satu, atau pakai SAW.

Sebutkan penanganan ini di laporanmu.` },
      { judul: 'Bandingkan keduanya pada kasus timpang',
        isi: `Buat dua alternatif: satu seimbang dengan nilai 60 dan 60, satu timpang dengan 100 dan 12.

SAW akan memilih yang timpang; WP akan memilih yang seimbang.

Melihat ini sendiri membuat pilihan antara keduanya berhenti terasa sewenang-wenang.` }
    ],
    cek: [
      'Hasil kodemu cocok dengan hitungan tanganmu sampai empat angka di belakang koma',
      'Jumlah seluruh nilai V pada WP tepat satu',
      'Kriteria cost menghasilkan peringkat yang masuk akal, bukan terbalik'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa dihitung begitu',

  konsep: `
**SAW — Simple Additive Weighting**

Metode MADM paling sederhana dan paling banyak dipakai. Juga dikenal sebagai **penjumlahan terbobot**.

Dua langkahnya:

**Langkah 1 — normalisasi matriks.** Rumusnya berbeda menurut jenis kriteria:

- **Benefit**: **rᵢⱼ = xᵢⱼ / max(xⱼ)**
- **Cost**: **rᵢⱼ = min(xⱼ) / xᵢⱼ**

Perhatikan bahwa rumus cost **membalik posisi**: nilai terkecil ada di **pembilang**. Dengan begitu, alternatif termurah mendapat nilai 1, dan yang termahal mendapat nilai kecil.

**Langkah 2 — jumlahkan berbobot:**

**Vᵢ = Σ wⱼ × rᵢⱼ**

Alternatif dengan **V terbesar** adalah yang terbaik.

**WP — Weighted Product**

Memakai **perkalian**, bukan penjumlahan. Bobotnya menjadi **pangkat**.

**Langkah 1 — perbaiki bobot** agar jumlahnya 1:

**wⱼ = wⱼ / Σw**

**Langkah 2 — hitung vektor S:**

**Sᵢ = Π (xᵢⱼ ^ wⱼ)**

dengan pangkat **positif untuk benefit** dan **negatif untuk cost**.

Perhatikan cara WP menangani cost: bukan dengan membalik nilainya, melainkan dengan **memberi pangkat negatif**. Ini elegan, karena \`x⁻ʷ\` sama dengan \`1/xʷ\` — pembalikannya terjadi sendiri.

**Langkah 3 — hitung vektor V:**

**Vᵢ = Sᵢ / ΣS**

Nilai V inilah peringkat akhirnya, dan jumlah seluruh V selalu **tepat 1**.

**Perbedaan yang menentukan: bagaimana kelemahan diperlakukan**

Ini bukan sekadar soal operasi matematika, dan inilah yang paling penting dipahami:

- **SAW menjumlahkan.** Nilai buruk di satu kriteria bisa **ditutupi** nilai bagus di kriteria lain. Alternatif dengan skor 0 pada satu kriteria tetap bisa menang kalau unggul di tempat lain.
- **WP mengalikan.** Nilai sangat rendah di satu kriteria **menyeret turun seluruh hasilnya**, karena perkalian dengan angka kecil selalu menghasilkan angka kecil.

Akibatnya nyata dalam pemilihan:

- Pakai **SAW** kalau kriteria boleh saling menutupi. Memilih karyawan yang lemah di satu bidang tetapi sangat unggul di bidang lain.
- Pakai **WP** kalau **setiap kriteria harus terpenuhi**. Memilih pemasok yang tidak boleh gagal di aspek mana pun.

**Batasan WP: tidak boleh ada nilai nol atau negatif**

Karena WP mengalikan, satu nilai **nol** membuat seluruh hasilnya nol. Dan pangkat pecahan dari bilangan negatif tidak terdefinisi di bilangan riil.

Kalau datamu memuat nol, geser seluruh nilainya, atau pakai SAW.

**Kelemahan bersama: sensitif terhadap bobot**

Keduanya sepenuhnya bergantung pada bobot yang ditetapkan manusia. Karena itu **analisis sensitivitas** — memeriksa apakah pemenangnya berubah ketika bobot digeser sedikit — adalah bagian yang seharusnya tidak dilewatkan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Rumus normalisasi SAW: perhatikan posisi min/max\n#\n# BENEFIT: r = x / max(kolom)\n#   nilai TERBESAR -> 1,0\n#   makin besar makin bagus\n#\n# COST:    r = min(kolom) / x\n#   nilai TERKECIL -> 1,0\n#   posisinya DIBALIK: min ada di ATAS\n#\n# Kesalahan tersering: memakai rumus benefit untuk cost.\n# Hitungannya jalan, hasilnya TERBALIK, tanpa error.',
      penjelasan: `
Perhatikan bahwa **kedua rumus memakai bahan yang sama** — nilai kolom, min, dan max — hanya susunannya yang berbeda. Itulah yang membuatnya mudah tertukar.

Untuk **benefit**, membagi dengan nilai terbesar masuk akal secara langsung: yang terbaik mendapat 1, sisanya pecahan di bawahnya.

Untuk **cost**, penalarannya perlu satu langkah tambahan. Kamu ingin yang **terkecil** mendapat 1. Kalau kamu membagi dengan max seperti benefit, yang **termahal** justru mendapat 1 — persis kebalikan dari yang kamu mau.

Membalik pecahannya menjadi \`min/x\` menyelesaikannya: ketika \`x\` sama dengan min, hasilnya tepat 1; ketika \`x\` besar, hasilnya kecil.

Sekarang perhatikan sifat penting yang sering luput: **hasil normalisasi cost tidak tersebar merata.**

Untuk harga 20, 25, 28, dan 30 dengan min 20:
- 20 → 1,000
- 25 → 0,800
- 28 → 0,714
- 30 → 0,667

Jarak antar-nilainya **menyempit** seiring naiknya harga. Selisih 20 ke 25 memberi penurunan 0,200, sementara selisih 28 ke 30 hanya 0,047 — padahal selisih rupiahnya hampir sama.

Ini akibat bentuk pecahan \`1/x\`, dan ia berarti **SAW dengan kriteria cost memperlakukan perbedaan di ujung murah jauh lebih besar** daripada perbedaan di ujung mahal.

Bandingkan dengan normalisasi min-max yang kamu pelajari di Data Mining, yang tersebar merata. Keduanya sah, tetapi menghasilkan peringkat yang bisa berbeda — dan penting untuk tahu rumus mana yang dipakai metodenya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# SAW & Weighted Product, dihitung dari nol
# ============================================

ALTERNATIF = ["PT Alfa", "PT Beta", "PT Gama", "PT Delta"]
KRITERIA = [
    ("Harga",     0.35, "cost"),
    ("Kualitas",  0.30, "benefit"),
    ("Jarak",     0.15, "cost"),
    ("Ketepatan", 0.20, "benefit"),
]
MATRIKS = [
    [25, 4, 30, 90],
    [30, 5, 45, 95],
    [20, 3, 20, 80],
    [28, 4, 35, 88],
]


def kolom(j):
    return [b[j] for b in MATRIKS]


# ============================================
# SAW: normalisasi lalu JUMLAHKAN berbobot
# ============================================
def saw():
    print("--- SAW: matriks ternormalisasi ---")
    print("  " + "alternatif".ljust(11) +
          "".join(k[0].rjust(11) for k in KRITERIA) + "        V")

    hasil = []
    for nama, baris in zip(ALTERNATIF, MATRIKS):
        norm = []
        for j, (_, _, jenis) in enumerate(KRITERIA):
            kol = kolom(j)
            if jenis == "benefit":
                r = baris[j] / max(kol)          # x / max
            else:
                r = min(kol) / baris[j]          # min / x  <- DIBALIK
            norm.append(r)

        v = sum(w * r for (_, w, _), r in zip(KRITERIA, norm))
        hasil.append((nama, v))
        print("  " + nama.ljust(11) +
              "".join(format(r, "11.4f") for r in norm) +
              format(v, "9.4f"))
    return hasil


hasil_saw = saw()
print("")
print("  peringkat SAW:")
for i, (nama, v) in enumerate(sorted(hasil_saw, key=lambda x: -x[1]), 1):
    print("    " + str(i) + ". " + nama.ljust(10) + format(v, ".4f"))


# ============================================
# WP: bobot jadi PANGKAT, cost jadi pangkat NEGATIF
# ============================================
def wp():
    total_bobot = sum(k[1] for k in KRITERIA)
    bobot = [k[1] / total_bobot for k in KRITERIA]   # diperbaiki jadi 1

    print("")
    print("--- WP: vektor S (perkalian berpangkat) ---")
    print("  bobot diperbaiki: " +
          ", ".join(format(b, ".4f") for b in bobot))
    print("")

    s_list = []
    for nama, baris in zip(ALTERNATIF, MATRIKS):
        s = 1.0
        rincian = []
        for j, ((_, _, jenis), w) in enumerate(zip(KRITERIA, bobot)):
            pangkat = w if jenis == "benefit" else -w   # cost -> NEGATIF
            s *= baris[j] ** pangkat
            rincian.append(format(baris[j], ".0f") + "^" +
                           format(pangkat, "+.3f"))
        s_list.append((nama, s))
        print("  " + nama.ljust(11) + " x ".join(rincian) +
              "  =  S " + format(s, ".5f"))

    total_s = sum(s for _, s in s_list)
    print("")
    print("--- WP: vektor V = S / total S ---")
    hasil = [(nama, s / total_s) for nama, s in s_list]
    for nama, v in hasil:
        print("  " + nama.ljust(11) + format(v, ".4f"))
    print("  " + "jumlah".ljust(11) +
          format(sum(v for _, v in hasil), ".4f") + "  <- selalu 1")
    return hasil


hasil_wp = wp()
print("")
print("  peringkat WP:")
for i, (nama, v) in enumerate(sorted(hasil_wp, key=lambda x: -x[1]), 1):
    print("    " + str(i) + ". " + nama.ljust(10) + format(v, ".4f"))


# ============================================
# Perbedaan yang menentukan: menutupi kelemahan
# ============================================
print("")
print("--- SAW menutupi kelemahan, WP tidak ---")

# Dua alternatif buatan:
#   Seimbang : bagus merata
#   Timpang  : sangat unggul di satu hal, SANGAT LEMAH di satu hal
UJI_ALT = ["Seimbang", "Timpang"]
UJI_KRI = [("K1", 0.5, "benefit"), ("K2", 0.5, "benefit")]
UJI_MAT = [
    [60, 60],     # Seimbang
    [100, 12],    # Timpang: unggul di K1, sangat lemah di K2
]

def hitung_dua(matriks, kriteria, alternatif):
    kol = lambda j: [b[j] for b in matriks]

    print("  " + "alternatif".ljust(11) + "nilai".ljust(14) +
          "SAW".rjust(9) + "WP".rjust(11))
    hasil_s, hasil_w = [], []
    for nama, baris in zip(alternatif, matriks):
        v_saw = sum(w * (baris[j] / max(kol(j)))
                    for j, (_, w, _) in enumerate(kriteria))
        s = 1.0
        for j, (_, w, _) in enumerate(kriteria):
            s *= baris[j] ** w
        hasil_s.append((nama, v_saw))
        hasil_w.append((nama, s))

    total_s = sum(s for _, s in hasil_w)
    for (nama, v_saw), (_, s) in zip(hasil_s, hasil_w):
        print("  " + nama.ljust(11) +
              str(matriks[alternatif.index(nama)]).ljust(14) +
              format(v_saw, "9.4f") + format(s / total_s, "11.4f"))

hitung_dua(UJI_MAT, UJI_KRI, UJI_ALT)

print("")
print("  SAW  : Timpang MENANG -- nilai 100 menutupi nilai 12")
print("  WP   : Seimbang MENANG -- nilai 12 menyeret hasil turun")
print("")
print("  Perkalian menghukum kelemahan; penjumlahan memaafkannya.")
print("  Pilih SAW kalau kriteria boleh saling menutupi.")
print("  Pilih WP kalau SETIAP kriteria harus terpenuhi.")


# ============================================
# Batasan WP: nilai nol
# ============================================
print("")
print("--- batasan WP: nilai NOL ---")
print("  Kalau satu kriteria bernilai 0:")
print("    S = 0^w x ... = 0   -> seluruh hasilnya NOL")
print("    alternatif itu langsung gugur, seunggul apa pun")
print("    di kriteria lain.")
print("")
print("  Kalau datamu memuat nol: geser seluruh nilainya")
print("  (misalnya tambah 1), atau pakai SAW.")`
  },

  output: `--- SAW: matriks ternormalisasi ---
  alternatif       Harga   Kualitas      Jarak  Ketepatan        V
  PT Alfa         0.8000     0.8000     0.6667     0.9474   0.8095
  PT Beta         0.6667     1.0000     0.4444     1.0000   0.8000
  PT Gama         1.0000     0.6000     1.0000     0.8421   0.8484
  PT Delta        0.7143     0.8000     0.5714     0.9263   0.7610

  peringkat SAW:
    1. PT Gama   0.8484
    2. PT Alfa   0.8095
    3. PT Beta   0.8000
    4. PT Delta  0.7610

--- WP: vektor S (perkalian berpangkat) ---
  bobot diperbaiki: 0.3500, 0.3000, 0.1500, 0.2000

  PT Alfa    25^-0.350 x 4^+0.300 x 30^-0.150 x 90^+0.200  =  S 0.72547
  PT Beta    30^-0.350 x 5^+0.300 x 45^-0.150 x 95^+0.200  =  S 0.69225
  PT Gama    20^-0.350 x 3^+0.300 x 20^-0.150 x 80^+0.200  =  S 0.74686
  PT Delta   28^-0.350 x 4^+0.300 x 35^-0.150 x 88^+0.200  =  S 0.67826

--- WP: vektor V = S / total S ---
  PT Alfa    0.2552
  PT Beta    0.2435
  PT Gama    0.2627
  PT Delta   0.2386
  jumlah     1.0000  <- selalu 1

  peringkat WP:
    1. PT Gama   0.2627
    2. PT Alfa   0.2552
    3. PT Beta   0.2435
    4. PT Delta  0.2386

--- SAW menutupi kelemahan, WP tidak ---
  alternatif nilai               SAW         WP
  Seimbang   [60, 60]         0.8000     0.6340
  Timpang    [100, 12]        0.6000     0.3660

  SAW  : Timpang MENANG -- nilai 100 menutupi nilai 12
  WP   : Seimbang MENANG -- nilai 12 menyeret hasil turun

  Perkalian menghukum kelemahan; penjumlahan memaafkannya.
  Pilih SAW kalau kriteria boleh saling menutupi.
  Pilih WP kalau SETIAP kriteria harus terpenuhi.

--- batasan WP: nilai NOL ---
  Kalau satu kriteria bernilai 0:
    S = 0^w x ... = 0   -> seluruh hasilnya NOL
    alternatif itu langsung gugur, seunggul apa pun
    di kriteria lain.

  Kalau datamu memuat nol: geser seluruh nilainya
  (misalnya tambah 1), atau pakai SAW.`,

  kesalahanUmum: [
    {
      salah: 'Memakai rumus normalisasi benefit untuk kriteria cost pada SAW.',
      kenapa: 'Rumus benefit membagi nilai dengan maksimum, sehingga alternatif termahal justru mendapat nilai satu. Peringkatnya terbalik untuk kriteria itu, dan perhitungannya tetap berjalan tanpa pesan kesalahan apa pun karena secara matematis tidak ada yang salah.',
      benar: 'Untuk cost pakai minimum dibagi nilai, sehingga yang terkecil mendapat satu. Perhatikan bahwa posisinya dibalik: min ada di pembilang.'
    },
    {
      salah: 'Memakai WP pada data yang memuat nilai nol.',
      kenapa: 'WP mengalikan seluruh kriteria, sehingga satu nilai nol membuat hasil akhirnya nol dan alternatif itu langsung gugur betapa pun unggulnya di kriteria lain. Selain itu pangkat pecahan dari bilangan negatif tidak terdefinisi di bilangan riil.',
      benar: 'Geser seluruh nilai kolom itu supaya tidak ada yang nol, misalnya menambahkan satu, atau pakai SAW yang tidak punya batasan ini.'
    },
    {
      salah: 'Lupa memberi pangkat negatif pada kriteria cost di WP.',
      kenapa: 'Kriteria cost diperlakukan seperti benefit, sehingga nilai yang lebih besar justru menaikkan skor. Sama seperti kesalahan normalisasi di SAW, hasilnya terbalik tanpa tanda apa pun bahwa ada yang keliru.',
      benar: 'Beri tanda negatif pada pangkat kriteria cost. Ingat bahwa x pangkat negatif w sama dengan satu per x pangkat w, sehingga pembalikannya terjadi sendiri.'
    },
    {
      salah: 'Memilih SAW atau WP tanpa mempertimbangkan apakah kriteria boleh saling menutupi.',
      kenapa: 'SAW menjumlahkan sehingga nilai buruk di satu kriteria bisa ditutupi nilai bagus di kriteria lain, sedangkan WP mengalikan sehingga nilai sangat rendah menyeret turun seluruh hasil. Pada contoh di materi, alternatif timpang menang dengan SAW tetapi kalah dengan WP untuk data yang sama.',
      benar: 'Pakai SAW kalau kriteria memang boleh saling menutupi, dan WP kalau setiap kriteria harus terpenuhi tanpa kecuali.'
    },
    {
      salah: 'Menerima hasil peringkat tanpa memeriksa kepekaannya terhadap bobot.',
      kenapa: 'Selisih antar-alternatif sering sangat tipis, seperti pada contoh di materi di mana PT Alfa dan PT Beta hanya berbeda 0,0016. Pergeseran bobot sedikit saja bisa membalik urutannya, sehingga kesimpulan yang disajikan sebagai final sebenarnya rapuh.',
      benar: 'Lakukan analisis sensitivitas dengan menggeser bobot beberapa persen, lalu laporkan apakah pemenangnya bertahan atau berubah.'
    }
  ],

  analogi: `Bayangkan menilai peserta lomba masak dengan dua juri: **rasa** dan **penyajian**.

**SAW** adalah **menjumlahkan nilai kedua juri**. Peserta yang mendapat 100 untuk rasa tetapi 12 untuk penyajian mendapat total 112. Peserta yang mendapat 60 dan 60 mendapat 120.

Dengan sedikit pergeseran bobot, peserta pertama bisa menang — **kelemahan penyajiannya tertutupi oleh keunggulan rasanya**.

**WP** adalah **mengalikan**. 100 × 12 = 1.200, sementara 60 × 60 = 3.600. Peserta yang seimbang menang telak.

Dan perhatikan kenapa: **mengalikan dengan angka kecil selalu menghasilkan angka kecil**, sebesar apa pun angka yang lain. Nilai 12 itu **tidak bisa ditutupi**.

Sekarang mana yang benar? **Bergantung pada apa yang kamu cari.**

Kalau lombanya mencari **satu hidangan luar biasa** untuk dipajang di majalah, mungkin rasa yang menakjubkan pantas menutupi penyajian yang biasa. Pakai SAW.

Kalau lombanya mencari **koki untuk restoran**, penyajian yang buruk **tidak bisa ditoleransi** berapa pun enaknya masakan — pelanggan makan dengan mata dulu. Pakai WP.

Untuk **normalisasi cost**, bayangkan menilai harga. Kamu tidak bisa memberi nilai mentah, karena harga termurah punya angka terkecil dan akan terlihat paling buruk.

Membalik pecahannya — **harga termurah dibagi harga ini** — membuat yang termurah mendapat nilai penuh 1, dan yang lain di bawahnya.

Tetapi ada akibat halus: **selisih di ujung murah terasa jauh lebih besar** daripada di ujung mahal. Beda 20 juta dan 25 juta terasa besar, sementara beda 28 juta dan 30 juta hampir tidak terasa — padahal selisih rupiahnya mirip.

Itu bukan kesalahan; itu sifat bentuk pecahannya. Tetapi kamu perlu tahu, supaya tidak heran ketika peringkatnya berbeda dari perkiraan.`,

  latihan: [
    'Tuliskan rumus normalisasi SAW untuk benefit dan cost, lalu jelaskan kenapa posisi min dan max dibalik pada cost.',
    'Hitung matriks ternormalisasi SAW untuk kolom harga bernilai 20, 25, 28, dan 30 juta. Jelaskan kenapa jaraknya menyempit di ujung mahal.',
    'Tuliskan tiga langkah metode WP, dan jelaskan kenapa kriteria cost diberi pangkat negatif alih-alih dibalik nilainya.',
    'Untuk dua alternatif bernilai [60, 60] dan [100, 12] dengan bobot sama, hitung skor SAW dan WP-nya. Jelaskan kenapa pemenangnya berbeda.',
    'Jelaskan apa yang terjadi kalau salah satu kriteria bernilai nol pada WP, dan sebutkan dua cara menanganinya.',
    'Kerjakan kasus pemilihan pemasok di materi ini, lalu geser bobot harga dari 0,35 menjadi 0,50 dan periksa apakah pemenangnya berubah.'
  ]
});

TOPICS.push({
  id: 'spk-topsis',
  judul: 'Metode TOPSIS',
  kategori: 'spk',
  tag: ['TOPSIS', 'solusi ideal', 'jarak Euclidean', 'preferensi', 'normalisasi vektor'],
  ringkas: 'Memilih yang paling dekat dengan yang terbaik sekaligus paling jauh dari yang terburuk.',

  fungsi: `**Memilih alternatif yang paling dekat dengan yang ideal dan paling jauh dari yang terburuk.**

Terpakai di:

- **Pemilihan** dengan banyak kriteria yang sifatnya bertentangan
- **Tugas akhir** — TOPSIS adalah metode kedua tersering setelah SAW
- **Perangkingan** yang perlu mempertimbangkan **kedua ujung** sekaligus

Yang membedakannya dari SAW dan WP: **TOPSIS mengukur jarak ke dua acuan sekaligus.**

Alternatif yang unggul tajam di sebagian kriteria tetapi buruk tajam di sebagian lain akan **dekat dengan ideal sekaligus dekat dengan terburuk** — dan TOPSIS menangkap keadaan itu, sedangkan metode berbasis penjumlahan tidak.

Bagian yang paling sering salah: **menukar min dan max pada kriteria cost** saat menentukan solusi ideal.`,

  praktik: {
    tujuan: `Kamu bisa menjalankan kelima langkah TOPSIS dengan benar dan memeriksa hasilnya terhadap hitungan tangan.`,
    alat: [
      'Spreadsheet untuk hitungan pertama',
      'Python dengan NumPy untuk versi akhir'
    ],
    langkah: [
      { judul: 'Normalisasi dengan cara vektor',
        isi: `Berbeda dari SAW. Bagi tiap nilai dengan **akar dari jumlah kuadrat** seluruh nilai di kolom itu.

Periksa: setelah normalisasi, jumlah kuadrat tiap kolom harus tepat satu. Itu pemeriksaan cepat yang menangkap sebagian besar kesalahan.` },
      { judul: 'Kalikan dengan bobot',
        isi: `Kalikan tiap kolom ternormalisasi dengan bobot kriterianya.

Hasilnya disebut matriks ternormalisasi terbobot, dan seluruh langkah berikutnya bekerja pada matriks ini — bukan pada data asli.` },
      { judul: 'Tentukan solusi ideal dengan hati-hati',
        isi: `Ini bagian yang paling sering salah:

- **A plus** (ideal): **maksimum** untuk benefit, **minimum** untuk cost
- **A minus** (terburuk): **minimum** untuk benefit, **maksimum** untuk cost

Untuk kriteria cost, keduanya **terbalik** dari yang biasa. Menukarnya membalik seluruh peringkat, dan hasilnya tetap terlihat wajar — itulah yang membuatnya berbahaya.

Cetak kedua vektor ini dan periksa satu per satu sebelum lanjut.` },
      { judul: 'Hitung jarak Euclidean ke keduanya',
        isi: `- \`D plus\` = akar dari jumlah kuadrat selisih terhadap A plus
- \`D minus\` = akar dari jumlah kuadrat selisih terhadap A minus

Keduanya harus dihitung. Mengukur hanya jarak ke ideal tidak cukup — dan langkah berikutnya menjelaskan kenapa.` },
      { judul: 'Hitung nilai preferensi',
        isi: `- \`V = D minus / (D minus + D plus)\`

Nilainya selalu antara 0 dan 1. Makin besar makin baik, dan yang tertinggi adalah peringkat pertama.

Perhatikan bahwa pembilangnya adalah \`D minus\` — jarak ke yang **terburuk**. Makin jauh dari terburuk, makin baik.` },
      { judul: 'Buktikan kenapa dua jarak diperlukan',
        isi: `Cari dua alternatif di datamu yang **D plus**-nya mirip tetapi **D minus**-nya jauh berbeda.

Yang \`D minus\`-nya kecil berada dekat **kedua** ujung sekaligus — unggul tajam di sebagian kriteria, buruk tajam di sebagian lain.

Metode berbasis penjumlahan tidak bisa membedakan keduanya. Inilah keunggulan TOPSIS.` },
      { judul: 'Periksa terhadap hitungan tangan',
        isi: `Kerjakan kasus tiga alternatif dan tiga kriteria di spreadsheet, lalu bandingkan dengan kodemu di setiap tahap — bukan cuma hasil akhirnya.

Kalau berbeda, kamu langsung tahu tahap mana yang salah.` }
    ],
    cek: [
      'Jumlah kuadrat tiap kolom setelah normalisasi tepat satu',
      'Solusi ideal untuk kriteria cost mengambil nilai minimum, bukan maksimum',
      'Hasil kodemu cocok dengan hitungan spreadsheet di setiap tahap'
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa dihitung begitu',

  konsep: `
**TOPSIS** — *Technique for Order Preference by Similarity to Ideal Solution*.

Gagasannya berbeda dari SAW dan WP. Alih-alih menjumlahkan atau mengalikan skor, TOPSIS **membayangkan dua alternatif khayalan**:

- **Solusi ideal positif (A⁺)** — alternatif sempurna. Nilai terbaik di **setiap** kriteria.
- **Solusi ideal negatif (A⁻)** — alternatif terburuk. Nilai terburuk di setiap kriteria.

Keduanya biasanya **tidak ada** di daftar alternatif nyata. Mereka **titik acuan**.

Lalu TOPSIS mengukur: **alternatif mana yang paling dekat ke A⁺ sekaligus paling jauh dari A⁻?**

Kenapa keduanya sekaligus? Karena hanya mengukur kedekatan ke ideal positif tidak cukup — bisa saja sebuah alternatif dekat ke yang terbaik tetapi **juga dekat ke yang terburuk**, artinya ia berada di tengah-tengah tanpa keunggulan jelas.

**Lima langkahnya**

**1. Normalisasi vektor** — berbeda dari SAW:

**rᵢⱼ = xᵢⱼ / √(Σ xᵢⱼ²)**

Pembaginya **akar jumlah kuadrat** seluruh kolom. Ini disebut normalisasi Euclidean, dan menghasilkan vektor kolom yang panjangnya 1.

Perhatikan bahwa **rumusnya sama untuk benefit dan cost** — jenis kriteria baru dipakai di langkah 3.

**2. Matriks ternormalisasi terbobot:**

**yᵢⱼ = wⱼ × rᵢⱼ**

**3. Tentukan solusi ideal:**

- **A⁺** = nilai **max** untuk benefit, **min** untuk cost
- **A⁻** = nilai **min** untuk benefit, **max** untuk cost

**Di sinilah jenis kriteria masuk**, dan inilah tempat kesalahan paling sering terjadi.

**4. Hitung jarak Euclidean:**

- **Dᵢ⁺ = √(Σ (yᵢⱼ − yⱼ⁺)²)** — jarak ke ideal positif
- **Dᵢ⁻ = √(Σ (yᵢⱼ − yⱼ⁻)²)** — jarak ke ideal negatif

**5. Hitung nilai preferensi:**

**Vᵢ = Dᵢ⁻ / (Dᵢ⁻ + Dᵢ⁺)**

Perhatikan bahwa **pembilangnya D⁻**, bukan D⁺. Itu disengaja: makin **jauh** dari yang terburuk, makin besar nilainya.

Nilai V selalu antara **0 dan 1**. Alternatif dengan **V terbesar** adalah yang terbaik.

**Membaca nilai V**

- **V mendekati 1** — sangat dekat ke ideal positif
- **V mendekati 0** — sangat dekat ke ideal negatif
- **V sekitar 0,5** — berada di tengah

Sifat ini membuat TOPSIS lebih mudah ditafsirkan daripada SAW: nilainya punya **arti absolut**, bukan sekadar urutan.

**Keunggulan TOPSIS**

- Memperhitungkan **jarak ke terbaik dan terburuk sekaligus**
- Nilai akhirnya punya makna yang jelas
- Cocok untuk banyak kriteria dan banyak alternatif

**Kelemahannya**

- **Lebih rumit** dihitung manual
- Tetap **peka terhadap bobot**, sama seperti metode lain
- Bisa mengalami **rank reversal** — menambah atau membuang satu alternatif dapat **membalik urutan** alternatif lain, karena solusi ideal ikut bergeser
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa V memakai D-negatif di PEMBILANG?\n#\n#   V = D- / (D- + D+)\n#\n# Makin JAUH dari yang terburuk -> D- besar -> V besar\n# Makin DEKAT ke yang terbaik  -> D+ kecil -> V besar\n#\n# Kalau ditulis terbalik V = D+ / (D- + D+),\n# maka alternatif TERBURUK yang mendapat nilai tertinggi.\n#\n# Nilai V selalu antara 0 dan 1:\n#   V = 1  -> tepat di solusi ideal positif\n#   V = 0  -> tepat di solusi ideal negatif',
      penjelasan: `
Letak **D⁻** di pembilang sering terasa terbalik saat pertama dilihat, dan itulah kenapa mudah salah ditulis.

Nalarnya begini: kamu ingin nilai **besar** untuk alternatif yang **bagus**. Alternatif bagus punya dua sifat — **dekat ke ideal positif** (D⁺ kecil) dan **jauh dari ideal negatif** (D⁻ besar).

Kalau kamu menaruh D⁺ di pembilang, alternatif bagus akan mendapat nilai **kecil**, dan peringkatnya terbalik.

Dengan D⁻ di pembilang, keduanya bekerja searah: D⁻ besar menaikkan pembilang, dan D⁺ kecil mengecilkan penyebut. **Keduanya sama-sama menaikkan V.**

Sekarang kenapa penyebutnya **jumlah keduanya**, bukan salah satu saja. Itu yang membuat V selalu berada di **antara 0 dan 1**, karena pembilangnya selalu lebih kecil atau sama dengan penyebutnya.

Sifat ini memberi V **makna absolut**, dan itu keunggulan nyata dibanding SAW. Pada SAW, skor 0,8 tidak berarti apa pun tanpa membandingkannya dengan skor lain. Pada TOPSIS, **V = 0,8 berarti alternatif itu jelas condong ke sisi baik**, terlepas dari alternatif lainnya.

Sekarang perhatikan kenapa **mengukur jarak ke ideal positif saja tidak cukup** — inilah gagasan utama TOPSIS.

Bayangkan dua alternatif yang sama-sama berjarak 0,3 dari ideal positif. Terlihat setara. Tetapi yang satu berjarak 0,5 dari ideal negatif, sementara yang lain berjarak 0,1.

Yang kedua itu **berada di dekat kedua ujung sekaligus** — artinya ia unggul tajam di sebagian kriteria tetapi buruk tajam di sebagian lain. Yang pertama lebih merata.

Dengan mengukur keduanya, TOPSIS bisa membedakan keadaan yang **tidak bisa dibedakan** kalau cuma satu jarak yang dihitung.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# TOPSIS: lima langkah, dihitung dari nol
# ============================================
import math

ALTERNATIF = ["PT Alfa", "PT Beta", "PT Gama", "PT Delta"]
KRITERIA = [
    ("Harga",     0.35, "cost"),
    ("Kualitas",  0.30, "benefit"),
    ("Jarak",     0.15, "cost"),
    ("Ketepatan", 0.20, "benefit"),
]
MATRIKS = [
    [25, 4, 30, 90],
    [30, 5, 45, 95],
    [20, 3, 20, 80],
    [28, 4, 35, 88],
]

n_kri = len(KRITERIA)
kolom = [[b[j] for b in MATRIKS] for j in range(n_kri)]


# ---------- Langkah 1: normalisasi VEKTOR ----------
# r = x / akar(jumlah kuadrat kolom)
# Rumusnya SAMA untuk benefit & cost -- jenis baru dipakai
# di langkah 3.
pembagi = [math.sqrt(sum(v * v for v in kol)) for kol in kolom]

R = [[MATRIKS[i][j] / pembagi[j] for j in range(n_kri)]
     for i in range(len(ALTERNATIF))]

print("--- 1. matriks ternormalisasi (vektor) ---")
print("  " + "alternatif".ljust(11) +
      "".join(k[0].rjust(11) for k in KRITERIA))
for nama, baris in zip(ALTERNATIF, R):
    print("  " + nama.ljust(11) +
          "".join(format(v, "11.4f") for v in baris))
print("  " + "pembagi".ljust(11) +
      "".join(format(p, "11.4f") for p in pembagi))


# ---------- Langkah 2: terbobot ----------
Y = [[R[i][j] * KRITERIA[j][1] for j in range(n_kri)]
     for i in range(len(ALTERNATIF))]

print("")
print("--- 2. matriks ternormalisasi TERBOBOT ---")
for nama, baris in zip(ALTERNATIF, Y):
    print("  " + nama.ljust(11) +
          "".join(format(v, "11.4f") for v in baris))


# ---------- Langkah 3: solusi ideal ----------
# DI SINILAH jenis kriteria dipakai
A_plus, A_minus = [], []
for j, (_, _, jenis) in enumerate(KRITERIA):
    kol = [Y[i][j] for i in range(len(ALTERNATIF))]
    if jenis == "benefit":
        A_plus.append(max(kol))      # benefit: terbaik = MAX
        A_minus.append(min(kol))
    else:
        A_plus.append(min(kol))      # cost: terbaik = MIN
        A_minus.append(max(kol))

print("")
print("--- 3. solusi ideal ---")
print("  " + "kriteria".ljust(11) +
      "".join(k[0].rjust(11) for k in KRITERIA))
print("  " + "jenis".ljust(11) +
      "".join(k[2].rjust(11) for k in KRITERIA))
print("  " + "A+ (ideal)".ljust(11) +
      "".join(format(v, "11.4f") for v in A_plus))
print("  " + "A- (buruk)".ljust(11) +
      "".join(format(v, "11.4f") for v in A_minus))
print("")
print("  Perhatikan: untuk COST, A+ mengambil MIN dan A- MAX.")
print("  Menukarnya membalik seluruh peringkat.")


# ---------- Langkah 4: jarak Euclidean ----------
print("")
print("--- 4. jarak ke solusi ideal ---")
print("  " + "alternatif".ljust(11) + "D+".rjust(10) + "D-".rjust(10))

D_plus, D_minus = [], []
for i, nama in enumerate(ALTERNATIF):
    dp = math.sqrt(sum((Y[i][j] - A_plus[j]) ** 2 for j in range(n_kri)))
    dm = math.sqrt(sum((Y[i][j] - A_minus[j]) ** 2 for j in range(n_kri)))
    D_plus.append(dp)
    D_minus.append(dm)
    print("  " + nama.ljust(11) + format(dp, "10.4f") + format(dm, "10.4f"))


# ---------- Langkah 5: nilai preferensi ----------
print("")
print("--- 5. nilai preferensi V = D- / (D- + D+) ---")
hasil = []
for i, nama in enumerate(ALTERNATIF):
    v = D_minus[i] / (D_minus[i] + D_plus[i])
    hasil.append((nama, v))
    print("  " + nama.ljust(11) + format(v, "10.4f"))

print("")
print("  peringkat TOPSIS:")
for i, (nama, v) in enumerate(sorted(hasil, key=lambda x: -x[1]), 1):
    tafsir = ""
    if v > 0.7:
        tafsir = "  (condong ke IDEAL)"
    elif v < 0.3:
        tafsir = "  (condong ke TERBURUK)"
    else:
        tafsir = "  (di tengah)"
    print("    " + str(i) + ". " + nama.ljust(10) +
          format(v, ".4f") + tafsir)


# ============================================
# Kenapa harus DUA jarak, bukan satu
# ============================================
print("")
print("--- kenapa mengukur D+ SAJA tidak cukup ---")
print("  " + "alternatif".ljust(11) + "D+".rjust(9) + "D-".rjust(9) +
      "V".rjust(9))
for i, nama in enumerate(ALTERNATIF):
    v = D_minus[i] / (D_minus[i] + D_plus[i])
    print("  " + nama.ljust(11) + format(D_plus[i], "9.4f") +
          format(D_minus[i], "9.4f") + format(v, "9.4f"))

print("")
print("  Dua alternatif bisa punya D+ yang mirip, tapi D- yang")
print("  jauh berbeda. Yang D- nya kecil berada dekat KEDUA")
print("  ujung sekaligus -- unggul tajam di sebagian kriteria,")
print("  buruk tajam di sebagian lain.")
print("")
print("  Mengukur keduanya membuat TOPSIS bisa membedakan")
print("  keadaan yang tak terbedakan kalau cuma satu jarak.")


# ============================================
# Membandingkan ketiga metode
# ============================================
print("")
print("--- SAW vs WP vs TOPSIS pada data yang SAMA ---")

def saw_skor():
    out = []
    for baris in MATRIKS:
        v = 0.0
        for j, (_, w, jenis) in enumerate(KRITERIA):
            kol = kolom[j]
            r = baris[j] / max(kol) if jenis == "benefit" \
                else min(kol) / baris[j]
            v += w * r
        out.append(v)
    return out

def wp_skor():
    total_w = sum(k[1] for k in KRITERIA)
    s = []
    for baris in MATRIKS:
        nilai = 1.0
        for j, (_, w, jenis) in enumerate(KRITERIA):
            p = (w / total_w) * (1 if jenis == "benefit" else -1)
            nilai *= baris[j] ** p
        s.append(nilai)
    tot = sum(s)
    return [x / tot for x in s]

skor_saw = saw_skor()
skor_wp = wp_skor()
skor_topsis = [D_minus[i] / (D_minus[i] + D_plus[i])
               for i in range(len(ALTERNATIF))]

def peringkat(skor):
    urut = sorted(range(len(skor)), key=lambda i: -skor[i])
    p = [0] * len(skor)
    for tingkat, i in enumerate(urut, 1):
        p[i] = tingkat
    return p

p_saw, p_wp, p_top = peringkat(skor_saw), peringkat(skor_wp), \
                     peringkat(skor_topsis)

print("  " + "alternatif".ljust(11) + "SAW".rjust(16) +
      "WP".rjust(16) + "TOPSIS".rjust(16))
for i, nama in enumerate(ALTERNATIF):
    print("  " + nama.ljust(11) +
          (format(skor_saw[i], ".4f") + " (#" + str(p_saw[i]) + ")").rjust(16) +
          (format(skor_wp[i], ".4f") + " (#" + str(p_wp[i]) + ")").rjust(16) +
          (format(skor_topsis[i], ".4f") + " (#" + str(p_top[i]) + ")").rjust(16))

print("")
print("  Nilai skornya JAUH berbeda antar metode -- jangan pernah")
print("  membandingkan angkanya lintas metode. Yang bisa")
print("  dibandingkan cuma PERINGKATNYA.")`
  },

  output: `--- 1. matriks ternormalisasi (vektor) ---
  alternatif       Harga   Kualitas      Jarak  Ketepatan
  PT Alfa         0.4803     0.4924     0.4447     0.5090
  PT Beta         0.5764     0.6155     0.6671     0.5372
  PT Gama         0.3843     0.3693     0.2965     0.4524
  PT Delta        0.5380     0.4924     0.5189     0.4977
  pembagi        52.0481     8.1240    67.4537   176.8304

--- 2. matriks ternormalisasi TERBOBOT ---
  PT Alfa         0.1681     0.1477     0.0667     0.1018
  PT Beta         0.2017     0.1846     0.1001     0.1074
  PT Gama         0.1345     0.1108     0.0445     0.0905
  PT Delta        0.1883     0.1477     0.0778     0.0995

--- 3. solusi ideal ---
  kriteria         Harga   Kualitas      Jarak  Ketepatan
  jenis             cost    benefit       cost    benefit
  A+ (ideal)      0.1345     0.1846     0.0445     0.1074
  A- (buruk)      0.2017     0.1108     0.1001     0.0905

  Perhatikan: untuk COST, A+ mengambil MIN dan A- MAX.
  Menukarnya membalik seluruh peringkat.

--- 4. jarak ke solusi ideal ---
  alternatif         D+        D-
  PT Alfa        0.0550    0.0611
  PT Beta        0.0873    0.0758
  PT Gama        0.0758    0.0873
  PT Delta       0.0737    0.0461

--- 5. nilai preferensi V = D- / (D- + D+) ---
  PT Alfa        0.5265
  PT Beta        0.4648
  PT Gama        0.5352
  PT Delta       0.3845

  peringkat TOPSIS:
    1. PT Gama   0.5352  (di tengah)
    2. PT Alfa   0.5265  (di tengah)
    3. PT Beta   0.4648  (di tengah)
    4. PT Delta  0.3845  (di tengah)

--- kenapa mengukur D+ SAJA tidak cukup ---
  alternatif        D+       D-        V
  PT Alfa       0.0550   0.0611   0.5265
  PT Beta       0.0873   0.0758   0.4648
  PT Gama       0.0758   0.0873   0.5352
  PT Delta      0.0737   0.0461   0.3845

  Dua alternatif bisa punya D+ yang mirip, tapi D- yang
  jauh berbeda. Yang D- nya kecil berada dekat KEDUA
  ujung sekaligus -- unggul tajam di sebagian kriteria,
  buruk tajam di sebagian lain.

  Mengukur keduanya membuat TOPSIS bisa membedakan
  keadaan yang tak terbedakan kalau cuma satu jarak.

--- SAW vs WP vs TOPSIS pada data yang SAMA ---
  alternatif              SAW              WP          TOPSIS
  PT Alfa         0.8095 (#2)     0.2552 (#2)     0.5265 (#2)
  PT Beta         0.8000 (#3)     0.2435 (#3)     0.4648 (#3)
  PT Gama         0.8484 (#1)     0.2627 (#1)     0.5352 (#1)
  PT Delta        0.7610 (#4)     0.2386 (#4)     0.3845 (#4)

  Ketiga metode memberi PERINGKAT YANG SAMA di sini --
  itu tanda kesimpulannya kuat. Kalau ketiganya berbeda,
  berarti alternatifnya memang berimbang dan pilihannya
  bergantung pada apa yang paling kamu pentingkan.

  Nilai skornya JAUH berbeda antar metode -- jangan pernah
  membandingkan angkanya lintas metode. Yang bisa
  dibandingkan cuma PERINGKATNYA.`,

  kesalahanUmum: [
    {
      salah: 'Menukar max dan min saat menentukan solusi ideal untuk kriteria cost.',
      kenapa: 'Untuk cost, solusi ideal positif justru mengambil nilai minimum karena makin kecil makin baik. Menukarnya membuat alternatif termahal dianggap ideal, dan seluruh peringkat terbalik tanpa satu pun pesan kesalahan.',
      benar: 'Ingat bahwa A plus selalu berisi nilai TERBAIK, yang berarti max untuk benefit dan min untuk cost. A minus kebalikannya.'
    },
    {
      salah: 'Menaruh D plus di pembilang rumus nilai preferensi.',
      kenapa: 'Alternatif terbaik justru mendapat nilai terkecil, sehingga peringkatnya terbalik. Kesalahan ini mudah terjadi karena D plus terasa lebih alami disebut lebih dulu, padahal yang dicari adalah kejauhan dari yang terburuk.',
      benar: 'Pakai V sama dengan D minus dibagi jumlah D minus dan D plus. Makin jauh dari terburuk berarti makin bagus.'
    },
    {
      salah: 'Memakai rumus normalisasi SAW pada langkah pertama TOPSIS.',
      kenapa: 'TOPSIS memakai normalisasi vektor dengan pembagi akar jumlah kuadrat, bukan pembagian dengan nilai maksimum. Memakai rumus yang salah menghasilkan matriks berbeda, dan jarak ke solusi ideal ikut salah meski langkah berikutnya dikerjakan dengan benar.',
      benar: 'Pakai pembagi akar dari jumlah kuadrat seluruh nilai kolom. Rumusnya sama untuk benefit maupun cost, karena jenis kriteria baru dipakai saat menentukan solusi ideal.'
    },
    {
      salah: 'Membandingkan nilai skor SAW, WP, dan TOPSIS secara langsung.',
      kenapa: 'Ketiganya memakai skala yang sama sekali berbeda. Nilai WP selalu berjumlah satu untuk seluruh alternatif sehingga angkanya kecil, sementara SAW bisa mendekati satu untuk setiap alternatif. Membandingkan angkanya lintas metode tidak bermakna apa pun.',
      benar: 'Bandingkan hanya peringkatnya, bukan nilainya. Kalau ketiga metode memberi peringkat yang sama, kesimpulanmu jauh lebih kuat.'
    },
    {
      salah: 'Menganggap peringkat TOPSIS tidak akan berubah kalau ada alternatif baru ditambahkan.',
      kenapa: 'Solusi ideal positif dan negatif dihitung dari alternatif yang ada, sehingga menambah atau membuang satu alternatif menggeser kedua titik acuan itu. Akibatnya urutan alternatif lain bisa berbalik, dan gejala ini disebut rank reversal.',
      benar: 'Sadari bahwa peringkat TOPSIS bersifat relatif terhadap kumpulan alternatif yang dinilai. Kalau daftarnya berubah, hitung ulang seluruhnya.'
    }
  ],

  analogi: `Bayangkan mencari kos, dan kamu menggambar dua kos khayalan lebih dulu.

**Kos ideal** — termurah, terdekat, terbersih, WiFi tercepat. Ia **tidak ada**; kamu menyusunnya dengan mengambil nilai terbaik dari masing-masing kos yang ada.

**Kos terburuk** — termahal, terjauh, terkotor, WiFi terlambat. Juga tidak ada.

Sekarang untuk setiap kos nyata, kamu bertanya: **seberapa jauh dari kos ideal, dan seberapa jauh dari kos terburuk?**

Dan inilah gagasan yang membuat TOPSIS berbeda: **kedua jarak itu perlu.**

Bayangkan dua kos yang sama-sama berjarak sedang dari kos ideal. Terlihat setara. Tetapi yang satu **juga jauh dari kos terburuk**, sementara yang lain **sangat dekat dengannya**.

Yang kedua berarti: kos itu punya satu-dua keunggulan mencolok, tetapi juga **satu-dua kelemahan yang parah**. Ia berdiri di dekat kedua ujung sekaligus.

Kalau kamu cuma mengukur jarak ke kos ideal, kamu **tidak akan pernah tahu** bedanya.

Untuk **rumus V-nya**, perhatikan arah berpikirnya. Kamu ingin angka besar untuk kos bagus. Kos bagus **dekat ke ideal** dan **jauh dari terburuk**.

Jadi yang ditaruh di atas adalah **jarak dari yang terburuk** — makin jauh dari yang buruk, makin tinggi nilainya. Kalau dibalik, kamu justru akan merekomendasikan kos terburuk dengan penuh keyakinan.

Terakhir, **rank reversal**. Bayangkan kamu sudah memeringkat lima kos, lalu menemukan satu kos baru yang **sangat mahal**. Kos itu langsung menjadi "kos terburuk" versi baru untuk kriteria harga — dan **seluruh acuanmu bergeser**.

Kos yang tadinya kamu anggap mahal kini terlihat wajar. Peringkatnya bisa berubah, **tanpa satu pun kos lama berubah harganya.**`,

  latihan: [
    'Sebutkan lima langkah TOPSIS secara berurutan, dan tunjukkan di langkah mana jenis benefit atau cost dipakai.',
    'Jelaskan perbedaan normalisasi TOPSIS dan normalisasi SAW, lalu jelaskan kenapa rumus TOPSIS sama untuk benefit dan cost.',
    'Tentukan solusi ideal positif dan negatif untuk matriks terbobot dengan kolom harga bersifat cost dan kualitas bersifat benefit.',
    'Jelaskan kenapa rumus nilai preferensi memakai D negatif di pembilang, dan apa yang terjadi kalau ditukar dengan D positif.',
    'Jelaskan kenapa mengukur jarak ke solusi ideal positif saja tidak cukup, dengan contoh dua alternatif berjarak sama.',
    'Jelaskan apa itu rank reversal pada TOPSIS, kenapa ia bisa terjadi, dan apa akibatnya bagi cara melaporkan hasil.'
  ]
});


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari berkas kuliah sendiri. Tiga
   topik berikutnya mengisi pokok bahasan yang lazim di RPS dan
   penelitian SPK kampus lain tetapi tidak ada bahannya di
   drive: AHP (bobot dari perbandingan berpasangan, dengan uji
   konsistensi), Profile Matching (analisis GAP), dan analisis
   sensitivitas bobot beserta rank reversal.

   Topik AHP dan analisis sensitivitas memakai kasus pemilihan
   pemasok yang SAMA dengan topik SAW, WP, dan TOPSIS di atas,
   dan angkanya sudah dicocokkan dengan keluaran topik-topik itu.
   Kasus seleksi asisten praktikum di topik Profile Matching
   adalah data TIRUAN. Semua program benar-benar dijalankan.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'spk-ahp',
  judul: 'AHP — Bobot dari Perbandingan Berpasangan',
  kategori: 'spk',
  tag: ['AHP', 'perbandingan berpasangan', 'skala Saaty', 'eigenvector', 'rasio konsistensi', 'bobot kriteria'],
  ringkas: 'Manusia buruk memberi bobot "Harga 0,35" tetapi cukup baik menjawab "Harga atau Kualitas, mana lebih penting, dan seberapa?" — AHP mengubah jawaban kedua menjadi yang pertama, lalu memeriksa apakah jawabannya saling bertentangan.',

  fungsi: `**Menurunkan bobot kriteria dari serangkaian perbandingan dua-dua, lalu mengukur apakah perbandingan-perbandingan itu konsisten satu sama lain.**

Di topik SAW, WP, dan TOPSIS, bobotnya — Harga 0,35, Kualitas 0,30, dan seterusnya — diberikan begitu saja. Topik ini menjawab pertanyaan yang pasti muncul saat sidang: **dari mana angka itu?**

Terpakai di:

- **Menentukan bobot** sebelum SAW, WP, atau TOPSIS — kombinasi AHP-SAW dan AHP-TOPSIS sangat umum di tugas akhir
- **Keputusan kelompok** — setiap anggota mengisi perbandingan, dan hasilnya digabung
- **Mendokumentasikan alasan** — matriks perbandingan adalah catatan tertulis tentang apa yang dianggap penting dan seberapa

Yang membuat AHP lebih dari sekadar cara menebak bobot: **rasio konsistensi.** Kalau seseorang bilang Harga 3 kali lebih penting dari Kualitas, dan Kualitas 3 kali lebih penting dari Jarak, tetapi Jarak lebih penting dari Harga — AHP menangkapnya dengan satu angka.`,

  praktik: {
    tujuan: 'Kamu bisa menyusun matriks perbandingan berpasangan, menghitung bobot dengan eigenvector dan dengan cara rata-rata kolom, menghitung CR, menemukan penilaian yang paling bertentangan, dan memakai bobotnya di SAW.',
    alat: ['Python 3', 'Lembar isian perbandingan untuk pengambil keputusan'],
    langkah: [
      { judul: 'Isi perbandingan segitiga atas',
        isi: `Untuk n kriteria ada n(n − 1)/2 pasangan — 6 untuk empat kriteria. Untuk setiap pasangan, tanyakan: mana yang lebih penting, dan seberapa, dengan skala Saaty:

- 1 sama penting
- 3 sedikit lebih penting
- 5 lebih penting
- 7 sangat lebih penting
- 9 mutlak lebih penting
- 2, 4, 6, 8 di antaranya` },
      { judul: 'Lengkapi dengan kebalikannya',
        isi: `Diagonal selalu 1. Kalau Harga : Jarak = 3, maka Jarak : Harga = 1/3. Seluruh segitiga bawah terisi otomatis.` },
      { judul: 'Hitung bobot dengan rata-rata kolom',
        isi: `Jumlahkan setiap kolom, bagi setiap isi dengan jumlah kolomnya, lalu rata-ratakan setiap baris. Ini cara yang lazim di buku dan bisa dikerjakan dengan tangan.` },
      { judul: 'Hitung bobot dengan eigenvector',
        isi: `Bobot yang sebenarnya didefinisikan AHP adalah eigenvector utama matriksnya. Pakai power iteration — kalikan matriks dengan vektor bobot berulang-ulang, normalkan jumlahnya menjadi 1.

Untuk matriks yang cukup konsisten, hasilnya hampir sama dengan cara rata-rata kolom.` },
      { judul: 'Hitung λmaks, CI, dan CR',
        isi: `λmaks = rata-rata dari (A·w)ᵢ / wᵢ. CI = (λmaks − n)/(n − 1). CR = CI / RI, dengan RI indeks acak Saaty: 0,58 untuk n = 3; 0,90 untuk 4; 1,12 untuk 5; 1,24 untuk 6.

CR di bawah 0,1 dianggap cukup konsisten.` },
      { judul: 'Kalau CR ≥ 0,1, cari sel yang bertentangan',
        isi: `Untuk setiap pasangan, bandingkan penilaiannya dengan rasio bobot yang dihasilkan: aᵢⱼ × wⱼ / wᵢ. Pasangan dengan simpangan terbesar adalah yang paling bertentangan dengan penilaian lainnya.

Kembalikan pasangan itu kepada penilai untuk ditinjau — jangan diubah sendiri.` },
      { judul: 'Pakai bobotnya di metode MADM',
        isi: `Masukkan bobot AHP ke SAW, WP, atau TOPSIS. Laporkan matriks perbandingan, bobot, dan CR-nya di bab metodologi, supaya pembaca bisa menelusuri dari mana bobotnya datang.` }
    ],
    cek: [
      'Matriks perbandinganmu punya diagonal 1 dan setiap isi segitiga bawah adalah kebalikan segitiga atas',
      'Bobot eigenvector dan bobot rata-rata kolommu hampir sama untuk matriks yang konsisten',
      'CR yang kamu laporkan di bawah 0,1, atau kamu sudah meninjau ulang penilaiannya',
      'Kamu bisa menunjuk pasangan mana yang paling bertentangan pada matriks yang tidak konsisten'
    ]
  },

  judulLogicSyntax: 'Bedah Rumus — kenapa bobotnya eigenvector',

  konsep: `Topik pengantar SPK menyebut dua cara menentukan bobot: ditetapkan langsung oleh pengambil keputusan, atau dihitung dengan metode seperti **AHP** — Analytic Hierarchy Process. Topik ini membahas yang kedua, dengan kasus pemilihan pemasok yang sama dengan topik SAW, WP, dan TOPSIS.

**Kenapa perbandingan dua-dua**

Minta seorang manajer menulis "bobot Harga berapa?", dan ia akan ragu: 0,3? 0,35? 0,4? Angka itu tidak punya pegangan.

Tanyakan "Harga atau Kualitas, mana yang lebih penting?", dan ia bisa menjawab dengan yakin. Otak manusia jauh lebih baik membandingkan dua hal daripada memberi angka mutlak pada satu hal. AHP memanfaatkan itu: kumpulkan banyak perbandingan kecil, lalu biarkan matematika menyusunnya menjadi bobot.

**Matriks perbandingan**

| | Harga | Kualitas | Jarak | Ketepatan |
|---|---|---|---|---|
| Harga | 1 | 1 | 3 | 2 |
| Kualitas | 1 | 1 | 2 | 1 |
| Jarak | 1/3 | 1/2 | 1 | 1/2 |
| Ketepatan | 1/2 | 1 | 2 | 1 |

Isi baris i kolom j: seberapa lebih penting kriteria i dibanding j. Harga 3 kali lebih penting dari Jarak, jadi Jarak : Harga = 1/3. Hanya enam isi di atas diagonal yang benar-benar ditanyakan.

**Bobot**

| Kriteria | Eigenvector | Rata-rata kolom |
|---|---|---|
| Harga | 0,3659 | 0,3645 |
| Kualitas | 0,2778 | 0,2777 |
| Jarak | 0,1238 | 0,1242 |
| Ketepatan | 0,2326 | 0,2336 |

Kedua cara hampir sama — selisihnya di digit ketiga. Rata-rata kolom adalah pendekatan eigenvector yang bisa dihitung dengan tangan; untuk matriks yang konsisten, keduanya sepakat.

Bobot ini dekat dengan bobot di topik SAW (0,35 · 0,30 · 0,15 · 0,20), dan SAW dengan bobot AHP tetap memilih **PT Gama** — skornya 0,8522, dibanding 0,8484 dengan bobot lama.

**Konsistensi**

Kalau semua penilaian konsisten sempurna — aᵢⱼ tepat sama dengan wᵢ/wⱼ — maka eigenvalue terbesar matriksnya **tepat n**. Program membuktikannya: matriks yang dibangun dari bobot 0,35 · 0,30 · 0,15 · 0,20 memberi λmaks = 4,0000 dan bobot yang sama persis kembali.

Penilaian manusia tidak pernah sempurna, jadi λmaks sedikit di atas n. Seberapa jauh di atas n adalah ukuran ketidakkonsistenan:

- **CI** = (λmaks − n)/(n − 1)
- **CR** = CI / RI, dengan RI rata-rata CI dari matriks yang diisi **acak**

CR membandingkan penilaianmu dengan penilaian acak. CR = 0,1 berarti ketidakkonsistenanmu sepersepuluh ketidakkonsistenan orang yang mengisi sembarangan — batas yang dipakai Saaty.

Matriks di atas: λmaks = 4,0458, CI = 0,0153, **CR = 0,0170**. Konsisten.

**Penilaian yang bertentangan**

Sekarang penilainya mengisi: Harga 3 kali Kualitas, Kualitas 3 kali Jarak — tetapi Jarak 2 kali Harga.

Kalau dua penilaian pertama benar, Harga seharusnya sekitar 9 kali Jarak. Penilaian ketiga bilang setengahnya. Hasilnya: λmaks = 4,9172, **CR = 0,3397** — lebih dari tiga kali batas.

AHP tidak menolak penilaian itu; ia tetap menghasilkan bobot. Tetapi CR membongkarnya, dan program bisa menunjuk sel yang paling bertentangan:

| Pasangan | Menyimpang dari bobotnya sendiri |
|---|---|
| Harga vs Jarak | 3,04 kali |
| Kualitas vs Jarak | 2,61 kali |
| Harga vs Kualitas | 2,27 kali |

Pasangan Harga vs Jarak — yang memang diisi terbalik — ada di urutan teratas. Pasangan itulah yang dikembalikan kepada penilai.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def bobot_eigen(A, ulang=100):\n    n = len(A)\n    w = [1 / n] * n\n    for _ in range(ulang):\n        w2 = [sum(A[i][j] * w[j] for j in range(n)) for i in range(n)]\n        s = sum(w2)\n        w = [x / s for x in w2]          # jumlah bobot = 1\n    return w\n\ndef konsistensi(A, w):\n    n = len(A)\n    Aw = [sum(A[i][j] * w[j] for j in range(n)) for i in range(n)]\n    lam = sum(Aw[i] / w[i] for i in range(n)) / n\n    CI = (lam - n) / (n - 1)\n    return lam, CI, CI / RI[n]",
      penjelasan: `Dua fungsi pendek yang berisi seluruh matematika AHP — dan satu gagasan dari Aljabar Linear yang membuat keduanya masuk akal.

**Kenapa bobot adalah eigenvector.**

Bayangkan bobot sejati w sudah diketahui, dan penilai sempurna. Maka setiap isi matriks tepat aᵢⱼ = wᵢ/wⱼ.

Kalikan matriks itu dengan w. Baris i menjadi jumlah (wᵢ/wⱼ) · wⱼ atas semua j = n · wᵢ. Jadi **A w = n w**: w adalah eigenvector A, dengan eigenvalue n.

AHP membalik logika itu. Diberi matriks penilaian yang tidak sempurna, cari vektor yang **paling mendekati** sifat itu — eigenvector utamanya. Itu definisi bobot AHP.

**Kenapa power iteration.**

Matriks perbandingan AHP semua isinya positif. Untuk matriks seperti itu, eigenvector utamanya dijamin punya semua isi positif, dan power iteration — mengalikan berulang-ulang — dijamin menujunya. Itu power iteration yang sama dengan topik Transformasi Linear & Eigenvector di Aljabar Linear, dan yang sama dengan PageRank.

Menormalkan dengan membagi jumlah — bukan panjang vektor — membuat hasilnya langsung berupa bobot yang berjumlah 1.

**Kenapa λmaks dihitung dengan rata-rata (Aw)ᵢ / wᵢ.**

Kalau w benar-benar eigenvector, (Aw)ᵢ / wᵢ sama untuk setiap i — itulah λ. Merata-ratakan semuanya adalah cara praktis yang juga dipakai di buku-buku: tidak butuh eigenvalue yang dihitung terpisah.

**Kenapa CI dibagi (n − 1).**

Untuk matriks perbandingan berpasangan yang isinya positif dan saling berkebalikan, λmaks tidak pernah lebih kecil dari n, dan tepat n hanya kalau konsisten sempurna. Kelebihannya, λmaks − n, dibagi n − 1 supaya CI kira-kira adalah rata-rata "ketidakcocokan" per eigenvalue lainnya — sehingga ukuran untuk matriks 3 × 3 dan 7 × 7 bisa dibandingkan.

**Dan kenapa dibagi RI.**

Matriks yang lebih besar punya lebih banyak kesempatan untuk tidak konsisten, bahkan kalau diisi dengan niat baik. RI — rata-rata CI dari ribuan matriks acak berukuran sama — menjadi pembandingnya. CR = CI/RI menjawab: dibanding orang yang mengisi sembarangan, seberapa tidak konsisten penilaian ini?`
    },
    {
      bahasa: 'python',
      kode: "for i in range(n):\n    for j in range(i + 1, n):\n        # penilaian dibanding rasio bobot yang dihasilkan\n        simpang = B[i][j] * wb[j] / wb[i]\n        calon.append((max(simpang, 1 / simpang), i, j))\ncalon.sort(reverse=True)\n\n# Harga vs Jarak      menyimpang 3.04x\n# Kualitas vs Jarak   menyimpang 2.61x\n# Harga vs Kualitas   menyimpang 2.27x",
      penjelasan: `CR memberi tahu **bahwa** ada yang tidak konsisten. Lima baris ini memberi tahu **di mana**.

**Gagasannya.**

Setelah bobot w dihitung dari seluruh matriks, setiap pasangan (i, j) punya "rasio yang seharusnya": wᵢ/wⱼ. Kalau penilaian aᵢⱼ konsisten dengan penilaian-penilaian lain, ia dekat dengan rasio itu, dan aᵢⱼ × wⱼ/wᵢ dekat dengan 1.

Penilaian yang bertentangan dengan sisanya akan jauh dari 1 — ke atas atau ke bawah.

**Kenapa max(simpang, 1/simpang).**

Menyimpang 3 kali ke atas dan 3 kali ke bawah sama buruknya. Mengambil yang lebih besar dari simpang dan kebalikannya membuat keduanya menjadi 3, sehingga bisa diurutkan dalam satu daftar.

**Membaca hasilnya.**

Pasangan Harga vs Jarak di urutan teratas — dan memang itu sel yang sengaja diisi terbalik. Dua pasangan berikutnya ikut menyimpang karena bobot yang dihasilkan sudah "ditarik" oleh sel yang salah itu.

Karena itu yang dikembalikan kepada penilai adalah pasangan teratas saja, bukan semuanya. Setelah satu sel itu diperbaiki, hitung ulang — biasanya CR langsung turun di bawah 0,1, dan sel-sel lain tidak lagi menyimpang.

**Satu aturan penting: jangan memperbaiki sendiri.**

Godaan terbesar saat CR terlalu tinggi adalah mengubah angkanya sampai CR lolos. Itu membuat bobotnya bukan lagi penilaian pengambil keputusan, melainkan karangan analis — dan menghapus satu-satunya alasan memakai AHP.

Yang benar: tunjukkan pasangan yang bertentangan kepada penilai, jelaskan kenapa bertentangan ("kalau Harga 3 kali Kualitas dan Kualitas 3 kali Jarak, Harga seharusnya sekitar 9 kali Jarak"), dan biarkan ia memutuskan penilaian mana yang ia maksud.`
    }
  ],

  kode: { python: String.raw`# ============================================
# AHP: bobot dari perbandingan berpasangan
# ============================================
import math

KRITERIA = ["Harga", "Kualitas", "Jarak", "Ketepatan"]
# Indeks Acak (RI) Saaty untuk n = 1..10
RI = {1: 0, 2: 0, 3: 0.58, 4: 0.90, 5: 1.12, 6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49}

def matriks(pasangan, n):
    """Isi matriks perbandingan dari penilaian segitiga atas."""
    A = [[1.0] * n for _ in range(n)]
    for (i, j), nilai in pasangan.items():
        A[i][j] = nilai
        A[j][i] = 1 / nilai
    return A

def bobot_eigen(A, ulang=100):
    """Eigenvector utama lewat power iteration, dinormalkan berjumlah 1."""
    n = len(A)
    w = [1 / n] * n
    for _ in range(ulang):
        w2 = [sum(A[i][j] * w[j] for j in range(n)) for i in range(n)]
        s = sum(w2)
        w = [x / s for x in w2]
    return w

def bobot_kolom(A):
    """Cara hitung tangan: normalkan tiap kolom, lalu rata-ratakan baris."""
    n = len(A)
    jumlah = [sum(A[i][j] for i in range(n)) for j in range(n)]
    return [sum(A[i][j] / jumlah[j] for j in range(n)) / n for i in range(n)]

def konsistensi(A, w):
    n = len(A)
    Aw = [sum(A[i][j] * w[j] for j in range(n)) for i in range(n)]
    lam = sum(Aw[i] / w[i] for i in range(n)) / n
    CI = (lam - n) / (n - 1)
    return lam, CI, CI / RI[n]

def tulis_matriks(A):
    print("  " + " " * 11 + "".join(format(k, ">10") for k in KRITERIA))
    for k, baris in zip(KRITERIA, A):
        teks = []
        for x in baris:
            teks.append(format(x, ".0f") if x >= 1 else "1/" + format(1 / x, ".0f"))
        print("  " + format(k, "<11") + "".join(format(t, ">10") for t in teks))

# --------------------------------------------
# 1. Penilaian yang konsisten
# --------------------------------------------
print("--- perbandingan berpasangan (skala Saaty 1-9) ---")
print("  isi baris i kolom j = seberapa lebih penting i dibanding j")
nilai = {(0, 1): 1, (0, 2): 3, (0, 3): 2,
         (1, 2): 2, (1, 3): 1,
         (2, 3): 1 / 2}
A = matriks(nilai, 4)
tulis_matriks(A)

w = bobot_eigen(A)
wk = bobot_kolom(A)
lam, CI, CR = konsistensi(A, w)
print("\n  kriteria     bobot (eigen)  bobot (rata-rata kolom)")
for k, a, b in zip(KRITERIA, w, wk):
    print("  " + format(k, "<12") + format(a, ">13.4f") + format(b, ">20.4f"))
print("\n  lambda maks = " + format(lam, ".4f") + "   (n = 4; tepat 4 kalau sempurna)")
print("  CI = (lambda - n)/(n - 1) = " + format(CI, ".4f"))
print("  CR = CI / RI(4) = " + format(CI, ".4f") + " / 0.90 = " + format(CR, ".4f")
      + ("  -> KONSISTEN (< 0,1)" if CR < 0.1 else "  -> TIDAK konsisten"))

# --------------------------------------------
# 2. Penilaian yang saling bertentangan
# --------------------------------------------
print("\n--- penilaian yang bertentangan ---")
print("  Harga 3x Kualitas, Kualitas 3x Jarak, tetapi Jarak 2x Harga")
buruk = dict(nilai)
buruk[(0, 1)] = 3
buruk[(1, 2)] = 3
buruk[(0, 2)] = 1 / 2          # Jarak lebih penting dari Harga?!
B = matriks(buruk, 4)
wb = bobot_eigen(B)
lam, CI, CR = konsistensi(B, wb)
print("  lambda maks = " + format(lam, ".4f") + ", CI = " + format(CI, ".4f")
      + ", CR = " + format(CR, ".4f") + ("  -> KONSISTEN" if CR < 0.1 else "  -> TIDAK konsisten"))
print("  Kalau Harga 3x Kualitas dan Kualitas 3x Jarak, maka Harga")
print("  seharusnya sekitar 9x Jarak -- bukan setengahnya. AHP tidak")
print("  menolak penilaian ini, tetapi CR membongkarnya.")

print("\n  mencari sel yang paling bertentangan:")
n = 4
calon = []
for i in range(n):
    for j in range(i + 1, n):
        # rasio penilaian terhadap rasio bobot yang dihasilkan
        simpang = B[i][j] * wb[j] / wb[i]
        calon.append((max(simpang, 1 / simpang), i, j))
calon.sort(reverse=True)
for s, i, j in calon[:3]:
    print("  " + format(KRITERIA[i] + " vs " + KRITERIA[j], "<22") + "menyimpang "
          + format(s, ".2f") + "x dari bobotnya sendiri")

# --------------------------------------------
# 3. Matriks yang dibangun dari bobot: konsisten sempurna
# --------------------------------------------
print("\n--- matriks dari bobot yang sudah ada: a_ij = w_i / w_j ---")
w_topik = [0.35, 0.30, 0.15, 0.20]
C = [[a / b for b in w_topik] for a in w_topik]
wc = bobot_eigen(C)
lam, CI, CR = konsistensi(C, wc)
print("  bobot topik SAW : " + "  ".join(format(x, ".2f") for x in w_topik))
print("  bobot kembali   : " + "  ".join(format(x, ".2f") for x in wc))
print("  lambda maks = " + format(lam, ".4f") + ", CR = " + format(abs(CR), ".4f"))
print("  Penilaian yang sepenuhnya konsisten punya lambda maks tepat n.")

# --------------------------------------------
# 4. Bobot AHP dipakai di SAW
# --------------------------------------------
print("\n--- bobot AHP dipakai untuk memilih pemasok (SAW) ---")
ALT = ["PT Alfa", "PT Beta", "PT Gama", "PT Delta"]
JENIS = ["cost", "benefit", "cost", "benefit"]
X = [[25, 4, 30, 90], [30, 5, 45, 95], [20, 3, 20, 80], [28, 4, 35, 88]]
def saw(bobot):
    kol = list(zip(*X))
    skor = []
    for baris in X:
        r = [min(kol[j]) / baris[j] if JENIS[j] == "cost" else baris[j] / max(kol[j])
             for j in range(4)]
        skor.append(sum(b * x for b, x in zip(bobot, r)))
    return skor
for label, bb in [("bobot topik SAW", w_topik), ("bobot AHP", w)]:
    skor = saw(bb)
    urut = sorted(zip(ALT, skor), key=lambda t: -t[1])
    print("  " + format(label, "<18") + "  ".join(a + " " + format(s, ".4f") for a, s in urut[:2])
          + "  ...")` },
  output: `--- perbandingan berpasangan (skala Saaty 1-9) ---
  isi baris i kolom j = seberapa lebih penting i dibanding j
                  Harga  Kualitas     Jarak Ketepatan
  Harga               1         1         3         2
  Kualitas            1         1         2         1
  Jarak             1/3       1/2         1       1/2
  Ketepatan         1/2         1         2         1

  kriteria     bobot (eigen)  bobot (rata-rata kolom)
  Harga              0.3659              0.3645
  Kualitas           0.2778              0.2777
  Jarak              0.1238              0.1242
  Ketepatan          0.2326              0.2336

  lambda maks = 4.0458   (n = 4; tepat 4 kalau sempurna)
  CI = (lambda - n)/(n - 1) = 0.0153
  CR = CI / RI(4) = 0.0153 / 0.90 = 0.0170  -> KONSISTEN (< 0,1)

--- penilaian yang bertentangan ---
  Harga 3x Kualitas, Kualitas 3x Jarak, tetapi Jarak 2x Harga
  lambda maks = 4.9172, CI = 0.3057, CR = 0.3397  -> TIDAK konsisten
  Kalau Harga 3x Kualitas dan Kualitas 3x Jarak, maka Harga
  seharusnya sekitar 9x Jarak -- bukan setengahnya. AHP tidak
  menolak penilaian ini, tetapi CR membongkarnya.

  mencari sel yang paling bertentangan:
  Harga vs Jarak        menyimpang 3.04x dari bobotnya sendiri
  Kualitas vs Jarak     menyimpang 2.61x dari bobotnya sendiri
  Harga vs Kualitas     menyimpang 2.27x dari bobotnya sendiri

--- matriks dari bobot yang sudah ada: a_ij = w_i / w_j ---
  bobot topik SAW : 0.35  0.30  0.15  0.20
  bobot kembali   : 0.35  0.30  0.15  0.20
  lambda maks = 4.0000, CR = 0.0000
  Penilaian yang sepenuhnya konsisten punya lambda maks tepat n.

--- bobot AHP dipakai untuk memilih pemasok (SAW) ---
  bobot topik SAW   PT Gama 0.8484  PT Alfa 0.8095  ...
  bobot AHP         PT Gama 0.8522  PT Alfa 0.8178  ...`,

  kompleksitas: {
    tabel: [
      { operasi: 'Banyaknya pertanyaan untuk n kriteria', waktu: 'n(n − 1)/2', memori: '6 untuk 4 kriteria, 45 untuk 10' },
      { operasi: 'Bobot dengan rata-rata kolom', waktu: 'O(n²)', memori: 'O(n²)' },
      { operasi: 'Bobot dengan power iteration, t putaran', waktu: 'O(t · n²)', memori: 'O(n²)' },
      { operasi: 'λmaks, CI, CR', waktu: 'O(n²)', memori: 'O(n)' },
      { operasi: 'Mencari pasangan paling bertentangan', waktu: 'O(n² log n)', memori: 'O(n²)' }
    ],
    intuisi: `Komputasinya sepele untuk ukuran matriks yang wajar. Yang mahal adalah **manusianya**: banyaknya pertanyaan tumbuh kuadratik. Empat kriteria butuh 6 perbandingan; sepuluh kriteria butuh 45 — dan penilai yang lelah menjawab 45 pertanyaan cenderung tidak konsisten di pertanyaan-pertanyaan terakhir.

Karena itu Saaty menyarankan tidak lebih dari sekitar 7 elemen per matriks. Kalau kriterianya banyak, susun **hierarki**: kelompokkan kriteria menjadi beberapa aspek, bandingkan aspek-aspeknya, lalu bandingkan kriteria di dalam setiap aspek. Bobot akhir adalah hasil kali bobot di sepanjang hierarki — itulah huruf H di AHP.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengisi segitiga bawah matriks dengan angka yang sama seperti segitiga atas.',
      kenapa: 'Kalau Harga 3 kali lebih penting dari Jarak, maka Jarak sepertiga pentingnya Harga, bukan 3 kali. Mengisi keduanya 3 membuat matriks tidak berkebalikan dan bobotnya salah.',
      benar: 'Isi aⱼᵢ = 1/aᵢⱼ untuk setiap pasangan, dan diagonal dengan 1.'
    },
    {
      salah: 'Tidak menghitung CR, atau menghitungnya tanpa melaporkannya.',
      kenapa: 'Tanpa CR, pembaca tidak bisa tahu apakah bobotnya berasal dari penilaian yang masuk akal atau dari penilaian yang saling bertentangan.',
      benar: 'Hitung dan laporkan λmaks, CI, dan CR bersama bobotnya.'
    },
    {
      salah: 'Mengubah isi matriks sendiri sampai CR di bawah 0,1.',
      kenapa: 'Bobotnya tidak lagi mencerminkan penilaian pengambil keputusan, sehingga seluruh alasan memakai AHP hilang.',
      benar: 'Tunjukkan pasangan yang paling bertentangan kepada penilai dan minta ia meninjau ulang penilaiannya.'
    },
    {
      salah: 'Memakai RI yang salah untuk ukuran matriksnya.',
      kenapa: 'RI bergantung pada n. Memakai RI untuk n = 3 (0,58) pada matriks 4 × 4 (seharusnya 0,90) membuat CR terlihat jauh lebih buruk dari sebenarnya.',
      benar: 'Pakai tabel RI Saaty sesuai ukuran matriks, dan ingat bahwa matriks 1 × 1 dan 2 × 2 selalu konsisten.'
    },
    {
      salah: 'Membandingkan terlalu banyak kriteria dalam satu matriks.',
      kenapa: 'Banyaknya pertanyaan tumbuh kuadratik, dan penilai yang lelah makin tidak konsisten. Sepuluh kriteria berarti 45 perbandingan.',
      benar: 'Susun hierarki dengan paling banyak sekitar 7 elemen per matriks.'
    },
    {
      salah: 'Menganggap AHP membuat keputusan menjadi objektif.',
      kenapa: 'AHP menyusun penilaian subjektif secara teratur dan memeriksa konsistensinya, tetapi bobotnya tetap berasal dari pendapat manusia.',
      benar: 'Sebut AHP sebagai cara menurunkan bobot dari penilaian secara terdokumentasi, dan tetap lakukan analisis sensitivitas.'
    }
  ],

  analogi: `Bayangkan kamu diminta memberi **nilai berat** pada empat buah — semangka, nanas, apel, dan anggur — **tanpa timbangan**.

Menebak angka mutlak sulit. "Semangka 4 kilo? 5? Apel 150 gram?" Kamu tidak yakin sama sekali.

Tetapi kalau kamu memegang dua buah sekaligus, satu di tangan kiri dan satu di tangan kanan, kamu bisa bilang dengan cukup yakin: "yang kiri kira-kira tiga kali lebih berat". Itulah perbandingan berpasangan.

**Menyusun bobot.** Kamu memegang setiap pasangan — semangka-nanas, semangka-apel, nanas-apel, dan seterusnya — dan mencatat perbandingannya. Dari catatan itu, bobot relatif keempat buah bisa dihitung, meskipun kamu tidak pernah menimbang satu pun.

**Konsistensi.** Kamu mencatat: semangka 3 kali nanas. Nanas 3 kali apel. Lalu, entah karena lelah atau salah pegang: apel 2 kali semangka.

Tidak mungkin. Kalau semangka 3 kali nanas dan nanas 3 kali apel, semangka seharusnya sekitar 9 kali apel. Catatanmu bertentangan dengan dirinya sendiri — dan tidak ada timbangan yang dibutuhkan untuk mengetahuinya. Cukup memeriksa apakah catatan-catatanmu saling cocok.

Itulah CR. Ia tidak tahu berat sebenarnya buah-buahan itu, tetapi ia tahu kapan catatanmu tidak mungkin semuanya benar.

**Memperbaiki.** Yang kamu lakukan bukan mengubah angkanya di kertas sampai terlihat cocok. Kamu memegang lagi apel dan semangka — pasangan yang paling mencurigakan — dan memeriksa ulang.`,

  latihan: [
    'Susun matriks perbandingan berpasangan untuk tiga kriteria memilih laptop (harga, performa, baterai) menurut pendapatmu sendiri.',
    'Hitung bobot matriks latihan nomor 1 dengan rata-rata kolom secara manual, lalu dengan power iteration.',
    'Hitung λmaks, CI, dan CR matriks latihan nomor 1 dengan RI(3) = 0,58.',
    'Buat matriks 3 × 3 yang sengaja tidak konsisten, lalu tunjukkan CR-nya di atas 0,1.',
    'Bangun matriks dari bobot 0,5, 0,3, 0,2 dengan aᵢⱼ = wᵢ/wⱼ, lalu tunjukkan bahwa λmaks tepat 3.',
    'Pakai fungsi pencari pasangan paling bertentangan pada matriks latihan nomor 4, lalu perbaiki satu sel dan hitung ulang CR.',
    'Hitung skor SAW pemasok dengan bobot AHP dari topik ini, dan bandingkan urutannya dengan bobot topik SAW.',
    'Hitung berapa perbandingan yang dibutuhkan untuk 12 kriteria dalam satu matriks, lalu rancang hierarki tiga aspek yang mengurangi jumlah itu.',
    'Jelaskan dengan kata-katamu sendiri kenapa bobot AHP adalah eigenvector matriks perbandingannya.',
    'Jelaskan kenapa mengubah isi matriks sendiri sampai CR di bawah 0,1 merusak tujuan AHP.'
  ]
});


TOPICS.push({
  id: 'spk-profile-matching',
  judul: 'Profile Matching — Kecocokan dengan Profil Ideal',
  kategori: 'spk',
  tag: ['Profile Matching', 'GAP', 'core factor', 'secondary factor', 'profil ideal', 'seleksi'],
  ringkas: 'Bukan mencari yang paling tinggi, melainkan yang paling pas — dan kenapa kandidat yang unggul di semua bidang bisa kalah.',

  fungsi: `**Mengurutkan kandidat berdasarkan seberapa dekat mereka dengan satu profil ideal yang ditetapkan lebih dulu.**

SAW, WP, TOPSIS, dan AHP semuanya bertanya "siapa yang terbaik?". Profile Matching bertanya hal yang berbeda: **"siapa yang paling cocok?"**

Terpakai di:

- **Seleksi dan penempatan pegawai** — setiap jabatan punya profil kompetensi yang dibutuhkan
- **Seleksi asisten, pengurus organisasi, atau peserta program** — terutama bila ada gambaran jelas tentang orang yang dicari
- **Tugas akhir SPK** — Profile Matching sering dipakai sendiri atau digabung dengan AHP untuk bobot aspeknya

Yang paling penting dipahami — dan paling sering tidak disadari pemakainya: **kelebihan di atas target dihukum.** Nilai yang melampaui profil ideal mendapat bobot lebih rendah daripada nilai yang pas. Itu disengaja, dan cocok untuk sebagian keputusan — tetapi keliru untuk kriteria yang memang makin tinggi makin baik.`,

  praktik: {
    tujuan: 'Kamu bisa menyusun profil ideal, menghitung GAP dan bobotnya, memisahkan faktor inti dan pendukung, menghitung nilai akhir per kandidat, dan menilai apakah Profile Matching memang metode yang tepat untuk keputusanmu.',
    alat: ['Python 3', 'Daftar kompetensi dan target yang disepakati dengan pengambil keputusan'],
    langkah: [
      { judul: 'Tentukan aspek dan faktornya',
        isi: `Kelompokkan faktor penilaian ke dalam aspek. Contoh seleksi asisten praktikum: aspek Teknis (nilai mata kuliah, tes koding, pengalaman) dan aspek Sikap (komunikasi, kedisiplinan).` },
      { judul: 'Tetapkan target setiap faktor',
        isi: `Pada skala yang sama dengan penilaian — misalnya 1 sampai 5 — tentukan nilai yang **dibutuhkan**, bukan yang tertinggi. Asisten praktikum butuh nilai mata kuliah 4, bukan harus 5.

Target inilah inti metodenya. Target yang asal 5 semua membuat Profile Matching sama dengan "cari yang tertinggi" dengan cara yang lebih rumit.` },
      { judul: 'Tandai faktor inti dan pendukung',
        isi: `Faktor inti (core factor) adalah yang paling dibutuhkan jabatan itu; faktor pendukung (secondary factor) melengkapinya. Porsi yang lazim: inti 60 persen, pendukung 40 persen.` },
      { judul: 'Hitung GAP dan ubah menjadi bobot',
        isi: `GAP = nilai − target. Ubah dengan tabel bobot GAP:

- 0 → 5
- +1 → 4,5 dan −1 → 4
- +2 → 3,5 dan −2 → 3
- +3 → 2,5 dan −3 → 2
- +4 → 1,5 dan −4 → 1

Kekurangan dihukum sedikit lebih berat daripada kelebihan yang sama besar.` },
      { judul: 'Hitung nilai per aspek',
        isi: `NCF = rata-rata bobot GAP faktor inti. NSF = rata-rata bobot GAP faktor pendukung. Nilai aspek = 0,6 × NCF + 0,4 × NSF.` },
      { judul: 'Gabungkan aspek dan urutkan',
        isi: `Nilai akhir = jumlah bobot aspek × nilai aspek — misalnya 0,6 untuk Teknis dan 0,4 untuk Sikap. Bobot aspek bisa ditetapkan langsung atau dihitung dengan AHP.` },
      { judul: 'Uji dengan pertanyaan kuncinya',
        isi: `Tanyakan kepada pengambil keputusan: "kalau ada kandidat yang melampaui target di semua faktor teknis, apakah ia seharusnya kalah dari kandidat yang pas?"

Kalau jawabannya tidak, Profile Matching bukan metode yang tepat — atau tabel bobot GAP-nya harus diubah supaya kelebihan tidak dihukum.` }
    ],
    cek: [
      'Setiap faktor punya target yang disepakati, dan tidak semuanya bernilai maksimum',
      'Kamu bisa menghitung NCF, NSF, nilai aspek, dan nilai akhir satu kandidat dengan tangan',
      'Kamu bisa menjelaskan kenapa kandidat yang unggul di semua bidang teknis bisa kalah',
      'Kamu sudah menanyakan kepada pengambil keputusan apakah kelebihan di atas target memang harus dihukum'
    ]
  },

  judulLogicSyntax: 'Bedah Rumus — kenapa kelebihan juga mengurangi nilai',

  konsep: `Semua metode di topik-topik sebelumnya menganggap setiap kriteria punya arah: benefit makin besar makin baik, cost makin kecil makin baik. **Profile Matching** membuang anggapan itu. Setiap kriteria punya **target**, dan yang terbaik adalah yang paling dekat dengan target — dari arah mana pun.

**Kasus: seleksi asisten praktikum**

| Aspek | Faktor | Target | Jenis |
|---|---|---|---|
| Teknis (0,6) | Nilai mata kuliah | 4 | inti |
| | Tes koding | 4 | inti |
| | Pengalaman | 3 | pendukung |
| Sikap (0,4) | Komunikasi | 4 | inti |
| | Kedisiplinan | 3 | pendukung |

Lima kandidat dinilai 1 sampai 5 di setiap faktor.

**GAP dan bobotnya**

GAP = nilai − target. GAP 0 — tepat seperti profil — mendapat bobot tertinggi, 5. Makin jauh dari 0, makin kecil bobotnya, **ke arah mana pun**. Kekurangan dihukum sedikit lebih berat: GAP −1 mendapat 4, GAP +1 mendapat 4,5.

Rincian Kandidat B:

| Faktor | Nilai | Target | GAP | Bobot |
|---|---|---|---|---|
| Nilai mata kuliah | 5 | 4 | +1 | 4,5 |
| Tes koding | 5 | 4 | +1 | 4,5 |
| Pengalaman | 5 | 3 | +2 | 3,5 |
| Komunikasi | 3 | 4 | −1 | 4 |
| Kedisiplinan | 3 | 3 | 0 | 5 |

Aspek Teknis: NCF = rata-rata faktor inti = 4,50; NSF = 3,50; nilai aspek = 0,6 × 4,50 + 0,4 × 3,50 = **4,10**. Aspek Sikap: NCF 4,00, NSF 5,00, nilai aspek **4,40**.

**Peringkat**

| Kandidat | Nilai akhir | Matkul | Koding | Pengalaman | Komunikasi | Disiplin |
|---|---|---|---|---|---|---|
| A | **5,000** | 4 | 4 | 3 | 4 | 3 |
| E | 4,790 | 5 | 4 | 4 | 4 | 3 |
| C | 4,740 | 4 | 3 | 3 | 4 | 4 |
| D | 4,460 | 3 | 4 | 2 | 5 | 3 |
| B | 4,220 | 5 | 5 | 5 | 3 | 3 |

Kandidat A tepat seperti profil di setiap faktor, dan mendapat nilai sempurna 5.

Kandidat B — tiga nilai 5, yang tertinggi di seluruh aspek teknis — berada di urutan **terakhir**. Setiap kelebihannya mengurangi bobot, dan komunikasinya kurang satu dari target.

**Apakah itu benar?**

Tergantung pada keputusannya.

Untuk asisten praktikum, ada alasan yang masuk akal: asisten yang jauh di atas mahasiswa kadang sulit menjelaskan hal dasar, kurang sabar, atau cepat bosan. Profil ideal yang "cukup mahir, komunikatif" bisa memang lebih baik daripada "paling mahir".

Tetapi kalau yang dipilih adalah programmer untuk proyek yang sulit, menghukum kemampuan teknis yang tinggi jelas keliru.

**Menguji anggapan itu**

Program mengubah tabel GAP: semua GAP positif diberi bobot penuh 5 — kelebihan tidak dihukum.

| Kandidat | Nilai akhir |
|---|---|
| A | 5,000 |
| E | 5,000 |
| C | 4,820 |
| B | 4,760 |
| D | 4,580 |

Urutannya berubah: E sekarang seri dengan A, dan B naik melewati D. B tetap tidak di puncak, karena komunikasinya memang di bawah target — kekurangan tetap dihukum.

**Profile Matching mengukur kecocokan, bukan keunggulan.** Sebelum memakainya, pastikan pengambil keputusan memang mencari "yang paling pas", bukan "yang paling baik" — dan kalau yang kedua, pakai SAW, WP, atau TOPSIS.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "BOBOT_GAP = {0: 5, 1: 4.5, -1: 4, 2: 3.5, -2: 3,\n             3: 2.5, -3: 2, 4: 1.5, -4: 1}\n\nfor faktor, target, jenis in aspek['faktor']:\n    gap = nilai[i] - target\n    b = BOBOT_GAP[gap]\n    (inti if jenis == 'inti' else dukung).append(b)\n    i += 1\nncf = sum(inti) / len(inti)\nnsf = sum(dukung) / len(dukung)\nnilai_aspek = 0.6 * ncf + 0.4 * nsf\ntotal += aspek['bobot'] * nilai_aspek",
      penjelasan: `Tabel sembilan isi dan empat baris hitungan — dan hampir seluruh sifat metode ini ditentukan oleh tabel itu.

**Membaca tabelnya.**

Di sisi kekurangan, bobot turun 1 untuk setiap poin GAP: 5, 4, 3, 2, 1. Di sisi kelebihan: 5, 4,5, 3,5, 2,5, 1,5 — selalu setengah poin di atas kekurangan yang sama besar. Hasilnya berbentuk puncak di GAP 0, dengan lereng yang sedikit lebih landai di sisi kelebihan.

Tabel ini adalah konvensi yang lazim di literatur SPK berbahasa Indonesia, bukan hukum alam. Setiap angkanya adalah keputusan tentang seberapa buruk melenceng dari profil. Tabel yang berbeda memberi keputusan yang berbeda — program menunjukkan urutannya berubah begitu GAP positif diberi bobot 5.

**Kenapa GAP dipakai sebagai kunci kamus.**

Nilai dan target sama-sama bilangan bulat 1–5, jadi GAP selalu bilangan bulat antara −4 dan +4. Kamus memetakan setiap kemungkinan langsung ke bobotnya.

Konsekuensinya: kalau skalanya diubah menjadi 1–10, GAP bisa mencapai ±9, dan kamus ini akan melempar \`KeyError\`. Tabel GAP harus disusun ulang untuk skala yang berbeda — bukan sekadar ditambah beberapa isi.

**Kenapa inti dan pendukung dirata-rata terpisah.**

Kalau semua faktor dirata-rata bersama, faktor pendukung yang banyak bisa menenggelamkan faktor inti yang sedikit. Memisahkan keduanya lalu memberi porsi tetap — 60 : 40 — menjamin faktor inti selalu menentukan lebih dari separuh nilai aspek, berapa pun jumlah faktor di masing-masing kelompok.

**Kenapa dirata-rata, bukan dijumlah.**

Aspek Teknis punya dua faktor inti, aspek Sikap satu. Menjumlahkan akan memberi aspek dengan lebih banyak faktor nilai yang lebih besar secara otomatis. Rata-rata membuat setiap aspek bernilai dalam rentang yang sama, 1 sampai 5, sehingga bobot aspek — 0,6 dan 0,4 — benar-benar menentukan porsinya.

**Nilai akhir tertinggi selalu 5.**

Kandidat yang tepat seperti profil di semua faktor mendapat 5 di setiap bobot GAP, jadi setiap rata-rata dan setiap jumlah terbobot juga 5. Ini memberi skala yang mudah dibaca: nilai akhir 5 berarti "persis seperti yang dicari", dan setiap penurunan dari 5 adalah ukuran jarak dari profil ideal.`
    },
    {
      bahasa: 'python',
      kode: "BOBOT_ASLI = dict(BOBOT_GAP)\nfor g in [1, 2, 3, 4]:\n    BOBOT_GAP[g] = 5        # kelebihan tidak dihukum\nhasil2 = sorted(((hitung(v)[0], k) for k, v in KANDIDAT.items()),\n                key=lambda t: (-t[0], t[1]))\nBOBOT_GAP.clear()\nBOBOT_GAP.update(BOBOT_ASLI)  # kembalikan\n\n# asli     : A 5.000  E 4.790  C 4.740  D 4.460  B 4.220\n# diubah   : A 5.000  E 5.000  C 4.820  B 4.760  D 4.580",
      penjelasan: `Empat baris yang menguji anggapan terdalam metode ini — dan pola yang berguna untuk menguji anggapan metode SPK apa pun.

**Apa yang diuji.**

Satu-satunya perubahan: GAP +1 sampai +4 semuanya mendapat bobot 5, sama seperti GAP 0. Kelebihan di atas target tidak lagi dihukum; kekurangan tetap.

Dengan tabel itu, Profile Matching berubah menjadi metode yang hanya peduli apakah target **tercapai** — "minimal 4" — bukan apakah **tepat**.

**Apa yang berubah.**

Kandidat E, yang melampaui target di dua faktor teknis, naik dari 4,790 menjadi 5,000 dan seri dengan A. Kandidat B naik dari terakhir ke keempat. Kandidat D, yang kekurangan di dua faktor teknis, turun ke terakhir.

Dua anggapan, dua urutan. Keduanya "benar" menurut rumusnya masing-masing. Yang menentukan mana yang dipakai bukan matematika, melainkan jawaban pengambil keputusan atas satu pertanyaan: apakah melampaui target itu buruk?

**Kenapa tabelnya disalin dulu, lalu dikembalikan.**

\`BOBOT_GAP\` adalah variabel global yang dipakai fungsi \`hitung\`. Mengubahnya untuk percobaan tanpa mengembalikannya membuat setiap perhitungan sesudahnya diam-diam memakai tabel yang salah.

Pola "simpan, ubah, hitung, kembalikan" — atau lebih baik lagi, mengirim tabel sebagai parameter — adalah kebiasaan yang penting setiap kali melakukan analisis sensitivitas: percobaan tidak boleh mencemari perhitungan utama.

**Pelajaran yang lebih luas.**

Setiap metode SPK membawa anggapan: SAW menganggap kelemahan bisa ditutup kelebihan, WP tidak; TOPSIS menganggap jarak ke titik ideal yang penting; Profile Matching menganggap ada satu profil yang paling pas. Menguji anggapan itu dengan data sungguhan — mengubahnya dan melihat apakah keputusannya berubah — adalah cara paling jujur untuk menunjukkan seberapa besar keputusan akhir bergantung pada pilihan metode.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Profile Matching: seberapa dekat dengan profil ideal
# ============================================

# Tabel bobot GAP yang lazim dipakai (GAP = nilai - target)
BOBOT_GAP = {0: 5, 1: 4.5, -1: 4, 2: 3.5, -2: 3, 3: 2.5, -3: 2, 4: 1.5, -4: 1}

# Seleksi asisten praktikum. Nilai 1-5 dari tes dan wawancara.
ASPEK = {
    "Teknis": {
        "bobot": 0.6,
        "faktor": [("Nilai matkul", 4, "inti"), ("Tes koding", 4, "inti"),
                   ("Pengalaman", 3, "pendukung")],
    },
    "Sikap": {
        "bobot": 0.4,
        "faktor": [("Komunikasi", 4, "inti"), ("Kedisiplinan", 3, "pendukung")],
    },
}
PORSI_INTI = 0.6          # faktor inti 60%, pendukung 40%

KANDIDAT = {   #        matkul koding pengalaman  komunikasi disiplin
    "Kandidat A": [4, 4, 3, 4, 3],
    "Kandidat B": [5, 5, 5, 3, 3],
    "Kandidat C": [4, 3, 3, 4, 4],
    "Kandidat D": [3, 4, 2, 5, 3],
    "Kandidat E": [5, 4, 4, 4, 3],
}

def hitung(nilai, cetak=False):
    total, i = 0, 0
    rincian = []
    for nama_aspek, aspek in ASPEK.items():
        inti, dukung = [], []
        for faktor, target, jenis in aspek["faktor"]:
            gap = nilai[i] - target
            b = BOBOT_GAP[gap]
            (inti if jenis == "inti" else dukung).append(b)
            rincian.append((faktor, nilai[i], target, gap, b))
            i += 1
        ncf = sum(inti) / len(inti)
        nsf = sum(dukung) / len(dukung)
        nilai_aspek = PORSI_INTI * ncf + (1 - PORSI_INTI) * nsf
        total += aspek["bobot"] * nilai_aspek
        rincian.append(("  -> " + nama_aspek, ncf, nsf, None, nilai_aspek))
    return total, rincian

print("--- profil ideal asisten praktikum ---")
for nama_aspek, aspek in ASPEK.items():
    print("  " + nama_aspek + " (bobot aspek " + str(aspek["bobot"]) + ")")
    for f, t, j in aspek["faktor"]:
        print("    " + format(f, "<14") + "target " + str(t) + "   faktor " + j)

print("\n--- rincian Kandidat B ---")
print("  faktor          nilai  target   GAP  bobot GAP")
_, rinci = hitung(KANDIDAT["Kandidat B"])
for f, a, b, gap, bb in rinci:
    if gap is None:
        print("  " + format(f, "<16") + "NCF " + format(a, ".2f") + ", NSF " + format(b, ".2f")
              + " -> 0.6 NCF + 0.4 NSF = " + format(bb, ".2f"))
    else:
        print("  " + format(f, "<16") + format(a, ">5") + format(b, ">8") + format(gap, ">+6")
              + format(bb, ">11"))

print("\n--- peringkat ---")
hasil = sorted(((hitung(v)[0], k) for k, v in KANDIDAT.items()), key=lambda t: (-t[0], t[1]))
print("  " + format("kandidat", "<12") + format("nilai", ">7") + "      "
      + "".join(format(h, ">7") for h in ["matkul", "koding", "pglmn", "komun", "disip"]))
for skor, k in hasil:
    print("  " + format(k, "<12") + format(skor, "7.3f") + "      "
          + "".join(format(x, ">7") for x in KANDIDAT[k]))
print()
print("  Kandidat A pas dengan profil di SETIAP faktor dan menang.")
print("  Kandidat B paling unggul secara teknis -- tiga nilai 5 --")
print("  tetapi setiap kelebihan di atas target MENGURANGI bobotnya")
print("  (GAP +1 = 4,5, bukan 5), dan komunikasinya kurang satu.")

# --------------------------------------------
# Pertanyaan yang harus dijawab sebelum memakai metode ini
# --------------------------------------------
print("\n--- kalau 'lebih tinggi selalu lebih baik' ---")
BOBOT_ASLI = dict(BOBOT_GAP)
for g in [1, 2, 3, 4]:
    BOBOT_GAP[g] = 5                     # kelebihan tidak dihukum
hasil2 = sorted(((hitung(v)[0], k) for k, v in KANDIDAT.items()), key=lambda t: (-t[0], t[1]))
print("  GAP positif diberi bobot penuh 5:")
for skor, k in hasil2:
    print("  " + format(k, "<12") + format(skor, "7.3f"))
BOBOT_GAP.clear()
BOBOT_GAP.update(BOBOT_ASLI)
print()
print("  Urutannya berubah. Profile Matching mengukur KECOCOKAN, bukan")
print("  KEUNGGULAN. Cocok untuk jabatan yang punya profil ideal --")
print("  asisten yang terlalu jauh di atas mahasiswa mungkin sulit")
print("  menjelaskan hal dasar -- tetapi keliru untuk kriteria yang")
print("  memang makin tinggi makin baik.")` },
  output: `--- profil ideal asisten praktikum ---
  Teknis (bobot aspek 0.6)
    Nilai matkul  target 4   faktor inti
    Tes koding    target 4   faktor inti
    Pengalaman    target 3   faktor pendukung
  Sikap (bobot aspek 0.4)
    Komunikasi    target 4   faktor inti
    Kedisiplinan  target 3   faktor pendukung

--- rincian Kandidat B ---
  faktor          nilai  target   GAP  bobot GAP
  Nilai matkul        5       4    +1        4.5
  Tes koding          5       4    +1        4.5
  Pengalaman          5       3    +2        3.5
    -> Teknis     NCF 4.50, NSF 3.50 -> 0.6 NCF + 0.4 NSF = 4.10
  Komunikasi          3       4    -1          4
  Kedisiplinan        3       3    +0          5
    -> Sikap      NCF 4.00, NSF 5.00 -> 0.6 NCF + 0.4 NSF = 4.40

--- peringkat ---
  kandidat      nilai       matkul koding  pglmn  komun  disip
  Kandidat A    5.000            4      4      3      4      3
  Kandidat E    4.790            5      4      4      4      3
  Kandidat C    4.740            4      3      3      4      4
  Kandidat D    4.460            3      4      2      5      3
  Kandidat B    4.220            5      5      5      3      3

  Kandidat A pas dengan profil di SETIAP faktor dan menang.
  Kandidat B paling unggul secara teknis -- tiga nilai 5 --
  tetapi setiap kelebihan di atas target MENGURANGI bobotnya
  (GAP +1 = 4,5, bukan 5), dan komunikasinya kurang satu.

--- kalau 'lebih tinggi selalu lebih baik' ---
  GAP positif diberi bobot penuh 5:
  Kandidat A    5.000
  Kandidat E    5.000
  Kandidat C    4.820
  Kandidat B    4.760
  Kandidat D    4.580

  Urutannya berubah. Profile Matching mengukur KECOCOKAN, bukan
  KEUNGGULAN. Cocok untuk jabatan yang punya profil ideal --
  asisten yang terlalu jauh di atas mahasiswa mungkin sulit
  menjelaskan hal dasar -- tetapi keliru untuk kriteria yang
  memang makin tinggi makin baik.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Menghitung satu kandidat dengan f faktor', waktu: 'O(f)', memori: 'O(f)' },
      { operasi: 'Mengurutkan k kandidat', waktu: 'O(k · f + k log k)', memori: 'O(k)' },
      { operasi: 'Mengubah tabel GAP dan menghitung ulang', waktu: 'O(k · f)', memori: 'O(1) tambahan' }
    ],
    intuisi: `Profile Matching adalah salah satu metode SPK paling ringan: setiap faktor cuma satu pengurangan dan satu pencarian di tabel. Ribuan pelamar dengan puluhan faktor tetap dihitung seketika.

Seperti metode MADM lainnya, biaya sebenarnya bukan di komputasi, melainkan di **menyusun profil ideal**. Target setiap faktor harus disepakati dengan orang yang memahami jabatannya, dan target yang dipilih asal-asalan memberi peringkat yang asal-asalan pula — secepat apa pun dihitung.`
  },

  kesalahanUmum: [
    {
      salah: 'Menetapkan semua target pada nilai maksimum.',
      kenapa: 'Kalau target selalu 5, GAP tidak pernah positif, dan metode ini cuma menjadi cara rumit mencari nilai tertinggi. Keunggulan Profile Matching — mengukur kecocokan — hilang.',
      benar: 'Tetapkan target sesuai kebutuhan jabatan, yang sering di bawah nilai maksimum.'
    },
    {
      salah: 'Memakai Profile Matching untuk kriteria yang makin tinggi makin baik.',
      kenapa: 'Kelebihan di atas target mendapat bobot lebih rendah, sehingga kandidat yang paling unggul bisa kalah. Pada contoh ini, kandidat dengan tiga nilai teknis 5 berada di urutan terakhir.',
      benar: 'Pakai SAW, WP, atau TOPSIS untuk kriteria benefit murni, atau ubah tabel GAP supaya kelebihan tidak dihukum.'
    },
    {
      salah: 'Memakai tabel GAP untuk skala 1–5 pada penilaian dengan skala berbeda.',
      kenapa: 'Skala 1–10 menghasilkan GAP sampai ±9 yang tidak ada di tabel, sehingga program gagal atau bobotnya tidak masuk akal.',
      benar: 'Susun tabel bobot GAP sesuai rentang GAP yang mungkin di skala yang dipakai.'
    },
    {
      salah: 'Merata-ratakan semua faktor bersama tanpa memisahkan inti dan pendukung.',
      kenapa: 'Faktor pendukung yang banyak bisa menenggelamkan faktor inti yang sedikit, padahal faktor inti yang paling menentukan kecocokan.',
      benar: 'Hitung NCF dan NSF terpisah, lalu gabungkan dengan porsi tetap seperti 60 : 40.'
    },
    {
      salah: 'Mengubah tabel GAP untuk percobaan tanpa mengembalikannya.',
      kenapa: 'Perhitungan sesudahnya diam-diam memakai tabel yang sudah diubah, sehingga hasil utama tercemar oleh percobaan.',
      benar: 'Simpan salinan tabel sebelum mengubahnya dan kembalikan sesudahnya, atau kirim tabel sebagai parameter fungsi.'
    }
  ],

  analogi: `Bayangkan kamu mencari **sepatu** untuk dirimu sendiri.

Ukuran kakimu 42. Toko punya sepatu ukuran 40 sampai 46.

Metode SAW akan bertanya: "mana yang paling besar?" — dan memberimu ukuran 46. Jelas keliru. Ukuran sepatu bukan benefit dan bukan cost; ukuran terbaik adalah **yang pas**.

Itulah Profile Matching. Targetmu 42. Sepatu 42 mendapat nilai sempurna. Sepatu 43 masih bisa dipakai dengan kaus kaki tebal — nilainya sedikit turun. Sepatu 41 lebih menyiksa daripada 43 — kekurangan dihukum sedikit lebih berat daripada kelebihan. Sepatu 46 hampir tidak bisa dipakai, meskipun "paling besar".

**Faktor inti dan pendukung.** Ukuran adalah faktor inti — sepatu yang tidak pas tidak ada gunanya, secantik apa pun. Warna adalah faktor pendukung — penting, tetapi tidak menentukan. Karena itu ukuran mendapat porsi lebih besar.

**Pertanyaan kuncinya.** Sekarang bayangkan kamu memilih **daya tahan baterai** ponsel. Targetmu "seharian". Ponsel yang tahan dua hari — melampaui target — apakah lebih buruk? Tentu tidak. Untuk baterai, lebih lama selalu lebih baik, dan Profile Matching akan memberi jawaban yang salah.

Sebelum memakai metode ini, tanyakan: apakah yang kucari lebih mirip ukuran sepatu, atau lebih mirip daya tahan baterai?`,

  latihan: [
    'Hitung nilai akhir Kandidat E dengan tangan, lengkap dengan GAP, bobot GAP, NCF, NSF, dan nilai aspek.',
    'Ubah target Tes koding menjadi 5, lalu hitung ulang peringkat dan jelaskan perubahannya.',
    'Ubah porsi inti dan pendukung menjadi 70 : 30, lalu periksa apakah peringkatnya berubah.',
    'Tambahkan kandidat keenam yang lebih rendah satu poin dari target di semua faktor, lalu hitung nilainya.',
    'Susun tabel bobot GAP untuk skala penilaian 1–10 dengan pola yang sama.',
    'Rancang profil ideal untuk memilih ketua panitia acara kampus: aspek, faktor, target, dan jenisnya.',
    'Beri contoh keputusan yang cocok untuk Profile Matching dan contoh yang tidak cocok, masing-masing dengan alasan.',
    'Hitung bobot aspek Teknis dan Sikap dengan AHP dari satu perbandingan berpasangan pilihanmu, lalu pakai di Profile Matching.',
    'Jelaskan kenapa nilai akhir tertinggi yang mungkin dalam Profile Matching selalu 5.',
    'Bandingkan peringkat lima kandidat dengan Profile Matching dan dengan SAW yang menganggap semua faktor benefit.'
  ]
});


TOPICS.push({
  id: 'spk-sensitivitas',
  judul: 'Analisis Sensitivitas & Rank Reversal',
  kategori: 'spk',
  tag: ['analisis sensitivitas', 'bobot kritis', 'rank reversal', 'kekokohan', 'perbandingan metode', 'TOPSIS'],
  ringkas: 'Seberapa jauh bobot harus bergeser sebelum pemenangnya berganti — dan bagaimana menambah pilihan yang pasti kalah bisa membalik urutan pemenang.',

  fungsi: `**Menguji apakah hasil sebuah SPK kokoh: apakah pemenangnya bertahan kalau bobot sedikit berubah, dan kalau daftar alternatifnya berubah.**

Terpakai di:

- **Bab pembahasan tugas akhir** — analisis sensitivitas adalah pembeda antara laporan yang cuma menghitung dan laporan yang memahami hasilnya
- **Menjawab pertanyaan penguji** — "bagaimana kalau bobot harganya 0,3, bukan 0,35?"
- **Memilih metode** — metode yang pemenangnya berganti karena perubahan kecil tidak cocok untuk keputusan yang harus bisa dipertanggungjawabkan
- **Meninjau sistem SPK yang sudah berjalan** — menambah pemasok atau pelamar baru bisa diam-diam mengubah urutan yang lama

Yang paling sering mengejutkan: **pemenang TOPSIS di kasus pemasok ini berganti kalau bobot Kualitas naik kurang dari 0,01.** Hasil yang dihitung dengan empat angka di belakang koma bisa bergantung pada pilihan bobot yang ditebak sampai satu angka di belakang koma.

Dan yang paling tidak masuk akal: **menambah alternatif yang kalah di semua kriteria bisa membalik urutan dua alternatif lain.** Itu disebut rank reversal, dan TOPSIS mengalaminya di data ini.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung bobot kritis untuk setiap kriteria, membandingkan kekokohan beberapa metode, dan menguji apakah menambah alternatif mengubah urutan yang lama.',
    alat: ['Python 3', 'Hasil SAW, WP, atau TOPSIS dari kasusmu sendiri'],
    langkah: [
      { judul: 'Hitung dengan beberapa metode sekaligus',
        isi: `Jalankan SAW, WP, dan TOPSIS pada data dan bobot yang sama. Kalau ketiganya sepakat soal pemenang, itu tanda pertama bahwa hasilnya kokoh. Kalau tidak, pemenangnya lebih ditentukan oleh metode daripada oleh data.` },
      { judul: 'Catat selisih pemenang dan runner-up',
        isi: `Selisih skor antara peringkat 1 dan 2 adalah ukuran kasar kekokohan. Selisih 0,04 di SAW berbeda jauh artinya dengan selisih 0,009 di TOPSIS — meskipun keduanya memilih pemenang yang sama.` },
      { judul: 'Geser satu bobot, bagi sisanya sebanding',
        isi: `Naikkan atau turunkan satu bobot sedikit demi sedikit. Supaya jumlahnya tetap 1, bagikan sisanya ke kriteria lain sebanding bobot lamanya: kalau Harga turun, Kualitas, Jarak, dan Ketepatan naik dengan perbandingan 0,30 : 0,15 : 0,20.` },
      { judul: 'Temukan bobot kritisnya',
        isi: `Untuk setiap kriteria, cari bobot terdekat dari nilai sekarang yang membuat pemenangnya berganti. Pergeseran terkecil di antara semua kriteria adalah ukuran kekokohan keputusanmu.

Bandingkan dengan seberapa yakin pengambil keputusan tentang bobotnya. Kalau ia cuma yakin sampai ±0,05, dan pergeseran kritisnya 0,009, pemenangnya tidak bisa dipertanggungjawabkan.` },
      { judul: 'Uji dengan menambah alternatif yang buruk',
        isi: `Tambahkan satu alternatif yang tidak unggul di kriteria mana pun, lalu hitung ulang. Urutan alternatif lama seharusnya tidak berubah.

Kalau berubah, metodenya mengalami rank reversal — dan itu harus dilaporkan.` },
      { judul: 'Tulis hasilnya di laporan',
        isi: `Sertakan tabel bobot kritis, perbandingan metode, dan hasil uji rank reversal. Kesimpulannya bukan cuma "PT Gama terbaik", melainkan "PT Gama terbaik, dan tetap terbaik selama bobot Kualitas tidak naik lebih dari ...".` }
    ],
    cek: [
      'Kamu sudah membandingkan pemenang dari setidaknya dua metode',
      'Kamu punya tabel bobot kritis untuk setiap kriteria',
      'Kamu sudah menguji apakah menambah alternatif yang buruk mengubah urutan lama',
      'Kesimpulan laporanmu menyebut batas kekokohan pemenangnya'
    ]
  },

  judulLogicSyntax: 'Bedah Rumus — kenapa pilihan yang pasti kalah bisa mengubah pemenang',

  konsep: `Topik SAW dan WP menyebut bahwa kedua metode "sepenuhnya bergantung pada bobot", dan topik TOPSIS menyebut rank reversal sebagai kelemahannya. Topik ini mengukur keduanya dengan angka, pada kasus pemilihan pemasok yang sama.

**Tiga metode, satu data**

| Metode | Gama | Alfa | Beta | Delta |
|---|---|---|---|---|
| SAW | **0,8484** | 0,8095 | 0,8000 | 0,7610 |
| WP | **0,2627** | 0,2552 | 0,2435 | 0,2386 |
| TOPSIS | **0,5352** | 0,5265 | 0,4648 | 0,3845 |

Ketiganya memilih PT Gama. Tetapi selisih Gama dan Alfa di TOPSIS cuma **0,0087**.

**Bobot kritis**

Satu bobot digeser sedikit demi sedikit, dan sisanya dibagi sebanding bobot lamanya. Bobot kritis adalah nilai terdekat yang membuat pemenangnya berganti.

| Kriteria | Bobot | SAW: berganti di | TOPSIS: berganti di |
|---|---|---|---|
| Harga | 0,35 | 0,239 (−0,111) → Beta | 0,337 (−0,013) → Alfa |
| Kualitas | 0,30 | 0,376 (+0,076) → Beta | **0,309 (+0,009)** → Alfa |
| Jarak | 0,15 | 0,068 (−0,082) → Beta | 0,132 (−0,018) → Alfa |
| Ketepatan | 0,20 | 0,388 (+0,188) → Beta | 0,260 (+0,060) → Alfa |

Pergeseran terkecil di SAW adalah **0,076**. Di TOPSIS, **0,009** — bobot Kualitas cukup naik dari 0,30 menjadi 0,309, dan Alfa menjadi pemenang.

Bayangkan ini ditanyakan di sidang: "kenapa bobot Kualitas 0,30, bukan 0,31?" Kalau jawabannya "kira-kira saja", pemenang TOPSIS tidak bisa dipertahankan. Pemenang SAW bisa: bobot yang ditebak dengan ketelitian ±0,05 masih memberi pemenang yang sama.

Perhatikan juga bahwa kedua metode tidak berganti ke pemenang yang sama. SAW beralih ke **Beta**, TOPSIS ke **Alfa**. Metode yang berbeda menilai "runner-up" secara berbeda — satu lagi alasan melaporkan lebih dari satu metode.

**Rank reversal**

Sekarang pemasok baru mendaftar: **PT Epsilon** — harga 32, kualitas 3, jarak 60, ketepatan 75.

Dibanding PT Gama (20, 3, 20, 80), Epsilon lebih mahal, kualitasnya sama, lebih jauh, dan kurang tepat waktu. Ia tidak unggul di kriteria mana pun — ia tidak mungkin terpilih. Menambahkannya seharusnya tidak mengubah apa pun.

| Metode | Tanpa Epsilon | Dengan Epsilon |
|---|---|---|
| SAW | Gama > Alfa | Gama > Alfa |
| TOPSIS | Gama > Alfa | **Alfa > Gama** |

TOPSIS dengan Epsilon: Alfa 0,6069, Gama 0,5742, Beta 0,5223, Delta 0,4888, Epsilon 0,0000.

Epsilon mendapat skor nol — jelas yang terburuk. Tetapi kehadirannya **membalik** urutan dua pemasok teratas. Kalau keputusan sudah diambil kemarin dengan empat pemasok, pendaftaran satu pemasok yang tidak relevan hari ini akan mengubahnya.

**Kenapa TOPSIS terpengaruh dan SAW tidak**

TOPSIS mengukur jarak ke **solusi ideal negatif** — gabungan nilai terburuk di setiap kriteria. Epsilon membawa harga terburuk (32 > 30), jarak terburuk (60 > 45), dan ketepatan terburuk (75 < 80). Titik "terburuk" pindah jauh, dan jarak setiap pemasok ke titik itu berubah dengan kadar yang berbeda. Epsilon juga mengubah pembagi normalisasi vektor di setiap kolom.

SAW menormalkan dengan nilai **terbaik** di setiap kriteria — harga termurah, kualitas tertinggi. Epsilon tidak terbaik di kriteria mana pun, jadi normalisasi SAW tidak berubah sama sekali, dan skor alternatif lama tetap persis sama.

SAW juga bisa mengalami rank reversal — cukup tambahkan alternatif yang menjadi **terbaik** di satu kriteria. Bedanya, pada SAW hal itu hanya terjadi kalau alternatif baru memang unggul di sesuatu; pada TOPSIS, alternatif yang sepenuhnya kalah pun bisa memicunya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def geser(W, j, baru):\n    \"\"\"Ubah bobot kriteria j, bagi sisanya sebanding bobot lama.\"\"\"\n    sisa = sum(w for i, w in enumerate(W) if i != j)\n    return [baru if i == j else w * (1 - baru) / sisa\n            for i, w in enumerate(W)]\n\nfor arah in (1, -1):                 # naik, lalu turun\n    k = 1\n    while 0 < W[j] + arah * k * 0.001 < 1:\n        wb = W[j] + arah * k * 0.001\n        juara = urutan(metode(X, geser(W, j, wb)), ALT)[0]\n        if juara != juara_awal:\n            ...                         # catat bobot kritis\n            break\n        k += 1",
      penjelasan: `Pencarian sederhana dengan langkah 0,001 — dan satu keputusan tentang cara menggeser bobot yang menentukan arti hasilnya.

**Masalahnya: bobot harus berjumlah 1.**

Menaikkan bobot Kualitas dari 0,30 menjadi 0,35 berarti 0,05 harus diambil dari kriteria lain. Dari mana?

Ada banyak pilihan: ambil semuanya dari Harga, bagi rata ke tiga kriteria lain, atau bagi **sebanding** bobot lama. Setiap pilihan menjawab pertanyaan yang sedikit berbeda.

**Kenapa sebanding.**

\`w * (1 - baru) / sisa\` menskalakan setiap bobot lain dengan faktor yang sama. Perbandingan di antara kriteria-kriteria itu — Harga : Jarak : Ketepatan = 0,35 : 0,15 : 0,20 — tetap persis sama. Satu-satunya yang berubah adalah seberapa penting kriteria j dibanding semua yang lain.

Itu jawaban untuk pertanyaan yang paling sering diajukan: "bagaimana kalau kriteria ini sedikit lebih atau kurang penting, dan pendapat tentang kriteria lain tetap?"

**Kenapa dicari dari dua arah.**

Pemenang bisa berganti kalau bobot naik, kalau bobot turun, atau keduanya. Mencari ke dua arah dan menyimpan yang **lebih dekat** ke bobot sekarang memberi batas yang paling relevan: seberapa kecil kesalahan penilaian bobot yang sudah cukup untuk mengubah keputusan.

**Kenapa langkah 0,001.**

Bobot jarang ditentukan lebih teliti dari dua angka di belakang koma. Langkah 0,001 cukup halus untuk menemukan batas di bawah ketelitian itu — dan menemukan bahwa di TOPSIS batasnya **0,009**, di bawah satu perseratus.

Untuk batas yang tepat, pencarian bisa dilanjutkan dengan metode bagi dua di antara langkah terakhir yang tidak berganti dan langkah pertama yang berganti — teknik yang sama dengan mencari akar di Matematika Dasar. Untuk laporan, tiga angka di belakang koma sudah cukup.

**Satu keterbatasan yang harus diakui.**

Analisis ini menggeser **satu** bobot pada satu waktu. Kalau dua bobot bergeser bersamaan — Kualitas naik sedikit **dan** Harga turun sedikit — pemenangnya bisa berganti dengan pergeseran yang masing-masing lebih kecil lagi. Analisis sensitivitas yang lengkap menguji kombinasi, misalnya dengan mengambil ribuan bobot acak di sekitar bobot asli dan menghitung berapa persen yang memberi pemenang yang sama.`
    },
    {
      bahasa: 'python',
      kode: "EPS = [32, 3, 60, 75]         # tidak unggul di kriteria mana pun\nX5, ALT5 = X + [EPS], ALT + ['PT Epsilon']\n\nurutan(saw(X, W), ALT)[:2]        # Gama > Alfa\nurutan(saw(X5, W), ALT5)[:2]      # Gama > Alfa\nurutan(topsis(X, W), ALT)[:2]     # Gama > Alfa\nurutan(topsis(X5, W), ALT5)[:2]   # Alfa > Gama   BERBALIK\n\n# solusi ideal negatif TOPSIS sebelum dan sesudah Epsilon:\n#   harga terburuk  30 -> 32\n#   jarak terburuk  45 -> 60\n#   ketepatan       80 -> 75",
      penjelasan: `Uji rank reversal dalam empat baris — dan penjelasan kenapa metode yang tampak masuk akal bisa gagal dalam uji yang paling sederhana.

**Prinsip yang dilanggar.**

Dalam teori keputusan ada prinsip yang terdengar sangat wajar: pilihan antara A dan B tidak boleh bergantung pada kehadiran C yang tidak relevan. Kalau kamu lebih suka nasi goreng daripada mi goreng, menambahkan "bubur basi" ke daftar menu seharusnya tidak membuatmu berubah pikiran.

TOPSIS melanggarnya. Menambah Epsilon — bubur basinya — membuat Alfa mengalahkan Gama.

**Mekanismenya.**

Skor TOPSIS adalah D⁻/(D⁺ + D⁻): jarak ke titik terburuk dibagi jumlah jarak ke titik terbaik dan terburuk. Kedua titik itu dibangun dari alternatif yang ada.

Epsilon tidak mengubah titik terbaik — ia tidak terbaik di mana pun. Tetapi ia mendorong titik **terburuk** ke arah yang lebih buruk di tiga kriteria. Program mencetak jaraknya:

| | D⁺ tanpa | D⁺ dengan | D⁻ tanpa | D⁻ dengan | D⁻ naik |
|---|---|---|---|---|---|
| Alfa | 0,0550 | 0,0482 | 0,0611 | 0,0744 | 22% |
| Gama | 0,0758 | 0,0710 | 0,0873 | 0,0958 | 10% |

Setiap alternatif lama sekarang lebih jauh dari titik terburuk — tetapi **tidak sama banyaknya**. Sebelum Epsilon ada, keunggulan Gama adalah jaraknya yang besar dari titik terburuk: D⁻ 0,0873, jauh di atas Alfa. Ketika titik terburuk menjauh dari semua alternatif, keunggulan itu menyusut. D⁻ Alfa naik 22 persen, D⁻ Gama cuma 10 persen. Alfa, yang sejak awal lebih dekat ke titik terbaik, kini cukup jauh dari titik terburuk untuk menyalip.

Epsilon juga ikut masuk ke pembagi normalisasi vektor — akar jumlah kuadrat setiap kolom — sehingga seluruh matriks ternormalisasi berubah sedikit. Itu sebabnya D⁺ pun ikut turun, meskipun titik terbaiknya tidak berubah.

**Kenapa SAW kebal di kasus ini.**

Normalisasi SAW hanya memakai nilai **terbaik** di setiap kolom: min untuk cost, max untuk benefit. Selama alternatif baru tidak menjadi yang terbaik di kolom mana pun, setiap rᵢⱼ lama tidak berubah, dan skor SAW alternatif lama tetap persis sama.

**Yang harus dilakukan dengan temuan ini.**

Bukan berarti TOPSIS tidak boleh dipakai. Tetapi kalau daftar alternatif bisa bertambah — pemasok baru, pelamar yang terlambat — hasil TOPSIS harus dihitung ulang dengan daftar lengkap, dan perubahan urutan harus bisa dijelaskan. Laporan yang jujur menyebut kerentanan ini, dan analisis sensitivitas yang baik mengujinya dengan menambah alternatif yang jelas buruk, seperti di sini.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Analisis sensitivitas & rank reversal
# ============================================
import math

ALT = ["PT Alfa", "PT Beta", "PT Gama", "PT Delta"]
KRI = ["Harga", "Kualitas", "Jarak", "Ketepatan"]
JENIS = ["cost", "benefit", "cost", "benefit"]
X = [[25, 4, 30, 90], [30, 5, 45, 95], [20, 3, 20, 80], [28, 4, 35, 88]]
W = [0.35, 0.30, 0.15, 0.20]

def saw(X, W):
    kol = list(zip(*X))
    return [sum(w * (min(kol[j]) / b[j] if JENIS[j] == "cost" else b[j] / max(kol[j]))
                for j, w in enumerate(W)) for b in X]

def wp(X, W):
    S = [math.prod(b[j] ** (-w if JENIS[j] == "cost" else w) for j, w in enumerate(W))
         for b in X]
    return [s / sum(S) for s in S]

def topsis(X, W, jarak=False):
    kol = list(zip(*X))
    p = [math.sqrt(sum(v * v for v in c)) for c in kol]
    Y = [[b[j] / p[j] * W[j] for j in range(len(W))] for b in X]
    ky = list(zip(*Y))
    plus = [max(c) if JENIS[j] == "benefit" else min(c) for j, c in enumerate(ky)]
    minus = [min(c) if JENIS[j] == "benefit" else max(c) for j, c in enumerate(ky)]
    V, D = [], []
    for y in Y:
        dp = math.sqrt(sum((a - b) ** 2 for a, b in zip(y, plus)))
        dm = math.sqrt(sum((a - b) ** 2 for a, b in zip(y, minus)))
        V.append(dm / (dp + dm))
        D.append((dp, dm))
    return D if jarak else V

def urutan(skor, nama):
    return [nama[i] for i in sorted(range(len(skor)), key=lambda i: -skor[i])]

def geser(W, j, baru):
    """Ubah bobot kriteria j, bagi sisanya sebanding bobot lama."""
    sisa = sum(w for i, w in enumerate(W) if i != j)
    return [baru if i == j else w * (1 - baru) / sisa for i, w in enumerate(W)]

# --------------------------------------------
# 1. Tiga metode, data dan bobot yang sama
# --------------------------------------------
print("--- tiga metode, data dan bobot yang sama ---")
hasil = {"SAW": saw(X, W), "WP": wp(X, W), "TOPSIS": topsis(X, W)}
for m, skor in hasil.items():
    urut = sorted(zip(ALT, skor), key=lambda t: -t[1])
    print("  " + format(m, "<7") + "  ".join(a.replace("PT ", "") + " " + format(s, ".4f")
                                          for a, s in urut))
print("  Ketiganya memilih Gama. Tetapi selisih Gama dan Alfa di TOPSIS")
print("  cuma " + format(hasil["TOPSIS"][2] - hasil["TOPSIS"][0], ".4f")
      + " -- keputusan yang tipis.")

# --------------------------------------------
# 2. Seberapa jauh bobot harus bergeser supaya pemenang berganti?
# --------------------------------------------
print("\n--- bobot kritis: kapan pemenang berganti? ---")
print("  satu bobot digeser, sisanya dibagi sebanding bobot lama")
print()
terkecil = {}
for nama_m, metode in [("SAW", saw), ("TOPSIS", topsis)]:
    print("  " + nama_m)
    for j in range(4):
        juara_awal = urutan(metode(X, W), ALT)[0]
        kritis = None
        for arah in (1, -1):                   # naik lalu turun, langkah 0,001
            k = 1
            while 0 < W[j] + arah * k * 0.001 < 1:
                wb = W[j] + arah * k * 0.001
                juara = urutan(metode(X, geser(W, j, wb)), ALT)[0]
                if juara != juara_awal:
                    if kritis is None or abs(wb - W[j]) < abs(kritis[0] - W[j]):
                        kritis = (wb, juara)
                    break
                k += 1
        if kritis:
            geser_ini = abs(kritis[0] - W[j])
            if nama_m not in terkecil or geser_ini < terkecil[nama_m][0]:
                terkecil[nama_m] = (geser_ini, KRI[j])
            print("    " + format(KRI[j], "<10") + format(W[j], ".2f") + " -> "
                  + format(kritis[0], ".3f") + "  (geser " + format(kritis[0] - W[j], "+.3f")
                  + ")  juara jadi " + kritis[1])
        else:
            print("    " + format(KRI[j], "<10") + format(W[j], ".2f")
                  + " -> tidak berganti di rentang 0-1")
print()
for nama_m, (gs, k) in terkecil.items():
    print("  " + format(nama_m, "<7") + "pergeseran terkecil yang mengganti juara: "
          + format(gs, ".3f") + " (" + k + ")")
print("  Pemenang TOPSIS di data ini tidak kokoh: menggeser satu bobot")
print("  kurang dari satu perseratus sudah cukup menggantinya.")

# --------------------------------------------
# 3. Rank reversal: menambah alternatif yang KALAH di semua kriteria
# --------------------------------------------
print("\n--- menambah PT Epsilon: [32, 3, 60, 75] ---")
EPS = [32, 3, 60, 75]
print("  dibanding Gama [20, 3, 20, 80]: lebih mahal, kualitas sama,")
print("  lebih jauh, kurang tepat waktu -- Epsilon tidak unggul di")
print("  kriteria mana pun. Ia tidak mungkin jadi pilihan.")
X5, ALT5 = X + [EPS], ALT + ["PT Epsilon"]
print()
print("  metode   tanpa Epsilon          dengan Epsilon")
for nama_m, metode in [("SAW", saw), ("TOPSIS", topsis)]:
    a = urutan(metode(X, W), ALT)
    b = urutan(metode(X5, W), ALT5)
    print("  " + format(nama_m, "<8") + " " + format(" > ".join(x[3:] for x in a[:2]), "<22")
          + " " + " > ".join(x[3:] for x in b[:2])
          + ("   BERBALIK" if a[0] != b[0] else ""))
v5 = topsis(X5, W)
print("\n  skor TOPSIS dengan Epsilon:")
print("  " + "  ".join(n[3:] + " " + format(v, ".4f") for n, v in zip(ALT5, v5)))
print("\n  jarak TOPSIS (D+ ke titik terbaik, D- ke titik terburuk):")
print("            D+ tanpa  D+ dengan   D- tanpa  D- dengan  naik D-")
d4, d5 = topsis(X, W, jarak=True), topsis(X5, W, jarak=True)
for i in (0, 2):
    print("  " + format(ALT[i][3:], "<8") + format(d4[i][0], "9.4f") + format(d5[i][0], "11.4f")
          + format(d4[i][1], "11.4f") + format(d5[i][1], "11.4f")
          + format(d5[i][1] / d4[i][1] - 1, "9.0%"))
print()
print("  Epsilon menggeser solusi ideal NEGATIF (harga, jarak, dan")
print("  ketepatan terburuk kini miliknya) dan mengubah pembagi")
print("  normalisasi. Semua jarak dihitung ulang, dan urutan Gama-Alfa")
print("  berbalik -- karena alternatif yang tidak pernah dipilih.")
print("  SAW tidak terpengaruh: normalisasinya memakai nilai TERBAIK")
print("  tiap kriteria, dan Epsilon tidak terbaik di kriteria apa pun.")` },
  output: `--- tiga metode, data dan bobot yang sama ---
  SAW    Gama 0.8484  Alfa 0.8095  Beta 0.8000  Delta 0.7610
  WP     Gama 0.2627  Alfa 0.2552  Beta 0.2435  Delta 0.2386
  TOPSIS Gama 0.5352  Alfa 0.5265  Beta 0.4648  Delta 0.3845
  Ketiganya memilih Gama. Tetapi selisih Gama dan Alfa di TOPSIS
  cuma 0.0087 -- keputusan yang tipis.

--- bobot kritis: kapan pemenang berganti? ---
  satu bobot digeser, sisanya dibagi sebanding bobot lama

  SAW
    Harga     0.35 -> 0.239  (geser -0.111)  juara jadi PT Beta
    Kualitas  0.30 -> 0.376  (geser +0.076)  juara jadi PT Beta
    Jarak     0.15 -> 0.068  (geser -0.082)  juara jadi PT Beta
    Ketepatan 0.20 -> 0.388  (geser +0.188)  juara jadi PT Beta
  TOPSIS
    Harga     0.35 -> 0.337  (geser -0.013)  juara jadi PT Alfa
    Kualitas  0.30 -> 0.309  (geser +0.009)  juara jadi PT Alfa
    Jarak     0.15 -> 0.132  (geser -0.018)  juara jadi PT Alfa
    Ketepatan 0.20 -> 0.260  (geser +0.060)  juara jadi PT Alfa

  SAW    pergeseran terkecil yang mengganti juara: 0.076 (Kualitas)
  TOPSIS pergeseran terkecil yang mengganti juara: 0.009 (Kualitas)
  Pemenang TOPSIS di data ini tidak kokoh: menggeser satu bobot
  kurang dari satu perseratus sudah cukup menggantinya.

--- menambah PT Epsilon: [32, 3, 60, 75] ---
  dibanding Gama [20, 3, 20, 80]: lebih mahal, kualitas sama,
  lebih jauh, kurang tepat waktu -- Epsilon tidak unggul di
  kriteria mana pun. Ia tidak mungkin jadi pilihan.

  metode   tanpa Epsilon          dengan Epsilon
  SAW      Gama > Alfa            Gama > Alfa
  TOPSIS   Gama > Alfa            Alfa > Gama   BERBALIK

  skor TOPSIS dengan Epsilon:
  Alfa 0.6069  Beta 0.5223  Gama 0.5742  Delta 0.4888  Epsilon 0.0000

  jarak TOPSIS (D+ ke titik terbaik, D- ke titik terburuk):
            D+ tanpa  D+ dengan   D- tanpa  D- dengan  naik D-
  Alfa       0.0550     0.0482     0.0611     0.0744      22%
  Gama       0.0758     0.0710     0.0873     0.0958      10%

  Epsilon menggeser solusi ideal NEGATIF (harga, jarak, dan
  ketepatan terburuk kini miliknya) dan mengubah pembagi
  normalisasi. Semua jarak dihitung ulang, dan urutan Gama-Alfa
  berbalik -- karena alternatif yang tidak pernah dipilih.
  SAW tidak terpengaruh: normalisasinya memakai nilai TERBAIK
  tiap kriteria, dan Epsilon tidak terbaik di kriteria apa pun.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Satu kali SAW, WP, atau TOPSIS', waktu: 'O(m · n)', memori: 'm alternatif, n kriteria' },
      { operasi: 'Bobot kritis satu kriteria, langkah h', waktu: 'O((1/h) · m · n)', memori: 'O(m · n)' },
      { operasi: 'Bobot kritis semua kriteria', waktu: 'O((n/h) · m · n)', memori: 'O(m · n)' },
      { operasi: 'Uji rank reversal satu alternatif baru', waktu: 'O(m · n)', memori: 'satu kali hitung ulang' },
      { operasi: 'Sensitivitas acak dengan s sampel bobot', waktu: 'O(s · m · n)', memori: 'O(m · n)' }
    ],
    intuisi: `Setiap hitungan MADM hanya menyentuh setiap sel matriks keputusan sekali. Analisis sensitivitas mengulang hitungan itu berkali-kali — ratusan kali per kriteria dengan langkah 0,001 — tetapi untuk puluhan alternatif dan beberapa kriteria, totalnya tetap sepele.

Karena itu tidak ada alasan komputasi untuk tidak melakukannya. Satu-satunya biaya adalah waktu menulis kodenya — dan kode itu bisa dipakai ulang untuk setiap kasus berikutnya.`
  },

  kesalahanUmum: [
    {
      salah: 'Melaporkan pemenang tanpa analisis sensitivitas.',
      kenapa: 'Pemenang bisa bergantung pada pilihan bobot yang cuma ditebak. Pada kasus ini, pemenang TOPSIS berganti kalau bobot Kualitas naik kurang dari 0,01.',
      benar: 'Hitung bobot kritis setiap kriteria dan laporkan batas kekokohan pemenangnya.'
    },
    {
      salah: 'Menggeser satu bobot tanpa menyesuaikan bobot lain.',
      kenapa: 'Jumlah bobot tidak lagi 1, sehingga perubahan skor sebagian disebabkan skala yang berubah, bukan kepentingan relatif yang berubah.',
      benar: 'Bagikan selisihnya ke kriteria lain, misalnya sebanding bobot lama, supaya jumlahnya tetap 1.'
    },
    {
      salah: 'Menganggap selisih skor kecil tidak penting selama urutannya jelas.',
      kenapa: 'Selisih kecil berarti pemenangnya rapuh. Selisih 0,0087 di TOPSIS berbalik oleh perubahan bobot 0,009.',
      benar: 'Laporkan selisih antara peringkat 1 dan 2, dan uji seberapa besar perubahan yang membaliknya.'
    },
    {
      salah: 'Menambah alternatif baru ke TOPSIS tanpa memeriksa urutan alternatif lama.',
      kenapa: 'Alternatif baru, bahkan yang kalah di semua kriteria, bisa menggeser solusi ideal negatif dan membalik urutan alternatif lain.',
      benar: 'Hitung ulang dengan daftar lengkap, bandingkan urutan lama, dan jelaskan setiap perubahan.'
    },
    {
      salah: 'Menganggap semua metode MADM sepakat kalau datanya sama.',
      kenapa: 'SAW, WP, dan TOPSIS memperlakukan kelemahan dan normalisasi secara berbeda. Di kasus ini, SAW beralih ke Beta dan TOPSIS ke Alfa saat bobot bergeser.',
      benar: 'Hitung dengan lebih dari satu metode dan laporkan apakah pemenangnya sama.'
    },
    {
      salah: 'Menguji sensitivitas hanya satu bobot pada satu waktu lalu menganggapnya lengkap.',
      kenapa: 'Beberapa bobot yang bergeser bersamaan bisa mengganti pemenang dengan pergeseran yang masing-masing lebih kecil.',
      benar: 'Lengkapi dengan simulasi bobot acak di sekitar bobot asli, dan laporkan berapa persen yang mempertahankan pemenang.'
    }
  ],

  analogi: `Bayangkan kamu memilih **tempat kos** dari empat pilihan, dengan kriteria harga, jarak ke kampus, dan kebersihan.

**Sensitivitas.** Kamu menghitung, dan kos A menang tipis dari kos B. Temanmu bertanya: "kalau kebersihan sedikit lebih penting buatmu, bagaimana?" Kamu menghitung ulang dengan bobot kebersihan naik satu persen — dan kos B menang.

Sekarang kamu tahu sesuatu yang penting: keputusanmu sebenarnya **belum** terjawab oleh angka. Kedua kos hampir setara, dan pilihannya bergantung pada seberapa penting kebersihan — sesuatu yang harus kamu putuskan sendiri, bukan yang bisa dihitung.

Kalau kos A tetap menang meskipun bobot kebersihan dinaikkan sepuluh persen, kamu bisa memilihnya dengan tenang.

**Rank reversal.** Minggu depan, pemilik kos kelima menawarkan kamarnya: lebih mahal dari semuanya, paling jauh, dan paling kotor. Tidak mungkin kamu pilih.

Tetapi cara penilaianmu membandingkan setiap kos dengan "kos terburuk yang ada". Kos kelima menjadi kos terburuk yang baru — dan jauh lebih buruk dari yang lama. Tiba-tiba semua kos lain terlihat lebih baik, tetapi tidak sama banyaknya. Kos B, yang unggul di kriteria di mana kos kelima sangat buruk, mendapat keuntungan lebih besar — dan sekarang mengalahkan kos A.

Kamu tidak berubah pikiran tentang kos A dan B sama sekali. Yang berubah cuma **penggaris**-nya — karena ada kos jelek yang ikut diukur.

Cara penilaian yang membandingkan setiap kos dengan "kos terbaik di setiap kriteria" tidak mengalami ini, selama kos baru tidak menjadi yang terbaik di mana pun.`,

  latihan: [
    'Hitung bobot kritis Harga di SAW dengan tangan untuk tiga nilai bobot, lalu periksa dengan program.',
    'Ubah langkah pencarian menjadi 0,0001 dan laporkan bobot kritis Kualitas di TOPSIS dengan empat angka di belakang koma.',
    'Tambahkan pencarian bobot kritis untuk WP, lalu bandingkan kekokohannya dengan SAW dan TOPSIS.',
    'Tulis simulasi 10.000 bobot acak di sekitar bobot asli (misalnya ±0,05 untuk setiap bobot, lalu dinormalkan), dan hitung persentase yang mempertahankan PT Gama di SAW dan TOPSIS.',
    'Temukan satu alternatif baru yang membuat SAW mengalami rank reversal, lalu jelaskan kenapa alternatif itu harus unggul di setidaknya satu kriteria.',
    'Tambahkan PT Epsilon ke WP dan periksa apakah urutan alternatif lama berubah, lalu jelaskan hasilnya dari rumus WP.',
    'Hitung solusi ideal negatif TOPSIS sebelum dan sesudah Epsilon ditambahkan, dalam bentuk nilai ternormalisasi terbobot.',
    'Jelaskan kenapa menggeser bobot secara sebanding mempertahankan perbandingan di antara kriteria lain.',
    'Tulis satu paragraf kesimpulan laporan untuk kasus pemasok yang menyebut pemenang beserta batas kekokohannya.',
    'Terapkan analisis bobot kritis ke tugas atau projek SPK kelompokmu sendiri, lalu tentukan apakah pemenangnya kokoh.'
  ]
});
