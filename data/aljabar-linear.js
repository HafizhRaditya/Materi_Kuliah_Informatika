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

   Tiga topik tambahan (kebebasan linear & rank, ortogonalitas &
   kuadrat terkecil, SVD) disusun dari REFERENSI LUAR --
   keterangan lengkapnya ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Pokok bahasan yang ada di RPS Aljabar Linear program studi
   informatika kampus lain tetapi belum ada di tiga topik di
   atas: basis dan ruang vektor (kebebasan linear, rank),
   ruang hasil kali dalam (ortogonalitas, Gram-Schmidt,
   kuadrat terkecil), dan dekomposisi nilai singular.

   Seluruh perhitungan memakai Python murni -- tanpa numpy --
   supaya setiap langkah terlihat. Program benar-benar
   dijalankan dan keluarannya disalin apa adanya. Data
   penilaian film dan citra di topik SVD adalah data TIRUAN.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'alin-rank-basis',
  judul: 'Kebebasan Linear, Basis & Rank',
  kategori: 'aljabar-linear',
  tag: ['bebas linear', 'basis', 'dimensi', 'rank', 'eselon baris tereduksi', 'multikolinearitas'],
  ringkas: 'Berapa arah yang benar-benar baru di sekumpulan vektor — satu angka yang menentukan apakah SPL punya jawaban, dan apakah sebuah kolom data berguna.',

  fungsi: `**Mengukur berapa banyak informasi yang benar-benar berbeda di sekumpulan vektor, dan memakai ukuran itu untuk menjawab pertanyaan tentang SPL dan data.**

Terpakai di:

- **Memeriksa SPL sebelum menyelesaikannya** — rank memberi tahu apakah jawabannya satu, tidak ada, atau tak hingga
- **Membersihkan data** — kolom yang bisa dihitung dari kolom lain tidak membawa informasi baru, dan membuat model regresi tidak punya jawaban tunggal
- **Grafika dan robotika** — apakah sekumpulan arah gerak benar-benar bisa menjangkau seluruh ruang
- **Kompresi dan pembelajaran mesin** — data yang rank-nya rendah bisa diringkas dengan jauh lebih sedikit angka, gagasan yang dilanjutkan di topik SVD

Yang paling penting dipahami: **banyaknya vektor tidak sama dengan banyaknya arah.** Tiga vektor di ruang tiga dimensi bisa saja cuma merentang sebuah bidang, kalau salah satunya bisa dibuat dari dua yang lain.

Dan alat yang menjawab semuanya sama: **eselon baris tereduksi.** Kolom yang punya pivot membawa arah baru; kolom tanpa pivot bisa dibuat dari kolom-kolom sebelumnya — dan koefisiennya tertulis di kolom itu sendiri.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung eselon baris tereduksi dengan pecahan tepat, membaca rank dan hubungan antar-kolom darinya, memakai rank untuk menentukan banyaknya jawaban SPL, dan menemukan kolom data yang berlebih.',
    alat: ['Python 3 dengan modul fractions', 'Kertas untuk eliminasi kecil'],
    langkah: [
      { judul: 'Susun vektornya sebagai kolom',
        isi: `Untuk memeriksa v1, v2, v3, letakkan ketiganya sebagai kolom matriks [v1 v2 v3].

