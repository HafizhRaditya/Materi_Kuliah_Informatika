/* ============================================================
   audit.js — materi Audit Sistem Informasi (Semester 5)

   Folder "Semester Lima/Audit SI" tidak memuat slide kuliah,
   jadi tidak ada berkas kuliah sendiri yang bisa dipakai.
   Materi di bawah disusun dari:

   - RPS mata kuliah Audit Sistem Informasi sebuah universitas
     lain (16 pekan: dasar & etika audit, proses audit, audit
     tata kelola TI, business continuity, CAAT, application
     control, system development, infrastruktur & operasional,
     kerangka manajemen keamanan informasi, keamanan jaringan,
     audit dengan Excel, pengendalian manajemen & QA, akses
     fisik, akses logik)
   - pengetahuan umum kerangka COBIT, model risiko audit, dan
     teknik audit berbantuan komputer

   Yang dipilih untuk ditulis di sini adalah bagian yang bisa
   DIHITUNG atau DIJALANKAN, bukan yang cuma bisa dihafal —
   supaya bisa diperiksa sendiri kebenarannya.

   Kalau nanti slide kuliahnya didapat, bandingkan urutan dan
   penekanannya: bagian yang tidak diajarkan bisa dilewati, dan
   yang belum ada di sini bisa ditambahkan.

   Tidak diulang di sini karena sudah dibahas di tempat lain:
   SQL injection, XSS, dan penyimpanan kata sandi ada di
   "Keamanan Aplikasi Web" (Pemrograman Web II); normalisasi
   dan constraint basis data di Basis Data; SDLC di Rekayasa
   Perangkat Lunak; pengujian perangkat lunak di UKPL.
   ============================================================ */

TOPICS.push({
  id: 'audit-dasar',
  judul: 'Dasar Audit SI: Risiko Audit & Bukti',
  kategori: 'audit',
  tag: ['audit', 'independensi', 'risiko audit', 'IR CR DR', 'sampling', 'bukti audit'],
  ringkas: 'Satu penyimpangan dari 60 sampel bukan sekadar satu — ia menaksir 200 transaksi bermasalah.',

  fungsi: `**Menilai apakah sebuah sistem informasi bisa dipercaya, dengan cara yang bisa dipertanggungjawabkan.**

Terpakai di:

- **Kerja sebagai auditor SI** — jalur karier nyata bagi lulusan informatika, di kantor akuntan publik, BPKP/BPK, atau internal audit perusahaan
- **Menghadapi auditor** — kalau kamu yang membangun sistemnya, kamu yang akan diminta bukti. Memahami apa yang dicari auditor membuat penyediaan buktinya jauh lebih murah
- **Tugas akhir** bertema evaluasi atau audit sistem — ini salah satu topik skripsi informatika yang paling sering diambil
- **Sertifikasi** seperti CISA, yang seluruh isinya berdiri di atas kerangka ini
- **Pemeriksaan internal** organisasi kecil — koperasi, unit kegiatan, usaha keluarga

Yang paling sering dipahami keliru: **audit bukan mencari kesalahan.** Ia memberi **opini** dengan tingkat keyakinan tertentu, dan tingkat keyakinan itu ditentukan lewat hitungan — bukan lewat perasaan sudah cukup memeriksa.

Dan satu hal yang mengubah cara membaca temuan: **temuan pada sampel harus diproyeksikan ke populasinya.** Satu penyimpangan dari 60 sampel bukan satu masalah; pada populasi 12.000 ia menaksir sekitar 200.`,
  praktik: {
    tujuan: 'Kamu bisa menyusun satu program audit kecil untuk sistem nyata: menetapkan kriteria, menghitung ukuran sampel dari tingkat keyakinan yang kamu pilih, mengumpulkan bukti sesuai kekuatannya, dan memproyeksikan temuan ke populasi.',
    alat: ['Satu sistem nyata yang bisa kamu akses (sistem kampus, koperasi, toko, atau proyek sendiri)', 'Spreadsheet untuk kertas kerja', 'Python untuk menghitung ukuran sampel dan proyeksi'],
    langkah: [
      { judul: 'Pilih satu sistem dan satu proses saja',
        isi: `Jangan mengaudit "seluruh sistem". Pilih satu proses yang punya transaksi berulang: pendaftaran, pembayaran, peminjaman, absensi.

Alasannya bukan supaya ringan. Audit tanpa lingkup yang sempit tidak punya populasi yang jelas, dan tanpa populasi yang jelas tidak ada sampel yang bisa dihitung — jadi hasilnya tidak bisa disebut apa pun selain kesan.` },
      { judul: 'Tulis kriterianya dulu, sebelum melihat data',
        isi: `Kriteria adalah "apa yang seharusnya": setiap pembayaran punya bukti setor, setiap perubahan data punya jejak siapa yang mengubah, setiap pengguna keluar akunnya dimatikan.

Urutannya penting. Kalau kriterianya ditulis **sesudah** melihat data, kamu akan tanpa sadar menulis kriteria yang sudah dipenuhi datanya — dan auditnya berhenti bisa menemukan apa pun.` },
      { judul: 'Nilai IR dan CR secara jujur',
        isi: `Untuk proses yang kamu pilih, taksir dua hal: seberapa rawan ia bawaannya (**IR**), dan seberapa besar kemungkinan kendali yang ada gagal menangkap masalahnya (**CR**).

Tidak perlu presisi. Yang penting kamu sadar bahwa keduanya **sudah ada di sana sebelum kamu datang**, dan yang bisa kamu atur cuma seberapa banyak kamu menguji.` },
      { judul: 'Hitung ukuran sampelnya, jangan ditebak',
        isi: `Pakai rumus di topik ini: pilih tingkat keyakinan dan toleransi salah, lalu hitung \`n\`-nya.

Bandingkan hasilnya untuk keyakinan 90% dan 99%. Kalau selisihnya mengejutkanmu, itu bagus — di situlah letak biaya sebuah keyakinan.` },
      { judul: 'Ambil sampelnya secara acak, dan catat caranya',
        isi: `Pakai nomor acak, bukan "yang kelihatan menarik". Catat cara pengambilannya di kertas kerja.

Sampel yang dipilih karena tampak mencurigakan tidak bisa diproyeksikan ke populasi — ia bukan sampel, ia daftar dugaan.` },
      { judul: 'Kumpulkan bukti, lalu beri peringkat kekuatannya',
        isi: `Untuk tiap temuan, tulis dari mana buktinya: kamu amati sendiri, dari pihak luar, dari log sistem, dari dokumen internal, atau dari keterangan orang.

Lalu periksa satu hal untuk bukti dari log: **apakah log-nya bisa disunting administrator?** Kalau bisa, kekuatannya turun setara dokumen internal.` },
      { judul: 'Proyeksikan temuanmu ke populasi',
        isi: `Kalau kamu menemukan 2 penyimpangan dari 60 sampel, jangan tulis "ditemukan 2 penyimpangan".

Tulis: **tingkat penyimpangan 3,3%, yang pada populasi 12.000 menaksir sekitar 400 transaksi.** Angka kedua yang membuat pimpinan bertindak; angka pertama terdengar seperti kasus kecil.` },
      { judul: 'Tutup dengan satu halaman temuan',
        isi: `Untuk tiap temuan tulis lima bagian: kriteria, kondisi, sebab, akibat, saran.

Bagian **sebab** yang paling sering hilang dan paling menentukan. Tanpa itu sarannya jadi "harap lebih tertib", dan temuan yang sama muncul lagi periode berikutnya.` }
    ],
    cek: [
      'Kriteriamu ditulis sebelum kamu melihat datanya',
      'Ukuran sampelmu berasal dari hitungan, dan kamu bisa menyebut tingkat keyakinannya',
      'Setiap temuanmu disertai taksiran populasi, bukan cuma jumlah pada sampel',
      'Untuk setiap bukti dari log, kamu sudah memeriksa apakah log itu bisa diubah'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa kendali yang lemah membuat audit jadi mahal',

  konsep: `Audit sistem informasi sering disalahpahami sebagai "memeriksa sistem dengan teliti". Kalau memang begitu, setiap programmer yang cermat sudah mengauditnya tiap hari.

Yang membedakan bukan ketelitiannya, melainkan **empat hal ini**:

| Hal | Memeriksa biasa | Audit |
|---|---|---|
| **Siapa memeriksa** | orang dalam sendiri | pihak yang **independen** |
| **Acuannya** | pendapat pemeriksa | **kriteria** yang disepakati lebih dulu |
| **Buktinya** | boleh berupa kesan | harus bisa **ditunjukkan** ke orang lain |
| **Hasilnya** | masukan | **opini** yang dipertanggungjawabkan |

Kata yang paling menentukan **independen**, dan alasannya bukan soal kejujuran.

Auditor yang ikut membangun sebuah sistem tidak bisa mengaudit sistem itu — bukan karena ia akan menutupi kesalahannya, melainkan karena ia **tidak bisa melihat andaian yang ia sendiri pakai saat membangun**. Andaian itu tidak terasa seperti pilihan; ia terasa seperti kenyataan. Orang lain yang datang dengan kepala kosong justru bisa menanyakannya.

**Tiga jenis audit yang sering tertukar**

| Jenis | Menjawab | Lingkup |
|---|---|---|
| **Keuangan** | apakah laporan keuangannya wajar | saldo, transaksi, penyajian |
| **Operasional** | apakah kegiatannya efisien dan efektif | proses, pemakaian sumber daya |
| **Sistem Informasi** | apakah SI-nya bisa dipercaya dan aman | pengendalian, data, akses, kelangsungan |

Audit SI sering menjadi **penopang** audit keuangan. Logikanya lurus: kalau sistem yang menghasilkan angkanya tidak bisa dipercaya, angka yang keluar darinya juga tidak. Auditor keuangan yang menerima laporan dari sistem yang belum diaudit sedang mempercayai sesuatu yang belum diperiksa.

**Model risiko audit**

Di sini audit berhenti jadi urusan sikap dan mulai jadi urusan hitungan. Rumusnya:

\`AR = IR x CR x DR\`

| Simbol | Nama | Artinya |
|---|---|---|
| **IR** | Inherent Risk | risiko bawaan proses, sebelum ada kendali apa pun |
| **CR** | Control Risk | risiko kendali internal gagal menangkapnya |
| **DR** | Detection Risk | risiko **auditor sendiri** tidak menemukannya |
| **AR** | Audit Risk | risiko auditor memberi opini yang salah |

Perhatikan yang bisa diatur auditor: **hanya DR**, lewat seberapa banyak ia menguji. IR dan CR sudah ada di sana sebelum ia datang, dan ia tidak bisa mengubahnya — ia cuma bisa **menaksirnya**.

Dari situ muncul akibat yang penting: kalau AR ditetapkan (misalnya 5%), maka DR yang boleh ditanggung adalah \`AR / (IR x CR)\`. Makin buruk IR dan CR, makin kecil DR yang boleh — dan **DR hanya bisa diperkecil dengan menguji lebih banyak.**

Itu sebabnya mengaudit tempat yang kendalinya berantakan **jauh lebih mahal**, bukan lebih murah. Auditor tidak bisa lagi mengandalkan sistemnya, jadi ia harus memeriksa transaksinya satu per satu.

**Berapa sampel yang dibutuhkan**

Untuk pengujian atribut (ada/tidak ada penyimpangan), pendekatan Poisson memberi:

\`n = -ln(1 - keyakinan) / toleransi_salah\`

Dua hal menaikkan jumlah sampel: ingin lebih **yakin**, dan toleransi salah yang lebih **ketat**. Naik dari keyakinan 90% ke 99% lebih dari menggandakan sampelnya.

Ini yang membuat "sudah cukup memeriksa" berhenti jadi perasaan: kamu bisa menyebut angka keyakinanmu, dan orang lain bisa memeriksa hitungannya.

**Temuan harus diproyeksikan**

Ini kekeliruan penafsiran yang paling sering terjadi, bahkan oleh yang sudah paham sampling.

Kamu memeriksa 60 dari 12.000 transaksi dan menemukan **satu** yang salah. Laporan yang ditulis: "ditemukan 1 transaksi bermasalah". Pimpinan membacanya sebagai kasus kecil, dan tidak ada yang bergerak.

Yang benar: tingkat penyimpangan sampel 1,67%, yang pada populasi 12.000 menaksir **sekitar 200 transaksi**. Angka itu yang menggambarkan keadaan sebenarnya.

Sampel bukan daftar masalah. Ia **alat ukur**, dan hasil ukurnya harus dikalikan kembali ke populasinya.

**Bukti audit tidak semuanya sama kuat**

| Kekuatan | Jenis bukti | Catatan |
|---|---|---|
| paling kuat | diamati sendiri oleh auditor | tidak bisa diperantarai |
| kuat | dari pihak luar, langsung | konfirmasi bank, vendor |
| sedang | dari sistem, **bila kendalinya baik** | log yang tak bisa diubah |
| lemah | dokumen internal | bisa dibuat belakangan |
| paling lemah | keterangan lisan | harus didukung bukti lain |

Baris ketiga yang paling sering salah dipakai. Log sistem terasa objektif — ia dihasilkan mesin. Tetapi log yang **bisa disunting administrator** turun setara dokumen internal, karena orang yang paling mungkin ingin menghapus jejaknya justru orang yang punya wewenang menyuntingnya.

Jadi sebelum memakai log sebagai bukti, auditor harus memeriksa dulu satu hal: **siapa yang bisa mengubah log ini, dan apakah perubahannya tercatat?**`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# AR = IR x CR x DR,  jadi  DR = AR / (IR x CR)\n#\n# AR ditargetkan 5%\n#\n#   keadaan                          IR    CR   DR boleh\n#   Kendali kuat, sistem sederhana  0.40  0.20    62.5%\n#   Kendali kuat, sistem rumit      0.80  0.20    31.2%\n#   Kendali sedang                  0.80  0.50    12.5%\n#   Kendali lemah                   0.80  0.90     6.9%\n#   Nyaris tanpa kendali            1.00  1.00     5.0%\n#\n# DR yang boleh turun 12 kali lipat.\n# Dan DR hanya bisa diperkecil dengan MENGUJI LEBIH BANYAK.',
      penjelasan: `Tabel ini kelihatan seperti latihan aritmetika. Ia sebenarnya menjelaskan kenapa audit di satu tempat bisa berbiaya sepuluh kali audit di tempat lain, untuk sistem yang ukurannya sama.

Mulai dari yang mudah dulu. **AR** — risiko auditor memberi opini yang salah — adalah satu-satunya angka yang **dipilih**, bukan ditaksir. Lima persen artinya: auditor bersedia menerima kemungkinan 5% bahwa opininya keliru. Itu keputusan profesional, dan angkanya ditetapkan sebelum pekerjaan dimulai.

Sekarang perhatikan bahwa **IR** dan **CR** tidak dipilih. Keduanya **ditaksir**, karena keduanya sudah ada di sana. Sistem penggajian di perusahaan dengan 5.000 pegawai dan tujuh sistem yang saling kirim data punya IR tinggi — bukan karena ada yang salah, melainkan karena banyaknya kemungkinan salah. Dan kalau perubahan program di sana bisa naik ke produksi tanpa persetujuan, CR-nya juga tinggi.

Auditor tidak bisa memperbaiki keduanya. Ia bukan konsultan; memperbaiki kendali bukan pekerjaannya, dan kalau ia melakukannya ia kehilangan independensinya.

Yang tersisa cuma **DR**.

Dan di sini rumusnya jadi punya makna. Kalau \`AR = IR x CR x DR\` dan AR sudah dipatok 5%, maka:

\`DR = 0.05 / (IR x CR)\`

Baca baris pertama tabel. Kendali kuat, sistem sederhana: IR 0,40 dan CR 0,20. Hasilnya DR boleh sampai **62,5%**. Artinya auditor boleh punya peluang 62,5% tidak menemukan penyimpangan yang ada, dan opininya masih memenuhi target keyakinan.

Kedengarannya longgar sampai kelewatan. Tapi masuk akal: dengan IR rendah, jarang ada penyimpangan yang muncul; dan dengan CR rendah, yang muncul pun kemungkinan besar sudah ditangkap kendali internalnya sendiri. Auditor tinggal memastikan kendali itu memang bekerja, lalu menguji secukupnya.

Sekarang baris terakhir. Nyaris tanpa kendali: IR 1,00 dan CR 1,00. DR yang boleh cuma **5%** — auditor harus punya peluang 95% menemukan penyimpangan yang ada, dengan usahanya sendiri.

**Dua belas kali lebih ketat** daripada baris pertama.

Dan inilah bagian yang mengubah cara memandang audit. Naluri banyak orang: kalau kendalinya buruk, auditnya jadi lebih mudah — masalahnya di mana-mana, tinggal dipetik. Yang terjadi kebalikannya.

Auditor **tidak boleh** lagi menyandarkan opininya pada sistem. Setiap angka harus ia telusuri sendiri ke dokumen sumbernya. Sampelnya membengkak, waktunya berlipat, dan biayanya ikut.

Dari sini muncul satu hal yang jarang disampaikan ke manajemen: **memasang kendali internal yang baik menurunkan biaya audit.** Bukan cuma menurunkan risiko. Organisasi yang mengeluh biaya auditnya mahal sedang membayar akibat dari kendali yang belum dibereskan.

Terakhir, kenapa DR bisa diatur sama sekali. Karena DR adalah peluang **auditor** tidak menemukan — dan itu fungsi dari berapa banyak yang ia periksa. Memeriksa 30 dari 12.000 memberi DR besar; memeriksa 2.000 memberi DR kecil; memeriksa seluruhnya memberi DR nol.

Jadi rumus \`AR = IR x CR x DR\` pada praktiknya adalah **alat penentu anggaran**. Taksir IR dan CR, patok AR, dan yang keluar adalah berapa banyak pekerjaan yang harus dilakukan.`
    },
    {
      bahasa: 'python',
      kode: 'import math\n\ndef sampel_atribut(keyakinan, toleransi):\n    """Pendekatan Poisson, untuk 0 penyimpangan yang diharapkan."""\n    return math.ceil(-math.log(1 - keyakinan) / toleransi)\n\n# keyakinan  toleransi  n\n#      90%       10%     24\n#      90%        5%     47\n#      95%       10%     30\n#      95%        5%     60\n#      99%       10%     47\n#      99%        5%     93\n#\n# 60 sampel, 1 salah -> 1.67% -> pada 12.000 = ~200 transaksi',
      penjelasan: `Dua hitungan pendek yang mengubah audit dari kegiatan berbasis perasaan menjadi kegiatan yang bisa diperiksa orang lain.

**Yang pertama: berapa banyak yang harus diperiksa.**

Bentuk rumusnya sendiri sudah memberi tahu banyak. \`-ln(1 - keyakinan)\` tumbuh makin cepat saat keyakinan mendekati 1: dari 90% ke 95% naik sedikit, dari 95% ke 99% naik banyak, dan menuju 100% ia menuju tak hingga.

Itu bukan kelemahan rumusnya. Itu kenyataannya: **keyakinan penuh hanya bisa didapat dengan memeriksa seluruh populasi.** Rumus ini cuma menunjukkan harganya.

Lihat angkanya. Keyakinan 90% dengan toleransi 10% butuh **24** sampel. Naikkan keyakinan ke 99% dengan toleransi yang sama: **47** — hampir dua kali. Ketatkan toleransinya juga ke 5%: **93** — hampir empat kali sampel yang pertama.

Perhatikan bahwa yang berubah bukan populasinya. Populasi 1.000 dan 100.000 memberi \`n\` yang sama. Ini sering terasa salah bagi yang baru belajar, tapi memang begitu: yang menentukan bukan besarnya populasi, melainkan seberapa yakin kamu ingin jadi terhadap **tingkat** penyimpangannya.

**Yang kedua: apa arti temuannya.**

Kamu memeriksa 60 dan menemukan satu yang salah.

Godaan menulisnya sebagai "ditemukan 1 transaksi bermasalah". Kalimat itu benar secara harfiah dan **menyesatkan sepenuhnya**, karena ia menghilangkan hal terpenting: kamu cuma melihat 0,5% populasinya.

Yang benar: satu dari 60 adalah **1,67%**. Pada populasi 12.000, itu menaksir **sekitar 200 transaksi**.

Dua ratus, bukan satu.

Dan perhatikan bahwa lompatan tafsirnya berlaku juga untuk temuan nol. Nol dari 60 **bukan** berarti tidak ada masalah — ia berarti tingkat penyimpangannya kemungkinan besar di bawah toleransi yang kamu pilih, pada tingkat keyakinan yang kamu pilih. Itu pernyataan yang jauh lebih lemah, dan jauh lebih jujur.

Sekarang gabungkan keduanya, karena di situ letak nilainya.

Ukuran sampel ditentukan **sebelum** memeriksa, dari keyakinan yang kamu pilih. Proyeksi dihitung **sesudah** memeriksa, dari temuanmu. Keduanya memakai angka yang sama, dan itu sebabnya seseorang bisa membaca kertas kerjamu dan menghitung ulang seluruh kesimpulanmu.

Bandingkan dengan "saya sudah periksa banyak, sepertinya aman". Tidak ada yang bisa diperiksa dari kalimat itu — termasuk oleh kamu sendiri, enam bulan kemudian, saat ada yang bertanya kenapa kesimpulanmu begitu.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Dasar audit SI: risiko audit & bukti
# ============================================

# --------------------------------------------
# 1. Audit itu bukan pemeriksaan biasa
# --------------------------------------------
print("--- apa yang membedakan audit dari sekadar memeriksa ---")
BEDA = [
    ("Siapa memeriksa", "orang dalam sendiri", "pihak yang INDEPENDEN"),
    ("Acuannya",        "pendapat pemeriksa",  "kriteria yang disepakati"),
    ("Buktinya",        "boleh kesan",         "harus bisa ditunjukkan"),
    ("Hasilnya",        "masukan",             "OPINI yang dipertanggungjawabkan"),
]
for hal, biasa, audit in BEDA:
    print("  " + hal)
    print("      memeriksa biasa : " + biasa)
    print("      audit           : " + audit)
print("")
print("  Kata kuncinya INDEPENDEN. Auditor yang ikut membangun")
print("  sistemnya tidak bisa mengaudit sistem itu -- bukan")
print("  karena ia tidak jujur, melainkan karena ia tidak bisa")
print("  melihat andaian yang ia sendiri pakai saat membangun.")

# --------------------------------------------
# 2. Tiga jenis audit
# --------------------------------------------
print("")
print("--- tiga jenis audit yang sering tertukar ---")
JENIS = [
    ("Keuangan",   "apakah laporan keuangannya wajar",
     "saldo, transaksi, penyajian"),
    ("Operasional","apakah kegiatannya efisien & efektif",
     "proses, pemakaian sumber daya"),
    ("Sistem Informasi", "apakah SI-nya bisa dipercaya & aman",
     "pengendalian, data, akses, kelangsungan"),
]
for nama, tanya, lingkup in JENIS:
    print("  " + nama)
    print("      menjawab : " + tanya)
    print("      lingkup  : " + lingkup)
print("")
print("  Audit SI sering jadi PENOPANG audit keuangan: kalau")
print("  sistemnya tidak bisa dipercaya, angka yang keluar")
print("  darinya juga tidak bisa dipercaya.")

# --------------------------------------------
# 3. Model risiko audit
# --------------------------------------------
print("")
print("--- model risiko audit: AR = IR x CR x DR ---")
ISTILAH = [
    ("IR", "Inherent Risk",  "risiko bawaan, sebelum ada kendali apa pun"),
    ("CR", "Control Risk",   "risiko kendali internal gagal menangkapnya"),
    ("DR", "Detection Risk", "risiko AUDITOR sendiri tidak menemukannya"),
    ("AR", "Audit Risk",     "risiko auditor memberi opini yang salah"),
]
for k, n, arti in ISTILAH:
    print("  " + k.ljust(4) + n.ljust(17) + arti)
print("")
print("  Yang bisa DIATUR auditor cuma DR -- lewat seberapa")
print("  banyak pengujian yang ia lakukan. IR dan CR sudah ada")
print("  di sana sebelum auditor datang.")

# --------------------------------------------
# 4. Kendali lemah menuntut pengujian lebih banyak
# --------------------------------------------
print("")
print("--- berapa DR yang boleh, kalau AR ditargetkan 5%? ---")
AR = 0.05
print("  " + "keadaan".ljust(30) + "IR".rjust(6) + "CR".rjust(6)
      + "DR boleh".rjust(10))
KEADAAN = [
    ("Kendali kuat, sistem sederhana", 0.40, 0.20),
    ("Kendali kuat, sistem rumit",     0.80, 0.20),
    ("Kendali sedang",                 0.80, 0.50),
    ("Kendali lemah",                  0.80, 0.90),
    ("Nyaris tanpa kendali",           1.00, 1.00),
]
dasar = None
for nama, ir, cr in KEADAAN:
    dr = min(AR / (ir * cr), 1.0)
    if dasar is None:
        dasar = dr
    if dr >= 0.50:    arti = "pengujian secukupnya"
    elif dr >= 0.20:  arti = "pengujian diperbanyak"
    elif dr >= 0.10:  arti = "pengujian jauh lebih banyak"
    else:             arti = "nyaris periksa satu per satu"
    print("  " + nama.ljust(30) + ("%.2f" % ir).rjust(6)
          + ("%.2f" % cr).rjust(6) + ("%.1f%%" % (dr * 100)).rjust(10))
    print("      -> " + arti)
terkecil = min(AR / (ir * cr) for _, ir, cr in KEADAAN)
print("")
print("  Dari baris pertama ke terakhir, DR yang boleh turun dari "
      + ("%.1f%%" % (dasar * 100)))
print("  jadi " + ("%.1f%%" % (terkecil * 100))
      + " -- sekitar " + ("%.0f" % (dasar / terkecil)) + " kali lebih ketat.")
print("")
print("  Baca dari bawah ke atas. Makin lemah kendalinya, makin")
print("  KECIL detection risk yang boleh ditanggung auditor --")
print("  dan detection risk hanya bisa diperkecil dengan")
print("  menguji LEBIH BANYAK.")
print("")
print("  Itu sebabnya audit di tempat yang kendalinya berantakan")
print("  jauh lebih mahal. Auditor tidak bisa lagi mengandalkan")
print("  sistemnya, jadi ia harus memeriksa transaksinya sendiri.")

# --------------------------------------------
# 5. Berapa sampel yang dibutuhkan
# --------------------------------------------
import math

def sampel_atribut(keyakinan, salah_ditoleransi, salah_diduga=0.0):
    """Ukuran sampel pengujian atribut, pendekatan Poisson."""
    # faktor keyakinan Poisson untuk 0 penyimpangan yang diharapkan
    faktor = -math.log(1 - keyakinan)
    return math.ceil(faktor / (salah_ditoleransi - salah_diduga))

print("")
print("--- ukuran sampel: keyakinan menentukan biayanya ---")
print("  " + "keyakinan".rjust(11) + "toleransi salah".rjust(17)
      + "n sampel".rjust(11))
for keyakinan in (0.90, 0.95, 0.99):
    for tol in (0.10, 0.05):
        n = sampel_atribut(keyakinan, tol)
        print("  " + ("%.0f%%" % (keyakinan * 100)).rjust(11)
              + ("%.0f%%" % (tol * 100)).rjust(17) + str(n).rjust(11))
print("")
print("  Dua hal menaikkan jumlah sampel: ingin lebih YAKIN, dan")
print("  toleransi salah yang lebih KETAT. Menaikkan keyakinan")
print("  dari 90% ke 99% lebih dari dua kali lipat sampelnya.")

# --------------------------------------------
# 6. Kalau ditemukan penyimpangan
# --------------------------------------------
print("")
print("--- satu penyimpangan pada sampel berarti apa? ---")
n = 60
print("  sampel " + str(n) + " transaksi, populasi 12.000")
print("")
print("  " + "ditemukan salah".rjust(16) + "tingkat sampel".rjust(16)
      + "  taksiran populasi")
for salah in (0, 1, 2, 3):
    tingkat = salah / n
    taksir = int(12000 * tingkat)
    print("  " + str(salah).rjust(16) + ("%.2f%%" % (tingkat * 100)).rjust(16)
          + ("  sekitar " + f"{taksir:,}".replace(",", ".") + " transaksi"))
print("")
print("  SATU kesalahan dari 60 sampel bukan 'cuma satu'. Ia")
print("  menaksir sekitar 200 transaksi bermasalah di populasi.")
print("")
print("  Ini kekeliruan penafsiran yang paling sering terjadi:")
print("  temuan pada sampel selalu harus DIPROYEKSIKAN ke")
print("  populasinya, bukan dilaporkan apa adanya.")

# --------------------------------------------
# 7. Bukti audit: tidak semua sama kuat
# --------------------------------------------
print("")
print("--- urutan kekuatan bukti ---")
BUKTI = [
    (5, "Diamati sendiri oleh auditor",   "paling kuat"),
    (4, "Dari pihak luar, langsung",      "konfirmasi bank, vendor"),
    (3, "Dari sistem, dengan kendali baik","log yang tak bisa diubah"),
    (2, "Dokumen internal",               "bisa dibuat belakangan"),
    (1, "Keterangan lisan",               "paling lemah, harus didukung"),
]
for skor, jenis, catatan in BUKTI:
    print("  " + ("*" * skor).ljust(6) + jenis.ljust(34) + catatan)
print("")
print("  Perhatikan baris ketiga: log sistem hanya kuat KALAU")
print("  kendalinya baik. Log yang bisa disunting administrator")
print("  turun setara dokumen internal -- dan auditor harus")
print("  memeriksa dulu apakah log-nya bisa diubah.")` },
  output: `--- apa yang membedakan audit dari sekadar memeriksa ---
  Siapa memeriksa
      memeriksa biasa : orang dalam sendiri
      audit           : pihak yang INDEPENDEN
  Acuannya
      memeriksa biasa : pendapat pemeriksa
      audit           : kriteria yang disepakati
  Buktinya
      memeriksa biasa : boleh kesan
      audit           : harus bisa ditunjukkan
  Hasilnya
      memeriksa biasa : masukan
      audit           : OPINI yang dipertanggungjawabkan

  Kata kuncinya INDEPENDEN. Auditor yang ikut membangun
  sistemnya tidak bisa mengaudit sistem itu -- bukan
  karena ia tidak jujur, melainkan karena ia tidak bisa
  melihat andaian yang ia sendiri pakai saat membangun.

--- tiga jenis audit yang sering tertukar ---
  Keuangan
      menjawab : apakah laporan keuangannya wajar
      lingkup  : saldo, transaksi, penyajian
  Operasional
      menjawab : apakah kegiatannya efisien & efektif
      lingkup  : proses, pemakaian sumber daya
  Sistem Informasi
      menjawab : apakah SI-nya bisa dipercaya & aman
      lingkup  : pengendalian, data, akses, kelangsungan

  Audit SI sering jadi PENOPANG audit keuangan: kalau
  sistemnya tidak bisa dipercaya, angka yang keluar
  darinya juga tidak bisa dipercaya.

--- model risiko audit: AR = IR x CR x DR ---
  IR  Inherent Risk    risiko bawaan, sebelum ada kendali apa pun
  CR  Control Risk     risiko kendali internal gagal menangkapnya
  DR  Detection Risk   risiko AUDITOR sendiri tidak menemukannya
  AR  Audit Risk       risiko auditor memberi opini yang salah

  Yang bisa DIATUR auditor cuma DR -- lewat seberapa
  banyak pengujian yang ia lakukan. IR dan CR sudah ada
  di sana sebelum auditor datang.

--- berapa DR yang boleh, kalau AR ditargetkan 5%? ---
  keadaan                           IR    CR  DR boleh
  Kendali kuat, sistem sederhana  0.40  0.20     62.5%
      -> pengujian secukupnya
  Kendali kuat, sistem rumit      0.80  0.20     31.2%
      -> pengujian diperbanyak
  Kendali sedang                  0.80  0.50     12.5%
      -> pengujian jauh lebih banyak
  Kendali lemah                   0.80  0.90      6.9%
      -> nyaris periksa satu per satu
  Nyaris tanpa kendali            1.00  1.00      5.0%
      -> nyaris periksa satu per satu

  Dari baris pertama ke terakhir, DR yang boleh turun dari 62.5%
  jadi 5.0% -- sekitar 12 kali lebih ketat.

  Baca dari bawah ke atas. Makin lemah kendalinya, makin
  KECIL detection risk yang boleh ditanggung auditor --
  dan detection risk hanya bisa diperkecil dengan
  menguji LEBIH BANYAK.

  Itu sebabnya audit di tempat yang kendalinya berantakan
  jauh lebih mahal. Auditor tidak bisa lagi mengandalkan
  sistemnya, jadi ia harus memeriksa transaksinya sendiri.

--- ukuran sampel: keyakinan menentukan biayanya ---
    keyakinan  toleransi salah   n sampel
          90%              10%         24
          90%               5%         47
          95%              10%         30
          95%               5%         60
          99%              10%         47
          99%               5%         93

  Dua hal menaikkan jumlah sampel: ingin lebih YAKIN, dan
  toleransi salah yang lebih KETAT. Menaikkan keyakinan
  dari 90% ke 99% lebih dari dua kali lipat sampelnya.

--- satu penyimpangan pada sampel berarti apa? ---
  sampel 60 transaksi, populasi 12.000

   ditemukan salah  tingkat sampel  taksiran populasi
                 0           0.00%  sekitar 0 transaksi
                 1           1.67%  sekitar 200 transaksi
                 2           3.33%  sekitar 400 transaksi
                 3           5.00%  sekitar 600 transaksi

  SATU kesalahan dari 60 sampel bukan 'cuma satu'. Ia
  menaksir sekitar 200 transaksi bermasalah di populasi.

  Ini kekeliruan penafsiran yang paling sering terjadi:
  temuan pada sampel selalu harus DIPROYEKSIKAN ke
  populasinya, bukan dilaporkan apa adanya.

--- urutan kekuatan bukti ---
  ***** Diamati sendiri oleh auditor      paling kuat
  ****  Dari pihak luar, langsung         konfirmasi bank, vendor
  ***   Dari sistem, dengan kendali baik  log yang tak bisa diubah
  **    Dokumen internal                  bisa dibuat belakangan
  *     Keterangan lisan                  paling lemah, harus didukung

  Perhatikan baris ketiga: log sistem hanya kuat KALAU
  kendalinya baik. Log yang bisa disunting administrator
  turun setara dokumen internal -- dan auditor harus
  memeriksa dulu apakah log-nya bisa diubah.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung DR yang boleh', waktu: 'O(1)', memori: 'satu pembagian per keadaan' },
      { operasi: 'Hitung ukuran sampel', waktu: 'O(1)', memori: 'satu logaritma, tidak bergantung populasi' },
      { operasi: 'Proyeksi temuan ke populasi', waktu: 'O(1)', memori: 'satu perkalian' },
      { operasi: 'Menguji sampel n baris', waktu: 'O(n)', memori: 'n dari rumus, bukan dari populasi' },
      { operasi: 'Menguji seluruh populasi (CAAT)', waktu: 'O(N)', memori: 'N seluruh baris, DR mendekati nol' }
    ],
    intuisi: `Seluruh hitungan di topik ini \`O(1)\` — logaritma dan perkalian, selesai seketika. Yang mahal bukan hitungannya, melainkan **pekerjaan yang dituntutnya**: memeriksa satu transaksi butuh membuka dokumen sumber, mencocokkan, dan mencatatnya, dan itu satuan waktunya menit sampai jam.

Karena itu selisih antara \`n = 24\` dan \`n = 93\` bukan selisih hitungan, melainkan selisih **berhari-hari kerja**. Rumus yang berbiaya nol menentukan anggaran yang berbiaya besar.

Dan perhatikan baris terakhir. Begitu pengujiannya bisa dijalankan dengan kode, \`O(N)\` atas seluruh populasi menjadi murah — dan seluruh urusan sampling menghilang bersama risikonya. Itulah yang membuat CAAT bukan sekadar mempercepat cara lama, melainkan menggantinya.`
  },

  kesalahanUmum: [
    {
      salah: 'Melaporkan jumlah penyimpangan pada sampel apa adanya, tanpa memproyeksikannya ke populasi.',
      kenapa: 'Sampel adalah alat ukur, bukan daftar masalah. Satu penyimpangan dari 60 sampel pada populasi 12.000 menaksir sekitar 200 transaksi bermasalah, dan angka itulah yang menggambarkan keadaan sebenarnya. Laporan yang menyebut satu akan dibaca sebagai kasus kecil dan tidak ditindaklanjuti.',
      benar: 'Hitung tingkat penyimpangan pada sampel, kalikan dengan besar populasi, dan laporkan taksiran populasinya beserta jumlah pada sampelnya.'
    },
    {
      salah: 'Menganggap audit di tempat yang kendalinya lemah lebih murah karena masalahnya mudah ditemukan.',
      kenapa: 'Kendali yang lemah menaikkan CR, sehingga DR yang boleh ditanggung auditor menjadi jauh lebih kecil. Auditor tidak bisa lagi menyandarkan opininya pada sistem dan harus menelusuri sendiri ke dokumen sumber, sehingga sampelnya membengkak dan biayanya berlipat.',
      benar: 'Taksir IR dan CR lebih dulu, hitung DR yang boleh, dan susun anggaran pengujian dari angka itu.'
    },
    {
      salah: 'Menerima log sistem sebagai bukti kuat tanpa memeriksa siapa yang bisa mengubahnya.',
      kenapa: 'Log hanya kuat bila tidak bisa disunting. Log yang bisa diubah administrator turun setara dokumen internal, karena orang yang paling berkepentingan menghapus jejak adalah orang yang punya wewenang menyuntingnya.',
      benar: 'Periksa lebih dulu apakah log bisa diubah dan apakah perubahannya sendiri tercatat, baru tetapkan kekuatan buktinya.'
    },
    {
      salah: 'Menyusun kriteria audit setelah melihat datanya.',
      kenapa: 'Kriteria yang disusun sesudah melihat data akan tanpa sadar mengikuti bentuk datanya, sehingga hampir selalu terpenuhi. Audit yang tidak mungkin menghasilkan temuan bukan audit, melainkan pembenaran.',
      benar: 'Tulis kriteria dari standar, peraturan, atau kebijakan organisasi sebelum data dibuka, dan simpan versinya di kertas kerja.'
    },
    {
      salah: 'Memilih sampel dari transaksi yang tampak mencurigakan.',
      kenapa: 'Sampel yang dipilih karena tampak menarik tidak mewakili populasi, sehingga temuannya tidak bisa diproyeksikan. Hasilnya adalah daftar dugaan, bukan ukuran tingkat penyimpangan.',
      benar: 'Ambil sampel secara acak untuk pengujian yang akan diproyeksikan, dan pisahkan pengujian terarah sebagai prosedur tersendiri yang tidak diproyeksikan.'
    },
    {
      salah: 'Mengaudit sistem yang dibangun sendiri karena paling memahami cara kerjanya.',
      kenapa: 'Pemahaman itu justru masalahnya. Andaian yang dipakai saat membangun tidak terasa sebagai pilihan yang bisa salah, sehingga tidak pernah diuji. Independensi hilang bukan karena niat, melainkan karena keterbatasan sudut pandang.',
      benar: 'Serahkan pengujian kepada pihak yang tidak terlibat pembangunan, dan batasi peranmu pada menyediakan penjelasan serta bukti.'
    },
    {
      salah: 'Menambah sampel karena populasinya besar.',
      kenapa: 'Ukuran sampel pengujian atribut ditentukan oleh tingkat keyakinan dan toleransi salah, bukan oleh besarnya populasi. Populasi seribu dan seratus ribu membutuhkan jumlah sampel yang sama untuk keyakinan yang sama.',
      benar: 'Tentukan sampel dari keyakinan dan toleransi yang dipilih, lalu naikkan hanya bila keyakinan yang dituntut memang lebih tinggi.'
    }
  ],

  analogi: `Bayangkan kamu akan **membeli motor bekas**, dan kamu tidak paham mesin.

Naluri pertama: minta penjualnya menjelaskan kondisinya. Ia menjelaskan dengan panjang dan meyakinkan, dan semuanya baik.

Itu **keterangan lisan** — bukti paling lemah. Bukan karena ia pasti berbohong, melainkan karena tidak ada yang bisa memeriksanya.

Jadi kamu minta bukti servis. Ia menunjukkan buku catatan servis yang ia tulis sendiri.

Itu **dokumen internal**. Lebih baik, tetapi masih bisa dibuat kemarin.

Kamu minta nomor bengkel resminya, lalu menelepon sendiri. Bengkel menyebutkan kilometer terakhir dan pekerjaan yang dilakukan.

Itu **konfirmasi dari pihak luar** — kuat, karena tidak lewat tangan penjual.

Lalu kamu membawa motornya ke montir lain untuk dibuka. Itu **pengamatan langsung** — yang paling kuat, dan yang paling mahal.

Sekarang tiga hal yang bentuknya sama persis dengan audit.

**Independensi.** Kalau yang memeriksa mesin adalah montir langganan penjualnya, penilaiannya tidak berguna — bukan karena ia curang, tapi karena ia yang memasang bagian-bagiannya dan sudah terbiasa dengan pilihannya sendiri.

**Kriteria ditetapkan lebih dulu.** Kalau kamu belum menetapkan apa yang membuat motor ini layak — kilometer di bawah berapa, mesin tidak pernah dibongkar, surat lengkap — maka kamu akan menyesuaikan syaratmu dengan motor yang ada di depanmu. Dan setiap motor akan lolos.

**Kendali menentukan biaya pemeriksaan.** Motor dari pemilik yang menyimpan seluruh nota servis di satu berkas berurutan: kamu cukup membaca berkasnya, mencocokkan beberapa nota, selesai dalam satu jam.

Motor tanpa satu pun catatan: kamu harus membuka mesinnya.

Kondisi kedua motornya boleh sama. **Biaya memastikannya berbeda sepuluh kali** — dan itu seluruh isi \`AR = IR x CR x DR\` dalam satu kalimat.

Terakhir, soal sampel. Kamu tidak mungkin membuka seluruh bagian motor. Kamu memeriksa beberapa: kompresi, oli, rangka, kelistrikan.

Kalau dari sepuluh bagian yang kamu periksa ada satu yang bermasalah, kesimpulanmu bukan "ada satu masalah". Kesimpulanmu: **sekitar sepersepuluh motor ini bermasalah** — dan sisanya, yang belum kamu buka, kemungkinan menyimpan yang serupa.`,

  latihan: [
    'Untuk satu sistem yang kamu pakai sehari-hari, tulis lima kriteria audit yang bisa dinyatakan gagal, bukan yang berupa harapan.',
    'Taksir IR dan CR untuk satu proses di sistem itu, lalu hitung DR yang boleh bila AR ditargetkan lima persen.',
    'Ulangi hitungan itu untuk keadaan kendali kuat dan kendali lemah, lalu jelaskan berapa kali lipat pengujiannya harus bertambah.',
    'Hitung ukuran sampel untuk keyakinan sembilan puluh, sembilan puluh lima, dan sembilan puluh sembilan persen pada toleransi lima persen, lalu jelaskan kenapa kenaikannya tidak lurus.',
    'Jelaskan kenapa ukuran sampel pengujian atribut tidak bergantung pada besarnya populasi, dengan alasan bukan contoh.',
    'Ambil satu populasi nyata, tentukan sampelnya secara acak, dan catat cara pengambilannya sedetail mungkin agar bisa diulang orang lain.',
    'Untuk temuan nol, satu, dua, dan tiga penyimpangan dari enam puluh sampel, hitung taksiran populasinya pada populasi dua belas ribu.',
    'Susun lima bukti yang bisa kamu peroleh untuk satu kriteria, lalu urutkan dari yang paling kuat dan jelaskan alasan urutannya.',
    'Ambil satu log sistem yang bisa kamu akses, lalu tentukan siapa saja yang bisa mengubahnya dan apakah perubahannya tercatat.',
    'Tulis satu temuan lengkap dengan lima bagian kriteria, kondisi, sebab, akibat, dan saran, lalu periksa apakah bagian sebabnya benar-benar menjelaskan penyebabnya.'
  ]
});


