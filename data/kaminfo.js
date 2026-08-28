/* ============================================================
   kaminfo.js — materi Keamanan Informasi

   Tidak ada folder berkas kuliah untuk mata kuliah ini, jadi
   seluruh materi di bawah disusun dari referensi luar:

   - kerangka umum CIA triad, defense in depth, least privilege
   - proses manajemen risiko keamanan informasi gaya ISO 27001
     (identifikasi aset -> nilai aset -> ancaman & kelemahan ->
     nilai risiko -> analisis dampak bisnis -> level risiko)
   - lima fungsi kerangka NIST (Identify, Protect, Detect,
     Respond, Recover)
   - kriptografi terapan: simetris/asimetris, hash, HMAC,
     tanda tangan digital
   - praktik autentikasi: entropi kata sandi, penyimpanan
     berbiaya tinggi, MFA, RBAC

   Yang dipilih untuk ditulis: bagian yang bisa DIHITUNG atau
   DIJALANKAN, supaya bisa diperiksa sendiri kebenarannya.
   Setiap keluaran program di bawah berasal dari eksekusi nyata.

   Kalau nanti silabus kuliahnya didapat, bandingkan urutan dan
   penekanannya -- bagian yang tidak diajarkan bisa dilewati.

   Tidak diulang di sini karena sudah dibahas di tempat lain:
   SQL injection, XSS, CSRF, dan pemakaian password_hash ada di
   "Keamanan Aplikasi Web" (Pemrograman Web II); hash sebagai
   penjaga keutuhan bukti dan steganografi di Komputer Forensik;
   pengendalian internal, akses logik & fisik, RTO/RPO, dan
   pencadangan di Audit Sistem Informasi; TLS pada lapis
   jaringan di Jaringan Komputer.
   ============================================================ */

TOPICS.push({
  id: 'kaminfo-dasar',
  judul: 'Dasar Keamanan Informasi: CIA, Risiko & Lapisan',
  kategori: 'kaminfo',
  tag: ['CIA triad', 'aset ancaman kelemahan', 'risiko', 'defense in depth', 'least privilege', 'phishing'],
  ringkas: 'Lima lapis yang masing-masing biasa-biasa saja 31 kali lebih baik daripada satu lapis yang nyaris sempurna.',

  fungsi: `**Memutuskan apa yang dilindungi, dari apa, dan sampai seberapa — sebelum membeli atau memasang apa pun.**

Terpakai di:

- **Merancang sistem apa pun** yang menyimpan data orang lain — keputusan keamanan yang paling menentukan diambil di tahap rancangan, bukan setelah jadi
- **Menjawab pertanyaan "apakah ini aman"** dengan sesuatu selain ya atau tidak
- **Tugas akhir** yang membangun sistem informasi — bab keamanan hampir selalu diminta dan hampir selalu diisi daftar fitur, bukan analisis
- **Kerja nyata** — hampir seluruh pekerjaan keamanan berdiri di atas kerangka ini
- **Memilih mana yang dikerjakan lebih dulu** saat waktunya cuma cukup untuk beberapa hal

Yang paling sering keliru: **menyamakan daftar kerentanan dengan daftar risiko.** Hasil pemindai baru satu dari tiga bahan risiko; tanpa nilai aset dan ancaman nyata, seribu temuan pemindai tidak memberi tahu apa yang harus dikerjakan lebih dulu.

Dan gagasan yang paling mengubah cara berpikir: **least privilege tidak mengurangi peluang kejadian sama sekali.** Ia memperkecil akibatnya. Dan karena kejadian pasti datang cepat atau lambat, justru itu yang paling menentukan.`,
  praktik: {
    tujuan: 'Kamu punya daftar aset dengan nilainya, daftar risiko yang terurut dari peluang dikali dampak, peta lapisan pertahanan beserta titik gagal bersamanya, dan model hak akses yang membatasi seberapa jauh satu akun jebol bisa menjangkau.',
    alat: ['Satu sistem nyata yang kamu bangun atau kelola', 'Spreadsheet untuk daftar aset dan risiko', 'Daftar pengguna dan hak aksesnya'],
    langkah: [
      { judul: 'Daftar asetnya dulu, sampai habis',
        isi: `Tulis semua yang punya nilai: basis data, berkas, kunci API, akun, cadangan, perangkat, bahkan nomor telepon pemulihan.

Tahap ini yang paling sering dikerjakan setengah jalan, dan akibatnya berat: **aset yang tidak terdaftar tidak akan pernah dinilai, tidak akan pernah masuk daftar risiko, dan tidak akan pernah dilindungi.**

Kebocoran besar sering terjadi lewat sistem yang tidak ada di daftar aset siapa pun.` },
      { judul: 'Beri nilai tiap aset, dan tanyakan untuk sifat yang mana',
        isi: `Untuk tiap aset, nilai seberapa buruk akibatnya bila **kerahasiaannya** bocor, **keutuhannya** rusak, atau **ketersediaannya** hilang.

Ketiganya jarang sama. Halaman profil publik tidak punya kerahasiaan sama sekali, tetapi keutuhannya penting. Cadangan justru sebaliknya.` },
      { judul: 'Pasangkan ancaman dengan kelemahan',
        isi: `Untuk tiap aset bernilai tinggi, tulis apa yang mengancamnya dan **lewat celah mana**.

Kalau kamu tidak bisa menyebut celahnya, itu belum risiko — itu kekhawatiran. Dan kalau celahnya ada tetapi tidak ada yang berkepentingan memanfaatkannya, itu juga belum risiko.` },
      { judul: 'Urutkan dengan peluang dikali dampak',
        isi: `Pakai skala tiga tingkat untuk masing-masing, lalu kalikan. Kelompokkan hasilnya ke tinggi, sedang, rendah.

Ini menghasilkan **urutan perhatian**, bukan cara penanganan. Cara penanganannya datang dari kelemahannya — dua risiko bertingkat sama bisa butuh penanganan yang sama sekali berbeda.` },
      { judul: 'Gambar lapisan pertahanannya, lalu cari titik gagal bersamanya',
        isi: `Tulis lapisan yang harus dilewati untuk mencapai asetmu yang paling bernilai.

Lalu ajukan satu pertanyaan yang menentukan: **apa yang kalau ditembus membuka seluruhnya sekaligus?**

Kalau kelima lapismu memakai satu direktori pengguna dan satu akun administrator, kamu punya satu pintu dengan lima gambar pintu.` },
      { judul: 'Ukur jangkauan satu akun jebol',
        isi: `Ambil satu akun biasa di sistemmu, lalu hitung: **berapa baris data yang bisa ia baca?**

Bandingkan dengan seluruh populasi datanya. Angka itu jangkauan kerusakan bila akun tersebut jebol, dan ia tidak bergantung pada seberapa aman kata sandinya.` },
      { judul: 'Persempit hak sampai jangkauannya masuk akal',
        isi: `Turunkan bertahap: dari semua data, ke data satu departemen, ke data satu wilayah, ke akses per kasus yang kedaluwarsa sendiri.

Tiap langkah tidak menurunkan peluang jebol sedikit pun. Yang turun cuma **luas akibatnya** — dan itu satu-satunya hal yang masih bisa dikendalikan setelah kejadian dimulai.` },
      { judul: 'Pastikan ada kendali yang bekerja tanpa manusia mengambil keputusan benar',
        isi: `Hitung: kalau satu orang di organisasimu mengklik tautan phishing hari ini, apa yang menahan sesudahnya?

Kalau jawabannya "tidak ada, karena kami sudah dilatih", pelatihanmu sedang jadi kendali terakhir. Yang menahan setelah orang klik: **MFA, hak minimal, dan pemantauan** — ketiganya bekerja tanpa perlu manusia memutuskan dengan benar saat sedang lelah.` }
    ],
    cek: [
      'Daftar asetmu memuat kunci API, cadangan, dan akun — bukan cuma basis data',
      'Setiap risiko di daftarmu bisa kamu sebutkan asetnya, ancamannya, dan kelemahannya',
      'Kamu tahu apa yang kalau ditembus membuka seluruh lapisan sekaligus',
      'Kamu bisa menyebutkan berapa baris data yang terjangkau bila satu akun biasa jebol'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa berlapis, dan kapan berlapis cuma gambar',

  konsep: `Keamanan informasi sering diperkenalkan sebagai daftar ancaman dan daftar alat. Susunan itu membuatnya terasa seperti hafalan, dan membuat pertanyaan yang paling penting tidak pernah muncul: **melindungi apa, dari apa, sampai seberapa?**

**CIA: tiga sifat yang dijaga**

| Sifat | Artinya | Dijaga oleh |
|---|---|---|
| **Confidentiality** | hanya yang berhak bisa melihat | enkripsi, hak akses, klasifikasi data |
| **Integrity** | data tidak berubah tanpa izin | hash, tanda tangan, audit log, transaksi |
| **Availability** | bisa dipakai saat dibutuhkan | cadangan, redundansi, kapasitas |

Bagian yang jarang disampaikan: **ketiganya sering bertabrakan**, dan di situlah pekerjaannya.

Menaikkan kerahasiaan — enkripsi penuh, kata sandi berlapis, akses yang harus diminta — **menurunkan ketersediaan**. Kunci hilang berarti data hilang. Petugas yang tidak bisa masuk saat darurat berarti layanan berhenti.

Jadi keamanan bukan "seaman mungkin". Ia **memilih titik seimbang** untuk data ini, sistem ini, organisasi ini. Sistem rekam medis dan situs profil perusahaan memilih titik yang sangat berbeda, dan keduanya benar.

**Empat kata yang sering dipakai bertukaran**

| Istilah | Artinya | Contoh |
|---|---|---|
| **Aset** | yang punya nilai dan ingin dilindungi | basis data pelanggan |
| **Ancaman** | kejadian yang bisa merugikan aset | pencurian data oleh pihak luar |
| **Kelemahan** | celah yang membuat ancaman bisa terjadi | endpoint tanpa autentikasi |
| **Risiko** | peluang dikali kerugian, bila ancaman itu berhasil memanfaatkan kelemahan itu | — |

Yang menentukan: **risiko butuh ketiganya sekaligus.**

- Ancaman tanpa kelemahan — tidak ada risiko
- Kelemahan tanpa ancaman — tidak ada risiko
- Keduanya ada tetapi asetnya tidak bernilai — risiko kecil

Dari sini muncul satu kesalahan yang sangat umum: **daftar kerentanan hasil pemindai bukan daftar risiko.** Ia baru satu dari tiga bahannya. Laporan pemindai dengan 800 temuan tidak memberi tahu apa pun tentang urutan pengerjaan, karena ia tidak tahu nilai asetnya dan tidak tahu siapa yang berkepentingan menyerangnya.

**Menilai risiko**

Cara paling sederhana yang tetap berguna: skala tiga tingkat untuk peluang dan tiga tingkat untuk dampak, lalu dikalikan.

Hasilnya **urutan perhatian**, dan itu saja. Perhatikan bahwa dua risiko bisa bertingkat sama dan butuh penanganan yang sama sekali berbeda — "orang dalam menyalin data keluar" dan "gempa merusak pusat data" bisa duduk di baris yang sama, tetapi yang satu ditangani dengan kendali akses dan yang lain dengan lokasi cadangan.

Tingkat risiko menentukan **urutan**; cara menanganinya datang dari **kelemahannya**.

**Pertahanan berlapis: kenapa hitungannya kuat**

Andaikan satu lapis bisa dilewati dengan peluang 20 persen. Kalau lapisannya **bebas satu dari yang lain**, peluang seluruhnya lolos adalah perkalian:

| Jumlah lapis | Peluang semua lolos |
|---|---|
| 1 | 1 dari 5 |
| 2 | 1 dari 25 |
| 3 | 1 dari 125 |
| 4 | 1 dari 625 |
| 5 | 1 dari 3.125 |

Bandingkan dua pilihan:

- satu lapis yang **99 persen** efektif → lolos 1 dari 100
- lima lapis yang masing-masing cuma **80 persen** efektif → lolos 1 dari 3.125

Lima lapis yang biasa-biasa saja **31 kali lebih baik** daripada satu lapis yang nyaris sempurna.

Ini alasan sesungguhnya di balik defense in depth, dan ia bukan alasan yang samar. Ia perkalian.

**Kapan berlapis cuma gambar**

Seluruh hitungan di atas berdiri di atas satu syarat: **lapisannya bebas satu dari yang lain.** Dan sering tidak.

Bayangkan lima lapis: firewall, VPN, kata sandi aplikasi, basis data, dan panel administrasi. Kelimanya memakai satu direktori pengguna yang sama, dan akun administratornya satu.

Menembus akun itu membuka kelimanya sekaligus. Lapis efektifnya **satu**, dan peluang lolosnya kembali 1 dari 5.

Yang di gambar berlapis; yang di kenyataan satu pintu dengan lima gambar pintu.

Karena itu pertanyaan yang benar bukan *"ada berapa lapis"*, melainkan: **apa yang kalau ditembus membuka seluruhnya?**

**Hak seminimal mungkin**

| Model hak akses | Terjangkau dari 240.000 baris |
|---|---|
| Semua pegawai admin | 240.000 |
| Semua pegawai boleh baca | 240.000 |
| Peran per departemen | 43.200 |
| Peran departemen + wilayah | 9.600 |
| Per kasus, kedaluwarsa | 1.200 |

Perhatikan yang **tidak** berubah di kelima baris: peluang satu akun jebol. Kata sandinya sama kuat, phishing-nya sama meyakinkan, kelalaiannya sama mungkin.

Yang berubah cuma **seberapa jauh akibatnya menyebar**.

Ini yang membuat least privilege berbeda jenis dari kendali lain. Ia tidak mengurangi peluang kejadian sedikit pun. Ia memperkecil akibatnya — dan karena kejadian pasti datang cepat atau lambat, justru itu yang paling menentukan hasil akhirnya.

**Lapisan yang tidak bisa ditambal**

Dari 200 pegawai yang menerima satu surel phishing:

| Keadaan | Laju klik | Yang klik | Peluang minimal satu klik |
|---|---|---|---|
| Tanpa pelatihan | 28% | 56 | 100% |
| Pelatihan setahun sekali | 15% | 30 | 100% |
| Pelatihan + uji rutin | 5% | 10 | 99,9965% |

Kolom terakhir yang menentukan, dan isinya nyaris 100 persen di ketiganya. Dengan 200 penerima, peluang **tidak ada satu pun** yang klik praktis nol — bahkan pada laju 5 persen.

Jadi pelatihan **tidak menurunkan peluang serangan berhasil**. Ia menurunkan jumlah pintu yang terbuka, dari 56 menjadi 10.

Kesimpulannya bukan bahwa pelatihan tidak berguna. Kesimpulannya: **pelatihan tidak boleh menjadi kendali terakhir.** Yang menahan setelah orang klik adalah MFA, hak minimal, dan pemantauan — dan ketiganya bekerja tanpa perlu manusia mengambil keputusan yang benar pada saat sedang lelah, terburu-buru, atau sedang dijebak dengan baik.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# LAPISAN BEBAS: peluangnya DIKALIKAN\n#   satu lapis dilewati dengan peluang 20%\n#\n#   1 lapis  ->  1 dari 5\n#   2 lapis  ->  1 dari 25\n#   3 lapis  ->  1 dari 125\n#   5 lapis  ->  1 dari 3.125\n#\n# Bandingkan:\n#   satu lapis 99% efektif  ->  1 dari 100\n#   lima lapis 80% efektif  ->  1 dari 3.125     31x lebih baik\n#\n# LAPISAN TIDAK BEBAS: kembali jadi satu\n#   5 lapis, satu akun administrator  ->  1 dari 5',
      penjelasan: `Dua hitungan yang bentuknya sama dan kesimpulannya berlawanan, dan bedanya cuma satu kata: **bebas**.

Mulai dari yang pertama. Kalau menembus lapis kedua sama sekali tidak dipermudah oleh sudah tertembusnya lapis pertama, maka peluang keduanya tertembus adalah perkaliannya: 0,2 x 0,2 = 0,04.

Perkalian bilangan di bawah satu **turun sangat cepat**. Lima kali pengulangan sudah membawa 20 persen menjadi 0,032 persen.

Dan di sini muncul hasil yang berlawanan dengan naluri. Naluri menyuruh mencari **satu kendali yang sangat baik** — firewall terbaik, autentikasi terkuat. Hitungannya mengatakan lain: lima kendali yang masing-masing cuma cukup baik mengalahkan satu kendali yang nyaris sempurna, **31 kali lipat**.

Kenapa naluri gagal? Karena kita menilai kendali satu per satu, dan satu lapis yang 80 persen efektif terasa seperti kelalaian. Dua puluh persen bolong. Tidak ada yang bangga memasangnya.

Tetapi lima kebolongan 20 persen yang **berurutan** bukan 100 persen bolong. Ia 0,032 persen.

Ini juga menjelaskan sesuatu yang sering membingungkan: kenapa organisasi yang serius memasang kendali yang jelas-jelas bisa dilewati. Kendali yang bisa dilewati **tetap menyumbang** ke perkalian, selama ia menuntut usaha tambahan yang jenisnya berbeda.

**Sekarang hitungan kedua, dan ia yang lebih penting.**

Perkalian itu hanya sah kalau lapisannya bebas. Dan syarat itu jauh lebih sering gagal daripada yang disadari orang.

Lima lapis pada contoh — firewall, VPN, kata sandi aplikasi, basis data, panel administrasi — semuanya memakai satu direktori pengguna, dengan satu akun administrator.

Sekarang tanyakan: kalau penyerang mendapatkan akun itu, berapa lapis yang tersisa?

Nol. Kelimanya mengakui akun yang sama.

Jadi peluang lolos bukan 1 dari 3.125. Ia **1 dari 5** — sama seperti tidak berlapis sama sekali, karena secara efektif memang tidak berlapis.

Yang membuat ini berbahaya: **diagramnya tetap terlihat berlapis.** Lima kotak, lima panah, terlihat sangat teratur di slide presentasi. Ketergantungan bersamanya tidak muncul di gambar mana pun, karena ia bukan hubungan antar lapis — ia hubungan antar lapis dengan sesuatu di luar gambar.

Dari sini muncul cara memeriksa yang jauh lebih berguna daripada menghitung lapis: **cari hal-hal yang muncul di lebih dari satu lapis.**

Yang paling umum ditemukan:

- **satu direktori pengguna** untuk semua sistem
- **satu akun administrator** yang dipakai bersama
- **satu jaringan datar** di belakang firewall, sehingga masuk ke satu mesin berarti bisa mencapai semua mesin
- **satu pengelola kata sandi** tanpa MFA
- **satu penyedia awan**, termasuk untuk cadangannya

Yang terakhir sering luput dan akibatnya paling total. Cadangan yang disimpan di akun awan yang sama dengan sistemnya tidak melindungi terhadap akun awan itu jebol — dan akun awan jebol adalah salah satu kejadian yang paling merusak, karena penyerang bisa menghapus sistem **dan** cadangannya dalam satu perintah.

Perbaikannya tidak selalu menambah lapis. Sering justru **memisahkan** yang sudah ada: cadangan di penyedia lain dengan kredensial berbeda, jaringan dibagi, akun administrator dipisah per sistem, dan MFA yang tidak bersandar pada satu perangkat yang sama.

Satu pemisahan yang benar lebih berharga daripada tiga lapis tambahan yang berbagi pintu.`
    },
    {
      bahasa: 'python',
      kode: '# LEAST PRIVILEGE: yang berubah bukan peluang, tapi AKIBAT\n#\n#   240.000 baris data\n#\n#   model hak akses               terjangkau\n#   Semua pegawai admin              240.000\n#   Peran per departemen              43.200\n#   Peran departemen + wilayah         9.600\n#   Per kasus, kedaluwarsa             1.200\n#\n# Peluang satu akun jebol SAMA di keempatnya.\n#\n# PHISHING, 200 pegawai:\n#   laju klik 28%  ->  56 klik,  peluang min. 1 klik 100%\n#   laju klik  5%  ->  10 klik,  peluang min. 1 klik 99,9965%',
      penjelasan: `Dua tabel yang bersama-sama menjelaskan kenapa keamanan yang bersandar pada pencegahan selalu kalah pada akhirnya.

**Mulai dari tabel kedua, karena ia yang menetapkan andaiannya.**

Dua ratus pegawai menerima satu surel phishing. Dengan laju klik 28 persen, 56 orang klik. Dengan pelatihan dan uji rutin, lajunya turun ke 5 persen, dan yang klik jadi 10 orang.

Penurunan lima kali lipat. Terdengar seperti keberhasilan besar.

Sekarang lihat kolom yang benar-benar penting: **peluang minimal satu orang klik.**

Hitungannya \`1 - (1 - p)^200\`. Dengan p = 0,05 dan 200 penerima, hasilnya **99,9965 persen**.

Bukan 5 persen. Nyaris pasti.

Dan itu masuk akal begitu dilihat dari sisi lain: supaya tidak ada satu pun yang klik, **kedua ratus orang** harus benar semua. Peluang satu orang benar 95 persen; peluang dua ratus orang benar berturut-turut adalah 0,95 pangkat 200, yang praktis nol.

Ini bentuk perkalian yang sama seperti pada defense in depth, tetapi bekerja **melawan** kita. Di sana perkalian bilangan kecil melindungi; di sini perkalian bilangan besar-tetapi-kurang-dari-satu menghancurkan.

Jadi kesimpulan yang harus diterima: **pada organisasi seukuran apa pun, seseorang akan klik.** Bukan mungkin. Akan.

Pelatihan tetap berharga — 10 pintu terbuka jauh lebih baik daripada 56, karena setiap pintu berarti satu perangkat yang harus dibersihkan dan satu akun yang harus diperiksa. Tetapi pelatihan **tidak mengubah apakah** kejadian itu terjadi.

**Sekarang tabel pertama, dan di situlah jawabannya.**

Kalau kejadian itu pasti, maka pertanyaan yang menentukan bukan lagi *"bagaimana mencegah akun jebol"*, melainkan: **"apa yang terjadi setelah satu akun jebol?"**

Perhatikan bahwa keempat baris punya peluang jebol yang **sama persis**. Kata sandinya sama kuat. MFA-nya sama ada atau sama tidak ada. Orangnya sama mungkin tertipu.

Yang berbeda cuma jangkauannya: 240.000 baris, atau 1.200 baris.

Selisih **dua ratus kali**, tanpa menyentuh peluang kejadiannya sedikit pun.

Dan inilah sebabnya least privilege berbeda jenis dari hampir semua kendali lain. Firewall, antivirus, pelatihan, penambalan — semuanya berusaha menurunkan **peluang**. Least privilege menerima bahwa peluangnya tidak akan pernah nol, lalu bekerja pada **akibat**.

Karena peluangnya tidak akan nol, kerja pada akibat itu yang menentukan hasil akhir.

**Kenapa ia jarang dilakukan dengan benar.**

Bukan karena sulit secara teknis. Karena bentuk permintaannya asimetris.

Memberi hak selalu ada yang meminta, dengan alasan mendesak dan biasanya benar: pekerjaan tertahan, pelanggan menunggu, laporan dibutuhkan besok. Menolaknya butuh alasan yang harus dijelaskan.

Mencabut hak **tidak ada yang meminta**. Tidak ada yang datang mengeluh bahwa aksesnya terlalu luas.

Jadi hak menumpuk. Bukan karena kelalaian satu orang, melainkan karena tidak ada satu pun kekuatan yang mendorong ke arah sebaliknya.

Yang mengubahnya cuma dua hal, dan keduanya harus dipasang sengaja:

**Pertama, akses yang kedaluwarsa sendiri.** Hak yang mati setelah tiga puluh hari tidak butuh siapa pun mengingat mencabutnya. Ini pemindahan kendali dari prosedur ke alat, dan bentuknya paling murah dari seluruh perbaikan di topik ini.

**Kedua, peninjauan berkala yang dijadwalkan** dan jalan meski tidak ada yang memintanya — karena memang tidak akan ada yang meminta.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Dasar keamanan informasi: CIA, risiko, lapisan
# ============================================

# --------------------------------------------
# 1. Tiga sifat yang dijaga
# --------------------------------------------
print("--- CIA: tiga sifat yang dijaga ---")
CIA = [
    ("Confidentiality", "hanya yang berhak bisa MELIHAT",
     "enkripsi, hak akses, klasifikasi data"),
    ("Integrity", "data tidak berubah tanpa izin",
     "hash, tanda tangan, audit log, transaksi"),
    ("Availability", "bisa dipakai saat DIBUTUHKAN",
     "cadangan, redundansi, kapasitas, DDoS"),
]
for nama, arti, cara in CIA:
    print("  " + nama.ljust(17) + arti)
    print("      dijaga oleh: " + cara)
print("")
print("  Ketiganya sering BERTABRAKAN, dan itu inti pekerjaannya.")
print("  Menaikkan kerahasiaan (enkripsi + kata sandi berlapis)")
print("  menurunkan ketersediaan (kunci hilang = data hilang).")
print("")
print("  Jadi keamanan bukan 'seaman mungkin', melainkan MEMILIH")
print("  di mana titik seimbangnya untuk data ini, sistem ini.")

# --------------------------------------------
# 2. Empat kata yang sering dipakai bertukaran
# --------------------------------------------
print("")
print("--- aset, ancaman, kelemahan, risiko ---")
ISTILAH = [
    ("Aset", "yang punya nilai dan ingin dilindungi",
     "basis data pelanggan"),
    ("Ancaman", "kejadian yang bisa merugikan aset",
     "pencurian data oleh pihak luar"),
    ("Kelemahan", "celah yang membuat ancaman bisa terjadi",
     "endpoint tanpa autentikasi"),
    ("Risiko", "peluang x kerugian, bila ancaman itu",
     "berhasil memanfaatkan kelemahan itu"),
]
for nama, arti, contoh in ISTILAH:
    print("  " + nama.ljust(11) + arti)
    print("      " + contoh)
print("")
print("  Yang penting: RISIKO butuh ketiganya sekaligus.")
print("")
print("  Ancaman tanpa kelemahan = tidak ada risiko.")
print("  Kelemahan tanpa ancaman = tidak ada risiko.")
print("  Keduanya ada tapi asetnya tak bernilai = risiko kecil.")
print("")
print("  Itu sebabnya daftar kerentanan hasil pemindai BUKAN")
print("  daftar risiko. Ia baru satu dari tiga bahannya.")

# --------------------------------------------
# 3. Menilai risiko: peluang x dampak
# --------------------------------------------
print("")
print("--- menilai risiko dengan matriks 3 x 3 ---")
# (nama, peluang 1-3, dampak 1-3)
RISIKO = [
    ("Kata sandi lemah dipakai ulang",      3, 3),
    ("Cadangan gagal saat dibutuhkan",      2, 3),
    ("Serangan phishing ke pegawai",        3, 2),
    ("Peladen web kena celah lama",         2, 2),
    ("Laptop hilang, cakram tak terenkripsi", 2, 3),
    ("Gangguan listrik kantor",             3, 1),
    ("Orang dalam menyalin data keluar",    1, 3),
    ("Gempa merusak pusat data",            1, 3),
]
def tingkat(p, d):
    skor = p * d
    if skor >= 6:
        return "TINGGI"
    if skor >= 3:
        return "sedang"
    return "rendah"

KATA = {1: "kecil", 2: "sedang", 3: "besar"}
print("  " + "risiko".ljust(38) + "peluang".rjust(8)
      + "dampak".rjust(8) + "  tingkat")
urut = sorted(RISIKO, key=lambda r: -(r[1] * r[2]))
for nama, p, d in urut:
    print("  " + nama.ljust(38) + KATA[p].rjust(8)
          + KATA[d].rjust(8) + "  " + tingkat(p, d))
n_tinggi = sum(1 for _, p, d in RISIKO if tingkat(p, d) == "TINGGI")
print("")
print("  " + str(n_tinggi) + " dari " + str(len(RISIKO))
      + " risiko bertingkat TINGGI.")
print("")
print("  Perhatikan dua baris terakhir: dampaknya sama besar,")
print("  peluangnya sama kecil, jadi tingkatnya sama. Tetapi")
print("  penanganannya sama sekali berbeda -- yang satu ditangani")
print("  dengan kendali akses, yang lain dengan lokasi cadangan.")
print("")
print("  Tingkat risiko menentukan URUTAN perhatian, bukan cara")
print("  menanganinya. Cara menanganinya datang dari kelemahannya.")

# --------------------------------------------
# 4. Pertahanan berlapis: kenapa berlapis
# --------------------------------------------
print("")
print("--- defense in depth: hitungannya ---")
LOLOS = 0.20      # peluang satu lapis DILEWATI
print("  Andaikan tiap lapis bisa dilewati dengan peluang "
      + ("%.0f%%" % (LOLOS * 100)) + ".")
print("")
SEBUT = 1 / LOLOS          # 1 dari 5
print("  " + "jumlah lapis".rjust(13)
      + "peluang SEMUA lapis lolos".rjust(28))
for n in range(1, 7):
    penyebut = int(round(SEBUT ** n))
    tampil = "1 dari " + f"{penyebut:,}".replace(",", ".")
    print("  " + str(n).rjust(13) + tampil.rjust(28))
print("")
satu_lapis_99 = 0.01
lima_lapis = LOLOS ** 5
print("  Bandingkan dua pilihan:")
def sebut(p):
    return f"{int(round(1 / p)):,}".replace(",", ".")

print("    satu lapis yang 99% efektif  -> lolos 1 dari "
      + sebut(satu_lapis_99))
print("    lima lapis yang 80% efektif  -> lolos 1 dari "
      + sebut(lima_lapis))
print("")
print("  Lima lapis yang masing-masing biasa-biasa saja "
      + ("%.0f" % (satu_lapis_99 / lima_lapis)) + " kali")
print("  lebih baik daripada satu lapis yang nyaris sempurna.")
print("")
print("  TETAPI hitungan ini hanya berlaku kalau lapisannya")
print("  BEBAS satu dari yang lain. Dan sering tidak.")

# --------------------------------------------
# 5. Lapisan yang tidak bebas
# --------------------------------------------
print("")
print("--- ketika lapisan berbagi satu titik gagal ---")
print("  Lima lapis: firewall, VPN, kata sandi aplikasi,")
print("  basis data, dan panel administrasi.")
print("")
print("  Kelimanya memakai satu direktori pengguna yang sama,")
print("  dan akun administratornya satu.")
print("")
efektif = 1
print("  lapis pada gambar        : 5")
print("  lapis yang benar-benar   : " + str(efektif))
print("  peluang lolos            : 1 dari "
      + str(int(round(1 / LOLOS ** efektif))) + "   (bukan 3.125)")
print("")
print("  Menembus akun administrator itu membuka kelimanya")
print("  sekaligus. Yang di gambar berlapis; yang di kenyataan")
print("  satu pintu dengan lima gambar pintu.")
print("")
print("  Karena itu pertanyaan yang benar bukan 'ada berapa")
print("  lapis', melainkan 'apa yang harus ditembus supaya")
print("  seluruhnya terbuka'.")

# --------------------------------------------
# 6. Hak seminimal mungkin: mengukur akibat
# --------------------------------------------
print("")
print("--- least privilege: seberapa luas akibat satu akun jebol ---")
TOTAL_DATA = 240_000
MODEL = [
    ("Semua pegawai admin",           1.00,  "seluruhnya bocor"),
    ("Semua pegawai boleh baca",      1.00,  "seluruhnya bocor"),
    ("Peran per departemen",          0.18,  "satu departemen"),
    ("Peran departemen + wilayah",    0.04,  "terbatas, serius"),
    ("Per kasus, kedaluwarsa",        0.005, "kecil, terlacak"),
]
print("  populasi data: " + f"{TOTAL_DATA:,}".replace(",", ".") + " baris")
print("")
print("  " + "model hak akses".ljust(30) + "terjangkau".rjust(11)
      + "  akibat")
for nama, bagian, akibat in MODEL:
    kena = int(TOTAL_DATA * bagian)
    print("  " + nama.ljust(30)
          + f"{kena:>11,}".replace(",", ".") + "  " + akibat)
print("")
print("  Peluang satu akun jebol SAMA di kelima model -- yang")
print("  berbeda cuma seberapa jauh akibatnya menyebar.")
print("")
print("  Ini yang membuat least privilege beda dari kendali lain:")
print("  ia tidak mengurangi peluang kejadian sama sekali. Ia")
print("  memperkecil AKIBATNYA. Dan karena kejadian pasti terjadi")
print("  cepat atau lambat, itu justru yang paling menentukan.")

# --------------------------------------------
# 7. Sisi manusia
# --------------------------------------------
print("")
print("--- lapisan yang tidak bisa ditambal ---")
PEGAWAI = 200
UJI = [
    ("Tanpa pelatihan apa pun",       0.28),
    ("Pelatihan sekali setahun",      0.15),
    ("Pelatihan + uji phishing rutin", 0.05),
]
print("  " + str(PEGAWAI) + " pegawai menerima satu surel phishing")
print("")
print("  " + "keadaan".ljust(32) + "laju".rjust(7)
      + "yang klik".rjust(11) + "min. 1 klik".rjust(13))
for nama, laju in UJI:
    klik = int(PEGAWAI * laju)
    minimal_satu = 1 - (1 - laju) ** PEGAWAI
    print("  " + nama.ljust(32) + ("%.0f%%" % (laju * 100)).rjust(7)
          + str(klik).rjust(11)
          + ("%.4f%%" % (minimal_satu * 100)).rjust(13))
print("")
print("  Kolom terakhir yang menentukan, dan isinya nyaris 100%")
print("  di ketiga keadaan. Dengan 200 penerima, peluang TIDAK")
print("  ADA satu pun yang klik praktis nol -- bahkan pada laju")
print("  5 persen.")
print("")
print("  Jadi pelatihan tidak menurunkan peluang serangan")
print("  berhasil. Ia menurunkan JUMLAH pintu yang terbuka,")
print("  dari 56 menjadi 10.")
print("")
print("  Kesimpulannya bukan 'pelatihan tidak berguna', melainkan")
print("  pelatihan tidak boleh jadi kendali TERAKHIR. Yang")
print("  menahan setelah orang klik: MFA, hak minimal, dan")
print("  pemantauan -- ketiganya bekerja tanpa perlu manusia")
print("  mengambil keputusan yang benar.")` },
  output: `--- CIA: tiga sifat yang dijaga ---
  Confidentiality  hanya yang berhak bisa MELIHAT
      dijaga oleh: enkripsi, hak akses, klasifikasi data
  Integrity        data tidak berubah tanpa izin
      dijaga oleh: hash, tanda tangan, audit log, transaksi
  Availability     bisa dipakai saat DIBUTUHKAN
      dijaga oleh: cadangan, redundansi, kapasitas, DDoS

  Ketiganya sering BERTABRAKAN, dan itu inti pekerjaannya.
  Menaikkan kerahasiaan (enkripsi + kata sandi berlapis)
  menurunkan ketersediaan (kunci hilang = data hilang).

  Jadi keamanan bukan 'seaman mungkin', melainkan MEMILIH
  di mana titik seimbangnya untuk data ini, sistem ini.

--- aset, ancaman, kelemahan, risiko ---
  Aset       yang punya nilai dan ingin dilindungi
      basis data pelanggan
  Ancaman    kejadian yang bisa merugikan aset
      pencurian data oleh pihak luar
  Kelemahan  celah yang membuat ancaman bisa terjadi
      endpoint tanpa autentikasi
  Risiko     peluang x kerugian, bila ancaman itu
      berhasil memanfaatkan kelemahan itu

  Yang penting: RISIKO butuh ketiganya sekaligus.

  Ancaman tanpa kelemahan = tidak ada risiko.
  Kelemahan tanpa ancaman = tidak ada risiko.
  Keduanya ada tapi asetnya tak bernilai = risiko kecil.

  Itu sebabnya daftar kerentanan hasil pemindai BUKAN
  daftar risiko. Ia baru satu dari tiga bahannya.

--- menilai risiko dengan matriks 3 x 3 ---
  risiko                                 peluang  dampak  tingkat
  Kata sandi lemah dipakai ulang           besar   besar  TINGGI
  Cadangan gagal saat dibutuhkan          sedang   besar  TINGGI
  Serangan phishing ke pegawai             besar  sedang  TINGGI
  Laptop hilang, cakram tak terenkripsi   sedang   besar  TINGGI
  Peladen web kena celah lama             sedang  sedang  sedang
  Gangguan listrik kantor                  besar   kecil  sedang
  Orang dalam menyalin data keluar         kecil   besar  sedang
  Gempa merusak pusat data                 kecil   besar  sedang

  4 dari 8 risiko bertingkat TINGGI.

  Perhatikan dua baris terakhir: dampaknya sama besar,
  peluangnya sama kecil, jadi tingkatnya sama. Tetapi
  penanganannya sama sekali berbeda -- yang satu ditangani
  dengan kendali akses, yang lain dengan lokasi cadangan.

  Tingkat risiko menentukan URUTAN perhatian, bukan cara
  menanganinya. Cara menanganinya datang dari kelemahannya.

--- defense in depth: hitungannya ---
  Andaikan tiap lapis bisa dilewati dengan peluang 20%.

   jumlah lapis   peluang SEMUA lapis lolos
              1                    1 dari 5
              2                   1 dari 25
              3                  1 dari 125
              4                  1 dari 625
              5                1 dari 3.125
              6               1 dari 15.625

  Bandingkan dua pilihan:
    satu lapis yang 99% efektif  -> lolos 1 dari 100
    lima lapis yang 80% efektif  -> lolos 1 dari 3.125

  Lima lapis yang masing-masing biasa-biasa saja 31 kali
  lebih baik daripada satu lapis yang nyaris sempurna.

  TETAPI hitungan ini hanya berlaku kalau lapisannya
  BEBAS satu dari yang lain. Dan sering tidak.

--- ketika lapisan berbagi satu titik gagal ---
  Lima lapis: firewall, VPN, kata sandi aplikasi,
  basis data, dan panel administrasi.

  Kelimanya memakai satu direktori pengguna yang sama,
  dan akun administratornya satu.

  lapis pada gambar        : 5
  lapis yang benar-benar   : 1
  peluang lolos            : 1 dari 5   (bukan 3.125)

  Menembus akun administrator itu membuka kelimanya
  sekaligus. Yang di gambar berlapis; yang di kenyataan
  satu pintu dengan lima gambar pintu.

  Karena itu pertanyaan yang benar bukan 'ada berapa
  lapis', melainkan 'apa yang harus ditembus supaya
  seluruhnya terbuka'.

--- least privilege: seberapa luas akibat satu akun jebol ---
  populasi data: 240.000 baris

  model hak akses                terjangkau  akibat
  Semua pegawai admin               240.000  seluruhnya bocor
  Semua pegawai boleh baca          240.000  seluruhnya bocor
  Peran per departemen               43.200  satu departemen
  Peran departemen + wilayah          9.600  terbatas, serius
  Per kasus, kedaluwarsa              1.200  kecil, terlacak

  Peluang satu akun jebol SAMA di kelima model -- yang
  berbeda cuma seberapa jauh akibatnya menyebar.

  Ini yang membuat least privilege beda dari kendali lain:
  ia tidak mengurangi peluang kejadian sama sekali. Ia
  memperkecil AKIBATNYA. Dan karena kejadian pasti terjadi
  cepat atau lambat, itu justru yang paling menentukan.

--- lapisan yang tidak bisa ditambal ---
  200 pegawai menerima satu surel phishing

  keadaan                            laju  yang klik  min. 1 klik
  Tanpa pelatihan apa pun             28%         56    100.0000%
  Pelatihan sekali setahun            15%         30    100.0000%
  Pelatihan + uji phishing rutin       5%         10     99.9965%

  Kolom terakhir yang menentukan, dan isinya nyaris 100%
  di ketiga keadaan. Dengan 200 penerima, peluang TIDAK
  ADA satu pun yang klik praktis nol -- bahkan pada laju
  5 persen.

  Jadi pelatihan tidak menurunkan peluang serangan
  berhasil. Ia menurunkan JUMLAH pintu yang terbuka,
  dari 56 menjadi 10.

  Kesimpulannya bukan 'pelatihan tidak berguna', melainkan
  pelatihan tidak boleh jadi kendali TERAKHIR. Yang
  menahan setelah orang klik: MFA, hak minimal, dan
  pemantauan -- ketiganya bekerja tanpa perlu manusia
  mengambil keputusan yang benar.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung skor risiko peluang x dampak', waktu: 'O(n)', memori: 'n = jumlah risiko didaftar' },
      { operasi: 'Urutkan daftar risiko', waktu: 'O(n log n)', memori: 'n biasanya puluhan' },
      { operasi: 'Peluang semua lapis lolos', waktu: 'O(k)', memori: 'k = jumlah lapis, satu perkalian tiap lapis' },
      { operasi: 'Peluang minimal satu dari N orang klik', waktu: 'O(1)', memori: 'satu pemangkatan' },
      { operasi: 'Hitung jangkauan tiap akun', waktu: 'O(A x P)', memori: 'A akun, P aturan izin' }
    ],
    intuisi: `Tidak ada hitungan berat di topik ini — semuanya perkalian dan pemangkatan. Yang menentukan bukan biaya komputasinya, melainkan **bentuk matematikanya**.

Dua bentuk yang sama muncul dua kali dengan arah berlawanan. \`p^k\` untuk lapisan yang bebas **melindungi**: bilangan kecil dipangkatkan menjadi sangat kecil. \`1 - (1-p)^N\` untuk N orang yang bisa keliru **menghancurkan**: peluang kecil dikalikan banyak kesempatan menjadi nyaris pasti.

Mengenali kedua bentuk itu lebih berguna daripada menghafal daftar ancaman, karena keduanya muncul di mana-mana: pada uji perangkat lunak, pada keandalan perangkat keras, pada peluang satu kesalahan lolos ke produksi.

Baris terakhir yang mahal dalam praktik, dan mahalnya bukan waktu komputasi: menghitung jangkauan tiap akun menuntut aturan izinnya bisa dibaca mesin. Di banyak sistem, ia tersebar di kode, di basis data, dan di kepala orang — dan itu sendiri sudah temuan.`
  },

  kesalahanUmum: [
    {
      salah: 'Memperlakukan daftar kerentanan hasil pemindai sebagai daftar risiko.',
      kenapa: 'Kerentanan hanya satu dari tiga bahan risiko, dan tanpa nilai aset serta ancaman nyata ia tidak memberi tahu apa pun tentang urutan pengerjaan. Laporan dengan ratusan temuan yang tidak diurut berdasarkan nilai aset justru membuat yang penting tenggelam.',
      benar: 'Pasangkan tiap kerentanan dengan aset yang terkena dan ancaman yang masuk akal, lalu urutkan dari peluang dikali dampak.'
    },
    {
      salah: 'Menghitung jumlah lapis pertahanan tanpa memeriksa ketergantungan bersamanya.',
      kenapa: 'Perkalian peluang hanya sah bila lapisannya bebas satu dari yang lain. Lima lapis yang semuanya mengakui satu akun administrator secara efektif adalah satu lapis, dan ketergantungan itu tidak muncul di diagram mana pun.',
      benar: 'Cari hal yang muncul di lebih dari satu lapis, seperti direktori pengguna tunggal atau akun awan yang sama untuk sistem dan cadangannya, lalu pisahkan.'
    },
    {
      salah: 'Menyimpan cadangan di akun atau penyedia yang sama dengan sistemnya.',
      kenapa: 'Akun yang jebol bisa dipakai menghapus sistem dan cadangannya dalam satu perintah, sehingga cadangan itu tidak melindungi terhadap kelas kejadian yang paling merusak. Lapisan cadangan menjadi bergantung penuh pada lapisan yang sedang dilindunginya.',
      benar: 'Simpan setidaknya satu salinan di penyedia atau akun berbeda dengan kredensial yang tidak sama, dan uji pemulihannya dari sana.'
    },
    {
      salah: 'Mengandalkan pelatihan kesadaran sebagai kendali terakhir terhadap phishing.',
      kenapa: 'Peluang minimal satu orang mengklik dari dua ratus penerima praktis seratus persen bahkan pada laju klik lima persen, karena supaya tidak ada yang klik seluruh penerima harus benar semua. Pelatihan menurunkan jumlah pintu yang terbuka, bukan apakah pintu terbuka.',
      benar: 'Pasang kendali yang bekerja setelah orang mengklik, yaitu MFA, hak seminimal mungkin, dan pemantauan yang tidak bergantung pada keputusan manusia.'
    },
    {
      salah: 'Menilai keamanan sebuah akun hanya dari kekuatan kata sandinya.',
      kenapa: 'Kekuatan kata sandi hanya memengaruhi peluang akun itu jebol, sementara kerusakan yang terjadi ditentukan oleh seberapa luas jangkauan akun tersebut. Dua akun dengan kata sandi sama kuat bisa berbeda dua ratus kali dalam jumlah data yang terbuka bila jebol.',
      benar: 'Hitung jangkauan data tiap akun, lalu persempit haknya sampai jangkauannya sepadan dengan kebutuhan pekerjaannya.'
    },
    {
      salah: 'Mengejar keamanan setinggi mungkin tanpa memeriksa akibatnya pada ketersediaan.',
      kenapa: 'Kerahasiaan, keutuhan, dan ketersediaan saling bertabrakan, sehingga menaikkan yang satu sering menurunkan yang lain. Enkripsi tanpa cadangan kunci mengubah kehilangan kunci menjadi kehilangan data, dan akses yang terlalu sulit membuat orang mencari jalan pintas yang tidak terpantau.',
      benar: 'Tetapkan titik seimbang per aset dengan menanyakan akibat buruk untuk masing-masing dari tiga sifat, lalu rancang kendalinya dari situ.'
    },
    {
      salah: 'Menganggap keputusan menerima sebuah risiko sama dengan tidak melakukan apa-apa.',
      kenapa: 'Risiko yang diterima secara sadar dicatat, diberi pemilik, dan ditinjau ulang berkala, sehingga ia muncul kembali saat keadaan berubah. Risiko yang diabaikan tidak punya pemilik dan tidak akan pernah ditinjau, sehingga perubahan keadaan tidak akan menghasilkan tindakan apa pun.',
      benar: 'Tulis keputusan menerima beserta alasan, nama pemilik risikonya, dan tanggal peninjauan berikutnya.'
    }
  ],

  analogi: `Bayangkan kamu menjaga **satu toko emas kecil**.

**Tiga sifat yang harus dijaga**, dan ketiganya bertabrakan.

Emasnya tidak boleh dilihat orang yang tidak berhak — itu kerahasiaan. Timbangannya tidak boleh diubah orang — itu keutuhan. Dan tokonya harus **bisa buka** — itu ketersediaan.

Sekarang perhatikan tabrakannya. Cara paling aman menjaga emas: kunci di lemari besi, kuncinya dibawa pemilik ke luar kota, tokonya tidak dibuka.

Sempurna secara kerahasiaan. Dan tidak ada gunanya sama sekali.

**Empat kata itu.** Emasnya **aset**. Pencuri **ancaman**. Jendela belakang yang rusak **kelemahan**. Dan **risiko** ada hanya kalau ketiganya bertemu.

Jendela rusak di gudang kosong bukan risiko. Pencuri di kota yang tokonya berpintu baja juga bukan.

Ini yang membuat daftar "semua yang rusak di toko" berbeda dari daftar risiko. Keran bocor juga rusak, dan tidak ada pencuri yang masuk lewat keran.

**Sekarang berlapis.**

Kamu punya pintu baja, alarm, kamera, lemari besi, dan satpam. Lima lapis.

Masing-masing bisa dilewati — pintu bisa dicongkel, alarm bisa dimatikan, kamera bisa ditutup. Tidak ada satu pun yang sempurna, mungkin masing-masing cuma menahan empat dari lima percobaan.

Tetapi harus dilewati **semuanya, berurutan**. Dan peluang lima keberhasilan berturut-turut jauh lebih kecil daripada peluang satu.

Itu sebabnya lima kunci biasa mengalahkan satu kunci yang sangat bagus.

**Kecuali** — dan ini bagiannya yang penting — kalau kelimanya dibuka oleh **satu kunci yang sama**.

Kalau pintu baja, lemari besi, ruang alarm, dan ruang kamera semuanya pakai kunci yang identik, dan kuncinya digantung di satu tempat, maka kamu tidak punya lima lapis. Kamu punya satu kunci dengan lima gambar kunci.

Pencuri tidak perlu melewati lima hal. Ia perlu satu.

**Sekarang bagian hak akses**, yang paling sering diabaikan.

Kamu punya lima pegawai. Pertanyaannya bukan seberapa jujur mereka.

Pertanyaannya: **kalau satu pegawai berkhianat, berapa banyak yang bisa ia bawa?**

Kalau kelimanya punya kunci lemari besi, jawabannya: semuanya.

Kalau tiap pegawai cuma bisa membuka satu baki yang jadi tanggung jawabnya, jawabannya: seperlima.

Peluang ada satu pegawai berkhianat **sama** di kedua keadaan. Kejujuran mereka tidak berubah karena kamu mengunci baki.

Yang berubah cuma seberapa besar kerugiannya. Dan karena dalam lima tahun kemungkinan ada satu masalah dengan satu orang, itu justru yang menentukan.

**Terakhir, soal pelatihan.**

Kamu melatih kelima pegawai mengenali uang palsu. Bagus, dan berhasil — kesalahan mereka turun jauh.

Tapi hitung: kalau tiap pegawai punya peluang 5 persen tertipu dalam setahun, peluang **tidak ada satu pun** yang tertipu selama lima tahun sangat kecil.

Jadi pelatihan tidak membuat uang palsu tidak masuk. Ia membuat **lebih sedikit** yang masuk.

Yang menahan setelah uang palsu masuk: mesin pendeteksi di kasir, dan batas jumlah transaksi tanpa persetujuan.

Keduanya bekerja **tanpa** perlu seseorang mengambil keputusan yang benar pada pukul lima sore ketika toko sedang penuh.`,

  latihan: [
    'Daftar seluruh aset satu sistem yang kamu kelola, lalu tandai mana yang tidak akan kamu ingat kalau tidak sengaja mendaftarnya.',
    'Untuk lima aset teratas, nilai akibat buruknya secara terpisah untuk kerahasiaan, keutuhan, dan ketersediaan.',
    'Tunjukkan satu keputusan keamanan di sistemmu yang menaikkan satu sifat dan menurunkan sifat lain, lalu jelaskan kenapa pertukaran itu kamu pilih.',
    'Susun sepuluh risiko lengkap dengan aset, ancaman, dan kelemahannya, lalu urutkan dari peluang dikali dampak.',
    'Ambil tiga temuan pemindai kerentanan, lalu jelaskan mana yang bukan risiko dan kenapa.',
    'Gambar lapisan pertahanan menuju aset terpentingmu, lalu tulis satu hal yang kalau ditembus membuka seluruhnya.',
    'Hitung peluang seluruh lapismu lolos bila masing-masing bisa dilewati dengan peluang dua puluh persen, lalu ulangi dengan andaian lapisannya tidak bebas.',
    'Hitung jangkauan data satu akun biasa di sistemmu, lalu usulkan dua langkah yang memperkecilnya tanpa menghambat pekerjaan.',
    'Hitung peluang minimal satu orang mengklik dari jumlah pengguna sistemmu pada laju klik lima persen, lalu jelaskan akibatnya bagi rancanganmu.',
    'Sebutkan tiga kendali di sistemmu yang bekerja tanpa perlu manusia mengambil keputusan yang benar, dan tiga yang tidak.'
  ]
});


