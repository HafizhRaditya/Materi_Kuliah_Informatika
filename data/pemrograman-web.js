/* ============================================================
   pemrograman-web.js — materi Pemrograman Web 1 (Semester 3)

   Disusun dari berkas kuliah sendiri:
     - Tugas Menginstall CI_*.docx  pemasangan CodeIgniter 4 lewat
                                    Composer di Laragon, lalu
                                    php spark serve
     - Tugas Pemweb Pertemuan 4_*.docx
     - LearnConnect.pptx            projek kelompok
     - Praktikum Pemograman Web 1/  latihan HTML, CSS, form, tabel,
                                    hyperlink, dan JavaScript

   Bagian HTML, CSS, dan JavaScript SENGAJA TIDAK diulang di sini,
   karena sudah dibahas tuntas di mata kuliah Web Desain semester 2.
   Materi ini fokus pada yang membedakan Pemrograman Web 1: sisi
   SERVER — PHP, pola MVC, dan framework CodeIgniter 4.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Kode".

   Tiga topik tambahan (anatomi HTTP, form & pola PRG, unggah
   berkas yang aman) disusun dari REFERENSI LUAR -- keterangan
   lengkapnya ada di kepala bagian tambahan di bawah.
   ============================================================ */

TOPICS.push({
  id: 'pemweb-php-dasar',
  judul: 'PHP & Pemrograman Sisi Server',
  kategori: 'pemrograman-web',
  tag: ['PHP', 'server-side', 'GET', 'POST', 'superglobal', 'session'],
  ringkas: 'Kode yang berjalan di server sebelum halaman dikirim — dan kenapa itu mengubah segalanya soal keamanan.',

  fungsi: `**Membuat halaman yang isinya berubah menurut data, bukan tetap seperti HTML biasa.**

Terpakai di:

- **Setiap aplikasi web** yang menyimpan data — pendaftaran, katalog, laporan
- **Menghubungkan halaman dengan basis data**
- **Menangani formulir** — menerima, memvalidasi, menyimpan
- **Sesi dan autentikasi** — mengingat siapa yang sedang masuk

Yang paling perlu dipahami sejak awal, dan sering keliru: **kode sisi peladen berjalan sebelum halaman sampai ke peramban.**

Pengguna **tidak pernah** melihat kode PHP-mu — ia hanya melihat hasilnya. Karena itu validasi di JavaScript bisa dilewati, sedangkan validasi di PHP tidak.

Dan sebaliknya: apa pun yang kamu tulis ke halaman **pasti terlihat**, termasuk komentar dan data yang tidak sengaja ikut tercetak.`,

  praktik: {
    tujuan: `Kamu punya halaman PHP yang menerima formulir, memvalidasi masukannya di sisi peladen, dan menyimpannya ke basis data dengan aman.`,
    alat: [
      'XAMPP, Laragon, atau PHP built-in server',
      'Peramban',
      'MySQL atau SQLite'
    ],
    langkah: [
      { judul: 'Jalankan peladen tanpa memasang apa pun berat',
        isi: `PHP punya peladen bawaan: \`php -S localhost:8000\` di folder proyekmu.

Cukup untuk belajar dan mengembangkan. XAMPP atau Laragon baru diperlukan kalau kamu butuh MySQL sekalian.` },
      { judul: 'Buktikan kode berjalan di peladen',
        isi: `Buat halaman yang mencetak waktu sekarang, lalu buka **View Source** di peramban.

Kamu akan melihat **hasilnya** saja — tag \`<?php\` tidak ada di sana.

Ini bukti langsung bahwa kodenya dijalankan sebelum dikirim, dan penjelasan terbaik tentang apa arti "sisi peladen".` },
      { judul: 'Terima formulir dengan metode yang tepat',
        isi: `- **GET** untuk pencarian dan penyaringan — bisa di-bookmark dan dibagikan
- **POST** untuk yang **mengubah data** — pendaftaran, penyuntingan, penghapusan

Jangan pernah memakai GET untuk mengubah data. Ia bisa terpanggil ulang oleh peramban, terekam di riwayat, dan terlihat di log peladen.` },
      { judul: 'Validasi ulang di sisi peladen',
        isi: `Apa pun yang kamu periksa di JavaScript, **periksa lagi** di PHP.

Siapa pun bisa mematikan JavaScript atau mengirim permintaan langsung tanpa peramban.

Pakai \`filter_var($email, FILTER_VALIDATE_EMAIL)\` dan pemeriksaan panjang, bukan menulis pola sendiri.` },
      { judul: 'Jinakkan keluaran',
        isi: `Setiap data yang berasal dari pengguna dan ditampilkan kembali harus dilewatkan \`htmlspecialchars\`.

Buktikan: kirim \`<b>tebal</b>\` lewat formulir dan lihat apakah ia tampil tebal atau sebagai teks.

Kalau tampil tebal, halamanmu rentan XSS.` },
      { judul: 'Pakai sesi untuk mengingat pengguna',
        isi: `- \`session_start()\` di paling atas, **sebelum keluaran apa pun**
- \`$_SESSION['user_id'] = $id;\` setelah berhasil masuk
- periksa keberadaannya di tiap halaman yang butuh login

Galat "headers already sent" hampir selalu berarti ada spasi atau keluaran sebelum \`session_start\`.` },
      { judul: 'Pisahkan berkas konfigurasi',
        isi: `Simpan kredensial basis data di berkas terpisah yang **tidak** masuk Git.

Tambahkan ke \`.gitignore\`, dan sediakan \`config.contoh.php\` berisi nama variabelnya saja.

Ini kebiasaan yang mencegah kebocoran paling sering terjadi.` }
    ],
    cek: [
      'View Source tidak menampilkan satu pun tag PHP',
      'Formulirmu menolak data tidak sah meski JavaScript dimatikan',
      'Masukan berisi tag HTML ditampilkan sebagai teks, bukan dijalankan'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
Di Web Desain kamu menulis **HTML, CSS, dan JavaScript** — semuanya berjalan di **peramban pengguna**. Itu disebut **sisi klien**.

**PHP berjalan di sisi server.** Bedanya menentukan hampir segalanya.

**Apa yang sebenarnya terjadi**

- Peramban meminta \`/produk.php\`
- **Server menjalankan** kode PHP-nya
- PHP menghasilkan **HTML biasa**
- **HTML itu** yang dikirim ke peramban

Perhatikan akibatnya: **pengguna tidak pernah melihat kode PHP-mu.** Yang sampai ke peramban hanya hasilnya. Klik kanan lalu *View Source* tidak akan menampilkan satu baris PHP pun.

Inilah yang membuat PHP bisa dipercaya untuk hal yang tidak boleh dipercayakan ke JavaScript: **kata sandi basis data, kunci API, dan aturan yang tidak boleh dilanggar.**

Ini melanjutkan langsung prinsip dari topik Keamanan Informasi: **pemeriksaan di sisi klien untuk kenyamanan, pemeriksaan di sisi server untuk jaminan.**

**Sintaks dasar**

- Kode dibungkus **\`<?php ... ?>\`**
- Setiap pernyataan diakhiri **titik koma**
- Variabel selalu berawalan **\`$\`**, dan **peka huruf besar-kecil**
- Tipe datanya **dinamis** — tidak perlu dideklarasikan
- Penyambung teks memakai **titik**, bukan plus

Titik sebagai penyambung sering menjebak orang yang terbiasa JavaScript. Di PHP, \`"a" + "b"\` bukan penyambungan.

**Superglobal**

Variabel bawaan yang bisa diakses dari mana saja:

- **\`$_GET\`** — data dari parameter URL
- **\`$_POST\`** — data dari form yang dikirim dengan metode POST
- **\`$_SESSION\`** — data yang bertahan antar-permintaan
- **\`$_COOKIE\`** — data yang tersimpan di peramban
- **\`$_FILES\`** — berkas yang diunggah
- **\`$_SERVER\`** — keterangan tentang permintaan dan server

**GET dan POST — kapan memakai yang mana**

- **GET** — data ada di URL, terlihat, bisa di-bookmark, panjangnya terbatas. Untuk **mengambil** data: pencarian, penyaringan, halaman.
- **POST** — data di badan permintaan, tidak terlihat di URL, panjangnya jauh lebih longgar. Untuk **mengubah** data: login, pendaftaran, penyimpanan.

Aturannya: **GET tidak boleh mengubah apa pun.** Kalau sebuah tautan menghapus data, mesin pencari yang menjelajahi situsmu bisa **menghapus seluruh isinya** tanpa niat jahat.

**HTTP tidak punya ingatan**

Setiap permintaan HTTP berdiri sendiri; server **tidak mengingat** siapa kamu dari permintaan sebelumnya. **Session** dipakai untuk menambal ini: server menyimpan data di sisinya, lalu memberi pengunjung sebuah **ID sesi** lewat cookie.

**Tiga bahaya yang harus disadari sejak awal**

- **SQL injection** — masukan pengguna disambung mentah ke kueri. Sudah dibahas di topik DCL Basis Data. Penyelesaiannya **prepared statement**.
- **XSS** — masukan pengguna ditampilkan mentah sebagai HTML. Penyelesaiannya **\`htmlspecialchars()\`** saat menampilkan.
- **Menyimpan sandi apa adanya** — pakai **\`password_hash()\`** dan **\`password_verify()\`**, yang memakai bcrypt.

Ketiganya adalah penerapan langsung dari yang kamu pelajari di Basis Data dan PTI.
`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: '<?php\n// Kode ini berjalan di SERVER. Pengguna tidak pernah melihatnya.\n$sandi_db = "rahasia123";      // aman -- tidak ikut terkirim\n$nama = "Hafizh";\n\n// Yang SAMPAI ke peramban hanya hasilnya:\necho "<h1>Halo " . $nama . "</h1>";\n// -> <h1>Halo Hafizh</h1>\n?>\n\n<!-- Bandingkan: JavaScript berjalan di PERAMBAN.\n     Apa pun yang ditulis di sana BISA DIBACA siapa saja. -->',
      penjelasan: `
Perbedaan tempat berjalan inilah yang menentukan **apa yang boleh kamu percayakan** ke masing-masing.

Variabel \`$sandi_db\` di atas **tidak pernah meninggalkan server**. Ia dipakai untuk menyambung ke basis data, lalu dibuang saat permintaan selesai. Pengguna yang membuka *View Source* hanya melihat \`<h1>Halo Hafizh</h1>\` — tidak ada jejak PHP sama sekali.

Bandingkan dengan menaruh sandi yang sama di JavaScript: **siapa pun bisa membacanya** dalam tiga detik.

Perhatikan **penyambungan memakai titik**, bukan plus:

\`"<h1>Halo " . $nama . "</h1>"\`

Ini menjebak orang yang terbiasa JavaScript. Di PHP, tanda plus **selalu berarti penjumlahan angka**. Menulis \`"5" + "3"\` menghasilkan **8**, bukan \`"53"\`.

PHP juga punya **interpolasi**: variabel di dalam **kutip ganda** langsung diganti nilainya, sehingga \`"Halo $nama"\` bekerja. Tetapi di dalam **kutip tunggal**, tidak — \`'Halo $nama'\` menghasilkan teks apa adanya. Pembedaan ini sering jadi sumber bug yang membingungkan.

Sekarang bahaya yang perlu disadari sejak baris pertama: \`echo\` menuliskan isinya **sebagai HTML**. Kalau \`$nama\` berasal dari pengguna dan berisi \`<script>\`, tag itu **akan berjalan** di peramban pengunjung lain.

Itulah **XSS**, dan penyelesaiannya membungkusnya:

\`echo htmlspecialchars($nama);\`

Fungsi itu mengubah \`<\` menjadi \`&lt;\` sehingga ditampilkan sebagai teks, bukan dijalankan sebagai tag. **Aturannya: keluarkan apa pun yang berasal dari pengguna lewat htmlspecialchars, tanpa pengecualian.**
`
    }
  ],

  kode: {
    php: String.raw`<?php
// ============================================
// PHP dasar: yang berjalan di SISI SERVER
// ============================================

// ---------- Variabel & tipe dinamis ----------
$nama   = "Hafizh";          // string
$umur   = 19;                 // int
$ipk    = 3.75;               // float
$aktif  = true;               // bool
$matkul = ["Alpro", "Basdat", "Pemweb"];   // array

// Penyambung teks: TITIK, bukan plus
echo "Nama: " . $nama . ", umur: " . $umur . "\n";

// Interpolasi hanya berlaku di kutip GANDA
echo "Halo $nama\n";          // -> Halo Hafizh
echo 'Halo $nama' . "\n";     // -> Halo $nama  (apa adanya)

// JEBAKAN: plus SELALU penjumlahan angka
echo "5" + "3";               // -> 8, BUKAN "53"
echo "\n";
echo "5" . "3";               // -> 53
echo "\n";


// ---------- Array asosiatif ----------
$mahasiswa = [
    "nim"  => "H1D024061",
    "nama" => "Hafizh Naufal Raditya",
    "ipk"  => 3.75,
];

foreach ($mahasiswa as $kunci => $nilai) {
    echo str_pad($kunci, 6) . ": " . $nilai . "\n";
}


// ---------- Fungsi dengan tipe ----------
function hitungPredikat(float $ipk): string
{
    if ($ipk >= 3.51) {
        return "Cum Laude";
    } elseif ($ipk >= 3.01) {
        return "Sangat Memuaskan";
    }
    return "Memuaskan";
}

echo "Predikat: " . hitungPredikat($ipk) . "\n";


// ============================================
// Menerima data dari pengguna
// ============================================

// GET  -> dari URL:  /cari.php?kata=basis+data
// POST -> dari form dengan method="post"

// SELALU periksa keberadaannya dulu -- kalau tidak,
// akan muncul warning "Undefined array key"
$kata = $_GET['kata'] ?? '';        // ?? = null coalescing

// ---------- TIGA aturan keamanan ----------

// 1. XSS: apa pun dari pengguna, keluarkan lewat htmlspecialchars
echo "Kamu mencari: " . htmlspecialchars($kata) . "\n";
// tanpa ini, <script>alert(1)</script> akan BERJALAN

// 2. SQL injection: pakai prepared statement, jangan sambung teks
//
//    SALAH -- masukan disambung mentah:
//    $sql = "SELECT * FROM produk WHERE nama = '" . $kata . "'";
//
//    BENAR -- nilai dikirim terpisah dari perintahnya:
$pdo  = new PDO("mysql:host=localhost;dbname=toko", "app_baca", "sandi");
$stmt = $pdo->prepare("SELECT * FROM produk WHERE nama = ?");
$stmt->execute([$kata]);
$hasil = $stmt->fetchAll();

// 3. Sandi: JANGAN pernah disimpan apa adanya
$hash = password_hash("rahasia123", PASSWORD_DEFAULT);   // bcrypt
$cocok = password_verify("rahasia123", $hash);
echo "Sandi cocok: " . ($cocok ? "ya" : "tidak") . "\n";


// ============================================
// Session: menambal HTTP yang tidak punya ingatan
// ============================================
session_start();

// Menyimpan setelah login berhasil
$_SESSION['nim']  = "H1D024061";
$_SESSION['peran'] = "mahasiswa";

// Memeriksa di halaman lain
if (isset($_SESSION['nim'])) {
    echo "Sudah login sebagai " . htmlspecialchars($_SESSION['nim']) . "\n";
} else {
    echo "Belum login\n";
}

// Logout
// session_destroy();
?>`,

    html: String.raw`<!-- Form: GET untuk MENGAMBIL, POST untuk MENGUBAH -->

<!-- GET: data tampil di URL, bisa di-bookmark, bisa dibagikan.
     Cocok untuk pencarian. -->
<form action="cari.php" method="get">
  <input type="text" name="kata" placeholder="Cari produk" />
  <button type="submit">Cari</button>
</form>
<!-- menghasilkan: /cari.php?kata=laptop -->


<!-- POST: data di badan permintaan, tidak tampil di URL.
     WAJIB untuk apa pun yang mengubah data. -->
<form action="login.php" method="post">
  <label for="nim">NIM</label>
  <input type="text" id="nim" name="nim" required />

  <label for="sandi">Kata sandi</label>
  <input type="password" id="sandi" name="sandi" required />

  <button type="submit">Masuk</button>
</form>


<!-- YANG TIDAK BOLEH: tautan yang MENGHAPUS.
     Mesin pencari yang menjelajahi situsmu akan
     mengikuti setiap tautan -- dan menghapus semuanya. -->
<!-- <a href="hapus.php?id=5">Hapus</a>   <- BAHAYA -->

<!-- Yang benar: form POST -->
<form action="hapus.php" method="post">
  <input type="hidden" name="id" value="5" />
  <button type="submit">Hapus</button>
</form>`
  },

  output: `Nama: Hafizh, umur: 19
Halo Hafizh
Halo $nama
8
53
nim   : H1D024061
nama  : Hafizh Naufal Raditya
ipk   : 3.75
Predikat: Cum Laude
Kamu mencari:
Sandi cocok: ya
Sudah login sebagai H1D024061


Yang dilihat pengguna saat View Source:

  <h1>Halo Hafizh</h1>

  Tidak ada satu baris PHP pun. Sandi basis data,
  kunci API, dan logika bisnis TIDAK PERNAH terkirim.

  Bandingkan dengan JavaScript, yang seluruh isinya
  bisa dibaca siapa saja dalam tiga detik.`,

  kesalahanUmum: [
    {
      salah: 'Memakai tanda plus untuk menyambung teks, seperti di JavaScript.',
      kenapa: 'Di PHP, plus selalu berarti penjumlahan angka. Menulis "5" + "3" menghasilkan 8, bukan "53". Kalau salah satu bukan angka, PHP versi baru melempar TypeError sedangkan versi lama diam-diam mengubahnya jadi nol, sehingga hasilnya salah tanpa peringatan.',
      benar: 'Pakai titik untuk menyambung teks, atau manfaatkan interpolasi di dalam kutip ganda.'
    },
    {
      salah: 'Menampilkan masukan pengguna langsung dengan echo tanpa htmlspecialchars.',
      kenapa: 'Isi yang dimasukkan diperlakukan sebagai HTML, sehingga tag script di dalamnya ikut berjalan di peramban pengunjung lain. Inilah celah XSS, dan penyerang bisa mencuri sesi lewat kolom komentar atau nama profil.',
      benar: 'Bungkus setiap keluaran yang berasal dari pengguna dengan htmlspecialchars, tanpa pengecualian.'
    },
    {
      salah: 'Memakai tautan biasa untuk aksi yang menghapus atau mengubah data.',
      kenapa: 'GET seharusnya tidak mengubah apa pun. Mesin pencari dan pemuat awal peramban akan mengikuti setiap tautan yang ditemukannya, sehingga seluruh data bisa terhapus tanpa ada manusia yang mengkliknya. Ini pernah terjadi pada aplikasi nyata.',
      benar: 'Pakai form dengan metode POST untuk setiap aksi yang mengubah data, dan tambahkan token CSRF.'
    },
    {
      salah: 'Menyambung masukan pengguna langsung ke dalam kueri SQL.',
      kenapa: 'Masukan yang memuat tanda kutip bisa mengubah struktur kueri, sehingga penyerang dapat membaca atau menghapus seluruh basis data. Ini persis celah yang dibahas di topik DCL pada Basis Data, dan PHP adalah tempat ia paling sering muncul.',
      benar: 'Pakai prepared statement dengan tanda tanya sebagai penampung, lalu kirim nilainya lewat execute. Nilai tidak akan pernah dibaca sebagai perintah.'
    },
    {
      salah: 'Mengakses $_GET atau $_POST tanpa memeriksa keberadaannya.',
      kenapa: 'Kalau parameternya tidak ada, PHP memunculkan warning Undefined array key dan nilainya null. Pada halaman yang mengandalkan nilai itu, alurnya jadi tidak terduga, dan pesan warning yang bocor ke halaman bisa membocorkan jalur berkas di server.',
      benar: 'Pakai operator null coalescing untuk memberi nilai bawaan, misalnya $_GET dengan tanda tanya ganda diikuti string kosong.'
    }
  ],

  analogi: `Bayangkan restoran dengan **dapur tertutup**.

**JavaScript** adalah **meja saji di ruang makan**. Semua yang kamu taruh di situ terlihat pelanggan. Kalau kamu menempelkan resep rahasia di meja itu, siapa pun bisa memotretnya.

**PHP** adalah **dapurnya**. Pelanggan tidak pernah masuk. Yang keluar dari sana **hanya piring berisi makanan** — bukan resepnya, bukan daftar pemasoknya, bukan kombinasi brankasnya.

Itulah kenapa kata sandi basis data boleh berada di PHP tetapi **tidak boleh** di JavaScript.

Sekarang **GET dan POST**:

- **GET** adalah **bertanya lewat papan pengumuman** — pertanyaanmu tertulis di depan, terbaca semua orang, dan bisa difoto lalu ditanyakan ulang persis sama. Cocok untuk *"tunjukkan menu ayam"*.
- **POST** adalah **menyerahkan formulir tertutup** ke pelayan. Tidak terpampang, dan tidak dimaksudkan untuk diulang begitu saja.

Dan aturan **GET tidak boleh mengubah apa pun** punya alasan yang mengerikan kalau dilanggar. Bayangkan kamu menulis di papan pengumuman: *"tekan tombol ini untuk membatalkan pesanan nomor 5"*.

Lalu datang **petugas sensus** yang tugasnya mendatangi setiap papan pengumuman di kota dan mencatat isinya — dan untuk mencatat, dia menekan setiap tombol yang dilihatnya.

Petugas itu adalah **mesin pencari**. Dan dalam semalam, seluruh pesanan restoranmu **dibatalkan** — tanpa satu pun manusia yang berniat jahat.

Terakhir, **session**: pelayan restoran punya ingatan seburuk ikan. Setiap kali kamu memanggilnya, dia **lupa siapa kamu**. Session adalah **nomor meja** yang diberikan saat kamu datang — kamu cukup menyebut nomornya, dan pelayan membuka catatan tentangmu.`,

  latihan: [
    'Jelaskan perbedaan kode sisi klien dan sisi server, lalu jelaskan kenapa kata sandi basis data boleh ada di PHP tetapi tidak boleh di JavaScript.',
    'Tuliskan skrip PHP yang menerima nama lewat GET lalu menampilkannya dengan aman. Jelaskan apa yang terjadi tanpa htmlspecialchars.',
    'Jelaskan kapan memakai GET dan kapan POST, lalu jelaskan bahaya nyata dari memakai tautan GET untuk menghapus data.',
    'Tuliskan kueri PHP yang mencari produk berdasarkan masukan pengguna, sekali dengan penyambungan mentah dan sekali dengan prepared statement. Tunjukkan masukan yang membobol versi pertama.',
    'Jelaskan kenapa HTTP disebut tidak punya ingatan, dan bagaimana session menambalnya. Sebutkan apa yang disimpan di server dan apa yang disimpan di peramban.',
    'Jelaskan perbedaan hasil "5" + "3" dan "5" . "3" di PHP, lalu jelaskan kenapa kebiasaan dari JavaScript sering menyebabkan bug di sini.'
  ]
});

