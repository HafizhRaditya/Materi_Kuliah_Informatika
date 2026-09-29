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

   Tiga topik tambahan (hukum Fitts & Hick, KLM-GOMS, evaluasi
   heuristik Nielsen) disusun dari REFERENSI LUAR -- keterangan
   lengkapnya ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari worksheet dan projek kuliah
   sendiri. Tiga topik berikutnya mengisi pokok bahasan evaluasi
   yang ada di RPS IMK kampus lain tetapi tidak ada bahannya di
   drive: evaluasi analitik (hukum Fitts, hukum Hick-Hyman,
   KLM-GOMS) dan evaluasi heuristik Nielsen.

   Konstanta Fitts dan Hick di topik pertama adalah konstanta
   CONTOH, dan disebut begitu di teksnya. Nilai operator KLM
   memakai nilai dari Card, Moran & Newell. Data pengukuran
   Fitts, 40 masalah usability, dan temuan aplikasi presensi
   adalah data TIRUAN. Semua program benar-benar dijalankan.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'imk-fitts-hick',
  judul: 'Hukum Fitts & Hukum Hick',
  kategori: 'imk',
  tag: ['hukum Fitts', 'hukum Hick', 'indeks kesulitan', 'ukuran target', 'tepi layar', 'menu', 'regresi'],
  ringkas: 'Dua rumus logaritma yang meramal berapa lama orang menunjuk tombol dan memilih dari menu — dan kenapa menu di tepi layar begitu cepat dijangkau.',

  fungsi: `**Meramal waktu yang dibutuhkan untuk menunjuk sebuah target dan untuk memilih di antara beberapa pilihan, sebelum antarmukanya dibuat dan diuji.**

Terpakai di:

- **Menentukan ukuran dan letak tombol** — tombol yang sering dipakai harus besar dan dekat; tombol berbahaya boleh kecil dan jauh
- **Merancang menu** — menu datar lawan menu bertingkat, menu biasa lawan menu melingkar
- **Menjelaskan kebiasaan desain** — kenapa menu di tepi layar, kenapa menu klik-kanan muncul di dekat kursor, kenapa target sentuh minimal berukuran tertentu
- **Membandingkan perangkat masukan** — tetikus, touchpad, layar sentuh, dan stik permainan punya konstanta Fitts yang berbeda

Yang paling penting dipahami: **yang dihitung adalah logaritma.** Tombol delapan kali lebih jauh tidak butuh waktu delapan kali lebih lama. Dan dalam hukum Fitts, menggandakan ukuran tombol sama nilainya dengan memotong jaraknya separuh.

Dan satu batas yang sering dilupakan: **hukum Hick hanya berlaku untuk pilihan yang sudah dikenal.** Untuk pengguna baru yang harus membaca setiap pilihan, waktunya tumbuh lurus, bukan logaritmik.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung indeks kesulitan dan waktu menunjuk sebuah target, membandingkan rancangan tombol dan menu, dan memperoleh konstanta Fitts sendiri dari pengukuran dengan regresi linear.',
    alat: ['Python 3 dengan modul math dan statistics', 'Peramban untuk percobaan menunjuk sederhana (opsional)'],
    langkah: [
      { judul: 'Ukur jarak dan lebar target',
        isi: `D adalah jarak dari posisi kursor ke tengah target. W adalah lebar target **searah gerakan** — untuk gerakan mendatar, lebar tombol; untuk gerakan tegak, tingginya.` },
      { judul: 'Hitung indeks kesulitan',
        isi: `ID = log₂(D/W + 1), dalam bit. Ini rumusan Shannon yang dipakai standar ISO 9241-9. ID 1 berarti sangat mudah; ID di atas 6 sudah sulit.` },
      { judul: 'Hitung waktu menunjuk',
        isi: `MT = a + b × ID. Konstanta a dan b bergantung pada perangkat dan orangnya. Untuk perbandingan antar-rancangan, konstanta contoh cukup; untuk ramalan angka mutlak, ukur sendiri.` },
      { judul: 'Bandingkan rancangan',
        isi: `Hitung ID untuk setiap tombol penting di rancanganmu. Tombol yang sering dipakai dengan ID tinggi adalah kandidat untuk diperbesar atau dipindah lebih dekat.` },
      { judul: 'Hitung waktu memilih dengan Hick',
        isi: `RT = a + b × log₂(n + 1) untuk n pilihan yang sudah dikenal pengguna. Pakai untuk membandingkan menu datar dan menu bertingkat.` },
      { judul: 'Ukur konstantamu sendiri',
        isi: `Buat halaman percobaan dengan target berbagai jarak dan lebar, catat waktu setiap klik, lalu regresikan waktu pada ID. Titik potong adalah a, kemiringan adalah b.

1/b adalah "laju informasi" — berapa bit per detik yang bisa dikirim tangan lewat perangkat itu.` }
    ],
    cek: [
      'Kamu bisa menghitung ID dan MT untuk sebuah tombol dari jarak dan lebarnya',
      'Kamu bisa menjelaskan kenapa menu di tepi layar cepat dijangkau',
      'Kamu bisa menjelaskan kapan hukum Hick tidak berlaku',
      'Kamu bisa memperoleh a dan b dari data pengukuran dengan regresi'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa logaritma',

  konsep: `Topik manusia sebagai pemroses informasi membahas batas-batas manusia secara kualitatif: memori kerja, persepsi, kesalahan. Topik ini membahas dua batas yang bisa dihitung dengan rumus — dan dipakai untuk meramal, bukan cuma menjelaskan.

**Hukum Fitts: menunjuk target**

Paul Fitts (1954) menemukan bahwa waktu untuk menunjuk target bergantung pada **perbandingan** jarak dan ukurannya, lewat logaritma:

MT = a + b · log₂(D/W + 1)

Bagian log₂(D/W + 1) disebut **indeks kesulitan** (ID), dalam bit. Dengan konstanta contoh untuk tetikus — a = 0,20 s dan b = 0,15 s/bit:

| Target | D (px) | W (px) | ID (bit) | MT (s) |
|---|---|---|---|---|
| tombol besar, dekat | 100 | 80 | 1,17 | 0,38 |
| tombol besar, jauh | 800 | 80 | 3,46 | 0,72 |
| tombol kecil, dekat | 100 | 16 | 2,86 | 0,63 |
| tombol kecil, jauh | 800 | 16 | 5,67 | 1,05 |
| ikon 8 px di pojok jauh | 1200 | 8 | 7,24 | 1,29 |

Jarak delapan kali lebih jauh tidak berarti delapan kali lebih lama: 0,38 s menjadi 0,72 s. Dan karena yang dihitung adalah D/W, **menggandakan lebar tombol sama nilainya dengan memotong jaraknya separuh**.

**Kenapa logaritma**

Gerakan menunjuk bukan satu gerakan mulus, melainkan satu gerakan cepat yang kasar diikuti beberapa koreksi kecil. Setiap koreksi mengurangi sisa jarak dengan **perbandingan** yang kira-kira tetap. Banyaknya koreksi yang dibutuhkan untuk mengecilkan jarak D menjadi lebar W tumbuh seperti log(D/W) — persis seperti banyaknya langkah metode bagi dua di Matematika Dasar tumbuh seperti logaritma lebar awal dibagi toleransi.

**Tepi layar: lebar yang tak hingga**

| Target | ID | MT |
|---|---|---|
| menu 20 px di dalam jendela | 4,95 bit | 0,94 s |
| menu di tepi atas layar | 0,38 bit | 0,26 s |

Kursor berhenti di tepi layar. Pengguna bisa "melempar" tetikus ke atas tanpa mengerem, dan kursor pasti berhenti di menu. Kedalaman target searah gerakan praktis tak terbatas — program memakai 2000 px sebagai wakilnya — sehingga ID-nya hampir nol.

Itu alasan menu di tepi atas layar di macOS, tombol Start di pojok kiri bawah pada Windows versi-versi lama, dan menu klik-kanan yang muncul **di bawah kursor** (D hampir nol) sama-sama cepat. Ketika Windows 11 memindahkan tombol Start ke tengah bilah tugas secara bawaan, keuntungan pojok itu ikut hilang.

**Hukum Hick-Hyman: memilih di antara pilihan**

Waktu untuk memilih satu di antara n pilihan yang **sudah dikenal**:

RT = a + b · log₂(n + 1)

| Pilihan | RT (s) |
|---|---|
| 2 | 0,44 |
| 8 | 0,68 |
| 32 | 0,96 |
| 64 | 1,10 |

Pilihan 32 kali lipat, dari 2 ke 64, cuma memperpanjang waktu 2,5 kali.

**Menu datar lawan bertingkat**

| Rancangan | Waktu memilih |
|---|---|
| 64 perintah dalam satu menu | 1,10 s |
| 8 kategori × 8 perintah | 1,35 s |

Menurut Hick, menu datar sedikit lebih cepat — setiap tingkat menambah konstanta a lagi. Tetapi syaratnya: pengguna sudah **hafal** letak perintahnya.

Pengguna yang baru pertama kali membuka menu tidak memilih; ia **mencari** — membaca satu per satu. Waktu mencari tumbuh lurus dengan n, bukan logaritmik. Untuk mereka, kategori yang bermakna jauh membantu. Itu sebabnya hukum Hick tidak bisa dipakai untuk membenarkan menu 64 perintah tanpa pengelompokan.

**Dari mana a dan b**

Konstanta di atas adalah contoh. Konstanta sebenarnya diukur: buat target dengan berbagai jarak dan lebar, catat waktu setiap percobaan, lalu regresikan waktu pada ID — regresi linear yang sama dengan topik korelasi dan regresi di Probabilitas dan Statistika.

Program membangkitkan 120 percobaan tiruan dari a = 0,25 dan b = 0,18 dengan derau, lalu mencoba menemukan kembali keduanya: regresinya memberi **a = 0,212 s, b = 0,188 s/bit**, r = 0,965. Dekat dengan nilai sebenarnya, tetapi tidak persis — derau pengukuran selalu ada, dan titik potong a biasanya lebih meleset dari kemiringan b karena ID tidak pernah benar-benar nol dalam percobaan.

