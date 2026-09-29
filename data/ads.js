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

   Tiga topik tambahan (DFD, studi kelayakan, state machine
   diagram) disusun dari REFERENSI LUAR -- keterangan lengkapnya
   ada di kepala bagian tambahan di bawah.
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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari berkas projek kuliah sendiri
   (wawancara, kebutuhan, SRS, UML). Tiga topik berikutnya
   mengisi pokok bahasan yang ada di RPS Analisis dan
   Perancangan Sistem kampus lain tetapi tidak ada bahannya di
   drive: DFD dan diagram konteks (pendekatan terstruktur),
   studi kelayakan (TELOS dan analisis biaya-manfaat), serta
   state machine diagram.

   Ketiganya memakai satu kasus bersambung, sistem peminjaman
   ruang kampus, yang seluruhnya TIRUAN -- termasuk semua angka
   biaya dan manfaat. Semua program benar-benar dijalankan.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'ads-dfd',
  judul: 'DFD — Diagram Konteks & Level 1',
  kategori: 'ads',
  tag: ['DFD', 'data flow diagram', 'diagram konteks', 'balancing', 'lubang hitam', 'analisis terstruktur'],
  ringkas: 'Menggambar ke mana data mengalir, bukan urutan langkahnya — dan empat aturan yang bisa diperiksa otomatis sebelum diagramnya dikumpulkan.',

  fungsi: `**Menggambar sistem sebagai aliran data: dari mana data datang, diproses di mana, disimpan di mana, dan ke siapa hasilnya pergi.**

Topik UML di atas adalah pendekatan **berorientasi objek**. DFD adalah alat utama pendekatan **terstruktur** — masih diminta di banyak RPS dan tugas analisis sistem, dan masih dipakai untuk menjelaskan sistem kepada orang yang tidak paham kelas dan objek.

Terpakai di:

- **Dokumen analisis sistem** — diagram konteks hampir selalu ada di bab analisis tugas akhir sistem informasi
- **Menentukan batas sistem** — apa yang dikerjakan sistem, dan apa yang dikerjakan orang di luarnya
- **Merancang basis data** — setiap simpanan data di DFD calon tabel
- **Analisis keamanan** — model ancaman sering digambar di atas DFD, karena data sensitif paling mudah dilacak lewat alirannya

Yang paling membedakan DFD dari flowchart: **DFD tidak menggambar urutan atau keputusan.** Tidak ada "jika", tidak ada "lalu". Yang digambar cuma apa yang mengalir ke mana.

Dan yang paling sering salah di tugas: **balancing.** Aliran yang keluar-masuk sistem di diagram konteks harus sama persis dengan yang di level 1. Program di topik ini memeriksanya otomatis.`,

  praktik: {
    tujuan: 'Kamu bisa menggambar diagram konteks dan DFD level 1, memeriksa empat aturan dasarnya, dan memastikan kedua tingkat seimbang — dengan tangan dan dengan program.',
    alat: ['draw.io atau kertas', 'Python 3 untuk pemeriksaan otomatis', 'Dokumen kebutuhan dari topik analisis kebutuhan'],
    langkah: [
      { judul: 'Tentukan entitas luar',
        isi: `Entitas luar adalah orang, bagian, atau sistem lain yang memberi data ke sistem atau menerima data darinya, tetapi **tidak** dikendalikan sistem. Untuk peminjaman ruang: Ormawa dan Bagian Umum.

Pertanyaan pengujinya: kalau entitas ini berubah cara kerjanya, apakah sistem kita ikut berubah? Kalau tidak, ia di luar.` },
      { judul: 'Gambar diagram konteks',
        isi: `Seluruh sistem adalah **satu** proses bernomor 0. Gambar setiap entitas luar dan setiap aliran data antara entitas dan proses 0. Tidak ada simpanan data di diagram konteks.` },
      { judul: 'Pecah menjadi proses level 1',
        isi: `Proses 0 dipecah menjadi 3–7 proses bernomor 1.0, 2.0, dan seterusnya. Setiap proses dinamai dengan kata kerja: Ajukan, Cek jadwal, Putuskan, Laporkan. Tambahkan simpanan data: D1 Ruang, D2 Peminjaman.` },
      { judul: 'Periksa empat aturan',
        isi: `- Setiap aliran menyentuh setidaknya satu proses — tidak ada entitas ke entitas, entitas ke simpanan, atau simpanan ke simpanan
- Tidak ada **lubang hitam**: proses dengan masukan tetapi tanpa keluaran
- Tidak ada **keajaiban**: proses dengan keluaran tetapi tanpa masukan
- Setiap aliran punya nama berupa kata benda — data, bukan tindakan` },
      { judul: 'Periksa balancing',
        isi: `Daftar semua aliran yang menyentuh entitas luar di diagram konteks. Daftar yang sama di level 1. Keduanya harus identik — nama, arah, dan entitasnya.

Kalau level 1 punya aliran luar yang tidak ada di konteks, konteksnya yang kurang lengkap; perbarui. Kalau konteks punya aliran yang hilang di level 1, ada proses yang lupa digambar.` },
      { judul: 'Otomatiskan pemeriksaannya',
        isi: `Tulis setiap aliran sebagai tuple (asal, tujuan, nama) di Python, lalu jalankan pemeriksa aturan dan balancing seperti di program topik ini. Diagram besar hampir selalu punya kesalahan yang tidak terlihat mata.` }
    ],
    cek: [
      'Diagram kontekmu punya tepat satu proses dan tidak punya simpanan data',
      'Tidak ada aliran di level 1 yang menghubungkan dua non-proses',
      'Tidak ada lubang hitam atau keajaiban di level 1',
      'Aliran luar diagram konteks dan level 1 identik'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa setiap aliran harus menyentuh proses',

  konsep: `Topik UML di atas memodelkan sistem sebagai objek-objek yang saling mengirim pesan. DFD memodelkan sistem dengan cara yang lebih tua dan lebih sederhana: sebagai **aliran data** — seperti pipa air yang digambar tanpa peduli kapan kerannya dibuka.

**Empat lambang**

| Lambang | Arti | Contoh |
|---|---|---|
| kotak | entitas luar | Ormawa, Bagian Umum |
| lingkaran atau kotak bersudut bulat | proses | 1.0 Ajukan |
| dua garis sejajar atau kotak terbuka | simpanan data | D2 Peminjaman |
| panah bernama | aliran data | data pengajuan |

Ada dua gaya lambang yang lazim — Yourdon/DeMarco dengan lingkaran, dan Gane-Sarson dengan kotak bersudut bulat. Keduanya sama artinya; yang penting konsisten dalam satu dokumen.

**Diagram konteks**

Seluruh sistem peminjaman ruang adalah satu proses, "0 Sistem":

| Dari | Ke | Aliran |
|---|---|---|
| Ormawa | 0 Sistem | data pengajuan |
| 0 Sistem | Ormawa | status pengajuan |
| Bagian Umum | 0 Sistem | keputusan |
| 0 Sistem | Bagian Umum | daftar pengajuan |
| 0 Sistem | Bagian Umum | laporan bulanan |

Diagram konteks menjawab satu pertanyaan saja: **di mana batas sistemnya?** Semua yang di luar proses 0 bukan tanggung jawab sistem.

**DFD level 1**

Proses 0 dipecah menjadi empat proses dan dua simpanan data. Sebelas aliran, misalnya:

- Ormawa → 1.0 Ajukan: data pengajuan
- 1.0 Ajukan → D2 Peminjaman: pengajuan baru
- D1 Ruang → 2.0 Cek jadwal: jadwal ruang
- 3.0 Putuskan → Ormawa: status pengajuan
- D2 Peminjaman → 4.0 Laporkan: riwayat

Program menggambar seluruhnya sebagai daftar aliran, lalu memeriksanya: tidak ada pelanggaran aturan, dan kelima aliran luar sama dengan diagram konteks — **seimbang**.

**Aturan 1: setiap aliran menyentuh proses**

Data tidak bisa berpindah sendiri. Ormawa tidak bisa menaruh data langsung ke tabel peminjaman — **ada yang menerimanya**, memeriksanya, dan menyimpannya. "Ada yang" itulah proses.

Aliran entitas ke entitas — Ormawa mengirim surat ke Bagian Umum — terjadi di luar sistem, dan tidak digambar sama sekali.

**Aturan 2 dan 3: lubang hitam dan keajaiban**

Proses yang punya masukan tetapi tanpa keluaran adalah **lubang hitam**: data masuk dan lenyap. Proses yang punya keluaran tetapi tanpa masukan adalah **keajaiban**: data muncul dari ketiadaan. Keduanya hampir selalu tanda ada aliran yang lupa digambar.

**Aturan 4: balancing**

Aliran yang masuk dan keluar dari proses 0 di diagram konteks harus **sama persis** dengan aliran yang menyentuh entitas luar di level 1. Memecah proses tidak boleh menambah atau menghilangkan hubungan dengan dunia luar.

**Program menemukan delapan temuan sekaligus**

Versi pertama level 1 yang "wajar dilihat" — satu aliran dibuang, tiga ditambahkan — diperiksa program:

| Jenis | Temuan |
|---|---|
| aturan | entitas ke entitas: Ormawa → Bagian Umum |
| aturan | entitas ke simpanan: Ormawa → D2 Peminjaman |
| aturan | lubang hitam: 4.0 Laporkan |
| balancing | "laporan bulanan" hilang di level 1 |
| balancing | "surat permohonan" muncul, tidak ada di konteks (dua arah) |
| balancing | "notifikasi penolakan" muncul, tidak ada di konteks |
| balancing | "isi formulir" muncul, tidak ada di konteks |

Membuang satu aliran — laporan bulanan — memicu dua temuan: 4.0 Laporkan menjadi lubang hitam, dan balancing rusak. Dua pemeriksaan yang berbeda menunjuk ke kesalahan yang sama dari arah berbeda.

"Notifikasi penolakan" menarik: aliran itu mungkin memang dibutuhkan. Temuan balancing tidak selalu berarti level 1 salah — bisa jadi diagram konteksnya yang kurang lengkap. Yang pasti: keduanya harus dibuat sepakat.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def periksa_aturan(aliran):\n    galat = []\n    for asal, tujuan, nama in aliran:\n        a, t = jenis(asal), jenis(tujuan)\n        if a != 'proses' and t != 'proses':\n            galat.append((a + ' ke ' + t + ' tanpa proses', ...))\n    for p in sorted({x for x, _, _ in aliran} | {y for _, y, _ in aliran}):\n        if jenis(p) != 'proses':\n            continue\n        masuk  = [n for _, y, n in aliran if y == p]\n        keluar = [n for x, _, n in aliran if x == p]\n        if masuk and not keluar:\n            galat.append(('LUBANG HITAM', p))\n        if keluar and not masuk:\n            galat.append(('KEAJAIBAN', p))\n    return galat",
      penjelasan: `DFD ditulis sebagai data — daftar tuple (asal, tujuan, nama) — sehingga aturan-aturannya bisa diperiksa dengan kode biasa.

**Diagram sebagai daftar aliran.**

Diagram yang digambar di draw.io mudah dilihat, tetapi sulit diperiksa: mata melewatkan panah yang arahnya salah atau proses yang lupa diberi keluaran. Menulis diagram yang sama sebagai daftar aliran mengubah pemeriksaan visual menjadi pemeriksaan logika — dan logika tidak lelah.

Untuk diagram belasan proses, daftar seperti ini ditulis dalam beberapa menit, dan bisa menjadi lampiran dokumen analisis.

**Aturan pertama: "setidaknya satu ujung adalah proses".**

\`a != 'proses' and t != 'proses'\` menangkap tiga larangan sekaligus: entitas ke entitas, entitas ke simpanan, dan simpanan ke simpanan. Ketiganya adalah satu aturan yang sama — data tidak berpindah tanpa ada yang memindahkannya.

**Lubang hitam dan keajaiban.**

Untuk setiap proses, hitung aliran masuk dan aliran keluar. Proses tanpa keluaran tidak menghasilkan apa-apa — pekerjaannya tidak terlihat oleh siapa pun, sehingga entah prosesnya tidak perlu, entah keluarannya lupa digambar.

Proses tanpa masukan menghasilkan sesuatu dari ketiadaan. Satu-satunya proses yang boleh begitu adalah proses yang dipicu waktu — misalnya laporan otomatis setiap tanggal 1 — dan bahkan itu biasanya membaca sesuatu dari simpanan data.

**Kenapa \`sorted\`.**

Himpunan string di Python tidak punya urutan yang tetap: dengan pengacakan hash, urutannya bisa berbeda di setiap eksekusi. Tanpa \`sorted\`, daftar galat bisa muncul dengan urutan berbeda setiap kali program dijalankan — tidak salah, tetapi membuat keluaran sulit dibandingkan dan diuji. Program topik ini diuji dengan tiga benih hash berbeda, dan keluarannya identik.

**Yang tidak diperiksa program ini.**

Aturan penamaan — proses dinamai kata kerja, aliran dinamai kata benda — butuh pemahaman bahasa. Begitu juga pertanyaan "apakah aliran ini masuk akal": program bisa memastikan 4.0 Laporkan punya keluaran, tetapi tidak bisa memastikan laporan bulanan memang yang dibutuhkan Bagian Umum. Itu tetap pekerjaan analis, dan pertanyaan untuk wawancara berikutnya.`
    },
    {
      bahasa: 'python',
      kode: "def aliran_luar(aliran):\n    # aliran yang menyentuh entitas luar: (entitas, arah, nama)\n    hasil = set()\n    for asal, tujuan, nama in aliran:\n        if asal in ENTITAS:\n            hasil.add((asal, 'masuk', nama))\n        if tujuan in ENTITAS:\n            hasil.add((tujuan, 'keluar', nama))\n    return hasil\n\nkurang = aliran_luar(KONTEKS) - aliran_luar(SALAH)   # hilang di level 1\nlebih  = aliran_luar(SALAH) - aliran_luar(KONTEKS)   # muncul tanpa diundang",
      penjelasan: `Balancing dalam dua operasi himpunan — dan kenapa tiga unsur, bukan dua, yang dibandingkan.

**Apa yang dibandingkan.**

Di diagram konteks, aliran "data pengajuan" menghubungkan Ormawa dan proses 0. Di level 1, aliran yang sama menghubungkan Ormawa dan proses 1.0. Nomor prosesnya berbeda — itu memang tujuan memecah proses — tetapi hubungannya dengan dunia luar sama.

Jadi yang dibandingkan bukan aliran utuh, melainkan **sisi luarnya**: entitas mana, arah mana, nama apa. \`aliran_luar\` membuang sisi dalamnya dan menyisakan tiga unsur itu.

**Kenapa arah ikut dibandingkan.**

"Surat permohonan" dari Ormawa ke Bagian Umum muncul **dua kali** di hasil: sebagai aliran keluar dari Ormawa, dan sebagai aliran masuk ke Bagian Umum. Kalau arah tidak dibandingkan, aliran "status pengajuan" yang tergambar terbalik — dari Ormawa ke sistem, bukan sebaliknya — akan dianggap seimbang padahal salah.

**Dua selisih himpunan, dua jenis kesalahan.**

\`konteks − level 1\`: yang ada di konteks tetapi hilang di level 1. Biasanya ada proses yang lupa menghasilkan keluaran untuk entitas itu — di contoh ini, 4.0 Laporkan kehilangan aliran laporan bulanan.

\`level 1 − konteks\`: yang muncul di level 1 tanpa ada di konteks. Ada dua kemungkinan: aliran itu salah — seperti entitas ke entitas — atau konteksnya yang kurang lengkap, seperti notifikasi penolakan yang mungkin memang dibutuhkan.

**Tingkat yang lebih dalam.**

Aturan yang sama berlaku untuk setiap pemecahan. Kalau proses 3.0 dipecah menjadi DFD level 2 — 3.1, 3.2, 3.3 — aliran yang masuk dan keluar dari 3.0 di level 1 harus sama dengan aliran yang menyentuh dunia luar diagram level 2. Fungsi yang sama bisa dipakai, dengan "entitas luar" diganti "semua yang di luar proses 3.0".`
    }
  ],

  kode: { python: String.raw`# ============================================
# DFD: diagram konteks, level 1, dan pemeriksaannya
# ============================================

# Sistem peminjaman ruang kampus
ENTITAS = {"Ormawa", "Bagian Umum"}
PROSES_L1 = {"1.0 Ajukan", "2.0 Cek jadwal", "3.0 Putuskan", "4.0 Laporkan"}
SIMPANAN = {"D1 Ruang", "D2 Peminjaman"}

# Diagram konteks: seluruh sistem adalah SATU proses
KONTEKS = [
    ("Ormawa", "0 Sistem", "data pengajuan"),
    ("0 Sistem", "Ormawa", "status pengajuan"),
    ("Bagian Umum", "0 Sistem", "keputusan"),
    ("0 Sistem", "Bagian Umum", "daftar pengajuan"),
    ("0 Sistem", "Bagian Umum", "laporan bulanan"),
]

LEVEL1 = [
    ("Ormawa", "1.0 Ajukan", "data pengajuan"),
    ("1.0 Ajukan", "D2 Peminjaman", "pengajuan baru"),
    ("D2 Peminjaman", "2.0 Cek jadwal", "pengajuan baru"),
    ("D1 Ruang", "2.0 Cek jadwal", "jadwal ruang"),
    ("2.0 Cek jadwal", "Bagian Umum", "daftar pengajuan"),
    ("Bagian Umum", "3.0 Putuskan", "keputusan"),
    ("3.0 Putuskan", "D2 Peminjaman", "status baru"),
    ("3.0 Putuskan", "D1 Ruang", "jadwal terisi"),
    ("3.0 Putuskan", "Ormawa", "status pengajuan"),
    ("D2 Peminjaman", "4.0 Laporkan", "riwayat"),
    ("4.0 Laporkan", "Bagian Umum", "laporan bulanan"),
]

def jenis(simpul):
    if simpul in ENTITAS:
        return "entitas"
    if simpul in SIMPANAN:
        return "simpanan"
    return "proses"

def periksa_aturan(aliran):
    """Aliran data harus menyentuh setidaknya satu proses."""
    galat = []
    for asal, tujuan, nama in aliran:
        a, t = jenis(asal), jenis(tujuan)
        if a != "proses" and t != "proses":
            galat.append((a + " ke " + t + " tanpa proses",
                          asal + " -> " + tujuan + " ('" + nama + "')"))
    # diurutkan supaya keluaran sama di setiap eksekusi
    for p in sorted({x for x, _, _ in aliran} | {y for _, y, _ in aliran}):
        if jenis(p) != "proses":
            continue
        masuk = [n for _, y, n in aliran if y == p]
        keluar = [n for x, _, n in aliran if x == p]
        if masuk and not keluar:
            galat.append(("LUBANG HITAM", p + ": ada masukan, tanpa keluaran"))
        if keluar and not masuk:
            galat.append(("KEAJAIBAN", p + ": ada keluaran, tanpa masukan"))
    return galat

def aliran_luar(aliran):
    """Aliran yang menyentuh entitas luar: (entitas, arah, nama)."""
    hasil = set()
    for asal, tujuan, nama in aliran:
        if asal in ENTITAS:
            hasil.add((asal, "masuk", nama))
        if tujuan in ENTITAS:
            hasil.add((tujuan, "keluar", nama))
    return hasil

def tulis_aliran(aliran):
    for asal, tujuan, nama in aliran:
        print("  " + format(asal, ">15") + " --" + format(nama, "-<18") + "> " + tujuan)

# --------------------------------------------
# 1. Diagram konteks dan level 1
# --------------------------------------------
print("--- diagram konteks: sistem sebagai satu proses ---")
tulis_aliran(KONTEKS)
print("\n--- DFD level 1: proses di dalam sistem ---")
tulis_aliran(LEVEL1)

# --------------------------------------------
# 2. Pemeriksaan aturan
# --------------------------------------------
print("\n--- pemeriksaan aturan level 1 ---")
g = periksa_aturan(LEVEL1)
print("  " + ("tidak ada pelanggaran" if not g else str(g)))

print("\n--- balancing: aliran luar konteks vs level 1 ---")
k, l1 = aliran_luar(KONTEKS), aliran_luar(LEVEL1)
print("  aliran luar di konteks : " + str(len(k)))
print("  aliran luar di level 1 : " + str(len(l1)))
print("  seimbang: " + ("YA" if k == l1 else "TIDAK"))

# --------------------------------------------
# 3. Kesalahan yang sering dibuat, dan pemeriksaannya
# --------------------------------------------
print("\n--- DFD level 1 versi pertama (dengan kesalahan) ---")
SALAH = [a for a in LEVEL1 if a[2] != "laporan bulanan"]
SALAH += [
    ("Ormawa", "Bagian Umum", "surat permohonan"),        # entitas ke entitas
    ("Ormawa", "D2 Peminjaman", "isi formulir"),          # entitas ke simpanan
    ("3.0 Putuskan", "Ormawa", "notifikasi penolakan"),   # tidak ada di konteks
]
for jenis_galat, rinci in periksa_aturan(SALAH):
    print("  ATURAN  " + jenis_galat)
    print("          " + rinci)
kurang = aliran_luar(KONTEKS) - aliran_luar(SALAH)
lebih = aliran_luar(SALAH) - aliran_luar(KONTEKS)
for e, arah, nama in sorted(kurang):
    print("  BALANCE hilang di level 1 (ada di konteks)")
    print("          '" + nama + "', " + arah + ", " + e)
for e, arah, nama in sorted(lebih):
    print("  BALANCE muncul di level 1 (tidak ada di konteks)")
    print("          '" + nama + "', " + arah + ", " + e)
print()
print("  Membuang aliran 'laporan bulanan' membuat 4.0 Laporkan jadi")
print("  lubang hitam: ia membaca riwayat, tetapi tidak menghasilkan")
print("  apa pun. Proses yang tidak menghasilkan apa-apa tidak perlu")
print("  ada -- atau keluarannya lupa digambar.")` },
  output: `--- diagram konteks: sistem sebagai satu proses ---
           Ormawa --data pengajuan----> 0 Sistem
         0 Sistem --status pengajuan--> Ormawa
      Bagian Umum --keputusan---------> 0 Sistem
         0 Sistem --daftar pengajuan--> Bagian Umum
         0 Sistem --laporan bulanan---> Bagian Umum

--- DFD level 1: proses di dalam sistem ---
           Ormawa --data pengajuan----> 1.0 Ajukan
       1.0 Ajukan --pengajuan baru----> D2 Peminjaman
    D2 Peminjaman --pengajuan baru----> 2.0 Cek jadwal
         D1 Ruang --jadwal ruang------> 2.0 Cek jadwal
   2.0 Cek jadwal --daftar pengajuan--> Bagian Umum
      Bagian Umum --keputusan---------> 3.0 Putuskan
     3.0 Putuskan --status baru-------> D2 Peminjaman
     3.0 Putuskan --jadwal terisi-----> D1 Ruang
     3.0 Putuskan --status pengajuan--> Ormawa
    D2 Peminjaman --riwayat-----------> 4.0 Laporkan
     4.0 Laporkan --laporan bulanan---> Bagian Umum

--- pemeriksaan aturan level 1 ---
  tidak ada pelanggaran

--- balancing: aliran luar konteks vs level 1 ---
  aliran luar di konteks : 5
  aliran luar di level 1 : 5
  seimbang: YA

--- DFD level 1 versi pertama (dengan kesalahan) ---
  ATURAN  entitas ke entitas tanpa proses
          Ormawa -> Bagian Umum ('surat permohonan')
  ATURAN  entitas ke simpanan tanpa proses
          Ormawa -> D2 Peminjaman ('isi formulir')
  ATURAN  LUBANG HITAM
          4.0 Laporkan: ada masukan, tanpa keluaran
  BALANCE hilang di level 1 (ada di konteks)
          'laporan bulanan', keluar, Bagian Umum
  BALANCE muncul di level 1 (tidak ada di konteks)
          'surat permohonan', keluar, Bagian Umum
  BALANCE muncul di level 1 (tidak ada di konteks)
          'notifikasi penolakan', keluar, Ormawa
  BALANCE muncul di level 1 (tidak ada di konteks)
          'isi formulir', masuk, Ormawa
  BALANCE muncul di level 1 (tidak ada di konteks)
          'surat permohonan', masuk, Ormawa

  Membuang aliran 'laporan bulanan' membuat 4.0 Laporkan jadi
  lubang hitam: ia membaca riwayat, tetapi tidak menghasilkan
  apa pun. Proses yang tidak menghasilkan apa-apa tidak perlu
  ada -- atau keluarannya lupa digambar.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Memeriksa aturan untuk a aliran dan p proses', waktu: 'O(a · p)', memori: 'O(a)' },
      { operasi: 'Membangun himpunan aliran luar', waktu: 'O(a)', memori: 'O(a)' },
      { operasi: 'Balancing dua tingkat', waktu: 'O(a)', memori: 'selisih himpunan' },
      { operasi: 'Memeriksa dengan mata', waktu: 'bertambah cepat seiring ukuran', memori: 'mudah melewatkan' }
    ],
    intuisi: `Pemeriksaan otomatis hampir gratis: diagram level 1 biasa punya belasan aliran dan beberapa proses. Kode di program ini menghitung masukan dan keluaran untuk setiap proses dengan menyisir seluruh daftar aliran — O(a · p) — yang bisa dipercepat dengan kamus, tetapi untuk ukuran DFD sungguhan tidak perlu.

