/* ============================================================
   pemweb2.js — materi Pemrograman Web II (Semester 4)

   Disusun dari berkas projek sendiri di "Semester Empat/Pemweb II":
     - CPMK01: sistem klinik (DATABASE.docx, Laporan CPMK01)
       berisi skema users/patients/doctors/appointments dan
       kelas BaseModel, UserModel, PatientModel
     - CPMK02 & CPMK03: laporan lanjutan

   Bahasa yang dipakai di kelas adalah PHP dengan PDO, jadi blok
   kode di sini juga PHP -- dan benar-benar DIJALANKAN memakai
   PDO SQLite supaya hasilnya bisa dibuktikan, bukan diandaikan.

   Tiga topik tambahan (merancang REST API, kueri di aplikasi
   web, autentikasi sesi & token) disusun dari REFERENSI LUAR.
   Keterangan lengkapnya ada di kepala bagian tambahan di bawah.
   ============================================================ */

TOPICS.push({
  id: 'pemweb2-oop-pdo',
  judul: 'PHP Berorientasi Objek & PDO',
  kategori: 'pemweb2',
  tag: ['PHP', 'OOP', 'PDO', 'inheritance', 'singleton', 'model'],
  ringkas: 'Menyusun aplikasi web sebagai kelas — dan kenapa satu kelas induk menghemat ratusan baris.',

  fungsi: `**Menyusun aplikasi web sebagai kelas, dengan akses basis data yang aman dan tidak berulang.**

Terpakai di:

- **Proyek CPMK dan tugas akhir** berbasis PHP
- **Memahami kerangka kerja** — Laravel dan CodeIgniter memakai pola yang sama
- **Menghindari pengulangan** — satu kelas induk melayani semua tabel
- **Kode yang bisa diuji** — model yang terpisah bisa diuji tanpa peramban

Yang paling menghemat: **kelas induk abstrak**. Menulis \`getAll\`, \`getById\`, dan \`delete\` sekali, lalu dipakai semua model.

Dan satu hal yang harus dipahami sejak awal: **placeholder hanya bisa menggantikan nilai, bukan nama tabel.** Karena itu nama tabel disatukan langsung — dan itu aman **hanya** kalau nilainya ditulis programmer.`,

  praktik: {
    tujuan: `Kamu punya struktur model berbasis kelas dengan satu sambungan bersama dan seluruh kueri memakai prepared statement.`,
    alat: [
      'PHP 7.4 ke atas',
      'MySQL atau SQLite',
      'Composer opsional'
    ],
    langkah: [
      { judul: 'Buat sambungan Singleton',
        isi: `Kelas \`Database\` dengan \`getInstance()\` yang mengembalikan sambungan yang sama setiap kali.

Kunci konstruktornya agar privat supaya tidak bisa dibuat dari luar.

Buktikan dengan membandingkan dua hasil \`getInstance()\` memakai \`===\` — hasilnya harus benar.` },
      { judul: 'Buat BaseModel abstrak',
        isi: `Tandai \`abstract\`, dan isi dengan \`getAll\`, \`getById\`, dan \`delete\` yang memakai \`{$this->table}\`.

Buktikan ia benar-benar tidak bisa diinstansiasi: coba \`new BaseModel()\` dan pastikan ia melempar Error.` },
      { judul: 'Turunkan model per tabel',
        isi: `Tiap turunan hanya mengisi \`$this->table\` di konstruktornya, setelah memanggil \`parent::__construct()\`.

Sekarang tiga model berbeda memakai kode yang sama — dan menambah model keempat cuma butuh tiga baris.` },
      { judul: 'Pakai access modifier dengan tepat',
        isi: `- \`protected\` untuk \`$db\` dan \`$table\` — turunan perlu, luar tidak
- \`private\` untuk data sensitif seperti kata sandi

Uji dengan mencoba mengaksesnya dari luar kelas. Harus ditolak.` },
      { judul: 'Selalu pakai prepared statement untuk nilai',
        isi: `- \`$stmt = $db->prepare("SELECT * FROM t WHERE id = :id");\`
- \`$stmt->execute([':id' => $id]);\`

Untuk \`LIMIT\` dan \`OFFSET\`, pakai \`bindValue\` dengan \`PDO::PARAM_INT\` — kalau tidak, angkanya dikirim sebagai teks dan kuerinya gagal.` },
      { judul: 'Nyalakan foreign key di SQLite',
        isi: `SQLite mengabaikan foreign key kecuali dinyalakan: \`PRAGMA foreign_keys = ON;\`

Buktikan \`ON DELETE CASCADE\` bekerja: hapus satu induk dan periksa anaknya ikut hilang.

Di MySQL dengan InnoDB, ia sudah menyala secara bawaan.` },
      { judul: 'Uji model tanpa peramban',
        isi: `Tulis skrip PHP yang memanggil model-mu dari baris perintah dan mencetak hasilnya.

Kalau berhasil, model-mu benar-benar terpisah dari lapisan tampilan — dan itu bukti pemisahanmu berhasil.` }
    ],
    cek: [
      'Dua pemanggilan getInstance mengembalikan objek yang sama persis',
      'new BaseModel() ditolak dengan Error',
      'Model-mu bisa dijalankan dan diuji dari baris perintah'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dipisah jadi kelas',

  konsep: `
Di Pemrograman Web I, kode PHP biasanya ditulis **berurutan di satu berkas**: sambungan basis data, kueri, dan HTML bercampur jadi satu.

Cara itu bekerja sampai halamannya berjumlah belasan. Sesudah itu ia **runtuh** — karena setiap halaman **mengulang** hal yang sama, dan mengubah satu hal berarti menyunting semua berkas.

**Model: satu kelas per tabel**

Gagasan pokoknya: tiap tabel basis data diwakili **satu kelas**, dan seluruh kueri yang menyentuh tabel itu **tinggal di sana**.

Di projek klinik sendiri: \`UserModel\` mengurus tabel \`users\`, \`PatientModel\` mengurus \`patients\`, \`DoctorModel\` mengurus \`doctors\`.

Akibatnya langsung terasa: kalau nama kolom berubah, kamu tahu **persis satu berkas** yang harus disunting.

**Kelas induk abstrak**

Perhatikan bahwa hampir semua model butuh operasi yang **sama persis**: ambil semua, ambil satu berdasarkan id, hapus berdasarkan id.

Menulisnya berulang di tiap model adalah **duplikasi murni**. Karena itu ada **\`BaseModel\`** — kelas induk **abstrak** yang menampung operasi bersama itu.

Kata **abstrak** berarti kelas itu **tidak boleh dibuatkan objek sendiri**. Ia cuma ada untuk **diwarisi**. \`new BaseModel()\` harus gagal — dan memang gagal, karena \`BaseModel\` sendiri tidak mewakili tabel apa pun.

**Kunci teknisnya: nama tabel jadi variabel**

- \`SELECT * FROM {$this->table}\`

Karena \`$table\` diisi oleh **kelas turunan**, satu potong kode di induk **melayani semua tabel**.

**Encapsulation lewat access modifier**

- **\`public\`** — bisa diakses dari mana saja
- **\`protected\`** — hanya kelas ini **dan turunannya**
- **\`private\`** — hanya kelas ini sendiri

Di \`BaseModel\`, \`$db\` dan \`$table\` dibuat **\`protected\`** — turunan perlu memakainya, tetapi kode di luar **tidak boleh menyentuhnya**.

Di \`UserModel\`, \`$password\` dibuat **\`private\`** — bahkan turunannya pun tidak boleh mengambilnya langsung.

**Singleton untuk sambungan basis data**

Membuka sambungan basis data itu **mahal**. Kalau tiap model membuka sambungan sendiri, satu halaman yang memakai lima model membuka **lima sambungan**.

**Singleton** memastikan hanya ada **satu**: \`Database::getInstance()\` mengembalikan sambungan yang sama setiap kali dipanggil.

**PDO dan prepared statement**

**PDO** (*PHP Data Objects*) adalah antarmuka baku PHP untuk basis data. Keunggulannya: **kode yang sama** bisa dipakai untuk MySQL, PostgreSQL, atau SQLite.

Tetapi alasan sesungguhnya memakai PDO adalah **prepared statement**:

- \`$stmt = $db->prepare("SELECT * FROM users WHERE username = :u");\`
- \`$stmt->execute([':u' => $input]);\`

Nilai **tidak pernah disatukan ke dalam teks kueri**. Ia dikirim **terpisah**, sehingga tidak mungkin ditafsirkan sebagai perintah.

Ini dibahas tuntas di topik keamanan, tetapi perlu disebut di sini karena **itulah alasan pokok** memilih PDO.

**Jangan salah paham soal placeholder**

Placeholder **hanya bisa menggantikan nilai**, bukan **nama tabel atau kolom**. \`SELECT * FROM :tabel\` **tidak bekerja**.

Karena itu \`{$this->table}\` pada \`BaseModel\` **memang disatukan langsung** ke teks kueri — dan itu **aman hanya karena** nilainya ditulis oleh programmer, bukan datang dari pengguna.

Kalau suatu hari nama tabel diambil dari masukan pengguna, celahnya terbuka lebar.
`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: '<?php\n// KENAPA {$this->table} BISA DIPAKAI DI KELAS INDUK\n//\n// BaseModel tidak tahu tabel apa yang diurusnya.\n// Yang mengisinya adalah kelas TURUNAN:\n//\n//   class UserModel extends BaseModel {\n//       public function __construct() {\n//           parent::__construct();\n//           $this->table = "users";   <- di sini\n//       }\n//   }\n//\n// Sehingga SATU potong kode di induk:\n//\n//   "SELECT * FROM {$this->table}"\n//\n// melayani users, patients, doctors, appointments...\n//\n// TAPI PERHATIKAN: nama tabel DISATUKAN langsung ke\n// teks kueri, karena placeholder PDO cuma bisa\n// menggantikan NILAI, bukan nama tabel.\n// Aman HANYA karena nilainya ditulis programmer.',
      penjelasan: `
Ada dua hal berbeda yang terjadi di potongan kode ini, dan membedakannya penting.

**Yang pertama: kenapa pewarisan menghemat begitu banyak.**

\`BaseModel\` menulis \`getAll()\`, \`getById()\`, dan \`delete()\` **satu kali**. Kalau ada empat model turunan, itu **tiga fungsi × empat model = dua belas fungsi** yang tidak perlu ditulis.

Dan penghematannya bukan cuma soal jumlah baris. Kalau nanti kamu ingin **semua** operasi hapus mencatat log, kamu menyuntingnya **di satu tempat** dan keempat model ikut berubah.

Yang mengubah satu potong kode menjadi bisa dipakai berulang adalah **\`$this->table\`**. Induknya sengaja **tidak tahu** ia sedang mengurus tabel apa; turunannya yang memberitahu.

**Yang kedua, dan ini jebakannya: kenapa nama tabel tidak pakai placeholder?**

Orang yang baru belajar prepared statement biasanya menyimpulkan *"satukan nilai ke kueri itu berbahaya, jadi jangan pernah menyatukan apa pun"*. Lalu ia mencoba:

- \`$stmt = $db->prepare("SELECT * FROM :tabel");\`

Dan itu **tidak bekerja** — bukan karena PDO lalai, melainkan karena **memang tidak bisa**.

Alasannya ada pada cara prepared statement bekerja. Basis data **menyusun rencana eksekusi** saat \`prepare()\` dipanggil — ia memutuskan indeks mana yang dipakai, tabel mana yang dibaca lebih dulu.

Untuk itu ia **harus sudah tahu tabelnya**. Nilai boleh menyusul; **struktur tidak boleh**.

Jadi pembagiannya begini, dan layak dihafal:

- **Nilai** (yang dicari, yang disimpan) → **selalu** placeholder
- **Struktur** (nama tabel, nama kolom, arah ASC/DESC) → tidak bisa placeholder

Dan karena struktur harus disatukan langsung, ia **hanya boleh berasal dari kode yang kamu tulis sendiri** — tidak pernah dari masukan pengguna.

Kalau suatu saat kamu butuh mengurutkan berdasarkan kolom pilihan pengguna, jangan masukkan namanya langsung. **Cocokkan dulu dengan daftar putih**: kalau masukannya tidak ada di daftar kolom yang kamu izinkan, tolak.
`
    }
  ],

  kode: {
    php: String.raw`<?php
// ============================================
// Struktur model berorientasi objek + PDO
// Skema mengikuti projek klinik sendiri (CPMK01)
//
// Dijalankan memakai PDO SQLite di memori supaya
// hasilnya bisa dibuktikan tanpa memasang MySQL.
// ============================================

// --------------------------------------------
// 1. SINGLETON: satu sambungan untuk seluruh aplikasi
// --------------------------------------------
class Database {
    private static $instance = null;
    private static $jumlahDibuat = 0;

    private function __construct() {}          // dikunci: tidak boleh new
    private function __clone() {}              // dikunci: tidak boleh dikloning

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new PDO('sqlite::memory:');
            self::$instance->setAttribute(
                PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$jumlahDibuat++;             // dihitung untuk pembuktian
        }
        return self::$instance;
    }

    public static function jumlahSambungan() {
        return self::$jumlahDibuat;
    }
}


// --------------------------------------------
// 2. KELAS INDUK ABSTRAK
// --------------------------------------------
abstract class BaseModel {
    protected $db;        // protected: turunan boleh, luar tidak
    protected $table;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getAll() {
        // {$this->table} disatukan langsung -- placeholder TIDAK BISA
        // dipakai untuk nama tabel. Aman karena ditulis programmer.
        $stmt = $this->db->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute([':id' => $id]);        // NILAI -> placeholder
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function delete($id) {
        $stmt = $this->db->prepare(
            "DELETE FROM {$this->table} WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount();
    }

    public function hitung() {
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) AS n FROM {$this->table}");
        $stmt->execute();
        return (int) $stmt->fetch(PDO::FETCH_ASSOC)['n'];
    }
}


// --------------------------------------------
// 3. KELAS TURUNAN
// --------------------------------------------
class UserModel extends BaseModel {
    private $username;                          // private: dikunci rapat

    public function __construct() {
        parent::__construct();                  // warisi sambungan
        $this->table = 'users';                 // <- yang mengisi $table
    }

    public function getUsername()  { return $this->username; }
    public function setUsername($u) { $this->username = $u; }

    // Tambahan khusus users -- tidak ada di induk
    public function cariPeran($peran) {
        $stmt = $this->db->prepare(
            "SELECT username, role FROM users WHERE role = :r");
        $stmt->execute([':r' => $peran]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

class PatientModel extends BaseModel {
    public function __construct() {
        parent::__construct();
        $this->table = 'patients';
    }

    public function getPaginated($limit, $offset) {
        $stmt = $this->db->prepare(
            "SELECT * FROM patients ORDER BY id LIMIT :l OFFSET :o");
        $stmt->bindValue(':l', (int) $limit, PDO::PARAM_INT);
        $stmt->bindValue(':o', (int) $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

class DoctorModel extends BaseModel {
    public function __construct() {
        parent::__construct();
        $this->table = 'doctors';
    }
}


// --------------------------------------------
// 4. Siapkan skema & data contoh
// --------------------------------------------
$db = Database::getInstance();
$db->exec("CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin','dokter','pasien'))
)");
$db->exec("CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    nik TEXT NOT NULL,
    gender TEXT NOT NULL CHECK(gender IN ('L','P')),
    blood_type TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)");
$db->exec("CREATE TABLE doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    consultation_fee REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)");

$isiUser = $db->prepare(
    "INSERT INTO users (username, password, email, role)
     VALUES (:u, :p, :e, :r)");
foreach ([
    ['admin',   'admin@klinik.id',  'admin'],
    ['drbudi',  'budi@klinik.id',   'dokter'],
    ['drsari',  'sari@klinik.id',   'dokter'],
    ['hafizh',  'hafizh@mail.id',   'pasien'],
    ['nadia',   'nadia@mail.id',    'pasien'],
    ['rizky',   'rizky@mail.id',    'pasien'],
] as $u) {
    $isiUser->execute([
        ':u' => $u[0],
        ':p' => password_hash('rahasia123', PASSWORD_BCRYPT),
        ':e' => $u[1],
        ':r' => $u[2],
    ]);
}

$isiPasien = $db->prepare(
    "INSERT INTO patients (user_id, name, nik, gender, blood_type)
     VALUES (:uid, :n, :nik, :g, :bt)");
foreach ([
    [4, 'Hafizh Naufal Raditya', '3302010101040001', 'L', 'O'],
    [5, 'Nadia Puspita',         '3302014505030002', 'P', 'A'],
    [6, 'Rizky Ramadhan',        '3302012012020003', 'L', 'B'],
] as $p) {
    $isiPasien->execute([
        ':uid' => $p[0], ':n' => $p[1], ':nik' => $p[2],
        ':g' => $p[3], ':bt' => $p[4],
    ]);
}

$isiDokter = $db->prepare(
    "INSERT INTO doctors (user_id, name, specialization, consultation_fee)
     VALUES (:uid, :n, :s, :f)");
$isiDokter->execute([':uid' => 2, ':n' => 'dr. Budi Santoso',
                     ':s' => 'Umum',   ':f' => 150000]);
$isiDokter->execute([':uid' => 3, ':n' => 'dr. Sari Wijaya',
                     ':s' => 'Anak',   ':f' => 250000]);


// --------------------------------------------
// 5. Satu kode induk, banyak tabel
// --------------------------------------------
echo "--- satu kode induk melayani semua tabel ---\n";
$model = [
    'UserModel'    => new UserModel(),
    'PatientModel' => new PatientModel(),
    'DoctorModel'  => new DoctorModel(),
];
foreach ($model as $nama => $m) {
    printf("  %-14s -> hitung() = %d baris\n", $nama, $m->hitung());
}
echo "\n";
echo "  Fungsi hitung() ditulis SEKALI di BaseModel.\n";
echo "  Yang membedakan cuma isi \$this->table.\n";


// --------------------------------------------
// 6. Membuktikan Singleton benar-benar tunggal
// --------------------------------------------
echo "\n";
echo "--- membuktikan Singleton ---\n";
$a = Database::getInstance();
$b = Database::getInstance();
$c = (new UserModel())->getById(1);          // model juga memanggilnya
printf("  \$a === \$b ?  %s\n", $a === $b ? 'ya (objek yang SAMA)' : 'tidak');
printf("  sambungan yang pernah dibuat: %d\n", Database::jumlahSambungan());
echo "\n";
echo "  Berapa kali pun getInstance() dipanggil, sambungannya\n";
echo "  tetap SATU. Tanpa Singleton, halaman yang memakai lima\n";
echo "  model akan membuka lima sambungan.\n";


// --------------------------------------------
// 7. Abstract benar-benar tidak bisa dibuatkan objek
// --------------------------------------------
echo "\n";
echo "--- kenapa BaseModel dibuat abstract ---\n";
try {
    $salah = new BaseModel();
    echo "  (berhasil dibuat -- seharusnya TIDAK bisa)\n";
} catch (Error $e) {
    echo "  new BaseModel() -> GAGAL, dan itu memang benar:\n";
    echo "      " . $e->getMessage() . "\n";
}
echo "\n";
echo "  BaseModel tidak mewakili tabel apa pun, jadi objeknya\n";
echo "  tidak punya arti. Kata 'abstract' membuat kesalahan itu\n";
echo "  ketahuan SAAT DITULIS, bukan saat program berjalan.\n";


// --------------------------------------------
// 8. Encapsulation: private benar-benar mengunci
// --------------------------------------------
echo "\n";
echo "--- encapsulation ---\n";
$user = new UserModel();
$user->setUsername('hafizh');
printf("  lewat setter/getter : %s\n", $user->getUsername());
try {
    $x = $user->username;                     // private -> harus gagal
    echo "  akses langsung      : $x  (BOCOR!)\n";
} catch (Error $e) {
    echo "  akses langsung      : GAGAL (benar) -- properti private\n";
}
echo "\n";
echo "  public    : bisa diakses dari mana saja\n";
echo "  protected : hanya kelas ini dan TURUNANNYA\n";
echo "  private   : hanya kelas ini sendiri\n";


// --------------------------------------------
// 9. Fungsi khusus turunan
// --------------------------------------------
echo "\n";
echo "--- turunan boleh menambah fungsinya sendiri ---\n";
foreach (['dokter', 'pasien'] as $peran) {
    $hasil = $user->cariPeran($peran);
    printf("  peran %-7s: %d orang -> %s\n", $peran, count($hasil),
        implode(', ', array_column($hasil, 'username')));
}

echo "\n";
$pasien = new PatientModel();
echo "  getPaginated(2, 0) -- halaman pertama, 2 baris:\n";
foreach ($pasien->getPaginated(2, 0) as $p) {
    printf("      #%d %-24s %s  gol.darah %s\n",
        $p['id'], $p['name'], $p['gender'], $p['blood_type']);
}
echo "  getPaginated(2, 2) -- halaman kedua:\n";
foreach ($pasien->getPaginated(2, 2) as $p) {
    printf("      #%d %-24s %s  gol.darah %s\n",
        $p['id'], $p['name'], $p['gender'], $p['blood_type']);
}


// --------------------------------------------
// 10. ON DELETE CASCADE
// --------------------------------------------
echo "\n";
echo "--- ON DELETE CASCADE ---\n";
$db->exec('PRAGMA foreign_keys = ON');       // SQLite: harus dinyalakan
printf("  sebelum: users=%d  patients=%d\n",
    (new UserModel())->hitung(), $pasien->hitung());
(new UserModel())->delete(6);                 // hapus user 'rizky'
printf("  hapus user id 6 (rizky)\n");
printf("  sesudah: users=%d  patients=%d\n",
    (new UserModel())->hitung(), $pasien->hitung());
echo "\n";
echo "  Baris pasien miliknya ikut terhapus TANPA kode tambahan.\n";
echo "  Aturannya ada di basis data, bukan di aplikasi -- jadi ia\n";
echo "  tetap berlaku meski datanya diubah lewat jalan lain.\n";
echo "\n";
echo "  Catatan: di SQLite foreign key harus dinyalakan dulu lewat\n";
echo "  PRAGMA foreign_keys = ON. Di MySQL InnoDB sudah menyala.\n";
`
  },

  output: `--- satu kode induk melayani semua tabel ---
  UserModel      -> hitung() = 6 baris
  PatientModel   -> hitung() = 3 baris
  DoctorModel    -> hitung() = 2 baris

  Fungsi hitung() ditulis SEKALI di BaseModel.
  Yang membedakan cuma isi $this->table.

--- membuktikan Singleton ---
  $a === $b ?  ya (objek yang SAMA)
  sambungan yang pernah dibuat: 1

  Berapa kali pun getInstance() dipanggil, sambungannya
  tetap SATU. Tanpa Singleton, halaman yang memakai lima
  model akan membuka lima sambungan.

--- kenapa BaseModel dibuat abstract ---
  new BaseModel() -> GAGAL, dan itu memang benar:
      Cannot instantiate abstract class BaseModel

  BaseModel tidak mewakili tabel apa pun, jadi objeknya
  tidak punya arti. Kata 'abstract' membuat kesalahan itu
  ketahuan SAAT DITULIS, bukan saat program berjalan.

--- encapsulation ---
  lewat setter/getter : hafizh
  akses langsung      : GAGAL (benar) -- properti private

  public    : bisa diakses dari mana saja
  protected : hanya kelas ini dan TURUNANNYA
  private   : hanya kelas ini sendiri

--- turunan boleh menambah fungsinya sendiri ---
  peran dokter : 2 orang -> drbudi, drsari
  peran pasien : 3 orang -> hafizh, nadia, rizky

  getPaginated(2, 0) -- halaman pertama, 2 baris:
      #1 Hafizh Naufal Raditya    L  gol.darah O
      #2 Nadia Puspita            P  gol.darah A
  getPaginated(2, 2) -- halaman kedua:
      #3 Rizky Ramadhan           L  gol.darah B

--- ON DELETE CASCADE ---
  sebelum: users=6  patients=3
  hapus user id 6 (rizky)
  sesudah: users=5  patients=2

  Baris pasien miliknya ikut terhapus TANPA kode tambahan.
  Aturannya ada di basis data, bukan di aplikasi -- jadi ia
  tetap berlaku meski datanya diubah lewat jalan lain.

  Catatan: di SQLite foreign key harus dinyalakan dulu lewat
  PRAGMA foreign_keys = ON. Di MySQL InnoDB sudah menyala.`,

  kesalahanUmum: [
    {
      salah: 'Memakai placeholder untuk nama tabel atau nama kolom.',
      kenapa: 'Basis data menyusun rencana eksekusi saat prepare dipanggil, sehingga ia harus sudah tahu tabel dan kolom mana yang dibaca. Nilai boleh menyusul, struktur tidak boleh, jadi kueri seperti SELECT bintang FROM titik dua tabel tidak akan pernah bekerja.',
      benar: 'Satukan nama tabel dan kolom langsung ke teks kueri, tetapi pastikan nilainya berasal dari kode yang kamu tulis sendiri. Kalau harus mengikuti pilihan pengguna, cocokkan dulu dengan daftar putih kolom yang diizinkan.'
    },
    {
      salah: 'Membuka sambungan basis data baru di setiap model atau setiap fungsi.',
      kenapa: 'Membuka sambungan itu mahal, dan satu halaman yang memakai lima model akan membuka lima sambungan sekaligus. Pada aplikasi dengan banyak pengunjung, batas sambungan basis data cepat habis dan pengguna mulai mendapat galat.',
      benar: 'Pakai pola Singleton sehingga getInstance selalu mengembalikan sambungan yang sama, lalu wariskan lewat konstruktor kelas induk.'
    },
    {
      salah: 'Menulis ulang getAll, getById, dan delete di setiap model.',
      kenapa: 'Ketiganya identik kecuali nama tabelnya, sehingga menulis ulang berarti menyalin kode yang sama berkali-kali. Ketika nanti ada perubahan, misalnya menambahkan pencatatan log pada setiap penghapusan, kamu harus menyunting semua model dan pasti ada yang terlewat.',
      benar: 'Taruh operasi bersama di kelas induk abstrak dan biarkan turunan hanya mengisi nama tabelnya lewat konstruktor.'
    },
    {
      salah: 'Membuat properti sambungan dan nama tabel bersifat public.',
      kenapa: 'Kode di luar kelas jadi bisa mengubah nama tabel sebuah model di tengah jalan, atau memakai sambungan mentah untuk menjalankan kueri apa pun tanpa melewati model. Seluruh manfaat pemisahan tanggung jawab hilang.',
      benar: 'Pakai protected untuk yang perlu diwarisi turunan, dan private untuk yang tidak boleh disentuh siapa pun selain kelas itu sendiri.'
    },
    {
      salah: 'Mengandalkan aplikasi untuk menghapus data anak ketika induknya dihapus.',
      kenapa: 'Kalau data diubah lewat jalan lain, misalnya lewat skrip impor atau langsung dari phpMyAdmin, aturan yang hanya ada di kode aplikasi tidak ikut berjalan. Basis data lalu menyimpan baris yatim yang menunjuk induk yang sudah tidak ada.',
      benar: 'Nyatakan ON DELETE CASCADE pada foreign key sehingga aturannya dijaga basis data. Di SQLite jangan lupa menyalakan PRAGMA foreign_keys terlebih dahulu.'
    }
  ],

  analogi: `Bayangkan sebuah **kantor arsip** dengan empat ruangan: berkas pegawai, berkas pasien, berkas dokter, dan berkas janji temu.

**Cara PHP prosedural** adalah setiap orang yang butuh arsip **masuk sendiri ke ruangan mana pun**, mengobrak-abrik lemari, dan mengambil apa yang ia mau.

Untuk kantor kecil ini bekerja. Untuk kantor besar, ini bencana: tidak ada yang tahu **siapa mengambil apa**, dan kalau tata letak lemari diubah, **semua orang** harus diberi tahu.

**Model** adalah menempatkan **seorang petugas di depan tiap ruangan**. Kamu tidak lagi masuk sendiri; kamu **minta pada petugasnya**.

Kalau tata letak lemari di dalam berubah, **hanya petugas itu** yang perlu tahu. Semua orang di luar tetap meminta dengan cara yang sama.

**BaseModel** adalah **pelatihan dasar** yang diberikan kepada keempat petugas: *"ambil semua berkas", "ambil berkas bernomor sekian", "musnahkan berkas bernomor sekian"*.

Pelatihannya **satu kali untuk semua**. Yang membedakan cuma **ruangan mana yang mereka jaga** — dan itu diberitahukan saat mereka mulai bekerja.

Kalau nanti aturan berubah — *"setiap pemusnahan harus dicatat di buku"* — kamu **mengubah pelatihannya**, dan keempat petugas langsung mengikutinya.

Kata **abstract** berarti **tidak ada petugas yang cuma "petugas umum"**. Setiap orang harus menjaga ruangan tertentu. Menugaskan seseorang tanpa ruangan itu **tidak berarti apa-apa**, jadi sistem menolaknya sejak awal.

**Singleton** adalah **satu kunci induk** untuk seluruh gedung. Tanpa itu, tiap petugas membawa kunci sendiri, dan pembuat kunci kewalahan.

Terakhir, **kenapa nama tabel tidak bisa jadi placeholder**.

Bayangkan menelepon petugas dan berkata: *"Tolong ambilkan berkas bernomor —"* lalu kamu sebut nomornya. Petugas bisa **berjalan ke ruangannya dulu** sambil menunggu kamu menyebut nomor.

Tetapi kalau kamu berkata: *"Tolong ambilkan dari ruangan —"* dan belum menyebut ruangannya, ia **tidak bisa mulai berjalan ke mana pun**.

Basis data sama persis: ia **menyusun rencana** sebelum nilainya datang. Nilai boleh menyusul; **ruangannya harus disebut lebih dulu**.`,

  latihan: [
    'Jelaskan apa yang dimaksud kelas model, dan sebutkan keuntungannya dibanding menulis kueri langsung di tiap halaman.',
    'Jelaskan kenapa BaseModel dibuat abstract, dan apa yang terjadi kalau seseorang mencoba membuat objeknya.',
    'Jelaskan perbedaan public, protected, dan private, lalu tentukan modifier yang tepat untuk properti sambungan basis data dan untuk properti kata sandi.',
    'Jelaskan apa itu pola Singleton dan masalah apa yang ia selesaikan pada sambungan basis data.',
    'Tulis kelas AppointmentModel yang mewarisi BaseModel untuk tabel appointments, beserta satu fungsi khusus untuk mencari janji temu berdasarkan tanggal.',
    'Jelaskan kenapa placeholder PDO tidak bisa dipakai untuk nama tabel, dan bagaimana cara aman menangani pengurutan berdasarkan kolom pilihan pengguna.',
    'Jelaskan apa yang dilakukan ON DELETE CASCADE, dan kenapa aturan itu lebih baik ditaruh di basis data daripada di kode aplikasi.'
  ]
});