1/b ≈ 5,3 bit/s disebut **throughput**: laju informasi yang bisa dikirim tangan lewat perangkat itu. Angka ini yang dipakai untuk membandingkan tetikus, touchpad, dan layar sentuh secara adil.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\n\ndef ID(D, W):\n    # indeks kesulitan (bit), rumusan Shannon\n    return math.log2(D / W + 1)\n\nA, B = 0.20, 0.15          # konstanta CONTOH untuk tetikus\n\ndef waktu_fitts(D, W):\n    return A + B * ID(D, W)\n\nwaktu_fitts(100, 80)    # 0.38 s\nwaktu_fitts(800, 80)    # 0.72 s   jarak 8x, waktu < 2x\nwaktu_fitts(800, 160)   # sama dengan (400, 80): D/W yang sama",
      penjelasan: `Dua baris rumus, dan tiga keputusan di dalamnya yang membedakan rumus ini dari versi-versi yang lebih tua.

**Kenapa D/W + 1, bukan 2D/W.**

Rumusan asli Fitts memakai log₂(2D/W). Masalahnya: untuk target yang sangat besar atau sangat dekat — D lebih kecil dari W/2 — nilainya menjadi negatif, dan waktu yang diramal lebih kecil dari a. Tidak masuk akal.

Rumusan Shannon, log₂(D/W + 1), yang diusulkan MacKenzie dan kini dipakai standar ISO 9241-9, tidak pernah negatif: untuk D = 0, ID = 0, dan MT = a. Selain itu, ia sedikit lebih cocok dengan data percobaan.

**Kenapa satuannya bit.**

log₂ menghitung "berapa kali harus membelah dua". Menunjuk target berlebar W di jarak D sama dengan memilih satu dari sekitar D/W + 1 posisi yang bisa dibedakan — dan memilih satu dari N butuh log₂ N bit informasi.

Karena itu hukum Fitts dan hukum Hick berbentuk sama: keduanya mengukur informasi yang harus diproses, dan waktu tumbuh lurus dengan informasi itu.

**Kenapa hanya perbandingan D/W yang penting.**

Rumusnya tidak memuat D atau W sendiri-sendiri, hanya perbandingannya. Tombol 80 px di jarak 800 px sama sulitnya dengan tombol 160 px di jarak 1600 px — atau tombol 8 px di jarak 80 px.

Akibat praktisnya: memperbesar tombol dan mendekatkannya adalah dua cara yang setara. Kalau tata letak tidak memungkinkan tombol didekatkan, perbesar.

**Batas rumus ini.**

Hukum Fitts memodelkan menunjuk dengan satu gerakan ke target yang diam, dengan perangkat yang dikendalikan tangan. Ia tidak memodelkan:

- target yang bergerak, atau menu yang muncul dengan animasi
- waktu **menemukan** target yang belum diketahui letaknya — itu pencarian visual, bukan menunjuk
- gerakan dua dimensi di mana lebar dan tinggi target sama-sama penting; untuk itu ada perluasan yang memakai dimensi terkecil atau lebar efektif searah gerakan

Di dalam batas itu, hukum Fitts termasuk model paling kokoh di seluruh IMK: puluhan tahun percobaan dengan berbagai perangkat mengonfirmasi bentuk logaritmanya.`
    },
    {
      bahasa: 'python',
      kode: "import statistics as st\n\nukur = []\nfor D in [128, 256, 512, 1024]:\n    for W in [16, 32, 64]:\n        for _ in range(10):\n            t = 0.25 + 0.18 * ID(D, W) + random.gauss(0, 0.06)\n            ukur.append((ID(D, W), t))\n\nfit = st.linear_regression([u[0] for u in ukur], [u[1] for u in ukur])\n# a = 0.212 s, b = 0.188 s/bit   (asli: 0.25 dan 0.18)\n# 1/b = 5.3 bit/s",
      penjelasan: `Cara konstanta Fitts diperoleh di penelitian sungguhan — diperagakan dengan data tiruan supaya jawabannya bisa diperiksa.

**Rancangan percobaannya.**

Empat jarak dikali tiga lebar memberi 12 kombinasi, dengan ID dari sekitar 1,6 sampai 6 bit. Setiap kombinasi diulang 10 kali. Rentang ID yang lebar itu penting: regresi dengan ID yang hampir sama semua tidak bisa memisahkan a dari b.

Di percobaan sungguhan, halaman web menampilkan satu target pada satu waktu dan mencatat waktu dari klik sebelumnya sampai klik di target. Urutan kombinasinya diacak, supaya kelelahan atau latihan tidak menumpuk di kombinasi tertentu.

**Kenapa regresi linear.**

MT = a + b · ID adalah persamaan garis lurus dengan ID sebagai x. Mencari a dan b dari titik-titik pengukuran adalah persis masalah kuadrat terkecil yang dibahas di Probabilitas dan Statistika dan di Aljabar Linear.

**Kenapa hasilnya tidak persis 0,25 dan 0,18.**

Setiap pengukuran diberi derau acak dengan simpangan baku 0,06 s — kira-kira seberapa bervariasi waktu klik manusia sungguhan. Dengan 120 titik, perkiraannya dekat tetapi tidak tepat: b meleset 0,008, a meleset 0,038.

a meleset lebih jauh, dan itu wajar: a adalah titik potong di ID = 0, sedangkan data terdekat ada di ID sekitar 1,6. Titik potong adalah **ekstrapolasi** ke luar rentang data — masalah yang dibahas di topik regresi. Karena itu peneliti Fitts lebih memercayai b daripada a.

**Throughput: angka pembanding.**

1/b ≈ 5,3 bit/s adalah berapa banyak informasi yang bisa "dikirim" lewat perangkat ini per detik. Membandingkan b antar-perangkat — tetikus lawan touchpad lawan layar sentuh — adalah cara yang adil untuk menyatakan perangkat mana yang lebih cepat untuk menunjuk, terlepas dari ukuran tombol di aplikasinya.

Standar ISO 9241-9 menetapkan cara menghitung throughput yang sedikit lebih canggih — memakai lebar efektif dari sebaran titik klik yang sebenarnya — tetapi gagasannya sama.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Hukum Fitts dan Hukum Hick-Hyman
# ============================================
import math
import random
import statistics as st

def ID(D, W):
    """Indeks kesulitan (bit), rumusan Shannon: log2(D/W + 1)."""
    return math.log2(D / W + 1)

# Konstanta CONTOH untuk tetikus. Nilai sebenarnya harus diukur
# per perangkat dan per orang -- lihat bagian 3.
A, B = 0.20, 0.15          # detik, detik per bit

def waktu_fitts(D, W):
    return A + B * ID(D, W)

# --------------------------------------------
# 1. Ukuran dan jarak target
# --------------------------------------------
print("--- waktu menunjuk: MT = a + b log2(D/W + 1) ---")
print("  (a = 0.20 s, b = 0.15 s/bit -- konstanta contoh)")
print()
print("  target                      D (px)  W (px)   ID (bit)   MT (s)")
TARGET = [
    ("tombol besar, dekat", 100, 80),
    ("tombol besar, jauh", 800, 80),
    ("tombol kecil, dekat", 100, 16),
    ("tombol kecil, jauh", 800, 16),
    ("ikon 8 px di pojok jauh", 1200, 8),
]
for nama, D, W in TARGET:
    print("  " + format(nama, "<26") + format(D, ">8") + format(W, ">8")
          + format(ID(D, W), ">11.2f") + format(waktu_fitts(D, W), ">9.2f"))
print()
print("  Jarak 8 kali lebih jauh tidak berarti 8 kali lebih lama:")
print("  " + format(waktu_fitts(100, 80), ".2f") + " s menjadi " + format(waktu_fitts(800, 80), ".2f")
      + " s. Yang dihitung adalah LOGARITMA D/W.")
print("  Menggandakan W sama nilainya dengan memotong D separuh.")

print("\n--- tepi layar: target yang lebarnya 'tak hingga' ---")
# di tepi layar, kedalaman target searah gerakan praktis tak
# terbatas; 2000 px dipakai sebagai wakilnya
for nama, W in [("menu 20 px di dalam jendela", 20), ("menu di tepi atas layar", 2000)]:
    print("  " + format(nama, "<30") + "ID " + format(ID(600, W), ".2f")
          + " bit, MT " + format(waktu_fitts(600, W), ".2f") + " s")
print("  Kursor berhenti di tepi layar, jadi pengguna bisa 'melempar'")
print("  tetikus ke atas tanpa mengerem. Lebar efektifnya sangat")
print("  besar -- itu sebabnya menu di tepi layar cepat dijangkau.")

# --------------------------------------------
# 2. Hick-Hyman: banyaknya pilihan
# --------------------------------------------
print("\n--- waktu memilih: RT = a + b log2(n + 1) ---")
ah, bh = 0.20, 0.15
def waktu_hick(n):
    return ah + bh * math.log2(n + 1)
print("  pilihan   RT (s)")
for n in [2, 4, 8, 16, 32, 64]:
    print("  " + format(n, "<9") + format(waktu_hick(n), ".2f"))
print("  Pilihan 32 kali lipat (2 -> 64) cuma memperpanjang waktu")
print("  " + format(waktu_hick(64) / waktu_hick(2), ".1f") + " kali.")
satu = waktu_hick(64)
dua = 2 * waktu_hick(8)
print("\n  64 perintah dalam satu menu datar : " + format(satu, ".2f") + " s")
print("  8 kategori x 8 perintah (2 menu)  : " + format(dua, ".2f") + " s")
print("  Menurut Hick, menu datar sedikit LEBIH CEPAT -- asalkan")
print("  pengguna sudah hafal letaknya. Hick hanya berlaku untuk")
print("  pilihan yang sudah dikenal; untuk yang baru, pengguna membaca")
print("  satu per satu, dan waktunya tumbuh lurus dengan n.")

# --------------------------------------------
# 3. Dari mana a dan b: mengukur, lalu regresi
# --------------------------------------------
print("\n--- menemukan a dan b dari pengukuran (data TIRUAN) ---")
random.seed(3)
a_asli, b_asli = 0.25, 0.18         # 'perangkat' yang ingin diukur
ukur = []
for D in [128, 256, 512, 1024]:
    for W in [16, 32, 64]:
        for _ in range(10):          # 10 percobaan per kondisi
            t = a_asli + b_asli * ID(D, W) + random.gauss(0, 0.06)
            ukur.append((ID(D, W), t))
xs, ys = [u[0] for u in ukur], [u[1] for u in ukur]
fit = st.linear_regression(xs, ys)
r = st.correlation(xs, ys)
print("  " + str(len(ukur)) + " percobaan, 12 kombinasi jarak-lebar")
print("  regresi MT pada ID: a = " + format(fit.intercept, ".3f") + " s, b = "
      + format(fit.slope, ".3f") + " s/bit, r = " + format(r, ".3f"))
print("  (nilai yang dipakai membangkitkan data: a = 0.25, b = 0.18)")
print("  1/b = " + format(1 / fit.slope, ".1f") + " bit/s -- 'laju informasi' tangan+tetikus")` },
  output: `--- waktu menunjuk: MT = a + b log2(D/W + 1) ---
  (a = 0.20 s, b = 0.15 s/bit -- konstanta contoh)

  target                      D (px)  W (px)   ID (bit)   MT (s)
  tombol besar, dekat            100      80       1.17     0.38
  tombol besar, jauh             800      80       3.46     0.72
  tombol kecil, dekat            100      16       2.86     0.63
  tombol kecil, jauh             800      16       5.67     1.05
  ikon 8 px di pojok jauh       1200       8       7.24     1.29

  Jarak 8 kali lebih jauh tidak berarti 8 kali lebih lama:
  0.38 s menjadi 0.72 s. Yang dihitung adalah LOGARITMA D/W.
  Menggandakan W sama nilainya dengan memotong D separuh.

--- tepi layar: target yang lebarnya 'tak hingga' ---
  menu 20 px di dalam jendela   ID 4.95 bit, MT 0.94 s
  menu di tepi atas layar       ID 0.38 bit, MT 0.26 s
  Kursor berhenti di tepi layar, jadi pengguna bisa 'melempar'
  tetikus ke atas tanpa mengerem. Lebar efektifnya sangat
  besar -- itu sebabnya menu di tepi layar cepat dijangkau.

--- waktu memilih: RT = a + b log2(n + 1) ---
  pilihan   RT (s)
  2        0.44
  4        0.55
  8        0.68
  16       0.81
  32       0.96
  64       1.10
  Pilihan 32 kali lipat (2 -> 64) cuma memperpanjang waktu
  2.5 kali.

  64 perintah dalam satu menu datar : 1.10 s
  8 kategori x 8 perintah (2 menu)  : 1.35 s
  Menurut Hick, menu datar sedikit LEBIH CEPAT -- asalkan
  pengguna sudah hafal letaknya. Hick hanya berlaku untuk
  pilihan yang sudah dikenal; untuk yang baru, pengguna membaca
  satu per satu, dan waktunya tumbuh lurus dengan n.

--- menemukan a dan b dari pengukuran (data TIRUAN) ---
  120 percobaan, 12 kombinasi jarak-lebar
  regresi MT pada ID: a = 0.212 s, b = 0.188 s/bit, r = 0.965
  (nilai yang dipakai membangkitkan data: a = 0.25, b = 0.18)
  1/b = 5.3 bit/s -- 'laju informasi' tangan+tetikus`,

  kompleksitas: {
    tabel: [
      { operasi: 'Waktu menunjuk satu target', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Waktu memilih dari n pilihan dikenal', waktu: 'tumbuh log₂(n + 1)', memori: '—' },
      { operasi: 'Waktu mencari di n pilihan baru', waktu: 'tumbuh lurus dengan n', memori: '—' },
      { operasi: 'Regresi konstanta dari k pengukuran', waktu: 'O(k)', memori: 'O(k)' }
    ],
    intuisi: `Tabel ini bukan tentang biaya komputasi, melainkan tentang biaya **manusia** — dan di situ perbedaan antara logaritma dan lurus sangat terasa.

Menggandakan banyaknya pilihan dalam menu yang sudah dihafal menambah waktu memilih kurang dari 0,15 detik. Menggandakan banyaknya pilihan untuk pengguna baru bisa menggandakan waktu mencarinya. Keduanya menu yang sama; yang berbeda cuma apakah penggunanya sudah hafal.

Karena itu desain yang baik melayani keduanya: letak yang tetap supaya pengguna lama bisa memilih tanpa mencari, dan pengelompokan yang bermakna supaya pengguna baru bisa mencari dengan cepat.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengira waktu menunjuk sebanding dengan jarak.',
      kenapa: 'Yang dihitung adalah logaritma perbandingan jarak dan lebar. Target delapan kali lebih jauh dengan lebar sama cuma butuh kurang dari dua kali lebih lama.',
      benar: 'Hitung ID = log₂(D/W + 1) dan bandingkan rancangan dengan ID, bukan dengan jarak saja.'
    },
    {
      salah: 'Membuat tombol yang sering dipakai kecil karena "masih bisa diklik".',
      kenapa: 'Tombol kecil menaikkan ID dan waktu setiap klik, dan kerugian kecil itu dikalikan ribuan kali pemakaian. Di layar sentuh, tombol kecil juga menaikkan salah sentuh.',
      benar: 'Perbesar tombol yang sering dipakai, dan pakai ukuran target sentuh minimal yang disarankan panduan platform.'
    },
    {
      salah: 'Menaruh menu penting sedikit di dalam dari tepi layar.',
      kenapa: 'Beberapa piksel dari tepi menghilangkan keuntungan tepi: kursor tidak lagi berhenti di target, sehingga pengguna harus mengerem dan mengoreksi.',
      benar: 'Tempelkan target yang ingin cepat dijangkau langsung ke tepi atau pojok layar.'
    },
    {
      salah: 'Memakai hukum Hick untuk membenarkan menu panjang tanpa pengelompokan.',
      kenapa: 'Hukum Hick hanya berlaku untuk pilihan yang sudah dihafal. Pengguna baru membaca satu per satu, dan waktunya tumbuh lurus dengan banyaknya pilihan.',
      benar: 'Kelompokkan pilihan secara bermakna dan pertahankan letaknya tetap, supaya pengguna baru bisa mencari dan pengguna lama bisa langsung memilih.'
    },
    {
      salah: 'Memakai konstanta a dan b dari buku untuk meramal waktu mutlak di perangkatmu.',
      kenapa: 'Konstanta bergantung pada perangkat, pengguna, dan cara pengukuran. Angka buku berguna untuk membandingkan rancangan, bukan untuk meramal detik yang tepat.',
      benar: 'Ukur sendiri dengan percobaan menunjuk dan regresi, atau pakai konstanta contoh hanya untuk perbandingan relatif.'
    },
    {
      salah: 'Memercayai titik potong a hasil regresi sama seperti kemiringan b.',
      kenapa: 'a adalah ekstrapolasi ke ID = 0, di luar rentang data percobaan, sehingga lebih peka terhadap derau. Pada data tiruan di topik ini, a meleset hampir lima kali lebih jauh dari b.',
      benar: 'Pakai b atau throughput 1/b untuk membandingkan perangkat, dan laporkan a dengan hati-hati.'
    }
  ],

  analogi: `Bayangkan kamu melempar **anak panah** ke papan target.

**Hukum Fitts.** Papan yang besar dan dekat: kamu tinggal melempar, hampir tanpa membidik. Papan yang kecil dan jauh: kamu membidik lama, menyesuaikan sedikit, menyesuaikan lagi.

Tetapi perhatikan: papan kecil di jarak dekat terasa sama sulitnya dengan papan besar di jarak jauh — yang menentukan adalah seberapa kecil papannya **dibanding** jaraknya. Dan papan delapan kali lebih jauh tidak butuh waktu membidik delapan kali lebih lama; setiap penyesuaian memperbaiki bidikan dengan perbandingan yang kira-kira tetap, jadi banyaknya penyesuaian tumbuh pelan.

**Tepi layar.** Sekarang bayangkan papan target itu dipasang di dinding, dan kamu tidak melempar, melainkan **mendorong** anak panah sepanjang meja yang ujungnya menempel ke dinding. Kamu tidak perlu membidik jarak sama sekali — dorong sekuat tenaga, dan dinding yang menghentikannya. Itulah menu di tepi layar.

**Hukum Hick.** Di warung langgananmu, menunya dua puluh pilihan, dan kamu langsung bilang "nasi goreng" — karena kamu hafal. Menu dua puluh atau empat puluh hampir tidak mengubah kecepatanmu memesan.

Di warung baru, dengan menu yang sama panjangnya, kamu membaca satu per satu dari atas. Empat puluh pilihan butuh kira-kira dua kali lebih lama dari dua puluh. Menunya sama; yang berbeda cuma apakah kamu sudah hafal.

Warung yang cerdas melayani keduanya: menu dikelompokkan — nasi, mi, minuman — supaya pelanggan baru bisa cepat mencari, dan urutannya tidak pernah diubah supaya pelanggan lama tidak perlu mencari lagi.`,

  latihan: [
    'Hitung ID dan MT untuk tombol "Kirim" berlebar 120 px di jarak 600 px, lalu untuk lebar 60 px di jarak 300 px, dan jelaskan hasilnya.',
    'Ukur jarak dan lebar tiga tombol yang paling sering kamu pakai di satu aplikasi, lalu hitung ID-nya.',
    'Hitung berapa lebar tombol di jarak 1000 px yang memberi ID sama dengan tombol 40 px di jarak 200 px.',
    'Jelaskan dengan hukum Fitts kenapa menu klik-kanan yang muncul di posisi kursor cepat dipakai.',
    'Hitung waktu memilih menurut Hick untuk menu 12 pilihan lawan menu bertingkat 3 × 4.',
    'Beri contoh situasi di mana hukum Hick tidak berlaku, dan jelaskan model waktu yang lebih cocok.',
    'Buat halaman HTML sederhana yang menampilkan target acak dan mencatat waktu klik, lalu kumpulkan setidaknya 60 percobaan dari dirimu sendiri.',
    'Regresikan data percobaanmu pada ID untuk mendapat a, b, dan throughput 1/b tanganmu dengan tetikus.',
    'Ulangi percobaan dengan touchpad, lalu bandingkan throughput kedua perangkat.',
    'Jelaskan kenapa rumusan log₂(D/W + 1) lebih baik daripada log₂(2D/W) untuk target yang sangat dekat.'
  ]
});


TOPICS.push({
  id: 'imk-klm-goms',
  judul: 'KLM-GOMS — Meramal Waktu Tugas',
  kategori: 'imk',
  tag: ['GOMS', 'KLM', 'keystroke-level model', 'operator', 'evaluasi analitik', 'waktu tugas', 'formulir'],
  ringkas: 'Menjumlahkan waktu setiap tekan tombol, gerakan tetikus, dan jeda berpikir untuk membandingkan rancangan — sebelum satu baris kode pun ditulis.',

  fungsi: `**Meramal berapa lama pengguna mahir menyelesaikan sebuah tugas dengan sebuah rancangan antarmuka, cukup dengan menguraikan tugas itu menjadi operator-operator kecil.**

Terpakai di:

- **Membandingkan rancangan sejak sketsa** — dropdown atau kotak teks, kalender atau ketik langsung, tanpa perlu membuat dan menguji keduanya
- **Tugas yang diulang ribuan kali** — formulir entri data, kasir, pusat panggilan; selisih dua detik per tugas menjadi berjam-jam per hari
- **Menunjukkan dari mana waktu habis** — penguraian menunjukkan apakah yang mahal gerakan tetikus, pengetikan, atau jeda berpikir
- **Evaluasi analitik** di mata kuliah IMK — pelengkap evaluasi heuristik dan uji pengguna

Yang paling mengejutkan saat pertama kali memakainya: **operator M — jeda berpikir — sering mendominasi.** Satu keputusan mental memakan 1,35 detik, lebih lama dari satu gerakan tetikus ditambah klik. Rancangan yang memaksa pengguna berhenti dan berpikir di setiap langkah mahal, sekalipun jumlah kliknya sedikit.

Dan pelajaran terpentingnya: **rancangan terbaik bergantung pada tugasnya.** Kalender adalah cara tercepat mengisi tanggal minggu depan, dan salah satu yang paling lambat untuk tanggal lahir.`,

  praktik: {
    tujuan: 'Kamu bisa menguraikan tugas menjadi operator KLM, menaruh operator M dengan aturan yang masuk akal, menghitung waktu tugas, dan membandingkan beberapa rancangan untuk tugas yang sama.',
    alat: ['Python 3', 'Sketsa atau purwarupa rancangan yang ingin dibandingkan'],
    langkah: [
      { judul: 'Pilih tugas yang spesifik',
        isi: `Bukan "mengisi formulir", melainkan "mengisi tanggal lahir 17-08-2003 di formulir pendaftaran". KLM butuh urutan langkah yang pasti.` },
      { judul: 'Tulis urutan tindakan fisik',
        isi: `Untuk setiap rancangan, tulis langkah demi langkah dengan operator:

- **K** tekan tombol keyboard — 0,28 s untuk pengetik rata-rata
- **P** arahkan tetikus ke target — 1,10 s
- **B** tekan atau lepas tombol tetikus — 0,10 s; satu klik = BB
- **H** pindah tangan keyboard-tetikus — 0,40 s` },
      { judul: 'Taruh operator M',
        isi: `M (1,35 s) adalah jeda mental sebelum sebuah langkah yang butuh keputusan atau mengingat. Aturan praktisnya: M sebelum setiap langkah yang memulai sub-tugas baru — memilih dropdown berikutnya, mulai mengetik sebuah isian — dan bukan di tengah urutan yang sudah otomatis, seperti mengetik kata yang sudah dihafal.

Peletakan M adalah bagian KLM yang paling subjektif. Pakai aturan yang sama untuk semua rancangan yang dibandingkan.` },
      { judul: 'Jumlahkan',
        isi: `Waktu tugas = jumlah waktu semua operator. Tambahkan R (waktu tanggap sistem) kalau pengguna harus menunggu.` },
      { judul: 'Bandingkan dan cari penyebabnya',
        isi: `Urutkan rancangan menurut waktu. Lalu untuk rancangan yang lambat, hitung sumbangan setiap jenis operator. Kalau M mendominasi, kurangi keputusan; kalau P, dekatkan atau gabungkan target.` },
      { judul: 'Uji dengan tugas lain',
        isi: `Ulangi perhitungan untuk variasi tugas — tanggal dekat dan tanggal jauh, nama pendek dan panjang. Rancangan yang menang di satu variasi bisa kalah di variasi lain.` }
    ],
    cek: [
      'Setiap rancangan yang kamu bandingkan diuraikan untuk tugas yang sama persis',
      'Kamu memakai aturan peletakan M yang sama untuk semua rancangan',
      'Kamu bisa menunjuk jenis operator yang paling banyak memakan waktu',
      'Kamu sudah memeriksa apakah rancangan terbaik berubah untuk variasi tugas'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa berpikir dihitung sebagai operator',

  konsep: `Topik User-Centered Design membahas evaluasi **dengan** pengguna: uji usability dan SUS. Topik ini membahas evaluasi **tanpa** pengguna — evaluasi analitik — yang bisa dilakukan sejak rancangan masih berupa sketsa.

**GOMS dan KLM**

GOMS — *Goals, Operators, Methods, Selection rules* — adalah keluarga model dari Card, Moran, dan Newell (1983) untuk menguraikan cara pengguna mahir menyelesaikan tugas. Anggota yang paling sederhana dan paling banyak dipakai adalah **KLM**, *Keystroke-Level Model*: uraikan tugas menjadi operator-operator dasar, lalu jumlahkan waktunya.

| Operator | Waktu | Arti |
|---|---|---|
| K | 0,28 s | tekan satu tombol keyboard (pengetik rata-rata) |
| P | 1,10 s | arahkan tetikus ke sebuah target |
| B | 0,10 s | tekan atau lepas tombol tetikus |
| H | 0,40 s | pindah tangan antara keyboard dan tetikus |
| M | 1,35 s | persiapan mental sebelum sebuah langkah |

P adalah rata-rata hukum Fitts untuk target yang umum. Kalau jarak dan lebar targetnya diketahui, P bisa dihitung lebih tepat dengan topik hukum Fitts.

**Kasus: mengisi tanggal lahir**

Tiga rancangan untuk tanggal lahir 17-08-2003, tangan mulai di tetikus:

| Rancangan | Operator | Waktu |
|---|---|---|
| A. tiga dropdown | M×6, P×7, B×14 | 17,20 s |
| B. satu kotak teks | M×2, P×1, B×2, H×1, K×10 | **7,20 s** |
| C. kalender pemilih | M×4, P×5, B×54 | 16,30 s |

Kotak teks lebih dari dua kali lebih cepat dari kalender. Kalender terlihat paling ramah, tetapi untuk tanggal **lahir** — 23 tahun ke belakang — pengguna harus menekan tombol "tahun sebelumnya" berkali-kali. Tiga dropdown paling lambat: setiap dropdown adalah keputusan tersendiri, dan dropdown tahun yang panjang butuh menggulir.

**Tugas lain, pemenang lain**

Untuk tanggal janji temu minggu depan:

| Rancangan | Waktu |
|---|---|
| B. kotak teks | 7,20 s |
| C. kalender | **5,30 s** |

Kalender kini yang tercepat: tanggalnya ada di bulan yang sedang terbuka, cukup dua kali tunjuk dan klik. Kotak teks tetap butuh sepuluh ketukan.

Rancangan yang tepat bergantung pada **tugasnya**, bukan pada seberapa modern komponennya. Formulir pendaftaran yang memakai kalender untuk tanggal lahir — kesalahan yang sangat umum — memilih komponen yang tepat untuk tugas yang salah.

**Dari mana waktunya habis**

Untuk rancangan A:

| Operator | Jumlah | Waktu | Bagian |
|---|---|---|---|
| M | 6 × 1,35 | 8,10 s | 47% |
| P | 7 × 1,10 | 7,70 s | 45% |
| B | 14 × 0,10 | 1,40 s | 8% |

Enam keputusan mental memakan hampir separuh waktunya — lebih banyak dari semua gerakan tetikus. Klik hampir tidak berarti.

Pelajarannya berlawanan dengan intuisi "kurangi klik": yang lebih mahal adalah **jumlah keputusan**. Satu layar yang meminta pengguna berhenti dan memilih tiga kali lebih lambat dari satu layar yang membiarkannya mengetik tanpa berhenti, meskipun yang kedua butuh lebih banyak tekan tombol.

**Batas KLM**

KLM meramal waktu pengguna **mahir** yang tidak membuat kesalahan. Ia tidak meramal waktu belajar, kesalahan, kelelahan, atau kepuasan. Untuk itu ada uji pengguna dan SUS. Dua jenis evaluasi ini saling melengkapi: KLM murah dan bisa dipakai sejak sketsa; uji pengguna mahal tetapi menangkap hal-hal yang tidak bisa dimodelkan.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "OPERATOR = {\n    'K': 0.28,   # tekan tombol keyboard\n    'P': 1.10,   # arahkan tetikus\n    'B': 0.10,   # tekan/lepas tombol tetikus\n    'H': 0.40,   # pindah keyboard <-> tetikus\n    'M': 1.35,   # persiapan mental\n}\n\ndef waktu(urutan):\n    return sum(OPERATOR[op] for op in urutan.split())\n\n# B. satu kotak teks: pikir, tunjuk, klik, ke keyboard, pikir, ketik\nwaktu('M P B B H M ' + 'K ' * 10)     # 7.20 s",
      penjelasan: `Model yang sangat sederhana — sebuah kamus dan sebuah jumlah — dan justru kesederhanaannya yang membuatnya berguna.

**Kenapa cukup dijumlahkan.**

KLM menganggap operator-operator dikerjakan satu per satu, tanpa tumpang tindih, oleh pengguna mahir yang tidak ragu dan tidak salah. Dengan anggapan itu, waktu tugas adalah jumlah waktu operatornya.

Anggapan itu jelas tidak sempurna — orang bisa mulai menggerakkan tetikus sambil berpikir. Tetapi percobaan Card, Moran, dan Newell menunjukkan bahwa ramalan KLM untuk tugas rutin biasanya meleset sekitar 20 persen — cukup untuk membandingkan rancangan yang selisihnya dua kali lipat.

**Membaca urutan kotak teks.**

- **M** — memutuskan untuk mengisi tanggal
- **P B B** — menunjuk kotak isian dan mengkliknya
- **H** — memindahkan tangan dari tetikus ke keyboard
- **M** — mengingat format: tanggal dulu atau bulan dulu, pakai tanda hubung atau garis miring
- **K × 10** — mengetik "17-08-2003"

M kedua itu penting. Kotak teks dengan format yang tidak jelas memaksa pengguna berhenti dan berpikir — dan kalau ia salah menebak format, tugasnya gagal dan harus diulang. Contoh format di dalam kotak, seperti "dd-mm-yyyy", tidak menghapus M itu, tetapi mencegah kegagalannya.

**Nilai operatornya.**

Nilai K bergantung pada kecepatan mengetik: 0,28 s untuk pengetik rata-rata sekitar 40 kata per menit, lebih kecil untuk pengetik cepat, jauh lebih besar untuk orang yang mencari tombol. Card, Moran, dan Newell memberi tabel nilai K untuk berbagai tingkat keterampilan.

M = 1,35 s adalah rata-rata dari percobaan mereka. Nilainya bisa diperdebatkan, dan peletakannya lebih bisa diperdebatkan lagi — karena itu aturan peletakan yang sama harus dipakai untuk semua rancangan yang dibandingkan.

**Yang tidak ada di model ini.**

Tidak ada operator untuk membaca, mencari di layar, atau menunggu. Kalau rancangan butuh pengguna mencari tombol di antara puluhan pilihan, KLM akan meramal terlalu cepat. Operator R — waktu tanggap sistem — bisa ditambahkan kalau pengguna harus menunggu layar berikutnya muncul.`
    },
    {
      bahasa: 'python',
      kode: "RANCANGAN_C = ('M P B B '              # buka kalender\n               'M P B B '              # klik judul tahun\n               'P B B ' + 'B B ' * 22 + # mundur 23 tahun\n               'M P B B M P B B')      # pilih bulan, pilih tanggal\n\nwaktu(RANCANGAN_C)            # 16.30 s   (tanggal lahir)\nwaktu('M P B B M P B B')      #  5.30 s   (tanggal minggu depan)\n\n# sumbangan operator rancangan A (tiga dropdown):\n#   M 47%   P 45%   B 8%",
      penjelasan: `Uraian kalender yang menunjukkan dari mana 16 detik itu datang — dan kenapa rancangan yang sama bisa menjadi yang tercepat untuk tugas lain.

**Menelusuri 23 tahun.**

Kalender biasa menampilkan satu bulan. Untuk mundur ke 2003, pengguna menekan tombol "tahun sebelumnya" berulang-ulang. Menunjuk tombol itu cukup sekali (P); sesudahnya, kursor sudah di sana, dan setiap tahun cuma butuh satu klik (B B) — 23 klik, 0,2 detik masing-masing.

Klik-klik itu sendiri cuma 4,6 detik. Yang membuat totalnya 16,3 detik adalah empat keputusan dan lima gerakan tetikus di sekelilingnya.

Kalender yang lebih baik untuk tanggal lahir menyediakan cara melompat langsung ke tahun — misalnya daftar tahun yang bisa diketik atau dipilih sekali. Menghitung ulang dengan KLM akan menunjukkan berapa yang dihemat, sebelum kalender itu dibuat.

**Tanggal dekat: kalender menang.**

Untuk tanggal minggu depan, bulannya sudah terbuka. Cukup buka kalender dan klik tanggalnya: dua keputusan, dua tunjuk, dua klik — 5,30 detik. Tidak ada pengetikan, tidak ada pindah tangan ke keyboard, dan tidak ada keraguan soal format.

**Kenapa M mendominasi rancangan A.**

Setiap dropdown adalah dua keputusan: membuka dropdown yang benar, lalu memilih nilai yang benar di dalamnya. Tiga dropdown, enam keputusan, 8,1 detik — hampir separuh total.

Ini menunjukkan ke mana perbaikan seharusnya diarahkan. Mengurangi satu klik menghemat 0,2 detik. Menghapus satu keputusan — misalnya menggabungkan tiga dropdown menjadi satu isian — menghemat 1,35 detik atau lebih.

**Pola umumnya.**

KLM paling berguna bukan untuk angka mutlaknya, melainkan untuk dua hal: **membandingkan** rancangan untuk tugas yang sama, dan **menunjukkan** operator mana yang menghabiskan waktu. Keduanya bisa dilakukan dengan kertas dan pensil, sebelum purwarupa apa pun dibuat.`
    }
  ],

  kode: { python: String.raw`# ============================================
# KLM-GOMS: meramal waktu tugas sebelum ada purwarupa
# ============================================

# Operator Keystroke-Level Model (Card, Moran & Newell)
OPERATOR = {
    "K": (0.28, "tekan satu tombol keyboard (pengetik rata-rata)"),
    "P": (1.10, "arahkan tetikus ke sebuah target"),
    "B": (0.10, "tekan atau lepas tombol tetikus"),
    "H": (0.40, "pindah tangan antara keyboard dan tetikus"),
    "M": (1.35, "persiapan mental sebelum sebuah langkah"),
}

def waktu(urutan):
    """Jumlah waktu untuk deret operator, misalnya 'M P B B'."""
    return sum(OPERATOR[op][0] for op in urutan.split())

def rincian(urutan):
    hitung = {}
    for op in urutan.split():
        hitung[op] = hitung.get(op, 0) + 1
    return "  ".join(op + "x" + str(n) for op, n in sorted(hitung.items()))

print("--- operator KLM ---")
for op, (t, arti) in OPERATOR.items():
    print("  " + op + "  " + format(t, ".2f") + " s  " + arti)

# --------------------------------------------
# 1. Mengisi tanggal lahir: tiga rancangan
# --------------------------------------------
print("\n--- tugas: mengisi tanggal lahir 17-08-2003 ---")
print("  (tangan mulai di tetikus; M ditaruh sebelum setiap keputusan)")
RANCANGAN = {
    "A. tiga dropdown (tgl, bln, thn)":
        # tiap dropdown: pikir, tunjuk, klik, tunjuk pilihan, klik
        # tahun: daftar panjang, perlu gulir -> tambahan P dan klik
        "M P B B M P B B  M P B B M P B B  M P B B M P B B P B B",
    "B. satu kotak teks 'dd-mm-yyyy'":
        # pikir, tunjuk kotak, klik, pindah ke keyboard, ketik 10 karakter
        "M P B B H M " + "K " * 10,
    "C. kalender pemilih tanggal":
        # buka kalender, klik 'tahun' lalu mundur 23 tahun lewat tombol
        "M P B B M P B B " + "P B B " * 1 + "B B " * 22 + "M P B B M P B B",
}
hasil = {}
for nama, urut in RANCANGAN.items():
    t = waktu(urut)
    hasil[nama] = t
    print("\n  " + nama)
    print("    " + rincian(urut) + "   -> " + format(t, ".2f") + " s")

urutan = sorted(hasil, key=hasil.get)
print("\n  urutan: " + " < ".join(n.split(".")[0] + " " + format(hasil[n], ".2f")
                                for n in urutan))
print("  Kotak teks lebih dari dua kali lebih cepat dari kalender.")
print("  Kalender terlihat paling ramah, tetapi untuk tanggal LAHIR --")
print("  puluhan tahun ke belakang -- ia hampir selambat tiga dropdown.")

# --------------------------------------------
# 2. Kalender untuk tanggal dekat
# --------------------------------------------
print("\n--- tugas lain: tanggal janji temu minggu depan ---")
dekat = {
    "B. satu kotak teks": "M P B B H M " + "K " * 10,
    "C. kalender": "M P B B M P B B",
}
for nama, urut in dekat.items():
    print("  " + format(nama, "<22") + rincian(urut) + "   -> " + format(waktu(urut), ".2f") + " s")
print("  Rancangan yang tepat bergantung pada TUGASNYA, bukan pada")
print("  seberapa modern komponennya.")

# --------------------------------------------
# 3. Operator M yang mendominasi
# --------------------------------------------
print("\n--- sumbangan setiap operator (rancangan A) ---")
urut = RANCANGAN["A. tiga dropdown (tgl, bln, thn)"].split()
total = waktu(" ".join(urut))
for op in "MPBKH":
    n = urut.count(op)
    if n:
        t = n * OPERATOR[op][0]
        print("  " + op + ": " + format(n, ">2") + " x " + format(OPERATOR[op][0], ".2f")
              + " = " + format(t, "5.2f") + " s  (" + format(t / total, ".0%") + ")")
print("  Enam keputusan mental memakan hampir separuh waktunya. Setiap")
print("  langkah yang memaksa pengguna berhenti dan berpikir mahal --")
print("  lebih mahal dari klik yang ditambahkan.")` },
  output: `--- operator KLM ---
  K  0.28 s  tekan satu tombol keyboard (pengetik rata-rata)
  P  1.10 s  arahkan tetikus ke sebuah target
  B  0.10 s  tekan atau lepas tombol tetikus
  H  0.40 s  pindah tangan antara keyboard dan tetikus
  M  1.35 s  persiapan mental sebelum sebuah langkah

--- tugas: mengisi tanggal lahir 17-08-2003 ---
  (tangan mulai di tetikus; M ditaruh sebelum setiap keputusan)

  A. tiga dropdown (tgl, bln, thn)
    Bx14  Mx6  Px7   -> 17.20 s

  B. satu kotak teks 'dd-mm-yyyy'
    Bx2  Hx1  Kx10  Mx2  Px1   -> 7.20 s

  C. kalender pemilih tanggal
    Bx54  Mx4  Px5   -> 16.30 s

  urutan: B 7.20 < C 16.30 < A 17.20
  Kotak teks lebih dari dua kali lebih cepat dari kalender.
  Kalender terlihat paling ramah, tetapi untuk tanggal LAHIR --
  puluhan tahun ke belakang -- ia hampir selambat tiga dropdown.

--- tugas lain: tanggal janji temu minggu depan ---
  B. satu kotak teks    Bx2  Hx1  Kx10  Mx2  Px1   -> 7.20 s
  C. kalender           Bx4  Mx2  Px2   -> 5.30 s
  Rancangan yang tepat bergantung pada TUGASNYA, bukan pada
  seberapa modern komponennya.

--- sumbangan setiap operator (rancangan A) ---
  M:  6 x 1.35 =  8.10 s  (47%)
  P:  7 x 1.10 =  7.70 s  (45%)
  B: 14 x 0.10 =  1.40 s  (8%)
  Enam keputusan mental memakan hampir separuh waktunya. Setiap
  langkah yang memaksa pengguna berhenti dan berpikir mahal --
  lebih mahal dari klik yang ditambahkan.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Menghitung waktu satu urutan n operator', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Membandingkan r rancangan', waktu: 'O(r · n)', memori: 'O(r)' },
      { operasi: 'Biaya evaluasi KLM (manusia)', waktu: 'menit per tugas', memori: 'tanpa pengguna, tanpa purwarupa' },
      { operasi: 'Biaya uji pengguna (manusia)', waktu: 'jam per peserta', memori: 'butuh purwarupa dan peserta' }
    ],
    intuisi: `Perhitungannya sepele. Yang menarik adalah perbandingan biaya di dua baris terakhir: KLM bisa dikerjakan satu orang dalam hitungan menit per tugas, dengan sketsa di kertas. Uji pengguna butuh purwarupa yang bisa dipakai, peserta, ruang, dan waktu berjam-jam.

