/* ============================================================
   matematika-diskrit.js — materi Matematika Diskrit (Semester 2)

   Disusun dari projek kuliah sendiri:
     "Analisis Keamanan Kata Sandi pada Sosial Media Instagram
      Berdasarkan Kombinasi Karakter dan Panjang Sandi"
     (projek kelompok, lima orang)

   Landasan teori projek itu memuat Permutasi, Rumus Permutasi,
   dan Brute Force — dan ketiganya jadi tulang punggung materi ini.

   CATATAN CAKUPAN: hanya dua berkas yang ada di drive untuk mata
   kuliah ini, keduanya tentang projek yang sama. Topik lain yang
   biasa ada di Matematika Diskrit — graf, pohon, relasi rekursif,
   teori bilangan — TIDAK ada bahannya dan tidak dimasukkan.
   Sebagian sudah tercakup di tempat lain: himpunan di Logika
   Informatika, relasi di Matematika Dasar, graf di Struktur Data.

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
