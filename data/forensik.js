/* ============================================================
   forensik.js — materi Komputer Forensik (Semester 4)

   Disusun dari berkas projek sendiri di
   "Semester Empat/Komputer Forensik/Project": berkas gambar
   hasil percobaan steganografi, skrip secret.py & cycle.py,
   serta salinan steghide.

   CATATAN KEJUJURAN — apa yang benar-benar diperiksa:
   Seluruh berkas gambar di folder itu disisir dengan skrip
   sendiri. Hasilnya:
     - 'ryan gosling_secret.jpg' dan 'max caulfield icon_secret.jpg'
       memuat TEKS BIASA yang disisipkan SETELAH penanda akhir
       JPEG (FFD9) -- masing-masing 78 dan 229 byte. Ini terbukti,
       dan dipakai sebagai contoh nyata di topik kedua.
     - Berkas '*_stego.png' dan '*_stegsolve.png' TIDAK memuat
       muatan LSB sederhana yang bisa didekode; bidang LSB-nya
       berupa derau, sama seperti gambar aslinya. Kemungkinan
       besar itu hasil ekspor tampilan StegSolve, bukan pembawa
       pesan. Jadi teknik LSB di sini TIDAK diklaim berasal dari
       berkas itu, melainkan dibangun dari nol supaya bisa
       dijalankan dan dibuktikan sendiri.
   ============================================================ */