Pertanyaan "apakah ada c1, c2, c3 tidak semuanya nol dengan c1v1 + c2v2 + c3v3 = 0" sama dengan pertanyaan "apakah matriks itu punya jawaban taktrivial untuk Ac = 0".` },
      { judul: 'Hitung eselon baris tereduksi dengan pecahan',
        isi: `Pakai \`fractions.Fraction\` supaya tidak ada pembulatan. Setiap pivot dijadikan 1, dan semua isi lain di kolom pivot dijadikan 0.

Dengan float, 1/3 × 3 bisa menjadi 0,9999999999999999, dan "apakah ini nol?" menjadi pertanyaan yang tidak punya jawaban pasti.` },
      { judul: 'Baca rank dari kolom pivot',
        isi: `Rank = banyaknya kolom pivot. Kalau rank sama dengan banyaknya vektor, semuanya bebas linear.

Kalau lebih kecil, setiap kolom tanpa pivot bisa dibuat dari kolom pivot sebelumnya.` },
      { judul: 'Baca koefisien hubungannya',
        isi: `Isi kolom tanpa pivot di eselon baris tereduksi adalah koefisiennya. Kalau kolom 3 berisi −1 dan 2 di baris pivot kolom 1 dan 2, maka v3 = −1·v1 + 2·v2.

Selalu periksa dengan menghitung kombinasinya kembali.` },
      { judul: 'Bandingkan rank A dengan rank [A|b]',
        isi: `Untuk SPL Ax = b dengan n peubah:

- rank [A|b] > rank A: tidak ada jawaban
- rank A = rank [A|b] = n: tepat satu jawaban
- rank A = rank [A|b] < n: tak hingga, dengan n − rank peubah bebas` },
      { judul: 'Periksa kolom data sebelum membuat model',
        isi: `Susun data sebagai matriks — baris adalah pengamatan, kolom adalah fitur — lalu hitung rank-nya.

Kalau rank lebih kecil dari banyaknya kolom, ada kolom yang bisa dihitung dari kolom lain. Buang salah satunya sebelum menjalankan regresi.` }
    ],
    cek: [
      'Kamu bisa menentukan apakah sekumpulan vektor bebas linear dari eselon baris tereduksinya',
      'Kamu bisa menuliskan vektor yang bergantung sebagai kombinasi vektor lain, dan hasilnya terbukti saat dihitung kembali',
      'Kamu bisa meramal banyaknya jawaban SPL dari rank sebelum menyelesaikannya',
      'Kamu memeriksa rank tabel fitur sebelum membuat model regresi'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa kolom tanpa pivot tidak membawa arah baru',

  konsep: `Topik SPL menyebut tiga kemungkinan jawaban: tepat satu, tidak ada, atau tak hingga. Topik ini menjelaskan **dari mana** tiga kemungkinan itu datang, dengan satu angka: **rank**.

**Kombinasi linear dan kebebasan linear**

Kombinasi linear dari v1, v2, v3 adalah c1v1 + c2v2 + c3v3 untuk bilangan c apa saja. Himpunan semua kombinasi linear itu disebut **rentang** vektor-vektornya.

Vektor-vektor disebut **bebas linear** kalau satu-satunya cara membuat vektor nol adalah semua c = 0. Kalau ada cara lain, salah satunya bisa dibuat dari yang lain — ia **bergantung**, dan tidak menambah apa pun ke rentangnya.

**Contoh: tiga vektor yang cuma merentang bidang**

v1 = [1, 2, 3], v2 = [4, 5, 6], v3 = [7, 8, 9]. Eselon baris tereduksi dari [v1 v2 v3]:

| | kolom 1 | kolom 2 | kolom 3 |
|---|---|---|---|
| baris 1 | **1** | 0 | −1 |
| baris 2 | 0 | **1** | 2 |
| baris 3 | 0 | 0 | 0 |

Pivot cuma di kolom 1 dan 2, jadi **rank = 2**. Kolom 3 tanpa pivot, dan isinya langsung memberi koefisiennya: **v3 = −1·v1 + 2·v2**. Periksa: −[1, 2, 3] + 2·[4, 5, 6] = [7, 8, 9].

Tiga vektor di ruang tiga dimensi, tetapi rentangnya cuma sebuah **bidang**. v3 tidak membawa arah baru.

Ganti v3 dengan [7, 8, 10] — beda satu angka — dan pivotnya ada di ketiga kolom. Rank 3, bebas linear, dan ketiganya menjadi **basis** R³: setiap vektor di ruang tiga dimensi bisa dibuat dari ketiganya dengan tepat satu cara.

**Basis, dimensi, dan koordinat**

**Basis** adalah himpunan vektor yang bebas linear dan merentang seluruh ruang. **Dimensi** adalah banyaknya vektor di basis — dan setiap basis dari ruang yang sama punya banyak vektor yang sama.

Koordinat selalu relatif terhadap basis. x = [5, 1] dalam basis biasa. Terhadap basis b1 = [1, 1], b2 = [1, −1], koordinatnya **(3, 2)**, karena 3·[1, 1] + 2·[1, −1] = [5, 1]. Vektornya sama; angkanya berbeda karena "penggarisnya" berbeda.

Ini bukan sekadar permainan notasi. Kompresi JPEG di Teknologi Multimedia menyimpan blok citra dalam **basis kosinus**, bukan basis piksel — karena di basis itu kebanyakan koordinatnya hampir nol dan bisa dibuang.

**Rank menentukan banyaknya jawaban SPL**

Untuk Ax = b dengan tiga peubah:

| Kasus | rank A | rank [A∣b] | Jawaban |
|---|---|---|---|
| rank penuh | 3 | 3 | tepat satu |
| rank 2, b sejalan | 2 | 2 | tak hingga, 1 peubah bebas |
| rank 2, b menyimpang | 2 | 3 | **tidak ada** |

Ketiga baris dibaca dengan cara yang sama:

- **rank [A∣b] > rank A**: menambahkan b menambah arah baru. b tidak bisa dibuat dari kolom-kolom A, jadi tidak ada x yang memenuhi Ax = b.
- **rank = banyaknya peubah**: setiap peubah "dikunci" satu pivot. Jawabannya tunggal.
- **rank < banyaknya peubah**: peubah tanpa pivot boleh diberi nilai apa saja, dan peubah lain menyesuaikan. Jawabannya tak hingga.

Ini aturan yang di buku teks disebut teorema Rouché–Capelli. Kasus proyek kalori di topik SPL adalah baris pertama: tiga menu, tiga persamaan, rank penuh, satu kombinasi.

**Kolom data yang berlebih**

Tabel nilai enam mahasiswa dengan kolom tugas, UTS, UAS, dan nilai akhir. Empat kolom, tetapi **rank = 3**. Eselon baris tereduksi menunjuk kolom yang tanpa pivot — nilai akhir — dan sekaligus menuliskan rumusnya:

**akhir = 1/5·tugas + 3/10·UTS + 1/2·UAS**

Kolom akhir tidak membawa informasi apa pun yang belum ada di tiga kolom lain. Kalau keempatnya dipakai bersama sebagai peubah penjelas dalam regresi, persamaan normalnya tidak punya jawaban tunggal — masalah yang di statistika disebut **multikolinearitas**. Pustaka statistik biasanya memperingatkan atau diam-diam membuang satu kolom; lebih baik kamu yang menemukannya lebih dulu.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "from fractions import Fraction as F\n\ndef rref(M):\n    A = [[F(x) for x in baris] for baris in M]\n    m, n = len(A), len(A[0])\n    pivot, r = [], 0\n    for c in range(n):\n        p = next((i for i in range(r, m) if A[i][c] != 0), None)\n        if p is None:\n            continue                  # kolom ini tanpa pivot\n        A[r], A[p] = A[p], A[r]\n        A[r] = [x / A[r][c] for x in A[r]]\n        for i in range(m):\n            if i != r and A[i][c] != 0:\n                k = A[i][c]\n                A[i] = [a - k * b for a, b in zip(A[i], A[r])]\n        pivot.append(c)\n        r += 1\n    return A, pivot",
      penjelasan: `Eliminasi Gauss-Jordan dalam belasan baris — dan dua keputusan kecil di dalamnya yang menentukan apakah hasilnya bisa dipercaya.

**Kenapa \`Fraction\`.**

Rank adalah soal "apakah sebuah isi tepat nol atau tidak". Dengan float, eliminasi menghasilkan sisa seperti 4,4 × 10⁻¹⁶ di tempat yang seharusnya nol. Apakah itu nol? Tidak ada jawaban pasti — harus memilih ambang, dan ambang yang salah memberi rank yang salah.

Dengan pecahan, tidak ada sisa. Nol adalah nol. Untuk matriks kecil dan angka bulat — kebanyakan soal kuliah dan banyak data bersih — ini cara yang paling jujur. Untuk matriks besar dari data pengukuran, pustaka numerik menghitung rank dengan SVD dan ambang yang dipilih dari ketelitian float, bahan topik SVD.

**Kenapa baris pivot dicari, bukan diambil begitu saja.**

\`next(...)\` mencari baris pertama dari r ke bawah yang isinya di kolom c tidak nol. Kalau tidak ada, kolom itu dilewati: **ia tidak punya pivot**, dan r tidak bertambah. Kolom berikutnya diperiksa di baris yang sama.

Inilah yang membuat kolom tanpa pivot muncul. Kolom itu sudah "habis" dinolkan oleh kolom-kolom sebelumnya — artinya ia sudah bisa dibuat dari mereka.

**Kenapa semua baris dinolkan, bukan cuma yang di bawah.**

Eliminasi Gauss biasa cuma menolkan di bawah pivot, menghasilkan bentuk tangga. Gauss-Jordan menolkan di atas juga (\`for i in range(m)\`, bukan \`range(r + 1, m)\`).

Hasilnya: setiap kolom pivot menjadi kolom satuan — satu angka 1, sisanya 0. Dan kolom tanpa pivot kemudian berisi **tepat** koefisien yang dibutuhkan untuk membuatnya dari kolom-kolom pivot. Tidak perlu substitusi balik.

**Kenapa isi kolom tanpa pivot adalah koefisiennya.**

Operasi baris tidak mengubah hubungan linear antar-kolom. Kalau di matriks akhir kolom 3 = −1·kolom 1 + 2·kolom 2 — dan itu jelas terlihat, karena kolom 1 dan 2 sudah menjadi [1, 0, 0] dan [0, 1, 0] — maka hubungan yang sama berlaku di matriks asli. Jadi v3 = −v1 + 2v2.

Sifat ini yang membuat eselon baris tereduksi berguna jauh melampaui menyelesaikan SPL: ia sekaligus menunjukkan kolom mana yang berlebih dan bagaimana kolom itu dibuat.`
    },
    {
      bahasa: 'python',
      kode: "for nama, M, b in kasus:\n    rA  = len(rref(M)[1])\n    rAb = len(rref([baris + [bi] for baris, bi in zip(M, b)])[1])\n    if rA < rAb:\n        jawab = 'TIDAK ADA'\n    elif rA == len(M[0]):\n        jawab = 'tepat satu'\n    else:\n        jawab = 'tak hingga (' + str(len(M[0]) - rA) + ' bebas)'\n\n# rank penuh            3  3  tepat satu\n# rank 2, b sejalan     2  2  tak hingga (1 bebas)\n# rank 2, b menyimpang  2  3  TIDAK ADA",
      penjelasan: `Tiga cabang \`if\` yang menggantikan seluruh tabel kasus SPL — dan setiap cabangnya punya alasan geometris.

**Cabang pertama: rank [A|b] lebih besar.**

Kolom-kolom A merentang sebuah ruang — di contoh ini bidang, karena rank A = 2. SPL Ax = b bertanya: bisakah b dibuat sebagai kombinasi kolom-kolom A?

Kalau menambahkan b sebagai kolom ke-4 menaikkan rank, berarti b membawa arah yang **tidak ada** di bidang itu. b menunjuk keluar bidang. Tidak ada kombinasi kolom A yang bisa menjangkaunya.

Di contoh: b = [6, 15, 24] ada di bidang (rank tetap 2), tetapi b = [6, 15, 25] — beda satu angka — sudah keluar.

**Cabang kedua: rank sama dengan banyaknya peubah.**

Setiap peubah punya pivot, dan setiap pivot "mengunci" nilai peubahnya. Tidak ada kebebasan tersisa. Satu jawaban.

Ini juga syarat matriks persegi punya invers: rank penuh sama dengan determinan tidak nol — yang dibahas di topik vektor dan matriks.

**Cabang ketiga: rank lebih kecil dari banyaknya peubah.**

b bisa dijangkau, tetapi ada peubah tanpa pivot. Peubah itu boleh diberi nilai apa saja, dan peubah pivot menyesuaikan supaya persamaannya tetap terpenuhi. Setiap pilihan memberi jawaban yang berbeda — tak hingga banyaknya.

Banyaknya peubah bebas adalah banyaknya peubah dikurangi rank. Dalam bahasa aljabar linear, itu dimensi **ruang nol** A: ruang semua x yang memenuhi Ax = 0. Setiap jawaban SPL adalah satu jawaban khusus ditambah sembarang anggota ruang nol itu.

**Kenapa ini lebih baik daripada langsung menyelesaikan.**

Kode yang langsung menghitung invers akan gagal di baris kedua dan ketiga dengan pesan "matriks singular" — tanpa memberi tahu apakah masalahnya tidak ada jawaban atau terlalu banyak jawaban. Kode yang lebih buruk, dengan float, bahkan tidak gagal: ia mengembalikan angka-angka raksasa yang tidak berarti.

Memeriksa rank lebih dulu memberi diagnosis yang jelas sebelum perhitungan apa pun yang bisa menyesatkan.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Kebebasan linear, basis, dan rank
# ============================================
from fractions import Fraction as F

def rref(M):
    """Bentuk eselon baris tereduksi dengan pecahan tepat.
    Mengembalikan (matriks hasil, daftar kolom pivot)."""
    A = [[F(x) for x in baris] for baris in M]
    m, n = len(A), len(A[0])
    pivot, r = [], 0
    for c in range(n):
        p = next((i for i in range(r, m) if A[i][c] != 0), None)
        if p is None:
            continue                       # kolom ini tidak punya pivot
        A[r], A[p] = A[p], A[r]
        A[r] = [x / A[r][c] for x in A[r]]
        for i in range(m):
            if i != r and A[i][c] != 0:
                k = A[i][c]
                A[i] = [a - k * b for a, b in zip(A[i], A[r])]
        pivot.append(c)
        r += 1
        if r == m:
            break
    return A, pivot

def tulis(A, awal="  "):
    for baris in A:
        print(awal + "[" + "  ".join(format(str(x), ">5") for x in baris) + " ]")

def kolom(vektor):
    """Susun vektor-vektor sebagai kolom matriks."""
    return [list(baris) for baris in zip(*vektor)]

# --------------------------------------------
# 1. Bebas linear atau tidak?
# --------------------------------------------
print("--- apakah v1, v2, v3 bebas linear? ---")
v1, v2, v3 = [1, 2, 3], [4, 5, 6], [7, 8, 9]
print("  v1 = " + str(v1) + ", v2 = " + str(v2) + ", v3 = " + str(v3))
R, piv = rref(kolom([v1, v2, v3]))
print("\n  eselon baris tereduksi dari [v1 v2 v3]:")
tulis(R)
print("\n  kolom pivot : " + str([p + 1 for p in piv]) + "   -> rank = " + str(len(piv)))
print("  kolom 3 tanpa pivot: v3 bisa dibuat dari v1 dan v2")
a, b = R[0][2], R[1][2]           # isi kolom 3 = koefisiennya
print("  koefisiennya dibaca dari kolom 3: v3 = ("
      + str(a) + ")*v1 + (" + str(b) + ")*v2")
gabung = [int(a * x + b * y) for x, y in zip(v1, v2)]
print("  cek: (" + str(a) + ")*v1 + (" + str(b) + ")*v2 = " + str(gabung))
print()
print("  Tiga vektor di ruang 3 dimensi, tetapi cuma merentang BIDANG")
print("  (2 dimensi). v3 tidak membawa arah baru apa pun.")

print("\n  bandingkan dengan w3 = [7, 8, 10]:")
_, piv = rref(kolom([v1, v2, [7, 8, 10]]))
print("  kolom pivot : " + str([p + 1 for p in piv]) + "   -> rank = " + str(len(piv))
      + " -> bebas linear, basis R^3")

# --------------------------------------------
# 2. Rank menentukan banyaknya jawaban SPL
# --------------------------------------------
print("\n--- rank dan banyaknya jawaban SPL Ax = b (3 peubah) ---")
A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
kasus = [
    ("rank penuh", [[1, 2, 3], [4, 5, 6], [7, 8, 10]], [6, 15, 25]),
    ("rank 2, b sejalan", A, [6, 15, 24]),
    ("rank 2, b menyimpang", A, [6, 15, 25]),
]
print("  kasus                 rank A  rank [A|b]  jawaban")
for nama, M, b in kasus:
    rA = len(rref(M)[1])
    rAb = len(rref([baris + [bi] for baris, bi in zip(M, b)])[1])
    if rA < rAb:
        jawab = "TIDAK ADA"
    elif rA == len(M[0]):
        jawab = "tepat satu"
    else:
        jawab = "tak hingga (" + str(len(M[0]) - rA) + " bebas)"
    print("  " + format(nama, "<21") + format(rA, ">6") + format(rAb, ">11") + "   " + jawab)
print()
print("  rank [A|b] > rank A : b membawa arah yang tidak bisa dibuat")
print("                        kolom A -> mustahil")
print("  rank = banyak peubah: setiap peubah 'dikunci' satu pivot")
print("  rank < banyak peubah: peubah tanpa pivot bebas memilih nilai")

# --------------------------------------------
# 3. Koordinat terhadap basis lain
# --------------------------------------------
print("\n--- koordinat x = [5, 1] terhadap basis b1 = [1, 1], b2 = [1, -1] ---")
R, _ = rref([[1, 1, 5], [1, -1, 1]])
c1, c2 = R[0][2], R[1][2]
print("  selesaikan c1*b1 + c2*b2 = x  ->  c1 = " + str(c1) + ", c2 = " + str(c2))
print("  cek: " + str(c1) + "*[1, 1] + " + str(c2) + "*[1, -1] = "
      + str([int(c1 + c2), int(c1 - c2)]))
print("  Vektor yang sama, angka yang berbeda: koordinat selalu")
print("  relatif terhadap basis yang dipilih.")

# --------------------------------------------
# 4. Kolom data yang berlebih
# --------------------------------------------
print("\n--- tabel nilai: adakah kolom yang tidak membawa informasi? ---")
nilai = [  # tugas, uts, uas, akhir = 0.2 tugas + 0.3 uts + 0.5 uas
    [80, 70, 75], [90, 60, 85], [70, 85, 65],
    [85, 75, 90], [60, 90, 70], [95, 80, 60],
]
data = [[t, u, s, F(2, 10) * t + F(3, 10) * u + F(5, 10) * s] for t, u, s in nilai]
print("  tugas  uts  uas  akhir")
for t, u, s, a in data:
    print("  " + format(t, ">5") + format(u, ">5") + format(s, ">5") + format(float(a), ">7.1f"))
R, piv = rref(data)
print("\n  4 kolom, rank = " + str(len(piv)))
print("  kolom tanpa pivot: " + str([["tugas", "uts", "uas", "akhir"][c]
                                     for c in range(4) if c not in piv]))
print("  kolom akhir dibaca dari RREF: "
      + " + ".join(str(R[i][3]) + "*" + ["tugas", "uts", "uas"][piv[i]] for i in range(3)))
print()
print("  Kolom 'akhir' sepenuhnya ditentukan tiga kolom lain. Model")
print("  regresi yang memakai keempatnya tidak punya jawaban tunggal")
print("  -- masalah yang di statistika disebut multikolinearitas.")` },
  output: `--- apakah v1, v2, v3 bebas linear? ---
  v1 = [1, 2, 3], v2 = [4, 5, 6], v3 = [7, 8, 9]

  eselon baris tereduksi dari [v1 v2 v3]:
  [    1      0     -1 ]
  [    0      1      2 ]
  [    0      0      0 ]

  kolom pivot : [1, 2]   -> rank = 2
  kolom 3 tanpa pivot: v3 bisa dibuat dari v1 dan v2
  koefisiennya dibaca dari kolom 3: v3 = (-1)*v1 + (2)*v2
  cek: (-1)*v1 + (2)*v2 = [7, 8, 9]

  Tiga vektor di ruang 3 dimensi, tetapi cuma merentang BIDANG
  (2 dimensi). v3 tidak membawa arah baru apa pun.

  bandingkan dengan w3 = [7, 8, 10]:
  kolom pivot : [1, 2, 3]   -> rank = 3 -> bebas linear, basis R^3

--- rank dan banyaknya jawaban SPL Ax = b (3 peubah) ---
  kasus                 rank A  rank [A|b]  jawaban
  rank penuh                3          3   tepat satu
  rank 2, b sejalan         2          2   tak hingga (1 bebas)
  rank 2, b menyimpang      2          3   TIDAK ADA

  rank [A|b] > rank A : b membawa arah yang tidak bisa dibuat
                        kolom A -> mustahil
  rank = banyak peubah: setiap peubah 'dikunci' satu pivot
  rank < banyak peubah: peubah tanpa pivot bebas memilih nilai

--- koordinat x = [5, 1] terhadap basis b1 = [1, 1], b2 = [1, -1] ---
  selesaikan c1*b1 + c2*b2 = x  ->  c1 = 3, c2 = 2
  cek: 3*[1, 1] + 2*[1, -1] = [5, 1]
  Vektor yang sama, angka yang berbeda: koordinat selalu
  relatif terhadap basis yang dipilih.

--- tabel nilai: adakah kolom yang tidak membawa informasi? ---
  tugas  uts  uas  akhir
     80   70   75   74.5
     90   60   85   78.5
     70   85   65   72.0
     85   75   90   84.5
     60   90   70   74.0
     95   80   60   73.0

  4 kolom, rank = 3
  kolom tanpa pivot: ['akhir']
  kolom akhir dibaca dari RREF: 1/5*tugas + 3/10*uts + 1/2*uas

  Kolom 'akhir' sepenuhnya ditentukan tiga kolom lain. Model
  regresi yang memakai keempatnya tidak punya jawaban tunggal
  -- masalah yang di statistika disebut multikolinearitas.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Eselon baris tereduksi matriks m × n', waktu: 'O(m · n · min(m, n))', memori: 'O(m · n)' },
      { operasi: 'Rank dari eselon baris', waktu: 'O(1)', memori: 'banyaknya kolom pivot' },
      { operasi: 'Memeriksa banyaknya jawaban SPL', waktu: 'dua kali eselon baris', memori: 'A dan [A∣b]' },
      { operasi: 'Pecahan tepat vs float', waktu: 'pecahan bisa jauh lebih lambat', memori: 'pembilang dan penyebut bisa membesar' }
    ],
    intuisi: `Eliminasi melakukan paling banyak min(m, n) langkah pivot, dan setiap langkah memperbarui seluruh matriks — itulah O(m · n · min(m, n)), kira-kira n³ untuk matriks persegi, sama dengan eliminasi Gauss di topik SPL.

