/* ============================================================
   ads.js — materi Analisis & Desain Sistem (Semester 3)

   Disusun dari berkas projek kuliah sendiri:
     - DOKUMEN WAWANCARA SISTEM (KELOMPOK 1).pdf
     - USER REQUIREMENT SYSTEM (KELOMPOK 1).pdf
     - SOFTWARE REQUIREMENT SPECIFICATION (KELOMPOK 1).pdf
     - Laporan Final Project ADS.docx  -- sistem "MAHASISWA-PRO"
     - TUGAS UML ADS_KELOMPOK 3_*.docx
     - Berkas .drawio: USE CASE, ACTIVITY, CLASS, SEQUENCE
     - Analisis Mockup Sistem Pendaftaran Kegiatan Mahasiswa.pptx

   Urutan berkas itu sendiri menggambarkan alur mata kuliahnya:
   wawancara -> kebutuhan pengguna -> SRS -> UML -> mockup.
   Materi di sini mengikuti urutan yang sama.

   Diagram digambar sebagai seni ASCII di blok kode, karena
   situs ini tidak memuat gambar.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Notasi".
   ============================================================ */

TOPICS.push({
  id: 'ads-kebutuhan',
  judul: 'Analisis Kebutuhan & SRS',
  kategori: 'ads',
  tag: ['kebutuhan', 'SRS', 'wawancara', 'fungsional', 'non-fungsional', 'stakeholder'],
  ringkas: 'Mencari tahu apa yang sebenarnya dibutuhkan — bagian yang paling sering dilewati dan paling mahal kalau salah.',

  fungsi: `**Menemukan apa yang sebenarnya dibutuhkan pengguna, sebelum menulis satu baris kode.**

Terpakai di:

- **Bab awal tugas akhir** — analisis kebutuhan hampir selalu diminta
- **Kerja praktik** — memahami apa yang diminta perusahaan
- **Menghindari membangun yang salah** — kesalahan termahal di seluruh proyek
- **Rekayasa Perangkat Lunak** — SRS adalah keluaran tahap ini

Kesalahan yang paling mahal bukan bug, melainkan **membangun sesuatu yang benar tetapi tidak dibutuhkan**.

Dan penyebab tersering: **menerima permintaan apa adanya tanpa menanyakan masalah di baliknya.** Pengguna sering meminta solusi yang ia bayangkan, bukan menceritakan masalahnya.`,

  praktik: {
    tujuan: `Kamu punya daftar kebutuhan yang bisa diuji dan bisa dibantah, hasil wawancara nyata dengan calon pengguna.`,
    alat: [
      'Perekam suara dengan izin',
      'Kertas atau aplikasi catatan'
    ],
    langkah: [
      { judul: 'Tanyakan masalah, bukan fitur',
        isi: `Kalau pengguna bilang *"saya butuh tombol ekspor Excel"*, tanyakan **kenapa**.

Sering jawabannya: *"supaya bisa saya kirim ke atasan tiap Senin"* — dan solusi yang lebih baik mungkin laporan otomatis lewat surel, bukan tombol ekspor.

Bertanya "kenapa" tiga kali biasanya sampai ke masalah yang sebenarnya.` },
      { judul: 'Amati, jangan cuma bertanya',
        isi: `Minta izin melihat pengguna mengerjakan pekerjaannya sekarang.

Kamu akan menemukan langkah yang **tidak pernah mereka sebutkan** karena sudah terbiasa — dan sering di situlah masalah terbesarnya.

Satu jam mengamati sering lebih berharga daripada tiga jam wawancara.` },
      { judul: 'Pisahkan fungsional dan non-fungsional',
        isi: `- **Fungsional** — apa yang sistem lakukan
- **Non-fungsional** — seberapa baik: kecepatan, keamanan, ketersediaan, kemudahan

Yang kedua sering dilupakan, padahal ia yang menentukan sistemmu layak dipakai atau tidak. Pencarian yang benar tetapi butuh tiga puluh detik sama saja dengan tidak ada.` },
      { judul: 'Tulis kebutuhan yang BISA DIUJI',
        isi: `Buruk: *"sistem harus cepat"*.

Baik: *"hasil pencarian tampil dalam kurang dari dua detik untuk 100.000 data"*.

Ujinya sederhana: **bisakah kamu menulis kasus uji untuk kalimat itu?** Kalau tidak, kalimatnya belum cukup jelas.` },
      { judul: 'Tetapkan prioritas dengan MoSCoW',
        isi: `Bagi menjadi: **Must have**, **Should have**, **Could have**, **Won't have kali ini**.

Yang terakhir sama pentingnya — menuliskan apa yang **tidak** dikerjakan mencegah lingkupnya melebar diam-diam.

Minta pemangku kepentingan yang menentukan, bukan kamu.` },
      { judul: 'Kembalikan untuk dikonfirmasi',
        isi: `Tulis ulang pemahamanmu dan bacakan kepada penggunanya.

*"Jadi kalau saya paham benar, setiap Senin Bapak butuh rekap penjualan minggu lalu per wilayah, dalam bentuk yang bisa dicetak."*

Salah paham hampir selalu terungkap di langkah ini — dan menemukannya sekarang jauh lebih murah.` },
      { judul: 'Rancang decision table untuk aturan berlapis',
        isi: `Untuk aturan yang punya beberapa syarat, buat tabel semua kombinasinya seperti di Uji Kualitas Perangkat Lunak.

Sel yang **kosong** berarti aturannya belum ditetapkan siapa pun — dan itu pertanyaan yang harus kamu ajukan sekarang, bukan saat kode sudah jadi.` }
    ],
    cek: [
      'Setiap kebutuhanmu bisa kamu tulis kasus ujinya',
      'Kamu punya daftar hal yang sengaja TIDAK dikerjakan',
      'Pemahamanmu sudah dibacakan ulang dan disetujui penggunanya'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
Godaan terbesar saat menerima sebuah proyek adalah **langsung membuka editor dan mulai mengetik**. Analisis kebutuhan ada untuk menahan godaan itu.

Alasannya soal biaya. **Kesalahan yang ditemukan saat analisis** cukup diperbaiki dengan mengubah satu kalimat di dokumen. **Kesalahan yang sama ditemukan setelah sistem jadi** menuntut kode ditulis ulang, data dipindahkan, dan pengguna dilatih ulang.

Makin lambat sebuah kesalahan ditemukan, makin mahal memperbaikinya — dan kenaikannya bukan sedikit demi sedikit, melainkan berlipat di setiap tahap.

**Tahapan yang dilalui projekmu**

Urutan berkas di folder ADS-mu menggambarkannya:

- **Wawancara** — menggali dari pengguna sesungguhnya
- **User Requirement** — apa yang diinginkan pengguna, dalam bahasa mereka
- **SRS** — kebutuhan yang sudah dirumuskan secara teknis dan bisa diuji
- **UML** — pemodelan
- **Mockup** — rancangan tampilan

**Kebutuhan fungsional dan non-fungsional**

Ini pembedaan yang paling sering ditanyakan:

- **Fungsional** — **apa yang sistem lakukan**. *"Sistem dapat mengunggah proposal Proker."*
- **Non-fungsional** — **seberapa baik sistem melakukannya**. Kecepatan, keamanan, kemudahan pakai, ketersediaan.

Contoh non-fungsional: *"Halaman dashboard termuat dalam waktu kurang dari 3 detik untuk 100 pengguna bersamaan."*

**Kebutuhan non-fungsional paling sering dilupakan**, dan justru paling sering menjadi penyebab sistem ditolak pengguna. Sistem yang fiturnya lengkap tetapi butuh 30 detik untuk membuka satu halaman **tidak akan dipakai**, betapa pun lengkapnya.

**Ciri kebutuhan yang baik**

- **Bisa diuji** — ada cara memastikan ia terpenuhi. *"Sistemnya cepat"* tidak bisa diuji; *"termuat di bawah 3 detik"* bisa.
- **Tidak ambigu** — hanya punya satu tafsir
- **Konsisten** — tidak bertentangan dengan kebutuhan lain
- **Bisa dilacak** — jelas dari mana asalnya
- **Perlu** — ada yang benar-benar membutuhkannya

Uji paling sederhana: **kalau dua orang membaca kebutuhan itu dan membayangkan hal berbeda, kebutuhan itu belum selesai ditulis.**

**Menggali kebutuhan**

- **Wawancara** — paling dalam, tetapi butuh waktu
- **Kuesioner** — menjangkau banyak orang, tetapi dangkal
- **Observasi** — melihat langsung cara kerja mereka
- **Analisis dokumen** — memeriksa formulir dan laporan yang sudah dipakai
- **Prototipe** — menunjukkan rancangan untuk memancing tanggapan

**Kenapa observasi sering lebih jujur daripada wawancara?** Karena orang sering **menjelaskan cara kerja yang seharusnya**, bukan yang sebenarnya mereka lakukan. Wawancara mendapat versi resmi; observasi mendapat versi nyata — termasuk semua jalan pintas yang mereka pakai diam-diam.

**Stakeholder**

Semua pihak yang terpengaruh sistem: pengguna langsung, pihak yang mengambil keputusan, dan yang terkena akibatnya. **Melupakan satu kelompok** adalah penyebab kegagalan yang lazim, karena kebutuhannya baru muncul setelah sistem jadi.

**Scope creep**

Kebutuhan yang terus bertambah di tengah pengerjaan. Ditangani dengan **menetapkan ruang lingkup secara tertulis sejak awal** — persis yang dilakukan dokumen projekmu di bagian *Ruang Lingkup*.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# BURUK -- tidak bisa diuji, ambigu\n#   "Sistem harus cepat"\n#   "Tampilannya harus bagus"\n#   "Sistem harus aman"\n#\n# BAIK -- bisa diuji, satu tafsir\n#   "Halaman dashboard termuat < 3 detik\n#    untuk 100 pengguna bersamaan"\n#   "Kata sandi disimpan sebagai hash bcrypt"\n#   "Sistem dapat diakses 99% waktu dalam sebulan"\n#\n# Uji sederhana: kalau dua orang membacanya lalu\n# membayangkan hal BERBEDA, kebutuhannya belum selesai.',
      penjelasan: `
Perbedaan antara kedua kelompok itu bukan soal gaya bahasa — ia menentukan **apakah proyek bisa dinyatakan selesai**.

Bayangkan kamu menyerahkan sistem, lalu klien berkata *"ini belum cepat"*. Dengan kebutuhan yang berbunyi *"sistem harus cepat"*, **kamu tidak punya dasar apa pun** untuk membantah maupun menyetujui. Perdebatannya jadi soal selera, dan bisa berlangsung tanpa akhir.

Dengan kebutuhan yang berbunyi *"termuat di bawah 3 detik untuk 100 pengguna bersamaan"*, ada **cara memastikan**. Jalankan pengujiannya, lihat angkanya. Kalau 2,4 detik, kebutuhan itu **terpenuhi** — titik.

Ini yang dimaksud **bisa diuji**, dan ia melindungi kedua pihak: klien mendapat jaminan yang jelas, dan kamu mendapat batas yang jelas.

Perhatikan juga bahwa kebutuhan yang baik menyebutkan **keadaannya**. Bukan sekadar *"termuat di bawah 3 detik"*, melainkan *"untuk 100 pengguna bersamaan"*. Tanpa itu, sistem yang cepat saat diuji sendirian bisa **runtuh saat dipakai satu kelas sekaligus** — dan secara teknis kebutuhannya tetap terpenuhi.

Sekarang uji **ambiguitas**, yang paling praktis: minta dua orang membaca kebutuhan yang sama lalu **menggambarkan apa yang mereka bayangkan**. Kalau gambarannya berbeda, kalimatnya belum selesai.

Contoh yang sering terjadi: *"Sistem menampilkan laporan bulanan"*. Bulan berjalan atau bulan lalu? Otomatis atau saat diminta? Untuk seluruh organisasi atau per divisi? Satu kalimat, empat tafsir — dan keempatnya menghasilkan sistem yang berbeda.

Kalimat itu **terlihat jelas** sampai ada yang menanyakannya. Itulah yang membuat ambiguitas berbahaya: ia tidak terasa ambigu bagi penulisnya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menyusun kebutuhan dari projek MAHASISWA-PRO
# ============================================
import re

# ---------- Stakeholder: siapa saja yang terpengaruh ----------
STAKEHOLDER = [
    ("Ketua organisasi", "memantau progres seluruh Proker"),
    ("Ketua pelaksana",  "mengunggah proposal dan LPJ"),
    ("Anggota",          "melihat portofolio kontribusinya"),
    ("Pembina",          "memvalidasi laporan"),
    ("Pengurus baru",    "membaca arsip saat serah terima jabatan"),
]

print("--- stakeholder MAHASISWA-PRO ---")
for peran, kepentingan in STAKEHOLDER:
    print("  " + peran.ljust(18) + kepentingan)

print("")
print("  Melupakan SATU kelompok adalah penyebab kegagalan")
print("  yang lazim. 'Pengurus baru' mudah terlewat, padahal")
print("  serah terima jabatan justru tujuan utama sistem ini.")


# ============================================
# Fungsional vs non-fungsional
# ============================================
KEBUTUHAN = [
    ("F", "Sistem dapat mengunggah dokumen proposal Proker"),
    ("F", "Sistem dapat memperbarui status progres Proker"),
    ("F", "Sistem dapat menghasilkan portofolio per anggota"),
    ("F", "Sistem menampilkan statistik Proker selesai vs berjalan"),
    ("NF", "Dashboard termuat < 3 detik untuk 100 pengguna bersamaan"),
    ("NF", "Kata sandi disimpan sebagai hash bcrypt"),
    ("NF", "Berkas unggahan maksimal 10 MB, format PDF saja"),
    ("NF", "Sistem dapat diakses 99% waktu dalam sebulan"),
]

print("")
print("--- kebutuhan fungsional (APA yang dilakukan) ---")
for jenis, isi in KEBUTUHAN:
    if jenis == "F":
        print("  " + isi)

print("")
print("--- non-fungsional (SEBERAPA BAIK melakukannya) ---")
for jenis, isi in KEBUTUHAN:
    if jenis == "NF":
        print("  " + isi)


# ============================================
# Menguji apakah sebuah kebutuhan layak
# ============================================
def periksa(kalimat):
    """Deteksi kasar kata yang menandakan kebutuhan belum jelas.

    PERHATIKAN pemakaian \b (batas kata) di regex. Tanpa itu,
    pencocokan substring biasa akan menandai "Halaman" sebagai
    kata "aman" -- dan kebutuhan yang sudah baik ikut divonis
    kabur. Ini jebakan klasik pencocokan teks: substring tidak
    sama dengan kata.
    """
    KABUR = ["cepat", "bagus", "mudah", "aman", "banyak",
             "user friendly", "efisien", "optimal", "sesuai kebutuhan"]
    rendah = kalimat.lower()
    masalah = [k for k in KABUR
               if re.search(r"\b" + re.escape(k) + r"\b", rendah)]
    ada_angka = any(c.isdigit() for c in kalimat)
    return masalah, ada_angka


UJI = [
    "Sistem harus cepat",
    "Tampilannya harus user friendly",
    "Halaman dashboard termuat kurang dari 3 detik",
    "Sistem harus aman",
    "Kata sandi disimpan sebagai hash bcrypt dengan cost 12",
    "Sistem menampilkan laporan bulanan",
]

print("")
print("--- memeriksa kelayakan kebutuhan ---")
for kalimat in UJI:
    kabur, angka = periksa(kalimat)
    if kabur:
        catatan = "KABUR -- kata '" + kabur[0] + "' tidak bisa diuji"
    elif not angka and "hash" not in kalimat.lower():
        catatan = "AMBIGU -- bisa ditafsirkan lebih dari satu cara"
    else:
        catatan = "layak -- bisa diuji"
    print("  " + ("[" + ("!" if kabur or catatan.startswith("AMBIGU")
                         else "v") + "]") +
          " " + kalimat)
    print("      " + catatan)


# ============================================
# Kenapa "laporan bulanan" ambigu
# ============================================
print("")
print("--- satu kalimat, empat tafsir ---")
print("  \"Sistem menampilkan laporan bulanan\"")
print("")
TAFSIR = [
    "bulan berjalan, atau bulan yang sudah lewat?",
    "otomatis terkirim, atau ditampilkan saat diminta?",
    "seluruh organisasi, atau per divisi?",
    "isinya apa saja -- Proker, keuangan, kehadiran?",
]
for t in TAFSIR:
    print("    - " + t)
print("")
print("  Empat tafsir, empat sistem yang berbeda.")
print("  Kalimat itu TERLIHAT jelas sampai ada yang bertanya --")
print("  dan itulah yang membuat ambiguitas berbahaya:")
print("  ia tidak terasa ambigu bagi penulisnya.")


# ============================================
# Biaya memperbaiki kesalahan per tahap
# ============================================
print("")
print("--- biaya relatif memperbaiki satu kesalahan ---")
TAHAP = [
    ("Analisis kebutuhan", 1,    "ubah satu kalimat di dokumen"),
    ("Perancangan",        5,    "ubah diagram & rancangan"),
    ("Implementasi",      10,    "tulis ulang kode"),
    ("Pengujian",         20,    "kode + uji ulang"),
    ("Sudah dipakai",    100,    "kode + data + latih ulang pengguna"),
]
for nama, biaya, akibat in TAHAP:
    print("  " + nama.ljust(20) + (str(biaya) + "x").rjust(5) +
          "   " + akibat)
print("")
print("  Inilah alasan analisis kebutuhan tidak boleh dilewati,")
print("  betapa pun besarnya godaan untuk langsung mengetik kode.")`
  },

  output: `--- stakeholder MAHASISWA-PRO ---
  Ketua organisasi  memantau progres seluruh Proker
  Ketua pelaksana   mengunggah proposal dan LPJ
  Anggota           melihat portofolio kontribusinya
  Pembina           memvalidasi laporan
  Pengurus baru     membaca arsip saat serah terima jabatan

  Melupakan SATU kelompok adalah penyebab kegagalan
  yang lazim. 'Pengurus baru' mudah terlewat, padahal
  serah terima jabatan justru tujuan utama sistem ini.

--- kebutuhan fungsional (APA yang dilakukan) ---
  Sistem dapat mengunggah dokumen proposal Proker
  Sistem dapat memperbarui status progres Proker
  Sistem dapat menghasilkan portofolio per anggota
  Sistem menampilkan statistik Proker selesai vs berjalan

--- non-fungsional (SEBERAPA BAIK melakukannya) ---
  Dashboard termuat < 3 detik untuk 100 pengguna bersamaan
  Kata sandi disimpan sebagai hash bcrypt
  Berkas unggahan maksimal 10 MB, format PDF saja
  Sistem dapat diakses 99% waktu dalam sebulan

--- memeriksa kelayakan kebutuhan ---
  [!] Sistem harus cepat
      KABUR -- kata 'cepat' tidak bisa diuji
  [!] Tampilannya harus user friendly
      KABUR -- kata 'user friendly' tidak bisa diuji
  [v] Halaman dashboard termuat kurang dari 3 detik
      layak -- bisa diuji
  [!] Sistem harus aman
      KABUR -- kata 'aman' tidak bisa diuji
  [v] Kata sandi disimpan sebagai hash bcrypt dengan cost 12
      layak -- bisa diuji
  [!] Sistem menampilkan laporan bulanan
      AMBIGU -- bisa ditafsirkan lebih dari satu cara

--- satu kalimat, empat tafsir ---
  "Sistem menampilkan laporan bulanan"

    - bulan berjalan, atau bulan yang sudah lewat?
    - otomatis terkirim, atau ditampilkan saat diminta?
    - seluruh organisasi, atau per divisi?
    - isinya apa saja -- Proker, keuangan, kehadiran?

  Empat tafsir, empat sistem yang berbeda.
  Kalimat itu TERLIHAT jelas sampai ada yang bertanya --
  dan itulah yang membuat ambiguitas berbahaya:
  ia tidak terasa ambigu bagi penulisnya.

--- biaya relatif memperbaiki satu kesalahan ---
  Analisis kebutuhan      1x   ubah satu kalimat di dokumen
  Perancangan             5x   ubah diagram & rancangan
  Implementasi           10x   tulis ulang kode
  Pengujian              20x   kode + uji ulang
  Sudah dipakai         100x   kode + data + latih ulang pengguna

  Inilah alasan analisis kebutuhan tidak boleh dilewati,
  betapa pun besarnya godaan untuk langsung mengetik kode.`,

  kesalahanUmum: [
    {
      salah: 'Menulis kebutuhan dengan kata sifat seperti cepat, aman, atau user friendly.',
      kenapa: 'Kata-kata itu tidak bisa diuji, sehingga tidak ada cara memastikan kebutuhannya terpenuhi. Saat penyerahan, perdebatan berubah menjadi soal selera dan bisa berlangsung tanpa akhir, karena tidak ada satu pun angka yang bisa dijadikan rujukan bersama.',
      benar: 'Ganti dengan ukuran yang bisa diperiksa, misalnya termuat di bawah tiga detik untuk seratus pengguna bersamaan. Sertakan juga keadaan pengujiannya.'
    },
    {
      salah: 'Hanya menulis kebutuhan fungsional dan melupakan yang non-fungsional.',
      kenapa: 'Sistem dengan fitur lengkap tetapi butuh tiga puluh detik untuk membuka satu halaman tidak akan dipakai siapa pun. Kebutuhan non-fungsional justru paling sering menjadi penyebab sistem ditolak, dan karena tidak tertulis, tidak ada yang bisa dituntut saat itu terjadi.',
      benar: 'Untuk setiap fitur, tanyakan juga seberapa cepat, seberapa aman, dan berapa banyak pengguna bersamaan yang harus ditanggung.'
    },
    {
      salah: 'Mengandalkan wawancara saja tanpa observasi.',
      kenapa: 'Orang cenderung menjelaskan cara kerja yang seharusnya, bukan yang sebenarnya mereka lakukan. Wawancara mendapat versi resmi, sementara jalan pintas dan kebiasaan tak resmi yang justru menentukan rancangan sistem tidak pernah tersebut.',
      benar: 'Gabungkan wawancara dengan observasi langsung dan pemeriksaan dokumen yang benar-benar mereka pakai sehari-hari.'
    },
    {
      salah: 'Melewatkan satu kelompok stakeholder saat menggali kebutuhan.',
      kenapa: 'Kebutuhan kelompok yang terlewat baru muncul setelah sistem selesai, ketika biaya perbaikannya sudah berlipat puluhan kali. Pada projek MAHASISWA-PRO, melupakan pengurus baru berarti melupakan tujuan utama sistemnya sendiri, yaitu serah terima jabatan.',
      benar: 'Daftar seluruh pihak yang terpengaruh sejak awal, termasuk yang tidak memakai sistem secara langsung tetapi terkena akibatnya.'
    },
    {
      salah: 'Menerima tambahan kebutuhan di tengah pengerjaan tanpa mencatat dampaknya.',
      kenapa: 'Ruang lingkup terus membengkak sementara tenggat dan sumber daya tidak berubah, sehingga mutu seluruh bagian ikut turun. Karena tambahannya masuk sedikit demi sedikit, tidak ada satu momen pun yang terasa sebagai keputusan besar.',
      benar: 'Tetapkan ruang lingkup tertulis sejak awal, seperti bagian Ruang Lingkup di dokumen projekmu. Setiap tambahan dicatat beserta dampaknya pada waktu dan biaya.'
    }
  ],

  analogi: `Bayangkan memesan rumah kepada arsitek.

Kamu bilang *"saya mau rumah yang nyaman"*. Arsitek membangunnya. Selesai, dan kamu berkata *"ini tidak nyaman"*.

Siapa yang salah? **Tidak ada yang bisa memutuskan** — karena tidak ada satu pun ukuran yang disepakati. Perdebatannya soal selera, dan bisa berlangsung selamanya.

Sekarang bandingkan: *"tiga kamar tidur, masing-masing minimal 3 x 4 meter, dengan jendela menghadap timur"*. Sekarang **ada cara memeriksanya**. Ukur saja.

Itulah **kebutuhan yang bisa diuji**, dan ia melindungi kedua pihak.

Sekarang **kebutuhan non-fungsional**. Kamu menyebutkan seluruh ruangan dengan rinci, dan arsitek membangunnya persis. Tetapi ternyata **temboknya setipis kardus**, dan setiap suara dari kamar sebelah terdengar.

Semua kebutuhan fungsionalmu **terpenuhi**. Kamu tetap tidak bisa tinggal di sana.

Untuk **wawancara lawan observasi**: tanyakan kepada seseorang bagaimana ia memasak, dan ia akan menyebutkan resep yang rapi. **Duduklah di dapurnya**, dan kamu akan melihat ia melewatkan tiga langkah, menakar dengan perkiraan, dan punya satu trik yang tidak pernah ia sebutkan karena menganggapnya bukan apa-apa.

Trik itulah yang sering paling penting untuk sistemmu.

Dan **biaya per tahap**: memindahkan tembok **di gambar** butuh penghapus. Memindahkan tembok **yang sudah berdiri** butuh palu, tukang, dan seminggu. Memindahkan tembok **setelah keluarga itu pindah masuk** berarti mereka harus mengungsi dulu.

Temboknya sama. Waktunya yang berbeda — dan itu yang menentukan biayanya.`,

  latihan: [
    'Jelaskan perbedaan kebutuhan fungsional dan non-fungsional, lalu golongkan lima kebutuhan dari projek MAHASISWA-PRO.',
    'Ubah tiga kebutuhan kabur berikut menjadi bisa diuji: sistem harus cepat, tampilan harus mudah dipakai, dan data harus aman.',
    'Daftar seluruh stakeholder untuk sebuah sistem presensi kuliah, termasuk pihak yang tidak memakainya langsung tetapi terkena akibatnya.',
    'Jelaskan kenapa observasi sering memberi gambaran lebih jujur daripada wawancara. Beri satu contoh keadaan di mana keduanya akan berbeda.',
    'Ambil kalimat "Sistem menampilkan laporan bulanan" dan tuliskan empat tafsir berbeda yang mungkin, lalu tulis ulang menjadi satu kebutuhan yang tidak ambigu.',
    'Jelaskan apa itu scope creep, kenapa ia sulit disadari saat terjadi, dan bagaimana dokumen ruang lingkup mencegahnya.'
  ]
});

TOPICS.push({
  id: 'ads-uml-perilaku',
  judul: 'UML Perilaku — Use Case & Activity Diagram',
  kategori: 'ads',
  tag: ['UML', 'use case', 'activity diagram', 'aktor', 'include', 'extend'],
  ringkas: 'Menggambarkan siapa memakai sistem untuk apa, dan bagaimana alurnya berjalan.',

  fungsi: `**Menggambarkan apa yang bisa dilakukan pengguna dan bagaimana alurnya berjalan.**

Terpakai di:

- **Bab perancangan** tugas akhir — Use Case dan Activity hampir selalu diminta
- **Menyepakati lingkup** — diagram use case menunjukkan batas sistem dengan jelas
- **Menemukan alur yang terlewat** — menggambar memaksa memikirkan jalur alternatif
- **Menyusun kasus uji** — tiap alur pada Activity Diagram adalah satu jalur yang harus diuji

Manfaat yang paling nyata dan paling sering diremehkan: **menggambar memaksa pertanyaan yang belum terjawab**.

Saat kamu menggambar alur pembayaran dan sampai di percabangan "kalau gagal", kamu menemukan bahwa **belum ada yang memutuskan** apa yang terjadi — dan itu jauh lebih murah ditemukan sekarang.`,

  praktik: {
    tujuan: `Kamu punya diagram use case dan activity yang benar notasinya, dan sudah dipakai untuk menemukan alur yang terlewat.`,
    alat: [
      'draw.io atau PlantUML',
      'Kertas untuk sketsa pertama'
    ],
    langkah: [
      { judul: 'Daftar aktor dulu',
        isi: `Aktor adalah siapa pun **di luar sistem** yang berinteraksi dengannya — termasuk sistem lain, bukan cuma orang.

Contoh: Mahasiswa, Dosen, Admin, dan **Sistem Pembayaran** kalau ada integrasinya.

Aktor bukan bagian dari sistem; ia berada di luar batasnya.` },
      { judul: 'Tulis use case sebagai kata kerja',
        isi: `Setiap use case adalah **sesuatu yang bernilai** bagi aktornya: "Mengisi KRS", "Melihat Nilai", "Mencetak Transkrip".

Bukan "Login" saja — masuk bukan tujuan siapa pun, ia cuma langkah menuju tujuan.

Kalau kamu ragu, tanyakan: *"kalau ini selesai, apakah aktornya merasa sudah mendapat sesuatu?"*` },
      { judul: 'Pakai include dan extend dengan tepat',
        isi: `- \`include\` — bagian yang **selalu** dilakukan, misalnya "Validasi Sesi"
- \`extend\` — bagian yang **kadang** dilakukan, misalnya "Cetak Bukti"

Keduanya sering tertukar. Ingat: include itu wajib, extend itu opsional.` },
      { judul: 'Tulis skenario naratifnya',
        isi: `Diagram saja tidak cukup. Untuk tiap use case penting, tulis:

- **aktor**, **prasyarat**, **alur utama** bernomor, **alur alternatif**, dan **hasil akhir**

Bagian **alur alternatif** yang paling berharga — di situlah kamu menemukan kasus yang belum terpikirkan.` },
      { judul: 'Gambar Activity Diagram untuk alur yang rumit',
        isi: `Pakai notasi yang benar:

- **lingkaran hitam** untuk mulai, **lingkaran bercincin** untuk selesai
- **belah ketupat** untuk keputusan
- **batang tebal** untuk aktivitas paralel yang bercabang dan bergabung

Beri **swimlane** kalau melibatkan lebih dari satu aktor — ia menunjukkan siapa mengerjakan apa.` },
      { judul: 'Telusuri jalurnya untuk menemukan yang buntu',
        isi: `Ikuti tiap jalur dari mulai sampai selesai dengan jari.

Cari: percabangan yang cuma punya satu cabang, jalur yang tidak berakhir di titik selesai, dan keputusan yang tidak jelas syaratnya.

Ketiganya adalah tanda ada yang belum dipikirkan.` },
      { judul: 'Turunkan jadi kasus uji',
        isi: `Tiap jalur berbeda di Activity Diagram adalah **satu kasus uji**.

Hitung jumlah jalurnya — itu perkiraan jumlah kasus uji minimal, dan angkanya berhubungan langsung dengan cyclomatic complexity di Uji Kualitas Perangkat Lunak.` }
    ],
    cek: [
      'Setiap use case-mu bernilai bagi aktornya, bukan sekadar langkah teknis',
      'Setiap use case penting punya alur alternatif tertulis',
      'Setiap jalur di Activity Diagram-mu berakhir di titik selesai'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa digambar begitu',

  konsep: `
**UML** (*Unified Modeling Language*) adalah bahasa gambar baku untuk memodelkan sistem. Gunanya **berkomunikasi**: gambar dipahami lebih cepat daripada dokumen berhalaman-halaman, dan bisa dibaca orang non-teknis.

Diagram UML terbagi dua kelompok besar:

- **Diagram struktur** — bentuk sistem. Class diagram, object diagram, component diagram.
- **Diagram perilaku** — bagaimana sistem bekerja. Use case, activity, sequence, state.

Topik ini membahas dua diagram perilaku yang dipakai di projekmu.

**Use Case Diagram**

Menjawab satu pertanyaan: **siapa memakai sistem untuk apa?**

Komponennya:

- **Aktor** — digambar sebagai orang lidi. Bisa manusia, bisa **sistem lain**. Perhatikan bahwa aktor berada **di luar** sistem.
- **Use case** — digambar sebagai elips, berisi **kata kerja**: *"Mengunggah Proposal"*, bukan *"Proposal"*.
- **Batas sistem** — kotak yang memisahkan dalam dan luar
- **Hubungan** — garis antara aktor dan use case

**Include dan extend — yang paling sering tertukar**

- **\`<<include>>\`** — use case **selalu** memanggil yang lain. Wajib, tanpa syarat. *"Mengunggah Proposal"* selalu meng-include *"Login"*.
- **\`<<extend>>\`** — use case **kadang** diperluas, hanya pada syarat tertentu. *"Mengunggah Proposal"* di-extend oleh *"Menampilkan Peringatan Ukuran"* — hanya kalau berkasnya terlalu besar.

Cara mengingat arah panahnya, karena ini bagian yang paling membingungkan:

- **include**: panah dari yang **memanggil** ke yang **dipanggil**
- **extend**: panah dari **perluasan** ke yang **diperluas** — jadi **terbalik**

Alasannya masuk akal: use case dasar **tidak perlu tahu** bahwa ia bisa diperluas. Perluasannya yang tahu ke mana ia menempel.

**Use case bukan langkah**

Kesalahan tersering: menggambar *"Membuka Halaman"*, *"Mengisi Form"*, *"Menekan Tombol"* sebagai tiga use case terpisah.

Itu **langkah**, bukan use case. Use case harus **menghasilkan nilai yang bisa dirasakan aktor**. Ketiganya bersama membentuk satu use case: *"Mengunggah Proposal"*.

Ujinya: **kalau aktor berhenti setelah use case itu, apakah ia mendapat sesuatu yang berguna?** Kalau tidak, itu langkah.

**Activity Diagram**

Menggambarkan **alur kerja** sebuah proses — mirip flowchart, tetapi dengan tambahan penting.

Notasinya:

- **Lingkaran hitam penuh** — mulai
- **Lingkaran hitam berlingkar** — selesai
- **Persegi bersudut tumpul** — aktivitas
- **Belah ketupat** — keputusan atau penggabungan
- **Batang tebal** — **fork** (memecah jadi paralel) dan **join** (menyatukan kembali)
- **Swimlane** — kolom yang menandai **siapa mengerjakan apa**

**Dua hal yang membedakannya dari flowchart biasa**, dan keduanya penting:

**Fork dan join** memungkinkan menggambarkan hal yang **berjalan bersamaan**. Flowchart biasa hanya bisa satu alur.

**Swimlane** menunjukkan **penanggung jawab tiap langkah**. Inilah yang membuat activity diagram berguna untuk menganalisis proses organisasi — kamu bisa langsung melihat berapa kali pekerjaan **berpindah tangan**, dan setiap perpindahan adalah tempat penundaan bisa terjadi.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# INCLUDE: SELALU dipanggil, tanpa syarat\n#\n#   (Unggah Proposal) ......<<include>>......> (Login)\n#   panah dari yang MEMANGGIL ke yang DIPANGGIL\n#\n# EXTEND: KADANG saja, pada syarat tertentu\n#\n#   (Peringatan Ukuran) ....<<extend>>.....> (Unggah Proposal)\n#   panah TERBALIK: dari perluasan ke yang diperluas\n#\n# Alasannya: use case dasar tidak perlu tahu bahwa\n# ia bisa diperluas. Perluasannya yang tahu ke mana\n# ia menempel.',
      penjelasan: `
Arah panah yang berlawanan inilah yang paling sering salah digambar, dan alasannya sebenarnya masuk akal begitu dipahami.

**Include** menyatakan **ketergantungan**: *"Unggah Proposal"* **membutuhkan** *"Login"*. Yang membutuhkan menunjuk ke yang dibutuhkan — sama seperti \`import\` di kode, yang menunjuk ke pustaka yang dipakainya.

**Extend** menyatakan **penambahan opsional**: *"Peringatan Ukuran"* **menempel pada** *"Unggah Proposal"*. Dan di sinilah kuncinya: **use case dasar tidak boleh tahu-menahu** tentang perluasannya.

Kenapa? Karena kalau ia tahu, maka setiap kali ada perluasan baru, use case dasarnya harus diubah. Dengan arah panah terbalik, *"Unggah Proposal"* tetap utuh berapa pun perluasan yang ditambahkan padanya.

Ini gagasan yang sama dengan **open-closed principle** di OOP: terbuka untuk perluasan, tertutup untuk perubahan.

Cara cepat memutuskan mana yang dipakai, ajukan satu pertanyaan: **apakah ini selalu terjadi?**

- **Selalu** → include. Login selalu dibutuhkan sebelum mengunggah.
- **Kadang** → extend. Peringatan ukuran hanya muncul kalau berkasnya besar.

Kesalahan lain yang lazim: **memakai include untuk memecah langkah**. Menggambar *"Unggah Proposal"* meng-include *"Pilih Berkas"* dan *"Tekan Kirim"* adalah salah — keduanya **langkah di dalam** use case, bukan use case tersendiri.

Include dipakai ketika ada **use case utuh yang dipakai bersama** oleh beberapa use case lain. *"Login"* memenuhi syarat itu karena ia dipakai oleh hampir semua use case, dan ia sendiri menghasilkan nilai: pengguna jadi terautentikasi.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# USE CASE DIAGRAM -- MAHASISWA-PRO
# ============================================
#
#   +------------------------------------------------+
#   |              SISTEM MAHASISWA-PRO              |
#   |                                                |
#   |   ( Login )<...............                    |
#   |       ^                    :                   |
#   |       :<<include>>         :<<include>>        |
#   |       :                    :                   |
#   |   ( Unggah Proposal )   ( Lihat Dashboard )    |
#   |       ^                        ^               |
#   |       |                        |               |
#   |   ( Unggah LPJ )        ( Lihat Portofolio )   |
#   |       ^                        ^               |
#   |       |                        |               |
#   |   ( Update Progres )    ( Validasi Laporan )   |
#   |       ^                        ^               |
#   +-------|------------------------|---------------+
#           |                        |
#         --+--                    --+--
#          / \                      / \
#     Ketua Pelaksana            Pembina
#
#   Perhatikan: AKTOR berada di LUAR kotak sistem.
#   Use case berisi KATA KERJA, bukan kata benda.


# ============================================
# ACTIVITY DIAGRAM -- Alur Unggah Proposal
# Dengan SWIMLANE: siapa mengerjakan apa
# ============================================
#
#  Ketua Pelaksana  |  Sistem              |  Pembina
#  -----------------|----------------------|------------------
#        (*)        |                      |
#         |         |                      |
#   [Pilih berkas]  |                      |
#         |         |                      |
#   [Klik unggah] --+--> [Periksa ukuran]  |
#                   |         |            |
#                   |      <belah ketupat> |
#                   |      /          \    |
#                   |  >10MB          ok   |
#                   |    |             |   |
#         <---------+-[Tolak +      [Simpan berkas]
#         |         |  peringatan]      |  |
#   [Perbaiki]      |                   |  |
#         |         |            [Kirim notifikasi]--+--> [Baca notif]
#         +---------+                      |         |        |
#                   |                      |    [Periksa isi]
#                   |                      |         |
#                   |                      |   <belah ketupat>
#                   |                      |    /         \
#                   |                      | tolak       setuju
#                   |                      |   |            |
#                   | [Ubah status ke      |<--+     [Ubah status ke
#                   |  'perlu revisi'] <---+          'disetujui']
#                   |          |           |               |
#                   |          +-----------+---------------+
#                   |                      |
#                   |                     (@)  selesai
#
#   TIGA hal yang tidak bisa digambar flowchart biasa:
#     1. SWIMLANE  -> siapa penanggung jawab tiap langkah
#     2. Perpindahan tangan terlihat jelas (garis antar kolom)
#     3. FORK/JOIN -> langkah yang berjalan BERSAMAAN


# ============================================
# FORK & JOIN: menggambarkan yang paralel
# ============================================
#
#            [Terima proposal]
#                   |
#         ==========+==========   <- FORK (batang tebal)
#         |                   |
#   [Periksa anggaran]  [Periksa jadwal]     berjalan BERSAMAAN
#         |                   |
#         ==========+==========   <- JOIN (tunggu KEDUANYA)
#                   |
#            [Putuskan]
#
#   JOIN menunggu SEMUA cabang selesai.
#   Bandingkan dengan belah ketupat penggabungan,
#   yang cukup menunggu SALAH SATU.
#   Menukar keduanya membuat alurnya salah total.


# ============================================
# Menguji apakah sesuatu layak jadi use case
# ============================================
KANDIDAT = [
    ("Membuka halaman unggah",   False, "cuma langkah, aktor belum dapat apa-apa"),
    ("Mengisi form proposal",    False, "cuma langkah di tengah proses"),
    ("Menekan tombol kirim",     False, "cuma langkah"),
    ("Mengunggah proposal",      True,  "aktor mendapat: proposal tersimpan"),
    ("Melihat portofolio",       True,  "aktor mendapat: rekam jejaknya"),
    ("Proposal",                 False, "kata benda, bukan kata kerja"),
    ("Login",                    True,  "aktor mendapat: akses terautentikasi"),
]

print("--- uji: layak jadi use case? ---")
print("  Pertanyaannya: kalau aktor BERHENTI di sini,")
print("  apakah ia sudah mendapat sesuatu yang berguna?")
print("")
for nama, layak, alasan in KANDIDAT:
    tanda = "  [v] " if layak else "  [x] "
    print(tanda + nama.ljust(26) + alasan)


# ============================================
# Include atau extend?
# ============================================
HUBUNGAN = [
    ("Unggah Proposal",  "Login",              "include",
     "SELALU perlu login dulu"),
    ("Unggah Proposal",  "Peringatan Ukuran",  "extend",
     "hanya kalau berkas > 10 MB"),
    ("Lihat Dashboard",  "Login",              "include",
     "SELALU perlu login dulu"),
    ("Validasi Laporan", "Kirim Catatan Revisi", "extend",
     "hanya kalau ditolak"),
]

print("")
print("--- include atau extend? ---")
print("  Pertanyaannya: apakah ini SELALU terjadi?")
print("")
for dasar, lain, jenis, alasan in HUBUNGAN:
    arah = (dasar + " -> " + lain) if jenis == "include" \
           else (lain + " -> " + dasar)
    print("  " + ("<<" + jenis + ">>").ljust(12) + alasan)
    print("      arah panah: " + arah)

print("")
print("  Perhatikan arah panah extend TERBALIK: dari perluasan")
print("  ke yang diperluas. Sebabnya use case dasar tidak perlu")
print("  tahu bahwa ia bisa diperluas -- persis open-closed")
print("  principle yang kamu pelajari di OOP.")`
  },

  output: `--- uji: layak jadi use case? ---
  Pertanyaannya: kalau aktor BERHENTI di sini,
  apakah ia sudah mendapat sesuatu yang berguna?

  [x] Membuka halaman unggah    cuma langkah, aktor belum dapat apa-apa
  [x] Mengisi form proposal     cuma langkah di tengah proses
  [x] Menekan tombol kirim      cuma langkah
  [v] Mengunggah proposal       aktor mendapat: proposal tersimpan
  [v] Melihat portofolio        aktor mendapat: rekam jejaknya
  [x] Proposal                  kata benda, bukan kata kerja
  [v] Login                     aktor mendapat: akses terautentikasi

--- include atau extend? ---
  Pertanyaannya: apakah ini SELALU terjadi?

  <<include>> SELALU perlu login dulu
      arah panah: Unggah Proposal -> Login
  <<extend>>  hanya kalau berkas > 10 MB
      arah panah: Peringatan Ukuran -> Unggah Proposal
  <<include>> SELALU perlu login dulu
      arah panah: Lihat Dashboard -> Login
  <<extend>>  hanya kalau ditolak
      arah panah: Kirim Catatan Revisi -> Validasi Laporan

  Perhatikan arah panah extend TERBALIK: dari perluasan
  ke yang diperluas. Sebabnya use case dasar tidak perlu
  tahu bahwa ia bisa diperluas -- persis open-closed
  principle yang kamu pelajari di OOP.`,

  kesalahanUmum: [
    {
      salah: 'Menggambar langkah-langkah kecil sebagai use case terpisah.',
      kenapa: 'Use case harus menghasilkan nilai yang bisa dirasakan aktor, sedangkan membuka halaman atau menekan tombol tidak memberi apa pun kalau aktor berhenti di situ. Diagram jadi penuh elips yang sebenarnya satu proses, dan kehilangan gunanya sebagai gambaran menyeluruh.',
      benar: 'Uji dengan pertanyaan: kalau aktor berhenti setelah ini, apakah ia sudah mendapat sesuatu yang berguna? Kalau tidak, itu langkah, dan tempatnya di activity diagram.'
    },
    {
      salah: 'Menukar arah panah include dan extend.',
      kenapa: 'Include mengalir dari yang memanggil ke yang dipanggil, sedangkan extend justru terbalik, dari perluasan ke yang diperluas. Menukarnya membalik makna ketergantungan, dan pembaca diagram akan menyimpulkan hubungan yang berlawanan dari yang dimaksud.',
      benar: 'Ingat alasannya: use case dasar tidak boleh tahu bahwa ia bisa diperluas, jadi perluasannya yang menunjuk ke sana.'
    },
    {
      salah: 'Memakai include untuk memecah use case menjadi langkah-langkahnya.',
      kenapa: 'Include dipakai untuk use case utuh yang dipakai bersama oleh beberapa use case lain, bukan untuk merinci langkah internal. Memakainya untuk memecah langkah membuat diagram membengkak dan menyembunyikan gambaran besar yang justru menjadi tujuannya.',
      benar: 'Pakai include hanya kalau bagian itu sendiri layak disebut use case dan memang dipakai lebih dari satu tempat, seperti Login.'
    },
    {
      salah: 'Menamai use case dengan kata benda, misalnya Proposal atau Data Anggota.',
      kenapa: 'Use case menyatakan apa yang dilakukan, sehingga nama berupa kata benda tidak menjelaskan tindakan apa pun. Pembaca tidak bisa tahu apakah maksudnya mengunggah, melihat, atau menghapus proposal.',
      benar: 'Beri nama dengan kata kerja diikuti objeknya, misalnya Mengunggah Proposal atau Melihat Data Anggota.'
    },
    {
      salah: 'Menukar fork-join dengan belah ketupat percabangan pada activity diagram.',
      kenapa: 'Fork memecah alur menjadi cabang yang berjalan bersamaan dan join menunggu semua cabang selesai, sedangkan belah ketupat memilih satu cabang saja. Menukarnya membuat proses yang seharusnya paralel digambarkan berurutan, atau sebaliknya menunggu sesuatu yang tidak pernah dikerjakan.',
      benar: 'Pakai batang tebal untuk yang berjalan bersamaan dan belah ketupat untuk yang memilih salah satu. Ingat join menunggu semua, penggabungan cukup menunggu salah satu.'
    }
  ],

  analogi: `Bayangkan menjelaskan sebuah restoran kepada orang yang belum pernah ke sana.

**Use case diagram** menjawab: *"siapa datang ke sini, dan untuk apa?"*

- **Aktor**: pelanggan, pelayan, koki, pemasok. Perhatikan bahwa mereka berada **di luar** restoran — mereka bukan bagian dari bangunannya.
- **Use case**: memesan makanan, membayar, mengantar bahan. Semuanya **kegiatan**, bukan benda.

Kalau kamu menggambar *"Meja"* sebagai use case, orang akan bingung — meja bukan sesuatu yang **dilakukan**.

Sekarang **include dan extend**:

- **Include** — *"memesan makanan"* **selalu** melibatkan *"melihat menu"*. Tanpa kecuali. Yang memesan menunjuk ke yang dilihat.
- **Extend** — *"memesan makanan"* **kadang** diperluas oleh *"menanyakan alergi"*, hanya kalau pelanggan menyebutkan pantangan.

Dan kenapa panah extend terbalik? Karena **prosedur memesan tidak perlu diubah** setiap kali restoran menambah pertanyaan opsional baru. Prosedur dasarnya tetap; tambahannya yang menempel padanya.

**Activity diagram** menjawab pertanyaan berbeda: *"apa yang terjadi, langkah demi langkah, dan siapa mengerjakannya?"*

**Swimlane** adalah **kolom per orang**. Dan begitu digambar, sesuatu yang tadinya tidak terlihat jadi jelas: **berapa kali pekerjaan berpindah tangan.**

Setiap garis yang menyeberangi kolom adalah tempat pesanan bisa **tertunda, salah dengar, atau hilang**. Kalau satu pesanan menyeberang tujuh kali antara pelayan, kasir, dan dapur, kamu sudah menemukan masalahnya **tanpa perlu mengukur waktu apa pun**.

Dan **fork-join** adalah: koki menggoreng **sambil** asisten menyiapkan sayur. Keduanya berjalan bersamaan, dan piring baru bisa disajikan setelah **keduanya** selesai.

Bandingkan dengan belah ketupat: *"pelanggan pesan nasi **atau** mie"*. Cuma satu yang dikerjakan. Menukar keduanya berarti dapurmu memasak dua hidangan padahal dipesan satu — atau menunggu sayur yang tidak pernah disiapkan.`,

  latihan: [
    'Gambarkan use case diagram untuk sistem peminjaman buku perpustakaan, lengkap dengan aktor, batas sistem, dan minimal lima use case.',
    'Tentukan mana yang layak jadi use case dan mana yang cuma langkah: memilih buku, meminjam buku, mengisi formulir, melihat riwayat peminjaman, tombol cari.',
    'Jelaskan perbedaan include dan extend beserta arah panahnya, lalu jelaskan kenapa arah extend terbalik.',
    'Untuk sistem peminjaman buku, tentukan satu hubungan include dan satu hubungan extend beserta alasannya.',
    'Gambarkan activity diagram untuk proses peminjaman buku memakai swimlane untuk Anggota, Sistem, dan Petugas. Hitung berapa kali pekerjaan berpindah tangan.',
    'Jelaskan perbedaan fork-join dan belah ketupat percabangan, lalu beri satu contoh proses yang membutuhkan fork-join.'
  ]
});

TOPICS.push({
  id: 'ads-uml-struktur',
  judul: 'UML Struktur — Class & Sequence Diagram',
  kategori: 'ads',
  tag: ['class diagram', 'sequence diagram', 'relasi', 'multiplicity', 'agregasi', 'komposisi'],
  ringkas: 'Menggambarkan bentuk sistem dan percakapan antar-objek — jembatan langsung ke kode.',

  fungsi: `**Menggambarkan susunan kelas dan bagaimana objeknya berinteraksi.**

Terpakai di:

- **Merancang sebelum menulis kode** — mengubah gambar jauh lebih murah
- **Bab perancangan** tugas akhir
- **Menerjemahkan ke tabel basis data** — kelas menjadi tabel, relasi menjadi kunci asing
- **Memahami kode orang lain** — diagram hasil rekayasa balik menjelaskan lebih cepat daripada membaca

Yang paling sering salah: **membuat diagram kelas yang isinya cuma atribut**.

Kelas tanpa method bukan kelas — ia struct. Diagram yang bagus menunjukkan **perilaku**, dan perilaku itulah yang membedakan rancangan berorientasi objek dari sekadar daftar tabel.`,

  praktik: {
    tujuan: `Kamu punya diagram kelas dengan relasi yang benar dan sequence diagram untuk satu alur penting, lalu bisa menerjemahkannya ke kode.`,
    alat: [
      'draw.io, PlantUML, atau StarUML'
    ],
    langkah: [
      { judul: 'Ambil kelas dari kata benda di skenario',
        isi: `Baca skenario use case-mu, lalu lingkari kata bendanya.

Tidak semua jadi kelas — sebagian jadi atribut. Uji dengan pertanyaan: *"apakah ia punya perilaku sendiri?"*` },
      { judul: 'Isi ketiga bagian kotaknya',
        isi: `Kotak kelas punya tiga bagian: nama, atribut, dan **method**.

Bagian ketiga yang paling sering dikosongkan, dan justru yang paling penting.

Tulis juga visibilitasnya: \`+\` publik, \`-\` privat, \`#\` protected.` },
      { judul: 'Pilih jenis relasi dengan tepat',
        isi: `- **asosiasi** — garis biasa, saling mengenal
- **agregasi** — belah ketupat kosong, "punya" tetapi bisa berdiri sendiri
- **komposisi** — belah ketupat penuh, "punya" dan **mati bersama**
- **pewarisan** — panah segitiga kosong, "adalah sejenis"

Uji komposisi: kalau induknya dihapus, apakah anaknya masih berarti? Kalau tidak, itu komposisi — dan di basis data ia menjadi \`ON DELETE CASCADE\`.` },
      { judul: 'Tulis kardinalitasnya di kedua ujung',
        isi: `\`1\`, \`0..1\`, \`1..*\`, atau \`*\`.

Tanyakan dari **dua arah**, sama seperti saat membuat ERD. Arah yang terlewat adalah tempat kesalahan rancangan paling sering bersembunyi.` },
      { judul: 'Buat Sequence Diagram untuk satu alur',
        isi: `Pilih alur terpenting, misalnya "Mahasiswa mengisi KRS".

Gambar objeknya berjajar di atas, garis hidup ke bawah, dan panah pesan antar objek secara berurutan.

Kamu akan langsung melihat kalau ada objek yang **terlalu banyak menerima panah** — itu tanda ia mengerjakan terlalu banyak hal.` },
      { judul: 'Terjemahkan ke kode',
        isi: `Aturannya lugas:

- kelas → kelas
- atribut → properti
- method → method
- asosiasi → atribut yang menyimpan objek lain
- pewarisan → \`extends\`

Tulis kerangkanya, lalu bandingkan dengan diagrammu. Ketidakcocokan berarti salah satunya perlu diperbaiki.` },
      { judul: 'Perbarui diagram saat kode berubah',
        isi: `Diagram yang tidak diperbarui **lebih berbahaya daripada tidak ada** — orang memercayainya lalu tersesat.

Kalau kamu tidak sanggup memeliharanya, gambar hanya bagian yang **paling rumit dan paling jarang berubah**, dan biarkan sisanya dijelaskan oleh kode.` }
    ],
    cek: [
      'Setiap kelas di diagrammu punya sedikitnya satu method',
      'Kardinalitas tertulis di kedua ujung setiap relasi',
      'Kerangka kodemu cocok dengan diagram kelasmu'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa digambar begitu',

  konsep: `
Dua diagram ini paling dekat dengan kode. **Class diagram** bisa diterjemahkan menjadi kelas hampir baris demi baris, dan **sequence diagram** menjadi urutan pemanggilan method.

**Class Diagram**

Menggambarkan **kelas, atributnya, methodnya, dan hubungan antar-kelas**.

Satu kelas digambar sebagai kotak berisi tiga bagian: **nama**, **atribut**, **method**.

Tanda hak akses:

- **\`+\`** public
- **\`-\`** private
- **\`#\`** protected

Ini persis enkapsulasi yang kamu pelajari di OOP.

**Empat jenis relasi yang wajib dibedakan**

- **Asosiasi** — hubungan biasa. Garis polos. *"Mahasiswa mengambil MataKuliah."*
- **Agregasi** — hubungan "punya", tetapi bagiannya **bisa hidup sendiri**. Belah ketupat **kosong**. *"Organisasi punya Anggota"* — kalau organisasinya bubar, anggotanya tetap ada.
- **Komposisi** — hubungan "punya" yang **bagiannya ikut mati**. Belah ketupat **terisi**. *"Proker punya Tahapan"* — kalau Proker dihapus, tahapannya ikut hilang.
- **Pewarisan** — hubungan "adalah". Panah segitiga **kosong**. *"KetuaPelaksana adalah Anggota."*

**Agregasi dan komposisi paling sering tertukar.** Pertanyaan pembedanya: **kalau induknya dihapus, apakah bagiannya masih bermakna?**

- **Masih bermakna** → agregasi (belah ketupat kosong)
- **Ikut hilang** → komposisi (belah ketupat terisi)

Pembedaan ini bukan sekadar gambar — ia menentukan **aturan penghapusan di basis data**, yaitu apakah dipakai \`ON DELETE CASCADE\` atau tidak. Ini menyambung langsung ke foreign key di Basis Data.

**Multiplicity**

Angka di ujung garis yang menyatakan berapa banyak:

- **\`1\`** tepat satu
- **\`0..1\`** nol atau satu
- **\`*\`** atau **\`0..*\`** berapa pun
- **\`1..*\`** minimal satu

Ini persis **kardinalitas** yang kamu pelajari di ERD pada Basis Data — dan sama pentingnya, karena menentukan di mana foreign key diletakkan.

**Sequence Diagram**

Menggambarkan **percakapan antar-objek dalam urutan waktu**.

- **Objek** berjajar di atas
- **Lifeline** — garis putus-putus turun dari tiap objek, menandakan keberadaannya sepanjang waktu
- **Activation bar** — batang di atas lifeline, menandakan objek sedang **aktif bekerja**
- **Pesan** — panah antar-lifeline. **Panah penuh** untuk pemanggilan, **panah putus-putus** untuk balasan.

**Waktu mengalir ke bawah.** Urutan vertikal itulah maknanya, dan inilah yang membedakannya dari class diagram yang tidak punya urutan waktu sama sekali.

Sequence diagram sangat berguna untuk **memeriksa rancangan sebelum menulis kode**: kalau menggambarkan satu proses membutuhkan lima belas panah bolak-balik antar-objek, rancanganmu kemungkinan terlalu terpecah.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Agregasi vs Komposisi -- pertanyaan pembedanya:\n# "kalau induknya dihapus, apakah bagiannya masih bermakna?"\n#\n# AGREGASI (belah ketupat KOSONG)\n#   Organisasi <>------ Anggota\n#   Organisasi bubar -> anggotanya TETAP ADA sebagai orang\n#   -> di basis data: ON DELETE SET NULL\n#\n# KOMPOSISI (belah ketupat TERISI)\n#   Proker <#>------ Tahapan\n#   Proker dihapus -> tahapannya TIDAK BERMAKNA lagi\n#   -> di basis data: ON DELETE CASCADE',
      penjelasan: `
Pembedaan ini terlihat seperti soal gambar, tetapi akibatnya sampai ke **kode dan basis data**.

Pertanyaan pembedanya cuma satu: **kalau induknya dihapus, apakah bagiannya masih bermakna sendiri?**

**Anggota** tetap bermakna kalau organisasinya bubar — ia tetap seorang mahasiswa dengan data dirinya sendiri. Jadi **agregasi**.

**Tahapan Proker** tidak bermakna apa-apa tanpa Proker-nya. *"Tahap 2: penyusunan anggaran"* dari Proker yang sudah dihapus adalah catatan yang menggantung tanpa arti. Jadi **komposisi**.

Sekarang lihat akibatnya di basis data, dan inilah yang membuat pembedaan ini penting:

- **Agregasi** → foreign key dibuat **\`ON DELETE SET NULL\`**. Anggota tetap ada, kolom organisasinya dikosongkan.
- **Komposisi** → foreign key dibuat **\`ON DELETE CASCADE\`**. Tahapan ikut terhapus otomatis.

Salah memilih menghasilkan salah satu dari dua masalah:

- Memakai cascade pada agregasi → **menghapus organisasi ikut menghapus seluruh data anggotanya.** Kehilangan data yang tidak bisa dipulihkan.
- Memakai set null pada komposisi → **tahapan yatim menumpuk** di basis data, tidak terpakai, tidak bisa ditelusuri asalnya, dan perlahan mengotori laporan.

Perhatikan bahwa ini persis persoalan **integritas referensial** yang kamu pelajari di topik Model Relasional pada Basis Data. Class diagram yang digambar dengan benar **sudah menjawab** pertanyaan rancangan basis datanya.

Untuk **pewarisan**, ujinya berbeda: bacalah sebagai kalimat *"X adalah Y"*. *"KetuaPelaksana adalah Anggota"* masuk akal, jadi pewarisan benar. *"Proker adalah Organisasi"* tidak masuk akal — itu hubungan punya, bukan adalah.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# CLASS DIAGRAM -- MAHASISWA-PRO
# ============================================
#
#   +----------------------+
#   |      Organisasi      |
#   +----------------------+
#   | - id: int            |
#   | - nama: string       |
#   | - periode: string    |
#   +----------------------+
#   | + tambahAnggota()    |
#   | + hitungProgres()    |
#   +----------------------+
#            <>  1                       <- belah ketupat KOSONG
#            |                              (AGREGASI)
#            | 1..*
#   +----------------------+
#   |       Anggota        |
#   +----------------------+
#   | - nim: string        |
#   | - nama: string       |
#   | - jabatan: string    |
#   +----------------------+
#   | + lihatPortofolio()  |
#   +----------------------+
#            ^
#            |                              <- panah segitiga KOSONG
#            |                                 (PEWARISAN)
#   +----------------------+
#   |   KetuaPelaksana     |
#   +----------------------+
#   | - prokerDipegang: [] |
#   +----------------------+
#   | + unggahProposal()   |
#   | + unggahLPJ()        |
#   +----------------------+
#            | 1
#            |
#            | 0..*                         <- ASOSIASI biasa
#   +----------------------+
#   |        Proker        |
#   +----------------------+
#   | - id: int            |
#   | - judul: string      |
#   | - status: string     |
#   +----------------------+
#   | + ubahStatus()       |
#   +----------------------+
#           <#> 1                          <- belah ketupat TERISI
#            |                                (KOMPOSISI)
#            | 1..*
#   +----------------------+
#   |       Tahapan        |
#   +----------------------+
#   | - urutan: int        |
#   | - deskripsi: string  |
#   +----------------------+
#
#   Tanda hak akses:  + public   - private   # protected


# ============================================
# SEQUENCE DIAGRAM -- Unggah Proposal
# Waktu mengalir KE BAWAH
# ============================================
#
#  :KetuaPelaksana   :Controller   :ProkerModel   :Penyimpanan
#        |                |              |             |
#        | unggah(berkas) |              |             |
#        |--------------->|              |             |
#        |               |=| aktif       |             |
#        |                | validasi()   |             |
#        |                |---+          |             |
#        |                |<--+          |             |
#        |                | simpanBerkas(berkas)       |
#        |                |--------------------------->|
#        |                |              |            |=|
#        |                |<- - - - - - - - - - - - - -|
#        |                |   path                     |
#        |                | simpan(path) |             |
#        |                |------------->|             |
#        |                |             |=|            |
#        |                |<- - - - - - -|             |
#        |                |   id proker  |             |
#        |<- - - - - - - -|              |             |
#        |  "berhasil"    |              |             |
#        |                |              |             |
#
#   Panah PENUH        --->   pemanggilan
#   Panah PUTUS-PUTUS  - ->   balasan
#   Batang |=|                objek sedang AKTIF bekerja


# ============================================
# Menentukan jenis relasi
# ============================================
RELASI = [
    ("Organisasi", "Anggota",     "agregasi",
     "organisasi bubar -> anggota tetap ada sebagai orang"),
    ("Proker",     "Tahapan",     "komposisi",
     "proker dihapus -> tahapannya tak bermakna lagi"),
    ("Anggota",    "KetuaPelaksana", "pewarisan",
     "'KetuaPelaksana adalah Anggota' -- masuk akal"),
    ("Proker",     "Dokumen",     "komposisi",
     "proker dihapus -> proposal & LPJ-nya ikut"),
    ("Anggota",    "Proker",      "asosiasi",
     "sekadar terhubung, tidak ada yang memiliki"),
]

print("--- menentukan jenis relasi ---")
print("  Pertanyaan: kalau induk dihapus, bagiannya")
print("  masih bermakna sendiri atau tidak?")
print("")
CASCADE = {"komposisi": "ON DELETE CASCADE",
           "agregasi":  "ON DELETE SET NULL",
           "asosiasi":  "ON DELETE RESTRICT",
           "pewarisan": "(bukan foreign key)"}

for a, b, jenis, alasan in RELASI:
    print("  " + (a + " - " + b).ljust(30) + jenis.ljust(11) + alasan)
    print("      di basis data: " + CASCADE[jenis])

print("")
print("  Salah memilih bukan sekadar salah gambar:")
print("    cascade pada agregasi -> hapus organisasi ikut")
print("      menghapus SELURUH data anggotanya")
print("    set null pada komposisi -> tahapan yatim menumpuk,")
print("      tak terpakai dan tak bisa ditelusuri asalnya")


# ============================================
# Multiplicity = kardinalitas ERD
# ============================================
print("")
print("--- multiplicity dan artinya ---")
MULTI = [
    ("1",     "tepat satu"),
    ("0..1",  "nol atau satu (opsional)"),
    ("*",     "berapa pun, boleh nol"),
    ("1..*",  "minimal satu"),
    ("2..5",  "antara dua sampai lima"),
]
for tanda, arti in MULTI:
    print("  " + tanda.ljust(8) + arti)

print("")
print("  Ini PERSIS kardinalitas yang kamu pelajari di ERD.")
print("  Dan sama pentingnya: ia menentukan di mana foreign")
print("  key diletakkan -- selalu di sisi yang 'banyak'.")`
  },

  output: `--- menentukan jenis relasi ---
  Pertanyaan: kalau induk dihapus, bagiannya
  masih bermakna sendiri atau tidak?

  Organisasi - Anggota          agregasi   organisasi bubar -> anggota tetap ada sebagai orang
      di basis data: ON DELETE SET NULL
  Proker - Tahapan              komposisi  proker dihapus -> tahapannya tak bermakna lagi
      di basis data: ON DELETE CASCADE
  Anggota - KetuaPelaksana      pewarisan  'KetuaPelaksana adalah Anggota' -- masuk akal
      di basis data: (bukan foreign key)
  Proker - Dokumen              komposisi  proker dihapus -> proposal & LPJ-nya ikut
      di basis data: ON DELETE CASCADE
  Anggota - Proker              asosiasi   sekadar terhubung, tidak ada yang memiliki
      di basis data: ON DELETE RESTRICT

  Salah memilih bukan sekadar salah gambar:
    cascade pada agregasi -> hapus organisasi ikut
      menghapus SELURUH data anggotanya
    set null pada komposisi -> tahapan yatim menumpuk,
      tak terpakai dan tak bisa ditelusuri asalnya

--- multiplicity dan artinya ---
  1       tepat satu
  0..1    nol atau satu (opsional)
  *       berapa pun, boleh nol
  1..*    minimal satu
  2..5    antara dua sampai lima

  Ini PERSIS kardinalitas yang kamu pelajari di ERD.
  Dan sama pentingnya: ia menentukan di mana foreign
  key diletakkan -- selalu di sisi yang 'banyak'.`,

  kesalahanUmum: [
    {
      salah: 'Menukar agregasi dengan komposisi.',
      kenapa: 'Keduanya sama-sama hubungan memiliki dan gambarnya cuma berbeda pada belah ketupat kosong atau terisi. Padahal akibatnya sampai ke basis data: memakai cascade pada agregasi membuat penghapusan induk ikut menghapus data yang seharusnya tetap ada, dan itu kehilangan data yang tidak bisa dipulihkan.',
      benar: 'Ajukan pertanyaan pembedanya: kalau induk dihapus, apakah bagiannya masih bermakna sendiri? Masih bermakna berarti agregasi, ikut hilang berarti komposisi.'
    },
    {
      salah: 'Memakai pewarisan untuk hubungan yang sebenarnya kepemilikan.',
      kenapa: 'Pewarisan menyatakan hubungan adalah, bukan punya. Menggambar Proker mewarisi Organisasi membuat Proker mendapat seluruh atribut dan method Organisasi, padahal hubungannya kepemilikan. Di kode, ini menghasilkan kelas yang mewarisi hal yang tidak relevan dan sulit dipelihara.',
      benar: 'Baca sebagai kalimat: X adalah Y. Kalau tidak masuk akal, itu bukan pewarisan melainkan asosiasi, agregasi, atau komposisi.'
    },
    {
      salah: 'Melupakan multiplicity di ujung garis relasi.',
      kenapa: 'Tanpa multiplicity, diagram tidak memberitahu apakah satu organisasi punya satu anggota atau ribuan, dan tidak ada dasar untuk menentukan di mana foreign key diletakkan. Rancangan basis data yang dihasilkan jadi menebak-nebak, dan sering salah menaruh kunci di sisi yang keliru.',
      benar: 'Cantumkan multiplicity di kedua ujung setiap relasi. Perlakukan sama pentingnya dengan kardinalitas pada ERD.'
    },
    {
      salah: 'Menggambar sequence diagram tanpa memperhatikan urutan vertikalnya.',
      kenapa: 'Pada sequence diagram, waktu mengalir ke bawah dan posisi vertikal panah itulah maknanya. Menaruh panah balasan di atas panah pemanggilannya membuat alurnya mustahil, dan pembaca akan menyimpulkan urutan kejadian yang salah.',
      benar: 'Susun panah dari atas ke bawah mengikuti urutan waktu sesungguhnya, dan bedakan panah penuh untuk pemanggilan dari panah putus-putus untuk balasan.'
    },
    {
      salah: 'Menganggap class diagram dan sequence diagram saling menggantikan.',
      kenapa: 'Class diagram menggambarkan bentuk sistem tanpa urutan waktu sama sekali, sedangkan sequence diagram menggambarkan urutan kejadian tanpa menjelaskan struktur kelasnya. Mengandalkan salah satu saja membuat separuh rancangan tidak pernah diperiksa.',
      benar: 'Pakai keduanya untuk pertanyaan berbeda: class diagram untuk apa saja yang ada, sequence diagram untuk bagaimana mereka bekerja sama.'
    }
  ],

  analogi: `Bayangkan menjelaskan sebuah orkestra.

**Class diagram** adalah **daftar pemain dan alatnya**. Siapa saja yang ada, masing-masing memegang apa, dan apa yang bisa mereka lakukan. Ia **tidak menjelaskan urutan** — sekadar bentuknya.

Sekarang tiga jenis hubungan di dalamnya:

- **Agregasi** — *"orkestra punya pemain biola"*. Kalau orkestranya bubar, **pemain biolanya tetap seorang pemusik**. Ia bisa bergabung dengan orkestra lain besok. Belah ketupat **kosong**.
- **Komposisi** — *"biola punya senar"*. Kalau biolanya hancur, **senarnya tidak lagi berarti apa-apa** sebagai bagian dari alat musik. Belah ketupat **terisi**.
- **Pewarisan** — *"pemain biola pertama **adalah** pemain biola"*. Bacalah sebagai kalimat; kalau janggal, berarti bukan pewarisan.

Dan inilah yang membuat pembedaan itu bukan sekadar gambar: kalau kamu salah menandainya, sistem yang dibangun akan **menghapus seluruh data pemain** ketika sebuah orkestra dibubarkan. Padahal orangnya masih ada.

**Sequence diagram** menjawab pertanyaan yang sama sekali berbeda: **"apa yang terjadi, menit demi menit, saat mereka memainkan satu lagu?"**

Dirigen memberi aba-aba, biola masuk, lalu tiup kayu menyahut, lalu perkusi. **Urutannya yang penting** — dan waktu mengalir ke bawah.

Batang tebal di lifeline adalah **saat pemain itu benar-benar bermain**. Sisanya dia diam menunggu giliran, tetapi tetap ada di panggung.

Dan **kegunaan praktisnya**: kalau untuk memainkan satu lagu sederhana ternyata butuh dua puluh aba-aba bolak-balik antar-kelompok, kamu tahu **aransemennya terlalu rumit** — dan itu terlihat dari gambarnya, sebelum satu not pun dimainkan.`,

  latihan: [
    'Gambarkan class diagram untuk sistem perpustakaan dengan kelas Anggota, Buku, Peminjaman, dan Denda, lengkap dengan atribut, method, dan hak aksesnya.',
    'Tentukan jenis relasi untuk tiap pasangan berikut beserta alasannya: Perpustakaan-Buku, Peminjaman-Denda, Anggota-AnggotaVIP, Buku-Halaman.',
    'Jelaskan pertanyaan pembeda antara agregasi dan komposisi, lalu jelaskan akibatnya pada aturan penghapusan di basis data.',
    'Jelaskan apa yang terjadi kalau relasi Organisasi-Anggota salah ditandai sebagai komposisi lalu diterapkan dengan ON DELETE CASCADE.',
    'Gambarkan sequence diagram untuk proses peminjaman buku, melibatkan Anggota, Controller, PeminjamanModel, dan BukuModel.',
    'Jelaskan perbedaan tujuan class diagram dan sequence diagram, lalu jelaskan kenapa mengandalkan salah satu saja tidak cukup.'
  ]
});