Baris terakhir adalah perbandingan yang sebenarnya penting. Memeriksa balancing dengan mata berarti mencocokkan setiap panah di satu gambar dengan setiap panah di gambar lain — dan kesalahan satu kata di nama aliran, seperti "daftar pengajuan" lawan "daftar permohonan", hampir tidak terlihat. Program tidak pernah melewatkannya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menggambar urutan langkah dan keputusan di DFD, seperti "jika disetujui".',
      kenapa: 'DFD menggambar aliran data, bukan alur kendali. Keputusan dan urutan milik flowchart atau activity diagram.',
      benar: 'Gambar keputusan sebagai proses yang menghasilkan aliran data, misalnya 3.0 Putuskan yang menghasilkan status baru.'
    },
    {
      salah: 'Menghubungkan entitas luar langsung ke simpanan data.',
      kenapa: 'Data tidak berpindah sendiri. Selalu ada proses yang menerima, memeriksa, dan menyimpannya, dan proses itu adalah bagian sistem yang harus dirancang.',
      benar: 'Tambahkan proses di antara entitas dan simpanan, misalnya 1.0 Ajukan.'
    },
    {
      salah: 'Menggambar aliran antara dua entitas luar.',
      kenapa: 'Aliran itu terjadi di luar batas sistem dan bukan tanggung jawab sistem. Menggambarnya mengaburkan batas yang justru ingin ditunjukkan diagram.',
      benar: 'Hapus aliran entitas ke entitas, atau kalau sistem memang harus terlibat, tambahkan proses yang meneruskannya.'
    },
    {
      salah: 'Menambah aliran luar baru di level 1 tanpa memperbarui diagram konteks.',
      kenapa: 'Kedua tingkat tidak lagi seimbang, sehingga diagram konteks tidak lagi menggambarkan batas sistem yang sebenarnya.',
      benar: 'Periksa balancing setelah setiap perubahan, dan perbarui diagram konteks bila aliran barunya memang dibutuhkan.'
    },
    {
      salah: 'Memberi nama proses dengan kata benda dan aliran dengan kata kerja.',
      kenapa: 'Proses adalah sesuatu yang dikerjakan, dan aliran adalah sesuatu yang berpindah. Nama yang tertukar membuat diagram sulit dibaca dan menyembunyikan proses yang sebenarnya tidak ada.',
      benar: 'Namai proses dengan kata kerja seperti Ajukan atau Putuskan, dan aliran dengan kata benda seperti data pengajuan.'
    },
    {
      salah: 'Memecah proses level 1 menjadi puluhan proses kecil.',
      kenapa: 'Diagram dengan terlalu banyak proses tidak lagi memberi gambaran menyeluruh, yang justru menjadi tujuan level 1.',
      benar: 'Batasi 3 sampai 7 proses per diagram, dan pecah proses yang rumit ke DFD level 2.'
    }
  ],

  analogi: `Bayangkan **dapur rumah makan**.

**Diagram konteks.** Dari luar, dapur adalah satu kotak hitam. Pelayan memberi pesanan, dapur memberi makanan jadi. Pemasok memberi bahan, dapur memberi daftar belanja. Pemilik menerima laporan bahan terpakai. Itu saja — tidak perlu tahu siapa memotong bawang atau di mana beras disimpan. Diagram konteks menjawab: apa saja yang masuk dan keluar dari dapur?

**Level 1.** Sekarang kita masuk ke dapur. Ada stasiun penerima pesanan, stasiun memasak, stasiun penataan, dan gudang bahan serta rak pesanan. Pesanan masuk ke stasiun penerima, ditaruh di rak pesanan, diambil stasiun memasak, yang juga mengambil bahan dari gudang.

**Aturan pertama.** Pelayan tidak bisa menaruh pesanan langsung ke gudang bahan — harus ada yang menerima dan menaruhnya di tempat yang benar. Dan pelayan menyerahkan uang kembalian ke tamu bukan urusan dapur; tidak digambar di diagram dapur.

**Lubang hitam.** Ada stasiun yang menerima bahan setiap pagi, tetapi tidak pernah mengeluarkan apa pun. Entah stasiun itu tidak berguna, entah ada keluarannya yang lupa dicatat — mungkin kaldu yang dibawa ke stasiun memasak.

**Balancing.** Setelah masuk ke dapur, semua yang masuk dan keluar di pintu dapur harus tetap sama. Kalau di gambar bagian dalam tiba-tiba ada makanan yang keluar lewat jendela langsung ke tamu, padahal di gambar luar tidak ada jendela, salah satu gambar keliru. Memecah dapur menjadi stasiun-stasiun tidak boleh mengubah apa yang dilihat dari luar.`,

  latihan: [
    'Gambar diagram konteks untuk sistem absensi praktikum dengan setidaknya tiga entitas luar.',
    'Pecah diagram konteks latihan nomor 1 menjadi DFD level 1 dengan 4 sampai 5 proses dan dua simpanan data.',
    'Tulis DFD level 1-mu sebagai daftar tuple, lalu jalankan pemeriksa aturan dan balancing dari program topik ini.',
    'Tambahkan aliran "rekap mingguan" ke level 1 tanpa mengubah diagram konteks, lalu tunjukkan temuan balancing-nya.',
    'Beri satu contoh proses yang sah tanpa aliran masuk dari entitas, dan jelaskan dari mana ia mendapat data.',
    'Perbaiki ketiga pelanggaran aturan di "versi pertama" topik ini sehingga pemeriksa tidak lagi menemukan apa pun.',
    'Pecah proses 3.0 Putuskan menjadi DFD level 2 dengan tiga subproses, lalu periksa balancing-nya terhadap level 1.',
    'Bandingkan DFD level 1 sistem peminjaman ruang dengan activity diagram untuk sistem yang sama: apa yang terlihat di satu dan tidak di yang lain?',
    'Tentukan tabel-tabel basis data dari simpanan data di DFD level 1-mu.',
    'Jelaskan kenapa aliran dari entitas ke entitas tidak digambar di DFD.'
  ]
});