Baris terakhir adalah pertukaran yang harus disadari. Pecahan memberi jawaban tepat, tetapi pembilang dan penyebutnya bisa tumbuh sangat besar di matriks yang besar, sehingga setiap operasi makin mahal. Untuk soal kuliah dan tabel data kecil, itu tidak terasa. Untuk matriks ribuan baris dari data pengukuran — yang toh tidak pernah tepat — pustaka numerik memakai float dengan ambang toleransi, dan menghitung rank dari nilai singular.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap n vektor di ruang n dimensi pasti membentuk basis.',
      kenapa: 'Vektor-vektor itu harus bebas linear. [1, 2, 3], [4, 5, 6], dan [7, 8, 9] adalah tiga vektor di R³ tetapi cuma merentang sebuah bidang.',
      benar: 'Hitung rank matriks yang kolomnya vektor-vektor itu, dan pastikan sama dengan n.'
    },
    {
      salah: 'Menghitung rank dengan float lalu memeriksa apakah sebuah isi sama dengan nol.',
      kenapa: 'Eliminasi dengan float meninggalkan sisa pembulatan seperti 1e-16 di tempat yang seharusnya nol, sehingga rank terhitung lebih besar dari sebenarnya.',
      benar: 'Pakai pecahan tepat untuk matriks kecil, atau ambang toleransi yang dipilih dari ketelitian float dan besar isi matriks.'
    },
    {
      salah: 'Membaca koefisien hubungan dari kolom tanpa pivot dengan tanda dibalik.',
      kenapa: 'Isi kolom tanpa pivot di eselon baris tereduksi langsung adalah koefisiennya: kolom berisi −1 dan 2 berarti v3 = −v1 + 2v2. Membalik tanda memberi hubungan yang salah.',
      benar: 'Baca isinya apa adanya, lalu selalu periksa dengan menghitung kombinasinya kembali.'
    },
    {
      salah: 'Menyimpulkan SPL tidak punya jawaban karena matriksnya singular.',
      kenapa: 'Matriks singular bisa berarti tidak ada jawaban atau tak hingga jawaban, tergantung apakah b berada di rentang kolom A.',
      benar: 'Bandingkan rank A dengan rank [A∣b] untuk membedakan kedua kasus.'
    },
    {
      salah: 'Memasukkan semua kolom data ke model regresi tanpa memeriksa ketergantungannya.',
      kenapa: 'Kolom yang merupakan kombinasi kolom lain, seperti nilai akhir yang dihitung dari tugas, UTS, dan UAS, membuat persamaan normal singular sehingga koefisiennya tidak tunggal.',
      benar: 'Hitung rank tabel fitur, temukan kolom tanpa pivot, dan buang kolom yang berlebih.'
    },
    {
      salah: 'Menganggap koordinat sebuah vektor adalah sifat vektor itu sendiri.',
      kenapa: 'Koordinat bergantung pada basis. [5, 1] di basis biasa adalah (3, 2) di basis [1, 1] dan [1, −1].',
      benar: 'Selalu sebut basisnya saat menulis koordinat, dan ubah basis dengan menyelesaikan SPL.'
    }
  ],

  analogi: `Bayangkan kamu menyusun **resep minuman** dari tiga bahan dasar: kopi, susu, dan gula.

**Bebas linear.** Tiga bahan itu bebas linear: tidak ada yang bisa dibuat dari campuran dua yang lain. Kopi tidak bisa dibuat dari susu dan gula. Dengan ketiganya, kamu bisa membuat minuman dengan takaran kopi, susu, dan gula apa pun — tiga "arah" rasa, tiga dimensi.

**Bergantung.** Sekarang temanmu menambahkan bahan keempat: **kopi susu kemasan** — yang isinya sebenarnya satu bagian kopi dan dua bagian susu. Rak bahanmu sekarang punya empat botol, tetapi kamu tidak bisa membuat satu minuman pun yang sebelumnya tidak bisa kamu buat. Kopi susu kemasan bisa dibuat dari kopi dan susu. Empat botol, tetapi tetap tiga dimensi. Rank-nya 3.

Kopi susu kemasan itu adalah kolom tanpa pivot. Dan resepnya — "satu kopi, dua susu" — adalah isi kolom itu di eselon baris tereduksi.

**Basis dan koordinat.** Warung sebelah tidak menjual kopi dan susu terpisah. Mereka punya "kopi hitam kental" dan "kopi susu encer". Dua botol itu tetap bisa membuat semua campuran kopi-dan-susu yang bisa kamu buat — hanya takarannya berbeda. Minuman yang sama; resep yang ditulis dengan angka berbeda karena bahan dasarnya berbeda. Itulah koordinat terhadap basis lain.

**SPL.** Pelanggan memesan minuman dengan rasa tertentu. Kalau rasanya bisa dibuat dari bahan di rak — rank tidak naik saat pesanan ditambahkan — kamu bisa membuatnya. Kalau pelanggan minta **teh**, dan tidak ada teh di rak, tidak ada takaran kopi, susu, dan gula yang bisa membuatnya. Pesanan itu menambah arah baru: rank [A∣b] lebih besar dari rank A.

Dan kalau kamu punya kopi susu kemasan **dan** kopi **dan** susu, satu pesanan bisa dibuat dengan banyak cara — lebih banyak kemasan dan lebih sedikit kopi terpisah, atau sebaliknya. Tak hingga resep untuk minuman yang sama. Itulah peubah bebas.`,

  latihan: [
    'Tentukan apakah [1, 0, 2], [0, 1, 3], dan [2, 3, 13] bebas linear, dan kalau tidak, tulis hubungannya.',
    'Hitung eselon baris tereduksi matriks 3 × 4 pilihanmu dengan fungsi rref, lalu periksa hasilnya dengan tangan.',
    'Beri contoh tiga vektor di R³ yang rank-nya 1, dan jelaskan secara geometris apa yang mereka rentang.',
    'Tentukan koordinat [7, 3] terhadap basis [2, 1] dan [1, 1].',
    'Buat SPL tiga peubah yang tidak punya jawaban, lalu tunjukkan dengan rank A dan rank [A∣b].',
    'Buat SPL tiga peubah dengan tak hingga jawaban, tentukan banyaknya peubah bebas, dan tuliskan dua jawaban berbeda.',
    'Tambahkan kolom "rata-rata UTS dan UAS" ke tabel nilai di topik ini, lalu tentukan rank tabel baru dan kolom mana yang berlebih.',
    'Jalankan eliminasi yang sama dengan float untuk matriks [1, 2, 3], [4, 5, 6], [7, 8, 9], lalu tunjukkan isi yang seharusnya nol.',
    'Jelaskan kenapa matriks persegi punya invers tepat ketika rank-nya penuh.',
    'Jelaskan dengan kata-katamu sendiri kenapa operasi baris tidak mengubah hubungan linear antar-kolom.'
  ]
});