TOPICS.push({
  id: 'pemweb2-keamanan',
  judul: 'Keamanan Aplikasi Web',
  kategori: 'pemweb2',
  tag: ['SQL injection', 'prepared statement', 'password_hash', 'bcrypt', 'XSS', 'CSRF'],
  ringkas: 'Tiga celah yang paling sering membobol aplikasi mahasiswa — dan satu baris yang menutup masing-masing.',

  fungsi: `**Menutup celah yang paling sering dipakai membobol aplikasi web.**

Terpakai di:

- **Setiap aplikasi** yang menerima masukan dari luar
- **Tugas akhir** — bab keamanan sering diminta
- **Kerja praktik** — celah ini nyata dan sering ditemukan
- **Melindungi data pengguna** yang kamu simpan

Empat celah yang wajib ditutup, dan semuanya bentuk dari satu kalimat: **jangan pernah memperlakukan masukan pengguna sebagai perintah.**

- **SQL injection** → prepared statement
- **Kata sandi bocor** → password_hash dan password_verify
- **XSS** → htmlspecialchars saat menampilkan
- **CSRF** → token acak di sesi

Yang perlu dipahami tentang yang pertama: prepared statement **bukan penyaringan yang lebih baik**, melainkan **pemisahan jalur** — struktur kueri dikunci sebelum nilainya datang.`,

  praktik: {
    tujuan: `Aplikasimu tahan terhadap empat serangan pokok, dan kamu sudah membuktikannya dengan mencoba menyerangnya sendiri.`,
    alat: [
      'PHP dan basis data',
      'Aplikasimu sendiri'
    ],
    langkah: [
      { judul: 'Serang aplikasimu sendiri lebih dulu',
        isi: `Di formulir masukmu, coba isi nama pengguna dengan \`admin' --\` dan \`' OR '1'='1' --\`.

Kalau kamu bisa masuk tanpa tahu kata sandinya, aplikasimu rentan.

**Lakukan hanya pada aplikasimu sendiri.** Mencoba ini pada sistem orang lain melanggar hukum.` },
      { judul: 'Ganti seluruh kueri dengan prepared statement',
        isi: `Sisir kodemu dengan \`grep\` untuk mencari penyatuan variabel ke teks kueri.

Ganti semuanya dengan \`prepare\` dan \`execute\` berparameter.

Lalu ulangi serangan di langkah pertama. Sekarang harus ditolak.` },
      { judul: 'Perbaiki penyimpanan kata sandi',
        isi: `Kalau kata sandi tersimpan mentah atau dengan MD5, ganti dengan \`password_hash($p, PASSWORD_BCRYPT)\`.

Untuk data lama, minta pengguna menggantinya saat masuk berikutnya — hash lama tidak bisa diubah menjadi bcrypt tanpa kata sandi aslinya.

Periksa dengan \`password_verify\`, bukan dengan membandingkan hash.` },
      { judul: 'Buktikan bcrypt lambat dengan sengaja',
        isi: `Ukur waktu satu \`password_hash\` dan satu \`md5\` di komputermu.

Hitung berapa lama menebak satu miliar kali pada masing-masing. Selisihnya dari hitungan menit menjadi hitungan tahun.

Angka ini bagus untuk dicantumkan di laporan.` },
      { judul: 'Tutup XSS di setiap keluaran',
        isi: `Sisir setiap tempat data pengguna ditampilkan, lalu bungkus dengan \`htmlspecialchars($x, ENT_QUOTES, 'UTF-8')\`.

Uji dengan mengirim \`<script>alert(1)</script>\` lewat formulir. Kalau muncul kotak peringatan, celahnya masih terbuka.

Ingat: SQL injection dicegah saat **masuk**, XSS saat **keluar**.` },
      { judul: 'Pasang token CSRF',
        isi: `Buat token acak dengan \`bin2hex(random_bytes(32))\`, simpan di sesi, dan sisipkan sebagai kolom tersembunyi di tiap formulir.

Periksa dengan \`hash_equals\`, bukan \`==\` — perbandingan biasa bisa membocorkan berapa karakter awal yang sudah cocok lewat selisih waktu.

Uji dengan mengirim formulir tanpa token; harus ditolak.` },
      { judul: 'Samakan pesan galat login',
        isi: `Pakai satu pesan yang sama untuk username salah dan kata sandi salah.

Pesan yang berbeda memberi tahu penyerang **username mana yang ada**, dan itu memperkecil pekerjaannya secara berarti.

Periksa juga bahwa pesan galat asli tidak ditampilkan ke pengguna di lingkungan produksi.` }
    ],
    cek: [
      'Serangan admin petik strip strip tidak lagi bisa masuk',
      'Kata sandi di basis datamu berupa hash bcrypt, bukan teks atau MD5',
      'Tag script yang dikirim lewat formulir ditampilkan sebagai teks, bukan dijalankan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa penyaringan tidak cukup',

  konsep: `
Aplikasi web menerima **masukan dari orang yang tidak kamu kenal**. Seluruh keamanannya berpangkal pada satu kalimat: **jangan pernah memperlakukan masukan pengguna sebagai perintah**.

Tiga celah berikut adalah yang paling sering ditemukan pada tugas kuliah, dan ketiganya varian dari kalimat itu.

**1. SQL Injection**

Terjadi ketika masukan pengguna **disatukan** ke dalam teks kueri:

- \`$q = "SELECT * FROM users WHERE username = '$user'";\`

Kalau pengguna mengetik \`admin' --\`, kueri yang jadi:

- \`SELECT * FROM users WHERE username = 'admin' --'\`

Tanda \`--\` memulai komentar SQL, sehingga **sisa kuerinya mati** — termasuk pemeriksaan kata sandi.

**Kenapa menyaring karakter tidak cukup**

Reaksi pertama orang biasanya *"kalau begitu saring saja tanda petiknya"*. Itu **tidak memadai**, karena:

- Karakter berbahayanya **banyak** dan berbeda-beda tiap basis data
- Ada banyak cara **menyandikannya** supaya lolos dari penyaring
- Penyaring dibuat manusia, dan **setiap penyaring punya celah**

**Prepared statement** menyelesaikannya secara **struktural**, bukan dengan menebak:

- \`$stmt = $db->prepare("SELECT * FROM users WHERE username = :u");\`
- \`$stmt->execute([':u' => $user]);\`

Basis data **menyusun rencana kueri lebih dulu**, baru menerima nilainya. Pada saat nilai datang, **strukturnya sudah terkunci** — jadi apa pun isinya, ia **hanya bisa menjadi nilai**, tidak pernah menjadi perintah.

Ini bukan penyaringan yang lebih baik. Ini **pemisahan jalur**.

**2. Kata sandi yang disimpan mentah**

Kesalahan yang paling merugikan, karena akibatnya menyebar **ke luar aplikasimu**.

Orang memakai kata sandi yang sama di banyak tempat. Kalau basis datamu bocor dan sandinya tersimpan mentah, kamu **membocorkan akun mereka di layanan lain**.

- **Jangan simpan mentah**
- **Jangan pakai MD5 atau SHA-1** — keduanya dirancang **cepat**, dan itu justru buruk: penyerang bisa mencoba miliaran tebakan per detik
- **Pakai \`password_hash()\`** dengan **bcrypt** atau **Argon2**

**Kenapa lambat justru bagus**

Bcrypt sengaja dibuat **lambat**, dan tingkat kelambatannya bisa diatur lewat *cost*.

Untuk pengguna sah, satu kali login butuh puluhan milidetik — **tidak terasa**. Untuk penyerang yang harus mencoba miliaran kemungkinan, puluhan milidetik per tebakan berarti **ratusan tahun**.

**Garam** (*salt*) ditambahkan **otomatis** oleh \`password_hash()\`, dan **berbeda tiap kali dipanggil**. Karena itu dua orang dengan kata sandi sama menghasilkan hash **berbeda** — sehingga *rainbow table* tidak berguna, dan penyerang tidak bisa tahu siapa saja yang memakai sandi sama.

Memeriksanya dengan \`password_verify()\`, **bukan** dengan membandingkan hash secara langsung.

**3. XSS (Cross-Site Scripting)**

Terjadi ketika masukan pengguna **ditampilkan kembali** ke halaman tanpa dijinakkan:

- \`echo "Halo, " . $_GET['nama'];\`

Kalau seseorang mengisi \`<script>...</script>\`, skrip itu **berjalan di peramban korban** — dengan hak akses korban, termasuk membaca kukisnya.

Penutupnya: **\`htmlspecialchars()\`** pada setiap keluaran.

Perhatikan polanya: **SQL injection dijinakkan saat MASUK ke basis data, XSS dijinakkan saat KELUAR ke halaman.** Menukar keduanya menghasilkan data yang rusak tersimpan atau celah yang tetap terbuka.

**4. CSRF (Cross-Site Request Forgery)**

Penyerang membuat halaman yang **mengirim permintaan ke aplikasimu** memakai sesi korban yang masih hidup.

Penutupnya: **token CSRF** — nilai acak yang disimpan di sesi dan disisipkan ke setiap formulir, lalu diperiksa saat formulir dikirim. Penyerang tidak bisa membaca sesi korban, jadi ia **tidak bisa menebak tokennya**.

**Yang tidak boleh dilupakan**

- **Validasi di sisi peladen**, selalu. Validasi JavaScript hanya untuk kenyamanan — siapa pun bisa melewatinya.
- **Jangan tampilkan pesan galat asli** ke pengguna; ia membocorkan nama tabel dan struktur.
- **Pesan login gagal harus sama** untuk username salah dan sandi salah. Kalau berbeda, penyerang bisa **mendaftar username yang ada**.
`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: '<?php\n// KENAPA MENYARING KARAKTER TIDAK CUKUP\n//\n// Kueri yang rentan:\n//   "SELECT * FROM users WHERE username = \'$user\'"\n//\n// Masukan penyerang:  admin\' --\n//\n// Kueri yang terbentuk:\n//   SELECT * FROM users WHERE username = \'admin\' --\'\n//                                                ^^ komentar\n//   -> pemeriksaan kata sandi IKUT MATI\n//\n// Reaksi pertama orang: "saring saja tanda petiknya".\n// Tapi karakter berbahayanya banyak, berbeda tiap basis\n// data, dan bisa disandikan supaya lolos.\n//\n// Prepared statement TIDAK menyaring apa pun.\n// Ia MEMISAHKAN JALUR: struktur kueri dikunci dulu,\n// nilainya menyusul lewat jalur terpisah.\n// Apa pun isi nilainya, ia tidak bisa jadi perintah.',
      penjelasan: `
Perbedaan antara **menyaring** dan **memisahkan jalur** adalah inti seluruh topik ini, dan ia berlaku jauh melampaui SQL.

**Menyaring** berarti kamu menerima satu aliran teks yang **bercampur** — perintah dan data jadi satu — lalu berusaha **menebak** bagian mana yang berbahaya.

Cara ini kalah karena kamu berada di pihak yang harus **benar setiap kali**, sementara penyerang cuma perlu **benar sekali**. Ia bisa mencoba tanda petik ganda, penyandian heksadesimal, karakter Unicode yang mirip, komentar bertingkat — dan kamu harus sudah memikirkan semuanya lebih dulu.

**Memisahkan jalur** berarti kamu **tidak pernah mencampurnya sejak awal**.

Ketika \`prepare()\` dipanggil, basis data membaca teks kueri dan **menyusun rencana eksekusi** — memutuskan tabel mana dibaca, indeks mana dipakai, di mana penyaringan terjadi. Pada titik itu **struktur kuerinya sudah jadi dan terkunci**.

Nilai baru dikirim di langkah **berikutnya**, lewat jalur yang berbeda. Basis data menempatkannya ke lubang yang sudah disediakan, dan **tidak pernah membacanya ulang sebagai SQL**.

Jadi kalau pengguna mengetik \`admin' --\`, yang dicari basis data adalah **username yang benar-benar bernama** \`admin' --\` — lengkap dengan tanda petik dan strip di dalamnya. Tentu tidak ada. Pencariannya gagal, seperti seharusnya.

**Tidak ada karakter yang disaring. Tidak ada yang perlu ditebak.**

Sekarang perhatikan bahwa pola yang sama muncul di celah lain, dan menyadarinya membuat semuanya lebih mudah diingat:

- **XSS** — jangan campur data pengguna dengan HTML; jinakkan saat keluar dengan \`htmlspecialchars()\`
- **Command injection** — jangan susun perintah shell dari teks; kirim argumen sebagai daftar terpisah
- **Path traversal** — jangan sambung nama berkas dari pengguna ke jalur; cocokkan dengan daftar putih

Semuanya bentuk yang sama: **campuran itu bahaya, pemisahan itu aman.**

Dan satu hal terakhir yang sering luput: prepared statement **tidak melindungi bagian struktur**. Kalau kamu menyatukan nama kolom pengurutan dari masukan pengguna, celahnya kembali terbuka — karena bagian itu memang tidak bisa dijadikan placeholder.
`
    }
  ],

  kode: {
    php: String.raw`<?php
// ============================================
// Keamanan aplikasi web -- dibuktikan, bukan diandaikan
// Serangannya benar-benar dijalankan di SQLite memori
// ============================================

$db = new PDO('sqlite::memory:');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)");

// Tabel "cara lama": sandi disimpan MENTAH. Inilah yang
// biasanya ditulis orang sebelum belajar hashing.
$db->exec("CREATE TABLE users_lama (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)");

$isi = $db->prepare(
    "INSERT INTO users (username, password, role) VALUES (:u, :p, :r)");
$isiLama = $db->prepare(
    "INSERT INTO users_lama (username, password, role) VALUES (:u, :p, :r)");
foreach ([['admin', 'admin'], ['hafizh', 'pasien'], ['nadia', 'pasien']] as $u) {
    $isi->execute([
        ':u' => $u[0],
        ':p' => password_hash('rahasia123', PASSWORD_BCRYPT),
        ':r' => $u[1],
    ]);
    $isiLama->execute([':u' => $u[0], ':p' => 'rahasia123', ':r' => $u[1]]);
}


// --------------------------------------------
// 1. Login RENTAN: masukan disatukan ke kueri
// --------------------------------------------
function loginRentan($db, $user, $sandi) {
    // Dua kesalahan sekaligus, dan keduanya lazim:
    //   (a) masukan disatukan ke teks kueri
    //   (b) sandi dibandingkan MENTAH, bukan lewat password_verify
    // Kuerinya SATU BARIS -- kalau dipecah beberapa baris,
    // komentar "--" hanya mematikan sampai akhir barisnya saja.
    $q = "SELECT * FROM users_lama WHERE username = '$user' AND password = '$sandi'";
    $baris = $db->query($q)->fetchAll(PDO::FETCH_ASSOC);
    return [$q, $baris];
}


// --------------------------------------------
// 2. Login AMAN: prepared statement + password_verify
// --------------------------------------------
function loginAman($db, $user, $sandi) {
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :u");
    $stmt->execute([':u' => $user]);
    $baris = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($baris && password_verify($sandi, $baris['password'])) {
        return $baris;
    }
    return false;
}


// --------------------------------------------
// 3. Menyerang keduanya dengan masukan yang sama
// --------------------------------------------
echo "--- serangan SQL injection, dijalankan sungguhan ---\n";

// Kolom terakhir menandai mana yang benar-benar SERANGAN,
// supaya login sah tidak salah dicap pembobolan.
$SERANGAN = [
    ["admin", "rahasia123",        "login normal, sandi benar",       false],
    ["admin", "salah",             "login normal, sandi salah",       false],
    ["admin' --", "apa saja",      "komentar SQL mematikan cek sandi", true],
    ["' OR '1'='1' --", "apa saja", "syarat selalu benar + komentar",  true],
];

foreach ($SERANGAN as $s) {
    list($user, $sandi, $ket, $adalahSerangan) = $s;
    echo "\n  masukan username: " . $user . "\n";
    echo "  keterangan      : " . $ket . "\n";

    list($q, $hasil) = loginRentan($db, $user, $sandi);
    $ringkas = preg_replace('/\s+/', ' ', $q);
    echo "  kueri terbentuk : " . $ringkas . "\n";
    printf("  RENTAN -> %s\n",
        count($hasil) > 0
            ? "MASUK sebagai '" . $hasil[0]['username'] .
              "' (" . count($hasil) . " baris cocok)" .
              ($adalahSerangan ? "  <-- BOBOL, sandinya tidak diketahui!" : "")
            : "ditolak");

    $aman = loginAman($db, $user, $sandi);
    printf("  AMAN   -> %s\n",
        $aman ? "MASUK sebagai '" . $aman['username'] . "'" : "ditolak");
}

echo "\n";
echo "  Yang aman TIDAK menyaring satu karakter pun.\n";
echo "  Ia mencari username yang benar-benar bernama \"admin' --\",\n";
echo "  lengkap dengan petik dan stripnya. Tentu tidak ada.\n";


// --------------------------------------------
// 4. Serangan yang MENGUBAH data
// --------------------------------------------
echo "\n";
echo "--- injection tidak cuma membaca, tapi bisa MENGHAPUS ---\n";
$db->exec("CREATE TABLE catatan (id INTEGER PRIMARY KEY, isi TEXT)");
$db->exec("INSERT INTO catatan (isi) VALUES ('rekam medis A'),
           ('rekam medis B'), ('rekam medis C')");

function hitungCatatan($db) {
    return (int) $db->query("SELECT COUNT(*) n FROM catatan")
                    ->fetch(PDO::FETCH_ASSOC)['n'];
}

printf("  sebelum: %d catatan\n", hitungCatatan($db));

$jahat = "1; DELETE FROM catatan";
echo "  masukan id: " . $jahat . "\n";

// PDO::exec pada SQLite menjalankan banyak pernyataan sekaligus
try {
    $db->exec("SELECT * FROM catatan WHERE id = $jahat");
} catch (PDOException $e) {
    echo "  (pernyataan bertumpuk ditolak driver)\n";
}
printf("  sesudah: %d catatan", hitungCatatan($db));
echo hitungCatatan($db) === 0 ? "   <-- SEMUA TERHAPUS\n" : "\n";

echo "\n";
echo "  Apakah pernyataan bertumpuk bisa dijalankan itu\n";
echo "  BERGANTUNG PADA DRIVER. Jangan pernah mengandalkan\n";
echo "  driver untuk melindungimu -- pakai prepared statement.\n";


// --------------------------------------------
// 5. Kata sandi: mentah, MD5, dan bcrypt
// --------------------------------------------
echo "\n";
echo "--- menyimpan kata sandi ---\n";
$sandi = 'rahasia123';

printf("  %-22s %s\n", "mentah", $sandi);
printf("  %-22s %s\n", "md5 (JANGAN)", md5($sandi));
printf("  %-22s %s\n", "sha1 (JANGAN)", sha1($sandi));
$b1 = password_hash($sandi, PASSWORD_BCRYPT);
$b2 = password_hash($sandi, PASSWORD_BCRYPT);
printf("  %-22s %s\n", "bcrypt panggilan 1", $b1);
printf("  %-22s %s\n", "bcrypt panggilan 2", $b2);

echo "\n";
printf("  md5 dipanggil dua kali sama?    %s\n",
    md5($sandi) === md5($sandi) ? 'YA  <-- rainbow table berguna' : 'tidak');
printf("  bcrypt dipanggil dua kali sama? %s\n",
    $b1 === $b2 ? 'ya' : 'TIDAK <-- garam berbeda tiap kali');
printf("  keduanya lolos password_verify? %s\n",
    (password_verify($sandi, $b1) && password_verify($sandi, $b2))
        ? 'ya, dua-duanya' : 'tidak');

echo "\n";
echo "  Karena garamnya berbeda, dua orang dengan sandi SAMA\n";
echo "  menghasilkan hash BERBEDA. Penyerang jadi tidak bisa\n";
echo "  tahu siapa saja yang memakai sandi yang sama.\n";


// --------------------------------------------
// 6. Kenapa LAMBAT justru bagus
// --------------------------------------------
echo "\n";
echo "--- kenapa bcrypt sengaja dibuat lambat ---\n";
echo "  (angka waktu di bawah DIUKUR saat kode ini dijalankan,\n";
echo "   jadi akan berbeda di komputer lain. Yang tetap adalah\n";
echo "   PERBANDINGANNYA: bcrypt ribuan kali lebih lambat.)\n";
echo "\n";
echo "  cost   waktu 1 hash   tebakan/detik   waktu coba 1 miliar\n";

// Satuan waktu dipilih otomatis; menulis semuanya dalam "tahun"
// membuat angka kecil tampil sebagai 0.0 dan justru menyembunyikan
// selisih yang mau ditunjukkan.
function lamanya($detik) {
    if ($detik < 60)          return sprintf("%.0f detik", $detik);
    if ($detik < 3600)        return sprintf("%.1f menit", $detik / 60);
    if ($detik < 86400)       return sprintf("%.1f jam",   $detik / 3600);
    if ($detik < 86400 * 365) return sprintf("%.1f hari",  $detik / 86400);
    return sprintf("%.1f tahun", $detik / 86400 / 365);
}

foreach ([4, 8, 10, 12] as $cost) {
    $mulai = microtime(true);
    password_hash($sandi, PASSWORD_BCRYPT, ['cost' => $cost]);
    $detik = microtime(true) - $mulai;
    $perDetik = $detik > 0 ? 1 / $detik : INF;
    printf("  %4d   %10.2f ms   %13.0f   %s\n",
        $cost, $detik * 1000, $perDetik, lamanya(1e9 / $perDetik));
}

$mulai = microtime(true);
for ($i = 0; $i < 200000; $i++) { md5($sandi . $i); }
$detikMd5 = microtime(true) - $mulai;
$md5PerDetik = 200000 / $detikMd5;
printf("\n  md5    %10.5f ms   %13.0f   %s\n",
    $detikMd5 / 200000 * 1000, $md5PerDetik, lamanya(1e9 / $md5PerDetik));

echo "\n";
echo "  Untuk pengguna sah, satu login butuh puluhan milidetik\n";
echo "  -- tidak terasa. Untuk penyerang yang harus mencoba\n";
echo "  miliaran kemungkinan, selisih itu MENENTUKAN.\n";
echo "\n";
echo "  MD5 cepat, dan justru itulah yang membuatnya buruk\n";
echo "  untuk kata sandi.\n";


// --------------------------------------------
// 7. XSS: dijinakkan saat KELUAR
// --------------------------------------------
echo "\n";
echo "--- XSS ---\n";
$masukan = '<script>curi(document.cookie)</script>';

echo "  masukan pengguna:\n";
echo "      " . $masukan . "\n";
echo "\n";
echo "  ditulis LANGSUNG ke halaman (BAHAYA):\n";
echo "      Halo, " . $masukan . "\n";
echo "      -> peramban korban MENJALANKAN skrip itu\n";
echo "\n";
echo "  lewat htmlspecialchars (AMAN):\n";
echo "      Halo, " . htmlspecialchars($masukan, ENT_QUOTES, 'UTF-8') . "\n";
echo "      -> peramban MENAMPILKANNYA sebagai teks biasa\n";

echo "\n";
echo "  Perhatikan polanya:\n";
echo "      SQL injection dijinakkan saat MASUK ke basis data\n";
echo "      XSS           dijinakkan saat KELUAR ke halaman\n";
echo "\n";
echo "  Menukar keduanya menghasilkan data rusak yang tersimpan,\n";
echo "  atau celah yang tetap terbuka.\n";


// --------------------------------------------
// 8. Token CSRF
// --------------------------------------------
echo "\n";
echo "--- token CSRF ---\n";
$sesi = ['csrf' => bin2hex(random_bytes(16))];
printf("  token di sesi korban : %s\n", $sesi['csrf']);

$KIRIMAN = [
    ["formulir sah kita sendiri", $sesi['csrf']],
    ["halaman penyerang",         bin2hex(random_bytes(16))],
    ["penyerang tanpa token",     ''],
];
foreach ($KIRIMAN as $k) {
    list($asal, $token) = $k;
    $sah = hash_equals($sesi['csrf'], $token);
    printf("  %-26s -> %s\n", $asal, $sah ? 'DITERIMA' : 'DITOLAK');
}

echo "\n";
echo "  Penyerang bisa membuat pengguna MENGIRIM permintaan,\n";
echo "  tapi ia tidak bisa MEMBACA sesi korban -- jadi ia tidak\n";
echo "  bisa menebak tokennya.\n";
echo "\n";
echo "  Bandingkan pakai hash_equals(), bukan ==, supaya waktu\n";
echo "  perbandingannya tidak membocorkan berapa karakter awal\n";
echo "  yang sudah tertebak.\n";


// --------------------------------------------
// 9. Pesan galat yang membocorkan
// --------------------------------------------
echo "\n";
echo "--- pesan galat login ---\n";
$UJI = [
    ['tidakada', 'apa saja'],
    ['admin',    'sandisalah'],
];
echo "  BURUK -- pesannya berbeda:\n";
foreach ($UJI as $u) {
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :u");
    $stmt->execute([':u' => $u[0]]);
    $ada = $stmt->fetch(PDO::FETCH_ASSOC);
    printf("      %-10s -> %s\n", $u[0],
        $ada ? "Kata sandi salah" : "Username tidak terdaftar");
}
echo "      -> penyerang jadi tahu username mana yang ADA\n";
echo "\n";
echo "  BAIK -- pesannya sama:\n";
foreach ($UJI as $u) {
    printf("      %-10s -> %s\n", $u[0], "Username atau kata sandi salah");
}
echo "      -> tidak ada yang bisa disimpulkan\n";


// --------------------------------------------
// 10. Ringkasan
// --------------------------------------------
echo "\n";
echo "--- ringkasan: satu baris penutup tiap celah ---\n";
$RINGKAS = [
    ['SQL injection', 'menyatukan masukan ke teks kueri',
     '$db->prepare(...) lalu execute([...])'],
    ['Sandi bocor',   'menyimpan mentah atau md5',
     'password_hash() + password_verify()'],
    ['XSS',           'menulis masukan langsung ke HTML',
     'htmlspecialchars($x, ENT_QUOTES, "UTF-8")'],
    ['CSRF',          'menerima formulir tanpa memeriksa asal',
     'token acak di sesi + hash_equals()'],
];
foreach ($RINGKAS as $r) {
    printf("  %-15s %s\n", $r[0], $r[1]);
    printf("  %-15s -> %s\n", '', $r[2]);
}

echo "\n";
echo "  Keempatnya bentuk dari satu kalimat yang sama:\n";
echo "  JANGAN PERNAH MEMPERLAKUKAN MASUKAN PENGGUNA\n";
echo "  SEBAGAI PERINTAH.\n";
`
  },

  output: `--- serangan SQL injection, dijalankan sungguhan ---

  masukan username: admin
  keterangan      : login normal, sandi benar
  kueri terbentuk : SELECT * FROM users_lama WHERE username = 'admin' AND password = 'rahasia123'
  RENTAN -> MASUK sebagai 'admin' (1 baris cocok)
  AMAN   -> MASUK sebagai 'admin'

  masukan username: admin
  keterangan      : login normal, sandi salah
  kueri terbentuk : SELECT * FROM users_lama WHERE username = 'admin' AND password = 'salah'
  RENTAN -> ditolak
  AMAN   -> ditolak

  masukan username: admin' --
  keterangan      : komentar SQL mematikan cek sandi
  kueri terbentuk : SELECT * FROM users_lama WHERE username = 'admin' --' AND password = 'apa saja'
  RENTAN -> MASUK sebagai 'admin' (1 baris cocok)  <-- BOBOL, sandinya tidak diketahui!
  AMAN   -> ditolak

  masukan username: ' OR '1'='1' --
  keterangan      : syarat selalu benar + komentar
  kueri terbentuk : SELECT * FROM users_lama WHERE username = '' OR '1'='1' --' AND password = 'apa saja'
  RENTAN -> MASUK sebagai 'admin' (3 baris cocok)  <-- BOBOL, sandinya tidak diketahui!
  AMAN   -> ditolak

  Yang aman TIDAK menyaring satu karakter pun.
  Ia mencari username yang benar-benar bernama "admin' --",
  lengkap dengan petik dan stripnya. Tentu tidak ada.

--- injection tidak cuma membaca, tapi bisa MENGHAPUS ---
  sebelum: 3 catatan
  masukan id: 1; DELETE FROM catatan
  sesudah: 0 catatan   <-- SEMUA TERHAPUS

  Apakah pernyataan bertumpuk bisa dijalankan itu
  BERGANTUNG PADA DRIVER. Jangan pernah mengandalkan
  driver untuk melindungimu -- pakai prepared statement.

--- menyimpan kata sandi ---
  mentah                 rahasia123
  md5 (JANGAN)           7f95b733f4210c71482904eb422143f8
  sha1 (JANGAN)          68bd72cfcd18bd2c3c781bbced1c59fb4dd67c03
  bcrypt panggilan 1     $2y$12$YLjcPcr7/dWesXu9TTO.JebXIoCEenIj4fZ2.8BHgXT7wL7LgbQ26
  bcrypt panggilan 2     $2y$12$QJoasQ3vRGaWc30.IGAL7eBYzs4lUncBRCP.WYNRaulS/E3PSi4je

  md5 dipanggil dua kali sama?    YA  <-- rainbow table berguna
  bcrypt dipanggil dua kali sama? TIDAK <-- garam berbeda tiap kali
  keduanya lolos password_verify? ya, dua-duanya

  Karena garamnya berbeda, dua orang dengan sandi SAMA
  menghasilkan hash BERBEDA. Penyerang jadi tidak bisa
  tahu siapa saja yang memakai sandi yang sama.

--- kenapa bcrypt sengaja dibuat lambat ---
  (angka waktu di bawah DIUKUR saat kode ini dijalankan,
   jadi akan berbeda di komputer lain. Yang tetap adalah
   PERBANDINGANNYA: bcrypt ribuan kali lebih lambat.)

  cost   waktu 1 hash   tebakan/detik   waktu coba 1 miliar
     4         1.25 ms             800   14.5 hari
     8        19.68 ms              51   227.7 hari
    10        76.42 ms              13   2.4 tahun
    12       305.71 ms               3   9.7 tahun

  md5       0.00034 ms         2962037   5.6 menit

  Untuk pengguna sah, satu login butuh puluhan milidetik
  -- tidak terasa. Untuk penyerang yang harus mencoba
  miliaran kemungkinan, selisih itu MENENTUKAN.

  MD5 cepat, dan justru itulah yang membuatnya buruk
  untuk kata sandi.

--- XSS ---
  masukan pengguna:
      <script>curi(document.cookie)</script>

  ditulis LANGSUNG ke halaman (BAHAYA):
      Halo, <script>curi(document.cookie)</script>
      -> peramban korban MENJALANKAN skrip itu

  lewat htmlspecialchars (AMAN):
      Halo, &lt;script&gt;curi(document.cookie)&lt;/script&gt;
      -> peramban MENAMPILKANNYA sebagai teks biasa

  Perhatikan polanya:
      SQL injection dijinakkan saat MASUK ke basis data
      XSS           dijinakkan saat KELUAR ke halaman

  Menukar keduanya menghasilkan data rusak yang tersimpan,
  atau celah yang tetap terbuka.

--- token CSRF ---
  token di sesi korban : 0e7706dab82750237353cf4d34074b18
  formulir sah kita sendiri  -> DITERIMA
  halaman penyerang          -> DITOLAK
  penyerang tanpa token      -> DITOLAK

  Penyerang bisa membuat pengguna MENGIRIM permintaan,
  tapi ia tidak bisa MEMBACA sesi korban -- jadi ia tidak
  bisa menebak tokennya.

  Bandingkan pakai hash_equals(), bukan ==, supaya waktu
  perbandingannya tidak membocorkan berapa karakter awal
  yang sudah tertebak.

--- pesan galat login ---
  BURUK -- pesannya berbeda:
      tidakada   -> Username tidak terdaftar
      admin      -> Kata sandi salah
      -> penyerang jadi tahu username mana yang ADA

  BAIK -- pesannya sama:
      tidakada   -> Username atau kata sandi salah
      admin      -> Username atau kata sandi salah
      -> tidak ada yang bisa disimpulkan

--- ringkasan: satu baris penutup tiap celah ---
  SQL injection   menyatukan masukan ke teks kueri
                  -> $db->prepare(...) lalu execute([...])
  Sandi bocor     menyimpan mentah atau md5
                  -> password_hash() + password_verify()
  XSS             menulis masukan langsung ke HTML
                  -> htmlspecialchars($x, ENT_QUOTES, "UTF-8")
  CSRF            menerima formulir tanpa memeriksa asal
                  -> token acak di sesi + hash_equals()

  Keempatnya bentuk dari satu kalimat yang sama:
  JANGAN PERNAH MEMPERLAKUKAN MASUKAN PENGGUNA
  SEBAGAI PERINTAH.`,

  kesalahanUmum: [
    {
      salah: 'Menutup SQL injection dengan menyaring tanda petik dan kata kunci berbahaya.',
      kenapa: 'Kamu harus benar setiap kali, sedangkan penyerang cukup benar sekali. Karakter berbahayanya banyak, berbeda antar basis data, dan bisa disandikan agar lolos dari penyaring buatan sendiri.',
      benar: 'Pakai prepared statement, yang tidak menyaring apa pun melainkan memisahkan jalur struktur kueri dari jalur nilai, sehingga nilai tidak mungkin ditafsirkan sebagai perintah.'
    },
    {
      salah: 'Menyimpan kata sandi dengan MD5 atau SHA-1 dengan anggapan sudah teracak.',
      kenapa: 'Keduanya dirancang cepat, sehingga penyerang bisa mencoba miliaran tebakan per detik pada perangkat biasa. Keduanya juga tidak bergaram, jadi dua orang dengan sandi sama menghasilkan hash sama dan tabel pelangi langsung berguna.',
      benar: 'Pakai password_hash dengan bcrypt atau Argon2 yang sengaja lambat dan memberi garam berbeda setiap kali, lalu periksa dengan password_verify.'
    },
    {
      salah: 'Membandingkan hasil hash kata sandi secara langsung dengan tanda sama dengan.',
      kenapa: 'Hasil password_hash berbeda setiap kali dipanggil karena garamnya acak, sehingga perbandingan langsung selalu gagal meski sandinya benar. Perbandingan langsung juga rawan bocor lewat selisih waktu eksekusi.',
      benar: 'Pakai password_verify yang membaca garam dari hash tersimpan dan membandingkan dengan cara yang aman terhadap pengukuran waktu.'
    },
    {
      salah: 'Menjinakkan masukan pengguna saat menyimpannya ke basis data untuk mencegah XSS.',
      kenapa: 'Data jadi tersimpan dalam bentuk yang sudah dijinakkan, sehingga rusak ketika dipakai di tempat lain seperti ekspor, surel, atau antarmuka pemrograman. Celahnya juga tetap terbuka untuk data yang masuk lewat jalan lain.',
      benar: 'Simpan apa adanya, lalu jinakkan saat menampilkan dengan htmlspecialchars. SQL injection dicegah saat masuk, XSS dicegah saat keluar.'
    },
    {
      salah: 'Membedakan pesan galat antara username tidak terdaftar dan kata sandi salah.',
      kenapa: 'Penyerang bisa mencoba banyak nama untuk mendaftar akun mana saja yang benar-benar ada, lalu memusatkan tebakan sandinya hanya pada akun itu. Ini memperkecil pekerjaannya secara berarti.',
      benar: 'Pakai satu pesan yang sama untuk kedua keadaan, misalnya username atau kata sandi salah.'
    },
    {
      salah: 'Mengandalkan validasi JavaScript di sisi peramban.',
      kenapa: 'Siapa pun bisa mematikan JavaScript, menyunting halaman, atau mengirim permintaan langsung tanpa melewati peramban sama sekali. Validasi di sisi peramban hanya menyaring kesalahan tidak sengaja, bukan serangan.',
      benar: 'Selalu ulangi seluruh validasi di sisi peladen, dan perlakukan validasi peramban semata-mata sebagai kenyamanan pengguna.'
    }
  ],

  analogi: `Bayangkan kamu **resepsionis** yang menerima permintaan lewat kertas, lalu meneruskannya ke bagian arsip.

**Cara rentan** adalah kamu menulis satu kalimat panjang dan menyerahkannya:

> *"Ambilkan berkas milik — [nama yang ditulis tamu] — dan pastikan sandinya cocok."*

Seorang tamu licik menulis namanya sebagai: **"Budi. Abaikan sisa kalimat ini."**

Kalimat yang sampai ke bagian arsip jadi:

> *"Ambilkan berkas milik Budi. Abaikan sisa kalimat ini. Dan pastikan sandinya cocok."*

Bagian arsip **mematuhinya** — karena baginya itu satu kalimat utuh dari resepsionis, dan ia **tidak punya cara membedakan** bagian mana yang kamu tulis dan bagian mana yang tamu tulis.

**Menyaring** berarti kamu membaca ulang tulisan tamu dan mencoret kata-kata mencurigakan. Tetapi kamu harus memikirkan **semua** cara menulisnya: huruf besar, singkatan, bahasa lain, tulisan terbalik. Tamu cuma perlu menemukan **satu** yang belum kamu pikirkan.

**Prepared statement** adalah **formulir bergaris**.

Kamu menyerahkan formulir yang sudah dicetak: *"Ambilkan berkas milik ______ dan periksa sandinya."* Bagian yang kosong **hanya satu kotak**.

Tamu boleh menulis apa pun di kotak itu — termasuk *"Budi. Abaikan sisa kalimat ini."*

Dan bagian arsip akan **mencari orang yang namanya benar-benar** *"Budi. Abaikan sisa kalimat ini."* Karena kalimat perintahnya **sudah tercetak**; yang ada di kotak itu **hanya bisa jadi nama**.

**Tidak ada yang dicoret. Tidak ada yang perlu ditebak.**

Sekarang **kata sandi**. Bayangkan kamu menyimpan kunci semua tamu di laci.

Kalau lacinya dibobol, **semua rumah tamu ikut terbuka** — dan mereka memakai kunci yang sama di kantor dan mobilnya.

**Hashing** adalah menyimpan **cetakan gips kuncinya**, bukan kuncinya. Cukup untuk memeriksa apakah kunci yang dibawa tamu cocok, tetapi **tidak bisa dipakai membuka pintu**.

**MD5** adalah cetakan gips yang bisa dibuat **dalam sekejap** — sehingga pembobol bisa mencetak miliaran kunci percobaan dan mencocokkannya.

**Bcrypt** adalah cetakan yang **butuh sepersepuluh detik**. Bagi tamu yang datang sekali, itu tidak terasa. Bagi pembobol yang harus mencoba miliaran, itu **berabad-abad**.

Dan **garam** adalah menambahkan **serpihan acak yang berbeda** ke setiap cetakan. Dua tamu dengan kunci identik menghasilkan cetakan yang **sama sekali berbeda** — jadi pembobol bahkan tidak bisa tahu **siapa saja yang memakai kunci yang sama**.`,

  latihan: [
    'Jelaskan bagaimana masukan admin petik strip strip bisa melewati pemeriksaan kata sandi, dan tulis kueri yang terbentuk karenanya.',
    'Jelaskan perbedaan menyaring karakter dan memisahkan jalur, lalu jelaskan kenapa yang kedua lebih kuat.',
    'Tulis ulang fungsi login yang rentan pada materi ini menjadi versi aman memakai prepared statement dan password_verify.',
    'Jelaskan kenapa MD5 tidak boleh dipakai untuk kata sandi meski hasilnya sudah teracak.',
    'Jelaskan apa itu garam pada hashing kata sandi, dan sebutkan dua serangan yang ia patahkan.',
    'Jelaskan kenapa bcrypt sengaja dibuat lambat, dan hitung berapa lama penyerang butuh mencoba satu miliar tebakan pada kecepatan sepuluh hash per detik.',
    'Jelaskan kenapa SQL injection dicegah saat masuk sedangkan XSS dicegah saat keluar, dan apa akibatnya kalau keduanya ditukar.',
    'Jelaskan cara kerja token CSRF, dan kenapa penyerang tidak bisa menebaknya.',
    'Jelaskan kenapa pesan login gagal harus sama untuk username salah dan kata sandi salah.'
  ]
});


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (tiga topik di bawah).

   Dua topik pertama berkas ini berasal dari projek kuliah
   sendiri. Tiga topik berikutnya disusun dari pokok bahasan
   yang berulang di deskripsi mata kuliah Pemrograman Web
   lanjut dan pengembangan API di kampus lain -- dasar HTTP,
   rancangan API, autentikasi token/JWT, API yang memakai
   basis data -- dilengkapi spesifikasi HTTP (RFC 9110) dan
   dokumentasi resmi PHP.

   Materi yang sudah ada di Pemrograman Web I (MVC, routing,
   dasar sesi PHP) dan di topik Keamanan Aplikasi Web di atas
   (bcrypt, SQL injection, XSS, CSRF) sengaja tidak diulang.

   Seperti topik di atas, ketiga program PHP-nya benar-benar
   dijalankan (PHP 8.4, PDO SQLite dalam memori), dan
   keluarannya disalin apa adanya. Angka waktu di topik kueri
   DIUKUR di satu mesin; angka jeda jaringan DIHITUNG.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'pemweb2-rest-api',
  judul: 'Merancang REST API dengan PHP',
  kategori: 'pemweb2',
  tag: ['REST', 'API', 'HTTP', 'kode status', 'idempoten', 'paginasi', 'JSON'],
  ringkas: 'URL menunjuk benda, metode menyatakan tindakan, dan kode status memberi tahu pemanggil apa yang harus ia lakukan berikutnya.',

  fungsi: `**Membuat aplikasi web bisa dipakai oleh program lain — aplikasi ponsel, halaman JavaScript, atau layanan lain — lewat pertukaran JSON di atas HTTP.**

Terpakai di:

- **Aplikasi ponsel** yang mengambil data dari peladen PHP-mu
- **Halaman web dinamis** yang memuat data dengan \`fetch()\` tanpa memuat ulang halaman
- **Integrasi antarsistem** — misalnya sistem akademik yang mengirim nilai ke sistem lain
- **Proyek akhir** dengan pemisahan frontend dan backend
- **Membaca dokumentasi API orang lain** — pola yang sama dipakai hampir semua layanan

Yang paling sering diabaikan: **kode status.** Pemanggil API adalah program, bukan manusia. Ia tidak membaca pesan galat yang ramah — ia membaca angka 201, 404, atau 422, lalu memutuskan apa yang dilakukan. Menjawab semua kegagalan dengan 400 atau 500 membuat pemanggil cuma bisa menebak.

Dan yang paling mahal kalau salah: **tindakan yang aman diulang.** Jaringan ponsel sering putus di tengah jalan, dan aplikasi yang baik mencoba ulang. Kalau API-mu tidak dirancang untuk itu, satu kali tekan tombol bisa menjadi tiga pesanan.`,

  praktik: {
    tujuan: 'Kamu punya API buku dengan jalur berbentuk kata benda, kode status yang berbeda untuk setiap jenis kegagalan, operasi PUT yang aman diulang, dan paginasi dengan meta — dan sudah mengujinya lewat HTTP sungguhan.',
    alat: ['PHP 8 dengan ekstensi PDO SQLite atau MySQL', 'Peladen bawaan PHP (php -S)', 'curl dari Git Bash, atau Postman'],
    langkah: [
      { judul: 'Tulis daftar sumber daya, bukan daftar tindakan',
        isi: `Sebelum menulis kode, tulis kata bendanya: \`/buku\` untuk koleksi, \`/buku/{id}\` untuk satu buku.

Lalu pasangkan dengan metode: GET membaca, POST membuat, PUT mengganti, DELETE menghapus. Kalau kamu tergoda menulis \`/tambahBuku\`, itu tanda kata kerjanya belum dipindah ke metode.` },
      { judul: 'Buat satu titik masuk',
        isi: `Satu berkas \`index.php\` menerima semua permintaan dan meneruskannya ke fungsi penangan:

- metode dari \`$_SERVER['REQUEST_METHOD']\`
- jalur dari \`parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)\`
- badan dari \`file_get_contents('php://input')\`

Kirim jawabannya dengan \`http_response_code($status)\`, \`header('Content-Type: application/json')\`, lalu \`echo json_encode($isi)\`. Jalankan dengan \`php -S localhost:8000 index.php\`.` },
      { judul: 'Pisahkan penangan dari HTTP',
        isi: `Fungsi penangan menerima metode, jalur, dan badan, lalu **mengembalikan** status dan isi — ia tidak memanggil \`header()\` atau \`echo\` sendiri.

Dengan begitu penangan bisa diuji langsung dari baris perintah, persis seperti program di topik ini, tanpa peramban dan tanpa peladen.` },
      { judul: 'Beri kode status yang berbeda untuk setiap kegagalan',
        isi: `Periksa berurutan: bisakah badannya dibaca (400)? Apakah isinya sah (422)? Apakah bertabrakan dengan data yang ada (409)? Apakah yang dicari ada (404)? Apakah metodenya didukung di jalur ini (405)?

Urutan itu penting: pemanggil perlu tahu kegagalan **pertama** yang harus ia perbaiki.` },
      { judul: 'Uji lewat HTTP sungguhan',
        isi: `Kirim permintaan dengan curl dan opsi \`-i\` supaya baris status ikut tampil:

\`curl -i -X POST localhost:8000/buku -H "Content-Type: application/json" -d '{"isbn":"9786020332956","judul":"Laskar Pelangi"}'\`

Pastikan baris pertama jawabannya \`HTTP/1.1 201 Created\`, bukan 200.` },
      { judul: 'Kirim permintaan yang sama tiga kali',
        isi: `Ulangi POST yang sama tiga kali, lalu PUT yang sama tiga kali. Hitung jumlah baris dan periksa isinya.

POST kedua dan ketiga harus ditolak — oleh kolom unik, bukan oleh pemeriksaan di PHP. PUT harus menghasilkan keadaan yang sama persis setiap kali.` },
      { judul: 'Tambahkan paginasi sebelum datanya besar',
        isi: `Terima \`halaman\` dan \`per_halaman\` dari query string, beri batas atas untuk \`per_halaman\` (misalnya 100), dan sertakan meta \`total\` serta \`jumlah_halaman\` di jawaban.

Menambahkan paginasi setelah aplikasi ponsel terlanjur memakai API-mu berarti mengubah bentuk jawaban — dan itu merusak pemanggil lama.` },
      { judul: 'Lengkapi header yang diwajibkan',
        isi: `Jawaban 201 sebaiknya menyertakan header \`Location\` berisi alamat sumber daya baru, misalnya \`/buku/3\`.

Jawaban 405 **wajib** menyertakan header \`Allow\` yang menyebut metode yang didukung jalur itu, misalnya \`Allow: GET, PUT, DELETE\`. Program di topik ini memanggil penangan langsung sehingga header tidak tampil, tetapi di \`index.php\` keduanya harus dikirim.` }
    ],
    cek: [
      'Tidak ada satu pun jalur API-mu yang mengandung kata kerja',
      'Badan rusak, isian salah, ISBN kembar, dan buku yang tidak ada masing-masing mendapat kode status berbeda',
      'Tiga PUT yang sama menghasilkan keadaan yang sama, dan tiga POST yang sama tidak menghasilkan tiga baris',
      'GET koleksi memakai paginasi dengan batas atas per halaman dan meta total'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — urutan pemeriksaan yang menentukan kode status, dan kenapa PUT boleh diulang',

  konsep: `Aplikasi web yang kamu buat di Pemrograman Web I mengirim **halaman HTML** ke peramban. API mengirim **data** — biasanya JSON — ke program lain. Pemanggilnya bisa aplikasi ponsel, halaman JavaScript, atau peladen lain.

Perbedaan itu mengubah satu hal penting: **pemanggilnya tidak bisa membaca.** Manusia yang melihat pesan "ISBN sudah terdaftar" paham harus berbuat apa. Program cuma melihat angka, dan harus memutuskan dari angka itu saja.

REST adalah kebiasaan merancang API di atas HTTP supaya keputusan itu bisa diambil dengan pasti. Intinya tiga: **URL menunjuk benda, metode menyatakan tindakan, kode status menyatakan hasil.**

**Benda di URL, tindakan di metode**

| Metode | Artinya | Aman diulang (idempoten) |
|---|---|---|
| GET | membaca | ya |
| POST | membuat sumber daya baru | **tidak** |
| PUT | mengganti seluruh isi | ya |
| PATCH | mengubah sebagian | tidak dijamin |
| DELETE | menghapus | ya |

Program di topik ini menjalankan alur lengkapnya:

| Permintaan | Kode | Jawaban |
|---|---|---|
| POST /buku | 201 | id 1 |
| POST /buku | 201 | id 2 |
| GET /buku | 200 | daftar buku |
| GET /buku/1 | 200 | buku nomor 1 |
| PUT /buku/2 | 200 | id 2 |
| DELETE /buku/1 | 204 | (kosong) |
| GET /buku/1 | 404 | buku tidak ada |

Tidak ada \`/tambahBuku\` atau \`/hapusBuku?id=1\`. Kata kerjanya sudah ada di metode.

Ini bukan soal selera. Peramban, perayap mesin pencari, dan fitur pramuat menganggap GET **aman** — tidak mengubah apa pun — sehingga bebas mengikuti tautan GET kapan saja. Tautan \`GET /hapusBuku?id=1\` bisa dijalankan oleh perayap yang tidak pernah berniat menghapus apa-apa.

**Kegagalan yang berbeda, kode yang berbeda**

| Permintaan | Kode | Artinya |
|---|---|---|
| POST badan rusak | 400 | badannya tidak bisa dibaca sama sekali |
| POST isbn "123", judul kosong | 422 | bisa dibaca, isinya melanggar aturan |
| POST ISBN yang sudah ada | 409 | sah, tetapi bertabrakan dengan data |
| GET /buku/99 | 404 | yang dicari tidak ada |
| PATCH /buku/2 | 405 | jalurnya ada, metodenya tidak didukung |
| GET /penulis | 404 | sumber daya tidak dikenal |

Bedanya menentukan apa yang dilakukan **pemanggil**:

- Pada **422**, ia menampilkan kolom mana yang salah, pengguna memperbaikinya, lalu mengirim ulang.
- Pada **409**, mengirim ulang **tidak akan pernah** berhasil — ia harus menawarkan pilihan lain.
- Pada **5xx**, kesalahannya di peladen, dan mencoba lagi nanti masuk akal.

Dua kode yang tidak muncul di program ini tetapi akan kamu butuhkan di topik autentikasi: **401** berarti peladen belum tahu siapa pemanggilnya (belum masuk, atau tokennya tidak sah), sedangkan **403** berarti peladen tahu siapa pemanggilnya dan ia tidak berhak.

**Aman diulang: PUT ya, POST tidak**

Permintaan yang sama dikirim tiga kali — seperti yang terjadi saat aplikasi ponsel mencoba ulang karena jaringan tersendat:

| Permintaan, tiga kali | Hasil |
|---|---|
| POST buku baru | 201, lalu 409, lalu 409 |
| PUT stok = 5 | 200, 200, 200 — stok tetap **5** |

PUT mengirim **keadaan akhir**. Diulang berapa kali pun, hasilnya sama. Itu yang disebut idempoten, dan itu yang membuat PUT aman dicoba ulang.

POST membuat sumber daya **baru**. Di sini yang menyelamatkan adalah kolom ISBN yang \`UNIQUE\`: POST kedua dan ketiga ditolak basis data. Tanpa kolom unik itu, tiga POST menghasilkan tiga buku kembar.

**Tindakan relatif tidak aman diulang**

Mulai dari stok 5, perintah "tambah 1" terkirim tiga kali. Hasilnya **8**, bukan 6.

Karena itu perintah relatif — tambah, kurangi — tidak boleh dipasang di PUT. Ia menjadi POST ke sumber daya yang mencatat kejadiannya, misalnya \`POST /buku/2/penerimaan\`, dan diberi **kunci idempotensi**: nilai unik dari pemanggil yang disimpan peladen, sehingga permintaan kedua dengan kunci yang sama dikenali sebagai ulangan. Ini pola yang sama dengan topik pembayaran di E-Commerce.

**Paginasi**

Setelah 95 buku contoh ditambahkan, total ada 97 buku:

| | |
|---|---|
| permintaan | GET /buku?halaman=3&per_halaman=20 |
| baris dikirim | id 42 sampai 61 (20 baris) |
| meta | total 97, jumlah_halaman 5 |

Tanpa paginasi, satu GET mengirim seluruh isi tabel. Dengan 97 baris itu tidak terasa; dengan seratus ribu baris, satu permintaan bisa menghabiskan memori peladen dan membuat aplikasi ponsel pemanggilnya macet.

Meta \`total\` dan \`jumlah_halaman\` membuat pemanggil tahu kapan berhenti tanpa harus meminta halaman kosong lebih dulu. Topik berikutnya menunjukkan kenapa paginasi dengan \`OFFSET\` makin lambat di halaman yang jauh, dan apa penggantinya.

**Satu catatan tentang program ini**

Program memanggil fungsi \`tangani()\` langsung, tanpa peladen HTTP, supaya seluruh alurnya bisa dijalankan dan dibuktikan dalam satu kali eksekusi. Di aplikasi sungguhan, \`index.php\` membaca metode, jalur, dan badan dari permintaan, memanggil fungsi yang sama, lalu mengirim status dan JSON-nya — langkahnya ada di bagian praktik.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`$data = json_decode($badan, true);
if (!is_array($data)) {
    return jawab(400, ['galat' => 'badan bukan JSON yang sah']);
}
$galat = validasi($data);
if ($galat) {
    return jawab(422, ['galat' => $galat]);
}
try {
    $q->execute([$data['isbn'], $data['judul'], $data['stok'] ?? 0]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {         // pelanggaran batasan
        return jawab(409, ['galat' => 'ISBN sudah terdaftar']);
    }
    throw $e;                                // galat lain -> 500
}
return jawab(201, ['id' => (int)$db->lastInsertId()]);`,
      penjelasan: `Empat kemungkinan hasil, dan urutan pemeriksaannya mengikuti urutan pertanyaan yang akan diajukan pemanggil saat permintaannya ditolak.

**Pertanyaan pertama: bisakah badannya dibaca?**

\`json_decode\` mengembalikan \`null\` kalau teksnya bukan JSON yang sah. Pemeriksaan \`is_array\` menangkap itu, sekaligus menangkap JSON sah yang bukan objek — misalnya angka \`5\` atau teks \`"halo"\`.

Kalau badannya tidak bisa dibaca, memeriksa isinya tidak ada artinya. Jawabannya **400**, dan pemanggil tahu bahwa kesalahannya ada di cara ia menyusun permintaan — kemungkinan besar kekeliruan program, bukan kesalahan pengguna.

**Pertanyaan kedua: apakah isinya sah?**

Badannya terbaca, tetapi ISBN-nya cuma tiga angka dan judulnya kosong. Jawabannya **422**, dan isinya menyebut **setiap** kolom yang salah sekaligus — bukan cuma yang pertama.

Itu penting untuk pemanggil: aplikasi ponsel bisa menandai semua kolom yang salah di formulir dalam satu kali jalan, bukan memaksa pengguna memperbaiki satu, mengirim, lalu menemukan kesalahan berikutnya.

**Pertanyaan ketiga: apakah bertabrakan dengan data yang ada?**

Di sini ada godaan yang harus dilawan: memeriksa dengan \`SELECT\` apakah ISBN itu sudah ada, lalu baru \`INSERT\`.

Itu terlihat benar, dan gagal justru saat paling dibutuhkan. Dua permintaan yang tiba hampir bersamaan — misalnya ulangan otomatis dari aplikasi ponsel — keduanya menjalankan \`SELECT\`, keduanya melihat ISBN belum ada, keduanya menjalankan \`INSERT\`. Hasilnya dua buku kembar.

Yang bisa diandalkan cuma **batasan di basis data**. Kolom \`isbn\` dideklarasikan \`UNIQUE\`, jadi basis data sendiri yang menolak baris kedua, seberapa pun dekat waktunya. Kode PHP cukup menangkap penolakan itu dan menerjemahkannya menjadi **409**.

**Dan kenapa ada \`throw $e\` di akhir.**

\`23000\` adalah kode SQLSTATE untuk pelanggaran batasan, dan dipakai baik oleh SQLite maupun MySQL. PostgreSQL memakai kode yang lebih rinci di kelas yang sama — \`23505\` untuk nilai unik kembar — jadi di sana yang dicocokkan kode lengkapnya itu. Kode di luar kelas 23 berarti sesuatu yang sama sekali berbeda — diska penuh, sambungan terputus, tabel terkunci.

Kalau semua \`PDOException\` dijawab 409, pemanggil diberi tahu "ISBN sudah terdaftar" padahal masalahnya diska penuh. Ia akan menyerah dan menampilkan pesan yang salah kepada pengguna, padahal mencoba lagi nanti mungkin berhasil.

Melempar ulang galat yang tidak dikenali membuatnya menjadi **500** — dan 500 adalah jawaban yang jujur: kesalahannya ada di peladen.

**Baru setelah ketiganya lolos: 201.**

Bukan 200. 201 berarti "sesuatu yang baru telah dibuat", dan disertai id-nya supaya pemanggil tahu alamat sumber daya itu. Di \`index.php\` sungguhan, alamat itu juga dikirim lewat header \`Location\`.`
    },
    {
      bahasa: 'php',
      kode: String.raw`// PUT: mengirim KEADAAN AKHIR
$q = $db->prepare("UPDATE buku SET isbn = ?, judul = ?, stok = ?
                   WHERE id = ?");
$q->execute([$data['isbn'], $data['judul'], $data['stok'] ?? 0, $id]);

// perintah RELATIF: mengirim PERUBAHAN
$db->exec("UPDATE buku SET stok = stok + 1 WHERE id = 2");

// dikirim tiga kali karena jaringan tersendat:
//   PUT stok = 5    -> stok 5, 5, 5
//   stok + 1 dari 5 -> stok 6, 7, 8`,
      penjelasan: `Dua pernyataan UPDATE yang sekilas mirip, dengan sifat yang sama sekali berbeda saat terkirim lebih dari sekali.

**Kenapa permintaan bisa terkirim lebih dari sekali.**

Aplikasi ponsel mengirim permintaan, lalu menunggu jawaban. Jawabannya tidak datang — sinyal hilang saat pengguna masuk lift.

Dari sisi aplikasi, ada dua kemungkinan yang **tidak bisa dibedakan**: permintaannya tidak pernah sampai ke peladen, atau permintaannya sampai dan diproses, tetapi jawabannya yang hilang di jalan.

Aplikasi yang baik mencoba ulang. Dan pada kemungkinan kedua, itu berarti peladen menerima permintaan yang sama dua kali.

**PUT: keadaan akhir.**

Pernyataan pertama berbunyi "stok buku ini **adalah** 5". Dijalankan sekali, stoknya 5. Dijalankan tiga kali, stoknya tetap 5. Peladen tidak perlu tahu apakah ini permintaan pertama atau ulangan — hasilnya sama.

Itu arti idempoten: menjalankan sekali dan menjalankan berkali-kali memberi keadaan akhir yang sama. Dan karena itu, pemanggil boleh mencoba ulang PUT sebanyak yang ia mau tanpa khawatir.

Perhatikan bahwa yang harus sama adalah **keadaan di peladen**, bukan jawabannya. DELETE yang diulang juga idempoten — bukunya tetap terhapus — meskipun beberapa API menjawab 204 untuk yang pertama dan 404 untuk berikutnya.

**Perintah relatif: perubahan.**

Pernyataan kedua berbunyi "tambah stok buku ini **satu**". Maksud pengirimnya satu kali penambahan. Terkirim tiga kali, stoknya naik tiga. Program di topik ini menunjukkannya: mulai dari 5, hasilnya 8.

Peladen tidak punya cara membedakan "tiga penambahan yang disengaja" dari "satu penambahan yang terkirim tiga kali".

**Jadi di mana perintah relatif ditempatkan?**

Bukan di PUT — karena PUT menjanjikan aman diulang, dan perintah ini tidak.

Ia menjadi POST yang **mencatat kejadiannya** — misalnya \`POST /buku/2/penerimaan\` dengan isi "diterima 1 eksemplar" — ditambah kunci idempotensi dari pemanggil. Peladen menyimpan kunci itu bersama catatannya. Permintaan kedua dengan kunci yang sama dikenali sebagai ulangan dan dijawab dengan hasil yang sudah ada, tanpa menambah stok lagi.

Pola itu terasa berlebihan untuk stok buku perpustakaan. Untuk pembayaran, pemesanan tiket, atau apa pun yang melibatkan uang, pola itu wajib.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// REST API dengan PHP: sumber daya, metode, kode status
// ============================================

$db = new PDO('sqlite::memory:');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("CREATE TABLE buku (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    isbn TEXT UNIQUE NOT NULL,
    judul TEXT NOT NULL,
    stok INTEGER NOT NULL DEFAULT 0)");

// --------------------------------------------
// Satu fungsi yang menangani seluruh permintaan
// --------------------------------------------
function jawab($status, $isi = null) {
    return [$status, $isi];
}

function validasi($data) {
    $galat = [];
    if (!isset($data['isbn']) || !preg_match('/^\d{13}$/', $data['isbn'])) {
        $galat['isbn'] = 'harus 13 angka';
    }
    if (!isset($data['judul']) || trim($data['judul']) === '') {
        $galat['judul'] = 'wajib diisi';
    }
    if (isset($data['stok']) && (!is_int($data['stok']) || $data['stok'] < 0)) {
        $galat['stok'] = 'bilangan bulat >= 0';
    }
    return $galat;
}

function tangani($db, $metode, $jalur, $badan = null) {
    // /buku  atau  /buku/{id}
    if (!preg_match('#^/buku(?:/(\d+))?$#', $jalur, $m)) {
        return jawab(404, ['galat' => 'sumber daya tidak dikenal']);
    }
    $id = isset($m[1]) ? (int)$m[1] : null;

    if ($metode === 'GET' && $id === null) {
        $baris = $db->query("SELECT * FROM buku ORDER BY id")->fetchAll(PDO::FETCH_ASSOC);
        return jawab(200, ['data' => $baris, 'jumlah' => count($baris)]);
    }
    if ($metode === 'GET') {
        $q = $db->prepare("SELECT * FROM buku WHERE id = ?");
        $q->execute([$id]);
        $b = $q->fetch(PDO::FETCH_ASSOC);
        return $b ? jawab(200, $b) : jawab(404, ['galat' => 'buku tidak ada']);
    }
    if ($metode === 'POST' && $id === null) {
        $data = json_decode($badan, true);
        if (!is_array($data)) {
            return jawab(400, ['galat' => 'badan bukan JSON yang sah']);
        }
        $galat = validasi($data);
        if ($galat) {
            return jawab(422, ['galat' => $galat]);
        }
        try {
            $q = $db->prepare("INSERT INTO buku (isbn, judul, stok) VALUES (?, ?, ?)");
            $q->execute([$data['isbn'], $data['judul'], $data['stok'] ?? 0]);
        } catch (PDOException $e) {
            // 23000 = pelanggaran batasan (di sini: ISBN kembar).
            // Galat lain BUKAN konflik -- biarkan meledak jadi 500.
            if ($e->getCode() === '23000') {
                return jawab(409, ['galat' => 'ISBN sudah terdaftar']);
            }
            throw $e;
        }
        return jawab(201, ['id' => (int)$db->lastInsertId()]);
    }
    if ($metode === 'PUT' && $id !== null) {
        $data = json_decode($badan, true);
        if (!is_array($data)) {
            return jawab(400, ['galat' => 'badan bukan JSON yang sah']);
        }
        $galat = validasi($data);
        if ($galat) {
            return jawab(422, ['galat' => $galat]);
        }
        $q = $db->prepare("UPDATE buku SET isbn = ?, judul = ?, stok = ? WHERE id = ?");
        $q->execute([$data['isbn'], $data['judul'], $data['stok'] ?? 0, $id]);
        return $q->rowCount() ? jawab(200, ['id' => $id])
                              : jawab(404, ['galat' => 'buku tidak ada']);
    }
    if ($metode === 'DELETE' && $id !== null) {
        $q = $db->prepare("DELETE FROM buku WHERE id = ?");
        $q->execute([$id]);
        return jawab(204);
    }
    return jawab(405, ['galat' => 'metode tidak diizinkan untuk jalur ini']);
}

function kirim($db, $metode, $jalur, $badan = null) {
    [$status, $isi] = tangani($db, $metode, $jalur, $badan);
    $teks = $isi === null ? '(kosong)' : json_encode($isi, JSON_UNESCAPED_UNICODE);
    if (strlen($teks) > 46) {
        $teks = substr($teks, 0, 43) . '...';
    }
    printf("  %-6s %-9s %d  %s\n", $metode, $jalur, $status, $teks);
    return $status;
}

// --------------------------------------------
// 1. Alur normal
// --------------------------------------------
echo "--- alur normal: buat, baca, ubah, hapus ---\n";
echo "  metode jalur     kode isi jawaban\n";
kirim($db, 'POST', '/buku', '{"isbn":"9786020332956","judul":"Laskar Pelangi","stok":4}');
kirim($db, 'POST', '/buku', '{"isbn":"9789792248616","judul":"Bumi Manusia","stok":2}');
kirim($db, 'GET', '/buku');
kirim($db, 'GET', '/buku/1');
kirim($db, 'PUT', '/buku/2', '{"isbn":"9789792248616","judul":"Bumi Manusia","stok":7}');
kirim($db, 'DELETE', '/buku/1');
kirim($db, 'GET', '/buku/1');
echo "\n";
echo "  URL menunjuk BENDA (buku, buku nomor 2). Metode HTTP\n";
echo "  menyatakan TINDAKAN. Tidak ada /tambahBuku atau\n";
echo "  /hapusBuku?id=1 -- kata kerjanya sudah ada di metode.\n";

// --------------------------------------------
// 2. Kode status: tiap kegagalan punya arti berbeda
// --------------------------------------------
echo "\n--- kegagalan yang berbeda, kode yang berbeda ---\n";
echo "  metode jalur     kode isi jawaban\n";
kirim($db, 'POST', '/buku', '{isbn: rusak');
kirim($db, 'POST', '/buku', '{"isbn":"123","judul":""}');
kirim($db, 'POST', '/buku', '{"isbn":"9789792248616","judul":"Salinan"}');
kirim($db, 'GET', '/buku/99');
kirim($db, 'PATCH', '/buku/2', '{}');
kirim($db, 'GET', '/penulis');
echo "\n";
echo "  400  badannya tidak bisa dibaca sama sekali\n";
echo "  422  bisa dibaca, tetapi isinya melanggar aturan\n";
echo "  409  sah, tetapi bertabrakan dengan data yang ada\n";
echo "  404  yang dicari tidak ada\n";
echo "  405  jalurnya ada, metodenya tidak didukung\n";
echo "\n";
echo "  Bedanya menentukan apa yang harus dilakukan PEMANGGIL.\n";
echo "  Pada 422 ia memperbaiki isian dan mengirim ulang. Pada\n";
echo "  409 mengirim ulang TIDAK akan pernah berhasil. Kalau\n";
echo "  semuanya dijawab 400 atau 500, pemanggil cuma bisa\n";
echo "  menebak.\n";

// --------------------------------------------
// 3. Idempoten: PUT dan DELETE boleh diulang, POST tidak
// --------------------------------------------
echo "\n--- mengirim permintaan yang SAMA tiga kali ---\n";
$sebelum = (int)$db->query("SELECT COUNT(*) FROM buku")->fetchColumn();
echo "  jumlah buku awal: $sebelum\n\n";
$badan = '{"isbn":"9786024246945","judul":"Filosofi Teras","stok":3}';
echo "  POST /buku, tiga kali:\n";
for ($i = 0; $i < 3; $i++) {
    echo "  "; kirim($db, 'POST', '/buku', $badan);
}
$badan2 = '{"isbn":"9789792248616","judul":"Bumi Manusia","stok":5}';
echo "\n  PUT /buku/2, tiga kali:\n";
for ($i = 0; $i < 3; $i++) {
    echo "  "; kirim($db, 'PUT', '/buku/2', $badan2);
}
$stok = (int)$db->query("SELECT stok FROM buku WHERE id = 2")->fetchColumn();
echo "\n  stok buku 2 setelah tiga PUT : $stok\n";
$sesudah = (int)$db->query("SELECT COUNT(*) FROM buku")->fetchColumn();
echo "  jumlah buku akhir             : $sesudah\n";
echo "\n";
echo "  PUT mengirim KEADAAN AKHIR ('stok = 5'). Diulang berapa\n";
echo "  kali pun, hasilnya sama. Itu idempoten, dan itu yang\n";
echo "  membuat PUT aman dicoba ulang saat jaringan putus.\n";
echo "\n";
echo "  POST membuat sumber daya BARU. Di sini ISBN yang unik\n";
echo "  menyelamatkan: POST kedua dan ketiga ditolak 409. Tanpa\n";
echo "  kolom unik itu, tiga POST menghasilkan tiga buku kembar.\n";
echo "\n";
echo "  Kalau sebuah tindakan harus lewat POST dan boleh dicoba\n";
echo "  ulang, ia butuh kunci idempotensi -- persis seperti pada\n";
echo "  pembayaran.\n";

// --------------------------------------------
// 4. Kenapa jangan 'stok = stok + 1' lewat PUT
// --------------------------------------------
echo "\n--- tindakan relatif tidak idempoten ---\n";
$db->exec("UPDATE buku SET stok = 5 WHERE id = 2");
for ($i = 0; $i < 3; $i++) {
    $db->exec("UPDATE buku SET stok = stok + 1 WHERE id = 2");
}
$stok = (int)$db->query("SELECT stok FROM buku WHERE id = 2")->fetchColumn();
echo "  mulai dari 5, kirim 'tambah 1' tiga kali -> stok $stok\n";
echo "\n";
echo "  Maksudnya menambah satu, dan karena jaringan tersendat\n";
echo "  permintaannya terkirim tiga kali. Hasilnya bukan 6.\n";
echo "\n";
echo "  Karena itu tindakan relatif ('tambah', 'kurangi') tidak\n";
echo "  boleh dipasang di PUT. Ia masuk POST ke sumber daya yang\n";
echo "  mencatat kejadiannya -- misalnya POST /buku/2/penerimaan\n";
echo "  -- dan diberi kunci idempotensi.\n";

// --------------------------------------------
// 5. Paginasi: jangan kirim semuanya
// --------------------------------------------
echo "\n--- paginasi ---\n";
$q = $db->prepare("INSERT INTO buku (isbn, judul, stok) VALUES (?, ?, ?)");
for ($i = 1; $i <= 95; $i++) {
    $q->execute([sprintf("978000%07d", $i), "Buku contoh $i", $i % 9]);
}
$total = (int)$db->query("SELECT COUNT(*) FROM buku")->fetchColumn();
$per = 20;
$halaman = 3;
$q = $db->prepare("SELECT id FROM buku ORDER BY id LIMIT ? OFFSET ?");
$q->execute([$per, ($halaman - 1) * $per]);
$ids = $q->fetchAll(PDO::FETCH_COLUMN);
$meta = ['halaman' => $halaman, 'per_halaman' => $per,
         'total' => $total, 'jumlah_halaman' => (int)ceil($total / $per)];
echo "  GET /buku?halaman=3&per_halaman=20\n";
echo "  meta : " . json_encode($meta) . "\n";
echo "  id   : " . $ids[0] . " sampai " . end($ids) . " (" . count($ids) . " baris)\n";
echo "\n";
echo "  Tanpa paginasi, GET /buku mengirim seluruh " . $total . " baris --\n";
echo "  dan saat datanya jadi seratus ribu, satu permintaan bisa\n";
echo "  menjatuhkan peladen dan aplikasi ponsel pemanggilnya.\n";
echo "\n";
echo "  Meta 'total' dan 'jumlah_halaman' membuat pemanggil tahu\n";
echo "  kapan berhenti, tanpa harus meminta halaman kosong dulu.\n";` },
  output: `--- alur normal: buat, baca, ubah, hapus ---
  metode jalur     kode isi jawaban
  POST   /buku     201  {"id":1}
  POST   /buku     201  {"id":2}
  GET    /buku     200  {"data":[{"id":1,"isbn":"9786020332956","ju...
  GET    /buku/1   200  {"id":1,"isbn":"9786020332956","judul":"Las...
  PUT    /buku/2   200  {"id":2}
  DELETE /buku/1   204  (kosong)
  GET    /buku/1   404  {"galat":"buku tidak ada"}

  URL menunjuk BENDA (buku, buku nomor 2). Metode HTTP
  menyatakan TINDAKAN. Tidak ada /tambahBuku atau
  /hapusBuku?id=1 -- kata kerjanya sudah ada di metode.

--- kegagalan yang berbeda, kode yang berbeda ---
  metode jalur     kode isi jawaban
  POST   /buku     400  {"galat":"badan bukan JSON yang sah"}
  POST   /buku     422  {"galat":{"isbn":"harus 13 angka","judul":"...
  POST   /buku     409  {"galat":"ISBN sudah terdaftar"}
  GET    /buku/99  404  {"galat":"buku tidak ada"}
  PATCH  /buku/2   405  {"galat":"metode tidak diizinkan untuk jalu...
  GET    /penulis  404  {"galat":"sumber daya tidak dikenal"}

  400  badannya tidak bisa dibaca sama sekali
  422  bisa dibaca, tetapi isinya melanggar aturan
  409  sah, tetapi bertabrakan dengan data yang ada
  404  yang dicari tidak ada
  405  jalurnya ada, metodenya tidak didukung

  Bedanya menentukan apa yang harus dilakukan PEMANGGIL.
  Pada 422 ia memperbaiki isian dan mengirim ulang. Pada
  409 mengirim ulang TIDAK akan pernah berhasil. Kalau
  semuanya dijawab 400 atau 500, pemanggil cuma bisa
  menebak.

--- mengirim permintaan yang SAMA tiga kali ---
  jumlah buku awal: 1

  POST /buku, tiga kali:
    POST   /buku     201  {"id":3}
    POST   /buku     409  {"galat":"ISBN sudah terdaftar"}
    POST   /buku     409  {"galat":"ISBN sudah terdaftar"}

  PUT /buku/2, tiga kali:
    PUT    /buku/2   200  {"id":2}
    PUT    /buku/2   200  {"id":2}
    PUT    /buku/2   200  {"id":2}

  stok buku 2 setelah tiga PUT : 5
  jumlah buku akhir             : 2

  PUT mengirim KEADAAN AKHIR ('stok = 5'). Diulang berapa
  kali pun, hasilnya sama. Itu idempoten, dan itu yang
  membuat PUT aman dicoba ulang saat jaringan putus.

  POST membuat sumber daya BARU. Di sini ISBN yang unik
  menyelamatkan: POST kedua dan ketiga ditolak 409. Tanpa
  kolom unik itu, tiga POST menghasilkan tiga buku kembar.

  Kalau sebuah tindakan harus lewat POST dan boleh dicoba
  ulang, ia butuh kunci idempotensi -- persis seperti pada
  pembayaran.

--- tindakan relatif tidak idempoten ---
  mulai dari 5, kirim 'tambah 1' tiga kali -> stok 8

  Maksudnya menambah satu, dan karena jaringan tersendat
  permintaannya terkirim tiga kali. Hasilnya bukan 6.

  Karena itu tindakan relatif ('tambah', 'kurangi') tidak
  boleh dipasang di PUT. Ia masuk POST ke sumber daya yang
  mencatat kejadiannya -- misalnya POST /buku/2/penerimaan
  -- dan diberi kunci idempotensi.

--- paginasi ---
  GET /buku?halaman=3&per_halaman=20
  meta : {"halaman":3,"per_halaman":20,"total":97,"jumlah_halaman":5}
  id   : 42 sampai 61 (20 baris)

  Tanpa paginasi, GET /buku mengirim seluruh 97 baris --
  dan saat datanya jadi seratus ribu, satu permintaan bisa
  menjatuhkan peladen dan aplikasi ponsel pemanggilnya.

  Meta 'total' dan 'jumlah_halaman' membuat pemanggil tahu
  kapan berhenti, tanpa harus meminta halaman kosong dulu.`,

  kompleksitas: {
    tabel: [
      { operasi: 'GET /buku/{id}', waktu: 'O(log n)', memori: 'O(1), lewat indeks kunci primer' },
      { operasi: 'GET /buku tanpa paginasi', waktu: 'O(n)', memori: 'O(n) — seluruh tabel masuk jawaban' },
      { operasi: 'GET /buku dengan LIMIT p OFFSET k', waktu: 'O(k + p)', memori: 'O(p) — baris yang dilewati tetap dibaca' },
      { operasi: 'POST dengan kolom UNIQUE', waktu: 'O(log n)', memori: 'pemeriksaan unik lewat indeks' },
      { operasi: 'PUT atau DELETE /buku/{id}', waktu: 'O(log n)', memori: 'O(1)' }
    ],
    intuisi: `Hampir semua operasi pada satu sumber daya murah, karena ditemukan lewat indeks kunci primer atau indeks kolom unik. Yang mahal adalah operasi pada **koleksi**.

GET koleksi tanpa paginasi tumbuh lurus dengan isi tabel — baik waktunya, memorinya, maupun ukuran jawaban yang harus dikirim lewat jaringan dan diurai oleh pemanggil. Di ponsel dengan sinyal lemah, ukuran jawaban itu yang paling terasa.

Paginasi dengan \`OFFSET\` membatasi ukuran jawaban, tetapi tidak membatasi kerja basis data: untuk sampai ke halaman ke-900, basis data tetap membaca dan membuang semua baris sebelumnya. Topik berikutnya mengukurnya.

Kolom \`UNIQUE\` tidak gratis — setiap INSERT juga memperbarui indeksnya — tetapi biayanya logaritmik, dan ia satu-satunya penjaga yang bekerja benar saat dua permintaan tiba bersamaan.`
  },

  kesalahanUmum: [
    {
      salah: 'Menaruh kata kerja di URL, misalnya /hapusBuku?id=1 yang dipanggil dengan GET.',
      kenapa: 'GET dianggap aman oleh peramban, perayap mesin pencari, dan fitur pramuat, sehingga tautan seperti itu bisa dijalankan tanpa ada yang berniat menghapus. Kata kerja di URL juga menggandakan apa yang sudah dinyatakan metode.',
      benar: 'Pakai kata benda di URL dan metode untuk tindakan, misalnya DELETE /buku/1, dan jangan pernah mengubah data lewat GET.'
    },
    {
      salah: 'Menjawab semua permintaan dengan 200 dan menaruh keberhasilan di badan, misalnya {"sukses": false}.',
      kenapa: 'Pemanggil, pustaka HTTP, cache, dan alat pemantau membaca kode status lebih dulu dan menganggap 200 sebagai berhasil. Kegagalan menjadi tidak terlihat oleh semua kecuali kode yang sengaja membaca badannya.',
      benar: 'Kirim kode status yang sesuai dengan hasilnya, dan pakai badan untuk rincian seperti kolom mana yang salah.'
    },
    {
      salah: 'Menjawab semua kegagalan dengan 400 atau 500.',
      kenapa: 'Pemanggil tidak bisa membedakan isian yang perlu diperbaiki, data yang bertabrakan, dan peladen yang sedang bermasalah, padahal tindakan yang benar untuk ketiganya berbeda: memperbaiki, menyerah, atau mencoba lagi nanti.',
      benar: 'Bedakan 400 untuk badan yang tidak terbaca, 422 untuk isian yang tidak sah, 409 untuk tabrakan, 404 untuk yang tidak ada, dan 405 untuk metode yang tidak didukung.'
    },
    {
      salah: 'Mencegah data kembar dengan SELECT lebih dulu lalu INSERT, tanpa kolom UNIQUE.',
      kenapa: 'Dua permintaan yang tiba hampir bersamaan sama-sama melihat data belum ada, lalu sama-sama menyisipkan. Ulangan otomatis dari aplikasi ponsel membuat keadaan itu jauh lebih sering dari yang dibayangkan.',
      benar: 'Deklarasikan kolom unik di tabel, lalu tangkap pelanggaran batasannya dan terjemahkan menjadi 409.'
    },
    {
      salah: 'Menangkap semua PDOException dan menjawabnya sebagai 409.',
      kenapa: 'Galat seperti diska penuh atau sambungan terputus ikut dilaporkan sebagai data kembar, sehingga pemanggil menyerah dan menampilkan pesan yang salah, padahal mencoba lagi nanti mungkin berhasil.',
      benar: 'Periksa kode SQLSTATE 23000 untuk pelanggaran batasan, dan lempar ulang galat lainnya supaya menjadi 500.'
    },
    {
      salah: 'Mengirim pesan galat PDO mentah ke pemanggil.',
      kenapa: 'Pesan mentah memuat nama tabel, nama kolom, dan kadang potongan kueri, yang membantu penyerang memetakan basis data. Pesannya juga tidak berguna bagi pengguna aplikasi.',
      benar: 'Catat galat lengkapnya di log peladen, dan kirim ke pemanggil cuma kode status serta pesan umum.'
    },
    {
      salah: 'Memasang perintah relatif seperti tambah stok satu di PUT.',
      kenapa: 'PUT menjanjikan aman diulang, dan pemanggil akan mengulangnya saat jaringan tersendat. Perintah relatif yang diulang tiga kali menambah tiga, bukan satu.',
      benar: 'Pakai PUT untuk keadaan akhir, dan jadikan perintah relatif sebagai POST yang mencatat kejadiannya dengan kunci idempotensi.'
    },
    {
      salah: 'Membuat GET koleksi tanpa paginasi karena datanya masih sedikit.',
      kenapa: 'Saat datanya tumbuh, satu permintaan menghabiskan memori peladen dan membuat pemanggil macet, dan menambahkan paginasi belakangan mengubah bentuk jawaban sehingga merusak pemanggil yang sudah ada.',
      benar: 'Pasang paginasi sejak awal dengan batas atas per halaman dan meta total.'
    }
  ],

  analogi: `Bayangkan **bagian arsip sebuah kantor** yang cuma melayani lewat formulir tertulis. Petugasnya tidak bisa diajak bicara, dan kamu tidak bisa melihat ke dalam.

**Benda dan tindakan.** Setiap map punya nomor laci — itu URL. Formulirnya cuma empat jenis: LIHAT, TAMBAH, GANTI ISI, BUANG — itu metode. Tidak ada formulir "lihat-dan-buang-map-nomor-1"; kamu memilih jenis formulir, lalu menulis nomor lacinya.

**Cap balasan.** Formulir yang kamu kirim kembali dengan satu cap:

- *"tulisan tidak terbaca"* — kamu mengisi formulirnya dengan cara yang salah
- *"isian salah: kolom ISBN harus 13 angka, kolom judul kosong"* — perbaiki dan kirim lagi
- *"map dengan ISBN ini sudah ada"* — mengirim ulang tidak akan pernah berhasil
- *"laci itu tidak ada"*
- *"laci itu tidak menerima formulir jenis ini"*

Kalau semua penolakan cuma dicap *"DITOLAK"*, kamu tidak tahu apakah harus memperbaiki isian, mencari laci lain, atau menyerah.

**Pos yang lambat.** Kamu mengirim formulir GANTI ISI: *"stok di map nomor 2 menjadi 5"*. Balasannya tidak datang. Kamu tidak tahu apakah formulirnya hilang atau balasannya yang hilang, jadi kamu mengirim lagi. Dan lagi.

Petugas menerima tiga formulir yang sama, dan menjalankan ketiganya. Stoknya 5. Tidak ada masalah.

Sekarang formulirnya berbunyi *"tambahkan satu ke stok map nomor 2"*. Tiga formulir sampai, tiga kali ditambah. Stoknya 8 — padahal kamu cuma menerima satu buku.

Karena itu arsip yang cermat meminta setiap formulir penambahan diberi **nomor tanda terima** buatanmu sendiri. Formulir kedua dengan nomor yang sama dikenali sebagai ulangan dan tidak dijalankan lagi.

**Seluruh isi lemari.** Kamu meminta "LIHAT semua map". Petugas yang ceroboh memfotokopi seluruh lemari. Petugas yang cermat mengirim dua puluh lembar pertama, dengan catatan di atasnya: *"halaman 1 dari 5, total 97 map"* — kamu tahu berapa kali lagi harus meminta.`,

  latihan: [
    'Ubah daftar jalur \`/tambahBuku\`, \`/hapusBuku?id=1\`, \`/ubahStok\`, dan \`/semuaBuku\` menjadi jalur REST dengan metode yang tepat.',
    'Tentukan kode status yang tepat untuk lima keadaan: badan bukan JSON, ISBN 12 angka, ISBN sudah ada, buku nomor 500 tidak ada, dan PATCH ke jalur yang cuma menerima PUT.',
    'Jelaskan kenapa 409 dan 422 harus dibedakan, dari sudut pandang aplikasi ponsel yang menerima jawabannya.',
    'Buat \`index.php\` yang membaca metode, jalur, dan badan dari permintaan HTTP, memanggil fungsi penangan dari topik ini, lalu mengirim status dan JSON-nya.',
    'Uji API-mu dengan curl memakai opsi \`-i\`, lalu tunjukkan baris status untuk 201, 404, dan 422.',
    'Tambahkan header \`Location\` pada jawaban 201 dan header \`Allow\` pada jawaban 405.',
    'Hapus batasan \`UNIQUE\` dari kolom ISBN, kirim POST yang sama tiga kali, lalu hitung jumlah bukunya.',
    'Jelaskan kenapa pemeriksaan data kembar dengan SELECT lalu INSERT tidak cukup, dengan menggambarkan urutan kejadian dua permintaan yang tiba bersamaan.',
    'Rancang jalur dan badan permintaan untuk mencatat penerimaan buku dengan kunci idempotensi, lalu jelaskan apa yang disimpan peladen.',
    'Tambahkan paginasi ke GET koleksi dengan batas atas 100 per halaman, dan tentukan apa yang terjadi kalau pemanggil meminta per_halaman=5000.'
  ]
});


