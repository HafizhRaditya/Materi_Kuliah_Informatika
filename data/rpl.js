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

   Tiga topik tambahan (manajemen konfigurasi, pemeliharaan &
   refactoring, metrik desain) disusun dari REFERENSI LUAR --
   keterangan lengkapnya ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari berkas projek kelompok
   sendiri (SDLC Waterfall, SRS, desain, implementasi). Tiga
   topik berikutnya mengisi pokok bahasan yang ada di RPS
   Rekayasa Perangkat Lunak kampus lain tetapi tidak ada
   bahannya di drive: manajemen konfigurasi dan version control,
   pemeliharaan perangkat lunak dan refactoring, serta metrik
   desain antar-modul.

   Kompleksitas siklomatik sengaja tidak diulang (sudah ada di
   Uji Kualitas Perangkat Lunak), begitu juga COCOMO (sudah ada
   di Sistem Informasi). Semua kode contoh dan graf modul adalah
   TIRUAN, dan semua program benar-benar dijalankan.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'rpl-konfigurasi',
  judul: 'Manajemen Konfigurasi & Version Control',
  kategori: 'rpl',
  tag: ['manajemen konfigurasi', 'version control', 'diff', 'LCS', 'merge tiga arah', 'konflik', 'semantic versioning'],
  ringkas: 'Bagaimana git tahu apa yang berubah, kapan dua perubahan bisa digabung otomatis — dan kenapa merge tanpa konflik belum tentu benar.',

  fungsi: `**Melacak setiap perubahan pada perangkat lunak, menggabungkan pekerjaan banyak orang, dan menandai versi dengan cara yang memberi tahu pemakainya apa yang berubah.**

Topik SDLC membahas tahap-tahap pengembangan. Manajemen konfigurasi adalah yang menjaga semua tahap itu tetap bisa dilacak: siapa mengubah apa, kapan, kenapa, dan bagaimana kembali ke versi sebelumnya.

Terpakai di:

- **Setiap projek kelompok** — git adalah alat manajemen konfigurasi yang dipakai hampir semua tim
- **Membaca diff dan menyelesaikan konflik merge** — pekerjaan sehari-hari programmer
- **Merilis pustaka atau aplikasi** — nomor versi seperti 2.4.1 punya arti yang disepakati
- **Mengelola dependensi** — syarat versi di requirements.txt, package.json, atau composer.json

Yang paling penting dipahami: **merge tiga arah butuh versi dasar.** Dengan tahu dari mana kedua perubahan berawal, alat bisa menggabungkan perubahan di tempat berbeda secara otomatis, dan hanya menyerahkan perubahan di tempat yang sama kepada manusia.

Dan yang paling sering dilupakan: **merge tanpa konflik teks tidak berarti kodenya benar.** Dua perubahan di tempat yang berjauhan bisa saling merusak secara logika — dan hanya uji yang bisa menangkapnya.`,

  praktik: {
    tujuan: 'Kamu bisa membaca dan menjelaskan diff, memahami kapan merge tiga arah menghasilkan konflik, menyelesaikan konflik dengan benar, dan memberi nomor versi semantik yang tepat.',
    alat: ['git', 'Python 3 untuk program diff dan merge', 'Repo projek kelompokmu'],
    langkah: [
      { judul: 'Baca diff dengan benar',
        isi: `Jalankan \`git diff\` pada perubahan kecil. Baris berawalan - dihapus, + ditambahkan, tanpa tanda tidak berubah. Perubahan satu baris selalu tampil sebagai satu - dan satu +.` },
      { judul: 'Pahami dari mana diff datang',
        isi: `Diff mencari urutan baris bersama terpanjang (LCS) antara versi lama dan baru. Baris di LCS tidak berubah; sisanya dihapus atau ditambah. Program topik ini membangunnya dengan pemrograman dinamis.` },
      { judul: 'Buat cabang dan ubah bagian berbeda',
        isi: `Dari satu commit dasar, buat dua cabang. Ubah baris berbeda di masing-masing, lalu merge. Git menggabungkannya tanpa bertanya.` },
      { judul: 'Buat konflik dengan sengaja',
        isi: `Ulangi, tetapi ubah baris yang **sama** di kedua cabang. Git menulis penanda <<<<<<<, =======, >>>>>>> dan berhenti. Pilih, gabungkan, atau tulis ulang bagian itu — lalu hapus penandanya sebelum commit.` },
      { judul: 'Jalankan uji setelah setiap merge',
        isi: `Merge tanpa konflik belum tentu benar. Jalankan seluruh uji setelah merge, sebelum push. Di tim, pasang CI supaya ini terjadi otomatis.` },
      { judul: 'Beri nomor versi semantik',
        isi: `MAYOR.MINOR.PATCH: naikkan PATCH untuk perbaikan bug, MINOR untuk fitur baru yang tetap cocok dengan pemakaian lama, MAYOR untuk perubahan yang membuat pemakai lama harus menyesuaikan.` },
      { judul: 'Tulis syarat dependensi dengan sadar',
        isi: `\`^1.4.2\` menerima 1.4.2 sampai sebelum 2.0.0. \`~1.4.2\` menerima 1.4.x saja. Nomor versi yang tepat — dari pembuat pustaka — yang membuat syarat ini aman.` }
    ],
    cek: [
      'Kamu bisa menjelaskan kenapa diff menampilkan satu baris yang diubah sebagai - dan +',
      'Kamu bisa meramal apakah dua perubahan akan konflik sebelum menjalankan merge',
      'Kamu menjalankan uji setelah setiap merge, bukan hanya saat ada konflik',
      'Kamu bisa menentukan bagian versi mana yang dinaikkan untuk sebuah perubahan'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa merge butuh versi dasar',

  konsep: `Topik SDLC menempatkan implementasi dan pemeliharaan sebagai tahap-tahap proses. Di dalam setiap tahap, kode terus berubah — oleh banyak orang, di banyak cabang. **Manajemen konfigurasi** adalah disiplin yang menjaga perubahan-perubahan itu tetap terlacak dan bisa digabungkan.

**Diff: yang disimpan adalah perubahan**

| | Baris |
|---|---|
| | def luas(p, l): |
| + | if p < 0 or l < 0: |
| + | raise ValueError |
| | return p * l |
| | (kosong) |
| | def keliling(p, l): |
| − | return 2 * p + 2 * l |
| + | return 2 * (p + l) |

Urutan baris bersama terpanjang (LCS) antara versi lama (5 baris) dan baru (7 baris) adalah 4 baris. Baris-baris itu tidak berubah; sisanya dihapus (−) atau ditambah (+).

Perhatikan baris terakhir: mengubah satu baris tampil sebagai **hapus** yang lama dan **tambah** yang baru. Diff tidak punya konsep "mengubah"; ia hanya mengenal baris yang ada di kedua versi dan baris yang tidak.

**Merge tiga arah**

Ani dan Budi sama-sama mulai dari versi **dasar** yang sama. Ani mengubah batas pinjam dari 3 menjadi 5. Budi memperbaiki fungsi denda supaya tidak negatif.

Tanpa versi dasar, alat hanya melihat dua berkas yang berbeda di dua tempat, dan tidak tahu mana yang baru. Dengan versi dasar, ia bisa bertanya untuk setiap bagian: siapa yang mengubahnya?

- Tidak ada yang mengubah → ambil apa adanya
- Hanya Ani yang mengubah → ambil versi Ani
- Hanya Budi yang mengubah → ambil versi Budi
- Keduanya mengubah dengan cara yang sama → ambil salah satu
- Keduanya mengubah dengan cara berbeda → **konflik**

Ani dan Budi mengubah bagian berbeda: merge otomatis, **0 konflik**. Hasilnya punya batas pinjam 5 **dan** denda yang sudah diperbaiki.

Ani dan Cici sama-sama mengubah batas pinjam — ke 5 dan ke 7: **1 konflik**, ditandai dengan penanda yang sama seperti di git:

- <<<<<<< kita — versi kita
- ======= — pemisah
- >>>>>>> mereka — versi mereka

Hanya manusia yang tahu apakah batasnya harus 5, 7, atau sesuatu yang lain.

**Merge bersih, kode salah**

Ani menambah fungsi \`bayar\` di akhir berkas, yang memakai \`diskon(total)\` sebagai **nominal rupiah**. Di saat yang sama, Budi mengubah \`diskon\` supaya mengembalikan **persentase** — 0,1, bukan total × 0,1.

Kedua perubahan dipisahkan baris-baris yang tidak disentuh siapa pun. Merge: **0 konflik**. Program menjalankan kode hasil merge:

| | Nilai |
|---|---|
| bayar(200000, 2) hasil merge | 209999,9 |
| yang diharapkan Ani | 190000 |

Tidak ada konflik teks, dan kodenya salah. Merge tiga arah bekerja di tingkat **baris**, bukan di tingkat **arti**. Satu-satunya pelindung adalah uji yang dijalankan setelah merge — idealnya otomatis, sebelum kode masuk ke cabang utama.

**Versi semantik**

Nomor versi MAYOR.MINOR.PATCH punya arti yang disepakati:

| Naik | Artinya | Pemakai lama |
|---|---|---|
| PATCH | perbaikan bug | aman |
| MINOR | fitur baru | aman |
| MAYOR | perubahan yang tidak cocok | harus menyesuaikan |

Versi harus dibandingkan sebagai **angka per bagian**, bukan sebagai teks:

| Cara mengurutkan | Hasil |
|---|---|
| sebagai teks | 1.10.0, 1.4.10, 1.4.2, 1.9.0, 2.0.0 |
| sebagai versi | 1.4.2, 1.4.10, 1.9.0, 1.10.0, 2.0.0 |

Sebagai teks, "1.10.0" lebih kecil dari "1.9.0" karena karakter "1" lebih kecil dari "9".

Syarat **^1.4.2** menerima versi 1.4.2 ke atas selama angka MAYOR-nya tetap 1: 1.4.10 dan 1.9.0 boleh, 1.4.1 dan 2.0.0 tidak. Syarat seperti ini aman hanya kalau pembuat pustaka menaati artinya — tidak pernah memasukkan perubahan yang tidak cocok ke versi MINOR.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def lcs_tabel(a, b):\n    n, m = len(a), len(b)\n    T = [[0] * (m + 1) for _ in range(n + 1)]\n    for i in range(n - 1, -1, -1):\n        for j in range(m - 1, -1, -1):\n            T[i][j] = (T[i + 1][j + 1] + 1 if a[i] == b[j]\n                       else max(T[i + 1][j], T[i][j + 1]))\n    return T\n\n# T[i][j] = panjang LCS dari a[i:] dan b[j:]\n# diff berjalan dari T[0][0]: baris sama -> maju keduanya,\n# selain itu ikuti arah yang mempertahankan LCS terpanjang",
      penjelasan: `Pemrograman dinamis dari topik algoritma, dipakai untuk pertanyaan yang dijawab jutaan kali sehari di seluruh dunia: apa yang berubah?

**Apa yang dicari.**

Diff yang baik adalah diff dengan perubahan **paling sedikit**. Setiap baris yang tidak masuk ke urutan bersama harus ditandai dihapus atau ditambah, jadi meminimalkan perubahan sama dengan memaksimalkan panjang urutan bersama — **longest common subsequence**.

Urutan bersama tidak harus bersebelahan: baris ke-1, ke-4, dan ke-5 versi lama bisa cocok dengan baris ke-1, ke-4, dan ke-6 versi baru. Yang harus sama cuma urutannya.

**Tabel T.**

\`T[i][j]\` adalah panjang LCS dari potongan \`a[i:]\` dan \`b[j:]\`. Tabel diisi dari belakang, karena setiap isi bergantung pada isi di kanan dan di bawahnya:

- Kalau \`a[i] == b[j]\`: baris ini bisa masuk urutan bersama, jadi \`T[i][j] = T[i+1][j+1] + 1\`.
- Kalau tidak: salah satu dari keduanya harus dilewati. Ambil yang memberi LCS lebih panjang.

**Menelusuri balik menjadi diff.**

Setelah tabel penuh, \`diff\` berjalan dari \`T[0][0]\`. Baris yang sama: tulis tanpa tanda, maju di kedua berkas. Baris yang berbeda: ikuti arah yang nilainya lebih besar — melewati baris lama berarti "dihapus", melewati baris baru berarti "ditambah".

**Kenapa git tidak memakai kode ini.**

Tabel ini berukuran n × m. Untuk berkas 10.000 baris, itu seratus juta isi — terlalu besar. Git memakai algoritme Myers, yang menemukan diff terpendek dengan waktu sebanding (n + m) × d, dengan d banyaknya perubahan. Karena perubahan biasanya sedikit dibanding ukuran berkas, Myers jauh lebih cepat. Python menyediakan modul \`difflib\` dengan algoritme yang lain lagi.

Gagasannya tetap sama: diff adalah pertanyaan tentang urutan bersama terpanjang, dan jawaban-jawaban itu bisa berbeda-beda sedikit di antara alat — kadang ada lebih dari satu diff dengan jumlah perubahan yang sama.`
    },
    {
      bahasa: 'python',
      kode: "for s in stabil:                   # baris dasar yang tidak diubah siapa pun\n    d, k, m = dasar[di:s], kita[ki:ks], mereka[mi:ms]\n    if k == m:\n        hasil += k                 # sama-sama (atau sama-sama tidak) mengubah\n    elif k == d:\n        hasil += m                 # cuma 'mereka' yang mengubah\n    elif m == d:\n        hasil += k                 # cuma 'kita' yang mengubah\n    else:\n        konflik += 1\n        hasil += ['<<<<<<< kita'] + k + ['======='] + m + ['>>>>>>> mereka']",
      penjelasan: `Inti algoritme diff3 — cara git, Mercurial, dan hampir semua alat version control menggabungkan dua cabang — dalam empat cabang \`if\`.

**Langkah pertama: mencari baris yang stabil.**

Baris stabil adalah baris versi dasar yang ada, tidak berubah, di **kedua** versi baru. Program mencarinya dengan \`difflib.SequenceMatcher\`: satu diff dari dasar ke "kita", satu dari dasar ke "mereka", lalu ambil baris dasar yang cocok di keduanya.

Baris-baris stabil memotong ketiga berkas menjadi potongan-potongan yang sejajar. Di antara dua baris stabil yang berurutan, ada potongan dasar, potongan kita, dan potongan mereka.

**Langkah kedua: empat kasus untuk setiap potongan.**

Potongan dasar d, potongan kita k, potongan mereka m:

- **k == m**: kedua cabang punya isi yang sama di sini — entah sama-sama tidak mengubah, entah sama-sama mengubah dengan cara yang persis sama. Tidak ada yang perlu diputuskan.
- **k == d**: kita tidak mengubah bagian ini; mereka mengubahnya. Ambil perubahan mereka.
- **m == d**: kebalikannya. Ambil perubahan kita.
- **Selain itu**: kedua cabang mengubah bagian yang sama dengan cara berbeda. Alat tidak punya dasar untuk memilih — ini konflik.

Perhatikan bahwa ketiga kasus pertama tidak butuh pemahaman apa pun tentang isi kode. Hanya perbandingan teks.

**Kenapa versi dasar mutlak diperlukan.**

Tanpa d, kasus kedua dan ketiga tidak bisa dibedakan. Kalau kita punya "BATAS = 3" dan mereka punya "BATAS = 5", siapa yang mengubah? Kalau dasarnya "BATAS = 3", mereka yang mengubah, dan hasilnya 5. Kalau dasarnya "BATAS = 5", kita yang mengubah, dan hasilnya 3. Tanpa dasar, setiap perbedaan harus menjadi konflik.

Itu sebabnya git menyimpan riwayat commit, bukan hanya berkas terbaru: untuk setiap merge, ia mencari commit leluhur bersama yang terbaru dan memakainya sebagai dasar.

**Batasnya: teks, bukan arti.**

Semua perbandingan di sini adalah perbandingan teks. Algoritme tidak tahu bahwa \`bayar\` bergantung pada arti \`diskon\`. Dua perubahan di potongan berbeda selalu digabung otomatis — termasuk ketika keduanya saling bertentangan secara logika. Di contoh program, merge bersih menghasilkan 209999,9 di tempat 190000.

Versi sederhana di program ini juga tidak menangani semua kasus yang ditangani git — misalnya berkas yang dipindah atau diganti namanya. Tetapi keempat kasus di atas adalah intinya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Manajemen konfigurasi: diff, merge tiga arah, versi semantik
# ============================================
import difflib

# --------------------------------------------
# 1. Diff: urutan bersama terpanjang (LCS)
# --------------------------------------------
def lcs_tabel(a, b):
    n, m = len(a), len(b)
    T = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            T[i][j] = T[i + 1][j + 1] + 1 if a[i] == b[j] else max(T[i + 1][j], T[i][j + 1])
    return T

def diff(a, b):
    T = lcs_tabel(a, b)
    i = j = 0
    hasil = []
    while i < len(a) and j < len(b):
        if a[i] == b[j]:
            hasil.append("  " + a[i]); i += 1; j += 1
        elif T[i + 1][j] >= T[i][j + 1]:
            hasil.append("- " + a[i]); i += 1
        else:
            hasil.append("+ " + b[j]); j += 1
    hasil += ["- " + x for x in a[i:]] + ["+ " + x for x in b[j:]]
    return hasil, T[0][0]

LAMA = ["def luas(p, l):", "    return p * l", "", "def keliling(p, l):",
        "    return 2 * p + 2 * l"]
BARU = ["def luas(p, l):", "    if p < 0 or l < 0:", "        raise ValueError",
        "    return p * l", "", "def keliling(p, l):", "    return 2 * (p + l)"]
print("--- diff baris demi baris ---")
baris, sama = diff(LAMA, BARU)
for b in baris:
    print(("  " + b).rstrip())
print("\n  baris yang sama (LCS): " + str(sama) + " dari " + str(len(LAMA))
      + " lama dan " + str(len(BARU)) + " baru")
print("  Diff tidak menyimpan berkas baru; ia menyimpan PERUBAHANNYA.")

# --------------------------------------------
# 2. Merge tiga arah
# --------------------------------------------
def gabung3(dasar, kita, mereka):
    """diff3 sederhana: potong di baris dasar yang tidak diubah siapa pun."""
    def peta(lain):
        m = {}
        for blok in difflib.SequenceMatcher(None, dasar, lain, autojunk=False).get_matching_blocks():
            for k in range(blok.size):
                m[blok.a + k] = blok.b + k
        return m
    pk, pm = peta(kita), peta(mereka)
    stabil = [i for i in range(len(dasar)) if i in pk and i in pm] + [len(dasar)]
    hasil, konflik = [], 0
    di, ki, mi = 0, 0, 0
    for s in stabil:
        ks = pk.get(s, len(kita)) if s < len(dasar) else len(kita)
        ms = pm.get(s, len(mereka)) if s < len(dasar) else len(mereka)
        d, k, m = dasar[di:s], kita[ki:ks], mereka[mi:ms]
        if k == m:
            hasil += k
        elif k == d:
            hasil += m                     # cuma 'mereka' yang mengubah
        elif m == d:
            hasil += k                     # cuma 'kita' yang mengubah
        else:
            konflik += 1
            hasil += ["<<<<<<< kita"] + k + ["======="] + m + [">>>>>>> mereka"]
        if s < len(dasar):
            hasil.append(dasar[s])
        di, ki, mi = s + 1, ks + 1, ms + 1
    return hasil, konflik

DASAR = ["BATAS_PINJAM = 3", "DENDA = 1000", "", "def hitung_denda(hari):",
         "    return hari * DENDA"]
ANI = ["BATAS_PINJAM = 5", "DENDA = 1000", "", "def hitung_denda(hari):",
       "    return hari * DENDA"]                        # ubah batas pinjam
BUDI = ["BATAS_PINJAM = 3", "DENDA = 1000", "", "def hitung_denda(hari):",
        "    return max(0, hari) * DENDA"]               # perbaiki denda negatif
print("\n--- merge: Ani dan Budi mengubah bagian BERBEDA ---")
hasil, k = gabung3(DASAR, ANI, BUDI)
for b in hasil:
    print(("  " + b).rstrip())
print("  konflik: " + str(k))

CICI = ["BATAS_PINJAM = 7", "DENDA = 1000", "", "def hitung_denda(hari):",
        "    return hari * DENDA"]                       # ubah baris yang SAMA
print("\n--- merge: Ani dan Cici mengubah baris yang SAMA ---")
hasil, k = gabung3(DASAR, ANI, CICI)
for b in hasil:
    print(("  " + b).rstrip())
print("  konflik: " + str(k))
print()
print("  Tanpa versi DASAR, alat tidak bisa tahu siapa yang mengubah")
print("  apa. Dengan dasar, perubahan di tempat berbeda digabung")
print("  otomatis; perubahan di tempat yang sama diserahkan ke manusia.")

print("\n--- merge yang 'berhasil' tetapi salah ---")
DASAR2 = ["def diskon(total):", "    return total * 0.1", "",
          "def ongkir(berat):", "    return berat * 5000"]
# Ani menambah fungsi di akhir, memakai diskon() sebagai NOMINAL rupiah
KITA2 = DASAR2 + ["", "def bayar(total, berat):",
                  "    return total - diskon(total) + ongkir(berat)"]
# Budi mengubah diskon() supaya mengembalikan PERSENTASE
MEREKA2 = ["def diskon(total):", "    return 0.1", "",
           "def ongkir(berat):", "    return berat * 5000"]
hasil, k = gabung3(DASAR2, KITA2, MEREKA2)
for b in hasil:
    print(("  " + b).rstrip())
print("  konflik: " + str(k))
exec("\n".join(hasil), ruang := {})
print("  bayar(200000, 2) = " + format(ruang["bayar"](200000, 2), ".1f")
      + "   (Ani mengharapkan 190000.0)")
print("  Tidak ada konflik teks -- tetapi 'bayar' menganggap diskon")
print("  adalah NOMINAL, padahal kini ia PERSENTASE. Merge bersih")
print("  bukan bukti kode benar; jalankan ujinya setelah merge.")

# --------------------------------------------
# 3. Versi semantik
# --------------------------------------------
def urai(v):
    return tuple(int(x) for x in v.split("."))

def cocok_caret(v, syarat):
    """^1.4.2: versi >= 1.4.2 dengan angka MAYOR yang sama."""
    a, s = urai(v), urai(syarat)
    return a[0] == s[0] and a >= s

print("\n--- versi semantik MAYOR.MINOR.PATCH ---")
VERSI = ["1.9.0", "1.10.0", "1.4.2", "2.0.0", "1.4.10"]
print("  urut sebagai teks  : " + ", ".join(sorted(VERSI)))
print("  urut sebagai versi : " + ", ".join(sorted(VERSI, key=urai)))
print("  Sebagai teks, '1.10.0' < '1.9.0' karena '1' < '9'.")
print("\n  syarat ^1.4.2 (boleh naik MINOR dan PATCH, tidak MAYOR):")
for v in ["1.4.1", "1.4.2", "1.4.10", "1.9.0", "2.0.0"]:
    print("    " + format(v, "<8") + ("boleh" if cocok_caret(v, "1.4.2") else "tidak"))
print("  PATCH: perbaikan bug. MINOR: fitur baru, tetap cocok.")
print("  MAYOR: ada yang tidak lagi cocok -- pemakai harus menyesuaikan.")` },
  output: `--- diff baris demi baris ---
    def luas(p, l):
  +     if p < 0 or l < 0:
  +         raise ValueError
        return p * l

    def keliling(p, l):
  -     return 2 * p + 2 * l
  +     return 2 * (p + l)

  baris yang sama (LCS): 4 dari 5 lama dan 7 baru
  Diff tidak menyimpan berkas baru; ia menyimpan PERUBAHANNYA.

--- merge: Ani dan Budi mengubah bagian BERBEDA ---
  BATAS_PINJAM = 5
  DENDA = 1000

  def hitung_denda(hari):
      return max(0, hari) * DENDA
  konflik: 0

--- merge: Ani dan Cici mengubah baris yang SAMA ---
  <<<<<<< kita
  BATAS_PINJAM = 5
  =======
  BATAS_PINJAM = 7
  >>>>>>> mereka
  DENDA = 1000

  def hitung_denda(hari):
      return hari * DENDA
  konflik: 1

  Tanpa versi DASAR, alat tidak bisa tahu siapa yang mengubah
  apa. Dengan dasar, perubahan di tempat berbeda digabung
  otomatis; perubahan di tempat yang sama diserahkan ke manusia.

--- merge yang 'berhasil' tetapi salah ---
  def diskon(total):
      return 0.1

  def ongkir(berat):
      return berat * 5000

  def bayar(total, berat):
      return total - diskon(total) + ongkir(berat)
  konflik: 0
  bayar(200000, 2) = 209999.9   (Ani mengharapkan 190000.0)
  Tidak ada konflik teks -- tetapi 'bayar' menganggap diskon
  adalah NOMINAL, padahal kini ia PERSENTASE. Merge bersih
  bukan bukti kode benar; jalankan ujinya setelah merge.

--- versi semantik MAYOR.MINOR.PATCH ---
  urut sebagai teks  : 1.10.0, 1.4.10, 1.4.2, 1.9.0, 2.0.0
  urut sebagai versi : 1.4.2, 1.4.10, 1.9.0, 1.10.0, 2.0.0
  Sebagai teks, '1.10.0' < '1.9.0' karena '1' < '9'.

  syarat ^1.4.2 (boleh naik MINOR dan PATCH, tidak MAYOR):
    1.4.1   tidak
    1.4.2   boleh
    1.4.10  boleh
    1.9.0   boleh
    2.0.0   tidak
  PATCH: perbaikan bug. MINOR: fitur baru, tetap cocok.
  MAYOR: ada yang tidak lagi cocok -- pemakai harus menyesuaikan.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Diff dengan tabel LCS, n dan m baris', waktu: 'O(n · m)', memori: 'O(n · m)' },
      { operasi: 'Diff dengan algoritme Myers (git)', waktu: 'O((n + m) · d)', memori: 'd = banyaknya perubahan' },
      { operasi: 'Merge tiga arah', waktu: 'dua diff + satu penelusuran', memori: 'O(n)' },
      { operasi: 'Membandingkan dua versi semantik', waktu: 'O(1)', memori: 'tiga bilangan' }
    ],
    intuisi: `Tabel LCS mudah dipahami tetapi kuadratik: berkas 10.000 baris butuh seratus juta isi tabel. Algoritme Myers memanfaatkan kenyataan bahwa perubahan biasanya kecil dibanding ukuran berkas: kalau cuma 20 baris yang berubah dari 10.000, kerjanya sebanding 20 × 20.000, bukan 10.000².

Itu juga menjelaskan kenapa diff yang **besar** — mengubah format seluruh berkas, mengganti indentasi — terasa lambat di beberapa alat dan sulit dibaca di semua alat: d menjadi sebesar n. Kebiasaan yang baik, memisahkan perubahan format dari perubahan isi ke commit berbeda, membuat setiap diff tetap kecil dan mudah ditinjau.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap merge tanpa konflik berarti kode hasil merge benar.',
      kenapa: 'Merge tiga arah membandingkan teks, bukan arti. Dua perubahan di tempat berbeda bisa saling bertentangan secara logika, seperti fungsi yang memakai diskon sebagai nominal padahal diskon kini persentase.',
      benar: 'Jalankan seluruh uji setelah setiap merge, dan pasang CI supaya uji berjalan otomatis sebelum kode masuk cabang utama.'
    },
    {
      salah: 'Menyelesaikan konflik dengan memilih "punya kita" untuk semua berkas.',
      kenapa: 'Perubahan cabang lain di bagian yang berkonflik ikut terbuang, termasuk perbaikan yang mungkin penting, tanpa ada yang menyadarinya.',
      benar: 'Baca setiap konflik, pahami maksud kedua perubahan, lalu gabungkan atau tulis ulang bagian itu.'
    },
    {
      salah: 'Meninggalkan penanda konflik di berkas lalu commit.',
      kenapa: 'Penanda <<<<<<<, =======, dan >>>>>>> membuat berkas tidak bisa dijalankan atau dikompilasi, dan kadang lolos ke berkas yang tidak diperiksa kompilator seperti konfigurasi.',
      benar: 'Cari sisa penanda sebelum commit, dan pasang pemeriksaan otomatis yang menolak commit berisi penanda itu.'
    },
    {
      salah: 'Mencampur perubahan format dan perubahan isi dalam satu commit.',
      kenapa: 'Diff menjadi sangat besar sehingga perubahan isi yang penting tenggelam, dan cabang lain yang menyentuh berkas yang sama hampir pasti konflik.',
      benar: 'Pisahkan perubahan format ke commit tersendiri, sebaiknya disepakati tim dan dikerjakan sekaligus.'
    },
    {
      salah: 'Membandingkan nomor versi sebagai teks.',
      kenapa: 'Sebagai teks, "1.10.0" lebih kecil dari "1.9.0" karena karakter pertama yang berbeda adalah "1" lawan "9".',
      benar: 'Pecah versi menjadi bilangan per bagian dan bandingkan sebagai tuple.'
    },
    {
      salah: 'Memasukkan perubahan yang tidak cocok dengan pemakaian lama ke versi MINOR.',
      kenapa: 'Pemakai yang memasang syarat seperti ^1.4.2 akan menerima versi itu secara otomatis, dan aplikasinya rusak tanpa mereka mengubah apa pun.',
      benar: 'Naikkan versi MAYOR setiap kali ada perubahan yang memaksa pemakai lama menyesuaikan kodenya.'
    }
  ],

  analogi: `Bayangkan kamu dan temanmu mengedit **naskah drama** yang sama untuk pentas kelas, masing-masing di salinan fotokopi sendiri.

**Diff.** Kamu tidak mengirim seluruh naskah ke temanmu setiap kali mengubah sesuatu. Kamu mengirim catatan: "halaman 3, coret kalimat ini, ganti dengan yang ini; halaman 5, tambahkan dua baris di sini". Itu diff.

**Merge tiga arah.** Kalian berdua mulai dari fotokopi yang sama — itu versi dasar. Kamu merevisi babak satu, temanmu merevisi babak tiga. Menggabungkannya mudah: ambil babak satu versimu, babak tiga versi temanmu, sisanya dari fotokopi asli.

Tetapi bagaimana kalau kamu tidak menyimpan fotokopi asli? Kamu memegang dua naskah yang berbeda di babak satu dan babak tiga, dan tidak tahu siapa yang mengubah apa. Apakah babak satu versimu yang baru, atau versi temanmu yang lama? Tanpa fotokopi asli, setiap perbedaan harus ditanyakan.

**Konflik.** Kalian berdua mengubah dialog yang sama di babak dua, dengan cara berbeda. Tidak ada aturan yang bisa memilih; kalian harus duduk bersama dan memutuskan.

**Merge bersih, naskah salah.** Kamu mengganti nama tokoh "Pak Budi" menjadi "Pak Hasan" di seluruh babak satu. Temanmu, di babak tiga, menambah adegan baru di mana tokoh lain memanggil "Pak Budi!". Tidak ada baris yang sama-sama diubah — penggabungannya mulus. Tetapi di pentas, seorang aktor memanggil tokoh yang sudah tidak ada. Hanya gladi resik — ujinya — yang akan menangkapnya.

**Versi.** Naskah revisi kecil — salah ketik — "versi 1.0.1". Adegan baru ditambahkan tanpa mengubah yang lama — "versi 1.1.0"; aktor yang sudah hafal tidak perlu menghafal ulang. Tokoh utama diganti — "versi 2.0.0"; semua aktor harus membaca ulang.`,

  latihan: [
    'Tulis dua versi fungsi kecil, jalankan fungsi diff dari program ini, lalu bandingkan hasilnya dengan git diff.',
    'Isi tabel LCS dengan tangan untuk urutan A B C B D dan B D C A B, lalu tentukan panjang LCS-nya.',
    'Buat dua cabang di repo latihan yang mengubah baris berbeda di berkas yang sama, lalu merge dan periksa hasilnya.',
    'Buat dua cabang yang mengubah baris yang sama, lalu selesaikan konfliknya tanpa sekadar memilih salah satu sisi.',
    'Ulangi percobaan merge bersih tetapi salah dari topik ini di git, lalu tulis satu uji yang menangkap kesalahannya.',
    'Jelaskan dengan contoh kenapa merge tanpa versi dasar harus menandai setiap perbedaan sebagai konflik.',
    'Urutkan versi 0.9.12, 0.10.0, 0.9.2, 1.0.0-beta, dan 1.0.0 dengan benar, dan cari tahu arti bagian -beta di spesifikasi versi semantik.',
    'Tentukan nomor versi berikutnya dari 2.3.4 untuk tiga perubahan: perbaikan bug, menambah parameter opsional, dan menghapus sebuah fungsi.',
    'Tulis fungsi yang memeriksa syarat ~1.4.2 dan uji dengan lima versi.',
    'Periksa berkas dependensi projekmu (requirements.txt atau package.json) dan jelaskan arti setiap syarat versinya.'
  ]
});


