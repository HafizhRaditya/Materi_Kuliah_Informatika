/* ============================================================
   probstat.js — materi Probabilitas dan Statistika (Semester 2)

   Materi kuliahnya tidak tersimpan; yang ada di
   "Semester Dua/Probabilitas dan Statistika" hanya proyek
   kelompok "Kalkulator BMI" (Flask + Python) yang menghitung
   mean, median, dan modus dari data berat, tinggi, dan BMI.

   Kasus BMI itu dipakai sebagai contoh di topik statistika
   deskriptif. Sisanya disusun dari pengetahuan umum, dipilih
   yang benar-benar terpakai di Informatika.
   ============================================================ */

TOPICS.push({
  id: 'probstat-deskriptif',
  judul: 'Statistika Deskriptif',
  kategori: 'probstat',
  tag: ['mean', 'median', 'modus', 'simpangan baku', 'pencilan', 'paradoks Simpson'],
  ringkas: 'Rata-rata 65 kg, dan enam dari sepuluh orang beratnya di bawah itu.',

  fungsi: `**Meringkas data tanpa menyesatkan orang yang membacanya.**

Terpakai di:

- **Bab hasil** tugas akhir — hampir selalu diminta
- **Laporan kinerja** sistem, penjualan, atau nilai
- **Data Mining** — pemahaman awal sebelum memodelkan apa pun
- **Membaca berita** yang mengutip angka rata-rata

Yang paling sering menyelamatkan: **bandingkan rata-rata dengan mediannya.**

Kalau keduanya berjauhan, datamu punya ekor panjang — dan rata-rata menggambarkan sesuatu yang tidak dialami siapa pun. Pemeriksaan ini satu baris kode dan sebaiknya dilakukan setiap kali.

Dan jebakan yang paling berbahaya: **menggabungkan kelompok bisa membalik kesimpulan.** Sebuah kelompok bisa unggul di setiap bagian dan kalah secara total — itu paradoks Simpson, dan ia terjadi di data nyata.`,

  praktik: {
    tujuan: `Kamu bisa meringkas satu data nyata secara jujur, dan mengenali kapan ringkasannya menyesatkan.`,
    alat: [
      'Python 3',
      'Satu data nyata — nilai kelas, waktu tanggap, atau apa pun'
    ],
    langkah: [
      { judul: 'Kumpulkan data nyata, bukan buatan',
        isi: `Ambil sesuatu yang benar-benar kamu punya: nilai satu kelas, waktu muat halaman, atau berat teman sekelas.

Data buatan selalu rapi. Data nyata punya pencilan, dan pencilan itulah yang mengajarkan.` },
      { judul: 'Hitung ketiga ukuran pemusatan sendiri',
        isi: `Tulis fungsi \`rata\`, \`median\`, dan \`modus\` sendiri, jangan pakai pustaka.

Tangani dua kasus khusus pada modus: **tidak ada** modus, dan **lebih dari satu**. Keduanya nyata, dan keduanya sering dilupakan.` },
      { judul: 'Bandingkan rata-rata dengan median',
        isi: `- rata-rata **jauh di atas** median → ekor panjang ke kanan
- rata-rata **jauh di bawah** median → ekor panjang ke kiri
- **berdekatan** → cukup setangkup, rata-rata aman

Ini pemeriksaan yang harus jadi kebiasaan.` },
      { judul: 'Buktikan sendiri kekukuhan median',
        isi: `Ubah nilai terbesarmu menjadi sepuluh kali lipat, lalu hitung ulang.

Rata-rata melonjak; median **tidak bergerak sama sekali**. Melihatnya sendiri membuat kata "kukuh" berhenti jadi istilah hafalan.` },
      { judul: 'Selalu sertakan sebarannya',
        isi: `Hitung jangkauan, simpangan baku, dan IQR.

Lalu buat dua kumpulan data dengan rata-rata **sama persis** tetapi sebaran sangat berbeda. Tunjukkan bahwa melaporkan rata-rata saja menyembunyikan seluruh perbedaannya.` },
      { judul: 'Buktikan kenapa pembaginya n−1',
        isi: `Buat populasi besar, ambil ribuan sampel kecil, lalu hitung ragamnya dengan pembagi \`n\` dan \`n-1\`.

Rata-rata taksiran dengan \`n\` akan **terlalu kecil** secara sistematis. Angkanya membuktikan sendiri.` },
      { judul: 'Cari pencilan lalu telusuri asalnya',
        isi: `Pakai dua aturan: tiga simpangan baku, dan \`Q1 - 1,5 IQR\` sampai \`Q3 + 1,5 IQR\`.

Untuk tiap pencilan, tanyakan: **salah ketik, atau kejadian nyata?**

Jangan buang tanpa jawaban. Pencilan sering justru temuannya.` },
      { judul: 'Susun contoh paradoks Simpson sendiri',
        isi: `Buat dua kelompok, masing-masing dipecah dua bagian, dengan angka yang kamu tentukan.

Atur supaya satu kelompok unggul di **kedua bagian** dan kalah secara **gabungan**.

Menyusunnya sendiri jauh lebih melekat daripada membacanya.` }
    ],
    cek: [
      'Kamu selalu melaporkan pemusatan bersama ukuran sebarannya',
      'Kamu sudah membuktikan sendiri bahwa median tidak bergerak saat pencilan digandakan',
      'Setiap pencilan yang kamu buang punya alasan yang tercatat'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa rata-rata sering menyesatkan',

  konsep: `
Statistika deskriptif adalah **meringkas data** supaya bisa dipahami. Kedengarannya sederhana, dan justru di situ bahayanya: setiap ringkasan **membuang keterangan**, dan yang dibuang kadang justru yang paling penting.

**Tiga ukuran pemusatan**

- **Rata-rata** (*mean*) — jumlah dibagi banyaknya
- **Median** — nilai tengah setelah diurutkan
- **Modus** — nilai yang paling sering muncul

Ketiganya menjawab pertanyaan *"nilai khasnya berapa"*, dan ketiganya bisa memberi jawaban yang **sangat berbeda** untuk data yang sama.

**Kapan memakai yang mana**

| Ukuran | Kuat di | Lemah di |
|---|---|---|
| Rata-rata | data setangkup, semua nilai ikut dihitung | **hancur oleh pencilan** |
| Median | data melenceng, ada pencilan | mengabaikan besarnya nilai |
| Modus | data kategori — warna, merek | bisa tidak ada, atau lebih dari satu |

Kaidah praktisnya: **kalau datamu punya ekor panjang, laporkan median.**

Gaji, harga rumah, waktu tanggap peladen, jumlah pengikut — semuanya punya ekor panjang. Untuk data seperti itu, rata-rata menggambarkan sesuatu yang **tidak dialami siapa pun**.

**Kenapa median tahan pencilan**

Karena median cuma peduli **urutan**, bukan besarnya.

Mengubah nilai terbesar dari 120 menjadi 1200 sama sekali tidak menggeser median — ia tetap yang paling akhir. Tetapi rata-ratanya melonjak.

Sifat ini punya nama: **kekukuhan** (*robustness*). Ukuran yang kukuh tidak mudah dirusak oleh sedikit data yang aneh, entah karena salah ketik, alat rusak, atau kejadian luar biasa.

**Pemusatan saja tidak cukup**

Dua kumpulan data bisa punya rata-rata **sama persis** dan sama sekali berbeda:

- \`[50, 50, 50, 50, 50]\` — rata-rata 50, semuanya sama
- \`[10, 30, 50, 70, 90]\` — rata-rata 50, sebarannya lebar

Karena itu ringkasan yang jujur **selalu** menyebutkan sebarannya juga.

**Ukuran sebaran**

- **Jangkauan** — terbesar dikurangi terkecil. Sederhana, dan sangat peka pencilan.
- **Ragam** (*variance*) — rata-rata kuadrat simpangan dari rata-rata
- **Simpangan baku** — akar ragam, satuannya kembali seperti data aslinya
- **Jangkauan antar-kuartil** (IQR) — Q3 dikurangi Q1, kukuh terhadap pencilan

Kuadratnya bukan mempersulit. Ia dipakai supaya simpangan positif dan negatif **tidak saling meniadakan**, dan supaya simpangan besar diberi bobot lebih.

**Kenapa ragam sampel dibagi n−1**

Ini yang paling sering dihafal tanpa dipahami.

Kalau kamu punya seluruh populasi, bagi dengan \`n\`. Kalau kamu punya sampel dan ingin **menaksir** ragam populasi, bagi dengan \`n-1\`.

Sebabnya: simpangan diukur dari rata-rata **sampel**, yang menurut definisinya sudah berada di tengah sampel itu. Jaraknya jadi **lebih kecil** daripada jarak ke rata-rata populasi yang sebenarnya. Membagi \`n-1\` mengoreksi kecenderungan menaksir terlalu rendah itu.

**Mengenali pencilan**

Dua cara yang lazim:

- lebih dari **tiga simpangan baku** dari rata-rata
- di luar \`Q1 - 1,5 IQR\` sampai \`Q3 + 1,5 IQR\`

Dan setelah menemukannya, **jangan langsung dibuang**. Tanyakan dulu: salah ketik, atau kejadian nyata yang penting? Pencilan sering justru **temuannya**, bukan gangguannya.

**Paradoks Simpson**

Ini jebakan paling berbahaya dalam meringkas data: **menggabungkan kelompok bisa membalik kesimpulan.**

Sebuah kelompok bisa lebih unggul di **setiap** bagian, dan kalah ketika semuanya dijumlahkan — kalau komposisi bagiannya berbeda.

Karena itu, sebelum menggabungkan, tanyakan: **apakah komposisi tiap kelompok sebanding?** Kalau tidak, ringkasan gabungannya bisa menyesatkan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SATU PENCILAN, DUA UKURAN YANG BERBEDA NASIB\n#\n# Berat 10 orang, salah satunya 120 kg:\n#\n#   ukuran        dengan 120kg    tanpa    selisih\n#   rata-rata             65.3     59.2       -6.1\n#   median                60.0     58.0       -2.0\n#\n# Rata-rata bergeser 6.1 kg; median cuma 2.0 kg.\n#\n# Median cuma peduli URUTAN, bukan besarnya.\n# Ubah 120 menjadi 1200 dan median TIDAK BERGERAK\n# sama sekali -- ia tetap nilai paling akhir.',
      penjelasan: `
Perbedaan antara rata-rata dan median terlihat kecil di kelas dan **menentukan** di kerja nyata. Alasannya bisa dipahami sampai tuntas, dan setelah itu ia tidak akan tertukar lagi.

Mulai dari cara keduanya dihitung.

**Rata-rata menjumlahkan semua nilai.** Setiap angka ikut, dan **besarnya** ikut. Satu nilai yang sepuluh kali lebih besar menyumbang sepuluh kali lebih banyak ke jumlahnya.

**Median mengurutkan lalu mengambil yang tengah.** Setiap angka ikut, tetapi hanya **posisinya** yang dipakai. Nilai terbesar cuma dianggap "yang paling akhir" — entah ia 120 atau 1200 atau sejuta.

Dari beda itu, semuanya mengikuti.

Ubah 120 kg menjadi 1200 kg. Rata-rata melonjak dari 65,3 menjadi 173,3. Median **sama sekali tidak bergerak** — orang itu masih yang paling akhir dalam urutan, dan yang di tengah masih orang yang sama.

Ini bukan sekadar keingintahuan. Ia menentukan laporan mana yang boleh dipercaya.

Bayangkan berita berjudul *"rata-rata gaji lulusan program ini Rp 15 juta"*. Angkanya mungkin benar secara aritmetika. Tetapi kalau satu orang dari seratus menjadi pendiri perusahaan besar, ia sendirian bisa menaikkan rata-rata seluruh angkatan — sementara **sembilan puluh sembilan lainnya** berpenghasilan jauh di bawahnya.

Median akan menceritakan yang sebenarnya.

Sekarang cara mengenali data yang seperti ini tanpa menggambar apa pun: **bandingkan rata-rata dengan mediannya.**

- **rata-rata jauh di atas median** → ada ekor panjang ke kanan; beberapa nilai sangat besar
- **rata-rata jauh di bawah median** → ekor panjang ke kiri
- **keduanya berdekatan** → sebarannya cukup setangkup, rata-rata aman dipakai

Pemeriksaan ini gratis, satu baris kode, dan sebaiknya dilakukan **setiap kali** kamu melaporkan rata-rata.

Lalu, kapan rata-rata justru yang benar?

Ketika kamu benar-benar peduli pada **totalnya**. Kalau kamu memesan makanan untuk seratus orang, yang kamu butuhkan rata-rata porsi — karena rata-rata dikali jumlah orang memberi total yang harus disiapkan. Median tidak punya sifat itu.

Jadi pertanyaannya bukan *"mana yang lebih baik"*. Pertanyaannya: **apakah saya butuh nilai yang khas, atau butuh totalnya?**

Yang pertama median. Yang kedua rata-rata.

Dan satu kebiasaan yang menutup semuanya: **laporkan keduanya, beserta ukuran sebarannya**. Tiga angka masih ringkas, dan hampir tidak mungkin menyesatkan.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Statistika deskriptif: kasus proyek BMI
# ============================================
import math
from collections import Counter

# --------------------------------------------
# 1. Data dari kasus BMI
# --------------------------------------------
ORANG = [
    ("Andi",   55, 165), ("Budi",   62, 170), ("Citra",  48, 158),
    ("Dedi",   70, 172), ("Eka",    52, 160), ("Fajar",  68, 175),
    ("Gita",   45, 155), ("Hana",   58, 163), ("Indra",  75, 178),
    ("Joko",  120, 168),
]
def bmi(berat, tinggi_cm):
    return berat / (tinggi_cm / 100) ** 2

NILAI = [bmi(b, t) for _, b, t in ORANG]
BERAT = [b for _, b, _ in ORANG]

print("--- data ---")
print("  " + "nama".ljust(8) + "berat".rjust(7) + "tinggi".rjust(8)
      + "BMI".rjust(8) + "  kategori")
def kategori(v):
    if v < 18.5:  return "kurus"
    if v < 25.0:  return "normal"
    if v < 30.0:  return "gemuk"
    return "obesitas"
for (n, b, t), v in zip(ORANG, NILAI):
    print("  " + n.ljust(8) + str(b).rjust(7) + str(t).rjust(8)
          + ("%.1f" % v).rjust(8) + "  " + kategori(v))

# --------------------------------------------
# 2. Tiga ukuran pemusatan
# --------------------------------------------
def rata(d):
    return sum(d) / len(d)

def median(d):
    s = sorted(d)
    n = len(s)
    return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2

def modus(d):
    c = Counter(d)
    m = max(c.values())
    if m == 1:
        return None
    return sorted(k for k, v in c.items() if v == m)

print("")
print("--- tiga ukuran pemusatan (berat badan) ---")
print("  rata-rata : " + ("%.1f kg" % rata(BERAT)))
print("  median    : " + ("%.1f kg" % median(BERAT)))
print("  modus     : " + str(modus(BERAT) or "tidak ada (semua muncul sekali)"))
print("")
print("  Rata-rata " + ("%.1f" % rata(BERAT))
      + " kg, tetapi " + str(sum(1 for b in BERAT if b < rata(BERAT)))
      + " dari 10 orang beratnya DI BAWAH itu.")
print("  Satu orang 120 kg menarik rata-ratanya ke atas.")

# --------------------------------------------
# 3. Buang pencilan, lihat mana yang goyah
# --------------------------------------------
TANPA = [b for b in BERAT if b != 120]
print("")
print("--- pengaruh satu pencilan ---")
print("  " + "ukuran".ljust(12) + "dengan 120kg".rjust(14)
      + "tanpa".rjust(9) + "selisih".rjust(10))
for nama, f in (("rata-rata", rata), ("median", median)):
    a, b = f(BERAT), f(TANPA)
    print("  " + nama.ljust(12) + ("%.1f" % a).rjust(14)
          + ("%.1f" % b).rjust(9)
          + ("%+.1f" % (b - a)).rjust(10))
print("")
print("  Rata-rata bergeser jauh; median hampir tidak.")
print("  Median TAHAN pencilan karena ia cuma peduli")
print("  URUTAN, bukan besarnya. Kalau datamu punya")
print("  ekor panjang -- gaji, waktu tanggap, harga --")
print("  laporkan median, bukan rata-rata.")

# --------------------------------------------
# 4. Sebaran: dua data, rata-rata sama
# --------------------------------------------
A = [50, 50, 50, 50, 50]
B = [10, 30, 50, 70, 90]

def ragam(d, sampel=True):
    m = rata(d)
    pembagi = len(d) - 1 if sampel else len(d)
    return sum((x - m) ** 2 for x in d) / pembagi

def simpangan(d, sampel=True):
    return math.sqrt(ragam(d, sampel))

print("")
print("--- rata-rata sama, sebaran beda ---")
for nama, d in (("A", A), ("B", B)):
    print("  " + nama + " = " + str(d))
    print("      rata-rata  " + ("%.1f" % rata(d))
          + "   jangkauan " + str(max(d) - min(d))
          + "   simpangan baku " + ("%.2f" % simpangan(d)))
print("")
print("  Rata-rata saja tidak cukup. Yang sering menentukan")
print("  justru SEBARANnya: 'rata-rata 50' bisa berarti")
print("  semua orang 50, atau setengahnya 10 dan setengahnya 90.")

# --------------------------------------------
# 5. Kenapa pembaginya n-1
# --------------------------------------------
print("")
print("--- kenapa ragam sampel dibagi n-1 ---")
import random
_rp = random.Random(9)
POP = [_rp.gauss(0, 1) for _ in range(100000)]
r = random.Random(4)
kumpul_n, kumpul_n1 = [], []
for _ in range(3000):
    s = r.sample(POP, 5)
    kumpul_n.append(ragam(s, sampel=False))
    kumpul_n1.append(ragam(s, sampel=True))
sejati = ragam(POP, sampel=False)
print("  ragam populasi sejati        : " + ("%.4f" % sejati))
print("  rata-rata taksiran /n        : " + ("%.4f" % rata(kumpul_n))
      + "   (terlalu kecil)")
print("  rata-rata taksiran /(n-1)    : " + ("%.4f" % rata(kumpul_n1))
      + "   (pas)")
print("")
print("  Membagi n MENAKSIR TERLALU RENDAH secara sistematis,")
print("  karena simpangan diukur dari rata-rata SAMPEL yang")
print("  kebetulan sudah dekat dengan datanya sendiri.")
print("  Pembagi n-1 mengoreksinya.")

# --------------------------------------------
# 6. Rata-rata bisa menyesatkan: paradoks Simpson
# --------------------------------------------
print("")
print("--- rata-rata gabungan bisa membalik kesimpulan ---")
# (lulus, ikut) per kelompok
DOSEN = {
    "Dosen A": {"pagi": (18, 20), "malam": (40, 80)},
    "Dosen B": {"pagi": (68, 80), "malam": (9, 20)},
}
for nama, kel in DOSEN.items():
    lulus = sum(v[0] for v in kel.values())
    ikut = sum(v[1] for v in kel.values())
    rinci = "   ".join(
        k + " " + ("%.0f%%" % (v[0] / v[1] * 100)) for k, v in kel.items())
    print("  " + nama + "  " + rinci
          + "   GABUNGAN " + ("%.0f%%" % (lulus / ikut * 100)))
print("")
print("  Dosen A menang di KEDUA kelas, dan tetap kalah")
print("  secara gabungan. Sebabnya: A mengajar 80 dari 100")
print("  mahasiswanya di kelas malam yang memang lebih sulit,")
print("  sementara B kebanyakan mengajar kelas pagi.")
print("  Menggabungkan kelompok yang komposisinya berbeda")
print("  bisa MEMBALIK kesimpulan. Ini paradoks Simpson.")` },
  output: `--- data ---
  nama      berat  tinggi     BMI  kategori
  Andi         55     165    20.2  normal
  Budi         62     170    21.5  normal
  Citra        48     158    19.2  normal
  Dedi         70     172    23.7  normal
  Eka          52     160    20.3  normal
  Fajar        68     175    22.2  normal
  Gita         45     155    18.7  normal
  Hana         58     163    21.8  normal
  Indra        75     178    23.7  normal
  Joko        120     168    42.5  obesitas

--- tiga ukuran pemusatan (berat badan) ---
  rata-rata : 65.3 kg
  median    : 60.0 kg
  modus     : tidak ada (semua muncul sekali)

  Rata-rata 65.3 kg, tetapi 6 dari 10 orang beratnya DI BAWAH itu.
  Satu orang 120 kg menarik rata-ratanya ke atas.

--- pengaruh satu pencilan ---
  ukuran        dengan 120kg    tanpa   selisih
  rata-rata             65.3     59.2      -6.1
  median                60.0     58.0      -2.0

  Rata-rata bergeser jauh; median hampir tidak.
  Median TAHAN pencilan karena ia cuma peduli
  URUTAN, bukan besarnya. Kalau datamu punya
  ekor panjang -- gaji, waktu tanggap, harga --
  laporkan median, bukan rata-rata.

--- rata-rata sama, sebaran beda ---
  A = [50, 50, 50, 50, 50]
      rata-rata  50.0   jangkauan 0   simpangan baku 0.00
  B = [10, 30, 50, 70, 90]
      rata-rata  50.0   jangkauan 80   simpangan baku 31.62

  Rata-rata saja tidak cukup. Yang sering menentukan
  justru SEBARANnya: 'rata-rata 50' bisa berarti
  semua orang 50, atau setengahnya 10 dan setengahnya 90.

--- kenapa ragam sampel dibagi n-1 ---
  ragam populasi sejati        : 1.0000
  rata-rata taksiran /n        : 0.8028   (terlalu kecil)
  rata-rata taksiran /(n-1)    : 1.0036   (pas)

  Membagi n MENAKSIR TERLALU RENDAH secara sistematis,
  karena simpangan diukur dari rata-rata SAMPEL yang
  kebetulan sudah dekat dengan datanya sendiri.
  Pembagi n-1 mengoreksinya.

--- rata-rata gabungan bisa membalik kesimpulan ---
  Dosen A  pagi 90%   malam 50%   GABUNGAN 58%
  Dosen B  pagi 85%   malam 45%   GABUNGAN 77%

  Dosen A menang di KEDUA kelas, dan tetap kalah
  secara gabungan. Sebabnya: A mengajar 80 dari 100
  mahasiswanya di kelas malam yang memang lebih sulit,
  sementara B kebanyakan mengajar kelas pagi.
  Menggabungkan kelompok yang komposisinya berbeda
  bisa MEMBALIK kesimpulan. Ini paradoks Simpson.`,

  kesalahanUmum: [
    {
      salah: 'Melaporkan rata-rata untuk data yang punya ekor panjang.',
      kenapa: 'Gaji, harga, dan waktu tanggap punya sedikit nilai yang sangat besar, dan nilai itu menarik rata-rata jauh ke atas. Angka yang dihasilkan menggambarkan pengalaman yang tidak dialami siapa pun, dan sebagian besar data justru berada di bawahnya.',
      benar: 'Bandingkan rata-rata dengan mediannya lebih dulu, dan laporkan median bila keduanya berjauhan.'
    },
    {
      salah: 'Meringkas data hanya dengan ukuran pemusatan tanpa menyebut sebarannya.',
      kenapa: 'Dua kumpulan data bisa punya rata-rata sama persis dan sama sekali berbeda bentuknya. Rata-rata 50 bisa berarti semua orang 50, atau setengahnya 10 dan setengahnya 90, dan keputusan yang tepat untuk keduanya sangat berbeda.',
      benar: 'Sertakan simpangan baku atau jangkauan antar-kuartil setiap kali melaporkan ukuran pemusatan.'
    },
    {
      salah: 'Membagi dengan n saat menghitung ragam dari sebuah sampel.',
      kenapa: 'Simpangan diukur dari rata-rata sampel yang menurut definisinya sudah berada di tengah sampel itu, sehingga jaraknya lebih kecil daripada jarak ke rata-rata populasi sebenarnya. Akibatnya taksirannya terlalu rendah secara sistematis, bukan sesekali.',
      benar: 'Bagi dengan n dikurangi satu untuk sampel, dan dengan n hanya bila datamu memang seluruh populasi.'
    },
    {
      salah: 'Membuang pencilan begitu ditemukan supaya grafiknya rapi.',
      kenapa: 'Pencilan bisa berarti salah ketik, tetapi bisa juga berarti kejadian nyata yang justru paling penting: serangan, kecurangan, atau kegagalan besar. Membuangnya tanpa diperiksa berarti menghapus temuan sekaligus buktinya.',
      benar: 'Telusuri asal tiap pencilan lebih dulu, lalu putuskan membuang atau mempertahankannya dengan alasan yang dicatat.'
    },
    {
      salah: 'Menyimpulkan dari angka gabungan tanpa memeriksa komposisi kelompoknya.',
      kenapa: 'Paradoks Simpson menunjukkan sebuah kelompok bisa unggul di setiap bagian dan tetap kalah secara gabungan, bila komposisi bagiannya berbeda. Kesimpulan yang diambil dari angka gabungan bisa berlawanan dengan kenyataan di setiap bagiannya.',
      benar: 'Pecah data menurut kelompok yang relevan lebih dulu, dan gabungkan hanya bila komposisinya sebanding.'
    },
    {
      salah: 'Menganggap modus selalu ada dan selalu tunggal.',
      kenapa: 'Pada data ukuran yang tepat sampai desimal, sering tidak ada satu nilai pun yang muncul lebih dari sekali. Sebaliknya, sebuah data bisa punya dua atau lebih nilai dengan frekuensi tertinggi yang sama.',
      benar: 'Tangani ketiadaan modus dan modus ganda secara terpisah, dan pakai modus terutama untuk data kategori.'
    }
  ],

  analogi: `Bayangkan **sepuluh orang duduk di warung**, dan kamu ingin tahu *"berapa uang khas yang dipegang orang di sini"*.

Sembilan orang memegang sekitar lima puluh ribu. Satu orang, yang kebetulan mampir, memegang **lima ratus juta**.

**Rata-rata** menjumlahkan semuanya dan membagi sepuluh: sekitar **lima puluh juta** per orang.

Angka itu benar. Dan ia menggambarkan warung yang **tidak ada**. Tidak ada satu orang pun di situ yang memegang lima puluh juta.

**Median** mengurutkan sepuluh orang dari yang paling sedikit uangnya, lalu menunjuk yang di tengah: sekitar **lima puluh ribu**.

Itulah warung yang sebenarnya.

Sekarang perhatikan yang menarik. Kalau orang kaya itu ternyata memegang **lima miliar**, bukan lima ratus juta, rata-ratanya melonjak sepuluh kali lipat.

Median **tidak bergerak sama sekali**. Orang itu masih yang paling akhir dalam barisan, dan yang di tengah masih orang yang sama.

Dan kapan rata-rata justru yang benar? Kalau kamu bertanya *"cukupkah uang di warung ini untuk membeli motor"*. Untuk pertanyaan **total**, rata-rata yang menjawab.

Untuk pertanyaan **khas**, median.`,

  latihan: [
    'Hitung rata-rata, median, dan modus untuk data berat badan sepuluh orang, lalu jelaskan kenapa ketiganya berbeda.',
    'Tambahkan satu pencilan ke data itu, hitung ulang, dan bandingkan pergeseran rata-rata dengan pergeseran median.',
    'Buat dua kumpulan data dengan rata-rata sama tetapi simpangan baku sangat berbeda, lalu jelaskan akibatnya bagi keputusan.',
    'Jelaskan kenapa ragam memakai kuadrat, bukan nilai mutlak.',
    'Jalankan percobaan yang membandingkan taksiran ragam dengan pembagi n dan n dikurangi satu, lalu jelaskan hasilnya.',
    'Cari pencilan pada satu data nyata dengan aturan tiga simpangan baku dan dengan aturan IQR, lalu bandingkan temuannya.',
    'Berikan satu contoh pencilan yang justru merupakan temuan penting, bukan gangguan.',
    'Susun contoh paradoks Simpson sendiri dengan angka yang kamu tentukan, dan tunjukkan pembalikannya.',
    'Ambil satu berita yang menyebut rata-rata, lalu jelaskan apakah median akan menceritakan hal yang berbeda.',
    'Sebutkan satu keadaan di mana rata-rata justru lebih tepat daripada median, beserta alasannya.'
  ]
});


TOPICS.push({
  id: 'probstat-peluang',
  judul: 'Peluang, Bersyarat & Bayes',
  kategori: 'probstat',
  tag: ['ruang sampel', 'peluang bersyarat', 'saling bebas', 'teorema Bayes', 'false positive', 'presisi'],
  ringkas: 'Uji yang akurat 99 persen, dan hanya 9 dari 100 hasil positifnya yang benar.',

  fungsi: `**Menghitung seberapa sering sesuatu terjadi, saat naluri hampir pasti keliru.**

Terpakai di:

- **Menilai model klasifikasi** — presisi, recall, dan alarm palsu
- **Deteksi penipuan, spam, dan serangan** — semuanya kejadian jarang
- **Kecerdasan Buatan** — Naive Bayes memakai teorema ini langsung
- **Menilai risiko** apa pun yang melibatkan ketidakpastian

Yang paling sering salah dan paling mahal: **\`P(sakit|positif)\` bukan \`P(positif|sakit)\`.**

Uji yang menangkap 99 persen orang sakit bisa menghasilkan positif yang benar hanya 9 persen, kalau penyakitnya jarang. Kekeliruan ini punya nama: *prosecutor's fallacy*.

Dan satu kaidah yang menghemat: **untuk "minimal satu", hitung peluang tidak ada satu pun lalu kurangkan dari 1.** Menjumlahkan hampir selalu salah.`,

  praktik: {
    tujuan: `Kamu bisa menghitung peluang dengan mencacah, membalik arahnya dengan Bayes, dan menilai pendeteksi secara jujur.`,
    alat: [
      'Python 3 dengan `itertools` dan `fractions`',
      'Kertas'
    ],
    langkah: [
      { judul: 'Cacah ruang sampelnya dengan kode',
        isi: `Pakai \`itertools.product\` untuk membuat semua hasil, lalu hitung dengan menyaring.

Ini cara paling aman: kamu tidak bisa keliru menghitung kalau komputernya yang mencacah.` },
      { judul: 'Pakai pecahan, bukan desimal',
        isi: `- \`from fractions import Fraction\`

Jawaban seperti \`11/36\` jauh lebih mudah diperiksa daripada \`0.3055555\`, dan tidak ada galat pembulatan yang menyamarkan kesalahan.` },
      { judul: 'Buktikan menjumlahkan itu salah',
        isi: `Hitung "minimal satu 6 dari dua dadu" dengan tiga cara: menjumlahkan \`1/6 + 1/6\`, dengan lawannya, dan dengan mencacah.

Cara pertama memberi \`1/3\`; dua lainnya memberi \`11/36\`. Sekarang kamu tahu kenapa.

Coba juga untuk enam lemparan — cara menjumlahkan memberi peluang **1**, yang jelas mustahil.` },
      { judul: 'Uji kebebasan, jangan tebak',
        isi: `Periksa apakah \`P(A dan B) = P(A) x P(B)\` untuk beberapa pasang kejadian.

Cari yang mengejutkan: pada dua dadu, "jumlah 7" **bebas** dari nilai dadu pertama, sementara "jumlah 8" **tidak**.

Kalau naluri bisa salah di kasus sesederhana ini, ia pasti salah di kasus rumit.` },
      { judul: 'Kerjakan Bayes dengan membayangkan orang',
        isi: `Jangan mulai dari rumus. Mulai dari **seratus ribu orang**.

Berapa yang sakit? Berapa dari mereka terdeteksi? Berapa yang sehat? Berapa dari mereka salah terdeteksi?

Jumlahkan seluruh yang positif, lalu bagi. Rumusnya akan terasa jelas setelahnya.` },
      { judul: 'Ubah-ubah seberapa jarang kejadiannya',
        isi: `Jalankan hitungan yang sama untuk kejadian 1 per 100, 1 per 2000, dan 1 per 10.000, dengan uji yang **sama akuratnya**.

Presisinya jatuh dari 50 persen ke 1 persen. Uji yang tidak berubah, hasil yang berubah total.` },
      { judul: 'Nilai pendeteksimu sendiri dengan jujur',
        isi: `Kalau kamu punya model klasifikasi, jangan laporkan akurasi.

Laporkan **presisi** (dari yang ditandai, berapa benar) dan **recall** (dari yang ada, berapa tertangkap), beserta seberapa jarang kejadiannya.

Ketiga angka itu tidak bisa disembunyikan oleh ketimpangan kelompok.` },
      { judul: 'Rancang deteksi dua tingkat',
        isi: `Uji murah bercakupan luas untuk menyaring, lalu uji mahal yang teliti hanya pada yang lolos.

Hitung presisi gabungannya. Kelompok yang masuk ke tingkat kedua jauh lebih pekat, jadi hasilnya jauh lebih bisa dipercaya.` }
    ],
    cek: [
      'Kamu menghitung ruang sampel dengan kode, bukan menebaknya',
      'Kamu bisa menjelaskan Bayes dengan membayangkan orang, tanpa menulis rumusnya',
      'Kamu melaporkan presisi dan recall, bukan akurasi sendirian'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa akurasi 99 persen hampir tak berarti',

  konsep: `
Peluang mengukur **seberapa sering** sesuatu terjadi kalau keadaannya diulang berkali-kali. Naluri manusia sangat buruk dalam hal ini, dan itu bukan kekurangan pribadi — ia bawaan.

Karena itu kaidah pertamanya: **hitung, jangan menebak.**

**Ruang sampel**

Kumpulan semua hasil yang mungkin. Melempar dua dadu punya **36** hasil, bukan 11 — karena \`(1,3)\` dan \`(3,1)\` adalah dua hasil berbeda meski jumlahnya sama.

Melewatkan langkah ini penyebab sebagian besar kekeliruan peluang. Kalau semua hasil **sama mungkin**, maka:

\`P(kejadian) = banyaknya hasil yang memenuhi / banyaknya seluruh hasil\`

Menghitung pembilangnya adalah kombinatorika — yang kamu pelajari di Matematika Diskrit. Peluang dan kombinatorika adalah alat yang sama, dipakai berurutan.

**Empat aturan dasar**

- \`0 <= P(A) <= 1\`
- \`P(tidak A) = 1 - P(A)\`
- \`P(A atau B) = P(A) + P(B) - P(A dan B)\`
- \`P(A dan B) = P(A) x P(B|A)\`

Aturan ketiga punya suku pengurang karena tanpa itu, hasil yang memenuhi keduanya akan **dihitung dua kali**.

**Kaidah yang menyelamatkan: pakai lawannya**

Untuk pertanyaan berbentuk **"minimal satu"**, hampir selalu lebih mudah menghitung peluang **tidak ada satu pun**, lalu menguranginya dari 1.

\`P(minimal satu 6) = 1 - P(tidak ada 6) = 1 - (5/6)^2\`

Menjumlahkan \`1/6 + 1/6\` salah, karena keduanya bisa terjadi bersamaan.

**Peluang bersyarat**

\`P(A|B)\` = peluang A **kalau sudah diketahui** B terjadi.

\`P(A|B) = P(A dan B) / P(B)\`

Cara membayangkannya: syarat **menyusutkan ruang sampelnya**. Kamu tidak lagi melihat 36 hasil — kamu hanya melihat hasil yang memenuhi B, lalu bertanya berapa bagian di antaranya yang juga memenuhi A.

**Saling bebas**

A dan B saling bebas kalau \`P(A dan B) = P(A) x P(B)\` — artinya mengetahui B **tidak mengubah** peluang A.

Kebebasan harus **diuji**, bukan ditebak. Ada kasus yang mengejutkan: pada dua dadu, kejadian "jumlah 7" ternyata **bebas** dari nilai dadu pertama, sementara "jumlah 8" **tidak**.

Mengandaikan kebebasan yang tidak berlaku adalah penyebab kegagalan besar di dunia nyata — termasuk krisis keuangan 2008, tempat risiko kredit diandaikan saling bebas padahal semuanya bergantung pada harga rumah.

**Teorema Bayes**

\`P(A|B) = P(B|A) x P(A) / P(B)\`

Gunanya: **membalik arah** peluang bersyarat.

Uji medis memberi tahu \`P(positif | sakit)\` — kalau kamu sakit, seberapa sering ujinya menangkapnya. Yang kamu **butuhkan** adalah \`P(sakit | positif)\` — kalau hasilnya positif, seberapa besar peluang kamu benar-benar sakit.

Keduanya **sangat berbeda**, dan mengiranya sama adalah kekeliruan yang punya nama: *prosecutor's fallacy*.

**Kenapa akurasi 99 persen bisa tidak berarti**

Kalau penyakitnya menimpa 1 dari 1000 orang, dan ujinya benar 99 persen di kedua arah, maka dari setiap 100 hasil positif hanya sekitar **9** yang benar-benar sakit.

Sebabnya: yang sehat jauh lebih banyak. Satu persen kesalahan dari kelompok besar **mengalahkan** 99 persen kebenaran dari kelompok kecil.

**Ini bukan soal kedokteran**

Pola yang sama berlaku di mana-mana, dan makin **jarang** kejadiannya makin buruk:

- **penyaring spam** — email mencurigakan yang ternyata bukan spam
- **deteksi penipuan** — transaksi ditandai yang ternyata sah
- **alarm keamanan** — peringatan yang ternyata palsu

Inilah sebab tim keamanan tenggelam dalam peringatan palsu, dan sebab **"akurasi 99 persen"** hampir tidak berarti apa-apa kalau disebut sendirian tanpa menyebut seberapa jarang kejadiannya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# BAYES: BAYANGKAN 100.000 ORANG\n#\n# Penyakit menimpa 1 dari 1000.\n# Uji benar 99% di kedua arah.\n#\n#   kelompok             jumlah   positif\n#   benar-benar sakit       100        99\n#   sehat                 99900       999\n#   total positif                    1098\n#\n# P(sakit | positif) = 99 / 1098 = 9.0%\n#\n# Yang sehat 999x lebih banyak, jadi 1% kesalahan\n# dari kelompok besar MENGALAHKAN 99% kebenaran\n# dari kelompok kecil.',
      penjelasan: `
Rumus Bayes mudah dihafal dan sulit dirasakan. Cara yang membuatnya masuk akal seketika: **jangan pakai pecahan, pakai orang.**

Bayangkan seratus ribu orang benar-benar diperiksa.

Penyakitnya menimpa 1 dari 1000, jadi **100 orang** sakit dan **99.900** sehat. Perhatikan angka ini dulu — ketimpangannya hampir seribu banding satu, dan ketimpangan itulah yang menentukan segalanya.

Sekarang jalankan ujinya.

Dari **100 yang sakit**, ujinya benar 99 persen, jadi **99** terdeteksi positif. Bagus.

Dari **99.900 yang sehat**, ujinya salah 1 persen. Satu persen terdengar kecil — tetapi satu persen dari 99.900 adalah **999 orang**.

Sekarang jumlahkan yang hasilnya positif: **99 + 999 = 1.098 orang**.

Dari 1.098 orang yang menerima kabar buruk itu, cuma **99** yang benar-benar sakit. Sisanya **sehat**.

\`99 / 1098 = 9 persen\`

Angka ini mengejutkan hampir semua orang, termasuk dokter, dan sudah berkali-kali diuji dalam penelitian. Kenapa naluri gagal di sini?

Karena naluri **mengabaikan seberapa jarang kejadiannya**. Kita mendengar "akurat 99 persen" dan langsung berpikir "berarti 99 persen benar". Yang terlewat: hasil positif bisa datang dari **dua sumber**, dan sumber kedua jauh lebih besar.

Cara mengingatnya: **satu persen kesalahan dari kelompok raksasa mengalahkan sembilan puluh sembilan persen kebenaran dari kelompok mungil.**

Sekarang bagian yang membuat ini penting bagi orang Informatika, karena pola ini muncul jauh di luar kedokteran.

Kamu membangun **penyaring spam** dengan akurasi 99 persen. Kalau 1 persen email adalah spam, maka separuh email yang ditandai spam ternyata **bukan** spam. Setengah dari kotak spam pengguna berisi surat yang seharusnya masuk.

Kamu membangun **deteksi penipuan** dengan akurasi yang sama. Kalau penipuan terjadi 1 dari 2000 transaksi, maka **95 persen** transaksi yang kamu blokir adalah pelanggan sah yang kartunya kamu tolak di kasir.

Kamu memasang **alarm keamanan** yang akurat 99 persen pada sistem yang benar-benar diserang 1 dari 10.000 hari. Sembilan puluh sembilan persen alarm yang berbunyi **palsu** — dan tim yang menerimanya akan berhenti menanggapinya dalam sebulan.

Kesimpulannya bukan "jangan membangun pendeteksi". Kesimpulannya ada tiga, dan ketiganya bisa langsung dipakai.

**Pertama, jangan pernah melaporkan akurasi sendirian.** Laporkan **presisi** — dari yang ditandai, berapa yang benar — dan **recall** — dari yang benar-benar ada, berapa yang tertangkap. Kedua angka itu tidak bisa disembunyikan oleh ketimpangan kelompok.

**Kedua, untuk kejadian jarang, spesifisitas jauh lebih menentukan daripada sensitivitas.** Menaikkan ketepatan pada yang sehat dari 99 menjadi 99,9 persen memangkas alarm palsu **sepuluh kali lipat**. Menaikkan ketepatan pada yang sakit hampir tidak mengubah apa pun.

**Ketiga, susun bertingkat.** Pakai uji murah bercakupan luas untuk menyaring dulu, lalu uji mahal yang lebih teliti hanya pada yang lolos saringan pertama. Kelompok yang masuk ke uji kedua sudah jauh lebih pekat, sehingga hasil positifnya jauh lebih bisa dipercaya.

Itulah sebabnya penyaringan medis selalu diikuti uji lanjutan, dan sebabnya sistem deteksi yang baik tidak pernah bertumpu pada satu penanda.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Peluang: aturan, bersyarat, dan Bayes
# ============================================
import itertools, random
from fractions import Fraction as F

# --------------------------------------------
# 1. Ruang sampel: hitung dulu, jangan menebak
# --------------------------------------------
RUANG = list(itertools.product(range(1, 7), repeat=2))
print("--- dua dadu: 36 hasil yang sama mungkin ---")
print("  ukuran ruang sampel : " + str(len(RUANG)))

def peluang(syarat):
    n = sum(1 for h in RUANG if syarat(h))
    return F(n, len(RUANG))

KEJADIAN = [
    ("jumlah = 7",        lambda h: sum(h) == 7),
    ("jumlah = 2",        lambda h: sum(h) == 2),
    ("jumlah genap",      lambda h: sum(h) % 2 == 0),
    ("kedua dadu sama",   lambda h: h[0] == h[1]),
    ("minimal satu 6",    lambda h: 6 in h),
]
print("  " + "kejadian".ljust(20) + "peluang".rjust(9) + "desimal".rjust(10))
for nama, f in KEJADIAN:
    p = peluang(f)
    print("  " + nama.ljust(20) + str(p).rjust(9)
          + ("%.4f" % float(p)).rjust(10))
print("")
print("  Naluri sering keliru di sini. 'Jumlah 7' ENAM kali")
print("  lebih mungkin daripada 'jumlah 2', padahal keduanya")
print("  sama-sama satu angka. Sebabnya: ada 6 cara membentuk")
print("  7 dan cuma 1 cara membentuk 2.")

# --------------------------------------------
# 2. Kesalahan paling sering: menjumlahkan peluang
# --------------------------------------------
print("")
print("--- 'minimal satu 6' bukan 1/6 + 1/6 ---")
print("  salah  : 1/6 + 1/6 = " + str(F(1,6) + F(1,6))
      + "  (menghitung ganda dadu ganda-6)")
print("  benar  : 1 - (5/6)^2 = " + str(1 - F(5,6) ** 2))
print("  hitung : " + str(peluang(lambda h: 6 in h)))
print("")
print("  Menjumlahkan hanya sah kalau kejadiannya SALING")
print("  LEPAS -- tidak bisa terjadi bersamaan.")
print("  Cara paling aman untuk 'minimal satu': hitung")
print("  peluang TIDAK ADA satu pun, lalu kurangkan dari 1.")

# --------------------------------------------
# 3. Peluang bersyarat
# --------------------------------------------
def bersyarat(A, B):
    ab = sum(1 for h in RUANG if A(h) and B(h))
    b = sum(1 for h in RUANG if B(h))
    return F(ab, b) if b else None

print("")
print("--- peluang bersyarat: syaratnya menyusutkan ruang ---")
UJI = [
    ("jumlah 7", lambda h: sum(h) == 7, "dadu pertama 3", lambda h: h[0] == 3),
    ("jumlah 7", lambda h: sum(h) == 7, "kedua dadu genap", lambda h: h[0] % 2 == 0 and h[1] % 2 == 0),
    ("dadu 1 = 6", lambda h: h[0] == 6, "jumlah 7", lambda h: sum(h) == 7),
]
for na, fa, nb, fb in UJI:
    p0 = peluang(fa)
    p1 = bersyarat(fa, fb)
    print("  P(" + na + ") = " + str(p0))
    print("     diberi " + nb + " -> " + str(p1))
print("")
print("  Baris kedua nol: dua dadu genap tidak akan pernah")
print("  berjumlah ganjil. Syarat bisa membuat kejadian yang")
print("  tadinya mungkin menjadi MUSTAHIL.")

# --------------------------------------------
# 4. Saling bebas: diuji, bukan diandaikan
# --------------------------------------------
print("")
print("--- saling bebas atau tidak? ---")
def bebas(A, B):
    return peluang(lambda h: A(h) and B(h)) == peluang(A) * peluang(B)
PASANG = [
    ("dadu1 = 6", lambda h: h[0] == 6, "dadu2 = 6", lambda h: h[1] == 6),
    ("jumlah 7",  lambda h: sum(h) == 7, "dadu1 = 6", lambda h: h[0] == 6),
    ("jumlah 8",  lambda h: sum(h) == 8, "dadu1 = 6", lambda h: h[0] == 6),
]
for na, fa, nb, fb in PASANG:
    print("  " + (na + " & " + nb).ljust(26)
          + ("BEBAS" if bebas(fa, fb) else "tidak bebas"))
print("")
print("  Baris kedua mengejutkan: 'jumlah 7' ternyata BEBAS")
print("  dari nilai dadu pertama, karena berapa pun dadu")
print("  pertamanya, selalu ada tepat satu nilai dadu kedua")
print("  yang membuat jumlahnya 7. Baris ketiga tidak begitu.")
print("  Karena itu kebebasan harus DIUJI, bukan ditebak.")

# --------------------------------------------
# 5. Bayes: kesalahan yang paling mahal
# --------------------------------------------
print("")
print("--- uji penyakit yang akurat 99% ---")
prevalensi = F(1, 1000)
sensitif = F(99, 100)      # sakit -> hasil positif
spesifik = F(99, 100)      # sehat -> hasil negatif

p_pos = sensitif * prevalensi + (1 - spesifik) * (1 - prevalensi)
p_sakit_jika_pos = sensitif * prevalensi / p_pos

print("  yang sakit di populasi   : " + str(prevalensi)
      + " (" + ("%.1f%%" % (float(prevalensi) * 100)) + ")")
print("  uji benar 99% di kedua arah")
print("")
print("  Bayangkan 100.000 orang:")
sakit = 100_000 * float(prevalensi)
pos_sakit = sakit * float(sensitif)
sehat = 100_000 - sakit
pos_sehat = sehat * float(1 - spesifik)
print("  " + "kelompok".ljust(22) + "jumlah".rjust(9) + "positif".rjust(10))
print("  " + "benar-benar sakit".ljust(22) + ("%.0f" % sakit).rjust(9)
      + ("%.0f" % pos_sakit).rjust(10))
print("  " + "sehat".ljust(22) + ("%.0f" % sehat).rjust(9)
      + ("%.0f" % pos_sehat).rjust(10))
print("  " + "total positif".ljust(22) + "".rjust(9)
      + ("%.0f" % (pos_sakit + pos_sehat)).rjust(10))
print("")
print("  P(sakit | hasil positif) = " + ("%.1f%%"
      % (float(p_sakit_jika_pos) * 100)))
print("")
print("  Dari setiap 100 orang yang hasilnya positif, hanya")
print("  sekitar " + ("%.0f" % (float(p_sakit_jika_pos) * 100))
      + " yang benar-benar sakit. Sebabnya: yang")
print("  sehat jauh lebih banyak, jadi 1% kesalahan dari")
print("  kelompok besar mengalahkan 99% kebenaran dari")
print("  kelompok kecil.")

# --------------------------------------------
# 6. Ini bukan soal kedokteran saja
# --------------------------------------------
print("")
print("--- pola yang sama di penyaring spam & deteksi bug ---")
KASUS = [
    ("Penyaring spam", F(1, 100), "email mencurigakan yang benar spam"),
    ("Deteksi penipuan", F(1, 2000), "transaksi ditandai yang benar menipu"),
    ("Alarm keamanan", F(1, 10000), "peringatan yang benar serangan"),
]
print("  " + "kasus".ljust(20) + "kejadian".rjust(10)
      + "presisi".rjust(10) + "  (uji 99%)")
for nama, pri, arti in KASUS:
    pp = sensitif * pri / (sensitif * pri + (1 - spesifik) * (1 - pri))
    print("  " + nama.ljust(20) + str(pri).rjust(10)
          + ("%.1f%%" % (float(pp) * 100)).rjust(10))
print("")
print("  Makin JARANG kejadiannya, makin banyak alarm palsu")
print("  meski ujinya sama akuratnya. Inilah kenapa tim")
print("  keamanan tenggelam dalam peringatan palsu, dan kenapa")
print("  'akurasi 99%' hampir tidak berarti apa-apa sendirian.")` },
  output: `--- dua dadu: 36 hasil yang sama mungkin ---
  ukuran ruang sampel : 36
  kejadian              peluang   desimal
  jumlah = 7                1/6    0.1667
  jumlah = 2               1/36    0.0278
  jumlah genap              1/2    0.5000
  kedua dadu sama           1/6    0.1667
  minimal satu 6          11/36    0.3056

  Naluri sering keliru di sini. 'Jumlah 7' ENAM kali
  lebih mungkin daripada 'jumlah 2', padahal keduanya
  sama-sama satu angka. Sebabnya: ada 6 cara membentuk
  7 dan cuma 1 cara membentuk 2.

--- 'minimal satu 6' bukan 1/6 + 1/6 ---
  salah  : 1/6 + 1/6 = 1/3  (menghitung ganda dadu ganda-6)
  benar  : 1 - (5/6)^2 = 11/36
  hitung : 11/36

  Menjumlahkan hanya sah kalau kejadiannya SALING
  LEPAS -- tidak bisa terjadi bersamaan.
  Cara paling aman untuk 'minimal satu': hitung
  peluang TIDAK ADA satu pun, lalu kurangkan dari 1.

--- peluang bersyarat: syaratnya menyusutkan ruang ---
  P(jumlah 7) = 1/6
     diberi dadu pertama 3 -> 1/6
  P(jumlah 7) = 1/6
     diberi kedua dadu genap -> 0
  P(dadu 1 = 6) = 1/6
     diberi jumlah 7 -> 1/6

  Baris kedua nol: dua dadu genap tidak akan pernah
  berjumlah ganjil. Syarat bisa membuat kejadian yang
  tadinya mungkin menjadi MUSTAHIL.

--- saling bebas atau tidak? ---
  dadu1 = 6 & dadu2 = 6     BEBAS
  jumlah 7 & dadu1 = 6      BEBAS
  jumlah 8 & dadu1 = 6      tidak bebas

  Baris kedua mengejutkan: 'jumlah 7' ternyata BEBAS
  dari nilai dadu pertama, karena berapa pun dadu
  pertamanya, selalu ada tepat satu nilai dadu kedua
  yang membuat jumlahnya 7. Baris ketiga tidak begitu.
  Karena itu kebebasan harus DIUJI, bukan ditebak.

--- uji penyakit yang akurat 99% ---
  yang sakit di populasi   : 1/1000 (0.1%)
  uji benar 99% di kedua arah

  Bayangkan 100.000 orang:
  kelompok                 jumlah   positif
  benar-benar sakit           100        99
  sehat                     99900       999
  total positif                        1098

  P(sakit | hasil positif) = 9.0%

  Dari setiap 100 orang yang hasilnya positif, hanya
  sekitar 9 yang benar-benar sakit. Sebabnya: yang
  sehat jauh lebih banyak, jadi 1% kesalahan dari
  kelompok besar mengalahkan 99% kebenaran dari
  kelompok kecil.

--- pola yang sama di penyaring spam & deteksi bug ---
  kasus                 kejadian   presisi  (uji 99%)
  Penyaring spam           1/100     50.0%
  Deteksi penipuan        1/2000      4.7%
  Alarm keamanan         1/10000      1.0%

  Makin JARANG kejadiannya, makin banyak alarm palsu
  meski ujinya sama akuratnya. Inilah kenapa tim
  keamanan tenggelam dalam peringatan palsu, dan kenapa
  'akurasi 99%' hampir tidak berarti apa-apa sendirian.`,

  kesalahanUmum: [
    {
      salah: 'Mengira P(sakit bila positif) sama dengan P(positif bila sakit).',
      kenapa: 'Keduanya arah yang berlawanan dan nilainya bisa sangat jauh berbeda. Uji yang menangkap 99 persen orang sakit bisa menghasilkan positif yang benar hanya 9 persen bila penyakitnya jarang, karena hasil positif juga datang dari kelompok sehat yang jauh lebih besar.',
      benar: 'Balik arahnya dengan teorema Bayes, dan bayangkan seratus ribu orang nyata alih-alih menghitung dengan pecahan.'
    },
    {
      salah: 'Melaporkan akurasi model tanpa menyebut seberapa jarang kejadian yang dideteksi.',
      kenapa: 'Pada kejadian jarang, model yang selalu menjawab tidak bisa mencapai akurasi 99,9 persen tanpa mendeteksi apa pun. Angka akurasi menyembunyikan seluruh persoalan justru pada kasus yang paling membutuhkan deteksi.',
      benar: 'Laporkan presisi dan recall beserta seberapa sering kejadiannya, bukan akurasi sendirian.'
    },
    {
      salah: 'Menjumlahkan peluang untuk pertanyaan berbentuk minimal satu.',
      kenapa: 'Menjumlahkan hanya sah bila kejadiannya saling lepas, sedangkan pada minimal satu, hasil yang memenuhi keduanya terhitung dua kali. Untuk enam kali lemparan, cara ini bahkan memberi peluang lebih dari satu.',
      benar: 'Hitung peluang tidak ada satu pun yang terjadi, lalu kurangkan dari satu.'
    },
    {
      salah: 'Mengandaikan dua kejadian saling bebas tanpa mengujinya.',
      kenapa: 'Kebebasan punya definisi tepat yang bisa diperiksa, dan naluri sering keliru. Mengandaikan kebebasan yang tidak berlaku membuat peluang gabungan ditaksir jauh lebih kecil daripada seharusnya, dan itu penyebab kegagalan besar dalam penilaian risiko.',
      benar: 'Uji apakah P(A dan B) benar-benar sama dengan P(A) dikali P(B), dan bila tidak pakai peluang bersyarat.'
    },
    {
      salah: 'Menghitung peluang tanpa menuliskan ruang sampelnya lebih dulu.',
      kenapa: 'Dua dadu punya 36 hasil, bukan 11, karena pasangan yang urutannya berbeda adalah hasil yang berbeda. Melewatkan langkah ini membuat penyebutnya salah, dan seluruh perhitungan setelahnya ikut salah tanpa terlihat.',
      benar: 'Tuliskan atau hitung ukuran ruang sampelnya lebih dulu, dan pastikan seluruh hasilnya sama mungkin.'
    },
    {
      salah: 'Menaikkan sensitivitas terus-menerus untuk mengurangi alarm palsu.',
      kenapa: 'Alarm palsu berasal dari kelompok yang tidak mengalami kejadian, sehingga yang menentukan justru spesifisitas. Untuk kejadian jarang, menaikkan ketepatan pada kelompok besar sepuluh kali lipat memangkas alarm palsu sepuluh kali, sementara menaikkan sensitivitas hampir tidak berpengaruh.',
      benar: 'Perbaiki spesifisitas untuk menekan alarm palsu, dan susun deteksi bertingkat agar kelompok yang diuji ulang lebih pekat.'
    }
  ],

  analogi: `Bayangkan **alat pendeteksi logam di pintu masuk stadion**.

Alatnya bagus: kalau seseorang benar-benar membawa senjata, ia berbunyi **99 kali dari 100**. Kalau tidak membawa apa-apa, ia diam **99 kali dari 100**.

Terdengar sangat andal.

Sekarang lima puluh ribu orang masuk, dan **lima** di antaranya benar-benar membawa senjata.

Dari lima orang itu, alatnya menangkap **lima** — praktis semuanya.

Dari 49.995 orang yang tidak membawa apa-apa, alatnya salah berbunyi 1 persen: **sekitar 500 orang**.

Total yang dihentikan petugas: **505 orang**. Dari 505 itu, yang benar-benar berbahaya **lima**.

Satu persen.

Petugas yang menggeledah 505 orang dan menemukan lima akan segera **berhenti menganggap serius bunyi alarmnya** — dan pada saat itulah alatnya berhenti berguna, meski ketepatannya tidak berubah sedikit pun.

Apa yang menolong?

Bukan membuat alatnya lebih peka terhadap senjata — ia sudah menangkap semuanya. Yang menolong adalah membuatnya **lebih jarang salah pada orang biasa**. Menurunkan kesalahan dari 1 persen menjadi 0,1 persen memangkas antrean dari 505 menjadi 55.

Atau **dua tingkat**: alarm pertama tidak langsung digeledah, melainkan diperiksa dengan alat kedua yang lebih teliti. Kelompok yang masuk ke pemeriksaan kedua sudah jauh lebih pekat.

Itulah Bayes, dan itulah kenapa "akurat 99 persen" harus selalu ditanya balik: **akurat terhadap apa, dan seberapa jarang kejadiannya?**`,

  latihan: [
    'Tulis ruang sampel untuk dua dadu, lalu hitung peluang enam kejadian berbeda dengan mencacah.',
    'Jelaskan kenapa peluang jumlah tujuh enam kali lebih besar daripada jumlah dua.',
    'Hitung peluang minimal satu angka enam pada tiga lemparan, dengan cara lawannya, lalu buktikan dengan mencacah.',
    'Hitung peluang bersyarat untuk tiga pasang kejadian, dan berikan satu contoh yang hasilnya nol.',
    'Uji kebebasan tiga pasang kejadian pada dua dadu, dan jelaskan hasil yang mengejutkan.',
    'Terapkan teorema Bayes pada uji penyakit dengan kejadian satu per seribu, lalu hitung ulang untuk satu per sepuluh.',
    'Jelaskan dengan bayangan seratus ribu orang kenapa hasil positif dari uji akurat 99 persen sering keliru.',
    'Hitung presisi penyaring spam untuk tiga tingkat kejadian spam yang berbeda, dengan uji yang sama akuratnya.',
    'Jelaskan kenapa spesifisitas lebih menentukan daripada sensitivitas ketika kejadiannya jarang.',
    'Rancang deteksi dua tingkat untuk satu masalah nyata, dan jelaskan kenapa presisinya membaik.'
  ]
});


TOPICS.push({
  id: 'probstat-distribusi',
  judul: 'Distribusi & Penarikan Kesimpulan',
  kategori: 'probstat',
  tag: ['binomial', 'Poisson', 'normal', 'teorema limit pusat', 'selang keyakinan', 'ukuran sampel'],
  ringkas: 'Rata-rata 3 permintaan per detik, dan seribu kali sehari datang delapan atau lebih.',

  fungsi: `**Meramalkan perilaku sesuatu yang acak, tanpa mengamatinya jutaan kali.**

Terpakai di:

- **Merancang kapasitas** peladen, antrean, dan penyimpanan
- **Menentukan ukuran sampel** sebelum survei atau uji A/B
- **Uji Kualitas Perangkat Lunak** — persentil dan peluang lonjakan
- **Bab metodologi** tugas akhir

Yang paling menyelamatkan dari sistem yang tersendat: **rata-rata 3 per detik bukan berarti selalu 3.**

Merancang kapasitas untuk laju rata-rata berarti sistemmu akan kewalahan ribuan kali sehari pada lonjakan yang sepenuhnya wajar.

Dan kaidah yang menentukan anggaran penelitian: **galat menyusut seperti akar n.** Memotong galat setengah menuntut sampel **empat kali** lipat — tetapi sebaliknya, sampel kecil sudah memberi sebagian besar keterangan yang akan kamu dapat.`,

  praktik: {
    tujuan: `Kamu bisa menghitung peluang lonjakan, menentukan ukuran sampel sebelum mengumpulkan data, dan menafsirkan selang keyakinan dengan tepat.`,
    alat: [
      'Python 3 dengan `math` dan `random`',
      'Data laju nyata bila ada'
    ],
    langkah: [
      { judul: 'Periksa syarat sebelum memilih distribusi',
        isi: `**Binomial** butuh: jumlah percobaan tetap, dua hasil, peluang sama, saling bebas.

**Poisson** untuk kejadian jarang dengan laju tetap — dan cirinya rata-rata **sama dengan** ragamnya.

Memeriksa ciri itu pada datamu sendiri adalah cara menguji apakah Poisson memang cocok.` },
      { judul: 'Hitung peluang lonjakan untuk sistemmu',
        isi: `Ambil laju permintaan rata-rata sistemmu, lalu hitung dengan Poisson: berapa peluang datang dua atau tiga kali lipat dalam satu selang?

Kalikan dengan jumlah selang dalam sehari. Angka itu adalah **berapa kali sehari** sistemmu akan kewalahan kalau dirancang untuk rata-rata.` },
      { judul: 'Hubungkan ke hitungan persentil di UKPL',
        isi: `Kalau tiap permintaan punya peluang \`p\` gagal dan satu halaman memuat \`n\` permintaan, maka:

- \`P(halaman terganggu) = 1 - (1-p)^n\`

Ini binomial, dan ini hitungan yang sama dengan yang kamu pakai di pengujian kinerja.` },
      { judul: 'Buktikan teorema limit pusat sendiri',
        isi: `Buat populasi yang **sangat melenceng** — eksponensial, misalnya. Ambil ribuan sampel berukuran 1, 4, 16, 64, dan 256, lalu hitung simpangan baku rata-ratanya.

Bandingkan dengan \`sigma/akar(n)\`. Angkanya akan cocok, meski populasinya sama sekali tidak normal.` },
      { judul: 'Gambar histogramnya',
        isi: `Untuk tiap ukuran sampel, gambar histogram rata-ratanya.

Bentuknya berubah dari melenceng berat menjadi lonceng, tepat di depan matamu. Ini lebih meyakinkan daripada tabel angka mana pun.` },
      { judul: 'Hitung ukuran sampel SEBELUM mengumpulkan data',
        isi: `- \`n = (1,96 x sigma / batas galat)^2\`

Menghitungnya lebih dulu jauh lebih murah daripada menemukan setelah survei selesai bahwa datamu tidak cukup untuk menyimpulkan apa pun.` },
      { judul: 'Rasakan hukum akar itu',
        isi: `Hitung n untuk batas galat yang dipotong setengah berulang kali.

Angkanya berlipat **empat** tiap kali. Lalu balik: hitung berapa banyak yang kamu dapat dari 30 responden pertama dibanding 1000 responden berikutnya.` },
      { judul: 'Buat selang keyakinan lalu ucapkan artinya dengan benar',
        isi: `Hitung \`rata-rata ± 1,96 x galat baku\`.

Lalu tulis artinya **tanpa** memakai kata "peluang" untuk nilai sejatinya: *"kalau prosedur ini diulang, 95 persen selangnya akan memuat nilai sejati"*.

Ini perbedaan yang sering ditanyakan penguji sidang.` },
      { judul: 'Uji apa yang tidak bisa diperbaiki ukuran sampel',
        isi: `Ambil sampel yang sengaja berat sebelah — misalnya hanya dari satu kelompok — lalu perbesar terus.

Selang keyakinannya menyempit, dan tetap mengelilingi **angka yang salah**. Menambah data membuat kesimpulan keliru terlihat makin meyakinkan.` }
    ],
    cek: [
      'Kamu tahu berapa kali sehari sistemmu akan kewalahan bila dirancang untuk rata-rata',
      'Kamu menghitung ukuran sampel sebelum mengumpulkan data, bukan sesudah',
      'Kamu bisa menyatakan arti selang keyakinan tanpa keliru menyebut peluang nilai sejatinya'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa butuh empat kali data untuk dua kali teliti',

  konsep: `
Distribusi adalah **bentuk** dari sebuah data acak: nilai mana yang sering muncul, mana yang jarang. Mengenali beberapa bentuk baku membuatmu bisa **menghitung** tanpa perlu mengamati jutaan kali.

**Binomial — berapa kali berhasil dari n percobaan**

Syaratnya: jumlah percobaan **tetap**, tiap percobaan hanya punya dua hasil, peluangnya **sama** tiap kali, dan tiap percobaan **saling bebas**.

\`P(k berhasil) = C(n,k) x p^k x (1-p)^(n-k)\`

Rata-ratanya \`n p\`, ragamnya \`n p (1-p)\`.

Terpakai untuk: berapa permintaan gagal dari 100, berapa pengguna mengklik dari 1000, berapa bit rusak dari sebuah paket.

**Poisson — berapa kejadian dalam satu selang**

Untuk kejadian yang **jarang** tetapi punya laju rata-rata tetap:

\`P(k) = e^(-lambda) x lambda^k / k!\`

Rata-rata dan ragamnya **sama-sama** \`lambda\` — ciri khas yang bisa dipakai untuk memeriksa apakah datamu memang Poisson.

Terpakai untuk: permintaan per detik, kesalahan per seribu baris kode, kedatangan pelanggan per jam.

Yang sering dilupakan: **rata-rata 3 per detik bukan berarti selalu 3.** Ada peluang nyata datang 8 atau lebih dalam satu detik, dan peladen yang dirancang hanya untuk rata-rata akan tersendat berkali-kali tiap hari.

**Normal — bentuk lonceng**

Muncul di mana-mana karena satu alasan yang akan dijelaskan di bawah. Ditentukan oleh dua angka saja: **rata-rata** dan **simpangan baku**.

| Dalam | Bagian data | Di luar |
|---|---|---|
| ±1 sigma | 68,3% | sekitar 1 dari 3 |
| ±2 sigma | 95,4% | sekitar 1 dari 22 |
| ±3 sigma | 99,7% | sekitar 1 dari 370 |
| ±4 sigma | 99,99% | sekitar 1 dari 15.787 |

Dari sinilah asal ambang **3 sigma** untuk menandai pencilan, dan asal istilah **six sigma** di pengendalian mutu.

**Teorema limit pusat**

Ini gagasan terpenting di seluruh statistika.

**Rata-rata dari banyak sampel akan mendekati sebaran normal — apa pun bentuk populasi asalnya.**

Populasinya boleh melenceng berat, boleh punya dua puncak, boleh apa saja. Begitu kamu mengambil sampel berukuran cukup dan menghitung rata-ratanya berkali-kali, **rata-rata itu** membentuk lonceng.

Dan simpangan bakunya menyusut mengikuti pola yang tepat:

\`galat baku = simpangan baku populasi / akar(n)\`

**Akibat praktisnya: akar, bukan lurus**

Karena pembaginya **akar** \`n\`, memotong galat setengah menuntut sampel **empat kali** lipat.

Inilah sebab survei yang sangat teliti jadi mahal, dan sebab menambah sedikit responden hampir tidak mengubah apa pun.

Dan sebaliknya — ini yang lebih berguna: **sampel kecil sudah memberi banyak.** Dari nol ke 100 responden, ketelitiannya melompat jauh. Dari 1.000 ke 1.100, hampir tidak terasa.

**Selang keyakinan**

\`rata-rata sampel ± 1,96 x galat baku\` memberi selang keyakinan 95 persen.

Artinya sering disalahpahami. Ia **bukan** *"peluang 95 persen nilai sejatinya ada di sini"*.

Artinya: **kalau prosedur ini diulang berkali-kali, 95 persen selang yang dihasilkan akan memuat nilai sejatinya.** Sekitar 1 dari 20 akan meleset — dan itu bukan kegagalan, itu memang bagian dari rancangannya.

**Menentukan ukuran sampel**

Dari rumus galat baku, ukuran sampel yang dibutuhkan bisa dihitung **sebelum** mengumpulkan data:

\`n = (1,96 x sigma / batas galat)^2\`

Menghitungnya lebih dulu jauh lebih murah daripada menemukan setelah survei selesai bahwa datanya tidak cukup untuk menyimpulkan apa pun.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# GALAT MENYUSUT SEPERTI 1/AKAR(n), BUKAN 1/n\n#\n# ukuran sampel   sd rata-rata   ramalan sd/akar(n)\n#             1          9.619               10.013\n#             4          5.000                5.006\n#            16          2.523                2.503\n#            64          1.234                1.252\n#           256          0.629                0.626\n#\n# Tiap kali n dikali EMPAT, galatnya jadi SETENGAH.\n#\n# batas galat   n yang dibutuhkan\n#       5.000                  16\n#       2.500                  62\n#       1.250                 247\n#       0.625                 986\n#\n# Populasinya eksponensial -- sangat jauh dari normal --\n# dan rata-ratanya tetap menjadi normal.',
      penjelasan: `
Pola \`1/akar(n)\` menentukan hampir semua keputusan praktis dalam pengumpulan data, dan ia sering hanya dihafal sebagai rumus. Melihat **kenapa** membuatnya bisa dipakai.

Mulai dari pertanyaan yang lebih sederhana: **kenapa rata-rata sampel lebih stabil daripada satu nilai tunggal?**

Ambil satu orang secara acak dan ukur tingginya. Angkanya bisa jauh dari rata-rata populasi.

Ambil sepuluh orang dan rata-ratakan. Sekarang untuk hasilnya menyimpang jauh, kamu butuh **sebagian besar dari sepuluh orang itu** menyimpang ke arah yang sama. Sebagian yang tinggi akan **diimbangi** oleh sebagian yang pendek.

Pengimbangan itulah yang membuat rata-rata stabil, dan makin banyak sampelnya makin kuat pengimbangannya.

Sekarang kenapa **akar**, bukan sebanding lurus?

Sebabnya terletak pada bagaimana simpangan bergabung. Simpangan acak **tidak menjumlah secara lurus** — sebagian saling meniadakan. Yang menjumlah secara lurus adalah **ragamnya**, dan simpangan baku adalah **akar** dari ragam.

Ragam rata-rata dari \`n\` sampel bebas adalah \`sigma^2/n\`. Ambil akarnya, dan kamu dapat \`sigma/akar(n)\`.

Jadi akar itu bukan pilihan yang dibuat-buat. Ia **akibat langsung** dari kenyataan bahwa galat sebagian saling menghapus.

Sekarang akibat praktisnya, dan ini yang menentukan anggaran penelitian.

Untuk memotong galat **setengah**, kamu butuh \`akar(n)\` menjadi dua kali lipat — artinya \`n\` menjadi **empat kali**.

Lihat tabelnya: batas galat 5 butuh 16 sampel; batas galat 0,625 — delapan kali lebih teliti — butuh 986. Bukan 128, melainkan hampir seribu.

Dari sini ada dua kesimpulan yang berlawanan arah, dan **keduanya berguna**.

**Kesimpulan pertama: ketelitian tinggi itu mahal.** Survei nasional yang ingin galat sangat kecil butuh puluhan ribu responden, dan menambah sedikit tidak akan menolong.

**Kesimpulan kedua, yang lebih sering terpakai: sampel kecil sudah memberi banyak.** Melompat dari nol ke 100 responden mengubah keadaan dari "tidak tahu apa-apa" menjadi "tahu cukup baik". Melompat dari 1.000 ke 1.100 hampir tidak mengubah apa pun.

Karena itu, kalau kamu sedang menguji gagasan usaha atau menguji perubahan antarmuka, **jangan menunggu sampai datanya banyak**. Tiga puluh sampai seratus pengamatan sudah memberi sebagian besar keterangan yang akan kamu dapat.

Terakhir, bagian yang paling mengejutkan dari tabel di atas: **populasinya eksponensial**.

Sebaran eksponensial sangat melenceng — tidak ada kemiripan sedikit pun dengan lonceng. Ia punya banyak nilai kecil dan ekor panjang ke kanan.

Dan rata-rata sampelnya **tetap** menjadi normal, dengan galat baku yang tepat seperti diramalkan.

Itulah teorema limit pusat, dan itulah kenapa statistika bisa bekerja pada data dunia nyata yang bentuknya tidak pernah rapi. Kamu **tidak perlu tahu bentuk populasinya** untuk menarik kesimpulan tentang rata-ratanya.

Satu syarat yang tetap berlaku: sampelnya harus **acak dan saling bebas**. Kalau responden memilih dirinya sendiri, atau semuanya berasal dari satu kelompok, tidak ada ukuran sampel yang bisa memperbaikinya — galatnya bukan acak, melainkan **berat sebelah**, dan menambah data justru membuat kesimpulan yang salah terlihat makin meyakinkan.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Distribusi peluang & penarikan kesimpulan
# ============================================
import math, random

def kombinasi(n, k):
    return math.comb(n, k)

# --------------------------------------------
# 1. Binomial: berapa kali berhasil dari n coba
# --------------------------------------------
def binom(n, k, p):
    return kombinasi(n, k) * p ** k * (1 - p) ** (n - k)

print("--- binomial: 10 kali lempar koin adil ---")
n, p = 10, 0.5
print("  " + "k berhasil".rjust(11) + "peluang".rjust(10) + "  grafik")
for k in range(n + 1):
    q = binom(n, k, p)
    print("  " + str(k).rjust(11) + ("%.4f" % q).rjust(10)
          + "  " + "#" * int(q * 200))
print("  jumlah semua peluang = "
      + ("%.4f" % sum(binom(n, k, p) for k in range(n + 1))))
print("")
print("  rata-rata = n*p = " + str(n * p))
print("  ragam     = n*p*(1-p) = " + str(n * p * (1 - p)))

# --------------------------------------------
# 2. Terpakai di mana: uji perangkat lunak
# --------------------------------------------
print("")
print("--- kalau 1 dari 20 permintaan gagal ---")
p_gagal = 0.05
print("  " + "n permintaan".rjust(13)
      + "P(tidak ada yang gagal)".rjust(26)
      + "P(minimal 1 gagal)".rjust(21))
for n in (1, 5, 10, 20, 50):
    tak_gagal = (1 - p_gagal) ** n
    print("  " + str(n).rjust(13)
          + ("%.4f" % tak_gagal).rjust(26)
          + ("%.4f" % (1 - tak_gagal)).rjust(21))
print("")
print("  Satu halaman yang memuat 20 permintaan punya peluang")
print("  " + ("%.0f%%" % ((1 - (1 - p_gagal) ** 20) * 100))
      + " menemui setidaknya satu kegagalan. 'Cuma 5%'")
print("  di tingkat permintaan menjadi mayoritas di tingkat")
print("  kunjungan -- ini hitungan yang sama seperti di UKPL.")

# --------------------------------------------
# 3. Poisson: kejadian jarang dalam satu selang
# --------------------------------------------
def poisson(k, lam):
    return math.exp(-lam) * lam ** k / math.factorial(k)

print("")
print("--- Poisson: rata-rata 3 permintaan per detik ---")
lam = 3
print("  " + "k".rjust(4) + "peluang".rjust(10) + "  grafik")
for k in range(0, 10):
    q = poisson(k, lam)
    print("  " + str(k).rjust(4) + ("%.4f" % q).rjust(10)
          + "  " + "#" * int(q * 200))
print("")
lonjak = 1 - sum(poisson(k, lam) for k in range(0, 8))
print("  P(8 atau lebih dalam satu detik) = "
      + ("%.4f" % lonjak) + "  (" + ("%.2f%%" % (lonjak * 100)) + ")")
print("")
print("  Rata-rata 3 per detik BUKAN berarti selalu 3.")
print("  Sekitar " + ("%.0f" % (lonjak * 86400 * 1))
      + " kali sehari akan datang 8 atau lebih")
print("  dalam satu detik. Peladen yang dirancang untuk")
print("  'rata-rata' akan tersendat berkali-kali tiap hari.")

# --------------------------------------------
# 4. Normal dan aturan 68-95-99,7
# --------------------------------------------
def fkk_normal(z):
    """Peluang kumulatif normal baku."""
    return 0.5 * (1 + math.erf(z / math.sqrt(2)))

print("")
print("--- sebaran normal: berapa data dalam k simpangan ---")
print("  " + "k".rjust(4) + "dalam +/- k sigma".rjust(20)
      + "di luar".rjust(16))
for k in (1, 2, 3, 4):
    dalam = fkk_normal(k) - fkk_normal(-k)
    luar = 1 - dalam
    if luar > 0.001:
        ket = "%.2f%%" % (luar * 100)
    else:
        ket = "1 dari " + ("%.0f" % (1 / luar))
    print("  " + str(k).rjust(4) + ("%.4f" % dalam).rjust(20)
          + ket.rjust(16))
print("")
print("  Inilah asal 'six sigma' di pengendalian mutu, dan")
print("  asal ambang 3 sigma untuk menandai pencilan.")

# --------------------------------------------
# 5. Teorema limit pusat
# --------------------------------------------
print("")
print("--- rata-rata sampel menjadi normal, apa pun asalnya ---")
r = random.Random(17)
# populasi yang JAUH dari normal: melenceng berat
POP = [r.expovariate(1 / 10) for _ in range(200_000)]

def rata(d):
    return sum(d) / len(d)

def sbaku(d):
    m = rata(d)
    return math.sqrt(sum((x - m) ** 2 for x in d) / (len(d) - 1))

print("  populasi: sebaran eksponensial (sangat melenceng)")
print("    rata-rata " + ("%.2f" % rata(POP))
      + "   simpangan baku " + ("%.2f" % sbaku(POP)))
print("")
print("  " + "ukuran sampel".rjust(14) + "sd rata-rata".rjust(15)
      + "ramalan sd/akar(n)".rjust(21))
for n in (1, 4, 16, 64, 256):
    kumpul = [rata([r.choice(POP) for _ in range(n)])
              for _ in range(4000)]
    ramal = sbaku(POP) / math.sqrt(n)
    print("  " + str(n).rjust(14) + ("%.3f" % sbaku(kumpul)).rjust(15)
          + ("%.3f" % ramal).rjust(21))
print("")
print("  Simpangan baku rata-rata sampel menyusut seperti")
print("  1/akar(n), dan bentuknya mendekati normal MESKI")
print("  populasinya sama sekali tidak normal. Inilah yang")
print("  membuat penarikan kesimpulan mungkin dilakukan.")

# --------------------------------------------
# 6. Akibat praktisnya: butuh 4x data untuk 2x teliti
# --------------------------------------------
print("")
print("--- berapa sampel untuk ketelitian tertentu ---")
sd = sbaku(POP)
print("  simpangan baku populasi = " + ("%.2f" % sd))
print("  " + "batas galat".rjust(12) + "n yang dibutuhkan".rjust(20)
      + "  (selang keyakinan 95%)")
for e in (5.0, 2.5, 1.25, 0.625):
    n = math.ceil((1.96 * sd / e) ** 2)
    print("  " + ("%.3f" % e).rjust(12) + str(n).rjust(20))
print("")
print("  Memotong galat setengah menuntut sampel EMPAT kali")
print("  lipat. Ini yang membuat survei sangat teliti jadi")
print("  mahal, dan kenapa menambah sedikit responden hampir")
print("  tidak mengubah apa pun.")

# --------------------------------------------
# 7. Selang keyakinan pada data nyata
# --------------------------------------------
print("")
print("--- selang keyakinan 95% dari satu sampel ---")
sampel = [r.choice(POP) for _ in range(100)]
m = rata(sampel)
se = sbaku(sampel) / math.sqrt(len(sampel))
lo, hi = m - 1.96 * se, m + 1.96 * se
print("  rata-rata sampel : " + ("%.3f" % m))
print("  galat baku       : " + ("%.3f" % se))
print("  selang 95%       : [" + ("%.3f" % lo) + ", "
      + ("%.3f" % hi) + "]")
print("  rata-rata sejati : " + ("%.3f" % rata(POP))
      + "   " + ("di dalam selang" if lo <= rata(POP) <= hi
                 else "DI LUAR selang"))
print("")
print("  Artinya BUKAN 'peluang 95% nilai sejatinya di sini'.")
print("  Artinya: kalau prosedur ini diulang berkali-kali,")
print("  95% selang yang dihasilkan akan memuat nilai sejati.")
print("  Sekitar 1 dari 20 akan meleset -- dan itu wajar.")` },
  output: `--- binomial: 10 kali lempar koin adil ---
   k berhasil   peluang  grafik
            0    0.0010  
            1    0.0098  #
            2    0.0439  ########
            3    0.1172  #######################
            4    0.2051  #########################################
            5    0.2461  #################################################
            6    0.2051  #########################################
            7    0.1172  #######################
            8    0.0439  ########
            9    0.0098  #
           10    0.0010  
  jumlah semua peluang = 1.0000

  rata-rata = n*p = 5.0
  ragam     = n*p*(1-p) = 2.5

--- kalau 1 dari 20 permintaan gagal ---
   n permintaan   P(tidak ada yang gagal)   P(minimal 1 gagal)
              1                    0.9500               0.0500
              5                    0.7738               0.2262
             10                    0.5987               0.4013
             20                    0.3585               0.6415
             50                    0.0769               0.9231

  Satu halaman yang memuat 20 permintaan punya peluang
  64% menemui setidaknya satu kegagalan. 'Cuma 5%'
  di tingkat permintaan menjadi mayoritas di tingkat
  kunjungan -- ini hitungan yang sama seperti di UKPL.

--- Poisson: rata-rata 3 permintaan per detik ---
     k   peluang  grafik
     0    0.0498  #########
     1    0.1494  #############################
     2    0.2240  ############################################
     3    0.2240  ############################################
     4    0.1680  #################################
     5    0.1008  ####################
     6    0.0504  ##########
     7    0.0216  ####
     8    0.0081  #
     9    0.0027  

  P(8 atau lebih dalam satu detik) = 0.0119  (1.19%)

  Rata-rata 3 per detik BUKAN berarti selalu 3.
  Sekitar 1029 kali sehari akan datang 8 atau lebih
  dalam satu detik. Peladen yang dirancang untuk
  'rata-rata' akan tersendat berkali-kali tiap hari.

--- sebaran normal: berapa data dalam k simpangan ---
     k   dalam +/- k sigma         di luar
     1              0.6827          31.73%
     2              0.9545           4.55%
     3              0.9973           0.27%
     4              0.9999    1 dari 15787

  Inilah asal 'six sigma' di pengendalian mutu, dan
  asal ambang 3 sigma untuk menandai pencilan.

--- rata-rata sampel menjadi normal, apa pun asalnya ---
  populasi: sebaran eksponensial (sangat melenceng)
    rata-rata 10.00   simpangan baku 10.01

   ukuran sampel   sd rata-rata   ramalan sd/akar(n)
               1          9.619               10.013
               4          5.000                5.006
              16          2.523                2.503
              64          1.234                1.252
             256          0.629                0.626

  Simpangan baku rata-rata sampel menyusut seperti
  1/akar(n), dan bentuknya mendekati normal MESKI
  populasinya sama sekali tidak normal. Inilah yang
  membuat penarikan kesimpulan mungkin dilakukan.

--- berapa sampel untuk ketelitian tertentu ---
  simpangan baku populasi = 10.01
   batas galat   n yang dibutuhkan  (selang keyakinan 95%)
         5.000                  16
         2.500                  62
         1.250                 247
         0.625                 986

  Memotong galat setengah menuntut sampel EMPAT kali
  lipat. Ini yang membuat survei sangat teliti jadi
  mahal, dan kenapa menambah sedikit responden hampir
  tidak mengubah apa pun.

--- selang keyakinan 95% dari satu sampel ---
  rata-rata sampel : 9.039
  galat baku       : 0.925
  selang 95%       : [7.225, 10.853]
  rata-rata sejati : 10.004   di dalam selang

  Artinya BUKAN 'peluang 95% nilai sejatinya di sini'.
  Artinya: kalau prosedur ini diulang berkali-kali,
  95% selang yang dihasilkan akan memuat nilai sejati.
  Sekitar 1 dari 20 akan meleset -- dan itu wajar.`,

  kesalahanUmum: [
    {
      salah: 'Merancang kapasitas peladen berdasarkan laju rata-rata permintaan.',
      kenapa: 'Kedatangan yang mengikuti Poisson berarti rata-rata tiga per detik tetap punya peluang nyata datang delapan atau lebih dalam satu detik. Sistem yang pas untuk rata-rata akan tersendat ribuan kali sehari pada lonjakan yang sepenuhnya wajar.',
      benar: 'Hitung peluang lonjakan dengan Poisson, lalu rancang kapasitas untuk persentil tinggi, bukan untuk rata-rata.'
    },
    {
      salah: 'Mengira memotong galat setengah cukup dengan menggandakan sampel.',
      kenapa: 'Galat baku menyusut seperti satu per akar n, sehingga menggandakan sampel hanya memangkas galat sekitar tiga puluh persen. Untuk memotongnya setengah, sampelnya harus empat kali lipat.',
      benar: 'Hitung ukuran sampel dari rumus n sama dengan kuadrat 1,96 sigma dibagi batas galat, sebelum mulai mengumpulkan data.'
    },
    {
      salah: 'Menafsirkan selang keyakinan 95 persen sebagai peluang 95 persen nilai sejatinya ada di dalamnya.',
      kenapa: 'Nilai sejatinya adalah angka tetap, bukan sesuatu yang acak, sehingga ia berada di dalam atau di luar selang tanpa peluang apa pun. Yang berpeluang 95 persen adalah prosedurnya, bila diulang berkali-kali.',
      benar: 'Nyatakan bahwa 95 persen selang yang dihasilkan prosedur ini akan memuat nilai sejatinya, dan sekitar satu dari dua puluh akan meleset.'
    },
    {
      salah: 'Memakai binomial untuk percobaan yang saling memengaruhi.',
      kenapa: 'Binomial mensyaratkan tiap percobaan saling bebas dengan peluang yang sama. Mengambil kartu tanpa dikembalikan mengubah peluang percobaan berikutnya, sehingga hasilnya menyimpang dan penyimpangannya membesar seiring bertambahnya pengambilan.',
      benar: 'Periksa keempat syarat binomial lebih dulu, dan pakai sebaran hipergeometrik bila pengambilannya tanpa pengembalian.'
    },
    {
      salah: 'Mengandaikan data harus berbentuk normal supaya bisa disimpulkan.',
      kenapa: 'Teorema limit pusat berlaku pada rata-rata sampel, bukan pada datanya sendiri, sehingga populasi yang sangat melenceng pun tetap menghasilkan rata-rata sampel yang mendekati normal. Menunggu data berbentuk normal berarti menolak menyimpulkan apa pun dari data dunia nyata.',
      benar: 'Terapkan teorema limit pusat pada rata-rata sampel, dan periksa ukuran sampelnya cukup alih-alih memeriksa bentuk populasinya.'
    },
    {
      salah: 'Menambah ukuran sampel untuk memperbaiki data yang cara pengambilannya berat sebelah.',
      kenapa: 'Galat acak menyusut dengan bertambahnya sampel, tetapi galat berat sebelah tidak. Menambah data pada sampel yang memilih dirinya sendiri hanya membuat kesimpulan yang salah terlihat makin meyakinkan, karena selang keyakinannya menyempit di sekitar angka yang keliru.',
      benar: 'Perbaiki cara pengambilan sampelnya lebih dulu agar acak dan mewakili, baru pertimbangkan menambah jumlahnya.'
    },
    {
      salah: 'Memakai ambang tiga sigma untuk menandai pencilan pada data yang tidak normal.',
      kenapa: 'Angka 99,7 persen berlaku untuk sebaran normal. Pada data berekor panjang seperti waktu tanggap atau pendapatan, nilai di luar tiga sigma jauh lebih sering muncul sehingga ambang itu menandai terlalu banyak data sebagai pencilan.',
      benar: 'Pakai aturan berbasis kuartil seperti IQR untuk data yang bentuknya tidak diketahui atau jelas melenceng.'
    }
  ],

  analogi: `Bayangkan kamu ingin tahu **berapa rata-rata uang saku mahasiswa di kampusmu**.

Kamu bertanya ke **satu orang**. Jawabannya bisa jauh meleset — mungkin kamu kebetulan bertanya ke anak kos yang paling hemat, atau ke yang paling boros.

Kamu bertanya ke **empat orang** dan merata-ratakan. Sekarang untuk hasilnya meleset jauh, kamu butuh sebagian besar dari keempatnya menyimpang **ke arah yang sama**. Yang boros diimbangi yang hemat.

Kamu bertanya ke **enam belas orang**. Lebih stabil lagi.

Tetapi perhatikan **seberapa banyak** membaiknya.

Dari 1 ke 4 orang — empat kali lipat — ketelitiannya jadi **dua kali** lebih baik.
Dari 4 ke 16 — empat kali lagi — dua kali lebih baik lagi.
Dari 16 ke 64 — sama.

Tiap kali kamu ingin **setengah galat**, kamu harus bertanya ke **empat kali lebih banyak orang**.

Ini kabar buruk kalau kamu mengejar ketelitian tinggi: dari 250 ke 1.000 responden cuma menggandakan ketelitianmu.

Dan kabar baik kalau kamu baru mulai: **dari nol ke tiga puluh orang, kamu sudah mendapat sebagian besar keterangan yang akan pernah kamu dapat.**

Yang tidak bisa diperbaiki dengan menambah orang: kalau kamu **hanya bertanya di kantin mahal**. Menambah dari 30 ke 3.000 orang di kantin yang sama tidak membuatmu lebih dekat ke jawaban — ia cuma membuat jawaban yang salah terdengar makin pasti.`,

  latihan: [
    'Hitung sebaran binomial untuk sepuluh lemparan koin, lalu buktikan jumlah seluruh peluangnya sama dengan satu.',
    'Hitung peluang minimal satu kegagalan untuk halaman yang memuat 5, 20, dan 50 permintaan bila tiap permintaan gagal 5 persen.',
    'Hitung sebaran Poisson untuk laju tiga per detik, lalu hitung peluang datang delapan atau lebih dalam satu detik.',
    'Jelaskan kenapa peladen yang dirancang untuk laju rata-rata akan tetap tersendat, dan berapa kali sehari.',
    'Hitung bagian data yang berada dalam satu, dua, tiga, dan empat simpangan baku pada sebaran normal.',
    'Jalankan percobaan teorema limit pusat dengan populasi yang sangat melenceng, dan tunjukkan galat bakunya mengikuti sigma dibagi akar n.',
    'Jelaskan kenapa galat menyusut seperti akar n dan bukan sebanding lurus dengan n.',
    'Hitung ukuran sampel yang dibutuhkan untuk empat batas galat berbeda, lalu jelaskan akibatnya bagi biaya survei.',
    'Buat selang keyakinan 95 persen dari satu sampel, lalu jelaskan artinya dengan tepat tanpa memakai kata peluang untuk nilai sejatinya.',
    'Jelaskan kenapa menambah ukuran sampel tidak memperbaiki data yang cara pengambilannya berat sebelah.'
  ]
});
