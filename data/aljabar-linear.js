/* ============================================================
   aljabar-linear.js — materi Aljabar Linear (Semester 3)

   Materi kuliahnya tidak tersimpan; yang ada di
   "Semester Tiga/Aljabar Linear" hanya satu proyek kelompok:
     "Penentuan Kombinasi Paket Makanan dengan Kalori Seimbang
      Bagi Mahasiswa Menggunakan Metode Invers Matriks"
     (projek kelompok, lima orang)

   Kasus proyek itu dipakai utuh sebagai contoh di topik SPL,
   berikut angkanya, dan diperiksa ulang dengan kode. Sisanya
   disusun dari pengetahuan umum aljabar linear, dipilih yang
   benar-benar terpakai di Informatika.
   ============================================================ */

TOPICS.push({
  id: 'alin-vektor-matriks',
  judul: 'Vektor & Matriks',
  kategori: 'aljabar-linear',
  tag: ['vektor', 'matriks', 'dot product', 'kemiripan kosinus', 'transformasi', 'determinan'],
  ringkas: 'Kenapa perkalian matriks aturannya aneh — dan kenapa aturan itu justru satu-satunya yang masuk akal.',

  fungsi: `**Mengubah benda apa pun menjadi angka, lalu membandingkannya dengan hitungan.**

Terpakai di:

- **Sistem rekomendasi** dan **mesin pencari** — kemiripan kosinus
- **Grafika komputer** — setiap putaran, skala, dan geseran adalah matriks
- **Pembelajaran mesin** — data selalu berbentuk matriks
- **Pengolahan citra** — penapis konvolusi juga matriks
- **Data Mining** — jarak dan kemiripan antar objek

Yang paling mengubah cara pandang: **matriks bukan tabel angka, melainkan sebuah tindakan.**

Begitu itu terpasang, aturan perkalian yang tadinya terasa sembarangan menjadi satu-satunya yang masuk akal — dan \`A x B\` tidak sama dengan \`B x A\` berhenti terasa seperti kekurangan.

Dan satu kaidah praktis yang menghemat: **pakai kemiripan kosinus, bukan jarak**, untuk membandingkan dokumen atau pengguna yang ukurannya berbeda-beda.`,

  praktik: {
    tujuan: `Kamu bisa membaca matriks sebagai tindakan, dan mengukur kemiripan dua data dengan kode sendiri.`,
    alat: [
      'Python 3',
      'Kertas kotak-kotak untuk menggambar',
      'matplotlib (opsional)'
    ],
    langkah: [
      { judul: 'Gambar dulu, jangan langsung menghitung',
        isi: `Ambil kertas kotak-kotak, gambar bujur sangkar satuan dengan titik \`(1,0)\` dan \`(0,1)\`.

Untuk tiap matriks yang kamu pelajari, gambar ke mana kedua titik itu pindah. Bentuk barunya langsung terlihat.

Ini lima menit yang menghemat berjam-jam kebingungan.` },
      { judul: 'Baca matriks lewat kolomnya',
        isi: `Kolom pertama = tempat baru \`(1,0)\`. Kolom kedua = tempat baru \`(0,1)\`.

Latih dengan lima matriks: perbesar, geser miring, putar, cermin, dan identitas. Tebak tindakannya dari kolomnya sebelum menghitung apa pun.` },
      { judul: 'Turunkan sendiri aturan perkaliannya',
        isi: `Jangan menghafal. Tanyakan: *"kalau saya putar dulu lalu perbesar, ke mana \`(1,0)\` berakhir?"*

Jawabnya: ambil kolom pertama matriks putar, lalu kenakan matriks perbesar padanya.

Susun kedua kolom hasilnya — itulah perkalian matriks. Kamu baru saja menurunkannya sendiri.` },
      { judul: 'Buktikan urutannya berpengaruh',
        isi: `Hitung \`A x B\` dan \`B x A\` untuk matriks geser dan cermin.

Hasilnya berbeda. Lalu gambar keduanya di kertas dan lihat kenapa: menggeser lalu mencerminkan memang menghasilkan bentuk lain.` },
      { judul: 'Tulis fungsi hasil kali titik dan sudut',
        isi: `Buat \`titik(a,b)\` dan \`sudut(a,b)\` sendiri, jangan pakai pustaka.

Uji dengan empat pasang: searah, menyerong, tegak lurus, berlawanan. Perhatikan nol berarti tegak lurus.` },
      { judul: 'Bandingkan tiga dokumen dengan kemiripan kosinus',
        isi: `Ambil tiga teks pendek, hitung jumlah tiap kata, jadikan vektor, lalu hitung kosinusnya.

Bandingkan dengan jarak Euclid. Perpanjang salah satu dokumen dua kali lipat dan jalankan lagi — kosinusnya tetap, jaraknya berubah jauh.

Di situlah alasan memilih kosinus terlihat sendiri.` },
      { judul: 'Hitung determinan lima matriks lalu tafsirkan',
        isi: `Untuk tiap matriks, hitung \`ad - bc\` lalu jawab: luasnya jadi berapa kali, dan apakah orientasinya terbalik?

Cari satu yang determinannya nol, lalu gambar apa yang terjadi pada bujur sangkar satuannya.` },
      { judul: 'Buktikan invers membatalkan',
        isi: `Tulis matriks putar 45 derajat dan matriks putar −45 derajat, lalu kalikan.

Hasilnya identitas. Sekarang coba cari invers untuk matriks berdeterminan nol — dan lihat sendiri kenapa tidak ada.` }
    ],
    cek: [
      'Kamu bisa menebak tindakan sebuah matriks hanya dengan melihat kolomnya',
      'Kamu menurunkan sendiri aturan perkalian, bukan menghafalnya',
      'Kemiripan kosinusmu tidak berubah saat dokumennya diperpanjang dua kali'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa baris dikali kolom',

  konsep: `
Aljabar linear terasa seperti aturan hafalan sampai satu gagasan dipahami: **matriks bukan tabel angka, melainkan sebuah TINDAKAN**.

Begitu itu terpasang, hampir semua aturannya menjadi masuk akal — termasuk aturan perkalian yang paling sering dianggap sembarangan.

**Vektor**

Vektor adalah **daftar angka berurutan**. Yang menentukan artinya adalah konteks:

- **titik** di ruang — \`(3, 4)\`
- **perpindahan** — 3 ke kanan, 4 ke atas
- **ciri sebuah data** — 3 kali beli, nilai 4
- **satu baris** basis data

Bagi orang Informatika, tafsiran ketiga yang paling sering terpakai. Satu dokumen, satu pengguna, satu gambar — semuanya bisa dijadikan vektor, dan sejak saat itu bisa **dihitung**.

Panjangnya: \`|v| = akar(x^2 + y^2 + ...)\`

**Hasil kali titik**

\`a . b = a1*b1 + a2*b2 + ...\`

Angka tunggal ini mengukur **seberapa searah** kedua vektor:

- **positif** — arahnya mirip
- **nol** — **tegak lurus**, tidak berhubungan sama sekali
- **negatif** — berlawanan

Dan hubungannya dengan sudut: \`a . b = |a| |b| cos(sudut)\`

**Kemiripan kosinus**

Dari rumus di atas, sudutnya bisa dibalik: \`cos(sudut) = (a . b) / (|a| |b|)\`

Inilah yang dipakai mesin pencari dan sistem rekomendasi. Dokumen diubah menjadi vektor jumlah kata, lalu kemiripannya diukur dari **sudut**, bukan dari jarak.

Kenapa sudut dan bukan jarak? Karena dokumen panjang punya angka besar di semua kata. Jarak akan bilang dokumen panjang berbeda dari dokumen pendek meski isinya sama. **Sudut mengabaikan panjangnya** dan hanya melihat perbandingannya.

**Matriks sebagai tindakan**

Matriks \`2x2\` mengubah setiap titik di bidang menjadi titik lain. Contoh yang perlu dikenali:

| Matriks | Tindakan |
|---|---|
| \`[[2,0],[0,2]]\` | perbesar dua kali |
| \`[[1,3],[0,1]]\` | geser miring |
| \`[[0,-1],[1,0]]\` | putar 90 derajat |
| \`[[1,0],[0,-1]]\` | cermin sumbu x |
| \`[[1,0],[0,1]]\` | tidak melakukan apa-apa — **identitas** |

Cara cepat membacanya: **kolom pertama** adalah ke mana \`(1,0)\` dipindahkan, **kolom kedua** ke mana \`(0,1)\` dipindahkan.

**Perkalian matriks adalah perangkaian**

\`A x B\` berarti *"kerjakan B dulu, lalu A"*.

Aturan baris-dikali-kolom **dibuat supaya itu berlaku**. Ia bukan kesepakatan sembarangan — ia satu-satunya aturan yang membuat perkalian matriks sama artinya dengan merangkai dua tindakan.

Dan dari sini langsung terlihat kenapa **\`A x B\` tidak sama dengan \`B x A\`**: urutan tindakan berpengaruh. Memutar lalu menggeser berbeda dari menggeser lalu memutar.

Perhatikan juga arah bacanya: \`A x B\` dikerjakan **dari kanan**. Ini terasa terbalik sampai kamu ingat bahwa \`A(B(v))\` juga dikerjakan dari dalam ke luar.

**Transpose**

\`A^T\` menukar baris dan kolom. Terpakai di mana-mana: \`a . b\` bisa ditulis \`a^T b\`, dan matriks yang \`A = A^T\` disebut **simetris** — sifat yang punya akibat besar pada eigenvector.

**Determinan**

Untuk matriks \`2x2\`: \`det = ad - bc\`

Artinya: **faktor perubahan luas**.

- \`det = 6\` → luas jadi enam kali
- \`det = 1\` → luas **tidak berubah** meski bentuknya berubah
- \`det = 0\` → seluruh bidang **dimampatkan menjadi garis**

Yang terakhir yang paling penting. Determinan nol berarti tindakannya **membuang keterangan**, dan itu tidak bisa dibatalkan — karena itu matriks dengan determinan nol **tidak punya invers**.

Determinan negatif berarti orientasinya terbalik, seperti pada pencerminan.

**Invers**

\`A^-1\` adalah tindakan yang **membatalkan** A: \`A^-1 A = I\`.

Memutar 45 derajat dibatalkan dengan memutar −45 derajat. Memperbesar dua kali dibatalkan dengan memperkecil setengah.

Memampatkan bidang menjadi garis **tidak bisa dibatalkan** — informasi tentang di mana titik itu dulu berada sudah hilang. Itulah arti \`det = 0\` secara geometris.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA A x B ARTINYA "B DULU, LALU A"\n#\n# Matriks memindahkan (1,0) ke kolom pertamanya,\n# dan (0,1) ke kolom keduanya.\n#\n# PUTAR = [[cos45, -sin45],\n#          [sin45,  cos45]]\n# SKALA = [[2, 0],\n#          [0, 2]]\n#\n# Dua langkah  : (1,0) -> (0.7071, 0.7071) -> (1.4142, 1.4142)\n# Satu matriks : SKALA x PUTAR -> (1.4142, 1.4142)\n#\n# Sama persis. Aturan baris-kali-kolom DIBUAT supaya\n# ini berlaku -- bukan sebaliknya.',
      penjelasan: `
Aturan perkalian matriks hampir selalu diajarkan sebagai prosedur: *"ambil baris pertama A, kalikan dengan kolom pertama B, jumlahkan"*. Diikuti dengan patuh, dihafal untuk ujian, dan tidak pernah terasa masuk akal.

Ia menjadi masuk akal begitu satu pertanyaan diajukan: **aturan itu untuk apa?**

Mulai dari cara membaca matriks yang membuat semuanya lebih mudah. Matriks \`2x2\` ditentukan sepenuhnya oleh **ke mana ia memindahkan dua vektor satuan**:

- **kolom pertama** adalah tempat baru \`(1,0)\`
- **kolom kedua** adalah tempat baru \`(0,1)\`

Sebabnya bisa dilihat langsung: mengalikan matriks dengan \`(1,0)\` menghasilkan kolom pertamanya, dan dengan \`(0,1)\` menghasilkan kolom keduanya.

Dan karena setiap vektor bisa ditulis sebagai gabungan keduanya — \`(3,4) = 3(1,0) + 4(0,1)\` — maka mengetahui ke mana dua vektor satuan itu pergi **sudah cukup** untuk mengetahui ke mana semua titik pergi.

Sekarang pertanyaan yang melahirkan aturan perkaliannya.

Kamu punya dua tindakan: putar 45 derajat, lalu perbesar dua kali. Kamu ingin **satu matriks** yang melakukan keduanya sekaligus — supaya tidak perlu dua kali kerja untuk sejuta titik.

Matriks gabungan itu, seperti matriks lainnya, ditentukan oleh ke mana ia memindahkan \`(1,0)\` dan \`(0,1)\`.

Ke mana \`(1,0)\` pergi? Ia diputar dulu, lalu diperbesar. Artinya: ambil kolom pertama PUTAR, lalu kenakan SKALA padanya.

Dan "kenakan SKALA pada sebuah vektor" adalah **tepat operasi baris-dikali-kolom itu**.

Jadi kolom pertama matriks gabungan = SKALA dikenakan pada kolom pertama PUTAR. Kolom kedua = SKALA dikenakan pada kolom kedua PUTAR.

Susun keduanya, dan yang kamu dapat **persis aturan perkalian matriks**.

Aturannya tidak dirancang untuk menyulitkan. Ia adalah **satu-satunya aturan** yang membuat \`A x B\` berarti "rangkai kedua tindakan itu".

Dari sini dua hal yang tadinya aneh menjadi wajar.

**Pertama, kenapa dibaca dari kanan.** \`A x B\` mengerjakan B dulu. Ini terasa terbalik sampai kamu menuliskannya sebagai \`A(B(v))\` — dan fungsi memang selalu dikerjakan dari dalam ke luar. Notasi matriksnya cuma mengikuti notasi fungsi.

**Kedua, kenapa urutan berpengaruh.** \`A x B\` jarang sama dengan \`B x A\`, dan itu **bukan kekurangan**. Menggeser lalu mencerminkan memang menghasilkan bentuk yang berbeda dari mencerminkan lalu menggeser. Kalau perkalian matriks bisa ditukar bebas, ia justru **tidak akan bisa** mewakili rangkaian tindakan.

Dan satu hal yang mengikuti: syarat "jumlah kolom A harus sama dengan jumlah baris B" juga berhenti terasa sewenang-wenang. A menerima masukan berdimensi sekian; B menghasilkan keluaran berdimensi sekian. Kalau tidak cocok, rangkaiannya **memang tidak masuk akal** — bukan sekadar tidak diizinkan.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Vektor & matriks: kenapa aturannya begitu
# ============================================
import math

# --------------------------------------------
# 1. Vektor adalah daftar angka yang punya arti
# --------------------------------------------
print("--- satu vektor, banyak tafsiran ---")
v = [3, 4]
print("  v = " + str(v))
TAFSIR = [
    ("titik di bidang",   "x=3, y=4"),
    ("perpindahan",       "3 ke kanan, 4 ke atas"),
    ("ciri sebuah data",  "3 kali beli, nilai 4"),
    ("baris basis data",  "kolom1=3, kolom2=4"),
]
for nama, arti in TAFSIR:
    print("  " + nama.ljust(20) + arti)
print("")
print("  panjang |v| = akar(3^2 + 4^2) = "
      + str(math.hypot(3, 4)))

# --------------------------------------------
# 2. Hasil kali titik mengukur kemiripan arah
# --------------------------------------------
def titik(a, b):
    return sum(x * y for x, y in zip(a, b))

def panjang(a):
    return math.sqrt(titik(a, a))

def sudut(a, b):
    c = titik(a, b) / (panjang(a) * panjang(b))
    c = max(-1.0, min(1.0, c))
    return math.degrees(math.acos(c))

print("")
print("--- hasil kali titik dan sudut ---")
PASANG = [
    ([1, 0], [1, 0],  "arah sama"),
    ([1, 0], [1, 1],  "menyerong"),
    ([1, 0], [0, 1],  "tegak lurus"),
    ([1, 0], [-1, 0], "berlawanan"),
]
print("  " + "a".ljust(10) + "b".ljust(10) + "a.b".rjust(6)
      + "sudut".rjust(9) + "   arti")
for a, b, arti in PASANG:
    print("  " + str(a).ljust(10) + str(b).ljust(10)
          + ("%.0f" % titik(a, b)).rjust(6)
          + ("%.0f" % sudut(a, b)).rjust(8) + " " + arti)
print("")
print("  Nol berarti TEGAK LURUS. Inilah yang dipakai mesin")
print("  pencari dan sistem rekomendasi: dokumen diubah jadi")
print("  vektor, lalu kemiripannya diukur dengan sudut.")

# --------------------------------------------
# 3. Kemiripan kosinus pada dokumen
# --------------------------------------------
print("")
print("--- kemiripan kosinus antar dokumen ---")
KATA = ["algoritma", "matriks", "resep", "masak"]
DOK = {
    "Catatan Alpro":    [5, 1, 0, 0],
    "Catatan Aljabar":  [2, 6, 0, 0],
    "Buku Resep":       [0, 0, 7, 5],
}
def kosinus(a, b):
    return titik(a, b) / (panjang(a) * panjang(b))
nama = list(DOK)
print("  kata: " + ", ".join(KATA))
for i in range(len(nama)):
    for j in range(i + 1, len(nama)):
        k = kosinus(DOK[nama[i]], DOK[nama[j]])
        print("  " + nama[i].ljust(17) + "vs " + nama[j].ljust(17)
              + ("%.3f" % k))
print("")
print("  Kedua catatan kuliah punya kemiripan sebagian, dan")
print("  keduanya NOL terhadap buku resep -- tidak berbagi")
print("  satu kata pun. Tidak ada teks yang dibaca; yang")
print("  dibandingkan cuma sudut antar vektor.")

# --------------------------------------------
# 4. Kenapa perkalian matriks didefinisikan begitu
# --------------------------------------------
def kali(A, B):
    n, m, p = len(A), len(B), len(B[0])
    return [[sum(A[i][k] * B[k][j] for k in range(m))
             for j in range(p)] for i in range(n)]

def terap(M, v):
    return [sum(M[i][j] * v[j] for j in range(len(v)))
            for i in range(len(M))]

import math as _m
sudut45 = _m.radians(45)
PUTAR = [[round(_m.cos(sudut45), 10), round(-_m.sin(sudut45), 10)],
         [round(_m.sin(sudut45), 10), round(_m.cos(sudut45), 10)]]
SKALA = [[2, 0], [0, 2]]

titik_asal = [1, 0]
print("")
print("--- perkalian matriks = MERANGKAI transformasi ---")
langkah1 = terap(PUTAR, titik_asal)
langkah2 = terap(SKALA, langkah1)
print("  putar 45 lalu skala 2, dua langkah:")
print("    " + str(titik_asal) + " -> ["
      + ", ".join("%.4f" % x for x in langkah1) + "] -> ["
      + ", ".join("%.4f" % x for x in langkah2) + "]")

GABUNG = kali(SKALA, PUTAR)
sekali = terap(GABUNG, titik_asal)
print("  matriks gabungan (SKALA x PUTAR), satu langkah:")
print("    " + str(titik_asal) + " -> ["
      + ", ".join("%.4f" % x for x in sekali) + "]")
print("  sama? " + str(all(abs(a - b) < 1e-12
                           for a, b in zip(langkah2, sekali))))
print("")
print("  Inilah alasan aturannya baris-kali-kolom: ia dibuat")
print("  supaya A x B berarti 'kerjakan B dulu, lalu A'.")
print("  Aturan itu bukan kesepakatan sembarangan.")

# --------------------------------------------
# 5. Urutannya berpengaruh
# --------------------------------------------
print("")
print("--- A x B tidak sama dengan B x A ---")
GESER = [[1, 3], [0, 1]]     # geser miring
CERMIN = [[1, 0], [0, -1]]   # cermin sumbu x
AB = kali(GESER, CERMIN)
BA = kali(CERMIN, GESER)
print("  geser x cermin = " + str(AB))
print("  cermin x geser = " + str(BA))
print("  sama? " + str(AB == BA))
print("")
print("  Membalik urutan mengubah hasilnya. Karena matriks")
print("  mewakili tindakan, dan urutan tindakan berpengaruh:")
print("  memutar lalu menggeser tidak sama dengan menggeser")
print("  lalu memutar.")

# --------------------------------------------
# 6. Matriks identitas dan invers
# --------------------------------------------
print("")
print("--- identitas dan invers ---")
I = [[1, 0], [0, 1]]
print("  I x v = v  ->  " + str(terap(I, [7, -3])))
BALIK = [[round(_m.cos(-sudut45), 10), round(-_m.sin(-sudut45), 10)],
         [round(_m.sin(-sudut45), 10), round(_m.cos(-sudut45), 10)]]
hasil = kali(BALIK, PUTAR)
print("  putar 45 lalu putar -45 = ["
      + ", ".join("[" + ", ".join("%.0f" % v for v in r) + "]"
                  for r in hasil) + "]  = identitas")
print("")
print("  Invers adalah tindakan yang MEMBATALKAN. Tindakan")
print("  yang membuang keterangan tidak punya invers -- dan")
print("  di situlah determinan nol muncul: memampatkan bidang")
print("  menjadi garis tidak bisa dibatalkan.")

# --------------------------------------------
# 7. Determinan = faktor perubahan luas
# --------------------------------------------
print("")
print("--- determinan sebagai faktor luas ---")
UJI = [
    ([[2, 0], [0, 3]], "regang 2x dan 3x"),
    ([[1, 3], [0, 1]], "geser miring"),
    ([[0, -1], [1, 0]], "putar 90 derajat"),
    ([[1, 2], [2, 4]], "mampatkan jadi garis"),
]
print("  " + "matriks".ljust(20) + "det".rjust(6) + "   arti")
for M, arti in UJI:
    d = M[0][0] * M[1][1] - M[0][1] * M[1][0]
    print("  " + str(M).ljust(20) + str(d).rjust(6) + "   " + arti)
print("")
print("  Geser miring: det 1, luasnya TIDAK berubah meski")
print("  bentuknya berubah. Baris terakhir: det 0, seluruh")
print("  bidang dimampatkan jadi satu garis, luasnya hilang,")
print("  dan itu tidak bisa dibatalkan.")` },
  output: `--- satu vektor, banyak tafsiran ---
  v = [3, 4]
  titik di bidang     x=3, y=4
  perpindahan         3 ke kanan, 4 ke atas
  ciri sebuah data    3 kali beli, nilai 4
  baris basis data    kolom1=3, kolom2=4

  panjang |v| = akar(3^2 + 4^2) = 5.0

--- hasil kali titik dan sudut ---
  a         b            a.b    sudut   arti
  [1, 0]    [1, 0]         1       0 arah sama
  [1, 0]    [1, 1]         1      45 menyerong
  [1, 0]    [0, 1]         0      90 tegak lurus
  [1, 0]    [-1, 0]       -1     180 berlawanan

  Nol berarti TEGAK LURUS. Inilah yang dipakai mesin
  pencari dan sistem rekomendasi: dokumen diubah jadi
  vektor, lalu kemiripannya diukur dengan sudut.

--- kemiripan kosinus antar dokumen ---
  kata: algoritma, matriks, resep, masak
  Catatan Alpro    vs Catatan Aljabar  0.496
  Catatan Alpro    vs Buku Resep       0.000
  Catatan Aljabar  vs Buku Resep       0.000

  Kedua catatan kuliah punya kemiripan sebagian, dan
  keduanya NOL terhadap buku resep -- tidak berbagi
  satu kata pun. Tidak ada teks yang dibaca; yang
  dibandingkan cuma sudut antar vektor.

--- perkalian matriks = MERANGKAI transformasi ---
  putar 45 lalu skala 2, dua langkah:
    [1, 0] -> [0.7071, 0.7071] -> [1.4142, 1.4142]
  matriks gabungan (SKALA x PUTAR), satu langkah:
    [1, 0] -> [1.4142, 1.4142]
  sama? True

  Inilah alasan aturannya baris-kali-kolom: ia dibuat
  supaya A x B berarti 'kerjakan B dulu, lalu A'.
  Aturan itu bukan kesepakatan sembarangan.

--- A x B tidak sama dengan B x A ---
  geser x cermin = [[1, -3], [0, -1]]
  cermin x geser = [[1, 3], [0, -1]]
  sama? False

  Membalik urutan mengubah hasilnya. Karena matriks
  mewakili tindakan, dan urutan tindakan berpengaruh:
  memutar lalu menggeser tidak sama dengan menggeser
  lalu memutar.

--- identitas dan invers ---
  I x v = v  ->  [7, -3]
  putar 45 lalu putar -45 = [[1, 0], [0, 1]]  = identitas

  Invers adalah tindakan yang MEMBATALKAN. Tindakan
  yang membuang keterangan tidak punya invers -- dan
  di situlah determinan nol muncul: memampatkan bidang
  menjadi garis tidak bisa dibatalkan.

--- determinan sebagai faktor luas ---
  matriks                det   arti
  [[2, 0], [0, 3]]         6   regang 2x dan 3x
  [[1, 3], [0, 1]]         1   geser miring
  [[0, -1], [1, 0]]        1   putar 90 derajat
  [[1, 2], [2, 4]]         0   mampatkan jadi garis

  Geser miring: det 1, luasnya TIDAK berubah meski
  bentuknya berubah. Baris terakhir: det 0, seluruh
  bidang dimampatkan jadi satu garis, luasnya hilang,
  dan itu tidak bisa dibatalkan.`,

  kesalahanUmum: [
    {
      salah: 'Menghafal aturan baris dikali kolom tanpa tahu untuk apa.',
      kenapa: 'Aturannya lahir dari kebutuhan agar perkalian dua matriks berarti merangkai dua tindakan. Tanpa memahami itu, syarat dimensi terasa sewenang-wenang, urutan yang tidak bisa ditukar terasa seperti kekurangan, dan semuanya harus dihafal ulang tiap semester.',
      benar: 'Baca matriks sebagai tempat baru bagi vektor satuan, lalu turunkan sendiri aturan perkaliannya dari kebutuhan merangkai dua tindakan.'
    },
    {
      salah: 'Mengira A dikali B sama dengan B dikali A.',
      kenapa: 'Matriks mewakili tindakan, dan urutan tindakan berpengaruh. Menggeser lalu mencerminkan menghasilkan bentuk yang berbeda dari mencerminkan lalu menggeser, sehingga perkalian yang bisa ditukar bebas justru tidak akan bisa mewakili rangkaian tindakan.',
      benar: 'Perlakukan A dikali B sebagai kerjakan B dulu lalu A, dan periksa urutannya setiap kali merangkai transformasi.'
    },
    {
      salah: 'Memakai jarak Euclid untuk mengukur kemiripan dua dokumen.',
      kenapa: 'Dokumen yang panjang punya angka besar di hampir semua kata, sehingga jaraknya jauh dari dokumen pendek meski isinya membicarakan hal yang sama. Yang seharusnya dibandingkan perbandingan antar katanya, bukan besarnya.',
      benar: 'Pakai kemiripan kosinus, yang mengabaikan panjang vektor dan hanya melihat sudut di antara keduanya.'
    },
    {
      salah: 'Menganggap determinan sekadar angka yang harus dihitung untuk mencari invers.',
      kenapa: 'Determinan adalah faktor perubahan luas, dan nilai nol berarti transformasinya memampatkan ruang sehingga membuang keterangan. Tanpa tafsiran itu, tidak jelas kenapa determinan nol berarti tidak ada invers dan kenapa sistem persamaannya jadi tidak punya jawaban tunggal.',
      benar: 'Baca determinan sebagai seberapa besar luas berubah, dan nol sebagai memampatkan bidang menjadi garis yang tidak bisa dibatalkan.'
    },
    {
      salah: 'Mengira determinan negatif berarti ada yang salah dalam perhitungan.',
      kenapa: 'Tanda negatif berarti orientasinya terbalik, seperti pada pencerminan, dan itu tindakan yang sah. Yang menentukan ada tidaknya invers adalah nol atau tidaknya, bukan tandanya.',
      benar: 'Baca besarnya sebagai faktor luas dan tandanya sebagai apakah orientasinya terbalik.'
    },
    {
      salah: 'Menuliskan vektor sebagai baris atau kolom secara bergantian tanpa konsisten.',
      kenapa: 'Perkalian matriks peka terhadap bentuk, sehingga vektor baris dan vektor kolom tidak bisa ditukar tanpa transpose. Ketidakkonsistenan ini menghasilkan galat dimensi yang membingungkan atau, lebih buruk, hasil yang bentuknya benar tetapi artinya salah.',
      benar: 'Pilih satu kesepakatan, biasanya vektor kolom, lalu pakai transpose secara sadar setiap kali bentuknya perlu diubah.'
    }
  ],

  analogi: `Bayangkan **resep memindahkan barang di kamar**.

Satu matriks adalah **satu instruksi lengkap** tentang ke mana semua barang harus pindah. Dan uniknya, kamu cukup tahu ke mana **dua barang patokan** pindah — katakan lemari dan meja — untuk tahu ke mana **semua** barang lain pindah.

Itulah kenapa matriks \`2x2\` cuma butuh dua kolom.

Sekarang kamu punya dua instruksi: *"putar seisi kamar 45 derajat"* dan *"perbesar jaraknya dua kali"*.

Kamu bisa menjalankan keduanya berurutan pada semua barang. Atau kamu bisa **menghitung satu instruksi gabungan** lebih dulu — dan menjalankannya sekali.

Untuk menyusun instruksi gabungan itu, kamu cukup bertanya: *"ke mana lemari akhirnya pindah?"* Jawabnya: putar lemari, lalu perbesar hasilnya.

Persis itulah perkalian matriks.

Dan urutannya jelas berpengaruh. *"Putar lalu perbesar"* menghasilkan kamar yang berbeda dari *"perbesar lalu putar"* — coba bayangkan sendiri.

Terakhir, determinan. Kalau instruksinya membuat semua barang berbaris di satu garis, kamu **tidak akan pernah bisa** mengembalikannya, karena kamu tidak lagi tahu barang mana tadinya di depan dan mana di belakang.

Itu determinan nol.`,

  latihan: [
    'Tulis satu vektor tiga dimensi, lalu berikan tiga tafsiran berbeda tentang apa artinya.',
    'Hitung hasil kali titik dan sudut untuk empat pasang vektor, dan jelaskan arti nilai nol.',
    'Ubah tiga kalimat pendek menjadi vektor jumlah kata, lalu hitung kemiripan kosinus antar ketiganya.',
    'Jelaskan kenapa kemiripan kosinus lebih tepat daripada jarak untuk membandingkan dokumen yang panjangnya berbeda.',
    'Untuk lima matriks 2x2, tentukan tindakan apa yang diwakili masing-masing dengan melihat kolomnya.',
    'Turunkan sendiri aturan perkalian matriks dari kebutuhan merangkai dua transformasi, tanpa menghafalnya.',
    'Berikan satu contoh nyata di mana A dikali B jelas berbeda dari B dikali A, dan jelaskan kenapa.',
    'Hitung determinan lima matriks 2x2, lalu jelaskan arti geometris tiap nilainya termasuk yang negatif dan nol.',
    'Jelaskan kenapa matriks dengan determinan nol tidak punya invers, dengan alasan geometris bukan aljabar.',
    'Tulis matriks yang memutar 30 derajat, lalu tulis inversnya, dan buktikan hasil kalinya identitas.'
  ]
});


TOPICS.push({
  id: 'alin-spl',
  judul: 'Sistem Persamaan Linear',
  kategori: 'aljabar-linear',
  tag: ['SPL', 'eliminasi Gauss', 'invers matriks', 'determinan', 'Cramer', 'kofaktor', 'adjoin'],
  ringkas: 'Jawabannya memenuhi ketiga persamaan dengan tepat, dan tetap mustahil dijalankan. Itu bukan kesalahan hitung.',

  fungsi: `**Menyelesaikan beberapa syarat yang harus dipenuhi sekaligus.**

Terpakai di:

- **Optimasi dan penjadwalan** — komposisi, campuran, alokasi
- **Grafika** — mencari titik potong, interpolasi
- **Regresi** — mencocokkan garis ke data adalah SPL
- **Simulasi** — jaringan listrik, aliran, kesetimbangan
- **Proyek kuliah** — kasus di topik ini diambil dari proyek kelompokmu sendiri

Yang paling murah dan paling sering dilewatkan: **masukkan jawabanmu kembali ke persamaan aslinya.** Satu menit, dan ia menangkap hampir semua kekeliruan hitung.

Dan pelajaran yang paling penting dari kasus proyekmu: **jawaban yang memenuhi semua persamaan belum tentu bisa dijalankan.** Tiga puluh porsi nasi sehari benar secara matematika dan mustahil secara kenyataan — itu batas modelnya, bukan salah hitungnya.`,

  praktik: {
    tujuan: `Kamu bisa menyelesaikan SPL dengan tiga cara, memeriksa jawabannya sendiri, dan mengenali kapan modelnya yang kurang.`,
    alat: [
      'Python 3 dengan modul `fractions`',
      'Kertas untuk hitungan tangan'
    ],
    langkah: [
      { judul: 'Tulis soalnya sebagai matriks lebih dulu',
        isi: `Ubah persamaanmu menjadi \`A X = B\`, dan sebutkan apa arti tiap matriksnya.

Langkah ini bukan sekadar merapikan. Ia mengubah tiga persamaan menjadi satu, dan sejak saat itu seluruh perkakas matriks bisa dipakai.` },
      { judul: 'Hitung determinan sebelum apa pun',
        isi: `Kalau nol, berhenti — tidak ada jawaban tunggal, dan kamu perlu memeriksa ruas kanannya untuk tahu apakah jawabannya tak hingga atau tidak ada.

Kalau tidak nol, lanjutkan. Satu langkah ini menghemat pekerjaan yang sia-sia.` },
      { judul: 'Kerjakan dengan tangan sekali',
        isi: `Kofaktor, adjoin, invers, lalu kalikan dengan B.

Tulis langkah **transpose** secara terpisah dan beri tanda. Melewatkannya adalah kesalahan paling sering, dan hasilnya tetap tampak masuk akal sehingga tidak ketahuan.` },
      { judul: 'Masukkan kembali ke ketiga persamaan',
        isi: `Ini langkah yang paling murah dan paling sering dilewatkan.

Kalau salah satu tidak cocok, kamu menemukan kekeliruanmu sendiri — sebelum orang lain menemukannya.` },
      { judul: 'Periksa jawabannya terhadap kenyataan',
        isi: `Untuk tiap nilai yang kamu dapat, tanyakan: **mungkin tidak?**

Negatif padahal seharusnya positif? Terlalu besar untuk dijalankan? Pecahan padahal seharusnya bulat?

Kalau ya, modelnya yang kurang — dan yang kamu butuhkan adalah **program linear** dengan kendala pertidaksamaan.` },
      { judul: 'Kerjakan ulang dengan eliminasi Gauss',
        isi: `Tiga operasi baris yang diizinkan: tukar baris, kalikan baris dengan bilangan tak nol, tambahkan kelipatan baris ke baris lain.

Jawabannya harus **identik**. Hitung berapa langkahnya, lalu bandingkan dengan cara invers.` },
      { judul: 'Pakai pecahan, bukan desimal',
        isi: `Di Python, pakai \`from fractions import Fraction\`.

Dengan pecahan, jawabanmu **tepat** dan tidak ada galat pembulatan yang menyamarkan kesalahan. Baru ubah ke desimal di akhir, saat menampilkan.` },
      { judul: 'Buat kasus determinan nol sendiri',
        isi: `Susun matriks yang baris ketiganya jumlah dua baris pertama.

Lalu buat dua ruas kanan: satu yang konsisten (tak hingga jawaban), satu yang bertentangan (tidak ada jawaban).

Menjalankan keduanya membuat perbedaannya jelas dan tidak akan tertukar lagi.` }
    ],
    cek: [
      'Kamu memeriksa determinan sebelum mulai menghitung invers',
      'Jawabanmu sudah dimasukkan kembali dan ketiga persamaannya cocok',
      'Kamu sudah menilai apakah jawabannya masuk akal di dunia nyata, bukan cuma benar'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa invers bukan cara yang dipakai',

  konsep: `
Banyak masalah nyata berbentuk sama: **beberapa besaran yang tidak diketahui, dan beberapa syarat yang harus dipenuhi sekaligus**. Bentuk itulah yang disebut sistem persamaan linear.

**Kasus yang dipakai di sini**

Diambil utuh dari proyek kelompokmu sendiri di mata kuliah ini: menentukan porsi tiga jenis makanan supaya target karbohidrat, protein, dan lemak terpenuhi tepat.

\`4x + y + z = 130\` — karbohidrat
\`2x + 5y + z = 80\` — protein
\`x + 2y + 2z = 50\` — lemak

**Bentuk matriks**

Ketiganya bisa ditulis sekaligus sebagai \`A X = B\`:

- **A** — matriks koefisien, isi gizi tiap makanan
- **X** — yang dicari, jumlah porsi
- **B** — target gizinya

Menuliskannya begini bukan sekadar merapikan. Ia mengubah **tiga persamaan** menjadi **satu persamaan**, dan sejak saat itu seluruh perkakas matriks bisa dipakai.

**Tiga kemungkinan jawaban**

Sebelum menghitung apa pun, ada tiga kemungkinan yang harus dikenali:

- **tepat satu jawaban** — \`det(A)\` tidak nol
- **tak hingga jawaban** — \`det(A) = 0\` dan persamaannya tidak bertentangan
- **tidak ada jawaban** — \`det(A) = 0\` dan persamaannya bertentangan

Determinan nol berarti salah satu persamaan **tidak membawa keterangan baru** — ia bisa disusun dari yang lain. Apakah akibatnya tak hingga atau tidak ada bergantung pada ruas kanannya.

**Cara pertama: invers matriks**

Ini yang dipakai di proyekmu:

- hitung \`det(A)\` — kalau nol, berhenti
- hitung **matriks kofaktor**: \`Cij = (-1)^(i+j) x det(Mij)\`
- **adjoin** = transpose kofaktor
- \`A^-1 = adj(A) / det(A)\`
- \`X = A^-1 B\`

Untuk kasus di atas: \`det = 28\`, dan hasilnya \`x = 30\`, \`y = 2,5\`, \`z = 7,5\`.

**Selalu masukkan kembali**

Ini langkah yang paling sering dilewatkan dan paling murah. Masukkan jawabanmu ke ketiga persamaan aslinya. Kalau salah satu tidak cocok, ada kekeliruan hitung — dan kamu menemukannya sendiri, sebelum orang lain menemukannya.

**Benar secara matematika, salah secara kenyataan**

Jawaban di atas **memenuhi ketiga persamaan dengan tepat**. Dan ia tetap mustahil dijalankan: 30 porsi nasi dan 7,5 porsi alpukat sehari.

Ini **bukan kesalahan hitung**. Ini batas modelnya. SPL tidak tahu bahwa porsi harus masuk akal — ia cuma diminta mencocokkan tiga angka, dan ia melakukannya dengan sempurna.

Kalau porsinya harus dibatasi, yang dibutuhkan bukan SPL melainkan **program linear**: mengoptimalkan sesuatu dengan kendala berupa **pertidaksamaan**.

Menyadari batas ini bagian dari menguasai metodenya, bukan kritik terhadap proyeknya.

**Cara kedua: eliminasi Gauss**

Ubah matriks menjadi bentuk segitiga dengan operasi baris, lalu selesaikan dari bawah ke atas.

Tiga operasi baris yang diizinkan: **tukar dua baris**, **kalikan satu baris dengan bilangan tak nol**, dan **tambahkan kelipatan satu baris ke baris lain**. Ketiganya **tidak mengubah himpunan jawabannya**.

**Cara ketiga: kaidah Cramer**

\`xi = det(Ai) / det(A)\`, dengan \`Ai\` adalah A yang kolom ke-i-nya diganti B.

Rapi untuk ditulis, dan **tidak terpakai** untuk n di atas empat — biayanya tumbuh secara faktorial.

**Mana yang dipakai di praktik**

| Cara | Biaya kerja | Kapan dipakai |
|---|---|---|
| Eliminasi Gauss | sekitar \`n^3/3\` | **hampir selalu** |
| Invers + kali | sekitar \`n^3\` | kalau A dipakai untuk banyak B |
| Cramer | faktorial | hanya n kecil, untuk penurunan rumus |

Perhatikan bahwa eliminasi bukan cuma lebih murah — ia juga **lebih tahan galat pembulatan**. Menghitung invers memperbesar galat, dan untuk matriks yang hampir singular perbedaannya besar.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# TIGA CARA, SATU JAWABAN, BIAYA BERBEDA\n#\n# Biaya kerja untuk n persamaan (urutan besar):\n#\n#     n   eliminasi Gauss   invers+kali        Cramer\n#     3                 9            27            24\n#     5                42           125           720\n#    10               333          1000      3.99e+07\n#    20              2667          8000      5.11e+19\n#\n# Cramer meledak secara faktorial -- tidak terpakai.\n# Invers sekitar 3x lebih mahal daripada eliminasi,\n# dan lebih rentan galat pembulatan.\n#\n# Menghitung invers baru berguna kalau A yang SAMA\n# dipakai untuk BANYAK ruas kanan yang berbeda.',
      penjelasan: `
Di kelas, invers matriks diajarkan lebih dulu dan terasa seperti cara utamanya. Di praktik, ia **hampir tidak pernah** dipakai untuk menyelesaikan \`Ax = b\`. Ada tiga alasan, dan ketiganya layak dipahami.

**Alasan pertama: biayanya.**

Eliminasi Gauss butuh sekitar \`n^3/3\` operasi. Menghitung invers butuh sekitar \`n^3\`, lalu masih harus dikalikan dengan b.

Untuk \`n = 3\` selisihnya tidak terasa: 9 melawan 27. Untuk \`n = 1000\` — ukuran yang biasa di simulasi dan pembelajaran mesin — selisihnya menjadi ratusan juta operasi.

Dan perhatikan kaidah Cramer di kolom terakhir. Untuk \`n = 20\`, angkanya sekitar \`5 x 10^19\`. Kalau satu operasi butuh satu nanodetik, itu **lebih dari seribu enam ratus tahun**. Cramer indah untuk menurunkan rumus dan mustahil untuk menghitung.

**Alasan kedua, dan yang lebih penting: ketelitiannya.**

Komputer menyimpan pecahan dengan ketelitian terbatas. Tiap pembagian dan pengurangan menambah sedikit galat, dan galat itu **menumpuk**.

Menghitung invers berarti menyelesaikan \`n\` sistem persamaan sekaligus — satu untuk tiap kolom identitas — lalu mengalikannya dengan b. Itu **dua tahap penumpukan galat**, sementara eliminasi cuma satu.

Untuk matriks yang **hampir singular** — determinannya mendekati nol — selisihnya bukan sedikit. Jawaban lewat invers bisa meleset jauh sementara eliminasi masih memberi jawaban yang berguna.

Cara membayangkannya: hampir singular berarti transformasinya hampir memampatkan ruang. Membatalkan pemampatan yang hampir total sangat peka terhadap galat kecil, karena perbedaan kecil di hasil bisa datang dari perbedaan besar di asalnya.

**Alasan ketiga: kamu jarang membutuhkan inversnya.**

Perhatikan apa yang sebenarnya kamu cari. Kamu ingin **x**, bukan \`A^-1\`.

Menghitung \`A^-1\` lalu mengalikannya dengan b adalah mengerjakan pekerjaan yang jauh lebih besar demi jawaban yang bisa didapat langsung. Ia seperti membuat kunci duplikat untuk semua pintu di gedung padahal kamu cuma perlu masuk ke satu ruangan.

**Kapan invers benar-benar berguna**

Ada satu keadaan, dan keadaan itu nyata: ketika **A yang sama** dipakai untuk **banyak b yang berbeda**.

Kalau kamu harus menyelesaikan \`Ax = b1\`, \`Ax = b2\`, sampai \`Ax = b100\`, maka menghitung sesuatu sekali di depan lalu memakainya berulang jadi masuk akal.

Tetapi bahkan di situ, yang dipakai biasanya **bukan invers** melainkan **faktorisasi LU**. Ia memecah A menjadi dua matriks segitiga sekali saja, lalu tiap b baru diselesaikan dengan dua kali substitusi yang murah — dengan biaya lebih rendah dan ketelitian lebih baik daripada invers.

Jadi apa gunanya belajar invers, kofaktor, dan adjoin?

Gunanya **memahami**, bukan menghitung. Rumus \`A^-1 = adj(A)/det(A)\` menjelaskan dengan gamblang kenapa determinan nol berarti tidak ada invers: pembaginya nol. Itu penjelasan yang tidak diberikan oleh eliminasi Gauss, dan ia layak dikuasai justru karena itu.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Sistem persamaan linear: kasus proyek sendiri
# ============================================
from fractions import Fraction as F

# --------------------------------------------
# 1. Soalnya
# --------------------------------------------
# 4x +  y +  z = 130   (karbohidrat)
# 2x + 5y +  z =  80   (protein)
#  x + 2y + 2z =  50   (lemak)
A = [[F(4), F(1), F(1)],
     [F(2), F(5), F(1)],
     [F(1), F(2), F(2)]]
b = [F(130), F(80), F(50)]
NAMA = ["nasi putih", "dada ayam", "alpukat"]

print("--- sistem persamaan linear ---")
GIZI = ["karbohidrat", "protein", "lemak"]
for i in range(3):
    baris = "  " + GIZI[i].ljust(13)
    suku = []
    for j, v in enumerate(A[i]):
        suku.append(str(v) + "*" + "xyz"[j])
    print(baris + " + ".join(suku) + " = " + str(b[i]))

# --------------------------------------------
# 2. Determinan dengan aturan Sarrus
# --------------------------------------------
def det3(M):
    return (M[0][0]*M[1][1]*M[2][2] + M[0][1]*M[1][2]*M[2][0]
            + M[0][2]*M[1][0]*M[2][1]
            - M[0][2]*M[1][1]*M[2][0] - M[0][0]*M[1][2]*M[2][1]
            - M[0][1]*M[1][0]*M[2][2])

d = det3(A)
print("")
print("--- determinan ---")
print("  det(A) = " + str(d))
print("  " + ("tidak nol -> ada tepat satu jawaban"
              if d != 0 else "NOL -> tidak ada jawaban tunggal"))

# --------------------------------------------
# 3. Kofaktor, adjoin, invers
# --------------------------------------------
def minor(M, i, j):
    return [[M[r][c] for c in range(3) if c != j]
            for r in range(3) if r != i]

def det2(M):
    return M[0][0]*M[1][1] - M[0][1]*M[1][0]

C = [[((-1) ** (i + j)) * det2(minor(A, i, j)) for j in range(3)]
     for i in range(3)]
adj = [[C[j][i] for j in range(3)] for i in range(3)]   # transpose

print("")
print("--- matriks kofaktor ---")
for r in C:
    print("  [" + "  ".join(str(v).rjust(4) for v in r) + " ]")
print("")
print("--- adjoin = transpose kofaktor ---")
for r in adj:
    print("  [" + "  ".join(str(v).rjust(4) for v in r) + " ]")

x_inv = [sum(adj[i][k] * b[k] for k in range(3)) / d for i in range(3)]
print("")
print("--- jawaban lewat invers ---")
for i in range(3):
    print("  " + NAMA[i].ljust(12) + str(x_inv[i]).rjust(6)
          + " porsi  = " + ("%.2f" % float(x_inv[i])))

# --------------------------------------------
# 4. Selalu periksa dengan memasukkan kembali
# --------------------------------------------
print("")
print("--- periksa dengan memasukkan kembali ---")
for i in range(3):
    kiri = sum(A[i][j] * x_inv[j] for j in range(3))
    tanda = "cocok" if kiri == b[i] else "TIDAK COCOK"
    print("  " + GIZI[i].ljust(13) + str(kiri).rjust(6)
          + " vs " + str(b[i]).rjust(4) + "   " + tanda)

# --------------------------------------------
# 5. Benar secara matematika, salah secara kenyataan
# --------------------------------------------
print("")
print("--- benar, tapi masuk akal? ---")
BATAS = [("nasi putih", 4), ("dada ayam", 3), ("alpukat", 2)]
for i, (nama, wajar) in enumerate(BATAS):
    n = float(x_inv[i])
    catat = "wajar" if n <= wajar else "TIDAK MUNGKIN dimakan"
    print("  " + nama.ljust(12) + ("%.2f" % n).rjust(7)
          + " porsi  (wajar <= " + str(wajar) + ")  " + catat)
print("")
print("  Jawabannya memenuhi ketiga persamaan dengan tepat,")
print("  dan tetap tidak bisa dijalankan. SPL tidak tahu")
print("  bahwa porsi harus masuk akal -- ia cuma diminta")
print("  mencocokkan tiga angka.")
print("")
print("  Ini batas modelnya, bukan kesalahan hitungnya.")
print("  Kalau porsinya harus dibatasi, yang dibutuhkan")
print("  bukan SPL melainkan PROGRAM LINEAR: minimalkan")
print("  sesuatu dengan kendala berupa PERTIDAKSAMAAN.")

# --------------------------------------------
# 6. Eliminasi Gauss: jawaban sama, kerja lebih sedikit
# --------------------------------------------
def gauss(A0, b0):
    n = len(A0)
    M = [row[:] + [b0[i]] for i, row in enumerate(A0)]
    langkah = 0
    for k in range(n):
        p = max(range(k, n), key=lambda r: abs(M[r][k]))
        M[k], M[p] = M[p], M[k]
        if M[k][k] == 0:
            return None, langkah
        for r in range(k + 1, n):
            f = M[r][k] / M[k][k]
            for c in range(k, n + 1):
                M[r][c] -= f * M[k][c]
                langkah += 1
    x = [F(0)] * n
    for i in range(n - 1, -1, -1):
        s = M[i][n] - sum(M[i][j] * x[j] for j in range(i + 1, n))
        x[i] = s / M[i][i]
        langkah += n - i
    return x, langkah

x_g, langkah_g = gauss(A, b)
print("")
print("--- eliminasi Gauss ---")
for i in range(3):
    print("  " + NAMA[i].ljust(12) + str(x_g[i]).rjust(6) + " porsi")
print("  jawabannya identik : " + str(x_g == x_inv))

# --------------------------------------------
# 7. Kenapa invers bukan cara yang dipakai di praktik
# --------------------------------------------
print("")
print("--- biaya kerja untuk n persamaan ---")
print("  " + "n".rjust(5) + "eliminasi Gauss".rjust(20)
      + "invers + kali".rjust(18) + "kaidah Cramer".rjust(24))
import math
for n in (3, 5, 10, 20):
    gaus = n ** 3 / 3
    inv = n ** 3
    cramer = math.factorial(n) * (n + 1)
    c = ("%.3g" % cramer) if cramer > 1e6 else str(int(cramer))
    print("  " + str(n).rjust(5) + ("%.0f" % gaus).rjust(20)
          + ("%.0f" % inv).rjust(18) + c.rjust(24))
print("")
print("  Angka ini urutan besar, bukan hitungan operasi yang")
print("  persis. Yang nyata perbandingannya: Cramer meledak")
print("  secara faktorial dan tidak terpakai di luar n kecil.")
print("  Invers sekitar 3 kali lebih mahal daripada eliminasi,")
print("  dan lebih rentan galat pembulatan. Menghitung invers")
print("  hanya berguna kalau A dipakai ulang untuk banyak b.")

# --------------------------------------------
# 8. Kalau determinannya nol
# --------------------------------------------
print("")
print("--- kalau det(A) = 0 ---")
A2 = [[F(1), F(2), F(3)],
      [F(2), F(4), F(6)],      # baris 2 = 2 x baris 1
      [F(1), F(1), F(1)]]
print("  det = " + str(det3(A2)) + "  (baris 2 = 2 x baris 1)")
for b2, arti in ((
        [F(10), F(20), F(6)], "konsisten -> TAK HINGGA jawaban"),
        ([F(10), F(21), F(6)], "bertentangan -> TIDAK ADA jawaban")):
    x2, _ = gauss(A2, b2)
    print("  b = " + str([str(v) for v in b2]) + " -> " + arti)
print("")
print("  Determinan nol berarti salah satu persamaan tidak")
print("  membawa keterangan baru. Apakah jawabannya tak")
print("  hingga atau tidak ada bergantung pada ruas kanannya.")` },
  output: `--- sistem persamaan linear ---
  karbohidrat  4*x + 1*y + 1*z = 130
  protein      2*x + 5*y + 1*z = 80
  lemak        1*x + 2*y + 2*z = 50

--- determinan ---
  det(A) = 28
  tidak nol -> ada tepat satu jawaban

--- matriks kofaktor ---
  [   8    -3    -1 ]
  [   0     7    -7 ]
  [  -4    -2    18 ]

--- adjoin = transpose kofaktor ---
  [   8     0    -4 ]
  [  -3     7    -2 ]
  [  -1    -7    18 ]

--- jawaban lewat invers ---
  nasi putih      30 porsi  = 30.00
  dada ayam      5/2 porsi  = 2.50
  alpukat       15/2 porsi  = 7.50

--- periksa dengan memasukkan kembali ---
  karbohidrat     130 vs  130   cocok
  protein          80 vs   80   cocok
  lemak            50 vs   50   cocok

--- benar, tapi masuk akal? ---
  nasi putih    30.00 porsi  (wajar <= 4)  TIDAK MUNGKIN dimakan
  dada ayam      2.50 porsi  (wajar <= 3)  wajar
  alpukat        7.50 porsi  (wajar <= 2)  TIDAK MUNGKIN dimakan

  Jawabannya memenuhi ketiga persamaan dengan tepat,
  dan tetap tidak bisa dijalankan. SPL tidak tahu
  bahwa porsi harus masuk akal -- ia cuma diminta
  mencocokkan tiga angka.

  Ini batas modelnya, bukan kesalahan hitungnya.
  Kalau porsinya harus dibatasi, yang dibutuhkan
  bukan SPL melainkan PROGRAM LINEAR: minimalkan
  sesuatu dengan kendala berupa PERTIDAKSAMAAN.

--- eliminasi Gauss ---
  nasi putih      30 porsi
  dada ayam      5/2 porsi
  alpukat       15/2 porsi
  jawabannya identik : True

--- biaya kerja untuk n persamaan ---
      n     eliminasi Gauss     invers + kali           kaidah Cramer
      3                   9                27                      24
      5                  42               125                     720
     10                 333              1000                3.99e+07
     20                2667              8000                5.11e+19

  Angka ini urutan besar, bukan hitungan operasi yang
  persis. Yang nyata perbandingannya: Cramer meledak
  secara faktorial dan tidak terpakai di luar n kecil.
  Invers sekitar 3 kali lebih mahal daripada eliminasi,
  dan lebih rentan galat pembulatan. Menghitung invers
  hanya berguna kalau A dipakai ulang untuk banyak b.

--- kalau det(A) = 0 ---
  det = 0  (baris 2 = 2 x baris 1)
  b = ['10', '20', '6'] -> konsisten -> TAK HINGGA jawaban
  b = ['10', '21', '6'] -> bertentangan -> TIDAK ADA jawaban

  Determinan nol berarti salah satu persamaan tidak
  membawa keterangan baru. Apakah jawabannya tak
  hingga atau tidak ada bergantung pada ruas kanannya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Eliminasi Gauss', waktu: 'O(n³)', memori: 'sekitar n³/3 operasi; cara baku' },
      { operasi: 'Menghitung invers', waktu: 'O(n³)', memori: 'sekitar 3x eliminasi, galat lebih besar' },
      { operasi: 'Faktorisasi LU', waktu: 'O(n³)', memori: 'sekali; tiap b berikutnya O(n²)' },
      { operasi: 'Substitusi balik', waktu: 'O(n²)', memori: 'setelah matriksnya segitiga' },
      { operasi: 'Kaidah Cramer', waktu: 'O(n! · n)', memori: 'mustahil di luar n kecil' }
    ],
    intuisi: `Ketiga cara utamanya sama-sama \`O(n^3)\`, jadi Big-O saja tidak memisahkan mereka. Yang memisahkan **konstantanya** dan **ketelitiannya**: eliminasi sekitar \`n^3/3\`, invers sekitar \`n^3\` dengan dua tahap penumpukan galat.

Kaidah Cramer beda kelas sama sekali. Untuk \`n = 20\` angkanya sekitar \`5 x 10^19\` operasi — lebih dari seribu enam ratus tahun pada satu nanodetik per operasi.`
  },

  kesalahanUmum: [
    {
      salah: 'Menyelesaikan Ax sama dengan b dengan menghitung invers A lebih dulu.',
      kenapa: 'Yang dicari adalah x, bukan invers A. Menghitung invers berarti menyelesaikan n sistem persamaan sekaligus lalu mengalikannya, sehingga biayanya sekitar tiga kali eliminasi dan galat pembulatannya menumpuk di dua tahap alih-alih satu.',
      benar: 'Pakai eliminasi Gauss, atau faktorisasi LU bila matriks yang sama dipakai untuk banyak ruas kanan.'
    },
    {
      salah: 'Berhenti setelah mendapat jawaban tanpa memasukkannya kembali ke persamaan asli.',
      kenapa: 'Pemeriksaan ini murah dan menangkap hampir semua kekeliruan hitung, mulai dari tanda kofaktor sampai transpose yang terlewat. Tanpa itu, kesalahan baru ketahuan ketika orang lain memeriksanya.',
      benar: 'Masukkan jawabanmu ke setiap persamaan aslinya dan pastikan ketiganya cocok sebelum melanjutkan.'
    },
    {
      salah: 'Menganggap jawaban yang memenuhi semua persamaan pasti bisa dijalankan.',
      kenapa: 'SPL hanya diminta mencocokkan angka dan tidak tahu bahwa besaran yang dicari punya batas nyata. Jawaban 30 porsi nasi sehari memenuhi ketiga persamaan dengan tepat dan tetap mustahil, dan itu batas modelnya bukan kesalahan hitungnya.',
      benar: 'Periksa jawabannya terhadap kenyataan, dan bila ada batas yang harus dipatuhi ganti modelnya menjadi program linear dengan kendala pertidaksamaan.'
    },
    {
      salah: 'Langsung menghitung invers tanpa memeriksa determinannya lebih dulu.',
      kenapa: 'Rumus invers membagi dengan determinan, sehingga determinan nol membuatnya tidak terdefinisi. Memeriksanya lebih dulu juga memberi tahu apakah sistemnya punya tak hingga jawaban atau tidak punya jawaban sama sekali.',
      benar: 'Hitung determinan lebih dulu, dan bila nol telusuri ruas kanannya untuk menentukan yang mana dari dua kemungkinan itu.'
    },
    {
      salah: 'Mengira determinan nol selalu berarti sistemnya tidak punya jawaban.',
      kenapa: 'Determinan nol berarti salah satu persamaan tidak membawa keterangan baru, dan akibatnya bergantung pada ruas kanan. Bila ruas kanannya konsisten, jawabannya justru tak hingga banyak, bukan tidak ada.',
      benar: 'Setelah menemukan determinan nol, lanjutkan eliminasi untuk melihat apakah muncul baris yang bertentangan atau baris nol seluruhnya.'
    },
    {
      salah: 'Memakai kaidah Cramer untuk sistem yang lebih dari empat persamaan.',
      kenapa: 'Biayanya tumbuh secara faktorial, sehingga untuk dua puluh persamaan angkanya melampaui apa yang bisa dihitung dalam waktu manusia. Rumusnya rapi untuk ditulis tetapi tidak untuk dijalankan.',
      benar: 'Pakai Cramer hanya untuk menurunkan rumus atau untuk sistem sangat kecil, dan pakai eliminasi untuk menghitung.'
    },
    {
      salah: 'Lupa mentranspose matriks kofaktor saat menyusun adjoin.',
      kenapa: 'Adjoin adalah transpose dari matriks kofaktor, dan melewatkan transposenya menghasilkan matriks yang bentuknya benar tetapi isinya salah. Hasilnya tetap berupa tiga angka yang tampak masuk akal, sehingga kesalahannya tidak terlihat sampai diperiksa.',
      benar: 'Selalu tulis langkah transpose secara terpisah, lalu periksa hasil akhirnya dengan memasukkan kembali ke persamaan asli.'
    }
  ],

  analogi: `Bayangkan kamu **menakar bumbu untuk satu resep**.

Kamu punya tiga bahan campuran, masing-masing sudah berisi garam, gula, dan asam dalam kadar berbeda. Kamu ingin hasil akhirnya tepat: sekian gram garam, sekian gram gula, sekian gram asam.

Berapa sendok dari tiap campuran?

Itu sistem persamaan linear. Tiga hal yang tidak diketahui, tiga syarat yang harus dipenuhi sekaligus.

Sekarang bagian yang penting.

Kamu hitung, dan jawabannya keluar: **tiga puluh sendok** campuran pertama.

Hitunganmu **benar**. Kalau kamu benar-benar memasukkan tiga puluh sendok, kadar garam, gula, dan asamnya akan tepat seperti yang kamu minta.

Tetapi tidak ada panci yang muat, dan tidak ada orang yang mau memakannya.

Matematikanya tidak salah. **Yang kurang adalah syaratnya.** Kamu tidak pernah memberi tahu bahwa jumlah sendoknya harus masuk akal — kamu cuma memberi tahu tiga angka yang harus dicocokkan, dan ia mencocokkannya dengan sempurna.

Untuk memberi tahu *"dan tidak boleh lebih dari empat sendok"*, kamu butuh alat yang lain: bukan persamaan, melainkan **pertidaksamaan**.

Itulah garis batas antara aljabar linear dan program linear.`,

  latihan: [
    'Ubah tiga persamaan linear menjadi bentuk matriks AX sama dengan B, dan jelaskan apa arti tiap matriksnya.',
    'Hitung determinan matriks 3x3 dengan aturan Sarrus, lalu ulangi dengan ekspansi kofaktor dan bandingkan hasilnya.',
    'Selesaikan sistem dari proyek kelompokmu dengan metode invers, lalu ulangi dengan eliminasi Gauss dan bandingkan jumlah langkahnya.',
    'Masukkan jawabanmu kembali ke ketiga persamaan asli dan tunjukkan bahwa ketiganya cocok.',
    'Jelaskan kenapa jawaban 30 porsi nasi sehari benar secara matematika tetapi tidak bisa dijalankan, dan model apa yang dibutuhkan untuk memperbaikinya.',
    'Buat sistem dengan determinan nol yang punya tak hingga jawaban, lalu ubah ruas kanannya sehingga tidak punya jawaban sama sekali.',
    'Bandingkan biaya kerja eliminasi Gauss, invers, dan Cramer untuk n sama dengan 5, 10, dan 20.',
    'Jelaskan dua alasan kenapa menghitung invers bukan cara yang dipakai di praktik untuk menyelesaikan Ax sama dengan b.',
    'Jelaskan kapan menghitung invers atau faktorisasi LU justru masuk akal, dan kenapa.',
    'Sebutkan tiga operasi baris yang diizinkan dalam eliminasi, dan jelaskan kenapa ketiganya tidak mengubah himpunan jawabannya.'
  ]
});


TOPICS.push({
  id: 'alin-eigen',
  judul: 'Transformasi Linear & Eigenvector',
  kategori: 'aljabar-linear',
  tag: ['transformasi linear', 'eigenvalue', 'eigenvector', 'power iteration', 'PageRank', 'PCA'],
  ringkas: 'Arah yang tidak berubah saat semua yang lain berubah — dan kenapa itu yang membuat Google bekerja.',

  fungsi: `**Menemukan struktur yang bertahan ketika sebuah proses dijalankan berulang.**

Terpakai di:

- **PageRank** — peringkat halaman adalah eigenvector matriks tautan
- **PCA** — mengurangi dimensi data dengan mencari arah ragam terbesar
- **Rantai Markov** — keadaan tunak adalah eigenvector \`lambda = 1\`
- **Sistem rekomendasi** dan **kompresi** — faktorisasi matriks, SVD
- **Grafika** — sumbu putaran objek tiga dimensi

Kalimat yang membuka semuanya: **kalau kamu bertanya "apa yang stabil di sini", kamu sedang mencari eigenvector.**

Dan dua pemeriksaan gratis yang menangkap hampir semua kekeliruan hitung: **jumlah eigenvalue = jejak**, **hasil kalinya = determinan**.`,

  praktik: {
    tujuan: `Kamu bisa mencari eigenvector dengan tangan, membuktikannya, dan menjalankan power iteration untuk kasus nyata.`,
    alat: [
      'Python 3',
      'Kertas',
      'Graf kecil buatan sendiri'
    ],
    langkah: [
      { judul: 'Cari dulu secara coba-coba',
        isi: `Ambil satu matriks \`2x2\`, lalu kenakan pada lima vektor berbeda.

Catat mana yang arahnya berubah dan mana yang tidak. Menemukannya sendiri sebelum melihat rumusnya membuat definisinya melekat.` },
      { judul: 'Turunkan persamaan karakteristiknya',
        isi: `Dari \`A v = lambda v\` ke \`(A - lambda I) v = 0\`.

Lalu tanyakan: kenapa determinannya harus nol? Jawabnya: supaya ada \`v\` tak nol yang memenuhinya, transformasinya harus memampatkan ruang.

Memahami langkah ini membuat rumusnya tidak perlu dihafal.` },
      { judul: 'Hitung, lalu periksa dengan jejak dan determinan',
        isi: `- jumlah semua eigenvalue = **jejak** (jumlah diagonal utama)
- hasil kali semua eigenvalue = **determinan**

Keduanya gratis. Lakukan setiap kali — ini menangkap hampir semua kekeliruan tanda.` },
      { judul: 'Buktikan eigenvector-mu',
        isi: `Untuk tiap eigenvalue, cari \`v\`-nya lalu hitung \`A v\` dan bandingkan dengan \`lambda v\`.

Harus sama persis. Ingat: setiap kelipatan \`v\` juga eigenvector — yang bermakna arahnya, bukan panjangnya.` },
      { judul: 'Jalankan power iteration',
        isi: `Mulai dari vektor sembarang, kenakan A berulang, normalkan tiap kali.

Cetak arahnya tiap putaran. Ia akan menuju eigenvector terbesar. Cetak juga faktornya — ia menuju eigenvalue terbesar.` },
      { judul: 'Uji kapan power iteration jadi lambat',
        isi: `Buat matriks dengan eigenvalue 3 dan 1, lalu satu lagi dengan 3 dan 2,9.

Hitung berapa putaran yang dibutuhkan masing-masing. Yang kedua jauh lebih lambat, karena kecepatannya ditentukan perbandingan \`lambda2/lambda1\`.` },
      { judul: 'Bangun PageRank kecil-kecilan',
        isi: `Buat graf lima halaman, susun matriks tautannya, lalu jalankan iterasi dengan peredam \`0,85\` sampai angkanya berhenti berubah.

Periksa hasilnya masuk akal: halaman yang ditunjuk banyak halaman penting harus tinggi.` },
      { judul: 'Cari matriks yang tidak punya eigenvector nyata',
        isi: `Matriks putar 90 derajat. Hitung diskriminannya — negatif.

Lalu jelaskan alasannya secara geometris: memutar bidang mengubah arah **setiap** vektor, jadi memang tidak ada yang bertahan.` },
      { judul: 'Hubungkan ke mata kuliah lain',
        isi: `Cari satu tempat di Data Mining atau Kecerdasan Buatan tempat eigenvector dipakai, lalu jelaskan matriks apa yang dicari eigenvector-nya.

PCA adalah contoh paling langsung: matriks kovarians, yang selalu simetris — dan karena itu arah-arahnya dijamin saling tegak lurus.` }
    ],
    cek: [
      'Kamu menemukan sendiri arah yang bertahan sebelum memakai rumusnya',
      'Setiap eigenvalue yang kamu hitung sudah diperiksa dengan jejak dan determinan',
      'Power iteration-mu menuju eigenvector yang sama dari tebakan awal mana pun'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa arah tertentu bertahan',

  konsep: `
Sebuah transformasi linear mengubah arah hampir setiap vektor. Tetapi biasanya ada **beberapa arah istimewa** yang tidak berubah — hanya panjangnya yang berubah.

Arah itu disebut **eigenvector**, dan faktor perubahan panjangnya disebut **eigenvalue**.

\`A v = lambda v\`

Persamaan ini pendek dan menipu. Ia menyatakan: mengenakan seluruh transformasi pada \`v\` menghasilkan hal yang sama dengan sekadar **mengalikan \`v\` dengan satu angka**.

**Mencarinya**

Dari \`A v = lambda v\` diperoleh \`(A - lambda I) v = 0\`. Supaya ada \`v\` tak nol yang memenuhinya, matriks \`A - lambda I\` harus **memampatkan ruang** — artinya determinannya nol.

\`det(A - lambda I) = 0\`

Untuk matriks \`2x2\`, ini menjadi persamaan kuadrat:

\`lambda^2 - (jejak) lambda + det = 0\`

dengan **jejak** = jumlah diagonal utama.

Dua pemeriksaan cepat yang selalu berlaku:

- **jumlah** semua eigenvalue = **jejak**
- **hasil kali** semua eigenvalue = **determinan**

Keduanya gratis, dan menangkap hampir semua kekeliruan hitung.

**Tidak semua matriks punya eigenvector nyata**

Matriks yang memutar bidang 90 derajat mengubah arah **setiap** vektor. Tidak ada satu arah pun yang bertahan, dan persamaan kuadratnya memang tidak punya akar nyata.

Ini masuk akal secara geometris, dan patut diingat: eigenvector bukan sesuatu yang selalu ada.

**Power iteration: kenapa ini berguna**

Kenakan A berulang-ulang pada vektor sembarang. Arahnya akan **menuju eigenvector dengan eigenvalue terbesar**, dan faktor pertumbuhannya menuju eigenvalue itu.

Sebabnya: vektor sembarang adalah campuran dari semua eigenvector. Tiap kali A dikenakan, komponen yang eigenvalue-nya besar tumbuh lebih cepat. Setelah beberapa putaran, ia **menenggelamkan** yang lain.

Ini bukan trik matematika. Ini algoritma nyata, dan ia yang menjalankan PageRank.

**PageRank**

Halaman web dan tautannya membentuk matriks. Nilai penting tiap halaman didefinisikan secara melingkar: *"sebuah halaman penting kalau ditunjuk oleh halaman-halaman penting"*.

Definisi melingkar itu tepatnya berbentuk \`r = M r\` — dan itu **persamaan eigenvector** dengan \`lambda = 1\`.

Google menyelesaikannya dengan power iteration: mulai dari nilai yang sama rata, kenakan matriksnya berulang sampai angkanya berhenti berubah.

Faktor peredam \`d = 0,85\` ditambahkan supaya perhitungannya selalu punya jawaban tunggal — ia mewakili pengguna yang sesekali berpindah ke halaman acak alih-alih mengikuti tautan.

**Matriks simetris berperilaku lebih baik**

Kalau \`A = A^T\`, maka eigenvalue-nya **selalu nyata** dan eigenvector-nya **saling tegak lurus**.

Ini bukan detail teknis. Matriks kovarians selalu simetris, dan itulah yang membuat **PCA** bekerja: arah-arah utama sebaran data saling tegak lurus, sehingga bisa dipakai sebagai sumbu baru tanpa saling tumpang tindih.

**Di mana ini terpakai di Informatika**

| Pemakaian | Eigenvector dari apa |
|---|---|
| PageRank | matriks tautan antar halaman |
| PCA | matriks kovarians — arah ragam terbesar |
| Rantai Markov | keadaan tunak, eigenvalue satu |
| Rekomendasi | faktorisasi matriks pengguna dikali barang |
| Kompresi & SVD | membuang komponen bernilai kecil |
| Grafika | sumbu putaran objek tiga dimensi |

Yang menghubungkan semuanya satu gagasan: **eigenvector adalah struktur yang bertahan** ketika sebuah proses dijalankan berulang. Kalau kamu mencari "apa yang stabil di sini", kamu sedang mencari eigenvector.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# POWER ITERATION: ARAHNYA MENUJU EIGENVECTOR TERBESAR\n#\n# A = [[2,1],[1,2]]  ->  eigenvalue 3 dan 1\n#\n# Mulai dari v = [1, 0] (bukan eigenvector apa pun):\n#\n#  iterasi          arah dinormalkan    faktor\n#        1      [0.894427, 0.447214]    2.2361\n#        2      [0.780869, 0.624695]    2.8636\n#        3      [0.732793, 0.680451]    2.9837\n#        5      [0.710011, 0.704191]    2.9998\n#        8      [0.707215, 0.706999]    3.0000\n#\n# Menuju [0.7071, 0.7071] = eigenvector lambda=3.\n# Inilah cara PageRank dihitung.',
      penjelasan: `
Kenapa mengenakan matriks yang sama berulang-ulang selalu berakhir di eigenvector terbesar? Alasannya bisa dilihat sampai tuntas, dan begitu terlihat, PageRank berhenti terasa ajaib.

Mulai dari satu kenyataan: **setiap vektor bisa ditulis sebagai campuran eigenvector**.

Untuk \`A = [[2,1],[1,2]]\` dengan eigenvector \`e1 = (1,1)\` pada \`lambda = 3\` dan \`e2 = (1,-1)\` pada \`lambda = 1\`, vektor awal \`(1,0)\` bisa ditulis:

\`(1,0) = 0,5 e1 + 0,5 e2\`

Sekarang kenakan A. Karena A bekerja pada tiap eigenvector dengan cara yang sederhana — cuma mengalikan dengan eigenvalue-nya — hasilnya:

\`A(1,0) = 0,5 (3 e1) + 0,5 (1 e2)\`

Kenakan lagi:

\`A^2 (1,0) = 0,5 (9 e1) + 0,5 (1 e2)\`

Dan setelah \`k\` kali:

\`A^k (1,0) = 0,5 (3^k) e1 + 0,5 (1^k) e2\`

Sekarang lihat kedua sukunya. Yang pertama tumbuh seperti \`3^k\`; yang kedua tetap 1 selamanya.

Setelah delapan putaran, suku pertama sudah **6561 kali** lebih besar. Komponen \`e2\` masih ada, tetapi ia menjadi tidak berarti dibanding tetangganya.

Karena itu arahnya menuju \`e1\`. Bukan karena \`e2\` hilang — melainkan karena \`e1\` **tumbuh jauh lebih cepat**.

Perhatikan angka di kolom faktor: 2,24 lalu 2,86 lalu 2,98 lalu 3,00. Ia mendekati eigenvalue terbesar, dan **kecepatan mendekatnya** ditentukan oleh perbandingan \`lambda2 / lambda1\` — di sini \`1/3\`, cukup kecil sehingga delapan putaran sudah cukup.

Kalau kedua eigenvalue-nya berdekatan, misalnya 3 dan 2,9, prosesnya jauh lebih lambat. Ini bukan teori: pada PageRank, perbandingan itu menentukan berapa kali seluruh web harus diproses ulang.

Sekarang PageRank bisa dijelaskan tanpa satu pun langkah ajaib.

Definisinya melingkar: *"halaman penting kalau ditunjuk halaman penting"*. Ditulis dalam matriks, ia menjadi \`r = M r\` — dan itu **tepat** persamaan eigenvector dengan \`lambda = 1\`.

Definisi melingkar biasanya tanda ada yang salah. Di sini ia justru bentuk yang benar, dan power iteration adalah cara menyelesaikannya: tebak apa saja, kenakan berulang, tunggu berhenti berubah.

Satu hal terakhir yang layak diperhatikan. Nilai awalnya **tidak penting** — hampir semua tebakan awal menuju jawaban yang sama, karena yang menentukan adalah eigenvector terbesar, bukan dari mana kamu berangkat.

Satu-satunya tebakan awal yang gagal adalah yang **tegak lurus sempurna** terhadap eigenvector terbesar, sehingga komponennya nol dan tidak ada yang bisa tumbuh. Peluangnya nol pada vektor acak, dan galat pembulatan komputer pun akan segera memperkenalkan komponen kecil yang lalu tumbuh sendiri.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Transformasi linear, eigenvector, dan gunanya
# ============================================
import math

def terap(M, v):
    return [sum(M[i][j] * v[j] for j in range(len(v)))
            for i in range(len(M))]

def panjang(v):
    return math.sqrt(sum(x * x for x in v))

def normal(v):
    n = panjang(v)
    return [x / n for x in v]

# --------------------------------------------
# 1. Kebanyakan vektor BERUBAH ARAH
# --------------------------------------------
A = [[2, 1], [1, 2]]
print("--- A = [[2,1],[1,2]] dikenakan pada beberapa vektor ---")
print("  " + "v".ljust(12) + "A*v".ljust(14) + "arah berubah?")
UJI = [[1, 0], [0, 1], [1, 2], [1, 1], [1, -1]]
for v in UJI:
    w = terap(A, v)
    sama = abs(normal(v)[0] - normal(w)[0]) < 1e-9 and \
           abs(normal(v)[1] - normal(w)[1]) < 1e-9
    balik = abs(normal(v)[0] + normal(w)[0]) < 1e-9 and \
            abs(normal(v)[1] + normal(w)[1]) < 1e-9
    ket = "TETAP" if (sama or balik) else "berubah"
    print("  " + str(v).ljust(12) + str(w).ljust(14) + ket)
print("")
print("  Dua vektor terakhir arahnya TIDAK berubah, cuma")
print("  panjangnya. Itulah eigenvector: arah yang bertahan")
print("  saat transformasinya dikenakan.")

# --------------------------------------------
# 2. Menghitung eigenvalue matriks 2x2
# --------------------------------------------
def eigen2(M):
    a, b = M[0]
    c, d = M[1]
    jejak = a + d
    det = a * d - b * c
    disk = jejak * jejak - 4 * det
    if disk < 0:
        return None, jejak, det, disk
    akar = math.sqrt(disk)
    return sorted([(jejak + akar) / 2, (jejak - akar) / 2],
                  reverse=True), jejak, det, disk

lam, jejak, det, disk = eigen2(A)
print("")
print("--- eigenvalue lewat persamaan karakteristik ---")
print("  det(A - lambda I) = 0")
print("  lambda^2 - (jejak) lambda + det = 0")
print("  jejak = " + str(jejak) + ", det = " + str(det))
print("  lambda^2 - " + str(jejak) + " lambda + " + str(det) + " = 0")
print("  lambda = " + ", ".join(str(int(x)) for x in lam))
print("")
print("  Periksa: jumlah eigenvalue = jejak  -> "
      + str(int(sum(lam))) + " = " + str(jejak))
print("           hasil kali        = det    -> "
      + str(int(round(lam[0] * lam[1]))) + " = " + str(det))

print("")
print("--- eigenvector untuk tiap eigenvalue ---")
for L, v in ((3, [1, 1]), (1, [1, -1])):
    w = terap(A, v)
    print("  lambda=" + str(L) + "  v=" + str(v)
          + "  A*v=" + str(w) + "  = " + str(L) + "*v -> "
          + str(w == [L * x for x in v]))

# --------------------------------------------
# 3. Kalau dikenakan berulang, eigenvector terbesar menang
# --------------------------------------------
print("")
print("--- kenakan A berulang pada vektor sembarang ---")
v = [1.0, 0.0]
print("  " + "iterasi".rjust(8) + "arah (dinormalkan)".rjust(28)
      + "faktor".rjust(10))
for i in range(1, 9):
    w = terap(A, v)
    faktor = panjang(w) / panjang(v)
    v = normal(w)
    if i in (1, 2, 3, 5, 8):
        print("  " + str(i).rjust(8)
              + ("[%.6f, %.6f]" % (v[0], v[1])).rjust(28)
              + ("%.4f" % faktor).rjust(10))
print("")
print("  Arahnya menuju [0.7071, 0.7071] -- itu eigenvector")
print("  untuk lambda=3, yang terbesar. Faktornya menuju 3.")
print("  Inilah POWER ITERATION, dan inilah inti PageRank:")
print("  eigenvector dari matriks tautan antar halaman.")

# --------------------------------------------
# 4. PageRank kecil-kecilan
# --------------------------------------------
print("")
print("--- PageRank pada empat halaman ---")
HAL = ["A", "B", "C", "D"]
# TAUT[i] = daftar halaman yang ditunjuk halaman i
TAUT = {"A": ["B", "C"], "B": ["C"], "C": ["A"], "D": ["C"]}
n = len(HAL)
M = [[0.0] * n for _ in range(n)]
for i, h in enumerate(HAL):
    keluar = TAUT[h]
    for t in keluar:
        M[HAL.index(t)][i] = 1.0 / len(keluar)

d = 0.85
r = [1.0 / n] * n
for _ in range(60):
    r = [(1 - d) / n + d * sum(M[i][j] * r[j] for j in range(n))
         for i in range(n)]

urut = sorted(zip(HAL, r), key=lambda t: -t[1])
print("  tautan: A->B,C   B->C   C->A   D->C")
print("")
print("  " + "halaman".ljust(10) + "peringkat".rjust(11))
for h, nilai in urut:
    print("  " + h.ljust(10) + ("%.4f" % nilai).rjust(11)
          + "  " + "#" * int(nilai * 60))
print("")
print("  C tertinggi karena ditunjuk tiga halaman. A kedua")
print("  meski cuma ditunjuk C -- karena C sendiri penting.")
print("  D terendah: tidak ada yang menunjuknya.")
print("  Angka ini eigenvector dari matriks tautan, dicari")
print("  dengan cara yang sama seperti bagian 3.")

# --------------------------------------------
# 5. Matriks yang TIDAK punya eigenvector nyata
# --------------------------------------------
print("")
print("--- tidak semua matriks punya eigenvector nyata ---")
PUTAR90 = [[0, -1], [1, 0]]
hasil, jj, dd, disk2 = eigen2(PUTAR90)
print("  putar 90 derajat: jejak=" + str(jj) + ", det=" + str(dd))
print("  diskriminan = " + str(disk2) + " < 0 -> tidak ada")
print("  eigenvalue nyata.")
print("")
print("  Masuk akal: memutar bidang 90 derajat mengubah arah")
print("  SETIAP vektor. Tidak ada satu arah pun yang bertahan.")

# --------------------------------------------
# 6. Di mana ini dipakai di Informatika
# --------------------------------------------
print("")
print("--- pemakaian di Informatika ---")
PAKAI = [
    ("PageRank",  "eigenvector matriks tautan halaman"),
    ("PCA",       "eigenvector matriks kovarians = arah ragam"),
    ("Grafika",   "matriks transformasi objek 3D"),
    ("Rekomendasi", "faktorisasi matriks pengguna x barang"),
    ("Kompresi",  "SVD membuang komponen bernilai kecil"),
    ("Rantai Markov", "keadaan tunak = eigenvector lambda=1"),
]
for nama, isi in PAKAI:
    print("  " + nama.ljust(14) + isi)` },
  output: `--- A = [[2,1],[1,2]] dikenakan pada beberapa vektor ---
  v           A*v           arah berubah?
  [1, 0]      [2, 1]        berubah
  [0, 1]      [1, 2]        berubah
  [1, 2]      [4, 5]        berubah
  [1, 1]      [3, 3]        TETAP
  [1, -1]     [1, -1]       TETAP

  Dua vektor terakhir arahnya TIDAK berubah, cuma
  panjangnya. Itulah eigenvector: arah yang bertahan
  saat transformasinya dikenakan.

--- eigenvalue lewat persamaan karakteristik ---
  det(A - lambda I) = 0
  lambda^2 - (jejak) lambda + det = 0
  jejak = 4, det = 3
  lambda^2 - 4 lambda + 3 = 0
  lambda = 3, 1

  Periksa: jumlah eigenvalue = jejak  -> 4 = 4
           hasil kali        = det    -> 3 = 3

--- eigenvector untuk tiap eigenvalue ---
  lambda=3  v=[1, 1]  A*v=[3, 3]  = 3*v -> True
  lambda=1  v=[1, -1]  A*v=[1, -1]  = 1*v -> True

--- kenakan A berulang pada vektor sembarang ---
   iterasi          arah (dinormalkan)    faktor
         1        [0.894427, 0.447214]    2.2361
         2        [0.780869, 0.624695]    2.8636
         3        [0.732793, 0.680451]    2.9837
         5        [0.710011, 0.704191]    2.9998
         8        [0.707215, 0.706999]    3.0000

  Arahnya menuju [0.7071, 0.7071] -- itu eigenvector
  untuk lambda=3, yang terbesar. Faktornya menuju 3.
  Inilah POWER ITERATION, dan inilah inti PageRank:
  eigenvector dari matriks tautan antar halaman.

--- PageRank pada empat halaman ---
  tautan: A->B,C   B->C   C->A   D->C

  halaman     peringkat
  C              0.3941  #######################
  A              0.3725  ######################
  B              0.1958  ###########
  D              0.0375  ##

  C tertinggi karena ditunjuk tiga halaman. A kedua
  meski cuma ditunjuk C -- karena C sendiri penting.
  D terendah: tidak ada yang menunjuknya.
  Angka ini eigenvector dari matriks tautan, dicari
  dengan cara yang sama seperti bagian 3.

--- tidak semua matriks punya eigenvector nyata ---
  putar 90 derajat: jejak=0, det=1
  diskriminan = -4 < 0 -> tidak ada
  eigenvalue nyata.

  Masuk akal: memutar bidang 90 derajat mengubah arah
  SETIAP vektor. Tidak ada satu arah pun yang bertahan.

--- pemakaian di Informatika ---
  PageRank      eigenvector matriks tautan halaman
  PCA           eigenvector matriks kovarians = arah ragam
  Grafika       matriks transformasi objek 3D
  Rekomendasi   faktorisasi matriks pengguna x barang
  Kompresi      SVD membuang komponen bernilai kecil
  Rantai Markov keadaan tunak = eigenvector lambda=1`,

  kesalahanUmum: [
    {
      salah: 'Mengira setiap matriks punya eigenvector nyata.',
      kenapa: 'Matriks yang memutar bidang mengubah arah setiap vektor, sehingga tidak ada arah yang bertahan dan persamaan karakteristiknya tidak punya akar nyata. Memaksakan pencarian eigenvector di situ menghasilkan akar kompleks yang tidak punya tafsiran geometris sederhana.',
      benar: 'Periksa diskriminan persamaan karakteristiknya lebih dulu, dan terima bahwa sebagian transformasi memang tidak punya arah yang bertahan.'
    },
    {
      salah: 'Menghitung eigenvalue tanpa memeriksanya dengan jejak dan determinan.',
      kenapa: 'Jumlah semua eigenvalue selalu sama dengan jejak dan hasil kalinya selalu sama dengan determinan. Dua pemeriksaan ini gratis dan menangkap hampir semua kekeliruan tanda maupun aritmetika.',
      benar: 'Setelah mendapat eigenvalue, jumlahkan dan kalikan lalu bandingkan dengan jejak dan determinannya.'
    },
    {
      salah: 'Menganggap eigenvector adalah satu vektor tertentu.',
      kenapa: 'Kalau v adalah eigenvector, maka setiap kelipatannya juga eigenvector dengan eigenvalue yang sama. Yang bermakna adalah arahnya, bukan panjangnya, sehingga jawaban yang berbeda panjang tetap sama benarnya.',
      benar: 'Sebutkan eigenvector sebagai arah, dan bila perlu normalkan panjangnya menjadi satu agar jawabannya seragam.'
    },
    {
      salah: 'Mengira power iteration selalu cepat menyatu.',
      kenapa: 'Kecepatannya ditentukan oleh perbandingan eigenvalue terbesar kedua terhadap yang terbesar. Bila keduanya berdekatan, komponen kedua menyusut sangat lambat dan iterasinya butuh jauh lebih banyak putaran.',
      benar: 'Perkirakan perbandingan kedua eigenvalue terbesar untuk menduga berapa putaran yang dibutuhkan, dan tetapkan syarat berhenti berdasarkan perubahan antar putaran.'
    },
    {
      salah: 'Menganggap faktor peredam pada PageRank sebagai penyesuaian yang dibuat-buat.',
      kenapa: 'Tanpa peredam, halaman yang tidak punya tautan keluar atau kelompok halaman yang saling menunjuk secara tertutup membuat perhitungannya tidak punya jawaban tunggal. Peredam mewakili pengguna yang sesekali berpindah ke halaman acak, dan itu yang menjamin jawabannya ada dan tunggal.',
      benar: 'Pahami peredam sebagai syarat matematis agar jawabannya tunggal, bukan sekadar angka yang dipilih untuk memperbagus hasil.'
    },
    {
      salah: 'Melewatkan sifat khusus matriks simetris.',
      kenapa: 'Matriks simetris dijamin punya eigenvalue nyata dan eigenvector yang saling tegak lurus. Sifat inilah yang membuat PCA bisa memakai arah-arah utama sebagai sumbu baru tanpa saling tumpang tindih, dan melewatkannya membuat PCA terasa seperti resep tanpa alasan.',
      benar: 'Periksa apakah matriksmu simetris, dan bila ya manfaatkan jaminan bahwa arah-arahnya saling tegak lurus.'
    }
  ],

  analogi: `Bayangkan **adonan roti yang diuleni**.

Setiap kali kamu menekan dan melipat, hampir semua titik di adonan berpindah dan **berubah arah**. Sebuah kismis di sisi kiri bisa berakhir di tengah, menghadap ke arah yang sama sekali lain.

Tetapi ada **beberapa garis** di adonan yang arahnya tidak pernah berubah. Garis di sepanjang arah kamu menekan cuma **memanjang**. Garis tegak lurus terhadapnya cuma **memendek**. Keduanya tetap menunjuk ke arah yang sama.

Itulah eigenvector, dan seberapa banyak ia memanjang atau memendek adalah eigenvalue-nya.

Sekarang uleni **seratus kali**.

Arah yang memanjang mendominasi sepenuhnya. Adonan yang tadinya bulat kini memanjang di satu arah — arah yang eigenvalue-nya terbesar. Semua arah lain tidak hilang, tetapi mereka **tidak lagi terlihat** di samping yang satu itu.

Itulah power iteration.

Dan pertanyaan yang dijawabnya berlaku jauh di luar adonan: **kalau proses ini diulang terus-menerus, apa yang tersisa?**

Untuk web, jawabannya adalah halaman yang penting. Untuk data, arah sebaran terbesarnya. Untuk rantai Markov, keadaan yang akhirnya stabil.

Pertanyaannya satu; jawabannya selalu eigenvector.`,

  latihan: [
    'Kenakan matriks 2x2 pada lima vektor berbeda, lalu tunjukkan mana yang arahnya bertahan dan mana yang berubah.',
    'Turunkan persamaan karakteristik dari A v sama dengan lambda v, dan jelaskan kenapa determinannya harus nol.',
    'Hitung eigenvalue sebuah matriks 2x2, lalu periksa dengan jejak dan determinannya.',
    'Untuk tiap eigenvalue, cari eigenvector-nya dan buktikan bahwa A v memang sama dengan lambda v.',
    'Jalankan power iteration delapan putaran pada vektor sembarang, dan tunjukkan arahnya menuju eigenvector terbesar.',
    'Jelaskan kenapa power iteration bekerja, dengan menulis vektor awal sebagai campuran eigenvector.',
    'Buat matriks yang tidak punya eigenvector nyata, dan jelaskan alasan geometrisnya.',
    'Hitung PageRank untuk graf kecil berisi lima halaman, lalu jelaskan kenapa peringkatnya keluar seperti itu.',
    'Jelaskan fungsi faktor peredam pada PageRank, dan apa yang terjadi tanpanya.',
    'Jelaskan kenapa sifat simetris matriks kovarians penting bagi PCA.'
  ]
});
