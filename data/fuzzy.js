/* ============================================================
   fuzzy.js — materi Logika Fuzzy (Semester 4)

   Disusun dari slide kuliah sendiri:
     - Pertemuan 1_Pengantar Sistem Fuzzy.pptx
     - Pertemuan 2_FUNGSI KEANGGOTAAN FUZZY.pptx
     - Pertemuan 2_OPERATOR-OPERATOR FUZZY.ppt
     - Pertemuan 3_Fuzzy Inference Systems (Sugeno / Tsukamoto)
     - Pertemuan 4_Fuzzy Inference Systems (Mamdani).ppt
   dan projek sendiri: kendali lampu lalu lintas Mamdani
   (Fuzzy/Projek/5_6107350534639853114.py) yang memakai skfuzzy.

   CATATAN: projek aslinya bergantung pada numpy + skfuzzy +
   matplotlib. Di sini seluruh perhitungan DITULIS ULANG DARI NOL
   dengan Python polos supaya bisa dijalankan siapa pun tanpa
   memasang apa-apa -- dan supaya tiap langkahnya kelihatan,
   bukan tersembunyi di dalam pustaka.

   Tiga topik tambahan (relasi fuzzy & komposisi, Fuzzy C-Means,
   variabel linguistik & bilangan fuzzy) disusun dari REFERENSI
   LUAR -- keterangan lengkapnya ada di kepala bagian tambahan.
   ============================================================ */

