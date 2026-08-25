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
