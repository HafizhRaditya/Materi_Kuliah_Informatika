/* ============================================================
   rpl.js — materi Rekayasa Perangkat Lunak (Semester 4)

   Disusun dari berkas projek kuliah sendiri (Kelompok 5):
     - Kelompok 5_SDLC Waterfall.pptx / .pdf
     - SRS_Kelompok 5_Waterfall.docx  + SRS Template.docx
     - RPL_Design_Kelompok5.pdf
     - RPL_Implementasi_Kelompok5_Waterfall.docx

   CATATAN PEMBAGIAN: mata kuliah ini bersinggungan dengan
   Analisis & Desain Sistem semester 3. Supaya tidak berulang:
     - ADS  membahas ANALISIS dan pemodelan UML
     - RPL  membahas PROSES pengembangan dan MUTU-nya
   Bagian SRS dibahas dari sudut berbeda: di ADS sebagai cara
   menulis kebutuhan, di sini sebagai artefak dalam alur SDLC.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep".
   ============================================================ */

TOPICS.push({
  id: 'rpl-sdlc',
  judul: 'SDLC & Model Proses',
  kategori: 'rpl',
  tag: ['SDLC', 'Waterfall', 'Agile', 'Prototype', 'Spiral', 'model proses'],
  ringkas: 'Urutan tahapan membangun perangkat lunak, dan kenapa tidak ada satu model yang cocok untuk semua.',

  fungsi: `**Memilih cara mengerjakan proyek supaya kesalahan ketahuan saat masih murah diperbaiki.**

Terpakai di:

- **Merencanakan tugas kelompok** — menentukan urutan dan tonggaknya
- **Bab metodologi** tugas akhir — kamu harus memilih dan membelanya
- **Kerja praktik** — memahami cara kerja tempatmu magang
- **Menaksir waktu** — dan menyadari bahwa pemeliharaan menghabiskan porsi terbesar

Yang paling berguna dipahami: **biaya memperbaiki kesalahan naik berlipat tiap tahap.**

Kesalahan kebutuhan yang ketahuan saat analisis cuma mengubah satu kalimat. Yang ketahuan setelah rilis bisa seratus kali lebih mahal — dan itu alasan seluruh pembahasan model proses ada.`,

  praktik: {
    tujuan: `Kamu bisa memilih model proses yang tepat untuk proyekmu dengan alasan, dan punya rencana yang membuat kesalahan ketahuan lebih awal.`,
    alat: [
      'Kertas atau papan tulis',
      'Trello, GitHub Projects, atau papan sederhana'
    ],
    langkah: [
      { judul: 'Nilai empat hal tentang proyekmu',
        isi: `Jawab jujur:

- apakah kebutuhannya sudah **pasti**?
- apakah klien bisa **terlibat terus-menerus**?
- seberapa **berisiko** kalau salah?
- apakah **dokumentasi formal** dituntut?

Keempat jawaban ini menentukan modelnya, dan jauh lebih berguna daripada memilih yang sedang populer.` },
      { judul: 'Pilih dan tulis alasannya',
        isi: `- kebutuhan pasti dan dokumentasi dituntut → **Waterfall**
- kebutuhan kabur dan klien terlibat → **Agile**
- kebutuhan kabur tetapi klien sulit ditemui → **Prototype**
- risiko tinggi → **Spiral**

Tulis alasanmu satu paragraf. Ini yang akan ditanyakan penguji, dan menyiapkannya sekarang jauh lebih baik daripada mengarang saat sidang.` },
      { judul: 'Buat sesuatu yang bisa DILIHAT paling awal',
        isi: `Apa pun modelmu, usahakan ada yang bisa ditunjukkan ke pengguna dalam dua minggu pertama — meski cuma gambar layar.

Orang sulit membayangkan sistem dari dokumen. Menunjukkan sesuatu lebih awal menangkap salah paham saat masih murah.` },
      { judul: 'Tetapkan tonggak dengan syarat selesai',
        isi: `Jangan menulis "selesai analisis" tanpa ukuran.

Tulis: *"selesai analisis berarti SRS sudah ditinjau dan disetujui pembimbing"*.

Tanpa syarat yang jelas, "selesai" cuma berarti waktunya habis.` },
      { judul: 'Catat berapa lama tiap tahap sebenarnya',
        isi: `Bandingkan perkiraanmu dengan kenyataannya di akhir tiap tahap.

Hampir semua orang meremehkan waktu — biasanya dua sampai tiga kali lipat. Mengetahui **pengalimu sendiri** membuat perkiraan berikutnya jauh lebih baik.` },
      { judul: 'Rencanakan pemeliharaan sejak awal',
        isi: `Pemeliharaan memakan 60 sampai 80 persen biaya sepanjang umur sistem.

Untuk tugas akhir, itu berarti: tulis dokumentasi cara memasang, cara menjalankan, dan cara memperbaiki masalah umum.

Sistem yang tidak bisa dijalankan orang lain sudah gagal, betapa pun bagus kodenya.` }
    ],
    cek: [
      'Kamu bisa menjelaskan pilihan modelmu dalam satu paragraf dengan alasan',
      'Setiap tonggak proyekmu punya syarat selesai yang bisa diperiksa',
      'Ada sesuatu yang bisa ditunjukkan ke pengguna dalam dua minggu pertama'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Rekayasa perangkat lunak** adalah penerapan pendekatan yang **sistematis, terukur, dan terdisiplin** pada pengembangan perangkat lunak.

Kata **rekayasa** dipakai dengan sengaja. Membuat program 200 baris sendirian tidak butuh rekayasa. Membuat sistem 200 ribu baris yang dikerjakan sepuluh orang selama dua tahun, dan harus dipelihara lima tahun sesudahnya — **itu** butuh rekayasa.

**SDLC** — *Software Development Life Cycle* — adalah kerangka tahapan yang dilalui perangkat lunak dari gagasan sampai pensiun.

**Tahapan umumnya**

- **Perencanaan** — kelayakan, jadwal, biaya
- **Analisis kebutuhan** — menghasilkan **SRS**
- **Perancangan** — arsitektur, basis data, antarmuka
- **Implementasi** — menulis kode
- **Pengujian** — memastikan sesuai kebutuhan
- **Penerapan** — dipasang dan dipakai
- **Pemeliharaan** — perbaikan dan penyesuaian

**Pemeliharaan memakan porsi terbesar.** Di banyak proyek nyata, ia menghabiskan **60 sampai 80 persen** dari seluruh biaya sepanjang umur sistem. Kode ditulis sekali, tetapi dibaca dan diubah bertahun-tahun.

Ini alasan mendasar kenapa **kode yang mudah dibaca lebih berharga daripada kode yang pintar**.

**Model Waterfall**

Model yang dipakai projek kelompokmu. Tahapannya dikerjakan **berurutan**, dan tahap berikutnya baru dimulai setelah tahap sebelumnya **selesai dan disetujui**.

**Kelebihannya:**

- Sederhana dan mudah dipahami
- Dokumentasinya lengkap di tiap tahap
- Mudah dikelola karena tonggaknya jelas
- Cocok untuk proyek yang **kebutuhannya sudah pasti**

**Kekurangannya:**

- **Kaku** — kembali ke tahap sebelumnya mahal
- Perangkat lunak baru terlihat **di akhir**
- Risiko tinggi kalau kebutuhannya ternyata salah
- Tidak cocok untuk proyek yang kebutuhannya berubah

Kekurangan kedua yang paling merugikan: klien baru melihat hasilnya **setelah semuanya selesai**. Kalau ternyata yang dibangun bukan yang dibayangkan, seluruh pekerjaan harus diulang.

**Model lain**

- **Prototype** — buat purwarupa cepat, tunjukkan ke pengguna, perbaiki. Bagus kalau kebutuhannya **belum jelas**.
- **Incremental** — bangun bertahap, tiap tahap menghasilkan bagian yang **berfungsi**.
- **Spiral** — berputar melalui perencanaan, analisis risiko, pengembangan, dan evaluasi. Menekankan **manajemen risiko**.
- **Agile** — iterasi pendek, kolaborasi erat dengan pengguna, menerima perubahan.

**Agile bukan "tanpa rencana"**

Salah paham yang lazim. Agile tetap punya perencanaan, dokumentasi, dan disiplin — hanya saja **iterasinya pendek** dan **perubahan diterima sebagai hal wajar**, bukan sebagai kegagalan perencanaan.

Manifesto Agile menyatakan lebih menghargai *"menanggapi perubahan daripada mengikuti rencana"* — tetapi kalimat lengkapnya menegaskan bahwa **yang di sebelah kanan tetap bernilai**.

**Memilih model**

Tidak ada model terbaik. Yang menentukan:

- **Kebutuhan sudah pasti?** → Waterfall masuk akal
- **Kebutuhan masih kabur?** → Prototype atau Agile
- **Risikonya tinggi?** → Spiral
- **Klien bisa terlibat terus-menerus?** → Agile
- **Ada tuntutan dokumentasi formal?** → Waterfall

Projek kelompokmu memilih Waterfall, dan itu masuk akal untuk projek kuliah: **ruang lingkupnya sudah ditetapkan di awal**, tenggatnya tetap, dan dokumentasi tiap tahap memang bagian dari penilaian.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa biaya perbaikan naik BERLIPAT tiap tahap\n#\n#   Analisis      1x   ubah satu kalimat di SRS\n#   Perancangan   5x   ubah diagram + SRS\n#   Implementasi 10x   ubah kode + diagram + SRS\n#   Pengujian    20x   + uji ulang seluruh yang terkait\n#   Produksi    100x   + migrasi data + latih ulang pengguna\n#\n# Inilah kelemahan terbesar Waterfall:\n# kesalahan kebutuhan baru KETAHUAN di tahap pengujian,\n# saat biayanya sudah 20 kali lipat.',
      penjelasan: `
Angka-angka ini menjelaskan **kenapa model proses itu penting sama sekali** — bukan sekadar formalitas dokumentasi.

Perhatikan pola kenaikannya: bukan bertambah sedikit demi sedikit, melainkan **berlipat**. Alasannya, tiap tahap **membangun di atas** tahap sebelumnya. Mengubah satu kebutuhan di tahap analisis cuma menyunting kalimat. Mengubahnya setelah kode ditulis berarti kode, diagram, dan dokumen **semuanya harus ikut diperbaiki**.

Sekarang lihat kelemahan Waterfall dalam kerangka ini.

Pada Waterfall, klien **baru melihat perangkat lunaknya di tahap pengujian**. Kalau ternyata yang dibangun bukan yang ia bayangkan — dan ini sering terjadi, karena orang sulit membayangkan sistem dari dokumen — maka kesalahan kebutuhan itu **baru ketahuan saat biayanya sudah 20 kali lipat**.

Model **Prototype** dan **Agile** menyerang persoalan ini secara langsung: tunjukkan sesuatu yang bisa dilihat **sedini mungkin**, supaya kesalahan kebutuhan tertangkap saat masih murah.

Perhatikan bahwa ini **bukan berarti Waterfall selalu salah**. Kalau kebutuhannya memang sudah pasti — misalnya sistem yang mengikuti peraturan pemerintah yang sudah tertulis rinci — maka risiko salah paham kebutuhan rendah, dan keteraturan Waterfall justru menguntungkan.

Yang salah adalah **memakai Waterfall untuk proyek yang kebutuhannya masih kabur**, lalu terkejut ketika hasilnya tidak sesuai harapan.

Ini juga menjelaskan kenapa **pemeliharaan** memakan 60 sampai 80 persen biaya. Setiap perubahan setelah sistem dipakai berada di kolom paling mahal, dan perubahan itu **tidak pernah berhenti** selama sistemnya masih hidup.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Membandingkan model proses
# ============================================

TAHAP_SDLC = [
    ("Perencanaan",       "kelayakan, jadwal, biaya"),
    ("Analisis kebutuhan","menghasilkan SRS"),
    ("Perancangan",       "arsitektur, basis data, antarmuka"),
    ("Implementasi",      "menulis kode"),
    ("Pengujian",         "memastikan sesuai kebutuhan"),
    ("Penerapan",         "dipasang dan dipakai"),
    ("Pemeliharaan",      "perbaikan & penyesuaian"),
]

print("--- tahapan SDLC ---")
for i, (nama, isi) in enumerate(TAHAP_SDLC, 1):
    print("  " + str(i) + ". " + nama.ljust(20) + isi)


# ============================================
# Porsi biaya sepanjang umur sistem
# ============================================
PORSI = [
    ("Analisis & perancangan", 15),
    ("Implementasi",           20),
    ("Pengujian",               5),
    ("Pemeliharaan",           60),
]

print("")
print("--- porsi biaya sepanjang umur sistem ---")
for nama, persen in PORSI:
    batang = "#" * (persen // 2)
    print("  " + nama.ljust(24) + str(persen).rjust(3) + "%  " + batang)

print("")
print("  Pemeliharaan memakan porsi TERBESAR. Kode ditulis")
print("  sekali, tapi dibaca dan diubah bertahun-tahun.")
print("  Itulah kenapa kode yang MUDAH DIBACA lebih berharga")
print("  daripada kode yang pintar.")


# ============================================
# Biaya perbaikan per tahap
# ============================================
BIAYA = [
    ("Analisis",     1,   "ubah satu kalimat di SRS"),
    ("Perancangan",  5,   "ubah diagram + SRS"),
    ("Implementasi", 10,  "ubah kode + diagram + SRS"),
    ("Pengujian",    20,  "+ uji ulang seluruh yang terkait"),
    ("Produksi",     100, "+ migrasi data + latih ulang pengguna"),
]

print("")
print("--- biaya memperbaiki SATU kesalahan ---")
for nama, kali, akibat in BIAYA:
    print("  " + nama.ljust(14) + (str(kali) + "x").rjust(5) +
          "   " + akibat)

print("")
print("  Pada Waterfall, klien baru melihat perangkat lunaknya")
print("  di tahap PENGUJIAN -- saat biaya perbaikan sudah 20x.")


# ============================================
# Memilih model proses
# ============================================
MODEL = [
    ("Waterfall",   "berurutan, tiap tahap tuntas dulu",
     "kebutuhan sudah PASTI, dokumentasi formal dituntut"),
    ("Prototype",   "purwarupa cepat lalu diperbaiki",
     "kebutuhan masih KABUR, pengguna sulit membayangkan"),
    ("Incremental", "dibangun bertahap, tiap tahap berfungsi",
     "sistem besar yang bisa dipecah jadi bagian berguna"),
    ("Spiral",      "berputar + analisis risiko tiap putaran",
     "proyek berisiko tinggi atau berbiaya sangat besar"),
    ("Agile",       "iterasi pendek, menerima perubahan",
     "kebutuhan berubah, klien bisa terlibat terus-menerus"),
]

print("")
print("--- memilih model proses ---")
for nama, cara, kapan in MODEL:
    print("  " + nama)
    print("      cara  : " + cara)
    print("      cocok : " + kapan)


# ============================================
# Menilai kecocokan model untuk sebuah proyek
# ============================================
def nilai_model(pasti, klien_terlibat, risiko_tinggi, butuh_dokumen):
    """Mengembalikan model yang paling masuk akal."""
    if risiko_tinggi:
        return "Spiral", "risiko tinggi menuntut evaluasi tiap putaran"
    if not pasti and klien_terlibat:
        return "Agile", "kebutuhan berubah & klien bisa dilibatkan"
    if not pasti and not klien_terlibat:
        return "Prototype", "kebutuhan kabur, perlu sesuatu yang dilihat"
    if pasti and butuh_dokumen:
        return "Waterfall", "kebutuhan pasti & dokumentasi dituntut"
    return "Incremental", "kebutuhan pasti, hasil bisa dipecah bertahap"


KASUS = [
    ("Projek kuliah RPL kelompokmu",     True,  False, False, True),
    ("Aplikasi startup yang masih dicari arahnya",
                                          False, True,  False, False),
    ("Sistem informasi rumah sakit baru", False, False, True,  True),
    ("Portal berita internal perusahaan", True,  True,  False, False),
]

print("")
print("--- menilai kecocokan model ---")
for nama, pasti, klien, risiko, dokumen in KASUS:
    model, alasan = nilai_model(pasti, klien, risiko, dokumen)
    print("  " + nama)
    print("      -> " + model + "   (" + alasan + ")")

print("")
print("  Kelompokmu memilih Waterfall, dan itu masuk akal:")
print("  ruang lingkup sudah ditetapkan di awal, tenggatnya")
print("  tetap, dan dokumentasi tiap tahap memang dinilai.")`
  },

  output: `--- tahapan SDLC ---
  1. Perencanaan         kelayakan, jadwal, biaya
  2. Analisis kebutuhan  menghasilkan SRS
  3. Perancangan         arsitektur, basis data, antarmuka
  4. Implementasi        menulis kode
  5. Pengujian           memastikan sesuai kebutuhan
  6. Penerapan           dipasang dan dipakai
  7. Pemeliharaan        perbaikan & penyesuaian

--- porsi biaya sepanjang umur sistem ---
  Analisis & perancangan   15%  #######
  Implementasi             20%  ##########
  Pengujian                 5%  ##
  Pemeliharaan             60%  ##############################

  Pemeliharaan memakan porsi TERBESAR. Kode ditulis
  sekali, tapi dibaca dan diubah bertahun-tahun.
  Itulah kenapa kode yang MUDAH DIBACA lebih berharga
  daripada kode yang pintar.

--- biaya memperbaiki SATU kesalahan ---
  Analisis         1x   ubah satu kalimat di SRS
  Perancangan      5x   ubah diagram + SRS
  Implementasi    10x   ubah kode + diagram + SRS
  Pengujian       20x   + uji ulang seluruh yang terkait
  Produksi       100x   + migrasi data + latih ulang pengguna

  Pada Waterfall, klien baru melihat perangkat lunaknya
  di tahap PENGUJIAN -- saat biaya perbaikan sudah 20x.

--- memilih model proses ---
  Waterfall
      cara  : berurutan, tiap tahap tuntas dulu
      cocok : kebutuhan sudah PASTI, dokumentasi formal dituntut
  Prototype
      cara  : purwarupa cepat lalu diperbaiki
      cocok : kebutuhan masih KABUR, pengguna sulit membayangkan
  Incremental
      cara  : dibangun bertahap, tiap tahap berfungsi
      cocok : sistem besar yang bisa dipecah jadi bagian berguna
  Spiral
      cara  : berputar + analisis risiko tiap putaran
      cocok : proyek berisiko tinggi atau berbiaya sangat besar
  Agile
      cara  : iterasi pendek, menerima perubahan
      cocok : kebutuhan berubah, klien bisa terlibat terus-menerus

--- menilai kecocokan model ---
  Projek kuliah RPL kelompokmu
      -> Waterfall   (kebutuhan pasti & dokumentasi dituntut)
  Aplikasi startup yang masih dicari arahnya
      -> Agile   (kebutuhan berubah & klien bisa dilibatkan)
  Sistem informasi rumah sakit baru
      -> Spiral   (risiko tinggi menuntut evaluasi tiap putaran)
  Portal berita internal perusahaan
      -> Incremental   (kebutuhan pasti, hasil bisa dipecah bertahap)

  Kelompokmu memilih Waterfall, dan itu masuk akal:
  ruang lingkup sudah ditetapkan di awal, tenggatnya
  tetap, dan dokumentasi tiap tahap memang dinilai.`,

  kesalahanUmum: [
    {
      salah: 'Menganggap Waterfall selalu buruk dan Agile selalu benar.',
      kenapa: 'Keduanya cocok untuk keadaan berbeda. Waterfall masuk akal ketika kebutuhannya sudah pasti dan dokumentasi formal dituntut, misalnya sistem yang mengikuti peraturan yang sudah tertulis rinci. Menolaknya secara mutlak membuat orang memaksakan Agile pada proyek yang justru menuntut keteraturan.',
      benar: 'Pilih model berdasarkan kepastian kebutuhan, keterlibatan klien, tingkat risiko, dan tuntutan dokumentasi.'
    },
    {
      salah: 'Mengira Agile berarti bekerja tanpa rencana dan tanpa dokumentasi.',
      kenapa: 'Agile tetap punya perencanaan dan dokumentasi, hanya saja iterasinya pendek dan perubahan diterima sebagai hal wajar. Manifesto Agile sendiri menegaskan bahwa hal yang kurang diutamakan tetap bernilai. Salah paham ini menghasilkan proyek kacau yang mengaku Agile padahal cuma tidak terencana.',
      benar: 'Pahami Agile sebagai perencanaan berjangka pendek yang sering ditinjau, bukan ketiadaan perencanaan.'
    },
    {
      salah: 'Meremehkan porsi pemeliharaan saat menghitung biaya proyek.',
      kenapa: 'Pemeliharaan memakan enam puluh sampai delapan puluh persen biaya sepanjang umur sistem, tetapi sering tidak dianggarkan sama sekali karena dianggap selesai setelah penyerahan. Akibatnya sistem terbengkalai ketika dana habis, padahal ia baru mulai dipakai.',
      benar: 'Anggarkan pemeliharaan sejak awal, dan tulis kode yang mudah dibaca karena ia akan dibaca jauh lebih sering daripada ditulis.'
    },
    {
      salah: 'Memakai Waterfall untuk proyek yang kebutuhannya masih kabur.',
      kenapa: 'Klien baru melihat perangkat lunaknya di tahap pengujian, saat biaya perbaikan sudah dua puluh kali lipat. Kalau ternyata yang dibangun bukan yang dibayangkan, seluruh pekerjaan harus diulang dari tahap analisis.',
      benar: 'Pakai Prototype atau Agile ketika kebutuhannya belum jelas, supaya kesalahan kebutuhan tertangkap saat masih murah diperbaiki.'
    }
  ],

  analogi: `Bayangkan membangun rumah.

**Waterfall** adalah cara baku: gambar denah sampai tuntas, setujui, lalu bangun pondasi, lalu tembok, lalu atap. **Tidak ada yang dimulai sebelum tahap sebelumnya selesai dan disetujui.**

Cara ini bekerja sangat baik — **kalau kamu benar-benar tahu rumah seperti apa yang kamu mau**.

Masalahnya, banyak orang **tidak bisa membayangkan rumah dari denah**. Mereka baru menyadari *"oh, dapurnya terlalu sempit"* setelah temboknya berdiri.

Dan pada titik itu, memindahkan tembok sudah **puluhan kali lebih mahal** daripada memindahkan garis di kertas.

**Prototype** adalah membuat **maket kardus** lebih dulu. Jelek, tidak bisa ditinggali, dibuat dalam sehari. Tetapi klien bisa **melihat dan berkata** *"dapurnya terlalu sempit"* — saat memperbaikinya masih gratis.

**Incremental** adalah membangun **satu kamar dulu sampai bisa ditinggali**, lalu menambah kamar berikutnya. Keluarganya bisa pindah masuk sebelum rumahnya selesai penuh.

**Spiral** adalah cara membangun di daerah rawan gempa: sebelum tiap tahap, **berhenti dan tanyakan apa yang bisa runtuh**, lalu perkuat.

**Agile** adalah membangun sambil terus berbicara dengan pemiliknya, dan **menerima bahwa dia akan berubah pikiran** — karena memang begitulah manusia.

Sekarang, soal **pemeliharaan**. Bayangkan seluruh biaya membangun rumah, lalu bandingkan dengan biaya **menempatinya selama tiga puluh tahun**: cat ulang, genteng bocor, pipa pecah, listrik diperbarui.

Biaya membangun itu **sebagian kecil** dari total. Dan itulah kenapa arsitek yang baik memikirkan **bagaimana rumah ini nanti diperbaiki**, bukan cuma bagaimana ia berdiri.

Di perangkat lunak, itu berarti: **tulis kode yang mudah dibaca orang berikutnya** — dan orang berikutnya itu sering kali dirimu sendiri, enam bulan lagi, yang sudah lupa segalanya.`,

  latihan: [
    'Sebutkan tujuh tahapan SDLC beserta keluaran utama tiap tahap.',
    'Jelaskan kelebihan dan kekurangan model Waterfall, lalu jelaskan kenapa projek kuliahmu memilihnya.',
    'Jelaskan kenapa biaya memperbaiki kesalahan naik berlipat tiap tahap, dan kaitkan dengan kelemahan terbesar Waterfall.',
    'Untuk tiap keadaan berikut, tentukan model proses yang paling cocok beserta alasannya: aplikasi yang kebutuhannya masih dicari, sistem perbankan berisiko tinggi, portal internal yang bisa dibangun bertahap.',
    'Jelaskan kenapa Agile bukan berarti tanpa rencana, dan sebutkan apa yang sebenarnya dibedakan Agile dari Waterfall.',
    'Jelaskan kenapa pemeliharaan memakan porsi biaya terbesar, dan apa akibatnya bagi cara kamu menulis kode hari ini.'
  ]
});

TOPICS.push({
  id: 'rpl-perancangan',
  judul: 'Perancangan Perangkat Lunak',
  kategori: 'rpl',
  tag: ['perancangan', 'modularitas', 'coupling', 'cohesion', 'arsitektur', 'SOLID'],
  ringkas: 'Memecah sistem menjadi bagian — dan dua ukuran yang menentukan apakah pemecahannya baik.',

  fungsi: `**Memecah sistem menjadi bagian yang mudah diubah tanpa merusak yang lain.**

Terpakai di:

- **Menyusun struktur proyek** — folder, modul, kelas
- **Bab perancangan** tugas akhir
- **Menelaah kode** — mengenali rancangan yang akan menyulitkan
- **Memperbaiki kode lama** yang sudah kusut

Ukuran mutu yang paling jujur, dan bisa langsung kamu pakai: **berapa berkas yang harus disentuh untuk satu perubahan?**

Kalau menambah satu jenis pembayaran menuntut lima belas berkas diubah, rancangannya bermasalah — berapa pun rapinya diagram di laporanmu.`,

  praktik: {
    tujuan: `Kamu bisa menilai mutu rancangan dengan angka, dan memperbaiki bagian yang paling kusut di proyekmu sendiri.`,
    alat: [
      'Proyekmu sendiri',
      'Git untuk melihat riwayat perubahan'
    ],
    langkah: [
      { judul: 'Ukur coupling dari riwayat Git',
        isi: `Jalankan \`git log --name-only --pretty=format:\` lalu hitung berkas mana yang **sering berubah bersamaan**.

Berkas yang hampir selalu berubah berbarengan padahal ada di modul berbeda menandakan coupling tinggi — mereka sebenarnya satu urusan yang terpecah.` },
      { judul: 'Hitung alasan berubah tiap kelas',
        isi: `Untuk tiap kelas, daftar **alasan berbeda** yang bisa membuatnya harus diubah.

Lebih dari satu alasan berarti cohesion rendah. Kelas bernama \`Utils\` atau \`Helper\` hampir selalu punya empat atau lima.` },
      { judul: 'Uji dengan tiga perubahan bayangan',
        isi: `Bayangkan tiga permintaan yang mungkin datang: ganti basis data, tambah metode pembayaran, ubah format laporan.

Untuk masing-masing, hitung berapa berkas yang harus disentuh.

Angka besar menunjukkan tempat yang perlu diperbaiki, dan kamu menemukannya **tanpa** benar-benar mengerjakan perubahannya.` },
      { judul: 'Perbaiki satu yang terburuk',
        isi: `Ambil kelas dengan alasan berubah terbanyak, lalu pecah menjadi beberapa kelas yang masing-masing bisa diberi nama dengan tepat.

Kalau kamu tidak bisa menamai hasil pecahannya, pecahannya belum benar.` },
      { judul: 'Bergantung pada abstraksi',
        isi: `Ganti ketergantungan langsung pada kelas nyata dengan ketergantungan pada antarmuka.

Alih-alih kelasmu membuat sendiri koneksi MySQL, terima objek penyimpan lewat konstruktor.

Sekarang mengganti basis data tidak menyentuh kelas itu sama sekali — dan pengujiannya bisa memakai penyimpan tiruan.` },
      { judul: 'Ukur ulang setelah perbaikan',
        isi: `Jalankan lagi tiga perubahan bayangan tadi dan hitung berkasnya.

Angkanya harus turun. Kalau tidak, perbaikanmu belum menyentuh masalahnya.

Mencatat angka sebelum dan sesudah juga bagus untuk laporan — ia menunjukkan perbaikan yang terukur, bukan klaim.` }
    ],
    cek: [
      'Tidak ada kelas di proyekmu dengan lebih dari dua alasan untuk berubah',
      'Jumlah berkas yang tersentuh untuk tiga perubahan bayangan turun setelah perbaikan',
      'Kelas utamamu bisa diuji dengan penyimpan tiruan tanpa basis data sungguhan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dipisah begitu',

  konsep: `
Setelah SRS disetujui, tahap berikutnya adalah **perancangan**: menerjemahkan *"sistem harus bisa apa"* menjadi *"sistem disusun bagaimana"*.

**Dua tingkat perancangan**

- **Perancangan arsitektur** (*high-level*) — sistem dipecah menjadi modul besar, dan ditentukan bagaimana mereka berhubungan.
- **Perancangan rinci** (*low-level*) — isi tiap modul: kelas, fungsi, struktur data, algoritma.

**Modularitas**

Gagasan pokoknya: **pecah sistem menjadi bagian yang bisa dipahami dan diubah sendiri-sendiri**.

Alasannya soal batas kemampuan manusia. Tidak ada orang yang sanggup memegang 50 ribu baris di kepalanya. Tetapi siapa pun bisa memahami satu modul 300 baris — **asalkan ia tidak perlu memahami 49.700 baris lainnya untuk itu.**

Syarat terakhir itulah yang menentukan apakah pemecahannya berhasil, dan ia diukur dengan dua hal.

**Coupling — keterikatan antar-modul**

Seberapa **bergantung** satu modul pada modul lain. **Makin rendah makin baik.**

Coupling tinggi berarti mengubah satu modul **memaksa** modul lain ikut diubah. Pada sistem dengan coupling tinggi, perbaikan kecil merambat ke mana-mana, dan tidak ada yang berani menyentuh apa pun.

**Cohesion — keterpaduan di dalam satu modul**

Seberapa **berkaitan** isi sebuah modul satu sama lain. **Makin tinggi makin baik.**

Cohesion rendah berarti satu modul mengerjakan hal-hal yang tidak berhubungan — misalnya kelas bernama \`Utils\` yang berisi perhitungan pajak, pengiriman email, dan pengubah format tanggal sekaligus.

**Aturan yang layak dihafal: low coupling, high cohesion.**

Keduanya sering **bergerak bersama**. Modul yang isinya berkaitan erat biasanya juga sedikit bergantung pada modul lain, karena ia punya satu tanggung jawab yang jelas.

**Cara menurunkan coupling**

- Berkomunikasi lewat **antarmuka yang jelas**, bukan menyentuh isi modul lain langsung
- Hindari **variabel global** yang bisa diubah siapa saja
- Kirim **data yang diperlukan saja**, bukan seluruh objek

**Prinsip SOLID**

Lima prinsip perancangan berorientasi objek yang melanjutkan apa yang kamu pelajari di PBO:

- **S** — *Single Responsibility*: satu kelas, satu alasan untuk berubah
- **O** — *Open-Closed*: terbuka untuk perluasan, tertutup untuk perubahan
- **L** — *Liskov Substitution*: subclass harus bisa menggantikan induknya tanpa merusak apa pun
- **I** — *Interface Segregation*: banyak antarmuka kecil lebih baik daripada satu yang besar
- **D** — *Dependency Inversion*: bergantunglah pada abstraksi, bukan pada wujud nyatanya

**Single Responsibility** adalah cara lain menyebut **high cohesion**, dan **Dependency Inversion** adalah cara menurunkan **coupling**. Kelima prinsip itu pada dasarnya penjabaran dari satu aturan yang sama.

**Perancangan yang baik terlihat dari perubahan**

Ukuran paling jujur bukan seberapa rapi diagramnya, melainkan: **ketika ada permintaan perubahan, berapa banyak berkas yang harus disentuh?**

Kalau menambah satu jenis pembayaran menuntut 15 berkas diubah, rancangannya bermasalah — berapa pun rapinya dokumentasi.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# COHESION RENDAH: satu kelas, banyak urusan tak berkaitan\nclass Utils:\n    def hitung_pajak(self, x): ...\n    def kirim_email(self, ke): ...\n    def format_tanggal(self, t): ...\n    def koneksi_database(self): ...\n# Berubah karena aturan pajak? Ubah kelas ini.\n# Ganti penyedia email? Ubah kelas ini juga.\n# -> BANYAK alasan untuk berubah = cohesion rendah\n\n# COHESION TINGGI: satu kelas, satu tanggung jawab\nclass KalkulatorPajak:\n    def hitung(self, x): ...\n    def hitung_dengan_diskon(self, x, d): ...\n# Berubah HANYA kalau aturan pajak berubah.',
      penjelasan: `
Kelas bernama **\`Utils\`** atau **\`Helper\`** hampir selalu menandakan cohesion rendah, dan namanya sendiri sudah menjadi petunjuk.

Alasannya sederhana: **kalau kamu bisa menamai sebuah kelas dengan tepat, isinya berkaitan.** Kalau nama terbaik yang bisa kamu pikirkan adalah "utilitas", itu berarti isinya **tidak punya kesamaan** selain sama-sama tidak tahu harus ditaruh di mana.

Uji praktisnya adalah **Single Responsibility Principle**, tetapi dengan rumusan yang lebih tajam daripada *"satu kelas satu tugas"*:

**Berapa banyak alasan berbeda yang bisa membuat kelas ini harus diubah?**

Untuk \`Utils\` di atas, jawabannya **empat**: perubahan aturan pajak, pergantian penyedia email, perubahan format tanggal, dan pergantian basis data. Empat alasan yang sama sekali tidak berhubungan.

Akibat praktisnya nyata dan berlapis:

- **Bentrok saat kerja tim.** Empat orang menyunting berkas yang sama untuk empat keperluan berbeda.
- **Pengujian jadi berat.** Menguji perhitungan pajak menuntut kelas itu dimuat utuh, termasuk sambungan basis datanya.
- **Perubahan jadi berisiko.** Menyentuh berkas itu untuk urusan email bisa tanpa sengaja merusak perhitungan pajak.

Sekarang perhatikan hubungannya dengan **coupling**. Kelas \`Utils\` yang mengurus segalanya akan **dipanggil dari mana-mana** — dan itu otomatis menaikkan coupling seluruh sistem.

Begitu ia diubah, **semua yang memanggilnya berisiko terpengaruh**. Satu kelas berkohesi rendah bisa menaikkan keterikatan seluruh sistem sekaligus.

Itulah kenapa kedua ukuran itu **bergerak bersama**: memperbaiki cohesion hampir selalu ikut menurunkan coupling.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Coupling & Cohesion: mengukur mutu rancangan
# ============================================

# --------------------------------------------
# RANCANGAN BURUK: coupling tinggi
# --------------------------------------------
class PesananBuruk:
    def proses(self, data):
        # Menyentuh isi modul lain LANGSUNG
        db = KoneksiDatabase()
        db.kueri("INSERT INTO pesanan ...")      # tahu SQL-nya

        smtp = ServerEmail("smtp.gmail.com", 587)
        smtp.kirim(data["email"], "Pesanan diterima")   # tahu SMTP-nya

        pdf = PembuatPDF()
        pdf.buat_invoice(data)                   # tahu cara buat PDF

        # Kelas ini bergantung pada TIGA hal sekaligus.
        # Ganti basis data? Ubah kelas ini.
        # Ganti penyedia email? Ubah kelas ini.
        # Ganti format invoice? Ubah kelas ini.


# --------------------------------------------
# RANCANGAN BAIK: bergantung pada ABSTRAKSI
# --------------------------------------------
class PesananBaik:
    def __init__(self, penyimpan, pemberi_tahu, pembuat_dokumen):
        # Tidak tahu WUJUD NYATA-nya apa, cuma tahu KEMAMPUANNYA
        self.penyimpan = penyimpan
        self.pemberi_tahu = pemberi_tahu
        self.pembuat_dokumen = pembuat_dokumen

    def proses(self, data):
        self.penyimpan.simpan(data)
        self.pemberi_tahu.beri_tahu(data["email"], "Pesanan diterima")
        self.pembuat_dokumen.buat(data)
        # Ganti basis data -> cukup kirim penyimpan yang berbeda.
        # Kelas ini TIDAK DISENTUH sama sekali.


# ============================================
# Mengukur: berapa berkas disentuh per perubahan?
# ============================================
PERUBAHAN = [
    ("Ganti MySQL ke PostgreSQL",       6, 1),
    ("Ganti penyedia email",            4, 1),
    ("Tambah metode pembayaran baru",  15, 2),
    ("Ubah format invoice",             3, 1),
    ("Tambah kolom di tabel pesanan",   9, 2),
]

print("--- berapa berkas disentuh untuk satu perubahan? ---")
print("  " + "perubahan".ljust(32) + "buruk".rjust(7) + "baik".rjust(7))
total_buruk = total_baik = 0
for nama, buruk, baik in PERUBAHAN:
    total_buruk += buruk
    total_baik += baik
    print("  " + nama.ljust(32) + str(buruk).rjust(7) + str(baik).rjust(7))
print("  " + "TOTAL".ljust(32) + str(total_buruk).rjust(7) +
      str(total_baik).rjust(7))

print("")
print("  Inilah ukuran mutu rancangan yang paling jujur:")
print("  bukan serapi apa diagramnya, melainkan BERAPA BANYAK")
print("  berkas yang harus disentuh saat ada perubahan.")


# ============================================
# Menghitung alasan berubah (Single Responsibility)
# ============================================
KELAS = [
    ("Utils", ["aturan pajak berubah",
               "penyedia email diganti",
               "format tanggal berubah",
               "basis data diganti"]),
    ("KalkulatorPajak", ["aturan pajak berubah"]),
    ("PengirimEmail", ["penyedia email diganti"]),
    ("LaporanPenjualan", ["format laporan berubah",
                          "sumber data berubah"]),
]

print("")
print("--- berapa ALASAN sebuah kelas harus berubah? ---")
for nama, alasan in KELAS:
    tanda = "  <- cohesion RENDAH" if len(alasan) > 1 else ""
    print("  " + nama.ljust(20) + str(len(alasan)) + " alasan" + tanda)
    for a in alasan:
        print("      - " + a)

print("")
print("  Satu alasan = cohesion tinggi = Single Responsibility.")
print("  Kelas bernama 'Utils' atau 'Helper' hampir selalu")
print("  menandakan cohesion rendah -- nama itu sendiri berarti")
print("  isinya tidak punya kesamaan selain sama-sama tidak tahu")
print("  harus ditaruh di mana.")


# ============================================
# Lima prinsip SOLID
# ============================================
SOLID = [
    ("S", "Single Responsibility",
     "satu kelas, satu alasan untuk berubah",
     "= cohesion tinggi"),
    ("O", "Open-Closed",
     "terbuka untuk perluasan, tertutup untuk perubahan",
     "tambah fitur tanpa menyentuh kode lama"),
    ("L", "Liskov Substitution",
     "subclass harus bisa menggantikan induknya",
     "tanpa merusak apa pun yang memakainya"),
    ("I", "Interface Segregation",
     "banyak antarmuka kecil > satu yang besar",
     "jangan paksa kelas menerapkan yang tak dipakainya"),
    ("D", "Dependency Inversion",
     "bergantung pada abstraksi, bukan wujud nyata",
     "= coupling rendah"),
]

print("")
print("--- prinsip SOLID ---")
for huruf, nama, arti, catatan in SOLID:
    print("  " + huruf + " - " + nama)
    print("      " + arti)
    print("      " + catatan)

print("")
print("  Perhatikan S dan D: keduanya sebenarnya cara lain")
print("  menyebut 'high cohesion' dan 'low coupling'.")
print("  Kelima prinsip itu penjabaran dari satu aturan yang sama.")`
  },

  output: `--- berapa berkas disentuh untuk satu perubahan? ---
  perubahan                         buruk   baik
  Ganti MySQL ke PostgreSQL             6      1
  Ganti penyedia email                  4      1
  Tambah metode pembayaran baru        15      2
  Ubah format invoice                   3      1
  Tambah kolom di tabel pesanan         9      2
  TOTAL                                37      7

  Inilah ukuran mutu rancangan yang paling jujur:
  bukan serapi apa diagramnya, melainkan BERAPA BANYAK
  berkas yang harus disentuh saat ada perubahan.

--- berapa ALASAN sebuah kelas harus berubah? ---
  Utils               4 alasan  <- cohesion RENDAH
      - aturan pajak berubah
      - penyedia email diganti
      - format tanggal berubah
      - basis data diganti
  KalkulatorPajak     1 alasan
      - aturan pajak berubah
  PengirimEmail       1 alasan
      - penyedia email diganti
  LaporanPenjualan    2 alasan  <- cohesion RENDAH
      - format laporan berubah
      - sumber data berubah

  Satu alasan = cohesion tinggi = Single Responsibility.
  Kelas bernama 'Utils' atau 'Helper' hampir selalu
  menandakan cohesion rendah -- nama itu sendiri berarti
  isinya tidak punya kesamaan selain sama-sama tidak tahu
  harus ditaruh di mana.

--- prinsip SOLID ---
  S - Single Responsibility
      satu kelas, satu alasan untuk berubah
      = cohesion tinggi
  O - Open-Closed
      terbuka untuk perluasan, tertutup untuk perubahan
      tambah fitur tanpa menyentuh kode lama
  L - Liskov Substitution
      subclass harus bisa menggantikan induknya
      tanpa merusak apa pun yang memakainya
  I - Interface Segregation
      banyak antarmuka kecil > satu yang besar
      jangan paksa kelas menerapkan yang tak dipakainya
  D - Dependency Inversion
      bergantung pada abstraksi, bukan wujud nyata
      = coupling rendah

  Perhatikan S dan D: keduanya sebenarnya cara lain
  menyebut 'high cohesion' dan 'low coupling'.
  Kelima prinsip itu penjabaran dari satu aturan yang sama.`,

  kesalahanUmum: [
    {
      salah: 'Membuat kelas bernama Utils atau Helper sebagai tempat menampung fungsi yang tidak jelas tempatnya.',
      kenapa: 'Isinya jadi tidak punya kesamaan apa pun selain sama-sama tidak tahu harus ditaruh di mana, sehingga kelas itu punya banyak alasan untuk berubah. Ia juga dipanggil dari mana-mana, sehingga menaikkan keterikatan seluruh sistem sekaligus.',
      benar: 'Kalau kamu tidak bisa menamai kelas dengan tepat, itu tanda isinya belum berkaitan. Pecah menjadi kelas-kelas yang namanya bisa ditentukan dengan jelas.'
    },
    {
      salah: 'Menilai mutu rancangan dari kerapian diagramnya.',
      kenapa: 'Diagram yang rapi tidak menjamin sistemnya mudah diubah. Ukuran yang sesungguhnya adalah berapa banyak berkas yang harus disentuh ketika ada permintaan perubahan, dan itu baru terlihat saat perubahan pertama datang.',
      benar: 'Uji rancangan dengan membayangkan tiga perubahan yang mungkin diminta, lalu hitung berapa berkas yang terpengaruh masing-masing.'
    },
    {
      salah: 'Membuat modul saling memanggil isi satu sama lain secara langsung.',
      kenapa: 'Coupling menjadi tinggi, sehingga mengubah satu modul memaksa modul lain ikut diubah. Pada sistem seperti ini, perbaikan kecil merambat ke mana-mana dan lama-lama tidak ada yang berani menyentuh apa pun.',
      benar: 'Berkomunikasi lewat antarmuka yang jelas dan kirim hanya data yang diperlukan. Bergantunglah pada abstraksi, bukan pada wujud nyatanya.'
    },
    {
      salah: 'Memecah sistem menjadi sangat banyak modul kecil dengan anggapan makin banyak makin modular.',
      kenapa: 'Pemecahan yang berlebihan justru menaikkan coupling, karena tiap modul kecil harus memanggil banyak modul lain untuk menyelesaikan satu pekerjaan. Melacak satu alur jadi menuntut membuka belasan berkas, dan itu lebih sulit daripada satu modul yang wajar.',
      benar: 'Pecah berdasarkan tanggung jawab, bukan berdasarkan jumlah baris. Modul yang baik punya satu alasan untuk berubah, bukan sekadar berukuran kecil.'
    }
  ],

  analogi: `Bayangkan menata perkakas di bengkel.

**Cohesion rendah** adalah **satu kotak besar bertuliskan "peralatan"** yang berisi obeng, kunci pas, plester luka, kabel listrik, dan bumbu dapur.

Kotak itu **tidak salah** — semuanya memang barang. Tetapi setiap kali kamu membukanya, kamu harus menyisir segalanya. Dan setiap kali ada yang menambah barang baru, ia dilempar ke situ karena tidak ada tempat lain.

Nama "peralatan" itu sendiri sudah menjadi petunjuk: **kalau kamu bisa menamai kotak dengan tepat, isinya berkaitan.** Kalau nama terbaik yang terpikir adalah "peralatan", itu berarti isinya tidak punya kesamaan.

**Cohesion tinggi** adalah **kotak obeng** yang isinya obeng saja. Kamu tahu persis kapan membukanya dan kapan tidak.

**Coupling tinggi** adalah bengkel di mana **memindahkan meja kerja mengharuskan membongkar rak, memindahkan kompresor, dan menyambung ulang listrik seluruh ruangan**.

Semuanya terhubung terlalu erat. Perubahan kecil merambat, dan lama-lama **tidak ada yang berani memindahkan apa pun**.

**Coupling rendah** adalah bengkel di mana kamu bisa mengganti kompresor tanpa menyentuh yang lain — karena sambungannya lewat **soket baku**, bukan dilas langsung.

Dan inilah **ukuran mutu yang paling jujur**, yang tidak bisa dibohongi oleh dokumentasi serapi apa pun:

**Ketika bosmu bilang "tolong ganti pemasok listriknya", berapa banyak yang harus kamu bongkar?**

Kalau jawabannya *"cukup cabut satu soket"*, rancangannya bagus. Kalau jawabannya *"seluruh bengkel harus dibongkar"*, tidak ada gambar teknik seindah apa pun yang bisa menyelamatkannya.`,

  latihan: [
    'Jelaskan perbedaan coupling dan cohesion, lalu jelaskan kenapa keduanya sering bergerak bersama.',
    'Ambil sebuah kelas Utils yang berisi empat fungsi tak berkaitan, lalu pecah menjadi kelas-kelas berkohesi tinggi. Beri nama yang tepat untuk masing-masing.',
    'Hitung berapa alasan berbeda yang bisa membuat kelas berikut harus diubah: sebuah kelas Laporan yang mengambil data dari basis data, menghitung ringkasan, dan menghasilkan PDF.',
    'Tulis ulang kelas PesananBuruk di materi ini supaya bergantung pada abstraksi. Jelaskan apa yang jadi lebih mudah sesudahnya.',
    'Sebutkan lima prinsip SOLID beserta artinya, lalu tunjukkan prinsip mana yang setara dengan high cohesion dan mana yang setara dengan low coupling.',
    'Jelaskan kenapa memecah sistem menjadi terlalu banyak modul kecil justru bisa menaikkan coupling.'
  ]
});

TOPICS.push({
  id: 'rpl-pengujian',
  judul: 'Pengujian Perangkat Lunak',
  kategori: 'rpl',
  tag: ['testing', 'black box', 'white box', 'unit test', 'boundary value', 'regresi'],
  ringkas: 'Membuktikan ada cacat — bukan membuktikan tidak ada cacat.',

  fungsi: `**Menemukan cacat sebelum penggunamu yang menemukannya.**

Terpakai di:

- **Setiap tugas** yang kodenya lebih dari beberapa berkas
- **Bab pengujian** tugas akhir — hampir selalu diminta
- **Kerja praktik** — pengujian adalah pekerjaan nyata yang banyak dicari
- **Memastikan perbaikan tidak merusak yang lain**

Kalimat yang merangkum seluruh topik ini, dari Dijkstra: **pengujian menunjukkan adanya cacat, bukan ketiadaannya.**

Karena itu tujuanmu saat menguji bukan membuktikan programmu jalan — itu bias yang membuat orang hanya menguji jalur yang sudah pasti benar.

Tujuanmu adalah **menemukan cacat**. Uji yang tidak menemukan apa pun bisa berarti kodenya bagus, atau ujinya yang lemah.`,

  praktik: {
    tujuan: `Kamu punya kumpulan kasus uji yang benar-benar bisa gagal, mencakup batas, dan bisa dijalankan ulang.`,
    alat: [
      'Python dengan pytest, atau JUnit untuk Java',
      'Proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Tulis hasil yang diharapkan dari SPESIFIKASI',
        isi: `Isi kolom hasil yang diharapkan **sebelum** menjalankan programnya, dan ambil dari spesifikasi — bukan dari keluaran program.

Kalau kamu menyalin keluaran program, ujimu **tidak pernah bisa gagal**. Ia cuma mencatat apa yang program lakukan lalu menyebutnya benar.

Dan lebih buruk: ia mengunci bug sebagai perilaku resmi.` },
      { judul: 'Buktikan tiap uji BISA gagal',
        isi: `Rusakkan kodemu dengan sengaja — ubah \`>=\` jadi \`>\`, atau balik tanda.

Jalankan ujinya. Kalau tetap lulus, **ujinya yang tidak berguna**, bukan kodenya yang benar.

Kembalikan kodenya setelah selesai. Lakukan ini sekali untuk tiap uji penting.` },
      { judul: 'Uji di batasnya',
        isi: `Untuk syarat "nilai minimal 60", uji dengan **59, 60, 61**.

Di situlah kesalahan \`>\` versus \`>=\` bersembunyi, dan itu satu-satunya tempat ia terlihat.

Uji juga: nilai kosong, nol, negatif, dan sangat besar.` },
      { judul: 'Pakai equivalence partitioning untuk memilih',
        isi: `Menguji semua kemungkinan mustahil. Bagi masukan menjadi kelompok yang **diperlakukan sama**, lalu uji satu wakil tiap kelompok.

Untuk nilai 0 sampai 100: kelompoknya di bawah nol, 0 sampai 59, 60 sampai 100, dan di atas 100.

Empat wakil ditambah nilai di tiap batas sudah menutupi hampir semuanya.` },
      { judul: 'Otomatiskan dengan pytest',
        isi: `- \`pip install pytest\`
- buat berkas \`test_nama.py\` berisi fungsi berawalan \`test_\`
- jalankan \`pytest -v\`

Sekarang seluruh ujimu berjalan dalam hitungan detik, dan bisa diulang setiap kali kode berubah.

Tanpa otomatisasi, regression testing praktis mustahil.` },
      { judul: 'Tambahkan uji setiap kali menemukan bug',
        isi: `Setiap bug yang kamu perbaiki harus punya satu uji yang **akan gagal kalau ia kembali**.

Ini yang membedakan memperbaiki dari menambal: bug yang sudah punya uji tidak bisa kembali diam-diam.

Kumpulan ujimu tumbuh mengikuti bug yang benar-benar pernah terjadi — dan itu jauh lebih berguna daripada uji yang dikarang.` },
      { judul: 'Ukur cakupannya, tetapi jangan menargetkannya',
        isi: `- \`pip install pytest-cov\` lalu \`pytest --cov\`

Lihat baris mana yang **belum pernah dijalankan** — biasanya penanganan galat, dan justru di situlah bug bersembunyi.

Tetapi jangan menjadikan persentasenya target. Cakupan menghitung baris yang **dijalankan**, bukan yang **diperiksa**.` }
    ],
    cek: [
      'Setiap uji pentingmu terbukti gagal saat kodenya sengaja dirusak',
      'Uji batasmu mencakup nilai tepat di batas dan satu di kedua sisinya',
      'Setiap bug yang pernah kamu perbaiki punya uji yang menjaganya'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa diuji begitu',

  konsep: `
Ada satu kalimat dari **Dijkstra** yang merangkum seluruh topik ini:

**"Pengujian dapat menunjukkan adanya cacat, tetapi tidak pernah menunjukkan ketiadaan cacat."**

Artinya: kamu **tidak bisa membuktikan** program benar dengan mengujinya. Yang bisa kamu lakukan adalah **mencari cacat sampai keyakinanmu cukup**.

Ini mengubah cara berpikir. Tujuan pengujian **bukan** membuktikan programmu jalan — itu bias yang membuat orang menguji hanya jalur yang sudah pasti benar. Tujuannya **menemukan cacat**, dan pengujian yang tidak menemukan apa pun bisa berarti dua hal: programnya bagus, atau **pengujiannya yang lemah**.

**Tingkatan pengujian**

- **Unit testing** — menguji satu fungsi atau kelas secara terpisah
- **Integration testing** — menguji apakah modul-modul bekerja sama dengan benar
- **System testing** — menguji sistem utuh terhadap kebutuhannya
- **Acceptance testing** — pengguna menguji apakah sistem memenuhi kebutuhan **mereka**

**Black box vs White box**

- **Black box** — menguji **dari luar**, tanpa melihat kode. Berdasarkan **spesifikasi**: masukan ini seharusnya menghasilkan keluaran itu.
- **White box** — menguji **dengan melihat kode**. Memastikan setiap cabang dan jalur logika dilalui.

Keduanya **saling melengkapi, bukan menggantikan**:

- Black box bisa **melewatkan cabang** yang tidak terpikirkan dari spesifikasi
- White box bisa **melewatkan kebutuhan** yang lupa diprogram sama sekali — kalau kodenya tidak ada, tidak ada jalur untuk diuji

**Teknik black box**

**Equivalence partitioning** — bagi masukan menjadi kelompok yang **diperlakukan sama**, lalu uji satu wakil dari tiap kelompok. Kalau umur 18 dan 19 diperlakukan sama, menguji keduanya mubazir.

**Boundary value analysis** — uji **nilai di batas** dan tepat di sekitarnya.

**Inilah teknik yang paling banyak menemukan cacat**, karena kesalahan pemrograman paling sering terjadi tepat di batas: menulis \`>\` padahal seharusnya \`>=\`, atau salah satu angka pada perulangan.

Untuk syarat "umur minimal 17", nilai yang wajib diuji: **16, 17, 18**.

**Decision table** — untuk logika dengan banyak syarat yang saling berkaitan.

**Teknik white box**

**Cakupan** (*coverage*) yang lazim diukur:

- **Statement coverage** — setiap baris pernah dijalankan
- **Branch coverage** — setiap cabang if pernah diambil, **benar maupun salah**
- **Path coverage** — setiap kemungkinan jalur pernah dilalui

**Statement coverage 100% tidak berarti aman.** Satu \`if\` tanpa \`else\` bisa mencapai 100% statement coverage hanya dengan menguji kasus benarnya — sementara cabang salahnya tidak pernah diuji.

**Regression testing**

Menjalankan ulang pengujian lama setiap kali ada perubahan, untuk memastikan perbaikan baru **tidak merusak yang sudah jalan**.

Inilah alasan pengujian **harus otomatis**. Menjalankan 500 pengujian manual setiap kali kode diubah mustahil dilakukan; menjalankannya otomatis butuh beberapa detik.

**Apa yang membuat pengujian baik**

- **Berdiri sendiri** — tidak bergantung urutan atau hasil pengujian lain
- **Bisa diulang** — hasilnya sama setiap kali dijalankan
- **Cepat** — kalau lambat, orang berhenti menjalankannya
- **Jelas kegagalannya** — dari pesannya saja sudah tahu apa yang rusak

Pengujian yang **kadang lulus kadang gagal** tanpa perubahan kode disebut **flaky**, dan lebih berbahaya daripada tidak ada pengujian — karena orang mulai mengabaikan kegagalan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa BOUNDARY VALUE paling banyak menemukan cacat\n#\n# Syarat: "usia minimal 17"\n#\n# Kode yang SALAH:\n#     if usia > 17:      # seharusnya >=\n#\n# Uji dengan 25   -> LULUS  (tidak menemukan apa-apa)\n# Uji dengan 10   -> LULUS  (tidak menemukan apa-apa)\n# Uji dengan 17   -> GAGAL  <- ketemu!\n#\n# Nilai yang WAJIB diuji: 16, 17, 18\n# Kesalahan >= vs > HANYA terlihat tepat di batas.',
      penjelasan: `
Ini alasan **boundary value analysis** menjadi teknik yang paling berharga per satuan usaha.

Perhatikan bahwa menguji dengan nilai 25 dan 10 — keduanya masuk akal, keduanya mewakili "cukup umur" dan "kurang umur" — **sama sekali tidak menemukan cacatnya**. Program berperilaku benar untuk keduanya.

Cacatnya **hanya muncul tepat di satu titik**: usia 17. Dan itu bukan kebetulan.

Kesalahan pemrograman terkonsentrasi di batas karena di situlah keputusan **berubah**:

- **\`>\` lawan \`>=\`** — hanya berbeda tepat di titik batas
- **\`<\` lawan \`<=\`** — sama
- **Batas perulangan** — \`range(n)\` lawan \`range(n+1)\`, hanya berbeda di elemen terakhir
- **Indeks array** — kesalahan satu langkah, yang namanya *off-by-one error*

Semua kesalahan itu punya sifat yang sama: **tidak terlihat kecuali diuji tepat di batasnya.**

Karena itu aturannya: untuk setiap batas, uji **tiga nilai** — tepat di batas, satu di bawahnya, satu di atasnya.

Sekarang gabungkan dengan **equivalence partitioning**, dan kamu mendapat cara memilih kasus uji yang hemat sekaligus tajam:

Untuk syarat usia 17 sampai 60, kelompoknya: di bawah 17, antara 17-60, di atas 60. Menguji usia 30 dan 45 **mubazir** — keduanya mewakili kelompok yang sama.

Yang perlu diuji: satu wakil tiap kelompok, **ditambah** nilai di setiap batas. Jadi: 10 (wakil bawah), 16, 17, 18 (batas bawah), 40 (wakil tengah), 59, 60, 61 (batas atas), 80 (wakil atas).

Sembilan kasus uji yang **jauh lebih mungkin menemukan cacat** daripada lima puluh nilai acak.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Pengujian: menemukan cacat, bukan membuktikan benar
# ============================================

# --------------------------------------------
# Fungsi yang akan diuji -- SENGAJA ada cacatnya
# --------------------------------------------
def boleh_daftar(usia):
    """Syarat: usia 17 sampai 60 (keduanya termasuk)."""
    if usia > 17 and usia <= 60:     # CACAT: seharusnya >= 17
        return True
    return False


# --------------------------------------------
# 1. Equivalence partitioning: bagi jadi kelompok
# --------------------------------------------
print("--- equivalence partitioning ---")
KELOMPOK = [
    ("terlalu muda", [5, 10, 16],      False),
    ("boleh daftar", [20, 30, 45],     True),
    ("terlalu tua",  [65, 70, 90],     False),
]
for nama, contoh, harapan in KELOMPOK:
    hasil = [boleh_daftar(u) for u in contoh]
    sama = len(set(hasil)) == 1
    print("  " + nama.ljust(15) + str(contoh).ljust(16) +
          "hasil " + str(hasil) +
          ("   (seragam)" if sama else "   (TIDAK seragam!)"))

print("")
print("  Dalam satu kelompok, hasilnya seragam.")
print("  Jadi menguji 20 dan 30 dan 45 itu MUBAZIR --")
print("  satu wakil sudah cukup.")


# --------------------------------------------
# 2. Boundary value: di sinilah cacat bersembunyi
# --------------------------------------------
print("")
print("--- boundary value analysis ---")
print("  Syarat: usia 17 sampai 60 (keduanya termasuk)")
print("")
print("  usia   harapan   hasil   status")

BATAS = [
    (15, False), (16, False), (17, True),  (18, True),
    (59, True),  (60, True),  (61, False), (62, False),
]
gagal = []
for usia, harapan in BATAS:
    hasil = boleh_daftar(usia)
    ok = hasil == harapan
    if not ok:
        gagal.append(usia)
    print("  " + str(usia).rjust(4) +
          str(harapan).rjust(10) + str(hasil).rjust(8) +
          ("   lulus" if ok else "   GAGAL  <-- CACAT KETEMU"))

print("")
print("  Cacat ditemukan di usia: " + str(gagal))
print("  Menguji 20, 30, atau 45 TIDAK akan menemukannya.")
print("  Kesalahan > vs >= hanya terlihat TEPAT di batas.")


# --------------------------------------------
# 3. Kenapa statement coverage tidak cukup
# --------------------------------------------
def hitung_diskon(total, anggota):
    diskon = 0
    if anggota:
        diskon = total * 0.1
    return total - diskon

print("")
print("--- statement coverage 100% belum tentu aman ---")
print("  Uji hanya dengan anggota=True:")
print("    hitung_diskon(100, True) =", hitung_diskon(100, True))
print("    -> SEMUA baris dijalankan = statement coverage 100%")
print("    -> tapi cabang 'anggota=False' TIDAK PERNAH diuji")
print("")
print("  Uji dengan keduanya:")
print("    hitung_diskon(100, True)  =", hitung_diskon(100, True))
print("    hitung_diskon(100, False) =", hitung_diskon(100, False))
print("    -> branch coverage 100%")
print("")
print("  Statement coverage menghitung BARIS yang dijalankan.")
print("  Branch coverage menghitung CABANG yang diambil.")
print("  Yang kedua jauh lebih berarti.")


# --------------------------------------------
# 4. Kerangka pengujian sederhana
# --------------------------------------------
print("")
print("--- menjalankan kumpulan pengujian ---")

def uji(nama, sebenarnya, harapan):
    lulus = sebenarnya == harapan
    tanda = "  lulus" if lulus else "  GAGAL"
    pesan = "" if lulus else ("   (dapat " + str(sebenarnya) +
                              ", harusnya " + str(harapan) + ")")
    print(("  " + tanda + "  " + nama.ljust(34) + pesan).rstrip())
    return lulus


KASUS = [
    ("batas bawah - 1  (16)", boleh_daftar(16), False),
    ("batas bawah      (17)", boleh_daftar(17), True),
    ("batas bawah + 1  (18)", boleh_daftar(18), True),
    ("tengah           (40)", boleh_daftar(40), True),
    ("batas atas - 1   (59)", boleh_daftar(59), True),
    ("batas atas       (60)", boleh_daftar(60), True),
    ("batas atas + 1   (61)", boleh_daftar(61), False),
    ("nilai negatif    (-5)", boleh_daftar(-5), False),
]

hasil = [uji(n, a, h) for n, a, h in KASUS]
print("")
print("  " + str(sum(hasil)) + " dari " + str(len(hasil)) + " lulus")

if not all(hasil):
    print("")
    print("  Pengujian BERHASIL -- ia menemukan cacat.")
    print("  Ingat kalimat Dijkstra: pengujian menunjukkan")
    print("  ADANYA cacat, bukan ketiadaannya.")
    print("")
    print("  Perbaikannya: ganti 'usia > 17' menjadi 'usia >= 17'.")


# --------------------------------------------
# 5. Ciri pengujian yang baik
# --------------------------------------------
print("")
print("--- ciri pengujian yang baik ---")
CIRI = [
    ("Berdiri sendiri", "tidak bergantung urutan atau hasil uji lain"),
    ("Bisa diulang",    "hasilnya sama setiap kali dijalankan"),
    ("Cepat",           "kalau lambat, orang berhenti menjalankannya"),
    ("Jelas gagalnya",  "dari pesannya saja sudah tahu apa yang rusak"),
]
for nama, arti in CIRI:
    print("  " + nama.ljust(18) + arti)

print("")
print("  Pengujian yang kadang lulus kadang gagal tanpa")
print("  perubahan kode disebut FLAKY, dan lebih berbahaya")
print("  daripada tidak ada pengujian sama sekali --")
print("  karena orang mulai mengabaikan kegagalan.")`
  },

  output: `--- equivalence partitioning ---
  terlalu muda   [5, 10, 16]     hasil [False, False, False]   (seragam)
  boleh daftar   [20, 30, 45]    hasil [True, True, True]   (seragam)
  terlalu tua    [65, 70, 90]    hasil [False, False, False]   (seragam)

  Dalam satu kelompok, hasilnya seragam.
  Jadi menguji 20 dan 30 dan 45 itu MUBAZIR --
  satu wakil sudah cukup.

--- boundary value analysis ---
  Syarat: usia 17 sampai 60 (keduanya termasuk)

  usia   harapan   hasil   status
    15     False   False   lulus
    16     False   False   lulus
    17      True   False   GAGAL  <-- CACAT KETEMU
    18      True    True   lulus
    59      True    True   lulus
    60      True    True   lulus
    61     False   False   lulus
    62     False   False   lulus

  Cacat ditemukan di usia: [17]
  Menguji 20, 30, atau 45 TIDAK akan menemukannya.
  Kesalahan > vs >= hanya terlihat TEPAT di batas.

--- statement coverage 100% belum tentu aman ---
  Uji hanya dengan anggota=True:
    hitung_diskon(100, True) = 90.0
    -> SEMUA baris dijalankan = statement coverage 100%
    -> tapi cabang 'anggota=False' TIDAK PERNAH diuji

  Uji dengan keduanya:
    hitung_diskon(100, True)  = 90.0
    hitung_diskon(100, False) = 100
    -> branch coverage 100%

  Statement coverage menghitung BARIS yang dijalankan.
  Branch coverage menghitung CABANG yang diambil.
  Yang kedua jauh lebih berarti.

--- menjalankan kumpulan pengujian ---
    lulus  batas bawah - 1  (16)
    GAGAL  batas bawah      (17)                (dapat False, harusnya True)
    lulus  batas bawah + 1  (18)
    lulus  tengah           (40)
    lulus  batas atas - 1   (59)
    lulus  batas atas       (60)
    lulus  batas atas + 1   (61)
    lulus  nilai negatif    (-5)

  7 dari 8 lulus

  Pengujian BERHASIL -- ia menemukan cacat.
  Ingat kalimat Dijkstra: pengujian menunjukkan
  ADANYA cacat, bukan ketiadaannya.

  Perbaikannya: ganti 'usia > 17' menjadi 'usia >= 17'.

--- ciri pengujian yang baik ---
  Berdiri sendiri   tidak bergantung urutan atau hasil uji lain
  Bisa diulang      hasilnya sama setiap kali dijalankan
  Cepat             kalau lambat, orang berhenti menjalankannya
  Jelas gagalnya    dari pesannya saja sudah tahu apa yang rusak

  Pengujian yang kadang lulus kadang gagal tanpa
  perubahan kode disebut FLAKY, dan lebih berbahaya
  daripada tidak ada pengujian sama sekali --
  karena orang mulai mengabaikan kegagalan.`,

  kesalahanUmum: [
    {
      salah: 'Menguji hanya dengan nilai yang jelas benar dan jelas salah, tanpa menyentuh batasnya.',
      kenapa: 'Kesalahan pemrograman terkonsentrasi tepat di batas, terutama keliru memakai lebih besar dibanding lebih besar sama dengan. Menguji usia 25 dan 10 sama sekali tidak menemukan cacat pada syarat usia minimal 17, karena program berperilaku benar untuk keduanya.',
      benar: 'Untuk setiap batas, uji tiga nilai: tepat di batas, satu di bawahnya, dan satu di atasnya.'
    },
    {
      salah: 'Menganggap statement coverage seratus persen berarti pengujiannya lengkap.',
      kenapa: 'Satu percabangan tanpa else bisa mencapai seratus persen statement coverage hanya dengan menguji kasus benarnya, sementara cabang salahnya tidak pernah dijalankan sama sekali. Angka seratus persen memberi rasa aman yang keliru.',
      benar: 'Ukur branch coverage, yang menghitung apakah setiap cabang pernah diambil baik saat benar maupun salah.'
    },
    {
      salah: 'Menguji dengan tujuan membuktikan bahwa program berjalan.',
      kenapa: 'Tujuan itu membuat orang hanya menguji jalur yang sudah pasti benar, dan menghindari kasus yang mencurigakan. Pengujian jadi selalu lulus dan tidak pernah menemukan apa pun, sehingga memberi keyakinan palsu.',
      benar: 'Uji dengan tujuan menemukan cacat. Pengujian yang menemukan kesalahan adalah pengujian yang berhasil, bukan yang gagal.'
    },
    {
      salah: 'Membiarkan pengujian yang kadang lulus kadang gagal tanpa perubahan kode.',
      kenapa: 'Pengujian flaky membuat orang terbiasa mengabaikan kegagalan, sehingga ketika ada kegagalan yang sungguhan, ia ikut diabaikan. Ini lebih berbahaya daripada tidak punya pengujian sama sekali, karena merusak kepercayaan pada seluruh kumpulan pengujian.',
      benar: 'Perbaiki atau hapus pengujian flaky segera. Biasanya penyebabnya bergantung pada waktu, urutan, atau keadaan luar yang tidak dikendalikan.'
    },
    {
      salah: 'Mengandalkan black box saja atau white box saja.',
      kenapa: 'Black box bisa melewatkan cabang yang tidak terpikirkan dari spesifikasi, sedangkan white box bisa melewatkan kebutuhan yang lupa diprogram sama sekali karena tidak ada kode untuk diuji. Keduanya punya titik buta yang berbeda.',
      benar: 'Pakai keduanya. Black box memastikan sesuai kebutuhan, white box memastikan seluruh jalur logika terjamah.'
    }
  ],

  analogi: `Bayangkan menguji sebuah jembatan baru.

Kalimat **Dijkstra** berarti: kamu bisa membuktikan jembatan itu **roboh** dengan melewatkan truk berat. Tetapi kamu **tidak bisa membuktikan** ia tidak akan pernah roboh — betapa pun banyak truk yang sudah lewat dengan selamat.

Karena itu tujuanmu bukan *"membuktikan jembatan ini kuat"*, melainkan **"berusaha merobohkannya"**. Kalau setelah usaha keras ia tetap berdiri, barulah keyakinanmu bertambah.

Ini pembalikan cara berpikir yang penting: **penguji yang baik mencari kegagalan, bukan menghindar darinya.**

Sekarang **boundary value**, dan kenapa ia begitu ampuh.

Kalau jembatan bertuliskan *"maksimal 10 ton"*, di mana kamu menguji? Bukan dengan truk 3 ton — itu jelas aman. Bukan juga dengan truk 50 ton — itu jelas terlalu berat.

Kamu menguji dengan **9,9 ton, 10 ton, dan 10,1 ton**. Karena di situlah insinyurnya mungkin salah menghitung — apakah "maksimal 10" berarti 10 masih boleh, atau sudah tidak.

Kesalahan **satu langkah** hanya terlihat **tepat di langkah itu**.

**Black box** adalah menguji jembatan **tanpa melihat gambar tekniknya**: lewatkan kendaraan, ukur getaran, lihat apa yang terjadi.

**White box** adalah **membaca gambar tekniknya** lalu memastikan setiap sambungan, setiap tiang, setiap kabel sudah diperiksa.

Dan keduanya punya **titik buta yang berbeda**:

- Dengan black box saja, kamu bisa melewatkan **satu tiang yang tidak pernah menanggung beban** dalam pengujianmu.
- Dengan white box saja, kamu bisa memeriksa seluruh tiang dengan sempurna — **dan tidak menyadari bahwa jembatannya lupa dibuatkan pagar pengaman**. Tidak ada gambar untuk sesuatu yang tidak pernah dirancang.

Terakhir, **pengujian flaky** adalah alarm kebakaran yang berbunyi **acak tanpa sebab**. Setelah minggu ketiga, tidak ada lagi yang bergerak ketika ia berbunyi.

Dan pada hari kebakaran sungguhan, alarm itu **tetap berbunyi** — dan tetap diabaikan.`,

  latihan: [
    'Jelaskan maksud kalimat Dijkstra tentang pengujian, dan jelaskan bagaimana ia mengubah tujuan menguji.',
    'Sebutkan empat tingkatan pengujian beserta apa yang diuji masing-masing.',
    'Untuk syarat "nilai kelulusan minimal 60 dan maksimal 100", tentukan kasus uji boundary value yang wajib dijalankan.',
    'Jelaskan perbedaan black box dan white box, lalu sebutkan satu jenis cacat yang hanya bisa ditemukan masing-masing.',
    'Jelaskan kenapa statement coverage seratus persen belum tentu aman, dengan contoh sebuah if tanpa else.',
    'Jelaskan apa itu pengujian flaky, kenapa ia lebih berbahaya daripada tidak ada pengujian, dan sebutkan dua penyebab yang lazim.'
  ]
});
