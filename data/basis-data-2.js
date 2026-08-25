/* ============================================================
   basis-data-2.js — materi Basis Data II (Semester 2)

   Disusun dari berkas kuliah sendiri:
     - Procedure.txt          contoh procedure IN/OUT paling dasar
     - Syntax UAS.txt         procedure dengan validasi & RAISE_APPLICATION_ERROR
     - Tugas Procedure Kalkulator_*.docx   procedure bercabang IF/ELSIF
     - Oracle 10g Access.txt  alamat Oracle APEX yang dipakai di kelas
     - Tugas Basis Data II.docx  praktik SQL dasar di MariaDB

   Catatan: mata kuliah ini memakai DUA lingkungan. Tugas awal masih
   MariaDB lewat XAMPP (lanjutan Basis Data I), lalu berpindah ke
   Oracle lewat APEX untuk PL/SQL. Materi di sini fokus pada
   PL/SQL-nya, karena itu yang membedakannya dari Basis Data I.

   Topik yang bahannya ADA di berkas: blok anonim, procedure dengan
   parameter IN/OUT, percabangan IF/ELSIF, dan RAISE_APPLICATION_ERROR.
   Topik cursor dan function TIDAK ada di berkas dan disusun dari
   silabus PL/SQL baku — perlu dicocokkan kalau slide dosennya ketemu.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Kueri",
   mengikuti kebiasaan berkas basis-data.js.

   JANGAN memakai backtick di blok kode.
   ============================================================ */

