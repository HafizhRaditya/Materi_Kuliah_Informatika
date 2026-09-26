/* ============================================================
   probstat.js — materi Probabilitas dan Statistika (Semester 2)

   Materi kuliahnya tidak tersimpan; yang ada di
   "Semester Dua/Probabilitas dan Statistika" hanya proyek
   kelompok "Kalkulator BMI" (Flask + Python) yang menghitung
   mean, median, dan modus dari data berat, tinggi, dan BMI.

   Kasus BMI itu dipakai sebagai contoh di topik statistika
   deskriptif. Sisanya disusun dari pengetahuan umum, dipilih
   yang benar-benar terpakai di Informatika.

   Tiga topik tambahan (peubah acak & nilai harapan, uji
   hipotesis, korelasi & regresi) disusun dari REFERENSI LUAR --
   keterangan lengkapnya ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik pertama berkas ini tidak mencakup beberapa pokok
   bahasan yang berulang di RPS Probabilitas dan Statistika
   program studi informatika kampus lain: peubah acak beserta
   nilai harapan dan ragamnya, pengujian hipotesis, serta
   korelasi dan regresi. Ketiga topik di bawah mengisinya.

   Data di program bawah adalah data TIRUAN yang dibangkitkan
   dengan benih acak tetap, kecuali kuartet Anscombe -- data
   terbitan F. J. Anscombe (1973) yang memang dirancang untuk
   contoh seperti ini. Semua program benar-benar dijalankan,
   dan keluarannya disalin apa adanya.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'probstat-nilai-harapan',
  judul: 'Peubah Acak, Nilai Harapan & Ragam',
  kategori: 'probstat',
  tag: ['peubah acak', 'nilai harapan', 'ragam', 'kelinearan', 'peubah indikator', 'tabrakan hash', 'kasus rata-rata'],
  ringkas: 'Rata-rata jangka panjang dari sesuatu yang acak — dan satu sifat yang membuat soal rumit menjadi penjumlahan sederhana.',

  fungsi: `**Meringkas sesuatu yang acak dengan dua angka: di mana pusatnya, dan seberapa jauh ia menyebar.**

Terpakai di:

- **Analisis kasus rata-rata algoritme** — pencarian linear rata-rata butuh (n + 1)/2 perbandingan; quicksort acak rata-rata O(n log n)
- **Merancang tabel hash** — berapa tabrakan yang harus diperkirakan untuk k kunci di m ember
- **Percobaan ulang dan batas waktu** — berapa kali rata-rata sebuah permintaan harus diulang sampai berhasil
- **Keputusan dengan risiko** — membandingkan pilihan dari keuntungan rata-rata dan sebarannya
- **Simulasi** — memastikan hasil simulasi cocok dengan perhitungan

Yang paling berguna dan paling mengejutkan: **kelinearan nilai harapan.** E[X + Y] = E[X] + E[Y] **selalu** berlaku — peubahnya saling bebas atau tidak. Sifat ini mengubah soal yang terlihat rumit menjadi penjumlahan satu baris.

Dan yang paling sering disalahpakai: **ragam tidak begitu.** Var(X + Y) = Var(X) + Var(Y) hanya berlaku kalau X dan Y saling bebas.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung nilai harapan dan ragam dari sebaran peluang, memeriksanya dengan simulasi, memakai peubah indikator untuk soal hitung-rata-rata, dan tahu kapan ragam boleh dijumlahkan.',
    alat: ['Python 3 dengan modul random dan fractions', 'Kertas untuk menulis sebaran peluang'],
    langkah: [
      { judul: 'Tulis sebaran peluangnya',
        isi: `Peubah acak adalah aturan yang memberi angka pada setiap hasil percobaan. Tuliskan setiap nilai yang mungkin dan peluangnya.

Untuk satu dadu: nilai 1 sampai 6, masing-masing 1/6. Jumlah peluangnya harus 1.` },
      { judul: 'Hitung nilai harapan dan ragam dengan pecahan',
        isi: `E[X] = jumlah x · P(x). Var(X) = E[X²] − (E[X])².

Pakai \`fractions.Fraction\` di Python supaya hasilnya tepat: untuk dadu, 7/2 dan 35/12.` },
      { judul: 'Periksa dengan simulasi',
        isi: `Lempar dadu tiruan ratusan ribu kali dengan \`random.randint(1, 6)\`, lalu hitung rata-rata dan ragamnya. Pasang \`random.seed\` supaya hasilnya bisa diulang.

Kalau simulasi jauh dari rumus, salah satunya keliru.` },
      { judul: 'Uji kelinearan dengan peubah yang bergantung',
        isi: `Bandingkan tiga pasangan: dua dadu yang saling bebas, X dengan 7 − X, dan X dengan dirinya sendiri. Hitung rata-rata dan ragam dari jumlahnya.

Rata-ratanya selalu 7. Ragamnya 5,83, 0, dan 11,67.` },
      { judul: 'Pecah soal hitung menjadi indikator',
        isi: `Untuk "berapa rata-rata banyaknya X", tulis banyaknya itu sebagai jumlah peubah indikator — masing-masing bernilai 1 kalau satu kejadian kecil terjadi, 0 kalau tidak.

Nilai harapan indikator sama dengan peluang kejadiannya. Jumlahkan, dan selesai — tanpa perlu tahu apakah indikatornya saling bebas.` },
      { judul: 'Pakai untuk tabel hash',
        isi: `Untuk k kunci di m ember, ada C(k, 2) pasangan kunci, dan setiap pasangan bertabrakan dengan peluang 1/m. Rata-rata banyaknya tabrakan: C(k, 2)/m.

Hitung untuk ukuran tabel yang kamu rencanakan sebelum menulis kodenya.` },
      { judul: 'Tentukan batas percobaan ulang dari sebarannya',
        isi: `Kalau satu percobaan berhasil dengan peluang p, rata-rata butuh 1/p percobaan. Tetapi batas percobaan ulang tidak boleh sama dengan rata-ratanya — separuh kejadian butuh lebih.

Hitung peluang gagal semua dalam k percobaan, (1 − p)^k, dan pilih k yang membuat peluang itu cukup kecil.` }
    ],
    cek: [
      'Nilai harapan dan ragam hitunganmu cocok dengan simulasi',
      'Kamu bisa menjelaskan kenapa E[X + Y] = E[X] + E[Y] berlaku untuk X dan 7 − X, sedangkan rumus ragamnya tidak',
      'Kamu menyelesaikan soal tabrakan hash dengan peubah indikator',
      'Batas percobaan ulangmu ditentukan dari peluang gagal, bukan dari rata-rata'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa menjumlahkan rata-rata tidak butuh saling bebas',

  konsep: `Topik statistika deskriptif meringkas **data yang sudah ada** dengan rata-rata dan simpangan baku. Topik ini melakukan hal yang sama untuk sesuatu yang **belum terjadi**: hasil percobaan acak yang peluangnya diketahui.

**Peubah acak**

Peubah acak adalah aturan yang memberi angka pada setiap hasil percobaan acak: angka yang muncul di dadu, banyaknya perbandingan sampai elemen ditemukan, banyaknya percobaan sampai permintaan berhasil.

**Nilai harapan: rata-rata jangka panjang**

E[X] = jumlah semua x · P(X = x)

Untuk satu dadu: (1 + 2 + 3 + 4 + 5 + 6)/6 = **7/2 = 3,5**.

Tidak ada satu lemparan pun yang menghasilkan 3,5. Nilai harapan bukan hasil yang paling mungkin, dan bukan hasil yang "diharapkan" dalam arti sehari-hari. Ia rata-rata yang didekati kalau percobaannya diulang sangat banyak kali — 200.000 lemparan tiruan memberi 3,4967.

**Ragam: seberapa jauh menyebar**

Var(X) = E[(X − E[X])²] = E[X²] − (E[X])²

Untuk dadu: 91/6 − 49/4 = **35/12 ≈ 2,9167**. Simulasi memberi 2,9185. Simpangan bakunya akar ragam, sekitar 1,71.

**Kelinearan nilai harapan**

Ini sifat terpenting di topik ini:

**E[X + Y] = E[X] + E[Y] — selalu, tanpa syarat.**

Program menguji tiga pasangan:

| Y | Hubungan dengan X | E[X + Y] | Var(X + Y) |
|---|---|---|---|
| dadu lain | saling bebas | 7,002 | 5,826 |
| 7 − X | bergantung penuh | 7,000 | 0,000 |
| X | bergantung penuh | 7,000 | 11,663 |

Nilai harapannya **selalu 7**. Ragamnya tidak:

- Saling bebas: 35/12 + 35/12 ≈ **5,833**. Rumus penjumlahan ragam berlaku.
- Y = 7 − X: setiap kali X besar, Y kecil, dan jumlahnya selalu tepat 7. Ragamnya **nol** — semua keacakan saling menghapus.
- Y = X: jumlahnya 2X, dan ragamnya **empat kali** ragam X, bukan dua kali.

Jadi: nilai harapan boleh dijumlahkan kapan saja; ragam hanya kalau saling bebas.

**Nilai harapan di analisis algoritme**

"Kasus rata-rata" sebuah algoritme adalah nilai harapan banyaknya langkah, dengan anggapan tertentu tentang masukannya.

Pencarian linear di larik 1000 elemen, dengan target berada di posisi mana pun dengan peluang sama: E[perbandingan] = (1 + 2 + ... + n)/n = **(n + 1)/2 = 500,5**. Simulasi memberi 500,1.

**Coba lagi sampai berhasil**

Kalau satu percobaan berhasil dengan peluang p, banyaknya percobaan sampai berhasil punya nilai harapan **1/p**:

| Peluang berhasil | Teoretis | Simulasi |
|---|---|---|
| 0,8 | 1,25 | 1,25 |
| 0,5 | 2,00 | 1,99 |
| 0,1 | 10,00 | 9,95 |

Tetapi 1/p cuma rata-rata. Dengan p = 0,1, peluang masih gagal setelah 10 percobaan adalah 0,9¹⁰ ≈ 35 persen, dan setelah 30 percobaan masih sekitar 4 persen. Batas percobaan ulang harus dipilih dari peluang gagal itu, bukan dari rata-ratanya.

**Peubah indikator: soal rumit jadi penjumlahan**

Berapa pasangan kunci yang rata-rata jatuh di ember hash yang sama, kalau k kunci dimasukkan ke m ember secara acak?

Menghitung sebaran lengkap banyaknya tabrakan itu rumit. Tetapi nilai harapannya mudah: untuk setiap pasangan kunci (i, j), buat indikator I_ij yang bernilai 1 kalau keduanya satu ember. P(I_ij = 1) = 1/m, jadi E[I_ij] = 1/m. Ada C(k, 2) pasangan. Dengan kelinearan:

**E[tabrakan] = C(k, 2)/m**

| k | m | Rumus | Simulasi |
|---|---|---|---|
| 23 | 365 | 0,693 | 0,695 |
| 1.000 | 1.000.000 | 0,499 | 0,508 |
| 10.000 | 1.000.000 | 49,995 | 49,395 |

Baris pertama adalah soal ulang tahun yang terkenal: di antara 23 orang, rata-rata ada 0,69 pasangan yang berulang tahun sama.

Baris ketiga yang penting untuk informatika: 10.000 kunci di **sejuta** ember — seratus kali lebih banyak ember daripada kunci — tetap memberi sekitar 50 tabrakan. Tabel hash harus selalu siap menangani tabrakan, seberapa pun besar tabelnya.

Perhatikan bahwa indikator-indikator itu **tidak** saling bebas: kalau kunci 1 dan 2 bertabrakan, dan 2 dan 3 bertabrakan, maka 1 dan 3 pasti bertabrakan. Kelinearan tidak peduli.

**Satu lagi: titik tetap permutasi acak**

Kocok larik n elemen secara acak. Rata-rata berapa elemen yang tetap di posisi awalnya?

Indikator I_i = 1 kalau elemen i tetap di tempatnya, dengan peluang 1/n. Ada n indikator. E = n · (1/n) = **1** — berapa pun n.

| n | Rata-rata titik tetap (simulasi) |
|---|---|
| 5 | 0,998 |
| 50 | 0,997 |
| 500 | 0,996 |

Jawaban yang sama untuk larik 5 elemen dan 500 elemen, didapat dalam satu baris hitungan.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "from fractions import Fraction as F\n\nnilai = range(1, 7)\nEX  = sum(F(x, 6) for x in nilai)          # 7/2\nEX2 = sum(F(x * x, 6) for x in nilai)      # 91/6\nVarX = EX2 - EX ** 2                        # 35/12\n\n# jumlah dua dadu:\n#   saling bebas   E = 7   Var = 35/12 + 35/12 = 35/6\n#   Y = 7 - X      E = 7   Var = 0\n#   Y = X          E = 7   Var = 4 * 35/12",
      penjelasan: `Tiga baris untuk dua angka yang meringkas satu dadu — dan tiga baris komentar yang menunjukkan kenapa angka pertama jauh lebih mudah dipakai daripada yang kedua.

**Kenapa \`Fraction\`, bukan float.**

1/6 dalam float adalah 0,16666666666666666 — terpotong. Menjumlahkan enam potongan seperti itu memberi hasil yang dekat dengan 3,5 tetapi belum tentu tepat. Dengan \`Fraction\`, 1/6 disimpan sebagai pasangan bilangan bulat 1 dan 6, dan hasilnya tepat 7/2.

Untuk memeriksa rumus, hasil tepat jauh lebih meyakinkan: 35/12 tidak bisa disalahartikan, sedangkan 2,9166666666666665 membuat orang bertanya apakah digit terakhirnya galat.

**Kenapa ragam dihitung sebagai E[X²] − (E[X])².**

Definisi ragam adalah rata-rata kuadrat jarak ke pusat: E[(X − μ)²]. Uraikan kuadratnya: E[X² − 2μX + μ²] = E[X²] − 2μ·E[X] + μ² = E[X²] − μ².

Uraian itu sendiri memakai kelinearan nilai harapan. Hasilnya lebih praktis: cukup dua jumlahan, tanpa perlu tahu μ lebih dulu.

Satu peringatan: untuk data sungguhan dengan float, rumus ini bisa kehilangan ketelitian kalau E[X²] dan μ² sangat besar dan hampir sama — pengurangan dua bilangan yang hampir sama, seperti di topik turunan numerik. Modul \`statistics\` Python memakai cara yang lebih aman. Dengan \`Fraction\`, masalah itu tidak ada.

**Kenapa nilai harapan selalu bisa dijumlahkan.**

E[X + Y] adalah jumlah (x + y) · P(x, y) untuk semua pasangan. Pecah menjadi jumlah x · P(x, y) ditambah jumlah y · P(x, y). Bagian pertama, dijumlahkan atas semua y, menjadi jumlah x · P(x) = E[X]. Bagian kedua, dengan cara yang sama, menjadi E[Y].

Tidak ada langkah di situ yang membutuhkan P(x, y) = P(x) · P(y). Itulah sebabnya kelinearan berlaku tanpa syarat saling bebas.

**Kenapa ragam tidak.**

Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y). Suku terakhir, kovarians, mengukur seberapa X dan Y bergerak bersama.

- Saling bebas: kovariansnya nol, dan ragam boleh dijumlahkan.
- Y = 7 − X: bergerak berlawanan penuh. Kovariansnya −35/12, dan menghapus kedua ragam: 35/12 + 35/12 − 2 · 35/12 = 0.
- Y = X: bergerak searah penuh. Kovariansnya +35/12: 35/12 + 35/12 + 2 · 35/12 = 4 · 35/12.

Kovarians itu yang akan muncul lagi, dinormalkan menjadi koefisien korelasi, di topik korelasi dan regresi.`
    },
    {
      bahasa: 'python',
      kode: "import math\n\n# k kunci, m ember, hash acak merata\n# I_ij = 1 kalau kunci i dan j satu ember\n# E[I_ij] = P(I_ij = 1) = 1/m\n# E[tabrakan] = jumlah E[I_ij] = C(k, 2) / m\n\nmath.comb(23, 2) / 365               # 0.693  (soal ulang tahun)\nmath.comb(10_000, 2) / 1_000_000     # 49.995\n\n# titik tetap permutasi acak n elemen:\n# n indikator, masing-masing 1/n  ->  E = 1",
      penjelasan: `Dua soal yang kelihatannya butuh kombinatorika berat, diselesaikan dengan satu gagasan: **pecah yang dihitung menjadi jumlah indikator.**

**Apa itu peubah indikator.**

Peubah yang bernilai 1 kalau suatu kejadian terjadi, dan 0 kalau tidak. Nilai harapannya: 1 · P(terjadi) + 0 · P(tidak) = P(terjadi). Nilai harapan indikator adalah peluang kejadiannya — tidak ada yang lebih sederhana dari itu.

**Menghitung = menjumlahkan indikator.**

"Banyaknya pasangan yang bertabrakan" sama dengan jumlah indikator I_ij atas semua pasangan. "Banyaknya titik tetap" sama dengan jumlah indikator I_i atas semua posisi.

Dan karena nilai harapan linear, E[jumlah] = jumlah E[indikator] = jumlah peluang. Soalnya berubah dari "cari sebaran lengkap sesuatu yang rumit" menjadi "cari peluang satu kejadian kecil, lalu kalikan dengan banyaknya".

**Kenapa langkah ini tidak bisa dilakukan tanpa kelinearan tanpa syarat.**

Indikator-indikator di kedua soal jelas saling bergantung. Pada tabel hash, kalau kunci 1 dan 2 satu ember, dan kunci 2 dan 3 satu ember, maka kunci 1 dan 3 pasti satu ember. Pada permutasi, kalau n − 1 elemen sudah di tempatnya, elemen terakhir pasti juga.

Kalau kelinearan butuh saling bebas, cara ini tidak bisa dipakai sama sekali. Karena tidak butuh, cara ini bekerja — dan simulasi membenarkannya: 0,695 lawan 0,693, dan 0,997 lawan 1.

**Apa yang tidak diberikan cara ini.**

Nilai harapan saja. Ia tidak memberi tahu peluang **setidaknya satu** tabrakan, atau seberapa sering tabrakannya jauh di atas rata-rata. Untuk 23 orang, rata-rata 0,69 pasangan; peluang setidaknya satu pasangan adalah sekitar 50,7 persen — angka yang berbeda, dan butuh perhitungan yang berbeda.

Untuk merancang tabel hash, nilai harapan sudah cukup memberi gambaran: sejuta ember untuk sepuluh ribu kunci tetap memberi puluhan tabrakan, jadi kode penanganan tabrakan tidak boleh dianggap jalur yang jarang terpakai.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Peubah acak, nilai harapan, dan ragam
# ============================================
import math
import random
from fractions import Fraction as F

random.seed(2024)
N = 200_000

# --------------------------------------------
# 1. Nilai harapan dan ragam satu dadu
# --------------------------------------------
print("--- satu dadu: X = angka yang muncul ---")
nilai = range(1, 7)
EX = sum(F(x, 6) for x in nilai)
EX2 = sum(F(x * x, 6) for x in nilai)
VarX = EX2 - EX ** 2
print("  E[X]   = jumlah x . P(x)      = " + str(EX) + " = " + format(float(EX), "g"))
print("  Var(X) = E[X^2] - (E[X])^2    = " + str(VarX) + " = " + format(float(VarX), ".4f"))
lemparan = [random.randint(1, 6) for _ in range(N)]
rata = sum(lemparan) / N
ragam = sum((x - rata) ** 2 for x in lemparan) / (N - 1)
print("  simulasi " + format(N, ",").replace(",", ".") + " lemparan: rata-rata "
      + format(rata, ".4f") + ", ragam " + format(ragam, ".4f"))
print("  Nilai harapan 3,5 tidak pernah muncul di satu lemparan pun.")
print("  Ia rata-rata jangka panjang, bukan hasil yang 'paling mungkin'.")

# --------------------------------------------
# 2. Kelinearan nilai harapan -- tanpa syarat saling bebas
# --------------------------------------------
print("\n--- E[X + Y] dan Var(X + Y) ---")
print("  pasangan                         E[X+Y]   Var(X+Y)")

def ringkas(data):
    m = sum(data) / len(data)
    v = sum((d - m) ** 2 for d in data) / (len(data) - 1)
    return m, v

a = [random.randint(1, 6) for _ in range(N)]
b = [random.randint(1, 6) for _ in range(N)]
bebas = [x + y for x, y in zip(a, b)]
lawan = [x + (7 - x) for x in a]                 # Y = 7 - X, bergantung penuh
sama = [x + x for x in a]                        # Y = X
for nama, data in [("Y dadu lain (saling bebas)", bebas),
                   ("Y = 7 - X  (bergantung)", lawan),
                   ("Y = X      (bergantung)", sama)]:
    m, v = ringkas(data)
    print("  " + format(nama, "<31") + format(m, "7.3f") + format(v, "11.3f"))
print()
print("  E[X+Y] selalu 7 = E[X] + E[Y], saling bebas atau tidak.")
print("  Var(X+Y) cuma 35/12 + 35/12 = " + format(float(2 * VarX), ".3f")
      + " kalau saling bebas.")
print("  Bergantung bisa menghapus ragam (7 - X) atau melipatkannya (X).")

# --------------------------------------------
# 3. Nilai harapan di analisis algoritme
# --------------------------------------------
print("\n--- pencarian linear: berapa perbandingan rata-rata? ---")
n = 1000
teoretis = (n + 1) / 2
simulasi = sum(random.randint(1, n) for _ in range(N)) / N
print("  target tersebar merata di larik " + str(n) + " elemen")
print("  E[perbandingan] = (1 + 2 + ... + n) / n = (n + 1)/2 = " + format(teoretis, "g"))
print("  simulasi                                       = " + format(simulasi, ".1f"))

print("\n--- coba lagi sampai berhasil: E = 1/p ---")
print("  peluang berhasil   teoretis   simulasi")
for p in [0.8, 0.5, 0.1]:
    total = 0
    for _ in range(50_000):
        k = 1
        while random.random() >= p:
            k += 1
        total += k
    print("  " + format(p, "<16g") + "  " + format(1 / p, "8.2f") + "   " + format(total / 50_000, "8.2f"))
print("  Permintaan yang gagal 90% butuh rata-rata 10 kali coba --")
print("  dan batas percobaan ulang harus jauh di atas 10, karena")
print("  itu cuma RATA-RATA.")

# --------------------------------------------
# 4. Trik peubah indikator: pasangan yang bertabrakan
# --------------------------------------------
print("\n--- berapa pasangan kunci yang jatuh di ember hash sama? ---")
print("  k kunci, m ember, fungsi hash acak merata")
print("  I_ij = 1 kalau kunci i dan j bertabrakan, P(I_ij = 1) = 1/m")
print("  E[tabrakan] = jumlah E[I_ij] = C(k, 2) / m")
print()
print("  k       m            rumus    simulasi")
for k, m, ulang in [(23, 365, 20_000), (1000, 1_000_000, 2_000), (10_000, 1_000_000, 200)]:
    rumus = math.comb(k, 2) / m
    total = 0
    for _ in range(ulang):
        hitung = {}
        for _ in range(k):
            e = random.randrange(m)
            hitung[e] = hitung.get(e, 0) + 1
        total += sum(c * (c - 1) // 2 for c in hitung.values())
    print("  " + format(k, "<7,").replace(",", ".") + " " + format(m, "<11,").replace(",", ".")
          + format(rumus, "9.3f") + format(total / ulang, "12.3f"))
print()
print("  Baris pertama adalah soal ulang tahun: 23 orang, 365 hari.")
print("  Baris ketiga: 10.000 kunci di SEJUTA ember sudah memberi")
print("  sekitar 50 tabrakan -- ember yang jauh lebih banyak dari")
print("  kuncinya tetap tidak menjamin bebas tabrakan.")

print("\n--- permutasi acak: berapa elemen yang tetap di tempatnya? ---")
for n in [5, 50, 500]:
    total = 0
    ulang = 20_000 if n < 500 else 4_000
    for _ in range(ulang):
        p = list(range(n))
        random.shuffle(p)
        total += sum(1 for i, v in enumerate(p) if i == v)
    print("  n = " + format(n, "<4") + " rata-rata titik tetap = " + format(total / ulang, ".3f"))
print("  Selalu sekitar 1, berapa pun n: ada n indikator, masing-masing")
print("  berpeluang 1/n. Indikatornya TIDAK saling bebas -- dan untuk")
print("  nilai harapan, itu memang tidak perlu.")` },
  output: `--- satu dadu: X = angka yang muncul ---
  E[X]   = jumlah x . P(x)      = 7/2 = 3.5
  Var(X) = E[X^2] - (E[X])^2    = 35/12 = 2.9167
  simulasi 200.000 lemparan: rata-rata 3.4967, ragam 2.9185
  Nilai harapan 3,5 tidak pernah muncul di satu lemparan pun.
  Ia rata-rata jangka panjang, bukan hasil yang 'paling mungkin'.

--- E[X + Y] dan Var(X + Y) ---
  pasangan                         E[X+Y]   Var(X+Y)
  Y dadu lain (saling bebas)       7.002      5.826
  Y = 7 - X  (bergantung)          7.000      0.000
  Y = X      (bergantung)          7.000     11.663

  E[X+Y] selalu 7 = E[X] + E[Y], saling bebas atau tidak.
  Var(X+Y) cuma 35/12 + 35/12 = 5.833 kalau saling bebas.
  Bergantung bisa menghapus ragam (7 - X) atau melipatkannya (X).

--- pencarian linear: berapa perbandingan rata-rata? ---
  target tersebar merata di larik 1000 elemen
  E[perbandingan] = (1 + 2 + ... + n) / n = (n + 1)/2 = 500.5
  simulasi                                       = 500.1

--- coba lagi sampai berhasil: E = 1/p ---
  peluang berhasil   teoretis   simulasi
  0.8                   1.25       1.25
  0.5                   2.00       1.99
  0.1                  10.00       9.95
  Permintaan yang gagal 90% butuh rata-rata 10 kali coba --
  dan batas percobaan ulang harus jauh di atas 10, karena
  itu cuma RATA-RATA.

--- berapa pasangan kunci yang jatuh di ember hash sama? ---
  k kunci, m ember, fungsi hash acak merata
  I_ij = 1 kalau kunci i dan j bertabrakan, P(I_ij = 1) = 1/m
  E[tabrakan] = jumlah E[I_ij] = C(k, 2) / m

  k       m            rumus    simulasi
  23      365            0.693       0.695
  1.000   1.000.000      0.499       0.508
  10.000  1.000.000     49.995      49.395

  Baris pertama adalah soal ulang tahun: 23 orang, 365 hari.
  Baris ketiga: 10.000 kunci di SEJUTA ember sudah memberi
  sekitar 50 tabrakan -- ember yang jauh lebih banyak dari
  kuncinya tetap tidak menjamin bebas tabrakan.

--- permutasi acak: berapa elemen yang tetap di tempatnya? ---
  n = 5    rata-rata titik tetap = 0.998
  n = 50   rata-rata titik tetap = 0.997
  n = 500  rata-rata titik tetap = 0.996
  Selalu sekitar 1, berapa pun n: ada n indikator, masing-masing
  berpeluang 1/n. Indikatornya TIDAK saling bebas -- dan untuk
  nilai harapan, itu memang tidak perlu.`,

  kompleksitas: {
    tabel: [
      { operasi: 'E[X] dan Var(X) dari sebaran dengan v nilai', waktu: 'O(v)', memori: 'O(1)' },
      { operasi: 'Memperkirakan E[X] dengan simulasi N kali', waktu: 'O(N)', memori: 'galat sebanding simpangan baku / √N' },
      { operasi: 'E[tabrakan] dengan indikator', waktu: 'O(1)', memori: 'rumus C(k, 2)/m' },
      { operasi: 'Mensimulasikan tabrakan k kunci', waktu: 'O(k) per ulangan', memori: 'O(k) untuk kamus ember' }
    ],
    intuisi: `Rumus nilai harapan dan ragam cuma perlu menjumlahkan sekali atas semua nilai yang mungkin. Simulasi perlu jauh lebih banyak kerja, dan ketelitiannya tumbuh lambat — mengikuti √N, persis seperti galat baku di topik distribusi. 200.000 lemparan dadu memberi rata-rata yang meleset sekitar 0,003 dari 3,5.

Karena itu simulasi dipakai untuk **memeriksa** rumus, bukan menggantikannya. Kalau keduanya cocok sampai dua atau tiga digit, rumusnya kemungkinan besar benar; kalau meleset jauh di atas galat bakunya, ada yang salah.

Peubah indikator adalah contoh terbaik kenapa rumus layak dicari: simulasi tabrakan 10.000 kunci butuh 200 ulangan × 10.000 kunci, sedangkan rumusnya satu pembagian — dan lebih tepat.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap nilai harapan adalah hasil yang paling mungkin terjadi.',
      kenapa: 'Nilai harapan adalah rata-rata jangka panjang, dan bisa berupa nilai yang tidak pernah muncul sama sekali. Nilai harapan satu dadu 3,5, padahal tidak ada sisi 3,5.',
      benar: 'Baca nilai harapan sebagai rata-rata dari banyak ulangan, dan pakai modus kalau yang dicari hasil yang paling sering.'
    },
    {
      salah: 'Menjumlahkan ragam dua peubah tanpa memeriksa apakah keduanya saling bebas.',
      kenapa: 'Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y). Kalau X dan Y bergerak searah, ragam jumlahnya lebih besar; kalau berlawanan, lebih kecil, bahkan bisa nol.',
      benar: 'Jumlahkan ragam hanya untuk peubah yang saling bebas, dan sertakan kovariansnya kalau tidak.'
    },
    {
      salah: 'Mengira kelinearan nilai harapan butuh peubah yang saling bebas.',
      kenapa: 'E[X + Y] = E[X] + E[Y] berlaku untuk peubah apa pun. Menganggapnya butuh saling bebas membuat orang menghindari cara indikator yang justru paling ampuh.',
      benar: 'Pakai kelinearan dengan bebas untuk nilai harapan, dan simpan kewaspadaan soal saling bebas untuk ragam dan peluang gabungan.'
    },
    {
      salah: 'Menetapkan batas percobaan ulang sama dengan rata-rata percobaan yang dibutuhkan.',
      kenapa: 'Rata-rata 1/p tidak menjamin apa pun untuk satu kejadian. Dengan p = 0,1, sekitar 35 persen kejadian masih gagal setelah 10 percobaan.',
      benar: 'Pilih batas k dari peluang gagal semua, (1 − p)^k, sampai peluang itu cukup kecil untuk kebutuhanmu.'
    },
    {
      salah: 'Menganggap tabel hash yang jauh lebih besar dari jumlah kuncinya bebas tabrakan.',
      kenapa: 'Rata-rata tabrakan C(k, 2)/m tumbuh mengikuti kuadrat banyaknya kunci. 10.000 kunci di sejuta ember masih memberi sekitar 50 tabrakan.',
      benar: 'Selalu tangani tabrakan dengan benar, dan hitung perkiraan tabrakan dari rumus sebelum memilih ukuran tabel.'
    },
    {
      salah: 'Mempercayai simulasi yang hasilnya tidak bisa diulang.',
      kenapa: 'Tanpa benih acak yang tetap, setiap jalannya program memberi angka berbeda, sehingga selisih kecil dengan rumus tidak bisa dibedakan antara kebetulan dan kesalahan.',
      benar: 'Pasang random.seed di awal program simulasi, dan bandingkan selisihnya dengan galat baku yang diharapkan.'
    }
  ],

  analogi: `Bayangkan kamu mengelola **kantin kampus** dan mencatat berapa porsi nasi goreng terjual setiap hari.

**Nilai harapan.** Setelah setahun, rata-ratanya 47,3 porsi sehari. Tidak ada satu hari pun kamu menjual 47,3 porsi — setengah porsi tidak bisa dijual. Tetapi angka itu yang kamu pakai untuk memesan beras sebulan: 30 hari × 47,3 porsi. Itulah nilai harapan: tidak berguna untuk meramal satu hari, sangat berguna untuk meramal jumlah banyak hari.

**Ragam.** Kantin sebelah juga rata-rata 47 porsi — tetapi mereka kadang 10, kadang 90. Kamu selalu antara 40 dan 55. Rata-ratanya sama, tetapi pemilik kantin sebelah jauh lebih sering kehabisan atau membuang nasi. Ragam yang membedakan kalian.

**Kelinearan.** Kamu juga menjual es teh, rata-rata 60 gelas sehari. Rata-rata jumlah transaksi nasi goreng ditambah es teh adalah 47,3 + 60 — **selalu**, meskipun orang yang membeli nasi goreng cenderung membeli es teh juga. Rata-rata tidak peduli hubungan itu.

Tetapi kalau kamu ingin tahu seberapa **berubah-ubah** jumlah transaksi harianmu, hubungan itu penting. Karena pembeli nasi goreng juga membeli es teh, hari ramai untuk satu adalah hari ramai untuk yang lain — keduanya naik bersama, dan jumlahnya berubah-ubah jauh lebih liar daripada kalau keduanya tidak berhubungan.

**Peubah indikator.** Pemilik kampus bertanya: rata-rata berapa mahasiswa yang makan di kantinmu **dan** di kantin sebelah pada hari yang sama?

Menghitungnya dengan mengikuti setiap mahasiswa itu rumit. Cara yang lebih mudah: untuk setiap mahasiswa, tanyakan satu hal — berapa peluang ia makan di kedua kantin pada satu hari? Kalau untuk seorang mahasiswa peluangnya 2 persen, ia menyumbang 0,02 ke rata-ratanya. Jumlahkan sumbangan semua mahasiswa, dan itulah jawabannya — tanpa perlu tahu siapa berteman dengan siapa, atau siapa selalu makan bersama.`,

  latihan: [
    'Hitung E[X] dan Var(X) untuk peubah acak yang bernilai 0, 1, 2 dengan peluang 1/4, 1/2, 1/4 memakai Fraction, lalu periksa dengan simulasi.',
    'Sebuah dadu curang memunculkan 6 dengan peluang 1/2 dan sisi lain masing-masing 1/10. Hitung nilai harapan dan ragamnya.',
    'Tunjukkan dengan simulasi bahwa E[X · Y] = E[X] · E[Y] untuk dua dadu yang saling bebas, tetapi tidak untuk Y = X.',
    'Hitung Var(X + Y) untuk Y = 7 − X dengan rumus kovarians, lalu jelaskan hasilnya tanpa rumus.',
    'Hitung nilai harapan banyaknya perbandingan pencarian linear kalau targetnya berada di paruh pertama larik dengan peluang 3/4.',
    'Sebuah permintaan jaringan berhasil dengan peluang 0,7. Hitung rata-rata banyaknya percobaan, lalu tentukan batas percobaan ulang supaya peluang gagal semua di bawah 0,1 persen.',
    'Hitung rata-rata banyaknya tabrakan untuk 50.000 kunci di tabel dengan 2²⁰ ember, lalu periksa dengan simulasi kecil.',
    'Berapa orang yang dibutuhkan supaya rata-rata banyaknya pasangan yang berulang tahun sama mencapai 1?',
    'Pakai peubah indikator untuk menghitung rata-rata banyaknya sisi 6 dalam 60 lemparan dadu.',
    'Jelaskan kenapa rata-rata 0,69 pasangan berulang tahun sama di antara 23 orang tidak sama dengan peluang 50,7 persen setidaknya satu pasangan.'
  ]
});


TOPICS.push({
  id: 'probstat-uji-hipotesis',
  judul: 'Uji Hipotesis & Uji A/B',
  kategori: 'probstat',
  tag: ['uji hipotesis', 'nilai p', 'uji A/B', 'kesalahan jenis I', 'kesalahan jenis II', 'daya uji', 'mengintip', 'Bonferroni'],
  ringkas: 'Memutuskan apakah sebuah perbedaan nyata atau cuma kebetulan — dan tiga cara paling umum untuk tertipu oleh kebetulan.',

  fungsi: `**Memutuskan, dari data yang terbatas, apakah sebuah perbedaan cukup besar untuk tidak dianggap kebetulan.**

Terpakai di:

- **Uji A/B** — apakah desain, tombol, atau algoritme rekomendasi baru benar-benar lebih baik
- **Mengukur kinerja** — apakah versi baru benar-benar lebih cepat, atau cuma kebetulan diukur saat peladen sepi
- **Evaluasi model pembelajaran mesin** — apakah akurasi yang naik 1 poin berarti, atau masih di dalam derau
- **Bab hasil tugas akhir** — hampir setiap penelitian kuantitatif diakhiri dengan uji hipotesis

Yang paling sering disalahpahami: **nilai p.** Nilai p 0,04 **bukan** berarti "peluang 4 persen tidak ada beda". Artinya: *kalau* memang tidak ada beda, kebetulan akan memberi hasil sejauh ini atau lebih sekitar 4 persen dari waktu.

Dan kesalahan yang paling sering dilakukan di industri: **mengintip.** Memeriksa hasil uji A/B setiap hari dan berhenti begitu terlihat signifikan menaikkan peluang "menemukan" beda palsu dari 5 persen menjadi sekitar 25 persen.`,

  praktik: {
    tujuan: 'Kamu bisa merumuskan H0 dan H1, menghitung nilai p uji dua proporsi, menentukan ukuran sampel sebelum uji dimulai, dan menghindari mengintip serta banyak perbandingan.',
    alat: ['Python 3 dengan modul math dan random', 'Data konversi dari dua versi halaman, atau data tiruan'],
    langkah: [
      { judul: 'Tulis H0 dan H1 sebelum melihat data',
        isi: `H0 (hipotesis nol) selalu "tidak ada beda" — kedua versi sama baiknya. H1 adalah yang ingin kamu tunjukkan.

Tulis juga ukuran yang akan dipakai (misalnya persentase pengunjung yang membeli) dan taraf nyata (biasanya 0,05) — sebelum data dikumpulkan.` },
      { judul: 'Tentukan ukuran sampel dari daya uji',
        isi: `Putuskan beda terkecil yang layak dideteksi — misalnya naik dari 10 ke 12 persen — lalu hitung berapa pengunjung per kelompok yang dibutuhkan supaya beda itu terdeteksi dengan peluang 80 persen.

Untuk 10 lawan 12 persen, program topik ini menunjukkan sekitar 4.000 per kelompok.` },
      { judul: 'Bagi pengunjung secara acak',
        isi: `Setiap pengunjung masuk ke kelompok A atau B secara acak — bukan berdasarkan hari, jam, atau jenis perangkat.

Tanpa pengacakan, perbedaan hasil bisa disebabkan perbedaan kelompok, bukan perbedaan versi.` },
      { judul: 'Kumpulkan sampai ukuran yang direncanakan',
        isi: `Jangan menghitung nilai p setiap hari lalu berhenti begitu di bawah 0,05. Tunggu sampai ukuran sampel tercapai, lalu uji **sekali**.

Kalau memang harus memantau di tengah jalan, pakai metode uji berurutan yang dirancang untuk itu, dengan batas yang lebih ketat untuk setiap intipan.` },
      { judul: 'Hitung nilai p',
        isi: `Untuk dua proporsi: gabungkan kedua kelompok untuk memperkirakan proporsi bersama, hitung galat baku selisihnya, lalu z = selisih / galat baku. Nilai p dua arah = 2 × (1 − Φ(|z|)), dengan Φ dari \`math.erf\`.

Periksa juga dengan uji eksak atau permutasi kalau sampelnya kecil.` },
      { judul: 'Laporkan besar efeknya, bukan cuma nilai p',
        isi: `Tulis selisihnya (misalnya +2 poin, dari 10 ke 12 persen) beserta selang keyakinannya, di samping nilai p.

Nilai p kecil dengan efek sangat kecil — misalnya 0,1 poin pada sejuta pengunjung — bisa signifikan secara statistik tetapi tidak berarti apa-apa bagi bisnis.` },
      { judul: 'Koreksi untuk banyak perbandingan',
        isi: `Kalau kamu menguji k ukuran sekaligus — konversi, waktu di halaman, klik, dan seterusnya — pakai batas 0,05/k untuk masing-masing (koreksi Bonferroni), atau tentukan satu ukuran utama sejak awal.` }
    ],
    cek: [
      'H0, H1, ukuran utama, taraf nyata, dan ukuran sampel tertulis sebelum data dikumpulkan',
      'Kamu menguji sekali di akhir, bukan berulang kali di tengah jalan',
      'Kamu bisa menjelaskan nilai p tanpa menyebutnya peluang H0 benar',
      'Laporanmu memuat besar efek, bukan hanya signifikan atau tidak'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa mengintip hasil membuat kebetulan terlihat nyata',

  konsep: `Topik distribusi menunjukkan bahwa rata-rata sampel berfluktuasi di sekitar nilai sejatinya, dengan galat baku yang menyusut mengikuti √n. Uji hipotesis memakai fakta itu untuk menjawab satu pertanyaan: **apakah perbedaan yang terlihat lebih besar dari yang bisa dihasilkan fluktuasi itu sendiri?**

**Uji A/B**

Toko daring mencoba tombol "Beli" yang baru. Pengunjung dibagi acak:

| Versi | Pengunjung | Membeli | Konversi |
|---|---|---|---|
| A (lama) | 2000 | 200 | 10,0% |
| B (baru) | 2000 | 240 | 12,0% |

B lebih tinggi 2 poin. Tetapi dua kelompok acak **tidak pernah** memberi angka persis sama, bahkan untuk tombol yang identik. Apakah 2 poin cukup besar?

**Hipotesis nol**

Uji hipotesis bekerja dengan cara yang terbalik dari intuisi. Ia tidak mencoba membuktikan bahwa B lebih baik. Ia **menganggap** tidak ada beda — itulah **H0** — lalu bertanya: kalau H0 benar, seberapa mengejutkan data ini?

**Nilai p**

| Cara | Nilai p |
|---|---|
| uji z dua proporsi (z = 2,021) | 0,0432 |
| uji eksak, menghitung semua pembagian acak | 0,0486 |

Uji eksak menjawab pertanyaannya secara harfiah: kalau 440 pembeli itu memang tersebar acak ke 4000 pengunjung tanpa peduli tombolnya, dalam berapa persen pembagian selisihnya 40 pembeli atau lebih? Uji z memberi jawaban yang mendekati lewat sebaran normal — dan keduanya sepakat: di bawah 5 persen. Di taraf nyata 5 persen, H0 ditolak.

Tiga hal yang **bukan** arti nilai p 0,043:

- bukan peluang 4,3 persen bahwa H0 benar
- bukan peluang 95,7 persen bahwa B lebih baik
- bukan ukuran seberapa **besar** perbedaannya

Artinya cuma satu: *kalau* kedua tombol sama saja, hasil sejauh ini atau lebih akan muncul sekitar 4,3 persen dari waktu.

**Dua jenis kesalahan**

| | H0 benar (tidak ada beda) | H0 salah (ada beda) |
|---|---|---|
| H0 ditolak | **jenis I** — beda palsu | benar |
| H0 tidak ditolak | benar | **jenis II** — beda terlewat |

Taraf nyata 5 persen adalah batas kesalahan jenis I yang kita terima. Kesalahan jenis II diatur oleh ukuran sampel.

**Mengintip: kesalahan jenis I yang membengkak**

Program menjalankan 2000 uji A/A — kedua tombol **sama persis**, sama-sama 10 persen:

| Cara menguji | Percobaan yang "menemukan" beda |
|---|---|
| sekali di akhir, 2000 per kelompok | 5,0% |
| intip setiap 100 pengunjung, berhenti begitu p < 0,05 | **24,8%** |

Uji sekali salah persis 5 persen — itulah arti taraf 5 persen. Mengintip 20 kali memberi 20 kesempatan kepada kebetulan untuk sempat melewati batas, dan cukup **satu** kali lewat untuk menghentikan uji dengan kesimpulan yang salah. Hampir seperempat uji A/A — yang dijamin tidak punya beda — berakhir dengan "B lebih baik" atau "A lebih baik".

**Banyak ukuran sekaligus**

Masalah yang sama muncul kalau banyak ukuran diuji bersamaan, walaupun masing-masing diuji sekali:

| Ukuran diuji | Peluang minimal satu "signifikan" palsu |
|---|---|
| 1 | 5,0% |
| 5 | 22,6% |
| 20 | 64,2% |
| 100 | 99,4% |

Dengan 20 ukuran dan tidak ada beda sama sekali, peluangnya hampir dua pertiga bahwa setidaknya satu terlihat signifikan. Koreksi Bonferroni memakai batas 0,05/k untuk setiap ukuran, sehingga peluang minimal satu palsu kembali ke sekitar 5 persen.

**Daya uji: kesalahan jenis II**

Sekarang B **sungguh** lebih baik: 12 lawan 10 persen. Seberapa sering uji menemukannya?

| Pengunjung per kelompok | Terdeteksi (simulasi) | Perkiraan rumus |
|---|---|---|
| 500 | 18,1% | 17,1% |
| 1.000 | 32,6% | 29,8% |
| 2.000 | 54,0% | 52,5% |
| 4.000 | 81,6% | 81,6% |

Dengan 500 pengunjung per kelompok, perbaikan yang nyata cuma terdeteksi kira-kira sekali dari lima. Empat dari lima uji menyimpulkan "tidak signifikan" — dan tim bisa membuang tombol yang sebenarnya lebih baik.

Karena itu **"tidak signifikan" tidak sama dengan "tidak ada beda"**. Bisa jadi sampelnya terlalu kecil untuk melihat bedanya. Ukuran sampel harus ditentukan **sebelum** uji dimulai, dari beda terkecil yang ingin dideteksi dan daya uji yang diinginkan — lazimnya 80 persen, yang di sini berarti sekitar 4000 per kelompok.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\n\ndef phi(z):                          # sebaran kumulatif normal baku\n    return 0.5 * (1 + math.erf(z / math.sqrt(2)))\n\ndef uji_z_proporsi(x1, n1, x2, n2):\n    p1, p2 = x1 / n1, x2 / n2\n    gabung = (x1 + x2) / (n1 + n2)                 # anggapan H0\n    se = math.sqrt(gabung * (1 - gabung) * (1 / n1 + 1 / n2))\n    z = (p2 - p1) / se\n    return z, 2 * (1 - phi(abs(z)))                # dua arah\n\nuji_z_proporsi(200, 2000, 240, 2000)   # z = 2.021, p = 0.0432",
      penjelasan: `Delapan baris yang mengubah "10 lawan 12 persen" menjadi satu angka yang bisa dibandingkan dengan 0,05.

**Kenapa proporsinya digabung.**

Uji ini menghitung seberapa mengejutkan data **kalau H0 benar**. Kalau H0 benar, kedua tombol punya satu laju konversi yang sama, dan perkiraan terbaik untuk laju itu adalah menggabungkan semua data: 440 pembeli dari 4000 pengunjung, 11 persen.

Galat baku dihitung dari laju gabungan itu — bukan dari 10 dan 12 persen masing-masing — karena seluruh perhitungannya berlangsung di dunia yang dibayangkan H0.

**Dari mana rumus galat bakunya.**

Satu proporsi dari n pengunjung punya ragam p(1 − p)/n — ragam peubah Bernoulli dibagi n, seperti di topik distribusi. Dua kelompok yang saling bebas: ragam selisihnya adalah **jumlah** ragam keduanya. Itu sebabnya ada \`1/n1 + 1/n2\`.

Perhatikan kata "saling bebas" di situ. Penjumlahan ragam hanya sah untuk peubah yang saling bebas — dan pengacakan pengunjung yang membuatnya saling bebas.

**z: berapa galat baku jauhnya.**

z = 0,02 / 0,009894 = 2,021. Selisih yang teramati sekitar dua galat baku dari nol. Menurut teorema limit pusat, selisih proporsi yang dibayangkan H0 bersebaran hampir normal, dan hasil sejauh dua galat baku atau lebih — ke arah mana pun — muncul sekitar 4 persen dari waktu.

**Φ dari \`math.erf\`.**

Python tidak menyediakan fungsi sebaran normal di modul math, tetapi menyediakan \`erf\`, fungsi galat. Hubungannya Φ(z) = (1 + erf(z/√2))/2. Dengan satu baris itu, tidak perlu pustaka statistik apa pun. (Modul \`statistics\` juga menyediakan \`NormalDist().cdf\` yang memberi hasil sama.)

**Dua arah: kenapa dikali 2.**

H1 berbunyi "kedua tombol berbeda", bukan "B lebih baik". Hasil yang sama mengejutkannya ke arah sebaliknya — A lebih tinggi 2 poin — juga dihitung. Karena sebaran normal simetris, cukup hitung satu ekor lalu kalikan dua.

Memilih uji satu arah setelah melihat data — karena ternyata B yang lebih tinggi — adalah cara halus untuk memotong nilai p menjadi separuh. Arahnya harus diputuskan sebelum data dilihat.

**Kapan rumus ini tidak cukup.**

Uji z bersandar pada pendekatan normal, yang baik kalau banyaknya pembeli dan bukan pembeli di setiap kelompok cukup besar — aturan praktis yang umum, minimal sekitar 10. Untuk sampel kecil atau kejadian yang sangat jarang, pakai uji eksak seperti yang juga dihitung program ini. Di sini keduanya sepakat: 0,0432 dan 0,0486.`
    },
    {
      bahasa: 'python',
      kode: "# uji A/A: kedua kelompok SAMA PERSIS, laju 10%\nfor _ in range(2000):\n    a = [random.random() < 0.10 for _ in range(2000)]\n    b = [random.random() < 0.10 for _ in range(2000)]\n    # cara salah: intip setiap 100 pengunjung\n    for n in range(100, 2001, 100):\n        _, p = uji_z_proporsi(sum(a[:n]), n, sum(b[:n]), n)\n        if p < 0.05:\n            salah_intip += 1       # berhenti: 'menemukan' beda\n            break\n\n# uji sekali di akhir : 5.0%\n# intip 20 kali      : 24.8%",
      penjelasan: `Simulasi yang menunjukkan kesalahan paling umum di uji A/B — dan kenapa aturan "tunggu sampai selesai" bukan sekadar formalitas.

**Uji A/A: memeriksa ujinya sendiri.**

Kedua kelompok dibangkitkan dengan laju yang sama persis, 10 persen. Tidak ada beda. Setiap kali uji menyatakan "signifikan", itu kesalahan jenis I.

Uji A/A dipakai sungguhan di industri untuk memeriksa sistem uji A/B-nya: kalau lebih dari sekitar 5 persen uji A/A signifikan, ada yang salah di pengacakan, pencatatan, atau cara mengujinya.

**Kenapa sekali di akhir memberi 5 persen.**

Taraf nyata 5 persen **didefinisikan** sebagai peluang kesalahan jenis I untuk **satu** uji. Simulasi mengonfirmasinya: tepat 5,0 persen.

**Kenapa mengintip memberi hampir 25 persen.**

Nilai p tidak diam di satu tempat saat data bertambah. Ia berjalan naik-turun secara acak, dan di awal — dengan sedikit pengunjung — ia berayun lebar.

Setiap intipan adalah satu kesempatan bagi ayunan itu untuk kebetulan turun di bawah 0,05. Dengan 20 intipan, ada 20 kesempatan. Dan aturan "berhenti begitu signifikan" berarti satu kesempatan yang berhasil sudah cukup — ayunan-ayunan sesudahnya, yang mungkin membawanya kembali ke atas, tidak pernah dilihat.

Kesempatan-kesempatan itu tidak saling bebas — data di intipan ke-10 memuat data di intipan ke-9 — jadi hasilnya tidak sebesar 1 − 0,95²⁰ = 64 persen. Tetapi tetap hampir lima kali lipat dari yang dijanjikan.

**Kenapa ini terjadi di dunia nyata.**

Dasbor uji A/B menampilkan nilai p secara langsung, diperbarui setiap jam. Tim yang bersemangat melihat "signifikan!" di hari ketiga, menghentikan uji, dan meluncurkan versi baru. Tidak ada yang curang — setiap orang cuma melihat angka yang disajikan. Tetapi hasil akhirnya: hampir seperempat "kemenangan" yang diumumkan adalah kebetulan.

**Jalan keluarnya.**

Yang paling sederhana: tentukan ukuran sampel di awal, dan jangan menghitung nilai p sebelum ukuran itu tercapai. Pemantauan di tengah jalan boleh untuk mencari galat teknis — halaman rusak, pencatatan mati — tetapi bukan untuk memutuskan.

Kalau memang perlu bisa berhenti lebih awal, ada metode uji berurutan yang dirancang untuk itu: setiap intipan memakai batas yang lebih ketat dari 0,05, dipilih sehingga peluang kesalahan jenis I **total** tetap 5 persen. Harganya: butuh sampel sedikit lebih besar kalau ternyata harus berjalan sampai akhir.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Uji hipotesis: uji A/B, nilai p, dan dua jenis kesalahan
# ============================================
import math
import random

random.seed(7)

def phi(z):
    """Fungsi sebaran kumulatif normal baku."""
    return 0.5 * (1 + math.erf(z / math.sqrt(2)))

def uji_z_proporsi(x1, n1, x2, n2):
    """Uji z dua proporsi, dua arah. Mengembalikan (z, p)."""
    p1, p2 = x1 / n1, x2 / n2
    gabung = (x1 + x2) / (n1 + n2)
    se = math.sqrt(gabung * (1 - gabung) * (1 / n1 + 1 / n2))
    z = (p2 - p1) / se
    return z, 2 * (1 - phi(abs(z)))

# --------------------------------------------
# 1. Uji A/B: apakah tombol baru menaikkan konversi?
# --------------------------------------------
print("--- uji A/B tombol 'Beli' ---")
nA, xA = 2000, 200
nB, xB = 2000, 240
print("  A (lama): " + str(xA) + " dari " + str(nA) + " membeli = " + format(xA / nA, ".1%"))
print("  B (baru): " + str(xB) + " dari " + str(nB) + " membeli = " + format(xB / nB, ".1%"))
print()
print("  H0: kedua tombol sama saja; selisih 2 poin itu kebetulan")
print("  H1: kedua tombol berbeda")
z, p = uji_z_proporsi(xA, nA, xB, nB)
print()
print("  uji z dua proporsi : z = " + format(z, ".3f") + ", p = " + format(p, ".4f"))

# uji eksak: kalau H0 benar, 440 pembeli tersebar acak ke 4000
# pengunjung; berapa peluang selisihnya sejauh ini atau lebih?
total_beli, total = xA + xB, nA + nB
def pmf(k):                         # k pembeli jatuh di kelompok A
    return (math.comb(total_beli, k) * math.comb(total - total_beli, nA - k)
            / math.comb(total, nA))
selisih = abs(xB - xA)
p_eksak = sum(pmf(k) for k in range(0, total_beli + 1)
              if abs((total_beli - k) - k) >= selisih)
print("  uji eksak (hitung semua pembagian acak) : p = " + format(p_eksak, ".4f"))
print()
print("  Nilai p: KALAU kedua tombol sama saja, seberapa sering")
print("  kebetulan memberi selisih sebesar ini atau lebih? Sekitar")
print("  " + format(p, ".1%") + " -- jarang, jadi di taraf 5% H0 ditolak.")
print("  Nilai p BUKAN peluang H0 benar.")

# --------------------------------------------
# 2. Kesalahan jenis I: menolak H0 padahal benar
# --------------------------------------------
def konversi(n, laju):
    return sum(1 for _ in range(n) if random.random() < laju)

print("\n--- uji A/A: kedua tombol SAMA PERSIS (10%), 2.000 percobaan ---")
PERCOBAAN, N_AKHIR, LANGKAH = 2000, 2000, 100
salah_sekali = salah_intip = 0
for _ in range(PERCOBAAN):
    a = [random.random() < 0.10 for _ in range(N_AKHIR)]
    b = [random.random() < 0.10 for _ in range(N_AKHIR)]
    # cara benar: uji sekali di akhir
    _, p = uji_z_proporsi(sum(a), N_AKHIR, sum(b), N_AKHIR)
    if p < 0.05:
        salah_sekali += 1
    # cara salah: intip setiap 100 pengunjung, berhenti begitu p < 0.05
    for n in range(LANGKAH, N_AKHIR + 1, LANGKAH):
        _, p = uji_z_proporsi(sum(a[:n]), n, sum(b[:n]), n)
        if p < 0.05:
            salah_intip += 1
            break
print("  uji sekali di akhir         : " + format(salah_sekali / PERCOBAAN, "6.1%")
      + " percobaan 'menemukan' beda")
print("  intip 20 kali, berhenti dini: " + format(salah_intip / PERCOBAAN, "6.1%")
      + " percobaan 'menemukan' beda")
print()
print("  Tidak ada beda sungguhan. Uji sekali salah sekitar 5% -- itu")
print("  arti taraf 5%. Mengintip 20 kali memberi 20 kesempatan bagi")
print("  kebetulan untuk melewati batas, dan cukup SATU yang lewat.")

print("\n--- banyak ukuran sekaligus ---")
print("  ukuran diuji   P(minimal satu p < 0,05 padahal tak ada beda)")
for k in [1, 5, 20, 100]:
    print("  " + format(k, "<14") + " " + format(1 - 0.95 ** k, ".1%"))
print("  Koreksi Bonferroni: pakai batas 0,05/k untuk setiap ukuran.")

# --------------------------------------------
# 3. Kesalahan jenis II: beda sungguhan tidak terdeteksi
# --------------------------------------------
print("\n--- daya uji: B SUNGGUH lebih baik (12% vs 10%) ---")
print("  pengunjung/kelompok   terdeteksi (simulasi)   perkiraan rumus")
for n in [500, 1000, 2000, 4000]:
    ulang = 1000
    kena = 0
    for _ in range(ulang):
        _, p = uji_z_proporsi(konversi(n, 0.10), n, konversi(n, 0.12), n)
        if p < 0.05:
            kena += 1
    se = math.sqrt(0.10 * 0.90 / n + 0.12 * 0.88 / n)
    rumus = 1 - phi(1.96 - 0.02 / se)
    print("  " + format(n, "<20,").replace(",", ".") + "  " + format(kena / ulang, "<22.1%")
          + "  " + format(rumus, ".1%"))
print()
print("  Dengan 500 pengunjung per kelompok, perbaikan 2 poin yang")
print("  NYATA cuma terdeteksi sekitar sekali dari lima. 'Tidak")
print("  signifikan' tidak sama dengan 'tidak ada beda' -- bisa jadi")
print("  sampelnya terlalu kecil untuk melihatnya.")` },
  output: `--- uji A/B tombol 'Beli' ---
  A (lama): 200 dari 2000 membeli = 10.0%
  B (baru): 240 dari 2000 membeli = 12.0%

  H0: kedua tombol sama saja; selisih 2 poin itu kebetulan
  H1: kedua tombol berbeda

  uji z dua proporsi : z = 2.021, p = 0.0432
  uji eksak (hitung semua pembagian acak) : p = 0.0486

  Nilai p: KALAU kedua tombol sama saja, seberapa sering
  kebetulan memberi selisih sebesar ini atau lebih? Sekitar
  4.3% -- jarang, jadi di taraf 5% H0 ditolak.
  Nilai p BUKAN peluang H0 benar.

--- uji A/A: kedua tombol SAMA PERSIS (10%), 2.000 percobaan ---
  uji sekali di akhir         :   5.0% percobaan 'menemukan' beda
  intip 20 kali, berhenti dini:  24.8% percobaan 'menemukan' beda

  Tidak ada beda sungguhan. Uji sekali salah sekitar 5% -- itu
  arti taraf 5%. Mengintip 20 kali memberi 20 kesempatan bagi
  kebetulan untuk melewati batas, dan cukup SATU yang lewat.

--- banyak ukuran sekaligus ---
  ukuran diuji   P(minimal satu p < 0,05 padahal tak ada beda)
  1              5.0%
  5              22.6%
  20             64.2%
  100            99.4%
  Koreksi Bonferroni: pakai batas 0,05/k untuk setiap ukuran.

--- daya uji: B SUNGGUH lebih baik (12% vs 10%) ---
  pengunjung/kelompok   terdeteksi (simulasi)   perkiraan rumus
  500                   18.1%                   17.1%
  1.000                 32.6%                   29.8%
  2.000                 54.0%                   52.5%
  4.000                 81.6%                   81.6%

  Dengan 500 pengunjung per kelompok, perbaikan 2 poin yang
  NYATA cuma terdeteksi sekitar sekali dari lima. 'Tidak
  signifikan' tidak sama dengan 'tidak ada beda' -- bisa jadi
  sampelnya terlalu kecil untuk melihatnya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Uji z dua proporsi', waktu: 'O(1)', memori: 'cukup empat bilangan: x1, n1, x2, n2' },
      { operasi: 'Uji eksak dengan semua pembagian', waktu: 'O(x1 + x2) suku', memori: 'bilangan bulat besar dari math.comb' },
      { operasi: 'Simulasi S uji A/A dengan n per kelompok', waktu: 'O(S · n)', memori: 'O(n) per uji' },
      { operasi: 'Ukuran sampel untuk beda d', waktu: 'n sebanding 1/d²', memori: 'separuh beda butuh empat kali sampel' }
    ],
    intuisi: `Uji z sendiri murah — cukup empat angka ringkasan, berapa pun banyaknya pengunjung. Uji eksak butuh menjumlahkan satu suku untuk setiap kemungkinan banyaknya pembeli di kelompok A, tetap ringan untuk ratusan pembeli.

Yang benar-benar mahal adalah **datanya**, dan baris terakhir yang menentukan biayanya. Galat baku selisih menyusut mengikuti 1/√n, jadi beda yang dua kali lebih kecil butuh sampel **empat kali** lebih besar untuk dideteksi dengan daya yang sama — hukum akar yang sama dengan di topik distribusi.

Itu yang membuat uji A/B untuk perbaikan kecil begitu mahal: mendeteksi kenaikan dari 10 ke 10,5 persen butuh sekitar enam belas kali sampel yang dibutuhkan untuk 10 ke 12 persen. Toko kecil dengan beberapa ratus pengunjung sehari sering tidak punya cukup lalu lintas untuk menguji perubahan kecil sama sekali.`
  },

  kesalahanUmum: [
    {
      salah: 'Menafsirkan nilai p sebagai peluang bahwa H0 benar.',
      kenapa: 'Nilai p dihitung dengan menganggap H0 benar, jadi ia tidak bisa sekaligus menjadi peluang H0 benar. Ia adalah peluang hasil sejauh ini atau lebih, kalau H0 benar.',
      benar: 'Baca nilai p sebagai: kalau tidak ada beda, seberapa sering kebetulan memberi hasil seperti ini.'
    },
    {
      salah: 'Memeriksa nilai p berulang kali selama uji berjalan dan berhenti begitu di bawah 0,05.',
      kenapa: 'Setiap intipan memberi kesempatan tambahan bagi kebetulan untuk melewati batas. Dengan 20 intipan, hampir 25 persen uji tanpa beda sungguhan berakhir signifikan.',
      benar: 'Tentukan ukuran sampel di awal dan uji sekali, atau pakai metode uji berurutan dengan batas yang disesuaikan.'
    },
    {
      salah: 'Menguji banyak ukuran sekaligus dan melaporkan yang signifikan saja.',
      kenapa: 'Dengan 20 ukuran tanpa beda sungguhan, peluang setidaknya satu terlihat signifikan sekitar 64 persen. Yang dilaporkan hampir pasti kebetulan.',
      benar: 'Tentukan satu ukuran utama sebelum uji, atau pakai batas 0,05/k untuk k ukuran.'
    },
    {
      salah: 'Menyimpulkan tidak ada beda karena hasilnya tidak signifikan.',
      kenapa: 'Dengan sampel kecil, beda yang nyata sering tidak terdeteksi. Pada 500 pengunjung per kelompok, kenaikan nyata dari 10 ke 12 persen cuma terdeteksi sekitar 18 persen dari waktu.',
      benar: 'Hitung daya uji sebelum mulai, dan laporkan hasil tidak signifikan sebagai tidak cukup bukti, bukan bukti tidak ada beda.'
    },
    {
      salah: 'Memilih uji satu arah setelah melihat arah hasilnya.',
      kenapa: 'Uji satu arah memotong nilai p menjadi separuh. Memilihnya setelah tahu arah hasil berarti memakai data dua kali, dan kesalahan jenis I sebenarnya menjadi dua kali taraf yang dinyatakan.',
      benar: 'Putuskan satu arah atau dua arah sebelum data dikumpulkan, dan pakai dua arah kalau ragu.'
    },
    {
      salah: 'Melaporkan hanya signifikan atau tidak, tanpa besar efeknya.',
      kenapa: 'Dengan sampel sangat besar, beda yang tidak berarti secara praktis pun bisa signifikan. Tanpa besar efek, pembaca tidak bisa menilai apakah temuannya penting.',
      benar: 'Laporkan selisihnya beserta selang keyakinannya, di samping nilai p.'
    },
    {
      salah: 'Membagi kelompok berdasarkan hari atau perangkat, bukan secara acak.',
      kenapa: 'Kalau versi A tampil hari Senin dan B hari Sabtu, perbedaan hasil bisa disebabkan perbedaan pengunjung di kedua hari, bukan perbedaan versi.',
      benar: 'Tentukan kelompok setiap pengunjung secara acak, dan pastikan pengunjung yang sama selalu melihat versi yang sama.'
    }
  ],

  analogi: `Bayangkan temanmu mengaku punya **koin keberuntungan** yang lebih sering jatuh angka.

**Hipotesis nol.** Kamu tidak mencoba membuktikan koinnya istimewa. Kamu mulai dengan menganggap koinnya biasa saja — H0 — lalu melihat apakah hasilnya terlalu aneh untuk koin biasa.

Ia melempar 100 kali dan dapat 60 angka. Koin biasa rata-rata 50. Apakah 60 cukup aneh?

**Nilai p.** Kamu melempar koin yang kamu tahu biasa, 100 kali, lalu mengulanginya ribuan kali. Sekitar 5,7 persen dari ulangan itu memberi hasil sejauh 10 atau lebih dari 50 — 60 ke atas atau 40 ke bawah. Itulah nilai p: bukan peluang koin temanmu biasa, melainkan seberapa sering koin biasa memberi hasil seaneh itu.

**Mengintip.** Sekarang bayangkan temanmu tidak menentukan 100 lemparan di awal. Ia melempar, dan setiap 10 lemparan ia melihat hasilnya. Begitu kebetulan terlihat "cukup aneh", ia berhenti dan berseru, "Lihat, koin keberuntungan!"

Dengan cara itu, **koin paling biasa pun** akan sering terlihat istimewa — karena di suatu titik di tengah jalan, deretan kebetulan hampir selalu sempat membuatnya terlihat aneh sebentar. Dan temanmu berhenti tepat di titik itu.

**Banyak ukuran.** Temanmu punya dua puluh koin, dan melempar masing-masing 100 kali. Satu di antaranya memberi 60 angka. "Ini koin keberuntunganku!" Tetapi dengan dua puluh koin biasa, peluangnya sekitar 69 persen bahwa setidaknya satu memberi hasil seaneh itu. Koin yang ia pilih istimewa cuma karena ia memilihnya **setelah** melihat hasilnya.

**Daya uji.** Terakhir, koin temanmu ternyata **sungguh** sedikit berat sebelah — 55 persen angka. Dengan cuma 20 lemparan, hampir mustahil membedakannya dari koin biasa. "Tidak terbukti" bukan berarti "koinnya biasa" — cuma berarti 20 lemparan terlalu sedikit untuk melihat bedanya.`,

  latihan: [
    'Tulis H0 dan H1 untuk uji yang membandingkan waktu muat halaman sebelum dan sesudah pemampatan gambar.',
    'Hitung nilai p uji z dua proporsi untuk A: 150 dari 1500 dan B: 180 dari 1500, lalu putuskan di taraf 5 persen.',
    'Hitung nilai p yang sama dengan uji eksak memakai math.comb, lalu bandingkan dengan uji z.',
    'Ulangi simulasi uji A/A dengan mengintip setiap 50 pengunjung, lalu bandingkan persentase kesalahan jenis I-nya dengan intipan setiap 100.',
    'Hitung peluang setidaknya satu hasil signifikan palsu kalau 10 ukuran diuji tanpa koreksi, lalu dengan koreksi Bonferroni.',
    'Pakai rumus daya uji dari program untuk menentukan berapa pengunjung per kelompok yang dibutuhkan supaya kenaikan dari 10 ke 11 persen terdeteksi dengan peluang 80 persen.',
    'Jelaskan kenapa galat baku dihitung dari proporsi gabungan, bukan dari proporsi masing-masing kelompok.',
    'Beri contoh hasil yang signifikan secara statistik tetapi tidak berarti secara praktis, lengkap dengan angkanya.',
    'Sebuah uji dengan 300 pengunjung per kelompok tidak signifikan. Tulis kesimpulan yang benar, dan jelaskan apa yang harus dilakukan berikutnya.',
    'Jelaskan kenapa uji A/A berguna untuk memeriksa sistem uji A/B, dan apa yang kamu curigai kalau 15 persen uji A/A-mu signifikan.'
  ]
});


TOPICS.push({
  id: 'probstat-regresi',
  judul: 'Korelasi & Regresi Linear',
  kategori: 'probstat',
  tag: ['korelasi', 'koefisien r', 'regresi linear', 'kuadrat terkecil', 'r kuadrat', 'kuartet Anscombe', 'ekstrapolasi', 'penyebab bersama'],
  ringkas: 'Menarik garis lurus melewati titik-titik data — dan empat cara garis itu bisa berbohong walaupun angkanya tampak meyakinkan.',

  fungsi: `**Mengukur seberapa kuat dua besaran bergerak bersama, dan meringkas hubungannya dengan satu garis lurus yang bisa dipakai untuk meramal.**

Terpakai di:

- **Perencanaan kapasitas** — berapa milidetik waktu respons bertambah untuk setiap pengguna serentak tambahan
- **Pembelajaran mesin** — regresi linear adalah model paling dasar, dan banyak model lain adalah pengembangannya
- **Analisis data dan penelitian** — mengukur hubungan antara jam belajar dan nilai, harga dan penjualan, ukuran berkas dan waktu unggah
- **Estimasi perangkat lunak** — memperkirakan lama pengerjaan dari ukuran fitur berdasarkan data proyek sebelumnya

Yang paling penting dan paling sering dilanggar: **lihat datanya dulu.** Empat kumpulan data bisa punya rata-rata, ragam, korelasi, dan garis regresi yang **identik**, padahal bentuknya sama sekali berbeda.

Dan dua kesalahan tafsir yang paling mahal: **meramal di luar rentang data**, dan **menganggap korelasi sebagai sebab-akibat**.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung garis kuadrat terkecil dan koefisien korelasi dengan tangan dan dengan kode, menafsirkan r², mengenali pencilan dan hubungan yang tidak lurus dari grafik, dan menolak ekstrapolasi serta kesimpulan sebab-akibat yang tidak didukung data.',
    alat: ['Python 3 dengan modul statistics (Python 3.10 ke atas)', 'Alat gambar grafik apa pun — lembar kerja, matplotlib, atau kertas berpetak'],
    langkah: [
      { judul: 'Gambar diagram pencarnya lebih dulu',
        isi: `Sebelum menghitung apa pun, gambar setiap pasangan (x, y) sebagai titik.

Perhatikan tiga hal: apakah pola titiknya kira-kira lurus, apakah ada titik yang jauh terpisah dari yang lain, dan apakah ada titik yang sendirian menentukan arah.` },
      { judul: 'Hitung tiga jumlahan',
        isi: `Dengan rata-rata x̄ dan ȳ, hitung:

- Sxy = jumlah (x − x̄)(y − ȳ)
- Sxx = jumlah (x − x̄)²
- Syy = jumlah (y − ȳ)²

Semua rumus berikutnya dibangun dari ketiganya.` },
      { judul: 'Hitung garis dan korelasinya',
        isi: `Kemiringan b = Sxy/Sxx. Titik potong a = ȳ − b·x̄. Korelasi r = Sxy/√(Sxx·Syy).

Periksa hasilmu dengan \`statistics.linear_regression\` dan \`statistics.correlation\` — keduanya tersedia sejak Python 3.10.` },
      { judul: 'Tafsirkan kemiringan dalam satuannya',
        isi: `Kemiringan 1,31 bukan cuma angka: "setiap pengguna serentak tambahan menambah sekitar 1,31 ms waktu respons."

Kalau tafsiran dalam satuan itu terdengar tidak masuk akal, periksa lagi datanya.` },
      { judul: 'Tafsirkan r² dengan batasnya',
        isi: `r² adalah bagian keragaman y yang dijelaskan garis — **di rentang data yang dipakai**. r² = 0,91 berarti garisnya meringkas 91 persen keragaman waktu respons antara 10 dan 80 pengguna.

Ia tidak memberi tahu apa pun tentang 110 pengguna.` },
      { judul: 'Uji pengaruh setiap titik',
        isi: `Hapus satu titik — terutama yang terlihat jauh — lalu hitung ulang garis dan r-nya.

Kalau satu titik mengubah hasilnya jauh, kesimpulanmu bergantung pada satu pengamatan, dan itu harus dilaporkan.` },
      { judul: 'Cari penyebab bersama sebelum menyimpulkan sebab',
        isi: `Kalau x dan y berkorelasi, tanyakan: adakah besaran ketiga yang menggerakkan keduanya?

Kalau ada datanya, buang pengaruh besaran ketiga itu dari x dan dari y — ambil sisa regresinya — lalu korelasikan sisanya. Kalau korelasinya hilang, hubungan x dan y lewat besaran ketiga itu.` }
    ],
    cek: [
      'Setiap analisis regresimu diawali diagram pencar',
      'Garis dan r hitunganmu cocok dengan modul statistics',
      'Kamu tidak memakai garis untuk meramal di luar rentang x datanya',
      'Kamu menguji apakah ada satu titik yang sendirian menentukan hasil'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa angka yang sama bisa berasal dari data yang sama sekali berbeda',

  konsep: `Topik peubah acak menyebut **kovarians** sebagai ukuran seberapa dua besaran bergerak bersama. Topik ini memakai kovarians untuk dua hal: mengukur kekuatan hubungan (**korelasi**), dan menarik garis yang meringkasnya (**regresi**).

**Garis kuadrat terkecil**

Data tiruan: pengguna serentak dan waktu respons sebuah layanan.

| Pengguna | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 |
|---|---|---|---|---|---|---|---|---|
| ms | 54,9 | 65,0 | 62,9 | 79,0 | 84,7 | 99,0 | 127,6 | 150,6 |

Garis yang "paling cocok" dipilih dengan satu aturan: jumlah kuadrat jarak tegak setiap titik ke garis harus sekecil mungkin. Dari aturan itu:

b = Sxy/Sxx, a = ȳ − b·x̄

Hasilnya: **waktu = 31,70 + 1,306 × pengguna**. \`statistics.linear_regression\` memberi angka yang sama.

Tafsirannya: setiap pengguna tambahan menambah sekitar 1,31 ms.

**Korelasi dan r²**

r = Sxy/√(Sxx·Syy), selalu di antara −1 dan 1. Mendekati 1: naik bersama hampir lurus. Mendekati −1: yang satu naik, yang lain turun, hampir lurus. Mendekati 0: tidak ada hubungan **lurus** — yang tidak sama dengan tidak ada hubungan sama sekali.

Di sini r = 0,9518 dan **r² = 0,9059**: garis ini menjelaskan sekitar 91 persen keragaman waktu respons — **di rentang 10 sampai 80 pengguna**.

**Masalah pertama: ekstrapolasi**

Data ini dibangkitkan dari sistem yang waktu responsnya melonjak saat mendekati 120 pengguna — perilaku yang umum di peladen yang mendekati jenuh. Garisnya tidak tahu itu:

| Pengguna | Ramalan garis | Perilaku sebenarnya |
|---|---|---|
| 60 | 110 ms | 100 ms |
| 90 | 149 ms | 200 ms |
| 100 | 162 ms | 300 ms |
| 110 | 175 ms | **600 ms** |

Di dalam rentang data, garisnya meleset sekitar 10 ms. Di 110 pengguna, ia meramal 175 ms — padahal sistemnya sudah 600 ms. Tim yang merencanakan kapasitas dari garis ini akan terkejut tepat saat lalu lintasnya paling tinggi.

r² yang tinggi tidak memberi izin untuk meramal di luar data. Ia cuma mengukur kecocokan **di tempat yang sudah diamati**.

**Masalah kedua: angka ringkasan menyembunyikan bentuk**

Tahun 1973, statistikawan F. J. Anscombe menyusun empat kumpulan data kecil untuk menunjukkan satu hal:

| Set | Rata x | Rata y | Ragam x | Ragam y | r | Garis |
|---|---|---|---|---|---|---|
| I | 9,00 | 7,50 | 11,00 | 4,13 | 0,816 | 3,00 + 0,500x |
| II | 9,00 | 7,50 | 11,00 | 4,13 | 0,816 | 3,00 + 0,500x |
| III | 9,00 | 7,50 | 11,00 | 4,12 | 0,816 | 3,00 + 0,500x |
| IV | 9,00 | 7,50 | 11,00 | 4,12 | 0,817 | 3,00 + 0,500x |

Empat set, angka yang hampir identik sampai dua digit. Tetapi diagram pencarnya — yang digambar program dengan karakter teks — menunjukkan empat cerita berbeda:

- **I**: kira-kira lurus dengan derau. Satu-satunya set yang cocok untuk garis ini.
- **II**: melengkung mulus. Hubungannya kuat, tetapi bukan lurus — garis lurus adalah model yang salah.
- **III**: lurus sempurna, kecuali **satu pencilan** yang menarik garisnya. Tanpa titik itu, r = 1,00000.
- **IV**: sepuluh titik di x yang sama, dan **satu titik** di x = 19. Titik tunggal itu yang seluruhnya menentukan kemiringan. Tanpa dia, x tidak bervariasi sama sekali dan garisnya tidak bisa dihitung.

Pelajarannya sederhana dan terus-menerus dilanggar: **gambar datanya sebelum menghitung.** r = 0,816 tidak memberi tahu set mana yang sedang kamu hadapi.

**Masalah ketiga: korelasi bukan sebab-akibat**

200 hari tiruan: suhu harian menaikkan penjualan es krim, dan suhu harian juga menaikkan pemakaian listrik untuk pendingin ruangan.

| | r |
|---|---|
| es krim dan listrik | 0,904 |
| es krim dan listrik, setelah pengaruh suhu dibuang | 0,067 |

Korelasi 0,9 antara es krim dan listrik. Tetapi es tidak menyalakan AC, dan AC tidak menjual es. Keduanya mengikuti **penyebab bersama**: suhu.

Program membuang pengaruh suhu dengan meregresikan es krim pada suhu dan listrik pada suhu, lalu mengkorelasikan **sisanya** — bagian dari masing-masing yang tidak bisa dijelaskan suhu. Korelasi sisanya hampir nol.

Di data sungguhan, penyebab bersama sering tidak tercatat — dan karena itu tidak bisa dibuang. Satu-satunya cara yang benar-benar membuktikan sebab-akibat adalah **percobaan terkendali** dengan pengacakan, seperti uji A/B di topik uji hipotesis: kalau kelompoknya diacak, penyebab bersama tersebar merata di kedua kelompok dan tidak bisa menjelaskan perbedaannya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\n\ndef regresi(xs, ys):\n    n = len(xs)\n    mx, my = sum(xs) / n, sum(ys) / n\n    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))\n    sxx = sum((x - mx) ** 2 for x in xs)\n    syy = sum((y - my) ** 2 for y in ys)\n    b = sxy / sxx                  # kemiringan\n    a = my - b * mx                # garis melewati (rata x, rata y)\n    r = sxy / math.sqrt(sxx * syy) # korelasi\n    return a, b, r\n\n# waktu = 31.70 + 1.306 x pengguna,  r = 0.9518",
      penjelasan: `Tiga jumlahan, lalu tiga pembagian. Seluruh regresi linear sederhana ada di sini.

**Sxy: kovarians yang belum dibagi.**

Untuk setiap titik, \`(x − x̄)(y − ȳ)\` positif kalau titiknya berada di kanan-atas atau kiri-bawah pusat data — x dan y sama-sama di atas rata-rata, atau sama-sama di bawah. Negatif kalau di kiri-atas atau kanan-bawah.

Menjumlahkannya mengukur apakah titik-titik cenderung berada di dua kuadran searah (Sxy besar positif), dua kuadran berlawanan (besar negatif), atau tersebar merata (dekat nol). Dibagi n − 1, itulah kovarians dari topik peubah acak.

**Kenapa kemiringannya Sxy/Sxx.**

Garis kuadrat terkecil meminimalkan jumlah kuadrat jarak tegak \`(y − a − bx)²\`. Turunkan terhadap a dan b, samakan dengan nol — persis teknik nilai ekstrem di topik turunan Matematika Dasar — dan hasilnya b = Sxy/Sxx serta a = ȳ − b·x̄.

Baris kedua punya arti yang berguna diingat: garis kuadrat terkecil **selalu melewati titik pusat data** (x̄, ȳ).

**Kenapa r dibagi √(Sxx·Syy).**

Sxy bergantung pada satuan. Waktu dalam milidetik memberi Sxy seribu kali lebih besar daripada dalam detik, padahal hubungannya sama. Membagi dengan √(Sxx·Syy) menghapus satuan itu, dan hasilnya selalu di antara −1 dan 1 — bisa dibandingkan antar-data yang satuannya berbeda.

Hubungan antara kemiringan dan korelasi: b = r × (simpangan baku y / simpangan baku x). Korelasi adalah kemiringan setelah kedua sumbu diubah ke satuan simpangan baku.

**Kenapa kuadrat, bukan jarak biasa.**

Kuadrat membuat rumusnya bisa diselesaikan dengan turunan dan memberi jawaban tunggal yang tepat. Harganya: titik yang jauh dari garis dihukum **sangat** berat — jarak dua kali lebih jauh dihitung empat kali lebih besar.

Itulah sebabnya satu pencilan di set III Anscombe bisa menarik garis sejauh itu, dan menurunkan r dari hampir 1 menjadi 0,816. Kuadrat terkecil sangat peka terhadap pencilan — sifat yang sama dengan rata-rata di topik statistika deskriptif, karena garis ini sebenarnya adalah "rata-rata" yang berbentuk garis.

**Satu kondisi yang harus dijaga: Sxx tidak boleh nol.**

Kalau semua x sama, Sxx = 0 dan kemiringannya tidak terdefinisi — tidak ada informasi tentang bagaimana y berubah saat x berubah, karena x tidak pernah berubah. Set IV Anscombe nyaris begitu: sepuluh dari sebelas titik di x = 8, dan satu-satunya informasi tentang kemiringan datang dari satu titik di x = 19.`
    },
    {
      bahasa: 'python',
      kode: "# es dan listrik sama-sama mengikuti suhu\nr(es, listrik)                         # 0.904\n\n# buang pengaruh suhu dari keduanya\na1, b1, _ = regresi(suhu, es)\na2, b2, _ = regresi(suhu, listrik)\nsisa_es = [e - (a1 + b1 * t) for e, t in zip(es, suhu)]\nsisa_li = [l - (a2 + b2 * t) for l, t in zip(listrik, suhu)]\n\nr(sisa_es, sisa_li)                    # 0.067",
      penjelasan: `Empat baris yang memisahkan "bergerak bersama" dari "bergerak bersama **karena** sesuatu yang lain".

**Apa itu sisa regresi.**

Setelah es krim diregresikan pada suhu, garis \`a1 + b1 × suhu\` adalah bagian penjualan es yang **bisa dijelaskan** oleh suhu. Sisanya — penjualan sebenarnya dikurangi ramalan garis — adalah bagian yang **tidak** bisa dijelaskan suhu: hari libur, promosi, kebetulan.

Hal yang sama dilakukan untuk listrik. Sisa listrik adalah bagian pemakaian listrik yang tidak bisa dijelaskan suhu.

**Mengkorelasikan sisa.**

Kalau es dan listrik berhubungan **langsung** — misalnya es krim disimpan di lemari pendingin yang ikut menaikkan tagihan listrik — sisa keduanya tetap akan berkorelasi, karena hubungan itu tidak lewat suhu.

Kalau hubungannya cuma lewat suhu, sisa keduanya tidak punya alasan untuk bergerak bersama, dan korelasinya mendekati nol. Program menunjukkan yang kedua: dari 0,904 menjadi 0,067.

Cara ini disebut **korelasi parsial**, dan gagasannya dipakai luas: regresi berganda, yang memakai beberapa x sekaligus, pada dasarnya melakukan pembuangan pengaruh ini untuk setiap x terhadap yang lain.

**Batas cara ini.**

Ia cuma bisa membuang pengaruh besaran yang **tercatat**. Kalau penyebab bersamanya tidak diukur — misalnya musim liburan yang menaikkan penjualan es dan jumlah orang di rumah — korelasinya tetap terlihat, dan tidak ada perhitungan yang bisa membedakannya dari hubungan langsung.

Karena itu analisis data pengamatan, seberapa pun canggih, tidak pernah benar-benar membuktikan sebab-akibat. Ia bisa **menyingkirkan** penjelasan yang tercatat, tetapi tidak yang tidak tercatat.

**Yang bisa membuktikan: pengacakan.**

Kalau kamu yang menentukan secara acak hari mana es krimnya didiskon, lalu melihat apakah pemakaian listrik ikut naik di hari-hari itu, penyebab bersama apa pun — tercatat atau tidak — tersebar merata di hari diskon dan hari biasa. Perbedaan yang muncul hanya bisa disebabkan oleh diskon itu sendiri.

Itulah alasan uji A/B — percobaan dengan pengacakan — dipakai untuk keputusan penting di perusahaan teknologi, bukan analisis korelasi dari data yang sudah ada.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Korelasi dan regresi linear
# ============================================
import math
import random
import statistics as st

def regresi(xs, ys):
    """Kuadrat terkecil: kembalikan (a, b, r) untuk y = a + b x."""
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    sxx = sum((x - mx) ** 2 for x in xs)
    syy = sum((y - my) ** 2 for y in ys)
    b = sxy / sxx
    a = my - b * mx
    r = sxy / math.sqrt(sxx * syy)
    return a, b, r

# --------------------------------------------
# 1. Garis kuadrat terkecil
# --------------------------------------------
print("--- pengguna serentak vs waktu respons (data tiruan) ---")
random.seed(3)
def waktu_asli(x):                       # perilaku sistem yang 'sebenarnya'
    return 50 / (1 - x / 120)            # melonjak saat mendekati 120
xs = list(range(10, 81, 10))
ys = [round(waktu_asli(x) + random.gauss(0, 4), 1) for x in xs]
print("  pengguna : " + "  ".join(format(x, ">5") for x in xs))
print("  ms       : " + "  ".join(format(y, ">5.1f") for y in ys))
a, b, r = regresi(xs, ys)
print()
print("  garis  : waktu = " + format(a, ".2f") + " + " + format(b, ".3f") + " x pengguna")
print("  r = " + format(r, ".4f") + ",  r^2 = " + format(r * r, ".4f"))
ref = st.linear_regression(xs, ys)
print("  statistics.linear_regression: " + format(ref.intercept, ".2f") + " + "
      + format(ref.slope, ".3f") + " x   (sama)")
print()
print("  Setiap pengguna tambahan menambah sekitar " + format(b, ".2f") + " ms.")
print("  r^2 = " + format(r * r, ".2f") + ": garis ini menjelaskan " + format(r * r, ".0%")
      + " keragaman waktu respons")
print("  DI RENTANG DATA (10 sampai 80 pengguna).")

# --------------------------------------------
# 2. Ekstrapolasi: di luar rentang data
# --------------------------------------------
print("\n--- meramal di luar rentang data ---")
print("  pengguna   ramalan garis   perilaku sebenarnya")
for x in [60, 90, 100, 110]:
    print("  " + format(x, "<9") + format(a + b * x, "10.0f") + " ms"
          + format(waktu_asli(x), "15.0f") + " ms")
print()
print("  Di dalam rentang data (60), garisnya meleset sekitar 10 ms.")
print("  Di luar rentang, sistemnya mendekati jenuh dan waktu respons")
print("  melonjak -- sesuatu yang tidak terlihat di data 10 sampai 80.")
print("  r^2 yang tinggi tidak memberi izin untuk meramal di luar data.")

# --------------------------------------------
# 3. Kuartet Anscombe: statistik sama, bentuk berbeda
# --------------------------------------------
X = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5]
KUARTET = {
    "I":   (X, [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]),
    "II":  (X, [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]),
    "III": (X, [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73]),
    "IV":  ([8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8],
            [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89]),
}
print("\n--- kuartet Anscombe (1973) ---")
print("  set   rata x  rata y  ragam x  ragam y     r    garis")
for nama, (xs, ys) in KUARTET.items():
    a, b, r = regresi(xs, ys)
    print("  " + format(nama, "<5") + format(st.mean(xs), "7.2f") + format(st.mean(ys), "8.2f")
          + format(st.variance(xs), "9.2f") + format(st.variance(ys), "9.2f")
          + format(r, "7.3f") + "   " + format(a, ".2f") + " + " + format(b, ".3f") + "x")

def gambar(xs, ys, lebar=28, tinggi=9):
    grid = [[" "] * lebar for _ in range(tinggi)]
    for x, y in zip(xs, ys):
        c = round((x - 3) / (20 - 3) * (lebar - 1))
        b = round((y - 3) / (13 - 3) * (tinggi - 1))
        grid[tinggi - 1 - b][c] = "o"
    return ["|" + "".join(baris) for baris in grid] + ["+" + "-" * lebar]

print()
nama = list(KUARTET)
for kiri, kanan in [(nama[0], nama[1]), (nama[2], nama[3])]:
    gk, gn = gambar(*KUARTET[kiri]), gambar(*KUARTET[kanan])
    print("  " + format("set " + kiri, "<31") + "     set " + kanan)
    for bk, bn in zip(gk, gn):
        print(("  " + bk + "     " + bn).rstrip())
    print()
print("  Empat set dengan rata-rata, ragam, r, dan garis yang hampir")
print("  identik: I kira-kira lurus, II melengkung, III lurus sempurna")
print("  kecuali satu pencilan, IV cuma ditentukan satu titik.")
print("  Angka ringkasan tidak menggantikan melihat datanya.")

xs3, ys3 = KUARTET["III"]
tanpa = [(x, y) for x, y in zip(xs3, ys3) if y != 12.74]
_, _, r3 = regresi([p[0] for p in tanpa], [p[1] for p in tanpa])
print("\n  set III tanpa titik (13; 12,74): r = " + format(r3, ".5f"))
print("  Satu pencilan menurunkan r dari hampir 1 menjadi 0,816.")

# --------------------------------------------
# 4. Korelasi bukan sebab-akibat
# --------------------------------------------
print("\n--- korelasi lewat penyebab bersama ---")
random.seed(11)
suhu = [random.uniform(24, 36) for _ in range(200)]
es = [12 * t - 250 + random.gauss(0, 15) for t in suhu]       # porsi es
listrik = [8 * t - 150 + random.gauss(0, 10) for t in suhu]   # kWh pendingin
_, _, r_langsung = regresi(es, listrik)
# buang pengaruh suhu dari keduanya, lalu korelasikan sisanya
a1, b1, _ = regresi(suhu, es)
a2, b2, _ = regresi(suhu, listrik)
sisa_es = [e - (a1 + b1 * t) for e, t in zip(es, suhu)]
sisa_li = [l - (a2 + b2 * t) for l, t in zip(listrik, suhu)]
_, _, r_sisa = regresi(sisa_es, sisa_li)
print("  200 hari tiruan: suhu menaikkan penjualan es DAN listrik AC")
print("  r(es, listrik)                     = " + format(r_langsung, ".3f"))
print("  r(es, listrik) setelah suhu dibuang = " + format(r_sisa, ".3f"))
print()
print("  Es tidak menyalakan AC, dan AC tidak menjual es. Keduanya")
print("  mengikuti suhu. Begitu pengaruh suhu dibuang, hubungannya")
print("  hilang.")` },
  output: `--- pengguna serentak vs waktu respons (data tiruan) ---
  pengguna :    10     20     30     40     50     60     70     80
  ms       :  54.9   65.0   62.9   79.0   84.7   99.0  127.6  150.6

  garis  : waktu = 31.70 + 1.306 x pengguna
  r = 0.9518,  r^2 = 0.9059
  statistics.linear_regression: 31.70 + 1.306 x   (sama)

  Setiap pengguna tambahan menambah sekitar 1.31 ms.
  r^2 = 0.91: garis ini menjelaskan 91% keragaman waktu respons
  DI RENTANG DATA (10 sampai 80 pengguna).

--- meramal di luar rentang data ---
  pengguna   ramalan garis   perilaku sebenarnya
  60              110 ms            100 ms
  90              149 ms            200 ms
  100             162 ms            300 ms
  110             175 ms            600 ms

  Di dalam rentang data (60), garisnya meleset sekitar 10 ms.
  Di luar rentang, sistemnya mendekati jenuh dan waktu respons
  melonjak -- sesuatu yang tidak terlihat di data 10 sampai 80.
  r^2 yang tinggi tidak memberi izin untuk meramal di luar data.

--- kuartet Anscombe (1973) ---
  set   rata x  rata y  ragam x  ragam y     r    garis
  I       9.00    7.50    11.00     4.13  0.816   3.00 + 0.500x
  II      9.00    7.50    11.00     4.13  0.816   3.00 + 0.500x
  III     9.00    7.50    11.00     4.12  0.816   3.00 + 0.500x
  IV      9.00    7.50    11.00     4.12  0.817   3.00 + 0.500x

  set I                               set II
  |                                 |
  |                                 |
  |              o  o               |
  |          o                      |          oo oo o
  |           o o  o                |        o        o
  |     o  o                        |     oo
  |   o                             |
  |  o   o                          |   o
  |                                 |  o
  +----------------------------     +----------------------------

  set III                             set IV
  |                o                |                         o
  |                                 |
  |                                 |
  |                 o               |        o
  |           o oo                  |        o
  |      o o o                      |        o
  |  oo o                           |        o
  |                                 |
  |                                 |
  +----------------------------     +----------------------------

  Empat set dengan rata-rata, ragam, r, dan garis yang hampir
  identik: I kira-kira lurus, II melengkung, III lurus sempurna
  kecuali satu pencilan, IV cuma ditentukan satu titik.
  Angka ringkasan tidak menggantikan melihat datanya.

  set III tanpa titik (13; 12,74): r = 1.00000
  Satu pencilan menurunkan r dari hampir 1 menjadi 0,816.

--- korelasi lewat penyebab bersama ---
  200 hari tiruan: suhu menaikkan penjualan es DAN listrik AC
  r(es, listrik)                     = 0.904
  r(es, listrik) setelah suhu dibuang = 0.067

  Es tidak menyalakan AC, dan AC tidak menjual es. Keduanya
  mengikuti suhu. Begitu pengaruh suhu dibuang, hubungannya
  hilang.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Garis dan korelasi dari n titik', waktu: 'O(n)', memori: 'O(1) kalau dijumlah berjalan' },
      { operasi: 'Uji pengaruh setiap titik (hapus satu-satu)', waktu: 'O(n²) cara naif', memori: 'O(n) dengan memperbarui jumlahan' },
      { operasi: 'Korelasi parsial dengan satu penyebab bersama', waktu: 'O(n)', memori: 'dua regresi, lalu satu korelasi' },
      { operasi: 'Regresi berganda dengan p peubah x', waktu: 'O(n p² + p³)', memori: 'O(p²) untuk sistem persamaannya' }
    ],
    intuisi: `Regresi linear sederhana cuma butuh satu kali lewat data: tiga jumlahan dan dua rata-rata. Karena itu ia bisa dihitung untuk jutaan titik tanpa masalah — bahkan secara berjalan, saat data terus datang.

Menguji pengaruh setiap titik secara naif butuh n kali regresi. Tetapi karena regresi dibangun dari jumlahan, menghapus satu titik cukup dengan mengurangkan sumbangannya dari setiap jumlahan — O(1) per titik, O(n) total.

Baris terakhir adalah pintu ke topik lanjutan: dengan banyak peubah x, rumus Sxy/Sxx menjadi sistem persamaan linear — bahan topik Aljabar Linear. Biayanya tumbuh cepat dengan banyaknya peubah, tetapi tetap lurus dengan banyaknya data.`
  },

  kesalahanUmum: [
    {
      salah: 'Menghitung korelasi dan regresi tanpa menggambar diagram pencar.',
      kenapa: 'Kuartet Anscombe menunjukkan empat set dengan rata-rata, ragam, r, dan garis yang hampir identik, padahal yang satu melengkung, yang satu punya pencilan, dan yang satu ditentukan satu titik.',
      benar: 'Gambar diagram pencar sebelum menghitung apa pun, dan pakai angkanya hanya kalau polanya memang kira-kira lurus.'
    },
    {
      salah: 'Memakai garis regresi untuk meramal di luar rentang x datanya.',
      kenapa: 'Garis cuma meringkas hubungan di tempat yang sudah diamati. Di luar itu, perilaku sistem bisa berubah total — seperti waktu respons yang melonjak saat peladen mendekati jenuh.',
      benar: 'Batasi ramalan pada rentang data, dan kumpulkan data baru sebelum menyimpulkan apa pun tentang wilayah di luarnya.'
    },
    {
      salah: 'Menganggap korelasi tinggi sebagai bukti sebab-akibat.',
      kenapa: 'Dua besaran bisa berkorelasi kuat karena sama-sama mengikuti penyebab bersama. Penjualan es dan pemakaian listrik berkorelasi 0,9 karena keduanya mengikuti suhu.',
      benar: 'Cari penyebab bersama yang mungkin, buang pengaruhnya bila tercatat, dan pakai percobaan dengan pengacakan untuk membuktikan sebab.'
    },
    {
      salah: 'Menyimpulkan tidak ada hubungan karena r mendekati nol.',
      kenapa: 'r hanya mengukur hubungan lurus. Hubungan yang kuat tetapi melengkung, misalnya berbentuk U, bisa memberi r dekat nol.',
      benar: 'Gambar datanya, dan baca r mendekati nol sebagai tidak ada hubungan lurus, bukan tidak ada hubungan.'
    },
    {
      salah: 'Membiarkan satu pencilan menentukan garis tanpa melaporkannya.',
      kenapa: 'Kuadrat terkecil menghukum jarak besar sangat berat, sehingga satu titik jauh bisa menarik garis dan mengubah r drastis. Pada set III Anscombe, satu titik menurunkan r dari hampir 1 menjadi 0,816.',
      benar: 'Hitung ulang tanpa titik yang mencurigakan, periksa apakah titik itu salah catat, dan laporkan kedua hasilnya kalau berbeda jauh.'
    },
    {
      salah: 'Membaca r² = 0,91 sebagai ramalannya benar 91 persen.',
      kenapa: 'r² adalah bagian keragaman y yang dijelaskan garis di data yang dipakai. Ia tidak mengukur ketepatan ramalan untuk titik baru, apalagi di luar rentang data.',
      benar: 'Tafsirkan r² sebagai ukuran kecocokan di data yang ada, dan ukur ketepatan ramalan dengan data yang tidak dipakai untuk membuat garis.'
    }
  ],

  analogi: `Bayangkan kamu mencatat **berapa lama perjalanan ke kampus** setiap hari, bersama jam keberangkatanmu.

**Garis regresi.** Setelah sebulan, kamu melihat pola: berangkat jam 6.30 butuh 20 menit, jam 7.00 butuh 30 menit, jam 7.30 butuh 40 menit. Garisnya: setiap setengah jam lebih siang, perjalanan bertambah 10 menit. Itu kemiringan, dalam satuan yang bisa kamu pakai.

**Ekstrapolasi.** Temanmu bertanya, "kalau berangkat jam 9.00, berapa lama?" Garismu bilang 70 menit. Tetapi kamu tidak pernah berangkat jam 9 — dan ternyata jam 9 jalanan sudah sepi lagi, perjalanannya cuma 20 menit. Atau sebaliknya: jam 7.45 ada pasar tumpah dan perjalanan tiba-tiba jadi 90 menit. Garismu tidak tahu apa pun tentang jam yang tidak pernah kamu catat.

**Anscombe.** Kamu membandingkan catatanmu dengan tiga teman. Anehnya, rata-rata, sebaran, dan garis kalian berempat hampir sama. Lalu kalian menggambar catatan masing-masing:

- catatanmu kira-kira lurus
- catatan teman pertama melengkung — lambat di tengah pagi, cepat di awal dan akhir
- catatan teman kedua lurus sempurna, kecuali satu hari ban bocor yang butuh dua jam
- teman ketiga selalu berangkat jam 7.00, kecuali satu kali jam 9 — dan satu hari itu yang seluruhnya menentukan "garisnya"

Angka ringkasan yang sama, empat cerita yang berbeda. Hanya gambar yang membedakannya.

**Penyebab bersama.** Kamu juga melihat bahwa hari-hari perjalananmu lama adalah hari-hari kamu minum kopi lebih banyak. Apakah kopi membuat jalan macet? Tentu tidak. Hari hujan membuat jalan macet **dan** membuatmu ingin kopi hangat. Hujan adalah penyebab bersamanya.

Satu-satunya cara memastikan kopi tidak berpengaruh pada kemacetan: minum kopi di hari-hari yang dipilih dengan melempar koin, bukan berdasarkan cuaca — lalu lihat apakah hari kopi lebih macet. Pasti tidak. Itulah percobaan dengan pengacakan.`,

  latihan: [
    'Hitung Sxy, Sxx, Syy, garis regresi, dan r dengan tangan untuk data (1, 2), (2, 4), (3, 5), (4, 4), (5, 6), lalu periksa dengan modul statistics.',
    'Tunjukkan bahwa garis kuadrat terkecil dari latihan nomor 1 melewati titik (x̄, ȳ).',
    'Ubah satuan y di latihan nomor 1 menjadi seribu kali lebih besar, lalu tunjukkan bahwa kemiringannya berubah tetapi r tidak.',
    'Buat data dengan hubungan y = (x − 5)² untuk x dari 0 sampai 10, hitung r-nya, lalu jelaskan kenapa r mendekati nol padahal hubungannya sempurna.',
    'Gambar keempat set Anscombe dengan alat grafik pilihanmu, lalu tulis satu kalimat tentang bentuk masing-masing.',
    'Hapus setiap titik set III Anscombe satu per satu dan hitung ulang r, lalu tentukan titik mana yang paling berpengaruh.',
    'Dengan data waktu respons di topik ini, jelaskan dengan angka kenapa garis tidak boleh dipakai untuk merencanakan kapasitas 110 pengguna.',
    'Buat data tiruan dengan penyebab bersama sendiri, misalnya jam belajar yang menaikkan nilai UTS dan nilai UAS, lalu tunjukkan korelasi parsialnya.',
    'Beri tiga contoh korelasi dari kehidupan kampus yang kemungkinan disebabkan penyebab bersama, dan sebutkan penyebab bersamanya.',
    'Rancang percobaan dengan pengacakan untuk menguji apakah fitur pengingat tugas di aplikasi kampus benar-benar menaikkan jumlah tugas yang dikumpulkan tepat waktu.'
  ]
});
