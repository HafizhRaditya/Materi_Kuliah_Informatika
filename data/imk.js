/* ============================================================
   imk.js — materi Interaksi Manusia & Komputer (Semester 4)

   Disusun dari berkas kuliah sendiri:
     - Worksheet IMK Chapter 1-4 (Tim C Kelas B), yang mengacu
       pada slide e3-chap-01..04 — buku Dix, Finlay, Abowd,
       Beale, "Human-Computer Interaction" edisi ke-3
     - Laporan_IMK_LPSE_Banyumas.docx — projek akhir redesign
       dashboard LPSE Kabupaten Banyumas (Tim C)

   CATATAN KEJUJURAN: angka SUS dan rasio kontras di topik
   ketiga DIHITUNG ULANG dari data mentah laporan, bukan
   disalin. Dua selisih ditemukan dan dijelaskan apa adanya
   sebagai bahan belajar.
   ============================================================ */

TOPICS.push({
  id: 'imk-manusia',
  judul: 'Manusia sebagai Pemroses Informasi',
  kategori: 'imk',
  tag: ['IMK', 'persepsi', 'memori', 'Miller', 'slip', 'mistake', 'model manusia'],
  ringkas: 'Batas kemampuan manusia yang harus dipatuhi antarmuka — penglihatan, memori, penalaran, dan kesalahan.',

  fungsi: `**Merancang antarmuka yang mengikuti batas kemampuan manusia, bukan melawannya.**

Terpakai di:

- **Merancang tampilan** — berapa pilihan yang wajar dalam satu layar
- **Menangani kesalahan pengguna** — dan tahu jenisnya menentukan perbaikannya
- **Aksesibilitas** — memastikan tidak ada yang tereksklusi
- **Menulis pesan galat** yang benar-benar menolong

Yang paling langsung terpakai: **membedakan slip dari mistake.**

Slip diperbaiki dengan **desain** — jauhkan tombolnya, sediakan pembatalan. Mistake diperbaiki dengan **penjelasan** — perbaiki apa yang dipahami pengguna.

Menambah kotak konfirmasi untuk mistake **tidak menolong sama sekali**, karena penggunanya memang mengira tindakannya benar.`,

  praktik: {
    tujuan: `Kamu bisa menemukan kesalahan rancangan pada antarmuka nyata, dan memperbaikinya sesuai jenis kesalahan yang ditimbulkannya.`,
    alat: [
      'Aplikasi atau situs yang kamu pakai sehari-hari',
      'Teman untuk diuji'
    ],
    langkah: [
      { judul: 'Hitung beban ingatan tiap layar',
        isi: `Ambil satu layar dari aplikasimu, lalu hitung: berapa hal yang harus **diingat** pengguna dari layar sebelumnya?

Idealnya nol. Kalau pengguna harus mengingat kode dari halaman lain, tampilkan kodenya di halaman ini.

Memori kerja sangat kecil — Miller menyebut tujuh, penelitian yang lebih baru sekitar empat.` },
      { judul: 'Ubah recall jadi recognition',
        isi: `Cari tempat di aplikasimu yang menuntut pengguna **mengingat**, lalu ubah jadi **memilih**.

Kolom teks bebas untuk nama jurusan menjadi daftar pilihan. Kode yang harus dihafal menjadi tombol.

Ini perbaikan yang hampir selalu mudah dan hampir selalu berpengaruh besar.` },
      { judul: 'Catat kesalahan yang terjadi dan golongkan',
        isi: `Minta teman memakai aplikasimu, dan catat setiap kali ia salah.

Untuk tiap kesalahan, tanyakan: *"tadi maksudnya apa?"*

- *"Aduh salah pencet"* → **slip**
- *"Lho, bukannya begitu caranya?"* → **mistake**

Golongan ini menentukan perbaikannya.` },
      { judul: 'Perbaiki slip lewat tata letak',
        isi: `Untuk slip: jauhkan tombol berbahaya dari yang sering dipakai, beri warna berbeda, dan **sediakan pembatalan**.

Pembatalan jauh lebih baik daripada konfirmasi — ia tidak mengganggu alur, dan tetap menyelamatkan.` },
      { judul: 'Perbaiki mistake lewat kata-kata',
        isi: `Untuk mistake: ganti nama tombol dan perjelas akibatnya.

*"Hapus"* menjadi *"Hapus permanen"*. Kalimat konfirmasi *"Yakin?"* menjadi *"3 berkas akan dimusnahkan dan tidak bisa dikembalikan"*.

Perhatikan bahwa yang berubah adalah **apa yang dipahami**, bukan seberapa sulit menekannya.` },
      { judul: 'Periksa ketergantungan pada warna',
        isi: `Ubah tangkapan layar aplikasimu jadi hitam putih.

Kalau ada informasi yang **hilang** — status yang tidak bisa dibedakan lagi — kamu mengecualikan sekitar delapan persen laki-laki yang buta warna merah-hijau.

Tambahkan lambang atau teks di samping warnanya.` },
      { judul: 'Perhatikan pengaruh frustrasi',
        isi: `Norman menunjukkan bahwa emosi negatif **mempersempit** cara berpikir.

Artinya antarmuka yang menjengkelkan tidak sekadar tidak menyenangkan — ia **menurunkan kemampuan** penggunanya menyelesaikan tugas yang mudah sekalipun.

Perlakukan keluhan "ribet" sebagai masalah kemampuan, bukan selera.` }
    ],
    cek: [
      'Tidak ada layar yang menuntut pengguna mengingat sesuatu dari layar sebelumnya',
      'Setiap kesalahan yang kamu catat sudah kamu golongkan sebagai slip atau mistake',
      'Aplikasimu tetap bisa dipahami saat tangkapan layarnya dijadikan hitam putih'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa manusia begitu',

  konsep: `
Sebelum merancang antarmuka, kamu perlu tahu **untuk siapa** ia dirancang. Dan manusia punya **batas yang tidak bisa dinegosiasikan**.

Model yang dipakai di IMK memandang manusia sebagai **pemroses informasi**: ada masukan lewat indra, ada pengolahan dan penyimpanan, ada keluaran berupa tindakan.

**Penglihatan**

Melihat berlangsung dalam **dua tahap**:

- **Penerimaan fisik** — cahaya masuk ke mata dan diubah jadi sinyal saraf
- **Pengolahan dan penafsiran** — otak mengubah sinyal itu jadi makna

Tahap kedua itulah yang penting bagi perancang, karena di situ **otak menambahkan hal yang tidak ada** dan **membuang hal yang ada**.

Ilusi optik membuktikannya: dua garis sama panjang bisa **terlihat** berbeda. Otak tidak melaporkan apa yang ada di retina, melainkan **tafsirannya**.

Akibatnya bagi antarmuka: yang menentukan bukan seberapa akurat datamu, melainkan **bagaimana ia terlihat**. Dua kotak berukuran sama tetapi berwarna berbeda akan terasa berbeda besarnya.

**Memori: tiga tingkat**

- **Memori sensor** (*sensory buffer*) — menahan rangsangan mentah kurang dari satu detik
- **Memori kerja** (*short-term / working memory*) — tempat berpikir sekarang; **kecil dan cepat hilang**
- **Memori jangka panjang** — kapasitasnya praktis tak terbatas, tetapi **lambat diakses**

Yang memindahkan dari sensor ke memori kerja adalah **perhatian**. Yang memindahkan dari memori kerja ke jangka panjang adalah **pengulangan dan pemaknaan**.

**Batas memori kerja**

Miller (1956) menyebut angka **7 ± 2 satuan**. Penelitian yang lebih baru — Cowan (2001) — memperkirakan kapasitas sesungguhnya lebih dekat ke **4 ± 1** ketika pengulangan dicegah.

Yang **tidak berubah** dari keduanya, dan itulah intinya: **memori kerja sangat kecil**. Antarmuka yang menuntut pengguna mengingat banyak hal sekaligus akan gagal.

Jalan keluarnya adalah **chunking** — mengelompokkan satuan kecil menjadi satuan bermakna. Nomor \`081234567890\` sulit diingat sebagai dua belas angka, mudah sebagai tiga kelompok.

Prinsip perancangan yang lahir dari sini: **kenali, jangan ingat** (*recognition over recall*). Menu lebih mudah daripada baris perintah bukan karena lebih cepat, tetapi karena menu **memperlihatkan pilihannya** sehingga pengguna tidak perlu mengingat.

**Penalaran**

- **Deduksi** — dari umum ke khusus. Kesimpulannya **pasti benar** kalau premisnya benar.
- **Induksi** — dari khusus ke umum. Kesimpulannya **mungkin benar**, tidak pernah pasti.
- **Abduksi** — dari akibat ke sebab yang paling masuk akal. **Sering salah**, tetapi inilah yang paling banyak dipakai manusia sehari-hari.

Abduksi menjelaskan banyak kesalahpahaman pengguna. Melihat halaman gagal termuat lalu menyimpulkan *"internetku putus"* adalah abduksi — masuk akal, dan **sering keliru**.

**Dua jenis kesalahan**

Pembedaan dari Norman, dan ini menentukan cara memperbaikinya:

- **Slip** — **niatnya benar, tindakannya meleset**. Salah pencet karena tombolnya berdekatan.
- **Mistake** — **niatnya sendiri salah**. Model mental penggunanya keliru.

**Slip diperbaiki dengan desain**: jauhkan tombol berbahaya, beri konfirmasi, sediakan pembatalan.

**Mistake diperbaiki dengan penjelasan**: perbaiki apa yang dipahami pengguna lewat penamaan, umpan balik, dan dokumentasi.

Menangani mistake dengan cara menangani slip adalah kesia-siaan. Menambah konfirmasi tidak menolong orang yang **memang mengira** tindakan itu benar — ia akan menekan "Ya".

**Emosi**

Norman: *"Negative affect can make it harder to do even easy tasks; positive affect can make it easier to do difficult tasks."*

Pengguna yang tertekan berpikir **menyempit** — ia terpaku pada satu cara dan tidak mencari jalan lain. Pengguna yang tenang berpikir **melebar**.

Karena itu antarmuka yang membuat frustrasi tidak sekadar tidak menyenangkan: ia **menurunkan kemampuan berpikir penggunanya**, sehingga tugas yang mudah pun jadi sulit.

**Perbedaan individual**

Penglihatan warna, ketajaman, kemampuan gerak, usia, bahasa, dan pengalaman berbeda-beda. Desain yang **hanya mengandalkan warna** untuk membedakan status mengecualikan sekitar 8 persen laki-laki yang buta warna merah-hijau.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SLIP vs MISTAKE -- kenapa bedanya menentukan perbaikannya\n#\n# SLIP    : niat BENAR, tindakan meleset\n#           "mau klik Simpan, kepencet Hapus"\n#   -> perbaikan lewat DESAIN:\n#      jauhkan tombolnya, beri konfirmasi, sediakan undo\n#\n# MISTAKE : niatnya SENDIRI salah\n#           "mengira Hapus itu artinya keluar dari daftar"\n#   -> perbaikan lewat PENJELASAN:\n#      ganti nama tombol, perbaiki umpan balik\n#\n# Menambah konfirmasi TIDAK menolong mistake --\n# orangnya memang mengira itu benar, dia akan tekan "Ya".',
      penjelasan: `
Pembedaan ini terlihat sepele tetapi menentukan **apakah perbaikanmu berguna sama sekali**.

Bayangkan laporan yang masuk: *"pengguna menghapus data yang seharusnya disimpan"*. Gejalanya satu, tetapi penyebabnya bisa dua hal yang sama sekali berbeda.

**Kalau itu slip**, penggunanya **tahu** ia ingin menyimpan. Jarinya yang meleset. Yang salah adalah **jarak dan kemiripan** antara dua tombol, dan itu urusan tata letak.

Perbaikannya bekerja di tingkat fisik: jauhkan, bedakan warnanya, atau — yang paling ampuh — **sediakan pembatalan** sehingga kesalahan tidak permanen.

**Kalau itu mistake**, penggunanya **mengira menghapus adalah tindakan yang benar**. Model mentalnya keliru: mungkin ia mengira "Hapus" berarti mengeluarkan dari daftar tampilan, bukan memusnahkan data.

Dan di sinilah letak jebakannya: **menambah kotak konfirmasi tidak menolong sama sekali.**

Kotak itu bertanya *"Yakin ingin menghapus?"* — dan pengguna dengan model mental keliru akan menjawab **"Ya, memang itu yang saya mau"**. Konfirmasi hanya menyaring keraguan, dan orang ini **tidak ragu**. Ia yakin, dan keyakinannya yang salah.

Yang menolong mistake adalah **memperbaiki apa yang dipahami**: ganti nama tombol menjadi "Hapus permanen", atau tunjukkan akibatnya dalam kalimat konfirmasinya — *"3 berkas akan dimusnahkan dan tidak bisa dikembalikan"*.

Ada satu petunjuk praktis untuk membedakannya di lapangan: **tanya penggunanya apa yang ia kira sedang terjadi.**

Kalau ia bilang *"aduh, salah pencet"* — itu slip. Kalau ia bilang *"lho, bukannya begitu caranya?"* — itu mistake, dan tata letak seindah apa pun tidak akan memperbaikinya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Batas manusia yang harus dipatuhi antarmuka
# ============================================

# --------------------------------------------
# 1. Memori kerja: kenapa CHUNKING menolong
# --------------------------------------------
nomor = "081234567890"

print("--- chunking ---")
print("  Tanpa chunking : " + " ".join(nomor))
print("                   " + str(len(nomor)) + " satuan untuk diingat")

kelompok = [nomor[0:4], nomor[4:8], nomor[8:12]]
print("  Dengan chunking: " + "-".join(kelompok))
print("                   " + str(len(kelompok)) + " satuan untuk diingat")

print("")
print("  Miller (1956) : kapasitas memori kerja 7 +/- 2 satuan")
print("  Cowan (2001)  : perkiraan lebih baru 4 +/- 1 satuan")
print("  Yang TIDAK berubah: memori kerja sangat KECIL.")
print("")
print("  Chunking tidak menambah kapasitas. Ia membuat")
print("  tiap satuan MEMUAT LEBIH BANYAK.")


# --------------------------------------------
# 2. Recognition over recall
# --------------------------------------------
print("")
print("--- kenali, jangan ingat ---")

PERINTAH = ["salin", "tempel", "hapus", "pindah",
            "ubah nama", "kompres", "bagikan", "cetak"]

print("  RECALL (baris perintah):")
print("      pengguna harus MENGINGAT ke-8 perintah ini")
print("      dari nol, tanpa petunjuk apa pun di layar")
print("      -> membebani memori jangka panjang")

print("")
print("  RECOGNITION (menu):")
for p in PERINTAH:
    print("      [ " + p + " ]")
print("      pengguna cukup MENGENALI yang ia cari")
print("      -> tidak membebani memori sama sekali")

print("")
print("  Menu lebih mudah bukan karena lebih cepat --")
print("  seringkali justru lebih lambat bagi ahli.")
print("  Ia lebih mudah karena MEMPERLIHATKAN pilihannya.")


# --------------------------------------------
# 3. Tiga jenis penalaran
# --------------------------------------------
print("")
print("--- deduksi, induksi, abduksi ---")

NALAR = [
    ("Deduksi",
     "umum -> khusus",
     "Semua berkas .txt bisa dibuka Notepad. catatan.txt itu .txt.",
     "Maka catatan.txt bisa dibuka Notepad.",
     "PASTI benar kalau premisnya benar"),
    ("Induksi",
     "khusus -> umum",
     "5 tombol merah yang saya klik ternyata menghapus data.",
     "Maka semua tombol merah menghapus data.",
     "MUNGKIN benar, tidak pernah pasti"),
    ("Abduksi",
     "akibat -> sebab",
     "Halaman gagal termuat.",
     "Maka internet saya putus.",
     "SERING salah, tapi paling banyak dipakai sehari-hari"),
]

for nama, arah, premis, simpul, sifat in NALAR:
    print("  " + nama + "  (" + arah + ")")
    print("      premis     : " + premis)
    print("      kesimpulan : " + simpul)
    print("      sifat      : " + sifat)

print("")
print("  Abduksi menjelaskan banyak salah paham pengguna:")
print("  ia menebak sebab dari akibat, dan tebakannya masuk")
print("  akal -- tapi belum tentu benar.")


# --------------------------------------------
# 4. Slip vs mistake
# --------------------------------------------
print("")
print("--- membedakan slip dan mistake ---")

LAPORAN = [
    ("Aduh, salah pencet!",
     "slip",    "niat benar, tindakan meleset"),
    ("Lho, bukannya begitu caranya?",
     "mistake", "niatnya sendiri salah"),
    ("Maaf, tangan saya kesenggol",
     "slip",    "niat benar, tindakan meleset"),
    ("Saya kira Hapus itu artinya keluar dari daftar",
     "mistake", "model mental keliru"),
]

PERBAIKAN = {
    "slip":    "DESAIN     : jauhkan tombol, beri undo, konfirmasi",
    "mistake": "PENJELASAN : ganti nama, perbaiki umpan balik",
}

for kata, jenis, alasan in LAPORAN:
    print("  \"" + kata + "\"")
    print("      -> " + jenis.upper() + " (" + alasan + ")")
    print("      -> " + PERBAIKAN[jenis])

print("")
print("  Konfirmasi TIDAK menolong mistake: penggunanya")
print("  memang mengira itu benar, jadi dia tekan 'Ya'.")


# --------------------------------------------
# 5. Perbedaan individual: warna saja tidak cukup
# --------------------------------------------
print("")
print("--- jangan bergantung pada warna saja ---")

STATUS = [
    ("Berjalan",  "hijau",  "*"),
    ("Selesai",   "biru",   "v"),
    ("Dibatalkan","merah",  "x"),
]

print("  Hanya warna (buta warna merah-hijau tidak bisa membedakan):")
for nama, warna, _ in STATUS:
    print("      [" + warna.ljust(6) + "] " + nama)

print("")
print("  Warna + lambang + teks (semua orang bisa membedakan):")
for nama, warna, lambang in STATUS:
    print("      [" + warna.ljust(6) + "] " + lambang + "  " + nama)

print("")
print("  Sekitar 8 persen laki-laki mengalami buta warna")
print("  merah-hijau. Desain yang HANYA mengandalkan warna")
print("  mengecualikan mereka sepenuhnya.")`
  },

  output: `--- chunking ---
  Tanpa chunking : 0 8 1 2 3 4 5 6 7 8 9 0
                   12 satuan untuk diingat
  Dengan chunking: 0812-3456-7890
                   3 satuan untuk diingat

  Miller (1956) : kapasitas memori kerja 7 +/- 2 satuan
  Cowan (2001)  : perkiraan lebih baru 4 +/- 1 satuan
  Yang TIDAK berubah: memori kerja sangat KECIL.

  Chunking tidak menambah kapasitas. Ia membuat
  tiap satuan MEMUAT LEBIH BANYAK.

--- kenali, jangan ingat ---
  RECALL (baris perintah):
      pengguna harus MENGINGAT ke-8 perintah ini
      dari nol, tanpa petunjuk apa pun di layar
      -> membebani memori jangka panjang

  RECOGNITION (menu):
      [ salin ]
      [ tempel ]
      [ hapus ]
      [ pindah ]
      [ ubah nama ]
      [ kompres ]
      [ bagikan ]
      [ cetak ]
      pengguna cukup MENGENALI yang ia cari
      -> tidak membebani memori sama sekali

  Menu lebih mudah bukan karena lebih cepat --
  seringkali justru lebih lambat bagi ahli.
  Ia lebih mudah karena MEMPERLIHATKAN pilihannya.

--- deduksi, induksi, abduksi ---
  Deduksi  (umum -> khusus)
      premis     : Semua berkas .txt bisa dibuka Notepad. catatan.txt itu .txt.
      kesimpulan : Maka catatan.txt bisa dibuka Notepad.
      sifat      : PASTI benar kalau premisnya benar
  Induksi  (khusus -> umum)
      premis     : 5 tombol merah yang saya klik ternyata menghapus data.
      kesimpulan : Maka semua tombol merah menghapus data.
      sifat      : MUNGKIN benar, tidak pernah pasti
  Abduksi  (akibat -> sebab)
      premis     : Halaman gagal termuat.
      kesimpulan : Maka internet saya putus.
      sifat      : SERING salah, tapi paling banyak dipakai sehari-hari

  Abduksi menjelaskan banyak salah paham pengguna:
  ia menebak sebab dari akibat, dan tebakannya masuk
  akal -- tapi belum tentu benar.

--- membedakan slip dan mistake ---
  "Aduh, salah pencet!"
      -> SLIP (niat benar, tindakan meleset)
      -> DESAIN     : jauhkan tombol, beri undo, konfirmasi
  "Lho, bukannya begitu caranya?"
      -> MISTAKE (niatnya sendiri salah)
      -> PENJELASAN : ganti nama, perbaiki umpan balik
  "Maaf, tangan saya kesenggol"
      -> SLIP (niat benar, tindakan meleset)
      -> DESAIN     : jauhkan tombol, beri undo, konfirmasi
  "Saya kira Hapus itu artinya keluar dari daftar"
      -> MISTAKE (model mental keliru)
      -> PENJELASAN : ganti nama, perbaiki umpan balik

  Konfirmasi TIDAK menolong mistake: penggunanya
  memang mengira itu benar, jadi dia tekan 'Ya'.

--- jangan bergantung pada warna saja ---
  Hanya warna (buta warna merah-hijau tidak bisa membedakan):
      [hijau ] Berjalan
      [biru  ] Selesai
      [merah ] Dibatalkan

  Warna + lambang + teks (semua orang bisa membedakan):
      [hijau ] *  Berjalan
      [biru  ] v  Selesai
      [merah ] x  Dibatalkan

  Sekitar 8 persen laki-laki mengalami buta warna
  merah-hijau. Desain yang HANYA mengandalkan warna
  mengecualikan mereka sepenuhnya.`,

  kesalahanUmum: [
    {
      salah: 'Menyebut angka tujuh plus minus dua sebagai kapasitas memori kerja yang sudah pasti.',
      kenapa: 'Angka Miller dari tahun 1956 sering dikutip seolah hukum alam, padahal penelitian yang lebih baru seperti Cowan tahun 2001 memperkirakan kapasitas sesungguhnya lebih dekat ke empat plus minus satu ketika pengulangan dicegah. Mengutipnya sebagai angka pasti membuat orang merancang menu tujuh butir dan menganggapnya aman.',
      benar: 'Sebutkan keduanya, dan ambil intinya: memori kerja sangat kecil, jadi jangan menuntut pengguna mengingat banyak hal sekaligus.'
    },
    {
      salah: 'Menangani mistake dengan menambah kotak konfirmasi.',
      kenapa: 'Konfirmasi hanya menyaring keraguan, sedangkan pengguna yang melakukan mistake tidak ragu sama sekali. Ia yakin tindakannya benar, jadi ia akan menekan Ya. Kesalahannya ada pada apa yang ia pahami, bukan pada gerakan tangannya.',
      benar: 'Perbaiki mistake dengan mengubah apa yang dipahami: ganti nama tombol, perjelas akibatnya dalam kalimat, dan perbaiki umpan balik sistem.'
    },
    {
      salah: 'Membedakan status hanya dengan warna.',
      kenapa: 'Sekitar delapan persen laki-laki mengalami buta warna merah-hijau, sehingga badge hijau dan merah tampak sama bagi mereka. Warna juga hilang saat dicetak hitam putih atau dilihat di bawah sinar matahari.',
      benar: 'Sertakan lambang atau teks di samping warna, sehingga informasinya tetap terbaca meski warnanya tidak terlihat.'
    },
    {
      salah: 'Menganggap antarmuka yang membuat frustrasi hanya soal kenyamanan.',
      kenapa: 'Norman menunjukkan bahwa emosi negatif mempersempit cara berpikir, sehingga pengguna yang tertekan terpaku pada satu cara dan berhenti mencari jalan lain. Antarmuka yang menjengkelkan tidak sekadar tidak menyenangkan, ia menurunkan kemampuan berpikir penggunanya.',
      benar: 'Perlakukan frustrasi sebagai masalah kemampuan, bukan selera. Tugas mudah pun jadi sulit bagi pengguna yang sudah kesal.'
    }
  ],

  analogi: `Bayangkan kamu adalah **pelayan restoran yang tidak boleh mencatat**.

**Memori kerja** kamu adalah apa yang bisa kamu bawa dalam kepala dari meja ke dapur. Kalau satu meja memesan **empat hal**, kamu sanggup. Kalau memesan **dua belas hal**, kamu pasti kehilangan sebagian di jalan.

Itulah kenapa antarmuka yang menampilkan dua belas pilihan tanpa pengelompokan terasa melelahkan. Bukan karena penggunanya bodoh — karena **wadahnya memang sekecil itu**.

**Chunking** adalah trik pelayan berpengalaman. Ia tidak mengingat *"nasi, ayam, sambal, teh, es, gula"* sebagai enam hal. Ia mengingat **"dua paket ayam, satu es teh manis"** — tiga hal, isinya sama.

Chunking **tidak memperbesar kepalamu**. Ia membuat setiap tempat yang tersedia **memuat lebih banyak**.

**Recognition over recall** adalah perbedaan antara pelanggan yang harus **menyebutkan pesanan dari ingatan** dan pelanggan yang **diberi daftar menu**.

Daftar menu tidak lebih cepat — membacanya justru makan waktu. Tetapi ia **jauh lebih mudah**, karena kamu cukup mengenali apa yang kamu mau, bukan menggalinya dari ingatan.

Sekarang bagian yang paling menentukan: **slip dan mistake**.

**Slip** adalah pelayan yang **tahu persis** meja 4 memesan teh manis, tetapi tanpa sengaja mengambil gelas teh tawar yang berdiri di sebelahnya.

Perbaikannya soal **penataan**: pisahkan nampannya, beri warna gelas yang berbeda, atau biarkan dia menukar sebelum sampai ke meja.

**Mistake** adalah pelayan yang **sungguh-sungguh mengira** "teh manis" di restoran ini berarti teh tawar dengan gula terpisah di piring.

Dan inilah intinya: **memisahkan nampan tidak menolong sama sekali**. Memberi warna gelas berbeda juga tidak. Bahkan bertanya *"yakin ini pesanannya?"* tidak menolong — dia akan menjawab **"yakin"**, karena memang begitu yang ia pahami.

Yang menolong hanya satu: **memberi tahu dia apa arti teh manis di sini.**`,

  latihan: [
    'Sebutkan dua tahap dalam mekanisme penglihatan manusia, dan jelaskan kenapa tahap kedua penting bagi perancang antarmuka.',
    'Sebutkan tiga tingkat memori manusia beserta sifat masing-masing, dan jelaskan apa yang memindahkan informasi antar-tingkat.',
    'Jelaskan apa itu chunking dan kenapa ia menolong, lalu terapkan pada nomor rekening 16 digit.',
    'Jelaskan perbedaan deduksi, induksi, dan abduksi beserta satu contoh masing-masing dari penggunaan komputer sehari-hari.',
    'Jelaskan perbedaan slip dan mistake, lalu jelaskan kenapa kotak konfirmasi tidak menolong salah satunya.',
    'Rancang ulang badge status yang hanya memakai warna hijau, biru, dan merah agar tetap terbaca oleh pengguna buta warna.'
  ]
});

TOPICS.push({
  id: 'imk-interaksi',
  judul: 'Model Interaksi & Gaya Interaksi',
  kategori: 'imk',
  tag: ['Norman', 'gulf of execution', 'gulf of evaluation', 'WIMP', 'interaction style', 'paradigm shift'],
  ringkas: 'Model Norman, dua jurang yang membuat antarmuka gagal, dan bagaimana gaya interaksi berkembang.',

  fungsi: `**Menemukan di mana tepatnya sebuah antarmuka membingungkan.**

Keluhan *"aplikasinya ribet"* tidak bisa ditindaklanjuti. Model Norman mengubahnya menjadi pertanyaan yang bisa dijawab.

Terpakai di:

- **Menelusuri keluhan pengguna** — di tahap mana ia macet
- **Memutuskan perbaikan yang tepat** — tombol lebih besar atau umpan balik
- **Merancang alur** — memastikan tiap tindakan punya tanggapan
- **Evaluasi usability**

Dua jurangnya menuntut perbaikan yang **berbeda**:

- **Gulf of execution** — *"di mana tombolnya?"* → buat tindakan **terlihat**
- **Gulf of evaluation** — *"sudah tersimpan belum?"* → beri **umpan balik**

Menambah tombol tidak menolong orang yang bingung apakah simpanannya berhasil.`,

  praktik: {
    tujuan: `Kamu bisa menempatkan setiap keluhan pengguna pada jurang yang tepat, dan memberi perbaikan yang sesuai.`,
    alat: [
      'Aplikasimu sendiri',
      'Beberapa orang untuk diuji'
    ],
    langkah: [
      { judul: 'Kumpulkan keluhan dengan kata-kata aslinya',
        isi: `Jangan menerjemahkan dulu. Catat persis apa yang diucapkan pengguna.

*"Kok nggak ada apa-apa?"* dan *"Nggak nemu tombolnya"* menunjuk jurang yang berbeda, dan kata-katanya sendiri sudah memberi petunjuk.` },
      { judul: 'Tempatkan tiap keluhan pada tahapnya',
        isi: `Tanyakan di tahap mana ia macet:

- macet **membentuk niat atau menemukan caranya** → jurang **eksekusi**
- macet **memahami apa yang terjadi** → jurang **evaluasi**

Golongan ini menentukan perbaikan mana yang berguna dan mana yang sia-sia.` },
      { judul: 'Perbaiki jurang eksekusi',
        isi: `Buat tindakannya **terlihat**: tombol yang jelas, label yang menyebut kata kerja, dan ikon yang tidak ambigu.

Hindari tindakan yang hanya bisa ditemukan lewat klik kanan atau gestur tersembunyi — itu jurang eksekusi yang dibuat sengaja.` },
      { judul: 'Perbaiki jurang evaluasi',
        isi: `Setiap tindakan harus punya **tanggapan yang terlihat**:

- tombol berubah saat ditekan
- indikator saat sedang memproses
- pesan setelah selesai
- pesan yang jelas kalau gagal

Uji sederhana: **berapa tombol di aplikasimu yang pernah kamu tekan dua kali** karena tidak yakin? Itu daftar tempat umpan baliknya kurang.` },
      { judul: 'Bedakan goal dari task',
        isi: `Tulis apa yang **sebenarnya diinginkan** pengguna, lalu hitung berapa langkah yang harus ia lalui.

Setiap langkah yang bisa dihapus adalah kemenangan. Setiap tujuan yang hilang adalah kegagalan.

Cari fitur di aplikasimu yang butuh lebih dari lima langkah, dan cari apakah bisa dipersingkat.` },
      { judul: 'Uji di lingkungan yang sebenarnya',
        isi: `Konteks fisik, sosial, dan organisasi ikut menentukan.

Aplikasi kasir yang sempurna di ruang ber-AC bisa gagal di pasar yang bising, terkena matahari langsung, dan dipakai dengan tangan basah.

Uji di tempat ia benar-benar akan dipakai, dengan gangguan yang benar-benar ada di sana.` },
      { judul: 'Hitung nilai bersih untuk penggunanya',
        isi: `Orang memakai sistem hanya kalau **manfaatnya melebihi usaha mempelajarinya**.

Kalau sistemmu ditolak, sering bukan karena kurang baik — melainkan karena usaha pindahnya terlalu besar.

Turunkan usaha belajar sama seriusnya dengan menaikkan manfaat.` }
    ],
    cek: [
      'Setiap keluhan yang kamu kumpulkan sudah ditempatkan pada jurang yang tepat',
      'Tidak ada tombol di aplikasimu yang tidak memberi tanggapan terlihat saat ditekan',
      'Kamu sudah menguji aplikasimu di tempat ia benar-benar akan dipakai'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa jurangnya di situ',

  konsep: `
**Model interaksi** adalah kerangka yang menerjemahkan komunikasi antara pengguna dan sistem. Ia berguna karena memberi **tempat untuk menunjuk** ketika sesuatu terasa salah.

**Tiga istilah yang harus dibedakan**

- **Domain** — bidang tempat sistem dipakai (pendidikan, perbankan, kesehatan)
- **Goal** — **keadaan akhir** yang ingin dicapai pengguna
- **Task** — **langkah-langkah** yang harus ia lakukan untuk sampai ke sana

Bedanya penting. *"Punya salinan cadangan skripsi"* adalah **goal**. *"Klik kanan, pilih salin, buka drive, tempel"* adalah **task**.

Pengguna **peduli pada goal** dan **menoleransi task**. Setiap task yang bisa kamu hapus adalah kemenangan; setiap goal yang kamu hilangkan adalah kegagalan.

**Model Norman: siklus eksekusi–evaluasi**

Interaksi berputar dalam tujuh tahap:

- **Menetapkan tujuan** — apa yang ingin dicapai
- **Membentuk niat** — memutuskan mau berbuat apa
- **Menentukan urutan tindakan** — merinci langkahnya
- **Melaksanakan tindakan** — benar-benar menyentuh antarmukanya
- **Mempersepsi keadaan sistem** — melihat apa yang berubah
- **Menafsirkan keadaan sistem** — memahami artinya
- **Mengevaluasi** — membandingkannya dengan tujuan semula

Empat tahap pertama adalah **eksekusi**. Tiga terakhir adalah **evaluasi**. Kalau tujuannya belum tercapai, siklusnya berulang.

**Dua jurang**

Di sinilah letak kegunaan model itu. Kegagalan antarmuka hampir selalu jatuh ke salah satu dari dua celah:

**Gulf of execution** — jarak antara **apa yang ingin dilakukan pengguna** dan **apa yang disediakan sistem**.

Lebar ketika pengguna tahu persis apa yang ia mau, tetapi **tidak menemukan caranya**. Gejalanya: *"saya tahu ini bisa, tapi di mana tombolnya?"*

**Gulf of evaluation** — jarak antara **keadaan sistem sesungguhnya** dan **apa yang bisa ditangkap pengguna dari tampilannya**.

Lebar ketika sistem sudah melakukan sesuatu, tetapi pengguna **tidak bisa tahu apakah berhasil**. Gejalanya: *"sudah kesimpan belum ya?"*

**Keduanya menuntut perbaikan yang berbeda.** Jurang eksekusi dipersempit dengan membuat tindakan **terlihat dan terjangkau**. Jurang evaluasi dipersempit dengan **umpan balik**.

Menambah tombol tidak menolong orang yang bingung apakah simpanannya berhasil. Menambah notifikasi tidak menolong orang yang tidak menemukan tombolnya.

**Tiga konteks interaksi**

Interaksi tidak terjadi di ruang hampa:

- **Konteks sosial** — kelompok dan lingkungan sosial tempat interaksi terjadi
- **Konteks organisasi** — aturan dan struktur kerja tempat sistem dipakai
- **Konteks fisik** — kondisi lingkungan nyata: cahaya, kebisingan, getaran

Sistem kasir yang sempurna di ruang ber-AC bisa gagal total di pasar yang bising dan terkena sinar matahari langsung.

**Gaya interaksi**

- **Command line** — perintah berbasis teks. Cepat dan kuat bagi ahli, **menuntut ingatan** bagi pemula.
- **Menu** — daftar pilihan. Memperlihatkan apa yang tersedia.
- **Natural language** — bahasa sehari-hari. Luwes, tetapi **rawan salah tafsir**.
- **Question/answer & query dialogue** — sistem bertanya, pengguna menjawab. Mesin pencari dan basis data.
- **Form-fills & spreadsheets** — isian terstruktur. Cocok untuk **pemasukan data**.
- **WIMP** — *Windows, Icons, Menus, Pointers*. Gaya utama sistem operasi meja.
- **Point and click** — menunjuk lalu mengklik.
- **Three-dimensional interfaces** — ruang tiga dimensi: permainan, desain 3D, simulasi.

**Tidak ada gaya yang terbaik.** Command line mengalahkan WIMP untuk pekerjaan berulang yang bisa ditulis jadi skrip. WIMP mengalahkan command line untuk penjelajahan.

**Value: kenapa sistem ditolak**

Orang hanya memakai sistem kalau **nilai yang dirasakan lebih besar daripada usaha mempelajarinya**.

Ini menjelaskan kenapa sistem yang secara teknis lebih baik sering kalah: kalau usaha belajarnya besar dan manfaatnya tidak langsung terasa, orang **bertahan dengan cara lama** — bahkan cara lama yang buruk.

**Pergeseran paradigma**

Sejarah IMK adalah rangkaian lompatan:

- **Batch processing** — kartu berlubang, hasil menyusul. **Belum interaktif sama sekali.**
- **Timesharing** — banyak pengguna satu komputer pusat. **Lahirnya interaksi sesungguhnya**: perintah langsung, tanggapan seketika.
- **Microprocessor** — daya komputasi dimampatkan ke kepingan murah. Lahirnya komputer pribadi.
- **Graphical display** — jendela, ikon, menu, penunjuk. Komputer jadi **bisa dipelajari orang awam**.
- **Networking & World Wide Web** — dari mesin terisolasi menjadi gerbang komunikasi global.
- **Ubiquitous computing** — komputer melebur ke lingkungan dan **berhenti terasa seperti komputer**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# DUA JURANG -- dan kenapa obatnya berbeda\n#\n# GULF OF EXECUTION\n#   "saya tahu mau apa, tapi di mana tombolnya?"\n#   jarak: NIAT pengguna  <-->  TINDAKAN yang disediakan\n#   obat : buat tindakan TERLIHAT dan terjangkau\n#\n# GULF OF EVALUATION\n#   "sudah kesimpan belum ya?"\n#   jarak: KEADAAN sistem  <-->  APA YANG TERBACA di layar\n#   obat : UMPAN BALIK yang jelas\n#\n# Menambah tombol tidak menolong orang yang bingung\n# apakah simpanannya berhasil.\n# Menambah notifikasi tidak menolong orang yang tidak\n# menemukan tombolnya.',
      penjelasan: `
Model Norman berguna bukan karena tujuh tahapnya perlu dihafal, melainkan karena ia memberi **tempat untuk menunjuk** ketika ada keluhan.

Ambil keluhan yang paling sering terdengar: *"aplikasinya membingungkan."* Kalimat itu tidak bisa ditindaklanjuti. Tetapi dengan model ini, kamu bisa bertanya **di tahap mana ia macet**.

Kalau macetnya di **tahap 2 sampai 4** — membentuk niat, menentukan urutan, melaksanakan — itu **jurang eksekusi**. Penggunanya tahu apa yang ia mau, dan tidak tahu bagaimana menyuruh sistem melakukannya.

Kalau macetnya di **tahap 5 sampai 7** — mempersepsi, menafsirkan, mengevaluasi — itu **jurang evaluasi**. Sistemnya sudah bekerja, tetapi penggunanya tidak bisa tahu.

Sekarang perhatikan kenapa **membedakannya menentukan apakah perbaikanmu berguna**.

Bayangkan pengguna mengeluh soal menyimpan berkas. Kamu menambahkan tombol Simpan yang besar dan mencolok di tengah layar.

- **Kalau masalahnya jurang eksekusi**, kamu baru saja menyelesaikannya.
- **Kalau masalahnya jurang evaluasi**, kamu tidak mengubah apa pun. Penggunanya **sudah menemukan tombolnya** — ia menekannya, dan **tidak terjadi apa-apa yang terlihat**. Tombol yang lebih besar tidak menjawab pertanyaan *"berhasil tidak?"*.

Yang menjawab pertanyaan itu adalah **umpan balik**: pesan "tersimpan", tanda perubahan yang hilang, waktu simpan terakhir yang tertulis.

Ada satu jenis kegagalan yang **hanya bisa dijelaskan oleh jurang evaluasi**, dan kamu pasti pernah mengalaminya: menekan tombol yang sama **berkali-kali** karena tidak yakin tekanan pertamamu terdaftar.

Tombol lift, tombol penyeberangan, tombol kirim. Semua tindakan itu **berhasil pada tekanan pertama**. Yang gagal adalah **memberitahumu bahwa ia berhasil** — dan akibatnya kamu mengirim formulir yang sama tiga kali.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Model interaksi Norman & dua jurangnya
# ============================================

TAHAP = [
    (1, "Menetapkan tujuan",          "eksekusi"),
    (2, "Membentuk niat",             "eksekusi"),
    (3, "Menentukan urutan tindakan", "eksekusi"),
    (4, "Melaksanakan tindakan",      "eksekusi"),
    (5, "Mempersepsi keadaan sistem", "evaluasi"),
    (6, "Menafsirkan keadaan sistem", "evaluasi"),
    (7, "Mengevaluasi terhadap tujuan","evaluasi"),
]

print("--- tujuh tahap model Norman ---")
for no, nama, bagian in TAHAP:
    print("  " + str(no) + ". " + nama.ljust(32) + "[" + bagian + "]")


# ============================================
# Menempatkan keluhan pengguna pada jurangnya
# ============================================
def jurang(tahap_macet):
    """Tahap 2-4 = jurang eksekusi, tahap 5-7 = jurang evaluasi."""
    if 2 <= tahap_macet <= 4:
        return ("EKSEKUSI",
                "buat tindakannya TERLIHAT dan terjangkau")
    if 5 <= tahap_macet <= 7:
        return ("EVALUASI",
                "beri UMPAN BALIK yang jelas")
    return ("BUKAN JURANG", "penggunanya belum punya tujuan")


KELUHAN = [
    ("Saya tahu ini bisa, tapi di mana tombolnya?",        3),
    ("Sudah kesimpan belum ya?",                           6),
    ("Saya klik kirim tiga kali karena tidak ada reaksi",   5),
    ("Mau ubah kata sandi, tidak ketemu menunya",           3),
    ("Loadingnya selesai atau macet? Tidak jelas",          6),
    ("Tombolnya ada, tapi saya tidak tahu harus isi apa",   2),
]

print("")
print("--- menempatkan keluhan pada jurangnya ---")
for kata, tahap in KELUHAN:
    nama, obat = jurang(tahap)
    print("  \"" + kata + "\"")
    print("      macet di tahap " + str(tahap) + " -> jurang " + nama)
    print("      obat: " + obat)

print("")
print("  Menambah TOMBOL tidak menolong jurang evaluasi.")
print("  Menambah NOTIFIKASI tidak menolong jurang eksekusi.")
print("  Salah menempatkan = perbaikan yang tidak mengubah apa pun.")


# ============================================
# Goal vs Task: yang mana boleh dihapus?
# ============================================
print("")
print("--- goal vs task ---")

GOAL = "Punya salinan cadangan skripsi di penyimpanan awan"
TASK_LAMA = [
    "Buka penjelajah berkas",
    "Cari folder skripsi",
    "Klik kanan, pilih Salin",
    "Buka peramban, masuk ke akun awan",
    "Cari folder tujuan",
    "Klik kanan, pilih Tempel",
    "Tunggu unggahan selesai",
]
TASK_BARU = [
    "Aktifkan sinkronisasi folder skripsi (sekali saja)",
]

print("  GOAL : " + GOAL)
print("")
print("  Task lama (" + str(len(TASK_LAMA)) + " langkah):")
for i, t in enumerate(TASK_LAMA, 1):
    print("      " + str(i) + ". " + t)
print("")
print("  Task baru (" + str(len(TASK_BARU)) + " langkah):")
for i, t in enumerate(TASK_BARU, 1):
    print("      " + str(i) + ". " + t)

hemat = len(TASK_LAMA) - len(TASK_BARU)
print("")
print("  Goal-nya SAMA PERSIS. Task berkurang " + str(hemat) + " langkah.")
print("  Pengguna peduli pada GOAL dan menoleransi TASK.")
print("  Menghapus task = kemenangan. Menghapus goal = kegagalan.")


# ============================================
# Gaya interaksi: tidak ada yang terbaik
# ============================================
print("")
print("--- gaya interaksi ---")

GAYA = [
    ("Command line",     "cepat & kuat bagi ahli",   "menuntut ingatan"),
    ("Menu",             "memperlihatkan pilihan",   "lambat kalau dalam"),
    ("Natural language", "luwes, tanpa belajar",     "rawan salah tafsir"),
    ("Question/answer",  "menuntun langkah demi langkah", "kaku"),
    ("Form-fills",       "rapi untuk masukan data",  "membosankan"),
    ("WIMP",             "mudah dijelajahi",         "boros gerakan"),
    ("Point and click",  "langsung & intuitif",      "perlu ketepatan motorik"),
    ("3D interfaces",    "cocok untuk ruang nyata",  "berat & mudah tersesat"),
]

print("  " + "gaya".ljust(18) + "kekuatan".ljust(32) + "kelemahan")
for nama, kuat, lemah in GAYA:
    print("  " + nama.ljust(18) + kuat.ljust(32) + lemah)


# ============================================
# Membandingkan gaya untuk satu pekerjaan
# ============================================
print("")
print("--- ubah nama 500 berkas sekaligus ---")

CARA = [
    ("WIMP / point-and-click", 500, "klik kanan -> ubah nama, per berkas"),
    ("Command line",             1, "satu perintah rename dengan pola"),
]
for nama, langkah, ket in CARA:
    print("  " + nama.ljust(26) + str(langkah).rjust(4) + " langkah   " + ket)

print("")
print("  Untuk pekerjaan BERULANG, command line menang telak.")
print("  Untuk MENJELAJAHI hal yang belum dikenal, WIMP menang")
print("  telak -- ia memperlihatkan apa saja yang mungkin.")
print("  Tidak ada gaya yang terbaik; ada gaya yang COCOK.")


# ============================================
# Value: kenapa sistem yang lebih baik ditolak
# ============================================
print("")
print("--- kenapa sistem yang lebih baik bisa ditolak ---")

SISTEM = [
    ("Cara lama (manual)",   3, 0),
    ("Sistem baru A",        9, 10),
    ("Sistem baru B",        6, 1),
]

print("  " + "sistem".ljust(22) + "manfaat".rjust(8) +
      "usaha".rjust(7) + "  nilai bersih")
for nama, manfaat, usaha in SISTEM:
    bersih = manfaat - usaha
    tanda = "  <- dipakai" if bersih > 0 else "  <- ditolak"
    print("  " + nama.ljust(22) + str(manfaat).rjust(8) +
          str(usaha).rjust(7) + str(bersih).rjust(14) + tanda)

print("")
print("  Sistem A paling BAIK secara teknis (manfaat 9),")
print("  tapi usaha belajarnya 10 -- nilai bersihnya negatif.")
print("  Sistem B lebih lemah, tapi hampir tanpa usaha belajar.")
print("")
print("  Orang bertahan dengan cara lama yang buruk kalau")
print("  usaha pindahnya lebih besar daripada manfaatnya.")


# ============================================
# Pergeseran paradigma
# ============================================
print("")
print("--- pergeseran paradigma ---")

PARADIGMA = [
    ("Batch processing", "kartu berlubang, hasil menyusul",
     "belum interaktif sama sekali"),
    ("Timesharing", "banyak pengguna, satu komputer pusat",
     "lahirnya interaksi: perintah langsung, respons seketika"),
    ("Microprocessor", "daya komputasi dimampatkan ke kepingan murah",
     "lahirnya komputer pribadi lalu komputer jinjing"),
    ("Graphical display", "jendela, ikon, menu, penunjuk",
     "komputer jadi bisa dipelajari orang awam"),
    ("Networking & WWW", "terhubung ke jaringan global",
     "dari mesin terisolasi jadi gerbang komunikasi"),
    ("Ubiquitous computing", "melebur ke lingkungan sehari-hari",
     "komputer berhenti terasa seperti komputer"),
]

for nama, apa, akibat in PARADIGMA:
    print("  " + nama)
    print("      " + apa)
    print("      -> " + akibat)`
  },

  output: `--- tujuh tahap model Norman ---
  1. Menetapkan tujuan               [eksekusi]
  2. Membentuk niat                  [eksekusi]
  3. Menentukan urutan tindakan      [eksekusi]
  4. Melaksanakan tindakan           [eksekusi]
  5. Mempersepsi keadaan sistem      [evaluasi]
  6. Menafsirkan keadaan sistem      [evaluasi]
  7. Mengevaluasi terhadap tujuan    [evaluasi]

--- menempatkan keluhan pada jurangnya ---
  "Saya tahu ini bisa, tapi di mana tombolnya?"
      macet di tahap 3 -> jurang EKSEKUSI
      obat: buat tindakannya TERLIHAT dan terjangkau
  "Sudah kesimpan belum ya?"
      macet di tahap 6 -> jurang EVALUASI
      obat: beri UMPAN BALIK yang jelas
  "Saya klik kirim tiga kali karena tidak ada reaksi"
      macet di tahap 5 -> jurang EVALUASI
      obat: beri UMPAN BALIK yang jelas
  "Mau ubah kata sandi, tidak ketemu menunya"
      macet di tahap 3 -> jurang EKSEKUSI
      obat: buat tindakannya TERLIHAT dan terjangkau
  "Loadingnya selesai atau macet? Tidak jelas"
      macet di tahap 6 -> jurang EVALUASI
      obat: beri UMPAN BALIK yang jelas
  "Tombolnya ada, tapi saya tidak tahu harus isi apa"
      macet di tahap 2 -> jurang EKSEKUSI
      obat: buat tindakannya TERLIHAT dan terjangkau

  Menambah TOMBOL tidak menolong jurang evaluasi.
  Menambah NOTIFIKASI tidak menolong jurang eksekusi.
  Salah menempatkan = perbaikan yang tidak mengubah apa pun.

--- goal vs task ---
  GOAL : Punya salinan cadangan skripsi di penyimpanan awan

  Task lama (7 langkah):
      1. Buka penjelajah berkas
      2. Cari folder skripsi
      3. Klik kanan, pilih Salin
      4. Buka peramban, masuk ke akun awan
      5. Cari folder tujuan
      6. Klik kanan, pilih Tempel
      7. Tunggu unggahan selesai

  Task baru (1 langkah):
      1. Aktifkan sinkronisasi folder skripsi (sekali saja)

  Goal-nya SAMA PERSIS. Task berkurang 6 langkah.
  Pengguna peduli pada GOAL dan menoleransi TASK.
  Menghapus task = kemenangan. Menghapus goal = kegagalan.

--- gaya interaksi ---
  gaya              kekuatan                        kelemahan
  Command line      cepat & kuat bagi ahli          menuntut ingatan
  Menu              memperlihatkan pilihan          lambat kalau dalam
  Natural language  luwes, tanpa belajar            rawan salah tafsir
  Question/answer   menuntun langkah demi langkah   kaku
  Form-fills        rapi untuk masukan data         membosankan
  WIMP              mudah dijelajahi                boros gerakan
  Point and click   langsung & intuitif             perlu ketepatan motorik
  3D interfaces     cocok untuk ruang nyata         berat & mudah tersesat

--- ubah nama 500 berkas sekaligus ---
  WIMP / point-and-click     500 langkah   klik kanan -> ubah nama, per berkas
  Command line                 1 langkah   satu perintah rename dengan pola

  Untuk pekerjaan BERULANG, command line menang telak.
  Untuk MENJELAJAHI hal yang belum dikenal, WIMP menang
  telak -- ia memperlihatkan apa saja yang mungkin.
  Tidak ada gaya yang terbaik; ada gaya yang COCOK.

--- kenapa sistem yang lebih baik bisa ditolak ---
  sistem                 manfaat  usaha  nilai bersih
  Cara lama (manual)           3      0             3  <- dipakai
  Sistem baru A                9     10            -1  <- ditolak
  Sistem baru B                6      1             5  <- dipakai

  Sistem A paling BAIK secara teknis (manfaat 9),
  tapi usaha belajarnya 10 -- nilai bersihnya negatif.
  Sistem B lebih lemah, tapi hampir tanpa usaha belajar.

  Orang bertahan dengan cara lama yang buruk kalau
  usaha pindahnya lebih besar daripada manfaatnya.

--- pergeseran paradigma ---
  Batch processing
      kartu berlubang, hasil menyusul
      -> belum interaktif sama sekali
  Timesharing
      banyak pengguna, satu komputer pusat
      -> lahirnya interaksi: perintah langsung, respons seketika
  Microprocessor
      daya komputasi dimampatkan ke kepingan murah
      -> lahirnya komputer pribadi lalu komputer jinjing
  Graphical display
      jendela, ikon, menu, penunjuk
      -> komputer jadi bisa dipelajari orang awam
  Networking & WWW
      terhubung ke jaringan global
      -> dari mesin terisolasi jadi gerbang komunikasi
  Ubiquitous computing
      melebur ke lingkungan sehari-hari
      -> komputer berhenti terasa seperti komputer`,

  kesalahanUmum: [
    {
      salah: 'Menanggapi semua keluhan "aplikasinya membingungkan" dengan cara yang sama.',
      kenapa: 'Kebingungan bisa berasal dari jurang eksekusi atau jurang evaluasi, dan keduanya menuntut perbaikan yang sama sekali berbeda. Memperbesar tombol tidak menolong orang yang sudah menemukan tombolnya tetapi tidak tahu apakah tekanannya berhasil.',
      benar: 'Tanyakan di tahap mana penggunanya macet. Tahap dua sampai empat berarti jurang eksekusi, tahap lima sampai tujuh berarti jurang evaluasi.'
    },
    {
      salah: 'Mencampuradukkan goal dan task saat mendaftar kebutuhan pengguna.',
      kenapa: 'Kalau task dicatat sebagai kebutuhan, kamu akan mempertahankan langkah-langkah yang sebenarnya boleh dihapus. Pengguna tidak menginginkan tujuh langkah menyalin berkas, ia menginginkan salinannya ada.',
      benar: 'Tulis kebutuhan sebagai goal, lalu cari jalan sependek mungkin menuju goal itu. Task boleh dipangkas habis, goal tidak boleh hilang.'
    },
    {
      salah: 'Menganggap satu gaya interaksi lebih unggul secara mutlak.',
      kenapa: 'Command line mengalahkan antarmuka grafis untuk pekerjaan berulang yang bisa ditulis jadi pola, tetapi kalah telak untuk menjelajahi hal yang belum dikenal karena tidak memperlihatkan apa saja yang mungkin. Keunggulannya bergantung pada pekerjaannya.',
      benar: 'Pilih gaya berdasarkan sifat pekerjaannya, dan sediakan lebih dari satu gaya kalau penggunanya beragam.'
    },
    {
      salah: 'Mengira sistem yang lebih baik pasti akan dipakai.',
      kenapa: 'Orang hanya berpindah kalau manfaat yang dirasakan melebihi usaha mempelajarinya. Sistem yang secara teknis unggul tetapi menuntut belajar banyak sering kalah dari cara lama yang buruk tetapi sudah dikuasai.',
      benar: 'Hitung nilai bersihnya: manfaat dikurangi usaha belajar. Turunkan usaha belajar sama seriusnya dengan menaikkan manfaat.'
    },
    {
      salah: 'Menguji antarmuka hanya di lingkungan yang nyaman.',
      kenapa: 'Konteks fisik, sosial, dan organisasi ikut menentukan keberhasilan. Sistem kasir yang sempurna di ruang ber-AC bisa gagal total di pasar yang bising, terkena sinar matahari langsung, dan dipakai dengan tangan basah.',
      benar: 'Uji di tempat sistem itu benar-benar akan dipakai, dengan gangguan yang benar-benar ada di sana.'
    }
  ],

  analogi: `Bayangkan kamu masuk ke **dapur orang lain** dan ingin membuat kopi.

**Gulf of execution** adalah jarak antara *"saya mau merebus air"* dan **menemukan cara melakukannya di dapur ini**.

Kompornya mungkin ada, tetapi tombolnya tersembunyi di belakang. Mungkin ada tujuh kenop dan tidak ada yang berlabel. Kamu **tahu persis apa yang kamu mau** — dan tetap terhenti.

Jurang ini dipersempit dengan membuat tindakan **terlihat**: kenop yang jelas, label yang benar, dan tata letak yang menunjukkan kenop mana untuk tungku mana.

**Gulf of evaluation** adalah jarak antara **kompornya sudah menyala atau belum** dan **apakah kamu bisa tahu**.

Kompor listrik yang tidak berpijar adalah contoh paling jahat. Kamu memutar kenopnya, dan **tidak ada yang berubah**. Tidak ada nyala, tidak ada bunyi, tidak ada panas yang langsung terasa.

Jadi kamu memutarnya lagi. Dan lagi. Lalu meletakkan tangan di atasnya untuk memastikan — dan **terbakar**.

Perhatikan bahwa **memperbesar kenopnya tidak menolong sama sekali** di sini. Kamu sudah menemukannya. Kamu sudah memutarnya. Yang hilang adalah **cara mengetahui hasilnya**.

Yang menolong hanya **lampu kecil yang menyala** ketika tungkunya aktif.

Sekarang lihat ke sekelilingmu: **berapa banyak tombol yang kamu tekan dua kali** dalam hidupmu karena tidak yakin tekanan pertama terdaftar?

Tombol lift. Tombol penyeberangan jalan. Tombol kirim pada formulir yang lambat.

Ketiganya **bekerja dengan sempurna pada tekanan pertama**. Yang gagal adalah **memberitahumu**. Dan akibatnya nyata: formulir yang sama terkirim tiga kali, dan sekarang ada tiga pesanan atas namamu.`,

  latihan: [
    'Sebutkan tujuh tahap model interaksi Norman, dan tandai mana yang termasuk eksekusi dan mana yang evaluasi.',
    'Jelaskan perbedaan gulf of execution dan gulf of evaluation, lalu sebutkan satu perbaikan yang tepat untuk masing-masing.',
    'Untuk tiap keluhan berikut, tentukan jurang mana yang lebar: "tidak ketemu tombol keluarnya", "sudah terkirim belum ya", "saya tidak tahu harus isi apa di kolom ini".',
    'Jelaskan perbedaan domain, goal, dan task, lalu tulis satu goal dari kegiatanmu sehari-hari beserta task yang menyertainya.',
    'Sebutkan delapan gaya interaksi beserta satu kekuatan dan satu kelemahan masing-masing.',
    'Jelaskan kenapa sistem yang secara teknis lebih baik bisa ditolak pengguna, dengan memakai gagasan nilai yang dirasakan.',
    'Urutkan enam pergeseran paradigma dalam sejarah IMK, dan jelaskan apa yang berubah pada tiap lompatan.'
  ]
});

TOPICS.push({
  id: 'imk-ucd-usability',
  judul: 'User-Centered Design & Evaluasi Usability',
  kategori: 'imk',
  tag: ['UCD', 'usability', 'SUS', 'WCAG', 'prototype', 'kontras', 'evaluasi'],
  ringkas: 'Merancang dari kebutuhan pengguna, lalu membuktikannya dengan angka — SUS dan rasio kontras dihitung sungguhan.',

  fungsi: `**Merancang berdasarkan kebutuhan pengguna nyata, lalu membuktikannya dengan angka.**

Terpakai di:

- **Bab evaluasi** tugas akhir — SUS adalah alat yang paling sering dipakai
- **Membuktikan perbaikan** — bukan sekadar mengatakan "lebih bagus"
- **Aksesibilitas** — memenuhi standar kontras dan ukuran sentuh
- **Menentukan prioritas perbaikan** dari temuan pengujian

Yang paling sering salah dipahami: **skor SUS bukan persentase.**

Angka 68 bukan berarti 68 persen pengguna puas — ia nilai pada skala yang rata-rata industrinya kebetulan 68.

Dan satu hal yang wajib dilakukan tetapi hampir selalu dilewatkan: **hitung ulang angkamu sendiri.** Angka yang muncul di dua tempat dalam satu laporan sering berbeda.`,

  praktik: {
    tujuan: `Kamu punya hasil pengujian usability dengan skor SUS yang benar dan pemeriksaan kontras yang terhitung, bukan diperkirakan.`,
    alat: [
      'Kuesioner SUS 10 butir',
      'Spreadsheet atau Python',
      'Alat pemeriksa kontras seperti WebAIM'
    ],
    langkah: [
      { judul: 'Mulai dari lo-fi, bukan hi-fi',
        isi: `Buat purwarupa abu-abu tanpa warna dan gambar dulu.

Kalau kamu menunjukkan hi-fi lebih dulu, komentar yang masuk akan tentang **warna** — dan masalah struktur terlewat, padahal itu yang jauh lebih mahal diperbaiki nanti.` },
      { judul: 'Siapkan skenario tugas, bukan pertanyaan',
        isi: `Jangan bertanya *"bagaimana menurutmu?"*. Beri tugas: *"cari paket tender di wilayah Banyumas dan buka rinciannya"*.

Lalu **diam dan amati**. Jangan membantu, jangan menjelaskan.

Setiap kali kamu tergoda menjelaskan, itu tanda ada yang perlu diperbaiki di antarmukanya.` },
      { judul: 'Catat yang terukur',
        isi: `Untuk tiap responden catat: berapa lama menyelesaikan tugas, berapa kali salah, dan apakah selesai tanpa bantuan.

Angka ini jauh lebih berguna daripada kesan umum, dan bisa dibandingkan sebelum dan sesudah perbaikan.` },
      { judul: 'Hitung SUS dengan rumus yang benar',
        isi: `- butir **ganjil**: nilai dikurangi 1
- butir **genap**: 5 dikurangi nilai
- jumlahkan kesepuluh hasilnya, lalu **kalikan 2,5**

Periksa kewarasannya: responden yang mencentang angka sama untuk semua butir **harus** menghasilkan tepat 50. Kalau tidak, rumusmu salah.` },
      { judul: 'Hitung ulang angkamu sendiri',
        isi: `Jumlahkan seluruh skor dan bagi jumlah responden — dengan kode atau spreadsheet, bukan dengan tangan.

Lalu periksa apakah angka yang kamu tulis di bab pembahasan **sama** dengan yang di bab kesimpulan.

Ini kesalahan yang sangat sering terjadi dan sangat mudah ditemukan penguji.` },
      { judul: 'Hitung rasio kontras, jangan menebak',
        isi: `Pakai **webaim.org/resources/contrastchecker** untuk **setiap** pasangan warna teks dan latar yang kamu pakai — bukan hanya yang terbaik.

Syarat WCAG AA: **4,5:1** untuk teks biasa, **3:1** untuk teks besar.

Mata bukan alat ukur: teks biru di atas hitam terlihat cukup jelas tetapi rasionya sekitar 2,4 dan gagal.` },
      { judul: 'Sebutkan sumber standar dengan tepat',
        isi: `Ukuran target sentuh 44 kali 44 berasal dari pedoman Apple, dan di WCAG 2.1 ia kriteria **AAA**.

Syarat setingkat **AA** baru muncul di WCAG 2.2 dengan ukuran 24 kali 24.

Memakai 44 itu keputusan bagus; menyebutnya syarat AA yang keliru — dan penguji yang teliti akan menanyakannya.` }
    ],
    cek: [
      'Responden yang mencentang angka sama untuk semua butir menghasilkan skor tepat 50',
      'Angka rata-rata SUS di semua bab laporanmu sama persis',
      'Setiap pasangan warna yang kamu pakai sudah dihitung rasio kontrasnya'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa diukur begitu',

  konsep: `
**User-Centered Design (UCD)** adalah pendekatan yang menempatkan **kebutuhan pengguna sungguhan** sebagai dasar setiap keputusan desain — bukan selera perancang, bukan kebiasaan lama.

Alurnya berputar: **pahami pengguna → tentukan kebutuhan → rancang → evaluasi → ulangi**.

Yang membedakannya dari "merancang lalu bertanya pendapat orang" adalah **evaluasi terjadi sebelum dibangun**, dan **hasilnya benar-benar mengubah rancangan**.

**Memahami pengguna**

**Empathy map** memetakan pengguna dalam empat kuadran: apa yang ia **pikirkan dan rasakan**, apa yang ia **lihat**, apa yang ia **katakan dan lakukan**, dan apa yang ia **dengar** dari sekitarnya.

Gunanya memaksa perancang keluar dari kepalanya sendiri. Perancang tahu di mana tombolnya karena **dia yang menaruh**; pengguna tidak.

**Kebutuhan fungsional dan non-fungsional**

- **Fungsional** — **apa yang sistem lakukan**. "Sistem harus menyediakan pencarian paket tender."
- **Non-fungsional** — **seberapa baik ia melakukannya**. "Waktu muat halaman di bawah 2 detik."

Non-fungsional sering diabaikan karena tidak terlihat sebagai fitur. Padahal ia yang menentukan apakah fitur itu **layak dipakai**. Pencarian yang benar tetapi butuh 30 detik sama saja dengan tidak ada.

**Purwarupa bertingkat**

- **Lo-fi** — kotak abu-abu tanpa warna dan gambar. Fokusnya **struktur dan alur**.
- **Hi-fi** — warna, tipografi, dan data yang realistis. Fokusnya **rasa akhir**.

Urutannya penting. Kalau kamu menunjukkan hi-fi lebih dulu, orang akan **berkomentar soal warna** dan melewatkan masalah struktur. Lo-fi yang sengaja dibuat jelek **memaksa perhatian ke hal yang benar**.

**System Usability Scale (SUS)**

Kuesioner sepuluh butir dengan skala Likert 1 sampai 5. Butir ganjil bernada **positif**, butir genap bernada **negatif** — sengaja diselang-seling supaya responden **membaca**, tidak asal mencentang satu kolom.

**Cara menghitungnya:**

- Butir **ganjil**: nilai dikurangi 1
- Butir **genap**: 5 dikurangi nilai
- Jumlahkan kesepuluh hasilnya → rentangnya 0 sampai 40
- **Kalikan 2,5** → skor akhir 0 sampai 100

**Skor SUS bukan persentase.** Angka 68 bukan berarti "68 persen pengguna puas" — ia adalah nilai pada skala yang **rata-ratanya memang 68**.

**Penafsirannya:** ≥ 80,3 **Excellent** · 68–80,3 **Good** · 51–68 **OK** · < 51 **Poor**

**Aksesibilitas dan rasio kontras**

**WCAG 2.1** menetapkan syarat kontras antara teks dan latarnya:

- **Level AA** — **4,5:1** untuk teks biasa, **3:1** untuk teks besar
- **Level AAA** — **7:1** untuk teks biasa, **4,5:1** untuk teks besar

Rasio dihitung dari **luminansi relatif**, bukan selisih warna. Rumusnya \`(L1 + 0,05) / (L2 + 0,05)\` dengan L1 yang lebih terang.

Dan luminansi **tidak sebanding lurus dengan angka RGB** — tiap kanal dikoreksi dulu secara gamma, lalu ditimbang: hijau 0,7152 · merah 0,2126 · biru 0,0722.

Hijau dihitung **hampir sepuluh kali lebih berat daripada biru**, karena mata manusia jauh lebih peka terhadapnya. Inilah sebabnya kamu **tidak bisa menebak rasio kontras dengan mata** — teks biru di atas hitam terlihat cukup jelas tetapi rasionya rendah.

**Ukuran target sentuh**

Sering disebut "44×44 piksel sesuai WCAG AA". **Itu tidak tepat.**

- **44×44** berasal dari pedoman Apple, dan di WCAG 2.1 ia adalah kriteria **2.5.5 Target Size** tingkat **AAA**
- WCAG 2.2 menambahkan **2.5.8 Target Size (Minimum)** tingkat **AA** dengan syarat **24×24**

Memakai 44×44 adalah keputusan bagus. Menyebutnya sebagai syarat AA adalah keliru.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SUS: kenapa butir ganjil dan genap dihitung TERBALIK\n#\n# Butir ganjil bernada POSITIF:\n#   "Saya rasa sistem ini mudah digunakan"     -> nilai - 1\n# Butir genap bernada NEGATIF:\n#   "Saya rasa sistem ini terlalu rumit"       -> 5 - nilai\n#\n# Responden yang asal mencentang kolom 5 semua akan\n# mendapat: (5-1) + (5-5) + (5-1) + (5-5) + ...\n#         =   4  +   0  +   4  +   0  + ... = 20\n#         -> skor 50, persis di tengah\n#\n# Jadi mencentang asal TIDAK menghasilkan skor tinggi.\n# Nada yang diselang-seling memaksa responden MEMBACA.',
      penjelasan: `
Ini rancangan kuesioner yang cerdas, dan alasannya layak dipahami karena berlaku untuk **setiap kuesioner yang akan kamu buat**.

Masalah yang dipecahkannya bernama **acquiescence bias** — kecenderungan orang menyetujui apa pun yang ditanyakan, apalagi kalau ia lelah, terburu-buru, atau merasa tidak enak mengkritik.

Kalau **kesepuluh butir bernada positif**, responden yang malas cukup menarik garis lurus di kolom "sangat setuju" dan selesai dalam lima detik. Hasilnya: **skor 100**, tanpa satu pun informasi sungguhan.

Sekarang lihat apa yang terjadi dengan nada yang diselang-seling.

Responden yang sama mencentang 5 untuk semuanya. Butir ganjil memberi \`5 − 1 = 4\`. Butir genap memberi \`5 − 5 = 0\`. Lima butir ganjil dan lima butir genap menghasilkan \`(4 × 5) + (0 × 5) = 20\`, lalu \`20 × 2,5 = 50\`.

**Persis di tengah** — dan itu memang tepat, karena jawaban semacam itu **tidak menyampaikan apa-apa**.

Hal yang sama terjadi pada yang mencentang 1 semua: butir ganjil memberi 0, butir genap memberi 4, jumlahnya tetap 20, skornya tetap 50.

**Mencentang asal tidak bisa menghasilkan skor tinggi maupun rendah.** Untuk mendapat skor ekstrem, responden **harus membaca dan menjawab berbeda-beda** — dan itulah yang diinginkan.

Ada satu hal lagi yang sering disalahpahami: **skor SUS bukan persentase**.

Angka 68 tidak berarti 68 persen pengguna puas. Ia adalah nilai pada skala yang **rata-rata industrinya kebetulan 68**. Skor 86 berarti sistemmu berada jauh di atas rata-rata itu — bukan berarti 86 persen orang menyukainya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Evaluasi usability: menghitung SUS & kontras
# Data nyata dari projek redesign dashboard
# LPSE Kabupaten Banyumas (Tim C, IMK Unsoed)
# ============================================

# --------------------------------------------
# 1. Cara SUS dihitung dari jawaban mentah
# --------------------------------------------
def skor_sus(jawaban):
    """jawaban: 10 nilai Likert 1-5, butir 1..10 berurutan."""
    if len(jawaban) != 10:
        raise ValueError("SUS harus tepat 10 butir")
    total = 0
    for i, nilai in enumerate(jawaban):     # i = 0..9
        ganjil = (i % 2 == 0)               # butir ke-1 ada di indeks 0
        total += (nilai - 1) if ganjil else (5 - nilai)
    return total * 2.5, total


print("--- cara SUS dihitung ---")
CONTOH = [
    ("centang 5 semua", [5]*10),
    ("centang 1 semua", [1]*10),
    ("centang 3 semua", [3]*10),
    ("jawaban sungguhan", [5,1,5,2,4,1,5,1,4,2]),
]
for nama, jwb in CONTOH:
    skor, mentah = skor_sus(jwb)
    print("  " + nama.ljust(20) + "normalisasi " + str(mentah).rjust(2) +
          "   skor " + ("%.1f" % skor).rjust(5))

print("")
print("  Mencentang asal SELALU menghasilkan 50 -- persis di")
print("  tengah. Nada butir yang diselang-seling positif dan")
print("  negatif membuat jawaban asal tidak berguna, sehingga")
print("  responden terpaksa MEMBACA.")


# --------------------------------------------
# 2. Hasil sungguhan: 17 responden LPSE Banyumas
# --------------------------------------------
RESPONDEN = [
    ("Andi Setiawan", 35), ("Rina Melati", 34), ("Bima Arya", 35),
    ("Sari Indah", 36),    ("Wahyu Hidayat", 36), ("Citra Dewi", 35),
    ("Eko Prasetyo", 35),  ("Mega Pertiwi", 35), ("Hendra Gunawan", 34),
    ("Ratna Sari", 32),    ("Dika Saputra", 37), ("Tika Wulandari", 36),
    ("Surya Wijaya", 35),  ("Joko", 35),         ("Bagas Eka", 33),
    ("Wilopo", 31),        ("Elfarizki Naufal", 35),
]

def tafsir(skor):
    if skor >= 80.3: return "Excellent"
    if skor >= 68:   return "Good"
    if skor >= 51:   return "OK"
    return "Poor"

print("")
print("--- hasil SUS: 17 responden ---")
print("  " + "responden".ljust(20) + "normalisasi".rjust(12) +
      "skor".rjust(8) + "  tafsiran")
skor_semua = []
for nama, mentah in RESPONDEN:
    skor = mentah * 2.5
    skor_semua.append(skor)
    print("  " + nama.ljust(20) + str(mentah).rjust(12) +
          ("%.1f" % skor).rjust(8) + "  " + tafsir(skor))

rata = sum(skor_semua) / len(skor_semua)
print("")
print("  n             = " + str(len(skor_semua)))
print("  terendah      = %.1f  (%s)" % (min(skor_semua),
                                        tafsir(min(skor_semua))))
print("  tertinggi     = %.1f  (%s)" % (max(skor_semua),
                                        tafsir(max(skor_semua))))
print("  RATA-RATA     = %.4f" % rata)
print("  dibulatkan    = %.2f  -> %s" % (rata, tafsir(rata)))


# --------------------------------------------
# 3. Memeriksa angka yang tertulis di laporan
# --------------------------------------------
print("")
print("--- memeriksa angka laporan sendiri ---")
print("  BAB VI  laporan menulis : 86.62")
print("  hitung ulang            : %.2f   -> COCOK" % rata)
print("  BAB VII laporan menulis : 82.5")
print("  hitung ulang            : %.2f   -> TIDAK COCOK" % rata)
print("")
print("  Dua bab dalam satu laporan menyebut angka berbeda.")
print("  Yang benar adalah 86.62; angka 82.5 di kesimpulan")
print("  kemungkinan sisa dari perhitungan versi lama.")
print("")
print("  Pelajarannya: SELALU hitung ulang angka yang kamu")
print("  tulis, terutama yang muncul di lebih dari satu tempat.")


# --------------------------------------------
# 4. Rasio kontras WCAG -- dihitung, bukan ditebak
# --------------------------------------------
def luminansi(heks):
    """Luminansi relatif menurut WCAG 2.1."""
    heks = heks.lstrip("#")
    kanal = [int(heks[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lurus = []
    for c in kanal:
        if c <= 0.03928:
            lurus.append(c / 12.92)
        else:
            lurus.append(((c + 0.055) / 1.055) ** 2.4)
    # hijau ditimbang jauh lebih berat: mata lebih peka padanya
    return 0.2126*lurus[0] + 0.7152*lurus[1] + 0.0722*lurus[2]


def rasio_kontras(a, b):
    la, lb = luminansi(a), luminansi(b)
    if la < lb:
        la, lb = lb, la
    return (la + 0.05) / (lb + 0.05)


def lulus(rasio, besar=False):
    aa  = 3.0 if besar else 4.5
    aaa = 4.5 if besar else 7.0
    if rasio >= aaa: return "AAA"
    if rasio >= aa:  return "AA"
    return "GAGAL"


# Palet "Civic Clarity" dari laporan LPSE Banyumas
PASANGAN = [
    ("Teks utama / latar",     "#1F2937", "#F9FAFB"),
    ("Teks utama / kartu",     "#1F2937", "#FFFFFF"),
    ("Teks pendukung / latar", "#6B7280", "#F9FAFB"),
    ("Teks pendukung / kartu", "#6B7280", "#FFFFFF"),
    ("Teks tombol / merah",    "#FFFFFF", "#D32F2F"),
    ("Merah / latar",          "#D32F2F", "#F9FAFB"),
    ("Garis tepi / latar",     "#E5E7EB", "#F9FAFB"),
]

print("")
print("--- rasio kontras palet 'Civic Clarity' ---")
print("  " + "pasangan".ljust(24) + "warna".ljust(20) +
      "rasio".rjust(8) + "  hasil")
for nama, depan, belakang in PASANGAN:
    r = rasio_kontras(depan, belakang)
    print("  " + nama.ljust(24) + (depan + " / " + belakang).ljust(20) +
          ("%.2f:1" % r).rjust(8) + "  " + lulus(r))

print("")
print("  Syarat WCAG 2.1 untuk teks biasa:")
print("      Level AA  : 4.5:1")
print("      Level AAA : 7.0:1")


# --------------------------------------------
# 5. Memeriksa klaim aksesibilitas laporan
# --------------------------------------------
print("")
print("--- memeriksa klaim aksesibilitas laporan ---")
r_utama = rasio_kontras("#1F2937", "#F9FAFB")
r_dukung = rasio_kontras("#6B7280", "#F9FAFB")

print("  Laporan menulis: 'rasio kontras MINIMUM 7:1'")
print("")
print("  teks utama    #1F2937 / #F9FAFB = %.2f:1   jauh di atas 7" % r_utama)
print("  teks pendukung #6B7280 / #F9FAFB = %.2f:1   DI BAWAH 7" % r_dukung)
print("")
print("  Jadi kata 'minimum' itu keliru. Yang benar:")
print("  teks utama mencapai AAA, teks pendukung hanya AA.")
print("  Keduanya LULUS standar AA -- klaimnya yang berlebihan,")
print("  bukan desainnya yang salah.")
print("")
print("  Pelajarannya: periksa SETIAP pasangan warna, bukan")
print("  hanya pasangan terbaiknya.")


# --------------------------------------------
# 6. Kenapa kontras tidak bisa ditebak dengan mata
# --------------------------------------------
print("")
print("--- kenapa kontras harus DIHITUNG ---")
COBA = [
    ("Biru murni / hitam",  "#0000FF", "#000000"),
    ("Hijau murni / hitam", "#00FF00", "#000000"),
    ("Kuning / putih",      "#FFFF00", "#FFFFFF"),
    ("Kuning / hitam",      "#FFFF00", "#000000"),
]
for nama, a, b in COBA:
    print("  " + nama.ljust(22) + ("%.2f:1" % rasio_kontras(a, b)).rjust(9) +
          "   " + lulus(rasio_kontras(a, b)))

print("")
print("  Biru dan hijau sama-sama 'warna terang' bagi mata,")
print("  tapi rasionya jauh berbeda. Penyebabnya pembobotan")
print("  luminansi: hijau 0.7152, merah 0.2126, biru 0.0722.")
print("  Hijau dihitung hampir 10x lebih berat daripada biru.")


# --------------------------------------------
# 7. Ukuran target sentuh: meluruskan salah kaprah
# --------------------------------------------
print("")
print("--- ukuran target sentuh ---")
ATURAN = [
    ("Apple HIG",              "44 x 44 pt", "pedoman Apple, bukan WCAG"),
    ("WCAG 2.1 SC 2.5.5",      "44 x 44 px", "Level AAA"),
    ("WCAG 2.2 SC 2.5.8",      "24 x 24 px", "Level AA"),
]
for nama, ukuran, ket in ATURAN:
    print("  " + nama.ljust(22) + ukuran.ljust(13) + ket)

print("")
print("  Sering ditulis '44x44 sesuai WCAG AA'. Itu KELIRU:")
print("  di WCAG 2.1 ukuran 44x44 adalah kriteria AAA, dan")
print("  syarat AA baru muncul di WCAG 2.2 dengan 24x24.")
print("  Memakai 44x44 itu keputusan bagus -- menyebutnya")
print("  syarat AA yang tidak tepat.")`
  },

  output: `--- cara SUS dihitung ---
  centang 5 semua     normalisasi 20   skor  50.0
  centang 1 semua     normalisasi 20   skor  50.0
  centang 3 semua     normalisasi 20   skor  50.0
  jawaban sungguhan   normalisasi 36   skor  90.0

  Mencentang asal SELALU menghasilkan 50 -- persis di
  tengah. Nada butir yang diselang-seling positif dan
  negatif membuat jawaban asal tidak berguna, sehingga
  responden terpaksa MEMBACA.

--- hasil SUS: 17 responden ---
  responden            normalisasi    skor  tafsiran
  Andi Setiawan                 35    87.5  Excellent
  Rina Melati                   34    85.0  Excellent
  Bima Arya                     35    87.5  Excellent
  Sari Indah                    36    90.0  Excellent
  Wahyu Hidayat                 36    90.0  Excellent
  Citra Dewi                    35    87.5  Excellent
  Eko Prasetyo                  35    87.5  Excellent
  Mega Pertiwi                  35    87.5  Excellent
  Hendra Gunawan                34    85.0  Excellent
  Ratna Sari                    32    80.0  Good
  Dika Saputra                  37    92.5  Excellent
  Tika Wulandari                36    90.0  Excellent
  Surya Wijaya                  35    87.5  Excellent
  Joko                          35    87.5  Excellent
  Bagas Eka                     33    82.5  Excellent
  Wilopo                        31    77.5  Good
  Elfarizki Naufal              35    87.5  Excellent

  n             = 17
  terendah      = 77.5  (Good)
  tertinggi     = 92.5  (Excellent)
  RATA-RATA     = 86.6176
  dibulatkan    = 86.62  -> Excellent

--- memeriksa angka laporan sendiri ---
  BAB VI  laporan menulis : 86.62
  hitung ulang            : 86.62   -> COCOK
  BAB VII laporan menulis : 82.5
  hitung ulang            : 86.62   -> TIDAK COCOK

  Dua bab dalam satu laporan menyebut angka berbeda.
  Yang benar adalah 86.62; angka 82.5 di kesimpulan
  kemungkinan sisa dari perhitungan versi lama.

  Pelajarannya: SELALU hitung ulang angka yang kamu
  tulis, terutama yang muncul di lebih dari satu tempat.

--- rasio kontras palet 'Civic Clarity' ---
  pasangan                warna                  rasio  hasil
  Teks utama / latar      #1F2937 / #F9FAFB    14.05:1  AAA
  Teks utama / kartu      #1F2937 / #FFFFFF    14.68:1  AAA
  Teks pendukung / latar  #6B7280 / #F9FAFB     4.63:1  AA
  Teks pendukung / kartu  #6B7280 / #FFFFFF     4.83:1  AA
  Teks tombol / merah     #FFFFFF / #D32F2F     4.98:1  AA
  Merah / latar           #D32F2F / #F9FAFB     4.76:1  AA
  Garis tepi / latar      #E5E7EB / #F9FAFB     1.18:1  GAGAL

  Syarat WCAG 2.1 untuk teks biasa:
      Level AA  : 4.5:1
      Level AAA : 7.0:1

--- memeriksa klaim aksesibilitas laporan ---
  Laporan menulis: 'rasio kontras MINIMUM 7:1'

  teks utama    #1F2937 / #F9FAFB = 14.05:1   jauh di atas 7
  teks pendukung #6B7280 / #F9FAFB = 4.63:1   DI BAWAH 7

  Jadi kata 'minimum' itu keliru. Yang benar:
  teks utama mencapai AAA, teks pendukung hanya AA.
  Keduanya LULUS standar AA -- klaimnya yang berlebihan,
  bukan desainnya yang salah.

  Pelajarannya: periksa SETIAP pasangan warna, bukan
  hanya pasangan terbaiknya.

--- kenapa kontras harus DIHITUNG ---
  Biru murni / hitam       2.44:1   GAGAL
  Hijau murni / hitam     15.30:1   AAA
  Kuning / putih           1.07:1   GAGAL
  Kuning / hitam          19.56:1   AAA

  Biru dan hijau sama-sama 'warna terang' bagi mata,
  tapi rasionya jauh berbeda. Penyebabnya pembobotan
  luminansi: hijau 0.7152, merah 0.2126, biru 0.0722.
  Hijau dihitung hampir 10x lebih berat daripada biru.

--- ukuran target sentuh ---
  Apple HIG             44 x 44 pt   pedoman Apple, bukan WCAG
  WCAG 2.1 SC 2.5.5     44 x 44 px   Level AAA
  WCAG 2.2 SC 2.5.8     24 x 24 px   Level AA

  Sering ditulis '44x44 sesuai WCAG AA'. Itu KELIRU:
  di WCAG 2.1 ukuran 44x44 adalah kriteria AAA, dan
  syarat AA baru muncul di WCAG 2.2 dengan 24x24.
  Memakai 44x44 itu keputusan bagus -- menyebutnya
  syarat AA yang tidak tepat.`,

  kesalahanUmum: [
    {
      salah: 'Menafsirkan skor SUS sebagai persentase kepuasan.',
      kenapa: 'Skor 68 bukan berarti enam puluh delapan persen pengguna puas. Ia adalah nilai pada skala yang rata-rata industrinya kebetulan 68, sehingga skor di bawah itu berarti di bawah rata-rata, bukan berarti mayoritas tidak puas.',
      benar: 'Bandingkan skor dengan rentang penafsirannya: di atas 80,3 Excellent, 68 sampai 80,3 Good, 51 sampai 68 OK, di bawah 51 Poor.'
    },
    {
      salah: 'Membuat semua butir kuesioner bernada positif.',
      kenapa: 'Responden yang lelah atau tidak enak mengkritik akan menarik garis lurus di kolom setuju, dan hasilnya sempurna tanpa satu pun informasi sungguhan. SUS menghindarinya dengan menyelang-nyeling nada positif dan negatif, sehingga jawaban asal selalu berakhir di angka lima puluh.',
      benar: 'Selang-seling nada butir, dan periksa apakah ada responden yang jawabannya seragam untuk semua butir.'
    },
    {
      salah: 'Mengklaim seluruh palet memenuhi rasio kontras tertentu berdasarkan satu pasangan terbaiknya.',
      kenapa: 'Teks utama yang gelap di atas latar terang bisa mencapai empat belas banding satu, tetapi teks pendukung berwarna abu-abu di latar yang sama hanya mencapai sekitar empat setengah banding satu. Klaim minimum tujuh banding satu jadi tidak benar meski desainnya sendiri lulus AA.',
      benar: 'Hitung setiap pasangan yang benar-benar dipakai, lalu sebutkan yang paling rendah sebagai angka minimum.'
    },
    {
      salah: 'Menebak rasio kontras dengan melihat warnanya.',
      kenapa: 'Luminansi tidak sebanding lurus dengan angka RGB dan tiap kanal ditimbang berbeda, dengan hijau hampir sepuluh kali lebih berat daripada biru. Biru murni di atas hitam terlihat cukup terang tetapi rasionya hanya sekitar dua setengah banding satu dan gagal.',
      benar: 'Hitung dengan rumus WCAG atau pakai alat pemeriksa kontras. Mata bukan alat ukur untuk hal ini.'
    },
    {
      salah: 'Menyebut ukuran target sentuh 44 kali 44 sebagai syarat WCAG level AA.',
      kenapa: 'Angka itu berasal dari pedoman Apple, dan di WCAG 2.1 kriteria 2.5.5 dengan ukuran tersebut berada di level AAA. Syarat setingkat AA baru muncul di WCAG 2.2 lewat kriteria 2.5.8 dengan ukuran 24 kali 24.',
      benar: 'Tetap pakai 44 kali 44 karena memang lebih baik, tetapi sebutkan sumbernya dengan tepat.'
    },
    {
      salah: 'Menunjukkan purwarupa hi-fi lebih dulu untuk meminta masukan struktur.',
      kenapa: 'Warna dan tipografi yang sudah jadi menarik seluruh perhatian, sehingga komentar yang masuk berkisar pada selera visual dan masalah alur terlewat. Padahal masalah struktur jauh lebih mahal diperbaiki belakangan.',
      benar: 'Mulai dari lo-fi yang sengaja polos dan abu-abu, supaya perhatian terpaksa jatuh pada struktur dan alur.'
    }
  ],

  analogi: `Bayangkan kamu menilai sebuah **restoran baru**.

**Lo-fi prototype** adalah **denah meja di atas kertas**. Tidak ada warna, tidak ada foto makanan, tidak ada musik.

Kelihatannya membosankan — dan **itu tepat sasaran**. Karena tanpa gangguan visual, kamu akhirnya memperhatikan hal yang sesungguhnya penting: **jalan ke toilet melewati dapur**.

Kalau kamu ditunjukkan **foto interior yang indah** lebih dulu, kamu akan berkomentar soal pilihan lampunya — dan **tidak menyadari denahnya** sampai kamu benar-benar berjalan ke toilet, saat temboknya sudah berdiri.

**SUS** adalah kuesioner kepuasan yang diberikan setelah makan. Dan pertanyaannya **sengaja diselang-seling**:

- *"Makanannya enak?"*
- *"Pelayanannya lambat?"*
- *"Tempatnya nyaman?"*
- *"Harganya terlalu mahal?"*

Kalau semuanya bernada positif, tamu yang **tidak enak hati** — dan di Indonesia itu banyak — akan mencentang "sangat setuju" di semuanya untuk cepat selesai, dan restorannya mendapat nilai sempurna yang tidak berarti apa-apa.

Dengan nada diselang-seling, tamu yang mencentang kolom yang sama untuk semuanya **otomatis mendapat nilai tengah** — karena ia baru saja bilang makanannya enak **dan** pelayanannya lambat.

Untuk memberi nilai tinggi, ia **terpaksa membaca**.

Terakhir, **rasio kontras**, dan kenapa ia tidak boleh ditebak.

Bayangkan menilai apakah papan menu **terbaca dari meja paling belakang**. Kamu berdiri di depan papan itu, membacanya dengan mudah, dan berkata **"jelas kok"**.

Tetapi kamu **hafal menunya**. Kamu tahu tulisannya apa. Matamu **muda**. Dan kamu berdiri satu meter dari papan.

Rasio kontras adalah cara **berhenti mengandalkan penilaianmu sendiri** dan memakai angka. Dan angka itu sering mengejutkan: **teks biru di atas hitam** terasa cukup jelas bagi matamu, tetapi rasionya hanya sekitar **2,4:1** — gagal telak.

Sementara **hijau di atas hitam yang terasa serupa** mencapai lebih dari **15:1**.

Matamu tidak berbohong. Ia hanya **bukan alat ukur**.`,

  latihan: [
    'Jelaskan alur User-Centered Design dan sebutkan apa yang membedakannya dari merancang lalu meminta pendapat orang.',
    'Jelaskan perbedaan kebutuhan fungsional dan non-fungsional, lalu tulis dua contoh masing-masing untuk sebuah situs perpustakaan kampus.',
    'Hitung skor SUS dari jawaban berikut untuk butir 1 sampai 10: 4, 2, 5, 1, 4, 2, 5, 2, 4, 1. Tunjukkan langkahnya.',
    'Jelaskan kenapa butir ganjil dan genap SUS dihitung terbalik, dan tunjukkan berapa skor yang didapat responden yang mencentang angka 4 untuk semua butir.',
    'Jelaskan kenapa skor SUS bukan persentase, dan sebutkan empat rentang penafsirannya.',
    'Hitung rasio kontras antara teks #767676 dan latar #FFFFFF, lalu tentukan apakah ia lulus WCAG AA untuk teks biasa.',
    'Jelaskan kenapa hijau ditimbang jauh lebih berat daripada biru dalam perhitungan luminansi, dan apa akibatnya bagi pemilihan warna teks.',
    'Jelaskan kenapa purwarupa lo-fi sengaja dibuat polos, dan apa yang hilang kalau langsung menunjukkan hi-fi.'
  ]
});