TOPICS.push({
  id: 'pemweb2-kueri',
  judul: 'Kueri di Aplikasi Web: N+1, Paginasi & Transaksi',
  kategori: 'pemweb2',
  tag: ['N+1', 'JOIN', 'WHERE IN', 'paginasi', 'OFFSET', 'keyset', 'transaksi', 'PDO'],
  ringkas: 'Tiga kebiasaan kueri yang tidak terasa saat datanya sedikit, dan membuat aplikasi lambat atau salah saat datanya banyak.',

  fungsi: `**Menulis kueri dari kode PHP yang tetap cepat dan tetap benar saat datanya ribuan kali lebih banyak dari data uji.**

Terpakai di:

- **Halaman daftar** — artikel, produk, pesanan — yang menampilkan data dari beberapa tabel sekaligus
- **API dengan paginasi** dan gulir tanpa akhir di aplikasi ponsel
- **Operasi yang mengubah beberapa baris** yang harus berhasil bersama atau gagal bersama: pemindahan saldo, pemesanan dengan pengurangan stok, pendaftaran dengan beberapa tabel
- **Memakai kerangka kerja dengan ORM** — ketiga masalah di topik ini muncul paling sering justru di sana, karena kuerinya tidak terlihat

Yang paling sering diabaikan: **jumlah kueri, bukan kecepatan satu kueri.** Lima puluh kueri yang masing-masing cepat bisa jauh lebih lambat dari satu kueri yang sedikit lebih rumit, karena setiap kueri harus menempuh perjalanan ke peladen basis data.

Dan yang paling berbahaya: **beberapa perubahan tanpa transaksi.** Kalau langkah kedua gagal setelah langkah pertama tersimpan, data berada di keadaan yang tidak pernah dimaksudkan siapa pun — dan kesalahannya tidak terlihat sampai ada yang menghitung ulang.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung jumlah kueri yang dijalankan sebuah halaman, mengganti pola N+1 dengan JOIN atau WHERE IN, memakai paginasi keyset untuk data yang besar dan terus bertambah, dan membungkus perubahan beberapa baris dalam transaksi.',
    alat: ['PHP 8 dengan PDO', 'SQLite atau MySQL/MariaDB dengan tabel InnoDB', 'Data uji yang cukup besar — minimal puluhan ribu baris'],
    langkah: [
      { judul: 'Hitung kuerinya lebih dulu',
        isi: `Turunkan kelas \`PDO\` dan tambahkan penghitung di \`prepare()\` dan \`query()\`, seperti di program topik ini. Nol-kan penghitungnya sebelum satu halaman dibuat, lalu cetak jumlahnya sesudahnya.

Kalau memakai kerangka kerja, pakai fitur pencatatan kuerinya. Yang dicari: jumlah kueri yang naik mengikuti jumlah baris yang ditampilkan.` },
      { judul: 'Isi data uji yang realistis',
        isi: `Masalah di topik ini tidak terlihat dengan sepuluh baris. Isi tabel dengan puluhan ribu baris lewat perulangan di dalam satu transaksi — tanpa transaksi, SQLite menyimpan ke diska setiap baris dan pengisiannya jauh lebih lama.

Program topik ini mengisi 20.000 artikel dan 40 penulis.` },
      { judul: 'Ganti N+1 dengan JOIN',
        isi: `Kalau data induknya ada di basis data yang sama, satu \`JOIN\` mengambil semuanya sekaligus.

Pastikan kolom yang dipakai untuk menyambung punya indeks — biasanya kunci primer di satu sisi dan kunci asing di sisi lain.` },
      { judul: 'Atau ganti dengan WHERE IN',
        isi: `Ambil daftar utamanya, kumpulkan id induk yang unik, lalu ambil semua induk dengan satu \`WHERE id IN (...)\`.

Buat tanda \`?\` sebanyak jumlah id, dan jangan jalankan kuerinya kalau daftarnya kosong — \`IN ()\` adalah galat sintaks.` },
      { judul: 'Ukur OFFSET di halaman yang jauh',
        isi: `Ukur waktu kueri \`LIMIT 20 OFFSET k\` untuk halaman 1, 10, 100, dan 900, masing-masing diulang ratusan kali lalu dirata-rata.

Angkanya berbeda di setiap mesin, tetapi polanya sama: naik mengikuti nomor halaman.` },
      { judul: 'Ganti dengan keyset untuk daftar yang besar',
        isi: `Simpan nilai kolom urut dari baris terakhir halaman sebelumnya, lalu minta \`WHERE id > ? ORDER BY id LIMIT 20\`.

Kalau urutannya bukan kolom unik — misalnya tanggal — tambahkan id sebagai pemecah seri: \`WHERE dibuat < ? OR (dibuat = ? AND id < ?)\` dengan \`ORDER BY dibuat DESC, id DESC\`, dan buat indeks untuk kedua kolom itu.` },
      { judul: 'Bungkus perubahan beberapa baris dalam transaksi',
        isi: `Pola dasarnya: \`beginTransaction()\`, jalankan semua perubahan di dalam \`try\`, \`commit()\` di akhir, dan \`rollBack()\` di \`catch\` sebelum melempar ulang galatnya.

Kalau memakai MySQL, pastikan tabelnya InnoDB. Tabel MyISAM menerima perintah transaksi tanpa galat, tetapi tidak bisa membatalkan apa pun.` },
      { judul: 'Pasang penjaga terakhir di tabel',
        isi: `Tambahkan batasan seperti \`CHECK (saldo >= 0)\`. Uji dengan sengaja mencoba melanggarnya dari PHP.

MySQL baru menegakkan \`CHECK\` sejak versi 8.0.16 — versi sebelumnya menerima sintaksnya lalu mengabaikannya diam-diam. MariaDB menegakkannya sejak 10.2. Pastikan versimu dengan mencobanya, bukan dengan membaca skemanya.` }
    ],
    cek: [
      'Halaman daftarmu menjalankan jumlah kueri yang tetap, tidak naik mengikuti jumlah baris yang ditampilkan',
      'Kamu bisa menunjukkan dengan angka ukuran bahwa OFFSET melambat di halaman jauh sementara keyset tidak',
      'Setiap operasi yang mengubah lebih dari satu baris terbungkus dalam transaksi dengan rollBack di jalur galat',
      'Aturan yang tidak boleh dilanggar dijaga oleh batasan tabel, bukan cuma oleh validasi PHP'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — mengumpulkan kueri yang tercecer, dan membuat dua perubahan menjadi satu',

  konsep: `Topik OOP & PDO sudah membahas cara **menulis** kueri dengan aman: prepared statement, kelas model, kunci asing. Topik ini tentang hal yang baru terasa setelah aplikasinya dipakai sungguhan: **berapa banyak** kueri yang dijalankan, **seberapa jauh** basis data harus membaca, dan **apa yang terjadi** kalau kueri kedua dari dua kueri yang saling terkait gagal.

Ketiganya punya ciri yang sama: tidak terlihat dengan data uji sepuluh baris, dan baru muncul saat datanya besar atau saat sesuatu gagal di tengah jalan.

**N+1: jumlah kueri yang tumbuh diam-diam**

Halaman menampilkan 50 artikel beserta nama penulisnya. Tiga cara, hasil yang identik:

| Cara | Jumlah kueri |
|---|---|
| satu kueri per artikel (N+1) | **51** |
| JOIN | 1 |
| ambil artikel, lalu WHERE id IN | 2 |

Cara pertama menjalankan 1 kueri untuk daftar artikel, lalu 1 kueri **lagi** untuk setiap artikel. Itulah asal nama N+1.

Di basis data dalam memori, selisihnya kecil. Di peladen sungguhan, basis data biasanya ada di mesin lain, dan setiap kueri menempuh perjalanan jaringan pulang-pergi. Waktu tempuh itulah yang mahal:

| Jeda jaringan per kueri | N+1 (51 kueri) | JOIN (1 kueri) |
|---|---|---|
| 0,5 ms | 25,5 ms | 0,5 ms |
| 2 ms | 102,0 ms | 2,0 ms |
| 10 ms | 510,0 ms | 10,0 ms |

Angka di tabel ini **dihitung** — jumlah kueri dikali jeda — bukan diukur, karena program berjalan tanpa jaringan. Jeda sebenarnya bergantung pada jarak ke peladen basis data: di mesin yang sama hampir nol, di pusat data yang sama biasanya di bawah satu milidetik, antarkota jauh lebih besar.

Dan N+1 hampir tidak pernah ditulis dengan sengaja. Ia bersembunyi di balik pemanggilan yang tampak polos seperti \`$artikel->penulis\` di dalam perulangan tampilan — ORM menjalankan satu kueri untuk setiap artikel yang relasinya dibaca. Laravel menyediakan \`Artikel::with('penulis')\` untuk mengambil semua penulis sekaligus, dan yang dijalankannya adalah cara ketiga di tabel: satu kueri dengan \`WHERE id IN\`.

**Paginasi: OFFSET makin mahal di halaman jauh**

Tabel berisi 20.000 artikel, 20 per halaman. Dua cara mengambil halaman yang sama:

- **OFFSET**: \`SELECT id FROM artikel ORDER BY id LIMIT 20 OFFSET k\`
- **Keyset**: \`SELECT id FROM artikel WHERE id > ? ORDER BY id LIMIT 20\`, dengan \`?\` berisi id terakhir halaman sebelumnya

Keduanya memberi baris yang **sama persis** di setiap halaman — program memeriksanya. Waktunya:

| Halaman | Harus dilewati | OFFSET (µs) | Keyset (µs) |
|---|---|---|---|
| 1 | 0 | 7,2 | 7,7 |
| 10 | 180 | 9,0 | 7,8 |
| 100 | 1.980 | 27,0 | 7,9 |
| 900 | 17.980 | **185,7** | 8,1 |

Kolom waktu **diukur** di satu mesin, rata-rata 300 kali; di mesinmu angkanya akan berbeda, tetapi polanya sama. Di halaman 900, OFFSET sekitar **23 kali** lebih lambat, sementara di halaman 1 keduanya setara.

Penyebabnya ada di arti OFFSET itu sendiri. \`OFFSET 17980\` berarti basis data membaca 17.980 baris, membuangnya, lalu mengambil 20 yang diminta. Makin jauh halamannya, makin banyak yang dibaca untuk dibuang.

Keyset tidak menghitung posisi. \`WHERE id > 17980\` memakai indeks kunci primer untuk langsung melompat ke tempatnya, sehingga halaman 900 sama murahnya dengan halaman 1.

Harganya: keyset tidak bisa melompat ke "halaman 537" secara langsung. Ia cuma tahu "berikutnya", karena harus tahu id terakhir halaman sebelumnya. Cocok untuk gulir tanpa akhir dan API; OFFSET tetap wajar untuk tabel kecil yang nomor halamannya dipilih manusia.

**OFFSET dan data yang bertambah saat dibaca**

Ada masalah kedua yang lebih mengganggu dari kecepatan. Daftar kabar diurutkan dari yang terbaru, 5 per halaman:

| | Baris yang tampil |
|---|---|
| halaman 1 dibaca | 10, 9, 8, 7, 6 |
| (dua kabar baru masuk: 11 dan 12) | |
| halaman 2 dengan OFFSET | **7, 6**, 5, 4, 3 |
| halaman 2 dengan keyset | 5, 4, 3, 2, 1 |

Dua kabar baru mendorong seluruh daftar turun dua posisi. \`OFFSET 5\` sekarang menunjuk dua baris yang sudah dilihat di halaman 1, sehingga kabar 7 dan 6 tampil **dua kali**.

Keyset tidak terpengaruh: ia meminta "yang lebih lama dari kabar 6", dan jawabannya tidak berubah meskipun ada kabar baru di depan. Untuk linimasa atau daftar yang terus bertambah, ini alasan yang lebih kuat untuk memakai keyset daripada soal kecepatan.

**Transaksi: semua atau tidak sama sekali**

Dompet 1 berisi 100.000 dan dompet 2 berisi 50.000 — total 150.000. Diminta memindahkan 150.000 dari dompet 1, yang saldonya tidak cukup. Pemindahan terdiri dari dua langkah: tambah ke dompet 2, lalu kurangi dari dompet 1. Langkah kedua ditolak oleh batasan \`CHECK (saldo >= 0)\`.

| | Total uang setelahnya |
|---|---|
| tanpa transaksi | **300.000** |
| dengan transaksi | 150.000 |

Tanpa transaksi, langkah pertama sudah tersimpan saat langkah kedua gagal. Dompet 2 bertambah 150.000, dompet 1 tidak berkurang — uang **muncul dari udara**.

Dengan transaksi, kegagalan langkah kedua membatalkan langkah pertama juga. Keadaannya kembali persis seperti sebelum dimulai.

Mengubah urutan langkahnya tidak menyelesaikan masalah. Kalau pengurangan dijalankan lebih dulu lalu peladen mati sebelum penambahan, uangnya **hilang**. Satu-satunya cara membuat dua perubahan menjadi satu adalah transaksi.

Perhatikan juga penjaganya: \`CHECK (saldo >= 0)\` di tabel. Validasi di PHP bisa terlewat — lupa dipanggil di satu jalur kode, atau dua permintaan yang memeriksa saldo bersamaan. Batasan di tabel tidak bisa dilewati kode mana pun.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`// N+1: satu kueri untuk SETIAP artikel
foreach ($artikel as &$a) {
    $q = $db->prepare("SELECT nama FROM penulis WHERE id = ?");
    $q->execute([$a['penulis_id']]);
    $a['penulis'] = $q->fetchColumn();
}
unset($a);

// WHERE IN: satu kueri untuk SEMUA penulis
$ids = array_values(array_unique(array_column($artikel, 'penulis_id')));
$tanda = implode(',', array_fill(0, count($ids), '?'));   // "?,?,?,..."
$q = $db->prepare("SELECT id, nama FROM penulis WHERE id IN ($tanda)");
$q->execute($ids);
$peta = $q->fetchAll(PDO::FETCH_KEY_PAIR);                // id => nama
foreach ($artikel as &$a) {
    $a['penulis'] = $peta[$a['penulis_id']];
}
unset($a);`,
      penjelasan: `Dua potongan kode dengan hasil yang identik. Yang pertama menjalankan 50 kueri di dalam perulangan; yang kedua menjalankan satu kueri **sebelum** perulangan, lalu perulangannya cuma mencari di larik PHP.

**Gagasan intinya: pindahkan kueri keluar dari perulangan.**

Setiap kali ada kueri di dalam \`foreach\`, jumlah kuerinya ikut jumlah baris. Itu tidak selalu salah — tetapi hampir selalu bisa diganti dengan mengumpulkan semua yang dibutuhkan lebih dulu, mengambilnya sekaligus, lalu memasangkannya di PHP.

**Baris demi baris cara kedua.**

\`array_column\` mengambil kolom \`penulis_id\` dari setiap artikel. \`array_unique\` membuang yang kembar — 50 artikel dari 40 penulis pasti punya penulis yang berulang, dan tidak perlu diminta dua kali. \`array_values\` merapikan indeksnya kembali mulai dari 0, karena \`execute()\` dengan tanda \`?\` membutuhkan larik berindeks urut.

\`array_fill\` dan \`implode\` membuat deretan \`?,?,?\` sebanyak jumlah id. Kenapa tidak langsung menyatukan id-nya ke dalam teks kueri? Id itu memang berasal dari basis data, bukan dari pengguna — tetapi kebiasaan selalu memakai tanda \`?\` untuk nilai berarti kamu tidak perlu memutuskan ulang setiap kali apakah sebuah nilai "cukup aman" untuk disatukan.

\`PDO::FETCH_KEY_PAIR\` mengubah hasil dua kolom langsung menjadi larik \`[id => nama]\`. Pencarian di larik itu seketika, jadi perulangan terakhir tidak menyentuh basis data sama sekali.

**Satu jebakan yang harus dijaga: daftar kosong.**

Kalau tidak ada artikel, \`$ids\` kosong, dan kuerinya menjadi \`WHERE id IN ()\` — galat sintaks. Di kode sungguhan, bungkus bagian ini dengan \`if ($ids)\`.

**Dan jebakan khas PHP: \`&$a\` dan \`unset($a)\`.**

\`foreach ($artikel as &$a)\` membuat \`$a\` menjadi **rujukan** ke elemen larik, sehingga mengubah \`$a\` mengubah lariknya langsung.

Setelah perulangan selesai, \`$a\` masih merujuk ke elemen **terakhir**. Kalau sesudahnya ada \`foreach ($artikel as $a)\` biasa — tanpa \`&\` — setiap putarannya menulis ke elemen terakhir itu, dan isi elemen terakhir berubah menjadi salinan elemen sebelumnya. Galat ini tidak memunculkan pesan apa pun; datanya cuma diam-diam salah.

\`unset($a)\` memutus rujukannya. Biasakan menulisnya tepat setelah setiap perulangan dengan \`&\`.

**Kapan WHERE IN lebih cocok dari JOIN?**

JOIN mengambil semuanya dalam satu kueri, dan biasanya pilihan pertama. WHERE IN lebih cocok saat:

- data induknya **banyak kolom** dan dipakai berulang — JOIN mengulang kolom penulis di setiap baris artikel
- relasinya **banyak-ke-banyak** — JOIN melipatgandakan baris dan harus dipilah lagi di PHP
- data induknya ada di **tempat lain** — tembolok, atau layanan lain — sehingga memang tidak bisa di-JOIN

Itu juga alasan ORM seperti Laravel memakai WHERE IN untuk pemuatan relasinya: satu cara yang bekerja untuk semua jenis relasi.`
    },
    {
      bahasa: 'php',
      kode: String.raw`function pindah_dengan_transaksi($db, $dari, $ke, $n) {
    $db->beginTransaction();
    try {
        $db->prepare("UPDATE dompet SET saldo = saldo + ? WHERE id = ?")
           ->execute([$n, $ke]);
        $db->prepare("UPDATE dompet SET saldo = saldo - ? WHERE id = ?")
           ->execute([$n, $dari]);
        $db->commit();
    } catch (PDOException $e) {
        $db->rollBack();
        throw $e;
    }
}
// tabel: saldo INTEGER CHECK (saldo >= 0)
// tanpa transaksi : total 150.000 -> 300.000
// dengan transaksi: total 150.000 -> 150.000`,
      penjelasan: `Dua pernyataan UPDATE yang sama persis dengan versi tanpa transaksi. Yang berbeda cuma empat baris di sekelilingnya — dan empat baris itu yang membedakan 150.000 dari 300.000.

**Apa yang dilakukan \`beginTransaction()\`.**

Setelah baris itu, setiap perubahan disimpan sementara, belum menjadi keadaan tetap. Pengguna lain belum melihatnya, dan perubahan itu bisa dibatalkan sepenuhnya.

\`commit()\` membuat semua perubahan sejak \`beginTransaction()\` menjadi tetap **sekaligus**. \`rollBack()\` membuang semuanya **sekaligus**. Tidak ada keadaan di mana sebagian tersimpan dan sebagian tidak.

**Kenapa \`try\` dan \`catch\` harus ada.**

Langkah kedua melanggar \`CHECK (saldo >= 0)\`. PDO melempar \`PDOException\` — karena mode galatnya \`ERRMODE_EXCEPTION\`, yang menjadi bawaan sejak PHP 8 dan tetap disetel eksplisit di program ini.

Tanpa \`catch\`, pengecualian itu langsung keluar dari fungsi. \`commit()\` tidak pernah dijalankan, tetapi \`rollBack()\` juga tidak. Transaksinya menggantung terbuka, dan nasibnya bergantung pada apa yang terjadi berikutnya — biasanya dibatalkan saat sambungan ditutup, tetapi kode yang benar tidak bergantung pada kebetulan itu.

Dengan \`catch\`, \`rollBack()\` dijalankan dengan sengaja, dan langkah pertama ikut dibatalkan.

**Kenapa \`throw $e\` setelah \`rollBack()\`.**

Fungsi ini tidak tahu apa yang harus ditampilkan ke pengguna — itu urusan pemanggilnya. Tugasnya cuma memastikan basis data kembali bersih, lalu memberi tahu pemanggil bahwa pemindahan gagal.

Menelan galatnya — \`rollBack()\` tanpa melempar ulang — membuat pemanggil mengira pemindahan berhasil. Pengguna melihat "berhasil", padahal saldonya tidak berubah.

**Dan dua hal yang tidak dilakukan transaksi.**

Pertama, transaksi tidak **memeriksa** apa pun. Yang menolak saldo negatif adalah \`CHECK\` di tabel. Tanpa batasan itu, langkah kedua berhasil, \`commit()\` berjalan, dan dompet 1 bersaldo minus 50.000 — di dalam transaksi yang "sukses".

Kedua, transaksi tidak otomatis mencegah dua pemindahan yang berjalan bersamaan saling mengganggu. Kalau kode membaca saldo dengan \`SELECT\`, memeriksanya di PHP, lalu menulis hasilnya, dua permintaan bersamaan bisa membaca saldo yang sama sebelum salah satunya menulis. Pernyataan \`saldo = saldo - ?\` di program ini menghindarinya karena membaca dan menulis dalam satu pernyataan, dan batasan \`CHECK\` menjaga sisanya. Untuk pola baca-periksa-tulis yang lebih rumit, MySQL dan PostgreSQL menyediakan \`SELECT ... FOR UPDATE\` yang mengunci baris yang dibaca sampai transaksi selesai.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// Kueri di sisi aplikasi: N+1, paginasi, transaksi
// ============================================

// PDO yang menghitung setiap kueri yang dijalankan
class DB extends PDO {
    public $jumlah = 0;
    public function prepare($sql, $opsi = []): PDOStatement|false {
        $this->jumlah++;
        return parent::prepare($sql, $opsi);
    }
    public function query($sql, $mode = null, ...$arg): PDOStatement|false {
        $this->jumlah++;
        return parent::query($sql);
    }
}

$db = new DB('sqlite::memory:');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("CREATE TABLE penulis (id INTEGER PRIMARY KEY, nama TEXT)");
$db->exec("CREATE TABLE artikel (id INTEGER PRIMARY KEY,
           penulis_id INTEGER, judul TEXT, dibuat INTEGER)");

mt_srand(7);
$db->beginTransaction();
$q = $db->prepare("INSERT INTO penulis (id, nama) VALUES (?, ?)");
for ($i = 1; $i <= 40; $i++) {
    $q->execute([$i, "Penulis $i"]);
}
$q = $db->prepare("INSERT INTO artikel (id, penulis_id, judul, dibuat)
                   VALUES (?, ?, ?, ?)");
for ($i = 1; $i <= 20000; $i++) {
    $q->execute([$i, mt_rand(1, 40), "Artikel $i", 1700000000 + $i * 60]);
}
$db->commit();

// --------------------------------------------
// 1. Masalah N+1
// --------------------------------------------
echo "--- menampilkan 50 artikel beserta nama penulisnya ---\n";

$db->jumlah = 0;
$artikel = $db->query("SELECT * FROM artikel ORDER BY id LIMIT 50")
              ->fetchAll(PDO::FETCH_ASSOC);
foreach ($artikel as &$a) {
    $q = $db->prepare("SELECT nama FROM penulis WHERE id = ?");
    $q->execute([$a['penulis_id']]);
    $a['penulis'] = $q->fetchColumn();
}
unset($a);
$naif_kueri = $db->jumlah;

$db->jumlah = 0;
$artikel2 = $db->query("SELECT artikel.*, penulis.nama AS penulis
                        FROM artikel JOIN penulis
                        ON penulis.id = artikel.penulis_id
                        ORDER BY artikel.id LIMIT 50")
               ->fetchAll(PDO::FETCH_ASSOC);
$join_kueri = $db->jumlah;

$db->jumlah = 0;
$artikel3 = $db->query("SELECT * FROM artikel ORDER BY id LIMIT 50")
               ->fetchAll(PDO::FETCH_ASSOC);
$ids = array_values(array_unique(array_column($artikel3, 'penulis_id')));
$tanda = implode(',', array_fill(0, count($ids), '?'));
$q = $db->prepare("SELECT id, nama FROM penulis WHERE id IN ($tanda)");
$q->execute($ids);
$peta = $q->fetchAll(PDO::FETCH_KEY_PAIR);
foreach ($artikel3 as &$a) {
    $a['penulis'] = $peta[$a['penulis_id']];
}
unset($a);
$in_kueri = $db->jumlah;

$sama = ($artikel == $artikel2) && ($artikel == $artikel3);
printf("  %-34s %6s\n", "cara", "kueri");
printf("  %-34s %6d\n", "satu kueri per artikel (N+1)", $naif_kueri);
printf("  %-34s %6d\n", "JOIN", $join_kueri);
printf("  %-34s %6d\n", "ambil artikel, lalu WHERE id IN", $in_kueri);
echo "\n  hasil ketiganya identik: " . ($sama ? "YA" : "TIDAK") . "\n";
echo "\n";
echo "  Cara pertama menjalankan 1 kueri untuk daftar artikel,\n";
echo "  lalu 1 kueri LAGI untuk setiap artikel -- 50 artikel\n";
echo "  berarti 51 kueri. Itulah nama N+1.\n";
echo "\n";
echo "  Di basis data dalam memori ini selisihnya kecil. Di\n";
echo "  peladen sungguhan, setiap kueri menempuh perjalanan\n";
echo "  jaringan ke basis data, dan waktu tempuh itu yang mahal\n";
echo "  (dihitung: jumlah kueri x jeda per kueri):\n";
echo "\n";
printf("  %-22s %14s %14s\n", "jeda jaringan/kueri", "N+1 (51)", "JOIN (1)");
foreach ([0.5, 2, 10] as $ms) {
    printf("  %-22s %11.1f ms %11.1f ms\n", "$ms ms",
           $naif_kueri * $ms, $join_kueri * $ms);
}
echo "\n";
echo "  Dan N+1 biasanya tidak terlihat di kode. Ia bersembunyi\n";
echo "  di balik pemanggilan yang tampak polos seperti\n";
echo "  \$artikel->penulis() di dalam perulangan tampilan.\n";

// --------------------------------------------
// 2. Paginasi OFFSET makin lambat di halaman jauh
// --------------------------------------------
echo "\n--- paginasi: OFFSET vs keyset ---\n";
function langkah_scan($db, $sql, $param) {
    // ambil hasilnya untuk memastikan kedua cara memberi
    // baris yang sama persis di setiap halaman
    $q = $db->prepare($sql);
    $q->execute($param);
    return $q->fetchAll(PDO::FETCH_COLUMN);
}
$per = 20;
function ukur($db, $sql, $param, $ulang = 300) {
    $q = $db->prepare($sql);
    $t = hrtime(true);
    for ($i = 0; $i < $ulang; $i++) {
        $q->execute($param);
        $q->fetchAll(PDO::FETCH_COLUMN);
    }
    return (hrtime(true) - $t) / $ulang / 1000;     // mikrodetik
}
echo "  (kolom 'harus dilewati' = definisi OFFSET; kolom waktu\n";
echo "   DIUKUR di mesin ini, rata-rata 300 kali, dan akan sedikit\n";
echo "   berbeda di mesin lain)\n\n";
printf("  %-8s %15s %13s %13s\n", "halaman", "harus dilewati",
       "OFFSET (us)", "keyset (us)");
$waktu = [];
foreach ([1, 10, 100, 900] as $hal) {
    $offset = ($hal - 1) * $per;
    $ids_off = langkah_scan($db,
        "SELECT id FROM artikel ORDER BY id LIMIT ? OFFSET ?",
        [$per, $offset]);
    $akhir_sebelum = $offset;             // id terakhir halaman sebelumnya
    $ids_key = langkah_scan($db,
        "SELECT id FROM artikel WHERE id > ? ORDER BY id LIMIT ?",
        [$akhir_sebelum, $per]);
    if ($ids_off !== $ids_key) {
        echo "  HASIL BERBEDA di halaman $hal\n";
    }
    $w_off = ukur($db, "SELECT id FROM artikel ORDER BY id LIMIT ? OFFSET ?",
                  [$per, $offset]);
    $w_key = ukur($db, "SELECT id FROM artikel WHERE id > ? ORDER BY id LIMIT ?",
                  [$akhir_sebelum, $per]);
    $waktu[$hal] = [$w_off, $w_key];
    printf("  %-8d %15s %13.1f %13.1f\n", $hal,
           number_format($offset, 0, ',', '.'), $w_off, $w_key);
}
$rasio = $waktu[900][0] / $waktu[900][1];
echo "\n  Di halaman 900, OFFSET " . round($rasio) . " kali lebih lambat daripada\n";
echo "  keyset -- sementara di halaman 1 keduanya setara.\n";
echo "\n";
echo "  Kedua cara memberi baris yang SAMA di setiap halaman.\n";
echo "\n";
echo "  OFFSET 17.980 berarti mesin basis data membaca 17.980\n";
echo "  baris lalu membuangnya, sebelum mengambil 20 yang\n";
echo "  diminta. Makin jauh halamannya, makin banyak yang\n";
echo "  dibuang -- biayanya tumbuh lurus dengan nomor halaman.\n";
echo "\n";
echo "  Keyset ('WHERE id > id_terakhir') langsung melompat ke\n";
echo "  tempatnya lewat indeks. Halaman 900 sama murahnya dengan\n";
echo "  halaman 1.\n";
echo "\n";
echo "  Harganya: keyset tidak bisa melompat ke 'halaman 537'\n";
echo "  secara langsung -- ia cuma tahu 'berikutnya'. Cocok\n";
echo "  untuk gulir tanpa akhir dan API; OFFSET tetap wajar\n";
echo "  untuk tabel kecil yang halamannya dipilih manusia.\n";

// --------------------------------------------
// 3. Paginasi OFFSET melewatkan data yang baru masuk
// --------------------------------------------
echo "\n--- OFFSET dan data yang berubah saat dibaca ---\n";
$db->exec("CREATE TABLE kabar (id INTEGER PRIMARY KEY, judul TEXT)");
for ($i = 1; $i <= 10; $i++) {
    $db->exec("INSERT INTO kabar (id, judul) VALUES ($i, 'kabar $i')");
}
// urutan terbaru dulu; pengguna membaca halaman 1 (5 per halaman)
$h1 = $db->query("SELECT id FROM kabar ORDER BY id DESC LIMIT 5 OFFSET 0")
         ->fetchAll(PDO::FETCH_COLUMN);
// sementara itu dua kabar baru masuk
$db->exec("INSERT INTO kabar (id, judul) VALUES (11, 'kabar 11')");
$db->exec("INSERT INTO kabar (id, judul) VALUES (12, 'kabar 12')");
$h2_off = $db->query("SELECT id FROM kabar ORDER BY id DESC LIMIT 5 OFFSET 5")
             ->fetchAll(PDO::FETCH_COLUMN);
$q = $db->prepare("SELECT id FROM kabar WHERE id < ? ORDER BY id DESC LIMIT 5");
$q->execute([end($h1)]);
$h2_key = $q->fetchAll(PDO::FETCH_COLUMN);
echo "  halaman 1 dibaca           : " . implode(', ', $h1) . "\n";
echo "  (dua kabar baru masuk: 11 dan 12)\n";
echo "  halaman 2 dengan OFFSET    : " . implode(', ', $h2_off) . "\n";
echo "  halaman 2 dengan keyset    : " . implode(', ', $h2_key) . "\n";
$dobel = array_intersect($h1, $h2_off);
echo "\n  tampil DUA KALI dengan OFFSET: " . implode(', ', $dobel) . "\n";
echo "\n";
echo "  Dua kabar baru mendorong seluruh daftar turun dua baris,\n";
echo "  sehingga OFFSET 5 sekarang menunjuk dua baris yang sudah\n";
echo "  dilihat di halaman 1. Pengguna membaca kabar yang sama\n";
echo "  dua kali.\n";
echo "\n";
echo "  Keyset tidak terpengaruh, karena ia tidak menghitung\n";
echo "  posisi -- ia melanjutkan dari id terakhir yang dilihat.\n";

// --------------------------------------------
// 4. Transaksi: semua atau tidak sama sekali
// --------------------------------------------
echo "\n--- transaksi: memindahkan saldo ---\n";
$db->exec("CREATE TABLE dompet (id INTEGER PRIMARY KEY, saldo INTEGER
           CHECK (saldo >= 0))");
$db->exec("INSERT INTO dompet VALUES (1, 100000), (2, 50000)");

function total($db) {
    return (int)$db->query("SELECT SUM(saldo) FROM dompet")->fetchColumn();
}

function pindah_tanpa_transaksi($db, $dari, $ke, $n) {
    $db->prepare("UPDATE dompet SET saldo = saldo + ? WHERE id = ?")
       ->execute([$n, $ke]);
    $db->prepare("UPDATE dompet SET saldo = saldo - ? WHERE id = ?")
       ->execute([$n, $dari]);
}

function pindah_dengan_transaksi($db, $dari, $ke, $n) {
    $db->beginTransaction();
    try {
        $db->prepare("UPDATE dompet SET saldo = saldo + ? WHERE id = ?")
           ->execute([$n, $ke]);
        $db->prepare("UPDATE dompet SET saldo = saldo - ? WHERE id = ?")
           ->execute([$n, $dari]);
        $db->commit();
    } catch (PDOException $e) {
        $db->rollBack();
        throw $e;
    }
}

echo "  saldo awal: dompet 1 = 100.000, dompet 2 = 50.000\n";
echo "  total uang di sistem: " . number_format(total($db), 0, ',', '.') . "\n\n";

echo "  Pindahkan 150.000 dari dompet 1 (saldonya cuma 100.000)\n\n";
try {
    pindah_tanpa_transaksi($db, 1, 2, 150000);
} catch (PDOException $e) {
    echo "  TANPA transaksi  : langkah kedua gagal (saldo negatif)\n";
}
echo "    total uang sekarang : " . number_format(total($db), 0, ',', '.') . "\n";

$db->exec("UPDATE dompet SET saldo = CASE id WHEN 1 THEN 100000 ELSE 50000 END");
try {
    pindah_dengan_transaksi($db, 1, 2, 150000);
} catch (PDOException $e) {
    echo "  DENGAN transaksi : langkah kedua gagal, SEMUA dibatalkan\n";
}
echo "    total uang sekarang : " . number_format(total($db), 0, ',', '.') . "\n";
echo "\n";
echo "  Tanpa transaksi, langkah pertama (menambah ke dompet 2)\n";
echo "  sudah tersimpan saat langkah kedua gagal. Uang 150.000\n";
echo "  MUNCUL DARI UDARA -- total sistem berubah.\n";
echo "\n";
echo "  Dengan transaksi, kegagalan langkah kedua membatalkan\n";
echo "  langkah pertama juga. Keadaannya kembali persis seperti\n";
echo "  sebelum dimulai.\n";
echo "\n";
echo "  Perhatikan juga penjaga terakhirnya: CHECK (saldo >= 0)\n";
echo "  di basis data. Validasi di PHP bisa terlewat; batasan\n";
echo "  di tabel tidak bisa dilewati kode mana pun.\n";` },
  output: `--- menampilkan 50 artikel beserta nama penulisnya ---
  cara                                kueri
  satu kueri per artikel (N+1)           51
  JOIN                                    1
  ambil artikel, lalu WHERE id IN         2

  hasil ketiganya identik: YA

  Cara pertama menjalankan 1 kueri untuk daftar artikel,
  lalu 1 kueri LAGI untuk setiap artikel -- 50 artikel
  berarti 51 kueri. Itulah nama N+1.

  Di basis data dalam memori ini selisihnya kecil. Di
  peladen sungguhan, setiap kueri menempuh perjalanan
  jaringan ke basis data, dan waktu tempuh itu yang mahal
  (dihitung: jumlah kueri x jeda per kueri):

  jeda jaringan/kueri          N+1 (51)       JOIN (1)
  0.5 ms                        25.5 ms         0.5 ms
  2 ms                         102.0 ms         2.0 ms
  10 ms                        510.0 ms        10.0 ms

  Dan N+1 biasanya tidak terlihat di kode. Ia bersembunyi
  di balik pemanggilan yang tampak polos seperti
  $artikel->penulis() di dalam perulangan tampilan.

--- paginasi: OFFSET vs keyset ---
  (kolom 'harus dilewati' = definisi OFFSET; kolom waktu
   DIUKUR di mesin ini, rata-rata 300 kali, dan akan sedikit
   berbeda di mesin lain)

  halaman   harus dilewati   OFFSET (us)   keyset (us)
  1                      0           7.2           7.7
  10                   180           9.0           7.8
  100                1.980          27.0           7.9
  900               17.980         185.7           8.1

  Di halaman 900, OFFSET 23 kali lebih lambat daripada
  keyset -- sementara di halaman 1 keduanya setara.

  Kedua cara memberi baris yang SAMA di setiap halaman.

  OFFSET 17.980 berarti mesin basis data membaca 17.980
  baris lalu membuangnya, sebelum mengambil 20 yang
  diminta. Makin jauh halamannya, makin banyak yang
  dibuang -- biayanya tumbuh lurus dengan nomor halaman.

  Keyset ('WHERE id > id_terakhir') langsung melompat ke
  tempatnya lewat indeks. Halaman 900 sama murahnya dengan
  halaman 1.

  Harganya: keyset tidak bisa melompat ke 'halaman 537'
  secara langsung -- ia cuma tahu 'berikutnya'. Cocok
  untuk gulir tanpa akhir dan API; OFFSET tetap wajar
  untuk tabel kecil yang halamannya dipilih manusia.

--- OFFSET dan data yang berubah saat dibaca ---
  halaman 1 dibaca           : 10, 9, 8, 7, 6
  (dua kabar baru masuk: 11 dan 12)
  halaman 2 dengan OFFSET    : 7, 6, 5, 4, 3
  halaman 2 dengan keyset    : 5, 4, 3, 2, 1

  tampil DUA KALI dengan OFFSET: 7, 6

  Dua kabar baru mendorong seluruh daftar turun dua baris,
  sehingga OFFSET 5 sekarang menunjuk dua baris yang sudah
  dilihat di halaman 1. Pengguna membaca kabar yang sama
  dua kali.

  Keyset tidak terpengaruh, karena ia tidak menghitung
  posisi -- ia melanjutkan dari id terakhir yang dilihat.

--- transaksi: memindahkan saldo ---
  saldo awal: dompet 1 = 100.000, dompet 2 = 50.000
  total uang di sistem: 150.000

  Pindahkan 150.000 dari dompet 1 (saldonya cuma 100.000)

  TANPA transaksi  : langkah kedua gagal (saldo negatif)
    total uang sekarang : 300.000
  DENGAN transaksi : langkah kedua gagal, SEMUA dibatalkan
    total uang sekarang : 150.000

  Tanpa transaksi, langkah pertama (menambah ke dompet 2)
  sudah tersimpan saat langkah kedua gagal. Uang 150.000
  MUNCUL DARI UDARA -- total sistem berubah.

  Dengan transaksi, kegagalan langkah kedua membatalkan
  langkah pertama juga. Keadaannya kembali persis seperti
  sebelum dimulai.

  Perhatikan juga penjaga terakhirnya: CHECK (saldo >= 0)
  di basis data. Validasi di PHP bisa terlewat; batasan
  di tabel tidak bisa dilewati kode mana pun.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Daftar n baris dengan N+1', waktu: 'n + 1 kueri', memori: 'n + 1 perjalanan jaringan' },
      { operasi: 'Daftar n baris dengan JOIN', waktu: '1 kueri', memori: 'kolom induk diulang di setiap baris' },
      { operasi: 'Daftar n baris dengan WHERE IN', waktu: '2 kueri', memori: 'larik peta id => induk di PHP' },
      { operasi: 'Halaman ke-h dengan OFFSET', waktu: 'O(h × p)', memori: 'p = baris per halaman; semua baris sebelumnya dibaca' },
      { operasi: 'Halaman berikutnya dengan keyset', waktu: 'O(log n + p)', memori: 'lompat lewat indeks, lalu baca p baris' },
      { operasi: 'Transaksi dengan k perubahan', waktu: 'O(k) + satu commit', memori: 'perubahan ditahan sampai commit atau rollBack' }
    ],
    intuisi: `Kolom waktu untuk N+1, JOIN, dan WHERE IN sengaja ditulis dalam **jumlah kueri**, bukan notasi O besar. Kerja basis data untuk ketiganya hampir sama — mencari penulis lewat kunci primer, puluhan kali. Yang berbeda adalah berapa kali aplikasi harus menunggu jawaban lewat jaringan, dan untuk aplikasi web, **itulah** biaya yang dominan.