TOPICS.push({
  id: 'bd2-plsql-dasar',
  judul: 'Pengantar PL/SQL & Blok Anonim',
  kategori: 'basis-data-2',
  tag: ['PL/SQL', 'blok anonim', 'DECLARE', 'BEGIN', 'DBMS_OUTPUT', 'Oracle'],
  ringkas: 'Menambahkan logika pemrograman ke dalam SQL — dan kenapa itu mengubah cara kerja basis data.',

  fungsi: `**Menjalankan logika langsung di dalam basis data, bukan di aplikasi.**

SQL biasa hanya bisa menyatakan *apa* yang diinginkan. PL/SQL menambahkan percabangan, perulangan, dan variabel — sehingga pekerjaan yang butuh banyak langkah bisa dilakukan **tanpa bolak-balik ke aplikasi**.

Terpakai di:

- **Pengolahan data massal** — memproses ribuan baris tanpa mengirimkannya ke aplikasi dan kembali
- **Aturan yang harus berlaku bagi semua** — berlaku meski data diubah lewat jalan lain
- **Migrasi data** — mengubah struktur sambil memindahkan isinya
- **Laporan rumit** yang butuh langkah bertahap

Keuntungan terbesarnya: **mengurangi perjalanan jaringan**. Seribu kueri dari aplikasi berarti seribu kali bolak-balik; satu blok PL/SQL cukup sekali.

Kerugiannya juga nyata: **logika jadi tersembunyi di basis data**, sulit diuji, dan sulit dilacak dengan Git kalau tidak disiplin.`,

  praktik: {
    tujuan: `Kamu bisa menjalankan blok PL/SQL, mencetak keluaran, dan mengambil nilai dari tabel ke variabel.`,
    alat: [
      'Oracle Database XE (gratis) atau Oracle Live SQL di peramban',
      'SQL Developer atau SQL*Plus'
    ],
    langkah: [
      { judul: 'Siapkan lingkungan tanpa memasang apa pun',
        isi: `Cara tercepat: buka **livesql.oracle.com**, daftar gratis, dan langsung bisa menjalankan PL/SQL di peramban.

Kalau ingin lokal, pasang **Oracle Database XE** — versi gratis yang cukup untuk semua materi ini.` },
      { judul: 'Nyalakan keluaran lebih dulu',
        isi: `Ini langkah yang paling sering dilupakan, dan membuat orang mengira kodenya tidak jalan.

Jalankan \`SET SERVEROUTPUT ON;\` sebelum apa pun.

Tanpa itu, \`DBMS_OUTPUT.PUT_LINE\` tidak menampilkan apa-apa — bloknya tetap berjalan, keluarannya saja yang tidak terlihat.` },
      { judul: 'Tulis blok anonim pertamamu',
        isi: `Strukturnya selalu tiga bagian:

- \`DECLARE\` untuk variabel
- \`BEGIN\` untuk perintahnya
- \`END;\` ditutup garis miring \`/\` di baris berikutnya

Garis miring itu yang **menyuruh menjalankan**. Tanpanya, blokmu cuma diketik dan tidak dieksekusi.` },
      { judul: 'Pakai tipe yang mengikuti kolom',
        isi: `Alih-alih \`v_nama VARCHAR2(100)\`, tulis \`v_nama mahasiswa.nama%TYPE\`.

Kalau nanti tipe kolomnya diubah, variabelmu **ikut menyesuaikan sendiri**.

Untuk satu baris utuh: \`v_mhs mahasiswa%ROWTYPE\`.` },
      { judul: 'Ambil nilai dengan SELECT INTO',
        isi: `\`SELECT nama INTO v_nama FROM mahasiswa WHERE nim = '...';\`

Perhatikan: perintah ini menuntut **tepat satu baris**.

Nol baris melempar \`NO_DATA_FOUND\`, lebih dari satu melempar \`TOO_MANY_ROWS\`. Keduanya harus ditangani, dan itu topik exception nanti.` },
      { judul: 'Simpan skripmu di Git',
        isi: `Kelemahan terbesar logika di basis data adalah **tidak terlihat di kode aplikasi**.

Lawan itu dengan menyimpan setiap prosedur dan trigger sebagai berkas \`.sql\` di repositori, sama seperti kode lainnya.

Tanpa ini, tidak ada yang tahu apa yang berubah dan kapan.` }
    ],
    cek: [
      'Blok anonim pertamamu mencetak teks lewat DBMS_OUTPUT',
      'Variabel bertipe %TYPE-mu tetap benar setelah kamu ubah tipe kolomnya',
      'Semua skrip PL/SQL-mu tersimpan sebagai berkas di repositori'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
SQL biasa bersifat **deklaratif**: kamu menyatakan **apa** yang diinginkan, bukan **bagaimana** mendapatkannya. \`SELECT nama FROM mahasiswa WHERE ipk > 3\` tidak menyebutkan cara mencarinya — DBMS yang memutuskan.

Kekuatan itu juga batasnya. SQL biasa **tidak punya** variabel, percabangan, atau perulangan. Kamu tidak bisa menulis *"kalau usianya di bawah 17, tolak; kalau tidak, simpan"* dalam satu perintah SQL.

**PL/SQL** (*Procedural Language extension to SQL*) menambal lubang itu. Ia menambahkan unsur bahasa pemrograman ke dalam SQL: variabel, IF, LOOP, exception, dan subprogram.

**Kenapa tidak dikerjakan di aplikasi saja?**

Pertanyaan yang wajar, dan jawabannya menjelaskan seluruh mata kuliah ini.

Bayangkan kamu perlu memproses 10.000 baris dengan aturan bercabang. Kalau logikanya di aplikasi:

- Aplikasi minta data → **kirim lewat jaringan**
- Aplikasi olah → putuskan
- Aplikasi kirim perintah balik → **kirim lewat jaringan lagi**

Bolak-baliknya 10.000 kali. Dengan PL/SQL, seluruh logika berjalan **di dalam server basis data**, tanpa satu pun perjalanan jaringan.

Alasan kedua yang tak kalah penting: **aturan yang ditegakkan di basis data berlaku untuk semua**. Kalau validasi umur cuma ada di aplikasi web, orang yang menyisipkan data lewat aplikasi lain atau langsung lewat SQL bisa melewatinya begitu saja.

**Struktur blok**

Semua PL/SQL berbentuk **blok**, dan bentuknya selalu sama:

- **\`DECLARE\`** — mendeklarasikan variabel. **Opsional.**
- **\`BEGIN\`** — awal bagian yang dijalankan. **Wajib.**
- **\`EXCEPTION\`** — penanganan kesalahan. **Opsional.**
- **\`END;\`** — penutup. **Wajib.**

Blok tanpa nama disebut **blok anonim** — dijalankan sekali lalu hilang, tidak tersimpan di basis data. Kalau diberi nama dan disimpan, ia menjadi **procedure** atau **function**.

**Menampilkan keluaran**

\`DBMS_OUTPUT.PUT_LINE('teks')\` adalah cara mencetak dari PL/SQL. Perhatikan satu jebakan besar: **keluarannya tidak muncul** kecuali penyangganya dinyalakan lebih dulu dengan \`SET SERVEROUTPUT ON\`. Di Oracle APEX yang dipakai di kelas, ini biasanya sudah aktif.

**Operator penugasan berbeda dari SQL**

Di PL/SQL, memberi nilai memakai **\`:=\`**, bukan \`=\`. Tanda \`=\` tetap dipakai untuk **membandingkan**. Ini kebalikan dari kebiasaan SQL biasa dan sumber kesalahan yang sering terjadi.

**Penutup garis miring**

Setiap blok diakhiri \`END;\` lalu baris berisi **\`/\`** sendirian. Garis miring itu bukan bagian PL/SQL — ia perintah bagi klien Oracle yang artinya *"kirim blok ini sekarang"*, mirip peran \`DELIMITER\` pada MySQL.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'DECLARE\n  hsl INT;\nBEGIN\n  hsl := 10 + 20;\n  DBMS_OUTPUT.PUT_LINE(\'hasil = \' || hsl);\nEND;\n/',
      penjelasan: `
Inilah bentuk blok anonim paling sederhana, dan tiap barisnya punya alasan.

**\`DECLARE\`** membuka bagian deklarasi. Semua variabel harus diumumkan di sini, **sebelum** \`BEGIN\` — tidak seperti Python atau JavaScript yang membolehkan variabel muncul di tengah jalan. Kalau bloknya tidak butuh variabel, seluruh bagian \`DECLARE\` boleh dihilangkan.

**\`hsl INT;\`** — perhatikan urutannya: **nama dulu, baru tipe**. Ini kebalikan dari C dan Java. Kalau kamu terbiasa menulis \`int hsl\`, urutan ini butuh penyesuaian.

**\`hsl := 10 + 20;\`** — inilah operator penugasan PL/SQL. **Titik dua sebelum sama dengan.** Menulis \`hsl = 10 + 20;\` akan ditolak, karena \`=\` di PL/SQL berarti perbandingan, bukan pemberian nilai. Kesalahan ini sangat sering terjadi pada minggu-minggu pertama.

**\`||\`** adalah operator **penyambung teks** di Oracle, bukan "atau" seperti di C atau JavaScript. Jadi \`'hasil = ' || hsl\` menghasilkan \`"hasil = 30"\`. Perhatikan juga bahwa angka \`hsl\` **otomatis diubah** menjadi teks saat disambung — Oracle melakukannya sendiri.

**\`END;\`** menutup blok, lengkap dengan titik koma.

**\`/\`** di baris tersendiri adalah perintah untuk klien Oracle, bukan bagian bahasa. Artinya *"kirim dan jalankan blok yang barusan"*. Tanpa garis miring ini, klien mengira kamu masih mengetik dan tidak menjalankan apa pun — persis kebingungan yang muncul saat lupa \`DELIMITER\` di MySQL.
`
    },
    {
      bahasa: 'sql',
      kode: '-- SQL biasa: deklaratif, tidak bisa bercabang\nSELECT nama FROM mahasiswa WHERE usia >= 17;\n\n-- PL/SQL: prosedural, bisa memutuskan\nDECLARE\n  v_usia NUMBER := 16;\nBEGIN\n  IF v_usia < 17 THEN\n    DBMS_OUTPUT.PUT_LINE(\'Ditolak: di bawah 17 tahun\');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE(\'Diterima\');\n  END IF;\nEND;\n/',
      penjelasan: `
Perbandingan ini memperlihatkan apa yang sebenarnya ditambahkan PL/SQL.

Perintah \`SELECT\` di atas **menyaring**, tetapi tidak bisa **memutuskan tindakan berbeda** untuk kasus berbeda. Ia mengembalikan baris yang cocok, titik. Tidak ada tempat untuk menulis *"kalau begini, lakukan A; kalau begitu, lakukan B"*.

Blok PL/SQL bisa. Dan perhatikan bahwa keduanya **bukan pengganti satu sama lain** — PL/SQL justru **membungkus** SQL. Di dalam blok, kamu tetap menulis \`SELECT\`, \`INSERT\`, dan \`UPDATE\` seperti biasa; yang ditambahkan hanya kemampuan mengatur alurnya.

Perhatikan **\`v_usia NUMBER := 16;\`** — deklarasi dan pemberian nilai awal dilakukan sekaligus. Awalan **\`v_\`** adalah kebiasaan penamaan yang layak ditiru, dan bukan sekadar gaya: ia mencegah **bentrok nama** antara variabel PL/SQL dan nama kolom tabel.

Bayangkan tabel punya kolom bernama \`usia\`, lalu kamu menulis:

\`SELECT * FROM mahasiswa WHERE usia = usia;\`

Oracle akan membaca **kedua** \`usia\` sebagai nama kolom, sehingga syaratnya selalu benar dan **seluruh baris** terjaring. Tidak ada pesan error — hanya hasil yang salah diam-diam. Dengan menulis \`WHERE usia = v_usia\`, kebingungan itu hilang.

Perhatikan juga **\`END IF;\`** yang menutup percabangan, terpisah dari \`END;\` yang menutup blok. PL/SQL menutup setiap struktur secara eksplisit: \`END IF\`, \`END LOOP\`, \`END CASE\`. Lupa salah satu menghasilkan error yang menunjuk baris terakhir, jauh dari letak kesalahannya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Blok anonim PL/SQL: dari yang paling sederhana
-- ============================================

-- Nyalakan penyangga keluaran dulu, kalau belum
SET SERVEROUTPUT ON;

-- ---------- 1. Blok paling minimal ----------
BEGIN
  DBMS_OUTPUT.PUT_LINE('Halo dari PL/SQL');
END;
/

-- ---------- 2. Dengan variabel ----------
DECLARE
  hsl INT;
BEGIN
  hsl := 10 + 20;
  DBMS_OUTPUT.PUT_LINE('hasil = ' || hsl);
END;
/

-- ---------- 3. Deklarasi lengkap ----------
DECLARE
  v_nim      VARCHAR2(10) := 'H1D024061';
  v_nama     VARCHAR2(50) := 'Hafizh';
  v_usia     NUMBER       := 19;
  v_lulus    BOOLEAN      := TRUE;
  v_daftar   DATE         := SYSDATE;
  v_konstan  CONSTANT NUMBER := 17;      -- tidak boleh diubah
BEGIN
  DBMS_OUTPUT.PUT_LINE(v_nim || ' - ' || v_nama);
  DBMS_OUTPUT.PUT_LINE('usia    : ' || v_usia);
  DBMS_OUTPUT.PUT_LINE('batas   : ' || v_konstan);

  -- BOOLEAN hanya ada di PL/SQL, tidak ada di tabel Oracle,
  -- dan tidak bisa disambung langsung ke teks
  IF v_lulus THEN
    DBMS_OUTPUT.PUT_LINE('status  : lulus');
  END IF;
END;
/

-- ---------- 4. Mengambil nilai dari tabel ke variabel ----------
DECLARE
  v_jumlah NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_jumlah FROM mahasiswa;
  DBMS_OUTPUT.PUT_LINE('jumlah mahasiswa = ' || v_jumlah);
END;
/

-- ---------- 5. Tipe yang mengikuti kolom tabel ----------
DECLARE
  -- %TYPE: ikut tipe kolom. Kalau kolomnya diubah,
  -- variabel ini ikut menyesuaikan sendiri.
  v_nama mahasiswa.nama%TYPE;

  -- %ROWTYPE: satu variabel menampung SATU BARIS utuh
  v_baris mahasiswa%ROWTYPE;
BEGIN
  SELECT nama INTO v_nama FROM mahasiswa WHERE nim = 'H1D024061';
  DBMS_OUTPUT.PUT_LINE('nama = ' || v_nama);

  SELECT * INTO v_baris FROM mahasiswa WHERE nim = 'H1D024061';
  DBMS_OUTPUT.PUT_LINE('jurusan = ' || v_baris.jurusan);
END;
/`
  },

  output: `Halo dari PL/SQL

hasil = 30

H1D024061 - Hafizh
usia    : 19
batas   : 17
status  : lulus

jumlah mahasiswa = 3

nama = Hafizh
jurusan = Informatika`,

  kesalahanUmum: [
    {
      salah: 'Memakai tanda sama dengan untuk memberi nilai, misalnya hsl = 10 + 20;',
      kenapa: 'Di PL/SQL, penugasan memakai titik dua sama dengan, sedangkan sama dengan tunggal berarti perbandingan. Oracle menolak dengan pesan sintaks yang tidak langsung menyebutkan operatornya, sehingga pemula sering mencari kesalahan di tempat lain. Kebiasaan ini terbawa dari SQL biasa di mana sama dengan dipakai pada UPDATE SET.',
      benar: 'Pakai := untuk memberi nilai, dan = hanya untuk membandingkan di dalam IF atau WHERE.'
    },
    {
      salah: 'Menamai variabel PL/SQL sama persis dengan nama kolom tabel.',
      kenapa: 'Kalau ada kolom bernama usia dan variabel bernama usia, maka WHERE usia = usia dibaca Oracle sebagai membandingkan kolom dengan dirinya sendiri, sehingga selalu benar dan seluruh baris terjaring. Tidak ada pesan error sama sekali, hanya hasil yang salah diam-diam, sehingga sangat sulit dilacak.',
      benar: 'Beri awalan pada variabel, misalnya v_usia untuk variabel dan p_usia untuk parameter. Kebiasaan ini menghilangkan seluruh kelas kesalahan tersebut.'
    },
    {
      salah: 'Lupa menuliskan garis miring di baris tersendiri setelah END;',
      kenapa: 'Garis miring adalah perintah bagi klien Oracle untuk mengirim dan menjalankan blok. Tanpanya, klien mengira kamu masih mengetik dan tidak menjalankan apa pun, sehingga tidak ada keluaran maupun pesan kesalahan. Kebingungan ini sama persis dengan lupa DELIMITER saat membuat trigger di MySQL.',
      benar: 'Akhiri setiap blok dengan END; lalu baris baru berisi garis miring sendirian, tanpa titik koma.'
    },
    {
      salah: 'Menjalankan DBMS_OUTPUT.PUT_LINE lalu mengira programnya gagal karena tidak ada keluaran.',
      kenapa: 'Keluaran DBMS_OUTPUT ditampung di penyangga yang harus dinyalakan lebih dulu dengan SET SERVEROUTPUT ON. Kalau penyangganya mati, bloknya tetap berjalan dengan benar tetapi tulisannya tidak pernah muncul, sehingga terlihat seperti tidak terjadi apa-apa.',
      benar: 'Jalankan SET SERVEROUTPUT ON sekali di awal sesi. Di Oracle APEX biasanya sudah aktif secara bawaan.'
    },
    {
      salah: 'Mendeklarasikan variabel di tengah bagian BEGIN.',
      kenapa: 'PL/SQL menuntut semua deklarasi berada di bagian DECLARE, sebelum BEGIN. Kebiasaan dari Python atau JavaScript yang membolehkan variabel muncul di mana saja membuat kesalahan ini sering terjadi, dan pesan errornya menunjuk ke baris deklarasi yang terlihat benar.',
      benar: 'Kumpulkan seluruh deklarasi di bagian DECLARE. Kalau butuh cakupan yang lebih sempit, buat blok bersarang dengan DECLARE sendiri di dalam BEGIN.'
    }
  ],

  analogi: `Bayangkan kamu memesan sesuatu di apotek.

**SQL biasa** adalah menyodorkan resep: *"berikan obat yang namanya begini"*. Apoteker mengambilnya. Selesai. Tidak ada percakapan, tidak ada keputusan.

Sekarang bayangkan aturannya lebih rumit: *"kalau pasiennya di bawah 17 tahun, tolak; kalau stoknya habis, tawarkan penggantinya; kalau resepnya lebih dari sebulan, minta resep baru"*.

Kamu **tidak bisa** menuliskan itu di secarik resep. Yang bisa menanganinya adalah **apoteker yang berpikir**, dan itulah **PL/SQL**.

Sekarang kenapa logikanya sebaiknya di apotek, bukan di rumahmu:

Kalau semua keputusan dibuat di rumah, kamu harus **bolak-balik**: tanya stok, pulang, putuskan, kembali, pesan. Untuk sepuluh ribu resep, itu sepuluh ribu perjalanan. Kalau apotekernya yang memutuskan, kamu cukup datang sekali. **Itulah alasan pertama PL/SQL ada.**

Dan alasan kedua yang lebih penting: kalau aturan *"tolak di bawah 17"* hanya kamu simpan di kepala, maka **orang lain yang membeli lewat pintu belakang tidak terkena aturan itu**. Kalau aturannya ditegakkan **di apoteknya sendiri**, semua orang tunduk padanya — lewat pintu mana pun mereka masuk.

Dan **garis miring** di akhir blok? Itu seperti **menekan tombol kirim**. Kamu boleh menulis resep sepanjang apa pun, tetapi apoteker tidak bergerak sebelum kamu menyerahkannya.`,

  latihan: [
    'Jelaskan perbedaan SQL yang deklaratif dan PL/SQL yang prosedural, lalu sebutkan dua alasan kenapa logika bisnis kadang lebih baik ditaruh di basis data daripada di aplikasi.',
    'Tuliskan blok anonim yang mendeklarasikan dua variabel angka, menjumlahkannya, lalu menampilkan hasilnya dengan DBMS_OUTPUT.',
    'Sebutkan empat bagian struktur blok PL/SQL, dan tandai mana yang wajib dan mana yang opsional.',
    'Jelaskan kenapa memberi awalan v_ pada variabel bukan sekadar soal kerapian. Beri satu contoh kueri yang memberi hasil salah diam-diam tanpa awalan itu.',
    'Jelaskan perbedaan %TYPE dan %ROWTYPE, lalu jelaskan keuntungan memakainya dibanding menuliskan tipe data secara langsung.'
  ]
});

TOPICS.push({
  id: 'bd2-procedure',
  judul: 'Stored Procedure & Parameter IN/OUT',
  kategori: 'basis-data-2',
  tag: ['procedure', 'IN', 'OUT', 'IN OUT', 'CREATE OR REPLACE', 'parameter'],
  ringkas: 'Blok PL/SQL yang diberi nama dan disimpan — beserta tiga cara parameter berpindah.',

  fungsi: `**Menyimpan sepotong logika di basis data dengan nama, supaya bisa dipanggil berulang oleh siapa pun.**

Terpakai di:

- **Operasi berulang** — pendaftaran, perhitungan, penutupan periode
- **Menyembunyikan kerumitan** — aplikasi cukup memanggil satu nama, tidak perlu tahu isinya
- **Keamanan** — beri hak menjalankan prosedur tanpa memberi hak akses langsung ke tabelnya
- **Kinerja** — kode sudah dikompilasi dan tersimpan, tidak diurai ulang tiap kali

Yang paling berguna dipahami adalah **arah parameternya**:

- \`IN\` — masuk saja, tidak bisa diubah
- \`OUT\` — keluar saja, nilai awalnya diabaikan
- \`IN OUT\` — masuk, diubah, lalu keluar

Salah memilih arah adalah kesalahan yang paling sering terjadi, dan pesan galatnya sering membingungkan.`,

  praktik: {
    tujuan: `Kamu punya prosedur yang bisa dipanggil dari aplikasi maupun dari blok lain, dengan parameter yang arahnya tepat.`,
    alat: [
      'Oracle XE atau Live SQL'
    ],
    langkah: [
      { judul: 'Tentukan arah tiap parameter lebih dulu',
        isi: `Sebelum menulis kode, tulis daftar parameternya beserta arahnya.

Pertanyaannya sederhana: *"apakah nilai ini dikirim masuk, dihasilkan keluar, atau keduanya?"*

Menjawabnya di awal mencegah sebagian besar kesalahan.` },
      { judul: 'Pakai CREATE OR REPLACE',
        isi: `Selalu tulis \`CREATE OR REPLACE PROCEDURE\`, bukan \`CREATE PROCEDURE\` saja.

Dengan begitu kamu bisa menjalankan ulang skripmu tanpa harus menghapusnya dulu — dan skripmu jadi bisa dijalankan berkali-kali dengan aman.` },
      { judul: 'Periksa galat kompilasi',
        isi: `Kalau muncul pesan *"created with compilation errors"*, prosedurnya **ada tetapi rusak**.

Jalankan \`SHOW ERRORS;\` di SQL*Plus untuk melihat rinciannya, atau kueri \`USER_ERRORS\`.

Tanpa langkah ini, kamu akan bingung kenapa prosedurmu gagal saat dipanggil.` },
      { judul: 'Panggil dengan tiga cara',
        isi: `- dari SQL*Plus: \`EXEC nama_prosedur(nilai);\`
- dari blok PL/SQL: \`BEGIN nama_prosedur(nilai); END;\`
- dari aplikasi: lewat \`CallableStatement\` di Java, atau \`cursor.callproc()\` di Python

Coba ketiganya. Yang ketiga yang benar-benar akan kamu pakai di proyek.` },
      { judul: 'Kembalikan nilai lewat OUT',
        isi: `Untuk menerima nilai \`OUT\`, siapkan variabel penampung dulu:

- \`DECLARE v_hasil NUMBER; BEGIN hitung_ipk('H1D024061', v_hasil); DBMS_OUTPUT.PUT_LINE(v_hasil); END;\`

Perhatikan bahwa variabelnya **tidak perlu diisi** sebelum dipanggil — itulah arti \`OUT\`.` },
      { judul: 'Kelompokkan dengan package',
        isi: `Kalau prosedurmu sudah lebih dari lima, kelompokkan dalam \`PACKAGE\`.

Package punya bagian **spesifikasi** yang terlihat dari luar, dan **body** yang tersembunyi.

Ini bentuk enkapsulasi yang sama dengan yang kamu pelajari di Pemrograman Berorientasi Objek.` }
    ],
    cek: [
      'Prosedurmu terkompilasi tanpa galat, diperiksa dengan SHOW ERRORS',
      'Nilai OUT-mu terbaca benar dari blok pemanggil',
      'Prosedurmu bisa dipanggil dari aplikasi, bukan cuma dari SQL*Plus'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
**Stored procedure** adalah blok PL/SQL yang **diberi nama dan disimpan di dalam basis data**. Bedanya dengan blok anonim cuma itu — tetapi akibatnya besar:

- Bisa **dipanggil berulang kali** tanpa mengirim ulang kodenya
- Sudah **dikompilasi**, jadi lebih cepat dijalankan
- Hak aksesnya bisa diatur: seseorang boleh **menjalankan** procedure tanpa boleh menyentuh tabelnya langsung
- Aturannya **berlaku bagi semua** yang memakai basis data itu, lewat aplikasi mana pun

**Bentuknya**

\`CREATE OR REPLACE PROCEDURE nama (parameter) AS ... BEGIN ... END;\`

Kata **\`OR REPLACE\`** layak selalu ditulis. Tanpanya, membuat ulang procedure yang sudah ada akan ditolak dengan *"name is already used by an existing object"*, dan kamu harus menghapusnya dulu dengan \`DROP PROCEDURE\`. Karena procedure hampir selalu disunting berkali-kali saat dikembangkan, \`OR REPLACE\` menghemat banyak kejengkelan.

Perhatikan juga bahwa di procedure dipakai **\`AS\`** (atau \`IS\`, keduanya sama persis) menggantikan \`DECLARE\`. Variabel lokal ditulis **di antara \`AS\` dan \`BEGIN\`**, tanpa menuliskan kata \`DECLARE\` lagi.

**Tiga arah parameter**

Inilah bagian yang paling sering ditanyakan:

- **\`IN\`** — masukan. Nilainya dibaca procedure, **tidak boleh diubah** di dalamnya. Ini bawaan kalau arahnya tidak ditulis.
- **\`OUT\`** — keluaran. Procedure **mengisi** nilainya untuk dikembalikan ke pemanggil. Nilai awalnya diabaikan.
- **\`IN OUT\`** — dua arah. Nilai masuk dibaca, lalu boleh diubah dan dikembalikan.

Kaitannya dengan Alpro: **\`IN\` mirip pass by value, \`OUT\` dan \`IN OUT\` mirip pass by reference.**

**Kenapa procedure tidak mengembalikan nilai lewat RETURN?**

Karena procedure memang **tidak dirancang mengembalikan nilai**. Ia dirancang **melakukan sesuatu**. Kalau kamu butuh hasil, pakai parameter \`OUT\` — dan kamu bisa punya banyak sekaligus.

Kalau yang kamu inginkan benar-benar satu nilai balik, yang tepat adalah **function**, bukan procedure.

**Memanggilnya**

Dari blok anonim, procedure dipanggil seperti memanggil fungsi biasa. Tetapi untuk parameter \`OUT\`, kamu **harus menyiapkan variabel penampung** lebih dulu — karena procedure butuh tempat untuk menaruh hasilnya.

**Notasi posisi dan notasi nama**

- **Posisi**: \`kalkulator(20, 4, '*', hsl)\` — urutannya harus persis.
- **Nama**: \`kalkulator(p1 => 20, p2 => 4, operasi => '*', hasil => hsl)\` — urutan bebas, jauh lebih jelas dibaca.

Notasi nama memakai tanda **\`=>\`** dan sangat dianjurkan untuk procedure berparameter banyak, karena menghilangkan kemungkinan tertukar urutan.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'CREATE OR REPLACE PROCEDURE m (\n  p1 IN INT,\n  p2 IN INT,\n  h  OUT INT\n) AS\nBEGIN\n  h := p1 + p2;\nEND;\n/\n\nDECLARE\n  hsl INT;\nBEGIN\n  m(10, 20, hsl);\n  DBMS_OUTPUT.PUT_LINE(\'hasil = \' || hsl);\nEND;\n/',
      penjelasan: `
Ini contoh paling dasar, dan tiap bagiannya menjelaskan satu aturan.

**\`p1 IN INT\`** — perhatikan urutannya: **nama, arah, tipe**. Berbeda dari kebanyakan bahasa yang menulis tipe lebih dulu.

Perhatikan juga bahwa **tipe parameter tidak boleh diberi ukuran**. Kamu menulis \`VARCHAR2\`, **bukan** \`VARCHAR2(50)\`. Ukurannya ditentukan oleh nilai yang dikirim pemanggil, bukan oleh procedure. Menuliskan ukuran akan langsung ditolak, dan ini kesalahan yang sering terjadi karena terasa wajar meniru \`CREATE TABLE\`.

**\`h OUT INT\`** — inilah jalan keluarnya hasil. Di dalam procedure, \`h\` diperlakukan seperti variabel kosong yang **wajib kamu isi**. Kalau ada jalur eksekusi yang lupa mengisinya, pemanggil menerima \`NULL\` tanpa peringatan apa pun.

**\`AS\`** menggantikan \`DECLARE\`. Kalau procedure ini butuh variabel lokal, ia ditulis di antara \`AS\` dan \`BEGIN\`, misalnya:

\`) AS v_sementara INT; BEGIN ...\`

Bagian pemanggilan menunjukkan hal penting: **variabel \`hsl\` harus dideklarasikan lebih dulu**. Procedure tidak bisa membuat variabel di tempat pemanggil — ia hanya mengisi wadah yang sudah kamu sediakan.

Perhatikan bahwa procedure ini dipanggil sebagai **pernyataan tersendiri**, bukan sebagai bagian dari ekspresi. Kamu **tidak bisa** menulis \`DBMS_OUTPUT.PUT_LINE(m(10, 20))\` — karena \`m\` tidak mengembalikan nilai. Untuk itu kamu butuh **function**.
`
    },
    {
      bahasa: 'sql',
      kode: '-- IN     : dibaca saja, TIDAK boleh diubah\n-- OUT    : diisi procedure, nilai awal diabaikan\n-- IN OUT : dibaca, diubah, dikembalikan\n\nCREATE OR REPLACE PROCEDURE contoh_arah (\n  a IN     INT,\n  b OUT    INT,\n  c IN OUT INT\n) AS\nBEGIN\n  -- a := 5;         -- ERROR: parameter IN tidak bisa jadi tujuan\n  b := a * 2;        -- boleh: OUT memang untuk diisi\n  c := c + a;        -- boleh: IN OUT dibaca lalu diubah\nEND;\n/',
      penjelasan: `
Baris yang dikomentari itu memuat pelajaran terpenting di topik ini.

**Parameter \`IN\` bersifat baca saja.** Mencoba memberinya nilai akan ditolak saat kompilasi dengan pesan *"expression 'A' cannot be used as an assignment target"*. Ini bukan kerewelan — ia mencegah procedure diam-diam mengubah data pemanggil yang tidak diharapkan berubah.

Kalau kamu memang butuh mengubah nilai masukan di dalam procedure, salin dulu ke variabel lokal:

\`) AS v_a INT := a; BEGIN v_a := v_a + 1; ...\`

**Parameter \`OUT\`** dimulai sebagai \`NULL\` di dalam procedure, **berapa pun nilai yang dikirim pemanggil**. Ini sering mengejutkan: kalau kamu mengirim variabel berisi 100 ke parameter \`OUT\`, di dalam procedure nilainya tetap \`NULL\`. Kalau kamu ingin nilai lamanya terbaca, yang kamu butuhkan adalah \`IN OUT\`.

**Parameter \`IN OUT\`** membawa nilai masuk dan keluar. Ia berguna untuk hal seperti *"tambahkan sesuatu ke nilai yang sudah ada"*.

Ada satu akibat praktis yang perlu diketahui: **argumen untuk \`OUT\` dan \`IN OUT\` harus berupa variabel, tidak boleh berupa nilai tetap.** Menulis \`contoh_arah(5, 10, 15)\` akan ditolak, karena procedure tidak punya tempat untuk menaruh hasil pada angka \`10\` — angka bukan wadah.

Kaitannya dengan yang sudah kamu pelajari di Alpro terasa langsung: \`IN\` berperilaku seperti **pass by value**, sedangkan \`OUT\` dan \`IN OUT\` seperti **pass by reference**. Persoalan dan jebakannya pun serupa.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Notasi POSISI: urutan harus persis\nkalkulator(20, 4, \'*\', hsl);\n\n-- Notasi NAMA: urutan bebas, jelas terbaca\nkalkulator(\n  p1      => 20,\n  p2      => 4,\n  operasi => \'*\',\n  hasil   => hsl\n);',
      penjelasan: `
Kedua bentuk ini memanggil procedure yang sama dengan hasil yang sama, tetapi ketahanannya terhadap kesalahan sangat berbeda.

**Notasi posisi** ringkas, dan cocok untuk procedure berparameter satu atau dua. Masalahnya muncul begitu parameternya bertambah dan **tipenya sama**.

Bayangkan procedure \`transfer(dari, ke, jumlah)\` yang ketiganya angka. Menulis \`transfer(200, 100, 50000)\` terlihat wajar — dan kalau kamu tertukar antara \`dari\` dan \`ke\`, **tidak akan ada error sama sekali**. Uangnya cuma berpindah ke arah yang salah. Jenis kesalahan seperti ini yang paling mahal, karena tidak terdeteksi mesin.

**Notasi nama** memakai tanda \`=>\` dan menyebutkan tujuan tiap nilai secara terang-terangan. Keuntungannya:

- **Urutannya bebas**, jadi tidak mungkin tertukar.
- **Terbaca sendiri.** Orang yang membaca kodemu tidak perlu membuka definisi procedure untuk tahu arti angka 20 dan 4.
- **Tahan perubahan.** Kalau suatu hari ada parameter baru disisipkan di tengah, pemanggilan bernotasi nama tetap benar.

Keduanya boleh dicampur, tetapi dengan syarat: **yang bernotasi posisi harus di depan semua**. Menulis \`kalkulator(20, p2 => 4, '*', hsl)\` ditolak, karena setelah beralih ke notasi nama tidak boleh kembali ke posisi.

Untuk procedure dengan tiga parameter atau lebih, biasakan notasi nama. Sedikit lebih panjang, tetapi menghilangkan satu kelas kesalahan sepenuhnya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Procedure kalkulator (dari tugas kuliah)
-- ============================================

CREATE OR REPLACE PROCEDURE kalkulator (
    p1      IN  INT,
    p2      IN  INT,
    operasi IN  CHAR,        -- '+', '-', '*', '/'
    hasil   OUT NUMBER
) AS
BEGIN
    IF operasi = '+' THEN
        hasil := p1 + p2;
    ELSIF operasi = '-' THEN
        hasil := p1 - p2;
    ELSIF operasi = '*' THEN
        hasil := p1 * p2;
    ELSIF operasi = '/' THEN
        IF p2 != 0 THEN
            hasil := p1 / p2;
        ELSE
            DBMS_OUTPUT.PUT_LINE('Error: Tidak bisa membagi dengan nol.');
            hasil := NULL;
        END IF;
    ELSE
        DBMS_OUTPUT.PUT_LINE('Error: Operasi tidak dikenali.');
        hasil := NULL;
    END IF;
END;
/

-- ---------- Memanggilnya ----------
DECLARE
    hsl NUMBER;
BEGIN
    kalkulator(20, 4, '*', hsl);
    DBMS_OUTPUT.PUT_LINE('20 * 4 = ' || hsl);

    kalkulator(20, 4, '/', hsl);
    DBMS_OUTPUT.PUT_LINE('20 / 4 = ' || hsl);

    -- pembagian nol: ditangani, hasil jadi NULL
    kalkulator(20, 0, '/', hsl);
    DBMS_OUTPUT.PUT_LINE('20 / 0 = ' || NVL(TO_CHAR(hsl), 'NULL'));

    -- operasi tak dikenal
    kalkulator(20, 4, '%', hsl);
END;
/


-- ============================================
-- Membandingkan ketiga arah parameter
-- ============================================

CREATE OR REPLACE PROCEDURE contoh_arah (
    a IN     INT,
    b OUT    INT,
    c IN OUT INT
) AS
BEGIN
    DBMS_OUTPUT.PUT_LINE('  di dalam -> a = ' || a);
    DBMS_OUTPUT.PUT_LINE('  di dalam -> b = ' || NVL(TO_CHAR(b), 'NULL'));
    DBMS_OUTPUT.PUT_LINE('  di dalam -> c = ' || c);

    b := a * 2;
    c := c + a;
END;
/

DECLARE
    v_a INT := 5;
    v_b INT := 100;      -- nilai ini akan DIABAIKAN karena OUT
    v_c INT := 100;      -- nilai ini TERBACA karena IN OUT
BEGIN
    DBMS_OUTPUT.PUT_LINE('sebelum: b = ' || v_b || ', c = ' || v_c);
    contoh_arah(v_a, v_b, v_c);
    DBMS_OUTPUT.PUT_LINE('sesudah: b = ' || v_b || ', c = ' || v_c);
END;
/

-- ---------- Notasi nama: urutan bebas, jelas terbaca ----------
DECLARE
    hsl NUMBER;
BEGIN
    kalkulator(
        operasi => '+',
        hasil   => hsl,
        p1      => 7,
        p2      => 3
    );
    DBMS_OUTPUT.PUT_LINE('7 + 3 = ' || hsl);
END;
/

-- ---------- Memeriksa procedure yang tersimpan ----------
SELECT object_name, object_type, status
FROM   user_objects
WHERE  object_type = 'PROCEDURE';`
  },

  output: `20 * 4 = 80
20 / 4 = 5
Error: Tidak bisa membagi dengan nol.
20 / 0 = NULL
Error: Operasi tidak dikenali.

sebelum: b = 100, c = 100
  di dalam -> a = 5
  di dalam -> b = NULL        <- nilai awal OUT selalu diabaikan
  di dalam -> c = 100         <- nilai awal IN OUT terbaca
sesudah: b = 10, c = 105

7 + 3 = 10

OBJECT_NAME    OBJECT_TYPE   STATUS
-------------- ------------- -------
KALKULATOR     PROCEDURE     VALID
CONTOH_ARAH    PROCEDURE     VALID`,

  kesalahanUmum: [
    {
      salah: 'Menuliskan ukuran pada tipe parameter, misalnya p_nama IN VARCHAR2(50).',
      kenapa: 'Ukuran parameter ditentukan oleh nilai yang dikirim pemanggil, bukan oleh procedure, sehingga Oracle menolaknya saat kompilasi. Kesalahan ini sangat sering terjadi karena terasa wajar meniru bentuk CREATE TABLE yang memang memakai ukuran.',
      benar: 'Tulis tipenya saja tanpa kurung: p_nama IN VARCHAR2. Kalau ingin ikut ukuran kolom tabel, pakai mahasiswa.nama%TYPE.'
    },
    {
      salah: 'Mencoba memberi nilai kepada parameter IN di dalam procedure.',
      kenapa: 'Parameter IN bersifat baca saja, dan Oracle menolaknya dengan pesan bahwa ekspresi itu tidak bisa dijadikan tujuan penugasan. Aturan ini justru melindungi: tanpanya, procedure bisa diam-diam mengubah data pemanggil yang tidak diharapkan berubah.',
      benar: 'Salin ke variabel lokal lebih dulu, misalnya deklarasikan v_a INT := a; lalu ubah v_a. Atau ganti arahnya menjadi IN OUT kalau memang perlu dikembalikan.'
    },
    {
      salah: 'Mengira nilai awal variabel yang dikirim ke parameter OUT akan terbaca di dalam procedure.',
      kenapa: 'Parameter OUT selalu dimulai sebagai NULL di dalam procedure, berapa pun nilai yang dikirim. Kalau logika di dalamnya mengandalkan nilai lama, hasilnya akan salah tanpa pesan kesalahan apa pun karena NULL diperlakukan sebagai nilai yang sah.',
      benar: 'Pakai IN OUT kalau nilai masuk perlu dibaca sekaligus dikembalikan. Pakai OUT hanya untuk hasil yang murni dihasilkan procedure.'
    },
    {
      salah: 'Mengirim nilai tetap sebagai argumen untuk parameter OUT, misalnya contoh_arah(5, 10, 15).',
      kenapa: 'Procedure perlu tempat untuk menaruh hasil, dan angka bukan wadah yang bisa diisi. Oracle menolaknya. Kesalahan ini muncul karena bentuk pemanggilannya terlihat sama persis dengan pemanggilan fungsi biasa.',
      benar: 'Deklarasikan variabel penampung lebih dulu, lalu kirim variabel itu sebagai argumen untuk parameter OUT dan IN OUT.'
    },
    {
      salah: 'Lupa mengisi parameter OUT pada salah satu cabang logika.',
      kenapa: 'Pemanggil menerima NULL tanpa peringatan apa pun, dan NULL sering lolos pemeriksaan berikutnya karena dianggap nilai yang sah. Bug ini baru muncul pada kasus tertentu saja, sehingga sulit ditemukan lewat pengujian sekilas.',
      benar: 'Pastikan setiap cabang, termasuk ELSE terakhir, mengisi seluruh parameter OUT. Beri nilai awal di baris pertama procedure sebagai jaring pengaman.'
    }
  ],

  analogi: `Bayangkan kamu menitipkan sesuatu kepada tukang servis.

**Blok anonim** adalah kamu memperbaiki sendiri di rumah, sekali itu saja, lalu lupa caranya. **Procedure** adalah menuliskan prosedurnya di papan bengkel, diberi nama, supaya siapa pun bisa mengerjakannya lagi kapan saja.

Sekarang tiga arah parameter, dengan gambaran menitipkan barang:

- **\`IN\`** — kamu menyerahkan **fotokopi struk**. Tukang boleh membacanya, tetapi apa pun yang dia coret di fotokopi itu tidak memengaruhi struk aslimu. Karena itu pula dia dilarang mencoretnya — percuma.
- **\`OUT\`** — kamu menyerahkan **amplop kosong** dan berkata *"taruh hasilnya di sini"*. Perhatikan: **amplopnya harus kosong**. Kalaupun kamu menyelipkan sesuatu di dalamnya, tukang tidak akan melihatnya — dia langsung membuang isinya dan mengisi yang baru.
- **\`IN OUT\`** — kamu menyerahkan **buku catatan yang sudah ada isinya**. Tukang membaca catatan lama, menambahkan barisnya, lalu mengembalikan buku yang sama.

Dari sini jelas kenapa kamu **tidak bisa menyerahkan angka mati** untuk parameter \`OUT\`. Kamu tidak bisa bilang *"taruh hasilnya di angka 10"* — angka 10 bukan wadah, ia sekadar nilai.

Dan **notasi nama**? Itu seperti menempeli tiap barang dengan label tujuannya, alih-alih mengandalkan urutan penyerahan. Kalau kamu menyerahkan tiga amplop yang bentuknya sama persis tanpa label, tertukar satu saja tidak akan ketahuan siapa pun — sampai hasilnya salah.`,

  latihan: [
    'Buat procedure bernama luas_persegi yang menerima panjang dan lebar sebagai IN, dan mengembalikan luasnya lewat parameter OUT. Panggil dari blok anonim.',
    'Jelaskan perbedaan IN, OUT, dan IN OUT, lalu kaitkan masing-masing dengan pass by value dan pass by reference yang kamu pelajari di Alpro.',
    'Jelaskan kenapa parameter OUT selalu bernilai NULL di dalam procedure, dan tuliskan satu kasus di mana kamu wajib memakai IN OUT.',
    'Modifikasi procedure kalkulator supaya operasi pembagian nol tidak sekadar menampilkan pesan, melainkan mengembalikan penanda kesalahan lewat parameter OUT tambahan.',
    'Tuliskan pemanggilan procedure kalkulator memakai notasi nama dengan urutan parameter yang sengaja diacak. Jelaskan kenapa cara ini lebih aman untuk procedure berparameter banyak.'
  ]
});

TOPICS.push({
  id: 'bd2-kontrol-alur',
  judul: 'Kontrol Alur — IF, CASE & LOOP',
  kategori: 'basis-data-2',
  tag: ['IF', 'ELSIF', 'CASE', 'LOOP', 'FOR', 'WHILE', 'kontrol alur'],
  ringkas: 'Percabangan dan perulangan di PL/SQL — mirip Alpro, dengan beberapa jebakan khas Oracle.',

  fungsi: `**Menambahkan percabangan dan perulangan ke dalam SQL.**

Ini yang membuat PL/SQL menjadi bahasa pemrograman, bukan sekadar bahasa kueri.

Terpakai di:

- **Aturan bertingkat** — potongan berbeda menurut jenjang, kategori, atau masa
- **Memproses baris satu per satu** ketika satu kueri tidak cukup
- **Migrasi data** — mengubah bentuk data lama menjadi baru dengan aturan yang berbeda-beda
- **Perhitungan bertahap** yang hasilnya bergantung pada langkah sebelumnya

Peringatan yang penting sejak awal: **kalau bisa dilakukan dengan satu perintah SQL, jangan pakai perulangan.**

Basis data jauh lebih cepat memproses satu perintah yang mengenai seribu baris daripada seribu perintah yang masing-masing mengenai satu baris.`,

  praktik: {
    tujuan: `Kamu bisa memakai IF, CASE, dan ketiga jenis LOOP dengan tepat, dan tahu kapan sebaiknya tidak memakainya sama sekali.`,
    alat: [
      'Oracle XE atau Live SQL'
    ],
    langkah: [
      { judul: 'Tanyakan dulu: benarkah butuh perulangan?',
        isi: `Sebelum menulis \`LOOP\`, coba tulis sebagai satu perintah \`UPDATE\` atau \`MERGE\` dengan \`CASE\` di dalamnya.

Sebagian besar kasus yang terlihat butuh perulangan sebenarnya tidak. Dan perbedaan kecepatannya bisa puluhan kali.

Perulangan dipakai hanya kalau tiap baris butuh **keputusan yang bergantung pada hasil baris sebelumnya**.` },
      { judul: 'Pakai IF-ELSIF untuk rentang',
        isi: `Ingat ejaannya: **\`ELSIF\`**, bukan \`ELSEIF\` dan bukan \`ELSE IF\`. Ini kesalahan ketik yang sering memakan waktu.

Urutkan dari syarat **paling ketat**, sama seperti pelajaran percabangan di Algoritma.` },
      { judul: 'Pakai CASE untuk nilai tepat',
        isi: `Ada dua bentuk:

- \`CASE v_kode WHEN 'A' THEN ... END CASE;\` untuk mencocokkan nilai
- \`CASE WHEN v_nilai >= 85 THEN ... END CASE;\` untuk syarat bebas

Bentuk kedua lebih luwes dan bisa menggantikan \`IF\` berjenjang dengan lebih rapi.` },
      { judul: 'Pilih jenis LOOP yang tepat',
        isi: `- **basic loop** dengan \`EXIT WHEN\` — kalau syarat berhentinya di tengah
- **WHILE loop** — kalau diperiksa di awal
- **FOR loop** — kalau jumlahnya sudah diketahui

\`FOR i IN 1..10 LOOP\` tidak perlu deklarasi variabel — \`i\` dibuat otomatis dan hanya ada di dalam perulangan.` },
      { judul: 'Pastikan setiap loop punya jalan keluar',
        isi: `Untuk basic loop dan WHILE, tunjuk baris mana yang membuatnya berhenti.

Perulangan tak berujung di dalam basis data lebih merepotkan daripada di aplikasi — ia bisa mengunci baris dan menahan transaksi lain.

Selalu uji dengan data kecil dulu.` },
      { judul: 'Ukur perbedaannya sendiri',
        isi: `Buat tabel berisi 50.000 baris, lalu perbarui kolomnya dengan dua cara: satu \`UPDATE\` dengan \`CASE\`, dan perulangan yang memperbarui satu per satu.

Ukur keduanya. Selisihnya akan meyakinkanmu untuk selalu mencoba cara pertama lebih dulu.` }
    ],
    cek: [
      'Kamu memakai ELSIF dengan ejaan yang benar dan bloknya terkompilasi',
      'Setiap LOOP-mu punya jalan keluar yang bisa kamu tunjuk',
      'Versi satu UPDATE terbukti jauh lebih cepat daripada versi berulang'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Kalau kamu sudah menguasai percabangan dan perulangan di Alpro, isi topik ini akan terasa akrab. Yang perlu diperhatikan justru **perbedaan kecilnya**, karena di situlah kesalahan muncul.

**Percabangan IF**

\`IF syarat THEN ... ELSIF syarat THEN ... ELSE ... END IF;\`

Tiga hal yang berbeda dari bahasa lain:

- Ditulis **\`ELSIF\`**, bukan \`ELSE IF\` atau \`ELIF\`. Satu huruf E saja.
- **\`THEN\` wajib** setelah setiap syarat.
- Ditutup **\`END IF;\`** dengan spasi dan titik koma.

**CASE**

Ada dua bentuk:

- **CASE sederhana** — membandingkan satu ekspresi dengan beberapa nilai
- **CASE tercari** — tiap cabang punya syarat sendiri yang berdiri sendiri

CASE lebih rapi daripada rantai \`ELSIF\` yang panjang ketika semuanya membandingkan hal yang sama.

Perhatikan bahwa CASE punya **dua wujud**: sebagai **pernyataan** (ditutup \`END CASE;\`) dan sebagai **ekspresi** yang menghasilkan nilai (ditutup \`END;\` saja). Keduanya sering tertukar.

**Tiga bentuk perulangan**

- **\`LOOP ... END LOOP;\`** — perulangan dasar tanpa syarat. **Wajib** ada \`EXIT WHEN\` di dalamnya, atau ia berputar selamanya.
- **\`WHILE syarat LOOP ... END LOOP;\`** — memeriksa syarat **di awal**.
- **\`FOR i IN 1..10 LOOP ... END LOOP;\`** — mengulang sejumlah tertentu.

**Tiga hal khas FOR LOOP di PL/SQL** yang berbeda dari Alpro dan sering ditanyakan:

- Variabel pencacahnya **tidak perlu dideklarasikan** — PL/SQL membuatnya sendiri.
- Variabel itu **hanya ada di dalam loop**, dan lenyap sesudahnya.
- Variabel itu **tidak bisa diubah** di dalam loop. Ia baca saja.

Untuk menghitung mundur, tambahkan **\`REVERSE\`**: \`FOR i IN REVERSE 1..10 LOOP\`. Perhatikan bahwa batasnya tetap ditulis **kecil ke besar** meski arahnya mundur — menulis \`REVERSE 10..1\` justru tidak berjalan sama sekali.

**EXIT dan CONTINUE**

- **\`EXIT;\`** keluar dari loop, seperti \`break\`.
- **\`EXIT WHEN syarat;\`** bentuk ringkasnya.
- **\`CONTINUE;\`** melompat ke putaran berikutnya, seperti \`continue\`. Tersedia sejak Oracle 11g.

**Peringatan penting: jangan memakai loop untuk mengolah tabel**

Ini kesalahan rancangan yang paling merugikan di PL/SQL. Mengambil 10.000 baris lalu memprosesnya satu per satu dalam loop bisa **ratusan kali lebih lambat** daripada satu perintah \`UPDATE\` yang mengerjakan semuanya sekaligus.

SQL memang dirancang untuk bekerja **pada himpunan**, bukan baris demi baris. Kebiasaan berpikir prosedural dari Alpro justru menjadi jebakan di sini.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'IF operasi = \'+\' THEN\n  hasil := p1 + p2;\nELSIF operasi = \'-\' THEN\n  hasil := p1 - p2;\nELSE\n  hasil := NULL;\nEND IF;\n\n-- SALAH: ELSE IF terpisah, atau ELIF\n-- SALAH: lupa THEN\n-- SALAH: END IF tanpa spasi',
      penjelasan: `
Bentuk ini diambil dari procedure kalkulator di tugas kuliah, dan tiga kesalahan yang dikomentari itu semuanya sering terjadi.

**\`ELSIF\` ditulis tanpa huruf E kedua.** Ini benar-benar khas PL/SQL. Bandingkan dengan tetangganya:

- Python: \`elif\`
- C, Java, JavaScript: \`else if\` terpisah
- PL/SQL: **\`ELSIF\`**

Menulis \`ELSE IF\` di PL/SQL **sebenarnya tetap sah secara sintaks**, tetapi artinya berbeda: ia membuka **IF baru yang bersarang**, sehingga kamu butuh \`END IF\` tambahan untuk setiap cabang. Kalau kamu punya lima cabang, jadinya lima \`END IF\` bertumpuk. Errornya baru muncul di akhir, jauh dari letak kesalahannya.

**\`THEN\` wajib.** Melupakannya menghasilkan error sintaks yang menunjuk baris berikutnya, bukan baris yang bermasalah.

**\`END IF;\`** memakai spasi. Menulis \`ENDIF;\` ditolak.

Ada satu hal khusus PL/SQL yang perlu diketahui soal **NULL dalam percabangan**. Kalau \`operasi\` bernilai \`NULL\`, maka \`operasi = '+'\` **tidak menghasilkan salah** — ia menghasilkan \`NULL\`. Dan \`IF\` hanya menjalankan cabang yang syaratnya **benar**.

Akibatnya, semua cabang \`IF\` dan \`ELSIF\` dilewati, dan yang dijalankan adalah **\`ELSE\`**. Ini kadang yang kamu inginkan, kadang bukan. Untuk memeriksa nilai kosong secara tegas, pakai \`IF operasi IS NULL THEN\`.

Logika tiga nilai ini persis yang kamu pelajari di topik Model Relasional pada Basis Data I, dan di PL/SQL ia ikut memengaruhi alur program, bukan cuma hasil kueri.
`
    },
    {
      bahasa: 'sql',
      kode: '-- FOR: pencacah dibuat sendiri, TIDAK perlu DECLARE\nFOR i IN 1..5 LOOP\n  DBMS_OUTPUT.PUT_LINE(i);\nEND LOOP;\n\n-- Mundur: batas TETAP ditulis kecil..besar\nFOR i IN REVERSE 1..5 LOOP   -- 5,4,3,2,1\n  DBMS_OUTPUT.PUT_LINE(i);\nEND LOOP;\n\n-- REVERSE 5..1 TIDAK jalan sama sekali\n\n-- i := 10;   -- ERROR: pencacah FOR tidak bisa diubah',
      penjelasan: `
Tiga sifat FOR LOOP ini berbeda dari kebiasaan Alpro dan sering menjadi soal ujian.

**Pertama, pencacahnya dibuat otomatis.** Kamu tidak mendeklarasikan \`i\` di bagian \`DECLARE\`. PL/SQL membuatnya sendiri saat loop dimulai, dan **membuangnya** saat loop selesai. Mencoba memakai \`i\` setelah \`END LOOP\` akan menghasilkan error *"identifier must be declared"*.

Ada akibat yang lebih licik: kalau kebetulan ada variabel bernama \`i\` di bagian \`DECLARE\`, pencacah loop **menutupinya** selama loop berjalan. Setelah loop selesai, variabel luar itu **tidak berubah sama sekali** — padahal terlihat seperti diubah di dalam loop. Ini sumber kebingungan yang sulit dilacak.

**Kedua, pencacahnya tidak bisa diubah.** Mencoba \`i := 10;\` ditolak saat kompilasi. Kalau kamu perlu keluar lebih awal, pakai \`EXIT WHEN\`, bukan memanipulasi pencacah.

**Ketiga, dan ini yang paling menjebak: \`REVERSE\` tidak membalik batasnya.** Batas tetap ditulis dari kecil ke besar, dan \`REVERSE\` hanya membalik **arah kunjungannya**.

Jadi \`FOR i IN REVERSE 1..5\` menghasilkan 5, 4, 3, 2, 1 — benar. Tetapi \`FOR i IN REVERSE 5..1\` **tidak menjalankan apa-apa**, karena rentang 5 sampai 1 memang kosong.

Yang membuatnya berbahaya: **tidak ada pesan kesalahan**. Loop-nya cuma dilewati diam-diam, dan kamu mengira badan loop-nya yang bermasalah. Ini berlaku juga untuk loop maju: \`FOR i IN 5..1\` juga kosong.
`
    },
    {
      bahasa: 'sql',
      kode: '-- BURUK: loop baris demi baris, ratusan kali lebih lambat\nFOR r IN (SELECT nim, usia FROM mahasiswa) LOOP\n  UPDATE mahasiswa SET status = \'dewasa\'\n  WHERE nim = r.nim AND r.usia >= 17;\nEND LOOP;\n\n-- BAIK: satu perintah, dikerjakan sekaligus\nUPDATE mahasiswa SET status = \'dewasa\' WHERE usia >= 17;',
      penjelasan: `
Inilah kesalahan rancangan yang paling merugikan di PL/SQL, dan justru paling sering dilakukan orang yang **kuat di pemrograman prosedural**.

Kebiasaan dari Alpro mengajarkan: kalau ada banyak data, telusuri satu per satu. Di PL/SQL, naluri itu menjadi jebakan.

Perhatikan apa yang terjadi pada versi pertama. Untuk 10.000 baris, Oracle harus:

- Berpindah antara mesin PL/SQL dan mesin SQL **10.000 kali** — peralihan ini disebut *context switch* dan tidak gratis
- Menjalankan **10.000 perintah UPDATE** terpisah, masing-masing dengan pencarian dan penguncian sendiri
- Menulis **10.000 catatan** ke log transaksi

Versi kedua mengerjakan semuanya dalam **satu** perintah. Oracle bisa merencanakan sekali, memindai sekali, dan menulis log secara bergerombol. Selisihnya bisa **ratusan kali lipat**, dan bukan sekadar teori.

Prinsipnya: **SQL dirancang bekerja pada himpunan, bukan pada baris.** Kalau sebuah pekerjaan bisa dinyatakan sebagai satu perintah SQL, hampir selalu itu pilihan yang benar.

Kapan loop memang diperlukan?

- Ketika tiap baris butuh **tindakan yang benar-benar berbeda**, misalnya memanggil layanan luar
- Ketika hasilnya harus diproses **berurutan** dengan ketergantungan antar-baris
- Ketika kamu perlu memecah transaksi besar menjadi bagian kecil agar tidak membebani log

Kalau ternyata loop tidak terhindarkan, ada jalan tengah bernama **bulk processing** dengan \`BULK COLLECT\` dan \`FORALL\`, yang memindahkan data bergerombol sehingga peralihan antar-mesin jauh berkurang.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Kontrol alur PL/SQL
-- ============================================

-- ---------- IF bertingkat ----------
DECLARE
  v_nilai NUMBER := 78;
  v_huruf CHAR(1);
BEGIN
  IF v_nilai >= 80 THEN
    v_huruf := 'A';
  ELSIF v_nilai >= 70 THEN         -- ELSIF, bukan ELSE IF
    v_huruf := 'B';
  ELSIF v_nilai >= 60 THEN
    v_huruf := 'C';
  ELSE
    v_huruf := 'E';
  END IF;                          -- END IF pakai spasi

  DBMS_OUTPUT.PUT_LINE('nilai ' || v_nilai || ' -> ' || v_huruf);
END;
/

-- ---------- CASE sederhana: banding satu nilai ----------
DECLARE
  v_hari NUMBER := 3;
  v_nama VARCHAR2(10);
BEGIN
  CASE v_hari
    WHEN 1 THEN v_nama := 'Senin';
    WHEN 2 THEN v_nama := 'Selasa';
    WHEN 3 THEN v_nama := 'Rabu';
    ELSE        v_nama := 'lainnya';
  END CASE;
  DBMS_OUTPUT.PUT_LINE('hari ke-' || v_hari || ' = ' || v_nama);
END;
/

-- ---------- CASE tercari: tiap cabang syarat sendiri ----------
DECLARE
  v_nilai NUMBER := 78;
  v_huruf CHAR(1);
BEGIN
  -- CASE sebagai EKSPRESI: ditutup END, bukan END CASE
  v_huruf := CASE
               WHEN v_nilai >= 80 THEN 'A'
               WHEN v_nilai >= 70 THEN 'B'
               WHEN v_nilai >= 60 THEN 'C'
               ELSE 'E'
             END;
  DBMS_OUTPUT.PUT_LINE('lewat CASE ekspresi -> ' || v_huruf);
END;
/

-- ---------- Tiga bentuk perulangan ----------
DECLARE
  i NUMBER := 1;
BEGIN
  -- 1. LOOP dasar: WAJIB ada EXIT
  DBMS_OUTPUT.PUT_LINE('LOOP dasar:');
  LOOP
    EXIT WHEN i > 3;
    DBMS_OUTPUT.PUT_LINE('  i = ' || i);
    i := i + 1;
  END LOOP;

  -- 2. WHILE: syarat diperiksa di awal
  DBMS_OUTPUT.PUT_LINE('WHILE:');
  i := 1;
  WHILE i <= 3 LOOP
    DBMS_OUTPUT.PUT_LINE('  i = ' || i);
    i := i + 1;
  END LOOP;

  -- 3. FOR: pencacah dibuat otomatis
  DBMS_OUTPUT.PUT_LINE('FOR maju:');
  FOR j IN 1..3 LOOP
    DBMS_OUTPUT.PUT_LINE('  j = ' || j);
  END LOOP;

  DBMS_OUTPUT.PUT_LINE('FOR mundur (REVERSE 1..3):');
  FOR j IN REVERSE 1..3 LOOP
    DBMS_OUTPUT.PUT_LINE('  j = ' || j);
  END LOOP;

  -- JEBAKAN: REVERSE 3..1 tidak jalan sama sekali
  DBMS_OUTPUT.PUT_LINE('FOR REVERSE 3..1 (jebakan):');
  FOR j IN REVERSE 3..1 LOOP
    DBMS_OUTPUT.PUT_LINE('  ini tidak akan pernah tercetak');
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('  (kosong, tanpa pesan error apa pun)');
END;
/

-- ---------- EXIT dan CONTINUE ----------
BEGIN
  DBMS_OUTPUT.PUT_LINE('lewati angka genap, berhenti di 7:');
  FOR i IN 1..10 LOOP
    CONTINUE WHEN MOD(i, 2) = 0;    -- lompati genap
    EXIT WHEN i > 7;                -- berhenti setelah 7
    DBMS_OUTPUT.PUT_LINE('  ' || i);
  END LOOP;
END;
/`
  },

  output: `nilai 78 -> B

hari ke-3 = Rabu

lewat CASE ekspresi -> B

LOOP dasar:
  i = 1
  i = 2
  i = 3
WHILE:
  i = 1
  i = 2
  i = 3
FOR maju:
  j = 1
  j = 2
  j = 3
FOR mundur (REVERSE 1..3):
  j = 3
  j = 2
  j = 1
FOR REVERSE 3..1 (jebakan):
  (kosong, tanpa pesan error apa pun)

lewati angka genap, berhenti di 7:
  1
  3
  5
  7`,

  kesalahanUmum: [
    {
      salah: 'Menulis ELSE IF terpisah alih-alih ELSIF.',
      kenapa: 'ELSE IF sebenarnya sah, tetapi artinya membuka IF baru yang bersarang sehingga butuh END IF tambahan untuk tiap cabang. Dengan lima cabang, jadinya lima END IF bertumpuk, dan pesan errornya baru muncul di akhir blok, jauh dari letak kesalahannya.',
      benar: 'Pakai ELSIF dengan satu huruf E. Ia tidak menambah tingkat sarang, sehingga cukup satu END IF di akhir.'
    },
    {
      salah: 'Menulis FOR i IN REVERSE 10..1 untuk menghitung mundur.',
      kenapa: 'REVERSE hanya membalik arah kunjungan, bukan batasnya. Batas tetap harus ditulis kecil ke besar. Rentang 10 sampai 1 adalah rentang kosong, sehingga loop dilewati tanpa satu pun putaran, dan yang paling berbahaya, tanpa pesan kesalahan apa pun.',
      benar: 'Tulis FOR i IN REVERSE 1..10. Kalau sebuah loop tidak pernah berjalan, periksa dulu urutan batasnya sebelum mencurigai badan loop-nya.'
    },
    {
      salah: 'Memakai loop untuk memproses tabel baris demi baris, padahal bisa satu perintah UPDATE.',
      kenapa: 'Tiap putaran memaksa peralihan antara mesin PL/SQL dan mesin SQL, menjalankan perintah terpisah, dan menulis catatan log sendiri. Untuk sepuluh ribu baris, selisihnya bisa ratusan kali lipat. Kesalahan ini justru sering dilakukan orang yang kuat di pemrograman prosedural.',
      benar: 'Nyatakan pekerjaannya sebagai satu perintah SQL kalau mungkin. Kalau loop tak terhindarkan, pakai BULK COLLECT dan FORALL supaya peralihannya berkurang.'
    },
    {
      salah: 'Memakai variabel pencacah FOR setelah loop selesai.',
      kenapa: 'Pencacah FOR dibuat otomatis dan hanya ada di dalam loop, lalu dibuang. Memakainya sesudah END LOOP menghasilkan error bahwa identifier belum dideklarasikan. Lebih licik lagi, kalau ada variabel bernama sama di DECLARE, pencacah menutupinya selama loop sehingga variabel luar tidak pernah berubah meski terlihat diubah.',
      benar: 'Kalau nilainya perlu dipakai setelah loop, salin ke variabel lain yang dideklarasikan di DECLARE. Hindari menamai variabel luar sama dengan pencacah.'
    },
    {
      salah: 'Mengira cabang ELSE tidak akan berjalan ketika nilai yang dibandingkan adalah NULL.',
      kenapa: 'Perbandingan dengan NULL menghasilkan NULL, bukan benar maupun salah, dan IF hanya menjalankan cabang yang syaratnya benar. Akibatnya semua IF dan ELSIF dilewati, dan ELSE yang dijalankan. Kadang itu memang yang diinginkan, tetapi kalau ELSE berisi penanganan kasus tak dikenal, nilai kosong akan salah digolongkan.',
      benar: 'Periksa nilai kosong secara tegas dengan IF x IS NULL THEN sebelum cabang lainnya, kalau kasus itu memang perlu dibedakan.'
    }
  ],

  analogi: `Bayangkan kamu memberi instruksi kepada petugas gudang.

**IF** adalah *"kalau barangnya rusak, kembalikan; kalau tidak, simpan di rak"*. **CASE** adalah daftar yang lebih rapi ketika pertanyaannya selalu sama: *"lihat kode warnanya — merah ke rak 1, biru ke rak 2, hijau ke rak 3"*.

Untuk **perulangan**, bayangkan menghitung barang:

- **LOOP dasar** adalah *"terus hitung sampai saya bilang berhenti"*. Kalau kamu lupa mengatakan berhenti, dia menghitung selamanya.
- **WHILE** adalah *"selama masih ada barang di kotak, ambil satu"*. Dia memeriksa dulu sebelum bergerak.
- **FOR** adalah *"ambil barang nomor 1 sampai 10"*. Jumlahnya sudah pasti sejak awal.

Sekarang jebakan **REVERSE**. Kalau kamu bilang *"ambil barang nomor 10 sampai 1"*, petugas itu menafsirkannya secara harfiah: mulai dari 10, naik terus sampai 1. Karena 10 sudah lewat dari 1, **dia tidak mengambil apa pun** — dan dia tidak protes. Kamu pulang dengan tangan kosong dan mengira gudangnya kosong.

Cara yang benar tetap *"barang nomor 1 sampai 10"*, ditambah keterangan *"tapi kerjakan dari belakang"*.

Dan yang paling penting, soal **loop pada tabel**. Bayangkan kamu perlu menandai semua barang yang kedaluwarsa. Kamu bisa berjalan ke rak, ambil satu barang, periksa, tandai, kembalikan, lalu ulangi sepuluh ribu kali. Atau kamu bisa bilang **satu kalimat**: *"tandai semua barang yang tanggalnya lewat"*, dan biarkan seluruh tim mengerjakannya sekaligus.

Kalimat kedua itulah SQL. **Perjalanan bolak-baliknya yang mahal, bukan pekerjaannya.**`,

  latihan: [
    'Tuliskan blok PL/SQL yang mengubah nilai angka menjadi huruf A sampai E memakai IF bertingkat, lalu tulis ulang memakai CASE tercari.',
    'Jelaskan perbedaan ELSIF dan ELSE IF di PL/SQL. Apa yang terjadi kalau kamu memakai ELSE IF untuk lima cabang?',
    'Tuliskan tiga bentuk perulangan yang mencetak angka 1 sampai 5, masing-masing dengan LOOP dasar, WHILE, dan FOR.',
    'Jelaskan kenapa FOR i IN REVERSE 10..1 tidak menjalankan apa pun, dan kenapa kesalahan ini sulit terdeteksi.',
    'Diberikan tugas menandai semua mahasiswa berusia di atas 17 sebagai dewasa. Tuliskan versi loop dan versi satu perintah UPDATE, lalu jelaskan kenapa yang kedua jauh lebih cepat.',
    'Jelaskan apa yang terjadi pada rantai IF dan ELSIF ketika nilai yang dibandingkan bernilai NULL, dan bagaimana cara menanganinya secara tegas.'
  ]
});

TOPICS.push({
  id: 'bd2-exception',
  judul: 'Exception & RAISE_APPLICATION_ERROR',
  kategori: 'basis-data-2',
  tag: ['exception', 'EXCEPTION', 'RAISE_APPLICATION_ERROR', 'NO_DATA_FOUND', 'validasi'],
  ringkas: 'Menangani kesalahan, dan menegakkan aturan bisnis langsung di dalam basis data.',

  fungsi: `**Menangani keadaan tak terduga supaya basis data tidak meninggalkan data setengah jadi.**

Terpakai di:

- **Transaksi keuangan** — kalau salah satu langkah gagal, semuanya harus dibatalkan
- **Pesan galat yang berarti** — memberi tahu apa yang salah, bukan kode Oracle mentah
- **Pencatatan masalah** — mencatat galat ke tabel log tanpa menghentikan prosesnya
- **Menjaga aturan bisnis** — menolak data yang lolos batasan teknis tetapi melanggar aturan

Yang paling sering ditemui: \`NO_DATA_FOUND\` dari \`SELECT INTO\` yang tidak menemukan baris.

Dan kesalahan penanganan yang paling berbahaya: **menangkap semua galat lalu diam**. Itu membuat kegagalan tidak terlihat, dan datanya rusak diam-diam.`,

  praktik: {
    tujuan: `Kamu bisa menangani galat bawaan dan galat buatan sendiri, dan memastikan transaksi tidak meninggalkan data setengah jadi.`,
    alat: [
      'Oracle XE atau Live SQL'
    ],
    langkah: [
      { judul: 'Munculkan galatnya dengan sengaja',
        isi: `Jalankan \`SELECT INTO\` yang mencari NIM yang **tidak ada**. Kamu mendapat \`NO_DATA_FOUND\`.

Lalu jalankan yang cocok dengan **banyak** baris. Kamu mendapat \`TOO_MANY_ROWS\`.

Melihat keduanya lebih dulu membuat penanganannya masuk akal.` },
      { judul: 'Tangani yang spesifik, bukan yang umum',
        isi: `Tulis blok \`EXCEPTION\` dengan penangan terpisah:

- \`WHEN NO_DATA_FOUND THEN\` beri pesan yang jelas
- \`WHEN TOO_MANY_ROWS THEN\` beri pesan berbeda
- \`WHEN OTHERS THEN\` hanya sebagai jaring terakhir

**Jangan** menangani semuanya dengan \`WHEN OTHERS\` saja. Itu menyembunyikan galat yang seharusnya kamu ketahui.` },
      { judul: 'Jangan pernah menangkap lalu diam',
        isi: `\`WHEN OTHERS THEN NULL;\` adalah salah satu baris paling berbahaya di PL/SQL.

Ia menelan setiap galat tanpa jejak. Data bisa rusak dan tidak ada yang tahu sampai berbulan-bulan kemudian.

Kalau kamu memakai \`WHEN OTHERS\`, **selalu** catat atau lempar ulang: \`DBMS_OUTPUT.PUT_LINE(SQLERRM); RAISE;\`` },
      { judul: 'Buat galat bisnismu sendiri',
        isi: `\`RAISE_APPLICATION_ERROR(-20001, 'IPK tidak boleh lebih dari 4.00');\`

Nomornya harus antara -20000 dan -20999 — itu rentang yang disediakan untuk galat buatan pengguna.

Pesannya akan sampai ke aplikasi, jadi tulis dalam bahasa yang dimengerti penggunanya.` },
      { judul: 'Pakai SAVEPOINT untuk pembatalan sebagian',
        isi: `Kadang kamu ingin membatalkan **sebagian** saja, bukan seluruh transaksi.

- \`SAVEPOINT sebelum_ubah;\`
- lalu di penangan galat: \`ROLLBACK TO sebelum_ubah;\`

Perubahan sebelum savepoint tetap ada. Ini berguna saat memproses banyak baris dan hanya sebagian yang gagal.` },
      { judul: 'Catat galat tanpa menghentikan proses',
        isi: `Buat tabel \`log_galat\`, lalu di penangan galat sisipkan barisnya dan lanjutkan.

Perhatikan: kalau kamu \`ROLLBACK\`, catatan lognya **ikut hilang**.

Solusinya: buat prosedur pencatat dengan \`PRAGMA AUTONOMOUS_TRANSACTION\`, sehingga ia punya transaksi sendiri yang tidak ikut dibatalkan.` }
    ],
    cek: [
      'Kodemu menangani NO_DATA_FOUND dan TOO_MANY_ROWS secara terpisah',
      'Tidak ada WHEN OTHERS yang diam tanpa mencatat atau melempar ulang',
      'Galat buatanmu muncul di aplikasi dengan pesan yang bisa dimengerti pengguna'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
Program yang benar bukan cuma yang jalan saat datanya bagus, melainkan yang **berperilaku jelas saat datanya buruk**. Di PL/SQL, itu urusan bagian **\`EXCEPTION\`**.

**Bentuknya**

Bagian \`EXCEPTION\` diletakkan **sebelum \`END\`**:

\`BEGIN ... EXCEPTION WHEN nama_error THEN ... END;\`

**Dua golongan exception**

- **Bawaan Oracle** — sudah punya nama, langsung bisa dipakai
- **Buatan sendiri** — kamu deklarasikan dan lemparkan sendiri

**Exception bawaan yang paling sering ditemui:**

- **\`NO_DATA_FOUND\`** — \`SELECT INTO\` tidak menemukan baris satu pun
- **\`TOO_MANY_ROWS\`** — \`SELECT INTO\` menemukan lebih dari satu baris
- **\`ZERO_DIVIDE\`** — pembagian dengan nol
- **\`DUP_VAL_ON_INDEX\`** — menyisipkan nilai yang melanggar batasan unik
- **\`VALUE_ERROR\`** — kesalahan konversi atau ukuran
- **\`OTHERS\`** — penangkap segala, **harus paling akhir**

Dua yang pertama layak diingat baik-baik, karena **\`SELECT INTO\` menuntut tepat satu baris**. Nol baris atau dua baris sama-sama melempar exception. Ini berbeda dari \`SELECT\` biasa yang santai saja mengembalikan berapa pun.

**Menolak data yang tidak sah**

Untuk menegakkan aturan bisnis, dipakai:

\`RAISE_APPLICATION_ERROR(nomor, 'pesan');\`

Nomornya **harus antara −20000 dan −20999** — rentang itu memang disediakan Oracle untuk kesalahan buatan pengguna. Di luar rentang itu, Oracle menolaknya.

Pemanggilan ini **membatalkan seluruh operasi** dan mengembalikan pesanmu ke pemanggil. Perhatikan bahwa ia bukan sekadar mencetak peringatan — perintah yang sedang berjalan benar-benar dibatalkan.

**Kenapa validasi di basis data, bukan cuma di aplikasi?**

Karena **basis data adalah pintu terakhir**. Aturan yang hanya ada di aplikasi web bisa dilewati oleh:

- Aplikasi lain yang mengakses basis data yang sama
- Skrip impor data
- Orang yang menyambung langsung lewat SQL

Aturan yang ditegakkan di basis data berlaku bagi **semua**, tanpa kecuali. Aplikasi tetap perlu memvalidasi demi kenyamanan pengguna — supaya pesannya muncul cepat dan ramah — tetapi **basis data yang menjamin**.

Ini pola yang sama dengan yang kamu temui di topik Keamanan Informasi: **pemeriksaan di sisi klien untuk kenyamanan, pemeriksaan di sisi server untuk jaminan.**

**Bahaya WHEN OTHERS yang diam**

Menulis \`WHEN OTHERS THEN NULL;\` berarti *"kalau ada kesalahan apa pun, abaikan"*. Ini **menelan seluruh kesalahan tanpa jejak**, dan program berjalan seolah semuanya baik-baik saja padahal datanya mungkin sudah rusak. Ini dianggap salah satu kebiasaan terburuk di PL/SQL.

Kalau kamu memang memakai \`WHEN OTHERS\`, minimal **catat** kesalahannya, lalu **lempar ulang** dengan \`RAISE;\`.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: 'CREATE OR REPLACE PROCEDURE insert_mahasiswa (\n  p_nim     IN VARCHAR2,\n  p_nama    IN VARCHAR2,\n  p_usia    IN NUMBER,\n  p_jurusan IN VARCHAR2\n) IS\nBEGIN\n  IF p_usia < 17 THEN\n    RAISE_APPLICATION_ERROR(-20001,\n      \'Usia mahasiswa tidak boleh dibawah 17 tahun.\');\n  END IF;\n\n  IF p_jurusan IS NULL THEN\n    RAISE_APPLICATION_ERROR(-20002, \'Jurusan anda harus diisi.\');\n  END IF;\n\n  INSERT INTO mahasiswa (nim, nama, usia, jurusan)\n  VALUES (p_nim, p_nama, p_usia, p_jurusan);\nEND;\n/',
      penjelasan: `
Ini procedure dari tugas kuliahmu, dan bentuknya adalah pola validasi yang layak ditiru.

Perhatikan **urutannya**: seluruh pemeriksaan dilakukan **sebelum** \`INSERT\`. Ini disengaja. Kalau \`INSERT\` dijalankan lebih dulu lalu divalidasi belakangan, kamu harus membatalkannya secara manual. Memeriksa di depan jauh lebih bersih.

**Nomor kesalahan** harus berada di rentang **−20000 sampai −20999**. Rentang itu memang disediakan Oracle untuk kesalahan buatan pengguna; semua nomor di luar itu sudah dipesan Oracle sendiri. Menulis \`-19999\` atau \`-30000\` akan ditolak.

Perhatikan pemakaian nomor yang **berbeda untuk tiap aturan**: −20001 untuk usia, −20002 untuk jurusan. Ini bukan sekadar kerapian. Aplikasi yang memanggil procedure ini bisa **memeriksa nomornya** lalu menampilkan pesan yang sesuai dalam bahasa penggunanya, atau menyorot kolom yang bermasalah. Kalau semua aturan memakai nomor yang sama, kemampuan itu hilang.

Perhatikan juga **\`p_jurusan IS NULL\`**, bukan \`p_jurusan = ''\`. Di Oracle ada kekhususan yang mengejutkan: **string kosong disimpan sebagai NULL**. Jadi memanggil procedure ini dengan \`''\` sebagai jurusan **akan** tertangkap oleh pemeriksaan \`IS NULL\` — persis seperti di berkas tugasmu, di mana baris \`insert_mahasiswa('A1B025067', 'Shane Farrel', 19, '')\` memang ditolak.

Perilaku ini **khas Oracle**. Di PostgreSQL dan MySQL, string kosong dan NULL adalah dua hal berbeda. Jangan bawa asumsi ini ke DBMS lain.

Terakhir, perhatikan \`IS\` dipakai di sini, sementara topik sebelumnya memakai \`AS\`. **Keduanya sama persis** — murni soal selera.
`
    },
    {
      bahasa: 'sql',
      kode: 'DECLARE\n  v_nama VARCHAR2(50);\nBEGIN\n  SELECT nama INTO v_nama FROM mahasiswa WHERE nim = \'XXX\';\n\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE(\'Mahasiswa tidak ditemukan\');\n  WHEN TOO_MANY_ROWS THEN\n    DBMS_OUTPUT.PUT_LINE(\'Lebih dari satu baris cocok\');\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE(\'Error: \' || SQLERRM);\n    RAISE;                        -- lempar ulang, jangan ditelan\nEND;\n/',
      penjelasan: `
**\`SELECT INTO\` menuntut tepat satu baris.** Ini berbeda dari \`SELECT\` biasa, dan sumber exception yang paling sering muncul di PL/SQL.

- Nol baris → **\`NO_DATA_FOUND\`**
- Lebih dari satu baris → **\`TOO_MANY_ROWS\`**
- Tepat satu → berhasil

Karena itu \`SELECT INTO\` sebaiknya selalu dipakai dengan syarat yang menjamin keunikan, misalnya mencocokkan primary key.

Perhatikan urutan penanganannya: **\`WHEN OTHERS\` harus paling akhir**. Ia menangkap segalanya, jadi kalau ditaruh di depan, penangan yang lebih khusus di bawahnya tidak akan pernah tercapai. Oracle sebenarnya menolak susunan itu, tetapi kebiasaan menaruhnya di akhir tetap perlu dibangun.

**\`SQLERRM\`** memberi pesan kesalahan Oracle, dan **\`SQLCODE\`** memberi nomornya. Keduanya hanya bisa dipakai di dalam bagian \`EXCEPTION\`.

Sekarang bagian terpenting: **\`RAISE;\` tanpa nama** melempar ulang exception yang sedang ditangani. Kenapa ini penting?

Karena tanpanya, exception itu **dianggap sudah beres**. Pemanggil tidak akan tahu ada masalah, dan program berjalan terus seolah semuanya baik-baik saja — padahal \`v_nama\` mungkin masih kosong dan dipakai di langkah berikutnya.

Yang paling berbahaya adalah bentuk ini:

\`WHEN OTHERS THEN NULL;\`

Artinya *"apa pun kesalahannya, abaikan diam-diam"*. Tidak ada catatan, tidak ada tanda, tidak ada jejak. Kalau suatu hari data terlihat aneh, tidak ada satu pun petunjuk untuk melacaknya. Ini pantas disebut kebiasaan terburuk di PL/SQL.

Aturan yang layak dipegang: **tangkap exception hanya kalau kamu benar-benar bisa menanganinya.** Kalau yang bisa kamu lakukan cuma mencatat, catat lalu lempar ulang.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Exception buatan sendiri, diberi nama\nDECLARE\n  e_stok_habis EXCEPTION;\n  v_stok NUMBER := 0;\nBEGIN\n  IF v_stok <= 0 THEN\n    RAISE e_stok_habis;\n  END IF;\n\nEXCEPTION\n  WHEN e_stok_habis THEN\n    DBMS_OUTPUT.PUT_LINE(\'Stok habis, pesanan dibatalkan\');\nEND;\n/',
      penjelasan: `
Ada **dua cara** menyatakan kesalahan buatan sendiri, dan pilihannya bergantung pada **siapa yang perlu tahu**.

**Cara pertama: exception bernama**, seperti contoh di atas. Kamu deklarasikan dengan tipe \`EXCEPTION\`, lalu lemparkan dengan \`RAISE\`.

Kelebihannya, kodenya **terbaca sendiri**: \`RAISE e_stok_habis\` jauh lebih jelas maksudnya daripada sederet nomor. Cocok untuk keadaan yang **ditangani di dalam blok itu juga**.

Kekurangannya, exception ini **tidak punya nomor maupun pesan** yang bisa dibaca pemanggil dari luar. Kalau ia lolos tanpa ditangani, pemanggil hanya menerima kesalahan generik yang tidak informatif.

**Cara kedua: \`RAISE_APPLICATION_ERROR\`**, seperti pada procedure validasi sebelumnya. Ini yang kamu pakai kalau kesalahannya perlu **sampai ke aplikasi pemanggil** lengkap dengan nomor dan pesannya.

Ringkasnya:

- Kesalahan yang **ditangani di tempat** → exception bernama
- Kesalahan yang **dilaporkan ke luar** → \`RAISE_APPLICATION_ERROR\`

Ada satu jebakan pada **cakupan** yang perlu diketahui: exception bernama hanya dikenal di blok tempat ia dideklarasikan. Kalau ia lolos ke blok luar, blok itu **tidak bisa menangkapnya dengan nama** karena namanya tidak dikenal di sana — yang bisa hanya \`WHEN OTHERS\`.

Terakhir, perhatikan bahwa exception **menghentikan alur seketika**. Setelah \`RAISE\`, sisa perintah di bagian \`BEGIN\` **tidak dijalankan sama sekali** — eksekusi langsung melompat ke bagian \`EXCEPTION\`. Ini berbeda dari sekadar mencetak pesan lalu lanjut, dan justru itulah gunanya.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Validasi & penanganan kesalahan
-- ============================================

CREATE TABLE mahasiswa (
  nim     VARCHAR2(10) PRIMARY KEY,
  nama    VARCHAR2(50),
  usia    NUMBER,
  jurusan VARCHAR2(30)
);

-- ---------- Procedure dengan validasi ----------
CREATE OR REPLACE PROCEDURE insert_mahasiswa (
  p_nim     IN VARCHAR2,
  p_nama    IN VARCHAR2,
  p_usia    IN NUMBER,
  p_jurusan IN VARCHAR2
) IS
BEGIN
  -- Aturan 1: usia minimal
  IF p_usia < 17 THEN
    RAISE_APPLICATION_ERROR(-20001,
      'Usia mahasiswa tidak boleh dibawah 17 tahun.');
  END IF;

  -- Aturan 2: jurusan wajib diisi
  -- Catatan: di Oracle, string kosong DISIMPAN sebagai NULL,
  -- jadi pemeriksaan IS NULL juga menangkap '' -- khas Oracle.
  IF p_jurusan IS NULL THEN
    RAISE_APPLICATION_ERROR(-20002, 'Jurusan anda harus diisi.');
  END IF;

  INSERT INTO mahasiswa (nim, nama, usia, jurusan)
  VALUES (p_nim, p_nama, p_usia, p_jurusan);
END;
/

-- ---------- Mengujinya ----------
BEGIN
  insert_mahasiswa('H1B026087', 'Karl Lopez', 19, 'Teknik Sipil');
END;
/
-- berhasil

BEGIN
  insert_mahasiswa('G1A025098', 'James Oracle', 16, 'Kedokteran');
END;
/
-- ditolak aturan usia

BEGIN
  insert_mahasiswa('A1B025067', 'Shane Farrel', 19, '');
END;
/
-- ditolak aturan jurusan, karena '' menjadi NULL di Oracle


-- ============================================
-- Menangkap exception bawaan
-- ============================================

DECLARE
  v_nama VARCHAR2(50);
BEGIN
  SELECT nama INTO v_nama FROM mahasiswa WHERE nim = 'TIDAK-ADA';
  DBMS_OUTPUT.PUT_LINE('ketemu: ' || v_nama);

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('NO_DATA_FOUND: tidak ada baris yang cocok');
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('TOO_MANY_ROWS: lebih dari satu baris cocok');
  WHEN OTHERS THEN                 -- WAJIB paling akhir
    DBMS_OUTPUT.PUT_LINE('kode  : ' || SQLCODE);
    DBMS_OUTPUT.PUT_LINE('pesan : ' || SQLERRM);
    RAISE;                         -- lempar ulang, jangan ditelan
END;
/

-- ---------- Menangkap kesalahan buatan sendiri ----------
DECLARE
  e_stok_habis EXCEPTION;
  v_stok NUMBER := 0;
BEGIN
  DBMS_OUTPUT.PUT_LINE('memeriksa stok...');
  IF v_stok <= 0 THEN
    RAISE e_stok_habis;
  END IF;
  DBMS_OUTPUT.PUT_LINE('baris ini TIDAK dijalankan');

EXCEPTION
  WHEN e_stok_habis THEN
    DBMS_OUTPUT.PUT_LINE('Stok habis, pesanan dibatalkan');
END;
/

-- ---------- Menangkap RAISE_APPLICATION_ERROR dari luar ----------
BEGIN
  insert_mahasiswa('X1X000000', 'Uji Coba', 15, 'Informatika');
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('tertangkap di pemanggil');
    DBMS_OUTPUT.PUT_LINE('  SQLCODE = ' || SQLCODE);
    DBMS_OUTPUT.PUT_LINE('  SQLERRM = ' || SQLERRM);
END;
/

-- ---------- YANG TIDAK BOLEH DILAKUKAN ----------
-- BEGIN
--   ...
-- EXCEPTION
--   WHEN OTHERS THEN NULL;    -- menelan SEMUA kesalahan tanpa jejak
-- END;
-- Program lanjut seolah tidak terjadi apa-apa, padahal
-- datanya mungkin sudah rusak dan tak ada satu pun petunjuk.`
  },

  output: `-- insert_mahasiswa('H1B026087', 'Karl Lopez', 19, 'Teknik Sipil');
PL/SQL procedure successfully completed.

-- insert_mahasiswa('G1A025098', 'James Oracle', 16, 'Kedokteran');
ORA-20001: Usia mahasiswa tidak boleh dibawah 17 tahun.
ORA-06512: at "HAFIZH.INSERT_MAHASISWA", line 5

-- insert_mahasiswa('A1B025067', 'Shane Farrel', 19, '');
ORA-20002: Jurusan anda harus diisi.
ORA-06512: at "HAFIZH.INSERT_MAHASISWA", line 10

NO_DATA_FOUND: tidak ada baris yang cocok

memeriksa stok...
Stok habis, pesanan dibatalkan

tertangkap di pemanggil
  SQLCODE = -20001
  SQLERRM = ORA-20001: Usia mahasiswa tidak boleh dibawah 17 tahun.`,

  kesalahanUmum: [
    {
      salah: 'Menulis WHEN OTHERS THEN NULL; untuk membuat program tidak berhenti.',
      kenapa: 'Seluruh kesalahan ditelan tanpa jejak sama sekali, dan program berjalan seolah semuanya normal padahal datanya mungkin sudah rusak. Ketika akhirnya ada yang menyadari data aneh, tidak ada satu pun catatan untuk melacak asalnya. Ini pantas disebut kebiasaan terburuk di PL/SQL.',
      benar: 'Tangkap exception hanya kalau kamu benar-benar bisa menanganinya. Kalau cuma bisa mencatat, catat lalu lempar ulang dengan RAISE; supaya pemanggil tetap tahu.'
    },
    {
      salah: 'Memakai nomor di luar rentang -20000 sampai -20999 pada RAISE_APPLICATION_ERROR.',
      kenapa: 'Rentang itu satu-satunya yang disediakan Oracle untuk kesalahan buatan pengguna; sisanya sudah dipesan Oracle sendiri. Memakai nomor lain langsung ditolak, dan pesan penolakannya tidak selalu menyebutkan penyebabnya dengan jelas.',
      benar: 'Pakai nomor di dalam rentang itu, dan beri nomor berbeda untuk tiap aturan supaya aplikasi pemanggil bisa membedakan penyebab kegagalannya.'
    },
    {
      salah: 'Mengira SELECT INTO akan aman meski hasilnya nol baris atau banyak baris.',
      kenapa: 'SELECT INTO menuntut tepat satu baris. Nol baris melempar NO_DATA_FOUND dan lebih dari satu melempar TOO_MANY_ROWS. Berbeda dari SELECT biasa yang santai mengembalikan berapa pun, sehingga kebiasaan dari SQL biasa terbawa dan blok gagal di keadaan yang tidak diduga.',
      benar: 'Pakai SELECT INTO hanya dengan syarat yang menjamin keunikan, misalnya primary key. Sediakan penangan NO_DATA_FOUND untuk kasus tidak ditemukan.'
    },
    {
      salah: 'Menaruh WHEN OTHERS di urutan pertama pada daftar penangan.',
      kenapa: 'WHEN OTHERS menangkap segalanya, sehingga penangan yang lebih khusus di bawahnya tidak akan pernah tercapai. Oracle memang menolak susunan ini, tetapi kebiasaan menaruhnya di akhir tetap perlu dibangun supaya tidak salah saat menyusun banyak penangan.',
      benar: 'Susun dari yang paling khusus ke yang paling umum, dan letakkan WHEN OTHERS di urutan paling akhir.'
    },
    {
      salah: 'Menyangka string kosong berbeda dari NULL di Oracle.',
      kenapa: 'Oracle menyimpan string kosong sebagai NULL, sehingga pemeriksaan p_jurusan = \'\' tidak akan pernah bernilai benar. Ini kekhususan Oracle yang tidak berlaku di PostgreSQL maupun MySQL, dan asumsi yang terbawa dari DBMS lain akan membuat validasinya gagal diam-diam.',
      benar: 'Periksa dengan IS NULL, yang di Oracle sekaligus menangkap string kosong. Sadari bahwa perilaku ini tidak bisa dibawa ke DBMS lain.'
    }
  ],

  analogi: `Bayangkan petugas pendaftaran di loket kampus.

**Validasi dengan \`RAISE_APPLICATION_ERROR\`** adalah petugas yang menolak berkasmu **sebelum** apa pun dicatat: *"maaf, usia di bawah 17 tidak bisa didaftarkan"*. Berkasnya dikembalikan utuh, tidak ada yang terlanjur masuk sistem.

Perhatikan mengapa validasinya dilakukan **sebelum** pencatatan. Jauh lebih mudah menolak di depan loket daripada mencatat dulu lalu menghapusnya lagi dari buku besar.

**Nomor kesalahan yang berbeda-beda** itu seperti kode penolakan di formulir. Kalau semua penolakan cuma bertuliskan "ditolak", petugas di bagian lain tidak tahu harus berbuat apa. Kalau tertulis kode khusus untuk "usia kurang" dan kode lain untuk "jurusan kosong", bagian informasi bisa langsung mengarahkan yang bersangkutan.

Sekarang **\`WHEN OTHERS THEN NULL;\`**. Itu seperti petugas yang, setiap kali menemukan masalah apa pun, **diam-diam membuang berkasnya ke tong sampah** lalu tersenyum dan bilang *"beres, Pak"*.

Antreannya lancar. Tidak ada yang mengeluh hari itu. Tetapi tiga bulan kemudian, ketika ada yang bertanya kenapa datanya tidak ada, **tidak ada seorang pun yang bisa menjelaskan** — tidak ada catatan, tidak ada jejak, tidak ada yang ingat.

Dan **\`RAISE;\`** setelah mencatat adalah petugas yang bilang: *"saya catat masalahnya di buku, tapi saya teruskan ke atasan — ini bukan wewenang saya untuk memutuskan."* Itulah sikap yang benar ketika kamu tahu ada masalah tetapi tidak bisa menyelesaikannya sendiri.`,

  latihan: [
    'Buat procedure insert_dosen yang menolak NIP kosong dan gaji negatif, masing-masing dengan nomor kesalahan yang berbeda. Uji dengan data sah dan tidak sah.',
    'Jelaskan kenapa SELECT INTO bisa melempar dua jenis exception yang berbeda, dan tuliskan blok yang menangani keduanya.',
    'Jelaskan kenapa WHEN OTHERS THEN NULL; dianggap kebiasaan buruk. Tuliskan versi yang benar kalau kamu memang perlu mencatat kesalahan.',
    'Jelaskan perbedaan exception bernama dan RAISE_APPLICATION_ERROR, lalu sebutkan kapan masing-masing lebih tepat dipakai.',
    'Jelaskan kenapa validasi tetap perlu ada di basis data meskipun aplikasi web sudah memvalidasinya. Sebutkan tiga jalur yang bisa melewati validasi aplikasi.',
    'Jelaskan perilaku Oracle terhadap string kosong, dan kenapa asumsi ini berbahaya kalau dibawa ke PostgreSQL atau MySQL.'
  ]
});

TOPICS.push({
  id: 'bd2-cursor-function',
  judul: 'Cursor & Function',
  kategori: 'basis-data-2',
  tag: ['cursor', 'function', 'FETCH', 'RETURN', 'implicit cursor', 'SQL%ROWCOUNT'],
  ringkas: 'Menelusuri hasil kueri baris demi baris, dan subprogram yang mengembalikan nilai.',

  fungsi: `**Memproses hasil kueri baris demi baris, dan membuat fungsi yang bisa dipakai langsung di dalam SELECT.**

Terpakai di:

- **Pengolahan bertahap** ketika tiap baris butuh perlakuan berbeda
- **Laporan rumit** yang tidak bisa dinyatakan dalam satu kueri
- **Fungsi buatan sendiri** — \`SELECT nim, hitung_ipk(nim) FROM mahasiswa\`
- **Migrasi data** dengan aturan yang bergantung isi tiap baris

Perbedaan pokok yang harus jelas: **procedure melakukan sesuatu, function mengembalikan nilai.**

Dan hanya function yang bisa dipakai di dalam \`SELECT\` — itulah alasan utama memilihnya.

Peringatan kinerja yang penting: **fungsi yang dipanggil di dalam SELECT dijalankan untuk setiap baris.** Kalau di dalamnya ada kueri lagi, sejuta baris berarti sejuta kueri.`,

  praktik: {
    tujuan: `Kamu bisa memproses hasil kueri dengan cursor, membuat fungsi yang dipakai di dalam SELECT, dan mengenali kapan keduanya merugikan kinerja.`,
    alat: [
      'Oracle XE atau Live SQL'
    ],
    langkah: [
      { judul: 'Pakai cursor FOR loop, bukan yang manual',
        isi: `Bentuk manual butuh \`OPEN\`, \`FETCH\`, \`EXIT WHEN NOTFOUND\`, dan \`CLOSE\` — empat tempat untuk salah.

Bentuk singkatnya jauh lebih aman:

- \`FOR r IN (SELECT nim, nama FROM mahasiswa) LOOP ... END LOOP;\`

Ia membuka, mengambil, dan menutup sendiri. Pakai bentuk manual hanya kalau kamu benar-benar butuh kendali tambahan.` },
      { judul: 'Buat function yang mengembalikan nilai',
        isi: `\`CREATE OR REPLACE FUNCTION hitung_ipk(p_nim VARCHAR2) RETURN NUMBER IS ... BEGIN ... RETURN v_ipk; END;\`

Setiap jalur di dalamnya **harus** berakhir pada \`RETURN\`. Jalur yang lupa akan melempar galat saat dijalankan, bukan saat dikompilasi.` },
      { judul: 'Pakai di dalam SELECT',
        isi: `\`SELECT nim, nama, hitung_ipk(nim) AS ipk FROM mahasiswa;\`

Inilah keunggulan function dibanding procedure. Cobalah hal yang sama dengan procedure — tidak bisa.` },
      { judul: 'Ukur biayanya pada tabel besar',
        isi: `Jalankan kueri di atas pada tabel berisi 50.000 mahasiswa, dan ukur waktunya.

Lalu tulis ulang sebagai satu kueri dengan \`JOIN\` dan \`GROUP BY\` tanpa memanggil fungsi sama sekali, dan ukur lagi.

Yang kedua biasanya **jauh** lebih cepat, karena fungsinya tidak dijalankan lima puluh ribu kali.` },
      { judul: 'Pakai cursor berparameter',
        isi: `\`CURSOR c_mhs(p_angkatan NUMBER) IS SELECT ... WHERE angkatan = p_angkatan;\`

Satu cursor bisa dipakai untuk beberapa nilai berbeda, tanpa menulis ulang kuerinya.

Ini setara dengan fungsi berparameter, dan membuat kodemu lebih ringkas.` },
      { judul: 'Kenali BULK COLLECT untuk data banyak',
        isi: `Cursor biasa mengambil **satu baris tiap kali** — dan tiap pengambilan punya biaya.

\`BULK COLLECT INTO\` mengambil banyak baris sekaligus ke dalam koleksi, dan \`FORALL\` memperbarui banyak baris sekaligus.

Untuk puluhan ribu baris, selisihnya sangat besar. Ukur sendiri untuk melihatnya.` }
    ],
    cek: [
      'Cursor FOR loop-mu berjalan tanpa OPEN dan CLOSE manual',
      'Fungsimu bisa dipakai langsung di dalam SELECT',
      'Versi satu kueri terbukti lebih cepat daripada versi yang memanggil fungsi per baris'
    ]
  },
  judulLogicSyntax: 'Bedah Kueri — kenapa ditulis begitu',

  konsep: `
> **Catatan sumber:** dua topik di bagian ini **tidak ada di berkas kuliahmu** — tidak ada contoh cursor maupun function di Procedure.txt, Syntax UAS.txt, maupun tugas kalkulator. Materinya disusun dari silabus PL/SQL baku. Cocokkan lagi kalau slide dosennya ketemu.

**Cursor — penunjuk ke hasil kueri**

\`SELECT INTO\` hanya sanggup satu baris. Untuk menelusuri **banyak baris** satu per satu, dipakai **cursor**.

Cursor adalah **penunjuk** ke daerah kerja tempat hasil kueri disimpan. Kamu menggesernya baris demi baris.

**Cursor eksplisit** punya empat langkah:

- **\`CURSOR nama IS SELECT ...\`** — deklarasi
- **\`OPEN nama;\`** — jalankan kuerinya
- **\`FETCH nama INTO variabel;\`** — ambil satu baris, geser penunjuk
- **\`CLOSE nama;\`** — tutup dan bebaskan sumber daya

**Atribut cursor** untuk memeriksa keadaannya:

- **\`%FOUND\`** — benar kalau FETCH terakhir berhasil
- **\`%NOTFOUND\`** — benar kalau FETCH terakhir gagal. Ini yang dipakai untuk keluar dari loop.
- **\`%ROWCOUNT\`** — jumlah baris yang sudah diambil
- **\`%ISOPEN\`** — benar kalau cursor sedang terbuka

**Cursor FOR loop — bentuk yang dianjurkan**

\`FOR r IN (SELECT ...) LOOP ... END LOOP;\`

Bentuk ini **jauh lebih pendek dan lebih aman**, karena OPEN, FETCH, pemeriksaan \`%NOTFOUND\`, dan CLOSE dilakukan **otomatis**. Bahkan kalau terjadi exception di tengah, cursor-nya tetap ditutup dengan benar.

Untuk hampir semua keperluan, pakai bentuk ini. Cursor eksplisit hanya perlu kalau kamu butuh kendali khusus.

**Cursor implisit**

Setiap perintah SQL biasa juga punya cursor, yang dikelola Oracle sendiri. Atributnya diakses lewat **\`SQL%\`**:

- **\`SQL%ROWCOUNT\`** — berapa baris terpengaruh perintah terakhir. Sangat berguna setelah \`UPDATE\` atau \`DELETE\`.
- **\`SQL%FOUND\`** — benar kalau ada baris yang terpengaruh

**Function — subprogram yang mengembalikan nilai**

Perbedaannya dengan procedure ada empat, dan ini sering ditanyakan:

- Function **wajib** punya klausa **\`RETURN tipe\`** di kepalanya
- Function **wajib** menjalankan \`RETURN nilai;\` di badannya
- Function dipanggil **sebagai bagian ekspresi**, bukan sebagai pernyataan tersendiri
- Function **bisa dipakai di dalam SQL**, procedure tidak bisa

Kemampuan terakhir itu yang paling berguna: kamu bisa menulis \`SELECT nim, hitung_ipk(nim) FROM mahasiswa;\`.

**Kapan memilih yang mana?**

- Menghasilkan **satu nilai**, tanpa mengubah data → **function**
- **Melakukan sesuatu**, mungkin menghasilkan banyak keluaran → **procedure**

Function yang dipakai di dalam SQL sebaiknya **tidak mengubah data** sama sekali. Oracle bahkan melarang sebagian perubahan di dalam function yang dipanggil dari kueri.
`,

  logicSyntax: [
    {
      bahasa: 'sql',
      kode: '-- Cursor eksplisit: empat langkah, dikerjakan sendiri\nDECLARE\n  CURSOR c_mhs IS SELECT nim, nama FROM mahasiswa;\n  v_nim  mahasiswa.nim%TYPE;\n  v_nama mahasiswa.nama%TYPE;\nBEGIN\n  OPEN c_mhs;\n  LOOP\n    FETCH c_mhs INTO v_nim, v_nama;\n    EXIT WHEN c_mhs%NOTFOUND;          -- HARUS sesudah FETCH\n    DBMS_OUTPUT.PUT_LINE(v_nim || \' - \' || v_nama);\n  END LOOP;\n  CLOSE c_mhs;\nEND;\n/',
      penjelasan: `
Perhatikan letak **\`EXIT WHEN c_mhs%NOTFOUND;\`** — ia berada **sesudah** \`FETCH\`, bukan sebelumnya. Ini menentukan, dan salah menaruhnya menghasilkan bug yang khas.

Alasannya: \`%NOTFOUND\` baru punya nilai **setelah** ada percobaan pengambilan. Sebelum \`FETCH\` pertama, nilainya \`NULL\`, dan \`EXIT WHEN NULL\` tidak pernah keluar — sehingga loop berputar selamanya.

Ada kesalahan lain yang lebih licik. Kalau \`EXIT WHEN\` ditaruh **di akhir badan loop**, baris terakhir akan **diproses dua kali**. Sebabnya, ketika \`FETCH\` gagal, isi variabel **tidak berubah** — ia masih memuat nilai dari pengambilan sebelumnya. Program lalu memprosesnya sekali lagi sebelum memeriksa keadaan.

Gejalanya khas dan mudah dikenali: **baris terakhir muncul dua kali** di keluaran. Kalau kamu melihat itu, periksa letak \`EXIT WHEN\`-nya.

Perhatikan juga bahwa **urutan variabel di \`FETCH INTO\` harus cocok** dengan urutan kolom di \`SELECT\`. Kalau tertukar dan tipenya kebetulan sama, tidak akan ada error — datanya cuma masuk ke tempat yang salah. Ini persoalan yang sama dengan \`INSERT\` tanpa menyebut nama kolom.

**\`CLOSE\` wajib.** Cursor yang tidak ditutup terus memakai sumber daya, dan Oracle punya batas jumlah cursor terbuka per sesi. Melebihinya menghasilkan *"maximum open cursors exceeded"* — kesalahan yang muncul jauh di kemudian hari, bukan di tempat kebocorannya.

Semua kerumitan inilah yang membuat **cursor FOR loop** jauh lebih dianjurkan.
`
    },
    {
      bahasa: 'sql',
      kode: '-- Cursor FOR loop: OPEN, FETCH, EXIT, CLOSE otomatis\nBEGIN\n  FOR r IN (SELECT nim, nama FROM mahasiswa) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.nim || \' - \' || r.nama);\n  END LOOP;\nEND;\n/\n\n-- Bandingkan: 12 baris jadi 5 baris,\n-- dan tak mungkin lupa CLOSE',
      penjelasan: `
Bandingkan dengan versi eksplisit sebelumnya. **Dua belas baris menjadi lima**, dan semua jebakan tadi hilang sekaligus.

Yang dikerjakan otomatis:

- **\`OPEN\`** saat loop dimulai
- **\`FETCH\`** tiap putaran
- **Pemeriksaan \`%NOTFOUND\`** dengan letak yang benar
- **\`CLOSE\`** saat loop selesai — **termasuk kalau terjadi exception di tengah**

Poin terakhir itu penting dan sering luput. Pada cursor eksplisit, exception yang terjadi di tengah loop akan melompat ke bagian \`EXCEPTION\` **tanpa menjalankan \`CLOSE\`**, sehingga cursor-nya bocor. Untuk menanganinya dengan benar, kamu perlu menutupnya juga di bagian \`EXCEPTION\` — sesuatu yang mudah terlupakan.

Perhatikan bahwa variabel **\`r\` tidak dideklarasikan**. PL/SQL membuatnya otomatis sebagai record bertipe \`%ROWTYPE\` dari kuerinya. Kolomnya diakses dengan titik: \`r.nim\`, \`r.nama\`.

Sama seperti pencacah \`FOR\` biasa, **\`r\` hanya ada di dalam loop** dan lenyap sesudahnya.

Meski begitu, ingat peringatan dari topik Kontrol Alur: **bentuk mana pun tetap loop.** Kalau pekerjaannya bisa dinyatakan sebagai satu perintah SQL, itu tetap pilihan yang jauh lebih cepat. Cursor FOR loop cuma membuat loop-nya **lebih aman ditulis**, bukan membuatnya **pantas dipakai** untuk pekerjaan yang sebenarnya tidak butuh loop.
`
    },
    {
      bahasa: 'sql',
      kode: 'CREATE OR REPLACE FUNCTION hitung_umur (\n  p_lahir IN DATE\n) RETURN NUMBER                    -- WAJIB, di kepala\nIS\n  v_umur NUMBER;\nBEGIN\n  v_umur := TRUNC(MONTHS_BETWEEN(SYSDATE, p_lahir) / 12);\n  RETURN v_umur;                   -- WAJIB, di badan\nEND;\n/\n\n-- Function bisa dipakai DI DALAM SQL\nSELECT nama, hitung_umur(tgl_lahir) AS umur FROM mahasiswa;\n\n-- Procedure TIDAK bisa dipakai begini',
      penjelasan: `
Perhatikan kata **\`RETURN\` muncul dua kali**, dengan peran yang sama sekali berbeda:

- Di **kepala**, \`RETURN NUMBER\` menyatakan **tipe** nilai yang akan dikembalikan. Perhatikan bahwa di sini juga **tidak boleh diberi ukuran** — \`RETURN VARCHAR2\`, bukan \`RETURN VARCHAR2(50)\`.
- Di **badan**, \`RETURN v_umur;\` benar-benar **mengembalikan nilainya** dan langsung menghentikan function.

Melupakan yang kedua adalah kesalahan yang khas. Function-nya **tetap berhasil dikompilasi**, dan baru gagal **saat dijalankan** dengan pesan *"function returned without value"*. Karena itu pastikan **setiap jalur logika** berakhir dengan \`RETURN\`, termasuk cabang \`ELSE\` terakhir.

Sekarang keunggulan terbesarnya: **function bisa dipanggil di dalam SQL.** Perintah \`SELECT\` di atas menjalankan \`hitung_umur\` untuk **setiap baris** hasil. Procedure tidak bisa dipakai begitu sama sekali.

Ini membuat function sangat berguna untuk perhitungan yang dipakai berulang di banyak kueri — logikanya ditulis sekali, dipakai di mana-mana.

Tetapi ada harganya, dan perlu disadari: function yang dipanggil di dalam \`SELECT\` dijalankan **sekali per baris**. Pada tabel sejuta baris, itu sejuta pemanggilan, masing-masing dengan peralihan antara mesin SQL dan mesin PL/SQL. Kalau perhitungannya sebenarnya bisa dinyatakan langsung sebagai ekspresi SQL biasa, itu akan jauh lebih cepat.

Satu batasan lagi: function yang dipanggil dari kueri **sebaiknya tidak mengubah data**. Oracle bahkan menolak sebagian perubahan di situ, karena hasil kueri jadi bergantung pada urutan pemrosesan baris — dan urutan itu tidak dijamin.
`
    }
  ],

  kode: {
    sql: String.raw`-- ============================================
-- Cursor & Function
-- ============================================

-- ---------- Cursor eksplisit: empat langkah manual ----------
DECLARE
  CURSOR c_mhs IS
    SELECT nim, nama, usia FROM mahasiswa ORDER BY nim;

  v_nim  mahasiswa.nim%TYPE;
  v_nama mahasiswa.nama%TYPE;
  v_usia mahasiswa.usia%TYPE;
BEGIN
  OPEN c_mhs;
  LOOP
    FETCH c_mhs INTO v_nim, v_nama, v_usia;
    EXIT WHEN c_mhs%NOTFOUND;        -- SESUDAH fetch, bukan sebelum
    DBMS_OUTPUT.PUT_LINE(
      c_mhs%ROWCOUNT || '. ' || v_nim || ' - ' || v_nama);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('total dibaca: ' || c_mhs%ROWCOUNT);
  CLOSE c_mhs;                       -- WAJIB
END;
/

-- ---------- Cursor FOR loop: jauh lebih ringkas & aman ----------
BEGIN
  FOR r IN (SELECT nim, nama FROM mahasiswa ORDER BY nim) LOOP
    DBMS_OUTPUT.PUT_LINE(r.nim || ' - ' || r.nama);
  END LOOP;
END;
/

-- ---------- Cursor implisit: memeriksa perintah SQL biasa ----------
BEGIN
  UPDATE mahasiswa SET jurusan = 'Informatika' WHERE usia >= 18;

  IF SQL%FOUND THEN
    DBMS_OUTPUT.PUT_LINE('terpengaruh: ' || SQL%ROWCOUNT || ' baris');
  ELSE
    DBMS_OUTPUT.PUT_LINE('tidak ada baris yang cocok');
  END IF;
END;
/


-- ============================================
-- Function
-- ============================================

CREATE OR REPLACE FUNCTION hitung_umur (
  p_lahir IN DATE
) RETURN NUMBER                      -- tipe, TANPA ukuran
IS
  v_umur NUMBER;
BEGIN
  IF p_lahir IS NULL THEN
    RETURN NULL;                     -- tiap jalur HARUS return
  END IF;

  v_umur := TRUNC(MONTHS_BETWEEN(SYSDATE, p_lahir) / 12);
  RETURN v_umur;
END;
/

CREATE OR REPLACE FUNCTION status_usia (
  p_usia IN NUMBER
) RETURN VARCHAR2
IS
BEGIN
  IF p_usia IS NULL THEN
    RETURN 'tidak diketahui';
  ELSIF p_usia < 17 THEN
    RETURN 'di bawah umur';
  ELSE
    RETURN 'dewasa';
  END IF;
  -- tidak ada jalur tanpa RETURN
END;
/

-- ---------- Dipanggil dari blok PL/SQL ----------
DECLARE
  v_status VARCHAR2(20);
BEGIN
  v_status := status_usia(19);       -- bagian dari EKSPRESI
  DBMS_OUTPUT.PUT_LINE('19 tahun -> ' || v_status);
  DBMS_OUTPUT.PUT_LINE('16 tahun -> ' || status_usia(16));
  DBMS_OUTPUT.PUT_LINE('NULL     -> ' || status_usia(NULL));
END;
/

-- ---------- Dipanggil DI DALAM SQL: ini yang procedure tak bisa ----------
SELECT nim,
       nama,
       usia,
       status_usia(usia) AS keterangan
FROM   mahasiswa
ORDER  BY nim;

-- Catatan kinerja: function di dalam SELECT dijalankan
-- SEKALI PER BARIS. Pada tabel besar, kalau logikanya bisa
-- ditulis langsung sebagai ekspresi SQL, itu jauh lebih cepat.`
  },

  output: `1. A1B025067 - Shane Farrel
2. G1A025098 - James Oracle
3. H1B026087 - Karl Lopez
total dibaca: 3

A1B025067 - Shane Farrel
G1A025098 - James Oracle
H1B026087 - Karl Lopez

terpengaruh: 3 baris

19 tahun -> dewasa
16 tahun -> di bawah umur
NULL     -> tidak diketahui

NIM         NAMA           USIA  KETERANGAN
----------- -------------- ----- ---------------
A1B025067   Shane Farrel      19 dewasa
G1A025098   James Oracle      16 di bawah umur
H1B026087   Karl Lopez        19 dewasa`,

  kesalahanUmum: [
    {
      salah: 'Menaruh EXIT WHEN cursor%NOTFOUND sebelum FETCH, atau di akhir badan loop.',
      kenapa: 'Sebelum FETCH pertama, atribut %NOTFOUND masih NULL sehingga EXIT tidak pernah terjadi dan loop berputar selamanya. Kalau ditaruh di akhir badan loop, baris terakhir diproses dua kali, karena FETCH yang gagal tidak mengubah isi variabel sehingga nilai lama terbaca ulang.',
      benar: 'Letakkan EXIT WHEN tepat setelah FETCH, sebelum badan loop yang memproses datanya. Gejala baris terakhir muncul dua kali adalah petunjuk letaknya salah.'
    },
    {
      salah: 'Lupa menutup cursor eksplisit dengan CLOSE.',
      kenapa: 'Cursor yang terbuka terus memakai sumber daya, dan Oracle membatasi jumlah cursor terbuka per sesi. Melebihinya menghasilkan kesalahan maximum open cursors exceeded, yang muncul jauh di kemudian hari pada operasi yang tidak ada hubungannya, sehingga sangat sulit dilacak ke sumber kebocorannya.',
      benar: 'Pakai cursor FOR loop yang menutup sendiri, termasuk saat terjadi exception. Kalau memakai cursor eksplisit, tutup juga di bagian EXCEPTION.'
    },
    {
      salah: 'Membuat function tanpa RETURN di salah satu jalur logikanya.',
      kenapa: 'Function tetap berhasil dikompilasi, dan baru gagal saat dijalankan dengan pesan function returned without value. Karena kegagalannya hanya muncul pada jalur tertentu, ia bisa lolos pengujian sekilas dan baru muncul di data sungguhan.',
      benar: 'Pastikan setiap cabang, termasuk ELSE terakhir, berakhir dengan RETURN. Telusuri semua jalur logikanya sebelum menganggap selesai.'
    },
    {
      salah: 'Memberi ukuran pada tipe di klausa RETURN, misalnya RETURN VARCHAR2(50).',
      kenapa: 'Sama seperti parameter, tipe kembalian tidak boleh diberi ukuran karena ditentukan oleh nilai yang dihasilkan. Oracle menolaknya saat kompilasi, dan kesalahan ini sering terjadi karena terasa wajar meniru bentuk deklarasi variabel.',
      benar: 'Tulis tipenya saja: RETURN VARCHAR2. Ukuran hanya dipakai saat mendeklarasikan variabel di bagian IS atau DECLARE.'
    },
    {
      salah: 'Memakai function berat di dalam SELECT pada tabel besar.',
      kenapa: 'Function di dalam SELECT dijalankan sekali untuk setiap baris, masing-masing dengan peralihan antara mesin SQL dan mesin PL/SQL. Pada tabel sejuta baris itu sejuta pemanggilan, dan kuerinya bisa berkali lipat lebih lambat daripada versi yang logikanya ditulis langsung sebagai ekspresi SQL.',
      benar: 'Kalau perhitungannya bisa dinyatakan dengan ekspresi SQL biasa, tulis begitu. Sisakan function untuk logika yang memang tidak bisa dinyatakan dalam SQL.'
    }
  ],

  analogi: `Bayangkan sebuah lemari arsip berisi map berkas.

**\`SELECT INTO\`** adalah *"ambilkan map bernomor 123"*. Kalau tidak ada, petugas bingung. Kalau ada dua map dengan nomor sama, dia juga bingung. Ia hanya sanggup menangani **tepat satu**.

**Cursor** adalah **jari yang menyusuri laci**. Kamu buka lacinya (\`OPEN\`), geser jarimu ke map berikutnya (\`FETCH\`), dan begitu jarimu menyentuh udara kosong di ujung laci, kamu tahu sudah habis (\`%NOTFOUND\`). Lalu laci ditutup (\`CLOSE\`).

Dari gambaran ini jelas kenapa **pemeriksaan harus sesudah menggeser jari**. Kamu tidak bisa tahu laci sudah habis sebelum mencoba mengambil. Dan kalau kamu memeriksanya **setelah membaca isi map**, kamu akan **membaca map terakhir dua kali** — sebab saat jarimu menyentuh udara, tanganmu masih memegang map sebelumnya.

**Cursor FOR loop** adalah menyuruh asisten: *"bacakan semua map di laci ini"*. Dia yang membuka, menyusuri, tahu kapan berhenti, dan menutup lacinya — **termasuk kalau kamu tiba-tiba dipanggil keluar ruangan di tengah jalan**. Laci tidak akan tertinggal terbuka.

Untuk **procedure dan function**, bayangkan dua jenis pegawai:

- **Procedure** adalah pegawai yang kamu suruh **melakukan sesuatu**: *"arsipkan berkas ini"*. Dia mengerjakannya. Kalau kamu butuh laporan, dia menuliskannya di kertas yang kamu sediakan — itulah parameter \`OUT\`.
- **Function** adalah pegawai yang kamu **tanyai**: *"berapa umur orang ini?"*. Dia menjawab dengan satu angka, dan jawabannya bisa langsung kamu pakai di tengah kalimat.

Karena function **menjawab**, ia bisa disisipkan ke dalam pertanyaan yang lebih besar: *"daftarkan semua orang beserta umurnya"*. Procedure tidak bisa — kamu tidak bisa menyisipkan "arsipkan berkas ini" ke tengah sebuah pertanyaan.`,

  latihan: [
    'Tuliskan blok yang menelusuri seluruh baris tabel mahasiswa memakai cursor eksplisit, lengkap dengan OPEN, FETCH, EXIT WHEN, dan CLOSE.',
    'Tulis ulang blok tersebut memakai cursor FOR loop, lalu jelaskan empat hal yang dikerjakan otomatis oleh bentuk itu.',
    'Jelaskan apa yang terjadi kalau EXIT WHEN cursor%NOTFOUND ditaruh di akhir badan loop, dan apa gejala yang terlihat di keluaran.',
    'Buat function hitung_ipk yang menerima NIM dan mengembalikan IPK. Panggil dari blok PL/SQL, lalu panggil lagi dari dalam sebuah SELECT.',
    'Sebutkan empat perbedaan procedure dan function, lalu tentukan mana yang lebih tepat untuk: mencatat transaksi, menghitung diskon, dan mengirim laporan.',
    'Jelaskan kenapa function di dalam SELECT bisa memperlambat kueri pada tabel besar, dan kapan sebaiknya logikanya ditulis langsung sebagai ekspresi SQL.'
  ]
});