TOPICS.push({
  id: 'pemweb-mvc',
  judul: 'Pola MVC',
  kategori: 'pemrograman-web',
  tag: ['MVC', 'model', 'view', 'controller', 'pemisahan tanggung jawab'],
  ringkas: 'Memisahkan data, tampilan, dan pengatur — supaya mengubah satu tidak merusak yang lain.',

  fungsi: `**Memisahkan tampilan, data, dan alur supaya tidak bercampur jadi satu berkas raksasa.**

Terpakai di:

- **Setiap kerangka kerja web** — Laravel, CodeIgniter, Django, Rails, Spring
- **Kerja kelompok** — satu orang mengerjakan tampilan, yang lain logika, tanpa bentrok
- **Mengubah tampilan tanpa menyentuh logika** — dan sebaliknya
- **Pengujian** — logika yang terpisah dari tampilan bisa diuji sendiri

Yang paling terasa manfaatnya: **kamu tahu harus membuka berkas mana.**

Tanpa pemisahan, mencari tempat mengubah perhitungan diskon berarti menyisir semua berkas. Dengan MVC, ia ada di Model — dan cuma di situ.

Kesalahan yang paling sering: **menaruh logika bisnis di Controller**. Controller seharusnya tipis; ia mengarahkan, bukan menghitung.`,

  praktik: {
    tujuan: `Kamu bisa memecah aplikasi satu berkas menjadi struktur MVC, dan tahu apa yang boleh dan tidak boleh ada di tiap bagian.`,
    alat: [
      'PHP',
      'Satu proyek lamamu yang masih satu berkas'
    ],
    langkah: [
      { judul: 'Ambil satu berkas lamamu yang bercampur',
        isi: `Cari berkas yang di dalamnya ada koneksi basis data, kueri, perhitungan, **dan** HTML sekaligus.

Hampir setiap mahasiswa punya satu. Itulah yang akan kita pecah.` },
      { judul: 'Tandai tiap baris dengan huruf',
        isi: `Beri tanda di setiap bagian: **M** untuk yang menyentuh data, **V** untuk yang menghasilkan HTML, **C** untuk yang mengatur alur.

Tandai dulu di kertas atau lewat komentar sebelum memindahkan apa pun. Ini membuat pemecahannya jauh lebih mudah.` },
      { judul: 'Pindahkan Model lebih dulu',
        isi: `Buat berkas terpisah berisi kelas yang mengurus tabelmu, dengan method seperti \`ambilSemua\`, \`cari\`, dan \`simpan\`.

Aturannya: **Model tidak boleh mencetak apa pun**. Ia mengembalikan data, bukan menampilkannya.` },
      { judul: 'Pindahkan View',
        isi: `View hanya berisi HTML dan perulangan sederhana untuk menampilkan data.

Aturannya: **View tidak boleh menyentuh basis data**. Kalau kamu menemukan kueri di dalam View, itu tanda pemecahannya belum selesai.

Selalu lewatkan data lewat variabel dari Controller.` },
      { judul: 'Jaga Controller tetap tipis',
        isi: `Controller cuma: menerima permintaan, memanggil Model, lalu memilih View.

Kalau Controller-mu lebih dari sekitar dua puluh baris per aksi, biasanya ada logika yang seharusnya pindah ke Model.` },
      { judul: 'Uji Model tanpa peramban',
        isi: `Tulis skrip PHP kecil yang memanggil Model-mu langsung dari baris perintah dan mencetak hasilnya.

Kalau berhasil, berarti Model-mu benar-benar terpisah — dan itu bukti pemecahanmu berhasil.

Kalau ia menuntut sesi atau variabel permintaan, ia masih tercampur.` },
      { judul: 'Cegah View diakses langsung',
        isi: `Taruh berkas View di luar folder publik, atau tambahkan pemeriksaan di atasnya agar tidak bisa dibuka langsung lewat URL.

Tanpa itu, seseorang bisa memanggil View tanpa melewati Controller — dan variabel yang seharusnya ada menjadi kosong.` }
    ],
    cek: [
      'Model-mu bisa dipanggil dan diuji dari baris perintah tanpa peramban',
      'Tidak ada kueri basis data di dalam berkas View',
      'Tiap aksi Controller-mu kurang dari sekitar dua puluh baris'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa dipisah begitu',

  konsep: `
Coba bayangkan satu berkas PHP yang memuat semuanya: sambungan basis data, kueri SQL, logika bisnis, dan tag HTML — semuanya bercampur.

Untuk halaman kecil, itu bekerja. Untuk aplikasi sungguhan, ia menjadi tidak terurus:

- Mengubah tampilan berisiko merusak kueri
- Kueri yang sama disalin ke banyak berkas
- Dua orang tidak bisa mengerjakan berkas yang sama
- Menguji logika mustahil tanpa menjalankan seluruh halaman

**MVC** memisahkannya menjadi tiga bagian dengan tanggung jawab yang tegas.

**Tiga bagiannya**

- **Model** — mengurus **data**. Menyambung basis data, menjalankan kueri, dan menegakkan aturan tentang data. **Tidak tahu apa-apa soal HTML.**
- **View** — mengurus **tampilan**. Menerima data yang sudah jadi lalu menampilkannya. **Tidak melakukan kueri.**
- **Controller** — **pengatur lalu lintas**. Menerima permintaan, meminta data ke Model, memilih View, lalu menyerahkan datanya.

**Alurnya**

- Pengguna meminta sebuah alamat
- **Router** menentukan Controller mana yang menanganinya
- **Controller** meminta data ke **Model**
- **Model** mengambilnya dari basis data lalu mengembalikannya
- **Controller** menyerahkan data itu ke **View**
- **View** menghasilkan HTML
- HTML dikirim ke peramban

Perhatikan bahwa **Model dan View tidak pernah bicara langsung**. Semuanya lewat Controller.

**Kenapa pemisahan ini berguna**

- **Mengubah tampilan tidak menyentuh logika.** Perancang bisa menyunting View tanpa risiko merusak kueri.
- **Kueri ditulis sekali.** Satu Model dipakai banyak Controller.
- **Bisa dikerjakan bersamaan.** Satu orang di Model, satu di View.
- **Bisa diuji.** Logika di Model diuji tanpa perlu menjalankan halaman.
- **Satu Model, banyak tampilan.** Data yang sama bisa disajikan sebagai HTML, JSON untuk aplikasi ponsel, atau PDF — cukup ganti View-nya.

Manfaat terakhir itu yang membuat MVC bertahan: **API untuk aplikasi mobile bisa dibuat tanpa menulis ulang logikanya sama sekali.**

**Aturan yang menjaga MVC tetap bermanfaat**

Ini bagian yang paling sering dilanggar, dan begitu dilanggar, seluruh manfaatnya hilang:

- **View tidak boleh melakukan kueri.** Kalau View memanggil basis data, ia bukan lagi sekadar tampilan.
- **Controller tidak boleh memuat logika bisnis yang rumit.** Ia pengatur, bukan pekerja. Controller yang gemuk disebut *fat controller*, dan itu tanda logikanya salah tempat.
- **Model tidak boleh menghasilkan HTML.** Begitu Model mengeluarkan tag, ia terikat pada satu bentuk tampilan.

**Kaitannya dengan yang sudah kamu pelajari**

Pemisahan ini gagasan yang sama dengan **HTML, CSS, dan JavaScript** di Web Desain: struktur, tampilan, dan perilaku dipisah supaya masing-masing bisa diubah sendiri.

Sama pula dengan **Knowledge Base dan Inference Engine** di Kecerdasan Buatan, dan dengan **data dan program** di Basis Data. **Memisahkan hal yang berubah dengan alasan berbeda** adalah salah satu gagasan paling berulang di seluruh informatika.
`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: '<?php\n// TANPA MVC: semuanya bercampur di satu berkas\n$koneksi = new PDO("mysql:host=localhost;dbname=toko", "root", "");\n$hasil = $koneksi->query("SELECT * FROM produk WHERE stok > 0");\nforeach ($hasil as $baris) {\n    echo "<div class=\'kartu\'>";\n    echo "<h3>" . $baris["nama"] . "</h3>";\n    echo "</div>";\n}\n\n// Mengubah tampilan -> menyentuh berkas yang sama dengan kueri\n// Kueri yang sama disalin ke setiap halaman yang butuh\n// Tidak bisa diuji tanpa menjalankan seluruh halaman',
      penjelasan: `
Kode ini **bekerja**, dan untuk satu halaman sederhana tidak ada yang salah dengannya. Persoalannya muncul saat aplikasinya tumbuh.

Perhatikan berapa banyak tanggung jawab yang menumpuk di satu tempat:

- **Sambungan basis data** — termasuk kata sandinya, tertulis langsung
- **Kueri SQL** — aturan tentang produk mana yang ditampilkan
- **Tampilan HTML** — termasuk nama kelas CSS

Sekarang bayangkan tiga hal yang wajar terjadi:

**Perancang ingin mengubah tata letak kartunya.** Ia harus membuka berkas yang memuat kata sandi basis data, dan satu salah ketik di baris kueri bisa merusak halamannya.

**Halaman lain juga butuh daftar produk.** Kuerinya disalin. Sekarang ada dua tempat, dan ketika aturannya berubah — misalnya produk yang ditandai *arsip* juga harus disembunyikan — kamu harus ingat memperbaiki keduanya. Yang terlupa akan menampilkan data yang salah.

**Aplikasi ponsel butuh data yang sama dalam bentuk JSON.** Kamu harus menulis ulang seluruh kuerinya, karena yang ada terlanjur menyatu dengan \`echo\` HTML.

Ada bahaya keamanan juga yang mudah terlewat: \`$baris["nama"]\` dikeluarkan **tanpa \`htmlspecialchars\`**. Kalau nama produk pernah dimasukkan pengguna, ini celah XSS. Dan karena keluarannya bercampur dengan kueri, kesalahan seperti ini **lebih sulit terlihat saat ditinjau**.

MVC menyelesaikan semuanya dengan satu tindakan: **pisahkan berdasarkan alasan berubahnya.** Tampilan berubah karena selera perancang. Kueri berubah karena aturan bisnis. Keduanya tidak pernah berubah bersamaan, jadi tidak seharusnya berada di satu berkas.
`
    }
  ],

  kode: {
    php: String.raw`<?php
// ============================================
// MVC: tiga berkas, tiga tanggung jawab
// ============================================

// --------------------------------------------
// app/Models/ProdukModel.php
// Mengurus DATA. Tidak tahu apa-apa soal HTML.
// --------------------------------------------
namespace App\Models;

use CodeIgniter\Model;

class ProdukModel extends Model
{
    protected $table         = 'produk';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama', 'harga', 'stok'];
    protected $returnType    = 'array';

    /* Aturan bisnis ditulis SEKALI di sini,
       lalu dipakai semua Controller yang butuh. */
    public function tersedia(): array
    {
        return $this->where('stok >', 0)
                    ->where('arsip', 0)
                    ->orderBy('nama', 'ASC')
                    ->findAll();
    }

    public function cari(string $kata): array
    {
        return $this->like('nama', $kata)
                    ->where('stok >', 0)
                    ->findAll();
    }
}


// --------------------------------------------
// app/Controllers/Produk.php
// PENGATUR. Tipis: minta data, pilih view, serahkan.
// --------------------------------------------
namespace App\Controllers;

use App\Models\ProdukModel;

class Produk extends BaseController
{
    public function index(): string
    {
        $model = new ProdukModel();

        $data = [
            'judul'  => 'Daftar Produk',
            'produk' => $model->tersedia(),
        ];

        return view('produk/daftar', $data);
    }

    /* Model yang SAMA, View yang BERBEDA.
       Aplikasi ponsel dapat JSON tanpa menulis ulang logika. */
    public function api()
    {
        $model = new ProdukModel();
        return $this->response->setJSON($model->tersedia());
    }
}
?>`,

    html: String.raw`<!-- ============================================
     app/Views/produk/daftar.php
     TAMPILAN. Menerima data yang SUDAH JADI.
     Tidak melakukan kueri sama sekali.
     ============================================ -->

<?= $this->extend('layout/utama') ?>

<?= $this->section('konten') ?>

  <h1><?= esc($judul) ?></h1>

  <?php if (empty($produk)): ?>

    <p class="kosong">Belum ada produk tersedia.</p>

  <?php else: ?>

    <div class="daftar-kartu">
      <?php foreach ($produk as $p): ?>
        <article class="kartu">
          <!-- esc() = htmlspecialchars versi CodeIgniter.
               WAJIB untuk apa pun yang berasal dari basis data. -->
          <h3><?= esc($p['nama']) ?></h3>
          <p class="harga">
            Rp <?= number_format($p['harga'], 0, ',', '.') ?>
          </p>
          <p class="stok">Stok: <?= esc($p['stok']) ?></p>
        </article>
      <?php endforeach ?>
    </div>

  <?php endif ?>

<?= $this->endSection() ?>


<!-- YANG TIDAK BOLEH ADA DI VIEW:

     <?php
       $model = new ProdukModel();      // <- kueri di View
       $produk = $model->tersedia();
     ?>

     Begitu View melakukan kueri, ia bukan lagi tampilan.
     Perancang tidak bisa lagi menyuntingnya dengan aman,
     dan data yang sama jadi diambil dua kali. -->`
  },

  output: `Alur satu permintaan halaman:

  1. peramban        GET /produk
  2. Router          -> Controller Produk, method index()
  3. Controller      minta data ke ProdukModel
  4. Model           SELECT * FROM produk
                     WHERE stok > 0 AND arsip = 0
                     ORDER BY nama ASC
  5. Model           kembalikan array ke Controller
  6. Controller      serahkan ke view('produk/daftar', $data)
  7. View            hasilkan HTML
  8. peramban        terima HTML

  Perhatikan: Model dan View TIDAK PERNAH bicara langsung.


Satu Model, banyak View:

  GET /produk        -> view HTML   -> halaman web
  GET /produk/api    -> setJSON()   -> aplikasi ponsel
  GET /produk/cetak  -> view PDF    -> laporan

  Logikanya ditulis SEKALI di ProdukModel::tersedia().
  Aturan berubah? Cukup satu tempat yang disunting.


Tanda MVC yang dilanggar:

  View melakukan kueri        -> bukan tampilan lagi
  Controller ratusan baris    -> fat controller, logika salah tempat
  Model menghasilkan <div>    -> terikat pada satu bentuk tampilan`,

  kesalahanUmum: [
    {
      salah: 'Melakukan kueri basis data di dalam berkas View.',
      kenapa: 'View berhenti menjadi sekadar tampilan, sehingga perancang tidak bisa lagi menyuntingnya dengan aman. Data yang sama juga sering diambil berkali-kali karena tiap bagian View memanggil sendiri, dan jumlah kueri membengkak tanpa disadari.',
      benar: 'Ambil seluruh data di Controller lewat Model, lalu serahkan sebagai array ke View. View hanya menampilkan apa yang diterimanya.'
    },
    {
      salah: 'Menumpuk logika bisnis yang rumit di dalam Controller.',
      kenapa: 'Controller yang gemuk membuat logikanya tidak bisa dipakai ulang oleh Controller lain, dan tidak bisa diuji tanpa menjalankan seluruh permintaan HTTP. Aturan yang sama akhirnya disalin ke beberapa Controller, dan ketika berubah, ada yang terlupa.',
      benar: 'Pindahkan aturan bisnis ke Model atau ke kelas layanan tersendiri. Controller cukup meminta data, memilih view, dan menyerahkannya.'
    },
    {
      salah: 'Menghasilkan tag HTML dari dalam Model.',
      kenapa: 'Model jadi terikat pada satu bentuk tampilan, sehingga data yang sama tidak bisa dipakai untuk JSON maupun PDF tanpa menulis ulang. Keunggulan utama MVC, yaitu satu Model untuk banyak tampilan, hilang sepenuhnya.',
      benar: 'Model mengembalikan data mentah berupa array atau objek. Pembentukan tampilan sepenuhnya urusan View.'
    },
    {
      salah: 'Menampilkan data dari basis data tanpa esc atau htmlspecialchars, dengan alasan datanya berasal dari basis data sendiri.',
      kenapa: 'Data di basis data pada akhirnya berasal dari masukan pengguna. Nama produk atau komentar yang memuat tag script akan berjalan saat ditampilkan, sehingga celah XSS tetap terbuka meski sumbernya terlihat tepercaya.',
      benar: 'Bungkus setiap keluaran dengan esc di CodeIgniter. Perlakukan data dari basis data sama waspadanya dengan masukan langsung.'
    }
  ],

  analogi: `Bayangkan sebuah restoran, dan perhatikan pembagian kerjanya.

- **Model** adalah **dapur dan gudang**. Ia tahu bahan apa yang ada, mana yang habis, dan aturan mana yang tidak boleh dilanggar. Ia **tidak tahu** bagaimana piring ditata.
- **View** adalah **penataan piring**. Ia menerima makanan yang sudah matang lalu menyajikannya dengan rapi. Ia **tidak memasak**.
- **Controller** adalah **pelayannya**. Menerima pesanan, meneruskan ke dapur, mengambil hasilnya, memilih piring yang sesuai, lalu mengantarkannya.

Perhatikan bahwa **dapur dan penata piring tidak pernah bicara langsung**. Semuanya lewat pelayan.

Sekarang **kenapa pemisahan ini penting**:

Kalau restoran ingin mengganti seluruh gaya penyajian — dari piring keramik ke kotak bekal untuk pesan antar — **dapurnya tidak perlu diubah sama sekali**. Resepnya sama, bahannya sama. Cuma wadahnya yang berganti.

Itulah *"satu Model, banyak View"*. Data yang sama disajikan sebagai halaman web, sebagai JSON untuk aplikasi ponsel, atau sebagai PDF untuk laporan.

Dan **tanda pembagian yang dilanggar**:

- **Penata piring ikut memasak** — sekarang perancang tampilan harus tahu resep, dan mengubah tata letak berisiko merusak makanannya. Itulah View yang melakukan kueri.
- **Pelayan memasak sendiri di meja** — dapurnya menganggur, dan resep itu cuma ada di kepala satu pelayan. Pelayan lain tidak bisa memakainya. Itulah *fat controller*.
- **Dapur mengirim makanan yang sudah tertata di piring keramik** — sekarang kamu tidak bisa lagi melayani pesan antar tanpa membongkar ulang. Itulah Model yang menghasilkan HTML.`,

  latihan: [
    'Sebutkan tiga bagian MVC beserta tanggung jawab masing-masing, dan jelaskan mana yang tidak boleh bicara langsung satu sama lain.',
    'Urutkan alur satu permintaan halaman dari peramban sampai HTML terkirim, sebutkan peran tiap bagian di setiap langkah.',
    'Ambil satu berkas PHP yang mencampur kueri dan HTML, lalu pecah menjadi Model, View, dan Controller. Jelaskan apa yang jadi lebih mudah sesudahnya.',
    'Jelaskan apa itu fat controller, kenapa ia bermasalah, dan ke mana logikanya seharusnya dipindahkan.',
    'Jelaskan bagaimana satu Model bisa melayani halaman web dan aplikasi ponsel sekaligus. Tuliskan dua method Controller yang membuktikannya.',
    'Kaitkan pemisahan MVC dengan pemisahan HTML, CSS, dan JavaScript di Web Desain. Prinsip apa yang sama di antara keduanya?'
  ]
});