OFFSET tumbuh lurus dengan nomor halaman karena setiap baris sebelumnya tetap dibaca. Keyset tumbuh logaritmik dengan ukuran tabel karena lompatannya lewat indeks — di tabel 20.000 baris, itu berarti hampir konstan, seperti yang terlihat di ukuran: 7,7 µs di halaman 1 dan 8,1 µs di halaman 900.

Transaksi hampir tidak menambah biaya — perubahan ditulis dengan cara yang sama, cuma ditahan sampai \`commit()\`. Justru sebaliknya: mengisi 20.000 baris di dalam satu transaksi jauh lebih cepat daripada tanpa transaksi, karena basis data cukup memastikan data tersimpan aman ke diska satu kali di akhir, bukan 20.000 kali.`
  },

  kesalahanUmum: [
    {
      salah: 'Menjalankan kueri di dalam perulangan yang menampilkan daftar.',
      kenapa: 'Jumlah kuerinya naik mengikuti jumlah baris, dan setiap kueri menunggu perjalanan jaringan ke peladen basis data. Dengan data uji sepuluh baris tidak terasa; dengan halaman lima puluh baris di peladen sungguhan, waktunya bisa ratusan milidetik.',
      benar: 'Kumpulkan id yang dibutuhkan, ambil semuanya dengan JOIN atau satu WHERE IN, lalu pasangkan di PHP.'
    },
    {
      salah: 'Membiarkan ORM memuat relasi satu per satu di dalam tampilan.',
      kenapa: 'Pemanggilan relasi di tampilan terlihat seperti membaca properti biasa, padahal setiap pemanggilan menjalankan kueri baru. N+1 jenis ini tidak terlihat sama sekali dari membaca kodenya.',
      benar: 'Muat relasinya di awal dengan fitur pemuatan relasi ORM, misalnya with() di Laravel, dan periksa jumlah kueri lewat pencatat kuerinya.'
    },
    {
      salah: 'Memakai OFFSET untuk linimasa atau daftar yang terus bertambah.',
      kenapa: 'Baris baru di depan menggeser posisi semua baris lama, sehingga halaman berikutnya menampilkan ulang baris yang sudah dilihat atau melewatkan baris lain. OFFSET juga makin lambat di halaman yang jauh.',
      benar: 'Pakai keyset: minta baris yang lebih lama dari baris terakhir yang sudah dilihat, dengan id sebagai pemecah seri kalau kolom urutnya tidak unik.'
    },
    {
      salah: 'Menjalankan beberapa perubahan yang saling terkait tanpa transaksi.',
      kenapa: 'Kalau langkah kedua gagal, langkah pertama sudah tersimpan dan data berada di keadaan yang tidak dimaksudkan siapa pun, misalnya uang yang bertambah tanpa berkurang di tempat lain. Mengubah urutan langkah cuma mengubah jenis kerusakannya.',
      benar: 'Bungkus dengan beginTransaction dan commit, dan jalankan rollBack di jalur galat.'
    },
    {
      salah: 'Menelan galat di catch setelah rollBack tanpa melempar ulang atau melapor.',
      kenapa: 'Pemanggil mengira operasinya berhasil dan menampilkan pesan berhasil kepada pengguna, padahal tidak ada yang berubah.',
      benar: 'Lempar ulang galatnya setelah rollBack, atau kembalikan nilai yang jelas menyatakan gagal.'
    },
    {
      salah: 'Memakai tabel MyISAM di MySQL lalu mengandalkan transaksi.',
      kenapa: 'MyISAM tidak mendukung transaksi. Perintah beginTransaction dan rollBack tidak menimbulkan galat, tetapi perubahan tetap tersimpan satu per satu dan tidak ada yang dibatalkan.',
      benar: 'Pakai InnoDB, yang menjadi mesin bawaan sejak MySQL 5.5, dan periksa mesin tabel lama dengan SHOW TABLE STATUS.'
    },
    {
      salah: 'Menjaga aturan penting seperti saldo tidak boleh negatif hanya di kode PHP.',
      kenapa: 'Validasi PHP bisa terlewat di satu jalur kode yang lupa memanggilnya, atau kalah oleh dua permintaan bersamaan yang sama-sama membaca saldo lama. Selain itu, MySQL sebelum 8.0.16 mengabaikan CHECK tanpa pemberitahuan.',
      benar: 'Pasang batasan di tabel, pastikan versi basis datamu benar-benar menegakkannya, dan tetap validasi di PHP untuk pesan yang ramah.'
    }
  ],

  analogi: `Bayangkan **pelayan warung** yang mencatat pesanan satu meja berisi lima puluh orang.

**N+1.** Pelayan pertama mencatat pesanan orang pertama, berjalan ke dapur, kembali, mencatat orang kedua, berjalan ke dapur lagi — lima puluh kali. Juru masaknya secepat apa pun, sebagian besar waktu habis di jalan antara meja dan dapur.

Pelayan kedua mencatat kelima puluh pesanan, lalu ke dapur **sekali**. Itu JOIN atau WHERE IN. Juru masaknya bekerja sama banyak; yang hilang cuma perjalanan bolak-balik.

Dan makin jauh dapurnya — di lantai lain, di gedung sebelah — makin besar selisih kedua pelayan itu. Jarak ke dapur itulah jeda jaringan ke peladen basis data.

**OFFSET.** Kamu antre di loket dan bertanya "tolong layani orang ke-17.981". Petugas yang memakai OFFSET menghitung dari orang pertama: satu, dua, tiga... sampai 17.980, lalu melayani berikutnya. Setiap kali kamu bertanya, ia menghitung ulang dari awal.

Petugas yang memakai keyset bertanya "nomor antrean terakhir yang sudah dilayani berapa?" — lalu langsung memanggil nomor sesudahnya. Nomor 17.981 sama cepatnya dengan nomor 2.

**Data yang bertambah.** Kamu membaca papan pengumuman yang diurutkan dari yang terbaru, lima lembar per baris. Selesai membaca baris pertama, kamu menoleh sebentar — dan petugas menempelkan dua pengumuman baru di paling depan. Kamu lanjut ke "baris kedua", dan dua lembar pertamanya adalah pengumuman yang baru saja kamu baca. Itu OFFSET.

Kalau kamu mengingat "terakhir kubaca pengumuman nomor 6" lalu mencari yang lebih lama dari nomor 6, pengumuman baru di depan tidak mengganggumu sama sekali. Itu keyset.

**Transaksi.** Bendahara memindahkan uang kas dari amplop A ke amplop B. Ia memasukkan uang ke amplop B lebih dulu — lalu ternyata amplop A tidak berisi uang sebanyak itu.

Tanpa aturan apa pun, amplop B sekarang lebih tebal dan amplop A tetap sama. Total kas bertambah dari udara.

Bendahara yang cermat mencatat pemindahan di **selembar kertas kerja** lebih dulu, dan baru memindahkan uang sungguhan setelah kedua langkah dipastikan bisa dilakukan. Kalau salah satu tidak bisa, kertas kerjanya disobek, dan tidak ada amplop yang tersentuh. Kertas kerja itulah transaksi: semua langkah jadi, atau tidak ada yang jadi.`,

  latihan: [
    'Tambahkan penghitung kueri ke kelas PDO-mu, lalu hitung berapa kueri yang dijalankan satu halaman daftar di proyekmu sendiri.',
    'Tulis ulang perulangan N+1 di proyekmu menjadi JOIN, lalu menjadi WHERE IN, dan pastikan ketiga hasilnya identik.',
    'Hitung waktu tunggu jaringan untuk halaman 100 baris dengan pola N+1 kalau jeda per kueri 3 ms, lalu bandingkan dengan JOIN.',
    'Jelaskan kenapa \`WHERE id IN ()\` dengan daftar kosong harus dicegah, dan tulis penjaganya.',
    'Tunjukkan dengan contoh kecil apa yang terjadi kalau \`unset($a)\` dihapus setelah perulangan dengan \`&$a\`, lalu diikuti perulangan biasa.',
    'Ukur waktu OFFSET dan keyset di tabelmu sendiri untuk halaman 1, 100, dan 1.000.',
    'Tulis kueri keyset untuk daftar yang diurutkan berdasarkan tanggal dibuat dari yang terbaru, dengan id sebagai pemecah seri.',
    'Ulangi percobaan kabar baru dengan tiga kabar yang masuk di antara halaman 1 dan 2, lalu tentukan kabar mana yang tampil dua kali dengan OFFSET.',
    'Tulis fungsi pemesanan yang mengurangi stok dan membuat baris pesanan dalam satu transaksi, lalu uji dengan stok yang tidak cukup.',
    'Hapus batasan \`CHECK\` dari tabel dompet, jalankan ulang pemindahan dengan transaksi, lalu jelaskan kenapa transaksinya sekarang berhasil dan apa akibatnya.'
  ]
});


