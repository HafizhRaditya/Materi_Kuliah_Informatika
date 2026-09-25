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

   Tiga topik tambahan (pemulihan berkas terhapus & carving,
   garis waktu & pemalsuan cap waktu, verifikasi citra &
   laporan) disusun dari REFERENSI LUAR -- pokok bahasan RPS
   Forensik Digital kampus lain. Keterangan lengkapnya ada di
   kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Dua topik pertama berkas ini berasal dari projek kuliah
   sendiri. Tiga topik berikutnya disusun dari pokok bahasan
   yang berulang di beberapa RPS Forensik Digital kampus lain
   -- pemulihan data terhapus, forensik disk, validasi dan
   penyajian bukti -- ditambah pengetahuan umum.

   Seluruh "disk", berkas, dan cap waktu di program bawah
   adalah data TIRUAN yang dibangkitkan program itu sendiri,
   dengan penanda format (magic number) yang persis format
   aslinya. Tidak ada data orang sungguhan di dalamnya.
   ------------------------------------------------------------ */

TOPICS.push({
  id: 'forensik-carving',
  judul: 'Pemulihan Berkas Terhapus, Carving & Ruang Sisa',
  kategori: 'forensik',
  tag: ['berkas terhapus', 'file carving', 'magic number', 'fragmentasi', 'slack space', 'forensik disk'],
  ringkas: 'Menghapus berkas tidak menghapus isinya — cuma mencoret namanya dari daftar.',

  fungsi: `**Memulihkan berkas yang sudah dihapus, bahkan setelah daftar berkasnya ikut hilang — dan tahu kapan hasil pemulihan tidak boleh dipercaya.**

Terpakai di:

- **Pemeriksaan forensik disk** — berkas terhapus sering justru yang paling relevan, karena itulah yang ingin disembunyikan
- **Menyelamatkan data sendiri** setelah salah hapus atau salah format — prinsipnya sama, dan langkah pertamanya juga sama: berhenti menulis ke disk itu
- **Memahami kenapa "hapus" tidak aman** untuk data sensitif, dan apa yang sebenarnya dibutuhkan untuk menghapus dengan benar
- **Tugas akhir** bertema forensik digital atau pemulihan data
- **Menjual atau membuang perangkat lama** tanpa membocorkan isinya

Yang paling mengubah cara berpikir: **menghapus berkas cuma mencoret namanya dari daftar dan menandai tempatnya boleh dipakai ulang.** Isinya tidak disentuh sama sekali. Selama tempat itu belum ditimpa, berkasnya bisa dipulihkan utuh — dan hash-nya membuktikan tidak ada satu byte pun yang berubah.

Dan satu peringatan yang sama pentingnya: **hasil carving bisa salah tanpa terlihat salah.** Berkas yang terpecah di disk menghasilkan pemulihan yang berisi potongan berkas lain. Hash adalah satu-satunya cara memastikannya.`,
  praktik: {
    tujuan: 'Kamu bisa menjelaskan apa yang terjadi di disk saat berkas dihapus, memulihkan berkas dengan carving berdasarkan penanda format, memverifikasi hasilnya dengan hash, dan menemukan sisa data di ruang sisa klaster.',
    alat: ['Python untuk membuat citra disk tiruan dan carving', 'Flashdisk bekas yang boleh dikosongkan (untuk percobaan nyata)', 'Alat carving terbuka seperti PhotoRec atau Foremost bila tersedia'],
    langkah: [
      { judul: 'Berhenti menulis ke disk sebelum apa pun',
        isi: `Kalau berkas terhapus yang sedang dicari, setiap berkas baru yang ditulis ke disk itu bisa menimpanya — termasuk log dan berkas sementara yang ditulis sistem operasi sendiri.

Cabut medianya, dan kerjakan semuanya dari **citra** hasil salinan, bukan dari media aslinya.` },
      { judul: 'Buat citra disk sektor demi sektor',
        isi: `Salin seluruh isi media — termasuk ruang yang "kosong" — dengan alat seperti \`dd\` atau alat akuisisi forensik, melalui penghambat tulis.

Salinan berkas biasa tidak cukup: ia cuma menyalin berkas yang terlihat, dan justru melewatkan berkas terhapus serta ruang sisa.` },
      { judul: 'Periksa tabel direktori lebih dulu',
        isi: `Selama tabel direktorinya masih ada, entri berkas terhapus biasanya masih bisa dibaca — lengkap dengan nama, ukuran, dan lokasinya.

Ini cara pemulihan yang paling andal, karena lokasi dan ukurannya pasti. Carving baru dipakai bila tabelnya sudah hilang.` },
      { judul: 'Lakukan carving berdasarkan penanda format',
        isi: `Cari penanda kepala dan ekor tiap format di seluruh citra: \`FF D8 FF\` dan \`FF D9\` untuk JPEG, \`89 50 4E 47\` dan \`IEND\` untuk PNG, \`%PDF-\` dan \`%%EOF\` untuk PDF.

Perhatikan yang tidak bisa dipulihkan dengan cara ini: berkas teks biasa, yang tidak punya penanda apa pun.` },
      { judul: 'Verifikasi setiap hasil dengan hash',
        isi: `Kalau ada salinan pembanding — cadangan, lampiran surel, berkas di perangkat lain — bandingkan hash-nya.

Hasil yang hash-nya tidak cocok **tidak boleh** disebut "berkas yang dipulihkan" di laporan. Ia mungkin berisi potongan berkas lain.` },
      { judul: 'Waspadai fragmentasi',
        isi: `Kalau ukuran hasil carving jauh lebih besar dari yang wajar untuk formatnya, curigai fragmentasi: berkasnya terpecah dan carving naif ikut mengambil isi berkas lain di tengahnya.

Buka hasilnya. Gambar yang rusak mulai dari tengah hampir pasti terfragmentasi di titik itu.` },
      { judul: 'Periksa ruang sisa di ujung klaster',
        isi: `Untuk tiap berkas, bandingkan ukurannya dengan ukuran klaster yang ditempatinya. Selisihnya adalah ruang sisa, dan isinya bisa memuat potongan berkas lama.

Alat forensik menampilkan ruang sisa secara terpisah. Penjelajah berkas biasa tidak pernah menampilkannya.` },
      { judul: 'Hapus dengan benar saat kamu yang membuang perangkat',
        isi: `Untuk disk magnetik, menimpa seluruh isi sekali sudah cukup. Untuk SSD, gunakan perintah penghapusan aman bawaan perangkat atau enkripsi penuh sejak awal — penimpaan biasa tidak menjamin menyentuh seluruh sel karena SSD memindahkan data secara internal.

Yang tidak cukup untuk keduanya: menghapus berkas lalu mengosongkan tempat sampah.` }
    ],
    cek: [
      'Kamu bekerja dari citra disk, bukan dari media aslinya',
      'Setiap berkas hasil pemulihanmu disertai hash dan keterangan apakah ia cocok dengan pembanding',
      'Kamu bisa menjelaskan kenapa berkas teks biasa sulit dipulihkan dengan carving',
      'Kamu tahu cara menghapus data dengan benar untuk disk magnetik dan untuk SSD'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — carving dari penanda, dan kapan hasilnya berbohong',

  konsep: `Bab ini dimulai dari fakta yang mengejutkan banyak orang: di hampir semua sistem berkas, **menghapus tidak menghapus**.

**Apa yang terjadi saat berkas dihapus**

Disk tiruan berisi empat berkas, lalu dua di antaranya dihapus:

| Berkas | Di penjelajah | Di tabel direktori | Di area data |
|---|---|---|---|
| foto.jpg | tidak terlihat | TERHAPUS | byte masih ada, hash cocok |
| denah.png | terlihat | aktif | utuh |
| laporan.pdf | tidak terlihat | TERHAPUS | byte masih ada, hash cocok |
| catatan.txt | terlihat | aktif | utuh |

Menghapus cuma mengubah **status entri** di tabel dan menandai klasternya **boleh dipakai ulang**. Isinya tidak disentuh sama sekali.

Alasannya sederhana: menulis nol ke seluruh isi berkas butuh waktu, dan sistem berkas tidak mau membuang waktu untuk sesuatu yang toh akan ditimpa kemudian. Menghapus berkas 4 GB selesai seketika justru karena isinya tidak disentuh.

Akibatnya: selama klasternya belum dipakai berkas lain, berkas "terhapus" bisa dipulihkan **utuh**, dan hash-nya membuktikan tidak ada satu byte pun yang berubah.

**Carving: tanpa daftar sama sekali**

Sekarang tabel direktorinya dihapus total — seperti format cepat. Tidak ada lagi nama, ukuran, maupun lokasi berkas.

Carving mencari berkas dari **isinya sendiri**: setiap format punya penanda kepala dan ekor yang tetap.

| Format | Kepala | Ekor |
|---|---|---|
| JPEG | \`FF D8 FF\` | \`FF D9\` |
| PNG | \`89 50 4E 47 0D 0A 1A 0A\` | \`IEND\` + CRC |
| PDF | \`%PDF-\` | \`%%EOF\` |

Hasil pada disk tiruan:

| Jenis | Offset | Ukuran | Cocok dengan asli? |
|---|---|---|---|
| JPEG | 2048 | 2606 | ya — foto.jpg |
| PNG | 5120 | 1920 | ya — denah.png |
| PDF | 7168 | 3116 | ya — laporan.pdf |

Ketiga berkas berformat biner pulih utuh, dikenali dari penandanya, bukan dari nama.

Perhatikan yang **tidak** kembali: **catatan.txt**. Teks biasa tidak punya penanda kepala atau ekor, jadi carving tidak tahu di mana ia mulai dan berakhir. Dan **nama** berkas hilang untuk semuanya — nama cuma pernah ada di tabel.

**Fragmentasi: carving naif bisa berbohong**

Carving naif mengandaikan berkas tersimpan **bersambung**. Sekarang foto.jpg disimpan di klaster 4–5, lalu klaster 10; klaster 6–9 berisi berkas lain.

| Hasil carving naif | |
|---|---|
| ukuran | 6.702 byte (asli 2.606) |
| hash cocok | **tidak** |
| potongan berkas lain yang ikut terbawa | 1.024 |

Hasilnya berisi isi berkas lain di tengahnya — ukurannya salah, hash-nya salah, dan gambarnya rusak mulai dari titik potong.

Yang berbahaya: **hasil yang salah ini tetap diawali penanda JPEG yang sah dan diakhiri penanda JPEG yang sah.** Secara bentuk ia tampak seperti berkas yang berhasil dipulihkan.

Karena itu hash bukan cuma bukti integritas; ia juga **pemeriksa hasil pemulihan**. Hasil yang hash-nya tidak cocok dengan pembanding tidak boleh disebut "berkas yang dipulihkan" di laporan.

**Ruang sisa (slack space)**

Berkas disimpan dalam satuan klaster. Kalau klasternya 1.024 byte dan berkasnya 697 byte, ada **327 byte** di ujung klaster yang bukan milik berkas itu.

Ruang itu tidak dikosongkan. Pada contoh di program, isinya:

\`surel: mawar123. PIN ATM 4821, kata sandi surel: mawar123. P\`

— potongan berkas lama yang pernah menempati klaster yang sama.

Penjelajah berkas tidak pernah menampilkannya, karena ia berada di luar ukuran berkas. Tetapi citra disk yang diambil sektor demi sektor merekamnya, dan alat forensik menampilkannya terpisah.

**Setelah ditimpa**

Begitu klaster laporan.pdf ditimpa nol, carving PDF menemukan **0 berkas**. Tidak ada yang tersisa untuk dipulihkan dengan perangkat lunak.

Dari sini dua kaidah kerja yang paling penting:

- **hentikan penulisan ke disk** sebelum apa pun — setiap berkas baru yang ditulis bisa menimpa berkas terhapus yang sedang dicari
- **jangan menyalakan komputer tersangka lalu "melihat-lihat sebentar"** — sistem operasi menulis log, berkas sementara, dan cache setiap detik

Satu catatan untuk SSD: perintah TRIM membuat SSD mengosongkan blok yang ditandai terhapus di latar belakang, sehingga peluang pemulihan di SSD jauh lebih kecil daripada di disk magnetik — kadang dalam hitungan menit setelah penghapusan.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "PENANDA = [\n    ('JPEG', b'\\xff\\xd8\\xff', b'\\xff\\xd9'),\n    ('PNG',  b'\\x89PNG\\r\\n\\x1a\\n', b'IEND\\xaeB`\\x82'),\n    ('PDF',  b'%PDF-', b'%%EOF\\n'),\n]\n\ndef carve(citra):\n    temuan = []\n    for jenis, kepala, ekor in PENANDA:\n        mulai = 0\n        while True:\n            i = citra.find(kepala, mulai)\n            if i < 0: break\n            j = citra.find(ekor, i + len(kepala))\n            if j < 0: break\n            temuan.append((jenis, i, citra[i: j + len(ekor)]))\n            mulai = j + len(ekor)\n    return temuan",
      penjelasan: `Lima belas baris yang memulihkan berkas tanpa tahu nama, ukuran, maupun lokasinya — dan satu andaian tersembunyi yang membuatnya bisa salah.

**Mulai dari kenapa ini mungkin sama sekali.**

Hampir setiap format berkas biner dimulai dengan beberapa byte yang tetap, supaya program yang membukanya bisa memastikan ia sedang membaca format yang benar. Byte itu disebut **magic number**, dan topik bukti digital sudah memakainya untuk membongkar berkas yang ekstensinya dipalsukan.

Carving memakai penanda yang sama untuk tujuan berbeda: mencari **di mana** sebuah berkas dimulai di tengah lautan byte tanpa daftar.

Beberapa format juga punya **penanda akhir**. JPEG berakhir dengan \`FF D9\`. PNG berakhir dengan potongan \`IEND\`. PDF berakhir dengan \`%%EOF\`. Dengan kepala dan ekor, batas berkas bisa ditentukan.

**Sekarang baca kodenya.**

Untuk setiap format, cari kepalanya. Dari situ, cari ekor **pertama** sesudahnya. Potong di antara keduanya. Lanjutkan mencari dari sesudah ekor itu.

Perhatikan kata **pertama**. Di situ andaian tersembunyinya.

**Andaian pertama: berkasnya bersambung.**

Kode ini mengandaikan seluruh isi berkas tersimpan berurutan, dari kepala sampai ekor, tanpa ada yang menyela. Pada disk yang baru dan jarang dipakai, andaian itu sering benar.

Pada disk yang sudah lama dipakai, sistem berkas sering memecah berkas besar ke beberapa tempat karena tidak ada ruang kosong bersambung yang cukup. Itu fragmentasi. Dan carving naif tidak punya cara mengetahuinya — ia mengambil kepala di satu tempat dan ekor di tempat lain, lalu ikut mengambil apa pun yang ada di antaranya.

Pada contoh di program, hasilnya 6.702 byte, padahal aslinya 2.606. Seribu lebih potongan berkas lain ikut terbawa.

**Andaian kedua: ekor pertama adalah ekor yang benar.**

JPEG bisa memuat gambar kecil (thumbnail) di dalamnya, lengkap dengan penanda \`FF D9\` sendiri. Carving naif akan berhenti di ekor thumbnail itu dan memotong gambar utamanya.

PDF bisa punya beberapa \`%%EOF\` bila disunting berulang kali, karena setiap penyuntingan menambahkan bagian baru di belakang.

Alat carving sungguhan menangani ini dengan memahami struktur di dalam formatnya — membaca panjang tiap bagian dari kepalanya alih-alih mencari ekor secara buta.

**Andaian ketiga: tidak ada kebetulan.**

Tiga byte \`FF D8 FF\` bisa muncul secara kebetulan di tengah data lain. Carving akan menganggapnya kepala JPEG dan menghasilkan "berkas" yang isinya sampah.

**Dari ketiga andaian itu keluar satu kaidah yang tidak bisa ditawar:** setiap hasil carving adalah **kandidat**, bukan temuan. Ia harus diverifikasi — dengan hash terhadap pembanding kalau ada, atau setidaknya dengan dibuka dan diperiksa apakah isinya masuk akal.

Laporan forensik yang menyebut "ditemukan 340 gambar hasil pemulihan" tanpa menyebut berapa yang terverifikasi sedang menyatakan sesuatu yang belum ia ketahui.`
    },
    {
      bahasa: 'python',
      kode: "KLASTER = 1024\nklaster = bytearray(KLASTER)\n\nlama = (b'PIN ATM 4821, kata sandi surel: mawar123. ' * 30)[:KLASTER]\nklaster[:] = lama              # berkas lama pernah di sini\n\nbaru = b'Rapat hari Senin pukul 09.00 di ruang 3.\\n' * 17\nklaster[:len(baru)] = baru     # berkas baru, lebih pendek\n\nsisa = bytes(klaster[len(baru):])\n# ukuran berkas baru : 697 byte\n# ruang sisa         : 327 byte\n# isi ruang sisa     : 'surel: mawar123. PIN ATM 4821, ...'",
      penjelasan: `Tiga langkah yang menjelaskan kenapa data yang sudah "ditimpa" kadang belum sepenuhnya hilang.

**Mulai dari satuan penyimpanan.**

Sistem berkas tidak menyimpan berkas byte demi byte. Ia menyimpan dalam **klaster** — blok berukuran tetap, misalnya 4 KB. Berkas 100 byte tetap menempati satu klaster penuh; berkas 5 KB menempati dua.

Alasannya efisiensi: mencatat lokasi setiap byte akan membuat tabel direktorinya sebesar datanya sendiri. Mencatat per klaster jauh lebih ringkas.

Akibatnya, hampir setiap berkas meninggalkan **sisa** di klaster terakhirnya — ruang antara akhir berkas dan akhir klaster.

**Sekarang lihat urutan kejadiannya di kode.**

Pertama, klaster itu pernah berisi berkas lama — di contoh, catatan berisi PIN dan kata sandi. Berkas itu dihapus, dan klasternya ditandai boleh dipakai ulang. Isinya, seperti bagian pertama topik ini tunjukkan, tidak disentuh.

Lalu berkas baru ditulis ke klaster yang sama. Berkas baru ini **lebih pendek** — 697 byte di klaster 1.024 byte.

Sistem berkas menulis 697 byte itu. Lalu **berhenti**. Ia tidak mengosongkan 327 byte sisanya, karena untuk apa? Byte itu bukan bagian dari berkas baru, dan tidak akan pernah dibaca oleh program yang membuka berkas baru.

Hasilnya: 327 byte terakhir klaster itu masih berisi potongan berkas lama. Kata sandi dan PIN yang pengguna kira sudah hilang bersama berkas lamanya.

**Kenapa ini penting bagi pemeriksa.**

Ruang sisa adalah salah satu tempat paling berharga di citra disk, justru karena **tidak ada yang tahu ia ada**. Pengguna yang berusaha menghapus jejak biasanya menghapus berkas, mengosongkan tempat sampah, mungkin bahkan menimpa ruang kosong. Ruang sisa di ujung berkas yang masih aktif hampir tidak pernah tersentuh.

Tetapi potongan dari ruang sisa punya **keterbatasan** yang harus disebut di laporan: ia fragmen, tanpa nama berkas, tanpa cap waktu, dan tanpa kepastian kapan ditulis. Ia bisa menunjukkan bahwa suatu isi **pernah** ada di disk itu, tetapi hampir tidak pernah bisa menunjukkan kapan atau oleh siapa.

**Dan kenapa ini penting bagi siapa pun yang membuang perangkat.**

Kalau kamu menjual laptop bekas setelah "menghapus semuanya", berkas-berkasmu yang sudah dihapus masih bisa dipulihkan dengan carving, dan potongan berkas yang lebih lama lagi masih ada di ruang sisa berkas yang tersisa.

Menghapus berkas tidak cukup. Memformat ulang dengan format cepat tidak cukup — yang dihapus cuma tabelnya.

Yang cukup: menimpa **seluruh** isi disk, atau — lebih baik — memakai **enkripsi penuh** sejak awal. Disk yang terenkripsi penuh cukup dibuang kuncinya, dan seluruh isinya, termasuk berkas terhapus dan ruang sisa, berubah menjadi byte acak yang tidak bisa dibaca siapa pun.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Forensik disk: berkas terhapus, carving, slack
# ============================================
import hashlib

SEKTOR = 512
KLASTER = 2 * SEKTOR            # 1 klaster = 2 sektor = 1024 byte

def sha(b):
    return hashlib.sha256(bytes(b)).hexdigest()[:16]

# --------------------------------------------
# Berkas tiruan dengan PENANDA ASLI tiap format
# (isinya sintetis, tetapi kepala & ekornya persis format nyata)
# --------------------------------------------
def buat_jpeg(n):
    tubuh = bytes((i * 37 + 11) % 251 for i in range(n))
    tubuh = tubuh.replace(b"\xff\xd9", b"\xff\x00")   # jangan ada ekor palsu
    return b"\xff\xd8\xff\xe0" + tubuh + b"\xff\xd9"

def buat_png(n):
    tubuh = bytes((i * 53 + 7) % 241 for i in range(n))
    return (b"\x89PNG\r\n\x1a\n" + tubuh
            + b"\x00\x00\x00\x00IEND\xaeB\`\x82")

def buat_pdf(n):
    tubuh = (b"isi laporan keuangan rahasia " * (n // 29 + 1))[:n]
    return b"%PDF-1.4\n" + tubuh + b"\n%%EOF\n"

ASLI = {
    "foto.jpg":    buat_jpeg(2600),
    "denah.png":   buat_png(1900),
    "laporan.pdf": buat_pdf(3100),
    "catatan.txt": b"daftar belanja: beras, telur, minyak\n" * 20,
}

# --------------------------------------------
# 1. Susun "disk": tabel direktori + area data
# --------------------------------------------
UKURAN = 64 * KLASTER
disk = bytearray(UKURAN)
DIREKTORI = []                  # (nama, klaster awal, ukuran, status)
klaster_bebas = 2               # klaster 0-1 untuk tabel

for nama, isi in ASLI.items():
    awal = klaster_bebas
    disk[awal * KLASTER: awal * KLASTER + len(isi)] = isi
    jumlah = -(-len(isi) // KLASTER)        # pembulatan ke atas
    klaster_bebas += jumlah
    DIREKTORI.append([nama, awal, len(isi), "aktif"])

print("--- isi disk sebelum ada yang dihapus ---")
print("  " + "nama".ljust(14) + "klaster".rjust(8) + "ukuran".rjust(8)
      + "  SHA-256 (16 digit awal)")
for nama, awal, uk, st in DIREKTORI:
    print("  " + nama.ljust(14) + str(awal).rjust(8) + str(uk).rjust(8)
          + "  " + sha(ASLI[nama]))

# --------------------------------------------
# 2. Menghapus = menandai entri, BUKAN menghapus isi
# --------------------------------------------
print("")
print("--- 'hapus' foto.jpg dan laporan.pdf ---")
for e in DIREKTORI:
    if e[0] in ("foto.jpg", "laporan.pdf"):
        e[3] = "TERHAPUS"
print("  Yang terlihat di penjelajah berkas:")
for nama, awal, uk, st in DIREKTORI:
    if st == "aktif":
        print("    " + nama)
print("")
print("  Yang sebenarnya ada di tabel direktori:")
for nama, awal, uk, st in DIREKTORI:
    print("    " + nama.ljust(14) + st)
print("")
print("  Dan yang ada di area data:")
for nama, awal, uk, st in DIREKTORI:
    if st != "TERHAPUS":
        continue
    isi = disk[awal * KLASTER: awal * KLASTER + uk]
    utuh = sha(isi) == sha(ASLI[nama])
    print("    " + nama.ljust(14) + "byte masih ada, SHA-256 cocok: "
          + ("YA" if utuh else "TIDAK"))
print("")
print("  Menghapus cuma mengubah status entri di tabel, dan")
print("  menandai klasternya boleh DIPAKAI ULANG. Isinya tidak")
print("  disentuh sama sekali -- karena menulis nol ke seluruh")
print("  isi berkas butuh waktu, dan sistem berkas tidak mau")
print("  membuang waktu untuk sesuatu yang toh akan ditimpa.")
print("")
print("  Jadi selama klasternya belum dipakai berkas lain,")
print("  berkas 'terhapus' bisa dipulihkan UTUH, dan hash-nya")
print("  membuktikan tidak ada satu byte pun yang berubah.")

# --------------------------------------------
# 3. Carving: tabel direktori pun sudah hilang
# --------------------------------------------
print("")
print("--- carving: memulihkan TANPA tabel direktori ---")
disk[0: 2 * KLASTER] = bytes(2 * KLASTER)       # 'format cepat'
print("  Tabel direktori dihapus total (format cepat).")
print("  Tidak ada lagi nama, ukuran, maupun lokasi berkas.")
print("")
PENANDA = [
    ("JPEG", b"\xff\xd8\xff", b"\xff\xd9"),
    ("PNG",  b"\x89PNG\r\n\x1a\n", b"IEND\xaeB\`\x82"),
    ("PDF",  b"%PDF-", b"%%EOF\n"),
]

def carve(citra):
    temuan = []
    for jenis, kepala, ekor in PENANDA:
        mulai = 0
        while True:
            i = citra.find(kepala, mulai)
            if i < 0:
                break
            j = citra.find(ekor, i + len(kepala))
            if j < 0:
                break
            temuan.append((jenis, i, bytes(citra[i: j + len(ekor)])))
            mulai = j + len(ekor)
    return temuan

hasil = carve(disk)
peta_hash = {sha(v): k for k, v in ASLI.items()}
print("  " + "jenis".ljust(6) + "offset".rjust(8) + "ukuran".rjust(8)
      + "  cocok dengan asli?")
for jenis, off, isi in hasil:
    nama = peta_hash.get(sha(isi))
    print("  " + jenis.ljust(6) + str(off).rjust(8) + str(len(isi)).rjust(8)
          + "  " + ("YA -> " + nama if nama else "TIDAK"))
print("")
print("  Ketiga berkas berformat biner pulih utuh -- dikenali dari")
print("  PENANDA kepala dan ekornya, bukan dari nama.")
print("")
print("  Perhatikan yang TIDAK kembali: catatan.txt. Teks biasa")
print("  tidak punya penanda kepala atau ekor, jadi carving tidak")
print("  tahu di mana ia mulai dan berakhir. Nama berkas juga")
print("  hilang untuk semuanya -- nama cuma ada di tabel.")

# --------------------------------------------
# 4. Berkas terfragmentasi: carving naif gagal
# --------------------------------------------
print("")
print("--- kalau berkasnya terpecah (fragmentasi) ---")
disk2 = bytearray(32 * KLASTER)
foto = ASLI["foto.jpg"]
potong = 2 * KLASTER
bagian1, bagian2 = foto[:potong], foto[potong:]
disk2[4 * KLASTER: 4 * KLASTER + len(bagian1)] = bagian1
# klaster 6-9 diisi berkas lain, sisa foto di klaster 10
pengganggu = b"LOG " * (4 * KLASTER // 4)
disk2[6 * KLASTER: 10 * KLASTER] = pengganggu
disk2[10 * KLASTER: 10 * KLASTER + len(bagian2)] = bagian2
print("  foto.jpg disimpan di klaster 4-5, lalu klaster 10;")
print("  klaster 6-9 berisi berkas lain.")
print("")
naif = [h for h in carve(disk2) if h[0] == "JPEG"][0][2]
print("  carving naif (kepala sampai ekor pertama):")
print("    ukuran hasil : " + str(len(naif)) + " byte  (asli "
      + str(len(foto)) + ")")
print("    SHA-256 cocok: " + ("YA" if sha(naif) == sha(foto) else "TIDAK"))
sisip = naif.count(b"LOG ")
print("    potongan 'LOG ' dari berkas lain yang terbawa: " + str(sisip))
print("")
print("  Carving naif mengandaikan berkas tersimpan BERSAMBUNG.")
print("  Kalau terpecah, hasilnya berisi potongan berkas lain di")
print("  tengahnya -- ukurannya salah, hash-nya salah, dan")
print("  gambarnya rusak mulai dari titik potong.")
print("")
print("  Karena itu hash bukan cuma bukti integritas; ia juga")
print("  PEMERIKSA hasil pemulihan. Hasil yang hash-nya tidak")
print("  cocok dengan salinan pembanding tidak boleh disebut")
print("  'berkas yang dipulihkan' di laporan.")

# --------------------------------------------
# 5. Ruang sisa (slack space)
# --------------------------------------------
print("")
print("--- ruang sisa: sisa berkas lama di ujung klaster ---")
klaster = bytearray(KLASTER)
lama = (b"PIN ATM 4821, kata sandi surel: mawar123. " * 30)[:KLASTER]
klaster[:] = lama                          # berkas lama pernah di sini
baru = b"Rapat hari Senin pukul 09.00 di ruang 3.\n" * 17
klaster[:len(baru)] = baru                 # berkas baru, lebih pendek
sisa = bytes(klaster[len(baru):])
print("  ukuran klaster      : " + str(KLASTER) + " byte")
print("  ukuran berkas baru  : " + str(len(baru)) + " byte")
print("  ruang sisa          : " + str(len(sisa)) + " byte")
print("")
print("  isi ruang sisa (awal) :")
print("    " + sisa[:60].decode("ascii", "replace"))
print("")
print("  Berkas baru cuma mengisi " + str(len(baru)) + " dari "
      + str(KLASTER) + " byte klasternya.")
print("  Sisanya TIDAK dikosongkan -- dan masih memuat potongan")
print("  berkas lama yang pernah menempati klaster itu.")
print("")
print("  Penjelajah berkas tidak pernah menampilkannya, karena")
print("  ia berada di luar ukuran berkas. Tetapi citra disk yang")
print("  diambil sektor demi sektor merekamnya.")

# --------------------------------------------
# 6. Kapan pemulihan benar-benar mustahil
# --------------------------------------------
print("")
print("--- setelah DITIMPA ---")
disk3 = bytearray(disk)                     # salinan disk bagian 3
lap = ASLI["laporan.pdf"]
i = disk3.find(b"%PDF-")
disk3[i: i + len(lap)] = bytes(len(lap))    # ditimpa nol
sisa_pdf = [h for h in carve(disk3) if h[0] == "PDF"]
print("  klaster laporan.pdf ditimpa nol")
print("  hasil carving PDF   : " + str(len(sisa_pdf)) + " berkas")
print("")
print("  Begitu klasternya ditimpa, tidak ada yang tersisa untuk")
print("  dipulihkan dengan perangkat lunak. Itu sebabnya urutan")
print("  kerja forensik dimulai dengan MENGHENTIKAN penulisan ke")
print("  disk -- setiap berkas baru yang ditulis bisa menimpa")
print("  berkas terhapus yang sedang dicari.")
print("")
print("  Dan itu juga sebabnya menyalakan komputer tersangka lalu")
print("  'melihat-lihat sebentar' adalah kesalahan: sistem operasi")
print("  menulis log, berkas sementara, dan cache setiap detik.")` },
  output: `--- isi disk sebelum ada yang dihapus ---
  nama           klaster  ukuran  SHA-256 (16 digit awal)
  foto.jpg             2    2606  9271036bfea124cc
  denah.png            5    1920  4989941fe4d0d3fc
  laporan.pdf          7    3116  5f2e70c945dca96e
  catatan.txt         11     740  2c46b48f2614f082

--- 'hapus' foto.jpg dan laporan.pdf ---
  Yang terlihat di penjelajah berkas:
    denah.png
    catatan.txt

  Yang sebenarnya ada di tabel direktori:
    foto.jpg      TERHAPUS
    denah.png     aktif
    laporan.pdf   TERHAPUS
    catatan.txt   aktif

  Dan yang ada di area data:
    foto.jpg      byte masih ada, SHA-256 cocok: YA
    laporan.pdf   byte masih ada, SHA-256 cocok: YA

  Menghapus cuma mengubah status entri di tabel, dan
  menandai klasternya boleh DIPAKAI ULANG. Isinya tidak
  disentuh sama sekali -- karena menulis nol ke seluruh
  isi berkas butuh waktu, dan sistem berkas tidak mau
  membuang waktu untuk sesuatu yang toh akan ditimpa.

  Jadi selama klasternya belum dipakai berkas lain,
  berkas 'terhapus' bisa dipulihkan UTUH, dan hash-nya
  membuktikan tidak ada satu byte pun yang berubah.

--- carving: memulihkan TANPA tabel direktori ---
  Tabel direktori dihapus total (format cepat).
  Tidak ada lagi nama, ukuran, maupun lokasi berkas.

  jenis   offset  ukuran  cocok dengan asli?
  JPEG      2048    2606  YA -> foto.jpg
  PNG       5120    1920  YA -> denah.png
  PDF       7168    3116  YA -> laporan.pdf

  Ketiga berkas berformat biner pulih utuh -- dikenali dari
  PENANDA kepala dan ekornya, bukan dari nama.

  Perhatikan yang TIDAK kembali: catatan.txt. Teks biasa
  tidak punya penanda kepala atau ekor, jadi carving tidak
  tahu di mana ia mulai dan berakhir. Nama berkas juga
  hilang untuk semuanya -- nama cuma ada di tabel.

--- kalau berkasnya terpecah (fragmentasi) ---
  foto.jpg disimpan di klaster 4-5, lalu klaster 10;
  klaster 6-9 berisi berkas lain.

  carving naif (kepala sampai ekor pertama):
    ukuran hasil : 6702 byte  (asli 2606)
    SHA-256 cocok: TIDAK
    potongan 'LOG ' dari berkas lain yang terbawa: 1024

  Carving naif mengandaikan berkas tersimpan BERSAMBUNG.
  Kalau terpecah, hasilnya berisi potongan berkas lain di
  tengahnya -- ukurannya salah, hash-nya salah, dan
  gambarnya rusak mulai dari titik potong.

  Karena itu hash bukan cuma bukti integritas; ia juga
  PEMERIKSA hasil pemulihan. Hasil yang hash-nya tidak
  cocok dengan salinan pembanding tidak boleh disebut
  'berkas yang dipulihkan' di laporan.

--- ruang sisa: sisa berkas lama di ujung klaster ---
  ukuran klaster      : 1024 byte
  ukuran berkas baru  : 697 byte
  ruang sisa          : 327 byte

  isi ruang sisa (awal) :
    surel: mawar123. PIN ATM 4821, kata sandi surel: mawar123. P

  Berkas baru cuma mengisi 697 dari 1024 byte klasternya.
  Sisanya TIDAK dikosongkan -- dan masih memuat potongan
  berkas lama yang pernah menempati klaster itu.

  Penjelajah berkas tidak pernah menampilkannya, karena
  ia berada di luar ukuran berkas. Tetapi citra disk yang
  diambil sektor demi sektor merekamnya.

--- setelah DITIMPA ---
  klaster laporan.pdf ditimpa nol
  hasil carving PDF   : 0 berkas

  Begitu klasternya ditimpa, tidak ada yang tersisa untuk
  dipulihkan dengan perangkat lunak. Itu sebabnya urutan
  kerja forensik dimulai dengan MENGHENTIKAN penulisan ke
  disk -- setiap berkas baru yang ditulis bisa menimpa
  berkas terhapus yang sedang dicari.

  Dan itu juga sebabnya menyalakan komputer tersangka lalu
  'melihat-lihat sebentar' adalah kesalahan: sistem operasi
  menulis log, berkas sementara, dan cache setiap detik.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Baca entri terhapus di tabel direktori', waktu: 'O(e)', memori: 'e = jumlah entri, paling cepat dan paling andal' },
      { operasi: 'Carving satu format di seluruh citra', waktu: 'O(N)', memori: 'N = ukuran citra, sekali telusur per penanda' },
      { operasi: 'Carving semua format', waktu: 'O(N . f)', memori: 'f = jumlah format yang dicari' },
      { operasi: 'Verifikasi hasil dengan hash', waktu: 'O(ukuran berkas)', memori: 'per kandidat hasil carving' },
      { operasi: 'Pulihkan berkas terfragmentasi', waktu: 'jauh lebih mahal', memori: 'perlu memahami struktur format' }
    ],
    intuisi: `Carving pada dasarnya satu telusur panjang: baca seluruh citra dan cari pola. \`O(N)\` terdengar murah, tetapi N di sini bisa ratusan gigabyte — dan membaca disk sebesar itu memakan jam, bukan detik.

Karena itu alat carving sungguhan mencari **semua** penanda sekaligus dalam satu kali baca, bukan satu telusur per format seperti di contoh program. Biaya membaca disk jauh lebih besar daripada biaya mencocokkan pola, jadi yang dihemat adalah jumlah kali membaca.

Baris terakhir yang paling sulit, dan di situlah beda alat sederhana dan alat profesional: memulihkan berkas yang terpecah menuntut memahami isi formatnya sampai cukup dalam untuk tahu di mana potongan berikutnya kemungkinan berada.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengira berkas yang dihapus dan tempat sampah yang dikosongkan sudah hilang dari disk.',
      kenapa: 'Menghapus hanya mengubah status entri di tabel direktori dan menandai klasternya boleh dipakai ulang, sementara isinya tidak disentuh. Selama klaster itu belum ditimpa, berkasnya bisa dipulihkan utuh.',
      benar: 'Timpa seluruh isi disk atau pakai enkripsi penuh sejak awal bila data harus benar-benar hilang.'
    },
    {
      salah: 'Menyalakan komputer tersangka untuk melihat-lihat isinya sebelum membuat citra.',
      kenapa: 'Sistem operasi menulis log, berkas sementara, dan cache setiap saat, dan setiap penulisan bisa menimpa klaster berkas terhapus yang sedang dicari. Kerusakan itu tidak bisa dibatalkan dan juga mengubah cap waktu barang bukti.',
      benar: 'Buat citra disk sektor demi sektor melalui penghambat tulis lebih dulu, lalu kerjakan seluruh pemeriksaan dari citranya.'
    },
    {
      salah: 'Menyalin berkas-berkas yang terlihat sebagai pengganti citra disk.',
      kenapa: 'Salinan berkas biasa hanya membawa berkas aktif dan melewatkan berkas terhapus, ruang kosong, serta ruang sisa di ujung klaster. Justru bagian yang dilewatkan itu sering memuat bukti terpenting.',
      benar: 'Ambil citra sektor demi sektor yang mencakup seluruh media, termasuk ruang yang tampak kosong.'
    },
    {
      salah: 'Menyebut setiap hasil carving sebagai berkas yang berhasil dipulihkan.',
      kenapa: 'Carving naif mengandaikan berkas tersimpan bersambung, sehingga berkas terfragmentasi menghasilkan keluaran yang diawali dan diakhiri penanda sah tetapi berisi potongan berkas lain di tengahnya. Bentuknya tampak benar sementara isinya salah.',
      benar: 'Perlakukan hasil carving sebagai kandidat, verifikasi dengan hash terhadap pembanding atau periksa isinya, dan laporkan jumlah yang terverifikasi secara terpisah.'
    },
    {
      salah: 'Berharap bisa memulihkan berkas teks biasa dengan carving.',
      kenapa: 'Teks biasa tidak punya penanda kepala maupun ekor, sehingga carving tidak tahu di mana berkasnya dimulai dan berakhir. Yang bisa dilakukan hanya mencari potongan kata kunci di seluruh citra.',
      benar: 'Pulihkan teks dari entri tabel direktori selagi masih ada, dan gunakan pencarian kata kunci pada citra bila tabelnya sudah hilang.'
    },
    {
      salah: 'Mengabaikan ruang sisa karena tidak termasuk isi berkas mana pun.',
      kenapa: 'Ruang antara akhir berkas dan akhir klasternya tidak dikosongkan saat berkas baru ditulis, sehingga bisa memuat potongan berkas lama yang sudah lama dihapus. Bagian ini hampir tidak pernah tersentuh oleh upaya menghapus jejak.',
      benar: 'Periksa ruang sisa secara terpisah dengan alat forensik, dan laporkan keterbatasannya karena potongan itu tidak membawa nama maupun cap waktu.'
    },
    {
      salah: 'Mengandalkan penimpaan biasa untuk menghapus data di SSD.',
      kenapa: 'SSD memindahkan data antar sel secara internal untuk meratakan keausan, sehingga menimpa sebuah berkas tidak menjamin sel lama yang memuat isinya ikut tertimpa. Sisa data bisa tertinggal di sel yang tidak lagi terjangkau sistem berkas.',
      benar: 'Gunakan perintah penghapusan aman bawaan perangkat atau enkripsi penuh sejak awal untuk SSD.'
    }
  ],

  analogi: `Bayangkan sebuah **perpustakaan** dengan katalog kartu di depan dan buku-buku di rak.

Ketika sebuah buku "dihapus" dari koleksi, petugas tidak mengambil bukunya dari rak. Ia cuma **mencoret kartunya** di katalog dan menulis "tempat ini boleh dipakai buku baru".

Bukunya tetap di rak. Siapa pun yang tahu di mana mencarinya masih bisa membacanya — sampai suatu hari buku baru datang dan diletakkan di tempat itu.

Itu menghapus berkas.

**Sekarang katalognya terbakar.**

Tidak ada lagi daftar judul, pengarang, atau nomor rak. Apakah buku-bukunya hilang?

Tidak. Kamu bisa berjalan menyusuri rak dan mengenali buku dari **bentuknya**: kamus selalu tebal dengan huruf abjad di punggungnya, atlas selalu lebar dan tipis, novel punya sampul bergambar.

Kamu tidak tahu judulnya lagi — judul cuma ada di katalog. Tetapi kamu bisa mengumpulkan kembali buku-bukunya.

Itu carving. Dan perhatikan: **lembaran kertas lepas** tanpa sampul tidak bisa dikenali dengan cara ini. Itu berkas teks biasa.

**Sekarang masalahnya.**

Sebuah kamus pernah dipindah separuh ke rak lain karena raknya penuh. Kamu menemukan sampul depannya di rak 4, lalu berjalan sampai menemukan sampul belakang pertama — di rak 10.

Kamu mengumpulkan semua yang ada di antara keduanya dan menyebutnya "kamus yang dipulihkan". Isinya: separuh kamus, empat rak buku resep, dan separuh kamus lagi.

Sampul depan dan belakangnya asli. Isinya tidak.

**Terakhir, soal rak yang dipakai ulang.**

Sebuah rak dulu berisi ensiklopedia sepuluh jilid. Ensiklopedianya dikeluarkan, lalu rak itu diisi tujuh buku baru.

Tiga jilid terakhir ensiklopedia masih di ujung rak. Tidak ada di katalog — katalog cuma mencatat tujuh buku baru. Tidak ada pengunjung yang melihatnya, karena mereka cuma mengambil buku yang tercantum.

Tetapi petugas yang memeriksa setiap rak dari ujung ke ujung akan menemukannya.

Dan kalau kamu benar-benar ingin ensiklopedianya hilang, kamu tidak cukup mencoret kartunya. Kamu harus **mengeluarkan setiap jilidnya** dari seluruh rak — atau sejak awal menulis semua buku dalam bahasa rahasia, sehingga membuang kamusnya sudah cukup.`,

  latihan: [
    'Jelaskan dengan urutan langkah apa yang terjadi di tabel direktori dan di area data ketika sebuah berkas dihapus.',
    'Buat citra disk tiruan berisi tiga berkas biner dan satu berkas teks, hapus dua di antaranya, lalu pulihkan dari entri tabelnya.',
    'Hapus tabel direktori citra itu, lalu pulihkan berkas biner dengan carving dan verifikasi masing-masing dengan hash.',
    'Tunjukkan kenapa berkas teks tidak bisa dipulihkan dengan carving berdasarkan penanda, dan usulkan cara lain untuk mencarinya.',
    'Buat satu berkas terfragmentasi di citra tiruanmu, jalankan carving naif, lalu jelaskan dari ukuran dan hash kenapa hasilnya salah.',
    'Cari satu format berkas lain yang punya penanda kepala dan ekor, lalu tambahkan ke daftar penanda programmu.',
    'Hitung ruang sisa untuk lima berkas dengan ukuran berbeda pada klaster 4096 byte.',
    'Tulis potongan berkas lama ke sebuah klaster, timpa dengan berkas baru yang lebih pendek, lalu tampilkan isi ruang sisanya.',
    'Timpa klaster salah satu berkas dengan nol, lalu tunjukkan bahwa carving tidak lagi menemukannya.',
    'Bandingkan cara menghapus data dengan benar untuk disk magnetik, SSD, dan disk yang terenkripsi penuh, beserta alasannya.'
  ]
});


TOPICS.push({
  id: 'forensik-timeline',
  judul: 'Analisis Garis Waktu & Jejak Pemalsuan Waktu',
  kategori: 'forensik',
  tag: ['garis waktu', 'MACB', 'zona waktu', 'UTC', 'resolusi cap waktu', 'timestomping', '$STANDARD_INFORMATION', '$FILE_NAME'],
  ringkas: 'Selisih tujuh jam antara WIB dan UTC cukup untuk membuat berkas tampak dibuat setelah pelakunya logout.',

  fungsi: `**Menyusun urutan kejadian dari banyak sumber yang mencatat waktu dengan cara berbeda — dan mengenali cap waktu yang sengaja dipalsukan.**

Terpakai di:

- **Merekonstruksi insiden** — kapan penyusup masuk, apa yang dilakukannya, dan kapan keluar
- **Menggabungkan log** dari peladen, aplikasi, dan perangkat yang zona waktunya berbeda — pekerjaan sehari-hari administrator sistem, bukan cuma pemeriksa forensik
- **Menjawab pertanyaan "mana yang lebih dulu"** di laporan insiden atau di sidang
- **Mengenali upaya menghapus jejak** yang mengubah cap waktu berkas
- **Menulis kode yang menyimpan waktu dengan benar** — hampir setiap bug zona waktu di aplikasi berasal dari hal yang sama dengan bab ini

Kesalahan yang paling merusak: **menggabungkan sumber tanpa menyamakan zona waktunya.** Pada contoh di topik ini, selisih tujuh jam antara WIB dan UTC membuat berkas tampak dibuat setelah pelakunya logout, dan data tampak diunggah sebelum dibaca — dua kejadian yang mustahil, dari data yang seluruhnya benar.

Dan kesalahan pemeriksa pemula yang paling sering: **menganggap waktu dibuat yang lebih baru dari waktu diubah sebagai tanda pemalsuan.** Untuk berkas salinan, itu justru wajar.`,
  praktik: {
    tujuan: 'Kamu bisa menggabungkan kejadian dari beberapa sumber ke satu garis waktu UTC, memperhitungkan resolusi cap waktu tiap sumber, mengenali tanda pemalsuan cap waktu tanpa terjebak kejanggalan yang wajar, dan menuliskan rekonstruksi yang memisahkan fakta dari tafsiran.',
    alat: ['Python dengan modul datetime', 'Beberapa sumber waktu nyata: log sistem, riwayat peramban, metadata berkas', 'Alat penampil metadata NTFS bila tersedia'],
    langkah: [
      { judul: 'Catat zona waktu setiap sumber sebelum membaca isinya',
        isi: `Untuk setiap sumber, tulis: zona waktu apa yang dipakai sumbernya, dan zona apa yang dipakai **alat** yang menampilkannya.

Keduanya sering berbeda. NTFS menyimpan UTC, tetapi banyak alat menampilkannya dalam waktu setempat. Kalau yang kamu catat cuma tampilannya, kamu mencatat hal yang salah.` },
      { judul: 'Ubah semuanya ke UTC sebelum mengurutkan',
        isi: `Satu garis waktu, satu zona. UTC dipilih bukan karena lebih benar, melainkan karena tidak punya waktu musim panas dan tidak berubah antar negara.

Setelah semua di UTC, baru urutkan. Mengurutkan angka jam dari zona yang berbeda menghasilkan cerita yang mustahil.` },
      { judul: 'Periksa apakah ceritanya masuk akal secara fisik',
        isi: `Berkas tidak mungkin dibaca sebelum dibuat. Unggahan tidak mungkin terjadi sebelum datanya ada. Login harus mendahului kegiatan di akun itu.

Kalau garis waktumu melanggar urutan fisik seperti ini, jangan dulu menyimpulkan ada pemalsuan. Periksa zona waktu dan jam sistem tiap sumber lebih dulu.` },
      { judul: 'Catat resolusi cap waktu tiap sumber',
        isi: `FAT32 mencatat waktu diubah dengan resolusi 2 detik dan dalam waktu setempat. NTFS 100 nanodetik dalam UTC. Log aplikasi sering cuma sampai detik.

Kesimpulan "A sebelum B" hanya sah kalau selisihnya melampaui resolusi sumber yang paling kasar.` },
      { judul: 'Bandingkan dua salinan waktu di NTFS',
        isi: `NTFS menyimpan cap waktu di \`$STANDARD_INFORMATION\` (mudah diubah alat biasa) dan di \`$FILE_NAME\` (diperbarui sistem berkas sendiri).

Kalau waktu dibuat di SI jauh lebih tua daripada di FN, itu tanda kuat seseorang mengubah SI.` },
      { judul: 'Periksa pecahan detiknya',
        isi: `NTFS mencatat sampai 100 nanodetik. Waktu yang terjadi secara alami hampir tidak pernah jatuh tepat di detik bulat.

Cap waktu dengan pecahan detik nol semua pada sistem berkas yang teliti adalah tanda yang layak dicatat — tetapi bukan bukti sendirian, karena berkas dari kamera atau FAT memang bulat.` },
      { judul: 'Jangan salah tafsir berkas salinan',
        isi: `Berkas yang disalin mendapat waktu dibuat **baru**, sementara waktu diubahnya ikut dibawa dari aslinya. Jadi dibuat setelah diubah adalah hal wajar untuk salinan.

Satu kejanggalan bukan bukti. Pola beberapa kejanggalan yang saling menguatkan yang layak dilaporkan.` },
      { judul: 'Tulis rekonstruksinya dengan batas yang jelas',
        isi: `Susun kejadian dengan selisih waktu dari kejadian pertama. Lalu tulis terpisah: apa yang **ditunjukkan** data, dan apa yang **tidak** bisa ditunjukkannya.

Garis waktu membuktikan urutan dan jarak kejadian. Ia tidak membuktikan siapa yang duduk di depan komputer.` }
    ],
    cek: [
      'Setiap sumber di garis waktumu tercatat zona waktu aslinya dan zona tampilan alatnya',
      'Garis waktumu tidak memuat urutan yang mustahil secara fisik',
      'Kesimpulan urutanmu memperhitungkan resolusi cap waktu sumber yang paling kasar',
      'Kamu tidak menandai berkas salinan sebagai pemalsuan hanya karena waktu dibuatnya lebih baru'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — satu data yang benar, dua cerita yang berbeda',

  konsep: `Hampir setiap pemeriksaan forensik berujung pada satu pertanyaan: **apa yang terjadi, dan dalam urutan apa?** Menjawabnya butuh menggabungkan waktu dari banyak sumber — dan setiap sumber punya caranya sendiri mencatat waktu.

**Satu berkas, empat cap waktu**

| Huruf | Nama | Artinya |
|---|---|---|
| M | Modified | isi berkas terakhir diubah |
| A | Accessed | berkas terakhir dibaca |
| C | Changed | metadata berubah — nama, izin |
| B | Born | berkas dibuat **di volume ini** |

Kata kuncinya di baris terakhir: **di volume ini**. Berkas yang disalin dari flashdisk mendapat waktu Born **baru** saat disalin, sementara waktu Modified-nya ikut dibawa dari aslinya.

Akibatnya, Born yang lebih baru daripada Modified adalah hal **wajar** untuk berkas salinan. Salah menafsirkannya sebagai pemalsuan adalah kesalahan pemeriksa pemula yang paling sering.

Satu catatan jujur: waktu Accessed sering tidak bisa diandalkan. Banyak sistem operasi modern menonaktifkan atau menunda pembaruannya demi kinerja, sehingga membaca berkas belum tentu mengubahnya.

**Tiga sumber, tanpa menyamakan zona**

Enam kejadian dari tiga sumber — peramban dan log masuk diekspor dalam **UTC**, cap waktu sistem berkas ditampilkan alat pemeriksa dalam **WIB** (UTC+7).

Diurutkan dari angka jamnya apa adanya:

| Jam | Sumber | Kejadian |
|---|---|---|
| 06:41:10 | peramban | unduh alat_pemindai.zip |
| 06:52:03 | log masuk | login admin |
| 07:03:12 | peramban | unggah ke file-share-gratis.example |
| 07:05:30 | log masuk | logout admin |
| 13:41:55 | sistem berkas | alat_pemindai.zip dibuat |
| 13:58:40 | sistem berkas | data_pelanggan.csv dibaca |

Menurut urutan ini, berkas zip baru muncul di disk jauh setelah admin logout — dan data diunggah sebelum dibaca. **Dua kejadian yang mustahil.**

**Setelah semuanya diubah ke UTC:**

| Jam UTC | Sumber | Kejadian |
|---|---|---|
| 06:41:10 | peramban | unduh alat_pemindai.zip |
| 06:41:55 | sistem berkas | alat_pemindai.zip dibuat |
| 06:52:03 | log masuk | login admin |
| 06:58:40 | sistem berkas | data_pelanggan.csv dibaca |
| 07:03:12 | peramban | unggah ke file-share-gratis.example |
| 07:05:30 | log masuk | logout admin |

Sekarang ceritanya masuk akal: unduh alat, berkas zip muncul di disk 45 detik kemudian, login, data dibaca, diunggah ke luar, logout.

**Tidak ada satu angka pun yang berubah** selain zona waktunya. NTFS menyimpan UTC, tetapi alat pemeriksanya menampilkan dalam waktu setempat. Selisih tujuh jam itu cukup untuk membalik seluruh cerita.

Pelajarannya: catat zona waktu **setiap** sumber — termasuk zona tampilan alat pemeriksanya — sebelum menggabungkan.

**Resolusi cap waktu**

| Sistem berkas | Resolusi | Zona |
|---|---|---|
| FAT32 | 2 detik (Modified) | setempat, tanpa keterangan zona |
| NTFS | 100 nanodetik | UTC |
| ext4 | 1 nanodetik | UTC |
| exFAT | 10 milidetik | setempat + selisih zona |

Berkas yang disimpan pukul 13:41:55 ke flashdisk FAT32 tercatat sebagai **13:41:54**.

Dua kejadian berselang satu detik bisa tercatat dengan waktu yang sama di FAT32, atau urutannya tampak terbalik terhadap sumber lain yang lebih teliti. Kesimpulan "A sebelum B" hanya sah kalau selisihnya **lebih besar dari resolusi sumber yang paling kasar**. Laporan yang mengabaikannya bisa dibantah di sidang oleh siapa pun yang paham sistem berkas.

**Timestomping: cap waktu yang diubah sengaja**

NTFS menyimpan cap waktu di dua tempat: \`$STANDARD_INFORMATION\` (SI), yang mudah diubah dengan alat biasa, dan \`$FILE_NAME\` (FN), yang diperbarui oleh sistem berkas sendiri.

| Berkas | Hasil pemeriksaan |
|---|---|
| laporan_q1.docx | tidak ada kejanggalan |
| foto_rapat.jpg | Born setelah Modified — **wajar untuk salinan** |
| **pemindai.exe** | **SI Born jauh lebih tua dari FN Born; pecahan detik nol** |
| catatan.txt | tidak ada kejanggalan |

pemindai.exe menunjukkan **dua tanda sekaligus**:

- Born di SI tercatat 2024, tetapi Born di FN tercatat pada hari kejadian
- pecahan detiknya nol semua, padahal NTFS mencatat sampai 100 nanodetik — waktu yang terjadi alami hampir tidak pernah jatuh tepat di detik bulat

Pelaku mengubah SI supaya alatnya tampak sudah ada sejak 2024. Tetapi FN diperbarui sistem berkas sendiri, dan alat pengubah waktu yang umum tidak menyentuhnya.

Dan perhatikan foto_rapat.jpg: ia juga punya Born setelah Modified, dan itu **wajar** — ia disalin dari kamera pada hari kejadian, membawa waktu Modified aslinya dari November. **Satu kejanggalan bukan bukti; pola beberapa kejanggalan yang saling menguatkan yang layak dilaporkan.**

**Dari garis waktu ke rekonstruksi**

| Sejak awal | Kejadian |
|---|---|
| +00:00 | unduh alat_pemindai.zip |
| +00:45 | alat_pemindai.zip dibuat |
| +10:53 | login admin |
| +17:30 | data_pelanggan.csv dibaca |
| +22:02 | unggah ke luar |
| +24:20 | logout admin |

Seluruh kejadian berlangsung dalam 24 menit.

Garis waktu **tidak membuktikan siapa** yang duduk di depan komputer — ia membuktikan urutan dan jarak antar kejadian. Menyambungkannya ke seseorang butuh bukti lain: rekaman kamera, kartu akses, atau keterangan saksi. Laporan yang baik memisahkan dengan tegas apa yang **ditunjukkan** data dan apa yang **disimpulkan** pemeriksa.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "from datetime import datetime, timedelta, timezone\nWIB = timezone(timedelta(hours=7))\nUTC = timezone.utc\n\ndef t(s, zona):\n    return datetime.strptime(s, '%Y-%m-%d %H:%M:%S').replace(tzinfo=zona)\n\n# SALAH: mengurutkan teks jamnya apa adanya\nnaif = sorted(KEJADIAN, key=lambda k: k[1])\n\n# BENAR: setiap waktu membawa zonanya, lalu dibandingkan\nbenar = sorted(KEJADIAN, key=lambda k: t(k[1], k[2]))\n\n# naif  : zip 'dibuat' SETELAH logout  -> mustahil\n# benar : zip dibuat 45 detik setelah diunduh",
      penjelasan: `Dua baris pengurutan yang terlihat hampir sama, dan menghasilkan dua cerita yang berlawanan dari data yang seluruhnya benar.

**Baris naif mengurutkan teks.** \`k[1]\` adalah string seperti \`"2026-03-14 13:41:55"\`. Mengurutkan string berformat tanggal-jam memang memberi urutan waktu yang benar — **asalkan semuanya dalam zona yang sama**. Di sini tidak.

Hasilnya: berkas zip "dibuat" pukul 13:41:55, jauh setelah admin logout pukul 07:05:30. Padahal 13:41:55 itu WIB, dan dalam UTC ia adalah 06:41:55 — empat puluh lima detik setelah unduhan, sebelum login.

**Baris benar mengurutkan waktu yang tahu zonanya.** Fungsi \`t()\` memasang zona ke setiap waktu sebelum dibandingkan. Python lalu membandingkan **titik waktu yang sebenarnya**, bukan angka di jam dinding.

Perhatikan bahwa tidak ada konversi manual di kode ini — tidak ada "kurangi tujuh jam". Waktu yang membawa zonanya bisa dibandingkan langsung, dan Python yang mengurus selisihnya. Ini jauh lebih aman daripada menghitung selisih dengan tangan, karena tidak ada kesempatan salah arah (menambah padahal harus mengurangi) atau salah besar selisih.

**Kenapa kesalahan ini begitu mudah terjadi.**

Karena **setiap data di dalamnya benar**. Log peramban benar mencatat 06:41:10 UTC. Alat pemeriksa benar menampilkan 13:41:55 WIB. Tidak ada yang rusak, tidak ada yang dipalsukan.

Yang salah cuma satu hal: waktu-waktu itu **disalin tanpa zonanya** ke satu tabel, lalu diperlakukan sebagai angka yang bisa dibandingkan. Begitu zona terlepas dari angkanya, informasinya hilang, dan tidak ada cara memulihkannya dari tabel itu saja.

**Dan kenapa ini bukan cuma masalah forensik.**

Bug zona waktu adalah salah satu bug paling umum di aplikasi mana pun:

- jadwal rapat yang muncul tujuh jam meleset untuk peserta di kota lain
- laporan harian yang memotong transaksi di tengah malam UTC, bukan tengah malam WIB — sehingga penjualan pukul 06.30 pagi masuk ke hari kemarin
- pengingat yang terkirim dua kali atau tidak terkirim sama sekali saat pergantian waktu musim panas di negara lain

Semuanya berasal dari hal yang sama: menyimpan waktu **tanpa** zonanya.

Kaidah yang mencegah hampir semuanya: **simpan dalam UTC, bawa zonanya ke mana pun, dan ubah ke waktu setempat hanya di saat ditampilkan kepada manusia.** Itu persis yang dilakukan NTFS — dan persis kenapa alat pemeriksa yang menampilkannya dalam WIB bisa menjebak pemeriksa yang lupa bahwa itu cuma tampilan.`
    },
    {
      bahasa: 'python',
      kode: "for nama, si_born, fn_born, si_mod in BERKAS:\n    tanda = []\n    if urai(si_born) < urai(fn_born) - timedelta(seconds=1):\n        tanda.append('SI Born JAUH lebih tua dari FN Born')\n    if si_born.endswith('.0000000') and si_mod.endswith('.0000000'):\n        tanda.append('pecahan detik semuanya nol')\n    if urai(si_born) > urai(si_mod):\n        tanda.append('Born setelah Modified (wajar untuk SALINAN)')\n\n# pemindai.exe  : dua tanda -> layak dilaporkan\n# foto_rapat.jpg: Born setelah Modified -> WAJAR (salinan)",
      penjelasan: `Tiga pemeriksaan, dan pelajaran terpentingnya ada di yang ketiga — yang **bukan** tanda pemalsuan.

**Pemeriksaan pertama: SI lawan FN.**

NTFS menyimpan cap waktu setiap berkas di dua atribut. \`$STANDARD_INFORMATION\` adalah yang ditampilkan penjelajah berkas dan yang bisa diubah lewat antarmuka pemrograman biasa sistem operasi. \`$FILE_NAME\` diperbarui oleh sistem berkas sendiri pada kejadian tertentu — terutama saat berkas dibuat, diganti nama, atau dipindah.

Alat pengubah cap waktu yang umum bekerja lewat antarmuka biasa, sehingga cuma mengubah SI. FN tetap membawa waktu yang sebenarnya.

Jadi kalau SI Born menyatakan 2024 dan FN Born menyatakan hari kejadian, keduanya tidak mungkin sama-sama benar — dan yang lebih sulit dipalsukan adalah FN.

Satu kejujuran penting: alat yang lebih canggih **bisa** mengubah FN juga, misalnya dengan memindahkan berkas setelah mengubah SI. Jadi FN yang cocok dengan SI bukan bukti tidak ada pemalsuan. Pemeriksaan ini menangkap pemalsuan yang umum, bukan semua pemalsuan.

**Pemeriksaan kedua: pecahan detik.**

NTFS mencatat waktu sampai satuan 100 nanodetik. Berkas yang dibuat oleh kejadian alami — seseorang menyimpan dokumen, program menulis log — hampir tidak pernah jatuh tepat di detik bulat. Peluang tujuh angka pecahan semuanya nol adalah satu banding sepuluh juta.

Tetapi alat pengubah cap waktu sering meminta pengguna mengetik tanggal dan jam, dan pengguna mengetik detik bulat. Hasilnya: pecahan nol.

Batasnya harus disebut: berkas dari kamera, dari arsip ZIP, atau yang pernah melewati FAT32 memang punya waktu bulat, karena sumbernya tidak mencatat pecahan. Tanda ini berguna **hanya** untuk berkas yang seharusnya lahir di NTFS.

**Pemeriksaan ketiga, dan kenapa ia sengaja dilabeli "wajar".**

Born setelah Modified terdengar mustahil — bagaimana berkas diubah sebelum ia ada?

Tetapi Born adalah waktu berkas lahir **di volume ini**. Ketika foto disalin dari kamera, ia lahir di laptop pada saat penyalinan, sementara waktu Modified-nya dibawa dari kamera — dari saat foto diambil, berbulan sebelumnya.

Jadi setiap berkas salinan akan menunjukkan pola ini. Pada disk yang aktif dipakai, ribuan berkas bisa menunjukkannya.

Pemeriksa yang menandai pola ini sebagai pemalsuan akan menghasilkan ribuan "temuan" palsu — dan laporannya akan kehilangan kepercayaan begitu satu saja dijelaskan sebagai salinan biasa.

**Dari ketiganya keluar satu kaidah kerja**: yang dilaporkan bukan kejanggalan tunggal, melainkan **pola beberapa kejanggalan yang saling menguatkan**. pemindai.exe punya dua tanda independen, dan keduanya menunjuk ke arah yang sama. foto_rapat.jpg punya satu pola, dan pola itu punya penjelasan yang wajar.

Dan tafsiran "kemungkinan besar dipalsukan" tetap harus ditulis sebagai **tafsiran** — disertai dasarnya, dan disertai keterbatasannya: data ini tidak menunjukkan siapa yang mengubahnya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Analisis garis waktu & jejak pemalsuan waktu
# ============================================
from datetime import datetime, timedelta, timezone

WIB = timezone(timedelta(hours=7))
UTC = timezone.utc

def t(s, zona):
    return datetime.strptime(s, "%Y-%m-%d %H:%M:%S").replace(tzinfo=zona)

# --------------------------------------------
# 1. Satu berkas, empat cap waktu
# --------------------------------------------
print("--- MACB: empat cap waktu yang berbeda arti ---")
MACB = [
    ("M", "Modified", "isi berkas terakhir diubah"),
    ("A", "Accessed", "berkas terakhir dibaca"),
    ("C", "Changed",  "metadata berubah (nama, izin)"),
    ("B", "Born",     "berkas dibuat di volume INI"),
]
for h, n, arti in MACB:
    print("  " + h + "  " + n.ljust(10) + arti)
print("")
print("  'Born' berarti dibuat di volume ini, bukan dibuat")
print("  pertama kali di dunia. Berkas yang disalin dari flashdisk")
print("  mendapat waktu Born BARU saat disalin, sementara waktu")
print("  Modified-nya ikut dibawa dari aslinya.")
print("")
print("  Akibatnya: Born yang LEBIH BARU dari Modified adalah hal")
print("  yang wajar untuk berkas salinan. Itu bukan tanda")
print("  pemalsuan -- dan salah menafsirkannya adalah kesalahan")
print("  pemeriksa pemula yang paling sering.")

# --------------------------------------------
# 2. Tiga sumber, tiga zona waktu
# --------------------------------------------
print("")
print("--- menggabungkan tiga sumber tanpa menyamakan zona ---")
# (sumber, waktu apa adanya, zona asli sumber, kejadian)
KEJADIAN = [
    ("peramban",   "2026-03-14 06:41:10", UTC, "unduh alat_pemindai.zip"),
    ("sistem berkas", "2026-03-14 13:41:55", WIB,
     "alat_pemindai.zip dibuat (Born)"),
    ("log masuk",  "2026-03-14 06:52:03", UTC, "login admin dari 10.0.0.23"),
    ("sistem berkas", "2026-03-14 13:58:40", WIB,
     "data_pelanggan.csv dibaca (Accessed)"),
    ("peramban",   "2026-03-14 07:03:12", UTC,
     "unggah ke file-share-gratis.example"),
    ("log masuk",  "2026-03-14 07:05:30", UTC, "logout admin"),
]

print("  URUTAN NAIF (angka jam dibandingkan apa adanya):")
naif = sorted(KEJADIAN, key=lambda k: k[1])
for s, w, z, k in naif:
    print("    " + w[11:] + "  " + s.ljust(14) + k)
print("")
print("  Menurut urutan ini, berkas zip BARU dibuat di disk jauh")
print("  setelah admin logout -- dan pelanggan diunggah sebelum")
print("  datanya dibaca. Dua kejadian yang mustahil.")

print("")
print("  URUTAN BENAR (semua diubah ke UTC dulu):")
benar = sorted(KEJADIAN, key=lambda k: t(k[1], k[2]))
for s, w, z, k in benar:
    utc = t(w, z).astimezone(UTC).strftime("%H:%M:%S")
    print("    " + utc + "  " + s.ljust(14) + k)
print("")
print("  Sekarang ceritanya masuk akal: unduh alat, berkas zip")
print("  muncul di disk 45 detik kemudian, login admin, data")
print("  pelanggan dibaca, diunggah ke luar, lalu logout.")
print("")
print("  Tidak ada yang berubah selain zona waktunya. NTFS")
print("  menyimpan UTC, tetapi alat yang dipakai mengekspor cap")
print("  waktunya MENAMPILKANNYA dalam waktu setempat (WIB, UTC+7),")
print("  sementara log dan peramban diekspor dalam UTC. Selisih")
print("  tujuh jam itu cukup untuk membalik seluruh cerita.")
print("")
print("  Pelajarannya: catat zona waktu SETIAP sumber -- termasuk")
print("  zona tampilan alat pemeriksanya -- sebelum menggabungkan.")

# --------------------------------------------
# 3. Resolusi waktu berbeda tiap sistem berkas
# --------------------------------------------
print("")
print("--- resolusi cap waktu tiap sistem berkas ---")
RESOLUSI = [
    ("FAT32",  "2 detik (Modified)", "waktu SETEMPAT, tanpa zona"),
    ("NTFS",   "100 nanodetik",      "UTC"),
    ("ext4",   "1 nanodetik",        "UTC"),
    ("exFAT",  "10 milidetik",       "setempat + selisih zona"),
]
for a, b, c in RESOLUSI:
    print("  " + a.ljust(8) + b.ljust(21) + c)
print("")
asli = t("2026-03-14 13:41:55", WIB)
fat = asli.replace(second=asli.second - asli.second % 2)
print("  Berkas disimpan pukul 13:41:55 ke flashdisk FAT32")
print("  tercatat sebagai        : " + fat.strftime("%H:%M:%S"))
print("")
print("  Dua kejadian yang berselang satu detik bisa tercatat")
print("  dengan waktu yang SAMA di FAT32, atau urutannya tampak")
print("  terbalik terhadap sumber lain yang lebih teliti.")
print("")
print("  Kesimpulan seperti 'A terjadi sebelum B' hanya sah kalau")
print("  selisihnya lebih besar dari resolusi sumber yang paling")
print("  kasar. Laporan yang mengabaikannya bisa dibantah di")
print("  sidang oleh pembela yang paham sistem berkas.")

# --------------------------------------------
# 4. Mendeteksi cap waktu yang dipalsukan
# --------------------------------------------
print("")
print("--- timestomping: cap waktu yang diubah sengaja ---")
# Di NTFS ada dua salinan waktu: $STANDARD_INFORMATION (SI) yang
# mudah diubah alat biasa, dan $FILE_NAME (FN) yang diperbarui
# oleh sistem berkas sendiri.
BERKAS = [
    # nama, SI born, FN born, SI modified (dengan pecahan detik)
    # ditampilkan dalam WIB oleh alat pemeriksa, seperti bagian 2
    ("laporan_q1.docx",   "2026-01-10 09:12:44.3817264",
                          "2026-01-10 09:12:44.3817264",
                          "2026-03-02 15:40:11.9021137"),
    ("foto_rapat.jpg",    "2026-03-14 13:41:55.2230045",
                          "2026-03-14 13:41:55.2230045",
                          "2025-11-20 08:15:03.0000000"),
    ("pemindai.exe",      "2024-06-01 10:00:00.0000000",
                          "2026-03-14 13:42:07.6610932",
                          "2024-06-01 10:00:00.0000000"),
    ("catatan.txt",       "2026-02-27 20:05:31.1188420",
                          "2026-02-27 20:05:31.1188420",
                          "2026-03-10 07:22:49.5051016"),
]

def urai(s):
    return datetime.strptime(s[:26], "%Y-%m-%d %H:%M:%S.%f")

print("  " + "berkas".ljust(17) + "periksa")
for nama, si_b, fn_b, si_m in BERKAS:
    tanda = []
    if urai(si_b) < urai(fn_b) - timedelta(seconds=1):
        tanda.append("SI Born JAUH lebih tua dari FN Born")
    if si_b.endswith(".0000000") and si_m.endswith(".0000000"):
        tanda.append("pecahan detik semuanya nol")
    if urai(si_b) > urai(si_m):
        tanda.append("Born setelah Modified (wajar untuk SALINAN)")
    print("  " + nama.ljust(17)
          + ("tidak ada kejanggalan" if not tanda else tanda[0]))
    for x in tanda[1:]:
        print("  " + "".ljust(17) + x)
print("")
print("  pemindai.exe menunjukkan DUA tanda sekaligus:")
print("    - Born di SI tercatat 2024, tetapi Born di FN tercatat")
print("      14 Maret 2026 -- hari kejadian.")
print("    - Pecahan detiknya nol semua, padahal NTFS mencatat")
print("      sampai 100 nanodetik. Waktu yang terjadi alami hampir")
print("      tidak pernah jatuh tepat di detik bulat.")
print("")
print("  Pelaku mengubah SI supaya alatnya tampak sudah ada sejak")
print("  2024. Tetapi FN diperbarui oleh sistem berkas sendiri,")
print("  dan alat pengubah waktu yang biasa tidak menyentuhnya.")
print("")
print("  foto_rapat.jpg juga punya Born setelah Modified -- dan")
print("  itu WAJAR: ia disalin dari kamera pada hari kejadian,")
print("  membawa waktu Modified aslinya dari November. Satu")
print("  kejanggalan bukan bukti; pola beberapa kejanggalan yang")
print("  saling menguatkan yang layak dilaporkan.")

# --------------------------------------------
# 5. Menyusun cerita dari garis waktu
# --------------------------------------------
print("")
print("--- dari garis waktu ke rekonstruksi kejadian ---")
awal = t("2026-03-14 06:41:10", UTC)
print("  " + "sejak awal".ljust(12) + "kejadian")
for s, w, z, k in benar:
    selisih = int((t(w, z) - awal).total_seconds())
    print("  " + ("+%02d:%02d" % (selisih // 60, selisih % 60)).ljust(12)
          + k)
print("")
lama = (t(benar[-1][1], benar[-1][2]) - awal).total_seconds() / 60
print("  (menit:detik) Seluruh kejadian berlangsung dalam "
      + ("%.0f" % lama) + " menit.")
print("")
print("  Garis waktu tidak membuktikan SIAPA yang duduk di depan")
print("  komputer -- ia cuma membuktikan urutan dan jarak antar")
print("  kejadian. Menyambungkannya ke seseorang butuh bukti lain:")
print("  rekaman kamera, kartu akses, atau pengakuan.")
print("")
print("  Laporan yang baik memisahkan dengan tegas apa yang")
print("  DITUNJUKKAN data dan apa yang DISIMPULKAN pemeriksa.")` },
  output: `--- MACB: empat cap waktu yang berbeda arti ---
  M  Modified  isi berkas terakhir diubah
  A  Accessed  berkas terakhir dibaca
  C  Changed   metadata berubah (nama, izin)
  B  Born      berkas dibuat di volume INI

  'Born' berarti dibuat di volume ini, bukan dibuat
  pertama kali di dunia. Berkas yang disalin dari flashdisk
  mendapat waktu Born BARU saat disalin, sementara waktu
  Modified-nya ikut dibawa dari aslinya.

  Akibatnya: Born yang LEBIH BARU dari Modified adalah hal
  yang wajar untuk berkas salinan. Itu bukan tanda
  pemalsuan -- dan salah menafsirkannya adalah kesalahan
  pemeriksa pemula yang paling sering.

--- menggabungkan tiga sumber tanpa menyamakan zona ---
  URUTAN NAIF (angka jam dibandingkan apa adanya):
    06:41:10  peramban      unduh alat_pemindai.zip
    06:52:03  log masuk     login admin dari 10.0.0.23
    07:03:12  peramban      unggah ke file-share-gratis.example
    07:05:30  log masuk     logout admin
    13:41:55  sistem berkas alat_pemindai.zip dibuat (Born)
    13:58:40  sistem berkas data_pelanggan.csv dibaca (Accessed)

  Menurut urutan ini, berkas zip BARU dibuat di disk jauh
  setelah admin logout -- dan pelanggan diunggah sebelum
  datanya dibaca. Dua kejadian yang mustahil.

  URUTAN BENAR (semua diubah ke UTC dulu):
    06:41:10  peramban      unduh alat_pemindai.zip
    06:41:55  sistem berkas alat_pemindai.zip dibuat (Born)
    06:52:03  log masuk     login admin dari 10.0.0.23
    06:58:40  sistem berkas data_pelanggan.csv dibaca (Accessed)
    07:03:12  peramban      unggah ke file-share-gratis.example
    07:05:30  log masuk     logout admin

  Sekarang ceritanya masuk akal: unduh alat, berkas zip
  muncul di disk 45 detik kemudian, login admin, data
  pelanggan dibaca, diunggah ke luar, lalu logout.

  Tidak ada yang berubah selain zona waktunya. NTFS
  menyimpan UTC, tetapi alat yang dipakai mengekspor cap
  waktunya MENAMPILKANNYA dalam waktu setempat (WIB, UTC+7),
  sementara log dan peramban diekspor dalam UTC. Selisih
  tujuh jam itu cukup untuk membalik seluruh cerita.

  Pelajarannya: catat zona waktu SETIAP sumber -- termasuk
  zona tampilan alat pemeriksanya -- sebelum menggabungkan.

--- resolusi cap waktu tiap sistem berkas ---
  FAT32   2 detik (Modified)   waktu SETEMPAT, tanpa zona
  NTFS    100 nanodetik        UTC
  ext4    1 nanodetik          UTC
  exFAT   10 milidetik         setempat + selisih zona

  Berkas disimpan pukul 13:41:55 ke flashdisk FAT32
  tercatat sebagai        : 13:41:54

  Dua kejadian yang berselang satu detik bisa tercatat
  dengan waktu yang SAMA di FAT32, atau urutannya tampak
  terbalik terhadap sumber lain yang lebih teliti.

  Kesimpulan seperti 'A terjadi sebelum B' hanya sah kalau
  selisihnya lebih besar dari resolusi sumber yang paling
  kasar. Laporan yang mengabaikannya bisa dibantah di
  sidang oleh pembela yang paham sistem berkas.

--- timestomping: cap waktu yang diubah sengaja ---
  berkas           periksa
  laporan_q1.docx  tidak ada kejanggalan
  foto_rapat.jpg   Born setelah Modified (wajar untuk SALINAN)
  pemindai.exe     SI Born JAUH lebih tua dari FN Born
                   pecahan detik semuanya nol
  catatan.txt      tidak ada kejanggalan

  pemindai.exe menunjukkan DUA tanda sekaligus:
    - Born di SI tercatat 2024, tetapi Born di FN tercatat
      14 Maret 2026 -- hari kejadian.
    - Pecahan detiknya nol semua, padahal NTFS mencatat
      sampai 100 nanodetik. Waktu yang terjadi alami hampir
      tidak pernah jatuh tepat di detik bulat.

  Pelaku mengubah SI supaya alatnya tampak sudah ada sejak
  2024. Tetapi FN diperbarui oleh sistem berkas sendiri,
  dan alat pengubah waktu yang biasa tidak menyentuhnya.

  foto_rapat.jpg juga punya Born setelah Modified -- dan
  itu WAJAR: ia disalin dari kamera pada hari kejadian,
  membawa waktu Modified aslinya dari November. Satu
  kejanggalan bukan bukti; pola beberapa kejanggalan yang
  saling menguatkan yang layak dilaporkan.

--- dari garis waktu ke rekonstruksi kejadian ---
  sejak awal  kejadian
  +00:00      unduh alat_pemindai.zip
  +00:45      alat_pemindai.zip dibuat (Born)
  +10:53      login admin dari 10.0.0.23
  +17:30      data_pelanggan.csv dibaca (Accessed)
  +22:02      unggah ke file-share-gratis.example
  +24:20      logout admin

  (menit:detik) Seluruh kejadian berlangsung dalam 24 menit.

  Garis waktu tidak membuktikan SIAPA yang duduk di depan
  komputer -- ia cuma membuktikan urutan dan jarak antar
  kejadian. Menyambungkannya ke seseorang butuh bukti lain:
  rekaman kamera, kartu akses, atau pengakuan.

  Laporan yang baik memisahkan dengan tegas apa yang
  DITUNJUKKAN data dan apa yang DISIMPULKAN pemeriksa.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Ubah seluruh kejadian ke UTC', waktu: 'O(n)', memori: 'n = jumlah kejadian' },
      { operasi: 'Urutkan garis waktu gabungan', waktu: 'O(n log n)', memori: 'n bisa jutaan untuk disk penuh' },
      { operasi: 'Periksa kejanggalan cap waktu per berkas', waktu: 'O(f)', memori: 'f = jumlah berkas' },
      { operasi: 'Cari kejadian di sekitar satu waktu', waktu: 'O(log n)', memori: 'pencarian biner pada garis waktu terurut' }
    ],
    intuisi: `Garis waktu lengkap dari satu disk bisa memuat jutaan kejadian — setiap berkas menyumbang empat cap waktu, ditambah log, riwayat peramban, dan registri. Mengurutkannya \`O(n log n)\` tetap cepat, dan sesudahnya setiap pertanyaan "apa yang terjadi sekitar pukul sekian" dijawab dengan pencarian biner.

Yang mahal bukan komputasinya, melainkan **pembacaannya**. Jutaan baris kejadian tidak bisa dibaca manusia. Karena itu pemeriksa bekerja dari **titik jangkar** — satu kejadian yang sudah diketahui, misalnya waktu unggahan dari log peladen — lalu memeriksa apa yang terjadi beberapa menit sebelum dan sesudahnya.

Garis waktu yang baik bukan yang paling lengkap, melainkan yang bisa menjawab pertanyaan penyidik dengan menunjuk beberapa baris yang tepat.`
  },

  kesalahanUmum: [
    {
      salah: 'Menggabungkan waktu dari beberapa sumber tanpa menyamakan zona waktunya.',
      kenapa: 'Sumber yang berbeda mencatat atau menampilkan waktu dalam zona yang berbeda, dan angka jam yang dibandingkan apa adanya menghasilkan urutan yang salah. Selisih tujuh jam antara WIB dan UTC bisa membuat berkas tampak dibuat setelah pelakunya logout.',
      benar: 'Catat zona asli setiap sumber dan zona tampilan alatnya, ubah semuanya ke UTC, baru urutkan.'
    },
    {
      salah: 'Mencatat zona waktu tampilan alat sebagai zona waktu penyimpanan sumbernya.',
      kenapa: 'NTFS menyimpan UTC tetapi banyak alat pemeriksa menampilkannya dalam waktu setempat, sehingga pemeriksa yang mencatat tampilan mengira sumbernya menyimpan waktu setempat. Kekeliruan itu terbawa ke setiap perbandingan dengan sumber lain.',
      benar: 'Periksa pengaturan zona waktu alat pemeriksa dan catat secara terpisah dari zona penyimpanan sumbernya.'
    },
    {
      salah: 'Menyimpulkan urutan dua kejadian yang selisihnya lebih kecil dari resolusi cap waktu.',
      kenapa: 'FAT32 mencatat waktu diubah dengan resolusi dua detik, sehingga dua kejadian yang berselang satu detik bisa tercatat sama atau tampak terbalik terhadap sumber yang lebih teliti. Kesimpulan seperti itu mudah dibantah.',
      benar: 'Nyatakan urutan hanya bila selisihnya melampaui resolusi sumber yang paling kasar, dan sebut resolusi itu di laporan.'
    },
    {
      salah: 'Menandai waktu dibuat yang lebih baru dari waktu diubah sebagai tanda pemalsuan.',
      kenapa: 'Waktu dibuat mencatat kelahiran berkas di volume tempat ia berada, sehingga berkas salinan mendapat waktu dibuat baru sementara waktu diubahnya dibawa dari asal. Pola ini wajar dan bisa muncul pada ribuan berkas di disk yang aktif dipakai.',
      benar: 'Perlakukan pola itu sebagai tanda berkas salinan, dan cari kejanggalan lain yang independen sebelum menduga pemalsuan.'
    },
    {
      salah: 'Menganggap kecocokan waktu SI dan FN sebagai bukti tidak ada pemalsuan.',
      kenapa: 'Alat pengubah cap waktu yang umum hanya mengubah SI, tetapi teknik yang lebih canggih bisa ikut mengubah FN. Kecocokan keduanya hanya berarti pemalsuan yang umum tidak terdeteksi.',
      benar: 'Laporkan hasil perbandingan SI dan FN sebagai salah satu indikator, dan sebut keterbatasannya secara eksplisit.'
    },
    {
      salah: 'Memakai pecahan detik nol sebagai tanda pemalsuan untuk semua berkas.',
      kenapa: 'Berkas dari kamera, arsip ZIP, atau yang pernah melewati FAT32 memang punya waktu bulat karena sumbernya tidak mencatat pecahan detik. Tanda ini hanya bermakna untuk berkas yang seharusnya lahir di sistem berkas yang teliti.',
      benar: 'Pakai tanda pecahan detik nol hanya bersama asal-usul berkas yang diketahui, dan hanya sebagai penguat indikator lain.'
    },
    {
      salah: 'Menyimpulkan pelaku dari garis waktu.',
      kenapa: 'Garis waktu membuktikan urutan dan jarak kejadian di sebuah akun atau perangkat, bukan identitas orang yang memakainya. Akun bisa dipakai orang lain dan perangkat bisa diakses dari jauh.',
      benar: 'Tulis garis waktu sebagai fakta tentang kejadian, dan sambungkan ke seseorang hanya dengan bukti lain seperti rekaman kamera atau kartu akses.'
    }
  ],

  analogi: `Bayangkan kamu menyusun ulang kejadian **kehilangan barang di sebuah asrama** dari tiga catatan.

**Buku tamu satpam** mencatat: *"Tamu masuk 13.40, keluar 14.05."*

**Rekaman kamera lorong** — yang jamnya disetel ke waktu Greenwich karena dibeli dari luar negeri — mencatat: *"Seseorang masuk kamar 12 pukul 06.52."*

**Catatan penghuni kamar 12**: *"Tas saya masih ada waktu saya berangkat 13.30."*

Kalau kamu menyusunnya apa adanya, orang di kamera masuk kamar 12 pukul 06.52 — tujuh jam sebelum tamunya datang, dan sebelum penghuninya berangkat. Tamu itu jelas tidak bersalah; kejadiannya pagi hari.

Tapi jam kamera itu **tujuh jam di belakang**. 06.52 di kamera berarti 13.52 waktu setempat — dua belas menit setelah tamu masuk, dan dua puluh dua menit setelah penghuni berangkat.

Satu kesimpulan membebaskan tamunya. Kesimpulan lain menempatkannya tepat di tengah kejadian. **Datanya sama. Yang berbeda cuma apakah kamu tahu jam kamera itu disetel ke zona mana.**

**Sekarang soal ketelitian jam.**

Buku tamu satpam ditulis tangan, dibulatkan ke lima menit. Kamera mencatat sampai detik.

Kalau kamera menunjukkan seseorang di lorong pukul 13.41 dan buku tamu mencatat tamu masuk 13.40, kamu **tidak bisa** menyimpulkan tamu itu sudah masuk sebelum orang di lorong — karena "13.40" di buku tamu bisa berarti kapan saja antara 13.38 dan 13.42.

**Terakhir, soal catatan yang diubah.**

Penghuni kamar 12 menyerahkan catatan pembelian tasnya: *"Dibeli 1 Juni 2024."* Tetapi kuitansi dari tokonya, yang dicetak mesin kasir, bertanggal 14 Maret 2026.

Catatan tangan bisa ditulis ulang kapan saja. Kuitansi mesin kasir tidak bisa diubah pembeli.

Itu SI dan FN.

Dan satu hal lagi yang harus diingat: penghuni kamar 11 menyerahkan kuitansi pembelian **bekas** — barangnya dibeli bulan November dari orang lain, dan kuitansinya bertanggal Maret. "Dibeli setelah dibuat" terdengar janggal, tetapi itu wajar untuk barang bekas.

Satu keanehan bukan bukti. Dua keanehan yang saling menguatkan pada barang yang sama — itu yang layak dicatat.`,

  latihan: [
    'Jelaskan beda keempat cap waktu MACB, dan kenapa waktu Born berarti kelahiran di volume ini.',
    'Salin sebuah berkas dari flashdisk ke laptopmu, lalu bandingkan waktu dibuat dan waktu diubah salinannya dengan aslinya.',
    'Kumpulkan enam kejadian dari tiga sumber dengan zona waktu berbeda, lalu urutkan sekali tanpa menyamakan zona dan sekali setelah diubah ke UTC.',
    'Tunjukkan satu urutan yang mustahil secara fisik pada hasil pengurutan naifmu, lalu jelaskan penyebabnya.',
    'Periksa pengaturan zona waktu tampilan pada alat yang kamu pakai untuk melihat metadata berkas.',
    'Simpan berkas ke flashdisk berformat FAT32 pada detik ganjil, lalu periksa cap waktu yang tercatat.',
    'Jelaskan kenapa perbedaan SI dan FN pada NTFS bisa menjadi tanda pemalsuan, beserta keterbatasannya.',
    'Hitung peluang tujuh angka pecahan detik semuanya nol secara kebetulan, lalu sebutkan tiga asal berkas yang wajar punya waktu bulat.',
    'Susun rekonstruksi kejadian dengan selisih waktu dari kejadian pertama untuk data contoh di topik ini.',
    'Tulis satu paragraf temuan yang memisahkan fakta, tafsiran beserta dasarnya, dan keterbatasan dari garis waktu yang kamu susun.'
  ]
});