TOPICS.push({
  id: 'ads-kelayakan',
  judul: 'Studi Kelayakan — Payback, ROI & NPV',
  kategori: 'ads',
  tag: ['studi kelayakan', 'TELOS', 'analisis biaya-manfaat', 'payback period', 'ROI', 'NPV', 'nilai waktu uang'],
  ringkas: 'Apakah sistem ini layak dibangun? Tiga ukuran ekonomi yang bisa memilih pemenang berbeda untuk data yang sama — dan cara mengetahui seberapa jauh perkiraan boleh meleset.',

  fungsi: `**Menjawab, sebelum proyek dimulai, apakah sistem yang diusulkan layak dibangun: secara teknis, ekonomis, hukum, operasional, dan jadwal.**

Topik analisis kebutuhan membahas **apa** yang harus dibuat. Studi kelayakan membahas **apakah** ia layak dibuat — dan dengan cara apa.

Terpakai di:

- **Proposal proyek dan tugas akhir** — bab kelayakan sering diminta sebelum rancangan disetujui
- **Memilih di antara alternatif** — membangun sendiri, membeli paket jadi, atau berlangganan layanan
- **Meyakinkan pemberi dana** — pimpinan organisasi, dosen pembimbing, atau investor ingin tahu kapan uangnya kembali
- **Keputusan "jangan dibangun"** — studi kelayakan yang baik kadang menyimpulkan sistemnya tidak layak, dan itu penghematan terbesar

Yang paling penting dipahami: **ukuran yang berbeda bisa memilih pemenang yang berbeda.** Di kasus topik ini, payback dan ROI memilih berlangganan, sedangkan NPV memilih membangun sendiri. Keduanya benar — mereka menjawab pertanyaan yang berbeda.

Dan satu pertanyaan yang jarang ditanyakan tetapi paling menentukan: **seberapa jauh perkiraan manfaatnya boleh meleset** sebelum proyeknya merugi?`,

  praktik: {
    tujuan: 'Kamu bisa menilai kelayakan dengan kerangka TELOS, menyusun arus kas biaya dan manfaat, menghitung payback, ROI, dan NPV, dan menghitung manfaat impas untuk mengetahui kekokohan kesimpulanmu.',
    alat: ['Python 3 atau lembar kerja', 'Perkiraan biaya dan manfaat dari pemangku kepentingan'],
    langkah: [
      { judul: 'Periksa lima aspek TELOS',
        isi: `- **Technical**: apakah teknologinya tersedia dan tim mampu memakainya?
- **Economic**: apakah manfaatnya melebihi biayanya?
- **Legal**: apakah ada aturan yang dilanggar — perlindungan data pribadi, lisensi perangkat lunak?
- **Operational**: apakah pengguna mau dan bisa memakainya?
- **Schedule**: apakah bisa selesai sebelum dibutuhkan?

Satu aspek yang gagal cukup untuk membuat proyek tidak layak, seberapa bagus pun aspek lainnya.` },
      { judul: 'Daftar biaya',
        isi: `Biaya awal (pengembangan, perangkat keras, pelatihan) dan biaya operasional tahunan (hosting, langganan, pemeliharaan, staf). Biaya operasional yang sering terlupa: pemeliharaan, yang untuk sistem yang dibangun sendiri bisa berlangsung bertahun-tahun.` },
      { judul: 'Daftar manfaat yang bisa dihitung',
        isi: `Jam kerja yang dihemat dikali biaya per jam, kesalahan yang dicegah dikali biaya setiap kesalahan, kertas dan cetak yang tidak lagi dipakai. Manfaat yang tidak bisa dihitung — kepuasan pengguna, citra organisasi — ditulis terpisah, tidak dicampur ke angka.` },
      { judul: 'Susun arus kas per tahun',
        isi: `Tahun 0: minus biaya awal. Tahun 1 sampai n: manfaat dikurangi biaya operasional. Pakai horizon yang masuk akal untuk umur sistem — biasanya 3 sampai 5 tahun.` },
      { judul: 'Hitung tiga ukuran',
        isi: `- **Payback period**: kapan kas kumulatif menjadi nol
- **ROI**: total kas bersih dibagi total biaya awal
- **NPV**: jumlah kas setiap tahun dibagi (1 + bunga)^tahun

NPV positif berarti proyek menghasilkan lebih dari yang dihasilkan uang yang sama bila disimpan dengan bunga itu.` },
      { judul: 'Hitung manfaat impas',
        isi: `Cari manfaat tahunan yang membuat NPV tepat nol — misalnya dengan metode bagi dua. Bandingkan dengan perkiraan manfaatmu: kalau perkiraannya cuma sedikit di atas titik impas, proyeknya berisiko meskipun NPV-nya positif.` }
    ],
    cek: [
      'Kamu menilai kelima aspek TELOS, bukan cuma aspek ekonomi',
      'Arus kasmu memisahkan biaya awal dan biaya operasional tahunan',
      'Kamu melaporkan payback, ROI, dan NPV, dan bisa menjelaskan kalau ketiganya memilih pemenang berbeda',
      'Kamu menyebut berapa persen perkiraan manfaat boleh meleset sebelum NPV menjadi negatif'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa uang tahun depan dibagi',

  konsep: `Tahap analisis sistem biasanya dimulai dengan satu pertanyaan sebelum pertanyaan lain: **apakah ini layak dikerjakan?** Studi kelayakan menjawabnya dari beberapa sudut, dan hanya satu di antaranya soal uang.

**TELOS: lima aspek kelayakan**

| Aspek | Pertanyaan |
|---|---|
| Technical | teknologinya ada, dan tim mampu memakainya? |
| Economic | manfaatnya melebihi biayanya? |
| Legal | tidak melanggar aturan — data pribadi, lisensi? |
| Operational | pengguna mau dan bisa memakainya? |
| Schedule | bisa selesai sebelum dibutuhkan? |

Sistem peminjaman ruang yang secara ekonomi sangat menguntungkan tetap tidak layak kalau Bagian Umum menolak meninggalkan buku catatan mereka — itu kegagalan operasional. Topik ini memusatkan perhatian pada aspek ekonomi karena ia yang bisa dihitung, tetapi keempat aspek lainnya sama menentukannya.

**Dua alternatif, lima tahun**

Kasus tiruan: sistem peminjaman ruang bisa **dibangun sendiri** (biaya awal besar, operasional kecil) atau **berlangganan layanan SaaS** (biaya awal kecil, langganan tahunan). Manfaatnya sama, perkiraan Rp30 juta per tahun — jam kerja staf yang dihemat, bentrok jadwal yang hilang, kertas yang tidak dipakai.

| | Th 0 | Th 1 | Th 2 | Th 3 | Th 4 | Th 5 |
|---|---|---|---|---|---|---|
| A. bangun sendiri | −60 | 25 | 25 | 25 | 25 | 25 |
| B. langganan SaaS | −10 | 10 | 10 | 10 | 10 | 10 |

(juta rupiah, kas bersih)

**Tiga ukuran, dua pemenang**

| | Payback | ROI 5 tahun | NPV 10% |
|---|---|---|---|
| A. bangun sendiri | 2,4 tahun | 108% | **Rp34,8 jt** |
| B. langganan SaaS | **1,0 tahun** | **400%** | Rp27,9 jt |

**Payback** menjawab "kapan modalnya kembali?" — B, dalam setahun. **ROI** menjawab "berapa kali lipat modalnya?" — B lagi, karena modal awalnya cuma 10 juta.

**NPV** menjawab pertanyaan yang berbeda: "selama lima tahun, alternatif mana yang menghasilkan nilai paling besar, dihitung dalam uang hari ini?" — dan jawabannya A. Langganan B terus berjalan setiap tahun; keuntungan A menumpuk setelah modalnya kembali.

Tidak ada yang salah. Organisasi yang kasnya tipis dan butuh modal kembali cepat mungkin memilih B. Organisasi yang merencanakan lima tahun ke depan dan punya modal memilih A. Studi kelayakan yang baik menyajikan ketiganya dan menjelaskan perbedaannya — bukan memilih satu ukuran yang kebetulan mendukung kesimpulan yang diinginkan.

**Nilai waktu uang**

Kas bersih A Rp25 juta per tahun, tetapi nilainya **hari ini** berbeda-beda menurut kapan uang itu diterima, dengan bunga 10%:

| Tahun | Nilai sekarang |
|---|---|
| 0 | Rp25,0 jt |
| 1 | Rp22,7 jt |
| 3 | Rp18,8 jt |
| 5 | Rp15,5 jt |

Rp25 juta lima tahun lagi setara Rp15,5 juta hari ini — karena Rp15,5 juta hari ini, disimpan dengan bunga 10%, akan menjadi Rp25 juta dalam lima tahun. NPV menjumlahkan semua kas **setelah** diubah ke nilai hari ini. Payback dan ROI sederhana tidak melakukannya — dan itu salah satu alasan mereka menyukai B, yang manfaatnya datang lebih awal.

**Seberapa jauh perkiraan boleh meleset**

Manfaat Rp30 juta per tahun adalah **perkiraan**. Kalau ternyata lebih kecil:

| Manfaat per tahun | NPV A | NPV B |
|---|---|---|
| Rp30 jt | Rp34,8 jt | Rp27,9 jt |
| Rp25 jt | Rp15,8 jt | Rp9,0 jt |
| Rp22 jt | Rp4,4 jt | **−Rp2,4 jt** |
| Rp20 jt | **−Rp3,1 jt** | −Rp10,0 jt |

Manfaat impas — NPV tepat nol — adalah **Rp20,8 juta** untuk A dan **Rp22,6 juta** untuk B. Artinya A tetap layak selama manfaat sebenarnya tidak meleset lebih dari **31 persen**; B cuma boleh meleset **25 persen**.

Angka ini sering lebih berguna daripada NPV itu sendiri. Pemberi dana tidak bertanya "berapa NPV-nya?", melainkan "seberapa yakin kamu?" — dan jawabannya: "perkiraan manfaat kami boleh meleset hampir sepertiga sebelum proyek ini merugi".`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def npv(kas, bunga):\n    return sum(k / (1 + bunga) ** t for t, k in enumerate(kas))\n\ndef payback(kas):\n    kumulatif = 0\n    for t, k in enumerate(kas):\n        sebelum = kumulatif\n        kumulatif += k\n        if t > 0 and sebelum < 0 <= kumulatif:\n            return t - 1 + (-sebelum / k)     # interpolasi dalam tahun t\n    return None\n\nkas_A = [-60, 25, 25, 25, 25, 25]\nnpv(kas_A, 0.10)      # 34.8\npayback(kas_A)        # 2.4 tahun",
      penjelasan: `Dua fungsi pendek, dan perbedaan di antara keduanya adalah perbedaan antara dua cara berpikir tentang uang.

**NPV: setiap tahun dibagi (1 + bunga)^t.**

Uang yang diterima t tahun lagi dibagi (1,10)^t. Tahun 0 dibagi 1 — tidak berubah. Tahun 1 dibagi 1,1. Tahun 5 dibagi 1,61.

Pembagian itu menjawab: "berapa uang yang harus kusimpan **hari ini**, dengan bunga 10%, supaya menjadi sebesar ini pada tahun t?" Rp25 juta tahun kelima setara Rp15,5 juta hari ini, karena 15,5 × 1,1⁵ ≈ 25.

Setelah semua tahun diubah ke nilai hari ini, mereka bisa dijumlahkan dengan adil. Menjumlahkan uang dari tahun yang berbeda tanpa pembagian itu sama dengan menjumlahkan rupiah dan dolar.

**Kenapa bunga 10%.**

Angka bunga di NPV — disebut tingkat diskonto — adalah hasil yang bisa didapat kalau uangnya dipakai untuk hal lain: disimpan, diinvestasikan, atau dipakai proyek lain. Ia bukan hukum alam; organisasi menetapkannya. Tingkat yang lebih tinggi membuat uang di masa depan makin kecil nilainya, dan menguntungkan alternatif yang manfaatnya datang lebih awal.

**Payback: sederhana, dan buta setelah modal kembali.**

Payback menjumlahkan kas dari tahun ke tahun sampai jumlahnya tidak lagi negatif. Kalau titik nol jatuh di tengah tahun, interpolasi memperkirakan kapan: A punya −10 di akhir tahun 2 dan menerima 25 di tahun 3, jadi modalnya kembali 10/25 = 0,4 tahun setelah akhir tahun 2 — 2,4 tahun.

Tetapi perhatikan apa yang **tidak** dilihat payback: semua yang terjadi setelah modal kembali. Proyek yang modalnya kembali dalam setahun lalu berhenti menghasilkan, dan proyek yang modalnya kembali dalam dua tahun lalu menghasilkan besar selama sepuluh tahun — payback memilih yang pertama.

**Kenapa \`t > 0\` di syaratnya.**

Tahun 0 selalu negatif — biaya awal. Syarat \`sebelum < 0 <= kumulatif\` di tahun 0 tidak pernah terpenuhi karena kas kumulatif sebelumnya 0, tetapi menuliskan \`t > 0\` membuat maksudnya jelas: payback dihitung dari tahun pertama operasi.

**Dan \`return None\`.**

Kalau kas kumulatif tidak pernah mencapai nol dalam horizon yang dihitung, modalnya tidak kembali — dan itu jawaban yang penting, bukan galat. Program menampilkannya sebagai tanda hubung.`
    },
    {
      bahasa: 'python',
      kode: "lo, hi = 0.0, 100.0\nfor _ in range(60):                         # metode bagi dua\n    mid = (lo + hi) / 2\n    if npv(arus(awal, operasional, mid), 0.10) < 0:\n        lo = mid                             # manfaat terlalu kecil\n    else:\n        hi = mid\n# manfaat impas A: Rp20,8 jt per tahun -> boleh meleset 31%\n# manfaat impas B: Rp22,6 jt per tahun -> boleh meleset 25%",
      penjelasan: `Metode bagi dua dari Matematika Dasar, dipakai untuk menjawab pertanyaan yang paling sering ditanyakan pemberi dana.

**Pertanyaannya.**

"Berapa manfaat tahunan minimum supaya proyek ini tidak merugi?" Dalam bahasa matematika: cari m yang membuat NPV(m) = 0.

**Kenapa metode bagi dua cocok.**

NPV naik lurus terhadap manfaat tahunan — setiap tambahan manfaat menambah NPV dengan jumlah yang sama. Fungsi itu kontinu dan monoton, jadi di selang [0, 100] ada tepat satu titik nol, dan metode bagi dua pasti menemukannya. Enam puluh langkah membelah selang selebar 100 sampai ketelitian jauh di bawah satu rupiah.

Untuk kasus sesederhana ini, titik impas sebenarnya bisa dihitung dengan rumus — manfaat tahunan bersih × faktor anuitas = biaya awal. Tetapi di studi kelayakan sungguhan, arus kasnya jarang serapi itu: manfaat naik bertahap di tahun-tahun awal, ada biaya penggantian perangkat di tahun ketiga. Metode bagi dua bekerja untuk arus kas bentuk apa pun, selama NPV naik ketika manfaat naik.

**Membaca hasilnya.**

A impas di Rp20,8 juta: perkiraan Rp30 juta boleh turun 31 persen sebelum mencapai titik itu. B impas di Rp22,6 juta: perkiraannya cuma boleh turun 25 persen.

Artinya A lebih **kokoh** terhadap kesalahan perkiraan, selain punya NPV lebih besar. Kalau manfaat sebenarnya ternyata Rp22 juta — meleset 27 persen, hal yang sangat mungkin untuk perkiraan manfaat — A masih untung Rp4,4 juta sedangkan B merugi Rp2,4 juta.

**Kenapa ini lebih berguna dari NPV.**

NPV yang dilaporkan bergantung sepenuhnya pada perkiraan manfaat — dan perkiraan manfaat adalah angka paling tidak pasti di seluruh studi kelayakan. Menyebut titik impas memindahkan diskusi dari "apakah angka 30 juta itu benar?" — yang tidak bisa dibuktikan sebelum sistem jalan — ke "apakah kita yakin manfaatnya setidaknya 21 juta?", yang jauh lebih mudah disepakati.

Ini analisis sensitivitas yang sama dengan topik sensitivitas bobot di SPK: bukan cuma menghitung jawaban, tetapi mengukur seberapa jauh jawaban itu bertahan kalau masukannya salah.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Studi kelayakan ekonomi: payback, ROI, NPV
# ============================================

def rp(x):
    """Format juta rupiah: 12.5 -> 'Rp12,5 jt'."""
    tanda = "-" if x < 0 else ""
    return tanda + "Rp" + format(abs(x), ".1f").replace(".", ",") + " jt"

def arus(awal, operasional, manfaat, tahun=5):
    """Arus kas bersih per tahun; tahun 0 = biaya awal."""
    return [-awal] + [manfaat - operasional] * tahun

def payback(kas):
    """Tahun ketika kas kumulatif menjadi nol (dengan interpolasi)."""
    kumulatif = 0
    for t, k in enumerate(kas):
        sebelum = kumulatif
        kumulatif += k
        if t > 0 and sebelum < 0 <= kumulatif:
            return t - 1 + (-sebelum / k)
    return None

def npv(kas, bunga):
    return sum(k / (1 + bunga) ** t for t, k in enumerate(kas))

def roi(kas):
    biaya = -sum(k for k in kas if k < 0)
    return (sum(kas)) / biaya

# Sistem peminjaman ruang (angka dalam juta rupiah, TIRUAN)
# Manfaat: jam kerja staf yang dihemat, bentrok jadwal yang hilang,
# kertas dan cetak yang tidak lagi dipakai.
ALTERNATIF = {
    "A. bangun sendiri": dict(awal=60, operasional=5, manfaat=30),
    "B. langganan SaaS": dict(awal=10, operasional=20, manfaat=30),
}
BUNGA = 0.10

# --------------------------------------------
# 1. Arus kas dan tiga ukuran
# --------------------------------------------
print("--- arus kas bersih lima tahun (juta rupiah, tiruan) ---")
print("  " + format("", "<20") + "".join(format("th " + str(t), ">8") for t in range(6)))
hasil = {}
for nama, a in ALTERNATIF.items():
    kas = arus(**a)
    hasil[nama] = kas
    print("  " + format(nama, "<20") + "".join(format(k, ">8.0f") for k in kas))

print("\n  " + format("", "<20") + format("payback", ">10") + format("ROI 5 th", ">10")
      + format("NPV 10%", ">14"))
for nama, kas in hasil.items():
    pb = payback(kas)
    print("  " + format(nama, "<20") + format(format(pb, ".1f") + " th" if pb else "-", ">10")
          + format(roi(kas), ">10.0%") + format(rp(npv(kas, BUNGA)), ">14"))
print()
print("  Payback dan ROI menyukai B: modal awalnya kecil dan cepat")
print("  kembali. NPV menyukai A: selama lima tahun, A menghasilkan")
print("  lebih banyak nilai -- biaya langganan B terus berjalan.")

# --------------------------------------------
# 2. Kenapa uang tahun depan dinilai lebih kecil
# --------------------------------------------
print("\n--- nilai sekarang dari Rp25 jt (kas bersih A), bunga 10% ---")
for t in range(6):
    print("  tahun " + str(t) + ": " + rp(25 / (1 + BUNGA) ** t))
print("  Uang yang baru diterima tahun kelima bernilai jauh lebih kecil")
print("  hari ini -- uang hari ini bisa disimpan dan berbunga.")

# --------------------------------------------
# 3. Kalau manfaatnya ternyata lebih kecil
# --------------------------------------------
print("\n--- NPV kalau manfaat tahunan meleset ---")
print("  manfaat/tahun   A. bangun sendiri   B. langganan SaaS")
for m in [30, 25, 22, 20]:
    baris = "  " + format(rp(m), "<16")
    for nama, a in ALTERNATIF.items():
        kas = arus(a["awal"], a["operasional"], m)
        baris += format(rp(npv(kas, BUNGA)), ">18")
    print(baris)
print()
print("  Kalau manfaatnya cuma 22 jt per tahun, B sudah merugi,")
print("  tetapi A masih untung. Kalau cuma 20 jt, keduanya merugi.")

impas = {}
for nama, a in ALTERNATIF.items():
    lo, hi = 0.0, 100.0
    for _ in range(60):                    # metode bagi dua
        mid = (lo + hi) / 2
        if npv(arus(a["awal"], a["operasional"], mid), BUNGA) < 0:
            lo = mid
        else:
            hi = mid
    impas[nama] = hi
    print("  manfaat impas " + nama[:2] + " " + rp(hi) + " per tahun (NPV = 0)")
print("  Manfaat 30 jt adalah PERKIRAAN. A tetap layak selama manfaat")
print("  sebenarnya tidak meleset lebih dari "
      + format(1 - impas["A. bangun sendiri"] / 30, ".0%") + "; B cuma boleh meleset "
      + format(1 - impas["B. langganan SaaS"] / 30, ".0%") + ".")` },
  output: `--- arus kas bersih lima tahun (juta rupiah, tiruan) ---
                          th 0    th 1    th 2    th 3    th 4    th 5
  A. bangun sendiri        -60      25      25      25      25      25
  B. langganan SaaS        -10      10      10      10      10      10

                         payback  ROI 5 th       NPV 10%
  A. bangun sendiri       2.4 th      108%     Rp34,8 jt
  B. langganan SaaS       1.0 th      400%     Rp27,9 jt

  Payback dan ROI menyukai B: modal awalnya kecil dan cepat
  kembali. NPV menyukai A: selama lima tahun, A menghasilkan
  lebih banyak nilai -- biaya langganan B terus berjalan.

--- nilai sekarang dari Rp25 jt (kas bersih A), bunga 10% ---
  tahun 0: Rp25,0 jt
  tahun 1: Rp22,7 jt
  tahun 2: Rp20,7 jt
  tahun 3: Rp18,8 jt
  tahun 4: Rp17,1 jt
  tahun 5: Rp15,5 jt
  Uang yang baru diterima tahun kelima bernilai jauh lebih kecil
  hari ini -- uang hari ini bisa disimpan dan berbunga.

--- NPV kalau manfaat tahunan meleset ---
  manfaat/tahun   A. bangun sendiri   B. langganan SaaS
  Rp30,0 jt                Rp34,8 jt         Rp27,9 jt
  Rp25,0 jt                Rp15,8 jt          Rp9,0 jt
  Rp22,0 jt                 Rp4,4 jt         -Rp2,4 jt
  Rp20,0 jt                -Rp3,1 jt        -Rp10,0 jt

  Kalau manfaatnya cuma 22 jt per tahun, B sudah merugi,
  tetapi A masih untung. Kalau cuma 20 jt, keduanya merugi.
  manfaat impas A. Rp20,8 jt per tahun (NPV = 0)
  manfaat impas B. Rp22,6 jt per tahun (NPV = 0)
  Manfaat 30 jt adalah PERKIRAAN. A tetap layak selama manfaat
  sebenarnya tidak meleset lebih dari 31%; B cuma boleh meleset 25%.`,

  kompleksitas: {
    tabel: [
      { operasi: 'NPV untuk horizon n tahun', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Payback', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Manfaat impas dengan metode bagi dua, k langkah', waktu: 'O(k · n)', memori: 'O(n)' },
      { operasi: 'Membandingkan a alternatif', waktu: 'O(a · n)', memori: 'O(a · n)' }
    ],
    intuisi: `Semua perhitungannya sepele — lima tahun, dua alternatif. Yang mahal di studi kelayakan adalah **mendapatkan angka-angkanya**: berapa jam kerja yang benar-benar dihemat, berapa biaya pemeliharaan tahun ketiga, berapa kali bentrok jadwal terjadi sekarang.

Karena itu nilai terbesar program seperti ini bukan menghitung satu jawaban, melainkan menghitung ulang dengan cepat saat angkanya berubah — dan menunjukkan angka mana yang paling menentukan. Kalau NPV hampir tidak berubah saat biaya operasional meleset tetapi berubah besar saat manfaat meleset, usaha pengumpulan data harus dipusatkan ke manfaat.`
  },

  kesalahanUmum: [
    {
      salah: 'Menilai kelayakan hanya dari aspek ekonomi.',
      kenapa: 'Sistem yang sangat menguntungkan tetap gagal kalau penggunanya menolak memakainya, melanggar aturan perlindungan data, atau selesai setelah tidak lagi dibutuhkan.',
      benar: 'Nilai kelima aspek TELOS, dan nyatakan proyek tidak layak bila satu saja gagal.'
    },
    {
      salah: 'Memilih alternatif hanya dengan payback period.',
      kenapa: 'Payback mengabaikan semua yang terjadi setelah modal kembali. Di kasus ini, payback memilih langganan, padahal membangun sendiri menghasilkan nilai lebih besar dalam lima tahun.',
      benar: 'Laporkan payback, ROI, dan NPV bersama, lalu jelaskan kalau ketiganya memilih pemenang berbeda.'
    },
    {
      salah: 'Menjumlahkan kas dari tahun-tahun berbeda tanpa diskonto.',
      kenapa: 'Uang yang diterima lima tahun lagi bernilai lebih kecil dari uang hari ini, karena uang hari ini bisa disimpan dan berbunga. Tanpa diskonto, alternatif yang manfaatnya datang terlambat terlihat lebih baik dari sebenarnya.',
      benar: 'Pakai NPV dengan tingkat diskonto yang ditetapkan organisasi.'
    },
    {
      salah: 'Melupakan biaya pemeliharaan untuk sistem yang dibangun sendiri.',
      kenapa: 'Perangkat lunak butuh perbaikan, pembaruan keamanan, dan penyesuaian selama dipakai. Menghilangkan biaya itu membuat membangun sendiri tampak jauh lebih murah dari kenyataannya.',
      benar: 'Masukkan biaya pemeliharaan tahunan ke biaya operasional, sejujur biaya langganan di alternatif lain.'
    },
    {
      salah: 'Melaporkan NPV sebagai angka pasti tanpa menyebut ketidakpastian manfaatnya.',
      kenapa: 'Perkiraan manfaat adalah angka paling tidak pasti di studi kelayakan. NPV positif yang cuma sedikit di atas titik impas bisa berubah negatif oleh kesalahan perkiraan yang wajar.',
      benar: 'Hitung manfaat impas dan laporkan berapa persen perkiraan boleh meleset sebelum proyek merugi.'
    },
    {
      salah: 'Mencampur manfaat yang tidak terukur ke dalam angka.',
      kenapa: 'Angka seperti "citra organisasi bernilai Rp50 juta" tidak bisa diperiksa, dan membuat seluruh perhitungan tampak lebih pasti dari kenyataannya.',
      benar: 'Tulis manfaat tak terukur terpisah sebagai pertimbangan kualitatif, di luar perhitungan NPV.'
    }
  ],

  analogi: `Bayangkan kamu memilih antara **membeli sepeda motor** atau **naik ojek daring** untuk ke kampus selama lima tahun.

**Beli motor**: keluar uang besar sekarang untuk harga motor, lalu bensin dan servis setiap tahun — murah. **Naik ojek**: hampir tidak keluar apa-apa sekarang, tetapi ongkosnya dibayar terus setiap hari — mahal kalau dijumlahkan setahun.

**Payback.** "Kapan uangku kembali?" Ojek menang telak: tidak ada modal besar yang harus kembali. Tetapi pertanyaan ini tidak melihat apa yang terjadi di tahun kedua sampai kelima.

**NPV.** "Selama lima tahun, mana yang lebih hemat, dihitung dalam uang hari ini?" Kalau kamu memang lima tahun di kampus, motor bisa menang — setelah harga motornya "terbayar", setiap tahun berikutnya jauh lebih murah dari ojek.

**Nilai waktu uang.** Uang harga motor yang harus kamu bayar hari ini lebih "berat" dari uang ojek yang dibayar tiga tahun lagi — karena uang hari ini, kalau tidak dipakai beli motor, bisa ditabung dan berbunga. Itulah kenapa pembayaran di masa depan dibagi dulu sebelum dijumlahkan.

**Titik impas.** Rencanamu memakai motor setiap hari. Tetapi bagaimana kalau ternyata kuliahmu banyak yang daring, dan kamu cuma ke kampus dua hari seminggu? Pada titik tertentu, ojek jadi lebih hemat. Pertanyaan yang cerdas bukan "mana yang lebih hemat?", melainkan "berapa hari seminggu minimum aku harus ke kampus supaya beli motor masuk akal?" — dan apakah kamu cukup yakin akan melampauinya.

**TELOS.** Semua hitungan itu tidak berarti kalau kamu belum punya SIM — itu kelayakan hukum. Atau kalau kos-mu tidak punya tempat parkir — kelayakan operasional.`,

  latihan: [
    'Nilai kelayakan sistem absensi praktikum dengan kelima aspek TELOS, masing-masing dengan satu kalimat alasan.',
    'Hitung payback, ROI, dan NPV 10% untuk arus kas −40, 12, 15, 18, 18, 18 dengan tangan, lalu periksa dengan program.',
    'Hitung NPV kedua alternatif di topik ini dengan tingkat diskonto 5% dan 20%, lalu jelaskan kenapa urutannya bisa berubah.',
    'Tambahkan biaya penggantian server Rp15 juta di tahun ketiga untuk alternatif A, lalu hitung ulang ketiga ukuran.',
    'Hitung manfaat impas untuk arus kas latihan nomor 2.',
    'Susun alternatif C: membeli paket jadi dengan biaya awal Rp35 juta dan pemeliharaan Rp10 juta per tahun, lalu bandingkan dengan A dan B.',
    'Jelaskan kenapa payback dan ROI menyukai alternatif B di topik ini, sedangkan NPV menyukai A.',
    'Ubah horizon menjadi 3 tahun, lalu tentukan apakah A masih lebih baik dari B menurut NPV.',
    'Daftar manfaat tak terukur sistem peminjaman ruang, dan jelaskan kenapa tidak dimasukkan ke perhitungan NPV.',
    'Tulis satu paragraf kesimpulan studi kelayakan ekonomi untuk kasus ini yang menyebut rekomendasi, NPV, dan batas perkiraan manfaatnya.'
  ]
});


TOPICS.push({
  id: 'ads-state-machine',
  judul: 'State Machine Diagram',
  kategori: 'ads',
  tag: ['state machine', 'statechart', 'keadaan', 'transisi', 'peristiwa', 'tabel transisi', 'UML'],
  ringkas: 'Keadaan apa saja yang bisa dimiliki satu objek, dan peristiwa apa yang memindahkannya — diagram UML yang langsung bisa diterjemahkan menjadi satu tabel di kode.',

  fungsi: `**Menggambar semua keadaan yang mungkin dimiliki satu objek sepanjang hidupnya, dan peristiwa yang memindahkannya dari satu keadaan ke keadaan lain.**

Topik UML perilaku membahas use case dan activity diagram: apa yang dilakukan pengguna dan sistem. State machine diagram membahas satu hal yang lebih sempit tetapi sangat sering salah diimplementasikan: **status sebuah objek**.

Terpakai di:

- **Status pengajuan dan pesanan** — draf, diajukan, disetujui, ditolak, dibatalkan
- **Status akun dan langganan** — aktif, ditangguhkan, kedaluwarsa
- **Protokol dan perangkat** — koneksi TCP, lampu lalu lintas, mesin penjual otomatis
- **Validasi aturan bisnis** — "pengajuan yang sudah ditolak tidak bisa disetujui" tertulis di diagram, bukan tersebar di puluhan \`if\`

Yang paling berguna dipahami: **diagram ini bisa langsung menjadi kode.** Setiap panah adalah satu baris di tabel transisi, dan tabel itu sendiri yang menolak peristiwa yang tidak sah — tanpa satu pun \`if\` tambahan.

Dan kesalahan implementasi yang paling umum: **menyimpan status sebagai beberapa kolom boolean.** Enam kolom boolean bisa menyimpan 64 kombinasi, padahal cuma 8 yang bermakna. Sisanya — seperti "disetujui dan ditolak sekaligus" — adalah keadaan mustahil yang tetap bisa tersimpan.`,

  praktik: {
    tujuan: 'Kamu bisa menggambar state machine diagram untuk satu objek, menerjemahkannya menjadi tabel transisi, memeriksa keadaan yang tak terjangkau dan buntu, dan menjelaskan kenapa satu kolom status lebih baik dari beberapa boolean.',
    alat: ['draw.io atau kertas', 'Python 3'],
    langkah: [
      { judul: 'Pilih satu objek',
        isi: `State machine diagram menggambar **satu** objek — satu pengajuan peminjaman, bukan seluruh sistem. Pilih objek yang statusnya berubah dan aturannya penting.` },
      { judul: 'Daftar keadaannya',
        isi: `Tulis setiap keadaan dengan kata sifat atau kata kerja bentuk pasif: Draf, Diajukan, Diverifikasi, Disetujui, Ditolak, Dipakai, Selesai, Dibatalkan. Tandai satu keadaan awal dan keadaan-keadaan akhir.` },
      { judul: 'Gambar transisinya',
        isi: `Setiap panah diberi nama peristiwa yang memicunya: ajukan, verifikasi, setujui. Kalau transisi hanya boleh terjadi dengan syarat, tulis **guard** di kurung siku: setujui [ruang masih kosong].` },
      { judul: 'Terjemahkan menjadi tabel',
        isi: `Setiap panah menjadi satu baris: (keadaan asal, peristiwa) → keadaan tujuan. Di Python, sebuah kamus dengan kunci tuple. Pasangan yang tidak ada di tabel adalah transisi yang tidak sah.` },
      { judul: 'Periksa keterjangkauan dan jalan buntu',
        isi: `Telusuri dari keadaan awal dengan BFS: setiap keadaan yang tidak tercapai adalah kesalahan gambar. Lalu cari keadaan bukan-akhir yang tidak punya transisi keluar: objek yang masuk ke sana terjebak selamanya.` },
      { judul: 'Simpan satu kolom status',
        isi: `Di basis data, simpan status sebagai satu kolom — misalnya ENUM atau teks dengan batasan CHECK — bukan beberapa kolom boolean. Setiap perubahan status lewat satu fungsi yang memeriksa tabel transisi.` }
    ],
    cek: [
      'Diagrammu menggambar satu objek, dengan satu keadaan awal dan keadaan akhir yang jelas',
      'Setiap panah punya nama peristiwa',
      'Tidak ada keadaan tak terjangkau dan tidak ada keadaan bukan-akhir yang buntu',
      'Implementasimu menolak transisi yang tidak ada di tabel tanpa if tambahan'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa tabel, bukan if',

  konsep: `Activity diagram di topik UML perilaku menggambar **alur kerja**: langkah-langkah yang dilakukan, siapa melakukannya, dan urutannya. State machine diagram menggambar sesuatu yang berbeda: **riwayat hidup satu objek**.

**Tiga unsur**

- **Keadaan** (state): kotak bersudut bulat — Draf, Diajukan, Disetujui
- **Transisi**: panah dari satu keadaan ke keadaan lain, diberi nama **peristiwa** yang memicunya
- **Keadaan awal** (lingkaran penuh) dan **keadaan akhir** (lingkaran bertepi)

**Kasus: pengajuan peminjaman ruang**

| Keadaan asal | Peristiwa | Keadaan tujuan |
|---|---|---|
| Draf | ajukan | Diajukan |
| Draf | batalkan | Dibatalkan |
| Diajukan | verifikasi | Diverifikasi |
| Diajukan | kembalikan | Draf |
| Diajukan | batalkan | Dibatalkan |
| Diverifikasi | setujui | Disetujui |
| Diverifikasi | tolak | Ditolak |
| Disetujui | batalkan | Dibatalkan |
| Disetujui | pakai | Dipakai |
| Dipakai | kembalikan kunci | Selesai |

Delapan keadaan, sepuluh transisi. Keadaan akhir: Selesai, Ditolak, Dibatalkan.

Setiap baris tabel ini adalah satu panah di diagram — dan diagram yang digambar di draw.io bisa dibaca kembali menjadi tabel ini tanpa kehilangan apa pun.

**Menjalankan urutan peristiwa**

| Urutan peristiwa | Hasil |
|---|---|
| ajukan, verifikasi, setujui, pakai, kembalikan kunci | berakhir di Selesai |
| ajukan, kembalikan, ajukan, verifikasi, tolak | berakhir di Ditolak |
| ajukan, setujui | **ditolak**: "setujui" tidak sah di Diajukan |
| ajukan, verifikasi, tolak, ajukan | **ditolak**: "ajukan" tidak sah di Ditolak |

Baris ketiga: menyetujui pengajuan yang belum diverifikasi. Baris keempat: mengajukan ulang pengajuan yang sudah ditolak. Keduanya aturan bisnis yang penting — dan keduanya ditolak **oleh tabelnya sendiri**, karena pasangan (keadaan, peristiwa) itu tidak ada di tabel.

**Memeriksa diagram**

Dua kesalahan gambar yang paling sering, dan keduanya bisa diperiksa otomatis:

- **Keadaan tak terjangkau**: ada di diagram, tetapi tidak ada jalan ke sana dari keadaan awal
- **Keadaan buntu**: bukan keadaan akhir, tetapi tidak ada jalan keluar darinya

Diagram yang benar: tidak ada keduanya. Versi yang salah gambar — transisi "kembalikan kunci" terlupa, dan keadaan "Diarsipkan" ditambahkan dengan panah keluar ke Draf — langsung ketahuan:

| Pemeriksaan | Temuan |
|---|---|
| tak terjangkau | Diarsipkan — ada jalan keluar, tidak ada jalan masuk |
| buntu | Dipakai — ruang dipakai, lalu pengajuannya terjebak selamanya |

Keadaan buntu adalah bug yang terlihat di produksi sebagai "pengajuan yang tidak bisa diapa-apakan" — tidak bisa diselesaikan, tidak bisa dibatalkan, dan akhirnya diperbaiki langsung di basis data oleh seseorang.

**Kenapa bukan kumpulan boolean**

Cara yang sangat umum menyimpan status: enam kolom boolean — diajukan, diverifikasi, disetujui, ditolak, dipakai, dibatalkan.

| | |
|---|---|
| kombinasi yang bisa disimpan | 64 |
| keadaan yang bermakna | 8 |

56 kombinasi sisanya adalah keadaan **mustahil** — disetujui dan ditolak sekaligus, dipakai tetapi belum diajukan — yang tetap bisa tersimpan karena tidak ada yang mencegahnya. Setiap bagian kode yang membaca status harus menebak apa arti kombinasi aneh itu.

Satu kolom status dengan delapan nilai yang mungkin, ditambah satu fungsi yang memeriksa tabel transisi sebelum mengubahnya, membuat 56 keadaan mustahil itu **tidak bisa terjadi sama sekali**.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "TRANSISI = {\n    ('Draf', 'ajukan'):            'Diajukan',\n    ('Diajukan', 'verifikasi'):    'Diverifikasi',\n    ('Diverifikasi', 'setujui'):   'Disetujui',\n    ('Diverifikasi', 'tolak'):     'Ditolak',\n    # ...\n}\n\ndef jalankan(tabel, peristiwa):\n    k = 'Draf'\n    for p in peristiwa:\n        if (k, p) not in tabel:\n            return 'DITOLAK: ' + p + ' tidak sah di keadaan ' + k\n        k = tabel[(k, p)]\n    return 'berakhir di ' + k",
      penjelasan: `Satu kamus dan satu perulangan menggantikan seluruh rangkaian \`if\` yang biasanya tersebar di kode.

**Cara yang biasa ditulis.**

Tanpa tabel, fungsi "setujui pengajuan" di kode biasanya terlihat seperti ini: kalau statusnya Diverifikasi, ubah ke Disetujui; kalau Draf, tampilkan galat "belum diajukan"; kalau Diajukan, tampilkan galat "belum diverifikasi"; kalau Ditolak... dan seterusnya. Lalu fungsi "tolak", "batalkan", "pakai" masing-masing punya rangkaian \`if\` sendiri.

Aturannya tersebar di banyak fungsi. Menambah satu keadaan baru — misalnya "Ditunda" — berarti memeriksa dan mengubah semuanya, dan satu yang terlewat adalah bug.

**Cara tabel.**

Semua aturan ada di satu tempat: kamus \`TRANSISI\`. Satu fungsi \`jalankan\` melayani semua peristiwa. Pertanyaan "bolehkah peristiwa ini di keadaan ini?" dijawab oleh satu pencarian kamus: \`(k, p) in tabel\`.

Menambah keadaan "Ditunda" berarti menambah beberapa baris di tabel. Tidak ada fungsi lain yang perlu diubah.

**Kenapa kunci tuple.**

Transisi ditentukan oleh **dua** hal sekaligus: keadaan sekarang dan peristiwa yang terjadi. "batalkan" dari Draf menuju Dibatalkan; "batalkan" dari Dipakai tidak sah. Tuple \`(keadaan, peristiwa)\` menyatakan pasangan itu sebagai satu kunci.

**Tabel ini adalah diagramnya.**

Setiap baris kamus adalah satu panah di state machine diagram. Mahasiswa yang menggambar diagram di draw.io dan programmer yang menulis kamus ini sedang menulis hal yang sama. Kalau keduanya berbeda, salah satunya keliru — dan membandingkannya jauh lebih mudah daripada membandingkan diagram dengan rangkaian \`if\`.

**Guard.**

Transisi di diagram bisa punya syarat: setujui [ruang masih kosong]. Tabel sederhana ini tidak menyimpannya. Perluasannya: nilai kamus menjadi pasangan (keadaan tujuan, fungsi syarat), dan \`jalankan\` memanggil fungsi syarat sebelum berpindah. Struktur tabelnya tetap sama.`
    },
    {
      bahasa: 'python',
      kode: "from collections import deque\n\ndef terjangkau(tabel):\n    lihat, antre = {'Draf'}, deque(['Draf'])\n    while antre:\n        k = antre.popleft()\n        for (a, _), b in tabel.items():\n            if a == k and b not in lihat:\n                lihat.add(b)\n                antre.append(b)\n    return lihat\n\ndef buntu(tabel):\n    punya_keluar = {a for a, _ in tabel}\n    return sorted(k for k in keadaan_semua(tabel)\n                  if k not in AKHIR and k not in punya_keluar)",
      penjelasan: `Dua pemeriksaan yang memperlakukan state machine sebagai graf — dan menemukan kesalahan yang tidak terlihat saat diagramnya dipandangi.

**Keadaan sebagai simpul, transisi sebagai sisi.**

State machine diagram adalah graf berarah: keadaan adalah simpul, transisi adalah sisi. Semua alat dari topik graf di Matematika Diskrit dan Struktur Data berlaku.

**Keterjangkauan dengan BFS.**

Mulai dari keadaan awal, kunjungi setiap keadaan yang bisa dicapai lewat satu transisi, lalu dari sana lewat satu transisi lagi, dan seterusnya. Itu penelusuran melebar — BFS — dengan antrean dari \`deque\`.

Keadaan yang tidak pernah dikunjungi adalah keadaan yang tidak bisa dicapai objek mana pun. Di versi yang salah gambar, "Diarsipkan" punya panah keluar ke Draf, tetapi tidak ada panah masuk dari mana pun. Diagramnya tampak lengkap — ada panahnya — tetapi keadaan itu tidak pernah bisa terjadi.

Biasanya ini berarti ada transisi yang lupa digambar: seharusnya ada peristiwa "arsipkan" dari Selesai atau Ditolak.

**Jalan buntu dari himpunan kunci.**

\`{a for a, _ in tabel}\` adalah himpunan semua keadaan yang punya setidaknya satu transisi keluar. Keadaan yang bukan akhir dan tidak ada di himpunan itu adalah jalan buntu.

Keadaan akhir memang tidak punya jalan keluar — itu yang membuatnya akhir. Keadaan lain yang tidak punya jalan keluar adalah bug: objek masuk ke sana dan tidak bisa ke mana-mana lagi.

**Yang tidak diperiksa di sini.**

Keadaan yang terjangkau dan tidak buntu masih bisa salah dengan cara lain: siklus yang tidak pernah berakhir, misalnya Diajukan → Draf → Diajukan tanpa batas, atau transisi yang sah secara graf tetapi salah secara bisnis. Pemeriksaan otomatis menangkap kesalahan struktur; kesalahan aturan bisnis tetap perlu dibicarakan dengan pengguna — misalnya: "bolehkah pengajuan yang sudah disetujui dibatalkan satu jam sebelum dipakai?"`
    }
  ],

  kode: { python: String.raw`# ============================================
# State machine diagram: status pengajuan peminjaman ruang
# ============================================
from collections import deque

AWAL = "Draf"
AKHIR = {"Selesai", "Ditolak", "Dibatalkan"}
# (keadaan, peristiwa) -> keadaan baru
TRANSISI = {
    ("Draf", "ajukan"): "Diajukan",
    ("Draf", "batalkan"): "Dibatalkan",
    ("Diajukan", "verifikasi"): "Diverifikasi",
    ("Diajukan", "kembalikan"): "Draf",
    ("Diajukan", "batalkan"): "Dibatalkan",
    ("Diverifikasi", "setujui"): "Disetujui",
    ("Diverifikasi", "tolak"): "Ditolak",
    ("Disetujui", "batalkan"): "Dibatalkan",
    ("Disetujui", "pakai"): "Dipakai",
    ("Dipakai", "kembalikan kunci"): "Selesai",
}

def keadaan_semua(tabel):
    k = {AWAL}
    for (a, _), b in tabel.items():
        k |= {a, b}
    return k

def jalankan(tabel, peristiwa):
    k = AWAL
    jejak = [k]
    for p in peristiwa:
        if (k, p) not in tabel:
            return jejak, "DITOLAK: '" + p + "' tidak sah di keadaan " + k
        k = tabel[(k, p)]
        jejak.append(k)
    return jejak, "berakhir di " + k

def terjangkau(tabel):
    lihat, antre = {AWAL}, deque([AWAL])
    while antre:
        k = antre.popleft()
        for (a, _), b in tabel.items():
            if a == k and b not in lihat:
                lihat.add(b)
                antre.append(b)
    return lihat

def buntu(tabel):
    """Keadaan bukan akhir yang tidak punya transisi keluar."""
    punya_keluar = {a for a, _ in tabel}
    return sorted(k for k in keadaan_semua(tabel) if k not in AKHIR and k not in punya_keluar)

# --------------------------------------------
# 1. Tabel transisi
# --------------------------------------------
print("--- tabel transisi ---")
for (a, p), b in TRANSISI.items():
    print("  " + format(a, "<14") + "--" + format(p, "-<18") + "> " + b)

# --------------------------------------------
# 2. Menjalankan urutan peristiwa
# --------------------------------------------
print("\n--- menjalankan urutan peristiwa ---")
SKENARIO = [
    ["ajukan", "verifikasi", "setujui", "pakai", "kembalikan kunci"],
    ["ajukan", "kembalikan", "ajukan", "verifikasi", "tolak"],
    ["ajukan", "setujui"],
    ["ajukan", "verifikasi", "tolak", "ajukan"],
]
for s in SKENARIO:
    jejak, hasil = jalankan(TRANSISI, s)
    print("  " + " -> ".join(jejak))
    print("    " + hasil)
print()
print("  'setujui' sebelum 'verifikasi' ditolak oleh tabelnya sendiri,")
print("  tanpa satu pun if tambahan. Pengajuan yang sudah Ditolak tidak")
print("  bisa diajukan ulang -- keadaan akhir tidak punya jalan keluar.")

# --------------------------------------------
# 3. Memeriksa diagram
# --------------------------------------------
print("\n--- memeriksa diagram ---")
semua = keadaan_semua(TRANSISI)
print("  keadaan              : " + str(len(semua)))
print("  tak terjangkau       : " + str(sorted(semua - terjangkau(TRANSISI)) or "tidak ada"))
print("  buntu (bukan akhir)  : " + str(buntu(TRANSISI) or "tidak ada"))

RUSAK = dict(TRANSISI)
del RUSAK[("Dipakai", "kembalikan kunci")]
RUSAK[("Diarsipkan", "pulihkan")] = "Draf"
print("\n  versi yang salah gambar:")
print("  tak terjangkau       : " + str(sorted(keadaan_semua(RUSAK) - terjangkau(RUSAK))))
print("  buntu (bukan akhir)  : " + str(buntu(RUSAK)))
print("  'Dipakai' buntu: ruang dipakai, lalu pengajuannya terjebak")
print("  selamanya. 'Diarsipkan' tidak pernah bisa dicapai: ada jalan")
print("  keluar darinya, tetapi tidak ada jalan masuk.")

# --------------------------------------------
# 4. Kenapa bukan kumpulan boolean
# --------------------------------------------
print("\n--- alternatif: enam kolom boolean ---")
BENDERA = ["diajukan", "diverifikasi", "disetujui", "ditolak", "dipakai", "dibatalkan"]
print("  " + ", ".join(BENDERA))
print("  kombinasi yang mungkin disimpan : " + str(2 ** len(BENDERA)))
print("  keadaan yang bermakna           : " + str(len(semua)))
print("  Sisanya -- misalnya disetujui DAN ditolak -- adalah keadaan")
print("  mustahil yang tetap bisa tersimpan di basis data. Satu kolom")
print("  status dengan tabel transisi membuatnya tidak bisa terjadi.")` },
  output: `--- tabel transisi ---
  Draf          --ajukan------------> Diajukan
  Draf          --batalkan----------> Dibatalkan
  Diajukan      --verifikasi--------> Diverifikasi
  Diajukan      --kembalikan--------> Draf
  Diajukan      --batalkan----------> Dibatalkan
  Diverifikasi  --setujui-----------> Disetujui
  Diverifikasi  --tolak-------------> Ditolak
  Disetujui     --batalkan----------> Dibatalkan
  Disetujui     --pakai-------------> Dipakai
  Dipakai       --kembalikan kunci--> Selesai

--- menjalankan urutan peristiwa ---
  Draf -> Diajukan -> Diverifikasi -> Disetujui -> Dipakai -> Selesai
    berakhir di Selesai
  Draf -> Diajukan -> Draf -> Diajukan -> Diverifikasi -> Ditolak
    berakhir di Ditolak
  Draf -> Diajukan
    DITOLAK: 'setujui' tidak sah di keadaan Diajukan
  Draf -> Diajukan -> Diverifikasi -> Ditolak
    DITOLAK: 'ajukan' tidak sah di keadaan Ditolak

  'setujui' sebelum 'verifikasi' ditolak oleh tabelnya sendiri,
  tanpa satu pun if tambahan. Pengajuan yang sudah Ditolak tidak
  bisa diajukan ulang -- keadaan akhir tidak punya jalan keluar.

--- memeriksa diagram ---
  keadaan              : 8
  tak terjangkau       : tidak ada
  buntu (bukan akhir)  : tidak ada

  versi yang salah gambar:
  tak terjangkau       : ['Diarsipkan']
  buntu (bukan akhir)  : ['Dipakai']
  'Dipakai' buntu: ruang dipakai, lalu pengajuannya terjebak
  selamanya. 'Diarsipkan' tidak pernah bisa dicapai: ada jalan
  keluar darinya, tetapi tidak ada jalan masuk.

--- alternatif: enam kolom boolean ---
  diajukan, diverifikasi, disetujui, ditolak, dipakai, dibatalkan
  kombinasi yang mungkin disimpan : 64
  keadaan yang bermakna           : 8
  Sisanya -- misalnya disetujui DAN ditolak -- adalah keadaan
  mustahil yang tetap bisa tersimpan di basis data. Satu kolom
  status dengan tabel transisi membuatnya tidak bisa terjadi.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Satu transisi dengan tabel kamus', waktu: 'O(1)', memori: 'O(t) untuk t transisi' },
      { operasi: 'Satu transisi dengan rangkaian if', waktu: 'O(k) untuk k keadaan', memori: 'aturan tersebar di banyak fungsi' },
      { operasi: 'Keterjangkauan dengan BFS', waktu: 'O(k · t) di kode ini, O(k + t) dengan daftar tetangga', memori: 'O(k)' },
      { operasi: 'Mencari keadaan buntu', waktu: 'O(k + t)', memori: 'O(k)' },
      { operasi: 'Kombinasi b kolom boolean', waktu: '—', memori: '2^b kombinasi, kebanyakan mustahil' }
    ],
    intuisi: `Dari sisi komputasi, tabel transisi lebih cepat dari rangkaian \`if\` — satu pencarian kamus lawan beberapa perbandingan. Tetapi keunggulan sebenarnya ada di baris kedua: aturannya di satu tempat, bukan tersebar.

BFS di program ini menyisir seluruh tabel untuk setiap keadaan, O(k · t). Dengan daftar tetangga — kamus dari keadaan ke daftar keadaan tujuan — menjadi O(k + t), seperti BFS di topik graf. Untuk state machine sungguhan dengan puluhan keadaan, perbedaannya tidak terasa.

Baris terakhir adalah alasan terkuat memakai satu kolom status: 2^b tumbuh sangat cepat. Enam boolean memberi 64 kombinasi; sepuluh boolean memberi 1024 — sementara keadaan yang bermakna mungkin cuma belasan.`
  },

  kesalahanUmum: [
    {
      salah: 'Menggambar seluruh sistem dalam satu state machine diagram.',
      kenapa: 'Diagram ini menggambar keadaan satu objek. Mencampur status pengajuan, status ruang, dan status pengguna membuat keadaan dan transisinya tidak bermakna.',
      benar: 'Buat satu diagram untuk setiap objek yang statusnya penting, misalnya pengajuan dan ruang secara terpisah.'
    },
    {
      salah: 'Menyimpan status sebagai beberapa kolom boolean.',
      kenapa: 'Enam boolean menyimpan 64 kombinasi padahal cuma 8 yang bermakna, sehingga keadaan mustahil seperti disetujui dan ditolak sekaligus bisa tersimpan.',
      benar: 'Simpan satu kolom status dengan nilai yang dibatasi, dan ubah hanya lewat fungsi yang memeriksa tabel transisi.'
    },
    {
      salah: 'Menyebar aturan transisi di banyak fungsi dengan rangkaian if.',
      kenapa: 'Menambah atau mengubah satu keadaan berarti memeriksa semua fungsi, dan satu yang terlewat adalah transisi tidak sah yang lolos.',
      benar: 'Kumpulkan semua transisi di satu tabel dan pakai satu fungsi untuk menjalankannya.'
    },
    {
      salah: 'Membiarkan keadaan bukan-akhir tanpa transisi keluar.',
      kenapa: 'Objek yang masuk ke keadaan itu terjebak selamanya, dan biasanya harus diperbaiki langsung di basis data.',
      benar: 'Periksa keadaan buntu secara otomatis, dan pastikan setiap keadaan bukan-akhir punya jalan keluar, setidaknya pembatalan.'
    },
    {
      salah: 'Menamai transisi dengan keadaan tujuannya, misalnya panah bernama "Disetujui".',
      kenapa: 'Panah menggambarkan peristiwa yang memicu perpindahan, bukan hasilnya. Nama keadaan di panah membuat tidak jelas apa yang harus terjadi supaya perpindahan itu terjadi.',
      benar: 'Namai panah dengan peristiwa atau tindakan, seperti setujui, dan tambahkan guard bila ada syaratnya.'
    },
    {
      salah: 'Menganggap activity diagram dan state machine diagram bisa saling menggantikan.',
      kenapa: 'Activity diagram menggambar langkah kerja dan siapa melakukannya; state machine menggambar keadaan satu objek. Pertanyaan "bolehkah pengajuan yang ditolak diajukan ulang?" hanya dijawab jelas oleh state machine.',
      benar: 'Pakai activity diagram untuk alur kerja, dan state machine untuk aturan status objek.'
    }
  ],

  analogi: `Bayangkan **paket kiriman** yang kamu pesan dari toko daring.

**Keadaan.** Sepanjang hidupnya, paket itu selalu berada di tepat **satu** keadaan: dikemas, diserahkan ke kurir, dalam perjalanan, di gudang transit, diantar, diterima — atau dikembalikan. Tidak pernah "dalam perjalanan dan sudah diterima" sekaligus.

**Transisi.** Paket berpindah keadaan karena **peristiwa**: kurir memindai paket di gudang, kurir menyerahkan ke penerima, penerima menolak. Setiap pemindaian di aplikasi pelacakan adalah satu transisi.

**Transisi yang tidak sah.** Paket yang masih "dikemas" tidak bisa langsung "diterima" — harus lewat kurir dulu. Paket yang sudah "diterima" tidak bisa kembali "dalam perjalanan". Aturan-aturan ini tidak perlu ditulis satu per satu; cukup gambar panah-panah yang boleh, dan semua yang tidak ada panahnya otomatis tidak boleh.

**Jalan buntu.** Bayangkan status "tertahan di bea cukai" yang tidak punya panah keluar — tidak ada peristiwa yang bisa mengeluarkan paket dari sana. Paketmu terjebak selamanya, dan satu-satunya cara adalah menelepon layanan pelanggan yang lalu mengubah statusnya secara manual. Itulah keadaan buntu.

**Kumpulan boolean.** Sekarang bayangkan sistem pelacakan menyimpan enam kotak centang: sudah dikemas, sudah diserahkan, sedang di jalan, sudah transit, sudah diantar, sudah diterima. Suatu hari karena galat, kotak "sudah diterima" tercentang padahal "sudah diserahkan" belum. Paket diterima sebelum diserahkan ke kurir? Sistem tidak tahu apa artinya — dan tidak ada yang mencegahnya terjadi. Satu kolom status tidak pernah bisa berada di dua keadaan sekaligus.`,

  latihan: [
    'Gambar state machine diagram untuk status pesanan di aplikasi pesan-antar makanan, dengan setidaknya enam keadaan.',
    'Tulis diagram latihan nomor 1 sebagai tabel transisi Python dan jalankan tiga urutan peristiwa, termasuk satu yang tidak sah.',
    'Jalankan pemeriksa keterjangkauan dan jalan buntu pada tabel latihan nomor 2.',
    'Tambahkan keadaan "Ditunda" ke diagram peminjaman ruang, dengan transisi masuk dan keluar yang masuk akal, lalu periksa ulang.',
    'Tambahkan guard "ruang masih kosong" pada transisi setujui dengan mengubah nilai kamus menjadi pasangan keadaan dan fungsi syarat.',
    'Hitung banyaknya kombinasi yang bisa disimpan dengan delapan kolom boolean, dan bandingkan dengan banyaknya keadaan yang bermakna di diagrammu.',
    'Tulis batasan CHECK di SQL yang membatasi kolom status hanya pada delapan nilai keadaan pengajuan.',
    'Ubah BFS di program menjadi O(k + t) dengan membangun daftar tetangga lebih dulu.',
    'Bandingkan activity diagram dan state machine diagram untuk sistem peminjaman ruang: pertanyaan apa yang dijawab masing-masing?',
    'Temukan satu aplikasi yang kamu pakai di mana status sebuah objek pernah "terjebak", lalu gambar state machine yang kemungkinan menjelaskannya.'
  ]
});