Karena itu KLM paling berharga di awal rancangan, saat banyak alternatif masih terbuka dan membangun semuanya terlalu mahal. KLM menyaring pilihan; uji pengguna memastikan pilihan yang tersisa benar-benar bekerja untuk manusia sungguhan.`
  },

  kesalahanUmum: [
    {
      salah: 'Membandingkan rancangan dengan menghitung jumlah klik saja.',
      kenapa: 'Klik adalah operator termurah. Pada rancangan tiga dropdown, klik cuma 8 persen waktu, sedangkan keputusan mental 47 persen.',
      benar: 'Uraikan tugas menjadi semua operator, termasuk M dan P, lalu bandingkan total waktunya.'
    },
    {
      salah: 'Memakai aturan peletakan M yang berbeda untuk rancangan yang dibandingkan.',
      kenapa: 'M adalah operator termahal dan paling subjektif. Menaruh satu M lebih banyak di satu rancangan saja sudah menggeser hasilnya 1,35 detik.',
      benar: 'Tetapkan aturan peletakan M lebih dulu dan terapkan sama untuk semua rancangan.'
    },
    {
      salah: 'Menyimpulkan rancangan terbaik dari satu variasi tugas.',
      kenapa: 'Kalender tercepat untuk tanggal minggu depan tetapi jauh lebih lambat dari kotak teks untuk tanggal lahir.',
      benar: 'Hitung ulang untuk variasi tugas yang realistis dan pilih rancangan sesuai tugas yang paling sering.'
    },
    {
      salah: 'Memakai KLM untuk meramal waktu pengguna pemula.',
      kenapa: 'KLM memodelkan pengguna mahir tanpa kesalahan. Pengguna pemula membaca, mencari, ragu, dan salah, sehingga waktunya jauh lebih lama.',
      benar: 'Pakai KLM untuk membandingkan rancangan bagi pengguna yang sudah terbiasa, dan uji pengguna untuk pemula.'
    },
    {
      salah: 'Melupakan operator H saat tugas berganti antara tetikus dan keyboard.',
      kenapa: 'Setiap perpindahan tangan memakan 0,4 detik. Formulir yang memaksa bolak-balik antara klik dan ketik menumpuk operator H yang tidak terlihat di sketsa.',
      benar: 'Tulis H setiap kali tangan berpindah, dan rancang formulir supaya bisa diisi dari keyboard saja dengan tombol Tab.'
    }
  ],

  analogi: `Bayangkan kamu memperkirakan **waktu memasak mi instan** dengan dua cara berbeda, sebelum benar-benar memasaknya.