TOPICS.push({
  id: 'forensik-bukti-digital',
  judul: 'Bukti Digital & Integritasnya',
  kategori: 'forensik',
  tag: ['forensik', 'chain of custody', 'hash', 'SHA-256', 'volatilitas', 'magic number'],
  ringkas: 'Kenapa satu bit yang berubah bisa membatalkan bukti — dan bagaimana hash membuktikannya.',

  fungsi: `**Menangani bukti digital supaya tetap bisa dipercaya.**

Terpakai di:

- **Investigasi** — kasus kebocoran data, penyalahgunaan sistem
- **Audit** — membuktikan berkas tidak berubah
- **Tugas akhir** bertema forensik
- **Praktik sehari-hari** — memeriksa keutuhan unduhan dan cadangan

Yang paling langsung terpakai di luar konteks hukum: **memverifikasi berkas dengan hash**.

Setiap kali kamu mengunduh perangkat lunak dan situsnya menyediakan nilai SHA-256, memeriksanya adalah penerapan langsung dari topik ini.

Dan satu hal yang sering disalahpahami: **hash membuktikan tidak berubah, bukan membuktikan asli.** Untuk yang kedua, dibutuhkan chain of custody.`,

  praktik: {
    tujuan: `Kamu bisa mengambil dan memverifikasi bukti digital tanpa mengubahnya, dan mencatatnya dengan benar.`,
    alat: [
      'Terminal',
      'Python dengan `hashlib`',
      'Berkas untuk latihan'
    ],
    langkah: [
      { judul: 'Hitung hash berkas dari terminal',
        isi: `- Windows: \`certutil -hashfile berkas.zip SHA256\`
- Linux atau macOS: \`sha256sum berkas.zip\`
- Python: \`hashlib.sha256(open(f,'rb').read()).hexdigest()\`

Untuk berkas besar, baca bertahap agar tidak memenuhi memori.` },
      { judul: 'Verifikasi satu unduhan sungguhan',
        isi: `Unduh perangkat lunak yang situsnya menyediakan nilai SHA-256, lalu bandingkan dengan hasil hitunganmu.

Kalau cocok, berkasmu utuh. Kalau tidak, jangan dijalankan.

Lakukan ini sekali; setelah itu ia jadi kebiasaan yang murah.` },
      { judul: 'Buktikan efek longsor',
        isi: `Ubah **satu karakter** di sebuah berkas teks, lalu hitung hash-nya lagi.

Hash-nya berubah **total** — sekitar separuh bitnya membalik.

Hitung berapa karakter hex yang sama di posisi sama antara kedua hash. Angkanya akan sangat kecil.` },
      { judul: 'Pakai SHA-256, bukan MD5',
        isi: `MD5 sudah bisa dibuat bertabrakan dengan sengaja sejak 2004, SHA-1 sejak 2017.

Untuk memeriksa unduhan rusak, MD5 masih memadai. Untuk bukti, **tidak**.

Catat **dua** algoritma sekaligus untuk bukti penting — memalsukan tabrakan pada keduanya jauh lebih sulit.` },
      { judul: 'Buat salinan tanpa mengubah aslinya',
        isi: `Untuk latihan, salin berkas atau citra disk lalu bandingkan hash aslinya dan salinannya.

Kalau sama, salinanmu sah. Semua analisis dilakukan pada **salinan**, tidak pernah pada aslinya.

Di dunia nyata, ini menuntut write blocker — perangkat yang membuat media hanya bisa dibaca.` },
      { judul: 'Periksa jenis berkas dari isinya',
        isi: `Jangan percaya ekstensi. Periksa magic number:

- Linux: perintah \`file\`
- Python: baca beberapa byte pertama dan cocokkan

Buat berkas ZIP lalu ganti namanya menjadi \`.jpg\`, dan buktikan pemeriksamu tetap mengenalinya sebagai ZIP.` },
      { judul: 'Buat catatan chain of custody',
        isi: `Buat tabel: apa yang diambil, kapan, oleh siapa, hash-nya berapa, disimpan di mana, dan siapa saja yang mengaksesnya.

Catat juga **urutan volatilitas**: RAM diambil sebelum disk, karena ia hilang begitu daya putus.

Tanpa catatan ini, bukti sekuat apa pun bisa ditolak.` }
    ],
    cek: [
      'Hash unduhanmu cocok dengan yang diumumkan situs resminya',
      'Mengubah satu karakter membuat hash berubah hampir seluruhnya',
      'Pemeriksamu mengenali ZIP yang ekstensinya diganti jadi jpg'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa hash-nya berubah total',

  konsep: `
**Komputer forensik** adalah penerapan metode ilmiah untuk **mengumpulkan, menjaga, menganalisis, dan menyajikan** bukti digital sehingga **bisa diterima di pengadilan**.

Anak kalimat terakhir itu yang mengubah segalanya. Tanpa syarat itu, ini cuma "mengutak-atik berkas". Dengan syarat itu, setiap langkah harus **bisa dipertanggungjawabkan dan diulang orang lain**.

**Empat prinsip yang harus dipegang**

- **Jangan mengubah bukti asli.** Analisis dilakukan pada **salinan**, bukan barang aslinya.
- **Semua tindakan tercatat.** Siapa, kapan, apa, dan kenapa.
- **Penyidik harus kompeten** dan bisa menjelaskan apa yang ia lakukan.
- **Prosesnya bisa diulang.** Orang lain dengan alat serupa harus mendapat hasil sama.

**Chain of custody**

Catatan **tak terputus** tentang siapa memegang bukti, kapan, dan apa yang dilakukan padanya — sejak disita sampai disajikan di pengadilan.

Satu **celah** saja dalam rantai ini bisa membuat seluruh bukti **ditolak**. Bukan karena pasti sudah diubah, melainkan karena **tidak bisa dibuktikan tidak diubah**.

Perhatikan bedanya: yang dituntut bukan *"buktikan ada yang mengubah"*, melainkan **"buktikan tidak ada yang bisa mengubah"**. Beban pembuktiannya terbalik dari dugaan orang.

**Hash sebagai sidik jari berkas**

Fungsi hash mengubah berkas berukuran berapa pun menjadi **deretan tetap** — SHA-256 selalu 256 bit, atau 64 karakter heksadesimal.

Sifat yang membuatnya berguna sebagai bukti:

- **Deterministik** — berkas sama selalu memberi hash sama
- **Efek longsor** (*avalanche*) — ubah **satu bit** saja, hash berubah **total**, kira-kira separuh bitnya membalik
- **Satu arah** — mustahil menyusun ulang berkas dari hash-nya
- **Tahan tumbukan** — sangat sulit mencari dua berkas berbeda berhash sama

Alurnya di lapangan: hash dihitung **saat penyitaan**, dicatat di berita acara, lalu dihitung **ulang** kapan pun bukti dipakai. Kalau cocok, berkas terbukti utuh sejak disita.

**MD5 dan SHA-1 sudah patah**

Keduanya masih sering dipakai, tetapi **tumbukan sudah bisa dibuat dengan sengaja**:

- **MD5** — tumbukan praktis sejak 2004
- **SHA-1** — tumbukan nyata dibuktikan 2017 lewat serangan bernama *SHAttered*

Artinya seseorang bisa menyiapkan **dua berkas berbeda dengan hash sama**. Untuk memeriksa unduhan rusak MD5 masih memadai; untuk **bukti hukum** ia tidak lagi cukup.

Gunakan **SHA-256** ke atas. Banyak lembaga mencatat **dua hash sekaligus**, karena memalsukan tumbukan pada dua algoritma berbeda jauh lebih sulit.

**Write blocker**

Perangkat yang membuat media bukti **hanya bisa dibaca**. Diperlukan karena **sekadar mencolokkan** disk ke komputer sudah bisa mengubahnya — sistem operasi menulis waktu akses, membuat indeks, atau memasang berkas sistem.

Dan begitu satu byte berubah, **hash-nya tidak cocok lagi**, dan bukti itu **cacat selamanya**.

**Urutan volatilitas**

Bukti yang **paling cepat hilang harus diambil lebih dulu**:

- **Register dan cache** — hilang seketika
- **RAM** — hilang saat daya putus, dan di sini letak kunci enkripsi, sandi, serta proses berjalan
- **Keadaan jaringan** — sambungan aktif, tabel rute
- **Berkas sementara** dan ruang swap
- **Disk** — bertahan
- **Cadangan dan arsip** — paling awet

Inilah sumber kesalahan besar yang lazim: **mematikan komputer yang masih menyala**. Tindakan itu terasa aman, padahal ia **memusnahkan seluruh isi RAM** — termasuk kunci enkripsi yang mungkin satu-satunya jalan membuka disknya.

**Magic number lebih jujur daripada ekstensi**

Ekstensi berkas cuma **bagian dari nama**, dan siapa pun bisa mengubahnya. Yang menentukan jenis berkas sebenarnya adalah **beberapa byte pertama** isinya, disebut *magic number*:

- \`FF D8 FF\` — JPEG
- \`89 50 4E 47\` — PNG
- \`25 50 44 46\` — PDF
- \`50 4B 03 04\` — ZIP, dan juga DOCX, XLSX, PPTX, JAR
- \`52 61 72 21\` — RAR

Karena itu memeriksa **isi**, bukan **nama**, adalah langkah pertama dalam pemeriksaan berkas.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# EFEK LONGSOR: kenapa hash bisa jadi bukti\n#\n# "Transfer Rp 2.000.000 ke rekening 8891"\n# "Transfer Rp 3.000.000 ke rekening 8891"\n#\n#   angka 2 = 00110010\n#   angka 3 = 00110011\n#                    ^ persis SATU bit yang berbeda\n#\n# Satu bit itu bernilai satu juta rupiah.\n#\n# Hash-nya TIDAK berubah sedikit. Ia berubah TOTAL:\n# kira-kira separuh dari 256 bitnya membalik.\n#\n# Itulah kenapa hash bisa membuktikan keutuhan:\n# tidak ada perubahan yang "cukup kecil untuk lolos".',
      penjelasan: `
Efek longsor inilah yang membuat hash **layak dipakai sebagai bukti**, dan sifatnya sengaja dirancang begitu.

Bayangkan kalau hash **tidak** punya sifat ini — misalkan mengubah satu huruf hanya mengubah beberapa karakter di ujung hash. Maka ada perubahan yang **"cukup kecil untuk lolos"**, dan seseorang bisa menyunting dokumen sedikit demi sedikit sambil menjaga hash-nya tetap mirip.

Dengan efek longsor, **tidak ada perubahan kecil**. Mengubah satu bit dan mengubah separuh berkas menghasilkan akibat yang **sama-sama total** pada hash-nya.

Perhatikan juga kenapa contoh di atas dipilih. Angka **2** dan **3** dalam ASCII adalah \`00110010\` dan \`00110011\` — berbeda **persis satu bit**, bit paling kanan.

Itu perubahan **sekecil yang mungkin ada** pada sebuah berkas. Tidak ada yang lebih kecil dari satu bit.

Dan pada dokumen transaksi, satu bit itu bernilai **satu juta rupiah**.

Jadi inilah yang dijamin efek longsor: perubahan **paling remeh yang bisa dibayangkan** tetap menghasilkan hash yang **sama sekali berbeda**. Tidak ada celah untuk menyunting diam-diam.

Sekarang bagian yang lebih halus, dan sering disalahpahami: **hash tidak membuktikan bukti itu asli.**

Ia hanya membuktikan berkas **tidak berubah sejak hash pertama dihitung**. Kalau berkasnya sudah dipalsukan **sebelum** disita, hash-nya akan cocok terus dengan senang hati — ia mengunci pemalsuan itu dengan sama rapinya.

Itulah kenapa hash **tidak berdiri sendiri**. Ia dipasangkan dengan **chain of custody**, yang menjawab pertanyaan berbeda: bukan *"apakah berkas ini berubah?"* melainkan **"dari mana berkas ini datang, dan siapa saja yang pernah memegangnya?"**

Dua alat, dua pertanyaan. Yang satu tidak menggantikan yang lain.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Bukti digital: hash, integritas, dan jenis berkas
# ============================================
import hashlib


# --------------------------------------------
# 1. Efek longsor: satu bit berubah, hash total beda
# --------------------------------------------
def sha(teks):
    return hashlib.sha256(teks.encode("utf-8")).hexdigest()


A = "Transfer Rp 2.000.000 ke rekening 8891"
B = "Transfer Rp 3.000.000 ke rekening 8891"

print("--- efek longsor (avalanche) ---")
print("  teks A : " + A)
print("  teks B : " + B)
print("  (yang berbeda: angka 2 jadi 3 -- SATU bit)")
print("")
print("  byte yang berbeda:")
for i, (x, y) in enumerate(zip(A, B)):
    if x != y:
        print("      posisi %d: '%s' (%d, %s)  vs  '%s' (%d, %s)"
              % (i, x, ord(x), format(ord(x), "08b"),
                 y, ord(y), format(ord(y), "08b")))
        beda_bit = bin(ord(x) ^ ord(y)).count("1")
        print("      selisihnya %d bit saja" % beda_bit)

ha, hb = sha(A), sha(B)
print("")
print("  sha256 A : " + ha)
print("  sha256 B : " + hb)

sama = sum(1 for x, y in zip(ha, hb) if x == y)
print("")
print("  karakter hex yang sama di posisi sama: %d dari 64 (%.1f%%)"
      % (sama, sama / 64 * 100))

# berapa BIT yang benar-benar berbeda
bit_beda = bin(int(ha, 16) ^ int(hb, 16)).count("1")
print("  bit yang berbeda: %d dari 256 (%.1f%%)"
      % (bit_beda, bit_beda / 256 * 100))
print("")
print("  Mendekati 50 persen -- itulah yang diharapkan.")
print("  Hash yang baik membuat perubahan sekecil apa pun")
print("  menghasilkan keluaran yang seolah tak berhubungan.")


# --------------------------------------------
# 2. Perbandingan algoritma hash
# --------------------------------------------
print("")
print("--- algoritma hash ---")
ALGO = [
    ("md5",     "MD5",     128, "PATAH  - tumbukan praktis sejak 2004"),
    ("sha1",    "SHA-1",   160, "PATAH  - tumbukan dibuktikan 2017 (SHAttered)"),
    ("sha256",  "SHA-256", 256, "AMAN   - baku untuk bukti digital"),
    ("sha512",  "SHA-512", 512, "AMAN   - lebih panjang lagi"),
]
contoh = b"bukti digital"
print("  " + "algoritma".ljust(10) + "bit".rjust(5) + "  status")
for nama, label, bit, status in ALGO:
    print("  " + label.ljust(10) + str(bit).rjust(5) + "  " + status)

print("")
print("  Contoh hash dari data yang sama:")
for nama, label, bit, _ in ALGO:
    h = hashlib.new(nama, contoh).hexdigest()
    potong = h if len(h) <= 44 else h[:41] + "..."
    print("      " + label.ljust(9) + potong)

print("")
print("  MD5 masih memadai untuk memeriksa unduhan rusak,")
print("  tetapi TIDAK untuk bukti hukum -- di sana orang bisa")
print("  MENYENGAJA membuat dua berkas berhash sama.")


# --------------------------------------------
# 3. Memeriksa keutuhan bukti
# --------------------------------------------
print("")
print("--- memeriksa keutuhan bukti ---")

# hash dicatat saat penyitaan
BERITA_ACARA = {
    "chat_wa.txt":  sha("Percakapan asli korban dan tersangka"),
    "catatan.txt":  sha("Catatan transaksi tanggal 3 Maret"),
    "rekaman.txt":  sha("Transkrip rekaman rapat"),
}

# keadaan berkas saat akan dipakai di sidang
SEKARANG = {
    "chat_wa.txt":  "Percakapan asli korban dan tersangka",
    "catatan.txt":  "Catatan transaksi tanggal 8 Maret",   # 3 -> 8
    "rekaman.txt":  "Transkrip rekaman rapat",
}

print("  " + "berkas".ljust(16) + "status")
for nama, isi in SEKARANG.items():
    cocok = sha(isi) == BERITA_ACARA[nama]
    print("  " + nama.ljust(16) +
          ("UTUH" if cocok else "BERUBAH  <-- bukti CACAT"))

print("")
print("  Satu angka tanggal berubah dari 3 jadi 8 -- perubahan")
print("  yang mustahil terlihat kalau cuma membandingkan")
print("  ukuran berkas atau membacanya sekilas.")
print("")
print("  Tapi hash TIDAK membuktikan berkasnya asli. Ia cuma")
print("  membuktikan tidak berubah SEJAK hash pertama dihitung.")
print("  Kalau sudah dipalsukan sebelum disita, hash akan cocok")
print("  terus -- ia mengunci pemalsuan itu sama rapinya.")
print("  Untuk itulah ada chain of custody.")


# --------------------------------------------
# 4. Urutan volatilitas
# --------------------------------------------
print("")
print("--- urutan volatilitas: ambil yang paling cepat hilang ---")
VOLATIL = [
    (1, "Register & cache",    "hilang seketika",
     "praktis tidak bisa diambil"),
    (2, "RAM",                 "hilang saat daya putus",
     "kunci enkripsi, sandi, proses berjalan"),
    (3, "Keadaan jaringan",    "hilang dalam hitungan detik",
     "sambungan aktif, tabel rute"),
    (4, "Berkas sementara",    "hilang saat mati/restart",
     "swap, cache aplikasi"),
    (5, "Disk",                "bertahan",
     "berkas, sisa berkas terhapus"),
    (6, "Cadangan & arsip",    "paling awet",
     "backup, media luar"),
]
for no, nama, sifat, isi in VOLATIL:
    print("  " + str(no) + ". " + nama.ljust(20) + sifat.ljust(28) + isi)

print("")
print("  KESALAHAN BESAR YANG LAZIM: mematikan komputer yang")
print("  masih menyala karena terasa lebih aman.")
print("  Tindakan itu memusnahkan SELURUH isi RAM -- termasuk")
print("  kunci enkripsi yang mungkin satu-satunya jalan")
print("  membuka disknya.")


# --------------------------------------------
# 5. Magic number vs ekstensi
# --------------------------------------------
print("")
print("--- magic number: isi lebih jujur daripada nama ---")

MAGIC = [
    (b"\xff\xd8\xff",          "JPEG"),
    (b"\x89PNG\r\n\x1a\n",     "PNG"),
    (b"GIF87a",                "GIF"),
    (b"GIF89a",                "GIF"),
    (b"%PDF",                  "PDF"),
    (b"PK\x03\x04",            "ZIP (juga DOCX/XLSX/PPTX/JAR)"),
    (b"Rar!\x1a\x07",          "RAR"),
    (b"\x7fELF",               "ELF (program Linux)"),
    (b"MZ",                    "EXE/DLL (program Windows)"),
]

def kenali(data):
    for tanda, nama in MAGIC:
        if data.startswith(tanda):
            return nama
    return "tidak dikenali"


# Satu ekstensi bisa sah untuk beberapa penamaan jenis.
PADANAN = {
    "JPG": "JPEG", "JPEG": "JPEG", "PNG": "PNG", "GIF": "GIF",
    "PDF": "PDF", "ZIP": "ZIP", "DOCX": "ZIP", "XLSX": "ZIP",
    "PPTX": "ZIP", "JAR": "ZIP", "RAR": "RAR", "EXE": "EXE", "DLL": "EXE",
}


def sesuai(ekstensi, jenis):
    """Apakah jenis yang terbaca dari isi cocok dengan ekstensinya?"""
    harusnya = PADANAN.get(ekstensi.upper())
    return harusnya is not None and jenis.startswith(harusnya)


BARANG_BUKTI = [
    ("foto_liburan.jpg",  b"\xff\xd8\xff\xe0\x00\x10JFIF"),
    ("laporan.pdf",       b"%PDF-1.7\n%\xe2\xe3"),
    ("tugas.docx",        b"PK\x03\x04\x14\x00\x06\x00"),
    ("gambar_kucing.jpg", b"Rar!\x1a\x07\x00\xcf\x90"),   # ekstensi BOHONG
    ("catatan.txt",       b"MZ\x90\x00\x03\x00\x00\x00"),  # ekstensi BOHONG
]

print("  " + "nama berkas".ljust(20) + "kata ekstensi".ljust(15) +
      "kata isinya".ljust(32) + "  ")
for nama, awal in BARANG_BUKTI:
    ext = nama.rsplit(".", 1)[-1].upper()
    asli = kenali(awal)
    tanda = "" if sesuai(ext, asli) else "  <-- TIDAK COCOK"
    print("  " + nama.ljust(20) + ext.ljust(15) + asli.ljust(32) + tanda)

print("")
print("  Ekstensi cuma bagian dari NAMA -- siapa pun bisa")
print("  mengubahnya. Jenis berkas yang sebenarnya ditentukan")
print("  oleh beberapa byte pertama ISI-nya.")
print("")
print("  Berkas bernama 'gambar_kucing.jpg' yang ternyata arsip")
print("  RAR adalah pola penyembunyian yang paling sering")
print("  ditemukan -- dan paling mudah ketahuan.")`
  },

  output: `--- efek longsor (avalanche) ---
  teks A : Transfer Rp 2.000.000 ke rekening 8891
  teks B : Transfer Rp 3.000.000 ke rekening 8891
  (yang berbeda: angka 2 jadi 3 -- SATU bit)

  byte yang berbeda:
      posisi 12: '2' (50, 00110010)  vs  '3' (51, 00110011)
      selisihnya 1 bit saja

  sha256 A : ceeed2449a57f0c68d54170d681fcc9f38b7fc2ddaa4c82a7a49b98fe86f48a3
  sha256 B : 4c577d69587358b687c07c3cffa19d3f9e0a24693e70c7a20daac16142562473

  karakter hex yang sama di posisi sama: 5 dari 64 (7.8%)
  bit yang berbeda: 123 dari 256 (48.0%)

  Mendekati 50 persen -- itulah yang diharapkan.
  Hash yang baik membuat perubahan sekecil apa pun
  menghasilkan keluaran yang seolah tak berhubungan.

--- algoritma hash ---
  algoritma   bit  status
  MD5         128  PATAH  - tumbukan praktis sejak 2004
  SHA-1       160  PATAH  - tumbukan dibuktikan 2017 (SHAttered)
  SHA-256     256  AMAN   - baku untuk bukti digital
  SHA-512     512  AMAN   - lebih panjang lagi

  Contoh hash dari data yang sama:
      MD5      da18a32d0841e8da5528dc288669af8f
      SHA-1    962202eddd63cde15c0a59ecad5fe7e2630ca910
      SHA-256  07a864aeae2023d00434efb2680019a3446ae23ab...
      SHA-512  1c80d2d0fcf33ea7eaaad6923c6a938893cb28792...

  MD5 masih memadai untuk memeriksa unduhan rusak,
  tetapi TIDAK untuk bukti hukum -- di sana orang bisa
  MENYENGAJA membuat dua berkas berhash sama.

--- memeriksa keutuhan bukti ---
  berkas          status
  chat_wa.txt     UTUH
  catatan.txt     BERUBAH  <-- bukti CACAT
  rekaman.txt     UTUH

  Satu angka tanggal berubah dari 3 jadi 8 -- perubahan
  yang mustahil terlihat kalau cuma membandingkan
  ukuran berkas atau membacanya sekilas.

  Tapi hash TIDAK membuktikan berkasnya asli. Ia cuma
  membuktikan tidak berubah SEJAK hash pertama dihitung.
  Kalau sudah dipalsukan sebelum disita, hash akan cocok
  terus -- ia mengunci pemalsuan itu sama rapinya.
  Untuk itulah ada chain of custody.

--- urutan volatilitas: ambil yang paling cepat hilang ---
  1. Register & cache    hilang seketika             praktis tidak bisa diambil
  2. RAM                 hilang saat daya putus      kunci enkripsi, sandi, proses berjalan
  3. Keadaan jaringan    hilang dalam hitungan detik sambungan aktif, tabel rute
  4. Berkas sementara    hilang saat mati/restart    swap, cache aplikasi
  5. Disk                bertahan                    berkas, sisa berkas terhapus
  6. Cadangan & arsip    paling awet                 backup, media luar

  KESALAHAN BESAR YANG LAZIM: mematikan komputer yang
  masih menyala karena terasa lebih aman.
  Tindakan itu memusnahkan SELURUH isi RAM -- termasuk
  kunci enkripsi yang mungkin satu-satunya jalan
  membuka disknya.

--- magic number: isi lebih jujur daripada nama ---
  nama berkas         kata ekstensi  kata isinya                       
  foto_liburan.jpg    JPG            JPEG                            
  laporan.pdf         PDF            PDF                             
  tugas.docx          DOCX           ZIP (juga DOCX/XLSX/PPTX/JAR)   
  gambar_kucing.jpg   JPG            RAR                               <-- TIDAK COCOK
  catatan.txt         TXT            EXE/DLL (program Windows)         <-- TIDAK COCOK

  Ekstensi cuma bagian dari NAMA -- siapa pun bisa
  mengubahnya. Jenis berkas yang sebenarnya ditentukan
  oleh beberapa byte pertama ISI-nya.

  Berkas bernama 'gambar_kucing.jpg' yang ternyata arsip
  RAR adalah pola penyembunyian yang paling sering
  ditemukan -- dan paling mudah ketahuan.`,

  kesalahanUmum: [
    {
      salah: 'Mematikan komputer yang masih menyala saat penyitaan karena terasa lebih aman.',
      kenapa: 'Isi RAM hilang seluruhnya begitu daya putus, dan di sanalah tersimpan kunci enkripsi, sandi, serta daftar proses yang sedang berjalan. Kalau disknya terenkripsi, kunci di RAM itu bisa jadi satu-satunya jalan membukanya, dan ia baru saja dimusnahkan.',
      benar: 'Ikuti urutan volatilitas: ambil isi RAM dan keadaan jaringan lebih dulu selagi mesin masih menyala, baru tangani disknya.'
    },
    {
      salah: 'Menganalisis media bukti langsung tanpa write blocker.',
      kenapa: 'Sekadar mencolokkan disk sudah membuat sistem operasi menulis waktu akses, membuat indeks pencarian, atau memasang berkas sistem. Begitu satu byte berubah, hash tidak lagi cocok dengan yang tercatat di berita acara, dan buktinya cacat selamanya.',
      benar: 'Pakai write blocker, buat salinan bit demi bit, lalu kerjakan seluruh analisis pada salinan itu.'
    },
    {
      salah: 'Memakai MD5 untuk membuktikan keutuhan bukti hukum.',
      kenapa: 'Tumbukan MD5 sudah bisa dibuat dengan sengaja sejak 2004, dan SHA-1 sejak 2017 lewat serangan SHAttered. Artinya seseorang bisa menyiapkan dua berkas berbeda yang hash-nya sama, sehingga hash itu tidak lagi membuktikan apa pun di pengadilan.',
      benar: 'Pakai SHA-256 ke atas, dan catat dua algoritma berbeda sekaligus karena memalsukan tumbukan pada keduanya jauh lebih sulit.'
    },
    {
      salah: 'Mengira hash yang cocok membuktikan bukti itu asli.',
      kenapa: 'Hash hanya membuktikan berkas tidak berubah sejak hash pertama dihitung. Kalau berkasnya sudah dipalsukan sebelum disita, hash akan cocok terus dan justru mengunci pemalsuan itu dengan rapi.',
      benar: 'Pasangkan hash dengan chain of custody. Hash menjawab apakah berubah, chain of custody menjawab dari mana asalnya dan siapa yang pernah memegangnya.'
    },
    {
      salah: 'Menentukan jenis berkas dari ekstensinya.',
      kenapa: 'Ekstensi hanya bagian dari nama dan bisa diubah siapa saja tanpa menyentuh isinya. Arsip RAR yang dinamai gambar_kucing.jpg akan terlihat seperti foto di daftar berkas, padahal isinya sama sekali lain.',
      benar: 'Periksa magic number, yaitu beberapa byte pertama isi berkas, dan bandingkan dengan ekstensinya. Ketidakcocokan itu sendiri sudah menjadi temuan.'
    }
  ],

  analogi: `Bayangkan sebuah **pisau di tempat kejadian perkara**.

**Chain of custody** adalah lembar catatan yang menempel padanya: siapa memungutnya, jam berapa, dimasukkan ke kantong bernomor berapa, diserahkan kepada siapa, disimpan di lemari mana.

Kalau ada **satu baris yang kosong** — katakanlah pisau itu tidak jelas berada di mana selama tiga jam — maka pengacara akan menyerang di titik itu. Dan ia **tidak perlu membuktikan pisaunya ditukar**. Ia cukup menunjukkan bahwa **tidak ada yang bisa membuktikan pisaunya tidak ditukar.**

Bebannya memang terbalik dari dugaan orang, dan itu disengaja.

**Hash** adalah menimbang pisau itu dengan timbangan yang **luar biasa peka** — sampai sepersejuta gram — lalu mencatat angkanya di berita acara.

Kalau nanti ada yang menyerahkan pisau dan angkanya cocok sampai digit terakhir, hampir mustahil itu pisau lain.

**Efek longsor** adalah sifat aneh timbangan ini: **mengikis satu serpih logam sekecil apa pun** tidak membuat angkanya bergeser sedikit — ia membuat **seluruh angkanya berubah acak**.

Jadi tidak ada yang bisa berpikir *"kikis sedikit saja, mungkin tidak kelihatan."* Tidak ada yang namanya sedikit.

Sekarang bagian yang paling sering disalahpahami.

Bayangkan **pisau itu memang sudah ditukar sebelum polisi datang**. Lalu ditimbang, angkanya dicatat, dan disimpan rapi.

Setiap pemeriksaan berikutnya akan bilang **"cocok"** — dengan sangat meyakinkan. Timbangan itu **tidak berbohong**; ia cuma menjawab pertanyaan yang berbeda dari yang kamu kira.

Ia menjawab *"apakah ini benda yang sama dengan yang ditimbang dulu?"* — **bukan** *"apakah benda ini benar dari tempat kejadian?"*

Pertanyaan kedua itu hanya bisa dijawab oleh **lembar catatan tadi**. Dan itulah kenapa keduanya harus ada.

Terakhir, **urutan volatilitas**. Bayangkan tiba di TKP dan menemukan: **jejak kaki di lumpur, bau parfum di udara, dan sebuah pisau**.

Hujan akan turun sebentar lagi. Angin sedang bertiup.

Kamu mengambil **bau parfum dulu** — meski terasa paling remeh — karena ia yang akan hilang lebih dulu. Pisau itu bisa menunggu.

**Mematikan komputer yang masih menyala** adalah membuka semua jendela lebar-lebar sebelum sempat mencium apa pun.`,

  latihan: [
    'Sebutkan empat prinsip dasar forensik digital dan jelaskan kenapa prinsip pertama menuntut analisis dilakukan pada salinan.',
    'Jelaskan apa itu chain of custody, dan jelaskan kenapa satu celah di dalamnya bisa membatalkan bukti meski tidak terbukti ada yang mengubahnya.',
    'Jelaskan apa itu efek longsor pada fungsi hash, dan kenapa sifat itu diperlukan agar hash bisa dipakai sebagai bukti.',
    'Jelaskan kenapa MD5 dan SHA-1 tidak lagi memadai untuk bukti hukum, dan sebutkan tahun serta nama serangan yang membuktikannya.',
    'Jelaskan perbedaan pertanyaan yang dijawab hash dan pertanyaan yang dijawab chain of custody.',
    'Urutkan enam tingkat volatilitas bukti dari yang paling cepat hilang, dan jelaskan kesalahan apa yang terjadi kalau urutan itu diabaikan.',
    'Jelaskan apa itu magic number, sebutkan lima contohnya, dan jelaskan kenapa memeriksanya lebih dipercaya daripada memeriksa ekstensi.'
  ]
});

TOPICS.push({
  id: 'forensik-steganografi',
  judul: 'Steganografi & Cara Membongkarnya',
  kategori: 'forensik',
  tag: ['steganografi', 'LSB', 'trailer append', 'steghide', 'stegsolve', 'kapasitas'],
  ringkas: 'Menyembunyikan pesan di dalam gambar — dan bagaimana pemeriksa menemukannya kembali.',

  fungsi: `**Menemukan data yang disembunyikan di dalam berkas yang terlihat biasa.**

Terpakai di:

- **Investigasi** — menemukan data yang diselundupkan
- **CTF dan lomba keamanan** — soal steganografi hampir selalu ada
- **Menguji sistemmu sendiri** — apakah unggahan bisa menyelundupkan sesuatu
- **Memahami batas** — apa yang bisa dan tidak bisa dideteksi

Yang paling sering ditemui dan paling mudah dibongkar: **data yang ditempel setelah penanda akhir berkas**.

Program penampil berhenti membaca di penanda itu, jadi tambahannya tidak terlihat. Tetapi membandingkan **posisi penanda akhir dengan ukuran berkas** langsung memperlihatkan selisihnya.

Dan satu pemeriksaan yang wajib pada aplikasimu sendiri: **jangan percaya ekstensi berkas yang diunggah pengguna.**`,

  praktik: {
    tujuan: `Kamu bisa mendeteksi tiga jenis penyembunyian yang paling sering, dan menguji apakah sistemmu sendiri bisa ditembus.`,
    alat: [
      'Python 3',
      'Perintah `strings` dan `xxd`',
      'StegSolve kalau tersedia'
    ],
    langkah: [
      { judul: 'Buat berkas berpenumpang sendiri',
        isi: `- Windows: \`copy /b gambar.jpg + rahasia.txt keluar.jpg\`
- Linux: \`cat gambar.jpg rahasia.txt > keluar.jpg\`

Buka hasilnya di penampil gambar. Ia tampil **normal**.

Melihat betapa mudahnya membuatnya membuat pentingnya mendeteksi jadi jelas.` },
      { judul: 'Bongkar dengan membandingkan struktur dan ukuran',
        isi: `Tulis skrip yang mencari penanda akhir format lalu membandingkannya dengan ukuran berkas:

- JPEG berakhir di \`FF D9\`
- PNG berakhir di potongan \`IEND\`

Selisihnya adalah data yang ditempel. Cetak isinya.

Ini pemeriksaan paling cepat dan menangkap sebagian besar kasus.` },
      { judul: 'Pakai strings untuk mencari teks',
        isi: `- \`strings gambar.jpg | less\`

Ia menampilkan semua deretan karakter yang bisa dibaca. Teks yang tidak seharusnya ada akan langsung terlihat.

Cara paling cepat untuk pemeriksaan awal, dan sering sudah cukup.` },
      { judul: 'Periksa bidang bit untuk LSB',
        isi: `Ekstrak bit terakhir tiap kanal warna, lalu tampilkan sebagai gambar hitam putih.

Pada gambar wajar, hasilnya **derau acak**. Kalau muncul bentuk, tulisan, atau batas tegas, ada yang disisipkan.

StegSolve melakukannya dengan satu klik; menulis sendiri di Python juga tidak sulit.` },
      { judul: 'Uji ketimpangan pasangan nilai',
        isi: `Penyisipan LSB membuat jumlah piksel bernilai 0 dan 1 menjadi hampir setara, begitu pula 2 dan 3.

Hitung ketimpangannya **per bagian gambar**, bukan atas seluruhnya — muatan biasanya cuma mengisi bagian awal, dan merata-ratakan seluruhnya melemahkan tandanya.` },
      { judul: 'Uji sistem unggahanmu sendiri',
        isi: `Coba unggah berkas berpenumpang ke aplikasi buatanmu.

Periksa: apakah sistemmu memeriksa magic number, atau cuma ekstensi? Apakah ia menyimpan berkas apa adanya?

Perbaikan yang lazim: **olah ulang gambarnya**, misalnya dengan mengubah ukuran. Itu menghancurkan hampir semua muatan tersembunyi.` },
      { judul: 'Akui batasnya',
        isi: `Steganografi yang dikerjakan baik — muatan kecil, tersebar dengan kunci, sudah dienkripsi — bisa **sangat sulit** dibuktikan.

Yang bisa disimpulkan pemeriksa sering hanya *"ada kejanggalan statistik"*, bukan isi pesannya.

Karena itu di dunia nyata penemuan sering datang dari luar berkasnya: alat steganografi yang terpasang, atau berkas asli yang belum dihapus.` }
    ],
    cek: [
      'Skripmu menemukan data yang ditempel setelah penanda akhir JPEG',
      'Bidang LSB gambar wajar terlihat sebagai derau acak',
      'Sistem unggahanmu menolak atau menetralkan berkas berpenumpang'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa tak terlihat',

  konsep: `
**Steganografi** adalah menyembunyikan **keberadaan** pesan. Bedakan baik-baik dengan **kriptografi**, yang menyembunyikan **isi** pesan.

- **Kriptografi** — orang **tahu** ada pesan, tetapi tidak bisa membacanya
- **Steganografi** — orang **tidak tahu** ada pesan sama sekali

Keduanya sering **digabung**: pesan dienkripsi dulu, baru disembunyikan. Kalau penyembunyiannya ketahuan, isinya masih terlindungi.

**Tiga istilah pokok**

- **Cover** — berkas pembawa, misalnya gambar biasa
- **Payload** — pesan yang disembunyikan
- **Stego object** — hasilnya, gambar yang sudah berisi pesan

**Teknik 1: menempel di ekor (*trailer append*)**

Yang paling sederhana, dan **paling sering dijumpai**.

Format gambar punya **penanda akhir**. JPEG diakhiri \`FF D9\`, PNG diakhiri potongan \`IEND\`. Program penampil gambar **berhenti membaca di situ**.

Jadi apa pun yang ditempel **sesudahnya** akan **tidak terlihat** — gambarnya tampil normal, tanpa cacat sedikit pun.

Di Windows caranya semudah \`copy /b gambar.jpg + rahasia.txt keluar.jpg\`.

**Kelemahannya fatal.** Datanya ada di sana **mentah-mentah**, tidak diubah sama sekali. Cukup buka dengan penyunting heksa, jalankan \`strings\`, atau bandingkan **ukuran berkas dengan posisi penanda akhirnya** — selisihnya langsung terlihat.

Percobaan di projek kuliah sendiri memakai teknik ini: dua berkas menyembunyikan **78 dan 229 byte teks biasa** setelah \`FF D9\`.

**Teknik 2: LSB (*Least Significant Bit*)**

Lebih halus. Nilai tiap piksel diubah **bit paling kanannya** saja.

Untuk kanal 8 bit bernilai \`10110101\`, mengubah bit terakhir menjadi \`10110100\` hanya menggeser nilainya dari 181 ke 180 — **selisih satu tingkat dari 256**. Mata manusia **tidak mungkin** menangkapnya.

**Kapasitasnya** = \`lebar × tinggi × jumlah kanal × bit per kanal ÷ 8\` byte.

Gambar 800×600 RGB dengan 1 bit per kanal memuat sekitar **175 KB** — lebih dari cukup untuk naskah panjang.

**Syarat mutlak: format harus lossless.** LSB **hanya bekerja pada PNG, BMP, dan TIFF**.

Kalau disimpan sebagai JPEG, kuantisasi akan **membuang bit-bit halus itu** — persis bit yang kamu pakai menyimpan pesan. Pesannya hancur. Ini sebab kegagalan yang paling sering terjadi bagi pemula.

**Teknik 3: steghide dan sejenisnya**

Menyisipkan ke dalam **koefisien DCT** JPEG, bukan ke piksel mentah, sehingga tahan terhadap kompresi JPEG. Ditambah **enkripsi dan sandi**.

Jauh lebih sulit dideteksi daripada dua cara sebelumnya, tetapi tetap **meninggalkan jejak statistik**.

**Cara membongkarnya**

**Bandingkan struktur dengan ukuran.** Cari penanda akhir format, lalu periksa apakah masih ada data sesudahnya. Ini menangkap seluruh trailer append **dalam sekejap**.

**Lihat bidang bit** (*bit plane*). Alat seperti **StegSolve** menampilkan bidang LSB saja. Pada gambar wajar, bidang itu **berupa derau acak**. Kalau muncul **bentuk, tulisan, atau batas tegas**, itu tanda kuat ada sisipan.

**Uji statistik.** Penyisipan LSB membuat pasangan nilai bersebelahan — 0 dan 1, 2 dan 3, dan seterusnya — **jumlahnya jadi setara**. Pada gambar wajar tidak begitu. Ini dasar **chi-square attack**.

**Bandingkan dengan aslinya**, kalau ada. Cara paling meyakinkan, dan paling jarang tersedia.

**Batas yang harus jujur diakui**

Steganografi yang dikerjakan dengan baik — muatan kecil, tersebar acak dengan kunci, dan sudah dienkripsi — bisa **sangat sulit dibuktikan**.

Yang bisa disimpulkan pemeriksa sering hanya *"ada kejanggalan statistik"*, **bukan** *"ini isi pesannya"*.

Karena itu di dunia nyata, penemuan sering datang dari **hal di luar berkasnya**: ditemukannya alat steganografi terpasang di komputer, sandi yang tercatat di tempat lain, atau berkas asli yang belum dihapus.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA LSB TIDAK TERLIHAT -- dan kenapa JPEG merusaknya\n#\n# Satu kanal warna 8 bit:\n#\n#   1 0 1 1 0 1 0 1   = 181\n#   ^                   bit PALING BERARTI: ubah -> +/- 128\n#               ^       bit PALING TAK BERARTI: ubah -> +/- 1\n#\n#   1 0 1 1 0 1 0 0   = 180\n#\n# Selisih 1 dari 256 tingkat. Mata mustahil menangkapnya.\n#\n# TAPI: simpan sebagai JPEG, dan kuantisasi DCT membuang\n# justru detail terhalus -- persis bit yang kamu pakai.\n# Pesannya hancur total.\n#\n# LSB HANYA bekerja pada format lossless: PNG, BMP, TIFF.',
      penjelasan: `
Di sinilah dua mata kuliah bertemu, dan pemahamannya saling mengunci.

Ingat kompresi lossy di Teknologi Multimedia: JPEG membuang informasi yang **tidak disadari mata**. Ia bekerja dengan mengubah blok piksel menjadi koefisien DCT, lalu **membulatkan koefisien pola halus dengan pembagi yang besar**.

Sekarang perhatikan apa artinya bagi LSB.

LSB menyimpan pesan di **perubahan sehalus mungkin** — persis satu tingkat dari 256. Dan JPEG dirancang khusus untuk **membuang perubahan sehalus itu**, karena menurut ukurannya perubahan itu **tidak berarti apa-apa**.

Jadi keduanya **mengincar tempat yang sama persis**: LSB menaruh pesan di sana, JPEG membersihkannya.

Ini bukan kebetulan atau kelemahan yang bisa diperbaiki. Keduanya berangkat dari kenyataan yang sama — **bit terakhir hampir tidak berpengaruh pada penglihatan** — dan menarik kesimpulan yang berlawanan:

- **LSB** menyimpulkan: *"berarti aman diubah"*
- **JPEG** menyimpulkan: *"berarti aman dibuang"*

Karena itu kegagalan paling lazim bagi pemula bukan salah kode. Ia menyisipkan pesan dengan benar, gambarnya terlihat sempurna, lalu **menyimpannya sebagai JPEG** — dan pesannya lenyap tanpa satu pun pesan galat.

Sekarang **kenapa LSB tetap bisa dibongkar**, meski mata tidak bisa melihatnya.

Pada foto biasa, bit terakhir tiap piksel adalah **derau** — pengaruh sensor kamera, pembulatan, cahaya. Sifatnya acak, **tetapi acak dengan cara tertentu**.

Ketika kamu menulis data ke sana, kamu menggantinya dengan **keacakan jenis lain**. Dan kalau muatanmu berupa teks biasa yang belum dienkripsi, ia bahkan **tidak acak sama sekali** — huruf ASCII punya pola kuat, misalnya bit tertinggi hampir selalu nol.

Uji chi-square menangkap ini dengan memeriksa **pasangan nilai bersebelahan**. Penyisipan LSB membuat jumlah piksel bernilai 0 dan 1 menjadi **hampir setara**, begitu pula 2 dan 3, dan seterusnya — karena bit terakhirlah yang ditimpa.

Pada gambar wajar, **tidak ada alasan** kedua nilai itu seimbang. Ketimpangannya justru yang normal.

Jadi: **mata tidak bisa melihatnya, tetapi statistik bisa.**
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Steganografi: menyembunyikan, lalu membongkar
# Semua dibuat dari nol -- tanpa pustaka luar
# ============================================
import random


# --------------------------------------------
# 1. TRAILER APPEND: teknik paling sederhana
# --------------------------------------------
print("--- teknik 1: menempel di ekor berkas ---")

# JPEG kecil buatan: penanda awal FFD8FF ... penanda akhir FFD9
gambar = bytes([0xFF, 0xD8, 0xFF, 0xE0]) + bytes(range(60)) + bytes([0xFF, 0xD9])
pesan = b"Aku Adalah Ryan Gosling dan ketakutan terbesarku adalah mencari seorang pacar."

stego = gambar + pesan

print("  gambar asli   : %d byte" % len(gambar))
print("  pesan         : %d byte" % len(pesan))
print("  hasil (stego) : %d byte" % len(stego))
print("")
print("  Program penampil gambar BERHENTI di penanda FFD9,")
print("  jadi tambahan di belakangnya tidak pernah terlihat.")


# --------------------------------------------
# 2. Membongkarnya: bandingkan struktur vs ukuran
# --------------------------------------------
def periksa_ekor(data):
    """Cari penanda akhir format, lihat apakah ada sisa sesudahnya."""
    if data[:3] == b"\xff\xd8\xff":
        i = data.rfind(b"\xff\xd9")
        return ("JPEG", i + 2 if i != -1 else None)
    if data[:4] == b"\x89PNG":
        i = data.rfind(b"IEND")
        return ("PNG", i + 8 if i != -1 else None)
    return (None, None)


print("")
print("--- membongkar teknik 1 ---")
for nama, data in [("gambar asli", gambar), ("gambar stego", stego)]:
    jenis, akhir = periksa_ekor(data)
    sisa = len(data) - akhir
    print("  " + nama.ljust(14) + "jenis %s, akhir sah di byte %d, ukuran %d"
          % (jenis, akhir, len(data)))
    if sisa > 0:
        ekor = data[akhir:]
        cetak = sum(1 for c in ekor if 32 <= c < 127 or c in (10, 13))
        jenis_sisa = "TEKS BIASA" if cetak / len(ekor) > 0.85 else "data biner"
        print("      -> ADA SISA %d byte (%s)" % (sisa, jenis_sisa))
        print("      -> isinya: " + ekor[:46].decode("utf-8", "replace") + "...")
    else:
        print("      -> tidak ada sisa, bersih")

print("")
print("  Ketahuan dalam sekejap. Datanya ada di sana MENTAH,")
print("  tidak diubah sama sekali. Cukup satu perbandingan")
print("  antara posisi penanda akhir dan ukuran berkas.")


# --------------------------------------------
# 3. LSB: menyisipkan ke bit paling tak berarti
# --------------------------------------------
print("")
print("--- teknik 2: LSB (Least Significant Bit) ---")

def buat_gambar(lebar, tinggi, benih=7):
    """Gambar RGB buatan dengan gradasi + sedikit derau,
       menirukan sifat foto sungguhan."""
    acak = random.Random(benih)
    piksel = bytearray()
    for y in range(tinggi):
        for x in range(lebar):
            dasar = (x * 255) // max(lebar - 1, 1)
            for k in range(3):
                nilai = dasar + acak.randint(-12, 12) + k * 7
                piksel.append(max(0, min(255, nilai)))
    return piksel


def sisip_lsb(piksel, pesan):
    """Menaruh panjang pesan (32 bit) lalu isinya, 1 bit per kanal."""
    bit = []
    for b in len(pesan).to_bytes(4, "big") + pesan:
        for i in range(7, -1, -1):
            bit.append((b >> i) & 1)
    if len(bit) > len(piksel):
        raise ValueError("pesan terlalu besar untuk gambar ini")
    hasil = bytearray(piksel)
    for i, b in enumerate(bit):
        hasil[i] = (hasil[i] & 0xFE) | b       # timpa bit terakhir
    return hasil


def ambil_lsb(piksel):
    def bit_ke_byte(bit):
        return bytes(int("".join(map(str, bit[i:i+8])), 2)
                     for i in range(0, len(bit), 8))
    panjang = int.from_bytes(bit_ke_byte([p & 1 for p in piksel[:32]]), "big")
    mulai, habis = 32, 32 + panjang * 8
    return bit_ke_byte([p & 1 for p in piksel[mulai:habis]])


LEBAR, TINGGI = 120, 90
asli = buat_gambar(LEBAR, TINGGI)
rahasia = ("Namaku adalah Ryan Gosling dan aku senang sekali menonton "
           "film dan juga melihat meme tentang literally me.").encode("utf-8")

kapasitas = LEBAR * TINGGI * 3 // 8
print("  gambar        : %d x %d RGB" % (LEBAR, TINGGI))
print("  kapasitas     : %d x %d x 3 bit / 8 = %d byte"
      % (LEBAR, TINGGI, kapasitas))
print("  pesan         : %d byte (%.2f%% dari kapasitas)"
      % (len(rahasia), len(rahasia) / kapasitas * 100))

hasil = sisip_lsb(asli, rahasia)

# --------------------------------------------
# 4. Seberapa besar kerusakannya?
# --------------------------------------------
beda = [(i, a, b) for i, (a, b) in enumerate(zip(asli, hasil)) if a != b]
maks = max((abs(a - b) for _, a, b in beda), default=0)

print("")
print("--- seberapa besar gambar berubah? ---")
print("  kanal yang berubah : %d dari %d (%.2f%%)"
      % (len(beda), len(asli), len(beda) / len(asli) * 100))
print("  perubahan TERBESAR : %d tingkat dari 256" % maks)
print("")
print("  Beberapa contoh perubahan:")
for i, a, b in beda[:5]:
    print("      kanal %-6d %3d (%s)  ->  %3d (%s)"
          % (i, a, format(a, "08b"), b, format(b, "08b")))

print("")
print("  Hanya bit paling KANAN yang berbeda. Nilainya bergeser")
print("  satu tingkat dari 256 -- mata mustahil menangkapnya.")

pulih = ambil_lsb(hasil)
print("")
print("  pesan dipulihkan: " + pulih.decode("utf-8")[:52] + "...")
print("  utuh? " + str(pulih == rahasia))


# --------------------------------------------
# 5. Membongkar LSB dengan uji statistik
# --------------------------------------------
def uji_pasangan(piksel, contoh=None):
    """Penyisipan LSB membuat pasangan nilai bersebelahan
       (0-1, 2-3, 4-5, ...) jumlahnya jadi setara."""
    data = piksel if contoh is None else piksel[:contoh]
    hitung = [0] * 256
    for p in data:
        hitung[p] += 1
    ketimpangan = []
    for v in range(0, 256, 2):
        a, b = hitung[v], hitung[v + 1]
        if a + b >= 20:                      # abaikan yang datanya sedikit
            ketimpangan.append(abs(a - b) / (a + b))
    return sum(ketimpangan) / len(ketimpangan) if ketimpangan else 0.0


N = len(rahasia) * 8 + 32          # bagian yang benar-benar disisipi
print("")
print("--- membongkar LSB: uji ketimpangan pasangan ---")
print("  Gagasannya: LSB menimpa bit terakhir, sehingga jumlah")
print("  piksel bernilai 0 dan 1 jadi setara, begitu pula 2 dan 3,")
print("  dan seterusnya. Pada gambar wajar tidak ada alasan")
print("  keduanya seimbang.")
print("")

for nama, piks in [("gambar asli", asli), ("gambar stego", hasil)]:
    seluruh = uji_pasangan(piks)
    awal = uji_pasangan(piks, N)
    print("  " + nama.ljust(15) +
          "ketimpangan seluruh gambar %.4f   bagian awal %.4f"
          % (seluruh, awal))

print("")
print("  Ketimpangan bagian awal gambar stego JAUH lebih rendah --")
print("  itulah tanda penyisipan. Pemeriksa tidak perlu melihat")
print("  gambarnya sama sekali; angkanya sudah bicara.")
print("")
print("  Perhatikan juga: kalau seluruh gambar dirata-rata,")
print("  tandanya MELEMAH karena bagian yang tidak disisipi ikut")
print("  terhitung. Karena itu uji dilakukan per bagian, bukan")
print("  atas seluruh gambar sekaligus.")


# --------------------------------------------
# 6. Kapasitas berbagai ukuran gambar
# --------------------------------------------
print("")
print("--- kapasitas LSB berbagai ukuran ---")
UKURAN = [
    ("Ikon      64 x 64",     64,   64,  3, 1),
    ("Kecil    320 x 240",   320,  240,  3, 1),
    ("Sedang   800 x 600",   800,  600,  3, 1),
    ("Full HD 1920 x 1080", 1920, 1080,  3, 1),
    ("Full HD, 2 bit/kanal",1920, 1080,  3, 2),
]
print("  " + "gambar".ljust(24) + "kapasitas".rjust(12) +
      "  kira-kira setara")
for nama, w, h, kanal, bit in UKURAN:
    byte = w * h * kanal * bit // 8
    if byte < 1024:
        besar = "%d byte" % byte
    elif byte < 1024 * 1024:
        besar = "%.1f KB" % (byte / 1024)
    else:
        besar = "%.2f MB" % (byte / 1024 / 1024)
    halaman = byte / 2000            # ~2000 karakter per halaman
    print("  " + nama.ljust(24) + besar.rjust(12) +
          "  %.0f halaman teks" % halaman)

print("")
print("  Makin banyak bit per kanal, makin besar kapasitasnya --")
print("  tapi makin terlihat juga. Pada 2 bit, perubahan bisa")
print("  mencapai 3 tingkat; pada 4 bit sudah 15 tingkat dan")
print("  gambarnya mulai tampak berbintik.")


# --------------------------------------------
# 7. Kenapa JPEG merusak LSB
# --------------------------------------------
print("")
print("--- kenapa LSB hancur kalau disimpan sebagai JPEG ---")

def tiru_kuantisasi(piksel, bagi):
    """Meniru pembulatan kasar yang dilakukan kuantisasi JPEG."""
    return bytearray(min(255, round(p / bagi) * bagi) for p in piksel)


print("  " + "pembagi".rjust(8) + "  bit terakhir yang selamat" +
      "        pesan pulih?")
for bagi in [1, 2, 4, 8]:
    rusak = tiru_kuantisasi(hasil, bagi)
    selamat = sum(1 for a, b in zip(hasil[:N], rusak[:N])
                  if (a & 1) == (b & 1))
    persen = selamat / N * 100
    try:
        pulih2 = ambil_lsb(rusak)
        ok = "YA" if pulih2 == rahasia else "tidak (isinya kacau)"
    except Exception:
        ok = "tidak (gagal dibaca)"
    print("  " + str(bagi).rjust(8) + ("  %.1f%%" % persen).rjust(24) +
          "        " + ok)

print("")
print("  Pembagi 1 berarti tidak ada pembulatan -- itulah format")
print("  LOSSLESS seperti PNG, dan pesannya utuh.")
print("  Begitu ada pembulatan sekecil apa pun, bit terakhir")
print("  langsung berantakan dan pesannya lenyap.")
print("")
print("  LSB menaruh pesan di tempat yang justru DIRANCANG")
print("  untuk dibuang oleh JPEG. Keduanya berangkat dari")
print("  kenyataan yang sama -- bit terakhir hampir tak")
print("  berpengaruh pada penglihatan -- lalu menarik")
print("  kesimpulan yang berlawanan.")


# --------------------------------------------
# 8. Membandingkan ketiga teknik
# --------------------------------------------
print("")
print("--- membandingkan teknik ---")
TEKNIK = [
    ("Trailer append", "sangat mudah", "sangat mudah",
     "tidak terbatas", "hex editor / strings"),
    ("LSB",            "mudah",        "sedang",
     "1/8 ukuran piksel", "bidang bit & uji chi-square"),
    ("steghide (DCT)", "perlu alat",   "sulit",
     "kecil",           "jejak statistik + alat terpasang"),
]
print("  " + "teknik".ljust(17) + "membuat".ljust(14) +
      "mendeteksi".ljust(13) + "kapasitas".ljust(20) + "cara membongkar")
for nama, buat, deteksi, kap, bongkar in TEKNIK:
    print("  " + nama.ljust(17) + buat.ljust(14) + deteksi.ljust(13) +
          kap.ljust(20) + bongkar)

print("")
print("  Yang harus jujur diakui: steganografi yang dikerjakan")
print("  dengan baik -- muatan kecil, tersebar acak dengan kunci,")
print("  dan sudah dienkripsi -- bisa SANGAT sulit dibuktikan.")
print("")
print("  Pemeriksa sering cuma bisa menyimpulkan 'ada kejanggalan")
print("  statistik', BUKAN 'ini isi pesannya'. Karena itu di dunia")
print("  nyata penemuan sering datang dari luar berkasnya:")
print("  alat steganografi yang terpasang di komputer, sandi yang")
print("  tercatat di tempat lain, atau berkas asli yang belum dihapus.")`
  },

  output: `--- teknik 1: menempel di ekor berkas ---
  gambar asli   : 66 byte
  pesan         : 78 byte
  hasil (stego) : 144 byte

  Program penampil gambar BERHENTI di penanda FFD9,
  jadi tambahan di belakangnya tidak pernah terlihat.

--- membongkar teknik 1 ---
  gambar asli   jenis JPEG, akhir sah di byte 66, ukuran 66
      -> tidak ada sisa, bersih
  gambar stego  jenis JPEG, akhir sah di byte 66, ukuran 144
      -> ADA SISA 78 byte (TEKS BIASA)
      -> isinya: Aku Adalah Ryan Gosling dan ketakutan terbesar...

  Ketahuan dalam sekejap. Datanya ada di sana MENTAH,
  tidak diubah sama sekali. Cukup satu perbandingan
  antara posisi penanda akhir dan ukuran berkas.

--- teknik 2: LSB (Least Significant Bit) ---
  gambar        : 120 x 90 RGB
  kapasitas     : 120 x 90 x 3 bit / 8 = 4050 byte
  pesan         : 106 byte (2.62% dari kapasitas)

--- seberapa besar gambar berubah? ---
  kanal yang berubah : 450 dari 32400 (1.39%)
  perubahan TERBESAR : 1 tingkat dari 256

  Beberapa contoh perubahan:
      kanal 6        9 (00001001)  ->    8 (00001000)
      kanal 8       17 (00010001)  ->   16 (00010000)
      kanal 15      11 (00001011)  ->   10 (00001010)
      kanal 18       7 (00000111)  ->    6 (00000110)
      kanal 19       9 (00001001)  ->    8 (00001000)

  Hanya bit paling KANAN yang berbeda. Nilainya bergeser
  satu tingkat dari 256 -- mata mustahil menangkapnya.

  pesan dipulihkan: Namaku adalah Ryan Gosling dan aku senang sekali men...
  utuh? True

--- membongkar LSB: uji ketimpangan pasangan ---
  Gagasannya: LSB menimpa bit terakhir, sehingga jumlah
  piksel bernilai 0 dan 1 jadi setara, begitu pula 2 dan 3,
  dan seterusnya. Pada gambar wajar tidak ada alasan
  keduanya seimbang.

  gambar asli    ketimpangan seluruh gambar 0.0648   bagian awal 0.7333
  gambar stego   ketimpangan seluruh gambar 0.0650   bagian awal 0.0667

  Ketimpangan bagian awal gambar stego JAUH lebih rendah --
  itulah tanda penyisipan. Pemeriksa tidak perlu melihat
  gambarnya sama sekali; angkanya sudah bicara.

  Perhatikan juga: kalau seluruh gambar dirata-rata,
  tandanya MELEMAH karena bagian yang tidak disisipi ikut
  terhitung. Karena itu uji dilakukan per bagian, bukan
  atas seluruh gambar sekaligus.

--- kapasitas LSB berbagai ukuran ---
  gambar                     kapasitas  kira-kira setara
  Ikon      64 x 64             1.5 KB  1 halaman teks
  Kecil    320 x 240           28.1 KB  14 halaman teks
  Sedang   800 x 600          175.8 KB  90 halaman teks
  Full HD 1920 x 1080         759.4 KB  389 halaman teks
  Full HD, 2 bit/kanal         1.48 MB  778 halaman teks

  Makin banyak bit per kanal, makin besar kapasitasnya --
  tapi makin terlihat juga. Pada 2 bit, perubahan bisa
  mencapai 3 tingkat; pada 4 bit sudah 15 tingkat dan
  gambarnya mulai tampak berbintik.

--- kenapa LSB hancur kalau disimpan sebagai JPEG ---
   pembagi  bit terakhir yang selamat        pesan pulih?
         1                  100.0%        YA
         2                   56.4%        tidak (isinya kacau)
         4                   54.5%        tidak (isinya kacau)
         8                   54.2%        tidak (isinya kacau)

  Pembagi 1 berarti tidak ada pembulatan -- itulah format
  LOSSLESS seperti PNG, dan pesannya utuh.
  Begitu ada pembulatan sekecil apa pun, bit terakhir
  langsung berantakan dan pesannya lenyap.

  LSB menaruh pesan di tempat yang justru DIRANCANG
  untuk dibuang oleh JPEG. Keduanya berangkat dari
  kenyataan yang sama -- bit terakhir hampir tak
  berpengaruh pada penglihatan -- lalu menarik
  kesimpulan yang berlawanan.

--- membandingkan teknik ---
  teknik           membuat       mendeteksi   kapasitas           cara membongkar
  Trailer append   sangat mudah  sangat mudah tidak terbatas      hex editor / strings
  LSB              mudah         sedang       1/8 ukuran piksel   bidang bit & uji chi-square
  steghide (DCT)   perlu alat    sulit        kecil               jejak statistik + alat terpasang

  Yang harus jujur diakui: steganografi yang dikerjakan
  dengan baik -- muatan kecil, tersebar acak dengan kunci,
  dan sudah dienkripsi -- bisa SANGAT sulit dibuktikan.

  Pemeriksa sering cuma bisa menyimpulkan 'ada kejanggalan
  statistik', BUKAN 'ini isi pesannya'. Karena itu di dunia
  nyata penemuan sering datang dari luar berkasnya:
  alat steganografi yang terpasang di komputer, sandi yang
  tercatat di tempat lain, atau berkas asli yang belum dihapus.`,

  kesalahanUmum: [
    {
      salah: 'Menyisipkan pesan dengan LSB lalu menyimpan hasilnya sebagai JPEG.',
      kenapa: 'Kuantisasi JPEG dirancang membuang perubahan paling halus pada gambar, dan itu persis tempat LSB menaruh pesannya. Gambarnya terlihat sempurna dan tidak ada pesan galat sama sekali, tetapi muatannya sudah hancur.',
      benar: 'Simpan hasil penyisipan LSB dalam format lossless seperti PNG, BMP, atau TIFF. Untuk JPEG, pakai alat yang menyisipkan ke koefisien DCT seperti steghide.'
    },
    {
      salah: 'Menganggap steganografi sama dengan kriptografi.',
      kenapa: 'Kriptografi menyembunyikan isi pesan sementara orang tahu pesannya ada, sedangkan steganografi menyembunyikan keberadaannya. Kalau penyembunyian ketahuan dan pesannya tidak dienkripsi, isinya langsung terbaca seluruhnya.',
      benar: 'Gabungkan keduanya: enkripsi pesannya dulu, baru sembunyikan. Kalau penyembunyiannya gagal, isinya masih terlindungi.'
    },
    {
      salah: 'Mengandalkan trailer append untuk menyembunyikan sesuatu yang penting.',
      kenapa: 'Datanya tersimpan mentah tanpa diubah sedikit pun setelah penanda akhir format. Membandingkan posisi penanda akhir dengan ukuran berkas langsung memperlihatkan selisihnya, dan perintah strings sudah cukup untuk membacanya.',
      benar: 'Kalau memang perlu menyembunyikan, pakai teknik yang mengubah isi berkas dan enkripsi muatannya. Trailer append hanya cocok untuk latihan dan permainan tebak-tebakan.'
    },
    {
      salah: 'Menaikkan jumlah bit per kanal supaya kapasitasnya besar.',
      kenapa: 'Pada satu bit perubahannya paling banyak satu tingkat dari 256 dan tak terlihat, tetapi pada dua bit sudah tiga tingkat dan pada empat bit mencapai lima belas tingkat. Gambarnya mulai tampak berbintik, terutama di bidang warna rata seperti langit.',
      benar: 'Tetap pada satu bit per kanal dan pilih gambar pembawa yang lebih besar kalau butuh kapasitas lebih.'
    },
    {
      salah: 'Menguji seluruh gambar sekaligus saat mencari jejak penyisipan LSB.',
      kenapa: 'Muatan biasanya hanya mengisi sebagian awal gambar, sehingga bagian yang tidak disisipi ikut terhitung dan melemahkan tandanya. Gambar yang jelas disisipi bisa terlihat wajar kalau dirata-rata utuh.',
      benar: 'Uji per bagian atau per blok, lalu bandingkan hasilnya antar-bagian. Ketimpangan yang jatuh tiba-tiba di satu wilayah justru itulah temuannya.'
    },
    {
      salah: 'Menyimpulkan bahwa gambar pasti berisi pesan hanya karena uji statistiknya janggal.',
      kenapa: 'Kejanggalan statistik bisa muncul dari pengolahan gambar yang wajar, penyuntingan, atau kompresi ulang. Hasil uji menunjukkan kecurigaan, bukan bukti isi, dan tidak bisa menyebutkan pesannya apa.',
      benar: 'Perlakukan hasil uji sebagai petunjuk untuk pencarian lanjutan, dan cari penguat di luar berkasnya seperti alat steganografi yang terpasang atau berkas aslinya.'
    }
  ],

  analogi: `Bayangkan kamu ingin menyelundupkan pesan keluar dari sebuah gedung yang dijaga.

**Kriptografi** adalah menulis pesan dalam **sandi rahasia**, lalu menyerahkannya ke penjaga. Ia melihat kertas penuh huruf aneh dan langsung tahu **ada sesuatu yang disembunyikan**. Ia mungkin tidak bisa membacanya — tetapi ia bisa **menyitanya**, atau menahanmu sampai kamu bicara.

**Steganografi** adalah menyerahkan **resep masakan yang benar-benar biasa**. Penjaga membacanya, merasa bosan, dan melambaikan tangan menyuruhmu lewat. Ia bahkan **tidak tahu ada yang perlu dicari**.

Sekarang tiga cara menyembunyikannya, dari yang paling ceroboh.

**Trailer append** adalah menulis pesan rahasia **di halaman belakang resep itu**.

Penjaga membaca resepnya, sampai di kata "sajikan hangat", dan berhenti — karena resepnya memang sudah selesai. Ia tidak membalik halaman.

Ini **berhasil**, tetapi hanya karena penjaganya tidak memeriksa. Siapa pun yang **menimbang buku resep itu** akan langsung tahu ada halaman tambahan. Tidak ada kepintaran di dalamnya sama sekali.

**LSB** jauh lebih halus: kamu menulis resep asli, tetapi **menggeser satu huruf** di sana-sini dengan pola tertentu. "Garam" jadi "Garam" dengan spasi ganda. Titik yang sedikit lebih tebal.

Resepnya **tetap terbaca sempurna**. Penjaga membacanya dan tidak merasa ada yang aneh, karena memang **tidak ada yang aneh untuk dibaca**.

Tetapi inilah kelemahannya: kalau ada yang **menghitung** — berapa spasi ganda, di mana saja titik tebalnya — polanya akan **menonjol**. Tulisan manusia tidak pernah serapi atau seteratur itu dalam hal-hal yang tidak ia pikirkan.

**Mata tidak melihatnya. Hitungan melihatnya.**

Dan sekarang bagian yang paling penting untuk dipahami: **kenapa menyalin ulang resep itu memusnahkan pesannya**.

Bayangkan penjaga menyuruh juru tulis **menyalin ulang** resepmu dengan tulisan rapi sebelum diloloskan. Juru tulis itu tidak berniat merusak apa pun — ia justru **membereskan**: spasi ganda jadi tunggal, titik dirapikan, huruf disamakan.

Setiap hal yang ia bereskan adalah **tempat pesanmu berada**.

Itulah **menyimpan sebagai JPEG**. Ia tidak menghapus pesanmu dengan sengaja. Ia cuma merapikan hal-hal kecil yang menurutnya **tidak ada artinya** — dan kamu menaruh seluruh pesanmu tepat di sana.`,

  latihan: [
    'Jelaskan perbedaan steganografi dan kriptografi, dan jelaskan kenapa keduanya sering dipakai bersamaan.',
    'Sebutkan arti istilah cover, payload, dan stego object.',
    'Jelaskan cara kerja teknik trailer append, dan tulis langkah paling cepat untuk membongkarnya.',
    'Hitung kapasitas LSB untuk gambar 1280 x 720 RGB dengan 1 bit per kanal, dan nyatakan hasilnya dalam kilobyte.',
    'Jelaskan kenapa LSB hanya bekerja pada format lossless, dengan mengaitkannya pada kuantisasi DCT yang kamu pelajari di Teknologi Multimedia.',
    'Jelaskan gagasan di balik uji ketimpangan pasangan nilai, dan kenapa penyisipan LSB membuat pasangan itu jadi setara.',
    'Jelaskan kenapa uji statistik sebaiknya dilakukan per bagian gambar, bukan atas seluruh gambar sekaligus.',
    'Jelaskan batas kemampuan pemeriksa terhadap steganografi yang dikerjakan dengan baik, dan sebutkan dari mana penemuan biasanya datang di dunia nyata.'
  ]
});
