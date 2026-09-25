/* ============================================================
   matematika-diskrit.js — materi Matematika Diskrit (Semester 2)

   Disusun dari projek kuliah sendiri:
     "Analisis Keamanan Kata Sandi pada Sosial Media Instagram
      Berdasarkan Kombinasi Karakter dan Panjang Sandi"
     (projek kelompok, lima orang)

   Landasan teori projek itu memuat Permutasi, Rumus Permutasi,
   dan Brute Force — dan ketiganya jadi tulang punggung materi ini.

   CATATAN CAKUPAN: hanya dua berkas yang ada di drive untuk mata
   kuliah ini, keduanya tentang projek yang sama. Dua topik
   pertama di bawah berasal dari projek itu.

   Lima topik berikutnya (aljabar Boolean, induksi & relasi
   rekurens, teori bilangan, teori graf, pohon) ditambahkan dari
   REFERENSI LUAR -- RPS Matematika Diskrit kampus lain plus
   pengetahuan umum mata kuliah ini. Penjelasannya ada di kepala
   bagian tambahan di bawah. Himpunan tetap di Logika Informatika
   dan relasi tetap di Matematika Dasar.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Rumus".
   ============================================================ */

TOPICS.push({
  id: 'matdis-kombinatorial',
  judul: 'Kaidah Pencacahan, Permutasi & Kombinasi',
  kategori: 'matematika-diskrit',
  tag: ['kombinatorial', 'permutasi', 'kombinasi', 'faktorial', 'aturan perkalian'],
  ringkas: 'Menghitung banyaknya kemungkinan tanpa mendaftar satu per satu — dan satu pertanyaan yang menentukan rumusnya.',

  fungsi: `**Menghitung berapa banyak kemungkinan, tanpa mendaftarnya satu per satu.**

Di kuliah dan kerja nyata, ini muncul di tempat-tempat berikut:

- **Menaksir kekuatan kata sandi** — berapa lama sebuah sandi bisa ditebak habis
- **Menghitung ruang pencarian** sebelum menulis algoritma brute force, supaya kamu tahu sejak awal apakah pendekatannya masuk akal
- **Menentukan jumlah kasus uji** yang dibutuhkan pada pengujian *decision table*
- **Merancang skema pengkodean** — berapa digit nomor induk yang cukup untuk 30 tahun ke depan
- **Menghitung peluang** pada Data Mining dan Kecerdasan Buatan

Yang paling sering dipakai sehari-hari: **memutuskan apakah sebuah masalah bisa diselesaikan dengan mencoba semua kemungkinan.** Kalau jumlahnya 10 ribu, coba saja. Kalau 10 pangkat 20, cari cara lain — dan kamu tahu itu **sebelum** menulis satu baris kode.`,

  praktik: {
    tujuan: `Kamu bisa menaksir ukuran ruang pencarian sebuah masalah dalam hitungan menit, lalu memutuskan apakah brute force layak dipakai.`,
    alat: [
      'Python 3 (sudah termasuk modul `math` dan `itertools`)',
      'Kalkulator biasa juga cukup untuk kasus kecil'
    ],
    langkah: [
      { judul: 'Tentukan dulu: urutan berpengaruh atau tidak?',
        isi: `Ini pertanyaan pertama yang harus dijawab, dan menentukan seluruh perhitungan berikutnya.

- Kalau **AB berbeda dari BA** → **permutasi**
- Kalau **AB sama dengan BA** → **kombinasi**

Contoh: susunan juara 1-2-3 adalah permutasi (urutan berpengaruh). Memilih 3 anggota tim adalah kombinasi (urutan tidak berpengaruh).` },
      { judul: 'Tentukan: boleh diulang atau tidak?',
        isi: `Sandi boleh memakai huruf yang sama dua kali → **boleh diulang**, jadi rumusnya \`n^r\`.

Panitia tidak boleh merangkap jabatan → **tidak boleh diulang**, jadi permutasi \`P(n,r)\`.` },
      { judul: 'Hitung dengan Python',
        isi: `Buat berkas \`hitung.py\`:

- \`import math, itertools\`
- boleh diulang: \`n ** r\`
- permutasi: \`math.perm(n, r)\`
- kombinasi: \`math.comb(n, r)\`

Ketiganya sudah tersedia sejak Python 3.8, tidak perlu memasang apa pun.` },
      { judul: 'Ubah jumlahnya menjadi WAKTU',
        isi: `Angka seperti "10 pangkat 15" tidak berarti apa-apa sampai diubah jadi waktu.

Bagi jumlah kemungkinan dengan **kecepatan mencoba per detik**. Patokan kasar untuk komputer biasa:

- Python murni: sekitar **1 juta** operasi sederhana per detik
- C/C++: sekitar **100 juta** per detik

Lalu bagi lagi dengan 60, 60, 24, dan 365 untuk mendapat tahun.` },
      { judul: 'Ambil keputusan',
        isi: `Patokan praktis yang bisa langsung dipakai:

- di bawah **satu juta** → brute force aman, tulis saja
- **satu juta sampai satu miliar** → masih mungkin, tapi pakai bahasa cepat dan pertimbangkan *pruning*
- di atas **satu miliar** → cari algoritma lain, jangan buang waktu` },
      { judul: 'Uji dengan kasus yang bisa kamu hitung tangan',
        isi: `Sebelum memercayai rumusmu, uji dengan angka kecil yang bisa kamu daftar manual.

Misalnya \`math.comb(4, 2)\` harus 6, dan kamu bisa memeriksanya dengan menulis semua pasangan dari {A,B,C,D}: AB, AC, AD, BC, BD, CD.

Kalau rumusmu meleset di kasus kecil, ia pasti meleset di kasus besar — hanya saja di sana kamu tidak akan menyadarinya.` }
    ],
    cek: [
      '`math.comb(4, 2)` mengembalikan 6, dan kamu bisa mendaftar keenamnya dengan tangan',
      `\`math.perm(4, 2)\` mengembalikan 12, yaitu dua kali lipat kombinasinya — masuk akal karena tiap pasangan punya 2 urutan`,
      `Sandi 8 huruf kecil menghasilkan sekitar 2,09 × 10¹¹ kemungkinan; pada 1 juta coba per detik itu sekitar 2,4 hari`
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa ditulis begitu',

  konsep: `
**Kombinatorial** adalah cabang matematika yang menghitung **berapa banyak kemungkinan** tanpa harus mendaftarnya satu per satu.

Ini penting bagi informatika karena menjawab pertanyaan seperti: berapa banyak kata sandi yang mungkin, berapa langkah yang harus dicoba algoritma brute force, dan berapa besar ruang pencarian sebuah persoalan.

**Dua kaidah dasar**

- **Kaidah perkalian** — kalau langkah pertama punya \`m\` cara dan langkah kedua punya \`n\` cara, maka keduanya bersama punya **\`m × n\`** cara. Dipakai kalau kedua langkah **dikerjakan berurutan**.
- **Kaidah penjumlahan** — kalau ada \`m\` pilihan jenis A dan \`n\` pilihan jenis B, dan kamu memilih **salah satu saja**, maka ada **\`m + n\`** cara.

Cara membedakannya: **"dan" berarti dikali, "atau" berarti ditambah.**

**Faktorial**

**\`n!\`** adalah \`n × (n−1) × ... × 2 × 1\`. Ia menghitung berapa cara menyusun \`n\` benda berbeda dalam satu urutan.

Ditetapkan **\`0! = 1\`**. Ini bukan kesepakatan sembarangan — ada tepat **satu** cara menyusun himpunan kosong, yaitu tidak menyusun apa-apa. Penetapan ini juga membuat rumus permutasi dan kombinasi tetap benar di kasus tepinya.

Faktorial tumbuh **sangat cepat**: \`10! ≈ 3,6 juta\`, tetapi \`20! ≈ 2,4 × 10¹⁸\`.

**Permutasi — urutan DIPERHATIKAN**

Banyaknya cara memilih \`r\` benda dari \`n\` benda **dengan memperhatikan urutan**:

**P(n, r) = n! / (n − r)!**

Bacanya: dari \`n\` pilihan untuk posisi pertama, tersisa \`n−1\` untuk posisi kedua, dan seterusnya sampai \`r\` posisi terisi.

**Kombinasi — urutan TIDAK diperhatikan**

**C(n, r) = n! / (r! × (n − r)!)**

Perhatikan bahwa ia **sama dengan permutasi dibagi \`r!\`**. Alasannya langsung: setiap kelompok yang sama bisa disusun dalam \`r!\` urutan berbeda, dan karena urutan tidak dihitung, semua urutan itu **dianggap satu**.

**Pertanyaan penentu**

Untuk memilih rumus, tanyakan satu hal: **apakah menukar urutannya menghasilkan hal yang berbeda?**

- Menyusun **PIN** — 1234 berbeda dari 4321 → **permutasi**
- Memilih **tim** — {Andi, Budi} sama dengan {Budi, Andi} → **kombinasi**
- Memilih **ketua dan wakil** — berbeda perannya → **permutasi**
- Memilih **tiga perwakilan** — peran sama → **kombinasi**

**Permutasi dengan pengulangan**

Kalau benda boleh dipilih **berulang**, misalnya karakter kata sandi yang boleh sama, rumusnya jauh lebih sederhana:

**\`n^r\`**

Inilah yang dipakai untuk menghitung ruang kata sandi: \`n\` adalah jumlah jenis karakter yang tersedia, \`r\` adalah panjang sandinya.

Bentuk inilah yang menjadi dasar projek kelompokmu, dan yang menjelaskan kenapa **menambah panjang sandi jauh lebih ampuh daripada menambah jenis karakter**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Pertanyaan penentu: apakah URUTAN membedakan?\n\n# PERMUTASI -- urutan diperhatikan\n# Memilih ketua & wakil dari 5 orang\n# P(5,2) = 5! / 3! = 20\n#   (Andi ketua, Budi wakil) BEDA dari\n#   (Budi ketua, Andi wakil)\n\n# KOMBINASI -- urutan tidak diperhatikan\n# Memilih 2 perwakilan dari 5 orang\n# C(5,2) = 5! / (2! x 3!) = 10\n#   {Andi, Budi} SAMA dengan {Budi, Andi}\n\n# Perhatikan: 20 / 2! = 10\n# Kombinasi = permutasi dibagi r!',
      penjelasan: `
Hubungan **C(n,r) = P(n,r) / r!** adalah kunci untuk memahami keduanya sekaligus, alih-alih menghafal dua rumus terpisah.

Alasannya bisa ditalar. Bayangkan kamu sudah memilih dua orang: Andi dan Budi. Sebagai **kombinasi**, itu **satu** hasil. Tetapi sebagai **permutasi**, kelompok yang sama itu menghasilkan **dua** susunan: Andi-Budi dan Budi-Andi.

Untuk memilih tiga orang, satu kelompok menghasilkan \`3! = 6\` susunan. Untuk \`r\` orang, \`r!\` susunan.

Jadi permutasi **menghitung setiap kelompok sebanyak \`r!\` kali**. Membaginya dengan \`r!\` mengembalikan hitungan ke satu per kelompok — dan itulah kombinasi.

Dari sini juga jelas kenapa **kombinasi selalu lebih kecil atau sama** dengan permutasi. Sama hanya kalau \`r = 1\` atau \`r = 0\`, karena \`1! = 1\` dan \`0! = 1\`.

Ada satu sifat kombinasi yang layak diingat karena sering memudahkan hitungan: **C(n, r) = C(n, n−r)**.

Memilih 3 dari 10 sama banyaknya dengan memilih 7 dari 10. Masuk akal: setiap kali kamu memilih 3 orang untuk ikut, kamu sekaligus memilih 7 orang untuk tidak ikut. **Setiap cara memilih adalah juga cara membuang.**

Sifat ini praktis: menghitung C(100, 98) jauh lebih mudah lewat C(100, 2) yang cuma \`100 × 99 / 2\`.

Dalam pemrograman, jangan hitung faktorial besar lalu membaginya — \`100!\` punya 158 digit dan boros. Pakai bentuk yang mencoret dulu: \`C(n,r) = n × (n−1) × ... × (n−r+1) / r!\`, atau langsung pakai \`math.comb\` di Python.
`
    },
    {
      bahasa: 'python',
      kode: '# Dengan pengulangan: n^r\n# Inilah rumus ruang kata sandi\n\n# Sandi 8 karakter, hanya huruf kecil (26 jenis)\n#   26^8  = 208.827.064.576\n\n# Sandi 8 karakter, 95 jenis karakter\n#   95^8  = 6.634.204.312.890.625   (~32.000x lebih banyak)\n\n# Sandi 12 karakter, hanya huruf kecil\n#   26^12 = 95.428.956.661.682.176  (~14x lipat dari 95^8)\n\n# Menambah PANJANG mengalahkan menambah JENIS',
      penjelasan: `
Inilah inti projek kelompokmu, dan hasilnya berlawanan dengan nasihat yang biasa didengar orang.

Rumusnya **\`n^r\`**, dengan \`n\` jenis karakter dan \`r\` panjang sandi. Perhatikan letak keduanya:

- **\`n\` ada di alas** — menambahnya membuat hasilnya bertambah secara **perkalian biasa**
- **\`r\` ada di pangkat** — menambahnya membuat hasilnya bertambah secara **eksponensial**

Bandingkan angkanya. Beralih dari 26 jenis karakter ke 95 jenis — artinya memakai huruf besar, angka, dan simbol — mengalikan ruangnya sekitar **32 ribu kali**.

Terdengar banyak. Tetapi sekadar **menambah empat karakter** pada sandi huruf kecil mengalikan ruangnya dengan \`26⁴ = 456.976\` — lebih dari **empat ratus ribu kali**.

Jadi \`26¹²\` mengalahkan \`95⁸\`, padahal yang pertama cuma memakai huruf kecil.

Ini menjelaskan kenapa nasihat lama *"pakai huruf besar, angka, dan simbol"* **kurang tepat sasaran**. Nasihat itu menaikkan \`n\`, padahal yang jauh lebih berpengaruh adalah \`r\`.

Ada alasan kedua yang lebih menentukan, dan sudah kamu temui di topik Keamanan Informasi pada PTI: manusia yang dipaksa memakai simbol cenderung menghasilkan pola yang **tertebak** — \`P@ssw0rd!\`, \`Passw0rd123\`. Perhitungan \`n^r\` mengandaikan penyerang menebak **sembarangan**, padahal penyerang sungguhan memakai **kamus pola**.

Sandi yang panjang dan tidak berpola — misalnya rangkaian beberapa kata acak — memenuhi keduanya sekaligus: \`r\` besar, dan tidak ada pola yang bisa dikamuskan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Kombinatorial: permutasi, kombinasi, ruang sandi
# ============================================
import math

def faktorial(n):
    hasil = 1
    for i in range(2, n + 1):
        hasil *= i
    return hasil

def permutasi(n, r):
    """Urutan DIPERHATIKAN: n! / (n-r)!"""
    return faktorial(n) // faktorial(n - r)

def kombinasi(n, r):
    """Urutan TIDAK diperhatikan: n! / (r! (n-r)!)"""
    return faktorial(n) // (faktorial(r) * faktorial(n - r))


print("--- 0! ditetapkan = 1 ---")
print("  0! =", faktorial(0), " (satu cara menyusun himpunan kosong)")
print("  1! =", faktorial(1))
print("  5! =", faktorial(5))
print("")

print("--- memilih 2 dari 5 orang ---")
print("  P(5,2) =", permutasi(5, 2), " ketua & wakil (urutan beda peran)")
print("  C(5,2) =", kombinasi(5, 2), " dua perwakilan (peran sama)")
print("  P dibagi 2! =", permutasi(5, 2) // faktorial(2),
      " -> sama dengan C")
print("")

print("--- membuktikan C(n,r) = C(n,n-r) ---")
for r in [2, 3, 7, 8]:
    print("  C(10," + str(r) + ") = " + str(kombinasi(10, r)).rjust(3) +
          "   C(10," + str(10 - r) + ") = " +
          str(kombinasi(10, 10 - r)).rjust(3))
print("  Setiap cara MEMILIH adalah juga cara MEMBUANG.")
print("")

print("--- faktorial tumbuh sangat cepat ---")
for n in [5, 10, 15, 20]:
    print("  " + str(n).rjust(2) + "! = " + format(faktorial(n), ","))


# ============================================
# Ruang kata sandi: n^r (projek kelompok)
# ============================================
print("")
print("=" * 58)
print("RUANG KATA SANDI  =  (jenis karakter) ^ (panjang)")
print("=" * 58)

himpunan = [
    ("huruf kecil saja",          26),
    ("huruf kecil + besar",       52),
    ("huruf + angka",             62),
    ("huruf + angka + simbol",    95),
]

print("")
print("panjang " + "".join(nama[:14].rjust(20) for nama, _ in himpunan))
for panjang in [6, 8, 10, 12]:
    baris = "  " + str(panjang).rjust(4) + "  "
    for _, n in himpunan:
        baris += format(n ** panjang, ".2e").rjust(20)
    print(baris)

print("")
print("--- mana yang lebih ampuh? ---")
dasar = 26 ** 8
print("  patokan   26^8  = " + format(dasar, ".3e"))
print("")
naik_jenis = 95 ** 8
naik_panjang = 26 ** 12
print("  naikkan JENIS  ke 95  -> 95^8  = " + format(naik_jenis, ".3e") +
      "   (" + format(naik_jenis / dasar, ",.0f") + "x)")
print("  naikkan PANJANG ke 12 -> 26^12 = " + format(naik_panjang, ".3e") +
      "   (" + format(naik_panjang / dasar, ",.0f") + "x)")
print("")
print("  Menambah 4 karakter mengalahkan menambah 69 jenis karakter.")
print("  Sebabnya: n di ALAS, r di PANGKAT.")


# ============================================
# Berapa lama menebaknya?
# ============================================
print("")
print("--- perkiraan waktu brute force ---")
print("  asumsi: 10 miliar tebakan per detik")
print("")
TEBAKAN = 10 ** 10

for nama, n in himpunan:
    for panjang in [8, 12]:
        detik = (n ** panjang) / TEBAKAN / 2      # rata-rata: separuh ruang
        if detik < 60:
            waktu = format(detik, ".1f") + " detik"
        elif detik < 3600:
            waktu = format(detik / 60, ".1f") + " menit"
        elif detik < 86400 * 365:
            waktu = format(detik / 86400, ".1f") + " hari"
        else:
            waktu = format(detik / (86400 * 365), ",.0f") + " tahun"
        print("  " + nama.ljust(24) + " panjang " + str(panjang).rjust(2) +
              " -> " + waktu)

print("")
print("  CATATAN: angka ini mengandaikan penyerang menebak")
print("  SEMBARANGAN. Penyerang sungguhan memakai kamus pola,")
print("  sehingga sandi berpola jebol JAUH lebih cepat.")`
  },

  output: `--- 0! ditetapkan = 1 ---
  0! = 1  (satu cara menyusun himpunan kosong)
  1! = 1
  5! = 120

--- memilih 2 dari 5 orang ---
  P(5,2) = 20  ketua & wakil (urutan beda peran)
  C(5,2) = 10  dua perwakilan (peran sama)
  P dibagi 2! = 10  -> sama dengan C

--- membuktikan C(n,r) = C(n,n-r) ---
  C(10,2) =  45   C(10,8) =  45
  C(10,3) = 120   C(10,7) = 120
  C(10,7) = 120   C(10,3) = 120
  C(10,8) =  45   C(10,2) =  45
  Setiap cara MEMILIH adalah juga cara MEMBUANG.

--- faktorial tumbuh sangat cepat ---
   5! = 120
  10! = 3,628,800
  15! = 1,307,674,368,000
  20! = 2,432,902,008,176,640,000

==========================================================
RUANG KATA SANDI  =  (jenis karakter) ^ (panjang)
==========================================================

panjang       huruf kecil sa      huruf kecil +        huruf + angka      huruf + angka 
     6              3.09e+08            1.98e+10            5.68e+10            7.35e+11
     8              2.09e+11            5.35e+13            2.18e+14            6.63e+15
    10              1.41e+14            1.45e+17            8.39e+17            5.99e+19
    12              9.54e+16            3.91e+20            3.23e+21            5.40e+23

--- mana yang lebih ampuh? ---
  patokan   26^8  = 2.088e+11

  naikkan JENIS  ke 95  -> 95^8  = 6.634e+15   (31,769x)
  naikkan PANJANG ke 12 -> 26^12 = 9.543e+16   (456,976x)

  Menambah 4 karakter mengalahkan menambah 69 jenis karakter.
  Sebabnya: n di ALAS, r di PANGKAT.`,

  kesalahanUmum: [
    {
      salah: 'Memakai permutasi untuk soal yang urutannya tidak berpengaruh, atau sebaliknya.',
      kenapa: 'Permutasi menghitung setiap kelompok sebanyak r kali faktorial, sehingga jawabannya berlipat dari yang seharusnya. Memilih tiga perwakilan dari sepuluh orang dijawab 720 padahal seharusnya 120. Kesalahan ini sulit disadari karena kedua rumus terlihat mirip dan sama-sama menghasilkan angka yang masuk akal.',
      benar: 'Ajukan satu pertanyaan penentu: apakah menukar urutannya menghasilkan hal yang berbeda? Kalau ya permutasi, kalau tidak kombinasi.'
    },
    {
      salah: 'Mengira 0! sama dengan 0.',
      kenapa: 'Nilainya ditetapkan 1, karena ada tepat satu cara menyusun himpunan kosong yaitu tidak menyusun apa-apa. Menganggapnya nol membuat rumus permutasi dan kombinasi menghasilkan pembagian dengan nol pada kasus tepi seperti C(n,n) dan P(n,n).',
      benar: 'Hafalkan 0! = 1. Periksa dengan C(5,5) yang seharusnya bernilai 1, yaitu satu cara memilih semuanya.'
    },
    {
      salah: 'Menghitung kombinasi dengan menghitung faktorial besar lebih dulu lalu membaginya.',
      kenapa: 'Faktorial tumbuh sangat cepat; 100 faktorial punya 158 digit dan menghabiskan waktu maupun memori tanpa perlu, padahal hasil akhirnya bisa jadi kecil. Pada bahasa dengan bilangan bulat berukuran tetap, ini juga menyebabkan luapan sehingga hasilnya salah total.',
      benar: 'Pakai bentuk yang mencoret lebih dulu, atau manfaatkan sifat C(n,r) = C(n,n-r) untuk memilih r yang lebih kecil. Di Python, math.comb sudah menanganinya.'
    },
    {
      salah: 'Menyimpulkan sandi aman semata-mata dari besarnya ruang n pangkat r.',
      kenapa: 'Perhitungan itu mengandaikan penyerang menebak sembarangan di seluruh ruang. Penyerang sungguhan memakai kamus pola dan daftar sandi bocor, sehingga sandi berpola seperti kata umum dengan huruf diganti angka jebol dalam hitungan detik meski ruang teoretisnya besar.',
      benar: 'Perlakukan n pangkat r sebagai batas atas, bukan jaminan. Syarat yang sesungguhnya adalah panjang dan tidak berpola.'
    },
    {
      salah: 'Menukar kaidah perkalian dengan kaidah penjumlahan.',
      kenapa: 'Perkalian dipakai kalau langkahnya dikerjakan berurutan dan keduanya harus terjadi, sedangkan penjumlahan dipakai kalau hanya salah satu yang dipilih. Menukarnya membuat jawaban meleset sangat jauh, misalnya menjawab 7 padahal seharusnya 12.',
      benar: 'Perhatikan kata penghubungnya. Kata dan berarti dikali, kata atau berarti ditambah.'
    }
  ],

  analogi: `Bayangkan lemari pakaian.

**Kaidah perkalian**: kamu punya 3 kemeja **dan** 4 celana. Berapa setelan yang mungkin? Untuk **setiap** kemeja, ada 4 pilihan celana. Jadi 3 × 4 = **12 setelan**.

**Kaidah penjumlahan**: kamu mau memakai **satu** benda saja, kemeja **atau** celana. Ada 3 + 4 = **7 pilihan**.

Kata penghubungnya yang menentukan: **"dan" dikali, "atau" ditambah**.

Sekarang **permutasi lawan kombinasi**, dengan gambaran lomba lari.

Ada 5 pelari, diambil 2. Tetapi **dua pertanyaan berbeda**:

- *"Siapa juara 1 dan juara 2?"* — Andi juara 1 dan Budi juara 2 **berbeda** dari kebalikannya. Urutan berarti. **Permutasi**, 20 kemungkinan.
- *"Siapa dua orang yang naik podium?"* — {Andi, Budi} sama saja bagaimanapun disebut. **Kombinasi**, 10 kemungkinan.

Perhatikan hubungannya: **setiap pasangan podium bisa disusun dalam 2 urutan juara.** Maka 20 dibagi 2 sama dengan 10. Itulah kenapa kombinasi adalah permutasi dibagi \`r!\`.

Terakhir, dan ini yang paling berguna: **kenapa panjang sandi mengalahkan simbol aneh?**

Bayangkan gembok kombinasi. Menambah **jenis karakter** seperti mengganti roda angka 0-9 dengan roda beraksara 95 lambang — tiap roda jadi jauh lebih sulit ditebak.

Menambah **panjang** seperti **menambah roda**.

Dan di situlah bedanya. Menambah satu roda **mengalikan** seluruh kemungkinan yang sudah ada. Gembok 8 roda beraksara 95 lambang punya 95⁸ kemungkinan. Tetapi gembok **12 roda** dengan cuma 26 huruf punya 26¹² — dan itu **lebih banyak**.

Menambah roda selalu menang, karena ia bekerja di **pangkat**, bukan di alas.`,

  latihan: [
    'Jelaskan perbedaan kaidah perkalian dan kaidah penjumlahan, lalu selesaikan: sebuah menu punya 4 makanan dan 3 minuman. Berapa cara memesan satu paket makanan dan minuman? Berapa cara memesan satu item saja?',
    'Hitung P(6,3) dan C(6,3), tunjukkan perhitungannya, lalu jelaskan kenapa hasilnya berbeda dengan faktor 3 faktorial.',
    'Untuk tiap soal, tentukan permutasi atau kombinasi beserta alasannya: menyusun PIN 4 digit, memilih 3 anggota panitia dari 12 orang, menentukan ketua dan bendahara dari 8 orang, memilih 5 kartu dari satu dek.',
    'Buktikan bahwa C(10,3) sama dengan C(10,7) dengan perhitungan, lalu jelaskan artinya dengan kalimatmu sendiri.',
    'Hitung ruang kata sandi untuk: 8 karakter huruf kecil saja, dan 12 karakter huruf kecil saja. Bandingkan keduanya dengan 8 karakter memakai 95 jenis karakter, lalu simpulkan mana yang paling kuat.',
    'Jelaskan kenapa perhitungan n pangkat r terlalu murah hati dalam menilai keamanan sandi nyata, dan sebutkan satu jenis serangan yang tidak diperhitungkannya.'
  ]
});

TOPICS.push({
  id: 'matdis-brute-force',
  judul: 'Brute Force & Ruang Pencarian',
  kategori: 'matematika-diskrit',
  tag: ['brute force', 'ruang pencarian', 'eksponensial', 'kompleksitas', 'heuristik'],
  ringkas: 'Algoritma paling sederhana yang selalu benar — dan kenapa itu sering tidak cukup.',

  fungsi: `**Menyelesaikan masalah dengan mencoba semua kemungkinan — dan tahu kapan cara itu boleh dipakai.**

Brute force sering diremehkan, padahal ia punya tempat yang jelas:

- **Jawaban acuan saat menguji** — algoritma cerdasmu dibandingkan dengan brute force pada data kecil, dan kalau hasilnya beda, yang cerdas itu yang salah
- **Masalah kecil yang tidak akan membesar** — menyusun jadwal 6 mata kuliah, memilih 4 dari 10 barang
- **Prototipe cepat** — jalan dulu, optimalkan kalau memang jadi lambat
- **Menembus enkripsi lemah** di Komputer Forensik, atau menguji kekuatan sandi

Yang lebih penting: brute force adalah **cara berpikir baku sebelum optimasi**. Kamu harus bisa menuliskan versi yang jelas benar lebih dulu, baru mencari yang cepat — karena tanpa pembanding, kamu tidak punya cara tahu apakah versi cepatmu benar.

Dan sebaliknya: kalau kamu **menghitung ruang pencariannya lebih dulu** dan hasilnya 10 pangkat 20, kamu menghemat berhari-hari dengan tidak menulisnya sama sekali.`,

  praktik: {
    tujuan: `Kamu punya satu skrip brute force yang benar, tahu berapa lama ia akan berjalan sebelum menjalankannya, dan bisa memakainya sebagai pembanding untuk algoritma yang lebih cerdas.`,
    alat: [
      'Python 3 dengan modul `itertools` dan `time` (keduanya bawaan)'
    ],
    langkah: [
      { judul: 'Tulis dulu ruang pencariannya sebagai kalimat',
        isi: `Sebelum menulis kode, tuliskan dalam satu kalimat: **apa yang sedang kamu coba semua kemungkinannya?**

Contoh: *"semua cara memilih 3 dari 12 mata kuliah"* atau *"semua susunan 5 kota yang dikunjungi berurutan"*.

Kalimat itu langsung memberitahumu rumus mana yang dipakai — kombinasi atau permutasi.` },
      { judul: 'Hitung ukurannya SEBELUM menulis perulangan',
        isi: `Pakai \`math.comb\` atau \`math.perm\` dari topik sebelumnya, lalu ubah jadi perkiraan waktu.

**Ini langkah yang paling sering dilewatkan**, dan yang paling banyak menyelamatkan waktu. Kalau hasilnya bertahun-tahun, berhenti di sini dan cari pendekatan lain.` },
      { judul: 'Bangkitkan kemungkinannya dengan itertools',
        isi: `Jangan menulis perulangan bersarang sendiri — \`itertools\` sudah menyediakannya dan tidak mungkin salah hitung:

- \`itertools.product(pilihan, repeat=r)\` — boleh diulang
- \`itertools.permutations(data, r)\` — urutan berpengaruh
- \`itertools.combinations(data, r)\` — urutan tidak berpengaruh

Ketiganya menghasilkan satu per satu, bukan sekaligus di memori, jadi aman untuk jumlah besar.` },
      { judul: 'Saring, jangan bangkitkan lalu buang',
        isi: `Kalau ada syarat yang bisa diperiksa **lebih awal**, periksa di situ dan hentikan cabangnya — bukan setelah kemungkinan lengkap terbentuk.

Ini disebut ***pruning***, dan pengaruhnya sering bukan beberapa persen melainkan **beberapa kali lipat**.

Contoh: kalau total berat sudah melebihi batas setelah barang ketiga, tidak perlu mencoba barang keempat sampai kesepuluh sama sekali.` },
      { judul: 'Ukur waktunya sungguhan',
        isi: `Bungkus dengan \`time.perf_counter()\` sebelum dan sesudah, lalu bandingkan dengan perkiraanmu di langkah kedua.

Kalau meleset jauh, perkiraanmu yang salah — dan itu penting diketahui sebelum kamu memakainya untuk memutuskan hal yang lebih besar.` },
      { judul: 'Simpan sebagai pembanding',
        isi: `Setelah benar, **jangan hapus**. Simpan brute force itu sebagai fungsi terpisah, misalnya \`jawaban_lambat()\`.

Ketika nanti kamu menulis versi cepat, jalankan keduanya pada data kecil acak sebanyak seratus kali dan bandingkan hasilnya.

Kalau ada satu saja yang berbeda, **yang cepat itu yang salah** — dan kamu menemukannya dalam hitungan detik, bukan setelah dipakai orang.` }
    ],
    cek: [
      `Perkiraan waktumu di langkah 2 dan waktu sungguhan di langkah 5 berada pada orde besaran yang sama`,
      `Versi dengan pruning memberi jawaban yang sama persis dengan versi tanpa pruning, hanya lebih cepat`,
      `Brute force dan algoritma cepatmu memberi hasil identik pada 100 data uji acak berukuran kecil`
    ]
  },
  judulLogicSyntax: 'Bedah Rumus — kenapa begitu',

  konsep: `
**Brute force** adalah pendekatan yang **mencoba semua kemungkinan** sampai ketemu jawabannya.

Landasan teori projek kelompokmu memuatnya secara khusus, karena ia yang menghubungkan hitungan kombinatorial dengan keamanan: **berapa banyak kemungkinan** menentukan **berapa lama menebaknya**.

**Sifatnya**

Brute force punya dua sifat yang berlawanan:

- **Selalu benar.** Kalau jawabannya ada di ruang pencarian, brute force **pasti** menemukannya. Tidak ada kasus yang terlewat.
- **Sering tidak praktis.** Waktunya tumbuh seiring besarnya ruang pencarian, dan ruang itu biasanya tumbuh eksponensial.

Karena selalu benar, ia berguna sebagai **pembanding kebenaran**: algoritma cerdas yang kamu tulis bisa diuji dengan membandingkan hasilnya terhadap brute force pada masukan kecil.

**Ruang pencarian**

**Ruang pencarian** adalah himpunan semua kemungkinan jawaban. Besarnya dihitung dengan kombinatorial — persis yang dibahas di topik sebelumnya.

- Kata sandi panjang \`r\` dari \`n\` jenis karakter → **\`n^r\`**
- Semua urutan \`n\` kota pada persoalan penjual keliling → **\`n!\`**
- Semua himpunan bagian dari \`n\` benda → **\`2^n\`**

Ketiganya tumbuh sangat cepat, dan itulah yang membuat brute force cepat mentok.

**Kenapa eksponensial itu mematikan**

Bandingkan pertumbuhannya untuk \`n\` yang naik satu:

- **Linear \`n\`** — bertambah 1
- **Kuadratik \`n²\`** — bertambah sekitar \`2n\`
- **Eksponensial \`2^n\`** — **berlipat dua**

Melipatgandakan kecepatan komputer hanya menambah **satu** ke ukuran persoalan yang bisa kamu tangani. Komputer sejuta kali lebih cepat cuma menambah sekitar **20**.

Inilah alasan mendasar kenapa masalah eksponensial **tidak bisa diselesaikan dengan menunggu perangkat keras membaik.** Kamu butuh algoritma yang lebih baik.

**Kaitannya dengan Big-O**

Kamu sudah bertemu notasi ini di Materi Pelengkap. Brute force pada ruang \`n^r\` berarti **O(n^r)**, dan pada permutasi berarti **O(n!)** — dua golongan terburuk yang lazim ditemui.

**Kapan brute force tetap pantas dipakai?**

Jangan menganggapnya selalu buruk. Ia pilihan yang benar ketika:

- **Ruang pencarian memang kecil** dan pasti tetap kecil
- **Kebenaran jauh lebih penting** daripada kecepatan
- Dipakai sebagai **pembanding** untuk menguji algoritma yang lebih rumit
- **Waktu menulisnya** lebih berharga daripada waktu berjalannya, misalnya skrip sekali pakai

Kesalahan yang sesungguhnya bukan memakai brute force, melainkan memakainya **tanpa menghitung dulu berapa besar ruangnya**.

**Alternatifnya**

Ketika ruang terlalu besar, ada beberapa arah:

- **Pemangkasan** (*pruning*) — buang cabang yang jelas tidak mungkin, misalnya *backtracking*
- **Pemrograman dinamis** — simpan hasil bagian yang berulang
- **Greedy** — ambil pilihan terbaik setempat, cepat tetapi tidak selalu optimal
- **Heuristik** — cari jawaban yang cukup baik, bukan yang terbaik
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Brute force: coba SEMUA kemungkinan\nfrom itertools import product\n\ndef tebak(sandi, karakter, panjang):\n    percobaan = 0\n    for gabungan in product(karakter, repeat=panjang):\n        percobaan += 1\n        if "".join(gabungan) == sandi:\n            return percobaan\n    return None\n\n# Ruangnya = len(karakter) ^ panjang\n# 26^4 =     456.976   -> sekejap\n# 26^8 = 208 miliar    -> berjam-jam\n# 26^12 = 9,5 x 10^16  -> ribuan tahun',
      penjelasan: `
Perhatikan bahwa **kodenya tidak berubah** seiring bertambahnya panjang sandi. Yang berubah cuma satu angka — dan waktunya meledak.

Inilah ciri khas persoalan eksponensial: **kesederhanaan kodenya menyembunyikan kemustahilannya.** Program tiga baris ini terlihat sama-sama masuk akal untuk panjang 4 maupun 12, padahal yang kedua tidak akan pernah selesai.

Perhatikan juga bahwa \`product(karakter, repeat=panjang)\` menghasilkan tepat \`n^r\` kombinasi — persis rumus dari topik sebelumnya. **Kombinatorial menghitungnya, brute force menjalaninya.**

Untuk perkiraan waktu, ada satu koreksi yang layak diingat: **rata-rata kamu menemukan jawabannya setelah menyisir separuh ruang**, bukan seluruhnya. Kadang beruntung di awal, kadang sial di akhir. Jadi perkiraan waktu yang wajar adalah \`n^r / kecepatan / 2\`.

Yang membuatnya menakutkan adalah **berapa cepat lompatannya**. Dari panjang 8 ke panjang 12 — cuma empat karakter — ruangnya mengalikan \`26⁴ = 456.976\`. Waktu yang tadinya berjam-jam menjadi ribuan tahun.

Dan sebaliknya: kalau kamu tahu sandinya **8 karakter huruf kecil**, kamu tahu itu bisa jebol. Itulah kenapa **panjang minimum** ada di setiap kebijakan sandi.

Satu catatan penting yang sering dilewatkan: perhitungan ini mengandaikan penyerang **menebak berurutan tanpa petunjuk**. Kalau ia punya **hash sandinya** dan bisa menebak secara luring, kecepatannya bisa miliaran per detik. Kalau ia harus mencoba lewat halaman login, sistem yang benar akan **membatasi percobaan** — dan brute force jadi mustahil berapa pun panjang sandinya.

Karena itu **pembatasan percobaan login** sering lebih ampuh daripada memaksa sandi rumit.
`
    },
    {
      bahasa: 'python',
      kode: '# Kenapa eksponensial tak bisa dikalahkan perangkat keras\n#\n# Persoalan 2^n, komputer sanggup 10^9 langkah/detik:\n#   n = 30  ->        1 detik\n#   n = 40  ->       18 menit\n#   n = 50  ->       13 hari\n#   n = 60  ->       36 tahun\n#\n# Komputer 1000x lebih cepat?\n#   n = 60  ->  13 hari  (bukan 36 tahun)\n#   tapi n = 70 kembali 36 tahun\n#\n# 1000x lebih cepat hanya menambah ~10 pada n',
      penjelasan: `
Inilah kesimpulan terpenting dari seluruh topik ini, dan ia berlaku jauh di luar soal kata sandi.

Untuk persoalan **eksponensial**, mempercepat komputer **hampir tidak menolong**. Alasannya matematis: menaikkan kecepatan sebanyak \`k\` kali hanya menambah \`log₂ k\` pada ukuran persoalan yang bisa kamu tangani.

- Komputer **2 kali** lebih cepat → tambah **1** pada \`n\`
- Komputer **1.000 kali** lebih cepat → tambah sekitar **10**
- Komputer **sejuta kali** lebih cepat → tambah sekitar **20**

Bandingkan dengan algoritma **polinomial**. Pada \`n²\`, komputer 1.000 kali lebih cepat memungkinkanmu menangani persoalan sekitar **32 kali lebih besar** — perbaikan yang sesungguhnya.

Ini menjelaskan sesuatu yang penting tentang bidangmu: **kemajuan terbesar dalam komputasi datang dari algoritma yang lebih baik, bukan dari perangkat keras yang lebih cepat.**

Persoalan pengurutan yang dulu \`O(n²)\` menjadi \`O(n log n)\` — dan lompatan itu jauh melampaui apa pun yang bisa diberikan Hukum Moore. Kamu sudah melihat buktinya di topik Sorting Lanjutan, di mana merge sort mengalahkan bubble sort ratusan kali lipat pada data yang sama.

Sisi baiknya: sifat inilah yang membuat **kriptografi bisa dipercaya**. Enkripsi modern dirancang supaya membobolnya butuh usaha eksponensial. Selama tidak ada yang menemukan jalan pintas algoritmis, menambah **beberapa bit** pada panjang kunci sudah cukup untuk mengalahkan seluruh kemajuan perangkat keras yang bisa dibayangkan.

Dan itu juga menjelaskan kenapa **komputer kuantum** menjadi perhatian besar di keamanan: ia menawarkan jalan pintas algoritmis untuk beberapa persoalan tertentu — bukan sekadar kecepatan yang lebih tinggi.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Brute force & ruang pencarian
# ============================================
import time
from itertools import product, permutations

# ---------- 1. Brute force sandi ----------
def tebak_sandi(sandi, karakter, panjang):
    percobaan = 0
    for gabungan in product(karakter, repeat=panjang):
        percobaan += 1
        if "".join(gabungan) == sandi:
            return percobaan
    return None

huruf = "abcdefghijklmnopqrstuvwxyz"

print("--- brute force sandi pendek ---")
for sandi in ["ab", "zzz", "hafi"]:
    mulai = time.perf_counter()
    n = tebak_sandi(sandi, huruf, len(sandi))
    lama = time.perf_counter() - mulai
    ruang = 26 ** len(sandi)
    print("  " + ("'" + sandi + "'").ljust(8) +
          " ruang " + format(ruang, ">10,") +
          "   ketemu pada percobaan ke-" + format(n, ">10,") +
          "   " + format(lama, ".3f") + " s")

print("")
print("  Perhatikan: kodenya SAMA, cuma panjangnya beda.")
print("  Kesederhanaan kode menyembunyikan kemustahilannya.")


# ---------- 2. Ruang pencarian tiga jenis ----------
print("")
print("--- tiga bentuk ruang pencarian ---")
print("  n      2^n (himpunan bagian)      n! (urutan)")
for n in [5, 10, 15, 20]:
    import math
    print("  " + str(n).rjust(2) + "   " +
          format(2 ** n, ">18,") + "   " +
          format(math.factorial(n), ">22,"))


# ---------- 3. Kenapa perangkat keras tidak menolong ----------
print("")
print("--- persoalan 2^n pada 10^9 langkah/detik ---")
KECEPATAN = 10 ** 9

def sebut_waktu(detik):
    if detik < 1:
        return format(detik, ".3f") + " detik"
    if detik < 60:
        return format(detik, ".1f") + " detik"
    if detik < 3600:
        return format(detik / 60, ".1f") + " menit"
    if detik < 86400:
        return format(detik / 3600, ".1f") + " jam"
    if detik < 86400 * 365:
        return format(detik / 86400, ".1f") + " hari"
    return format(detik / (86400 * 365), ",.0f") + " tahun"

for n in [20, 30, 40, 50, 60]:
    print("  n = " + str(n).rjust(2) + "  ->  " +
          sebut_waktu((2 ** n) / KECEPATAN))

print("")
print("--- komputer 1000x lebih cepat ---")
for n in [50, 60, 70]:
    lama = (2 ** n) / KECEPATAN
    cepat = (2 ** n) / (KECEPATAN * 1000)
    print("  n = " + str(n).rjust(2) +
          "   biasa: " + sebut_waktu(lama).rjust(16) +
          "   1000x: " + sebut_waktu(cepat).rjust(16))

print("")
print("  1000x lebih cepat hanya menambah ~10 pada n.")
print("  Untuk persoalan eksponensial, perangkat keras")
print("  TIDAK BISA mengejar. Yang dibutuhkan algoritma lebih baik.")


# ---------- 4. Brute force sebagai PEMBANDING kebenaran ----------
print("")
print("--- brute force sebagai penguji algoritma cerdas ---")

def maks_brute(daftar):
    """Coba semua pasangan: O(n^2), pasti benar."""
    terbaik = None
    for i in range(len(daftar)):
        for j in range(i + 1, len(daftar)):
            selisih = abs(daftar[i] - daftar[j])
            if terbaik is None or selisih > terbaik:
                terbaik = selisih
    return terbaik

def maks_cerdas(daftar):
    """Selisih terbesar = maks - min: O(n)."""
    return max(daftar) - min(daftar)

import random
random.seed(7)
cocok = True
for _ in range(200):
    uji = [random.randint(-50, 50) for _ in range(random.randint(2, 8))]
    if maks_brute(uji) != maks_cerdas(uji):
        cocok = False
        print("  BEDA pada", uji)
        break

print("  200 pengujian acak:", "SEMUA COCOK" if cocok else "ADA YANG BEDA")
print("  Inilah guna brute force yang sering dilupakan:")
print("  ia lambat, tapi PASTI benar -- jadi pembanding yang sempurna.")`
  },

  output: `--- brute force sandi pendek ---
  'ab'     ruang        676   ketemu pada percobaan ke-         2   0.000 s
  'zzz'    ruang     17,576   ketemu pada percobaan ke-    17,576   0.003 s
  'hafi'   ruang    456,976   ketemu pada percobaan ke-   123,171   0.027 s

  Perhatikan: kodenya SAMA, cuma panjangnya beda.
  Kesederhanaan kode menyembunyikan kemustahilannya.

--- tiga bentuk ruang pencarian ---
  n      2^n (himpunan bagian)      n! (urutan)
   5                   32                      120
  10                1,024                3,628,800
  15               32,768        1,307,674,368,000
  20            1,048,576   2,432,902,008,176,640,000

--- persoalan 2^n pada 10^9 langkah/detik ---
  n = 20  ->  0.001 detik
  n = 30  ->  1.1 detik
  n = 40  ->  18.3 menit
  n = 50  ->  13.0 hari
  n = 60  ->  37 tahun

--- komputer 1000x lebih cepat ---
  n = 50   biasa:        13.0 hari   1000x:       18.8 menit
  n = 60   biasa:         37 tahun   1000x:        13.3 hari
  n = 70   biasa:     37,436 tahun   1000x:         37 tahun

  1000x lebih cepat hanya menambah ~10 pada n.
  Untuk persoalan eksponensial, perangkat keras
  TIDAK BISA mengejar. Yang dibutuhkan algoritma lebih baik.

--- brute force sebagai penguji algoritma cerdas ---
  200 pengujian acak: SEMUA COCOK
  Inilah guna brute force yang sering dilupakan:
  ia lambat, tapi PASTI benar -- jadi pembanding yang sempurna.`,

  kesalahanUmum: [
    {
      salah: 'Menulis brute force tanpa menghitung dulu berapa besar ruang pencariannya.',
      kenapa: 'Kode brute force untuk ruang kecil dan ruang raksasa terlihat sama persis, sehingga tidak ada tanda peringatan saat menulisnya. Programnya dijalankan, terlihat berjalan normal, lalu ternyata butuh ribuan tahun. Kesederhanaan kodenya justru yang menyembunyikan kemustahilannya.',
      benar: 'Hitung dulu besar ruangnya dengan kombinatorial, bagi dengan kecepatan yang masuk akal, dan lihat berapa lama. Baru putuskan apakah brute force pantas dipakai.'
    },
    {
      salah: 'Menganggap brute force selalu pendekatan yang buruk.',
      kenapa: 'Brute force selalu benar dan cepat ditulis, sehingga ia pilihan tepat untuk ruang yang memang kecil, untuk skrip sekali pakai, dan yang paling sering dilupakan, sebagai pembanding untuk menguji kebenaran algoritma yang lebih rumit. Menolaknya secara mutlak membuat orang kehilangan alat pengujian yang paling andal.',
      benar: 'Nilai dari besar ruangnya dan tujuannya. Untuk menguji algoritma cerdas pada masukan kecil, brute force justru yang paling pantas dipercaya.'
    },
    {
      salah: 'Mengira persoalan eksponensial akan teratasi kalau komputernya lebih cepat.',
      kenapa: 'Menaikkan kecepatan sebanyak seribu kali hanya menambah sekitar sepuluh pada ukuran persoalan yang bisa ditangani, karena tambahannya sebesar logaritma dari kelipatan kecepatannya. Menunggu perangkat keras membaik tidak akan pernah cukup untuk persoalan yang tumbuh eksponensial.',
      benar: 'Cari algoritma yang lebih baik, atau turunkan tuntutannya dengan pemangkasan, pemrograman dinamis, atau heuristik yang menerima jawaban cukup baik.'
    },
    {
      salah: 'Memakai perkiraan waktu brute force sebagai jaminan keamanan sistem login.',
      kenapa: 'Perhitungan itu mengandaikan penyerang bisa menebak sebanyak-banyaknya tanpa hambatan. Pada sistem yang membatasi percobaan login, brute force jadi mustahil berapa pun sandinya. Sebaliknya kalau penyerang mencuri hash dan menebak secara luring, kecepatannya jauh lebih tinggi daripada dugaan.',
      benar: 'Bedakan serangan daring dan luring. Untuk daring, pembatasan percobaan lebih menentukan daripada kerumitan sandi. Untuk luring, panjang sandi dan fungsi hash yang lambat yang menentukan.'
    }
  ],

  analogi: `Bayangkan kamu kehilangan kunci di sebuah gedung, dan memutuskan **memeriksa setiap ruangan satu per satu**.

Itulah **brute force**. Dan perhatikan dua sifatnya:

- **Kamu pasti menemukannya**, kalau kuncinya memang ada di gedung itu. Tidak mungkin terlewat.
- **Berapa lama?** Bergantung pada berapa banyak ruangannya.

Untuk rumah 5 ruangan, ini cara yang **paling masuk akal** — memikirkan strategi cerdas justru buang waktu. Untuk gedung 50 lantai, ini sudah melelahkan. Untuk seluruh kota, ini mustahil.

Kesalahannya bukan memeriksa satu per satu. Kesalahannya **mulai memeriksa tanpa bertanya dulu ada berapa ruangan**.

Sekarang bagian yang paling penting: **kenapa berlari lebih cepat tidak menolong.**

Bayangkan kamu bisa berlari **dua kali lebih cepat**. Kamu bisa memeriksa gedung yang **satu lantai lebih tinggi** dalam waktu yang sama — karena tiap lantai tambahan **menggandakan** jumlah ruangan.

Berlari **seribu kali lebih cepat**? Kamu cuma bisa menambah **sepuluh lantai**.

Jadi kalau gedungnya bertambah dua puluh lantai, tidak ada kecepatan lari yang bisa mengejar. Yang kamu butuhkan bukan kaki yang lebih cepat, melainkan **denah gedung** — sesuatu yang memberitahumu ruangan mana yang **tidak perlu** diperiksa.

Itulah arti "algoritma yang lebih baik", dan itulah kenapa **kemajuan terbesar di komputasi datang dari cara berpikir, bukan dari mesin**.

Dan sisi baiknya: sifat inilah yang menjaga **gembok tetap aman**. Kalau membobolnya menuntut memeriksa seluruh kota, maka menambah **satu lantai lagi** sudah cukup untuk mengalahkan seluruh kemajuan kecepatan lari yang bisa dibayangkan.`,

  latihan: [
    'Jelaskan dua sifat brute force yang saling berlawanan, lalu sebutkan tiga keadaan di mana ia tetap pilihan yang tepat.',
    'Hitung besar ruang pencarian untuk: sandi 6 karakter dari 62 jenis, semua urutan 10 kota, dan semua himpunan bagian dari 20 benda.',
    'Sebuah persoalan berkompleksitas 2 pangkat n dan komputer sanggup satu miliar langkah per detik. Hitung waktunya untuk n = 40 dan n = 50, lalu jelaskan kenapa selisihnya sebesar itu.',
    'Jelaskan kenapa komputer seribu kali lebih cepat hanya menambah sekitar sepuluh pada ukuran persoalan eksponensial yang bisa ditangani. Tunjukkan perhitungannya.',
    'Tuliskan program brute force yang mencari sandi tiga huruf kecil, lalu perkirakan waktunya kalau panjangnya dinaikkan menjadi delapan.',
    'Jelaskan bagaimana brute force bisa dipakai untuk menguji kebenaran algoritma yang lebih cepat. Beri satu contoh pasangan algoritma yang cocok diuji begitu.'
  ]
});


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (lima topik di bawah).

   Dua topik pertama berkas ini (kombinatorial & brute force)
   berasal dari projek kuliah sendiri. Lima topik berikutnya
   disusun dari RPS Matematika Diskrit sebuah kampus lain
   (16 pekan) yang urutannya: logika matematika, aljabar
   Boolean, kombinatorika, teori graf, teori pohon, dan metode
   antrian -- ditambah pengetahuan umum untuk induksi
   matematika, relasi rekurens, dan teori bilangan yang lazim
   ada di silabus mata kuliah ini.

   Yang TIDAK diulang di sini karena sudah dibahas di tempat
   lain: proposisi, tabel kebenaran, tautologi, ekuivalensi,
   konvers/invers/kontraposisi, inferensi, kuantor, dan
   himpunan semuanya ada di Logika Informatika; struktur data
   graf beserta BFS/DFS dan pohon biner pencarian ada di
   Struktur Data; Dijkstra dan Big-O ada di Materi Pelengkap;
   antrean sebagai struktur data ada di Struktur Data, dan
   hukum Little ada di Manajemen Proyek Informatika.
   ------------------------------------------------------------ */

TOPICS.push({
  id: 'matdis-aljabar-boolean',
  judul: 'Aljabar Boolean & Penyederhanaan Ekspresi',
  kategori: 'matematika-diskrit',
  tag: ['aljabar Boolean', 'fungsi Boolean', 'SOP', 'minterm', 'penyederhanaan', 'de Morgan', 'dualitas'],
  ringkas: 'Lima suku dan lima belas literal disederhanakan menjadi dua suku dan tiga literal — fungsinya sama persis.',

  fungsi: `**Menyederhanakan syarat logika sampai bentuk terpendek yang masih berperilaku sama.**

Terpakai di:

- **Menulis kondisi \`if\`** yang bercabang banyak — hampir setiap syarat berlapis di kode bisa dipendekkan, dan bentuk pendeknya lebih sulit ditulis salah
- **Menegasikan syarat gabungan** dengan benar lewat de Morgan — kekeliruan di sini menghasilkan bug yang kodenya tetap terbaca wajar
- **Merancang rangkaian digital** — gerbang yang tidak perlu berarti transistor, daya, dan panas yang tidak perlu
- **Menyusun klausa \`WHERE\`** di SQL, dan filter di alat apa pun yang punya AND/OR/NOT
- **Menurunkan ekspresi DARI tabel kebenaran** ketika yang diketahui cuma perilaku yang diinginkan

Yang paling sering luput: **satu fungsi punya tak terhingga banyak cara dituliskan.** \`ab + ab'c\`, \`a(b + c)\`, dan \`ab + ac\` adalah tulisan berbeda untuk fungsi yang sama persis — dan memilih yang terpendek adalah seluruh isi bab ini.

Dan satu kebiasaan yang menyelamatkan: **uji hasil penyederhanaanmu terhadap seluruh baris tabel kebenaran.** Penyederhanaan dengan tangan sangat mudah salah, dan salahnya tidak kelihatan dari bentuk akhirnya.`,
  praktik: {
    tujuan: 'Kamu bisa menurunkan ekspresi dari tabel kebenaran, menyederhanakannya dengan penggabungan suku, lalu membuktikan hasilnya benar dengan memeriksa seluruh baris — bukan dengan merasa yakin.',
    alat: ['Python untuk membangkitkan tabel kebenaran', 'Satu potongan kode nyata yang syarat \`if\`-nya berlapis', 'Kertas untuk K-map bila ingin cara manual'],
    langkah: [
      { judul: 'Tulis dulu tabel kebenaran yang kamu INGINKAN',
        isi: `Sebelum menyusun ekspresi, tetapkan keluaran yang benar untuk setiap kombinasi masukan.

Ini terbalik dari kebiasaan banyak orang, yang langsung menulis syarat lalu menebak-nebak perilakunya. Tabelnya yang jadi acuan; ekspresinya cuma cara menuliskannya.` },
      { judul: 'Turunkan bentuk SOP secara mekanis',
        isi: `Ambil setiap baris yang bernilai 1, tulis perkalian seluruh peubahnya, beri aksen pada peubah yang bernilai 0, lalu jumlahkan semuanya.

Langkah ini tidak butuh kepintaran sama sekali — dan itu justru gunanya. Ia menjamin **setiap** fungsi punya ekspresi, jadi kamu tidak akan pernah terjebak berpikir tidak ada rumusnya.` },
      { judul: 'Gabungkan suku yang beda tepat satu peubah',
        isi: `Kaidahnya cuma satu: \`xy + xy' = x\`. Kalau dua suku beda tepat satu peubah, gabungkan dan **buang** peubah yang berbeda itu.

Ulangi sampai tidak ada lagi yang bisa digabung. Ini inti Quine-McCluskey, dan juga apa yang sebenarnya kamu lakukan saat mengelompokkan kotak di K-map.` },
      { judul: 'Hitung literalnya sebelum dan sesudah',
        isi: `Jangan cuma merasa lebih pendek — hitung jumlah suku dan jumlah literalnya.

Angka itu yang bisa dibandingkan, dan angka itu juga yang menentukan jumlah gerbang bila rangkaiannya dibuat.` },
      { judul: 'Uji hasilnya terhadap SELURUH baris',
        isi: `Bangkitkan seluruh \`2^n\` kombinasi, hitung nilai bentuk lama dan bentuk baru, lalu bandingkan.

Untuk 3 peubah cuma 8 baris; untuk 5 peubah 32. Memeriksa semuanya jauh lebih murah daripada menemukan kesalahannya nanti di sistem yang sudah jalan.` },
      { judul: 'Pakai de Morgan untuk menegasikan syarat gabungan',
        isi: `\`(a + b)' = a'b'\` dan \`(ab)' = a' + b'\`.

Perhatikan bahwa penghubungnya **ikut berubah**. Menegasikan tiap bagian tanpa mengubah penghubungnya adalah kekeliruan paling umum, dan hasilnya kode yang tetap terbaca wajar tetapi artinya berbeda.` },
      { judul: 'Pakai dualitas untuk memeriksa ingatanmu',
        isi: `Tukar \`+\` dengan \`.\` dan tukar 0 dengan 1 — peubahnya jangan diubah. Yang keluar adalah hukum yang juga benar.

Jadi kamu cukup mengingat separuh daftar hukum, dan separuh lainnya bisa diturunkan saat dibutuhkan.` },
      { judul: 'Terapkan pada satu syarat nyata di kodemu',
        isi: `Cari satu \`if\` dengan tiga atau lebih kondisi bersarang, tulis tabel kebenarannya, sederhanakan, lalu ganti.

Lalu jalankan ujimu. Kalau ada uji yang gagal, kamu baru saja menemukan bahwa perilaku kode lamamu berbeda dari yang kamu kira — dan itu temuan yang berharga.` }
    ],
    cek: [
      'Kamu menulis tabel kebenaran sebelum menulis ekspresinya',
      'Hasil penyederhanaanmu diuji terhadap seluruh baris, bukan sebagian',
      'Kamu bisa menegasikan syarat gabungan tanpa keliru mengubah penghubungnya',
      'Kamu bisa menyebut jumlah suku dan literal sebelum dan sesudah penyederhanaan'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — dari tabel kebenaran ke bentuk terpendek',

  konsep: `Aljabar Boolean adalah aljabar yang peubahnya cuma punya dua nilai. Kelihatannya lebih sederhana daripada aljabar biasa, dan dalam satu hal memang: tidak ada bilangan pecahan, tidak ada tak hingga, dan setiap pernyataan bisa diperiksa dengan mencoba semua kemungkinan.

Justru karena itu ia jadi tempat yang bagus untuk belajar membedakan **fungsi** dari **cara menuliskannya** — pembedaan yang berlaku jauh di luar bab ini.

**Berapa banyak fungsi yang mungkin**

| n peubah | Baris tabel | Jumlah fungsi |
|---|---|---|
| 1 | 2 | 4 |
| 2 | 4 | 16 |
| 3 | 8 | 256 |
| 4 | 16 | 65.536 |
| 5 | 32 | 4.294.967.296 |

Rumusnya \`2^(2^n)\`: tabelnya punya \`2^n\` baris, dan tiap baris boleh diisi 0 atau 1 secara bebas.

Lima peubah sudah memberi lebih dari empat miliar fungsi berbeda. Itu sebabnya mencari bentuk paling sederhana **tidak bisa dengan mencoba semua bentuk** — harus ada kaidah yang mengarahkan.

**Satu fungsi, banyak ekspresi**

Ketiga tulisan ini berperilaku sama persis di seluruh delapan baris:

- \`E1 = ab + ab'c\`
- \`E2 = a(b + c)\`
- \`E3 = ab + ac\`

Ini pembedaan yang paling menentukan di seluruh bab: **fungsinya satu, ekspresinya tak terhitung.** Dan penyederhanaan bukan mengubah fungsinya — ia mencari tulisan terpendek untuk fungsi yang sama.

**Dari tabel kebenaran ke ekspresi**

Prosedurnya mekanis, dan tidak butuh kepintaran:

1. ambil tiap baris yang bernilai **1**
2. tulis perkalian seluruh peubahnya
3. beri **aksen** pada peubah yang bernilai 0
4. jumlahkan semuanya

Hasilnya disebut **SOP** (sum of products) atau bentuk normal disjungtif. Untuk contoh di program bawah, ia memberi:

\`a'b'c + a'bc + ab'c + abc' + abc\`

Lima suku, lima belas literal.

Yang penting dari prosedur ini bukan hasilnya, melainkan jaminannya: **setiap fungsi Boolean pasti punya ekspresi.** Jadi pertanyaannya tidak pernah "ada rumusnya atau tidak", melainkan "seberapa panjang".

**Menyederhanakan: satu kaidah saja**

\`xy + xy' = x\`

Dua suku yang beda **tepat satu** peubah bisa digabung, dan peubah yang berbeda itu **hilang** — karena kedua nilainya sama saja bagi hasilnya.

Diterapkan berulang pada contoh di atas:

- putaran 1: \`a'b'c, a'bc, ab'c, abc', abc\`
- putaran 2: \`b'c, bc, a'c, ac, ab\`
- putaran 3: \`c, ab\`

Hasil akhir: \`c + ab\`

| Bentuk | Suku | Literal |
|---|---|---|
| SOP penuh | 5 | 15 |
| disederhanakan | 2 | 3 |

Lima belas literal menjadi tiga. Dan ini kaidah yang sama yang dipakai K-map — mengelompokkan kotak yang berdampingan **adalah** menggabungkan suku yang beda satu peubah, cuma disajikan sebagai gambar.

**Verifikasi bukan pilihan**

Penyederhanaan dengan tangan sangat mudah salah, dan salahnya **tidak kelihatan** dari bentuk akhirnya — hasil yang salah tetap terlihat seperti hasil yang rapi.

Karena itu langkah terakhirnya selalu: hitung nilai bentuk lama dan bentuk baru untuk **seluruh** \`2^n\` baris, lalu bandingkan. Untuk 3 peubah itu 8 baris. Biayanya hampir nol; harga tidak melakukannya bisa besar.

**Kenapa ini bukan latihan aljabar belaka**

| Bentuk | AND | OR | NOT | Total gerbang |
|---|---|---|---|---|
| SOP penuh | 5 | 1 | 5 | 11 |
| disederhanakan | 1 | 1 | 0 | 2 |

Selisihnya kelihatan kecil pada contoh 3 peubah. Tetapi rangkaian nyata punya puluhan peubah, dan gerbangnya digandakan miliaran kali di dalam satu cip.

Satu suku yang bisa dihapus berarti transistor yang tidak perlu dibuat, daya yang tidak perlu dipakai, dan panas yang tidak perlu dibuang.

**Prinsip dualitas**

| Hukum | Dualnya |
|---|---|
| \`a + 0 = a\` | \`a . 1 = a\` |
| \`a + 1 = 1\` | \`a . 0 = 0\` |
| \`a + a = a\` | \`a . a = a\` |
| \`a + a' = 1\` | \`a . a' = 0\` |
| \`a + ab = a\` | \`a(a + b) = a\` |
| \`(a + b)' = a'b'\` | \`(ab)' = a' + b'\` |

Cara membuat dual: tukar \`+\` dengan \`.\`, dan tukar 0 dengan 1. **Peubahnya tidak diubah.**

Dan ini bukan kebetulan yang rapi. Kalau sebuah hukum terbukti benar, dualnya **otomatis** benar — karena aksioma aljabar Boolean sendiri berpasangan dual.

Akibat praktisnya: kamu cukup mengingat separuh daftar hukum.

**De Morgan, dan bug yang dihasilkannya**

Baris terakhir tabel di atas yang paling sering dipakai di kode, bukan di rangkaian:

\`not (a and b)\` sama dengan \`(not a) or (not b)\`

Kekeliruan yang lazim: menegasikan syarat gabungan dengan cuma menegasikan tiap bagiannya dan **membiarkan penghubungnya**.

\`not (umur >= 17 and punya_ktp)\` **bukan** \`umur < 17 and not punya_ktp\`.

Yang benar: \`umur < 17 or not punya_ktp\`.

Bug seperti ini sulit ditemukan karena kodenya tetap terbaca wajar, dan karena ia cuma salah untuk sebagian masukan — misalnya orang berumur 20 yang tidak punya KTP.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "# SATU FUNGSI, TIGA TULISAN\n#\n#   E1 = ab + ab'c\n#   E2 = a(b + c)\n#   E3 = ab + ac\n#\n#   a b c   E1  E2  E3\n#   0 0 0    0   0   0\n#   0 0 1    0   0   0\n#   0 1 0    0   0   0\n#   0 1 1    0   0   0\n#   1 0 0    0   0   0\n#   1 0 1    1   1   1\n#   1 1 0    1   1   1\n#   1 1 1    1   1   1\n#\n# Cocok di SELURUH 8 baris.\n# Fungsinya satu; cara menuliskannya tak terhitung.",
      penjelasan: `Tabel yang kelihatan seperti latihan mengisi kotak. Ia sebenarnya menetapkan pembedaan yang jadi dasar seluruh bab, dan yang berlaku jauh di luar aljabar Boolean.

Mulai dari pertanyaan yang sering tidak diajukan: **apa sebenarnya sebuah fungsi Boolean itu?**

Naluri menjawab: rumusnya. \`ab + ab'c\` adalah fungsinya.

Tabel di atas menunjukkan jawaban itu salah. Tiga rumus yang tampak sangat berbeda menghasilkan kolom yang **identik di seluruh delapan baris**. Kalau ketiganya berperilaku sama untuk setiap masukan yang mungkin, tidak ada percobaan apa pun yang bisa membedakannya.

Jadi fungsinya bukan rumusnya. **Fungsinya adalah tabelnya** — pemetaan dari masukan ke keluaran. Rumus cuma salah satu cara menuliskan pemetaan itu.

Sekarang perhatikan berapa banyak cara menuliskannya. Kamu bisa menambahkan \`+ abc\` ke \`E3\` dan hasilnya tidak berubah, karena \`abc\` sudah tercakup di \`ab\`. Kamu bisa mengalikan dengan \`(b + b')\` yang bernilai 1. Kamu bisa terus melakukannya selamanya.

Jadi ekspresinya **tak terhingga banyaknya**, sementara fungsinya satu.

Dan dari situ pertanyaan penyederhanaan jadi bisa dirumuskan dengan tepat: bukan "bagaimana membuat ini lebih rapi", melainkan **"di antara semua ekspresi yang tabelnya sama, mana yang terpendek?"**

Sekarang kenapa pembedaan ini penting di luar bab ini.

**Pada pengujian perangkat lunak**, dua implementasi yang berbeda dianggap setara kalau perilakunya sama untuk seluruh masukan. Yang diuji perilakunya, bukan kodenya — dan itu pembedaan yang sama persis.

**Pada refaktor**, yang kamu jaga tetap adalah perilakunya sementara tulisannya berubah. Uji yang baik adalah tabel kebenaran versi besar: ia mengunci perilaku sehingga tulisannya bebas diubah.

**Pada basis data**, satu kueri bisa ditulis dengan \`JOIN\` atau dengan subkueri, dan pengoptimalnya bebas memilih rencana mana pun yang hasilnya sama. Seluruh bidang optimasi kueri berdiri di atas pembedaan ini.

Terakhir, satu hal yang membuat aljabar Boolean istimewa dibanding aljabar biasa: **kesetaraan dua ekspresi selalu bisa dibuktikan dengan mencoba semua kemungkinan.**

Untuk 3 peubah cukup 8 baris. Untuk 10 peubah 1.024 baris — masih sepele bagi komputer.

Pada aljabar bilangan real, kamu tidak bisa membuktikan \`(a+b)^2 = a^2 + 2ab + b^2\` dengan mencoba semua nilai, karena nilainya tak berhingga. Di sini kamu bisa.

Itu bukan sifat kecil. Ia berarti setiap penyederhanaan yang kamu lakukan bisa **diverifikasi mutlak**, bukan cuma diyakini — dan hampir tidak ada bidang matematika lain yang memberi kenyamanan seperti itu.`
    },
    {
      bahasa: 'python',
      kode: "# xy + xy' = x     <- satu-satunya kaidah yang dipakai\n#\n# putaran 1 : a'b'c, a'bc, ab'c, abc', abc\n# putaran 2 : b'c, bc, a'c, ac, ab\n# putaran 3 : c, ab\n#\n# hasil : c + ab\n#\n#   bentuk           suku  literal  gerbang\n#   SOP penuh           5       15       11\n#   disederhanakan      2        3        2\n#\n# Lalu WAJIB: uji ulang seluruh 8 baris.\n# ketidakcocokan: 0",
      penjelasan: `Tiga putaran penggabungan, satu kaidah, dan lima belas literal menjadi tiga.

Mulai dari kaidahnya, karena seluruh bab bergantung padanya: \`xy + xy' = x\`.

Bacanya begini. \`xy\` bernilai 1 kalau x=1 dan y=1. \`xy'\` bernilai 1 kalau x=1 dan y=0. Jumlahnya bernilai 1 kalau x=1 dan y **apa pun** — dan "y apa pun" berarti y tidak berperan sama sekali.

Jadi y bisa dibuang. Bukan disederhanakan, bukan diperkirakan — **dibuang**, tanpa mengubah satu pun baris tabelnya.

Sekarang perhatikan cara kerjanya di tabel. Putaran 1 punya lima suku berisi tiga literal. Putaran 2 punya lima suku berisi **dua** literal. Putaran 3 tinggal dua suku, satu di antaranya cuma satu literal.

Tiap putaran membuang satu literal dari suku yang bisa dipasangkan. Dan proses ini berhenti sendiri: kalau tidak ada lagi pasangan yang beda tepat satu posisi, tidak ada lagi yang bisa dibuang.

Perhatikan juga bahwa jumlah suku sempat **tidak turun** dari putaran 1 ke 2 — tetap lima. Yang turun panjang tiap sukunya. Penyederhanaan tidak selalu terlihat maju di setiap langkah, dan berhenti terlalu cepat karena merasa mandek adalah kesalahan yang lazim.

**Sekarang hubungannya dengan K-map**, karena banyak orang belajar keduanya sebagai dua hal yang terpisah.

K-map menyusun baris tabel kebenaran dalam kisi, dengan urutan yang diatur supaya kotak yang **berdampingan** berbeda tepat satu peubah. Lalu kamu mengelompokkan kotak bernilai 1 yang berdampingan.

Mengelompokkan dua kotak berdampingan **adalah** menerapkan \`xy + xy' = x\`. Mengelompokkan empat kotak adalah menerapkannya dua kali. Tidak ada kaidah baru sama sekali — K-map cuma menyajikan kaidah yang sama dalam bentuk yang bisa dilihat mata.

Karena itu K-map berguna sampai 4 peubah dan berhenti berguna sesudahnya: pada 5 peubah kisinya harus bertingkat, dan "berdampingan" tidak lagi bisa dilihat sekali pandang. Kaidahnya masih berlaku; yang gagal cuma penyajian visualnya.

**Sekarang baris terakhir kode, dan ini yang paling sering dilewati.**

Setelah menyederhanakan, kedua bentuk diuji ulang untuk **seluruh** delapan baris, dan ketidakcocokannya nol.

Kenapa ini tidak boleh dilewati: kesalahan dalam penyederhanaan **tidak meninggalkan jejak**. Kalau kamu keliru menggabungkan dua suku yang sebenarnya beda dua posisi, hasilnya tetap berupa ekspresi yang pendek dan rapi. Tidak ada tanda apa pun bahwa fungsinya sudah berubah.

Dan perubahannya biasanya cuma memengaruhi **satu atau dua baris** dari delapan. Kalau bentuk itu dipakai di rangkaian atau di kode, ia akan bekerja benar hampir selalu, dan salah pada kombinasi masukan tertentu yang mungkin jarang muncul.

Itu bentuk bug yang paling mahal: yang jarang muncul, tidak punya pola yang jelas, dan sumbernya ada di penyederhanaan yang dilakukan berbulan sebelumnya.

Biaya menghindarinya: delapan baris pemeriksaan, beberapa detik.

Terakhir, kolom gerbang. Sebelas gerbang menjadi dua. Untuk satu rangkaian di papan percobaan, itu selisih beberapa cip. Untuk satu blok yang digandakan sejuta kali di dalam prosesor, itu selisih yang menentukan apakah cipnya bisa dibuat sama sekali.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Aljabar Boolean: fungsi, ekspresi, penyederhanaan
# ============================================
import itertools

# --------------------------------------------
# 1. Berapa banyak fungsi Boolean yang mungkin
# --------------------------------------------
print("--- berapa fungsi Boolean untuk n peubah? ---")
print("  " + "n".rjust(4) + "baris tabel".rjust(14)
      + "jumlah fungsi".rjust(26))
for n in range(1, 6):
    baris = 2 ** n
    fungsi = 2 ** baris
    print("  " + str(n).rjust(4) + str(baris).rjust(14)
          + f"{fungsi:>26,}".replace(",", "."))
print("")
print("  Rumusnya 2^(2^n): tabel kebenarannya punya 2^n baris,")
print("  dan tiap baris boleh diisi 0 atau 1 secara bebas.")
print("")
print("  Perhatikan lompatannya. Lima peubah sudah memberi lebih")
print("  dari empat MILIAR fungsi berbeda. Itu sebabnya mencari")
print("  bentuk paling sederhana tidak bisa dengan mencoba semua.")

# --------------------------------------------
# 2. Satu fungsi, banyak ekspresi
# --------------------------------------------
print("")
print("--- ekspresi berbeda, fungsi SAMA ---")
def f1(a, b, c):
    return (a and b) or (a and not b and c)

def f2(a, b, c):
    return a and (b or c)

def f3(a, b, c):
    return (a and b) or (a and c)

print("  E1 = ab + ab'c")
print("  E2 = a(b + c)")
print("  E3 = ab + ac")
print("")
print("  " + "a b c".ljust(9) + "E1".rjust(4) + "E2".rjust(4)
      + "E3".rjust(4))
cocok = True
for a, b, c in itertools.product([0, 1], repeat=3):
    v1, v2, v3 = f1(a, b, c), f2(a, b, c), f3(a, b, c)
    if not (int(v1) == int(v2) == int(v3)):
        cocok = False
    print("  " + (str(a) + " " + str(b) + " " + str(c)).ljust(9)
          + str(int(v1)).rjust(4) + str(int(v2)).rjust(4)
          + str(int(v3)).rjust(4))
print("")
print("  Ketiganya cocok di seluruh 8 baris: "
      + ("YA" if cocok else "TIDAK"))
print("")
print("  Ini bedanya EKSPRESI dan FUNGSI. Fungsinya satu; cara")
print("  menuliskannya tak terhitung banyaknya.")
print("")
print("  Dan itulah gunanya penyederhanaan: mencari tulisan")
print("  TERPENDEK untuk fungsi yang sama, karena tulisan yang")
print("  lebih pendek berarti rangkaian yang lebih murah.")

# --------------------------------------------
# 3. Dari tabel kebenaran ke bentuk SOP
# --------------------------------------------
print("")
print("--- menyusun ekspresi DARI tabel kebenaran (SOP) ---")
# fungsi sasaran ditentukan oleh tabelnya, bukan oleh rumus
SASARAN = {
    (0, 0, 0): 0, (0, 0, 1): 1, (0, 1, 0): 0, (0, 1, 1): 1,
    (1, 0, 0): 0, (1, 0, 1): 1, (1, 1, 0): 1, (1, 1, 1): 1,
}
NAMA = "abc"

def suku(baris):
    """Satu minterm: peubah bernilai 0 diberi tanda aksen."""
    return "".join(NAMA[i] + ("'" if v == 0 else "")
                   for i, v in enumerate(baris))

minterm = [b for b, v in SASARAN.items() if v == 1]
sop = " + ".join(suku(b) for b in minterm)
print("  " + "a b c".ljust(9) + "f".rjust(3) + "   minterm")
for b in sorted(SASARAN):
    tanda = suku(b) if SASARAN[b] == 1 else "-"
    print("  " + " ".join(map(str, b)).ljust(9)
          + str(SASARAN[b]).rjust(3) + "   " + tanda)
print("")
print("  SOP  = " + sop)
print("  suku : " + str(len(minterm)) + "   literal : "
      + str(sum(len(suku(b).replace("'", "")) for b in minterm)))
print("")
print("  Caranya mekanis: ambil tiap baris yang bernilai 1, tulis")
print("  perkalian seluruh peubahnya, beri aksen yang bernilai 0,")
print("  lalu jumlahkan semuanya.")
print("")
print("  Jadi SETIAP fungsi Boolean pasti punya ekspresi. Yang")
print("  jadi soal bukan ADA atau tidak, melainkan seberapa")
print("  panjang -- dan bentuk ini hampir selalu belum yang")
print("  terpendek.")

# --------------------------------------------
# 4. Penyederhanaan dengan penggabungan suku
# --------------------------------------------
print("")
print("--- menggabungkan suku yang beda SATU peubah ---")
def gabung(x, y):
    """Kalau beda tepat satu posisi, ganti posisi itu jadi '-'."""
    beda = [i for i in range(len(x)) if x[i] != y[i]]
    if len(beda) != 1:
        return None
    z = list(x)
    z[beda[0]] = '-'
    return tuple(z)

def tulis(suku_t):
    if all(v == '-' for v in suku_t):
        return "1"
    return "".join(NAMA[i] + ("'" if v == 0 else "")
                   for i, v in enumerate(suku_t) if v != '-')

kini = [tuple(b) for b in minterm]
putaran = 0
while True:
    putaran += 1
    baru, terpakai = set(), set()
    for i in range(len(kini)):
        for j in range(i + 1, len(kini)):
            g = gabung(kini[i], kini[j])
            if g is not None:
                baru.add(g)
                terpakai.add(kini[i])
                terpakai.add(kini[j])
    sisa = [s for s in kini if s not in terpakai]
    print("  putaran " + str(putaran) + " : "
          + ", ".join(tulis(s) for s in kini))
    if not baru:
        break
    urut = lambda t: tuple(str(v) for v in t)
    kini = sorted(set(sisa) | baru, key=urut)
print("")
hasil = " + ".join(tulis(s) for s in kini)
literal_awal = sum(len(suku(b).replace("'", "")) for b in minterm)
literal_akhir = sum(sum(1 for v in s if v != '-') for s in kini)
print("  hasil : " + hasil)
print("")
print("  " + "bentuk".ljust(14) + "suku".rjust(6) + "literal".rjust(9))
print("  " + "SOP penuh".ljust(14) + str(len(minterm)).rjust(6)
      + str(literal_awal).rjust(9))
print("  " + "disederhanakan".ljust(14) + str(len(kini)).rjust(6)
      + str(literal_akhir).rjust(9))
print("")
print("  Kaidah yang dipakai cuma satu: xy + xy' = x. Dua suku")
print("  yang beda tepat satu peubah bisa digabung, dan peubah")
print("  yang berbeda itu HILANG -- karena kedua nilainya sama")
print("  saja bagi hasilnya.")

# --------------------------------------------
# 5. Buktikan hasilnya benar, jangan diandaikan
# --------------------------------------------
print("")
print("--- verifikasi: uji SELURUH baris ---")
def nilai(suku_t, baris):
    return all(baris[i] == v for i, v in enumerate(suku_t)
               if v != '-')

def sederhana(baris):
    return int(any(nilai(s, baris) for s in kini))

def penuh(baris):
    return int(any(nilai(tuple(m), baris) for m in minterm))

salah = 0
for baris in itertools.product([0, 1], repeat=3):
    a, b, c = SASARAN[baris], penuh(baris), sederhana(baris)
    if not (a == b == c):
        salah += 1
        print("  BEDA di " + str(baris))
print("  8 baris diperiksa, ketidakcocokan: " + str(salah))
print("")
print("  Ini langkah yang tidak boleh dilewati. Penyederhanaan")
print("  dikerjakan dengan tangan sangat mudah salah, dan")
print("  salahnya TIDAK KELIHATAN dari bentuk akhirnya.")
print("")
print("  Untuk 3 peubah cuma 8 baris. Memeriksa semuanya jauh")
print("  lebih murah daripada mencari kesalahan nanti di")
print("  rangkaian yang sudah dipasang.")

# --------------------------------------------
# 6. Kenapa penyederhanaan itu uang
# --------------------------------------------
print("")
print("--- biaya rangkaian: sebelum vs sesudah ---")
def biaya(daftar):
    """Gerbang AND per suku (kalau >1 literal) + satu OR + NOT."""
    n_and = sum(1 for s in daftar
                if sum(1 for v in s if v != '-') > 1)
    n_or = 1 if len(daftar) > 1 else 0
    n_not = sum(1 for s in daftar for v in s if v == 0)
    return n_and, n_or, n_not

for nama, daftar in (("SOP penuh", [tuple(m) for m in minterm]),
                     ("disederhanakan", kini)):
    a, o, n = biaya(daftar)
    print("  " + nama.ljust(16) + "AND " + str(a)
          + "   OR " + str(o) + "   NOT " + str(n)
          + "   total " + str(a + o + n))
print("")
print("  Selisihnya kelihatan kecil di contoh 3 peubah. Tapi")
print("  rangkaian nyata punya puluhan peubah, dan gerbangnya")
print("  digandakan miliaran kali di dalam satu cip.")
print("")
print("  Di situlah aljabar Boolean berhenti jadi latihan")
print("  aljabar: satu suku yang bisa dihapus berarti transistor")
print("  yang tidak perlu dibuat, daya yang tidak perlu dipakai,")
print("  dan panas yang tidak perlu dibuang.")

# --------------------------------------------
# 7. Prinsip dualitas
# --------------------------------------------
print("")
print("--- dualitas: satu bukti, dua hukum ---")
DUAL = [
    ("a + 0 = a",        "a . 1 = a"),
    ("a + 1 = 1",        "a . 0 = 0"),
    ("a + a = a",        "a . a = a"),
    ("a + a' = 1",       "a . a' = 0"),
    ("a + ab = a",       "a(a + b) = a"),
    ("(a + b)' = a'b'",  "(ab)' = a' + b'"),
]
print("  " + "hukum".ljust(20) + "dualnya")
for x, y in DUAL:
    print("  " + x.ljust(20) + y)
print("")
print("  Cara membuat dual: tukar + dengan . , dan tukar 0")
print("  dengan 1. Peubahnya TIDAK diubah.")
print("")
print("  Dan ini bukan kebetulan yang rapi. Kalau sebuah hukum")
print("  terbukti benar, dualnya OTOMATIS benar -- karena")
print("  aksioma aljabar Boolean sendiri berpasangan dual.")
print("")
print("  Akibat praktisnya: kamu cuma perlu mengingat separuh")
print("  daftar hukum, dan separuh lainnya bisa diturunkan")
print("  kapan pun dibutuhkan.")

# --------------------------------------------
# 8. Buktikan de Morgan dengan tabel
# --------------------------------------------
print("")
print("--- uji de Morgan dan dualnya ---")
print("  " + "a b".ljust(6) + "(a+b)'".rjust(8) + "a'b'".rjust(6)
      + "   " + "(ab)'".rjust(7) + "a'+b'".rjust(7))
semua_cocok = True
for a, b in itertools.product([0, 1], repeat=2):
    kiri1 = int(not (a or b))
    kanan1 = int((not a) and (not b))
    kiri2 = int(not (a and b))
    kanan2 = int((not a) or (not b))
    if kiri1 != kanan1 or kiri2 != kanan2:
        semua_cocok = False
    print("  " + (str(a) + " " + str(b)).ljust(6)
          + str(kiri1).rjust(8) + str(kanan1).rjust(6)
          + "   " + str(kiri2).rjust(7) + str(kanan2).rjust(7))
print("")
print("  Keduanya cocok di seluruh baris: "
      + ("YA" if semua_cocok else "TIDAK"))
print("")
print("  De Morgan yang paling sering dipakai di kode, bukan di")
print("  rangkaian: not (a and b) sama dengan (not a) or (not b).")
print("")
print("  Kekeliruan yang lazim: menegasikan syarat gabungan")
print("  dengan cuma menegasikan tiap bagiannya dan MEMBIARKAN")
print("  penghubungnya. Itu mengubah artinya, dan bug seperti ini")
print("  sulit ditemukan karena kodenya tetap terbaca wajar.")` },
  output: `--- berapa fungsi Boolean untuk n peubah? ---
     n   baris tabel             jumlah fungsi
     1             2                         4
     2             4                        16
     3             8                       256
     4            16                    65.536
     5            32             4.294.967.296

  Rumusnya 2^(2^n): tabel kebenarannya punya 2^n baris,
  dan tiap baris boleh diisi 0 atau 1 secara bebas.

  Perhatikan lompatannya. Lima peubah sudah memberi lebih
  dari empat MILIAR fungsi berbeda. Itu sebabnya mencari
  bentuk paling sederhana tidak bisa dengan mencoba semua.

--- ekspresi berbeda, fungsi SAMA ---
  E1 = ab + ab'c
  E2 = a(b + c)
  E3 = ab + ac

  a b c      E1  E2  E3
  0 0 0       0   0   0
  0 0 1       0   0   0
  0 1 0       0   0   0
  0 1 1       0   0   0
  1 0 0       0   0   0
  1 0 1       1   1   1
  1 1 0       1   1   1
  1 1 1       1   1   1

  Ketiganya cocok di seluruh 8 baris: YA

  Ini bedanya EKSPRESI dan FUNGSI. Fungsinya satu; cara
  menuliskannya tak terhitung banyaknya.

  Dan itulah gunanya penyederhanaan: mencari tulisan
  TERPENDEK untuk fungsi yang sama, karena tulisan yang
  lebih pendek berarti rangkaian yang lebih murah.

--- menyusun ekspresi DARI tabel kebenaran (SOP) ---
  a b c      f   minterm
  0 0 0      0   -
  0 0 1      1   a'b'c
  0 1 0      0   -
  0 1 1      1   a'bc
  1 0 0      0   -
  1 0 1      1   ab'c
  1 1 0      1   abc'
  1 1 1      1   abc

  SOP  = a'b'c + a'bc + ab'c + abc' + abc
  suku : 5   literal : 15

  Caranya mekanis: ambil tiap baris yang bernilai 1, tulis
  perkalian seluruh peubahnya, beri aksen yang bernilai 0,
  lalu jumlahkan semuanya.

  Jadi SETIAP fungsi Boolean pasti punya ekspresi. Yang
  jadi soal bukan ADA atau tidak, melainkan seberapa
  panjang -- dan bentuk ini hampir selalu belum yang
  terpendek.

--- menggabungkan suku yang beda SATU peubah ---
  putaran 1 : a'b'c, a'bc, ab'c, abc', abc
  putaran 2 : b'c, bc, a'c, ac, ab
  putaran 3 : c, ab

  hasil : c + ab

  bentuk          suku  literal
  SOP penuh          5       15
  disederhanakan     2        3

  Kaidah yang dipakai cuma satu: xy + xy' = x. Dua suku
  yang beda tepat satu peubah bisa digabung, dan peubah
  yang berbeda itu HILANG -- karena kedua nilainya sama
  saja bagi hasilnya.

--- verifikasi: uji SELURUH baris ---
  8 baris diperiksa, ketidakcocokan: 0

  Ini langkah yang tidak boleh dilewati. Penyederhanaan
  dikerjakan dengan tangan sangat mudah salah, dan
  salahnya TIDAK KELIHATAN dari bentuk akhirnya.

  Untuk 3 peubah cuma 8 baris. Memeriksa semuanya jauh
  lebih murah daripada mencari kesalahan nanti di
  rangkaian yang sudah dipasang.

--- biaya rangkaian: sebelum vs sesudah ---
  SOP penuh       AND 5   OR 1   NOT 5   total 11
  disederhanakan  AND 1   OR 1   NOT 0   total 2

  Selisihnya kelihatan kecil di contoh 3 peubah. Tapi
  rangkaian nyata punya puluhan peubah, dan gerbangnya
  digandakan miliaran kali di dalam satu cip.

  Di situlah aljabar Boolean berhenti jadi latihan
  aljabar: satu suku yang bisa dihapus berarti transistor
  yang tidak perlu dibuat, daya yang tidak perlu dipakai,
  dan panas yang tidak perlu dibuang.

--- dualitas: satu bukti, dua hukum ---
  hukum               dualnya
  a + 0 = a           a . 1 = a
  a + 1 = 1           a . 0 = 0
  a + a = a           a . a = a
  a + a' = 1          a . a' = 0
  a + ab = a          a(a + b) = a
  (a + b)' = a'b'     (ab)' = a' + b'

  Cara membuat dual: tukar + dengan . , dan tukar 0
  dengan 1. Peubahnya TIDAK diubah.

  Dan ini bukan kebetulan yang rapi. Kalau sebuah hukum
  terbukti benar, dualnya OTOMATIS benar -- karena
  aksioma aljabar Boolean sendiri berpasangan dual.

  Akibat praktisnya: kamu cuma perlu mengingat separuh
  daftar hukum, dan separuh lainnya bisa diturunkan
  kapan pun dibutuhkan.

--- uji de Morgan dan dualnya ---
  a b     (a+b)'  a'b'     (ab)'  a'+b'
  0 0          1     1         1      1
  0 1          0     0         1      1
  1 0          0     0         1      1
  1 1          0     0         0      0

  Keduanya cocok di seluruh baris: YA

  De Morgan yang paling sering dipakai di kode, bukan di
  rangkaian: not (a and b) sama dengan (not a) or (not b).

  Kekeliruan yang lazim: menegasikan syarat gabungan
  dengan cuma menegasikan tiap bagiannya dan MEMBIARKAN
  penghubungnya. Itu mengubah artinya, dan bug seperti ini
  sulit ditemukan karena kodenya tetap terbaca wajar.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Bangkitkan tabel kebenaran', waktu: 'O(2^n)', memori: 'O(2^n) baris' },
      { operasi: 'Turunkan SOP dari tabel', waktu: 'O(2^n . n)', memori: 'satu suku per baris bernilai 1' },
      { operasi: 'Satu putaran penggabungan suku', waktu: 'O(s^2 . n)', memori: 's = jumlah suku saat itu' },
      { operasi: 'Verifikasi kesetaraan dua ekspresi', waktu: 'O(2^n . s)', memori: 'mutlak, bukan sampel' },
      { operasi: 'Cari bentuk minimum (Quine-McCluskey)', waktu: 'eksponensial', memori: 'praktis sampai belasan peubah' }
    ],
    intuisi: `Semuanya berpangkal pada \`2^n\`, dan itu batas yang tidak bisa dihindari: tabel kebenaran n peubah **memang** punya \`2^n\` baris.

Untuk n kecil itu tidak berarti apa-apa. Sepuluh peubah memberi 1.024 baris — sepele. Dua puluh peubah memberi sejuta — masih bisa. Empat puluh peubah memberi seribu miliar, dan verifikasi menyeluruh berhenti mungkin.

Di situlah pemeriksa rangkaian nyata berpindah dari tabel kebenaran ke **penyelesai SAT**, yang tidak mencoba semua baris melainkan mencari satu baris yang membedakan.

Tetapi untuk hampir semua yang kamu kerjakan sendiri — syarat \`if\` berlapis, rangkaian latihan, filter kueri — \`2^n\` masih murah. Dan selama masih murah, **tidak ada alasan memverifikasi dengan sebagian baris saja**.`
  },

  kesalahanUmum: [
    {
      salah: 'Menegasikan syarat gabungan dengan menegasikan tiap bagian tanpa mengubah penghubungnya.',
      kenapa: 'Negasi dari sebuah konjungsi adalah disjungsi dari negasinya, bukan konjungsi dari negasinya. Hasilnya tetap berupa kode yang terbaca wajar dan benar untuk sebagian masukan, sehingga kekeliruannya sulit ditemukan.',
      benar: 'Terapkan de Morgan secara utuh dengan menukar penghubungnya juga, lalu uji dengan tabel kebenaran untuk seluruh kombinasi.'
    },
    {
      salah: 'Menganggap dua ekspresi berbeda pasti mewakili fungsi yang berbeda.',
      kenapa: 'Satu fungsi Boolean bisa dituliskan dengan tak terhingga banyak ekspresi, dan yang menentukan kesamaan adalah tabel kebenarannya. Dua tulisan yang tampak sangat berbeda bisa berperilaku identik untuk setiap masukan.',
      benar: 'Bandingkan dua ekspresi lewat tabel kebenarannya, bukan lewat bentuk tulisannya.'
    },
    {
      salah: 'Menerima hasil penyederhanaan tanpa memeriksa seluruh baris tabel.',
      kenapa: 'Kesalahan penggabungan suku menghasilkan ekspresi yang tetap pendek dan rapi, sehingga tidak ada tanda apa pun bahwa fungsinya sudah berubah. Perubahannya sering hanya memengaruhi satu atau dua baris, sehingga sistemnya bekerja benar hampir selalu dan salah pada kombinasi yang jarang muncul.',
      benar: 'Bangkitkan seluruh kombinasi masukan lalu bandingkan nilai bentuk lama dan bentuk baru sebelum hasilnya dipakai.'
    },
    {
      salah: 'Menggabungkan dua suku yang berbeda pada lebih dari satu posisi.',
      kenapa: 'Kaidah penggabungan hanya berlaku bila kedua suku berbeda tepat satu peubah, karena hanya peubah itu yang bisa dibuktikan tidak berperan. Menggabungkan suku yang berbeda dua posisi memperluas cakupan ekspresi ke kombinasi masukan yang seharusnya bernilai nol.',
      benar: 'Periksa jumlah posisi yang berbeda sebelum menggabungkan, dan tolak penggabungan bila jumlahnya bukan satu.'
    },
    {
      salah: 'Menghentikan penyederhanaan karena jumlah sukunya tidak berkurang pada satu putaran.',
      kenapa: 'Satu putaran penggabungan bisa mempersingkat panjang tiap suku tanpa mengurangi jumlah sukunya, dan pengurangan jumlah suku baru terjadi pada putaran berikutnya. Berhenti di titik itu meninggalkan bentuk yang masih bisa dipendekkan.',
      benar: 'Lanjutkan putaran sampai tidak ada satu pun pasangan suku yang berbeda tepat satu posisi.'
    },
    {
      salah: 'Mengandalkan K-map untuk ekspresi dengan lima peubah atau lebih.',
      kenapa: 'K-map bekerja karena kotak yang berdampingan secara visual berbeda tepat satu peubah, dan sifat itu tidak lagi bisa dilihat sekali pandang ketika kisinya harus bertingkat. Yang gagal bukan kaidahnya, melainkan penyajian visualnya.',
      benar: 'Pakai penggabungan suku secara tabel atau algoritme Quine-McCluskey untuk peubah yang banyak, dan sisakan K-map untuk empat peubah ke bawah.'
    },
    {
      salah: 'Menghafal seluruh daftar hukum aljabar Boolean satu per satu.',
      kenapa: 'Aksioma aljabar Boolean berpasangan dual, sehingga setiap hukum yang benar punya pasangan yang otomatis benar. Menghafal keduanya menggandakan beban tanpa menambah kemampuan.',
      benar: 'Hafalkan separuh daftarnya, lalu turunkan pasangannya dengan menukar penjumlahan dengan perkalian serta nol dengan satu.'
    }
  ],

  analogi: `Bayangkan kamu menulis **syarat penerima beasiswa** untuk sebuah pengumuman.

Draf pertamamu berbunyi begini:

*"Berhak: mahasiswa dengan IPK di atas 3,5 dan penghasilan orang tua di bawah lima juta; atau IPK di atas 3,5, penghasilan di bawah lima juta, dan memiliki prestasi lomba."*

Bacalah sekali lagi. Bagian kedua **sudah seluruhnya tercakup** di bagian pertama — siapa pun yang memenuhi bagian kedua otomatis memenuhi bagian pertama.

Jadi separuh pengumumanmu tidak menambahkan apa pun. Ia cuma memperpanjang bacaan, dan menambah tempat untuk salah tulis.

Itu \`ab + abc = ab\`.

Sekarang bentuk yang lebih halus. Draf lain:

*"Berhak: IPK di atas 3,5 dan berasal dari luar kota; atau IPK di atas 3,5 dan berasal dari dalam kota."*

Dua syarat, dan tidak ada yang tercakup di yang lain. Tetapi gabungannya berarti: **IPK di atas 3,5, dari mana pun.**

Asal kotanya ternyata tidak berperan sama sekali — dan itu baru kelihatan setelah kedua baris dibaca bersamaan.

Itu \`ab + ab' = a\`, kaidah yang jadi tulang punggung seluruh bab.

Perhatikan bahwa yang kamu lakukan bukan **melonggarkan** syaratnya. Daftar penerimanya sama persis, orang per orang. Yang berubah cuma panjang pengumumannya.

**Sekarang bagian yang berbahaya.**

Seorang panitia menulis pengumuman pembatalan:

*"Tidak berhak: mahasiswa yang IPK-nya di bawah 3,5 dan tidak punya prestasi lomba."*

Ia bermaksud membalik syarat *"IPK di atas 3,5 dan punya prestasi"*.

Dan ia salah.

Membalik *"A dan B"* bukan *"bukan-A dan bukan-B"*. Yang benar: **"bukan-A atau bukan-B"**.

Akibatnya nyata: mahasiswa berIPK 3,8 yang tidak punya prestasi lomba **tidak** disebut di pengumuman pembatalan — padahal ia memang tidak berhak. Ia akan datang menuntut, dan pengumumannya memang di pihaknya.

Perhatikan bentuk kesalahannya: pengumuman itu terbaca **wajar sekali**. Tidak ada yang aneh dalam bahasanya. Ia cuma salah untuk sebagian orang, dan sebagian itu tidak terpikirkan saat menulisnya.

**Terakhir, soal memeriksa.**

Bagaimana panitia bisa menemukan kesalahannya sebelum diumumkan?

Bukan dengan membaca ulang lebih teliti — ia sudah membaca teliti, dan tetap salah.

Caranya: buat daftar **seluruh** kombinasi yang mungkin. IPK tinggi atau rendah, prestasi ada atau tidak — empat baris saja. Lalu untuk tiap baris tulis: berhak atau tidak menurut syarat asli, dan berhak atau tidak menurut pengumuman pembatalan.

Ketidakcocokan langsung muncul di satu baris.

Empat baris, lima menit. Dan itulah tabel kebenaran.`,

  latihan: [
    'Hitung berapa fungsi Boolean berbeda yang mungkin untuk empat peubah, lalu jelaskan asal rumusnya.',
    'Tulis tiga ekspresi berbeda yang fungsinya sama, lalu buktikan kesamaannya dengan tabel kebenaran.',
    'Ambil satu tabel kebenaran tiga peubah yang kamu susun sendiri, lalu turunkan bentuk SOP-nya secara mekanis.',
    'Sederhanakan bentuk SOP itu dengan penggabungan suku, catat jumlah suku dan literal di setiap putaran.',
    'Verifikasi hasil penyederhanaanmu terhadap seluruh delapan baris, lalu jelaskan kenapa langkah ini tidak bisa diganti dengan memeriksa beberapa baris.',
    'Coba sengaja menggabungkan dua suku yang berbeda dua posisi, lalu tunjukkan baris mana yang jadi salah.',
    'Hitung jumlah gerbang AND, OR, dan NOT untuk bentuk sebelum dan sesudah penyederhanaan.',
    'Tulis dual dari enam hukum aljabar Boolean, lalu buktikan salah satunya dengan tabel kebenaran.',
    'Ambil satu syarat gabungan dari kode nyata, negasikan dengan de Morgan, lalu uji apakah negasi naifnya berbeda hasilnya.',
    'Cari satu potongan kode dengan tiga kondisi bersarang, sederhanakan syaratnya, dan jalankan uji yang ada untuk memastikan perilakunya tidak berubah.'
  ]
});


TOPICS.push({
  id: 'matdis-induksi-rekurens',
  judul: 'Induksi Matematika & Relasi Rekurens',
  kategori: 'matematika-diskrit',
  tag: ['induksi matematika', 'basis', 'langkah induktif', 'relasi rekurens', 'persamaan karakteristik', 'Menara Hanoi'],
  ringkas: 'Empat puluh kasus pertama benar semua, dan dugaannya tetap salah.',

  fungsi: `**Membuktikan sesuatu berlaku untuk seluruh n, dan menghitung biaya algoritme rekursif tanpa menjalankannya.**

Terpakai di:

- **Menganalisis algoritme rekursif** — setiap fungsi yang memanggil dirinya punya relasi rekurens, dan menyelesaikannya memberi Big-O-nya
- **Membuktikan program benar** untuk semua masukan, bukan untuk masukan yang kamu uji
- **Memutuskan apakah memoisasi berharga** — bentuk rekurensnya memberi tahu berapa kali submasalah yang sama muncul
- **Mengerjakan soal ujian** yang meminta pembuktian, bukan perhitungan
- **Menurunkan rumus tertutup** dari barisan yang didefinisikan bertahap

Yang paling penting dipahami di sini bukan tekniknya, melainkan **kenapa teknik itu perlu**: menguji empat puluh kasus pertama dan mendapati semuanya benar **tidak membuktikan apa pun**. Program di topik ini menunjukkan satu dugaan yang benar untuk n = 0 sampai 39 dan salah di n = 40.

Dan satu hasil praktis yang langsung terpakai: **Fibonacci tanpa tabel memakai 2,7 juta panggilan untuk n = 30; dengan tabel cukup 59.** Rekurensnya sama persis — yang berbeda cuma apakah hasilnya disimpan.`,
  praktik: {
    tujuan: 'Kamu bisa menyusun bukti induksi lengkap dua langkah, membaca relasi rekurens dari kode rekursif, menyelesaikannya menjadi rumus tertutup, dan memverifikasi hasilnya dengan iterasi.',
    alat: ['Python untuk verifikasi numerik', 'Satu fungsi rekursif dari kode yang kamu punya', 'Kertas untuk menurunkan bentuk tutupnya'],
    langkah: [
      { judul: 'Buktikan sendiri bahwa menguji tidak cukup',
        isi: `Hitung \`n^2 + n + 41\` untuk n = 0 sampai 45 dan periksa keprimaannya.

Empat puluh kasus pertama prima semuanya, lalu n = 40 memberi 1681 = 41 x 41. Setelah melihat ini sendiri, kamu tidak akan lagi menganggap "sudah saya coba banyak" sebagai bukti.` },
      { judul: 'Tulis bukti induksi dengan dua langkah yang terpisah jelas',
        isi: `**Basis**: buktikan untuk n terkecil. **Langkah induktif**: andaikan benar untuk n, buktikan untuk n+1.

Yang dibuktikan di langkah kedua adalah **implikasinya**, bukan pernyataannya. Ini yang paling sering dikacaukan: kamu tidak sedang mengandaikan yang mau dibuktikan, kamu sedang membuktikan bahwa satu kasus menjatuhkan kasus berikutnya.` },
      { judul: 'Jangan lewatkan basisnya',
        isi: `Tanpa basis, kamu punya rantai domino sempurna yang tidak pernah didorong.

Ada pernyataan yang langkah induktifnya benar tetapi pernyataannya salah untuk semua n — dan satu-satunya yang menahannya adalah basis yang gagal.` },
      { judul: 'Uji rumusmu dengan kode setelah dibuktikan',
        isi: `Bandingkan rumus tutup dengan penjumlahan langsung untuk dua ratus nilai n.

Urutannya penting: **buktikan dulu, uji kemudian**. Uji numerik menangkap salah TULIS, bukan salah logika — dan menemukan salah tulis lewat kode jauh lebih murah daripada lewat pemeriksa ujian.` },
      { judul: 'Baca relasi rekurens langsung dari kodenya',
        isi: `Untuk tiap fungsi rekursif, tulis: berapa kali ia memanggil dirinya, dengan ukuran berapa, dan berapa kerja di luar panggilan itu.

Menara Hanoi memanggil dirinya **dua kali** dengan ukuran \`n-1\`, ditambah satu langkah. Jadi \`T(n) = 2T(n-1) + 1\`. Ini pembacaan mekanis, bukan intuisi.` },
      { judul: 'Buka rekurensnya dengan iterasi',
        isi: `Substitusikan berulang: \`T(n) = 2T(n-1)+1 = 4T(n-2)+2+1 = 8T(n-3)+4+2+1\`.

Polanya muncul sendiri setelah tiga langkah, dan dari situ bentuk tutupnya bisa diduga. Lalu **buktikan dugaan itu dengan induksi** — jangan berhenti di pola.` },
      { judul: 'Untuk rekurens linear, pakai persamaan karakteristik',
        isi: `Untuk \`a(n) = 5a(n-1) - 6a(n-2)\`, tulis \`x^2 = 5x - 6\`, cari akarnya (2 dan 3), lalu bentuk umumnya \`A.2^n + B.3^n\`. Tentukan A dan B dari syarat awal.

Yang paling berguna: **akar terbesar langsung memberi laju tumbuhnya**. Untuk analisis algoritme, sering itu saja yang dibutuhkan.` },
      { judul: 'Hitung berapa kali submasalah yang sama muncul',
        isi: `Pasang pencacah di fungsi rekursifmu, lalu jalankan untuk beberapa n.

Kalau jumlah panggilannya tumbuh jauh lebih cepat daripada jumlah nilai n yang berbeda, kamu sedang menghitung hal yang sama berulang — dan memoisasi akan memberi percepatan besar.` }
    ],
    cek: [
      'Bukti induksimu punya basis dan langkah induktif yang ditulis terpisah',
      'Kamu bisa menuliskan relasi rekurens dari sebuah fungsi rekursif tanpa menjalankannya',
      'Rumus tutupmu sudah diuji terhadap hasil iterasi untuk banyak nilai n',
      'Kamu tahu berapa kali fungsi rekursifmu menghitung ulang nilai yang sama'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — dari rekursi ke rumus, dan kenapa menguji tidak cukup',

  konsep: `Bab ini menyatukan dua hal yang terlihat berbeda: cara **membuktikan** pernyataan tentang bilangan bulat, dan cara **menghitung biaya** algoritme rekursif. Keduanya bertumpu pada bentuk yang sama — sesuatu yang didefinisikan dari dirinya sendiri yang lebih kecil.

**Menguji bukan membuktikan**

Ambil dugaan: \`n^2 + n + 41\` selalu prima.

| n | Nilai | Prima? |
|---|---|---|
| 0 | 41 | ya |
| 10 | 151 | ya |
| 20 | 461 | ya |
| 39 | 1601 | ya |
| **40** | **1681** | **tidak** — 41 x 41 |

Empat puluh kasus pertama benar **semuanya**. Kalau kamu berhenti menguji di n = 39 dan menyimpulkan dugaanmu benar, kesimpulanmu salah — dan **tidak ada satu pun tanda** dalam pengujianmu bahwa ia salah.

Inilah yang membuat induksi matematika bukan formalitas. Ia satu-satunya cara menyatakan sesuatu berlaku untuk **seluruh** n, karena n-nya tak berhingga banyaknya sementara pengujian selalu berhenti di suatu tempat.

**Dua langkah, dan kenapa keduanya wajib**

| Langkah | Isinya |
|---|---|
| **Basis** | buktikan benar untuk n terkecil |
| **Langkah induktif** | andaikan benar untuk n, buktikan untuk n+1 |

Gambarannya deretan domino tak berujung. Langkah induktif memastikan tiap domino menjatuhkan yang berikutnya; basis mendorong domino **pertama**.

Tanpa basis, kamu punya rantai sempurna yang tidak pernah mulai. Dan itu bukan kemungkinan teoretis: ada pernyataan yang langkah induktifnya benar dan pernyataannya salah untuk semua n, karena tidak ada satu pun n yang bisa jadi titik awal.

Satu hal yang sering dikacaukan pada langkah kedua: kamu **tidak** sedang mengandaikan yang mau dibuktikan. Yang dibuktikan adalah **implikasinya** — bahwa kalau berlaku untuk n maka berlaku untuk n+1. Implikasi itu bisa benar bahkan ketika kedua sisinya salah.

**Verifikasi numerik tetap berguna**

| Rumus | Diuji n = 1..200 | Cocok |
|---|---|---|
| \`1+2+...+n = n(n+1)/2\` | 200 nilai | ya |
| \`1+3+5+...+(2n-1) = n^2\` | 200 nilai | ya |
| \`1^2+...+n^2 = n(n+1)(2n+1)/6\` | 200 nilai | ya |
| \`2^0+...+2^n = 2^(n+1) - 1\` | 200 nilai | ya |

Perhatikan urutan yang benar: **buktikan dengan induksi, lalu uji dengan kode.**

Uji numerik tidak menggantikan bukti — bagian pertama bab ini sudah menunjukkan kenapa. Yang ditangkapnya adalah **salah tulis**: tanda yang tertukar, pembagi yang keliru, indeks yang bergeser satu. Dan menemukan salah tulis lewat kode berbiaya beberapa detik.

**Relasi rekurens: membaca biaya dari bentuk kodenya**

Menara Hanoi: untuk memindahkan n cakram, pindahkan n-1 ke tiang bantu, pindahkan yang terbesar (satu langkah), lalu pindahkan n-1 itu ke tujuan.

\`T(n) = 2T(n-1) + 1\`, dengan \`T(0) = 0\`

Membukanya dengan substitusi berulang:

\`T(n) = 2(2T(n-2)+1)+1 = 4T(n-2)+2+1 = 8T(n-3)+4+2+1 = ... = 2^n - 1\`

Dan simulasinya membenarkan: n = 12 memberi tepat 4.095 langkah.

Perhatikan bahwa pembacaan rekurensnya **mekanis**. Berapa kali fungsi memanggil dirinya, dengan ukuran apa, dan berapa kerja di luar panggilan — tiga pertanyaan itu langsung memberi rekurensnya, tanpa perlu menjalankan apa pun.

**Rekurens linear dan persamaan karakteristik**

Untuk \`a(n) = 5a(n-1) - 6a(n-2)\` dengan \`a(0) = 1\`, \`a(1) = 5\`:

1. tulis persamaan karakteristik: \`x^2 = 5x - 6\`, jadi \`x^2 - 5x + 6 = 0\`
2. cari akarnya: **2** dan **3**
3. bentuk umum: \`a(n) = A.2^n + B.3^n\`
4. dari syarat awal: \`A = -2\`, \`B = 3\`

Diverifikasi untuk n = 0 sampai 14: cocok seluruhnya. \`a(14) = 14.316.139\` dari kedua cara.

Gunanya bentuk tutup ada dua. Yang pertama jelas: menghitung \`a(1000)\` tanpa melewati seribu langkah.

Yang kedua lebih penting bagi informatika: ia menunjukkan **laju tumbuhnya**. Di sini \`3^n\`, karena akar terbesarnya 3. Untuk analisis algoritme, sering laju itulah satu-satunya yang dicari — dan **akar terbesar memberikannya tanpa menghitung satu nilai pun**.

**Rekurens yang sama, dua biaya yang jauh berbeda**

| n | F(n) | Panggilan naif | Bertabel | Rasio |
|---|---|---|---|---|
| 10 | 55 | 177 | 19 | 9x |
| 20 | 6.765 | 21.891 | 39 | 561x |
| 25 | 75.025 | 242.785 | 49 | 4.955x |
| 30 | 832.040 | 2.692.537 | 59 | 45.636x |

Rekurensnya sama persis: \`F(n) = F(n-1) + F(n-2)\`. Yang berbeda cuma apakah hasil yang sudah dihitung **disimpan**.

Tanpa tabel, jumlah panggilan tumbuh seperti F(n) sendiri — eksponensial. Dengan tabel, tiap n dihitung sekali, jadi linear.

Ini hubungan paling langsung antara relasi rekurens dan pemrograman: **bentuk rekurens memberi tahu berapa kali submasalah yang sama akan muncul**, dan dari situ terlihat apakah menyimpannya berharga.

**Pola rekurens yang perlu dikenali**

| Rekurens | Penyelesaian | Contoh |
|---|---|---|
| \`T(n) = T(n/2) + 1\` | O(log n) | pencarian biner |
| \`T(n) = 2T(n/2) + n\` | O(n log n) | merge sort |
| \`T(n) = 2T(n/2) + 1\` | O(n) | telusur pohon biner |
| \`T(n) = T(n-1) + n\` | O(n^2) | selection sort |
| \`T(n) = 2T(n-1) + 1\` | O(2^n) | Menara Hanoi |

Perhatikan pembeda yang paling menentukan: **membagi n** lawan **mengurangi n**.

Membagi memberi \`log n\` tingkat rekursi. Mengurangi memberi \`n\` tingkat. Dua baris terakhir jauh lebih berat daripada tiga baris pertama bukan karena rumusnya rumit, melainkan karena kedalaman rekursinya berbeda jenis.

Kalau kamu bisa mengubah sebuah algoritme dari "mengurangi satu" menjadi "membagi dua", kamu baru saja memindahkannya melintasi batas itu — dan itu percepatan yang tidak bisa dikejar oleh optimasi kode apa pun.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# DUGAAN: n^2 + n + 41 selalu prima\n#\n#    n   nilai   prima?\n#    0      41     ya\n#   10     151     ya\n#   20     461     ya\n#   35    1301     ya\n#   39    1601     ya\n#   40    1681     TIDAK   <- 41 x 41\n#\n# Empat puluh kasus pertama benar SEMUA.\n#\n# Tidak ada satu pun tanda dalam pengujian itu\n# bahwa kasus ke-41 akan gagal.',
      penjelasan: `Satu contoh yang mengubah induksi matematika dari kewajiban formal menjadi keperluan yang jelas.

Bayangkan kamu menemukan rumus ini sendiri. Kamu mencoba n = 0, prima. n = 1, prima. n = 2, 3, 4, 5 — semuanya prima. Kamu mencoba sampai n = 20, masih prima semua.

Pada titik ini, keyakinanmu masuk akal. Dua puluh satu kasus berturut-turut, tanpa satu pun kegagalan. Kalau ini uji perangkat lunak, kamu akan menyatakan lulus dan melanjutkan.

Kamu bahkan lanjut sampai n = 39. Empat puluh kasus. Semuanya prima.

Lalu n = 40 memberi 1681, dan 1681 = 41 x 41.

**Sekarang perhatikan apa yang tidak terjadi.** Tidak ada peringatan. Tidak ada nilai yang "hampir gagal". Tidak ada pola dalam empat puluh kasus pertama yang bisa membuatmu curiga. Kegagalannya datang tanpa pendahuluan.

Dan kegagalannya juga tidak acak — ia punya sebab yang bersih. Untuk n = 40: \`40^2 + 40 + 41 = 40(40+1) + 41 = 40 x 41 + 41 = 41 x 41\`. Angka 41 dalam rumus itu yang akhirnya memakan dirinya sendiri.

Sebab itu **ada di dalam struktur rumusnya**, dan tidak akan pernah ditemukan dengan mencoba nilai satu per satu. Ia hanya bisa dilihat dengan memeriksa bentuknya.

**Sekarang bawa ini ke pekerjaan sehari-hari.**

Kamu menulis fungsi, mengujinya dengan dua puluh masukan, semuanya benar. Apa yang kamu ketahui?

Kamu tahu ia benar untuk dua puluh masukan itu. Itu saja.

Ini bukan alasan untuk berhenti menguji — pengujian menangkap sebagian besar kesalahan nyata, dan sangat murah. Tetapi ia menjelaskan kenapa ada kelas kesalahan yang tidak akan pernah ditangkap pengujian, sebanyak apa pun kasusnya:

- **luapan bilangan** yang baru terjadi pada masukan besar
- **kondisi lomba** yang baru muncul pada beban tinggi
- **kasus batas** pada nilai yang tidak terpikirkan diuji
- **asumsi** yang benar untuk seluruh data yang ada sekarang

Yang terakhir paling sering. Kode yang mengandaikan nomor telepon 12 angka bekerja sempurna selama bertahun-tahun, karena semua data yang masuk memang 12 angka — sampai satu pelanggan dari negara lain mendaftar.

Sebabnya sama seperti 1681: asumsinya ada di **struktur**, dan pengujian cuma melihat **contoh**.

**Jadi apa penggantinya?**

Untuk pernyataan matematis: induksi, yang memeriksa strukturnya dan karena itu mencakup seluruh n sekaligus.

Untuk program: penalaran tentang invarian dan batas, bukan cuma daftar kasus uji. Pertanyaan "apa yang membuat ini benar untuk **semua** masukan" harus punya jawaban yang tidak berbentuk "saya sudah coba banyak".

Dan kalau jawabannya tidak ada, setidaknya kamu tahu di mana kamu berdiri — dan itu jauh lebih baik daripada rasa aman yang diberikan empat puluh kasus yang lolos.`
    },
    {
      bahasa: 'python',
      kode: '# REKURENS SAMA, BIAYA JAUH BERBEDA\n#\n#   F(n) = F(n-1) + F(n-2)\n#\n#    n     F(n)   panggilan naif   bertabel   rasio\n#   10       55              177         19       9x\n#   20     6765           21.891         39     561x\n#   25    75025          242.785         49    4955x\n#   30   832040        2.692.537         59   45636x\n#\n# Yang berbeda cuma: apakah hasilnya DISIMPAN.\n#\n# MEMBAGI vs MENGURANGI:\n#   T(n) = 2T(n/2) + n   ->  O(n log n)   log n tingkat\n#   T(n) = 2T(n-1) + 1   ->  O(2^n)       n tingkat',
      penjelasan: `Dua tabel yang bersama-sama menjelaskan kenapa relasi rekurens bukan pelajaran matematika yang terpisah dari pemrograman — ia **cara membaca biaya kode**.

**Tabel pertama: rekurens yang sama, dua dunia.**

Perhatikan bahwa \`F(n) = F(n-1) + F(n-2)\` tidak berubah sama sekali di antara kedua kolom. Definisi matematisnya identik. Yang berbeda cuma satu keputusan implementasi: menyimpan hasil atau tidak.

Dan selisihnya pada n = 30 adalah **45.636 kali**.

Sekarang dari mana angka 2.692.537 itu datang. Bentuk pemanggilannya sendiri yang menjelaskan: untuk menghitung \`F(30)\`, ia menghitung \`F(29)\` dan \`F(28)\`. Untuk \`F(29)\` ia menghitung \`F(28)\` **lagi** — dan \`F(28)\` itu tidak tahu bahwa ia sudah pernah dihitung.

Semakin ke bawah, semakin parah. \`F(2)\` dihitung ratusan ribu kali.

Jumlah panggilannya sendiri memenuhi rekurens yang mirip Fibonacci, jadi ia tumbuh **eksponensial** — sekitar \`1,6^n\`.

Dengan tabel, jumlah panggilannya jadi \`2n - 1\`. Linear, karena tiap n dihitung tepat sekali dan sesudahnya cuma dibaca.

**Yang penting: bentuk rekurensnya sudah memperingatkan hal ini sebelum kode dijalankan.**

Caranya melihat: bandingkan **jumlah submasalah berbeda** dengan **jumlah pemanggilan**. Submasalah berbedanya cuma \`F(0)\` sampai \`F(30)\` — tiga puluh satu buah. Kalau pemanggilannya jutaan, berarti hal yang sama dihitung berulang, dan menyimpannya pasti menolong.

Uji ini bisa dijalankan di kepala, pada kode apa pun yang rekursif. Kalau submasalahnya sedikit tapi cabangnya banyak, memoisasi berharga. Kalau setiap cabang menghasilkan submasalah yang benar-benar baru — misalnya quicksort, yang memecah data menjadi bagian yang tidak pernah tumpang tindih — memoisasi tidak menolong sama sekali.

**Tabel kedua: membagi lawan mengurangi.**

Dua rekurens yang bentuknya nyaris sama:

- \`T(n) = 2T(n/2) + n\` → \`O(n log n)\`
- \`T(n) = 2T(n-1) + 1\` → \`O(2^n)\`

Keduanya bercabang dua. Keduanya punya kerja tambahan yang kecil. Bedanya cuma \`n/2\` lawan \`n-1\`.

Dan selisihnya adalah selisih antara "bisa dijalankan pada satu juta data" dan "tidak bisa dijalankan pada enam puluh data".

Sebabnya **kedalaman rekursinya**. Membagi dua terus-menerus mencapai 1 setelah \`log2(n)\` langkah — untuk sejuta, dua puluh langkah. Mengurangi satu terus-menerus mencapai 1 setelah \`n\` langkah — untuk sejuta, sejuta langkah.

Dengan percabangan dua di setiap tingkat, jumlah simpul di tingkat terdalam adalah \`2^kedalaman\`. Jadi kedalaman dua puluh memberi sejuta simpul; kedalaman sejuta memberi angka yang tidak ada namanya.

**Akibat praktis yang paling berharga dari seluruh topik ini:**

Kalau kamu punya algoritme yang mengurangi ukuran satu per satu, dan kamu bisa menemukan cara **membaginya** alih-alih menguranginya, kamu memindahkannya melintasi batas ini.

Itu bukan optimasi bertahap. Ia perubahan kelas — dan tidak ada penulisan ulang dalam bahasa yang lebih cepat, tidak ada perangkat keras yang lebih besar, yang bisa mengejar selisihnya.

Sebaliknya juga berlaku, dan sama pentingnya: kalau kode yang kamu tulis diam-diam "mengurangi satu" padahal kamu mengira "membagi dua" — misalnya karena setiap langkah cuma memotong satu elemen — maka Big-O yang kamu bayangkan salah, dan itu akan terlihat sebagai kelambatan yang tidak masuk akal begitu datanya bertambah.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Induksi matematika & relasi rekurens
# ============================================
import math

# --------------------------------------------
# 1. Menguji BUKAN membuktikan
# --------------------------------------------
print("--- kenapa mencoba banyak kasus tidak cukup ---")
def dugaan(n):
    return n * n + n + 41

def prima(m):
    if m < 2:
        return False
    d = 2
    while d * d <= m:
        if m % d == 0:
            return False
        d += 1
    return True

pertama_gagal = None
for n in range(0, 60):
    if not prima(dugaan(n)):
        pertama_gagal = n
        break
print("  Dugaan: n^2 + n + 41 selalu menghasilkan bilangan prima.")
print("")
print("  " + "n".rjust(4) + "n^2+n+41".rjust(11) + "prima?".rjust(9))
for n in [0, 1, 2, 5, 10, 20, 35, 39, 40, 41]:
    v = dugaan(n)
    print("  " + str(n).rjust(4) + str(v).rjust(11)
          + ("ya" if prima(v) else "TIDAK").rjust(9))
print("")
print("  Gagal pertama di n = " + str(pertama_gagal)
      + ", nilainya " + str(dugaan(pertama_gagal)))
print("  " + str(dugaan(pertama_gagal)) + " = 41 x 41")
print("")
print("  Empat puluh kasus pertama benar SEMUA. Kalau kamu")
print("  menguji sampai n = 39 lalu menyimpulkan dugaanmu benar,")
print("  kesimpulanmu SALAH -- dan tidak ada satu pun tanda")
print("  bahwa ia salah dalam pengujianmu.")
print("")
print("  Ini yang membuat induksi matematika bukan formalitas.")
print("  Ia satu-satunya cara menyatakan sesuatu berlaku untuk")
print("  SELURUH n, karena n-nya tak berhingga banyaknya dan")
print("  pengujian selalu berhenti di suatu tempat.")

# --------------------------------------------
# 2. Bentuk induksi
# --------------------------------------------
print("")
print("--- dua langkah, dan kenapa dua-duanya wajib ---")
LANGKAH = [
    ("Basis", "buktikan benar untuk n terkecil",
     "biasanya n = 0 atau n = 1"),
    ("Langkah induktif", "andaikan benar untuk n, buktikan n+1",
     "yang dibuktikan: IMPLIKASINYA, bukan pernyataannya"),
]
for a, b, c in LANGKAH:
    print("  " + a)
    print("      " + b)
    print("      " + c)
print("")
print("  Gambarannya: deretan domino tak berujung.")
print("")
print("  Langkah induktif memastikan tiap domino menjatuhkan")
print("  yang berikutnya. Basis mendorong domino PERTAMA.")
print("")
print("  Tanpa basis, kamu punya rantai sempurna yang tidak")
print("  pernah mulai. Ada pernyataan yang langkah induktifnya")
print("  benar tetapi pernyataannya salah untuk semua n --")
print("  karena tidak ada satu pun n yang bisa jadi titik awal.")

# --------------------------------------------
# 3. Verifikasi numerik rumus jumlah
# --------------------------------------------
print("")
print("--- memeriksa rumus yang SUDAH dibuktikan ---")
RUMUS = [
    ("1+2+...+n", lambda n: n * (n + 1) // 2,
     lambda n: sum(range(1, n + 1))),
    ("1+3+5+...+(2n-1)", lambda n: n * n,
     lambda n: sum(range(1, 2 * n, 2))),
    ("1^2+2^2+...+n^2", lambda n: n * (n + 1) * (2 * n + 1) // 6,
     lambda n: sum(i * i for i in range(1, n + 1))),
    ("2^0+2^1+...+2^n", lambda n: 2 ** (n + 1) - 1,
     lambda n: sum(2 ** i for i in range(0, n + 1))),
]
print("  " + "rumus".ljust(20) + "diuji n=1..200".rjust(16)
      + "  cocok?")
for nama, tutup, jumlah in RUMUS:
    sama = all(tutup(n) == jumlah(n) for n in range(1, 201))
    print("  " + nama.ljust(20) + "200 nilai".rjust(16)
          + "  " + ("YA" if sama else "TIDAK"))
print("")
print("  Perhatikan judulnya: memeriksa rumus yang SUDAH")
print("  dibuktikan. Uji numerik berguna untuk menangkap salah")
print("  TULIS -- bukan untuk menggantikan buktinya.")
print("")
print("  Urutan yang benar: buktikan dengan induksi, lalu uji")
print("  dengan kode. Kalau ujinya gagal, yang salah biasanya")
print("  ketikanmu, dan menemukannya jadi murah.")

# --------------------------------------------
# 4. Menara Hanoi: dari rekursi ke rumus
# --------------------------------------------
print("")
print("--- Menara Hanoi: T(n) = 2T(n-1) + 1 ---")
langkah_hanoi = 0

def hanoi(n, dari, ke, bantu):
    global langkah_hanoi
    if n == 0:
        return
    hanoi(n - 1, dari, bantu, ke)
    langkah_hanoi += 1
    hanoi(n - 1, bantu, ke, dari)

print("  " + "n".rjust(4) + "langkah nyata".rjust(15)
      + "2^n - 1".rjust(12) + "  cocok?")
for n in range(1, 13):
    langkah_hanoi = 0
    hanoi(n, 'A', 'C', 'B')
    tutup = 2 ** n - 1
    if n <= 6 or n == 12:
        print("  " + str(n).rjust(4) + str(langkah_hanoi).rjust(15)
              + str(tutup).rjust(12)
              + ("  ya" if langkah_hanoi == tutup else "  TIDAK"))
print("")
print("  Rekurensnya dibaca dari cara kerjanya: untuk memindah n")
print("  cakram, pindahkan n-1 ke tiang bantu, pindahkan yang")
print("  terbesar (1 langkah), lalu pindahkan n-1 itu ke tujuan.")
print("")
print("  T(n) = 2T(n-1) + 1, dengan T(0) = 0.")
print("")
print("  Membukanya: T(n) = 2(2T(n-2)+1)+1 = 4T(n-2)+2+1")
print("            = 8T(n-3)+4+2+1 = ... = 2^n - 1")
print("")
print("  Kolom terakhir kosong dari kata TIDAK, dan itu bukti")
print("  praktis bahwa penurunannya tidak salah ketik.")

# --------------------------------------------
# 5. Rekurens linear dan persamaan karakteristik
# --------------------------------------------
print("")
print("--- menyelesaikan a(n) = 5a(n-1) - 6a(n-2) ---")
print("  syarat awal: a(0) = 1, a(1) = 5")
print("")
a = [1, 5]
for n in range(2, 15):
    a.append(5 * a[n - 1] - 6 * a[n - 2])
# x^2 = 5x - 6  ->  (x-2)(x-3) = 0  ->  akar 2 dan 3
# a(n) = A.2^n + B.3^n ; a(0)=A+B=1 ; a(1)=2A+3B=5 -> A=-2, B=3
def tutup(n):
    return -2 * (2 ** n) + 3 * (3 ** n)

print("  akar persamaan karakteristik x^2 - 5x + 6 = 0 : 2 dan 3")
print("  bentuk umum : a(n) = A.2^n + B.3^n")
print("  dari syarat awal : A = -2, B = 3")
print("")
print("  " + "n".rjust(4) + "iterasi".rjust(12)
      + "rumus tutup".rjust(14) + "  cocok?")
semua = True
for n in range(0, 15):
    if tutup(n) != a[n]:
        semua = False
    if n <= 6 or n == 14:
        print("  " + str(n).rjust(4) + str(a[n]).rjust(12)
              + str(tutup(n)).rjust(14)
              + ("  ya" if tutup(n) == a[n] else "  TIDAK"))
print("")
print("  cocok untuk seluruh n = 0..14 : "
      + ("YA" if semua else "TIDAK"))
print("")
print("  Gunanya bentuk tutup: menghitung a(1000) tanpa melewati")
print("  seribu langkah. Dan lebih penting, ia menunjukkan LAJU")
print("  tumbuhnya -- di sini 3^n, karena akar terbesarnya 3.")
print("")
print("  Untuk analisis algoritma, laju itulah yang dicari. Akar")
print("  terbesar persamaan karakteristik langsung memberi")
print("  jawabannya tanpa perlu menghitung satu nilai pun.")

# --------------------------------------------
# 6. Rekurens yang sama, dua cara menghitung
# --------------------------------------------
print("")
print("--- Fibonacci: rekursi telanjang vs bertabel ---")
panggil_naif = 0

def fib_naif(n):
    global panggil_naif
    panggil_naif += 1
    if n < 2:
        return n
    return fib_naif(n - 1) + fib_naif(n - 2)

panggil_memo = 0

def fib_memo(n, tabel=None):
    global panggil_memo
    if tabel is None:
        tabel = {}
    panggil_memo += 1
    if n < 2:
        return n
    if n in tabel:
        return tabel[n]
    tabel[n] = fib_memo(n - 1, tabel) + fib_memo(n - 2, tabel)
    return tabel[n]

print("  " + "n".rjust(4) + "F(n)".rjust(10)
      + "panggilan naif".rjust(16) + "bertabel".rjust(11)
      + "  rasio")
for n in (10, 20, 25, 30):
    panggil_naif = 0
    panggil_memo = 0
    v = fib_naif(n)
    fib_memo(n)
    print("  " + str(n).rjust(4) + str(v).rjust(10)
          + f"{panggil_naif:>16,}".replace(",", ".")
          + str(panggil_memo).rjust(11)
          + ("  %.0fx" % (panggil_naif / panggil_memo)))
print("")
print("  Rekurensnya sama persis: F(n) = F(n-1) + F(n-2).")
print("  Yang berbeda cuma apakah hasil yang sudah dihitung")
print("  DISIMPAN.")
print("")
print("  Tanpa tabel, banyaknya panggilan tumbuh seperti F(n)")
print("  sendiri -- eksponensial. Dengan tabel, tiap n dihitung")
print("  sekali, jadi linear.")
print("")
print("  Ini hubungan langsung antara relasi rekurens dan")
print("  pemrograman: bentuk rekurens memberi tahu berapa kali")
print("  submasalah yang sama akan muncul, dan dari situ")
print("  terlihat apakah menyimpannya berharga.")

# --------------------------------------------
# 7. Rekurens pembagian: pola divide and conquer
# --------------------------------------------
print("")
print("--- rekurens pembagian ---")
BENTUK = [
    ("T(n) = T(n/2) + 1",       "O(log n)", "pencarian biner"),
    ("T(n) = 2T(n/2) + n",      "O(n log n)", "merge sort"),
    ("T(n) = 2T(n/2) + 1",      "O(n)", "telusur pohon biner"),
    ("T(n) = T(n-1) + n",       "O(n^2)", "selection sort"),
    ("T(n) = 2T(n-1) + 1",      "O(2^n)", "Menara Hanoi"),
]
print("  " + "rekurens".ljust(22) + "penyelesaian".ljust(13)
      + "contoh")
for a_, b_, c_ in BENTUK:
    print("  " + a_.ljust(22) + b_.ljust(13) + c_)
print("")

def hitung_membagi(n, tambah_n):
    """Jumlah kerja untuk T(n) = 2T(n/2) + f(n)."""
    kerja = 0
    ukuran = [n]
    while ukuran and ukuran[0] >= 1:
        kerja += sum(u if tambah_n else 1 for u in ukuran)
        ukuran = [u // 2 for u in ukuran for _ in (0, 1)
                  if u // 2 >= 1]
    return kerja

print("  Uji baris kedua, T(n) = 2T(n/2) + n :")
print("  " + "n".rjust(8) + "kerja".rjust(12)
      + "n log2(n)".rjust(13) + "  rasio")
for n in (16, 64, 256, 1024):
    k = hitung_membagi(n, True)
    acuan = n * math.log2(n)
    print("  " + str(n).rjust(8) + str(k).rjust(12)
          + ("%.0f" % acuan).rjust(13)
          + ("  %.2f" % (k / acuan)))
print("")
print("  Rasionya mendekati tetap, dan itulah arti O(n log n):")
print("  bukan sama dengan n log n, melainkan tumbuh SEBANDING")
print("  dengannya.")
print("")
print("  Perhatikan dua baris terakhir tabel bentuk. Keduanya")
print("  MENGURANGI n satu per satu, bukan membaginya -- dan")
print("  akibatnya jauh lebih berat. Membagi memberi log n")
print("  tingkat; mengurangi memberi n tingkat.")` },
  output: `--- kenapa mencoba banyak kasus tidak cukup ---
  Dugaan: n^2 + n + 41 selalu menghasilkan bilangan prima.

     n   n^2+n+41   prima?
     0         41       ya
     1         43       ya
     2         47       ya
     5         71       ya
    10        151       ya
    20        461       ya
    35       1301       ya
    39       1601       ya
    40       1681    TIDAK
    41       1763    TIDAK

  Gagal pertama di n = 40, nilainya 1681
  1681 = 41 x 41

  Empat puluh kasus pertama benar SEMUA. Kalau kamu
  menguji sampai n = 39 lalu menyimpulkan dugaanmu benar,
  kesimpulanmu SALAH -- dan tidak ada satu pun tanda
  bahwa ia salah dalam pengujianmu.

  Ini yang membuat induksi matematika bukan formalitas.
  Ia satu-satunya cara menyatakan sesuatu berlaku untuk
  SELURUH n, karena n-nya tak berhingga banyaknya dan
  pengujian selalu berhenti di suatu tempat.

--- dua langkah, dan kenapa dua-duanya wajib ---
  Basis
      buktikan benar untuk n terkecil
      biasanya n = 0 atau n = 1
  Langkah induktif
      andaikan benar untuk n, buktikan n+1
      yang dibuktikan: IMPLIKASINYA, bukan pernyataannya

  Gambarannya: deretan domino tak berujung.

  Langkah induktif memastikan tiap domino menjatuhkan
  yang berikutnya. Basis mendorong domino PERTAMA.

  Tanpa basis, kamu punya rantai sempurna yang tidak
  pernah mulai. Ada pernyataan yang langkah induktifnya
  benar tetapi pernyataannya salah untuk semua n --
  karena tidak ada satu pun n yang bisa jadi titik awal.

--- memeriksa rumus yang SUDAH dibuktikan ---
  rumus                 diuji n=1..200  cocok?
  1+2+...+n                  200 nilai  YA
  1+3+5+...+(2n-1)           200 nilai  YA
  1^2+2^2+...+n^2            200 nilai  YA
  2^0+2^1+...+2^n            200 nilai  YA

  Perhatikan judulnya: memeriksa rumus yang SUDAH
  dibuktikan. Uji numerik berguna untuk menangkap salah
  TULIS -- bukan untuk menggantikan buktinya.

  Urutan yang benar: buktikan dengan induksi, lalu uji
  dengan kode. Kalau ujinya gagal, yang salah biasanya
  ketikanmu, dan menemukannya jadi murah.

--- Menara Hanoi: T(n) = 2T(n-1) + 1 ---
     n  langkah nyata     2^n - 1  cocok?
     1              1           1  ya
     2              3           3  ya
     3              7           7  ya
     4             15          15  ya
     5             31          31  ya
     6             63          63  ya
    12           4095        4095  ya

  Rekurensnya dibaca dari cara kerjanya: untuk memindah n
  cakram, pindahkan n-1 ke tiang bantu, pindahkan yang
  terbesar (1 langkah), lalu pindahkan n-1 itu ke tujuan.

  T(n) = 2T(n-1) + 1, dengan T(0) = 0.

  Membukanya: T(n) = 2(2T(n-2)+1)+1 = 4T(n-2)+2+1
            = 8T(n-3)+4+2+1 = ... = 2^n - 1

  Kolom terakhir kosong dari kata TIDAK, dan itu bukti
  praktis bahwa penurunannya tidak salah ketik.

--- menyelesaikan a(n) = 5a(n-1) - 6a(n-2) ---
  syarat awal: a(0) = 1, a(1) = 5

  akar persamaan karakteristik x^2 - 5x + 6 = 0 : 2 dan 3
  bentuk umum : a(n) = A.2^n + B.3^n
  dari syarat awal : A = -2, B = 3

     n     iterasi   rumus tutup  cocok?
     0           1             1  ya
     1           5             5  ya
     2          19            19  ya
     3          65            65  ya
     4         211           211  ya
     5         665           665  ya
     6        2059          2059  ya
    14    14316139      14316139  ya

  cocok untuk seluruh n = 0..14 : YA

  Gunanya bentuk tutup: menghitung a(1000) tanpa melewati
  seribu langkah. Dan lebih penting, ia menunjukkan LAJU
  tumbuhnya -- di sini 3^n, karena akar terbesarnya 3.

  Untuk analisis algoritma, laju itulah yang dicari. Akar
  terbesar persamaan karakteristik langsung memberi
  jawabannya tanpa perlu menghitung satu nilai pun.

--- Fibonacci: rekursi telanjang vs bertabel ---
     n      F(n)  panggilan naif   bertabel  rasio
    10        55             177         19  9x
    20      6765          21.891         39  561x
    25     75025         242.785         49  4955x
    30    832040       2.692.537         59  45636x

  Rekurensnya sama persis: F(n) = F(n-1) + F(n-2).
  Yang berbeda cuma apakah hasil yang sudah dihitung
  DISIMPAN.

  Tanpa tabel, banyaknya panggilan tumbuh seperti F(n)
  sendiri -- eksponensial. Dengan tabel, tiap n dihitung
  sekali, jadi linear.

  Ini hubungan langsung antara relasi rekurens dan
  pemrograman: bentuk rekurens memberi tahu berapa kali
  submasalah yang sama akan muncul, dan dari situ
  terlihat apakah menyimpannya berharga.

--- rekurens pembagian ---
  rekurens              penyelesaian contoh
  T(n) = T(n/2) + 1     O(log n)     pencarian biner
  T(n) = 2T(n/2) + n    O(n log n)   merge sort
  T(n) = 2T(n/2) + 1    O(n)         telusur pohon biner
  T(n) = T(n-1) + n     O(n^2)       selection sort
  T(n) = 2T(n-1) + 1    O(2^n)       Menara Hanoi

  Uji baris kedua, T(n) = 2T(n/2) + n :
         n       kerja    n log2(n)  rasio
        16          80           64  1.25
        64         448          384  1.17
       256        2304         2048  1.12
      1024       11264        10240  1.10

  Rasionya mendekati tetap, dan itulah arti O(n log n):
  bukan sama dengan n log n, melainkan tumbuh SEBANDING
  dengannya.

  Perhatikan dua baris terakhir tabel bentuk. Keduanya
  MENGURANGI n satu per satu, bukan membaginya -- dan
  akibatnya jauh lebih berat. Membagi memberi log n
  tingkat; mengurangi memberi n tingkat.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Verifikasi rumus untuk n = 1..N', waktu: 'O(N)', memori: 'menangkap salah tulis, bukan salah logika' },
      { operasi: 'Menara Hanoi, simulasi', waktu: 'O(2^n)', memori: 'O(n) untuk tumpukan rekursi' },
      { operasi: 'Fibonacci rekursif tanpa tabel', waktu: 'O(1,6^n)', memori: 'O(n) kedalaman' },
      { operasi: 'Fibonacci dengan memoisasi', waktu: 'O(n)', memori: 'O(n) untuk tabelnya' },
      { operasi: 'Selesaikan rekurens linear', waktu: 'O(1)', memori: 'cari akar persamaan karakteristik' },
      { operasi: 'Hitung a(n) dari rumus tutup', waktu: 'O(log n)', memori: 'dengan pemangkatan cepat' }
    ],
    intuisi: `Baris ketiga dan keempat yang paling berharga di tabel ini, dan keduanya menghitung **rekurens yang sama**. Selisih \`O(1,6^n)\` dan \`O(n)\` datang bukan dari matematikanya, melainkan dari satu keputusan menyimpan hasil.

Baris kelima yang paling mengejutkan: menyelesaikan relasi rekurens linear berbiaya \`O(1)\` — cukup mencari akar persamaan karakteristik, dan itu selesai di kertas. Kamu mendapat laju tumbuh untuk seluruh n tanpa menjalankan satu iterasi pun.

Ini kebalikan dari cara banyak orang menaksir biaya algoritme: menjalankan untuk beberapa n lalu menggambar grafiknya. Cara itu memberi angka, tetapi tidak memberi **kepastian**, dan seperti bagian pertama topik ini menunjukkan, angka dari beberapa kasus bisa menyesatkan sepenuhnya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menyimpulkan sebuah rumus benar karena berhasil untuk banyak kasus yang diuji.',
      kenapa: 'Pengujian selalu berhenti di suatu tempat sementara pernyataannya berlaku untuk n tak berhingga. Ada dugaan yang benar untuk empat puluh kasus pertama lalu gagal, dan tidak ada tanda apa pun dalam kasus yang lolos yang bisa memperingatkannya.',
      benar: 'Buktikan dengan induksi yang memeriksa strukturnya, lalu pakai pengujian numerik hanya untuk menangkap salah tulis.'
    },
    {
      salah: 'Menulis langkah induktif saja tanpa membuktikan basisnya.',
      kenapa: 'Langkah induktif hanya membuktikan bahwa satu kasus menjatuhkan kasus berikutnya, sehingga tanpa titik awal rantainya tidak pernah dimulai. Ada pernyataan yang langkah induktifnya benar tetapi pernyataannya salah untuk semua n.',
      benar: 'Buktikan basis untuk nilai terkecil secara eksplisit, dan tuliskan sebagai langkah tersendiri.'
    },
    {
      salah: 'Menganggap langkah induktif berarti mengandaikan yang mau dibuktikan.',
      kenapa: 'Yang dibuktikan pada langkah induktif adalah implikasinya, yaitu bahwa kebenaran untuk n memaksa kebenaran untuk n+1. Implikasi itu bisa dibuktikan tanpa mengetahui apakah kedua sisinya benar.',
      benar: 'Rumuskan langkah induktif sebagai pembuktian implikasi, dan pisahkan dengan jelas dari pernyataan yang sedang dibuktikan.'
    },
    {
      salah: 'Berhenti pada pola yang muncul saat membuka rekurens dan menganggapnya sudah terbukti.',
      kenapa: 'Membuka rekurens beberapa langkah hanya memperlihatkan pola pada langkah-langkah itu, sama seperti menguji beberapa kasus. Pola bisa berubah pada langkah yang belum dibuka, terutama bila rekurensnya punya kasus khusus.',
      benar: 'Pakai pola yang muncul sebagai dugaan bentuk tutup, lalu buktikan dugaan itu dengan induksi.'
    },
    {
      salah: 'Menambahkan memoisasi ke setiap fungsi rekursif karena selalu mempercepat.',
      kenapa: 'Memoisasi hanya menolong bila submasalah yang sama muncul berulang, dan pada algoritme yang memecah data menjadi bagian yang tidak tumpang tindih hal itu tidak terjadi. Tabelnya lalu memakan memori tanpa menghemat satu pun perhitungan.',
      benar: 'Bandingkan jumlah submasalah berbeda dengan jumlah pemanggilan lebih dulu, dan pasang memoisasi hanya bila selisihnya besar.'
    },
    {
      salah: 'Menganggap rekurens yang membagi n dan yang mengurangi n punya biaya sebanding.',
      kenapa: 'Membagi dua memberi kedalaman rekursi sekitar log n, sementara mengurangi satu memberi kedalaman n. Dengan percabangan dua, kedalaman itu masuk sebagai eksponen, sehingga selisihnya berupa perbedaan kelas dan bukan perbedaan tetapan.',
      benar: 'Periksa lebih dulu apakah ukuran masalahnya dibagi atau dikurangi, dan perlakukan perubahan dari mengurangi menjadi membagi sebagai perbaikan kelas.'
    },
    {
      salah: 'Menaksir laju tumbuh algoritme dengan menjalankannya untuk beberapa ukuran lalu menggambar grafiknya.',
      kenapa: 'Beberapa titik pengukuran bisa cocok dengan banyak kurva yang berbeda, terutama bila ukurannya masih kecil dan efek tetapan masih besar. Kurva yang benar baru terpisah pada ukuran yang jauh lebih besar daripada yang bisa diuji.',
      benar: 'Turunkan relasi rekurens dari struktur kodenya lalu selesaikan, dan pakai pengukuran hanya untuk memeriksa kesesuaiannya.'
    }
  ],

  analogi: `Bayangkan kamu **menaiki tangga yang tidak kelihatan ujungnya**, dan ingin memastikan bisa mencapai anak tangga mana pun.

Kamu perlu dua hal, dan cuma dua.

**Pertama**: bisa naik ke anak tangga pertama. **Kedua**: dari anak tangga mana pun, bisa naik ke yang berikutnya.

Kalau keduanya benar, kamu bisa mencapai anak tangga ke sejuta — tanpa pernah menaikinya, dan tanpa perlu tahu berapa jumlah seluruh anak tangganya.

Itu induksi, dan perhatikan kenapa **dua-duanya** wajib.

Bayangkan tangga yang anak tangga pertamanya hilang, tetapi seluruh sisanya berjarak wajar. Syarat kedua terpenuhi sempurna. Dan kamu tidak bisa naik satu langkah pun.

**Sekarang bandingkan dengan cara lain memastikannya.**

Kamu menaiki anak tangga satu per satu untuk membuktikan tangganya kuat. Empat puluh anak tangga, semuanya kokoh. Kamu menyimpulkan tangganya aman.

Anak tangga ke-41 patah.

Dan tidak ada satu pun dari empat puluh anak tangga sebelumnya yang berderit, bergoyang, atau memberi tanda. Cacatnya bukan pada keausan yang bertambah; ia pada **satu anak tangga yang dibuat berbeda** — dan hanya bisa diketahui dengan memeriksa rancangannya, bukan dengan menaikinya.

**Sekarang bagian rekurens.**

Kamu diminta memindahkan tumpukan piring ke rak lain, satu per satu, dan piring besar tidak boleh ditumpuk di atas piring kecil.

Kamu tidak perlu memikirkan seluruh urutannya. Cukup satu kalimat: *"untuk memindahkan n piring, pindahkan n-1 piring ke rak bantu, pindahkan piring terbesar, lalu pindahkan n-1 piring itu ke tujuan."*

Dari kalimat itu, jumlah langkahnya sudah bisa dihitung tanpa memindahkan apa pun: dua kali pekerjaan n-1, ditambah satu.

Untuk 10 piring: 1.023 langkah. Untuk 20: lebih dari sejuta. Untuk 64 — angka yang kalau satu langkah sedetik, memakan waktu jauh melampaui umur alam semesta.

**Terakhir, dan ini yang paling terpakai.**

Bayangkan kamu diminta menghitung total belanja bulanan keluarga selama setahun. Kamu bertanya ke ibumu, yang menghitungnya dengan menjumlahkan belanja mingguan. Untuk setiap minggu, ia bertanya ke kakakmu, yang menjumlahkan belanja harian.

Sekarang perhatikan: **hari Selasa minggu kedua ditanyakan berkali-kali** — sekali untuk hitungan minggu kedua, dan sekali lagi setiap kali ada yang menghitung ulang minggu itu.

Kalau tidak ada yang **mencatat** jawabannya, seluruh keluarga akan menghitung hari yang sama berulang-ulang. Kalau ada satu papan tulis tempat setiap jawaban ditulis, tiap hari dihitung sekali dan dibaca sesudahnya.

Papan tulis itu memoisasi. Dan selisihnya, pada Fibonacci ke-30, adalah 2,7 juta pertanyaan lawan 59.`,

  latihan: [
    'Hitung n^2 + n + 41 untuk n = 0 sampai 45 dan tandai yang tidak prima, lalu jelaskan sebabnya secara aljabar.',
    'Buktikan dengan induksi bahwa jumlah n bilangan ganjil pertama sama dengan n kuadrat, lengkap dengan basis dan langkah induktifnya.',
    'Cari satu pernyataan yang langkah induktifnya benar tetapi pernyataannya salah, lalu tunjukkan di mana basisnya gagal.',
    'Uji empat rumus penjumlahan dengan kode untuk dua ratus nilai n, lalu jelaskan apa yang bisa dan tidak bisa disimpulkan dari hasilnya.',
    'Tulis relasi rekurens untuk tiga fungsi rekursif dari kodemu sendiri, tanpa menjalankannya.',
    'Buka rekurens Menara Hanoi dengan substitusi berulang sampai polanya muncul, lalu buktikan bentuk tutupnya dengan induksi.',
    'Selesaikan a(n) = 3a(n-1) - 2a(n-2) dengan a(0) = 2 dan a(1) = 3 lewat persamaan karakteristik, lalu verifikasi dengan iterasi.',
    'Pasang pencacah pada Fibonacci rekursif, jalankan untuk n = 10 sampai 30, dan bandingkan pertumbuhannya dengan F(n) itu sendiri.',
    'Cari satu algoritme rekursif yang memoisasinya TIDAK menolong, lalu jelaskan kenapa dengan melihat tumpang tindih submasalahnya.',
    'Untuk lima bentuk rekurens di tabel, jelaskan mana yang membagi dan mana yang mengurangi ukuran masalahnya, beserta akibatnya pada kedalaman rekursi.'
  ]
});


TOPICS.push({
  id: 'matdis-teori-bilangan',
  judul: 'Teori Bilangan: Euclid, Modulo & RSA',
  kategori: 'matematika-diskrit',
  tag: ['teori bilangan', 'FPB', 'algoritme Euclid', 'kongruensi', 'invers modulo', 'keprimaan', 'RSA'],
  ringkas: 'Dua puluh tujuh langkah lawan tiga ratus ribu — jawabannya sama persis.',

  fungsi: `**Bekerja dengan bilangan bulat dan sisa pembagian — dasar yang menopang hash, check digit, dan seluruh kriptografi kunci publik.**

Terpakai di:

- **Aritmetika modulo** yang muncul di mana-mana: indeks melingkar, tabel hash, jam, penjadwalan berulang
- **Memahami RSA** dari dalam, bukan sebagai kotak hitam — dan program di topik ini menjalankannya sungguhan
- **Check digit** pada NIK, kartu kredit, dan ISBN, yang seluruhnya aritmetika modulo
- **Menghindari bug lintas bahasa** pada operasi modulo bilangan negatif — Python dan C memberi jawaban berbeda
- **Membangkitkan bilangan acak semu**, yang inti pembangkitnya adalah kongruensi linear

Yang paling sering mengejutkan: **algoritme Euclid menyelesaikan FPB dua bilangan enam angka dalam 27 langkah**, sementara mencoba pembagi satu per satu butuh lebih dari tiga ratus ribu. Selisihnya bukan optimasi — ia perbedaan kelas.

Dan gagasan yang menopang seluruh kriptografi modern: **memfaktorkan bukan hal yang mustahil, ia cuma mahal.** Caranya ada, sederhana, dan bisa ditulis dalam lima baris. Yang melindungi RSA cuma biaya menjalankannya.`,
  praktik: {
    tujuan: 'Kamu bisa menghitung FPB dengan Euclid dan versi diperluasnya, mencari invers modulo, memangkatkan secara modular dengan cepat, dan menjalankan RSA kecil dari awal sampai pesan kembali utuh.',
    alat: ['Python (seluruhnya cukup dengan pustaka bawaan)', 'Kertas untuk menurunkan Bezout dengan tangan', 'Satu bahasa lain untuk membandingkan perilaku operator modulo'],
    langkah: [
      { judul: 'Periksa perilaku modulo di dua bahasa berbeda',
        isi: `Hitung \`-17 % 5\` di Python, lalu di C, Java, atau JavaScript.

Python memberi **3**; ketiganya memberi **-2**. Keduanya konsisten dengan \`a = bq + r\`, tetapi memilih q yang berbeda.

Sebelum memindahkan kode hash atau kriptografi antar bahasa, periksa ini. Bug-nya cuma muncul untuk masukan negatif, dan karena itu lolos hampir semua pengujian.` },
      { judul: 'Bandingkan Euclid dengan cara naif',
        isi: `Tulis dua fungsi FPB: satu dengan Euclid, satu dengan mencoba pembagi dari yang terbesar. Pasang pencacah langkah di keduanya.

Jalankan pada bilangan enam angka. Selisihnya ribuan kali, dan jawabannya sama — itu cara paling langsung merasakan apa arti perbedaan kelas kompleksitas.` },
      { judul: 'Uji Euclid pada kasus terburuknya',
        isi: `Pakai dua bilangan Fibonacci berurutan, misalnya 514229 dan 317811.

Itu **kasus terburuk** bagi Euclid: tiap langkah cuma mengurangi sekali, bukan memotong. Dan bahkan di situ ia cuma butuh 27 langkah. Bandingkan dengan 99991 dan 99989 yang seukuran tetapi selesai dalam 3 langkah.` },
      { judul: 'Turunkan identitas Bezout dengan Euclid diperluas',
        isi: `Untuk tiap pasangan, cari x dan y sehingga \`ax + by = FPB(a,b)\`.

Lalu **verifikasi**: hitung \`ax + by\` dan bandingkan dengan FPB-nya. Kalau cocok untuk semua pasangan, implementasimu benar.` },
      { judul: 'Cari invers modulo dan temukan polanya sendiri',
        isi: `Untuk setiap \`a\` dari 1 sampai 11, cari inversnya modulo 12. Catat mana yang punya dan mana yang tidak.

Bandingkan dengan \`FPB(a, 12)\`. Polanya akan langsung terlihat: **invers ada tepat ketika FPB-nya 1** — dan itu akibat langsung dari Bezout.` },
      { judul: 'Tulis pemangkatan modular yang cepat',
        isi: `Kuadratkan berulang, kalikan hanya saat bit eksponennya 1, dan ambil sisa modulo **di setiap langkah**.

Untuk \`123^65537 mod 999983\` ia butuh 19 perkalian, bukan 65.537. Dan tanpa mengambil sisa tiap langkah, bilangan antaranya akan berukuran ratusan ribu angka.` },
      { judul: 'Jalankan uji Fermat, lalu cari bilangan yang menipunya',
        isi: `Uji 561, 1105, 1729, dan 2465. Keempatnya **lolos** uji Fermat basis 2, dan keempatnya tidak prima.

Ini bukan bug di implementasimu — itu memang sifat ujinya. Setelah melihatnya, kata "uji keprimaan probabilistik" berhenti terasa seperti sekadar istilah.` },
      { judul: 'Bangun RSA kecil dan buktikan pesannya kembali utuh',
        isi: `Pakai p = 61, q = 53. Hitung n, phi(n), pilih e = 17, cari d sebagai invers e modulo phi.

Lalu sandikan beberapa pesan dan buka kembali. Kalau semuanya kembali utuh, kamu baru saja menjalankan RSA dari awal — dan seluruh bahannya cuma FPB, invers modulo, dan pemangkatan cepat.` }
    ],
    cek: [
      'Kamu tahu bedanya hasil operator modulo untuk bilangan negatif di Python dan di C',
      'Implementasi Euclid diperluasmu diverifikasi lewat ax + by, bukan diyakini',
      'Kamu bisa menjelaskan kenapa invers modulo ada tepat ketika FPB-nya satu',
      'RSA kecilmu mengembalikan seluruh pesan uji dengan utuh'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — Euclid, invers modulo, dan RSA yang benar-benar jalan',

  konsep: `Teori bilangan sering terlihat seperti cabang matematika murni yang paling jauh dari penerapan. Ia justru sebaliknya: hampir seluruh kriptografi yang menjaga lalu lintas internet berdiri di atas beberapa hasil di bab ini.

**Pembagian bulat, dan jebakan bilangan negatif**

| a | b | \`a//b\` | \`a%b\` | \`b*(a//b) + a%b\` |
|---|---|---|---|---|
| 17 | 5 | 3 | 2 | 17 |
| **-17** | **5** | **-4** | **3** | -17 |
| 17 | -5 | -4 | -3 | 17 |
| -17 | -5 | 3 | -2 | -17 |

Kolom terakhir selalu kembali ke \`a\` — itu definisinya, \`a = bq + r\`.

Perhatikan baris kedua. \`-17 % 5\` di Python bernilai **3**, bukan -2. Python menjaga sisa selalu bertanda sama dengan pembaginya, dan itu yang benar secara matematis untuk aritmetika modulo.

C, Java, dan JavaScript memberi **-2**. Keduanya konsisten dengan \`a = bq + r\`; yang berbeda pilihan \`q\`-nya.

Ini tempat bug yang paling sering muncul saat memindahkan kode hash atau kriptografi antar bahasa — dan paling sulit dilihat, karena hasilnya cuma salah untuk masukan negatif.

**Algoritme Euclid**

| a | b | FPB | Langkah Euclid | Langkah naif |
|---|---|---|---|---|
| 48 | 18 | 6 | 3 | 13 |
| 1.071 | 462 | 21 | 3 | 442 |
| 99.991 | 99.989 | 1 | 3 | 99.989 |
| 514.229 | 317.811 | 1 | **27** | **317.811** |

Kaidahnya satu baris: \`FPB(a, b) = FPB(b, a mod b)\`, berhenti saat b = 0.

Kenapa begitu cepat: tiap langkah menggantikan \`(a, b)\` dengan \`(b, a mod b)\`, dan \`a mod b\` selalu lebih kecil dari b. Ukurannya menyusut cepat — jumlah langkahnya sebanding dengan **jumlah angka**-nya, bukan dengan besar bilangannya.

Baris terakhir dipilih sengaja: 514229 dan 317811 adalah bilangan **Fibonacci berurutan**, dan pasangan Fibonacci adalah kasus **terburuk** bagi Euclid — di situ tiap langkah cuma mengurangi sekali, bukan memotong.

Bahkan pada kasus terburuknya, 27 langkah. Bandingkan dengan 99991 dan 99989 yang seukuran: cuma 3 langkah, karena bukan pasangan Fibonacci.

**Euclid yang diperluas: identitas Bezout**

Untuk setiap a dan b, ada bilangan bulat x dan y dengan:

\`ax + by = FPB(a, b)\`

| a | b | FPB | x | y | \`ax + by\` |
|---|---|---|---|---|---|
| 48 | 18 | 6 | -1 | 3 | 6 |
| 1.071 | 462 | 21 | -3 | 7 | 21 |
| **17** | **3.120** | 1 | **-367** | 2 | 1 |
| 240 | 46 | 2 | -9 | 47 | 2 |

Baris ketiga yang dipakai kriptografi: karena \`17 . (-367) + 3120 . 2 = 1\`, maka \`-367\` adalah **invers dari 17 modulo 3120**.

**Invers modulo: ada kapan, tidak ada kapan**

| a | FPB(a,12) | Invers mod 12 |
|---|---|---|
| 1 | 1 | 1 |
| 2 | 2 | tidak ada |
| 3 | 3 | tidak ada |
| 5 | 1 | 5 |
| 7 | 1 | 7 |
| 11 | 1 | 11 |

Hanya 4 dari 11 bilangan yang punya invers, dan polanya tepat: **invers ada jika dan hanya jika FPB(a, m) = 1.**

Alasannya langsung dari Bezout. Kalau FPB-nya 1, ada x dan y dengan \`ax + my = 1\`, sehingga \`ax = 1 - my\` — artinya \`ax\` bersisa 1 saat dibagi m, dan itu definisi invers.

Kalau FPB-nya lebih dari 1, **tidak ada** kombinasi \`ax + my\` yang bisa bernilai 1 sama sekali, karena setiap kombinasi seperti itu habis dibagi FPB-nya.

**Pemangkatan modular yang cepat**

| Perhitungan | Hasil | Perkalian | Cara naif |
|---|---|---|---|
| \`7^10 mod 13\` | 4 | 6 | 10 |
| \`2^1000 mod 1009\` | 942 | 16 | 1.000 |
| \`123^65537 mod 999983\` | 962283 | **19** | **65.537** |

Caranya: kuadratkan berulang, dan kalikan hanya saat bit eksponennya bernilai 1.

65537 dalam biner adalah \`10000000000000001\` — panjangnya 17 bit dan hanya **2** bit yang bernilai 1. Jadi biayanya 17 pengkuadratan ditambah 2 perkalian, yaitu 19.

Angka 65537 dipilih sebagai eksponen RSA justru karena bentuk binernya seramping ini.

Dan yang sama pentingnya: **sisa modulo diambil di setiap langkah**. Tanpa itu, \`123^65537\` akan menjadi bilangan ratusan ribu angka sebelum dibagi — hasil akhirnya benar, tetapi memakan waktu dan memori tanpa alasan.

**Uji keprimaan yang bisa tertipu**

| n | Prima? | Uji Fermat basis 2 |
|---|---|---|
| 97 | ya | lolos |
| **561** | **tidak** | **lolos** |
| **1.105** | **tidak** | **lolos** |
| **1.729** | **tidak** | **lolos** |
| 7.919 | ya | lolos |

561 = 3 x 11 x 17, jelas bukan prima — dan uji Fermat basis 2 tidak menyadarinya sama sekali.

Bilangan seperti ini disebut **bilangan Carmichael**: ia lolos uji Fermat untuk hampir semua basis padahal tidak prima.

Yang dipakai di kenyataan, **Miller-Rabin**, memperbaikinya dengan menguji banyak basis sekaligus sehingga peluang tertipu bisa ditekan sekecil yang diinginkan — tetapi **tidak nol**. Uji keprimaan cepat memberi jawaban probabilistik, dan itu penting disadari saat membaca dokumentasi pustaka kripto.

**RSA kecil, dijalankan sungguhan**

Dengan p = 61 dan q = 53:

- \`n = p x q = 3233\`
- \`phi(n) = (p-1)(q-1) = 3120\`
- \`e = 17\`, dipilih karena \`FPB(17, 3120) = 1\`
- \`d = 2753\`, invers 17 modulo 3120 — dan \`17 x 2753 mod 3120 = 1\`

Kunci **publik**: \`(n = 3233, e = 17)\`. Kunci **privat**: \`(n = 3233, d = 2753)\`.

| Pesan | Disandi | Dibuka |
|---|---|---|
| 65 | 2790 | 65 |
| 123 | 855 | 123 |
| 999 | 2464 | 999 |
| 3000 | 1780 | 3000 |

Seluruh pesan kembali utuh. Dan perhatikan bahan yang dipakai: **cuma FPB, invers modulo, dan pemangkatan modular** — ketiganya ada di bab ini.

Yang menyandikan cukup punya \`(n, e)\`, dan keduanya boleh disebar terbuka. Yang membuka butuh \`d\`; \`d\` dihitung dari \`phi(n)\`; dan \`phi(n)\` butuh \`p\` dan \`q\`.

Jadi seluruh keamanannya bergantung pada satu hal: **memfaktorkan n kembali menjadi p dan q.**

**Kenapa bilangannya harus besar**

| n | Angka | Percobaan pembagian | Naik |
|---|---|---|---|
| 3.233 | 4 | 52 | — |
| 10.403 | 5 | 100 | 2x |
| 9.036.011 | 7 | 3.000 | 30x |
| 99.400.891 | 8 | 9.966 | 3x |
| 1.000.036.000.099 | 13 | 1.000.002 | 100x |

Usahanya tumbuh seperti **akar dari n**. Jadi tiap kali jumlah angka n bertambah dua, usaha memfaktorkannya bertambah sekitar sepuluh kali.

RSA nyata memakai n sekitar 617 angka desimal (2048 bit). Dengan pertumbuhan itu, percobaan pembagian tidak akan pernah selesai — dan metode terbaik yang dikenal pun masih jauh di luar jangkauan.

Perhatikan bentuk argumennya, karena ia berlaku untuk hampir seluruh kriptografi: **keamanannya bukan karena tidak ada cara memfaktorkan.** Caranya ada, dan sederhana. Yang melindungi cuma **biaya** menjalankannya.

Dan itu berarti keamanannya bisa berubah — bukan kalau matematikanya salah, melainkan kalau ada yang menemukan cara memfaktorkan yang jauh lebih murah.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: 'def fpb_euclid(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\n#        a        b   FPB   Euclid       naif\n#       48       18     6        3         13\n#     1071      462    21        3        442\n#    99991    99989     1        3     99.989\n#   514229   317811     1       27    317.811\n#\n# Baris terakhir: pasangan Fibonacci = kasus TERBURUK.\n# Bahkan di situ cuma 27 langkah.\n#\n# 99991 & 99989 seukuran -> cuma 3 langkah.',
      penjelasan: `Empat baris kode yang berumur lebih dari dua ribu tahun, dan masih dipakai persis seperti aslinya di setiap pustaka kriptografi hari ini.

Mulai dari kenapa ia benar. Kaidahnya: \`FPB(a, b) = FPB(b, a mod b)\`.

Alasannya bisa dilihat langsung. Kalau sebuah bilangan d membagi habis a dan b, maka ia juga membagi habis \`a - kb\` untuk k berapa pun — dan \`a mod b\` tepat berbentuk itu. Jadi setiap pembagi bersama \`(a, b)\` juga pembagi bersama \`(b, a mod b)\`, dan sebaliknya juga berlaku.

Kedua pasangan punya **himpunan pembagi bersama yang sama persis**. Jadi FPB-nya pasti sama, dan penggantian itu tidak kehilangan apa pun.

Sekarang kenapa ia cepat.

Setiap langkah, angka yang lebih besar dibuang dan digantikan sisanya. Dan sisa selalu lebih kecil dari pembaginya. Jadi bilangannya menyusut, dan yang menarik: **menyusutnya cepat**.

Bisa dibuktikan bahwa dua langkah Euclid memotong bilangan menjadi kurang dari separuh. Karena itu jumlah langkahnya sebanding dengan jumlah **bit** bilangannya, bukan besarnya.

Untuk bilangan 2048 bit — ukuran kunci RSA nyata — itu berarti paling banyak beberapa ribu langkah. Selesai dalam sepersekian detik.

**Sekarang bandingkan dengan cara naif**, karena di situ pelajarannya.

Cara naif mencoba tiap kandidat pembagi dari yang terbesar sampai ketemu. Untuk 99991 dan 99989 yang FPB-nya 1, ia harus mencoba **seluruh** kandidat sampai turun ke 1 — 99.989 langkah.

Euclid: 3 langkah.

Perhatikan bahwa keduanya menghasilkan angka yang sama. Yang berbeda bukan hasilnya, melainkan bahwa Euclid **tidak pernah mencari** pembagi. Ia tidak menebak satu pun kandidat. Ia mempersempit persoalannya sampai jawabannya muncul sendiri.

Ini bentuk yang berulang di banyak algoritme baik: bukan mencari lebih cepat, melainkan **mengubah persoalannya menjadi persoalan yang lebih kecil** sampai jawabannya sepele.

**Sekarang baris terakhir tabel, yang paling instruktif.**

514229 dan 317811 adalah bilangan Fibonacci berurutan, dan itu **kasus terburuk** bagi Euclid.

Kenapa: pada pasangan Fibonacci, \`a mod b\` selalu menghasilkan bilangan Fibonacci sebelumnya — yang berarti tiap langkah cuma mundur **satu tingkat** dalam barisan, bukan memotong bilangan menjadi jauh lebih kecil.

Itu penyusutan paling lambat yang mungkin terjadi.

Dan hasilnya: 27 langkah untuk bilangan enam angka.

Bandingkan dengan 99991 dan 99989 yang seukuran tetapi bukan pasangan Fibonacci: 3 langkah.

Jadi kasus terburuk Euclid pun masih **lebih dari sebelas ribu kali** lebih sedikit langkahnya daripada cara naif. Ini yang membedakan algoritme yang benar-benar baik: bukan cuma cepat pada kasus yang menguntungkan, melainkan **tetap cepat pada kasus yang paling menyulitkannya**.

Dan ada satu hal yang rapi di sini: kasus terburuk Euclid ternyata dibangkitkan oleh barisan Fibonacci, yang muncul lagi di topik relasi rekurens. Itu bukan kebetulan — keduanya berpangkal pada rekurens \`x(n) = x(n-1) + x(n-2)\`, yang di sini muncul sebagai penyusutan paling lambat yang bisa terjadi.`
    },
    {
      bahasa: 'python',
      kode: '# RSA dengan p = 61, q = 53\n#\n#   n      = 61 x 53        = 3233\n#   phi(n) = 60 x 52        = 3120\n#   e      = 17             (FPB(17, 3120) = 1)\n#   d      = invers 17      = 2753\n#            17 x 2753 mod 3120 = 1\n#\n#   PUBLIK (3233, 17)      PRIVAT (3233, 2753)\n#\n#   pesan   disandi   dibuka\n#      65      2790       65\n#     123       855      123\n#     999      2464      999\n#\n# Bahannya cuma: FPB, invers modulo, pangkat modular.',
      penjelasan: `RSA yang benar-benar berjalan, dengan bilangan yang cukup kecil untuk diperiksa dengan tangan — dan seluruh bahannya sudah ada di bab ini.

**Kenapa ini bekerja**, dan urutannya penting.

Yang menyandikan menghitung \`c = m^e mod n\`. Yang membuka menghitung \`m = c^d mod n\`. Supaya keduanya saling membatalkan, dibutuhkan \`m^(ed) mod n = m\` untuk setiap m.

Dan itu dijamin kalau \`ed\` bersisa 1 saat dibagi \`phi(n)\` — yang persis cara d dipilih. Jadi d bukan bilangan ajaib; ia **invers modulo** dari e, dan mencarinya adalah pekerjaan Euclid diperluas dari bagian sebelumnya.

Perhatikan berapa sedikit bahan yang dipakai:

- **FPB** untuk memastikan e punya invers
- **Euclid diperluas** untuk menemukan d
- **pemangkatan modular cepat** untuk menyandikan dan membuka

Tidak ada satu pun yang datang dari luar bab ini.

**Sekarang di mana letak keamanannya**, dan ini bagian yang paling sering dipahami keliru.

Semua orang boleh tahu \`n = 3233\` dan \`e = 17\`. Itu kunci publik, dan memang untuk disebar.

Untuk membuka pesan, dibutuhkan \`d\`. Untuk menghitung \`d\`, dibutuhkan \`phi(n)\`. Dan untuk menghitung \`phi(n) = (p-1)(q-1)\`, dibutuhkan \`p\` dan \`q\`.

Jadi seluruh rantainya berakhir di satu pertanyaan: **bisakah n difaktorkan?**

Untuk n = 3233, tentu bisa — beberapa detik dengan tangan. Itu sebabnya contoh ini cuma untuk belajar.

**Dan sekarang bagian yang penting untuk dipahami dengan benar.**

Memfaktorkan **bukan** persoalan yang tidak ada penyelesaiannya. Kodenya lima baris: coba bagi dengan 2, 3, 4, dan seterusnya sampai akar n.

Yang melindungi RSA cuma **biaya** menjalankan lima baris itu.

Dan biayanya tumbuh seperti akar dari n. Untuk n 13 angka: sejuta pembagian, sepersekian detik. Untuk n 617 angka — ukuran RSA-2048 — jumlah pembagiannya melampaui jumlah atom di alam semesta yang teramati.

Perhatikan bentuk pernyataan ini. Ia bukan "tidak mungkin". Ia **"terlalu mahal"** — dan itu pernyataan yang bisa berubah.

Yang bisa mengubahnya ada tiga, dan ketiganya nyata:

**Pertama**, algoritme pemfaktoran yang lebih baik. Sudah terjadi berkali-kali: metode terbaik yang dikenal sekarang jauh lebih cepat daripada percobaan pembagian, dan itulah sebabnya kunci 512 bit yang dulu dianggap aman sekarang bisa dipecahkan.

**Kedua**, komputer yang lebih cepat. Ini yang paling lambat pengaruhnya, karena pertumbuhan akar berarti melipatgandakan kecepatan cuma menambah sedikit ke ukuran kunci yang bisa dipecahkan.

**Ketiga**, komputer kuantum, yang punya algoritme Shor — dan itu bukan sekadar lebih cepat, melainkan **kelas yang berbeda**. Kalau mesinnya pernah cukup besar, RSA berhenti aman bukan karena kunci kurang panjang, melainkan karena andaian dasarnya runtuh.

Karena itu bidang ini sudah bergerak ke kriptografi pasca-kuantum, yang bersandar pada persoalan lain yang tidak dipecahkan Shor.

**Satu hal terakhir yang layak diperhatikan.**

RSA yang dipakai sungguhan tidak menyandikan pesan langsung seperti di contoh ini. Ia menyandikan **kunci simetris**, dan pesannya diangkut dengan AES — karena RSA ratusan kali lebih lambat.

Dan pesan yang disandikan RSA selalu diberi **padding** acak lebih dulu. Tanpa itu, pesan yang sama selalu menghasilkan sandi yang sama, dan pesan pendek yang bisa ditebak — misalnya "ya" atau "tidak" — bisa dipecahkan dengan mencoba menyandikan semua kemungkinan dan mencocokkan.

Matematikanya benar; pemakaian yang naif tetap bisa membocorkan semuanya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Teori bilangan: Euclid, modulo, RSA kecil
# ============================================
from math import gcd

# --------------------------------------------
# 1. Pembagian bulat: hati-hati dengan negatif
# --------------------------------------------
print("--- div dan mod pada bilangan negatif ---")
print("  " + "a".rjust(5) + "b".rjust(4) + "a//b".rjust(7)
      + "a%b".rjust(6) + "   b*(a//b) + a%b")
for a, b in ((17, 5), (-17, 5), (17, -5), (-17, -5)):
    q, r = a // b, a % b
    print("  " + str(a).rjust(5) + str(b).rjust(4) + str(q).rjust(7)
          + str(r).rjust(6) + ("   %d" % (b * q + r)))
print("")
print("  Kolom terakhir selalu sama dengan a. Itu definisinya:")
print("  a = bq + r, dengan 0 <= r < |b|.")
print("")
print("  Perhatikan baris kedua. -17 % 5 di Python bernilai 3,")
print("  BUKAN -2. Python menjaga sisa selalu bertanda sama")
print("  dengan pembaginya, dan itu yang benar secara")
print("  matematis untuk aritmetika modulo.")
print("")
print("  Bahasa lain berbeda: C, Java, dan JavaScript memberi")
print("  -2 untuk kasus itu. Kalau kamu memindahkan kode hash")
print("  atau kode kriptografi antar bahasa, di sini tempat")
print("  bug yang paling sering muncul dan paling sulit")
print("  dilihat -- karena hasilnya cuma salah untuk masukan")
print("  negatif.")

# --------------------------------------------
# 2. Algoritme Euclid
# --------------------------------------------
print("")
print("--- FPB dengan Euclid vs mencoba satu per satu ---")
def fpb_euclid(a, b):
    langkah = 0
    while b:
        a, b = b, a % b
        langkah += 1
    return a, langkah

def fpb_naif(a, b):
    langkah = 0
    d = min(a, b)
    while d > 0:
        langkah += 1
        if a % d == 0 and b % d == 0:
            return d, langkah
        d -= 1
    return 1, langkah

PASANGAN = [(48, 18), (1071, 462), (99991, 99989),
            (514229, 317811)]
print("  " + "a".rjust(9) + "b".rjust(9) + "FPB".rjust(7)
      + "Euclid".rjust(9) + "naif".rjust(11))
for a, b in PASANGAN:
    g1, l1 = fpb_euclid(a, b)
    g2, l2 = fpb_naif(a, b)
    tanda = "" if g1 == g2 else "  BEDA!"
    print("  " + str(a).rjust(9) + str(b).rjust(9)
          + str(g1).rjust(7) + str(l1).rjust(9)
          + f"{l2:>11,}".replace(",", ".") + tanda)
a_, b_ = PASANGAN[-1]
_, le = fpb_euclid(a_, b_)
_, ln = fpb_naif(a_, b_)
print("")
print("  Baris terakhir: " + str(le) + " langkah lawan "
      + f"{ln:,}".replace(",", ".") + ".")
print("  Keduanya memberi jawaban yang sama, dan Euclid "
      + ("%.0f" % (ln / le)) + " kali")
print("  lebih sedikit langkahnya.")
print("")
print("  Kenapa Euclid begitu cepat: tiap langkah menggantikan")
print("  (a, b) dengan (b, a mod b), dan a mod b selalu lebih")
print("  kecil dari b. Ukurannya menyusut dengan cepat --")
print("  jumlah langkahnya sebanding dengan JUMLAH ANGKA-nya,")
print("  bukan dengan besarnya bilangan.")
print("")
print("  Dua bilangan itu 514229 dan 317811 dipilih sengaja:")
print("  keduanya bilangan Fibonacci berurutan, dan pasangan")
print("  Fibonacci adalah kasus TERBURUK bagi Euclid -- di situ")
print("  tiap langkah cuma mengurangi sekali, bukan memotong.")
print("")
print("  Perhatikan bahwa bahkan pada kasus terburuknya ia cuma")
print("  butuh " + str(le) + " langkah untuk bilangan enam angka.")
print("  Bandingkan dengan 99991 dan 99989 yang seukuran: cuma 3")
print("  langkah, karena keduanya BUKAN pasangan Fibonacci.")

# --------------------------------------------
# 3. Euclid yang diperluas: identitas Bezout
# --------------------------------------------
print("")
print("--- Euclid diperluas: cari x, y dengan ax + by = FPB ---")
def euclid_luas(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = euclid_luas(b, a % b)
    return g, y1, x1 - (a // b) * y1

print("  " + "a".rjust(7) + "b".rjust(7) + "FPB".rjust(6)
      + "x".rjust(8) + "y".rjust(8) + "   ax + by")
for a, b in ((48, 18), (1071, 462), (17, 3120), (240, 46)):
    g, x, y = euclid_luas(a, b)
    print("  " + str(a).rjust(7) + str(b).rjust(7) + str(g).rjust(6)
          + str(x).rjust(8) + str(y).rjust(8)
          + ("   %d" % (a * x + b * y)))
print("")
print("  Kolom terakhir selalu sama dengan kolom FPB, dan itu")
print("  bukti hitungannya benar.")
print("")
print("  Gunanya bukan sekadar keindahan. Baris ketiga itu yang")
print("  dipakai kriptografi: x = " + str(euclid_luas(17, 3120)[1])
      + " adalah INVERS dari 17")
print("  modulo 3120, karena 17x meninggalkan sisa 1 saat")
print("  dibagi 3120.")

# --------------------------------------------
# 4. Invers modulo: kapan ada, kapan tidak
# --------------------------------------------
print("")
print("--- invers modulo 12: yang punya dan yang tidak ---")
M = 12
print("  " + "a".rjust(4) + "FPB(a,12)".rjust(11)
      + "invers".rjust(9) + "   bukti")

def invers_mod(a, m):
    g, x, _ = euclid_luas(a, m)
    if g != 1:
        return None
    return x % m

punya = 0
for a in range(1, M):
    inv = invers_mod(a, M)
    if inv is None:
        print("  " + str(a).rjust(4) + str(gcd(a, M)).rjust(11)
              + "-".rjust(9) + "   tidak ada")
    else:
        punya += 1
        print("  " + str(a).rjust(4) + str(gcd(a, M)).rjust(11)
              + str(inv).rjust(9)
              + ("   %d x %d mod 12 = %d" % (a, inv, a * inv % M)))
print("")
print("  " + str(punya) + " dari " + str(M - 1)
      + " bilangan punya invers.")
print("")
print("  Polanya tepat: invers ADA jika dan hanya jika FPB(a, m)")
print("  = 1. Kolom kedua memisahkannya tanpa kecuali.")
print("")
print("  Alasannya langsung dari Bezout: kalau FPB-nya 1, ada x")
print("  dan y dengan ax + my = 1, sehingga ax = 1 - my, yang")
print("  berarti ax bersisa 1 saat dibagi m. Kalau FPB-nya lebih")
print("  dari 1, tidak ada kombinasi ax + my yang bisa bernilai")
print("  1 sama sekali -- karena keduanya selalu habis dibagi")
print("  FPB itu.")

# --------------------------------------------
# 5. Pemangkatan modular yang cepat
# --------------------------------------------
print("")
print("--- menghitung a^e mod m tanpa menghitung a^e ---")
def pangkat_mod(a, e, m):
    hasil, kali = 1, 0
    basis = a % m
    while e > 0:
        if e & 1:
            hasil = hasil * basis % m
            kali += 1
        basis = basis * basis % m
        kali += 1
        e >>= 1
    return hasil, kali

print("  " + "a^e mod m".ljust(22) + "hasil".rjust(9)
      + "perkalian".rjust(12) + "cara naif".rjust(12))
for a, e, m in ((7, 10, 13), (2, 1000, 1009),
                (123, 65537, 999983)):
    h, k = pangkat_mod(a, e, m)
    label = str(a) + "^" + str(e) + " mod " + str(m)
    print("  " + label.ljust(22) + str(h).rjust(9)
          + str(k).rjust(12)
          + f"{e:>12,}".replace(",", "."))
_, k_akhir = pangkat_mod(123, 65537, 999983)
print("")
print("  Baris terakhir: " + str(k_akhir)
      + " perkalian lawan 65.537.")
print("")
print("  Caranya: kuadratkan berulang, dan kalikan hanya saat")
print("  bit eksponennya bernilai 1.")
print("")
print("  65537 dalam biner: " + bin(65537)[2:])
print("  panjangnya " + str(65537 .bit_length()) + " bit, dan hanya "
      + str(bin(65537).count('1')) + " bit yang bernilai 1.")
print("")
print("  Jadi biayanya " + str(65537 .bit_length())
      + " pengkuadratan ditambah "
      + str(bin(65537).count('1')) + " perkalian")
print("  = " + str(k_akhir)
      + ". Angka 65537 dipilih sebagai eksponen RSA")
print("  justru karena bentuk binernya seramping ini.")
print("")
print("  Dan yang sama pentingnya: SETIAP langkah diambil sisa")
print("  modulo m. Tanpa itu, 123^65537 akan menjadi bilangan")
print("  ratusan ribu angka sebelum dibagi -- benar hasilnya,")
print("  tetapi memakan memori dan waktu tanpa alasan.")

# --------------------------------------------
# 6. Uji keprimaan: cepat tapi bisa tertipu
# --------------------------------------------
print("")
print("--- uji Fermat dan bilangan yang menipunya ---")
def prima_pasti(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

def uji_fermat(n, basis=2):
    if n < 2:
        return False
    return pow(basis, n - 1, n) == 1

print("  " + "n".rjust(7) + "prima?".rjust(9)
      + "Fermat basis 2".rjust(16) + "   catatan")
for n in (97, 561, 1105, 1729, 2465, 7919):
    p = prima_pasti(n)
    f = uji_fermat(n)
    if f and not p:
        catat = "   TERTIPU"
    else:
        catat = "   benar"
    print("  " + str(n).rjust(7) + ("ya" if p else "TIDAK").rjust(9)
          + ("lolos" if f else "gagal").rjust(16) + catat)
print("")
print("  Bilangan seperti 561, 1105, 1729, dan 2465 disebut")
print("  bilangan Carmichael: ia LOLOS uji Fermat untuk hampir")
print("  semua basis, padahal tidak prima.")
print("")
print("  561 = 3 x 11 x 17, jadi ia jelas bukan prima -- dan")
print("  uji Fermat basis 2 tidak menyadarinya sama sekali.")
print("")
print("  Ini bentuk keterbatasan yang penting dipahami: uji")
print("  cepat memberi jawaban PROBABILISTIK. Yang dipakai di")
print("  kenyataan, Miller-Rabin, memperbaikinya dengan menguji")
print("  banyak basis sekaligus sehingga peluang tertipu bisa")
print("  ditekan sekecil yang diinginkan -- tetapi tidak nol.")

# --------------------------------------------
# 7. RSA kecil, dijalankan sungguhan
# --------------------------------------------
print("")
print("--- RSA dengan bilangan kecil ---")
p, q = 61, 53
n = p * q
phi = (p - 1) * (q - 1)
e = 17
d = invers_mod(e, phi)
print("  p = " + str(p) + "   q = " + str(q))
print("  n = p x q = " + str(n))
print("  phi(n) = (p-1)(q-1) = " + str(phi))
print("  e = " + str(e) + "   (harus FPB(e, phi) = 1, dan itu "
      + str(gcd(e, phi)) + ")")
print("  d = invers e mod phi = " + str(d))
print("  bukti: " + str(e) + " x " + str(d) + " mod " + str(phi)
      + " = " + str(e * d % phi))
print("")
print("  kunci PUBLIK  : (n = " + str(n) + ", e = " + str(e) + ")")
print("  kunci PRIVAT  : (n = " + str(n) + ", d = " + str(d) + ")")
print("")
print("  " + "pesan".rjust(7) + "disandi".rjust(10)
      + "dibuka".rjust(9) + "  cocok?")
semua = True
for m in (65, 123, 999, 2790, 3000):
    c = pow(m, e, n)
    m2 = pow(c, d, n)
    if m2 != m:
        semua = False
    print("  " + str(m).rjust(7) + str(c).rjust(10)
          + str(m2).rjust(9)
          + ("  ya" if m2 == m else "  TIDAK"))
print("")
print("  seluruh pesan kembali utuh: " + ("YA" if semua else "TIDAK"))
print("")
print("  Perhatikan bahwa yang menyandikan cuma butuh (n, e) --")
print("  keduanya boleh disebar terbuka. Yang membuka butuh d,")
print("  dan d dihitung dari phi(n), dan phi(n) butuh p dan q.")
print("")
print("  Jadi seluruh keamanannya bergantung pada satu hal:")
print("  memfaktorkan n kembali menjadi p dan q.")

# --------------------------------------------
# 8. Kenapa bilangannya harus besar
# --------------------------------------------
print("")
print("--- memfaktorkan n: dari sekejap ke tak mungkin ---")
def bagi_coba(n_uji):
    t, d_ = 0, 2
    while d_ * d_ <= n_uji:
        t += 1
        if n_uji % d_ == 0:
            return t
        d_ += 1
    return t

SEMIPRIMA = [61 * 53, 101 * 103, 3001 * 3011,
             9967 * 9973, 1000003 * 1000033]
print("  " + "n".rjust(18) + "angka".rjust(7)
      + "pembagian".rjust(13) + "naik".rjust(8))
sebelum = None
for n_uji in SEMIPRIMA:
    t = bagi_coba(n_uji)
    naik = "-" if sebelum is None else ("%.0fx" % (t / sebelum))
    sebelum = t
    print("  " + f"{n_uji:>18,}".replace(",", ".")
          + str(len(str(n_uji))).rjust(7)
          + f"{t:>13,}".replace(",", ".") + naik.rjust(8))
print("")
print("  Kolom terakhir tumbuh seperti AKAR dari n. Jadi tiap")
print("  kali jumlah angka n bertambah dua, usaha memfaktorkannya")
print("  bertambah sekitar sepuluh kali.")
print("")
print("  RSA nyata memakai n sekitar 617 angka desimal (2048")
print("  bit). Dengan pertumbuhan itu, percobaan pembagian tidak")
print("  akan pernah selesai -- dan metode terbaik yang dikenal")
print("  pun masih jauh di luar jangkauan.")
print("")
print("  Perhatikan bentuk argumennya: keamanannya BUKAN karena")
print("  tidak ada cara memfaktorkan. Caranya ada, dan sederhana.")
print("  Yang melindungi cuma BIAYA menjalankannya.")` },
  output: `--- div dan mod pada bilangan negatif ---
      a   b   a//b   a%b   b*(a//b) + a%b
     17   5      3     2   17
    -17   5     -4     3   -17
     17  -5     -4    -3   17
    -17  -5      3    -2   -17

  Kolom terakhir selalu sama dengan a. Itu definisinya:
  a = bq + r, dengan 0 <= r < |b|.

  Perhatikan baris kedua. -17 % 5 di Python bernilai 3,
  BUKAN -2. Python menjaga sisa selalu bertanda sama
  dengan pembaginya, dan itu yang benar secara
  matematis untuk aritmetika modulo.

  Bahasa lain berbeda: C, Java, dan JavaScript memberi
  -2 untuk kasus itu. Kalau kamu memindahkan kode hash
  atau kode kriptografi antar bahasa, di sini tempat
  bug yang paling sering muncul dan paling sulit
  dilihat -- karena hasilnya cuma salah untuk masukan
  negatif.

--- FPB dengan Euclid vs mencoba satu per satu ---
          a        b    FPB   Euclid       naif
         48       18      6        3         13
       1071      462     21        3        442
      99991    99989      1        3     99.989
     514229   317811      1       27    317.811

  Baris terakhir: 27 langkah lawan 317.811.
  Keduanya memberi jawaban yang sama, dan Euclid 11771 kali
  lebih sedikit langkahnya.

  Kenapa Euclid begitu cepat: tiap langkah menggantikan
  (a, b) dengan (b, a mod b), dan a mod b selalu lebih
  kecil dari b. Ukurannya menyusut dengan cepat --
  jumlah langkahnya sebanding dengan JUMLAH ANGKA-nya,
  bukan dengan besarnya bilangan.

  Dua bilangan itu 514229 dan 317811 dipilih sengaja:
  keduanya bilangan Fibonacci berurutan, dan pasangan
  Fibonacci adalah kasus TERBURUK bagi Euclid -- di situ
  tiap langkah cuma mengurangi sekali, bukan memotong.

  Perhatikan bahwa bahkan pada kasus terburuknya ia cuma
  butuh 27 langkah untuk bilangan enam angka.
  Bandingkan dengan 99991 dan 99989 yang seukuran: cuma 3
  langkah, karena keduanya BUKAN pasangan Fibonacci.

--- Euclid diperluas: cari x, y dengan ax + by = FPB ---
        a      b   FPB       x       y   ax + by
       48     18     6      -1       3   6
     1071    462    21      -3       7   21
       17   3120     1    -367       2   1
      240     46     2      -9      47   2

  Kolom terakhir selalu sama dengan kolom FPB, dan itu
  bukti hitungannya benar.

  Gunanya bukan sekadar keindahan. Baris ketiga itu yang
  dipakai kriptografi: x = -367 adalah INVERS dari 17
  modulo 3120, karena 17x meninggalkan sisa 1 saat
  dibagi 3120.

--- invers modulo 12: yang punya dan yang tidak ---
     a  FPB(a,12)   invers   bukti
     1          1        1   1 x 1 mod 12 = 1
     2          2        -   tidak ada
     3          3        -   tidak ada
     4          4        -   tidak ada
     5          1        5   5 x 5 mod 12 = 1
     6          6        -   tidak ada
     7          1        7   7 x 7 mod 12 = 1
     8          4        -   tidak ada
     9          3        -   tidak ada
    10          2        -   tidak ada
    11          1       11   11 x 11 mod 12 = 1

  4 dari 11 bilangan punya invers.

  Polanya tepat: invers ADA jika dan hanya jika FPB(a, m)
  = 1. Kolom kedua memisahkannya tanpa kecuali.

  Alasannya langsung dari Bezout: kalau FPB-nya 1, ada x
  dan y dengan ax + my = 1, sehingga ax = 1 - my, yang
  berarti ax bersisa 1 saat dibagi m. Kalau FPB-nya lebih
  dari 1, tidak ada kombinasi ax + my yang bisa bernilai
  1 sama sekali -- karena keduanya selalu habis dibagi
  FPB itu.

--- menghitung a^e mod m tanpa menghitung a^e ---
  a^e mod m                 hasil   perkalian   cara naif
  7^10 mod 13                   4           6          10
  2^1000 mod 1009             942          16       1.000
  123^65537 mod 999983     962283          19      65.537

  Baris terakhir: 19 perkalian lawan 65.537.

  Caranya: kuadratkan berulang, dan kalikan hanya saat
  bit eksponennya bernilai 1.

  65537 dalam biner: 10000000000000001
  panjangnya 17 bit, dan hanya 2 bit yang bernilai 1.

  Jadi biayanya 17 pengkuadratan ditambah 2 perkalian
  = 19. Angka 65537 dipilih sebagai eksponen RSA
  justru karena bentuk binernya seramping ini.

  Dan yang sama pentingnya: SETIAP langkah diambil sisa
  modulo m. Tanpa itu, 123^65537 akan menjadi bilangan
  ratusan ribu angka sebelum dibagi -- benar hasilnya,
  tetapi memakan memori dan waktu tanpa alasan.

--- uji Fermat dan bilangan yang menipunya ---
        n   prima?  Fermat basis 2   catatan
       97       ya           lolos   benar
      561    TIDAK           lolos   TERTIPU
     1105    TIDAK           lolos   TERTIPU
     1729    TIDAK           lolos   TERTIPU
     2465    TIDAK           lolos   TERTIPU
     7919       ya           lolos   benar

  Bilangan seperti 561, 1105, 1729, dan 2465 disebut
  bilangan Carmichael: ia LOLOS uji Fermat untuk hampir
  semua basis, padahal tidak prima.

  561 = 3 x 11 x 17, jadi ia jelas bukan prima -- dan
  uji Fermat basis 2 tidak menyadarinya sama sekali.

  Ini bentuk keterbatasan yang penting dipahami: uji
  cepat memberi jawaban PROBABILISTIK. Yang dipakai di
  kenyataan, Miller-Rabin, memperbaikinya dengan menguji
  banyak basis sekaligus sehingga peluang tertipu bisa
  ditekan sekecil yang diinginkan -- tetapi tidak nol.

--- RSA dengan bilangan kecil ---
  p = 61   q = 53
  n = p x q = 3233
  phi(n) = (p-1)(q-1) = 3120
  e = 17   (harus FPB(e, phi) = 1, dan itu 1)
  d = invers e mod phi = 2753
  bukti: 17 x 2753 mod 3120 = 1

  kunci PUBLIK  : (n = 3233, e = 17)
  kunci PRIVAT  : (n = 3233, d = 2753)

    pesan   disandi   dibuka  cocok?
       65      2790       65  ya
      123       855      123  ya
      999      2464      999  ya
     2790      1452     2790  ya
     3000      1780     3000  ya

  seluruh pesan kembali utuh: YA

  Perhatikan bahwa yang menyandikan cuma butuh (n, e) --
  keduanya boleh disebar terbuka. Yang membuka butuh d,
  dan d dihitung dari phi(n), dan phi(n) butuh p dan q.

  Jadi seluruh keamanannya bergantung pada satu hal:
  memfaktorkan n kembali menjadi p dan q.

--- memfaktorkan n: dari sekejap ke tak mungkin ---
                   n  angka    pembagian    naik
               3.233      4           52       -
              10.403      5          100      2x
           9.036.011      7        3.000     30x
          99.400.891      8        9.966      3x
   1.000.036.000.099     13    1.000.002    100x

  Kolom terakhir tumbuh seperti AKAR dari n. Jadi tiap
  kali jumlah angka n bertambah dua, usaha memfaktorkannya
  bertambah sekitar sepuluh kali.

  RSA nyata memakai n sekitar 617 angka desimal (2048
  bit). Dengan pertumbuhan itu, percobaan pembagian tidak
  akan pernah selesai -- dan metode terbaik yang dikenal
  pun masih jauh di luar jangkauan.

  Perhatikan bentuk argumennya: keamanannya BUKAN karena
  tidak ada cara memfaktorkan. Caranya ada, dan sederhana.
  Yang melindungi cuma BIAYA menjalankannya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'FPB dengan Euclid', waktu: 'O(log min(a,b))', memori: 'O(1), kasus terburuk pasangan Fibonacci' },
      { operasi: 'FPB dengan coba semua pembagi', waktu: 'O(min(a,b))', memori: 'O(1), ribuan kali lebih lambat' },
      { operasi: 'Euclid diperluas', waktu: 'O(log min(a,b))', memori: 'O(log n) untuk rekursi' },
      { operasi: 'Pemangkatan modular cepat', waktu: 'O(log e)', memori: 'jumlah bit eksponen, bukan nilainya' },
      { operasi: 'Uji Fermat / Miller-Rabin', waktu: 'O(k log^3 n)', memori: 'k = jumlah basis, probabilistik' },
      { operasi: 'Faktorkan dengan percobaan pembagian', waktu: 'O(akar n)', memori: 'inilah yang melindungi RSA' }
    ],
    intuisi: `Perhatikan dua baris pertama, karena selisihnya adalah selisih paling dramatis di seluruh berkas ini: \`O(log n)\` lawan \`O(n)\` untuk **persoalan yang sama persis**.

Dan baris terakhir yang menopang seluruh kriptografi kunci publik. \`O(akar n)\` terdengar jauh lebih baik daripada \`O(n)\` — dan memang. Tetapi n di sini bukan jumlah data, melainkan **nilai bilangannya**, dan nilai bilangan 2048 bit adalah \`2^2048\`.

Akar dari itu masih \`2^1024\`, yang melampaui jumlah atom di alam semesta teramati dengan selisih yang tidak ada namanya.

Inilah yang membuat teori bilangan istimewa dalam informatika: ia satu-satunya tempat di mana \`O(akar n)\` dianggap **cukup lambat untuk dijadikan dasar keamanan.**`
  },

  kesalahanUmum: [
    {
      salah: 'Mengandaikan operator modulo berperilaku sama di semua bahasa untuk bilangan negatif.',
      kenapa: 'Python menghasilkan sisa bertanda sama dengan pembaginya sementara C, Java, dan JavaScript menghasilkan sisa bertanda sama dengan yang dibagi. Keduanya konsisten dengan definisi pembagian, dan perbedaannya hanya muncul pada masukan negatif sehingga lolos hampir semua pengujian.',
      benar: 'Periksa perilakunya di bahasa sasaran, dan normalkan hasilnya secara eksplisit bila kode dipindahkan antar bahasa.'
    },
    {
      salah: 'Mencari FPB dengan mencoba pembagi satu per satu karena kodenya lebih mudah dipahami.',
      kenapa: 'Cara itu berbiaya sebanding dengan besar bilangannya, sementara Euclid berbiaya sebanding dengan jumlah bitnya. Untuk bilangan enam angka selisihnya sudah ribuan kali, dan untuk bilangan berukuran kunci kriptografi cara naif tidak akan pernah selesai.',
      benar: 'Pakai Euclid, yang cuma empat baris dan justru lebih pendek daripada versi naifnya.'
    },
    {
      salah: 'Menghitung a pangkat e lebih dulu lalu mengambil sisanya di akhir.',
      kenapa: 'Bilangan antaranya membengkak sampai ratusan ribu angka sebelum dibagi, sehingga memakan memori dan waktu tanpa mengubah hasil akhirnya. Untuk eksponen berukuran kriptografi, bilangan antaranya tidak muat di memori mana pun.',
      benar: 'Ambil sisa modulo di setiap langkah pengkuadratan dan perkalian, sehingga bilangannya tidak pernah melebihi ukuran modulusnya.'
    },
    {
      salah: 'Menganggap setiap bilangan punya invers modulo m.',
      kenapa: 'Invers hanya ada bila FPB bilangan itu dengan m sama dengan satu, karena identitas Bezout hanya bisa menghasilkan satu ketika FPB-nya satu. Bila FPB-nya lebih besar, setiap kombinasi ax + my habis dibagi FPB itu sehingga tidak mungkin bernilai satu.',
      benar: 'Periksa FPB lebih dulu, dan tangani kasus tidak ada invers secara eksplisit alih-alih mengandaikannya selalu ada.'
    },
    {
      salah: 'Menyimpulkan sebuah bilangan prima karena lolos uji Fermat.',
      kenapa: 'Bilangan Carmichael seperti 561, 1105, dan 1729 lolos uji Fermat untuk hampir semua basis padahal tidak prima. Uji keprimaan cepat memberi jawaban probabilistik, dan peluang tertipu bisa ditekan tetapi tidak dinolkan.',
      benar: 'Pakai Miller-Rabin dengan banyak basis untuk keperluan praktis, dan sebut hasilnya sebagai kemungkinan prima, bukan kepastian.'
    },
    {
      salah: 'Menyandikan pesan dengan RSA secara langsung tanpa padding acak.',
      kenapa: 'Tanpa padding, pesan yang sama selalu menghasilkan sandi yang sama, sehingga pesan pendek yang bisa ditebak dapat dipecahkan dengan menyandikan seluruh kemungkinan lalu mencocokkan. Matematikanya tetap benar, tetapi kerahasiaannya hilang seluruhnya.',
      benar: 'Pakai skema padding baku lewat pustaka kripto, dan pakai RSA hanya untuk mengangkut kunci simetris.'
    },
    {
      salah: 'Menyebut RSA aman karena memfaktorkan bilangan besar tidak mungkin dilakukan.',
      kenapa: 'Memfaktorkan punya algoritme yang sederhana dan pasti berhasil, sehingga yang melindungi bukan ketidakmungkinan melainkan biaya. Pernyataan tentang biaya bisa berubah bila ada algoritme yang lebih baik atau mesin dengan kemampuan berbeda.',
      benar: 'Nyatakan keamanannya sebagai biaya pemfaktoran pada ukuran kunci tertentu, dan perhatikan perkembangan algoritme serta ukuran kunci yang dianjurkan.'
    }
  ],

  analogi: `Bayangkan kamu punya **dua gulungan tali** berbeda panjang, dan ingin memotong keduanya menjadi potongan sama panjang tanpa sisa, dengan potongan **sepanjang mungkin**.

Cara pertama: coba panjang potong 1 meter — pas untuk keduanya? Coba 2 meter. Coba 3. Terus sampai ketemu yang paling panjang.

Kalau talinya ratusan meter, kamu akan mencoba ratusan kali.

Cara kedua, dan ini Euclid: **tumpuk tali pendek di atas tali panjang, potong sepanjang tali pendek, berulang sampai habis.** Yang tersisa adalah tali yang lebih pendek lagi. Sekarang ulangi dengan pasangan yang baru.

Terus begitu sampai satu tali habis tepat. Panjang tali terakhir yang tersisa itulah jawabannya.

Perhatikan apa yang **tidak** kamu lakukan: kamu tidak pernah menebak satu pun panjang potongan. Kamu tidak mencari apa pun. Kamu cuma terus mengecilkan persoalannya sampai jawabannya muncul sendiri.

Dan itu sebabnya cara kedua selesai dalam belasan langkah untuk tali yang cara pertamanya butuh ratusan ribu.

**Sekarang bagian modulo.**

Bayangkan **jam dinding** dengan 12 angka. Kalau sekarang pukul 9 dan kamu menunggu 7 jam, jarumnya menunjuk 4 — bukan 16.

Itu aritmetika modulo 12. Dan sekarang pertanyaan yang lebih menarik: **kalau kamu berputar dengan langkah tetap, apakah kamu akan menginjak seluruh angka?**

Melangkah 5 jam berulang kali dari 12: 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 12. **Seluruh dua belas angka**, lalu kembali ke awal.

Melangkah 4 jam: 4, 8, 12, 4, 8, 12... **cuma tiga angka**, terus berputar di situ.

Bedanya apa? FPB dengan 12. Untuk 5 FPB-nya 1, dan ia mengunjungi semuanya. Untuk 4 FPB-nya 4, dan ia terkurung.

Itulah kenapa 5 punya invers modulo 12 dan 4 tidak. Punya invers berarti ada jumlah langkah yang membawamu tepat ke angka 1 — dan kalau kamu tidak pernah menginjak angka 1, inversnya tidak ada.

**Terakhir, soal RSA.**

Bayangkan **gembok yang bisa dikunci siapa saja tetapi cuma bisa dibuka satu kunci.**

Kamu menyebar ribuan gembok terbuka ke mana-mana — di meja, di pos satpam, di tempat umum. Siapa pun yang ingin mengirim sesuatu kepadamu memasukkannya ke kotak, menekan gemboknya sampai terkunci, lalu mengirimkannya.

Mereka tidak bisa membukanya lagi, bahkan barang mereka sendiri. Cuma kamu yang punya kuncinya.

Sekarang: apakah gemboknya bisa dibongkar?

Tentu bisa. Ambil gergaji besi dan potong.

Yang membuatnya berguna bukan ketidakmungkinan. Ia **waktu**: gembok yang butuh tiga ribu tahun untuk digergaji sama saja dengan gembok yang tidak bisa dibuka, untuk keperluan apa pun yang nyata.

Dan itu berarti keamanannya bisa berubah tanpa gemboknya berubah sedikit pun — cukup dengan seseorang menemukan gergaji yang jauh lebih baik.`,

  latihan: [
    'Hitung -17 mod 5 di Python dan di satu bahasa lain, lalu jelaskan kenapa keduanya sama-sama konsisten dengan a = bq + r.',
    'Tulis dua versi FPB dengan pencacah langkah, lalu bandingkan jumlah langkahnya untuk empat pasangan bilangan berbeda ukuran.',
    'Cari pasangan bilangan enam angka yang membuat Euclid butuh langkah paling banyak, lalu jelaskan kenapa pasangan itu yang terburuk.',
    'Implementasikan Euclid diperluas, lalu verifikasi hasilnya dengan menghitung ax + by untuk lima pasangan.',
    'Daftar seluruh bilangan dari 1 sampai 14 yang punya invers modulo 15, lalu jelaskan polanya lewat FPB.',
    'Tunjukkan dengan melangkah pada jam 12 kenapa langkah 5 mengunjungi semua angka sementara langkah 4 tidak.',
    'Tulis pemangkatan modular cepat dengan pencacah perkalian, lalu bandingkan jumlahnya dengan jumlah bit eksponennya.',
    'Jalankan uji Fermat pada seluruh bilangan komposit di bawah 3000 dan kumpulkan yang lolos, lalu bandingkan dengan daftar bilangan Carmichael.',
    'Bangun RSA dengan p dan q pilihanmu sendiri, sandikan lima pesan, dan buktikan semuanya kembali utuh.',
    'Ukur jumlah percobaan pembagian untuk memfaktorkan lima bilangan berukuran naik, lalu tunjukkan pertumbuhannya mengikuti akar dari n.'
  ]
});


TOPICS.push({
  id: 'matdis-graf',
  judul: 'Teori Graf: Derajat, Euler, Hamilton & Pewarnaan',
  kategori: 'matematika-diskrit',
  tag: ['teori graf', 'derajat', 'lema jabat tangan', 'isomorfisme', 'sirkuit Euler', 'sirkuit Hamilton', 'planaritas', 'pewarnaan graf'],
  ringkas: 'Dua persoalan yang bunyinya nyaris kembar: yang satu selesai dengan menghitung derajat, yang lain termasuk yang tersulit yang dikenal.',

  fungsi: `**Memodelkan apa pun yang berbentuk "benda-benda yang saling terhubung", lalu memakai syarat yang bisa diperiksa cepat alih-alih mencoba semua kemungkinan.**

Terpakai di:

- **Penjadwalan** yang tidak boleh bertabrakan — jadwal ujian, ruang, dan shift semuanya persoalan pewarnaan graf
- **Rute** yang harus melewati setiap jalan (patroli, penyapu jalan, pengiriman pos) — itu sirkuit Euler
- **Alokasi register** di kompilator, yang persis pewarnaan graf
- **Merancang tata letak PCB** dan tata letak antarmuka — planaritas menentukan apakah bisa tanpa persilangan
- **Memilih representasi** graf di kode: matriks atau daftar ketetanggaan, dan itu keputusan memori yang nyata

Yang paling berharga dari bab ini bukan definisinya, melainkan satu pola berpikir: **cari syarat yang bisa diperiksa cepat.** Ada 268 juta graf berbeda dengan cuma delapan simpul, jadi hampir tidak ada persoalan graf yang bisa diselesaikan dengan mencoba semuanya.

Dan satu pelajaran yang menghemat waktu berkali-kali: **Euler punya syarat sederhana (semua derajat genap), Hamilton tidak punya sama sekali.** Dua persoalan yang bunyinya nyaris kembar, dan yang satu murah sementara yang lain termasuk kelas tersulit yang dikenal.`,
  praktik: {
    tujuan: 'Kamu bisa memodelkan satu persoalan nyata sebagai graf, memeriksa keberadaan sirkuit Euler dengan menghitung derajat, membuktikan dua graf tidak isomorfik, dan mewarnai graf sambil menyadari bahwa hasil algoritme rakus bergantung pada urutan.',
    alat: ['Python untuk memeriksa sifat graf', 'Satu persoalan nyata yang punya "hubungan": jadwal, rute, atau pertemanan', 'Kertas untuk menggambar grafnya'],
    langkah: [
      { judul: 'Modelkan dulu: apa simpulnya, apa sisinya',
        isi: `Langkah ini yang menentukan segalanya, dan sering dikerjakan sembarangan.

Untuk penjadwalan ujian: simpul = mata kuliah, sisi = ada mahasiswa yang mengambil keduanya. Untuk rute patroli: simpul = persimpangan, sisi = jalan.

Kalau modelnya salah, seluruh hasil sesudahnya tidak berarti — dan salahnya tidak akan terlihat dari hitungannya.` },
      { judul: 'Verifikasi lema jabat tangan pada grafmu',
        isi: `Hitung jumlah seluruh derajat, lalu bandingkan dengan dua kali jumlah sisi.

Kalau tidak sama, ada sisi yang kamu catat sekali padahal harus dua kali, atau sebaliknya. Ini pemeriksaan termurah untuk memastikan struktur datamu benar sebelum dipakai.` },
      { judul: 'Pilih representasi berdasarkan kerapatannya',
        isi: `Hitung \`n^2\` dan \`2m + n\` untuk grafmu. Kalau sisinya jauh di bawah \`n^2\` — dan hampir semua graf nyata begitu — daftar ketetanggaan jauh lebih hemat.

Tetapi ingat pertukarannya: memeriksa "apakah u dan v bertetangga" berbiaya satu langkah pada matriks, dan menuntut penelusuran pada daftar.` },
      { judul: 'Periksa sirkuit Euler dengan menghitung derajat',
        isi: `Hitung derajat setiap simpul, lalu hitung berapa yang **ganjil**.

Nol simpul ganjil berarti ada **sirkuit** Euler. Dua berarti ada **lintasan** tetapi tidak kembali. Lebih dari dua berarti tidak ada sama sekali.

Lakukan ini pada Jembatan Königsberg dan kamu akan mendapat jawaban yang sama dengan Euler pada 1736 — dengan menghitung empat angka.` },
      { judul: 'Bandingkan biaya memeriksa Euler dan Hamilton',
        isi: `Untuk graf yang sama, periksa Euler dengan menghitung derajat, lalu cari sirkuit Hamilton dengan mencoba seluruh permutasi. Pasang pencacah.

Untuk 6 simpul, permutasinya 120. Untuk 20 simpul, lebih dari seratus triliun triliun. Rasakan sendiri kenapa "punya syarat sederhana" itu berharga.` },
      { judul: 'Buktikan dua graf TIDAK isomorfik',
        isi: `Buat dua graf dengan barisan derajat yang sama, lalu cari satu sifat yang membedakannya: jumlah komponen terhubung, jumlah segitiga, panjang siklus terpendek.

Untuk membuktikan **isomorfik** kamu harus menunjukkan pemetaannya. Untuk membuktikan **tidak** isomorfik, cukup satu sifat yang berbeda.` },
      { judul: 'Uji planaritas dengan batas sisi',
        isi: `Untuk graf sederhana dengan v >= 3, periksa \`e <= 3v - 6\`. Untuk graf bipartit, batasnya lebih ketat: \`e <= 2v - 4\`.

Gagal batas membuktikan **tidak** planar. Lolos batas **tidak** membuktikan planar — dan K3,3 adalah contohnya: ia lolos batas umum tetapi tetap tidak planar.` },
      { judul: 'Warnai grafmu, lalu ganti urutannya',
        isi: `Jalankan pewarnaan rakus dengan dua urutan simpul yang berbeda, dan bandingkan jumlah warnanya.

Lalu coba graf mahkota di program bawah: satu urutan memberi 2 warna, urutan lain memberi 4 — untuk graf yang sama. Setelah melihat ini, kamu akan mengerti kenapa heuristik pengurutan bukan hiasan.` }
    ],
    cek: [
      'Kamu bisa menyebutkan apa simpul dan apa sisi dari persoalan nyatamu',
      'Jumlah derajat grafmu sama dengan dua kali jumlah sisinya',
      'Kamu bisa memutuskan ada tidaknya sirkuit Euler tanpa mencoba satu rute pun',
      'Kamu sudah melihat sendiri hasil pewarnaan rakus berubah karena urutan simpul'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa Euler murah dan Hamilton tidak',

  konsep: `Teori graf lahir dari satu pertanyaan yang sangat konkret pada 1736: bisakah seseorang menyeberangi tujuh jembatan Königsberg, masing-masing tepat sekali, dan kembali ke titik awal?

Euler menjawabnya bukan dengan mencoba rute — ia menunjukkan bahwa **tidak ada** rute seperti itu, dengan menghitung empat angka. Cara berpikir itulah isi sesungguhnya bab ini.

**Derajat dan lema jabat tangan**

\`jumlah seluruh derajat = 2 x jumlah sisi\`

Alasannya satu kalimat: tiap sisi punya dua ujung, jadi ia menyumbang 1 ke derajat **dua** simpul sekaligus.

Dari situ turun akibat yang sering dipakai: **jumlah simpul berderajat ganjil selalu genap.** Karena totalnya genap, simpul ganjil harus datang berpasangan.

Ini juga pemeriksaan termurah untuk struktur data graf: kalau jumlah derajat tidak sama dengan dua kali jumlah sisi, ada sisi yang tercatat sekali padahal harus dua kali.

**Ruang graf itu sangat besar**

| n simpul | Pasangan simpul | Jumlah graf |
|---|---|---|
| 4 | 6 | 64 |
| 6 | 15 | 32.768 |
| 8 | 28 | 268.435.456 |

Tiap pasangan simpul boleh bersisi atau tidak, jadi jumlahnya \`2^C(n,2)\`.

Delapan simpul saja sudah memberi 268 juta graf berbeda. Itu sebabnya teori graf berisi banyak **syarat yang bisa diperiksa cepat**, bukan pencarian menyeluruh — dan bab ini sebenarnya kumpulan syarat seperti itu.

**Dua cara menyimpan graf**

| Simpul | Sisi | Matriks | Daftar | Hemat |
|---|---|---|---|---|
| 100 | 200 | 10.000 | 500 | 20x |
| 1.000 | 3.000 | 1.000.000 | 7.000 | 143x |
| 10.000 | 40.000 | 100.000.000 | 90.000 | 1.111x |

Matriks butuh \`n^2\` sel apa pun isinya. Daftar butuh ruang sebanding **jumlah sisi**.

Untuk graf **renggang** — sisinya jauh di bawah \`n^2\`, dan hampir semua graf nyata begitu — selisihnya besar. Jejaring sosial dengan sejuta pengguna tidak mungkin disimpan sebagai matriks sejuta kali sejuta.

Tetapi matriks punya satu keunggulan yang tidak bisa dikalahkan: memeriksa "apakah u dan v bertetangga" berbiaya **satu langkah**.

**Barisan derajat sama belum berarti isomorfik**

| Sifat | G1 (satu siklus-6) | G2 (dua segitiga) |
|---|---|---|
| Barisan derajat | [2,2,2,2,2,2] | [2,2,2,2,2,2] |
| Jumlah sisi | 6 | 6 |
| **Komponen terhubung** | **1** | **2** |
| **Jumlah segitiga** | **0** | **2** |

Dua baris pertama sama persis. Dua baris terakhir berbeda, dan itu **sudah cukup** untuk memastikan keduanya tidak isomorfik — isomorfisme cuma mengganti nama simpul, ia tidak bisa mengubah jumlah komponen atau jumlah segitiga.

Pelajarannya berbentuk yang berulang di seluruh bab ini: barisan derajat yang sama adalah syarat **perlu**, bukan syarat **cukup**.

Dan perhatikan asimetrinya: untuk membuktikan isomorfik, kamu harus menunjukkan **pemetaannya**. Untuk membuktikan tidak isomorfik, cukup **satu** sifat yang berbeda.

**Sirkuit Euler: lewati tiap SISI tepat sekali**

| Keadaan | Derajat | Simpul ganjil | Hasil |
|---|---|---|---|
| Königsberg (7 jembatan) | A=5, B=3, C=3, D=3 | **4** | tidak ada apa pun |
| + jembatan B-C | A=5, B=4, C=4, D=3 | **2** | lintasan, tidak kembali |
| + jembatan A-D juga | A=6, B=4, C=4, D=4 | **0** | **sirkuit Euler ada** |

Syaratnya bisa dinyatakan lengkap dalam satu baris: **nol simpul ganjil berarti ada sirkuit; dua berarti ada lintasan; lebih dari dua berarti tidak ada.**

Alasannya juga satu kalimat: setiap kali masuk sebuah simpul, harus ada sisi lain untuk keluar. Jadi sisi tiap simpul harus berpasangan — yang berarti derajatnya genap.

Perhatikan apa yang dibuktikan Euler tentang Königsberg: bukan "sulit ditemukan", melainkan **tidak mungkin ada**. Dan buktinya cuma menghitung derajat.

Setelah syaratnya terpenuhi, sirkuitnya bisa disusun dengan algoritme Hierholzer — dan pada versi sembilan jembatan, ia memberi rute yang melewati seluruh sembilan sisi dan kembali ke titik awal.

**Hamilton: bunyinya kembar, biayanya tidak**

Sirkuit Hamilton melewati tiap **simpul** tepat sekali. Beda satu kata dari Euler, yang melewati tiap **sisi**.

| n simpul | Memeriksa Euler | Brute force Hamilton |
|---|---|---|
| 6 | 6 hitungan | 120 |
| 10 | 10 hitungan | 362.880 |
| 15 | 15 hitungan | 87.178.291.200 |
| 20 | 20 hitungan | 121.645.100.408.832.000 |

Euler punya syarat yang bisa diperiksa dalam waktu sebanding jumlah simpul. Hamilton **tidak punya syarat seperti itu** — sampai hari ini.

Ini salah satu contoh paling rapi bahwa **kemiripan rumusan tidak berarti kemiripan biaya**. Dan itu bukan karena belum ada yang cukup pintar: menemukan syarat cepat untuk Hamilton berarti menyelesaikan salah satu persoalan terbuka terbesar dalam ilmu komputer.

**Planaritas dan rumus Euler**

\`v - e + f = 2\`

| Graf planar | v | e | f | \`v-e+f\` |
|---|---|---|---|---|
| Segitiga | 3 | 3 | 2 | 2 |
| Kubus (jaring) | 8 | 12 | 6 | 2 |
| Pohon 5 simpul | 5 | 4 | 1 | 2 |

(f termasuk daerah luar yang tak terbatas.)

Dari rumus itu turun batas yang berguna: graf planar sederhana dengan v >= 3 harus punya \`e <= 3v - 6\`.

| Graf | v | e | \`3v-6\` | Kesimpulan |
|---|---|---|---|---|
| K4 | 4 | 6 | 6 | mungkin planar |
| **K5** | 5 | 10 | 9 | **tidak planar** |
| K3,3 | 6 | 9 | 12 | lolos batas ini |

K5 langsung tertolak: 10 sisi melampaui batas 9.

K3,3 lolos uji ini tetapi **tetap tidak planar** — karena ia bipartit, batasnya lebih ketat: \`e <= 2v - 4\`, yaitu 8, dan 9 melampauinya.

Ini bentuk yang sama seperti barisan derajat: **syarat perlu yang bukan syarat cukup.** Gagal batas membuktikan tidak planar; lolos batas tidak membuktikan apa pun.

**Pewarnaan graf, dan kenapa urutan menentukan**

Pewarnaan: simpul yang bertetangga tidak boleh sewarna. Terpakai langsung di penjadwalan — sisi berarti "tidak boleh sesi yang sama".

Algoritme rakus sangat sederhana: telusuri simpul satu per satu, beri warna terkecil yang belum dipakai tetangganya.

Dan hasilnya **bergantung pada urutan**. Perhatikan graf mahkota — a dan b masing-masing empat, dengan \`ai\` bertetangga \`bj\` untuk setiap \`i != j\`:

| Urutan | Warna terpakai |
|---|---|
| kelompok a dulu, lalu b | **2** |
| bergantian a0, b0, a1, b1, ... | **4** |

Graf ini jelas bisa diwarnai dengan **2** warna: seluruh a satu warna, seluruh b warna lain — karena a tidak pernah bertetangga dengan a.

Urutan pertama menemukannya. Urutan kedua memakai dua kali lipat dari yang perlu, dan grafnya bisa diperbesar supaya selisihnya sebesar apa pun.

Jadi heuristik pengurutan — misalnya mendahulukan simpul berderajat terbesar — bukan hiasan. Ia bagian yang menentukan hasilnya.

Dan seperti Hamilton, mencari jumlah warna paling sedikit termasuk persoalan sulit. Untuk 6 simpul brute force masih bisa; untuk 60 tidak. Karena itu penjadwalan ujian nyata memakai heuristik — dan satu sesi tambahan jauh lebih murah daripada menunggu jawaban sempurna.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "# SYARAT EULER: hitung derajat, selesai.\n#\n#   Konigsberg (7 jembatan)\n#     A=5 B=3 C=3 D=3   ->  4 ganjil  ->  TIDAK ADA\n#   + jembatan B-C\n#     A=5 B=4 C=4 D=3   ->  2 ganjil  ->  lintasan saja\n#   + jembatan A-D juga\n#     A=6 B=4 C=4 D=4   ->  0 ganjil  ->  SIRKUIT ADA\n#\n# HAMILTON: tidak ada syarat seperti itu.\n#\n#   n     periksa Euler     brute force Hamilton\n#   6       6 hitungan                      120\n#  20      20 hitungan  121.645.100.408.832.000",
      penjelasan: `Dua persoalan yang bunyinya beda satu kata, dan biayanya beda sejauh yang bisa dibayangkan.

Mulai dari Euler, dan kenapa syaratnya bisa sesederhana itu.

Bayangkan kamu sedang berjalan menyeberangi jembatan-jembatan dan berada di tengah perjalanan. Kamu tiba di sebuah daratan lewat satu jembatan. Untuk melanjutkan, kamu harus **keluar** lewat jembatan lain.

Jadi setiap kunjungan ke daratan itu memakai **dua** jembatan: satu masuk, satu keluar.

Kalau kamu harus memakai seluruh jembatan tepat sekali dan kembali ke titik awal, maka jembatan di setiap daratan harus terbagi habis menjadi pasangan masuk-keluar. Yang berarti jumlahnya **genap**.

Itu seluruh buktinya. Tidak ada satu pun rute yang perlu dicoba.

Sekarang perhatikan kekuatan bentuk argumen ini. Königsberg punya banyak rute yang mungkin — dan Euler tidak memeriksa satu pun. Ia menunjukkan bahwa **sifat yang harus dipenuhi setiap rute** tidak bisa dipenuhi oleh jembatan yang ada.

Ini yang membedakan bukti dari pencarian: pencarian yang gagal cuma memberi tahu kamu belum menemukan; bukti memberi tahu tidak ada yang bisa ditemukan.

Dan perhatikan progres tiga tahap di kode. Satu jembatan tambahan **belum cukup** — ia menyisakan dua simpul ganjil, sehingga yang didapat cuma lintasan yang berakhir di tempat berbeda. Baru setelah simpul ganjilnya nol, sirkuit yang kembali ke titik awal jadi mungkin.

Kasus dua simpul ganjil punya tafsiran yang bagus: keduanya menjadi **titik awal dan titik akhir**, dan di dua tempat itu saja kamu tidak perlu berpasangan — karena kamu mulai tanpa masuk dan berakhir tanpa keluar.

**Sekarang Hamilton.**

Bunyinya nyaris kembar: lewati setiap **simpul** tepat sekali, bukan setiap sisi.

Naluri mengatakan kalau yang satu punya syarat sederhana, yang lain juga. Kenyataannya tidak — dan bukan karena belum ada yang cukup pintar mencarinya.

Sebabnya bisa dilihat dari bentuk persoalannya. Syarat Euler berhasil karena kondisi "bisa masuk dan keluar" bisa diperiksa **secara lokal**, satu simpul pada satu waktu, tanpa melihat sisa grafnya.

Untuk Hamilton, tidak ada pemeriksaan lokal seperti itu. Apakah sebuah simpul bisa dilewati tepat sekali bergantung pada apa yang terjadi di **seluruh** graf — dan tidak ada sifat setempat yang bisa merangkumnya.

Menemukan syarat cepat untuk Hamilton berarti menyelesaikan salah satu persoalan terbuka terbesar dalam ilmu komputer, karena ia termasuk kelas persoalan yang saling terhubung: menyelesaikan satu dengan cepat berarti menyelesaikan seluruhnya.

Angka di kolom terakhir menunjukkan akibatnya. Kalau satu permutasi bisa diperiksa dalam satu nanodetik, 20 simpul butuh hampir **empat tahun** — dan cuma lima simpul lebih banyak, 25 simpul, butuh sekitar **dua puluh juta tahun**. Tambah lima simpul, dan jawabannya pindah dari "lama" ke "tidak akan pernah".

**Dan sekarang bagian yang praktis.**

Persoalan Hamilton bukan latihan akademis. Ia muncul sebagai **rute pengiriman** yang harus mengunjungi setiap pelanggan tepat sekali — versi berbobotnya adalah persoalan penjual keliling, salah satu persoalan optimasi paling banyak dipelajari.

Jadi apa yang dilakukan orang di lapangan?

**Bukan** mencari jawaban pasti. Mereka memakai heuristik yang memberi jawaban baik dalam hitungan detik, lalu menerima bahwa mungkin ada rute yang beberapa persen lebih pendek yang tidak ditemukan.

Dan itu keputusan yang benar: menghemat 3 persen jarak tidak sepadan dengan menunggu berabad.

Pelajaran yang berlaku umum: **ketika sebuah persoalan tidak punya syarat cepat, jawabannya bukan mencari lebih keras, melainkan mengubah pertanyaannya** — dari "yang terbaik" menjadi "cukup baik, sekarang".`
    },
    {
      bahasa: 'python',
      kode: "# GRAF MAHKOTA: a(i) bertetangga b(j) untuk setiap i != j\n# Jelas bisa 2 warna: semua a satu warna, semua b satu warna.\n#\n#   urutan a0,a1,a2,a3,b0,b1,b2,b3   ->  2 warna\n#   urutan a0,b0,a1,b1,a2,b2,a3,b3   ->  4 warna\n#\n# Graf yang SAMA. Urutan yang berbeda.\n#\n# Dan grafnya bisa diperbesar supaya selisihnya\n# sebesar apa pun.",
      penjelasan: `Delapan simpul yang menunjukkan kenapa algoritme rakus perlu diperlakukan dengan hati-hati — dan kenapa "urutan simpul" bukan detail teknis yang bisa diabaikan.

Mulai dari grafnya, karena bentuknya yang membuat jebakan ini bekerja.

Ada empat simpul \`a\` dan empat simpul \`b\`. Setiap \`ai\` bertetangga dengan setiap \`bj\` **kecuali** yang indeksnya sama. Jadi \`a0\` bertetangga dengan \`b1\`, \`b2\`, \`b3\` — tetapi tidak dengan \`b0\`.

Yang penting: **tidak ada a yang bertetangga dengan a**, dan tidak ada b yang bertetangga dengan b.

Berarti dua warna sudah cukup. Beri seluruh a warna 1, seluruh b warna 2, dan tidak ada satu pun tetangga yang sewarna. Selesai.

Sekarang jalankan algoritme rakus dengan urutan **a0, a1, a2, a3, b0, b1, b2, b3**.

Keempat a diwarnai lebih dulu. Karena tidak saling bertetangga, semuanya dapat warna 1. Lalu b0 datang: tetangganya a1, a2, a3 yang semuanya warna 1, jadi b0 dapat warna 2. Begitu juga b1, b2, b3.

Dua warna. Optimal.

**Sekarang urutan bergantian: a0, b0, a1, b1, a2, b2, a3, b3.**

\`a0\` dapat warna 1.

\`b0\` datang. Tetangganya a1, a2, a3 — belum diwarnai satu pun. Dan \`a0\` **bukan** tetangganya. Jadi tidak ada larangan apa pun, dan b0 juga dapat **warna 1**.

Di sinilah kerusakannya dimulai, dan perhatikan bahwa langkah itu **tidak melanggar apa pun**. Warna 1 memang sah untuk b0 pada saat itu.

\`a1\` datang. Tetangganya termasuk b0 yang berwarna 1. Jadi a1 dapat warna 2.

\`b1\` datang. Tetangganya termasuk a0 (warna 1). Bukan tetangga a1. Jadi b1 juga dapat warna 2.

Dan seterusnya. Setiap pasangan memaksa satu warna baru, dan hasilnya **empat warna** — dua kali lipat dari yang perlu.

**Yang penting dari contoh ini ada tiga.**

**Pertama, kesalahannya tidak pernah terasa sebagai kesalahan.** Setiap keputusan yang diambil algoritme rakus adalah keputusan yang sah dan tampak masuk akal saat itu. Tidak ada satu langkah pun yang bisa ditunjuk sebagai salah. Yang salah cuma **urutannya**.

Ini sifat umum algoritme rakus: ia mengambil keputusan terbaik untuk saat ini, tanpa cara mengetahui akibatnya nanti.

**Kedua, selisihnya bisa dibuat sebesar apa pun.** Perbesar graf mahkota menjadi 100 a dan 100 b, dan urutan bergantian akan memakai 100 warna sementara 2 sudah cukup. Jadi ini bukan "kadang sedikit lebih buruk" — ia bisa **sejauh mana pun** dari optimal.

**Ketiga, dan ini yang praktis: heuristik pengurutan menentukan hasilnya.**

Urutan yang lebih cerdas — misalnya mendahulukan simpul berderajat terbesar, atau mendahulukan simpul yang pilihan warnanya paling sempit — memperkecil peluang terjebak pola seperti ini, karena keputusan yang paling menentukan diambil saat pilihannya masih longgar.

Itu sebabnya pustaka pewarnaan graf nyata selalu punya pilihan strategi pengurutan, dan bukan cuma satu fungsi \`warnai()\`.

**Dan sekarang kenapa kita tidak mencari yang optimal saja.**

Karena mencari jumlah warna paling sedikit termasuk persoalan sulit, sekelas dengan Hamilton. Untuk 6 simpul brute force masih bisa; untuk 60 tidak.

Jadi pilihannya bukan antara "rakus" dan "optimal". Pilihannya antara **rakus dengan urutan yang baik** dan **tidak ada jawaban sama sekali**.

Untuk penjadwalan ujian, itu berarti: terima kemungkinan satu sesi lebih banyak daripada minimum teoretis, dan dapatkan jadwalnya hari ini.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Teori graf: derajat, Euler, Hamilton, warna
# ============================================
import itertools
from math import comb, factorial

# --------------------------------------------
# 1. Derajat dan lema jabat tangan
# --------------------------------------------
print("--- lema jabat tangan: jumlah derajat = 2 x jumlah sisi ---")
G = {
    'A': ['B', 'C', 'D'],
    'B': ['A', 'C'],
    'C': ['A', 'B', 'D', 'E'],
    'D': ['A', 'C'],
    'E': ['C'],
}
sisi = set()
for u in G:
    for v in G[u]:
        sisi.add(tuple(sorted((u, v))))
print("  " + "simpul".ljust(9) + "tetangga".ljust(18) + "derajat")
for u in sorted(G):
    print("  " + u.ljust(9) + ", ".join(G[u]).ljust(18)
          + str(len(G[u])))
jumlah_derajat = sum(len(G[u]) for u in G)
print("")
print("  jumlah sisi      : " + str(len(sisi)))
print("  jumlah derajat   : " + str(jumlah_derajat))
print("  2 x jumlah sisi  : " + str(2 * len(sisi)))
print("  cocok            : "
      + ("YA" if jumlah_derajat == 2 * len(sisi) else "TIDAK"))
print("")
print("  Alasannya satu kalimat: tiap sisi punya dua ujung, jadi")
print("  ia menyumbang 1 ke derajat dua simpul sekaligus.")
print("")
print("  Akibat langsung yang sering dipakai: jumlah simpul")
print("  berderajat GANJIL selalu genap. Karena totalnya genap,")
print("  simpul ganjil harus datang berpasangan.")
ganjil = [u for u in G if len(G[u]) % 2 == 1]
print("")
print("  simpul berderajat ganjil di sini: "
      + ", ".join(sorted(ganjil))
      + "  (" + str(len(ganjil)) + " buah, genap)")

# --------------------------------------------
# 2. Berapa banyak graf yang mungkin
# --------------------------------------------
print("")
print("--- ruang graf sederhana dengan n simpul ---")
print("  " + "n".rjust(4) + "pasangan simpul".rjust(17)
      + "jumlah graf".rjust(26))
for n in range(2, 9):
    pasangan = comb(n, 2)
    print("  " + str(n).rjust(4) + str(pasangan).rjust(17)
          + f"{2 ** pasangan:>26,}".replace(",", "."))
print("")
print("  Tiap pasangan simpul boleh bersisi atau tidak, jadi")
print("  jumlahnya 2 pangkat C(n,2).")
print("")
print("  Delapan simpul saja sudah memberi 268 juta graf berbeda.")
print("  Itu sebabnya hampir tidak ada persoalan graf yang bisa")
print("  diselesaikan dengan mencoba semua kemungkinan -- dan")
print("  sebabnya teori graf berisi banyak SYARAT yang bisa")
print("  diperiksa cepat, bukan pencarian menyeluruh.")

# --------------------------------------------
# 3. Dua cara menyimpan graf
# --------------------------------------------
print("")
print("--- matriks ketetanggaan vs daftar ketetanggaan ---")
print("  " + "simpul".rjust(8) + "sisi".rjust(10)
      + "matriks".rjust(12) + "daftar".rjust(11) + "  hemat")
for n, m in ((5, 6), (100, 200), (1000, 3000), (10000, 40000)):
    matriks = n * n
    daftar = 2 * m + n
    print("  " + str(n).rjust(8) + f"{m:>10,}".replace(",", ".")
          + f"{matriks:>12,}".replace(",", ".")
          + f"{daftar:>11,}".replace(",", ".")
          + ("  %.0fx" % (matriks / daftar)))
print("")
print("  Matriks butuh n^2 sel apa pun isinya. Daftar butuh")
print("  ruang sebanding JUMLAH SISI.")
print("")
print("  Untuk graf RENGGANG -- sisinya jauh di bawah n^2, dan")
print("  hampir semua graf nyata begitu -- selisihnya besar.")
print("  Jejaring sosial dengan sejuta pengguna tidak mungkin")
print("  disimpan sebagai matriks sejuta kali sejuta.")
print("")
print("  Tapi matriks punya satu keunggulan yang tidak bisa")
print("  dikalahkan: memeriksa 'apakah u dan v bertetangga'")
print("  berbiaya satu langkah. Pada daftar, ia menuntut")
print("  menelusuri tetangga u.")

# --------------------------------------------
# 4. Derajat sama, graf BERBEDA
# --------------------------------------------
print("")
print("--- barisan derajat sama belum berarti isomorfik ---")
G1 = {1: [2, 6], 2: [1, 3], 3: [2, 4], 4: [3, 5],
      5: [4, 6], 6: [5, 1]}                      # satu siklus-6
G2 = {1: [2, 3], 2: [1, 3], 3: [1, 2], 4: [5, 6],
      5: [4, 6], 6: [4, 5]}                      # dua segitiga

def barisan_derajat(g):
    return sorted((len(g[u]) for u in g), reverse=True)

def komponen(g):
    belum = set(g)
    n = 0
    while belum:
        n += 1
        tumpuk = [belum.pop()]
        while tumpuk:
            u = tumpuk.pop()
            for v in g[u]:
                if v in belum:
                    belum.remove(v)
                    tumpuk.append(v)
    return n

def segitiga(g):
    n = 0
    for a, b, c in itertools.combinations(sorted(g), 3):
        if b in g[a] and c in g[b] and c in g[a]:
            n += 1
    return n

print("  G1 : satu siklus panjang 6")
print("  G2 : dua segitiga terpisah")
print("")
print("  " + "sifat".ljust(22) + "G1".rjust(12) + "G2".rjust(12))
for nama, f in (
        ("barisan derajat", lambda g: str(barisan_derajat(g))),
        ("jumlah sisi",
         lambda g: str(sum(len(g[u]) for u in g) // 2)),
        ("komponen terhubung", lambda g: str(komponen(g))),
        ("jumlah segitiga", lambda g: str(segitiga(g)))):
    print("  " + nama.ljust(22) + f(G1).rjust(12) + f(G2).rjust(12))
print("")
print("  Dua baris pertama SAMA: keduanya punya 6 simpul")
print("  berderajat 2 dan 6 sisi.")
print("")
print("  Dua baris terakhir BERBEDA, dan itu sudah cukup untuk")
print("  memastikan keduanya tidak isomorfik. Isomorfisme cuma")
print("  mengganti NAMA simpul; ia tidak bisa mengubah jumlah")
print("  komponen atau jumlah segitiga.")
print("")
print("  Pelajarannya: barisan derajat yang sama itu syarat")
print("  PERLU, bukan syarat cukup. Untuk membuktikan isomorfik")
print("  harus ditunjukkan pemetaannya; untuk membuktikan TIDAK")
print("  isomorfik cukup satu sifat yang berbeda.")

# --------------------------------------------
# 5. Sirkuit Euler: syaratnya bisa diperiksa cepat
# --------------------------------------------
print("")
print("--- sirkuit Euler: lewati tiap SISI tepat sekali ---")
# Jembatan Konigsberg: 4 daratan, 7 jembatan (multigraf)
KONIGSBERG = [('A', 'B'), ('A', 'B'), ('A', 'C'), ('A', 'C'),
              ('A', 'D'), ('B', 'D'), ('C', 'D')]

def derajat_multi(sisi_daftar):
    d = {}
    for u, v in sisi_daftar:
        d[u] = d.get(u, 0) + 1
        d[v] = d.get(v, 0) + 1
    return d

def periksa_euler(sisi_daftar, nama):
    d = derajat_multi(sisi_daftar)
    ganjil_ = [u for u in sorted(d) if d[u] % 2 == 1]
    print("  " + nama)
    print("      derajat : " + ", ".join(u + "=" + str(d[u])
                                         for u in sorted(d)))
    print("      simpul ganjil : " + str(len(ganjil_))
          + (" (" + ", ".join(ganjil_) + ")" if ganjil_ else ""))
    if len(ganjil_) == 0:
        print("      -> ADA sirkuit Euler (kembali ke titik awal)")
    elif len(ganjil_) == 2:
        print("      -> ada LINTASAN Euler, tapi tidak kembali")
    else:
        print("      -> TIDAK ADA lintasan maupun sirkuit Euler")
    return len(ganjil_)

periksa_euler(KONIGSBERG, "Jembatan Konigsberg (7 jembatan)")
print("")
SATU = KONIGSBERG + [('B', 'C')]
periksa_euler(SATU, "setelah SATU jembatan B-C ditambah")
print("")
TAMBAH = KONIGSBERG + [('B', 'C'), ('A', 'D')]
periksa_euler(TAMBAH, "setelah DUA jembatan (B-C dan A-D)")
print("")
print("  Perhatikan urutannya. Satu jembatan tambahan belum")
print("  cukup: ia menyisakan dua simpul ganjil, sehingga yang")
print("  didapat cuma LINTASAN -- berakhir di tempat berbeda.")
print("")
print("  Baru setelah simpul ganjilnya nol, sirkuit yang kembali")
print("  ke titik awal jadi mungkin.")
print("")
print("  Inilah persoalan yang melahirkan teori graf pada 1736.")
print("  Yang dibuktikan bukan 'sulit ditemukan', melainkan")
print("  TIDAK MUNGKIN ADA -- dan buktinya cuma menghitung")
print("  derajat.")
print("")
print("  Alasannya: setiap kali masuk sebuah simpul, harus ada")
print("  sisi lain untuk keluar. Jadi sisi tiap simpul harus")
print("  berpasangan, yang berarti derajatnya genap.")

# --------------------------------------------
# 6. Menemukan sirkuit Euler-nya
# --------------------------------------------
print("")
print("--- menyusun sirkuitnya (algoritme Hierholzer) ---")
def sirkuit_euler(sisi_daftar):
    tersisa = {}
    for i, (u, v) in enumerate(sisi_daftar):
        tersisa.setdefault(u, []).append((v, i))
        tersisa.setdefault(v, []).append((u, i))
    dipakai = set()
    awal = sisi_daftar[0][0]
    tumpuk, jalur = [awal], []
    while tumpuk:
        u = tumpuk[-1]
        maju = None
        while tersisa[u]:
            v, i = tersisa[u][-1]
            if i in dipakai:
                tersisa[u].pop()
                continue
            maju = (v, i)
            break
        if maju is None:
            jalur.append(tumpuk.pop())
        else:
            v, i = maju
            dipakai.add(i)
            tumpuk.append(v)
    return jalur[::-1]

jalur = sirkuit_euler(TAMBAH)
print("  sirkuit : " + " -> ".join(jalur))
print("  panjang : " + str(len(jalur) - 1) + " sisi dilalui, dari "
      + str(len(TAMBAH)) + " sisi yang ada")
print("  kembali ke awal : "
      + ("YA" if jalur[0] == jalur[-1] else "TIDAK"))
print("")
print("  Perhatikan bahwa setiap sisi muncul tepat sekali, dan")
print("  simpul boleh dilewati berulang. Itu beda Euler dari")
print("  Hamilton: Euler soal SISI, Hamilton soal SIMPUL.")

# --------------------------------------------
# 7. Hamilton: mirip bentuknya, jauh berbeda biayanya
# --------------------------------------------
print("")
print("--- sirkuit Hamilton: lewati tiap SIMPUL tepat sekali ---")
def cari_hamilton(g):
    simpul = sorted(g)
    awal = simpul[0]
    percobaan = 0
    for urut in itertools.permutations(simpul[1:]):
        percobaan += 1
        calon = [awal] + list(urut) + [awal]
        if all(calon[i + 1] in g[calon[i]]
               for i in range(len(calon) - 1)):
            return calon, percobaan
    return None, percobaan

for nama, g in (("G1 (siklus-6)", G1), ("G2 (dua segitiga)", G2)):
    hasil, coba = cari_hamilton(g)
    print("  " + nama)
    if hasil:
        print("      ADA : " + " -> ".join(map(str, hasil)))
    else:
        print("      TIDAK ADA")
    print("      permutasi diperiksa : " + str(coba))
print("")
print("  G2 tidak punya sirkuit Hamilton, dan sebabnya jelas:")
print("  ia terpisah jadi dua bagian, jadi tidak ada jalan dari")
print("  segitiga satu ke segitiga lain.")
print("")
print("  Sekarang bandingkan biaya memeriksanya:")
print("")
print("  " + "n simpul".rjust(10) + "syarat Euler".rjust(16)
      + "brute force Hamilton".rjust(24))
for n in (6, 10, 15, 20):
    kiri = str(n) + " hitungan"
    print("  " + str(n).rjust(10) + kiri.rjust(16)
          + f"{factorial(n - 1):>24,}".replace(",", "."))
print("")
print("  Euler punya SYARAT yang bisa diperiksa dalam waktu")
print("  sebanding jumlah simpul. Hamilton tidak punya syarat")
print("  seperti itu -- sampai hari ini.")
print("")
print("  Dua persoalan yang bunyinya nyaris kembar, dan yang")
print("  satu murah sementara yang lain termasuk kelas paling")
print("  sulit yang dikenal. Ini salah satu contoh paling rapi")
print("  bahwa kemiripan rumusan tidak berarti kemiripan biaya.")

# --------------------------------------------
# 8. Planaritas dan rumus Euler
# --------------------------------------------
print("")
print("--- rumus Euler: v - e + f = 2 ---")
BIDANG = [
    ("Segitiga",        3, 3, 2),
    ("Kubus (jaring)",  8, 12, 6),
    ("Siklus-6",        6, 6, 2),
    ("Pohon 5 simpul",  5, 4, 1),
]
print("  " + "graf planar".ljust(18) + "v".rjust(4) + "e".rjust(5)
      + "f".rjust(4) + "v-e+f".rjust(8))
for nama, v, e, f in BIDANG:
    print("  " + nama.ljust(18) + str(v).rjust(4) + str(e).rjust(5)
          + str(f).rjust(4) + str(v - e + f).rjust(8))
print("")
print("  (f termasuk daerah luar yang tak terbatas)")
print("")
print("  Dari rumus itu turun batas yang berguna: graf planar")
print("  sederhana dengan v >= 3 harus punya e <= 3v - 6.")
print("")
print("  " + "graf".ljust(12) + "v".rjust(4) + "e".rjust(5)
      + "3v-6".rjust(7) + "  planar?")
UJI = [("K4", 4, 6), ("K5", 5, 10), ("K3,3", 6, 9),
       ("Siklus-6", 6, 6)]
for nama, v, e in UJI:
    batas = 3 * v - 6
    catat = "mungkin" if e <= batas else "TIDAK planar"
    print("  " + nama.ljust(12) + str(v).rjust(4) + str(e).rjust(5)
          + str(batas).rjust(7) + "  " + catat)
print("")
print("  K5 langsung tertolak: 10 sisi melampaui batas 9.")
print("")
print("  K3,3 lolos uji ini (9 <= 12) tetapi TETAP tidak planar.")
print("  Karena ia bipartit, batasnya lebih ketat: e <= 2v - 4,")
print("  yaitu 8 -- dan 9 melampauinya.")
print("")
print("  Ini contoh syarat PERLU yang bukan syarat cukup: lolos")
print("  batas tidak membuktikan planar, tetapi gagal batas")
print("  membuktikan tidak planar. Dan sekali lagi bentuknya")
print("  sama seperti barisan derajat pada isomorfisme.")

# --------------------------------------------
# 9. Pewarnaan graf: rakus itu cepat tapi tidak optimal
# --------------------------------------------
print("")
print("--- pewarnaan: tetangga tidak boleh sewarna ---")
JADWAL = {
    'Alpro':   ['Basdat', 'Matdis', 'Logika'],
    'Basdat':  ['Alpro', 'Matdis'],
    'Matdis':  ['Alpro', 'Basdat', 'Logika'],
    'Logika':  ['Alpro', 'Matdis'],
    'Orkom':   ['PTI'],
    'PTI':     ['Orkom'],
}
def warnai(g, urutan):
    warna = {}
    for u in urutan:
        dipakai = {warna[v] for v in g[u] if v in warna}
        c = 0
        while c in dipakai:
            c += 1
        warna[u] = c
    return warna

print("  Sisi = dua mata kuliah yang pesertanya beririsan,")
print("  jadi ujiannya tidak boleh sesi yang sama.")
print("")
urut_a = ['Alpro', 'Basdat', 'Matdis', 'Logika', 'Orkom', 'PTI']
urut_b = ['Logika', 'Basdat', 'Orkom', 'Matdis', 'PTI', 'Alpro']
for nama, urut in (("urutan A", urut_a), ("urutan B", urut_b)):
    w = warnai(JADWAL, urut)
    print("  " + nama + " -> " + str(max(w.values()) + 1) + " sesi")
    for u in urut_a:
        print("      " + u.ljust(9) + "sesi " + str(w[u] + 1))
    print("")

def kromatik(g):
    simpul = sorted(g)
    for k in range(1, len(simpul) + 1):
        for tugas in itertools.product(range(k), repeat=len(simpul)):
            w = dict(zip(simpul, tugas))
            if all(w[u] != w[v] for u in g for v in g[u]):
                return k, w
    return len(simpul), None

k, _ = kromatik(JADWAL)
print("  jumlah sesi paling sedikit yang mungkin : " + str(k))
print("")
print("  Kedua urutan memberi jawaban yang sama di contoh ini,")
print("  dan keduanya sudah optimal.")
print("")
print("--- tapi urutan BISA menjebak: graf mahkota ---")
# a(i) bertetangga dengan b(j) untuk setiap i != j
N = 4
MAHKOTA = {}
for i in range(N):
    MAHKOTA["a" + str(i)] = ["b" + str(j) for j in range(N)
                             if j != i]
    MAHKOTA["b" + str(i)] = ["a" + str(j) for j in range(N)
                             if j != i]
urut_baik = (["a" + str(i) for i in range(N)]
             + ["b" + str(i) for i in range(N)])
urut_buruk = []
for i in range(N):
    urut_buruk += ["a" + str(i), "b" + str(i)]
for nama, urut in (("kelompok a dulu, lalu b", urut_baik),
                   ("bergantian a0,b0,a1,b1,...", urut_buruk)):
    w = warnai(MAHKOTA, urut)
    print("  " + nama.ljust(30) + "-> "
          + str(max(w.values()) + 1) + " warna")
print("")
print("  Graf ini jelas bisa diwarnai dengan 2 warna: seluruh a")
print("  satu warna, seluruh b warna lain -- karena a tidak")
print("  pernah bertetangga dengan a.")
print("")
print("  Urutan pertama menemukannya. Urutan kedua memakai "
      + str(max(warnai(MAHKOTA, urut_buruk).values()) + 1)
      + " warna,")
print("  dua kali lipat dari yang perlu -- dan graf yang sama")
print("  bisa diperbesar supaya selisihnya sebesar apa pun.")
print("")
print("  Jadi hasil algoritme rakus bergantung pada urutan, dan")
print("  urutan yang buruk bisa membuatnya sejauh mana pun dari")
print("  optimal. Itu sebabnya heuristik pengurutan -- misalnya")
print("  mendahulukan simpul berderajat terbesar -- bukan")
print("  hiasan, melainkan bagian yang menentukan hasilnya.")
print("")
print("  Mencari jumlah warna paling sedikit termasuk persoalan")
print("  sulit, sama seperti Hamilton. Untuk 6 simpul brute")
print("  force masih bisa; untuk 60 tidak.")
print("")
print("  Karena itu penjadwalan ujian nyata memakai heuristik:")
print("  hasilnya belum tentu paling sedikit, tetapi didapat")
print("  dalam hitungan detik -- dan satu sesi tambahan jauh")
print("  lebih murah daripada menunggu jawaban sempurna.")` },
  output: `--- lema jabat tangan: jumlah derajat = 2 x jumlah sisi ---
  simpul   tetangga          derajat
  A        B, C, D           3
  B        A, C              2
  C        A, B, D, E        4
  D        A, C              2
  E        C                 1

  jumlah sisi      : 6
  jumlah derajat   : 12
  2 x jumlah sisi  : 12
  cocok            : YA

  Alasannya satu kalimat: tiap sisi punya dua ujung, jadi
  ia menyumbang 1 ke derajat dua simpul sekaligus.

  Akibat langsung yang sering dipakai: jumlah simpul
  berderajat GANJIL selalu genap. Karena totalnya genap,
  simpul ganjil harus datang berpasangan.

  simpul berderajat ganjil di sini: A, E  (2 buah, genap)

--- ruang graf sederhana dengan n simpul ---
     n  pasangan simpul               jumlah graf
     2                1                         2
     3                3                         8
     4                6                        64
     5               10                     1.024
     6               15                    32.768
     7               21                 2.097.152
     8               28               268.435.456

  Tiap pasangan simpul boleh bersisi atau tidak, jadi
  jumlahnya 2 pangkat C(n,2).

  Delapan simpul saja sudah memberi 268 juta graf berbeda.
  Itu sebabnya hampir tidak ada persoalan graf yang bisa
  diselesaikan dengan mencoba semua kemungkinan -- dan
  sebabnya teori graf berisi banyak SYARAT yang bisa
  diperiksa cepat, bukan pencarian menyeluruh.

--- matriks ketetanggaan vs daftar ketetanggaan ---
    simpul      sisi     matriks     daftar  hemat
         5         6          25         17  1x
       100       200      10.000        500  20x
      1000     3.000   1.000.000      7.000  143x
     10000    40.000 100.000.000     90.000  1111x

  Matriks butuh n^2 sel apa pun isinya. Daftar butuh
  ruang sebanding JUMLAH SISI.

  Untuk graf RENGGANG -- sisinya jauh di bawah n^2, dan
  hampir semua graf nyata begitu -- selisihnya besar.
  Jejaring sosial dengan sejuta pengguna tidak mungkin
  disimpan sebagai matriks sejuta kali sejuta.

  Tapi matriks punya satu keunggulan yang tidak bisa
  dikalahkan: memeriksa 'apakah u dan v bertetangga'
  berbiaya satu langkah. Pada daftar, ia menuntut
  menelusuri tetangga u.

--- barisan derajat sama belum berarti isomorfik ---
  G1 : satu siklus panjang 6
  G2 : dua segitiga terpisah

  sifat                           G1          G2
  barisan derajat       [2, 2, 2, 2, 2, 2][2, 2, 2, 2, 2, 2]
  jumlah sisi                      6           6
  komponen terhubung               1           2
  jumlah segitiga                  0           2

  Dua baris pertama SAMA: keduanya punya 6 simpul
  berderajat 2 dan 6 sisi.

  Dua baris terakhir BERBEDA, dan itu sudah cukup untuk
  memastikan keduanya tidak isomorfik. Isomorfisme cuma
  mengganti NAMA simpul; ia tidak bisa mengubah jumlah
  komponen atau jumlah segitiga.

  Pelajarannya: barisan derajat yang sama itu syarat
  PERLU, bukan syarat cukup. Untuk membuktikan isomorfik
  harus ditunjukkan pemetaannya; untuk membuktikan TIDAK
  isomorfik cukup satu sifat yang berbeda.

--- sirkuit Euler: lewati tiap SISI tepat sekali ---
  Jembatan Konigsberg (7 jembatan)
      derajat : A=5, B=3, C=3, D=3
      simpul ganjil : 4 (A, B, C, D)
      -> TIDAK ADA lintasan maupun sirkuit Euler

  setelah SATU jembatan B-C ditambah
      derajat : A=5, B=4, C=4, D=3
      simpul ganjil : 2 (A, D)
      -> ada LINTASAN Euler, tapi tidak kembali

  setelah DUA jembatan (B-C dan A-D)
      derajat : A=6, B=4, C=4, D=4
      simpul ganjil : 0
      -> ADA sirkuit Euler (kembali ke titik awal)

  Perhatikan urutannya. Satu jembatan tambahan belum
  cukup: ia menyisakan dua simpul ganjil, sehingga yang
  didapat cuma LINTASAN -- berakhir di tempat berbeda.

  Baru setelah simpul ganjilnya nol, sirkuit yang kembali
  ke titik awal jadi mungkin.

  Inilah persoalan yang melahirkan teori graf pada 1736.
  Yang dibuktikan bukan 'sulit ditemukan', melainkan
  TIDAK MUNGKIN ADA -- dan buktinya cuma menghitung
  derajat.

  Alasannya: setiap kali masuk sebuah simpul, harus ada
  sisi lain untuk keluar. Jadi sisi tiap simpul harus
  berpasangan, yang berarti derajatnya genap.

--- menyusun sirkuitnya (algoritme Hierholzer) ---
  sirkuit : A -> D -> C -> B -> D -> A -> C -> A -> B -> A
  panjang : 9 sisi dilalui, dari 9 sisi yang ada
  kembali ke awal : YA

  Perhatikan bahwa setiap sisi muncul tepat sekali, dan
  simpul boleh dilewati berulang. Itu beda Euler dari
  Hamilton: Euler soal SISI, Hamilton soal SIMPUL.

--- sirkuit Hamilton: lewati tiap SIMPUL tepat sekali ---
  G1 (siklus-6)
      ADA : 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 1
      permutasi diperiksa : 1
  G2 (dua segitiga)
      TIDAK ADA
      permutasi diperiksa : 120

  G2 tidak punya sirkuit Hamilton, dan sebabnya jelas:
  ia terpisah jadi dua bagian, jadi tidak ada jalan dari
  segitiga satu ke segitiga lain.

  Sekarang bandingkan biaya memeriksanya:

    n simpul    syarat Euler    brute force Hamilton
           6      6 hitungan                     120
          10     10 hitungan                 362.880
          15     15 hitungan          87.178.291.200
          20     20 hitungan 121.645.100.408.832.000

  Euler punya SYARAT yang bisa diperiksa dalam waktu
  sebanding jumlah simpul. Hamilton tidak punya syarat
  seperti itu -- sampai hari ini.

  Dua persoalan yang bunyinya nyaris kembar, dan yang
  satu murah sementara yang lain termasuk kelas paling
  sulit yang dikenal. Ini salah satu contoh paling rapi
  bahwa kemiripan rumusan tidak berarti kemiripan biaya.

--- rumus Euler: v - e + f = 2 ---
  graf planar          v    e   f   v-e+f
  Segitiga             3    3   2       2
  Kubus (jaring)       8   12   6       2
  Siklus-6             6    6   2       2
  Pohon 5 simpul       5    4   1       2

  (f termasuk daerah luar yang tak terbatas)

  Dari rumus itu turun batas yang berguna: graf planar
  sederhana dengan v >= 3 harus punya e <= 3v - 6.

  graf           v    e   3v-6  planar?
  K4             4    6      6  mungkin
  K5             5   10      9  TIDAK planar
  K3,3           6    9     12  mungkin
  Siklus-6       6    6     12  mungkin

  K5 langsung tertolak: 10 sisi melampaui batas 9.

  K3,3 lolos uji ini (9 <= 12) tetapi TETAP tidak planar.
  Karena ia bipartit, batasnya lebih ketat: e <= 2v - 4,
  yaitu 8 -- dan 9 melampauinya.

  Ini contoh syarat PERLU yang bukan syarat cukup: lolos
  batas tidak membuktikan planar, tetapi gagal batas
  membuktikan tidak planar. Dan sekali lagi bentuknya
  sama seperti barisan derajat pada isomorfisme.

--- pewarnaan: tetangga tidak boleh sewarna ---
  Sisi = dua mata kuliah yang pesertanya beririsan,
  jadi ujiannya tidak boleh sesi yang sama.

  urutan A -> 3 sesi
      Alpro    sesi 1
      Basdat   sesi 2
      Matdis   sesi 3
      Logika   sesi 2
      Orkom    sesi 1
      PTI      sesi 2

  urutan B -> 3 sesi
      Alpro    sesi 3
      Basdat   sesi 1
      Matdis   sesi 2
      Logika   sesi 1
      Orkom    sesi 1
      PTI      sesi 2

  jumlah sesi paling sedikit yang mungkin : 3

  Kedua urutan memberi jawaban yang sama di contoh ini,
  dan keduanya sudah optimal.

--- tapi urutan BISA menjebak: graf mahkota ---
  kelompok a dulu, lalu b       -> 2 warna
  bergantian a0,b0,a1,b1,...    -> 4 warna

  Graf ini jelas bisa diwarnai dengan 2 warna: seluruh a
  satu warna, seluruh b warna lain -- karena a tidak
  pernah bertetangga dengan a.

  Urutan pertama menemukannya. Urutan kedua memakai 4 warna,
  dua kali lipat dari yang perlu -- dan graf yang sama
  bisa diperbesar supaya selisihnya sebesar apa pun.

  Jadi hasil algoritme rakus bergantung pada urutan, dan
  urutan yang buruk bisa membuatnya sejauh mana pun dari
  optimal. Itu sebabnya heuristik pengurutan -- misalnya
  mendahulukan simpul berderajat terbesar -- bukan
  hiasan, melainkan bagian yang menentukan hasilnya.

  Mencari jumlah warna paling sedikit termasuk persoalan
  sulit, sama seperti Hamilton. Untuk 6 simpul brute
  force masih bisa; untuk 60 tidak.

  Karena itu penjadwalan ujian nyata memakai heuristik:
  hasilnya belum tentu paling sedikit, tetapi didapat
  dalam hitungan detik -- dan satu sesi tambahan jauh
  lebih murah daripada menunggu jawaban sempurna.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung seluruh derajat', waktu: 'O(V + E)', memori: 'sekali telusuri' },
      { operasi: 'Periksa syarat Euler', waktu: 'O(V + E)', memori: 'cukup hitung simpul berderajat ganjil' },
      { operasi: 'Susun sirkuit Euler (Hierholzer)', waktu: 'O(E)', memori: 'O(E) untuk tumpukan' },
      { operasi: 'Cari sirkuit Hamilton (brute force)', waktu: 'O((V-1)!)', memori: 'tidak ada syarat cepat yang dikenal' },
      { operasi: 'Pewarnaan rakus', waktu: 'O(V + E)', memori: 'hasil bergantung urutan simpul' },
      { operasi: 'Cari jumlah warna minimum', waktu: 'eksponensial', memori: 'sekelas sulit dengan Hamilton' },
      { operasi: 'Uji batas planaritas', waktu: 'O(1)', memori: 'syarat perlu, bukan syarat cukup' }
    ],
    intuisi: `Perhatikan pasangan baris yang berdampingan: memeriksa Euler \`O(V+E)\`, mencari Hamilton \`O((V-1)!)\`. Pewarnaan rakus \`O(V+E)\`, pewarnaan minimum eksponensial.

Pola yang sama muncul dua kali: **persoalan yang punya syarat setempat jadi murah, persoalan yang menuntut melihat seluruh graf sekaligus jadi mahal.**

Dan dari situ muncul cara kerja yang lazim di lapangan. Untuk persoalan mahal, jangan cari yang optimal — cari yang cukup baik dengan algoritme murah, lalu perbaiki hasilnya lewat **urutan pemrosesan** dan bukan lewat pencarian yang lebih luas.

Baris terakhir yang paling murah dan sering dilupakan: batas planaritas berbiaya \`O(1)\` — satu perbandingan. Ia tidak bisa membuktikan planar, tetapi ia bisa **membuang** kandidat dengan biaya nol, dan penyaring gratis selalu layak dipasang lebih dulu.`
  },

  kesalahanUmum: [
    {
      salah: 'Menyimpulkan dua graf isomorfik karena barisan derajatnya sama.',
      kenapa: 'Barisan derajat hanya syarat perlu, dan dua graf bisa punya barisan derajat identik tetapi berbeda jumlah komponen terhubung atau jumlah segitiganya. Satu siklus panjang enam dan dua segitiga terpisah adalah contohnya.',
      benar: 'Tunjukkan pemetaan simpulnya untuk membuktikan isomorfik, dan cari satu sifat yang berbeda untuk membuktikan tidak isomorfik.'
    },
    {
      salah: 'Menyimpulkan sebuah graf planar karena lolos batas e <= 3v - 6.',
      kenapa: 'Batas itu turun dari rumus Euler sebagai syarat perlu, sehingga lolos batas tidak menjamin apa pun. Graf bipartit lengkap K3,3 lolos batas umum tetapi tetap tidak planar karena batas untuk graf bipartit lebih ketat.',
      benar: 'Pakai batas sisi hanya untuk menolak, dan pakai kriteria Kuratowski atau algoritme uji planaritas untuk memastikan.'
    },
    {
      salah: 'Mencari sirkuit Euler dengan mencoba rute satu per satu.',
      kenapa: 'Keberadaannya bisa diputuskan hanya dengan menghitung derajat setiap simpul, sehingga mencoba rute membuang usaha untuk pertanyaan yang sudah terjawab. Pada graf tanpa sirkuit Euler, pencarian rute tidak akan pernah memberi kepastian bahwa tidak ada.',
      benar: 'Periksa jumlah simpul berderajat ganjil lebih dulu, lalu susun sirkuitnya dengan Hierholzer hanya bila syaratnya terpenuhi.'
    },
    {
      salah: 'Mengandaikan Hamilton punya syarat sederhana seperti Euler karena rumusannya mirip.',
      kenapa: 'Syarat Euler bekerja karena kondisi masuk dan keluar bisa diperiksa secara setempat pada satu simpul, sementara kelayakan Hamilton bergantung pada keseluruhan graf. Tidak ada syarat setempat yang dikenal, dan menemukannya berarti menyelesaikan persoalan terbuka besar dalam ilmu komputer.',
      benar: 'Untuk Hamilton dan persoalan sekelasnya, pakai heuristik yang memberi jawaban cukup baik dan sebutkan bahwa hasilnya belum tentu optimal.'
    },
    {
      salah: 'Menyimpan graf renggang sebagai matriks ketetanggaan karena kodenya lebih sederhana.',
      kenapa: 'Matriks memakai n kuadrat sel apa pun jumlah sisinya, sehingga graf dengan sepuluh ribu simpul dan empat puluh ribu sisi memakan seratus juta sel alih-alih sembilan puluh ribu. Untuk graf berukuran nyata, memorinya tidak tersedia.',
      benar: 'Pakai daftar ketetanggaan untuk graf renggang, dan sisakan matriks untuk graf padat atau saat pemeriksaan ketetanggaan harus berbiaya satu langkah.'
    },
    {
      salah: 'Menganggap hasil pewarnaan rakus tidak bergantung pada urutan simpul.',
      kenapa: 'Setiap langkah rakus mengambil keputusan yang sah pada saat itu tanpa mengetahui akibatnya, sehingga urutan yang berbeda menghasilkan jumlah warna yang berbeda. Pada graf mahkota, satu urutan memberi dua warna dan urutan lain memberi empat untuk graf yang sama.',
      benar: 'Pakai heuristik pengurutan seperti mendahulukan simpul berderajat terbesar, dan laporkan jumlah warna sebagai hasil heuristik bukan sebagai minimum.'
    },
    {
      salah: 'Memodelkan persoalan sebagai graf tanpa menetapkan lebih dulu apa simpul dan apa sisinya.',
      kenapa: 'Seluruh hasil perhitungan bergantung pada pemetaan itu, dan kekeliruan pemodelan tidak akan terlihat dari hitungannya karena hitungannya tetap benar untuk graf yang salah. Kesalahan jenis ini menghasilkan jawaban yang meyakinkan untuk pertanyaan yang tidak ditanyakan.',
      benar: 'Tuliskan definisi simpul dan sisi secara eksplisit, lalu periksa beberapa kasus nyata terhadap definisi itu sebelum menghitung apa pun.'
    }
  ],

  analogi: `Bayangkan sebuah **kota dengan beberapa pulau dan jembatan**, dan dua permintaan yang bunyinya mirip.

**Permintaan pertama** datang dari petugas kebersihan: *"saya harus menyapu setiap jembatan, tepat sekali, lalu kembali ke pos."*

**Permintaan kedua** dari kurir: *"saya harus mengantar ke setiap pulau, tepat sekali, lalu kembali ke pos."*

Terdengar sama sulitnya. Ternyata tidak sama sekali.

**Untuk petugas kebersihan**, ada cara memeriksa yang selesai dalam semenit: berdiri di setiap pulau dan **hitung jembatannya**.

Kalau ada pulau dengan jembatan berjumlah ganjil, jawabannya tidak mungkin. Sebabnya jelas begitu dipikirkan: setiap kali ia datang ke sebuah pulau lewat satu jembatan, ia harus keluar lewat jembatan lain. Jembatan di pulau itu harus berpasangan.

Perhatikan bahwa ia **tidak mencoba satu rute pun**. Ia memeriksa sifat pulaunya, dan sifat itu sudah menentukan jawabannya untuk seluruh rute yang mungkin.

**Untuk kurir**, tidak ada pemeriksaan seperti itu.

Menghitung jembatan tidak membantu. Melihat satu pulau tidak membantu, karena apakah pulau itu bisa dikunjungi tepat sekali bergantung pada seluruh sisa kota.

Yang tersisa: coba urutan kunjungan. Untuk enam pulau, 120 urutan — bisa. Untuk dua puluh pulau, lebih dari seratus triliun triliun.

Dan sampai hari ini **belum ada yang menemukan pemeriksaan cepat untuk permintaan kurir.**

Satu kata berbeda — jembatan lawan pulau — dan yang satu selesai dengan berhitung sementara yang lain jadi salah satu persoalan tersulit yang dikenal.

**Sekarang bagian pewarnaan.**

Kepala sekolah harus menjadwalkan ujian. Dua mata kuliah yang punya peserta bersama tidak boleh disatukan sesinya.

Ia mengerjakannya dengan cara paling wajar: ambil mata kuliah satu per satu, taruh di sesi paling awal yang tidak bertabrakan.

Cara itu sah, cepat, dan hampir selalu memberi hasil yang lumayan.

Tapi perhatikan: **urutan ia mengambil mata kuliahnya menentukan hasilnya.**

Kalau ia mulai dari mata kuliah yang pesertanya paling banyak beririsan, sesi yang terpakai sedikit. Kalau ia mulai dari yang paling longgar, ia bisa terjebak: mata kuliah yang paling banyak bertabrakan datang terakhir, ketika seluruh sesi awal sudah terpakai, dan ia harus terus menambah sesi baru.

Dan yang membuat ini licin: **setiap keputusannya tetap benar pada saat diambil.** Tidak ada satu langkah yang bisa disebut salah. Yang salah cuma urutannya, dan itu baru kelihatan di akhir.

**Terakhir, soal ukuran ruang persoalan.**

Kepala sekolah mungkin berpikir: kenapa tidak coba semua kemungkinan penjadwalan dan ambil yang paling sedikit sesinya?

Untuk delapan mata kuliah, jumlah cara menghubungkan mereka saja sudah 268 juta kemungkinan pola tabrakan.

Itu sebabnya bab ini berisi banyak **syarat yang bisa diperiksa** dan sedikit pencarian menyeluruh. Bukan karena pencarian menyeluruh salah — melainkan karena hampir tidak pernah selesai.`,

  latihan: [
    'Modelkan satu persoalan nyata di sekitarmu sebagai graf, lalu tulis definisi simpul dan sisinya secara eksplisit.',
    'Verifikasi lema jabat tangan pada graf itu, dan jelaskan kesalahan apa yang bisa ditangkap pemeriksaan ini.',
    'Hitung jumlah graf sederhana yang mungkin untuk tujuh simpul, lalu jelaskan akibatnya bagi strategi penyelesaian persoalan graf.',
    'Bandingkan kebutuhan memori matriks dan daftar ketetanggaan untuk grafmu, lalu tentukan mana yang kamu pilih dan kenapa.',
    'Susun dua graf dengan barisan derajat sama yang tidak isomorfik, lalu tunjukkan satu sifat yang membedakannya.',
    'Hitung derajat setiap simpul pada Jembatan Königsberg, lalu tentukan jembatan mana yang harus ditambahkan agar ada sirkuit Euler.',
    'Cari sirkuit Hamilton pada graf enam simpul dengan mencoba seluruh permutasi, lalu hitung berapa permutasi yang diperlukan untuk dua puluh simpul.',
    'Uji batas e <= 3v - 6 pada lima graf, lalu jelaskan kenapa lolos batas tidak membuktikan planaritas.',
    'Warnai satu graf dengan tiga urutan simpul berbeda, dan catat jumlah warna yang dihasilkan masing-masing.',
    'Bangun graf mahkota dengan enam pasang simpul, lalu tunjukkan urutan yang membuat pewarnaan rakus memakai enam warna padahal dua sudah cukup.'
  ]
});


TOPICS.push({
  id: 'matdis-pohon',
  judul: 'Pohon: Pohon Rentang Minimum & Kode Huffman',
  kategori: 'matematika-diskrit',
  tag: ['pohon', 'pohon berakar', 'rumus Cayley', 'pohon rentang minimum', 'Kruskal', 'Prim', 'kode Huffman', 'awalan bebas'],
  ringkas: 'Seratus empat belas cara menyambung enam gedung — yang termurah kurang dari separuh harga yang termahal, dan Kruskal menemukannya tanpa mencoba satu pun.',

  fungsi: `**Menyambungkan semua titik dengan biaya termurah, dan menyusun kode yang memampatkan data tanpa perlu tanda pemisah.**

Terpakai di:

- **Merancang jaringan** kabel, pipa, jalan, atau listrik yang harus menjangkau semua titik dengan biaya paling kecil — itu pohon rentang minimum
- **Kompresi data** — ZIP, gzip, JPEG, dan MP3 semuanya memakai kode Huffman atau keturunannya di salah satu tahapnya
- **Pengelompokan data**: memotong sisi termahal pohon rentang minimum memberi kelompok-kelompok alami
- **Memahami struktur** direktori berkas, DOM halaman web, dan pohon sintaks kompilator — semuanya pohon berakar
- **Menaksir biaya pencarian** — tinggi pohon menentukan berapa langkah yang dibutuhkan

Yang paling berguna dari bab ini: **mencari pohon rentang termurah tidak perlu mencoba semuanya.** Untuk enam gedung sudah ada 114 cara menyambungnya, dan untuk sepuluh simpul berlabel ada seratus juta pohon berbeda. Kruskal dan Prim mengambil keputusan rakus satu per satu — dan untuk persoalan ini, berbeda dengan pewarnaan graf, rakus **dijamin** optimal.

Dan hasil yang tampak ajaib padahal sederhana: **kode Huffman bisa dibaca tanpa tanda pemisah** karena setiap karakter diletakkan di daun pohon, sehingga tidak ada kode yang menjadi awalan kode lain.`,
  praktik: {
    tujuan: 'Kamu bisa memeriksa apakah sebuah graf adalah pohon, mencari pohon rentang minimum dengan Kruskal dan Prim lalu membuktikan keduanya sama bobotnya, dan menyusun kode Huffman yang bisa dibongkar ulang tanpa kehilangan satu karakter pun.',
    alat: ['Python untuk algoritme dan verifikasi', 'Satu peta titik-titik nyata dengan biaya sambungan (gedung kampus, rumah di satu RT, kota di satu provinsi)', 'Satu berkas teks untuk dipampatkan'],
    langkah: [
      { judul: 'Periksa pohon dengan dua syarat, bukan satu',
        isi: `Hitung jumlah sisinya **dan** periksa keterhubungannya.

Contoh di program menunjukkan kenapa keduanya wajib: segitiga ditambah satu sisi terpisah punya tepat n-1 sisi, tetapi tidak terhubung. Satu sisi terpakai menutup siklus, sehingga tidak ada lagi sisi untuk menyambungkan bagian yang lain.` },
      { judul: 'Hitung sendiri berapa banyak pohon yang mungkin',
        isi: `Untuk n = 4 dan 5, coba seluruh pilihan n-1 sisi dan hitung yang membentuk pohon. Bandingkan dengan \`n^(n-2)\`.

Kecocokannya (16 dan 125) membuat rumus Cayley berhenti terasa seperti hafalan. Lalu hitung berapa pilihan yang harus diperiksa untuk n = 10 — dan kamu akan mengerti kenapa pencarian menyeluruh tidak dipakai.` },
      { judul: 'Susun data sambungan nyata',
        isi: `Pilih enam sampai sepuluh titik yang benar-benar ada, lalu taksir biaya menyambung tiap pasangan yang mungkin disambung.

Tidak semua pasangan harus punya sisi. Sungai, jalan raya, atau jarak yang terlalu jauh membuat sebagian sambungan memang tidak masuk akal.` },
      { judul: 'Jalankan Kruskal dan catat setiap penolakan',
        isi: `Urutkan sisi dari termurah, ambil satu per satu, dan **tolak** yang akan membentuk siklus.

Catat sisi yang ditolak beserta alasannya. Bagian ini yang paling mendidik: sisi murah kadang ditolak karena kedua ujungnya sudah tersambung lewat jalan lain.` },
      { judul: 'Jalankan Prim dari titik berbeda, bandingkan totalnya',
        isi: `Mulai dari satu titik, lalu terus ambil sisi termurah yang menyambung ke titik **baru**.

Ulangi dari titik awal yang berbeda. Himpunan sisinya mungkin berbeda bila ada bobot yang seri — tetapi **total bobotnya selalu sama** dengan Kruskal. Kalau tidak sama, ada kesalahan di implementasimu.` },
      { judul: 'Ukur seberapa berharga memilih yang minimum',
        isi: `Untuk grafmu yang kecil, hitung bobot seluruh pohon rentang yang mungkin, lalu bandingkan yang termurah, rata-rata, dan termahal.

Pada contoh di program, yang termahal lebih dari dua kali lipat yang termurah. Angka itu yang kamu bawa kalau ada yang bertanya kenapa perlu algoritme untuk ini.` },
      { judul: 'Susun kode Huffman untuk satu teks',
        isi: `Hitung frekuensi tiap karakter, lalu gabungkan dua simpul berfrekuensi terkecil berulang kali sampai tinggal satu pohon. Beri 0 ke cabang kiri, 1 ke cabang kanan.

Bandingkan jumlah bitnya dengan kode panjang tetap, dan dengan **entropi** teks itu — batas bawah yang tidak bisa dilampaui kode per karakter mana pun.` },
      { judul: 'Buktikan kodenya bisa dibongkar ulang',
        isi: `Periksa bahwa tidak ada kode yang menjadi awalan kode lain, lalu sandikan teksnya dan bongkar kembali bit demi bit.

Kalau hasilnya sama persis dengan teks asli, kodemu benar. Kalau tidak, hampir pasti ada karakter yang ditaruh di simpul dalam alih-alih di daun.` }
    ],
    cek: [
      'Kamu memeriksa jumlah sisi dan keterhubungan sekaligus sebelum menyebut sebuah graf pohon',
      'Total bobot Kruskal dan Prim-mu sama, dan kamu tahu kenapa himpunan sisinya boleh berbeda',
      'Kamu tahu seberapa jauh pohon rentang termahal dari yang termurah pada datamu',
      'Kode Huffman-mu bisa dibongkar kembali menjadi teks asli tanpa satu karakter pun berubah'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kenapa rakus berhasil di sini, dan kenapa Huffman tidak butuh pemisah',

  konsep: `Pohon adalah graf yang paling sederhana yang masih menyambungkan semua simpul: tidak ada sisi berlebih, tidak ada jalan memutar. Kesederhanaan itu yang membuatnya muncul di mana-mana, dari jaringan kabel sampai format berkas terkompresi.

**Tiga definisi yang setara**

| Bentuk | n | Sisi | n-1 | Terhubung | Pohon? |
|---|---|---|---|---|---|
| Lintasan 5 simpul | 5 | 4 | 4 | ya | **ya** |
| Bintang 5 simpul | 5 | 4 | 4 | ya | **ya** |
| Pohon biner penuh | 7 | 6 | 6 | ya | **ya** |
| Siklus 5 simpul | 5 | 5 | 4 | ya | bukan |
| Segitiga + satu sisi | 5 | 4 | 4 | **tidak** | bukan |

Dua baris terakhir menunjukkan kenapa **dua syarat** dibutuhkan sekaligus.

Siklus-5 terhubung, tetapi sisinya satu terlalu banyak — dan sisi berlebih itulah yang membentuk siklus.

Segitiga ditambah satu sisi punya **tepat** n-1 sisi, tetapi tetap bukan pohon karena tidak terhubung. Sebabnya: satu sisi terpakai menutup siklus di segitiga, sehingga tidak ada lagi sisi tersisa untuk menyambungkan bagian yang lain. **Jumlah sisinya benar, alokasinya salah.**

Dari situ tiga definisi berikut setara, dan kamu boleh memakai yang paling mudah diperiksa:

- terhubung dan tanpa siklus
- terhubung dengan tepat n-1 sisi
- tanpa siklus dengan tepat n-1 sisi

**Berapa banyak pohon yang mungkin**

| n | Hitung langsung | \`n^(n-2)\` |
|---|---|---|
| 2 | 1 | 1 |
| 3 | 3 | 3 |
| 4 | 16 | 16 |
| 5 | 125 | 125 |
| 6 | 1.296 | 1.296 |

Rumus Cayley: ada tepat \`n^(n-2)\` pohon berbeda dengan n simpul **berlabel**. Kolom kedua dihitung dengan mencoba seluruh pilihan n-1 sisi, jadi kecocokannya bukan kebetulan.

Pertumbuhannya yang penting: 10 simpul memberi **100.000.000** pohon, dan menghitungnya langsung menuntut pemeriksaan 886.163.135 pilihan sisi.

Jadi mencari pohon rentang termurah **tidak boleh** dengan mencoba semuanya — dan itu yang membuat Kruskal dan Prim berharga.

**Pohon berakar**

| Istilah | Artinya | Catatan |
|---|---|---|
| Akar | simpul tanpa induk | tepat satu |
| Daun | simpul tanpa anak | boleh banyak |
| Internal | punya anak | bukan daun |
| Tingkat | jarak dari akar | akar di tingkat 0 |
| Tinggi | tingkat terdalam | menentukan biaya telusur |
| Derajat | jumlah anak | biner berarti maksimal 2 |

Satu hitungan yang terus terpakai: pohon biner dengan tinggi h paling banyak punya \`2^(h+1) - 1\` simpul, dan paling banyak \`2^h\` daun.

Dibaca dari arah sebaliknya: n simpul butuh tinggi **minimal** sekitar \`log2(n)\`. Itulah batas bawah biaya pencarian pada pohon — dan alasan pohon yang seimbang jauh lebih cepat daripada pohon yang memanjang seperti daftar berantai.

**Pohon rentang minimum: Kruskal**

Enam gedung, sepuluh jalur kabel yang mungkin, dan biaya tiap jalur. Tujuannya menyambung **semua** gedung dengan total biaya terkecil.

Kruskal: urutkan sisi dari termurah, ambil satu per satu, **tolak yang akan membentuk siklus**.

| Sisi | Bobot | Putusan |
|---|---|---|
| B-C | 2 | ambil |
| A-C | 3 | ambil |
| D-F | 3 | ambil |
| A-B | 4 | **tolak** — A dan B sudah tersambung lewat C |
| D-E | 4 | ambil |
| B-D | 5 | ambil |
| C-E | 6 | tolak |
| C-D | 7 | tolak |
| E-F | 8 | tolak |
| A-E | 9 | tolak |

Lima sisi terpilih (n-1 = 5), total biaya **17**.

Perhatikan baris A-B: sisi itu murah — lebih murah daripada yang diambil sesudahnya — tetapi ditolak, karena A dan B sudah tersambung lewat C. Mengambilnya cuma membentuk jalan memutar yang tidak menambah jangkauan.

**Prim: jalan lain, total sama**

Prim mulai dari satu simpul, lalu terus mengambil sisi termurah yang menyambung ke simpul **baru**.

| Algoritme | Total | Himpunan sisi |
|---|---|---|
| Kruskal | 17 | AC, BC, BD, DE, DF |
| Prim (dari A) | 17 | AC, BC, BD, DE, DF |

Keduanya mengambil keputusan dengan cara yang sama sekali berbeda — Kruskal melihat seluruh sisi sekaligus, Prim cuma melihat tepian daerah yang sudah tumbuh. Tetapi **total bobotnya selalu sama**, karena bobot pohon rentang minimum itu tunggal. Yang bisa berbeda cuma sisi mana yang dipilih, dan itu terjadi kalau ada bobot yang seri.

**Seberapa berharga memilih yang minimum**

| | Biaya |
|---|---|
| Jumlah pohon rentang yang mungkin | 114 |
| Termurah (= hasil MST) | **17** |
| Rata-rata | 25,7 |
| Termahal | 35 |

Memilih sembarang pohon rentang rata-rata berbiaya 25,7, dan yang terburuk 35 — sekitar **106 persen di atas** MST.

Untuk 6 simpul, mencoba seluruh 114 kemungkinan masih bisa. Untuk 60 simpul tidak — dan di situlah Kruskal dan Prim memberi jawaban **pasti** minimum tanpa mencoba semuanya.

**Kode Huffman: pohon untuk memampatkan**

Teks 76 karakter dengan 20 karakter berbeda. Kode panjang tetap butuh 5 bit per karakter, karena \`2^5 = 32\` adalah pangkat dua terkecil yang cukup untuk 20.

Huffman memberi kode **pendek** untuk karakter yang sering muncul dan kode **panjang** untuk yang jarang:

| Karakter | Frekuensi | Kode | Bit |
|---|---|---|---|
| spasi | 9 | 011 | 3 |
| a | 8 | 000 | 3 |
| i | 8 | 001 | 3 |
| e | 6 | 1101 | 4 |
| k | 4 | 11111 | 5 |

| Cara | Total bit | Bit per karakter |
|---|---|---|
| Panjang tetap (5 bit) | 380 | 5,00 |
| **Huffman** | **308** | **4,05** |
| Batas teori (entropi) | — | 4,02 |

Penghematan **18,9 persen**, dan Huffman berada cuma **0,03 bit** per karakter di atas entropi — batas bawah yang tidak bisa dilampaui kode per karakter mana pun. Selisih kecil itu ada karena panjang kode harus bilangan **bulat**, sementara entropi tidak.

**Kenapa tidak perlu tanda pemisah**

Seluruh 20 kode diperiksa berpasangan, dan **tidak ada satu pun yang menjadi awalan kode lain**. Teks disandikan menjadi 308 bit, lalu dibongkar kembali bit demi bit — hasilnya sama persis dengan aslinya.

Sifat itu datang langsung dari bentuk pohonnya: **setiap karakter ditaruh di daun**, jadi tidak ada karakter yang berada di jalan menuju karakter lain. Begitu potongan bit yang terbaca cocok dengan sebuah kode, ia pasti karakter itu.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def kruskal(simpul, sisi):\n    induk = {u: u for u in simpul}\n    def akar(u):\n        while induk[u] != u:\n            induk[u] = induk[induk[u]]\n            u = induk[u]\n        return u\n    hasil, total = [], 0\n    for u, v, w in sorted(sisi, key=lambda s: s[2]):\n        ru, rv = akar(u), akar(v)\n        if ru == rv:            # sudah tersambung -> siklus\n            continue\n        induk[ru] = rv\n        hasil.append((u, v, w))\n        total += w\n    return hasil, total\n\n# total 17 -- sama dengan Prim, sama dengan yang terkecil\n# dari seluruh 114 pohon rentang yang mungkin.",
      penjelasan: `Lima belas baris yang dijamin menemukan jawaban optimal — dan bagian yang paling menarik adalah **kenapa** jaminan itu ada, karena di topik graf kita melihat algoritme rakus yang sama sederhananya bisa meleset sejauh apa pun.

**Mulai dari cara kerjanya.** Sisi diurutkan dari termurah. Setiap sisi diperiksa: kalau kedua ujungnya sudah tersambung, ambil sisi ini akan membentuk siklus, jadi tolak. Kalau belum, ambil.

Pemeriksaan "sudah tersambung atau belum" itu dikerjakan oleh struktur bernama **union-find**, dan dua fungsinya ada di kode.

\`akar(u)\` menelusuri induk sampai ketemu simpul yang induknya dirinya sendiri — itu wakil kelompok u. Dua simpul tersambung kalau wakilnya sama.

\`induk[ru] = rv\` menggabungkan dua kelompok dengan menjadikan wakil yang satu anak dari wakil yang lain.

Dan satu baris yang tampak seperti hiasan tetapi menentukan kecepatannya: \`induk[u] = induk[induk[u]]\`. Sambil menelusuri ke atas, setiap simpul langsung dipindahkan satu tingkat lebih dekat ke akarnya. Penelusuran berikutnya jadi lebih pendek. Tanpa baris itu, rantai induk bisa memanjang dan setiap pemeriksaan menjadi lambat.

**Sekarang kenapa rakus berhasil di sini.**

Di topik graf, pewarnaan rakus dengan urutan yang buruk memakai empat warna padahal dua cukup. Setiap keputusannya sah saat diambil, dan hasilnya tetap jauh dari optimal.

Di sini, keputusan rakus **tidak pernah** perlu disesali. Alasannya bisa dilihat langsung.

Bayangkan Kruskal mengambil sisi termurah yang menyambung dua kelompok yang terpisah. Sekarang andaikan ada pohon rentang minimum yang **tidak** memakai sisi itu. Pohon itu pasti menyambungkan kedua kelompok lewat sisi lain — dan sisi lain itu **tidak lebih murah**, karena Kruskal mengambil yang termurah.

Tukar sisi itu dengan sisi pilihan Kruskal. Hasilnya tetap pohon rentang, dan bobotnya tidak bertambah. Jadi selalu ada pohon rentang minimum yang memakai pilihan Kruskal.

Argumen itu berlaku di **setiap** langkah, sehingga seluruh pilihan Kruskal bisa dipertahankan sampai akhir.

Perhatikan bentuk argumennya: ia bekerja karena pilihan yang diambil sekarang **tidak mempersempit** pilihan yang tersedia nanti. Mengambil sisi termurah tidak pernah menutup kemungkinan yang lebih baik.

Pada pewarnaan graf, sifat itu tidak ada. Memberi warna 1 pada b0 terasa tidak merugikan, tetapi ia mempersempit pilihan untuk a1, dan kerugiannya baru muncul beberapa langkah kemudian.

**Inilah pembeda yang berguna untuk menilai algoritme rakus apa pun**: tanyakan apakah keputusan yang diambil sekarang bisa mempersempit pilihan yang lebih baik nanti. Kalau tidak bisa, rakus kemungkinan besar optimal. Kalau bisa, rakus cuma heuristik.

**Dan hasilnya pada data nyata.**

Total 17 dari Kruskal sama dengan total dari Prim, dan sama dengan yang terkecil dari seluruh **114** pohon rentang yang mungkin. Kecocokan tiga arah itu bukan pembuktian — pembuktiannya argumen tukar di atas — tetapi ia pemeriksaan praktis yang menangkap kesalahan implementasi.

Kalau Kruskal dan Prim di kodemu memberi total berbeda, salah satunya pasti salah. Itu uji termurah yang bisa kamu tambahkan.`
    },
    {
      bahasa: 'python',
      kode: "# Huffman: gabung dua yang TERKECIL, berulang\n#\n#   karakter  frek   kode   bit\n#   spasi        9    011     3\n#   a            8    000     3\n#   i            8    001     3\n#   e            6   1101     4\n#   k            4  11111     5\n#\n#   panjang tetap (5 bit)   380 bit   5,00 / karakter\n#   Huffman                 308 bit   4,05 / karakter\n#   entropi (batas teori)      -      4,02 / karakter\n#\n# Tidak ada kode yang jadi AWALAN kode lain.\n# Disandikan lalu dibongkar: sama persis dengan aslinya.",
      penjelasan: `Satu pohon yang menyelesaikan dua persoalan sekaligus: memendekkan data, dan membuatnya tetap bisa dibaca tanpa tanda pemisah.

**Mulai dari persoalan pertama: memendekkan.**

Kode panjang tetap memperlakukan semua karakter sama — 5 bit untuk spasi, 5 bit untuk huruf yang cuma muncul sekali. Padahal spasi muncul 9 kali dan beberapa huruf cuma sekali.

Gagasan Huffman: beri kode **pendek** untuk yang sering, kode **panjang** untuk yang jarang. Karena yang sering muncul lebih sering, penghematan pada yang sering lebih besar daripada tambahan pada yang jarang.

Hasilnya 308 bit lawan 380 — hemat 18,9 persen, tanpa kehilangan satu bit informasi pun.

**Cara membangunnya**, dan kenapa cara itu yang benar.

Ambil dua simpul berfrekuensi **terkecil**, gabungkan jadi satu simpul baru yang frekuensinya jumlah keduanya. Ulangi sampai tinggal satu.

Kenapa dua yang terkecil? Karena setiap penggabungan menambah satu bit ke kode seluruh karakter di bawah simpul itu. Penggabungan pertama akan berada paling dalam di pohon, jadi karakternya mendapat kode paling panjang — dan yang pantas mendapat kode paling panjang adalah yang paling jarang muncul.

Ini algoritme rakus lagi, dan seperti Kruskal, ia **dijamin optimal** di antara kode per karakter — dengan argumen tukar yang bentuknya serupa.

**Sekarang batasnya: entropi.**

Entropi teks ini 4,02 bit per karakter. Itu batas bawah teoretis: **tidak ada** kode per karakter yang bisa turun di bawahnya, secerdas apa pun.

Huffman mencapai 4,05 — cuma 0,03 bit di atas batas mutlak.

Selisih kecil itu ada karena panjang kode harus **bilangan bulat**. Karakter yang idealnya butuh 3,2 bit harus diberi 3 atau 4. Kompresor modern mengatasi batas ini dengan **pengodean aritmetika**, yang tidak memberi kode per karakter melainkan menyandikan seluruh pesan sebagai satu bilangan — dan bisa mendekati entropi lebih rapat lagi.

**Sekarang persoalan kedua, dan ini yang lebih halus: membaca tanpa pemisah.**

Kode panjang tetap mudah dibaca: potong setiap 5 bit. Kode panjang berubah-ubah tampak bermasalah — kalau bitnya \`011000001\`, di mana satu karakter berakhir dan karakter berikutnya mulai?

Jawabannya ada di satu sifat: **tidak ada kode yang menjadi awalan kode lain.** Program memeriksa seluruh 20 kode berpasangan dan tidak menemukan satu pun.

Dengan sifat itu, pembacaannya jadi mekanis. Baca bit satu per satu. Begitu potongan yang terkumpul cocok dengan sebuah kode, ia **pasti** karakter itu — karena tidak ada kode lebih panjang yang dimulai dengan potongan yang sama. Keluarkan karakternya, kosongkan potongan, lanjutkan.

\`011\` adalah spasi, dan tidak ada kode lain yang diawali \`011\`. Jadi setelah tiga bit itu terbaca, tidak ada keraguan sama sekali.

**Dan sifat itu datang gratis dari bentuk pohonnya.**

Setiap karakter ditaruh di **daun**. Kode sebuah karakter adalah jalan dari akar ke daunnya. Karena daun tidak punya anak, tidak ada jalan ke karakter lain yang melewati daun itu — dan karena itu tidak ada kode yang menjadi awalan kode lain.

Kalau karakter ditaruh di simpul dalam, kodenya akan menjadi awalan kode seluruh karakter di bawahnya, dan pembacaan langsung ambigu.

Jadi Huffman tidak perlu memeriksa sifat awalan bebas secara terpisah. Sifat itu **dijamin oleh struktur** yang dipakainya — contoh bagus dari prinsip bahwa jaminan terbaik bukan yang diperiksa, melainkan yang tidak mungkin dilanggar oleh bentuk datanya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Pohon: sifat, pohon rentang minimum, Huffman
# ============================================
import itertools
import math

# --------------------------------------------
# 1. Sifat pohon: n simpul, n-1 sisi
# --------------------------------------------
print("--- pohon dengan n simpul selalu punya n-1 sisi ---")
def terhubung(n, sisi_daftar):
    tetangga = {i: [] for i in range(n)}
    for u, v in sisi_daftar:
        tetangga[u].append(v)
        tetangga[v].append(u)
    belum = set(range(n))
    tumpuk = [0]
    belum.discard(0)
    while tumpuk:
        u = tumpuk.pop()
        for v in tetangga[u]:
            if v in belum:
                belum.discard(v)
                tumpuk.append(v)
    return not belum

def pohon(n, sisi_daftar):
    return len(sisi_daftar) == n - 1 and terhubung(n, sisi_daftar)

CONTOH = [
    ("Lintasan 5 simpul", 5, [(0, 1), (1, 2), (2, 3), (3, 4)]),
    ("Bintang 5 simpul",  5, [(0, 1), (0, 2), (0, 3), (0, 4)]),
    ("Pohon biner penuh", 7, [(0, 1), (0, 2), (1, 3), (1, 4),
                              (2, 5), (2, 6)]),
    ("Siklus 5 simpul",   5, [(0, 1), (1, 2), (2, 3), (3, 4),
                              (4, 0)]),
    ("Segitiga + satu sisi", 5, [(0, 1), (1, 2), (2, 0), (3, 4)]),
]
print("  " + "bentuk".ljust(20) + "n".rjust(4) + "sisi".rjust(6)
      + "n-1".rjust(5) + "terhubung".rjust(11) + "  pohon?")
for nama, n, sisi_daftar in CONTOH:
    print("  " + nama.ljust(20) + str(n).rjust(4)
          + str(len(sisi_daftar)).rjust(6) + str(n - 1).rjust(5)
          + ("ya" if terhubung(n, sisi_daftar) else "tidak").rjust(11)
          + ("  YA" if pohon(n, sisi_daftar) else "  bukan"))
print("")
print("  Perhatikan dua baris terakhir, dan kenapa DUA syarat")
print("  dibutuhkan sekaligus.")
print("")
print("  Siklus-5 terhubung, tetapi sisinya 5 -- satu terlalu")
print("  banyak, dan sisi berlebih itulah yang membentuk siklus.")
print("")
print("  'Segitiga + satu sisi' sisinya TEPAT 4 = n-1, tetapi")
print("  tetap bukan pohon karena tidak terhubung.")
print("")
print("  Perhatikan sebabnya, karena di situ letak kaitannya:")
print("  satu sisi terpakai menutup siklus di segitiga, sehingga")
print("  tidak ada lagi sisi tersisa untuk menyambungkan bagian")
print("  yang lain. Jumlah sisinya benar, alokasinya salah.")
print("")
print("  Jadi tiga cara mendefinisikan pohon ini setara:")
print("    terhubung dan tanpa siklus")
print("    terhubung dengan tepat n-1 sisi")
print("    tanpa siklus dengan tepat n-1 sisi")

# --------------------------------------------
# 2. Berapa banyak pohon berlabel: rumus Cayley
# --------------------------------------------
print("")
print("--- menghitung SELURUH pohon berlabel n simpul ---")
def cacah_pohon(n):
    semua_pasang = list(itertools.combinations(range(n), 2))
    jumlah = 0
    for pilih in itertools.combinations(semua_pasang, n - 1):
        if terhubung(n, list(pilih)):
            jumlah += 1
    return jumlah

print("  " + "n".rjust(4) + "hitung langsung".rjust(17)
      + "n^(n-2)".rjust(11) + "  cocok?")
for n in range(2, 7):
    nyata = cacah_pohon(n)
    rumus = n ** (n - 2)
    print("  " + str(n).rjust(4) + str(nyata).rjust(17)
          + str(rumus).rjust(11)
          + ("  ya" if nyata == rumus else "  TIDAK"))
print("")
print("  Rumus Cayley: ada tepat n^(n-2) pohon berbeda dengan n")
print("  simpul BERLABEL. Kolom pertama dihitung dengan mencoba")
print("  seluruh pilihan n-1 sisi, jadi kecocokannya bukan")
print("  kebetulan.")
print("")
print("  Perhatikan pertumbuhannya: 6 simpul sudah memberi 1.296")
print("  pohon, dan 10 simpul memberi "
      + f"{10 ** 8:,}".replace(",", ".") + ".")
print("")
print("  Itu sebabnya hitung langsung di tabel berhenti di n = 6:")
print("  untuk n = 10 ia harus memeriksa "
      + f"{math.comb(45, 9):,}".replace(",", ".") + " pilihan sisi.")
print("")
print("  Gunanya bukan sekadar mencacah. Kalau ada begitu banyak")
print("  pohon rentang yang mungkin untuk satu graf, mencari yang")
print("  TERMURAH tidak boleh dengan mencoba semua -- dan itu")
print("  yang membuat Kruskal dan Prim berharga.")

# --------------------------------------------
# 3. Pohon berakar: istilah yang dipakai terus
# --------------------------------------------
print("")
print("--- pohon berakar: istilahnya ---")
ISTILAH = [
    ("Akar",      "simpul tanpa induk", "tepat satu"),
    ("Daun",      "simpul tanpa anak",  "boleh banyak"),
    ("Internal",  "punya anak",         "bukan daun"),
    ("Tingkat",   "jarak dari akar",    "akar di tingkat 0"),
    ("Tinggi",    "tingkat terdalam",   "menentukan biaya telusur"),
    ("Derajat",   "jumlah anak",        "biner berarti maksimal 2"),
]
for a, b, c in ISTILAH:
    print("  " + a.ljust(11) + b.ljust(23) + c)
print("")
print("  Satu hitungan yang selalu terpakai: pohon biner dengan")
print("  tinggi h paling banyak punya 2^(h+1) - 1 simpul.")
print("")
print("  " + "tinggi".rjust(8) + "simpul maksimum".rjust(18)
      + "daun maksimum".rjust(16))
for h in range(0, 6):
    print("  " + str(h).rjust(8) + str(2 ** (h + 1) - 1).rjust(18)
          + str(2 ** h).rjust(16))
print("")
print("  Dibaca dari arah sebaliknya: n simpul butuh tinggi")
print("  MINIMAL sekitar log2(n). Itulah batas bawah biaya")
print("  pencarian pada pohon -- dan alasan pohon yang")
print("  seimbang jauh lebih cepat daripada pohon yang")
print("  memanjang seperti daftar berantai.")

# --------------------------------------------
# 4. Pohon rentang minimum: Kruskal
# --------------------------------------------
print("")
print("--- pohon rentang minimum: menyambung semua, termurah ---")
SIMPUL = ['A', 'B', 'C', 'D', 'E', 'F']
SISI = [
    ('A', 'B', 4), ('A', 'C', 3), ('B', 'C', 2), ('B', 'D', 5),
    ('C', 'D', 7), ('C', 'E', 6), ('D', 'E', 4), ('D', 'F', 3),
    ('E', 'F', 8), ('A', 'E', 9),
]
print("  " + str(len(SIMPUL)) + " gedung, " + str(len(SISI))
      + " jalur kabel yang mungkin")
print("")

def kruskal(simpul, sisi_berbobot):
    induk = {u: u for u in simpul}

    def akar(u):
        while induk[u] != u:
            induk[u] = induk[induk[u]]
            u = induk[u]
        return u

    hasil, total = [], 0
    for u, v, w in sorted(sisi_berbobot, key=lambda s: s[2]):
        ru, rv = akar(u), akar(v)
        if ru == rv:
            continue
        induk[ru] = rv
        hasil.append((u, v, w))
        total += w
    return hasil, total

pilih_k, total_k = kruskal(SIMPUL, SISI)
print("  Kruskal: urutkan sisi dari termurah, ambil kalau tidak")
print("  membentuk siklus.")
print("")
print("  " + "sisi".ljust(8) + "bobot".rjust(7) + "  putusan")
for u, v, w in sorted(SISI, key=lambda s: s[2]):
    status = "AMBIL" if (u, v, w) in pilih_k else "tolak (siklus)"
    print("  " + (u + "-" + v).ljust(8) + str(w).rjust(7)
          + "  " + status)
print("")
print("  terpilih : " + ", ".join(u + "-" + v for u, v, _ in pilih_k))
print("  jumlah sisi : " + str(len(pilih_k)) + "  (n-1 = "
      + str(len(SIMPUL) - 1) + ")")
print("  total biaya : " + str(total_k))

# --------------------------------------------
# 5. Prim: jalan berbeda, hasil sama nilainya
# --------------------------------------------
print("")
print("--- Prim: tumbuh dari satu simpul ---")
def prim(simpul, sisi_berbobot, awal):
    di_dalam = {awal}
    hasil, total = [], 0
    while len(di_dalam) < len(simpul):
        calon = [(w, u, v) for u, v, w in sisi_berbobot
                 if (u in di_dalam) != (v in di_dalam)]
        w, u, v = min(calon)
        hasil.append((u, v, w))
        total += w
        di_dalam.add(u)
        di_dalam.add(v)
    return hasil, total

pilih_p, total_p = prim(SIMPUL, SISI, 'A')
print("  Prim: mulai dari A, terus ambil sisi termurah yang")
print("  menyambung ke simpul BARU.")
print("")
print("  terpilih : " + ", ".join(u + "-" + v for u, v, _ in pilih_p))
print("  total biaya : " + str(total_p))
print("")
print("  " + "algoritme".ljust(12) + "total".rjust(7)
      + "  himpunan sisi")
print("  " + "Kruskal".ljust(12) + str(total_k).rjust(7) + "  "
      + ", ".join(sorted(u + v for u, v, _ in pilih_k)))
print("  " + "Prim".ljust(12) + str(total_p).rjust(7) + "  "
      + ", ".join(sorted(u + v for u, v, _ in pilih_p)))
print("")
print("  total sama : " + ("YA" if total_k == total_p else "TIDAK"))
print("")
print("  Keduanya mengambil keputusan dengan cara yang sama sekali")
print("  berbeda -- Kruskal melihat seluruh sisi sekaligus, Prim")
print("  cuma melihat tepian daerah yang sudah tumbuh.")
print("")
print("  Tetapi total bobotnya selalu sama, dan itu bukan")
print("  kebetulan: pohon rentang MINIMUM bobotnya tunggal.")
print("  Yang bisa berbeda cuma sisi mana yang dipilih, dan itu")
print("  terjadi kalau ada bobot yang seri.")

# --------------------------------------------
# 6. Seberapa berharga memilih yang minimum
# --------------------------------------------
print("")
print("--- MST vs pohon rentang sembarang ---")
def semua_pohon_rentang(simpul, sisi_berbobot):
    hasil = []
    idx = {u: i for i, u in enumerate(simpul)}
    for pilih in itertools.combinations(sisi_berbobot,
                                        len(simpul) - 1):
        sisi_idx = [(idx[u], idx[v]) for u, v, _ in pilih]
        if terhubung(len(simpul), sisi_idx):
            hasil.append(sum(w for _, _, w in pilih))
    return hasil

bobot_semua = semua_pohon_rentang(SIMPUL, SISI)
rata = sum(bobot_semua) / len(bobot_semua)
print("  jumlah pohon rentang yang mungkin : "
      + str(len(bobot_semua)))
print("  biaya terkecil : " + str(min(bobot_semua)))
print("  biaya terbesar : " + str(max(bobot_semua)))
print("  rata-rata      : " + ("%.1f" % rata))
print("")
print("  MST memberi " + str(total_k)
      + ", dan itu sama dengan yang terkecil: "
      + ("YA" if total_k == min(bobot_semua) else "TIDAK"))
print("")
print("  Memilih sembarang pohon rentang rata-rata berbiaya "
      + ("%.1f" % rata) + ",")
print("  dan yang terburuk " + str(max(bobot_semua))
      + " -- sekitar "
      + ("%.0f%%" % ((max(bobot_semua) / total_k - 1) * 100))
      + " di atas MST.")
print("")
print("  Untuk 6 simpul, mencoba seluruh " + str(len(bobot_semua))
      + " kemungkinan masih")
print("  bisa. Untuk 60 simpul tidak -- dan di situlah Kruskal")
print("  dan Prim memberi jawaban PASTI minimum tanpa mencoba")
print("  semuanya.")

# --------------------------------------------
# 7. Kode Huffman: pohon yang menghemat bit
# --------------------------------------------
print("")
print("--- kode Huffman: pohon untuk memampatkan ---")
TEKS = ("matematika diskrit mempelajari objek diskrit "
        "seperti graf pohon dan himpunan")
frek = {}
for ch in TEKS:
    frek[ch] = frek.get(ch, 0) + 1

def bangun_huffman(frekuensi):
    antre = [(f, i, ch) for i, (ch, f)
             in enumerate(sorted(frekuensi.items()))]
    berikut = len(antre)
    while len(antre) > 1:
        antre.sort()
        (f1, _, a) = antre.pop(0)
        (f2, _, b) = antre.pop(0)
        antre.append((f1 + f2, berikut, (a, b)))
        berikut += 1
    return antre[0][2]

def kode_dari(pohon_h, awalan=""):
    if not isinstance(pohon_h, tuple):
        return {pohon_h: awalan or "0"}
    kiri, kanan = pohon_h
    hasil = {}
    hasil.update(kode_dari(kiri, awalan + "0"))
    hasil.update(kode_dari(kanan, awalan + "1"))
    return hasil

akar_h = bangun_huffman(frek)
kode = kode_dari(akar_h)

print("  panjang teks : " + str(len(TEKS)) + " karakter")
print("  karakter berbeda : " + str(len(frek)))
print("")
print("  " + "karakter".ljust(11) + "frekuensi".rjust(11)
      + "kode".rjust(12) + "bit".rjust(5))
for ch in sorted(frek, key=lambda c: -frek[c])[:8]:
    tampil = "'" + (ch if ch != " " else "spasi") + "'"
    print("  " + tampil.ljust(11) + str(frek[ch]).rjust(11)
          + kode[ch].rjust(12) + str(len(kode[ch])).rjust(5))
print("      ... " + str(len(frek) - 8) + " karakter lain")
print("")
lebar_tetap = math.ceil(math.log2(len(frek)))
bit_tetap = len(TEKS) * lebar_tetap
bit_huffman = sum(frek[ch] * len(kode[ch]) for ch in frek)
entropi = -sum((frek[ch] / len(TEKS))
               * math.log2(frek[ch] / len(TEKS)) for ch in frek)
print("  " + "cara".ljust(26) + "total bit".rjust(11)
      + "bit/karakter".rjust(14))
print("  " + ("panjang tetap (" + str(lebar_tetap)
              + " bit)").ljust(26)
      + str(bit_tetap).rjust(11)
      + ("%.2f" % (bit_tetap / len(TEKS))).rjust(14))
print("  " + "Huffman".ljust(26) + str(bit_huffman).rjust(11)
      + ("%.2f" % (bit_huffman / len(TEKS))).rjust(14))
print("  " + "batas teori (entropi)".ljust(26) + "-".rjust(11)
      + ("%.2f" % entropi).rjust(14))
print("")
print("  penghematan : "
      + ("%.1f%%" % ((1 - bit_huffman / bit_tetap) * 100)))
print("")
print("  Perhatikan baris ketiga. Entropi adalah batas bawah")
print("  teoretis: TIDAK ADA kode per karakter yang bisa turun")
print("  di bawahnya.")
print("")
print("  Huffman berada sangat dekat di atasnya -- selisihnya "
      + ("%.2f" % (bit_huffman / len(TEKS) - entropi)) + " bit")
print("  per karakter. Dan selisih itu ada karena panjang kode")
print("  harus bilangan BULAT, sementara entropi tidak.")

# --------------------------------------------
# 8. Kenapa kodenya bisa dibaca tanpa pemisah
# --------------------------------------------
print("")
print("--- sifat awalan bebas: kenapa tidak perlu pemisah ---")
def cek_awalan_bebas(daftar_kode):
    for a in daftar_kode:
        for b in daftar_kode:
            if a != b and b.startswith(a):
                return False, (a, b)
    return True, None

bebas, contoh = cek_awalan_bebas(list(kode.values()))
print("  seluruh " + str(len(kode)) + " kode diperiksa berpasangan")
print("  ada kode yang jadi awalan kode lain : "
      + ("TIDAK" if bebas else "YA " + str(contoh)))
print("")
sandi = "".join(kode[ch] for ch in TEKS)
balik = {v: k for k, v in kode.items()}
hasil, buffer = [], ""
for bit in sandi:
    buffer += bit
    if buffer in balik:
        hasil.append(balik[buffer])
        buffer = ""
pulih = "".join(hasil)
print("  panjang sandi : " + str(len(sandi)) + " bit")
print("  hasil bongkar sama dengan teks asli : "
      + ("YA" if pulih == TEKS else "TIDAK"))
print("")
print("  Ini yang membuat Huffman bekerja tanpa tanda pemisah")
print("  antar karakter. Begitu potongan bit yang terbaca cocok")
print("  dengan sebuah kode, ia PASTI karakter itu -- tidak")
print("  mungkin ia awalan dari kode yang lebih panjang.")
print("")
print("  Dan sifat itu datang langsung dari bentuk pohonnya:")
print("  setiap karakter ditaruh di DAUN, jadi tidak ada")
print("  karakter yang berada di jalan menuju karakter lain.")
print("")
print("  Kalau karakter ditaruh di simpul dalam, kodenya akan")
print("  jadi awalan kode di bawahnya -- dan pembongkarannya")
print("  langsung ambigu.")` },
  output: `--- pohon dengan n simpul selalu punya n-1 sisi ---
  bentuk                 n  sisi  n-1  terhubung  pohon?
  Lintasan 5 simpul      5     4    4         ya  YA
  Bintang 5 simpul       5     4    4         ya  YA
  Pohon biner penuh      7     6    6         ya  YA
  Siklus 5 simpul        5     5    4         ya  bukan
  Segitiga + satu sisi   5     4    4      tidak  bukan

  Perhatikan dua baris terakhir, dan kenapa DUA syarat
  dibutuhkan sekaligus.

  Siklus-5 terhubung, tetapi sisinya 5 -- satu terlalu
  banyak, dan sisi berlebih itulah yang membentuk siklus.

  'Segitiga + satu sisi' sisinya TEPAT 4 = n-1, tetapi
  tetap bukan pohon karena tidak terhubung.

  Perhatikan sebabnya, karena di situ letak kaitannya:
  satu sisi terpakai menutup siklus di segitiga, sehingga
  tidak ada lagi sisi tersisa untuk menyambungkan bagian
  yang lain. Jumlah sisinya benar, alokasinya salah.

  Jadi tiga cara mendefinisikan pohon ini setara:
    terhubung dan tanpa siklus
    terhubung dengan tepat n-1 sisi
    tanpa siklus dengan tepat n-1 sisi

--- menghitung SELURUH pohon berlabel n simpul ---
     n  hitung langsung    n^(n-2)  cocok?
     2                1          1  ya
     3                3          3  ya
     4               16         16  ya
     5              125        125  ya
     6             1296       1296  ya

  Rumus Cayley: ada tepat n^(n-2) pohon berbeda dengan n
  simpul BERLABEL. Kolom pertama dihitung dengan mencoba
  seluruh pilihan n-1 sisi, jadi kecocokannya bukan
  kebetulan.

  Perhatikan pertumbuhannya: 6 simpul sudah memberi 1.296
  pohon, dan 10 simpul memberi 100.000.000.

  Itu sebabnya hitung langsung di tabel berhenti di n = 6:
  untuk n = 10 ia harus memeriksa 886.163.135 pilihan sisi.

  Gunanya bukan sekadar mencacah. Kalau ada begitu banyak
  pohon rentang yang mungkin untuk satu graf, mencari yang
  TERMURAH tidak boleh dengan mencoba semua -- dan itu
  yang membuat Kruskal dan Prim berharga.

--- pohon berakar: istilahnya ---
  Akar       simpul tanpa induk     tepat satu
  Daun       simpul tanpa anak      boleh banyak
  Internal   punya anak             bukan daun
  Tingkat    jarak dari akar        akar di tingkat 0
  Tinggi     tingkat terdalam       menentukan biaya telusur
  Derajat    jumlah anak            biner berarti maksimal 2

  Satu hitungan yang selalu terpakai: pohon biner dengan
  tinggi h paling banyak punya 2^(h+1) - 1 simpul.

    tinggi   simpul maksimum   daun maksimum
         0                 1               1
         1                 3               2
         2                 7               4
         3                15               8
         4                31              16
         5                63              32

  Dibaca dari arah sebaliknya: n simpul butuh tinggi
  MINIMAL sekitar log2(n). Itulah batas bawah biaya
  pencarian pada pohon -- dan alasan pohon yang
  seimbang jauh lebih cepat daripada pohon yang
  memanjang seperti daftar berantai.

--- pohon rentang minimum: menyambung semua, termurah ---
  6 gedung, 10 jalur kabel yang mungkin

  Kruskal: urutkan sisi dari termurah, ambil kalau tidak
  membentuk siklus.

  sisi      bobot  putusan
  B-C           2  AMBIL
  A-C           3  AMBIL
  D-F           3  AMBIL
  A-B           4  tolak (siklus)
  D-E           4  AMBIL
  B-D           5  AMBIL
  C-E           6  tolak (siklus)
  C-D           7  tolak (siklus)
  E-F           8  tolak (siklus)
  A-E           9  tolak (siklus)

  terpilih : B-C, A-C, D-F, D-E, B-D
  jumlah sisi : 5  (n-1 = 5)
  total biaya : 17

--- Prim: tumbuh dari satu simpul ---
  Prim: mulai dari A, terus ambil sisi termurah yang
  menyambung ke simpul BARU.

  terpilih : A-C, B-C, B-D, D-F, D-E
  total biaya : 17

  algoritme     total  himpunan sisi
  Kruskal          17  AC, BC, BD, DE, DF
  Prim             17  AC, BC, BD, DE, DF

  total sama : YA

  Keduanya mengambil keputusan dengan cara yang sama sekali
  berbeda -- Kruskal melihat seluruh sisi sekaligus, Prim
  cuma melihat tepian daerah yang sudah tumbuh.

  Tetapi total bobotnya selalu sama, dan itu bukan
  kebetulan: pohon rentang MINIMUM bobotnya tunggal.
  Yang bisa berbeda cuma sisi mana yang dipilih, dan itu
  terjadi kalau ada bobot yang seri.

--- MST vs pohon rentang sembarang ---
  jumlah pohon rentang yang mungkin : 114
  biaya terkecil : 17
  biaya terbesar : 35
  rata-rata      : 25.7

  MST memberi 17, dan itu sama dengan yang terkecil: YA

  Memilih sembarang pohon rentang rata-rata berbiaya 25.7,
  dan yang terburuk 35 -- sekitar 106% di atas MST.

  Untuk 6 simpul, mencoba seluruh 114 kemungkinan masih
  bisa. Untuk 60 simpul tidak -- dan di situlah Kruskal
  dan Prim memberi jawaban PASTI minimum tanpa mencoba
  semuanya.

--- kode Huffman: pohon untuk memampatkan ---
  panjang teks : 76 karakter
  karakter berbeda : 20

  karakter     frekuensi        kode  bit
  'spasi'              9         011    3
  'a'                  8         000    3
  'i'                  8         001    3
  'e'                  6        1101    4
  'm'                  5        1001    4
  't'                  5        1011    4
  'r'                  5        1010    4
  'k'                  4       11111    5
      ... 12 karakter lain

  cara                        total bit  bit/karakter
  panjang tetap (5 bit)             380          5.00
  Huffman                           308          4.05
  batas teori (entropi)               -          4.02

  penghematan : 18.9%

  Perhatikan baris ketiga. Entropi adalah batas bawah
  teoretis: TIDAK ADA kode per karakter yang bisa turun
  di bawahnya.

  Huffman berada sangat dekat di atasnya -- selisihnya 0.03 bit
  per karakter. Dan selisih itu ada karena panjang kode
  harus bilangan BULAT, sementara entropi tidak.

--- sifat awalan bebas: kenapa tidak perlu pemisah ---
  seluruh 20 kode diperiksa berpasangan
  ada kode yang jadi awalan kode lain : TIDAK

  panjang sandi : 308 bit
  hasil bongkar sama dengan teks asli : YA

  Ini yang membuat Huffman bekerja tanpa tanda pemisah
  antar karakter. Begitu potongan bit yang terbaca cocok
  dengan sebuah kode, ia PASTI karakter itu -- tidak
  mungkin ia awalan dari kode yang lebih panjang.

  Dan sifat itu datang langsung dari bentuk pohonnya:
  setiap karakter ditaruh di DAUN, jadi tidak ada
  karakter yang berada di jalan menuju karakter lain.

  Kalau karakter ditaruh di simpul dalam, kodenya akan
  jadi awalan kode di bawahnya -- dan pembongkarannya
  langsung ambigu.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Periksa apakah graf sebuah pohon', waktu: 'O(V + E)', memori: 'hitung sisi, telusuri keterhubungan' },
      { operasi: 'Cacah seluruh pohon berlabel', waktu: 'O(C(n(n-1)/2, n-1))', memori: 'hanya layak sampai n sekitar 6' },
      { operasi: 'Kruskal dengan union-find', waktu: 'O(E log E)', memori: 'didominasi pengurutan sisi' },
      { operasi: 'Prim dengan antrean prioritas', waktu: 'O(E log V)', memori: 'versi di program O(V . E), cukup untuk data kecil' },
      { operasi: 'Bangun pohon Huffman', waktu: 'O(k log k)', memori: 'k = jumlah karakter berbeda' },
      { operasi: 'Sandikan atau bongkar teks', waktu: 'O(panjang teks)', memori: 'satu kali telusur' }
    ],
    intuisi: `Baris kedua dan ketiga yang layak dibandingkan. Mencacah seluruh pohon untuk mencari yang termurah tumbuh sangat cepat — untuk 10 simpul sudah 886 juta pilihan sisi yang harus diperiksa. Kruskal \`O(E log E)\` menyelesaikan persoalan yang sama untuk jutaan sisi dalam hitungan detik.

Dan yang membuat selisih itu mungkin bukan kecerdikan kode, melainkan **sifat persoalannya**: keputusan rakus tidak pernah mempersempit pilihan yang lebih baik, sehingga tidak ada yang perlu dicoba ulang.

Satu catatan jujur: versi Prim di program memeriksa seluruh sisi setiap langkah, jadi \`O(V . E)\` — sederhana dibaca, tetapi lambat untuk graf besar. Versi yang dipakai sungguhan menyimpan sisi tepian di antrean prioritas dan turun ke \`O(E log V)\`.`
  },

  kesalahanUmum: [
    {
      salah: 'Menyebut sebuah graf pohon karena jumlah sisinya n-1.',
      kenapa: 'Jumlah sisi n-1 hanya salah satu syarat, dan graf dengan jumlah sisi itu bisa tetap tidak terhubung bila salah satu sisinya terpakai membentuk siklus. Segitiga ditambah satu sisi terpisah adalah contohnya.',
      benar: 'Periksa jumlah sisi dan keterhubungan sekaligus, atau keterhubungan dan ketiadaan siklus sekaligus.'
    },
    {
      salah: 'Mencari pohon rentang termurah dengan mencoba seluruh pohon rentang yang mungkin.',
      kenapa: 'Jumlah pohon rentang tumbuh sangat cepat, sehingga graf kecil pun sudah punya ratusan kemungkinan dan graf sedang punya miliaran. Pencarian menyeluruh tidak selesai untuk ukuran nyata.',
      benar: 'Pakai Kruskal atau Prim, yang dijamin memberi bobot minimum tanpa mencoba seluruh kemungkinan.'
    },
    {
      salah: 'Menganggap Kruskal dan Prim salah karena himpunan sisi yang dipilih berbeda.',
      kenapa: 'Bila ada bobot yang seri, bisa ada lebih dari satu pohon rentang minimum dengan bobot sama, dan kedua algoritme boleh memilih yang berbeda. Yang tunggal adalah total bobotnya, bukan himpunan sisinya.',
      benar: 'Bandingkan total bobotnya, dan anggap ada kesalahan hanya bila totalnya berbeda.'
    },
    {
      salah: 'Mengira setiap algoritme rakus optimal karena Kruskal optimal.',
      kenapa: 'Kruskal optimal karena keputusan mengambil sisi termurah tidak pernah mempersempit pilihan yang lebih baik nanti, dan sifat itu tidak dimiliki semua persoalan. Pada pewarnaan graf, keputusan rakus yang sah bisa menghasilkan jumlah warna dua kali lipat dari yang perlu.',
      benar: 'Periksa apakah keputusan sekarang bisa menutup pilihan yang lebih baik nanti sebelum mengandalkan hasil rakus sebagai optimal.'
    },
    {
      salah: 'Menulis union-find tanpa pemendekan jalur.',
      kenapa: 'Tanpa pemendekan, rantai induk bisa memanjang sepanjang jumlah simpul, sehingga setiap pemeriksaan keterhubungan menjadi lambat dan Kruskal kehilangan kecepatannya. Kesalahan ini tidak terlihat pada data kecil.',
      benar: 'Pindahkan tiap simpul lebih dekat ke akarnya saat menelusuri, dan pertimbangkan penggabungan berdasarkan ukuran kelompok.'
    },
    {
      salah: 'Menaruh karakter di simpul dalam pohon kode.',
      kenapa: 'Kode karakter di simpul dalam menjadi awalan kode seluruh karakter di bawahnya, sehingga pembacaan bit demi bit tidak bisa memutuskan kapan satu karakter berakhir. Hasilnya sandi yang tidak bisa dibongkar dengan pasti.',
      benar: 'Letakkan setiap karakter di daun, sehingga sifat awalan bebas dijamin oleh bentuk pohonnya.'
    },
    {
      salah: 'Mengharapkan Huffman bisa memampatkan di bawah entropi teksnya.',
      kenapa: 'Entropi adalah batas bawah teoretis bagi kode per karakter, dan tidak ada kode seperti itu yang bisa melampauinya. Huffman sudah sangat dekat, dan sisa selisihnya berasal dari keharusan panjang kode berupa bilangan bulat.',
      benar: 'Pakai entropi sebagai acuan batas, dan bila perlu mendekatinya lebih rapat, pakai pengodean aritmetika atau pemodelan konteks.'
    }
  ],

  analogi: `Bayangkan kamu harus **menyambungkan listrik ke enam rumah** di satu gang, dan setiap bentangan kabel punya harga berbeda — ada yang pendek dan murah, ada yang harus menyeberang selokan dan mahal.

Syaratnya cuma satu: setiap rumah harus dapat listrik. Tidak perlu jalur cadangan, tidak perlu jalan memutar.

**Cara Kruskal**: buat daftar seluruh bentangan yang mungkin, urutkan dari termurah. Pasang satu per satu dari atas.

Di tengah jalan, kamu sampai di bentangan murah antara rumah A dan rumah B. Tapi A dan B **sudah** berlistrik, dan sudah tersambung lewat rumah C. Memasang bentangan itu cuma membuat lingkaran kabel yang tidak menambah satu rumah pun.

Jadi kamu lewati — meski murah.

Itu inti Kruskal: yang menentukan bukan harga sebuah bentangan, melainkan apakah ia **menambah jangkauan**.

**Cara Prim**: mulai dari tiang listrik. Lihat seluruh bentangan yang keluar dari rumah-rumah yang sudah berlistrik ke rumah yang **belum**. Pasang yang termurah. Ulangi.

Dua tukang listrik dengan dua cara berpikir yang berbeda — dan tagihan akhirnya **sama persis**.

Dan yang paling penting: **tidak ada di antara mereka yang pernah menyesal.** Setiap bentangan yang mereka pasang tetap masuk akal sampai akhir. Tidak ada yang perlu dibongkar karena belakangan ketahuan salah pilih.

Itu yang membedakan persoalan ini dari menjadwalkan ujian, di mana keputusan yang wajar di awal bisa membuatmu terpojok belakangan.

**Sekarang kode Huffman.**

Bayangkan kamu dan temanmu membuat **kode ketukan** untuk mengirim pesan lewat tembok.

Cara paling sederhana: setiap huruf lima ketukan panjang-pendek. Adil, tapi boros — huruf A yang muncul terus-terusan sama mahalnya dengan huruf Q yang hampir tidak pernah dipakai.

Cara yang lebih pintar: huruf yang sering diberi ketukan **pendek**, yang jarang diberi ketukan **panjang**. Pesanmu jadi jauh lebih cepat.

Tapi muncul masalah baru: kalau panjangnya berbeda-beda, bagaimana temanmu tahu satu huruf sudah selesai?

Kamu bisa menambah jeda di antara huruf. Tapi jeda juga butuh waktu.

Jalan keluarnya: atur supaya **tidak ada kode yang menjadi awal kode lain**. Kalau "pendek-panjang" berarti A, maka tidak boleh ada huruf lain yang diawali "pendek-panjang".

Dengan aturan itu, temanmu tidak perlu jeda. Begitu ketukan yang ia dengar cocok dengan satu huruf, **pasti** itu hurufnya — tidak mungkin ternyata awal huruf yang lebih panjang.

Dan cara paling mudah menjamin aturan itu: gambar pohon keputusan pendek-panjang, lalu taruh setiap huruf **di ujung ranting**, jangan di percabangannya. Huruf di ujung ranting tidak mungkin berada di jalan menuju huruf lain.`,

  latihan: [
    'Buat tiga graf dengan lima simpul dan empat sisi, lalu tentukan mana yang pohon dan jelaskan kenapa yang lain bukan.',
    'Hitung dengan tangan seluruh pohon berlabel untuk empat simpul, lalu bandingkan hasilnya dengan rumus Cayley.',
    'Hitung berapa pilihan sisi yang harus diperiksa untuk mencacah seluruh pohon dengan delapan simpul, lalu jelaskan akibatnya.',
    'Buktikan bahwa pohon biner dengan tinggi h paling banyak punya 2 pangkat (h+1) dikurangi satu simpul.',
    'Susun data sambungan nyata untuk tujuh titik, lalu jalankan Kruskal dan catat setiap sisi yang ditolak beserta alasannya.',
    'Jalankan Prim dari tiga titik awal berbeda pada data yang sama, lalu bandingkan total bobot dan himpunan sisinya.',
    'Cari satu graf dengan bobot seri yang punya lebih dari satu pohon rentang minimum, lalu tunjukkan dua pohon itu.',
    'Jelaskan dengan argumen tukar kenapa sisi termurah yang menyambung dua kelompok pasti bisa masuk pohon rentang minimum.',
    'Susun kode Huffman untuk satu paragraf teks, lalu bandingkan jumlah bitnya dengan kode panjang tetap dan dengan entropinya.',
    'Sandikan teks itu dengan kode Huffman-mu lalu bongkar kembali, dan tunjukkan apa yang terjadi bila satu karakter ditaruh di simpul dalam.'
  ]
});