TOPICS.push({
  id: 'rpl-pemeliharaan',
  judul: 'Pemeliharaan & Refactoring',
  kategori: 'rpl',
  tag: ['pemeliharaan', 'korektif', 'adaptif', 'perfektif', 'preventif', 'refactoring', 'code smell', 'utang teknis'],
  ringkas: 'Tahap terpanjang dan termahal dalam hidup perangkat lunak — dan satu aturan yang membedakan merapikan kode dari menulis ulang dengan risiko: perilakunya harus tetap sama, dan harus dibuktikan.',

  fungsi: `**Menjaga perangkat lunak tetap berguna setelah dirilis: memperbaiki kesalahan, menyesuaikan dengan lingkungan yang berubah, menambah kemampuan, dan merapikan kode supaya perubahan berikutnya tetap murah.**

Topik SDLC menempatkan pemeliharaan sebagai tahap terakhir. Dalam kenyataannya, ia tahap yang **paling lama**: sistem akademik yang dibangun dalam setahun bisa dipakai dan dipelihara sepuluh tahun.

Terpakai di:

- **Setiap aplikasi yang sudah dipakai orang** — laporan bug, sistem operasi baru, aturan kampus yang berubah
- **Mewarisi kode orang lain** — tugas pertama di banyak pekerjaan adalah memahami dan mengubah kode yang ditulis orang yang sudah pergi
- **Projek kelompok yang berlanjut** — kode semester lalu yang harus dikembangkan semester ini
- **Tinjauan kode** — mengenali bau kode sebelum kode itu masuk

Yang paling penting dipahami: **refactoring mengubah bentuk, bukan perilaku.** Kode yang dirapikan harus memberi hasil yang persis sama untuk setiap masukan — dan itu harus **dibuktikan** dengan uji, bukan diyakini.

Dan yang paling sering dilanggar: **memperbaiki bug sambil refactoring.** Program topik ini menemukan perilaku aneh di kode lama — tugas yang tidak dikumpulkan malah menguntungkan — dan sengaja **tidak** memperbaikinya di langkah refactoring.`,

  praktik: {
    tujuan: 'Kamu bisa menggolongkan permintaan perubahan ke empat jenis pemeliharaan, mengukur bau kode dengan modul ast, melakukan refactoring kecil, dan membuktikan perilakunya tidak berubah dengan uji pembanding.',
    alat: ['Python 3 dengan modul ast', 'Kode lama dari projekmu atau projek semester lalu'],
    langkah: [
      { judul: 'Golongkan setiap permintaan perubahan',
        isi: `- **Korektif**: memperbaiki kesalahan — nilai akhir salah hitung
- **Adaptif**: menyesuaikan dengan lingkungan — versi PHP baru, peraturan akademik baru
- **Perfektif**: menambah atau memperbaiki kemampuan — ekspor ke PDF, halaman lebih cepat
- **Preventif**: mencegah masalah di masa depan — refactoring, menambah uji

Penggolongan ini membantu merencanakan: pekerjaan preventif paling sering ditunda, dan penundaan itu yang membuat pekerjaan lain makin mahal.` },
      { judul: 'Ukur bau kode',
        isi: `Pakai modul \`ast\` untuk mengukur setiap fungsi: panjang dalam baris, banyaknya parameter, dan kedalaman sarang if/for/while. Cari juga blok yang strukturnya kembar.

Angka batas — misalnya 25 baris, 5 parameter, 3 tingkat — adalah pedoman untuk menunjuk tempat yang layak dilihat, bukan aturan mutlak.` },
      { judul: 'Tulis uji pembanding lebih dulu',
        isi: `Sebelum mengubah satu baris pun, simpan fungsi lama dan siapkan ratusan kombinasi masukan. Setelah refactoring, jalankan keduanya pada semua masukan dan bandingkan hasilnya.

Kalau kode lama tidak punya uji sama sekali, uji pembanding seperti ini — disebut *characterization test* — adalah cara tercepat mendapat jaring pengaman.` },
      { judul: 'Refactoring dalam langkah kecil',
        isi: `Satu perubahan pada satu waktu: pecah fungsi panjang, gabungkan blok kembar ke satu fungsi, ganti rangkaian if dengan tabel, balik syarat untuk keluar lebih awal. Jalankan uji pembanding setelah **setiap** langkah.` },
      { judul: 'Jangan perbaiki bug sambil refactoring',
        isi: `Kalau menemukan perilaku aneh, catat — tetapi pertahankan dulu. Perbaikan perilaku adalah perubahan terpisah, dengan uji baru dan, kalau menyangkut aturan, persetujuan orang yang berwenang.

Mencampur keduanya membuat mustahil membedakan "perilaku berubah karena disengaja" dari "perilaku berubah karena refactoring salah".` },
      { judul: 'Ukur ulang',
        isi: `Jalankan pengukur bau kode lagi. Angka yang turun adalah bukti bahwa refactoring memperbaiki struktur; uji pembanding yang lulus adalah bukti bahwa ia tidak merusak perilaku. Keduanya dibutuhkan.` }
    ],
    cek: [
      'Kamu bisa menggolongkan lima permintaan perubahan dari projekmu ke empat jenis pemeliharaan',
      'Kamu punya pengukur panjang, parameter, dan kedalaman sarang yang bekerja pada kode Python',
      'Setiap refactoring-mu dibuktikan dengan uji pembanding yang tidak menemukan perbedaan',
      'Perilaku aneh yang kamu temukan dicatat dan diperbaiki di perubahan terpisah'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa refactoring harus bisa dibuktikan',

  konsep: `Topik perancangan membahas prinsip kode yang baik: coupling rendah, cohesion tinggi, SOLID. Topik ini membahas yang terjadi pada kode yang **sudah** ditulis — yang sering tidak mengikuti prinsip-prinsip itu — dan cara memperbaikinya tanpa merusaknya.

**Empat jenis pemeliharaan**

| Jenis | Tujuan | Contoh |
|---|---|---|
| Korektif | memperbaiki kesalahan | nilai akhir salah hitung |
| Adaptif | menyesuaikan dengan lingkungan | pindah ke versi PHP baru |
| Perfektif | menambah atau memperbaiki kemampuan | ekspor transkrip ke PDF |
| Preventif | mencegah masalah di masa depan | refactoring, menambah uji |

Berbagai penelitian memperkirakan pemeliharaan memakan sebagian besar — sering disebut lebih dari separuh — biaya seumur hidup perangkat lunak, dan sebagian besar di antaranya bukan memperbaiki bug, melainkan adaptif dan perfektif. Angka pastinya berbeda-beda antar-studi, tetapi kesimpulannya konsisten: kode yang ditulis hari ini akan jauh lebih lama **dibaca dan diubah** daripada ditulis.

**Bau kode**

Bau kode (*code smell*) adalah tanda di permukaan yang **mungkin** menunjuk masalah struktur. Program mengukur fungsi \`proses\` yang menghitung nilai akhir mahasiswa:

| | Sebelum | Sesudah |
|---|---|---|
| fungsi | 1 | 3 |
| baris fungsi terpanjang | 30 | 5 |
| parameter terbanyak | 8 | 4 |
| sarang terdalam | 4 | 2 |
| blok kembar | baris 7 dan 17 | tidak ada |

Sebelum refactoring, satu fungsi melanggar ketiga batas sekaligus. Delapan parameter — termasuk \`nama\`, \`nim\`, \`semester\`, dan \`cetak\` yang tidak dipakai dalam perhitungan. Empat tingkat if bersarang. Dan rantai if-elif penentu huruf mutu ditulis **dua kali**, persis sama.

Sesudah refactoring: tiga fungsi kecil. \`huruf_dari\` memakai tabel batas, \`nilai_akhir\` memilih rumus, \`proses\` memeriksa syarat lalu keluar lebih awal.

**Membuktikan perilakunya sama**

| | |
|---|---|
| kasus uji dicoba | 240 |
| hasil yang berbeda | **0** |

Program menjalankan fungsi lama dan baru pada 240 kombinasi kehadiran, UTS, UAS, dan tugas — termasuk nilai kosong — dan membandingkan hasilnya. Tidak ada satu pun yang berbeda.

Tanpa pembuktian ini, "merapikan kode" hanyalah menulis ulang, dengan semua risiko bug baru yang dibawa penulisan ulang.

**Perilaku aneh yang sengaja dipertahankan**

| Masukan | Hasil |
|---|---|
| UTS 90, UAS 90, tugas tidak dikumpulkan | 90,0 — A |
| UTS 90, UAS 90, tugas bernilai 0 | 63,0 — C |

Mahasiswa yang **tidak mengumpulkan** tugas mendapat A, sedangkan yang mengumpulkan dengan nilai 0 mendapat C. Itu hampir pasti bug — atau aturan yang tidak pernah dipikirkan.

Refactoring **tidak** memperbaikinya, dan itu disengaja. Kode baru mempertahankan perilaku yang sama persis, termasuk yang aneh. Memperbaikinya adalah keputusan tentang aturan penilaian — yang harus disetujui dosen pengampu — dan perubahan terpisah dengan uji barunya sendiri.

Aturannya: **satu commit mengubah bentuk, commit lain mengubah perilaku.** Kalau keduanya dicampur dan ada yang salah, tidak ada yang bisa tahu bagian mana penyebabnya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def kedalaman(node, d=0):\n    terdalam = d\n    for bidang, nilai in ast.iter_fields(node):\n        for c in (nilai if isinstance(nilai, list) else [nilai]):\n            if not isinstance(c, ast.AST):\n                continue\n            # elif disimpan AST sebagai If di dalam orelse -> bukan tingkat baru\n            elif_ = (isinstance(node, ast.If) and bidang == 'orelse'\n                     and len(node.orelse) == 1 and isinstance(c, ast.If))\n            naik = isinstance(c, (ast.If, ast.For, ast.While)) and not elif_\n            terdalam = max(terdalam, kedalaman(c, d + naik))\n    return terdalam",
      penjelasan: `Mengukur kedalaman sarang dengan membaca pohon sintaks Python — dan satu jebakan yang membuat versi pertama pengukur ini salah.

**Kode sebagai pohon.**

\`ast.parse\` mengubah teks kode menjadi pohon: fungsi berisi pernyataan, pernyataan if berisi syarat, badan, dan cabang else. Mengukur kode lewat pohon jauh lebih andal daripada lewat teks — tidak tertipu komentar, spasi, atau string yang kebetulan berisi kata "if".

Pengukur ini menelusuri pohon secara rekursif, dan setiap kali masuk ke if, for, atau while, kedalamannya bertambah satu.

**Jebakannya: elif.**

Python menulis \`if ... elif ... elif ... else\` sebagai satu rantai di layar. Tetapi di pohon sintaks, **tidak ada** simpul elif. Setiap elif disimpan sebagai if baru di dalam cabang else if sebelumnya.

Versi pertama pengukur ini tidak tahu itu. Ia menghitung rantai if-elif-elif sebagai tiga tingkat sarang, dan melaporkan kedalaman 6 untuk fungsi yang di layar terlihat bersarang 4 tingkat. Detektor blok kembarnya juga melaporkan tiga pasangan untuk satu blok yang sama, karena setiap elif terbaca sebagai if tersendiri.

**Perbaikannya.**

If yang merupakan **satu-satunya** isi cabang else if lain adalah elif — atau setidaknya, setara dengan elif. Pengukur tidak menambah kedalaman untuk if seperti itu. Hasilnya: 4, sesuai yang terlihat mata.

**Pelajaran yang lebih luas.**

Alat pengukur kode sendiri adalah kode, dan bisa salah dengan cara yang sama halusnya dengan kode yang diukurnya. Cara menangkapnya sama: bandingkan hasilnya dengan contoh yang jawabannya sudah diketahui. Pengukur kedalaman yang melaporkan 6 untuk fungsi yang jelas bersarang 4 adalah tanda ada yang keliru — di pengukurnya, bukan di fungsinya.

Alat sungguhan seperti pylint, flake8 dengan pengaya, atau radon mengukur hal-hal serupa dan sudah menangani kasus seperti ini. Menulis pengukur sendiri berguna untuk memahami apa yang diukur alat-alat itu — dan kapan hasilnya perlu dicurigai.`
    },
    {
      bahasa: 'python',
      kode: "lama = lambda uts, uas, tugas, hadir: ruang_lama['proses'](\n    'x', 'x', uts, uas, tugas, hadir, 5, False)\nbaru = ruang_baru['proses']\n\nKASUS = [(uts, uas, tugas, hadir)\n         for hadir in [10, 12, 14]\n         for uts in [None, 40, 60, 85, 100]\n         for uas in [None, 50, 70, 90]\n         for tugas in [None, 55, 80, 100]]\nbeda = [k for k in KASUS if lama(*k) != baru(*k)]\n# 240 kasus, 0 berbeda",
      penjelasan: `Uji pembanding: cara membuktikan refactoring tidak mengubah perilaku, bahkan untuk kode yang tidak punya uji sama sekali.

**Masalahnya.**

Kode lama jarang punya uji. Kalau tidak ada uji, bagaimana tahu refactoring tidak merusak apa pun? Menulis uji biasa butuh tahu **seharusnya** hasilnya berapa — dan untuk kode warisan, sering tidak ada yang tahu pasti.

**Jalan keluarnya: kode lama adalah jawabannya.**

Uji pembanding tidak bertanya "apakah hasilnya benar?", melainkan "apakah hasilnya **sama** dengan kode lama?". Kode lama menjadi acuan — termasuk kesalahannya. Dengan begitu, uji bisa ditulis tanpa memahami aturan bisnisnya lebih dulu.

**Memilih masukan.**

Masukan dipilih untuk menyentuh setiap batas dan setiap cabang:

- kehadiran 10, 12, 14 — di bawah, tepat di, dan di atas batas 12
- nilai None — cabang untuk nilai kosong
- nilai di sekitar batas huruf mutu, sampai 100

Semua kombinasinya: 3 × 5 × 4 × 4 = 240. Ini gagasan yang sama dengan analisis nilai batas di topik pengujian, dikalikan untuk setiap masukan.

**Menyesuaikan tanda tangan fungsi.**

Fungsi lama menerima delapan parameter; yang baru empat. \`lambda\` \`lama\` membungkus fungsi lama dengan parameter yang tidak berpengaruh ke hasil — nama, NIM, semester, dan cetak=False — sehingga keduanya bisa dipanggil dengan masukan yang sama.

Perhatikan bahwa \`cetak=False\` penting: fungsi lama mencetak ke layar kalau cetak benar, dan uji pembanding harus membandingkan **hasil**, bukan efek samping. Kalau efek sampingnya juga harus dipertahankan, uji pembandingnya harus menangkap keluaran cetak juga.

**Hasilnya.**

240 kasus, 0 berbeda. Itu bukan bukti matematis bahwa kedua fungsi sama untuk **semua** masukan — ada tak hingga kemungkinan nilai. Tetapi dengan masukan yang dipilih di setiap batas dan setiap cabang, kemungkinan ada perbedaan yang lolos sangat kecil. Itu tingkat keyakinan yang cukup untuk melanjutkan — dan jauh lebih besar dari "sepertinya sama".`
    }
  ],

  kode: { python: String.raw`# ============================================
# Pemeliharaan: mengenali code smell, refactoring yang aman
# ============================================
import ast

SEBELUM = '''
def proses(nama, nim, uts, uas, tugas, hadir, semester, cetak):
    if hadir >= 12:
        if uts is not None and uas is not None:
            if tugas is not None:
                akhir = 0.3 * uts + 0.4 * uas + 0.3 * tugas
                if akhir >= 85:
                    huruf = "A"
                elif akhir >= 70:
                    huruf = "B"
                elif akhir >= 55:
                    huruf = "C"
                else:
                    huruf = "D"
            else:
                akhir = 0.4 * uts + 0.6 * uas
                if akhir >= 85:
                    huruf = "A"
                elif akhir >= 70:
                    huruf = "B"
                elif akhir >= 55:
                    huruf = "C"
                else:
                    huruf = "D"
        else:
            akhir, huruf = 0, "E"
    else:
        akhir, huruf = 0, "E"
    if cetak:
        print(nama, nim, semester, akhir, huruf)
    return round(akhir, 2), huruf
'''

SESUDAH = '''
BATAS = [(85, "A"), (70, "B"), (55, "C")]

def huruf_dari(akhir):
    for batas, huruf in BATAS:
        if akhir >= batas:
            return huruf
    return "D"

def nilai_akhir(uts, uas, tugas):
    if tugas is None:
        return 0.4 * uts + 0.6 * uas
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas

def proses(uts, uas, tugas, hadir):
    if hadir < 12 or uts is None or uas is None:
        return 0, "E"
    akhir = nilai_akhir(uts, uas, tugas)
    return round(akhir, 2), huruf_dari(akhir)
'''

def kedalaman(node, d=0):
    """Tingkat sarang if/for/while terdalam. 'elif' disimpan AST sebagai
    If di dalam orelse; ia TIDAK dihitung sebagai tingkat baru."""
    terdalam = d
    for bidang, nilai in ast.iter_fields(node):
        for c in (nilai if isinstance(nilai, list) else [nilai]):
            if not isinstance(c, ast.AST):
                continue
            elif_ = (isinstance(node, ast.If) and bidang == "orelse"
                     and len(node.orelse) == 1 and isinstance(c, ast.If))
            naik = isinstance(c, (ast.If, ast.For, ast.While)) and not elif_
            terdalam = max(terdalam, kedalaman(c, d + naik))
    return terdalam

def periksa(sumber):
    pohon = ast.parse(sumber)
    laporan = []
    for f in [n for n in ast.walk(pohon) if isinstance(n, ast.FunctionDef)]:
        panjang = f.end_lineno - f.lineno + 1
        laporan.append((f.name, panjang, len(f.args.args), kedalaman(f)))
    # blok kembar: pernyataan if yang struktur AST-nya sama persis.
    # 'elif' adalah bagian dari if di atasnya, jadi tidak dihitung sendiri.
    elif_ = {id(n.orelse[0]) for n in ast.walk(pohon)
             if isinstance(n, ast.If) and len(n.orelse) == 1
             and isinstance(n.orelse[0], ast.If)}
    jejak = {}
    for n in ast.walk(pohon):
        if isinstance(n, ast.If) and id(n) not in elif_:
            jejak.setdefault(ast.dump(n), []).append(n.lineno)
    kembar = [baris for baris in jejak.values() if len(baris) > 1]
    return laporan, kembar

# --------------------------------------------
# 1. Mengukur bau kode
# --------------------------------------------
BATAS_BAU = {"panjang": 25, "parameter": 5, "sarang": 3}
for judul, sumber in [("SEBELUM", SEBELUM), ("SESUDAH", SESUDAH)]:
    laporan, kembar = periksa(sumber)
    print("--- " + judul + " refactoring ---")
    print("  fungsi          baris  parameter  sarang  bau")
    for nama, panjang, param, sarang in laporan:
        bau = []
        if panjang > BATAS_BAU["panjang"]:
            bau.append("fungsi panjang")
        if param > BATAS_BAU["parameter"]:
            bau.append("parameter banyak")
        if sarang > BATAS_BAU["sarang"]:
            bau.append("sarang dalam")
        print("  " + format(nama, "<15") + format(panjang, ">6") + format(param, ">11")
              + format(sarang, ">8") + "  " + ("ya" if bau else "-"))
        if bau:
            print("    -> " + ", ".join(bau))
    print("  blok kembar: " + (", ".join("baris " + " & ".join(map(str, b)) for b in kembar)
                               if kembar else "tidak ada"))
    print()

print("  Batas (25 baris, 5 parameter, 3 tingkat) adalah pedoman,")
print("  bukan hukum -- gunanya menunjuk tempat yang layak dilihat.")

# --------------------------------------------
# 2. Refactoring harus mempertahankan perilaku
# --------------------------------------------
ruang_lama, ruang_baru = {}, {}
exec(SEBELUM, ruang_lama)
exec(SESUDAH, ruang_baru)
lama = lambda uts, uas, tugas, hadir: ruang_lama["proses"](
    "x", "x", uts, uas, tugas, hadir, 5, False)
baru = ruang_baru["proses"]

KASUS = []
for hadir in [10, 12, 14]:
    for uts in [None, 40, 60, 85, 100]:
        for uas in [None, 50, 70, 90]:
            for tugas in [None, 55, 80, 100]:
                KASUS.append((uts, uas, tugas, hadir))
beda = [k for k in KASUS if lama(*k) != baru(*k)]
print("\n--- apakah perilakunya sama? ---")
print("  kasus uji dicoba    : " + str(len(KASUS)))
print("  hasil yang berbeda  : " + str(len(beda)))
print("  Refactoring mengubah BENTUK kode, bukan perilakunya. Tanpa")
print("  uji yang membandingkan sebelum dan sesudah, 'merapikan kode'")
print("  adalah menulis ulang dengan risiko bug baru.")

# --------------------------------------------
# 3. Kenapa perilaku lama harus dipertahankan -- bahkan yang aneh
# --------------------------------------------
print("\n--- perilaku lama yang ternyata aneh ---")
print("  proses(uts=90, uas=90, tugas=None, hadir=12) -> "
      + str(baru(90, 90, None, 12)))
print("  proses(uts=90, uas=90, tugas=0,    hadir=12) -> "
      + str(baru(90, 90, 0, 12)))
print("  Tugas yang TIDAK dikumpulkan (None) memakai rumus 40/60 dan")
print("  mendapat A; tugas yang dikumpulkan dengan nilai 0 mendapat C.")
print("  Itu mungkin bug -- tetapi refactoring tidak memperbaikinya.")
print("  Perbaikan perilaku adalah perubahan TERPISAH, dengan uji dan")
print("  persetujuannya sendiri.")` },
  output: `--- SEBELUM refactoring ---
  fungsi          baris  parameter  sarang  bau
  proses             30          8       4  ya
    -> fungsi panjang, parameter banyak, sarang dalam
  blok kembar: baris 7 & 17

--- SESUDAH refactoring ---
  fungsi          baris  parameter  sarang  bau
  huruf_dari          5          1       2  -
  nilai_akhir         4          3       1  -
  proses              5          4       1  -
  blok kembar: tidak ada

  Batas (25 baris, 5 parameter, 3 tingkat) adalah pedoman,
  bukan hukum -- gunanya menunjuk tempat yang layak dilihat.

--- apakah perilakunya sama? ---
  kasus uji dicoba    : 240
  hasil yang berbeda  : 0
  Refactoring mengubah BENTUK kode, bukan perilakunya. Tanpa
  uji yang membandingkan sebelum dan sesudah, 'merapikan kode'
  adalah menulis ulang dengan risiko bug baru.

--- perilaku lama yang ternyata aneh ---
  proses(uts=90, uas=90, tugas=None, hadir=12) -> (90.0, 'A')
  proses(uts=90, uas=90, tugas=0,    hadir=12) -> (63.0, 'C')
  Tugas yang TIDAK dikumpulkan (None) memakai rumus 40/60 dan
  mendapat A; tugas yang dikumpulkan dengan nilai 0 mendapat C.
  Itu mungkin bug -- tetapi refactoring tidak memperbaikinya.
  Perbaikan perilaku adalah perubahan TERPISAH, dengan uji dan
  persetujuannya sendiri.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Mengurai kode menjadi pohon sintaks', waktu: 'O(panjang kode)', memori: 'O(banyaknya simpul)' },
      { operasi: 'Mengukur semua fungsi', waktu: 'O(simpul)', memori: 'O(kedalaman) untuk rekursi' },
      { operasi: 'Mencari blok kembar lewat ast.dump', waktu: 'O(simpul · ukuran blok)', memori: 'kamus teks pohon' },
      { operasi: 'Uji pembanding k masukan', waktu: 'O(k) pemanggilan per versi', memori: 'O(k)' }
    ],
    intuisi: `Semua pengukuran ini lurus dengan ukuran kode, sehingga bisa dijalankan pada seluruh repo setiap kali ada commit. Mencari blok kembar dengan membandingkan teks pohon lebih mahal, karena setiap blok if diubah menjadi teks panjang — tetapi untuk ukuran projek kuliah masih seketika.

Yang menentukan biaya uji pembanding adalah banyaknya masukan, yang tumbuh sebagai hasil kali pilihan setiap parameter: 3 × 5 × 4 × 4 = 240. Dengan lebih banyak parameter atau nilai, jumlahnya meledak. Karena itu masukan dipilih di batas-batas yang bermakna, bukan semua nilai — dan untuk parameter yang banyak, masukan acak dalam jumlah besar menjadi pelengkap yang baik.`
  },

  kesalahanUmum: [
    {
      salah: 'Memperbaiki bug sambil melakukan refactoring dalam satu commit.',
      kenapa: 'Kalau perilakunya berubah, tidak ada yang bisa membedakan perubahan yang disengaja dari perubahan akibat refactoring yang salah. Uji pembanding juga tidak bisa lagi dipakai.',
      benar: 'Refactoring dulu sampai uji pembanding lulus tanpa perbedaan, lalu perbaiki bug di commit terpisah dengan uji barunya.'
    },
    {
      salah: 'Melakukan refactoring besar tanpa uji apa pun.',
      kenapa: 'Tanpa uji, tidak ada bukti bahwa perilakunya tetap sama. Refactoring berubah menjadi penulisan ulang dengan risiko bug baru yang tidak terdeteksi.',
      benar: 'Tulis uji pembanding yang memakai kode lama sebagai acuan sebelum mengubah apa pun.'
    },
    {
      salah: 'Menganggap batas bau kode sebagai aturan mutlak.',
      kenapa: 'Fungsi 30 baris yang lurus dan mudah dibaca bisa lebih baik dari tiga fungsi kecil yang saling melompat. Batas hanya menunjuk tempat yang layak diperiksa.',
      benar: 'Pakai angka untuk menemukan kandidat, lalu putuskan dengan membaca kodenya.'
    },
    {
      salah: 'Mengukur kode dengan mencari teks, misalnya menghitung kata "if".',
      kenapa: 'Pencarian teks tertipu komentar, string, dan nama variabel, dan tidak tahu struktur sarang.',
      benar: 'Pakai pohon sintaks lewat modul ast, dan perhatikan cara bahasanya menyimpan konstruksi seperti elif.'
    },
    {
      salah: 'Menunda pemeliharaan preventif sampai ada waktu luang.',
      kenapa: 'Waktu luang jarang datang, sementara setiap perubahan korektif dan perfektif pada kode yang tidak dirawat makin mahal. Utang teknis bertambah seperti bunga.',
      benar: 'Sisihkan porsi tetap dari setiap iterasi untuk pekerjaan preventif, dan rapikan kode yang sedang disentuh untuk perubahan lain.'
    },
    {
      salah: 'Menghapus parameter yang tampak tidak terpakai tanpa memeriksa pemanggilnya.',
      kenapa: 'Parameter seperti nama dan NIM mungkin tidak dipakai dalam perhitungan tetapi dipakai untuk mencetak, dan pemanggil lain di kode masih mengirimkannya.',
      benar: 'Cari semua pemanggil, pindahkan tanggung jawab seperti mencetak ke tempat yang sesuai, lalu ubah tanda tangan fungsi dan semua pemanggilnya bersama.'
    }
  ],

  analogi: `Bayangkan kamu mewarisi **dapur rumah makan** dari pemilik lama.

**Empat jenis pemeliharaan.** Kompor bocor — kamu memperbaikinya (korektif). Pemerintah mewajibkan tabung gas jenis baru — kamu menyesuaikan sambungannya (adaptif). Pelanggan minta menu sarapan — kamu menambah peralatan (perfektif). Rak-rak mulai miring — kamu menguatkannya sebelum roboh (preventif). Yang terakhir paling mudah ditunda, dan paling mahal kalau terlambat.

**Bau kode.** Kamu melihat resep sambal ditulis di dua tempat berbeda di buku resep, sama persis. Setiap kali resepnya diubah, harus diubah di dua tempat — dan suatu hari seseorang akan lupa satu. Kamu juga melihat satu resep yang panjangnya lima halaman, dengan "kalau cabainya habis, kalau pelanggan minta tidak pedas, kalau hari Jumat..." bersarang di dalam satu sama lain.

**Refactoring.** Kamu menyalin ulang buku resep supaya lebih rapi: resep sambal ditulis sekali dan dirujuk dari tempat lain, resep lima halaman dipecah. Tetapi rasa masakannya **harus sama persis**. Pelanggan tetap tidak boleh merasakan perbedaan apa pun.

Bagaimana memastikannya? Kamu memasak setiap menu dengan resep lama dan resep baru, lalu mencicipinya berdampingan. Itu uji pembanding.

**Perilaku aneh.** Saat menyalin, kamu menemukan: resep lama menambah gula kalau pelanggan **tidak** memesan minuman. Aneh — mungkin kesalahan. Tetapi pelanggan lama sudah terbiasa dengan rasa itu. Kamu tidak mengubahnya sambil menyalin. Kamu mencatatnya, lalu membicarakannya dengan pemilik — dan kalau memang diubah, perubahan itu dicoba terpisah, supaya kalau pelanggan mengeluh, kamu tahu persis penyebabnya.`,

  latihan: [
    'Golongkan lima permintaan perubahan berikut ke empat jenis pemeliharaan: ganti logo, perbaiki nilai negatif, pindah ke Python 3.12, tambah ekspor Excel, tambah uji untuk modul login.',
    'Jalankan pengukur bau kode dari program ini pada satu berkas Python dari projekmu.',
    'Tulis fungsi dengan rantai if-elif lima cabang, lalu tunjukkan kedalaman yang diukur sebelum dan sesudah penanganan elif diperbaiki.',
    'Cari satu blok kode kembar di projekmu dan pindahkan ke satu fungsi.',
    'Tulis uji pembanding untuk satu fungsi di projekmu sebelum mengubahnya, lalu lakukan satu langkah refactoring dan jalankan ujinya.',
    'Tambahkan pengukuran "banyaknya return" ke pengukur bau kode.',
    'Perbaiki perilaku aneh tugas yang tidak dikumpulkan di commit terpisah, dengan uji baru yang menyatakan aturan yang kamu anggap benar.',
    'Jelaskan kenapa uji pembanding dengan 240 kasus bukan bukti matematis, dan bagaimana memilih masukan supaya keyakinannya tinggi.',
    'Tulis ulang fungsi proses supaya mencetak dilakukan oleh pemanggil, bukan oleh fungsi itu sendiri.',
    'Pasang radon atau pylint di projekmu dan bandingkan hasil pengukurannya dengan pengukur buatanmu.'
  ]
});


TOPICS.push({
  id: 'rpl-metrik-desain',
  judul: 'Metrik Desain — Fan-in, Fan-out & Ketidakstabilan',
  kategori: 'rpl',
  tag: ['metrik desain', 'fan-in', 'fan-out', 'ketidakstabilan', 'SDP', 'siklus dependensi', 'abstraksi'],
  ringkas: 'Mengubah "coupling rendah" dari nasihat menjadi angka: siapa bergantung pada siapa, modul mana yang mahal diubah, dan satu baris import yang diam-diam mengikat empat modul menjadi satu.',

  fungsi: `**Mengukur struktur ketergantungan antar-modul dengan angka, supaya masalah desain terlihat sebelum terasa.**

Topik perancangan membahas coupling dan cohesion sebagai prinsip. Topik ini mengukurnya: dari daftar \`import\` setiap modul, hitung berapa yang bergantung padanya, berapa yang ia pakai, dan seberapa aman ia diubah.

Terpakai di:

- **Tinjauan arsitektur** — modul mana yang menjadi pusat dan paling mahal diubah
- **Merencanakan perubahan** — mengubah modul yang dipakai banyak modul lain butuh kehati-hatian dan uji yang lebih banyak
- **Menemukan siklus dependensi** — modul-modul yang saling mengimpor tidak bisa diuji, dipakai ulang, atau diubah sendiri-sendiri
- **Menjaga arsitektur berlapis** — tampilan → pengendali → layanan → repositori tetap searah

Yang paling penting dipahami: **modul yang banyak dipakai harus stabil — dan untuk itu sebaiknya abstrak.** Mengubah modul yang dipakai empat modul lain berarti mungkin mengubah lima modul.

Dan yang paling berbahaya: **siklus.** Satu baris import yang tampak wajar bisa menutup lingkaran dan mengikat empat modul menjadi satu gumpalan.`,

  praktik: {
    tujuan: 'Kamu bisa menyusun graf dependensi modul, menghitung fan-in, fan-out, dan ketidakstabilan, memeriksa prinsip ketergantungan stabil, menemukan siklus dengan DFS, dan menafsirkan jarak dari garis utama.',
    alat: ['Python 3', 'Daftar import dari projekmu sendiri'],
    langkah: [
      { judul: 'Susun graf dependensi',
        isi: `Untuk setiap modul, daftar modul lain di projek yang ia impor. Abaikan pustaka standar dan pustaka luar — yang diukur adalah struktur kodemu sendiri.` },
      { judul: 'Hitung fan-in dan fan-out',
        isi: `**Fan-in** (Ca): berapa modul yang mengimpor modul ini. **Fan-out** (Ce): berapa modul yang diimpor modul ini.

Fan-in tinggi berarti banyak yang bergantung padanya. Fan-out tinggi berarti ia bergantung pada banyak hal.` },
      { judul: 'Hitung ketidakstabilan',
        isi: `I = Ce / (Ca + Ce), antara 0 dan 1. I = 0: stabil — banyak dipakai, tidak memakai apa-apa, mahal diubah. I = 1: labil — memakai banyak, tidak dipakai siapa pun, murah diubah.` },
      { judul: 'Periksa prinsip ketergantungan stabil',
        isi: `Setiap dependensi seharusnya mengarah ke modul yang **lebih** stabil — I-nya lebih kecil. Modul stabil yang bergantung pada modul labil ikut terguncang setiap kali modul labil itu berubah.

Cetak semua pelanggaran, lalu fokus pada yang selisihnya besar.` },
      { judul: 'Cari siklus',
        isi: `Jalankan DFS dengan tiga warna: putih belum dikunjungi, abu sedang di jalur, hitam selesai. Menemukan tetangga abu berarti menemukan siklus. Setiap siklus harus diputus — biasanya dengan memindahkan bagian yang dipakai bersama ke modul baru, atau dengan antarmuka.` },
      { judul: 'Bandingkan abstraksi dan stabilitas',
        isi: `A = bagian kelas atau fungsi abstrak di modul. Jarak dari garis utama D = |A + I − 1|. Modul stabil sebaiknya abstrak (A tinggi, I rendah); modul labil sebaiknya konkret. D besar menunjuk modul yang posisinya janggal.` }
    ],
    cek: [
      'Kamu punya tabel fan-in, fan-out, dan I untuk setiap modul projekmu',
      'Kamu bisa menunjuk modul yang paling mahal diubah dan menjelaskan alasannya dengan angka',
      'Projekmu tidak punya siklus dependensi, atau kamu tahu cara memutusnya',
      'Kamu memakai angka untuk menunjuk kandidat perbaikan, bukan sebagai nilai akhir'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa arah ketergantungan penting',

  konsep: `Topik perancangan memberi aturan yang layak dihafal: coupling rendah, cohesion tinggi. Masalahnya, "rendah" dan "tinggi" sulit diperiksa hanya dengan membaca kode. Robert C. Martin mengusulkan sekumpulan metrik yang mengubah aturan itu menjadi angka, dihitung cukup dari daftar \`import\`.

**Graf dependensi**

Aplikasi peminjaman ruang punya sebelas modul, tersusun berlapis: tampilan → pengendali → layanan → repositori dan notifikasi → model, koneksi, email → konfigurasi.

**Fan-in, fan-out, ketidakstabilan**

| Modul | Fan-in (Ca) | Fan-out (Ce) | I |
|---|---|---|---|
| model | 4 | 0 | 0,00 |
| konfigurasi | 2 | 0 | 0,00 |
| format | 1 | 0 | 0,00 |
| validasi | 1 | 1 | 0,50 |
| koneksi | 1 | 1 | 0,50 |
| email | 1 | 1 | 0,50 |
| pengendali | 1 | 2 | 0,67 |
| repositori | 1 | 2 | 0,67 |
| notifikasi | 1 | 2 | 0,67 |
| layanan | 1 | 3 | 0,75 |
| tampilan | 0 | 2 | 1,00 |

**I = Ce / (Ca + Ce)** mengukur seberapa "bebas bergerak" sebuah modul.

- **model** I = 0: dipakai empat modul, tidak memakai apa pun. Setiap perubahan di model bisa memaksa keempat pemakainya ikut berubah — mahal. Modul seperti ini disebut **stabil**: bukan karena jarang berubah, melainkan karena **mahal** untuk diubah.
- **tampilan** I = 1: memakai dua modul, tidak dipakai siapa pun. Mengubahnya tidak merusak modul lain — murah. Modul **labil**.

Aplikasi yang sehat punya keduanya: inti yang stabil, dan pinggiran yang labil tempat perubahan sehari-hari terjadi.

**Prinsip ketergantungan stabil (SDP)**

Setiap dependensi seharusnya mengarah ke modul yang lebih stabil. Kalau modul yang stabil bergantung pada modul yang labil, perubahan di yang labil — yang memang sering terjadi — menjalar ke yang stabil, dan dari sana ke semua pemakainya.

Desain awal punya satu pelanggaran kecil: pengendali (I = 0,67) bergantung ke layanan (I = 0,75). Selisihnya cuma 0,08. Pelanggaran sekecil ini wajar dan tidak perlu dikejar; metrik ini gunanya menemukan yang **besar**.

**Abstraksi dan stabilitas harus seiring**

| Modul | A (abstrak) | I | D = abs(A + I − 1) |
|---|---|---|---|
| model | 0,10 | 0,00 | **0,90** |
| repositori | 0,80 | 0,67 | 0,47 |
| notifikasi | 0,50 | 0,67 | 0,17 |

Modul yang stabil — banyak dipakai — sebaiknya **abstrak**: berisi antarmuka dan kelas abstrak yang jarang berubah, sementara implementasinya ada di modul lain yang lebih labil. Modul yang labil boleh konkret. Garis A + I = 1 disebut **garis utama**, dan D mengukur jarak dari garis itu.

Model punya D = 0,90: sangat stabil (I = 0) tetapi hampir tanpa abstraksi (A = 0,10). Setiap perubahan di model menjalar ke 4 modul pemakainya, dan tidak ada antarmuka yang menahannya. Itu kandidat perbaikan pertama.

**Satu baris import yang merusak**

Seseorang ingin konfigurasi membaca satu nilai dari layanan, dan menambah satu baris: konfigurasi mengimpor layanan. Program menemukan:

- **siklus**: layanan → repositori → koneksi → konfigurasi → layanan
- **pelanggaran SDP**: konfigurasi (I = 0,33) bergantung ke layanan (I = 0,60), serta dua pelanggaran kecil baru dari layanan ke repositori dan notifikasi

Pelanggaran SDP bergeser — layanan mendapat pemakai baru sehingga I-nya turun dari 0,75 ke 0,60, dan pelanggaran lama pengendali → layanan justru hilang. Tetapi yang benar-benar berbahaya adalah **siklusnya**. Empat modul kini tidak bisa diuji, dipakai ulang, atau dipahami sendiri-sendiri: menguji konfigurasi butuh layanan, yang butuh repositori, yang butuh koneksi, yang butuh konfigurasi.

Satu baris \`import\` sudah cukup untuk membuatnya — dan tanpa pemeriksaan otomatis, siklus seperti ini biasanya baru ketahuan saat seseorang mencoba menulis uji untuk salah satu modulnya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def metrik(impor):\n    ca = {m: 0 for m in impor}              # fan-in\n    for m, tujuan in impor.items():\n        for t in tujuan:\n            ca[t] += 1\n    hasil = {}\n    for m in impor:\n        ce = len(impor[m])                  # fan-out\n        I = ce / (ca[m] + ce) if ca[m] + ce else 0.0\n        hasil[m] = (ca[m], ce, I)\n    return hasil\n\ndef pelanggaran_sdp(impor, M):\n    # bergantunglah ke modul yang LEBIH stabil (I lebih kecil)\n    return [(m, t) for m in impor for t in impor[m]\n            if M[t][2] > M[m][2]]",
      penjelasan: `Dua fungsi yang mengubah daftar \`import\` menjadi angka-angka arsitektur.

**Fan-out itu gratis, fan-in harus dihitung.**

Fan-out sebuah modul langsung terlihat di atas berkasnya: daftar \`import\`-nya. Fan-in tidak terlihat dari modul itu sendiri — ia harus dikumpulkan dari **semua** modul lain. Itu sebabnya \`ca\` dihitung lebih dulu dengan menyisir seluruh graf, dan baru sesudahnya setiap modul punya kedua angka.

Ketimpangan ini juga menjelaskan kenapa masalah stabilitas sering tidak terasa oleh penulis modul: saat menulis \`model.py\`, kamu tidak melihat empat modul lain yang bergantung padanya.

**I sebagai perbandingan.**

I = Ce / (Ca + Ce) adalah bagian dari semua hubungan sebuah modul yang berupa "aku memakai", bukan "aku dipakai". Modul yang hanya memakai — tampilan — mendapat 1. Modul yang hanya dipakai — model — mendapat 0.

Modul yang tidak punya hubungan sama sekali mendapat 0 karena pembaginya nol. Modul seperti itu jarang ada di projek sungguhan, dan kalau ada, biasanya kode mati.

**Kenapa arah dependensi yang penting, bukan jumlahnya.**

\`pelanggaran_sdp\` memeriksa setiap panah: apakah tujuannya lebih stabil dari asalnya? Pertanyaannya bukan "berapa banyak dependensi" — aplikasi berlapis memang penuh dependensi — melainkan "ke mana arahnya".

Dependensi dari yang labil ke yang stabil aman: yang labil sering berubah, yang stabil jarang, dan perubahan tidak menjalar ke arah yang salah. Dependensi dari yang stabil ke yang labil berbahaya: setiap perubahan di yang labil mengancam yang stabil, dan semua yang bergantung pada yang stabil.

**Batas metrik ini.**

Metrik ini menghitung **modul**, tidak menimbang **seberapa banyak** yang dipakai dari setiap modul. Modul yang mengimpor satu konstanta dari modul lain dihitung sama dengan modul yang memakai puluhan fungsinya. Karena itu hasilnya adalah petunjuk tempat yang perlu dilihat, bukan nilai rapor.

Martin sendiri merumuskan metrik ini untuk **paket** — kumpulan kelas yang dirilis bersama — bukan untuk berkas tunggal. Memakainya pada modul Python atau folder di projek PHP tetap berguna, asalkan diingat bahwa satuannya harus konsisten.`
    },
    {
      bahasa: 'python',
      kode: "def cari_siklus(impor):\n    PUTIH, ABU, HITAM = 0, 1, 2\n    warna = {m: PUTIH for m in impor}\n    jalur, siklus = [], []\n    def dfs(m):\n        warna[m] = ABU                     # sedang di jalur\n        jalur.append(m)\n        for t in impor[m]:\n            if warna[t] == ABU:            # kembali ke jalur sendiri\n                siklus.append(jalur[jalur.index(t):] + [t])\n            elif warna[t] == PUTIH:\n                dfs(t)\n        jalur.pop()\n        warna[m] = HITAM                   # selesai, tidak ada siklus lewat sini\n    for m in impor:\n        if warna[m] == PUTIH:\n            dfs(m)\n    return siklus",
      penjelasan: `DFS tiga warna dari topik graf, dipakai untuk menemukan siklus dependensi — dan kenapa dua warna saja tidak cukup.

**Tiga warna.**

- **Putih**: belum pernah dikunjungi.
- **Abu**: sedang dikunjungi — ada di jalur dari akar DFS sampai ke titik sekarang.
- **Hitam**: sudah selesai — semua yang bisa dicapai darinya sudah diperiksa.

Siklus ditemukan tepat ketika DFS menemukan tetangga yang **abu**: modul yang sedang berada di jalur kita sendiri. Artinya kita bisa berjalan dari modul itu, lewat jalur sekarang, dan kembali ke modul itu lagi.

**Kenapa hitam tidak dihitung sebagai siklus.**

Bayangkan tampilan dan pengendali sama-sama mengimpor format. DFS dari tampilan mengunjungi format dan menandainya hitam. Lalu DFS dari pengendali menemukan format lagi — sudah dikunjungi, tetapi **hitam**. Itu bukan siklus; dua jalan menuju modul yang sama, bukan satu jalan yang kembali ke dirinya.

Dengan dua warna — dikunjungi atau belum — kedua kasus itu tidak bisa dibedakan, dan setiap modul yang dipakai bersama akan salah dilaporkan sebagai siklus.

**Merekam siklusnya.**

\`jalur\` menyimpan urutan modul dari akar sampai sekarang. Saat tetangga abu t ditemukan, potongan jalur dari t sampai sekarang — ditambah t lagi — adalah siklusnya: layanan → repositori → koneksi → konfigurasi → layanan.

**Memutus siklus.**

Menemukan siklus cuma setengah pekerjaan. Cara memutusnya yang lazim:

- **Pindahkan yang dipakai bersama** ke modul baru yang tidak mengimpor siapa pun. Kalau konfigurasi butuh satu nilai dari layanan, mungkin nilai itu seharusnya memang milik konfigurasi.
- **Balik arah dengan antarmuka.** Modul yang stabil mendefinisikan antarmuka; modul yang labil mengimplementasikannya. Itu huruf D di SOLID — *dependency inversion* — dari topik perancangan, dan di sini terlihat gunanya dengan angka.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Metrik desain: fan-in, fan-out, ketidakstabilan, siklus
# ============================================

# Aplikasi peminjaman ruang: modul -> modul yang ia impor
IMPOR = {
    "tampilan":   ["pengendali", "format"],
    "pengendali": ["layanan", "validasi"],
    "layanan":    ["repositori", "model", "notifikasi"],
    "repositori": ["model", "koneksi"],
    "notifikasi": ["model", "email"],
    "validasi":   ["model"],
    "model":      [],
    "koneksi":    ["konfigurasi"],
    "email":      ["konfigurasi"],
    "format":     [],
    "konfigurasi": [],
}
ABSTRAK = {"repositori": 0.8, "notifikasi": 0.5, "model": 0.1}   # bagian kelas abstrak

def metrik(impor):
    ca = {m: 0 for m in impor}              # fan-in: berapa modul memakai m
    for m, tujuan in impor.items():
        for t in tujuan:
            ca[t] += 1
    hasil = {}
    for m in impor:
        ce = len(impor[m])                  # fan-out: berapa modul dipakai m
        I = ce / (ca[m] + ce) if ca[m] + ce else 0.0
        hasil[m] = (ca[m], ce, I)
    return hasil

def cari_siklus(impor):
    PUTIH, ABU, HITAM = 0, 1, 2
    warna = {m: PUTIH for m in impor}
    jalur, siklus = [], []
    def dfs(m):
        warna[m] = ABU
        jalur.append(m)
        for t in impor[m]:
            if warna[t] == ABU:
                siklus.append(jalur[jalur.index(t):] + [t])
            elif warna[t] == PUTIH:
                dfs(t)
        jalur.pop()
        warna[m] = HITAM
    for m in impor:
        if warna[m] == PUTIH:
            dfs(m)
    return siklus

def pelanggaran_sdp(impor, M):
    """Prinsip ketergantungan stabil: bergantunglah ke yang LEBIH stabil."""
    return [(m, t, M[m][2], M[t][2]) for m in impor for t in impor[m]
            if M[t][2] > M[m][2] + 1e-9]

# --------------------------------------------
# 1. Fan-in, fan-out, ketidakstabilan
# --------------------------------------------
M = metrik(IMPOR)
print("--- metrik per modul ---")
print("  modul         fan-in  fan-out   I = Ce/(Ca+Ce)")
for m, (ca, ce, I) in sorted(M.items(), key=lambda x: x[1][2]):
    print("  " + format(m, "<13") + format(ca, ">7") + format(ce, ">9") + format(I, ">13.2f"))
print()
print("  I = 0: banyak dipakai, tidak memakai apa-apa -- STABIL.")
print("  Mengubahnya mahal, karena semua pemakainya ikut terdampak.")
print("  I = 1: memakai banyak, tidak dipakai siapa pun -- LABIL.")
print("  Mengubahnya murah; tidak ada yang bergantung padanya.")

def tulis_sdp(impor, Mx):
    daftar = pelanggaran_sdp(impor, Mx)
    for m, t, im, it in daftar:
        print("  SDP    : " + m + " (I=" + format(im, ".2f") + ") bergantung ke "
              + t + " (I=" + format(it, ".2f") + ")")
    if not daftar:
        print("  SDP    : tidak ada pelanggaran")

print("\n  prinsip ketergantungan stabil (SDP) di desain awal:")
tulis_sdp(IMPOR, M)
print("  Selisihnya kecil (0,08). Pelanggaran kecil seperti ini wajar;")
print("  yang dicari adalah yang besar, atau yang membentuk siklus.")

# --------------------------------------------
# 2. Jarak dari 'garis utama'
# --------------------------------------------
print("\n--- abstrak dan stabil harus seiring ---")
print("  modul         A (abstrak)     I   D = |A + I - 1|")
for m in ["model", "repositori", "notifikasi"]:
    A, I = ABSTRAK[m], M[m][2]
    print("  " + format(m, "<13") + format(A, ">11.2f") + format(I, ">7.2f") + format(abs(A + I - 1), ">12.2f"))
print("  'model' stabil (I = 0) tetapi hampir tanpa abstraksi: setiap")
print("  perubahannya menjalar ke " + str(M["model"][0]) + " modul pemakainya, dan tidak ada")
print("  antarmuka yang menahan jalarnya. D besar = kandidat perbaikan.")

# --------------------------------------------
# 3. Perubahan kecil yang merusak struktur
# --------------------------------------------
print("\n--- satu baris import baru: konfigurasi -> layanan ---")
BARU = {m: list(t) for m, t in IMPOR.items()}
BARU["konfigurasi"].append("layanan")        # konfigurasi membaca nilai dari layanan
M2 = metrik(BARU)
for s in cari_siklus(BARU):
    print("  SIKLUS : " + " -> ".join(s))
tulis_sdp(BARU, M2)
print()
print("  Pelanggaran SDP bergeser -- menambah pemakai 'layanan' membuat")
print("  I-nya turun -- tetapi yang benar-benar berbahaya adalah siklusnya.")
print("  Siklus berarti modul-modul itu tidak bisa diuji, dipakai ulang,")
print("  atau diubah sendiri-sendiri: menyentuh satu, menyentuh semua.")
print("  Satu baris 'import' sudah cukup untuk membuatnya.")` },
  output: `--- metrik per modul ---
  modul         fan-in  fan-out   I = Ce/(Ca+Ce)
  model              4        0         0.00
  format             1        0         0.00
  konfigurasi        2        0         0.00
  validasi           1        1         0.50
  koneksi            1        1         0.50
  email              1        1         0.50
  pengendali         1        2         0.67
  repositori         1        2         0.67
  notifikasi         1        2         0.67
  layanan            1        3         0.75
  tampilan           0        2         1.00

  I = 0: banyak dipakai, tidak memakai apa-apa -- STABIL.
  Mengubahnya mahal, karena semua pemakainya ikut terdampak.
  I = 1: memakai banyak, tidak dipakai siapa pun -- LABIL.
  Mengubahnya murah; tidak ada yang bergantung padanya.

  prinsip ketergantungan stabil (SDP) di desain awal:
  SDP    : pengendali (I=0.67) bergantung ke layanan (I=0.75)
  Selisihnya kecil (0,08). Pelanggaran kecil seperti ini wajar;
  yang dicari adalah yang besar, atau yang membentuk siklus.

--- abstrak dan stabil harus seiring ---
  modul         A (abstrak)     I   D = |A + I - 1|
  model               0.10   0.00        0.90
  repositori          0.80   0.67        0.47
  notifikasi          0.50   0.67        0.17
  'model' stabil (I = 0) tetapi hampir tanpa abstraksi: setiap
  perubahannya menjalar ke 4 modul pemakainya, dan tidak ada
  antarmuka yang menahan jalarnya. D besar = kandidat perbaikan.

--- satu baris import baru: konfigurasi -> layanan ---
  SIKLUS : layanan -> repositori -> koneksi -> konfigurasi -> layanan
  SDP    : layanan (I=0.60) bergantung ke repositori (I=0.67)
  SDP    : layanan (I=0.60) bergantung ke notifikasi (I=0.67)
  SDP    : konfigurasi (I=0.33) bergantung ke layanan (I=0.60)

  Pelanggaran SDP bergeser -- menambah pemakai 'layanan' membuat
  I-nya turun -- tetapi yang benar-benar berbahaya adalah siklusnya.
  Siklus berarti modul-modul itu tidak bisa diuji, dipakai ulang,
  atau diubah sendiri-sendiri: menyentuh satu, menyentuh semua.
  Satu baris 'import' sudah cukup untuk membuatnya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Fan-in dan fan-out untuk n modul, e import', waktu: 'O(n + e)', memori: 'O(n)' },
      { operasi: 'Memeriksa SDP', waktu: 'O(e)', memori: 'O(1) tambahan' },
      { operasi: 'Mencari siklus dengan DFS tiga warna', waktu: 'O(n + e)', memori: 'O(n) untuk warna dan jalur' },
      { operasi: 'Jarak dari garis utama', waktu: 'O(n)', memori: 'butuh data abstraksi setiap modul' }
    ],
    intuisi: `Semua pemeriksaan ini lurus dengan ukuran graf — setiap modul dan setiap import disentuh sekali atau dua kali. Untuk projek ribuan modul pun, hasilnya seketika.

Itu yang membuat metrik ini cocok dijalankan otomatis di setiap commit: siklus baru bisa ditolak sebelum masuk, sama seperti kode yang gagal uji. Banyak alat analisis statis — dan beberapa kerangka kerja — menyediakan pemeriksaan siklus dependensi karena alasan itu.

Satu catatan pada fungsi pencari siklus: ia menemukan siklus yang dilewati DFS, tetapi tidak menjamin menemukan **setiap** siklus di graf yang punya banyak siklus bertumpuk. Untuk tujuan "apakah ada siklus?", itu cukup; untuk mendaftar semuanya, ada algoritme lain seperti komponen terhubung kuat Tarjan.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap modul stabil berarti modul yang jarang berubah.',
      kenapa: 'Dalam metrik ini, stabil berarti mahal diubah karena banyak yang bergantung padanya. Modul stabil bisa saja sering diubah, dan itulah masalahnya.',
      benar: 'Baca I = 0 sebagai "setiap perubahan di sini menjalar ke semua pemakainya", dan jaga modul seperti itu tetap abstrak dan jarang berubah.'
    },
    {
      salah: 'Membiarkan modul inti yang banyak dipakai berisi implementasi konkret.',
      kenapa: 'Perubahan kecil pada implementasi memaksa semua pemakai ikut berubah atau diuji ulang. Model dengan A = 0,10 dan I = 0 berjarak 0,90 dari garis utama.',
      benar: 'Taruh antarmuka dan kelas abstrak di modul yang stabil, dan implementasinya di modul yang lebih labil.'
    },
    {
      salah: 'Menambah import tanpa memeriksa apakah ia menutup siklus.',
      kenapa: 'Satu import yang tampak wajar bisa mengikat beberapa modul menjadi satu gumpalan yang tidak bisa diuji atau diubah sendiri-sendiri.',
      benar: 'Jalankan pemeriksaan siklus otomatis di setiap commit, dan putus siklus dengan memindahkan kode bersama atau membalik dependensi dengan antarmuka.'
    },
    {
      salah: 'Mengejar semua pelanggaran SDP sampai nol.',
      kenapa: 'Pelanggaran kecil seperti selisih 0,08 wajar dan bergeser setiap kali graf berubah. Mengejarnya menghabiskan waktu tanpa memperbaiki masalah nyata.',
      benar: 'Fokus pada pelanggaran dengan selisih besar dan pada siklus.'
    },
    {
      salah: 'Memakai pencarian dua warna untuk menemukan siklus.',
      kenapa: 'Dua warna tidak bisa membedakan kembali ke jalur sendiri dari dua jalan menuju modul yang sama, sehingga setiap modul yang dipakai bersama dilaporkan sebagai siklus.',
      benar: 'Pakai tiga warna: abu untuk yang sedang di jalur, hitam untuk yang sudah selesai.'
    },
    {
      salah: 'Menjadikan angka metrik sebagai nilai kualitas akhir.',
      kenapa: 'Metrik menghitung modul, tidak menimbang seberapa banyak yang dipakai dari setiap modul. Satu konstanta yang diimpor dihitung sama dengan puluhan fungsi.',
      benar: 'Pakai angka untuk menunjuk tempat yang perlu dilihat, lalu putuskan dengan membaca kodenya.'
    }
  ],

  analogi: `Bayangkan **organisasi kemahasiswaan** dengan beberapa divisi.

**Fan-in dan fan-out.** Divisi Kesekretariatan dipakai semua divisi lain — setiap surat harus lewat mereka. Fan-in tinggi. Divisi Acara bergantung pada Kesekretariatan, Humas, dan Logistik, tetapi tidak ada divisi yang bergantung pada Acara. Fan-out tinggi, fan-in nol.

**Stabil dan labil.** Kalau Kesekretariatan mengubah format surat, **semua** divisi harus menyesuaikan. Mengubahnya mahal — itu stabil. Kalau Divisi Acara mengubah susunan acara, tidak ada divisi lain yang terganggu — itu labil, dan justru di situlah perubahan seharusnya sering terjadi.

**Abstraksi.** Kesekretariatan yang cerdas tidak mengumumkan "pakai templat Word versi ini, dengan margin sekian". Mereka mengumumkan aturan umumnya: "setiap surat harus punya nomor, tanggal, perihal, dan tanda tangan ketua". Divisi lain bebas memakai templat apa pun asalkan memenuhi aturan itu. Aturan jarang berubah; templat boleh sering berubah. Itulah modul yang stabil dan abstrak.

**Prinsip ketergantungan stabil.** Kalau Kesekretariatan harus menunggu Divisi Acara menentukan tema sebelum bisa membuat kop surat, ada yang terbalik: bagian yang dipakai semua orang bergantung pada bagian yang paling sering berubah. Setiap perubahan tema acara mengguncang seluruh surat-menyurat organisasi.

**Siklus.** Humas butuh persetujuan Acara untuk mempublikasikan. Acara butuh anggaran dari Bendahara. Bendahara butuh surat dari Kesekretariatan. Kesekretariatan butuh konfirmasi dari Humas bahwa acaranya sudah diumumkan. Tidak ada yang bisa mulai lebih dulu — dan tidak ada divisi yang bisa diganti pengurusnya tanpa mengganggu tiga divisi lain. Itulah siklus.`,

  latihan: [
    'Daftar import setiap modul di projek Python atau PHP-mu, lalu hitung fan-in, fan-out, dan I.',
    'Tentukan modul yang paling mahal diubah di projekmu, dan jelaskan dengan angka.',
    'Jalankan pemeriksa SDP pada projekmu, lalu tentukan pelanggaran mana yang layak diperbaiki.',
    'Tambahkan satu import yang menutup siklus ke graf di program ini, selain konfigurasi ke layanan, lalu tunjukkan siklus yang ditemukan.',
    'Putus siklus layanan → repositori → koneksi → konfigurasi → layanan dengan memindahkan kode ke modul baru, lalu jalankan ulang pemeriksaannya.',
    'Jelaskan dengan contoh kenapa pencarian siklus dua warna salah melaporkan modul yang dipakai bersama sebagai siklus.',
    'Rancang antarmuka untuk modul model supaya A-nya naik, lalu hitung D yang baru dengan perkiraanmu.',
    'Ubah metrik supaya menimbang banyaknya nama yang diimpor dari setiap modul, bukan hanya banyaknya modul.',
    'Bandingkan metrik modul projek semester lalu dengan projek sekarang, lalu jelaskan perbedaannya.',
    'Jelaskan hubungan antara prinsip ketergantungan stabil dan prinsip dependency inversion di SOLID.'
  ]
});