KLM berkata: pecah menjadi langkah-langkah kecil yang waktunya sudah diketahui. Mengambil panci: 3 detik. Mengisi air: 10 detik. Menyalakan kompor: 2 detik. Menunggu mendidih: 3 menit. Membuka bungkus: 5 detik. Dan seterusnya. Jumlahkan, dan kamu punya perkiraan — tanpa menyalakan kompor sama sekali.

**Operator M.** Sekarang temanmu memasak mi dengan resep baru yang belum pernah ia coba. Di setiap langkah ia berhenti: "bumbunya dimasukkan sekarang atau nanti?" "Airnya segini cukup?" Setiap jeda itu mungkin cuma sedetik dua detik — tetapi ada di **setiap** langkah, dan totalnya bisa melebihi waktu gerakan tangannya. Itulah M: berpikir adalah pekerjaan, dan ia makan waktu.

**Tugas yang berbeda.** Memasak satu porsi mi paling cepat dengan panci kecil. Memasak untuk sepuluh orang di acara kos paling cepat dengan panci besar — meskipun mengambil dan mencuci panci besar lebih repot. Peralatan terbaik bergantung pada tugasnya, sama seperti kalender dan kotak teks.

**Batasnya.** Perkiraan ini untuk orang yang sudah biasa memasak mi. Untuk adik kecilmu yang baru pertama kali — yang mungkin menumpahkan air atau lupa menyalakan kompor — perkiraannya akan meleset jauh. Untuk tahu bagaimana ia benar-benar memasak, kamu harus melihatnya memasak.`,

  latihan: [
    'Uraikan tugas "masuk ke akun dengan nama pengguna dan kata sandi lalu klik Masuk" dengan operator KLM, dan hitung waktunya.',
    'Hitung ulang rancangan kotak teks untuk pengetik cepat dengan K = 0,12 s.',
    'Rancang kalender dengan pilihan tahun langsung (klik judul, pilih tahun dari daftar), uraikan dengan KLM, dan bandingkan dengan rancangan C.',
    'Uraikan dua cara menyalin berkas di pengelola berkas: seret dan lepas, lawan klik kanan lalu salin dan tempel.',
    'Hitung sumbangan setiap jenis operator untuk rancangan kotak teks, lalu tentukan operator mana yang layak dikurangi.',
    'Tunjukkan bagaimana waktu rancangan A berubah kalau peletakan M diubah menjadi satu M per dropdown, bukan dua.',
    'Pakai hukum Fitts untuk menghitung P yang lebih tepat bagi tombol kecil di pojok, lalu bandingkan dengan P = 1,10 s.',
    'Pilih satu formulir dari aplikasi kampus yang kamu pakai, uraikan satu tugasnya dengan KLM, dan usulkan perbaikan yang mengurangi waktunya.',
    'Jelaskan kenapa formulir yang bisa diisi dengan tombol Tab dari keyboard saja bisa lebih cepat, dengan operator H.',
    'Jelaskan dua hal yang tidak bisa diramal KLM dan metode evaluasi apa yang cocok untuk masing-masing.'
  ]
});


TOPICS.push({
  id: 'imk-evaluasi-heuristik',
  judul: 'Evaluasi Heuristik Nielsen',
  kategori: 'imk',
  tag: ['evaluasi heuristik', 'Nielsen', 'sepuluh heuristik', 'tingkat keparahan', 'jumlah evaluator', 'discount usability'],
  ringkas: 'Beberapa orang memeriksa antarmuka dengan sepuluh prinsip — cara murah menemukan banyak masalah usability, dengan satu batas yang sering dilebih-lebihkan: "lima evaluator sudah cukup".',

  fungsi: `**Menemukan masalah usability dengan meminta beberapa evaluator memeriksa antarmuka terhadap sepuluh prinsip, tanpa perlu merekrut pengguna.**

