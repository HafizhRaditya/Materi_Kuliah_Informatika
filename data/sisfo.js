/* ============================================================
   sisfo.js — materi Sistem Informasi (Semester 5)

   Disusun dari slide kuliah sendiri di
   "Semester Lima/Sistem Informasi":
     - PPSI01 Konsep Sistem
     - PPSI02 Konsep Informasi
     - PPSI03 Pengantar Teori Organisasi dan Manajemen
     - PPSI05 Teknologi Informasi
     - PPSI06 Internet, Intranet dan Extranet
     - PPSI07 Business Information Systems
     - Pertemuan 8-12 (System and Organization, Data-Informasi-
       Pengetahuan, Manajemen Database, Klasifikasi SI, Aplikasi SI)

   Slide-nya berasal dari mata kuliah IKI-10400 Prinsip Sistem
   Informasi, Fakultas Ilmu Komputer Universitas Indonesia.
   ============================================================ */

TOPICS.push({
  id: 'sisfo-konsep-sistem',
  judul: 'Konsep Sistem',
  kategori: 'sisfo',
  tag: ['sistem', 'subsistem', 'batas sistem', 'umpan balik', 'dekomposisi', 'emergent'],
  ringkas: 'Kenapa "sistem" bukan sifat benda, melainkan cara kita memilih memandangnya.',

  fungsi: `**Menentukan apa yang termasuk dalam masalahmu dan apa yang tidak — sebelum mencari penyebabnya.**

Terpakai di:

- **Menentukan lingkup** tugas akhir atau kerja praktik
- **Menganalisis masalah** yang berulang meski sudah diperbaiki
- **Bab pendahuluan** — batasan masalah adalah penentuan batas sistem
- **Merancang modul** — dekomposisi yang baik memakai prinsip yang sama dengan RPL

Yang paling langsung terpakai, dan paling sering menghemat waktu: **kalau masalah terus berulang meski sudah diperbaiki, kemungkinan besar batasnya terlalu sempit.**

Kamu terus memperbaiki hal yang bukan penyebabnya, karena penyebabnya berada di luar wilayah yang kamu sepakati untuk diperiksa.`,

  praktik: {
    tujuan: `Kamu bisa menetapkan batas sistem dengan sadar, dan menemukan penyebab masalah yang selama ini terlewat karena batasnya salah.`,
    alat: [
      'Kertas atau papan tulis',
      'Satu masalah nyata di sekitarmu'
    ],
    langkah: [
      { judul: 'Ambil satu masalah yang berulang',
        isi: `Pilih masalah nyata: antrean di kantin, KRS yang selalu bermasalah di hari pertama, atau apa pun yang kamu alami.

Bekerja dari masalah nyata membuat penentuan batas terasa berbeda dari sekadar latihan.` },
      { judul: 'Gambar batasnya secara harfiah',
        isi: `Gambar sebuah lingkaran. Tulis di dalamnya apa yang **bisa kamu kendalikan**, dan di luarnya apa yang **hanya bisa kamu hadapi**.

Menggambarnya memaksa keputusan yang biasanya dibiarkan kabur.` },
      { judul: 'Daftar fakta dan tandai posisinya',
        isi: `Tulis semua fakta yang kamu tahu tentang masalah itu, lalu tandai: di dalam batas atau di luar.

Fakta yang di luar batas **tidak akan pernah** muncul sebagai penyebab dalam analisismu — dan itulah risikonya.` },
      { judul: 'Geser batasnya dan analisis ulang',
        isi: `Perluas lingkarannya satu tingkat, lalu ulangi analisismu.

Bandingkan kesimpulannya. Sering kali penyebab yang sesungguhnya baru muncul di tingkat kedua atau ketiga.

Berhenti memperluas ketika penyebab yang kamu temukan sudah **di luar jangkauanmu** — di situ batas yang tepat.` },
      { judul: 'Cari umpan baliknya',
        isi: `Untuk sistem yang kamu analisis, cari: apa yang **menstabilkan**, dan apa yang **memperkuat**.

Umpan balik negatif membuat sistem bertahan. Umpan balik positif yang tak terkendali menghancurkannya.

Contoh: antrean panjang membuat orang pergi, yang memperpendek antrean — itu negatif dan menstabilkan.` },
      { judul: 'Pecah menjadi subsistem lalu nilai',
        isi: `Pecah sistemmu menjadi beberapa bagian, lalu uji mutunya: untuk tiga perubahan yang mungkin diminta, berapa subsistem yang tersentuh?

Angka kecil berarti pemecahanmu baik. Ini ukuran yang sama dengan coupling di Rekayasa Perangkat Lunak.` },
      { judul: 'Jangan lupakan komponen manusia',
        isi: `Daftar keenam komponennya, lalu periksa apakah kamu sudah merencanakan **pelatihan** dan **prosedur**.

Sistem yang sempurna secara teknis tetap gagal kalau penggunanya tidak mau memakainya atau merasa terancam olehnya.

Anggarkan waktu untuk itu sekarang, bukan setelah sistemnya jadi.` }
    ],
    cek: [
      'Kamu bisa menyebutkan apa yang di dalam dan di luar batas sistemmu',
      'Analisis dengan batas lebih luas menemukan penyebab yang tidak terlihat sebelumnya',
      'Rencanamu memuat waktu khusus untuk pelatihan pengguna'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa batasnya kita yang tentukan',

  konsep: `
**Sistem** adalah **sekumpulan elemen yang saling berinteraksi untuk mencapai tujuan tertentu**.

Definisi lain dari slide, dari Beynon: *sebuah keutuhan terorganisasi yang bagian-bagiannya saling berkaitan, yang memunculkan sifat baru, dan punya maksud tertentu.*

**Gagasan yang paling penting dan paling sering dilewatkan**

Slide menyebutnya secara langsung: **sistem adalah suatu konsep yang dibuat untuk memudahkan pemahaman.**

Artinya "sistem" **bukan sifat yang melekat pada benda**. Ia adalah **cara kita memilih memandang** sesuatu.

Sebuah mobil bisa dipandang sebagai satu sistem, atau sebagai kumpulan sistem (bahan bakar, kelistrikan, rem), atau sebagai **satu elemen** di dalam sistem lalu lintas kota.

Ketiganya **benar**. Yang menentukan mana yang dipakai adalah **pertanyaan yang sedang kamu jawab**.

Karena itu langkah pertama menganalisis sistem bukan mengamati, melainkan **menyepakati**: apa elemennya, apa hubungan antar-elemen, dan **di mana batasnya**.

**Elemen sebuah sistem**

- **Komponen** — bagian-bagian penyusunnya
- **Hubungan** antar-komponen
- **Batas** (*boundary*) — garis pemisah sistem dari lingkungannya
- **Lingkungan** (*environment*) — segala yang di luar batas, yang **memengaruhi tetapi tidak dikendalikan**
- **Tujuan** — alasan sistem itu ada
- **Masukan, proses, keluaran**
- **Umpan balik** (*feedback*) — keluaran yang dikembalikan jadi masukan

**Sifat emergent**

Sifat yang muncul dari **keseluruhan**, dan **tidak dimiliki bagian mana pun**.

Sebuah mesin bisa berpindah tempat; sebuah roda tidak. Sebuah otak bisa berpikir; satu neuron tidak.

Inilah alasan sistem **tidak bisa dipahami hanya dengan membedah bagiannya**. Kamu bisa mengenal setiap komponen dengan sempurna dan tetap tidak tahu apa yang akan dilakukan sistemnya.

**Batas: pilihan yang menentukan segalanya**

Menentukan batas berarti memutuskan **apa yang kamu kendalikan** dan **apa yang cuma kamu hadapi**.

Menggeser batas mengubah seluruh analisis. Kalau pemasok berada **di dalam** batas sistem persediaanmu, keterlambatannya jadi **masalah yang bisa kamu perbaiki**. Kalau ia **di luar**, keterlambatannya jadi **kenyataan yang harus kamu antisipasi**.

Batas yang **terlalu sempit** membuatmu memecahkan masalah yang salah. Batas yang **terlalu luas** membuat analisisnya tidak pernah selesai.

**Sistem terbuka dan tertutup**

- **Terbuka** — bertukar dengan lingkungannya. Semua sistem organisasi bersifat terbuka.
- **Tertutup** — tidak bertukar sama sekali. **Hampir tidak ada di dunia nyata**; ia alat bantu berpikir.

**Umpan balik: negatif dan positif**

- **Umpan balik negatif** — **menstabilkan**. Menjauh dari sasaran, sistem menariknya kembali. Termostat.
- **Umpan balik positif** — **memperkuat**. Menjauh dari sasaran, sistem mendorong lebih jauh. Pengeras suara yang melengking.

Perhatikan bahwa "negatif" **bukan berarti buruk**. Justru umpan balik negatiflah yang membuat sistem **bertahan**. Umpan balik positif yang tak terkendali **menghancurkan sistem**.

**Dekomposisi dan subsistem**

Sistem besar dipecah menjadi **subsistem**. Tiap subsistem bisa dipecah lagi.

Pemecahan yang baik menghasilkan subsistem yang **berkaitan erat di dalam** dan **sedikit bergantung ke luar** — persis **high cohesion, low coupling** yang kamu pelajari di Rekayasa Perangkat Lunak.

Itu bukan kebetulan. RPL meminjam gagasannya **dari teori sistem**.

**Sistem informasi**

Sistem yang **mengumpulkan, mengolah, menyimpan, dan menyebarkan informasi** untuk mendukung pengambilan keputusan dan pengendalian di sebuah organisasi.

Komponennya lebih luas daripada perangkat lunak saja: **perangkat keras, perangkat lunak, data, prosedur, jaringan, dan MANUSIA**.

Komponen terakhir itu yang paling sering dilupakan mahasiswa Informatika — dan **paling sering menjadi sebab kegagalan** sistem yang secara teknis sempurna.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA MENGGESER BATAS MENGUBAH SEGALANYA\n#\n# Masalah: stok sering habis mendadak.\n#\n# BATAS SEMPIT (cuma gudang):\n#   di dalam : rak, petugas, pencatatan\n#   di luar  : pemasok, bagian pembelian\n#   -> kesimpulan: "petugas kurang teliti mencatat"\n#   -> perbaikan: latih petugas\n#   -> stok TETAP habis, karena sebabnya di luar\n#\n# BATAS LUAS (gudang + pembelian + pemasok):\n#   di dalam : semuanya\n#   -> kesimpulan: "pemesanan ulang baru dilakukan\n#      setelah stok nol, padahal pemasok butuh 5 hari"\n#   -> perbaikan: pesan saat stok masih 5 hari pakai\n#\n# Batasnya BUKAN sifat gudang. Ia PILIHAN analis --\n# dan pilihan itu menentukan jawaban yang mungkin\n# ditemukan sama sekali.',
      penjelasan: `
Ini gagasan paling berharga dari seluruh topik, dan ia **berlaku jauh di luar mata kuliah ini**.

Perhatikan bahwa kedua analisis di atas **dilakukan dengan benar**. Tidak ada kesalahan berhitung, tidak ada data yang keliru. Yang berbeda cuma **di mana garis batasnya ditarik**.

Dan hasilnya **bertolak belakang**.

Analisis pertama bahkan **tidak mampu menemukan** sebab yang sesungguhnya — bukan karena analisnya kurang cermat, melainkan karena sebab itu **berada di luar wilayah yang ia sepakati untuk diperiksa**.

Ini yang membuat penentuan batas **bukan langkah administratif**, melainkan **keputusan paling menentukan** dalam analisis sistem. Ia menetapkan **jawaban apa saja yang mungkin ditemukan** sebelum kamu mulai mencari.

Ada satu aturan praktis yang menolong: **batas memisahkan yang kamu KENDALIKAN dari yang cuma kamu HADAPI.**

- Yang di **dalam** batas → bisa kamu ubah, jadi ia **calon perbaikan**
- Yang di **luar** batas → tidak bisa kamu ubah, jadi ia **kendala yang harus diantisipasi**

Karena itu, ketika sebuah masalah **berulang terus meski sudah diperbaiki**, salah satu kemungkinan pertama yang layak diperiksa adalah: **batasnya terlalu sempit**. Kamu terus memperbaiki hal yang bukan penyebabnya.

Tetapi jangan menyimpulkan bahwa **makin luas makin baik**.

Batas yang terlalu luas punya kegagalannya sendiri: analisisnya **tidak pernah selesai**. Kalau kamu memasukkan kondisi ekonomi nasional ke dalam sistem gudangmu, kamu memang menemukan sebab yang lebih dalam — dan **tidak satu pun bisa kamu perbaiki**.

Batas yang tepat adalah yang **cukup luas untuk memuat penyebabnya**, dan **cukup sempit untuk masih bisa kamu ubah**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Konsep sistem: batas, umpan balik, dekomposisi
# ============================================

# --------------------------------------------
# 1. Elemen sebuah sistem
# --------------------------------------------
ELEMEN = [
    ("Komponen",   "bagian penyusunnya",
     "rak, petugas, buku catatan"),
    ("Hubungan",   "cara komponen saling memengaruhi",
     "petugas mencatat tiap barang keluar"),
    ("Batas",      "garis pemisah dari lingkungan",
     "sampai pintu gudang saja"),
    ("Lingkungan", "di luar batas, memengaruhi tapi tak dikendalikan",
     "pemasok, cuaca, permintaan pasar"),
    ("Tujuan",     "alasan sistem ada",
     "barang selalu tersedia saat dibutuhkan"),
    ("Masukan",    "yang diterima dari lingkungan",
     "kiriman barang, permintaan"),
    ("Proses",     "yang dilakukan terhadap masukan",
     "menyimpan, mencatat, mengeluarkan"),
    ("Keluaran",   "yang diserahkan ke lingkungan",
     "barang terkirim, laporan stok"),
    ("Umpan balik","keluaran yang jadi masukan lagi",
     "laporan stok memicu pemesanan ulang"),
]

print("--- elemen sistem (contoh: gudang) ---")
for nama, arti, contoh in ELEMEN:
    print("  " + nama.ljust(13) + arti)
    print("  " + " " * 13 + "-> " + contoh)


# --------------------------------------------
# 2. Menggeser batas mengubah kesimpulan
# --------------------------------------------
print("")
print("--- menggeser batas mengubah jawaban yang MUNGKIN ---")

FAKTA = [
    ("gudang",    "pencatatan meleset rata-rata 2 unit per minggu"),
    ("gudang",    "rak penuh saat kiriman besar datang"),
    ("pembelian", "pemesanan ulang baru dibuat setelah stok NOL"),
    ("pemasok",   "butuh 5 hari kerja sejak pesanan diterima"),
    ("pasar",     "permintaan naik 30% tiap akhir bulan"),
]

BATAS = [
    ("Sempit (gudang saja)",            {"gudang"}),
    ("Sedang (gudang + pembelian)",     {"gudang", "pembelian"}),
    ("Luas (+ pemasok)",                {"gudang", "pembelian", "pemasok"}),
    ("Sangat luas (+ pasar)", {"gudang", "pembelian", "pemasok", "pasar"}),
]

for nama, isi in BATAS:
    terlihat = [f for w, f in FAKTA if w in isi]
    tersembunyi = [f for w, f in FAKTA if w not in isi]
    print("")
    print("  " + nama)
    print("      terlihat    : " + str(len(terlihat)) + " fakta")
    for f in terlihat:
        print("          - " + f)
    if tersembunyi:
        print("      TIDAK terlihat: " + str(len(tersembunyi)) + " fakta")

print("")
print("  Analisis dengan batas SEMPIT tidak salah hitung.")
print("  Ia cuma TIDAK BISA MELIHAT sebab yang sesungguhnya,")
print("  karena sebab itu ada di luar wilayah yang ia periksa.")
print("")
print("  Tapi batas yang terlalu LUAS punya kegagalan sendiri:")
print("  'permintaan naik 30% tiap akhir bulan' memang sebab")
print("  yang lebih dalam -- dan tidak bisa kamu ubah sama sekali.")
print("")
print("  Batas yang tepat: cukup LUAS untuk memuat penyebabnya,")
print("  cukup SEMPIT untuk masih bisa kamu ubah.")


# --------------------------------------------
# 3. Umpan balik negatif: menstabilkan
# --------------------------------------------
def simulasi(sasaran, awal, jenis, penguat, langkah=12):
    nilai = awal
    riwayat = [nilai]
    for _ in range(langkah):
        selisih = sasaran - nilai
        if jenis == "negatif":
            nilai += penguat * selisih          # tarik KEMBALI ke sasaran
        elif jenis == "positif":
            nilai -= penguat * selisih          # dorong MENJAUH
        else:
            pass                                 # tanpa umpan balik
        riwayat.append(nilai)
    return riwayat


print("")
print("--- umpan balik: sasaran suhu 25 derajat, mulai dari 18 ---")
for jenis, penguat, ket in [
    ("tanpa",   0.0, "tidak ada yang menarik kembali"),
    ("negatif", 0.4, "termostat: menyala saat dingin, mati saat cukup"),
    ("positif", 0.4, "makin dingin makin didinginkan"),
]:
    riwayat = simulasi(25.0, 18.0, jenis, penguat)
    contoh = "  ".join("%.1f" % v for v in riwayat[:7])
    print("  " + jenis.ljust(9) + contoh + "  ...  akhir %.1f" % riwayat[-1])
    print("  " + " " * 9 + ket)

print("")
print("  'Negatif' BUKAN berarti buruk. Justru umpan balik")
print("  negatif yang membuat sistem BERTAHAN di sasarannya.")
print("  Umpan balik positif tak terkendali MENGHANCURKAN sistem --")
print("  suhunya lari menjauh dan tidak pernah kembali.")


# --------------------------------------------
# 4. Sifat emergent
# --------------------------------------------
print("")
print("--- sifat emergent ---")
EMERGENT = [
    ("roda, mesin, rangka", "mobil",     "bisa berpindah tempat"),
    ("satu neuron",         "otak",      "bisa berpikir"),
    ("satu semut",          "koloni",    "bisa membangun sarang"),
    ("satu halaman web",    "situs",     "bisa dinavigasi"),
]
print("  " + "bagian".ljust(22) + "keseluruhan".ljust(12) +
      "sifat yang MUNCUL")
for bagian, utuh, sifat in EMERGENT:
    print("  " + bagian.ljust(22) + utuh.ljust(12) + sifat)

print("")
print("  Tidak satu pun bagian punya sifat itu sendirian.")
print("  Karena itu sistem TIDAK BISA dipahami hanya dengan")
print("  membedah bagiannya: kamu bisa mengenal tiap komponen")
print("  dengan sempurna dan tetap tidak tahu apa yang akan")
print("  dilakukan sistemnya.")


# --------------------------------------------
# 5. Dekomposisi: memecah jadi subsistem
# --------------------------------------------
SISTEM = {
    "Sistem Informasi Akademik": {
        "Subsistem Registrasi": [
            "pendaftaran mahasiswa baru",
            "registrasi ulang tiap semester",
            "pengisian rencana studi",
        ],
        "Subsistem Perkuliahan": [
            "penjadwalan kelas",
            "pencatatan kehadiran",
            "penugasan dosen",
        ],
        "Subsistem Penilaian": [
            "entri nilai",
            "perhitungan IPK",
            "penerbitan transkrip",
        ],
        "Subsistem Keuangan": [
            "tagihan UKT",
            "pencatatan pembayaran",
            "beasiswa",
        ],
    }
}

print("")
print("--- dekomposisi jadi subsistem ---")
for induk, anak in SISTEM.items():
    print("  " + induk)
    for sub, fungsi in anak.items():
        print("      " + sub)
        for f in fungsi:
            print("          - " + f)


# --------------------------------------------
# 6. Menilai mutu pemecahan
# --------------------------------------------
print("")
print("--- menilai mutu pemecahan ---")

# Berapa subsistem lain yang harus ikut disentuh untuk satu perubahan?
PERUBAHAN = [
    ("Ubah format nomor mahasiswa",      1, 4),
    ("Tambah jenis beasiswa baru",       1, 3),
    ("Ubah rumus perhitungan IPK",       1, 2),
    ("Tambah kelas paralel",             1, 3),
]
print("  " + "perubahan".ljust(32) + "pecahan baik".rjust(13) +
      "pecahan buruk".rjust(15))
tb = tk = 0
for nama, baik, buruk in PERUBAHAN:
    tb += baik; tk += buruk
    print("  " + nama.ljust(32) + str(baik).rjust(13) + str(buruk).rjust(15))
print("  " + "TOTAL subsistem tersentuh".ljust(32) +
      str(tb).rjust(13) + str(tk).rjust(15))

print("")
print("  Pemecahan yang baik menghasilkan subsistem yang")
print("  BERKAITAN ERAT di dalam dan SEDIKIT bergantung ke luar.")
print("")
print("  Itu persis 'high cohesion, low coupling' yang kamu")
print("  pelajari di Rekayasa Perangkat Lunak -- dan itu bukan")
print("  kebetulan: RPL meminjam gagasannya dari TEORI SISTEM.")


# --------------------------------------------
# 7. Komponen sistem informasi
# --------------------------------------------
print("")
print("--- komponen sistem informasi ---")
KOMPONEN = [
    ("Perangkat keras", "peladen, jaringan, perangkat pengguna"),
    ("Perangkat lunak", "aplikasi, basis data, sistem operasi"),
    ("Data",            "isi yang disimpan dan diolah"),
    ("Prosedur",        "aturan cara memakai dan merawatnya"),
    ("Jaringan",        "penghubung antar-bagian"),
    ("MANUSIA",         "yang memasukkan, memakai, dan memutuskan"),
]
for nama, isi in KOMPONEN:
    tanda = "   <-- paling sering dilupakan" if nama == "MANUSIA" else ""
    print("  " + nama.ljust(18) + isi + tanda)

print("")
print("  Sistem yang sempurna secara teknis tetap GAGAL kalau")
print("  penggunanya tidak mau memakainya, tidak dilatih, atau")
print("  merasa pekerjaannya terancam. Itu bukan kegagalan")
print("  perangkat lunak -- itu kegagalan SISTEM.")`
  },

  output: `--- elemen sistem (contoh: gudang) ---
  Komponen     bagian penyusunnya
               -> rak, petugas, buku catatan
  Hubungan     cara komponen saling memengaruhi
               -> petugas mencatat tiap barang keluar
  Batas        garis pemisah dari lingkungan
               -> sampai pintu gudang saja
  Lingkungan   di luar batas, memengaruhi tapi tak dikendalikan
               -> pemasok, cuaca, permintaan pasar
  Tujuan       alasan sistem ada
               -> barang selalu tersedia saat dibutuhkan
  Masukan      yang diterima dari lingkungan
               -> kiriman barang, permintaan
  Proses       yang dilakukan terhadap masukan
               -> menyimpan, mencatat, mengeluarkan
  Keluaran     yang diserahkan ke lingkungan
               -> barang terkirim, laporan stok
  Umpan balik  keluaran yang jadi masukan lagi
               -> laporan stok memicu pemesanan ulang

--- menggeser batas mengubah jawaban yang MUNGKIN ---

  Sempit (gudang saja)
      terlihat    : 2 fakta
          - pencatatan meleset rata-rata 2 unit per minggu
          - rak penuh saat kiriman besar datang
      TIDAK terlihat: 3 fakta

  Sedang (gudang + pembelian)
      terlihat    : 3 fakta
          - pencatatan meleset rata-rata 2 unit per minggu
          - rak penuh saat kiriman besar datang
          - pemesanan ulang baru dibuat setelah stok NOL
      TIDAK terlihat: 2 fakta

  Luas (+ pemasok)
      terlihat    : 4 fakta
          - pencatatan meleset rata-rata 2 unit per minggu
          - rak penuh saat kiriman besar datang
          - pemesanan ulang baru dibuat setelah stok NOL
          - butuh 5 hari kerja sejak pesanan diterima
      TIDAK terlihat: 1 fakta

  Sangat luas (+ pasar)
      terlihat    : 5 fakta
          - pencatatan meleset rata-rata 2 unit per minggu
          - rak penuh saat kiriman besar datang
          - pemesanan ulang baru dibuat setelah stok NOL
          - butuh 5 hari kerja sejak pesanan diterima
          - permintaan naik 30% tiap akhir bulan

  Analisis dengan batas SEMPIT tidak salah hitung.
  Ia cuma TIDAK BISA MELIHAT sebab yang sesungguhnya,
  karena sebab itu ada di luar wilayah yang ia periksa.

  Tapi batas yang terlalu LUAS punya kegagalan sendiri:
  'permintaan naik 30% tiap akhir bulan' memang sebab
  yang lebih dalam -- dan tidak bisa kamu ubah sama sekali.

  Batas yang tepat: cukup LUAS untuk memuat penyebabnya,
  cukup SEMPIT untuk masih bisa kamu ubah.

--- umpan balik: sasaran suhu 25 derajat, mulai dari 18 ---
  tanpa    18.0  18.0  18.0  18.0  18.0  18.0  18.0  ...  akhir 18.0
           tidak ada yang menarik kembali
  negatif  18.0  20.8  22.5  23.5  24.1  24.5  24.7  ...  akhir 25.0
           termostat: menyala saat dingin, mati saat cukup
  positif  18.0  15.2  11.3  5.8  -1.9  -12.6  -27.7  ...  akhir -371.9
           makin dingin makin didinginkan

  'Negatif' BUKAN berarti buruk. Justru umpan balik
  negatif yang membuat sistem BERTAHAN di sasarannya.
  Umpan balik positif tak terkendali MENGHANCURKAN sistem --
  suhunya lari menjauh dan tidak pernah kembali.

--- sifat emergent ---
  bagian                keseluruhan sifat yang MUNCUL
  roda, mesin, rangka   mobil       bisa berpindah tempat
  satu neuron           otak        bisa berpikir
  satu semut            koloni      bisa membangun sarang
  satu halaman web      situs       bisa dinavigasi

  Tidak satu pun bagian punya sifat itu sendirian.
  Karena itu sistem TIDAK BISA dipahami hanya dengan
  membedah bagiannya: kamu bisa mengenal tiap komponen
  dengan sempurna dan tetap tidak tahu apa yang akan
  dilakukan sistemnya.

--- dekomposisi jadi subsistem ---
  Sistem Informasi Akademik
      Subsistem Registrasi
          - pendaftaran mahasiswa baru
          - registrasi ulang tiap semester
          - pengisian rencana studi
      Subsistem Perkuliahan
          - penjadwalan kelas
          - pencatatan kehadiran
          - penugasan dosen
      Subsistem Penilaian
          - entri nilai
          - perhitungan IPK
          - penerbitan transkrip
      Subsistem Keuangan
          - tagihan UKT
          - pencatatan pembayaran
          - beasiswa

--- menilai mutu pemecahan ---
  perubahan                        pecahan baik  pecahan buruk
  Ubah format nomor mahasiswa                 1              4
  Tambah jenis beasiswa baru                  1              3
  Ubah rumus perhitungan IPK                  1              2
  Tambah kelas paralel                        1              3
  TOTAL subsistem tersentuh                   4             12

  Pemecahan yang baik menghasilkan subsistem yang
  BERKAITAN ERAT di dalam dan SEDIKIT bergantung ke luar.

  Itu persis 'high cohesion, low coupling' yang kamu
  pelajari di Rekayasa Perangkat Lunak -- dan itu bukan
  kebetulan: RPL meminjam gagasannya dari TEORI SISTEM.

--- komponen sistem informasi ---
  Perangkat keras   peladen, jaringan, perangkat pengguna
  Perangkat lunak   aplikasi, basis data, sistem operasi
  Data              isi yang disimpan dan diolah
  Prosedur          aturan cara memakai dan merawatnya
  Jaringan          penghubung antar-bagian
  MANUSIA           yang memasukkan, memakai, dan memutuskan   <-- paling sering dilupakan

  Sistem yang sempurna secara teknis tetap GAGAL kalau
  penggunanya tidak mau memakainya, tidak dilatih, atau
  merasa pekerjaannya terancam. Itu bukan kegagalan
  perangkat lunak -- itu kegagalan SISTEM.`,

  kesalahanUmum: [
    {
      salah: 'Menganggap batas sistem sebagai sesuatu yang sudah ada dan tinggal ditemukan.',
      kenapa: 'Batas adalah pilihan analis, bukan sifat bawaan objeknya. Slide sendiri menyebut sistem sebagai konsep yang dibuat untuk memudahkan pemahaman, sehingga elemen dan batasnya harus disepakati lebih dulu, bukan diamati.',
      benar: 'Tetapkan batas secara sadar berdasarkan pertanyaan yang sedang dijawab, dan tuliskan apa yang berada di dalam dan di luarnya.'
    },
    {
      salah: 'Menarik batas sistem terlalu sempit lalu menyimpulkan penyebab masalahnya.',
      kenapa: 'Analisisnya bisa dilakukan dengan benar sepenuhnya dan tetap tidak mampu menemukan sebab yang sesungguhnya, karena sebab itu berada di luar wilayah yang disepakati untuk diperiksa. Akibatnya perbaikan dilakukan berulang tanpa masalahnya pernah hilang.',
      benar: 'Kalau sebuah masalah terus berulang meski sudah diperbaiki, periksa apakah batasnya terlalu sempit sebelum mencari perbaikan lain.'
    },
    {
      salah: 'Mengira umpan balik negatif itu buruk dan umpan balik positif itu baik.',
      kenapa: 'Istilahnya menunjuk arah, bukan penilaian. Umpan balik negatif menarik sistem kembali ke sasaran sehingga membuatnya stabil, sedangkan umpan balik positif mendorongnya makin menjauh dan kalau tak terkendali justru menghancurkan sistem.',
      benar: 'Baca negatif sebagai menstabilkan dan positif sebagai memperkuat, lalu nilai baik buruknya dari akibatnya pada tujuan sistem.'
    },
    {
      salah: 'Berusaha memahami sistem dengan membedah dan mempelajari setiap komponennya satu per satu.',
      kenapa: 'Sifat emergent muncul dari keseluruhan dan tidak dimiliki bagian mana pun, sehingga pengetahuan lengkap tentang tiap komponen tetap tidak memberi tahu apa yang akan dilakukan sistemnya. Satu neuron tidak berpikir, satu roda tidak berpindah tempat.',
      benar: 'Pelajari juga hubungan antar-komponen dan perilaku sistem saat berjalan utuh, bukan hanya daftar bagiannya.'
    },
    {
      salah: 'Menyamakan sistem informasi dengan perangkat lunaknya.',
      kenapa: 'Sistem informasi mencakup perangkat keras, perangkat lunak, data, prosedur, jaringan, dan manusia. Komponen manusia paling sering dilupakan mahasiswa Informatika, padahal sistem yang sempurna secara teknis tetap gagal kalau penggunanya tidak mau memakainya atau merasa terancam olehnya.',
      benar: 'Perlakukan pelatihan, prosedur kerja, dan penerimaan pengguna sebagai bagian dari sistem, bukan sebagai urusan di luar proyek.'
    }
  ],

  analogi: `Bayangkan kamu diminta memperbaiki **kemacetan di depan gerbang kampus**.

**Kalau kamu menetapkan batas sistemnya cuma di gerbang**, kamu akan melihat: satpam lambat memeriksa, palang terlalu sempit, motor menyerobot.

Kesimpulanmu: **tambah satpam dan lebarkan palang**. Kamu melakukannya. Dan macetnya **tetap ada**.

Bukan karena analisismu ceroboh. Kamu mengamati dengan teliti dan menyimpulkan dengan benar — **dari apa yang boleh kamu lihat**.

**Geser batasnya sampai satu kilometer sekitar kampus**, dan gambarnya berubah total: ternyata ada **lampu merah 200 meter sebelum gerbang** yang siklusnya panjang, sehingga kendaraan datang **bergerombol** — bukan mengalir.

Sekarang sebabnya kelihatan. Dan perbaikannya sama sekali berbeda: **atur ulang lampu merahnya**, bukan tambah satpam.

Sekarang **geser batasnya lagi sampai seluruh kota**. Kamu akan menemukan sebab yang lebih dalam lagi: **jam masuk kuliah bertabrakan dengan jam masuk kantor**.

Itu **benar** — dan **tidak ada satu pun yang bisa kamu perbaiki**. Kamu bukan wali kota.

Perhatikan polanya: **batas terlalu sempit → kamu memperbaiki hal yang salah. Batas terlalu luas → kamu menemukan sebab yang tidak bisa kamu sentuh.**

Batas yang tepat adalah yang **memuat penyebabnya dan masih berada dalam jangkauanmu**.

Sekarang **sifat emergent**. Bongkar gerbang itu sampai jadi tumpukan: palang, satpam, kamera, kartu, garis marka.

Tanyakan pada tumpukan itu: **"berapa lama antriannya?"**

Pertanyaannya **tidak punya arti**. Antrian bukan sifat palang, bukan sifat satpam. Ia muncul **hanya ketika semuanya bekerja bersama, dengan kendaraan yang datang**.

Dan terakhir, **komponen manusia**. Bayangkan kamu memasang sistem gerbang otomatis yang sempurna: kartu tap, palang naik dalam 0,3 detik, tanpa satpam.

Lalu satpam yang lama — yang kini kehilangan pekerjaannya — **berdiri di sebelah palang** dan tetap menghentikan orang untuk memeriksa kartu.

Sistemmu bekerja sempurna. **Kemacetannya tetap ada.**`,

  latihan: [
    'Sebutkan definisi sistem beserta sembilan elemennya, lalu terapkan pada sistem perpustakaan kampus.',
    'Jelaskan maksud pernyataan bahwa sistem adalah konsep yang dibuat untuk memudahkan pemahaman, dan apa akibatnya bagi cara menganalisis.',
    'Ambil satu masalah nyata di sekitarmu, lalu tunjukkan bagaimana kesimpulannya berubah ketika batas sistemnya digeser dari sempit ke luas.',
    'Jelaskan apa itu sifat emergent, dan berikan dua contoh selain yang ada di materi ini.',
    'Jelaskan perbedaan umpan balik negatif dan positif, lalu berikan satu contoh masing-masing dari sistem yang kamu pakai sehari-hari.',
    'Pecah sistem informasi perpustakaan menjadi subsistem, lalu nilai mutu pemecahanmu dengan menghitung berapa subsistem yang tersentuh untuk tiga jenis perubahan.',
    'Sebutkan enam komponen sistem informasi, dan jelaskan kenapa komponen manusia paling sering menjadi sebab kegagalan.'
  ]
});

TOPICS.push({
  id: 'sisfo-data-informasi',
  judul: 'Data, Informasi & Pengetahuan',
  kategori: 'sisfo',
  tag: ['data', 'informasi', 'pengetahuan', 'DIKW', 'kualitas informasi', 'nilai informasi'],
  ringkas: 'Angka yang sama bisa berharga atau tak berarti — yang menentukan adalah keputusan yang menunggunya.',

  fungsi: `**Memastikan yang kamu sajikan benar-benar membantu keputusan, bukan sekadar memindahkan angka.**

Terpakai di:

- **Merancang laporan dan dasbor** yang benar-benar dipakai
- **Menentukan data apa yang perlu dikumpulkan** — dan apa yang tidak
- **Menilai apakah sebuah fitur layak dibangun**
- **Bab analisis** tugas akhir

Kaidah yang paling menghemat: **informasi punya nilai hanya sejauh ia mengubah keputusan.**

Kalau setelah membaca laporan kamu melakukan hal yang sama persis dengan tanpa laporan itu, maka nilainya nol — betapa pun akurat dan mahalnya.

Dan pertentangan yang harus dipahami: **informasi tepat yang terlambat bernilai nol**, karena keputusannya sudah terlanjur diambil.`,

  praktik: {
    tujuan: `Kamu bisa menilai nilai bersih sebuah laporan, dan merancang laporan yang benar-benar mengubah tindakan.`,
    alat: [
      'Satu laporan yang pernah kamu buat atau terima'
    ],
    langkah: [
      { judul: 'Mulai dari keputusan, bukan dari data',
        isi: `Tulis: *"laporan ini membantu [siapa] memutuskan [apa], paling lambat [kapan]"*.

Kalau kamu tidak bisa mengisi ketiganya, laporannya belum punya tujuan.

Bagian **kapan** yang paling sering dilupakan, dan justru yang menentukan apakah laporannya berguna sama sekali.` },
      { judul: 'Uji tiap angka',
        isi: `Untuk setiap angka di laporanmu, tanyakan: **tindakan apa yang berubah karenanya?**

Yang tidak punya jawaban, hapus. Laporanmu jadi lebih pendek, dan justru lebih banyak yang tersampaikan.` },
      { judul: 'Tambahkan pembanding di setiap angka',
        isi: `Angka tunggal hampir tidak berarti.

*"45 juta"* menjadi *"45 juta, naik 12 persen dari bulan lalu, di bawah target 50 juta"*.

Ini cara termurah mengubah data menjadi informasi.` },
      { judul: 'Hitung nilai bersihnya',
        isi: `Perkirakan: berapa manfaat dari keputusan yang berubah, dan berapa biaya membuat serta memelihara laporannya.

Selisihnya bisa **negatif** — dan laporan yang bernilai negatif sebaiknya dihentikan, bukan diperindah.` },
      { judul: 'Periksa ketepatan waktunya',
        isi: `Bandingkan kapan laporanmu terbit dengan kapan keputusannya harus diambil.

Kalau terbit sesudahnya, akurasinya tidak menolong sama sekali.

Sering lebih baik menurunkan akurasi demi terbit lebih awal.` },
      { judul: 'Sertakan tindakan yang diharapkan',
        isi: `Jangan menyajikan angka lalu membiarkan pembaca menafsirkan sendiri.

*"Server 80 persen penuh"* bisa dibaca sebagai *"masih ada 20 persen, aman"*.

Tulis: *"Server 80 persen penuh; perlu ditambah kapasitas bulan ini"*.` },
      { judul: 'Ringkas sampai muat satu halaman',
        isi: `Paksa dirimu meringkas laporan menjadi satu halaman, dengan temuan penting di paling atas.

Bandingkan berapa banyak yang benar-benar dibaca orang dari versi panjang dan versi pendek.

Menambah isi bisa **mengurangi** informasi yang sampai.` }
    ],
    cek: [
      'Setiap angka di laporanmu terkait dengan satu tindakan',
      'Laporanmu terbit sebelum batas waktu keputusannya',
      'Baris pertama laporanmu berisi tindakan, bukan tabel'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa data bukan informasi',

  konsep: `
Slide membuka bab ini dengan pengakuan jujur: **konsep informasi sering tidak jelas dan bermakna ganda, bergantung pada konteks pembicaraannya.**

Yang dipakai di sini adalah tangga **DIKW** — *Data, Information, Knowledge, Wisdom*.

**Data**

**Fakta mentah** yang belum diolah dan **belum punya makna sendiri**.

\`38\`, \`Purwokerto\`, \`2026-08-21\` — semuanya data. Tidak satu pun berarti apa-apa tanpa keterangan tambahan.

**Informasi**

Data yang sudah **diolah dan diberi konteks**, sehingga **berarti bagi penerimanya**.

*"Suhu di Purwokerto pada 21 Agustus 2026 mencapai 38 derajat."* Sekarang ia berarti.

Perhatikan anak kalimat **"bagi penerimanya"**. Kalimat yang sama bisa menjadi informasi bagi petani dan **tetap sekadar data** bagi orang yang tidak berkepentingan.

**Informasi bukan sifat yang melekat pada data.** Ia hubungan antara data dan **orang yang membutuhkannya**.

**Pengetahuan**

Informasi yang sudah **dipahami polanya** dan bisa dipakai untuk **bertindak**.

*"Suhu di atas 37 derajat selama tiga hari berturut-turut membuat bibit padi gagal tumbuh."* Ini melampaui satu kejadian; ia **pola yang bisa diterapkan pada kejadian lain**.

**Kebijaksanaan**

Tahu **kapan dan apakah** pengetahuan itu **layak dipakai**, dengan mempertimbangkan nilai dan akibat.

*"Meski bisa memaksa panen dengan pendinginan buatan, biayanya melebihi hasilnya dan merusak tanah — lebih baik ganti jadwal tanam."*

**Proses komunikasi**

Slide menempatkan informasi dalam kerangka komunikasi:

- Ada **dua pihak atau lebih**: pengirim dan penerima
- Pengirim **mengirimkan pesan**
- Penerima **menerima dan menafsirkan** pesan
- Pesan disampaikan lewat **tanda, isyarat, atau simbol**

Kata **menafsirkan** itu penting. Pesan yang sampai **belum tentu** pesan yang dimaksud. Kalau penerima menafsirkan berbeda, informasinya **tidak tersampaikan** meski datanya utuh.

**Ciri informasi yang berkualitas**

- **Akurat** — bebas dari kesalahan
- **Tepat waktu** — tersedia **ketika masih bisa dipakai**
- **Lengkap** — memuat semua yang diperlukan
- **Relevan** — berhubungan dengan keputusan yang dihadapi
- **Ringkas** — tidak menenggelamkan yang penting
- **Terjangkau** — bisa didapat dengan usaha yang wajar
- **Dapat diverifikasi** — bisa diperiksa kebenarannya
- **Aman** — hanya sampai ke yang berhak

**Yang paling sering ditukar: akurat dan tepat waktu**

Keduanya sering **bertentangan**. Menunggu data lebih lengkap membuatnya lebih akurat, tetapi **lebih terlambat**.

Dan di sinilah kaidah yang menentukan: **informasi yang tepat tetapi terlambat bernilai NOL**, karena keputusannya sudah terlanjur diambil tanpa informasi itu.

Laporan penjualan yang 100 persen akurat dan terbit sebulan setelah keputusan diambil **tidak lebih berguna** daripada tidak ada laporan sama sekali.

**Nilai informasi**

Informasi punya nilai **hanya sejauh ia mengubah keputusan**.

Kalau setelah membaca laporan kamu **melakukan hal yang sama persis** dengan yang akan kamu lakukan tanpa laporan itu, maka laporan itu bernilai **nol** — betapa pun akurat dan mahalnya.

Karena itu pertanyaan yang benar sebelum membangun laporan bukan *"data apa yang kita punya?"*, melainkan **"keputusan apa yang sedang menunggu, dan apa yang bisa mengubahnya?"**

**Nilai bersih informasi** = manfaat perubahan keputusan − biaya mendapatkannya. Nilai ini **bisa negatif**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA "INFORMASI YANG TERLAMBAT BERNILAI NOL"\n#\n# Keputusan: berapa banyak stok dipesan untuk pekan depan.\n# Batas waktu memesan: Senin pukul 09.00.\n#\n#   Laporan A: akurasi  70%, terbit Sabtu\n#   Laporan B: akurasi 100%, terbit Selasa\n#\n# Laporan B LEBIH BAIK di setiap ukuran mutu --\n# kecuali satu: ia datang SETELAH keputusan diambil.\n#\n# Pada Senin pukul 09.00 kamu tetap harus memesan.\n# Kalau yang ada cuma laporan B, kamu memesan\n# dengan MENEBAK -- persis seperti tanpa laporan.\n#\n# Nilai informasi = seberapa besar ia MENGUBAH keputusan.\n# Yang datang setelah keputusan tidak mengubah apa pun.',
      penjelasan: `
Kaidah ini terdengar berlebihan sampai kamu memeriksanya dengan pertanyaan: **apa sebenarnya yang dibeli oleh informasi?**

Jawabannya: **perubahan keputusan**. Bukan pengetahuan, bukan rasa yakin — **perubahan tindakan**.

Kalau kamu membaca laporan lalu melakukan **hal yang sama persis** dengan yang akan kamu lakukan tanpanya, maka laporan itu **tidak membeli apa-apa**. Ia mungkin membuatmu lebih tenang, tetapi tidak mengubah apa pun di dunia.

Sekarang terapkan itu pada laporan yang terlambat.

Pada Senin pukul sembilan, keputusannya **harus diambil**. Kalau laporannya belum ada, kamu memesan berdasarkan tebakan. Laporan yang tiba Selasa **tidak bisa mengubah pesanan yang sudah dikirim**.

Jadi laporan itu **bernilai nol untuk keputusan ini** — bukan bernilai kecil, melainkan **nol**. Akurasinya seratus persen tidak menolong sama sekali.

Ini menjelaskan sesuatu yang sering membingungkan mahasiswa: **kenapa perusahaan mau memakai perkiraan kasar** padahal mereka mampu menghitung dengan tepat.

Bukan karena malas. Karena mereka menghitung **nilai bersih**:

- Perkiraan 70 persen yang datang tepat waktu → **mengubah keputusan** → bernilai
- Angka 100 persen yang datang terlambat → **tidak mengubah apa pun** → nol

Dan pertukaran ini muncul di mana-mana begitu kamu menyadarinya. Perkiraan cuaca, hasil hitung cepat pemilu, sistem pemantauan.

Ada satu akibat lanjutan yang layak dipegang, dan ia mengubah cara merancang laporan:

**Jangan mulai dari "data apa yang kita punya".** Mulailah dari **"keputusan apa yang sedang menunggu, kapan batas waktunya, dan apa yang bisa mengubahnya."**

Laporan yang dibangun dari data yang kebetulan tersedia cenderung berisi **hal yang mudah dihitung**, bukan hal yang **mengubah keputusan** — dan itulah sebabnya begitu banyak dasbor rapi yang tidak pernah dibuka orang.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Data -> Informasi -> Pengetahuan -> Kebijaksanaan
# ============================================

# --------------------------------------------
# 1. Tangga DIKW
# --------------------------------------------
TANGGA = [
    ("DATA", "fakta mentah, belum bermakna sendiri",
     "38  |  Purwokerto  |  2026-08-21"),
    ("INFORMASI", "data + konteks, berarti bagi PENERIMANYA",
     "Suhu di Purwokerto pada 21 Agustus 2026 mencapai 38 C"),
    ("PENGETAHUAN", "pola yang bisa dipakai bertindak",
     "Suhu di atas 37 C selama 3 hari membuat bibit padi gagal"),
    ("KEBIJAKSANAAN", "tahu KAPAN dan APAKAH layak dipakai",
     "Pendinginan buatan bisa, tapi biayanya melebihi hasil " +
     "dan merusak tanah -- lebih baik geser jadwal tanam"),
]

print("--- tangga DIKW ---")
for tingkat, arti, contoh in TANGGA:
    print("  " + tingkat)
    print("      arti   : " + arti)
    print("      contoh : " + contoh)


# --------------------------------------------
# 2. Data yang sama, informasi yang berbeda
# --------------------------------------------
print("")
print("--- data sama, tapi informasinya bergantung PENERIMA ---")
DATA = "Suhu Purwokerto 21 Agustus 2026: 38 C"
PENERIMA = [
    ("Petani padi",        True,  "menentukan hari ini menyiram atau tidak"),
    ("Panitia wisuda",     True,  "menentukan perlu tenda atau tidak"),
    ("Mahasiswa di Medan", False, "tidak ada keputusan yang menunggunya"),
    ("Penjual es",         True,  "menentukan berapa banyak stok"),
    ("Arsiparis",          False, "cuma dicatat, tidak mengubah tindakan"),
]
print("  data: " + DATA)
print("")
print("  " + "penerima".ljust(22) + "jadi informasi?".ljust(17) + "alasan")
for nama, jadi, alasan in PENERIMA:
    print("  " + nama.ljust(22) +
          ("YA" if jadi else "tidak, tetap data").ljust(17) + alasan)

print("")
print("  Informasi BUKAN sifat yang melekat pada data.")
print("  Ia hubungan antara data dan ORANG YANG MEMBUTUHKANNYA.")


# --------------------------------------------
# 3. Ciri informasi berkualitas
# --------------------------------------------
CIRI = [
    ("Akurat",          "bebas dari kesalahan"),
    ("Tepat waktu",     "tersedia KETIKA masih bisa dipakai"),
    ("Lengkap",         "memuat semua yang diperlukan"),
    ("Relevan",         "berhubungan dengan keputusan yang dihadapi"),
    ("Ringkas",         "tidak menenggelamkan yang penting"),
    ("Terjangkau",      "bisa didapat dengan usaha yang wajar"),
    ("Terverifikasi",   "bisa diperiksa kebenarannya"),
    ("Aman",            "hanya sampai ke yang berhak"),
]
print("")
print("--- ciri informasi berkualitas ---")
for nama, arti in CIRI:
    print("  " + nama.ljust(16) + arti)


# --------------------------------------------
# 4. Akurat vs tepat waktu: pertukaran yang nyata
# --------------------------------------------
print("")
print("--- akurat LAWAN tepat waktu ---")
print("  Keputusan: berapa stok dipesan untuk pekan depan.")
print("  Batas waktu memesan: Senin pukul 09.00")
print("")

LAPORAN = [
    ("Laporan A", 0.70, "Sabtu",  True),
    ("Laporan B", 0.85, "Minggu", True),
    ("Laporan C", 1.00, "Selasa", False),
]

# Kerugian salah pesan: makin tidak akurat, makin besar
BIAYA_SALAH = 20_000_000     # rupiah kalau memesan tanpa informasi apa pun

print("  " + "laporan".ljust(12) + "akurasi".rjust(9) +
      "terbit".rjust(9) + "sempat dipakai?".rjust(17) +
      "kerugian tersisa".rjust(19))
for nama, akurasi, terbit, sempat in LAPORAN:
    if sempat:
        sisa = BIAYA_SALAH * (1 - akurasi)
    else:
        sisa = BIAYA_SALAH          # sama sekali tidak menolong
    print("  " + nama.ljust(12) + ("%.0f%%" % (akurasi * 100)).rjust(9) +
          terbit.rjust(9) + ("ya" if sempat else "TIDAK").rjust(17) +
          ("Rp %s" % format(int(sisa), ",d").replace(",", ".")).rjust(19))

print("")
print("  Laporan C lebih baik di SETIAP ukuran mutu kecuali satu:")
print("  ia datang setelah keputusan diambil.")
print("")
print("  Dan satu itu membuat nilainya NOL -- bukan kecil,")
print("  melainkan NOL. Akurasi 100% tidak menolong sama sekali")
print("  kalau pesanannya sudah terkirim.")


# --------------------------------------------
# 5. Nilai informasi = seberapa besar ia MENGUBAH keputusan
# --------------------------------------------
print("")
print("--- nilai informasi ---")

KASUS = [
    ("Laporan stok harian",
     "pesan 100 unit", "pesan 40 unit",   3_500_000,   200_000),
    ("Laporan cuaca sepekan",
     "gelar acara luar", "pindah ke aula", 8_000_000,   150_000),
    ("Laporan warna favorit pelanggan",
     "stok warna biasa", "stok warna biasa",       0, 4_000_000),
    ("Dasbor jumlah klik per jam",
     "tidak berubah",   "tidak berubah",           0, 1_200_000),
]

print("  " + "informasi".ljust(32) + "manfaat".rjust(13) +
      "biaya".rjust(13) + "nilai bersih".rjust(15))
for nama, tanpa, dengan, manfaat, biaya in KASUS:
    bersih = manfaat - biaya
    rp = lambda x: "Rp " + format(int(x), ",d").replace(",", ".")
    tanda = "" if bersih > 0 else "   <-- RUGI"
    print("  " + nama.ljust(32) + rp(manfaat).rjust(13) +
          rp(biaya).rjust(13) + rp(bersih).rjust(15) + tanda)

print("")
print("  Dua yang terakhir bermanfaat NOL karena keputusannya")
print("  SAMA dengan atau tanpa informasi itu. Betapa pun akurat")
print("  dan rapi tampilannya, nilainya negatif -- ia cuma biaya.")
print("")
print("  Karena itu pertanyaan yang benar sebelum membangun")
print("  laporan BUKAN 'data apa yang kita punya?', melainkan")
print("  'KEPUTUSAN APA YANG SEDANG MENUNGGU, kapan batas")
print("  waktunya, dan apa yang bisa mengubahnya?'")


# --------------------------------------------
# 6. Penafsiran: pesan yang sampai vs yang dimaksud
# --------------------------------------------
print("")
print("--- pesan sampai belum tentu pesan yang dimaksud ---")
PESAN = [
    ("Stok menipis",
     "segera pesan ulang sekarang",
     "nanti saja, masih ada"),
    ("Penjualan turun 5%",
     "cari sebabnya, ini tidak wajar",
     "cuma 5 persen, wajar"),
    ("Server 80% penuh",
     "tambah kapasitas bulan ini",
     "masih ada 20 persen, aman"),
]
print("  " + "pesan".ljust(24) + "maksud pengirim".ljust(32) +
      "tafsir penerima")
for p, maksud, tafsir in PESAN:
    print("  " + p.ljust(24) + maksud.ljust(32) + tafsir)

print("")
print("  Datanya UTUH sampai, tapi informasinya TIDAK tersampaikan.")
print("  Karena itu informasi yang baik menyertakan apa yang")
print("  diharapkan dilakukan, bukan cuma angkanya.")


# --------------------------------------------
# 7. Ringkas: kenapa lebih banyak bisa lebih buruk
# --------------------------------------------
print("")
print("--- kenapa 'ringkas' termasuk ciri KUALITAS ---")
LAPORAN_PANJANG = [
    ("Laporan 2 halaman",  2, 3, 1.00),
    ("Laporan 20 halaman", 20, 3, 0.60),
    ("Laporan 80 halaman", 80, 3, 0.20),
]
print("  " + "laporan".ljust(22) + "halaman".rjust(9) +
      "temuan penting".rjust(16) + "peluang dibaca".rjust(16) +
      "temuan tersampaikan".rjust(21))
for nama, hal, penting, peluang in LAPORAN_PANJANG:
    sampai = penting * peluang
    print("  " + nama.ljust(22) + str(hal).rjust(9) +
          str(penting).rjust(16) + ("%.0f%%" % (peluang * 100)).rjust(16) +
          ("%.1f" % sampai).rjust(21))

print("")
print("  Ketiganya memuat temuan penting yang SAMA BANYAKNYA.")
print("  Yang berbeda cuma peluang temuan itu benar-benar dibaca.")
print("")
print("  Menambah isi bisa MENGURANGI informasi yang sampai.")
print("  Ini kebalikan dari dugaan orang, dan sering terjadi.")`
  },

  output: `--- tangga DIKW ---
  DATA
      arti   : fakta mentah, belum bermakna sendiri
      contoh : 38  |  Purwokerto  |  2026-08-21
  INFORMASI
      arti   : data + konteks, berarti bagi PENERIMANYA
      contoh : Suhu di Purwokerto pada 21 Agustus 2026 mencapai 38 C
  PENGETAHUAN
      arti   : pola yang bisa dipakai bertindak
      contoh : Suhu di atas 37 C selama 3 hari membuat bibit padi gagal
  KEBIJAKSANAAN
      arti   : tahu KAPAN dan APAKAH layak dipakai
      contoh : Pendinginan buatan bisa, tapi biayanya melebihi hasil dan merusak tanah -- lebih baik geser jadwal tanam

--- data sama, tapi informasinya bergantung PENERIMA ---
  data: Suhu Purwokerto 21 Agustus 2026: 38 C

  penerima              jadi informasi?  alasan
  Petani padi           YA               menentukan hari ini menyiram atau tidak
  Panitia wisuda        YA               menentukan perlu tenda atau tidak
  Mahasiswa di Medan    tidak, tetap datatidak ada keputusan yang menunggunya
  Penjual es            YA               menentukan berapa banyak stok
  Arsiparis             tidak, tetap datacuma dicatat, tidak mengubah tindakan

  Informasi BUKAN sifat yang melekat pada data.
  Ia hubungan antara data dan ORANG YANG MEMBUTUHKANNYA.

--- ciri informasi berkualitas ---
  Akurat          bebas dari kesalahan
  Tepat waktu     tersedia KETIKA masih bisa dipakai
  Lengkap         memuat semua yang diperlukan
  Relevan         berhubungan dengan keputusan yang dihadapi
  Ringkas         tidak menenggelamkan yang penting
  Terjangkau      bisa didapat dengan usaha yang wajar
  Terverifikasi   bisa diperiksa kebenarannya
  Aman            hanya sampai ke yang berhak

--- akurat LAWAN tepat waktu ---
  Keputusan: berapa stok dipesan untuk pekan depan.
  Batas waktu memesan: Senin pukul 09.00

  laporan       akurasi   terbit  sempat dipakai?   kerugian tersisa
  Laporan A         70%    Sabtu               ya       Rp 6.000.000
  Laporan B         85%   Minggu               ya       Rp 3.000.000
  Laporan C        100%   Selasa            TIDAK      Rp 20.000.000

  Laporan C lebih baik di SETIAP ukuran mutu kecuali satu:
  ia datang setelah keputusan diambil.

  Dan satu itu membuat nilainya NOL -- bukan kecil,
  melainkan NOL. Akurasi 100% tidak menolong sama sekali
  kalau pesanannya sudah terkirim.

--- nilai informasi ---
  informasi                             manfaat        biaya   nilai bersih
  Laporan stok harian              Rp 3.500.000   Rp 200.000   Rp 3.300.000
  Laporan cuaca sepekan            Rp 8.000.000   Rp 150.000   Rp 7.850.000
  Laporan warna favorit pelanggan          Rp 0 Rp 4.000.000  Rp -4.000.000   <-- RUGI
  Dasbor jumlah klik per jam               Rp 0 Rp 1.200.000  Rp -1.200.000   <-- RUGI

  Dua yang terakhir bermanfaat NOL karena keputusannya
  SAMA dengan atau tanpa informasi itu. Betapa pun akurat
  dan rapi tampilannya, nilainya negatif -- ia cuma biaya.

  Karena itu pertanyaan yang benar sebelum membangun
  laporan BUKAN 'data apa yang kita punya?', melainkan
  'KEPUTUSAN APA YANG SEDANG MENUNGGU, kapan batas
  waktunya, dan apa yang bisa mengubahnya?'

--- pesan sampai belum tentu pesan yang dimaksud ---
  pesan                   maksud pengirim                 tafsir penerima
  Stok menipis            segera pesan ulang sekarang     nanti saja, masih ada
  Penjualan turun 5%      cari sebabnya, ini tidak wajar  cuma 5 persen, wajar
  Server 80% penuh        tambah kapasitas bulan ini      masih ada 20 persen, aman

  Datanya UTUH sampai, tapi informasinya TIDAK tersampaikan.
  Karena itu informasi yang baik menyertakan apa yang
  diharapkan dilakukan, bukan cuma angkanya.

--- kenapa 'ringkas' termasuk ciri KUALITAS ---
  laporan                 halaman  temuan penting  peluang dibaca  temuan tersampaikan
  Laporan 2 halaman             2               3            100%                  3.0
  Laporan 20 halaman           20               3             60%                  1.8
  Laporan 80 halaman           80               3             20%                  0.6

  Ketiganya memuat temuan penting yang SAMA BANYAKNYA.
  Yang berbeda cuma peluang temuan itu benar-benar dibaca.

  Menambah isi bisa MENGURANGI informasi yang sampai.
  Ini kebalikan dari dugaan orang, dan sering terjadi.`,

  kesalahanUmum: [
    {
      salah: 'Memakai kata data dan informasi secara bergantian.',
      kenapa: 'Data adalah fakta mentah yang belum bermakna, sedangkan informasi adalah data yang sudah diberi konteks sehingga berarti bagi penerimanya. Menyamakan keduanya membuat orang mengira menumpuk data otomatis menghasilkan informasi, padahal yang bertambah cuma biaya penyimpanan.',
      benar: 'Uji dengan pertanyaan sederhana: apakah ini mengubah tindakan seseorang. Kalau tidak, ia masih data bagi orang itu.'
    },
    {
      salah: 'Menunda laporan demi akurasi yang lebih tinggi.',
      kenapa: 'Akurasi dan ketepatan waktu sering bertentangan, dan informasi yang tiba setelah keputusan diambil bernilai nol berapa pun akurasinya. Laporan sempurna yang terbit sehari setelah pesanan dikirim tidak lebih berguna daripada tidak ada laporan.',
      benar: 'Tetapkan batas waktu keputusannya lebih dulu, lalu cari akurasi tertinggi yang bisa dicapai sebelum batas itu.'
    },
    {
      salah: 'Membangun laporan berdasarkan data yang kebetulan tersedia.',
      kenapa: 'Laporan yang disusun dari ketersediaan data cenderung berisi hal yang mudah dihitung, bukan hal yang mengubah keputusan. Hasilnya dasbor rapi yang tidak pernah dibuka orang karena tidak ada tindakan yang bergantung padanya.',
      benar: 'Mulai dari keputusan yang sedang menunggu beserta batas waktunya, lalu cari data apa yang bisa mengubahnya.'
    },
    {
      salah: 'Menganggap laporan yang lebih lengkap selalu lebih berguna.',
      kenapa: 'Ringkas termasuk ciri kualitas informasi karena isi yang berlebihan menenggelamkan temuan penting. Laporan delapan puluh halaman dan laporan dua halaman bisa memuat temuan penting yang sama banyaknya, tetapi peluang temuan itu dibaca jauh berbeda.',
      benar: 'Letakkan temuan yang menuntut tindakan di depan, dan pindahkan rincian pendukung ke lampiran.'
    },
    {
      salah: 'Menyajikan angka saja tanpa menyebutkan apa yang diharapkan dilakukan.',
      kenapa: 'Penerima menafsirkan sendiri, dan tafsirnya bisa berlawanan dengan maksud pengirim. Peringatan bahwa server sudah delapan puluh persen penuh bisa dibaca sebagai masih ada dua puluh persen dan aman, sehingga datanya sampai utuh tetapi informasinya tidak tersampaikan.',
      benar: 'Sertakan tindakan yang diharapkan beserta batas waktunya, bukan hanya angkanya.'
    }
  ],

  analogi: `Bayangkan kamu **berdiri di depan papan jadwal kereta**.

**Data** adalah deretan di papan itu: \`07:15\`, \`Purwokerto\`, \`Peron 2\`, \`Terlambat 40 menit\`.

Bagi orang yang sekadar lewat, itu **cuma tulisan**. Ia melihatnya, dan tidak terjadi apa-apa dalam kepalanya.

**Informasi** muncul ketika kamu **punya tiket kereta 07:15 ke Purwokerto**. Deretan yang sama tiba-tiba berarti: *"aku punya waktu 40 menit ekstra."*

Perhatikan bahwa **papannya tidak berubah**. Yang berubah adalah **ada keputusan yang menunggu** di kepalamu.

**Pengetahuan** adalah apa yang kamu pelajari setelah bolak-balik naik kereta ini: *"kalau keberangkatan pagi sudah terlambat 40 menit, biasanya bertambah lagi jadi sekitar satu jam."*

Itu bukan lagi tentang hari ini. Itu **pola** — dan kamu bisa memakainya minggu depan.

**Kebijaksanaan** adalah tahu bahwa meski kamu **bisa** memaksakan berangkat sekarang dengan travel yang lebih mahal, hari ini kamu **tidak sedang terburu-buru**, dan uang itu lebih baik disimpan.

Sekarang bagian yang paling menentukan: **kenapa informasi terlambat bernilai nol**.

Bayangkan papan itu **baru menampilkan "Terlambat 40 menit"** pada pukul **07:20** — lima menit **setelah** jadwal keberangkatan.

Papannya **benar sepenuhnya**. Akurasinya sempurna. Dan **sama sekali tidak berguna** — karena kamu sudah berdiri di peron sejak 07:00, dan 40 menit itu **sudah terlanjur kamu habiskan berdiri**.

Bandingkan dengan papan yang pada 06:30 menampilkan **"kemungkinan terlambat"** — cuma dugaan, mungkin meleset. Tetapi kamu **masih di rumah**, dan kamu bisa memutuskan untuk sarapan dulu.

Dugaan yang datang tepat waktu **mengubah tindakanmu**. Kepastian yang datang terlambat **tidak mengubah apa pun**.

Dan terakhir, **kenapa laporan tebal bisa kalah dari laporan tipis**.

Bayangkan papan itu diganti: alih-alih menampilkan sepuluh kereta berikutnya, ia menampilkan **seluruh jadwal seharian, 240 baris**, dengan huruf kecil.

Semua informasimu **ada di sana**. Lengkap, akurat, terverifikasi.

Dan kamu **tetap ketinggalan kereta**, karena kamu tidak sempat menemukannya.`,

  latihan: [
    'Jelaskan keempat tingkat pada tangga DIKW beserta satu contoh masing-masing dari kehidupan kampusmu.',
    'Jelaskan kenapa data yang sama bisa menjadi informasi bagi satu orang dan tetap sekadar data bagi orang lain.',
    'Sebutkan delapan ciri informasi berkualitas beserta artinya.',
    'Jelaskan pertentangan antara akurat dan tepat waktu, lalu jelaskan kenapa informasi terlambat bernilai nol dan bukan sekadar bernilai kecil.',
    'Hitung nilai bersih sebuah laporan yang menghabiskan biaya dua juta rupiah dan mengubah keputusan sehingga menghemat lima juta rupiah.',
    'Beri satu contoh laporan yang akurat dan mahal tetapi bernilai nol, dan jelaskan kenapa.',
    'Jelaskan kenapa ringkas termasuk ciri kualitas informasi, dan bagaimana menambah isi bisa mengurangi informasi yang sampai.',
    'Tulis ulang pesan "Server 80% penuh" agar maksudnya tidak bisa ditafsirkan berlawanan.'
  ]
});

TOPICS.push({
  id: 'sisfo-klasifikasi',
  judul: 'Klasifikasi Sistem Informasi',
  kategori: 'sisfo',
  tag: ['TPS', 'MIS', 'DSS', 'EIS', 'ERP', 'tingkat manajemen', 'piramida'],
  ringkas: 'Kenapa direktur dan kasir butuh sistem yang berbeda — bukan sekadar tampilan yang berbeda.',

  fungsi: `**Merancang sistem yang sesuai dengan tingkat penggunanya.**

Terpakai di:

- **Menentukan lingkup** — sistem kasir dan dasbor pimpinan adalah dua proyek berbeda
- **Merancang tampilan** — rincian untuk operasional, ringkasan untuk pimpinan
- **Menjelaskan posisi sistemmu** saat sidang
- **Merencanakan urutan pembangunan** — yang bawah dulu

Yang paling sering salah: **memberi pimpinan data serinci mungkin**.

Itu terasa seperti memberi lebih, padahal ia menghambat. Yang langka di tingkat itu bukan kepastian, melainkan **perhatian**.

Dan satu kaidah urutan: **semua sistem tingkat atas memakan data dari sistem transaksi.** Kalau pencatatannya belum rapi, dasbor secantik apa pun menampilkan angka yang salah.`,

  praktik: {
    tujuan: `Kamu bisa menempatkan sistemmu pada tingkat yang tepat dan menyajikan data yang sesuai untuk tiap tingkat.`,
    alat: [
      'Kertas',
      'Data nyata untuk dicoba disajikan'
    ],
    langkah: [
      { judul: 'Tetapkan penggunanya dengan jelas',
        isi: `Tulis siapa yang akan membuka layar ini setiap hari, dan keputusan apa yang ia ambil.

Jawaban ini menentukan seluruh rancangan setelahnya.` },
      { judul: 'Sajikan data yang sama dalam tiga versi',
        isi: `Ambil satu kumpulan data, lalu buat tiga tampilan:

- **rincian per transaksi**, tepat sampai satuan terkecil
- **ringkasan per bagian atau per periode**
- **satu kalimat kesimpulan** beserta arah trennya

Melihat ketiganya berdampingan membuat perbedaan tingkatnya jelas.` },
      { judul: 'Uji ke pengguna yang berbeda',
        isi: `Tunjukkan ketiga versi ke orang yang berbeda perannya, dan tanyakan mana yang paling berguna.

Jawabannya akan berbeda, dan itu membuktikan bahwa tidak ada satu tampilan yang cocok untuk semua.` },
      { judul: 'Periksa sumber datanya',
        isi: `Untuk sistem tingkat strategis, periksa apakah kamu memakai data **dari luar** organisasi juga.

Kalau seluruhnya internal, sistemmu sebenarnya belum strategis — ia hanya bisa menjawab seberapa baik rencana lama dijalankan.` },
      { judul: 'Bedakan MIS dan DSS pada rancanganmu',
        isi: `Tanyakan: apakah pertanyaannya **sudah diketahui** sejak awal, atau **baru muncul** saat dipakai?

Yang pertama cukup laporan berkala. Yang kedua butuh kemampuan menguji skenario — dan itu DSS.

SAW, WP, dan TOPSIS yang kamu pelajari di SPK adalah **model di dalam** DSS.` },
      { judul: 'Pastikan pondasinya ada',
        isi: `Periksa apakah data transaksinya sudah tercatat rapi.

Kalau belum, bangun itu dulu. Membuat dasbor di atas pencatatan yang kacau menghasilkan angka yang salah dengan tampilan meyakinkan — dan itu lebih berbahaya daripada tidak ada dasbor.` },
      { judul: 'Periksa istilah yang diartikan berbeda',
        isi: `Tanyakan ke beberapa bagian: apa arti "pesanan selesai" atau "mahasiswa aktif" menurut mereka?

Jawaban yang berbeda adalah temuan penting — dan itulah yang membuat penerapan ERP sering gagal.

Menyamakan definisi harus dilakukan **sebelum** sistemnya dibangun.` }
    ],
    cek: [
      'Kamu punya tiga versi tampilan dari data yang sama',
      'Data transaksi yang menjadi sumber dasbormu sudah tercatat rapi',
      'Kamu sudah memeriksa apakah ada istilah yang diartikan berbeda antar bagian'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa tidak satu sistem saja',

  konsep: `
Organisasi punya **tingkatan manajemen**, dan tiap tingkat menghadapi **jenis keputusan yang berbeda**. Karena keputusannya berbeda, **kebutuhan informasinya juga berbeda** — dan karena itu sistemnya berbeda.

**Tiga tingkat manajemen**

- **Operasional** — menjalankan kegiatan sehari-hari. Keputusannya **terstruktur**: aturannya jelas, jawabannya bisa dihitung.
- **Taktis / menengah** — mengendalikan dan mengalokasikan sumber daya. Keputusannya **semi-terstruktur**.
- **Strategis / puncak** — menentukan arah jangka panjang. Keputusannya **tidak terstruktur**: tidak ada rumusnya.

**Bagaimana kebutuhan informasi berubah naik ke atas**

| Ciri | Operasional | Strategis |
|---|---|---|
| Sumber | **dalam** organisasi | banyak dari **luar** |
| Cakupan | sempit, satu bagian | luas, seluruh organisasi |
| Rincian | **sangat rinci** | **sangat ringkas** |
| Jangka waktu | hari ini, kemarin | tahunan, prakiraan |
| Kekinian | harus **sangat mutakhir** | boleh agak lama |
| Ketepatan | harus **tepat** | perkiraan sudah cukup |
| Frekuensi | terus-menerus | sesekali |

Perhatikan barisan **rincian** dan **ketepatan**. Keduanya **membalik** saat naik.

Kasir butuh angka **tepat sampai rupiah**. Direktur yang menerima angka setepat itu justru **tenggelam** — ia butuh *"penjualan turun sekitar 8 persen"*, bukan *"Rp 4.283.917.226"*.

Memberikan informasi yang terlalu rinci ke atas **bukan kemurahan hati**; ia **menghambat keputusan**.

**Jenis sistem informasi**

**TPS** — *Transaction Processing System*. Mencatat transaksi harian: penjualan, absensi, pendaftaran. Tingkat **operasional**.

Ini **pondasinya**. Semua sistem di atasnya memakan data yang dikumpulkan TPS. Kalau TPS-nya kacau, seluruh piramida di atasnya kacau.

**MIS** — *Management Information System*. Meringkas data TPS menjadi **laporan berkala** untuk manajemen menengah. Menjawab pertanyaan **rutin** yang sudah diketahui sebelumnya.

**DSS** — *Decision Support System*. Membantu keputusan **semi-terstruktur** lewat pemodelan dan analisis **"bagaimana jika"**.

Bedanya dengan MIS: **MIS menjawab pertanyaan yang sudah ditetapkan; DSS menjawab pertanyaan yang baru muncul.**

Inilah yang kamu bangun di mata kuliah SPK semester lalu — SAW, WP, TOPSIS adalah **model di dalam DSS**.

**EIS / ESS** — *Executive Information System*. Untuk manajemen puncak. Sangat **ringkas dan visual**, memuat indikator utama, dan **banyak menarik data dari luar** organisasi.

**ES** — *Expert System*. Meniru penalaran pakar lewat basis aturan. Berkaitan dengan Kecerdasan Buatan.

**OAS** — *Office Automation System*. Menunjang pekerjaan perkantoran: surel, pengolah kata, penjadwalan.

**Sistem lintas fungsi**

Sistem-sistem di atas dibagi **menurut tingkat**. Ada juga yang dibagi **menurut jangkauan**:

- **ERP** — *Enterprise Resource Planning*. Menyatukan seluruh fungsi (keuangan, produksi, SDM, persediaan) ke **satu basis data**.
- **CRM** — mengurus hubungan dengan pelanggan.
- **SCM** — mengurus rantai pasok, dari pemasok sampai pelanggan.

**Kenapa ERP begitu sulit dipasang**

Karena ia **memaksa seluruh bagian memakai satu definisi**.

Kalau bagian penjualan menghitung "pesanan selesai" saat barang dikirim, sementara bagian keuangan menghitungnya saat pembayaran lunas, maka ERP **memaksa mereka bersepakat**.

Dan kesepakatan itu **bukan persoalan teknis** — ia persoalan organisasi. Itulah sebab kegagalan penerapan ERP jauh lebih sering **bukan karena perangkat lunaknya**.

**Piramida itu bukan hierarki kekuasaan**

Salah paham yang lazim: mengira EIS "lebih hebat" daripada TPS.

Sebaliknya. **TPS yang paling penting** — kalau ia berhenti, perusahaan berhenti melayani pelanggan hari itu juga. Kalau EIS berhenti, direktur cukup menunggu sampai besok.

Piramida menggambarkan **jumlah pemakai dan tingkat keringkasan**, bukan tingkat kepentingan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA DIREKTUR TIDAK BOLEH DIBERI DATA MENTAH\n#\n# Data yang sama, disajikan untuk dua tingkat:\n#\n# UNTUK KASIR (operasional):\n#   Struk #A-88213  Rp 4.283.917.226 ... salah!\n#   -> butuh TEPAT sampai rupiah, per transaksi\n#\n# UNTUK DIREKTUR (strategis):\n#   "Penjualan turun 8% dibanding kuartal lalu,\n#    penurunan terbesar di wilayah timur"\n#   -> butuh RINGKAS, arah, dan pembanding\n#\n# Memberi direktur 4 juta baris transaksi bukan\n# kemurahan hati. Itu MENGHAMBAT keputusan:\n# waktu yang ia punya habis untuk meringkas sendiri\n# hal yang seharusnya sudah diringkas untuknya.',
      penjelasan: `
Pembalikan **rincian** dan **ketepatan** saat naik tingkat adalah bagian yang paling sering disalahpahami, dan alasannya bisa dipikirkan sampai tuntas.

Mulai dari pertanyaan: **apa yang langka pada tiap tingkat?**

Bagi kasir, yang langka adalah **kepastian**. Ia menangani satu transaksi pada satu waktu, dan angkanya **harus benar** — selisih seribu rupiah menjadi masalah nyata yang harus dipertanggungjawabkan.

Bagi direktur, yang langka adalah **perhatian**. Ia menghadapi puluhan keputusan besar dan tidak punya waktu membaca empat juta baris. Baginya, selisih seribu rupiah **tidak mengubah keputusan apa pun**.

Jadi keduanya **membeli hal yang berbeda** dengan informasi. Dan karena itu, informasi yang sama disajikan dengan cara yang berbeda **bukan penyederhanaan** — ia **penyesuaian terhadap kelangkaan yang berbeda**.

Sekarang perhatikan akibat yang lebih tajam: **memberi terlalu banyak rincian ke atas justru merugikan.**

Kalau direktur menerima empat juta baris, ia punya tiga pilihan, dan **ketiganya buruk**:

- **Meringkasnya sendiri** — memakai waktunya untuk pekerjaan yang seharusnya sudah dilakukan sistem
- **Mengabaikannya** — dan keputusannya diambil tanpa informasi sama sekali
- **Mengambil sampel acak** — dan menyimpulkan dari potongan yang mungkin tidak mewakili

Karena itu ada kaidah praktis: **naik satu tingkat, ringkas satu tingkat.** TPS mencatat per transaksi, MIS meringkas per hari atau per bagian, EIS meringkas per kuartal dan per wilayah.

Ada satu hal lagi yang membalik, dan sering dilupakan: **sumber datanya**.

Sistem operasional hampir seluruhnya memakai data **dari dalam** organisasi — transaksi sendiri, karyawan sendiri, stok sendiri.

Sistem strategis justru banyak memakai data **dari luar**: harga pesaing, tren pasar, peraturan baru, nilai tukar.

Ini masuk akal begitu dipikirkan. Keputusan operasional adalah *"bagaimana menjalankan yang sudah kita putuskan"* — jawabannya ada di dalam. Keputusan strategis adalah *"apakah yang kita putuskan masih tepat"* — dan itu **hanya bisa dijawab dengan melihat ke luar**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Klasifikasi sistem informasi menurut tingkat
# ============================================

# --------------------------------------------
# 1. Tiga tingkat manajemen
# --------------------------------------------
TINGKAT = [
    ("Strategis (puncak)", "menentukan arah jangka panjang",
     "tidak terstruktur", "Haruskah kita buka cabang di Yogyakarta?"),
    ("Taktis (menengah)",  "mengendalikan & mengalokasikan sumber daya",
     "semi-terstruktur", "Berapa staf yang perlu ditambah kuartal ini?"),
    ("Operasional (bawah)","menjalankan kegiatan sehari-hari",
     "terstruktur", "Berapa kembalian untuk pembayaran ini?"),
]

print("--- tiga tingkat manajemen ---")
for nama, tugas, jenis, contoh in TINGKAT:
    print("  " + nama)
    print("      tugas    : " + tugas)
    print("      keputusan: " + jenis)
    print("      contoh   : " + contoh)


# --------------------------------------------
# 2. Bagaimana kebutuhan informasi MEMBALIK
# --------------------------------------------
print("")
print("--- kebutuhan informasi berubah saat naik tingkat ---")
CIRI = [
    ("Sumber data",  "dalam organisasi",  "banyak dari LUAR"),
    ("Cakupan",      "sempit, satu bagian","luas, seluruh organisasi"),
    ("Rincian",      "SANGAT RINCI",      "SANGAT RINGKAS"),
    ("Jangka waktu", "hari ini, kemarin", "tahunan, prakiraan"),
    ("Kekinian",     "harus mutakhir",    "boleh agak lama"),
    ("Ketepatan",    "harus TEPAT",       "perkiraan sudah cukup"),
    ("Frekuensi",    "terus-menerus",     "sesekali"),
]
print("  " + "ciri".ljust(14) + "operasional".ljust(21) + "strategis")
for nama, ops, strat in CIRI:
    print("  " + nama.ljust(14) + ops.ljust(21) + strat)

print("")
print("  Perhatikan baris RINCIAN dan KETEPATAN: keduanya")
print("  MEMBALIK. Itu bukan penyederhanaan untuk atasan --")
print("  itu penyesuaian terhadap apa yang LANGKA di tiap")
print("  tingkat. Bagi kasir yang langka adalah kepastian;")
print("  bagi direktur yang langka adalah PERHATIAN.")


# --------------------------------------------
# 3. Data yang sama, disajikan untuk tiap tingkat
# --------------------------------------------
TRANSAKSI = [
    ("Barat",  "Jan", 1_240_000_000), ("Barat",  "Feb", 1_310_000_000),
    ("Barat",  "Mar", 1_180_000_000), ("Timur",  "Jan",   980_000_000),
    ("Timur",  "Feb",   860_000_000), ("Timur",  "Mar",   710_000_000),
    ("Tengah", "Jan", 1_050_000_000), ("Tengah", "Feb", 1_090_000_000),
    ("Tengah", "Mar", 1_020_000_000),
]

def rp(x):
    return "Rp " + format(int(x), ",d").replace(",", ".")

print("")
print("--- data yang SAMA untuk tiga tingkat ---")

print("")
print("  [TPS] operasional -- tiap catatan, tepat sampai rupiah:")
for w, b, n in TRANSAKSI[:4]:
    print("      %-8s %-4s %s" % (w, b, rp(n)))
print("      ... (%d catatan seluruhnya)" % len(TRANSAKSI))

print("")
print("  [MIS] taktis -- diringkas per wilayah, laporan berkala:")
per_wilayah = {}
for w, b, n in TRANSAKSI:
    per_wilayah[w] = per_wilayah.get(w, 0) + n
for w in sorted(per_wilayah, key=lambda k: -per_wilayah[k]):
    print("      %-8s %s" % (w, rp(per_wilayah[w])))

print("")
print("  [EIS] strategis -- satu kalimat + arah:")
jan = sum(n for w, b, n in TRANSAKSI if b == "Jan")
mar = sum(n for w, b, n in TRANSAKSI if b == "Mar")
ubah = (mar - jan) / jan * 100
turun = sorted(
    ((w, (sum(n for x, b, n in TRANSAKSI if x == w and b == "Mar")
          - sum(n for x, b, n in TRANSAKSI if x == w and b == "Jan"))
        / sum(n for x, b, n in TRANSAKSI if x == w and b == "Jan") * 100)
     for w in per_wilayah), key=lambda x: x[1])
print("      Penjualan %s %.0f%% dari Januari ke Maret." %
      ("turun" if ubah < 0 else "naik", abs(ubah)))
print("      Penurunan terbesar di wilayah %s (%.0f%%)." %
      (turun[0][0], turun[0][1]))

print("")
print("  Ketiganya berasal dari data yang SAMA PERSIS.")
print("  Yang berbeda adalah seberapa jauh ia diringkas.")


# --------------------------------------------
# 4. Apa jadinya kalau tingkatnya tertukar
# --------------------------------------------
print("")
print("--- kalau penyajiannya tertukar ---")
SALAH = [
    ("Direktur diberi 4 juta baris transaksi",
     "waktunya habis meringkas sendiri, atau diabaikan sama sekali"),
    ("Kasir diberi ringkasan 'penjualan turun 8%'",
     "tidak bisa memberi kembalian dari angka itu"),
    ("Manajer diberi angka tanpa pembanding",
     "tidak tahu 1,05 miliar itu bagus atau buruk"),
]
for keadaan, akibat in SALAH:
    print("  " + keadaan)
    print("      -> " + akibat)


# --------------------------------------------
# 5. Jenis sistem informasi
# --------------------------------------------
print("")
print("--- jenis sistem informasi ---")
JENIS = [
    ("TPS", "Transaction Processing System", "operasional",
     "mencatat transaksi harian", "kasir, absensi, pendaftaran"),
    ("OAS", "Office Automation System", "operasional",
     "menunjang pekerjaan kantor", "surel, pengolah kata, jadwal"),
    ("MIS", "Management Information System", "taktis",
     "laporan berkala dari data TPS", "laporan penjualan bulanan"),
    ("DSS", "Decision Support System", "taktis",
     "pemodelan & analisis 'bagaimana jika'", "SAW, WP, TOPSIS"),
    ("ES",  "Expert System", "taktis",
     "meniru penalaran pakar", "diagnosis awal penyakit"),
    ("EIS", "Executive Information System", "strategis",
     "indikator utama, ringkas & visual", "dasbor kinerja kuartalan"),
]
print("  " + "sing".ljust(5) + "kepanjangan".ljust(32) +
      "tingkat".ljust(13) + "gunanya")
for sing, panjang, tingkat, guna, contoh in JENIS:
    print("  " + sing.ljust(5) + panjang.ljust(32) +
          tingkat.ljust(13) + guna)
    print("  " + " " * 5 + " " * 32 + " " * 13 + "contoh: " + contoh)


# --------------------------------------------
# 6. MIS vs DSS: bedanya bukan kecanggihan
# --------------------------------------------
print("")
print("--- MIS vs DSS ---")
BEDA = [
    ("Pertanyaannya",  "sudah DITETAPKAN sebelumnya", "BARU MUNCUL saat itu"),
    ("Keluarannya",    "laporan berkala tetap",       "jawaban atas skenario"),
    ("Keputusannya",   "terstruktur - semi",          "semi-terstruktur"),
    ("Contoh",         "Berapa penjualan bulan ini?",
     "Kalau harga naik 10%, untungnya jadi berapa?"),
]
print("  " + "hal".ljust(16) + "MIS".ljust(30) + "DSS")
for hal, mis, dss in BEDA:
    print("  " + hal.ljust(16) + mis.ljust(30) + dss)

print("")
print("  Bedanya BUKAN kecanggihan teknologinya.")
print("  MIS menjawab pertanyaan yang SUDAH diketahui;")
print("  DSS menjawab pertanyaan yang BARU muncul.")
print("")
print("  SAW, WP, dan TOPSIS yang kamu pelajari di SPK adalah")
print("  MODEL DI DALAM sebuah DSS.")


# --------------------------------------------
# 7. Kenapa ERP sulit dipasang
# --------------------------------------------
print("")
print("--- kenapa ERP sering gagal ---")
print("  ERP menyatukan semua fungsi ke SATU basis data.")
print("  Artinya semua bagian harus memakai SATU definisi.")
print("")
DEFINISI = [
    ('"Pesanan selesai"', "Penjualan", "saat barang dikirim"),
    ('"Pesanan selesai"', "Keuangan",  "saat pembayaran lunas"),
    ('"Pesanan selesai"', "Gudang",    "saat barang keluar rak"),
    ('"Karyawan aktif"',  "SDM",       "yang belum mengundurkan diri"),
    ('"Karyawan aktif"',  "Keuangan",  "yang masih menerima gaji"),
]
print("  " + "istilah".ljust(20) + "bagian".ljust(12) + "artinya di sana")
for istilah, bagian, arti in DEFINISI:
    print("  " + istilah.ljust(20) + bagian.ljust(12) + arti)

print("")
print("  Ketiga bagian TIDAK SALAH. Definisi mereka masuk akal")
print("  untuk pekerjaan masing-masing.")
print("")
print("  ERP memaksa mereka BERSEPAKAT -- dan kesepakatan itu")
print("  bukan persoalan teknis, melainkan persoalan ORGANISASI.")
print("  Itulah sebab kegagalan penerapan ERP jauh lebih sering")
print("  BUKAN karena perangkat lunaknya.")


# --------------------------------------------
# 8. Piramida bukan hierarki kepentingan
# --------------------------------------------
print("")
print("--- kalau tiap sistem berhenti sehari ---")
DAMPAK = [
    ("TPS", "kasir tidak bisa melayani, absensi tak tercatat,",
            "perusahaan BERHENTI beroperasi hari itu juga"),
    ("MIS", "laporan bulanan terlambat sehari,",
            "manajer menunggu"),
    ("DSS", "analisis skenario tertunda,",
            "keputusan bisa diundur"),
    ("EIS", "dasbor direktur kosong,",
            "direktur menunggu sampai besok"),
]
for sing, akibat1, akibat2 in DAMPAK:
    print("  " + sing.ljust(5) + akibat1)
    print("  " + " " * 5 + akibat2)

print("")
print("  TPS-lah yang PALING PENTING, bukan EIS. Piramida")
print("  menggambarkan jumlah pemakai dan tingkat keringkasan,")
print("  BUKAN tingkat kepentingan.")
print("")
print("  Dan karena semua sistem di atasnya memakan data yang")
print("  dikumpulkan TPS, kalau TPS-nya kacau maka seluruh")
print("  piramida di atasnya ikut kacau -- serapi apa pun")
print("  tampilan dasbornya.")`
  },

  output: `--- tiga tingkat manajemen ---
  Strategis (puncak)
      tugas    : menentukan arah jangka panjang
      keputusan: tidak terstruktur
      contoh   : Haruskah kita buka cabang di Yogyakarta?
  Taktis (menengah)
      tugas    : mengendalikan & mengalokasikan sumber daya
      keputusan: semi-terstruktur
      contoh   : Berapa staf yang perlu ditambah kuartal ini?
  Operasional (bawah)
      tugas    : menjalankan kegiatan sehari-hari
      keputusan: terstruktur
      contoh   : Berapa kembalian untuk pembayaran ini?

--- kebutuhan informasi berubah saat naik tingkat ---
  ciri          operasional          strategis
  Sumber data   dalam organisasi     banyak dari LUAR
  Cakupan       sempit, satu bagian  luas, seluruh organisasi
  Rincian       SANGAT RINCI         SANGAT RINGKAS
  Jangka waktu  hari ini, kemarin    tahunan, prakiraan
  Kekinian      harus mutakhir       boleh agak lama
  Ketepatan     harus TEPAT          perkiraan sudah cukup
  Frekuensi     terus-menerus        sesekali

  Perhatikan baris RINCIAN dan KETEPATAN: keduanya
  MEMBALIK. Itu bukan penyederhanaan untuk atasan --
  itu penyesuaian terhadap apa yang LANGKA di tiap
  tingkat. Bagi kasir yang langka adalah kepastian;
  bagi direktur yang langka adalah PERHATIAN.

--- data yang SAMA untuk tiga tingkat ---

  [TPS] operasional -- tiap catatan, tepat sampai rupiah:
      Barat    Jan  Rp 1.240.000.000
      Barat    Feb  Rp 1.310.000.000
      Barat    Mar  Rp 1.180.000.000
      Timur    Jan  Rp 980.000.000
      ... (9 catatan seluruhnya)

  [MIS] taktis -- diringkas per wilayah, laporan berkala:
      Barat    Rp 3.730.000.000
      Tengah   Rp 3.160.000.000
      Timur    Rp 2.550.000.000

  [EIS] strategis -- satu kalimat + arah:
      Penjualan turun 11% dari Januari ke Maret.
      Penurunan terbesar di wilayah Timur (-28%).

  Ketiganya berasal dari data yang SAMA PERSIS.
  Yang berbeda adalah seberapa jauh ia diringkas.

--- kalau penyajiannya tertukar ---
  Direktur diberi 4 juta baris transaksi
      -> waktunya habis meringkas sendiri, atau diabaikan sama sekali
  Kasir diberi ringkasan 'penjualan turun 8%'
      -> tidak bisa memberi kembalian dari angka itu
  Manajer diberi angka tanpa pembanding
      -> tidak tahu 1,05 miliar itu bagus atau buruk

--- jenis sistem informasi ---
  sing kepanjangan                     tingkat      gunanya
  TPS  Transaction Processing System   operasional  mencatat transaksi harian
                                                    contoh: kasir, absensi, pendaftaran
  OAS  Office Automation System        operasional  menunjang pekerjaan kantor
                                                    contoh: surel, pengolah kata, jadwal
  MIS  Management Information System   taktis       laporan berkala dari data TPS
                                                    contoh: laporan penjualan bulanan
  DSS  Decision Support System         taktis       pemodelan & analisis 'bagaimana jika'
                                                    contoh: SAW, WP, TOPSIS
  ES   Expert System                   taktis       meniru penalaran pakar
                                                    contoh: diagnosis awal penyakit
  EIS  Executive Information System    strategis    indikator utama, ringkas & visual
                                                    contoh: dasbor kinerja kuartalan

--- MIS vs DSS ---
  hal             MIS                           DSS
  Pertanyaannya   sudah DITETAPKAN sebelumnya   BARU MUNCUL saat itu
  Keluarannya     laporan berkala tetap         jawaban atas skenario
  Keputusannya    terstruktur - semi            semi-terstruktur
  Contoh          Berapa penjualan bulan ini?   Kalau harga naik 10%, untungnya jadi berapa?

  Bedanya BUKAN kecanggihan teknologinya.
  MIS menjawab pertanyaan yang SUDAH diketahui;
  DSS menjawab pertanyaan yang BARU muncul.

  SAW, WP, dan TOPSIS yang kamu pelajari di SPK adalah
  MODEL DI DALAM sebuah DSS.

--- kenapa ERP sering gagal ---
  ERP menyatukan semua fungsi ke SATU basis data.
  Artinya semua bagian harus memakai SATU definisi.

  istilah             bagian      artinya di sana
  "Pesanan selesai"   Penjualan   saat barang dikirim
  "Pesanan selesai"   Keuangan    saat pembayaran lunas
  "Pesanan selesai"   Gudang      saat barang keluar rak
  "Karyawan aktif"    SDM         yang belum mengundurkan diri
  "Karyawan aktif"    Keuangan    yang masih menerima gaji

  Ketiga bagian TIDAK SALAH. Definisi mereka masuk akal
  untuk pekerjaan masing-masing.

  ERP memaksa mereka BERSEPAKAT -- dan kesepakatan itu
  bukan persoalan teknis, melainkan persoalan ORGANISASI.
  Itulah sebab kegagalan penerapan ERP jauh lebih sering
  BUKAN karena perangkat lunaknya.

--- kalau tiap sistem berhenti sehari ---
  TPS  kasir tidak bisa melayani, absensi tak tercatat,
       perusahaan BERHENTI beroperasi hari itu juga
  MIS  laporan bulanan terlambat sehari,
       manajer menunggu
  DSS  analisis skenario tertunda,
       keputusan bisa diundur
  EIS  dasbor direktur kosong,
       direktur menunggu sampai besok

  TPS-lah yang PALING PENTING, bukan EIS. Piramida
  menggambarkan jumlah pemakai dan tingkat keringkasan,
  BUKAN tingkat kepentingan.

  Dan karena semua sistem di atasnya memakan data yang
  dikumpulkan TPS, kalau TPS-nya kacau maka seluruh
  piramida di atasnya ikut kacau -- serapi apa pun
  tampilan dasbornya.`,

  kesalahanUmum: [
    {
      salah: 'Mengira sistem di puncak piramida lebih penting daripada yang di bawah.',
      kenapa: 'Kalau TPS berhenti, perusahaan berhenti melayani pelanggan hari itu juga, sedangkan kalau EIS berhenti direktur cukup menunggu sampai besok. Piramida menggambarkan jumlah pemakai dan tingkat keringkasan, bukan tingkat kepentingan.',
      benar: 'Perlakukan TPS sebagai pondasi yang harus paling andal, karena semua sistem di atasnya memakan data yang ia kumpulkan.'
    },
    {
      salah: 'Memberikan data serinci mungkin kepada manajemen puncak dengan anggapan makin lengkap makin baik.',
      kenapa: 'Yang langka di tingkat itu bukan kepastian melainkan perhatian. Direktur yang menerima jutaan baris hanya punya tiga pilihan yang semuanya buruk: meringkas sendiri, mengabaikannya, atau menyimpulkan dari potongan yang mungkin tidak mewakili.',
      benar: 'Ringkas satu tingkat setiap naik satu tingkat, dan sertakan pembanding agar angkanya punya arti.'
    },
    {
      salah: 'Menganggap DSS sekadar versi MIS yang lebih canggih.',
      kenapa: 'Perbedaannya bukan pada teknologi melainkan pada jenis pertanyaannya. MIS menjawab pertanyaan rutin yang sudah ditetapkan sebelumnya, sedangkan DSS menjawab pertanyaan baru yang muncul saat itu lewat pemodelan dan analisis bagaimana jika.',
      benar: 'Pilih MIS untuk laporan berkala yang bentuknya tetap, dan DSS ketika penggunanya perlu menguji skenario yang belum terpikirkan saat sistem dibuat.'
    },
    {
      salah: 'Memandang kegagalan penerapan ERP sebagai masalah teknis perangkat lunak.',
      kenapa: 'ERP memaksa seluruh bagian memakai satu definisi untuk istilah yang selama ini mereka artikan berbeda-beda sesuai pekerjaan masing-masing. Kesepakatan semacam itu adalah persoalan organisasi, dan ia tidak selesai dengan mengganti vendor atau menambah pengembang.',
      benar: 'Selesaikan penyamaan definisi dan proses kerja lebih dulu, dan anggarkan waktu untuk itu sebagai bagian utama proyek.'
    },
    {
      salah: 'Merancang sistem strategis yang hanya memakai data dari dalam organisasi.',
      kenapa: 'Keputusan strategis menanyakan apakah arah yang dipilih masih tepat, dan itu hanya bisa dijawab dengan melihat harga pesaing, tren pasar, peraturan baru, dan nilai tukar. Data internal saja hanya bisa menjawab seberapa baik kita menjalankan rencana lama.',
      benar: 'Sertakan sumber data eksternal pada sistem tingkat strategis, dan bedakan dengan tegas dari sistem operasional yang memang cukup memakai data internal.'
    }
  ],

  analogi: `Bayangkan sebuah **kapal**.

Di **ruang mesin** ada teknisi. Ia melihat **tekanan, suhu, putaran** — angka yang berubah tiap detik dan **harus tepat**. Kalau tekanannya 4,2 bar dan ia membacanya 4,8, mesinnya bisa rusak.

Yang langka baginya adalah **kepastian**.

Di **anjungan** ada nakhoda. Ia **tidak melihat tekanan bar**. Ia melihat **kecepatan, arah, sisa bahan bakar, jarak ke pelabuhan** — dan ia melihatnya dalam **angka bulat**.

Yang langka baginya adalah **perhatian**: ada karang di kanan, badai di depan, dan jadwal yang harus dikejar.

Sekarang bayangkan kamu **memasang layar ruang mesin di anjungan** — lengkap, 400 angka yang berubah tiap detik, semuanya akurat.

Kamu merasa sudah membantu. **Sebaliknya**: nakhoda kini harus menyaring 400 angka untuk menemukan satu yang penting, sementara karangnya makin dekat.

Kamu tidak memberinya lebih banyak informasi. Kamu **mengambil waktunya**.

Dan sebaliknya juga berlaku: beri teknisi kalimat *"mesin bekerja sekitar 90 persen normal"*, dan ia **tidak bisa berbuat apa-apa** dengan itu. Ia perlu tahu **komponen mana**.

Sekarang perhatikan **dari mana keduanya melihat**.

Teknisi melihat **ke dalam** kapal — semua yang ia butuhkan ada di ruang mesin. Pertanyaannya: *"apakah mesin ini berjalan sebagaimana mestinya?"*

Nakhoda banyak melihat **ke luar** — cuaca, kapal lain, mercusuar, laporan pelabuhan. Pertanyaannya berbeda: *"apakah tujuan yang kita pilih masih tepat?"*

Dan itu **tidak bisa dijawab dari dalam ruang mesin**, betapa pun sempurna mesinnya berjalan.

Terakhir, **siapa yang paling penting**.

Kalau **layar anjungan mati** satu hari, nakhoda memakai peta kertas dan kompas. Kapalnya **tetap berlayar**.

Kalau **mesinnya mati** satu hari, tidak ada yang bisa dilakukan siapa pun di anjungan.

Piramida itu **bukan tangga kekuasaan**. Ia gambaran tentang **seberapa jauh sesuatu diringkas** — dan yang paling bawah justru yang paling tidak boleh berhenti.`,

  latihan: [
    'Sebutkan tiga tingkat manajemen beserta jenis keputusan dan satu contoh pertanyaan pada masing-masing.',
    'Jelaskan bagaimana ciri rincian dan ketepatan membalik saat naik tingkat, dan jelaskan alasannya.',
    'Sebutkan enam jenis sistem informasi beserta tingkat dan kegunaannya.',
    'Jelaskan perbedaan MIS dan DSS, dan tunjukkan di mana letak SAW, WP, serta TOPSIS yang kamu pelajari di SPK.',
    'Jelaskan kenapa penerapan ERP sering gagal, dan beri satu contoh istilah yang diartikan berbeda oleh dua bagian.',
    'Jelaskan kenapa sistem strategis banyak memakai data dari luar organisasi sedangkan sistem operasional tidak.',
    'Jelaskan kenapa TPS lebih penting daripada EIS, dan apa yang digambarkan piramida sistem informasi kalau bukan tingkat kepentingan.',
    'Ambil satu data penjualan dan sajikan tiga versi: untuk TPS, MIS, dan EIS.'
  ]
});


/* ============================================================
   Tambahan Sistem Informasi — lima topik dari materi yang
   belum tercakup:
     - PPSI03 Pengantar Teori Organisasi dan Manajemen
     - Pertemuan 5  Sistem Informasi & CBIS
     - PPSI07 Business Information Systems + Pertemuan 12
     - Pertemuan 10 Manajemen Database
     - Week 12 Resource Planning & Budgeting
   ============================================================ */

TOPICS.push({
  id: 'sisfo-organisasi-manajemen',
  judul: 'Organisasi & Manajemen',
  kategori: 'sisfo',
  tag: ['organisasi', 'struktur organisasi', 'rentang kendali', 'manajemen', 'Fayol', 'Mintzberg', 'efektivitas'],
  ringkas: 'Kenapa bentuk organisasi menentukan kecepatan keputusan — dan kenapa sistem informasi selalu menabrak strukturnya.',

  fungsi: `**Memahami organisasi yang akan memakai sistemmu — karena strukturnya menentukan apakah sistemmu dipakai atau dilewati.**

Terpakai di:

- **Merancang alur persetujuan** yang cocok dengan rantai komando yang ada
- **Menentukan hak akses** — siapa boleh melihat data siapa
- **Menjelaskan penolakan** terhadap sistem baru, dan menanganinya
- **Bab analisis** — profil organisasi hampir selalu diminta
- **Karier sendiri** — keterampilan yang membawamu masuk bukan yang membawamu naik

Yang paling sering menyelamatkan proyek: **penolakan terhadap sistem baru biasanya masuk akal.**

Sistem informasi melebarkan rentang kendali yang sanggup ditangani satu manajer, dan itu memangkas tingkat organisasi. Orang yang menempati tingkat itu menolak karena ancamannya nyata — bukan karena tidak paham teknologi.

Dan satu kaidah yang menghemat banyak waktu: **kalau alur persetujuan di sistemmu tidak cocok dengan wewenang yang sebenarnya, orang akan melewatinya** — dan datamu berhenti mencerminkan kenyataan.`,

  praktik: {
    tujuan: `Kamu punya peta struktur dan wewenang organisasi yang jadi dasar rancangan sistemmu, dan tahu siapa yang akan menolak beserta alasannya.`,
    alat: [
      'Bagan organisasi resmi',
      'Kertas',
      'Akses untuk mewawancarai beberapa orang'
    ],
    langkah: [
      { judul: 'Ambil bagan resminya, lalu jangan percaya sepenuhnya',
        isi: `Bagan menggambarkan organisasi **formal**. Yang menentukan sering yang **informal**.

Tanyakan ke beberapa orang: *"sebelum memutuskan hal ini, biasanya kamu bertanya ke siapa?"*

Gambar jawabannya di atas bagan resmi dengan garis putus-putus. Selisih antara kedua peta itu adalah temuanmu.` },
      { judul: 'Hitung rentang kendali yang berlaku',
        isi: `Untuk tiap atasan di bagan, hitung berapa orang melapor langsung.

Angka yang sangat berbeda antar bagian adalah pertanyaan: kenapa yang satu sanggup 12 dan yang lain cuma 3?

Jawabannya biasanya salah satu dari tujuh faktor — dan yang paling sering **kualitas jalur informasinya**.` },
      { judul: 'Hitung berapa tingkat yang dilewati satu keputusan',
        isi: `Ambil satu keputusan nyata, lalu hitung berapa tanda tangan yang dibutuhkan.

Kalikan dengan waktu rata-rata tiap tanda tangan.

Angka ini biasanya mengejutkan orang di dalam organisasinya sendiri, karena tidak ada yang pernah menghitungnya utuh.` },
      { judul: 'Kenali tipe organisasinya',
        isi: `Fungsional, produk, atau matriks?

Kalau **matriks**, siapkan diri: tiap orang punya dua atasan, dan sistemmu harus bisa menangani persetujuan dari dua jalur yang bisa **bertentangan**.

Ini bukan kasus langka; matriks lazim di organisasi berbasis proyek.` },
      { judul: 'Uji rancanganmu dengan pertanyaan efektivitas',
        isi: `Untuk tiap fitur, tanyakan dua hal terpisah:

- **efektif?** apakah ia mengerjakan hal yang benar
- **efisien?** apakah caranya hemat

Fitur yang efisien tapi tidak efektif adalah yang paling berbahaya, karena laporannya terlihat bagus.` },
      { judul: 'Petakan siapa yang dirugikan',
        isi: `Untuk tiap bagian sistemmu, tulis siapa yang **kehilangan** sesuatu: informasi yang tadinya cuma ia yang punya, persetujuan yang tadinya lewat mejanya, atau peran yang jadi tidak perlu.

Daftar ini memperkirakan penolakan lebih tepat daripada tebakan apa pun.` },
      { judul: 'Bicarakan perubahan perannya secara terbuka',
        isi: `Untuk tiap orang di daftar itu, siapkan jawaban: perannya berubah menjadi apa.

Menutupinya tidak berhasil — orang menyadarinya lebih cepat daripada yang kamu kira, dan kepercayaan yang hilang lebih mahal daripada penolakan yang terbuka.` }
    ],
    cek: [
      'Kamu punya dua peta: jalur formal dan jalur informasi yang nyata',
      'Alur persetujuan di sistemmu cocok dengan wewenang yang sebenarnya',
      'Kamu punya daftar siapa yang kehilangan sesuatu, beserta peran barunya'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa sistem informasi selalu menabrak struktur',

  konsep: `
Sistem informasi tidak pernah dipasang ke ruang kosong. Ia dipasang ke dalam **organisasi** yang sudah punya struktur, kebiasaan, dan pembagian kekuasaan. Karena itu memahami organisasi bukan bahan pelengkap di mata kuliah ini — ia yang menjelaskan kenapa sistem yang benar secara teknis bisa gagal.

**Apa itu organisasi**

Dua orang atau lebih yang bekerja sama **dengan cara yang terstruktur** untuk mencapai sasaran tertentu [Stoner]. Barnard menekankan bahwa aktivitasnya **dikoordinasikan secara sadar dan disengaja**.

Kata kuncinya *terstruktur* dan *disengaja*. Sekumpulan orang yang kebetulan berada di tempat yang sama bukan organisasi.

- **Organisasi formal** — struktur, peran, dan tujuannya jelas dan terdokumentasi
- **Organisasi informal** — terbentuk sendiri dari interaksi sehari-hari, tidak tertulis

Yang informal **selalu ada**, bahkan di organisasi yang paling formal sekalipun. Dan ia sering lebih menentukan apa yang benar-benar terjadi daripada bagan resminya.

**Dua cara memandang organisasi**

- **Perspektif tindakan** (*action*, dari bawah ke atas) — organisasi dibangun oleh aktivitas individu di dalamnya. Gambarannya **subjektif**, berbeda bagi tiap orang. Fokusnya pada **proses berorganisasi**.
- **Perspektif kelembagaan** (*institutional*, dari atas ke bawah) — organisasi punya struktur sosial yang **tidak bergantung** pada siapa individunya, dan justru struktur itulah yang membentuk tindakan orang. Fokusnya pada **fungsi organisasi secara keseluruhan**.

Giddens menyatukan keduanya lewat **teori strukturasi**: struktur sosial tercipta karena tindakan manusia, dan tindakan manusia dibentuk oleh struktur sosial. Ini **lingkaran**, bukan satu arah.

Untuk kita, ini bukan sekadar teori. Ia menjelaskan kenapa mengubah sistem informasi **mengubah organisasinya juga** — karena sistem adalah bagian dari struktur yang membentuk tindakan orang.

**Tiga aspek formal struktur organisasi**

- **Pembagian kerja** (*division of labour*) — siapa mengerjakan apa. Lebih tepat disebut pembagian **pekerjaan**, karena yang dibagi pekerjaannya, bukan orangnya.
- **Rantai komando dan kendali** — hierarki, wewenang, siapa melapor ke siapa
- **Aturan dan prosedur** — cara kerja yang ditetapkan secara tertulis

Spesialisasi yang **terlalu sempit** justru merugikan: pekerjanya merasa terasing dan mudah bosan. Efisiensi teknis dan ketahanan manusia berlawanan arah di titik tertentu.

**Rentang kendali menentukan bentuknya**

*Span of control* adalah berapa banyak bawahan yang melapor langsung ke satu atasan. Angka ini menentukan **seluruh bentuk organisasi**, dan pertukarannya tajam:

| | Rentang lebar | Rentang sempit |
|---|---|---|
| Jumlah tingkat | **sedikit** | **banyak** |
| Jumlah manajer | sedikit | banyak |
| Kecepatan keputusan | **cepat** | lambat |
| Perhatian ke bawahan | kurang | cukup |
| Biaya | rendah | tinggi |

Faktor yang mempengaruhinya: kemampuan bawahan, kejelasan pendelegasian wewenang, kejelasan perencanaan, laju perubahan organisasi, teknik komunikasi, dan banyaknya kontak pribadi.

Perhatikan **teknik komunikasi** — di situlah sistem informasi masuk. Sistem informasi yang baik **melebarkan rentang kendali yang sanggup ditangani seorang manajer**, dan dengan begitu **memangkas tingkat** organisasinya.

Ini bukan akibat sampingan. Ini salah satu dampak sistem informasi terhadap organisasi yang paling nyata, dan paling sering menimbulkan penolakan — karena tingkat yang dipangkas berisi orang.

**Tiga tipe organisasi**

- **Fungsional** — dibagi menurut fungsi: keuangan, produksi, pemasaran, personalia. Paling sederhana dan mudah diawasi. Cocok untuk satu lokasi atau satu produk.
- **Produk / pasar** — dibagi menjadi divisi semi-otonom per produk, pasar, atau wilayah. Kelemahannya: kepentingan divisi bisa mengalahkan kepentingan organisasi.
- **Matriks** — punya **dua struktur sekaligus**: fungsional (tegak) dan proyek (mendatar). Tiap orang punya **dua atasan**. Luwes dan efisien untuk menyatukan keahlian khusus, tetapi menuntut kemampuan komunikasi yang tinggi.

Perhatikan bahwa matriks **melanggar prinsip kesatuan perintah** Fayol dengan sengaja. Prinsip lama tidak selalu menang; ia ditinggalkan ketika biayanya lebih besar daripada manfaatnya.

**Manajemen: efisiensi dan efektivitas**

Manajemen adalah proses bekerja **bersama dan melalui orang lain** untuk mencapai tujuan organisasi secara efektif dan efisien [Kreitner].

- **Efisiensi** — memakai sesedikit mungkin sumber daya; *doing things right*
- **Efektivitas** — mencapai tujuan yang benar; *doing the right thing*

Keduanya **bukan hal yang sama**, dan yang paling berbahaya adalah **efisien tetapi tidak efektif**: mengerjakan hal yang salah dengan sangat rapi, hemat, dan terukur. Kegagalan seperti ini paling sulit dilihat, karena semua laporannya terlihat bagus.

**Lima fungsi manajemen**

Fayol (1916) menyebut lima; versi yang dipakai sekarang: **Planning, Organizing, Staffing, Leading, Controlling**.

Yang penting bukan menghafalnya, melainkan melihat bahwa **porsinya berbeda per jenjang**: manajer puncak lebih banyak merencanakan, manajer garis pertama lebih banyak mengarahkan orang secara langsung.

**Tiga jenjang manajer**

- **Puncak** — perencanaan strategis
- **Menengah** — pengendalian manajemen
- **Garis pertama** — pengendalian operasional

Ketiga jenjang ini **memetakan langsung** ke piramida sistem informasi: EIS, MIS, TPS. Bukan kebetulan — sistemnya dibangun mengikuti kebutuhan jenjangnya.

**Sepuluh peran manajer** [Mintzberg, 1970]

- **Antar-pribadi** — tokoh (*figurehead*), pemimpin, penghubung
- **Informasi** — pemantau, penyebar, juru bicara
- **Keputusan** — wirausahawan, penangan gangguan, pengalokasi sumber daya, perunding

Tiga dari sepuluh perannya adalah **peran informasi**. Ini alasan langsung kenapa sistem informasi begitu berpengaruh pada pekerjaan manajer: ia menyentuh sepertiga perannya secara langsung.

**Empat keterampilan manajer**

Manajerial, teknis, manusia (*human*), dan konseptual. Makin ke atas, keterampilan **teknis** makin kurang dipakai dan keterampilan **konseptual** makin menentukan.

Bagi mahasiswa Informatika ini penting disadari lebih awal: keterampilan yang membawamu masuk **bukan** keterampilan yang membawamu naik.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# RENTANG KENDALI MENENTUKAN JUMLAH TINGKAT\n#\n# 4096 pelaksana, rentang kendali 4:\n#   4096 -> 1024 -> 256 -> 64 -> 16 -> 4 -> 1\n#   6 tingkat, 1365 manajer\n#\n# 4096 pelaksana, rentang kendali 16:\n#   4096 -> 256 -> 16 -> 1\n#   3 tingkat, 273 manajer\n#\n# Jumlah tingkat = log(pelaksana) / log(rentang)\n#\n# Karena hubungannya LOGARITMIK, melebarkan rentang\n# sedikit saja memangkas tingkat cukup banyak. Dan\n# tiap tingkat yang hilang berarti satu lapis\n# persetujuan yang tidak perlu dilewati lagi.',
      penjelasan: `
Hubungan antara rentang kendali dan jumlah tingkat itu **logaritmik**, dan akibatnya jauh lebih besar daripada yang terlihat.

Kalau tiap atasan membawahi \`r\` orang, maka tiap naik satu tingkat jumlah orangnya **dibagi \`r\`**. Untuk mencapai satu orang di puncak dari \`n\` pelaksana, dibutuhkan sekitar \`log n / log r\` tingkat.

Angkanya bicara sendiri. Untuk 4096 pelaksana:

- rentang **2** → **12** tingkat
- rentang **4** → **6** tingkat
- rentang **8** → **4** tingkat
- rentang **16** → **3** tingkat

Melebarkan rentang dari 2 ke 4 **memotong setengah** jumlah tingkatnya. Melebarkannya lagi ke 8 memotong sepertiganya lagi.

Sekarang pikirkan apa arti satu tingkat bagi keputusan. Tiap tingkat adalah satu **penyerahan**: satu orang harus membaca, memahami, memutuskan, lalu meneruskan. Kalau tiap tingkat butuh satu hari, organisasi dengan rentang 2 butuh **dua belas hari** untuk satu keputusan yang di organisasi rentang 16 selesai dalam **tiga hari**.

Dan bukan cuma lambat. Tiap penyerahan juga **menyusutkan maksud aslinya**, persis seperti pada rantai komunikasi spesialis informasi.

Lalu kenapa tidak semua organisasi memakai rentang selebar mungkin?

Karena rentang yang terlalu lebar punya harganya sendiri, dan slide menyebutkannya dengan jelas: terlalu banyak yang harus diperhatikan manajer, bawahan **kurang mendapat perhatian**, mudah terjadi kesalahan dan frustrasi, dan manajernya tertekan untuk **mengabaikan dan memaafkan** kesalahan — yang artinya ia kehilangan kendali.

Jadi ini bukan soal mencari angka terbaik. Ini pertukaran antara **kecepatan** dan **perhatian**, dan titik seimbangnya bergantung pada faktor-faktor yang disebut di slide: kemampuan bawahan, kejelasan wewenang dan perencanaan, laju perubahan, dan teknik komunikasi.

Faktor terakhir itulah pintu masuk sistem informasi. Kalau laporan bawahan datang otomatis, terbaca sekilas, dan menandai sendiri yang menyimpang, maka satu manajer sanggup memantau lebih banyak orang **tanpa** kehilangan perhatian.

Artinya: **sistem informasi memungkinkan rentang yang lebih lebar, dan rentang yang lebih lebar memangkas tingkat organisasi.**

Inilah kenapa penerapan sistem informasi sering disertai perataan struktur — dan kenapa ia sering ditentang oleh orang yang menempati tingkat yang akan hilang. Penolakan itu **bukan** sikap tidak masuk akal terhadap teknologi; ia tanggapan yang tepat terhadap ancaman yang nyata.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Organisasi & manajemen: rentang kendali
# ============================================
import math

# --------------------------------------------
# 1. Efisiensi vs efektivitas
# --------------------------------------------
print("--- efisiensi vs efektivitas ---")
KASUS = [
    ("Tepat sasaran, hemat",   True,  True,  "ideal"),
    ("Tepat sasaran, boros",   True,  False, "bertahan, tapi mahal"),
    ("Salah sasaran, hemat",   False, True,  "gagal dengan rapi"),
    ("Salah sasaran, boros",   False, False, "gagal total"),
]
print("  " + "kasus".ljust(24) + "efektif".ljust(9) + "efisien".ljust(9) + "akibat")
for nama, efektif, efisien, akibat in KASUS:
    print("  " + nama.ljust(24)
          + ("ya" if efektif else "tidak").ljust(9)
          + ("ya" if efisien else "tidak").ljust(9) + akibat)
print("")
print("  Efektif  = doing the RIGHT thing  (sasarannya benar)")
print("  Efisien  = doing things RIGHT     (caranya hemat)")
print("  Yang paling berbahaya baris ke-3: kerja rapi, hemat,")
print("  terukur -- untuk sesuatu yang seharusnya tidak dikerjakan.")

# --------------------------------------------
# 2. Rentang kendali menentukan bentuk organisasi
# --------------------------------------------
def bentuk(jumlah_pelaksana, rentang):
    """Berapa tingkat dan berapa manajer untuk sejumlah pelaksana."""
    tingkat = 0
    manajer = 0
    sisa = jumlah_pelaksana
    while sisa > 1:
        sisa = math.ceil(sisa / rentang)
        manajer += sisa
        tingkat += 1
    return tingkat, manajer

print("")
print("--- 4096 pelaksana, rentang kendali berbeda ---")
print("  " + "rentang".ljust(10) + "tingkat".ljust(10)
      + "manajer".ljust(10) + "rasio manajer")
for r in (2, 4, 8, 16, 64):
    t, m = bentuk(4096, r)
    rasio = m / 4096 * 100
    print("  " + str(r).ljust(10) + str(t).ljust(10)
          + str(m).ljust(10) + ("%.1f%%" % rasio))

print("")
print("  Rentang SEMPIT  -> banyak tingkat, banyak manajer,")
print("                     keputusan lambat karena harus naik")
print("                     berlapis-lapis")
print("  Rentang LEBAR   -> sedikit tingkat, keputusan cepat,")
print("                     tapi tiap bawahan kurang diperhatikan")

# --------------------------------------------
# 3. Berapa lama satu keputusan naik ke puncak?
# --------------------------------------------
print("")
print("--- waktu keputusan naik ke puncak (1 hari per tingkat) ---")
for r in (2, 4, 8, 16, 64):
    t, _ = bentuk(4096, r)
    print("  rentang " + str(r).rjust(2) + " : " + str(t).rjust(2)
          + " tingkat -> " + str(t) + " hari")
print("")
print("  Inilah pertukarannya. Tidak ada rentang yang benar")
print("  untuk semua; yang benar bergantung pada kemampuan")
print("  bawahan, kejelasan wewenang, dan laju perubahan.")

# --------------------------------------------
# 4. Porsi fungsi manajemen per jenjang
# --------------------------------------------
print("")
print("--- porsi waktu untuk tiap fungsi manajemen (%) ---")
FUNGSI = ["Plan", "Organz", "Staff", "Direct", "Ctrl"]
PORSI = {
    "Manajer Puncak":        [40, 20, 10, 10, 20],
    "Manajer Menengah":      [20, 25, 15, 20, 20],
    "Manajer Garis 1":       [10, 15, 10, 45, 20],
}
print("  " + "jenjang".ljust(19) + "".join(f.rjust(9) for f in FUNGSI))
for jenjang, porsi in PORSI.items():
    print("  " + jenjang.ljust(19)
          + "".join((str(p) + "%").rjust(9) for p in porsi))
print("")
print("  Perhatikan kolom Plan dan Direct: keduanya MEMBALIK.")
print("  Makin ke atas makin banyak merencanakan; makin ke")
print("  bawah makin banyak mengarahkan orang secara langsung.")` },
  output: `--- efisiensi vs efektivitas ---
  kasus                   efektif  efisien  akibat
  Tepat sasaran, hemat    ya       ya       ideal
  Tepat sasaran, boros    ya       tidak    bertahan, tapi mahal
  Salah sasaran, hemat    tidak    ya       gagal dengan rapi
  Salah sasaran, boros    tidak    tidak    gagal total

  Efektif  = doing the RIGHT thing  (sasarannya benar)
  Efisien  = doing things RIGHT     (caranya hemat)
  Yang paling berbahaya baris ke-3: kerja rapi, hemat,
  terukur -- untuk sesuatu yang seharusnya tidak dikerjakan.

--- 4096 pelaksana, rentang kendali berbeda ---
  rentang   tingkat   manajer   rasio manajer
  2         12        4095      100.0%
  4         6         1365      33.3%
  8         4         585       14.3%
  16        3         273       6.7%
  64        2         65        1.6%

  Rentang SEMPIT  -> banyak tingkat, banyak manajer,
                     keputusan lambat karena harus naik
                     berlapis-lapis
  Rentang LEBAR   -> sedikit tingkat, keputusan cepat,
                     tapi tiap bawahan kurang diperhatikan

--- waktu keputusan naik ke puncak (1 hari per tingkat) ---
  rentang  2 : 12 tingkat -> 12 hari
  rentang  4 :  6 tingkat -> 6 hari
  rentang  8 :  4 tingkat -> 4 hari
  rentang 16 :  3 tingkat -> 3 hari
  rentang 64 :  2 tingkat -> 2 hari

  Inilah pertukarannya. Tidak ada rentang yang benar
  untuk semua; yang benar bergantung pada kemampuan
  bawahan, kejelasan wewenang, dan laju perubahan.

--- porsi waktu untuk tiap fungsi manajemen (%) ---
  jenjang                 Plan   Organz    Staff   Direct     Ctrl
  Manajer Puncak           40%      20%      10%      10%      20%
  Manajer Menengah         20%      25%      15%      20%      20%
  Manajer Garis 1          10%      15%      10%      45%      20%

  Perhatikan kolom Plan dan Direct: keduanya MEMBALIK.
  Makin ke atas makin banyak merencanakan; makin ke
  bawah makin banyak mengarahkan orang secara langsung.`,

  kesalahanUmum: [
    {
      salah: 'Mengira bagan organisasi resmi menggambarkan bagaimana pekerjaan sebenarnya berjalan.',
      kenapa: 'Bagan hanya menggambarkan organisasi formal. Organisasi informal selalu ada, terbentuk dari interaksi sehari-hari, dan sering lebih menentukan siapa yang benar-benar dimintai pendapat sebelum sebuah keputusan diambil.',
      benar: 'Pakai bagan sebagai titik awal, lalu telusuri jalur informasinya yang nyata dengan bertanya siapa berbicara dengan siapa sebelum memutuskan.'
    },
    {
      salah: 'Menganggap efisien dan efektif sebagai dua kata untuk hal yang sama.',
      kenapa: 'Efisien berarti caranya hemat, efektif berarti sasarannya benar. Keduanya bisa berdiri sendiri, dan gabungan yang paling berbahaya adalah efisien tetapi tidak efektif: pekerjaan yang salah dikerjakan dengan rapi, hemat, dan terukur sehingga semua laporannya terlihat bagus.',
      benar: 'Periksa sasarannya lebih dulu sebelum mengukur biayanya, karena penghematan pada pekerjaan yang salah tidak bernilai apa pun.'
    },
    {
      salah: 'Mengira rentang kendali yang lebar selalu lebih baik karena lebih hemat manajer.',
      kenapa: 'Rentang lebar memang memangkas tingkat dan mempercepat keputusan, tetapi tiap bawahan jadi kurang diperhatikan, kesalahan lebih mudah lolos, dan manajernya tertekan untuk mengabaikan penyimpangan. Yang hemat di kolom gaji bisa mahal di kolom mutu.',
      benar: 'Tentukan rentangnya dari kemampuan bawahan, kejelasan wewenang, dan kualitas jalur informasinya, bukan dari keinginan menghemat.'
    },
    {
      salah: 'Merancang sistem informasi tanpa memeriksa struktur organisasi yang akan memakainya.',
      kenapa: 'Struktur menentukan siapa berwenang menyetujui apa, dan data mana yang boleh dilihat siapa. Sistem yang alur persetujuannya tidak cocok dengan rantai komando yang ada akan dilewati orang lewat jalan pintas, dan datanya berhenti mencerminkan kenyataan.',
      benar: 'Petakan rantai komando dan wewenang persetujuan lebih dulu, lalu buat alur sistemnya mengikuti peta itu.'
    },
    {
      salah: 'Menganggap penolakan terhadap sistem baru sebagai ketakutan tidak rasional terhadap teknologi.',
      kenapa: 'Sistem informasi melebarkan rentang kendali yang sanggup ditangani seorang manajer, dan itu memangkas tingkat organisasi. Orang yang menempati tingkat tersebut menolak karena ancamannya nyata terhadap peran dan posisinya, bukan karena tidak paham teknologi.',
      benar: 'Kenali dampaknya pada peran dan posisi orang sejak awal, lalu bicarakan terbuka bagaimana peran itu berubah, bukan menutupinya.'
    },
    {
      salah: 'Menerapkan prinsip kesatuan perintah Fayol sebagai aturan yang tidak boleh dilanggar.',
      kenapa: 'Organisasi matriks sengaja memberi tiap orang dua atasan karena manfaat menyatukan keahlian khusus lintas proyek lebih besar daripada kerugian rantai komando gandanya. Prinsip klasik adalah panduan yang lahir dari zamannya, bukan hukum yang berlaku di semua keadaan.',
      benar: 'Pahami alasan di balik tiap prinsip, lalu nilai apakah alasannya masih berlaku pada keadaan yang kamu hadapi.'
    }
  ],

  analogi: `Bayangkan **satu pesan berantai di kelas**.

Kalau kelasnya diatur berpasangan — tiap orang cuma boleh bicara ke satu orang berikutnya — maka pesan dari orang pertama ke orang ke-32 harus melewati **31 penyerahan**. Lambat, dan sampai di ujung isinya sudah berubah.

Kalau satu orang boleh berbicara ke delapan orang sekaligus, pesan yang sama sampai ke 32 orang dalam **dua putaran**. Jauh lebih cepat, dan cuma dua kali berubah.

Tapi ada harganya. Orang yang berbicara ke delapan orang sekaligus **tidak bisa memastikan** kedelapannya benar-benar paham. Ia harus percaya. Sedangkan yang berbicara ke satu orang bisa berhenti, mengulang, dan memeriksa.

Itulah rentang kendali. **Kecepatan dibeli dengan perhatian.**

Dan sistem informasi? Ia seperti memberi tiap orang **papan tulis yang bisa dilihat semua**. Sekarang berbicara ke delapan orang tidak lagi berarti kehilangan kepastian, karena semua bisa melihat pesan aslinya dan menandai kalau ada yang tidak jelas.

Papan tulis itu tidak mengubah orangnya. Ia mengubah **berapa banyak orang yang sanggup dipegang satu orang** — dan karena itu, mengubah bentuk seluruh kelasnya.`,

  latihan: [
    'Jelaskan perbedaan organisasi formal dan informal, lalu berikan satu contoh masing-masing dari lingkungan kampusmu.',
    'Jelaskan perspektif tindakan dan perspektif kelembagaan, lalu jelaskan bagaimana teori strukturasi Giddens menyatukan keduanya.',
    'Sebutkan tiga aspek formal struktur organisasi, dan jelaskan kenapa spesialisasi pekerjaan yang terlalu sempit justru merugikan.',
    'Hitung berapa tingkat dan berapa manajer yang dibutuhkan untuk 1000 pelaksana pada rentang kendali 5 dan pada rentang kendali 10, lalu bandingkan waktu satu keputusan naik ke puncak.',
    'Sebutkan tujuh faktor yang mempengaruhi rentang kendali, lalu jelaskan kenapa sistem informasi bekerja lewat faktor teknik komunikasi.',
    'Bandingkan organisasi fungsional, produk, dan matriks, lalu jelaskan kenapa matriks sengaja melanggar prinsip kesatuan perintah Fayol.',
    'Jelaskan beda efisiensi dan efektivitas, lalu berikan satu contoh nyata dari kegiatan yang efisien tetapi tidak efektif.',
    'Sebutkan sepuluh peran manajer menurut Mintzberg, lalu jelaskan kenapa tiga peran informasi menjelaskan besarnya pengaruh sistem informasi pada pekerjaan manajer.',
    'Jelaskan bagaimana tiga jenjang manajer memetakan ke TPS, MIS, dan EIS, lalu jelaskan kenapa pemetaannya bukan kebetulan.'
  ]
});


TOPICS.push({
  id: 'sisfo-cbis',
  judul: 'Sistem Informasi Berbasis Komputer (CBIS)',
  kategori: 'sisfo',
  tag: ['CBIS', 'lima unsur', 'information specialist', 'end user computing', 'system life cycle'],
  ringkas: 'Empat unsurnya bisa dibeli. Yang kelima tidak — dan justru itu yang paling sering menggagalkan.',

  fungsi: `**Merencanakan sistem berbasis komputer secara utuh — termasuk bagian yang tidak bisa dibeli.**

Terpakai di:

- **Menyusun anggaran proyek** yang tidak melewatkan pos penting
- **Menjelaskan kenapa aplikasi jadi tapi tidak dipakai**
- **Mengelola antrean permintaan** yang tidak pernah habis
- **Bab pendahuluan** tugas akhir — definisi dan unsur CBIS hampir selalu diminta

Yang paling sering menyelamatkan: **unsur people tidak bisa dibeli.**

Empat unsur lain punya harga di katalog. Yang kelima butuh pelatihan, waktu, dan kesediaan — dan justru itu yang paling sering tidak dianggarkan.

Dan satu kaidah tentang antrean: **selama permintaan masuk lebih cepat daripada penyelesaian, antreannya tidak akan pernah habis** — sekeras apa pun orangnya bekerja. Yang menyelesaikan bukan kerja lebih keras, melainkan mengubah salah satu lajunya.`,

  praktik: {
    tujuan: `Kamu punya rencana CBIS yang lengkap kelima unsurnya, dan strategi yang benar untuk antrean permintaan.`,
    alat: [
      'Spreadsheet untuk anggaran',
      'Data permintaan nyata kalau ada'
    ],
    langkah: [
      { judul: 'Daftar kelima unsurnya, lalu matikan satu per satu',
        isi: `Tulis kelima unsur untuk sistemmu, lalu untuk tiap unsur tanyakan: **apa yang terjadi kalau ini tidak ada?**

Latihan ini paling berguna pada unsur **people** — jawabannya biasanya *"sistemnya benar dan tidak dipakai"*, dan itu jarang muncul di rencana proyek.` },
      { judul: 'Uji misinya',
        isi: `Tulis: *"sistem ini memperbaiki kinerja [siapa] dalam [apa], dan kita tahu berhasil kalau [apa]"*.

Kalau bagian terakhir tidak bisa diisi, sistemmu belum punya misi — ia baru punya keinginan.` },
      { judul: 'Anggarkan kelima konsekuensinya',
        isi: `Bukan cuma perangkat. Anggarkan juga: unit pengelola, orang yang ahli, bahan habis pakai, dana operasional, dan **pelatihan pengguna**.

Yang terakhir paling sering hilang dari spreadsheet, dan paling sering menentukan.` },
      { judul: 'Gambar rantai komunikasinya',
        isi: `Untuk satu permintaan nyata, gambar berapa kali maksudnya berpindah tangan sebelum jadi program.

Tiap perpindahan adalah kesempatan maksudnya berubah. Hitung jumlahnya, lalu cari mana yang bisa dihapus.` },
      { judul: 'Hitung antreannya',
        isi: `Catat berapa permintaan masuk per bulan dan berapa yang selesai.

Kalau masuk lebih besar, hitung antreannya untuk dua belas bulan ke depan. Angkanya akan besar, dan itulah gambaran yang sebenarnya.` },
      { judul: 'Pilih strategi yang benar untuk antrean itu',
        isi: `Hanya dua yang berhasil:

- **turunkan laju masuk** — sediakan swalayan untuk permintaan sederhana
- **naikkan laju keluar** — bimbing pengguna membuat sendiri, bukan membuatkannya

Menambah jam lembur tidak masuk daftar, karena ia tidak mengubah selisih lajunya.` },
      { judul: 'Rencanakan akhir hidupnya sejak awal',
        isi: `Tulis: apa saja yang bergantung pada sistem ini, dan tanda apa yang menunjukkan masa pakainya sudah lewat.

Tanpa catatan itu, sistemnya akan dipakai bertahun-tahun setelah berhenti cocok — karena tidak ada yang tahu apa yang ikut mati kalau ia dicabut.` }
    ],
    cek: [
      'Anggaranmu memuat pos pelatihan pengguna dengan jumlah dan waktu yang jelas',
      'Misi sistemmu punya bagian "kita tahu berhasil kalau" yang bisa diperiksa',
      'Kamu tahu berapa antrean permintaan tumbuh per bulan, dan strategi mana yang kamu pilih'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa pengguna akhirnya membuat sendiri',

  konsep: `
**CBIS** — *Computer-Based Information System* — adalah gabungan perangkat keras, perangkat lunak, dan jaringan telekomunikasi yang dibangun untuk mengumpulkan, membuat, dan mendistribusikan data yang berguna di dalam organisasi [Jessup].

Perhatikan bahwa definisinya **tidak menyebut komputer sebagai tujuan**. Komputernya alat; yang dituju adalah data yang berguna.

**Lima unsur**

- **Hardware** — server, klien, jaringan, penyimpanan
- **Software** — sistem operasi, DBMS, aplikasi
- **Data** — isi yang diolah
- **Telekomunikasi** — jaringan yang menghubungkan
- **People** — spesialis informasi dan pengguna

Empat yang pertama bisa **dibeli**. Yang kelima tidak. Dan justru unsur kelima yang paling sering menjadi sebab kegagalan.

**Misi CBIS**

Misinya bukan "memasang komputer", melainkan **memperbaiki kinerja orang-orang di dalam organisasi dengan memanfaatkan teknologi informasi**.

Ini rumusan yang enak dijadikan alat uji. Kalau sebuah usulan sistem tidak bisa menjawab *"kinerja siapa yang membaik, dan bagaimana kita tahu"*, maka ia belum punya misi — ia baru punya keinginan.

**Konsekuensi memakai CBIS**

Memakai teknologi informasi membawa akibat yang harus disiapkan, bukan ditemukan belakangan:

- ada **unit pengelola** teknologi informasi
- ada **pegawai ahli** di bidangnya — spesialis informasi
- ada **peralatan dan bahan habis pakai**
- ada **dana** untuk pengelolaan dan operasional
- ada **pengguna** yang harus punya pengetahuan dan keterampilan komputer

Butir terakhir yang paling sering luput dari anggaran, dan yang paling sering menentukan.

**Lima golongan spesialis informasi**

*System Analyst*, *Database Administrator*, *Network Specialist*, *Programmer*, *Operator*.

Dalam rantai komunikasi tradisional, maksud pengguna berjalan begini:

**Pengguna → System Analyst → Programmer → Operator → Komputer**

Empat kali berpindah tangan sebelum menjadi program yang berjalan. Tiap perpindahan adalah kesempatan maksudnya berubah.

**End User Computing**

*End user computing* adalah pengembangan sistem yang dilakukan **oleh penggunanya sendiri**. Ia tumbuh karena:

- permintaan jauh lebih banyak daripada kemampuan unit layanan informasi
- pengetahuan dan keterampilan komputer pengguna makin meningkat
- perangkat keras makin murah dan mudah didapat
- perangkat lunak siap pakai makin banyak tersedia

Pengguna dikelompokkan menurut kemampuannya: **tingkat menu**, **tingkat perintah**, dan **tingkat programer**.

**Risikonya nyata**

- sistemnya tidak sesuai tujuan organisasi
- rancangan dan dokumentasinya buruk
- sumber daya informasi terpakai tidak efisien
- sistem dan datanya tidak terpadu
- tidak ada pengamanan data

Meski risikonya besar, *end user computing* **tetap akan berkembang**, dan organisasi harus mengantisipasinya. Melarangnya tidak menghapus penyebabnya.

Manfaatnya juga nyata: **beban spesialis berkurang**, dan **jurang komunikasi** antara pengguna dan spesialis menyempit — karena orang yang tahu kebutuhannya kini juga yang membangunnya.

Akibatnya, peran spesialis informasi bergeser: dari **pembuat** menjadi **konsultan**.

**Justifikasi CBIS berubah sepanjang zaman**

- **Awalnya** — dihitung dari biaya tenaga administrasi yang digantikan
- **Kemudian** — dihitung dari kemungkinan tambahan keuntungan
- **Sekarang** — dihitung dengan ukuran kuantitatif **dan** kualitatif

Pergeseran ini menarik. Ia berarti pertanyaannya berubah dari *"berapa orang yang bisa diberhentikan"* menjadi *"apa yang jadi mungkin, yang sebelumnya tidak"*. Sistem yang paling berharga hari ini biasanya tidak menggantikan siapa pun.

**CBIS punya daur hidup**

CBIS diibaratkan organisme hidup: **lahir, tumbuh, matang, dan mati**. Ia mengikuti *System Life Cycle* — perencanaan, analisis, perancangan, penerapan, penggunaan.

Bagian yang sering dilupakan: **mati**. Sistem yang tidak pernah direncanakan penggantiannya akan tetap dipakai lama setelah ia berhenti cocok, karena tidak ada yang berani mencabutnya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA END USER COMPUTING MUNCUL SENDIRI\n#\n# Permintaan masuk   : 20 per bulan\n# Sanggup diselesaikan:  8 per bulan\n#\n# bulan 1  -> antrean 12\n# bulan 3  -> antrean 36\n# bulan 6  -> antrean 72\n# bulan 12 -> antrean 144\n#\n# Antreannya tumbuh 12 per bulan dan TIDAK PERNAH\n# menyusut, karena laju masuk lebih besar daripada\n# laju keluar. Ini bukan soal spesialisnya malas --\n# ini sifat antrean yang lajunya tidak seimbang.\n#\n# Pengguna yang menunggu setahun akan membuat sendiri.',
      penjelasan: `
*End user computing* biasanya dijelaskan sebagai **pilihan** — pengguna kini mampu, alatnya murah, jadi mereka membuat sendiri. Penjelasan itu benar, tetapi melewatkan sebab yang paling menentukan.

Sebab utamanya adalah **antrean**.

Perhatikan angkanya. Kalau permintaan masuk 20 per bulan dan unit layanan informasi sanggup menyelesaikan 8, maka tiap bulan **12 permintaan menumpuk**. Antreannya tidak pernah menyusut, dan tidak akan pernah — karena selisihnya tetap.

Ini penting untuk dipahami dengan benar: **tidak ada usaha keras yang bisa menyelesaikannya.** Kalau spesialisnya bekerja lembur dan menyelesaikan 10 per bulan, antreannya tetap tumbuh 10 per bulan. Selama laju masuk lebih besar daripada laju keluar, satu-satunya yang berubah adalah **kecepatan menumpuknya**.

Pengguna yang permintaannya masuk pada bulan keenam melihat 72 permintaan di depannya. Dengan laju 8 per bulan, gilirannya tiba sembilan bulan lagi. Ia punya dua pilihan: menunggu sembilan bulan, atau membuka spreadsheet dan mengerjakannya sendiri sore ini.

Ia akan memilih yang kedua, dan pilihannya **masuk akal**.

Sekarang risikonya bisa dilihat dengan jujur. Yang ia buat memang akan berdokumentasi buruk, tidak terpadu dengan sistem lain, dan tanpa pengamanan data. Semua kekhawatiran itu benar.

Tapi bandingkan dengan pilihan yang sebenarnya tersedia baginya. Bukan *"sistem buatan sendiri yang buruk"* melawan *"sistem resmi yang baik"* — melainkan *"sistem buatan sendiri yang buruk"* melawan **"tidak ada apa-apa selama sembilan bulan"**.

Karena itu **melarang tidak menyelesaikan apa pun**. Larangan menghapus gejalanya, bukan sebabnya: antreannya tetap 72, dan pengguna tetap butuh jawabannya hari ini. Yang terjadi hanyalah pekerjaannya pindah ke tempat yang tidak terlihat.

Yang benar-benar menyelesaikan ada dua, dan slide menyebut keduanya.

**Pertama**, sediakan alat yang aman untuk dipakai sendiri — kemampuan bertanya ke basis data yang sudah dibatasi haknya, templat laporan, dan sumber data yang sudah dibakukan. Dengan begitu pengguna tetap mengerjakan sendiri, tetapi di atas pondasi yang benar.

**Kedua**, ubah peran spesialis dari **pembuat** menjadi **konsultan**. Satu spesialis yang membuat sistem melayani satu permintaan pada satu waktu. Satu spesialis yang membimbing sepuluh pengguna membuat sistemnya sendiri melayani sepuluh — dan kapasitasnya berlipat, bukan bertambah.

Dan ada manfaat yang sering tidak disangka: **jurang komunikasi ikut menyempit**. Dalam rantai tradisional, maksud pengguna berpindah tangan empat kali sebelum menjadi program. Ketika penggunanya sendiri yang membangun, jumlah perpindahannya **nol**.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# CBIS: lima unsur, rantai komunikasi, end-user
# ============================================

# --------------------------------------------
# 1. Lima unsur CBIS -- matikan satu, apa yang terjadi?
# --------------------------------------------
print("--- lima unsur CBIS, dan akibatnya bila satu hilang ---")
UNSUR = [
    ("Hardware",      "server, klien, jaringan",
     "tidak ada tempat program berjalan"),
    ("Software",      "sistem operasi, DBMS, aplikasi",
     "perangkat kerasnya jadi kotak kosong"),
    ("Data",          "isi yang diolah",
     "sistemnya jalan, tapi tidak menjawab apa pun"),
    ("Telekomunikasi","jaringan penghubung",
     "tiap bagian punya pulau data sendiri"),
    ("People",        "spesialis + pengguna",
     "sistemnya benar secara teknis dan tidak dipakai"),
]
for nama, isi, tanpa in UNSUR:
    print("  " + nama.ljust(16) + isi)
    print("      tanpa ini: " + tanpa)
print("")
print("  Yang paling sering dilupakan yang terakhir. Empat")
print("  unsur pertama bisa dibeli; unsur kelima tidak.")

# --------------------------------------------
# 2. Rantai komunikasi tradisional
# --------------------------------------------
print("")
print("--- rantai komunikasi tradisional ---")
RANTAI = ["Pengguna", "System Analyst", "Programmer",
          "Operator", "Komputer"]
print("  " + " -> ".join(RANTAI[:3]))
print("      -> " + " -> ".join(RANTAI[3:]))

setia = 0.90          # anggap tiap penyerahan mempertahankan 90% maksud
lompatan = len(RANTAI) - 1
sisa = setia ** lompatan
print("")
print("  " + str(lompatan) + " kali penyerahan maksud antar orang.")
print("  Andai tiap penyerahan mempertahankan "
      + str(int(setia * 100)) + "% maksud aslinya:")
for i in range(lompatan + 1):
    print("    setelah " + str(i) + " penyerahan : "
          + ("%.1f%%" % (setia ** i * 100)))
print("")
print("  Angka 90% itu andaian, bukan hasil pengukuran --")
print("  yang nyata bukan angkanya, melainkan BENTUKNYA:")
print("  susut berlipat, bukan bertambah. Itu sebabnya")
print("  fitur yang sampai sering bukan yang diminta.")

# --------------------------------------------
# 3. Kenapa End User Computing muncul
# --------------------------------------------
print("")
print("--- antrean permintaan ke unit layanan informasi ---")
permintaan_per_bulan = 20
sanggup_per_bulan = 8
antrean = 0
print("  " + "bulan".ljust(8) + "masuk".ljust(8)
      + "selesai".ljust(9) + "antrean")
for bulan in range(1, 13):
    antrean += permintaan_per_bulan
    selesai = min(sanggup_per_bulan, antrean)
    antrean -= selesai
    if bulan % 3 == 0 or bulan == 1:
        print("  " + str(bulan).ljust(8)
              + str(permintaan_per_bulan).ljust(8)
              + str(selesai).ljust(9) + str(antrean))
print("")
print("  Antreannya tumbuh tetap "
      + str(permintaan_per_bulan - sanggup_per_bulan)
      + " permintaan tiap bulan")
print("  dan tidak pernah menyusut. Pengguna yang menunggu")
print("  setahun akhirnya membuat sendiri -- itulah End User")
print("  Computing, dan ia lahir dari ANTREAN, bukan pilihan.")

# --------------------------------------------
# 4. Risiko yang dibawanya
# --------------------------------------------
print("")
print("--- risiko End User Computing ---")
RISIKO = [
    "sistem tidak sesuai tujuan organisasi",
    "rancangan dan dokumentasi buruk",
    "sumber daya informasi terpakai tidak efisien",
    "sistem dan datanya tidak terpadu",
    "tidak ada pengamanan data",
]
for r in RISIKO:
    print("  - " + r)
print("")
print("  Menutup End User Computing tidak menyelesaikan")
print("  apa pun: antreannya tetap ada. Yang menyelesaikan")
print("  adalah menyediakan alat yang aman untuk dipakai")
print("  sendiri, lalu mengubah peran spesialis dari")
print("  PEMBUAT menjadi KONSULTAN.")` },
  output: `--- lima unsur CBIS, dan akibatnya bila satu hilang ---
  Hardware        server, klien, jaringan
      tanpa ini: tidak ada tempat program berjalan
  Software        sistem operasi, DBMS, aplikasi
      tanpa ini: perangkat kerasnya jadi kotak kosong
  Data            isi yang diolah
      tanpa ini: sistemnya jalan, tapi tidak menjawab apa pun
  Telekomunikasi  jaringan penghubung
      tanpa ini: tiap bagian punya pulau data sendiri
  People          spesialis + pengguna
      tanpa ini: sistemnya benar secara teknis dan tidak dipakai

  Yang paling sering dilupakan yang terakhir. Empat
  unsur pertama bisa dibeli; unsur kelima tidak.

--- rantai komunikasi tradisional ---
  Pengguna -> System Analyst -> Programmer
      -> Operator -> Komputer

  4 kali penyerahan maksud antar orang.
  Andai tiap penyerahan mempertahankan 90% maksud aslinya:
    setelah 0 penyerahan : 100.0%
    setelah 1 penyerahan : 90.0%
    setelah 2 penyerahan : 81.0%
    setelah 3 penyerahan : 72.9%
    setelah 4 penyerahan : 65.6%

  Angka 90% itu andaian, bukan hasil pengukuran --
  yang nyata bukan angkanya, melainkan BENTUKNYA:
  susut berlipat, bukan bertambah. Itu sebabnya
  fitur yang sampai sering bukan yang diminta.

--- antrean permintaan ke unit layanan informasi ---
  bulan   masuk   selesai  antrean
  1       20      8        12
  3       20      8        36
  6       20      8        72
  9       20      8        108
  12      20      8        144

  Antreannya tumbuh tetap 12 permintaan tiap bulan
  dan tidak pernah menyusut. Pengguna yang menunggu
  setahun akhirnya membuat sendiri -- itulah End User
  Computing, dan ia lahir dari ANTREAN, bukan pilihan.

--- risiko End User Computing ---
  - sistem tidak sesuai tujuan organisasi
  - rancangan dan dokumentasi buruk
  - sumber daya informasi terpakai tidak efisien
  - sistem dan datanya tidak terpadu
  - tidak ada pengamanan data

  Menutup End User Computing tidak menyelesaikan
  apa pun: antreannya tetap ada. Yang menyelesaikan
  adalah menyediakan alat yang aman untuk dipakai
  sendiri, lalu mengubah peran spesialis dari
  PEMBUAT menjadi KONSULTAN.`,

  kesalahanUmum: [
    {
      salah: 'Menyamakan CBIS dengan perangkat lunaknya, lalu menganggap proyek selesai saat aplikasinya jadi.',
      kenapa: 'CBIS punya lima unsur, dan unsur people mencakup spesialis maupun pengguna. Aplikasi yang berjalan sempurna tetapi tidak ada yang terlatih memakainya belum menjadi sistem informasi, karena tidak ada data berguna yang mengalir.',
      benar: 'Perlakukan pelatihan pengguna dan prosedur kerja sebagai bagian dari lingkup proyek, dengan waktu dan biaya yang dianggarkan sejak awal.'
    },
    {
      salah: 'Menganggap end user computing sebagai penyimpangan yang harus dilarang.',
      kenapa: 'End user computing lahir dari antrean permintaan yang tidak pernah menyusut, bukan dari sikap membangkang. Larangan menghapus gejalanya tanpa menyentuh sebabnya, dan pekerjaan itu hanya pindah ke tempat yang tidak terlihat sehingga risikonya justru bertambah.',
      benar: 'Sediakan alat dan data yang aman untuk dipakai sendiri, lalu ubah peran spesialis dari pembuat menjadi konsultan.'
    },
    {
      salah: 'Mengira menambah jam kerja spesialis akan menghabiskan antrean permintaan.',
      kenapa: 'Selama laju permintaan masuk lebih besar daripada laju penyelesaian, antreannya tetap tumbuh dan yang berubah hanya kecepatan menumpuknya. Masalahnya ada pada selisih laju, bukan pada besarnya usaha.',
      benar: 'Kurangi laju masuk dengan menyediakan swalayan untuk permintaan sederhana, atau naikkan laju keluar dengan melipatgandakan kapasitas lewat pembimbingan.'
    },
    {
      salah: 'Menganggap manfaat CBIS cukup dihitung dari jumlah tenaga administrasi yang bisa digantikan.',
      kenapa: 'Itu cara menghitung dari masa awal komputerisasi. Sekarang justifikasinya memakai ukuran kuantitatif maupun kualitatif, karena sistem yang paling berharga biasanya membuat sesuatu yang sebelumnya tidak mungkin, bukan menggantikan orang.',
      benar: 'Nyatakan manfaatnya sebagai perbaikan kinerja yang bisa diperiksa, lalu sebutkan juga yang tidak terhitung dalam rupiah secara terbuka.'
    },
    {
      salah: 'Membangun sistem tanpa merencanakan kapan dan bagaimana ia akan diganti.',
      kenapa: 'CBIS mengikuti daur hidup yang berujung pada berakhirnya masa pakai. Sistem yang penggantinya tidak pernah direncanakan akan terus dipakai lama setelah berhenti cocok, karena tidak ada yang berani mencabutnya dan tidak ada yang tahu apa saja yang bergantung padanya.',
      benar: 'Catat sejak awal apa saja yang bergantung pada sistem ini dan tanda apa yang menunjukkan masa pakainya sudah lewat.'
    }
  ],

  analogi: `Bayangkan **satu tukang kunci untuk seluruh kompleks perumahan**.

Tiap hari ada 20 warga yang kuncinya bermasalah, dan tukang kuncinya sanggup melayani 8. Sisanya menunggu.

Bulan pertama antreannya 12 orang. Bulan keenam sudah 72. Warga yang lapor hari ini diberi tahu gilirannya sembilan bulan lagi.

Apa yang terjadi kemudian sudah bisa ditebak. Warga mulai **mengganti kuncinya sendiri**. Belinya di toko, pasangnya sendiri, kadang miring, kadang tidak terkunci rapat.

Pengurus kompleks marah dan **melarang** warga memasang kunci sendiri.

Tapi larangan itu tidak menghapus 72 pintu yang rusak. Warga tetap butuh pintunya terkunci malam ini. Yang berubah cuma: sekarang mereka memasangnya **diam-diam**, dan pengurus tidak lagi tahu pintu mana saja yang bermasalah.

Yang benar-benar menolong ada dua. **Sediakan kunci standar** di pos satpam, yang sudah dipastikan cocok dan aman — supaya warga yang memasang sendiri memasang yang benar. Dan **ubah tugas tukang kuncinya**: dari memasang satu per satu, menjadi mengajari sepuluh warga cara memasang dengan benar.

Sekarang ia melayani sepuluh pintu sekaligus, bukan satu.`,

  latihan: [
    'Sebutkan lima unsur CBIS, lalu jelaskan untuk tiap unsur apa yang terjadi kalau unsur itu tidak ada.',
    'Jelaskan kenapa unsur people paling sering menjadi sebab kegagalan, padahal ia paling jarang muncul di anggaran proyek.',
    'Tulis ulang misi CBIS sebagai alat uji, lalu terapkan pada satu usulan sistem yang pernah kamu buat.',
    'Sebutkan lima golongan spesialis informasi, lalu gambarkan rantai komunikasi tradisional dan hitung berapa kali maksud pengguna berpindah tangan.',
    'Sebutkan empat sebab tumbuhnya end user computing, lalu jelaskan kenapa antrean permintaan adalah sebab yang paling menentukan.',
    'Hitung pertumbuhan antrean untuk unit yang menerima 15 permintaan dan menyelesaikan 12 per bulan, lalu bandingkan dengan yang menerima 15 dan menyelesaikan 15.',
    'Sebutkan lima risiko end user computing, lalu jelaskan kenapa melarangnya tidak menyelesaikan masalahnya.',
    'Jelaskan pergeseran cara menghitung justifikasi CBIS dari masa awal sampai sekarang, dan apa arti pergeseran itu.',
    'Jelaskan kenapa tahap mati pada daur hidup CBIS penting direncanakan, dan apa yang terjadi kalau tidak.'
  ]
});


TOPICS.push({
  id: 'sisfo-proses-bisnis',
  judul: 'Proses Bisnis, Rantai Nilai & Keputusan',
  kategori: 'sisfo',
  tag: ['proses bisnis', 'rantai nilai', 'Porter', 'Simon', 'SCM', 'CRM', 'e-commerce', 'lead time'],
  ringkas: 'Tiap bagian merasa sudah cepat, dan prosesnya tetap makan sembilan hari.',

  fungsi: `**Menemukan di mana waktu benar-benar habis — dan itu hampir tidak pernah di tempat yang disangka.**

Terpakai di:

- **Menganalisis proses** sebelum membangun sistemnya
- **Membuktikan dampak** sistemmu dengan angka, bukan klaim
- **Bab analisis sistem berjalan** pada tugas akhir
- **Memilih fitur** yang benar-benar mempersingkat, bukan yang terlihat canggih

Yang paling sering mengubah arah proyek: **efisiensi proses biasanya di bawah satu persen.**

Kerja nyatanya kurang dari satu jam; prosesnya makan sembilan hari. Sisanya menunggu di penyerahan antar bagian — dan waktu tunggu itu **tidak berada di dalam bagian mana pun**, sehingga tidak ada yang melaporkannya.

Dan satu peringatan yang menghemat berbulan-bulan: **mengotomatiskan proses yang buruk hanya membuatnya buruk lebih cepat.** Kalau alurnya tetap berurutan dan tetap berpindah meja, penyerahannya masih ada.`,

  praktik: {
    tujuan: `Kamu punya ukuran efisiensi proses yang nyata, dan tahu perbaikan mana yang benar-benar berdampak.`,
    alat: [
      'Stopwatch atau catatan waktu',
      'Spreadsheet',
      'Satu proses nyata untuk diikuti'
    ],
    langkah: [
      { judul: 'Ikuti satu berkas dari awal sampai akhir',
        isi: `Jangan mewawancarai tiap bagian secara terpisah — ikuti **satu berkas**.

Catat kapan ia tiba di tiap meja dan kapan ia berangkat. Selisihnya adalah waktu tunggu, dan itulah yang tidak pernah dilaporkan siapa pun.` },
      { judul: 'Pisahkan waktu kerja dan waktu tunggu',
        isi: `Untuk tiap langkah, catat dua angka: berapa menit **dikerjakan**, dan berapa jam **menunggu**.

Jumlahkan keduanya secara terpisah. Selisihnya biasanya besar sekali.` },
      { judul: 'Hitung efisiensi prosesnya',
        isi: `- efisiensi = waktu kerja dibagi lead time, dikali seratus

Angkanya akan kecil. Kalau di atas sepuluh persen, prosesnya sudah tergolong baik.` },
      { judul: 'Bandingkan dua cara memperbaiki',
        isi: `Hitung lead time baru untuk dua andaian:

- kerjanya **dipercepat dua kali**
- waktu tunggunya **dipangkas setengah**

Bandingkan penghematannya. Yang pertama hampir tidak berpengaruh; yang kedua memangkas separuhnya.` },
      { judul: 'Cari langkah yang bisa berjalan bersamaan',
        isi: `Untuk tiap langkah, tanyakan: **apakah ia benar-benar butuh hasil langkah sebelumnya?**

Kalau tidak, ia bisa berjalan bersamaan. Tiga persetujuan yang tadinya berurutan dan menjadi serentak menghapus sebagian besar waktu tunggunya, bukan cuma mengurangi.` },
      { judul: 'Cari langkah yang bisa dihapus',
        isi: `Pertanyaan yang paling jarang ditanyakan: **kenapa langkah ini ada?**

Sering jawabannya adalah kejadian sepuluh tahun lalu yang sudah tidak relevan. Langkah yang dihapus menghemat kerjanya **dan** tunggunya sekaligus.` },
      { judul: 'Petakan rantai nilainya',
        isi: `Untuk usaha yang kamu analisis, daftar kegiatan utama dan pendukungnya beserta porsi biayanya.

Cari aktivitas dengan biaya terbesar. Perbaikan kecil di situ berdampak jauh lebih besar daripada perbaikan besar di aktivitas kecil.` },
      { judul: 'Bedakan gejala dari masalah',
        isi: `Tulis semua kondisi yang terlihat, lalu perlakukan **semuanya sebagai gejala**.

Untuk tiap gejala, tanyakan *"apa yang menyebabkan ini"* sampai jawabannya berhenti bergerak. Yang tersisa itulah masalahnya.` }
    ],
    cek: [
      'Kamu punya angka efisiensi proses dari pengukuran nyata, bukan perkiraan',
      'Kamu tahu langkah mana yang bisa berjalan bersamaan dan mana yang bisa dihapus',
      'Rancangan sistemmu mengikuti alur yang sudah diperbaiki, bukan alur lama'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa mempercepat kerja tidak mempercepat proses',

  konsep: `
Organisasi dibagi menjadi bagian-bagian. Tetapi **nilai bagi pelanggan tidak dihasilkan oleh satu bagian** — ia dihasilkan oleh rangkaian kegiatan yang **melintasi** bagian-bagian itu.

Inilah gagasan pokoknya, dan ia menjelaskan hampir semua yang lain.

**Proses bisnis**

Sekumpulan kegiatan yang **memotong batas-batas fungsional utama** organisasi, yang dengannya organisasi menjalankan misinya — terutama menyampaikan nilai kepada pelanggan.

Kata kuncinya **memotong batas**. Sebuah proses bisnis hampir tidak pernah selesai di dalam satu departemen.

**Rantai nilai** [Porter]

Kegiatan organisasi dibagi dua:

- **Kegiatan utama** — logistik masuk, operasi, logistik keluar, pemasaran dan penjualan, layanan
- **Kegiatan pendukung** — infrastruktur, manajemen SDM, pengembangan teknologi, pengadaan

Selisih antara nilai yang dibayar pelanggan dan biaya seluruh kegiatan itu adalah **marjin**.

Rantai nilai organisasi tidak berdiri sendiri. Ia tersambung ke rantai nilai **pemasok** di hulu dan **distributor serta pelanggan** di hilir. Dari sini lahir dua istilah:

- **SCM** — *Supply Chain Management*, mengurus sisi hulu: beli, buat, pindahkan, simpan
- **CRM** — *Customer Relationship Management*, mengurus sisi hilir: jual dan layani

**Business Information Systems**

Penerapan teknologi informasi pada kebutuhan organisasi dan manajerial untuk memberikan solusi bisnis [Petkov].

Fungsi bisnis organisasi dibagi dua: **fungsi utama** dan **fungsi pendukung** — SDM, keuangan, persediaan, infrastruktur, layanan informasi.

Laudon menggambarkan sistem informasi sebagai titik temu tiga hal: **organisasi**, **manajemen**, dan **teknologi**. Sistem yang hanya benar pada satu sisi akan gagal pada dua sisi lainnya.

**Front office dan back office**

- **Front office** — menghadap pelanggan: pemasaran, penjualan, manajemen pelanggan
- **Back office** — menjalankan operasi internal dan hubungan dengan pemasok: SDM, keuangan, manufaktur, kendali persediaan

**E-commerce**

Transaksi bisnis yang dilakukan secara elektronik:

- **B2B** — antar perusahaan
- **B2C** — perusahaan dengan konsumen
- **B2G** — perusahaan dengan instansi pemerintah

Perkembangannya ditentukan oleh empat hal: **akses internet**, **kepercayaan pengguna**, **sistem pembayaran yang lebih baik**, dan **keamanan internet dan web**.

Dampaknya dua arah: ia membuka peluang bagi usaha kecil menengah menjual secara global dengan biaya ringan, dan sekaligus **menaikkan kejahatan berteknologi tinggi**.

**Pengambilan keputusan**

- **Masalah** — kondisi yang berpotensi menimbulkan kerugian atau keuntungan di luar kebiasaan
- **Keputusan** — aksi atau strategi yang dipilih
- **Gejala** — kondisi yang **dihasilkan oleh** masalah, menggambarkannya hanya sebagian

Gejala mengikuti **kaidah gunung es**: yang terlihat jauh lebih kecil daripada yang sebenarnya. Karena itu langkah pertama penyelesaian masalah adalah **membedakan gejala dari masalah** — anggap semua kondisi sebagai gejala, lalu cari akarnya.

**Dua jenis keputusan** [Simon]

- **Terprogram** — berulang, rutin, ada prosedur bakunya
- **Tidak terprogram** — tidak terstruktur, umumnya berbentuk skenario, untuk masalah yang belum pernah ada

**Empat tahap keputusan** [Simon]

**Intelligence** → **Design** → **Choice** → **Implementation**

- **Intelligence** — menganalisis data dan informasi untuk menemukan masalah dan peluang
- **Design** — merumuskan masalah dan menyusun solusinya, lalu menguji kelayakannya
- **Choice** — memilih satu alternatif
- **Implementation** — menjalankannya

Di sinilah beda MIS dan DSS menjadi jelas. **MIS menolong tahap Intelligence dan Implementation**; **DSS menolong keempat tahapnya** — termasuk Design dan Choice, yang tidak tersentuh laporan berkala.

**Kenapa keputusan manusia tidak pernah sepenuhnya rasional** [Simon]

Tiga keterbatasan yang tidak bisa dihilangkan:

- **waktu terbatas** — banyak keputusan harus diambil dalam waktu singkat
- **informasi terbatas** — data yang tersedia terbatas, dan waktu mengumpulkannya juga terbatas
- **kemampuan mengolah informasi terbatas** — manusia punya batas dalam menafsirkan dan mengingat, dan sisi bukan-rasional sering berpengaruh besar

Karena itu Simon menyimpulkan orang tidak mencari yang **terbaik**, melainkan yang **cukup baik** — *satisficing*. Dan karena informasi adalah darah bagi organisasi, organisasi membentuk sistem informasi untuk mengurangi ketiga keterbatasan itu.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# EFISIENSI PROSES = KERJA NYATA / LEAD TIME\n#\n# Proses pengajuan cuti kuliah:\n#   kerja nyata     : 55 menit\n#   total menunggu  : 216 jam (9 hari)\n#   lead time       : 9.0 hari\n#   efisiensi proses: 0.42%\n#\n# Mempercepat KERJA dua kali lipat:\n#   9.0 hari -> 9.0 hari   (hemat 0.2%)\n#\n# Memangkas MENUNGGU setengahnya:\n#   9.0 hari -> 4.5 hari   (hemat 49.8%)\n#\n# Seluruh waktu menunggu terjadi di PENYERAHAN\n# antar bagian, bukan di dalam bagian mana pun.',
      penjelasan: `
Angka **0,42 persen** itu bukan contoh yang dilebih-lebihkan. Ia bentuk yang lazim pada proses yang melintasi banyak bagian, dan alasannya bisa dilihat langsung.

Kerja nyatanya cuma 55 menit — kurang dari satu jam. Tetapi 55 menit itu tersebar di **enam langkah** yang dikerjakan **empat pihak berbeda**, dan di antara tiap langkah ada **antrean**.

Antrean itu bukan kemalasan. Petugas akademik tidak duduk menunggu berkasmu; ia sedang mengerjakan berkas orang lain. Berkasmu masuk tumpukan, dan tumpukan itu diperiksa dua hari sekali. Dari sudut pandang petugas, **ia bekerja penuh dan cepat**. Dari sudut pandang berkasmu, ia menunggu 48 jam.

Inilah sebab kesalahan yang paling mahal dalam memperbaiki proses: **tiap bagian mengukur dirinya sendiri, dan semuanya benar.**

Sekarang bandingkan dua cara memperbaiki.

**Cara A — percepat kerjanya dua kali lipat.** Beli komputer lebih cepat, tambah petugas, sederhanakan formulir. Kerja turun dari 55 menit ke 27,5 menit. Lead time turun dari 9,0 hari ke... 9,0 hari. Penghematannya **0,2 persen**.

**Cara B — pangkas waktu tunggunya setengah.** Tidak ada yang bekerja lebih cepat. Yang berubah cuma tumpukannya diperiksa tiap hari, bukan dua hari sekali. Lead time turun ke 4,5 hari. Penghematannya **hampir 50 persen**.

Selisihnya bukan tipis. Cara A hampir tidak berpengaruh; cara B memangkas separuhnya.

Dan perhatikan yang lebih tajam: **cara A biasanya yang dibeli.** Ia terlihat seperti kemajuan — ada barang baru, ada yang bisa ditunjukkan. Cara B tidak membeli apa pun; ia mengubah **kesepakatan antar bagian**. Tidak ada yang bisa difoto, dan justru itu yang berhasil.

Dari sini dua hal yang lebih besar menjadi jelas.

**Pertama, kenapa proses bisnis dianalisis melintang, bukan per bagian.** Kalau kamu memeriksa tiap bagian sendiri-sendiri, kamu tidak akan pernah melihat waktu tunggunya — karena waktu tunggu itu **tidak berada di dalam bagian mana pun**. Ia ada di ruang antara mereka, dan tidak ada yang merasa memilikinya.

**Kedua, kenapa sistem informasi bisa berdampak besar di sini.** Bukan karena ia mempercepat perhitungan. Melainkan karena ia **menghapus penyerahannya**: berkas tidak lagi berpindah tumpukan, ia muncul serentak di layar semua pihak yang harus menyetujui.

Kalau tiga persetujuan yang tadinya berurutan bisa berjalan **bersamaan**, waktu tunggunya bukan berkurang — sebagian besar **hilang**.

Dan ada peringatan yang mengikutinya. Kalau sistem informasi dipasang **mengikuti alur lama** — layar berkas yang tetap berpindah dari satu meja ke meja berikutnya, dengan urutan dan tumpukan yang sama — maka penyerahannya masih ada, dan waktu tunggunya juga. Yang kamu dapat cuma versi digital dari proses yang sama lambatnya.

Itulah sebabnya penerapan sistem informasi sering dibarengi **perancangan ulang proses bisnis**. Mengotomatiskan proses yang buruk hanya membuatnya buruk lebih cepat.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Proses bisnis, rantai nilai, pengambilan keputusan
# ============================================

# --------------------------------------------
# 1. Satu proses melintasi banyak bagian
# --------------------------------------------
# (nama langkah, bagian, menit kerja nyata, jam menunggu)
PROSES = [
    ("Mahasiswa mengisi formulir",      "Mahasiswa",   10,   0),
    ("Verifikasi berkas",               "Akademik",    15,  48),
    ("Persetujuan dosen wali",          "Dosen",       10,  72),
    ("Cek tunggakan",                   "Keuangan",     5,  24),
    ("Pengesahan",                      "Akademik",     8,  48),
    ("Cetak & serahkan",                "Akademik",     7,  24),
]

print("--- proses: pengajuan cuti kuliah ---")
print("  " + "langkah".ljust(30) + "bagian".ljust(12)
      + "kerja".rjust(8) + "tunggu".rjust(10))
for langkah, bagian, kerja, tunggu in PROSES:
    print("  " + langkah.ljust(30) + bagian.ljust(12)
          + (str(kerja) + " mnt").rjust(8)
          + (str(tunggu) + " jam").rjust(10))

kerja_total = sum(p[2] for p in PROSES)
tunggu_total = sum(p[3] for p in PROSES)
lead_menit = kerja_total + tunggu_total * 60
efisiensi = kerja_total / lead_menit * 100

print("")
print("  kerja nyata      : " + str(kerja_total) + " menit ("
      + ("%.1f" % (kerja_total / 60)) + " jam)")
print("  total menunggu   : " + str(tunggu_total) + " jam ("
      + ("%.1f" % (tunggu_total / 24)) + " hari)")
print("  lead time        : " + ("%.1f" % (lead_menit / 60 / 24))
      + " hari")
print("  efisiensi proses : " + ("%.2f%%" % efisiensi))
print("")
print("  Hanya " + ("%.2f%%" % efisiensi) + " waktunya dipakai bekerja.")
print("  Sisanya menunggu -- dan seluruh waktu menunggu itu")
print("  terjadi di PENYERAHAN antar bagian, bukan di dalam")
print("  bagian mana pun.")

# --------------------------------------------
# 2. Di mana perbaikan paling berdampak
# --------------------------------------------
print("")
print("--- dua cara memperbaiki ---")
# Cara A: percepat kerja 2x
lead_a = kerja_total / 2 + tunggu_total * 60
# Cara B: potong separuh waktu tunggu
lead_b = kerja_total + tunggu_total * 60 / 2
print("  keadaan sekarang         : "
      + ("%.1f" % (lead_menit / 60 / 24)) + " hari")
print("  A. kerja dipercepat 2x   : "
      + ("%.1f" % (lead_a / 60 / 24)) + " hari  (hemat "
      + ("%.1f%%" % ((1 - lead_a / lead_menit) * 100)) + ")")
print("  B. tunggu dipangkas 1/2  : "
      + ("%.1f" % (lead_b / 60 / 24)) + " hari  (hemat "
      + ("%.1f%%" % ((1 - lead_b / lead_menit) * 100)) + ")")
print("")
print("  Menambah orang atau komputer mempercepat KERJA.")
print("  Yang menghabiskan waktu justru MENUNGGU. Itu sebabnya")
print("  proses bisnis dianalisis melintang, bukan per bagian:")
print("  tiap bagian bisa merasa sudah cepat, dan prosesnya")
print("  tetap makan berhari-hari.")

# --------------------------------------------
# 3. Rantai nilai: di mana marjinnya
# --------------------------------------------
print("")
print("--- rantai nilai satu produk (harga jual 100) ---")
AKTIVITAS = [
    ("Logistik masuk",     "utama",     18),
    ("Operasi/produksi",   "utama",     30),
    ("Logistik keluar",    "utama",      7),
    ("Pemasaran & jual",   "utama",     14),
    ("Layanan purna jual", "utama",      5),
    ("Pengadaan",          "pendukung",  4),
    ("Pengembangan teknologi", "pendukung", 6),
    ("Manajemen SDM",      "pendukung",  5),
    ("Infrastruktur",      "pendukung",  3),
]
total_biaya = sum(a[2] for a in AKTIVITAS)
print("  " + "aktivitas".ljust(26) + "jenis".ljust(12) + "biaya")
for nama, jenis, biaya in AKTIVITAS:
    print("  " + nama.ljust(26) + jenis.ljust(12) + str(biaya))
print("  " + "-" * 46)
print("  " + "total biaya".ljust(38) + str(total_biaya))
print("  " + "MARJIN".ljust(38) + str(100 - total_biaya))
print("")
print("  Marjinnya hanya " + str(100 - total_biaya)
      + " dari 100. Menekan biaya operasi 10%")
print("  menambah marjin " + ("%.1f" % (30 * 0.10)) + " -- naik "
      + ("%.0f%%" % (30 * 0.10 / (100 - total_biaya) * 100))
      + " dari marjin semula.")
print("  Itu sebabnya perbaikan kecil di aktivitas terbesar")
print("  berdampak jauh lebih besar daripada yang terlihat.")

# --------------------------------------------
# 4. Keputusan terprogram vs tidak terprogram
# --------------------------------------------
print("")
print("--- dua jenis keputusan (Herbert Simon) ---")
KEPUTUSAN = [
    ("Berapa kembalian pembayaran ini?",   "terprogram",
     "aturannya pasti -> otomatis penuh"),
    ("Berapa stok yang perlu dipesan?",    "terprogram",
     "ada rumusnya -> TPS/MIS cukup"),
    ("Haruskah kita buka cabang baru?",    "tidak terprogram",
     "tak ada rumusnya -> DSS membantu, bukan memutuskan"),
    ("Siapa yang layak dipromosikan?",     "tidak terprogram",
     "melibatkan nilai -> tetap keputusan manusia"),
]
for pertanyaan, jenis, catatan in KEPUTUSAN:
    print("  " + pertanyaan)
    print("      " + jenis)
    print("      " + catatan)

print("")
print("--- empat tahap Simon ---")
TAHAP = [
    ("Intelligence", "menemukan masalah / peluang dari data"),
    ("Design",       "menyusun alternatif solusi"),
    ("Choice",       "memilih satu alternatif"),
    ("Implementation","menjalankan pilihan itu"),
]
for i, (nama, isi) in enumerate(TAHAP, 1):
    print("  " + str(i) + ". " + nama.ljust(16) + isi)
print("")
print("  MIS menolong tahap 1 dan 4.")
print("  DSS menolong tahap 1 sampai 4 -- termasuk Design dan")
print("  Choice, yang tidak tersentuh laporan berkala.")
print("  Itulah beda MIS dan DSS yang sesungguhnya.")` },
  output: `--- proses: pengajuan cuti kuliah ---
  langkah                       bagian         kerja    tunggu
  Mahasiswa mengisi formulir    Mahasiswa     10 mnt     0 jam
  Verifikasi berkas             Akademik      15 mnt    48 jam
  Persetujuan dosen wali        Dosen         10 mnt    72 jam
  Cek tunggakan                 Keuangan       5 mnt    24 jam
  Pengesahan                    Akademik       8 mnt    48 jam
  Cetak & serahkan              Akademik       7 mnt    24 jam

  kerja nyata      : 55 menit (0.9 jam)
  total menunggu   : 216 jam (9.0 hari)
  lead time        : 9.0 hari
  efisiensi proses : 0.42%

  Hanya 0.42% waktunya dipakai bekerja.
  Sisanya menunggu -- dan seluruh waktu menunggu itu
  terjadi di PENYERAHAN antar bagian, bukan di dalam
  bagian mana pun.

--- dua cara memperbaiki ---
  keadaan sekarang         : 9.0 hari
  A. kerja dipercepat 2x   : 9.0 hari  (hemat 0.2%)
  B. tunggu dipangkas 1/2  : 4.5 hari  (hemat 49.8%)

  Menambah orang atau komputer mempercepat KERJA.
  Yang menghabiskan waktu justru MENUNGGU. Itu sebabnya
  proses bisnis dianalisis melintang, bukan per bagian:
  tiap bagian bisa merasa sudah cepat, dan prosesnya
  tetap makan berhari-hari.

--- rantai nilai satu produk (harga jual 100) ---
  aktivitas                 jenis       biaya
  Logistik masuk            utama       18
  Operasi/produksi          utama       30
  Logistik keluar           utama       7
  Pemasaran & jual          utama       14
  Layanan purna jual        utama       5
  Pengadaan                 pendukung   4
  Pengembangan teknologi    pendukung   6
  Manajemen SDM             pendukung   5
  Infrastruktur             pendukung   3
  ----------------------------------------------
  total biaya                           92
  MARJIN                                8

  Marjinnya hanya 8 dari 100. Menekan biaya operasi 10%
  menambah marjin 3.0 -- naik 38% dari marjin semula.
  Itu sebabnya perbaikan kecil di aktivitas terbesar
  berdampak jauh lebih besar daripada yang terlihat.

--- dua jenis keputusan (Herbert Simon) ---
  Berapa kembalian pembayaran ini?
      terprogram
      aturannya pasti -> otomatis penuh
  Berapa stok yang perlu dipesan?
      terprogram
      ada rumusnya -> TPS/MIS cukup
  Haruskah kita buka cabang baru?
      tidak terprogram
      tak ada rumusnya -> DSS membantu, bukan memutuskan
  Siapa yang layak dipromosikan?
      tidak terprogram
      melibatkan nilai -> tetap keputusan manusia

--- empat tahap Simon ---
  1. Intelligence    menemukan masalah / peluang dari data
  2. Design          menyusun alternatif solusi
  3. Choice          memilih satu alternatif
  4. Implementation  menjalankan pilihan itu

  MIS menolong tahap 1 dan 4.
  DSS menolong tahap 1 sampai 4 -- termasuk Design dan
  Choice, yang tidak tersentuh laporan berkala.
  Itulah beda MIS dan DSS yang sesungguhnya.`,

  kesalahanUmum: [
    {
      salah: 'Memperbaiki proses dengan mempercepat kerja tiap bagian secara terpisah.',
      kenapa: 'Pada proses lintas bagian, sebagian besar waktu habis untuk menunggu di penyerahan antar bagian, bukan untuk bekerja. Menggandakan kecepatan kerja pada contoh nyata cuma memangkas dua per seribu lead time-nya.',
      benar: 'Ukur lead time dan waktu kerja nyatanya secara terpisah, lalu perbaiki penyerahan antar bagian lebih dulu.'
    },
    {
      salah: 'Menyimpulkan prosesnya sudah cepat karena tiap bagian melaporkan waktu penyelesaian yang singkat.',
      kenapa: 'Tiap bagian mengukur waktu sejak ia mulai mengerjakan, bukan sejak berkasnya tiba. Waktu tunggu di tumpukan tidak berada di dalam bagian mana pun sehingga tidak ada yang melaporkannya, padahal justru itu bagian terbesarnya.',
      benar: 'Ukur dari sudut pandang berkas atau pelanggan, dari permintaan masuk sampai hasilnya diterima.'
    },
    {
      salah: 'Mengotomatiskan proses yang ada apa adanya tanpa merancang ulang alurnya.',
      kenapa: 'Kalau alurnya tetap berurutan dan tetap berpindah dari satu meja ke meja berikutnya, penyerahannya masih ada dan waktu tunggunya juga. Hasilnya versi digital dari proses yang sama lambatnya, dengan biaya pembangunan yang sudah terlanjur keluar.',
      benar: 'Periksa dulu langkah mana yang bisa berjalan bersamaan atau dihapus, baru bangun sistemnya untuk alur yang sudah diperbaiki.'
    },
    {
      salah: 'Mengejar gejala yang paling menonjol sebagai kalau itu masalahnya.',
      kenapa: 'Gejala adalah kondisi yang dihasilkan oleh masalah dan hanya menggambarkannya sebagian, mengikuti kaidah gunung es. Memperbaiki gejala membuatnya hilang sebentar lalu muncul lagi dalam bentuk lain.',
      benar: 'Anggap setiap kondisi yang terlihat sebagai gejala, lalu telusuri akarnya sebelum memilih perbaikan.'
    },
    {
      salah: 'Mengira DSS hanyalah MIS yang tampilannya lebih bagus.',
      kenapa: 'MIS menolong tahap Intelligence dan Implementation dengan laporan yang bentuk dan isinya sudah ditetapkan sebelumnya. DSS menolong keempat tahap Simon, termasuk Design dan Choice, karena ia memungkinkan pengguna menyusun dan menguji alternatif yang belum terpikirkan saat sistemnya dibangun.',
      benar: 'Tanyakan apakah pertanyaannya sudah diketahui sejak awal atau baru muncul saat dipakai, lalu pilih MIS atau DSS berdasarkan jawabannya.'
    },
    {
      salah: 'Menganggap keputusan yang baik adalah keputusan yang menunggu semua informasi lengkap.',
      kenapa: 'Simon menunjukkan tiga keterbatasan yang tidak bisa dihilangkan: waktu, informasi, dan kemampuan mengolah informasi. Menunggu kelengkapan berarti keputusannya diambil terlambat, dan keputusan tepat yang terlambat sering tidak lebih baik daripada tidak ada keputusan.',
      benar: 'Tetapkan lebih dulu informasi minimal yang benar-benar mengubah pilihan, lalu putuskan setelah itu tersedia.'
    }
  ],

  analogi: `Bayangkan kamu mengirim **satu surat lewat empat kantor pos**.

Tiap kantor pos memproses suratmu dalam **sepuluh menit**. Empat kantor, jadi empat puluh menit kerja.

Tapi tiap kantor mengumpulkan surat sepanjang hari dan baru mengirimnya sekali, sore hari. Jadi suratmu **menunggu semalaman di tiap kantor**.

Total: empat puluh menit kerja, empat hari perjalanan.

Sekarang datang usulan perbaikan. Kepala kantor pos membeli mesin sortir baru yang **dua kali lebih cepat** — sepuluh menit jadi lima. Ia bangga; ada mesin barunya, ada foto peresmiannya.

Suratmu sekarang sampai dalam... **empat hari**. Berkurang dua puluh menit dari empat hari.

Perbaikan yang sesungguhnya tidak butuh mesin apa pun: **kirim dua kali sehari, bukan sekali.** Suratmu sampai dalam dua hari. Tidak ada yang bekerja lebih cepat; yang berubah cuma jadwal penyerahan.

Dan perbaikan terbesarnya lebih sederhana lagi: **kenapa harus lewat empat kantor?**

Itu pertanyaan yang tidak akan pernah muncul kalau tiap kantor cuma memeriksa dirinya sendiri — karena tiap kantor **memang** sudah bekerja dengan baik.`,

  latihan: [
    'Jelaskan kenapa proses bisnis didefinisikan sebagai kegiatan yang memotong batas fungsional, dan apa akibatnya bagi cara menganalisisnya.',
    'Gambarkan rantai nilai Porter beserta kegiatan utama dan pendukungnya, lalu terapkan pada satu usaha kecil di sekitarmu.',
    'Ambil satu proses nyata di kampusmu, catat waktu kerja dan waktu tunggu tiap langkahnya, lalu hitung efisiensi prosesnya.',
    'Untuk proses yang sama, bandingkan penghematan dari mempercepat kerja dua kali lipat dengan memangkas waktu tunggu setengahnya.',
    'Jelaskan hubungan SCM dan CRM dengan rantai nilai, dan bagian mana yang diurus masing-masing.',
    'Sebutkan tiga jenis e-commerce beserta contohnya, lalu sebutkan empat hal yang menentukan perkembangannya.',
    'Jelaskan beda masalah, gejala, dan keputusan, lalu berikan satu contoh nyata gejala yang menyesatkan.',
    'Sebutkan empat tahap keputusan Simon, lalu jelaskan tahap mana yang ditolong MIS dan tahap mana yang ditolong DSS.',
    'Sebutkan tiga keterbatasan dalam pengambilan keputusan menurut Simon, dan jelaskan kenapa organisasi membentuk sistem informasi karenanya.',
    'Jelaskan kenapa mengotomatiskan proses tanpa merancang ulang alurnya hanya menghasilkan proses lama yang lebih mahal.'
  ]
});


TOPICS.push({
  id: 'sisfo-manajemen-data',
  judul: 'Manajemen Data Organisasi',
  kategori: 'sisfo',
  tag: ['sumber daya data', 'redundansi', 'metadata', 'kamus data', 'data warehouse', 'DBMS', 'basis data operasional'],
  ringkas: 'Kenapa alamat yang sama disimpan empat kali — dan kenapa itu bukan soal ruang penyimpanan.',

  fungsi: `**Menjaga agar organisasi punya satu jawaban, bukan empat jawaban yang semuanya terlihat benar.**

Terpakai di:

- **Merancang basis data** yang dipakai lebih dari satu bagian
- **Menyusun kamus data** — sering diminta di dokumen perancangan
- **Memutuskan** kapan data boleh disalin dan kapan tidak
- **Memisahkan** basis data operasional dari pelaporan

Yang paling sering salah diajarkan: **bahaya data ganda bukan pemborosan ruang.**

Ruang penyimpanan murah. Bahaya sesungguhnya muncul saat datanya berubah: salinan yang tertinggal **tidak menandai dirinya salah**, jadi tiap bagian memeriksa dan menemukan datanya benar.

Dan satu kaidah yang menjernihkan: **salinan yang berbahaya adalah salinan yang punya dua tuan.** Gudang data juga menyalin, tetapi ia diisi satu arah, hanya dibaca, dan tidak pernah jadi acuan harian.`,

  praktik: {
    tujuan: `Kamu punya kamus data yang disepakati lintas bagian, dan tahu salinan mana yang aman dan mana yang tidak.`,
    alat: [
      'Spreadsheet untuk kamus data',
      'Akses ke beberapa bagian untuk bertanya'
    ],
    langkah: [
      { judul: 'Cari field yang sama disimpan di banyak tempat',
        isi: `Daftar tabel di sistemmu, lalu cari field yang muncul lebih dari sekali: nama, alamat, nomor telepon.

Untuk tiap field, tanyakan: **siapa yang berwenang mengubahnya?**

Kalau jawabannya lebih dari satu, kamu menemukan salinan yang berbahaya.` },
      { judul: 'Buktikan sendiri bahayanya',
        isi: `Ubah satu nilai di satu salinan saja, lalu jalankan laporan dari tiap bagian.

Perhatikan bahwa **tidak ada galat**, tidak ada peringatan, dan tiap laporan tampak sah. Yang berbeda cuma angkanya.` },
      { judul: 'Hitung peluangnya',
        isi: `- peluang minimal satu salinan tertinggal = \`1 - (1 - p)^n\`

Isi p dengan perkiraan risiko tiap salinan, dan n dengan jumlah salinannya.

Angkanya naik lebih cepat daripada dugaan, karena tiap salinan tambahan adalah kesempatan baru untuk tidak sepakat.` },
      { judul: 'Tunjuk satu sumber kebenaran',
        isi: `Untuk tiap data bersama, tetapkan **satu** tempat yang berwenang. Yang lain membaca dari situ.

Tulis keputusan ini di dokumen, bukan disepakati lisan — karena orangnya akan berganti.` },
      { judul: 'Susun kamus datanya',
        isi: `Untuk tiap field: nama, tipe, aturan, dan **artinya**.

Kolom arti yang paling sering dilewatkan dan paling sering menyelamatkan. Tanpa itu, dua bagian bisa memakai kode yang sama untuk arti berbeda tanpa ada galat apa pun.` },
      { judul: 'Uji definisinya lintas bagian',
        isi: `Tanyakan ke beberapa bagian: apa arti "mahasiswa aktif" menurut mereka?

Jawaban yang berbeda **wajib** diselesaikan sebelum sistemnya dibangun, bukan sesudah laporannya tidak cocok.` },
      { judul: 'Pisahkan pelaporan dari operasional',
        isi: `Jalankan satu laporan berat di basis data operasionalmu sambil memantau waktu tanggapnya.

Kalau melambat, itu alasan langsung memisahkan basis data analitis — dan kamu punya buktinya sendiri.` },
      { judul: 'Terapkan tiga syarat salinan yang aman',
        isi: `Untuk tiap salinan yang kamu buat, pastikan ketiganya:

- diisi **satu arah** dari sumber resminya
- **hanya dibaca**, tidak pernah diubah di tempatnya
- **tidak pernah jadi acuan** untuk kegiatan harian

Salinan yang memenuhi ketiganya bukan masalah — ia alat.` }
    ],
    cek: [
      'Tiap data bersama punya tepat satu tempat yang berwenang mengubahnya',
      'Kamus datamu punya kolom arti, dan definisinya sudah disepakati lintas bagian',
      'Setiap salinan yang kamu buat memenuhi ketiga syarat salinan aman'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa data ganda bukan soal boros ruang',

  konsep: `
Di mata kuliah Basis Data kamu belajar **cara membuat** basis data. Di sini pertanyaannya berbeda: **kenapa organisasi perlu mengelola datanya sebagai sumber daya**, sejajar dengan uang, orang, dan peralatan.

Alasannya: kebanyakan organisasi tidak bisa bertahan tanpa data yang berkualitas tentang kegiatan internalnya dan lingkungan luarnya. Dan tekanan yang membuatnya mendesak: **perubahan yang cepat**, **pasar yang tidak terduga**, dan **usia produk yang memendek**.

**Hirarki data**

**Karakter → Field → Record → File → Database**

- **Karakter** — elemen data logis paling dasar
- **Field** — rangkaian karakter yang menyatakan **satu atribut** dari entitas
- **Record** — sekelompok field yang menggambarkan **satu entitas**
- **File** — sekelompok record sejenis
- **Database** — kumpulan record yang **saling berkaitan** dan terpadu

**Pendekatan file vs pendekatan database**

Pada pendekatan file, tiap bagian menyimpan datanya sendiri. Pendekatan **database** menyatukan record ke satu tempat yang diakses banyak aplikasi.

Yang menentukan adalah **kebebasan data** (*data independence*): data yang disimpan dalam database **tidak bergantung** pada program yang memakainya maupun media penyimpanannya.

Artinya program bisa berubah tanpa mengubah datanya, dan datanya bisa pindah media tanpa mengubah programnya.

**DBMS**

Perangkat lunak yang menjadi antarmuka antara pengguna dan database, dan mengendalikan **penciptaan**, **pemeliharaan**, serta **penggunaannya**.

Empat kegunaan utamanya:

- **Pengembangan database** — lewat **DDL** dan **kamus data**
- **Interogasi database** — lewat **bahasa query** dan pembangkit laporan
- **Pemeliharaan database** — pemutakhiran dari program pengolah transaksi
- **Pengembangan aplikasi** — lewat **DML** yang disisipkan ke program

**Kamus data dan metadata**

Kamus data adalah katalog yang berisi **metadata** — data tentang data: nama tiap field, tipenya, aturannya, dan artinya.

Kedengarannya birokratis, tetapi justru di sinilah letak salah satu sebab kegagalan sistem yang paling sulit dideteksi. Kalau dua bagian memakai kode yang sama untuk arti yang berbeda, tidak akan ada galat, tidak akan ada peringatan — sampai laporan keduanya dibandingkan dan angkanya tidak cocok.

**Tiga kegiatan dasar pendekatan database**

- **memutakhirkan dan memelihara** database bersama, mencerminkan transaksi dan kejadian baru
- **menyediakan informasi** yang dibutuhkan tiap aplikasi pengguna dari data bersama itu
- **menyediakan respons dan pelaporan** supaya pengguna bisa bertanya sendiri dan mendapat jawaban cepat

**Jenis-jenis database**

- **Operasional** — data rinci untuk menjalankan kegiatan sehari-hari. Disebut juga *transaction database* atau *production database*.
- **Analitis** — data dan informasi **yang sudah disarikan** dari database operasional dan sumber luar, untuk manajer. Diakses oleh DSS dan EIS.
- **Gudang data** (*data warehouse*) — data tahun berjalan **dan tahun-tahun sebelumnya**, yang sudah dibakukan dan dipadukan. Kegunaan utamanya mencari pola.
- **Tersebar** (*distributed*) — database di kantor cabang dan tempat kerja lain. Masalah utamanya menjaga pemutakhiran tetap konsisten.
- **End user** — berkas data yang dikembangkan pengguna di komputernya sendiri
- **Eksternal** — dari luar organisasi, berbayar maupun gratis

**Kenapa gudang data adalah salinan yang disengaja**

Ini bagian yang membingungkan kalau tidak dijelaskan. Bab sebelumnya menyebut data ganda sebagai masalah; sekarang gudang data justru **menyalin data dengan sengaja**.

Bedanya pada **arah dan kepemilikan**. Salinan yang bermasalah adalah salinan yang **bisa diubah masing-masing** dan tidak ada yang berwenang. Gudang data hanya **dibaca**, diisi satu arah dari sumber resminya, dan tidak pernah menjadi sumber kebenaran untuk kegiatan harian.

Alasannya praktis: query analitis membaca jutaan baris dan bisa berjalan lama. Menjalankannya di database operasional membuat kasir menunggu.

**Keuntungan pendekatan database**

- data ganda berkurang dan datanya terpadu
- bisa diakses banyak program dan pengguna
- program tidak bergantung pada format data maupun media penyimpanannya
- pengguna bisa bertanya dan mendapat laporan sendiri
- pemrograman jadi lebih sederhana
- keutuhan dan keamanan data meningkat, karena aksesnya dikendalikan oleh DBMS, kamus data, dan fungsi administrasi database
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# DATA GANDA: MASALAHNYA BUKAN RUANG\n#\n# 5 field yang sama disimpan di 4 bagian:\n#   ruang terbuang 18 MB  -> murah, tidak masalah\n#\n# Satu mahasiswa pindah kos, lapor ke 1 bagian:\n#   Akademik      : Jl. Melati No. 7   <- baru\n#   Keuangan      : Jl. Kampus No. 1\n#   Kemahasiswaan : Jl. Kampus No. 1\n#   Perpustakaan  : Jl. Kampus No. 1\n#\n# Alamat mana yang benar? Keempatnya ada di sistem,\n# dan TIDAK SATU PUN menandai dirinya salah.\n#\n# Peluang minimal satu salinan ketinggalan,\n# bila tiap salinan 5% berisiko:\n#   1 salinan  ->  5.0%\n#   4 salinan  -> 18.5%\n#   8 salinan  -> 33.7%',
      penjelasan: `
Alasan menghindari data ganda hampir selalu diajarkan sebagai **penghematan ruang**. Itu alasan yang paling lemah, dan hari ini hampir tidak berlaku.

Hitung sendiri: lima field, empat bagian, tiga puluh ribu mahasiswa. Ruang terbuangnya **18 MB**. Itu lebih kecil daripada satu video pendek. Tidak ada organisasi yang perlu mengubah cara kerjanya demi 18 MB.

Masalah yang sesungguhnya muncul saat datanya **berubah**.

Seorang mahasiswa pindah kos. Ia memberi tahu bagian akademik, karena di situlah ia mengurus KRS. Sekarang sistem organisasi berisi **empat alamat**, satu baru dan tiga lama.

Perhatikan yang paling berbahaya: **tidak ada satu pun yang salah secara teknis**. Tidak ada galat, tidak ada peringatan, tidak ada baris yang menandai dirinya kedaluwarsa. Keempat basis datanya sehat, konsisten secara internal, dan siap melayani.

Yang rusak bukan datanya. Yang rusak adalah **kesepakatan tentang mana yang benar** — dan kesepakatan itu tidak disimpan di mana pun.

Akibatnya terasa satu per satu dan tidak pernah tertelusuri ke sebabnya. Ijazah dikirim ke alamat lama. Tagihan dikirim ke alamat baru. Mahasiswanya mengeluh, tiap bagian memeriksa datanya masing-masing, dan **semuanya menemukan datanya benar**.

Sekarang lihat peluangnya. Kalau tiap salinan punya peluang 5 persen ketinggalan, maka peluang **minimal satu** salinan salah adalah \`1 - 0,95^n\`:

- **1** salinan → 5,0 persen
- **2** salinan → 9,8 persen
- **4** salinan → 18,5 persen
- **8** salinan → 33,7 persen

Perhatikan bentuknya. Peluangnya **tidak** naik lurus. Ia mendekati satu makin cepat karena tiap salinan tambahan adalah **kesempatan baru untuk tidak sepakat**, dan kesempatan-kesempatan itu bertumpuk.

Dari sini keuntungan pendekatan database bisa dinyatakan dengan lebih tepat. Ia **bukan** "menghemat penyimpanan". Ia **menghapus pertanyaan "mana yang benar"** dengan cara menghapus kemungkinan pertanyaan itu muncul: kalau alamatnya cuma ada satu, tidak ada yang perlu dibandingkan.

Dan sekarang gudang data bisa dijelaskan tanpa terasa bertentangan.

Gudang data juga menyalin data. Bedanya pada tiga hal. Ia diisi **satu arah** dari sumber resminya, jadi tidak pernah menyimpang sendiri. Ia **hanya dibaca**, jadi tidak ada yang bisa mengubahnya diam-diam. Dan ia **tidak pernah menjadi acuan** untuk kegiatan harian — kalau kasir butuh alamat, ia membaca database operasional, bukan gudang data.

Salinan yang berbahaya adalah salinan yang **punya dua tuan**. Salinan yang tuannya jelas satu bukan masalah — ia alat.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Data sebagai sumber daya organisasi
# ============================================

# --------------------------------------------
# 1. Hirarki data
# --------------------------------------------
print("--- hirarki data ---")
TINGKAT = [
    ("Karakter", "'H'", "satuan terkecil yang bermakna"),
    ("Field",    "'Hafizh Naufal Raditya'", "satu atribut dari entitas"),
    ("Record",   "(NIM, nama, prodi, IPK)", "satu entitas utuh"),
    ("File",     "30.000 record mahasiswa", "kumpulan entitas sejenis"),
    ("Database", "mahasiswa + nilai + dosen", "banyak file yang saling terkait"),
]
for nama, contoh, arti in TINGKAT:
    print("  " + nama.ljust(10) + arti)
    print("  " + " " * 10 + "contoh: " + contoh)

# --------------------------------------------
# 2. Pendekatan file: satu data disimpan berkali-kali
# --------------------------------------------
print("")
print("--- pendekatan file: tiap bagian menyimpan sendiri ---")
BAGIAN = ["Akademik", "Keuangan", "Kemahasiswaan", "Perpustakaan"]
FIELD_BERSAMA = ["NIM", "nama", "alamat", "no_hp", "prodi"]
mahasiswa = 30_000
byte_per_field = 40

for b in BAGIAN:
    print("  " + b.ljust(16) + "menyimpan " + ", ".join(FIELD_BERSAMA))

boros = (len(BAGIAN) - 1) * len(FIELD_BERSAMA) * byte_per_field * mahasiswa
print("")
print("  " + str(len(FIELD_BERSAMA)) + " field yang sama disalin ke "
      + str(len(BAGIAN)) + " tempat.")
print("  Ruang terbuang: " + ("%.1f MB" % (boros / 1_000_000)))
print("")
print("  Tapi ruang bukan masalah sesungguhnya -- "
      + ("%.0f MB" % (boros / 1_000_000)) + " itu murah.")
print("  Masalahnya yang berikut ini.")

# --------------------------------------------
# 3. Masalah sesungguhnya: data jadi tidak sepakat
# --------------------------------------------
print("")
print("--- satu mahasiswa pindah kos, memberi tahu 1 bagian ---")
salinan = {b: "Jl. Kampus No. 1" for b in BAGIAN}
salinan["Akademik"] = "Jl. Melati No. 7"
for b in BAGIAN:
    tanda = "  <- baru" if salinan[b] == "Jl. Melati No. 7" else ""
    print("  " + b.ljust(16) + salinan[b] + tanda)
print("")
print("  Sekarang alamat mana yang benar? Keempatnya ada di")
print("  sistem, dan tidak satu pun yang menandai dirinya salah.")
print("  Ijazah dikirim ke alamat lama, tagihan ke alamat baru.")

# --------------------------------------------
# 4. Peluang tidak sepakat naik cepat
# --------------------------------------------
print("")
print("--- peluang data tidak sepakat ---")
print("  Andai tiap salinan punya peluang 5% ketinggalan:")
p = 0.05
print("  " + "jumlah salinan".ljust(18) + "peluang minimal satu salah")
for n in (1, 2, 4, 8):
    peluang = 1 - (1 - p) ** n
    print("  " + str(n).ljust(18) + ("%.1f%%" % (peluang * 100)))
print("")
print("  Pendekatan database menyimpan SATU kali, lalu semua")
print("  bagian membacanya. Angka di atas kembali ke baris")
print("  pertama, dan pertanyaan 'mana yang benar' hilang.")

# --------------------------------------------
# 5. Database operasional vs analitis
# --------------------------------------------
print("")
print("--- dua jenis database, dua bentuk pertanyaan ---")
JENIS = [
    ("Operasional", "menjalankan kegiatan harian",
     "SELECT * FROM mhs WHERE nim = '...'",
     "1 baris, harus mutakhir detik ini"),
    ("Analitis",    "menjawab pertanyaan manajemen",
     "SELECT prodi, AVG(ipk) FROM ... GROUP BY prodi",
     "ringkasan jutaan baris, boleh data semalam"),
]
for nama, guna, contoh, sifat in JENIS:
    print("  " + nama)
    print("      untuk  : " + guna)
    print("      query  : " + contoh)
    print("      sifat  : " + sifat)
print("")
print("  Menjalankan query analitis di database operasional")
print("  membuat kasir menunggu. Itu sebabnya data disalin ke")
print("  gudang data (data warehouse) -- salinan yang DISENGAJA,")
print("  berbeda dari salinan tak sengaja di bagian 2.")

# --------------------------------------------
# 6. Metadata: data tentang data
# --------------------------------------------
print("")
print("--- metadata ---")
KAMUS = [
    ("nim",   "CHAR(9)",     "wajib, unik", "nomor induk mahasiswa"),
    ("nama",  "VARCHAR(80)", "wajib",       "nama sesuai ijazah"),
    ("ipk",   "DECIMAL(3,2)","0.00 - 4.00", "dihitung tiap semester"),
    ("status","CHAR(1)",     "A/C/L/D",     "Aktif Cuti Lulus Dropout"),
]
print("  " + "field".ljust(9) + "tipe".ljust(15)
      + "aturan".ljust(14) + "arti")
for nama, tipe, aturan, arti in KAMUS:
    print("  " + nama.ljust(9) + tipe.ljust(15)
          + aturan.ljust(14) + arti)
print("")
print("  Tanpa baris 'status', dua bagian bisa memakai kode C")
print("  untuk arti yang berbeda dan tidak ada yang menyadarinya")
print("  sampai laporannya dibandingkan.")` },
  output: `--- hirarki data ---
  Karakter  satuan terkecil yang bermakna
            contoh: 'H'
  Field     satu atribut dari entitas
            contoh: 'Hafizh Naufal Raditya'
  Record    satu entitas utuh
            contoh: (NIM, nama, prodi, IPK)
  File      kumpulan entitas sejenis
            contoh: 30.000 record mahasiswa
  Database  banyak file yang saling terkait
            contoh: mahasiswa + nilai + dosen

--- pendekatan file: tiap bagian menyimpan sendiri ---
  Akademik        menyimpan NIM, nama, alamat, no_hp, prodi
  Keuangan        menyimpan NIM, nama, alamat, no_hp, prodi
  Kemahasiswaan   menyimpan NIM, nama, alamat, no_hp, prodi
  Perpustakaan    menyimpan NIM, nama, alamat, no_hp, prodi

  5 field yang sama disalin ke 4 tempat.
  Ruang terbuang: 18.0 MB

  Tapi ruang bukan masalah sesungguhnya -- 18 MB itu murah.
  Masalahnya yang berikut ini.

--- satu mahasiswa pindah kos, memberi tahu 1 bagian ---
  Akademik        Jl. Melati No. 7  <- baru
  Keuangan        Jl. Kampus No. 1
  Kemahasiswaan   Jl. Kampus No. 1
  Perpustakaan    Jl. Kampus No. 1

  Sekarang alamat mana yang benar? Keempatnya ada di
  sistem, dan tidak satu pun yang menandai dirinya salah.
  Ijazah dikirim ke alamat lama, tagihan ke alamat baru.

--- peluang data tidak sepakat ---
  Andai tiap salinan punya peluang 5% ketinggalan:
  jumlah salinan    peluang minimal satu salah
  1                 5.0%
  2                 9.8%
  4                 18.5%
  8                 33.7%

  Pendekatan database menyimpan SATU kali, lalu semua
  bagian membacanya. Angka di atas kembali ke baris
  pertama, dan pertanyaan 'mana yang benar' hilang.

--- dua jenis database, dua bentuk pertanyaan ---
  Operasional
      untuk  : menjalankan kegiatan harian
      query  : SELECT * FROM mhs WHERE nim = '...'
      sifat  : 1 baris, harus mutakhir detik ini
  Analitis
      untuk  : menjawab pertanyaan manajemen
      query  : SELECT prodi, AVG(ipk) FROM ... GROUP BY prodi
      sifat  : ringkasan jutaan baris, boleh data semalam

  Menjalankan query analitis di database operasional
  membuat kasir menunggu. Itu sebabnya data disalin ke
  gudang data (data warehouse) -- salinan yang DISENGAJA,
  berbeda dari salinan tak sengaja di bagian 2.

--- metadata ---
  field    tipe           aturan        arti
  nim      CHAR(9)        wajib, unik   nomor induk mahasiswa
  nama     VARCHAR(80)    wajib         nama sesuai ijazah
  ipk      DECIMAL(3,2)   0.00 - 4.00   dihitung tiap semester
  status   CHAR(1)        A/C/L/D       Aktif Cuti Lulus Dropout

  Tanpa baris 'status', dua bagian bisa memakai kode C
  untuk arti yang berbeda dan tidak ada yang menyadarinya
  sampai laporannya dibandingkan.`,

  kesalahanUmum: [
    {
      salah: 'Menjelaskan bahaya data ganda sebagai pemborosan ruang penyimpanan.',
      kenapa: 'Ruang penyimpanan hari ini murah, dan pada contoh nyata pemborosannya cuma 18 MB. Bahaya yang sesungguhnya muncul saat datanya berubah: salinan yang tertinggal tidak menandai dirinya salah, sehingga tiap bagian memeriksa dan menemukan datanya benar.',
      benar: 'Jelaskan bahayanya sebagai hilangnya kesepakatan tentang mana yang benar, lalu tunjukkan satu contoh perubahan yang tidak sampai ke semua salinan.'
    },
    {
      salah: 'Menganggap gudang data bertentangan dengan prinsip menghindari data ganda.',
      kenapa: 'Yang berbahaya adalah salinan yang bisa diubah masing-masing dan tidak ada yang berwenang. Gudang data diisi satu arah dari sumber resminya, hanya dibaca, dan tidak pernah menjadi acuan untuk kegiatan harian, sehingga tidak pernah menimbulkan pertanyaan mana yang benar.',
      benar: 'Bedakan salinan berdasarkan siapa yang berwenang mengubahnya, bukan berdasarkan ada tidaknya salinan.'
    },
    {
      salah: 'Menjalankan laporan analitis yang berat langsung di database operasional.',
      kenapa: 'Query analitis membaca jutaan baris dan bisa berjalan lama, sementara database operasional harus menjawab dalam hitungan milidetik supaya kasir tidak menunggu. Keduanya bersaing memperebutkan sumber daya yang sama.',
      benar: 'Salin data ke database analitis atau gudang data untuk keperluan pelaporan, dan biarkan database operasional melayani transaksi.'
    },
    {
      salah: 'Melewatkan kamus data karena dianggap dokumentasi yang bisa dibuat belakangan.',
      kenapa: 'Kamus data memuat arti tiap field, dan tanpa itu dua bagian bisa memakai kode yang sama untuk arti yang berbeda. Kesalahan seperti ini tidak menimbulkan galat apa pun dan baru ketahuan saat laporan kedua bagian dibandingkan.',
      benar: 'Tulis arti dan aturan tiap field bersamaan dengan pembuatan tabelnya, dan sepakati definisinya lintas bagian sebelum sistemnya dipakai.'
    },
    {
      salah: 'Merancang database mengikuti bentuk satu program aplikasi tertentu.',
      kenapa: 'Prinsip kebebasan data menyatakan data tidak boleh bergantung pada program yang memakainya. Database yang bentuknya mengikuti satu aplikasi akan harus dibongkar ketika aplikasi kedua membutuhkan data yang sama dengan cara pandang berbeda.',
      benar: 'Rancang database dari entitas dan hubungan yang ada di dunia nyata, bukan dari layar aplikasi yang kebetulan dibangun lebih dulu.'
    }
  ],

  analogi: `Bayangkan **nomor telepon orang tuamu** disimpan di empat tempat: kontak HP-mu, buku catatan di rumah, formulir pendaftaran kampus, dan grup keluarga.

Ruangnya? Tidak ada yang peduli. Empat baris teks.

Lalu orang tuamu **ganti nomor**. Mereka memberi tahu lewat grup keluarga.

Sekarang kamu punya empat nomor. Satu benar, tiga salah. Dan tidak satu pun dari keempatnya bertuliskan *"nomor ini sudah tidak berlaku"* — semuanya tampak sama sahnya.

Setahun kemudian, ada keadaan darurat di kampus. Petugas menelepon nomor di formulir pendaftaran. Tidak aktif. Ia mengira orang tuamu tidak bisa dihubungi.

**Masalahnya bukan empat baris teks itu memakan tempat.** Masalahnya kamu tidak punya cara mengetahui yang mana yang benar, dan setiap salinan baru menambah satu kemungkinan salah.

Sekarang bandingkan dengan **satu nomor di satu tempat**, yang semua orang baca dari situ. Ganti nomor sekali, semua ikut berubah. Pertanyaan *"yang mana yang benar"* **tidak pernah muncul** — dan itu jauh lebih baik daripada punya cara menjawabnya.`,

  latihan: [
    'Sebutkan hirarki data dari karakter sampai database, beserta satu contoh nyata untuk tiap tingkat.',
    'Jelaskan apa itu kebebasan data, dan berikan satu contoh perubahan yang menjadi mudah karenanya.',
    'Hitung ruang terbuang bila lima field disimpan di empat bagian untuk 30.000 mahasiswa, lalu jelaskan kenapa angka itu bukan alasan utama menghindari data ganda.',
    'Hitung peluang minimal satu salinan tertinggal untuk 2, 4, dan 8 salinan bila tiap salinan berisiko 5 persen, lalu jelaskan bentuk kurvanya.',
    'Sebutkan empat kegunaan utama DBMS beserta perangkat yang dipakainya masing-masing.',
    'Jelaskan apa itu metadata, lalu tulis kamus data untuk lima field dari satu tabel di proyekmu sendiri.',
    'Sebutkan enam jenis database beserta perbedaan penggunaannya.',
    'Jelaskan kenapa gudang data tidak bertentangan dengan prinsip menghindari data ganda, dengan menyebut tiga hal yang membedakannya.',
    'Jelaskan kenapa laporan analitis sebaiknya tidak dijalankan di database operasional.'
  ]
});


TOPICS.push({
  id: 'sisfo-resource-budgeting',
  judul: 'Perencanaan Sumber Daya & Anggaran',
  kategori: 'sisfo',
  tag: ['COCOMO', 'estimasi biaya', 'WBS', 'Gantt', 'RACI', 'cadangan risiko', 'segitiga proyek', 'cost overrun'],
  ringkas: 'Menggandakan ukuran proyek tidak menggandakan biayanya — ia melebihinya.',

  fungsi: `**Mengetahui sejak awal apakah rencanamu mungkin dikerjakan — sebelum menyanggupinya.**

Terpakai di:

- **Menyusun proposal** proyek atau tugas akhir
- **Menjawab permintaan** percepatan jadwal atau penambahan fitur
- **Menghitung** apakah timmu cukup untuk lingkup yang diminta
- **Kerja nyata** — hampir semua proyek diminta estimasinya lebih dulu

Yang paling menyelamatkan: **eksponen ukuran pada COCOMO di atas satu.**

Artinya menggandakan lingkup **lebih dari** menggandakan biaya, dan perkiraan lurus selalu terlalu murah. Ini bukan pesimisme; ini hasil pengukuran 63 proyek nyata.

Dan yang paling sering disalahpahami: **eksponen waktu di bawah satu tidak berarti menambah orang mempercepat jadwal.** Rumusnya menghitung berapa orang yang **dibutuhkan**, bukan seberapa cepat selesai kalau orangnya ditambah.`,

  praktik: {
    tujuan: `Kamu punya estimasi proyek dengan dua metode, cadangan risiko yang disebutkan terbuka, dan pembagian tanggung jawab yang jelas.`,
    alat: [
      'Spreadsheet atau Python',
      'Daftar kegiatan proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Susun WBS sampai paket kerja',
        isi: `Pecah pekerjaan sampai tiap potongan bisa diperkirakan **biaya, jadwal, dan penanggung jawabnya**.

Kalau sebuah potongan belum bisa diperkirakan ketiganya, ia masih terlalu besar. Pecah lagi.` },
      { judul: 'Estimasi bottom-up dari WBS itu',
        isi: `Untuk tiap paket kerja: berapa hari, tarif berapa per hari, jadi berapa biayanya.

Jumlahkan. Ini angka yang **bisa dibantah baris per baris** — dan itulah kekuatannya.` },
      { judul: 'Estimasi top-down dari pagu',
        isi: `Ambil pagu yang tersedia, lalu bagi menurut porsi tahapan: analisis, perancangan, konstruksi, pengujian, penerapan.

Cepat, kasar, dan berguna sebagai pembanding.` },
      { judul: 'Perdebatkan selisihnya',
        isi: `Kedua angka pasti berbeda. Selisih itu **bukan kesalahan hitung** — ia pertanyaan.

Paket kerja mana yang dipotong, atau pagunya yang dinaikkan? Menjawabnya sekarang jauh lebih murah daripada menjawabnya di bulan keenam.` },
      { judul: 'Hitung dengan COCOMO sebagai pemeriksa',
        isi: `Perkirakan ukurannya dalam KLOC, lalu hitung effort dan waktunya untuk mode yang sesuai.

Bandingkan dengan janji yang hendak kamu buat. Kalau jauh berbeda, periksa ulang **sebelum** menyanggupi.

Perlakukan angkanya sebagai perkiraan kasar, bukan ramalan — datanya dari 1981.` },
      { judul: 'Buktikan sendiri kedua eksponennya',
        isi: `Hitung effort untuk KLOC yang berlipat dua, lalu bagi dengan KLOC-nya.

Angka per satuan itu **naik**. Lalu hitung waktunya, dan lihat ia naik jauh lebih lambat.

Melihat kedua kolomnya sendiri lebih meyakinkan daripada membaca rumusnya.` },
      { judul: 'Sisipkan cadangan risiko dan uji dengan skenario',
        isi: `Tambahkan cadangan, lalu uji: kebutuhan berubah sekali, satu anggota tim keluar, integrasi lebih sulit.

Hitung skenario mana yang tertutup dan mana yang tidak. Angka yang jujur lebih berguna daripada angka yang menenangkan.` },
      { judul: 'Buat RACI-nya',
        isi: `Satu baris per kegiatan, satu kolom per peran.

Aturan yang tidak boleh dilanggar: **tepat satu A** per baris. Boleh banyak R, tetapi penanggung jawab akhir harus satu.

Baris tanpa A adalah kegiatan yang akan terbengkalai tanpa ada yang merasa bersalah.` },
      { judul: 'Jawab permintaan perubahan dengan segitiga',
        isi: `Ketika diminta mempercepat, menambah fitur, atau memotong anggaran, ajukan pilihannya secara terbuka.

Menyanggupi tanpa mengubah sisi lain berarti diam-diam memilih mengorbankan **mutu** — dan itu baru terlihat setelah sistemnya dipakai.` }
    ],
    cek: [
      'Kamu punya dua angka estimasi dan sudah membahas selisihnya',
      'Anggaranmu memuat cadangan risiko dengan skenario yang diuji',
      'Tiap baris RACI-mu punya tepat satu penanggung jawab akhir'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa perkiraan proyek hampir selalu terlalu murah',

  konsep: `
Proyek sistem informasi gagal bukan karena kodenya salah, melainkan karena **kehabisan waktu atau uang**. Karena itu perencanaan sumber daya dan anggaran bukan urusan administrasi — ia bagian dari rekayasa.

**Dua hal yang direncanakan**

- **Resource planning** — menentukan kebutuhan sumber daya: manusia, perangkat keras, perangkat lunak, data, dan fasilitas
- **Budgeting planning** — merencanakan dan mengalokasikan biaya untuk **seluruh daur hidup** sistem

Perhatikan *seluruh daur hidup*. Anggaran yang hanya menghitung sampai serah terima melewatkan bagian yang sering paling mahal: **pengoperasian dan pemeliharaan** selama bertahun-tahun sesudahnya.

**Jenis sumber daya**

- **manusia** — analis, programmer, manajer proyek, wakil pengguna, teknisi jaringan
- **perangkat keras** — server, klien, penyimpanan, jaringan
- **perangkat lunak** — lisensi sistem operasi, basis data, alat bantu, *middleware*
- **data** — data primer dan sekunder yang dibutuhkan sistem
- **waktu** — perkiraan durasi tiap kegiatan

**Empat komponen biaya**

- **personel** — gaji, pelatihan, konsultasi
- **perangkat keras dan lunak** — infrastruktur teknologinya
- **operasional** — pengeluaran berulang selama sistem dipakai
- **cadangan** (*contingency*) — penyangga untuk risiko dan ketidakpastian

**Empat metode estimasi biaya**

| Metode | Pendekatan | Akurasi | Kelebihan | Kelemahan |
|---|---|---|---|---|
| Top-down | global → rinci | rendah–sedang | cepat, mudah di awal | kurang akurat |
| Bottom-up | rinci → global | tinggi | akurat, realistis | makan waktu |
| Analogous | dari proyek serupa | sedang | cepat, praktis | tergantung kemiripan |
| Parametric | model matematis | tinggi | objektif, terukur | butuh data teknis lengkap |

**COCOMO** — model parametrik yang paling dikenal

Disusun **Barry Boehm** dan timnya di University of Southern California pada **1981**, dari analisis empiris **63 proyek perangkat lunak** yang sudah selesai.

Bentuk dasarnya dua rumus:

- **effort** = \`a x KLOC^b\` (orang-bulan)
- **waktu** = \`c x effort^d\` (bulan)

Empat konstantanya punya arti:

- **a** — faktor produktivitas dasar, menentukan besarnya effort awal
- **b** — faktor skala kompleksitas, menentukan seberapa cepat effort naik terhadap ukuran
- **c** — faktor waktu dasar, menentukan waktu pengembangan minimum
- **d** — faktor percepatan waktu, menggambarkan hubungan effort dengan durasi

Tiga modenya:

| Mode | a | b | c | d | Untuk |
|---|---|---|---|---|---|
| Organic | 2,4 | 1,05 | 2,5 | 0,38 | tim kecil, masalah dikenal |
| Semi-detached | 3,0 | 1,12 | 2,5 | 0,35 | menengah, campuran |
| Embedded | 3,6 | 1,20 | 2,5 | 0,32 | kekangan ketat |

Yang penting dari **b > 1**: effort tumbuh **lebih cepat** daripada ukuran. Ini alasan matematis kenapa perkiraan *"dua kali lebih besar, dua kali lebih mahal"* selalu terlalu murah.

Dan yang penting dari **d < 1**: waktu tumbuh **jauh lebih lambat** daripada effort. Selisihnya diserap oleh **tim yang lebih besar** — yang membawa biaya koordinasinya sendiri.

**Tiga alat perencanaan**

- **WBS** — *Work Breakdown Structure*: memecah pekerjaan sampai jadi paket kerja yang bisa diperkirakan biaya, jadwal, dan penanggung jawabnya
- **Gantt Chart** — jadwal kegiatan beserta urutan dan ketergantungannya
- **RAM / RACI Chart** — pembagian tanggung jawab

Tahapan menyusun WBS: tentukan tujuan dan ruang lingkup, tentukan hasil akhir, uraikan menjadi komponen yang lebih rinci, lalu tentukan paket kerjanya.

Tahapan menyusun Gantt: kenali kegiatannya, tentukan urutan dan ketergantungannya, tentukan durasinya, lalu susun jadwalnya.

**RACI**

- **R** — *Responsible*, pelaksana yang mengerjakan langsung; boleh lebih dari satu
- **A** — *Accountable*, penanggung jawab akhir; **harus tepat satu**
- **C** — *Consulted*, dimintai masukan selama pekerjaan berlangsung
- **I** — *Informed*, diberi tahu perkembangannya tanpa terlibat langsung

Manfaat utamanya: memastikan **tiap kegiatan punya pemilik yang jelas**. Kegiatan tanpa **A** adalah kegiatan yang akan terbengkalai tanpa ada yang merasa bersalah.

**Segitiga proyek**

Lingkup, waktu, dan biaya saling terikat. Mengubah satu **memaksa** salah satu yang lain ikut berubah.

Sisi keempat yang tidak digambar: **mutu**. Ketika seseorang menyanggupi perubahan pada satu sisi tanpa mengubah yang lain, yang sebenarnya dikorbankan adalah mutu — dan itu baru terlihat setelah sistemnya dipakai.

**Tujuh tantangan yang lazim**

kesulitan mengestimasi biaya dan waktu, keterbatasan dan ketidaksesuaian sumber daya manusia, perubahan kebutuhan pengguna, ketergantungan pada teknologi, kesulitan integrasi antar divisi karena prioritas berbeda, keterbatasan anggaran, dan pemantauan yang lemah.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA PERKIRAAN PROYEK SELALU TERLALU MURAH\n#\n# COCOMO organic: effort = 2.4 * KLOC^1.05\n#\n#   KLOC    effort    OB per KLOC\n#      8      21.3           2.66\n#     16      44.1           2.76\n#     32      91.3           2.85\n#    128     391.5           3.06\n#    256     810.7           3.17\n#\n# Kolom terakhir NAIK. Eksponennya 1.05, di atas 1,\n# jadi menggandakan ukuran menaikkan effort LEBIH\n# dari dua kali.\n#\n# waktu = 2.5 * effort^0.38  -> eksponennya DI BAWAH 1\n#\n# Dari 8 ke 512 KLOC: effort naik 79x, waktu 5.3x.\n# Sisanya diserap tim yang lebih besar.',
      penjelasan: `
Dua eksponen dalam COCOMO menjelaskan hampir semua yang salah dengan perkiraan proyek. Keduanya kecil dan mudah dilewatkan, tetapi arahnya menentukan.

**Eksponen pertama: b = 1,05 pada effort.**

Angkanya cuma sedikit di atas satu, dan justru itu yang menipu. Kalau b tepat satu, effort tumbuh **lurus**: dua kali lebih besar berarti dua kali lebih mahal, dan naluri kita benar.

Tetapi b **di atas** satu, dan itu membuat biaya per satuan ukuran **naik**. Lihat kolom terakhir: 2,66 lalu 2,76 lalu 2,85 lalu 3,17. Proyek besar bukan cuma lebih mahal — ia lebih mahal **per baris kodenya**.

Kenapa? Karena tiap bagian baru harus **cocok dengan semua bagian yang sudah ada**. Sepuluh modul punya lebih banyak kemungkinan pasangan daripada lima modul, dan tiap pasangan adalah satu hal yang harus dipikirkan, diuji, dan didokumentasikan.

Sekarang lihat akibat praktisnya. Kamu memperkirakan proyek 32 KLOC. Lalu pengguna menambah fitur sampai jadi 64 KLOC. Naluri berkata: **anggarannya dikalikan dua**.

Angkanya berkata lain: 91,3 menjadi 189,1 orang-bulan. Bukan dua kali — **2,07 kali**. Selisih tujuh persennya terlihat kecil di sini, dan membesar terus untuk proyek yang lebih besar.

Yang lebih penting: pertumbuhan lingkup yang **terlihat wajar** ternyata membawa biaya yang **lebih dari sebanding**. Itu sebabnya kendali lingkup bukan soal berhemat, melainkan soal mencegah pertumbuhan yang biayanya tidak lurus.

**Eksponen kedua: d = 0,38 pada waktu.**

Angka ini **di bawah** satu, dan artinya berlawanan. Waktu tumbuh **jauh lebih lambat** daripada effort.

Dari 8 KLOC ke 512 KLOC, effortnya naik sekitar **79 kali**. Waktunya cuma naik **5,3 kali**.

Ke mana selisihnya pergi? Ke **jumlah orang**. Tim yang tadinya 2,7 orang menjadi 40 orang.

Dan di sinilah letak jebakan yang paling mahal. Rumus ini sering dibaca terbalik: *"kalau tim lebih besar bisa menyelesaikan lebih cepat, tambah saja orangnya."*

Perhatikan bahwa rumusnya **tidak mengatakan itu**. Ia menghitung **berapa orang yang dibutuhkan** untuk ukuran tertentu, bukan berapa cepat pekerjaan selesai kalau orangnya ditambah. Kedua pertanyaan itu berbeda.

Alasannya bisa dilihat dari eksponennya sendiri. Kalau menambah orang benar-benar memperpendek waktu secara sebanding, maka d akan bernilai **nol** — waktu tidak akan bergantung pada ukuran sama sekali, karena berapa pun besarnya proyek cukup ditambah orangnya. Kenyataannya d bernilai 0,38, bukan nol.

Artinya: **ada bagian pekerjaan yang tidak bisa dibagi.** Rancangannya harus disepakati sebelum modulnya ditulis. Modulnya harus ada sebelum diintegrasikan. Dan tiap orang baru menambah jalur komunikasi — bukan satu, melainkan sebanyak orang yang sudah ada.

Karena itu ada dua cara memakai COCOMO dengan benar, dan satu cara memakainya dengan salah.

Yang **benar**: memakainya untuk memeriksa apakah rencanamu masuk akal. Kalau kamu berjanji menyelesaikan 32 KLOC dalam empat bulan sementara COCOMO menyebut 13,9 bulan, kamu tidak sedang optimistis — kamu sedang salah hitung, dan itu ketahuan sebelum proyeknya dimulai.

Yang **salah**: memakainya sebagai janji. COCOMO disusun dari 63 proyek pada 1981, dengan bahasa, alat, dan cara kerja zaman itu. Angkanya **perkiraan kasar**, bukan ramalan. Gunanya menunjukkan **bentuk** hubungannya — dan bentuk itulah yang tetap benar sampai sekarang.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Perencanaan sumber daya & anggaran proyek SI
# ============================================

# --------------------------------------------
# 1. COCOMO dasar (Boehm, 1981)
# --------------------------------------------
# effort = a * KLOC^b          (orang-bulan)
# waktu  = c * effort^d        (bulan)
MODE = {
    "organic":       (2.4, 1.05, 2.5, 0.38),
    "semi-detached": (3.0, 1.12, 2.5, 0.35),
    "embedded":      (3.6, 1.20, 2.5, 0.32),
}

def cocomo(kloc, mode):
    a, b, c, d = MODE[mode]
    effort = a * kloc ** b
    waktu = c * effort ** d
    orang = effort / waktu
    return effort, waktu, orang

print("--- COCOMO dasar untuk proyek 32 KLOC ---")
print("  " + "mode".ljust(16) + "effort".rjust(12)
      + "waktu".rjust(10) + "orang".rjust(9))
for mode in MODE:
    e, w, o = cocomo(32, mode)
    print("  " + mode.ljust(16)
          + ("%.1f OB" % e).rjust(12)
          + ("%.1f bln" % w).rjust(10)
          + ("%.1f" % o).rjust(9))
print("")
e_org = cocomo(32, "organic")[0]
e_emb = cocomo(32, "embedded")[0]
print("  Ukuran kodenya sama persis. Effort mode embedded")
print("  " + ("%.1f" % (e_emb / e_org)) + " kali mode organic.")
print("  Yang menaikkannya bukan jumlah barisnya, melainkan")
print("  seberapa ketat kekangan yang harus dipenuhi.")

# --------------------------------------------
# 2. Kenapa proyek besar tidak sekadar 'lebih lama'
# --------------------------------------------
print("")
print("--- effort tumbuh lebih cepat daripada ukuran ---")
print("  (mode organic, b = 1.05)")
print("  " + "KLOC".rjust(7) + "effort".rjust(12)
      + "OB per KLOC".rjust(14))
for k in (8, 16, 32, 64, 128, 256):
    e = cocomo(k, "organic")[0]
    print("  " + str(k).rjust(7) + ("%.1f" % e).rjust(12)
          + ("%.2f" % (e / k)).rjust(14))
print("")
print("  Kolom terakhir NAIK. Menggandakan ukuran menaikkan")
print("  effort lebih dari dua kali, karena eksponennya di")
print("  atas 1. Perkiraan 'dua kali lebih besar, dua kali")
print("  lebih mahal' selalu terlalu murah.")

# --------------------------------------------
# 3. Menambah orang tidak memperpendek waktu
# --------------------------------------------
print("")
print("--- waktu tumbuh jauh lebih lambat daripada effort ---")
print("  " + "KLOC".rjust(7) + "effort".rjust(10)
      + "waktu".rjust(10) + "tim".rjust(8))
for k in (8, 32, 128, 512):
    e, w, o = cocomo(k, "organic")
    print("  " + str(k).rjust(7) + ("%.0f" % e).rjust(10)
          + ("%.1f" % w).rjust(10) + ("%.1f" % o).rjust(8))
print("")
print("  effort naik 64x dari 8 ke 512 KLOC, tapi waktu hanya")
e8 = cocomo(8, "organic")
e512 = cocomo(512, "organic")
print("  " + ("%.1f" % (e512[1] / e8[1])) + "x. Sisanya diserap TIM YANG LEBIH BESAR,")
print("  bukan jadwal yang lebih panjang. Dan tim besar")
print("  membawa biaya koordinasinya sendiri.")

# --------------------------------------------
# 4. Top-down vs bottom-up
# --------------------------------------------
print("")
print("--- dua cara mengestimasi proyek yang sama ---")
total_topdown = 100_000_000
PORSI = [("Analisis", 0.15), ("Perancangan", 0.20),
         ("Konstruksi", 0.40), ("Pengujian", 0.15),
         ("Penerapan", 0.10)]
print("  TOP-DOWN (dari pagu Rp " + f"{total_topdown:,}".replace(",", ".") + ")")
for nama, porsi in PORSI:
    print("    " + nama.ljust(14)
          + f"{int(total_topdown * porsi):>14,}".replace(",", "."))

RINCI = [
    ("Wawancara & analisis",      18,  400_000),
    ("Dokumen SRS",               10,  400_000),
    ("Perancangan basis data",    12,  500_000),
    ("Perancangan antarmuka",     15,  500_000),
    ("Konstruksi modul inti",     60,  600_000),
    ("Konstruksi laporan",        25,  600_000),
    ("Integrasi",                 12,  600_000),
    ("Pengujian sistem",          20,  450_000),
    ("Perbaikan cacat",           18,  600_000),
    ("Pelatihan & migrasi",       14,  400_000),
]
print("")
print("  BOTTOM-UP (dari tiap paket kerja)")
print("    " + "paket kerja".ljust(26) + "hari".rjust(6)
      + "tarif/hari".rjust(13) + "biaya".rjust(15))
subtotal = 0
for nama, hari, tarif in RINCI:
    biaya = hari * tarif
    subtotal += biaya
    print("    " + nama.ljust(26) + str(hari).rjust(6)
          + f"{tarif:>13,}".replace(",", ".")
          + f"{biaya:>15,}".replace(",", "."))
print("    " + "-" * 60)
print("    " + "subtotal".ljust(45)
      + f"{subtotal:>15,}".replace(",", "."))
cadangan = int(subtotal * 0.15)
print("    " + "cadangan risiko 15%".ljust(45)
      + f"{cadangan:>15,}".replace(",", "."))
print("    " + "TOTAL".ljust(45)
      + f"{subtotal + cadangan:>15,}".replace(",", "."))

selisih = (subtotal + cadangan) - total_topdown
print("")
print("  Selisih terhadap pagu: "
      + ("+" if selisih > 0 else "")
      + f"{selisih:,}".replace(",", ".")
      + "  (" + ("%+.1f%%" % (selisih / total_topdown * 100)) + ")")
print("")
print("  Selisih ini bukan kesalahan hitung -- ia PERTANYAAN:")
print("  paket kerja mana yang dipotong, atau pagunya yang")
print("  dinaikkan? Top-down cepat tapi kasar; bottom-up lambat")
print("  tapi bisa dibantah baris per baris. Pakai keduanya,")
print("  lalu perdebatkan selisihnya.")

# --------------------------------------------
# 5. Cadangan risiko bukan uang lebih
# --------------------------------------------
print("")
print("--- kenapa cadangan risiko wajib ada ---")
SKENARIO = [
    ("Semua lancar",                 1.00),
    ("Kebutuhan berubah 1 kali",     1.12),
    ("Satu anggota tim keluar",      1.20),
    ("Integrasi lebih sulit",        1.18),
]
tertutup = 0
for nama, kali in SKENARIO:
    biaya = int(subtotal * kali)
    lebih = biaya - (subtotal + cadangan)
    if lebih <= 0:
        tertutup += 1
        tanda = "tertutup"
    else:
        tanda = "KURANG " + f"{lebih:,}".replace(",", ".")
    print("  " + nama.ljust(26)
          + f"{biaya:>15,}".replace(",", ".") + "  " + tanda)
print("")
print("  Cadangan 15% menutup " + str(tertutup) + " dari "
      + str(len(SKENARIO)) + " skenario di atas --")
print("  dan itu pun hanya kalau risikonya datang SENDIRIAN.")
print("  Proyek tanpa cadangan bukan proyek yang lebih hemat --")
print("  ia proyek yang MENUNDA kabar buruknya.")

# --------------------------------------------
# 6. Segitiga proyek
# --------------------------------------------
print("")
print("--- segitiga lingkup - waktu - biaya ---")
print("  Ketiganya terikat: mengubah satu memaksa salah satu")
print("  yang lain ikut berubah.")
print("")
PERMINTAAN = [
    ("Selesai 2 bulan lebih cepat", "kurangi lingkup, atau tambah biaya"),
    ("Anggaran dipotong 20%",       "kurangi lingkup, atau perpanjang waktu"),
    ("Tambah 5 fitur baru",         "tambah biaya, atau perpanjang waktu"),
]
for minta, akibat in PERMINTAAN:
    print("  " + minta)
    print("      -> " + akibat)
print("")
print("  Yang tidak ada di daftar: mengubah satu tanpa akibat.")
print("  Menyanggupinya berarti diam-diam memilih mengorbankan")
print("  MUTU -- satu-satunya sisi yang tidak tertulis di")
print("  segitiga, dan yang paling sering jadi korban.")` },
  output: `--- COCOMO dasar untuk proyek 32 KLOC ---
  mode                  effort     waktu    orang
  organic              91.3 OB  13.9 bln      6.6
  semi-detached       145.5 OB  14.3 bln     10.2
  embedded            230.4 OB  14.3 bln     16.2

  Ukuran kodenya sama persis. Effort mode embedded
  2.5 kali mode organic.
  Yang menaikkannya bukan jumlah barisnya, melainkan
  seberapa ketat kekangan yang harus dipenuhi.

--- effort tumbuh lebih cepat daripada ukuran ---
  (mode organic, b = 1.05)
     KLOC      effort   OB per KLOC
        8        21.3          2.66
       16        44.1          2.76
       32        91.3          2.85
       64       189.1          2.95
      128       391.5          3.06
      256       810.7          3.17

  Kolom terakhir NAIK. Menggandakan ukuran menaikkan
  effort lebih dari dua kali, karena eksponennya di
  atas 1. Perkiraan 'dua kali lebih besar, dua kali
  lebih mahal' selalu terlalu murah.

--- waktu tumbuh jauh lebih lambat daripada effort ---
     KLOC    effort     waktu     tim
        8        21       8.0     2.7
       32        91      13.9     6.6
      128       392      24.2    16.2
      512      1679      42.0    40.0

  effort naik 64x dari 8 ke 512 KLOC, tapi waktu hanya
  5.3x. Sisanya diserap TIM YANG LEBIH BESAR,
  bukan jadwal yang lebih panjang. Dan tim besar
  membawa biaya koordinasinya sendiri.

--- dua cara mengestimasi proyek yang sama ---
  TOP-DOWN (dari pagu Rp 100.000.000)
    Analisis          15.000.000
    Perancangan       20.000.000
    Konstruksi        40.000.000
    Pengujian         15.000.000
    Penerapan         10.000.000

  BOTTOM-UP (dari tiap paket kerja)
    paket kerja                 hari   tarif/hari          biaya
    Wawancara & analisis          18      400.000      7.200.000
    Dokumen SRS                   10      400.000      4.000.000
    Perancangan basis data        12      500.000      6.000.000
    Perancangan antarmuka         15      500.000      7.500.000
    Konstruksi modul inti         60      600.000     36.000.000
    Konstruksi laporan            25      600.000     15.000.000
    Integrasi                     12      600.000      7.200.000
    Pengujian sistem              20      450.000      9.000.000
    Perbaikan cacat               18      600.000     10.800.000
    Pelatihan & migrasi           14      400.000      5.600.000
    ------------------------------------------------------------
    subtotal                                         108.300.000
    cadangan risiko 15%                               16.245.000
    TOTAL                                            124.545.000

  Selisih terhadap pagu: +24.545.000  (+24.5%)

  Selisih ini bukan kesalahan hitung -- ia PERTANYAAN:
  paket kerja mana yang dipotong, atau pagunya yang
  dinaikkan? Top-down cepat tapi kasar; bottom-up lambat
  tapi bisa dibantah baris per baris. Pakai keduanya,
  lalu perdebatkan selisihnya.

--- kenapa cadangan risiko wajib ada ---
  Semua lancar                  108.300.000  tertutup
  Kebutuhan berubah 1 kali      121.296.000  tertutup
  Satu anggota tim keluar       129.960.000  KURANG 5.415.000
  Integrasi lebih sulit         127.794.000  KURANG 3.249.000

  Cadangan 15% menutup 2 dari 4 skenario di atas --
  dan itu pun hanya kalau risikonya datang SENDIRIAN.
  Proyek tanpa cadangan bukan proyek yang lebih hemat --
  ia proyek yang MENUNDA kabar buruknya.

--- segitiga lingkup - waktu - biaya ---
  Ketiganya terikat: mengubah satu memaksa salah satu
  yang lain ikut berubah.

  Selesai 2 bulan lebih cepat
      -> kurangi lingkup, atau tambah biaya
  Anggaran dipotong 20%
      -> kurangi lingkup, atau perpanjang waktu
  Tambah 5 fitur baru
      -> tambah biaya, atau perpanjang waktu

  Yang tidak ada di daftar: mengubah satu tanpa akibat.
  Menyanggupinya berarti diam-diam memilih mengorbankan
  MUTU -- satu-satunya sisi yang tidak tertulis di
  segitiga, dan yang paling sering jadi korban.`,

  kesalahanUmum: [
    {
      salah: 'Memperkirakan proyek dua kali lebih besar dengan mengalikan anggaran dua kali.',
      kenapa: 'Eksponen ukuran pada COCOMO bernilai di atas satu, sehingga effort tumbuh lebih cepat daripada ukurannya dan biaya per satuan ukuran ikut naik. Tiap bagian baru harus cocok dengan semua bagian yang sudah ada, dan jumlah pasangan yang harus diperiksa naik lebih cepat daripada jumlah bagiannya.',
      benar: 'Hitung ulang dengan rumusnya, bukan dengan perkalian lurus, dan sisihkan tambahan untuk kenaikan biaya per satuan ukuran.'
    },
    {
      salah: 'Menyimpulkan dari COCOMO bahwa menambah orang akan memperpendek jadwal.',
      kenapa: 'Rumus waktu menghitung berapa orang yang dibutuhkan untuk ukuran tertentu, bukan seberapa cepat pekerjaan selesai bila orangnya ditambah. Kalau menambah orang benar-benar sebanding, eksponen waktunya akan nol; kenyataannya 0,38, yang berarti ada bagian pekerjaan yang tidak bisa dibagi.',
      benar: 'Pakai angka jumlah orang sebagai kebutuhan, lalu kurangi lingkup bila jadwalnya tidak cukup, bukan menambah orang di akhir proyek.'
    },
    {
      salah: 'Menyusun anggaran tanpa pos cadangan risiko supaya angkanya terlihat lebih hemat.',
      kenapa: 'Cadangan tidak membuat proyek lebih mahal, ia hanya mengakui ketidakpastian yang memang ada. Proyek tanpa cadangan bukan proyek yang lebih hemat, melainkan proyek yang menunda kabar buruknya sampai anggarannya sudah habis dan pilihannya tinggal sedikit.',
      benar: 'Sisipkan pos cadangan dengan persentase yang dinyatakan terbuka, dan sebutkan risiko apa saja yang hendak ditutupinya.'
    },
    {
      salah: 'Memakai satu metode estimasi saja lalu menganggap hasilnya angka yang pasti.',
      kenapa: 'Top-down cepat tapi kasar; bottom-up akurat tapi makan waktu. Selisih antara keduanya bukan kesalahan hitung, melainkan pertanyaan tentang paket kerja mana yang harus dipotong atau pagu mana yang harus dinaikkan, dan pertanyaan itu justru bagian paling berguna dari proses estimasi.',
      benar: 'Hitung dengan dua metode, lalu perdebatkan selisihnya sebelum angkanya ditetapkan.'
    },
    {
      salah: 'Menyusun anggaran hanya sampai serah terima sistem.',
      kenapa: 'Budgeting planning mencakup seluruh daur hidup, dan biaya operasional yang berulang selama bertahun-tahun pemakaian sering melampaui biaya pembangunannya. Sistem yang tidak dianggarkan pemeliharaannya akan berhenti dirawat tepat saat ia mulai benar-benar dipakai.',
      benar: 'Sertakan biaya operasional dan pemeliharaan tahunan dalam perhitungan, dan nyatakan untuk berapa tahun ke depan.'
    },
    {
      salah: 'Menyanggupi percepatan jadwal tanpa mengubah lingkup maupun biaya.',
      kenapa: 'Ketiga sisi segitiga proyek saling terikat, sehingga mengubah satu memaksa salah satu yang lain ikut berubah. Menyanggupi tanpa mengubah apa pun berarti diam-diam memilih mengorbankan mutu, satu-satunya sisi yang tidak tertulis dan baru terlihat setelah sistemnya dipakai.',
      benar: 'Ajukan pilihan secara terbuka: kurangi lingkup, tambah biaya, atau terima mutu yang lebih rendah dengan risiko yang disebutkan.'
    },
    {
      salah: 'Membuat RACI dengan beberapa penanggung jawab akhir untuk satu kegiatan.',
      kenapa: 'Huruf A berarti penanggung jawab akhir dan harus tepat satu, karena dua penanggung jawab berarti tidak ada yang merasa benar-benar bertanggung jawab. Kegiatan yang tidak punya A sama sekali akan terbengkalai tanpa ada yang merasa bersalah.',
      benar: 'Pastikan tiap baris matriks punya tepat satu A, dan boleh punya lebih dari satu R.'
    }
  ],

  analogi: `Bayangkan kamu diminta memperkirakan **biaya memasak untuk hajatan**.

Untuk 20 orang, kamu pernah melakukannya: satu dapur, dua orang, empat jam, biayanya satu juta.

Sekarang diminta untuk **200 orang**. Naluri berkata: sepuluh kali lipat — sepuluh juta.

Tapi coba dipikirkan. Dapur rumah tidak muat; harus sewa. Dua orang tidak cukup; sepuluh orang. Dan sepuluh orang di satu dapur **saling menghalangi**, jadi butuh pembagian tugas, jadwal, dan satu orang yang mengatur — orang yang **tidak memasak sama sekali**.

Belum lagi: panci sebesar itu tidak ada, harus sewa. Bahan sebanyak itu tidak muat di kulkas, harus dibeli lebih dekat ke hari-H, yang berarti harganya tidak bisa ditawar dari jauh hari.

Biayanya bukan sepuluh juta. **Dan bukan karena kamu salah hitung** — melainkan karena skala mengubah cara kerjanya.

Sekarang bagian keduanya. Kamu punya dua minggu, dan itu terasa lama. Bisakah **dipercepat jadi tiga hari dengan menambah orang jadi tiga puluh**?

Sebagian bisa: mengupas, memotong, mencuci. Sebagian **tidak bisa**: nasi tetap butuh waktunya sendiri untuk matang, dan menambah orang tidak membuatnya matang lebih cepat. Menu harus disepakati sebelum bahan dibeli, dan tiga puluh orang tidak menyepakati menu lebih cepat daripada tiga orang — justru lebih lambat.

Itulah dua eksponen COCOMO. Yang satu berkata **besar itu lebih dari sekadar banyak**. Yang lain berkata **ada pekerjaan yang tidak bisa dibagi**.`,

  latihan: [
    'Sebutkan lima jenis sumber daya dan empat komponen biaya dalam proyek sistem informasi.',
    'Bandingkan empat metode estimasi biaya beserta akurasi, kelebihan, dan kelemahannya.',
    'Hitung effort, waktu, dan jumlah orang dengan COCOMO untuk proyek 20 KLOC pada ketiga modenya.',
    'Jelaskan arti keempat konstanta COCOMO, dan sebutkan dari mana Boehm memperolehnya.',
    'Tunjukkan dengan hitungan kenapa perkiraan "dua kali lebih besar, dua kali lebih mahal" selalu terlalu murah.',
    'Jelaskan kenapa eksponen waktu yang bernilai di bawah satu tidak berarti menambah orang akan memperpendek jadwal.',
    'Susun WBS untuk satu proyek sistem informasi sampai tingkat paket kerja, lalu estimasi biayanya secara bottom-up.',
    'Untuk proyek yang sama, buat estimasi top-down dari sebuah pagu, lalu jelaskan apa arti selisih antara keduanya.',
    'Buat RACI chart untuk enam kegiatan proyek dengan lima peran, dan pastikan tiap kegiatan punya tepat satu A.',
    'Jelaskan segitiga proyek, lalu jelaskan apa yang sebenarnya dikorbankan ketika seseorang menyanggupi perubahan satu sisi tanpa mengubah sisi lain.'
  ]
});