TOPICS.push({
  id: 'fuzzy-himpunan',
  judul: 'Himpunan Fuzzy & Operatornya',
  kategori: 'fuzzy',
  tag: ['fuzzy', 'derajat keanggotaan', 'fungsi keanggotaan', 'segitiga', 'trapesium', 'operator'],
  ringkas: 'Ketika "panas" bukan ya atau tidak, melainkan 0,7 — dan apa akibatnya bagi logika.',

  fungsi: `**Menangani konsep yang tidak punya batas tegas — "panas", "cepat", "padat".**

Terpakai di:

- **Sistem kendali** — mesin cuci, AC, kamera
- **Sistem pendukung keputusan** yang kriterianya kabur
- **Tugas akhir** — logika fuzzy adalah tema yang sangat sering diambil
- **Menghindari perubahan mendadak** di batas — keluarannya bergeser mulus

Yang paling sering salah dipahami: **derajat keanggotaan bukan peluang.**

Peluang berbicara tentang **ketidaktahuan** — kita belum tahu hasilnya. Derajat keanggotaan berbicara tentang **ketidaktegasan** — suhunya sudah diketahui pasti, kata sifatnya yang tidak tegas.

Dan kesalahan teknis yang paling sering: **memakai segitiga untuk himpunan di ujung variabel**, sehingga nilai ekstrem tidak menyalakan aturan apa pun.`,

  praktik: {
    tujuan: `Kamu bisa merancang fungsi keanggotaan yang menutupi seluruh semesta tanpa celah, dan menghitung operator fuzzy dengan benar.`,
    alat: [
      'Python 3',
      'matplotlib untuk menggambar kurvanya'
    ],
    langkah: [
      { judul: 'Gambar kurvanya sebelum menulis kode',
        isi: `Untuk tiap variabel, gambar semua himpunannya di satu sumbu.

Periksa dua hal: apakah ada **celah** di mana semua himpunan bernilai nol, dan apakah tumpang tindihnya wajar.

Menggambar lebih dulu menangkap sebagian besar kesalahan rancangan.` },
      { judul: 'Pakai bahu di kedua ujung',
        isi: `Himpunan paling kiri dan paling kanan **harus** berbentuk bahu, bukan segitiga.

Kalau memakai segitiga, nilai yang lebih ekstrem dari puncaknya kembali ke nol — dan sistemmu tidak punya aturan yang menyala.

Uji dengan nilai minimum dan maksimum semestamu. Keduanya harus memberi derajat satu di himpunan ujungnya.` },
      { judul: 'Jaga fungsi segitigamu dari kasus berbahu',
        isi: `Himpunan seperti \`[0, 0, 25]\` sebenarnya bahu, bukan segitiga penuh.

Rumus segitiga biasa akan membagi nol dengan nol di situ. Tambahkan penjagaan agar sisi yang lebarnya nol mengembalikan satu.

Ini bug yang sangat mudah terlewat karena hanya muncul tepat di ujung.` },
      { judul: 'Periksa tidak ada celah',
        isi: `Telusuri seluruh semesta dengan langkah kecil, dan untuk tiap titik hitung jumlah derajat seluruh himpunan.

Kalau ada titik yang jumlahnya **nol**, di situ ada celah — dan masukan di titik itu tidak akan menyalakan aturan apa pun.

Jumlahnya tidak harus satu, tetapi tidak boleh nol.` },
      { judul: 'Hitung operator dan periksa batasnya',
        isi: `- AND menjadi \`min\`, OR menjadi \`max\`, NOT menjadi \`1 dikurangi nilai\`

Periksa: untuk nilai 0 dan 1, hasilnya **harus sama persis** dengan logika klasik.

Kalau tidak, implementasimu salah. Fuzzy memperluas logika biasa, bukan menggantikannya.` },
      { judul: 'Buktikan dua hukum klasik patah',
        isi: `Hitung \`max(0.5, 1 - 0.5)\` dan \`min(0.5, 1 - 0.5)\`.

Keduanya menghasilkan 0,5 — bukan 1 dan 0 seperti yang dituntut logika klasik.

Ini bukan kesalahan; itulah maksudnya. Sesuatu boleh setengah panas dan setengah tidak panas sekaligus.` },
      { judul: 'Periksa De Morgan tetap berlaku',
        isi: `Uji dengan beberapa pasang nilai bahwa \`1 - min(a,b)\` sama dengan \`max(1-a, 1-b)\`.

Semuanya harus cocok. Melihat hukum yang sama berlaku di Logika Informatika dan di sini membuat keduanya jauh lebih melekat.` }
    ],
    cek: [
      'Nilai minimum dan maksimum semestamu memberi derajat satu di himpunan ujung',
      'Tidak ada titik di semestamu yang seluruh derajatnya nol',
      'Operator fuzzy-mu memberi hasil identik dengan logika klasik untuk nilai 0 dan 1'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa derajat, bukan ya/tidak',

  konsep: `
**Logika fuzzy** diperkenalkan **Lotfi A. Zadeh** pada 1960-an. Gagasannya berangkat dari satu keberatan sederhana terhadap logika klasik.

Pada **himpunan klasik**, keanggotaan cuma dua nilai: **anggota (1)** atau **bukan anggota (0)**.

Tetapi coba definisikan himpunan "orang tua" dengan batas 60 tahun. Maka orang berusia **59 tahun 364 hari bukan orang tua**, dan **sehari kemudian ia menjadi orang tua**.

Batas itu **tidak ada di dunia nyata**. Ia dipaksakan oleh notasinya, bukan oleh kenyataannya.

**Derajat keanggotaan**

Himpunan fuzzy mengizinkan keanggotaan **di antara 0 dan 1**. Orang 59 tahun bisa menjadi anggota "orang tua" dengan derajat **0,9**, dan sekaligus anggota "paruh baya" dengan derajat **0,3**.

Perhatikan bahwa ia **anggota dua himpunan sekaligus** — hal yang mustahil pada himpunan klasik yang saling lepas.

Lambangnya \`μ(x)\`, dibaca *"mu dari x"*: derajat keanggotaan x pada suatu himpunan.

**Ini bukan peluang.** Kekeliruan yang paling sering terjadi.

- **Peluang 0,7** berarti *"70 persen kemungkinan hari ini panas"* — hasilnya **akan** panas atau tidak, kita cuma belum tahu.
- **Derajat keanggotaan 0,7** berarti *"hari ini panasnya sedang-tinggi"* — tidak ada ketidaktahuan sama sekali, suhunya sudah diketahui pasti.

Peluang berbicara tentang **ketidaktahuan**. Fuzzy berbicara tentang **ketidaktegasan**.

**Kenapa dipakai**

Alasan yang disebut di slide:

- Konsepnya **mudah dimengerti**
- **Fleksibel**
- **Toleran terhadap data yang tidak tepat**
- Bisa **menampung pengalaman pakar secara langsung**, tanpa proses pelatihan
- Didasarkan pada **bahasa alami**

Butir keempat itu keunggulan besarnya dibanding jaringan syaraf tiruan. Kalau ada montir berpengalaman yang bisa bilang *"kalau mesinnya agak panas dan putarannya agak tinggi, kurangi sedikit bahan bakarnya"*, kalimat itu **langsung bisa jadi aturan** — tanpa satu pun data latih.

**Fungsi keanggotaan**

Kurva yang memetakan nilai masukan ke derajat keanggotaannya. Bentuk yang dibahas di slide:

- **Linier naik** dan **linier turun** — paling sederhana
- **Segitiga** — gabungan dua garis linier, satu puncak
- **Trapesium** — seperti segitiga, tetapi ada **daerah datar** yang derajatnya penuh 1
- **Bahu** (*shoulder*) — untuk **ujung** variabel: setelah mencapai "panas", suhu yang lebih tinggi **tetap panas**
- **Kurva-S**, **lonceng**, **Gauss** — untuk peralihan yang lebih halus

**Bahu penting dan sering dilupakan.** Kalau seluruh himpunan dibuat segitiga, maka nilai di ujung — misalnya suhu 100 derajat pada variabel yang berakhir di "panas" — akan punya derajat keanggotaan **nol di semua himpunan**. Sistemnya jadi **tidak punya aturan yang menyala**, dan macet.

**Operator fuzzy**

Padanan AND, OR, dan NOT:

- **AND** → \`min(μA, μB)\` — disebut *α-predikat*
- **OR** → \`max(μA, μB)\`
- **NOT** → \`1 − μA\`

Pilihan **min untuk AND** masuk akal kalau dipikirkan: sebuah gabungan syarat **hanya sekuat syarat terlemahnya**. Kalau *"panas"* bernilai 0,9 tetapi *"lembap"* cuma 0,2, maka *"panas DAN lembap"* jelas tidak boleh lebih dari 0,2.

**Hukum yang berlaku dan yang patah**

Komutatif, asosiatif, distributif, dan De Morgan **tetap berlaku**.

Tetapi dua hukum klasik **patah**:

- **Hukum tengah yang dikecualikan** — \`A ∪ ¬A = semesta\` **tidak berlaku**. Kalau \`μ = 0,5\`, maka \`max(0,5, 0,5) = 0,5\`, bukan 1.
- **Hukum kontradiksi** — \`A ∩ ¬A = ∅\` **tidak berlaku**. \`min(0,5, 0,5) = 0,5\`, bukan 0.

Dan itu **bukan cacat**. Justru itulah maksudnya: sesuatu **boleh** setengah panas dan setengah tidak panas sekaligus. Logika klasik melarangnya; kenyataan tidak.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA "AND" DIPETAKAN JADI MIN\n#\n# Aturan: JIKA panas DAN lembap MAKA kipas cepat\n#\n#   mu(panas)  = 0.9   -> hampir sepenuhnya panas\n#   mu(lembap) = 0.2   -> nyaris tidak lembap\n#\n#   min(0.9, 0.2) = 0.2\n#   max(0.9, 0.2) = 0.9   <- kalau pakai ini, SALAH\n#\n# Gabungan syarat hanya SEKUAT SYARAT TERLEMAHNYA.\n# Kalau nyaris tidak lembap, maka "panas DAN lembap"\n# juga harus nyaris tidak terpenuhi -- berapa pun\n# panasnya.\n#\n# Hasil min ini disebut ALFA-PREDIKAT: seberapa kuat\n# sebuah aturan "menyala" untuk masukan tertentu.',
      penjelasan: `
Pemilihan **min** untuk AND terlihat sewenang-wenang sampai kamu mengujinya dengan pertanyaan: **apa yang terjadi kalau dipilih yang lain?**

Coba **rata-rata**. Maka \`panas 0,9\` dan \`lembap 0,2\` menghasilkan **0,55** — dan aturan itu menyala **lebih dari setengah kekuatan**, padahal salah satu syaratnya nyaris tidak terpenuhi sama sekali.

Itu bertentangan dengan arti kata "dan". Kalau kamu bilang *"saya akan pergi kalau cerah dan libur"*, lalu ternyata hari itu **hampir tidak libur**, kamu tidak pergi **setengah-setengah**.

Coba **perkalian**. \`0,9 × 0,2 = 0,18\` — ini sebenarnya **masuk akal juga**, dan memang dipakai; namanya *dot-product* atau *algebraic product*, dan slide kuliahmu menyebutnya sebagai pilihan selain min.

Bedanya: perkalian **menghukum lebih keras** ketika banyak syarat digabung. Tiga syarat bernilai 0,9 memberi \`min = 0,9\` tetapi \`perkalian = 0,729\`. Dengan sepuluh syarat, perkalian menyusut hampir ke nol meski semua syaratnya kuat.

**Min tidak punya sifat itu.** Menambah syarat yang kuat tidak mengubah apa-apa; hanya syarat terlemah yang menentukan.

Itulah kenapa **min menjadi pilihan baku**: ia membuat kekuatan aturan bergantung **hanya pada penghalang terbesarnya**, dan itu paling dekat dengan cara manusia menimbang.

Sekarang perhatikan akibat yang lebih jauh, dan ini yang membuat fuzzy bekerja sama sekali.

Karena \`min\` dan \`max\` **tidak menghilangkan informasi menjadi 0 atau 1**, maka **beberapa aturan bisa menyala bersamaan dengan kekuatan berbeda**.

Pada sistem berbasis aturan klasik, tepat **satu** aturan cocok, dan keluarannya melompat tiba-tiba saat masukan melewati batas. Pada fuzzy, saat masukan bergeser sedikit, satu aturan **meredup** sementara yang lain **menguat** — dan keluarannya **bergeser mulus**.

Kemulusan itulah yang membuat kendali fuzzy dipakai di mesin cuci, transmisi mobil, dan pengereman kereta: **tidak ada sentakan di batas**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Himpunan fuzzy: derajat keanggotaan & operator
# ============================================

# --------------------------------------------
# 1. Fungsi keanggotaan yang dibahas di slide
# --------------------------------------------
def linier_naik(x, a, b):
    """0 di bawah a, naik lurus, 1 di atas b."""
    if x <= a: return 0.0
    if x >= b: return 1.0
    return (x - a) / (b - a)


def linier_turun(x, a, b):
    """1 di bawah a, turun lurus, 0 di atas b."""
    if x <= a: return 1.0
    if x >= b: return 0.0
    return (b - x) / (b - a)


def segitiga(x, a, b, c):
    """Segitiga dengan puncak di b.

    Perhatikan penjagaan b > a dan c > b: kalau a == b (puncak
    menempel di ujung kiri) atau b == c (menempel di ujung kanan),
    segitiganya menjadi BAHU. Tanpa penjagaan ini, nilai di ujung
    salah dihitung jadi 0 dan tidak ada aturan yang menyala.
    """
    if x < a or x > c: return 0.0
    if x == b: return 1.0
    if x < b:  return (x - a) / (b - a) if b > a else 1.0
    return (c - x) / (c - b) if c > b else 1.0


def trapesium(x, a, b, c, d):
    """Datar penuh antara b dan c."""
    if x <= a or x >= d: return 0.0
    if b <= x <= c: return 1.0
    if x < b: return (x - a) / (b - a)
    return (d - x) / (d - c)


def bahu_kiri(x, b, c):
    """1 sampai b lalu turun -- untuk UJUNG KIRI variabel."""
    return trapesium(x, float("-inf"), b, b, c) if x >= b else 1.0


def bahu_kanan(x, a, b):
    """Naik dari a lalu 1 selamanya -- untuk UJUNG KANAN variabel."""
    return 1.0 if x >= b else linier_naik(x, a, b)


# --------------------------------------------
# 2. Variabel SUHU dengan bahu di kedua ujung
# --------------------------------------------
def suhu_dingin(t):  return bahu_kiri(t, 15, 22)
def suhu_sejuk(t):   return segitiga(t, 18, 24, 28)
def suhu_hangat(t):  return segitiga(t, 25, 30, 34)
def suhu_panas(t):   return bahu_kanan(t, 31, 36)

HIMPUNAN = [("dingin", suhu_dingin), ("sejuk", suhu_sejuk),
            ("hangat", suhu_hangat), ("panas", suhu_panas)]

print("--- variabel SUHU: derajat keanggotaan ---")
print("  " + "suhu".rjust(5) + "".join(n.rjust(9) for n, _ in HIMPUNAN) +
      "   jumlah")
for t in [10, 15, 20, 24, 27, 30, 33, 36, 45]:
    nilai = [f(t) for _, f in HIMPUNAN]
    print("  " + (str(t) + "C").rjust(5) +
          "".join(("%.2f" % v).rjust(9) for v in nilai) +
          ("%9.2f" % sum(nilai)))

print("")
print("  Perhatikan suhu 24C: ia anggota 'sejuk' 1.00 DAN")
print("  'dingin' 0.00 -- tapi di 20C ia anggota 'dingin' 0.29")
print("  DAN 'sejuk' 0.33 SEKALIGUS. Pada himpunan klasik yang")
print("  saling lepas, ini mustahil.")
print("")
print("  Jumlahnya juga TIDAK harus 1. Ini bukan peluang.")


# --------------------------------------------
# 3. Kenapa BAHU diperlukan
# --------------------------------------------
print("")
print("--- kenapa ujung variabel harus pakai BAHU ---")

def panas_segitiga(t):  return segitiga(t, 31, 36, 41)   # SALAH untuk ujung

print("  suhu    pakai segitiga   pakai bahu   akibat")
for t in [36, 40, 45, 60]:
    a = panas_segitiga(t)
    b = suhu_panas(t)
    akibat = "TIDAK ADA aturan menyala!" if a == 0 else ""
    print("  " + (str(t) + "C").rjust(5) + ("%.2f" % a).rjust(14) +
          ("%.2f" % b).rjust(13) + "   " + akibat)

print("")
print("  Kalau ujung variabel dibuat segitiga, suhu 45C punya")
print("  derajat NOL di semua himpunan. Sistemnya tidak punya")
print("  satu pun aturan yang menyala, dan macet.")
print("")
print("  Bahu memastikan: setelah mencapai PANAS, suhu yang")
print("  lebih tinggi TETAP panas.")


# --------------------------------------------
# 4. Operator fuzzy: AND, OR, NOT
# --------------------------------------------
def f_and(*m): return min(m)
def f_or(*m):  return max(m)
def f_not(m):  return 1.0 - m

print("")
print("--- operator fuzzy ---")
PASANG = [(1.0, 1.0), (1.0, 0.0), (0.0, 0.0),
          (0.9, 0.2), (0.6, 0.5), (0.5, 0.5)]

print("  " + "mu A".rjust(6) + "mu B".rjust(7) +
      "AND=min".rjust(10) + "OR=max".rjust(9) +
      "NOT A".rjust(8) + "   catatan")
for a, b in PASANG:
    ket = ""
    if a in (0.0, 1.0) and b in (0.0, 1.0):
        ket = "sama persis dengan logika klasik"
    print("  " + ("%.1f" % a).rjust(6) + ("%.1f" % b).rjust(7) +
          ("%.2f" % f_and(a, b)).rjust(10) +
          ("%.2f" % f_or(a, b)).rjust(9) +
          ("%.2f" % f_not(a)).rjust(8) + "   " + ket)

print("")
print("  Untuk nilai 0 dan 1, hasilnya SAMA PERSIS dengan")
print("  logika klasik. Fuzzy bukan mengganti logika biasa,")
print("  melainkan MEMPERLUASNYA ke nilai di antaranya.")


# --------------------------------------------
# 5. Kenapa min, bukan rata-rata atau perkalian
# --------------------------------------------
print("")
print("--- membandingkan pilihan operator AND ---")
def f_kali(*m):
    h = 1.0
    for x in m: h *= x
    return h

def f_rata(*m): return sum(m) / len(m)

KASUS = [
    ("panas 0.9, lembap 0.2",        (0.9, 0.2)),
    ("tiga syarat kuat semua",       (0.9, 0.9, 0.9)),
    ("sepuluh syarat kuat semua",    tuple([0.9] * 10)),
]
print("  " + "kasus".ljust(28) + "min".rjust(8) +
      "perkalian".rjust(11) + "rata-rata".rjust(11))
for nama, m in KASUS:
    print("  " + nama.ljust(28) + ("%.4f" % f_and(*m)).rjust(8) +
          ("%.4f" % f_kali(*m)).rjust(11) +
          ("%.4f" % f_rata(*m)).rjust(11))

print("")
print("  RATA-RATA salah: 'panas DAN lembap' jadi 0.55 padahal")
print("  lembapnya nyaris nol. Kata 'dan' kehilangan artinya.")
print("")
print("  PERKALIAN masuk akal dan memang dipakai (dot-product),")
print("  tapi menyusut terus tiap syarat ditambah -- sepuluh")
print("  syarat KUAT SEMUA malah cuma 0.3487.")
print("")
print("  MIN membuat kekuatan aturan bergantung HANYA pada")
print("  penghalang terbesarnya. Itu paling dekat dengan cara")
print("  manusia menimbang, jadi ia jadi pilihan baku.")


# --------------------------------------------
# 6. Dua hukum klasik yang PATAH
# --------------------------------------------
print("")
print("--- hukum klasik yang tidak berlaku lagi ---")
print("  " + "mu A".rjust(6) + "A OR NOT A".rjust(13) +
      "A AND NOT A".rjust(14) + "   klasik menuntut")
for a in [0.0, 0.2, 0.5, 0.8, 1.0]:
    print("  " + ("%.1f" % a).rjust(6) +
          ("%.2f" % f_or(a, f_not(a))).rjust(13) +
          ("%.2f" % f_and(a, f_not(a))).rjust(14) +
          "   1.00 dan 0.00")

print("")
print("  Pada mu = 0.5, keduanya menghasilkan 0.5.")
print("  Hukum tengah yang dikecualikan dan hukum kontradiksi")
print("  PATAH -- dan itu memang MAKSUDNYA: sesuatu boleh")
print("  setengah panas dan setengah tidak panas sekaligus.")
print("")
print("  Yang TETAP berlaku: komutatif, asosiatif, distributif,")
print("  dan hukum De Morgan.")


# --------------------------------------------
# 7. Membuktikan De Morgan masih berlaku
# --------------------------------------------
print("")
print("--- memeriksa De Morgan pada nilai fuzzy ---")
print("  NOT(A AND B) harus sama dengan (NOT A) OR (NOT B)")
print("")
UJI = [(0.0, 0.0), (0.3, 0.7), (0.5, 0.5), (0.9, 0.2), (1.0, 0.4)]
semua_cocok = True
for a, b in UJI:
    kiri = f_not(f_and(a, b))
    kanan = f_or(f_not(a), f_not(b))
    cocok = abs(kiri - kanan) < 1e-9
    semua_cocok = semua_cocok and cocok
    print("  A=%.1f B=%.1f   kiri %.2f   kanan %.2f   %s"
          % (a, b, kiri, kanan, "cocok" if cocok else "TIDAK COCOK"))

print("")
print("  Semua cocok? " + str(semua_cocok))
print("  De Morgan selamat karena min, max, dan 1-x saling")
print("  bertukar peran dengan rapi -- tidak seperti hukum")
print("  tengah yang dikecualikan.")`
  },

  output: `--- variabel SUHU: derajat keanggotaan ---
   suhu   dingin    sejuk   hangat    panas   jumlah
    10C     1.00     0.00     0.00     0.00     1.00
    15C     1.00     0.00     0.00     0.00     1.00
    20C     0.29     0.33     0.00     0.00     0.62
    24C     0.00     1.00     0.00     0.00     1.00
    27C     0.00     0.25     0.40     0.00     0.65
    30C     0.00     0.00     1.00     0.00     1.00
    33C     0.00     0.00     0.25     0.40     0.65
    36C     0.00     0.00     0.00     1.00     1.00
    45C     0.00     0.00     0.00     1.00     1.00

  Perhatikan suhu 24C: ia anggota 'sejuk' 1.00 DAN
  'dingin' 0.00 -- tapi di 20C ia anggota 'dingin' 0.29
  DAN 'sejuk' 0.33 SEKALIGUS. Pada himpunan klasik yang
  saling lepas, ini mustahil.

  Jumlahnya juga TIDAK harus 1. Ini bukan peluang.

--- kenapa ujung variabel harus pakai BAHU ---
  suhu    pakai segitiga   pakai bahu   akibat
    36C          1.00         1.00   
    40C          0.20         1.00   
    45C          0.00         1.00   TIDAK ADA aturan menyala!
    60C          0.00         1.00   TIDAK ADA aturan menyala!

  Kalau ujung variabel dibuat segitiga, suhu 45C punya
  derajat NOL di semua himpunan. Sistemnya tidak punya
  satu pun aturan yang menyala, dan macet.

  Bahu memastikan: setelah mencapai PANAS, suhu yang
  lebih tinggi TETAP panas.

--- operator fuzzy ---
    mu A   mu B   AND=min   OR=max   NOT A   catatan
     1.0    1.0      1.00     1.00    0.00   sama persis dengan logika klasik
     1.0    0.0      0.00     1.00    0.00   sama persis dengan logika klasik
     0.0    0.0      0.00     0.00    1.00   sama persis dengan logika klasik
     0.9    0.2      0.20     0.90    0.10   
     0.6    0.5      0.50     0.60    0.40   
     0.5    0.5      0.50     0.50    0.50   

  Untuk nilai 0 dan 1, hasilnya SAMA PERSIS dengan
  logika klasik. Fuzzy bukan mengganti logika biasa,
  melainkan MEMPERLUASNYA ke nilai di antaranya.

--- membandingkan pilihan operator AND ---
  kasus                            min  perkalian  rata-rata
  panas 0.9, lembap 0.2         0.2000     0.1800     0.5500
  tiga syarat kuat semua        0.9000     0.7290     0.9000
  sepuluh syarat kuat semua     0.9000     0.3487     0.9000

  RATA-RATA salah: 'panas DAN lembap' jadi 0.55 padahal
  lembapnya nyaris nol. Kata 'dan' kehilangan artinya.

  PERKALIAN masuk akal dan memang dipakai (dot-product),
  tapi menyusut terus tiap syarat ditambah -- sepuluh
  syarat KUAT SEMUA malah cuma 0.3487.

  MIN membuat kekuatan aturan bergantung HANYA pada
  penghalang terbesarnya. Itu paling dekat dengan cara
  manusia menimbang, jadi ia jadi pilihan baku.

--- hukum klasik yang tidak berlaku lagi ---
    mu A   A OR NOT A   A AND NOT A   klasik menuntut
     0.0         1.00          0.00   1.00 dan 0.00
     0.2         0.80          0.20   1.00 dan 0.00
     0.5         0.50          0.50   1.00 dan 0.00
     0.8         0.80          0.20   1.00 dan 0.00
     1.0         1.00          0.00   1.00 dan 0.00

  Pada mu = 0.5, keduanya menghasilkan 0.5.
  Hukum tengah yang dikecualikan dan hukum kontradiksi
  PATAH -- dan itu memang MAKSUDNYA: sesuatu boleh
  setengah panas dan setengah tidak panas sekaligus.

  Yang TETAP berlaku: komutatif, asosiatif, distributif,
  dan hukum De Morgan.

--- memeriksa De Morgan pada nilai fuzzy ---
  NOT(A AND B) harus sama dengan (NOT A) OR (NOT B)

  A=0.0 B=0.0   kiri 1.00   kanan 1.00   cocok
  A=0.3 B=0.7   kiri 0.70   kanan 0.70   cocok
  A=0.5 B=0.5   kiri 0.50   kanan 0.50   cocok
  A=0.9 B=0.2   kiri 0.80   kanan 0.80   cocok
  A=1.0 B=0.4   kiri 0.60   kanan 0.60   cocok

  Semua cocok? True
  De Morgan selamat karena min, max, dan 1-x saling
  bertukar peran dengan rapi -- tidak seperti hukum
  tengah yang dikecualikan.`,

  kesalahanUmum: [
    {
      salah: 'Menyamakan derajat keanggotaan dengan peluang.',
      kenapa: 'Peluang berbicara tentang ketidaktahuan terhadap sesuatu yang sebenarnya tegas, sedangkan derajat keanggotaan berbicara tentang ketidaktegasan pada sesuatu yang sudah diketahui pasti. Suhu 27 derajat sudah diketahui persis, tidak ada yang belum diketahui, tetapi ia tetap setengah hangat dan setengah sejuk.',
      benar: 'Ingat pembedanya: peluang menjawab seberapa yakin kita, derajat keanggotaan menjawab seberapa cocok kata sifatnya.'
    },
    {
      salah: 'Mengira jumlah derajat keanggotaan semua himpunan harus sama dengan satu.',
      kenapa: 'Itu syarat pada peluang, bukan pada himpunan fuzzy. Sebuah nilai bisa punya derajat nol di semua himpunan, atau jumlahnya lebih dari satu, tergantung bagaimana kurvanya dirancang.',
      benar: 'Rancang kurva agar saling bertumpang sedikit sehingga tidak ada celah, tetapi jangan memaksa jumlahnya menjadi satu.'
    },
    {
      salah: 'Memakai kurva segitiga untuk himpunan di ujung variabel.',
      kenapa: 'Segitiga turun kembali ke nol setelah puncaknya, sehingga nilai yang lebih ekstrem dari puncak justru kehilangan keanggotaan. Suhu 45 derajat bisa berderajat nol di semua himpunan, dan sistem jadi tidak punya satu pun aturan yang menyala.',
      benar: 'Pakai kurva bahu untuk himpunan paling kiri dan paling kanan, sehingga setelah mencapai panas, suhu yang lebih tinggi tetap panas.'
    },
    {
      salah: 'Memakai rata-rata sebagai padanan operator AND.',
      kenapa: 'Rata-rata membuat gabungan syarat tetap kuat meski salah satu syaratnya nyaris tidak terpenuhi. Panas nol koma sembilan dan lembap nol koma dua menghasilkan nol koma lima lima, padahal lembapnya hampir tidak ada, sehingga kata dan kehilangan artinya.',
      benar: 'Pakai min, karena gabungan syarat hanya sekuat syarat terlemahnya. Perkalian juga sah, tetapi ia menyusut terus setiap syarat ditambah.'
    },
    {
      salah: 'Menganggap patahnya hukum tengah yang dikecualikan sebagai kesalahan.',
      kenapa: 'Pada derajat nol koma lima, A atau bukan A menghasilkan nol koma lima, bukan satu. Itu bukan cacat perhitungan melainkan justru maksud dari logika fuzzy, karena sesuatu memang boleh setengah panas dan setengah tidak panas sekaligus.',
      benar: 'Terima bahwa dua hukum itu memang tidak berlaku, dan ingat bahwa komutatif, asosiatif, distributif, serta De Morgan tetap berlaku.'
    }
  ],

  analogi: `Bayangkan kamu diminta membagi orang di sebuah ruangan menjadi **"tinggi"** dan **"tidak tinggi"**.

**Cara klasik** menuntut kamu menetapkan garis. Katakanlah **170 cm**.

Maka orang setinggi **169,9 cm tidak tinggi**, dan orang **170,1 cm tinggi**. Selisih dua milimeter, dan mereka masuk kategori yang **berlawanan**.

Lebih aneh lagi: orang 170,1 cm dan orang **195 cm** masuk kategori yang **sama persis**, seolah tidak ada bedanya sama sekali.

Siapa pun yang benar-benar melihat ruangan itu akan bilang pembagian ini **konyol** — dan mereka benar. Kekonyolannya bukan pada orangnya, melainkan pada **paksaan untuk memilih dua kotak**.

**Cara fuzzy** membuang kotaknya. Orang 169,9 cm **tinggi dengan derajat 0,49**; orang 170,1 cm **0,51**; orang 195 cm **1,0**.

Selisih dua milimeter kini menghasilkan selisih **dua per seratus** — sepadan, seperti seharusnya.

Sekarang **kenapa AND jadi min**.

Bayangkan syarat masuk sebuah tim: **tinggi DAN cepat berlari**.

Ada orang yang **sangat tinggi** (0,95) tetapi **sangat lambat** (0,1). Seberapa cocok dia?

Kalau kamu **merata-ratakan**, kamu dapat 0,53 — dan dia lolos setengahnya. Tetapi ini tim; **kelambatannya tidak hilang** hanya karena dia jangkung.

**Min** menjawab 0,1, dan itu jawaban yang jujur: **dia selemah bagian terlemahnya**.

Rantai tidak menjadi lebih kuat karena punya banyak mata rantai bagus. Ia putus di **mata rantai terlemah**, dan cuma itu yang menentukan.

Terakhir, **kenapa hukum "A atau bukan A pasti benar" patah** — dan kenapa itu justru melegakan.

Tanyakan pada orang setinggi 170 cm: *"apakah kamu tinggi, atau tidak tinggi?"*

Logika klasik memaksa jawabannya **pasti salah satu, dan pasti benar**. Tapi jawaban jujurnya adalah **"ya, agak"** — dan itu bukan jawaban yang sedang mengelak.

Logika fuzzy mengizinkan jawaban itu. Ia berhenti memaksa dunia menjadi lebih tegas daripada yang sebenarnya.`,

  latihan: [
    'Jelaskan perbedaan himpunan klasik dan himpunan fuzzy, lalu tunjukkan masalah yang muncul dari batas tegas pada contoh usia.',
    'Jelaskan perbedaan derajat keanggotaan dan peluang, dengan satu contoh yang membedakan keduanya dengan jelas.',
    'Tulis fungsi keanggotaan segitiga untuk himpunan "hangat" dengan a=25, b=30, c=34, lalu hitung derajat keanggotaan suhu 27 dan 32.',
    'Jelaskan apa itu kurva bahu dan kenapa ia diperlukan untuk himpunan di ujung variabel.',
    'Hitung hasil AND, OR, dan NOT untuk pasangan derajat 0,8 dan 0,3.',
    'Jelaskan kenapa AND dipetakan menjadi min dan bukan rata-rata, lalu jelaskan bedanya dengan perkalian.',
    'Tunjukkan dengan angka bahwa hukum tengah yang dikecualikan tidak berlaku pada logika fuzzy, dan jelaskan kenapa itu bukan kesalahan.',
    'Buktikan dengan tiga pasang nilai bahwa hukum De Morgan tetap berlaku pada operator fuzzy.'
  ]
});

TOPICS.push({
  id: 'fuzzy-mamdani',
  judul: 'Inferensi Mamdani',
  kategori: 'fuzzy',
  tag: ['Mamdani', 'FIS', 'fuzzifikasi', 'defuzzifikasi', 'centroid', 'alfa-predikat'],
  ringkas: 'Empat tahap dari angka mentah ke keputusan — dibongkar pada projek lampu lalu lintas sendiri.',

  fungsi: `**Mengubah aturan berbahasa manusia menjadi keputusan berupa angka.**

Terpakai di:

- **Sistem kendali** — durasi lampu lalu lintas, kecepatan kipas, suhu
- **Tugas akhir** — Mamdani adalah metode fuzzy yang paling sering dipakai
- **Keputusan yang harus dijelaskan** — tiap tahapnya bisa digambar dan ditunjukkan
- **Menghindari perubahan mendadak** — keluarannya bergeser mulus saat masukan berubah sedikit

Keunggulan utamanya dibanding aturan tegas: **tidak ada lompatan di batas.**

Dengan aturan tegas, satu kendaraan tambahan bisa mengubah durasi lampu lima belas detik sekaligus. Dengan Mamdani, ia bergeser sepersekian detik.

Harganya: **defuzzifikasi menuntut penelusuran seluruh semesta keluaran**, dan itu jauh lebih berat daripada metode lain.`,

  praktik: {
    tujuan: `Kamu punya sistem Mamdani yang bekerja, keluarannya mulus, dan tiap tahapnya bisa kamu tunjukkan.`,
    alat: [
      'Python 3',
      'scikit-fuzzy atau tulis sendiri',
      'matplotlib'
    ],
    langkah: [
      { judul: 'Tulis basis aturan lengkap',
        isi: `Untuk dua masukan dengan tiga himpunan masing-masing, harus ada **sembilan** aturan.

Buat tabelnya dan periksa tidak ada sel kosong. Kombinasi yang tidak tertutupi membuat pembagi pada rumus titik berat menjadi nol.

Minta pendapat orang yang paham bidangnya untuk mengisi tabel ini.` },
      { judul: 'Cetak alfa-predikat tiap aturan',
        isi: `Untuk satu masukan uji, cetak semua aturan beserta alfa-nya.

Periksa: apakah aturan yang menyala memang yang **kamu harapkan** menyala?

Ini pemeriksaan paling cepat untuk menemukan kesalahan pada fungsi keanggotaan atau basis aturan.` },
      { judul: 'Gambar bentuk hasil agregasinya',
        isi: `Setelah implikasi dan agregasi, gambar bentuk keluarannya dengan matplotlib.

Melihat bentuknya membuat defuzzifikasi berhenti terasa abstrak — kamu bisa **melihat** di mana titik beratnya seharusnya jatuh.` },
      { judul: 'Pilih langkah penelusuran yang cukup halus',
        isi: `Hitung titik berat dengan beberapa besaran langkah: 10, 5, 1, 0,5, dan 0,1.

Hasilnya akan **berbeda**. Pilih langkah di mana menghaluskannya lagi tidak lagi mengubah hasil secara berarti.

Langkah yang terlalu kasar memberi jawaban yang salah tanpa tanda apa pun.` },
      { judul: 'Buat tabel keputusan lengkap',
        isi: `Jalankan sistemmu untuk seluruh kombinasi masukan pada beberapa titik, lalu susun sebagai tabel.

Periksa: apakah ada nilai yang **nol** atau aneh? Nilai nol di tepi biasanya berarti tidak ada aturan yang menyala di sana — dan itu tanda fungsi keanggotaan ujungmu bermasalah.` },
      { judul: 'Buktikan kemulusannya',
        isi: `Naikkan satu masukan satu satuan pada satu waktu, dan catat keluarannya.

Bandingkan dengan versi aturan tegas yang melompat di batas.

Grafik kedua versi berdampingan adalah bukti paling meyakinkan untuk laporanmu.` },
      { judul: 'Bandingkan dengan penilaian pakar',
        isi: `Siapkan sepuluh kasus, minta orang yang paham bidangnya memberi jawabannya, lalu bandingkan dengan keluaran sistemmu.

Kalau jauh berbeda, yang perlu diperbaiki biasanya **fungsi keanggotaan atau bobot aturan** — bukan kodenya.

Perbandingan ini juga bahan yang kuat untuk bab pengujian.` }
    ],
    cek: [
      'Tabel keputusanmu tidak punya nilai nol di tepi semesta',
      'Menghaluskan langkah penelusuran tidak lagi mengubah hasil secara berarti',
      'Grafik keluaranmu mulus, tanpa lompatan seperti aturan tegas'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa titik berat',

  konsep: `
**Sistem inferensi fuzzy** (*Fuzzy Inference System*, FIS) adalah sistem yang menalar dengan prinsip **serupa cara manusia menalar**. Ia menerima angka tegas, menimbang aturan-aturan berbahasa manusia, lalu menghasilkan angka tegas lagi.

**Mamdani** — diperkenalkan Ebrahim Mamdani pada 1975 — adalah metode yang paling banyak dipakai, dan paling mudah dijelaskan kepada orang awam.

**Empat tahap**

- **Fuzzifikasi** — angka masukan diubah menjadi derajat keanggotaan
- **Basis pengetahuan** — kumpulan aturan \`JIKA ... MAKA ...\`
- **Mesin inferensi** — tiap aturan dihitung kekuatannya, lalu himpunan keluarannya dipotong
- **Defuzzifikasi** — semua hasil digabung dan diperas kembali menjadi **satu angka tegas**

**Fuzzifikasi**

Satu angka masukan bisa menyalakan **beberapa himpunan sekaligus**. Kepadatan 30 kendaraan bisa berderajat tertentu di "sedang" dan nol di "padat".

Inilah yang membedakan fuzzy dari aturan biasa: **tidak ada satu kotak** yang menampung masukan itu.

**Basis aturan**

Bentuknya \`JIKA (x adalah A) DAN (y adalah B) MAKA (z adalah C)\`.

Aturan ditulis **oleh manusia**, bukan dilatih dari data. Untuk dua masukan dengan tiga himpunan masing-masing, jumlah aturan lengkapnya \`3 × 3 = 9\`.

**Mesin inferensi**

Tiap aturan dihitung **α-predikat**-nya dengan \`min\` atas derajat masukannya. Nilai itu menyatakan **seberapa kuat aturan itu menyala**.

Lalu himpunan keluaran aturan itu **dipotong mendatar** setinggi α — disebut **implikasi MIN**, atau *clipping*.

Beberapa aturan bisa menunjuk himpunan keluaran yang **sama**. Hasilnya digabung dengan \`max\` — disebut **agregasi**: yang diambil adalah **potongan tertinggi**.

**Defuzzifikasi**

Hasil agregasi masih berupa **bentuk**, bukan angka. Harus diperas jadi satu bilangan.

Cara yang paling lazim adalah **titik berat** (*centroid*, *Center of Area*):

\`z* = Σ(z × μ(z)) / Σ μ(z)\`

Dibaca: **di mana bentuk itu akan seimbang kalau ditumpu satu titik**.

Slide juga menyebut **metode rata-rata** (*average*), yang lebih sederhana tetapi mengabaikan lebar himpunannya.

**Kenapa Mamdani lambat**

Karena keluarannya **berupa himpunan**, defuzzifikasi menuntut **penelusuran seluruh semesta keluaran** — biasanya ratusan sampai ribuan titik.

Itulah harga yang dibayar untuk **bisa dijelaskan**: setiap tahapnya bisa digambar, ditunjuk, dan dibela di depan orang yang tidak paham matematika.

**Projek lampu lalu lintas**

Projek kuliah sendiri memakai Mamdani untuk menentukan **durasi lampu hijau**:

- Masukan: **kepadatan jalur utama** dan **kepadatan jalur simpang**, masing-masing 0–70 kendaraan
- Himpunan masukan: **sepi, sedang, padat**
- Keluaran: **durasi hijau** 10–70 detik, dengan himpunan **cepat, normal, lama**
- **9 aturan**

Satu hal yang menarik dari basis aturannya, dan layak diperhatikan: ketika **kedua jalur sama-sama padat**, keluarannya **"normal"**, bukan "lama".

Itu masuk akal — kalau semua jalur ramai, memberi hijau terlalu lama pada satu jalur justru **menghukum jalur lainnya**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA DEFUZZIFIKASI PAKAI TITIK BERAT\n#\n# Setelah inferensi, keluarannya berupa BENTUK:\n#\n#   1.0 |\n#   0.6 |      ______\n#   0.3 |  ____|      |____\n#   0.0 +--|---|------|----|-------\n#      10  20  30    45   60   detik\n#\n# Titik berat = di mana bentuk ini SEIMBANG\n# kalau ditumpu satu titik.\n#\n#   z* = SUM(z * mu(z)) / SUM(mu(z))\n#\n# Kenapa bukan puncak tertinggi saja?\n# Karena puncak MENGABAIKAN semua aturan lain.\n# Titik berat membuat setiap aturan yang menyala\n# ikut MENARIK hasilnya, sebanding kekuatannya.',
      penjelasan: `
Defuzzifikasi adalah tahap yang paling mudah dianggap remeh, padahal di situlah **seluruh kerja inferensi diterjemahkan menjadi tindakan**.

Bayangkan alternatifnya. Cara paling sederhana adalah mengambil **titik tertinggi** dari bentuk hasil — disebut *mean of maximum*.

Masalahnya: kalau satu aturan menyala dengan kekuatan 0,7 dan tiga aturan lain menyala di 0,6 ke arah berlawanan, maka **hanya yang 0,7 yang didengar**. Tiga aturan lain **dibuang habis** meski hampir sama kuatnya.

Padahal seluruh gagasan fuzzy adalah bahwa **beberapa aturan boleh menyala bersamaan**. Membuang semuanya kecuali yang tertinggi berarti membatalkan keuntungan itu **di langkah terakhir**.

**Titik berat** menyelesaikannya: setiap bagian bentuk **menarik hasil ke arahnya**, sebanding dengan **luasnya**. Aturan yang lebih kuat menarik lebih keras, tetapi yang lemah pun **tetap ikut menggeser**.

Akibat pentingnya: **keluaran bergeser mulus**. Naikkan kepadatan satu kendaraan, dan durasinya berubah sedikit — bukan melompat.

Sekarang perhatikan kenapa \`Σ(z × μ) / Σ μ\` benar-benar berarti "titik seimbang".

Bagian atas menjumlahkan **posisi dikalikan bobot**. Bagian bawah menjumlahkan **bobotnya saja**. Membaginya memberi **posisi rata-rata yang ditimbang bobot** — persis rumus titik berat benda fisik.

Kalau seluruh bobot menumpuk di kanan, hasilnya bergeser ke kanan. Kalau tersebar merata, hasilnya di tengah.

Terakhir, satu hal yang sering luput: **bentuk keluaran Mamdani tidak simetris kalau aturannya tidak seimbang**, dan itulah gunanya. Bentuk yang miring **memberitahu ke arah mana sistemnya condong** — informasi yang hilang begitu diperas jadi satu angka, tetapi tetap terwariskan lewat posisi titik beratnya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Inferensi Mamdani -- ditulis dari nol
# Kasus: projek kendali lampu lalu lintas sendiri
#
# Aslinya memakai numpy + skfuzzy. Di sini semuanya
# Python polos supaya tiap langkah KELIHATAN.
# ============================================

def segitiga(x, a, b, c):
    """Segitiga dengan puncak di b.

    Perhatikan penjagaan b > a dan c > b: kalau a == b (puncak
    menempel di ujung kiri) atau b == c (menempel di ujung kanan),
    segitiganya menjadi BAHU. Tanpa penjagaan ini, nilai di ujung
    salah dihitung jadi 0 dan tidak ada aturan yang menyala.
    """
    if x < a or x > c: return 0.0
    if x == b: return 1.0
    if x < b:  return (x - a) / (b - a) if b > a else 1.0
    return (c - x) / (c - b) if c > b else 1.0


# --------------------------------------------
# 1. Definisi variabel (persis seperti projeknya)
# --------------------------------------------
def kepadatan(x):
    return {
        "sepi":   segitiga(x, 0, 0, 25),
        "sedang": segitiga(x, 15, 32.5, 50),
        "padat":  segitiga(x, 40, 70, 70),
    }

DURASI = {
    "cepat":  (10, 10, 30),
    "normal": (20, 35, 50),
    "lama":   (40, 70, 70),
}

# 9 aturan -- ditulis manusia, bukan dilatih dari data
ATURAN = [
    ("sepi",   "sepi",   "cepat"),
    ("sepi",   "sedang", "cepat"),
    ("sepi",   "padat",  "cepat"),
    ("sedang", "sepi",   "normal"),
    ("sedang", "sedang", "normal"),
    ("sedang", "padat",  "cepat"),
    ("padat",  "sepi",   "lama"),
    ("padat",  "sedang", "lama"),
    ("padat",  "padat",  "normal"),   # <- perhatikan yang ini
]


# --------------------------------------------
# 2. Empat tahap Mamdani
# --------------------------------------------
def mamdani(utama, simpang, rinci=False):
    # TAHAP 1: fuzzifikasi
    mu_u = kepadatan(utama)
    mu_s = kepadatan(simpang)

    if rinci:
        print("  [1] FUZZIFIKASI")
        print("      jalur utama   %2d kend -> " % utama +
              "  ".join("%s %.3f" % (k, v) for k, v in mu_u.items()))
        print("      jalur simpang %2d kend -> " % simpang +
              "  ".join("%s %.3f" % (k, v) for k, v in mu_s.items()))

    # TAHAP 2 & 3: basis aturan + mesin inferensi (implikasi MIN)
    nyala = []
    for a_u, a_s, hasil in ATURAN:
        alfa = min(mu_u[a_u], mu_s[a_s])       # alfa-predikat
        if alfa > 0:
            nyala.append((a_u, a_s, hasil, alfa))

    if rinci:
        print("")
        print("  [2,3] ATURAN YANG MENYALA (alfa = min)")
        if not nyala:
            print("      (tidak ada!)")
        for a_u, a_s, hasil, alfa in nyala:
            print("      JIKA utama %-6s DAN simpang %-6s MAKA %-6s"
                  % (a_u, a_s, hasil) + "   alfa = %.3f" % alfa)

    # AGREGASI: himpunan keluaran yang sama digabung dengan MAX
    potong = {}
    for _, _, hasil, alfa in nyala:
        potong[hasil] = max(potong.get(hasil, 0.0), alfa)

    if rinci and potong:
        print("")
        print("      agregasi (MAX untuk himpunan yang sama):")
        for h, a in potong.items():
            print("          %-6s dipotong setinggi %.3f" % (h, a))

    # TAHAP 4: defuzzifikasi titik berat
    atas = bawah = 0.0
    z = 10.0
    while z <= 70.0:
        mu = 0.0
        for h, alfa in potong.items():
            a, b, c = DURASI[h]
            mu = max(mu, min(alfa, segitiga(z, a, b, c)))   # clipping
        atas += z * mu
        bawah += mu
        z += 0.5

    hasil = atas / bawah if bawah > 0 else 0.0

    if rinci:
        print("")
        print("  [4] DEFUZZIFIKASI (titik berat)")
        print("      z* = %.2f / %.2f = %.2f detik" % (atas, bawah, hasil))

    return hasil, potong


# --------------------------------------------
# 3. Satu kasus dibongkar langkah demi langkah
# --------------------------------------------
print("--- membongkar satu perhitungan: utama 30, simpang 45 ---")
d, _ = mamdani(30, 45, rinci=True)
print("")
print("  KEPUTUSAN: lampu hijau %.2f detik" % d)


# --------------------------------------------
# 4. Bentuk hasil agregasi, digambar
# --------------------------------------------
print("")
print("--- bentuk keluaran setelah agregasi ---")
_, potong = mamdani(30, 45)
for z in range(10, 75, 5):
    mu = 0.0
    for h, alfa in potong.items():
        a, b, c = DURASI[h]
        mu = max(mu, min(alfa, segitiga(z, a, b, c)))
    batang = "#" * int(round(mu * 40))
    print("  %2d dtk  %.3f  %s" % (z, mu, batang))
print("          titik berat bentuk ini = %.2f detik" % d)


# --------------------------------------------
# 5. Tabel keputusan lengkap
# --------------------------------------------
print("")
print("--- tabel keputusan (durasi hijau, detik) ---")
KOLOM = [0, 10, 20, 30, 40, 50, 60, 70]
print("      simpang ->" + "".join(str(s).rjust(7) for s in KOLOM))
print("  utama")
for u in KOLOM:
    baris = []
    for s in KOLOM:
        dd, _ = mamdani(u, s)
        baris.append("%.1f" % dd)
    print("  " + str(u).rjust(5) + "      " +
          "".join(v.rjust(7) for v in baris))

print("")
print("  Perhatikan pojok kanan bawah (70, 70): kedua jalur")
print("  sama-sama padat, dan hasilnya TIDAK yang terlama.")
print("  Aturan ke-9 sengaja memberi 'normal' -- kalau semua")
print("  jalur ramai, memberi hijau terlalu lama pada satu")
print("  jalur justru MENGHUKUM jalur lainnya.")


# --------------------------------------------
# 6. Kemulusan: inilah keunggulan fuzzy
# --------------------------------------------
print("")
print("--- kemulusan keluaran ---")

def aturan_tegas(utama, simpang):
    """Pembanding: aturan JIKA-MAKA biasa dengan batas TEGAS."""
    def label(x):
        if x < 25: return "sepi"
        if x < 50: return "sedang"
        return "padat"
    TABEL = {("sepi", "sepi"): 20, ("sepi", "sedang"): 20,
             ("sepi", "padat"): 20, ("sedang", "sepi"): 35,
             ("sedang", "sedang"): 35, ("sedang", "padat"): 20,
             ("padat", "sepi"): 60, ("padat", "sedang"): 60,
             ("padat", "padat"): 35}
    return float(TABEL[(label(utama), label(simpang))])

print("  simpang tetap 20 kendaraan; utama dinaikkan satu per satu")
print("")
print("  " + "utama".rjust(6) + "aturan tegas".rjust(14) +
      "fuzzy Mamdani".rjust(16) + "   lompatan tegas")
sebelum = None
for u in [22, 23, 24, 25, 26, 27, 48, 49, 50, 51]:
    t = aturan_tegas(u, 20)
    f, _ = mamdani(u, 20)
    lompat = ""
    if sebelum is not None and t != sebelum:
        lompat = "<-- LOMPAT %+.0f detik" % (t - sebelum)
    print("  " + str(u).rjust(6) + ("%.1f" % t).rjust(14) +
          ("%.2f" % f).rjust(16) + "   " + lompat)
    sebelum = t

print("")
print("  Aturan tegas MELOMPAT belasan detik hanya karena satu")
print("  kendaraan tambahan. Di persimpangan sungguhan, itu")
print("  terasa sebagai perubahan mendadak yang membingungkan.")
print("")
print("  Fuzzy bergeser MULUS karena beberapa aturan menyala")
print("  bersamaan: saat satu meredup, yang lain menguat.")


# --------------------------------------------
# 7. Kenapa Mamdani lambat
# --------------------------------------------
print("")
print("--- harga yang dibayar Mamdani ---")
for langkah in [10.0, 5.0, 1.0, 0.5, 0.1]:
    atas = bawah = 0.0
    titik = 0
    z = 10.0
    while z <= 70.0:
        mu = 0.0
        for h, alfa in potong.items():
            a, b, c = DURASI[h]
            mu = max(mu, min(alfa, segitiga(z, a, b, c)))
        atas += z * mu
        bawah += mu
        titik += 1
        z += langkah
    hasil = atas / bawah if bawah > 0 else 0.0
    print("  langkah %4.1f -> %4d titik dihitung, z* = %.4f"
          % (langkah, titik, hasil))

print("")
print("  Defuzzifikasi titik berat menuntut penelusuran SELURUH")
print("  semesta keluaran. Makin halus langkahnya, makin tepat")
print("  hasilnya -- dan makin berat hitungannya.")
print("")
print("  Itulah harga untuk BISA DIJELASKAN: tiap tahap Mamdani")
print("  bisa digambar, ditunjuk, dan dibela di depan orang yang")
print("  tidak paham matematika.")`
  },

  output: `--- membongkar satu perhitungan: utama 30, simpang 45 ---
  [1] FUZZIFIKASI
      jalur utama   30 kend -> sepi 0.000  sedang 0.857  padat 0.000
      jalur simpang 45 kend -> sepi 0.000  sedang 0.286  padat 0.167

  [2,3] ATURAN YANG MENYALA (alfa = min)
      JIKA utama sedang DAN simpang sedang MAKA normal   alfa = 0.286
      JIKA utama sedang DAN simpang padat  MAKA cepat    alfa = 0.167

      agregasi (MAX untuk himpunan yang sama):
          normal dipotong setinggi 0.286
          cepat  dipotong setinggi 0.167

  [4] DEFUZZIFIKASI (titik berat)
      z* = 573.50 / 18.52 = 30.97 detik

  KEPUTUSAN: lampu hijau 30.97 detik

--- bentuk keluaran setelah agregasi ---
  10 dtk  0.167  #######
  15 dtk  0.167  #######
  20 dtk  0.167  #######
  25 dtk  0.286  ###########
  30 dtk  0.286  ###########
  35 dtk  0.286  ###########
  40 dtk  0.286  ###########
  45 dtk  0.286  ###########
  50 dtk  0.000  
  55 dtk  0.000  
  60 dtk  0.000  
  65 dtk  0.000  
  70 dtk  0.000  
          titik berat bentuk ini = 30.97 detik

--- tabel keputusan (durasi hijau, detik) ---
      simpang ->      0     10     20     30     40     50     60     70
  utama
      0         16.5   17.3   18.5   16.6   17.4   18.3   17.1   16.5
     10         17.3   17.3   18.5   17.3   17.4   18.3   17.3   17.3
     20         30.3   30.3   30.3   30.3   30.3   18.5   18.5   18.5
     30         35.0   35.0   35.0   35.0   35.0   18.3   17.1   16.6
     40         35.0   35.0   35.0   35.0   35.0   18.3   17.4   17.4
     50         57.5   57.5   57.2   57.5   57.5   35.0   35.0   35.0
     60         59.3   59.0   57.2   59.3   58.8   35.0   35.0   35.0
     70         60.2   59.0   57.2   60.0   58.8   35.0   35.0   35.0

  Perhatikan pojok kanan bawah (70, 70): kedua jalur
  sama-sama padat, dan hasilnya TIDAK yang terlama.
  Aturan ke-9 sengaja memberi 'normal' -- kalau semua
  jalur ramai, memberi hijau terlalu lama pada satu
  jalur justru MENGHUKUM jalur lainnya.

--- kemulusan keluaran ---
  simpang tetap 20 kendaraan; utama dinaikkan satu per satu

   utama  aturan tegas   fuzzy Mamdani   lompatan tegas
      22          20.0           31.97   
      23          20.0           32.90   
      24          20.0           33.91   
      25          35.0           35.00   <-- LOMPAT +15 detik
      26          35.0           35.00   
      27          35.0           35.00   
      48          35.0           50.50   
      49          35.0           53.55   
      50          60.0           57.15   <-- LOMPAT +25 detik
      51          60.0           57.15   

  Aturan tegas MELOMPAT belasan detik hanya karena satu
  kendaraan tambahan. Di persimpangan sungguhan, itu
  terasa sebagai perubahan mendadak yang membingungkan.

  Fuzzy bergeser MULUS karena beberapa aturan menyala
  bersamaan: saat satu meredup, yang lain menguat.

--- harga yang dibayar Mamdani ---
  langkah 10.0 ->    7 titik dihitung, z* = 27.6316
  langkah  5.0 ->   13 titik dihitung, z* = 29.8148
  langkah  1.0 ->   61 titik dihitung, z* = 30.8602
  langkah  0.5 ->  121 titik dihitung, z* = 30.9681
  langkah  0.1 ->  600 titik dihitung, z* = 31.0463

  Defuzzifikasi titik berat menuntut penelusuran SELURUH
  semesta keluaran. Makin halus langkahnya, makin tepat
  hasilnya -- dan makin berat hitungannya.

  Itulah harga untuk BISA DIJELASKAN: tiap tahap Mamdani
  bisa digambar, ditunjuk, dan dibela di depan orang yang
  tidak paham matematika.`,

  kesalahanUmum: [
    {
      salah: 'Membuat basis aturan yang tidak mencakup semua kombinasi masukan.',
      kenapa: 'Kalau ada kombinasi derajat masukan yang tidak tersentuh aturan mana pun, seluruh alfa-predikat bernilai nol dan pembagi pada rumus titik berat menjadi nol. Sistemnya tidak menghasilkan apa-apa, atau menghasilkan angka yang tidak berarti.',
      benar: 'Untuk dua masukan dengan tiga himpunan masing-masing, tulis lengkap sembilan aturannya. Kalau tidak lengkap, sediakan aturan cadangan yang selalu menyala.'
    },
    {
      salah: 'Memakai titik tertinggi sebagai hasil defuzzifikasi karena lebih cepat.',
      kenapa: 'Cara itu hanya mendengarkan satu aturan terkuat dan membuang semua aturan lain, padahal seluruh gagasan fuzzy adalah beberapa aturan boleh menyala bersamaan. Keluarannya juga kembali melompat-lompat, sehingga keunggulan utama fuzzy hilang.',
      benar: 'Pakai titik berat, sehingga setiap aturan yang menyala ikut menarik hasil sebanding kekuatannya dan keluarannya bergeser mulus.'
    },
    {
      salah: 'Memakai langkah penelusuran yang terlalu kasar saat menghitung titik berat.',
      kenapa: 'Titik berat dihitung dengan menjumlahkan banyak titik di sepanjang semesta keluaran. Langkah yang terlalu besar membuat bentuknya terwakili buruk, dan hasilnya bergeser dari nilai sebenarnya.',
      benar: 'Pilih langkah yang cukup halus untuk lebar semestamu, lalu periksa apakah menghaluskannya lagi masih mengubah hasil secara berarti.'
    },
    {
      salah: 'Menyamakan agregasi dengan menjumlahkan hasil tiap aturan.',
      kenapa: 'Kalau dua aturan menunjuk himpunan keluaran yang sama dan hasilnya dijumlahkan, derajat keanggotaan bisa melebihi satu, dan itu tidak punya arti. Agregasi Mamdani memakai maksimum, yaitu mengambil potongan tertinggi.',
      benar: 'Gabungkan dengan max untuk himpunan keluaran yang sama, lalu ambil max lagi antar-himpunan saat menyusun bentuk akhirnya.'
    }
  ],

  analogi: `Bayangkan **panitia yang memutuskan berapa lama lampu hijau menyala**, beranggotakan sembilan orang.

Setiap anggota punya **satu pendapat tetap**, dan pendapatnya berbentuk kalimat sederhana:

> *"Kalau jalur utama padat dan jalur simpang sepi, beri waktu lama."*

**Fuzzifikasi** adalah tahap ketika kondisi lapangan dibacakan kepada seluruh panitia. Bukan sebagai kategori, melainkan sebagai **derajat**: *"jalur utama agak sedang; jalur simpang cukup sedang."*

**Mesin inferensi** adalah tahap ketika setiap anggota **menilai seberapa yakin dirinya berbicara**.

Anggota yang syaratnya tidak terpenuhi sama sekali **diam saja**. Yang syaratnya terpenuhi separuh **berbicara dengan setengah suara**. Dan seorang anggota **hanya sekeras syarat terlemahnya** — kalau ia menuntut "padat DAN sepi" sementara jalurnya cuma agak padat, ia bicara pelan.

Sekarang bagian yang menentukan: **bagaimana panitia mengambil keputusan?**

**Cara buruk** adalah menyerahkan keputusan kepada **yang bicara paling keras**, dan menyuruh semua orang lain diam. Kalau ada satu anggota bersuara 0,7 dan tiga anggota bersuara 0,6 ke arah berlawanan — **tiga orang itu diabaikan sama sekali**, meski hampir sama yakinnya.

Panitianya jadi tidak ada gunanya. Kamu cukup mempekerjakan satu orang.

**Titik berat** adalah cara yang benar: setiap suara **menarik keputusan ke arahnya**, sekuat suaranya. Yang keras menarik lebih kuat, tetapi **yang lirih tetap menggeser**.

Bayangkan **papan panjang bertanda 10 sampai 70 detik**, dan setiap anggota meletakkan **batu seberat keyakinannya** di angka yang ia usulkan. Keputusannya adalah **titik di mana papan itu seimbang**.

Naikkan kepadatan satu kendaraan, dan beberapa batu menjadi **sedikit lebih berat** sementara yang lain **sedikit lebih ringan**. Titik seimbangnya bergeser **sedikit**.

Bandingkan dengan **aturan tegas**, yang seperti panitia beranggota satu orang dengan buku peraturan: begitu kepadatan melewati 25, ia **berhenti membaca satu baris dan mulai membaca baris lain** — dan keputusannya melompat belasan detik karena **satu kendaraan**.

Di persimpangan sungguhan, lompatan itu terasa. Kemulusan bukan kemewahan; itulah alasan fuzzy dipakai.`,

  latihan: [
    'Sebutkan empat tahap inferensi Mamdani beserta apa yang masuk dan keluar dari tiap tahap.',
    'Jelaskan apa itu alfa-predikat dan bagaimana ia dihitung dari derajat keanggotaan masukan.',
    'Jelaskan perbedaan implikasi dan agregasi, dan sebutkan operator yang dipakai masing-masing.',
    'Tulis rumus defuzzifikasi titik berat dan jelaskan arti bagian atas dan bagian bawahnya.',
    'Jelaskan kenapa memakai titik tertinggi sebagai hasil defuzzifikasi membatalkan keunggulan utama fuzzy.',
    'Hitung secara manual alfa-predikat seluruh aturan yang menyala untuk kepadatan utama 45 dan simpang 20 pada projek lampu lalu lintas.',
    'Jelaskan kenapa aturan kesembilan memberi keluaran "normal" dan bukan "lama" ketika kedua jalur sama-sama padat.',
    'Jelaskan kenapa Mamdani lebih lambat daripada metode inferensi lain, dan apa yang didapat sebagai gantinya.'
  ]
});

TOPICS.push({
  id: 'fuzzy-sugeno-tsukamoto',
  judul: 'Sugeno & Tsukamoto',
  kategori: 'fuzzy',
  tag: ['Sugeno', 'Tsukamoto', 'FIS', 'rata-rata terbobot', 'perbandingan metode'],
  ringkas: 'Dua metode yang membuang tahap defuzzifikasi mahal — dan apa yang hilang sebagai gantinya.',

  fungsi: `**Memilih metode inferensi yang sesuai kebutuhan kecepatan dan kejelasan.**

Terpakai di:

- **Sistem tertanam** — Sugeno jauh lebih ringan, cocok untuk mikrokontroler
- **Pelatihan otomatis** — parameter Sugeno bisa disetel dengan turunan, dasar dari ANFIS
- **Tugas akhir** — membandingkan beberapa metode adalah pembahasan yang bagus
- **Keluaran yang memang monoton** — Tsukamoto cocok di sana

Yang perlu diketahui, dan sering luput: **bentuk keluaran ikut mengubah arti aturannya.**

Pada himpunan monoton Tsukamoto, alfa bernilai satu memetakan ke **nilai paling ekstrem**, bukan nilai paling khas. Kata "normal" pun bisa berperilaku seperti "lama".

Karena itu memilih metode bukan sekadar soal kecepatan — hasilnya bisa berbeda peringkat.`,

  praktik: {
    tujuan: `Kamu bisa menjalankan ketiga metode pada kasus yang sama, membandingkan hasilnya, dan memilih dengan alasan.`,
    alat: [
      'Python 3',
      'Kasus yang sama dengan topik Mamdani'
    ],
    langkah: [
      { judul: 'Pakai basis aturan dan masukan yang SAMA',
        isi: `Perbandingan hanya adil kalau fuzzifikasi dan aturannya identik. Yang berbeda hanya bagian keluarannya.

Tulis kodenya sedemikian rupa sehingga bagian alfa-predikat dipakai bersama oleh ketiga metode.` },
      { judul: 'Turunkan tetapan Sugeno dari puncak Mamdani',
        isi: `Supaya adil, ambil tetapan Sugeno orde nol dari **puncak** himpunan Mamdani yang bersesuaian.

Dengan begitu perbedaan hasilnya benar-benar berasal dari metodenya, bukan dari parameter yang berbeda.` },
      { judul: 'Pastikan himpunan Tsukamoto monoton',
        isi: `Tsukamoto membalik fungsi keanggotaan, jadi himpunannya **harus** naik terus atau turun terus.

Segitiga tidak boleh: satu nilai alfa memetakan ke dua nilai z, dan tidak ada dasar memilih.

Ini persoalan yang sama dengan fungsi tanpa invers di Matematika Dasar.` },
      { judul: 'Bandingkan hasil dan peringkatnya',
        isi: `Jalankan ketiganya pada beberapa kasus, lalu bandingkan **peringkatnya**, bukan angkanya.

Angka antar metode tidak sebanding karena skalanya berbeda. Hanya urutan yang bisa dibandingkan.` },
      { judul: 'Selidiki kalau peringkatnya berbeda',
        isi: `Kalau ada metode yang memberi peringkat berbeda, cari kasus penyebabnya dan telusuri.

Sering penyebabnya adalah sifat monoton Tsukamoto: alfa tinggi memetakan ke ujung rentang, bukan ke tengahnya.

Temuan seperti ini justru bagus untuk laporan — ia menunjukkan kamu memahami metodenya, bukan sekadar menjalankannya.` },
      { judul: 'Ukur waktunya',
        isi: `Jalankan masing-masing seribu kali dan ukur waktunya.

Mamdani akan jauh lebih lambat karena menelusuri seluruh semesta keluaran, sementara yang lain cuma menghitung per aturan.

Hitung berapa kali lipat selisihnya.` },
      { judul: 'Pilih dengan alasan tertulis',
        isi: `- harus **dijelaskan** ke manusia → Mamdani
- butuh **cepat** atau bisa dilatih otomatis → Sugeno
- keluarannya **memang monoton** → Tsukamoto

Tulis alasanmu satu paragraf. Ini yang akan ditanyakan penguji.` }
    ],
    cek: [
      'Ketiga metode memakai basis aturan dan masukan yang sama persis',
      'Himpunan keluaran Tsukamoto-mu semuanya monoton',
      'Kamu bisa menjelaskan penyebab perbedaan peringkat kalau ada'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa keluarannya bukan himpunan',

  konsep: `
Mamdani mahal karena keluarannya berupa **himpunan** yang harus ditelusuri titik demi titik. **Sugeno** dan **Tsukamoto** menghindarinya dengan cara yang sama secara gagasan: membuat **tiap aturan langsung menghasilkan satu angka**, lalu merata-ratakannya dengan bobot.

Rumus penutupnya sama untuk keduanya:

\`z* = Σ(αᵢ × zᵢ) / Σ αᵢ\`

Yang berbeda adalah **dari mana \`zᵢ\` berasal**.

**Sugeno**

Bagian MAKA-nya **bukan himpunan fuzzy**, melainkan **fungsi dari masukannya**:

\`JIKA x adalah A DAN y adalah B MAKA z = p·x + q·y + r\`

- **Sugeno orde nol** — \`z = r\`, sebuah **tetapan**. Yang paling sering dipakai.
- **Sugeno orde satu** — \`z = p·x + q·y + r\`, fungsi linier.

Karena tiap aturan sudah memberi angka, **tidak ada defuzzifikasi**. Hanya penjumlahan dan pembagian.

Diperkenalkan **Takagi, Sugeno, dan Kang** (1985), sehingga sering disebut **model TSK**.

**Tsukamoto**

Bagian MAKA-nya **tetap himpunan fuzzy**, tetapi dengan syarat khusus: himpunan keluarannya harus **monoton** — naik terus atau turun terus, tidak boleh punya puncak di tengah.

Karena monoton, setiap nilai α **memetakan tepat ke satu nilai z**. Nilai itu dicari dengan **membalik fungsi keanggotaannya**.

Syarat monoton ini **membatasi**: himpunan segitiga biasa **tidak boleh dipakai**, karena satu nilai α memetakan ke **dua** nilai z dan menjadi rancu.

**Perbandingan ketiganya**

| Hal | Mamdani | Sugeno | Tsukamoto |
|---|---|---|---|
| Keluaran aturan | himpunan fuzzy | fungsi/tetapan | himpunan monoton |
| Defuzzifikasi | titik berat | rata-rata terbobot | rata-rata terbobot |
| Kecepatan | lambat | **paling cepat** | cepat |
| Mudah dijelaskan | **paling mudah** | sulit | sedang |
| Cocok untuk | kendali yang harus dibela di depan orang | sistem tertanam & pelatihan otomatis | kasus yang keluarannya memang monoton |

**Kapan memilih yang mana**

**Mamdani** kalau sistemnya harus **dijelaskan kepada manusia** — kendali proses pabrik, sistem pakar medis, apa pun yang keputusannya bisa digugat.

**Sugeno** kalau butuh **cepat** dan **bisa disetel otomatis**. Karena keluarannya berupa fungsi, parameternya bisa dilatih dengan turunan — inilah dasar **ANFIS**, gabungan fuzzy dengan jaringan syaraf.

**Tsukamoto** kalau keluarannya **memang monoton secara alami**: makin padat makin lama, tanpa titik balik.

**Yang hilang dari Sugeno**

Kejelasan. Aturan Mamdani berbunyi *"maka durasinya LAMA"* — kalimat yang bisa dibaca siapa saja. Aturan Sugeno berbunyi *"maka z = 0,3x + 0,2y + 12"* — dan **tidak ada orang awam yang bisa memeriksa apakah itu masuk akal**.

Untuk sistem tertanam yang tidak perlu dijelaskan, itu bukan masalah. Untuk sistem yang keputusannya menyangkut orang, itu masalah besar.

**Jebakan Tsukamoto yang jarang disebut**

Pada himpunan monoton, **α = 1 memetakan ke nilai paling ekstrem**, bukan ke nilai paling khas.

Bandingkan: himpunan "normal" pada Mamdani berbentuk segitiga dengan puncak di **35** — jadi aturan yang menyala penuh menghasilkan sekitar 35. Himpunan "normal" pada Tsukamoto harus monoton, katakanlah naik dari 20 ke 50 — jadi α = 1 menghasilkan **50**, yaitu ujung atasnya.

Kata "normal" pun **berperilaku seperti "lama"**.

Akibatnya nyata: pada percobaan di materi ini, Mamdani dan Sugeno orde nol memberi **urutan keputusan yang sama**, tetapi Tsukamoto dan Sugeno orde satu **menukar dua peringkat**.

Jadi memilih metode **bukan sekadar soal kecepatan**. Bentuk keluarannya **ikut mengubah arti aturannya** — dan itu harus diperiksa, bukan diandaikan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA TSUKAMOTO MENUNTUT HIMPUNAN MONOTON\n#\n# Tsukamoto membalik fungsi keanggotaan:\n#   diberi alfa, cari z yang mu(z) = alfa\n#\n# Himpunan MONOTON NAIK (boleh):\n#   mu 1.0 |        ____\n#      0.5 |    ___/\n#      0.0 |___/\n#          +----|----|----  alfa 0.5 -> TEPAT SATU z\n#\n# Himpunan SEGITIGA (tidak boleh):\n#   mu 1.0 |     /\\\n#      0.5 |    /  \\\n#      0.0 |___/    \\___\n#          +--|--|--|--|-  alfa 0.5 -> DUA z, rancu!\n#\n# Karena itu Tsukamoto hanya boleh memakai himpunan\n# yang naik terus atau turun terus.',
      penjelasan: `
Syarat monoton pada Tsukamoto terlihat seperti pembatasan yang menyusahkan, tetapi ia **langsung mengikuti dari cara kerjanya**.

Mamdani memakai fungsi keanggotaan **ke arah maju**: diberi \`z\`, hitung \`μ(z)\`. Arah ini **selalu bisa dijawab** — berapa pun bentuknya, satu nilai z punya tepat satu derajat.

Tsukamoto memakainya **ke arah mundur**: diberi \`α\`, cari \`z\` yang derajatnya persis α.

Dan arah mundur **hanya punya jawaban tunggal kalau fungsinya monoton**.

Pada segitiga, \`α = 0,5\` terjadi di **dua tempat**: sekali di lereng naik, sekali di lereng turun. Programnya harus memilih salah satu — dan **tidak ada dasar untuk memilih**. Hasilnya bergantung pada urutan pencarian, bukan pada logikanya.

Ini bukan kerewelan matematika. Ia persoalan yang sama dengan **fungsi yang tidak punya balikan**: \`x²\` tidak bisa dibalik tanpa memilih akar positif atau negatif.

Sekarang bandingkan dengan cara **Sugeno** menghindari persoalan yang sama.

Sugeno tidak membalik apa pun. Ia **membuang himpunan keluarannya sama sekali** dan menggantinya dengan **angka atau rumus**. Tidak ada yang perlu dibalik, jadi tidak ada syarat monoton.

Itulah kenapa Sugeno **paling bebas** dalam merancang keluaran — dan sekaligus **paling sulit dijelaskan**, karena yang tersisa cuma angka tanpa nama.

Perhatikan pertukarannya, yang berlaku pada ketiganya:

- **Mamdani** menyimpan keluaran sebagai **kata** (lama, normal, cepat) → mudah dibela, mahal dihitung
- **Tsukamoto** menyimpannya sebagai **kurva monoton** → masih punya bentuk, tetapi pilihannya terbatas
- **Sugeno** menyimpannya sebagai **rumus** → paling murah dan paling luwes, tetapi kehilangan nama

Makin murah hitungannya, makin sedikit yang bisa kamu **tunjukkan** kepada orang lain.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Sugeno & Tsukamoto, dibandingkan dengan Mamdani
# Kasus yang sama: durasi lampu hijau
# ============================================

def segitiga(x, a, b, c):
    """Aman untuk segitiga berbahu (a == b atau b == c)."""
    if x < a or x > c: return 0.0
    if x == b: return 1.0
    if x < b:  return (x - a) / (b - a) if b > a else 1.0
    return (c - x) / (c - b) if c > b else 1.0


def kepadatan(x):
    return {
        "sepi":   segitiga(x, 0, 0, 25),
        "sedang": segitiga(x, 15, 32.5, 50),
        "padat":  segitiga(x, 40, 70, 70),
    }


ATURAN = [
    ("sepi",   "sepi",   "cepat"),
    ("sepi",   "sedang", "cepat"),
    ("sepi",   "padat",  "cepat"),
    ("sedang", "sepi",   "normal"),
    ("sedang", "sedang", "normal"),
    ("sedang", "padat",  "cepat"),
    ("padat",  "sepi",   "lama"),
    ("padat",  "sedang", "lama"),
    ("padat",  "padat",  "normal"),
]


def alfa_semua(utama, simpang):
    """Tahap fuzzifikasi + inferensi -- SAMA untuk ketiga metode."""
    mu_u, mu_s = kepadatan(utama), kepadatan(simpang)
    return [(hasil, min(mu_u[a], mu_s[b])) for a, b, hasil in ATURAN]


# --------------------------------------------
# 1. MAMDANI: keluaran berupa himpunan
# --------------------------------------------
DURASI = {"cepat": (10, 10, 30), "normal": (20, 35, 50), "lama": (40, 70, 70)}

def mamdani(utama, simpang):
    potong = {}
    for hasil, alfa in alfa_semua(utama, simpang):
        if alfa > 0:
            potong[hasil] = max(potong.get(hasil, 0.0), alfa)
    atas = bawah = 0.0
    z = 10.0
    while z <= 70.0:
        mu = 0.0
        for h, alfa in potong.items():
            a, b, c = DURASI[h]
            mu = max(mu, min(alfa, segitiga(z, a, b, c)))
        atas += z * mu
        bawah += mu
        z += 0.5
    return atas / bawah if bawah > 0 else 0.0


# --------------------------------------------
# 2. SUGENO ORDE NOL: keluaran berupa TETAPAN
# --------------------------------------------
# Tetapannya diambil dari PUNCAK himpunan Mamdani,
# supaya perbandingannya adil.
TETAPAN = {"cepat": 15.0, "normal": 35.0, "lama": 60.0}

def sugeno0(utama, simpang):
    atas = bawah = 0.0
    for hasil, alfa in alfa_semua(utama, simpang):
        if alfa > 0:
            atas += alfa * TETAPAN[hasil]
            bawah += alfa
    return atas / bawah if bawah > 0 else 0.0


# --------------------------------------------
# 3. SUGENO ORDE SATU: keluaran berupa FUNGSI
# --------------------------------------------
# z = p*utama + q*simpang + r
FUNGSI = {
    "cepat":  (0.10, -0.05, 13.0),
    "normal": (0.20, -0.10, 30.0),
    "lama":   (0.30, -0.15, 48.0),
}

def sugeno1(utama, simpang):
    atas = bawah = 0.0
    for hasil, alfa in alfa_semua(utama, simpang):
        if alfa > 0:
            p, q, r = FUNGSI[hasil]
            atas += alfa * (p * utama + q * simpang + r)
            bawah += alfa
    return atas / bawah if bawah > 0 else 0.0


# --------------------------------------------
# 4. TSUKAMOTO: himpunan keluaran harus MONOTON
# --------------------------------------------
# 'cepat'  turun  : 30 -> 10   (makin kuat, makin singkat)
# 'normal' naik   : 20 -> 50
# 'lama'   naik   : 40 -> 70
MONOTON = {
    "cepat":  ("turun", 10.0, 30.0),
    "normal": ("naik",  20.0, 50.0),
    "lama":   ("naik",  40.0, 70.0),
}

def balik(hasil, alfa):
    """Diberi alfa, cari z yang derajat keanggotaannya persis alfa.
       Hanya punya jawaban TUNGGAL karena himpunannya monoton."""
    arah, lo, hi = MONOTON[hasil]
    if arah == "naik":
        return lo + alfa * (hi - lo)
    return hi - alfa * (hi - lo)


def tsukamoto(utama, simpang):
    atas = bawah = 0.0
    for hasil, alfa in alfa_semua(utama, simpang):
        if alfa > 0:
            atas += alfa * balik(hasil, alfa)
            bawah += alfa
    return atas / bawah if bawah > 0 else 0.0


# --------------------------------------------
# 5. Membongkar satu kasus pada Sugeno & Tsukamoto
# --------------------------------------------
U, S = 30, 45
print("--- membongkar kasus utama %d, simpang %d ---" % (U, S))
print("")
print("  Tahap fuzzifikasi & inferensi SAMA untuk ketiganya:")
nyala = [(h, a) for h, a in alfa_semua(U, S) if a > 0]
for h, a in nyala:
    print("      -> %-6s   alfa = %.4f" % (h, a))

print("")
print("  SUGENO orde 0 -- tiap aturan langsung memberi angka:")
atas = bawah = 0.0
for h, a in nyala:
    print("      alfa %.4f x tetapan %.1f = %.4f" % (a, TETAPAN[h], a * TETAPAN[h]))
    atas += a * TETAPAN[h]; bawah += a
print("      z* = %.4f / %.4f = %.2f detik" % (atas, bawah, atas / bawah))

print("")
print("  TSUKAMOTO -- tiap alfa DIBALIK jadi satu nilai z:")
atas = bawah = 0.0
for h, a in nyala:
    z = balik(h, a)
    arah, lo, hi = MONOTON[h]
    print("      alfa %.4f pada '%s' (%s %.0f->%.0f) -> z = %.2f"
          % (a, h, arah, lo, hi, z))
    atas += a * z; bawah += a
print("      z* = %.4f / %.4f = %.2f detik" % (atas, bawah, atas / bawah))

print("")
print("  MAMDANI (dari topik sebelumnya) = %.2f detik" % mamdani(U, S))


# --------------------------------------------
# 6. Membandingkan keempatnya di banyak titik
# --------------------------------------------
print("")
print("--- membandingkan keempat metode ---")
KASUS = [(0, 0), (10, 60), (20, 20), (30, 45), (45, 15),
         (50, 50), (60, 10), (70, 0), (70, 70)]

print("  " + "utama".rjust(6) + "simpang".rjust(8) +
      "Mamdani".rjust(10) + "Sugeno-0".rjust(10) +
      "Sugeno-1".rjust(10) + "Tsukamoto".rjust(11) + "   rentang")
for u, s in KASUS:
    m, s0, s1, t = mamdani(u, s), sugeno0(u, s), sugeno1(u, s), tsukamoto(u, s)
    rentang = max(m, s0, s1, t) - min(m, s0, s1, t)
    print("  " + str(u).rjust(6) + str(s).rjust(8) +
          ("%.2f" % m).rjust(10) + ("%.2f" % s0).rjust(10) +
          ("%.2f" % s1).rjust(10) + ("%.2f" % t).rjust(11) +
          ("   %.2f" % rentang))

print("")
print("  Angkanya berbeda, tapi ARAHNYA sama: makin padat jalur")
print("  utama makin lama, makin padat jalur simpang makin singkat.")


# --------------------------------------------
# 7. Apakah PERINGKAT keputusannya sama?
# --------------------------------------------
print("")
print("--- apakah urutan keputusannya sama? ---")
SKENARIO = [("pagi sepi", 8, 5), ("siang sedang", 30, 25),
            ("sore padat", 62, 18), ("macet total", 68, 65)]

hasil = {}
for nama, metode in [("Mamdani", mamdani), ("Sugeno-0", sugeno0),
                     ("Sugeno-1", sugeno1), ("Tsukamoto", tsukamoto)]:
    nilai = [(s[0], metode(s[1], s[2])) for s in SKENARIO]
    urut = sorted(nilai, key=lambda x: -x[1])
    hasil[nama] = [n for n, _ in urut]
    print("  " + nama.ljust(11) + " -> " +
          "  ".join("%d.%s" % (i + 1, n) for i, n in enumerate(hasil[nama])))

sama = len(set(tuple(v) for v in hasil.values())) == 1
print("")
print("  Peringkat KEEMPAT metode identik? " + str(sama))
print("")
print("  Mamdani dan Sugeno-0 sepakat. Sugeno-1 dan Tsukamoto")
print("  MENUKAR posisi 2 dan 3 -- dan penyebabnya layak dilihat.")
print("")
print("  Lihat kasus 'macet total' (68, 65): kedua jalur padat,")
print("  jadi aturan ke-9 menyala kuat menuju 'normal'.")
for nama, metode in [("Mamdani", mamdani), ("Sugeno-0", sugeno0),
                     ("Sugeno-1", sugeno1), ("Tsukamoto", tsukamoto)]:
    print("      %-10s %.2f detik" % (nama, metode(68, 65)))
print("")
print("  Tsukamoto memberi angka jauh lebih besar. Sebabnya:")
print("  himpunan 'normal' miliknya MONOTON NAIK 20->50, jadi")
print("  alfa yang tinggi memetakan ke UJUNG ATAS rentang (50),")
print("  bukan ke TENGAHNYA (35) seperti puncak segitiga Mamdani.")
print("")
print("  Inilah jebakan Tsukamoto yang jarang disebut: pada")
print("  himpunan monoton, alfa = 1 berarti NILAI PALING EKSTREM,")
print("  bukan nilai paling khas. Kata 'normal' jadi berperilaku")
print("  seperti 'lama'.")
print("")
print("  Pelajarannya: memilih metode BUKAN cuma soal kecepatan.")
print("  Bentuk keluaran ikut mengubah arti aturannya.")


# --------------------------------------------
# 8. Kecepatan: berapa banyak hitungan?
# --------------------------------------------
print("")
print("--- berapa banyak titik yang harus dihitung? ---")
LANGKAH = 0.5
titik_mamdani = int((70 - 10) / LANGKAH) + 1
BIAYA = [
    ("Mamdani",   titik_mamdani, "telusuri seluruh semesta keluaran"),
    ("Sugeno-0",  len(ATURAN),   "satu perkalian per aturan"),
    ("Sugeno-1",  len(ATURAN),   "satu rumus linier per aturan"),
    ("Tsukamoto", len(ATURAN),   "satu pembalikan per aturan"),
]
print("  " + "metode".ljust(12) + "hitungan".rjust(10) + "   keterangan")
for nama, n, ket in BIAYA:
    print("  " + nama.ljust(12) + str(n).rjust(10) + "   " + ket)

print("")
print("  Mamdani %dx lebih banyak hitungan daripada yang lain."
      % (titik_mamdani // len(ATURAN)))
print("  Pada sistem tertanam yang harus memutuskan puluhan kali")
print("  per detik, selisih itu menentukan.")


# --------------------------------------------
# 9. Kenapa Tsukamoto menolak himpunan segitiga
# --------------------------------------------
print("")
print("--- kenapa Tsukamoto menuntut himpunan MONOTON ---")
print("  Tsukamoto membalik fungsi: diberi alfa, cari z.")
print("")
print("  Pada himpunan MONOTON NAIK 20->50, alfa 0.5:")
print("      z = 20 + 0.5 x (50 - 20) = %.1f   (tepat satu jawaban)"
      % (20 + 0.5 * 30))
print("")
print("  Pada himpunan SEGITIGA (20, 35, 50), alfa 0.5:")
kiri = 20 + 0.5 * (35 - 20)
kanan = 50 - 0.5 * (50 - 35)
print("      z bisa %.1f  (di lereng naik)" % kiri)
print("      z bisa %.1f  (di lereng turun)" % kanan)
print("      -> DUA jawaban, dan tidak ada dasar untuk memilih.")
print("")
print("  Ini persoalan yang sama dengan fungsi tanpa balikan:")
print("  x kuadrat tidak bisa dibalik tanpa memilih akar positif")
print("  atau negatif.")


# --------------------------------------------
# 10. Ringkasan pemilihan
# --------------------------------------------
print("")
print("--- memilih metode ---")
PILIH = [
    ("Mamdani",
     "keluaran = himpunan fuzzy",
     "harus dijelaskan ke manusia: kendali pabrik, sistem pakar medis"),
    ("Sugeno",
     "keluaran = tetapan atau fungsi",
     "butuh cepat & bisa dilatih otomatis: sistem tertanam, ANFIS"),
    ("Tsukamoto",
     "keluaran = himpunan monoton",
     "keluarannya memang monoton: makin padat makin lama"),
]
for nama, bentuk, kapan in PILIH:
    print("  " + nama)
    print("      bentuk : " + bentuk)
    print("      cocok  : " + kapan)

print("")
print("  Yang HILANG dari Sugeno adalah kejelasan.")
print("  Aturan Mamdani berbunyi 'maka durasinya LAMA' -- kalimat")
print("  yang bisa dibaca siapa saja.")
print("  Aturan Sugeno berbunyi 'maka z = 0.3x + 0.2y + 12', dan")
print("  tidak ada orang awam yang bisa memeriksa apakah itu")
print("  masuk akal.")`
  },

  output: `--- membongkar kasus utama 30, simpang 45 ---

  Tahap fuzzifikasi & inferensi SAMA untuk ketiganya:
      -> normal   alfa = 0.2857
      -> cepat    alfa = 0.1667

  SUGENO orde 0 -- tiap aturan langsung memberi angka:
      alfa 0.2857 x tetapan 35.0 = 10.0000
      alfa 0.1667 x tetapan 15.0 = 2.5000
      z* = 12.5000 / 0.4524 = 27.63 detik

  TSUKAMOTO -- tiap alfa DIBALIK jadi satu nilai z:
      alfa 0.2857 pada 'normal' (naik 20->50) -> z = 28.57
      alfa 0.1667 pada 'cepat' (turun 10->30) -> z = 26.67
      z* = 12.6077 / 0.4524 = 27.87 detik

  MAMDANI (dari topik sebelumnya) = 30.97 detik

--- membandingkan keempat metode ---
   utama simpang   Mamdani  Sugeno-0  Sugeno-1  Tsukamoto   rentang
       0       0     16.50     15.00     13.00      10.00   6.50
      10      60     17.30     15.00     11.00      18.00   7.00
      20      20     30.31     25.97     23.87      26.83   6.44
      30      45     30.97     27.63     24.96      27.87   6.01
      45      15     43.03     44.21     45.51      34.62   10.89
      50      50     35.00     35.00     35.00      30.00   5.00
      60      10     58.99     60.00     64.50      58.00   6.50
      70       0     60.17     60.00     69.00      70.00   10.00
      70      70     35.00     35.00     37.00      50.00   15.00

  Angkanya berbeda, tapi ARAHNYA sama: makin padat jalur
  utama makin lama, makin padat jalur simpang makin singkat.

--- apakah urutan keputusannya sama? ---
  Mamdani     -> 1.sore padat  2.siang sedang  3.macet total  4.pagi sepi
  Sugeno-0    -> 1.sore padat  2.siang sedang  3.macet total  4.pagi sepi
  Sugeno-1    -> 1.sore padat  2.macet total  3.siang sedang  4.pagi sepi
  Tsukamoto   -> 1.sore padat  2.macet total  3.siang sedang  4.pagi sepi

  Peringkat KEEMPAT metode identik? False

  Mamdani dan Sugeno-0 sepakat. Sugeno-1 dan Tsukamoto
  MENUKAR posisi 2 dan 3 -- dan penyebabnya layak dilihat.

  Lihat kasus 'macet total' (68, 65): kedua jalur padat,
  jadi aturan ke-9 menyala kuat menuju 'normal'.
      Mamdani    35.00 detik
      Sugeno-0   35.00 detik
      Sugeno-1   37.10 detik
      Tsukamoto  45.00 detik

  Tsukamoto memberi angka jauh lebih besar. Sebabnya:
  himpunan 'normal' miliknya MONOTON NAIK 20->50, jadi
  alfa yang tinggi memetakan ke UJUNG ATAS rentang (50),
  bukan ke TENGAHNYA (35) seperti puncak segitiga Mamdani.

  Inilah jebakan Tsukamoto yang jarang disebut: pada
  himpunan monoton, alfa = 1 berarti NILAI PALING EKSTREM,
  bukan nilai paling khas. Kata 'normal' jadi berperilaku
  seperti 'lama'.

  Pelajarannya: memilih metode BUKAN cuma soal kecepatan.
  Bentuk keluaran ikut mengubah arti aturannya.

--- berapa banyak titik yang harus dihitung? ---
  metode        hitungan   keterangan
  Mamdani            121   telusuri seluruh semesta keluaran
  Sugeno-0             9   satu perkalian per aturan
  Sugeno-1             9   satu rumus linier per aturan
  Tsukamoto            9   satu pembalikan per aturan

  Mamdani 13x lebih banyak hitungan daripada yang lain.
  Pada sistem tertanam yang harus memutuskan puluhan kali
  per detik, selisih itu menentukan.

--- kenapa Tsukamoto menuntut himpunan MONOTON ---
  Tsukamoto membalik fungsi: diberi alfa, cari z.

  Pada himpunan MONOTON NAIK 20->50, alfa 0.5:
      z = 20 + 0.5 x (50 - 20) = 35.0   (tepat satu jawaban)

  Pada himpunan SEGITIGA (20, 35, 50), alfa 0.5:
      z bisa 27.5  (di lereng naik)
      z bisa 42.5  (di lereng turun)
      -> DUA jawaban, dan tidak ada dasar untuk memilih.

  Ini persoalan yang sama dengan fungsi tanpa balikan:
  x kuadrat tidak bisa dibalik tanpa memilih akar positif
  atau negatif.

--- memilih metode ---
  Mamdani
      bentuk : keluaran = himpunan fuzzy
      cocok  : harus dijelaskan ke manusia: kendali pabrik, sistem pakar medis
  Sugeno
      bentuk : keluaran = tetapan atau fungsi
      cocok  : butuh cepat & bisa dilatih otomatis: sistem tertanam, ANFIS
  Tsukamoto
      bentuk : keluaran = himpunan monoton
      cocok  : keluarannya memang monoton: makin padat makin lama

  Yang HILANG dari Sugeno adalah kejelasan.
  Aturan Mamdani berbunyi 'maka durasinya LAMA' -- kalimat
  yang bisa dibaca siapa saja.
  Aturan Sugeno berbunyi 'maka z = 0.3x + 0.2y + 12', dan
  tidak ada orang awam yang bisa memeriksa apakah itu
  masuk akal.`,

  kesalahanUmum: [
    {
      salah: 'Memakai himpunan keluaran berbentuk segitiga pada metode Tsukamoto.',
      kenapa: 'Tsukamoto bekerja dengan membalik fungsi keanggotaan, yaitu mencari nilai z yang derajatnya persis sama dengan alfa. Pada segitiga, satu nilai alfa terjadi di dua tempat, satu di lereng naik dan satu di lereng turun, sehingga jawabannya rancu dan bergantung pada urutan pencarian.',
      benar: 'Pakai himpunan yang monoton naik atau monoton turun saja, sehingga setiap alfa memetakan ke tepat satu nilai z.'
    },
    {
      salah: 'Memilih Sugeno untuk sistem yang keputusannya harus dipertanggungjawabkan.',
      kenapa: 'Aturan Sugeno berakhir pada rumus atau angka, bukan pada kata seperti lama atau cepat. Orang yang terkena dampak keputusannya tidak punya cara memeriksa apakah aturan itu masuk akal, karena yang tersisa hanya bilangan tanpa nama.',
      benar: 'Pakai Mamdani ketika sistemnya harus dijelaskan kepada manusia, dan simpan Sugeno untuk sistem tertanam yang tidak perlu dibela di depan siapa pun.'
    },
    {
      salah: 'Menulis fungsi keanggotaan segitiga tanpa menjaga kasus puncak yang menempel di ujung.',
      kenapa: 'Himpunan seperti sepi dengan titik nol, nol, dua puluh lima sebenarnya berbentuk bahu, bukan segitiga penuh. Rumus segitiga biasa akan membagi dengan nol atau mengembalikan nol di titik ujung, sehingga masukan bernilai nol atau maksimum tidak menyalakan satu pun aturan dan sistemnya diam.',
      benar: 'Tambahkan penjagaan agar sisi yang lebarnya nol langsung mengembalikan satu, dan uji sistemmu tepat di kedua ujung semesta masukan.'
    },
    {
      salah: 'Membandingkan angka keluaran antar-metode untuk menilai mana yang lebih benar.',
      kenapa: 'Ketiga metode memakai bentuk keluaran yang berbeda, sehingga skalanya tidak sebanding. Angka Sugeno yang lebih tinggi daripada Mamdani tidak berarti Sugeno lebih tepat, hanya berarti tetapannya diletakkan di tempat lain.',
      benar: 'Bandingkan arah dan urutan keputusannya, bukan angkanya. Untuk menilai ketepatan, uji terhadap keluaran yang diinginkan pakar, bukan terhadap metode lain.'
    }
  ],

  analogi: `Kembali ke **panitia sembilan orang** yang memutuskan lama lampu hijau.

**Mamdani** adalah panitia yang berbicara dengan **kata sifat**. Setiap anggota berkata *"lama"*, *"normal"*, atau *"cepat"* — dan setiap kata itu punya **rentang**, bukan satu angka.

Karena itu ketuanya harus kerja keras di akhir: menggambar seluruh usulan di papan, lalu **mencari titik seimbangnya**. Lambat, tetapi hasilnya bisa **ditunjukkan** kepada siapa pun. *"Lihat, ini kenapa keluar 31 detik."*

**Sugeno** adalah panitia yang berbicara dengan **angka langsung**. Anggota tidak bilang "lama"; ia bilang **"60 detik"** — atau bahkan **"nol koma tiga kali kepadatan utama, dikurangi nol koma lima belas kali kepadatan simpang, ditambah 48"**.

Ketuanya cuma perlu **merata-ratakan dengan bobot keyakinan**. Selesai dalam sekejap.

Tetapi coba bayangkan **warga yang protes** karena lampunya terlalu singkat, lalu meminta penjelasan.

Panitia Mamdani bisa menjawab: *"Karena jalur simpang sedang padat, dan aturan kami bilang kalau simpang padat maka utama dipercepat."* Warga itu **mungkin tidak setuju**, tetapi ia **paham**.

Panitia Sugeno cuma bisa menjawab: *"Karena 0,1 dikali 30 dikurangi 0,05 dikali 45 ditambah 13."* Warga itu **tidak bisa berdebat** — dan justru itu masalahnya. Ia juga **tidak bisa memeriksa** apakah rumusnya masuk akal.

**Tsukamoto** ada di antaranya, dengan satu syarat aneh.

Ia berkata: *"Boleh pakai kata sifat, asal artinya berubah searah terus."*

Kata **"lama"** boleh, karena makin yakin makin lama — tidak ada titik balik.

Tetapi kata **"sedang"** tidak boleh. Kenapa? Karena kalau kamu bilang *"saya setengah yakin ini sedang"*, tidak jelas kamu maksudnya **setengah menuju sedang dari bawah** atau **setengah meninggalkan sedang ke atas**.

Dua tempat berbeda, keyakinan yang sama — dan **tidak ada cara memilih**.

Itulah kenapa Tsukamoto hanya menerima kata sifat yang **satu arah**.`,

  latihan: [
    'Jelaskan perbedaan bentuk keluaran aturan pada Mamdani, Sugeno, dan Tsukamoto.',
    'Tulis rumus rata-rata terbobot yang dipakai Sugeno dan Tsukamoto, dan jelaskan kenapa keduanya memakai rumus yang sama.',
    'Jelaskan perbedaan Sugeno orde nol dan orde satu, beserta satu contoh aturan masing-masing.',
    'Jelaskan kenapa Tsukamoto menuntut himpunan keluaran yang monoton, dan tunjukkan dengan angka apa yang terjadi kalau dipakai himpunan segitiga.',
    'Hitung hasil Sugeno orde nol untuk dua aturan dengan alfa 0,3 menuju tetapan 15 dan alfa 0,6 menuju tetapan 60.',
    'Jelaskan kenapa Mamdani jauh lebih berat dihitung daripada Sugeno, dan sebutkan berapa kali lipat selisihnya pada contoh di materi ini.',
    'Jelaskan apa yang hilang ketika memilih Sugeno demi kecepatan, dan sebutkan satu jenis sistem yang karenanya tidak boleh memakai Sugeno.',
    'Untuk tiap keadaan berikut tentukan metode yang paling cocok beserta alasannya: kendali suhu tungku pabrik yang harus diaudit, pengatur kecepatan kipas pada cip mikro, dan penentu diskon yang selalu naik seiring jumlah pembelian.'
  ]
});


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari slide kuliah sendiri
   (pertemuan 1-4). Tiga topik berikutnya mengisi pokok bahasan
   yang ada di RPS Logika Fuzzy kampus lain tetapi tidak ada
   slidenya di drive: relasi fuzzy dan komposisi, fuzzy
   clustering (Fuzzy C-Means), serta variabel linguistik, hedge,
   alfa-cut, dan aritmetika bilangan fuzzy.

   Sama seperti topik di atas, semuanya ditulis dengan Python
   polos tanpa skfuzzy atau numpy. Data diagnosis laptop dan
   data pelanggan warung kopi adalah data TIRUAN.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'fuzzy-relasi',
  judul: 'Relasi Fuzzy & Komposisi Max-Min',
  kategori: 'fuzzy',
  tag: ['relasi fuzzy', 'hasil kali kartesius', 'komposisi max-min', 'max-product', 'diagnosis', 'aturan inferensi komposisional'],
  ringkas: 'Hubungan yang tidak hitam-putih — "gejala ini agak menunjuk kerusakan itu" — dan satu operasi yang menyambungkan hubungan-hubungan seperti itu, yang ternyata juga inti dari inferensi Mamdani.',

  fungsi: `**Menyimpan hubungan berderajat antara dua kumpulan benda, lalu menyambungkan beberapa hubungan seperti itu untuk menarik kesimpulan.**

Topik himpunan fuzzy membahas satu kumpulan: seberapa "panas" suatu suhu. Relasi fuzzy membahas **pasangan**: seberapa kuat gejala "layar mati" menunjuk kerusakan "daya".

Terpakai di:

- **Sistem pakar diagnosis** — gejala ke penyakit, gejala ke kerusakan, dengan derajat keyakinan dari pakar
- **Sistem rekomendasi sederhana** — pengguna ke kategori, kategori ke produk
- **Menyambung pengetahuan** — dari tabel gejala-kerusakan dan kerusakan-tindakan, turunkan tabel gejala-tindakan tanpa mengisinya dengan tangan
- **Memahami inferensi fuzzy** — pemotongan (clipping) di Mamdani ternyata adalah komposisi max-min

Yang paling penting dipahami: **komposisi max-min mengikuti jalur terkuat.** Kesimpulan ditarik lewat setiap jalur yang mungkin, dan yang diambil adalah jalur yang paling meyakinkan — di mana setiap jalur hanya sekuat mata rantai terlemahnya.`,

  praktik: {
    tujuan: 'Kamu bisa membentuk relasi fuzzy dari dua himpunan, menghitung komposisi max-min dan max-product, menyambung dua relasi, dan menunjukkan bahwa inferensi Mamdani adalah komposisi.',
    alat: ['Python 3', 'Kertas untuk menelusuri satu sel komposisi dengan tangan'],
    langkah: [
      { judul: 'Bentuk relasi dari dua himpunan',
        isi: `Untuk himpunan A di X dan B di Y, hasil kali kartesius fuzzy adalah R(x, y) = min(μA(x), μB(y)). Setiap sel menjawab: seberapa benar "x adalah A **dan** y adalah B".` },
      { judul: 'Susun relasi dari pengetahuan pakar',
        isi: `Untuk diagnosis, relasi tidak dibentuk dari dua himpunan melainkan diisi langsung: baris gejala, kolom kerusakan, isinya seberapa kuat gejala itu menunjuk kerusakan itu, 0 sampai 1.

Ajak pakar mengisi satu baris pada satu waktu, dan tanyakan alasan setiap angka di atas 0,5.` },
      { judul: 'Hitung komposisi max-min',
        isi: `Untuk vektor gejala g dan relasi R, derajat kerusakan j = max atas semua gejala i dari min(gᵢ, Rᵢⱼ).

Kerjakan satu sel dengan tangan: tulis min untuk setiap jalur, lalu ambil yang terbesar.` },
      { judul: 'Bandingkan dengan max-product',
        isi: `Ganti min dengan perkalian: max atas i dari gᵢ × Rᵢⱼ. Hasilnya tidak pernah lebih besar dari max-min, karena a × b ≤ min(a, b) untuk a dan b di antara 0 dan 1.` },
      { judul: 'Sambungkan dua relasi',
        isi: `Kalau R menghubungkan gejala ke kerusakan dan S menghubungkan kerusakan ke tindakan, R ∘ S menghubungkan gejala ke tindakan: (R ∘ S)ᵢₖ = max atas j dari min(Rᵢⱼ, Sⱼₖ).

Pakar cukup mengisi dua tabel kecil; tabel ketiga diturunkan.` },
      { judul: 'Tunjukkan bahwa Mamdani adalah komposisi',
        isi: `Tulis aturan "JIKA suhu tinggi MAKA kipas cepat" sebagai relasi R(x, y) = min(tinggi(x), cepat(y)). Ubah masukan tegas menjadi himpunan tunggal — 1 di satu titik, 0 di tempat lain — lalu komposisikan dengan R.

Hasilnya sama persis dengan memotong himpunan "cepat" setinggi derajat masukan.` }
    ],
    cek: [
      'Kamu bisa menghitung satu sel komposisi max-min dengan tangan dan menunjuk jalur mana yang menentukannya',
      'Kamu bisa menjelaskan kenapa max-product tidak pernah lebih besar dari max-min',
      'Kamu bisa menurunkan relasi gejala-tindakan dari dua relasi yang lebih kecil',
      'Kamu bisa menunjukkan dengan angka bahwa pemotongan Mamdani sama dengan komposisi max-min'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa max dari min',

  konsep: `Himpunan fuzzy memberi derajat pada **satu** benda: suhu 34 °C "panas" dengan derajat 0,5. **Relasi fuzzy** memberi derajat pada **pasangan** benda: suhu 80 °C dan putaran kipas 4000 rpm "cocok" dengan derajat 0,7.

**Relasi dari dua himpunan**

"Suhu CPU tinggi" dan "kipas berputar cepat" masing-masing himpunan fuzzy. Hasil kali kartesiusnya, dengan min:

| | 2000 rpm | 3000 rpm | 4000 rpm |
|---|---|---|---|
| 60 °C | 0,00 | 0,00 | 0,00 |
| 70 °C | 0,20 | 0,30 | 0,30 |
| 80 °C | 0,20 | 0,60 | 0,70 |
| 90 °C | 0,20 | 0,60 | 1,00 |

Setiap sel: seberapa benar "suhu x tinggi **dan** rpm y cepat". Operator DAN di himpunan fuzzy adalah min — dibahas di topik operator — jadi relasi ini adalah DAN yang dihitung untuk setiap pasangan sekaligus.

**Relasi dari pengetahuan: diagnosis**

Relasi tidak harus dibentuk dari dua himpunan. Ia bisa diisi langsung oleh pakar. Tabel tiruan untuk kerusakan laptop:

| Gejala | RAM | Pendingin | Daya | Penyimpan |
|---|---|---|---|---|
| Layar mati | 0,70 | 0,10 | 0,80 | 0,20 |
| Kipas bising | 0,00 | 0,90 | 0,10 | 0,00 |
| Panas | 0,10 | 0,90 | 0,30 | 0,10 |
| Restart | 0,60 | 0,70 | 0,60 | 0,40 |

Laptop X menunjukkan gejala dengan derajat: layar mati 0,2, kipas bising 0,8, panas 0,9, restart sendiri 0,6.

**Komposisi max-min**

Derajat setiap kerusakan = **max** atas semua gejala dari **min**(derajat gejala, relasi gejala-kerusakan).

| Kerusakan | Max-min | Max-product |
|---|---|---|
| RAM | 0,60 | 0,36 |
| Pendingin | **0,90** | **0,81** |
| Daya | 0,60 | 0,36 |
| Penyimpan | 0,40 | 0,24 |

Kenapa Pendingin 0,90? Setiap gejala adalah satu **jalur** menuju kerusakan itu:

| Jalur | min(gejala, relasi) |
|---|---|
| lewat layar mati | min(0,2; 0,1) = 0,10 |
| lewat kipas bising | min(0,8; 0,9) = 0,80 |
| lewat panas | min(0,9; 0,9) = **0,90** |
| lewat restart | min(0,6; 0,7) = 0,60 |

Min: sebuah jalur hanya sekuat mata rantai terlemahnya. Max: kesimpulan mengikuti jalur yang paling kuat. Satu bukti yang kuat sudah cukup.

**Max-product** mengganti min dengan perkalian. Hasilnya selalu lebih kecil atau sama — di sini 0,81 untuk Pendingin — dan lebih "halus": setiap perubahan kecil pada derajat gejala ikut mengubah hasil, sedangkan max-min hanya bereaksi pada jalur yang sedang menjadi penentu.

**Menyambung dua relasi**

Relasi kedua S menghubungkan kerusakan ke tindakan: RAM → ganti RAM, Pendingin → bersihkan, Daya → cek adaptor. Komposisi R ∘ S langsung menghubungkan **gejala ke tindakan**:

| Gejala | Ganti RAM | Bersihkan | Cek adaptor |
|---|---|---|---|
| Layar mati | 0,70 | 0,20 | 0,80 |
| Kipas bising | 0,10 | 0,90 | 0,10 |
| Panas | 0,10 | 0,90 | 0,30 |
| Restart | 0,60 | 0,70 | 0,60 |

Pakar hanya mengisi dua tabel kecil. Tabel ketiga diturunkan — dan kalau satu tabel diperbarui, tabel turunannya tinggal dihitung ulang.

Untuk laptop X, jalur gejala → (R ∘ S) dan jalur (gejala → R) → S memberi hasil yang sama: 0,60 · 0,90 · 0,60. Komposisi max-min **asosiatif**, jadi urutan penyambungannya tidak penting.

**Mamdani adalah komposisi**

Aturan "JIKA suhu tinggi MAKA kipas cepat" bisa ditulis sebagai relasi — tabel pertama di atas. Masukan tegas 80 °C adalah himpunan tunggal: derajat 1 di 80, 0 di tempat lain.

| | 2000 | 3000 | 4000 |
|---|---|---|---|
| komposisi max-min | 0,20 | 0,60 | 0,70 |
| potong "cepat" di α = 0,7 | 0,20 | 0,60 | 0,70 |

Sama persis. Pemotongan setinggi α-predikat — yang di topik Mamdani disebut implikasi MIN — adalah komposisi max-min antara masukan dan relasi aturannya. Zadeh menyebutnya **aturan inferensi komposisional**, dan itulah dasar teoretis seluruh inferensi Mamdani.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def komposisi(R, S, gabung=min):\n    \"\"\"(R o S)[i][k] = max_j gabung(R[i][j], S[j][k])\"\"\"\n    return [[max(gabung(R[i][j], S[j][k]) for j in range(len(S)))\n             for k in range(len(S[0]))] for i in range(len(R))]\n\nlaptop = [[0.2, 0.8, 0.9, 0.6]]          # 1 baris x 4 gejala\nkomposisi(laptop, R)                    # max-min\nkomposisi(laptop, R, lambda a, b: a * b)  # max-product\n# Pendingin: 0.90 (max-min), 0.81 (max-product)",
      penjelasan: `Tiga baris yang meniru perkalian matriks — dengan dua operasi yang diganti.

**Mirip perkalian matriks.**

Perkalian matriks biasa: (RS)ᵢₖ = **jumlah** atas j dari Rᵢⱼ **×** Sⱼₖ. Komposisi max-min: (R ∘ S)ᵢₖ = **max** atas j dari **min**(Rᵢⱼ, Sⱼₖ).

Bentuknya sama persis — baris i dari R dipasangkan dengan kolom k dari S, satu per satu untuk setiap j — tetapi penjumlahan diganti max dan perkalian diganti min. Karena itu kodenya pun berbentuk seperti perkalian matriks, dengan \`max\` dan \`gabung\` di tempat \`sum\` dan \`*\`.

**Kenapa min untuk setiap jalur.**

Jalur dari gejala i ke kerusakan k lewat j butuh dua hal benar sekaligus: gejala i ada, **dan** gejala i menunjuk kerusakan k. "Dan" di logika fuzzy adalah min. Jalur itu hanya seyakin bagiannya yang paling lemah.

**Kenapa max di antara jalur.**

Kerusakan k disimpulkan kalau **ada** jalur yang meyakinkan — lewat gejala 1, **atau** lewat gejala 2, atau lewat gejala 3. "Atau" adalah max.

Jadi max-min adalah "ada jalur di mana semua bagiannya benar", ditulis dalam logika fuzzy.

**Parameter \`gabung\`.**

Mengirim fungsi sebagai parameter membuat satu kode melayani dua jenis komposisi. Dengan \`min\`, max-min. Dengan perkalian, max-product.

Max-product berguna ketika dua keyakinan yang sama-sama sedang seharusnya memberi kesimpulan yang lebih lemah dari masing-masing — 0,8 × 0,9 = 0,72, bukan 0,8. Max-min menganggap keyakinan gabungan tidak pernah lebih lemah dari yang terlemah; max-product menganggap setiap ketidakpastian menambah ketidakpastian.

**Satu sifat yang perlu diingat.**

Max-min "tidak peka" terhadap jalur yang bukan penentu. Kalau derajat layar mati naik dari 0,2 menjadi 0,5, derajat Pendingin tetap 0,90 — jalur lewat panas masih yang terkuat. Itu bisa menjadi kelebihan (hasil stabil) atau kekurangan (bukti tambahan diabaikan), tergantung kasusnya.`
    },
    {
      bahasa: 'python',
      kode: "R0 = [[min(a, b) for b in CEPAT] for a in TINGGI]   # relasi aturan\n\nmasukan = 80\ntunggal = [[1.0 if s == masukan else 0.0 for s in SUHU]]\nlewat_komposisi = komposisi(tunggal, R0)[0]\n\nalfa = TINGGI[SUHU.index(masukan)]                   # 0.7\nlewat_potong = [min(alfa, c) for c in CEPAT]\n\n# keduanya: [0.20, 0.60, 0.70]",
      penjelasan: `Dua cara menghitung keluaran satu aturan Mamdani — dan bukti bahwa keduanya adalah hal yang sama.

**Aturan sebagai relasi.**

"JIKA suhu tinggi MAKA kipas cepat" menghubungkan dua himpunan. Relasinya R₀(x, y) = min(tinggi(x), cepat(y)) — setiap pasangan suhu-rpm mendapat derajat seberapa cocok pasangan itu dengan aturan.

**Masukan tegas sebagai himpunan tunggal.**

Suhu 80 °C bukan himpunan fuzzy, tetapi bisa ditulis sebagai himpunan: derajat 1 di 80, 0 di semua suhu lain. Himpunan seperti ini disebut **singleton**.

**Komposisi.**

Singleton ∘ R₀: untuk setiap rpm y, max atas semua suhu x dari min(singleton(x), R₀(x, y)). Karena singleton nol di semua tempat kecuali 80, satu-satunya suku yang tidak nol adalah x = 80, dan hasilnya min(1, R₀(80, y)) = R₀(80, y) = min(tinggi(80), cepat(y)) = min(0,7; cepat(y)).

**Itu persis pemotongan.**

Memotong himpunan "cepat" setinggi α = tinggi(80) = 0,7 adalah min(0,7; cepat(y)) untuk setiap y. Program menunjukkan kedua cara memberi 0,20 · 0,60 · 0,70.

**Kenapa ini penting.**

Di topik Mamdani, pemotongan diperkenalkan sebagai langkah dengan nama tersendiri. Di sini ia muncul sebagai akibat dari operasi yang lebih umum.

Komposisi juga bekerja untuk masukan yang **bukan** tegas — misalnya pembacaan sensor yang tidak pasti, "sekitar 80 °C". Singleton diganti himpunan fuzzy yang lebar, dan komposisi yang sama memberi keluarannya. Pemotongan tidak bisa melakukan itu; ia hanya bekerja untuk satu angka.

Dan komposisi bisa disambung: keluaran satu aturan menjadi masukan aturan berikutnya — rantai penalaran, persis seperti gejala → kerusakan → tindakan.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Relasi fuzzy dan komposisi max-min
# ============================================

def tulis(judul_baris, judul_kolom, M, lebar=9):
    print("  " + " " * 15 + "".join(format(k, ">" + str(lebar)) for k in judul_kolom))
    for nama, baris in zip(judul_baris, M):
        print("  " + format(nama, "<15") + "".join(format(x, ">" + str(lebar) + ".2f") for x in baris))

def komposisi(R, S, gabung=min):
    """(R o S)[i][k] = max_j gabung(R[i][j], S[j][k])"""
    return [[max(gabung(R[i][j], S[j][k]) for j in range(len(S)))
             for k in range(len(S[0]))] for i in range(len(R))]

def kali(a, b):
    return a * b

# --------------------------------------------
# 1. Relasi dari dua himpunan: hasil kali kartesius
# --------------------------------------------
print("--- 'suhu CPU tinggi' x 'kipas berputar cepat' ---")
SUHU = [60, 70, 80, 90]
TINGGI = [0.0, 0.3, 0.7, 1.0]
RPM = [2000, 3000, 4000]
CEPAT = [0.2, 0.6, 1.0]
print("  tinggi(suhu): " + ", ".join(str(s) + ":" + str(m) for s, m in zip(SUHU, TINGGI)))
print("  cepat(rpm)  : " + ", ".join(str(r) + ":" + str(m) for r, m in zip(RPM, CEPAT)))
print("\n  R(x, y) = min(tinggi(x), cepat(y))")
R0 = [[min(a, b) for b in CEPAT] for a in TINGGI]
tulis([str(s) + " C" for s in SUHU], [str(r) for r in RPM], R0)
print("  Setiap sel: seberapa benar 'suhu x tinggi DAN rpm y cepat'.")

# --------------------------------------------
# 2. Diagnosis: gejala -> kerusakan
# --------------------------------------------
GEJALA = ["Layar mati", "Kipas bising", "Panas", "Restart"]
RUSAK = ["RAM", "Pendingin", "Daya", "Penyimpan"]
# R[i][j]: seberapa kuat gejala i menunjuk kerusakan j (penilaian ahli, tiruan)
R = [
    [0.7, 0.1, 0.8, 0.2],     # layar mati
    [0.0, 0.9, 0.1, 0.0],     # kipas bising
    [0.1, 0.9, 0.3, 0.1],     # panas berlebih
    [0.6, 0.7, 0.6, 0.4],     # restart sendiri
]
print("\n--- relasi gejala -> kerusakan (penilaian ahli, tiruan) ---")
tulis(GEJALA, RUSAK, R, 11)

laptop = [[0.2, 0.8, 0.9, 0.6]]           # gejala yang teramati pada satu laptop
print("\n  laptop X: " + ", ".join(g + " " + str(v) for g, v in zip(GEJALA, laptop[0])))
mm = komposisi(laptop, R)[0]
mp = komposisi(laptop, R, kali)[0]
print("\n  kerusakan      max-min    max-product")
for k, a, b in zip(RUSAK, mm, mp):
    print("  " + format(k, "<12") + format(a, "10.2f") + format(b, "13.2f"))
print()
j = 1
jalur = [(min(laptop[0][i], R[i][j]), GEJALA[i]) for i in range(4)]
print("  mengapa Pendingin 0.90 (max-min)? min(gejala, relasi) per jalur:")
for v, g in jalur:
    print("    lewat " + format(g, "<13") + format(v, ".2f"))
print("  max dari semua jalur = " + format(max(v for v, _ in jalur), ".2f"))
print("  Satu jalur yang kuat sudah cukup: 'panas' 0.9 dan relasinya 0.9.")

# --------------------------------------------
# 3. Komposisi dua relasi: gejala -> kerusakan -> tindakan
# --------------------------------------------
TINDAKAN = ["Ganti RAM", "Bersihkan", "Cek adaptor"]
S = [
    [1.0, 0.0, 0.1],     # RAM
    [0.0, 1.0, 0.0],     # pendingin
    [0.1, 0.2, 1.0],     # daya
    [0.3, 0.0, 0.2],     # penyimpan
]
print("\n--- R o S: gejala -> tindakan, tanpa tabel gejala-tindakan ---")
RS = komposisi(R, S)
tulis(GEJALA, TINDAKAN, RS, 13)
print("  Hanya dua tabel kecil yang diisi ahli; tabel ketiga diturunkan.")
tx = komposisi(laptop, RS)[0]
lewat_dua = komposisi(komposisi(laptop, R), S)[0]
print("\n  laptop X o (R o S)   : " + "  ".join(format(v, ".2f") for v in tx))
print("  (laptop X o R) o S   : " + "  ".join(format(v, ".2f") for v in lewat_dua))
print("  Sama: komposisi max-min bersifat asosiatif.")

# --------------------------------------------
# 4. Inferensi Mamdani adalah komposisi
# --------------------------------------------
print("\n--- aturan 'JIKA suhu tinggi MAKA kipas cepat' sebagai relasi ---")
masukan = 80                                  # suhu tegas
tunggal = [[1.0 if s == masukan else 0.0 for s in SUHU]]
lewat_komposisi = komposisi(tunggal, R0)[0]
alfa = TINGGI[SUHU.index(masukan)]
lewat_potong = [min(alfa, c) for c in CEPAT]
print("  masukan tegas 80 C -> himpunan tunggal (1 di 80, 0 lainnya)")
print("  komposisi max-min    : " + "  ".join(format(v, ".2f") for v in lewat_komposisi))
print("  " + format("potong di alfa " + format(alfa, ".1f"), "<21") + ": "
      + "  ".join(format(v, ".2f") for v in lewat_potong))
print("  Hasilnya sama. Pemotongan (clipping) di Mamdani adalah")
print("  komposisi max-min antara masukan dan relasi aturannya.")` },
  output: `--- 'suhu CPU tinggi' x 'kipas berputar cepat' ---
  tinggi(suhu): 60:0.0, 70:0.3, 80:0.7, 90:1.0
  cepat(rpm)  : 2000:0.2, 3000:0.6, 4000:1.0

  R(x, y) = min(tinggi(x), cepat(y))
                      2000     3000     4000
  60 C                0.00     0.00     0.00
  70 C                0.20     0.30     0.30
  80 C                0.20     0.60     0.70
  90 C                0.20     0.60     1.00
  Setiap sel: seberapa benar 'suhu x tinggi DAN rpm y cepat'.

--- relasi gejala -> kerusakan (penilaian ahli, tiruan) ---
                         RAM  Pendingin       Daya  Penyimpan
  Layar mati            0.70       0.10       0.80       0.20
  Kipas bising          0.00       0.90       0.10       0.00
  Panas                 0.10       0.90       0.30       0.10
  Restart               0.60       0.70       0.60       0.40

  laptop X: Layar mati 0.2, Kipas bising 0.8, Panas 0.9, Restart 0.6

  kerusakan      max-min    max-product
  RAM               0.60         0.36
  Pendingin         0.90         0.81
  Daya              0.60         0.36
  Penyimpan         0.40         0.24

  mengapa Pendingin 0.90 (max-min)? min(gejala, relasi) per jalur:
    lewat Layar mati   0.10
    lewat Kipas bising 0.80
    lewat Panas        0.90
    lewat Restart      0.60
  max dari semua jalur = 0.90
  Satu jalur yang kuat sudah cukup: 'panas' 0.9 dan relasinya 0.9.

--- R o S: gejala -> tindakan, tanpa tabel gejala-tindakan ---
                     Ganti RAM    Bersihkan  Cek adaptor
  Layar mati              0.70         0.20         0.80
  Kipas bising            0.10         0.90         0.10
  Panas                   0.10         0.90         0.30
  Restart                 0.60         0.70         0.60
  Hanya dua tabel kecil yang diisi ahli; tabel ketiga diturunkan.

  laptop X o (R o S)   : 0.60  0.90  0.60
  (laptop X o R) o S   : 0.60  0.90  0.60
  Sama: komposisi max-min bersifat asosiatif.

--- aturan 'JIKA suhu tinggi MAKA kipas cepat' sebagai relasi ---
  masukan tegas 80 C -> himpunan tunggal (1 di 80, 0 lainnya)
  komposisi max-min    : 0.20  0.60  0.70
  potong di alfa 0.7   : 0.20  0.60  0.70
  Hasilnya sama. Pemotongan (clipping) di Mamdani adalah
  komposisi max-min antara masukan dan relasi aturannya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hasil kali kartesius |X| × |Y|', waktu: 'O(|X| · |Y|)', memori: 'O(|X| · |Y|)' },
      { operasi: 'Vektor gejala ∘ relasi (g gejala, k kerusakan)', waktu: 'O(g · k)', memori: 'O(k)' },
      { operasi: 'Relasi ∘ relasi (a × b dan b × c)', waktu: 'O(a · b · c)', memori: 'O(a · c)' },
      { operasi: 'Inferensi lewat relasi di semesta diskret', waktu: 'O(|X| · |Y|)', memori: 'jauh lebih mahal dari pemotongan O(|Y|)' }
    ],
    intuisi: `Komposisi punya biaya yang sama dengan perkalian matriks: kubik untuk matriks persegi. Untuk tabel pakar yang berisi puluhan gejala dan kerusakan, itu tidak terasa.

Baris terakhir menjelaskan kenapa sistem Mamdani sungguhan tidak menghitung lewat relasi. Membentuk relasi aturan di semesta yang dibagi halus — misalnya 1000 titik suhu × 1000 titik rpm — butuh sejuta sel per aturan. Pemotongan menghasilkan jawaban yang sama untuk masukan tegas dengan cuma 1000 operasi. Relasi adalah cara **memahami** inferensi; pemotongan adalah cara **menghitung**-nya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menjumlahkan jalur-jalur komposisi seperti perkalian matriks biasa.',
      kenapa: 'Penjumlahan bisa menghasilkan derajat di atas 1 dan menganggap banyak bukti lemah setara satu bukti kuat. Komposisi fuzzy mengambil jalur terkuat, bukan jumlah semua jalur.',
      benar: 'Pakai max untuk menggabungkan jalur, dan min atau perkalian untuk setiap jalur.'
    },
    {
      salah: 'Menganggap relasi gejala-kerusakan simetris dengan relasi kerusakan-gejala.',
      kenapa: 'Seberapa kuat gejala menunjuk kerusakan tidak sama dengan seberapa sering kerusakan menimbulkan gejala itu. RAM rusak hampir selalu membuat restart, tetapi restart tidak selalu karena RAM.',
      benar: 'Tentukan arah relasi dengan jelas dan isi tabelnya sesuai arah itu.'
    },
    {
      salah: 'Mengharapkan kesimpulan menguat karena ada banyak gejala yang cocok.',
      kenapa: 'Max-min hanya mengikuti jalur terkuat. Menambah gejala yang lebih lemah dari jalur penentu tidak mengubah hasil sama sekali.',
      benar: 'Kalau bukti yang bertumpuk memang harus menguatkan kesimpulan, pakai operator lain atau metode yang dirancang untuk itu, dan jelaskan pilihannya.'
    },
    {
      salah: 'Mengira max-min dan max-product memberi urutan kesimpulan yang sama.',
      kenapa: 'Kedua operasi memberi nilai berbeda, dan pada kasus yang tipis urutan kerusakan teratas bisa berbeda karena max-product menurunkan jalur yang bagiannya sama-sama sedang.',
      benar: 'Pilih salah satu dengan alasan, dan laporkan kalau hasilnya bergantung pada pilihan itu.'
    },
    {
      salah: 'Membentuk relasi aturan di semesta yang sangat halus untuk menghitung inferensi Mamdani dengan masukan tegas.',
      kenapa: 'Relasi di semesta halus butuh memori dan waktu kuadratik, padahal untuk masukan tegas hasilnya sama persis dengan pemotongan yang linear.',
      benar: 'Pakai pemotongan untuk masukan tegas, dan komposisi hanya bila masukannya sendiri berupa himpunan fuzzy.'
    }
  ],

  analogi: `Bayangkan kamu mencari **jalan dari rumah ke kampus** saat musim hujan, dan setiap ruas jalan punya "derajat bisa dilewati".

**Satu jalur.** Rute lewat jalan raya terdiri dari dua ruas: ruas pertama bisa dilewati 0,9, ruas kedua 0,4 karena sering banjir. Seberapa bisa dilewati rute itu? **0,4** — rute hanya sebaik ruasnya yang paling buruk. Kalau satu ruas banjir, seluruh rute terhambat, sebagus apa pun ruas yang lain. Itulah min.

**Banyak jalur.** Ada tiga rute: lewat jalan raya (0,4), lewat perumahan (0,7), lewat jalan tikus (0,3). Seberapa bisa kamu sampai ke kampus? **0,7** — kamu tinggal memilih rute terbaik. Rute-rute yang lebih buruk tidak mengurangi apa pun; mereka cuma tidak dipakai. Itulah max.

Max-min adalah "cari rute yang ruas terburuknya paling baik".

**Menyambung peta.** Kamu punya peta dari rumah ke pertigaan-pertigaan, dan temanmu punya peta dari pertigaan-pertigaan ke kampus. Tanpa menjelajah ulang, kalian bisa menyusun peta rumah-ke-kampus: untuk setiap tujuan, coba lewat setiap pertigaan, ambil yang terbaik. Itu R ∘ S.

**Max-product.** Sekarang ruas-ruas itu bukan "seberapa bisa dilewati" melainkan "peluang tidak terlambat". Ruas pertama 0,9 dan ruas kedua 0,9 — apakah seluruh rute 0,9? Tidak: dua ruas yang masing-masing agak berisiko, kalau dilalui berurutan, menumpuk risikonya menjadi 0,81. Untuk hal-hal seperti ini, perkalian lebih masuk akal daripada min.`,

  latihan: [
    'Bentuk relasi kartesius dari "nilai tugas tinggi" dan "nilai ujian tinggi" dengan tiga titik masing-masing, lalu tafsirkan setiap selnya.',
    'Hitung komposisi max-min untuk laptop dengan gejala [0,9; 0,1; 0,2; 0,3] dengan tangan, lalu periksa dengan program.',
    'Tunjukkan satu kasus di mana urutan kerusakan teratas berbeda antara max-min dan max-product.',
    'Naikkan derajat "layar mati" laptop X dari 0,2 menjadi 0,5, lalu jelaskan kenapa derajat Pendingin tidak berubah.',
    'Tambahkan tindakan keempat "Ganti SSD" ke relasi S dan hitung ulang R ∘ S.',
    'Buktikan dengan angka bahwa (A ∘ R) ∘ S = A ∘ (R ∘ S) untuk vektor gejala pilihanmu.',
    'Susun relasi aturan "JIKA kelembapan tinggi MAKA penyiraman sedikit" di semesta tiga titik, lalu tunjukkan bahwa komposisi dengan singleton sama dengan pemotongan.',
    'Ganti masukan tegas 80 °C dengan himpunan fuzzy "sekitar 80 °C" (70: 0,5; 80: 1; 90: 0,5), lalu hitung keluarannya dengan komposisi.',
    'Rancang relasi fuzzy kecil untuk diagnosis masalah jaringan (gejala: lambat, putus-putus, tidak bisa terhubung) bersama temanmu sebagai "pakar".',
    'Jelaskan kenapa sistem Mamdani sungguhan memakai pemotongan, bukan komposisi, untuk masukan tegas.'
  ]
});