Terpakai di:

- **Tahap awal perancangan** — purwarupa kertas atau Figma bisa dievaluasi sebelum ada kode
- **Proyek dengan anggaran kecil** — Nielsen menyebutnya bagian dari *discount usability engineering*
- **Tugas dan projek akhir IMK** — evaluasi heuristik adalah metode evaluasi yang paling sering diminta bersama SUS
- **Sebelum uji pengguna** — menyingkirkan masalah yang jelas dulu, supaya waktu uji pengguna dipakai untuk masalah yang lebih halus

Yang paling penting dipahami: **satu evaluator menemukan sebagian kecil masalah.** Evaluator yang berbeda menemukan masalah yang berbeda, dan menggabungkan temuan beberapa evaluator jauh lebih efektif daripada satu evaluator yang bekerja lebih lama.

Dan yang paling sering disalahpahami: **"lima evaluator cukup" bukan jaminan.** Angka itu berasal dari rumus yang menganggap semua masalah sama mudahnya ditemukan. Masalah yang tersembunyi tetap sebagian besar lolos, bahkan dengan sepuluh evaluator.`,

  praktik: {
    tujuan: 'Kamu bisa menjalankan evaluasi heuristik dengan beberapa evaluator, memetakan setiap temuan ke heuristik, memberi tingkat keparahan, menggabungkan hasilnya, dan memperkirakan berapa masalah yang mungkin masih terlewat.',
    alat: ['Purwarupa atau aplikasi yang dievaluasi', 'Lembar temuan: masalah, lokasi, heuristik, keparahan', 'Python 3 untuk menggabungkan hasil'],
    langkah: [
      { judul: 'Siapkan tiga sampai lima evaluator',
        isi: `Evaluator sebaiknya memahami kesepuluh heuristik. Orang yang paham usability **dan** paham bidang aplikasinya menemukan paling banyak masalah.