TOPICS.push({
  id: 'kaminfo-kripto',
  judul: 'Kriptografi Terapan: Simetris, Asimetris & Hash',
  kategori: 'kaminfo',
  tag: ['AES', 'RSA', 'hash', 'SHA-256', 'garam', 'HMAC', 'tanda tangan digital'],
  ringkas: 'Dua pesan disandikan dengan kunci yang sama, dan penyerang membacanya tanpa pernah tahu kuncinya.',

  fungsi: `**Memilih alat kriptografi yang tepat untuk pekerjaan yang tepat — dan tahu kapan sebuah alat sedang dipakai untuk hal yang bukan tugasnya.**

Terpakai di:

- **Menyimpan kata sandi** di aplikasi yang kamu bangun — dan tahu kenapa SHA-256 saja tidak cukup meski ia hash yang kuat
- **Menjaga keutuhan berkas** — pemeriksaan unduhan, bukti digital, pencocokan cadangan
- **Memahami TLS** dan kenapa ia memakai dua jenis kriptografi sekaligus
- **Membaca dokumentasi API** yang menyebut HMAC, signature, dan bearer token tanpa menjelaskannya
- **Menjawab pertanyaan sidang** tentang enkripsi data — pertanyaan yang hampir selalu muncul dan sering dijawab keliru

Yang paling sering keliru: **menyebut hash sebagai enkripsi.** Hash tidak bisa dibalik, dan bukan karena membalikkannya sulit — karena membalikkannya **tidak bermakna**. Satu nilai hash 256 bit mewakili tak terhitung banyaknya masukan yang mungkin.

Dan satu kaidah yang tidak boleh dilanggar: **jangan merancang primitif kripto sendiri.** Program di topik ini menunjukkan alasannya dengan hitungan — sandi XOR yang kuncinya dipakai dua kali bisa dibaca penyerang **tanpa ia pernah tahu kuncinya.**`,
  praktik: {
    tujuan: 'Kamu bisa memilih antara hash, HMAC, dan tanda tangan digital berdasarkan apa yang perlu dijamin; menyimpan kata sandi dengan garam dan fungsi berbiaya tinggi; dan menunjukkan sendiri kenapa memakai ulang kunci mematahkan sandi.',
    alat: ['Python dengan modul hashlib dan hmac (keduanya sudah ada di pustaka standar)', 'Satu aplikasi yang menyimpan kata sandi', 'Berkas apa pun untuk diuji hash-nya'],
    langkah: [
      { judul: 'Buktikan sendiri panjang keluaran hash tidak bergantung masukan',
        isi: `Hitung SHA-256 dari satu huruf, dari satu kata, dan dari teks enam ribu karakter.

Ketiganya 64 karakter heksadesimal. Setelah melihatnya sendiri, sifat "pemetaan dari ruang tak terbatas ke ruang terbatas" berhenti terasa abstrak — dan dari situ langsung terlihat kenapa tabrakan **pasti ada**.` },
      { judul: 'Ukur efek longsornya',
        isi: `Ambil dua kata yang beda satu huruf, hitung hash keduanya, lalu hitung berapa **bit** yang berbeda.

Hasilnya sekitar setengah dari 256. Itu yang membuat hash tidak bisa "didekati" — tidak ada arah yang bisa diikuti penyerang untuk memperbaiki tebakannya.` },
      { judul: 'Tunjukkan bahaya hash kata sandi tanpa garam',
        isi: `Buat empat pengguna, tiga di antaranya memakai kata sandi yang sama. Hitung SHA-256 tanpa garam, lalu cari hash yang identik.

Kamu belum tahu kata sandinya, tetapi sudah tahu tiga orang itu memakai yang sama. Menebak satu berarti membuka tiga akun — dan itu **sebelum** tabel siap pakai ikut dipertimbangkan.` },
      { judul: 'Ulangi dengan garam berbeda per pengguna',
        isi: `Sambungkan garam acak ke depan kata sandi sebelum di-hash, lalu ulangi pencarian hash identik.

Nol. Kata sandinya tetap sama, hash-nya berbeda semua. Dan tabel siap pakai jadi tidak berguna, karena tabel itu harus dibuat ulang untuk **setiap** garam.` },
      { judul: 'Pakai fungsi yang sengaja lambat untuk kata sandi',
        isi: `Ganti SHA-256 dengan \`hashlib.pbkdf2_hmac\` berputaran ratusan ribu, atau bcrypt/Argon2 bila pustakanya tersedia.

Ini yang benar-benar memperlambat pemecahan. **Garam tidak memperlambat pemecahan satu kata sandi sama sekali** — gunanya lain, yaitu membuat satu tebakan tidak bisa dipakai untuk seluruh pengguna.` },
      { judul: 'Bandingkan hash, HMAC, dan tanda tangan pada satu pesan',
        isi: `Untuk satu pesan yang sama, hitung ketiganya, lalu tulis apa yang dijamin masing-masing.

Hash: keutuhan saja, karena siapa pun bisa menghitung ulang. HMAC: keutuhan **dan** keaslian, tetapi tidak bisa dipakai membantah karena penerima juga memegang kuncinya. Tanda tangan: ketiganya, karena kunci privatnya cuma dipegang satu pihak.` },
      { judul: 'Jebol sandi buatan sendiri',
        isi: `Tulis fungsi XOR sederhana, sandikan **dua** pesan dengan kunci yang sama, lalu XOR-kan kedua hasilnya.

Kuncinya hilang dari hasilnya. Kalau kamu menebak satu pesan, kamu langsung mendapat pesan yang lain — **tanpa pernah tahu kuncinya.**

Lakukan ini sekali, dan kaidah "jangan merancang sendiri" berhenti terasa seperti larangan tanpa alasan.` },
      { judul: 'Periksa satu sistem nyata',
        isi: `Ambil satu aplikasi yang kamu punya kodenya, lalu jawab tiga hal: kata sandinya disimpan dengan fungsi apa, garamnya per pengguna atau satu untuk semua, dan berapa putaran.

Kalau jawabannya "MD5" atau "SHA-256 tanpa garam", kamu baru saja menemukan temuan yang paling umum di seluruh aplikasi buatan mahasiswa.` }
    ],
    cek: [
      'Kata sandi di aplikasimu disimpan dengan fungsi berbiaya tinggi, bukan hash cepat',
      'Garamnya berbeda untuk setiap pengguna, dan disimpan bersama hash-nya',
      'Kamu bisa menjelaskan bedanya jaminan HMAC dan tanda tangan digital tanpa membuka catatan',
      'Kamu sudah pernah mematahkan sandi XOR berkunci-ulang dengan tanganmu sendiri'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — efek longsor, dan sandi yang jebol tanpa kuncinya diketahui',

  konsep: `Kriptografi punya reputasi sebagai bidang matematika berat. Untuk merancangnya, memang. Untuk **memakainya dengan benar** — yang jadi pekerjaan hampir semua pengembang — yang dibutuhkan cuma paham beberapa alat dan tahu tugas masing-masing.

Hampir seluruh kegagalan kripto di lapangan bukan karena algoritmanya dipecahkan. Ia karena alat yang benar dipakai untuk **tugas yang salah**.

**Dua keluarga, dua pekerjaan**

| Hal | Simetris | Asimetris |
|---|---|---|
| **Kunci** | satu kunci, dipakai bersama | sepasang: publik dan privat |
| **Enkripsi** | kunci yang sama membuka | publik menutup, privat membuka |
| **Kecepatan** | cepat, cocok untuk data besar | lambat, ratusan sampai ribuan kali |
| **Masalahnya** | bagaimana kuncinya dikirim? | bagaimana memastikan publiknya asli? |
| **Contoh** | AES, ChaCha20 | RSA, ECDSA, X25519 |

Perhatikan baris "masalahnya", karena di situ letak alasan keduanya ada.

**Kenapa simetris saja tidak cukup**

| Peserta | Kunci simetris dibutuhkan | Pasangan asimetris |
|---|---|---|
| 2 | 1 | 2 |
| 10 | 45 | 10 |
| 100 | 4.950 | 100 |
| 1.000 | 499.500 | 1.000 |

Simetris tumbuh **kuadrat**: tiap pasang butuh kunci sendiri, karena kunci yang dibagi ke semua orang tidak lagi merahasiakan apa pun dari mereka.

Seribu peserta butuh 499.500 kunci, dan masing-masing harus dikirim lewat **jalur yang sudah aman** — padahal jalur aman itulah yang sedang dibangun. Ini masalah ayam dan telur, dan ia nyata: sebelum kriptografi asimetris ada, kunci benar-benar dikirim lewat kurir.

Asimetris tumbuh **lurus**: tiap orang satu pasang, dan kunci publiknya boleh disebar terbuka — dipasang di situs web, dicetak di kartu nama, dikirim lewat jalur yang disadap. Itu tetap aman, karena yang membuka bukan kunci yang menutup.

**Gabungan keduanya: yang dipakai sungguhan**

TLS — yang bekerja setiap kali kamu membuka halaman \`https\` — memakai keduanya:

1. Peladen kirim sertifikat berisi kunci **publik**-nya
2. Peramban periksa sertifikat itu ditandatangani otoritas yang dipercaya
3. Keduanya sepakati satu kunci **simetris** acak
4. Seluruh data sesudahnya dienkripsi simetris

Asimetris cuma dipakai di langkah 1–3, untuk data sebesar beberapa ratus byte. Sesudah itu ia ditinggalkan karena terlalu lambat.

Pola ini berulang di banyak sistem: **asimetris menyelesaikan masalah pertukaran kunci, simetris mengerjakan pengangkutan datanya.**

**Hash: bukan enkripsi**

Hash memetakan masukan sepanjang apa pun ke keluaran berpanjang tetap. SHA-256 selalu menghasilkan 256 bit — untuk satu huruf maupun untuk berkas satu gigabyte.

Dari sifat itu langsung keluar akibat yang menentukan:

- Jumlah berkas 1 KB yang mungkin: **2^8192**
- Jumlah nilai hash yang mungkin: **2^256**

Jadi ada sekitar 2^7936 berkas berbeda untuk setiap nilai hash. Tabrakan **pasti ada** — itu bukan kelemahan SHA-256, itu matematika. Yang dijanjikan fungsi hash yang baik bukan tidak ada tabrakan, melainkan **tidak ada cara menemukannya** yang lebih baik daripada mencoba satu per satu.

Dan karena itu, "membalik hash" bukan pekerjaan yang sulit — ia pekerjaan yang **tidak bermakna**, karena jawabannya tak terhitung banyaknya.

Yang bisa dilakukan penyerang cuma **menebak masukan lalu membandingkan hasilnya**. Itu sebabnya kata sandi pendek tetap ketemu meski hash-nya tidak bisa dibalik: yang dipecahkan bukan hash-nya, melainkan kata sandinya.

**Efek longsor**

Ubah satu huruf pada masukan, dan sekitar **setengah bit** keluaran ikut berubah.

\`kucing\` dan \`kucinh\` berbeda satu huruf, dan hash-nya berbeda pada 121 dari 256 bit — 47 persen.

Ini bukan hiasan. Kalau perubahan kecil menghasilkan hash yang mirip, penyerang bisa menebak sambil **memperbaiki tebakannya**: coba sesuatu, lihat seberapa dekat, geser sedikit ke arah yang benar. Cara kerja itu mematahkan hampir semua sandi buatan sendiri.

Karena longsor, **tidak ada arah yang bisa diikuti**. Setiap tebakan adalah tebakan baru dari nol.

**Kenapa hash kata sandi harus digarami**

Empat pengguna, tiga di antaranya memakai kata sandi yang sama. Tanpa garam, ketiganya menghasilkan hash yang **identik**.

Penyerang yang mendapat basis data itu belum tahu kata sandinya — tetapi sudah tahu tiga orang ini memakai yang sama. Menebak satu berarti membuka tiga akun.

Dan itu baru masalah keduanya. Yang pertama lebih besar: **tabel hash siap pakai**. Karena hash SHA-256 dari \`kucing123\` selalu sama di seluruh dunia, seseorang bisa menghitung sekali untuk miliaran kata sandi umum, lalu mencocokkan.

Dengan garam berbeda per pengguna, kata sandi yang sama menghasilkan hash yang berbeda semua — dan tabel siap pakai jadi tidak berguna, karena harus dibuat ulang untuk **setiap** garam.

Perhatikan apa yang **tidak** dilakukan garam: ia tidak memperlambat pemecahan satu kata sandi. Untuk itu dibutuhkan hal lain — fungsi yang sengaja dibuat lambat, dan itu dibahas di topik berikutnya.

**Hash, HMAC, tanda tangan: apa yang dijamin**

| Cara | Keutuhan | Keaslian | Tak bisa disangkal |
|---|---|---|---|
| Hash saja | ya | tidak | tidak |
| HMAC (kunci bersama) | ya | ya | tidak |
| Tanda tangan digital | ya | ya | ya |

**Hash saja** cuma menjamin keutuhan, dan alasannya sederhana: siapa pun bisa menghitungnya. Penyerang yang mengubah pesan bisa sekalian menghitung ulang hash-nya. Hash berguna terhadap kerusakan yang tidak disengaja, bukan terhadap orang.

**HMAC** menambahkan kunci ke dalam perhitungannya. Tanpa kunci itu, tag-nya tidak bisa dibuat — jadi ia membuktikan pesan datang dari pemegang kunci.

Tetapi kuncinya dipegang **kedua** pihak, sehingga penerima juga bisa membuat tag itu. Karena itu HMAC tidak bisa dipakai untuk membantah *"saya tidak pernah mengirimnya"* — penerima bisa saja membuatnya sendiri.

**Tanda tangan digital** memakai kunci privat yang cuma dipegang satu pihak. Itu yang memberi sifat ketiga, dan itu yang membuatnya dipakai untuk dokumen dan pembaruan perangkat lunak.

**Kenapa jangan merancang sendiri**

Ini bukan larangan berdasarkan kewibawaan. Ini kesimpulan dari satu contoh yang bisa dijalankan sendiri.

Ambil sandi XOR: setiap byte pesan di-XOR dengan byte kunci. Dengan kunci acak sepanjang pesan dan dipakai **sekali saja**, sandi ini justru terbukti tidak bisa dipecahkan.

Sekarang pakai kunci yang sama untuk **dua** pesan.

Penyerang meng-XOR kedua sandinya. Kuncinya **hilang** dari hasil, karena \`K XOR K = 0\`. Yang tersisa: \`pesan1 XOR pesan2\`.

Kalau ia menebak satu pesan dengan benar, ia langsung mendapat pesan yang lain — **tanpa pernah tahu kuncinya.**

Kesalahannya bukan XOR-nya. Kesalahannya **memakai ulang kunci** — satu keputusan yang terasa tidak berbahaya, dan yang mematahkan seluruh sistemnya.

Kesalahan berbentuk seperti ini, yang tidak terlihat sampai ditunjukkan, adalah yang selalu muncul pada rancangan sendiri. Itu sebabnya kaidahnya keras: **pakai pustaka yang sudah diperiksa banyak orang, dan jangan menyusun primitifnya sendiri.**`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import hashlib\n\nA, B = 'kucing', 'kucinh'          # beda SATU huruf\nha = hashlib.sha256(A.encode()).digest()\nhb = hashlib.sha256(B.encode()).digest()\n\nbeda = sum(bin(x ^ y).count('1') for x, y in zip(ha, hb))\n# beda = 121 dari 256 bit  (47,3%)\n\n# kucing -> 1c575651a095af2dffb21413df381064...\n# kucinh -> 1ab643e23ccd15abd326176a6aa5f3f5...\n#\n# Tidak ada kemiripan yang bisa diikuti.",
      penjelasan: `Empat baris yang menjelaskan kenapa fungsi hash yang baik tidak bisa diserang dengan cara yang mematahkan hampir semua sandi buatan sendiri.

Mulai dari cara mengukurnya. \`x ^ y\` meng-XOR dua byte, dan hasilnya punya bit 1 tepat di posisi yang **berbeda**. Jadi \`bin(x ^ y).count('1')\` menghitung jumlah bit yang berbeda pada byte itu, dan menjumlahkannya untuk seluruh 32 byte memberi jarak total dalam bit.

Hasilnya **121 dari 256** — 47 persen, mendekati setengah.

Setengah itu angka yang tepat, dan bukan kebetulan. Kalau dua keluaran acak yang saling bebas dibandingkan bit demi bit, tiap bit punya peluang setengah untuk berbeda. Jadi hash dari masukan yang beda satu huruf berperilaku seperti **dua bilangan acak yang tidak berhubungan**.

Itu justru yang diinginkan.

**Sekarang kenapa ini penting, dan bukan sekadar sifat menarik.**

Bayangkan sebuah fungsi hash yang tidak punya sifat ini — katakanlah masukan yang mirip menghasilkan keluaran yang mirip. Terdengar tidak berbahaya, bahkan terdengar rapi.

Sekarang bayangkan penyerang yang ingin menemukan kata sandi dari hash-nya. Ia mencoba \`kucing\`, dan melihat hasilnya berbeda 4 bit dari sasaran. Ia mencoba \`kucinh\`, dan hasilnya berbeda 2 bit — **lebih dekat**.

Sekarang ia punya arah. Ia bisa terus menggeser tebakannya ke arah yang mengurangi jarak, dan sampai ke jawabannya dalam hitungan ribuan percobaan alih-alih miliaran.

Teknik ini punya nama di bidang lain: **pendakian bukit**. Ia bekerja pada setiap masalah yang punya "lebih dekat" dan "lebih jauh" yang bisa diukur — dan ia sangat kuat.

Efek longsor menghapus konsep "lebih dekat" sepenuhnya. Tebakan yang salah satu huruf dan tebakan yang salah seluruhnya sama jauhnya dari sasaran: keduanya berbeda sekitar setengah bit. Tidak ada lereng yang bisa didaki.

Jadi satu-satunya cara maju: **coba, bandingkan, buang, coba lagi.** Setiap tebakan berdiri sendiri, dan itu memaksa penyerang membayar harga penuh untuk setiap percobaan.

**Dari sini keluar dua akibat praktis.**

**Pertama, hash cocok untuk memeriksa keutuhan.** Satu bit yang berubah pada berkas 4 GB mengubah separuh bit hash-nya. Tidak ada perubahan yang "terlalu kecil untuk terdeteksi" — dan itu sebabnya hash dipakai untuk memeriksa unduhan dan untuk menjaga bukti digital.

**Kedua, dan ini yang sering disalahpahami: efek longsor tidak membuat kata sandi lemah jadi aman.**

Penyerang tidak menyerang hash-nya. Ia menyerang **ruang kata sandinya**. Kalau kata sandimu ada di daftar sejuta kata sandi terpopuler, penyerang cuma butuh sejuta percobaan — dan setiap percobaannya berbiaya satu perhitungan SHA-256, yang bisa dijalankan miliaran kali per detik di GPU.

Efek longsor memastikan tidak ada jalan pintas. Ia tidak memperbesar jumlah jalan yang harus dilalui.

Yang memperbesar itu dua hal, dan keduanya di luar hash-nya: **kata sandi yang lebih panjang** dan **fungsi yang sengaja lambat.**`
    },
    {
      bahasa: 'python',
      kode: "def xor(data, kunci):\n    return bytes(b ^ kunci[i % len(kunci)]\n                 for i, b in enumerate(data))\n\nK  = b'kuncirahasia'\nP1 = b'SALDO ANDI 500'\nP2 = b'SALDO BUDI 900'\nC1, C2 = xor(P1, K), xor(P2, K)      # KUNCI SAMA, dua pesan\n\ngabung = bytes(a ^ b for a, b in zip(C1, C2))\n# gabung = P1 XOR P2   -- kuncinya HILANG\n\ntebak = bytes(a ^ b for a, b in zip(gabung, P1))\n# tebak = b'SALDO BUDI 900'\n#\n# Penyerang tidak pernah tahu kuncinya.",
      penjelasan: `Sepuluh baris yang mengubah kaidah "jangan merancang kripto sendiri" dari nasihat menjadi kesimpulan.

Mulai dari yang membuat contoh ini kuat: **sandi XOR bukan sandi yang buruk.** Dengan kunci acak sepanjang pesan yang dipakai **sekali saja**, ia adalah one-time pad — satu-satunya sandi yang terbukti secara matematis tidak bisa dipecahkan, bahkan oleh komputer dengan daya tak terbatas.

Jadi kesalahannya bukan pada algoritmanya. Kesalahannya pada satu keputusan pemakaian: kunci yang sama untuk dua pesan.

Dan keputusan itu terasa **sangat masuk akal**. Membuat kunci baru untuk setiap pesan merepotkan. Kuncinya sudah acak, sudah panjang, sudah dirahasiakan. Apa bedanya dipakai dua kali?

Sekarang lihat apa yang terjadi.

**Langkah pertama: penyerang meng-XOR kedua sandinya.**

\`C1 = P1 XOR K\` dan \`C2 = P2 XOR K\`. Maka:

\`C1 XOR C2 = (P1 XOR K) XOR (P2 XOR K)\`

XOR bersifat asosiatif dan komutatif, jadi K bisa dipindahkan berdampingan — dan \`K XOR K = 0\`. Yang tersisa:

\`C1 XOR C2 = P1 XOR P2\`

**Kuncinya hilang seluruhnya.** Bukan dilemahkan, bukan dipersempit — hilang. Penyerang sekarang memegang XOR kedua pesan asli, dan kunci sudah tidak berperan lagi dalam apa pun.

Perhatikan bahwa ini tidak menuntut perhitungan berat, tidak menuntut menebak kunci, dan tidak bergantung pada panjang kuncinya. Kunci 10 karakter dan kunci 10.000 karakter sama-sama hilang.

**Langkah kedua: menebak satu pesan.**

Kalau penyerang bisa menebak \`P1\` — dan pada lalu lintas nyata itu sering mudah, karena pesan punya bentuk yang berulang seperti \`SALDO\`, tajuk protokol, atau ucapan pembuka — maka:

\`(P1 XOR P2) XOR P1 = P2\`

Pesan kedua terbaca utuh. Pada contoh ini: \`SALDO BUDI 900\`.

Penyerang **tidak pernah tahu kuncinya**, dan tidak pernah membutuhkannya.

**Dan pada kenyataannya ia bahkan tidak perlu menebak pesan penuh.** Kalau ia menebak benar sepuluh karakter pertama saja, ia mendapat sepuluh karakter pertama pesan kedua. Lalu dari situ ia menebak lanjutannya, lalu memakainya untuk memperbaiki tebakan pesan pertama, dan seterusnya bergantian — teknik yang disebut *crib dragging*. Dengan dua pesan berbahasa manusia, keduanya biasanya terbaca seluruhnya.

**Sekarang kenapa ini penting bagi orang yang tidak merancang sandi.**

Karena kesalahan yang sama bentuknya muncul di pemakaian pustaka yang benar:

- **IV atau nonce yang dipakai ulang** pada AES mode CTR atau GCM menghasilkan kelemahan yang **persis sama** — mode itu bekerja dengan menghasilkan aliran kunci lalu meng-XOR-nya, jadi nonce yang berulang berarti aliran kunci yang berulang
- **Mode ECB**, yang menyandikan setiap blok secara terpisah, membuat blok masukan yang sama selalu menghasilkan blok sandi yang sama — pola gambar masih terlihat setelah dienkripsi
- **Bilangan acak dari \`random\` biasa** alih-alih dari sumber kriptografis membuat kunci bisa dihitung ulang tanpa satu pun tebakan

Ketiganya adalah pemakaian pustaka standar yang kuat, dengan satu pilihan yang salah. Dan ketiganya cukup untuk membuka seluruhnya.

Jadi kaidahnya sebenarnya lebih tajam daripada "jangan merancang sendiri". Ia: **jangan mengambil keputusan kripto yang kamu tidak bisa jelaskan akibatnya.**

Pakai antarmuka tingkat tinggi yang tidak menawarkan pilihan berbahaya — pustaka yang mengurus nonce sendiri, yang tidak memberimu mode ECB sebagai pilihan, dan yang mengambil keacakannya dari sumber yang benar tanpa ditanya.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Kriptografi terapan: simetris, asimetris, hash
# ============================================
import hashlib
import hmac

# --------------------------------------------
# 1. Dua keluarga, dua pekerjaan berbeda
# --------------------------------------------
print("--- simetris vs asimetris ---")
BEDA = [
    ("Kunci",      "SATU kunci, dipakai bersama",
     "SEPASANG: publik & privat"),
    ("Enkripsi",   "kunci yang sama membuka",
     "publik menutup, privat membuka"),
    ("Kecepatan",  "cepat, cocok untuk data besar",
     "lambat, ratusan sampai ribuan kali"),
    ("Masalahnya", "bagaimana kuncinya dikirim?",
     "bagaimana memastikan publiknya asli?"),
    ("Contoh",     "AES, ChaCha20",
     "RSA, ECDSA, X25519"),
]
for hal, sim, asim in BEDA:
    print("  " + hal)
    print("      simetris  : " + sim)
    print("      asimetris : " + asim)

# --------------------------------------------
# 2. Kenapa simetris saja tidak cukup
# --------------------------------------------
print("")
print("--- berapa kunci dibutuhkan? ---")
print("  " + "peserta".rjust(9) + "kunci simetris".rjust(17)
      + "pasangan asimetris".rjust(21))
for n in (2, 10, 100, 1000):
    sim = n * (n - 1) // 2
    print("  " + str(n).rjust(9)
          + f"{sim:>17,}".replace(",", ".")
          + f"{n:>21,}".replace(",", "."))
print("")
print("  Simetris tumbuh KUADRAT: tiap pasang butuh kunci")
print("  sendiri. Seribu peserta butuh 499.500 kunci, dan")
print("  masing-masing harus dikirim lewat jalur yang aman")
print("  -- padahal jalur aman itulah yang sedang dibangun.")
print("")
print("  Asimetris tumbuh LURUS: tiap orang satu pasang, dan")
print("  kunci publiknya boleh disebar terbuka.")

# --------------------------------------------
# 3. Gabungan keduanya: yang dipakai sungguhan
# --------------------------------------------
print("")
print("--- hibrida: cara TLS bekerja ---")
LANGKAH = [
    "1. Peladen kirim sertifikat berisi kunci PUBLIK-nya",
    "2. Peramban periksa sertifikat itu ditandatangani CA",
    "3. Keduanya sepakati satu kunci SIMETRIS acak",
    "4. Seluruh data sesudahnya dienkripsi simetris",
]
for x in LANGKAH:
    print("  " + x)
print("")
print("  Asimetris cuma dipakai di langkah 1-3, untuk data")
print("  sebesar beberapa ratus byte. Sesudah itu ia ditinggal")
print("  karena terlalu lambat.")
print("")
print("  Ini pola yang berulang di banyak sistem: asimetris")
print("  menyelesaikan masalah PERTUKARAN KUNCI, simetris")
print("  mengerjakan pengangkutan datanya.")

# --------------------------------------------
# 4. Hash: sifat yang membuatnya berguna
# --------------------------------------------
print("")
print("--- hash: panjang keluaran tidak bergantung masukan ---")
CONTOH = ["a", "kucing", "kucing" * 1000]
for teks in CONTOH:
    h = hashlib.sha256(teks.encode()).hexdigest()
    label = teks if len(teks) <= 10 else ("(" + str(len(teks))
                                          + " karakter)")
    print("  " + label.ljust(18) + h[:32] + "...")
print("")
print("  Ketiganya 256 bit. Masukan satu huruf dan masukan enam")
print("  ribu huruf menghasilkan keluaran sepanjang sama.")

# --------------------------------------------
# 5. Efek longsor
# --------------------------------------------
print("")
print("--- efek longsor: satu huruf berubah ---")
A, B = "kucing", "kucinh"
ha = hashlib.sha256(A.encode()).digest()
hb = hashlib.sha256(B.encode()).digest()
beda_bit = sum(bin(x ^ y).count("1") for x, y in zip(ha, hb))
print("  " + A + " -> " + ha.hex()[:40] + "...")
print("  " + B + " -> " + hb.hex()[:40] + "...")
print("")
print("  bit yang berbeda : " + str(beda_bit) + " dari 256  ("
      + ("%.1f%%" % (beda_bit / 256 * 100)) + ")")
print("")
print("  Satu huruf berubah, dan sekitar SETENGAH bit keluaran")
print("  ikut berubah. Itu yang disebut efek longsor, dan itu")
print("  yang membuat hash tidak bisa 'didekati' sedikit-sedikit.")
print("")
print("  Kalau perubahan kecil menghasilkan hash yang mirip,")
print("  penyerang bisa menebak sambil memperbaiki tebakannya.")
print("  Karena longsor, tidak ada arah yang bisa diikuti.")

# --------------------------------------------
# 6. Hash BUKAN enkripsi
# --------------------------------------------
print("")
print("--- kenapa hash tidak bisa dibalik ---")
print("  Masukan sepanjang APA PUN dipetakan ke 256 bit.")
print("")
print("  Jumlah berkas 1 KB yang mungkin  : 2^8192")
print("  Jumlah nilai hash yang mungkin   : 2^256")
print("")
print("  Jadi ada 2^7936 berkas berbeda untuk tiap nilai hash.")
print("  Membalik hash bukan sulit -- ia TIDAK BERMAKNA, karena")
print("  jawabannya tak terhitung banyaknya.")
print("")
print("  Yang bisa dilakukan penyerang cuma MENEBAK masukan lalu")
print("  membandingkan hasilnya. Itu sebabnya kata sandi pendek")
print("  tetap ketemu meski hash-nya tidak bisa dibalik.")

# --------------------------------------------
# 7. Kenapa hash kata sandi harus DIGARAMI
# --------------------------------------------
print("")
print("--- garam: kata sandi sama, hash harus berbeda ---")
BOCOR = [("andi", "kucing123"), ("budi", "rahasia"),
         ("citra", "kucing123"), ("dedi", "kucing123")]
print("  TANPA garam:")
tanpa = {}
for nama, sandi in BOCOR:
    h = hashlib.sha256(sandi.encode()).hexdigest()
    tanpa.setdefault(h, []).append(nama)
    print("    " + nama.ljust(8) + h[:24] + "...")
sama = [v for v in tanpa.values() if len(v) > 1]
print("")
print("  Kelompok berhash identik: " + str(len(sama)))
for v in sama:
    print("    " + ", ".join(v) + " -> kata sandinya SAMA")
print("")
print("  Penyerang belum tahu kata sandinya, tetapi sudah tahu")
print("  tiga orang ini memakai kata sandi yang sama. Menebak")
print("  satu berarti membuka tiga akun.")
print("")
print("  DENGAN garam (garam berbeda per pengguna):")
GARAM = {"andi": "x7f2", "budi": "q9a1", "citra": "m3k8",
         "dedi": "b5t0"}
dengan = {}
for nama, sandi in BOCOR:
    h = hashlib.sha256((GARAM[nama] + sandi).encode()).hexdigest()
    dengan.setdefault(h, []).append(nama)
    print("    " + nama.ljust(8) + h[:24] + "...")
sama2 = [v for v in dengan.values() if len(v) > 1]
print("")
print("  Kelompok berhash identik: " + str(len(sama2)))
print("")
print("  Kata sandinya tetap sama, hash-nya sekarang berbeda")
print("  semua. Dan tabel hash siap pakai (rainbow table) jadi")
print("  tidak berguna, karena tabel itu harus dibuat ulang")
print("  untuk SETIAP garam.")

# --------------------------------------------
# 8. Hash saja tidak membuktikan siapa
# --------------------------------------------
print("")
print("--- hash, HMAC, tanda tangan: apa yang dijamin ---")
JAMIN = [
    ("Hash saja",        "YA", "tidak", "tidak",
     "siapa pun bisa hitung ulang"),
    ("HMAC (kunci sama)", "YA", "YA", "tidak",
     "penerima juga bisa membuatnya"),
    ("Tanda tangan digital", "YA", "YA", "YA",
     "hanya pemilik kunci privat bisa"),
]
print("  " + "cara".ljust(22) + "utuh".rjust(6) + "asli".rjust(6)
      + "tak bisa".rjust(10))
print("  " + "".ljust(22) + "".rjust(6) + "".rjust(6)
      + "disangkal".rjust(10))
for nama, a, b, c, catat in JAMIN:
    print("  " + nama.ljust(22) + a.rjust(6) + b.rjust(6)
          + c.rjust(10))
    print("      " + catat)
print("")
KUNCI = b"kunci-bersama-rahasia"
PESAN = b"transfer 5000000 ke rekening 12345"
tag = hmac.new(KUNCI, PESAN, hashlib.sha256).hexdigest()
print("  HMAC pesan di atas: " + tag[:32] + "...")
print("")
print("  Tanpa kunci itu, tag ini tidak bisa dibuat. Jadi ia")
print("  membuktikan pesan datang dari pemegang kunci -- sesuatu")
print("  yang hash biasa tidak bisa lakukan sama sekali.")
print("")
print("  Tapi karena kuncinya dipegang KEDUA pihak, penerima juga")
print("  bisa membuat tag itu. Karena itu HMAC tidak bisa dipakai")
print("  untuk membantah 'saya tidak pernah mengirimnya'.")
print("")
print("  Yang bisa: tanda tangan digital, karena kunci privatnya")
print("  cuma dipegang satu pihak.")

# --------------------------------------------
# 9. Bahaya memakai ulang kunci pada XOR
# --------------------------------------------
print("")
print("--- kenapa jangan merancang sandi sendiri ---")
def xor(data, kunci):
    return bytes(b ^ kunci[i % len(kunci)] for i, b in enumerate(data))

K = b"kuncirahasia"
P1 = b"SALDO ANDI 500"
P2 = b"SALDO BUDI 900"
C1, C2 = xor(P1, K), xor(P2, K)
print("  Sandi XOR dengan kunci dipakai untuk DUA pesan:")
print("    sandi 1 : " + C1.hex())
print("    sandi 2 : " + C2.hex())
print("")
gabung = bytes(a ^ b for a, b in zip(C1, C2))
print("  Penyerang meng-XOR kedua sandi itu:")
print("    hasil   : " + gabung.hex())
print("")
print("  Kuncinya HILANG dari hasil itu, karena K XOR K = 0.")
print("  Yang tersisa: pesan1 XOR pesan2.")
print("")
tebak = bytes(a ^ b for a, b in zip(gabung, P1))
print("  Kalau penyerang menebak pesan 1 benar, ia langsung")
print("  mendapat pesan 2:")
print("    " + repr(tebak.decode()))
print("")
print("  Ia tidak perlu tahu kuncinya sama sekali.")
print("")
print("  Kesalahannya bukan XOR-nya -- XOR dengan kunci sekali")
print("  pakai sepanjang pesan justru tidak bisa dipecahkan.")
print("  Kesalahannya MEMAKAI ULANG kunci, dan kesalahan seperti")
print("  ini yang selalu muncul pada rancangan sendiri.")
print("")
print("  Itu sebabnya kaidahnya keras: pakai pustaka yang sudah")
print("  diperiksa banyak orang, dan jangan menyusun primitifnya")
print("  sendiri.")` },
  output: `--- simetris vs asimetris ---
  Kunci
      simetris  : SATU kunci, dipakai bersama
      asimetris : SEPASANG: publik & privat
  Enkripsi
      simetris  : kunci yang sama membuka
      asimetris : publik menutup, privat membuka
  Kecepatan
      simetris  : cepat, cocok untuk data besar
      asimetris : lambat, ratusan sampai ribuan kali
  Masalahnya
      simetris  : bagaimana kuncinya dikirim?
      asimetris : bagaimana memastikan publiknya asli?
  Contoh
      simetris  : AES, ChaCha20
      asimetris : RSA, ECDSA, X25519

--- berapa kunci dibutuhkan? ---
    peserta   kunci simetris   pasangan asimetris
          2                1                    2
         10               45                   10
        100            4.950                  100
       1000          499.500                1.000

  Simetris tumbuh KUADRAT: tiap pasang butuh kunci
  sendiri. Seribu peserta butuh 499.500 kunci, dan
  masing-masing harus dikirim lewat jalur yang aman
  -- padahal jalur aman itulah yang sedang dibangun.

  Asimetris tumbuh LURUS: tiap orang satu pasang, dan
  kunci publiknya boleh disebar terbuka.

--- hibrida: cara TLS bekerja ---
  1. Peladen kirim sertifikat berisi kunci PUBLIK-nya
  2. Peramban periksa sertifikat itu ditandatangani CA
  3. Keduanya sepakati satu kunci SIMETRIS acak
  4. Seluruh data sesudahnya dienkripsi simetris

  Asimetris cuma dipakai di langkah 1-3, untuk data
  sebesar beberapa ratus byte. Sesudah itu ia ditinggal
  karena terlalu lambat.

  Ini pola yang berulang di banyak sistem: asimetris
  menyelesaikan masalah PERTUKARAN KUNCI, simetris
  mengerjakan pengangkutan datanya.

--- hash: panjang keluaran tidak bergantung masukan ---
  a                 ca978112ca1bbdcafac231b39a23dc4d...
  kucing            1c575651a095af2dffb21413df381064...
  (6000 karakter)   9ef7c7019576679d668b0919960ee79c...

  Ketiganya 256 bit. Masukan satu huruf dan masukan enam
  ribu huruf menghasilkan keluaran sepanjang sama.

--- efek longsor: satu huruf berubah ---
  kucing -> 1c575651a095af2dffb21413df381064614f9d8d...
  kucinh -> 1ab643e23ccd15abd326176a6aa5f3f5369dd145...

  bit yang berbeda : 121 dari 256  (47.3%)

  Satu huruf berubah, dan sekitar SETENGAH bit keluaran
  ikut berubah. Itu yang disebut efek longsor, dan itu
  yang membuat hash tidak bisa 'didekati' sedikit-sedikit.

  Kalau perubahan kecil menghasilkan hash yang mirip,
  penyerang bisa menebak sambil memperbaiki tebakannya.
  Karena longsor, tidak ada arah yang bisa diikuti.

--- kenapa hash tidak bisa dibalik ---
  Masukan sepanjang APA PUN dipetakan ke 256 bit.

  Jumlah berkas 1 KB yang mungkin  : 2^8192
  Jumlah nilai hash yang mungkin   : 2^256

  Jadi ada 2^7936 berkas berbeda untuk tiap nilai hash.
  Membalik hash bukan sulit -- ia TIDAK BERMAKNA, karena
  jawabannya tak terhitung banyaknya.

  Yang bisa dilakukan penyerang cuma MENEBAK masukan lalu
  membandingkan hasilnya. Itu sebabnya kata sandi pendek
  tetap ketemu meski hash-nya tidak bisa dibalik.

--- garam: kata sandi sama, hash harus berbeda ---
  TANPA garam:
    andi    87a858578d3ec546ea037f4b...
    budi    541e984103d4099bb8383050...
    citra   87a858578d3ec546ea037f4b...
    dedi    87a858578d3ec546ea037f4b...

  Kelompok berhash identik: 1
    andi, citra, dedi -> kata sandinya SAMA

  Penyerang belum tahu kata sandinya, tetapi sudah tahu
  tiga orang ini memakai kata sandi yang sama. Menebak
  satu berarti membuka tiga akun.

  DENGAN garam (garam berbeda per pengguna):
    andi    4bfdc57633209a7a23f3ac1c...
    budi    c0cdc7159a8162a33c1f7636...
    citra   7f67e4c3cf143c896e8fb1f9...
    dedi    3ba2559609f6bf300e01a842...

  Kelompok berhash identik: 0

  Kata sandinya tetap sama, hash-nya sekarang berbeda
  semua. Dan tabel hash siap pakai (rainbow table) jadi
  tidak berguna, karena tabel itu harus dibuat ulang
  untuk SETIAP garam.

--- hash, HMAC, tanda tangan: apa yang dijamin ---
  cara                    utuh  asli  tak bisa
                                     disangkal
  Hash saja                 YA tidak     tidak
      siapa pun bisa hitung ulang
  HMAC (kunci sama)         YA    YA     tidak
      penerima juga bisa membuatnya
  Tanda tangan digital      YA    YA        YA
      hanya pemilik kunci privat bisa

  HMAC pesan di atas: d3b7ee226ce150b1ff4864a6597c6d56...

  Tanpa kunci itu, tag ini tidak bisa dibuat. Jadi ia
  membuktikan pesan datang dari pemegang kunci -- sesuatu
  yang hash biasa tidak bisa lakukan sama sekali.

  Tapi karena kuncinya dipegang KEDUA pihak, penerima juga
  bisa membuat tag itu. Karena itu HMAC tidak bisa dipakai
  untuk membantah 'saya tidak pernah mengirimnya'.

  Yang bisa: tanda tangan digital, karena kunci privatnya
  cuma dipegang satu pihak.

--- kenapa jangan merancang sandi sendiri ---
  Sandi XOR dengan kunci dipakai untuk DUA pesan:
    sandi 1 : 3834222726522026253a49545b45
    sandi 2 : 383422272652233d253a49585b45

  Penyerang meng-XOR kedua sandi itu:
    hasil   : 000000000000031b0000000c0000

  Kuncinya HILANG dari hasil itu, karena K XOR K = 0.
  Yang tersisa: pesan1 XOR pesan2.

  Kalau penyerang menebak pesan 1 benar, ia langsung
  mendapat pesan 2:
    'SALDO BUDI 900'

  Ia tidak perlu tahu kuncinya sama sekali.

  Kesalahannya bukan XOR-nya -- XOR dengan kunci sekali
  pakai sepanjang pesan justru tidak bisa dipecahkan.
  Kesalahannya MEMAKAI ULANG kunci, dan kesalahan seperti
  ini yang selalu muncul pada rancangan sendiri.

  Itu sebabnya kaidahnya keras: pakai pustaka yang sudah
  diperiksa banyak orang, dan jangan menyusun primitifnya
  sendiri.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Enkripsi simetris (AES)', waktu: 'O(n)', memori: 'n = panjang data, sangat cepat per byte' },
      { operasi: 'Enkripsi asimetris (RSA)', waktu: 'O(k^3)', memori: 'k = panjang kunci, ratusan kali lebih lambat' },
      { operasi: 'Hash SHA-256', waktu: 'O(n)', memori: 'O(1), keadaan tetap 256 bit' },
      { operasi: 'Kunci simetris untuk N peserta', waktu: 'O(N^2)', memori: 'N(N-1)/2 kunci harus dibagikan' },
      { operasi: 'Pasangan asimetris untuk N peserta', waktu: 'O(N)', memori: 'satu pasang per orang' },
      { operasi: 'Menebak kata sandi ber-entropi b bit', waktu: 'O(2^b)', memori: 'inilah yang sesungguhnya diserang' }
    ],
    intuisi: `Dua baris tengah menjelaskan seluruh rancangan TLS. Asimetris \`O(k^3)\` dengan tetapan yang besar, sehingga memakainya untuk seluruh data akan melumpuhkan peladen. Simetris \`O(n)\` dengan tetapan kecil, sehingga bisa mengenkripsi video sambil ditonton.

Maka pembagian kerjanya menjadi keharusan teknis, bukan pilihan gaya: yang lambat mengangkut kunci, yang cepat mengangkut data.

Dua baris berikutnya, \`O(N^2)\` lawan \`O(N)\`, adalah alasan historis kriptografi asimetris ditemukan. Bukan karena ia lebih aman — karena tanpanya jumlah kunci yang harus dibagikan tumbuh sampai mustahil dikelola.

Dan baris terakhir yang paling sering dilupakan: yang diserang bukan \`2^256\` ruang hash, melainkan \`2^b\` ruang kata sandi. Kata sandi berentropi 28 bit tetap jatuh dalam sekejap di belakang hash 256 bit yang sempurna, karena penyerang tidak pernah menyentuh hash-nya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menyebut hash sebagai bentuk enkripsi yang tidak bisa dibalik.',
      kenapa: 'Enkripsi memetakan satu masukan ke satu keluaran yang bisa dikembalikan dengan kunci, sedangkan hash memetakan ruang masukan tak terbatas ke keluaran berpanjang tetap sehingga tak terhitung banyaknya masukan memberi hash yang sama. Membalik hash bukan sulit, melainkan tidak bermakna.',
      benar: 'Pakai istilah hash untuk keutuhan dan verifikasi, dan enkripsi hanya untuk data yang perlu dibaca kembali.'
    },
    {
      salah: 'Menyimpan kata sandi dengan hash cepat seperti MD5 atau SHA-256.',
      kenapa: 'Hash cepat justru menguntungkan penyerang, karena ia bisa mencoba miliaran tebakan per detik di GPU. Kekuatan hash terhadap tabrakan tidak melindungi kata sandi, sebab yang diserang adalah ruang kata sandinya, bukan hash-nya.',
      benar: 'Pakai fungsi yang sengaja lambat seperti bcrypt, Argon2, atau PBKDF2 dengan ratusan ribu putaran.'
    },
    {
      salah: 'Memakai satu garam yang sama untuk seluruh pengguna.',
      kenapa: 'Garam tunggal masih membuat kata sandi yang sama menghasilkan hash yang sama, sehingga penyerang tetap bisa melihat pengguna mana yang memakai kata sandi identik dan satu tebakan tetap membuka banyak akun. Tabel siap pakai juga cukup dibuat sekali untuk garam itu.',
      benar: 'Bangkitkan garam acak per pengguna dan simpan bersama hash-nya, karena garam tidak perlu dirahasiakan.'
    },
    {
      salah: 'Mengandalkan garam untuk memperlambat pemecahan kata sandi.',
      kenapa: 'Garam tidak mengubah kecepatan menghitung satu hash sama sekali, sehingga waktu memecahkan satu kata sandi tetap sama. Fungsi garam adalah mencegah satu tebakan dipakai untuk seluruh pengguna dan mematikan tabel siap pakai.',
      benar: 'Pakai garam untuk memisahkan pengguna, dan pakai fungsi berbiaya tinggi untuk memperlambat tiap tebakan.'
    },
    {
      salah: 'Memakai ulang IV, nonce, atau kunci aliran pada dua pesan berbeda.',
      kenapa: 'Mode aliran bekerja dengan meng-XOR data dengan aliran kunci, sehingga dua pesan beraliran sama bisa di-XOR untuk menghilangkan kuncinya sepenuhnya. Penyerang lalu membaca kedua pesan tanpa pernah mengetahui kuncinya.',
      benar: 'Pastikan nonce selalu baru untuk setiap operasi, dan pilih antarmuka pustaka yang mengurusnya sendiri.'
    },
    {
      salah: 'Memakai HMAC sebagai bukti bahwa pengirim tidak bisa menyangkal pesannya.',
      kenapa: 'Kunci HMAC dipegang kedua pihak, sehingga penerima juga mampu membuat tag yang sah. Karena itu tag tersebut tidak bisa membedakan pesan yang dibuat pengirim dari pesan yang dibuat penerima.',
      benar: 'Pakai tanda tangan digital dengan kunci privat yang hanya dipegang pengirim bila sifat tidak bisa disangkal dibutuhkan.'
    },
    {
      salah: 'Mengenkripsi data dengan mode ECB karena tersedia dan paling sederhana.',
      kenapa: 'Mode ECB menyandikan setiap blok secara terpisah, sehingga blok masukan yang sama selalu menghasilkan blok sandi yang sama. Pola dalam data tetap terlihat setelah dienkripsi, dan penyerang bisa menyusun ulang atau mengganti blok tanpa mengetahui kuncinya.',
      benar: 'Pakai mode terautentikasi seperti AES-GCM lewat antarmuka pustaka tingkat tinggi yang tidak menawarkan ECB sebagai pilihan.'
    }
  ],

  analogi: `Bayangkan tiga alat berbeda di sebuah kantor pos, dan orang sering memakai yang satu untuk pekerjaan yang lain.

**Alat pertama: kotak berkunci.** Kamu memasukkan surat, menguncinya, dan mengirimkannya. Penerima harus punya **kunci yang sama** untuk membukanya.

Itu enkripsi simetris. Cepat, praktis, dan punya satu masalah besar: **bagaimana kuncinya sampai ke penerima?** Kalau dikirim lewat pos yang sama, siapa pun yang bisa mencuri surat juga bisa mencuri kunci.

Dan masalahnya membesar dengan cepat. Untuk berkirim rahasia dengan 100 orang, kamu butuh 100 kunci berbeda — dan masing-masing harus diserahkan langsung, bertemu muka.

**Alat kedua: kotak surat berlubang.** Siapa pun bisa memasukkan surat lewat lubangnya. Hanya pemiliknya yang punya kunci untuk **mengeluarkannya**.

Itu enkripsi asimetris. Lubangnya boleh dipasang di jalan dan diberitahukan ke semua orang — itu kunci publik. Kunci pengeluarnya cuma satu, dipegang pemiliknya — itu kunci privat.

Masalah pengiriman kunci hilang seluruhnya. Kelemahannya: memasukkan surat lewat lubang itu **lambat dan cuma untuk surat kecil**.

Jadi yang dilakukan di kenyataan: kamu masukkan **kunci kotak berkunci** lewat lubang itu. Sesudah penerima punya kuncinya, kalian berkirim paket besar dengan kotak berkunci yang cepat.

Itu persis cara kerja setiap halaman \`https\` yang kamu buka.

**Alat ketiga: segel lilin.**

Segel tidak menyembunyikan apa pun. Suratnya masih bisa dibaca siapa saja yang membukanya. Yang dilakukan segel: menunjukkan **apakah surat sudah dibuka**.

Itu hash. Ia bukan enkripsi, dan tidak pernah bermaksud jadi enkripsi.

Sekarang perhatikan sesuatu yang penting tentang segel biasa: **siapa pun bisa membeli lilin.** Orang yang membuka suratmu bisa menyegelnya kembali dengan lilin yang sama.

Jadi segel biasa cuma melindungi terhadap **kecelakaan**, bukan terhadap orang yang berniat.

Kecuali kalau segelnya dibuat dengan **cincin cap yang hanya kamu miliki**. Sekarang segel itu tidak cuma menunjukkan surat belum dibuka — ia menunjukkan **kamu** yang mengirimnya.

Itu tanda tangan digital.

Dan versi di tengah: kamu dan penerima punya **cincin cap yang sama**. Cukup untuk memastikan surat datang dari salah satu dari kalian dua, tetapi kalau nanti ada perselisihan, kamu tidak bisa membuktikan bukan penerima yang membuatnya sendiri.

Itu HMAC.

**Terakhir, soal merancang sendiri.**

Bayangkan kamu punya cara sendiri: setiap huruf digeser sesuai satu kata sandi yang berulang. Kamu mengujinya, dan hasilnya terlihat seperti sampah — tidak ada satu kata pun yang bisa dibaca.

Lalu kamu mengirim **dua** surat dengan kata sandi yang sama.

Seseorang yang punya kedua surat itu menumpuknya dan membandingkan huruf per huruf. Kata sandinya **lenyap dari perbandingan itu**, karena ia sama pada keduanya. Yang tersisa: hubungan antara surat pertama dan surat kedua.

Dan karena surat manusia selalu punya bagian yang bisa diduga — "Kepada", "Hormat saya", nama bulan — ia mulai dari situ, lalu merambat.

Kedua suratmu terbaca, dan ia tidak pernah tahu kata sandimu.

Yang menyesatkan: hasil ujimu tadi **benar**. Satu surat memang tidak bisa dibaca. Kelemahannya cuma muncul pada surat **kedua**, dan tidak ada cara menemukannya dengan menguji seperti kamu menguji.

Itu bentuk khas kesalahan kripto: **ia tidak muncul pada pengujian, ia muncul pada pemakaian.**`,

  latihan: [
    'Hitung SHA-256 dari tiga masukan berpanjang sangat berbeda, lalu jelaskan akibat panjang keluaran yang selalu sama.',
    'Ambil dua kata yang beda satu huruf, lalu hitung berapa bit hash-nya berbeda dan bandingkan dengan 128.',
    'Jelaskan bagaimana penyerang bisa memakai teknik pendakian bukit bila fungsi hash tidak punya efek longsor.',
    'Hitung berapa banyak berkas satu kilobyte yang berbeda memetakan ke satu nilai hash 256 bit, lalu jelaskan artinya bagi gagasan membalik hash.',
    'Simulasikan basis data empat pengguna dengan kata sandi berulang, lalu tunjukkan hash identiknya tanpa garam dan hilangnya dengan garam.',
    'Ganti hash cepat di satu aplikasimu dengan PBKDF2 berputaran tinggi, lalu ukur berapa lama satu verifikasi memakan waktu.',
    'Untuk satu pesan yang sama, hitung hash, HMAC, dan jelaskan apa yang dijamin masing-masing serta apa yang tidak.',
    'Jelaskan kenapa HMAC tidak bisa dipakai membantah pengiriman, lalu sebutkan satu kasus nyata di mana sifat itu penting.',
    'Sandikan dua pesan dengan kunci XOR yang sama, lalu pecahkan pesan kedua dengan menebak pesan pertama.',
    'Cari satu contoh pemakaian pustaka kripto yang benar tetapi keputusannya salah, seperti nonce berulang atau mode ECB, lalu jelaskan akibatnya.'
  ]
});


TOPICS.push({
  id: 'kaminfo-identitas',
  judul: 'Identitas & Hak Akses: Kata Sandi, MFA, Peran',
  kategori: 'kaminfo',
  tag: ['autentikasi', 'entropi kata sandi', 'MFA', 'token sesi', 'RBAC', 'siklus hidup akses'],
  ringkas: 'Empat kata acak yang mudah diingat lebih kuat daripada enam karakter rumit yang sulit diingat.',

  fungsi: `**Menentukan siapa yang boleh masuk, dengan bukti apa, dan boleh melakukan apa setelah masuk.**

Terpakai di:

- **Setiap aplikasi** yang punya halaman masuk — dan hampir semua keputusan pentingnya diambil sekali, di awal, lalu sulit diubah
- **Menentukan aturan kata sandi** yang benar-benar menambah keamanan, bukan yang cuma menambah kerepotan
- **Membangkitkan token sesi** yang tidak bisa ditebak — kesalahan di sini membuka seluruh akun tanpa satu pun kata sandi dibobol
- **Merancang peran** pada sistem multipengguna, dan tahu kapan peran lebih baik daripada izin per orang
- **Meninjau hak akses** di organisasi — pekerjaan yang tidak ada yang meminta dan selalu berbuah

Yang paling berlawanan dengan naluri: **aturan "harus ada simbol dan angka" jauh lebih lemah daripada aturan "minimal empat kata".** Entropi tumbuh dari panjang dikali logaritma ragamnya, sehingga menambah panjang jauh lebih murah daripada menambah ragam karakter.

Dan keputusan yang paling menentukan bukan aturan kata sandinya, melainkan **cara menyimpannya**. Beralih dari SHA-256 ke bcrypt memperlambat penyerang **sepuluh juta kali**; mewajibkan satu simbol tambahan memperlambatnya beberapa kali saja.`,
  praktik: {
    tujuan: 'Kamu bisa menghitung entropi dan waktu pecah kata sandi, memilih cara penyimpanan berdasarkan angka, membangkitkan token sesi yang layak, dan menyusun peran beserta peninjauan berkalanya.',
    alat: ['Python untuk hitungan entropi dan waktu pecah', 'Satu aplikasi berhalaman masuk yang kamu punya kodenya', 'Daftar pengguna dan izinnya'],
    langkah: [
      { judul: 'Periksa apakah faktor kedua di sistemmu benar-benar faktor kedua',
        isi: `Kalau ada, tanyakan jenisnya. Kata sandi ditambah **pertanyaan rahasia** bukan MFA — keduanya "sesuatu yang diketahui", dan keduanya bocor dari kebocoran basis data yang sama.

MFA berarti faktor dari **jenis berbeda**: sesuatu yang diketahui, sesuatu yang dimiliki, atau sesuatu yang melekat.` },
      { judul: 'Hitung entropi beberapa kata sandi nyata',
        isi: `Pakai \`panjang x log2(ragam)\`. Hitung untuk satu kata sandi rumit-pendek dan satu rangkaian empat kata acak.

Hasilnya biasanya mengejutkan, dan itu bagian yang mendidik: yang rumit-pendek kalah. Setelah melihat angkanya, aturan kata sandi yang kamu tulis akan berubah.` },
      { judul: 'Hitung waktu pecah untuk tiga cara penyimpanan',
        isi: `Pakai laju tebakan yang masuk akal: sekitar 100 miliar per detik untuk SHA-256 di GPU, sekitar 10 ribu per detik untuk bcrypt.

Bandingkan hasilnya untuk kata sandi yang sama. Selisihnya sepuluh juta kali, dan itu keputusan yang **kamu** ambil sebagai pengembang — bukan keputusan pengguna.` },
      { judul: 'Ganti penyimpanan kata sandi di satu aplikasimu',
        isi: `Beralih ke bcrypt, Argon2, atau \`hashlib.pbkdf2_hmac\` berputaran ratusan ribu, dengan garam acak per pengguna.

Lalu ukur waktu satu verifikasi. Kalau di bawah sekitar 100 milidetik, putarannya masih bisa dinaikkan — dan menaikkannya adalah cara termurah menambah keamanan yang kamu punya.` },
      { judul: 'Uji kekuatan token sesimu',
        isi: `Cari tahu berapa **byte** token sesi di aplikasimu, dan dari mana keacakannya.

Panjang saja tidak cukup: token 32 byte yang dibangkitkan dari waktu sistem atau dari \`rand()\` biasa bisa dihitung ulang penyerang tanpa satu pun tebakan acak. Pakai sumber kriptografis.` },
      { judul: 'Susun peran, lalu hitung apa yang harus disunting saat kebijakan berubah',
        isi: `Bandingkan dua rancangan: izin diberikan langsung per pengguna, atau lewat beberapa peran.

Yang menentukan bukan jumlah pemberian izinnya, melainkan: **kalau satu aturan berubah, berapa tempat yang harus disunting?** Tanpa peran, jawabannya sebanyak penggunanya — dan yang terlewat tidak akan ada yang tahu.` },
      { judul: 'Petakan siklus hidup akses di organisasimu',
        isi: `Untuk lima tahap — masuk, pindah bagian, naik jabatan, cuti panjang, keluar — tulis apa yang **seharusnya** terjadi dan apa yang **benar-benar** terjadi.

Tahap pertama hampir selalu jalan. Yang lain hampir selalu tidak, dan sebabnya satu: memberi akses selalu ada yang meminta, mencabut tidak ada.` },
      { judul: 'Pasang kedaluwarsa, lalu jadwalkan peninjauan',
        isi: `Untuk akses yang sifatnya sementara, pasang tanggal kedaluwarsa sejak diberikan. Hak yang mati sendiri tidak butuh siapa pun mengingat mencabutnya.

Untuk sisanya, jadwalkan peninjauan berkala yang **jalan meski tidak ada yang meminta** — karena memang tidak akan ada yang meminta.` }
    ],
    cek: [
      'Aturan kata sandi di aplikasimu mengutamakan panjang, bukan keragaman karakter',
      'Kata sandi disimpan dengan fungsi berbiaya tinggi, dan kamu tahu berapa lama satu verifikasi memakan waktu',
      'Token sesimu minimal 16 byte dan berasal dari sumber acak kriptografis',
      'Ada akses di sistemmu yang kedaluwarsa sendiri, dan ada jadwal peninjauan yang tertulis'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — entropi, dan apa yang tersisa setelah kata sandi bocor',

  konsep: `Autentikasi adalah tempat di mana keputusan teknis kecil punya akibat yang sangat besar, dan di mana naluri paling sering menyesatkan.

**Tiga faktor**

| Faktor | Contoh | Sifatnya |
|---|---|---|
| Sesuatu yang **diketahui** | kata sandi, PIN, jawaban rahasia | bisa dicuri tanpa korban sadar |
| Sesuatu yang **dimiliki** | ponsel, token, kunci keamanan | hilangnya terasa, jadi cepat dilaporkan |
| Sesuatu yang **melekat** | sidik jari, wajah, suara | tidak bisa diganti kalau bocor |

MFA berarti faktor dari **jenis berbeda**. Kata sandi ditambah pertanyaan rahasia bukan MFA — keduanya "sesuatu yang diketahui", dan keduanya bocor dari kebocoran basis data yang sama.

Perhatikan sifat faktor ketiga, karena ia sering dipuji tanpa syarat: **sidik jari tidak bisa diganti.** Kata sandi yang bocor diganti dalam semenit; sidik jari yang bocor bocor selamanya.

Karena itu biometrik lebih cocok sebagai **pembuka kunci lokal** — membuka penyimpanan kredensial di perangkatmu sendiri — daripada sebagai kata sandi yang dikirim ke peladen.

**Entropi: mengukur kekuatan kata sandi**

\`bit = panjang x log2(ragam karakter)\`

| Kata sandi | Bit | Keterangan |
|---|---|---|
| kucing | 28 | huruf kecil saja |
| Kucing1 | 42 | campur huruf besar + angka |
| Gg7!x9 | 39 | campur + simbol |
| Gg7!x9Zq2# | 66 | campur + simbol |
| empat kata acak | 52 | dari daftar 7.776 kata |
| enam kata acak | 78 | dari daftar 7.776 kata |

Dua baris yang mengubah cara menulis aturan kata sandi:

- \`Gg7!x9\` — enam karakter rumit, sulit diingat, harus dicatat: **39 bit**
- **empat kata acak** — mudah diingat, mudah diketik: **52 bit**

Yang mudah diingat lebih kuat.

Sebabnya ada di bentuk rumusnya. Entropi tumbuh **lurus terhadap panjang**, tetapi cuma **logaritmik terhadap ragam**. Menambah simbol menaikkan ragam dari 62 ke 94 — dan \`log2\` dari keduanya cuma berbeda 0,6 bit per karakter. Menambah satu karakter menaikkan seluruh \`log2(ragam)\`, sekitar 6 bit.

Jadi satu karakter tambahan mengalahkan seluruh tambahan simbol.

Ada satu syarat yang harus jujur disebut: **kata-katanya harus benar-benar dipilih acak** dari daftar. "kucing makan nasi goreng" bukan empat kata acak — ia satu frasa yang mungkin muncul di korpus mana pun, dan entropinya jauh di bawah 52 bit.

**Waktu pecah: penyimpanan menentukan segalanya**

Laju tebakan yang masuk akal:

| Cara penyimpanan | Tebakan per detik |
|---|---|
| SHA-256 tanpa garam, di GPU | 100 miliar |
| SHA-256 **dengan** garam, di GPU | 100 miliar |
| bcrypt / PBKDF2 600 ribu putaran | 10 ribu |

Waktu pecah kata sandi 39 bit:

| Penyimpanan | Waktu |
|---|---|
| SHA-256 | 3 detik |
| bcrypt | 318 hari |

Perhatikan dua baris pertama tabel laju: **lajunya sama.** Garam tidak memperlambat pemecahan satu kata sandi sedikit pun.

Ini sering mengejutkan, dan penting dipahami dengan benar. Garam punya tugas lain: membuat satu tebakan **tidak bisa dipakai untuk seluruh pengguna sekaligus**, dan mematikan tabel hash siap pakai. Keduanya berharga, dan keduanya bukan "memperlambat".

Yang memperlambat adalah fungsi yang **sengaja dibuat lambat**. Turun dari 100 miliar ke 10 ribu tebakan per detik adalah **sepuluh juta kali lipat**.

Dari sini keluar satu urutan prioritas yang jarang diikuti: **memilih bcrypt atau Argon2 jauh lebih menentukan daripada mewajibkan simbol pada kata sandi pengguna.** Yang pertama keputusanmu sebagai pengembang, sekali, dan berlaku untuk semua pengguna. Yang kedua membebani setiap pengguna setiap hari, dan menghasilkan beberapa bit.

**MFA: apa yang sebenarnya dicegah**

Andaikan penyerang **sudah** punya kata sandi yang benar — dari kebocoran situs lain, dari phishing, dari pemakaian ulang. Dari 10.000 percobaan masuk:

| Kendali | Berhasil | Catatan |
|---|---|---|
| Kata sandi saja | 10.000 | bocor berarti akun terbuka |
| Kata sandi + SMS OTP | 500 | bisa lewat SIM swap |
| Kata sandi + aplikasi TOTP | 200 | harus dijebak waktu nyata |
| Kata sandi + kunci FIDO2 | 10 | terikat domain, phishing gagal |

Perhatikan andaian di judulnya: kata sandinya **sudah** benar. Jadi tabel ini bukan tentang kekuatan kata sandi — ia tentang **apa yang tersisa setelah kata sandi gagal**.

Dan itu cara yang benar menilai MFA: bukan sebagai tambahan kerepotan, melainkan sebagai satu-satunya kendali yang **masih bekerja** setelah kebocoran.

Baris terakhir layak diperhatikan sendiri. Kunci FIDO2 lebih baik bukan karena kriptografinya lebih kuat, melainkan karena ia **terikat ke domain**: kunci itu menolak menandatangani untuk situs palsu, meski penggunanya tertipu sepenuhnya dan menekan tombolnya sendiri.

Itu bentuk kendali terbaik — yang tetap bekerja **ketika manusianya salah**.

**Token sesi: entropi juga berlaku di sini**

Setelah masuk, pengguna tidak mengirim kata sandinya lagi. Ia memegang **token**, dan token itu setara kata sandi selama sesinya.

Dengan penyerang menebak sejuta token per detik:

| Panjang | Bit | Waktu tebak rata-rata |
|---|---|---|
| 4 byte | 32 | 36 menit |
| 8 byte | 64 | 292.471 tahun |
| 16 byte | 128 | 10^25 tahun |

Token 4 byte bisa ditebak sambil menunggu. Token 16 byte tidak akan pernah.

Tetapi panjang cuma **separuh** syaratnya. Token 32 byte yang dibangkitkan dari waktu sistem atau dari \`rand()\` biasa bisa ditebak **tanpa satu pun tebakan acak** — penyerang cukup menghitung ulang urutan pembangkitnya, karena pembangkit acak biasa bersifat menentukan penuh dari benihnya.

Jadi dua syaratnya: **cukup panjang**, dan berasal dari **sumber acak kriptografis**.

**Peran, bukan izin per orang**

Dengan 40 jenis izin dan 6 peran:

| Pengguna | Izin diberikan langsung | Lewat peran |
|---|---|---|
| 10 | 400 | 250 |
| 200 | 8.000 | 440 |
| 1.000 | 40.000 | 1.240 |

Tetapi angka itu bukan intinya. Intinya: **apa yang harus diperiksa saat kebijakan berubah?**

Tanpa peran, mengubah satu aturan berarti menyunting seribu pengguna satu per satu — dan yang terlewat **tidak akan ada yang tahu**, karena tidak ada tempat yang bisa dibaca untuk memeriksanya.

Dengan peran, satu peran disunting dan seluruh pemegangnya ikut berubah. Dan daftar enam peran cukup pendek untuk **benar-benar dibaca orang** — yang merupakan syarat agar kebijakannya bisa diperiksa sama sekali.

**Siklus hidup akses**

| Tahap | Seharusnya | Kenyataannya |
|---|---|---|
| Masuk kerja | akun dibuat, peran diberikan | hampir selalu jalan |
| Pindah bagian | peran lama dicabut, baru diberi | yang lama sering tertinggal |
| Naik jabatan | peran ditambah | yang lama nyaris tak pernah dicabut |
| Cuti panjang | akun dinonaktifkan sementara | hampir tidak pernah dilakukan |
| Keluar kerja | seluruh akses dimatikan hari itu | sering tertunda berbulan |

Satu pola menjelaskan seluruh kolom terakhir: **memberi akses selalu ada yang meminta, mencabut tidak ada.**

Permintaan memberi datang dengan alasan mendesak dan biasanya benar — pekerjaan tertahan, pelanggan menunggu. Permintaan mencabut tidak pernah datang, karena tidak ada yang dirugikan oleh akses yang terlalu luas kecuali organisasinya sendiri, dan organisasi tidak mengirim surel.

Akibatnya hak **menumpuk** sepanjang karier seseorang. Setelah lima tahun, seorang staf biasa bisa punya akses ke sistem dari tiga bagian yang sudah lama ia tinggalkan.

Yang memperbaikinya cuma dua, dan keduanya harus dipasang sengaja: **akses yang kedaluwarsa sendiri**, dan **peninjauan berkala yang dijadwalkan** dan jalan meski tidak ada yang memintanya.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\n\ndef entropi(panjang, ragam):\n    return panjang * math.log2(ragam)\n\nentropi(6, 94)      # Gg7!x9        -> 39 bit\nentropi(4, 7776)    # empat kata    -> 52 bit\nentropi(10, 94)     # Gg7!x9Zq2#   -> 66 bit\n\n# Yang MUDAH diingat lebih kuat.\n#\n# Sebabnya bentuk rumusnya:\n#   panjang  masuk LURUS\n#   ragam    masuk lewat LOGARITMA\n#\n# log2(62) = 5,95   log2(94) = 6,55   selisih 0,6 bit/karakter\n# menambah satu karakter menambah ~6 bit",
      penjelasan: `Satu rumus yang, kalau dipahami bentuknya, langsung membatalkan hampir semua aturan kata sandi yang dipakai di dunia.

Mulai dari asal rumusnya. Kalau ada \`r\` pilihan untuk setiap posisi dan ada \`p\` posisi, maka jumlah kemungkinan seluruhnya \`r^p\`. Diambil logaritma basis dua untuk menyatakannya dalam bit, hasilnya \`p x log2(r)\`.

Sekarang perhatikan letak kedua variabelnya, karena di situ seluruh isi pelajarannya:

- **panjang** ada di luar logaritma — masuk **lurus**
- **ragam** ada di dalam logaritma — masuk **teredam**

Dan logaritma meredam dengan sangat kuat. Bandingkan:

- huruf kecil saja: \`log2(26) = 4,7\` bit per karakter
- huruf besar-kecil + angka: \`log2(62) = 5,95\` bit per karakter
- ditambah simbol: \`log2(94) = 6,55\` bit per karakter

Menambah **seluruh** simbol pada papan ketik — dari 62 menjadi 94 pilihan — menghasilkan **0,6 bit per karakter**.

Menambah **satu karakter** menghasilkan sekitar 6 bit.

Jadi satu karakter tambahan bernilai sepuluh kali seluruh tambahan simbol.

**Sekarang akibatnya pada aturan kata sandi yang lazim.**

Aturan "minimal 8 karakter, harus ada huruf besar, angka, dan simbol" memberi paling banyak \`8 x 6,55 = 52\` bit — dan itu kalau penggunanya memilih benar-benar acak.

Yang terjadi di kenyataan: orang tidak memilih acak. Diminta huruf besar, ia menaruhnya di **depan**. Diminta angka, ia menaruhnya di **belakang**. Diminta simbol, ia memakai **tanda seru**.

\`Password1!\` memenuhi seluruh aturan itu, dan ada di setiap daftar kata sandi bocor yang pernah dibuat. Entropi sesungguhnya hampir nol.

Jadi aturan itu tidak menghasilkan 52 bit. Ia menghasilkan beberapa bit, **plus** kepastian bahwa penggunanya akan menuliskan kata sandinya di catatan tempel.

**Bandingkan dengan aturan "minimal empat kata acak".**

Dari daftar 7.776 kata — angka itu bukan sembarang, ia \`6^5\`, jumlah kombinasi lima lemparan dadu, sehingga kata-katanya bisa dipilih dengan dadu sungguhan tanpa mempercayai satu pun komputer:

\`4 x log2(7776) = 4 x 12,9 = 52 bit\`

Sama besar dengan aturan rumit tadi **pada kertas**, dan jauh lebih besar **pada kenyataan** — karena keacakannya nyata, bukan bergantung pada pengguna berperilaku seperti pembangkit acak.

Dan ia bisa diingat. Empat kata bisa dibayangkan sebagai satu gambar aneh, dan gambar aneh sangat awet di ingatan manusia. Kata sandi yang bisa diingat tidak dituliskan, tidak dipakai ulang, dan tidak diganti dengan versi lebih lemah saat harus diperbarui.

**Satu syarat yang harus jujur disebut.**

Angka 52 bit hanya sah kalau kata-katanya **benar-benar dipilih acak dari daftar**. "kucing makan nasi goreng" bukan empat kata acak — ia satu frasa yang bisa muncul di korpus mana pun, dan entropinya jauh di bawahnya.

Yang menentukan bukan bentuknya seperti empat kata. Yang menentukan **cara memilihnya**: dadu, atau pembangkit acak, dan penggunanya menerima hasilnya apa pun itu.

**Terakhir, batas kegunaan seluruh perhitungan ini.**

Entropi mengukur ketahanan terhadap **penebakan**. Ia sama sekali tidak melindungi terhadap kata sandi yang **bocor** — dari kebocoran situs lain, dari phishing, dari perangkat yang terinfeksi.

Kata sandi 78 bit yang diketik ke situs palsu sama tidak bergunanya dengan kata sandi 20 bit.

Itu sebabnya topik ini tidak berhenti di entropi. Yang menahan setelah kata sandi bocor bukan panjangnya — melainkan **MFA**, dan itu jenis kendali yang sama sekali berbeda.`
    },
    {
      bahasa: 'python',
      kode: "# ANDAIAN: kata sandinya SUDAH benar (bocor dari situs lain)\n# 10.000 percobaan masuk\n#\n#   kendali                      berhasil\n#   Kata sandi saja                10.000\n#   Kata sandi + SMS OTP              500\n#   Kata sandi + aplikasi TOTP        200\n#   Kata sandi + kunci FIDO2           10\n#\n# TOKEN SESI, sejuta tebakan/detik:\n#    4 byte / 32 bit   ->  36 menit\n#    8 byte / 64 bit   ->  292.471 tahun\n#   16 byte / 128 bit  ->  10^25 tahun\n#\n# Panjang cuma separuh syarat. Sumber acaknya harus\n# KRIPTOGRAFIS -- rand() biasa bisa dihitung ulang.",
      penjelasan: `Dua tabel yang menutup dua celah paling umum pada aplikasi yang kata sandinya sudah ditangani dengan benar.

**Tabel pertama: apa yang tersisa setelah kata sandi gagal.**

Perhatikan andaiannya, karena ia yang membuat tabel ini berguna: kata sandinya **sudah benar**. Bukan ditebak — dimiliki.

Dan itu bukan andaian yang mengada-ada. Kata sandi bocor lewat tiga jalur yang semuanya berada di **luar** kendali aplikasimu:

- **pemakaian ulang** — pengguna memakai kata sandi yang sama di situs lain yang bocor
- **phishing** — pengguna mengetiknya sendiri di halaman palsu
- **perangkat terinfeksi** — perekam ketikan mengambilnya saat diketik

Tidak satu pun dari ketiganya bisa dicegah oleh aturan kata sandi, oleh bcrypt, atau oleh apa pun yang kamu tulis di peladen. Kata sandi 78 bit sama tidak bergunanya begitu ia bocor.

Jadi pertanyaannya bukan lagi seberapa kuat kata sandimu. Pertanyaannya: **apa yang berdiri di sana setelah kata sandi gagal?**

Tanpa MFA: tidak ada. Sepuluh ribu percobaan, sepuluh ribu berhasil.

**Sekarang kenapa keempat baris itu berbeda, karena bedanya bukan soal kekuatan kriptografi.**

**SMS OTP** menahan hampir semuanya, dan itu sudah sangat berharga — dari 10.000 tinggal 500. Kelemahannya pada jalurnya: nomor telepon bisa dipindahkan penyerang ke SIM-nya sendiri lewat gerai operator, dan kode SMS bisa dimintakan lewat halaman phishing yang meneruskannya ke situs asli secara langsung.

**Aplikasi TOTP** menutup jalur SIM swap, karena benihnya ada di perangkat dan tidak melewati operator mana pun. Tetapi ia masih bisa dijebak waktu nyata: halaman palsu meminta kodenya, meneruskannya dalam tiga puluh detik, dan masuk.

**Kunci FIDO2** menutup jalur itu juga — dan cara ia menutupnya adalah bagian paling instruktif dari seluruh tabel.

Kunci itu **terikat ke domain**. Ia menandatangani tantangan bersama nama domain yang meminta, jadi tanda tangan untuk \`bank-palsu.com\` tidak berlaku di \`bank.com\`. Halaman palsu bisa meminta apa pun; yang keluar dari kuncinya tidak berguna di tempat yang dituju penyerang.

Perhatikan apa yang **tidak** dituntutnya: pengguna tidak perlu memeriksa alamat situs, tidak perlu curiga, tidak perlu berhati-hati. Ia boleh tertipu sepenuhnya dan menekan tombolnya sendiri, dan serangannya tetap gagal.

Ini bentuk kendali terbaik yang bisa dirancang: **yang tetap bekerja ketika manusianya salah.** Kendali yang menuntut manusia berhati-hati akan gagal secara berkala, karena manusia berhati-hati secara berkala.

**Tabel kedua: token sesi, celah yang sering luput.**

Setelah masuk, pengguna tidak mengirim kata sandinya lagi. Ia memegang token, dan **token itu setara kata sandi** selama sesinya berlaku.

Jadi seluruh pekerjaan pada bcrypt dan MFA menjadi tidak berarti kalau tokennya bisa ditebak.

Angkanya jelas: 4 byte bisa ditebak dalam 36 menit, 16 byte tidak akan pernah. Jadi ambil 16 byte atau lebih, dan itu bagian yang mudah.

Bagian yang sulit ada di baris terakhir, dan ia menjebak banyak orang justru karena tidak terlihat: **panjang tidak cukup.**

Pembangkit acak biasa — \`random\` di Python, \`Math.random()\` di JavaScript, \`rand()\` di C — bersifat **menentukan penuh** dari benihnya. Ia dirancang untuk simulasi dan permainan, bukan untuk rahasia. Barisan keluarannya bisa dihitung ulang seluruhnya oleh siapa pun yang mengetahui benihnya, dan benih yang lazim dipakai adalah **waktu sistem**.

Waktu sistem punya ruang kemungkinan yang sangat kecil. Kalau penyerang tahu sesinya dibuat pada detik tertentu, ia cuma perlu mencoba beberapa ribu benih — bukan \`2^128\`.

Token 32 byte dari pembangkit seperti itu **tidak lebih kuat** daripada token 2 byte dari pembangkit yang benar. Panjangnya cuma hiasan.

Yang benar: \`secrets\` di Python, \`crypto.randomBytes\` di Node, \`SecureRandom\` di Java. Semuanya mengambil dari sumber entropi sistem operasi, dan semuanya tidak bisa dihitung ulang dari luar.

Perbedaan antara \`random\` dan \`secrets\` adalah satu kata pada satu baris impor. Dan itu selisih antara token yang tidak akan pernah ditebak dan token yang bisa dihitung dalam hitungan detik.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Identitas & akses: kata sandi, MFA, peran
# ============================================
import math

# --------------------------------------------
# 1. Tiga faktor, dan kenapa harus beda jenis
# --------------------------------------------
print("--- tiga faktor autentikasi ---")
FAKTOR = [
    ("Sesuatu yang DIKETAHUI", "kata sandi, PIN, jawaban rahasia",
     "bisa dicuri tanpa korban sadar"),
    ("Sesuatu yang DIMILIKI", "ponsel, token, kunci keamanan",
     "hilangnya terasa, jadi cepat dilaporkan"),
    ("Sesuatu yang MELEKAT", "sidik jari, wajah, suara",
     "tidak bisa diganti kalau bocor"),
]
for nama, contoh, catat in FAKTOR:
    print("  " + nama)
    print("      contoh : " + contoh)
    print("      sifat  : " + catat)
print("")
print("  MFA berarti faktor dari JENIS BERBEDA. Kata sandi plus")
print("  jawaban pertanyaan rahasia bukan MFA -- keduanya")
print("  'sesuatu yang diketahui', dan keduanya bocor dari")
print("  kebocoran basis data yang sama.")
print("")
print("  Perhatikan faktor ketiga: sidik jari tidak bisa diganti.")
print("  Kalau cetakannya bocor, ia bocor selamanya. Karena itu")
print("  biometrik lebih cocok sebagai pembuka KUNCI LOKAL")
print("  daripada sebagai kata sandi yang dikirim ke peladen.")

# --------------------------------------------
# 2. Kekuatan kata sandi diukur dengan bit
# --------------------------------------------
print("")
print("--- entropi: mengukur kekuatan kata sandi ---")
def entropi(panjang, ragam):
    return panjang * math.log2(ragam)

SANDI = [
    ("kucing",             6,  26,  "huruf kecil saja"),
    ("Kucing1",            7,  62,  "campur + angka"),
    ("Gg7!x9",             6,  94,  "campur + simbol"),
    ("Gg7!x9Zq2#",        10,  94,  "campur + simbol"),
    ("empat kata acak",    4, 7776, "dari daftar 7.776 kata"),
    ("enam kata acak",     6, 7776, "dari daftar 7.776 kata"),
]
print("  " + "kata sandi".ljust(18) + "bit".rjust(6)
      + "  keterangan")
for nama, p, r, ket in SANDI:
    print("  " + nama.ljust(18) + ("%.0f" % entropi(p, r)).rjust(6)
          + "  " + ket)
print("")
print("  Perhatikan dua baris yang mengejutkan:")
print("    Gg7!x9      (6 karakter rumit) ->  "
      + ("%.0f" % entropi(6, 94)) + " bit")
print("    empat kata acak               ->  "
      + ("%.0f" % entropi(4, 7776)) + " bit")
print("")
print("  Empat kata acak yang mudah diingat lebih kuat daripada")
print("  enam karakter rumit yang sulit diingat.")
print("")
print("  Sebabnya: entropi tumbuh dari PANJANG dikali logaritma")
print("  ragamnya. Menambah panjang jauh lebih murah daripada")
print("  menambah ragam karakter.")

# --------------------------------------------
# 3. Berapa lama dipecahkan
# --------------------------------------------
print("")
print("--- waktu pecah: cara penyimpanan menentukan segalanya ---")
LAJU = [
    ("SHA-256 tanpa garam, GPU",      1e11, "100 miliar"),
    ("SHA-256 dengan garam, GPU",     1e11, "100 miliar"),
    ("bcrypt / PBKDF2 600rb putaran", 1e4,  "10 ribu"),
]
def titik(n):
    return f"{int(n):,}".replace(",", ".")

def lama(bit, laju):
    detik = (2 ** bit) / 2 / laju        # rata-rata separuh ruang
    if detik < 1:
        return "di bawah 1 detik"
    if detik < 60:
        return "%.0f detik" % detik
    if detik < 3600:
        return "%.0f menit" % (detik / 60)
    if detik < 86400:
        return "%.0f jam" % (detik / 3600)
    if detik < 86400 * 365:
        return "%.0f hari" % (detik / 86400)
    tahun = detik / 86400 / 365
    if tahun < 1e6:
        return titik(round(tahun)) + " tahun"
    return "10^" + ("%.0f" % math.log10(tahun)) + " tahun"

UJI = [("kucing", 28), ("Gg7!x9", 39), ("Gg7!x9Zq2#", 66),
       ("empat kata acak", 52)]
for nama, laju, sebut_laju in LAJU:
    print("")
    print("  " + nama)
    print("      (" + sebut_laju + " tebakan per detik)")
    for sandi, bit in UJI:
        print("      " + sandi.ljust(18) + str(bit).rjust(3)
              + " bit  ->  " + lama(bit, laju))
print("")
print("  Baris pertama dan kedua LAJUNYA SAMA. Garam tidak")
print("  memperlambat pemecahan satu kata sandi sama sekali --")
print("  gunanya membuat satu tebakan tidak bisa dipakai untuk")
print("  seluruh pengguna sekaligus.")
print("")
print("  Yang memperlambat: fungsi hash yang SENGAJA dibuat")
print("  lambat. Turun dari 100 miliar jadi 10 ribu tebakan per")
print("  detik, dan itu sepuluh juta kali lipat.")
print("")
print("  Karena itu memilih bcrypt/Argon2 lebih menentukan")
print("  daripada mewajibkan simbol pada kata sandi pengguna.")

# --------------------------------------------
# 4. MFA: apa yang sebenarnya dicegah
# --------------------------------------------
print("")
print("--- MFA terhadap kata sandi yang sudah bocor ---")
SKENARIO = [
    ("Kata sandi saja", 1.00,
     "bocor = akun terbuka"),
    ("Kata sandi + SMS OTP", 0.05,
     "bisa lewat SIM swap"),
    ("Kata sandi + aplikasi TOTP", 0.02,
     "harus dijebak waktu nyata"),
    ("Kata sandi + kunci FIDO2", 0.001,
     "terikat domain, phishing gagal"),
]
PERCOBAAN = 10_000
print("  " + titik(PERCOBAAN)
      + " percobaan masuk dengan kata sandi yang SUDAH benar")
print("")
print("  " + "kendali".ljust(28) + "berhasil".rjust(9)
      + "  catatan")
for nama, sisa, catat in SKENARIO:
    print("  " + nama.ljust(28)
          + f"{int(PERCOBAAN * sisa):>9,}".replace(",", ".")
          + "  " + catat)
print("")
print("  Perhatikan andaian di judul: kata sandinya SUDAH benar.")
print("  Jadi tabel ini bukan tentang kekuatan kata sandi -- ia")
print("  tentang apa yang tersisa SESUDAH kata sandi gagal.")
print("")
print("  Dan itu cara yang benar menilai MFA: bukan sebagai")
print("  tambahan kerepotan, melainkan sebagai satu-satunya")
print("  kendali yang masih bekerja setelah kebocoran.")

# --------------------------------------------
# 5. Token sesi: entropi juga berlaku
# --------------------------------------------
print("")
print("--- token sesi: kenapa panjangnya penting ---")
TOKEN = [(4, "4 byte / 8 hex"), (8, "8 byte / 16 hex"),
         (16, "16 byte / 32 hex"), (32, "32 byte / 64 hex")]
LAJU_UJI = 1e6            # tebakan token per detik
print("  penyerang menebak token acak, sejuta tebakan/detik")
print("")
print("  " + "panjang".ljust(18) + "bit".rjust(5)
      + "waktu tebak rata-rata".rjust(24))
for bita, label in TOKEN:
    bit = bita * 8
    print("  " + label.ljust(18) + str(bit).rjust(5)
          + lama(bit, LAJU_UJI).rjust(24))
print("")
print("  Token 4 byte bisa ditebak dalam hitungan menit. Token")
print("  16 byte tidak akan pernah ditebak.")
print("")
print("  Tetapi PANJANG cuma separuh syaratnya. Token harus")
print("  berasal dari pembangkit acak KRIPTOGRAFIS. Token")
print("  sepanjang 32 byte yang dibuat dari waktu sistem atau")
print("  dari rand() biasa bisa ditebak tanpa satu pun tebakan")
print("  acak -- penyerang cukup menghitung ulang urutannya.")

# --------------------------------------------
# 6. RBAC: kenapa peran, bukan izin per orang
# --------------------------------------------
print("")
print("--- izin per orang vs peran ---")
IZIN = 40
print("  " + "pengguna".rjust(9) + "izin langsung".rjust(15)
      + "lewat 6 peran".rjust(15))
for n in (10, 50, 200, 1000):
    langsung = n * IZIN
    lewat_peran = n + 6 * IZIN
    print("  " + str(n).rjust(9)
          + f"{langsung:>15,}".replace(",", ".")
          + f"{lewat_peran:>15,}".replace(",", "."))
print("")
print("  " + str(IZIN) + " jenis izin, 6 peran.")
print("")
print("  Yang penting bukan angkanya, melainkan APA yang harus")
print("  diperiksa saat ada perubahan kebijakan.")
print("")
print("  Tanpa peran: mengubah satu aturan berarti menyunting")
print("  seribu pengguna satu per satu, dan yang terlewat tidak")
print("  akan ada yang tahu.")
print("")
print("  Dengan peran: satu peran disunting, seluruh pemegangnya")
print("  ikut berubah -- dan daftar peran cukup pendek untuk")
print("  benar-benar dibaca orang.")

# --------------------------------------------
# 7. Siklus hidup akses
# --------------------------------------------
print("")
print("--- siklus hidup yang sering putus di tengah ---")
SIKLUS = [
    ("Masuk kerja",    "akun dibuat, peran diberikan",
     "hampir selalu jalan"),
    ("Pindah bagian",  "peran lama DICABUT, peran baru diberi",
     "yang lama sering tertinggal"),
    ("Naik jabatan",   "peran ditambah",
     "yang lama nyaris tak pernah dicabut"),
    ("Cuti panjang",   "akun dinonaktifkan sementara",
     "hampir tidak pernah dilakukan"),
    ("Keluar kerja",   "seluruh akses dimatikan hari itu",
     "sering tertunda berbulan"),
]
for tahap, seharusnya, kenyataan in SIKLUS:
    print("  " + tahap.ljust(16) + seharusnya)
    print("      " + kenyataan)
print("")
print("  Pola yang sama muncul di semua tahap: MEMBERI akses")
print("  selalu ada yang meminta, MENCABUT tidak ada.")
print("")
print("  Akibatnya hak menumpuk sepanjang karier seseorang.")
print("  Setelah lima tahun, seorang staf biasa bisa punya")
print("  akses ke sistem dari tiga bagian yang sudah lama ia")
print("  tinggalkan.")
print("")
print("  Yang memperbaikinya cuma satu: peninjauan berkala yang")
print("  DIJADWALKAN dan jalan meski tidak ada yang meminta.")` },
  output: `--- tiga faktor autentikasi ---
  Sesuatu yang DIKETAHUI
      contoh : kata sandi, PIN, jawaban rahasia
      sifat  : bisa dicuri tanpa korban sadar
  Sesuatu yang DIMILIKI
      contoh : ponsel, token, kunci keamanan
      sifat  : hilangnya terasa, jadi cepat dilaporkan
  Sesuatu yang MELEKAT
      contoh : sidik jari, wajah, suara
      sifat  : tidak bisa diganti kalau bocor

  MFA berarti faktor dari JENIS BERBEDA. Kata sandi plus
  jawaban pertanyaan rahasia bukan MFA -- keduanya
  'sesuatu yang diketahui', dan keduanya bocor dari
  kebocoran basis data yang sama.

  Perhatikan faktor ketiga: sidik jari tidak bisa diganti.
  Kalau cetakannya bocor, ia bocor selamanya. Karena itu
  biometrik lebih cocok sebagai pembuka KUNCI LOKAL
  daripada sebagai kata sandi yang dikirim ke peladen.

--- entropi: mengukur kekuatan kata sandi ---
  kata sandi           bit  keterangan
  kucing                28  huruf kecil saja
  Kucing1               42  campur + angka
  Gg7!x9                39  campur + simbol
  Gg7!x9Zq2#            66  campur + simbol
  empat kata acak       52  dari daftar 7.776 kata
  enam kata acak        78  dari daftar 7.776 kata

  Perhatikan dua baris yang mengejutkan:
    Gg7!x9      (6 karakter rumit) ->  39 bit
    empat kata acak               ->  52 bit

  Empat kata acak yang mudah diingat lebih kuat daripada
  enam karakter rumit yang sulit diingat.

  Sebabnya: entropi tumbuh dari PANJANG dikali logaritma
  ragamnya. Menambah panjang jauh lebih murah daripada
  menambah ragam karakter.

--- waktu pecah: cara penyimpanan menentukan segalanya ---

  SHA-256 tanpa garam, GPU
      (100 miliar tebakan per detik)
      kucing             28 bit  ->  di bawah 1 detik
      Gg7!x9             39 bit  ->  3 detik
      Gg7!x9Zq2#         66 bit  ->  12 tahun
      empat kata acak    52 bit  ->  6 jam

  SHA-256 dengan garam, GPU
      (100 miliar tebakan per detik)
      kucing             28 bit  ->  di bawah 1 detik
      Gg7!x9             39 bit  ->  3 detik
      Gg7!x9Zq2#         66 bit  ->  12 tahun
      empat kata acak    52 bit  ->  6 jam

  bcrypt / PBKDF2 600rb putaran
      (10 ribu tebakan per detik)
      kucing             28 bit  ->  4 jam
      Gg7!x9             39 bit  ->  318 hari
      Gg7!x9Zq2#         66 bit  ->  10^8 tahun
      empat kata acak    52 bit  ->  7.140 tahun

  Baris pertama dan kedua LAJUNYA SAMA. Garam tidak
  memperlambat pemecahan satu kata sandi sama sekali --
  gunanya membuat satu tebakan tidak bisa dipakai untuk
  seluruh pengguna sekaligus.

  Yang memperlambat: fungsi hash yang SENGAJA dibuat
  lambat. Turun dari 100 miliar jadi 10 ribu tebakan per
  detik, dan itu sepuluh juta kali lipat.

  Karena itu memilih bcrypt/Argon2 lebih menentukan
  daripada mewajibkan simbol pada kata sandi pengguna.

--- MFA terhadap kata sandi yang sudah bocor ---
  10.000 percobaan masuk dengan kata sandi yang SUDAH benar

  kendali                      berhasil  catatan
  Kata sandi saja                10.000  bocor = akun terbuka
  Kata sandi + SMS OTP              500  bisa lewat SIM swap
  Kata sandi + aplikasi TOTP        200  harus dijebak waktu nyata
  Kata sandi + kunci FIDO2           10  terikat domain, phishing gagal

  Perhatikan andaian di judul: kata sandinya SUDAH benar.
  Jadi tabel ini bukan tentang kekuatan kata sandi -- ia
  tentang apa yang tersisa SESUDAH kata sandi gagal.

  Dan itu cara yang benar menilai MFA: bukan sebagai
  tambahan kerepotan, melainkan sebagai satu-satunya
  kendali yang masih bekerja setelah kebocoran.

--- token sesi: kenapa panjangnya penting ---
  penyerang menebak token acak, sejuta tebakan/detik

  panjang             bit   waktu tebak rata-rata
  4 byte / 8 hex       32                36 menit
  8 byte / 16 hex      64           292.471 tahun
  16 byte / 32 hex    128             10^25 tahun
  32 byte / 64 hex    256             10^63 tahun

  Token 4 byte bisa ditebak dalam hitungan menit. Token
  16 byte tidak akan pernah ditebak.

  Tetapi PANJANG cuma separuh syaratnya. Token harus
  berasal dari pembangkit acak KRIPTOGRAFIS. Token
  sepanjang 32 byte yang dibuat dari waktu sistem atau
  dari rand() biasa bisa ditebak tanpa satu pun tebakan
  acak -- penyerang cukup menghitung ulang urutannya.

--- izin per orang vs peran ---
   pengguna  izin langsung  lewat 6 peran
         10            400            250
         50          2.000            290
        200          8.000            440
       1000         40.000          1.240

  40 jenis izin, 6 peran.

  Yang penting bukan angkanya, melainkan APA yang harus
  diperiksa saat ada perubahan kebijakan.

  Tanpa peran: mengubah satu aturan berarti menyunting
  seribu pengguna satu per satu, dan yang terlewat tidak
  akan ada yang tahu.

  Dengan peran: satu peran disunting, seluruh pemegangnya
  ikut berubah -- dan daftar peran cukup pendek untuk
  benar-benar dibaca orang.

--- siklus hidup yang sering putus di tengah ---
  Masuk kerja     akun dibuat, peran diberikan
      hampir selalu jalan
  Pindah bagian   peran lama DICABUT, peran baru diberi
      yang lama sering tertinggal
  Naik jabatan    peran ditambah
      yang lama nyaris tak pernah dicabut
  Cuti panjang    akun dinonaktifkan sementara
      hampir tidak pernah dilakukan
  Keluar kerja    seluruh akses dimatikan hari itu
      sering tertunda berbulan

  Pola yang sama muncul di semua tahap: MEMBERI akses
  selalu ada yang meminta, MENCABUT tidak ada.

  Akibatnya hak menumpuk sepanjang karier seseorang.
  Setelah lima tahun, seorang staf biasa bisa punya
  akses ke sistem dari tiga bagian yang sudah lama ia
  tinggalkan.

  Yang memperbaikinya cuma satu: peninjauan berkala yang
  DIJADWALKAN dan jalan meski tidak ada yang meminta.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung entropi kata sandi', waktu: 'O(1)', memori: 'satu logaritma dan satu perkalian' },
      { operasi: 'Verifikasi kata sandi (bcrypt)', waktu: 'O(2^biaya)', memori: 'sengaja lambat, itu tujuannya' },
      { operasi: 'Menebak kata sandi ber-entropi b bit', waktu: 'O(2^b / laju)', memori: 'laju ditentukan cara penyimpanan' },
      { operasi: 'Bangkitkan token sesi', waktu: 'O(1)', memori: 'ambil n byte dari sumber kriptografis' },
      { operasi: 'Periksa izin lewat peran', waktu: 'O(r + i)', memori: 'r peran pengguna, i izin per peran' },
      { operasi: 'Ubah satu aturan kebijakan', waktu: 'O(1) dengan peran, O(U) tanpa', memori: 'U = jumlah pengguna' }
    ],
    intuisi: `Baris kedua adalah satu-satunya tempat dalam pemrograman di mana **lambat adalah tujuan**. Faktor biaya bcrypt memangkatkan waktunya, sehingga menaikkan biaya satu tingkat menggandakan waktu verifikasi — dan menggandakan biaya penyerang. Karena verifikasi cuma terjadi sekali per masuk, sekitar 100 milidetik masih tidak terasa bagi pengguna sementara ia melipatkan biaya penyerang berkali-kali.

Baris terakhir yang paling menentukan dalam praktik, dan tidak ada hubungannya dengan kecepatan program. Tanpa peran, mengubah satu aturan adalah pekerjaan \`O(U)\` yang dikerjakan **manusia** — dan pekerjaan manual sebanyak itu tidak pernah selesai dengan benar. Dengan peran, ia satu suntingan.

Yang dibeli RBAC bukan waktu komputasi. Yang dibeli: **kemungkinan kebijakannya diperiksa sama sekali**, karena enam peran bisa dibaca orang sementara seribu pemberian izin tidak.`
  },

  kesalahanUmum: [
    {
      salah: 'Mewajibkan simbol dan angka alih-alih mewajibkan panjang.',
      kenapa: 'Entropi tumbuh lurus terhadap panjang tetapi hanya logaritmik terhadap keragaman karakter, sehingga menambah seluruh simbol papan ketik cuma bernilai sekitar setengah bit per karakter sementara satu karakter tambahan bernilai sekitar enam bit. Aturan keragaman juga membuat pengguna memilih pola yang bisa diduga dan menuliskan kata sandinya.',
      benar: 'Tetapkan panjang minimum yang tinggi, izinkan rangkaian kata, dan periksa kata sandi terhadap daftar yang sudah bocor.'
    },
    {
      salah: 'Mengandalkan garam untuk memperlambat penyerang.',
      kenapa: 'Garam tidak mengubah kecepatan menghitung satu hash, sehingga waktu memecahkan satu kata sandi sama saja. Fungsinya memisahkan pengguna agar satu tebakan tidak membuka banyak akun, dan mematikan tabel hash siap pakai.',
      benar: 'Pakai garam per pengguna untuk pemisahan, dan pakai bcrypt atau Argon2 untuk memperlambat setiap tebakan.'
    },
    {
      salah: 'Menyebut kata sandi ditambah pertanyaan rahasia sebagai autentikasi dua faktor.',
      kenapa: 'Keduanya termasuk sesuatu yang diketahui, sehingga keduanya bocor dari kebocoran basis data yang sama dan keduanya bisa diminta lewat halaman phishing yang sama. Tidak ada faktor kedua yang benar-benar ditambahkan.',
      benar: 'Tambahkan faktor dari jenis berbeda, yaitu sesuatu yang dimiliki seperti aplikasi TOTP atau kunci keamanan.'
    },
    {
      salah: 'Membangkitkan token sesi dari waktu sistem atau pembangkit acak biasa.',
      kenapa: 'Pembangkit acak biasa bersifat menentukan penuh dari benihnya dan benih yang lazim adalah waktu sistem, yang ruang kemungkinannya sangat kecil. Token sepanjang apa pun dari sumber seperti itu bisa dihitung ulang tanpa satu pun tebakan acak.',
      benar: 'Ambil token dari sumber kriptografis seperti secrets di Python atau crypto.randomBytes di Node, minimal enam belas byte.'
    },
    {
      salah: 'Menganggap biometrik sebagai pengganti kata sandi yang lebih aman untuk dikirim ke peladen.',
      kenapa: 'Sidik jari dan wajah tidak bisa diganti bila datanya bocor, sehingga kebocoran satu kali berlaku selamanya. Kata sandi yang bocor bisa diganti dalam satu menit.',
      benar: 'Pakai biometrik untuk membuka kredensial yang tersimpan di perangkat, dan biarkan yang dikirim ke peladen berupa kunci atau token.'
    },
    {
      salah: 'Memberikan izin langsung per pengguna karena jumlah penggunanya masih sedikit.',
      kenapa: 'Biaya sesungguhnya muncul saat kebijakan berubah, sebab satu perubahan menuntut penyuntingan sebanyak jumlah pengguna dan yang terlewat tidak akan terdeteksi. Tidak ada satu tempat pun yang bisa dibaca untuk mengetahui kebijakan yang berlaku.',
      benar: 'Definisikan peran sejak awal meski jumlah penggunanya sedikit, dan jaga jumlah perannya tetap cukup pendek untuk dibaca orang.'
    },
    {
      salah: 'Mengandalkan permintaan pencabutan akses saat pegawai pindah atau keluar.',
      kenapa: 'Permintaan memberi akses selalu datang karena ada yang dirugikan bila tertahan, sementara permintaan mencabut tidak pernah datang karena tidak ada individu yang dirugikan oleh akses yang terlalu luas. Akibatnya hak menumpuk sepanjang karier setiap orang.',
      benar: 'Pasang kedaluwarsa otomatis pada akses sementara, dan jadwalkan peninjauan berkala yang berjalan tanpa perlu ada yang meminta.'
    }
  ],

  analogi: `Bayangkan sebuah **gedung perkantoran** dan berbagai cara masuknya.

**Kata sandi** itu kata sandi lisan ke resepsionis. Siapa pun yang mendengarmu menyebutnya bisa memakainya, dan kamu tidak akan tahu ia mendengar.

Sekarang soal panjang lawan kerumitan.

Aturan yang lazim: kata sandinya harus punya angka, huruf besar, dan tanda baca. Jadi orang memilih \`Kucing1!\` — dan hampir semua orang memilih pola yang sama persis: nama, angka satu, tanda seru.

Aturan yang lebih baik: sebutkan **empat kata acak** yang ditarik dari kantong. "gerbong lampu kelapa jahit."

Yang kedua lebih panjang, lebih mudah diingat, dan **jauh lebih sulit diduga** — karena tidak ada pola manusia di dalamnya. Kantongnya yang memilih, bukan orangnya.

**Sekarang cara resepsionis menyimpan daftarnya**, dan ini yang paling menentukan.

Cara pertama: daftar kata sandi ditulis di buku, dan buku itu bisa dibaca cepat. Pencuri yang mencurinya bisa mencoba jutaan kemungkinan dalam sehari.

Cara kedua: daftarnya disimpan dalam bentuk yang butuh **tiga detik** untuk memeriksa satu kemungkinan. Bagi pegawai yang masuk sekali sehari, tiga detik tidak terasa. Bagi pencuri yang harus mencoba sejuta kemungkinan, tiga detik adalah **berbulan-bulan**.

Perhatikan bahwa keputusan itu diambil oleh **resepsionisnya**, bukan oleh pegawai. Sama seperti memilih bcrypt: itu keputusanmu sebagai pengembang, sekali, berlaku untuk semua orang.

**Sekarang kartu tambahan.**

Kata sandi lisan bisa didengar. Jadi ditambah **kartu fisik** yang harus ditempelkan.

Sekarang orang yang mendengar kata sandimu belum bisa masuk. Ia butuh kartunya juga, dan kalau kartumu hilang **kamu tahu** — itu bedanya "sesuatu yang dimiliki" dari "sesuatu yang diketahui".

Tetapi ada penipuan yang masih berhasil. Seseorang menelepon berpura-pura petugas keamanan, minta kamu menyebutkan **kode di layar kartumu** untuk "verifikasi". Kamu sebutkan, ia pakai dalam tiga puluh detik.

Yang menutup celah itu: kartu yang **tidak bisa mengeluarkan kodenya sama sekali**, dan cuma bekerja kalau ditempelkan ke pembaca **di gedung yang benar**. Kamu boleh tertipu sepenuhnya; kartunya tidak bisa dipakai di tempat lain.

Itu FIDO2, dan itulah bentuk kendali terbaik: **yang tetap bekerja ketika orangnya salah.**

**Sekarang tanda pengenal harian.**

Setelah lolos resepsionis, kamu tidak menyebut kata sandi lagi di setiap pintu. Kamu memakai **kartu tamu** yang berlaku sehari.

Kalau nomor kartu tamunya cuma tiga angka, seseorang bisa mencetak kartu palsu dengan mencoba dari 000 sampai 999.

Kalau nomornya dua puluh angka acak, tidak akan pernah ketemu.

Tapi ada jebakan yang lebih halus: kalau nomornya dua puluh angka tetapi **diambil dari jam saat kartu dicetak**, penipu yang tahu kamu masuk sekitar pukul sembilan cuma perlu mencoba beberapa ribu kemungkinan.

Panjangnya dua puluh angka, dan tidak berguna.

**Terakhir, soal kunci yang menumpuk.**

Seorang pegawai pindah dari lantai tiga ke lantai lima. Ia diberi kunci lantai lima.

Kunci lantai tiganya? Tidak ada yang menariknya. Tidak ada yang dirugikan — pekerjaannya jalan, tidak ada keluhan.

Lima tahun kemudian, ia punya kunci empat lantai dan tiga gudang. Bukan karena ia mengumpulkannya, dan bukan karena ada yang lalai.

Karena **memberi kunci selalu ada yang meminta, menarik kunci tidak ada.**

Yang memperbaikinya cuma dua: kunci yang **berhenti berlaku sendiri** setelah tanggal tertentu, dan **pemeriksaan berkala** yang dijalankan meski tidak ada yang memintanya — karena memang tidak akan ada yang meminta.`,

  latihan: [
    'Hitung entropi lima kata sandi yang benar-benar kamu pakai, lalu urutkan dari yang terlemah.',
    'Bandingkan entropi satu kata sandi rumit-pendek dengan empat kata acak, lalu jelaskan kenapa yang mudah diingat menang.',
    'Jelaskan kenapa menambah seluruh simbol papan ketik cuma bernilai sekitar setengah bit per karakter.',
    'Hitung waktu pecah kata sandi 40 bit pada laju seratus miliar dan sepuluh ribu tebakan per detik, lalu simpulkan mana keputusan yang lebih menentukan.',
    'Ganti penyimpanan kata sandi satu aplikasimu ke fungsi berbiaya tinggi, lalu ukur waktu satu verifikasinya.',
    'Cari tahu berapa byte token sesi di satu aplikasi yang kamu punya kodenya, dan dari fungsi apa keacakannya diambil.',
    'Jelaskan kenapa token tiga puluh dua byte dari pembangkit acak biasa bisa lebih lemah daripada token dua byte dari sumber kriptografis.',
    'Susun enam peran untuk satu sistem nyata, lalu hitung berapa tempat yang harus disunting bila satu aturan berubah, dengan dan tanpa peran.',
    'Petakan lima tahap siklus hidup akses di satu organisasi, lalu tandai tahap mana yang benar-benar dijalankan.',
    'Rancang satu mekanisme akses yang kedaluwarsa sendiri untuk sistemmu, dan tentukan siapa yang diberi tahu saat masa berlakunya habis.'
  ]
});


TOPICS.push({
  id: 'kaminfo-smki',
  judul: 'SMKI: Manajemen Risiko, BIA & Tanggap Insiden',
  kategori: 'kaminfo',
  tag: ['SMKI', 'ISO 27001', 'register risiko', 'BIA', 'MTD', 'NIST CSF', 'tanggap insiden', 'MTTD'],
  ringkas: 'Selisih mendeteksi di hari ke-7 dan hari ke-30 saja bernilai satu miliar rupiah.',

  fungsi: `**Mengelola keamanan sebagai sistem yang berjalan terus, bukan sebagai daftar alat yang dibeli sekali.**

Terpakai di:

- **Tugas akhir** bertema manajemen risiko keamanan informasi atau kesiapan sistem — salah satu tema skripsi informatika yang cukup sering diambil
- **Menyusun register risiko** dan mempertahankannya di sidang, karena angkanya bisa ditelusuri
- **Menentukan urutan pemulihan** saat beberapa sistem mati sekaligus
- **Memutuskan mana risiko yang dikurangi, dialihkan, dan diterima** dengan hitungan, bukan dengan perasaan
- **Menangani insiden nyata** — enam fase ini yang dipakai di lapangan, dan fase ketiga punya jebakan yang merusak bukti
- **Memilih ukuran keberhasilan** keamanan yang tidak menyesatkan pimpinan

Yang paling mengubah prioritas: **waktu deteksi menentukan besar kerugian, dan pengaruhnya melampaui hampir semua kendali pencegahan.** Selisih antara menemukan penyusup pada hari ke-7 dan hari ke-30 pada contoh di topik ini bernilai sekitar satu miliar rupiah — jauh melampaui biaya alat pemantauannya.

Dan satu jebakan yang sering merusak penyelidikan: saat insiden terjadi, naluri pertama **mematikan peladennya**. Itu menghapus bukti yang hanya ada di memori. Yang benar: **putuskan jaringannya, biarkan mesin hidup.**`,
  praktik: {
    tujuan: 'Kamu punya register risiko yang terurut dengan alasan, BIA yang menetapkan MTD dan urutan pemulihan, keputusan penanganan tiap risiko yang berdasar hitungan, dan prosedur tanggap insiden satu halaman yang bisa dijalankan orang lain.',
    alat: ['Satu organisasi atau sistem nyata', 'Spreadsheet untuk register risiko dan BIA', 'Daftar proses bisnis beserta orang yang memahaminya'],
    langkah: [
      { judul: 'Daftar asetnya sampai habis, lalu beri nilai',
        isi: `Tahap ini menentukan segalanya, dan alasannya keras: **aset yang tidak terdaftar tidak akan pernah dinilai, tidak akan masuk daftar risiko, dan tidak akan pernah dilindungi.**

Kebocoran besar sering terjadi lewat sistem yang tidak ada di daftar aset siapa pun — peladen uji yang lupa dimatikan, basis data salinan untuk demo, akun API dari proyek yang sudah selesai.` },
      { judul: 'Kalikan tiga angka, jangan satu',
        isi: `Untuk tiap aset, nilai **nilai asetnya**, **ancamannya**, dan **kelemahannya** pada skala 1–5, lalu kalikan.

Uji hasilnya: apakah urutan yang keluar masuk akal? Kalau kamu mengurutkan dari ancaman saja, situs profil perusahaan bisa duduk di atas cadangan yang tidak terlindungi — dan seluruh perhatian tertuju ke tempat yang salah.` },
      { judul: 'Tetapkan pita levelnya terhadap skor maksimum',
        isi: `Dengan skala 1–5 untuk tiga faktor, skor tertingginya 125. Tetapkan pita terhadap angka itu, bukan terhadap angka bulat sembarangan.

Periksa sebarannya: kalau lima dari delapan aset masuk "kritis", pitanya tidak memisahkan apa pun dan tidak berguna sebagai urutan perhatian.` },
      { judul: 'Susun BIA: MTD dan rugi per jam untuk tiap proses',
        isi: `Untuk tiap proses bisnis, tanyakan dua hal berbeda: **berapa lama boleh mati** (MTD), dan **berapa ruginya per jam**.

Angka MTD harus datang dari orang yang menjalankan prosesnya, bukan dari TI. MTD adalah kenyataan bisnis; RTO adalah janji TI, dan RTO harus lebih kecil dari MTD.` },
      { judul: 'Tentukan urutan pemulihan dari rugi per jam',
        isi: `Urutkan proses berdasarkan **rugi per jam**, bukan berdasarkan total rugi di MTD-nya.

Dua angka, dua kegunaan: **laju menentukan urutan** (jam pertama diberikan ke proses berlaju tertinggi), **MTD menentukan tenggat** yang tidak boleh dilewati satu pun proses.` },
      { judul: 'Putuskan penanganan tiap risiko dengan angka',
        isi: `Untuk tiap risiko hitung kerugian harapan sekarang, kerugian harapan setelah kendali dipasang, dan selisihnya. Bandingkan selisih itu dengan biaya kendalinya.

Kalau penghematannya di bawah biayanya, "kurangi" bukan pilihan yang benar — dan di situlah **alihkan** atau **terima** masuk. Keduanya pilihan yang sah.` },
      { judul: 'Tulis keputusan "terima" dengan nama pemiliknya',
        isi: `Ini yang membedakan menerima risiko dari mengabaikannya: keputusan terima **ditulis**, diberi nama pemilik, dan diberi tanggal peninjauan.

Risiko yang diabaikan tidak punya pemilik dan tidak akan pernah ditinjau, sehingga perubahan keadaan tidak akan menghasilkan tindakan apa pun.` },
      { judul: 'Ukur dan perbaiki waktu deteksimu',
        isi: `Tanyakan: kalau ada penyusup di sistemmu **sekarang**, dari mana kamu akan tahu?

Kalau jawabannya "kalau ada yang mengeluh", waktu deteksimu diukur dalam bulan. Hitung nilai memangkasnya dengan kurva kerugianmu sendiri — angkanya hampir selalu melampaui biaya pemantauannya.` },
      { judul: 'Tulis prosedur insiden satu halaman, lalu latih sekali',
        isi: `Enam fase: persiapan, identifikasi, pembatasan, pembasmian, pemulihan, pelajaran. Cantumkan nomor telepon dan siapa yang berwenang memutuskan.

Lalu latih sekali dengan skenario tertulis. Yang selalu ditemukan latihan: nomor yang sudah tidak aktif, dan tidak ada yang tahu siapa yang boleh memutuskan mematikan layanan.` }
    ],
    cek: [
      'Register risikomu memakai tiga faktor yang dikalikan, dan sebaran levelnya benar-benar memisahkan',
      'Setiap MTD di BIA-mu berasal dari orang yang menjalankan prosesnya',
      'Setiap risiko yang kamu terima punya nama pemilik dan tanggal peninjauan',
      'Kamu bisa menjawab dari mana kamu akan tahu kalau ada penyusup di sistemmu sekarang'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa waktu deteksi mengalahkan hampir semua kendali',

  konsep: `SMKI — sistem manajemen keamanan informasi — adalah gagasan bahwa keamanan bukan sekumpulan alat, melainkan **proses yang berjalan terus**: menilai, menangani, memantau, meninjau, lalu menilai lagi.

Bagian yang bisa dihitung dari gagasan itu ada di bawah.

**Enam tahap yang berurutan**

| Tahap | Isinya |
|---|---|
| 1. Identifikasi aset | apa saja yang perlu dilindungi |
| 2. Nilai aset | seberapa penting masing-masing |
| 3. Ancaman & kelemahan | apa yang mengancam, celahnya di mana |
| 4. Nilai risiko | aset x ancaman x kelemahan |
| 5. Analisis dampak (BIA) | berapa lama boleh mati, ruginya apa |
| 6. Level risiko | urutan perhatian dan penanganannya |

Urutannya tidak bisa ditukar, dan **tahap 1 yang paling sering dikerjakan setengah jalan**.

Akibatnya berat dan berantai: aset yang tidak terdaftar tidak akan pernah dinilai, tidak akan pernah masuk daftar risiko, dan tidak akan pernah dilindungi. Kebocoran besar sering terjadi lewat sistem yang tidak ada di daftar aset siapa pun — peladen uji yang lupa dimatikan, salinan basis data untuk demo, kunci API dari proyek yang sudah lama selesai.

**Register risiko: kalikan tiga, jangan satu**

| Aset | Nilai | Ancam | Lemah | Skor | Level |
|---|---|---|---|---|---|
| Basis data pelanggan | 5 | 4 | 4 | 80 | **KRITIS** |
| Akun surel pimpinan | 4 | 5 | 3 | 60 | TINGGI |
| Cadangan di rak kantor | 5 | 2 | 5 | 50 | TINGGI |
| Laptop pegawai lapangan | 3 | 4 | 4 | 48 | TINGGI |
| Peladen web publik | 3 | 5 | 3 | 45 | TINGGI |
| Berkas keuangan | 5 | 3 | 2 | 30 | sedang |
| Sistem absensi | 2 | 2 | 4 | 16 | sedang |
| Situs profil perusahaan | 1 | 4 | 3 | 12 | rendah |

Dua baris yang menjelaskan kenapa ketiganya harus dikalikan.

**Cadangan di rak kantor** punya ancaman **terkecil** — kebakaran kantor jarang. Tetapi nilainya maksimum dan kelemahannya maksimum, sehingga skornya naik ke atas.

**Situs profil perusahaan** punya ancaman **besar** — situs publik dipindai terus-menerus. Tetapi nilainya 1: kalau ia diretas, yang hilang cuma halaman yang bisa dipasang ulang dalam sejam.

Mengurutkan dari ancaman saja akan menaruh situs profil di atas cadangan, dan seluruh perhatian tertuju ke tempat yang salah.

Satu catatan tentang pita levelnya: dengan tiga faktor berskala 1–5, skor tertinggi adalah 125. Pitanya ditetapkan **terhadap angka itu**, bukan terhadap angka bulat sembarangan — dan hasilnya harus diperiksa. Kalau lima dari delapan aset masuk "kritis", pitanya tidak memisahkan apa pun.

**BIA: dua angka, dua kegunaan**

| Proses | MTD | Rugi/jam | Rugi di MTD | Urutan pulih |
|---|---|---|---|---|
| Penerimaan pembayaran | 4 jam | 30 jt | 120 jt | **1** |
| Pemesanan daring | 8 jam | 18 jt | 144 jt | 2 |
| Pengiriman barang | 24 jam | 9 jt | **216 jt** | 3 |
| Layanan pelanggan | 12 jam | 4 jt | 48 jt | 4 |
| Laporan manajemen | 7 hari | 1 jt | 168 jt | 5 |
| Rekrutmen | 14 hari | 0 | 0 | 6 |

**MTD** (maximum tolerable downtime) datang dari bisnisnya: berapa lama proses ini boleh mati. **RTO** adalah janji TI, dan RTO harus lebih kecil dari MTD.

Sekarang perhatikan kejutan di kolom "rugi di MTD".

Pengiriman barang menumpuk **216 juta** saat MTD-nya tercapai — lebih besar daripada penerimaan pembayaran yang cuma 120 juta. Bahkan laporan manajemen mencapai 168 juta, karena MTD-nya sepekan penuh.

Apakah berarti pengiriman dipulihkan lebih dulu? **Tidak.**

Kolom "rugi di MTD" mengukur batas **kesabaran**, bukan laju kerugian. Urutan pemulihan mengikuti **rugi per jam**, karena setiap jam pertama yang diberikan ke proses berlaju tertinggi menghemat paling banyak.

Jadi dua angka dengan dua kegunaan berbeda: **laju menentukan urutan, MTD menentukan tenggat.**

**Empat cara menangani risiko**

| Cara | Artinya | Contoh |
|---|---|---|
| **Hindari** | hentikan kegiatannya | tidak lagi menyimpan nomor kartu |
| **Kurangi** | pasang kendali | enkripsi, MFA, tambal celah |
| **Alihkan** | serahkan ke pihak lain | asuransi siber, layanan terkelola |
| **Terima** | sadar dan tidak berbuat | risikonya kecil, biayanya tak sepadan |

**"Terima" adalah pilihan yang sah**, dan sering yang benar. Bedanya dengan mengabaikan cuma satu hal: keputusan terima **ditulis, diberi pemilik, dan ditinjau ulang berkala**.

Risiko yang diabaikan tidak punya pemilik. Risiko yang diterima punya nama orang di sebelahnya — dan itu yang membuatnya muncul kembali saat keadaan berubah.

**Memilih penanganan dengan angka**

| Risiko | Rugi harapan | Hemat | Biaya | Putusan |
|---|---|---|---|---|
| Kebocoran basis data | 300 jt | 240 | 150 | **KURANGI** |
| Ransomware | 240 jt | 180 | 90 | **KURANGI** |
| Laptop hilang | 60 jt | 52 | 20 | **KURANGI** |
| Situs profil diretas | 3 jt | 2 | 40 | terima |
| Gempa merusak kantor | 30 jt | 24 | 400 | alihkan |

Baris "Situs profil diretas" yang paling instruktif. Peluangnya besar dan ia **pasti** terjadi cepat atau lambat — tetapi kerugiannya cuma 10 juta sementara kendalinya 40 juta.

Memasang kendali di situ bukan kehati-hatian. Ia **pemborosan**, dan uangnya diambil dari risiko lain yang lebih besar.

Baris "Gempa" juga tidak layak dikurangi sendiri, dan di situlah **alihkan** masuk: asuransi menutup kerugian berpeluang kecil tapi berdampak besar dengan biaya jauh di bawah membangun sendiri.

**Lima fungsi kerangka keamanan**

| Fungsi | Artinya | Anggaran lazim | Yang disarankan |
|---|---|---|---|
| **Identify** | tahu apa yang dimiliki & risikonya | 5% | 15% |
| **Protect** | cegah kejadiannya | **70%** | 35% |
| **Detect** | temukan yang lolos | 10% | **25%** |
| **Respond** | tangani saat terjadi | 10% | 15% |
| **Recover** | pulihkan keadaan | 5% | 10% |

Uang hampir selalu menumpuk di **Protect**, dan sebabnya bukan analisis: di situ produk yang bisa dibeli paling banyak. Firewall, antivirus, pemindai — semuanya punya penjual, demo, dan brosur.

Yang kurang: **Detect**. Dan itu yang menentukan berapa lama penyusup berada di dalam sebelum diketahui.

**Kenapa waktu deteksi menentukan biaya**

Model penjenuhan, dengan seluruh nilai yang bisa hilang 4.000 juta dan separuhnya tercapai dalam 45 hari:

| Terdeteksi setelah | Kerugian | % nilai | Rugi/hari di rentang |
|---|---|---|---|
| 1 hari | 61 jt | 2% | 61 jt |
| 7 hari | 408 jt | 10% | 58 jt |
| 30 hari | 1.480 jt | 37% | 47 jt |
| 90 hari | 3.000 jt | 75% | 25 jt |
| 200 hari | 3.816 jt | 95% | 7 jt |

Kerugiannya **tidak tumbuh tanpa batas** — ia mendekati seluruh nilai yang bisa hilang lalu berhenti. Setelah 200 hari, praktis semuanya sudah hilang.

Kolom terakhir yang menjelaskan kenapa hari-hari awal paling menentukan: laju kerugiannya **turun terus**, dari 61 juta sehari di pekan pertama menjadi 7 juta sehari sesudah bulan ketiga. Dan turunnya bukan karena keadaan membaik, melainkan karena **sudah tidak banyak lagi yang tersisa untuk hilang.**

Selisih deteksi hari ke-7 dan hari ke-30 saja: **1.071 juta rupiah.** Itu nilai dari kemampuan mendeteksi, dan angkanya biasanya jauh melampaui biaya alat pemantauannya.

Ini yang membuat **MTTD** — waktu rata-rata sampai terdeteksi — jadi ukuran paling penting dalam keamanan.

**Enam fase tanggap insiden**

| Fase | Isinya | Catatan |
|---|---|---|
| 1. Persiapan | prosedur, kontak, alat, latihan | dikerjakan **sebelum** ada insiden |
| 2. Identifikasi | benarkah ini insiden, seluas apa | salah menilai di sini merusak sisanya |
| 3. Pembatasan | hentikan penyebarannya | **cabut jaringan, bukan matikan mesin** |
| 4. Pembasmian | hilangkan penyebabnya | tambal celah, cabut akses penyusup |
| 5. Pemulihan | kembalikan layanan, pantau ketat | pastikan tidak kembali lewat jalan sama |
| 6. Pelajaran | apa yang diubah supaya tak terulang | fase yang paling sering dilewati |

Fase 3 punya jebakan yang merusak seluruh penyelidikan. Naluri pertama saat menemukan penyusup: **matikan peladennya.**

Itu menghilangkan bukti yang hanya ada di memori — proses yang berjalan, sambungan jaringan yang terbuka, perkakas penyerang yang tidak pernah menyentuh cakram, kunci enkripsi yang sedang dipakai. Semuanya lenyap saat daya dicabut.

Yang benar: **putuskan jaringannya, biarkan mesin hidup.** Penyebarannya berhenti, buktinya tetap ada.

**Memilih ukuran keamanan**

| Ukuran | Mutu | Kenapa |
|---|---|---|
| Jumlah serangan diblokir | **menyesatkan** | naik kalau serangan bertambah, bukan kalau kita membaik |
| Jumlah tambalan dipasang | lemah | banyak tambalan tidak berarti yang penting sudah kena |
| **MTTD** — waktu sampai terdeteksi | bermakna | langsung menentukan besarnya kerugian |
| **MTTR** — waktu sampai pulih | bermakna | menentukan lama layanan terhenti |
| Cakupan MFA (persen akun) | bermakna | bisa diperiksa, langsung menutup jalur utama |
| Akun istimewa tanpa pemilik | bermakna | angkanya harus nol, dan mudah dihitung |

Ujinya satu pertanyaan: **kalau angka ini membaik, apakah keadaannya pasti membaik?**

"Serangan diblokir" gagal uji itu dengan cara yang menarik. Ia bisa **naik** karena kita dipindai lebih sering — keadaan tidak berubah, angkanya membaik. Dan ia bisa **turun** karena penyerang sudah masuk sehingga tidak perlu lagi mengetuk pintu — keadaan jauh lebih buruk, angkanya juga "membaik".

Ukuran yang bisa bergerak ke arah yang sama untuk dua keadaan yang berlawanan bukan ukuran. Ia hiasan laporan.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kerugian MENJENUH: mendekati seluruh nilai yang bisa hilang\nMAKS  = 4000     # juta\nPARUH = 45       # hari untuk mencapai separuh\n\ndef kerugian(hari):\n    return MAKS * (1 - 0.5 ** (hari / PARUH))\n\n#   deteksi     kerugian   % nilai   rugi/hari di rentang\n#     1 hari       61 jt       2%            61 jt\n#     7 hari      408 jt      10%            58 jt\n#    30 hari    1.480 jt      37%            47 jt\n#    90 hari    3.000 jt      75%            25 jt\n#   200 hari    3.816 jt      95%             7 jt\n#\n# Selisih deteksi hari ke-7 dan ke-30: Rp 1.071 juta.',
      penjelasan: `Satu kurva yang menjelaskan kenapa anggaran keamanan hampir selalu dialokasikan ke tempat yang salah.

Mulai dari kenapa bentuk kurvanya seperti ini, karena bentuknya yang penting — angkanya andaian.

Naluri pertama memodelkan kerugian sebagai **pertumbuhan berganda**: penyusup bergerak lebih dalam tiap hari, jadi kerugiannya bertambah beberapa persen per hari. Model itu terasa masuk akal dan **salah**, karena ia tidak berbatas. Dijalankan 200 hari, ia menghasilkan angka yang melampaui nilai seluruh perusahaan puluhan ribu kali.

Yang benar: kerugian punya **batas atas**. Tidak mungkin kehilangan lebih dari seluruh yang dimiliki. Setelah data pelanggan disalin habis dan seluruh sistem dikuasai, hari ke-201 tidak menambah apa pun — sudah tidak ada lagi yang bisa hilang.

Jadi kurvanya **menjenuh**: naik cepat di awal, lalu melandai mendekati nilai maksimumnya.

Sekarang perhatikan kolom terakhir, karena di situ seluruh isi pelajarannya.

Kolom itu **laju kerugian per hari** di dalam tiap rentang, dan ia turun terus: 61, 58, 47, 25, 7.

Ini berarti hari-hari **paling awal** adalah hari yang paling mahal. Satu hari di pekan pertama berbiaya 61 juta; satu hari di bulan keempat berbiaya 7 juta.

Dan alasan turunnya penting untuk dibaca dengan benar: **bukan karena keadaan membaik.** Justru sebaliknya — pada bulan keempat penyerang sudah menguasai hampir semuanya. Lajunya turun karena **sudah tidak banyak lagi yang tersisa untuk diambil.**

Ini kebalikan penuh dari cara laporan insiden biasanya dibaca. Insiden yang "baru ditemukan setelah enam bulan tetapi kerugiannya tidak bertambah lagi" bukan kabar baik. Ia berarti kerugiannya sudah maksimum.

**Sekarang nilai praktisnya.**

Selisih antara mendeteksi di hari ke-7 dan di hari ke-30: **1.071 juta rupiah.**

Sekarang bandingkan dengan biaya memangkas waktu deteksi dari 30 hari menjadi 7. Yang dibutuhkan: pengumpulan log terpusat, aturan alarm untuk beberapa pola yang jelas, dan seseorang yang benar-benar melihat alarmnya.

Untuk organisasi menengah, itu berkisar puluhan sampai ratusan juta setahun — **di bawah** nilai yang dihematnya, sering jauh di bawah.

Dan hitungan itu hampir tidak pernah dibuat.

**Kenapa tidak dibuat: karena Detect tidak punya penjual yang baik.**

Perhatikan bentuk pembelanjaan yang lazim — 70 persen ke Protect. Sebabnya bukan analisis risiko. Sebabnya di Protect ada **produk**: firewall punya merek, antivirus punya demo, pemindai kerentanan punya brosur dengan angka. Semuanya bisa dibeli, dipasang, dan ditunjukkan ke pimpinan sebagai bukti tindakan.

Detect sebagian besar bukan produk. Ia **pekerjaan**: memutuskan apa yang layak dicatat, menulis aturan alarm yang tidak berisik, dan menugaskan orang menanggapinya. Sulit dibeli, sulit ditunjukkan, dan tidak menghasilkan momen serah terima yang bisa difoto.

Ada satu akibat lanjutan yang membuat ketidakseimbangan ini bertahan: **kegagalan Protect terlihat, kegagalan Detect tidak.** Firewall yang jebol adalah kejadian. Deteksi yang tidak ada bukan kejadian — ia ketiadaan, dan tidak ada laporan yang menyebut apa yang tidak terjadi.

Jadi organisasi bisa berjalan bertahun-tahun dengan pemantauan yang tidak berfungsi, dan tidak satu pun laporannya menunjukkan masalah — sampai ada yang menemukan penyusup yang sudah delapan bulan di dalam.

**Terakhir, cara memakai hitungan ini.**

Jangan ajukan pemantauan sebagai kebutuhan teknis. Ajukan sebagai angka: *"waktu deteksi kita saat ini sekitar X. Memangkasnya ke Y bernilai Z rupiah pada kurva kerugian kita, dan biayanya W."*

Argumen berbentuk itu bisa dibantah, diperbaiki, dan disetujui. Argumen berbentuk "kita butuh SIEM" tidak bisa dinilai oleh orang yang memegang anggarannya.`
    },
    {
      bahasa: 'python',
      kode: '# hemat = rugi harapan SEKARANG - rugi harapan SETELAH kendali\n#\n#   risiko                  rugi   hemat  biaya  putusan\n#   Kebocoran basis data  300 jt     240    150  KURANGI\n#   Ransomware            240 jt     180     90  KURANGI\n#   Laptop hilang          60 jt      52     20  KURANGI\n#   Situs profil diretas    3 jt       2     40  terima\n#   Gempa merusak kantor   30 jt      24    400  alihkan\n#\n# FASE 3 TANGGAP INSIDEN -- jebakan yang merusak bukti:\n#   naluri : MATIKAN peladennya\n#   benar  : PUTUSKAN jaringannya, mesin tetap hidup\n#\n# Yang hilang saat daya dicabut: proses berjalan,\n# sambungan aktif, perkakas yang tak pernah kena cakram.',
      penjelasan: `Dua keputusan yang bentuknya sangat berbeda, dan keduanya sering diambil keliru dengan alasan yang sama: **naluri kehati-hatian.**

**Keputusan pertama: kendali mana yang dipasang.**

Rumusnya sederhana. Kerugian harapan sekarang adalah \`peluang x kerugian\`. Setelah kendali dipasang, peluangnya turun, jadi kerugian harapannya juga turun. Selisihnya penghematan, dan penghematan itu dibandingkan dengan biaya kendalinya.

Tiga baris pertama lolos dengan jelas: menghemat lebih banyak daripada biayanya.

Sekarang baris **"Situs profil diretas"**, yang paling instruktif justru karena putusannya berlawanan dengan naluri.

Peluangnya paling besar di seluruh tabel — 30 persen setahun. Situs publik dipindai terus-menerus, dan cepat atau lambat ia **akan** kena. Naluri mengatakan: ini yang paling mungkin terjadi, tangani.

Tetapi kerugiannya cuma 10 juta. Halamannya bisa dipasang ulang dari cadangan dalam sejam, dan tidak ada data siapa pun di dalamnya. Kerugian harapannya 3 juta setahun; kendalinya 40 juta.

Memasang kendali di situ **bukan kehati-hatian**. Uangnya harus datang dari suatu tempat, dan tempat itu adalah risiko lain di tabel yang sama — yang kerugian harapannya ratusan juta.

Jadi kehati-hatian yang tidak dihitung **memindahkan** risiko, bukan mengurangi. Dan ia memindahkannya ke arah yang salah, karena yang menarik perhatian adalah yang paling **sering**, sedangkan yang merusak adalah yang paling **besar**.

Sekarang baris **"Gempa"**, yang menunjukkan kenapa "kurangi" bukan satu-satunya jawaban.

Peluangnya 1 persen, kerugiannya 3.000 juta. Kerugian harapannya 30 juta setahun — kecil. Tetapi kalau terjadi, ia bisa menghabiskan organisasinya.

Menguranginya sendiri butuh 400 juta: bangunan tahan gempa, pusat data kedua, dan seterusnya. Tidak sepadan menurut kerugian harapan.

Dan di sinilah **alihkan** bekerja, dengan sifat yang khas: asuransi paling berguna tepat untuk bentuk risiko seperti ini — **berpeluang kecil, berdampak sangat besar**. Preminya bisa jauh di bawah biaya membangun sendiri, karena penanggungnya menyebar risiko itu ke banyak pemegang polis yang tidak akan tertimpa gempa yang sama.

Perhatikan bahwa asuransi **tidak** berguna untuk risiko yang sering dan kecil. Untuk itu preminya akan mendekati kerugiannya sendiri, ditambah biaya administrasi.

**Keputusan kedua: apa yang dilakukan pada menit pertama insiden.**

Bentuknya berbeda sama sekali — tidak ada waktu menghitung, dan yang memutuskan sedang panik.

Naluri pertama saat menemukan penyusup di sebuah peladen: **matikan.** Cabut dayanya. Hentikan kerusakannya sekarang.

Naluri itu bekerja pada satu tujuan — menghentikan penyebaran — dan **menghancurkan** tujuan yang lain.

Yang hilang saat daya dicabut adalah segala sesuatu yang hanya ada di memori:

- **proses yang sedang berjalan**, termasuk perkakas penyerang
- **sambungan jaringan yang terbuka**, yang menunjukkan ke mana data dikirim
- **perkakas yang tidak pernah menyentuh cakram** — banyak serangan modern sengaja berjalan hanya di memori justru supaya tidak meninggalkan berkas
- **kunci enkripsi** yang sedang dipakai, yang pada kasus ransomware kadang masih ada di memori dan bisa menyelamatkan datanya

Semuanya lenyap dalam sekejap, dan tidak ada cara mengembalikannya.

Yang benar: **putuskan jaringannya, biarkan mesin hidup.** Kabel dicabut, atau porta dimatikan dari sisi switch.

Hasilnya: penyebaran berhenti seketika — penyerang kehilangan akses, data berhenti keluar — dan seluruh bukti di memori tetap ada untuk diambil.

Dan ini bagian yang menjelaskan kenapa **fase 1 (persiapan)** tidak bisa dilewati: keputusan ini harus sudah tertulis **sebelum** kejadian. Pada menit pertama insiden, tidak ada seorang pun yang akan menimbang untung-rugi pelestarian bukti. Yang terjadi adalah orang melakukan hal yang paling terasa benar, dan yang paling terasa benar adalah mencabut daya.

Satu baris di prosedur — *"jangan matikan mesin, putuskan jaringannya"* — adalah salah satu baris paling bernilai yang bisa ditulis di dokumen keamanan mana pun. Dan biayanya nol.`
    }
  ],

  kode: { python: String.raw`# ============================================
# SMKI: manajemen risiko, BIA, tanggap insiden
# ============================================

# --------------------------------------------
# 1. Enam tahap yang berurutan
# --------------------------------------------
print("--- proses manajemen risiko keamanan informasi ---")
TAHAP = [
    ("1. Identifikasi aset", "apa saja yang perlu dilindungi"),
    ("2. Nilai aset",        "seberapa penting masing-masing"),
    ("3. Ancaman & kelemahan", "apa yang mengancam, celahnya di mana"),
    ("4. Nilai risiko",      "aset x ancaman x kelemahan"),
    ("5. Analisis dampak (BIA)", "berapa lama boleh mati, ruginya apa"),
    ("6. Level risiko",      "urutan perhatian & penanganannya"),
]
for a, b in TAHAP:
    print("  " + a.ljust(26) + b)
print("")
print("  Urutannya tidak bisa ditukar, dan tahap 1 yang paling")
print("  sering dikerjakan setengah jalan.")
print("")
print("  Aset yang tidak terdaftar tidak akan pernah dinilai,")
print("  tidak akan pernah masuk daftar risiko, dan tidak akan")
print("  pernah dilindungi. Kebocoran besar sering terjadi lewat")
print("  sistem yang tidak ada di daftar aset siapa pun.")

# --------------------------------------------
# 2. Register risiko: nilai aset x ancaman x kelemahan
# --------------------------------------------
print("")
print("--- register risiko ---")
# (aset, nilai aset 1-5, ancaman 1-5, kelemahan 1-5)
ASET = [
    ("Basis data pelanggan",     5, 4, 4),
    ("Peladen web publik",       3, 5, 3),
    ("Berkas keuangan",          5, 3, 2),
    ("Laptop pegawai lapangan",  3, 4, 4),
    ("Sistem absensi",           2, 2, 4),
    ("Akun surel pimpinan",      4, 5, 3),
    ("Cadangan di rak kantor",   5, 2, 5),
    ("Situs profil perusahaan",  1, 4, 3),
]
# skor tertinggi yang mungkin 5 x 5 x 5 = 125, jadi pitanya
# ditetapkan terhadap 125 -- bukan angka bulat sembarangan
def level(skor):
    if skor >= 75:
        return "KRITIS"
    if skor >= 40:
        return "TINGGI"
    if skor >= 15:
        return "sedang"
    return "rendah"

print("  " + "aset".ljust(26) + "nilai".rjust(6) + "ancam".rjust(6)
      + "lemah".rjust(6) + "skor".rjust(6) + "  level")
baris = [(n * a * k, nama, n, a, k) for nama, n, a, k in ASET]
for skor, nama, n, a, k in sorted(baris, reverse=True):
    print("  " + nama.ljust(26) + str(n).rjust(6) + str(a).rjust(6)
          + str(k).rjust(6) + str(skor).rjust(6)
          + "  " + level(skor))
print("")
print("  Perhatikan 'Cadangan di rak kantor': ancamannya cuma")
print("  2 -- kebakaran kantor jarang. Tetapi nilainya")
print("  maksimum dan kelemahannya maksimum, sehingga skornya")
print("  naik ke atas.")
print("")
print("  Dan 'Situs profil perusahaan': ancamannya besar, tetapi")
print("  nilainya 1. Kalau ia diretas, yang hilang cuma halaman")
print("  yang bisa dipasang ulang dalam sejam.")
print("")
print("  Inilah gunanya mengalikan ketiganya. Mengurutkan dari")
print("  ancaman saja akan menaruh situs profil di atas cadangan")
print("  -- dan seluruh perhatian tertuju ke tempat yang salah.")

# --------------------------------------------
# 3. BIA: berapa lama boleh mati
# --------------------------------------------
print("")
print("--- analisis dampak bisnis (BIA) ---")
# (proses, MTD jam, rugi per jam juta rupiah)
PROSES = [
    ("Penerimaan pembayaran",   4,  30),
    ("Pemesanan daring",        8,  18),
    ("Pengiriman barang",      24,   9),
    ("Layanan pelanggan",      12,   4),
    ("Laporan manajemen",     168,   1),
    ("Rekrutmen",             336,   0),
]
print("  MTD = batas waktu mati yang masih bisa ditanggung")
print("")
urutan = {n: i + 1 for i, (n, _, _) in
          enumerate(sorted(PROSES, key=lambda x: -x[2]))}
print("  " + "proses".ljust(23) + "MTD".rjust(7)
      + "rugi/jam".rjust(10) + "di MTD".rjust(9)
      + "urutan pulih".rjust(14))
for nama, mtd, rugi in PROSES:
    total = mtd * rugi
    satuan = ("%.0f jam" % mtd) if mtd < 48 else ("%.0f hr" % (mtd / 24))
    print("  " + nama.ljust(23) + satuan.rjust(7)
          + (str(rugi) + " jt").rjust(10)
          + (f"{total:,}".replace(",", ".")).rjust(9)
          + str(urutan[nama]).rjust(14))
print("")
print("  RTO tiap proses harus LEBIH KECIL dari MTD-nya.")
print("  MTD datang dari bisnisnya; RTO adalah janji TI.")
print("")
print("  Sekarang perhatikan kejutan di kolom 'di MTD'.")
print("")
print("  Pengiriman barang menumpuk 216 juta pada saat MTD-nya")
print("  tercapai -- lebih besar daripada penerimaan pembayaran")
print("  yang cuma 120 juta. Bahkan laporan manajemen mencapai")
print("  168 juta, karena MTD-nya sepekan penuh.")
print("")
print("  Apakah berarti pengiriman harus dipulihkan lebih dulu?")
print("  Tidak. Kolom 'di MTD' mengukur batas KESABARAN, bukan")
print("  laju kerugian.")
print("")
print("  Urutan pemulihan mengikuti RUGI PER JAM, karena setiap")
print("  jam pertama diberikan ke proses berlaju tertinggi")
print("  menghemat paling banyak. MTD-nya berperan lain: ia")
print("  TENGGAT yang tidak boleh dilewati satu pun proses.")
print("")
print("  Jadi dua angka, dua kegunaan: laju menentukan urutan,")
print("  MTD menentukan batas waktu.")
print("")
print("  Perhatikan dua baris terakhir. Rekrutmen boleh mati dua")
print("  pekan tanpa kerugian terukur. Menyamakan perlindungannya")
print("  dengan penerimaan pembayaran membuang uang -- dan lebih")
print("  buruk, membuang PERHATIAN saat kejadian sungguhan.")
print("")
print("  Itu sebabnya BIA dikerjakan sebelum rencana pemulihan:")
print("  ia menentukan urutan menyalakan kembali sistem.")

# --------------------------------------------
# 4. Empat cara menangani risiko
# --------------------------------------------
print("")
print("--- empat pilihan penanganan ---")
CARA = [
    ("Hindari", "hentikan kegiatannya",
     "tidak lagi menyimpan nomor kartu"),
    ("Kurangi", "pasang kendali",
     "enkripsi, MFA, tambal celah"),
    ("Alihkan", "serahkan ke pihak lain",
     "asuransi siber, layanan terkelola"),
    ("Terima",  "sadar dan tidak berbuat",
     "kecil, biayanya tak sepadan"),
]
for a, b, c in CARA:
    print("  " + a.ljust(9) + b.ljust(26) + c)
print("")
print("  'Terima' adalah pilihan yang SAH, dan sering yang benar.")
print("  Bedanya dengan mengabaikan cuma satu: keputusan terima")
print("  DITULIS, ditandatangani, dan ditinjau ulang berkala.")
print("")
print("  Risiko yang diabaikan tidak punya pemilik. Risiko yang")
print("  diterima punya nama orang di sebelahnya.")

# --------------------------------------------
# 5. Memilih penanganan dengan angka
# --------------------------------------------
print("")
print("--- penanganan mana yang layak ---")
# (risiko, peluang setahun, kerugian juta, biaya kendali juta,
#  peluang sisa setelah kendali)
KASUS = [
    ("Kebocoran basis data",   0.15, 2000,  150, 0.03),
    ("Ransomware",             0.20, 1200,   90, 0.05),
    ("Laptop hilang",          0.40,  150,   20, 0.05),
    ("Situs profil diretas",   0.30,   10,   40, 0.05),
    ("Gempa merusak kantor",   0.01, 3000,  400, 0.002),
]
print("  " + "risiko".ljust(24) + "rugi".rjust(9)
      + "hemat".rjust(8) + "biaya".rjust(8) + "  putusan")
for nama, p, rugi, biaya, sisa in KASUS:
    harapan_kini = p * rugi
    harapan_sisa = sisa * rugi
    hemat = harapan_kini - harapan_sisa
    putusan = "KURANGI" if hemat > biaya else "terima/alihkan"
    print("  " + nama.ljust(24)
          + ("%.0f jt" % harapan_kini).rjust(9)
          + ("%.0f" % hemat).rjust(8)
          + ("%.0f" % biaya).rjust(8)
          + "  " + putusan)
print("")
print("  'rugi' di sini kerugian HARAPAN setahun (peluang x")
print("  kerugian), 'hemat' penurunannya setelah kendali dipasang.")
print("")
print("  Baris 'Situs profil diretas' menarik: peluangnya besar")
print("  dan pasti terjadi cepat atau lambat, tetapi kerugiannya")
print("  cuma 10 juta sementara kendalinya 40 juta.")
print("")
print("  Memasang kendali di situ bukan kehati-hatian -- ia")
print("  pemborosan, dan uangnya diambil dari risiko lain yang")
print("  lebih besar.")
print("")
print("  Baris 'Gempa' juga tidak layak dikurangi sendiri, dan")
print("  di situlah ALIHKAN masuk: asuransi menutup kerugian")
print("  berpeluang kecil tapi berdampak besar dengan biaya")
print("  jauh di bawah membangun sendiri.")

# --------------------------------------------
# 6. Lima fungsi kerangka keamanan
# --------------------------------------------
print("")
print("--- lima fungsi (kerangka NIST) ---")
FUNGSI = [
    ("Identify", "tahu apa yang dimiliki & risikonya",
     "daftar aset, penilaian risiko"),
    ("Protect",  "cegah kejadiannya",
     "kendali akses, enkripsi, pelatihan"),
    ("Detect",   "temukan yang lolos",
     "pemantauan, log, alarm"),
    ("Respond",  "tangani saat terjadi",
     "prosedur insiden, komunikasi"),
    ("Recover",  "pulihkan keadaan",
     "cadangan, rencana pemulihan"),
]
for a, b, c in FUNGSI:
    print("  " + a.ljust(10) + b)
    print("      " + c)
print("")
ANGGARAN = [("Identify", 5, 15), ("Protect", 70, 35),
            ("Detect", 10, 25), ("Respond", 10, 15),
            ("Recover", 5, 10)]
print("  " + "fungsi".ljust(10) + "anggaran lazim".rjust(15)
      + "yang disarankan".rjust(17))
for nama, lazim, saran in ANGGARAN:
    print("  " + nama.ljust(10) + (str(lazim) + "%").rjust(15)
          + (str(saran) + "%").rjust(17))
print("")
print("  Uang hampir selalu menumpuk di Protect, karena di situ")
print("  produk yang bisa dibeli paling banyak.")
print("")
print("  Yang kurang: Detect. Dan itu yang menentukan berapa lama")
print("  penyusup berada di dalam sebelum diketahui.")

# --------------------------------------------
# 7. Kenapa waktu deteksi menentukan biaya
# --------------------------------------------
print("")
print("--- biaya insiden tumbuh selama tidak terdeteksi ---")
# Model penjenuhan: kerugian mendekati NILAI TOTAL yang bisa
# hilang, tidak tumbuh tanpa batas. Angkanya andaian; yang
# penting BENTUK kurvanya.
MAKS = 4000        # juta, seluruh nilai yang bisa hilang
PARUH = 45         # hari untuk mencapai separuh kerugian maksimum
print("  seluruh nilai yang bisa hilang : Rp "
      + f"{MAKS:,}".replace(",", ".") + " juta")
print("  separuhnya tercapai setelah    : " + str(PARUH) + " hari")
print("")
def kerugian(hari):
    return MAKS * (1 - 0.5 ** (hari / PARUH))

print("  " + "terdeteksi setelah".ljust(20) + "kerugian".rjust(11)
      + "% nilai".rjust(9) + "rugi/hari".rjust(12))
print("  " + "".ljust(20) + "".rjust(11) + "".rjust(9)
      + "di rentang".rjust(12))
sebelum_biaya, sebelum_hari = 0.0, 0
for hari in (1, 7, 30, 90, 200):
    biaya = kerugian(hari)
    per_hari = (biaya - sebelum_biaya) / (hari - sebelum_hari)
    sebelum_biaya, sebelum_hari = biaya, hari
    print("  " + ("%d hari" % hari).ljust(20)
          + (f"{int(biaya):,}".replace(",", ".") + " jt").rjust(11)
          + ("%.0f%%" % (biaya / MAKS * 100)).rjust(9)
          + ("%.0f jt" % per_hari).rjust(12))
print("")
h7, h30 = kerugian(7), kerugian(30)
print("  Kerugiannya TIDAK tumbuh tanpa batas -- ia mendekati")
print("  seluruh nilai yang bisa hilang, lalu berhenti. Setelah")
print("  200 hari, praktis semuanya sudah hilang.")
print("")
print("  Kolom terakhir yang menjelaskan kenapa hari-hari AWAL")
print("  paling menentukan: laju kerugiannya turun terus, dari")
print("  61 juta sehari di pekan pertama menjadi 7 juta sehari")
print("  sesudah bulan ketiga.")
print("")
print("  Dan turunnya BUKAN karena keadaan membaik, melainkan")
print("  karena sudah tidak banyak lagi yang tersisa untuk")
print("  hilang.")
print("")
print("  Selisih deteksi hari ke-7 dan hari ke-30 saja: Rp "
      + f"{int(h30 - h7):,}".replace(",", ".") + " juta.")
print("")
print("  Itu nilai dari kemampuan MENDETEKSI, dan angkanya")
print("  biasanya jauh melampaui biaya alat pemantauannya.")
print("")
print("  Ini yang membuat MTTD (waktu rata-rata sampai")
print("  terdeteksi) jadi ukuran paling penting -- lebih")
print("  penting daripada jumlah serangan yang ditahan.")

# --------------------------------------------
# 8. Enam fase tanggap insiden
# --------------------------------------------
print("")
print("--- fase tanggap insiden ---")
FASE = [
    ("1. Persiapan",   "prosedur, kontak, alat, latihan",
     "dikerjakan SEBELUM ada insiden"),
    ("2. Identifikasi", "benarkah ini insiden, seluas apa",
     "salah menilai di sini merusak sisanya"),
    ("3. Pembatasan",  "hentikan penyebarannya",
     "cabut jaringan, bukan matikan mesin"),
    ("4. Pembasmian",  "hilangkan penyebabnya",
     "tambal celah, cabut akses penyusup"),
    ("5. Pemulihan",   "kembalikan layanan, pantau ketat",
     "pastikan tidak kembali lewat jalan sama"),
    ("6. Pelajaran",   "apa yang diubah supaya tak terulang",
     "fase yang paling sering dilewati"),
]
for a, b, c in FASE:
    print("  " + a.ljust(17) + b)
    print("      " + c)
print("")
print("  Perhatikan fase 3. Naluri pertama: MATIKAN peladennya.")
print("")
print("  Itu menghilangkan bukti yang cuma ada di memori --")
print("  proses yang berjalan, sambungan jaringan, kunci")
print("  enkripsi yang sedang dipakai. Semuanya lenyap saat")
print("  daya dicabut.")
print("")
print("  Yang benar: PUTUSKAN jaringannya, biarkan mesin hidup.")
print("  Penyebarannya berhenti, buktinya tetap ada.")

# --------------------------------------------
# 9. Ukuran yang bermakna vs yang menyesatkan
# --------------------------------------------
print("")
print("--- memilih ukuran keamanan ---")
UKURAN = [
    ("Jumlah serangan diblokir", "MENYESATKAN",
     "naik kalau serangan bertambah, bukan kalau kita membaik"),
    ("Jumlah tambalan dipasang", "lemah",
     "banyak tambalan tidak berarti yang penting sudah kena"),
    ("MTTD - waktu sampai terdeteksi", "BERMAKNA",
     "langsung menentukan besarnya kerugian"),
    ("MTTR - waktu sampai pulih", "BERMAKNA",
     "menentukan lama layanan terhenti"),
    ("Cakupan MFA (% akun)", "BERMAKNA",
     "bisa diperiksa, dan langsung menutup jalur utama"),
    ("Akun istimewa tanpa pemilik", "BERMAKNA",
     "angkanya harus nol, dan mudah dihitung"),
]
for nama, mutu, kenapa in UKURAN:
    print("  " + nama.ljust(32) + mutu)
    print("      " + kenapa)
print("")
print("  Ujinya satu pertanyaan: kalau angka ini membaik, apakah")
print("  keadaannya PASTI membaik?")
print("")
print("  'Serangan diblokir' gagal uji itu -- ia bisa naik karena")
print("  kita dipindai lebih sering, dan turun karena penyerang")
print("  sudah masuk sehingga tidak perlu lagi mengetuk pintu.")` },
  output: `--- proses manajemen risiko keamanan informasi ---
  1. Identifikasi aset      apa saja yang perlu dilindungi
  2. Nilai aset             seberapa penting masing-masing
  3. Ancaman & kelemahan    apa yang mengancam, celahnya di mana
  4. Nilai risiko           aset x ancaman x kelemahan
  5. Analisis dampak (BIA)  berapa lama boleh mati, ruginya apa
  6. Level risiko           urutan perhatian & penanganannya

  Urutannya tidak bisa ditukar, dan tahap 1 yang paling
  sering dikerjakan setengah jalan.

  Aset yang tidak terdaftar tidak akan pernah dinilai,
  tidak akan pernah masuk daftar risiko, dan tidak akan
  pernah dilindungi. Kebocoran besar sering terjadi lewat
  sistem yang tidak ada di daftar aset siapa pun.

--- register risiko ---
  aset                       nilai ancam lemah  skor  level
  Basis data pelanggan           5     4     4    80  KRITIS
  Akun surel pimpinan            4     5     3    60  TINGGI
  Cadangan di rak kantor         5     2     5    50  TINGGI
  Laptop pegawai lapangan        3     4     4    48  TINGGI
  Peladen web publik             3     5     3    45  TINGGI
  Berkas keuangan                5     3     2    30  sedang
  Sistem absensi                 2     2     4    16  sedang
  Situs profil perusahaan        1     4     3    12  rendah

  Perhatikan 'Cadangan di rak kantor': ancamannya cuma
  2 -- kebakaran kantor jarang. Tetapi nilainya
  maksimum dan kelemahannya maksimum, sehingga skornya
  naik ke atas.

  Dan 'Situs profil perusahaan': ancamannya besar, tetapi
  nilainya 1. Kalau ia diretas, yang hilang cuma halaman
  yang bisa dipasang ulang dalam sejam.

  Inilah gunanya mengalikan ketiganya. Mengurutkan dari
  ancaman saja akan menaruh situs profil di atas cadangan
  -- dan seluruh perhatian tertuju ke tempat yang salah.

--- analisis dampak bisnis (BIA) ---
  MTD = batas waktu mati yang masih bisa ditanggung

  proses                     MTD  rugi/jam   di MTD  urutan pulih
  Penerimaan pembayaran    4 jam     30 jt      120             1
  Pemesanan daring         8 jam     18 jt      144             2
  Pengiriman barang       24 jam      9 jt      216             3
  Layanan pelanggan       12 jam      4 jt       48             4
  Laporan manajemen         7 hr      1 jt      168             5
  Rekrutmen                14 hr      0 jt        0             6

  RTO tiap proses harus LEBIH KECIL dari MTD-nya.
  MTD datang dari bisnisnya; RTO adalah janji TI.

  Sekarang perhatikan kejutan di kolom 'di MTD'.

  Pengiriman barang menumpuk 216 juta pada saat MTD-nya
  tercapai -- lebih besar daripada penerimaan pembayaran
  yang cuma 120 juta. Bahkan laporan manajemen mencapai
  168 juta, karena MTD-nya sepekan penuh.

  Apakah berarti pengiriman harus dipulihkan lebih dulu?
  Tidak. Kolom 'di MTD' mengukur batas KESABARAN, bukan
  laju kerugian.

  Urutan pemulihan mengikuti RUGI PER JAM, karena setiap
  jam pertama diberikan ke proses berlaju tertinggi
  menghemat paling banyak. MTD-nya berperan lain: ia
  TENGGAT yang tidak boleh dilewati satu pun proses.

  Jadi dua angka, dua kegunaan: laju menentukan urutan,
  MTD menentukan batas waktu.

  Perhatikan dua baris terakhir. Rekrutmen boleh mati dua
  pekan tanpa kerugian terukur. Menyamakan perlindungannya
  dengan penerimaan pembayaran membuang uang -- dan lebih
  buruk, membuang PERHATIAN saat kejadian sungguhan.

  Itu sebabnya BIA dikerjakan sebelum rencana pemulihan:
  ia menentukan urutan menyalakan kembali sistem.

--- empat pilihan penanganan ---
  Hindari  hentikan kegiatannya      tidak lagi menyimpan nomor kartu
  Kurangi  pasang kendali            enkripsi, MFA, tambal celah
  Alihkan  serahkan ke pihak lain    asuransi siber, layanan terkelola
  Terima   sadar dan tidak berbuat   kecil, biayanya tak sepadan

  'Terima' adalah pilihan yang SAH, dan sering yang benar.
  Bedanya dengan mengabaikan cuma satu: keputusan terima
  DITULIS, ditandatangani, dan ditinjau ulang berkala.

  Risiko yang diabaikan tidak punya pemilik. Risiko yang
  diterima punya nama orang di sebelahnya.

--- penanganan mana yang layak ---
  risiko                       rugi   hemat   biaya  putusan
  Kebocoran basis data       300 jt     240     150  KURANGI
  Ransomware                 240 jt     180      90  KURANGI
  Laptop hilang               60 jt      52      20  KURANGI
  Situs profil diretas         3 jt       2      40  terima/alihkan
  Gempa merusak kantor        30 jt      24     400  terima/alihkan

  'rugi' di sini kerugian HARAPAN setahun (peluang x
  kerugian), 'hemat' penurunannya setelah kendali dipasang.

  Baris 'Situs profil diretas' menarik: peluangnya besar
  dan pasti terjadi cepat atau lambat, tetapi kerugiannya
  cuma 10 juta sementara kendalinya 40 juta.

  Memasang kendali di situ bukan kehati-hatian -- ia
  pemborosan, dan uangnya diambil dari risiko lain yang
  lebih besar.

  Baris 'Gempa' juga tidak layak dikurangi sendiri, dan
  di situlah ALIHKAN masuk: asuransi menutup kerugian
  berpeluang kecil tapi berdampak besar dengan biaya
  jauh di bawah membangun sendiri.

--- lima fungsi (kerangka NIST) ---
  Identify  tahu apa yang dimiliki & risikonya
      daftar aset, penilaian risiko
  Protect   cegah kejadiannya
      kendali akses, enkripsi, pelatihan
  Detect    temukan yang lolos
      pemantauan, log, alarm
  Respond   tangani saat terjadi
      prosedur insiden, komunikasi
  Recover   pulihkan keadaan
      cadangan, rencana pemulihan

  fungsi     anggaran lazim  yang disarankan
  Identify               5%              15%
  Protect               70%              35%
  Detect                10%              25%
  Respond               10%              15%
  Recover                5%              10%

  Uang hampir selalu menumpuk di Protect, karena di situ
  produk yang bisa dibeli paling banyak.

  Yang kurang: Detect. Dan itu yang menentukan berapa lama
  penyusup berada di dalam sebelum diketahui.

--- biaya insiden tumbuh selama tidak terdeteksi ---
  seluruh nilai yang bisa hilang : Rp 4.000 juta
  separuhnya tercapai setelah    : 45 hari

  terdeteksi setelah     kerugian  % nilai   rugi/hari
                                            di rentang
  1 hari                    61 jt       2%       61 jt
  7 hari                   408 jt      10%       58 jt
  30 hari                1.480 jt      37%       47 jt
  90 hari                3.000 jt      75%       25 jt
  200 hari               3.816 jt      95%        7 jt

  Kerugiannya TIDAK tumbuh tanpa batas -- ia mendekati
  seluruh nilai yang bisa hilang, lalu berhenti. Setelah
  200 hari, praktis semuanya sudah hilang.

  Kolom terakhir yang menjelaskan kenapa hari-hari AWAL
  paling menentukan: laju kerugiannya turun terus, dari
  61 juta sehari di pekan pertama menjadi 7 juta sehari
  sesudah bulan ketiga.

  Dan turunnya BUKAN karena keadaan membaik, melainkan
  karena sudah tidak banyak lagi yang tersisa untuk
  hilang.

  Selisih deteksi hari ke-7 dan hari ke-30 saja: Rp 1.071 juta.

  Itu nilai dari kemampuan MENDETEKSI, dan angkanya
  biasanya jauh melampaui biaya alat pemantauannya.

  Ini yang membuat MTTD (waktu rata-rata sampai
  terdeteksi) jadi ukuran paling penting -- lebih
  penting daripada jumlah serangan yang ditahan.

--- fase tanggap insiden ---
  1. Persiapan     prosedur, kontak, alat, latihan
      dikerjakan SEBELUM ada insiden
  2. Identifikasi  benarkah ini insiden, seluas apa
      salah menilai di sini merusak sisanya
  3. Pembatasan    hentikan penyebarannya
      cabut jaringan, bukan matikan mesin
  4. Pembasmian    hilangkan penyebabnya
      tambal celah, cabut akses penyusup
  5. Pemulihan     kembalikan layanan, pantau ketat
      pastikan tidak kembali lewat jalan sama
  6. Pelajaran     apa yang diubah supaya tak terulang
      fase yang paling sering dilewati

  Perhatikan fase 3. Naluri pertama: MATIKAN peladennya.

  Itu menghilangkan bukti yang cuma ada di memori --
  proses yang berjalan, sambungan jaringan, kunci
  enkripsi yang sedang dipakai. Semuanya lenyap saat
  daya dicabut.

  Yang benar: PUTUSKAN jaringannya, biarkan mesin hidup.
  Penyebarannya berhenti, buktinya tetap ada.

--- memilih ukuran keamanan ---
  Jumlah serangan diblokir        MENYESATKAN
      naik kalau serangan bertambah, bukan kalau kita membaik
  Jumlah tambalan dipasang        lemah
      banyak tambalan tidak berarti yang penting sudah kena
  MTTD - waktu sampai terdeteksi  BERMAKNA
      langsung menentukan besarnya kerugian
  MTTR - waktu sampai pulih       BERMAKNA
      menentukan lama layanan terhenti
  Cakupan MFA (% akun)            BERMAKNA
      bisa diperiksa, dan langsung menutup jalur utama
  Akun istimewa tanpa pemilik     BERMAKNA
      angkanya harus nol, dan mudah dihitung

  Ujinya satu pertanyaan: kalau angka ini membaik, apakah
  keadaannya PASTI membaik?

  'Serangan diblokir' gagal uji itu -- ia bisa naik karena
  kita dipindai lebih sering, dan turun karena penyerang
  sudah masuk sehingga tidak perlu lagi mengetuk pintu.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Hitung skor risiko tiap aset', waktu: 'O(n)', memori: 'dua perkalian per aset' },
      { operasi: 'Urutkan register risiko', waktu: 'O(n log n)', memori: 'n biasanya puluhan' },
      { operasi: 'Tentukan urutan pemulihan dari BIA', waktu: 'O(p log p)', memori: 'p = jumlah proses bisnis' },
      { operasi: 'Putuskan penanganan tiap risiko', waktu: 'O(n)', memori: 'satu perbandingan hemat vs biaya' },
      { operasi: 'Hitung kerugian pada waktu deteksi', waktu: 'O(1)', memori: 'satu pemangkatan' },
      { operasi: 'Kumpulkan MTD dari pemilik proses', waktu: 'jam sampai hari', memori: 'ini bagian mahalnya' }
    ],
    intuisi: `Seluruh hitungan di topik ini sepele dan bisa dikerjakan di spreadsheet. Yang mahal baris terakhir, dan mahalnya bukan komputasi: **MTD hanya bisa datang dari orang yang menjalankan prosesnya**, dan mendapatkannya menuntut wawancara serta kesediaan orang itu memikirkan pertanyaan yang belum pernah ia pikirkan.

Godaan yang harus dihindari: mengisi MTD sendiri dari sisi TI karena lebih cepat. Hasilnya angka yang tidak ada yang mengakui, dan pada saat insiden angka itu langsung dibantah oleh orang yang prosesnya sedang mati.

Dan perhatikan bahwa kurva kerugian \`O(1)\` itu — satu pemangkatan — adalah hitungan yang mengubah anggaran ratusan juta. Bagian tersulit dari seluruh topik ini bukan menghitungnya, melainkan **memutuskan angka MAKS dan PARUH-nya** secara jujur, lalu bersedia mempertahankannya.`
  },

  kesalahanUmum: [
    {
      salah: 'Memodelkan kerugian insiden sebagai pertumbuhan berganda tanpa batas.',
      kenapa: 'Kerugian tidak bisa melampaui seluruh nilai yang dimiliki, sehingga model tanpa batas menghasilkan angka yang mustahil dan langsung kehilangan kredibilitas. Bentuk yang benar menjenuh, mendekati nilai maksimum lalu melandai.',
      benar: 'Pakai model penjenuhan dengan batas atas berupa seluruh nilai yang bisa hilang, dan sebutkan andaian angkanya secara terbuka.'
    },
    {
      salah: 'Menentukan urutan pemulihan dari total kerugian pada MTD tiap proses.',
      kenapa: 'Total kerugian pada MTD mencampur laju kerugian dengan lama toleransi, sehingga proses berlaju rendah dengan MTD panjang bisa terlihat lebih besar. Urutan pemulihan ditentukan laju kerugian, karena jam pertama yang diberikan ke proses berlaju tertinggi menghemat paling banyak.',
      benar: 'Urutkan pemulihan berdasarkan kerugian per jam, dan pakai MTD sebagai tenggat yang tidak boleh dilewati.'
    },
    {
      salah: 'Mematikan peladen saat insiden ditemukan untuk menghentikan kerusakan.',
      kenapa: 'Mencabut daya menghapus seluruh bukti yang hanya ada di memori, yaitu proses yang berjalan, sambungan jaringan aktif, perkakas yang tidak menyentuh cakram, dan kunci enkripsi yang sedang dipakai. Penyelidikan sesudahnya kehilangan hampir semua yang bisa menjelaskan apa yang terjadi.',
      benar: 'Putuskan jaringannya dan biarkan mesin tetap hidup, lalu ambil citra memori sebelum tindakan lain.'
    },
    {
      salah: 'Memasang kendali untuk risiko yang paling sering terjadi lebih dulu.',
      kenapa: 'Frekuensi tinggi tidak berarti kerugian besar, dan anggaran yang terpakai di situ diambil dari risiko lain yang kerugian harapannya jauh lebih besar. Kehati-hatian yang tidak dihitung memindahkan risiko alih-alih menguranginya.',
      benar: 'Bandingkan penghematan kerugian harapan dengan biaya kendali untuk tiap risiko, lalu kerjakan yang selisihnya terbesar.'
    },
    {
      salah: 'Memperlakukan keputusan menerima risiko sebagai kelalaian yang harus dihindari.',
      kenapa: 'Sebagian risiko memang tidak layak dikurangi karena biaya kendalinya melampaui penghematannya, dan memaksakan kendali di situ membuang anggaran. Yang membedakan menerima dari mengabaikan adalah pencatatan, kepemilikan, dan peninjauan berkala.',
      benar: 'Tulis keputusan menerima beserta alasan, nama pemilik risikonya, dan tanggal peninjauan berikutnya.'
    },
    {
      salah: 'Memakai jumlah serangan yang berhasil diblokir sebagai ukuran keberhasilan keamanan.',
      kenapa: 'Angka itu naik ketika serangan bertambah meski keadaan tidak berubah, dan turun ketika penyerang sudah masuk sehingga tidak perlu lagi mencoba dari luar. Ukuran yang bergerak ke arah sama untuk dua keadaan berlawanan tidak memberi informasi.',
      benar: 'Pakai ukuran yang lulus uji arah, yaitu MTTD, MTTR, cakupan MFA, dan jumlah akun istimewa tanpa pemilik.'
    },
    {
      salah: 'Mengisi angka MTD dari sisi TI karena lebih cepat daripada mewawancarai pemilik proses.',
      kenapa: 'MTD adalah pernyataan tentang toleransi bisnis, bukan tentang kemampuan teknis, sehingga angka yang diisi TI tidak diakui oleh siapa pun. Pada saat insiden angka itu langsung dibantah oleh orang yang prosesnya sedang mati, dan seluruh rencana pemulihan kehilangan dasarnya.',
      benar: 'Kumpulkan MTD lewat wawancara dengan pemilik tiap proses dan catat siapa yang menyetujui angkanya.'
    }
  ],

  analogi: `Bayangkan kamu mengelola sebuah **gudang bahan makanan**.

**Daftar aset.** Kamu mencatat isi gudang. Beras, minyak, gula, mesin pendingin.

Yang tidak kamu catat: **kunci cadangan** yang digantung di belakang pintu, dan gudang kecil di belakang yang dipakai menyimpan barang sisa.

Enam bulan kemudian, barang hilang lewat gudang kecil itu. Ia tidak pernah dijaga — bukan karena diabaikan, tapi karena **tidak ada di daftar siapa pun**.

**Nilai, ancaman, kelemahan.** Tumpukan gula di ruang berkunci punya nilai tinggi, ancaman rendah, kelemahan rendah.

Karung beras di dekat pintu belakang yang rusak punya nilai tinggi, ancaman tinggi, **dan kelemahan tinggi**.

Kalau kamu mengurutkan cuma dari "seberapa sering ada yang mencoba masuk", pintu depan yang selalu diketuk orang akan menang. Padahal yang hilang lewat pintu belakang.

**Sekarang MTD.**

Kalau mesin pendingin mati, berapa lama sebelum rugi? Untuk daging, **empat jam**. Untuk beras, **berbulan-bulan** — beras tidak peduli.

Itu MTD, dan ia datang dari **sifat barangnya**, bukan dari tukang servisnya. Tukang servis yang menetapkan sendiri "empat hari cukup" sedang menebak tentang sesuatu yang bukan bidangnya.

Dan perhatikan bedanya dengan **urutan menyalakan kembali**. Kalau listrik pulih sebagian dan kamu cuma bisa menyalakan satu ruangan dulu, kamu menyalakan **ruang daging** — bukan karena MTD-nya pendek saja, tapi karena kerugiannya **per jam** paling besar.

Dua angka, dua kegunaan. Yang satu tenggat, yang lain urutan.

**Sekarang empat cara menangani.**

Pintu belakang rusak. Pilihanmu:

- **hindari** — berhenti memakai gudang belakang sama sekali
- **kurangi** — perbaiki pintunya
- **alihkan** — asuransikan isinya
- **terima** — biarkan, karena isinya cuma karung kosong

Keempatnya sah. Yang salah cuma satu: **membiarkan tanpa memutuskan**, sehingga tidak ada yang tahu apakah itu keputusan atau kelalaian.

Bedanya "terima" dari "abai": pada yang pertama, ada catatan bertanggal dengan namamu di sebelahnya, dan pengingat untuk memeriksa lagi tiga bulan lagi. Kalau nanti gudang belakang dipakai menyimpan barang mahal, catatan itu **muncul kembali**.

**Terakhir, dan ini yang paling penting.**

Ada yang mengambil satu karung tiap pekan.

Kalau kamu menghitung stok **setiap pekan**, kamu tahu setelah satu karung.

Kalau kamu menghitung stok **setahun sekali**, kamu tahu setelah lima puluh karung.

Perhatikan bahwa kunci pintumu sama bagusnya di kedua keadaan. Yang berbeda cuma **seberapa cepat kamu tahu**.

Dan sekarang bagian yang mengejutkan: kalau ia sudah mengambil lima puluh karung, kerugian **per pekan** justru mengecil — bukan karena ia berhenti, tapi karena **gudangnya sudah hampir kosong**.

Kerugian yang melandai bukan tanda keadaan membaik. Ia tanda tidak banyak lagi yang tersisa.

Itu sebabnya uang untuk **menghitung stok lebih sering** hampir selalu lebih berharga daripada uang untuk **kunci yang lebih bagus** — dan hampir selalu yang dibeli kuncinya, karena kunci ada tokonya dan menghitung stok tidak.`,

  latihan: [
    'Daftar seluruh aset satu organisasi nyata, lalu tunjukkan dua aset yang hampir kamu lewatkan dan jelaskan kenapa mudah terlewat.',
    'Susun register risiko dengan tiga faktor yang dikalikan untuk delapan aset, lalu periksa apakah sebaran levelnya benar-benar memisahkan.',
    'Tunjukkan satu aset berancaman rendah yang skornya tinggi, dan satu berancaman tinggi yang skornya rendah, lalu jelaskan keduanya.',
    'Wawancarai pemilik tiga proses bisnis untuk mendapatkan MTD-nya, lalu catat siapa yang menyetujui setiap angka.',
    'Tentukan urutan pemulihan dari rugi per jam, lalu tunjukkan satu proses yang urutannya berbeda bila dihitung dari total rugi di MTD.',
    'Hitung penghematan kerugian harapan dan biaya kendali untuk lima risiko, lalu putuskan penanganan masing-masing.',
    'Cari satu risiko di daftarmu yang peluangnya besar tetapi tidak layak dikurangi, lalu jelaskan dari mana anggarannya akan diambil bila dipaksakan.',
    'Bangun kurva kerugian penjenuhan untuk organisasimu, lalu hitung nilai memangkas waktu deteksi dari tiga puluh hari ke tujuh hari.',
    'Tulis prosedur tanggap insiden satu halaman, lalu latih sekali dengan skenario tertulis dan catat apa yang ternyata tidak berjalan.',
    'Ambil lima ukuran keamanan yang dipakai di satu tempat, lalu uji masing-masing dengan pertanyaan apakah membaiknya angka pasti berarti membaiknya keadaan.'
  ]
});
