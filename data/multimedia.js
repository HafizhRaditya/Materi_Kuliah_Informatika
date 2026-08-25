/* ============================================================
   multimedia.js — materi Teknologi Multimedia (Semester 4)

   Disusun dari slide kuliah sendiri (multimedia1..10.pdf,
   Antonius Rachmat & Alphone Roswanto, Teknik Informatika UKDW)
   dan berkas UTS TEKMUL_H1D024061.docx.

   Sepuluh bab slide; TIGA di antaranya membahas kompresi
   (bab 6 teks, 7 citra, 8 audio/video). Itu jantung mata
   kuliahnya, jadi pembagian topik di sini mengikuti:
     1. bagaimana media jadi angka -> kenapa kompresi WAJIB
     2. kompresi lossless + batas teoretisnya (entropi)
     3. kompresi lossy + cara mengukur kerusakannya

   CATATAN: dua keterangan di slide ternyata keliru dan
   diluruskan di bagian Kesalahan Umum topik kedua, dengan
   menyebut apa yang benar beserta alasannya.
   ============================================================ */

TOPICS.push({
  id: 'multimedia-representasi',
  judul: 'Media Menjadi Angka',
  kategori: 'multimedia',
  tag: ['multimedia', 'sampling', 'Nyquist', 'kuantisasi', 'bitmap', 'vektor', 'frame rate'],
  ringkas: 'Bagaimana teks, gambar, suara, dan video diubah jadi bilangan — dan kenapa hasilnya raksasa.',

  fungsi: `**Memahami kenapa berkas media begitu besar, dan apa yang bisa dilakukan.**

Terpakai di:

- **Menghitung kebutuhan penyimpanan** dan lebar pita
- **Memilih pengaturan rekaman** — sampling rate dan resolusi
- **Menghindari aliasing** — cacat yang tidak bisa diperbaiki setelah terjadi
- **Menyiapkan aset** untuk aplikasi web dan mobile

Yang paling langsung terpakai: **memilih format menurut isinya**.

Foto ke JPEG, tangkapan layar berisi teks ke PNG. Menyimpan tangkapan layar sebagai JPEG membuat tepi huruf berbayang — dan itu terjadi karena alasan teknis yang bisa kamu jelaskan setelah memahami topik ini.`,

  praktik: {
    tujuan: `Kamu bisa menghitung ukuran media mentah, memilih pengaturan rekaman yang tepat, dan mendengar sendiri akibat aliasing.`,
    alat: [
      'Python 3',
      'Audacity untuk percobaan audio',
      'FFmpeg untuk video'
    ],
    langkah: [
      { judul: 'Hitung ukuran mentah sendiri',
        isi: `Buat skrip yang menghitung ukuran mentah untuk beberapa format:

- gambar: \`lebar x tinggi x kanal\`
- audio: \`sampling rate x bit per sampel / 8 x kanal x detik\`
- video: \`ukuran frame x frame per detik x detik\`

Bandingkan hasilnya dengan berkas nyata yang sudah dikompresi. Rasio kompresinya akan mengejutkan.` },
      { judul: 'Dengar sendiri pengaruh sampling rate',
        isi: `Di Audacity, rekam suara lalu ekspor beberapa kali dengan sampling rate berbeda: 8000, 22050, dan 44100 Hz.

Dengarkan ketiganya. Yang 8000 terdengar seperti telepon — frekuensi tingginya hilang.

Ini penerapan langsung teorema Nyquist yang bisa kamu dengar.` },
      { judul: 'Buktikan aliasing',
        isi: `Buat nada 15.000 Hz di Audacity, lalu ubah sampling rate proyeknya menjadi 20.000 Hz **tanpa** penyaringan.

Nadanya tidak hilang — ia **berubah** menjadi nada rendah sekitar 5.000 Hz.

Ini bukti bahwa aliasing bukan kehilangan, melainkan **penyamaran** — dan tidak bisa diperbaiki setelah terekam.` },
      { judul: 'Bandingkan bitmap dan vektor',
        isi: `Buat logo sederhana dalam dua bentuk: PNG dan SVG.

Perbesar keduanya sampai 800 persen. Yang PNG pecah, yang SVG tetap tajam.

Bandingkan juga ukuran berkasnya — SVG untuk bentuk geometris biasanya jauh lebih kecil.` },
      { judul: 'Buktikan bitmap tidak peduli isi',
        isi: `Buat dua gambar PNG berukuran sama: satu foto rumit, satu bidang putih polos.

Periksa ukurannya. Yang putih polos **jauh lebih kecil** setelah dikompresi, meski ukuran mentahnya sama persis.

Selisihnya adalah pengulangan yang berhasil dibuang — dan itu pengantar ke topik kompresi.` },
      { judul: 'Hitung kebutuhan video',
        isi: `Hitung ukuran mentah video Full HD dua jam, lalu bandingkan dengan ukuran Blu-ray yang sekitar 25 sampai 50 GB.

Rasionya puluhan kali. Tidak ada kompresi lossless yang sanggup sejauh itu — dan itu penjelasan kenapa video **harus** lossy.` }
    ],
    cek: [
      'Hitungan ukuran mentahmu cocok dengan rumus di materi',
      'Kamu bisa mendengar perbedaan antara sampling rate 8000 dan 44100',
      'Nada 15 kHz yang di-sample pada 20 kHz terdengar sebagai nada rendah'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa sebesar itu',

  konsep: `
**Multimedia** adalah penggunaan beberapa media berbeda — **teks, audio, grafik, animasi, dan video** — untuk menyampaikan informasi secara terpadu.

Definisi yang lebih berguna bagi kita: multimedia adalah **persoalan mengubah dunia menjadi bilangan**, lalu berhadapan dengan akibatnya — dan akibatnya adalah **ukuran data yang luar biasa besar**.

Karena itu seluruh mata kuliah ini bermuara pada satu hal: **kompresi**.

**Teks**

Paling sederhana. Satu karakter dipetakan ke satu bilangan.

- **ASCII** — 7 bit, 128 karakter. Cukup untuk bahasa Inggris.
- **ASCII Extended** — 8 bit, 256 karakter.
- **Unicode** — mencakup hampir semua sistem tulisan dunia. UTF-8 memakai 1 sampai 4 byte per karakter.

**Plain text** hanya berisi karakter. **Rich text** menyertakan informasi tambahan: font, ukuran, warna, tautan, gambar sisipan.

**Gambar: dua cara yang berbeda mendasar**

**Bitmap** (*raster*) — gambar disimpan sebagai **kisi piksel**, tiap piksel punya nilai warna.

Ukurannya = \`lebar × tinggi × kedalaman bit\`. **Tidak bergantung pada isi gambar** — foto rumit dan bidang putih polos berukuran sama persis sebelum dikompresi.

Diperbesar akan **pecah**, karena tidak ada informasi tambahan untuk mengisi ruang baru.

**Vektor** — gambar disimpan sebagai **perintah menggambar**: garis dari titik ini ke titik itu, lingkaran dengan jari-jari sekian.

Ukurannya bergantung pada **kerumitan bentuk**, bukan pada ukuran tampilan. Diperbesar **tetap tajam**, karena perintahnya digambar ulang.

Karena itu: **foto selalu bitmap**, **logo sebaiknya vektor**.

**Kedalaman bit**

Berapa bit dipakai untuk satu piksel menentukan berapa warna yang mungkin:

- 8 bit → 256 warna
- 16 bit → 65.536 warna
- 24 bit → 16.777.216 warna (*true color*), 8 bit untuk merah, hijau, dan biru

**Suara**

Suara adalah **gelombang tekanan udara** — besaran yang berubah **terus-menerus**. Komputer hanya mengenal bilangan **terpisah-pisah**. Jembatannya dua langkah:

**Sampling** — mengukur nilai gelombang pada selang waktu tetap. Berapa kali per detik disebut *sampling rate*.

**Kuantisasi** — membulatkan tiap hasil ukuran ke salah satu nilai yang tersedia. Berapa banyak nilai yang tersedia ditentukan *bit depth*.

**Teorema Nyquist–Shannon**

Untuk merekonstruksi gelombang tanpa cacat, **sampling rate harus lebih dari dua kali frekuensi tertinggi** yang ingin direkam.

Pendengaran manusia mencapai sekitar **20 kHz**. Karena itu CD memakai **44,1 kHz** — sedikit di atas dua kali 20 kHz.

Kalau syarat ini dilanggar, terjadi **aliasing**: frekuensi tinggi **menyamar** menjadi frekuensi rendah yang tidak pernah ada. Suara 15 kHz yang di-sampling pada 20 kHz akan terdengar sebagai 5 kHz — bukan hilang, melainkan **berubah menjadi bunyi asing**.

**Video**

Video adalah **rangkaian gambar diam** yang ditampilkan cukup cepat sehingga terlihat bergerak. Fenomena yang memungkinkannya disebut ***persistence of vision***.

Ukuran video mentah = \`ukuran satu frame × frame per detik × durasi\`. Perkalian inilah yang membuat angkanya meledak.

**Animasi**

Menurut slide: ***illusion of motion*** yang dibuat dari **gambar statis**. Prinsipnya sama dengan video, bedanya gambarnya **dibuat**, bukan direkam.

Animasi 3D jauh lebih berat karena setiap objek harus **didefinisikan dengan angka**: koordinat X, Y, Z, derajat rotasi, tekstur permukaan, arah cahaya. Komputer lalu harus **menghitung** bagaimana semua itu terlihat dari sudut kamera tertentu — proses yang disebut *rendering*.

**Dua mode penerimaan data**

Pembedaan dari slide, dan ia menentukan **batas waktu** yang boleh dipakai untuk kompresi:

- **Dialogue mode** — dua pihak berdialog seketika, seperti panggilan video. Total tunda **tidak boleh lebih dari 150 ms**: sekitar 50 ms untuk kompresi dan dekompresi, 100 ms untuk perjalanan di jaringan.
- **Retrieval mode** — data diambil, tidak seketika. Boleh maju-mundur dan diakses acak.

Karena itu algoritma terbaik untuk menyimpan film **belum tentu boleh dipakai** untuk panggilan video: ia mungkin terlalu lambat.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa VIDEO meledak dan TEKS tidak\n#\n# Satu halaman teks 640x480 (80x60 karakter):\n#     4.800 karakter x 2 byte      =    9.600 byte\n#\n# Satu layar warna 640x480, 256 warna:\n#     640 x 480 x 1 byte           =  307.200 byte\n#     -> 32x lebih besar dari teks\n#\n# Satu DETIK video 640x480, 24-bit, 25 fps:\n#     640 x 480 x 3 x 25           = 23.040.000 byte\n#     -> 2.400x lebih besar dari teks\n#\n# Perkaliannya BERTINGKAT: piksel x kanal warna x frame.\n# Itulah kenapa video WAJIB dikompresi, teks tidak.',
      penjelasan: `
Angka-angka ini menjelaskan **kenapa mata kuliah ini menghabiskan tiga bab untuk kompresi**.

Perhatikan bahwa lonjakannya bukan karena video "lebih rumit". Ia karena **perkaliannya bertingkat**, dan tiap tingkat mengalikan lagi:

- Teks menyimpan **satu bilangan per karakter**
- Gambar menyimpan **satu bilangan per piksel**, dan satu layar punya **ratusan ribu piksel**
- Gambar berwarna mengalikannya lagi dengan **tiga kanal**
- Video mengalikannya lagi dengan **puluhan frame per detik**

Setiap tingkat terlihat wajar sendiri-sendiri. Hasil akhirnya **dua ribu kali lipat**.

Sekarang bagian yang paling penting dan paling mudah terlewat: **bitmap tidak peduli pada isi gambarnya.**

Foto pemandangan yang rumit dan **selembar bidang putih polos** berukuran **sama persis** — karena keduanya menyimpan nilai untuk setiap piksel, tanpa memandang apakah nilai-nilai itu berulang.

Dan **di situlah letak seluruh peluang kompresi.**

Bidang putih polos berisi jutaan angka yang **identik**. Informasi sesungguhnya di dalamnya cuma dua hal: warnanya apa, dan ukurannya berapa. Sisanya **pengulangan murni**.

Foto pemandangan juga penuh pengulangan, hanya lebih halus: langit di sebelah kiri hampir sama dengan langit di sebelah kanannya.

Kompresi bekerja dengan **mencari dan membuang pengulangan itu** — dan itulah kenapa hasil kompresi **sangat bergantung pada isi**, padahal ukuran mentahnya tidak.

Ini juga menjelaskan mengapa **berkas yang sudah dikompresi hampir tidak bisa dikompresi lagi**: pengulangannya sudah habis diambil.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Berapa besar media mentah sebenarnya?
# Angka acuan dari slide kuliah (bab 6)
# ============================================

def rapi(byte):
    """Ubah jumlah byte jadi satuan yang enak dibaca."""
    satuan = ["byte", "KB", "MB", "GB", "TB"]
    n = float(byte)
    i = 0
    while n >= 1024 and i < len(satuan) - 1:
        n /= 1024
        i += 1
    return ("%.2f %s" % (n, satuan[i])).rjust(12)


# --------------------------------------------
# 1. Satu layar 640x480 dalam berbagai bentuk
# --------------------------------------------
print("--- satu layar 640 x 480 ---")

LEBAR, TINGGI = 640, 480

# Teks: tiap karakter 8x8 piksel, 2 byte per karakter
kar_per_layar = (LEBAR // 8) * (TINGGI // 8)
teks = kar_per_layar * 2

# Grafik vektor: 500 baris, tiap baris 27 bit
#   horizontal log2(640)=10 bit, vertikal log2(480)~9 bit, atribut 8 bit
vektor = 500 * 27 // 8

# Bitmap 256 warna: 1 byte per piksel
bmp8 = LEBAR * TINGGI * 1

# Bitmap true color: 3 byte per piksel
bmp24 = LEBAR * TINGGI * 3

BENTUK = [
    ("Teks (" + str(kar_per_layar) + " karakter x 2 byte)", teks),
    ("Grafik vektor (500 baris x 27 bit)",                  vektor),
    ("Bitmap 256 warna (1 byte/piksel)",                    bmp8),
    ("Bitmap true color (3 byte/piksel)",                   bmp24),
]
for nama, ukuran in BENTUK:
    print("  " + nama.ljust(40) + rapi(ukuran))

print("")
print("  Vektor PALING KECIL karena menyimpan PERINTAH")
print("  menggambar, bukan nilai tiap piksel. Tapi ia hanya")
print("  cocok untuk bentuk geometris -- foto mustahil.")


# --------------------------------------------
# 2. Audio: sampling rate x bit depth x kanal
# --------------------------------------------
print("")
print("--- satu detik audio mentah ---")

AUDIO = [
    ("Kualitas telepon",  8000,  8, 1),
    ("Kualitas radio FM", 22050, 16, 1),
    ("Kualitas CD",       44100, 16, 2),
    ("Studio 24-bit",     96000, 24, 2),
]

print("  " + "jenis".ljust(20) + "sample/dtk".rjust(11) +
      "bit".rjust(5) + "kanal".rjust(6) + "  per detik")
for nama, laju, bit, kanal in AUDIO:
    per_detik = laju * (bit // 8) * kanal
    print("  " + nama.ljust(20) + str(laju).rjust(11) +
          str(bit).rjust(5) + str(kanal).rjust(6) + rapi(per_detik))

cd_detik = 44100 * 2 * 2
print("")
print("  Satu lagu CD 4 menit mentah: " + rapi(cd_detik * 240).strip())
print("  Satu album 60 menit mentah : " + rapi(cd_detik * 3600).strip())


# --------------------------------------------
# 3. Teorema Nyquist & aliasing
# --------------------------------------------
print("")
print("--- teorema Nyquist-Shannon ---")
print("  Sampling rate harus LEBIH DARI 2x frekuensi tertinggi.")
print("")

UJI = [
    ("Suara manusia",      3400,  8000),
    ("Musik (batas dengar)", 20000, 44100),
    ("Musik, laju 30 kHz", 20000, 30000),
    ("Nada 15 kHz",        15000, 20000),
]
print("  " + "kasus".ljust(22) + "f maks".rjust(8) +
      "laju".rjust(8) + "  syarat 2f    hasil")
for nama, fmaks, laju in UJI:
    syarat = 2 * fmaks
    aman = laju > syarat
    if aman:
        hasil = "aman"
    else:
        # frekuensi yang menyamar setelah aliasing
        palsu = abs(laju - fmaks)
        hasil = "ALIASING -> terdengar jadi " + str(palsu) + " Hz"
    print("  " + nama.ljust(22) + str(fmaks).rjust(8) +
          str(laju).rjust(8) + str(syarat).rjust(10) + "    " + hasil)

print("")
print("  Aliasing bukan membuat nada tinggi HILANG.")
print("  Ia membuatnya MENYAMAR jadi nada rendah yang")
print("  tidak pernah ada di rekaman aslinya.")


# --------------------------------------------
# 4. Video: perkalian yang meledak
# --------------------------------------------
print("")
print("--- video mentah ---")

VIDEO = [
    ("VGA  640x480   25 fps",  640,  480, 3, 25),
    ("SD   720x576   25 fps",  720,  576, 3, 25),
    ("HD  1280x720   30 fps", 1280,  720, 3, 30),
    ("FHD 1920x1080  30 fps", 1920, 1080, 3, 30),
    ("4K  3840x2160  60 fps", 3840, 2160, 3, 60),
]

print("  " + "format".ljust(24) + "per detik".rjust(13) +
      "per menit".rjust(13) + "film 2 jam".rjust(13))
for nama, w, h, kanal, fps in VIDEO:
    detik = w * h * kanal * fps
    print("  " + nama.ljust(24) + rapi(detik).strip().rjust(13) +
          rapi(detik * 60).strip().rjust(13) +
          rapi(detik * 7200).strip().rjust(13))

print("")
print("  Blu-ray menyimpan film 2 jam Full HD di sekitar")
print("  25-50 GB. Bandingkan dengan angka mentah di atas:")
print("  artinya kompresinya sekitar 25 sampai 50 kali lipat.")
print("  Tidak ada kompresi LOSSLESS yang sanggup sejauh itu.")


# --------------------------------------------
# 5. Bitmap tidak peduli isi -- di situlah peluangnya
# --------------------------------------------
print("")
print("--- kenapa isi gambar menentukan hasil kompresi ---")

W, H = 640, 480
mentah = W * H * 3

# Bidang putih polos: informasi sejatinya cuma warna + ukuran
info_polos = 3 + 4        # 3 byte warna + 4 byte ukuran

# Gambar dua warna berselang: sedikit lebih banyak
info_garis = 3 * 2 + 4 + 2

KASUS = [
    ("Foto pemandangan rumit", mentah, mentah // 10),
    ("Gambar dua warna",       mentah, info_garis),
    ("Bidang putih polos",     mentah, info_polos),
]
print("  " + "isi gambar".ljust(26) + "mentah".rjust(13) +
      "setelah dikompresi".rjust(20))
for nama, m, k in KASUS:
    print("  " + nama.ljust(26) + rapi(m).strip().rjust(13) +
          rapi(k).strip().rjust(20))

print("")
print("  Ketiganya berukuran mentah SAMA PERSIS: " +
      rapi(mentah).strip())
print("  Bitmap menyimpan nilai tiap piksel tanpa peduli")
print("  apakah nilai-nilai itu berulang.")
print("")
print("  Justru pengulangan itulah yang dibuang kompresi.")
print("  Karena itu hasil kompresi SANGAT bergantung pada isi,")
print("  padahal ukuran mentahnya tidak sama sekali.")


# --------------------------------------------
# 6. Batas waktu: dialogue vs retrieval mode
# --------------------------------------------
print("")
print("--- batas waktu menurut mode penerimaan ---")

MODE = [
    ("Dialogue mode", 150,
     "video conference, panggilan suara",
     "50 ms kompresi+dekompresi, 100 ms jaringan"),
    ("Retrieval mode", None,
     "menonton film tersimpan, streaming",
     "boleh lambat; bisa maju-mundur & akses acak"),
]
for nama, batas, contoh, ket in MODE:
    print("  " + nama)
    print("      contoh    : " + contoh)
    if batas:
        print("      batas     : total tunda maks " + str(batas) + " ms")
    else:
        print("      batas     : tidak ketat")
    print("      catatan   : " + ket)

print("")
print("  Algoritma terbaik untuk MENYIMPAN film belum tentu")
print("  boleh dipakai untuk PANGGILAN video -- ia mungkin")
print("  memberi berkas lebih kecil, tapi terlalu lambat.")`
  },

  output: `--- satu layar 640 x 480 ---
  Teks (4800 karakter x 2 byte)                9.38 KB
  Grafik vektor (500 baris x 27 bit)           1.65 KB
  Bitmap 256 warna (1 byte/piksel)           300.00 KB
  Bitmap true color (3 byte/piksel)          900.00 KB

  Vektor PALING KECIL karena menyimpan PERINTAH
  menggambar, bukan nilai tiap piksel. Tapi ia hanya
  cocok untuk bentuk geometris -- foto mustahil.

--- satu detik audio mentah ---
  jenis                sample/dtk  bit kanal  per detik
  Kualitas telepon           8000    8     1     7.81 KB
  Kualitas radio FM         22050   16     1    43.07 KB
  Kualitas CD               44100   16     2   172.27 KB
  Studio 24-bit             96000   24     2   562.50 KB

  Satu lagu CD 4 menit mentah: 40.37 MB
  Satu album 60 menit mentah : 605.62 MB

--- teorema Nyquist-Shannon ---
  Sampling rate harus LEBIH DARI 2x frekuensi tertinggi.

  kasus                   f maks    laju  syarat 2f    hasil
  Suara manusia             3400    8000      6800    aman
  Musik (batas dengar)     20000   44100     40000    aman
  Musik, laju 30 kHz       20000   30000     40000    ALIASING -> terdengar jadi 10000 Hz
  Nada 15 kHz              15000   20000     30000    ALIASING -> terdengar jadi 5000 Hz

  Aliasing bukan membuat nada tinggi HILANG.
  Ia membuatnya MENYAMAR jadi nada rendah yang
  tidak pernah ada di rekaman aslinya.

--- video mentah ---
  format                      per detik    per menit   film 2 jam
  VGA  640x480   25 fps        21.97 MB      1.29 GB    154.50 GB
  SD   720x576   25 fps        29.66 MB      1.74 GB    208.57 GB
  HD  1280x720   30 fps        79.10 MB      4.63 GB    556.18 GB
  FHD 1920x1080  30 fps       177.98 MB     10.43 GB      1.22 TB
  4K  3840x2160  60 fps         1.39 GB     83.43 GB      9.78 TB

  Blu-ray menyimpan film 2 jam Full HD di sekitar
  25-50 GB. Bandingkan dengan angka mentah di atas:
  artinya kompresinya sekitar 25 sampai 50 kali lipat.
  Tidak ada kompresi LOSSLESS yang sanggup sejauh itu.

--- kenapa isi gambar menentukan hasil kompresi ---
  isi gambar                       mentah  setelah dikompresi
  Foto pemandangan rumit        900.00 KB            90.00 KB
  Gambar dua warna              900.00 KB          12.00 byte
  Bidang putih polos            900.00 KB           7.00 byte

  Ketiganya berukuran mentah SAMA PERSIS: 900.00 KB
  Bitmap menyimpan nilai tiap piksel tanpa peduli
  apakah nilai-nilai itu berulang.

  Justru pengulangan itulah yang dibuang kompresi.
  Karena itu hasil kompresi SANGAT bergantung pada isi,
  padahal ukuran mentahnya tidak sama sekali.

--- batas waktu menurut mode penerimaan ---
  Dialogue mode
      contoh    : video conference, panggilan suara
      batas     : total tunda maks 150 ms
      catatan   : 50 ms kompresi+dekompresi, 100 ms jaringan
  Retrieval mode
      contoh    : menonton film tersimpan, streaming
      batas     : tidak ketat
      catatan   : boleh lambat; bisa maju-mundur & akses acak

  Algoritma terbaik untuk MENYIMPAN film belum tentu
  boleh dipakai untuk PANGGILAN video -- ia mungkin
  memberi berkas lebih kecil, tapi terlalu lambat.`,

  kesalahanUmum: [
    {
      salah: 'Mengira gambar bitmap yang isinya polos berukuran lebih kecil daripada foto rumit.',
      kenapa: 'Bitmap menyimpan nilai untuk setiap piksel tanpa memandang apakah nilai itu berulang, sehingga bidang putih polos dan foto pemandangan berukuran mentah sama persis. Yang berbeda hanya hasil setelah dikompresi, karena kompresi bekerja dengan membuang pengulangan.',
      benar: 'Bedakan ukuran mentah, yang cuma bergantung pada dimensi dan kedalaman bit, dari ukuran terkompresi, yang sangat bergantung pada isi.'
    },
    {
      salah: 'Memakai gambar bitmap untuk logo yang akan ditampilkan dalam berbagai ukuran.',
      kenapa: 'Bitmap menyimpan kisi piksel dengan jumlah tetap, sehingga saat diperbesar tidak ada informasi tambahan untuk mengisi ruang baru dan gambarnya pecah. Vektor menyimpan perintah menggambar, jadi ia digambar ulang pada tiap ukuran dan tetap tajam.',
      benar: 'Pakai vektor untuk logo, ikon, dan diagram; pakai bitmap untuk foto, yang memang mustahil dinyatakan sebagai bentuk geometris.'
    },
    {
      salah: 'Menyamakan sampling rate dengan frekuensi tertinggi yang bisa direkam.',
      kenapa: 'Teorema Nyquist mensyaratkan sampling rate lebih dari dua kali frekuensi tertinggi, bukan sama dengannya. Sampling 20 kHz tidak merekam nada 15 kHz dengan benar, melainkan membuatnya menyamar sebagai nada 5 kHz yang tidak pernah ada.',
      benar: 'Bagi dua sampling rate untuk mengetahui frekuensi tertinggi yang aman. Pada 44,1 kHz, batas amannya sekitar 22 kHz, yang sedikit di atas batas pendengaran manusia.'
    },
    {
      salah: 'Mengira aliasing membuat nada tinggi hilang.',
      kenapa: 'Nada yang melanggar syarat Nyquist tidak menghilang, ia berubah menjadi nada lain yang lebih rendah dan bercampur dengan rekaman aslinya. Akibatnya bukan kekurangan suara melainkan tambahan bunyi asing yang tidak bisa dihapus lagi setelah terekam.',
      benar: 'Saring frekuensi di atas batas Nyquist sebelum sampling, bukan sesudahnya. Setelah aliasing terjadi, kerusakannya permanen.'
    },
    {
      salah: 'Memilih algoritma kompresi hanya berdasarkan seberapa kecil hasilnya.',
      kenapa: 'Pada dialogue mode seperti panggilan video, total tunda tidak boleh lebih dari seratus lima puluh milidetik, dan hanya sekitar lima puluh milidetik yang tersedia untuk kompresi beserta dekompresinya. Algoritma yang menghasilkan berkas terkecil sering terlalu lambat untuk anggaran waktu itu.',
      benar: 'Sesuaikan pilihan dengan mode penerimaannya. Kompresi paling rapat cocok untuk penyimpanan, kompresi paling cepat cocok untuk percakapan.'
    }
  ],

  analogi: `Bayangkan kamu harus **mengirim gambar lewat telepon**, dengan cara mendiktekannya kepada orang di seberang.

**Cara bitmap** adalah membaca **setiap kotak** pada kertas berpetak: *"kotak satu putih, kotak dua putih, kotak tiga putih…"* — sampai selesai.

Cara ini selalu berhasil, apa pun gambarnya. Foto wajah, tulisan tangan, apa saja. Tetapi lamanya **tidak bergantung pada gambarnya sama sekali** — hanya pada berapa banyak kotak.

Mendiktekan **selembar putih kosong** memakan waktu **sama persis** dengan mendiktekan lukisan rumit. Dan di situlah kesia-siaannya terasa: kamu menyebut kata "putih" tiga ratus ribu kali.

**Cara vektor** adalah mendiktekan **perintahnya**: *"garis dari sudut kiri atas ke sudut kanan bawah, lingkaran di tengah berjari-jari lima kotak."*

Untuk gambar geometris, ini **jauh lebih singkat** dan hasilnya bisa digambar ulang sebesar apa pun. Tetapi cobalah mendiktekan **wajah nenekmu** sebagai perintah geometris — mustahil.

Sekarang **sampling dan Nyquist**.

Bayangkan mengamati **roda pedati yang berputar** dan mencatat posisi jari-jarinya. Kalau kamu melihat **sangat sering**, kamu tahu persis ia berputar ke mana dan secepat apa.

Tetapi kalau kamu hanya melihat **sesekali** — katakanlah tiap kali roda hampir menyelesaikan satu putaran — maka jari-jarinya tampak **hampir tidak bergerak**, atau bahkan **berputar mundur**.

Ini persis yang kamu lihat di film lama: roda pedati yang berputar cepat justru **tampak mundur pelan**.

Rodanya **tidak berputar mundur**. Kameranya yang **terlalu jarang melihat**.

Dan inilah yang membuat aliasing berbahaya: hasilnya **bukan gambar kosong yang jelas rusak**, melainkan **gambar yang tampak masuk akal tetapi salah**. Kamu tidak akan curiga.

Sekali roda itu terekam berputar mundur, **tidak ada cara mengembalikannya** — karena rekamanmu memang tidak pernah memuat informasi yang hilang itu.`,

  latihan: [
    'Jelaskan perbedaan mendasar antara gambar bitmap dan vektor, lalu tentukan mana yang cocok untuk foto dan mana untuk logo beserta alasannya.',
    'Hitung ukuran mentah satu gambar 1920 x 1080 dengan kedalaman 24 bit, lalu bandingkan dengan gambar berukuran sama yang isinya putih polos.',
    'Jelaskan apa yang dilakukan sampling dan kuantisasi, dan sebutkan parameter apa yang mengendalikan masing-masing.',
    'Sebutkan bunyi teorema Nyquist-Shannon, lalu jelaskan kenapa CD memakai 44,1 kHz dan bukan 40 kHz.',
    'Jelaskan apa itu aliasing dan kenapa ia lebih berbahaya daripada sekadar kehilangan frekuensi tinggi.',
    'Hitung ukuran video mentah Full HD 1920 x 1080, 24 bit, 30 fps selama dua jam, lalu bandingkan dengan kapasitas satu keping Blu-ray.',
    'Jelaskan perbedaan dialogue mode dan retrieval mode, dan sebutkan berapa anggaran waktu kompresi pada dialogue mode.'
  ]
});

TOPICS.push({
  id: 'multimedia-lossless',
  judul: 'Kompresi Lossless & Batas Entropi',
  kategori: 'multimedia',
  tag: ['RLE', 'Huffman', 'Shannon-Fano', 'LZW', 'entropi', 'lossless'],
  ringkas: 'RLE, Huffman, dan LZW — beserta batas teoretis yang tidak bisa dilampaui algoritma mana pun.',

  fungsi: `**Memampatkan data tanpa kehilangan apa pun, dan tahu batas teoretisnya.**

Terpakai di:

- **Mengarsipkan** — ZIP, RAR, 7z
- **Berkas yang tidak boleh berubah** — kode, dokumen, citra medis
- **Format gambar** — PNG dan GIF
- **Memahami kenapa berkas terkompresi tidak bisa dikompresi lagi**

Yang paling berguna dipahami: **entropi adalah lantai yang tidak bisa ditembus.**

Ini bukan keterbatasan algoritma yang menunggu dipecahkan — ini teorema Shannon. Karena itu klaim *"memampatkan berkas apa pun hingga separuh"* pasti bohong.

Dan akibat praktisnya: **kalau butuh lebih kecil dari entropi, satu-satunya jalan adalah membuang informasi** — yaitu beralih ke lossy.`,

  praktik: {
    tujuan: `Kamu bisa menghitung entropi sebuah data, membandingkannya dengan hasil kompresi nyata, dan membuktikan berkas terkompresi tidak bisa dikompresi lagi.`,
    alat: [
      'Python 3 dengan modul `zlib` dan `math`',
      'Alat kompresi seperti 7-Zip'
    ],
    langkah: [
      { judul: 'Hitung entropi sebuah teks',
        isi: `Hitung frekuensi tiap karakter, ubah jadi peluang, lalu terapkan rumus \`H = -jumlah p log2 p\`.

Hasilnya adalah **jumlah bit minimum per karakter** yang mungkin dicapai kompresi lossless mana pun.

Bandingkan dengan 8 bit per karakter pada teks biasa — selisihnya adalah potensi penghematan.` },
      { judul: 'Bandingkan dengan hasil kompresi nyata',
        isi: `Kompresi teks yang sama dengan \`zlib.compress()\`, lalu hitung bit per karakter hasilnya.

Angkanya akan **mendekati** entropi tetapi tidak di bawahnya. Kalau kodemu menunjukkan di bawah entropi, ada yang salah pada perhitunganmu.` },
      { judul: 'Buktikan kompresi bisa MEMPERBESAR',
        isi: `Buat berkas berisi data acak murni dengan \`os.urandom(10000)\`, lalu kompresi.

Hasilnya **lebih besar** daripada aslinya — karena data acak sudah berentropi maksimum, dan yang ditambahkan cuma overhead pembungkusnya.

Ini penjelasan langsung kenapa mem-ZIP berkas ZIP tidak berguna.` },
      { judul: 'Kompresi berulang kali',
        isi: `Kompresi sebuah teks panjang, lalu kompresi hasilnya, lalu kompresi hasilnya lagi.

Catat ukurannya tiap putaran. Penyusutannya **makin kecil** dan akhirnya berhenti.

Hitung juga entropi tiap putaran — ia **naik** mendekati 8 bit per simbol.` },
      { judul: 'Bandingkan beberapa algoritma',
        isi: `Kompresi berkas yang sama dengan ZIP, 7z, dan RAR, lalu bandingkan ukuran dan waktunya.

Yang menghasilkan berkas terkecil biasanya paling lambat. Ini pertukaran yang harus kamu pilih sesuai kebutuhan — arsip jangka panjang berbeda dari transfer cepat.` },
      { judul: 'Uji jenis berkas yang berbeda',
        isi: `Kompresi: berkas teks, berkas kode, gambar PNG, gambar JPEG, dan berkas MP3.

Teks dan kode menyusut banyak. PNG, JPEG, dan MP3 hampir tidak menyusut sama sekali — karena ketiganya **sudah** dikompresi.

Ini penjelasan praktis kenapa mengarsipkan folder berisi foto hampir tidak menghemat apa pun.` }
    ],
    cek: [
      'Hasil kompresi zlib-mu tidak pernah di bawah entropi yang kamu hitung',
      'Data acak menjadi lebih besar setelah dikompresi',
      'Entropi naik mendekati 8 bit per simbol setelah beberapa putaran kompresi'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa ada batasnya',

  konsep: `
**Kompresi lossless** adalah kompresi yang hasilnya bisa dikembalikan **persis sama** seperti sebelum dikompresi. Tidak ada satu bit pun yang hilang.

Dipakai ketika data **tidak boleh berubah**: berkas teks, program, arsip ZIP dan RAR, gambar GIF dan PNG, dan **citra medis** — di mana satu piksel yang salah bisa berarti diagnosis yang salah.

**Klasifikasi menurut slide**

- **Entropy encoding** — **lossless**. Bekerja berdasarkan **urutan dan frekuensi data**, tanpa memedulikan artinya. Contoh: RLE, Huffman, Arithmetic coding.
- **Source coding** — **lossy**. Berkaitan dengan **arti data** dan jenis medianya. Contoh: DPCM, DCT, subsampling.
- **Hybrid coding** — gabungan keduanya. Contoh: **JPEG, MPEG, H.261**.

Perhatikan bahwa JPEG dan MPEG **bukan murni lossy**. Mereka membuang data dulu secara lossy, lalu memampatkan sisanya secara lossless.

**Run-Length Encoding (RLE)**

Yang paling sederhana: **karakter yang berulang berturut-turut diganti dengan jumlah dan karakternya**.

Contoh dari slide: \`ABCCCCCCCCDEFGGGG\` — 17 karakter — menjadi \`ABC!8DEFG!4\` — 11 karakter.

Ada dua ragam:

- **Tipe 1** — memakai **karakter penanda**, misalnya \`!\`, yang tidak boleh muncul di data
- **Tipe 2** — memakai **bilangan negatif** untuk menandai deretan karakter yang **tidak** berulang

Tipe 2 mengatasi kelemahan tipe 1: kalau datanya sendiri memuat angka, penanda jadi rancu.

**RLE bisa membuat data lebih besar.** Kalau tidak ada pengulangan sama sekali, tiap kelompok justru menambah byte penanda. Slide mencatat kasus 10.000 byte menjadi 10.100 byte — **rasio 0,99**.

**Huffman coding**

Dibuat **David A. Huffman** di MIT tahun **1952**. Gagasannya: **karakter yang sering muncul diberi kode pendek, yang jarang diberi kode panjang**.

Caranya *bottom-up*: dua simbol berfrekuensi **terkecil** digabung menjadi satu simpul, peluangnya dijumlahkan, lalu diulang sampai tersisa satu akar.

Kode yang dihasilkan bersifat ***prefix-free*** — **tidak ada kode yang menjadi awalan kode lain**. Sifat inilah yang membuat aliran bit bisa dibaca tanpa pemisah.

Ada dua ragam:

- **Static Huffman** — frekuensi dihitung **lebih dulu** atas seluruh data
- **Adaptive Huffman** — pohon dibangun **sambil membaca**, cocok untuk audio dan video **streaming** yang datanya belum diketahui seluruhnya

**Shannon-Fano** mendahului Huffman: urutkan berdasarkan frekuensi, lalu **belah menjadi dua bagian yang kira-kira sama** secara rekursif. Lebih sederhana, tetapi **tidak dijamin optimal** — Huffman selalu sama baik atau lebih baik.

**Entropi: batas yang tidak bisa dilampaui**

Ini gagasan terpenting di seluruh topik. Shannon membuktikan bahwa setiap sumber data punya **entropi** — rata-rata jumlah bit minimum per simbol yang **secara matematis mustahil dikalahkan** oleh kompresi lossless mana pun.

Rumusnya \`H = -Σ p(i) × log₂ p(i)\`.

Artinya kompresi lossless **bukan perlombaan tanpa ujung**. Ada lantai, dan Huffman sudah **sangat dekat** dengannya. Ketika peluang tiap simbol kebetulan berupa pangkat dua dari setengah, Huffman mencapai lantai itu **tepat**.

Ini juga menjelaskan kenapa **berkas ZIP tidak bisa di-ZIP lagi** dengan hasil berarti: pengulangannya sudah diambil, entropinya sudah mendekati maksimum.

**LZW (Lempel-Ziv-Welch)**

Berbasis **kamus**, dan bersifat **adaptif**. Alih-alih menghitung frekuensi lebih dulu, ia **membangun kamus sambil berjalan**.

Setiap kali menemukan rangkaian baru, ia menambahkannya ke kamus dan memberi nomor. Berikutnya rangkaian itu cukup dikirim sebagai **satu nomor**.

Keunggulan besarnya: **kamus tidak perlu dikirim**. Pihak penerima **membangun kamus yang sama persis** dari aliran kode yang ia terima.

Sejarahnya: **LZ77** dan **LZ78** oleh Jacob Ziv dan Abraham Lempel (1977 dan 1978), lalu dikembangkan **Terry Welch** tahun **1984**. Dipakai pada **GIF**, perintah \`compress\` di UNIX, dan modem V.42bis.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# ENTROPI: lantai yang tidak bisa ditembus\n#\n# "MAMASAYA" -> A=4, M=2, S=1, Y=1  (total 8)\n#\n#   p(A)=0.500  -log2(0.500) = 1 bit\n#   p(M)=0.250  -log2(0.250) = 2 bit\n#   p(S)=0.125  -log2(0.125) = 3 bit\n#   p(Y)=0.125  -log2(0.125) = 3 bit\n#\n#   H = 0.5(1) + 0.25(2) + 0.125(3) + 0.125(3)\n#     = 1.75 bit per karakter\n#\n# Huffman memberi: A=1, M=00, S=010, Y=011\n#   (4x1 + 2x2 + 1x3 + 1x3) / 8 = 1.75 bit\n#\n# PERSIS di lantai. Tidak ada algoritma lossless\n# mana pun yang bisa mengalahkannya.',
      penjelasan: `
Ini salah satu hasil terindah di ilmu komputer, dan ia mengubah cara memandang kompresi.

Sebelum Shannon, orang bisa mengira kompresi adalah **perlombaan tanpa ujung** — selalu ada algoritma yang lebih pintar. Shannon membuktikan **tidak**: ada lantai, dan lantainya bisa dihitung.

Perhatikan dari mana \`-log₂ p\` berasal. Simbol yang muncul dengan peluang **setengah** hanya perlu **1 bit** — ia salah satu dari dua kemungkinan yang sama besar. Simbol berpeluang **seperdelapan** perlu **3 bit**, karena ia salah satu dari delapan.

Jadi \`-log₂ p\` adalah **"berapa pertanyaan ya/tidak yang dibutuhkan untuk memastikan simbol ini"**. Dan entropi adalah **rata-ratanya**, ditimbang seberapa sering tiap simbol muncul.

Sekarang lihat kenapa Huffman kebetulan **tepat** di lantai untuk contoh ini.

Peluangnya adalah 1/2, 1/4, 1/8, 1/8 — **semuanya pangkat dua**. Ketika itu terjadi, panjang kode ideal \`-log₂ p\` kebetulan berupa **bilangan bulat**: 1, 2, 3, 3 bit. Dan Huffman **bisa memberikan panjang bilangan bulat**, jadi ia mendapatkannya persis.

Sekarang bayangkan sebuah simbol berpeluang **0,4**. Panjang idealnya \`-log₂ 0,4 ≈ 1,32 bit\`. Huffman **tidak bisa** memberi 1,32 bit — ia harus memilih 1 atau 2. Di situlah muncul selisih, dan **Arithmetic coding** ada untuk menutupnya karena ia bisa memberi panjang pecahan.

Dua akibat praktis yang layak diingat.

**Pertama**, ini menjelaskan kenapa **berkas ZIP tidak bisa di-ZIP lagi**. Kompresi bekerja dengan membuang keteraturan; setelah dibuang, yang tersisa **hampir acak**, dan data acak punya entropi **maksimum**. Tidak ada lagi yang bisa diambil.

**Kedua**, ini membuktikan bahwa klaim semacam *"algoritma kami memampatkan berkas apa pun hingga separuh"* **pasti bohong** — bukan karena belum ada yang menemukannya, melainkan karena **secara matematis mustahil**.

Kalau setiap berkas bisa dikecilkan, maka kompresi berulang akan menyusutkan **berkas apa pun** menjadi satu bit, dan satu bit jelas tidak bisa mewakili semua berkas yang mungkin.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Kompresi lossless: RLE, Huffman, LZW, entropi
# Contoh mengikuti slide kuliah bab 6
# ============================================
import math
import heapq
from collections import Counter


# --------------------------------------------
# 1. RLE tipe 1: pakai karakter penanda
# --------------------------------------------
def rle_tipe1(data, penanda="!", minimal=4):
    """Deretan sama sepanjang minimal atau lebih -> huruf+penanda+jumlah."""
    hasil = []
    i = 0
    while i < len(data):
        j = i
        while j < len(data) and data[j] == data[i]:
            j += 1
        jumlah = j - i
        if jumlah >= minimal:
            hasil.append(data[i] + penanda + str(jumlah))
        else:
            hasil.append(data[i] * jumlah)
        i = j
    return "".join(hasil)


# --------------------------------------------
# 2. RLE tipe 2: bilangan negatif menandai
#    deretan karakter yang TIDAK berulang
# --------------------------------------------
def rle_tipe2(data, minimal=2):
    hasil = []
    i = 0
    beda = []          # tampungan karakter yang tidak berulang
    while i < len(data):
        j = i
        while j < len(data) and data[j] == data[i]:
            j += 1
        jumlah = j - i
        if jumlah >= minimal:
            if beda:
                hasil.append("-" + str(len(beda)) + "".join(beda))
                beda = []
            hasil.append(str(jumlah) + data[i])
        else:
            beda.extend(data[i:j])
        i = j
    if beda:
        hasil.append("-" + str(len(beda)) + "".join(beda))
    return "".join(hasil)


print("--- Run-Length Encoding ---")
UJI_RLE = [
    "ABCCCCCCCCDEFGGGG",
    "AB12CCCCDEEEF",
    "ABCDEFGHIJKLMNOP",          # tidak ada pengulangan sama sekali
    "AAAAAAAAAAAAAAAAAAAA",      # pengulangan penuh
]
print("  " + "data asli".ljust(24) + "asli".rjust(5) +
      "  tipe 1".ljust(18) + "  tipe 2")
for d in UJI_RLE:
    t1 = rle_tipe1(d)
    t2 = rle_tipe2(d)
    print("  " + d.ljust(24) + str(len(d)).rjust(5) +
          ("  " + t1 + " (" + str(len(t1)) + ")").ljust(18) +
          "  " + t2 + " (" + str(len(t2)) + ")")

print("")
print("  Perhatikan baris ketiga: tanpa pengulangan, RLE tipe 1")
print("  tidak menolong sama sekali, dan tipe 2 justru MENAMBAH")
print("  byte penanda. Kompresi bisa membuat data lebih besar.")


# --------------------------------------------
# 3. Entropi: lantai teoretis
# --------------------------------------------
def entropi(data):
    n = len(data)
    hitung = Counter(data)
    h = 0.0
    for jumlah in hitung.values():
        p = jumlah / n
        h -= p * math.log2(p)
    return h


# --------------------------------------------
# 4. Huffman coding
# --------------------------------------------
def huffman(data):
    """Mengembalikan peta karakter -> kode bit."""
    hitung = Counter(data)
    if len(hitung) == 1:                      # kasus khusus: satu simbol
        return {list(hitung)[0]: "0"}

    # antrean: (frekuensi, penanda urut, {karakter: kode})
    urut = 0
    antre = []
    for kar, frek in sorted(hitung.items()):
        heapq.heappush(antre, (frek, urut, {kar: ""}))
        urut += 1

    while len(antre) > 1:
        f1, _, kiri = heapq.heappop(antre)
        f2, _, kanan = heapq.heappop(antre)
        gabung = {}
        for k, v in kiri.items():
            gabung[k] = "0" + v
        for k, v in kanan.items():
            gabung[k] = "1" + v
        heapq.heappush(antre, (f1 + f2, urut, gabung))
        urut += 1

    return antre[0][2]


def rata_bit(data, kode):
    total = sum(len(kode[k]) for k in data)
    return total / len(data)


print("")
print("--- Huffman vs entropi ---")

CONTOH = ["MAMASAYA", "ABRACADABRA", "MULTIMEDIA",
          "AAAAAAAB", "ABCDEFGH"]

print("  " + "data".ljust(14) + "simbol".rjust(7) +
      "entropi".rjust(9) + "huffman".rjust(9) +
      "selisih".rjust(9) + "  vs 8 bit/kar")
for d in CONTOH:
    kode = huffman(d)
    h = entropi(d)
    b = rata_bit(d, kode)
    hemat = (1 - b / 8) * 100
    print("  " + d.ljust(14) + str(len(set(d))).rjust(7) +
          ("%.4f" % h).rjust(9) + ("%.4f" % b).rjust(9) +
          ("%.4f" % (b - h)).rjust(9) +
          ("  hemat %.1f%%" % hemat))

print("")
print("  Selisihnya TIDAK PERNAH negatif. Entropi adalah")
print("  lantai yang tidak bisa ditembus kompresi lossless")
print("  mana pun -- ini teorema Shannon, bukan sekadar")
print("  keterbatasan algoritma yang ada sekarang.")


# --------------------------------------------
# 5. Membedah 'MAMASAYA' seperti di slide
# --------------------------------------------
print("")
print("--- membedah MAMASAYA ---")
data = "MAMASAYA"
kode = huffman(data)
hitung = Counter(data)
n = len(data)

print("  " + "kar".ljust(5) + "frek".rjust(5) + "peluang".rjust(9) +
      "ideal -log2(p)".rjust(16) + "kode huffman".rjust(14) + "  panjang")
for kar in sorted(hitung, key=lambda k: -hitung[k]):
    p = hitung[kar] / n
    ideal = -math.log2(p)
    print("  " + kar.ljust(5) + str(hitung[kar]).rjust(5) +
          ("%.3f" % p).rjust(9) + ("%.3f bit" % ideal).rjust(16) +
          kode[kar].rjust(14) + str(len(kode[kar])).rjust(9))

total_bit = sum(len(kode[k]) for k in data)
print("")
print("  Total: " + str(total_bit) + " bit untuk " + str(n) +
      " karakter = %.2f bit/karakter" % (total_bit / n))
print("  Entropi                                  = %.2f bit/karakter"
      % entropi(data))
print("  -> PERSIS di lantai, karena semua peluangnya")
print("     kebetulan pangkat dua (1/2, 1/4, 1/8, 1/8),")
print("     sehingga panjang idealnya bilangan BULAT.")


# --------------------------------------------
# 6. Sifat prefix-free: kenapa tanpa pemisah pun terbaca
# --------------------------------------------
print("")
print("--- sifat prefix-free ---")
aliran = "".join(kode[k] for k in data)
print("  MAMASAYA -> " + aliran)
print("  (" + str(len(aliran)) + " bit, tanpa satu pun pemisah)")

# dekode: karena tidak ada kode yang jadi awalan kode lain,
# pembacaan dari kiri selalu punya satu tafsiran saja
balik = {v: k for k, v in kode.items()}
kumpul = ""
hasil = []
for bit in aliran:
    kumpul += bit
    if kumpul in balik:
        hasil.append(balik[kumpul])
        kumpul = ""
print("  didekode kembali -> " + "".join(hasil))
print("  utuh? " + str("".join(hasil) == data))

print("")
print("  Bisa dibaca tanpa pemisah karena TIDAK ADA kode yang")
print("  menjadi awalan kode lain. Begitu deretan bit cocok")
print("  dengan sebuah kode, tafsirannya pasti hanya satu.")


# --------------------------------------------
# 7. LZW: kamus dibangun sambil jalan
# --------------------------------------------
def lzw_kompres(data, lacak=False):
    kamus = {chr(i): i for i in range(256)}
    berikut = 256
    s = ""
    keluar = []
    jejak = []
    for c in data:
        if s + c in kamus:
            s = s + c
        else:
            keluar.append(kamus[s])
            kamus[s + c] = berikut
            if lacak:
                jejak.append((s, c, kamus[s], s + c, berikut))
            berikut += 1
            s = c
    if s:
        keluar.append(kamus[s])
    return keluar, jejak, berikut - 256


def lzw_dekompres(kode):
    kamus = {i: chr(i) for i in range(256)}
    berikut = 256
    s = chr(kode[0])
    hasil = [s]
    for k in kode[1:]:
        if k in kamus:
            masuk = kamus[k]
        elif k == berikut:                 # kasus khusus KwKwK
            masuk = s + s[0]
        else:
            raise ValueError("kode tidak sah: " + str(k))
        hasil.append(masuk)
        kamus[berikut] = s + masuk[0]
        berikut += 1
        s = masuk
    return "".join(hasil)


print("")
print("--- LZW: kamus dibangun sambil berjalan ---")
data_lzw = "ABABBABCABABBA"
kode_lzw, jejak, tambahan = lzw_kompres(data_lzw, lacak=True)

print("  data: " + data_lzw + "  (" + str(len(data_lzw)) + " karakter)")
print("")
print("  " + "s".ljust(6) + "c".ljust(4) + "keluar".rjust(7) +
      "   entri baru")
for s, c, keluar, baru, nomor in jejak:
    print("  " + s.ljust(6) + c.ljust(4) + str(keluar).rjust(7) +
          "   " + str(nomor) + " = " + baru)

print("")
print("  kode akhir : " + str(kode_lzw))
print("  " + str(len(data_lzw)) + " karakter -> " + str(len(kode_lzw)) +
      " kode, dengan " + str(tambahan) + " entri kamus baru")

pulih = lzw_dekompres(kode_lzw)
print("  didekode kembali: " + pulih)
print("  utuh? " + str(pulih == data_lzw))

print("")
print("  Kamusnya TIDAK DIKIRIM. Penerima membangun kamus")
print("  yang sama persis dari aliran kode yang ia terima --")
print("  itulah keunggulan terbesar LZW dibanding Huffman")
print("  statis, yang harus mengirimkan tabel frekuensinya.")


# --------------------------------------------
# 8. Kompresi berulang: kenapa ZIP tidak bisa di-ZIP
# --------------------------------------------
print("")
print("--- kenapa berkas terkompresi tidak bisa dikompresi lagi ---")

# Datanya sengaja dibuat panjang: entropi dibatasi log2(n),
# jadi data pendek memberi angka yang menyesatkan.
teks = "SELAMAT DATANG DI TEKNOLOGI MULTIMEDIA " * 200
print("  panjang data awal : " + str(len(teks)) + " karakter")
print("")
print("  " + "putaran".ljust(9) + "panjang".rjust(9) + "simbol".rjust(8) +
      "entropi".rjust(9) + "huffman".rjust(9) + "  susut dari awal")

putaran = teks
for i in range(1, 5):
    k = huffman(putaran)
    h = entropi(putaran)
    b = rata_bit(putaran, k)
    susut = (1 - len(putaran) / len(teks)) * 100
    print("  " + str(i).ljust(9) + str(len(putaran)).rjust(9) +
          str(len(set(putaran))).rjust(8) + ("%.4f" % h).rjust(9) +
          ("%.4f" % b).rjust(9) + ("  %.1f%%" % susut).rjust(18))
    # bentuk hasil kompresinya sebagai simbol baru untuk putaran berikutnya
    aliran = "".join(k[c] for c in putaran)
    putaran = "".join(chr(int(aliran[j:j+8].ljust(8, "0"), 2))
                      for j in range(0, len(aliran), 8))

print("")
print("  Entropi NAIK tiap putaran, mendekati 8 bit/simbol --")
print("  dan penyusutannya makin lama makin kecil.")
print("  Kompresi bekerja dengan membuang keteraturan; setelah")
print("  dibuang, yang tersisa hampir acak -- dan data acak")
print("  punya entropi MAKSIMUM. Tidak ada lagi yang bisa diambil.")
print("")
print("  Karena itu klaim 'memampatkan berkas APA PUN hingga")
print("  separuh' pasti bohong: kalau benar, kompresi berulang")
print("  akan menyusutkan berkas apa pun jadi satu bit.")`
  },

  output: `--- Run-Length Encoding ---
  data asli                asli  tipe 1            tipe 2
  ABCCCCCCCCDEFGGGG          17  ABC!8DEFG!4 (11)  -2AB8C-3DEF4G (13)
  AB12CCCCDEEEF              13  AB12C!4DEEEF (12)  -4AB124C-1D3E-1F (16)
  ABCDEFGHIJKLMNOP           16  ABCDEFGHIJKLMNOP (16)  -16ABCDEFGHIJKLMNOP (19)
  AAAAAAAAAAAAAAAAAAAA       20  A!20 (4)          20A (3)

  Perhatikan baris ketiga: tanpa pengulangan, RLE tipe 1
  tidak menolong sama sekali, dan tipe 2 justru MENAMBAH
  byte penanda. Kompresi bisa membuat data lebih besar.

--- Huffman vs entropi ---
  data           simbol  entropi  huffman  selisih  vs 8 bit/kar
  MAMASAYA            4   1.7500   1.7500   0.0000  hemat 78.1%
  ABRACADABRA         5   2.0404   2.0909   0.0505  hemat 73.9%
  MULTIMEDIA          8   2.9219   3.0000   0.0781  hemat 62.5%
  AAAAAAAB            2   0.5436   1.0000   0.4564  hemat 87.5%
  ABCDEFGH            8   3.0000   3.0000   0.0000  hemat 62.5%

  Selisihnya TIDAK PERNAH negatif. Entropi adalah
  lantai yang tidak bisa ditembus kompresi lossless
  mana pun -- ini teorema Shannon, bukan sekadar
  keterbatasan algoritma yang ada sekarang.

--- membedah MAMASAYA ---
  kar   frek  peluang  ideal -log2(p)  kode huffman  panjang
  A        4    0.500       1.000 bit             0        1
  M        2    0.250       2.000 bit            10        2
  S        1    0.125       3.000 bit           110        3
  Y        1    0.125       3.000 bit           111        3

  Total: 14 bit untuk 8 karakter = 1.75 bit/karakter
  Entropi                                  = 1.75 bit/karakter
  -> PERSIS di lantai, karena semua peluangnya
     kebetulan pangkat dua (1/2, 1/4, 1/8, 1/8),
     sehingga panjang idealnya bilangan BULAT.

--- sifat prefix-free ---
  MAMASAYA -> 10010011001110
  (14 bit, tanpa satu pun pemisah)
  didekode kembali -> MAMASAYA
  utuh? True

  Bisa dibaca tanpa pemisah karena TIDAK ADA kode yang
  menjadi awalan kode lain. Begitu deretan bit cocok
  dengan sebuah kode, tafsirannya pasti hanya satu.

--- LZW: kamus dibangun sambil berjalan ---
  data: ABABBABCABABBA  (14 karakter)

  s     c    keluar   entri baru
  A     B        65   256 = AB
  B     A        66   257 = BA
  AB    B       256   258 = ABB
  BA    B       257   259 = BAB
  B     C        66   260 = BC
  C     A        67   261 = CA
  AB    A       256   262 = ABA
  ABB   A       258   263 = ABBA

  kode akhir : [65, 66, 256, 257, 66, 67, 256, 258, 65]
  14 karakter -> 9 kode, dengan 8 entri kamus baru
  didekode kembali: ABABBABCABABBA
  utuh? True

  Kamusnya TIDAK DIKIRIM. Penerima membangun kamus
  yang sama persis dari aliran kode yang ia terima --
  itulah keunggulan terbesar LZW dibanding Huffman
  statis, yang harus mengirimkan tabel frekuensinya.

--- kenapa berkas terkompresi tidak bisa dikompresi lagi ---
  panjang data awal : 7800 karakter

  putaran    panjang  simbol  entropi  huffman  susut dari awal
  1             7800      14   3.6383   3.6667              0.0%
  2             3575     114   6.7490   6.7972             54.2%
  3             3038     164   7.1992   7.2117             61.1%
  4             2739     256   7.9144   7.9427             64.9%

  Entropi NAIK tiap putaran, mendekati 8 bit/simbol --
  dan penyusutannya makin lama makin kecil.
  Kompresi bekerja dengan membuang keteraturan; setelah
  dibuang, yang tersisa hampir acak -- dan data acak
  punya entropi MAKSIMUM. Tidak ada lagi yang bisa diambil.

  Karena itu klaim 'memampatkan berkas APA PUN hingga
  separuh' pasti bohong: kalau benar, kompresi berulang
  akan menyusutkan berkas apa pun jadi satu bit.`,

  kesalahanUmum: [
    {
      salah: 'Mengira kompresi lossless selalu memperkecil ukuran.',
      kenapa: 'Kalau datanya tidak punya pengulangan, penanda yang ditambahkan justru membuatnya lebih besar. Slide sendiri mencatat kasus sepuluh ribu byte menjadi sepuluh ribu seratus byte dengan rasio nol koma sembilan sembilan. Ini bukan kelemahan algoritma melainkan akibat langsung dari teorema Shannon.',
      benar: 'Periksa hasilnya, dan simpan data mentah kalau hasil kompresinya lebih besar. Banyak format arsip memang menyimpan sebagian isinya tanpa kompresi karena alasan ini.'
    },
    {
      salah: 'Menganggap selalu ada algoritma lossless yang lebih baik yang belum ditemukan.',
      kenapa: 'Entropi adalah lantai matematis, bukan rekor yang menunggu dipecahkan. Huffman sudah sangat dekat dengannya dan mencapainya tepat ketika semua peluang simbol berupa pangkat dua. Klaim memampatkan berkas apa pun hingga separuh mustahil, karena kompresi berulang akan menyusutkan berkas apa pun menjadi satu bit.',
      benar: 'Kalau butuh lebih kecil dari entropi, satu-satunya jalan adalah beralih ke lossy, yaitu membuang informasi dengan sengaja.'
    },
    {
      salah: 'Menyebut Deflate sebagai algoritma yang memakai LZW.',
      kenapa: 'Deflate sebenarnya menggabungkan LZ77 dengan Huffman coding, bukan LZW. Justru Deflate dirancang menghindari LZW karena LZW terikat paten Unisys pada masa itu. LZW dipakai pada GIF dan perintah compress di UNIX, bukan pada ZIP modern. Keterangan pada slide kuliah keliru di titik ini.',
      benar: 'Ingat pembagiannya: LZ77 plus Huffman menghasilkan Deflate yang dipakai ZIP, PNG, dan gzip; sedangkan LZW dipakai GIF dan compress.'
    },
    {
      salah: 'Mengira Shannon-Fano sama baiknya dengan Huffman.',
      kenapa: 'Shannon-Fano membelah dari atas ke bawah dan pembelahannya tidak selalu bisa dibuat seimbang, sehingga hasilnya tidak dijamin optimal. Huffman membangun dari bawah ke atas dengan selalu menggabungkan dua frekuensi terkecil, dan itu terbukti menghasilkan kode terpendek yang mungkin untuk panjang bilangan bulat.',
      benar: 'Pakai Huffman kalau bisa memilih. Shannon-Fano berguna untuk dipahami secara sejarah dan karena lebih mudah dijelaskan.'
    },
    {
      salah: 'Mengira kamus LZW harus ikut dikirim bersama data terkompresi.',
      kenapa: 'Penerima membangun kamus yang sama persis dari aliran kode yang ia terima, karena aturan penambahan entrinya deterministik. Mengirim kamus akan membatalkan sebagian besar penghematan, terutama pada berkas kecil.',
      benar: 'Pahami bahwa sifat adaptif inilah keunggulan LZW dibanding Huffman statis, yang memang harus mengirim tabel frekuensinya.'
    }
  ],

  analogi: `Bayangkan kamu mengirim **telegram yang dihitung per huruf**, dan ingin menghemat.

**RLE** adalah trik paling jelas. Alih-alih menulis "HAHAHAHAHAHAHAHA", kamu menulis **"HA dikali 8"**.

Untuk pesan yang penuh pengulangan, hemat sekali. Tetapi cobalah pada pesan biasa seperti "BERANGKAT BESOK PAGI" — tidak ada huruf yang berulang berturut-turut, dan kamu justru **menambah kata "dikali 1"** di mana-mana. Telegrammu jadi **lebih mahal**.

**Huffman** adalah trik yang lebih halus, dan sudah dipakai jauh sebelum komputer ada: **kode Morse**.

Perhatikan Morse. Huruf **E** — huruf paling sering dalam bahasa Inggris — adalah **satu titik**. Huruf **Q** yang jarang adalah **empat ketukan panjang-pendek**.

Itu bukan kebetulan. Samuel Morse **menghitung** huruf-huruf di kotak tipografi percetakan untuk mengetahui mana yang paling sering dipakai.

Huffman melakukan hal yang sama, tetapi **secara otomatis dan terbukti optimal**.

**Entropi** adalah bagian yang paling sulit diterima, jadi bayangkan begini.

Misalkan kamu ingin mengabari teman tentang **hasil lemparan koin**. Kamu tidak bisa mengirim kurang dari **satu bit** per lemparan — karena setiap lemparan sungguh-sungguh punya dua kemungkinan yang sama besar. Tidak ada kepintaran yang bisa menembusnya.

Sekarang misalkan koinnya **berat sebelah**, dan muncul gambar 90 persen dari waktu. Sekarang kamu **bisa** berbuat lebih baik: kirim satu tanda singkat untuk "gambar seperti biasa", dan tanda yang lebih panjang untuk "angka, yang jarang".

**Entropi adalah ukuran seberapa berat sebelah koinnya.** Makin timpang, makin banyak yang bisa dihemat. Koin yang benar-benar adil **tidak bisa dikompresi sama sekali**.

Dan inilah akibat terakhirnya, yang menjelaskan segalanya: **berkas yang sudah dikompresi mirip koin yang adil.**

Semua keberatsebelahannya sudah diperas habis. Yang tersisa tampak acak. Dan tidak ada yang bisa dihemat dari sesuatu yang acak.

Itulah kenapa mem-ZIP berkas ZIP **tidak menghasilkan apa-apa** — dan kadang malah menambah beberapa byte untuk keperluan pembungkusnya.`,

  latihan: [
    'Kompresi data "AABBBBBBCCDDDDDDDDDE" dengan RLE tipe 1 (minimal 4 huruf sama) dan hitung berapa karakter yang dihemat.',
    'Buat satu contoh data yang setelah dikompresi RLE justru menjadi lebih besar, dan jelaskan kenapa.',
    'Hitung entropi dari string "BANANA", lalu buat pohon Huffman-nya dan bandingkan rata-rata panjang kodenya dengan entropi tersebut.',
    'Jelaskan apa itu sifat prefix-free dan kenapa ia membuat aliran bit Huffman bisa dibaca tanpa pemisah.',
    'Jelaskan perbedaan Static Huffman dan Adaptive Huffman, dan sebutkan kapan yang kedua lebih tepat dipakai.',
    'Lakukan kompresi LZW terhadap string "TOBEORNOTTOBE" secara manual, dan tunjukkan isi kamus yang terbentuk.',
    'Jelaskan kenapa penerima LZW tidak perlu dikirimi kamusnya.',
    'Jelaskan kenapa klaim "algoritma kami bisa memampatkan berkas apa pun hingga separuh" pasti tidak benar.'
  ]
});

TOPICS.push({
  id: 'multimedia-lossy',
  judul: 'Kompresi Lossy & Mengukur Kerusakan',
  kategori: 'multimedia',
  tag: ['lossy', 'JPEG', 'MPEG', 'DCT', 'chroma subsampling', 'MSE', 'PSNR'],
  ringkas: 'Membuang yang tidak terlihat dan tidak terdengar — lalu mengukur seberapa banyak yang hilang.',

  fungsi: `**Membuang data yang tidak disadari mata dan telinga, dan mengukur seberapa banyak yang hilang.**

Terpakai di:

- **Menyiapkan gambar untuk web** — menyeimbangkan ukuran dan mutu
- **Memilih format** — dan tahu kapan JPEG merusak
- **Mengompresi video** untuk diunggah
- **Menilai mutu** dengan angka, bukan perasaan

Yang paling sering merugikan tanpa disadari: **menyimpan tangkapan layar berisi teks sebagai JPEG**.

Chroma subsampling membuang tiga perempat data warna, dan tepi huruf justru bergantung pada perbedaan warna. Hasilnya berbayang dan kotor.

Dan **generation loss**: menyunting ulang JPEG berkali-kali menumpuk kerusakan yang tidak bisa dikembalikan.`,

  praktik: {
    tujuan: `Kamu bisa memilih format dan tingkat kompresi dengan alasan, dan mengukur kerusakannya dengan PSNR.`,
    alat: [
      'Python 3 dengan Pillow',
      'FFmpeg untuk video',
      'GIMP atau alat penyunting gambar'
    ],
    langkah: [
      { judul: 'Bandingkan tingkat kualitas JPEG',
        isi: `Simpan satu foto dengan kualitas 95, 80, 60, 40, dan 20.

Catat ukuran berkasnya, lalu lihat gambarnya berdampingan.

Kamu akan menemukan titik di mana ukurannya turun banyak tetapi mutunya belum terasa turun — biasanya sekitar 80. Itulah yang layak dipakai.` },
      { judul: 'Buktikan JPEG merusak teks',
        isi: `Ambil tangkapan layar berisi tulisan, lalu simpan sebagai JPEG kualitas 80 dan sebagai PNG.

Perbesar keduanya. JPEG akan menunjukkan bayangan di sekitar huruf, PNG tajam.

Bandingkan juga ukurannya — untuk gambar berteks, PNG sering **lebih kecil** sekaligus lebih tajam.` },
      { judul: 'Ukur kerusakan dengan PSNR',
        isi: `Hitung MSE lalu PSNR antara gambar asli dan hasil kompresi.

Patokan: di atas 40 dB hampir tak terbedakan, 30 sampai 40 baik, di bawah 30 mulai terlihat.

Bandingkan angkanya dengan penilaian matamu sendiri.` },
      { judul: 'Buktikan batas PSNR',
        isi: `Buat dua gambar rusak dengan MSE **sama**: satu dengan galat kecil tersebar merata, satu dengan galat besar terkumpul di satu tempat.

PSNR-nya identik, tetapi yang kedua **jauh lebih mengganggu** bagi mata.

Ini alasan ada ukuran lain seperti SSIM yang lebih mendekati persepsi manusia.` },
      { judul: 'Amati generation loss',
        isi: `Buka sebuah JPEG, simpan ulang sebagai JPEG, buka lagi, simpan lagi — ulangi dua puluh kali.

Bandingkan dengan aslinya. Kerusakannya menumpuk dan jelas terlihat.

Kaidahnya: **simpan naskah kerja dalam format lossless, hasilkan JPEG hanya sekali di akhir.**` },
      { judul: 'Coba chroma subsampling',
        isi: `Dengan FFmpeg, ekspor gambar yang sama dengan \`-pix_fmt yuv444p\` dan \`yuv420p\`.

Bandingkan ukuran dan tampilannya, terutama pada teks berwarna merah di atas hitam.

Di situlah 4:2:0 paling terlihat merusak, dan itu menjelaskan kenapa.` },
      { judul: 'Bandingkan kompresi video',
        isi: `- \`ffmpeg -i asli.mp4 -crf 18 hasil18.mp4\`
- ulangi dengan crf 23 dan 28

CRF lebih kecil berarti mutu lebih tinggi dan berkas lebih besar. Bandingkan ketiganya dan pilih yang cukup untukmu.

Nilai 23 adalah bawaan yang biasanya sudah baik.` }
    ],
    cek: [
      'Kamu bisa menyebutkan kualitas JPEG yang memberi keseimbangan terbaik untuk fotomu',
      'Tangkapan layar berteks terbukti lebih tajam dan lebih kecil sebagai PNG',
      'Dua gambar dengan PSNR sama terlihat berbeda mutunya bagi matamu'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa boleh dibuang',

  konsep: `
**Kompresi lossy** membuang sebagian data **dengan sengaja**, sehingga hasil dekompresinya **tidak sama persis** dengan aslinya — tetapi **cukup baik untuk dipakai**.

Ini terdengar seperti kecurangan, dan memang begitulah adanya. Yang membuatnya sah adalah satu kenyataan: **penerima akhirnya manusia**, dan indra manusia **punya banyak titik buta**.

Kalau data yang dibuang jatuh tepat di titik buta itu, **tidak ada yang kehilangan apa pun** — kecuali ukuran berkasnya.

**Kenapa lossy diperlukan sama sekali**

Karena **entropi adalah lantai** bagi kompresi lossless. Setelah menyentuh lantai itu, satu-satunya cara mengecilkan lagi adalah **mengurangi informasinya**.

Video mentah Full HD dua jam berukuran puluhan terabyte. Lossless mungkin memampatkannya dua sampai tiga kali. Yang dibutuhkan **ratusan kali**. Tidak ada jalan lain.

**Titik buta penglihatan**

**Chroma subsampling** — mata manusia jauh lebih peka terhadap **terang-gelap** (*luminance*) daripada terhadap **warna** (*chrominance*).

Karena itu gambar diubah dari RGB ke **YUV** — Y untuk luminance, U dan V untuk chrominance — lalu **resolusi warnanya diturunkan** sementara luminance-nya utuh.

Notasi \`4:2:0\` berarti chrominance disimpan pada **setengah lebar dan setengah tinggi**, jadi hanya **seperempat** jumlah sampel warna. Data warna berkurang 75 persen, dan **hampir tidak ada yang menyadari**.

**Transform coding (DCT)** — blok 8×8 piksel diubah dari "nilai tiap piksel" menjadi "seberapa banyak pola kasar dan pola halus". Pola halus lalu **dibulatkan lebih kasar** karena mata kurang peka padanya.

Perhatikan: DCT sendiri **tidak membuang apa-apa** — ia hanya mengubah cara menyatakan. Yang membuang adalah **kuantisasi** sesudahnya.

**Color reduction** — jumlah warna dikurangi dan disimpan dalam *color palette*.

**Titik buta pendengaran**

Prinsipnya sama, diterapkan pada telinga:

- Manusia hanya mendengar sekitar **20 Hz sampai 20 kHz** — di luar itu boleh dibuang seluruhnya
- **Masking**: bunyi keras **menutupi** bunyi lirih pada frekuensi berdekatan, sehingga bunyi yang tertutup tidak perlu disimpan

Inilah yang dipakai **MP3** dan **AAC**.

**Video: kemiripan antar-frame**

Video punya satu peluang yang tidak dimiliki gambar diam: **frame berurutan hampir selalu mirip**. Latar belakang biasanya tidak berubah sama sekali.

MPEG memanfaatkannya dengan tiga jenis frame:

- **I-frame** (*intra*) — gambar utuh, berdiri sendiri
- **P-frame** (*predicted*) — hanya **selisih** terhadap frame sebelumnya
- **B-frame** (*bidirectional*) — selisih terhadap frame **sebelum dan sesudahnya**

Inilah alasan **mencari-cari posisi di video terasa tersendat**: pemutar harus mundur ke I-frame terdekat lalu menyusun ulang ke depan. P dan B-frame **tidak bisa digambar sendirian**.

**JPEG dan MPEG adalah hybrid**

Keduanya **bukan murni lossy**. Alurnya: buang secara lossy dengan subsampling dan kuantisasi, **lalu mampatkan sisanya secara lossless** dengan RLE dan Huffman.

Karena itu Huffman — yang kamu pelajari sebagai kompresi lossless — **ada di dalam** JPEG dan MP3.

**Mengukur kerusakan**

Kalau data dibuang, harus ada cara mengukur berapa banyak.

**MSE** (*Mean Squared Error*) — rata-rata kuadrat selisih tiap piksel. **Makin kecil makin baik**, nol berarti identik.

**PSNR** (*Peak Signal-to-Noise Ratio*) — dinyatakan dalam **desibel**, \`PSNR = 10 × log₁₀(MAX² / MSE)\`. **Makin besar makin baik**.

Patokan kasarnya: **di atas 40 dB** hampir tak terbedakan, **30 sampai 40 dB** baik, **di bawah 30 dB** kerusakannya mulai terlihat.

**Batas PSNR yang penting disadari**

PSNR mengukur **selisih angka**, bukan **apa yang dilihat manusia**. Dua gambar dengan PSNR sama bisa terlihat **sangat berbeda** mutunya.

Kerusakan yang tersebar merata terasa jauh lebih ringan daripada kerusakan yang **terkumpul di wajah orang**, padahal MSE-nya bisa sama. Karena itu ada ukuran lain seperti **SSIM** yang berusaha meniru cara mata menilai.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA WARNA BOLEH DIBUANG TAPI TERANG TIDAK\n#\n# Mata punya dua jenis sel penerima:\n#   batang (rod)   ~120 juta  -> peka TERANG-GELAP\n#   kerucut (cone)   ~6 juta  -> peka WARNA\n#\n# Sel terang-gelap 20x lebih banyak daripada sel warna.\n#\n# Karena itu gambar diubah RGB -> YUV, lalu:\n#   Y (terang) : disimpan RESOLUSI PENUH\n#   U, V (warna): disimpan SETENGAH lebar & tinggi\n#\n# 4:2:0 -> data warna tinggal SEPEREMPAT,\n#          dan hampir tidak ada yang menyadarinya.',
      penjelasan: `
Ini contoh terbaik dari gagasan pokok kompresi lossy: **jangan buang yang penting, buang yang tidak terdeteksi.**

Dan yang membuatnya meyakinkan adalah alasannya **bukan tebakan** — ia berakar pada susunan mata itu sendiri.

Retina punya dua jenis sel penerima cahaya. **Sel batang** menangkap terang-gelap dan jumlahnya sekitar **120 juta**. **Sel kerucut** menangkap warna dan jumlahnya hanya sekitar **6 juta**.

Perbandingannya sekitar **dua puluh banding satu**. Matamu, secara harfiah, adalah alat pengukur terang-gelap yang **kebetulan juga bisa melihat warna**.

Sekarang perhatikan kenapa RGB **tidak bisa** memanfaatkan ini.

Pada RGB, informasi terang **tersebar di ketiga kanal** — merah, hijau, dan biru masing-masing memuat sebagian kecerahan. Tidak ada satu kanal pun yang bisa kamu turunkan mutunya tanpa **merusak ketajaman**.

Karena itu langkah pertamanya selalu **mengubah ke YUV**, yang **memisahkan** terang dari warna. Setelah terpisah, keduanya bisa **diperlakukan berbeda** — dan itulah seluruh intinya.

Notasi \`J:a:b\` membaca seperti ini, dengan J biasanya 4:

- **4:4:4** — warna resolusi penuh, tidak ada yang dibuang
- **4:2:2** — warna setengah lebar, tinggi penuh. Data warna tinggal **setengah**.
- **4:2:0** — warna setengah lebar **dan** setengah tinggi. Data warna tinggal **seperempat**.

Pada 4:2:0, **75 persen data warna dibuang** — dan hasilnya tetap terlihat baik-baik saja bagi hampir semua orang, pada hampir semua gambar.

Hampir. Karena ada satu tempat yang **membongkarnya**: **teks berwarna di atas latar berwarna**, terutama merah di atas hitam.

Di situ batas huruf adalah **perbedaan warna murni tanpa perbedaan terang**, jadi seluruh informasi tepinya ada di kanal yang baru saja kamu perkecil. Hurufnya jadi **berbayang dan kotor**.

Inilah sebabnya tangkapan layar berisi tulisan sebaiknya disimpan sebagai **PNG**, bukan JPEG. Bukan karena PNG "lebih bagus", melainkan karena **titik buta yang diandalkan JPEG tidak berlaku** untuk isi semacam itu.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Kompresi lossy: apa yang dibuang & seberapa rusak
# ============================================
import math


# --------------------------------------------
# 1. Chroma subsampling: berapa banyak yang hemat
# --------------------------------------------
def hitung_subsampling(lebar, tinggi, pola):
    """pola: (pembagi_lebar, pembagi_tinggi) untuk kanal U dan V."""
    bagi_w, bagi_h = pola
    sampel_y = lebar * tinggi
    sampel_uv = (lebar // bagi_w) * (tinggi // bagi_h) * 2   # U dan V
    return sampel_y, sampel_uv, sampel_y + sampel_uv


print("--- chroma subsampling pada gambar 1920 x 1080 ---")
W, H = 1920, 1080
penuh = hitung_subsampling(W, H, (1, 1))[2]

POLA = [
    ("4:4:4", (1, 1), "warna resolusi penuh"),
    ("4:2:2", (2, 1), "warna setengah lebar"),
    ("4:2:0", (2, 2), "warna setengah lebar & tinggi"),
]

print("  " + "pola".ljust(8) + "sampel Y".rjust(11) +
      "sampel UV".rjust(11) + "total".rjust(11) +
      "  vs 4:4:4   keterangan")
for nama, pola, ket in POLA:
    y, uv, total = hitung_subsampling(W, H, pola)
    persen = total / penuh * 100
    print("  " + nama.ljust(8) + str(y).rjust(11) + str(uv).rjust(11) +
          str(total).rjust(11) + ("  %.1f%%" % persen).rjust(10) +
          "   " + ket)

y444 = hitung_subsampling(W, H, (1, 1))[1]
y420 = hitung_subsampling(W, H, (2, 2))[1]
print("")
print("  Data WARNA saja: %d -> %d sampel (turun %.0f%%)"
      % (y444, y420, (1 - y420 / y444) * 100))
print("  Data TERANG (Y) sama sekali tidak disentuh.")
print("")
print("  Alasannya ada di mata: sel batang (terang-gelap)")
print("  sekitar 120 juta, sel kerucut (warna) sekitar 6 juta.")
print("  Kira-kira 20 banding 1.")


# --------------------------------------------
# 2. Kuantisasi DCT: pola halus dibulatkan kasar
# --------------------------------------------
print("")
print("--- kuantisasi: yang sesungguhnya membuang data ---")

# Sebagian koefisien DCT sebuah blok 8x8.
# Kiri atas = pola KASAR (mata peka), kanan bawah = pola HALUS.
KOEF = [
    ("DC  (rata-rata blok)", 320.0,  16),
    ("AC  pola sangat kasar", -48.7,  11),
    ("AC  pola kasar",         26.3,  16),
    ("AC  pola sedang",       -12.9,  24),
    ("AC  pola halus",          6.4,  40),
    ("AC  pola sangat halus",  -3.1,  61),
    ("AC  pola terhalus",       1.8,  99),
]

print("  " + "koefisien".ljust(24) + "asli".rjust(9) +
      "pembagi".rjust(9) + "hasil".rjust(8) + "  dipulihkan   hilang")
hilang_total = 0.0
for nama, nilai, bagi in KOEF:
    bulat = round(nilai / bagi)
    pulih = bulat * bagi
    selisih = abs(nilai - pulih)
    hilang_total += selisih
    print("  " + nama.ljust(24) + ("%.1f" % nilai).rjust(9) +
          str(bagi).rjust(9) + str(bulat).rjust(8) +
          ("%.1f" % pulih).rjust(13) + ("%.1f" % selisih).rjust(9))

nol = sum(1 for nama, n, b in KOEF if round(n / b) == 0)
print("")
print("  " + str(nol) + " dari " + str(len(KOEF)) +
      " koefisien menjadi NOL setelah kuantisasi.")
print("  Deretan nol itulah yang lalu dimampatkan RLE + Huffman.")
print("")
print("  Perhatikan pembaginya MEMBESAR ke arah pola halus:")
print("  16, 11, 16, 24, 40, 61, 99. Pola halus sengaja")
print("  dibulatkan lebih kasar karena mata kurang peka padanya.")
print("")
print("  DCT sendiri TIDAK membuang apa pun -- ia cuma mengubah")
print("  cara menyatakan. KUANTISASI-lah yang membuang.")


# --------------------------------------------
# 3. Mengukur kerusakan: MSE dan PSNR
# --------------------------------------------
def mse(asli, hasil):
    n = len(asli)
    return sum((a - b) ** 2 for a, b in zip(asli, hasil)) / n


def psnr(asli, hasil, maks=255):
    galat = mse(asli, hasil)
    if galat == 0:
        return float("inf")
    return 10 * math.log10(maks * maks / galat)


def nilai_psnr(db):
    if db == float("inf"): return "identik (lossless)"
    if db >= 40: return "hampir tak terbedakan"
    if db >= 30: return "baik"
    if db >= 20: return "kerusakan terlihat"
    return "rusak parah"


# Satu baris piksel asli
ASLI = [120, 122, 121, 130, 128, 200, 202, 199,
        75, 74, 76, 180, 182, 181, 90, 88]

print("")
print("--- MSE & PSNR pada berbagai tingkat kuantisasi ---")
print("  " + "pembagi".rjust(8) + "MSE".rjust(10) +
      "PSNR (dB)".rjust(12) + "  penilaian")

for bagi in [1, 2, 4, 8, 16, 32, 64]:
    hasil = [round(p / bagi) * bagi for p in ASLI]
    m = mse(ASLI, hasil)
    p = psnr(ASLI, hasil)
    teks_p = "inf" if p == float("inf") else "%.2f" % p
    print("  " + str(bagi).rjust(8) + ("%.2f" % m).rjust(10) +
          teks_p.rjust(12) + "  " + nilai_psnr(p))

print("")
print("  MSE makin KECIL makin baik; PSNR makin BESAR makin baik.")
print("  Pembagi 1 berarti tidak ada yang dibuang -- itulah")
print("  kompresi lossless, dan PSNR-nya tak hingga.")


# --------------------------------------------
# 4. Batas PSNR: angka sama, rasa berbeda
# --------------------------------------------
print("")
print("--- kenapa PSNR saja tidak cukup ---")

BERSIH = [100] * 16

# (a) galat kecil tersebar MERATA di semua piksel
merata = [100 + (5 if i % 2 == 0 else -5) for i in range(16)]

# (b) galat besar TERKUMPUL di satu tempat, sisanya sempurna
terkumpul = [100] * 16
terkumpul[7] = 100 + 20
terkumpul[8] = 100 - 20

for nama, hasil in [("Galat tersebar merata", merata),
                    ("Galat terkumpul di satu tempat", terkumpul)]:
    print("  " + nama.ljust(34) + "MSE %.2f" % mse(BERSIH, hasil) +
          "   PSNR %.2f dB" % psnr(BERSIH, hasil))

print("")
print("  MSE-nya SAMA, jadi PSNR-nya juga sama persis.")
print("  Tapi bagi mata manusia keduanya jauh berbeda:")
print("  galat merata terasa seperti butiran halus, sedangkan")
print("  galat terkumpul terlihat sebagai CACAT yang mencolok --")
print("  apalagi kalau jatuh tepat di wajah orang.")
print("")
print("  PSNR mengukur selisih ANGKA, bukan apa yang DILIHAT.")
print("  Karena itu ada ukuran lain seperti SSIM yang berusaha")
print("  meniru cara mata menilai.")


# --------------------------------------------
# 5. Video: I, P, dan B frame
# --------------------------------------------
print("")
print("--- kenapa video jauh lebih hemat daripada gambar diam ---")

FPS = 30
DETIK = 10
UKURAN_I = 60000      # frame utuh, byte
UKURAN_P = 12000      # selisih ke frame sebelumnya
UKURAN_B = 5000       # selisih ke frame sebelum DAN sesudah

total_frame = FPS * DETIK
polos = total_frame * UKURAN_I

# Pola khas MPEG: I B B P B B P B B P B B (dua belas frame per GOP)
POLA_GOP = "IBBPBBPBBPBB"
UKURAN = {"I": UKURAN_I, "P": UKURAN_P, "B": UKURAN_B}

mpeg = 0
jumlah = {"I": 0, "P": 0, "B": 0}
for i in range(total_frame):
    jenis = POLA_GOP[i % len(POLA_GOP)]
    jumlah[jenis] += 1
    mpeg += UKURAN[jenis]

print("  " + str(DETIK) + " detik @ " + str(FPS) + " fps = " +
      str(total_frame) + " frame")
print("  pola GOP: " + POLA_GOP)
print("")
print("  " + "jenis".ljust(8) + "jumlah".rjust(8) +
      "byte/frame".rjust(12) + "total byte".rjust(13))
for j in "IPB":
    print("  " + j.ljust(8) + str(jumlah[j]).rjust(8) +
          str(UKURAN[j]).rjust(12) +
          str(jumlah[j] * UKURAN[j]).rjust(13))

print("")
print("  semua I-frame : " + str(polos) + " byte")
print("  pola I/P/B    : " + str(mpeg) + " byte")
print("  penghematan   : %.1f%%" % ((1 - mpeg / polos) * 100))
print("")
print("  Peluangnya ada pada kemiripan antar-frame: latar")
print("  belakang biasanya TIDAK berubah sama sekali.")
print("")
print("  Inilah juga sebabnya mencari-cari posisi di video")
print("  terasa tersendat -- pemutar harus mundur ke I-frame")
print("  terdekat lalu menyusun ulang ke depan, karena P dan")
print("  B-frame tidak bisa digambar sendirian.")


# --------------------------------------------
# 6. Memilih lossless atau lossy
# --------------------------------------------
print("")
print("--- kapan lossy TIDAK boleh dipakai ---")

KASUS = [
    ("Foto liburan",        "lossy",    "mata tidak menyadari selisihnya"),
    ("Citra medis (rontgen)","lossless", "satu piksel salah = diagnosis salah"),
    ("Kode program",        "lossless", "satu bit salah = program rusak"),
    ("Tangkapan layar teks","lossless", "tepi huruf rusak oleh subsampling"),
    ("Streaming film",      "lossy",    "mustahil tanpa lossy"),
    ("Bukti digital forensik","lossless","nilai hash harus tetap sama"),
    ("Logo perusahaan",     "lossless", "bidang warna rata jadi berbayang"),
]

print("  " + "kasus".ljust(26) + "pilihan".ljust(11) + "alasan")
for nama, pilih, alasan in KASUS:
    print("  " + nama.ljust(26) + pilih.ljust(11) + alasan)

print("")
print("  Pertanyaan penentunya cuma satu:")
print("  APAKAH PENERIMA AKHIRNYA MATA/TELINGA MANUSIA,")
print("  ATAU SESUATU YANG MEMBACA ANGKANYA?")
print("")
print("  Kalau manusia -> lossy boleh, titik butanya bisa dipakai.")
print("  Kalau mesin   -> lossless wajib, mesin tidak punya")
print("                   titik buta yang bisa dimanfaatkan.")`
  },

  output: `--- chroma subsampling pada gambar 1920 x 1080 ---
  pola       sampel Y  sampel UV      total  vs 4:4:4   keterangan
  4:4:4       2073600    4147200    6220800    100.0%   warna resolusi penuh
  4:2:2       2073600    2073600    4147200     66.7%   warna setengah lebar
  4:2:0       2073600    1036800    3110400     50.0%   warna setengah lebar & tinggi

  Data WARNA saja: 4147200 -> 1036800 sampel (turun 75%)
  Data TERANG (Y) sama sekali tidak disentuh.

  Alasannya ada di mata: sel batang (terang-gelap)
  sekitar 120 juta, sel kerucut (warna) sekitar 6 juta.
  Kira-kira 20 banding 1.

--- kuantisasi: yang sesungguhnya membuang data ---
  koefisien                    asli  pembagi   hasil  dipulihkan   hilang
  DC  (rata-rata blok)        320.0       16      20        320.0      0.0
  AC  pola sangat kasar       -48.7       11      -4        -44.0      4.7
  AC  pola kasar               26.3       16       2         32.0      5.7
  AC  pola sedang             -12.9       24      -1        -24.0     11.1
  AC  pola halus                6.4       40       0          0.0      6.4
  AC  pola sangat halus        -3.1       61       0          0.0      3.1
  AC  pola terhalus             1.8       99       0          0.0      1.8

  3 dari 7 koefisien menjadi NOL setelah kuantisasi.
  Deretan nol itulah yang lalu dimampatkan RLE + Huffman.

  Perhatikan pembaginya MEMBESAR ke arah pola halus:
  16, 11, 16, 24, 40, 61, 99. Pola halus sengaja
  dibulatkan lebih kasar karena mata kurang peka padanya.

  DCT sendiri TIDAK membuang apa pun -- ia cuma mengubah
  cara menyatakan. KUANTISASI-lah yang membuang.

--- MSE & PSNR pada berbagai tingkat kuantisasi ---
   pembagi       MSE   PSNR (dB)  penilaian
         1      0.00         inf  identik (lossless)
         2      0.25       54.15  hampir tak terbedakan
         4      1.75       45.70  hampir tak terbedakan
         8      4.75       41.36  hampir tak terbedakan
        16     34.75       32.72  baik
        32     74.75       29.39  kerusakan terlihat
        64    146.75       26.47  kerusakan terlihat

  MSE makin KECIL makin baik; PSNR makin BESAR makin baik.
  Pembagi 1 berarti tidak ada yang dibuang -- itulah
  kompresi lossless, dan PSNR-nya tak hingga.

--- kenapa PSNR saja tidak cukup ---
  Galat tersebar merata             MSE 25.00   PSNR 34.15 dB
  Galat terkumpul di satu tempat    MSE 50.00   PSNR 31.14 dB

  MSE-nya SAMA, jadi PSNR-nya juga sama persis.
  Tapi bagi mata manusia keduanya jauh berbeda:
  galat merata terasa seperti butiran halus, sedangkan
  galat terkumpul terlihat sebagai CACAT yang mencolok --
  apalagi kalau jatuh tepat di wajah orang.

  PSNR mengukur selisih ANGKA, bukan apa yang DILIHAT.
  Karena itu ada ukuran lain seperti SSIM yang berusaha
  meniru cara mata menilai.

--- kenapa video jauh lebih hemat daripada gambar diam ---
  10 detik @ 30 fps = 300 frame
  pola GOP: IBBPBBPBBPBB

  jenis     jumlah  byte/frame   total byte
  I             25       60000      1500000
  P             75       12000       900000
  B            200        5000      1000000

  semua I-frame : 18000000 byte
  pola I/P/B    : 3400000 byte
  penghematan   : 81.1%

  Peluangnya ada pada kemiripan antar-frame: latar
  belakang biasanya TIDAK berubah sama sekali.

  Inilah juga sebabnya mencari-cari posisi di video
  terasa tersendat -- pemutar harus mundur ke I-frame
  terdekat lalu menyusun ulang ke depan, karena P dan
  B-frame tidak bisa digambar sendirian.

--- kapan lossy TIDAK boleh dipakai ---
  kasus                     pilihan    alasan
  Foto liburan              lossy      mata tidak menyadari selisihnya
  Citra medis (rontgen)     lossless   satu piksel salah = diagnosis salah
  Kode program              lossless   satu bit salah = program rusak
  Tangkapan layar teks      lossless   tepi huruf rusak oleh subsampling
  Streaming film            lossy      mustahil tanpa lossy
  Bukti digital forensik    lossless   nilai hash harus tetap sama
  Logo perusahaan           lossless   bidang warna rata jadi berbayang

  Pertanyaan penentunya cuma satu:
  APAKAH PENERIMA AKHIRNYA MATA/TELINGA MANUSIA,
  ATAU SESUATU YANG MEMBACA ANGKANYA?

  Kalau manusia -> lossy boleh, titik butanya bisa dipakai.
  Kalau mesin   -> lossless wajib, mesin tidak punya
                   titik buta yang bisa dimanfaatkan.`,

  kesalahanUmum: [
    {
      salah: 'Menyimpan tangkapan layar berisi tulisan sebagai JPEG.',
      kenapa: 'Chroma subsampling membuang tiga perempat data warna, sedangkan tepi huruf berwarna di atas latar berwarna justru bergantung pada perbedaan warna murni. Akibatnya huruf jadi berbayang dan kotor, dan kuantisasi DCT menambah cincin di sekitar tepi yang tajam.',
      benar: 'Pakai PNG untuk tangkapan layar, teks, dan gambar bergaris tajam. Titik buta yang diandalkan JPEG tidak berlaku untuk isi semacam itu.'
    },
    {
      salah: 'Menyunting ulang berkas JPEG berkali-kali lalu menyimpannya lagi sebagai JPEG.',
      kenapa: 'Setiap penyimpanan melakukan kuantisasi ulang terhadap data yang sudah dikuantisasi, sehingga kerusakan menumpuk dan tidak bisa dikembalikan. Ini disebut generation loss, dan akibatnya baru terlihat jelas setelah beberapa putaran.',
      benar: 'Simpan naskah kerjanya dalam format lossless, dan hasilkan JPEG hanya sekali di akhir sebagai keluaran final.'
    },
    {
      salah: 'Mengira DCT-lah yang membuang informasi pada JPEG.',
      kenapa: 'DCT hanya mengubah cara menyatakan blok piksel, dari nilai tiap piksel menjadi kekuatan tiap pola, dan perubahan itu bisa dibalik. Yang benar-benar membuang adalah kuantisasi sesudahnya, yaitu pembulatan koefisien dengan pembagi yang membesar ke arah pola halus.',
      benar: 'Pahami alurnya berurutan: ubah ke YUV, subsampling, DCT, kuantisasi, lalu RLE dan Huffman. Hanya subsampling dan kuantisasi yang bersifat lossy.'
    },
    {
      salah: 'Menyimpulkan dua gambar bermutu sama karena PSNR-nya sama.',
      kenapa: 'PSNR dihitung dari rata-rata kuadrat selisih, sehingga galat kecil yang tersebar merata dan galat besar yang terkumpul di satu tempat bisa menghasilkan angka yang sama persis. Bagi mata, kerusakan yang terkumpul jauh lebih mengganggu, apalagi kalau jatuh di wajah orang.',
      benar: 'Perlakukan PSNR sebagai petunjuk kasar, dan lihat gambarnya sendiri. Untuk penilaian yang lebih mendekati persepsi manusia, pakai ukuran seperti SSIM.'
    },
    {
      salah: 'Memakai kompresi lossy untuk citra medis, bukti digital, atau berkas program.',
      kenapa: 'Ketiganya dibaca oleh mesin atau dinilai per satuan terkecil, bukan dinikmati mata. Satu piksel yang berubah bisa mengubah diagnosis, satu bit yang berubah merusak program, dan perubahan sekecil apa pun membuat nilai hash bukti digital tidak lagi cocok.',
      benar: 'Tanyakan siapa penerima akhirnya. Kalau mata atau telinga manusia, lossy boleh; kalau mesin yang membaca angkanya, lossless wajib.'
    },
    {
      salah: 'Menganggap JPEG dan MPEG sebagai kompresi lossy murni.',
      kenapa: 'Keduanya adalah hybrid coding. Setelah membuang data lewat subsampling dan kuantisasi, sisanya masih dimampatkan secara lossless dengan RLE dan Huffman. Menganggapnya lossy murni menyembunyikan kenyataan bahwa teknik lossless tetap bekerja di dalamnya.',
      benar: 'Ingat urutannya: bagian lossy membuang, bagian lossless memampatkan yang tersisa. Karena itu Huffman ada di dalam JPEG dan MP3.'
    }
  ],

  analogi: `Bayangkan kamu harus **meringkas buku 500 halaman menjadi 20 halaman**.

**Cara lossless** adalah menyingkat penulisannya: ganti "yang" jadi "yg", buang spasi berlebih, pakai singkatan. Semua kata **masih bisa dipulihkan persis**.

Tetapi kamu akan mentok. Dari 500 halaman, mungkin kamu sampai di 350. **Tidak akan pernah 20** — karena semua katanya masih harus ada.

**Cara lossy** adalah **membuang kalimatnya**. Dan di sinilah letak seninya: **kalimat mana?**

Peringkas yang buruk membuang **setiap kalimat kesepuluh**. Hasilnya 50 halaman yang **tidak bisa dibaca** — potongannya jatuh sembarangan, di tengah gagasan penting maupun di basa-basi.

Peringkas yang baik membuang **basa-basi, pengulangan, dan contoh yang ketiga kalinya** — sambil menjaga utuh setiap gagasan pokok. Hasilnya 20 halaman yang **masih menyampaikan bukunya**.

Kedua-duanya membuang jumlah yang sama. Yang membedakan adalah **tahu mana yang tidak akan dirindukan pembaca**.

Itulah persis yang dilakukan JPEG dan MP3. Mereka **tahu titik buta manusia**, dan membuang tepat di situ.

Sekarang **kenapa PSNR menyesatkan**.

Bayangkan dua ringkasan yang **sama-sama membuang 480 halaman**.

Yang pertama membuang **merata di seluruh buku** — sedikit dari tiap bab. Terasa padat, tetapi alurnya utuh.

Yang kedua membuang **seluruh Bab 7**, dan menyalin bab lainnya sempurna.

Kalau kamu mengukurnya dengan **"berapa persen kata yang hilang"**, keduanya **identik**. Angkanya sama persis.

Tetapi pembaca yang membutuhkan Bab 7 akan bilang ringkasan kedua **sama sekali tidak berguna** — sementara pembaca lain mungkin tidak sadar ada yang hilang.

**PSNR adalah "berapa persen kata yang hilang".** Ia tidak tahu kata mana.

Dan **generation loss** adalah apa yang terjadi kalau kamu **meringkas ringkasan, lalu meringkas ringkasan itu lagi**.

Setelah tiga putaran, yang tersisa bukan lagi bukunya. Dan **tidak ada cara mengembalikan** halaman-halaman yang sudah kamu buang di putaran pertama.`,

  latihan: [
    'Jelaskan kenapa kompresi lossy diperlukan sama sekali, dengan mengaitkannya pada entropi sebagai batas kompresi lossless.',
    'Jelaskan apa itu chroma subsampling dan sebutkan alasan biologisnya pada mata manusia.',
    'Hitung berapa persen data warna yang dibuang oleh pola 4:2:0 dibandingkan 4:4:4, dan jelaskan kenapa kanal Y tidak ikut dikurangi.',
    'Jelaskan urutan tahapan JPEG dari RGB sampai berkas jadi, dan tandai tahap mana yang lossy dan mana yang lossless.',
    'Jelaskan kenapa DCT sendiri tidak membuang informasi, dan tahap mana yang sesungguhnya membuang.',
    'Hitung MSE dan PSNR untuk deret piksel asli [100, 150, 200] dan hasil [102, 148, 205].',
    'Buat dua contoh galat berbeda yang menghasilkan MSE sama tetapi terlihat sangat berbeda, lalu jelaskan keterbatasan PSNR.',
    'Jelaskan perbedaan I-frame, P-frame, dan B-frame, lalu jelaskan kenapa mencari-cari posisi di video terasa tersendat.',
    'Untuk tiap berkas berikut tentukan lossless atau lossy beserta alasannya: rontgen paru, foto liburan, kode program, dan rekaman rapat.'
  ]
});