TOPICS.push({
  id: 'pemweb-codeigniter',
  judul: 'CodeIgniter 4 — Struktur & Routing',
  kategori: 'pemrograman-web',
  tag: ['CodeIgniter', 'framework', 'Composer', 'routing', 'spark', 'Laragon'],
  ringkas: 'Kerangka kerja yang sudah menyiapkan MVC — dari pemasangan sampai halaman pertama.',

  fungsi: `**Memakai kerangka kerja supaya tidak menulis ulang hal yang sudah ada.**

Terpakai di:

- **Membangun aplikasi lebih cepat** — routing, validasi, dan keamanan sudah tersedia
- **Struktur yang seragam** — orang lain bisa membaca proyekmu tanpa dijelaskan
- **Keamanan bawaan** — perlindungan CSRF, pelarian keluaran, query builder
- **Tugas akhir** — kerangka kerja hampir selalu diminta atau setidaknya disarankan

Yang perlu disadari: **kerangka kerja tidak menggantikan pemahaman.**

Kalau kamu tidak paham MVC, kerangka kerja hanya menyembunyikan kebingunganmu. Kalau kamu tidak paham SQL injection, query builder melindungimu **sampai** kamu menulis kueri mentah — dan saat itu kamu tidak tahu apa yang hilang.`,

  praktik: {
    tujuan: `Kamu punya aplikasi CodeIgniter 4 yang berjalan dengan CRUD lengkap, routing yang rapi, dan validasi yang benar.`,
    alat: [
      'PHP 7.4 ke atas',
      'Composer',
      'MySQL atau SQLite'
    ],
    langkah: [
      { judul: 'Pasang lewat Composer',
        isi: `- \`composer create-project codeigniter4/appstarter nama-proyek\`
- masuk ke foldernya, lalu \`php spark serve\`

Buka \`localhost:8080\`. Kalau halaman selamat datang muncul, pemasangannya berhasil.

Salin \`env\` menjadi \`.env\`, dan setel \`CI_ENVIRONMENT = development\` agar galatnya ditampilkan lengkap.` },
      { judul: 'Atur basis data dan jalankan migrasi',
        isi: `Setel kredensial di \`.env\`, lalu buat migrasi:

- \`php spark make:migration CreateMahasiswaTable\`
- isi method \`up()\` dan \`down()\`
- \`php spark migrate\`

Migrasi membuat strukturmu **tercatat dan bisa diulang** di komputer lain — jauh lebih baik daripada mengekspor SQL manual.` },
      { judul: 'Buat Model dengan aturan validasi',
        isi: `- \`php spark make:model MahasiswaModel\`

Isi \`$allowedFields\` — kolom yang boleh diisi massal. Ini penting: tanpa itu, penyerang bisa mengirim kolom yang tidak kamu maksudkan.

Taruh \`$validationRules\` di Model, bukan di Controller, supaya berlaku dari mana pun datanya masuk.` },
      { judul: 'Buat Controller dan routing',
        isi: `- \`php spark make:controller Mahasiswa --restful\`
- daftarkan dengan \`$routes->resource('mahasiswa')\`

Periksa dengan \`php spark routes\` — ia menampilkan seluruh rute yang aktif.

Perintah ini sangat berguna saat rutemu tidak jalan dan kamu tidak tahu kenapa.` },
      { judul: 'Nyalakan perlindungan CSRF',
        isi: `Setel \`$CSRFProtect = true\` di konfigurasi keamanan, lalu tambahkan \`<?= csrf_field() ?>\` di setiap formulir.

Uji dengan mengirim formulir **tanpa** token — ia harus ditolak.

Ini pengaman yang gratis dan sering dilupakan.` },
      { judul: 'Pakai query builder, hindari kueri mentah',
        isi: `- \`$this->where('angkatan', $th)->findAll()\` aman secara bawaan

Kalau terpaksa memakai kueri mentah, **selalu** pakai binding:

- \`$db->query('SELECT * FROM t WHERE id = ?', [$id])\`

Menyatukan variabel langsung ke teks kueri mengembalikan seluruh risiko SQL injection.` },
      { judul: 'Cegah kebocoran saat dipublikasikan',
        isi: `Sebelum mengunggah, setel \`CI_ENVIRONMENT = production\`.

Pada mode pengembangan, galat menampilkan **jejak lengkap beserta potongan kode dan kredensial** — dan itu hadiah besar bagi penyerang.

Pastikan juga \`.env\` tidak ikut ke Git.` }
    ],
    cek: [
      'Perintah php spark routes menampilkan seluruh rutemu',
      'Formulir tanpa token CSRF ditolak',
      'Berkas .env tidak muncul di git status'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
**Framework** adalah kerangka kerja yang sudah menyediakan struktur dan alat baku, sehingga kamu tidak menulis semuanya dari nol.

Yang sudah disiapkan CodeIgniter: routing, pola MVC, lapisan basis data, validasi, penanganan sesi, dan pengamanan dasar seperti perlindungan CSRF.

**Framework atau menulis sendiri?**

Keduanya punya tempat:

- **Menulis sendiri** — lebih ringan dan sepenuhnya kamu kendalikan. Cocok untuk halaman kecil.
- **Framework** — struktur sudah baku, keamanan dasar sudah ditangani, dan orang lain bisa langsung paham kodenya. Cocok untuk aplikasi yang tumbuh.

Yang sering diremehkan adalah alasan **keamanan**. Menulis sendiri berarti kamu harus mengingat sendiri perlindungan CSRF, penyaringan masukan, dan pengelolaan sesi yang aman. Framework sudah menanganinya, dan sudah diuji ribuan orang.

**Pemasangan lewat Composer**

**Composer** adalah pengelola paket untuk PHP — padanan npm di JavaScript. Tugas kuliahmu memakai **Laragon**, paket yang sudah memuat PHP, MySQL, dan Composer sekaligus.

Langkahnya sesuai tugasmu:

- Buka terminal Laragon
- Jalankan **\`composer create-project codeigniter4/appstarter nama-folder\`**
- Masuk ke foldernya
- Jalankan **\`php spark serve\`**
- Buka **\`localhost:8080\`**

**\`spark\`** adalah alat baris perintah bawaan CodeIgniter, dipakai untuk banyak hal selain menjalankan server.

**Struktur folder**

- **\`app/Controllers\`** — Controller
- **\`app/Models\`** — Model
- **\`app/Views\`** — View
- **\`app/Config\`** — pengaturan, termasuk \`Routes.php\` dan \`Database.php\`
- **\`public/\`** — satu-satunya folder yang boleh diakses dari luar
- **\`writable/\`** — log, cache, unggahan
- **\`.env\`** — pengaturan rahasia, **tidak boleh masuk Git**

**Kenapa hanya \`public/\` yang boleh diakses?**

Ini keputusan keamanan yang penting. Seluruh kode aplikasimu berada **di luar** folder yang dilayani web server, sehingga **tidak mungkin diakses langsung** lewat URL. Kalau seseorang mencoba membuka \`/app/Config/Database.php\`, server tidak akan menemukannya.

Kalau seluruh proyek ditaruh di folder publik, satu salah konfigurasi bisa membuat berkas berisi kata sandi terunduh utuh.

**Routing**

Router menentukan **alamat mana ditangani Controller apa**. Diatur di \`app/Config/Routes.php\`:

\`$routes->get('/produk', 'Produk::index');\`

Bacanya: permintaan **GET** ke \`/produk\` ditangani method **\`index\`** di Controller **\`Produk\`**.

Perhatikan bahwa **metode HTTP ikut ditentukan**. Rute yang didaftarkan dengan \`get()\` **tidak akan** menanggapi POST. Ini menegakkan aturan dari topik PHP: GET untuk mengambil, POST untuk mengubah.

**Parameter dan penempat**

\`$routes->get('/produk/(:num)', 'Produk::detail/$1');\`

**\`(:num)\`** hanya cocok dengan angka, **\`(:segment)\`** cocok dengan satu ruas apa pun, **\`(:any)\`** cocok dengan sisanya.

Memakai \`(:num)\` alih-alih \`(:any)\` adalah **lapis pertama validasi** — permintaan dengan ruas bukan angka ditolak sebelum sampai ke Controller.

**\`.env\` dan kenapa tidak boleh masuk Git**

Berkas \`.env\` memuat kata sandi basis data dan kunci rahasia. Kalau ikut ter-commit ke repositori publik, siapa pun bisa membacanya — dan riwayat Git menyimpannya **selamanya**, bahkan setelah berkasnya dihapus.
`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: '<?php\n// app/Config/Routes.php\n\n// Metode HTTP ikut ditentukan.\n// Rute get() TIDAK akan menanggapi POST.\n$routes->get(\'/\',            \'Home::index\');\n$routes->get(\'/produk\',      \'Produk::index\');\n$routes->get(\'/produk/(:num)\', \'Produk::detail/$1\');\n\n// Mengubah data -> WAJIB post()\n$routes->post(\'/produk/simpan\', \'Produk::simpan\');\n$routes->post(\'/produk/hapus/(:num)\', \'Produk::hapus/$1\');\n\n// (:num)     -> hanya angka       -> lapis validasi pertama\n// (:segment) -> satu ruas apa pun\n// (:any)     -> sisa alamat',
      penjelasan: `
Perhatikan bahwa **metode HTTP ikut menjadi bagian rute**. Ini bukan sekadar kerapian — ia menegakkan aturan yang kamu pelajari di topik PHP.

Rute \`/produk/hapus/5\` didaftarkan dengan **\`post()\`**. Artinya kalau ada yang mencoba membukanya sebagai tautan biasa — atau kalau mesin pencari menjelajahi situsmu — permintaan itu **ditolak** dengan 404. Bahaya "mesin pencari menghapus seluruh datamu" tertutup di tingkat router.

Sekarang **\`(:num)\`**, dan kenapa memilihnya penting.

Kalau kamu menulis \`(:any)\`, maka permintaan ke \`/produk/abc\` akan **diteruskan ke Controller** dengan \`"abc"\` sebagai parameter. Kalau Controller-mu langsung memakainya untuk kueri tanpa memeriksa, kamu bergantung sepenuhnya pada pemeriksaan di sana.

Dengan \`(:num)\`, permintaan itu **tidak pernah sampai** ke Controller. Router menolaknya lebih dulu. Ini **lapis pertahanan pertama**, dan ia gratis.

Perhatikan pula bahwa ini bukan pengganti validasi di Controller — ia **tambahan**. Prinsip yang sama dengan yang kamu pelajari di Keamanan Informasi: **pertahanan berlapis**, karena satu lapis bisa saja salah.

Soal **\`$1\`** di ujung: itu menandakan ruas yang tertangkap diteruskan sebagai **argumen pertama** method. Jadi \`/produk/5\` memanggil \`detail(5)\`.

Satu hal yang membedakan CodeIgniter 4 dari versi lamanya: **rute harus didaftarkan secara tegas.** CodeIgniter 3 punya *auto-routing* yang otomatis memetakan alamat ke Controller — praktis, tetapi berbahaya, karena **setiap method publik jadi bisa diakses dari luar** meski tidak kamu maksudkan begitu. Di versi 4, auto-routing dimatikan secara bawaan, dan itu perbaikan keamanan yang disengaja.
`
    }
  ],

  kode: {
    php: String.raw`<?php
// ============================================
// CodeIgniter 4: Controller lengkap
// app/Controllers/Produk.php
// ============================================
namespace App\Controllers;

use App\Models\ProdukModel;

class Produk extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ProdukModel();
    }

    /* GET /produk */
    public function index(): string
    {
        return view('produk/daftar', [
            'judul'  => 'Daftar Produk',
            'produk' => $this->model->tersedia(),
        ]);
    }

    /* GET /produk/5  -- (:num) sudah menjamin angka */
    public function detail($id): string
    {
        $produk = $this->model->find($id);

        if ($produk === null) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }

        return view('produk/detail', ['produk' => $produk]);
    }

    /* POST /produk/simpan */
    public function simpan()
    {
        // Validasi di SERVER -- yang di peramban cuma kenyamanan
        $aturan = [
            'nama'  => 'required|min_length[3]|max_length[100]',
            'harga' => 'required|numeric|greater_than[0]',
            'stok'  => 'required|integer|greater_than_equal_to[0]',
        ];

        if (! $this->validate($aturan)) {
            return redirect()->back()
                             ->withInput()
                             ->with('errors', $this->validator->getErrors());
        }

        $this->model->save([
            'nama'  => $this->request->getPost('nama'),
            'harga' => $this->request->getPost('harga'),
            'stok'  => $this->request->getPost('stok'),
        ]);

        return redirect()->to('/produk')
                         ->with('pesan', 'Produk berhasil disimpan');
    }

    /* GET /produk/api  -- Model SAMA, View berbeda */
    public function api()
    {
        return $this->response->setJSON($this->model->tersedia());
    }
}
?>`,

    sql: String.raw`-- ============================================
-- Migration: struktur tabel ditulis sebagai KODE
-- app/Database/Migrations/2025-01-01-000000_BuatTabelProduk.php
-- menghasilkan SQL berikut saat dijalankan
-- ============================================

CREATE TABLE produk (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama       VARCHAR(100)  NOT NULL,
  harga      DECIMAL(12,2) NOT NULL DEFAULT 0,
  stok       INT           NOT NULL DEFAULT 0,
  arsip      TINYINT(1)    NOT NULL DEFAULT 0,
  created_at DATETIME      NULL,
  updated_at DATETIME      NULL,
  PRIMARY KEY (id),
  KEY idx_stok_arsip (stok, arsip)
);

-- Kenapa migration, bukan mengetik SQL langsung di phpMyAdmin:
--
--   1. Struktur tabel ikut masuk Git, jadi punya riwayat
--   2. Anggota tim lain cukup jalankan: php spark migrate
--   3. Bisa dibatalkan: php spark migrate:rollback
--   4. Server produksi dapat struktur yang SAMA PERSIS
--
-- Tanpa migration, struktur tabel cuma ada di kepala orang
-- yang membuatnya, dan menyamakan basis data antar anggota
-- tim jadi pekerjaan manual yang rawan terlewat.

-- Perhatikan DECIMAL untuk harga, bukan FLOAT --
-- persis alasan yang dibahas di topik DDL Basis Data.`
  },

  output: `Pemasangan CodeIgniter 4 lewat Laragon:

  $ composer create-project codeigniter4/appstarter MenginstallCI
    Installing codeigniter4/appstarter ...
    Package operations: 38 installs
    Generating autoload files

  $ cd /laragon/www/MenginstallCI
  $ php spark serve

    CodeIgniter v4.5.1 Command Line Tool
    Server berjalan di http://localhost:8080

  Buka localhost:8080 -> halaman selamat datang CodeIgniter


Struktur folder:

  app/
    Config/        Routes.php, Database.php
    Controllers/   Produk.php
    Models/        ProdukModel.php
    Views/         produk/daftar.php
    Database/      Migrations/
  public/          <- SATU-SATUNYA yang diakses dari luar
    index.php
  writable/        log, cache, unggahan
  .env             <- kata sandi. JANGAN masuk Git.


Perintah spark yang sering dipakai:

  php spark serve                    jalankan server
  php spark make:controller Produk   buat controller
  php spark make:model ProdukModel   buat model
  php spark make:migration BuatTabelProduk
  php spark migrate                  jalankan migration
  php spark migrate:rollback         batalkan yang terakhir
  php spark routes                   lihat seluruh rute terdaftar


Hasil php spark routes:

  Method  Route                Handler
  GET     /                    App\Controllers\Home::index
  GET     produk               App\Controllers\Produk::index
  GET     produk/([0-9]+)      App\Controllers\Produk::detail/$1
  GET     produk/api           App\Controllers\Produk::api
  POST    produk/simpan        App\Controllers\Produk::simpan
  POST    produk/hapus/([0-9]+) App\Controllers\Produk::hapus/$1

  Perhatikan (:num) menjadi ([0-9]+) -- alamat dengan ruas
  bukan angka ditolak SEBELUM sampai ke Controller.`,

  kesalahanUmum: [
    {
      salah: 'Memasukkan berkas .env ke dalam Git.',
      kenapa: 'Berkas itu memuat kata sandi basis data dan kunci rahasia. Setelah ter-commit, riwayat Git menyimpannya selamanya meski berkasnya kemudian dihapus, sehingga siapa pun yang bisa mengambil repositori itu bisa membacanya. Pada repositori publik, kebocorannya permanen.',
      benar: 'Pastikan .env tercantum di .gitignore sejak awal. Bagikan .env.example yang berisi nama pengaturannya saja tanpa nilai rahasianya.'
    },
    {
      salah: 'Menaruh seluruh folder proyek di dalam direktori yang dilayani web server.',
      kenapa: 'Berkas di app dan writable jadi bisa diakses langsung lewat URL, sehingga satu salah konfigurasi membuat berkas konfigurasi berisi kata sandi terunduh utuh. Struktur CodeIgniter sengaja menaruh kode di luar folder publik justru untuk mencegah ini.',
      benar: 'Arahkan document root web server ke folder public saja. Sisanya berada di luar jangkauan permintaan HTTP.'
    },
    {
      salah: 'Memakai (:any) untuk parameter yang seharusnya berupa angka.',
      kenapa: 'Permintaan dengan ruas apa pun akan diteruskan ke Controller, sehingga kamu bergantung sepenuhnya pada pemeriksaan di sana. Kalau pemeriksaan itu terlewat, nilai tak terduga masuk ke kueri. Padahal router bisa menolaknya lebih dulu tanpa biaya.',
      benar: 'Pakai (:num) untuk angka dan (:segment) untuk satu ruas. Perlakukan ini sebagai lapis pertahanan pertama, bukan pengganti validasi di Controller.'
    },
    {
      salah: 'Mendaftarkan rute yang mengubah data dengan metode get.',
      kenapa: 'Rute itu jadi bisa dipanggil lewat tautan biasa, sehingga mesin pencari yang menjelajahi situs bisa menjalankan penghapusan tanpa ada manusia yang mengkliknya. Bahaya ini nyata dan pernah terjadi pada aplikasi sungguhan.',
      benar: 'Daftarkan aksi yang mengubah data dengan post, dan pastikan formnya memakai metode POST beserta token CSRF.'
    },
    {
      salah: 'Membuat tabel langsung lewat phpMyAdmin alih-alih migration.',
      kenapa: 'Struktur tabel jadi tidak punya riwayat dan tidak ikut masuk Git, sehingga anggota tim lain harus membuatnya manual dan mudah berbeda. Saat naik ke server produksi, tidak ada jaminan strukturnya sama persis, dan perbedaan kecil bisa membuat aplikasi gagal dengan cara yang sulit dilacak.',
      benar: 'Tulis perubahan struktur sebagai migration, lalu jalankan dengan php spark migrate. Struktur jadi bagian dari kode dan bisa dibatalkan.'
    }
  ],

  analogi: `Bayangkan membangun rumah.

**Menulis sendiri dari nol** adalah menebang pohon, menggergaji papan, dan membuat paku sendiri. Kamu mengendalikan segalanya — dan menghabiskan berbulan-bulan sebelum tembok pertama berdiri.

**Framework** adalah **rumah prefabrikasi**: pondasi, rangka, dan instalasi listrik sudah terpasang. Kamu tinggal menata ruangan dan mengisi perabot.

Yang paling sering diremehkan bukan soal waktu, melainkan **keamanannya**. Instalasi listrik pada rumah prefabrikasi sudah **diperiksa ribuan kali** oleh ribuan penghuni sebelumnya. Instalasi buatanmu sendiri belum pernah diperiksa siapa pun — dan kesalahan pada listrik tidak selalu terlihat sampai kebakaran.

**Routing** adalah **denah dan papan penunjuk arah**. *"Tamu yang mencari ruang tamu, lewat sini. Yang mencari dapur, lewat sana."*

Dan perhatikan bahwa papan penunjuk juga bisa **menolak**. Rute \`(:num)\` seperti pintu yang bertuliskan *"hanya untuk yang membawa nomor antrean"* — orang tanpa nomor **tidak pernah masuk ruangan**, jadi petugas di dalam tidak perlu memeriksanya.

**Folder \`public/\`** adalah **teras rumah**. Hanya bagian itu yang boleh dimasuki tamu. Ruang tidur, brankas, dan lemari arsip berada di dalam, **di luar jangkauan** — bukan karena dikunci, tetapi karena **tidak ada pintunya dari luar**.

Dan **\`.env\`** adalah **kunci brankasmu**. Memasukkannya ke Git seperti **memfoto kunci itu lalu mengunggahnya**. Menghapus fotonya nanti tidak menolong — sudah ada yang menyimpannya, dan album lamanya tetap ada.

Terakhir, **migration** adalah **denah bangunan yang tersimpan rapi**. Tanpa itu, satu-satunya catatan tentang di mana tembok berdiri ada **di ingatan tukang yang membangunnya** — dan ketika rumah kedua harus dibangun sama persis, tidak ada yang bisa memastikannya.`,

  latihan: [
    'Sebutkan langkah pemasangan CodeIgniter 4 lewat Composer di Laragon, sesuai tugas kuliahmu.',
    'Jelaskan struktur folder CodeIgniter 4, dan jelaskan kenapa hanya folder public yang boleh diakses dari luar.',
    'Tuliskan rute untuk: menampilkan daftar artikel, menampilkan satu artikel berdasarkan angka id, dan menyimpan artikel baru. Perhatikan metode HTTP-nya.',
    'Jelaskan perbedaan (:num), (:segment), dan (:any), lalu jelaskan kenapa memilih yang paling ketat adalah lapis pertahanan pertama.',
    'Jelaskan kenapa berkas .env tidak boleh masuk Git, dan kenapa menghapusnya belakangan tidak menyelesaikan masalah.',
    'Jelaskan empat keuntungan memakai migration dibanding membuat tabel langsung lewat phpMyAdmin.'
  ]
});


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Tiga topik di atas disusun dari berkas kuliah sendiri (PHP,
   MVC, CodeIgniter 4). Tiga topik berikutnya mengisi pokok
   bahasan yang ada di RPS Pemrograman Web kampus lain tetapi
   tidak ada bahannya di drive: protokol HTTP (permintaan dan
   jawaban), pemrosesan dan validasi form, serta unggah berkas.

   Keamanan yang sudah dibahas di Pemrograman Web II (XSS, CSRF,
   SQL injection, kata sandi) sengaja tidak diulang, cuma
   dirujuk. Setiap program menjalankan peladen bawaan PHP
   sungguhan lewat proc_open lalu mengirim teks HTTP mentah lewat
   socket, sehingga yang tampil di keluaran adalah percakapan
   HTTP yang benar-benar terjadi. Data pendaftar adalah TIRUAN.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'pemweb-http',
  judul: 'Anatomi HTTP — Permintaan & Jawaban',
  kategori: 'pemrograman-web',
  tag: ['HTTP', 'request', 'response', 'header', 'kode status', 'ETag', 'redirect', 'socket'],
  ringkas: 'Di balik setiap halaman PHP ada percakapan teks biasa antara peramban dan peladen — ditunjukkan di sini dengan mengirim teks mentah lewat socket ke peladen PHP sungguhan.',

  fungsi: `**Memahami apa yang sebenarnya dikirim peramban dan dijawab peladen, sehingga $_GET, $_POST, header(), dan kode status tidak lagi terasa seperti sihir.**

Topik PHP dasar memakai \`$_GET\`, \`$_POST\`, dan \`header()\`. Topik ini membuka apa yang ada di bawahnya: teks HTTP yang benar-benar lewat di jaringan.

Terpakai di:

- **Men-debug aplikasi web** — tab Network di alat pengembang peramban menampilkan persis teks-teks ini
- **Memahami kenapa header() harus sebelum echo** — kepala dikirim sebelum badan, dan tidak bisa ditarik kembali
- **Membuat halaman lebih cepat** — ETag dan 304 membuat peramban tidak mengunduh ulang yang tidak berubah
- **Bekerja dengan API** — REST API di Pemrograman Web II adalah HTTP yang sama, dengan badan JSON

Yang paling penting dipahami: **HTTP hanyalah teks.** Satu baris permintaan, beberapa baris kepala, satu baris kosong, lalu badan. Program di topik ini membuktikannya dengan mengirim teks itu langsung lewat socket, tanpa peramban.

Dan satu kebiasaan yang membedakan situs lambat dari situs cepat: **jawaban 304 Not Modified** — tidak mengirim ulang sesuatu yang sudah dimiliki peramban.`,

  praktik: {
    tujuan: 'Kamu bisa membaca permintaan dan jawaban HTTP mentah, menjelaskan setiap bagiannya, memakai kode status dan header yang tepat dari PHP, dan menerapkan ETag untuk jawaban 304.',
    alat: ['PHP 8 dengan peladen bawaan (php -S) atau Laragon', 'Alat pengembang peramban, tab Network', 'curl dengan opsi -v'],
    langkah: [
      { judul: 'Lihat HTTP di peramban',
        isi: `Buka alat pengembang, tab Network, lalu muat halaman PHP-mu. Klik satu permintaan dan lihat Request Headers dan Response Headers. Itulah teks yang dibahas topik ini, ditampilkan lebih rapi.` },
      { judul: 'Lihat HTTP dengan curl',
        isi: `Jalankan \`curl -v http://localhost:8000/halo?nama=Rina\`. Baris berawalan > adalah permintaan yang dikirim, < adalah jawaban yang diterima — tanda yang sama dengan keluaran program topik ini.` },
      { judul: 'Kirim HTTP mentah sendiri',
        isi: `Buka socket ke peladen dengan \`fsockopen\`, tulis teks permintaan — baris permintaan, kepala, baris kosong — lalu baca jawabannya. Tidak ada pustaka yang dibutuhkan.` },
      { judul: 'Atur kode status dan kepala dari PHP',
        isi: `\`http_response_code(404)\` mengubah baris status. \`header('Location: /baru', true, 301)\` mengalihkan. \`header('Content-Type: text/plain; charset=utf-8')\` memberi tahu peramban cara membaca badan.

Semuanya harus dipanggil **sebelum** ada keluaran apa pun — termasuk spasi atau baris kosong sebelum \`<?php\`.` },
      { judul: 'Terapkan ETag',
        isi: `Hitung sidik isi — misalnya hash-nya — dan kirim sebagai kepala \`ETag\`. Saat peramban mengirim \`If-None-Match\` dengan nilai yang sama, jawab \`304\` tanpa badan.

Periksa di tab Network: permintaan kedua berstatus 304 dan ukurannya jauh lebih kecil.` },
      { judul: 'Bedakan 301, 302, 303, dan 307',
        isi: `301: pindah permanen — peramban dan mesin pencari mengingatnya. 302 dan 303: pindah sementara; 303 secara tegas meminta GET, cocok setelah POST. 307: sementara, dan metodenya harus dipertahankan.` }
    ],
    cek: [
      'Kamu bisa menunjuk baris permintaan, kepala, baris kosong, dan badan dalam teks HTTP mentah',
      'Kamu bisa menjelaskan kenapa header() gagal setelah ada echo',
      'Halaman PHP-mu menjawab 304 untuk permintaan kedua yang membawa ETag yang sama',
      'Kamu memilih kode pengalihan yang tepat untuk setiap situasi'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kenapa header() harus sebelum echo',

  konsep: `Topik PHP dan pemrograman sisi server menjelaskan alurnya: peramban mengirim permintaan, peladen menjalankan PHP, PHP menghasilkan jawaban. Topik ini memperlihatkan **isi** permintaan dan jawaban itu, huruf demi huruf.

**Bentuk permintaan**

Program membuka socket ke peladen PHP bawaan dan mengirim teks ini apa adanya:

- GET /halo?nama=Rina HTTP/1.1
- Host: localhost
- Connection: close
- (baris kosong)

Baris pertama adalah **baris permintaan**: metode, jalur beserta query string, dan versi protokol. Baris-baris sesudahnya adalah **kepala** berbentuk Nama: nilai. **Baris kosong** menandai akhir kepala. Kalau ada badan, ia datang sesudah baris kosong itu.

Dari teks ini, PHP mengisi \`$_SERVER['REQUEST_METHOD']\` dengan "GET", dan \`$_GET['nama']\` dengan "Rina" — hasil mengurai query string.

**Bentuk jawaban**

- HTTP/1.1 200 OK
- Content-Type: text/plain; charset=utf-8
- (baris kosong)
- Halo, Rina

Baris pertama adalah **baris status**: versi, kode, dan frasa. Sisanya sama: kepala, baris kosong, badan. Setiap \`header()\` di PHP menambah satu baris kepala; setiap \`echo\` menambah ke badan.

**POST: data di badan, bukan di alamat**

Formulir yang dikirim dengan POST menaruh datanya di badan:

| Bagian | Isi |
|---|---|
| baris permintaan | POST /daftar HTTP/1.1 |
| Content-Type | application/x-www-form-urlencoded |
| Content-Length | 31 |
| badan | nim=H1D000000&prodi=Informatika |

Content-Length memberi tahu peladen berapa byte badan yang harus dibaca. Formatnya sama dengan query string; PHP mengurainya ke \`$_POST\`.

**Kode status**

| Permintaan | Status | Artinya |
|---|---|---|
| GET /halo | 200 OK | berhasil, badan berisi hasilnya |
| GET /jadwal kedua kali | 304 Not Modified | yang kamu punya masih berlaku |
| GET /lama | 301 Moved Permanently | pindah ke alamat di kepala Location |
| GET /tidak-ada | 404 Not Found | tidak ada di sini |

**ETag dan 304: tidak mengirim ulang yang tidak berubah**

Permintaan pertama ke /jadwal dijawab dengan badan lengkap dan kepala **ETag: "3b64cc85"** — sidik dari isinya.

Peramban menyimpan jawaban itu beserta ETag-nya. Saat meminta lagi, ia mengirim kepala **If-None-Match: "3b64cc85"**. Peladen menghitung ETag isi sekarang; karena sama, ia menjawab **304 Not Modified tanpa badan**. Peramban memakai salinan yang sudah ada.

Untuk jadwal satu baris, penghematannya kecil. Untuk halaman berisi data ribuan baris, atau gambar dan skrip, penghematannya besar — dan peladen juga tidak perlu mengirim ulang data yang sama.

Kepala **Cache-Control: no-cache** berarti "boleh disimpan, tetapi tanyakan dulu setiap kali" — bukan "jangan disimpan". Nama yang menyesatkan ini sering disalahpahami.

**Yang ditambahkan PHP sendiri**

Pada jawaban 304 dan 301, program tidak mengirim Content-Type, tetapi keluarannya tetap memuat **Content-type: text/html; charset=UTF-8**. Itu kepala bawaan yang ditambahkan PHP ke setiap jawaban — dan alasan jawaban teks biasa harus menyetel Content-Type sendiri, kalau tidak peramban akan membacanya sebagai HTML.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`function kirim($teks) {
    $s = fsockopen('127.0.0.1', PORT);
    fwrite($s, $teks);                     // tulis teks HTTP apa adanya
    $jawab = stream_get_contents($s);      // baca sampai peladen menutup
    fclose($s);
    return $jawab;
}

kirim("GET /halo?nama=Rina HTTP/1.1\r\n"
    . "Host: localhost\r\n"
    . "Connection: close\r\n"
    . "\r\n");                               // baris kosong: akhir kepala

// HTTP/1.1 200 OK
// Content-Type: text/plain; charset=utf-8
//
// Halo, Rina`,
      penjelasan: `Klien HTTP dalam lima baris — tanpa curl, tanpa Guzzle, tanpa peramban. Yang tersisa hanyalah teks yang ditulis ke socket.

**Kenapa \`\\r\\n\`, bukan \`\\n\`.**

Spesifikasi HTTP/1.1 menetapkan akhir baris sebagai CR LF — dua karakter, "carriage return" dan "line feed", peninggalan mesin ketik. Banyak peladen memaafkan \`\\n\` saja, tetapi tidak semua, dan klien yang benar selalu memakai \`\\r\\n\`.

**Baris kosong yang wajib.**

Permintaan diakhiri \`\\r\\n\\r\\n\`: akhir baris terakhir kepala, lalu satu baris kosong. Tanpa baris kosong itu, peladen menunggu kepala berikutnya selamanya — dan program menggantung.

Baris kosong itu yang memisahkan kepala dari badan. Semua yang sebelumnya adalah kepala; semua yang sesudahnya adalah badan.

**Kenapa Host wajib.**

Satu peladen — satu alamat IP — bisa melayani banyak situs. Kepala Host memberi tahu situs mana yang dimaksud. HTTP/1.1 mewajibkannya; tanpa itu, peladen boleh menolak dengan 400.

**Connection: close.**

Secara bawaan, HTTP/1.1 membiarkan sambungan tetap terbuka untuk permintaan berikutnya. Itu menghemat waktu bagi peramban, tetapi membuat \`stream_get_contents\` menunggu sampai batas waktu, karena peladen tidak pernah menutup sambungan. Connection: close meminta peladen menutupnya setelah menjawab, sehingga pembacaan selesai dengan rapi.

**Satu peladen, dua peran.**

Program ini berkas yang sama untuk peladen dan klien. Saat dijalankan lewat \`php -S\`, \`PHP_SAPI\` bernilai "cli-server" dan berkas bertindak sebagai router. Saat dijalankan dari baris perintah, ia menjalankan peladen itu di proses terpisah dengan \`proc_open\`, lalu menjadi kliennya. Dengan begitu seluruh percakapan HTTP bisa dijalankan dan diperiksa dalam satu perintah.`
    },
    {
      bahasa: 'php',
      kode: String.raw`$isi = "Senin 07.00 Pemrograman Web";
$etag = '"' . substr(md5($isi), 0, 8) . '"';
header('ETag: ' . $etag);
header('Cache-Control: no-cache');
if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
    http_response_code(304);      // tidak berubah: tanpa badan
    return true;
}
header('Content-Type: text/plain; charset=utf-8');
echo $isi;`,
      penjelasan: `Tujuh baris yang membuat jawaban kedua jauh lebih kecil dari yang pertama — dan menjelaskan aturan "header() harus sebelum echo".

**ETag adalah sidik isi.**

Setiap versi isi punya sidik yang berbeda; isi yang sama selalu punya sidik yang sama. Program memakai sebagian hash MD5 — di sini MD5 tidak dipakai untuk keamanan, cuma untuk mendeteksi perubahan, jadi kelemahan MD5 terhadap serangan tidak relevan.

Tanda kutip di sekeliling nilai ETag adalah bagian dari formatnya, bukan hiasan.

**Kepala dari peramban muncul di $_SERVER.**

Peramban mengirim If-None-Match. PHP menaruhnya di \`$_SERVER['HTTP_IF_NONE_MATCH']\`: nama kepala diubah menjadi huruf kapital, tanda hubung menjadi garis bawah, dan diberi awalan HTTP_. Aturan yang sama berlaku untuk semua kepala permintaan — User-Agent menjadi \`HTTP_USER_AGENT\`.

**304 tanpa badan.**

Kalau ETag-nya cocok, peladen cukup mengirim baris status dan kepala — tanpa badan. Peramban memakai salinan yang sudah disimpannya. Penghematan terbesar bukan cuma ukuran jawaban, tetapi juga kerja peladen: kalau isinya dihasilkan dari kueri basis data yang mahal, peladen yang cerdas bisa menghitung ETag dari sesuatu yang murah — misalnya waktu terakhir data berubah — dan melewati kuerinya sama sekali.

**Kenapa header() harus sebelum echo.**

Lihat urutan teks jawaban: baris status, kepala, baris kosong, badan. Begitu \`echo\` pertama dijalankan, PHP harus mulai mengirim badan — dan untuk itu, baris status dan semua kepala harus dikirim **lebih dulu**, diikuti baris kosong.

Setelah itu, kepala sudah terkirim melewati jaringan dan tidak bisa ditarik kembali. \`header()\` yang dipanggil sesudahnya tidak punya tempat lagi, dan PHP memberi peringatan "headers already sent".

Itu juga sebabnya satu spasi atau baris kosong sebelum \`<?php\` di berkas mana pun yang di-include bisa merusak pengalihan: spasi itu adalah keluaran, dan ia memaksa kepala terkirim.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// Anatomi HTTP: permintaan dan jawaban yang sebenarnya
// ============================================
// Berkas ini dipakai dua kali: sebagai PELADEN (lewat php -S)
// dan sebagai KLIEN yang mengirim teks HTTP mentah lewat socket.

if (PHP_SAPI === 'cli-server') {
    $jalur = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if ($jalur === '/halo') {
        $nama = $_GET['nama'] ?? 'tamu';
        header('Content-Type: text/plain; charset=utf-8');
        echo "Halo, " . $nama;
    } elseif ($jalur === '/daftar' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        header('Content-Type: text/plain; charset=utf-8');
        echo "diterima: nim=" . ($_POST['nim'] ?? '') . ", prodi=" . ($_POST['prodi'] ?? '');
    } elseif ($jalur === '/jadwal') {
        $isi = "Senin 07.00 Pemrograman Web";
        $etag = '"' . substr(md5($isi), 0, 8) . '"';
        header('ETag: ' . $etag);
        header('Cache-Control: no-cache');
        if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
            http_response_code(304);               // tidak berubah: tanpa badan
            return true;
        }
        header('Content-Type: text/plain; charset=utf-8');
        echo $isi;
    } elseif ($jalur === '/lama') {
        header('Location: /halo', true, 301);
    } else {
        http_response_code(404);
        header('Content-Type: text/plain; charset=utf-8');
        echo "tidak ada";
    }
    return true;
}

// -------------------- klien --------------------
const PORT = 8765;
$peladen = proc_open([PHP_BINARY, '-S', '127.0.0.1:' . PORT, __FILE__],
                     [1 => ['file', 'NUL', 'w'], 2 => ['file', 'NUL', 'w']], $pipa);
for ($i = 0; $i < 50; $i++) {                       // tunggu peladen siap
    $s = @fsockopen('127.0.0.1', PORT);
    if ($s) { fclose($s); break; }
    usleep(100000);
}

function kirim($teks) {
    $s = fsockopen('127.0.0.1', PORT);
    fwrite($s, $teks);
    $jawab = stream_get_contents($s);
    fclose($s);
    return $jawab;
}

function tampil($judul, $permintaan) {
    echo "\n--- $judul ---\n";
    echo "  PERMINTAAN (dikirim klien):\n";
    [$kepala_minta, $badan_minta] = explode("\r\n\r\n", $permintaan, 2);
    foreach (explode("\r\n", $kepala_minta) as $b) {
        echo "  > $b\n";
    }
    echo "  >\n";                                   // baris kosong pemisah
    if ($badan_minta !== '') echo "  > $badan_minta\n";
    $jawab = kirim($permintaan);
    [$kepala, $badan] = array_pad(explode("\r\n\r\n", $jawab, 2), 2, '');
    echo "  JAWABAN (dikirim peladen):\n";
    foreach (explode("\r\n", $kepala) as $b) {
        // Date berubah setiap detik, X-Powered-By bergantung versi
        if (preg_match('/^(Date|X-Powered-By|Host):/i', $b)) continue;
        echo "  < $b\n";
    }
    echo "  <\n";
    if ($badan !== '') echo "  < $badan\n";
    return $kepala;
}

tampil("GET dengan query string",
    "GET /halo?nama=Rina HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n");

$badan = "nim=H1D000000&prodi=Informatika";
tampil("POST dari formulir",
    "POST /daftar HTTP/1.1\r\nHost: localhost\r\n"
    . "Content-Type: application/x-www-form-urlencoded\r\n"
    . "Content-Length: " . strlen($badan) . "\r\nConnection: close\r\n\r\n" . $badan);

$k = tampil("GET pertama ke /jadwal",
    "GET /jadwal HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n");
preg_match('/ETag: (".*")/', $k, $m);
tampil("GET kedua, membawa ETag yang disimpan peramban",
    "GET /jadwal HTTP/1.1\r\nHost: localhost\r\nIf-None-Match: {$m[1]}\r\n"
    . "Connection: close\r\n\r\n");

tampil("alamat yang sudah pindah",
    "GET /lama HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n");
tampil("alamat yang tidak ada",
    "GET /tidak-ada HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n");

proc_terminate($peladen);
echo "\n  HTTP hanyalah teks: satu baris permintaan, beberapa baris\n";
echo "  kepala, satu baris kosong, lalu badan. Semua yang dilakukan\n";
echo "  \$_GET, \$_POST, header(), dan http_response_code() adalah\n";
echo "  membaca dan menulis teks seperti di atas.\n";` },
  output: `
--- GET dengan query string ---
  PERMINTAAN (dikirim klien):
  > GET /halo?nama=Rina HTTP/1.1
  > Host: localhost
  > Connection: close
  >
  JAWABAN (dikirim peladen):
  < HTTP/1.1 200 OK
  < Connection: close
  < Content-Type: text/plain; charset=utf-8
  <
  < Halo, Rina

--- POST dari formulir ---
  PERMINTAAN (dikirim klien):
  > POST /daftar HTTP/1.1
  > Host: localhost
  > Content-Type: application/x-www-form-urlencoded
  > Content-Length: 31
  > Connection: close
  >
  > nim=H1D000000&prodi=Informatika
  JAWABAN (dikirim peladen):
  < HTTP/1.1 200 OK
  < Connection: close
  < Content-Type: text/plain; charset=utf-8
  <
  < diterima: nim=H1D000000, prodi=Informatika

--- GET pertama ke /jadwal ---
  PERMINTAAN (dikirim klien):
  > GET /jadwal HTTP/1.1
  > Host: localhost
  > Connection: close
  >
  JAWABAN (dikirim peladen):
  < HTTP/1.1 200 OK
  < Connection: close
  < ETag: "3b64cc85"
  < Cache-Control: no-cache
  < Content-Type: text/plain; charset=utf-8
  <
  < Senin 07.00 Pemrograman Web

--- GET kedua, membawa ETag yang disimpan peramban ---
  PERMINTAAN (dikirim klien):
  > GET /jadwal HTTP/1.1
  > Host: localhost
  > If-None-Match: "3b64cc85"
  > Connection: close
  >
  JAWABAN (dikirim peladen):
  < HTTP/1.1 304 Not Modified
  < Connection: close
  < ETag: "3b64cc85"
  < Cache-Control: no-cache
  < Content-type: text/html; charset=UTF-8
  <

--- alamat yang sudah pindah ---
  PERMINTAAN (dikirim klien):
  > GET /lama HTTP/1.1
  > Host: localhost
  > Connection: close
  >
  JAWABAN (dikirim peladen):
  < HTTP/1.1 301 Moved Permanently
  < Connection: close
  < Location: /halo
  < Content-type: text/html; charset=UTF-8
  <

--- alamat yang tidak ada ---
  PERMINTAAN (dikirim klien):
  > GET /tidak-ada HTTP/1.1
  > Host: localhost
  > Connection: close
  >
  JAWABAN (dikirim peladen):
  < HTTP/1.1 404 Not Found
  < Connection: close
  < Content-Type: text/plain; charset=utf-8
  <
  < tidak ada

  HTTP hanyalah teks: satu baris permintaan, beberapa baris
  kepala, satu baris kosong, lalu badan. Semua yang dilakukan
  $_GET, $_POST, header(), dan http_response_code() adalah
  membaca dan menulis teks seperti di atas.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Satu permintaan dengan sambungan baru', waktu: '1 kali jabat tangan TCP + kirim + terima', memori: 'sebesar jawaban' },
      { operasi: 'Jawaban 200 dengan badan b byte', waktu: 'sebanding b', memori: 'O(b)' },
      { operasi: 'Jawaban 304', waktu: 'hanya kepala', memori: 'badan tidak dikirim' },
      { operasi: 'Menghitung ETag dari isi', waktu: 'O(ukuran isi)', memori: 'O(1)' }
    ],
    intuisi: `Biaya permintaan HTTP punya dua bagian: menyiapkan sambungan, dan memindahkan data. Untuk jawaban kecil, menyiapkan sambungan — jabat tangan TCP, dan untuk HTTPS juga jabat tangan TLS — sering lebih mahal dari datanya sendiri. Itulah alasan HTTP/1.1 membiarkan sambungan tetap terbuka secara bawaan, dan program ini sengaja menutupnya dengan Connection: close supaya pembacaannya sederhana.

304 memotong bagian kedua: data tidak dipindahkan sama sekali. Menghitung ETag dari isi masih butuh isinya — jadi untuk isi yang mahal dihasilkan, ETag sebaiknya dihitung dari sesuatu yang lebih murah, seperti waktu perubahan terakhir atau nomor versi data.`
  },

  kesalahanUmum: [
    {
      salah: 'Memanggil header() setelah ada keluaran, termasuk spasi sebelum <?php.',
      kenapa: 'Kepala dikirim sebelum badan. Begitu ada keluaran, kepala sudah terkirim dan tidak bisa ditambah, sehingga pengalihan atau kode status diam-diam tidak berlaku.',
      benar: 'Panggil semua header() sebelum echo, dan hapus spasi atau baris kosong di luar tag PHP, terutama di berkas yang di-include.'
    },
    {
      salah: 'Menulis kepala HTTP dengan akhir baris \\n saja.',
      kenapa: 'Spesifikasi HTTP menetapkan CR LF. Sebagian peladen memaafkan \\n, sebagian tidak, dan klien yang bergantung pada kemurahan itu gagal di peladen yang ketat.',
      benar: 'Pakai \\r\\n untuk setiap akhir baris dan \\r\\n\\r\\n untuk mengakhiri kepala.'
    },
    {
      salah: 'Mengira Cache-Control: no-cache berarti jangan disimpan.',
      kenapa: 'no-cache berarti boleh disimpan tetapi harus ditanyakan ulang ke peladen setiap kali. Yang berarti jangan disimpan sama sekali adalah no-store.',
      benar: 'Pakai no-cache bersama ETag untuk isi yang boleh disimpan tetapi harus selalu diperiksa, dan no-store untuk data sensitif.'
    },
    {
      salah: 'Memakai 301 untuk pengalihan sementara.',
      kenapa: 'Peramban dan mesin pencari mengingat 301 sebagai permanen. Kalau pengalihannya dicabut kemudian, pengguna tetap dialihkan dari salinan yang tersimpan di peramban mereka.',
      benar: 'Pakai 302 atau 303 untuk pengalihan sementara, dan 301 hanya untuk pindah alamat yang benar-benar permanen.'
    },
    {
      salah: 'Tidak menyetel Content-Type untuk jawaban yang bukan HTML.',
      kenapa: 'PHP menambahkan Content-type text/html secara bawaan, sehingga teks biasa atau JSON dibaca peramban sebagai HTML.',
      benar: 'Setel Content-Type yang tepat, seperti text/plain; charset=utf-8 atau application/json, sebelum mengirim badan.'
    },
    {
      salah: 'Menganggap data POST lebih aman dari GET karena tidak terlihat di alamat.',
      kenapa: 'Badan POST adalah teks biasa yang bisa dibaca siapa pun di jalur jaringan tanpa HTTPS, dan bisa dikirim siapa pun dengan socket seperti di program ini.',
      benar: 'Pakai HTTPS untuk kerahasiaan, pilih POST karena permintaan itu mengubah data, dan validasi semuanya di peladen.'
    }
  ],

  analogi: `Bayangkan kamu memesan buku lewat **surat** ke sebuah toko buku.

**Permintaan.** Suratmu punya susunan baku. Baris pertama: apa yang kamu minta — "MOHON KIRIM katalog halaman 3". Lalu beberapa baris keterangan: "Untuk: Toko Buku Pelita" (itu Host — satu kantor pos melayani banyak toko), "Balas dalam bahasa Indonesia". Lalu satu baris kosong. Kalau kamu memesan sesuatu, isian formulirnya ditulis setelah baris kosong itu.

**Jawaban.** Balasan toko juga baku. Baris pertama: kabar singkatnya — "200 BERHASIL", "404 TIDAK ADA", "301 KAMI SUDAH PINDAH, alamat baru: ...". Lalu keterangan: "isinya berupa daftar teks". Lalu baris kosong. Lalu isinya.

**Kenapa keterangan harus sebelum isi.** Petugas toko menulis kabar dan keterangan di amplop, lalu mulai memasukkan isi. Begitu amplop ditutup dan dikirim, ia tidak bisa menambah keterangan "oh ya, sebenarnya kami sudah pindah". Itulah header() yang terlambat.

**ETag.** Bulan lalu kamu sudah menerima katalog, dengan tanda "edisi 3b64". Bulan ini kamu menulis: "kalau katalognya masih edisi 3b64, tidak usah dikirim ulang". Toko memeriksa — masih sama — lalu membalas dengan kartu pos kecil: "304: masih sama, pakai yang kamu punya". Tidak perlu mengirim katalog tebal lagi.

**301 dan 302.** "Kami pindah permanen" — kamu mencoret alamat lama di buku alamatmu. "Kami sedang renovasi, sementara di alamat ini" — kamu tetap menyimpan alamat lama, karena nanti mereka kembali.`,

  latihan: [
    'Buka tab Network di peramban, muat satu halaman PHP-mu, dan salin kepala permintaan dan jawabannya ke catatanmu.',
    'Jalankan curl -v ke halaman PHP-mu dan tandai baris permintaan, kepala, baris kosong, dan badan.',
    'Ubah program klien di topik ini untuk mengirim permintaan HEAD, lalu jelaskan perbedaan jawabannya dengan GET.',
    'Hapus baris kosong di akhir permintaan, jalankan, lalu jelaskan kenapa program menggantung.',
    'Tulis halaman PHP yang menaruh echo sebelum header(\'Location: ...\'), lalu amati peringatan dan akibatnya di peramban.',
    'Terapkan ETag pada halaman daftar mata kuliah yang datanya berasal dari basis data, dengan ETag dihitung dari waktu perubahan terakhir tabel.',
    'Buat pengalihan 301, muat di peramban, lalu ubah menjadi 302 dan jelaskan kenapa peramban mungkin masih mengikuti pengalihan lama.',
    'Kirim POST dengan Content-Length yang lebih kecil dari badan sebenarnya, lalu jelaskan apa yang diterima PHP.',
    'Tampilkan semua kepala permintaan yang diterima PHP dengan getallheaders() atau $_SERVER, lalu cocokkan namanya dengan aturan awalan HTTP_.',
    'Jelaskan perbedaan Cache-Control no-cache dan no-store dengan contoh halaman yang cocok untuk masing-masing.'
  ]
});


TOPICS.push({
  id: 'pemweb-form-prg',
  judul: 'Form: Validasi Peladen & Pola PRG',
  kategori: 'pemrograman-web',
  tag: ['form', 'validasi', 'filter_var', 'isian lengket', 'Post/Redirect/Get', '303', 'pesan kilat', 'sesi'],
  ringkas: 'Kenapa validasi di peramban tidak melindungi apa pun, dan kenapa menekan refresh setelah mengisi formulir bisa mendaftarkan orang yang sama dua kali.',

  fungsi: `**Menerima isian formulir dengan aman: memeriksa setiap kolom di peladen, mengembalikan semua galat sekaligus, dan mencegah formulir yang sama terkirim dua kali.**

Topik PHP dasar menunjukkan cara membaca \`$_POST\`. Topik ini membahas yang terjadi sesudahnya — bagian yang paling sering salah di tugas dan projek.

Terpakai di:

- **Setiap formulir di aplikasimu** — pendaftaran, masuk, pengajuan, pembayaran
- **Mencegah data ganda** — satu orang yang menekan refresh tidak boleh terdaftar dua kali
- **Pengalaman pengguna** — semua kesalahan ditunjukkan sekaligus, dan isian yang benar tidak hilang
- **CodeIgniter dan kerangka kerja lain** — pustaka validasi mereka mengerjakan hal yang sama, dan memahaminya membuat pesan galatnya lebih mudah dibaca

Yang paling penting dipahami: **validasi di peramban bukan pengaman.** Atribut \`required\` dan JavaScript membantu pengguna yang jujur, tetapi program di topik ini mengirim formulir langsung lewat socket — tanpa HTML dan tanpa JavaScript — dan hanya validasi di peladen yang menghentikannya.

Dan pola yang mencegah data ganda: **Post/Redirect/Get.** Setelah POST berhasil, jangan menampilkan halaman; alihkan ke GET. Refresh lalu mengulang GET yang tidak berbahaya, bukan POST.`,

  praktik: {
    tujuan: 'Kamu bisa menulis fungsi validasi peladen yang mengembalikan semua galat per kolom, mengembalikan isian lama dengan aman, menerapkan PRG dengan kode 303, dan menampilkan pesan kilat lewat sesi.',
    alat: ['PHP 8 dengan peladen bawaan atau Laragon', 'Alat pengembang peramban, tab Network'],
    langkah: [
      { judul: 'Tulis aturan per kolom',
        isi: `Untuk setiap kolom, tentukan aturan yang pasti: nama 3–50 karakter, email yang sah, NIM berformat H1D diikuti 6 angka, angkatan bilangan bulat 2019–2026, kotak persetujuan dicentang.

Tulis aturannya di satu fungsi yang mengembalikan larik galat per kolom — kosong kalau semuanya sah.` },
      { judul: 'Pakai filter bawaan PHP',
        isi: `\`filter_var($email, FILTER_VALIDATE_EMAIL)\` untuk email. \`filter_var($x, FILTER_VALIDATE_INT, ['options' => ['min_range' => 2019, 'max_range' => 2026]])\` untuk bilangan bulat dalam rentang. Keduanya mengembalikan false kalau tidak sah.

Hati-hati: angka 0 yang sah juga "falsy". Selalu bandingkan dengan \`=== false\`.` },
      { judul: 'Kembalikan semua galat sekaligus',
        isi: `Jangan berhenti di galat pertama. Periksa semua kolom, lalu kembalikan daftar lengkapnya dengan kode 422, supaya pengguna bisa memperbaiki semuanya dalam satu kali.` },
      { judul: 'Isi ulang formulir dengan aman',
        isi: `Saat formulir ditampilkan lagi, isi setiap kolom dengan nilai yang tadi dikirim — disebut isian lengket — supaya pengguna tidak mengetik ulang. Cetak setiap nilai lewat \`htmlspecialchars\`: isian itu datang dari pengguna, dan mencetaknya mentah membuka celah XSS yang dibahas di Pemrograman Web II.` },
      { judul: 'Alihkan setelah berhasil',
        isi: `Setelah data tersimpan, kirim \`header('Location: /pendaftaran', true, 303)\` lalu berhenti. Jangan menampilkan halaman "berhasil" langsung dari POST.

303 See Other secara tegas meminta peramban mengikuti pengalihan dengan GET.` },
      { judul: 'Tampilkan pesan kilat',
        isi: `Simpan pesan "pendaftaran berhasil" di \`$_SESSION\` sebelum mengalihkan. Halaman tujuan menampilkannya lalu langsung menghapusnya — sehingga pesan muncul sekali, dan hilang saat refresh berikutnya.` },
      { judul: 'Uji dengan refresh',
        isi: `Kirim formulir yang sah, lalu tekan F5. Dengan PRG, peramban mengulang GET dan data tetap satu. Tanpa PRG, peramban bertanya "kirim ulang formulir?" — dan kalau pengguna menjawab ya, data menjadi dua.` }
    ],
    cek: [
      'Fungsi validasimu mengembalikan semua galat sekaligus, per kolom',
      'Setiap isian lama yang dicetak ulang melewati htmlspecialchars',
      'Setiap POST yang berhasil diakhiri pengalihan 303, bukan halaman',
      'Menekan refresh setelah berhasil tidak membuat data ganda'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kenapa jawaban POST adalah pengalihan',

  konsep: `Topik PHP dasar membaca isian formulir dari \`$_POST\`. Topik ini menjawab dua pertanyaan yang muncul segera setelahnya: bagaimana kalau isiannya salah, dan bagaimana kalau formulirnya terkirim dua kali?

**Validasi peramban bukan pengaman**

HTML punya \`required\`, \`type="email"\`, \`pattern\`, dan \`min\`/\`max\`. JavaScript bisa memeriksa lebih banyak. Semuanya berguna — pengguna mendapat umpan balik seketika, tanpa menunggu peladen.

Tetapi semuanya berjalan di komputer **pengguna**, dan bisa dilewati. Program di topik ini mengirim formulir langsung lewat socket, tanpa HTML dan tanpa JavaScript — seperti yang bisa dilakukan siapa pun dengan curl atau Postman. Satu-satunya yang menghentikan isian yang salah adalah pemeriksaan di peladen.

Aturannya: validasi di peramban untuk **kenyamanan**, validasi di peladen untuk **keamanan**. Yang kedua wajib; yang pertama tambahan.

**Semua galat sekaligus**

Isian yang salah di semua kolom — nama "R", email "rina@<b>", NIM "12345", angkatan 2030, tanpa centang persetujuan:

| Kolom | Galat |
|---|---|
| nama | panjang 3 sampai 50 karakter |
| email | bukan alamat email yang sah |
| nim | format H1D diikuti 6 angka |
| angkatan | bilangan bulat 2019 sampai 2026 |
| setuju | harus menyetujui tata tertib |

Jawabannya **422** — "bisa dibaca, tetapi isinya melanggar aturan", sama seperti di topik REST API Pemrograman Web II. Semua galat dikembalikan dalam satu jawaban. Formulir yang cuma menyebut galat pertama memaksa pengguna mengirim, memperbaiki, mengirim, memperbaiki — lima kali untuk lima kesalahan.

Isian email dikembalikan sebagai \`rina@&lt;b&gt;\` — sudah diamankan dengan \`htmlspecialchars\`. Isian lengket adalah data dari pengguna yang dicetak ke halaman, dan harus diamankan seperti keluaran lain.

Satu catatan dari keluaran program: peladen bawaan PHP menulis baris status "422 Unknown Status Code" — ia tidak mengenal frasa untuk 422. Kodenya tetap benar, dan klien membaca angkanya, bukan frasanya.

**Masalah refresh**

Tanpa PRG, peladen menjawab POST yang berhasil dengan halaman "tersimpan":

| Tindakan | Jawaban |
|---|---|
| kirim formulir | 200 — tersimpan, pendaftar ke-1 |
| tekan refresh | 200 — tersimpan, pendaftar ke-2 |

Refresh mengulang **permintaan terakhir** — dan permintaan terakhir adalah POST. Satu orang, dua pendaftaran. Peramban memang biasanya bertanya "kirim ulang formulir?", tetapi banyak pengguna menekan "ya" tanpa membaca.

**Post/Redirect/Get**

Dengan PRG, POST yang berhasil tidak dijawab dengan halaman, melainkan dengan pengalihan:

| Tindakan | Jawaban |
|---|---|
| kirim formulir | 303 See Other, Location: /pendaftaran |
| peramban mengikuti | 200 — pendaftaran berhasil (pendaftar ke-1) |
| tekan refresh | 200 — (tanpa pesan) |

Permintaan terakhir sekarang adalah **GET** ke /pendaftaran. Refresh mengulang GET itu — yang tidak mengubah apa pun. Data tetap satu.

**Pesan kilat**

Pesan "pendaftaran berhasil" disimpan di sesi sebelum pengalihan, lalu dibaca dan **langsung dihapus** oleh halaman tujuan. Ia muncul tepat sekali. Refresh berikutnya menampilkan halaman tanpa pesan — yang benar, karena tidak ada pendaftaran baru.

Pesan seperti ini disebut *flash message*, dan CodeIgniter menyediakannya lewat \`session()->setFlashdata()\`. Program ini menulisnya sendiri supaya mekanismenya terlihat: sesi, lalu unset.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`function validasi($d) {
    $galat = [];
    $nama = trim($d['nama'] ?? '');
    if (mb_strlen($nama) < 3 || mb_strlen($nama) > 50) {
        $galat['nama'] = 'panjang 3 sampai 50 karakter';
    }
    if (!filter_var($d['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'bukan alamat email yang sah';
    }
    if (!preg_match('/^H1D\d{6}$/', $d['nim'] ?? '')) {
        $galat['nim'] = 'format H1D diikuti 6 angka';
    }
    $angkatan = filter_var($d['angkatan'] ?? '', FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 2019, 'max_range' => 2026]]);
    if ($angkatan === false) {
        $galat['angkatan'] = 'bilangan bulat 2019 sampai 2026';
    }
    return $galat;             // kosong = semua sah
}`,
      penjelasan: `Satu fungsi yang tidak menampilkan apa pun dan tidak menyimpan apa pun — cuma mengembalikan daftar galat. Pemisahan itu yang membuatnya mudah diuji dan dipakai ulang.

**\`?? ''\` di setiap kolom.**

Pengguna bisa mengirim formulir tanpa kolom tertentu sama sekali — lewat socket, atau karena HTML-nya diubah. \`$d['nama']\` yang tidak ada memicu peringatan. \`$d['nama'] ?? ''\` menggantinya dengan teks kosong, yang lalu gagal di aturan panjang dengan pesan yang jelas.

**\`trim\` lalu \`mb_strlen\`.**

\`trim\` membuang spasi di awal dan akhir, supaya nama "   " — tiga spasi — tidak lolos sebagai tiga karakter. \`mb_strlen\` menghitung **karakter**, bukan byte: nama dengan huruf seperti é dihitung benar. \`strlen\` biasa menghitung byte UTF-8, sehingga "Andé" terhitung lima, bukan empat.

**Kenapa \`filter_var\`, bukan pola buatan sendiri.**

Aturan alamat email yang benar sangat rumit. Pola buatan sendiri hampir selalu menolak alamat yang sah — misalnya yang memakai tanda plus — atau menerima yang tidak sah. \`FILTER_VALIDATE_EMAIL\` sudah menangani sebagian besar kasusnya.

Tetapi ingat batasnya: ia memeriksa **bentuk**, bukan apakah alamatnya benar-benar ada. Untuk memastikan email itu milik pendaftar, kirim tautan konfirmasi.

**\`=== false\`, bukan \`!\`.**

\`FILTER_VALIDATE_INT\` mengembalikan bilangannya kalau sah, false kalau tidak. Kalau rentang yang sah memuat 0, maka \`!$angkatan\` salah menganggap 0 sebagai galat, karena 0 bernilai "falsy" di PHP. Perbandingan \`=== false\` membedakan keduanya. Di sini rentangnya 2019–2026, jadi tidak ada masalah — tetapi kebiasaan yang benar mencegah bug saat aturannya berubah.

**Kenapa semua kolom diperiksa, tidak berhenti di galat pertama.**

Fungsi ini sengaja tidak memakai \`return\` di tengah. Setiap aturan diperiksa, setiap galat dikumpulkan. Pengguna melihat semua yang salah sekaligus.

**Ketika validasinya sendiri kurang teliti.**

Versi pertama contoh di program ini memakai nama \`<b>R</b>\`, dengan harapan ditolak karena terlalu pendek. Ternyata lolos: \`mb_strlen\` menghitung tag HTML-nya juga, sehingga panjangnya 8. Aturan "panjang 3 sampai 50" memeriksa **teks yang dikirim**, bukan nama yang terlihat. Kalau memang tag tidak boleh ada, aturan itu harus ditulis terpisah — misalnya membandingkan isian dengan hasil \`strip_tags\`-nya.`
    },
    {
      bahasa: 'php',
      kode: String.raw`$galat = validasi($_POST);
if ($galat) {
    http_response_code(422);
    // tampilkan galat, isi ulang formulir dengan htmlspecialchars
    return;
}
$n = simpan($_POST);
$_SESSION['kilat'] = "pendaftaran berhasil (pendaftar ke-$n)";
header('Location: /pendaftaran', true, 303);   // Post/Redirect/Get
exit;

// di halaman GET /pendaftaran:
echo $_SESSION['kilat'] ?? '';
unset($_SESSION['kilat']);                      // sekali tampil`,
      penjelasan: `Delapan baris yang mengubah perilaku tombol refresh — dan satu fungsi PHP yang sering dilupakan setelah \`header\`.

**Dua jalan keluar dari POST.**

Kalau galat: jawab 422, tampilkan galat, dan isi ulang formulir. **Jangan** mengalihkan. Isian lama dan daftar galat perlu ditampilkan di jawaban yang sama, dan pengalihan akan menghilangkannya — kecuali disimpan dulu di sesi, yang menambah kerumitan tanpa manfaat berarti.

Kalau sah: simpan, lalu **alihkan**. Tidak ada halaman yang dicetak dari POST yang berhasil.

**Kenapa 303, bukan 302.**

Secara historis, 302 berarti "pindah sementara, dengan metode yang sama" — tetapi hampir semua peramban mengubah POST menjadi GET saat mengikutinya, bertentangan dengan spesifikasi awalnya. 303 See Other dibuat untuk menyatakan maksud itu secara tegas: "hasilnya ada di sana, ambil dengan GET". Untuk PRG, 303 adalah kode yang paling jelas maknanya.

**\`exit\` setelah \`header('Location...')\`.**

\`header\` cuma **menambah kepala**; ia tidak menghentikan skrip. Tanpa \`exit\`, kode di bawahnya tetap berjalan — dan kalau di bawahnya ada kode yang menampilkan halaman atau, lebih buruk, menyimpan lagi, semuanya ikut dijalankan. Peramban mengikuti pengalihan, tetapi pekerjaan di peladen sudah terjadi.

Kebiasaan yang aman: setiap \`header('Location: ...')\` langsung diikuti \`exit\`. Di router program ini, \`return true\` melakukan peran yang sama.

**Pesan kilat: tulis, baca sekali, hapus.**

Sesi bertahan di antara permintaan, jadi pesan yang ditulis saat POST masih ada saat GET berikutnya. Halaman GET membacanya lalu langsung menghapusnya. Refresh berikutnya tidak menemukan pesan — dan memang tidak seharusnya, karena tidak ada pendaftaran baru.

Klien di program ini menyimpan cookie sesi dari kepala Set-Cookie dan mengirimkannya kembali di setiap permintaan, persis seperti peramban. Tanpa cookie itu, setiap permintaan mendapat sesi baru, dan pesan kilat tidak pernah terbaca.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// Form: validasi sisi peladen dan pola Post/Redirect/Get
// ============================================
const BERKAS = __DIR__ . '/pendaftar.json';

function validasi($d) {
    $galat = [];
    $nama = trim($d['nama'] ?? '');
    if (mb_strlen($nama) < 3 || mb_strlen($nama) > 50) {
        $galat['nama'] = 'panjang 3 sampai 50 karakter';
    }
    if (!filter_var($d['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'bukan alamat email yang sah';
    }
    if (!preg_match('/^H1D\d{6}$/', $d['nim'] ?? '')) {
        $galat['nim'] = 'format H1D diikuti 6 angka';
    }
    $angkatan = filter_var($d['angkatan'] ?? '', FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 2019, 'max_range' => 2026]]);
    if ($angkatan === false) {
        $galat['angkatan'] = 'bilangan bulat 2019 sampai 2026';
    }
    if (($d['setuju'] ?? '') !== 'ya') {
        $galat['setuju'] = 'harus menyetujui tata tertib';
    }
    return $galat;
}

function simpan($d) {
    $semua = json_decode(@file_get_contents(BERKAS) ?: '[]', true);
    $semua[] = $d['nim'];
    file_put_contents(BERKAS, json_encode($semua));
    return count($semua);
}

if (PHP_SAPI === 'cli-server') {
    session_start();
    $jalur = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $metode = $_SERVER['REQUEST_METHOD'];
    header('Content-Type: text/plain; charset=utf-8');

    if ($jalur === '/pendaftaran' && $metode === 'POST') {
        $galat = validasi($_POST);
        if ($galat) {
            http_response_code(422);
            foreach ($galat as $kolom => $pesan) echo "galat $kolom: $pesan\n";
            // isian lama dikembalikan -- DIAMANKAN sebelum dicetak
            echo "isian email dikembalikan: "
                . htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES) . "\n";
            return true;
        }
        $n = simpan($_POST);
        $_SESSION['kilat'] = "pendaftaran berhasil (pendaftar ke-$n)";
        header('Location: /pendaftaran', true, 303);   // PRG
        return true;
    }
    if ($jalur === '/pendaftaran') {
        echo ($_SESSION['kilat'] ?? '(tanpa pesan)') . "\n";
        unset($_SESSION['kilat']);                      // pesan kilat: sekali tampil
        return true;
    }
    if ($jalur === '/tanpa-prg' && $metode === 'POST') {
        if (!validasi($_POST)) {
            echo "tersimpan, pendaftar ke-" . simpan($_POST) . "\n";
        }
        return true;
    }
    http_response_code(404);
    return true;
}

// -------------------- klien --------------------
@unlink(BERKAS);
const PORT = 8766;
$peladen = proc_open([PHP_BINARY, '-S', '127.0.0.1:' . PORT, __FILE__],
                     [1 => ['file', 'NUL', 'w'], 2 => ['file', 'NUL', 'w']], $pipa);
for ($i = 0; $i < 50; $i++) {
    $s = @fsockopen('127.0.0.1', PORT);
    if ($s) { fclose($s); break; }
    usleep(100000);
}
$KUKI = '';                                   // wadah cookie, seperti peramban

function minta($metode, $jalur, $data = null) {
    global $KUKI;
    $badan = $data === null ? '' : http_build_query($data);
    $teks = "$metode $jalur HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n";
    if ($KUKI) $teks .= "Cookie: $KUKI\r\n";
    if ($data !== null) {
        $teks .= "Content-Type: application/x-www-form-urlencoded\r\n"
               . "Content-Length: " . strlen($badan) . "\r\n";
    }
    $s = fsockopen('127.0.0.1', PORT);
    fwrite($s, $teks . "\r\n" . $badan);
    $jawab = stream_get_contents($s);
    fclose($s);
    [$kepala, $isi] = array_pad(explode("\r\n\r\n", $jawab, 2), 2, '');
    if (preg_match('/Set-Cookie: (PHPSESSID=[^;]+)/', $kepala, $m)) $KUKI = $m[1];
    preg_match('/^HTTP\/1\.1 (\d+ [^\r]*)/', $kepala, $st);
    preg_match('/Location: ([^\r]*)/', $kepala, $lok);
    echo "  $metode $jalur -> " . $st[1] . (isset($lok[1]) ? " -> Location: $lok[1]" : "") . "\n";
    foreach (explode("\n", rtrim($isi)) as $b) {
        if ($b !== '') echo "      $b\n";
    }
}

echo "--- 1. isian yang salah semua ---\n";
minta('POST', '/pendaftaran', ['nama' => 'R', 'email' => 'rina@<b>',
      'nim' => '12345', 'angkatan' => '2030']);
echo "  Semua galat dikembalikan sekaligus, per kolom. Isian email yang\n";
echo "  berisi tag HTML dikembalikan sudah diamankan, bukan mentah.\n";
echo "  (Peladen bawaan PHP tidak mengenal frasa untuk 422 -- klien\n";
echo "  membaca angkanya, bukan frasanya.)\n";

$SAH = ['nama' => 'Rina Kartika', 'email' => 'rina@contoh.ac.id',
        'nim' => 'H1D000000', 'angkatan' => '2024', 'setuju' => 'ya'];

echo "\n--- 2. tanpa PRG: peladen langsung menjawab POST ---\n";
minta('POST', '/tanpa-prg', $SAH);
echo "  (pengguna menekan refresh -- peramban mengirim ulang POST)\n";
minta('POST', '/tanpa-prg', $SAH);
echo "  Satu orang, dua pendaftaran.\n";

@unlink(BERKAS);
echo "\n--- 3. dengan PRG: POST dijawab pengalihan 303 ---\n";
minta('POST', '/pendaftaran', $SAH);
minta('GET', '/pendaftaran');
echo "  (pengguna menekan refresh -- yang diulang adalah GET)\n";
minta('GET', '/pendaftaran');
echo "  Tetap satu pendaftaran. Pesan kilat tampil sekali, lalu hilang.\n";

proc_terminate($peladen);
@unlink(BERKAS);
echo "\n  Permintaan di atas dikirim langsung lewat socket, tanpa formulir\n";
echo "  HTML dan tanpa JavaScript. Validasi di peramban bisa dilewati\n";
echo "  semudah itu -- yang melindungi data hanya validasi di peladen.\n";` },
  output: `--- 1. isian yang salah semua ---
  POST /pendaftaran -> 422 Unknown Status Code
      galat nama: panjang 3 sampai 50 karakter
      galat email: bukan alamat email yang sah
      galat nim: format H1D diikuti 6 angka
      galat angkatan: bilangan bulat 2019 sampai 2026
      galat setuju: harus menyetujui tata tertib
      isian email dikembalikan: rina@&lt;b&gt;
  Semua galat dikembalikan sekaligus, per kolom. Isian email yang
  berisi tag HTML dikembalikan sudah diamankan, bukan mentah.
  (Peladen bawaan PHP tidak mengenal frasa untuk 422 -- klien
  membaca angkanya, bukan frasanya.)

--- 2. tanpa PRG: peladen langsung menjawab POST ---
  POST /tanpa-prg -> 200 OK
      tersimpan, pendaftar ke-1
  (pengguna menekan refresh -- peramban mengirim ulang POST)
  POST /tanpa-prg -> 200 OK
      tersimpan, pendaftar ke-2
  Satu orang, dua pendaftaran.

--- 3. dengan PRG: POST dijawab pengalihan 303 ---
  POST /pendaftaran -> 303 See Other -> Location: /pendaftaran
  GET /pendaftaran -> 200 OK
      pendaftaran berhasil (pendaftar ke-1)
  (pengguna menekan refresh -- yang diulang adalah GET)
  GET /pendaftaran -> 200 OK
      (tanpa pesan)
  Tetap satu pendaftaran. Pesan kilat tampil sekali, lalu hilang.

  Permintaan di atas dikirim langsung lewat socket, tanpa formulir
  HTML dan tanpa JavaScript. Validasi di peramban bisa dilewati
  semudah itu -- yang melindungi data hanya validasi di peladen.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Validasi k kolom', waktu: 'O(k)', memori: 'O(k) untuk daftar galat' },
      { operasi: 'POST tanpa PRG, lalu refresh', waktu: '2 kali simpan', memori: 'data ganda' },
      { operasi: 'POST dengan PRG, lalu refresh', waktu: '1 kali simpan + 2 GET', memori: 'data tetap tunggal' },
      { operasi: 'Pesan kilat lewat sesi', waktu: 'satu baca + satu hapus', memori: 'satu entri sesi' }
    ],
    intuisi: `PRG menambah satu perjalanan pulang-pergi: setelah POST, peramban harus mengirim GET. Untuk formulir pendaftaran, tambahan beberapa puluh milidetik itu tidak terasa — dan harganya jauh lebih murah dari data ganda yang harus dibersihkan dengan tangan.

Validasi sendiri hampir gratis. Yang mahal adalah kesalahan yang lolos karena validasi dianggap cukup di peramban: data rusak di basis data yang harus diperbaiki satu per satu, atau celah keamanan.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengandalkan atribut required dan JavaScript untuk memvalidasi.',
      kenapa: 'Keduanya berjalan di komputer pengguna dan bisa dilewati dengan mengirim permintaan langsung, seperti yang dilakukan program di topik ini lewat socket.',
      benar: 'Validasi semua kolom di peladen, dan anggap validasi peramban hanya sebagai kenyamanan bagi pengguna.'
    },
    {
      salah: 'Berhenti dan menampilkan galat pertama saja.',
      kenapa: 'Pengguna harus mengirim berulang kali untuk menemukan kesalahan berikutnya satu per satu.',
      benar: 'Periksa semua kolom, kumpulkan galatnya per kolom, dan tampilkan semuanya di jawaban yang sama.'
    },
    {
      salah: 'Mencetak isian lama ke formulir tanpa htmlspecialchars.',
      kenapa: 'Isian itu datang dari pengguna. Tag atau skrip di dalamnya dijalankan peramban, membuka celah XSS.',
      benar: 'Cetak setiap nilai lewat htmlspecialchars dengan ENT_QUOTES.'
    },
    {
      salah: 'Menampilkan halaman "berhasil" langsung sebagai jawaban POST.',
      kenapa: 'Refresh mengulang POST, sehingga data tersimpan dua kali. Pada program di topik ini, satu orang menjadi dua pendaftar.',
      benar: 'Alihkan dengan 303 ke halaman GET setelah POST berhasil.'
    },
    {
      salah: 'Tidak memanggil exit setelah header Location.',
      kenapa: 'header hanya menambah kepala dan tidak menghentikan skrip, sehingga kode di bawahnya tetap berjalan meskipun peramban dialihkan.',
      benar: 'Selalu ikuti header Location dengan exit.'
    },
    {
      salah: 'Menghitung panjang teks dengan strlen.',
      kenapa: 'strlen menghitung byte, bukan karakter. Nama dengan huruf beraksen atau aksara non-Latin terhitung lebih panjang dari sebenarnya.',
      benar: 'Pakai mb_strlen untuk teks dari pengguna.'
    },
    {
      salah: 'Memeriksa hasil filter_var dengan operator !.',
      kenapa: 'Nilai sah seperti 0 atau teks kosong dianggap salah karena bernilai falsy di PHP.',
      benar: 'Bandingkan hasilnya dengan === false.'
    }
  ],

  analogi: `Bayangkan kamu mendaftar kegiatan di **loket sekretariat** himpunan.

**Validasi peramban.** Di depan loket ada papan: "Formulir harus diisi lengkap dengan tinta hitam." Papan itu membantu orang yang jujur mengisi dengan benar. Tetapi papan tidak bisa menolak formulir yang salah — yang bisa hanya petugas di balik loket. Kalau petugas tidak memeriksa karena "sudah ada papannya", formulir asal-asalan masuk begitu saja.

**Semua galat sekaligus.** Petugas yang baik memeriksa seluruh formulir, lalu mengembalikannya dengan lima coretan merah sekaligus: "nama kurang lengkap, email salah, NIM salah format, angkatan salah, belum tanda tangan". Petugas yang buruk mengembalikannya dengan satu coretan, lalu kamu antre lagi, lalu satu coretan lagi.

**Isian lengket.** Petugas yang baik mengembalikan formulirmu yang sama, dengan isian yang benar masih tertulis — kamu cuma perlu memperbaiki yang dicoret. Petugas yang buruk memberi formulir kosong baru.

**Tanpa PRG.** Kamu menyerahkan formulir, dan petugas bilang "sudah, terima kasih". Kamu tidak yakin, jadi kamu menyerahkan formulir yang sama sekali lagi. Petugas menerimanya lagi. Sekarang namamu tercatat dua kali.

**Dengan PRG.** Kamu menyerahkan formulir, dan petugas bilang: "sudah diterima — silakan cek papan pengumuman untuk konfirmasinya". Kamu berjalan ke papan dan melihat namamu. Kalau kamu ragu dan melihat papan sekali lagi, namamu tetap satu — melihat papan tidak mendaftarkanmu lagi. Itu perbedaan antara mengulang POST dan mengulang GET.

**Pesan kilat.** Di papan ada catatan kecil "pendaftaran Rina berhasil" yang dicabut begitu Rina sudah membacanya. Kalau ia kembali lagi nanti, catatannya sudah tidak ada — karena tidak ada pendaftaran baru untuk diumumkan.`,

  latihan: [
    'Tulis fungsi validasi untuk formulir peminjaman ruang dengan lima kolom dan aturan pilihanmu, yang mengembalikan galat per kolom.',
    'Kirim formulirmu lewat curl tanpa satu kolom pun, lalu pastikan peladen mengembalikan galat yang jelas, bukan peringatan PHP.',
    'Tampilkan formulir HTML dengan isian lengket dan pesan galat di bawah setiap kolom, dengan semua nilai melewati htmlspecialchars.',
    'Coba kirim nama berisi tag <script> dan tunjukkan bahwa halaman menampilkannya sebagai teks, bukan menjalankannya.',
    'Buat versi tanpa PRG, kirim formulir, tekan F5, lalu hitung datanya di basis data.',
    'Ubah versi itu menjadi PRG dengan 303 dan pesan kilat, lalu ulangi percobaan F5.',
    'Hapus exit setelah header Location dan tambahkan echo di bawahnya, lalu amati apa yang terjadi di peladen dan di peramban.',
    'Bandingkan strlen dan mb_strlen untuk nama "Andé Siregar" dan jelaskan hasilnya.',
    'Tambahkan aturan yang menolak nama berisi tag HTML dengan membandingkan isian dengan strip_tags-nya.',
    'Terjemahkan fungsi validasi di topik ini menjadi aturan validasi CodeIgniter 4, lalu bandingkan pesan galatnya.'
  ]
});