TOPICS.push({
  id: 'fuzzy-cmeans',
  judul: 'Fuzzy C-Means Clustering',
  kategori: 'fuzzy',
  tag: ['Fuzzy C-Means', 'FCM', 'clustering', 'derajat keanggotaan', 'pangkat m', 'K-Means', 'segmentasi pelanggan'],
  ringkas: 'K-Means memaksa setiap data masuk tepat satu kelompok. FCM membiarkan data yang berada di tengah-tengah mengaku sedikit mirip beberapa kelompok sekaligus — dan itu informasi yang berguna.',

  fungsi: `**Mengelompokkan data tanpa label, dengan setiap data mendapat derajat keanggotaan di setiap kelompok, bukan satu label tunggal.**

Topik Klasifikasi & Clustering di Data Mining membahas K-Means: setiap data masuk tepat satu kelompok. Fuzzy C-Means (FCM) melonggarkan satu hal itu, dengan akibat yang sangat berguna.

Terpakai di:

- **Segmentasi pelanggan** — pelanggan yang berada di antara dua segmen bisa dikenali, bukan dipaksa ke salah satunya
- **Segmentasi citra medis** — piksel di batas dua jaringan punya derajat di keduanya, sesuai kenyataan fisiknya
- **Mendeteksi data yang meragukan** — data dengan keanggotaan tertinggi yang rendah adalah data yang tidak cocok dengan kelompok mana pun
- **Membuat himpunan fuzzy dari data** — pusat dan sebaran kelompok FCM bisa menjadi fungsi keanggotaan untuk sistem inferensi Mamdani atau Sugeno

Yang paling penting dipahami: **keanggotaan setiap data berjumlah 1.** Pelanggan yang 0,98 di satu kelompok jelas anggotanya; pelanggan yang 0,32 · 0,37 · 0,31 sedang memberi tahu bahwa ia tidak cocok dengan kelompok mana pun — informasi yang hilang total di K-Means.

Dan satu angka yang mengatur semuanya: **pangkat m.** Mendekati 1, FCM berperilaku seperti K-Means. Makin besar, batas antar-kelompok makin kabur.`,

  praktik: {
    tujuan: 'Kamu bisa menjalankan FCM dari nol, memeriksa bahwa fungsi objektifnya turun, membaca pusat dan keanggotaan, memilih pangkat m, dan memakai keanggotaan untuk menemukan data yang meragukan.',
    alat: ['Python 3 dengan modul math dan random', 'Topik K-Means di Data Mining untuk perbandingan'],
    langkah: [
      { judul: 'Tentukan c dan m',
        isi: `c adalah banyaknya kelompok — seperti k di K-Means, harus ditentukan lebih dulu. m adalah pangkat pengabur, lebih dari 1; nilai 2 adalah pilihan yang paling lazim.` },
      { judul: 'Isi keanggotaan awal secara acak',
        isi: `Setiap data mendapat c bilangan acak yang dinormalkan supaya berjumlah 1. Pasang benih acak supaya hasilnya bisa diulang.` },
      { judul: 'Hitung pusat kelompok',
        isi: `Pusat kelompok j = rata-rata semua data, masing-masing diberi bobot uᵢⱼ^m. Data yang keanggotaannya tinggi di kelompok itu menarik pusatnya lebih kuat.` },
      { judul: 'Perbarui keanggotaan',
        isi: `uᵢⱼ = 1 / jumlah atas k dari (dᵢⱼ / dᵢₖ)^(2/(m − 1)), dengan dᵢⱼ jarak data i ke pusat j. Makin dekat ke sebuah pusat, makin besar keanggotaannya di kelompok itu.

Tangani kasus jarak nol secara khusus: data yang tepat di sebuah pusat mendapat keanggotaan 1 di kelompok itu.` },
      { judul: 'Ulangi sampai stabil, pantau J',
        isi: `Hitung fungsi objektif J = jumlah uᵢⱼ^m × dᵢⱼ² setiap putaran. J harus turun di setiap putaran; berhenti saat perubahan keanggotaan terbesar di bawah toleransi.

Kalau J pernah naik, ada kesalahan di rumus.` },
      { judul: 'Baca keanggotaan, bukan cuma label',
        isi: `Untuk setiap data, catat keanggotaan tertingginya. Data dengan nilai tertinggi di bawah ambang — misalnya 0,6 — adalah data yang tidak jelas kelompoknya. Tangani mereka secara terpisah.` },
      { judul: 'Coba beberapa nilai m',
        isi: `Jalankan dengan m = 1,1, 1,5, 2, dan 3. Lihat bagaimana keanggotaan data inti dan data yang di tengah berubah. Pilih m yang memberi pemisahan yang masuk akal untuk tujuanmu.` }
    ],
    cek: [
      'Fungsi objektif J hasil programmu turun di setiap putaran',
      'Keanggotaan setiap data berjumlah 1',
      'Kamu bisa menunjuk data mana yang tidak jelas kelompoknya dari keanggotaannya',
      'Kamu bisa menjelaskan pengaruh m dengan hasil percobaanmu sendiri'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa keanggotaan dihitung dari perbandingan jarak',

  konsep: `K-Means di Data Mining mengulang dua langkah: masukkan setiap data ke pusat terdekat, lalu pindahkan setiap pusat ke rata-rata anggotanya. Setiap data milik **tepat satu** kelompok.

**Fuzzy C-Means** mengganti "milik tepat satu" dengan **derajat keanggotaan** di setiap kelompok, berjumlah 1 per data. Dua langkahnya tetap sama bentuknya:

1. **Pusat** = rata-rata semua data, **dibobot** keanggotaannya dipangkatkan m
2. **Keanggotaan** = dihitung dari seberapa dekat data ke setiap pusat, **relatif** terhadap pusat-pusat lain

Keduanya meminimalkan satu fungsi objektif: J = jumlah uᵢⱼ^m × jarak². Data yang jauh dari pusatnya menyumbang besar ke J, kecuali keanggotaannya di pusat itu kecil.

**Kasus: pelanggan warung kopi**

Enam belas pelanggan, dengan dua ciri: kunjungan per bulan dan belanja rata-rata (ribu rupiah). Tiga kelompok yang jelas — jarang dan hemat, sering dan hemat, jarang dan boros — ditambah satu pelanggan di tengah-tengah: 12 kunjungan, belanja 50 ribu.

**Fungsi objektif**

| Putaran | 1 | 2 | 3 | 4 | 5 | 6 | ... | 11 |
|---|---|---|---|---|---|---|---|---|
| J | 5057 | 3306 | 992 | 720 | 542 | 537 | ... | 537,5 |

J turun di setiap putaran, dan FCM berhenti setelah 11 putaran. Penurunan yang dijamin ini yang membuat FCM pasti berhenti — meski, seperti K-Means, belum tentu di minimum terbaik; hasilnya bisa bergantung pada keanggotaan awal.

**Pusat kelompok**

| Kelompok | Pusat (kunjungan, belanja) |
|---|---|
| jarang, hemat | (3,0; 17,3) |
| sering, hemat | (20,7; 19,9) |
| jarang, boros | (4,7; 83,5) |

**Keanggotaan**

| Pelanggan | Jarang, hemat | Sering, hemat | Jarang, boros |
|---|---|---|---|
| (2, 15) | **0,982** | 0,016 | 0,001 |
| (20, 18) | 0,014 | **0,985** | 0,001 |
| (5, 80) | 0,003 | 0,003 | **0,994** |
| (12, 50) | 0,318 | 0,372 | 0,310 |

Tiga pelanggan pertama jelas anggota kelompoknya. Pelanggan (12, 50) **tidak** — keanggotaannya hampir rata di ketiganya.

K-Means akan memasukkan (12, 50) ke kelompok "sering, hemat", karena dengan pusat-pusat ini, pusat itulah yang sedikit lebih dekat. Tim pemasaran lalu memberinya promosi untuk pelanggan setia yang hemat. FCM memberi tahu hal yang lebih jujur: pelanggan ini tidak cocok dengan pola mana pun, dan mungkin layak ditanyai langsung.

**Pangkat m**

| m | (2, 15): keanggotaan tertinggi | (12, 50): tertinggi |
|---|---|---|
| 1,1 | 1,000 | 0,988 |
| 1,5 | 1,000 | 0,427 |
| 2,0 | 0,982 | 0,372 |
| 3,0 | 0,872 | 0,352 |

Dengan m = 1,1, pelanggan di tengah pun mendapat keanggotaan 0,988 di satu kelompok — FCM hampir sama dengan K-Means. Makin besar m, keanggotaan makin merata, menuju 1/3: pelanggan inti (2, 15) pun mulai "ragu", 0,872 di m = 3.

m = 2 adalah pilihan yang paling lazim, dan di sini ia memberi yang dicari: pelanggan inti tetap jelas, pelanggan di tengah jelas terlihat di tengah.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "# 1. pusat = rata-rata terbobot u^m\nfor j in range(c):\n    w = [U[i][j] ** m for i in range(n)]\n    pusat.append(tuple(sum(w[i] * data[i][d] for i in range(n)) / sum(w)\n                       for d in range(2)))\n\n# 2. keanggotaan baru dari perbandingan jarak\nfor i in range(n):\n    d = [jarak(data[i], p) for p in pusat]\n    if min(d) == 0:                      # tepat di sebuah pusat\n        U_baru.append([1.0 if x == 0 else 0.0 for x in d])\n        continue\n    U_baru.append([1 / sum((d[j] / d[k]) ** (2 / (m - 1)) for k in range(c))\n                   for j in range(c)])",
      penjelasan: `Dua langkah yang saling bergantian, dan satu kasus khusus yang membuat program tidak mogok.

**Pusat: rata-rata terbobot.**

K-Means menghitung pusat sebagai rata-rata anggotanya — setiap anggota berbobot 1, bukan anggota berbobot 0. FCM menghitung rata-rata **semua** data, dengan bobot uᵢⱼ^m.

Kenapa dipangkatkan m? Dengan m = 2, data yang keanggotaannya 0,9 berbobot 0,81, sedangkan data yang keanggotaannya 0,3 berbobot cuma 0,09 — sembilan kali lebih kecil, bukan tiga. Pemangkatan membuat anggota inti jauh lebih menentukan letak pusat daripada data pinggiran. Tanpa pangkat — m = 1 — setiap data menarik setiap pusat sebanding keanggotaannya, dan semua pusat cenderung terseret ke tengah seluruh data.

**Keanggotaan: perbandingan jarak.**

Rumusnya terlihat rumit, tetapi isinya sederhana. Untuk data i dan kelompok j, bandingkan jaraknya ke pusat j dengan jaraknya ke setiap pusat k: dᵢⱼ/dᵢₖ. Kalau pusat j jauh lebih dekat dari yang lain, perbandingan-perbandingan itu kecil, jumlahnya kecil, dan keanggotaannya mendekati 1.

Yang menentukan adalah jarak **relatif**. Data yang berjarak 10 ke semua pusat mendapat keanggotaan 1/3 di setiap kelompok — sama dengan data yang berjarak 1000 ke semua pusat. FCM tidak tahu bahwa data kedua itu jauh dari semua kelompok; ia cuma tahu data itu sama jauhnya dari semuanya.

**Pangkat 2/(m − 1).**

Dengan m = 2, pangkatnya 2: perbandingan jarak dikuadratkan. Dengan m mendekati 1, pangkatnya menuju tak hingga: perbandingan di atas 1 meledak, di bawah 1 lenyap, dan keanggotaan menjadi 0 atau 1 — K-Means. Dengan m besar, pangkatnya menuju 0: semua perbandingan menjadi 1, dan keanggotaan menjadi 1/c — semua kelompok melebur.

Satu angka m mengatur seluruh rentang antara K-Means dan "semua sama".

**Kasus khusus: jarak nol.**

Kalau data tepat di sebuah pusat, dᵢⱼ = 0, dan rumus membagi dengan nol. Program menangani ini lebih dulu: data itu mendapat keanggotaan 1 di kelompok tersebut dan 0 di yang lain — yang juga merupakan limit rumusnya saat jarak menuju nol. Pada data nyata dengan angka pecahan, ini jarang terjadi. Pada data bilangan bulat yang sering kembar, ini bisa terjadi di putaran pertama — dan tanpa penanganan ini, program mogok.`
    },
    {
      bahasa: 'python',
      kode: "for m in [1.1, 1.5, 2.0, 3.0]:\n    _, U_m, _ = fcm(DATA, 3, m)\n    # keanggotaan tertinggi pelanggan inti dan pelanggan di tengah\n\n# m     (2, 15)   (12, 50)\n# 1.1   1.000     0.988      <- hampir K-Means\n# 2.0   0.982     0.372\n# 3.0   0.872     0.352      <- makin merata\n\nragu = [DATA[i] for i in range(len(DATA)) if max(U[i]) < 0.6]\n# [(12, 50)]",
      penjelasan: `Dua pemakaian keanggotaan: memilih m, dan menemukan data yang tidak cocok dengan kelompok mana pun.

**Tidak ada m yang "benar".**

Berbeda dengan c, yang setidaknya bisa dipilih dengan melihat data, m adalah pilihan tentang seberapa kabur batas yang kamu inginkan. Tabelnya menunjukkan rentangnya:

- m = 1,1: pelanggan (12, 50) mendapat 0,988 di satu kelompok. Informasi "ia di tengah" hilang — persis seperti K-Means.
- m = 2: pelanggan inti tetap jelas (0,982), pelanggan di tengah jelas terlihat ragu (0,372).
- m = 3: pelanggan inti pun mulai kabur (0,872).

m = 2 dipakai paling luas bukan karena terbukti optimal, melainkan karena memberi keseimbangan yang masuk akal di banyak kasus, dan rumusnya paling sederhana — pangkat 2/(m − 1) menjadi 2. Laporkan m yang dipakai, dan kalau hasilnya penting, tunjukkan bahwa kesimpulan utamanya tidak berubah untuk m di sekitarnya.

**Keanggotaan tertinggi sebagai ukuran keyakinan.**

\`max(U[i])\` adalah seberapa yakin FCM tentang kelompok data i. Mendekati 1: jelas. Mendekati 1/c: tidak tahu sama sekali.

Ambang 0,6 memilih data yang tidak punya kelompok dengan keanggotaan di atas 60 persen. Di data ini cuma satu: (12, 50).

Ambangnya adalah keputusan, bukan hasil perhitungan. Ambang yang lebih tinggi menandai lebih banyak data sebagai meragukan; yang lebih rendah, lebih sedikit. Pilih berdasarkan apa yang akan dilakukan pada data meragukan itu — kalau penanganannya mahal, misalnya wawancara langsung, pakai ambang yang lebih rendah.

**Batas yang harus diingat.**

Keanggotaan FCM relatif: data yang sangat jauh dari **semua** kelompok bisa tetap mendapat keanggotaan tinggi di kelompok yang paling tidak jauh. Pencilan sungguhan — misalnya pelanggan yang belanja 5 juta sekali datang — mungkin mendapat 0,9 di kelompok "boros" dan tidak ditandai sebagai meragukan.

Untuk menemukan pencilan seperti itu, keanggotaan saja tidak cukup; periksa juga jarak mutlak ke pusat terdekat, atau pakai varian FCM yang dirancang untuk itu, seperti Possibilistic C-Means.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Fuzzy C-Means: setiap titik boleh milik beberapa kelompok
# ============================================
import math
import random

# Pelanggan warung kopi: (kunjungan per bulan, belanja rata-rata dalam ribu)
DATA = [
    (2, 15), (3, 18), (2, 20), (4, 16), (3, 14),        # jarang, hemat
    (20, 18), (22, 22), (19, 20), (21, 16), (23, 19),   # sering, hemat
    (5, 80), (4, 85), (6, 78), (3, 90), (5, 88),        # jarang, boros
    (12, 50),                                           # di tengah-tengah
]
NAMA_TENGAH = len(DATA) - 1

def jarak(a, b):
    return math.dist(a, b)

def fcm(data, c, m, seed=1, toleransi=1e-6, cetak=False):
    random.seed(seed)
    n = len(data)
    # keanggotaan awal acak, setiap baris berjumlah 1
    U = []
    for _ in range(n):
        r = [random.random() for _ in range(c)]
        U.append([x / sum(r) for x in r])
    riwayat = []
    for putaran in range(1, 301):
        # 1. pusat = rata-rata terbobot u^m
        pusat = []
        for j in range(c):
            w = [U[i][j] ** m for i in range(n)]
            pusat.append(tuple(sum(w[i] * data[i][d] for i in range(n)) / sum(w)
                               for d in range(2)))
        # 2. keanggotaan baru dari jarak ke setiap pusat
        U_baru = []
        for i in range(n):
            d = [jarak(data[i], p) for p in pusat]
            if min(d) == 0:                      # tepat di sebuah pusat
                U_baru.append([1.0 if x == 0 else 0.0 for x in d])
                continue
            U_baru.append([1 / sum((d[j] / d[k]) ** (2 / (m - 1)) for k in range(c))
                           for j in range(c)])
        # 3. fungsi objektif
        J = sum(U_baru[i][j] ** m * jarak(data[i], pusat[j]) ** 2
                for i in range(n) for j in range(c))
        riwayat.append(J)
        ubah = max(abs(U_baru[i][j] - U[i][j]) for i in range(n) for j in range(c))
        U = U_baru
        if ubah < toleransi:
            break
    return pusat, U, riwayat

# --------------------------------------------
# 1. Menjalankan FCM dengan m = 2
# --------------------------------------------
print("--- 16 pelanggan, 3 kelompok, m = 2 ---")
pusat, U, riwayat = fcm(DATA, 3, 2)
print("  fungsi objektif J per putaran (harus turun):")
print("  " + "  ".join(format(J, ".0f") for J in riwayat[:6]) + "  ...  "
      + format(riwayat[-1], ".1f"))
turun = all(a >= b - 1e-9 for a, b in zip(riwayat, riwayat[1:]))
print("  selalu turun: " + ("YA" if turun else "TIDAK") + ", berhenti setelah "
      + str(len(riwayat)) + " putaran")

urut = sorted(range(3), key=lambda j: (pusat[j][1], pusat[j][0]))
LABEL = {}
for j in urut:
    x, y = pusat[j]
    LABEL[j] = ("sering" if x > 12 else "jarang") + ", " + ("boros" if y > 50 else "hemat")
print("\n  pusat kelompok:")
for j in urut:
    print("    " + format(LABEL[j], "<16") + "(" + format(pusat[j][0], ".1f") + ", "
          + format(pusat[j][1], ".1f") + ")")

print("\n  keanggotaan beberapa pelanggan:")
print("  pelanggan    " + "".join(format(LABEL[j], ">17") for j in urut))
for i in [0, 5, 10, NAMA_TENGAH]:
    print("  " + format(str(DATA[i]), "<13") + "".join(format(U[i][j], ">17.3f") for j in urut))
print("  (setiap baris berjumlah " + format(sum(U[NAMA_TENGAH]), ".3f") + ")")
print()
print("  Pelanggan (12, 50) bukan milik satu kelompok. K-Means akan")
print("  memaksanya masuk satu kotak; FCM mengatakan apa adanya:")
print("  ia sedikit mirip ketiganya.")

# --------------------------------------------
# 2. Pangkat m mengatur seberapa kabur batasnya
# --------------------------------------------
print("\n--- pengaruh pangkat m ---")
print("  m       (2, 15): keanggotaan tertinggi   (12, 50): tertinggi")
for m in [1.1, 1.5, 2.0, 3.0]:
    _, U_m, _ = fcm(DATA, 3, m)
    print("  " + format(m, "<6") + format(max(U_m[0]), "22.3f") + format(max(U_m[NAMA_TENGAH]), "25.3f"))
print()
print("  m mendekati 1: keanggotaan mendekati 0 atau 1 -- mirip K-Means.")
print("  m makin besar: keanggotaan makin merata, menuju 1/3 --")
print("  kelompok-kelompok mulai melebur.")
print("  m = 2 adalah pilihan yang paling lazim.")

# --------------------------------------------
# 3. Dari keanggotaan ke keputusan
# --------------------------------------------
print("\n--- pelanggan yang 'tidak jelas kelompoknya' ---")
ambang = 0.6
ragu = [DATA[i] for i in range(len(DATA)) if max(U[i]) < ambang]
print("  keanggotaan tertinggi di bawah " + str(ambang) + ": " + str(ragu))
print("  Pelanggan seperti ini layak ditangani terpisah -- misalnya")
print("  ditanya langsung -- daripada diberi promosi kelompok yang")
print("  belum tentu cocok. Informasi ini hilang di K-Means.")` },
  output: `--- 16 pelanggan, 3 kelompok, m = 2 ---
  fungsi objektif J per putaran (harus turun):
  5057  3306  992  720  542  537  ...  537.5
  selalu turun: YA, berhenti setelah 11 putaran

  pusat kelompok:
    jarang, hemat   (3.0, 17.3)
    sering, hemat   (20.7, 19.9)
    jarang, boros   (4.7, 83.5)

  keanggotaan beberapa pelanggan:
  pelanggan        jarang, hemat    sering, hemat    jarang, boros
  (2, 15)                  0.982            0.016            0.001
  (20, 18)                 0.014            0.985            0.001
  (5, 80)                  0.003            0.003            0.994
  (12, 50)                 0.318            0.372            0.310
  (setiap baris berjumlah 1.000)

  Pelanggan (12, 50) bukan milik satu kelompok. K-Means akan
  memaksanya masuk satu kotak; FCM mengatakan apa adanya:
  ia sedikit mirip ketiganya.

--- pengaruh pangkat m ---
  m       (2, 15): keanggotaan tertinggi   (12, 50): tertinggi
  1.1                    1.000                    0.988
  1.5                    1.000                    0.427
  2.0                    0.982                    0.372
  3.0                    0.872                    0.352

  m mendekati 1: keanggotaan mendekati 0 atau 1 -- mirip K-Means.
  m makin besar: keanggotaan makin merata, menuju 1/3 --
  kelompok-kelompok mulai melebur.
  m = 2 adalah pilihan yang paling lazim.

--- pelanggan yang 'tidak jelas kelompoknya' ---
  keanggotaan tertinggi di bawah 0.6: [(12, 50)]
  Pelanggan seperti ini layak ditangani terpisah -- misalnya
  ditanya langsung -- daripada diberi promosi kelompok yang
  belum tentu cocok. Informasi ini hilang di K-Means.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Satu putaran FCM (n data, c kelompok, d dimensi)', waktu: 'O(n · c · d + n · c²)', memori: 'O(n · c) untuk matriks keanggotaan' },
      { operasi: 'Satu putaran K-Means', waktu: 'O(n · c · d)', memori: 'O(n) untuk label' },
      { operasi: 'Seluruh FCM, t putaran', waktu: 'O(t · n · (c · d + c²))', memori: 'O(n · c)' },
      { operasi: 'Mencari data meragukan', waktu: 'O(n · c)', memori: 'O(1) tambahan' }
    ],
    intuisi: `FCM lebih mahal dari K-Means per putaran. Setiap data butuh jarak ke setiap pusat, seperti K-Means — tetapi lalu setiap keanggotaan butuh jumlah atas semua pusat, sehingga muncul faktor c tambahan. Untuk c kecil, selisihnya tidak terasa; untuk ratusan kelompok, terasa.

FCM juga menyimpan matriks keanggotaan n × c, bukan cuma satu label per data. Untuk sejuta data dan sepuluh kelompok, itu sepuluh juta angka.

Keduanya sama-sama bisa berakhir di minimum lokal. Praktik yang lazim sama: jalankan beberapa kali dengan benih acak berbeda, dan ambil hasil dengan J terkecil.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengambil kelompok dengan keanggotaan tertinggi lalu membuang keanggotaannya.',
      kenapa: 'Itu mengubah FCM kembali menjadi K-Means dengan biaya lebih mahal, dan membuang satu-satunya informasi yang diberikan FCM: seberapa yakin setiap data termasuk kelompoknya.',
      benar: 'Simpan keanggotaan lengkapnya, dan pakai keanggotaan tertinggi sebagai ukuran keyakinan.'
    },
    {
      salah: 'Memakai m = 1.',
      kenapa: 'Pangkat 2/(m − 1) menjadi pembagian dengan nol. Secara konsep, m = 1 adalah K-Means, bukan FCM.',
      benar: 'Pakai m lebih dari 1, lazimnya 2, dan pakai K-Means kalau memang ingin keanggotaan tegas.'
    },
    {
      salah: 'Tidak menangani data yang tepat berada di sebuah pusat.',
      kenapa: 'Jarak nol membuat rumus keanggotaan membagi dengan nol, dan program mogok. Pada data bilangan bulat yang sering kembar, ini bisa terjadi.',
      benar: 'Periksa jarak nol lebih dulu dan beri keanggotaan 1 di kelompok itu, 0 di yang lain.'
    },
    {
      salah: 'Menganggap keanggotaan tinggi berarti data dekat dengan kelompoknya.',
      kenapa: 'Keanggotaan dihitung dari jarak relatif. Pencilan yang jauh dari semua kelompok bisa tetap mendapat keanggotaan tinggi di kelompok yang paling tidak jauh.',
      benar: 'Periksa juga jarak mutlak ke pusat terdekat untuk menemukan pencilan.'
    },
    {
      salah: 'Mengelompokkan data yang cirinya berbeda satuan tanpa menyamakan skalanya.',
      kenapa: 'Jarak Euclidean didominasi ciri dengan angka terbesar. Kalau belanja dicatat dalam rupiah, bukan ribuan, kunjungan per bulan praktis diabaikan.',
      benar: 'Normalkan setiap ciri lebih dulu, seperti di topik persiapan data Data Mining.'
    },
    {
      salah: 'Menjalankan FCM sekali dan menganggap hasilnya pasti yang terbaik.',
      kenapa: 'Seperti K-Means, FCM bisa berakhir di minimum lokal yang bergantung pada keanggotaan awal.',
      benar: 'Jalankan beberapa kali dengan benih acak berbeda dan ambil hasil dengan J terkecil.'
    }
  ],

  analogi: `Bayangkan kamu mengelompokkan teman-teman sekelas berdasarkan **tempat nongkrong** favorit mereka: perpustakaan, kantin, dan lapangan basket.

**K-Means.** Setiap teman dimasukkan ke tepat satu kelompok — tempat yang paling sering ia datangi. Budi paling sering ke kantin, jadi Budi "anak kantin".

Masalahnya: Budi ke kantin 35 persen waktunya, ke perpustakaan 33 persen, ke lapangan 32 persen. Menyebutnya "anak kantin" sama saja dengan menyebut Ani — yang ke kantin 95 persen waktunya — "anak kantin". Keduanya mendapat label yang sama, padahal sama sekali tidak mirip.

**FCM.** Setiap teman mendapat tiga angka yang berjumlah 100 persen. Ani: kantin 95, perpustakaan 3, lapangan 2 — jelas anak kantin. Budi: 35, 33, 32 — tidak jelas anak mana-mana. Informasi itu yang berguna: kalau kamu ingin mengajak "anak kantin" rapat di kantin, Ani pasti datang, Budi belum tentu.

**Pusat kelompok.** "Suasana khas" kelompok kantin ditentukan lebih banyak oleh Ani daripada Budi — karena Ani benar-benar anak kantin. Itulah rata-rata terbobot dengan pangkat m: anggota inti menentukan pusat jauh lebih kuat daripada anggota pinggiran.

**Pangkat m.** Dengan m yang sangat kecil, kamu kembali memaksa setiap orang ke satu kelompok. Dengan m yang sangat besar, kamu jadi bilang "semua orang sedikit anak kantin, sedikit anak perpustakaan, sedikit anak lapangan" — benar, tetapi tidak berguna.

**Batasnya.** Ada satu teman yang hampir tidak pernah ke mana pun — ia langsung pulang setelah kuliah. FCM tetap memberinya tiga angka yang berjumlah 100, mungkin 60 persen "perpustakaan" karena itu yang paling dekat ke ruang kelas. FCM tidak bisa bilang "orang ini bukan anak kelompok mana pun" — untuk itu, kamu harus melihat seberapa jarang ia ke mana-mana, bukan cuma ke mana ia paling sering pergi.`,

  latihan: [
    'Jalankan FCM pada data pelanggan dengan c = 2 dan c = 4, lalu bandingkan keanggotaan pelanggan (12, 50).',
    'Hitung dengan tangan keanggotaan titik (12, 50) di ketiga kelompok, memakai pusat hasil program dan m = 2.',
    'Tambahkan pelanggan (60, 500) ke data, jalankan FCM, dan tunjukkan bahwa ia bisa mendapat keanggotaan tinggi di satu kelompok padahal jauh dari semuanya.',
    'Jalankan FCM lima kali dengan benih acak berbeda, catat J akhir masing-masing, dan periksa apakah pusatnya selalu sama.',
    'Jalankan K-Means dari topik Data Mining pada data yang sama, lalu bandingkan kelompok pelanggan (12, 50) dengan hasil FCM.',
    'Ubah belanja menjadi satuan rupiah penuh (15 ribu menjadi 15000), jalankan FCM tanpa normalisasi, dan jelaskan hasilnya.',
    'Buat grafik J per putaran untuk m = 1,5, 2, dan 3, lalu bandingkan kecepatan kekonvergenannya.',
    'Tentukan ambang keanggotaan yang menandai tepat dua pelanggan sebagai meragukan setelah kamu menambahkan satu pelanggan baru di tengah.',
    'Pakai pusat dan sebaran kelompok FCM untuk membuat tiga fungsi keanggotaan segitiga bagi ciri "belanja".',
    'Jelaskan kenapa pangkat 2/(m − 1) membuat FCM mendekati K-Means saat m mendekati 1.'
  ]
});


