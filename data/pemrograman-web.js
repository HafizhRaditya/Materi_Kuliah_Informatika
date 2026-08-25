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