Setiap evaluator bekerja **sendiri-sendiri** — tidak berdiskusi sebelum semua selesai, supaya temuan yang satu tidak memengaruhi yang lain.` },
      { judul: 'Periksa dua kali',
        isi: `Putaran pertama: jelajahi aplikasi untuk memahami alurnya. Putaran kedua: periksa setiap layar terhadap kesepuluh heuristik, satu per satu.` },
      { judul: 'Catat setiap temuan',
        isi: `Untuk setiap masalah: apa masalahnya, di mana, heuristik mana yang dilanggar, dan kenapa itu masalah bagi pengguna. "Warna jelek" bukan temuan; "tombol Hapus dan Simpan berwarna sama sehingga mudah tertukar" adalah temuan.` },
      { judul: 'Beri tingkat keparahan',
        isi: `Setiap evaluator memberi nilai 0–4 untuk setiap masalah di daftar gabungan — termasuk masalah yang ditemukan evaluator lain:

- 0 bukan masalah usability
- 1 kosmetik
- 2 kecil
- 3 besar, harus diperbaiki
- 4 bencana usability, wajib sebelum rilis` },
      { judul: 'Gabungkan dan urutkan',
        isi: `Satukan daftar semua evaluator, buang yang kembar, rata-ratakan keparahannya, lalu urutkan dari yang paling parah. Catat juga berapa evaluator yang menemukan setiap masalah.` },
      { judul: 'Perkirakan yang terlewat',
        isi: `Masalah yang cuma ditemukan satu evaluator adalah petunjuk: kalau banyak, kemungkinan masih ada masalah lain yang tidak ditemukan siapa pun. Tambah evaluator, atau lanjutkan dengan uji pengguna.` }
    ],
    cek: [
      'Setiap temuanmu menyebut lokasi, heuristik yang dilanggar, dan akibatnya bagi pengguna',
      'Evaluator bekerja sendiri-sendiri sebelum temuan digabung',
      'Daftar akhirmu diurutkan menurut rata-rata keparahan',
      'Kamu tidak menyimpulkan semua masalah sudah ditemukan hanya karena sudah memakai lima evaluator'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa evaluator tambahan makin sedikit gunanya',

  konsep: `Topik User-Centered Design membahas evaluasi dengan pengguna — uji usability dan SUS. Topik KLM-GOMS membahas evaluasi analitik yang meramal waktu. **Evaluasi heuristik** berada di antara keduanya: pemeriksaan oleh evaluator, tanpa pengguna, memakai prinsip-prinsip yang sudah teruji.

**Sepuluh heuristik Nielsen**

Jakob Nielsen menyusun sepuluh prinsip umum usability (1994), yang sampai sekarang paling luas dipakai:

1. Visibilitas status sistem
2. Kecocokan sistem dengan dunia nyata
3. Kendali dan kebebasan pengguna
4. Konsistensi dan standar
5. Pencegahan kesalahan
6. Mengenali, bukan mengingat
7. Fleksibilitas dan efisiensi
8. Desain estetis dan minimalis
9. Bantu mengenali, mendiagnosis, dan pulih dari kesalahan
10. Bantuan dan dokumentasi

Beberapa heuristik terhubung langsung dengan topik-topik sebelumnya: "mengenali, bukan mengingat" adalah batas memori kerja dari topik manusia sebagai pemroses informasi; "visibilitas status sistem" adalah jurang evaluasi di model Norman.

**Berapa masalah yang ditemukan i evaluator**

Nielsen dan Landauer (1993) memodelkan bagian masalah yang ditemukan i evaluator sebagai 1 − (1 − L)^i, dengan L peluang satu evaluator menemukan satu masalah:

| Evaluator | L = 0,20 | L = 0,31 | L = 0,45 |
|---|---|---|---|
| 1 | 20% | 31% | 45% |
| 3 | 49% | 67% | 83% |
| 5 | 67% | 84% | 95% |
| 10 | 89% | 98% | 100% |
| 15 | 96% | 100% | 100% |

L = 0,31 adalah rata-rata yang dilaporkan dari proyek-proyek yang mereka teliti, dan dari situ lahir pedoman terkenal: lima evaluator — atau lima peserta uji — menemukan sekitar 85 persen masalah.

Bentuk kurvanya yang penting: evaluator pertama menemukan paling banyak; setiap evaluator berikutnya sebagian besar menemukan **ulang** masalah yang sudah ditemukan. Hasil yang makin menurun ini adalah alasan untuk memakai beberapa evaluator yang bekerja singkat, bukan satu evaluator yang bekerja lama.

**Kenyataannya: masalah tidak sama mudahnya ditemukan**

Rumus itu memakai satu L untuk semua masalah. Program membuat 40 masalah tiruan: 15 mudah terlihat (L 0,5–0,8), 17 sedang (0,15–0,4), dan 8 tersembunyi (0,02–0,08). Rata-rata L-nya 0,36.

| Evaluator | Rumus (L rata-rata) | Simulasi | 8 masalah tersembunyi |
|---|---|---|---|
| 1 | 36% | 37% | 6% |
| 3 | 74% | 65% | 18% |
| 5 | **90%** | **77%** | 28% |
| 10 | 99% | 87% | 47% |
| 20 | 100% | 94% | 72% |

Dengan lima evaluator, rumus meramal 90 persen; simulasi menemukan 77 persen. Dan dari delapan masalah tersembunyi, lima evaluator rata-rata cuma menemukan 28 persen — sepuluh evaluator pun belum separuhnya.

Rumus terlalu optimis karena masalah yang mudah terlihat ditemukan hampir semua evaluator, sehingga "menarik" rata-rata L ke atas, sementara masalah yang sulit hampir tidak pernah ditemukan. **Lima evaluator adalah pedoman untuk masalah yang cukup mudah terlihat, bukan jaminan untuk semuanya.** Masalah yang tersembunyi — sering yang hanya muncul di alur tertentu atau bagi pengguna tertentu — butuh metode lain, terutama uji pengguna dengan tugas yang realistis.

**Menggabungkan temuan**

Tiga evaluator memeriksa aplikasi presensi kampus (tiruan). Temuan digabung, keparahan dirata-rata, lalu diurutkan:

| Rata-rata | Oleh | Masalah | Heuristik |
|---|---|---|---|
| 3,7 | 3/3 | Tidak ada tanda presensi tersimpan | Visibilitas status sistem |
| 3,5 | 2/3 | Tombol Hapus tanpa konfirmasi | Pencegahan kesalahan |
| 3,0 | 3/3 | Pesan galat "Error 0x1F" | Pulih dari kesalahan |
| 3,0 | 1/3 | Kode kelas harus diingat dari halaman lain | Mengenali, bukan mengingat |
| 2,0 | 2/3 | Istilah "sinkronisasi token" di layar utama | Kecocokan dengan dunia nyata |
| 1,5 | 2/3 | Ikon berbeda untuk aksi sama | Konsistensi dan standar |
| 1,0 | 2/3 | Warna latar terlalu ramai | Estetis dan minimalis |

Perhatikan baris keempat: keparahan 3 — masalah besar — tetapi cuma **satu** dari tiga evaluator yang menemukannya. Dengan dua evaluator, ada kemungkinan besar masalah itu tidak pernah tercatat. Itu gambaran kecil dari tabel simulasi di atas: masalah yang sulit ditemukan bukan berarti masalah yang ringan.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def simulasi(i, ulang=2000):\n    total, tersembunyi = 0, 0\n    for _ in range(ulang):\n        # masalah ditemukan kalau SETIDAKNYA SATU dari i evaluator menemukannya\n        temu = [any(random.random() < L for _ in range(i)) for L in MASALAH]\n        total += sum(temu)\n        tersembunyi += sum(temu[32:])\n    return total / ulang / len(MASALAH), tersembunyi / ulang / 8\n\n# 5 evaluator: rumus 90%, simulasi 77%, tersembunyi 28%",
      penjelasan: `Simulasi yang menguji rumus Nielsen-Landauer dengan melepas satu anggapannya — dan menunjukkan seberapa besar anggapan itu menentukan hasilnya.

**Dari mana rumus 1 − (1 − L)^i.**

Satu evaluator **gagal** menemukan satu masalah dengan peluang 1 − L. Kalau evaluator bekerja sendiri-sendiri, peluang **semua** i evaluator gagal adalah (1 − L)^i. Masalah ditemukan kalau tidak semuanya gagal: 1 − (1 − L)^i.

Ini perhitungan peluang yang sama dengan "peluang setidaknya satu" di topik peluang Probabilitas dan Statistika. Dan anggapan "evaluator bekerja sendiri-sendiri" adalah alasan evaluator tidak boleh berdiskusi sebelum selesai: kalau mereka saling memengaruhi, temuannya tidak lagi saling bebas, dan evaluator tambahan memberi lebih sedikit.

**Anggapan yang dilepas: L sama untuk semua masalah.**

Rumus memakai satu L. Simulasi memberi setiap masalah L-nya sendiri — sebagian besar, sebagian sangat kecil. Lalu untuk setiap masalah, \`any(...)\` memeriksa apakah setidaknya satu dari i evaluator menemukannya.

**Kenapa rumus terlalu optimis.**

Fungsi 1 − (1 − L)^i **cekung** terhadap L: untuk L besar, tambahan L hampir tidak menambah apa-apa karena hasilnya sudah dekat 100 persen; untuk L kecil, setiap tambahan L sangat berarti.

Jadi masalah dengan L = 0,8 dan masalah dengan L = 0,05 tidak "saling menutupi" menjadi dua masalah dengan L = 0,425. Masalah yang mudah sudah hampir pasti ditemukan — ia tidak bisa menyumbang lebih dari 100 persen. Masalah yang sulit hampir pasti terlewat. Rata-ratanya lebih rendah dari yang diramal rumus dengan L rata-rata.

Secara matematis, ini ketidaksamaan Jensen: untuk fungsi cekung, rata-rata fungsinya lebih kecil dari fungsi rata-ratanya.

**Apa artinya untuk praktik.**

"Lima evaluator menemukan 85 persen masalah" adalah angka yang berguna sebagai pedoman **perencanaan** — ia menunjukkan bahwa tiga sampai lima evaluator memberi hasil yang baik untuk biayanya. Tetapi ia tidak boleh dipakai sebagai **klaim** bahwa 85 persen masalah sudah ditemukan.

Nielsen sendiri menganjurkan beberapa putaran kecil dengan perbaikan di antaranya, bukan satu putaran besar lalu berhenti. Dan menggabungkan metode — karena setiap metode menemukan jenis masalah yang berbeda.`
    },
    {
      bahasa: 'python',
      kode: "TEMUAN = [\n    # (masalah, heuristik, keparahan evaluator 1, 2, 3; None = tidak menemukan)\n    ('Tidak ada tanda presensi berhasil tersimpan', 0, [4, 3, 4]),\n    ('Tombol Hapus tanpa konfirmasi',               4, [4, None, 3]),\n    ('Kode kelas harus diingat dari halaman lain',  5, [None, None, 3]),\n]\nfor nama, h, nilai in TEMUAN:\n    ada = [v for v in nilai if v is not None]\n    baris.append((sum(ada) / len(ada), len(ada), nama, h))\nbaris.sort(key=lambda t: (-t[0], -t[1]))   # parah dulu, lalu yang banyak ditemukan",
      penjelasan: `Menggabungkan temuan beberapa evaluator menjadi satu daftar prioritas — dengan satu keputusan tentang nilai yang kosong.

**None, bukan nol.**

Evaluator yang tidak menemukan sebuah masalah dicatat \`None\`, dan nilai itu **dibuang** dari rata-rata. Kalau dicatat 0, artinya "evaluator ini menilai ini bukan masalah" — padahal ia cuma tidak melihatnya.

Perbedaannya besar. "Kode kelas harus diingat" dinilai 3 oleh satu-satunya evaluator yang menemukannya. Dengan None dibuang, rata-ratanya 3,0. Dengan None dianggap 0, rata-ratanya 1,0 — dan masalah besar itu turun ke dasar daftar, di bawah "warna latar terlalu ramai".

**Cara yang lebih baik: minta semua evaluator menilai semua masalah.**

Praktik yang dianjurkan Nielsen: setelah daftar gabungan disusun, **setiap** evaluator memberi keparahan untuk **setiap** masalah di daftar, termasuk yang tidak ia temukan sendiri. Menilai masalah yang sudah dijelaskan jauh lebih mudah daripada menemukannya, dan rata-rata dari beberapa penilai lebih bisa dipercaya daripada penilaian satu orang.

Program ini memakai cara yang lebih sederhana — rata-rata dari yang menemukan saja — supaya pengaruh "siapa yang menemukan" terlihat jelas.

**Kenapa diurutkan dua kunci.**

\`(-rata, -oleh)\`: yang lebih parah dulu; kalau sama parahnya, yang ditemukan lebih banyak evaluator dulu. Pesan galat "Error 0x1F" dan "kode kelas harus diingat" sama-sama 3,0, tetapi yang pertama ditemukan ketiga evaluator — lebih pasti nyata dan lebih pasti dialami banyak pengguna.

**Memetakan ke heuristik.**

Setiap temuan menyimpan nomor heuristiknya. Menghitung temuan per heuristik menunjukkan pola: kalau banyak temuan jatuh di "konsistensi dan standar", masalahnya mungkin bukan di satu layar, melainkan tidak adanya panduan gaya — dan perbaikannya pun di tingkat itu.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Evaluasi heuristik: berapa evaluator yang cukup?
# ============================================
import random

HEURISTIK = [
    "Visibilitas status sistem",
    "Kecocokan sistem dengan dunia nyata",
    "Kendali dan kebebasan pengguna",
    "Konsistensi dan standar",
    "Pencegahan kesalahan",
    "Mengenali, bukan mengingat",
    "Fleksibilitas dan efisiensi",
    "Desain estetis dan minimalis",
    "Bantu mengenali, mendiagnosis, pulih dari kesalahan",
    "Bantuan dan dokumentasi",
]

# --------------------------------------------
# 1. Rumus Nielsen-Landauer: masalah yang ditemukan i evaluator
# --------------------------------------------
print("--- bagian masalah yang ditemukan: 1 - (1 - L)^i ---")
print("  L = peluang satu evaluator menemukan satu masalah")
print()
print("  evaluator   L = 0.20   L = 0.31   L = 0.45")
for i in [1, 2, 3, 5, 8, 10, 15]:
    print("  " + format(i, "<10") + "".join(format(1 - (1 - L) ** i, ">11.0%") for L in [0.20, 0.31, 0.45]))
print()
print("  Evaluator pertama menemukan paling banyak. Setiap evaluator")
print("  berikutnya sebagian besar menemukan ulang masalah yang sama.")

# --------------------------------------------
# 2. Kenyataannya: masalah tidak sama mudahnya ditemukan
# --------------------------------------------
random.seed(4)
MASALAH = []
for k in range(40):
    if k < 15:
        L = random.uniform(0.5, 0.8)       # mudah terlihat
    elif k < 32:
        L = random.uniform(0.15, 0.4)      # sedang
    else:
        L = random.uniform(0.02, 0.08)     # tersembunyi
    MASALAH.append(L)
rata_L = sum(MASALAH) / len(MASALAH)

def simulasi(i, ulang=2000):
    total, tersembunyi = 0, 0
    for _ in range(ulang):
        temu = [any(random.random() < L for _ in range(i)) for L in MASALAH]
        total += sum(temu)
        tersembunyi += sum(temu[32:])
    return total / ulang / len(MASALAH), tersembunyi / ulang / 8

print("\n--- 40 masalah tiruan: 15 mudah, 17 sedang, 8 tersembunyi ---")
print("  rata-rata L = " + format(rata_L, ".2f"))
print()
print("  evaluator   rumus (L rata)   simulasi   8 tersembunyi")
for i in [1, 3, 5, 10, 20]:
    ditemukan, sembunyi = simulasi(i)
    print("  " + format(i, "<10") + format(1 - (1 - rata_L) ** i, ">14.0%")
          + format(ditemukan, ">11.0%") + format(sembunyi, ">15.0%"))
print()
print("  Rumus memakai satu L untuk semua masalah dan terlalu optimis.")
print("  Masalah tersembunyi tetap sebagian besar lolos bahkan dengan")
print("  sepuluh evaluator -- 'lima evaluator cukup' adalah pedoman")
print("  untuk masalah yang cukup mudah terlihat, bukan jaminan.")

# --------------------------------------------
# 3. Menggabungkan temuan dan tingkat keparahan
# --------------------------------------------
print("\n--- menggabungkan temuan 3 evaluator (aplikasi presensi, tiruan) ---")
TEMUAN = [
    # (masalah, heuristik, keparahan dari evaluator 1, 2, 3; None = tidak menemukan)
    ("Tidak ada tanda presensi berhasil tersimpan", 0, [4, 3, 4]),
    ("Tombol 'Hapus' tanpa konfirmasi", 4, [4, None, 3]),
    ("Istilah 'sinkronisasi token' di layar utama", 1, [2, 2, None]),
    ("Ikon berbeda untuk aksi sama di dua halaman", 3, [None, 2, 1]),
    ("Pesan galat 'Error 0x1F'", 8, [3, 3, 3]),
    ("Kode kelas harus diingat dari halaman lain", 5, [None, None, 3]),
    ("Warna latar terlalu ramai", 7, [1, None, 1]),
]
print("  (keparahan 0-4: 0 bukan masalah ... 4 bencana usability)")
print()
baris = []
for nama, h, nilai in TEMUAN:
    ada = [v for v in nilai if v is not None]
    baris.append((sum(ada) / len(ada), len(ada), nama, h))
baris.sort(key=lambda t: (-t[0], -t[1]))
print("  rata  oleh  masalah")
for rata, n, nama, h in baris:
    print("  " + format(rata, "4.1f") + format(str(n) + "/3", ">6") + "  " + nama)
    print("               -> " + HEURISTIK[h])
print()
print("  Masalah dengan rata-rata keparahan tertinggi diperbaiki")
print("  dulu. Perhatikan 'kode kelas harus diingat': cuma SATU")
print("  evaluator yang menemukannya, dengan keparahan 3. Tanpa")
print("  evaluator ketiga, masalah itu tidak pernah tercatat.")` },
  output: `--- bagian masalah yang ditemukan: 1 - (1 - L)^i ---
  L = peluang satu evaluator menemukan satu masalah

  evaluator   L = 0.20   L = 0.31   L = 0.45
  1                 20%        31%        45%
  2                 36%        52%        70%
  3                 49%        67%        83%
  5                 67%        84%        95%
  8                 83%        95%        99%
  10                89%        98%       100%
  15                96%       100%       100%

  Evaluator pertama menemukan paling banyak. Setiap evaluator
  berikutnya sebagian besar menemukan ulang masalah yang sama.

--- 40 masalah tiruan: 15 mudah, 17 sedang, 8 tersembunyi ---
  rata-rata L = 0.36

  evaluator   rumus (L rata)   simulasi   8 tersembunyi
  1                    36%        37%             6%
  3                    74%        65%            18%
  5                    90%        77%            28%
  10                   99%        87%            47%
  20                  100%        94%            72%

  Rumus memakai satu L untuk semua masalah dan terlalu optimis.
  Masalah tersembunyi tetap sebagian besar lolos bahkan dengan
  sepuluh evaluator -- 'lima evaluator cukup' adalah pedoman
  untuk masalah yang cukup mudah terlihat, bukan jaminan.

--- menggabungkan temuan 3 evaluator (aplikasi presensi, tiruan) ---
  (keparahan 0-4: 0 bukan masalah ... 4 bencana usability)

  rata  oleh  masalah
   3.7   3/3  Tidak ada tanda presensi berhasil tersimpan
               -> Visibilitas status sistem
   3.5   2/3  Tombol 'Hapus' tanpa konfirmasi
               -> Pencegahan kesalahan
   3.0   3/3  Pesan galat 'Error 0x1F'
               -> Bantu mengenali, mendiagnosis, pulih dari kesalahan
   3.0   1/3  Kode kelas harus diingat dari halaman lain
               -> Mengenali, bukan mengingat
   2.0   2/3  Istilah 'sinkronisasi token' di layar utama
               -> Kecocokan sistem dengan dunia nyata
   1.5   2/3  Ikon berbeda untuk aksi sama di dua halaman
               -> Konsistensi dan standar
   1.0   2/3  Warna latar terlalu ramai
               -> Desain estetis dan minimalis

  Masalah dengan rata-rata keparahan tertinggi diperbaiki
  dulu. Perhatikan 'kode kelas harus diingat': cuma SATU
  evaluator yang menemukannya, dengan keparahan 3. Tanpa
  evaluator ketiga, masalah itu tidak pernah tercatat.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Rumus bagian ditemukan untuk i evaluator', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Simulasi: u ulangan, i evaluator, m masalah', waktu: 'O(u · i · m)', memori: 'O(m)' },
      { operasi: 'Menggabungkan t temuan dari e evaluator', waktu: 'O(t · e + t log t)', memori: 'O(t)' },
      { operasi: 'Biaya evaluasi (manusia)', waktu: '1–2 jam per evaluator', memori: 'tanpa pengguna' }
    ],
    intuisi: `Seperti KLM, biaya komputasinya tidak penting; yang penting biaya manusianya. Evaluasi heuristik butuh satu sampai dua jam per evaluator, ditambah waktu menggabungkan — jauh lebih murah dari uji pengguna.