TOPICS.push({
  id: 'pemweb-unggah',
  judul: 'Unggah Berkas yang Aman',
  kategori: 'pemrograman-web',
  tag: ['upload', 'multipart/form-data', '$_FILES', 'finfo', 'MIME', 'nama acak', 'batas ukuran'],
  ringkas: 'Nama berkas, ekstensi, dan jenis yang dikirim peramban ditulis oleh pengguna — satu-satunya yang bisa dipercaya adalah isi berkas yang benar-benar diterima.',

  fungsi: `**Menerima berkas dari pengguna — pas foto, dokumen tugas, bukti pembayaran — tanpa membuka jalan bagi berkas berbahaya atau berkas raksasa.**

Terpakai di:

- **Unggah pas foto dan dokumen** di formulir pendaftaran
- **Pengumpulan tugas** di aplikasi kuliah
- **Bukti pembayaran** di toko daring
- **Setiap fitur yang menyimpan berkas dari pengguna** ke peladen

Yang paling penting dipahami: **tiga hal yang dikirim bersama berkas bisa diisi apa saja oleh pengirimnya** — nama berkas, ekstensinya, dan jenis yang diakuinya. Program di topik ini mengirim berkas PHP bernama "pasfoto.jpg" yang mengaku image/jpeg. Hanya pemeriksaan **isi** berkas yang menolaknya.

Dan satu kebiasaan yang menutup sebagian besar celah sekaligus: **peladen yang memberi nama.** Berkas disimpan dengan nama acak buatan peladen dan ekstensi yang ditentukan dari isinya — nama kiriman tidak pernah dipakai untuk apa pun.`,

  praktik: {
    tujuan: 'Kamu bisa membuat formulir unggah, memeriksa kode galat unggahan, membatasi ukuran dari berkas yang diterima, menentukan jenis dari isi dengan finfo, dan menyimpan berkas dengan nama acak di luar folder publik.',
    alat: ['PHP 8 dengan ekstensi fileinfo (bawaan di Laragon)', 'Peladen bawaan PHP atau Laragon'],
    langkah: [
      { judul: 'Buat formulir yang benar',
        isi: `Formulir unggah wajib memakai \`method="post"\` dan \`enctype="multipart/form-data"\`. Tanpa enctype itu, peramban hanya mengirim nama berkasnya, bukan isinya, dan \`$_FILES\` kosong.` },
      { judul: 'Periksa kode galat lebih dulu',
        isi: `\`$_FILES['berkas']['error']\` harus \`UPLOAD_ERR_OK\`. Kode lain berarti unggahan gagal di tengah jalan — terlalu besar untuk batas php.ini, terputus, atau tidak ada berkas sama sekali. Jangan menyentuh berkasnya kalau kodenya bukan OK.` },
      { judul: 'Batasi ukuran dari berkas yang diterima',
        isi: `Ukur dengan \`filesize($_FILES['berkas']['tmp_name'])\`, bukan dari \`$_FILES['berkas']['size']\` atau kepala Content-Length yang dikirim klien. Setel juga \`upload_max_filesize\` dan \`post_max_size\` di php.ini sebagai pagar pertama.` },
      { judul: 'Tentukan jenis dari isi',
        isi: `\`(new finfo(FILEINFO_MIME_TYPE))->file($tmp)\` membaca beberapa byte awal berkas dan mengenali jenisnya dari penanda formatnya — seperti penanda PNG yang dibahas di topik Komputer Forensik.

Terima hanya jenis dalam daftar yang diizinkan. Abaikan \`$_FILES['berkas']['type']\` — itu tulisan klien.` },
      { judul: 'Buat nama sendiri',
        isi: `Nama baru: \`bin2hex(random_bytes(8))\` ditambah ekstensi yang ditentukan dari **jenis isi**, bukan dari nama kiriman. Simpan nama asli di basis data kalau perlu ditampilkan — setelah diamankan dengan htmlspecialchars.` },
      { judul: 'Simpan di luar folder publik',
        isi: `Pindahkan dengan \`move_uploaded_file\` ke folder yang tidak bisa diakses langsung lewat URL. Tampilkan berkasnya lewat skrip PHP yang memeriksa hak akses lalu mengirim isinya dengan Content-Type yang benar.

Kalau terpaksa di folder publik, pastikan peladen tidak pernah menjalankan skrip di folder itu.` }
    ],
    cek: [
      'Formulirmu memakai enctype multipart/form-data',
      'Ukuran diperiksa dari berkas yang diterima, dan jenis dari isinya dengan finfo',
      'Berkas disimpan dengan nama acak buatan peladen dan ekstensi dari jenis isi',
      'Berkas yang diunggah tidak bisa dijalankan sebagai skrip oleh peladen'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — kenapa nama kiriman tidak pernah dipakai',

  konsep: `Topik form membahas validasi isian teks. Berkas butuh validasi yang lebih ketat, karena berkas yang salah bukan cuma data yang rusak — di peladen yang salah dikonfigurasi, berkas PHP yang berhasil diunggah bisa **dijalankan**.

**Apa yang dikirim peramban**

Formulir dengan \`enctype="multipart/form-data"\` mengirim badan yang dipotong-potong oleh sebuah **pembatas**. Untuk setiap berkas, ada tiga keterangan dan isinya:

| Bagian | Contoh | Siapa yang menulis |
|---|---|---|
| name (nama kolom) | berkas | formulir |
| filename | pasfoto.jpg | **pengirim** |
| Content-Type | image/jpeg | **pengirim** |
| isi | byte-byte berkas | **pengirim** |

PHP menaruh semuanya di \`$_FILES\`: filename di \`['name']\`, Content-Type di \`['type']\`, dan isinya di berkas sementara yang ditunjuk \`['tmp_name']\`.

Tiga dari empat baris itu ditulis pengirim. Peramban yang jujur mengisinya dengan benar. Tetapi program di topik ini membangun badan multipart sendiri dan mengirimnya lewat socket — dan bisa menulis apa saja.

**Lima kiriman**

| Kiriman | Isi sebenarnya | Hasil |
|---|---|---|
| pasfoto.png, mengaku image/png | PNG sungguhan | **201** disimpan |
| pasfoto.jpg, mengaku image/jpeg | kode PHP | **415** ditolak |
| tugas.php, mengaku application/x-php | PNG sungguhan | **201** disimpan sebagai .png |
| ../../index.png, mengaku image/png | PNG sungguhan | **201** disimpan |
| besar.png, mengaku image/png | 300 KB | **413** terlalu besar |

**Kiriman kedua** adalah alasan utama topik ini. Nama berakhiran .jpg, Content-Type image/jpeg — semua yang dilihat pemeriksaan sederhana mengatakan "gambar". Tetapi finfo membaca isinya dan mengenalinya sebagai **text/x-php**. Ditolak.

Peladen yang memeriksa ekstensi saja akan menyimpannya. Kalau folder simpanannya bisa diakses lewat URL, dan peladen dikonfigurasi menjalankan PHP berdasarkan isi atau nama tertentu, berkas itu bisa berubah menjadi skrip yang dijalankan.

**Kiriman ketiga** kebalikannya: gambar yang sah, dengan nama yang mencurigakan. Ia diterima — karena isinya memang PNG — tetapi disimpan sebagai **.png**, ekstensi dari isinya. Nama "tugas.php" tidak pernah menyentuh sistem berkas.

**Kiriman keempat** mencoba menaruh berkas di luar folder dengan \`../../\`. PHP sendiri sudah membuang bagian folder dari nama unggahan — \`$_FILES['berkas']['name']\` tinggal "index.png". Tetapi pertahanan yang sebenarnya adalah tidak memakai nama itu sama sekali.

**Kiriman kelima** ditolak 413 karena ukurannya diukur dari berkas yang diterima: 300 KB, batasnya 200 KB.

**Ukuran: pagar berlapis**

php.ini punya dua batas: \`upload_max_filesize\` untuk satu berkas dan \`post_max_size\` untuk seluruh permintaan. Berkas yang melampauinya ditolak sebelum kode PHP-mu berjalan — kode galat \`UPLOAD_ERR_INI_SIZE\`, atau untuk \`post_max_size\`, \`$_POST\` dan \`$_FILES\` kosong sama sekali.

Batas di kode — di sini 200 KB — adalah pagar kedua yang lebih ketat, sesuai kebutuhan fitur: pas foto tidak perlu 2 MB.

**Kenapa nama acak**

Nama yang dibuat peladen menutup beberapa masalah sekaligus:

- **Menimpa berkas lain**: dua pengguna mengunggah "foto.jpg" — nama acak tidak bertabrakan.
- **Menebak alamat berkas**: nama urut seperti foto_1, foto_2 bisa ditebak; 16 karakter heksadesimal acak tidak.
- **Karakter aneh di nama**: spasi, kutip, huruf non-Latin, atau nama sangat panjang — tidak pernah menjadi masalah.
- **Ekstensi berbahaya**: ekstensi ditentukan dari jenis isi, sehingga tidak pernah .php.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`const JENIS_BOLEH = ['image/png' => 'png', 'image/jpeg' => 'jpg'];

$f = $_FILES['berkas'] ?? null;
if (!$f || $f['error'] !== UPLOAD_ERR_OK) { http_response_code(400); exit; }

$ukuran = filesize($f['tmp_name']);                // dari berkas nyata
if ($ukuran > 200 * 1024) { http_response_code(413); exit; }

$jenis = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);  // dari ISI
if (!isset(JENIS_BOLEH[$jenis])) { http_response_code(415); exit; }

$nama = bin2hex(random_bytes(8)) . '.' . JENIS_BOLEH[$jenis];     // buatan peladen
move_uploaded_file($f['tmp_name'], SIMPANAN . '/' . $nama);`,
      penjelasan: `Empat pemeriksaan berurutan, dan tidak satu pun yang memakai \`$f['name']\` atau \`$f['type']\` — dua nilai yang ditulis pengirim.

**Kode galat dulu.**

Unggahan bisa gagal sebelum kodemu berjalan: terlalu besar untuk php.ini, terputus di tengah, atau tidak ada berkas yang dipilih. Dalam semua kasus itu, \`tmp_name\` bisa kosong atau tidak berarti. Memeriksa \`error\` lebih dulu mencegah kode di bawahnya bekerja dengan berkas yang tidak ada.

**Ukuran dari berkas yang benar-benar ada.**

\`$f['size']\` dihitung PHP dari data yang diterima, jadi biasanya benar — tetapi \`filesize\` pada berkas sementara adalah ukuran yang pasti, tanpa perlu memikirkan dari mana angka itu datang. Yang **tidak** boleh dipakai adalah angka yang dikirim klien, seperti Content-Length, atau kolom tersembunyi MAX_FILE_SIZE di formulir — keduanya bisa diisi apa saja.

**Jenis dari isi: finfo.**

finfo membaca byte-byte awal berkas dan mencocokkannya dengan basis data penanda format. PNG selalu diawali delapan byte yang sama; JPEG diawali FF D8 FF; kode PHP diawali \`<?php\`. Itu penanda yang sama — *magic number* — yang dipakai topik carving di Komputer Forensik untuk mengenali berkas tanpa namanya.

Daftar yang diizinkan ditulis sebagai **daftar putih**: hanya PNG dan JPEG. Daftar hitam — "tolak PHP, EXE, dan JS" — selalu kelupaan satu jenis berbahaya.

**Batas finfo.**

finfo memeriksa awal berkas, bukan seluruh isinya. Berkas yang diawali penanda PNG sah lalu diikuti kode lain akan terbaca image/png. Karena itu pemeriksaan jenis bukan satu-satunya pagar: nama acak dengan ekstensi .png, dan folder simpanan yang tidak menjalankan skrip, memastikan berkas seperti itu tetap diperlakukan sebagai gambar — tidak pernah dijalankan. Untuk gambar, pagar tambahan yang kuat adalah membuat ulang gambarnya dengan GD, yang membuang apa pun yang bukan data gambar.

**Nama: sepenuhnya milik peladen.**

\`random_bytes(8)\` memberi 64 bit acak dari sumber acak yang aman secara kriptografis — 16 karakter heksadesimal. Ekstensinya diambil dari \`JENIS_BOLEH[$jenis]\`, yang hanya bisa bernilai png atau jpg.

**\`move_uploaded_file\`, bukan \`rename\`.**

\`move_uploaded_file\` memeriksa bahwa berkas sumbernya benar-benar hasil unggahan HTTP, bukan jalur lain yang disisipkan ke \`tmp_name\`. Ia adalah satu-satunya cara yang benar untuk memindahkan berkas unggahan.`
    },
    {
      bahasa: 'php',
      kode: String.raw`function unggah($nama, $jenis_klaim, $isi) {
    $batas = '----batas' . bin2hex(random_bytes(6));
    $badan = "--$batas\r\n"
        . "Content-Disposition: form-data; name=\"berkas\"; "
        . "filename=\"$nama\"\r\n"
        . "Content-Type: $jenis_klaim\r\n\r\n"
        . $isi . "\r\n--$batas--\r\n";
    // ... kirim sebagai POST dengan
    // Content-Type: multipart/form-data; boundary=$batas
}

unggah('pasfoto.jpg', 'image/jpeg', "<?php echo 'bukan foto'; ?>");
// 415: isi berkas terbaca text/x-php`,
      penjelasan: `Klien yang membangun badan multipart dengan tangan — untuk menunjukkan bahwa setiap bagian yang biasanya diisi peramban bisa diisi apa saja.

**Bentuk multipart.**

Badan dipotong oleh **pembatas** — teks acak yang tidak mungkin muncul di isi berkas. Setiap potongan diawali dua tanda hubung dan pembatasnya, lalu kepala potongan, baris kosong, dan isinya. Badan diakhiri pembatas dengan dua tanda hubung di belakangnya.

Pembatas yang sama diumumkan di kepala permintaan: \`Content-Type: multipart/form-data; boundary=...\`. Dari situ PHP tahu cara memotong badannya.

**Tiga kebohongan dalam satu permintaan.**

\`filename="pasfoto.jpg"\` — pengirim yang menulisnya. \`Content-Type: image/jpeg\` — pengirim yang menulisnya. Isinya kode PHP — dan itu yang sebenarnya.

Peramban biasa mengisi filename dari nama berkas di komputer pengguna, dan Content-Type dari ekstensinya. Tetapi tidak ada yang memaksa pengirim memakai peramban biasa. Program ini, curl, Postman, atau skrip dalam bahasa apa pun bisa mengirim apa saja.

**Kenapa ini diuji dengan kode, bukan dengan peramban.**

Menguji fitur unggah lewat formulir di peramban hanya menguji jalur yang jujur. Pengirim yang berniat buruk tidak memakai formulirmu. Uji keamanan unggahan harus mengirim permintaan yang dibuat dengan tangan — nama yang menyesatkan, jenis yang berbohong, isi yang tidak cocok — dan memastikan setiap kombinasinya ditangani benar.

**Satu catatan dari pengerjaan program ini.**

Versi pertama kiriman kedua berisi satu baris kode PHP yang meniru skrip berbahaya. Hasilnya bukan 415: finfo gagal membuka berkas sementaranya. Penyebab yang paling mungkin adalah antivirus Windows, yang mengenali pola itu dan menghapus berkasnya begitu ditulis. Isinya lalu diganti kode PHP yang tidak berbahaya — yang tetap memperlihatkan hal yang sama, tanpa memicu antivirus. Pelajarannya: di peladen sungguhan, antivirus bisa menjadi satu lapis pertahanan tambahan, tetapi kodemu tidak boleh bergantung padanya.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// Unggah berkas: jangan percaya nama, jenis, maupun ukuran kiriman
// ============================================
const SIMPANAN = __DIR__ . '/simpanan';      // DI LUAR folder publik
const BATAS = 200 * 1024;                   // 200 KB
const JENIS_BOLEH = ['image/png' => 'png', 'image/jpeg' => 'jpg'];

if (PHP_SAPI === 'cli-server') {
    header('Content-Type: text/plain; charset=utf-8');
    $f = $_FILES['berkas'] ?? null;
    if (!$f || $f['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo "tidak ada berkas yang sah (kode galat " . ($f['error'] ?? '-') . ")";
        return true;
    }
    // 1. ukuran: dari berkas yang benar-benar diterima, bukan dari klien
    $ukuran = filesize($f['tmp_name']);
    if ($ukuran > BATAS) {
        http_response_code(413);
        echo "terlalu besar: " . round($ukuran / 1024) . " KB, batas 200 KB";
        return true;
    }
    // 2. jenis: dari ISI berkas, bukan dari nama atau Content-Type kiriman
    $jenis = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
    if (!isset(JENIS_BOLEH[$jenis])) {
        http_response_code(415);
        echo "jenis ditolak: isi berkas terbaca $jenis "
           . "(nama '{$f['name']}', klien mengaku '{$f['type']}')";
        return true;
    }
    // 3. nama: dibuat peladen, ekstensi dari jenis isi
    $acak = bin2hex(random_bytes(8));
    $nama = $acak . '.' . JENIS_BOLEH[$jenis];
    move_uploaded_file($f['tmp_name'], SIMPANAN . '/' . $nama);
    http_response_code(201);
    echo "disimpan sebagai " . strlen($acak) . " karakter acak + ." . JENIS_BOLEH[$jenis]
       . " (nama kiriman '{$f['name']}' diabaikan)";
    return true;
}

// -------------------- klien --------------------
@mkdir(SIMPANAN);
const PORT = 8767;
$peladen = proc_open([PHP_BINARY, '-S', '127.0.0.1:' . PORT, __FILE__],
                     [1 => ['file', 'NUL', 'w'], 2 => ['file', 'NUL', 'w']], $pipa);
for ($i = 0; $i < 50; $i++) {
    $s = @fsockopen('127.0.0.1', PORT);
    if ($s) { fclose($s); break; }
    usleep(100000);
}

function unggah($nama, $jenis_klaim, $isi) {
    $batas = '----batas' . bin2hex(random_bytes(6));
    $badan = "--$batas\r\n"
        . "Content-Disposition: form-data; name=\"berkas\"; filename=\"$nama\"\r\n"
        . "Content-Type: $jenis_klaim\r\n\r\n" . $isi . "\r\n--$batas--\r\n";
    $teks = "POST /unggah HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n"
        . "Content-Type: multipart/form-data; boundary=$batas\r\n"
        . "Content-Length: " . strlen($badan) . "\r\n\r\n" . $badan;
    $s = fsockopen('127.0.0.1', PORT);
    fwrite($s, $teks);
    $jawab = stream_get_contents($s);
    fclose($s);
    [$kepala, $isi_jawab] = explode("\r\n\r\n", $jawab, 2);
    preg_match('/^HTTP\/1\.1 (\d+)/', $kepala, $st);
    echo "  kirim '$nama' (" . strlen($isi) . " byte, mengaku $jenis_klaim)\n";
    echo "    -> " . $st[1] . ": " . wordwrap($isi_jawab, 56, "\n       ", true) . "\n";
}

// gambar PNG kecil sungguhan, dibuat dengan GD
$g = imagecreatetruecolor(8, 8);
ob_start(); imagepng($g); $png = ob_get_clean();

echo "--- lima kiriman ---\n";
unggah('pasfoto.png', 'image/png', $png);
unggah('pasfoto.jpg', 'image/jpeg', "<?php echo 'bukan foto'; ?>");
unggah('tugas.php', 'application/x-php', $png);
unggah('../../index.png', 'image/png', $png);
unggah('besar.png', 'image/png', str_repeat("\x89", 300 * 1024));

proc_terminate($peladen);
$tersimpan = glob(SIMPANAN . '/*');
echo "\n  berkas di folder simpanan: " . count($tersimpan) . "\n";
foreach ($tersimpan as $b) unlink($b);
rmdir(SIMPANAN);
echo "\n  Nama berkas, Content-Type, dan ekstensi ditulis oleh KLIEN --\n";
echo "  siapa pun bisa mengisinya apa saja. Yang bisa dipercaya hanya\n";
echo "  isi berkas yang benar-benar diterima, diperiksa di peladen.\n";` },
  output: `--- lima kiriman ---
  kirim 'pasfoto.png' (90 byte, mengaku image/png)
    -> 201: disimpan sebagai 16 karakter acak + .png (nama kiriman
       'pasfoto.png' diabaikan)
  kirim 'pasfoto.jpg' (27 byte, mengaku image/jpeg)
    -> 415: jenis ditolak: isi berkas terbaca text/x-php (nama
       'pasfoto.jpg', klien mengaku 'image/jpeg')
  kirim 'tugas.php' (90 byte, mengaku application/x-php)
    -> 201: disimpan sebagai 16 karakter acak + .png (nama kiriman
       'tugas.php' diabaikan)
  kirim '../../index.png' (90 byte, mengaku image/png)
    -> 201: disimpan sebagai 16 karakter acak + .png (nama kiriman
       'index.png' diabaikan)
  kirim 'besar.png' (307200 byte, mengaku image/png)
    -> 413: terlalu besar: 300 KB, batas 200 KB

  berkas di folder simpanan: 3

  Nama berkas, Content-Type, dan ekstensi ditulis oleh KLIEN --
  siapa pun bisa mengisinya apa saja. Yang bisa dipercaya hanya
  isi berkas yang benar-benar diterima, diperiksa di peladen.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Menerima berkas b byte', waktu: 'O(b)', memori: 'ditulis ke berkas sementara, bukan ke memori' },
      { operasi: 'Mengukur dengan filesize', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Mengenali jenis dengan finfo', waktu: 'membaca awal berkas', memori: 'O(1)' },
      { operasi: 'Membuat ulang gambar dengan GD', waktu: 'O(piksel)', memori: 'seluruh gambar di memori' }
    ],
    intuisi: `Menerima berkas tidak bisa lebih murah dari O(b): setiap byte harus lewat jaringan dan ditulis ke diska. Karena itu batas ukuran penting bukan cuma untuk keamanan, tetapi juga untuk sumber daya: satu permintaan 2 GB yang diterima sampai habis sudah menghabiskan pita dan diska, bahkan kalau akhirnya ditolak.

Itulah alasan batas di php.ini adalah pagar pertama — ia menolak sebelum seluruh berkas diterima — dan batas di kode adalah pagar kedua yang lebih ketat.

Pemeriksaan jenis dengan finfo murah, karena cuma membaca awal berkas. Membuat ulang gambar dengan GD jauh lebih mahal — seluruh gambar diurai ke memori — tetapi memberi jaminan terkuat bahwa yang disimpan benar-benar gambar dan tidak ada yang lain.`
  },

  kesalahanUmum: [
    {
      salah: 'Memeriksa jenis berkas dari ekstensi nama atau dari $_FILES type.',
      kenapa: 'Keduanya ditulis pengirim. Berkas PHP bernama pasfoto.jpg yang mengaku image/jpeg lolos kedua pemeriksaan itu.',
      benar: 'Tentukan jenis dari isi dengan finfo, dan terima hanya jenis dalam daftar putih.'
    },
    {
      salah: 'Menyimpan berkas dengan nama aslinya.',
      kenapa: 'Nama asli bisa menimpa berkas lain, bisa ditebak, bisa berisi karakter yang merusak jalur, dan bisa berakhiran ekstensi yang dijalankan peladen.',
      benar: 'Buat nama acak dengan random_bytes dan ekstensi dari jenis isi, dan simpan nama asli di basis data bila perlu.'
    },
    {
      salah: 'Menyimpan unggahan di folder yang bisa diakses dan dijalankan lewat URL.',
      kenapa: 'Kalau satu berkas berbahaya lolos pemeriksaan, peladen bisa menjalankannya saat alamatnya dibuka.',
      benar: 'Simpan di luar folder publik dan kirim isinya lewat skrip PHP, atau matikan eksekusi skrip di folder unggahan.'
    },
    {
      salah: 'Memakai daftar hitam jenis berkas yang dilarang.',
      kenapa: 'Selalu ada jenis berbahaya yang terlupa, seperti .phtml, .phar, atau .svg yang bisa memuat skrip.',
      benar: 'Pakai daftar putih jenis yang dibutuhkan fitur, dan tolak semua yang lain.'
    },
    {
      salah: 'Melupakan enctype multipart/form-data di formulir.',
      kenapa: 'Tanpa enctype itu, peramban hanya mengirim nama berkas sebagai teks biasa, dan $_FILES kosong.',
      benar: 'Selalu tulis method="post" dan enctype="multipart/form-data" pada formulir unggah.'
    },
    {
      salah: 'Tidak memeriksa kode galat unggahan sebelum memakai berkasnya.',
      kenapa: 'Unggahan yang gagal, misalnya terlalu besar untuk php.ini, tetap muncul di $_FILES dengan tmp_name kosong, sehingga kode di bawahnya bekerja dengan berkas yang tidak ada.',
      benar: 'Periksa bahwa error sama dengan UPLOAD_ERR_OK sebelum menyentuh berkasnya.'
    },
    {
      salah: 'Memindahkan berkas unggahan dengan rename atau copy.',
      kenapa: 'Kedua fungsi itu tidak memeriksa bahwa sumbernya benar-benar berkas hasil unggahan HTTP.',
      benar: 'Pakai move_uploaded_file.'
    }
  ],

  analogi: `Bayangkan kamu petugas **penitipan barang** di perpustakaan kampus.

**Label yang ditulis penitip.** Setiap orang menyerahkan tas dengan label yang mereka tulis sendiri: "isi: buku", "nama pemilik: Rina". Kamu tidak bisa memercayai label itu begitu saja. Seseorang bisa menulis "isi: buku" di tas yang isinya sesuatu yang dilarang masuk.

**Memeriksa isi, bukan label.** Petugas yang baik membuka tas dan melihat isinya. Kalau labelnya bilang buku tetapi isinya bukan, tas ditolak — apa pun yang tertulis di label.

**Nomor loker buatan petugas.** Petugas tidak menyimpan tas di loker yang dipilih penitip — "taruh di loker nomor 1, loker Pak Kepala". Petugas memberi nomor sendiri dari tumpukan kartu acak. Tidak ada yang bisa menimpa tas orang lain, dan tidak ada yang bisa menebak di loker mana tas tertentu berada.

**Ruang penitipan tertutup.** Tas disimpan di ruang di balik meja, bukan di rak terbuka di lobi. Kalau pun satu tas berbahaya lolos pemeriksaan, ia tidak bisa diambil atau dibuka sembarang orang yang lewat. Untuk mengambilnya, harus lewat petugas lagi — yang memeriksa kartu penitipan.

**Batas ukuran.** Tas sebesar lemari ditolak di pintu masuk, sebelum sempat dibawa ke meja. Itulah batas di php.ini — menolak sebelum semua data diterima. Lalu di meja, ada batas yang lebih ketat sesuai keperluan: "ruang ini untuk tas kecil saja".`,

  latihan: [
    'Buat formulir unggah pas foto dengan method dan enctype yang benar, lalu tampilkan isi $_FILES setelah mengunggah.',
    'Unggah berkas yang melebihi upload_max_filesize di php.ini-mu, lalu tampilkan kode galat yang diterima.',
    'Tulis pemeriksaan jenis dengan finfo, lalu uji dengan berkas teks yang diganti namanya menjadi .png.',
    'Kirim unggahan lewat curl dengan opsi -F dan nama berkas palsu, misalnya -F "berkas=@foto.png;filename=tugas.php".',
    'Buat skrip tampil.php yang mengirim gambar dari folder di luar folder publik dengan Content-Type yang benar.',
    'Ganti pemeriksaan finfo dengan membuat ulang gambar memakai GD (imagecreatefromstring lalu imagepng), dan jelaskan apa yang dibuang.',
    'Simpan nama asli berkas di basis data bersama nama acaknya, lalu tampilkan nama asli dengan aman di daftar unggahan.',
    'Jelaskan kenapa daftar putih lebih aman dari daftar hitam, dengan contoh ekstensi berbahaya yang mudah terlupa.',
    'Tambahkan batas banyaknya unggahan per pengguna per jam memakai sesi atau basis data.',
    'Periksa satu fitur unggah di projek kelompokmu terhadap enam langkah praktik di topik ini, dan catat yang belum dipenuhi.'
  ]
});