TOPICS.push({
  id: 'alin-ortogonal',
  judul: 'Ortogonalitas, Gram-Schmidt & Kuadrat Terkecil',
  kategori: 'aljabar-linear',
  tag: ['ortogonal', 'proyeksi', 'basis ortonormal', 'Gram-Schmidt', 'kuadrat terkecil', 'persamaan normal', 'QR'],
  ringkas: 'Titik terdekat selalu dicapai lewat garis tegak lurus — dan dari satu fakta itu lahir regresi linear, basis yang mudah dipakai, dan cara menyelesaikan SPL yang tidak punya jawaban.',

  fungsi: `**Menemukan titik terdekat di sebuah ruang, membangun basis yang vektornya saling tegak lurus, dan memberi jawaban terbaik untuk SPL yang tidak punya jawaban tepat.**

Terpakai di:

- **Regresi dan pencocokan kurva** — garis terbaik melewati data adalah jawaban kuadrat terkecil sebuah SPL yang terlalu banyak persamaannya
- **Grafika 3D** — memproyeksikan titik ke bidang, membangun sumbu kamera yang saling tegak lurus
- **Pengolahan sinyal** — dekomposisi ke basis yang saling tegak lurus, seperti basis kosinus di JPEG
- **Pustaka numerik** — dekomposisi QR, yang dibangun dari gagasan Gram-Schmidt, adalah cara standar menyelesaikan masalah kuadrat terkecil

Yang paling penting dipahami: **sisa dari proyeksi selalu tegak lurus.** Titik terdekat dari b ke sebuah garis atau bidang adalah titik di mana garis penghubungnya tegak lurus garis atau bidang itu. Semua isi topik ini adalah akibat dari satu fakta itu.

Dan satu pelajaran numerik yang terlihat di program: **rumus yang sama bisa tidak sama tahan terhadap pembulatan.** Gram-Schmidt klasik dan termodifikasi setara secara matematis, tetapi yang klasik kehilangan ketegaklurusannya saat vektornya hampir sejajar.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung proyeksi dan membuktikan sisanya tegak lurus, membangun basis ortonormal dengan Gram-Schmidt termodifikasi, dan menyelesaikan SPL yang terlalu banyak persamaannya dengan kuadrat terkecil.',
    alat: ['Python 3 dengan modul math', 'Kertas untuk proyeksi dua dimensi'],
    langkah: [
      { judul: 'Hitung proyeksi dan sisanya',
        isi: `Proyeksi b pada arah a: \`(a·b / a·a) a\`. Sisanya: b dikurangi proyeksi.

Hitung hasil kali titik sisa dengan a. Kalau bukan nol (sampai pembulatan), ada yang salah.` },
      { judul: 'Gambar di bidang',
        isi: `Untuk b = [3, 4] dan a = [1, 1], gambar b, garis arah a, titik proyeksi [3,5; 3,5], dan sisa [−0,5; 0,5].

Sisa itu adalah garis dari b ke titik terdekat di garis a — dan ia tegak lurus garis a.` },
      { judul: 'Tulis Gram-Schmidt termodifikasi',
        isi: `Untuk setiap vektor v, kurangi komponennya di arah setiap q yang sudah ada — dengan koefisien dihitung dari w yang **sudah dikurangi sebagian**, bukan dari v asli. Lalu normalkan.

Perbedaan dengan versi klasik cuma satu kata di satu baris, tetapi menentukan ketahanannya terhadap pembulatan.` },
      { judul: 'Periksa ketegaklurusan hasilnya',
        isi: `Hitung QᵀQ — setiap pasangan qᵢ·qⱼ — dan bandingkan dengan matriks identitas. Simpangan terbesarnya adalah ukuran seberapa ortonormal basisnya.

Coba dengan vektor yang hampir sejajar, dan bandingkan versi klasik dengan termodifikasi.` },
      { judul: 'Susun SPL dari data',
        isi: `Untuk mencocokkan garis y = c0 + c1·x ke n titik, setiap titik memberi satu persamaan: c0 + c1·xᵢ = yᵢ. Matriks A punya kolom semua-satu dan kolom x.

Dengan n > 2, SPL ini hampir pasti tidak punya jawaban tepat.` },
      { judul: 'Selesaikan persamaan normal',
        isi: `Hitung AᵀA (2 × 2) dan Aᵀy (2 × 1), lalu selesaikan AᵀA c = Aᵀy. Untuk dua peubah, Cramer atau invers 2 × 2 cukup.

Periksa: sisa y − Ac harus tegak lurus setiap kolom A.` }
    ],
    cek: [
      'Proyeksi yang kamu hitung punya sisa yang tegak lurus arah proyeksinya',
      'Basis ortonormal hasil Gram-Schmidt-mu memberi QᵀQ yang dekat dengan identitas',
      'Kamu bisa menunjukkan bahwa Gram-Schmidt klasik gagal pada vektor yang hampir sejajar',
      'Garis kuadrat terkecilmu sama dengan hasil regresi di Probabilitas dan Statistika untuk data yang sama'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa jarak terdekat selalu tegak lurus',

  konsep: `Topik vektor dan matriks memperkenalkan hasil kali titik untuk mengukur kemiripan arah. Topik ini memakainya untuk satu hal lagi: **ketegaklurusan**. Dua vektor ortogonal — tegak lurus — kalau hasil kali titiknya nol.

**Proyeksi: bayangan di sebuah arah**

Proyeksi b pada arah a adalah titik di garis a yang **paling dekat** ke b:

proyeksi = (a·b / a·a) · a

| Arah | Proyeksi b = [3, 4] | Sisa | Sisa · arah |
|---|---|---|---|
| a = [4, 0] | [3, 0] | [0, 4] | 0 |
| c = [1, 1] | [3,5; 3,5] | [−0,5; 0,5] | 0 |

Sisanya — b dikurangi proyeksinya — **selalu** tegak lurus arahnya.

Kenapa titik terdekat harus di situ? Kalau sisanya tidak tegak lurus, menggeser titik sedikit di sepanjang garis akan memperpendek sisa itu — seperti menurunkan kaki segitiga siku-siku. Hanya saat tegak lurus tidak ada lagi arah geser yang memperpendeknya. Itu teorema Pythagoras, dipakai dalam arah sebaliknya.

**Basis ortonormal: basis yang paling mudah dipakai**

Basis ortonormal adalah basis yang vektornya saling tegak lurus dan masing-masing panjangnya 1. Dengan basis seperti itu, koordinat sebuah vektor cuma **hasil kali titiknya** dengan setiap vektor basis — tanpa perlu menyelesaikan SPL seperti di topik rank dan basis.

**Gram-Schmidt: membuat basis ortonormal dari basis apa pun**

Ambil vektor pertama, normalkan. Ambil vektor kedua, buang bagiannya yang searah vektor pertama — itu proyeksi — lalu normalkan sisanya. Ambil vektor ketiga, buang bagiannya yang searah kedua vektor sebelumnya, normalkan. Dan seterusnya.

Dari [1, 1, 0], [1, 0, 1], [0, 1, 1]:

| | Hasil | Panjang |
|---|---|---|
| q1 | [0,7071; 0,7071; 0] | 1 |
| q2 | [0,4082; −0,4082; 0,8165] | 1 |
| q3 | [−0,5774; 0,5774; 0,5774] | 1 |

Hasil kali titik setiap pasangan sekitar 10⁻¹⁶ — nol sampai ketelitian float.

**Rumus sama, ketahanan berbeda**

Ada dua cara menghitung koefisien pembuangan: dari vektor **asli** v (klasik), atau dari vektor yang **sudah dikurangi sebagian** (termodifikasi). Secara matematis keduanya menghasilkan hal yang sama. Dengan float, tidak:

| e | Galat klasik | Galat termodifikasi |
|---|---|---|
| 0,01 | 1,8 × 10⁻¹² | 2,2 × 10⁻¹⁴ |
| 10⁻⁵ | 4,8 × 10⁻⁸ | 5,9 × 10⁻¹³ |
| 10⁻⁸ | **5,0 × 10⁻¹** | 7,1 × 10⁻⁹ |

Vektornya [1, e, 0, 0], [1, 0, e, 0], [1, 0, 0, e] — hampir sejajar kalau e kecil. "Galat" adalah simpangan terbesar QᵀQ dari identitas. Galat 0,5 berarti dua "vektor tegak lurus" hasil versi klasik sebenarnya membentuk sudut 60 derajat. Versi termodifikasi juga tidak sempurna — galatnya ikut membesar saat vektornya makin sejajar — tetapi jauh lebih tahan.

**Kuadrat terkecil: jawaban terbaik untuk SPL tanpa jawaban**

Delapan titik data — pengguna serentak dan waktu respons — dan kita ingin garis y = c0 + c1·x. Setiap titik memberi satu persamaan. Delapan persamaan, dua peubah: tidak ada c0, c1 yang memenuhi semuanya.

Dalam bahasa ruang kolom: y tidak berada di rentang kolom A. Jadi yang dicari adalah titik di rentang kolom A yang **paling dekat** ke y — proyeksi y ke ruang kolom A. Dan karena sisanya harus tegak lurus setiap kolom A:

Aᵀ(y − Ac) = 0, yaitu **AᵀA c = Aᵀy**

Itulah **persamaan normal**. Untuk data ini, AᵀA = [[8, 360], [360, 20400]], dan jawabannya **c0 = 31,70, c1 = 1,306**. Sisanya dikali kolom semua-satu memberi 2,8 × 10⁻¹³, dan dikali kolom x memberi 1,6 × 10⁻¹¹ — nol sampai pembulatan.

Garis ini persis sama dengan garis regresi di topik korelasi dan regresi Probabilitas dan Statistika, yang dihitung dengan rumus Sxy/Sxx. Dua mata kuliah, dua rumus, satu garis — karena regresi linear **adalah** proyeksi.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def gram_schmidt(vs, termodifikasi=False):\n    qs = []\n    for v in vs:\n        w = list(v)\n        for q in qs:\n            # klasik: koefisien dari v ASLI\n            # termodifikasi: dari w yang SUDAH dikurangi\n            k = dot(q, w) if termodifikasi else dot(q, v)\n            w = kurang(w, kali(k, q))\n        qs.append(kali(1 / norma(w), w))\n    return qs\n\n# [1,e,0,0], [1,0,e,0], [1,0,0,e] dengan e = 1e-8:\n#   galat klasik 5.0e-01   termodifikasi 7.1e-09",
      penjelasan: `Sepuluh baris, dan perbedaan antara hasil yang benar dan hasil yang salah sepenuhnya ada di satu ekspresi bersyarat.

**Apa yang dilakukan setiap putaran dalam.**

w dimulai sebagai salinan v. Untuk setiap q yang sudah jadi, bagian w yang searah q dibuang: \`w − (q·w) q\`. Karena q panjangnya 1, q·w adalah panjang bayangan w pada q — proyeksi dari topik ini, dengan penyebut a·a = 1.

Setelah semua q diproses, w tegak lurus semua q sebelumnya. Dinormalkan, ia menjadi q baru.

**Kenapa klasik dan termodifikasi setara secara matematis.**

Setelah bagian searah q1 dibuang, w tegak lurus q1. Koefisien untuk q2 dari v asli adalah q2·v; dari w, q2·w = q2·(v − (q1·v)q1) = q2·v − (q1·v)(q2·q1). Karena q2 tegak lurus q1, suku terakhir nol, dan keduanya sama.

Kata kuncinya: **karena q2 tegak lurus q1**. Di atas kertas, itu tepat. Dengan float, q2·q1 bukan nol melainkan sekitar 10⁻¹⁶ — atau jauh lebih besar kalau q2 sendiri dihitung dengan galat.

**Kenapa klasik gagal pada vektor yang hampir sejajar.**

Vektor [1, e, 0, 0] dan [1, 0, e, 0] dengan e = 10⁻⁸ hampir sama. Membuang bagian searah dari yang kedua berarti mengurangkan dua bilangan yang hampir sama — pembatalan, sama dengan masalah turunan numerik di Matematika Dasar. Yang tersisa kecil, dan sebagian besar digitnya galat pembulatan.

Versi klasik lalu menghitung koefisien untuk q berikutnya dari v asli, yang **masih** memuat komponen besar di arah q1. Galat kecil di q2 dikalikan komponen besar itu, dan hasilnya galat besar di q3. Galat 0,5 di tabel artinya q2 dan q3 tidak tegak lurus sama sekali.

**Kenapa termodifikasi bertahan.**

Versi termodifikasi menghitung koefisien dari w yang **sudah** dibersihkan dari arah q1. Komponen besar itu sudah dibuang lebih dulu, jadi galat di q2 cuma dikalikan sisa yang kecil. Galatnya tetap tumbuh saat vektornya makin sejajar — 7,1 × 10⁻⁹ di e = 10⁻⁸ — tetapi tidak meledak.

**Pelajaran yang lebih luas.**

Dua algoritme yang setara secara matematis bisa berbeda jauh ketahanannya terhadap pembulatan. Urutan operasi penting. Karena itu pustaka numerik yang serius tidak memakai rumus buku teks apa adanya: dekomposisi QR di pustaka seperti LAPACK memakai refleksi Householder, yang lebih tahan lagi daripada kedua versi Gram-Schmidt.`
    },
    {
      bahasa: 'python',
      kode: "A   = [[1, x] for x in xs]                    # 8 x 2\nAtA = [[dot(kolom_i, kolom_j) ...]]            # [[8, 360], [360, 20400]]\nAty = [dot(kolom_i, ys) ...]                   # [723.7, 38051.0]\n# selesaikan AtA c = Aty  (Cramer 2 x 2)\n# c0 = 31.70, c1 = 1.306\n\nsisa = [y - (c0 + c1 * x) for x, y in zip(xs, ys)]\ndot(sisa, [1] * 8)     # 2.8e-13   tegak lurus kolom 1\ndot(sisa, xs)          # 1.6e-11   tegak lurus kolom 2",
      penjelasan: `Delapan persamaan yang tidak bisa dipenuhi sekaligus, diubah menjadi dua persamaan yang bisa — dan dua baris terakhir yang membuktikan bahwa jawabannya memang yang terbaik.

**Dari mana persamaan normal.**

Ac adalah titik di ruang kolom A — sebuah bidang dua dimensi di dalam ruang delapan dimensi, karena A punya dua kolom. y adalah titik di ruang delapan dimensi yang tidak berada di bidang itu.

Titik terdekat di bidang ke y adalah proyeksinya, dan sisa y − Ac harus tegak lurus bidang — artinya tegak lurus **setiap** kolom A. Ditulis sekaligus: Aᵀ(y − Ac) = 0. Pindahkan suku: AᵀA c = Aᵀy.

Tidak ada turunan, tidak ada minimisasi. Cuma syarat tegak lurus. Meski begitu, hasilnya sama persis dengan menurunkan jumlah kuadrat sisa dan menyamakannya dengan nol — dua jalan ke jawaban yang sama.

**Isi AᵀA dan Aᵀy.**

AᵀA = [[8, 360], [360, 20400]]. Isi-isinya adalah hasil kali titik antar-kolom: 8 = banyaknya titik, 360 = jumlah x, 20400 = jumlah x². Aᵀy = [jumlah y, jumlah x·y].

Itu persis jumlahan-jumlahan yang muncul di rumus regresi Sxy/Sxx di Probabilitas dan Statistika, hanya belum dikurangi rata-ratanya. Rumus statistika adalah persamaan normal yang sudah diselesaikan dengan tangan untuk kasus dua peubah.

**Dua baris pemeriksaan.**

Sisa dikali kolom semua-satu: 2,8 × 10⁻¹³. Sisa dikali kolom x: 1,6 × 10⁻¹¹. Keduanya nol sampai pembulatan.

Baris pertama juga punya arti statistika: jumlah sisa nol, jadi garisnya tidak condong ke atas atau ke bawah secara rata-rata. Baris kedua: sisa tidak punya pola lurus terhadap x yang tersisa — semua pola lurus sudah diambil garisnya.

**Kapan persamaan normal tidak dipakai.**

AᵀA "mengkuadratkan" kepekaan masalah terhadap pembulatan. Kalau kolom-kolom A hampir sejajar — misalnya x dari 1000 sampai 1008, sehingga kolom x hampir sejajar kolom satu — galatnya bisa besar.

Pustaka numerik karena itu menyelesaikan kuadrat terkecil lewat dekomposisi QR: A dipecah menjadi Q ortonormal (hasil Gram-Schmidt atau Householder) dan R segitiga atas, lalu Rc = Qᵀy diselesaikan dengan substitusi balik — tanpa pernah membentuk AᵀA. Untuk data kecil yang rapi seperti di sini, persamaan normal sudah cukup.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Ortogonalitas, proyeksi, Gram-Schmidt, kuadrat terkecil
# ============================================
import math

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def kali(k, v):
    return [k * x for x in v]

def kurang(a, b):
    return [x - y for x, y in zip(a, b)]

def norma(v):
    return math.sqrt(dot(v, v))

def fmt(v, d=4):
    return "[" + ", ".join(format(x, "." + str(d) + "f") for x in v) + "]"

# --------------------------------------------
# 1. Proyeksi: bayangan b pada arah a
# --------------------------------------------
print("--- proyeksi b = [3, 4] pada a = [4, 0] dan pada c = [1, 1] ---")
b = [3, 4]
for nama, a in [("a", [4, 0]), ("c", [1, 1])]:
    p = kali(dot(a, b) / dot(a, a), a)
    sisa = kurang(b, p)
    print("  proyeksi pada " + nama + " = " + fmt(p, 2) + "   sisa = " + fmt(sisa, 2)
          + "   sisa . " + nama + " = " + format(dot(sisa, a), "g"))
print("  Sisanya selalu TEGAK LURUS arah proyeksi (hasil kali titik 0).")
print("  Proyeksi adalah titik di garis itu yang PALING DEKAT ke b.")

# --------------------------------------------
# 2. Gram-Schmidt: membuat basis ortonormal
# --------------------------------------------
def gram_schmidt(vs, termodifikasi=False):
    qs = []
    for v in vs:
        w = list(v)
        for q in qs:
            # klasik: koefisien dihitung dari v ASLI
            # termodifikasi: dari w yang SUDAH dikurangi sebagian
            k = dot(q, w) if termodifikasi else dot(q, v)
            w = kurang(w, kali(k, q))
        qs.append(kali(1 / norma(w), w))
    return qs

def galat_ortogonal(qs):
    """Simpangan terbesar Q^T Q dari matriks identitas."""
    n = len(qs)
    return max(abs(dot(qs[i], qs[j]) - (1 if i == j else 0))
               for i in range(n) for j in range(n))

print("\n--- Gram-Schmidt pada tiga vektor ---")
vs = [[1, 1, 0], [1, 0, 1], [0, 1, 1]]
qs = gram_schmidt(vs)
for i, q in enumerate(qs, 1):
    print("  q" + str(i) + " = " + fmt(q) + "   panjang " + format(norma(q), ".4f"))
print("  q1.q2 = " + format(dot(qs[0], qs[1]), ".1e") + ",  q1.q3 = "
      + format(dot(qs[0], qs[2]), ".1e") + ",  q2.q3 = " + format(dot(qs[1], qs[2]), ".1e"))
print("  Setiap langkah membuang bagian v yang searah q sebelumnya,")
print("  lalu menormalkan sisanya menjadi panjang 1.")

print("\n--- Gram-Schmidt pada vektor yang HAMPIR sejajar ---")
print("  v1 = [1, e, 0, 0], v2 = [1, 0, e, 0], v3 = [1, 0, 0, e]")
print("  e          galat klasik     galat termodifikasi")
for e in [1e-2, 1e-5, 1e-8]:
    vs = [[1, e, 0, 0], [1, 0, e, 0], [1, 0, 0, e]]
    g1 = galat_ortogonal(gram_schmidt(vs))
    g2 = galat_ortogonal(gram_schmidt(vs, termodifikasi=True))
    print("  " + format(e, "<9g") + "  " + format(g1, "<16.1e") + " " + format(g2, ".1e"))
print("  'Galat' = simpangan terbesar Q^T Q dari identitas; 0 = sempurna.")
print("  Klasik kehilangan ketegaklurusan saat vektornya hampir sejajar;")
print("  versi termodifikasi -- rumus sama, urutan beda -- jauh lebih tahan.")

# --------------------------------------------
# 3. Kuadrat terkecil: SPL yang tidak punya jawaban
# --------------------------------------------
print("\n--- 8 titik, 2 peubah: cari garis y = c0 + c1 x ---")
xs = [10, 20, 30, 40, 50, 60, 70, 80]
ys = [54.9, 65.0, 62.9, 79.0, 84.7, 99.0, 127.6, 150.6]
A = [[1, x] for x in xs]
print("  8 persamaan c0 + c1*x_i = y_i, cuma 2 peubah: tidak ada c0, c1")
print("  yang memenuhi semuanya. Cari yang PALING DEKAT: selesaikan")
print("  persamaan normal  A^T A c = A^T y")
AtA = [[dot([r[i] for r in A], [r[j] for r in A]) for j in range(2)] for i in range(2)]
Aty = [dot([r[i] for r in A], ys) for i in range(2)]
det = AtA[0][0] * AtA[1][1] - AtA[0][1] * AtA[1][0]
c0 = (Aty[0] * AtA[1][1] - AtA[0][1] * Aty[1]) / det
c1 = (AtA[0][0] * Aty[1] - Aty[0] * AtA[1][0]) / det
print("\n  A^T A = " + str(AtA) + "   A^T y = " + fmt(Aty, 1))
print("  c0 = " + format(c0, ".2f") + ", c1 = " + format(c1, ".3f"))
sisa = [y - (c0 + c1 * x) for x, y in zip(xs, ys)]
print("\n  sisa . kolom 1 (semua 1) = " + format(dot(sisa, [1] * 8), ".1e"))
print("  sisa . kolom 2 (x)       = " + format(dot(sisa, xs), ".1e"))
print("  Sisanya tegak lurus kedua kolom A: Ac adalah PROYEKSI y ke")
print("  ruang kolom A -- gagasan yang sama dengan bagian 1.")
print("  Garis ini sama dengan regresi di topik Probabilitas dan")
print("  Statistika: 31.70 + 1.306 x.")` },
  output: `--- proyeksi b = [3, 4] pada a = [4, 0] dan pada c = [1, 1] ---
  proyeksi pada a = [3.00, 0.00]   sisa = [0.00, 4.00]   sisa . a = 0
  proyeksi pada c = [3.50, 3.50]   sisa = [-0.50, 0.50]   sisa . c = 0
  Sisanya selalu TEGAK LURUS arah proyeksi (hasil kali titik 0).
  Proyeksi adalah titik di garis itu yang PALING DEKAT ke b.

--- Gram-Schmidt pada tiga vektor ---
  q1 = [0.7071, 0.7071, 0.0000]   panjang 1.0000
  q2 = [0.4082, -0.4082, 0.8165]   panjang 1.0000
  q3 = [-0.5774, 0.5774, 0.5774]   panjang 1.0000
  q1.q2 = 1.7e-16,  q1.q3 = 5.6e-17,  q2.q3 = -1.9e-16
  Setiap langkah membuang bagian v yang searah q sebelumnya,
  lalu menormalkan sisanya menjadi panjang 1.

--- Gram-Schmidt pada vektor yang HAMPIR sejajar ---
  v1 = [1, e, 0, 0], v2 = [1, 0, e, 0], v3 = [1, 0, 0, e]
  e          galat klasik     galat termodifikasi
  0.01       1.8e-12          2.2e-14
  1e-05      4.8e-08          5.9e-13
  1e-08      5.0e-01          7.1e-09
  'Galat' = simpangan terbesar Q^T Q dari identitas; 0 = sempurna.
  Klasik kehilangan ketegaklurusan saat vektornya hampir sejajar;
  versi termodifikasi -- rumus sama, urutan beda -- jauh lebih tahan.

--- 8 titik, 2 peubah: cari garis y = c0 + c1 x ---
  8 persamaan c0 + c1*x_i = y_i, cuma 2 peubah: tidak ada c0, c1
  yang memenuhi semuanya. Cari yang PALING DEKAT: selesaikan
  persamaan normal  A^T A c = A^T y

  A^T A = [[8, 360], [360, 20400]]   A^T y = [723.7, 38051.0]
  c0 = 31.70, c1 = 1.306

  sisa . kolom 1 (semua 1) = 2.8e-13
  sisa . kolom 2 (x)       = 1.6e-11
  Sisanya tegak lurus kedua kolom A: Ac adalah PROYEKSI y ke
  ruang kolom A -- gagasan yang sama dengan bagian 1.
  Garis ini sama dengan regresi di topik Probabilitas dan
  Statistika: 31.70 + 1.306 x.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Proyeksi pada satu arah di Rⁿ', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'Gram-Schmidt k vektor di Rⁿ', waktu: 'O(n · k²)', memori: 'O(n · k)' },
      { operasi: 'Membentuk AᵀA untuk A berukuran m × p', waktu: 'O(m · p²)', memori: 'O(p²)' },
      { operasi: 'Menyelesaikan persamaan normal', waktu: 'O(p³)', memori: 'O(p²)' },
      { operasi: 'Kuadrat terkecil lewat QR', waktu: 'O(m · p²)', memori: 'lebih tahan pembulatan' }
    ],
    intuisi: `Gram-Schmidt memproses setiap vektor terhadap semua q sebelumnya, dan setiap langkah butuh satu hasil kali titik di Rⁿ — jadi O(n · k²) untuk k vektor.