Yang menentukan efektivitas biaya adalah bentuk kurva di tabel konsep: setiap evaluator tambahan menambah temuan baru lebih sedikit dari yang sebelumnya. Sampai titik tertentu, uang dan waktu lebih baik dipakai untuk putaran evaluasi berikutnya setelah perbaikan, atau untuk metode yang berbeda, daripada untuk evaluator keenam dan ketujuh di putaran yang sama.`
  },

  kesalahanUmum: [
    {
      salah: 'Menulis temuan tanpa lokasi dan akibat, misalnya "navigasi membingungkan".',
      kenapa: 'Temuan yang tidak spesifik tidak bisa diperbaiki dan tidak bisa digabung dengan temuan evaluator lain, karena tidak jelas apakah dua evaluator membicarakan masalah yang sama.',
      benar: 'Tulis apa masalahnya, di layar mana, heuristik mana yang dilanggar, dan apa akibatnya bagi pengguna.'
    },
    {
      salah: 'Membiarkan evaluator berdiskusi sebelum semuanya selesai.',
      kenapa: 'Evaluator saling memengaruhi dan cenderung mencari masalah yang sama, sehingga keuntungan memakai banyak evaluator — masing-masing menemukan hal berbeda — berkurang.',
      benar: 'Minta setiap evaluator bekerja sendiri, lalu gabungkan dan diskusikan setelah semua daftar selesai.'
    },
    {
      salah: 'Menganggap lima evaluator sudah menemukan 85 persen masalah.',
      kenapa: 'Angka itu dari rumus yang menganggap semua masalah sama mudahnya ditemukan. Dengan masalah yang kemudahannya bervariasi, simulasi di topik ini menemukan 77 persen, dan masalah tersembunyi cuma 28 persen.',
      benar: 'Pakai angka itu sebagai pedoman perencanaan, bukan sebagai klaim, dan lengkapi dengan uji pengguna.'
    },
    {
      salah: 'Menghitung evaluator yang tidak menemukan masalah sebagai nilai keparahan nol.',
      kenapa: 'Tidak menemukan tidak sama dengan menilai bukan masalah. Masalah besar yang cuma ditemukan satu evaluator akan turun ke dasar daftar prioritas.',
      benar: 'Buang nilai kosong dari rata-rata, atau lebih baik, minta semua evaluator menilai semua masalah di daftar gabungan.'
    },
    {
      salah: 'Mengganti uji pengguna sepenuhnya dengan evaluasi heuristik.',
      kenapa: 'Evaluator bukan pengguna sungguhan. Mereka menemukan pelanggaran prinsip dengan baik, tetapi melewatkan masalah yang hanya muncul saat orang dengan tujuan dan pengetahuan tertentu mencoba menyelesaikan tugas nyata.',
      benar: 'Pakai evaluasi heuristik untuk menyaring masalah yang jelas lebih dulu, lalu uji pengguna untuk sisanya.'
    },
    {
      salah: 'Memakai satu evaluator yang bekerja lebih lama sebagai ganti beberapa evaluator.',
      kenapa: 'Setiap orang punya titik buta yang sama sepanjang waktu. Evaluator yang berbeda menemukan masalah yang berbeda, dan itu yang membuat kurva penemuan naik.',
      benar: 'Pakai tiga sampai lima evaluator yang masing-masing bekerja singkat.'
    }
  ],

  analogi: `Bayangkan kamu mencari **salah ketik** di laporan tugas akhir sepanjang lima puluh halaman.

**Satu pembaca.** Kamu sendiri membaca ulang, dan menemukan sepertiga salah ketiknya. Membaca untuk kedua kalinya hampir tidak membantu — mata yang sama melewatkan hal yang sama, karena kamu sudah tahu apa yang ingin kamu tulis.

**Beberapa pembaca.** Kamu memberikan laporan kepada tiga teman, dan meminta mereka membaca **sendiri-sendiri**. Masing-masing menemukan sekitar sepertiga — tetapi sepertiga yang **berbeda**. Gabungan ketiganya menemukan jauh lebih banyak dari siapa pun sendirian.

**Makin sedikit gunanya.** Teman keempat dan kelima masih menemukan beberapa hal baru, tetapi sebagian besar yang mereka tandai sudah ditemukan tiga teman pertama. Teman kesepuluh hampir tidak menambah apa-apa.

**Salah ketik yang tersembunyi.** Tetapi ada jenis kesalahan yang hampir tidak pernah ditemukan: angka di tabel yang tidak cocok dengan angka di teks, atau nama variabel yang berbeda di bab tiga dan bab lima. Pembaca yang mencari salah ketik tidak melihatnya — mereka tidak membandingkan halaman. Sepuluh pembaca pun akan melewatkannya. Untuk kesalahan seperti itu, butuh cara lain: misalnya meminta dosen pembimbing menguji, atau menjalankan ulang perhitungannya.

**Keparahan.** Ketika semua temuan digabung, kamu tidak memperbaikinya sesuai urutan halaman. Salah ketik di judul bab lebih penting dari salah ketik di catatan kaki. Salah angka di hasil penelitian lebih penting dari keduanya — meskipun cuma satu teman yang menemukannya.`,

  latihan: [
    'Pilih satu aplikasi yang kamu pakai setiap hari, lalu temukan satu contoh pelanggaran untuk lima heuristik Nielsen yang berbeda.',
    'Tulis ulang temuan "tampilan membingungkan" menjadi temuan yang spesifik: lokasi, heuristik, dan akibatnya.',
    'Hitung dengan rumus berapa evaluator yang dibutuhkan supaya bagian ditemukan mencapai 90 persen untuk L = 0,25.',
    'Ubah simulasi supaya 20 dari 40 masalah tersembunyi, lalu bandingkan hasil 5 evaluator dengan rumus.',
    'Jelaskan dengan kata-katamu sendiri kenapa rumus dengan L rata-rata terlalu optimis ketika L bervariasi.',
    'Lakukan evaluasi heuristik bersama dua teman pada satu halaman situs kampus, masing-masing sendiri-sendiri, lalu gabungkan temuannya.',
    'Minta setiap evaluator menilai keparahan semua masalah di daftar gabungan, lalu bandingkan urutannya dengan urutan dari yang menemukan saja.',
    'Hitung banyaknya temuan per heuristik dari evaluasi kelompokmu, lalu jelaskan pola yang terlihat.',
    'Jelaskan kenapa masalah yang cuma ditemukan satu evaluator bisa jadi masalah yang paling parah.',
    'Rancang rencana evaluasi untuk projek IMK-mu yang menggabungkan evaluasi heuristik, KLM, dan uji pengguna dengan SUS, lengkap dengan urutannya.'
  ]
});