TOPICS.push({
  id: 'audit-kendali',
  judul: 'Pengendalian Internal & Pengendalian Aplikasi',
  kategori: 'audit',
  tag: ['pengendalian internal', 'preventif detektif korektif', 'general control', 'application control', 'check digit', 'pemisahan tugas'],
  ringkas: 'NIK yang beda satu angka lolos semua uji format — yang menangkapnya cuma check digit.',

  fungsi: `**Merancang dan menguji kendali yang benar-benar menahan sesuatu, bukan yang cuma tertulis di prosedur.**

Terpakai di:

- **Menulis validasi** di aplikasi yang kamu bangun — bab ini menjelaskan mana validasi yang dihitung sebagai kendali dan mana yang cuma kenyamanan
- **Audit aplikasi** — pemeriksaan boundary, input, process, output, dan database adalah kerangka yang dipakai di lapangan
- **Merancang peran dan hak akses** pada sistem multipengguna
- **Menjawab pertanyaan "kenapa harus serumit ini"** dari klien atau dosen, dengan hitungan biaya kendali dibanding kerugian yang diharapkan
- **Tugas akhir** yang membangun sistem informasi — bagian pengendalian hampir selalu ditanyakan di sidang

Yang paling langsung berguna bagi programmer: **validasi di peramban bukan kendali.** Ia bisa dilewati sepenuhnya oleh siapa pun yang mengirim permintaan langsung ke peladen. Auditor yang menerima "sudah divalidasi di form" sebagai bukti sedang menerima bukti yang salah — dan pengembang yang menyerahkannya sedang mengira sistemnya terlindungi.

Dan satu teknik yang jarang dipakai padahal murah: **check digit.** Salah ketik satu angka pada NIK atau nomor rekening lolos setiap uji panjang dan uji format. Cuma check digit yang menangkapnya.`,
  praktik: {
    tujuan: 'Kamu punya lapisan validasi di sisi peladen yang lengkap lima tingkat, satu check digit yang bekerja, dan satu skrip pendek yang mendeteksi pelanggaran pemisahan tugas dari daftar peran pengguna.',
    alat: ['Satu aplikasi yang kamu bangun atau bisa kamu akses kodenya', 'Python untuk skrip pengujian', 'Daftar peran pengguna dari sistem itu (boleh dibuat contohnya)'],
    langkah: [
      { judul: 'Petakan kendali yang ada ke tiga waktu',
        isi: `Ambil satu proses di aplikasimu, lalu daftar kendalinya dan tandai masing-masing: **preventif** (mencegah), **detektif** (menemukan yang lolos), atau **korektif** (memulihkan).

Hampir selalu hasilnya condong berat ke preventif. Itu sebabnya penting dilihat: sistem yang cuma punya preventif akan gagal **diam-diam** — tidak ada satu pun mekanisme yang memberi tahu bahwa ada yang lolos.` },
      { judul: 'Hitung kelayakan satu kendali dengan angka',
        isi: `Untuk satu kendali yang sedang kamu pertimbangkan, taksir tiga hal: biaya per tahun, peluang kejadian yang dicegahnya, dan kerugiannya bila terjadi.

Bandingkan biaya dengan \`peluang x kerugian\`. Ini tidak menghasilkan keputusan otomatis, tetapi ia memaksa taksiranmu jadi eksplisit — dan taksiran yang eksplisit bisa didebat, sedangkan perasaan tidak.` },
      { judul: 'Tulis validasi sisi peladen lengkap lima tingkat',
        isi: `Untuk satu formulir, tulis pemeriksaan berurutan: **kelengkapan**, **tipe dan format**, **jangkauan nilai**, **daftar sah**, lalu **check digit** bila ada nomor identitas.

Urutannya bukan sembarang: memeriksa jangkauan pada field yang kosong menghasilkan galat yang menyesatkan. Berhenti lebih dulu bila kelengkapan gagal.` },
      { judul: 'Pasang satu check digit dan coba jebol sendiri',
        isi: `Implementasikan algoritme Luhn untuk satu nomor identitas. Lalu uji: ubah satu angka mana pun, dan lihat ia tertolak.

Ini yang membuat pelajarannya masuk: ambil nomor yang sah, ganti angka terakhirnya, dan perhatikan bahwa panjangnya masih benar, semuanya masih angka, dan **setiap uji format tetap lolos**.` },
      { judul: 'Buktikan validasi peramban bisa dilewati',
        isi: `Kirim permintaan langsung ke endpoint aplikasimu dengan data yang seharusnya ditolak formulir — pakai \`curl\` atau alat serupa.

Kalau ia masuk, kamu baru saja membuktikan sendiri bahwa validasi di peramban bukan kendali. Lakukan ini sekali, dan kamu tidak akan pernah lupa lagi.` },
      { judul: 'Susun daftar pasangan peran yang terlarang',
        isi: `Tulis pasangan wewenang yang tidak boleh dipegang satu orang, beserta **alasan bahayanya**: membuat vendor dan menyetujui pembayaran, memasukkan transaksi dan merekonsiliasi, mengubah program dan menjalankannya di produksi.

Bagian yang sulit di sini bukan kodenya, melainkan daftarnya — dan menyusunnya butuh memahami prosesnya, bukan memahami sistemnya.` },
      { judul: 'Jalankan deteksinya dengan kode',
        isi: `Ambil daftar peran tiap pengguna sebagai himpunan, lalu untuk setiap pasangan terlarang periksa apakah ia **himpunan bagian** dari peran seseorang.

Beberapa baris kode, dan bisa dijalankan tiap bulan. Simpan hasilnya, karena yang menarik justru perubahannya antar periode.` },
      { judul: 'Periksa urutan pemeriksaanmu sendiri',
        isi: `Sebelum menyimpulkan bahwa application control-nya kuat, periksa dulu **general control**-nya: siapa yang bisa mengubah program, dan apakah perubahannya melewati persetujuan.

Kalau administrator bisa menyunting program sesukanya, seluruh application control yang kamu uji tadi bisa dimatikan tanpa jejak — dan pengujianmu jadi tidak bermakna.` }
    ],
    cek: [
      'Setiap validasi penting di aplikasimu ada di sisi peladen, bukan hanya di peramban',
      'Kamu sudah membuktikan sendiri bahwa validasi peramban bisa dilewati',
      'Nomor identitas di sistemmu punya check digit, dan kamu sudah mengujinya dengan salah ketik satu angka',
      'Kamu punya daftar pasangan peran terlarang dan skrip yang memeriksanya'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — check digit dan deteksi pemisahan tugas',

  konsep: `Pengendalian internal adalah bagian audit SI yang paling langsung menyentuh pekerjaan programmer. Sebagian besar isinya adalah hal yang kamu tulis sendiri di kode — hanya dengan nama lain dan alasan yang lebih tegas.

**Tiga waktu kendali bekerja**

| Jenis | Kapan | Gunanya | Contoh |
|---|---|---|---|
| **Preventif** | sebelum | mencegah kejadiannya | validasi masukan, hak akses, pemisahan tugas |
| **Detektif** | sesudah | menemukan yang lolos | rekonsiliasi, log, uji duplikasi, alarm |
| **Korektif** | sesudah | memulihkan keadaan | pemulihan cadangan, jurnal koreksi, prosedur darurat |

Ketiganya dibutuhkan, dan alasannya bukan sekadar kelengkapan: **kendali preventif tidak pernah sempurna.**

Selalu ada yang lolos — lewat jalur yang tidak terpikirkan, lewat pengecualian yang diberikan sekali lalu jadi kebiasaan, lewat kesalahan yang bentuknya belum pernah ada. Kalau tidak ada yang menemukannya, sistemnya **gagal diam-diam**: tidak ada alarm, tidak ada keluhan, dan masalahnya baru muncul bertahun kemudian dalam bentuk yang tidak lagi bisa dilacak sebabnya.

Sistem yang cuma punya preventif adalah sistem yang tidak bisa membedakan "aman" dari "belum ketahuan".

**Kapan sebuah kendali layak dipasang**

Kendali punya harga: waktu, uang, dan gesekan bagi pemakainya. Kaidah dasarnya:

\`kendali layak bila biayanya < peluang x kerugian\`

Angka kanan itu **kerugian yang diharapkan**. Kendali seharga 8 juta setahun untuk mencegah kejadian berpeluang 5% dengan kerugian 60 juta punya kerugian harapan 3 juta — secara uang, tidak layak.

Tetapi hitungan ini **bukan pemutus**, dan ini penting. Ia penyaring. Beberapa kendali tetap dipasang meski gagal uji uang:

- karena **diwajibkan aturan** — audit log sering begitu
- karena tanpanya kejadian **tidak bisa direkonstruksi sama sekali**, dan nilai itu tidak masuk ke kolom kerugian
- karena menyangkut **uang tunai atau nyawa**, yang kerugiannya tidak berhenti pada angka

Yang dihasilkan hitungan ini: daftar kendali yang perlu **alasan lain di luar uang** untuk tetap dibenarkan. Kendali yang tidak punya alasan itu pun sebaiknya dilepas, karena kendali yang mahal dan tidak berguna melatih orang untuk melewati kendali.

**Dua lapis yang sering tertukar**

**General control** berlaku untuk seluruh lingkungan TI:

- manajemen akses dan kata sandi
- pengembangan dan perubahan program
- operasi pusat data dan pencadangan
- keamanan fisik dan jaringan

**Application control** melekat pada satu aplikasi, dan lazim dibagi lima:

| Lapis | Menjawab |
|---|---|
| **boundary** | siapa boleh masuk |
| **input** | apa yang boleh masuk |
| **process** | apakah hitungannya benar |
| **output** | siapa boleh melihat hasilnya |
| **database** | apakah datanya utuh |

Urutan pemeriksaannya **menentukan**: general control dulu.

Alasannya lurus. Kalau administrator bisa mengubah program sesukanya, maka application control seketat apa pun **tidak berarti** — karena ia bisa dimatikan tanpa jejak. Menguji validasi masukan dengan cermat di sistem yang programnya bisa diganti tanpa persetujuan adalah menguji pintu di rumah yang dindingnya bisa dibongkar.

**Pengendalian masukan: lima tingkat berurutan**

1. **kelengkapan** — field wajib terisi
2. **tipe dan format** — angka berisi angka, panjangnya benar
3. **jangkauan** — nilainya dalam batas yang mungkin
4. **daftar sah** — kodenya ada di daftar referensi
5. **check digit** — nomor identitasnya konsisten dengan dirinya sendiri

Empat yang pertama biasa dipakai. **Yang kelima hampir selalu dilupakan**, dan justru yang menangkap kesalahan paling berbahaya.

Bayangkan NIK yang benar berakhiran 9, dan operator mengetik 8. Panjangnya masih 16. Semuanya masih angka. Kodenya masih dari daftar sah. **Setiap uji format lolos.**

Data itu masuk sebagai data yang tampak sah sepenuhnya, dan baru ketahuan berbulan kemudian saat dicocokkan dengan sumber lain — kalau memang pernah dicocokkan.

**Di mana validasi diletakkan**

| Tempat | Kelebihan | Catatan |
|---|---|---|
| Peramban (JavaScript) | cepat, ramah pengguna | **bisa dilewati sepenuhnya** |
| Peladen (aplikasi) | tidak bisa dilewati | wajib ada, **ini yang dihitung sebagai kendali** |
| Basis data (constraint) | penjaga terakhir | menangkap yang lolos dari aplikasi |

Validasi di peramban itu **kenyamanan**, bukan kendali. Siapa pun bisa mengirim permintaan langsung ke peladen tanpa membuka halamannya.

Ini bukan hal teoretis: satu perintah \`curl\` sudah cukup. Dan begitu kamu membuktikannya sendiri di aplikasimu, cara kamu menulis backend berubah permanen.

**Pemisahan tugas**

Kendali yang paling tua dan paling sering dilanggar. Bentuknya: **wewenang yang saling mengawasi tidak boleh dipegang satu orang.**

| Kombinasi terlarang | Bahayanya |
|---|---|
| membuat vendor **+** menyetujui pembayaran | bisa membuat vendor palsu lalu membayarnya |
| memasukkan transaksi **+** merekonsiliasi bank | bisa menyembunyikan selisih yang ia buat sendiri |
| mengubah program **+** menjalankan di produksi | bisa menyisipkan kode tanpa ada yang memeriksa |
| mengelola akses **+** memakai akses istimewa | bisa memberi diri sendiri hak apa pun |

Baris ketiga langsung menyentuh pekerjaan pengembang, dan sering ditolak dengan alasan yang terasa masuk akal: timnya kecil, semua orang mengerjakan semua hal, memisahkannya memperlambat.

Alasan itu nyata. Tetapi akibatnya juga nyata, dan pemisahannya tidak harus berupa orang kedua — ia bisa berupa **alat**: pipeline yang menolak menyebarkan kode tanpa satu persetujuan tercatat. Kendali yang dipindahkan dari prosedur ke alat tidak bergantung pada orang mengingatnya.

Dan pemisahan tugas adalah salah satu kendali yang **paling mudah diuji dengan kode**: ambil peran tiap pengguna sebagai himpunan, lalu cari yang memuat pasangan terlarang. Beberapa baris, bisa dijalankan tiap bulan.

Yang sulit bukan kodenya, melainkan **menyusun daftar pasangan terlarangnya** — dan itu butuh memahami proses bisnisnya, bukan memahami sistemnya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: 'def cek_digit_luhn(nomor):\n    """Menangkap salah ketik SATU angka."""\n    digit = [int(c) for c in str(nomor) if c.isdigit()]\n    jumlah = 0\n    for i, d in enumerate(reversed(digit)):\n        if i % 2 == 1:          # posisi genap dari belakang\n            d *= 2\n            if d > 9:\n                d -= 9\n        jumlah += d\n    return jumlah % 10 == 0\n\n# 3301234567890129  -> True   (sah)\n# 3301234567890128  -> False  (beda SATU angka)\n#\n# Panjang sama. Semuanya angka. Lolos SETIAP uji format.',
      penjelasan: `Delapan baris yang menangkap jenis kesalahan yang tidak bisa ditangkap oleh pemeriksaan lain mana pun.

Mulai dari masalahnya. Operator mengetik NIK 16 angka. Satu angka salah — bukan hilang, bukan tertukar tempat, cuma **salah**. Sekarang periksa: panjangnya masih 16, semuanya masih angka, dua digit pertamanya masih kode provinsi yang sah.

Tidak ada satu pun uji format yang bisa menolaknya, karena secara format ia **memang sah**. Yang salah bukan bentuknya, melainkan isinya — dan bentuk tidak menyimpan informasi tentang isi.

Kecuali kalau sengaja dibuat menyimpannya. Itulah check digit.

**Cara kerjanya.** Angka terakhir bukan data; ia **hasil hitungan dari angka-angka sebelumnya**. Jadi nomornya membawa bukti tentang dirinya sendiri: kalau isinya berubah, hitungannya tidak lagi cocok.

Sekarang perhatikan dua hal dalam kodenya, karena keduanya disengaja dan keduanya penting.

**Pertama, penggandaan pada posisi bergantian.** Setiap angka pada posisi genap dari belakang dikalikan dua, dan bila hasilnya lebih dari 9 dikurangi 9.

Kenapa bergantian? Karena kalau seluruh angka diperlakukan sama, jumlahnya tidak berubah saat dua angka **bertukar tempat**. Salah ketik 12 menjadi 21 akan lolos. Dengan penggandaan bergantian, kedua angka itu masuk dengan bobot berbeda, sehingga tukar tempat mengubah jumlahnya.

Ini penting karena tukar tempat adalah salah satu kesalahan ketik manusia yang paling umum — orang yang mengetik cepat sangat sering menukar dua angka berurutan.

**Kedua, pengurangan 9 alih-alih penjumlahan digit.** Kalau \`d x 2 > 9\`, kodenya menulis \`d -= 9\`. Bandingkan: 8 x 2 = 16, dan 1 + 6 = 7, sedangkan 16 - 9 = 7. Sama. Dan itu berlaku untuk semua kasus, karena mengurangi 9 dari bilangan dua digit persis sama dengan menjumlahkan kedua digitnya. Cara kedua cuma lebih pendek.

**Kenapa modulo 10.** Kalau satu angka berubah, jumlahnya bergeser antara 1 sampai 9 — tidak pernah tepat 10 atau kelipatannya. Jadi \`jumlah % 10\` pasti berubah, dan pemeriksaannya pasti gagal.

Ini yang membuat jaminannya kuat: **setiap salah ketik satu angka pasti tertangkap.** Bukan kemungkinan besar — pasti.

Sekarang bagian yang lebih penting daripada algoritmenya: **kenapa ini jarang dipakai.**

Karena kesalahan yang dicegahnya **tidak pernah terlihat**. Kalau validasi format gagal, pengguna melihat pesan galat dan langsung tahu ada yang salah. Kalau check digit tidak ada, tidak terjadi apa-apa — datanya masuk, halamannya berhasil, semua orang senang.

Masalahnya muncul enam bulan kemudian, ketika data itu dicocokkan dengan sumber lain dan tidak ketemu. Pada titik itu, tidak ada yang tahu asal masalahnya, dan biaya memperbaikinya sudah puluhan kali biaya mencegahnya.

Inilah bentuk umum dari kendali detektif yang hilang: **biayanya tidak nol, ia cuma ditunda.**

Terakhir, di mana ini terpakai selain NIK. Nomor kartu kredit memakai Luhn persis seperti ini. ISBN, IMEI, nomor rekening di banyak bank, kode barang di gudang besar — semuanya menaruh satu angka pengaman di ujung. Kalau kamu merancang sistem yang punya nomor identitas sendiri, **satu angka tambahan** memberimu jaminan yang tidak bisa dibeli dengan cara lain.`
    },
    {
      bahasa: 'python',
      kode: "PERAN = {\n    'andi':  {'buat_vendor', 'input_transaksi'},\n    'citra': {'buat_vendor', 'setuju_bayar'},\n    'dedi':  {'ubah_program', 'deploy_produksi'},\n}\nTERLARANG = [\n    ({'buat_vendor', 'setuju_bayar'},     'vendor palsu lalu dibayar'),\n    ({'input_transaksi', 'rekonsiliasi'}, 'selisih bisa disembunyikan'),\n    ({'ubah_program', 'deploy_produksi'}, 'kode masuk tanpa diperiksa'),\n]\n\nfor orang, peran in PERAN.items():\n    for pasangan, bahaya in TERLARANG:\n        if pasangan <= peran:      # himpunan bagian\n            print(orang, sorted(pasangan), bahaya)\n\n# citra dan dedi terdeteksi; andi tidak.",
      penjelasan: `Lima baris logika untuk kendali yang usianya lebih tua daripada komputer.

Perhatikan operatornya lebih dulu: \`pasangan <= peran\`. Pada himpunan Python, \`<=\` bukan perbandingan ukuran — ia berarti **himpunan bagian**. Baris itu bertanya: apakah seluruh peran dalam pasangan terlarang ini ada pada orang tersebut?

Itu rumusan yang tepat untuk masalahnya, dan bentuknya bersih karena masalahnya memang masalah himpunan. Kalau ditulis dengan \`and\` berantai, kode yang sama akan panjang dan gampang salah saat pasangannya bertambah dari dua peran menjadi tiga.

Sekarang lihat kenapa **andi** tidak terdeteksi meski ia memegang dua peran. Ia punya \`buat_vendor\` dan \`input_transaksi\` — keduanya ada di daftar terlarang, tetapi **bukan sebagai pasangan**. Membuat vendor tidak berbahaya bila digabung dengan memasukkan transaksi; yang berbahaya adalah membuat vendor **digabung menyetujui pembayaran**.

Ini bukan detail kecil. Ini seluruh inti pemisahan tugas: yang dilarang bukan **banyaknya** wewenang, melainkan **kombinasi tertentu** yang membuat seseorang bisa menyelesaikan sebuah siklus tanpa disentuh orang lain.

Orang yang memegang lima peran yang tidak saling mengawasi tidak melanggar apa pun. Orang yang memegang dua peran yang tepat bisa mencuri tanpa jejak.

Sekarang bagian yang membuat topik ini sering disalahpahami. Kodenya lima baris, jadi terasa seperti masalah teknis kecil.

**Yang sulit bukan kodenya. Yang sulit menyusun daftar TERLARANG-nya.**

Untuk menulis satu baris di daftar itu, kamu harus tahu bagaimana uang atau data bergerak di organisasi tersebut, siapa yang memverifikasi apa, dan di titik mana sebuah transaksi berhenti bisa dibatalkan. Itu pengetahuan proses bisnis, bukan pengetahuan sistem — dan itu sebabnya audit SI tidak bisa dikerjakan oleh orang yang cuma paham teknologi.

Kalau daftarnya salah, kodenya akan jalan sempurna dan tidak menemukan apa pun.

Dua catatan praktis, keduanya sering menggagalkan pengujian ini di lapangan.

**Pertama, peran efektif bukan peran yang tercatat.** Seseorang bisa punya peran \`staf\` di sistem tetapi tahu kata sandi akun atasannya. Atau punya satu peran yang di dalamnya sudah mengandung dua wewenang terlarang sekaligus. Pengujian atas tabel peran tidak menangkap keduanya — jadi periksa juga **isi tiap peran**, bukan cuma siapa memegang peran apa.

**Kedua, yang menarik bukan hasil sekali jalan, melainkan perubahannya.** Jalankan tiap bulan dan simpan hasilnya. Pelanggaran yang **baru muncul** hampir selalu punya cerita: ada yang cuti lalu wewenangnya dititipkan, ada yang naik jabatan tetapi hak lamanya tidak dicabut.

Yang terakhir itu paling umum dan paling berbahaya: hak akses **menumpuk** sepanjang karier seseorang, karena memberi hak selalu ada yang meminta sedangkan mencabut hak tidak ada yang meminta.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Pengendalian internal & pengendalian aplikasi
# ============================================

# --------------------------------------------
# 1. Tiga waktu kendali bekerja
# --------------------------------------------
print("--- preventif, detektif, korektif ---")
WAKTU = [
    ("Preventif", "SEBELUM", "mencegah kejadiannya",
     "validasi masukan, hak akses, pemisahan tugas"),
    ("Detektif",  "SESUDAH", "menemukan yang lolos",
     "rekonsiliasi, log, uji duplikasi, alarm"),
    ("Korektif",  "SESUDAH", "memulihkan keadaan",
     "pemulihan cadangan, jurnal koreksi, prosedur darurat"),
]
for nama, kapan, guna, contoh in WAKTU:
    print("  " + nama.ljust(11) + kapan.ljust(9) + guna)
    print("      " + contoh)
print("")
print("  Ketiganya dibutuhkan, dan ini alasannya: kendali")
print("  preventif tidak pernah sempurna. Yang lolos harus ada")
print("  yang menemukan, dan yang ditemukan harus ada yang")
print("  memperbaiki. Sistem yang cuma punya preventif akan")
print("  gagal DIAM-DIAM.")

# --------------------------------------------
# 2. Biaya kendali vs biaya kegagalan
# --------------------------------------------
print("")
print("--- kapan kendali layak dipasang ---")
KASUS = [
    ("Validasi format NIK",        200_000,   0.30,  5_000_000),
    ("Persetujuan berjenjang",   15_000_000,  0.10, 400_000_000),
    ("Rekonsiliasi harian",      36_000_000,  0.25, 250_000_000),
    ("Pemisahan tugas kasir",     8_000_000,  0.05,  60_000_000),
    ("Audit log lengkap",        50_000_000,  0.02,  80_000_000),
]
print("  " + "kendali".ljust(24) + "biaya/thn".rjust(13)
      + "peluang".rjust(9) + "kerugian".rjust(14) + "  layak?")
for nama, biaya, peluang, rugi in KASUS:
    harapan_rugi = peluang * rugi
    layak = "YA" if harapan_rugi > biaya else "tidak"
    print("  " + nama.ljust(24) + f"{biaya:>13,}".replace(",", ".")
          + ("%.0f%%" % (peluang*100)).rjust(9)
          + f"{rugi:>14,}".replace(",", ".") + "  " + layak)
print("")
print("  Kaidahnya: kendali layak kalau biayanya lebih kecil")
print("  daripada kerugian yang diharapkan (peluang x dampak).")
print("")
print("  Dua baris terakhir tidak layak menurut hitungan uang.")
print("  Keduanya toh sering tetap dipasang, dan alasannya sah:")
print("  pemisahan tugas kasir menyangkut UANG TUNAI yang sulit")
print("  ditelusuri belakangan, dan audit log sering DIWAJIBKAN")
print("  aturan -- tanpanya kejadian tidak bisa direkonstruksi")
print("  sama sekali.")
print("")
print("  Jadi hitungan ini bukan pemutus, melainkan penyaring:")
print("  ia menunjukkan kendali mana yang perlu ALASAN LAIN di")
print("  luar uang untuk tetap dibenarkan.")

# --------------------------------------------
# 3. General control vs application control
# --------------------------------------------
print("")
print("--- dua lapis yang sering tertukar ---")
print("  GENERAL CONTROL — berlaku untuk SELURUH lingkungan TI")
for x in ["manajemen akses & kata sandi", "pengembangan & perubahan program",
          "operasi pusat data & cadangan", "keamanan fisik & jaringan"]:
    print("      - " + x)
print("")
print("  APPLICATION CONTROL — melekat pada SATU aplikasi")
for x in ["boundary: siapa boleh masuk",
          "input: apa yang boleh masuk",
          "process: apakah hitungannya benar",
          "output: siapa boleh melihat hasilnya",
          "database: apakah datanya utuh"]:
    print("      - " + x)
print("")
print("  Urutan pemeriksaannya PENTING: general control dulu.")
print("  Kalau administrator bisa mengubah program sesukanya,")
print("  maka application control seketat apa pun tidak berarti")
print("  -- karena ia bisa dimatikan tanpa jejak.")

# --------------------------------------------
# 4. Pengendalian masukan yang benar-benar jalan
# --------------------------------------------
print("")
print("--- uji pengendalian masukan ---")

def cek_digit_luhn(nomor):
    """Check digit gaya Luhn: menangkap salah ketik satu angka."""
    digit = [int(c) for c in str(nomor) if c.isdigit()]
    jumlah = 0
    for i, d in enumerate(reversed(digit)):
        if i % 2 == 1:
            d *= 2
            if d > 9:
                d -= 9
        jumlah += d
    return jumlah % 10 == 0

def validasi(baris):
    """Kembalikan daftar alasan penolakan; kosong berarti diterima."""
    salah = []
    # 1. kelengkapan
    for k in ("nik", "nama", "jumlah", "kode_akun"):
        if not baris.get(k):
            salah.append("field " + k + " kosong")
    if salah:
        return salah
    # 2. tipe & format
    if not str(baris["nik"]).isdigit() or len(str(baris["nik"])) != 16:
        salah.append("NIK harus 16 angka")
    # 3. jangkauan
    if not (0 < baris["jumlah"] <= 100_000_000):
        salah.append("jumlah di luar batas 0-100 juta")
    # 4. daftar sah
    if baris["kode_akun"] not in ("5101", "5102", "5201"):
        salah.append("kode akun tidak terdaftar")
    # 5. check digit
    if str(baris["nik"]).isdigit() and not cek_digit_luhn(baris["nik"]):
        salah.append("check digit NIK tidak cocok")
    return salah

SAH = "3301234567890129"          # check digit-nya cocok
SALAH_KETIK = "3301234567890128"   # beda SATU angka di akhir
UJI = [
    {"nik": SAH,         "nama": "Ani",  "jumlah": 2_500_000, "kode_akun": "5101"},
    {"nik": SALAH_KETIK, "nama": "Ani",  "jumlah": 2_500_000, "kode_akun": "5101"},
    {"nik": "33012345",  "nama": "Budi", "jumlah": 1_000_000, "kode_akun": "5102"},
    {"nik": SAH,         "nama": "",     "jumlah": 1_000_000, "kode_akun": "5101"},
    {"nik": SAH,         "nama": "Dewi", "jumlah": -50_000,   "kode_akun": "5101"},
    {"nik": SAH,         "nama": "Eka",  "jumlah": 3_000_000, "kode_akun": "9999"},
]
print("  " + "NIK".ljust(18) + "nama".ljust(10) + "jumlah".rjust(12)
      + "  hasil")
for b in UJI:
    salah = validasi(b)
    print("  " + str(b["nik"]).ljust(18)
          + (b["nama"] or "(kosong)").ljust(10)
          + f"{b['jumlah']:>12,}".replace(",", ".")
          + "  " + ("DITERIMA" if not salah else "DITOLAK"))
    if salah:
        print("      alasan: " + salah[0])
print("")
print("  Bandingkan dua baris pertama. NIK-nya beda SATU angka")
print("  terakhir, panjangnya sama, semuanya angka -- lolos")
print("  setiap uji format. Yang menangkapnya cuma CHECK DIGIT.")
print("")
print("  Tanpa itu, salah ketik satu angka masuk sebagai data")
print("  yang tampak sah sepenuhnya, dan baru ketahuan berbulan")
print("  kemudian saat datanya dicocokkan dengan sumber lain.")

# --------------------------------------------
# 5. Kenapa validasi harus di sisi PELADEN
# --------------------------------------------
print("")
print("--- di mana validasinya diletakkan ---")
TEMPAT = [
    ("Peramban (JavaScript)", "cepat, ramah",
     "BISA DILEWATI sepenuhnya"),
    ("Peladen (aplikasi)",    "tidak bisa dilewati",
     "wajib ada, ini yang dihitung sebagai kendali"),
    ("Basis data (constraint)","penjaga terakhir",
     "menangkap yang lolos dari aplikasi"),
]
for nama, plus, catat in TEMPAT:
    print("  " + nama.ljust(26) + plus)
    print("      " + catat)
print("")
print("  Validasi di peramban itu KENYAMANAN, bukan kendali.")
print("  Siapa pun bisa mengirim permintaan langsung ke peladen")
print("  tanpa membuka halamannya. Auditor yang menerima")
print("  'sudah divalidasi di form' sebagai bukti kendali")
print("  sedang menerima bukti yang salah.")

# --------------------------------------------
# 6. Pemisahan tugas
# --------------------------------------------
print("")
print("--- pemisahan tugas: kombinasi yang berbahaya ---")
LARANGAN = [
    ("Membuat vendor", "Menyetujui pembayaran",
     "bisa membuat vendor palsu lalu membayarnya"),
    ("Memasukkan transaksi", "Merekonsiliasi bank",
     "bisa menyembunyikan selisih yang ia buat sendiri"),
    ("Mengubah program", "Menjalankan di produksi",
     "bisa menyisipkan kode tanpa ada yang memeriksa"),
    ("Mengelola akses", "Memakai akses istimewa",
     "bisa memberi diri sendiri hak apa pun"),
]
for a, b, kenapa in LARANGAN:
    print("  " + a + "  +  " + b)
    print("      bahaya: " + kenapa)
print("")
print("  Ini yang bisa diuji dengan kode: ambil daftar peran")
print("  tiap pengguna, lalu cari yang memegang dua peran dari")
print("  satu baris terlarang.")

# --------------------------------------------
# 7. Uji pemisahan tugas pada data akses
# --------------------------------------------
print("")
print("--- deteksi pelanggaran pemisahan tugas ---")
PERAN = {
    "andi":  {"buat_vendor", "input_transaksi"},
    "budi":  {"setuju_bayar", "rekonsiliasi"},
    "citra": {"buat_vendor", "setuju_bayar"},
    "dedi":  {"ubah_program", "deploy_produksi"},
    "eka":   {"input_transaksi", "rekonsiliasi"},
    "fani":  {"kelola_akses"},
}
PASANGAN_TERLARANG = [
    ({"buat_vendor", "setuju_bayar"},        "vendor palsu lalu dibayar"),
    ({"input_transaksi", "rekonsiliasi"},    "selisih bisa disembunyikan"),
    ({"ubah_program", "deploy_produksi"},    "kode masuk tanpa diperiksa"),
]
temuan = []
for orang, peran in sorted(PERAN.items()):
    for terlarang, kenapa in PASANGAN_TERLARANG:
        if terlarang <= peran:
            temuan.append((orang, sorted(terlarang), kenapa))
print("  " + str(len(PERAN)) + " pengguna diperiksa terhadap "
      + str(len(PASANGAN_TERLARANG)) + " pasangan terlarang")
print("")
if temuan:
    for orang, pasangan, kenapa in temuan:
        print("  PELANGGARAN  " + orang)
        print("      peran   : " + " + ".join(pasangan))
        print("      bahaya  : " + kenapa)
else:
    print("  tidak ada pelanggaran")
print("")
print("  " + str(len(temuan)) + " pelanggaran dari " + str(len(PERAN))
      + " pengguna.")
print("")
print("  Uji ini beberapa baris kode dan bisa dijalankan tiap")
print("  bulan. Yang sulit BUKAN mendeteksinya, melainkan")
print("  menyusun daftar pasangan terlarangnya -- dan itu butuh")
print("  memahami prosesnya, bukan memahami kodenya.")` },
  output: `--- preventif, detektif, korektif ---
  Preventif  SEBELUM  mencegah kejadiannya
      validasi masukan, hak akses, pemisahan tugas
  Detektif   SESUDAH  menemukan yang lolos
      rekonsiliasi, log, uji duplikasi, alarm
  Korektif   SESUDAH  memulihkan keadaan
      pemulihan cadangan, jurnal koreksi, prosedur darurat

  Ketiganya dibutuhkan, dan ini alasannya: kendali
  preventif tidak pernah sempurna. Yang lolos harus ada
  yang menemukan, dan yang ditemukan harus ada yang
  memperbaiki. Sistem yang cuma punya preventif akan
  gagal DIAM-DIAM.

--- kapan kendali layak dipasang ---
  kendali                     biaya/thn  peluang      kerugian  layak?
  Validasi format NIK           200.000      30%     5.000.000  YA
  Persetujuan berjenjang     15.000.000      10%   400.000.000  YA
  Rekonsiliasi harian        36.000.000      25%   250.000.000  YA
  Pemisahan tugas kasir       8.000.000       5%    60.000.000  tidak
  Audit log lengkap          50.000.000       2%    80.000.000  tidak

  Kaidahnya: kendali layak kalau biayanya lebih kecil
  daripada kerugian yang diharapkan (peluang x dampak).

  Dua baris terakhir tidak layak menurut hitungan uang.
  Keduanya toh sering tetap dipasang, dan alasannya sah:
  pemisahan tugas kasir menyangkut UANG TUNAI yang sulit
  ditelusuri belakangan, dan audit log sering DIWAJIBKAN
  aturan -- tanpanya kejadian tidak bisa direkonstruksi
  sama sekali.

  Jadi hitungan ini bukan pemutus, melainkan penyaring:
  ia menunjukkan kendali mana yang perlu ALASAN LAIN di
  luar uang untuk tetap dibenarkan.

--- dua lapis yang sering tertukar ---
  GENERAL CONTROL — berlaku untuk SELURUH lingkungan TI
      - manajemen akses & kata sandi
      - pengembangan & perubahan program
      - operasi pusat data & cadangan
      - keamanan fisik & jaringan

  APPLICATION CONTROL — melekat pada SATU aplikasi
      - boundary: siapa boleh masuk
      - input: apa yang boleh masuk
      - process: apakah hitungannya benar
      - output: siapa boleh melihat hasilnya
      - database: apakah datanya utuh

  Urutan pemeriksaannya PENTING: general control dulu.
  Kalau administrator bisa mengubah program sesukanya,
  maka application control seketat apa pun tidak berarti
  -- karena ia bisa dimatikan tanpa jejak.

--- uji pengendalian masukan ---
  NIK               nama            jumlah  hasil
  3301234567890129  Ani          2.500.000  DITERIMA
  3301234567890128  Ani          2.500.000  DITOLAK
      alasan: check digit NIK tidak cocok
  33012345          Budi         1.000.000  DITOLAK
      alasan: NIK harus 16 angka
  3301234567890129  (kosong)     1.000.000  DITOLAK
      alasan: field nama kosong
  3301234567890129  Dewi           -50.000  DITOLAK
      alasan: jumlah di luar batas 0-100 juta
  3301234567890129  Eka          3.000.000  DITOLAK
      alasan: kode akun tidak terdaftar

  Bandingkan dua baris pertama. NIK-nya beda SATU angka
  terakhir, panjangnya sama, semuanya angka -- lolos
  setiap uji format. Yang menangkapnya cuma CHECK DIGIT.

  Tanpa itu, salah ketik satu angka masuk sebagai data
  yang tampak sah sepenuhnya, dan baru ketahuan berbulan
  kemudian saat datanya dicocokkan dengan sumber lain.

--- di mana validasinya diletakkan ---
  Peramban (JavaScript)     cepat, ramah
      BISA DILEWATI sepenuhnya
  Peladen (aplikasi)        tidak bisa dilewati
      wajib ada, ini yang dihitung sebagai kendali
  Basis data (constraint)   penjaga terakhir
      menangkap yang lolos dari aplikasi

  Validasi di peramban itu KENYAMANAN, bukan kendali.
  Siapa pun bisa mengirim permintaan langsung ke peladen
  tanpa membuka halamannya. Auditor yang menerima
  'sudah divalidasi di form' sebagai bukti kendali
  sedang menerima bukti yang salah.

--- pemisahan tugas: kombinasi yang berbahaya ---
  Membuat vendor  +  Menyetujui pembayaran
      bahaya: bisa membuat vendor palsu lalu membayarnya
  Memasukkan transaksi  +  Merekonsiliasi bank
      bahaya: bisa menyembunyikan selisih yang ia buat sendiri
  Mengubah program  +  Menjalankan di produksi
      bahaya: bisa menyisipkan kode tanpa ada yang memeriksa
  Mengelola akses  +  Memakai akses istimewa
      bahaya: bisa memberi diri sendiri hak apa pun

  Ini yang bisa diuji dengan kode: ambil daftar peran
  tiap pengguna, lalu cari yang memegang dua peran dari
  satu baris terlarang.

--- deteksi pelanggaran pemisahan tugas ---
  6 pengguna diperiksa terhadap 3 pasangan terlarang

  PELANGGARAN  citra
      peran   : buat_vendor + setuju_bayar
      bahaya  : vendor palsu lalu dibayar
  PELANGGARAN  dedi
      peran   : deploy_produksi + ubah_program
      bahaya  : kode masuk tanpa diperiksa
  PELANGGARAN  eka
      peran   : input_transaksi + rekonsiliasi
      bahaya  : selisih bisa disembunyikan

  3 pelanggaran dari 6 pengguna.

  Uji ini beberapa baris kode dan bisa dijalankan tiap
  bulan. Yang sulit BUKAN mendeteksinya, melainkan
  menyusun daftar pasangan terlarangnya -- dan itu butuh
  memahami prosesnya, bukan memahami kodenya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Validasi satu baris masukan', waktu: 'O(p)', memori: 'p = panjang field yang diperiksa' },
      { operasi: 'Check digit Luhn', waktu: 'O(d)', memori: 'd = jumlah angka, praktis konstan' },
      { operasi: 'Uji kelayakan biaya kendali', waktu: 'O(1)', memori: 'satu perkalian per kendali' },
      { operasi: 'Deteksi pelanggaran pemisahan tugas', waktu: 'O(U x P)', memori: 'U pengguna, P pasangan terlarang' },
      { operasi: 'Uji seluruh masukan satu periode', waktu: 'O(N x p)', memori: 'N baris transaksi' }
    ],
    intuisi: `Semua kendali di topik ini **murah secara komputasi**, dan itu bagian dari argumennya. Check digit menambah selusin operasi per baris; deteksi pemisahan tugas atas 5.000 pengguna dan 20 pasangan terlarang adalah 100.000 pemeriksaan himpunan — selesai dalam hitungan detik.

Karena murahnya, alasan untuk tidak memasangnya hampir selalu bukan alasan teknis. Ia alasan kebiasaan: tidak terpikirkan, atau terpikirkan tetapi kesalahan yang dicegahnya tidak pernah terlihat sehingga terasa tidak perlu.

\`O(U x P)\` juga menjelaskan kenapa pengujian ini layak dijalankan **berulang**. Biaya per jalan hampir nol, jadi menjalankannya bulanan tidak berbeda dari menjalankannya sekali — sedangkan nilainya justru datang dari perbandingan antar periode.`
  },

  kesalahanUmum: [
    {
      salah: 'Menghitung validasi di peramban sebagai kendali masukan.',
      kenapa: 'Validasi di sisi klien bisa dilewati sepenuhnya dengan mengirim permintaan langsung ke peladen tanpa membuka halamannya. Ia hanya memperbaiki pengalaman pemakai, sementara jalur yang dipakai penyerang tidak melewatinya sama sekali.',
      benar: 'Tempatkan seluruh pemeriksaan yang menentukan di sisi peladen, dan perlakukan validasi peramban murni sebagai kenyamanan.'
    },
    {
      salah: 'Memeriksa panjang dan format nomor identitas tanpa check digit.',
      kenapa: 'Salah ketik satu angka menghasilkan nomor yang panjangnya benar dan formatnya sah, sehingga lolos setiap uji format. Datanya masuk tanpa tanda apa pun dan baru ketahuan saat dicocokkan dengan sumber lain, ketika biaya memperbaikinya sudah berlipat.',
      benar: 'Tambahkan check digit pada setiap nomor identitas yang diketik manusia, dan uji dengan mengubah satu angka pada nomor yang sah.'
    },
    {
      salah: 'Menguji application control lebih dulu, lalu menyimpulkan aplikasinya terkendali.',
      kenapa: 'Application control bisa dimatikan tanpa jejak bila general control-nya lemah, misalnya bila administrator dapat mengubah program tanpa persetujuan. Kesimpulan atas lapis dalam menjadi tidak bermakna selama lapis luarnya belum diperiksa.',
      benar: 'Periksa general control lebih dulu, terutama pengendalian perubahan program dan hak istimewa, baru masuk ke application control.'
    },
    {
      salah: 'Membangun kendali preventif saja karena mencegah lebih baik daripada mengobati.',
      kenapa: 'Kendali preventif tidak pernah menutup seluruh jalur, sehingga selalu ada yang lolos. Tanpa kendali detektif, yang lolos tidak pernah diketahui dan sistemnya gagal secara diam-diam, sehingga masalahnya baru muncul ketika sebabnya sudah tidak bisa dilacak.',
      benar: 'Lengkapi setiap kendali preventif dengan satu kendali detektif yang memeriksa hasilnya secara berkala, misalnya rekonsiliasi atau uji duplikasi.'
    },
    {
      salah: 'Menolak hasil hitungan biaya kendali ketika ia menyimpulkan sebuah kendali tidak layak.',
      kenapa: 'Hitungan itu bukan pemutus melainkan penyaring. Beberapa kendali tetap wajib karena aturan atau karena tanpanya kejadian tidak bisa direkonstruksi, dan nilai itu memang tidak masuk ke kolom kerugian.',
      benar: 'Pakai hitungan untuk menandai kendali yang perlu alasan di luar uang, lalu tuliskan alasan itu secara eksplisit atau lepaskan kendalinya.'
    },
    {
      salah: 'Menilai pemisahan tugas dari banyaknya peran yang dipegang seseorang.',
      kenapa: 'Yang berbahaya bukan jumlah wewenang, melainkan kombinasi tertentu yang memungkinkan satu orang menyelesaikan sebuah siklus tanpa disentuh orang lain. Lima peran yang tidak saling mengawasi tidak melanggar apa pun, sementara dua peran yang tepat sudah cukup.',
      benar: 'Susun daftar pasangan wewenang yang terlarang beserta alasan bahayanya, lalu uji keanggotaannya sebagai himpunan bagian.'
    },
    {
      salah: 'Menguji pemisahan tugas hanya dari tabel pemberian peran.',
      kenapa: 'Satu peran bisa di dalamnya sudah mengandung dua wewenang terlarang sekaligus, dan wewenang efektif juga bisa datang dari kata sandi bersama atau akun yang dipinjam. Pengujian atas tabel peran melewatkan keduanya.',
      benar: 'Periksa juga isi tiap peran serta praktik pemakaian akun, dan jalankan pengujiannya berkala agar pelanggaran baru terlihat.'
    }
  ],

  analogi: `Bayangkan **kasir di sebuah kedai** yang baru buka.

Pemiliknya memasang satu aturan: setiap uang yang masuk dicatat di buku. Itu **kendali preventif** — mencegah uang hilang tanpa catatan.

Bulan pertama lancar. Bulan kedua, uang di kotak lebih sedikit daripada catatannya.

Sekarang pertanyaannya: **kapan itu mulai terjadi?**

Tidak ada yang tahu. Karena selama ini tidak pernah ada yang **menghitung ulang** kotak uang dan mencocokkannya dengan buku. Aturannya ada, tetapi tidak ada yang memeriksa apakah aturannya jalan.

Yang hilang **kendali detektif**. Dan perhatikan sifat kegagalannya: selama dua bulan, tidak ada satu pun tanda bahwa ada yang salah. Semua terlihat berjalan.

Pemiliknya lalu mulai mencocokkan tiap malam. Sekarang selisih ketahuan **dalam sehari**, bukan dalam dua bulan.

Sekarang bagian pemisahan tugas.

Kasirnya satu orang, dan ia yang menerima uang, mencatatnya di buku, **dan** menghitung ulang kotaknya tiap malam.

Kendali detektifnya ada. Tetapi ia dipegang oleh orang yang sama dengan yang membuat catatannya — jadi kalau ada selisih, dialah yang pertama tahu dan dialah yang menulis hasilnya.

Kendali detektif yang dipegang orang yang diawasinya **bukan kendali**. Ia formalitas.

Perbaikannya tidak harus menambah orang. Pemiliknya sendiri yang menghitung kotak, dua kali sepekan, pada waktu yang tidak diberitahukan. Cukup sekali itu untuk mengubah seluruh perhitungan bagi siapa pun yang berpikir mengambil.

Terakhir, soal check digit.

Kedai itu punya kartu pelanggan bernomor. Pelanggan menyebut nomornya, kasir mengetiknya, poin masuk.

Suatu hari seorang pelanggan mengeluh poinnya tidak bertambah. Ternyata kasir salah mengetik satu angka, dan poinnya masuk ke **kartu orang lain** — kartu yang nomornya sah, ada pemiliknya, dan tidak ada yang salah dengannya.

Kalau nomor kartunya punya satu angka pengaman di ujung, ketikan yang salah itu **langsung tertolak** di depan kasir, dan pelanggannya menyebutkan ulang nomornya. Selesai dalam tiga detik.

Tanpa itu, biayanya: poin yang salah masuk, pelanggan yang kecewa, dan pemilik yang harus mencari transaksi mana yang salah di antara ribuan.

Kendali yang paling murah selalu **yang bekerja saat datanya masuk.**`,

  latihan: [
    'Ambil satu proses di aplikasi yang kamu bangun, lalu daftar kendalinya dan tandai masing-masing sebagai preventif, detektif, atau korektif.',
    'Tunjukkan satu kendali detektif yang hilang di sistemmu, lalu jelaskan bentuk kegagalan diam-diam yang mungkin terjadi karenanya.',
    'Taksir biaya, peluang, dan kerugian untuk tiga kendali, lalu tentukan mana yang layak secara uang dan mana yang butuh alasan lain.',
    'Tulis validasi sisi peladen lengkap lima tingkat untuk satu formulir, dengan urutan pemeriksaan yang berhenti pada kegagalan kelengkapan.',
    'Implementasikan check digit Luhn, lalu uji dengan mengubah satu angka pada nomor sah dan dengan menukar dua angka berurutan.',
    'Jelaskan kenapa penggandaan pada posisi bergantian diperlukan, dengan menunjukkan kesalahan yang lolos bila seluruh angka diperlakukan sama.',
    'Kirim permintaan langsung ke endpoint aplikasimu dengan data yang seharusnya ditolak formulir, lalu catat apa yang terjadi.',
    'Susun daftar lima pasangan wewenang terlarang untuk satu organisasi nyata, masing-masing dengan alasan bahayanya.',
    'Tulis skrip yang mendeteksi pelanggaran pemisahan tugas dari daftar peran, lalu jalankan pada data peran yang kamu susun sendiri.',
    'Cari satu peran di sistem nyata yang di dalamnya sudah mengandung dua wewenang terlarang sekaligus, lalu usulkan pemecahannya.'
  ]
});