TOPICS.push({
  id: 'pemweb2-token',
  judul: 'Autentikasi: Sesi, Token Bertanda Tangan & Cookie',
  kategori: 'pemweb2',
  tag: ['autentikasi', 'sesi', 'token', 'HMAC', 'JWT', 'cookie', 'HttpOnly', 'SameSite'],
  ringkas: 'Sesi: peladen yang mengingat. Token: peladen yang tidak perlu mengingat — dan karena itu tidak bisa lupa.',

  fungsi: `**Mengenali siapa yang mengirim setiap permintaan, setelah ia membuktikan dirinya sekali saat masuk.**

HTTP tidak punya ingatan: setiap permintaan berdiri sendiri. Setelah kata sandi diperiksa, harus ada sesuatu yang dibawa setiap permintaan berikutnya untuk menyatakan "ini aku yang tadi". Ada dua cara besar:

- **Sesi** — peladen menyimpan catatan siapa yang masuk, klien cuma membawa nomor acaknya
- **Token bertanda tangan** — klien membawa seluruh keterangannya sendiri, dan peladen cuma memeriksa tanda tangannya

Terpakai di:

- **Halaman masuk** di setiap aplikasi web yang kamu buat
- **API untuk aplikasi ponsel** — sering memakai token
- **Layanan yang saling memanggil** tanpa satu pusat penyimpanan sesi
- **Membaca dan memakai JWT** — bentuk token bertanda tangan yang paling umum

Yang paling sering disalahpahami: **isi token bisa dibaca siapa pun.** Tanda tangan membuktikan isinya tidak diubah; ia tidak menyembunyikan apa pun.

Dan yang paling sering terlambat disadari: **token tidak bisa ditarik kembali.** Tombol keluar di aplikasi cuma menghapus salinan token di perangkat itu. Salinan lain tetap sah sampai kedaluwarsa.`,

  praktik: {
    tujuan: 'Kamu bisa membuat sesi PHP yang aman untuk halaman masuk, membuat dan memeriksa token HMAC dengan waktu kedaluwarsa, menjelaskan kapan masing-masing cocok, dan memasang atribut cookie yang benar.',
    alat: ['PHP 8', 'Peramban dengan alat pengembang (tab Application/Storage untuk melihat cookie)', 'Peladen bawaan PHP atau XAMPP'],
    langkah: [
      { judul: 'Atur cookie sesi sebelum session_start',
        isi: `Panggil \`session_set_cookie_params()\` dengan larik berisi \`'httponly' => true\`, \`'secure' => true\`, \`'samesite' => 'Lax'\`, dan \`'path' => '/'\` — **sebelum** \`session_start()\`.

Setel juga \`session.use_strict_mode\` ke 1 supaya PHP menolak id sesi yang tidak pernah ia buat sendiri.` },
      { judul: 'Ganti id sesi setelah masuk',
        isi: `Tepat setelah kata sandi terbukti benar, panggil \`session_regenerate_id(true)\`, baru simpan data pengguna ke \`$_SESSION\`.

Tanpa langkah ini, penyerang yang berhasil menanamkan id sesi tertentu ke peramban korban sebelum korban masuk bisa ikut memakai sesi itu setelah korban masuk — serangan yang disebut *session fixation*.` },
      { judul: 'Keluar dengan benar',
        isi: `Kosongkan \`$_SESSION = []\`, lalu \`session_destroy()\` untuk menghapus catatannya di peladen.

Karena catatannya di peladen yang dihapus, cookie yang sama sudah tidak berarti apa-apa lagi — meskipun ada salinannya di tempat lain.` },
      { judul: 'Periksa cookie di peramban',
        isi: `Buka alat pengembang, lihat cookie sesi aplikasimu, dan pastikan kolom HttpOnly, Secure, dan SameSite terisi.

Lalu coba baca \`document.cookie\` dari konsol: cookie sesi seharusnya **tidak** muncul di sana.

Kalau kamu mengembangkan lewat \`http://\` tanpa HTTPS dan masuk tiba-tiba tidak berfungsi, periksa atribut Secure lebih dulu: peramban tidak mengirim cookie Secure lewat koneksi yang dianggapnya tidak aman. Selesaikan dengan memakai HTTPS di mesin pengembangan, bukan dengan mematikan Secure di peladen sungguhan.` },
      { judul: 'Buat token HMAC',
        isi: `Isi token adalah JSON berisi pengguna, peran, dan waktu kedaluwarsa, dikodekan base64url. Tanda tangannya \`hash_hmac('sha256', $bagian, $rahasia, true)\`, juga dikodekan base64url. Token = isi + titik + tanda tangan.

Rahasianya harus panjang dan acak — misalnya dari \`bin2hex(random_bytes(32))\` — dan disimpan di berkas konfigurasi atau variabel lingkungan yang **tidak** ikut masuk repo.` },
      { judul: 'Periksa token dengan urutan yang benar',
        isi: `Hitung ulang tanda tangan dari bagian isi, bandingkan dengan \`hash_equals()\`, dan baru setelah cocok baca isinya dan periksa waktu kedaluwarsa.

Membaca isi sebelum tanda tangannya terbukti berarti memercayai data yang bisa ditulis siapa pun.` },
      { judul: 'Coba ubah isi token',
        isi: `Dekode bagian isinya, ganti perannya menjadi admin, kodekan lagi, dan pasang tanda tangan lama.

Pemeriksaan harus menolaknya. Kalau tidak, ada yang salah di urutan pemeriksaanmu.` },
      { judul: 'Tentukan umur token dan cara mencabutnya',
        isi: `Buat token akses berumur pendek — misalnya 15 menit. Kalau pengguna harus tetap masuk lebih lama, tambahkan token penyegar berumur panjang yang **disimpan di peladen** dan bisa dihapus saat pengguna keluar atau kata sandinya diganti.` }
    ],
    cek: [
      'Cookie sesimu ber-HttpOnly, Secure, dan SameSite, dan tidak terbaca dari document.cookie',
      'Id sesi berganti tepat setelah masuk',
      'Token yang isinya diubah ditolak, dan token yang lewat waktunya ditolak',
      'Kamu bisa menjelaskan kenapa tombol keluar tidak membatalkan token, dan apa yang dilakukan aplikasimu untuk itu'
    ]
  },

  judulLogicSyntax: 'Bedah Kode — tanda tangan yang tidak bisa dipalsukan, dan token yang tidak bisa dilupakan',

  konsep: `Topik Keamanan Aplikasi Web sudah membahas cara menyimpan kata sandi dengan bcrypt dan cara memeriksanya saat masuk. Topik ini tentang yang terjadi **sesudahnya**: setelah kata sandi terbukti benar sekali, bagaimana peladen mengenali pengguna yang sama di ratusan permintaan berikutnya tanpa meminta kata sandinya lagi.

**Sesi: peladen yang mengingat**

Saat masuk berhasil, peladen membuat id acak dan menyimpan catatan: id ini milik siapa, sejak kapan, dengan hak apa. Id itu dikirim ke peramban sebagai cookie.

| | |
|---|---|
| panjang id sesi | 128 bit acak |
| permintaan dengan cookie itu | dikenali sebagai andi |
| setelah keluar | tidak dikenal |

Cookie-nya cuma nomor antrean. Semua keterangan penting ada di **peladen**, dan keluar cukup dengan menghapus satu catatan. 128 bit acak berarti ada 2^128 kemungkinan id — menebak id sesi orang lain secara acak tidak mungkin dalam waktu yang masuk akal.

Di PHP, semua ini dikerjakan \`session_start()\` dan larik \`$_SESSION\`. Yang harus kamu tambahkan sendiri: atribut cookie yang benar, dan \`session_regenerate_id(true)\` tepat setelah masuk.

**Token bertanda tangan: peladen yang tidak perlu mengingat**

Cara kedua membalik semuanya. Peladen tidak menyimpan apa-apa. Seluruh keterangan — siapa, perannya apa, berlaku sampai kapan — dimasukkan ke token itu sendiri, lalu ditandatangani dengan rahasia yang cuma diketahui peladen.

Token di program ini terdiri dari dua bagian yang dipisah titik: isi dalam base64url, dan tanda tangan HMAC-SHA256 dari isi itu. Bagian isinya, kalau didekode:

\`{"pengguna":"andi","peran":"mahasiswa","kedaluwarsa":1900}\`

Itu terbaca **tanpa rahasia apa pun**. Base64 bukan enkripsi — cuma cara menulis data biner dengan huruf yang aman dikirim lewat URL dan header. Jadi jangan pernah menaruh apa pun yang rahasia di dalam token.

JWT, bentuk token yang paling sering kamu temui, memakai gagasan yang sama dengan satu bagian tambahan di depan: kepala yang menyebut algoritme tanda tangannya. Susunannya kepala.isi.tanda-tangan.

**Mengubah isi: ketahuan**

Pemegang token mengganti \`"peran":"mahasiswa"\` menjadi \`"admin"\`, lalu memasang tanda tangan lama. Hasil pemeriksaan: **TANDA TANGAN TIDAK COCOK**.

Tanda tangan dihitung dari isi **dan** rahasia peladen. Isi yang berubah memberi tanda tangan yang berbeda, dan membuat tanda tangan baru yang cocok butuh rahasia yang tidak dimiliki pemegang token.

**Kedaluwarsa**

| Waktu sejak dibuat | Hasil |
|---|---|
| 60 detik | sah |
| 899 detik | sah |
| 901 detik | token sudah kedaluwarsa |

Waktu kedaluwarsa ada **di dalam** isi token dan ikut ditandatangani, jadi pemegangnya tidak bisa memperpanjang sendiri.

**Kelemahan terbesar token: tidak bisa ditarik kembali**

Andi menekan tombol keluar, dan aplikasinya menghapus token dari perangkat itu. Lima menit kemudian, salinan token yang sama — misalnya yang tersimpan di perangkat lain, atau yang tercuri — dikirim lagi. Hasil pemeriksaan: **sah**.

Peladen tidak mengingat apa pun, jadi ia tidak punya cara tahu bahwa pemiliknya sudah keluar. Token berlaku sampai kedaluwarsa.

Penyelesaiannya adalah **daftar cabut**: hash token yang sudah dicabut disimpan, dan setiap pemeriksaan melihat daftar itu dulu. Dengan daftar cabut, hasil pemeriksaannya menjadi **token sudah dicabut**.

Tetapi perhatikan harganya. Daftar cabut adalah keadaan yang harus disimpan dan diperiksa di **setiap** permintaan — keunggulan utama token, peladen yang tidak perlu mengingat, sebagian hilang.

Jalan tengah yang lazim: **token akses berumur pendek** (beberapa menit) yang tidak diperiksa ke daftar mana pun, ditambah **token penyegar berumur panjang** yang disimpan di peladen dan bisa dicabut. Kerugian terburuk saat token akses tercuri dibatasi oleh umurnya yang pendek.

**Sesi atau token?**

| | Sesi | Token |
|---|---|---|
| Keterangan disimpan di | peladen | pemegang token |
| Keluar seketika | ya, hapus catatan | tidak, tunggu habis |
| Banyak peladen | perlu simpanan bersama | cukup rahasia yang sama |
| Klien bisa membaca isinya | tidak | ya (tidak dienkripsi) |
| Cocok untuk | aplikasi web biasa | API antarlayanan |

Untuk aplikasi web biasa dengan satu peladen — hampir semua proyek kuliah — sesi hampir selalu pilihan yang lebih sederhana dan lebih aman. Token masuk akal ketika banyak layanan harus memeriksa identitas tanpa bertanya ke satu pusat.

**Atribut cookie yang wajib**

Sesi maupun token yang disimpan di cookie harus diberi atribut ini:

| Atribut | Artinya |
|---|---|
| HttpOnly | JavaScript halaman tidak bisa membacanya |
| Secure | hanya dikirim lewat HTTPS |
| SameSite=Lax | tidak ikut di sebagian besar permintaan lintas situs |
| Max-Age / Expires | berakhir sendiri, tidak selamanya |

**HttpOnly** yang paling sering terlupa, dan paling besar artinya. Kalau ada satu celah XSS di aplikasimu, skrip penyerang bisa membaca \`document.cookie\` dan mengirim isinya keluar. Dengan HttpOnly, cookie sesi tidak muncul di sana sama sekali.

**SameSite=Lax** berarti cookie tetap dikirim saat pengguna mengeklik tautan dari situs lain ke aplikasimu — supaya ia tetap dalam keadaan masuk — tetapi **tidak** dikirim pada formulir POST dari situs lain, gambar, bingkai, atau \`fetch()\` lintas situs. Itu menutup sebagian besar jalan CSRF, meskipun token CSRF dari topik Keamanan Aplikasi Web tetap perlu untuk lapisan kedua.

**Satu catatan tentang program ini.** Rahasia penandatanganan ditulis langsung di kode supaya programnya bisa dijalankan sendiri. Di aplikasi sungguhan, rahasia itu disimpan di luar kode — dan terutama di luar repo, apalagi repo publik. Siapa pun yang tahu rahasianya bisa membuat token untuk pengguna mana pun, dengan peran apa pun.`,

  logicSyntax: [
    {
      bahasa: 'php',
      kode: String.raw`function b64u($s) {
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}
function buat_token($isi, $rahasia) {
    $bagian = b64u(json_encode($isi));
    $tanda = b64u(hash_hmac('sha256', $bagian, $rahasia, true));
    return $bagian . '.' . $tanda;
}
function periksa_token($token, $rahasia, $sekarang) {
    $pisah = explode('.', $token);
    if (count($pisah) !== 2) {
        return [null, 'bentuk token salah'];
    }
    [$bagian, $tanda] = $pisah;
    $seharusnya = b64u(hash_hmac('sha256', $bagian, $rahasia, true));
    if (!hash_equals($seharusnya, $tanda)) {
        return [null, 'TANDA TANGAN TIDAK COCOK'];
    }
    $isi = json_decode(base64_decode(strtr($bagian, '-_', '+/')), true);
    if ($isi['kedaluwarsa'] < $sekarang) {
        return [null, 'token sudah kedaluwarsa'];
    }
    return [$isi, 'sah'];
}`,
      penjelasan: `Sekitar dua puluh lima baris, dan hampir setiap barisnya menjawab satu cara token bisa dipalsukan.

**\`b64u\`: base64 yang aman di URL.**

Base64 biasa memakai huruf \`+\` dan \`/\`, yang punya arti khusus di URL, dan diakhiri \`=\` sebagai pengisi. \`strtr\` menukar kedua huruf itu dengan \`-\` dan \`_\`, dan \`rtrim\` membuang pengisinya. Hasilnya bisa ditaruh di URL, header, atau cookie tanpa perlu dikodekan lagi. Itu format yang sama yang dipakai JWT.

Pemeriksaan membalik penukarannya dengan \`strtr($bagian, '-_', '+/')\` sebelum \`base64_decode\` — yang tetap bisa membaca teks tanpa pengisi di ujungnya.

**\`hash_hmac\`, bukan \`hash\`.**

Kenapa tidak cukup \`hash('sha256', $rahasia . $bagian)\`? Karena menyatukan rahasia dan pesan lalu meng-hash-nya punya kelemahan yang sudah dikenal pada SHA-256: penyerang yang tahu hash suatu pesan bisa menghitung hash yang sah untuk pesan itu **ditambah** data lain di ujungnya, tanpa tahu rahasianya. Serangan ini disebut *length extension*.

HMAC dirancang khusus untuk menutup kelemahan itu: rahasia dicampur dua kali, di dalam dan di luar. Aturannya sederhana — untuk tanda tangan dengan rahasia, pakai fungsi HMAC, jangan merakit sendiri.

Argumen keempat \`true\` meminta hasil biner mentah 32 byte, bukan 64 huruf heksadesimal. Hasil biner itu yang lalu dikodekan base64url — lebih pendek.

**Urutan pemeriksaan: tanda tangan dulu, isi kemudian.**

Perhatikan bahwa \`json_decode\` baru dipanggil **setelah** tanda tangannya terbukti cocok. Sebelum itu, isinya adalah data yang bisa ditulis siapa pun, dan tidak boleh dipakai untuk keputusan apa pun — termasuk untuk memilih cara memeriksanya.

Kalimat terakhir itu bukan teori. Beberapa pustaka JWT generasi awal membaca algoritme dari kepala token **sebelum** memeriksa tanda tangannya, lalu memakai algoritme itu. Penyerang cukup menulis \`"alg":"none"\` di kepala, dan sebagian pustaka menerima token tanpa tanda tangan sama sekali. Pelajarannya: algoritme ditentukan peladen, bukan dibaca dari token.

**\`hash_equals\`, bukan \`===\`.**

Perbandingan teks biasa berhenti di huruf pertama yang berbeda. Tanda tangan yang salah di huruf pertama ditolak sedikit lebih cepat daripada yang salah di huruf kedua puluh.

Selisihnya cuma nanodetik, tetapi dengan cukup banyak percobaan dan pengukuran, penyerang bisa menebak tanda tangan yang benar huruf demi huruf. \`hash_equals\` selalu membandingkan seluruh teks, sehingga waktunya tidak bergantung pada letak perbedaannya.

**Kedaluwarsa diperiksa terakhir, tetapi ditandatangani sejak awal.**

Waktu kedaluwarsa adalah bagian dari isi, jadi ikut dilindungi tanda tangan. Pemegang token yang mengubah 1900 menjadi 99999 mengubah isinya — dan tanda tangannya tidak cocok lagi, persis seperti mengubah peran menjadi admin.`
    },
    {
      bahasa: 'php',
      kode: String.raw`$DAFTAR_CABUT[hash('sha256', $token)] = true;     // saat keluar

function periksa_dengan_cabut($token, $rahasia, $sekarang, $cabut) {
    if (isset($cabut[hash('sha256', $token)])) {
        return [null, 'token sudah dicabut'];
    }
    return periksa_token($token, $rahasia, $sekarang);
}
// 5 menit setelah keluar, salinan token yang sama dikirim:
//   periksa_token         -> sah
//   periksa_dengan_cabut  -> token sudah dicabut`,
      penjelasan: `Tujuh baris yang menyelesaikan masalah terbesar token — dengan harga yang membuat sebagian orang mempertanyakan kenapa memakai token sejak awal.

**Masalahnya.**

Token dirancang supaya peladen tidak perlu mengingat apa pun. Semua keterangan ada di token, dan tanda tangannya cukup untuk memercayainya.

Tetapi "tidak mengingat apa pun" juga berarti "tidak bisa lupa". Setelah token dibuat, peladen tidak punya cara menyatakannya tidak berlaku lagi — tidak saat pengguna keluar, tidak saat kata sandinya diganti, tidak saat tokennya diketahui tercuri. Token itu sah sampai waktu kedaluwarsanya tiba.

**Daftar cabut membalikkan itu.**

Saat pengguna keluar, hash tokennya dimasukkan ke daftar. Setiap pemeriksaan melihat daftar itu **sebelum** memeriksa tanda tangan. Token yang ada di daftar ditolak, secantik apa pun tanda tangannya.

Kenapa hash tokennya, bukan tokennya sendiri? Karena daftar ini disimpan — di basis data, di Redis, di mana pun — dan kalau daftar itu bocor, token di dalamnya belum kedaluwarsa. Menyimpan hash-nya berarti daftar yang bocor tidak bisa dipakai untuk masuk.

**Dan harganya.**

Daftar cabut adalah **keadaan** yang harus disimpan dan diperiksa di **setiap** permintaan. Kalau ada lima layanan yang memeriksa token, kelimanya harus bisa membaca daftar yang sama.

Itu persis kebutuhan sesi — simpanan bersama yang dibaca setiap permintaan. Keunggulan utama token, peladen yang tidak perlu mengingat, sebagian besar hilang.

**Jalan tengahnya: dua jenis token.**

Token **akses** berumur pendek — beberapa menit — dan **tidak** diperiksa ke daftar mana pun. Kalau tercuri, kerugiannya dibatasi oleh umurnya.

Token **penyegar** berumur panjang, dipakai cuma untuk meminta token akses baru, dan **disimpan di peladen**. Saat pengguna keluar, token penyegarnya dihapus. Paling lama beberapa menit kemudian, token aksesnya kedaluwarsa, dan tidak bisa diperbarui lagi.

Daftar yang diperiksa sekarang cuma disentuh setiap beberapa menit sekali per pengguna, bukan di setiap permintaan. Itu kompromi yang dipakai kebanyakan sistem yang memakai token.

**Pelajaran yang lebih besar.**

Setiap cara autentikasi harus menjawab pertanyaan "bagaimana kalau aksesnya harus dihentikan **sekarang**?" — karena pengguna keluar, karena perangkatnya hilang, karena akunnya diblokir. Sesi menjawabnya dengan satu baris \`unset\`. Token menjawabnya dengan tujuh baris ini ditambah simpanan bersama. Kalau jawaban itu belum ada di rancanganmu, rancangannya belum selesai.`
    }
  ],

  kode: { php: String.raw`<?php
// ============================================
// Autentikasi: sesi di peladen vs token bertanda tangan
// ============================================

// --------------------------------------------
// 1. Sesi: peladen yang mengingat
// --------------------------------------------
echo "--- sesi: peladen menyimpan siapa yang masuk ---\n";
$SESI = [];                                  // penyimpanan di peladen

function masuk_sesi(&$SESI, $pengguna) {
    $id = bin2hex(random_bytes(16));         // 128 bit acak
    $SESI[$id] = ['pengguna' => $pengguna, 'mulai' => 1000];
    return $id;                              // dikirim sebagai cookie
}
function siapa_sesi($SESI, $id) {
    return $SESI[$id]['pengguna'] ?? null;
}

$cookie = masuk_sesi($SESI, 'andi');
echo "  cookie yang diterima peramban : " . substr($cookie, 0, 16) . "...\n";
echo "  panjang id sesi               : " . strlen($cookie) * 4 . " bit\n";
echo "  permintaan dengan cookie itu  : " . siapa_sesi($SESI, $cookie) . "\n";
unset($SESI[$cookie]);                       // keluar
echo "  setelah keluar                : "
     . (siapa_sesi($SESI, $cookie) ?? '(tidak dikenal)') . "\n";
echo "\n";
echo "  Cookie-nya cuma nomor antrean acak. Siapa pemiliknya,\n";
echo "  apa haknya, kapan ia masuk -- semuanya disimpan di\n";
echo "  PELADEN. Keluar cukup dengan menghapus satu baris.\n";

// --------------------------------------------
// 2. Token bertanda tangan: peladen yang tidak perlu mengingat
// --------------------------------------------
echo "\n--- token bertanda tangan (HMAC) ---\n";
$RAHASIA = 'kunci-rahasia-peladen-jangan-dibagikan';

function b64u($s) {
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}
function buat_token($isi, $rahasia) {
    $bagian = b64u(json_encode($isi));
    $tanda = b64u(hash_hmac('sha256', $bagian, $rahasia, true));
    return $bagian . '.' . $tanda;
}
function periksa_token($token, $rahasia, $sekarang) {
    $pisah = explode('.', $token);
    if (count($pisah) !== 2) {
        return [null, 'bentuk token salah'];
    }
    [$bagian, $tanda] = $pisah;
    $seharusnya = b64u(hash_hmac('sha256', $bagian, $rahasia, true));
    if (!hash_equals($seharusnya, $tanda)) {
        return [null, 'TANDA TANGAN TIDAK COCOK'];
    }
    $isi = json_decode(base64_decode(strtr($bagian, '-_', '+/')), true);
    if ($isi['kedaluwarsa'] < $sekarang) {
        return [null, 'token sudah kedaluwarsa'];
    }
    return [$isi, 'sah'];
}

$SEKARANG = 1000;
$token = buat_token(['pengguna' => 'andi', 'peran' => 'mahasiswa',
                     'kedaluwarsa' => $SEKARANG + 900], $RAHASIA);
[$bagian, $tanda] = explode('.', $token);
echo "  isi (base64url)  : " . substr($bagian, 0, 40) . "...\n";
echo "  isi terbaca      :\n    " . base64_decode(strtr($bagian, '-_', '+/')) . "\n";
echo "  tanda tangan     : " . substr($tanda, 0, 24) . "...\n";
[$isi, $status] = periksa_token($token, $RAHASIA, $SEKARANG);
echo "  hasil periksa    : $status, pengguna = " . $isi['pengguna'] . "\n";
echo "\n";
echo "  Perhatikan baris kedua: isi token BISA DIBACA siapa pun.\n";
echo "  Base64 bukan enkripsi. Tanda tangan tidak menyembunyikan\n";
echo "  apa pun -- ia cuma membuktikan isinya tidak diubah.\n";
echo "  Jadi jangan pernah menaruh rahasia di dalam token.\n";

// --------------------------------------------
// 3. Mengubah isi token: ketahuan
// --------------------------------------------
echo "\n--- isi token diubah pemegangnya ---\n";
$isi_ubah = ['pengguna' => 'andi', 'peran' => 'admin',
             'kedaluwarsa' => $SEKARANG + 900];
$token_ubah = b64u(json_encode($isi_ubah)) . '.' . $tanda;   // tanda lama
[$x, $status] = periksa_token($token_ubah, $RAHASIA, $SEKARANG);
echo "  'peran' diganti dari mahasiswa ke admin\n";
echo "  tanda tangan lama dipakai ulang\n";
echo "  hasil periksa    : $status\n";
echo "\n";
echo "  Tanda tangan dihitung dari isi DAN rahasia peladen.\n";
echo "  Mengubah satu huruf isi membuat tanda tangannya tidak\n";
echo "  cocok lagi, dan membuat tanda tangan baru butuh rahasia\n";
echo "  yang cuma ada di peladen.\n";

// --------------------------------------------
// 4. Kedaluwarsa
// --------------------------------------------
echo "\n--- kedaluwarsa ---\n";
foreach ([$SEKARANG + 60, $SEKARANG + 899, $SEKARANG + 901] as $t) {
    [$x, $status] = periksa_token($token, $RAHASIA, $t);
    printf("  %4d detik kemudian : %s\n", $t - $SEKARANG, $status);
}
echo "\n";
echo "  Waktu kedaluwarsa ada DI DALAM token dan ikut\n";
echo "  ditandatangani, jadi pemegang token tidak bisa\n";
echo "  memperpanjangnya sendiri.\n";

// --------------------------------------------
// 5. Kelemahan token: tidak bisa ditarik kembali
// --------------------------------------------
echo "\n--- 'keluar' dengan token ---\n";
echo "  Andi menekan tombol keluar. Aplikasi menghapus token\n";
echo "  dari perambannya. Tetapi salinan token yang sama --\n";
echo "  misalnya yang tersimpan di perangkat lain -- dikirim\n";
echo "  lagi 5 menit kemudian:\n\n";
[$x, $status] = periksa_token($token, $RAHASIA, $SEKARANG + 300);
echo "  hasil periksa    : $status\n";
echo "\n";
echo "  Token itu MASIH SAH. Peladen tidak mengingat apa pun,\n";
echo "  jadi ia tidak punya cara tahu bahwa pemiliknya sudah\n";
echo "  keluar. Token berlaku sampai kedaluwarsa.\n";

$DAFTAR_CABUT = [];
$DAFTAR_CABUT[hash('sha256', $token)] = true;
function periksa_dengan_cabut($token, $rahasia, $sekarang, $cabut) {
    if (isset($cabut[hash('sha256', $token)])) {
        return [null, 'token sudah dicabut'];
    }
    return periksa_token($token, $rahasia, $sekarang);
}
[$x, $status] = periksa_dengan_cabut($token, $RAHASIA, $SEKARANG + 300,
                                     $DAFTAR_CABUT);
echo "\n  dengan daftar cabut : $status\n";
echo "\n";
echo "  Daftar cabut menyelesaikannya -- tetapi daftar itu\n";
echo "  adalah KEADAAN yang harus disimpan dan diperiksa di\n";
echo "  setiap permintaan. Artinya keunggulan utama token,\n";
echo "  peladen yang tidak perlu mengingat, sebagian hilang.\n";
echo "\n";
echo "  Jalan tengah yang lazim: token akses berumur pendek\n";
echo "  (beberapa menit), ditambah token penyegar berumur\n";
echo "  panjang yang disimpan dan bisa dicabut di peladen.\n";

// --------------------------------------------
// 6. Perbandingan
// --------------------------------------------
echo "\n--- sesi vs token ---\n";
$BANDING = [
    ["Disimpan di", "peladen", "pemegang token"],
    ["Keluar seketika", "YA, hapus baris", "tidak, tunggu habis"],
    ["Banyak peladen", "perlu simpanan bersama", "cukup rahasia sama"],
    ["Klien bisa baca isi", "tidak", "YA (tak dienkripsi)"],
    ["Cocok untuk", "aplikasi web biasa", "API antarlayanan"],
];
printf("  %-20s %-24s %s\n", "", "sesi", "token");
foreach ($BANDING as [$a, $b, $c]) {
    printf("  %-20s %-24s %s\n", $a, $b, $c);
}
echo "\n";
echo "  Untuk aplikasi web biasa dengan satu peladen, sesi\n";
echo "  hampir selalu pilihan yang lebih sederhana dan lebih\n";
echo "  aman. Token masuk akal ketika banyak layanan harus\n";
echo "  memeriksa identitas tanpa bertanya ke satu pusat.\n";

// --------------------------------------------
// 7. Cookie yang membawa sesi atau token
// --------------------------------------------
echo "\n--- atribut cookie yang wajib ---\n";
$ATRIBUT = [
    ["HttpOnly", "JavaScript halaman tidak bisa membacanya"],
    ["Secure", "cuma dikirim lewat HTTPS"],
    ["SameSite=Lax", "tak ikut di sebagian besar akses lintas situs"],
    ["Max-Age / Expires", "berakhir sendiri, tidak selamanya"],
];
foreach ($ATRIBUT as [$a, $b]) {
    printf("  %-19s %s\n", $a, $b);
}
echo "\n";
echo "  Contoh di PHP:\n";
echo "  setcookie('sesi', \$id, ['httponly' => true,\n";
echo "      'secure' => true, 'samesite' => 'Lax',\n";
echo "      'expires' => time() + 3600, 'path' => '/']);\n";
echo "\n";
echo "  HttpOnly yang paling sering terlupa, dan paling besar\n";
echo "  artinya: kalau ada satu celah XSS di aplikasi, cookie\n";
echo "  tanpa HttpOnly bisa dibaca skrip dan dibawa keluar.\n";` },
  output: `--- sesi: peladen menyimpan siapa yang masuk ---
  cookie yang diterima peramban : 2bb0a26564a2a90c...
  panjang id sesi               : 128 bit
  permintaan dengan cookie itu  : andi
  setelah keluar                : (tidak dikenal)

  Cookie-nya cuma nomor antrean acak. Siapa pemiliknya,
  apa haknya, kapan ia masuk -- semuanya disimpan di
  PELADEN. Keluar cukup dengan menghapus satu baris.

--- token bertanda tangan (HMAC) ---
  isi (base64url)  : eyJwZW5nZ3VuYSI6ImFuZGkiLCJwZXJhbiI6Im1h...
  isi terbaca      :
    {"pengguna":"andi","peran":"mahasiswa","kedaluwarsa":1900}
  tanda tangan     : 5tn_ZoUdfV1FNVvLaEoJbaZj...
  hasil periksa    : sah, pengguna = andi

  Perhatikan baris kedua: isi token BISA DIBACA siapa pun.
  Base64 bukan enkripsi. Tanda tangan tidak menyembunyikan
  apa pun -- ia cuma membuktikan isinya tidak diubah.
  Jadi jangan pernah menaruh rahasia di dalam token.

--- isi token diubah pemegangnya ---
  'peran' diganti dari mahasiswa ke admin
  tanda tangan lama dipakai ulang
  hasil periksa    : TANDA TANGAN TIDAK COCOK

  Tanda tangan dihitung dari isi DAN rahasia peladen.
  Mengubah satu huruf isi membuat tanda tangannya tidak
  cocok lagi, dan membuat tanda tangan baru butuh rahasia
  yang cuma ada di peladen.

--- kedaluwarsa ---
    60 detik kemudian : sah
   899 detik kemudian : sah
   901 detik kemudian : token sudah kedaluwarsa

  Waktu kedaluwarsa ada DI DALAM token dan ikut
  ditandatangani, jadi pemegang token tidak bisa
  memperpanjangnya sendiri.

--- 'keluar' dengan token ---
  Andi menekan tombol keluar. Aplikasi menghapus token
  dari perambannya. Tetapi salinan token yang sama --
  misalnya yang tersimpan di perangkat lain -- dikirim
  lagi 5 menit kemudian:

  hasil periksa    : sah

  Token itu MASIH SAH. Peladen tidak mengingat apa pun,
  jadi ia tidak punya cara tahu bahwa pemiliknya sudah
  keluar. Token berlaku sampai kedaluwarsa.

  dengan daftar cabut : token sudah dicabut

  Daftar cabut menyelesaikannya -- tetapi daftar itu
  adalah KEADAAN yang harus disimpan dan diperiksa di
  setiap permintaan. Artinya keunggulan utama token,
  peladen yang tidak perlu mengingat, sebagian hilang.

  Jalan tengah yang lazim: token akses berumur pendek
  (beberapa menit), ditambah token penyegar berumur
  panjang yang disimpan dan bisa dicabut di peladen.

--- sesi vs token ---
                       sesi                     token
  Disimpan di          peladen                  pemegang token
  Keluar seketika      YA, hapus baris          tidak, tunggu habis
  Banyak peladen       perlu simpanan bersama   cukup rahasia sama
  Klien bisa baca isi  tidak                    YA (tak dienkripsi)
  Cocok untuk          aplikasi web biasa       API antarlayanan

  Untuk aplikasi web biasa dengan satu peladen, sesi
  hampir selalu pilihan yang lebih sederhana dan lebih
  aman. Token masuk akal ketika banyak layanan harus
  memeriksa identitas tanpa bertanya ke satu pusat.

--- atribut cookie yang wajib ---
  HttpOnly            JavaScript halaman tidak bisa membacanya
  Secure              cuma dikirim lewat HTTPS
  SameSite=Lax        tak ikut di sebagian besar akses lintas situs
  Max-Age / Expires   berakhir sendiri, tidak selamanya

  Contoh di PHP:
  setcookie('sesi', $id, ['httponly' => true,
      'secure' => true, 'samesite' => 'Lax',
      'expires' => time() + 3600, 'path' => '/']);

  HttpOnly yang paling sering terlupa, dan paling besar
  artinya: kalau ada satu celah XSS di aplikasi, cookie
  tanpa HttpOnly bisa dibaca skrip dan dibawa keluar.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Periksa sesi', waktu: 'O(1)', memori: 'satu pencarian di simpanan sesi per permintaan' },
      { operasi: 'Keluar dengan sesi', waktu: 'O(1)', memori: 'hapus satu catatan' },
      { operasi: 'Buat atau periksa token HMAC', waktu: 'O(m)', memori: 'm = panjang isi token; tanpa simpanan di peladen' },
      { operasi: 'Periksa token dengan daftar cabut', waktu: 'O(m) + O(1)', memori: 'simpanan daftar cabut dibaca setiap permintaan' },
      { operasi: 'Simpanan sesi untuk u pengguna aktif', waktu: '—', memori: 'O(u) di peladen' }
    ],
    intuisi: `Secara komputasi, kedua cara sama-sama murah. Satu HMAC-SHA256 atas beberapa puluh byte berlangsung dalam hitungan mikrodetik, dan satu pencarian sesi juga.

Perbedaannya bukan di waktu hitung, melainkan di **di mana keadaannya disimpan**. Sesi menyimpan O(u) catatan di peladen — kecil untuk proyek kuliah, dan untuk satu peladen cukup disimpan di berkas atau memori. Tantangannya muncul saat ada banyak peladen: semuanya harus membaca simpanan sesi yang sama, biasanya basis data atau Redis, dan setiap permintaan menempuh perjalanan ke sana.

Token menghapus perjalanan itu — sampai kamu butuh mencabut token, dan daftar cabut mengembalikannya. Karena itu pilihannya jarang soal kecepatan. Pilihannya soal arsitektur: berapa peladen yang harus mengenali pengguna, dan seberapa cepat akses harus bisa dihentikan.`
  },

  kesalahanUmum: [
    {
      salah: 'Menaruh data rahasia di dalam token karena tokennya ditandatangani.',
      kenapa: 'Tanda tangan hanya membuktikan isi tidak diubah. Isi token cuma dikodekan base64, dan bisa dibaca siapa pun yang memegangnya tanpa rahasia apa pun.',
      benar: 'Isi token hanya dengan keterangan yang boleh dilihat pemegangnya, seperti id pengguna, peran, dan waktu kedaluwarsa.'
    },
    {
      salah: 'Membaca isi token lebih dulu, lalu memeriksa tanda tangan belakangan atau memakai algoritme yang tertulis di token.',
      kenapa: 'Sebelum tanda tangannya terbukti, isi token adalah data yang bisa ditulis siapa pun. Beberapa pustaka JWT generasi awal menerima token dengan algoritme none di kepalanya karena memercayai kepala itu.',
      benar: 'Tentukan algoritme di peladen, periksa tanda tangan lebih dulu, dan baru pakai isinya setelah cocok.'
    },
    {
      salah: 'Membuat tanda tangan dengan hash dari rahasia yang disatukan dengan pesan.',
      kenapa: 'Pada SHA-256, susunan seperti itu rentan terhadap serangan length extension yang memungkinkan penyerang membuat tanda tangan sah untuk pesan yang diperpanjang tanpa tahu rahasianya.',
      benar: 'Pakai hash_hmac, yang dirancang untuk tanda tangan dengan rahasia.'
    },
    {
      salah: 'Membandingkan tanda tangan dengan == atau ===.',
      kenapa: 'Perbandingan biasa berhenti di huruf pertama yang berbeda, sehingga waktunya membocorkan berapa huruf awal yang sudah benar. Dengan cukup banyak pengukuran, tanda tangan bisa ditebak huruf demi huruf.',
      benar: 'Pakai hash_equals, yang waktunya tidak bergantung pada letak perbedaan.'
    },
    {
      salah: 'Menganggap tombol keluar sudah membatalkan token.',
      kenapa: 'Keluar di aplikasi cuma menghapus salinan token di perangkat itu. Salinan lain, termasuk yang tercuri, tetap sah sampai kedaluwarsa karena peladen tidak mengingat token yang pernah dibuatnya.',
      benar: 'Pakai token akses berumur pendek, token penyegar yang disimpan dan bisa dicabut di peladen, atau daftar cabut bila akses harus berhenti seketika.'
    },
    {
      salah: 'Tidak mengganti id sesi setelah pengguna berhasil masuk.',
      kenapa: 'Penyerang yang berhasil menanamkan id sesi tertentu ke peramban korban sebelum korban masuk bisa ikut memakai sesi itu setelah korban masuk.',
      benar: 'Panggil session_regenerate_id(true) tepat setelah kata sandi terbukti benar, dan aktifkan session.use_strict_mode.'
    },
    {
      salah: 'Membiarkan cookie sesi tanpa HttpOnly, Secure, dan SameSite.',
      kenapa: 'Tanpa HttpOnly, satu celah XSS cukup untuk membaca cookie sesi dan membawanya keluar. Tanpa Secure, cookie bisa terkirim lewat HTTP biasa. Tanpa SameSite, cookie ikut di permintaan dari situs lain dan membuka jalan CSRF.',
      benar: 'Setel ketiganya lewat session_set_cookie_params sebelum session_start, lalu periksa hasilnya di alat pengembang peramban.'
    },
    {
      salah: 'Menulis rahasia penandatanganan langsung di kode yang ikut masuk repo.',
      kenapa: 'Siapa pun yang membaca repo bisa membuat token sah untuk pengguna mana pun dengan peran apa pun. Menghapusnya belakangan tidak cukup, karena rahasianya tetap ada di riwayat git.',
      benar: 'Simpan rahasia di variabel lingkungan atau berkas konfigurasi yang dikecualikan dari repo, dan ganti rahasianya bila pernah ter-commit.'
    }
  ],

  analogi: `Bayangkan dua cara masuk ke **gedung kampus** setelah satpam memeriksa kartu mahasiswamu sekali di pagi hari.

**Cara pertama: nomor loker.** Satpam mencatat di bukunya *"nomor 4172 — Andi, mahasiswa, masuk jam 07.15"*, lalu memberimu kartu kecil bertuliskan **4172** saja. Setiap kali kamu melewati pintu mana pun, satpam di pintu itu melihat nomormu dan mencocokkannya ke buku.

Kartunya sendiri tidak berarti apa-apa. Orang yang menemukannya tidak tahu siapa kamu. Dan kalau kamu pulang, satpam cukup mencoret baris 4172 — kartu itu langsung tidak berlaku, di pintu mana pun.

Masalahnya: kalau gedungnya punya dua puluh pintu dengan dua puluh satpam, mereka semua harus membaca **buku yang sama**.

**Cara kedua: surat jalan bercap.** Satpam menulis surat: *"Andi, mahasiswa, berlaku sampai 07.30"*, lalu membubuhkan **cap** yang cuma dimiliki kantor satpam. Satpam di pintu mana pun cukup memeriksa capnya — tidak perlu buku, tidak perlu bertanya ke pos pusat.

Siapa pun yang memegang surat itu bisa membaca isinya. Cap tidak menyembunyikan apa-apa; ia cuma membuktikan tulisannya asli.

Kalau kamu mencoret "mahasiswa" dan menulis "dosen", capnya tidak cocok lagi dengan tulisannya — dan kamu tidak punya cap kantor satpam untuk membuat yang baru. Kalau kamu mengubah "07.30" menjadi "23.00", hal yang sama terjadi.

**Tetapi surat jalan punya satu kelemahan.** Kamu pulang jam 07.20 dan membuang suratnya. Seseorang memungutnya dari tempat sampah. Sampai jam 07.30, surat itu **sah** — satpam di pintu tidak punya cara tahu bahwa kamu sudah pulang.

Kantor satpam bisa mengedarkan daftar "surat yang sudah dibatalkan" ke semua pintu. Tetapi sekarang setiap satpam harus memeriksa daftar itu setiap kali ada yang lewat — dan itu hampir sama dengan kembali ke buku bersama.

Jalan tengahnya: surat jalan yang berlaku cuma **lima belas menit**, dan kalau habis, kamu ke pos pusat untuk minta yang baru. Pos pusat punya buku, dan kalau namamu sudah dicoret di sana, kamu tidak mendapat surat baru. Kerugian terburuk dari surat yang terbuang cuma lima belas menit.`,

  latihan: [
    'Jelaskan kenapa HTTP membutuhkan sesi atau token, padahal kata sandi sudah diperiksa saat masuk.',
    'Buat halaman masuk dengan sesi PHP yang memakai session_set_cookie_params, session_regenerate_id(true), dan session_destroy saat keluar.',
    'Periksa cookie sesi aplikasimu di alat pengembang peramban, lalu buktikan bahwa document.cookie tidak menampilkannya.',
    'Buat token HMAC untuk seorang pengguna, lalu dekode bagian isinya tanpa rahasia dan tunjukkan bahwa isinya terbaca.',
    'Ubah peran di dalam token menjadi admin dengan tanda tangan lama, lalu tunjukkan bahwa pemeriksaan menolaknya.',
    'Ubah waktu kedaluwarsa di dalam token menjadi jauh di masa depan, lalu jelaskan kenapa pemeriksaan tetap menolaknya.',
    'Jelaskan kenapa tanda tangan harus dibandingkan dengan hash_equals, bukan ===.',
    'Tunjukkan bahwa token masih sah setelah pengguna keluar, lalu tambahkan daftar cabut dan jelaskan apa yang hilang dari keunggulan token.',
    'Rancang pasangan token akses dan token penyegar: umur masing-masing, di mana disimpan, dan apa yang terjadi saat pengguna keluar.',
    'Untuk proyek web kelompokmu, tentukan apakah sesi atau token yang lebih cocok, dan jelaskan alasannya dengan tabel perbandingan di topik ini.'
  ]
});