TOPICS.push({
  id: 'forensik-laporan',
  judul: 'Verifikasi Citra, Lacak Balak Berantai & Laporan Forensik',
  kategori: 'forensik',
  tag: ['verifikasi citra', 'hash per blok', 'lacak balak', 'rantai hash', 'laporan forensik', 'fakta dan tafsiran'],
  ringkas: 'Satu bit yang berubah membuat seluruh citra dipertanyakan — kecuali hash-nya dicatat per blok.',

  fungsi: `**Membuktikan bahwa bukti tidak berubah sejak disita, dan menyajikan temuan sehingga orang lain bisa memeriksanya ulang.**

Terpakai di:

- **Akuisisi forensik** — mencatat hash yang cukup rinci untuk menyelamatkan temuan bila sebagian media ternyata rusak
- **Menjaga catatan lacak balak** yang tidak bisa disunting diam-diam
- **Menulis laporan pemeriksaan** yang bertahan saat dibaca pihak lawan di sidang
- **Log audit di sistem apa pun** — rantai hash yang sama dipakai untuk membuat log aplikasi tahan rekayasa
- **Tugas akhir** bertema forensik digital, di mana bab hasil adalah laporan pemeriksaan itu sendiri

Yang paling sering diabaikan: **hash keseluruhan cuma bilang "ada yang berbeda", bukan "di mana".** Pada citra ratusan gigabyte, satu sektor rusak tanpa hash per blok membuat seluruh citra dipertanyakan. Dengan hash per blok, kerusakannya terlokalisasi dan temuan lain tetap sah.

Dan yang paling membedakan laporan yang dipercaya dari yang tidak: **memisahkan fakta, tafsiran, dan keterbatasan.** Bagian keterbatasan — apa yang *tidak* bisa disimpulkan — justru yang menunjukkan pemeriksa tahu batas buktinya.`,
  praktik: {
    tujuan: 'Kamu bisa memverifikasi citra dengan hash keseluruhan dan per blok, menyusun catatan lacak balak berantai hash yang menunjukkan setiap penyuntingan, dan menulis temuan yang memisahkan fakta, tafsiran beserta dasarnya, dan keterbatasan.',
    alat: ['Python dengan modul hashlib', 'Citra disk atau berkas besar apa pun untuk latihan verifikasi', 'Templat laporan pemeriksaan (bisa disusun dari daftar periksa di topik ini)'],
    langkah: [
      { judul: 'Hitung hash sumber sebelum dan sesudah akuisisi',
        isi: `Hitung hash media sumber sebelum disalin, hash citra sesudah disalin, dan hash sumber lagi sesudah penyalinan. Ketiganya harus sama.

Kalau hash sumber sebelum dan sesudah berbeda, proses akuisisi mengubah barang bukti. Itu tidak otomatis membatalkan pemeriksaan — tetapi harus dicatat dan dijelaskan.` },
      { judul: 'Catat hash per blok, bukan cuma keseluruhan',
        isi: `Bagi citra menjadi blok berukuran tetap dan catat hash tiap blok.

Kalau suatu hari citranya diperiksa ulang dan hash keseluruhan tidak cocok, hash per blok menunjukkan blok mana yang berubah. Temuan yang tidak bergantung pada blok itu tetap bisa dipertahankan.` },
      { judul: 'Uji dengan membalik satu bit',
        isi: `Ubah satu bit di salinan citramu, lalu hitung ulang kedua jenis hash.

Hash keseluruhan berubah total dan tidak memberi petunjuk apa pun. Hash per blok menunjuk tepat satu blok. Setelah melihatnya sendiri, alasan mencatat keduanya menjadi jelas.` },
      { judul: 'Susun catatan lacak balak berantai hash',
        isi: `Setiap entri — waktu, petugas, tindakan — di-hash bersama hash entri **sebelumnya**.

Mengubah satu entri mengubah hash-nya dan hash seluruh entri sesudahnya. Penyuntingan diam-diam jadi mustahil tanpa ketahuan.` },
      { judul: 'Kunci ujung rantainya di luar sistem',
        isi: `Rantai hash bisa dihitung ulang seluruhnya oleh orang yang mengubahnya. Untuk mencegahnya, catat hash entri terakhir di tempat lain: berita acara bertanda tangan, atau dikirim ke pihak ketiga.

Satu hash yang tersimpan di luar sudah cukup untuk mengunci seluruh catatan sebelumnya.` },
      { judul: 'Tulis setiap temuan dalam tiga jenis kalimat',
        isi: `**Fakta**: bisa diperiksa ulang dan pasti memberi hasil sama. **Tafsiran**: pendapat ahli, selalu disertai **dasar** — fakta mana yang membawa ke sana. **Keterbatasan**: apa yang tidak bisa disimpulkan.

Jangan mencampur ketiganya dalam satu kalimat. "Pelaku menghapus berkas" mencampur fakta (berkas terhapus) dengan tafsiran (siapa yang menghapus).` },
      { judul: 'Lengkapi laporan dengan daftar periksa',
        isi: `Identitas barang bukti, lacak balak, metode akuisisi, hash, langkah pemeriksaan, temuan, kesimpulan.

Periksa terutama bagian langkah pemeriksaan: apakah cukup rinci untuk diulang orang lain dengan alat dan versi yang sama?` },
      { judul: 'Uji laporanmu dengan satu pertanyaan',
        isi: `Bisakah pemeriksa lain, dengan citra yang sama dan laporan ini saja, mengulang pemeriksaanmu dan sampai ke fakta yang sama?

Kalau tidak, laporannya belum selesai — serapi apa pun tampilannya. Minta teman mencobanya kalau bisa; kekurangan laporan paling mudah dilihat oleh orang yang tidak ikut memeriksa.` }
    ],
    cek: [
      'Laporanmu memuat hash sumber sebelum dan sesudah akuisisi, serta hash citra',
      'Kamu mencatat hash per blok di samping hash keseluruhan',
      'Catatan lacak balakmu berantai hash, dan hash ujungnya tersimpan di luar sistem',
      'Setiap temuanmu terpisah menjadi fakta, tafsiran dengan dasarnya, dan keterbatasan'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — hash yang menunjuk tempat, dan rantai yang tidak bisa disunting',

  konsep: `Pemeriksaan forensik yang teliti bisa gagal di pengadilan karena dua hal yang tidak ada hubungannya dengan ketelitian analisis: **tidak bisa membuktikan buktinya tidak berubah**, dan **tidak bisa menjelaskan temuannya dengan cara yang bisa diperiksa orang lain.** Bab ini tentang keduanya.

Topik bukti digital sudah membahas hash sebagai sidik jari berkas, lacak balak, dan penghambat tulis. Bab ini melanjutkannya ke pertanyaan yang lebih praktis: apa yang terjadi saat verifikasinya **gagal**, dan bagaimana menuliskan hasilnya.

**Verifikasi akuisisi**

Tiga hash yang harus sama:

- hash media sumber **sebelum** disalin
- hash citra **sesudah** disalin
- hash media sumber **sesudah** disalin

Kalau ketiganya sama, citra adalah salinan persis, dan proses penyalinan tidak mengubah sumbernya. Kalau hash sumber sebelum dan sesudah berbeda, proses akuisisi mengubah barang bukti — biasanya karena penghambat tulis tidak dipakai atau tidak bekerja. Itu harus dicatat dan dijelaskan, tidak disembunyikan.

**Hash keseluruhan: "berbeda", tapi di mana?**

Satu bit dibalik di tengah citra 262.144 byte. Hash keseluruhannya berubah total.

Masalahnya: hash keseluruhan cuma memberi tahu **bahwa** ada yang berbeda. Ia tidak memberi tahu **di mana**. Untuk citra ratusan gigabyte, itu berarti seluruh citra dipertanyakan — termasuk bagian yang tidak rusak sama sekali.

**Hash per blok: menemukan letaknya**

| | |
|---|---|
| jumlah blok | 64 (masing-masing 4.096 byte) |
| blok yang berbeda | **[37]** |
| blok yang utuh | 63 |

Sekarang kerusakannya terlokalisasi: cuma blok 37. Temuan yang tidak bergantung pada blok itu tetap sah, dan pemeriksa bisa menyatakannya dengan tegas.

Ini bukan keadaan yang dibuat-buat. Media yang sudah tua sering punya sektor yang mulai rusak, dan pembacaan ulang bisa memberi hasil berbeda di sektor itu. Tanpa hash per blok, satu sektor lemah bisa membatalkan seluruh pemeriksaan. Karena itu alat akuisisi forensik mencatat hash per blok di samping hash keseluruhan.

**Catatan lacak balak berantai hash**

| Waktu | Petugas | Tindakan |
|---|---|---|
| 2026-03-14 09:10 | Petugas A | menerima laptop, disegel no. 0412 |
| 2026-03-14 10:02 | Petugas A | menyerahkan ke laboratorium |
| 2026-03-14 10:05 | Pemeriksa B | membuka segel 0412, utuh |
| 2026-03-14 10:40 | Pemeriksa B | akuisisi selesai, hash dicatat |
| 2026-03-14 11:15 | Pemeriksa B | laptop disegel ulang no. 0413 |

Setiap entri di-hash **bersama hash entri sebelumnya**. Sekarang seseorang mengubah jam penyerahan di entri kedua, dari 10:02 menjadi 09:30:

| Entri | Hash tercatat | Hash dihitung ulang | Cocok |
|---|---|---|---|
| 1 | 9262b054... | 9262b054... | ya |
| 2 | 6ccea8af... | 6bae298c... | **tidak** |
| 3 | 094264cf... | 3908cf8a... | **tidak** |
| 4 | 6d0f06c0... | ac782ead... | **tidak** |
| 5 | f66590b6... | a40e4de3... | **tidak** |

Entri pertama tetap cocok. Mulai entri yang diubah, **seluruh rantai sesudahnya** tidak cocok lagi.

Satu kelemahan yang harus diakui: orang yang mengubah entri bisa sekalian menghitung ulang seluruh rantai sesudahnya. Pertahanannya sederhana — **catat hash entri terakhir di tempat lain**: berita acara bertanda tangan, atau dikirim ke pihak ketiga. Satu hash yang tersimpan di luar sudah cukup untuk mengunci seluruh catatan sebelumnya.

Ini gagasan yang sama yang dipakai log audit tahan rekayasa di banyak sistem, dan yang menjadi inti rantai blok.

**Menulis temuan: tiga jenis kalimat**

| Jenis | Isi |
|---|---|
| FAKTA | berkas pemindai.exe ada di C:\\Tools |
| FAKTA | waktu Born di $FN: 14-03-2026 06:42:07 UTC |
| FAKTA | waktu Born di $SI: 01-06-2024 03:00:00 UTC |
| TAFSIRAN | waktu $SI kemungkinan besar diubah sengaja |
| DASAR | $SI lebih tua dari $FN; pecahan detik nol |
| KETERBATASAN | tidak menunjukkan SIAPA yang mengubahnya |

**Fakta** bisa diperiksa ulang pemeriksa lain, dan pasti memberi hasil sama.

**Tafsiran** adalah pendapat ahli, dan selalu disertai **dasar** — fakta mana yang membawanya ke sana. Tafsiran tanpa dasar tidak bisa diuji, dan karena itu tidak bisa dipercaya.

**Keterbatasan** menyebut apa yang **tidak** bisa disimpulkan. Bagian ini sering dianggap melemahkan laporan. Kenyataannya sebaliknya: ia menunjukkan pemeriksa tahu batas buktinya, dan itu yang membuat seluruh laporan dipercaya.

**Kelengkapan laporan**

| Bagian | Isinya |
|---|---|
| Identitas barang bukti | merek, nomor seri, nomor segel |
| Lacak balak | siapa memegang, kapan, dalam keadaan apa |
| Metode akuisisi | alat, versi, apakah penghambat tulis dipakai |
| Hash | sebelum dan sesudah, algoritmenya |
| Langkah pemeriksaan | cukup rinci untuk diulang orang lain |
| Temuan | fakta, tafsiran + dasar, keterbatasan |
| Kesimpulan | menjawab pertanyaan penyidik, **bukan lebih** |

Perhatikan baris terakhir. Kesimpulan menjawab **pertanyaan yang diajukan**. Pemeriksa yang diminta memastikan apakah berkas tertentu pernah ada di laptop tidak menyimpulkan siapa pelakunya — itu di luar pertanyaan, dan di luar yang bisa dibuktikan datanya.

Ujinya satu: **bisakah pemeriksa lain, dengan citra yang sama dan laporan ini saja, mengulang pemeriksaanmu dan sampai ke fakta yang sama?** Kalau tidak, laporannya belum selesai.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "BLOK = 4096\n\ndef hash_blok(data):\n    return [sha(data[i:i + BLOK]) for i in range(0, len(data), BLOK)]\n\nh_asli  = hash_blok(citra)\nh_rusak = hash_blok(salinan_rusak)\nbeda = [i for i, (a, b) in enumerate(zip(h_asli, h_rusak)) if a != b]\n\n# hash keseluruhan : BERBEDA   (tidak bilang di mana)\n# blok yang berbeda: [37]      (1 dari 64)\n# blok yang utuh   : 63",
      penjelasan: `Tiga baris yang mengubah jawaban "citra ini rusak" menjadi "blok 37 citra ini rusak, 63 blok lainnya utuh" — dan selisih kedua jawaban itu bisa menentukan apakah sebuah pemeriksaan bertahan di sidang.

**Mulai dari sifat hash yang biasanya jadi keunggulannya.**

Hash kriptografis dirancang supaya perubahan sekecil apa pun mengubah seluruh keluarannya — efek longsor. Satu bit berbeda di mana pun dalam berkas 500 GB menghasilkan hash yang sama sekali berbeda.

Untuk membuktikan dua salinan identik, itu sempurna. Untuk menemukan **di mana** keduanya berbeda, itu tidak berguna sama sekali. Hash yang berbeda tidak membawa informasi apa pun tentang letak perbedaannya.

**Sekarang bayangkan keadaannya di lapangan.**

Hard disk tua disita. Pemeriksa membuat citranya, mencatat hash, lalu bekerja berminggu-minggu. Menjelang sidang, pihak lawan meminta verifikasi ulang: citra dibuat lagi dari disk yang sama.

Hash-nya berbeda.

Penyebabnya mungkin sepele — satu sektor yang mulai lemah dibaca berbeda kali kedua. Tetapi dengan hash keseluruhan saja, pemeriksa tidak bisa menunjukkan **di mana** bedanya, sehingga tidak bisa membantah klaim bahwa seluruh citra — dan seluruh temuan — tidak bisa dipercaya.

**Hash per blok menyelesaikan persis masalah itu.**

Citra dipotong menjadi blok 4.096 byte, dan tiap blok punya hash sendiri. Saat verifikasi ulang, blok dibandingkan satu per satu.

Hasilnya: 63 blok cocok, 1 blok berbeda. Pemeriksa sekarang bisa menyatakan dengan tegas bahwa hanya blok 37 yang berubah — dan kalau tidak ada temuan yang bergantung pada blok 37, seluruh temuan tetap berdiri.

**Pertukaran ukuran blok.**

Blok yang lebih kecil melokalisasi kerusakan lebih tepat, tetapi menghasilkan daftar hash yang lebih panjang. Untuk citra 500 GB, blok 4 KB menghasilkan sekitar 122 juta hash — besar, tetapi masih sepele dibanding citranya sendiri.

Blok yang lebih besar menghasilkan daftar pendek, tetapi satu sektor rusak menandai area yang lebih luas.

Alat akuisisi forensik biasanya memakai blok beberapa megabyte sebagai titik tengah. Yang penting bukan angka pastinya, melainkan bahwa **ada** hash per blok sama sekali.

**Dan hubungannya dengan tempat lain.**

Gagasan yang sama — hash per potongan, bukan per keseluruhan — dipakai jauh di luar forensik. Berkas torrent menyimpan hash tiap potongan supaya potongan yang rusak saat diunduh bisa diunduh ulang tanpa mengulang seluruh berkas. Sistem kontrol versi dan penyimpanan awan memakai varian yang sama untuk mengetahui bagian mana dari berkas besar yang berubah.

Semuanya menjawab pertanyaan yang sama: bukan cuma "apakah berubah", melainkan "bagian mana yang berubah".`
    },
    {
      bahasa: 'python',
      kode: "def rantai(catatan):\n    hasil, sebelum = [], '0' * 64\n    for waktu, siapa, apa in catatan:\n        isi = sebelum + '|' + waktu + '|' + siapa + '|' + apa\n        h = sha(isi.encode())\n        hasil.append(h)\n        sebelum = h          # entri berikutnya mengikat entri ini\n    return hasil\n\n# ubah jam di entri 2:\n#   entri 1  cocok\n#   entri 2  TIDAK\n#   entri 3  TIDAK\n#   entri 4  TIDAK\n#   entri 5  TIDAK",
      penjelasan: `Delapan baris yang membuat catatan tidak bisa disunting diam-diam — dan satu kelemahan yang harus ditutup dengan cara yang sama sekali bukan kode.

**Mulai dari masalahnya.**

Catatan lacak balak biasa adalah tabel: siapa memegang barang bukti, kapan, dan dalam keadaan apa. Tabel itu bisa disunting. Kalau jam penyerahan diubah dari 10:02 menjadi 09:30 — misalnya untuk menutupi bahwa barang bukti sempat dibiarkan tanpa pengawasan setengah jam — tidak ada yang tahu.

Kalau setiap entri diberi hash sendiri, penyunting cukup menghitung ulang hash entri yang diubah. Masih tidak ada yang tahu.

**Rantai mengubah itu.**

Perhatikan baris \`isi = sebelum + ...\`. Hash setiap entri dihitung dari isinya **ditambah hash entri sebelumnya**. Entri kedua mengikat entri pertama; entri ketiga mengikat entri kedua, yang sudah mengikat entri pertama; dan seterusnya.

Sekarang ubah jam di entri kedua. Hash entri kedua berubah. Karena entri ketiga memuat hash entri kedua, hash entri ketiga ikut berubah. Begitu juga keempat, dan kelima.

Satu perubahan di tengah **menjalar ke ujung rantai**.

**Tetapi — dan ini bagian yang harus jujur disebut — penyunting bisa menghitung ulang seluruh rantai.**

Tidak ada rahasia dalam kode ini. Siapa pun yang punya akses ke catatannya bisa mengubah entri kedua, lalu menghitung ulang hash entri kedua sampai kelima, dan menyimpan hasilnya. Rantainya kembali konsisten, dan penyuntingan tidak terlihat.

Jadi rantai hash sendirian **tidak cukup**.

**Yang menutupnya: satu hash di luar jangkauan penyunting.**

Hash entri terakhir dicatat di tempat lain — di berita acara bertanda tangan saat serah terima, dikirim ke atasan, atau dititipkan ke pihak ketiga.

Sekarang penyunting yang menghitung ulang rantai akan menghasilkan hash ujung yang **berbeda** dari yang tercatat di luar. Dan karena hash ujung itu bergantung pada seluruh entri sebelumnya, satu angka yang tersimpan di luar mengunci **seluruh** catatan.

Perhatikan bentuk penyelesaiannya: kodenya membuat penyuntingan **terlihat**, tetapi yang membuatnya **tidak mungkin disembunyikan** adalah prosedur di luar kode — tanda tangan, serah terima, pihak ketiga. Keamanan catatan ini adalah gabungan keduanya.

**Hubungannya dengan tempat lain.**

Bentuk yang sama — setiap entri mengikat entri sebelumnya — adalah inti dari log audit tahan rekayasa di sistem perbankan, dari sistem kontrol versi seperti Git (setiap commit memuat hash commit induknya), dan dari rantai blok. Pada rantai blok, "hash yang disimpan di luar" digantikan oleh ribuan salinan yang dipegang pihak-pihak yang tidak saling percaya.

Tetapi untuk catatan lacak balak satu kasus, satu tanda tangan di berita acara sudah cukup.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Verifikasi citra disk & laporan forensik
# ============================================
import hashlib
import random

def sha(b):
    return hashlib.sha256(bytes(b)).hexdigest()

# --------------------------------------------
# 1. Citra disk dan hash keseluruhannya
# --------------------------------------------
BLOK = 4096
acak = random.Random(1)
sumber = bytearray(acak.getrandbits(8) for _ in range(64 * BLOK))
citra = bytearray(sumber)                    # salinan hasil akuisisi

print("--- verifikasi akuisisi: sumber vs citra ---")
print("  ukuran sumber : " + f"{len(sumber):,}".replace(",", ".") + " byte")
print("  hash sumber   : " + sha(sumber)[:32] + "...")
print("  hash citra    : " + sha(citra)[:32] + "...")
print("  sama          : " + ("YA" if sha(sumber) == sha(citra) else "TIDAK"))
print("")
print("  Hash sumber dihitung SEBELUM dan SESUDAH penyalinan, dan")
print("  hash citra dihitung sesudahnya. Ketiganya harus sama.")
print("  Kalau hash sumber sebelum dan sesudah berbeda, proses")
print("  akuisisi mengubah barang bukti -- dan itu harus dicatat.")

# --------------------------------------------
# 2. Satu sektor rusak: hash keseluruhan cuma bilang 'beda'
# --------------------------------------------
print("")
print("--- satu byte berubah di citra ---")
salinan_rusak = bytearray(citra)
salinan_rusak[37 * BLOK + 1234] ^= 0x01      # satu bit terbalik
print("  hash citra asli  : " + sha(citra)[:32] + "...")
print("  hash citra rusak : " + sha(salinan_rusak)[:32] + "...")
print("")
print("  Hash keseluruhan memberi tahu BAHWA ada yang berbeda,")
print("  tetapi tidak memberi tahu DI MANA. Untuk citra ratusan")
print("  gigabyte, itu jawaban yang kurang berguna: seluruh citra")
print("  jadi dipertanyakan.")

# --------------------------------------------
# 3. Hash per blok: menemukan letaknya
# --------------------------------------------
print("")
print("--- hash per blok ---")
def hash_blok(data):
    return [sha(data[i:i + BLOK]) for i in range(0, len(data), BLOK)]

h_asli = hash_blok(citra)
h_rusak = hash_blok(salinan_rusak)
beda = [i for i, (a, b) in enumerate(zip(h_asli, h_rusak)) if a != b]
print("  jumlah blok        : " + str(len(h_asli)) + " (masing-masing "
      + str(BLOK) + " byte)")
print("  blok yang berbeda  : " + str(beda))
print("  blok yang utuh     : " + str(len(h_asli) - len(beda)))
print("")
print("  Sekarang kerusakannya terlokalisasi: cuma blok " + str(beda[0])
      + ".")
print("  Temuan yang tidak bergantung pada blok itu tetap sah,")
print("  dan pemeriksa bisa menyatakannya dengan tegas di laporan.")
print("")
print("  Karena itu alat akuisisi forensik mencatat hash per blok")
print("  di samping hash keseluruhan. Biaya tambahannya kecil;")
print("  manfaatnya besar saat media sumber mulai rusak di tengah")
print("  penyalinan.")

# --------------------------------------------
# 4. Catatan lacak balak yang tidak bisa disunting diam-diam
# --------------------------------------------
print("")
print("--- catatan lacak balak berantai hash ---")
CATATAN = [
    ("2026-03-14 09:10", "Petugas A", "menerima laptop, disegel no. 0412"),
    ("2026-03-14 10:02", "Petugas A", "menyerahkan ke laboratorium"),
    ("2026-03-14 10:05", "Pemeriksa B", "membuka segel 0412, utuh"),
    ("2026-03-14 10:40", "Pemeriksa B", "akuisisi selesai, hash dicatat"),
    ("2026-03-14 11:15", "Pemeriksa B", "laptop disegel ulang no. 0413"),
]

def rantai(catatan):
    hasil, sebelum = [], "0" * 64
    for waktu, siapa, apa in catatan:
        isi = sebelum + "|" + waktu + "|" + siapa + "|" + apa
        h = sha(isi.encode())
        hasil.append(h)
        sebelum = h
    return hasil

asli = rantai(CATATAN)
print("  " + "waktu".ljust(17) + "petugas".ljust(12) + "hash entri")
for (w, s, a), h in zip(CATATAN, asli):
    print("  " + w.ljust(17) + s.ljust(12) + h[:16] + "...")
print("")
print("  Tiap entri memuat hash entri SEBELUMNYA. Mengubah satu")
print("  entri mengubah hash-nya, dan itu mengubah hash seluruh")
print("  entri sesudahnya.")

print("")
print("--- seseorang mengubah jam penyerahan ---")
ubah = list(CATATAN)
ubah[1] = ("2026-03-14 09:30", "Petugas A", "menyerahkan ke laboratorium")
baru = rantai(ubah)
print("  " + "entri".ljust(7) + "hash tercatat".ljust(20)
      + "hash dihitung ulang".ljust(22) + "cocok")
for i, (a, b) in enumerate(zip(asli, baru)):
    print("  " + str(i + 1).ljust(7) + (a[:16] + "...").ljust(20)
          + (b[:16] + "...").ljust(22) + ("ya" if a == b else "TIDAK"))
print("")
print("  Entri pertama tetap cocok. Mulai entri kedua -- yang")
print("  diubah -- seluruh rantai sesudahnya tidak cocok lagi.")
print("")
print("  Supaya pengubah tidak sekadar menghitung ulang seluruh")
print("  rantainya, hash entri terakhir dicatat juga di tempat")
print("  lain: berita acara bertanda tangan, atau dikirim ke pihak")
print("  ketiga. Satu hash yang tersimpan di luar sudah cukup")
print("  untuk mengunci seluruh catatan sebelumnya.")

# --------------------------------------------
# 5. Memisahkan fakta dari tafsiran di laporan
# --------------------------------------------
print("")
print("--- menulis temuan: fakta, tafsiran, keterbatasan ---")
TEMUAN = [
    ("FAKTA",       "berkas pemindai.exe ada di C:\\Tools"),
    ("FAKTA",       "waktu Born di $FN: 14-03-2026 06:42:07 UTC"),
    ("FAKTA",       "waktu Born di $SI: 01-06-2024 03:00:00 UTC"),
    ("TAFSIRAN",    "waktu $SI kemungkinan besar diubah sengaja"),
    ("DASAR",       "$SI lebih tua dari $FN; pecahan detik nol"),
    ("KETERBATASAN", "tidak menunjukkan SIAPA yang mengubahnya"),
]
for jenis, isi in TEMUAN:
    print("  " + jenis.ljust(13) + isi)
print("")
print("  Tiga jenis kalimat yang tidak boleh dicampur:")
print("")
print("  FAKTA bisa diperiksa ulang pemeriksa lain dan pasti")
print("  memberi hasil yang sama.")
print("")
print("  TAFSIRAN adalah pendapat ahli, dan selalu disertai DASAR")
print("  -- fakta mana yang membuatnya sampai ke tafsiran itu.")
print("")
print("  KETERBATASAN menyebut apa yang TIDAK bisa disimpulkan.")
print("  Bagian ini justru yang membuat laporan dipercaya, karena")
print("  menunjukkan pemeriksa tahu batas buktinya.")

# --------------------------------------------
# 6. Kelengkapan laporan: daftar periksa
# --------------------------------------------
print("")
print("--- kelengkapan laporan pemeriksaan ---")
BAGIAN = [
    ("Identitas barang bukti", "merek, nomor seri, nomor segel"),
    ("Lacak balak",            "siapa memegang, kapan, dalam keadaan apa"),
    ("Metode akuisisi",        "alat, versi, penghambat tulis dipakai?"),
    ("Hash",                   "sebelum dan sesudah, algoritmenya"),
    ("Langkah pemeriksaan",    "cukup rinci untuk diulang orang lain"),
    ("Temuan",                 "fakta, tafsiran + dasar, keterbatasan"),
    ("Kesimpulan",             "menjawab pertanyaan penyidik, bukan lebih"),
]
for a, b in BAGIAN:
    print("  " + a.ljust(24) + b)
print("")
print("  Ujinya satu: bisakah pemeriksa lain, dengan citra yang")
print("  sama dan laporan ini saja, mengulang pemeriksaanmu dan")
print("  sampai ke fakta yang sama? Kalau tidak, laporannya belum")
print("  selesai -- serapi apa pun tampilannya.")` },
  output: `--- verifikasi akuisisi: sumber vs citra ---
  ukuran sumber : 262.144 byte
  hash sumber   : 20d3effbc34432ed1794f527de405433...
  hash citra    : 20d3effbc34432ed1794f527de405433...
  sama          : YA

  Hash sumber dihitung SEBELUM dan SESUDAH penyalinan, dan
  hash citra dihitung sesudahnya. Ketiganya harus sama.
  Kalau hash sumber sebelum dan sesudah berbeda, proses
  akuisisi mengubah barang bukti -- dan itu harus dicatat.

--- satu byte berubah di citra ---
  hash citra asli  : 20d3effbc34432ed1794f527de405433...
  hash citra rusak : 7cd0cce6ae9ff304a550f99ddbdb8d8b...

  Hash keseluruhan memberi tahu BAHWA ada yang berbeda,
  tetapi tidak memberi tahu DI MANA. Untuk citra ratusan
  gigabyte, itu jawaban yang kurang berguna: seluruh citra
  jadi dipertanyakan.

--- hash per blok ---
  jumlah blok        : 64 (masing-masing 4096 byte)
  blok yang berbeda  : [37]
  blok yang utuh     : 63

  Sekarang kerusakannya terlokalisasi: cuma blok 37.
  Temuan yang tidak bergantung pada blok itu tetap sah,
  dan pemeriksa bisa menyatakannya dengan tegas di laporan.

  Karena itu alat akuisisi forensik mencatat hash per blok
  di samping hash keseluruhan. Biaya tambahannya kecil;
  manfaatnya besar saat media sumber mulai rusak di tengah
  penyalinan.

--- catatan lacak balak berantai hash ---
  waktu            petugas     hash entri
  2026-03-14 09:10 Petugas A   9262b0545dc8049c...
  2026-03-14 10:02 Petugas A   6ccea8af088adce5...
  2026-03-14 10:05 Pemeriksa B 094264cf7da06a68...
  2026-03-14 10:40 Pemeriksa B 6d0f06c0378ccf56...
  2026-03-14 11:15 Pemeriksa B f66590b60f4e2ee4...

  Tiap entri memuat hash entri SEBELUMNYA. Mengubah satu
  entri mengubah hash-nya, dan itu mengubah hash seluruh
  entri sesudahnya.

--- seseorang mengubah jam penyerahan ---
  entri  hash tercatat       hash dihitung ulang   cocok
  1      9262b0545dc8049c... 9262b0545dc8049c...   ya
  2      6ccea8af088adce5... 6bae298c085263b9...   TIDAK
  3      094264cf7da06a68... 3908cf8acf961daf...   TIDAK
  4      6d0f06c0378ccf56... ac782ead66b4f1c6...   TIDAK
  5      f66590b60f4e2ee4... a40e4de39402e082...   TIDAK

  Entri pertama tetap cocok. Mulai entri kedua -- yang
  diubah -- seluruh rantai sesudahnya tidak cocok lagi.

  Supaya pengubah tidak sekadar menghitung ulang seluruh
  rantainya, hash entri terakhir dicatat juga di tempat
  lain: berita acara bertanda tangan, atau dikirim ke pihak
  ketiga. Satu hash yang tersimpan di luar sudah cukup
  untuk mengunci seluruh catatan sebelumnya.

--- menulis temuan: fakta, tafsiran, keterbatasan ---
  FAKTA        berkas pemindai.exe ada di C:\\Tools
  FAKTA        waktu Born di $FN: 14-03-2026 06:42:07 UTC
  FAKTA        waktu Born di $SI: 01-06-2024 03:00:00 UTC
  TAFSIRAN     waktu $SI kemungkinan besar diubah sengaja
  DASAR        $SI lebih tua dari $FN; pecahan detik nol
  KETERBATASAN tidak menunjukkan SIAPA yang mengubahnya

  Tiga jenis kalimat yang tidak boleh dicampur:

  FAKTA bisa diperiksa ulang pemeriksa lain dan pasti
  memberi hasil yang sama.

  TAFSIRAN adalah pendapat ahli, dan selalu disertai DASAR
  -- fakta mana yang membuatnya sampai ke tafsiran itu.

  KETERBATASAN menyebut apa yang TIDAK bisa disimpulkan.
  Bagian ini justru yang membuat laporan dipercaya, karena
  menunjukkan pemeriksa tahu batas buktinya.

--- kelengkapan laporan pemeriksaan ---
  Identitas barang bukti  merek, nomor seri, nomor segel
  Lacak balak             siapa memegang, kapan, dalam keadaan apa
  Metode akuisisi         alat, versi, penghambat tulis dipakai?
  Hash                    sebelum dan sesudah, algoritmenya
  Langkah pemeriksaan     cukup rinci untuk diulang orang lain
  Temuan                  fakta, tafsiran + dasar, keterbatasan
  Kesimpulan              menjawab pertanyaan penyidik, bukan lebih

  Ujinya satu: bisakah pemeriksa lain, dengan citra yang
  sama dan laporan ini saja, mengulang pemeriksaanmu dan
  sampai ke fakta yang sama? Kalau tidak, laporannya belum
  selesai -- serapi apa pun tampilannya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hash keseluruhan citra', waktu: 'O(N)', memori: 'N = ukuran citra, sekali baca' },
      { operasi: 'Hash per blok', waktu: 'O(N)', memori: 'bisa dihitung dalam pembacaan yang sama' },
      { operasi: 'Temukan blok yang berbeda', waktu: 'O(N / B)', memori: 'B = ukuran blok, bandingkan daftar hash' },
      { operasi: 'Bangun rantai hash lacak balak', waktu: 'O(e)', memori: 'e = jumlah entri' },
      { operasi: 'Verifikasi rantai', waktu: 'O(e)', memori: 'hitung ulang dan bandingkan dengan hash di luar' }
    ],
    intuisi: `Hash per blok tidak menambah biaya membaca sama sekali: kedua jenis hash bisa dihitung dalam satu kali pembacaan citra, karena setiap byte yang dibaca diumpankan ke dua penghitung sekaligus. Yang bertambah cuma daftar hash per blok, dan ukurannya sepele dibanding citranya.

Jadi tidak ada alasan biaya untuk tidak mencatatnya — sementara tidak mencatatnya bisa berarti seluruh pemeriksaan dipertanyakan karena satu sektor.

Rantai hash lacak balak bahkan lebih murah: satu hash per entri, dan satu kasus jarang punya lebih dari puluhan entri. Biaya sesungguhnya bukan di komputasinya, melainkan di **disiplin** mencatat hash ujungnya di luar sistem setiap kali barang bukti berpindah tangan.`
  },

  kesalahanUmum: [
    {
      salah: 'Mencatat hash citra saja tanpa hash sumber sebelum dan sesudah akuisisi.',
      kenapa: 'Hash citra hanya membuktikan citra tidak berubah sejak dibuat, bukan bahwa proses penyalinan tidak mengubah sumbernya. Tanpa hash sumber sebelum dan sesudah, tidak ada cara menunjukkan bahwa akuisisi berlangsung tanpa menulis ke barang bukti.',
      benar: 'Catat hash sumber sebelum penyalinan, hash citra sesudahnya, dan hash sumber lagi sesudah penyalinan, lalu laporkan ketiganya.'
    },
    {
      salah: 'Mengandalkan hash keseluruhan saja untuk citra berukuran besar.',
      kenapa: 'Hash keseluruhan hanya menunjukkan bahwa ada perbedaan, tidak menunjukkan letaknya, sehingga satu sektor lemah yang terbaca berbeda membuat seluruh citra dan seluruh temuan dipertanyakan. Media tua sering punya sektor seperti itu.',
      benar: 'Catat hash per blok di samping hash keseluruhan dalam satu kali pembacaan citra.'
    },
    {
      salah: 'Menganggap rantai hash sudah cukup mencegah penyuntingan catatan.',
      kenapa: 'Siapa pun yang punya akses ke catatan bisa mengubah satu entri lalu menghitung ulang seluruh rantai sesudahnya, sehingga rantainya kembali konsisten. Rantai hanya membuat perubahan terlihat bila ada acuan yang tidak bisa diubah penyunting.',
      benar: 'Simpan hash entri terakhir di luar sistem, misalnya di berita acara bertanda tangan atau pada pihak ketiga, setiap kali barang bukti berpindah tangan.'
    },
    {
      salah: 'Mencampur fakta dan tafsiran dalam satu kalimat temuan.',
      kenapa: 'Kalimat seperti pelaku menghapus berkas menggabungkan fakta yang bisa diperiksa dengan tafsiran tentang siapa yang melakukannya. Pihak lawan cukup meruntuhkan tafsirannya untuk membuat faktanya ikut tampak lemah.',
      benar: 'Tulis fakta, tafsiran beserta dasarnya, dan keterbatasan sebagai kalimat terpisah.'
    },
    {
      salah: 'Menghilangkan bagian keterbatasan karena dianggap melemahkan laporan.',
      kenapa: 'Keterbatasan menunjukkan bahwa pemeriksa tahu batas buktinya, dan tanpanya pembaca bisa menarik kesimpulan yang tidak didukung data lalu menyalahkan laporan ketika kesimpulan itu runtuh. Laporan yang mengakui batasnya lebih dipercaya.',
      benar: 'Sebut secara eksplisit apa yang tidak bisa disimpulkan dari setiap temuan penting.'
    },
    {
      salah: 'Menulis langkah pemeriksaan secara ringkas tanpa alat, versi, dan urutan.',
      kenapa: 'Pemeriksaan yang tidak bisa diulang tidak bisa diverifikasi, dan temuan yang tidak bisa diverifikasi mudah dibantah. Alat dan versinya penting karena hasil bisa berbeda antar versi.',
      benar: 'Tulis langkah pemeriksaan cukup rinci sehingga pemeriksa lain dengan citra yang sama bisa mengulangnya dan sampai ke fakta yang sama.'
    },
    {
      salah: 'Menjawab lebih dari pertanyaan yang diajukan penyidik di bagian kesimpulan.',
      kenapa: 'Kesimpulan yang melampaui pertanyaan biasanya juga melampaui yang bisa dibuktikan data, misalnya menyimpulkan pelaku dari bukti yang hanya menunjukkan keberadaan berkas. Bagian itu menjadi sasaran bantahan dan bisa merusak kepercayaan pada temuan lain.',
      benar: 'Batasi kesimpulan pada pertanyaan yang diajukan, dan sebut hal lain sebagai keterbatasan atau saran pemeriksaan lanjutan.'
    }
  ],

  analogi: `Bayangkan kamu mengirim **buku catatan kas organisasi** ke bendahara baru, dan ingin memastikan tidak ada yang mengubahnya di jalan.

Cara pertama: kamu menghitung jumlah seluruh angka di buku itu dan menuliskannya di amplop — *"total 48.291.500"*.

Bendahara baru menghitung ulang dan mendapat angka berbeda. Sesuatu berubah. Tetapi **di halaman mana**? Tidak ada petunjuk. Seluruh buku jadi dipertanyakan, termasuk halaman-halaman yang sebenarnya utuh.

Cara kedua: kamu menulis jumlah **setiap halaman** di daftar terpisah.

Bendahara menghitung ulang setiap halaman. Enam puluh tiga cocok, satu tidak — halaman 37. Sekarang yang dipertanyakan cuma halaman 37, dan seluruh halaman lain bisa dipakai dengan yakin.

Itu hash per blok.

**Sekarang catatan serah terima.**

Setiap kali buku itu berpindah tangan, penerima menulis satu baris: tanggal, nama, keadaan buku.

Masalahnya, siapa pun bisa menghapus satu baris dan menulis ulang dengan tanggal berbeda.

Jadi kamu membuat aturan: setiap baris harus menyalin **empat angka terakhir kode baris sebelumnya**, dan dari situ menghitung kode baris itu sendiri. Mengubah satu baris mengubah kodenya — dan karena baris berikutnya menyalin kode itu, baris berikutnya juga jadi tidak cocok, dan seterusnya sampai akhir.

Tetapi orang yang cukup rajin bisa menulis ulang **seluruh** baris dari yang ia ubah sampai akhir, dengan kode baru yang konsisten.

Jadi ada satu aturan terakhir: setiap kali serah terima, **kode baris terakhir ditulis juga di surat serah terima yang ditandatangani kedua pihak** dan disimpan masing-masing.

Sekarang orang yang menulis ulang catatan akan menghasilkan kode terakhir yang berbeda dari yang ada di surat — surat yang tidak bisa ia ubah.

**Terakhir, soal laporan.**

Bendahara baru menemukan ada uang yang tidak tercatat, dan menulis laporan:

- **fakta**: halaman 37 memuat pengeluaran Rp 2 juta tanpa kuitansi
- **tafsiran**: pengeluaran itu kemungkinan tidak sah
- **dasar**: tidak ada kuitansi, dan tidak ada persetujuan di notulen rapat bulan itu
- **keterbatasan**: catatan tidak menunjukkan siapa yang menuliskannya

Laporan seperti itu bisa diperiksa siapa pun, dan tidak ada yang bisa menuduhnya menuduh orang tanpa dasar.

Bandingkan dengan laporan yang berbunyi *"bendahara lama menggelapkan dua juta"*. Mungkin benar. Tetapi kalimat itu tidak bisa dibuktikan dari buku catatan saja — dan begitu satu bagiannya dibantah, seluruh laporan ikut runtuh.`,

  latihan: [
    'Hitung hash keseluruhan sebuah berkas besar, salin berkasnya, lalu tunjukkan bahwa hash salinannya sama.',
    'Balik satu bit di salinan itu, lalu tunjukkan bahwa hash keseluruhan berubah total tanpa memberi petunjuk letaknya.',
    'Hitung hash per blok untuk berkas asli dan salinan yang rusak, lalu temukan blok yang berbeda.',
    'Hitung berapa banyak hash per blok yang dihasilkan untuk citra 500 GB dengan ukuran blok 4 KB dan 64 MB.',
    'Susun catatan lacak balak lima entri berantai hash, lalu ubah satu entri dan tunjukkan entri mana saja yang tidak cocok lagi.',
    'Hitung ulang seluruh rantai setelah entrinya diubah, lalu jelaskan kenapa rantai sendirian tidak cukup dan apa yang menutup kelemahannya.',
    'Tulis tiga temuan dari topik garis waktu dalam bentuk fakta, tafsiran beserta dasarnya, dan keterbatasan.',
    'Ambil satu kalimat temuan yang mencampur fakta dan tafsiran, lalu pecah menjadi kalimat-kalimat terpisah.',
    'Susun kerangka laporan pemeriksaan lengkap dengan tujuh bagian dari daftar periksa di topik ini.',
    'Minta seorang teman mengulang satu langkah pemeriksaan hanya dari laporanmu, lalu catat bagian yang membuatnya bingung.'
  ]
});