Untuk kuadrat terkecil dengan m titik data dan p peubah, bagian mahalnya membentuk AᵀA: setiap pasangan kolom butuh m perkalian. Biasanya m jauh lebih besar dari p — ribuan data, beberapa peubah — sehingga biayanya tumbuh lurus dengan banyaknya data. Menyelesaikan sistem p × p yang dihasilkan hampir tidak terasa.

QR punya orde biaya yang sama, dengan konstanta sedikit lebih besar. Harga tambahan itu dibayar untuk ketelitian, dan pustaka numerik hampir selalu memilih membayarnya.`
  },

  kesalahanUmum: [
    {
      salah: 'Membagi dengan panjang a, bukan dengan a·a, saat menghitung proyeksi.',
      kenapa: 'Proyeksi b pada a adalah (a·b / a·a) a. Membagi dengan panjang a sekali saja menghasilkan vektor yang panjangnya salah, kecuali a sudah panjang 1.',
      benar: 'Pakai a·a di penyebut, atau normalkan a lebih dulu lalu pakai (q·b) q.'
    },
    {
      salah: 'Memakai Gram-Schmidt klasik pada vektor yang hampir sejajar.',
      kenapa: 'Versi klasik menghitung koefisien dari vektor asli, sehingga galat pembulatan kecil diperbesar oleh komponen besar yang belum dibuang. Pada e = 1e-8, hasilnya menyimpang 0,5 dari ortonormal.',
      benar: 'Pakai versi termodifikasi, dan untuk pekerjaan serius pakai dekomposisi QR dari pustaka numerik.'
    },
    {
      salah: 'Menganggap vektor hasil Gram-Schmidt pasti tegak lurus tanpa memeriksanya.',
      kenapa: 'Di atas kertas pasti, tetapi dengan float ketegaklurusan bisa hilang. Kesalahan itu tidak memunculkan pesan galat apa pun.',
      benar: 'Hitung QᵀQ dan bandingkan dengan identitas, terutama untuk data yang vektornya bisa hampir sejajar.'
    },
    {
      salah: 'Mencoba menyelesaikan SPL yang terlalu banyak persamaannya dengan invers A.',
      kenapa: 'A tidak persegi, sehingga tidak punya invers, dan SPL-nya biasanya tidak punya jawaban tepat sama sekali.',
      benar: 'Cari jawaban kuadrat terkecil dengan persamaan normal AᵀA c = Aᵀy atau dengan QR.'
    },
    {
      salah: 'Memakai persamaan normal pada data yang kolomnya hampir sejajar.',
      kenapa: 'Membentuk AᵀA mengkuadratkan kepekaan terhadap pembulatan. Kolom x yang nilainya berkisar sempit jauh dari nol hampir sejajar kolom satu, dan jawabannya bisa kehilangan banyak digit.',
      benar: 'Pusatkan data dengan mengurangi rata-rata x lebih dulu, atau selesaikan lewat QR.'
    },
    {
      salah: 'Menganggap regresi linear dan kuadrat terkecil di aljabar linear adalah dua hal berbeda.',
      kenapa: 'Keduanya adalah proyeksi y ke ruang kolom matriks data, dan memberi garis yang persis sama untuk data yang sama.',
      benar: 'Pahami rumus regresi Sxy/Sxx sebagai persamaan normal yang sudah diselesaikan untuk dua peubah.'
    }
  ],

  analogi: `Bayangkan kamu berdiri di tengah **lapangan** dan ingin mencapai **jalan setapak lurus** yang melintas di dekatmu, dengan langkah sesedikit mungkin.

**Proyeksi.** Kamu tidak berjalan miring ke sembarang titik di jalan. Kamu berjalan **tegak lurus** ke arah jalan — dan titik tempat kakimu menyentuh jalan adalah proyeksimu. Setiap titik lain di jalan lebih jauh. Kalau jalurmu miring sedikit saja, kamu bisa memperpendeknya dengan menggeser titik tujuan ke arah kakimu.

**Basis ortonormal.** Petunjuk arah di kotamu memakai "utara" dan "timur" — saling tegak lurus. Untuk tahu seberapa jauh ke utara sebuah tempat, kamu cukup melihat bayangannya di arah utara, tanpa peduli arah timur. Bayangkan kalau petunjuk arahnya memakai "utara" dan "timur laut": pergi ke timur laut juga membawamu sedikit ke utara, dan menghitung posisi jadi soal SPL. Basis yang saling tegak lurus membuat setiap arah bisa diurus sendiri-sendiri.

