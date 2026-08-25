/* ============================================================
   mpi.js — materi Manajemen Proyek Informatika (Semester 5)

   Folder "Semester Lima/MPI" kosong, jadi tidak ada slide atau
   berkas kuliah yang bisa dipakai. Materi di bawah disusun dari
   pengetahuan umum manajemen proyek (kerangka PMBOK, CPM/PERT,
   Earned Value, Scrum) dan dipilih yang benar-benar bisa
   DIHITUNG serta terpakai di proyek perangkat lunak.

   Kalau nanti slide kuliahnya didapat, bandingkan urutan dan
   penekanannya — bagian yang tidak diajarkan bisa dilewati,
   dan yang belum ada di sini bisa ditambahkan.

   Tidak diulang di sini karena sudah ada di tempat lain:
   WBS, Gantt, RACI, COCOMO, dan segitiga proyek dibahas di
   "Perencanaan Sumber Daya & Anggaran" (Sistem Informasi);
   SDLC di Rekayasa Perangkat Lunak; pengujian di UKPL.
   ============================================================ */

TOPICS.push({
  id: 'mpi-lingkup',
  judul: 'Inisiasi, Lingkup & Pemangku Kepentingan',
  kategori: 'mpi',
  tag: ['piagam proyek', 'lingkup', 'scope creep', 'pengendalian perubahan', 'pemangku kepentingan'],
  ringkas: 'Sepuluh permintaan yang semuanya masuk akal, dan proyeknya membengkak sepertiga.',

  fungsi: `**Menetapkan apa yang dikerjakan, dan menjaganya tidak melebar tanpa keputusan.**

Terpakai di:

- **Proposal** tugas akhir dan kerja praktik — batasan masalah adalah pernyataan lingkup
- **Menghadapi permintaan tambahan** dari dosen pembimbing atau klien
- **Tugas kelompok** — menetapkan siapa mengerjakan apa dan sampai mana
- **Kerja nyata** — hampir semua proyek dimulai dengan dokumen seperti ini

Yang paling menyelamatkan: **tulis apa yang TIDAK diserahkan.**

Tanpa itu, setiap permintaan baru terasa seperti sudah termasuk sejak awal, dan menolaknya terasa seperti ingkar janji.

Dan sebab pembengkakan yang paling sering: **tidak ada yang menyimpan catatan totalnya.** Sepuluh permintaan yang masing-masing di bawah seminggu bisa menambah sepertiga waktu proyek, tanpa satu pun keputusan yang terasa memperbesarnya.`,

  praktik: {
    tujuan: `Kamu punya piagam proyek satu halaman, kriteria yang bisa gagal, dan cara mencatat perubahan supaya harganya terlihat.`,
    alat: [
      'Satu halaman kertas atau dokumen',
      'Spreadsheet untuk catatan perubahan',
      'Satu proyek nyata'
    ],
    langkah: [
      { judul: 'Tulis piagamnya dalam satu halaman',
        isi: `Enam pertanyaan: kenapa, apa, berhasil, siapa, kapan, berapa.

Satu halaman itu batas yang disengaja. Kalau tidak muat, biasanya karena lingkupnya belum diputuskan — bukan karena halamannya terlalu kecil.` },
      { judul: 'Tulis daftar "di luar lingkup" secara tegas',
        isi: `Ini bagian yang paling sering hilang dan paling banyak menolong.

Tulis lima hal yang **tidak** akan dikerjakan, meski orang mungkin mengharapkannya. Lalu sepakati bersama sponsor **sebelum** mulai.` },
      { judul: 'Uji tiap kriteria keberhasilan',
        isi: `Untuk tiap kriteria, tanyakan satu hal: **bisakah ini dinyatakan gagal?**

Kalau tidak, ia bukan kriteria — ia harapan. Ganti dengan yang punya angka dan tenggat.` },
      { judul: 'Buat catatan perubahan dengan kolom kumulatif',
        isi: `Tiga kolom: permintaan, tambahan hari, tambahan biaya. Dan yang paling penting: **kolom kumulatif**.

Tanpa kolom itu, permintaan kesepuluh dinilai seolah-olah yang pertama.` },
      { judul: 'Sediakan anggaran perubahan sejak awal',
        isi: `Alokasikan sekian hari untuk permintaan yang belum diketahui.

Ini mengubah percakapannya sepenuhnya: bukan lagi *"boleh atau tidak"*, melainkan **"dari sisa jatah kita, ini yang paling berharga?"**

Pertanyaan kedua bisa dijawab dengan baik; yang pertama selalu dijawab "boleh".` },
      { judul: 'Hitung biaya sesungguhnya satu fitur',
        isi: `Ambil satu fitur, lalu tambahkan pengujian, dokumentasi, pelatihan, dan pemeliharaan tahunan.

Bandingkan dengan estimasi awalmu yang cuma menghitung waktu menulis kode. Selisihnya biasanya beberapa kali lipat.` },
      { judul: 'Petakan pemangku kepentingan pada dua sumbu',
        isi: `Kuasa dan minat, masing-masing tiga tingkat.

Cari kotak **kuasa rendah, minat tinggi** — biasanya staf yang memakai sistemnya harian. Mereka tidak bisa membatalkan proyek, tetapi bisa diam-diam tidak memakainya.` },
      { judul: 'Tulis kriteria selesai tiap paket kerja',
        isi: `Untuk tiap paket, jawab: *"selesai"* berarti apa — kodenya jalan, sudah teruji, atau sudah dipakai pengguna?

Sepakati bersama pihak yang akan menerimanya. Perbedaan tafsir ini baru muncul saat serah terima, ketika memperbaikinya paling mahal.` }
    ],
    cek: [
      'Piagammu memuat daftar hal yang tidak diserahkan',
      'Setiap kriteria keberhasilanmu bisa dinyatakan gagal',
      'Catatan perubahanmu punya kolom kumulatif yang muncul di setiap laporan'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa scope creep tidak pernah terasa',

  konsep: `
Proyek gagal jauh lebih sering karena **salah menetapkan apa yang dikerjakan** daripada karena salah mengerjakannya. Itu sebabnya tahap inisiasi, yang terasa administratif, justru yang paling menentukan.

**Piagam proyek**

Satu dokumen pendek yang menjawab enam hal sebelum pekerjaan dimulai:

| Pertanyaan | Isinya |
|---|---|
| **Kenapa** | masalah apa yang diselesaikan, bagi siapa |
| **Apa** | hasil yang diserahkan, **dan yang tidak** |
| **Berhasil** | ukuran yang bisa diperiksa |
| **Siapa** | sponsor, manajer proyek, wewenangnya |
| **Kapan** | tonggak utama, bukan jadwal rinci |
| **Berapa** | pagu anggaran dan asumsinya |

Yang paling sering hilang bagian **"dan yang tidak diserahkan"**. Tanpa itu, setiap permintaan baru terasa seperti sudah termasuk sejak awal — dan menolaknya terasa seperti ingkar janji.

**Kriteria keberhasilan harus bisa gagal**

Ujinya satu pertanyaan: **bisakah kriteria ini dinyatakan gagal?**

- *"Sistem berjalan dengan baik"* — tidak bisa gagal, jadi bukan kriteria
- *"Pengguna merasa puas"* — puas menurut siapa, diukur bagaimana
- *"Waktu proses pengajuan turun dari 9 hari jadi 2 hari"* — bisa diukur, bisa gagal
- *"80 persen pengajuan masuk lewat sistem dalam 3 bulan"* — bisa diukur, bisa gagal

Kriteria yang tidak bisa gagal bukan kriteria. Ia **harapan**.

**Lingkup: tiga dokumen yang saling terikat**

- **pernyataan lingkup** — apa yang termasuk dan tidak
- **WBS** — pemecahannya sampai jadi paket kerja
- **kamus WBS** — arti tiap paket, dan **kapan ia dianggap selesai**

Yang ketiga sering dilewatkan, dan justru itu yang mencegah perdebatan di akhir. *"Modul laporan selesai"* berarti apa — kodenya jalan, atau sudah teruji, atau sudah dipakai pengguna?

WBS dan alat perencanaannya dibahas terpisah di **Perencanaan Sumber Daya & Anggaran** pada mata kuliah Sistem Informasi.

**Scope creep**

Pelebaran lingkup yang terjadi **tanpa keputusan sadar**.

Yang membuatnya berbahaya: ia tidak pernah datang sebagai satu permintaan besar yang bisa ditolak. Ia datang sebagai sepuluh permintaan kecil, satu per satu, selama berbulan-bulan — dan setiap satunya **memang masuk akal**.

Sepuluh permintaan yang masing-masing di bawah seminggu bisa menambah sepertiga waktu proyek. Tidak ada satu pun titik di mana seseorang memutuskan memperbesar proyeknya.

**Biaya yang tidak diminta**

Estimasi biasanya menghitung waktu menulis kode. Yang ikut datang bersamanya tidak:

- **pengujian** — kasus uji baru, dan regresi untuk yang lama
- **dokumentasi** — manual pengguna, catatan teknis
- **pelatihan** — menjelaskan ke pengguna
- **pemeliharaan** — setiap tahun, selama sistem hidup

Fitur yang diperkirakan sepuluh juta bisa menghabiskan dua sampai empat kali itu selama masa pakainya. Estimasi yang hanya menghitung kode selalu terlalu murah, dan makin terlalu murah untuk sistem yang berumur panjang.

**Pengendalian perubahan**

Lima langkah:

- permintaan **ditulis**, bukan lisan
- **dampaknya dinilai**: waktu, biaya, risiko, fitur lain yang tergeser
- **diputuskan** oleh yang berwenang mengubah pagu
- kalau disetujui, **rencana dan pagu diperbarui**
- kalau ditolak, **alasannya dicatat**

Langkah keempat yang paling sering dilewatkan. Menyetujui perubahan tanpa memperbarui jadwal dan anggaran berarti tim diminta mengerjakan lebih banyak dalam waktu yang sama — dan yang dikorbankan **mutu**.

Prosedur ini **bukan** untuk menolak perubahan. Perubahan itu wajar dan sering perlu. Prosedurnya untuk memastikan **harganya terlihat sebelum disetujui**.

**Pemangku kepentingan: kuasa dikali minat**

Petakan tiap pihak pada dua sumbu, lalu tentukan strateginya:

| | Minat rendah | Minat tinggi |
|---|---|---|
| **Kuasa tinggi** | jaga tetap puas | **kelola erat, libatkan** |
| **Kuasa rendah** | pantau saja | beri informasi rutin |

Yang paling sering diabaikan kotak **kuasa rendah, minat tinggi** — staf yang memakai sistemnya setiap hari.

Mereka tidak bisa membatalkan proyek. Tetapi mereka bisa **diam-diam tidak memakainya**, dan itu bentuk kegagalan yang tidak muncul di laporan mana pun. Sistemnya diserahkan, ditandatangani, dan tidak dipakai.

**Perubahan paling murah di awal**

Biaya mengubah keputusan naik tajam seiring tahap. Karena itu waktu yang dihabiskan memperjelas kebutuhan di awal **bukan penundaan** — ia investasi dengan pengembalian terbesar di seluruh proyek.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# SCOPE CREEP: TIDAK ADA SATU PUN YANG TERASA BESAR\n#\n#   permintaan                        hari   kumulatif\n#   Tambah satu kolom di formulir      0.5         0.5\n#   Tambah kolom lagi (3 kolom)        1.5         2.0\n#   Ubah tata letak halaman utama      2.0         4.0\n#   Tambah satu jenis laporan          4.0         8.0\n#   Ekspor ke Excel                    2.0        10.0\n#   Kirim notifikasi WhatsApp          6.0        16.0\n#   Tambah peran pengguna baru         5.0        21.0\n#   Riwayat perubahan tiap data        7.0        28.0\n#   Dasbor grafik untuk pimpinan       8.0        36.0\n#   Login lewat akun Google            4.0        40.0\n#\n# 40 hari dari proyek 120 hari = tambahan 33%.\n#\n# Tidak ada satu pun keputusan yang terasa seperti\n# memperbesar proyek.',
      penjelasan: `
Kalau scope creep begitu merusak, kenapa ia terus terjadi — bahkan pada manajer proyek yang berpengalaman dan tahu istilahnya?

Karena setiap permintaannya, **satu per satu, memang masuk akal**.

Perhatikan baris pertama: menambah satu kolom di formulir, setengah hari. Bayangkan kamu manajer proyeknya, dan kepala bagian yang akan memakai sistem ini meminta itu.

Menolaknya akan terasa **konyol**. Setengah hari. Orang ini pengguna utamanya. Hubungan baik dengannya menentukan apakah sistemnya nanti dipakai. Dan permintaannya wajar — kolom itu memang dibutuhkan.

Jadi kamu setujui. Keputusan itu **benar**.

Dua pekan kemudian, permintaan berikutnya. Satu setengah hari. Argumen yang sama berlaku, jadi keputusan yang sama diambil. Juga benar.

Dan seterusnya, sepuluh kali, selama enam bulan.

Sekarang lihat kolom kumulatifnya. **Empat puluh hari.** Dari proyek 120 hari, itu tambahan sepertiga.

Perhatikan apa yang tidak pernah terjadi: **tidak ada satu titik pun di mana seseorang memutuskan memperbesar proyek ini sepertiga.** Setiap keputusannya kecil, masuk akal, dan diambil secara terpisah.

Inilah bentuk masalahnya, dan mengenalinya adalah setengah dari penyelesaiannya.

Sekarang kenapa naluri gagal di sini. Kita membandingkan tiap permintaan dengan **ukuran proyek** — setengah hari dibanding 120 hari, jelas tidak berarti. Yang seharusnya dibandingkan adalah tiap permintaan dengan **jumlah permintaan sebelumnya**, dan jumlah itu tidak ada di depan mata siapa pun.

Dari sini muncul penyelesaiannya, dan ia bukan "menolak perubahan".

**Pertama: buat jumlahnya terlihat.** Catat setiap perubahan yang disetujui beserta biayanya, dan tampilkan **totalnya** di setiap laporan. Begitu angka kumulatif ada di depan mata, permintaan kesebelas dinilai dengan konteks yang benar.

**Kedua: setiap persetujuan memperbarui pagu.** Kalau perubahan disetujui dan jadwalnya tidak diperbarui, kamu tidak menyetujui perubahan — kamu **memindahkan biayanya ke tim** dalam bentuk kerja lembur atau mutu yang menurun. Keduanya akan tampil nanti sebagai masalah lain yang penyebabnya tidak terlihat.

**Ketiga, dan yang paling ampuh: sediakan anggaran perubahan sejak awal.** Alokasikan sekian hari untuk permintaan yang belum diketahui. Sekarang percakapannya berubah sepenuhnya: bukan lagi *"boleh atau tidak"*, melainkan **"dari sisa anggaran perubahan kita, ini yang paling berharga?"**

Perhatikan bahwa cara ketiga mengubah pertanyaan dari **ya/tidak** menjadi **pengurutan**. Dan pengurutan adalah pertanyaan yang bisa dijawab pemangku kepentingan dengan baik, sementara ya/tidak selalu mereka jawab "ya".

Ada satu hal terakhir yang jarang disebut. Scope creep bukan **selalu** buruk.

Kalau kebutuhan yang muncul di tengah jalan memang lebih berharga daripada yang direncanakan, mengerjakannya adalah keputusan yang tepat. Yang buruk bukan perubahannya — melainkan perubahan yang **harganya tidak pernah dilihat** oleh orang yang memutuskannya.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Inisiasi, lingkup, dan pemangku kepentingan
# ============================================

# --------------------------------------------
# 1. Piagam proyek: enam pertanyaan
# --------------------------------------------
print("--- piagam proyek: yang harus terjawab sebelum mulai ---")
PIAGAM = [
    ("Kenapa",   "masalah apa yang diselesaikan, bagi siapa"),
    ("Apa",      "hasil yang diserahkan, dan yang TIDAK diserahkan"),
    ("Berhasil", "ukuran yang bisa diperiksa, bukan 'sistem berjalan baik'"),
    ("Siapa",    "sponsor, manajer proyek, dan wewenangnya"),
    ("Kapan",    "tonggak utama, bukan jadwal rinci"),
    ("Berapa",   "pagu anggaran dan asumsi di baliknya"),
]
for a, b in PIAGAM:
    print("  " + a.ljust(10) + b)
print("")
print("  Yang paling sering hilang: baris kedua bagian 'yang")
print("  TIDAK diserahkan'. Tanpa itu, setiap permintaan baru")
print("  terasa seperti sudah termasuk sejak awal.")

# --------------------------------------------
# 2. Kriteria berhasil harus bisa gagal
# --------------------------------------------
print("")
print("--- kriteria keberhasilan ---")
KRITERIA = [
    ("Sistem berjalan dengan baik",
     "tidak bisa diperiksa, tidak bisa gagal"),
    ("Pengguna merasa puas",
     "puas menurut siapa, diukur bagaimana"),
    ("Waktu proses pengajuan turun dari 9 hari jadi 2 hari",
     "bisa diukur, bisa gagal"),
    ("80% pengajuan masuk lewat sistem dalam 3 bulan",
     "bisa diukur, bisa gagal"),
]
for isi, nilai in KRITERIA:
    tanda = "BAIK " if "bisa gagal" in nilai else "buruk"
    print("  " + tanda + " " + isi)
    print("        " + nilai)
print("")
print("  Ujinya satu: bisakah kriteria ini DINYATAKAN GAGAL?")
print("  Kalau tidak, ia bukan kriteria -- ia harapan.")

# --------------------------------------------
# 3. Scope creep: kenapa 'kecil' menumpuk
# --------------------------------------------
print("")
print("--- 'tambah satu kolom saja' ---")
dasar_hari = 120
dasar_biaya = 300_000_000
PERMINTAAN = [
    ("Tambah satu kolom di formulir",     0.5,  1_000_000),
    ("Tambah kolom lagi (3 kolom)",       1.5,  3_000_000),
    ("Ubah tata letak halaman utama",     2.0,  5_000_000),
    ("Tambah satu jenis laporan",         4.0, 10_000_000),
    ("Ekspor ke Excel",                   2.0,  5_000_000),
    ("Kirim notifikasi WhatsApp",         6.0, 18_000_000),
    ("Tambah peran pengguna baru",        5.0, 14_000_000),
    ("Riwayat perubahan tiap data",       7.0, 20_000_000),
    ("Dasbor grafik untuk pimpinan",      8.0, 25_000_000),
    ("Login lewat akun Google",           4.0, 12_000_000),
]
print("  " + "permintaan".ljust(34) + "hari".rjust(6)
      + "biaya".rjust(14) + "  kumulatif hari")
kum_h, kum_b = 0.0, 0
for nama, h, b in PERMINTAAN:
    kum_h += h
    kum_b += b
    print("  " + nama.ljust(34) + ("%.1f" % h).rjust(6)
          + f"{b:>14,}".replace(",", ".")
          + ("%.1f" % kum_h).rjust(17))
print("")
print("  " + "TOTAL".ljust(34) + ("%.1f" % kum_h).rjust(6)
      + f"{kum_b:>14,}".replace(",", "."))
print("")
print("  Tidak ada satu pun permintaan di atas yang terasa")
print("  besar. Tetapi jumlahnya "
      + ("%.0f%%" % (kum_h / dasar_hari * 100)) + " tambahan waktu dan "
      + ("%.0f%%" % (kum_b / dasar_biaya * 100)))
print("  tambahan biaya -- tanpa satu pun keputusan yang")
print("  terasa seperti memperbesar proyek.")
print("")
print("  Inilah scope creep. Ia tidak pernah datang sebagai")
print("  satu permintaan besar yang bisa ditolak. Ia datang")
print("  sebagai sepuluh permintaan kecil yang semuanya")
print("  masuk akal, satu per satu, selama berbulan-bulan.")

# --------------------------------------------
# 4. Yang tak terlihat: biaya lanjutannya
# --------------------------------------------
print("")
print("--- setiap fitur punya biaya yang tidak diminta ---")
IKUTAN = [
    ("Kode",         1.0, "yang dihitung di estimasi"),
    ("Pengujian",    0.4, "kasus uji baru + regresi"),
    ("Dokumentasi",  0.2, "manual pengguna, catatan teknis"),
    ("Pelatihan",    0.2, "menjelaskan ke pengguna"),
    ("Pemeliharaan", 0.5, "per tahun, selama sistem hidup"),
]
print("  " + "komponen".ljust(16) + "pengali".rjust(9) + "  keterangan")
for nama, x, ket in IKUTAN:
    print("  " + nama.ljust(16) + ("%.1f" % x).rjust(9) + "  " + ket)
sekali = sum(x for n, x, _ in IKUTAN if n != "Pemeliharaan")
print("")
print("  Biaya sekali jadi   : " + ("%.1f" % sekali)
      + " kali estimasi kodenya")
print("  Ditambah pemeliharaan 0,5 kali SETIAP TAHUN")
print("")
fitur = 10_000_000
print("  Fitur yang diperkirakan Rp "
      + f"{fitur:,}".replace(",", ".") + " sesungguhnya:")
print("    tahun pertama  : Rp "
      + f"{int(fitur * (sekali + 0.5)):,}".replace(",", "."))
print("    lima tahun     : Rp "
      + f"{int(fitur * (sekali + 0.5 * 5)):,}".replace(",", "."))
print("")
print("  Angka pengali ini kasar dan berbeda tiap organisasi.")
print("  Yang nyata BENTUKNYA: estimasi yang cuma menghitung")
print("  waktu menulis kode selalu terlalu murah, dan makin")
print("  terlalu murah untuk sistem yang berumur panjang.")

# --------------------------------------------
# 5. Pengendalian perubahan
# --------------------------------------------
print("")
print("--- prosedur pengendalian perubahan ---")
LANGKAH = [
    "Permintaan ditulis, bukan lisan",
    "Dampaknya dinilai: waktu, biaya, risiko, fitur lain",
    "Diputuskan oleh yang berwenang mengubah pagu",
    "Kalau disetujui, rencana dan pagu DIPERBARUI",
    "Kalau ditolak, alasannya dicatat",
]
for i, l in enumerate(LANGKAH, 1):
    print("  " + str(i) + ". " + l)
print("")
print("  Langkah 4 yang paling sering dilewatkan. Menyetujui")
print("  perubahan tanpa memperbarui jadwal dan anggaran")
print("  berarti timnya diminta mengerjakan lebih banyak")
print("  dalam waktu yang sama -- dan yang dikorbankan MUTU.")
print("")
print("  Prosedur ini BUKAN untuk menolak perubahan.")
print("  Perubahan itu wajar dan sering perlu. Prosedurnya")
print("  untuk memastikan harganya terlihat sebelum disetujui.")

# --------------------------------------------
# 6. Pemangku kepentingan: kuasa x minat
# --------------------------------------------
print("")
print("--- petakan pemangku kepentingan ---")
# (nama, kuasa 1-3, minat 1-3)
ORANG = [
    ("Wakil Dekan (sponsor)",       3, 2),
    ("Kepala Bagian Akademik",      3, 3),
    ("Staf yang memakai harian",    1, 3),
    ("Bagian Keuangan",             2, 1),
    ("Bagian TIK (pemelihara)",     2, 3),
    ("Mahasiswa pengguna akhir",    1, 2),
    ("Auditor internal",            2, 1),
]
def strategi(kuasa, minat):
    if kuasa >= 2 and minat >= 2:  return "kelola erat, libatkan"
    if kuasa >= 2:                 return "jaga tetap puas"
    if minat >= 2:                 return "beri informasi rutin"
    return "pantau saja"
print("  " + "pemangku".ljust(28) + "kuasa".rjust(7)
      + "minat".rjust(7) + "  strategi")
for nama, k, m in sorted(ORANG, key=lambda o: -(o[1] * 3 + o[2])):
    print("  " + nama.ljust(28) + str(k).rjust(7) + str(m).rjust(7)
          + "  " + strategi(k, m))
print("")
print("  Perhatikan baris 'staf yang memakai harian': kuasanya")
print("  RENDAH tapi minatnya TINGGI. Mereka tidak bisa")
print("  membatalkan proyek, tetapi mereka bisa DIAM-DIAM")
print("  tidak memakai sistemnya -- dan itu bentuk kegagalan")
print("  yang tidak muncul di laporan mana pun.")
print("")
print("  Kesalahan lazim: seluruh perhatian diberikan ke yang")
print("  berkuasa, dan yang berminat tinggi tapi tak berkuasa")
print("  baru didengar setelah sistemnya jadi.")

# --------------------------------------------
# 7. Lingkup yang paling murah dikendalikan
# --------------------------------------------
print("")
print("--- kapan perubahan paling murah ---")
TAHAP = [
    ("Saat menyusun kebutuhan", 1),
    ("Saat merancang",          4),
    ("Saat konstruksi",        10),
    ("Saat pengujian",         25),
    ("Setelah dipakai",        60),
]
print("  " + "perubahan diminta".ljust(26) + "biaya relatif")
for nama, x in TAHAP:
    print("  " + nama.ljust(26) + ("%3d x" % x)
          + "  " + "#" * (x // 3 + 1))
print("")
print("  Angka ini perbandingan kasar, bukan hasil pengukuran")
print("  yang berlaku di semua tempat. Yang nyata ARAHNYA.")
print("")
print("  Karena itu waktu yang dihabiskan untuk memperjelas")
print("  kebutuhan di awal BUKAN penundaan -- ia investasi")
print("  dengan pengembalian terbesar di seluruh proyek.")` },
  output: `--- piagam proyek: yang harus terjawab sebelum mulai ---
  Kenapa    masalah apa yang diselesaikan, bagi siapa
  Apa       hasil yang diserahkan, dan yang TIDAK diserahkan
  Berhasil  ukuran yang bisa diperiksa, bukan 'sistem berjalan baik'
  Siapa     sponsor, manajer proyek, dan wewenangnya
  Kapan     tonggak utama, bukan jadwal rinci
  Berapa    pagu anggaran dan asumsi di baliknya

  Yang paling sering hilang: baris kedua bagian 'yang
  TIDAK diserahkan'. Tanpa itu, setiap permintaan baru
  terasa seperti sudah termasuk sejak awal.

--- kriteria keberhasilan ---
  BAIK  Sistem berjalan dengan baik
        tidak bisa diperiksa, tidak bisa gagal
  buruk Pengguna merasa puas
        puas menurut siapa, diukur bagaimana
  BAIK  Waktu proses pengajuan turun dari 9 hari jadi 2 hari
        bisa diukur, bisa gagal
  BAIK  80% pengajuan masuk lewat sistem dalam 3 bulan
        bisa diukur, bisa gagal

  Ujinya satu: bisakah kriteria ini DINYATAKAN GAGAL?
  Kalau tidak, ia bukan kriteria -- ia harapan.

--- 'tambah satu kolom saja' ---
  permintaan                          hari         biaya  kumulatif hari
  Tambah satu kolom di formulir        0.5     1.000.000              0.5
  Tambah kolom lagi (3 kolom)          1.5     3.000.000              2.0
  Ubah tata letak halaman utama        2.0     5.000.000              4.0
  Tambah satu jenis laporan            4.0    10.000.000              8.0
  Ekspor ke Excel                      2.0     5.000.000             10.0
  Kirim notifikasi WhatsApp            6.0    18.000.000             16.0
  Tambah peran pengguna baru           5.0    14.000.000             21.0
  Riwayat perubahan tiap data          7.0    20.000.000             28.0
  Dasbor grafik untuk pimpinan         8.0    25.000.000             36.0
  Login lewat akun Google              4.0    12.000.000             40.0

  TOTAL                               40.0   113.000.000

  Tidak ada satu pun permintaan di atas yang terasa
  besar. Tetapi jumlahnya 33% tambahan waktu dan 38%
  tambahan biaya -- tanpa satu pun keputusan yang
  terasa seperti memperbesar proyek.

  Inilah scope creep. Ia tidak pernah datang sebagai
  satu permintaan besar yang bisa ditolak. Ia datang
  sebagai sepuluh permintaan kecil yang semuanya
  masuk akal, satu per satu, selama berbulan-bulan.

--- setiap fitur punya biaya yang tidak diminta ---
  komponen          pengali  keterangan
  Kode                  1.0  yang dihitung di estimasi
  Pengujian             0.4  kasus uji baru + regresi
  Dokumentasi           0.2  manual pengguna, catatan teknis
  Pelatihan             0.2  menjelaskan ke pengguna
  Pemeliharaan          0.5  per tahun, selama sistem hidup

  Biaya sekali jadi   : 1.8 kali estimasi kodenya
  Ditambah pemeliharaan 0,5 kali SETIAP TAHUN

  Fitur yang diperkirakan Rp 10.000.000 sesungguhnya:
    tahun pertama  : Rp 23.000.000
    lima tahun     : Rp 43.000.000

  Angka pengali ini kasar dan berbeda tiap organisasi.
  Yang nyata BENTUKNYA: estimasi yang cuma menghitung
  waktu menulis kode selalu terlalu murah, dan makin
  terlalu murah untuk sistem yang berumur panjang.

--- prosedur pengendalian perubahan ---
  1. Permintaan ditulis, bukan lisan
  2. Dampaknya dinilai: waktu, biaya, risiko, fitur lain
  3. Diputuskan oleh yang berwenang mengubah pagu
  4. Kalau disetujui, rencana dan pagu DIPERBARUI
  5. Kalau ditolak, alasannya dicatat

  Langkah 4 yang paling sering dilewatkan. Menyetujui
  perubahan tanpa memperbarui jadwal dan anggaran
  berarti timnya diminta mengerjakan lebih banyak
  dalam waktu yang sama -- dan yang dikorbankan MUTU.

  Prosedur ini BUKAN untuk menolak perubahan.
  Perubahan itu wajar dan sering perlu. Prosedurnya
  untuk memastikan harganya terlihat sebelum disetujui.

--- petakan pemangku kepentingan ---
  pemangku                      kuasa  minat  strategi
  Kepala Bagian Akademik            3      3  kelola erat, libatkan
  Wakil Dekan (sponsor)             3      2  kelola erat, libatkan
  Bagian TIK (pemelihara)           2      3  kelola erat, libatkan
  Bagian Keuangan                   2      1  jaga tetap puas
  Auditor internal                  2      1  jaga tetap puas
  Staf yang memakai harian          1      3  beri informasi rutin
  Mahasiswa pengguna akhir          1      2  beri informasi rutin

  Perhatikan baris 'staf yang memakai harian': kuasanya
  RENDAH tapi minatnya TINGGI. Mereka tidak bisa
  membatalkan proyek, tetapi mereka bisa DIAM-DIAM
  tidak memakai sistemnya -- dan itu bentuk kegagalan
  yang tidak muncul di laporan mana pun.

  Kesalahan lazim: seluruh perhatian diberikan ke yang
  berkuasa, dan yang berminat tinggi tapi tak berkuasa
  baru didengar setelah sistemnya jadi.

--- kapan perubahan paling murah ---
  perubahan diminta         biaya relatif
  Saat menyusun kebutuhan     1 x  #
  Saat merancang              4 x  ##
  Saat konstruksi            10 x  ####
  Saat pengujian             25 x  #########
  Setelah dipakai            60 x  #####################

  Angka ini perbandingan kasar, bukan hasil pengukuran
  yang berlaku di semua tempat. Yang nyata ARAHNYA.

  Karena itu waktu yang dihabiskan untuk memperjelas
  kebutuhan di awal BUKAN penundaan -- ia investasi
  dengan pengembalian terbesar di seluruh proyek.`,

  kesalahanUmum: [
    {
      salah: 'Menulis piagam proyek tanpa menyebut apa yang TIDAK diserahkan.',
      kenapa: 'Tanpa batas yang tertulis, setiap permintaan baru terasa seperti sudah termasuk sejak awal, dan menolaknya terasa seperti ingkar janji. Perdebatannya lalu berpindah dari apa yang disepakati ke siapa yang lebih berkuasa.',
      benar: 'Tulis daftar hal yang berada di luar lingkup secara tegas, dan sepakati bersama sponsor sebelum pekerjaan dimulai.'
    },
    {
      salah: 'Menetapkan kriteria keberhasilan berupa pernyataan yang tidak bisa dinyatakan gagal.',
      kenapa: 'Kriteria seperti sistem berjalan dengan baik tidak bisa diperiksa siapa pun, sehingga keberhasilan proyek jadi soal pendapat. Di akhir proyek, pihak yang berbeda bisa sama-sama benar dengan kesimpulan yang berlawanan.',
      benar: 'Tulis kriteria dengan angka dan tenggat, lalu uji dengan bertanya apakah kriteria ini bisa dinyatakan gagal.'
    },
    {
      salah: 'Menyetujui permintaan perubahan yang kecil tanpa mencatat jumlah kumulatifnya.',
      kenapa: 'Tiap permintaan dinilai dengan membandingkannya terhadap ukuran proyek, padahal yang menentukan adalah jumlahnya terhadap semua perubahan sebelumnya. Angka kumulatif tidak ada di depan mata siapa pun, sehingga permintaan kesepuluh dinilai seolah-olah yang pertama.',
      benar: 'Catat setiap perubahan yang disetujui beserta biayanya, dan tampilkan totalnya di setiap laporan status.'
    },
    {
      salah: 'Menyetujui perubahan lingkup tanpa memperbarui jadwal dan anggaran.',
      kenapa: 'Yang terjadi bukan penambahan lingkup melainkan pemindahan biayanya ke tim, dalam bentuk kerja lembur atau mutu yang menurun. Keduanya muncul kemudian sebagai masalah lain yang penyebabnya sudah tidak terlihat.',
      benar: 'Perlakukan pemutakhiran rencana sebagai bagian yang tidak bisa dilewati dari setiap persetujuan perubahan.'
    },
    {
      salah: 'Memusatkan seluruh perhatian pada pemangku kepentingan yang paling berkuasa.',
      kenapa: 'Pihak yang kuasanya rendah tetapi minatnya tinggi, misalnya staf yang memakai sistem setiap hari, tidak bisa membatalkan proyek tetapi bisa diam-diam tidak memakainya. Kegagalan seperti ini tidak muncul di laporan mana pun: sistemnya diserahkan, ditandatangani, dan tidak dipakai.',
      benar: 'Petakan seluruh pemangku kepentingan pada dua sumbu kuasa dan minat, lalu beri kotak kuasa rendah minat tinggi jalur komunikasi tetap.'
    },
    {
      salah: 'Mengestimasi fitur hanya dari waktu menulis kodenya.',
      kenapa: 'Pengujian, dokumentasi, pelatihan, dan pemeliharaan datang bersama setiap fitur tanpa pernah diminta secara terpisah. Untuk sistem yang berumur beberapa tahun, biaya pemeliharaannya bisa melampaui biaya pembuatannya.',
      benar: 'Kalikan estimasi kodenya dengan pengali yang mencakup pengujian dan dokumentasi, lalu tambahkan pemeliharaan tahunan sesuai umur pakai yang direncanakan.'
    },
    {
      salah: 'Membuat paket kerja tanpa menetapkan kapan ia dianggap selesai.',
      kenapa: 'Tanpa definisi selesai, pernyataan modul laporan sudah selesai bisa berarti kodenya jalan, sudah teruji, atau sudah dipakai pengguna. Perbedaannya baru muncul saat serah terima, ketika memperbaikinya paling mahal.',
      benar: 'Tulis kamus WBS yang menyebut kriteria selesai tiap paket kerja, dan sepakati bersama pihak yang akan menerimanya.'
    }
  ],

  analogi: `Bayangkan kamu **membangun rumah** dengan anggaran dan tenggat yang sudah disepakati.

Rumahnya sedang dibangun. Suatu hari pemiliknya datang: *"tambah satu saklar di kamar tengah, ya."*

Satu saklar. Dua puluh ribu rupiah, setengah hari. Menolaknya akan terasa **konyol**.

Kamu setujui. Keputusanmu benar.

Pekan berikutnya: *"colokan di ruang tamu tambah dua."* Wajar. Setuju.

Lalu: *"keran taman dipindah sedikit."* Lalu: *"lampu tamannya diganti yang lebih terang."* Lalu: *"rak dapur ditambah satu tingkat."*

Sepuluh permintaan, enam bulan, semuanya kecil.

Di akhir, rumahnya **selesai tiga bulan lebih lambat** dan biayanya lebih tiga puluh persen. Pemiliknya marah.

Dan yang membuatnya sulit: **pemiliknya tidak salah.** Ia tidak pernah meminta rumah yang lebih besar. Ia meminta sepuluh hal kecil, dan tiap satunya masuk akal.

Kamu juga tidak salah. Kamu menyetujui sepuluh hal kecil, dan tiap satunya masuk akal.

**Yang salah: tidak ada yang menyimpan catatan totalnya.**

Sekarang bayangkan ada papan di depan pintu, dan setiap perubahan yang disetujui ditulis di situ beserta tambahan hari dan biayanya, **termasuk totalnya**.

Permintaan kesebelas dinilai dengan angka itu di depan mata. Percakapannya berubah dari *"boleh nggak?"* menjadi *"dari sisa jatah perubahan kita, ini yang paling penting?"*

Papan itu tidak menolak apa pun. Ia cuma **membuat harganya terlihat**.`,

  latihan: [
    'Tulis piagam proyek satu halaman untuk satu proyek nyata, lengkap dengan bagian yang tidak diserahkan.',
    'Tulis empat kriteria keberhasilan, lalu uji tiap satunya dengan pertanyaan apakah ia bisa dinyatakan gagal.',
    'Susun daftar sepuluh permintaan perubahan kecil untuk satu proyek, lalu hitung jumlah kumulatifnya terhadap ukuran proyeknya.',
    'Jelaskan kenapa setiap permintaan yang masuk akal secara terpisah bisa menghasilkan pembengkakan yang tidak pernah diputuskan siapa pun.',
    'Hitung biaya sesungguhnya satu fitur selama lima tahun dengan menyertakan pengujian, dokumentasi, pelatihan, dan pemeliharaan.',
    'Sebutkan lima langkah prosedur pengendalian perubahan, dan jelaskan akibat melewatkan langkah keempat.',
    'Petakan tujuh pemangku kepentingan satu proyek pada sumbu kuasa dan minat, lalu tentukan strategi masing-masing.',
    'Jelaskan bentuk kegagalan yang datang dari pihak berkuasa rendah tetapi berminat tinggi, dan kenapa ia tidak muncul di laporan.',
    'Tulis kamus WBS untuk tiga paket kerja, termasuk kriteria kapan tiap paket dianggap selesai.',
    'Jelaskan kenapa waktu yang dihabiskan memperjelas kebutuhan di awal bukan penundaan.'
  ]
});


TOPICS.push({
  id: 'mpi-jadwal',
  judul: 'Jadwal, Jalur Kritis & PERT',
  kategori: 'mpi',
  tag: ['CPM', 'jalur kritis', 'float', 'crashing', 'PERT', 'estimasi tiga titik'],
  ringkas: 'Jadwal resmi 49 hari, dan peluang menepatinya cuma 11 persen.',

  fungsi: `**Mengetahui kegiatan mana yang menentukan tanggal selesai, dan mana yang tidak.**

Terpakai di:

- **Menyusun jadwal** tugas akhir atau proyek
- **Menjawab permintaan** percepatan tanpa menjanjikan yang mustahil
- **Menentukan urutan** pekerjaan tim
- **Bab metodologi** — jadwal penelitian hampir selalu diminta

Yang paling sering sia-sia: **mempercepat kegiatan yang float-nya besar.**

Kegiatan dengan kelonggaran 26 hari boleh terlambat tanpa akibat apa pun. Menekan timnya untuk mempercepat itu menghasilkan **nol hari**.

Dan kaidah yang menyelamatkan reputasi: **jangan menjumlahkan durasi paling mungkin.** Sebarannya melenceng ke kanan, sehingga jadwal yang disusun begitu punya peluang ditepati jauh di bawah separuh — pada contoh di topik ini, 11 persen.`,

  praktik: {
    tujuan: `Kamu bisa menghitung jalur kritis dengan tangan dan dengan kode, dan menjanjikan tanggal beserta peluangnya.`,
    alat: [
      'Kertas untuk menggambar jaringan',
      'Python 3',
      'Daftar kegiatan proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Daftar kegiatan beserta pendahulunya',
        isi: `Untuk tiap kegiatan: durasinya, dan kegiatan mana yang **harus selesai lebih dulu**.

Kolom pendahulu inilah yang membuatnya jaringan, bukan daftar. Salah di sini membuat semua perhitungan setelahnya salah.` },
      { judul: 'Kerjakan lintasan maju dengan tangan sekali',
        isi: `- \`ES = EF terbesar dari para pendahulu\`
- \`EF = ES + durasi\`

Kerjakan urut dari kegiatan tanpa pendahulu. EF terbesar di akhir adalah durasi proyekmu.` },
      { judul: 'Kerjakan lintasan mundur',
        isi: `Mulai dari akhir, dengan LF kegiatan terakhir = durasi proyek.

- \`LF = LS terkecil dari para penerus\`
- \`LS = LF - durasi\`

Perhatikan **terkecil**, bukan terbesar. Ini yang paling sering tertukar.` },
      { judul: 'Hitung float dan temukan jalur kritisnya',
        isi: `- \`float = LS - ES\`

Kegiatan berfloat nol membentuk jalur kritis. Periksa: jumlah durasinya harus **sama** dengan durasi proyek. Kalau tidak, ada kekeliruan hitung.` },
      { judul: 'Buktikan float itu nyata',
        isi: `Untuk tiap kegiatan, percepat 3 hari lalu hitung ulang durasi proyeknya.

Kegiatan berfloat besar memberi **nol** penghematan. Melihatnya sendiri membuat kata "float" berhenti jadi istilah hafalan.` },
      { judul: 'Pangkas satu kegiatan kritis terus-menerus',
        isi: `Kurangi durasinya sedikit demi sedikit dan cetak jalur kritisnya tiap kali.

Pada satu titik, jalurnya **berpindah** dan pemangkasan selanjutnya tidak berguna. Ini kesalahan mahal yang lazim: tim terus dipaksa mempercepat kegiatan yang sudah berhenti jadi penentu.` },
      { judul: 'Lakukan crashing dengan aturan termurah',
        isi: `Untuk tiap kegiatan, tetapkan maksimal hari yang bisa dipangkas dan biaya per harinya.

Lalu pangkas satu hari sekaligus: selalu dari jalur kritis, selalu yang termurah, dan **hitung ulang jalur kritisnya setiap kali**.` },
      { judul: 'Buat estimasi tiga titik',
        isi: `Untuk tiap kegiatan kritis, minta tiga angka: optimis, paling mungkin, pesimis.

- \`te = (o + 4m + p) / 6\`
- \`ragam = ((p - o) / 6)^2\`

Jumlahkan \`te\` dan ragamnya sepanjang jalur kritis.` },
      { judul: 'Hitung peluang selesai pada beberapa tanggal',
        isi: `Dengan \`te\` dan simpangan bakunya, hitung peluang selesai pada lima tanggal berbeda.

Perhatikan peluang jadwal "resmi" yang disusun dari nilai paling mungkin. Angkanya biasanya jauh di bawah separuh.` },
      { judul: 'Cari kegiatan dengan ragam terbesar',
        isi: `Bukan yang paling panjang — yang **rentangnya paling lebar**.

Persempit rentangnya dengan purwarupa atau uji coba kecil lebih awal. Itu tidak memperpendek jadwalnya; ia membuat janjinya **bisa dipegang**.` }
    ],
    cek: [
      'Jumlah durasi jalur kritismu sama dengan durasi proyeknya',
      `Kamu sudah melihat sendiri jalur kritis berpindah saat satu kegiatan dipangkas cukup banyak`,
      'Janji tanggalmu disertai tingkat keyakinan, bukan angka tunggal'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa jadwal lebih sering terlambat daripada cepat',

  konsep: `
Sebuah proyek bukan daftar pekerjaan berurutan. Ia **jaringan**: sebagian kegiatan harus menunggu yang lain, sebagian bisa berjalan bersamaan. Bentuk jaringan itulah yang menentukan berapa lama proyeknya, bukan jumlah pekerjaannya.

**Critical Path Method**

Dari daftar kegiatan beserta durasi dan pendahulunya, empat angka dihitung untuk tiap kegiatan:

- **ES** — paling awal bisa mulai
- **EF** — paling awal bisa selesai
- **LS** — paling lambat boleh mulai
- **LF** — paling lambat boleh selesai

Dua lintasan:

- **maju** — dari awal, \`ES = EF terbesar dari para pendahulu\`, lalu \`EF = ES + durasi\`
- **mundur** — dari akhir, \`LF = LS terkecil dari para penerus\`, lalu \`LS = LF - durasi\`

**Float** = \`LS - ES\`. Ia berapa lama kegiatan itu boleh terlambat **tanpa memperlambat proyek**.

**Jalur kritis** adalah rangkaian kegiatan yang float-nya nol. Panjangnya sama dengan durasi proyek, dan setiap kegiatan di dalamnya, kalau terlambat sehari, **memperlambat proyek sehari**.

**Apa yang diberikan float**

Ini kegunaan CPM yang paling langsung dan paling sering dilewatkan.

Kegiatan yang float-nya besar boleh terlambat, boleh dipindah, boleh diberi orang yang lebih sedikit. Mempercepatnya **tidak memberi penghematan apa pun**.

Kalau pelatihan pengguna punya float 26 hari, memaksa timnya menyelesaikannya lebih cepat adalah tekanan yang **tidak menghasilkan apa-apa**.

**Crashing: memperpendek dengan biaya**

Kalau proyek harus lebih cepat, ada dua cara: **crashing** (menambah sumber daya) dan **fast tracking** (menjalankan kegiatan yang tadinya berurutan secara bersamaan — lebih murah, tetapi menambah risiko pengerjaan ulang).

Aturan crashing:

- pangkas hanya dari **jalur kritis**
- pilih yang **termurah per hari**
- setelah setiap pemangkasan, **hitung ulang jalur kritisnya**

Langkah ketiga yang paling sering dilanggar. Jalur kritis **berpindah**: setelah satu kegiatan dipangkas cukup banyak, jalur lain menjadi penentu, dan meneruskan pemangkasan di jalur lama **sia-sia sepenuhnya**.

**Estimasi tiga titik**

Durasi bukan satu angka. PERT memintanya tiga:

- **o** — optimis
- **m** — paling mungkin
- **p** — pesimis

\`te = (o + 4m + p) / 6\` dan \`ragam = ((p - o) / 6)^2\`

Durasi harapan jalur kritis adalah jumlah \`te\`-nya; ragamnya jumlah ragam. Simpangan bakunya akar dari itu.

**Kenapa proyek lebih sering terlambat**

Karena sebarannya **melenceng ke kanan**. Yang bisa membuat lebih cepat sedikit; yang bisa membuat terlambat banyak.

Kalau estimasi paling mungkin 15 hari, optimisnya mungkin 11 — hemat 4. Tetapi pesimisnya 25 — molor 10. Ketimpangan itu berlaku di hampir setiap kegiatan, dan **menumpuk** di sepanjang jalur kritis.

Akibatnya: jadwal yang disusun dari durasi **paling mungkin** punya peluang ditepati jauh di bawah lima puluh persen. Bukan karena timnya lambat, melainkan karena angka yang dipakai memang bukan angka yang setengah kemungkinannya tercapai.

**Menjanjikan tanggal dengan peluang yang disebut**

Dari \`te\` dan simpangan bakunya, peluang selesai pada tanggal apa pun bisa dihitung. Yang berguna dari ini: kamu bisa berjanji dengan **tingkat keyakinan yang dinyatakan**.

Bukan *"selesai 49 hari"*, melainkan *"85 persen kemungkinan selesai dalam 60 hari"*. Yang kedua bisa dipertanggungjawabkan; yang pertama tidak.

**Batasnya**

CPM mengandaikan durasi kegiatan **saling bebas**, dan itu sering tidak benar — kalau timnya kelelahan, semua kegiatan melambat bersamaan. PERT juga hanya melihat **satu** jalur kritis, padahal jalur lain yang hampir kritis bisa menjadi penentu kalau kebetulan melambat.

Untuk proyek yang jalurnya banyak dan berdekatan panjangnya, simulasi lebih tepat daripada rumus PERT.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# JADWAL "RESMI" 49 HARI, PELUANGNYA 11%\n#\n# Estimasi tiga titik di sepanjang jalur kritis:\n#\n#   id   opt  mungkin   pes   harapan   ragam\n#    A     7       10    19     11.00    4.00\n#    B     6        8    16      9.00    2.78\n#    D    11       15    25     16.00    5.44\n#    F     3        5    13      6.00    2.78\n#    G     5        8    17      9.00    4.00\n#    J     2        3     7      3.50    0.69\n#\n# Jumlah "paling mungkin" : 49 hari\n# Jumlah "harapan"        : 54.5 hari\n# Simpangan baku          : 4.44 hari\n#\n# P(selesai <= 49) = 11%\n# P(selesai <= 60) = 85%\n#\n# Sebarannya MELENCENG: optimis hemat sedikit,\n# pesimis molor banyak.',
      penjelasan: `
Kenapa proyek hampir selalu terlambat, dan hampir tidak pernah lebih cepat? Jawabannya bukan tentang kemampuan tim. Ia sudah ada di dalam **angka estimasinya sendiri**, sebelum satu hari pun dikerjakan.

Lihat kegiatan D: konstruksi modul inti. Optimis 11 hari, paling mungkin 15, pesimis 25.

Sekarang ukur **jaraknya dari nilai tengah**:

- ke sisi optimis: \`15 - 11 = 4\` hari
- ke sisi pesimis: \`25 - 15 = 10\` hari

Tidak setangkup. Sisi buruknya **dua setengah kali lebih jauh**.

Dan ketimpangan itu bukan kebetulan pada kegiatan ini — ia berlaku di hampir semua pekerjaan. Alasannya bisa dipikirkan sampai tuntas.

Ada **batas** seberapa cepat pekerjaan bisa selesai. Kode harus ditulis, diperiksa, dijalankan. Kalau semuanya berjalan sempurna, kamu hemat beberapa hari — dan itu **plafonnya**.

Tetapi **tidak ada batas** seberapa lambat. Satu orang sakit. Kebutuhannya ternyata dipahami berbeda. Pustaka yang dipakai punya bug. Integrasinya lebih sulit. Data lamanya kotor. Semuanya bisa terjadi, dan **bisa terjadi bersamaan**.

Peluang terbaik terbatas. Peluang terburuk tidak. Itulah bentuk sebaran yang **melenceng ke kanan**.

Sekarang lihat apa yang terjadi ketika ketimpangan ini menumpuk sepanjang jalur.

Jumlah durasi **paling mungkin** memberi **49 hari** — dan angka inilah yang biasanya masuk ke dokumen resmi, karena ia yang terasa paling wajar.

Tetapi jumlah durasi **harapan** memberi **54,5 hari**. Selisihnya 5,5 hari, dan selisih itu datang seluruhnya dari kelencengan tadi.

Sekarang hitung peluangnya. Dengan simpangan baku 4,44 hari, target 49 hari berada **1,24 simpangan baku di bawah** nilai harapan. Peluang mencapainya: **11 persen**.

Jadwal resmi yang disusun dengan niat baik, dari angka yang paling wajar, ternyata punya peluang sekitar satu dari sembilan untuk ditepati.

Dan perhatikan: **tidak ada yang berbuat salah** untuk menghasilkan angka itu. Tidak ada yang terlalu optimis, tidak ada yang malas. Yang terjadi cuma satu — nilai "paling mungkin" dijumlahkan seolah-olah ia nilai tengah, padahal ia bukan.

Dari sini muncul tiga hal yang bisa langsung dipakai.

**Pertama, jangan menjumlahkan nilai paling mungkin.** Hitung \`te\` untuk tiap kegiatan lebih dulu, baru dijumlahkan. Perbedaannya bukan tipis.

**Kedua, sebutkan tingkat keyakinan bersama tanggalnya.** Bukan *"selesai 49 hari"*, melainkan *"85 persen kemungkinan selesai dalam 60 hari"*. Yang pertama akan diingat sebagai janji dan dilanggar; yang kedua bisa dipertanggungjawabkan, dan menunjukkan kamu tahu apa yang kamu tidak tahu.

**Ketiga, dan yang paling sering terlewat: rentang pesimis-optimis yang LEBAR adalah informasi.** Ragamnya \`((p-o)/6)^2\`, jadi kegiatan yang rentangnya lebar menyumbang ketidakpastian paling banyak.

Lihat kolom ragam: D menyumbang 5,44 — paling besar. Kalau kamu ingin jadwalnya lebih bisa diandalkan, yang paling berhasil bukan mempercepat kegiatan **terpanjang**, melainkan **mengurangi ketidakpastian** kegiatan yang rentangnya paling lebar.

Caranya: purwarupa, uji coba kecil, atau riset teknis lebih awal. Semuanya tidak memperpendek jadwalnya — mereka **mempersempit rentangnya**, dan itu yang membuat janjinya bisa dipegang.

Satu peringatan terakhir. Perhitungan ini hanya melihat **satu** jalur kritis. Kalau ada jalur lain yang panjangnya berdekatan, ia bisa menjadi penentu kalau kebetulan melambat — dan itu membuat durasi nyatanya **lebih buruk** daripada yang dihitung PERT, bukan lebih baik. Untuk proyek dengan banyak jalur berdekatan, jalankan simulasi.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Jalur kritis (CPM) & estimasi tiga titik (PERT)
# ============================================
import math

# --------------------------------------------
# 1. Jaringan kegiatan satu proyek SI
# --------------------------------------------
# id: (nama, durasi hari, daftar pendahulu)
KEGIATAN = {
    "A": ("Analisis kebutuhan",     10, []),
    "B": ("Rancang basis data",      8, ["A"]),
    "C": ("Rancang antarmuka",       6, ["A"]),
    "D": ("Konstruksi modul inti",  15, ["B"]),
    "E": ("Konstruksi antarmuka",   12, ["C"]),
    "F": ("Integrasi",               5, ["D", "E"]),
    "G": ("Pengujian sistem",        8, ["F"]),
    "H": ("Pelatihan pengguna",      4, ["C"]),
    "I": ("Migrasi data",            6, ["B"]),
    "J": ("Penerapan",               3, ["G", "H", "I"]),
}

def penerus(keg):
    """Siapa yang menunggu kegiatan ini selesai."""
    hasil = {k: [] for k in keg}
    for k, (_, _, pre) in keg.items():
        for p in pre:
            hasil[p].append(k)
    return hasil

def urut_topologis(keg):
    sisa = {k: set(v[2]) for k, v in keg.items()}
    keluar = []
    while sisa:
        siap = sorted(k for k, p in sisa.items() if not p)
        if not siap:
            raise ValueError("ada lingkaran ketergantungan")
        for k in siap:
            keluar.append(k)
            del sisa[k]
        for p in sisa.values():
            p -= set(siap)
    return keluar

def cpm(keg):
    urut = urut_topologis(keg)
    nxt = penerus(keg)
    ES, EF = {}, {}
    for k in urut:                       # maju
        _, d, pre = keg[k]
        ES[k] = max((EF[p] for p in pre), default=0)
        EF[k] = ES[k] + d
    durasi = max(EF.values())
    LS, LF = {}, {}
    for k in reversed(urut):             # mundur
        _, d, _ = keg[k]
        LF[k] = min((LS[s] for s in nxt[k]), default=durasi)
        LS[k] = LF[k] - d
    float_ = {k: LS[k] - ES[k] for k in keg}
    return durasi, ES, EF, LS, LF, float_

durasi, ES, EF, LS, LF, FL = cpm(KEGIATAN)

print("--- jaringan kegiatan ---")
print("  " + "id".ljust(4) + "kegiatan".ljust(24) + "durasi".rjust(7)
      + "  pendahulu")
for k in sorted(KEGIATAN):
    nama, d, pre = KEGIATAN[k]
    print("  " + k.ljust(4) + nama.ljust(24) + str(d).rjust(7)
          + "  " + (", ".join(pre) if pre else "-"))

print("")
print("--- lintasan maju & mundur ---")
print("  " + "id".ljust(4) + "ES".rjust(5) + "EF".rjust(5)
      + "LS".rjust(6) + "LF".rjust(5) + "float".rjust(8) + "  status")
for k in sorted(KEGIATAN):
    kritis = "KRITIS" if FL[k] == 0 else ""
    print("  " + k.ljust(4) + str(ES[k]).rjust(5) + str(EF[k]).rjust(5)
          + str(LS[k]).rjust(6) + str(LF[k]).rjust(5)
          + str(FL[k]).rjust(8) + "  " + kritis)

jalur = [k for k in urut_topologis(KEGIATAN) if FL[k] == 0]
print("")
print("  durasi proyek : " + str(durasi) + " hari")
print("  jalur kritis  : " + " -> ".join(jalur))
print("  jumlah durasi : "
      + " + ".join(str(KEGIATAN[k][1]) for k in jalur)
      + " = " + str(sum(KEGIATAN[k][1] for k in jalur)))

# --------------------------------------------
# 2. Float memberi tahu apa yang boleh terlambat
# --------------------------------------------
print("")
print("--- apa arti float ---")
for k in sorted(KEGIATAN, key=lambda x: -FL[x])[:4]:
    nama = KEGIATAN[k][0]
    if FL[k] == 0:
        print("  " + k + " " + nama.ljust(24)
              + "terlambat 1 hari -> PROYEK ikut terlambat")
    else:
        print("  " + k + " " + nama.ljust(24)
              + "boleh terlambat " + str(FL[k]) + " hari tanpa akibat")

# --------------------------------------------
# 3. Mempercepat kegiatan yang salah = tidak berguna
# --------------------------------------------
print("")
print("--- percepat satu kegiatan 3 hari, apa akibatnya? ---")
print("  " + "id".ljust(4) + "kegiatan".ljust(24)
      + "durasi baru".rjust(13) + "hemat".rjust(8))
for k in sorted(KEGIATAN):
    coba = dict(KEGIATAN)
    nama, d, pre = coba[k]
    coba[k] = (nama, max(1, d - 3), pre)
    baru = cpm(coba)[0]
    print("  " + k.ljust(4) + nama.ljust(24)
          + str(baru).rjust(13) + str(durasi - baru).rjust(8))
print("")
print("  Kegiatan yang float-nya besar TIDAK memberi penghematan")
print("  apa pun. Mempercepat pelatihan pengguna 3 hari sama")
print("  sekali tidak memperpendek proyek -- ia sudah punya")
print("  banyak kelonggaran.")
print("")
print("  J cuma hemat 2 hari karena durasinya sendiri 3 hari --")
print("  ia tidak bisa dipangkas 3 hari penuh.")

# --------------------------------------------
# 3b. Hasil pemangkasan MENURUN, karena jalurnya berpindah
# --------------------------------------------
print("")
print("--- pangkas D terus-menerus, lihat hematnya berhenti ---")
print("  " + "durasi D".rjust(9) + "durasi proyek".rjust(15)
      + "hemat".rjust(8) + "  jalur kritis")
for baru_d in (15, 13, 11, 9, 7, 5):
    coba = dict(KEGIATAN)
    nama, _, pre = coba["D"]
    coba["D"] = (nama, baru_d, pre)
    dd, _, _, _, _, ff = cpm(coba)
    jl = [k for k in urut_topologis(coba) if ff[k] == 0]
    print("  " + str(baru_d).rjust(9) + str(dd).rjust(15)
          + str(durasi - dd).rjust(8) + "  " + "->".join(jl))
print("")
print("  Berhenti di 44 hari. Setelah D dipangkas 6 hari, jalur")
print("  kritisnya BERPINDAH dari A-B-D ke A-C-E, dan memangkas")
print("  D lebih lanjut tidak berguna sama sekali.")
print("")
print("  Ini kesalahan mahal yang lazim: tim terus dipaksa")
print("  mempercepat kegiatan yang sudah berhenti jadi penentu.")

# --------------------------------------------
# 4. Crashing: berapa biaya memperpendek proyek
# --------------------------------------------
print("")
print("--- crashing: memperpendek dengan biaya ---")
# id: (maksimal hari bisa dipangkas, biaya per hari)
CRASH = {
    "A": (2,  4_000_000), "B": (3,  2_500_000), "D": (5,  3_000_000),
    "F": (2,  6_000_000), "G": (3,  2_000_000), "J": (1,  8_000_000),
    "C": (2,  2_000_000), "E": (4,  2_200_000), "H": (2,  1_000_000),
    "I": (2,  1_500_000),
}
keg = dict(KEGIATAN)
total_biaya = 0
target = 42
print("  target: dari " + str(durasi) + " hari menjadi "
      + str(target) + " hari")
print("")
print("  " + "langkah".rjust(8) + "  dipangkas".ljust(13)
      + "durasi".rjust(8) + "biaya langkah".rjust(16)
      + "kumulatif".rjust(14))
langkah = 0
while True:
    d_now = cpm(keg)[0]
    if d_now <= target:
        break
    fl = cpm(keg)[5]
    # calon: kegiatan kritis yang masih bisa dipangkas
    calon = []
    for k in keg:
        if fl[k] != 0:
            continue
        maks, per_hari = CRASH[k]
        dipakai = KEGIATAN[k][1] - keg[k][1]
        if dipakai < maks:
            calon.append((per_hari, k))
    if not calon:
        print("  tidak ada lagi yang bisa dipangkas")
        break
    per_hari, k = min(calon)
    nama, d, pre = keg[k]
    keg[k] = (nama, d - 1, pre)
    total_biaya += per_hari
    langkah += 1
    print("  " + str(langkah).rjust(8) + "  " + (k + " " + nama[:9]).ljust(13)
          + str(cpm(keg)[0]).rjust(8)
          + f"{per_hari:>16,}".replace(",", ".")
          + f"{total_biaya:>14,}".replace(",", "."))

print("")
print("  Selalu pangkas dari JALUR KRITIS, dan selalu yang")
print("  TERMURAH per hari. Setelah tiap pemangkasan, hitung")
print("  ulang jalur kritisnya -- ia bisa berpindah, dan")
print("  meneruskan pemangkasan di jalur lama jadi sia-sia.")

# --------------------------------------------
# 5. PERT: durasi tidak pernah satu angka
# --------------------------------------------
print("")
print("--- estimasi tiga titik (PERT) ---")
# id: (optimis, paling mungkin, pesimis)
TIGA = {
    "A": (7, 10, 19), "B": (6,  8, 16), "D": (11, 15, 25),
    "F": (3,  5, 13), "G": (5,  8, 17), "J": (2,  3,  7),
}
print("  " + "id".ljust(4) + "opt".rjust(5) + "mungkin".rjust(9)
      + "pes".rjust(6) + "harapan".rjust(10) + "ragam".rjust(9))
total_te, total_var = 0.0, 0.0
for k in ("A", "B", "D", "F", "G", "J"):
    o, m, p = TIGA[k]
    te = (o + 4 * m + p) / 6
    var = ((p - o) / 6) ** 2
    total_te += te
    total_var += var
    print("  " + k.ljust(4) + str(o).rjust(5) + str(m).rjust(9)
          + str(p).rjust(6) + ("%.2f" % te).rjust(10)
          + ("%.2f" % var).rjust(9))
sd = math.sqrt(total_var)
print("")
print("  durasi harapan jalur kritis : " + ("%.2f" % total_te) + " hari")
print("  simpangan baku              : " + ("%.2f" % sd) + " hari")

def fkk(z):
    return 0.5 * (1 + math.erf(z / math.sqrt(2)))

print("")
print("--- peluang selesai pada tanggal tertentu ---")
print("  " + "target".rjust(8) + "z".rjust(8) + "peluang selesai".rjust(18))
for t in (49, 52, 55, 58, 61):
    z = (t - total_te) / sd
    print("  " + str(t).rjust(8) + ("%+.2f" % z).rjust(8)
          + ("%.1f%%" % (fkk(z) * 100)).rjust(18))
print("")
print("  Perhatikan baris pertama. Jadwal 'resmi' 49 hari yang")
print("  dihitung dari durasi paling mungkin cuma punya peluang")
print("  " + ("%.0f%%" % (fkk((49 - total_te) / sd) * 100))
      + " ditepati -- karena estimasi pesimisnya jauh lebih")
print("  jauh dari nilai tengah daripada estimasi optimisnya.")
print("")
print("  Itulah sebab proyek lebih sering terlambat daripada")
print("  lebih cepat. Bukan karena orangnya lambat, melainkan")
print("  karena bentuk sebarannya MELENCENG KE KANAN: yang bisa")
print("  membuat lebih cepat sedikit, yang bisa membuat")
print("  terlambat banyak.")
print("")
print("  Untuk berjanji dengan peluang 85%, sebutkan "
      + str(math.ceil(total_te + 1.036 * sd)) + " hari,")
print("  bukan " + str(durasi) + " hari.")` },
  output: `--- jaringan kegiatan ---
  id  kegiatan                 durasi  pendahulu
  A   Analisis kebutuhan           10  -
  B   Rancang basis data            8  A
  C   Rancang antarmuka             6  A
  D   Konstruksi modul inti        15  B
  E   Konstruksi antarmuka         12  C
  F   Integrasi                     5  D, E
  G   Pengujian sistem              8  F
  H   Pelatihan pengguna            4  C
  I   Migrasi data                  6  B
  J   Penerapan                     3  G, H, I

--- lintasan maju & mundur ---
  id     ES   EF    LS   LF   float  status
  A       0   10     0   10       0  KRITIS
  B      10   18    10   18       0  KRITIS
  C      10   16    15   21       5  
  D      18   33    18   33       0  KRITIS
  E      16   28    21   33       5  
  F      33   38    33   38       0  KRITIS
  G      38   46    38   46       0  KRITIS
  H      16   20    42   46      26  
  I      18   24    40   46      22  
  J      46   49    46   49       0  KRITIS

  durasi proyek : 49 hari
  jalur kritis  : A -> B -> D -> F -> G -> J
  jumlah durasi : 10 + 8 + 15 + 5 + 8 + 3 = 49

--- apa arti float ---
  H Pelatihan pengguna      boleh terlambat 26 hari tanpa akibat
  I Migrasi data            boleh terlambat 22 hari tanpa akibat
  C Rancang antarmuka       boleh terlambat 5 hari tanpa akibat
  E Konstruksi antarmuka    boleh terlambat 5 hari tanpa akibat

--- percepat satu kegiatan 3 hari, apa akibatnya? ---
  id  kegiatan                  durasi baru   hemat
  A   Analisis kebutuhan                 46       3
  B   Rancang basis data                 46       3
  C   Rancang antarmuka                  49       0
  D   Konstruksi modul inti              46       3
  E   Konstruksi antarmuka               49       0
  F   Integrasi                          46       3
  G   Pengujian sistem                   46       3
  H   Pelatihan pengguna                 49       0
  I   Migrasi data                       49       0
  J   Penerapan                          47       2

  Kegiatan yang float-nya besar TIDAK memberi penghematan
  apa pun. Mempercepat pelatihan pengguna 3 hari sama
  sekali tidak memperpendek proyek -- ia sudah punya
  banyak kelonggaran.

  J cuma hemat 2 hari karena durasinya sendiri 3 hari --
  ia tidak bisa dipangkas 3 hari penuh.

--- pangkas D terus-menerus, lihat hematnya berhenti ---
   durasi D  durasi proyek   hemat  jalur kritis
         15             49       0  A->B->D->F->G->J
         13             47       2  A->B->D->F->G->J
         11             45       4  A->B->D->F->G->J
          9             44       5  A->C->E->F->G->J
          7             44       5  A->C->E->F->G->J
          5             44       5  A->C->E->F->G->J

  Berhenti di 44 hari. Setelah D dipangkas 6 hari, jalur
  kritisnya BERPINDAH dari A-B-D ke A-C-E, dan memangkas
  D lebih lanjut tidak berguna sama sekali.

  Ini kesalahan mahal yang lazim: tim terus dipaksa
  mempercepat kegiatan yang sudah berhenti jadi penentu.

--- crashing: memperpendek dengan biaya ---
  target: dari 49 hari menjadi 42 hari

   langkah  dipangkas    durasi   biaya langkah     kumulatif
         1  G Pengujian        48       2.000.000     2.000.000
         2  G Pengujian        47       2.000.000     4.000.000
         3  G Pengujian        46       2.000.000     6.000.000
         4  B Rancang b        45       2.500.000     8.500.000
         5  B Rancang b        44       2.500.000    11.000.000
         6  B Rancang b        43       2.500.000    13.500.000
         7  D Konstruks        42       3.000.000    16.500.000

  Selalu pangkas dari JALUR KRITIS, dan selalu yang
  TERMURAH per hari. Setelah tiap pemangkasan, hitung
  ulang jalur kritisnya -- ia bisa berpindah, dan
  meneruskan pemangkasan di jalur lama jadi sia-sia.

--- estimasi tiga titik (PERT) ---
  id    opt  mungkin   pes   harapan    ragam
  A       7       10    19     11.00     4.00
  B       6        8    16      9.00     2.78
  D      11       15    25     16.00     5.44
  F       3        5    13      6.00     2.78
  G       5        8    17      9.00     4.00
  J       2        3     7      3.50     0.69

  durasi harapan jalur kritis : 54.50 hari
  simpangan baku              : 4.44 hari

--- peluang selesai pada tanggal tertentu ---
    target       z   peluang selesai
        49   -1.24             10.8%
        52   -0.56             28.7%
        55   +0.11             54.5%
        58   +0.79             78.5%
        61   +1.46             92.8%

  Perhatikan baris pertama. Jadwal 'resmi' 49 hari yang
  dihitung dari durasi paling mungkin cuma punya peluang
  11% ditepati -- karena estimasi pesimisnya jauh lebih
  jauh dari nilai tengah daripada estimasi optimisnya.

  Itulah sebab proyek lebih sering terlambat daripada
  lebih cepat. Bukan karena orangnya lambat, melainkan
  karena bentuk sebarannya MELENCENG KE KANAN: yang bisa
  membuat lebih cepat sedikit, yang bisa membuat
  terlambat banyak.

  Untuk berjanji dengan peluang 85%, sebutkan 60 hari,
  bukan 49 hari.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Lintasan maju (ES/EF)', waktu: 'O(V + E)', memori: 'sekali telusuri urutan topologis' },
      { operasi: 'Lintasan mundur (LS/LF)', waktu: 'O(V + E)', memori: 'urutan topologis dibalik' },
      { operasi: 'Cari jalur kritis', waktu: 'O(V)', memori: 'pilih yang float-nya nol' },
      { operasi: 'Crashing sampai target', waktu: 'O(k(V + E))', memori: 'k = jumlah hari yang dipangkas' },
      { operasi: 'Simulasi Monte Carlo', waktu: 'O(n(V + E))', memori: 'n = jumlah putaran' }
    ],
    intuisi: `CPM murah sekali: dua kali telusuri jaringan, dan \`O(V + E)\` berarti proyek dengan ribuan kegiatan pun selesai seketika. Tidak ada alasan menghitungnya dengan tangan atau hanya sekali.

Yang mahal **crashing**, karena jalur kritisnya harus dihitung ulang setiap kali satu hari dipangkas. Tetapi \`k\` biasanya kecil — puluhan hari, bukan ribuan — jadi ia tetap murah dalam praktik.

Karena murahnya, hitung ulang jadwalnya **setiap kali ada durasi yang berubah**. Jadwal yang cuma dihitung sekali di awal proyek berhenti menggambarkan apa pun setelah pekan kedua.`
  },

  kesalahanUmum: [
    {
      salah: 'Mempercepat kegiatan yang float-nya besar demi mengejar jadwal.',
      kenapa: 'Kegiatan dengan float boleh terlambat tanpa memperlambat proyek, sehingga mempercepatnya tidak memberi penghematan apa pun. Tekanan yang diberikan ke tim yang mengerjakannya menghasilkan nol hari.',
      benar: 'Hitung float tiap kegiatan lebih dulu, lalu arahkan seluruh usaha percepatan hanya ke jalur kritis.'
    },
    {
      salah: 'Meneruskan pemangkasan satu kegiatan kritis tanpa menghitung ulang jalur kritisnya.',
      kenapa: 'Setelah dipangkas cukup banyak, jalur lain menjadi penentu dan kegiatan itu berhenti kritis. Pemangkasan selanjutnya tidak memperpendek proyek sama sekali, sementara biaya dan tekanannya tetap dibayar.',
      benar: 'Hitung ulang jalur kritis setelah setiap satu hari dipangkas, dan pindahkan pemangkasan ke jalur yang baru menjadi penentu.'
    },
    {
      salah: 'Menjumlahkan durasi paling mungkin untuk mendapat durasi proyek.',
      kenapa: 'Nilai paling mungkin bukan nilai tengah, karena sebaran durasi melenceng ke kanan: sisi optimis terbatas sementara sisi pesimis tidak. Jumlah nilai paling mungkin karenanya punya peluang ditepati jauh di bawah separuh.',
      benar: 'Hitung durasi harapan tiap kegiatan dengan rumus tiga titik lebih dulu, baru dijumlahkan.'
    },
    {
      salah: 'Menyebut tanggal selesai tanpa menyebut tingkat keyakinannya.',
      kenapa: 'Tanggal tunggal akan diingat sebagai janji, padahal ia hanya satu titik pada sebaran yang lebar. Ketika terlampaui, yang dipersoalkan kinerja tim, bukan cara jadwalnya disusun.',
      benar: 'Sebutkan tanggal beserta peluangnya, misalnya delapan puluh lima persen kemungkinan selesai dalam enam puluh hari.'
    },
    {
      salah: 'Mengurangi ketidakpastian jadwal dengan mempercepat kegiatan yang paling panjang.',
      kenapa: 'Ketidakpastian berasal dari lebarnya rentang optimis sampai pesimis, bukan dari panjang durasinya. Kegiatan panjang yang durasinya bisa diperkirakan dengan baik tidak menyumbang ketidakpastian, sementara kegiatan pendek yang rentangnya lebar menyumbang banyak.',
      benar: 'Cari kegiatan dengan ragam terbesar, lalu persempit rentangnya lewat purwarupa atau uji coba kecil lebih awal.'
    },
    {
      salah: 'Menghitung jadwal sekali di awal lalu memakainya sepanjang proyek.',
      kenapa: 'CPM hanya berbiaya dua kali telusuri jaringan sehingga sangat murah dihitung ulang. Jadwal yang tidak diperbarui berhenti menggambarkan keadaan setelah durasi pertama berubah, dan jalur kritisnya bisa sudah berpindah tanpa ada yang tahu.',
      benar: 'Hitung ulang seluruh jadwal setiap kali ada durasi yang berubah, dan periksa apakah jalur kritisnya berpindah.'
    },
    {
      salah: 'Mengandaikan PERT sudah mencakup seluruh risiko jadwal.',
      kenapa: 'Rumus PERT hanya menghitung satu jalur kritis dan mengandaikan durasi kegiatan saling bebas. Jalur lain yang panjangnya berdekatan bisa menjadi penentu bila kebetulan melambat, sehingga durasi nyatanya lebih buruk daripada yang dihitung, bukan lebih baik.',
      benar: 'Untuk proyek dengan banyak jalur yang panjangnya berdekatan, jalankan simulasi alih-alih memakai rumus PERT saja.'
    }
  ],

  analogi: `Bayangkan **memasak untuk acara**, dan kamu punya banyak tangan.

Nasi harus matang sebelum bisa dihidangkan. Ayam harus dibumbui sebelum digoreng. Tetapi sambal bisa dibuat kapan saja, dan es bisa diambil dari kulkas satu menit sebelum tamu datang.

Kalau seluruhnya butuh 90 menit, itu **bukan** karena semua pekerjaan dijumlahkan. Itu karena satu **rangkaian tertentu** — beli ayam, bumbui, diamkan, goreng, tiriskan — panjangnya 90 menit, dan tidak ada satu pun langkahnya bisa dilewati atau dijalankan bersamaan.

Itu jalur kritisnya.

Sekarang tamu meminta lebih cepat. Kamu punya sepuluh tangan tambahan.

Naluri pertama: suruh mereka **membuat sambal lebih cepat**. Tapi sambal punya kelonggaran satu jam — mempercepatnya tidak mengubah apa pun. Sepuluh orang mengaduk sambal, dan acara tetap mulai 90 menit lagi.

Yang berpengaruh cuma memperpendek **rangkaian ayamnya**. Beli di tempat yang lebih dekat. Beli yang sudah dipotong. Pakai dua wajan.

Dan di sini bagian yang sering terlewat: kalau kamu memangkas rangkaian ayam sampai jadi 50 menit, mungkin **nasinya** yang sekarang jadi penentu — ia butuh 55 menit dan tidak bisa dipercepat. Meneruskan mempercepat ayam sesudah itu **tidak ada gunanya**.

Terakhir, soal janji. Kalau ditanya kapan siap, jawaban *"90 menit"* diambil dari perkiraan yang paling wajar untuk tiap langkah.

Tapi pikirkan: paling cepat berapa? Mungkin 80 menit, kalau semuanya lancar. Paling lambat? Bisa **130 menit** — pasar tutup, gas habis, ayamnya keras.

Jadi "90 menit" bukan setengah kemungkinan. Ia sudah termasuk optimis.

Yang jujur: *"kira-kira 100 menit, dan hampir pasti sebelum 120."*`,

  latihan: [
    'Susun jaringan sepuluh kegiatan untuk satu proyek, lalu hitung ES, EF, LS, LF, dan float tiap kegiatan dengan tangan.',
    'Tentukan jalur kritisnya, lalu buktikan panjangnya sama dengan durasi proyek.',
    'Untuk tiap kegiatan, hitung penghematan bila ia dipercepat tiga hari, lalu jelaskan kenapa sebagian memberi nol.',
    'Pangkas satu kegiatan kritis terus-menerus, dan tunjukkan pada pemangkasan ke berapa jalur kritisnya berpindah.',
    'Lakukan crashing sampai target tertentu dengan aturan termurah per hari, dan hitung total biayanya.',
    'Jelaskan beda crashing dan fast tracking, beserta risiko masing-masing.',
    'Buat estimasi tiga titik untuk enam kegiatan, lalu hitung durasi harapan dan simpangan baku jalur kritisnya.',
    'Hitung peluang selesai pada lima tanggal berbeda, lalu tentukan tanggal untuk keyakinan delapan puluh lima persen.',
    'Jelaskan kenapa sebaran durasi melenceng ke kanan, dengan alasan bukan contoh.',
    'Cari kegiatan dengan ragam terbesar di jaringanmu, lalu usulkan satu cara mempersempit rentangnya.'
  ]
});


TOPICS.push({
  id: 'mpi-risiko',
  judul: 'Manajemen Risiko Proyek',
  kategori: 'mpi',
  tag: ['daftar risiko', 'EMV', 'matriks peluang dampak', 'mitigasi', 'cadangan kontinjensi', 'Monte Carlo'],
  ringkas: 'Cadangan sebesar nilai harapan cuma cukup pada 57 persen kemungkinan.',

  fungsi: `**Menyiapkan diri untuk hal yang belum terjadi, dengan angka.**

Terpakai di:

- **Bab risiko** pada proposal proyek atau tugas akhir
- **Menentukan besar cadangan** waktu dan biaya
- **Memutuskan** apakah pencegahan sepadan dengan biayanya
- **Menjelaskan** ke sponsor kenapa cadangannya sebesar itu

Kesalahan yang paling sering: **cadangan sebesar nilai harapan.**

Sebaran biaya risiko melenceng ke kanan, sehingga cadangan sebesar EMV cuma cukup pada sekitar 57 persen kemungkinan — dua dari lima kali kamu harus meminta tambahan di tengah proyek.

Dan kaidah yang memisahkan penanganan: **risiko berpeluang tinggi diurus dengan proses; risiko berdampak besar diurus dengan pencegahan.** EMV meratakan keduanya jadi satu angka, dan itu menyembunyikan perbedaannya.`,

  praktik: {
    tujuan: `Kamu punya daftar risiko yang berpemilik, cadangan yang dihitung dari persentil, dan alasan yang bisa disebutkan.`,
    alat: [
      'Spreadsheet atau Python',
      'Proyek nyata untuk dianalisis'
    ],
    langkah: [
      { judul: 'Kumpulkan risiko dari orang, bukan dari kepalamu sendiri',
        isi: `Tanyakan ke tim dan ke orang yang pernah mengerjakan proyek serupa: **apa yang dulu tidak berjalan sesuai rencana?**

Pengalaman orang lain jauh lebih kaya daripada dugaan sendiri, dan gratis.` },
      { judul: 'Beri setiap risiko satu pemilik',
        isi: `Kolom ini yang paling sering hilang, dan tanpa itu tidak ada yang memantau.

Untuk tiap risiko, tetapkan **satu nama**, beserta tanda apa yang harus ia pantau dan kapan ia melaporkannya.` },
      { judul: 'Hitung EMV lalu urutkan',
        isi: `- \`EMV = peluang x dampak\`

Urutkan dari terbesar. Ini menentukan risiko mana yang layak mendapat perhatian lebih dulu.` },
      { judul: 'Buat juga matriksnya, dan bandingkan urutannya',
        isi: `Pita peluang dan pita dampak, masing-masing tiga tingkat.

Urutan matriks **tidak** akan sama dengan urutan EMV — dan itu memang gunanya. Risiko berpeluang 5 persen berdampak sangat besar butuh penanganan yang berbeda dari risiko berpeluang 70 persen berdampak sedang.` },
      { judul: 'Tentukan tanggapan untuk tiap risiko',
        isi: `Hindari, alihkan, kurangi, atau terima.

**Terima** itu sah — selama diputuskan sadar dan **dicatat** beserta cadangannya. Yang salah adalah menerima tanpa menyadarinya.` },
      { judul: 'Hitung apakah mitigasinya sepadan',
        isi: `Bandingkan **penurunan EMV** dengan **biaya mitigasinya**.

Lalu tinjau ulang yang tidak sepadan: apakah angka dampaknya sudah mencakup semuanya? Kehilangan satu-satunya orang yang paham modul inti tidak berdampak sebesar gajinya.` },
      { judul: 'Jalankan simulasi, jangan pakai EMV sebagai cadangan',
        isi: `Undi setiap risiko ribuan kali, jumlahkan yang terjadi tiap putaran, lalu urutkan hasilnya.

Bandingkan median, rata-rata, dan persentil 80. Rata-ratanya akan cocok dengan EMV — dan cadangan sebesar itu ternyata tidak cukup pada separuh kemungkinan.` },
      { judul: 'Ambil persentil, lalu sebutkan pilihannya',
        isi: `Tetapkan tingkat keyakinan yang kamu inginkan — 80 persen lazim dipakai — lalu ambil angka persentil itu.

Lalu **katakan terbuka**: *"cadangan kami sebesar X, cukup untuk 80 persen kemungkinan"*. Itu memindahkan keputusan tentang risiko ke pihak yang berwenang memutuskannya.` },
      { judul: 'Pisahkan dua jenis cadangan',
        isi: `**Kontinjensi** untuk risiko yang sudah dikenali, dipegang manajer proyek. **Manajemen** untuk yang belum terpikirkan, dipegang pimpinan.

Kalau digabung, yang terpakai lebih dulu adalah yang sudah diduga — dan tidak ada lagi yang tersisa untuk kejutan sebenarnya.` },
      { judul: 'Cari risiko yang bisa memicu risiko lain',
        isi: `Simulasinya mengandaikan risiko saling bebas, dan di proyek nyata itu sering tidak berlaku.

Telusuri rantainya: kebutuhan berubah → jadwal molor → tim kelelahan → orang keluar. Lalu potong rantainya di pangkal, atau naikkan cadangannya.` },
      { judul: 'Tinjau daftarnya secara berkala',
        isi: `Setiap tonggak atau setiap bulan, perbarui peluang dan dampaknya, tandai yang sudah lewat, dan tambahkan yang baru muncul.

Daftar yang tidak ditinjau berhenti menggambarkan keadaan setelah beberapa pekan.` }
    ],
    cek: [
      'Setiap risiko di daftarmu punya satu nama pemilik',
      'Cadanganmu diambil dari persentil simulasi, bukan dari nilai harapan',
      'Kamu tahu risiko mana yang bisa memicu risiko lain'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa nilai harapan bukan cadangan yang cukup',

  konsep: `
Risiko adalah **kejadian yang belum tentu terjadi, tetapi berakibat kalau terjadi**. Bedanya dengan masalah: masalah sudah terjadi, risiko belum.

Karena belum terjadi, ia mudah ditunda — dan itulah sebab manajemen risiko sering hanya menjadi lampiran dokumen yang tidak pernah dibuka lagi.

**Daftar risiko**

Tiap baris memuat: **kejadiannya**, **peluangnya**, **dampaknya**, **pemiliknya**, dan **tanggapan yang direncanakan**.

Kolom **pemilik** yang paling sering hilang, dan tanpa itu tidak ada yang memantau. Risiko tanpa pemilik adalah risiko yang baru diingat setelah terjadi.

**EMV: nilai harapan**

\`EMV = peluang x dampak\`

Ia **bukan** ramalan biaya yang akan keluar — tidak semua risiko akan terjadi. Gunanya dua: menentukan besar cadangan, dan **mengurutkan** risiko mana yang layak ditangani lebih dulu.

**Matriks peluang dikali dampak**

EMV meratakan dua hal berbeda menjadi satu angka, dan itu menyembunyikan sesuatu yang penting. Matriks **memisahkannya kembali**.

Dua risiko bisa punya EMV hampir sama dengan penanganan yang **berlawanan**:

- **peluang 70 persen, dampak 40 juta** → hampir pasti terjadi. Jangan dicegah; **siapkan mekanismenya**.
- **peluang 5 persen, dampak 400 juta** → hampir pasti tidak terjadi, tetapi bisa mematikan proyek. Yang dibutuhkan **pencegahan** dan **rencana darurat**, bukan cadangan uang.

Kaidahnya: **risiko berpeluang tinggi diurus dengan proses; risiko berdampak besar diurus dengan pencegahan.**

**Empat tanggapan**

| Tanggapan | Artinya | Contoh |
|---|---|---|
| **Hindari** | ubah rencana supaya risikonya hilang | batalkan integrasi otomatis, pakai impor manual |
| **Alihkan** | serahkan akibatnya ke pihak lain | asuransi, klausul denda di kontrak vendor |
| **Kurangi** | turunkan peluang atau dampaknya | purwarupa integrasi lebih awal |
| **Terima** | sadar menanggungnya, siapkan cadangan | sediakan dana dan waktu cadangan |

**Terima** adalah pilihan yang sah, bukan kelalaian — selama diputuskan sadar dan **dicatat**. Yang salah adalah menerima **tanpa menyadarinya**.

**Apakah mitigasinya sepadan**

Bandingkan **penurunan EMV** dengan **biaya mitigasinya**. Kalau biayanya lebih besar, hitungan uangnya tidak mendukung.

Tetapi hitungan uang bukan satu-satunya pertimbangan. Kalau satu orang adalah satu-satunya yang memahami modul inti, dampaknya bukan sebesar gajinya — dampaknya **proyek berhenti**. EMV menolong **mengurutkan**, bukan memutuskan sendiri.

**Risiko tidak datang sendirian**

Ini bagian yang paling sering salah dihitung.

Kalau ada tujuh risiko dan tiap satunya diundi sendiri, hasilnya bukan satu angka melainkan **sebaran**. Dan sebaran itu **melenceng**: mediannya lebih rendah daripada rata-ratanya, sementara ekornya panjang ke atas.

Akibatnya: **cadangan sebesar EMV total tidak cukup pada separuh kemungkinan.** Untuk aman pada delapan puluh persen kemungkinan, cadangannya harus jauh lebih besar.

Cara menghitungnya: simulasi. Undi setiap risiko ribuan kali, urutkan hasilnya, lalu ambil persentil yang kamu inginkan.

**Dua jenis cadangan**

- **kontinjensi** — untuk risiko yang **sudah dikenali**; dipegang manajer proyek; boleh dipakai tanpa izin baru
- **manajemen** — untuk risiko yang **belum terpikirkan**; dipegang pimpinan; butuh persetujuan

Memisahkan keduanya penting. Kalau seluruh cadangan dipegang manajer proyek, ia akan terpakai untuk hal yang sudah diduga, dan tidak ada lagi yang tersisa untuk **kejutan yang sebenarnya**.

**Risiko khas proyek TI**

kebutuhan tidak jelas di awal · pemangku kepentingan tidak sepakat · ketergantungan pada satu orang · integrasi dengan sistem lama · mutu data lama · penolakan pengguna

Perhatikan bahwa hanya **satu** dari enam yang benar-benar soal teknis. Sisanya soal orang, kesepakatan, dan data — dan di situlah proyek TI sesungguhnya gagal.

**Risiko positif juga ada**

Kerangka yang lengkap juga menangani **peluang**: kejadian yang kalau terjadi justru menguntungkan. Tanggapannya bercermin — **manfaatkan**, **bagikan**, **tingkatkan**, atau **terima**.

Contohnya: pustaka baru yang bisa memangkas separuh pekerjaan integrasi. Kalau tidak dicatat sebagai peluang, tidak ada yang bertugas memeriksanya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# CADANGAN SEBESAR EMV TIDAK CUKUP\n#\n# Total EMV tujuh risiko : Rp 154.500.000\n#\n# Simulasi 20.000 putaran, tiap risiko diundi sendiri:\n#\n#   terbaik (P0)                    0\n#   P50 (median)          130.000.000\n#   P80                   215.000.000\n#   P90                   305.000.000\n#   P95                   400.000.000\n#   terburuk              795.000.000\n#   rata-rata (= EMV)     154.220.250\n#\n# Rata-ratanya cocok dengan EMV -- itu memang artinya.\n#\n# Tapi cadangan sebesar EMV cuma cukup pada 57%\n# kemungkinan. Untuk 80%, butuh Rp 215 juta.',
      penjelasan: `
EMV total sering diperlakukan sebagai jawaban atas pertanyaan *"berapa cadangan yang kita butuhkan?"*. Jawaban itu **salah**, dan simulasinya menunjukkan kenapa dengan gamblang.

Mulai dari apa yang sebenarnya dijanjikan EMV. Ia **rata-rata** dari seluruh kemungkinan. Perhatikan barisnya di tabel: rata-rata simulasi 154,2 juta, EMV total 154,5 juta. Cocok, dan memang harus cocok — itu definisinya.

Sekarang perhatikan **mediannya**: 130 juta. Ia **lebih rendah** daripada rata-ratanya.

Selisih itu tanda bahwa sebarannya **melenceng ke kanan**, dan kelencengan itu mengubah segalanya.

Kenapa melenceng? Karena batas bawahnya **nol** — tidak mungkin biaya risiko negatif, dan pada sebagian putaran memang tidak ada satu pun risiko yang terjadi. Tetapi batas atasnya adalah **jumlah seluruh dampak**, 795 juta, kalau ketujuhnya terjadi bersamaan.

Jadi sebarannya punya lantai yang keras dan langit-langit yang jauh. Hasilnya: banyak putaran berkumpul di bawah, sedikit putaran melesat tinggi, dan **beberapa nilai besar itu menarik rata-ratanya ke atas melewati mediannya**.

Sekarang akibat praktisnya, dan ini yang penting.

Kalau kamu menyiapkan cadangan sebesar EMV — 154,5 juta — berapa kali itu cukup?

Bukan separuh. **57 persen.** Artinya sekitar **dua dari lima kali**, cadanganmu habis dan kamu harus meminta tambahan.

Dan meminta tambahan di tengah proyek jauh lebih mahal daripada memintanya di awal — bukan dalam rupiah, melainkan dalam **kepercayaan**. Manajer yang datang meminta tambahan terlihat seperti salah merencanakan, meskipun ia sudah menghitung dengan benar.

Untuk aman pada 80 persen kemungkinan, cadangannya **215 juta**. Untuk 90 persen, **305 juta** — hampir dua kali EMV.

Dari sini muncul cara kerja yang benar, dan ia sederhana.

**Jangan memakai EMV sebagai cadangan. Pakai persentil.** Tentukan lebih dulu tingkat keyakinan yang kamu inginkan — 80 persen adalah pilihan yang lazim — lalu ambil angka persentil itu dari simulasinya.

Dan yang membuat ini bisa dipertanggungjawabkan: kamu bisa **menyebutkan pilihannya**. *"Cadangan kami 215 juta, cukup untuk 80 persen kemungkinan; pada 20 persen sisanya kami akan perlu tambahan."*

Pernyataan itu jujur, bisa diperiksa, dan memindahkan keputusan tentang seberapa besar risiko yang mau ditanggung ke pihak yang memang berwenang memutuskannya.

Ada satu hal yang membuat gambaran nyatanya **lebih buruk** dari simulasi ini, dan perlu disebut.

Simulasi di atas mengandaikan setiap risiko **saling bebas** — bahwa satu anggota tim keluar tidak berkaitan dengan data lama yang kotor. Di proyek nyata, andaian itu sering tidak berlaku.

Kebutuhan yang berubah membuat jadwal molor; jadwal yang molor membuat tim kelelahan; tim yang kelelahan membuat orang keluar; orang keluar membuat integrasi terhambat. **Risiko saling memicu.**

Ketika risiko berkaitan, ekor atasnya menjadi **lebih tebal** daripada yang dihitung dengan andaian saling bebas. Jadi persentil 80 hasil simulasi ini sebaiknya dibaca sebagai **batas bawah** dari cadangan yang sesungguhnya dibutuhkan, bukan angka pasti.

Cara sederhana menanganinya: setelah mendapat angka persentil, tanyakan **risiko mana yang bisa memicu risiko lain**, lalu naikkan cadangannya untuk itu — atau lebih baik lagi, potong rantai pemicunya di pangkal.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Manajemen risiko proyek
# ============================================
import random

# --------------------------------------------
# 1. Daftar risiko: peluang x dampak
# --------------------------------------------
# (nama, peluang, dampak rupiah, kategori)
RISIKO = [
    ("Kebutuhan berubah di tengah jalan", 0.70,  40_000_000, "lingkup"),
    ("Satu anggota tim keluar",           0.30,  60_000_000, "orang"),
    ("Integrasi dengan sistem lama gagal",0.40,  90_000_000, "teknis"),
    ("Data lama kotor, perlu dibersihkan",0.60,  25_000_000, "data"),
    ("Peladen produksi terlambat datang", 0.25,  30_000_000, "vendor"),
    ("Pengguna menolak memakai sistem",   0.20, 150_000_000, "organisasi"),
    ("Kebocoran data saat uji coba",      0.05, 400_000_000, "keamanan"),
]

def pita_peluang(p):
    if p >= 0.50:  return 3
    if p >= 0.20:  return 2
    return 1

def pita_dampak(d, anggaran):
    rasio = d / anggaran
    if rasio >= 0.30:  return 3
    if rasio >= 0.10:  return 2
    return 1

def tingkat(p, d, anggaran):
    """Matriks peluang x dampak, masing-masing tiga pita."""
    a, b = pita_peluang(p), pita_dampak(d, anggaran)
    if a + b >= 5:  return "TINGGI"
    if a + b >= 3:  return "sedang"
    return "rendah"

ANGGARAN = 300_000_000

print("--- daftar risiko (anggaran proyek Rp 300 juta) ---")
print("  " + "risiko".ljust(37) + "pel".rjust(6)
      + "dampak".rjust(14) + "EMV".rjust(14) + "  pita   tingkat")
total_emv = 0
for nama, p, d, _ in sorted(RISIKO, key=lambda r: -(r[1] * r[2])):
    emv = p * d
    total_emv += emv
    pita = str(pita_peluang(p)) + "x" + str(pita_dampak(d, ANGGARAN))
    print("  " + nama.ljust(37) + ("%.2f" % p).rjust(6)
          + f"{d:>14,}".replace(",", ".")
          + f"{int(emv):>14,}".replace(",", ".")
          + "  " + pita.ljust(6) + " " + tingkat(p, d, ANGGARAN))
print("  " + "-" * 78)
print("  " + "TOTAL EMV".ljust(37) + "".rjust(6) + "".rjust(14)
      + f"{int(total_emv):>14,}".replace(",", "."))
print("")
print("  Kolom pita: peluang x dampak, tiap sumbu tiga tingkat.")
print("  Perhatikan bahwa urutan matriks TIDAK sama dengan")
print("  urutan EMV. 'Kebocoran data' EMV-nya nomor empat tapi")
print("  matriksnya cuma sedang, karena peluangnya sangat kecil.")
print("  Keduanya memang menjawab pertanyaan berbeda: EMV")
print("  meratakan keduanya jadi satu angka, matriks")
print("  MEMISAHKANNYA supaya penanganannya bisa berbeda.")
print("")
print("  EMV = peluang x dampak. Ia BUKAN ramalan biaya yang")
print("  akan keluar -- tidak semua risiko akan terjadi.")
print("  Ia dasar untuk menentukan besar cadangan, dan untuk")
print("  MENGURUTKAN risiko mana yang layak ditangani lebih dulu.")
print("")
print("  Total EMV " + ("%.0f%%" % (total_emv / ANGGARAN * 100))
      + " dari anggaran. Proyek dengan cadangan")
print("  10% sedang bertaruh bahwa sebagian besar risikonya")
print("  tidak akan terjadi.")

# --------------------------------------------
# 2. Peluang tinggi vs dampak besar: mana lebih penting?
# --------------------------------------------
print("")
print("--- dua risiko dengan EMV mirip, penanganan berbeda ---")
BANDING = [
    ("Kebutuhan berubah",   0.70,  40_000_000),
    ("Kebocoran data",      0.05, 400_000_000),
]
for nama, p, d in BANDING:
    print("  " + nama.ljust(22) + "peluang " + ("%.0f%%" % (p * 100)).rjust(4)
          + "   dampak Rp " + f"{d:,}".replace(",", ".").rjust(12)
          + "   EMV Rp " + f"{int(p*d):,}".replace(",", "."))
print("")
print("  EMV-nya beda 40% saja, tapi penanganannya berlawanan:")
print("")
print("  Kebutuhan berubah HAMPIR PASTI terjadi. Jangan dicegah")
print("  -- SIAPKAN mekanismenya: prosedur pengendalian")
print("  perubahan dan cadangan waktu.")
print("")
print("  Kebocoran data hampir pasti TIDAK terjadi, tapi kalau")
print("  terjadi bisa mematikan proyeknya. Yang dibutuhkan")
print("  bukan cadangan uang -- melainkan pencegahan, dan")
print("  rencana kalau tetap terjadi.")
print("")
print("  Aturan praktisnya: risiko berpeluang tinggi diurus")
print("  dengan PROSES; risiko berdampak besar diurus dengan")
print("  PENCEGAHAN dan RENCANA DARURAT.")

# --------------------------------------------
# 3. Empat cara menanggapi risiko
# --------------------------------------------
print("")
print("--- empat tanggapan ---")
TANGGAP = [
    ("Hindari",  "ubah rencana supaya risikonya hilang",
     "batalkan integrasi otomatis, pakai impor manual"),
    ("Alihkan",  "serahkan akibatnya ke pihak lain",
     "asuransi, klausul denda di kontrak vendor"),
    ("Kurangi",  "turunkan peluang atau dampaknya",
     "purwarupa integrasi lebih awal, cadangkan data"),
    ("Terima",   "sadar menanggungnya, siapkan cadangan",
     "sediakan dana dan waktu cadangan"),
]
for nama, arti, contoh in TANGGAP:
    print("  " + nama.ljust(10) + arti)
    print("      contoh: " + contoh)
print("")
print("  'Terima' adalah pilihan yang SAH, bukan kelalaian --")
print("  selama diputuskan sadar dan dicatat. Yang salah")
print("  adalah menerima tanpa menyadarinya.")

# --------------------------------------------
# 4. Apakah biaya mitigasi sepadan?
# --------------------------------------------
print("")
print("--- apakah mitigasinya sepadan? ---")
MITIGASI = [
    ("Purwarupa integrasi 2 minggu di awal",
     "Integrasi dengan sistem lama gagal", 0.40, 0.10, 15_000_000),
    ("Bayar konsultan pembersih data",
     "Data lama kotor, perlu dibersihkan", 0.60, 0.20, 20_000_000),
    ("Uji penetrasi sebelum rilis",
     "Kebocoran data saat uji coba", 0.05, 0.01, 12_000_000),
    ("Rekrut satu orang cadangan",
     "Satu anggota tim keluar", 0.30, 0.15, 50_000_000),
]
peta = {r[0]: r[2] for r in RISIKO}
print("  " + "tindakan".ljust(38) + "EMV turun".rjust(14)
      + "biaya".rjust(14) + "  hasil")
for tindakan, risiko, p_lama, p_baru, biaya in MITIGASI:
    d = peta[risiko]
    turun = (p_lama - p_baru) * d
    bersih = turun - biaya
    print("  " + tindakan.ljust(38)
          + f"{int(turun):>14,}".replace(",", ".")
          + f"{biaya:>14,}".replace(",", ".")
          + ("  SEPADAN" if bersih > 0 else "  tidak sepadan"))
print("")
print("  Baris terakhir tidak sepadan menurut hitungan uang.")
print("  Tapi hitungan uang bukan satu-satunya pertimbangan:")
print("  kalau orang itu satu-satunya yang paham modul inti,")
print("  dampaknya bukan Rp 60 juta melainkan proyek berhenti.")
print("")
print("  EMV menolong MENGURUTKAN, bukan memutuskan sendiri.")

# --------------------------------------------
# 5. Risiko tidak datang sendirian
# --------------------------------------------
print("")
print("--- simulasi: berapa yang benar-benar keluar? ---")
r = random.Random(23)
PUTARAN = 20_000
hasil = []
for _ in range(PUTARAN):
    total = 0
    for nama, p, d, _ in RISIKO:
        if r.random() < p:
            total += d
    hasil.append(total)
hasil.sort()

def persentil(data, q):
    return data[min(int(len(data) * q / 100), len(data) - 1)]

print("  " + str(PUTARAN) + " putaran, tiap risiko diundi sendiri")
print("")
print("  " + "ukuran".ljust(24) + "biaya risiko".rjust(16))
for nama, q in (("terbaik (P0)", 0), ("P50 (median)", 50),
                ("P80", 80), ("P90", 90), ("P95", 95),
                ("terburuk", 100)):
    print("  " + nama.ljust(24)
          + f"{persentil(hasil, q):>16,}".replace(",", "."))
print("  " + "rata-rata (= EMV)".ljust(24)
      + f"{int(sum(hasil) / len(hasil)):>16,}".replace(",", "."))
print("")
print("  Rata-ratanya cocok dengan total EMV -- itu memang")
print("  artinya. Tapi lihat sebarannya: median lebih RENDAH")
print("  daripada rata-rata, sementara ekornya panjang ke atas.")
print("")
print("  Akibatnya: menganggarkan cadangan sebesar EMV berarti")
tercukupi = sum(1 for h in hasil if h <= total_emv) / len(hasil)
print("  cukup pada " + ("%.0f%%" % (tercukupi * 100))
      + " kemungkinan saja. Untuk aman pada")
print("  80% kemungkinan, cadangannya harus Rp "
      + f"{persentil(hasil, 80):,}".replace(",", ".") + ".")

# --------------------------------------------
# 6. Dua jenis cadangan
# --------------------------------------------
print("")
print("--- cadangan kontinjensi vs cadangan manajemen ---")
JENIS = [
    ("Kontinjensi", "risiko yang SUDAH dikenali",
     "dipegang manajer proyek", "boleh dipakai tanpa izin baru"),
    ("Manajemen",   "risiko yang BELUM terpikirkan",
     "dipegang pimpinan", "butuh persetujuan untuk dipakai"),
]
for nama, untuk, siapa, izin in JENIS:
    print("  " + nama)
    print("      untuk  : " + untuk)
    print("      pemegang: " + siapa)
    print("      aturan : " + izin)
print("")
print("  Memisahkan keduanya penting. Kalau semua cadangan")
print("  dipegang manajer proyek, ia akan terpakai untuk hal")
print("  yang sudah diduga, dan tidak ada lagi yang tersisa")
print("  untuk kejutan yang sebenarnya.")

# --------------------------------------------
# 7. Risiko khas proyek TI
# --------------------------------------------
print("")
print("--- risiko yang paling sering muncul di proyek TI ---")
KHAS = [
    ("Kebutuhan tidak jelas di awal", "paling sering, paling mahal"),
    ("Pemangku kepentingan tidak sepakat", "muncul saat serah terima"),
    ("Ketergantungan pada satu orang", "bus factor satu"),
    ("Integrasi dengan sistem lama", "selalu lebih sulit dari dugaan"),
    ("Mutu data lama", "hampir selalu lebih kotor dari yang dikira"),
    ("Penolakan pengguna", "teknis benar, tetap gagal"),
]
for a, b in KHAS:
    print("  " + a.ljust(38) + b)
print("")
print("  Perhatikan: hanya SATU dari enam yang benar-benar")
print("  soal teknis. Sisanya soal orang, kesepakatan, dan data.")
print("  Di situlah proyek TI sesungguhnya gagal.")` },
  output: `--- daftar risiko (anggaran proyek Rp 300 juta) ---
  risiko                                  pel        dampak           EMV  pita   tingkat
  Integrasi dengan sistem lama gagal     0.40    90.000.000    36.000.000  2x3    TINGGI
  Pengguna menolak memakai sistem        0.20   150.000.000    30.000.000  2x3    TINGGI
  Kebutuhan berubah di tengah jalan      0.70    40.000.000    28.000.000  3x2    TINGGI
  Kebocoran data saat uji coba           0.05   400.000.000    20.000.000  1x3    sedang
  Satu anggota tim keluar                0.30    60.000.000    18.000.000  2x2    sedang
  Data lama kotor, perlu dibersihkan     0.60    25.000.000    15.000.000  3x1    sedang
  Peladen produksi terlambat datang      0.25    30.000.000     7.500.000  2x2    sedang
  ------------------------------------------------------------------------------
  TOTAL EMV                                                   154.500.000

  Kolom pita: peluang x dampak, tiap sumbu tiga tingkat.
  Perhatikan bahwa urutan matriks TIDAK sama dengan
  urutan EMV. 'Kebocoran data' EMV-nya nomor empat tapi
  matriksnya cuma sedang, karena peluangnya sangat kecil.
  Keduanya memang menjawab pertanyaan berbeda: EMV
  meratakan keduanya jadi satu angka, matriks
  MEMISAHKANNYA supaya penanganannya bisa berbeda.

  EMV = peluang x dampak. Ia BUKAN ramalan biaya yang
  akan keluar -- tidak semua risiko akan terjadi.
  Ia dasar untuk menentukan besar cadangan, dan untuk
  MENGURUTKAN risiko mana yang layak ditangani lebih dulu.

  Total EMV 52% dari anggaran. Proyek dengan cadangan
  10% sedang bertaruh bahwa sebagian besar risikonya
  tidak akan terjadi.

--- dua risiko dengan EMV mirip, penanganan berbeda ---
  Kebutuhan berubah     peluang  70%   dampak Rp   40.000.000   EMV Rp 28.000.000
  Kebocoran data        peluang   5%   dampak Rp  400.000.000   EMV Rp 20.000.000

  EMV-nya beda 40% saja, tapi penanganannya berlawanan:

  Kebutuhan berubah HAMPIR PASTI terjadi. Jangan dicegah
  -- SIAPKAN mekanismenya: prosedur pengendalian
  perubahan dan cadangan waktu.

  Kebocoran data hampir pasti TIDAK terjadi, tapi kalau
  terjadi bisa mematikan proyeknya. Yang dibutuhkan
  bukan cadangan uang -- melainkan pencegahan, dan
  rencana kalau tetap terjadi.

  Aturan praktisnya: risiko berpeluang tinggi diurus
  dengan PROSES; risiko berdampak besar diurus dengan
  PENCEGAHAN dan RENCANA DARURAT.

--- empat tanggapan ---
  Hindari   ubah rencana supaya risikonya hilang
      contoh: batalkan integrasi otomatis, pakai impor manual
  Alihkan   serahkan akibatnya ke pihak lain
      contoh: asuransi, klausul denda di kontrak vendor
  Kurangi   turunkan peluang atau dampaknya
      contoh: purwarupa integrasi lebih awal, cadangkan data
  Terima    sadar menanggungnya, siapkan cadangan
      contoh: sediakan dana dan waktu cadangan

  'Terima' adalah pilihan yang SAH, bukan kelalaian --
  selama diputuskan sadar dan dicatat. Yang salah
  adalah menerima tanpa menyadarinya.

--- apakah mitigasinya sepadan? ---
  tindakan                                   EMV turun         biaya  hasil
  Purwarupa integrasi 2 minggu di awal      27.000.000    15.000.000  SEPADAN
  Bayar konsultan pembersih data            10.000.000    20.000.000  tidak sepadan
  Uji penetrasi sebelum rilis               16.000.000    12.000.000  SEPADAN
  Rekrut satu orang cadangan                 9.000.000    50.000.000  tidak sepadan

  Baris terakhir tidak sepadan menurut hitungan uang.
  Tapi hitungan uang bukan satu-satunya pertimbangan:
  kalau orang itu satu-satunya yang paham modul inti,
  dampaknya bukan Rp 60 juta melainkan proyek berhenti.

  EMV menolong MENGURUTKAN, bukan memutuskan sendiri.

--- simulasi: berapa yang benar-benar keluar? ---
  20000 putaran, tiap risiko diundi sendiri

  ukuran                      biaya risiko
  terbaik (P0)                           0
  P50 (median)                 130.000.000
  P80                          215.000.000
  P90                          305.000.000
  P95                          400.000.000
  terburuk                     795.000.000
  rata-rata (= EMV)            154.220.250

  Rata-ratanya cocok dengan total EMV -- itu memang
  artinya. Tapi lihat sebarannya: median lebih RENDAH
  daripada rata-rata, sementara ekornya panjang ke atas.

  Akibatnya: menganggarkan cadangan sebesar EMV berarti
  cukup pada 57% kemungkinan saja. Untuk aman pada
  80% kemungkinan, cadangannya harus Rp 215.000.000.

--- cadangan kontinjensi vs cadangan manajemen ---
  Kontinjensi
      untuk  : risiko yang SUDAH dikenali
      pemegang: dipegang manajer proyek
      aturan : boleh dipakai tanpa izin baru
  Manajemen
      untuk  : risiko yang BELUM terpikirkan
      pemegang: dipegang pimpinan
      aturan : butuh persetujuan untuk dipakai

  Memisahkan keduanya penting. Kalau semua cadangan
  dipegang manajer proyek, ia akan terpakai untuk hal
  yang sudah diduga, dan tidak ada lagi yang tersisa
  untuk kejutan yang sebenarnya.

--- risiko yang paling sering muncul di proyek TI ---
  Kebutuhan tidak jelas di awal         paling sering, paling mahal
  Pemangku kepentingan tidak sepakat    muncul saat serah terima
  Ketergantungan pada satu orang        bus factor satu
  Integrasi dengan sistem lama          selalu lebih sulit dari dugaan
  Mutu data lama                        hampir selalu lebih kotor dari yang dikira
  Penolakan pengguna                    teknis benar, tetap gagal

  Perhatikan: hanya SATU dari enam yang benar-benar
  soal teknis. Sisanya soal orang, kesepakatan, dan data.
  Di situlah proyek TI sesungguhnya gagal.`,

  kesalahanUmum: [
    {
      salah: 'Menetapkan cadangan proyek sebesar total nilai harapan risikonya.',
      kenapa: 'Sebaran biaya risiko melenceng ke kanan karena batas bawahnya nol sementara batas atasnya jumlah seluruh dampak. Cadangan sebesar nilai harapan karenanya hanya cukup pada sekitar lima puluh tujuh persen kemungkinan, sehingga dua dari lima kali harus meminta tambahan di tengah proyek.',
      benar: 'Jalankan simulasi lalu ambil persentil sesuai tingkat keyakinan yang diinginkan, dan sebutkan tingkat keyakinannya secara terbuka.'
    },
    {
      salah: 'Mengurutkan risiko hanya dengan nilai harapan.',
      kenapa: 'Nilai harapan meratakan peluang dan dampak menjadi satu angka, sehingga risiko berpeluang tinggi berdampak sedang terlihat setara dengan risiko berpeluang sangat kecil berdampak sangat besar. Padahal penanganan keduanya berlawanan: yang pertama butuh proses, yang kedua butuh pencegahan.',
      benar: 'Pakai nilai harapan untuk mengurutkan, dan matriks peluang dikali dampak untuk menentukan bentuk penanganannya.'
    },
    {
      salah: 'Menulis daftar risiko tanpa menyebut pemilik tiap risiko.',
      kenapa: 'Risiko tanpa pemilik tidak dipantau siapa pun, sehingga baru diingat setelah terjadi. Dokumen risikonya lengkap dan tetap tidak berpengaruh apa pun pada jalannya proyek.',
      benar: 'Tetapkan satu nama untuk tiap risiko, beserta tanda apa yang harus ia pantau dan kapan ia melaporkannya.'
    },
    {
      salah: 'Menganggap menerima risiko sebagai bentuk kelalaian.',
      kenapa: 'Sebagian risiko tidak sepadan untuk dicegah, sehingga menerimanya sambil menyiapkan cadangan adalah keputusan yang benar. Yang salah adalah menerima tanpa menyadari, karena tidak ada cadangan yang disiapkan untuk sesuatu yang tidak pernah diakui.',
      benar: 'Catat keputusan menerima secara tertulis beserta cadangan yang disiapkan untuknya.'
    },
    {
      salah: 'Menolak mitigasi hanya karena biayanya melebihi penurunan nilai harapannya.',
      kenapa: 'Angka dampak dalam daftar risiko sering hanya mencakup biaya yang mudah dihitung. Kehilangan satu-satunya orang yang memahami modul inti tidak berdampak sebesar gajinya, melainkan menghentikan proyek, dan itu tidak tertangkap di kolom dampaknya.',
      benar: 'Pakai perbandingan biaya terhadap penurunan nilai harapan untuk mengurutkan, lalu tinjau ulang risiko yang dampaknya melebihi angka di kolom.'
    },
    {
      salah: 'Menggabungkan cadangan kontinjensi dan cadangan manajemen dalam satu pos.',
      kenapa: 'Cadangan yang dipegang manajer proyek akan terpakai untuk risiko yang sudah diduga, karena itulah yang muncul lebih dulu. Ketika kejutan yang sebenarnya datang, tidak ada lagi yang tersisa dan tidak ada jalur untuk memintanya.',
      benar: 'Pisahkan keduanya dengan pemegang dan aturan pemakaian yang berbeda, dan tetapkan siapa yang berwenang melepas cadangan manajemen.'
    },
    {
      salah: 'Menyusun daftar risiko di awal proyek lalu tidak meninjaunya lagi.',
      kenapa: 'Risiko berubah sepanjang proyek: sebagian lewat tanpa terjadi, sebagian peluangnya naik, dan yang baru muncul dari keputusan yang diambil di tengah jalan. Daftar yang tidak ditinjau berhenti menggambarkan keadaan setelah beberapa pekan.',
      benar: 'Tinjau daftar risiko pada setiap tonggak atau setiap bulan, lalu perbarui peluang, dampak, dan tanggapannya.'
    },
    {
      salah: 'Mengandaikan risiko saling bebas ketika menghitung cadangan.',
      kenapa: 'Di proyek nyata risiko saling memicu: kebutuhan yang berubah membuat jadwal molor, jadwal yang molor membuat tim kelelahan, dan tim yang kelelahan membuat orang keluar. Ekor atas sebarannya karenanya lebih tebal daripada yang dihitung dengan andaian saling bebas.',
      benar: 'Baca hasil simulasi sebagai batas bawah, lalu telusuri risiko mana yang bisa memicu risiko lain dan potong rantai pemicunya.'
    }
  ],

  analogi: `Bayangkan kamu **menyiapkan uang untuk perbaikan motor** selama setahun.

Kamu daftar kemungkinannya. Ban bocor, peluang tinggi, biaya kecil. Rantai putus, peluang sedang, biaya sedang. Mesin turun, peluang kecil, biaya besar.

Kamu hitung rata-ratanya, dapat **satu juta**, dan menyiapkan satu juta.

Setahun berjalan. Berapa kali satu juta itu cukup?

Kalau kamu jalani seribu tahun yang berbeda, rata-rata pengeluarannya **memang** satu juta. Itu benar.

Tetapi lihat bentuknya. Pada banyak tahun, kamu cuma tambal ban dua kali — **dua ratus ribu**, jauh di bawah satu juta. Pada beberapa tahun, mesinnya turun — **lima juta**, jauh di atas.

Rata-rata satu juta itu ditarik ke atas oleh sedikit tahun yang buruk. Tahun yang **biasa** justru menghabiskan lebih sedikit.

Akibatnya: satu juta cukup pada sebagian besar tahun — tetapi **tidak cukup** pada tahun-tahun yang justru paling kamu butuhkan uangnya.

Dan itulah masalahnya. Cadangan tidak disiapkan untuk tahun yang biasa; ia disiapkan untuk tahun yang buruk.

Kalau kamu ingin aman pada delapan dari sepuluh tahun, kamu tidak menyiapkan rata-rata. Kamu menyiapkan **jauh di atas rata-rata**.

Dan satu hal lagi yang membuatnya lebih buruk: kerusakan **saling memicu**. Rantai yang lama tidak diganti merusak gir. Gir yang rusak membebani mesin.

Jadi tahun buruk bukan cuma tahun yang kebetulan sial — ia tahun di mana **satu kelalaian menyeret yang lain**.`,

  latihan: [
    'Susun daftar risiko sepuluh baris untuk satu proyek, lengkap dengan peluang, dampak, pemilik, dan tanggapan.',
    'Hitung EMV tiap risiko dan totalnya, lalu bandingkan urutannya dengan urutan matriks peluang dikali dampak.',
    'Jelaskan kenapa dua risiko dengan EMV mirip bisa menuntut penanganan yang berlawanan.',
    'Berikan satu contoh nyata untuk tiap tanggapan risiko: hindari, alihkan, kurangi, dan terima.',
    'Hitung apakah tiga tindakan mitigasi sepadan, dengan membandingkan penurunan EMV terhadap biayanya.',
    'Berikan satu contoh mitigasi yang tidak sepadan menurut hitungan uang tetapi tetap layak dikerjakan, beserta alasannya.',
    'Jalankan simulasi ribuan putaran untuk daftar risikomu, lalu bandingkan median, rata-rata, dan persentil delapan puluh.',
    'Jelaskan kenapa cadangan sebesar EMV total tidak cukup pada separuh kemungkinan.',
    'Jelaskan beda cadangan kontinjensi dan cadangan manajemen, dan apa yang terjadi kalau keduanya digabung.',
    'Cari dua risiko di daftarmu yang bisa saling memicu, lalu usulkan cara memotong rantainya.'
  ]
});


TOPICS.push({
  id: 'mpi-evm',
  judul: 'Pengendalian Proyek & Earned Value',
  kategori: 'mpi',
  tag: ['earned value', 'PV EV AC', 'SPI', 'CPI', 'EAC', 'TCPI', 'laporan status'],
  ringkas: 'Empat puluh persen selesai, uang terpakai separuh — dan kekurangannya sudah bisa dihitung sekarang.',

  fungsi: `**Mengetahui, di tengah jalan, apakah rencananya masih berlaku.**

Terpakai di:

- **Laporan status** proyek atau kemajuan tugas akhir
- **Meramalkan** biaya dan tanggal akhir dari data separuh jalan
- **Membuktikan** bahwa target sudah mustahil, dengan angka
- **Kerja nyata** — EVM dipakai di hampir semua proyek berkontrak

Yang paling mengubah cara melapor: **"80 persen selesai" tidak bisa diperiksa siapa pun.**

Earned Value menggantinya dengan angka: nilai pekerjaan yang benar-benar selesai, diukur dengan **harga rencana** — sehingga kemajuan, biaya, dan jadwal bisa dibandingkan dalam satuan yang sama.

Dan temuan yang paling berguna: **CPI cenderung menetap** begitu seperlima pekerjaan berjalan. Janji *"nanti kami kejar"* hampir selalu tidak terbukti, dan itu bisa ditunjukkan dengan tabel, bukan diperdebatkan.`,

  praktik: {
    tujuan: `Kamu bisa melaporkan status proyek dengan angka yang tidak bisa dibantah, dan meramalkan biaya akhirnya dari data separuh jalan.`,
    alat: [
      'Spreadsheet',
      'Data anggaran dan kemajuan proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Sepakati aturan pengukuran SEBELUM mulai',
        isi: `0/100, 50/50, atau persentase.

Memilihnya belakangan memungkinkan aturan yang hasilnya paling menyenangkan yang dipilih — dan angka yang bisa dipilih setelah melihat hasilnya berhenti menjadi ukuran.` },
      { judul: 'Pecah paket kerja sampai kecil',
        isi: `Aturan 0/100 adalah yang paling jujur, tetapi ia butuh paket yang **kecil**.

Kalau satu paket makan tiga bulan, grafiknya datar selama tiga bulan dan tidak memberi informasi apa pun. Pecah sampai paling lama satu atau dua periode pelaporan.` },
      { judul: 'Catat tiga angka tiap periode',
        isi: `- **PV** — nilai yang seharusnya selesai
- **EV** — nilai yang benar-benar selesai, dengan **harga rencana**
- **AC** — uang yang sudah keluar

Yang tengah itu kuncinya. Paket beranggaran 10 juta yang selesai bernilai EV 10 juta, entah biayanya 8 atau 25 juta.` },
      { judul: 'Hitung selisih dan indeksnya',
        isi: `- \`SV = EV - PV\` dan \`CV = EV - AC\`
- \`SPI = EV / PV\` dan \`CPI = EV / AC\`

Indeksnya lebih berguna karena tanpa satuan. Bacaan cepat: CPI 0,83 berarti tiap seribu rupiah menghasilkan 830 rupiah pekerjaan.` },
      { judul: 'Perhatikan pergerakan CPI antar periode',
        isi: `Cetak kolomnya berurutan. Kalau ia hampir tidak bergerak setelah beberapa periode, itu **bukan kebetulan** — ia mengukur sesuatu yang struktural.

Dan itu berarti janji akan dikejar di paruh kedua mengandaikan sesuatu yang belum pernah terjadi.` },
      { judul: 'Ramalkan dengan tiga cara, sebutkan andaiannya',
        isi: `- naif: \`EAC = BAC\`
- pakai CPI: \`EAC = BAC / CPI\`
- CPI dan SPI: \`EAC = AC + (BAC - EV) / (CPI x SPI)\`

Cara naif hampir selalu salah, dan paling sering dipakai — karena ia satu-satunya yang tidak menghasilkan kabar buruk.` },
      { judul: 'Hitung ETC dan VAC',
        isi: `- \`ETC = EAC - AC\` — sisa biaya yang dibutuhkan
- \`VAC = BAC - EAC\` — negatif berarti kekurangan

Nyatakan kekurangannya sebagai **persentase anggaran**. Angka itu yang akan dipahami sponsor.` },
      { judul: 'Hitung TCPI dan bandingkan dengan CPI',
        isi: `- \`TCPI = (BAC - EV) / (BAC - AC)\`

Kalau TCPI jauh di atas CPI yang sudah tercapai, targetnya bukan menantang — ia **mustahil**, dan sekarang kata itu punya angka di belakangnya.` },
      { judul: 'Ubah percakapannya',
        isi: `Dengan angka itu, pindahkan pembicaraan dari *"apakah tim cukup berusaha"* menjadi **"anggarannya kurang sekian persen, atau lingkupnya dipotong sekian"**.

Pertanyaan kedua bisa dijawab. Yang pertama cuma menghasilkan tekanan — dan tekanan pada tim ber-CPI rendah biasanya menurunkannya lebih lanjut.` },
      { judul: 'Jangan pakai SPI di tahap akhir',
        isi: `SPI **selalu** kembali ke 1,0 di akhir proyek, bahkan proyek yang terlambat berbulan-bulan — karena akhirnya \`EV = PV = BAC\`.

Untuk tahap akhir, bandingkan tanggal langsung.` }
    ],
    cek: [
      'Aturan pengukuran EV-mu ditetapkan sebelum satu paket kerja pun dimulai',
      'Kamu bisa menyebutkan kekurangan anggaran sebagai persentase, dari data separuh jalan',
      'Laporanmu memuat TCPI beserta perbandingannya dengan CPI yang sudah tercapai'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa CPI hampir tidak pernah membaik',

  konsep: `
Merencanakan proyek itu bagian yang mudah. Bagian yang sulit: **mengetahui, di tengah jalan, apakah rencananya masih berlaku.**

**Kenapa "80 persen selesai" tidak berarti apa-apa**

Laporan seperti itu punya tiga masalah: **tidak bisa diperiksa** siapa pun, **tidak menyebut biaya**, dan **tidak menyebut jadwal**.

Dan gejala yang paling dikenal: *"90 persen selesai"* yang bertahan berminggu-minggu.

Earned Value menghapus masalah ini dengan mengubah kemajuan menjadi **uang**, sehingga kemajuan, biaya, dan jadwal bisa dibandingkan dalam satuan yang sama.

**Tiga angka dasar**

- **PV** — *Planned Value*, nilai pekerjaan yang **seharusnya** selesai
- **EV** — *Earned Value*, nilai pekerjaan yang **benar-benar** selesai
- **AC** — *Actual Cost*, uang yang **sudah** dikeluarkan

Kuncinya: **EV diukur dengan harga rencana**, bukan harga sebenarnya. Paket kerja beranggaran sepuluh juta yang selesai seluruhnya bernilai EV sepuluh juta — entah biayanya delapan juta atau dua puluh lima juta.

Itulah yang membuat perbandingannya masuk akal.

**Dua selisih, dua indeks**

| Ukuran | Rumus | Artinya kalau negatif / di bawah satu |
|---|---|---|
| **SV** | \`EV - PV\` | terlambat |
| **CV** | \`EV - AC\` | kebablasan biaya |
| **SPI** | \`EV / PV\` | terlambat |
| **CPI** | \`EV / AC\` | kebablasan biaya |

Indeksnya lebih berguna karena **tanpa satuan** — bisa dibandingkan antar proyek dan antar waktu.

Bacaan cepatnya: **CPI 0,83 berarti tiap seribu rupiah yang dikeluarkan menghasilkan 830 rupiah pekerjaan.**

**Pola yang paling berguna diketahui**

Pada proyek nyata, **CPI cenderung menetap** begitu sekitar seperlima pekerjaan berjalan, dan jarang membaik dengan sendirinya.

Akibatnya penting: janji *"nanti kami kejar"* hampir selalu tidak terbukti. Kalau CPI 0,83 di bulan ketiga, ia masih sekitar 0,83 di bulan kesembilan.

**Ramalan biaya akhir**

- **naif** — \`EAC = BAC\`, mengandaikan sisanya sesuai anggaran
- **pakai CPI** — \`EAC = BAC / CPI\`, mengandaikan borosnya berlanjut
- **CPI dan SPI** — \`EAC = AC + (BAC - EV) / (CPI x SPI)\`, mengandaikan borosnya **dan** terlambatnya

Turunannya: **ETC** = \`EAC - AC\` (sisa biaya), dan **VAC** = \`BAC - EAC\` (selisih akhir; negatif berarti kekurangan).

Cara naif hampir selalu salah, dan ia yang paling sering dipakai — karena ia satu-satunya yang tidak menghasilkan kabar buruk.

**TCPI: apakah targetnya masih mungkin**

\`TCPI = (BAC - EV) / (BAC - AC)\`

Ia efisiensi yang harus dicapai pada **sisa** pekerjaan supaya anggarannya tetap terpenuhi.

Bandingkan dengan CPI yang **sudah** tercapai. Kalau TCPI jauh di atasnya, targetnya bukan menantang — ia **mustahil**. Yang harus diubah anggarannya atau lingkupnya, bukan tekanan ke timnya.

**Cara mengukur EV harus disepakati dulu**

| Aturan | Saat mulai | Saat selesai | Catatan |
|---|---|---|---|
| **0/100** | 0% | 100% | paling jujur, tapi kasar |
| **50/50** | 50% | 100% | kompromi yang lazim |
| **persen** | menurut laporan tim | | paling rawan |

Aturan **0/100** membuat paket yang belum selesai bernilai nol. Terasa kejam, dan justru itu gunanya: ia **menghapus** laporan "90 persen selesai".

Syaratnya paket kerjanya harus **kecil**. Kalau satu paket makan tiga bulan, aturan 0/100 membuat grafiknya datar terlalu lama untuk berguna.

**Batasnya**

SPI punya kelemahan yang harus diketahui: **ia kembali ke 1,0 di akhir proyek**, bahkan proyek yang sangat terlambat — karena pada akhirnya \`EV = PV = BAC\`. Untuk mengukur keterlambatan mendekati akhir, pakai jadwal langsung, bukan SPI.

Dan EVM mengukur **kemajuan terhadap rencana**, bukan **nilai bagi pengguna**. Proyek bisa punya CPI 1,0 sempurna sambil membangun hal yang tidak dibutuhkan siapa pun.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# CPI MENETAP, DAN ITU MERAMALKAN SEGALANYA\n#\n#   bln     SPI     CPI\n#     1   0.750   0.833\n#     2   0.780   0.848\n#     3   0.776   0.825\n#     4   0.783   0.833\n#     5   0.778   0.820\n#     6   0.800   0.828\n#\n# Enam bulan, CPI hampir tidak bergerak: 0.82-0.85.\n#\n# Dari bulan 6 (40% selesai, Rp 145 juta terpakai):\n#   EAC = BAC / CPI  = Rp 362.500.000\n#   VAC = BAC - EAC  = Rp -62.500.000  (kurang 21%)\n#   TCPI             = 1.161\n#\n# Sisanya harus dikerjakan dengan efisiensi 1.161,\n# padahal timnya belum pernah melewati 0.85.',
      penjelasan: `
Kolom CPI di tabel itu memuat temuan paling berguna dari seluruh Earned Value, dan ia mudah terlewat karena angkanya **tidak berubah**.

Perhatikan: 0,833 lalu 0,848 lalu 0,825 lalu 0,833 lalu 0,820 lalu 0,828. Enam bulan, dan ia bergoyang dalam rentang tiga persen.

Pola ini bukan kebetulan pada proyek ini. Ia **lazim diamati pada proyek nyata**: begitu sekitar seperlima pekerjaan berjalan, CPI menetap dan jarang membaik dengan sendirinya.

Kenapa? Karena CPI mengukur sesuatu yang **struktural**, bukan sesuatu yang berubah dari hari ke hari.

Kalau CPI 0,83, penyebabnya biasanya salah satu dari beberapa hal yang **tidak akan hilang sendiri**: estimasi awalnya terlalu murah, timnya kurang berpengalaman untuk pekerjaan ini, produktivitasnya tergerus rapat dan gangguan, atau perkakasnya menghambat.

Tidak satu pun dari itu berubah karena bulan berganti.

Sekarang lihat akibatnya pada satu percakapan yang terjadi di hampir setiap proyek.

Di bulan keenam, kabar buruknya sampai ke pimpinan: uang terpakai 145 juta dari 300 juta, tetapi pekerjaannya baru 40 persen. Tim berjanji: *"nanti kami kejar di paruh kedua."*

Janji itu terasa masuk akal. Timnya sudah lebih paham sistemnya sekarang, hambatan awal sudah lewat, dan semua orang bersungguh-sungguh.

Tetapi tabelnya sudah menjawab. CPI tidak membaik di bulan kedua, ketiga, keempat, kelima, atau keenam. Tidak ada alasan menduga ia membaik di bulan ketujuh — dan menduga sebaliknya berarti mengandaikan sesuatu yang **belum pernah terjadi** akan mulai terjadi.

Sekarang hitung apa artinya kalau CPI tetap 0,828.

Anggaran 300 juta dibagi 0,828 memberi **362,5 juta**. Kekurangannya 62,5 juta — **21 persen** dari anggaran.

Dan kalau keterlambatannya juga diperhitungkan, angkanya menjadi **416,9 juta**. Kekurangannya 39 persen.

Perhatikan **kapan** angka itu tersedia: bulan keenam dari dua belas. Masih ada separuh proyek untuk berbuat sesuatu.

Tanpa EVM, kabar yang sama datang di bulan kesebelas, ketika uangnya sudah hampir habis dan pilihannya tinggal dua — keduanya buruk.

Sekarang TCPI, yang mengubah percakapannya dari perdebatan menjadi hitungan.

Sisa pekerjaan bernilai 180 juta. Sisa uang 155 juta. Untuk tetap pas anggaran, sisanya harus dikerjakan dengan efisiensi \`180/155 = 1,161\`.

Bandingkan dengan yang sudah tercapai: **0,828**.

Timnya diminta bekerja **1,4 kali lebih efisien** daripada yang pernah mereka capai — bukan sesekali, melainkan **sepanjang sisa proyek**.

Itu bukan target yang menantang. Itu target yang **mustahil**, dan sekarang kata "mustahil" punya angka di belakangnya.

Dan di situlah nilai sesungguhnya dari perhitungan ini. Ia memindahkan percakapan dari *"apakah tim cukup berusaha"* menjadi *"anggarannya kurang 21 persen, atau lingkupnya harus dipotong sekian"*.

Pertanyaan kedua bisa dijawab. Yang pertama cuma menghasilkan tekanan, dan tekanan pada tim yang CPI-nya sudah 0,83 biasanya **menurunkannya lebih lanjut** — karena yang pertama dikorbankan pengujian dan peninjauan kode, dan keduanya kembali sebagai pengerjaan ulang.

Satu peringatan tentang SPI yang harus diketahui sebelum memakainya.

SPI **selalu kembali ke 1,0 di akhir proyek**, bahkan proyek yang terlambat berbulan-bulan. Sebabnya aritmetis: pada akhirnya seluruh pekerjaan selesai, jadi \`EV = PV = BAC\`, jadi \`SPI = 1\`.

Artinya SPI berguna di paruh awal dan **menyesatkan** menjelang akhir. Untuk mengukur keterlambatan di tahap akhir, bandingkan tanggal langsung — bukan indeksnya.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Earned Value: mengukur kemajuan dengan jujur
# ============================================

# --------------------------------------------
# 1. Kenapa "80% selesai" tidak berarti apa-apa
# --------------------------------------------
print("--- laporan yang biasa didengar ---")
LAPOR = [
    ("Modul login",      "95% selesai"),
    ("Modul transaksi",  "80% selesai"),
    ("Modul laporan",    "70% selesai"),
    ("Integrasi",        "hampir selesai"),
]
for a, b in LAPOR:
    print("  " + a.ljust(20) + b)
print("")
print("  Tiga masalah dengan laporan seperti ini:")
print("  - tidak bisa diperiksa siapa pun")
print("  - tidak menyebut apakah biayanya masih wajar")
print("  - tidak menyebut apakah jadwalnya masih tercapai")
print("")
print("  Dan yang paling sering terjadi: '90% selesai' bertahan")
print("  selama berminggu-minggu. Earned Value menghapus")
print("  masalah ini dengan mengubah kemajuan menjadi UANG.")

# --------------------------------------------
# 2. Tiga angka dasar
# --------------------------------------------
print("")
print("--- tiga angka, itu saja ---")
DASAR = [
    ("PV", "Planned Value",  "nilai pekerjaan yang SEHARUSNYA selesai"),
    ("EV", "Earned Value",   "nilai pekerjaan yang BENAR-BENAR selesai"),
    ("AC", "Actual Cost",    "uang yang SUDAH dikeluarkan"),
]
for k, n, arti in DASAR:
    print("  " + k.ljust(4) + n.ljust(16) + arti)
print("")
print("  Kuncinya: EV diukur dengan HARGA RENCANA, bukan harga")
print("  sebenarnya. Jadi kalau paket kerja beranggaran 10 juta")
print("  selesai seluruhnya, EV-nya 10 juta -- entah biayanya")
print("  8 juta atau 25 juta. Itu yang membuat perbandingannya")
print("  masuk akal.")

# --------------------------------------------
# 3. Satu proyek, dipantau enam bulan
# --------------------------------------------
BAC = 300_000_000        # Budget At Completion
# bulan: (PV kumulatif, persen pekerjaan benar-benar selesai, AC kumulatif)
JALAN = [
    (1,  20_000_000, 0.05,  18_000_000),
    (2,  50_000_000, 0.13,  46_000_000),
    (3,  85_000_000, 0.22,  80_000_000),
    (4, 115_000_000, 0.30, 108_000_000),
    (5, 135_000_000, 0.35, 128_000_000),
    (6, 150_000_000, 0.40, 145_000_000),
]

print("")
print("--- pemantauan bulanan (anggaran total Rp 300 juta) ---")
print("  " + "bln".rjust(4) + "PV".rjust(14) + "EV".rjust(14)
      + "AC".rjust(14) + "  SV".rjust(15) + "CV".rjust(15))
for bln, pv, persen, ac in JALAN:
    ev = BAC * persen
    sv = ev - pv
    cv = ev - ac
    print("  " + str(bln).rjust(4)
          + f"{pv:>14,}".replace(",", ".")
          + f"{int(ev):>14,}".replace(",", ".")
          + f"{ac:>14,}".replace(",", ".")
          + f"{int(sv):>15,}".replace(",", ".")
          + f"{int(cv):>15,}".replace(",", "."))
print("")
print("  SV = EV - PV  -> negatif berarti TERLAMBAT")
print("  CV = EV - AC  -> negatif berarti KEBABLASAN BIAYA")

# --------------------------------------------
# 4. Ubah jadi indeks supaya bisa dibandingkan
# --------------------------------------------
print("")
print("--- indeks: angka tanpa satuan, mudah dibaca ---")
print("  " + "bln".rjust(4) + "SPI".rjust(8) + "CPI".rjust(8)
      + "   arti")
for bln, pv, persen, ac in JALAN:
    ev = BAC * persen
    spi = ev / pv
    cpi = ev / ac
    if spi >= 1 and cpi >= 1:
        arti = "sehat"
    elif spi < 1 and cpi < 1:
        arti = "terlambat DAN kebablasan"
    elif spi < 1:
        arti = "terlambat, biaya masih wajar"
    else:
        arti = "cepat, tapi mahal"
    print("  " + str(bln).rjust(4) + ("%.3f" % spi).rjust(8)
          + ("%.3f" % cpi).rjust(8) + "   " + arti)
print("")
print("  SPI = EV / PV   1,0 = tepat jadwal")
print("  CPI = EV / AC   1,0 = tepat anggaran")
print("")
cpi_awal = (BAC * JALAN[1][2]) / JALAN[1][3]
cpi_akhir = (BAC * JALAN[-1][2]) / JALAN[-1][3]
print("  Bacaan cepat: CPI " + ("%.2f" % cpi_akhir)
      + " berarti tiap Rp 1.000 yang")
print("  dikeluarkan cuma menghasilkan Rp "
      + ("%.0f" % (cpi_akhir * 1000)) + " pekerjaan.")
print("")
print("  Perhatikan kolom CPI: dari bulan 2 (" + ("%.3f" % cpi_awal)
      + ") sampai bulan 6")
print("  (" + ("%.3f" % cpi_akhir) + ") ia hampir TIDAK BERGERAK.")
print("  Pola ini lazim diamati pada proyek nyata: begitu")
print("  seperlima pekerjaan berjalan, CPI cenderung menetap")
print("  dan jarang membaik dengan sendirinya.")
print("")
print("  Akibatnya penting: janji 'nanti kami kejar' hampir")
print("  selalu tidak terbukti. Kalau CPI 0,83 di bulan 3, ia")
print("  masih sekitar 0,83 di bulan 9.")

# --------------------------------------------
# 5. Ramalan: berapa biaya akhirnya nanti
# --------------------------------------------
bln, pv, persen, ac = JALAN[-1]
ev = BAC * persen
spi = ev / pv
cpi = ev / ac

print("")
print("--- ramalan dari bulan " + str(bln) + " ---")
print("  sudah selesai        : " + ("%.0f%%" % (persen * 100)))
print("  sudah dikeluarkan    : Rp " + f"{ac:,}".replace(",", "."))
print("  anggaran total       : Rp " + f"{BAC:,}".replace(",", "."))
print("")
eac_naif = BAC
eac_cpi = BAC / cpi
eac_gabung = ac + (BAC - ev) / (cpi * spi)
CARA = [
    ("Naif (masih cukup)",  eac_naif,   "andaikan sisanya sesuai anggaran"),
    ("Pakai CPI",           eac_cpi,    "andaikan borosnya berlanjut"),
    ("CPI dan SPI",         eac_gabung, "andaikan borosnya DAN terlambatnya"),
]
print("  " + "cara meramal".ljust(20) + "EAC".rjust(16))
for nama, v, catat in CARA:
    print("  " + nama.ljust(20) + f"{int(v):>16,}".replace(",", "."))
    print("      andaian: " + catat)

print("")
etc = eac_cpi - ac
vac = BAC - eac_cpi
print("  ETC (sisa biaya)  : Rp " + f"{int(etc):,}".replace(",", "."))
print("  VAC (selisih)     : Rp " + f"{int(vac):,}".replace(",", ".")
      + ("  KEKURANGAN" if vac < 0 else "  sisa"))
print("")
print("  Kekurangannya " + ("%.0f%%" % (abs(vac) / BAC * 100))
      + " dari anggaran, dan itu sudah bisa")
print("  dilihat di bulan " + str(bln) + " dari 12 -- bukan di akhir proyek.")
print("  Inilah gunanya EVM: kabar buruknya datang saat masih")
print("  ada waktu untuk berbuat sesuatu.")

# --------------------------------------------
# 6. TCPI: seberapa hemat sisanya harus dikerjakan
# --------------------------------------------
print("")
print("--- TCPI: apakah target masih mungkin? ---")
tcpi = (BAC - ev) / (BAC - ac)
print("  sisa pekerjaan  : Rp " + f"{int(BAC - ev):,}".replace(",", "."))
print("  sisa uang       : Rp " + f"{int(BAC - ac):,}".replace(",", "."))
print("  TCPI            : " + ("%.3f" % tcpi))
print("  CPI sejauh ini  : " + ("%.3f" % cpi))
print("")
if BAC - ac <= 0:
    print("  Sisa uangnya sudah NOL atau minus. Target anggaran")
    print("  mustahil dicapai, apa pun yang dilakukan.")
else:
    print("  Untuk tetap pas anggaran, sisanya harus dikerjakan")
    print("  dengan efisiensi " + ("%.3f" % tcpi) + " -- padahal sejauh ini")
    print("  timnya cuma mencapai " + ("%.3f" % cpi) + ".")
print("")
print("  Aturan praktis: kalau TCPI jauh di atas CPI yang")
print("  sudah tercapai, targetnya bukan menantang -- ia")
print("  MUSTAHIL. Yang harus diubah anggarannya atau")
print("  lingkupnya, bukan tekanan ke timnya.")

# --------------------------------------------
# 7. Kenapa cara mengukur EV harus disepakati dulu
# --------------------------------------------
print("")
print("--- tiga cara mengukur EV satu paket kerja ---")
ATURAN = [
    ("0/100",     0.0, 1.0,  "paling jujur, tapi kasar"),
    ("50/50",     0.5, 1.0,  "50% saat mulai, 50% saat selesai"),
    ("persen",    None, None, "menurut laporan tim -- paling rawan"),
]
print("  " + "aturan".ljust(10) + "saat mulai".rjust(12)
      + "saat selesai".rjust(14) + "  catatan")
for nama, mulai, selesai, catat in ATURAN:
    m = "-" if mulai is None else ("%.0f%%" % (mulai * 100))
    s = "-" if selesai is None else ("%.0f%%" % (selesai * 100))
    print("  " + nama.ljust(10) + m.rjust(12) + s.rjust(14)
          + "  " + catat)
print("")
print("  Aturan 0/100 membuat paket yang belum selesai bernilai")
print("  NOL. Terasa kejam, dan justru itu gunanya: ia menghapus")
print("  laporan '90% selesai' yang bertahan berminggu-minggu.")
print("")
print("  Syaratnya paket kerjanya harus KECIL -- kalau satu")
print("  paket makan tiga bulan, aturan 0/100 membuat grafiknya")
print("  datar terlalu lama untuk berguna.")` },
  output: `--- laporan yang biasa didengar ---
  Modul login         95% selesai
  Modul transaksi     80% selesai
  Modul laporan       70% selesai
  Integrasi           hampir selesai

  Tiga masalah dengan laporan seperti ini:
  - tidak bisa diperiksa siapa pun
  - tidak menyebut apakah biayanya masih wajar
  - tidak menyebut apakah jadwalnya masih tercapai

  Dan yang paling sering terjadi: '90% selesai' bertahan
  selama berminggu-minggu. Earned Value menghapus
  masalah ini dengan mengubah kemajuan menjadi UANG.

--- tiga angka, itu saja ---
  PV  Planned Value   nilai pekerjaan yang SEHARUSNYA selesai
  EV  Earned Value    nilai pekerjaan yang BENAR-BENAR selesai
  AC  Actual Cost     uang yang SUDAH dikeluarkan

  Kuncinya: EV diukur dengan HARGA RENCANA, bukan harga
  sebenarnya. Jadi kalau paket kerja beranggaran 10 juta
  selesai seluruhnya, EV-nya 10 juta -- entah biayanya
  8 juta atau 25 juta. Itu yang membuat perbandingannya
  masuk akal.

--- pemantauan bulanan (anggaran total Rp 300 juta) ---
   bln            PV            EV            AC             SV             CV
     1    20.000.000    15.000.000    18.000.000     -5.000.000     -3.000.000
     2    50.000.000    39.000.000    46.000.000    -11.000.000     -7.000.000
     3    85.000.000    66.000.000    80.000.000    -19.000.000    -14.000.000
     4   115.000.000    90.000.000   108.000.000    -25.000.000    -18.000.000
     5   135.000.000   105.000.000   128.000.000    -30.000.000    -23.000.000
     6   150.000.000   120.000.000   145.000.000    -30.000.000    -25.000.000

  SV = EV - PV  -> negatif berarti TERLAMBAT
  CV = EV - AC  -> negatif berarti KEBABLASAN BIAYA

--- indeks: angka tanpa satuan, mudah dibaca ---
   bln     SPI     CPI   arti
     1   0.750   0.833   terlambat DAN kebablasan
     2   0.780   0.848   terlambat DAN kebablasan
     3   0.776   0.825   terlambat DAN kebablasan
     4   0.783   0.833   terlambat DAN kebablasan
     5   0.778   0.820   terlambat DAN kebablasan
     6   0.800   0.828   terlambat DAN kebablasan

  SPI = EV / PV   1,0 = tepat jadwal
  CPI = EV / AC   1,0 = tepat anggaran

  Bacaan cepat: CPI 0.83 berarti tiap Rp 1.000 yang
  dikeluarkan cuma menghasilkan Rp 828 pekerjaan.

  Perhatikan kolom CPI: dari bulan 2 (0.848) sampai bulan 6
  (0.828) ia hampir TIDAK BERGERAK.
  Pola ini lazim diamati pada proyek nyata: begitu
  seperlima pekerjaan berjalan, CPI cenderung menetap
  dan jarang membaik dengan sendirinya.

  Akibatnya penting: janji 'nanti kami kejar' hampir
  selalu tidak terbukti. Kalau CPI 0,83 di bulan 3, ia
  masih sekitar 0,83 di bulan 9.

--- ramalan dari bulan 6 ---
  sudah selesai        : 40%
  sudah dikeluarkan    : Rp 145.000.000
  anggaran total       : Rp 300.000.000

  cara meramal                     EAC
  Naif (masih cukup)       300.000.000
      andaian: andaikan sisanya sesuai anggaran
  Pakai CPI                362.500.000
      andaian: andaikan borosnya berlanjut
  CPI dan SPI              416.875.000
      andaian: andaikan borosnya DAN terlambatnya

  ETC (sisa biaya)  : Rp 217.500.000
  VAC (selisih)     : Rp -62.500.000  KEKURANGAN

  Kekurangannya 21% dari anggaran, dan itu sudah bisa
  dilihat di bulan 6 dari 12 -- bukan di akhir proyek.
  Inilah gunanya EVM: kabar buruknya datang saat masih
  ada waktu untuk berbuat sesuatu.

--- TCPI: apakah target masih mungkin? ---
  sisa pekerjaan  : Rp 180.000.000
  sisa uang       : Rp 155.000.000
  TCPI            : 1.161
  CPI sejauh ini  : 0.828

  Untuk tetap pas anggaran, sisanya harus dikerjakan
  dengan efisiensi 1.161 -- padahal sejauh ini
  timnya cuma mencapai 0.828.

  Aturan praktis: kalau TCPI jauh di atas CPI yang
  sudah tercapai, targetnya bukan menantang -- ia
  MUSTAHIL. Yang harus diubah anggarannya atau
  lingkupnya, bukan tekanan ke timnya.

--- tiga cara mengukur EV satu paket kerja ---
  aturan      saat mulai  saat selesai  catatan
  0/100               0%          100%  paling jujur, tapi kasar
  50/50              50%          100%  50% saat mulai, 50% saat selesai
  persen               -             -  menurut laporan tim -- paling rawan

  Aturan 0/100 membuat paket yang belum selesai bernilai
  NOL. Terasa kejam, dan justru itu gunanya: ia menghapus
  laporan '90% selesai' yang bertahan berminggu-minggu.

  Syaratnya paket kerjanya harus KECIL -- kalau satu
  paket makan tiga bulan, aturan 0/100 membuat grafiknya
  datar terlalu lama untuk berguna.`,

  kesalahanUmum: [
    {
      salah: 'Melaporkan kemajuan sebagai persentase menurut perasaan tim.',
      kenapa: 'Angka itu tidak bisa diperiksa siapa pun dan tidak menyebut biaya maupun jadwal, sehingga laporan sembilan puluh persen selesai bisa bertahan berminggu-minggu tanpa ada yang bisa membuktikannya salah.',
      benar: 'Ukur kemajuan sebagai nilai pekerjaan yang selesai menurut harga rencananya, dan sepakati aturan pengukurannya sebelum proyek berjalan.'
    },
    {
      salah: 'Meramalkan biaya akhir dengan mengandaikan sisa pekerjaan akan sesuai anggaran.',
      kenapa: 'CPI cenderung menetap begitu seperlima pekerjaan berjalan, sehingga mengandaikan efisiensi tiba-tiba membaik berarti mengandaikan sesuatu yang belum pernah terjadi akan mulai terjadi. Cara naif ini paling sering dipakai justru karena ia satu-satunya yang tidak menghasilkan kabar buruk.',
      benar: 'Ramalkan dengan membagi anggaran total dengan CPI yang sudah tercapai, dan sebutkan andaian di baliknya.'
    },
    {
      salah: 'Menanggapi CPI yang rendah dengan menambah tekanan ke tim.',
      kenapa: 'Penyebab CPI rendah biasanya struktural: estimasi yang terlalu murah, pengalaman yang kurang, atau perkakas yang menghambat. Tekanan tidak menyentuh satu pun dari itu, dan biasanya yang dikorbankan pengujian serta peninjauan kode, yang kembali sebagai pengerjaan ulang.',
      benar: 'Pakai TCPI untuk menunjukkan apakah targetnya masih mungkin, lalu bahas pengurangan lingkup atau penambahan anggaran.'
    },
    {
      salah: 'Memakai SPI untuk menilai keterlambatan di tahap akhir proyek.',
      kenapa: 'SPI selalu kembali ke satu di akhir proyek karena seluruh pekerjaan akhirnya selesai sehingga nilai yang diperoleh sama dengan nilai yang direncanakan. Proyek yang terlambat berbulan-bulan akan menunjukkan SPI satu, dan itu menyesatkan.',
      benar: 'Bandingkan tanggal penyelesaian langsung untuk tahap akhir, dan pakai SPI hanya di paruh awal proyek.'
    },
    {
      salah: 'Menetapkan aturan pengukuran EV setelah proyek berjalan.',
      kenapa: 'Aturan 0/100, 50/50, dan persentase memberi angka yang berbeda untuk pekerjaan yang sama, sehingga memilihnya belakangan memungkinkan aturan yang hasilnya paling menyenangkan yang dipilih. Angka yang bisa dipilih setelah melihat hasilnya berhenti menjadi ukuran.',
      benar: 'Sepakati aturan pengukurannya di dokumen perencanaan, sebelum satu paket kerja pun dimulai.'
    },
    {
      salah: 'Memakai aturan 0/100 untuk paket kerja yang berdurasi berbulan-bulan.',
      kenapa: 'Aturan itu membuat paket yang belum selesai bernilai nol, sehingga grafik kemajuannya datar sepanjang durasi paket tersebut. Untuk paket tiga bulan, tidak ada informasi apa pun selama tiga bulan.',
      benar: 'Pecah paket kerja sampai berdurasi paling lama satu atau dua periode pelaporan, lalu pakai aturan 0/100 di atasnya.'
    },
    {
      salah: 'Menyimpulkan proyek berjalan baik hanya dari CPI dan SPI yang bagus.',
      kenapa: 'EVM mengukur kemajuan terhadap rencana, bukan nilai bagi pengguna. Proyek bisa mencapai CPI satu dengan sempurna sambil membangun sesuatu yang tidak dibutuhkan siapa pun, dan angkanya tetap terlihat sehat sampai serah terima.',
      benar: 'Laporkan CPI dan SPI bersama bukti bahwa hasilnya sudah ditinjau pengguna, bukan sebagai satu-satunya ukuran keberhasilan.'
    }
  ],

  analogi: `Bayangkan kamu **menyewa tukang untuk memasang keramik** seratus meter persegi, dengan upah lima juta.

Sebulan berjalan. Kamu bertanya sudah sejauh mana.

*"Sekitar delapan puluh persen, Pak."*

Angka itu tidak bisa kamu periksa, tidak bisa dibantah, dan tidak memberi tahu apa pun tentang uangmu.

Sekarang cara yang lain. Kamu **ukur keramiknya**.

Terpasang **empat puluh meter**. Dengan upah lima juta untuk seratus meter, artinya pekerjaan yang **benar-benar selesai** bernilai **dua juta**.

Sementara itu, uang yang **sudah keluar** — bahan, upah harian, tambahan — **dua koma empat juta**.

Sekarang kamu punya angka yang tidak bisa diperdebatkan: kamu **membayar dua koma empat juta untuk dua juta pekerjaan**. Tiap seribu rupiah menghasilkan 830 rupiah keramik.

Dan pertanyaan berikutnya bisa dijawab dengan hitungan, bukan perasaan.

Sisa pekerjaan **enam puluh meter**, bernilai tiga juta. Sisa uangmu **dua koma enam juta**.

Untuk selesai tanpa nambah uang, sisanya harus dikerjakan **lebih hemat** daripada yang sudah berjalan — padahal sebulan ini tidak pernah begitu.

Jadi kamu tahu, **sekarang**, bahwa uangnya akan kurang sekitar empat ratus ribu. Bukan nanti saat keramik habis di meter kedelapan puluh.

Dan perhatikan apa yang berubah dari percakapannya. Bukan lagi *"tukangnya kurang rajin"*. Melainkan: **"uangnya kurang empat ratus ribu, atau kita pasang delapan puluh meter dulu."**

Yang kedua bisa diputuskan. Yang pertama cuma bikin tukangnya tersinggung dan kerjanya makin cepat asal-asalan.`,

  latihan: [
    'Jelaskan tiga masalah dari laporan kemajuan berbentuk persentase menurut perasaan tim.',
    'Untuk satu proyek, hitung PV, EV, dan AC pada enam periode, lalu hitung SV dan CV tiap periode.',
    'Hitung SPI dan CPI untuk keenam periode itu, dan jelaskan arti tiap kombinasi tanda.',
    'Jelaskan kenapa EV diukur dengan harga rencana, bukan harga sebenarnya.',
    'Perhatikan pergerakan CPI di datamu, lalu jelaskan apa artinya bagi janji akan dikejar di paruh kedua.',
    'Hitung EAC dengan tiga cara berbeda, lalu jelaskan andaian di balik masing-masing.',
    'Hitung ETC dan VAC, lalu nyatakan kekurangan atau kelebihannya sebagai persentase anggaran.',
    'Hitung TCPI, bandingkan dengan CPI yang sudah tercapai, dan simpulkan apakah targetnya masih mungkin.',
    'Bandingkan aturan 0/100, 50/50, dan persentase pada satu paket kerja yang sama, lalu jelaskan kenapa aturannya harus disepakati lebih dulu.',
    'Jelaskan kenapa SPI kembali ke satu di akhir proyek, dan apa yang harus dipakai sebagai gantinya.'
  ]
});


TOPICS.push({
  id: 'mpi-agile',
  judul: 'Agile, Scrum & Kanban',
  kategori: 'mpi',
  tag: ['Scrum', 'sprint', 'velocity', 'burndown', 'Kanban', 'batas WIP', 'titik cerita'],
  ringkas: 'Mengerjakan empat puluh hal sekaligus tidak menyelesaikan lebih banyak — hanya membuat semuanya menunggu lebih lama.',

  fungsi: `**Bekerja ketika kebutuhannya belum bisa diketahui lengkap di awal.**

Terpakai di:

- **Tugas akhir** yang arahnya masih berubah sepanjang pengerjaan
- **Tugas kelompok** — sprint dua pekan jauh lebih mudah dijaga
- **Kerja nyata** — Scrum dan Kanban sudah jadi cara kerja yang lazim
- **Wawancara kerja** — hampir selalu ditanyakan

Yang paling langsung bisa dipakai hari ini: **batasi jumlah pekerjaan yang berjalan bersamaan.**

Laju penyelesaian ditentukan kemampuan tim, bukan jumlah yang dikerjakan. Mengerjakan empat puluh hal sekaligus tidak menyelesaikan lebih banyak — ia cuma membuat semuanya menunggu lebih lama, dan pekerjaan setengah jadi bernilai **nol**.

Dan aturan yang sering dilanggar: **velocity bukan ukuran kinerja tim.** Begitu dipakai menilai orang, angkanya naik tanpa pekerjaannya bertambah.`,

  praktik: {
    tujuan: `Kamu bisa menjalankan satu sprint dengan benar, meramalkan sisa pekerjaan sebagai rentang, dan menerapkan batas WIP.`,
    alat: [
      'Papan kerja — Trello, GitHub Projects, atau kertas tempel',
      'Satu proyek nyata atau tugas kelompok'
    ],
    langkah: [
      { judul: 'Putuskan dulu apakah agile memang cocok',
        isi: `Dua pertanyaan: seberapa **pasti** kebutuhannya, dan seberapa **mahal** memperbaiki arah yang salah.

Kalau kebutuhannya sudah pasti dan kontraknya berlingkup tetap, kamu membayar harga agile tanpa mendapat apa pun.` },
      { judul: 'Estimasi dengan titik, bukan jam',
        isi: `Pakai deret 1, 2, 3, 5, 8, 13, 21.

Jaraknya melebar dengan sengaja: beda 1 dan 2 nyata, beda 20 dan 21 tidak bisa dibedakan siapa pun. Deret ini menolak ketelitian yang tidak kita punya.` },
      { judul: 'Jalankan satu sprint dengan panjang tetap',
        isi: `Dua pekan adalah pilihan yang lazim.

Aturan yang tidak boleh dilanggar: **jangan diperpanjang**. Panjang yang tetap itulah satu-satunya hal yang membuat velocity bisa dibandingkan.` },
      { judul: 'Catat velocity beberapa sprint',
        isi: `Titik yang **benar-benar selesai**, bukan yang dikerjakan.

Setelah tiga sampai lima sprint, kamu punya cukup data untuk meramal. Sebelum itu, angkanya belum berarti.` },
      { judul: 'Ramalkan sebagai rentang, bukan satu angka',
        isi: `Bagi sisa titik dengan velocity tertinggi, rata-rata, dan terendah.

Selisihnya biasanya beberapa sprint. Laporkan begini: *"antara 6 dan 11 sprint, paling mungkin 8"*.` },
      { judul: 'Gambar burndown dan baca di hari ketiga',
        isi: `Sisa titik terhadap hari, dengan garis ideal sebagai pembanding.

Gunanya bukan melapor ke atasan. Gunanya membuat ketertinggalan terlihat di **hari ketiga**, saat masih bisa dibicarakan.` },
      { judul: 'Kembalikan yang belum selesai ke backlog',
        isi: `Bukan diperpanjang sprintnya.

Terasa seperti kegagalan, dan justru itu gunanya: ia membuat kapasitas tim terlihat apa adanya, bukan disamarkan lewat lembur.` },
      { judul: 'Tetapkan batas WIP di papan kerjamu',
        isi: `Angka di atas tiap kolom. Mulai dari sekitar satu setengah kali jumlah orang di tahap itu.

Ketika kolom penuh, tidak ada yang boleh masuk — dan orang yang selesai harus **membantu mengosongkan kolom berikutnya**, bukan mulai yang baru.` },
      { judul: 'Buktikan hukum Little dengan datamu',
        isi: `- \`waktu tuntas = jumlah berjalan / laju selesai\`

Hitung untuk beberapa nilai WIP. Lajunya sama; yang berubah cuma berapa lama tiap butir menunggu.` },
      { judul: 'Perhatikan hambatan yang muncul di papan',
        isi: `Kalau satu kolom selalu penuh, itu bukan keluhan yang harus dipercayai — itu **fakta yang terpampang**.

Di situlah kamu perlu menambah orang atau mengubah caranya, dan sekarang kamu tahu di mana tanpa menebak.` },
      { judul: 'Jalankan Retrospective, jangan dilewati',
        isi: `Ia satu-satunya acara yang memperbaiki **prosesnya**; yang lain menjalankan proses yang sudah ada.

Hasilkan **satu** perbaikan yang dikerjakan sprint berikutnya. Satu yang dikerjakan lebih berguna daripada sepuluh yang dicatat.` }
    ],
    cek: [
      'Sprintmu berakhir tepat waktu, dengan sisanya dikembalikan ke backlog',
      'Ramalanmu dilaporkan sebagai rentang, bukan satu angka',
      'Papan kerjamu punya angka batas di setiap kolom, dan batas itu ditaati'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa membatasi pekerjaan mempercepatnya',

  konsep: `
Metodologi berurutan mengandaikan kebutuhan bisa diketahui lengkap di awal. Kalau andaian itu benar, ia cara yang efisien. Kalau salah, seluruh rencananya dibangun di atas pemahaman yang keliru — dan itu baru ketahuan di akhir.

Agile membeli **kemampuan berubah arah** dengan harga perencanaan jangka panjang yang lebih kabur.

**Yang menentukan pilihan**

Bukan mana yang lebih modern. Dua hal:

- **seberapa pasti** kebutuhannya
- **seberapa mahal** memperbaiki arah yang salah

| Keadaan | Cocok |
|---|---|
| Kebutuhan sudah pasti dan tertulis | berurutan |
| Kebutuhan masih diperdebatkan | agile |
| Kontrak harga tetap, lingkup tetap | berurutan |
| Pengguna bisa dilibatkan tiap pekan | agile |
| Pengguna hanya ada di awal dan akhir | berurutan |
| Salah arah mahal diperbaiki | berurutan |

Kalau kebutuhannya sudah pasti, kamu membayar harga agile **tanpa mendapat apa pun**.

**Titik cerita, bukan jam**

Masalah estimasi jam: ia **menyatukan dua hal berbeda** — seberapa besar pekerjaannya, dan seberapa cepat orangnya. Yang pertama sifat pekerjaan; yang kedua berbeda tiap orang dan tiap hari.

Titik cerita mengukur **besar saja**. Kecepatan diukur terpisah lewat velocity, dari data nyata.

Deret yang lazim: **1, 2, 3, 5, 8, 13, 21**. Jaraknya melebar, dan itu disengaja. Beda antara 1 dan 2 titik nyata; beda antara 20 dan 21 tidak bisa dibedakan siapa pun. Deret ini **menolak ketelitian yang sebenarnya tidak kita punya**.

**Velocity: satu angka tidak cukup**

Velocity adalah titik yang benar-benar selesai per sprint. Ia berguna untuk meramal — tetapi hanya kalau **sebarannya** ikut dilaporkan.

Delapan sprint dengan velocity 19 sampai 34 memberi ramalan yang **berbeda lima sprint** tergantung angka mana yang dipakai. Menyebut satu angka menyembunyikan seluruh ketidakpastian itu.

Cara melaporkan yang jujur: *"antara 6 dan 11 sprint, paling mungkin 8"*.

Dan aturan yang sering dilanggar: **velocity bukan ukuran kinerja tim.** Begitu ia dipakai menilai orang, angkanya akan naik tanpa pekerjaannya bertambah — karena estimasinya yang digelembungkan.

**Burndown**

Grafik sisa titik terhadap hari. Garis nyata di atas garis ideal berarti tertinggal.

Gunanya **bukan** melaporkan ke atasan. Gunanya membuat ketertinggalan terlihat **di hari ketiga**, saat masih bisa dibicarakan — bukan di hari kesembilan.

Dan kalau sprint berakhir dengan pekerjaan belum selesai, yang benar: **sisanya dikembalikan ke backlog**, bukan sprintnya diperpanjang. Panjang sprint yang tetap itulah yang membuat velocity bisa dibandingkan.

**Scrum ringkas**

- **Peran** — *Product Owner* memutuskan **apa** dan urutannya; *Scrum Master* menjaga prosesnya, bukan atasan; *Tim Pengembang* memutuskan **bagaimana** dan berapa
- **Artefak** — *Product Backlog*, *Sprint Backlog*, *Increment* yang **bisa dipakai**
- **Acara** — *Sprint Planning*, *Daily Scrum*, *Sprint Review*, *Retrospective*

Dua hal yang paling sering keliru dijalankan:

**Daily Scrum berubah menjadi laporan ke atasan.** Kalau isinya menjelaskan diri masing-masing, bukan mengurai hambatan bersama, acaranya sudah kehilangan gunanya.

**Retrospective dilewati karena tidak ada waktu.** Ia satu-satunya acara yang memperbaiki **prosesnya**, jadi melewatinya berarti mengulangi kesalahan yang sama sprint demi sprint.

**Kanban dan batas WIP**

Kanban tidak memakai sprint. Ia membatasi **berapa banyak pekerjaan yang boleh berjalan bersamaan** di tiap tahap.

Hukum Little menjelaskan kenapa itu bekerja:

\`waktu tuntas = jumlah berjalan / laju selesai\`

Kalau tim menyelesaikan lima butir per pekan, maka sepuluh butir berjalan berarti waktu tuntas dua pekan; empat puluh butir berjalan berarti **delapan pekan**.

**Laju penyelesaiannya sama.** Yang berubah cuma berapa banyak yang menunggu.

Mengerjakan empat puluh hal sekaligus tidak membuat tim menyelesaikan lebih banyak — ia cuma membuat setiap hal menunggu lebih lama. Dan karena berpindah-pindah pekerjaan punya biayanya sendiri, lajunya biasanya justru **menurun**.

**Biaya berpindah tugas**

Kehilangan naik **lebih cepat** daripada jumlah tugasnya. Sebabnya bukan cuma waktu berpindah: tiap perpindahan **menghapus konteks** yang sudah dibangun di kepala, dan membangunnya kembali butuh waktu yang tidak tercatat di mana pun.

**Menggabungkan dengan pengendalian klasik**

Agile dan EVM tidak bertentangan. Titik cerita bisa dijadikan satuan EV, dan velocity dijadikan laju penyelesaiannya. Yang berubah bukan cara mengukurnya, melainkan **seberapa jauh ke depan rencananya dirinci**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# HUKUM LITTLE: BATAS WIP MEMPERCEPAT PENYELESAIAN\n#\n# waktu tuntas = jumlah berjalan / laju selesai\n#\n# Laju tim: 5 butir per pekan (SAMA di semua baris)\n#\n#   berjalan (WIP)   waktu tuntas\n#                5      1.0 pekan\n#               10      2.0 pekan\n#               20      4.0 pekan\n#               40      8.0 pekan\n#\n# Tidak ada yang bekerja lebih lambat.\n# Yang berubah cuma berapa banyak yang MENUNGGU.\n#\n# Dan karena berpindah tugas punya biayanya sendiri,\n# laju di baris bawah biasanya justru MENURUN.',
      penjelasan: `
Batas WIP terasa berlawanan dengan naluri. Kalau timmu mampu mengerjakan banyak hal, kenapa dilarang?

Jawabannya ada di hukum Little, dan ia bisa dilihat tanpa rumus apa pun.

Bayangkan sebuah kasir yang melayani **lima orang per pekan**. Itu lajunya, dan ia ditentukan oleh kecepatan kasirnya — bukan oleh panjang antreannya.

Sekarang, kalau ada **empat puluh orang** mengantre, berapa lama orang terakhir menunggu?

Delapan pekan. Bukan karena kasirnya melambat — ia tetap lima per pekan. Melainkan karena ada tiga puluh sembilan orang di depannya.

Sekarang perhatikan pertanyaan yang sesungguhnya penting: **apa yang didapat dari membiarkan empat puluh orang mengantre, dibanding sepuluh?**

Tidak ada. Kasirnya tetap menyelesaikan lima per pekan. Yang bertambah cuma **jumlah orang yang menunggu**, dan **berapa lama** masing-masing menunggu.

Di pekerjaan pengembangan, "mengantre" berarti pekerjaan yang **sudah dimulai tapi belum selesai**. Dan di situ ada tiga hal yang membuatnya lebih buruk daripada antrean kasir.

**Pertama, pekerjaan yang belum selesai tidak bernilai apa pun.** Sepuluh fitur yang masing-masing setengah jadi bernilai **nol** bagi pengguna. Lima fitur yang selesai bernilai lima fitur. Laju yang sama, nilai yang tersampaikan sangat berbeda.

**Kedua, pekerjaan yang menggantung membusuk.** Kode yang setengah jadi harus digabungkan dengan kode orang lain yang terus berubah. Makin lama menggantung, makin banyak konflik dan makin besar pengerjaan ulangnya. Ini biaya yang tidak ada di antrean kasir.

**Ketiga, dan yang paling merusak: laju itu tidak benar-benar tetap.**

Antrean kasir tidak membuat kasirnya melambat. Tetapi pekerjaan yang berjalan bersamaan **membuat timnya melambat** — karena orang yang sama mengerjakan beberapa hal, dan tiap perpindahan menghapus konteks yang sudah dibangun.

Perhatikan tabel biaya berpindah tugas: dari satu tugas ke lima tugas, waktu produktifnya turun dari 100 persen menjadi sekitar 25 persen. Kehilangan naik **lebih cepat** daripada jumlah tugasnya.

Jadi baris terbawah tabel Little sesungguhnya lebih buruk dari 8 pekan. Lajunya bukan tetap lima — ia **turun**, dan waktu tuntasnya melar lebih jauh lagi.

Sekarang cara memakainya, dan ia sederhana sampai terasa mengecewakan.

**Tetapkan angka batas untuk tiap tahap papan kerjamu.** Kolom "sedang dikerjakan" berbatas, katakan, dua per orang. Kolom "menunggu peninjauan" berbatas tiga.

Ketika sebuah kolom penuh, **tidak ada yang boleh masuk**. Dan di sinilah bagian yang mengubah cara kerja tim.

Kalau kolom peninjauan penuh dan kamu selesai mengerjakan sesuatu, kamu **tidak boleh mulai yang baru**. Yang harus kamu lakukan: **membantu mengosongkan kolom peninjauan.**

Perhatikan apa yang baru saja terjadi. Batas WIP mengubah dorongan alaminya dari *"mulai lebih banyak"* menjadi **"selesaikan yang ada"**. Dan ia melakukannya tanpa satu pun rapat atau teguran — cuma dengan satu angka di atas kolom.

Efek sampingnya yang paling berharga: **hambatan jadi terlihat.** Kalau kolom peninjauan selalu penuh, itu bukan keluhan yang harus dipercayai — itu **fakta yang terpampang di papan**. Dan kamu jadi tahu di mana harus menambah orang, bukan menebaknya.

Satu peringatan. Batas yang terlalu ketat membuat orang **menganggur** menunggu pekerjaan berikutnya. Tidak ada rumus untuk angka yang tepat; caranya mulai dari sekitar satu setengah kali jumlah orang di tahap itu, lalu sesuaikan dari apa yang terjadi.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Agile, Scrum, dan Kanban untuk proyek TI
# ============================================
import math, random

# --------------------------------------------
# 1. Kapan waterfall, kapan agile
# --------------------------------------------
print("--- yang menentukan pilihan metodologi ---")
PILIH = [
    ("Kebutuhan sudah pasti dan tertulis", "waterfall", "agile"),
    ("Kebutuhan masih diperdebatkan",      "agile",     "waterfall"),
    ("Kontrak harga tetap, lingkup tetap", "waterfall", "agile"),
    ("Pengguna bisa dilibatkan tiap pekan","agile",     "waterfall"),
    ("Pengguna cuma ada di awal & akhir",  "waterfall", "agile"),
    ("Salah arah mahal diperbaiki",        "waterfall", "agile"),
    ("Salah arah murah diperbaiki",        "agile",     "waterfall"),
]
print("  " + "keadaan".ljust(38) + "cocok".ljust(12) + "kurang cocok")
for keadaan, cocok, kurang in PILIH:
    print("  " + keadaan.ljust(38) + cocok.ljust(12) + kurang)
print("")
print("  Yang menentukan bukan mana yang lebih modern.")
print("  Yang menentukan: SEBERAPA PASTI kebutuhannya, dan")
print("  SEBERAPA MAHAL memperbaiki arah yang salah.")
print("")
print("  Agile membeli kemampuan berubah arah dengan harga")
print("  perencanaan jangka panjang yang lebih kabur. Kalau")
print("  kebutuhannya sudah pasti, kamu membayar tanpa")
print("  mendapat apa pun.")

# --------------------------------------------
# 2. Kenapa titik cerita, bukan jam
# --------------------------------------------
print("")
print("--- estimasi dalam jam vs titik cerita ---")
print("  Masalah estimasi jam: ia menyatukan dua hal yang")
print("  berbeda -- seberapa BESAR pekerjaannya, dan seberapa")
print("  CEPAT orangnya. Yang pertama sifat pekerjaan; yang")
print("  kedua berbeda tiap orang dan tiap hari.")
print("")
print("  Titik cerita mengukur BESAR saja. Kecepatan diukur")
print("  terpisah lewat velocity, dari data nyata.")
print("")
FIBO = [1, 2, 3, 5, 8, 13, 21]
print("  Deret yang lazim dipakai: " + ", ".join(map(str, FIBO)))
print("")
print("  " + "beda".rjust(8) + "  dari -> ke" + "     beda relatif".rjust(18))
for i in range(len(FIBO) - 1):
    a, b = FIBO[i], FIBO[i + 1]
    print("  " + str(b - a).rjust(8) + "  " + (str(a) + " -> " + str(b)).ljust(12)
          + ("%.0f%%" % ((b - a) / a * 100)).rjust(16))
print("")
print("  Jaraknya melebar, dan itu disengaja. Beda antara 1 dan")
print("  2 titik nyata; beda antara 20 dan 21 tidak bisa")
print("  dibedakan siapa pun. Deret ini menolak ketelitian")
print("  yang sebenarnya tidak kita punya.")

# --------------------------------------------
# 3. Velocity: satu angka tidak cukup
# --------------------------------------------
VELOCITY = [23, 31, 27, 19, 34, 28, 25, 30]
def rata(d): return sum(d) / len(d)
def sbaku(d):
    m = rata(d)
    return math.sqrt(sum((x - m) ** 2 for x in d) / (len(d) - 1))

print("")
print("--- velocity delapan sprint terakhir ---")
print("  " + " ".join(str(v).rjust(4) for v in VELOCITY))
print("")
print("  rata-rata      : " + ("%.1f" % rata(VELOCITY)) + " titik/sprint")
print("  terendah       : " + str(min(VELOCITY)))
print("  tertinggi      : " + str(max(VELOCITY)))
print("  simpangan baku : " + ("%.1f" % sbaku(VELOCITY)))

SISA = 200
print("")
print("--- ramalan: sisa " + str(SISA) + " titik, butuh berapa sprint? ---")
print("  " + "andaian velocity".ljust(26) + "sprint".rjust(8))
for nama, v in (("optimis (tertinggi)", max(VELOCITY)),
                ("rata-rata", rata(VELOCITY)),
                ("pesimis (terendah)", min(VELOCITY))):
    print("  " + nama.ljust(26) + str(math.ceil(SISA / v)).rjust(8))
print("")
print("  Selisih " + str(math.ceil(SISA / min(VELOCITY)) - math.ceil(SISA / max(VELOCITY)))
      + " sprint. Menyebut satu angka saja")
print("  menyembunyikan seluruh ketidakpastian ini.")
print("")
print("  Cara melaporkan yang jujur: 'antara "
      + str(math.ceil(SISA / max(VELOCITY))) + " dan "
      + str(math.ceil(SISA / min(VELOCITY))) + " sprint,")
print("  paling mungkin " + str(math.ceil(SISA / rata(VELOCITY))) + "'.")
print("")
print("  Dan satu aturan yang sering dilanggar: velocity BUKAN")
print("  ukuran kinerja tim. Begitu ia dipakai menilai orang,")
print("  angkanya akan naik tanpa pekerjaannya bertambah --")
print("  karena estimasinya yang digelembungkan.")

# --------------------------------------------
# 4. Burndown: kapan kelihatan tidak akan selesai
# --------------------------------------------
print("")
print("--- burndown satu sprint (2 pekan, 10 hari kerja) ---")
KOMITMEN = 30
NYATA = [30, 29, 27, 26, 24, 23, 20, 17, 13, 9, 6]
print("  " + "hari".rjust(5) + "ideal".rjust(8) + "nyata".rjust(8)
      + "  grafik")
for h in range(len(NYATA)):
    ideal = KOMITMEN * (1 - h / (len(NYATA) - 1))
    print("  " + str(h).rjust(5) + ("%.1f" % ideal).rjust(8)
          + str(NYATA[h]).rjust(8) + "  " + "#" * NYATA[h])
print("")
print("  Garis nyata di ATAS garis ideal berarti tertinggal.")
print("  Di hari 3 selisihnya sudah "
      + ("%.0f" % (NYATA[3] - KOMITMEN * (1 - 3 / 10))) + " titik --")
print("  dan itu sudah cukup untuk bertanya sekarang, bukan")
print("  di hari kesembilan.")
print("")
print("  Sprint ini berakhir dengan " + str(NYATA[-1])
      + " titik belum selesai.")
print("  Yang benar: sisanya dikembalikan ke backlog, BUKAN")
print("  sprintnya diperpanjang. Panjang sprint yang tetap")
print("  itulah yang membuat velocity bisa dibandingkan.")

# --------------------------------------------
# 5. Kanban: batas WIP dan hukum Little
# --------------------------------------------
print("")
print("--- kenapa membatasi pekerjaan yang berjalan ---")
print("  Hukum Little: waktu tuntas = jumlah berjalan / laju selesai")
print("")
laju = 5.0        # butir selesai per pekan
print("  laju penyelesaian tim: " + ("%.0f" % laju) + " butir/pekan")
print("")
print("  " + "berjalan (WIP)".rjust(15) + "waktu tuntas".rjust(15)
      + "  yang dirasakan pemesan")
for wip in (5, 10, 20, 40):
    w = wip / laju
    print("  " + str(wip).rjust(15) + ("%.1f pekan" % w).rjust(15)
          + "  " + ("cepat" if w <= 2 else
                    "lumayan" if w <= 4 else "lama sekali"))
print("")
print("  Laju penyelesaiannya SAMA di semua baris. Yang berubah")
print("  cuma berapa banyak yang dikerjakan bersamaan.")
print("")
print("  Mengerjakan 40 hal sekaligus tidak membuat tim lebih")
print("  produktif -- ia cuma membuat setiap hal menunggu lebih")
print("  lama. Dan karena berpindah-pindah pekerjaan punya")
print("  biayanya sendiri, lajunya biasanya justru MENURUN.")

# --------------------------------------------
# 6. Biaya berpindah tugas
# --------------------------------------------
print("")
print("--- biaya berpindah-pindah tugas ---")
print("  " + "tugas bersamaan".rjust(16) + "waktu produktif".rjust(18)
      + "hilang".rjust(9))
for n, produktif in ((1, 1.00), (2, 0.80), (3, 0.60), (4, 0.40), (5, 0.25)):
    print("  " + str(n).rjust(16) + ("%.0f%%" % (produktif * 100)).rjust(18)
          + ("%.0f%%" % ((1 - produktif) * 100)).rjust(9))
print("")
print("  Angka ini perkiraan yang lazim dikutip, bukan hasil")
print("  pengukuran di tim tertentu. Yang nyata bentuknya:")
print("  kehilangan naik LEBIH CEPAT daripada jumlah tugasnya.")
print("")
print("  Sebabnya bukan cuma waktu berpindah. Tiap perpindahan")
print("  menghapus konteks yang sudah dibangun di kepala, dan")
print("  membangunnya kembali butuh waktu yang tidak tercatat")
print("  di mana pun.")

# --------------------------------------------
# 7. Peran, artefak, dan acara Scrum
# --------------------------------------------
print("")
print("--- Scrum ringkas ---")
BAGIAN = [
    ("Peran", [
        ("Product Owner", "memutuskan APA dan urutannya"),
        ("Scrum Master",  "menjaga prosesnya, bukan atasan"),
        ("Tim Pengembang","memutuskan BAGAIMANA dan berapa"),
    ]),
    ("Artefak", [
        ("Product Backlog", "semua yang mungkin dikerjakan, terurut"),
        ("Sprint Backlog",  "yang dipilih untuk sprint ini"),
        ("Increment",       "hasil yang BISA DIPAKAI di akhir sprint"),
    ]),
    ("Acara", [
        ("Sprint Planning", "memilih dan merencanakan"),
        ("Daily Scrum",     "15 menit, menyelaraskan, bukan lapor ke atasan"),
        ("Sprint Review",   "menunjukkan hasil ke pemangku kepentingan"),
        ("Retrospective",   "memperbaiki cara kerjanya"),
    ]),
]
for judul, isi in BAGIAN:
    print("  " + judul)
    for a, b in isi:
        print("    " + a.ljust(18) + b)
print("")
print("  Dua hal yang paling sering keliru dijalankan:")
print("")
print("  Daily Scrum berubah menjadi laporan ke atasan. Kalau")
print("  isinya menjelaskan diri masing-masing, bukan mengurai")
print("  hambatan bersama, acaranya sudah kehilangan gunanya.")
print("")
print("  Retrospective dilewati karena 'tidak ada waktu'. Ia")
print("  satu-satunya acara yang memperbaiki PROSESNYA, jadi")
print("  melewatinya berarti mengulangi kesalahan yang sama")
print("  sprint demi sprint.")` },
  output: `--- yang menentukan pilihan metodologi ---
  keadaan                               cocok       kurang cocok
  Kebutuhan sudah pasti dan tertulis    waterfall   agile
  Kebutuhan masih diperdebatkan         agile       waterfall
  Kontrak harga tetap, lingkup tetap    waterfall   agile
  Pengguna bisa dilibatkan tiap pekan   agile       waterfall
  Pengguna cuma ada di awal & akhir     waterfall   agile
  Salah arah mahal diperbaiki           waterfall   agile
  Salah arah murah diperbaiki           agile       waterfall

  Yang menentukan bukan mana yang lebih modern.
  Yang menentukan: SEBERAPA PASTI kebutuhannya, dan
  SEBERAPA MAHAL memperbaiki arah yang salah.

  Agile membeli kemampuan berubah arah dengan harga
  perencanaan jangka panjang yang lebih kabur. Kalau
  kebutuhannya sudah pasti, kamu membayar tanpa
  mendapat apa pun.

--- estimasi dalam jam vs titik cerita ---
  Masalah estimasi jam: ia menyatukan dua hal yang
  berbeda -- seberapa BESAR pekerjaannya, dan seberapa
  CEPAT orangnya. Yang pertama sifat pekerjaan; yang
  kedua berbeda tiap orang dan tiap hari.

  Titik cerita mengukur BESAR saja. Kecepatan diukur
  terpisah lewat velocity, dari data nyata.

  Deret yang lazim dipakai: 1, 2, 3, 5, 8, 13, 21

      beda  dari -> ke      beda relatif
         1  1 -> 2                  100%
         1  2 -> 3                   50%
         2  3 -> 5                   67%
         3  5 -> 8                   60%
         5  8 -> 13                  62%
         8  13 -> 21                 62%

  Jaraknya melebar, dan itu disengaja. Beda antara 1 dan
  2 titik nyata; beda antara 20 dan 21 tidak bisa
  dibedakan siapa pun. Deret ini menolak ketelitian
  yang sebenarnya tidak kita punya.

--- velocity delapan sprint terakhir ---
    23   31   27   19   34   28   25   30

  rata-rata      : 27.1 titik/sprint
  terendah       : 19
  tertinggi      : 34
  simpangan baku : 4.8

--- ramalan: sisa 200 titik, butuh berapa sprint? ---
  andaian velocity            sprint
  optimis (tertinggi)              6
  rata-rata                        8
  pesimis (terendah)              11

  Selisih 5 sprint. Menyebut satu angka saja
  menyembunyikan seluruh ketidakpastian ini.

  Cara melaporkan yang jujur: 'antara 6 dan 11 sprint,
  paling mungkin 8'.

  Dan satu aturan yang sering dilanggar: velocity BUKAN
  ukuran kinerja tim. Begitu ia dipakai menilai orang,
  angkanya akan naik tanpa pekerjaannya bertambah --
  karena estimasinya yang digelembungkan.

--- burndown satu sprint (2 pekan, 10 hari kerja) ---
   hari   ideal   nyata  grafik
      0    30.0      30  ##############################
      1    27.0      29  #############################
      2    24.0      27  ###########################
      3    21.0      26  ##########################
      4    18.0      24  ########################
      5    15.0      23  #######################
      6    12.0      20  ####################
      7     9.0      17  #################
      8     6.0      13  #############
      9     3.0       9  #########
     10     0.0       6  ######

  Garis nyata di ATAS garis ideal berarti tertinggal.
  Di hari 3 selisihnya sudah 5 titik --
  dan itu sudah cukup untuk bertanya sekarang, bukan
  di hari kesembilan.

  Sprint ini berakhir dengan 6 titik belum selesai.
  Yang benar: sisanya dikembalikan ke backlog, BUKAN
  sprintnya diperpanjang. Panjang sprint yang tetap
  itulah yang membuat velocity bisa dibandingkan.

--- kenapa membatasi pekerjaan yang berjalan ---
  Hukum Little: waktu tuntas = jumlah berjalan / laju selesai

  laju penyelesaian tim: 5 butir/pekan

   berjalan (WIP)   waktu tuntas  yang dirasakan pemesan
                5      1.0 pekan  cepat
               10      2.0 pekan  cepat
               20      4.0 pekan  lumayan
               40      8.0 pekan  lama sekali

  Laju penyelesaiannya SAMA di semua baris. Yang berubah
  cuma berapa banyak yang dikerjakan bersamaan.

  Mengerjakan 40 hal sekaligus tidak membuat tim lebih
  produktif -- ia cuma membuat setiap hal menunggu lebih
  lama. Dan karena berpindah-pindah pekerjaan punya
  biayanya sendiri, lajunya biasanya justru MENURUN.

--- biaya berpindah-pindah tugas ---
   tugas bersamaan   waktu produktif   hilang
                 1              100%       0%
                 2               80%      20%
                 3               60%      40%
                 4               40%      60%
                 5               25%      75%

  Angka ini perkiraan yang lazim dikutip, bukan hasil
  pengukuran di tim tertentu. Yang nyata bentuknya:
  kehilangan naik LEBIH CEPAT daripada jumlah tugasnya.

  Sebabnya bukan cuma waktu berpindah. Tiap perpindahan
  menghapus konteks yang sudah dibangun di kepala, dan
  membangunnya kembali butuh waktu yang tidak tercatat
  di mana pun.

--- Scrum ringkas ---
  Peran
    Product Owner     memutuskan APA dan urutannya
    Scrum Master      menjaga prosesnya, bukan atasan
    Tim Pengembang    memutuskan BAGAIMANA dan berapa
  Artefak
    Product Backlog   semua yang mungkin dikerjakan, terurut
    Sprint Backlog    yang dipilih untuk sprint ini
    Increment         hasil yang BISA DIPAKAI di akhir sprint
  Acara
    Sprint Planning   memilih dan merencanakan
    Daily Scrum       15 menit, menyelaraskan, bukan lapor ke atasan
    Sprint Review     menunjukkan hasil ke pemangku kepentingan
    Retrospective     memperbaiki cara kerjanya

  Dua hal yang paling sering keliru dijalankan:

  Daily Scrum berubah menjadi laporan ke atasan. Kalau
  isinya menjelaskan diri masing-masing, bukan mengurai
  hambatan bersama, acaranya sudah kehilangan gunanya.

  Retrospective dilewati karena 'tidak ada waktu'. Ia
  satu-satunya acara yang memperbaiki PROSESNYA, jadi
  melewatinya berarti mengulangi kesalahan yang sama
  sprint demi sprint.`,

  kesalahanUmum: [
    {
      salah: 'Memilih agile karena dianggap lebih modern daripada metode berurutan.',
      kenapa: 'Agile membeli kemampuan berubah arah dengan harga perencanaan jangka panjang yang lebih kabur. Kalau kebutuhannya sudah pasti dan kontraknya berlingkup tetap, harga itu dibayar tanpa mendapat manfaat apa pun.',
      benar: 'Pilih berdasarkan seberapa pasti kebutuhannya dan seberapa mahal memperbaiki arah yang salah.'
    },
    {
      salah: 'Memakai velocity sebagai ukuran kinerja tim.',
      kenapa: 'Titik cerita ditetapkan oleh tim itu sendiri, sehingga begitu angkanya dipakai menilai orang, estimasinya akan digelembungkan. Velocity naik tanpa pekerjaan yang selesai bertambah, dan ia berhenti berguna untuk meramal.',
      benar: 'Pakai velocity hanya untuk meramal kapasitas, dan nilai tim dari hasil yang dipakai pengguna.'
    },
    {
      salah: 'Meramalkan sisa pekerjaan dengan satu angka velocity rata-rata.',
      kenapa: 'Velocity berayun antar sprint, dan pada data delapan sprint selisih antara ramalan optimis dan pesimis bisa mencapai lima sprint. Satu angka menyembunyikan seluruh rentang itu dan akan diingat sebagai janji.',
      benar: 'Laporkan rentangnya, misalnya antara enam dan sebelas sprint dengan yang paling mungkin delapan.'
    },
    {
      salah: 'Memperpanjang sprint karena pekerjaannya belum selesai.',
      kenapa: 'Panjang sprint yang tetap adalah satu-satunya hal yang membuat velocity bisa dibandingkan antar sprint. Sekali diperpanjang, tidak ada lagi dasar untuk meramal kapasitas, dan tekanan untuk memperpanjang akan berulang.',
      benar: 'Akhiri sprint tepat waktu dan kembalikan pekerjaan yang belum selesai ke backlog.'
    },
    {
      salah: 'Menjalankan Daily Scrum sebagai laporan kemajuan ke atasan.',
      kenapa: 'Acara itu dirancang untuk menyelaraskan tim dan mengurai hambatan bersama. Ketika berubah menjadi laporan, tiap orang menjelaskan dirinya sendiri dan hambatan yang menyangkut dua orang tidak pernah terbahas.',
      benar: 'Fokuskan pada apa yang menghambat dan siapa yang butuh bantuan, dan pastikan Scrum Master bukan atasan yang menilai.'
    },
    {
      salah: 'Melewatkan Retrospective karena dianggap tidak menghasilkan apa-apa.',
      kenapa: 'Ia satu-satunya acara yang memperbaiki cara kerjanya, sedangkan acara lain menjalankan cara kerja yang sudah ada. Melewatinya berarti kesalahan yang sama terulang sprint demi sprint tanpa ada yang menghentikannya.',
      benar: 'Jalankan Retrospective setiap sprint dan hasilkan satu perbaikan yang dikerjakan pada sprint berikutnya.'
    },
    {
      salah: 'Membiarkan tim mengerjakan banyak hal sekaligus supaya tidak ada yang menganggur.',
      kenapa: 'Laju penyelesaian ditentukan kemampuan tim, bukan jumlah pekerjaan yang berjalan, sehingga menambah pekerjaan bersamaan hanya memperpanjang waktu tuntas tiap butirnya. Pekerjaan yang setengah jadi bernilai nol bagi pengguna, dan makin lama menggantung makin besar pengerjaan ulangnya.',
      benar: 'Tetapkan batas jumlah pekerjaan yang boleh berjalan di tiap tahap, dan arahkan orang yang selesai untuk membantu tahap yang penuh.'
    },
    {
      salah: 'Mengestimasi pekerjaan dalam jam agar lebih tepat.',
      kenapa: 'Estimasi jam menyatukan besar pekerjaan dengan kecepatan orang yang mengerjakannya, padahal yang kedua berbeda tiap orang dan tiap hari. Akibatnya estimasi harus diulang setiap kali penugasannya berubah, dan ketelitiannya semu.',
      benar: 'Estimasi besar pekerjaannya dengan titik cerita, lalu ukur kecepatan tim secara terpisah lewat velocity dari data nyata.'
    }
  ],

  analogi: `Bayangkan **satu tukang cukur** yang bisa melayani lima orang sehari.

Datang empat puluh orang. Semuanya dipersilakan masuk, duduk di kursi, dan handuknya dipasang.

Sekarang salon itu penuh empat puluh orang dengan handuk di leher, dan **tidak ada satu pun yang rambutnya selesai**.

Tukangnya tetap melayani lima orang sehari. Orang keempat puluh pulang **delapan hari** kemudian.

Sekarang bandingkan dengan cara lain: **hanya lima orang boleh masuk**, sisanya diberi nomor dan pulang dulu.

Tukangnya masih melayani lima orang sehari. Tapi sekarang lima orang **selesai hari ini** dan pulang dengan rambut rapi.

Laju yang sama. Hasil yang sama sekali berbeda.

Dan tiga hal yang membuat cara pertama lebih buruk lagi.

**Rambut setengah dipotong tidak berguna bagi siapa pun.** Empat puluh orang dengan potongan setengah jadi bernilai nol; lima orang selesai bernilai lima.

**Yang menunggu terlalu lama berubah pikiran.** Orang yang duduk delapan hari mungkin sudah ingin model lain — dan bagian yang sudah dipotong jadi salah.

**Dan tukangnya jadi melambat.** Karena ia berpindah dari kepala ke kepala, harus mengingat lagi model apa yang diminta masing-masing.

Batas WIP itu cuma **papan kecil di pintu**: *"maksimal lima orang di dalam."*

Papan itu tidak mempercepat tukangnya sedikit pun. Ia cuma memastikan orang **pulang membawa hasil**, bukan menunggu di dalam.`,

  latihan: [
    'Sebutkan dua hal yang menentukan pilihan antara metode berurutan dan agile, lalu terapkan pada satu proyek nyata.',
    'Jelaskan kenapa estimasi dalam jam menyatukan dua hal yang seharusnya dipisah.',
    'Hitung beda relatif antar angka pada deret 1, 2, 3, 5, 8, 13, 21, lalu jelaskan kenapa jaraknya melebar.',
    'Ambil delapan angka velocity, lalu hitung ramalan optimis, rata-rata, dan pesimis untuk sisa dua ratus titik.',
    'Tulis satu kalimat laporan ramalan yang jujur, yang menyertakan rentangnya.',
    'Jelaskan apa yang terjadi pada velocity kalau ia dipakai untuk menilai kinerja tim.',
    'Gambar burndown satu sprint, lalu tentukan hari ke berapa ketertinggalannya sudah cukup untuk dibicarakan.',
    'Hitung waktu tuntas dengan hukum Little untuk empat nilai WIP berbeda pada laju yang sama.',
    'Jelaskan tiga alasan kenapa pekerjaan yang berjalan bersamaan lebih merugikan daripada antrean di kasir.',
    'Tetapkan batas WIP untuk papan kerja timmu, lalu jelaskan apa yang harus dilakukan orang yang selesai ketika tahap berikutnya penuh.'
  ]
});