TOPICS.push({
  id: 'audit-tata-kelola',
  judul: 'Audit Tata Kelola TI & Tingkat Kematangan',
  kategori: 'audit',
  tag: ['tata kelola TI', 'COBIT', 'tingkat kematangan', 'kesenjangan', 'IT Balanced Scorecard', 'temuan audit'],
  ringkas: 'Dua proses sama-sama tertinggal 2,0 tingkat — tapi yang satu dua kali lebih penting.',

  fungsi: `**Menilai apakah keputusan TI diambil oleh yang berwenang dan diawasi hasilnya, lalu mengurutkan perbaikannya secara masuk akal.**

Terpakai di:

- **Tugas akhir bertema evaluasi tata kelola TI** — penilaian tingkat kematangan dengan kerangka COBIT adalah salah satu tema skripsi informatika yang paling sering diambil, dan bagian yang paling sering dikerjakan asal-asalan
- **Menyusun rekomendasi** yang bisa ditindaklanjuti, bukan yang berbunyi "harap ditingkatkan"
- **Menjawab pertanyaan sidang** tentang kenapa target kematangannya tidak semuanya 5
- **Kerja nyata** — hampir semua laporan audit SI memuat bagian tata kelola
- **Menulis temuan** dalam lima bagian yang dipakai di seluruh dunia audit

Yang paling sering keliru di skripsi: **mengurutkan prioritas perbaikan dari besarnya kesenjangan saja.** Dua proses yang sama-sama tertinggal 2,0 tingkat tidak sama pentingnya, dan mengurutkan tanpa bobot menaruh perhatian pada proses yang tertinggal jauh tetapi tidak kritis.

Dan yang kedua: **menargetkan semua proses di tingkat 5.** Biaya kematangan naik jauh lebih cepat daripada tingkatnya — naik dari 4 ke 5 lebih mahal daripada seluruh perjalanan dari 1 ke 4. Target yang diseragamkan adalah tanda bahwa penilaiannya belum dipikirkan.`,
  praktik: {
    tujuan: 'Kamu punya penilaian kematangan untuk satu organisasi nyata: daftar proses, nilai kini dan target yang beralasan, bobot kepentingan, urutan prioritas yang bisa dipertahankan, dan temuan yang ditulis dalam lima bagian.',
    alat: ['Satu organisasi yang bisa kamu wawancarai (kampus, koperasi, UMKM, unit kegiatan)', 'Spreadsheet untuk tabel penilaian', 'Daftar proses dari kerangka COBIT atau yang kamu susun sendiri'],
    langkah: [
      { judul: 'Pisahkan dulu tata kelola dari manajemen',
        isi: `Sebelum menilai apa pun, pastikan yang kamu nilai memang tata kelola: apakah keputusan TI diambil oleh yang berwenang, dengan pertimbangan tercatat, dan diawasi hasilnya.

Kalau yang kamu nilai ternyata "apakah proyeknya selesai tepat waktu", kamu sedang menilai manajemen. Keduanya sah dinilai, tetapi mencampurnya membuat kesimpulannya tidak bisa ditindaklanjuti oleh siapa pun — karena penanggung jawabnya berbeda.` },
      { judul: 'Pilih lima sampai sepuluh proses, jangan seluruh kerangka',
        isi: `COBIT punya puluhan proses. Menilai semuanya di satu skripsi menghasilkan penilaian yang dangkal di semuanya.

Pilih yang relevan bagi organisasinya, dan **tulis alasan pemilihannya**. Alasan itu bagian dari hasil kerjamu, bukan basa-basi metodologi.` },
      { judul: 'Nilai kematangan kini dari bukti, bukan dari kuesioner saja',
        isi: `Kuesioner mengukur **apa yang orang kira** tentang prosesnya. Untuk tingkat 3 ke atas, minta buktinya: mana dokumen prosedurnya, siapa yang dilatih, apa angka yang dipantau.

Batas paling menentukan antara **2 dan 3**: dari "kebiasaan yang sama" menjadi "aturan tertulis". Kalau prosedurnya tidak bisa ditunjukkan, nilainya tidak bisa 3 berapa pun jawaban kuesionernya.` },
      { judul: 'Tetapkan target per proses, dengan alasannya',
        isi: `Jangan seragamkan. Untuk tiap proses tanyakan: seberapa buruk akibatnya kalau proses ini gagal?

Proses yang jarang dipakai dan risikonya kecil cukup di tingkat 2. Menargetkan seluruhnya di 4 atau 5 membuat rencanamu mustahil dijalankan, dan itu terlihat jelas oleh penguji yang berpengalaman.` },
      { judul: 'Beri bobot kepentingan, lalu hitung prioritasnya',
        isi: `Beri tiap proses bobot 1 sampai 5 berdasarkan dampaknya bagi organisasi, lalu hitung \`prioritas = kesenjangan x bobot\`.

Urutkan dari yang terbesar. Sekarang bandingkan urutan ini dengan urutan berdasarkan kesenjangan saja — perbedaannya adalah nilai tambah dari langkah ini, dan ia layak ditulis di laporanmu.` },
      { judul: 'Uji urutanmu pada dua proses bergap sama',
        isi: `Cari dua proses yang kesenjangannya sama persis tetapi bobotnya berbeda. Tunjukkan bahwa keduanya berpisah jauh di urutan prioritas.

Ini contoh paling jelas untuk menjelaskan kenapa bobot diperlukan, dan ia datang dari datamu sendiri — bukan dari contoh buatan.` },
      { judul: 'Nilai juga dengan empat sudut IT Balanced Scorecard',
        isi: `Untuk organisasi yang kamu nilai, cari satu ukuran nyata di tiap sudut: kontribusi organisasi, orientasi pengguna, keunggulan operasional, orientasi masa depan.

Sudut yang paling sering kosong: **penyampaian nilai**. Organisasi bisa menunjukkan proyek selesai, tetapi tidak bisa menunjukkan manfaat yang dijanjikannya tercapai.` },
      { judul: 'Tulis tiap temuan dalam lima bagian',
        isi: `Kriteria, kondisi, sebab, akibat, saran.

Periksa bagian **sebab** dengan keras: apakah ia benar-benar menjelaskan kenapa, atau cuma mengulang kondisinya dengan kalimat lain? "Karena tidak ada persetujuan" bukan sebab — itu kondisi. Sebabnya mungkin "tidak ada alur persetujuan di alat penyebaran".

Dan usahakan saranmu memindahkan kendali dari **prosedur ke alat**. Prosedur bergantung pada orang mengingatnya.` }
    ],
    cek: [
      'Setiap nilai kematangan 3 ke atas yang kamu berikan didukung dokumen yang bisa ditunjukkan',
      'Target kematanganmu berbeda-beda antar proses, dan tiap target punya alasan tertulis',
      'Urutan prioritasmu memakai bobot, dan kamu bisa menunjukkan bedanya dengan urutan tanpa bobot',
      'Setiap temuanmu punya bagian sebab yang tidak sekadar mengulang kondisinya'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa kesenjangan saja menyesatkan',

  konsep: `Tata kelola TI adalah bagian audit yang paling sering ditulis dengan kalimat besar dan paling jarang menghasilkan sesuatu yang bisa dikerjakan. Topik ini mengambil arah sebaliknya: setiap gagasannya diturunkan sampai jadi angka yang bisa dihitung.

**Tata kelola bukan manajemen**

| Hal | Tata kelola | Manajemen |
|---|---|---|
| **Pertanyaan** | apakah kita melakukan hal yang **benar** | apakah kita melakukannya dengan **benar** |
| **Siapa** | dewan atau pimpinan puncak | manajer TI |
| **Keluaran** | arah, kewenangan, batas | rencana, jadwal, laporan |
| **Ukuran** | nilai bagi organisasi | biaya, waktu, mutu |

Bedanya bukan soal tingkatan jabatan. Bedanya soal **pertanyaan yang dijawab**.

Sebuah proyek bisa dijalankan dengan manajemen yang sempurna — tepat waktu, sesuai anggaran, mutunya baik — dan tetap menjadi kegagalan tata kelola, kalau ternyata proyek itu tidak pernah perlu dikerjakan.

Yang diaudit di sini: apakah keputusan TI diambil oleh yang berwenang, dengan pertimbangan yang tercatat, dan diawasi hasilnya. Bukan apakah proyeknya selesai tepat waktu.

**Lima area yang lazim diaudit**

| Area | Pertanyaannya |
|---|---|
| Penyelarasan strategis | TI mendukung tujuan organisasi? |
| **Penyampaian nilai** | investasi TI menghasilkan manfaat? |
| Manajemen sumber daya | orang, data, infrastruktur cukup? |
| Manajemen risiko | risiko TI dikenali dan ditangani? |
| Pengukuran kinerja | hasilnya diukur dan dilaporkan? |

Area kedua yang paling sering kosong, dan bentuk kekosongannya khas: organisasi bisa menunjukkan **proyek selesai**, tetapi tidak bisa menunjukkan **manfaat yang dijanjikannya tercapai**.

Sistem baru dipasang untuk memangkas waktu pengajuan dari sembilan hari jadi dua. Setahun kemudian, sistemnya jalan, semua orang memakainya, dan tidak ada satu pun yang pernah mengukur berapa hari waktu pengajuan sekarang.

Proyeknya berhasil. Manfaatnya tidak diketahui.

**Tingkat kematangan**

| Tingkat | Nama | Artinya |
|---|---|---|
| **0** | Tidak ada | prosesnya tidak dikenali sama sekali |
| **1** | Ad hoc | ada, tapi tergantung orangnya |
| **2** | Berulang | polanya sama, belum tertulis |
| **3** | Baku | tertulis, dilatihkan, dipatuhi |
| **4** | Terukur | diukur dengan angka, dipantau |
| **5** | Dioptimalkan | diperbaiki terus dari hasil ukurannya |

Batas yang paling menentukan **antara 2 dan 3**: dari "kebiasaan yang sama" menjadi "aturan tertulis".

Alasannya bukan formalitas. Di bawah tingkat 3, proses **hilang begitu orangnya pindah**. Semua pengetahuannya ada di kepala satu-dua orang, dan tidak ada satu pun cara memindahkannya selain menunggu penggantinya belajar dari awal — dengan hasil yang berbeda.

Dan batas antara 3 dan 4 juga punya sifat khas: prosedur yang tertulis tetapi **tidak diukur** tidak bisa diketahui apakah dipatuhi. Organisasi yang bangga punya prosedur lengkap sering ada di tingkat 3, dan tidak tahu bahwa separuh prosedurnya sudah lama tidak dijalankan.

**Kesenjangan dikali bobot**

Ini bagian yang paling sering dikerjakan setengah jalan.

Setelah menilai kondisi kini dan target, kesenjangannya dihitung: \`gap = target - kini\`. Lalu daftarnya diurutkan dari gap terbesar, dan itu menjadi urutan prioritas perbaikan.

Urutan itu **salah**, dan salahnya sistematis.

Kesenjangan cuma mengukur seberapa jauh tertinggal. Ia tidak mengukur **seberapa penting**. Proses manajemen kapasitas yang tertinggal 2,0 tingkat dan proses pencadangan yang juga tertinggal 2,0 tingkat berada di urutan yang sama — padahal kegagalan pencadangan bisa menghabiskan data organisasi, sementara kegagalan manajemen kapasitas menghasilkan sistem yang lambat.

Perbaikannya satu kolom: **bobot kepentingan**.

\`prioritas = gap x bobot\`

Dengan bobot 4 dan 2, dua proses bergap 2,0 tadi berpisah menjadi 8,0 dan 4,0 — dan urutannya sekarang menggambarkan apa yang sebenarnya perlu dikerjakan lebih dulu.

**Kenapa target 5 hampir selalu salah**

| Tingkat | Biaya relatif | Tambahan dari tingkat sebelumnya |
|---|---|---|
| 1 | 1 | — |
| 2 | 3 | +2 |
| 3 | 8 | +5 |
| 4 | 20 | +12 |
| 5 | 50 | +30 |

Biayanya naik jauh lebih cepat daripada tingkatnya. Perhatikan kolom terakhir: naik dari 4 ke 5 memakan **+30**, sementara seluruh perjalanan dari 1 ke 4 memakan +19.

Naik satu tingkat terakhir lebih mahal daripada seluruh perjalanan sebelumnya.

Karena itu targetnya ditetapkan **per proses**, sesuai seberapa kritis ia. Proses yang jarang dipakai dan risikonya kecil cukup di tingkat 2 — dan menuliskannya sebagai target adalah keputusan yang benar, bukan kompromi.

**IT Balanced Scorecard**

Empat sudut pandang, supaya penilaiannya tidak cuma satu sisi:

| Sudut | Yang dilihat | Contoh ukuran |
|---|---|---|
| Kontribusi organisasi | manfaat bisnis dari TI | penghematan, pendapatan baru |
| Orientasi pengguna | kepuasan pemakai | waktu tanggap keluhan |
| Keunggulan operasional | efisiensi penyelenggaraan | ketersediaan sistem, jumlah insiden |
| Orientasi masa depan | kesiapan ke depan | pelatihan, pembaruan teknologi |

Gunanya menghindari kesimpulan yang benar tetapi tidak lengkap. Departemen TI bisa sangat efisien secara operasional — sistemnya jarang mati, insidennya sedikit — dan sama sekali tidak menyumbang apa pun ke tujuan organisasi.

Tanpa keempat sudut ini, hal itu **tidak akan pernah terlihat di laporan**, karena laporan operasionalnya akan tampak sangat baik.

**Anatomi temuan audit**

| Bagian | Isinya | Contoh |
|---|---|---|
| **Kriteria** | apa yang seharusnya | setiap perubahan program disetujui tertulis |
| **Kondisi** | apa yang ditemukan | 12 dari 40 perubahan tanpa persetujuan |
| **Sebab** | kenapa terjadi | tidak ada alur persetujuan di alat penyebaran |
| **Akibat** | apa risikonya | kode bisa masuk produksi tanpa diperiksa |
| **Saran** | apa yang diusulkan | wajibkan persetujuan di alat, bukan di prosedur |

Yang paling sering dilewatkan bagian **sebab**. Tanpa itu, sarannya jatuh menjadi "harap lebih tertib" — dan temuan yang sama akan muncul lagi tahun depan, karena tidak ada satu pun yang berubah pada penyebabnya.

Perhatikan juga bentuk sarannya: ia memindahkan kendali dari **prosedur ke alat**. Prosedur bergantung pada orang mengingatnya dan memilih mematuhinya; alat menegakkannya sendiri, setiap kali, tanpa kecuali.

Saran yang berbentuk "buat kebijakan" hampir selalu lebih lemah daripada saran yang berbentuk "ubah alatnya supaya jalan yang salah tidak bisa ditempuh".`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# prioritas = gap x bobot,  bukan gap saja\n#\n#   proses                      kini  target  gap  bobot  prio\n#   Manajemen perubahan program  1.8    4.0   2.2     5   11.0\n#   Pengukuran kinerja TI        0.8    3.0   2.2     4    8.8\n#   Pencadangan & pemulihan      2.0    4.0   2.0     4    8.0\n#   Manajemen hak akses          2.4    4.0   1.6     5    8.0\n#   Manajemen insiden            1.2    3.0   1.8     3    5.4\n#   Manajemen kapasitas          1.0    3.0   2.0     2    4.0\n#   Manajemen vendor             2.6    3.0   0.4     3    1.2\n#\n# Pencadangan dan Kapasitas: gap SAMA (2.0), prioritas 8.0 vs 4.0.\n# Hak akses gap-nya kecil (1.6) tapi naik ke peringkat 4.',
      penjelasan: `Satu kolom tambahan yang mengubah seluruh urutan, dan menjelaskan kenapa banyak rekomendasi audit tidak pernah dikerjakan.

Mulai dari cara yang lazim dipakai. Nilai kematangan kini dan target dikumpulkan, kesenjangannya dihitung, lalu daftarnya diurutkan dari gap terbesar. Urutan itu masuk ke laporan sebagai urutan prioritas perbaikan.

Sekarang lihat apa yang sebenarnya diukur oleh gap: **seberapa jauh tertinggal.** Itu saja.

Tidak ada di dalamnya informasi tentang seberapa buruk akibatnya kalau proses itu gagal. Dan dua hal itu **tidak berhubungan sama sekali**.

Perhatikan **Pencadangan & pemulihan** dan **Manajemen kapasitas** pada tabel. Keduanya tertinggal 2,0 tingkat — sama persis. Diurutkan dari gap, keduanya sederajat, dan mana yang ditulis lebih dulu tinggal soal urutan abjad.

Tetapi akibat kegagalannya sama sekali tidak sederajat. Pencadangan yang gagal berarti **data organisasi hilang**. Kapasitas yang gagal berarti sistemnya lambat di jam sibuk.

Keduanya masalah. Yang satu bisa menghentikan organisasi; yang lain membuat orang mengeluh.

Dengan bobot 4 dan 2, prioritasnya menjadi 8,0 dan 4,0 — **dua kali lipat**, dan urutannya sekarang mencerminkan apa yang benar-benar perlu dikerjakan lebih dulu.

Sekarang perhatikan **Manajemen hak akses**, karena ia menunjukkan sisi sebaliknya.

Gap-nya cuma 1,6 — paling kecil kedua di tabel, jauh di bawah beberapa proses lain. Diurutkan dari gap, ia turun ke bawah dan hampir pasti tidak dikerjakan tahun ini.

Tetapi bobotnya 5, dan prioritasnya 8,0 — naik ke peringkat empat, sejajar dengan pencadangan.

Bacanya begini: proses ini **sudah cukup baik** (2,4 dari target 4,0), tetapi karena ia sangat penting, sisa kesenjangan yang tidak besar pun layak dikerjakan. Perbaikan kecil pada hal yang kritis mengalahkan perbaikan besar pada hal yang tidak.

Ini kebalikan dari naluri. Naluri menyuruh mengejar yang paling tertinggal, karena angkanya paling mencolok dan perbaikannya paling terasa besar.

Sekarang bagian yang jarang disebut: **kenapa urutan yang salah punya akibat nyata.**

Rekomendasi audit dikerjakan dengan sumber daya terbatas. Organisasi biasanya sanggup mengerjakan tiga sampai lima teratas dari daftarmu, dan sisanya menunggu tahun depan.

Jadi urutan bukan urusan estetika laporan. Urutan **menentukan mana yang benar-benar dikerjakan**. Daftar yang diurutkan dari gap saja akan menaruh manajemen kapasitas di atas manajemen hak akses — dan setahun kemudian sistemnya lebih cepat sementara akun mantan pegawai masih hidup.

Terakhir, soal bobotnya sendiri. Bobot itu **taksiran**, dan ia subjektif. Itu bukan kelemahan, asal dua syarat dipenuhi: bobotnya ditetapkan **sebelum** melihat hasil penilaian, dan **alasannya ditulis**.

Bobot yang ditetapkan sesudah melihat hasil akan menyesuaikan diri dengan kesimpulan yang sudah kamu inginkan. Dan bobot tanpa alasan tidak bisa didebat, sehingga tidak bisa diperbaiki oleh orang yang lebih tahu organisasinya daripada kamu.`
    },
    {
      bahasa: 'python',
      kode: "# BIAYA NAIK JAUH LEBIH CEPAT DARIPADA TINGKATNYA\n#\n#   tingkat  biaya relatif  tambahan\n#      1            1          -\n#      2            3         +2\n#      3            8         +5\n#      4           20        +12\n#      5           50        +30\n#\n# 4 -> 5 memakan +30\n# 1 -> 4 seluruhnya memakan +19\n#\n# TEMUAN YANG BISA DITINDAKLANJUTI:\n#   Kriteria : apa yang SEHARUSNYA\n#   Kondisi  : apa yang DITEMUKAN\n#   Sebab    : KENAPA terjadi        <- paling sering hilang\n#   Akibat   : APA risikonya\n#   Saran    : APA yang diusulkan",
      penjelasan: `Dua hal yang tampak tidak berhubungan, tetapi keduanya menjawab pertanyaan yang sama: **kenapa rekomendasi audit sering tidak menghasilkan perubahan?**

**Yang pertama: target yang mustahil.**

Lihat bentuk kenaikan biayanya. Dari 1 ke 2 butuh +2. Dari 4 ke 5 butuh +30 — lima belas kali lipat, untuk kenaikan tingkat yang sama besarnya di atas kertas.

Kenapa begitu? Karena isi tiap tingkat berbeda jenisnya, bukan berbeda kadarnya.

Naik ke tingkat 3 berarti **menuliskan** apa yang selama ini dikerjakan — melelahkan, tapi bahannya sudah ada di kepala orang. Naik ke tingkat 4 berarti **mengukur**: memasang instrumen, mengumpulkan angka, memantau. Itu pekerjaan baru yang berjalan terus, bukan pekerjaan sekali jadi.

Dan naik ke tingkat 5 berarti **memperbaiki proses secara sistematis dari hasil ukuran** — yang menuntut orang yang pekerjaannya memang itu, terus-menerus. Untuk sebagian besar proses di sebagian besar organisasi, tidak ada satu pun alasan mengeluarkan biaya sebesar itu.

Sekarang bayangkan laporan audit yang menargetkan seluruh proses di tingkat 5. Bagi yang membacanya dan tahu harganya, laporan itu **langsung kehilangan kredibilitasnya** — bukan karena targetnya terlalu tinggi, melainkan karena penulisnya jelas belum memikirkan biayanya.

Target yang beralasan justru terlihat lebih serius: proses kritis di 4, proses biasa di 3, proses yang jarang dipakai di 2. Dan tiap angka disertai kalimat kenapa.

**Yang kedua: temuan tanpa sebab.**

Lima bagian temuan itu terlihat seperti daftar formalitas laporan. Ia sebenarnya alat berpikir, dan satu bagiannya memikul hampir seluruh bebannya.

Perhatikan bedanya:

- **Kondisi**: 12 dari 40 perubahan program naik ke produksi tanpa persetujuan tertulis.
- **Sebab**: alat penyebarannya tidak punya alur persetujuan sama sekali, sehingga persetujuan hanya bisa dilakukan lewat pesan terpisah yang mudah dilupakan.

Tanpa bagian sebab, saran yang keluar akan berbunyi: *"agar seluruh perubahan program disetujui terlebih dahulu"*. Kalimat itu benar, tidak bisa dibantah, dan **tidak mengubah apa pun** — karena ia cuma mengulang kriteria yang sudah ada dan sudah dilanggar.

Dengan bagian sebab, sarannya jadi: *"tambahkan alur persetujuan wajib di alat penyebaran, sehingga penyebaran tanpa persetujuan tidak bisa dijalankan"*.

Perbedaan keduanya besar sekali, dan bentuknya khas: yang pertama meminta orang **lebih tertib**, yang kedua membuat ketidaktertiban **tidak mungkin**.

Inilah kaidah yang paling berguna dari seluruh topik ini: **pindahkan kendali dari prosedur ke alat.**

Prosedur bergantung pada orang mengingatnya, memahaminya, dan memilih mematuhinya — tiga syarat yang gagal secara berkala pada manusia mana pun, terutama saat sedang terburu-buru. Alat menegakkannya sendiri, setiap kali, termasuk pada pukul sebelas malam menjelang tenggat.

Dan ada cara cepat menguji kualitas bagian sebab yang kamu tulis: **tanyakan "kenapa" pada bagian sebabmu sendiri.** Kalau masih bisa dijawab dengan sesuatu yang lebih mendasar, kamu belum sampai ke sebabnya.

"Karena tidak ada persetujuan" — kenapa? "Karena alatnya tidak menyediakan" — kenapa? "Karena saat alat itu dipilih, persetujuan belum jadi kebijakan."

Berhenti di lapis mana pun boleh, asal kamu sadar sedang berhenti di lapis mana, dan saranmu ditujukan ke lapis itu.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Audit tata kelola TI: COBIT & tingkat kematangan
# ============================================

# --------------------------------------------
# 1. Tata kelola bukan manajemen
# --------------------------------------------
print("--- tata kelola vs manajemen TI ---")
BEDA = [
    ("Pertanyaan",  "apakah kita melakukan hal yang BENAR",
     "apakah kita melakukannya dengan BENAR"),
    ("Siapa",       "dewan / pimpinan puncak", "manajer TI"),
    ("Keluaran",    "arah, kewenangan, batas", "rencana, jadwal, laporan"),
    ("Ukuran",      "nilai bagi organisasi",   "biaya, waktu, mutu"),
]
for hal, tk, mj in BEDA:
    print("  " + hal)
    print("      tata kelola : " + tk)
    print("      manajemen   : " + mj)
print("")
print("  Yang diaudit di sini tata kelolanya: apakah keputusan")
print("  TI diambil oleh yang berwenang, dengan pertimbangan yang")
print("  tercatat, dan diawasi hasilnya. Bukan apakah proyeknya")
print("  selesai tepat waktu -- itu urusan manajemen.")

# --------------------------------------------
# 2. Lima area tata kelola yang lazim diaudit
# --------------------------------------------
print("")
print("--- lima area ---")
AREA = [
    ("Penyelarasan strategis", "TI mendukung tujuan organisasi?"),
    ("Penyampaian nilai",      "investasi TI menghasilkan manfaat?"),
    ("Manajemen sumber daya",  "orang, data, infrastruktur cukup?"),
    ("Manajemen risiko",       "risiko TI dikenali & ditangani?"),
    ("Pengukuran kinerja",     "hasilnya diukur & dilaporkan?"),
]
for a, b in AREA:
    print("  " + a.ljust(26) + b)
print("")
print("  Perhatikan area kedua. Ia yang paling sering kosong:")
print("  organisasi bisa menunjukkan proyek selesai, tapi tidak")
print("  bisa menunjukkan manfaat yang dijanjikannya tercapai.")

# --------------------------------------------
# 3. Tingkat kematangan
# --------------------------------------------
print("")
print("--- skala kematangan 0-5 ---")
TINGKAT = [
    (0, "Tidak ada",     "prosesnya tidak dikenali sama sekali"),
    (1, "Ad hoc",        "ada, tapi tergantung orangnya"),
    (2, "Berulang",      "polanya sama, belum tertulis"),
    (3, "Baku",          "tertulis, dilatihkan, dipatuhi"),
    (4, "Terukur",       "diukur dengan angka, dipantau"),
    (5, "Dioptimalkan",  "diperbaiki terus dari hasil ukurannya"),
]
for n, nama, arti in TINGKAT:
    print("  " + str(n) + "  " + nama.ljust(15) + arti)
print("")
print("  Batas yang paling menentukan antara 2 dan 3: dari")
print("  'kebiasaan yang sama' menjadi 'aturan tertulis'.")
print("  Di bawah 3, proses hilang begitu orangnya pindah.")

# --------------------------------------------
# 4. Menilai kematangan dan menghitung kesenjangan
# --------------------------------------------
print("")
print("--- penilaian: kondisi sekarang vs yang diharapkan ---")
# (proses, sekarang, harapan, bobot kepentingan)
PROSES = [
    ("Manajemen perubahan program",   1.8, 4.0, 5),
    ("Manajemen hak akses",           2.4, 4.0, 5),
    ("Pencadangan & pemulihan",       2.0, 4.0, 4),
    ("Manajemen insiden",             1.2, 3.0, 3),
    ("Manajemen kapasitas",           1.0, 3.0, 2),
    ("Manajemen vendor",              2.6, 3.0, 3),
    ("Pengukuran kinerja TI",         0.8, 3.0, 4),
]
print("  " + "proses".ljust(30) + "kini".rjust(6) + "target".rjust(8)
      + "gap".rjust(6) + "bobot".rjust(7) + "  prioritas")
baris = []
for nama, kini, target, bobot in PROSES:
    gap = target - kini
    skor = gap * bobot
    baris.append((skor, nama, kini, target, gap, bobot))
for skor, nama, kini, target, gap, bobot in sorted(baris, reverse=True):
    print("  " + nama.ljust(30) + ("%.1f" % kini).rjust(6)
          + ("%.1f" % target).rjust(8) + ("%.1f" % gap).rjust(6)
          + str(bobot).rjust(7) + ("%9.1f" % skor))
rata_kini = sum(p[1] for p in PROSES) / len(PROSES)
rata_target = sum(p[2] for p in PROSES) / len(PROSES)
print("")
print("  rata-rata kematangan sekarang : " + ("%.2f" % rata_kini))
print("  rata-rata yang diharapkan     : " + ("%.2f" % rata_target))
print("")
# bandingkan dua proses yang GAP-nya sama tapi peringkatnya jauh
sama_gap = {}
for nama, kini, target, bobot in PROSES:
    sama_gap.setdefault(round(target - kini, 1), []).append((nama, bobot))
# pilih pasangan bergap sama yang SELISIH BOBOTNYA paling besar,
# supaya perbandingannya benar-benar menunjukkan poinnya
calon = [(g, v) for g, v in sama_gap.items() if len(v) > 1]
gap_sama, dua = max(calon,
    key=lambda x: max(b for _, b in x[1]) / min(b for _, b in x[1]))
tinggi = max(dua, key=lambda x: x[1])
rendah = min(dua, key=lambda x: x[1])
print("  Perhatikan dua proses yang gap-nya SAMA PERSIS ("
      + ("%.1f" % gap_sama) + "):")
print("    " + tinggi[0] + "  bobot " + str(tinggi[1])
      + "  -> prioritas " + ("%.1f" % (gap_sama * tinggi[1])))
print("    " + rendah[0] + "  bobot " + str(rendah[1])
      + "  -> prioritas " + ("%.1f" % (gap_sama * rendah[1])))
print("")
print("  Keduanya sama-sama tertinggal " + ("%.1f" % gap_sama)
      + " tingkat, tetapi yang satu")
print("  " + ("%.1f" % (tinggi[1] / rendah[1])).rstrip('0').rstrip('.')
      + " kali lebih penting. Mengurutkan hanya dari gap akan")
print("  menaruh keduanya sederajat -- dan perhatian terserap ke")
print("  proses yang tertinggal jauh tapi tidak kritis.")

# --------------------------------------------
# 5. Kenapa target 5 hampir selalu salah
# --------------------------------------------
print("")
print("--- kenapa tidak semua proses ditargetkan 5 ---")
BIAYA = [(1, 1), (2, 3), (3, 8), (4, 20), (5, 50)]
print("  " + "tingkat".rjust(8) + "biaya relatif".rjust(15)
      + "  tambahan dari tingkat sebelumnya")
sebelum = None
for t, b in BIAYA:
    tambah = "-" if sebelum is None else ("+" + str(b - sebelum))
    print("  " + str(t).rjust(8) + str(b).rjust(15) + "  " + tambah)
    sebelum = b
print("")
print("  Biayanya naik jauh lebih cepat daripada tingkatnya.")
print("  Naik dari 4 ke 5 memakan biaya lebih besar daripada")
print("  seluruh perjalanan dari 1 ke 4.")
print("")
print("  Karena itu targetnya ditetapkan per proses, sesuai")
print("  seberapa kritis ia -- bukan diseragamkan. Proses yang")
print("  jarang dipakai dan risikonya kecil cukup di tingkat 2.")

# --------------------------------------------
# 6. IT Balanced Scorecard
# --------------------------------------------
print("")
print("--- IT Balanced Scorecard: empat sudut pandang ---")
BSC = [
    ("Kontribusi organisasi", "manfaat bisnis dari TI",
     "penghematan, pendapatan baru"),
    ("Orientasi pengguna",    "kepuasan pemakai",
     "waktu tanggap keluhan, kepuasan"),
    ("Keunggulan operasional","efisiensi penyelenggaraan",
     "ketersediaan sistem, insiden"),
    ("Orientasi masa depan",  "kesiapan ke depan",
     "pelatihan, pembaruan teknologi"),
]
for nama, apa, ukur in BSC:
    print("  " + nama.ljust(26) + apa)
    print("      contoh ukuran: " + ukur)
print("")
print("  Gunanya menghindari penilaian yang cuma satu sisi.")
print("  Departemen TI bisa sangat efisien secara operasional")
print("  dan sama sekali tidak menyumbang apa pun ke tujuan")
print("  organisasi -- dan tanpa keempat sudut ini, hal itu")
print("  tidak akan pernah terlihat di laporan.")

# --------------------------------------------
# 7. Temuan audit: bentuk yang bisa ditindaklanjuti
# --------------------------------------------
print("")
print("--- anatomi temuan audit yang baik ---")
BAGIAN = [
    ("Kriteria",  "apa yang SEHARUSNYA",
     "setiap perubahan program disetujui tertulis"),
    ("Kondisi",   "apa yang DITEMUKAN",
     "12 dari 40 perubahan tanpa persetujuan"),
    ("Sebab",     "KENAPA terjadi",
     "tidak ada alur persetujuan di alat penyebaran"),
    ("Akibat",    "APA risikonya",
     "kode bisa masuk produksi tanpa diperiksa"),
    ("Saran",     "APA yang diusulkan",
     "wajibkan persetujuan di alat, bukan di prosedur"),
]
for nama, arti, contoh in BAGIAN:
    print("  " + nama.ljust(11) + arti)
    print("      " + contoh)
print("")
print("  Yang paling sering dilewatkan bagian SEBAB. Tanpa itu,")
print("  sarannya jadi 'harap lebih tertib' -- dan temuan yang")
print("  sama akan muncul lagi tahun depan.")
print("")
print("  Perhatikan juga saran di contoh: memindahkan kendali")
print("  dari PROSEDUR ke ALAT. Prosedur bergantung pada orang")
print("  mengingatnya; alat menegakkannya sendiri.")` },
  output: `--- tata kelola vs manajemen TI ---
  Pertanyaan
      tata kelola : apakah kita melakukan hal yang BENAR
      manajemen   : apakah kita melakukannya dengan BENAR
  Siapa
      tata kelola : dewan / pimpinan puncak
      manajemen   : manajer TI
  Keluaran
      tata kelola : arah, kewenangan, batas
      manajemen   : rencana, jadwal, laporan
  Ukuran
      tata kelola : nilai bagi organisasi
      manajemen   : biaya, waktu, mutu

  Yang diaudit di sini tata kelolanya: apakah keputusan
  TI diambil oleh yang berwenang, dengan pertimbangan yang
  tercatat, dan diawasi hasilnya. Bukan apakah proyeknya
  selesai tepat waktu -- itu urusan manajemen.

--- lima area ---
  Penyelarasan strategis    TI mendukung tujuan organisasi?
  Penyampaian nilai         investasi TI menghasilkan manfaat?
  Manajemen sumber daya     orang, data, infrastruktur cukup?
  Manajemen risiko          risiko TI dikenali & ditangani?
  Pengukuran kinerja        hasilnya diukur & dilaporkan?

  Perhatikan area kedua. Ia yang paling sering kosong:
  organisasi bisa menunjukkan proyek selesai, tapi tidak
  bisa menunjukkan manfaat yang dijanjikannya tercapai.

--- skala kematangan 0-5 ---
  0  Tidak ada      prosesnya tidak dikenali sama sekali
  1  Ad hoc         ada, tapi tergantung orangnya
  2  Berulang       polanya sama, belum tertulis
  3  Baku           tertulis, dilatihkan, dipatuhi
  4  Terukur        diukur dengan angka, dipantau
  5  Dioptimalkan   diperbaiki terus dari hasil ukurannya

  Batas yang paling menentukan antara 2 dan 3: dari
  'kebiasaan yang sama' menjadi 'aturan tertulis'.
  Di bawah 3, proses hilang begitu orangnya pindah.

--- penilaian: kondisi sekarang vs yang diharapkan ---
  proses                          kini  target   gap  bobot  prioritas
  Manajemen perubahan program      1.8     4.0   2.2      5     11.0
  Pengukuran kinerja TI            0.8     3.0   2.2      4      8.8
  Pencadangan & pemulihan          2.0     4.0   2.0      4      8.0
  Manajemen hak akses              2.4     4.0   1.6      5      8.0
  Manajemen insiden                1.2     3.0   1.8      3      5.4
  Manajemen kapasitas              1.0     3.0   2.0      2      4.0
  Manajemen vendor                 2.6     3.0   0.4      3      1.2

  rata-rata kematangan sekarang : 1.69
  rata-rata yang diharapkan     : 3.43

  Perhatikan dua proses yang gap-nya SAMA PERSIS (2.0):
    Pencadangan & pemulihan  bobot 4  -> prioritas 8.0
    Manajemen kapasitas  bobot 2  -> prioritas 4.0

  Keduanya sama-sama tertinggal 2.0 tingkat, tetapi yang satu
  2 kali lebih penting. Mengurutkan hanya dari gap akan
  menaruh keduanya sederajat -- dan perhatian terserap ke
  proses yang tertinggal jauh tapi tidak kritis.

--- kenapa tidak semua proses ditargetkan 5 ---
   tingkat  biaya relatif  tambahan dari tingkat sebelumnya
         1              1  -
         2              3  +2
         3              8  +5
         4             20  +12
         5             50  +30

  Biayanya naik jauh lebih cepat daripada tingkatnya.
  Naik dari 4 ke 5 memakan biaya lebih besar daripada
  seluruh perjalanan dari 1 ke 4.

  Karena itu targetnya ditetapkan per proses, sesuai
  seberapa kritis ia -- bukan diseragamkan. Proses yang
  jarang dipakai dan risikonya kecil cukup di tingkat 2.

--- IT Balanced Scorecard: empat sudut pandang ---
  Kontribusi organisasi     manfaat bisnis dari TI
      contoh ukuran: penghematan, pendapatan baru
  Orientasi pengguna        kepuasan pemakai
      contoh ukuran: waktu tanggap keluhan, kepuasan
  Keunggulan operasional    efisiensi penyelenggaraan
      contoh ukuran: ketersediaan sistem, insiden
  Orientasi masa depan      kesiapan ke depan
      contoh ukuran: pelatihan, pembaruan teknologi

  Gunanya menghindari penilaian yang cuma satu sisi.
  Departemen TI bisa sangat efisien secara operasional
  dan sama sekali tidak menyumbang apa pun ke tujuan
  organisasi -- dan tanpa keempat sudut ini, hal itu
  tidak akan pernah terlihat di laporan.

--- anatomi temuan audit yang baik ---
  Kriteria   apa yang SEHARUSNYA
      setiap perubahan program disetujui tertulis
  Kondisi    apa yang DITEMUKAN
      12 dari 40 perubahan tanpa persetujuan
  Sebab      KENAPA terjadi
      tidak ada alur persetujuan di alat penyebaran
  Akibat     APA risikonya
      kode bisa masuk produksi tanpa diperiksa
  Saran      APA yang diusulkan
      wajibkan persetujuan di alat, bukan di prosedur

  Yang paling sering dilewatkan bagian SEBAB. Tanpa itu,
  sarannya jadi 'harap lebih tertib' -- dan temuan yang
  sama akan muncul lagi tahun depan.

  Perhatikan juga saran di contoh: memindahkan kendali
  dari PROSEDUR ke ALAT. Prosedur bergantung pada orang
  mengingatnya; alat menegakkannya sendiri.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung kesenjangan tiap proses', waktu: 'O(n)', memori: 'n = jumlah proses dinilai' },
      { operasi: 'Hitung prioritas gap x bobot', waktu: 'O(n)', memori: 'satu perkalian per proses' },
      { operasi: 'Urutkan daftar prioritas', waktu: 'O(n log n)', memori: 'n biasanya di bawah lima puluh' },
      { operasi: 'Cari pasangan bergap sama', waktu: 'O(n)', memori: 'kelompokkan dengan tabel hash' },
      { operasi: 'Kumpulkan bukti tiap proses', waktu: 'O(n x b)', memori: 'b = bukti per proses, ini bagian mahalnya' }
    ],
    intuisi: `Seluruh hitungan di sini sepele: \`n\` jarang lebih dari lima puluh proses, jadi \`O(n log n)\` berarti selesai seketika bahkan di spreadsheet.

Yang mahal baris terakhir, dan biayanya bukan komputasi melainkan **wawancara dan penelusuran dokumen**. Satu proses butuh berjam-jam untuk dinilai dengan bukti yang layak.

Itu sebabnya memilih lima proses yang tepat jauh lebih baik daripada menilai tiga puluh proses secara dangkal — dan itu juga sebabnya bagian tersulit dari penilaian kematangan bukan menghitung, melainkan **memutuskan apa yang tidak dinilai**.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengurutkan prioritas perbaikan dari besarnya kesenjangan saja.',
      kenapa: 'Kesenjangan hanya mengukur seberapa jauh tertinggal, bukan seberapa penting prosesnya. Dua proses dengan kesenjangan sama bisa berbeda jauh akibat kegagalannya, dan karena organisasi hanya sanggup mengerjakan beberapa teratas, urutan yang salah menentukan pekerjaan yang salah yang benar-benar dikerjakan.',
      benar: 'Beri bobot kepentingan pada tiap proses lalu urutkan dari hasil kali kesenjangan dengan bobot, dan tulis alasan tiap bobot.'
    },
    {
      salah: 'Menargetkan seluruh proses pada tingkat kematangan tertinggi.',
      kenapa: 'Biaya kematangan naik jauh lebih cepat daripada tingkatnya, sehingga kenaikan dari tingkat empat ke lima lebih mahal daripada seluruh perjalanan dari satu ke empat. Target yang diseragamkan menunjukkan biayanya belum dipertimbangkan, dan rencana yang mustahil dijalankan tidak akan dijalankan sama sekali.',
      benar: 'Tetapkan target per proses sesuai seberapa kritis ia, dan sertakan alasan singkat untuk tiap target.'
    },
    {
      salah: 'Menilai tingkat kematangan hanya dari jawaban kuesioner.',
      kenapa: 'Kuesioner mengukur persepsi responden tentang prosesnya, bukan keadaan prosesnya. Untuk tingkat tiga ke atas dibutuhkan bukti berupa dokumen prosedur, catatan pelatihan, dan angka yang dipantau, dan tanpa bukti itu nilainya tidak bisa dipertanggungjawabkan.',
      benar: 'Minta bukti untuk setiap nilai tiga ke atas, dan turunkan nilainya bila prosedurnya tidak bisa ditunjukkan.'
    },
    {
      salah: 'Menulis temuan tanpa bagian sebab.',
      kenapa: 'Tanpa sebab, saran yang keluar hanya mengulang kriteria yang sudah dilanggar dalam bentuk imbauan. Tidak ada yang berubah pada penyebabnya, sehingga temuan yang sama muncul lagi pada periode berikutnya.',
      benar: 'Tulis sebab yang menjelaskan kenapa kondisi itu bisa terjadi, lalu arahkan saran ke sebab tersebut, bukan ke kondisinya.'
    },
    {
      salah: 'Menyusun saran berbentuk kebijakan atau imbauan agar lebih tertib.',
      kenapa: 'Kendali yang bersandar pada prosedur bergantung pada orang mengingat, memahami, dan memilih mematuhinya, dan ketiganya gagal secara berkala terutama saat terburu-buru. Kendali yang ditanam di alat menegakkan dirinya sendiri setiap kali tanpa kecuali.',
      benar: 'Rumuskan saran sebagai perubahan pada alat atau alur kerja sehingga jalan yang salah tidak bisa ditempuh.'
    },
    {
      salah: 'Menyimpulkan tata kelola TI baik karena proyeknya selesai tepat waktu dan sesuai anggaran.',
      kenapa: 'Ketepatan waktu dan anggaran adalah ukuran manajemen, yang menjawab apakah pekerjaan dilakukan dengan benar. Tata kelola menjawab apakah pekerjaan itu yang benar untuk dikerjakan, sehingga proyek yang sempurna pelaksanaannya tetap bisa merupakan kegagalan tata kelola.',
      benar: 'Nilai apakah keputusan diambil oleh yang berwenang dengan pertimbangan tercatat, dan apakah manfaat yang dijanjikan diukur setelah proyek selesai.'
    },
    {
      salah: 'Menilai kinerja TI hanya dari ketersediaan sistem dan jumlah insiden.',
      kenapa: 'Ukuran itu semuanya berada pada satu sudut, yaitu keunggulan operasional. Departemen TI bisa sangat baik pada sudut tersebut dan sama sekali tidak menyumbang pada tujuan organisasi, dan tanpa sudut lain hal itu tidak akan pernah terlihat di laporan.',
      benar: 'Cari satu ukuran nyata pada tiap sudut IT Balanced Scorecard, terutama sudut kontribusi bagi organisasi.'
    }
  ],

  analogi: `Bayangkan **rumah sakit** yang sedang dinilai kesiapannya.

Penilai datang dan memeriksa banyak hal. Dua temuan yang keluar:

- **Ruang tunggu** kotor dan tidak nyaman. Kondisinya jauh di bawah standar — tertinggal sangat jauh.
- **Prosedur cuci tangan** dijalankan, tetapi tidak seragam. Sebagian perawat memakai cara yang benar, sebagian tidak. Tertinggal sedikit dari standar.

Kalau daftarnya diurutkan dari **seberapa jauh tertinggal**, ruang tunggu ada di atas.

Sekarang tanyakan: kalau rumah sakit ini cuma sanggup memperbaiki satu hal tahun ini, mana yang harus dikerjakan?

Ruang tunggu yang kotor membuat orang tidak nyaman. Cuci tangan yang tidak seragam **menularkan infeksi**.

Kesenjangannya kecil. Bobotnya besar. Dan hasil kalinya yang menentukan.

Sekarang soal target.

Ruang tunggu bisa dibuat sangat baik — pendingin, kursi empuk, layar informasi, petugas yang menyapa. Itu tingkat 5.

Tapi berapa harganya, dan berapa nyawa yang diselamatkannya?

Untuk ruang tunggu, **tingkat 2 sudah cukup**: bersih, kursinya cukup, ada penunjuk arah. Untuk sterilisasi alat bedah, tidak ada tingkat yang cukup selain yang tertinggi.

Rumah sakit yang menargetkan seluruh bagiannya di tingkat 5 tidak sedang bercita-cita tinggi. Ia sedang **belum memutuskan apa yang penting** — dan ketika anggarannya habis di tengah jalan, yang tersisa adalah ruang tunggu yang bagus dan ruang operasi yang belum selesai dibenahi.

Terakhir, soal temuan.

Penilai menulis: *"prosedur cuci tangan tidak dipatuhi seragam. Saran: agar seluruh petugas mematuhi prosedur cuci tangan."*

Setahun kemudian, temuan yang sama muncul lagi.

Karena tidak ada yang pernah bertanya **kenapa**. Dan kalau ditanya, jawabannya mungkin: wastafelnya cuma dua untuk satu lantai, letaknya di ujung koridor, dan sabunnya sering habis.

Petugasnya bukan tidak mau. **Alatnya yang membuat cara yang benar jadi mahal.**

Saran yang mengubah keadaan bukan "harap patuhi prosedur". Ia: **pasang dispenser di setiap pintu kamar.**

Sesudah itu, cara yang benar jadi lebih mudah daripada cara yang salah — dan kepatuhannya naik tanpa satu pun imbauan.`,

  latihan: [
    'Untuk satu organisasi nyata, tentukan tiga keputusan yang termasuk tata kelola dan tiga yang termasuk manajemen, lalu jelaskan pembedanya.',
    'Pilih tujuh proses TI untuk dinilai, dan tulis alasan pemilihan tiap prosesnya.',
    'Nilai kematangan kini tiap proses, dan untuk setiap nilai tiga ke atas sebutkan bukti yang mendukungnya.',
    'Tetapkan target per proses dengan alasan, lalu jelaskan kenapa tidak ada yang kamu targetkan di tingkat lima.',
    'Beri bobot kepentingan tiap proses, lalu susun dua daftar prioritas: berdasarkan kesenjangan saja dan berdasarkan kesenjangan dikali bobot.',
    'Tunjukkan satu pasangan proses yang kesenjangannya sama tetapi prioritasnya berbeda jauh, dan jelaskan akibat praktisnya.',
    'Jelaskan kenapa batas antara tingkat dua dan tiga paling menentukan, dengan alasan bukan definisi.',
    'Cari satu ukuran nyata untuk tiap sudut IT Balanced Scorecard pada organisasi yang kamu nilai, lalu tunjukkan sudut mana yang paling sulit diisi.',
    'Tulis tiga temuan lengkap lima bagian, lalu uji tiap bagian sebab dengan menanyakan kenapa sekali lagi.',
    'Ubah tiga saran berbentuk imbauan menjadi saran yang memindahkan kendali ke alat, dan bandingkan kemungkinan keberhasilannya.'
  ]
});


TOPICS.push({
  id: 'audit-caat',
  judul: 'Teknik Audit Berbantuan Komputer (CAAT)',
  kategori: 'audit',
  tag: ['CAAT', 'uji duplikasi', 'pemecahan transaksi', 'hukum Benford', 'analisis data', 'pemantauan berkelanjutan'],
  ringkas: 'Uji Benford menandai digit 4 kelebihan 10 poin persen — 632 transaksi mengendap tepat di bawah ambang.',

  fungsi: `**Memeriksa seluruh populasi transaksi dengan kode, bukan sampelnya dengan tangan.**

Terpakai di:

- **Audit nyata** — ini bagian audit SI yang paling banyak memakai keterampilan pemrograman, dan yang paling membedakan auditor berlatar informatika dari yang tidak
- **Analisis data transaksi** di luar konteks audit: mencari duplikat, pencilan, dan pola aneh di data apa pun
- **Tugas akhir** yang menganalisis data operasional suatu organisasi
- **Membangun pemantauan** yang berjalan sendiri tiap bulan, bukan pemeriksaan sekali jadi
- **Uji duplikasi dengan spreadsheet** — banyak silabus audit mengajarkannya lewat Excel; logikanya persis sama, cuma alatnya berbeda

Yang paling mengubah cara kerja: **begitu seluruh populasi bisa diperiksa, jenis temuannya berubah.** Sampel memberi taksiran; CAAT memberi **nomor transaksinya** — daftar baris yang bisa langsung ditelusuri.

Dan satu peringatan yang sama pentingnya: **hasil CAAT bukan kesimpulan.** Duplikat bisa saja pembayaran sah yang kebetulan sama, dan penyimpangan Benford bukan bukti kecurangan. Yang dihasilkan adalah daftar yang harus **ditanyakan**.`,
  praktik: {
    tujuan: 'Kamu punya kumpulan skrip pendek yang menjalankan uji duplikasi, uji pemecahan di bawah ambang, dan uji Benford atas satu berkas data nyata, beserta pemahaman kapan tiap uji tidak berlaku.',
    alat: ['Satu berkas data transaksi (CSV atau Excel) — boleh data nyata yang kamu punya aksesnya, boleh data terbuka', 'Python dengan modul csv atau pandas', 'Spreadsheet untuk membandingkan hasilnya'],
    langkah: [
      { judul: 'Pahami dulu datanya sebelum mengujinya',
        isi: `Buka datanya, hitung jumlah barisnya, lihat rentang nilainya, dan cari tahu artinya tiap kolom.

Uji yang dijalankan pada kolom yang salah paham artinya menghasilkan temuan palsu yang meyakinkan — dan itu lebih berbahaya daripada tidak menguji sama sekali.` },
      { judul: 'Jalankan uji duplikasi dengan kunci yang ketat',
        isi: `Susun kunci gabungan dari beberapa kolom, misalnya vendor + nilai + tanggal, lalu kelompokkan.

Lalu perhatikan **jumlah kelompoknya**. Kalau ratusan, kuncimu terlalu longgar dan kamu sedang membanjiri dirimu sendiri dengan tabrakan kebetulan. Tambah kolom sampai daftarnya masuk akal untuk ditelusuri.` },
      { judul: 'Cari penumpukan di bawah ambang persetujuan',
        isi: `Cari tahu ambang persetujuan di organisasi itu, lalu hitung jumlah transaksi pada pita 95–100% ambang dan pada pita 100–105%.

Kalau nilainya wajar, kedua pita harus seimbang. **Penumpukan tepat di bawah** ambang adalah tanda klasik transaksi yang dipecah supaya tidak perlu persetujuan tingkat atas.` },
      { judul: 'Jalankan uji Benford, tapi periksa dulu kelayakannya',
        isi: `Sebelum menjalankan, pastikan datanya memenuhi syarat: **menyebar melintasi beberapa orde besaran** dan tumbuh alami.

Nomor urut, nilai berbatas sempit, dan harga yang ditetapkan **tidak berlaku**. Menjalankan Benford di luar syaratnya menghasilkan tuduhan palsu, dan itu kerusakan yang nyata bagi orang yang dituduh.` },
      { judul: 'Baca hasil Benford lewat digit yang menyimpang, bukan lewat kesan',
        isi: `Hitung selisih antara frekuensi nyata dan harapan untuk tiap digit, lalu cari yang **kelebihannya terbesar**.

Lalu telusuri: transaksi apa yang berdigit pertama itu? Kalau jawabannya mengelompok di satu rentang nilai atau satu vendor, kamu baru saja menemukan sesuatu yang layak ditanyakan.` },
      { judul: 'Ukur seberapa besar anomali yang bisa kamu deteksi',
        isi: `Ini langkah yang jarang dilakukan dan paling mendidik: sisipkan sendiri sejumlah baris anomali ke datamu, lalu jalankan ujinya.

Coba dengan 30 baris dari 5.000, lalu dengan 600. Yang pertama **tidak akan terlihat sama sekali**. Sekarang kamu tahu batas kemampuan ujimu — dan tahu bahwa hasil bersih bukan berarti tidak ada apa-apa.` },
      { judul: 'Tambahkan uji murah lainnya',
        isi: `Nilai bulat mencurigakan, transaksi di luar jam kerja, vendor tanpa NPWP atau beralamat sama dengan karyawan, nomor urut yang lompat, nilai negatif atau nol.

Masing-masing beberapa baris kode. Yang mahal bukan menulisnya, melainkan **memahami proses bisnisnya** cukup dalam untuk tahu uji mana yang berarti di sini.` },
      { judul: 'Jadikan pemantauan, bukan pemeriksaan sekali',
        isi: `Simpan skripmu, jalankan tiap bulan pada data terbaru, dan simpan hasilnya.

Keunggulan CAAT yang sesungguhnya bukan kecepatan sekali periksa, melainkan **biaya menjalankan ulang yang hampir nol**. Yang menarik justru perubahan antar periode.` }
    ],
    cek: [
      'Uji duplikasimu menghasilkan daftar yang jumlahnya masuk akal untuk ditelusuri satu per satu',
      'Kamu sudah memeriksa syarat kelayakan sebelum menjalankan uji Benford',
      'Kamu tahu berapa banyak anomali yang harus ada sebelum ujimu bisa mendeteksinya',
      'Setiap hasil ujimu kamu perlakukan sebagai daftar pertanyaan, bukan sebagai kesimpulan'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kunci uji duplikasi dan hukum Benford',

  konsep: `Sampling ada karena keterbatasan, bukan karena ia lebih baik. Auditor memeriksa 60 dari 120.000 transaksi karena memeriksa seluruhnya dengan tangan mustahil — bukan karena 60 sudah cukup menggambarkan.

Begitu pemeriksaannya bisa dijalankan dengan kode, keterbatasan itu hilang. Dan yang berubah bukan cuma kecepatannya:

| Hal | Sampel manual | CAAT |
|---|---|---|
| Cakupan | 60 dari 120.000 | 120.000 dari 120.000 |
| **Temuan** | taksiran | **daftar baris** yang bermasalah |
| Risiko | sampel bisa meleset | tidak ada risiko sampling |
| Tindak lanjut | perlu uji tambahan | langsung bisa ditelusuri |

Baris kedua yang paling penting. Sampel memberi **perkiraan** — "sekitar 200 transaksi bermasalah". CAAT memberi **nomornya** — transaksi 4471, 8802, 11934, dan seterusnya, yang besok pagi bisa ditanyakan ke orangnya.

Perubahan itu mengubah nasib laporannya. Taksiran memancing perdebatan tentang metodologi; daftar nomor memancing penjelasan.

**Uji duplikasi**

Uji paling sederhana dan paling sering berbuah: cari baris yang **kunci gabungannya sama persis**.

Kunci gabungan itu pilihan, dan pilihannya menentukan segalanya. Kunci vendor + nilai + tanggal terdengar ketat. Pada data 5.600 baris, ia bisa menghasilkan **184 kelompok** — jauh terlalu banyak untuk ditelusuri satu per satu.

Kenapa? Karena bila banyak transaksi berkumpul di sedikit nilai yang berdekatan, tabrakan menjadi sering **tanpa ada yang salah**. Kunci yang terlalu longgar membanjiri auditor dengan kelompok yang tidak berarti, dan banjir itu punya akibat khas: yang benar-benar mencurigakan tenggelam di antaranya.

Perbaikannya menambah kolom ke kuncinya — nomor faktur, misalnya — sampai daftarnya menyusut ke ukuran yang bisa ditelusuri.

Dan sekali lagi, dengan penekanan: **duplikat bukan bukti kecurangan.** Bisa saja dua pembayaran sah yang kebetulan sama nilainya di hari yang sama. Yang dihasilkan CAAT adalah **daftar yang harus ditanyakan**.

**Uji pemecahan transaksi**

Hampir setiap organisasi punya ambang persetujuan: pengeluaran di atas jumlah tertentu butuh tanda tangan tingkat lebih tinggi.

Ambang itu menciptakan **insentif**. Pengeluaran 60 juta butuh persetujuan direksi dan menunggu dua pekan; dua pengeluaran 30 juta tidak.

Ujinya sederhana: hitung jumlah transaksi pada pita tepat di **bawah** ambang dan pita tepat di **atas**-nya.

Kalau nilai transaksinya wajar, kedua pita itu harusnya seimbang — tidak ada alasan alami bagi nilai untuk menghindari satu angka tertentu. Penumpukan tepat di bawah ambang adalah tanda klasik bahwa transaksinya **dipecah**.

Ini salah satu uji yang paling kuat karena ia tidak menuntut asumsi apa pun tentang sebaran datanya. Ia cuma membandingkan dua pita yang bersebelahan.

**Hukum Benford**

Pada data keuangan yang tumbuh alami, digit pertama tidak tersebar merata. Angka 1 muncul jauh lebih sering daripada 9:

\`P(digit pertama = d) = log10(1 + 1/d)\`

| Digit | Harapan |
|---|---|
| 1 | 30,1% |
| 2 | 17,6% |
| 3 | 12,5% |
| 4 | 9,7% |
| 5 | 7,9% |
| 6 | 6,7% |
| 7 | 5,8% |
| 8 | 5,1% |
| 9 | 4,6% |

Kenapa begitu? Karena besaran yang tumbuh menghabiskan **lebih banyak waktu** di rentang yang berdigit awal kecil. Untuk naik dari 100 ke 200 dibutuhkan pertumbuhan 100%; untuk naik dari 900 ke 1000 cuma 11%. Jadi sebuah nilai yang tumbuh akan lebih lama berdigit awal 1 daripada berdigit awal 9.

Yang penting bukan menghafal tabelnya, melainkan tahu **kapan ia tidak berlaku**:

| Tidak berlaku pada | Contoh |
|---|---|
| Nomor yang diberi urut | NIM, nomor faktur berurutan |
| Nilai berbatas sempit | tinggi badan, nilai ujian 0–100 |
| Harga yang ditetapkan | tarif tetap Rp 25.000 |
| Data terlalu sedikit | di bawah beberapa ratus baris |

Memakai Benford di luar syaratnya menghasilkan **tuduhan palsu** — dan itu bukan kesalahan teknis yang netral, karena yang dituduh adalah orang.

**Batas kemampuan deteksi**

Ini bagian yang paling jarang diajarkan dan paling menentukan cara membaca hasil.

Uji Benford menangkap pola yang **meluas**, bukan kecurangan sesekali. Kalau dari 5.000 transaksi ada 30 yang disisipkan, penyimpangannya 0,6% — tenggelam sepenuhnya di dalam derau sebaran normalnya, dan tidak akan ditandai sama sekali.

Dengan 600 baris anomali, barulah ia terlihat: digit 4 melonjak **+10,1 poin persen** di atas harapannya, dan penelusuran menemukan 632 transaksi mengendap di rentang Rp 48–50 juta, tepat di bawah ambang 50 juta.

Akibat praktisnya: **hasil uji yang bersih bukan berarti tidak ada apa-apa.** Ia berarti tidak ada pola yang cukup besar untuk terlihat oleh uji ini. Kecurangan tunggal bernilai besar justru paling mungkin lolos dari Benford — dan itu ditangkap uji lain, seperti pengujian atas transaksi bernilai terbesar.

**Uji lain yang murah**

| Uji | Yang dicari |
|---|---|
| Nilai bulat mencurigakan | kelipatan satu juta persis |
| Transaksi di luar jam kerja | akhir pekan, tengah malam |
| Vendor tanpa NPWP | atau beralamat sama dengan karyawan |
| Nomor urut yang lompat | faktur hilang di tengah |
| Nilai negatif atau nol | pembatalan yang tidak dijelaskan |

Tiap uji cuma beberapa baris kode, dan bisa dijalankan ulang tiap bulan tanpa tambahan biaya.

Itulah keunggulan CAAT yang sesungguhnya, dan ia sering luput: bukan sekali periksa lebih cepat, melainkan **pemantauan yang berjalan terus**. Audit tahunan menemukan masalah sebelas bulan setelah terjadi; skrip yang jalan tiap bulan menemukannya dalam tiga puluh hari.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "kunci = {}\nfor baris in DATA:\n    k = (baris['vendor'], baris['nilai'], baris['tgl'])\n    kunci.setdefault(k, []).append(baris['id'])\n\nganda = {k: v for k, v in kunci.items() if len(v) > 1}\n\n# 5.603 baris  ->  184 kelompok duplikat\n#   181 di antaranya vendor V077 (nilainya cuma 5 angka berbeda)\n#     3 tabrakan biasa\n#\n# Kunci terlalu longgar -> auditor kebanjiran.\n# Tambah kolom (nomor faktur) -> daftarnya menyusut.",
      penjelasan: `Lima baris untuk uji yang paling sering menemukan sesuatu, dan satu jebakan yang membuat hasilnya tidak terpakai.

Mulai dari bentuknya. \`setdefault\` mengumpulkan seluruh baris yang kunci gabungannya sama ke dalam satu daftar, sekali telusuri. Lalu kelompok yang isinya lebih dari satu adalah kandidat duplikat.

Satu lintasan atas seluruh data. Untuk 5.600 baris ia selesai seketika; untuk 5 juta baris ia masih selesai dalam hitungan detik. Tidak ada alasan teknis untuk tidak menjalankannya.

Sekarang bagian yang penting: **apa yang dijadikan kunci.**

Kunci di sini vendor + nilai + tanggal. Terdengar ketat — tiga kolom harus sama persis. Dan hasilnya **184 kelompok** dari 5.603 baris.

Auditor yang menerima daftar 184 kelompok tidak akan menelusurinya. Ia akan melihat sepuluh teratas, tidak menemukan apa-apa yang jelas, lalu menyimpulkan ujinya tidak berguna.

Jadi periksa dari mana 184 itu datang. Ternyata **181 di antaranya dari satu vendor** — V077, yang seluruh pembayarannya cuma berkisar di lima angka berbeda. Dengan cuma lima nilai yang mungkin dan rentang tanggal yang sempit, tabrakan menjadi hampir pasti terjadi berkali-kali **tanpa ada yang salah sama sekali**.

Yang tersisa cuma **3 kelompok** yang benar-benar tabrakan biasa.

Pelajarannya bukan "jangan pakai uji duplikasi". Pelajarannya: **kekuatan uji ini sepenuhnya ditentukan oleh ketatnya kunci**, dan ketatnya kunci harus disesuaikan dengan bentuk datanya — bukan ditetapkan sekali lalu dipakai di mana-mana.

Kalau nomor faktur ditambahkan ke kunci, dua pembayaran yang benar-benar sah untuk faktur berbeda tidak lagi bertabrakan, dan daftarnya menyusut drastis. Kalau tanggalnya diganti jadi bulan, kuncinya justru makin longgar dan banjirnya makin parah.

Sekarang jebakan kedua, yang bentuknya kebalikan.

Kunci yang **terlalu ketat** melewatkan duplikat sungguhan. Pembayaran ganda yang nyata sering tidak identik: tanggalnya beda sehari, nilainya beda seribu rupiah karena pembulatan, nama vendornya ditulis sedikit berbeda.

Jadi ada dua ragam ujinya, dan keduanya perlu:

- **kecocokan persis** — murah, hasilnya sedikit, bukti kuat
- **kecocokan mirip** — nilai dalam rentang toleransi, tanggal berdekatan, nama yang ejaannya berdekatan

Yang kedua jauh lebih mahal dan hasilnya lebih berisik, tetapi ia yang menangkap kasus yang benar-benar disembunyikan. Yang menyembunyikan dengan sengaja tidak akan meninggalkan dua baris yang identik.

Terakhir, dan ini berlaku untuk seluruh CAAT: kelompok yang muncul di daftar ini **bukan temuan**. Ia pertanyaan.

Ada banyak alasan sah dua pembayaran sama persis di hari yang sama ke vendor yang sama: dua faktur berbeda dengan nilai kebetulan sama, satu pembayaran yang dicatat di dua sistem, cicilan yang jumlahnya tetap. Auditor yang melompat dari daftar ini ke tuduhan sedang melakukan kesalahan yang jauh lebih besar daripada tidak menjalankan ujinya sama sekali.`
    },
    {
      bahasa: 'python',
      kode: 'import math\n\ndef benford_harapan(d):\n    return math.log10(1 + 1 / d)\n\n#  digit  harapan   nyata  selisih\n#      1    30.1%   26.6%    -3.5%\n#      2    17.6%   15.6%    -2.0%\n#      3    12.5%   11.5%    -1.0%\n#      4     9.7%   19.8%   +10.1%   <-- kelebihan terbesar\n#      5     7.9%    7.0%    -0.9%\n#\n# Telusuri digit 4: 632 transaksi di rentang Rp 48-50 juta,\n# tepat di bawah ambang persetujuan Rp 50 juta.\n#\n# 600 baris dari 5.600 -> TERLIHAT.\n#  30 baris dari 5.000 -> tidak terlihat sama sekali.',
      penjelasan: `Satu rumus dan satu peringatan yang lebih penting daripada rumusnya.

**Kenapa sebarannya begitu.**

Naluri mengatakan digit pertama harusnya merata: satu per sembilan untuk masing-masing, sekitar 11%. Kenyataannya angka 1 muncul 30% dan angka 9 cuma 4,6%.

Alasannya jadi jelas kalau dipikir dari sisi **pertumbuhan**. Bayangkan satu nilai yang tumbuh perlahan dari 100 ke 1000.

Untuk melewati rentang berdigit awal 1 — dari 100 ke 200 — ia harus tumbuh **100%**. Untuk melewati rentang berdigit awal 9 — dari 900 ke 1000 — ia cuma perlu tumbuh **11%**.

Jadi ia menghabiskan waktu jauh lebih lama sebagai bilangan berawalan 1. Dan kalau kamu memotret kumpulan besaran seperti itu pada satu waktu, lebih banyak yang sedang berawalan 1.

Itu bukan sifat angka. Itu sifat **pertumbuhan yang bersifat kelipatan** — dan karena itulah rumusnya berupa logaritma.

Konsekuensinya langsung: Benford berlaku pada besaran yang tumbuh secara kelipatan dan **menyebar melintasi beberapa orde besaran**. Di luar itu, tidak.

**Kenapa penyimpangan menandai sesuatu.**

Angka yang dibuat manusia tidak mengikuti pola ini, karena manusia memilih angka berdasarkan hal lain — batas persetujuan, angka yang terlihat wajar, kelipatan yang mudah diingat.

Pada tabel di atas, digit 4 melonjak **+10,1 poin persen**. Itu bukan derau; itu dua kali lipat dari yang seharusnya.

Dan yang membuat ini berguna: penelusurannya **menunjuk tempat**. Digit 4 pada nilai jutaan mengarah ke rentang 40-an juta, dan penelusuran menemukan **632 transaksi** mengendap di Rp 48–50 juta — tepat di bawah ambang persetujuan 50 juta.

Perhatikan bahwa Benford tidak menemukan kecurangan. Ia menemukan **kejanggalan bentuk**, dan bentuk itu mengarahkan ke uji berikutnya yang lebih tajam.

**Sekarang peringatannya, dan ini bagian terpenting.**

Uji ini punya **batas kepekaan**, dan batasnya jauh lebih tinggi daripada yang diperkirakan orang.

Dengan 600 baris anomali dari 5.600 — sekitar 11% populasi — lonjakannya jelas terlihat. Dengan 30 baris dari 5.000 — 0,6% — ia **tidak terlihat sama sekali**. Penyimpangannya lebih kecil daripada goyangan alami sebaran itu sendiri.

Artinya: Benford menangkap pola yang **meluas dan sistematis**. Ia dirancang untuk menemukan kebiasaan, bukan kejadian.

Dan ini punya akibat yang harus disadari betul: **kecurangan besar bernilai tunggal justru paling mungkin lolos.** Satu pembayaran fiktif satu miliar tidak menggeser sebaran digit apa pun.

Jadi hasil Benford yang bersih tidak boleh dilaporkan sebagai "tidak ditemukan indikasi kecurangan". Yang benar: "tidak ditemukan penyimpangan sebaran digit yang meluas" — dan untuk kejadian tunggal bernilai besar dipakai uji lain, misalnya pengujian atas seluruh transaksi di atas nilai tertentu.

**Dan peringatan terakhir, yang menyangkut orang.**

Penyimpangan Benford **bukan bukti kecurangan**. Banyak sebab sah bisa menghasilkannya: kebijakan harga baru, satu pelanggan besar yang mendominasi, perubahan mata uang, atau data yang memang tidak memenuhi syarat sejak awal.

Auditor yang membawa grafik Benford sebagai tuduhan sedang menyalahgunakan alat statistik terhadap orang yang tidak punya cara membantahnya. Yang benar: ia membawa grafik itu sebagai **pertanyaan**, lalu menelusuri sampai menemukan penjelasannya — dan sering kali penjelasannya memang ada dan wajar.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Teknik Audit Berbantuan Komputer (CAAT)
# ============================================
import math, random

# --------------------------------------------
# 1. Sampel vs seluruh populasi
# --------------------------------------------
print("--- kenapa auditor dulu memakai sampel ---")
print("  Memeriksa 120.000 transaksi dengan tangan mustahil,")
print("  jadi auditor memeriksa 60 dan memproyeksikannya.")
print("")
print("  Dengan komputer, seluruh populasi bisa diperiksa.")
print("  Itu mengubah sifat temuannya:")
print("")
BEDA = [
    ("Cakupan",    "60 dari 120.000", "120.000 dari 120.000"),
    ("Temuan",     "taksiran", "DAFTAR baris yang bermasalah"),
    ("Risiko",     "sampel bisa meleset", "tidak ada risiko sampling"),
    ("Tindak lanjut", "perlu uji tambahan", "langsung bisa ditelusuri"),
]
print("  " + "hal".ljust(16) + "sampel manual".ljust(22) + "CAAT")
for h, a, b in BEDA:
    print("  " + h.ljust(16) + a.ljust(22) + b)
print("")
print("  Perhatikan baris kedua: yang berubah bukan cuma")
print("  jumlahnya, melainkan JENIS temuannya. Sampel memberi")
print("  perkiraan; CAAT memberi nomor transaksinya.")

# --------------------------------------------
# 2. Data uji: pembayaran vendor
# --------------------------------------------
r = random.Random(42)
DATA = []
for i in range(1, 5001):
    # nilai wajar: menyebar melintasi beberapa orde besaran
    # rentang TEPAT empat dekade (10^4 sampai 10^8) supaya sebaran
    # dasarnya mengikuti Benford tanpa bias potongan rentang
    nilai = int(math.exp(r.uniform(math.log(10_000), math.log(100_000_000))))
    DATA.append({"id": i, "vendor": "V" + str(r.randint(1, 120)).zfill(3),
                 "nilai": int(nilai), "tgl": r.randint(1, 365)})

# sisipkan pola yang MEMANG dicari auditor
# a) pembayaran ganda
DATA.append(dict(DATA[100], id=5001))
DATA.append(dict(DATA[250], id=5002))
DATA.append(dict(DATA[900], id=5003))
# b) pemecahan tepat di bawah ambang persetujuan 50 juta
# jumlahnya dibuat cukup besar (600 dari ~5600) supaya benar-benar
# terlihat di uji Benford -- anomali 0,7% tidak akan terdeteksi
for i in range(5004, 5604):
    DATA.append({"id": i, "vendor": "V077",
                 "nilai": r.choice([49_500_000, 49_750_000, 49_900_000,
                                    48_800_000, 49_200_000]),
                 "tgl": r.randint(200, 260)})

print("")
print("--- data uji ---")
print("  " + str(len(DATA)) + " baris pembayaran vendor")
print("  ambang persetujuan direksi: Rp 50.000.000")

# --------------------------------------------
# 3. Uji duplikasi
# --------------------------------------------
print("")
print("--- uji 1: pembayaran ganda ---")
kunci = {}
for baris in DATA:
    k = (baris["vendor"], baris["nilai"], baris["tgl"])
    kunci.setdefault(k, []).append(baris["id"])
ganda = {k: v for k, v in kunci.items() if len(v) > 1}
print("  kunci uji : vendor + nilai + tanggal yang sama persis")
print("  ditemukan : " + str(len(ganda)) + " kelompok")
for k, ids in list(ganda.items())[:4]:
    print("    " + k[0] + "  Rp " + f"{k[1]:,}".replace(",", ".")
          + "  hari " + str(k[2]) + "  -> id " + str(ids))
g_v077 = sum(1 for k in ganda if k[0] == "V077")
print("")
print("  Dari " + str(len(ganda)) + " kelompok itu, " + str(g_v077)
      + " di antaranya vendor V077 --")
print("  vendor yang nilai pembayarannya cuma berkisar di beberapa")
print("  angka dekat ambang, sehingga tabrakan jadi sering. Sisanya")
print("  (" + str(len(ganda) - g_v077) + " kelompok) tabrakan biasa.")
print("")
print("  Ini pelajaran pertamanya: uji duplikasi yang kuncinya")
print("  terlalu longgar akan MEMBANJIRI auditor dengan kelompok")
print("  yang tidak berarti. Kunci di sini cuma tiga kolom; kalau")
print("  ditambah nomor faktur, daftarnya menyusut drastis.")
print("")
print("  Dan pelajaran kedua: ini BUKAN bukti kecurangan. Bisa saja")
print("  pembayaran sah yang kebetulan sama. Yang dihasilkan CAAT")
print("  adalah DAFTAR YANG HARUS DITANYAKAN, bukan kesimpulan.")

# --------------------------------------------
# 4. Uji pemecahan transaksi
# --------------------------------------------
print("")
print("--- uji 2: pemecahan di bawah ambang ---")
AMBANG = 50_000_000
pita = [(0.90, 1.00), (0.80, 0.90), (0.70, 0.80), (1.00, 1.10)]
print("  " + "pita terhadap ambang".ljust(26) + "jumlah".rjust(8))
for lo, hi in pita:
    n = sum(1 for b in DATA if AMBANG*lo <= b["nilai"] < AMBANG*hi)
    label = ("%.0f%%-%.0f%% ambang" % (lo*100, hi*100))
    print("  " + label.ljust(26) + str(n).rjust(8))
print("")
tepat_bawah = sum(1 for b in DATA if AMBANG*0.95 <= b["nilai"] < AMBANG)
tepat_atas  = sum(1 for b in DATA if AMBANG <= b["nilai"] < AMBANG*1.05)
print("  tepat di BAWAH ambang (95-100%) : " + str(tepat_bawah))
print("  tepat di ATAS ambang (100-105%) : " + str(tepat_atas))
print("")
print("  Kalau nilainya wajar, kedua pita itu harusnya seimbang.")
print("  Penumpukan tepat di bawah ambang adalah tanda klasik")
print("  bahwa transaksinya DIPECAH supaya tidak perlu")
print("  persetujuan tingkat atas.")

# --------------------------------------------
# 5. Hukum Benford
# --------------------------------------------
def benford_harapan(d):
    return math.log10(1 + 1 / d)

def digit_pertama(n):
    s = str(abs(int(n)))
    return int(s[0]) if s[0] != '0' else None

print("")
print("--- uji 3: hukum Benford pada digit pertama ---")
print("  Pada data keuangan yang tumbuh alami, angka 1 muncul")
print("  sebagai digit pertama jauh lebih sering daripada 9.")
print("")
hitung = {d: 0 for d in range(1, 10)}
for b in DATA:
    d = digit_pertama(b["nilai"])
    if d:
        hitung[d] += 1
total = sum(hitung.values())
print("  " + "digit".rjust(6) + "harapan".rjust(10) + "nyata".rjust(9)
      + "selisih".rjust(10) + "  grafik")
maks_selisih = 0
for d in range(1, 10):
    h = benford_harapan(d)
    n = hitung[d] / total
    selisih = n - h
    maks_selisih = max(maks_selisih, abs(selisih))
    print("  " + str(d).rjust(6) + ("%.1f%%" % (h*100)).rjust(10)
          + ("%.1f%%" % (n*100)).rjust(9)
          + ("%+.1f%%" % (selisih*100)).rjust(10)
          + "  " + "#" * int(n * 120))
# cari digit yang paling menyimpang, jangan diklaim
selisih_per_digit = {d: hitung[d]/total - benford_harapan(d) for d in range(1,10)}
puncak = max(selisih_per_digit, key=lambda d: selisih_per_digit[d])
# hitung tepat: hanya baris yang nilainya memang di rentang sisipan
n_sisip = sum(1 for b in DATA
              if 48_000_000 <= b["nilai"] < 50_000_000)
print("")
print("  Digit dengan kelebihan terbesar : " + str(puncak)
      + "  (" + ("%+.1f poin persen" % (selisih_per_digit[puncak]*100)) + ")")
print("")
print("  Dan di rentang Rp 48-50 juta ada " + str(n_sisip) + " transaksi,")
print("  semuanya berdigit pertama 4 -- itulah sumber lonjakannya.")
print("")
print("  Perhatikan: anomali harus cukup BESAR untuk terlihat.")
print("  Kalau cuma beberapa puluh transaksi dari lima ribu,")
print("  Benford tidak akan menandainya sama sekali. Uji ini")
print("  menangkap pola yang MELUAS, bukan kecurangan sesekali.")

# --------------------------------------------
# 6. Kenapa Benford bekerja, dan kapan TIDAK
# --------------------------------------------
print("")
print("--- kapan Benford TIDAK berlaku ---")
TIDAK = [
    ("Nomor yang diberi urut", "NIM, nomor faktur berurutan"),
    ("Nilai berbatas sempit",  "tinggi badan, nilai ujian 0-100"),
    ("Harga yang ditetapkan",  "tarif tetap Rp 25.000"),
    ("Data terlalu sedikit",   "di bawah beberapa ratus baris"),
]
for a, b in TIDAK:
    print("  " + a.ljust(26) + b)
print("")
print("  Benford berlaku untuk besaran yang MENYEBAR melintasi")
print("  beberapa orde besaran dan tumbuh secara alami. Memakainya")
print("  di luar itu menghasilkan tuduhan palsu.")
print("")
print("  Dan sebaliknya: penyimpangan Benford BUKAN bukti curang.")
print("  Ia cuma menandai bahwa datanya perlu ditanyakan.")

# --------------------------------------------
# 7. Uji lain yang murah dan sering menemukan
# --------------------------------------------
print("")
print("--- uji lain yang layak dijalankan ---")
UJI = [
    ("Nilai bulat mencurigakan", "kelipatan 1 juta persis"),
    ("Transaksi di luar jam kerja", "akhir pekan, tengah malam"),
    ("Vendor tanpa NPWP",        "atau alamat sama dengan karyawan"),
    ("Nomor urut yang lompat",   "faktur hilang di tengah"),
    ("Nilai negatif / nol",      "pembatalan yang tidak dijelaskan"),
]
bulat = sum(1 for b in DATA if b["nilai"] % 1_000_000 == 0)
# tgl di sini nomor hari dalam setahun, jadi ini cuma ILUSTRASI
# pengelompokan -- bukan akhir pekan sungguhan
pola_hari = sum(1 for b in DATA if b["tgl"] % 7 in (0, 6))
for a, b in UJI:
    print("  " + a.ljust(30) + b)
print("")
print("  Pada data uji ini:")
print("    nilai kelipatan 1 juta persis : " + str(bulat))
print("    transaksi pada dua dari tujuh nomor hari : " + str(pola_hari))
print("      (ilustrasi pengelompokan; data uji ini tidak")
print("       memuat hari sungguhan)")
print("")
print("  Tiap uji cuma beberapa baris kode, dan bisa dijalankan")
print("  ulang tiap bulan tanpa tambahan biaya. Itulah keunggulan")
print("  CAAT yang sesungguhnya: bukan sekali periksa, melainkan")
print("  pemantauan yang berjalan terus.")` },
  output: `--- kenapa auditor dulu memakai sampel ---
  Memeriksa 120.000 transaksi dengan tangan mustahil,
  jadi auditor memeriksa 60 dan memproyeksikannya.

  Dengan komputer, seluruh populasi bisa diperiksa.
  Itu mengubah sifat temuannya:

  hal             sampel manual         CAAT
  Cakupan         60 dari 120.000       120.000 dari 120.000
  Temuan          taksiran              DAFTAR baris yang bermasalah
  Risiko          sampel bisa meleset   tidak ada risiko sampling
  Tindak lanjut   perlu uji tambahan    langsung bisa ditelusuri

  Perhatikan baris kedua: yang berubah bukan cuma
  jumlahnya, melainkan JENIS temuannya. Sampel memberi
  perkiraan; CAAT memberi nomor transaksinya.

--- data uji ---
  5603 baris pembayaran vendor
  ambang persetujuan direksi: Rp 50.000.000

--- uji 1: pembayaran ganda ---
  kunci uji : vendor + nilai + tanggal yang sama persis
  ditemukan : 184 kelompok
    V066  Rp 42.631  hari 42  -> id [101, 5001]
    V056  Rp 6.748.924  hari 91  -> id [251, 5002]
    V049  Rp 39.524  hari 95  -> id [901, 5003]
    V077  Rp 48.800.000  hari 213  -> id [5005, 5030, 5119, 5440, 5500]

  Dari 184 kelompok itu, 181 di antaranya vendor V077 --
  vendor yang nilai pembayarannya cuma berkisar di beberapa
  angka dekat ambang, sehingga tabrakan jadi sering. Sisanya
  (3 kelompok) tabrakan biasa.

  Ini pelajaran pertamanya: uji duplikasi yang kuncinya
  terlalu longgar akan MEMBANJIRI auditor dengan kelompok
  yang tidak berarti. Kunci di sini cuma tiga kolom; kalau
  ditambah nomor faktur, daftarnya menyusut drastis.

  Dan pelajaran kedua: ini BUKAN bukti kecurangan. Bisa saja
  pembayaran sah yang kebetulan sama. Yang dihasilkan CAAT
  adalah DAFTAR YANG HARUS DITANYAKAN, bukan kesimpulan.

--- uji 2: pemecahan di bawah ambang ---
  pita terhadap ambang        jumlah
  90%-100% ambang                673
  80%-90% ambang                  60
  70%-80% ambang                  68
  100%-110% ambang                62

  tepat di BAWAH ambang (95-100%) : 637
  tepat di ATAS ambang (100-105%) : 29

  Kalau nilainya wajar, kedua pita itu harusnya seimbang.
  Penumpukan tepat di bawah ambang adalah tanda klasik
  bahwa transaksinya DIPECAH supaya tidak perlu
  persetujuan tingkat atas.

--- uji 3: hukum Benford pada digit pertama ---
  Pada data keuangan yang tumbuh alami, angka 1 muncul
  sebagai digit pertama jauh lebih sering daripada 9.

   digit   harapan    nyata   selisih  grafik
       1     30.1%    26.6%     -3.5%  ###############################
       2     17.6%    15.6%     -2.0%  ##################
       3     12.5%    11.5%     -1.0%  #############
       4      9.7%    19.8%    +10.1%  #######################
       5      7.9%     7.0%     -0.9%  ########
       6      6.7%     6.6%     -0.1%  #######
       7      5.8%     4.9%     -0.9%  #####
       8      5.1%     4.3%     -0.8%  #####
       9      4.6%     3.7%     -0.9%  ####

  Digit dengan kelebihan terbesar : 4  (+10.1 poin persen)

  Dan di rentang Rp 48-50 juta ada 632 transaksi,
  semuanya berdigit pertama 4 -- itulah sumber lonjakannya.

  Perhatikan: anomali harus cukup BESAR untuk terlihat.
  Kalau cuma beberapa puluh transaksi dari lima ribu,
  Benford tidak akan menandainya sama sekali. Uji ini
  menangkap pola yang MELUAS, bukan kecurangan sesekali.

--- kapan Benford TIDAK berlaku ---
  Nomor yang diberi urut    NIM, nomor faktur berurutan
  Nilai berbatas sempit     tinggi badan, nilai ujian 0-100
  Harga yang ditetapkan     tarif tetap Rp 25.000
  Data terlalu sedikit      di bawah beberapa ratus baris

  Benford berlaku untuk besaran yang MENYEBAR melintasi
  beberapa orde besaran dan tumbuh secara alami. Memakainya
  di luar itu menghasilkan tuduhan palsu.

  Dan sebaliknya: penyimpangan Benford BUKAN bukti curang.
  Ia cuma menandai bahwa datanya perlu ditanyakan.

--- uji lain yang layak dijalankan ---
  Nilai bulat mencurigakan      kelipatan 1 juta persis
  Transaksi di luar jam kerja   akhir pekan, tengah malam
  Vendor tanpa NPWP             atau alamat sama dengan karyawan
  Nomor urut yang lompat        faktur hilang di tengah
  Nilai negatif / nol           pembatalan yang tidak dijelaskan

  Pada data uji ini:
    nilai kelipatan 1 juta persis : 0
    transaksi pada dua dari tujuh nomor hari : 1595
      (ilustrasi pengelompokan; data uji ini tidak
       memuat hari sungguhan)

  Tiap uji cuma beberapa baris kode, dan bisa dijalankan
  ulang tiap bulan tanpa tambahan biaya. Itulah keunggulan
  CAAT yang sesungguhnya: bukan sekali periksa, melainkan
  pemantauan yang berjalan terus.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Uji duplikasi dengan kunci gabungan', waktu: 'O(N)', memori: 'O(N) untuk tabel hash kunci' },
      { operasi: 'Uji pita di bawah ambang', waktu: 'O(N)', memori: 'O(1), cukup pencacah' },
      { operasi: 'Uji Benford digit pertama', waktu: 'O(N)', memori: 'O(1), sembilan pencacah' },
      { operasi: 'Kecocokan mirip (fuzzy) antar baris', waktu: 'O(N^2)', memori: 'mahal, perlu pemblokiran dulu' },
      { operasi: 'Menjalankan ulang tiap bulan', waktu: 'O(N) per jalan', memori: 'biaya tambahan hampir nol' }
    ],
    intuisi: `Hampir seluruh uji CAAT \`O(N)\` — sekali telusuri data. Itu sebabnya memeriksa seluruh populasi menjadi masuk akal: untuk 120.000 baris, selisih antara memeriksa 60 dan memeriksa semuanya adalah selisih **milidetik**, bukan selisih berminggu.

Pengecualiannya kecocokan mirip. Membandingkan setiap baris dengan setiap baris lain \`O(N^2)\` — untuk 120.000 baris itu 14 miliar perbandingan, dan mulai terasa. Penyelesaiannya **pemblokiran**: bandingkan hanya dalam kelompok yang sudah sama vendornya atau sama bulannya, sehingga perbandingannya turun drastis.

Baris terakhir yang paling menentukan nilainya dalam praktik. Karena biaya menjalankan ulang hampir nol, uji yang sama bisa dijalankan bulanan tanpa tambahan biaya — dan itu mengubah audit dari pemeriksaan tahunan menjadi **pemantauan berkelanjutan**.`
  },

  kesalahanUmum: [
    {
      salah: 'Memperlakukan hasil uji CAAT sebagai temuan kecurangan.',
      kenapa: 'Uji hanya menandai keanehan bentuk, dan banyak sebab sah bisa menghasilkan bentuk yang sama. Duplikat bisa berupa dua faktur berbeda yang nilainya kebetulan sama, dan penyimpangan sebaran digit bisa berasal dari satu pelanggan besar yang mendominasi.',
      benar: 'Perlakukan hasilnya sebagai daftar yang harus ditanyakan, telusuri tiap baris ke dokumen sumbernya, dan baru simpulkan setelah penjelasannya diperoleh.'
    },
    {
      salah: 'Menjalankan uji Benford pada data yang tidak memenuhi syaratnya.',
      kenapa: 'Hukum Benford hanya berlaku pada besaran yang menyebar melintasi beberapa orde besaran dan tumbuh secara kelipatan. Pada nomor urut, nilai berbatas sempit, atau harga yang ditetapkan, sebaran digitnya memang tidak mengikuti pola itu, sehingga penyimpangan yang terlihat adalah hal yang normal.',
      benar: 'Periksa rentang dan sifat datanya lebih dulu, dan lewati uji Benford bila datanya berupa nomor urut, nilai berbatas, atau harga tetap.'
    },
    {
      salah: 'Melaporkan hasil Benford yang bersih sebagai tidak ada indikasi kecurangan.',
      kenapa: 'Uji ini hanya peka terhadap pola yang meluas, dan anomali di bawah beberapa persen populasi tenggelam dalam goyangan sebaran normalnya. Kecurangan tunggal bernilai besar justru paling mungkin lolos karena tidak menggeser sebaran digit sama sekali.',
      benar: 'Laporkan bahwa tidak ditemukan penyimpangan sebaran digit yang meluas, dan tambahkan uji terpisah untuk transaksi bernilai terbesar.'
    },
    {
      salah: 'Memakai kunci uji duplikasi yang longgar lalu menyerahkan seluruh hasilnya.',
      kenapa: 'Kunci yang longgar menghasilkan ratusan kelompok tabrakan kebetulan, terutama bila banyak transaksi berkumpul di sedikit nilai yang berdekatan. Daftar sebanyak itu tidak akan ditelusuri, dan kelompok yang benar-benar mencurigakan tenggelam di antaranya.',
      benar: 'Tambah kolom pada kunci sampai jumlah kelompoknya masuk akal untuk ditelusuri, dan sebutkan kunci yang dipakai di kertas kerja.'
    },
    {
      salah: 'Hanya memakai kecocokan persis untuk mencari pembayaran ganda.',
      kenapa: 'Pembayaran ganda yang nyata sering tidak identik karena tanggalnya berbeda sehari, nilainya berbeda akibat pembulatan, atau nama vendornya ditulis sedikit berbeda. Pihak yang menyembunyikan dengan sengaja tidak akan meninggalkan dua baris yang sama persis.',
      benar: 'Tambahkan uji kecocokan mirip dengan toleransi nilai dan tanggal, dan batasi biayanya dengan pemblokiran per vendor atau per bulan.'
    },
    {
      salah: 'Menjalankan uji CAAT sekali setahun saat audit berlangsung.',
      kenapa: 'Biaya menjalankan ulang skrip hampir nol, sehingga pemeriksaan tahunan membuang hampir seluruh keunggulan pendekatan ini. Masalah yang terjadi di bulan pertama baru ditemukan sebelas bulan kemudian, ketika penelusurannya jauh lebih sulit.',
      benar: 'Jadwalkan skripnya berjalan bulanan, simpan hasil tiap periode, dan perhatikan perubahan antar periode.'
    },
    {
      salah: 'Menjalankan uji tanpa memahami arti kolom datanya lebih dulu.',
      kenapa: 'Uji yang dijalankan pada kolom yang disalahpahami menghasilkan temuan yang tampak meyakinkan tetapi tidak berarti apa-apa. Kesalahan jenis ini lebih berbahaya daripada tidak menguji, karena hasilnya berupa angka dan angka cenderung dipercaya.',
      benar: 'Telusuri arti tiap kolom, rentang nilainya, dan cara pengisiannya sebelum uji apa pun dijalankan.'
    }
  ],

  analogi: `Bayangkan kamu **pemilik toko** dengan sepuluh ribu nota sepanjang tahun.

Cara lama: ambil segenggam nota secara acak, periksa lima puluh, dan simpulkan sisanya kira-kira serupa. Kalau ada satu yang aneh, kamu tahu "sekitar dua persen nota bermasalah" — tapi kamu tidak tahu nota yang mana.

Sekarang seluruh nota ada di spreadsheet.

**Uji pertama: cari yang kembar.** Urutkan berdasarkan pemasok, nilai, dan tanggal, lalu lihat baris yang identik.

Kamu menemukan ratusan. Sebagian besar dari satu pemasok yang harganya memang cuma lima macam — kembar terus setiap minggu, dan tidak ada yang salah dengannya.

Pelajaran pertama: **saringan yang terlalu lebar menangkap terlalu banyak ikan, dan yang kamu cari tenggelam di antaranya.** Tambahkan nomor nota ke urutannya, dan daftarnya menyusut jadi belasan.

**Uji kedua: batas persetujuan.** Kamu punya aturan sendiri — pembelian di atas lima juta harus kamu setujui langsung.

Hitung berapa nota bernilai 4,7 sampai 5 juta, lalu berapa yang bernilai 5 sampai 5,3 juta.

Kalau semuanya wajar, jumlahnya kira-kira seimbang. Tidak ada alasan alami bagi harga barang untuk menghindari angka lima juta.

Kalau yang di bawah **jauh lebih banyak**, ada yang sedang memecah pembelian supaya tidak perlu bertanya kepadamu.

**Uji ketiga: bentuk angkanya.** Ini yang paling tidak intuitif.

Lihat angka pertama dari setiap nilai nota. Kamu mengira sebarannya merata — sama banyaknya yang mulai 1, 2, sampai 9.

Ternyata tidak. Yang mulai angka 1 jauh lebih banyak, dan makin besar digitnya makin sedikit. Itu **sifat alami** dari harga yang bermacam-macam.

Sekarang misalkan ada yang mengarang nota. Ia memilih angka yang "kelihatan wajar" — dan pilihannya menumpuk di sekitar batas persetujuan.

Kamu tidak akan melihatnya di nota mana pun satu per satu. Tapi kamu melihatnya di **bentuk keseluruhannya**: satu digit tiba-tiba jauh lebih sering daripada seharusnya.

Dan sekarang batasnya, yang harus kamu ingat.

Kalau yang dikarang cuma **tiga nota dari sepuluh ribu**, bentuk keseluruhannya tidak berubah sedikit pun. Uji ini tidak akan menemukannya — selamanya.

Uji bentuk menangkap **kebiasaan**, bukan **kejadian**. Untuk kejadian tunggal yang besar, cara lain: periksa saja sepuluh nota bernilai terbesar, satu per satu, dengan mata sendiri.

Dua alat yang berbeda untuk dua jenis masalah yang berbeda — dan memakai yang satu untuk pekerjaan yang lain adalah cara paling umum untuk merasa aman padahal tidak.`,

  latihan: [
    'Ambil satu berkas data transaksi nyata, lalu jelaskan arti tiap kolomnya dan rentang nilainya sebelum menjalankan uji apa pun.',
    'Jalankan uji duplikasi dengan kunci tiga kolom, lalu hitung jumlah kelompoknya dan tentukan apakah kuncinya terlalu longgar.',
    'Perketat kuncimu dengan satu kolom tambahan, lalu bandingkan jumlah kelompok sebelum dan sesudahnya.',
    'Tulis uji kecocokan mirip dengan toleransi nilai dan tanggal, lalu jelaskan kenapa biayanya jauh lebih besar.',
    'Cari ambang persetujuan pada satu organisasi nyata, lalu hitung jumlah transaksi pada pita tepat di bawah dan tepat di atasnya.',
    'Hitung sebaran digit pertama pada datamu, bandingkan dengan harapan Benford, dan cari digit yang kelebihannya terbesar.',
    'Telusuri digit yang menyimpang itu ke transaksinya, lalu tentukan apakah ia mengelompok di satu rentang nilai atau satu pihak.',
    'Sisipkan sendiri tiga puluh baris anomali ke datamu, jalankan uji Benford, lalu ulangi dengan enam ratus baris dan bandingkan hasilnya.',
    'Jelaskan kenapa hukum Benford tidak berlaku pada nomor urut, dengan alasan yang berangkat dari sifat pertumbuhan.',
    'Tulis tiga uji murah lain untuk datamu, lalu jelaskan pengetahuan proses bisnis apa yang dibutuhkan agar tiap uji bermakna.'
  ]
});