**Gram-Schmidt.** Kamu diberi dua arah yang tidak tegak lurus — utara dan timur laut — dan diminta membuat sepasang arah yang tegak lurus. Ambil utara apa adanya. Dari timur laut, buang bagiannya yang mengarah ke utara. Yang tersisa mengarah murni ke timur. Itu Gram-Schmidt.

Sekarang dua arah yang diberikan **hampir sama**: utara, dan utara-sedikit-sekali-ke-timur. Membuang bagian utara dari arah kedua menyisakan sesuatu yang sangat kecil — dan kalau kompasmu sedikit tidak tepat, sisa kecil itu bisa mengarah ke mana saja. Itulah kenapa urutan hitungan yang teliti penting saat arahnya hampir sejajar.

**Kuadrat terkecil.** Delapan temanmu masing-masing menancapkan bendera di lapangan, dan kamu diminta membuat satu jalan lurus yang "melewati semuanya". Tidak mungkin — benderanya tidak segaris. Jadi kamu memilih jalan yang membuat jumlah kuadrat jarak semua bendera ke jalan sekecil mungkin. Di jalan terbaik itu, tidak ada lagi cara menggeser atau memutar jalan yang mengurangi jarak total — dan itu, dalam bahasa aljabar linear, adalah syarat sisanya tegak lurus.`,

  latihan: [
    'Hitung proyeksi [2, 5] pada [3, 1], lalu tunjukkan bahwa sisanya tegak lurus [3, 1].',
    'Hitung jarak dari titik [2, 5] ke garis yang melewati titik asal dengan arah [3, 1], memakai proyeksi.',
    'Jalankan Gram-Schmidt pada [1, 0, 1], [1, 1, 0], [0, 1, 1] dengan tangan, lalu periksa dengan program.',
    'Hitung koordinat [3, 1, 2] terhadap basis ortonormal hasil latihan nomor 3 dengan hasil kali titik saja.',
    'Ulangi percobaan vektor hampir sejajar dengan e = 1e-6 dan 1e-10, lalu catat galat kedua versi Gram-Schmidt.',
    'Cocokkan garis ke titik (1, 2), (2, 3), (3, 5), (4, 4), (5, 6) dengan persamaan normal, lalu periksa dengan statistics.linear_regression.',
    'Cocokkan parabola y = c0 + c1·x + c2·x² ke titik yang sama dengan persamaan normal 3 × 3.',
    'Tunjukkan bahwa jumlah sisa garis kuadrat terkecil selalu nol, dan jelaskan dengan syarat tegak lurus.',
    'Ubah x di data waktu respons menjadi 1010, 1020, ..., 1080, lalu bandingkan kepekaan persamaan normal sebelum dan sesudah x dipusatkan.',
    'Jelaskan kenapa rumus regresi Sxy/Sxx dan persamaan normal memberi garis yang sama.'
  ]
});


TOPICS.push({
  id: 'alin-svd',
  judul: 'SVD & Aproksimasi Rank Rendah',
  kategori: 'aljabar-linear',
  tag: ['SVD', 'nilai singular', 'rank rendah', 'Eckart-Young', 'kompresi', 'sistem rekomendasi', 'faktor laten'],
  ringkas: 'Setiap matriks adalah jumlah lapisan-lapisan sederhana yang diurutkan dari yang paling penting — dan membuang lapisan kecil adalah cara terbaik meringkasnya.',

  fungsi: `**Memecah matriks apa pun menjadi jumlah lapisan berperingkat satu, diurutkan dari yang paling besar pengaruhnya, lalu menyimpan hanya lapisan-lapisan teratas.**

Terpakai di:

- **Sistem rekomendasi** — matriks penilaian pengguna × item diringkas menjadi beberapa "selera tersembunyi", dan dari situ nilai yang belum ada bisa diperkirakan
- **Kompresi** — citra atau data yang punya struktur bisa disimpan sebagai beberapa lapisan, bukan seluruh isinya
- **Mengurangi derau** — lapisan dengan nilai singular kecil sering cuma derau pengukuran
- **PCA** — analisis komponen utama di Data Mining pada dasarnya SVD dari data yang sudah dipusatkan
- **Rank numerik** — pustaka numerik menghitung rank dari banyaknya nilai singular yang tidak "hampir nol"

Yang membuat SVD istimewa: **pendekatan terbaik yang mungkin, terbukti.** Di antara semua matriks dengan rank k, tidak ada yang lebih dekat ke matriks aslinya daripada k lapisan SVD teratas — dan galatnya bisa dihitung langsung dari nilai singular yang dibuang.

