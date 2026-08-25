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