TOPICS.push({
  id: 'fuzzy-linguistik',
  judul: 'Variabel Linguistik, Hedge & Bilangan Fuzzy',
  kategori: 'fuzzy',
  tag: ['variabel linguistik', 'hedge', 'sangat', 'agak', 'alfa-cut', 'bilangan fuzzy', 'aritmetika fuzzy'],
  ringkas: '"Sangat panas", "agak panas", "sekitar lima hari" — cara logika fuzzy mengubah kata-kata sehari-hari menjadi hitungan, dan satu jembatan kembali ke logika biasa.',

  fungsi: `**Memberi arti yang bisa dihitung pada kata-kata seperti "sangat", "agak", dan "sekitar", lalu menghitung dengan besaran yang tidak pasti.**

Terpakai di:

- **Menulis aturan fuzzy yang lebih kaya** — "JIKA suhu SANGAT panas" tanpa perlu membuat himpunan baru untuk setiap penekanan
- **Mengubah derajat fuzzy menjadi syarat biasa** — α-cut memberi selang tegas yang bisa ditulis sebagai \`if\` di kode mana pun
- **Estimasi di bawah ketidakpastian** — lama proyek "sekitar 5 hari" ditambah "sekitar 3 hari", dengan ketidakpastian yang ikut dihitung
- **Survei dan penilaian kualitatif** — jawaban "cukup baik", "sangat baik" diubah menjadi angka yang bisa diolah

Yang paling berguna dipahami: **setiap himpunan fuzzy adalah tumpukan selang biasa**, satu untuk setiap tingkat keyakinan α. Itu jembatan dua arah antara logika fuzzy dan logika biasa — dan dasar untuk menghitung dengan bilangan fuzzy.

Dan yang paling mengejutkan: **"sekitar 5" dikurangi "sekitar 5" bukan nol.** Aritmetika fuzzy tidak tahu bahwa keduanya besaran yang sama.`,

  praktik: {
    tujuan: 'Kamu bisa menerapkan hedge pada himpunan fuzzy, menghitung α-cut dan menyusun ulang himpunan darinya, menjumlahkan dan mengalikan bilangan fuzzy lewat α-cut, dan mengenali kapan aritmetika fuzzy melebih-lebihkan ketidakpastian.',
    alat: ['Python 3'],
    langkah: [
      { judul: 'Tentukan variabel linguistiknya',
        isi: `Variabel linguistik punya nama (suhu ruang server), semesta (20–60 °C), dan istilah-istilah (dingin, hangat, panas), masing-masing dengan fungsi keanggotaan.` },
      { judul: 'Terapkan hedge',
        isi: `Tiga hedge klasik dari Zadeh:

- **sangat** A: μ², konsentrasi — himpunan menyempit
- **agak** A: √μ, dilasi — himpunan melebar
- **tidak** A: 1 − μ

Hitung untuk beberapa titik dan perhatikan bahwa derajat 0 dan 1 tidak pernah berubah oleh "sangat" dan "agak".` },
      { judul: 'Hitung α-cut',
        isi: `α-cut adalah himpunan biasa {x : μ(x) ≥ α}. Untuk himpunan yang naik lurus, batas bawahnya bisa dihitung langsung dengan membalik fungsi keanggotaan.

Tulis hasilnya sebagai syarat biasa: "panas dengan keyakinan minimal 0,5" berarti \`suhu >= 34\`.` },
      { judul: 'Susun ulang himpunan dari α-cut-nya',
        isi: `Untuk setiap x, ambil α terbesar yang α-cut-nya memuat x. Dengan cukup banyak tingkat α, hasilnya mendekati fungsi keanggotaan aslinya.

Ini teorema dekomposisi: himpunan fuzzy sepenuhnya ditentukan oleh tumpukan α-cut-nya.` },
      { judul: 'Tulis bilangan fuzzy sebagai α-cut',
        isi: `Bilangan fuzzy segitiga (a, b, c) — "sekitar b, paling kecil a, paling besar c" — punya α-cut [a + α(b − a), c − α(c − b)].` },
      { judul: 'Hitung dengan selang di setiap α',
        isi: `Penjumlahan: [a₁ + b₁, a₂ + b₂]. Perkalian: min dan max dari keempat hasil kali ujung. Lakukan untuk setiap α, dan tumpukan hasilnya adalah bilangan fuzzy hasilnya.` },
      { judul: 'Waspadai besaran yang sama muncul dua kali',
        isi: `Hitung "sekitar 5" dikurangi dirinya sendiri. Hasilnya bukan nol, melainkan selang di sekitar nol.

Kalau rumusmu memakai besaran tak pasti yang sama lebih dari sekali, sederhanakan rumusnya lebih dulu sebelum menghitung dengan α-cut.` }
    ],
    cek: [
      'Kamu bisa menghitung derajat "sangat panas" dan "agak panas" dari derajat "panas"',
      'Kamu bisa menulis α-cut sebagai syarat if biasa',
      'Penjumlahan dua bilangan fuzzy segitigamu menghasilkan segitiga dengan lebar yang dijumlahkan',
      'Kamu bisa menjelaskan kenapa "sekitar 5" dikurangi dirinya sendiri tidak memberi nol'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa himpunan fuzzy adalah tumpukan selang',

  konsep: `Topik himpunan fuzzy memberi derajat pada "panas". Topik ini membahas tiga hal yang dibangun di atasnya: cara memberi arti pada kata-kata penekan seperti "sangat", cara kembali ke logika biasa, dan cara menghitung dengan besaran yang tidak pasti.

**Variabel linguistik**

Zadeh memperkenalkan **variabel linguistik**: variabel yang nilainya kata-kata, bukan angka. "Suhu ruang server" bernilai "dingin", "hangat", atau "panas", dan setiap kata adalah himpunan fuzzy di semesta angka suhu.

Di sini "panas" naik lurus dari 30 °C (derajat 0) sampai 38 °C (derajat 1).

**Hedge: sangat, agak, tidak**

| Istilah | 30 °C | 32 °C | 34 °C | 36 °C | 38 °C |
|---|---|---|---|---|---|
| panas | 0,00 | 0,25 | 0,50 | 0,75 | 1,00 |
| sangat panas | 0,00 | 0,06 | 0,25 | 0,56 | 1,00 |
| agak panas | 0,00 | 0,50 | 0,71 | 0,87 | 1,00 |
| tidak panas | 1,00 | 0,75 | 0,50 | 0,25 | 0,00 |
| sangat tidak panas | 1,00 | 0,56 | 0,25 | 0,06 | 0,00 |

**Sangat** mengkuadratkan derajat. Karena derajat di antara 0 dan 1, kuadratnya selalu lebih kecil: 0,5 menjadi 0,25. Himpunannya **menyempit** — lebih sulit untuk dianggap "sangat panas" daripada "panas". Itu yang dimaksud kata "sangat".

**Agak** mengakarkan: 0,5 menjadi 0,71. Himpunannya **melebar** — lebih mudah dianggap "agak panas".

Derajat 0 dan 1 tidak berubah oleh keduanya. Suhu yang sepenuhnya panas tetap sepenuhnya "sangat panas"; yang sama sekali tidak panas tetap sama sekali tidak "agak panas".

Hedge bisa digabung: "sangat tidak panas" = (1 − μ)². Satu himpunan "panas" melahirkan seluruh keluarga istilah, tanpa satu pun fungsi keanggotaan baru.

Pangkat 2 dan ½ adalah usulan Zadeh, bukan hasil pengukuran. Di aplikasi sungguhan, pangkatnya bisa disesuaikan dengan cara pengguna benar-benar memakai kata-kata itu.

**α-cut: jembatan ke logika biasa**

α-cut adalah himpunan biasa — tegas, tanpa derajat — berisi semua x dengan derajat minimal α:

| α | α-cut "panas" |
|---|---|
| 0,25 | suhu 32 ke atas |
| 0,50 | suhu 34 ke atas |
| 0,75 | suhu 36 ke atas |
| 1,00 | suhu 38 ke atas |

"Sangat panas" di α = 0,5: suhu 35,66 ke atas — lebih ketat, sesuai arti "sangat".

α-cut membuat kesimpulan fuzzy bisa dipakai di mana pun: "nyalakan pendingin cadangan kalau suhu panas dengan keyakinan minimal 0,5" menjadi \`if suhu >= 34\` — kode biasa, tanpa pustaka fuzzy.

**Himpunan fuzzy = tumpukan α-cut**

Arah sebaliknya juga berlaku. Kalau semua α-cut diketahui, himpunannya bisa disusun ulang: derajat x adalah α terbesar yang α-cut-nya memuat x.

| Tingkat α | Galat terbesar penyusunan ulang |
|---|---|
| 4 | 0,237 |
| 10 | 0,088 |
| 100 | 0,008 |

Makin banyak tingkat, makin tepat. Ini **teorema dekomposisi**: setiap himpunan fuzzy adalah tumpukan selang biasa, satu untuk setiap tingkat keyakinan. Dan itu yang membuat aritmetika fuzzy bisa dihitung.

**Bilangan fuzzy dan aritmetikanya**

"Sekitar 5 hari" bisa ditulis sebagai bilangan fuzzy segitiga (4, 5, 6): paling mungkin 5, tidak kurang dari 4, tidak lebih dari 6. "Sekitar 3 hari" = (2, 3, 4).

Untuk menjumlahkan atau mengalikannya, hitung dengan **selang biasa** di setiap tingkat α, lalu tumpukan hasilnya:

| α | A | B | A + B | A × B |
|---|---|---|---|---|
| 0,0 | [4, 6] | [2, 4] | [6, 10] | [8, 24] |
| 0,5 | [4,5; 5,5] | [2,5; 3,5] | [7, 9] | [11,25; 19,25] |
| 1,0 | [5, 5] | [3, 3] | [8, 8] | [15, 15] |

**A + B** = segitiga (6, 8, 10): "sekitar 8 hari". Ketidakpastiannya **bertambah**: lebar 2 + 2 = 4. Merencanakan proyek dari dua tugas yang masing-masing "kurang lebih sehari" menghasilkan proyek yang "kurang lebih dua hari".

**A × B** di α = 0,5 adalah [11,25; 19,25]. Kalau hasilnya segitiga, di α = 0,5 seharusnya [11,5; 19,5] — tepat di tengah antara [8, 24] dan [15, 15]. Ternyata tidak. Hasil kali dua bilangan segitiga **bukan segitiga** lagi; sisi-sisinya melengkung.

**"Sekitar 5" dikurangi "sekitar 5"**

| α | Hasil |
|---|---|
| 0,0 | [−2, 2] |
| 0,5 | [−1, 1] |
| 1,0 | [0, 0] |

Bukan nol. Aritmetika selang tidak tahu bahwa kedua "sekitar 5" adalah **besaran yang sama** — ia menganggapnya dua besaran tak pasti yang terpisah, yang bisa saja satu 4 dan yang lain 6. Masalah yang sama muncul di aritmetika selang biasa, dan disebut **masalah ketergantungan**. Jalan keluarnya: sederhanakan rumus lebih dulu, sehingga setiap besaran tak pasti muncul sekali.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "HEDGE = [\n    ('panas',              lambda m: m),\n    ('sangat panas',       lambda m: m ** 2),        # konsentrasi\n    ('agak panas',         lambda m: m ** 0.5),      # dilasi\n    ('tidak panas',        lambda m: 1 - m),\n    ('sangat tidak panas', lambda m: (1 - m) ** 2),\n]\n\n# di 34 C, panas = 0.5:\n#   sangat panas  0.25\n#   agak panas    0.71\n#   tidak panas   0.50",
      penjelasan: `Lima baris yang mengubah satu himpunan menjadi lima — dan kenapa operasi yang dipilih adalah pangkat.

**Hedge adalah fungsi dari derajat, bukan dari suhu.**

Perhatikan bahwa setiap \`lambda\` menerima derajat m, bukan suhu t. Hedge tidak peduli apa semestanya — suhu, kecepatan, nilai ujian. Ia cuma mengubah seberapa benar sesuatu.

Itu yang membuat hedge begitu hemat. "Sangat" yang sama bisa dipakai untuk "sangat panas", "sangat cepat", "sangat mahal" — tanpa satu pun fungsi keanggotaan baru.

**Kenapa pangkat.**

Hedge yang baik harus memenuhi beberapa syarat yang masuk akal:

- Derajat 0 tetap 0 dan derajat 1 tetap 1. "Sangat panas" tidak boleh membuat suhu yang sama sekali tidak panas menjadi sedikit panas.
- Urutan tidak berubah. Kalau 36 °C lebih panas dari 34 °C, ia juga lebih "sangat panas".
- "Sangat" menurunkan derajat di antara 0 dan 1; "agak" menaikkannya.

Fungsi pangkat mᵖ memenuhi semuanya, untuk p > 1 (menurunkan) dan p < 1 (menaikkan). Pangkat 2 dan ½ adalah pilihan Zadeh yang paling sederhana.

**Kenapa "sangat" menyempitkan, bukan menggeser.**

Bayangkan grafik "panas" dan "sangat panas". Titik di mana keduanya mulai naik sama — 30 °C. Titik di mana keduanya mencapai 1 sama — 38 °C. Yang berubah adalah **bentuk** di antaranya: "sangat panas" naik lebih lambat di awal, lalu mengejar di akhir.

Jadi "sangat panas" tidak berarti "panas yang digeser ke suhu lebih tinggi". Ia berarti "panas, dengan standar yang lebih ketat" — suhu yang cuma setengah panas hanya seperempat "sangat panas".

**Kenapa "tidak" berbeda.**

\`1 - m\` membalik derajat, dan 0 menjadi 1. "Tidak" adalah komplemen dari topik operator fuzzy, bukan hedge dalam arti penekanan — tetapi karena juga fungsi dari derajat, ia bisa digabung dengan hedge lain. "Sangat tidak panas" menerapkan "tidak" dulu, lalu "sangat": (1 − m)².

Urutan itu penting. "Tidak sangat panas" — 1 − m² — berbeda: di 34 °C, "sangat tidak panas" 0,25 sedangkan "tidak sangat panas" 0,75.`
    },
    {
      bahasa: 'python',
      kode: "def segitiga(a, b, c):\n    # alfa-cut bilangan fuzzy segitiga (a, b, c)\n    return lambda alfa: (a + alfa * (b - a), c - alfa * (c - b))\n\nA = segitiga(4, 5, 6)      # sekitar 5 hari\nB = segitiga(2, 3, 4)      # sekitar 3 hari\n\na1, a2 = A(0.5); b1, b2 = B(0.5)\n(a1 + b1, a2 + b2)                    # A + B: (7, 9)\nhasil = [a1*b1, a1*b2, a2*b1, a2*b2]\n(min(hasil), max(hasil))              # A x B: (11.25, 19.25)\n(a1 - a2, a2 - a1)                    # A - A: (-1, 1), bukan 0",
      penjelasan: `Bilangan fuzzy ditulis sebagai fungsi dari α ke selang — dan setiap operasi aritmetika menjadi operasi pada selang biasa.

**Bilangan fuzzy sebagai fungsi.**

\`segitiga(4, 5, 6)\` tidak menyimpan fungsi keanggotaan. Ia menyimpan **cara menghitung α-cut**: diberi α, kembalikan selang [4 + α, 6 − α]. Di α = 0, selang terlebar [4, 6]. Di α = 1, satu titik [5, 5].

Menurut teorema dekomposisi, ini informasi yang sama persis dengan fungsi keanggotaan — hanya ditulis dari arah lain. Dan arah ini jauh lebih mudah untuk berhitung.

**Penjumlahan selang.**

Kalau x di [4,5; 5,5] dan y di [2,5; 3,5], maka x + y paling kecil 4,5 + 2,5 = 7 dan paling besar 5,5 + 3,5 = 9. Ujung bawah dijumlah, ujung atas dijumlah.

Lakukan itu di setiap α, dan hasilnya segitiga (6, 8, 10). Penjumlahan bilangan segitiga selalu segitiga, dengan setiap parameternya dijumlahkan.

**Perkalian selang: kenapa empat hasil kali.**

Untuk selang yang semuanya positif, hasil kali terkecil adalah ujung bawah dikali ujung bawah. Tetapi kalau ada selang yang memuat bilangan negatif, bukan lagi — negatif dikali negatif bisa menjadi yang terbesar. Menghitung keempat hasil kali ujung, lalu mengambil min dan max-nya, benar untuk selang apa pun.

**Kenapa hasil kali tidak segitiga.**

Ujung bawah hasil kali adalah (4 + α)(2 + α) = 8 + 6α + α². Ada α² — fungsi kuadrat dari α, bukan garis lurus. Sisi segitiga adalah garis lurus; sisi hasil kali melengkung.

Di praktik, hasil kali sering **didekati** dengan segitiga (8, 15, 24) supaya mudah disimpan. Itu pendekatan, dan di α = 0,5 ia meleset 0,25 di setiap ujung.

**A − A bukan nol.**

Pengurangan selang: [a₁ − a₂, a₂ − a₁]. Rumus ini benar untuk dua besaran **terpisah** yang masing-masing di [4,5; 5,5] — selisih terkecilnya memang 4,5 − 5,5 = −1.

Tetapi kalau keduanya adalah besaran yang **sama**, selisihnya pasti nol. Aritmetika selang tidak menyimpan informasi "ini besaran yang sama", sehingga ia melebih-lebihkan ketidakpastian.

Dalam rumus sungguhan, masalah ini muncul diam-diam: misalnya waktu_selesai − waktu_mulai, keduanya dihitung dari durasi yang sama. Jalan keluarnya: sederhanakan rumus secara aljabar lebih dulu, sehingga setiap besaran tak pasti muncul sekali, baru hitung dengan α-cut.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Variabel linguistik, hedge, alfa-cut, bilangan fuzzy
# ============================================

def panas(t):
    """Naik lurus dari 30 C (derajat 0) sampai 38 C (derajat 1)."""
    if t <= 30:
        return 0.0
    if t >= 38:
        return 1.0
    return (t - 30) / 8

# --------------------------------------------
# 1. Hedge: 'sangat', 'agak', 'tidak'
# --------------------------------------------
HEDGE = [
    ("panas", lambda m: m),
    ("sangat panas", lambda m: m ** 2),          # konsentrasi
    ("agak panas", lambda m: m ** 0.5),          # dilasi
    ("tidak panas", lambda m: 1 - m),
    ("sangat tidak panas", lambda m: (1 - m) ** 2),
]
SUHU = [30, 32, 34, 36, 38]
print("--- variabel 'suhu ruang server' dengan hedge ---")
print("  " + format("istilah", "<20") + "".join(format(str(t) + " C", ">8") for t in SUHU))
for nama, f in HEDGE:
    print("  " + format(nama, "<20") + "".join(format(f(panas(t)), ">8.2f") for t in SUHU))
print()
print("  'sangat' mengkuadratkan: 0.5 menjadi 0.25 -- makin ketat.")
print("  'agak' mengakarkan: 0.5 menjadi 0.71 -- makin longgar.")
print("  Nilai 0 dan 1 tidak berubah oleh keduanya.")
print("  Aturan 'JIKA suhu SANGAT panas' kini bisa ditulis tanpa")
print("  membuat himpunan baru -- cukup satu operasi pada 'panas'.")

# --------------------------------------------
# 2. Alfa-cut: dari himpunan fuzzy ke selang biasa
# --------------------------------------------
def potong(f, alfa, lo=20, hi=60, langkah=0.01):
    """Selang {x : f(x) >= alfa}, dicari dengan menyisir."""
    xs = [lo + i * langkah for i in range(int((hi - lo) / langkah) + 1)]
    masuk = [x for x in xs if f(x) >= alfa - 1e-12]
    return (round(min(masuk), 2), round(max(masuk), 2)) if masuk else None

print("\n--- alfa-cut 'panas' ---")
for a in [0.25, 0.5, 0.75, 1.0]:
    print("  alfa = " + format(a, "<5") + "-> suhu " + str(potong(panas, a)))
sangat = lambda t: panas(t) ** 2
print("  alfa = 0.5 untuk 'sangat panas' -> suhu " + str(potong(sangat, 0.5)))
print()
print("  Alfa-cut adalah jembatan ke logika biasa: 'panas dengan")
print("  keyakinan minimal 0,5' berarti suhu 34 ke atas -- sebuah")
print("  syarat if yang bisa ditulis di kode mana pun.")

print("\n  menyusun ulang 'panas' dari tumpukan alfa-cut:")
for n in [4, 10, 100]:
    cut = [(k / n, potong(panas, k / n)) for k in range(1, n + 1)]
    def dari_cut(t):
        return max([a for a, (lo, hi) in cut if lo <= t <= hi], default=0.0)
    galat = max(abs(dari_cut(t / 10) - panas(t / 10)) for t in range(300, 400))
    print("  " + format(n, ">4") + " tingkat alfa -> galat terbesar " + format(galat, ".3f"))
print("  Himpunan fuzzy = tumpukan selang biasa, satu untuk setiap alfa.")

# --------------------------------------------
# 3. Bilangan fuzzy dan aritmetikanya lewat alfa-cut
# --------------------------------------------
def segitiga(a, b, c):
    """Alfa-cut bilangan fuzzy segitiga (a, b, c): [a + alfa(b-a), c - alfa(c-b)]"""
    return lambda alfa: (a + alfa * (b - a), c - alfa * (c - b))

A = segitiga(4, 5, 6)      # "sekitar 5 hari"
B = segitiga(2, 3, 4)      # "sekitar 3 hari"
print("\n--- 'sekitar 5 hari' + 'sekitar 3 hari' ---")
print("  alfa    A              B              A + B          A x B")
for alfa in [0.0, 0.5, 1.0]:
    a1, a2 = A(alfa)
    b1, b2 = B(alfa)
    tambah = (a1 + b1, a2 + b2)
    hasil_kali = [a1 * b1, a1 * b2, a2 * b1, a2 * b2]
    kali = (min(hasil_kali), max(hasil_kali))
    f = lambda s: "[" + format(s[0], "g") + ", " + format(s[1], "g") + "]"
    print("  " + format(alfa, "<7") + format(f((a1, a2)), "<15") + format(f((b1, b2)), "<15")
          + format(f(tambah), "<15") + f(kali))
print()
print("  A + B = segitiga (6, 8, 10): 'sekitar 8 hari', dan KETIDAK-")
print("  PASTIANNYA ikut bertambah -- lebar 2 + 2 = 4.")
print("  A x B di alfa 0,5 = [11.25, 19.25], padahal garis lurus dari")
print("  [8, 24] ke [15, 15] memberi [11.5, 19.5]. Hasil kali dua")
print("  bilangan segitiga BUKAN segitiga lagi -- sisinya melengkung.")

print("\n--- 'sekitar 5' - 'sekitar 5' ---")
for alfa in [0.0, 0.5, 1.0]:
    a1, a2 = A(alfa)
    print("  alfa " + format(alfa, "<4") + ": [" + format(a1 - a2, "g") + ", " + format(a2 - a1, "g") + "]")
print("  Bukan nol. Aritmetika alfa-cut tidak tahu kedua 'sekitar 5'")
print("  itu bilangan yang SAMA -- ia memperlakukannya sebagai dua")
print("  besaran tak pasti yang terpisah.")` },
  output: `--- variabel 'suhu ruang server' dengan hedge ---
  istilah                 30 C    32 C    34 C    36 C    38 C
  panas                   0.00    0.25    0.50    0.75    1.00
  sangat panas            0.00    0.06    0.25    0.56    1.00
  agak panas              0.00    0.50    0.71    0.87    1.00
  tidak panas             1.00    0.75    0.50    0.25    0.00
  sangat tidak panas      1.00    0.56    0.25    0.06    0.00

  'sangat' mengkuadratkan: 0.5 menjadi 0.25 -- makin ketat.
  'agak' mengakarkan: 0.5 menjadi 0.71 -- makin longgar.
  Nilai 0 dan 1 tidak berubah oleh keduanya.
  Aturan 'JIKA suhu SANGAT panas' kini bisa ditulis tanpa
  membuat himpunan baru -- cukup satu operasi pada 'panas'.

--- alfa-cut 'panas' ---
  alfa = 0.25 -> suhu (32.0, 60.0)
  alfa = 0.5  -> suhu (34.0, 60.0)
  alfa = 0.75 -> suhu (36.0, 60.0)
  alfa = 1.0  -> suhu (38.0, 60.0)
  alfa = 0.5 untuk 'sangat panas' -> suhu (35.66, 60.0)

  Alfa-cut adalah jembatan ke logika biasa: 'panas dengan
  keyakinan minimal 0,5' berarti suhu 34 ke atas -- sebuah
  syarat if yang bisa ditulis di kode mana pun.

  menyusun ulang 'panas' dari tumpukan alfa-cut:
     4 tingkat alfa -> galat terbesar 0.237
    10 tingkat alfa -> galat terbesar 0.088
   100 tingkat alfa -> galat terbesar 0.008
  Himpunan fuzzy = tumpukan selang biasa, satu untuk setiap alfa.

--- 'sekitar 5 hari' + 'sekitar 3 hari' ---
  alfa    A              B              A + B          A x B
  0.0    [4, 6]         [2, 4]         [6, 10]        [8, 24]
  0.5    [4.5, 5.5]     [2.5, 3.5]     [7, 9]         [11.25, 19.25]
  1.0    [5, 5]         [3, 3]         [8, 8]         [15, 15]

  A + B = segitiga (6, 8, 10): 'sekitar 8 hari', dan KETIDAK-
  PASTIANNYA ikut bertambah -- lebar 2 + 2 = 4.
  A x B di alfa 0,5 = [11.25, 19.25], padahal garis lurus dari
  [8, 24] ke [15, 15] memberi [11.5, 19.5]. Hasil kali dua
  bilangan segitiga BUKAN segitiga lagi -- sisinya melengkung.

--- 'sekitar 5' - 'sekitar 5' ---
  alfa 0.0 : [-2, 2]
  alfa 0.5 : [-1, 1]
  alfa 1.0 : [0, 0]
  Bukan nol. Aritmetika alfa-cut tidak tahu kedua 'sekitar 5'
  itu bilangan yang SAMA -- ia memperlakukannya sebagai dua
  besaran tak pasti yang terpisah.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Menerapkan hedge pada satu derajat', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'α-cut dengan menyisir semesta, langkah h', waktu: 'O(lebar/h)', memori: 'O(1) kalau cuma ujungnya disimpan' },
      { operasi: 'α-cut bilangan segitiga', waktu: 'O(1)', memori: 'rumus tertutup' },
      { operasi: 'Operasi dua bilangan fuzzy di L tingkat α', waktu: 'O(L)', memori: 'O(L) selang hasil' },
      { operasi: 'Menyusun ulang himpunan dari L tingkat α', waktu: 'O(L) per titik', memori: 'galat sekitar 1/L' }
    ],
    intuisi: `Hedge hampir gratis — satu pangkat per derajat. Yang mahal di topik ini adalah α-cut untuk himpunan yang bentuknya sembarang, karena harus menyisir semesta. Untuk bilangan segitiga dan trapesium, α-cut punya rumus tertutup, dan semuanya menjadi O(1) per tingkat α.

Baris terakhir adalah pertukaran utama aritmetika fuzzy: lebih banyak tingkat α memberi hasil yang lebih tepat, dengan galat yang turun kira-kira seperti 1/L — program menunjukkan 0,237, 0,088, dan 0,008 untuk 4, 10, dan 100 tingkat. Untuk sebagian besar keperluan, 10 sampai 20 tingkat sudah cukup.`
  },

  kesalahanUmum: [
    {
      salah: 'Membuat himpunan baru dengan tangan untuk "sangat panas" dengan menggeser "panas" ke kanan.',
      kenapa: 'Menggeser mengubah titik di mana derajat mulai naik dan mencapai 1, sehingga suhu yang sepenuhnya panas bisa menjadi tidak sepenuhnya sangat panas, atau sebaliknya. Itu bukan arti "sangat".',
      benar: 'Pakai hedge μ² yang mempertahankan derajat 0 dan 1 dan hanya mengetatkan bagian di antaranya.'
    },
    {
      salah: 'Menganggap "tidak sangat panas" sama dengan "sangat tidak panas".',
      kenapa: 'Yang pertama 1 − μ², yang kedua (1 − μ)². Di 34 °C, hasilnya 0,75 dan 0,25.',
      benar: 'Terapkan hedge dari yang paling dekat ke himpunan dasar, dan tulis urutannya dengan jelas.'
    },
    {
      salah: 'Menjumlahkan bilangan fuzzy dengan menjumlahkan derajat keanggotaannya.',
      kenapa: 'Derajat bukan besarannya. Menjumlahkan derajat bisa menghasilkan nilai di atas 1 dan tidak berarti apa pun tentang "sekitar 5 + sekitar 3".',
      benar: 'Jumlahkan α-cut-nya: di setiap tingkat α, jumlahkan ujung bawah dengan ujung bawah dan ujung atas dengan ujung atas.'
    },
    {
      salah: 'Menganggap hasil kali dua bilangan segitiga tetap segitiga.',
      kenapa: 'Ujung selang hasil kali adalah fungsi kuadrat dari α, sehingga sisinya melengkung. Di α = 0,5 hasil sebenarnya [11,25; 19,25], bukan [11,5; 19,5].',
      benar: 'Hitung α-cut hasil kali di beberapa tingkat, atau sebut dengan jelas bahwa segitiga hanyalah pendekatan.'
    },
    {
      salah: 'Menghitung rumus yang memuat besaran tak pasti yang sama lebih dari sekali dengan aritmetika α-cut apa adanya.',
      kenapa: 'Aritmetika selang menganggap setiap kemunculan sebagai besaran terpisah, sehingga ketidakpastian dilebih-lebihkan. "Sekitar 5" dikurangi dirinya sendiri memberi [−2, 2], bukan 0.',
      benar: 'Sederhanakan rumus secara aljabar lebih dulu supaya setiap besaran tak pasti muncul sekali.'
    }
  ],

  analogi: `Bayangkan kamu menanyakan **kopi** kepada teman-teman.

**Hedge.** "Kopinya panas?" — "Iya, lumayan." "Sangat panas?" — "Hmm, belum sampai sangat."

Untuk teman itu, kopinya panas dengan derajat, katakanlah, 0,7. "Sangat panas" menuntut lebih: 0,7 dikuadratkan menjadi 0,49 — belum meyakinkan. Kata "sangat" tidak memindahkan batas "panas"; ia menaikkan standarnya. Kopi yang benar-benar mendidih tetap sepenuhnya "sangat panas", dan kopi dingin tetap sama sekali tidak.

**α-cut.** Barista punya aturan: "sajikan kopi hanya kalau panasnya meyakinkan — minimal 0,5." Aturan fuzzy itu diubah menjadi aturan termometer: sajikan kalau suhunya minimal 70 °C. Barista tidak perlu tahu apa-apa soal derajat keanggotaan; ia cuma perlu termometer dan satu angka.

**Tumpukan α-cut.** Sekarang barista punya beberapa aturan: "panas meyakinkan 0,25: minimal 60 °C", "0,5: minimal 70 °C", "0,75: minimal 80 °C". Dari tumpukan aturan tegas itu, kamu bisa menyusun kembali seberapa "panas" setiap suhu. Makin banyak aturan, makin halus hasilnya.

**Bilangan fuzzy.** Kamu bertanya berapa lama menyeduh dan menyajikan. "Menyeduh sekitar 5 menit, mengantar sekitar 3 menit." Totalnya sekitar 8 menit — tetapi kamu tidak bisa lebih yakin tentang totalnya daripada tentang bagian-bagiannya. Kalau masing-masing bisa meleset satu menit, totalnya bisa meleset dua.

**A − A.** Kamu bertanya, "berapa selisih waktu menyeduh kopi ini dengan waktu menyeduh kopi ini?" Jawabannya jelas nol — itu kopi yang sama. Tetapi kalau kamu menghitungnya dengan "sekitar 5 dikurangi sekitar 5", seolah-olah dua kopi berbeda, kamu mendapat "antara −2 dan 2 menit". Rumusmu lupa bahwa kedua "sekitar 5" itu satu kopi.`,

  latihan: [
    'Hitung derajat "sangat sangat panas" (μ⁴) dan "agak sangat panas" untuk 32, 34, dan 36 °C.',
    'Tunjukkan dengan angka bahwa "tidak sangat panas" dan "sangat tidak panas" berbeda di 32 °C.',
    'Hitung α-cut "agak panas" di α = 0,5 dengan rumus, lalu periksa dengan fungsi potong di program.',
    'Tulis aturan "nyalakan alarm kalau suhu sangat panas dengan keyakinan minimal 0,8" sebagai satu syarat if.',
    'Susun ulang himpunan "panas" dari 20 tingkat α dan catat galat terbesarnya.',
    'Hitung (4, 5, 6) + (2, 3, 4) + (1, 2, 3) lewat α-cut, lalu tentukan lebar ketidakpastian totalnya.',
    'Hitung α-cut (4, 5, 6) × (2, 3, 4) di α = 0,25 dan 0,75, lalu tunjukkan bahwa hasilnya tidak segaris dengan α = 0 dan α = 1.',
    'Hitung (−1, 0, 1) × (2, 3, 4) lewat α-cut, dan jelaskan kenapa keempat hasil kali ujung harus diperiksa.',
    'Hitung A + A dan 2 × A untuk A = (4, 5, 6) lewat α-cut, lalu bandingkan hasilnya.',
    'Rencanakan tiga tugas proyek kelompokmu dengan durasi fuzzy segitiga, lalu hitung durasi totalnya dan jelaskan ketidakpastiannya.'
  ]
});