Dan yang paling menarik untuk informatika: **SVD menemukan struktur yang tidak diberitahukan.** Dari angka-angka penilaian saja, ia memisahkan penggemar film aksi dari penggemar film romantis — tanpa pernah diberi tahu genre apa pun.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung beberapa komponen SVD teratas dengan power iteration, menafsirkan vektor singular sebagai faktor tersembunyi, memilih banyaknya komponen dari nilai singular, dan menghitung penghematan penyimpanannya.',
    alat: ['Python 3 dengan modul math dan random', 'Topik Transformasi Linear & Eigenvector untuk power iteration'],
    langkah: [
      { judul: 'Bentuk AᵀA',
        isi: `Nilai singular A adalah akar eigenvalue AᵀA, dan vektor singular kanan v adalah eigenvector-nya. AᵀA simetris dan tidak negatif — jenis matriks yang paling mudah untuk power iteration.` },
      { judul: 'Cari komponen pertama dengan power iteration',
        isi: `Ulangi v ← AᵀA v, lalu normalkan, sampai tidak berubah. Eigenvalue λ = vᵀ(AᵀA)v, nilai singular σ = √λ, dan vektor singular kiri u = Av/σ.

Ini power iteration yang sama dengan topik eigenvector.` },
      { judul: 'Deflasi, lalu ulangi',
        isi: `Kurangkan komponen yang sudah ditemukan: AᵀA ← AᵀA − λ v vᵀ. Power iteration berikutnya akan menemukan komponen terbesar kedua.

Untuk matriks kecil ini cukup. Untuk matriks besar, pakai pustaka numerik — deflasi berulang menumpuk galat.` },
      { judul: 'Baca nilai singularnya',
        isi: `Hitung σ²/(jumlah kuadrat semua isi) untuk setiap komponen — bagian "energi" matriks yang dibawanya.

Kalau beberapa komponen pertama membawa hampir semuanya, matriksnya punya struktur rank rendah yang bisa diringkas.` },
      { judul: 'Tafsirkan vektor singularnya',
        isi: `Lihat tanda dan besar isi v1, v2. Komponen yang semua isinya bertanda sama biasanya "besarnya secara umum". Komponen dengan tanda campuran memisahkan kelompok.

Ingat: tanda vektor singular bebas — v dan −v sama sahnya. Yang bermakna adalah pola tandanya.` },
      { judul: 'Hitung galat dan penyimpanan',
        isi: `Susun ulang dengan k komponen: jumlah σᵢ uᵢ vᵢᵀ. Hitung galatnya, dan bandingkan dengan akar jumlah kuadrat nilai singular yang dibuang — keduanya harus sama.

Penyimpanan k komponen untuk matriks m × n: k(m + n + 1) angka, dibandingkan m·n.` }
    ],
    cek: [
      'Nilai singular yang kamu hitung turun berurutan, dan galat rank-k cocok dengan nilai singular yang dibuang',
      'Kamu bisa menafsirkan dua komponen pertama matriks penilaian sebagai faktor tersembunyi',
      'Kamu bisa menghitung pada k berapa penyimpanan rank rendah justru lebih besar dari aslinya',
      'Kamu bisa menjelaskan kenapa bentuk tertentu, seperti garis diagonal, butuh banyak komponen'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa lapisan teratas adalah ringkasan terbaik',

  konsep: `Topik eigenvector menemukan arah yang tidak berubah saat matriks persegi dikenakan. Tetapi kebanyakan data tidak berbentuk persegi — 6 pengguna × 5 film, 1000 pelanggan × 50 produk. **SVD** memperluas gagasan itu ke matriks bentuk apa pun.

**Bentuknya**

Setiap matriks A berukuran m × n bisa ditulis sebagai:

A = σ₁ u₁ v₁ᵀ + σ₂ u₂ v₂ᵀ + ... + σᵣ uᵣ vᵣᵀ

Setiap suku adalah **lapisan** berperingkat satu: satu kolom u dikali satu baris vᵀ, diskalakan σ. Nilai singular σ₁ ≥ σ₂ ≥ ... ≥ 0 mengurutkan lapisan dari yang paling berpengaruh. Vektor u saling tegak lurus, begitu juga vektor v.

**Contoh: penilaian film**

| | Aksi1 | Aksi2 | Aksi3 | Roman1 | Roman2 |
|---|---|---|---|---|---|
| Ani | 5 | 4 | 5 | 1 | 1 |
| Budi | 4 | 5 | 4 | 2 | 1 |
| Citra | 5 | 5 | 4 | 1 | 2 |
| Dodi | 1 | 2 | 1 | 5 | 4 |
| Eka | 2 | 1 | 1 | 4 | 5 |
| Fajar | 4 | 4 | 5 | 4 | 4 |

Nilai singularnya: **17,953 · 7,467 · 1,876 · 1,462 · 0,527**. Bagian energinya: 83,9%, 14,5%, 0,9%, 0,6%, 0,1%. Dua komponen pertama membawa **98,4 persen** — matriks 6 × 5 ini hampir sepenuhnya dijelaskan dua faktor.

**Apa arti dua faktor itu**

| Film | v₁ | v₂ |
|---|---|---|
| Aksi1 | +0,50 | −0,29 |
| Aksi2 | +0,50 | −0,27 |
| Aksi3 | +0,49 | −0,31 |
| Roman1 | +0,36 | +0,61 |
| Roman2 | +0,36 | +0,61 |

v₁ semuanya positif: faktor "seberapa suka film secara umum". v₂ memisahkan dua kelompok film dengan tanda berlawanan: faktor "selera aksi lawan roman".

**Tidak ada yang memberi tahu SVD soal genre.** Ia cuma melihat angka, dan menemukan bahwa cara paling hemat menjelaskan angka-angka itu adalah dua faktor — yang kebetulan cocok dengan genre. Pada data sungguhan dengan ribuan film, faktor-faktor seperti ini disebut **faktor laten**, dan sering menangkap hal-hal yang tidak punya nama — gaya penyutradaraan, suasana, target umur.

**Pendekatan terbaik: Eckart–Young**

Susun ulang A dari k lapisan teratas saja. Galatnya:

| k | Galat terhadap A | Akar jumlah σ² yang dibuang |
|---|---|---|
| 1 | 7,8545 | 7,8545 |
| 2 | 2,4361 | 2,4361 |
| 3 | 1,5544 | 1,5544 |
| 4 | 0,5268 | 0,5268 |

Kedua kolom **sama persis**. Itulah teorema Eckart–Young: pendekatan rank k terbaik adalah k lapisan SVD teratas, dan galatnya — dalam norma Frobenius, akar jumlah kuadrat semua isi — adalah akar jumlah kuadrat nilai singular yang dibuang. Tidak ada matriks rank 2 lain yang lebih dekat ke A.

Dengan dua komponen, penilaian Ani menjadi 4,7 · 4,6 · 4,7 · 1,0 · 1,0 — hampir sama dengan aslinya. Dodi dan Eka menjadi identik: 1,4 · 1,4 · 1,2 · 4,5 · 4,5. Perbedaan kecil di antara mereka dibuang sebagai detail; yang tersisa adalah selera bersama mereka.

Sistem rekomendasi memakai gagasan ini untuk mengisi **penilaian yang kosong**: kalau seorang pengguna belum menonton Roman2, faktor-faktornya memberi perkiraan berapa ia akan menilainya. (Pada data yang banyak kosongnya, SVD biasa tidak bisa langsung dipakai — metode faktorisasi matriks khusus mencari faktornya hanya dari isi yang ada. Gagasannya tetap sama.)

**Citra: rank rendah adalah kompresi**

Citra 16 × 16 berisi kotak, palang, dan garis diagonal. Nilai singular teratasnya: 7,82 · 2,62 · 0,80 · 0,80 · 0,80 · ...

| k | Angka disimpan | Dari 256 | Galat relatif |
|---|---|---|---|
| 1 | 33 | 13% | 39,1% |
| 2 | 66 | 26% | 24,0% |
| 3 | 99 | 39% | 22,1% |
| 4 | 132 | 52% | 20,0% |
| 6 | 198 | 77% | 14,9% |
| 8 | 264 | **103%** | 7,7% |

Setiap lapisan butuh m + n + 1 angka: u, v, dan σ. Pada k = 8, penyimpanannya sudah **melebihi** citra aslinya.

Program menggambar citranya dengan karakter teks. Kotak dan palang — bentuk yang sejajar sumbu — sudah jelas di k = 3. Garis diagonal tidak: setiap titiknya ada di baris **dan** kolom yang berbeda, sehingga tidak bisa diringkas sebagai sedikit perkalian kolom-kali-baris. Nilai singular 0,80 yang berulang itu adalah garis diagonal, tersebar rata di banyak lapisan.

Pelajarannya: SVD menghemat banyak untuk data yang **punya struktur** — baris-baris yang mirip satu sama lain. Untuk data yang setiap bagiannya unik, penghematannya kecil. Itu juga sebabnya kompresi citra sungguhan seperti JPEG memakai cara lain yang lebih cocok untuk foto alam, yang dibahas di Teknologi Multimedia.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def svd_atas(A, k, ulang=3000):\n    n = len(A[0])\n    B = [[dot(kolom(A, i), kolom(A, j)) for j in range(n)]\n         for i in range(n)]                      # B = A^T A\n    hasil = []\n    for _ in range(k):\n        v = [random.random() for _ in range(n)]\n        for _ in range(ulang):                   # power iteration\n            w = [dot(baris, v) for baris in B]\n            nw = math.sqrt(dot(w, w))\n            v = [x / nw for x in w]\n        lam = dot(v, [dot(baris, v) for baris in B])\n        s = math.sqrt(lam)                       # nilai singular\n        u = [dot(baris, v) / s for baris in A]   # u = A v / s\n        hasil.append((s, u, v))\n        B = [[B[i][j] - lam * v[i] * v[j] for j in range(n)]\n             for i in range(n)]                  # deflasi\n    return hasil",
      penjelasan: `SVD dari nol, dengan dua alat yang sudah ada di topik-topik sebelumnya: power iteration dari topik eigenvector, dan proyeksi dari topik ortogonalitas.

**Kenapa lewat AᵀA.**

A tidak persegi, jadi tidak punya eigenvector. Tetapi AᵀA — berukuran n × n — persegi, simetris, dan semua eigenvalue-nya tidak negatif.

Eigenvector AᵀA adalah vektor singular kanan v, dan eigenvalue-nya adalah σ². Alasannya: kalau A v = σ u dan Aᵀ u = σ v — definisi pasangan vektor singular — maka AᵀA v = Aᵀ(σ u) = σ² v.

Jadi mencari SVD berubah menjadi mencari eigenvector matriks simetris — persis yang dikerjakan power iteration.

**Kenapa power iteration menemukan yang terbesar dulu.**

Setiap kali v dikalikan B, komponennya di arah eigenvector ke-i dikalikan λᵢ. Setelah ribuan kali, komponen dengan λ terbesar tumbuh jauh melampaui yang lain, dan v menunjuk ke arahnya. Itu penjelasan yang sama dengan topik eigenvector — di sini dipakai untuk menemukan lapisan SVD yang paling penting.

**u dihitung, bukan dicari.**

Setelah v dan σ diketahui, u = Av/σ langsung dari definisi. Tidak perlu power iteration kedua.

**Deflasi: mengurangi yang sudah ditemukan.**

\`B − λ v vᵀ\` menghapus komponen v dari B. Matriks yang tersisa punya eigenvector yang sama, kecuali v sekarang punya eigenvalue nol. Power iteration berikutnya otomatis menemukan komponen terbesar kedua.

**Kenapa ini cuma untuk belajar.**

Tiga kelemahan yang membuat pustaka numerik tidak memakai cara ini:

- **Membentuk AᵀA mengkuadratkan kepekaan** — masalah yang sama dengan persamaan normal di topik ortogonalitas. Nilai singular kecil kehilangan banyak digit.
- **Deflasi menumpuk galat** — setiap komponen yang tidak tepat mencemari yang berikutnya.
- **Power iteration lambat** kalau dua nilai singular berdekatan, dan tidak bisa memilih arah kalau keduanya **sama** — seperti lima nilai 0,80 di contoh citra. Hasilnya tetap sah, karena setiap arah di ruang itu sama baiknya, tetapi tidak unik.

Pustaka numerik memakai algoritme yang bekerja langsung pada A tanpa membentuk AᵀA — dimulai dengan bidiagonalisasi Golub–Kahan. Di Python, \`numpy.linalg.svd\` memanggil rutin LAPACK yang dibangun dari gagasan itu. Kode di atas ada supaya setiap langkahnya bisa dilihat.`
    },
    {
      bahasa: 'python',
      kode: "for k in range(1, 5):\n    Rk    = rakit(komp[:k], m, n)            # jumlah k lapisan teratas\n    galat = frobenius(selisih(R, Rk))\n    buang = math.sqrt(sum(s * s for s, _, _ in komp[k:]))\n\n# k   galat     akar(jumlah s^2 yang dibuang)\n# 1   7.8545    7.8545\n# 2   2.4361    2.4361\n# 3   1.5544    1.5544\n# 4   0.5268    0.5268",
      penjelasan: `Dua cara menghitung galat, dan kenyataan bahwa keduanya selalu sama adalah isi teorema terpenting tentang SVD.

**Cara pertama: langsung.**

Rakit ulang matriks dari k lapisan teratas, kurangkan dari aslinya, lalu hitung akar jumlah kuadrat semua isi selisihnya — norma Frobenius. Itu jarak antara matriks asli dan pendekatannya.

**Cara kedua: dari nilai singular saja.**

Ambil nilai singular yang **tidak** dipakai, kuadratkan, jumlahkan, akarkan. Tanpa menyusun matriks apa pun.

**Kenapa keduanya sama.**

Selisih A − Aₖ adalah jumlah lapisan yang dibuang: σₖ₊₁ uₖ₊₁ vₖ₊₁ᵀ + .... Lapisan-lapisan itu saling "tegak lurus" dalam arti yang tepat — karena u-u saling tegak lurus dan v-v saling tegak lurus — sehingga kuadrat norma jumlahnya sama dengan jumlah kuadrat norma masing-masing. Dan norma setiap lapisan σ u vᵀ adalah σ, karena u dan v panjangnya 1.

Itu teorema Pythagoras sekali lagi — untuk matriks.

**Dan kenapa tidak ada yang lebih baik.**

Bagian yang lebih dalam dari Eckart–Young: tidak ada matriks rank k **mana pun** yang lebih dekat ke A daripada Aₖ. Buktinya di luar cakupan topik ini, tetapi akibatnya sangat praktis: kalau kamu harus meringkas data dengan k faktor, SVD memberi ringkasan terbaik yang mungkin, dan nilai singular memberi tahu seberapa baik **sebelum** kamu menyusun apa pun.

**Cara memilih k.**

Lihat deretan nilai singular: 17,953 · 7,467 · 1,876 · 1,462 · 0,527. Ada lompatan jelas setelah yang kedua — dari 7,5 ke 1,9. Lapisan sebelum lompatan adalah struktur; lapisan sesudahnya sebagian besar adalah variasi kecil antar-orang.

Aturan praktis lain: pilih k terkecil yang membawa, misalnya, 95 persen energi. Di sini k = 2 membawa 98,4 persen.

Tidak ada aturan yang benar untuk semua kasus. Tetapi dengan nilai singular di tangan, pilihannya bisa dibuat dengan melihat angka, bukan menebak.`
    }
  ],

  kode: { python: String.raw`# ============================================
# SVD: memecah matriks menjadi lapisan-lapisan
# ============================================
import math
import random

random.seed(5)

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def kolom(A, j):
    return [baris[j] for baris in A]

def svd_atas(A, k, ulang=3000):
    """k nilai singular terbesar lewat power iteration pada A^T A,
    dengan deflasi setelah setiap komponen ditemukan."""
    n = len(A[0])
    B = [[dot(kolom(A, i), kolom(A, j)) for j in range(n)] for i in range(n)]
    hasil = []
    for _ in range(k):
        v = [random.random() for _ in range(n)]
        for _ in range(ulang):
            w = [dot(baris, v) for baris in B]
            nw = math.sqrt(dot(w, w))
            if nw < 1e-12:
                break
            v = [x / nw for x in w]
        lam = dot(v, [dot(baris, v) for baris in B])
        if lam <= 1e-12:
            break
        s = math.sqrt(lam)
        u = [dot(baris, v) / s for baris in A]
        hasil.append((s, u, v))
        B = [[B[i][j] - lam * v[i] * v[j] for j in range(n)] for i in range(n)]
    return hasil

def rakit(komponen, m, n):
    return [[sum(s * u[i] * v[j] for s, u, v in komponen) for j in range(n)]
            for i in range(m)]

def frobenius(A):
    return math.sqrt(sum(x * x for baris in A for x in baris))

def selisih(A, B):
    return [[a - b for a, b in zip(ra, rb)] for ra, rb in zip(A, B)]

# --------------------------------------------
# 1. Matriks penilaian: pengguna x film
# --------------------------------------------
FILM = ["Aksi1", "Aksi2", "Aksi3", "Roman1", "Roman2"]
R = [
    [5, 4, 5, 1, 1],     # Ani   -- suka aksi
    [4, 5, 4, 2, 1],     # Budi  -- suka aksi
    [5, 5, 4, 1, 2],     # Citra -- suka aksi
    [1, 2, 1, 5, 4],     # Dodi  -- suka roman
    [2, 1, 1, 4, 5],     # Eka   -- suka roman
    [4, 4, 5, 4, 4],     # Fajar -- suka keduanya
]
NAMA = ["Ani", "Budi", "Citra", "Dodi", "Eka", "Fajar"]
m, n = len(R), len(R[0])
print("--- penilaian 6 pengguna untuk 5 film (1-5) ---")
print("         " + "".join(format(f, ">8") for f in FILM))
for nm, baris in zip(NAMA, R):
    print("  " + format(nm, "<7") + "".join(format(x, ">8") for x in baris))

komp = svd_atas(R, 5)
print("\n  nilai singular : " + "  ".join(format(s, ".3f") for s, _, _ in komp))
total = frobenius(R) ** 2
print("  bagian 'energi' tiap komponen (s^2 / jumlah kuadrat semua isi):")
print("                   " + "  ".join(format(s * s / total, ".1%") for s, _, _ in komp))

print("\n  arah film komponen 1 dan 2:")
for nama_k, (s, u, v) in zip(["v1", "v2"], komp[:2]):
    tanda = 1 if max(v, key=abs) > 0 else -1    # arah SVD bebas tanda
    print("  " + nama_k + " : " + "  ".join(format(f, ">6") + format(tanda * x, "+.2f")
                                     for f, x in zip(FILM, v)))
print("  v1 semua bertanda sama: 'seberapa suka film secara umum'.")
print("  v2 memisahkan aksi dari roman: 'selera aksi lawan roman'.")
print("  Tidak ada yang memberi tahu SVD soal genre -- ia menemukannya")
print("  sendiri dari pola angka.")

print("\n  mendekati R dengan k komponen saja:")
print("  k   galat ||R - Rk||   akar(jumlah s^2 yang dibuang)")
for k in range(1, 5):
    Rk = rakit(komp[:k], m, n)
    galat = frobenius(selisih(R, Rk))
    buang = math.sqrt(sum(s * s for s, _, _ in komp[k:]))
    print("  " + str(k) + format(galat, "12.4f") + format(buang, "19.4f"))
print("  Dua kolom itu sama: galat pendekatan terbaik rank k persis")
print("  sama dengan nilai singular yang dibuang (Eckart-Young).")

R2 = rakit(komp[:2], m, n)
print("\n  R dengan 2 komponen (dibulatkan 1 desimal):")
for nm, baris in zip(NAMA, R2):
    print("  " + format(nm, "<7") + "".join(format(x, ">8.1f") for x in baris))

# --------------------------------------------
# 2. Citra: rank rendah = kompresi
# --------------------------------------------
N = 16
img = [[0.0] * N for _ in range(N)]
for i in range(N):
    for j in range(N):
        kotak = 1.0 if 2 <= i <= 12 and 2 <= j <= 6 else 0.0
        palang = 0.6 if 9 <= i <= 12 and 4 <= j <= 14 else 0.0
        diagonal = 0.8 if i == j else 0.0
        img[i][j] = max(kotak, palang, diagonal)

GRADASI = " .:-=+*#%@"
def ascii_baris(A, i):
    return "".join(GRADASI[min(9, max(0, round(x * 9)))] for x in A[i])

komp = svd_atas(img, 8)
print("\n--- citra 16 x 16: kotak, palang, dan garis diagonal ---")
print("  nilai singular: " + " ".join(format(s, ".2f") for s, _, _ in komp))
A1, A3 = rakit(komp[:1], N, N), rakit(komp[:3], N, N)
print("\n  " + format("asli", "<19") + format("k = 1", "<19") + "k = 3")
for i in range(N):
    print(("  " + ascii_baris(img, i) + "   " + ascii_baris(A1, i) + "   "
           + ascii_baris(A3, i)).rstrip())

print("\n  k   angka disimpan   dari 256   galat relatif")
for k in [1, 2, 3, 4, 6, 8]:
    Ak = rakit(komp[:k], N, N)
    simpan = k * (N + N + 1)
    rel = frobenius(selisih(img, Ak)) / frobenius(img)
    print("  " + format(k, "<4") + format(simpan, ">14") + format(simpan / 256, ">10.0%")
          + format(rel, ">15.1%"))
print("  (k = 8 sudah butuh lebih banyak angka daripada citra aslinya)")
print()
print("  Kotak dan palang -- bentuk yang 'lurus sejajar sumbu' -- sudah")
print("  muncul di k = 3. Garis diagonal butuh jauh lebih banyak")
print("  komponen: setiap titiknya ada di baris DAN kolom berbeda,")
print("  sehingga tidak bisa diringkas sebagai sedikit perkalian luar.")` },
  output: `--- penilaian 6 pengguna untuk 5 film (1-5) ---
            Aksi1   Aksi2   Aksi3  Roman1  Roman2
  Ani           5       4       5       1       1
  Budi          4       5       4       2       1
  Citra         5       5       4       1       2
  Dodi          1       2       1       5       4
  Eka           2       1       1       4       5
  Fajar         4       4       5       4       4

  nilai singular : 17.953  7.467  1.876  1.462  0.527
  bagian 'energi' tiap komponen (s^2 / jumlah kuadrat semua isi):
                   83.9%  14.5%  0.9%  0.6%  0.1%

  arah film komponen 1 dan 2:
  v1 :  Aksi1+0.50   Aksi2+0.50   Aksi3+0.49  Roman1+0.36  Roman2+0.36
  v2 :  Aksi1-0.29   Aksi2-0.27   Aksi3-0.31  Roman1+0.61  Roman2+0.61
  v1 semua bertanda sama: 'seberapa suka film secara umum'.
  v2 memisahkan aksi dari roman: 'selera aksi lawan roman'.
  Tidak ada yang memberi tahu SVD soal genre -- ia menemukannya
  sendiri dari pola angka.

  mendekati R dengan k komponen saja:
  k   galat ||R - Rk||   akar(jumlah s^2 yang dibuang)
  1      7.8545             7.8545
  2      2.4361             2.4361
  3      1.5544             1.5544
  4      0.5268             0.5268
  Dua kolom itu sama: galat pendekatan terbaik rank k persis
  sama dengan nilai singular yang dibuang (Eckart-Young).

  R dengan 2 komponen (dibulatkan 1 desimal):
  Ani         4.7     4.6     4.7     1.0     1.0
  Budi        4.4     4.3     4.3     1.5     1.5
  Citra       4.7     4.7     4.6     1.5     1.5
  Dodi        1.4     1.4     1.2     4.5     4.5
  Eka         1.4     1.4     1.2     4.5     4.5
  Fajar       4.4     4.4     4.2     4.0     4.0

--- citra 16 x 16: kotak, palang, dan garis diagonal ---
  nilai singular: 7.82 2.62 0.80 0.80 0.80 0.80 0.80 0.74

  asli               k = 1              k = 3
  #
   #                                     -            .-
    @@@@@              %%%%%--::::::      @@@@@..
    @@@@@              %%%%%--::::::      @@@@@..
    @@@@@              %%%%%--::::::      @@@@@..
    @@@@@              %%%%%--::::::      @@@@@..
    @@@@@              %%%%%--::::::      @@@@@..
    @@@@@#             %%%%%--::::::      @@@@@.......
    @@@@@ #            %%%%%--::::::      @@@@@...... .
    @@@@@++#+++++      @@@@@--------      @@@@@++******
    @@@@@+++#++++      @@@@@--------      @@@@@++******
    @@@@@++++#+++      @@@@@--------      @@@@@++******
    @@@@@+++++#++      @@@@@--------      @@@@@++******
               #                               ........
                #                        .     .........
                 #                       -            .-

  k   angka disimpan   dari 256   galat relatif
  1               33       13%          39.1%
  2               66       26%          24.0%
  3               99       39%          22.1%
  4              132       52%          20.0%
  6              198       77%          14.9%
  8              264      103%           7.7%
  (k = 8 sudah butuh lebih banyak angka daripada citra aslinya)

  Kotak dan palang -- bentuk yang 'lurus sejajar sumbu' -- sudah
  muncul di k = 3. Garis diagonal butuh jauh lebih banyak
  komponen: setiap titiknya ada di baris DAN kolom berbeda,
  sehingga tidak bisa diringkas sebagai sedikit perkalian luar.`,

  kompleksitas: {
    tabel: [
      { operasi: 'SVD penuh matriks m × n (pustaka, m ≥ n)', waktu: 'O(m · n²)', memori: 'O(m · n)' },
      { operasi: 'k komponen dengan power iteration, t putaran', waktu: 'O(m · n² + k · t · n²)', memori: 'O(n²) untuk AᵀA' },
      { operasi: 'Menyimpan pendekatan rank k', waktu: '—', memori: 'k(m + n + 1) angka, dibanding m · n' },
      { operasi: 'Merakit ulang satu isi dari k lapisan', waktu: 'O(k)', memori: 'O(1)' }
    ],
    intuisi: `SVD penuh mahal: kubik dalam ukuran matriks. Untuk matriks penilaian dengan jutaan pengguna dan ratusan ribu film, menghitungnya penuh tidak mungkin. Yang dipakai adalah metode yang hanya mencari k komponen teratas — varian canggih dari power iteration di topik ini — karena memang hanya itu yang dibutuhkan.

Baris ketiga menentukan kapan rank rendah menguntungkan: k(m + n + 1) < m · n. Untuk citra 16 × 16, batasnya k < 7,8. Untuk matriks 1000 × 1000, k sampai sekitar 500 masih menghemat — dan data dengan struktur biasanya butuh jauh lebih sedikit.

Baris terakhir adalah alasan sistem rekomendasi memakai bentuk ini: perkiraan penilaian satu pengguna untuk satu film cuma butuh k perkalian, berapa pun besar matriks aslinya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menafsirkan tanda vektor singular sebagai bermakna mutlak.',
      kenapa: 'Kalau σ u vᵀ adalah satu lapisan, maka σ (−u)(−v)ᵀ adalah lapisan yang sama. Pustaka yang berbeda bisa memberi tanda yang berlawanan untuk data yang sama.',
      benar: 'Tafsirkan pola tanda di dalam satu vektor, misalnya aksi negatif dan roman positif, bukan tanda masing-masing isi.'
    },
    {
      salah: 'Memilih banyaknya komponen tanpa melihat nilai singularnya.',
      kenapa: 'Terlalu sedikit komponen membuang struktur yang nyata, terlalu banyak menyimpan derau dan bisa lebih boros dari data aslinya. Pada citra 16 × 16, k = 8 sudah butuh 264 angka untuk menggantikan 256.',
      benar: 'Lihat deretan nilai singular, cari lompatan, atau pilih k yang membawa bagian energi yang cukup.'
    },
    {
      salah: 'Menghitung SVD data besar dengan membentuk AᵀA dan power iteration berulang.',
      kenapa: 'Membentuk AᵀA mengkuadratkan kepekaan terhadap pembulatan, dan deflasi berulang menumpuk galat, sehingga nilai singular kecil menjadi tidak teliti.',
      benar: 'Pakai fungsi SVD pustaka numerik, atau metode SVD terpotong yang langsung mencari k komponen teratas.'
    },
    {
      salah: 'Menganggap SVD bisa meringkas data apa pun dengan hemat.',
      kenapa: 'Penghematan datang dari struktur, yaitu baris atau kolom yang mirip satu sama lain. Data yang setiap bagiannya unik, seperti garis diagonal di contoh citra, butuh banyak komponen.',
      benar: 'Periksa seberapa cepat nilai singular turun sebelum memilih SVD sebagai cara kompresi.'
    },
    {
      salah: 'Menjalankan SVD biasa pada matriks penilaian yang kebanyakan isinya kosong, dengan kosong diisi nol.',
      kenapa: 'Nol dianggap sebagai penilaian sungguhan yang sangat buruk, sehingga faktor yang ditemukan mencerminkan film mana yang belum ditonton, bukan selera.',
      benar: 'Pakai metode faktorisasi matriks yang mencari faktor hanya dari penilaian yang ada.'
    },
    {
      salah: 'Menganggap nilai singular sama dengan eigenvalue A.',
      kenapa: 'Nilai singular adalah akar eigenvalue AᵀA, dan selalu tidak negatif. Untuk matriks persegi yang tidak simetris, keduanya bisa sangat berbeda, dan eigenvalue bahkan bisa negatif atau kompleks.',
      benar: 'Hitung nilai singular dari AᵀA atau dengan fungsi SVD, dan pakai eigenvalue hanya untuk pertanyaan tentang arah yang dipertahankan matriks persegi.'
    }
  ],

  analogi: `Bayangkan kamu mendeskripsikan **selera musik** teman-teman sekelas kepada orang baru.

**Lapisan pertama.** Kamu bisa mulai dengan satu kalimat: "sebagian orang suka musik secara umum, sebagian tidak terlalu." Satu kalimat itu sudah menjelaskan banyak hal — orang yang suka musik cenderung memberi nilai tinggi ke semua lagu. Itu komponen pertama: satu angka "seberapa suka musik" per orang, dan satu angka "seberapa populer" per lagu.

**Lapisan kedua.** Lalu kamu menambah: "dan di antara mereka, ada yang condong ke rock, ada yang ke dangdut." Kalimat kedua menjelaskan sebagian besar sisanya. Itu komponen kedua, dengan tanda berlawanan untuk kedua kelompok lagu.

**Lapisan-lapisan berikutnya** makin spesifik dan makin sedikit gunanya: "Budi suka lagu yang ada solo gitarnya", "Eka tidak suka lagu yang terlalu panjang". Benar, tetapi masing-masing cuma menjelaskan sedikit.

Orang baru itu tidak perlu mendengar semua detail. Dua kalimat pertama sudah cukup untuk meramal dengan baik lagu mana yang akan disukai siapa. Itulah pendekatan rank rendah: simpan lapisan yang besar, buang yang kecil.

**Eckart–Young.** Kalau kamu cuma boleh memakai dua kalimat, tidak ada dua kalimat lain yang lebih baik daripada dua lapisan SVD teratas. Dan sebelum mengucapkannya pun, kamu sudah tahu seberapa banyak yang akan hilang: sebesar lapisan-lapisan yang tidak kamu sebut.

**Garis diagonal.** Sekarang bayangkan setiap teman menyukai **tepat satu** lagu, dan lagu setiap orang berbeda. Tidak ada pola bersama sama sekali. Tidak ada kalimat umum yang bisa meringkasnya; kamu terpaksa menyebut setiap orang satu per satu. Itulah garis diagonal di contoh citra — dan itulah kenapa SVD tidak bisa menghemat di sana.`,

  latihan: [
    'Hitung SVD matriks [[3, 0], [0, 1]] dengan tangan, lalu periksa dengan fungsi svd_atas.',
    'Tunjukkan bahwa eigenvalue AᵀA untuk matriks penilaian di topik ini sama dengan kuadrat nilai singularnya.',
    'Tambahkan pengguna ketujuh yang hanya suka film roman ke matriks penilaian, lalu lihat bagaimana v₂ berubah.',
    'Hitung bagian energi setiap komponen untuk matriks penilaian pilihanmu sendiri, lalu tentukan k yang membawa 95 persen.',
    'Susun ulang matriks penilaian dengan k = 1, lalu jelaskan apa yang hilang dibandingkan k = 2.',
    'Buat citra 16 × 16 yang cuma berisi satu kotak, lalu tunjukkan bahwa rank-nya 1.',
    'Hitung pada k berapa pendekatan rank rendah citra 64 × 48 mulai lebih boros dari aslinya.',
    'Tambahkan derau acak kecil ke citra kotak, hitung nilai singularnya, lalu jelaskan kenapa nilai singular kecil sering dianggap derau.',
    'Jelaskan kenapa garis diagonal butuh banyak komponen SVD, sedangkan kotak cuma satu.',
    'Jelaskan kenapa mengisi penilaian kosong dengan nol lalu menjalankan SVD memberi rekomendasi yang buruk.'
  ]
});