TOPICS.push({
  id: 'audit-kontinuitas',
  judul: 'Audit Kelangsungan Usaha & Pengendalian Akses',
  kategori: 'audit',
  tag: ['RTO', 'RPO', 'pencadangan', 'DRP', 'akses logik', 'akses fisik', 'akun yatim'],
  ringkas: 'Situs siaga panas memangkas nyaris seluruh kerugian berhenti — dan tetap kalah dari cadangan awan biasa.',

  fungsi: `**Menentukan seberapa cepat sistem harus pulih dan seberapa banyak data boleh hilang, dengan angka yang bisa dipertanggungjawabkan.**

Terpakai di:

- **Merancang strategi pencadangan** untuk sistem apa pun yang kamu bangun — termasuk proyek sendiri
- **Menjawab pertanyaan "berapa sering harus dicadangkan"** dengan hitungan, bukan dengan kebiasaan
- **Audit nyata** — pengendalian akses logik dan fisik adalah dua bagian yang hampir selalu diperiksa dan hampir selalu berbuah
- **Pengelolaan hak akses** di organisasi mana pun, termasuk organisasi mahasiswa
- **Tugas akhir** yang membahas manajemen risiko atau kesiapan sistem

Yang paling mengubah cara berpikir: **RTO yang paling cepat bukan yang terbaik.** Situs siaga panas memangkas kerugian berhenti hampir habis, tetapi biayanya sendiri melampaui penghematannya. RTO yang benar adalah titik di mana **total biayanya terkecil** — dan itu satu-satunya cara menetapkannya tanpa mengarang.

Dan temuan audit yang paling sering muncul di seluruh dunia: **cadangan yang berjalan setiap malam tetapi belum pernah sekali pun dipulihkan.** Laporannya hijau, pekerjaannya berhasil, dan tidak ada satu pun tanda bahwa berkasnya tidak bisa dipakai.`,
  praktik: {
    tujuan: 'Kamu punya angka RTO dan RPO yang berasal dari hitungan untuk satu sistem nyata, satu uji pemulihan yang benar-benar dijalankan, dan satu pencocokan daftar akun terhadap daftar orang yang berhak.',
    alat: ['Satu sistem yang kamu kelola atau bisa kamu akses (proyek sendiri, sistem organisasi)', 'Daftar pengguna sistem itu', 'Daftar anggota atau pegawai aktif dari sumber lain', 'Spreadsheet untuk hitungan biaya'],
    langkah: [
      { judul: 'Pisahkan RTO dari RPO sebelum menghitung apa pun',
        isi: `**RTO** menjawab berapa lama sistem boleh mati. **RPO** menjawab berapa banyak data boleh hilang.

Keduanya berdiri sendiri, dan mencampurnya menghasilkan keputusan yang salah. Sistem bisa pulih dalam lima menit (RTO bagus) tetapi kehilangan data sehari penuh (RPO buruk) — kalau cadangannya cuma dibuat tiap malam.` },
      { judul: 'Ubah frekuensi cadangan menjadi jumlah data yang hilang',
        isi: `Taksir laju transaksi per jam pada sistemmu, lalu untuk tiap pilihan frekuensi cadangan hitung \`laju x jarak antar cadangan\`.

Yang dipakai **jarak penuh antar cadangan**, bukan rata-rata — karena RPO terburuk terjadi kalau kegagalan datang tepat sebelum cadangan berikutnya, dan itulah yang harus direncanakan.` },
      { judul: 'Taksir kerugian per jam berhenti',
        isi: `Angka ini yang membuat seluruh hitungan berikutnya mungkin. Untuk usaha: pendapatan per jam yang hilang. Untuk layanan publik: biaya penanganan manual dan keluhan.

Taksiran kasar sudah cukup berguna. Yang tidak berguna adalah tidak punya angkanya sama sekali — karena tanpa itu, setiap perdebatan tentang RTO berakhir pada siapa yang paling keras berbicara.` },
      { judul: 'Bandingkan total biaya beberapa strategi pemulihan',
        isi: `Untuk tiap strategi, hitung \`total = biaya strategi + (kerugian per jam x RTO)\`.

Urutkan dari total terkecil. Yang muncul di puncak hampir selalu **bukan** yang tercepat, dan itu hasil yang paling berguna dari seluruh langkah ini.` },
      { judul: 'Lakukan satu pemulihan sungguhan',
        isi: `Ambil cadangan terakhirmu, pulihkan ke tempat terpisah, dan **buka datanya**. Catat berapa lama waktunya.

Ini langkah yang paling sering dilewati dan paling menentukan. Sebelum kamu melakukannya sekali, kamu tidak punya cadangan — kamu punya berkas yang kamu **harap** merupakan cadangan.

Waktu yang kamu catat itu RTO nyatamu, dan biasanya jauh lebih besar dari yang diperkirakan.` },
      { judul: 'Periksa di mana cadangan dan kuncinya disimpan',
        isi: `Kalau cadangannya berada di rak yang sama dengan peladennya, satu kebakaran menghabiskan keduanya. Kalau cadangannya terenkripsi dan kuncinya cuma ada di peladen yang rusak, datanya ada dan tidak bisa dibuka.

Periksa keduanya secara terpisah. Yang kedua sering luput karena enkripsi terasa seperti tindakan yang selalu benar.` },
      { judul: 'Cocokkan daftar akun dengan daftar orang yang berhak',
        isi: `Ambil dua daftar: pengguna sistem, dan anggota atau pegawai aktif dari sumber lain.

Cari tiga hal: akun milik orang yang **sudah keluar**, akun yang **tidak ada pemiliknya** di daftar mana pun, dan akun aktif yang **lama tidak dipakai**.

Ini salah satu uji audit yang paling murah dan paling sering berbuah. Hampir tidak ada organisasi yang lolos bersih.` },
      { judul: 'Periksa akses fisiknya juga',
        isi: `Minta daftar pemegang kunci atau kartu akses ruang peladen, lalu cocokkan dengan siapa yang benar-benar membutuhkannya.

Daftar itu hampir selalu lebih panjang dari seharusnya, karena akses diberikan saat dibutuhkan dan tidak pernah dicabut saat tidak lagi dibutuhkan.` }
    ],
    cek: [
      'Angka RTO dan RPO-mu berasal dari hitungan biaya, bukan dari perasaan atau kebiasaan',
      'Kamu sudah pernah memulihkan cadanganmu sekali dan mencatat waktunya',
      'Cadanganmu berada di tempat yang berbeda dari sistemnya, dan kuncinya disimpan terpisah',
      'Kamu sudah mencocokkan daftar akun dengan daftar orang yang berhak, dan menindaklanjuti yang tidak cocok'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa pemulihan tercepat bukan yang terbaik',

  konsep: `Bagian audit ini menjawab satu pertanyaan yang setiap organisasi punya jawabannya dan hampir tidak ada yang punya alasannya: **seberapa siap kita kalau sistemnya mati?**

**RTO dan RPO: dua angka yang sering tertukar**

| Istilah | Menjawab | Ditentukan oleh |
|---|---|---|
| **RTO** — Recovery Time Objective | berapa lama sistem boleh **mati** | kecepatan pemulihan |
| **RPO** — Recovery Point Objective | berapa banyak data boleh **hilang** | seberapa sering dicadangkan |

Keduanya berdiri sendiri, dan itu bagian yang paling sering keliru.

Sebuah sistem bisa punya RTO sangat baik dan RPO sangat buruk sekaligus: peladen cadangan siap menyala dalam lima menit, tetapi datanya berasal dari cadangan tadi malam. Sistemnya hidup kembali dengan cepat — **kehilangan seluruh transaksi hari ini**.

Kebalikannya juga mungkin: replikasi berjalan tiap detik (RPO nyaris nol), tetapi tidak ada satu pun prosedur menyalakannya, sehingga butuh tiga hari untuk pulih.

**Frekuensi cadangan menentukan RPO**

| Frekuensi | RPO terburuk | Transaksi hilang (laju 500/jam) |
|---|---|---|
| tiap 5 menit | 5 menit | 41 |
| tiap jam | 1 jam | 500 |
| tiap 6 jam | 6 jam | 3.000 |
| tiap malam | 1 hari | 12.000 |
| tiap pekan | 7 hari | 84.000 |

Perhatikan kata **terburuk**. Yang dipakai bukan rata-rata setengah jarak, melainkan **jarak penuh antar cadangan** — karena kegagalan tidak memilih waktu, dan yang harus direncanakan adalah kemungkinan ia datang tepat sebelum cadangan berikutnya.

Dan perhatikan lompatan dari "tiap malam" ke "tiap pekan": tujuh kali jaraknya, tujuh kali datanya. Hubungannya lurus, jadi tidak ada titik ajaib — cuma pilihan biaya.

**Menentukan RTO yang layak**

Di sini letak gagasan paling berguna dari seluruh topik ini.

Setiap strategi pemulihan punya dua biaya: **biaya strategi itu sendiri**, dan **kerugian karena berhenti** selama pemulihannya. Yang kedua sebanding dengan RTO.

\`total = biaya strategi + (kerugian per jam x RTO)\`

Dengan kerugian berhenti Rp 25 juta per jam:

| Strategi | RTO | Biaya | Rugi berhenti | **Total** |
|---|---|---|---|---|
| Pulihkan dari pita cadangan | 48 jam | 5 jt | 1.200 jt | 1.205 jt |
| **Cadangan di awan, pulih manual** | **8 jam** | **60 jt** | **200 jt** | **260 jt** |
| Situs siaga dingin | 24 jam | 40 jt | 600 jt | 640 jt |
| Situs siaga hangat | 4 jam | 180 jt | 100 jt | 280 jt |
| Situs siaga panas | 0,5 jam | 600 jt | 12 jt | 612 jt |

Yang menang bukan yang tercepat.

Situs siaga panas memangkas kerugian berhenti dari 1.200 juta menjadi **12 juta** — nyaris habis. Dan tetap kalah, karena biayanya sendiri 600 juta.

Ini satu-satunya cara menetapkan RTO yang bisa dipertanggungjawabkan: bukan "secepat mungkin", melainkan **titik di mana total biayanya terkecil**.

Perhatikan juga bentuk kurvanya. Dari 48 jam ke 8 jam, totalnya turun tajam. Dari 8 jam ke 4 jam, totalnya justru **naik** sedikit. Ada titik balik, dan menemukannya adalah seluruh isi pekerjaan ini.

**Temuan yang paling sering ditemukan auditor**

| Temuan | Akibatnya |
|---|---|
| **Cadangan berjalan, tak pernah dipulihkan** | tidak ada yang tahu apakah bisa dipakai |
| Cadangan di rak yang sama dengan peladen | satu kebakaran menghabiskan keduanya |
| Kunci enkripsi cadangan ikut hilang | datanya ada, tidak bisa dibuka |
| Prosedur pemulihan cuma di kepala satu orang | orang itu cuti saat kejadian |
| DRP ditulis bertahun lalu, belum pernah diuji | separuh sistem di dalamnya sudah tidak ada |

Yang pertama paling berbahaya, dan justru **karena laporannya hijau**.

Pekerjaan cadangan berhasil setiap malam. Log-nya bersih. Ukuran berkasnya wajar. Tidak ada satu pun tanda bahwa berkas itu tidak bisa dipulihkan — sampai hari ketika ia dibutuhkan, dan itu hari yang paling buruk untuk menemukannya.

Karena itu pertanyaan auditor bukan *"apakah dicadangkan"*. Pertanyaannya: **"kapan terakhir kali dipulihkan, dan siapa yang menyaksikannya?"**

Dua pertanyaan itu tidak bisa dijawab dengan dokumen. Ia hanya bisa dijawab dengan kejadian.

**Pengendalian akses logik**

Uji yang paling murah di seluruh audit SI, dan hampir selalu berbuah. Bahannya dua daftar: **pengguna sistem** dan **pegawai aktif dari HR**.

Yang dicari:

- akun milik orang yang **sudah keluar** dan masih hidup
- **akun yatim** — ada di sistem, tidak ada pemiliknya di daftar mana pun
- akun aktif yang **lama tidak dipakai** — 90 hari, 200 hari, 400 hari
- yang di antara semua itu punya **hak istimewa**

Yang paling gawat kombinasi terakhir: **akun berhak istimewa yang tidak ada pemiliknya**. Kalau akun itu dipakai untuk sesuatu, tidak ada seorang pun yang bisa dimintai keterangan — dan jejak yang ditinggalkannya tidak menunjuk siapa pun.

Kenapa masalah ini ada di mana-mana? Karena bentuk permintaannya asimetris. **Memberi** hak akses selalu ada yang meminta, dengan alasan yang mendesak dan jelas. **Mencabut** hak akses tidak ada yang meminta — orang yang keluar tidak akan mengingatkan, dan atasannya sudah selesai memikirkannya.

Jadi hak akses **menumpuk** secara alami, sepanjang karier setiap orang, di setiap organisasi, kecuali ada yang memeriksanya secara berkala.

**Pengendalian akses fisik**

| Kendali | Yang dijaminnya |
|---|---|
| Pintu ruang peladen berkunci kartu | siapa yang masuk tercatat |
| Daftar tamu dan pendamping | tidak ada orang luar sendirian |
| Kamera menghadap rak | kejadian bisa ditelusuri |
| Kabel dan panel terkunci | tidak bisa dicabut diam-diam |
| Berkas cetak dikunci | data keluar bukan cuma lewat jaringan |

Bagian ini sering dianggap urusan satpam, bukan urusan TI. Padahal ia yang menentukan apakah seluruh kendali lainnya berarti.

Kendali logik seketat apa pun bisa dilewati oleh orang yang **berdiri di depan peladennya**. Mencabut cakram dan membawanya pulang tidak butuh satu pun kata sandi, tidak menyentuh satu pun kendali aplikasi, dan tidak meninggalkan satu pun baris log.

Uji yang lazim dan hampir selalu menemukan sesuatu: minta daftar pemegang kartu akses ruang peladen, lalu cocokkan dengan siapa yang benar-benar membutuhkannya. Daftar itu hampir selalu lebih panjang — dengan pola yang sama seperti hak akses logik, dan dengan sebab yang sama.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# total = biaya strategi + (rugi per jam x RTO)\n# rugi berhenti Rp 25 juta / jam,  semua angka dalam JUTA\n#\n#   strategi                          RTO  biaya  rugi  total\n#   Pulihkan dari pita cadangan      48 j      5  1200   1205\n#   Situs siaga dingin               24 j     40   600    640\n#   Cadangan di awan, pulih manual    8 j     60   200    260  <-- menang\n#   Situs siaga hangat                4 j    180   100    280\n#   Situs siaga panas               0.5 j    600    12    612\n#\n# Dari 48 j ke 8 j: total TURUN tajam.\n# Dari  8 j ke 4 j: total NAIK sedikit. Ada titik balik.',
      penjelasan: `Satu tabel yang menyelesaikan perdebatan yang di banyak organisasi berlangsung bertahun-tahun tanpa kesimpulan.

Perdebatannya selalu berbentuk sama. Bagian TI mengusulkan situs siaga; keuangan menolak karena mahal; dan karena tidak ada satu pun angka yang disepakati, yang menang adalah yang lebih gigih. Biasanya keuangan, sampai terjadi kegagalan besar, sesudah itu biasanya TI — dan keduanya kali ini juga tanpa angka.

Yang memutus kebuntuan itu satu bilangan: **kerugian per jam berhenti**.

Angka itu mengubah RTO dari urusan selera menjadi urusan aritmetika. Sebelum ada angka itu, "secepat mungkin" dan "secukupnya saja" adalah dua pendapat yang sama-sama tidak bisa dibantah.

Sekarang baca tabelnya dari atas.

**Pita cadangan.** Biayanya nyaris tidak ada — 5 juta setahun. Tetapi RTO-nya 48 jam, dan 48 jam berhenti berbiaya **1.200 juta**. Totalnya 1.205 juta, yang terburuk di seluruh daftar.

Ini bentuk kesalahan yang paling umum di organisasi kecil: memilih yang paling murah, dan membayar dua ratus kali lipatnya di tempat yang tidak masuk anggaran mana pun.

**Situs siaga panas.** Kebalikannya. RTO setengah jam, kerugian berhenti cuma **12 juta** — nyaris habis dipangkas.

Dan totalnya 612 juta, lebih dari dua kali pemenangnya.

Perhatikan apa yang terjadi di sini, karena bentuknya penting: penghematan yang bisa diperoleh **ada batasnya**. Kerugian berhenti tidak bisa turun di bawah nol. Begitu ia sudah nyaris nol, uang tambahan berapa pun tidak lagi menghemat apa pun — dan setiap rupiah tambahan menjadi biaya bersih.

Ini bentuk umum dari **imbal hasil yang menurun**, dan ia berlaku di banyak keputusan teknis lain: menambah uji, menambah pemantauan, menambah lapisan keamanan. Semuanya punya titik di mana tambahan berikutnya lebih mahal daripada masalah yang dicegahnya.

**Pemenangnya: cadangan di awan dengan pemulihan manual.** RTO 8 jam, total 260 juta.

Bukan yang tercepat. Bukan yang termurah. Ia yang totalnya terkecil.

Sekarang bagian yang paling berguna dari tabel ini: **bentuk kurvanya**.

Dari 48 jam ke 8 jam, totalnya turun dari 1.205 menjadi 260 — turun tajam. Dari 8 jam ke 4 jam, totalnya naik dari 260 menjadi 280 — **naik**.

Ada titik balik, dan pemenangnya duduk tepat di situ. Yang dilakukan hitungan ini bukan mencari yang paling cepat atau paling murah; ia mencari **titik baliknya**.

Dua peringatan, keduanya penting supaya angka ini tidak dipakai keliru.

**Pertama, kerugian per jam sering tidak lurus.** Berhenti satu jam mungkin berbiaya 25 juta, tetapi berhenti tiga hari bisa berbiaya jauh lebih dari 72 x 25 juta — karena pelanggan pindah, kontrak batal, dan reputasi rusak dengan cara yang tidak kembali. Untuk RTO panjang, kerugiannya melengkung naik, dan itu memperkuat strategi yang lebih cepat.

**Kedua, ada kerugian yang tidak bisa diuangkan.** Rumah sakit yang sistemnya mati, layanan darurat yang tidak bisa diakses, data pasien yang hilang — pada kasus seperti itu hitungan ini dipakai untuk memilih **di antara strategi yang semuanya sudah memenuhi syarat minimum**, bukan untuk menentukan syarat minimumnya.

Untuk sebagian besar sistem, hitungan ini cukup. Dan untuk sebagian besar sistem, hitungan ini juga jauh lebih baik daripada apa yang dipakai sekarang — yaitu tidak ada.`
    },
    {
      bahasa: 'python',
      kode: '# Dua daftar dicocokkan: PENGGUNA SISTEM  x  PEGAWAI AKTIF (HR)\n#\n#   akun         status HR         login   temuan\n#   andi         aktif             2 h     wajar\n#   budi         keluar           95 h     akun masih hidup\n#   dedi         keluar           12 h     masih hidup + HAK ISTIMEWA\n#   fani         aktif           400 h     tidak dipakai 400 hari\n#   svc_backup   layanan           0 h     wajar (akun layanan)\n#   admin_lama   tidak ada di HR  500 h    AKUN YATIM + HAK ISTIMEWA\n#\n# 5 dari 8 akun bermasalah.\n#\n# Yang paling gawat baris terakhir: akun berhak istimewa\n# yang TIDAK ADA PEMILIKNYA. Kalau dipakai, tidak ada\n# seorang pun yang bisa dimintai keterangan.',
      penjelasan: `Uji termurah di seluruh audit sistem informasi, dan yang paling jarang gagal menemukan sesuatu.

Bahannya cuma dua daftar, dan keduanya sudah ada — tidak perlu alat, tidak perlu akses istimewa, tidak perlu memahami kode aplikasinya. Satu daftar pengguna dari sistem, satu daftar pegawai aktif dari HR, lalu dicocokkan.

Yang keluar dari pencocokan itu selalu mengejutkan orang yang mengelola sistemnya sendiri.

Mari baca temuannya satu per satu, karena masing-masing bentuknya berbeda.

**Akun orang yang sudah keluar.** Bentuk paling langsung. Orangnya sudah tidak bekerja di sana, akunnya masih bisa dipakai.

Perhatikan \`budi\`: keluar, terakhir login 95 hari lalu. Dan \`dedi\`: keluar, terakhir login **12 hari lalu** — artinya ia masih memakainya setelah keluar, atau seseorang memakainya.

Yang kedua jauh lebih gawat, dan bedanya cuma satu kolom.

**Akun yatim.** \`admin_lama\` tidak ada di daftar HR sama sekali — bukan pegawai aktif, bukan mantan pegawai. Tidak ada yang tahu milik siapa.

Bagaimana ini terjadi? Biasanya begini: akun dibuat untuk keperluan sementara oleh orang yang sekarang sudah pindah, tidak pernah didaftarkan ke siapa pun, dan tidak ada yang berani menghapusnya karena tidak ada yang tahu apa yang bergantung padanya.

Dan itu ketakutan yang beralasan — di banyak sistem, akun tanpa pemilik ternyata dipakai oleh satu tugas terjadwal yang tidak terdokumentasi.

**Akun aktif yang lama tidak dipakai.** \`fani\` masih pegawai aktif, tetapi 400 hari tidak login. Ini bukan pelanggaran, tetapi ia **permukaan serangan tanpa manfaat**: akun yang bisa dijebol dan tidak akan ada yang menyadarinya, karena pemiliknya toh tidak pernah masuk.

**Akun layanan.** \`svc_backup\` berstatus "layanan" dan login 0 hari — dan itu **wajar**. Akun ini dipakai program, bukan orang.

Baris ini disengaja ada di contoh, karena inilah yang paling sering salah dinilai: auditor pemula menandai seluruh akun yang tidak ada di daftar HR sebagai temuan, lalu daftarnya penuh dengan akun layanan yang memang seharusnya begitu.

Akun layanan tetap perlu diperiksa, tetapi dengan pertanyaan yang berbeda: siapa **penanggung jawabnya**, apa haknya, dan apakah kata sandinya pernah diganti.

Sekarang **kombinasi yang paling gawat**, dan ia bukan salah satu dari yang di atas.

Akun yatim **berhak istimewa**.

Pikirkan bentuk risikonya. Kalau akun itu dipakai untuk mengubah data, menghapus log, atau memberi hak kepada akun lain, jejaknya akan ada — dan jejak itu **tidak menunjuk siapa pun**. Tidak ada orang yang bisa dimintai keterangan, tidak ada yang bisa dikonfrontasi, tidak ada yang bisa dimintai penjelasan.

Akun tanpa pemilik meniadakan **akuntabilitas**, dan akuntabilitas adalah dasar yang di atasnya seluruh kendali lain berdiri. Log yang tidak menunjuk orang cuma catatan kejadian, bukan bukti.

Terakhir, kenapa masalah ini ada di **hampir setiap** organisasi, termasuk yang dikelola dengan baik.

Karena permintaannya asimetris. Memberi hak akses selalu ada yang meminta — dengan alasan yang mendesak, jelas, dan biasanya benar. Mencabut hak akses **tidak ada yang meminta**: orang yang keluar tidak akan mengingatkan, dan atasannya sudah selesai memikirkan urusan itu.

Jadi hak akses menumpuk secara alami. Bukan karena kelalaian seseorang, melainkan karena tidak ada satu pun kekuatan yang mendorong ke arah sebaliknya.

Yang memperbaikinya cuma satu hal: **pemeriksaan berkala yang dijadwalkan**, dijalankan meski tidak ada yang memintanya. Dan karena ujinya cuma pencocokan dua daftar, tidak ada alasan biaya untuk tidak melakukannya tiap bulan.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Audit kelangsungan usaha & pengendalian akses
# ============================================

# --------------------------------------------
# 1. RTO dan RPO: dua angka yang sering tertukar
# --------------------------------------------
print("--- RTO vs RPO ---")
print("  RTO — Recovery Time Objective")
print("      berapa lama sistem boleh MATI")
print("      dijawab oleh: kecepatan pemulihan")
print("")
print("  RPO — Recovery Point Objective")
print("      berapa banyak data boleh HILANG")
print("      dijawab oleh: seberapa sering dicadangkan")
print("")
print("  Keduanya berdiri sendiri. Sistem bisa pulih dalam lima")
print("  menit (RTO bagus) tetapi kehilangan data sehari penuh")
print("  (RPO buruk) -- kalau cadangannya cuma dibuat tiap malam.")

# --------------------------------------------
# 2. Frekuensi cadangan menentukan RPO
# --------------------------------------------
print("")
print("--- cadangan tiap berapa lama? ---")
print("  " + "frekuensi".ljust(22) + "RPO terburuk".rjust(15)
      + "transaksi hilang".rjust(19))
LAJU = 500          # transaksi per jam
FREK = [("tiap 5 menit", 5/60), ("tiap jam", 1), ("tiap 6 jam", 6),
        ("tiap malam (24 jam)", 24), ("tiap pekan", 168)]
for nama, jam in FREK:
    hilang = int(LAJU * jam)
    if jam < 1:
        rpo = "%.0f menit" % (jam * 60)
    elif jam < 24:
        rpo = "%.0f jam" % jam
    else:
        rpo = "%.0f hari" % (jam / 24)
    print("  " + nama.ljust(22) + rpo.rjust(15)
          + f"{hilang:>19,}".replace(",", "."))
print("")
print("  Laju " + str(LAJU) + " transaksi/jam. RPO terburuk terjadi kalau")
print("  kegagalan datang tepat SEBELUM cadangan berikutnya --")
print("  jadi yang dipakai bukan rata-rata, melainkan jarak")
print("  penuh antar cadangan.")

# --------------------------------------------
# 3. Biaya pemulihan vs biaya berhenti
# --------------------------------------------
print("")
print("--- menentukan RTO yang layak ---")
RUGI_PER_JAM = 25_000_000
STRATEGI = [
    ("Pulihkan dari pita cadangan",  48,     5_000_000),
    ("Cadangan di awan, pulih manual", 8,   60_000_000),
    ("Situs siaga dingin",            24,   40_000_000),
    ("Situs siaga hangat",             4,  180_000_000),
    ("Situs siaga panas / aktif ganda", 0.5, 600_000_000),
]
print("  kerugian berhenti: Rp "
      + f"{RUGI_PER_JAM:,}".replace(",", ".") + " per jam")
print("")
def juta(n):
    return ("%.0f" % (int(n) / 1_000_000)).rjust(7)

print("  (semua angka dalam JUTA rupiah)")
print("")
print("  " + "strategi".ljust(30) + "RTO".rjust(7)
      + "biaya".rjust(8) + "rugi".rjust(8) + "total".rjust(9))
terbaik = None
for nama, rto, biaya in STRATEGI:
    rugi = int(RUGI_PER_JAM * rto)
    total = biaya + rugi
    if terbaik is None or total < terbaik[0]:
        terbaik = (total, nama, rto)
    rto_t = ("%.1f j" % rto) if rto < 1 else ("%.0f j" % rto)
    print("  " + nama.ljust(30) + rto_t.rjust(7)
          + juta(biaya).rjust(8) + juta(rugi).rjust(8)
          + juta(total).rjust(9))
print("")
print("  Termurah secara total: " + terbaik[1])
print("  RTO " + str(terbaik[2]) + " jam, total Rp "
      + f"{int(terbaik[0]):,}".replace(",", "."))
print("")
print("  Perhatikan bahwa yang PALING CEPAT bukan yang terbaik.")
print("  Situs siaga panas memangkas kerugian berhenti hampir")
print("  habis, tetapi biayanya sendiri melampaui penghematannya.")
print("")
print("  Ini satu-satunya cara menetapkan RTO yang bisa")
print("  dipertanggungjawabkan: bukan 'secepat mungkin',")
print("  melainkan titik di mana total biayanya terkecil.")

# --------------------------------------------
# 4. Cadangan yang tidak pernah diuji
# --------------------------------------------
print("")
print("--- yang paling sering ditemukan auditor ---")
TEMUAN = [
    ("Cadangan berjalan, tak pernah dipulihkan",
     "tidak ada yang tahu apakah bisa dipakai"),
    ("Cadangan di rak yang sama dengan peladen",
     "kebakaran menghabiskan keduanya"),
    ("Kunci enkripsi cadangan ikut hilang",
     "datanya ada, tidak bisa dibuka"),
    ("Prosedur pemulihan cuma di kepala satu orang",
     "orang itu cuti saat kejadian"),
    ("DRP ditulis 2019, belum pernah diuji",
     "separuh sistem di dalamnya sudah tidak ada"),
]
for a, b in TEMUAN:
    print("  " + a)
    print("      akibat: " + b)
print("")
print("  Yang pertama paling berbahaya justru karena laporannya")
print("  HIJAU. Pekerjaan cadangan berhasil tiap malam, dan tidak")
print("  ada satu pun tanda bahwa berkasnya tidak bisa dipulihkan.")
print("")
print("  Karena itu pertanyaan auditor bukan 'apakah dicadangkan',")
print("  melainkan 'kapan terakhir kali dipulihkan, dan siapa")
print("  yang menyaksikannya'.")

# --------------------------------------------
# 5. Uji hak akses: akun yang seharusnya sudah mati
# --------------------------------------------
print("")
print("--- uji pengendalian akses logik ---")
# (nama, status kepegawaian, hari sejak login terakhir, hak istimewa)
AKUN = [
    ("andi",   "aktif",   2,   False),
    ("budi",   "keluar",  95,  False),
    ("citra",  "aktif",   1,   True),
    ("dedi",   "keluar",  12,  True),
    ("eka",    "aktif",   210, False),
    ("fani",   "aktif",   400, True),
    ("svc_backup", "layanan", 0, True),
    ("admin_lama", "tidak ada di HR", 500, True),
]
print("  " + "akun".ljust(14) + "status HR".ljust(18)
      + "login terakhir".rjust(15))
jumlah_temuan = 0
for nama, status, hari, istimewa in AKUN:
    catat = []
    if status == "keluar":
        catat.append("SUDAH KELUAR, akun masih hidup")
    if status == "tidak ada di HR":
        catat.append("AKUN YATIM, tidak ada pemiliknya")
    if status == "aktif" and hari > 90:
        catat.append("tidak dipakai " + str(hari) + " hari")
    if istimewa and status in ("keluar", "tidak ada di HR"):
        catat.append("dan punya hak ISTIMEWA")
    if catat:
        jumlah_temuan += 1
    print("  " + nama.ljust(14) + status.ljust(18)
          + (str(hari) + " hari").rjust(15))
    if catat:
        for c in catat:
            print("      ! " + c)
    else:
        print("      wajar")
print("")
print("  " + str(jumlah_temuan) + " dari " + str(len(AKUN))
      + " akun bermasalah.")
print("")
print("  Uji ini butuh dua daftar: pengguna sistem dan pegawai")
print("  aktif dari HR. Mencocokkan keduanya adalah salah satu")
print("  uji audit yang paling murah dan paling sering berbuah.")
print("")
print("  Baris 'admin_lama' yang paling gawat: akun berhak")
print("  istimewa yang tidak ada pemiliknya. Kalau dipakai, tidak")
print("  ada seorang pun yang bisa dimintai keterangan.")

# --------------------------------------------
# 6. Akses fisik: sering dilupakan
# --------------------------------------------
print("")
print("--- pengendalian akses fisik ---")
FISIK = [
    ("Pintu ruang server berkunci kartu", "siapa yang masuk tercatat"),
    ("Daftar tamu & pendamping",          "tak ada orang luar sendirian"),
    ("Kamera menghadap rak",              "kejadian bisa ditelusuri"),
    ("Kabel & panel terkunci",            "tak bisa dicabut diam-diam"),
    ("Berkas cetak dikunci",           "data keluar bukan cuma via jaringan"),
]
for a, b in FISIK:
    print("  " + a.ljust(34) + b)
print("")
print("  Kendali logik seketat apa pun bisa dilewati oleh orang")
print("  yang berdiri di depan peladennya. Mencabut cakram dan")
print("  membawanya pulang tidak butuh satu pun kata sandi.")
print("")
print("  Uji yang lazim: minta daftar pemegang kartu akses ruang")
print("  server, lalu cocokkan dengan yang benar-benar butuh.")
print("  Daftar itu hampir selalu lebih panjang dari seharusnya.")` },
  output: `--- RTO vs RPO ---
  RTO — Recovery Time Objective
      berapa lama sistem boleh MATI
      dijawab oleh: kecepatan pemulihan

  RPO — Recovery Point Objective
      berapa banyak data boleh HILANG
      dijawab oleh: seberapa sering dicadangkan

  Keduanya berdiri sendiri. Sistem bisa pulih dalam lima
  menit (RTO bagus) tetapi kehilangan data sehari penuh
  (RPO buruk) -- kalau cadangannya cuma dibuat tiap malam.

--- cadangan tiap berapa lama? ---
  frekuensi                RPO terburuk   transaksi hilang
  tiap 5 menit                  5 menit                 41
  tiap jam                        1 jam                500
  tiap 6 jam                      6 jam              3.000
  tiap malam (24 jam)            1 hari             12.000
  tiap pekan                     7 hari             84.000

  Laju 500 transaksi/jam. RPO terburuk terjadi kalau
  kegagalan datang tepat SEBELUM cadangan berikutnya --
  jadi yang dipakai bukan rata-rata, melainkan jarak
  penuh antar cadangan.

--- menentukan RTO yang layak ---
  kerugian berhenti: Rp 25.000.000 per jam

  (semua angka dalam JUTA rupiah)

  strategi                          RTO   biaya    rugi    total
  Pulihkan dari pita cadangan      48 j       5    1200     1205
  Cadangan di awan, pulih manual    8 j      60     200      260
  Situs siaga dingin               24 j      40     600      640
  Situs siaga hangat                4 j     180     100      280
  Situs siaga panas / aktif ganda  0.5 j     600      12      612

  Termurah secara total: Cadangan di awan, pulih manual
  RTO 8 jam, total Rp 260.000.000

  Perhatikan bahwa yang PALING CEPAT bukan yang terbaik.
  Situs siaga panas memangkas kerugian berhenti hampir
  habis, tetapi biayanya sendiri melampaui penghematannya.

  Ini satu-satunya cara menetapkan RTO yang bisa
  dipertanggungjawabkan: bukan 'secepat mungkin',
  melainkan titik di mana total biayanya terkecil.

--- yang paling sering ditemukan auditor ---
  Cadangan berjalan, tak pernah dipulihkan
      akibat: tidak ada yang tahu apakah bisa dipakai
  Cadangan di rak yang sama dengan peladen
      akibat: kebakaran menghabiskan keduanya
  Kunci enkripsi cadangan ikut hilang
      akibat: datanya ada, tidak bisa dibuka
  Prosedur pemulihan cuma di kepala satu orang
      akibat: orang itu cuti saat kejadian
  DRP ditulis 2019, belum pernah diuji
      akibat: separuh sistem di dalamnya sudah tidak ada

  Yang pertama paling berbahaya justru karena laporannya
  HIJAU. Pekerjaan cadangan berhasil tiap malam, dan tidak
  ada satu pun tanda bahwa berkasnya tidak bisa dipulihkan.

  Karena itu pertanyaan auditor bukan 'apakah dicadangkan',
  melainkan 'kapan terakhir kali dipulihkan, dan siapa
  yang menyaksikannya'.

--- uji pengendalian akses logik ---
  akun          status HR          login terakhir
  andi          aktif                      2 hari
      wajar
  budi          keluar                    95 hari
      ! SUDAH KELUAR, akun masih hidup
  citra         aktif                      1 hari
      wajar
  dedi          keluar                    12 hari
      ! SUDAH KELUAR, akun masih hidup
      ! dan punya hak ISTIMEWA
  eka           aktif                    210 hari
      ! tidak dipakai 210 hari
  fani          aktif                    400 hari
      ! tidak dipakai 400 hari
  svc_backup    layanan                    0 hari
      wajar
  admin_lama    tidak ada di HR          500 hari
      ! AKUN YATIM, tidak ada pemiliknya
      ! dan punya hak ISTIMEWA

  5 dari 8 akun bermasalah.

  Uji ini butuh dua daftar: pengguna sistem dan pegawai
  aktif dari HR. Mencocokkan keduanya adalah salah satu
  uji audit yang paling murah dan paling sering berbuah.

  Baris 'admin_lama' yang paling gawat: akun berhak
  istimewa yang tidak ada pemiliknya. Kalau dipakai, tidak
  ada seorang pun yang bisa dimintai keterangan.

--- pengendalian akses fisik ---
  Pintu ruang server berkunci kartu siapa yang masuk tercatat
  Daftar tamu & pendamping          tak ada orang luar sendirian
  Kamera menghadap rak              kejadian bisa ditelusuri
  Kabel & panel terkunci            tak bisa dicabut diam-diam
  Berkas cetak dikunci              data keluar bukan cuma via jaringan

  Kendali logik seketat apa pun bisa dilewati oleh orang
  yang berdiri di depan peladennya. Mencabut cakram dan
  membawanya pulang tidak butuh satu pun kata sandi.

  Uji yang lazim: minta daftar pemegang kartu akses ruang
  server, lalu cocokkan dengan yang benar-benar butuh.
  Daftar itu hampir selalu lebih panjang dari seharusnya.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung RPO tiap frekuensi cadangan', waktu: 'O(f)', memori: 'f = pilihan frekuensi, sangat kecil' },
      { operasi: 'Bandingkan total biaya strategi', waktu: 'O(s)', memori: 's = jumlah strategi dibandingkan' },
      { operasi: 'Cocokkan daftar akun dengan daftar HR', waktu: 'O(A + H)', memori: 'pakai tabel hash, bukan telusur ganda' },
      { operasi: 'Cari akun tidak aktif', waktu: 'O(A)', memori: 'sekali telusuri, butuh kolom login terakhir' },
      { operasi: 'Uji pemulihan cadangan sungguhan', waktu: 'jam sampai hari', memori: 'ini bagian mahalnya, dan tidak bisa dilewati' }
    ],
    intuisi: `Empat baris pertama semuanya murah. Pencocokan dua daftar akun sebaiknya memakai tabel hash sehingga \`O(A + H)\`, bukan membandingkan setiap akun dengan setiap pegawai yang akan menjadi \`O(A x H)\` — untuk 5.000 akun dan 5.000 pegawai, itu selisih antara sepuluh ribu dan dua puluh lima juta perbandingan.

Baris terakhir yang menentukan, dan biayanya bukan komputasi. **Uji pemulihan sungguhan** butuh jam sampai hari, butuh tempat terpisah, dan butuh orang yang menyaksikannya.

Dan justru karena mahal itulah ia hampir selalu dilewati — lalu diganti dengan memeriksa laporan pekerjaan cadangan, yang berbiaya nol dan tidak membuktikan apa pun. Ini bentuk pengalihan yang paling umum dalam kelangsungan usaha: **memeriksa hal yang murah, dan menyebutnya sebagai bukti untuk hal yang mahal.**`
  },

  kesalahanUmum: [
    {
      salah: 'Menetapkan RTO secepat yang mampu dibeli.',
      kenapa: 'Kerugian karena berhenti tidak bisa turun di bawah nol, sehingga setelah RTO cukup pendek, uang tambahan tidak lagi menghemat apa pun dan seluruhnya menjadi biaya bersih. Strategi tercepat sering bertotal biaya beberapa kali lipat strategi yang lebih lambat.',
      benar: 'Hitung total biaya strategi ditambah kerugian berhenti untuk beberapa pilihan, lalu pilih titik dengan total terkecil.'
    },
    {
      salah: 'Menyimpulkan pencadangan berjalan baik karena laporan pekerjaan cadangannya selalu berhasil.',
      kenapa: 'Laporan itu hanya menunjukkan berkas berhasil dibuat, bukan berkas berhasil dipulihkan. Cadangan yang rusak, tidak lengkap, atau terenkripsi dengan kunci yang hilang tetap menghasilkan laporan hijau, dan kegagalannya baru diketahui pada hari yang paling buruk untuk mengetahuinya.',
      benar: 'Lakukan pemulihan sungguhan ke tempat terpisah secara berkala, catat waktunya, dan simpan catatan siapa yang menyaksikannya.'
    },
    {
      salah: 'Mencampur RTO dan RPO sebagai satu ukuran kesiapan.',
      kenapa: 'Keduanya ditentukan oleh hal yang berbeda: RTO oleh kecepatan pemulihan, RPO oleh frekuensi pencadangan. Sistem bisa pulih dalam lima menit namun kehilangan data sehari penuh, dan memperbaiki yang satu tidak memperbaiki yang lain.',
      benar: 'Tetapkan dua angka terpisah dengan alasan masing-masing, lalu rancang kecepatan pemulihan dan frekuensi pencadangan sebagai dua keputusan berbeda.'
    },
    {
      salah: 'Memakai jarak rata-rata antar cadangan untuk menaksir data yang hilang.',
      kenapa: 'Kegagalan tidak memilih waktu, sehingga yang harus direncanakan adalah kemungkinan ia datang tepat sebelum cadangan berikutnya. Memakai rata-rata menaksir kehilangan sekitar setengah dari yang mungkin terjadi.',
      benar: 'Hitung RPO dari jarak penuh antar cadangan, dan sebutkan angka itu sebagai kehilangan terburuk.'
    },
    {
      salah: 'Menyimpan cadangan di tempat yang sama dengan sistemnya, atau kuncinya di sistem yang sama.',
      kenapa: 'Satu kejadian fisik seperti kebakaran atau pencurian menghabiskan keduanya sekaligus, sehingga cadangannya tidak melindungi terhadap kelas kejadian yang justru paling merusak. Kunci enkripsi yang ikut hilang membuat datanya ada tetapi tidak bisa dibuka.',
      benar: 'Simpan setidaknya satu salinan di lokasi berbeda, dan simpan kunci enkripsinya terpisah dari sistem maupun dari cadangannya.'
    },
    {
      salah: 'Menandai setiap akun yang tidak ada di daftar pegawai sebagai temuan.',
      kenapa: 'Akun layanan yang dipakai program memang tidak akan ada di daftar pegawai, dan menandainya membuat daftar temuan penuh dengan hal yang seharusnya begitu. Temuan yang berisik akan diabaikan seluruhnya, termasuk bagian yang benar.',
      benar: 'Pisahkan akun layanan sebagai kelas tersendiri, lalu periksa dengan pertanyaan berbeda yaitu siapa penanggung jawabnya, apa haknya, dan kapan kata sandinya terakhir diganti.'
    },
    {
      salah: 'Mengandalkan pengendalian akses logik tanpa memeriksa akses fisik ke ruang peladen.',
      kenapa: 'Orang yang berdiri di depan peladen bisa mencabut cakram dan membawanya tanpa menyentuh satu pun kendali aplikasi, tanpa kata sandi, dan tanpa meninggalkan baris log. Seluruh kendali logik menjadi tidak relevan terhadap jalur itu.',
      benar: 'Minta daftar pemegang kartu atau kunci ruang peladen, cocokkan dengan yang benar-benar membutuhkannya, dan periksa juga penyimpanan berkas cetak.'
    }
  ],

  analogi: `Bayangkan kamu **menulis skripsi**, dan berkasnya cuma ada di laptop.

**RPO** adalah pertanyaan: kalau laptopnya rusak sekarang, berapa banyak tulisan yang hilang?

Kalau kamu terakhir menyalin ke flashdisk seminggu lalu, jawabannya **seminggu menulis**. Bukan rata-rata setengah pekan — seminggu penuh, karena kerusakan tidak memilih waktu dan bisa datang tepat sebelum kamu menyalin lagi.

**RTO** adalah pertanyaan yang berbeda: berapa lama sampai kamu bisa menulis lagi?

Dan perhatikan keduanya bisa sangat berbeda. Kalau ada laptop pinjaman di sebelahmu, RTO-mu sepuluh menit. Tapi RPO-mu tetap seminggu — laptop pinjaman tidak mengembalikan tulisan yang belum tersalin.

Sekarang soal biaya.

Kamu bisa menyalin **setiap kali menekan simpan**, otomatis ke awan. RPO-nya nyaris nol. Biayanya: langganan bulanan yang murah, dan sedikit waktu menyiapkannya.

Atau kamu bisa menyewa **laptop kedua** yang selalu tersinkron dan siap dipakai. RTO-nya dua menit.

Untuk skripsi, itu **jelas berlebihan**. Kerugianmu kalau berhenti menulis dua hari tidak sebanding harga laptop kedua. Yang masuk akal: sinkron otomatis, dan kalau laptopnya rusak kamu pinjam punya teman selama beberapa hari.

Untuk **toko daring** yang penghasilannya jutaan per jam, hitungannya berbalik: laptop kedua yang siap menyala jadi murah dibanding berhenti sehari.

Angka yang sama, dua kesimpulan berbeda, dan pembedanya cuma satu: **berapa kerugianmu per jam berhenti.**

Sekarang bagian yang paling penting, dan yang paling sering diabaikan.

Kamu menyalin ke flashdisk setiap malam selama enam bulan. Rutin, disiplin, tidak pernah lupa.

Suatu hari laptopmu rusak. Kamu buka flashdisk-nya, dan berkasnya **tidak bisa dibuka** — rusak entah sejak kapan.

Selama enam bulan, kamu punya rasa aman. Yang tidak kamu punya adalah **cadangan**, karena kamu tidak pernah sekali pun membukanya kembali.

Pertanyaan yang benar bukan *"apakah aku mencadangkan?"*

Pertanyaannya: **"kapan terakhir kali aku membuka cadanganku dan melihat isinya?"**

Terakhir, soal akses.

Kamu mengunci laptopmu dengan kata sandi yang panjang dan sidik jari. Kendali logiknya bagus.

Lalu laptopnya kamu tinggalkan di meja kafe saat ke toilet.

Kendali logik seketat apa pun tidak berlaku bagi orang yang **memegang barangnya**. Dan itu berlaku sama untuk ruang peladen: pintu yang tidak terkunci membatalkan seluruh kata sandi di dalamnya.`,

  latihan: [
    'Untuk satu sistem yang kamu kelola, tentukan RTO dan RPO yang kamu butuhkan, masing-masing dengan alasannya.',
    'Taksir laju transaksi sistem itu, lalu hitung jumlah data yang hilang untuk lima pilihan frekuensi pencadangan.',
    'Jelaskan kenapa RPO dihitung dari jarak penuh antar cadangan dan bukan dari rata-ratanya.',
    'Taksir kerugian per jam berhenti untuk satu organisasi nyata, lalu jelaskan komponen apa saja yang kamu masukkan.',
    'Bandingkan total biaya lima strategi pemulihan, lalu tunjukkan di mana titik baliknya dan kenapa strategi tercepat kalah.',
    'Ulangi hitungan itu dengan kerugian per jam sepuluh kali lebih besar, lalu tunjukkan strategi mana yang sekarang menang.',
    'Lakukan pemulihan sungguhan dari cadangan yang kamu punya, catat waktunya, dan bandingkan dengan RTO yang kamu duga sebelumnya.',
    'Periksa di mana cadanganmu disimpan dan di mana kunci enkripsinya, lalu tentukan kejadian apa yang bisa menghabiskan keduanya.',
    'Cocokkan daftar akun satu sistem dengan daftar orang yang berhak, lalu kelompokkan temuannya menjadi sudah keluar, yatim, dan lama tidak dipakai.',
    'Minta daftar pemegang kunci atau kartu akses ruang peladen di satu organisasi, lalu tentukan berapa yang benar-benar membutuhkannya.'
  ]
});
