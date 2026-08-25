/* ============================================================
   algoritma-dasar.js — materi kategori "algoritma"
   Cara menambah topik: salin satu blok TOPICS.push({...}) di bawah,
   ganti isinya. Lihat README.md untuk arti tiap kolom.
   PENTING: kode ditulis dengan String.raw`...` supaya backslash
   seperti \n tetap utuh apa adanya.
   ============================================================ */

TOPICS.push({
  id: 'variabel',
  judul: 'Variabel, Tipe Data & Operator',
  kategori: 'algoritma',
  tag: ['variabel', 'tipe data', 'operator', 'deklarasi', 'casting'],
  ringkas: 'Tempat menyimpan data, jenis-jenisnya, dan cara mengolahnya — fondasi semua materi setelah ini.',

  fungsi: `**Menyimpan data dengan tipe yang tepat — dan menghindari bug yang muncul justru karena tipenya salah.**

Ini terdengar mendasar, tetapi kesalahan tipe adalah penyebab bug yang paling sering ditemui pemula:

- **Uang disimpan sebagai \`float\`** → total belanja meleset satu rupiah, dan tidak ada yang tahu dari mana
- **\`int\` dipakai untuk NIK atau nomor telepon** → nol di depan hilang, atau angkanya meluap
- **Pembagian dua \`int\`** → \`7 / 2\` menghasilkan 3 di C++ dan Java, bukan 3,5
- **Membandingkan \`float\` dengan \`==\`** → \`0.1 + 0.2 == 0.3\` bernilai salah

Terpakai di seluruh mata kuliah setelahnya: kolom basis data punya tipe, JSON punya tipe, dan kesalahan yang sama muncul lagi di sana.

Yang paling menghemat waktu: **memilih tipe dengan sadar di awal**, bukan memakai \`int\` untuk semuanya lalu menambal saat angkanya aneh.`,

  praktik: {
    tujuan: `Kamu bisa memilih tipe data yang tepat untuk tiap kebutuhan, dan sudah melihat sendiri tiga kegagalan klasik yang muncul kalau salah pilih.`,
    alat: [
      'Compiler C/C++ (gcc atau g++) atau Python 3',
      'Editor teks'
    ],
    langkah: [
      { judul: 'Buktikan sendiri masalah float pada uang',
        isi: `Jalankan \`print(0.1 + 0.2)\` di Python. Hasilnya **bukan** 0.3.

Lalu coba \`print(0.1 + 0.2 == 0.3)\` — hasilnya \`False\`.

Sebabnya: pecahan desimal seperti 0,1 **tidak bisa diwakili tepat** dalam biner, sama seperti sepertiga tidak bisa ditulis tepat dalam desimal.` },
      { judul: 'Pakai cara yang benar untuk uang',
        isi: `Dua pilihan yang aman:

- **simpan dalam satuan terkecil sebagai bilangan bulat** — rupiah disimpan sebagai rupiah penuh
- **pakai tipe desimal khusus** — \`Decimal\` di Python, \`BigDecimal\` di Java, \`DECIMAL\` di SQL

Coba \`from decimal import Decimal\` lalu bandingkan \`Decimal("0.1") + Decimal("0.2")\` dengan \`Decimal("0.3")\`. Sekarang hasilnya benar.

Perhatikan tanda kutipnya — \`Decimal(0.1)\` tanpa kutip tetap salah, karena pecahannya sudah rusak sebelum sampai.` },
      { judul: 'Lihat pembagian bilangan bulat',
        isi: `Di C++ atau Java, jalankan \`7 / 2\`. Hasilnya **3**, bukan 3,5.

Perbaikannya: ubah salah satu ke pecahan, misalnya \`7.0 / 2\` atau \`(double)a / b\`.

Di Python, \`/\` selalu menghasilkan pecahan dan \`//\` menghasilkan bulat. Ketahui yang mana yang sedang kamu pakai.` },
      { judul: 'Coba luapan bilangan',
        isi: `Di C atau C++, isi sebuah \`int\` dengan 2147483647 lalu tambah satu. Hasilnya jadi **negatif**.

Itu batas \`int\` 32 bit. Untuk NIK 16 digit, \`int\` **jauh** tidak cukup — dan menyimpannya sebagai angka juga menghilangkan nol di depan.

**NIK, nomor telepon, dan kode pos disimpan sebagai teks**, karena ia pengenal, bukan bilangan yang akan dihitung.` },
      { judul: 'Buat tabel keputusan tipe untukmu sendiri',
        isi: `Tulis di catatanmu:

- jumlah yang dihitung → \`int\` atau \`long\`
- uang → bilangan bulat satuan terkecil, atau \`Decimal\`
- pengukuran ilmiah → \`double\`
- pengenal seperti NIK, telepon, kode pos → **teks**
- ya atau tidak → \`bool\`
- pilihan terbatas → \`enum\`

Tabel ini akan kamu pakai lagi persis sama saat merancang tabel basis data.` },
      { judul: 'Beri nama yang menyebut satuannya',
        isi: `\`durasi\` tidak memberi tahu apa-apa. \`durasi_detik\` menghilangkan seluruh kelas kesalahan.

Begitu juga \`harga_rupiah\`, \`jarak_meter\`, dan \`ukuran_byte\`.

Kesalahan satuan adalah salah satu bug termahal yang pernah ada, dan penamaan bisa mencegahnya secara gratis.` }
    ],
    cek: [
      `Perbandingan \`0.1 + 0.2 == 0.3\` bernilai salah dengan float, dan benar dengan Decimal berbasis teks`,
      'Kamu bisa menyebutkan alasan kenapa NIK disimpan sebagai teks, bukan angka',
      'Semua variabel di satu berkas kodemu punya nama yang menyebut satuan bila relevan'
    ]
  },

  konsep: `
**Variabel** adalah **nama untuk sepetak memori** tempat menyimpan data yang bisa berubah-ubah selama program berjalan. Alih-alih menghafal "data saya ada di alamat 0x7ffd4c2a", kita cukup memberinya nama seperti \`umur\`, lalu kompiler yang mengurus alamatnya.

**Tipe data** menjawab dua pertanyaan sekaligus, dan inilah yang sering terlewat:

- **Sebesar apa petak memorinya?** \`char\` cukup 1 byte, \`int\` umumnya 4 byte, \`double\` 8 byte.
- **Bagaimana pola bit di dalamnya dibaca?** Deretan bit yang sama persis bisa berarti angka \`65\`, huruf \`'A'\`, atau pecahan — tergantung tipenya. Bit-nya identik; **tipenyalah yang menentukan artinya**.

Karena itu C dan C++ disebut **statically typed**: tipe wajib ditulis saat deklarasi dan tidak bisa berubah, sebab kompiler harus tahu ukurannya **sebelum** program berjalan. Sementara Python **dynamically typed**: tipe ditentukan otomatis saat program berjalan dan bisa berganti kapan saja, karena setiap nilai membawa informasi tipenya sendiri.

Tipe dasar yang wajib kamu kuasai:

- **\`int\`** — bilangan bulat, misal \`-5\`, \`0\`, \`2024\`
- **\`float\` / \`double\`** — bilangan pecahan; \`double\` dua kali lebih teliti dan jadi pilihan bawaan
- **\`char\`** — satu karakter, ditulis dengan kutip tunggal: \`'A'\`
- **\`bool\`** — hanya \`true\` atau \`false\`

**Operator** adalah alat pengolahnya, dibagi jadi beberapa kelompok: **aritmetika** (\`+ - * / %\`), **perbandingan** (\`== != < > <= >=\`), **logika** (\`&& || !\`), dan **penugasan** (\`= += -= *= /=\`). Yang menghasilkan **nilai** dipakai untuk menghitung; yang menghasilkan **benar/salah** dipakai untuk mengambil keputusan di materi percabangan nanti.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int umur = 20;\n//  ^    ^     ^\n// tipe nama nilai awal',
      penjelasan: `
Satu baris ini sebenarnya memerintahkan tiga hal sekaligus kepada kompiler:

- **\`int\`** → "pesankan memori seukuran bilangan bulat, umumnya 4 byte, dan baca isinya sebagai bilangan bulat"
- **\`umur\`** → "beri petak itu nama \`umur\`, supaya saya tidak perlu menyebut alamatnya"
- **\`= 20\`** → "isi langsung dengan 20"

Bagian \`= 20\` disebut **inisialisasi** dan sifatnya opsional — tapi **sangat disarankan**. Kalau ditulis \`int umur;\` saja, petak memorinya berisi **sampah** dari data lama pemakai sebelumnya, bukan otomatis 0. Membacanya sebelum diisi memberi angka acak yang berbeda tiap kali dijalankan, dan bug seperti ini sulit dilacak karena gejalanya tidak konsisten.
`
    },
    {
      bahasa: 'c',
      kode: 'int a = 7, b = 2;\nprintf("%d", a / b);        // 3, bukan 3.5 !\nprintf("%f", (float)a / b); // 3.500000',
      penjelasan: `
Ini kejutan pertama yang hampir selalu dialami mahasiswa baru.

Aturannya: **kalau kedua operandnya bilangan bulat, maka pembagiannya juga pembagian bulat.** Hasilnya dipotong (bukan dibulatkan) — bagian desimalnya langsung dibuang. Jadi \`7 / 2\` menghasilkan \`3\`, dan \`9 / 10\` menghasilkan \`0\`.

Kompiler memutuskan jenis operasi berdasarkan **tipe operandnya**, bukan berdasarkan tipe variabel penampungnya. Karena itu \`float hasil = 7 / 2;\` tetap menghasilkan \`3.0\` — pembagiannya sudah terlanjur dilakukan sebagai bilangan bulat sebelum nilainya disimpan.

Perbaikannya adalah **casting**: ubah salah satu operand jadi pecahan lebih dulu dengan \`(float)a / b\`. Cukup satu saja yang di-cast, karena begitu ada satu operand pecahan, C otomatis menaikkan yang lain agar setipe.
`
    },
    {
      bahasa: 'c',
      kode: 'printf("%d", 7 % 2);    // 1  -> sisa bagi\nprintf("%d", 8 % 2);    // 0  -> habis dibagi, berarti genap',
      penjelasan: `
Operator \`%\` disebut **modulo**, dan hasilnya adalah **sisa pembagian** — bukan hasil baginya. Di C dan C++, \`%\` hanya berlaku untuk bilangan bulat; memakainya pada \`float\` langsung ditolak kompiler.

Ada tiga kegunaan yang akan terus kamu pakai:

- **Cek ganjil/genap** → \`if (n % 2 == 0)\` berarti genap
- **Ambil digit terakhir** → \`123 % 10\` menghasilkan \`3\`
- **Membuat nilai berputar** → \`i % 7\` selalu menghasilkan 0 sampai 6, berguna untuk hari dalam seminggu atau *circular queue*

Satu catatan yang perlu kamu tahu sebagai asprak: untuk bilangan negatif, **C dan Python memberi hasil berbeda**. \`-7 % 2\` menghasilkan \`-1\` di C, tapi \`1\` di Python. Penyebabnya, C memotong pembagian ke arah nol sedangkan Python membulatkan ke bawah. Kalau ada mahasiswa yang bingung karena hasilnya beda, inilah jawabannya.
`
    },
    {
      bahasa: 'c',
      kode: 'if (x = 5) { ... }    // SALAH: mengisi, hasilnya selalu benar\nif (x == 5) { ... }   // BENAR: membandingkan',
      penjelasan: `
Satu tanda \`=\` adalah **penugasan** (isi nilai), dua tanda \`==\` adalah **perbandingan** (tanya sama atau tidak). Keduanya beda pekerjaan meski cuma beda satu karakter.

Kenapa versi salahnya berbahaya? Karena \`x = 5\` di C bukan sekadar mengisi — ia juga **menghasilkan nilai**, yaitu 5. Lalu C menganggap semua angka selain nol sebagai **benar**. Jadi \`if (x = 5)\` selalu dianggap benar, sekaligus diam-diam mengubah \`x\` menjadi 5. Programnya tetap bisa dikompilasi, dan bug-nya cuma menyisakan peringatan yang mudah terlewat.

Trik pencegahan yang layak kamu ajarkan: aktifkan peringatan kompiler dengan \`gcc -Wall\`. Kompiler akan memberi tanda pada pola mencurigakan seperti ini.
`
    },
    {
      bahasa: 'c',
      kode: 'double a = 0.1 + 0.2;\nprintf("%.20f", a);        // 0.30000000000000004441\nif (a == 0.3) { ... }      // TIDAK terpenuhi!',
      penjelasan: `
Ini bukan bug bahasa C, melainkan sifat mendasar semua bilangan pecahan di komputer.

Komputer menyimpan angka dalam **basis 2**. Sama seperti \`1/3\` tidak bisa ditulis pas dalam basis 10 (0.333... tak pernah habis), angka \`0.1\` juga **tidak bisa ditulis pas dalam basis 2**. Yang tersimpan hanyalah nilai yang sangat mendekati, dan galat kecil itu menumpuk saat dihitung.

Akibatnya, **jangan pernah membandingkan bilangan pecahan dengan \`==\`**. Cara yang benar adalah memeriksa apakah selisihnya cukup kecil:

\`if (fabs(a - 0.3) < 0.000001) { ... }\`

Nilai pembanding kecil itu biasa disebut *epsilon*. Fungsi \`fabs\` ada di \`<math.h>\`. Perlu ditekankan: aturan ini berlaku di **semua** bahasa, termasuk Python dan Java — bukan kelemahan C.
`
    },
    {
      bahasa: 'python',
      kode: 'umur = 20          # tanpa tipe — Python menebak sendiri\nprint(7 / 2)       # 3.5   -> selalu pecahan\nprint(7 // 2)      # 3     -> pembagian bulat\nprint(2 ** 100)    # muat! int Python tak terbatas',
      penjelasan: `
Tiga perbedaan penting Python yang wajib kamu tahu supaya bisa menjelaskan saat mahasiswa membandingkan bahasa.

**Pertama, tipe tidak ditulis.** Python menyimpulkannya dari nilai yang diberikan, dan tipe sebuah nama bahkan boleh berganti di tengah program. Enak dipakai, tapi kesalahan tipe jadi baru ketahuan saat program berjalan — bukan saat dikompilasi seperti di C.

**Kedua, tanda \`/\` selalu menghasilkan pecahan**, bahkan \`4 / 2\` menghasilkan \`2.0\`. Untuk pembagian bulat gunakan \`//\`. Ini kebalikan dari C, dan jadi sumber kebingungan saat mahasiswa berpindah bahasa.

**Ketiga, \`int\` Python tidak punya batas atas.** Ia otomatis melebar sesuai kebutuhan, sehingga \`2 ** 100\` tetap tepat. Di C, \`int\` 4 byte hanya menampung sampai sekitar 2,1 miliar — melebihi itu terjadi **overflow** dan nilainya berputar menjadi negatif tanpa peringatan apa pun.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    static void Main() {
        // Tipe ditulis eksplisit, sama seperti C++
        int    umur   = 20;
        double ipk    = 3.75;
        char   nilai  = 'A';          // kutip TUNGGAL
        bool   lulus  = true;
        string nama   = "Budi";       // string = tipe bawaan, bukan array

        // var: tipe ditebak kompiler, TAPI tetap tetap saat kompilasi
        var x = 10;                   // x pasti int selamanya

        Console.WriteLine($"nama  : {nama}");
        Console.WriteLine($"umur  : {umur}");
        Console.WriteLine($"ipk   : {ipk:F2}");   // F2 = 2 angka desimal
        Console.WriteLine($"nilai : {nilai}");
        Console.WriteLine($"lulus : {lulus}");    // tercetak True/False

        Console.WriteLine($"\nukuran int    : {sizeof(int)} byte");
        Console.WriteLine($"ukuran double : {sizeof(double)} byte");

        // Jebakan pembagian bulat SAMA seperti C dan C++
        int a = 7, b = 2;
        Console.WriteLine($"\na / b            = {a / b}   <- dipotong");
        Console.WriteLine($"(double)a / b    = {(double)a / b}");
        Console.WriteLine($"a % b            = {a % b}");

        // C# punya decimal: lebih teliti untuk uang
        decimal harga = 19.99m;       // akhiran m wajib
        Console.WriteLine($"\ndecimal untuk uang : {harga}");

        // Jebakan pecahan yang berlaku di SEMUA bahasa
        Console.WriteLine($"\n0.1 + 0.2       = {0.1 + 0.2}");
        Console.WriteLine($"apakah == 0.3 ? {0.1 + 0.2 == 0.3}");
        Console.WriteLine($"cara benar      : {Math.Abs((0.1 + 0.2) - 0.3) < 1e-9}");

        // int C# punya batas, berbeda dari Python
        Console.WriteLine($"\nint terbesar : {int.MaxValue}");
        Console.WriteLine($"ditambah 1   : {int.MaxValue + 1}  <- overflow!");
    }
}`,

    java: String.raw`public class Contoh {
    public static void main(String[] args) {
        // Tipe primitif ditulis eksplisit, sama seperti C++
        int     umur  = 20;
        double  ipk   = 3.75;
        char    nilai = 'A';           // kutip TUNGGAL
        boolean lulus = true;
        String  nama  = "Budi";        // String huruf besar: ini OBJECT

        System.out.println("nama  : " + nama);
        System.out.println("umur  : " + umur);
        System.out.printf("ipk   : %.2f%n", ipk);
        System.out.println("nilai : " + nilai);
        System.out.println("lulus : " + lulus);

        // Java tidak punya sizeof, tapi ukurannya PASTI sama di semua sistem
        System.out.println("\nint    : " + Integer.BYTES + " byte (selalu)");
        System.out.println("double : " + Double.BYTES + " byte (selalu)");

        // Jebakan pembagian bulat SAMA seperti C dan C++
        int a = 7, b = 2;
        System.out.println("\na / b         = " + (a / b) + "   <- dipotong");
        System.out.println("(double)a / b = " + ((double) a / b));
        System.out.println("a % b         = " + (a % b));

        // Jebakan pecahan
        System.out.println("\n0.1 + 0.2       = " + (0.1 + 0.2));
        System.out.println("apakah == 0.3 ? " + (0.1 + 0.2 == 0.3));
        System.out.println("cara benar      : " + (Math.abs((0.1 + 0.2) - 0.3) < 1e-9));

        // int Java punya batas
        System.out.println("\nint terbesar : " + Integer.MAX_VALUE);
        System.out.println("ditambah 1   : " + (Integer.MAX_VALUE + 1) + "  <- overflow!");

        // Kalau butuh bilangan besar tanpa batas seperti Python:
        java.math.BigInteger besar = java.math.BigInteger.TWO.pow(100);
        System.out.println("\n2 pangkat 100 : " + besar);
    }
}`,

    js: String.raw`// JavaScript dinamis seperti Python — tipe tidak ditulis
let umur = 20;                  // let  = boleh diubah
const NAMA = "Budi";            // const = tidak boleh ditugasi ulang
let ipk = 3.75;
let lulus = true;

console.log("nama  :", NAMA, "->", typeof NAMA);
console.log("umur  :", umur, "->", typeof umur);
console.log("ipk   :", ipk, "->", typeof ipk);
console.log("lulus :", lulus, "->", typeof lulus);

// PERBEDAAN BESAR: JavaScript TIDAK punya tipe int terpisah.
// Semua angka adalah double 64-bit, jadi 7/2 langsung 3.5.
console.log("\n7 / 2            =", 7 / 2);              // 3.5, bukan 3
console.log("Math.floor(7 / 2) =", Math.floor(7 / 2));   // 3 -> pembagian bulat
console.log("Math.trunc(-7 / 2)=", Math.trunc(-7 / 2));  // -3, memotong ke nol
console.log("7 % 2            =", 7 % 2);
console.log("2 ** 10          =", 2 ** 10);              // pangkat

console.log("\ntypeof 5   :", typeof 5);
console.log("typeof 5.5 :", typeof 5.5, " <- keduanya 'number'");

// Jebakan pecahan yang sama seperti bahasa lain
console.log("\n0.1 + 0.2       =", 0.1 + 0.2);
console.log("apakah === 0.3 ?", 0.1 + 0.2 === 0.3);
console.log("cara benar      :", Math.abs((0.1 + 0.2) - 0.3) < 1e-9);

// Angka aman hanya sampai 2^53. Lebih dari itu pakai BigInt.
console.log("\nangka bulat aman :", Number.MAX_SAFE_INTEGER);
console.log("BigInt 2^100     :", 2n ** 100n);

// Tipe boleh berganti di tengah jalan (seperti Python)
let x = 10;
console.log("\nx =", x, typeof x);
x = "sepuluh";
console.log("x =", x, typeof x);

// JEBAKAN KHAS JAVASCRIPT: + pada string dan angka
console.log("\n'5' + 3 =", "5" + 3, " <- jadi teks '53'");
console.log("'5' - 3 =", "5" - 3, " <- justru jadi angka 2");
console.log("-> selalu konversi dulu: Number('5') + 3 =", Number("5") + 3);`,

    c: String.raw`#include <stdio.h>

int main(void) {
    /* Deklarasi + inisialisasi */
    int    umur   = 20;
    float  tinggi = 167.5;
    double ipk    = 3.75;
    char   nilai  = 'A';        // kutip TUNGGAL untuk satu karakter

    printf("umur   : %d\n", umur);
    printf("tinggi : %.1f\n", tinggi);      // %.1f -> 1 angka di belakang koma
    printf("ipk    : %.2f\n", ipk);
    printf("nilai  : %c\n", nilai);

    /* Ukuran tiap tipe di komputer ini */
    printf("\nukuran int    : %d byte\n", (int)sizeof(int));
    printf("ukuran float  : %d byte\n", (int)sizeof(float));
    printf("ukuran double : %d byte\n", (int)sizeof(double));
    printf("ukuran char   : %d byte\n", (int)sizeof(char));

    /* Aritmetika: perhatikan jebakan pembagian bulat */
    int a = 7, b = 2;
    printf("\na + b      = %d\n", a + b);
    printf("a / b      = %d   <- dipotong, bukan dibulatkan\n", a / b);
    printf("a %% b      = %d   <- sisa bagi\n", a % b);
    printf("(float)a/b = %.2f <- diperbaiki dengan casting\n", (float)a / b);

    /* Operator penugasan singkat */
    int skor = 10;
    skor += 5;                  // sama dengan: skor = skor + 5
    printf("\nskor setelah += 5 : %d\n", skor);

    /* Perbandingan menghasilkan 1 (benar) atau 0 (salah) */
    printf("apakah 7 > 2 ? %d\n", 7 > 2);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <iomanip>              // untuk setprecision
using namespace std;

int main() {
    int    umur   = 20;
    float  tinggi = 167.5;
    double ipk    = 3.75;
    char   nilai  = 'A';
    bool   lulus  = true;       // C++ punya bool asli

    cout << "umur   : " << umur   << endl;
    cout << "tinggi : " << tinggi << endl;
    cout << "ipk    : " << fixed << setprecision(2) << ipk << endl;
    cout << "nilai  : " << nilai  << endl;
    cout << "lulus  : " << lulus  << endl;          // tercetak 1, bukan "true"
    cout << "lulus  : " << boolalpha << lulus << endl;  // baru tercetak true

    // auto: tipe ditebak kompiler, TAPI tetap ditetapkan saat kompilasi
    auto x = 10;        // x pasti int selamanya
    auto y = 3.14;      // y pasti double selamanya

    cout << "\nukuran int    : " << sizeof(int)    << " byte" << endl;
    cout << "ukuran double : " << sizeof(double)   << " byte" << endl;

    int a = 7, b = 2;
    cout << "\na / b          = " << a / b << "  <- masih dipotong" << endl;
    cout << "(double)a / b  = " << (double)a / b << endl;
    cout << "a % b          = " << a % b << endl;

    return 0;
}`,

    python: String.raw`# Python tidak menulis tipe — nilainya yang menentukan
umur   = 20            # int
tinggi = 167.5         # float
nilai  = 'A'           # str (Python tidak punya tipe char terpisah)
lulus  = True          # bool, huruf T besar

print("umur   :", umur,   "->", type(umur).__name__)
print("tinggi :", tinggi, "->", type(tinggi).__name__)
print("nilai  :", nilai,  "->", type(nilai).__name__)
print("lulus  :", lulus,  "->", type(lulus).__name__)

# Pembagian: ada dua macam, dan ini beda dengan C
print("\n7 / 2  =", 7 / 2)     # 3.5  -> selalu pecahan
print("7 // 2 =", 7 // 2)      # 3    -> pembagian bulat
print("7 % 2  =", 7 % 2)       # 1    -> sisa bagi
print("7 ** 2 =", 7 ** 2)      # 49   -> pangkat (C tidak punya operator ini)

# int Python tidak punya batas atas
print("\n2 pangkat 100 =", 2 ** 100)

# Tipe boleh berganti di tengah jalan (tidak mungkin di C)
x = 10
print("\nx =", x, type(x).__name__)
x = "sepuluh"
print("x =", x, type(x).__name__)

# Konversi tipe dilakukan manual
teks = "25"
print("\n'25' + 5 sebagai angka =", int(teks) + 5)

# Jebakan pecahan yang berlaku di SEMUA bahasa
print("\n0.1 + 0.2       =", 0.1 + 0.2)
print("apakah == 0.3 ? ", 0.1 + 0.2 == 0.3)
print("cara benar      :", abs((0.1 + 0.2) - 0.3) < 1e-9)`
  },

  output: `umur   : 20
tinggi : 167.5
ipk    : 3.75
nilai  : A

ukuran int    : 4 byte
ukuran float  : 4 byte
ukuran double : 8 byte
ukuran char   : 1 byte

a + b      = 9
a / b      = 3   <- dipotong, bukan dibulatkan
a % b      = 1   <- sisa bagi
(float)a/b = 3.50 <- diperbaiki dengan casting

skor setelah += 5 : 15
apakah 7 > 2 ? 1`,

  kesalahanUmum: [
    {
      salah: 'Mengira `float rata = 7 / 2;` menghasilkan 3.5',
      kenapa: 'Pembagiannya dikerjakan lebih dulu sebagai **bilangan bulat** karena kedua operandnya `int`, menghasilkan 3. Baru setelah itu angka 3 disimpan ke variabel `float` menjadi 3.0. Tipe penampung **tidak** memengaruhi cara operasi dihitung.',
      benar: 'Cast salah satu operand sebelum dibagi: `float rata = (float)7 / 2;`. Pada kasus menghitung rata-rata dari `jumlah / n` yang keduanya `int`, kesalahan ini paling sering terjadi.'
    },
    {
      salah: 'Memakai `=` padahal maksudnya membandingkan: `if (nilai = 100)`',
      kenapa: '`=` mengisi nilai, bukan membandingkan. Ekspresi `nilai = 100` menghasilkan 100, dan C menganggap semua angka bukan nol sebagai benar — sehingga kondisinya **selalu** terpenuhi sekaligus merusak isi `nilai`. Programnya tetap bisa dikompilasi.',
      benar: 'Gunakan `==` untuk membandingkan. Biasakan mengompilasi dengan `gcc -Wall` agar pola berisiko seperti ini diberi peringatan.'
    },
    {
      salah: 'Memakai variabel yang belum diisi: `int total; total += 10;`',
      kenapa: '`total` masih berisi sampah dari pemakai memori sebelumnya, bukan 0. Hasilnya jadi angka acak yang **berbeda-beda tiap kali dijalankan** — kadang malah kebetulan benar saat diuji, lalu salah di komputer lain.',
      benar: 'Selalu inisialisasi saat deklarasi: `int total = 0;`. Khusus untuk variabel penampung penjumlahan atau pencacah, ini wajib hukumnya.'
    },
    {
      salah: 'Membandingkan bilangan pecahan dengan `==`',
      kenapa: 'Bilangan pecahan disimpan sebagai hampiran dalam basis 2, sehingga `0.1 + 0.2` sebenarnya bernilai `0.30000000000000004`. Perbandingan persisnya gagal padahal secara matematika benar.',
      benar: 'Bandingkan selisihnya: `if (fabs(a - b) < 1e-9)`. Berlaku di semua bahasa pemrograman, bukan cuma C.'
    },
    {
      salah: "Tertukar kutip tunggal dan ganda di C: `char nilai = \"A\";`",
      kenapa: "Di C, `'A'` adalah satu **karakter** (1 byte), sedangkan `\"A\"` adalah **string** (2 byte: huruf A plus penanda akhir `\\0`). Menyimpan string ke variabel `char` membuat kompiler protes soal ketidakcocokan tipe.",
      benar: "Gunakan kutip tunggal untuk satu karakter: `char nilai = 'A';`. Untuk teks panjang pakai `char nama[50] = \"Budi\";`. Catatan: di Python keduanya sama saja, jadi mahasiswa yang datang dari Python sering tersandung di sini."
    }
  ],

  analogi: `
Gambarkan **loker penitipan di perpustakaan** di papan tulis.

Setiap loker punya **nomor** (alamat memori) dan diberi **label nama** (nama variabel). Kamu tidak menyebut "loker 0x7ffd", cukup bilang "loker Budi" — itulah gunanya nama variabel.

Untuk menjelaskan **tipe data**, tekankan bahwa lokernya **berbeda-beda ukuran**: ada loker kecil untuk satu kartu (\`char\`, 1 byte), ada yang sedang (\`int\`, 4 byte), ada yang besar (\`double\`, 8 byte). Pertanyaan pancingannya: *"Kenapa tidak semua dibuat besar saja?"* Jawabannya boros — dan pada data jutaan baris, pemborosan itu terasa nyata.

Untuk **pembagian bulat**, pakai contoh yang langsung terasa: *"7 permen dibagi 2 anak, tiap anak dapat berapa permen utuh?"* Jawabannya 3, dan sisa 1 permen itulah hasil \`7 % 2\`. Mahasiswa langsung paham bahwa hasilnya bukan 3,5 karena permennya tidak dibelah.

Untuk **variabel yang belum diinisialisasi**, pakai analogi loker bekas: *"Kamu buka loker yang baru saja ditinggal orang lain. Isinya belum tentu kosong — bisa jadi ada barang sisa."* Karena itu selalu dibersihkan dulu dengan \`= 0\`.
`,

  latihan: [
    'Buat program yang meminta panjang dan lebar persegi panjang (boleh pecahan), lalu menampilkan luas dan kelilingnya dengan 2 angka di belakang koma.',
    'Minta pengguna memasukkan satu bilangan bulat 3 digit, lalu tampilkan digitnya satu per satu dan jumlahkan. Petunjuk: pakai `% 10` dan `/ 10` berulang. Contoh: `472` menghasilkan `4 7 2` dengan jumlah `13`.',
    'Tanpa menjalankan programnya, tebak hasil tiap baris ini lalu buktikan: `9 / 2`, `9 % 2`, `9.0 / 2`, `(int)9.7`, `-7 % 2`. Jelaskan kenapa hasil terakhir berbeda antara C dan Python.',
    'Buat program konversi suhu Celsius ke Fahrenheit dengan rumus `F = C * 9 / 5 + 32`. Uji dengan input `100` — kalau hasilnya salah, jelaskan penyebabnya dan perbaiki.',
    'Uji pemahaman: jelaskan ulang dalam 2 menit dengan kata-katamu sendiri tentang kenapa `int rata = (80 + 75) / 2;` benar tapi `int rata = 80 / 2 + 75 / 2;` bisa berbeda hasilnya. Pakai contoh angka yang membuat perbedaannya terlihat.'
  ]
});

TOPICS.push({
  id: 'input-output',
  judul: 'Input & Output',
  kategori: 'algoritma',
  tag: ['input', 'output', 'printf', 'scanf', 'cin', 'cout', 'format specifier'],
  ringkas: 'Cara program berbicara dengan pengguna — plus tabel format specifier yang wajib dihafal.',

  fungsi: `**Membuat program yang menerima data dari luar — dan tidak rusak ketika datanya tidak sesuai harapan.**

Setiap program yang berguna menerima masukan. Yang membedakan program yang layak dipakai adalah **apa yang terjadi ketika masukannya salah**.

Terpakai di:

- **Program baris perintah dan tugas praktikum** — hampir semua soal meminta masukan pengguna
- **Membaca berkas** — polanya sama, sumbernya saja berbeda
- **Formulir web** di Pemrograman Web — validasi masukan adalah topik yang sama
- **Keamanan** — masukan yang tidak divalidasi adalah pintu masuk SQL injection dan XSS

Yang paling sering menjatuhkan pemula: program yang **langsung mati** ketika pengguna mengetik huruf di tempat yang meminta angka. Padahal menanganinya cukup beberapa baris.

Dan satu jebakan khas C++: mencampur \`cin >>\` dengan \`getline\` tanpa membersihkan sisa baris.`,

  praktik: {
    tujuan: `Kamu punya pola baku membaca masukan yang tidak pernah membuat program mati, dan tahu cara memformat keluaran agar rapi.`,
    alat: [
      'Python 3 atau C++ dengan g++',
      'Terminal'
    ],
    langkah: [
      { judul: 'Tulis versi paling naif dulu, lalu rusakkan',
        isi: `Buat program yang meminta umur lalu mencetaknya.

Jalankan, dan ketik **"dua puluh"** alih-alih angka. Programnya mati dengan pesan galat.

Melihat kegagalannya sendiri jauh lebih melekat daripada sekadar diberi tahu bahwa ia bisa gagal.` },
      { judul: 'Bungkus dengan penanganan galat',
        isi: `Di Python, bungkus pembacaannya:

- \`try:\` lalu \`n = int(input("Umur: "))\`
- \`except ValueError:\` lalu beri pesan dan ulangi

Bungkus lagi dalam \`while True\` sehingga pengguna diminta terus sampai memberi angka yang sah, lalu keluar dengan \`break\`.` },
      { judul: 'Tambahkan pemeriksaan rentang',
        isi: `Angka yang **bentuknya** sah belum tentu **masuk akal**. Umur negatif lima atau lima ratus lolos dari \`int()\` tetapi jelas salah.

Tambahkan pemeriksaan batas, dan **sebutkan batasnya di pesan galat** — jangan cuma bilang "masukan tidak valid". Pengguna tidak bisa menebak apa yang kamu harapkan.` },
      { judul: 'Buat satu fungsi yang bisa dipakai ulang',
        isi: `Gabungkan langkah kedua dan ketiga menjadi satu fungsi, misalnya \`baca_angka(pesan, minimal, maksimal)\`.

Setelah ini, setiap tugas praktikum yang meminta masukan bisa memakainya. Kamu menulisnya sekali dan memakainya puluhan kali.` },
      { judul: 'Rapikan keluarannya',
        isi: `Keluaran yang rapi memudahkan **kamu sendiri** memeriksa hasilnya.

- Python: \`f"{nama:<20}{nilai:>8.2f}"\` — rata kiri 20 kolom, rata kanan 8 kolom, dua desimal
- C: \`printf("%-20s%8.2f", nama, nilai)\`
- C++: \`cout << setw(20) << left << nama\`, butuh \`#include <iomanip>\`

Angka yang rata kanan jauh lebih mudah dibandingkan daripada yang rata kiri.` },
      { judul: 'Kenali jebakan cin dan getline di C++',
        isi: `Setelah \`cin >> umur;\`, karakter Enter **masih tertinggal** di aliran masukan. \`getline\` berikutnya langsung membaca sisa itu dan mengembalikan teks kosong.

Perbaikannya: panggil \`cin.ignore(numeric_limits<streamsize>::max(), 10);\` sebelum \`getline\`, dengan 10 adalah kode karakter baris baru.

Ini penyebab bug "kenapa nama saya tidak terbaca" yang hampir setiap mahasiswa alami sekali.` }
    ],
    cek: [
      'Program tidak mati ketika kamu mengetik huruf di tempat yang meminta angka',
      'Pesan galatmu menyebutkan rentang yang diharapkan, bukan sekadar "tidak valid"',
      'Di C++, nama yang dibaca dengan getline setelah cin tidak lagi kosong'
    ]
  },

  konsep: `
Program yang tidak bisa menerima masukan hanya akan mengerjakan hal yang sama terus-menerus. **Input dan output** adalah pintu yang membuat program terasa hidup: pengguna memberi data, program mengolah, lalu hasilnya ditampilkan.

Alur bakunya selalu tiga langkah, dan urutan ini penting: **tampilkan petunjuk → baca masukan → tampilkan hasil**. Langkah pertama sering dilupakan, padahal tanpa itu pengguna cuma melihat layar kosong berkedip tanpa tahu harus mengetik apa.

Setiap bahasa punya alatnya sendiri:

- **C** memakai \`printf\` dan \`scanf\` dari \`<stdio.h>\`. Keduanya butuh **format specifier** — kode seperti \`%d\` yang memberitahu jenis data yang sedang diproses.
- **C++** memakai \`cout\` dan \`cin\` dari \`<iostream>\`. Tidak perlu format specifier karena tipenya dikenali otomatis.
- **Python** memakai \`print()\` dan \`input()\`. Paling ringkas, tapi ada satu jebakan besar: \`input()\` **selalu** mengembalikan teks.

Kenapa C perlu format specifier sedangkan yang lain tidak? Karena \`printf\` adalah fungsi biasa yang menerima argumen sebanyak apa pun, sehingga ia **tidak punya cara mengetahui tipe** yang dikirim. Kodemu-lah yang memberitahunya lewat \`%d\`, \`%f\`, dan seterusnya. Kalau kode itu salah, \`printf\` tetap menurut dan salah membaca memorinya — inilah sumber banyak keluaran aneh di praktikum.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int umur = 20;\nprintf("Umur: %d tahun\\n", umur);\n//             ^^          ^^^\n//        penampung    diisi dari sini',
      penjelasan: `
\`printf\` bekerja seperti **formulir isian**. Teks di dalam tanda kutip adalah formulirnya, dan setiap \`%d\` adalah **kotak kosong** yang akan diisi oleh nilai dari argumen setelahnya, berurutan dari kiri ke kanan.

Kalau ada dua kotak, harus ada dua nilai: \`printf("%d dan %d", a, b);\`

Bagian \`\\n\` bukan huruf n biasa, melainkan **escape sequence** yang berarti *newline* alias pindah baris. Tanpa itu, keluaran berikutnya menempel di baris yang sama. Escape lain yang sering dipakai: \`\\t\` untuk tab, \`\\\\\` untuk backslash, dan \`%%\` untuk mencetak tanda persen.
`
    },
    {
      bahasa: 'c',
      kode: 'printf("%.2f", 3.14159);   // 3.14\nprintf("%5d", 42);         // "   42"  (lebar 5, rata kanan)\nprintf("%-5d|", 42);       // "42   |" (rata kiri)',
      penjelasan: `
Format specifier bisa diberi pengatur tambahan, dan tiga ini paling sering dipakai untuk merapikan tabel.

- **\`%.2f\`** → tampilkan **2 angka** di belakang koma. Angkanya dibulatkan, bukan dipotong.
- **\`%5d\`** → sediakan lebar **minimal 5 karakter**, ditempatkan rata kanan. Berguna agar kolom angka lurus.
- **\`%-5d\`** → tanda minus membalik perataannya menjadi rata kiri.

Keduanya boleh digabung: \`%8.2f\` berarti lebar 8 karakter dengan 2 angka desimal. Inilah cara membuat tabel rapi di terminal tanpa perlu pustaka tambahan — sangat berguna saat membuat program menu di praktikum.
`
    },
    {
      bahasa: 'c',
      kode: 'int umur;\nscanf("%d", &umur);      // WAJIB pakai &\n\nchar nama[50];\nscanf("%s", nama);       // TANPA & karena array sudah alamat',
      penjelasan: `
Perbedaan mendasar antara \`printf\` dan \`scanf\`: \`printf\` cuma **membaca** nilai, sedangkan \`scanf\` harus **menulis ke dalam** variabelmu.

Karena semua argumen di C dikirim sebagai salinan, \`scanf\` mustahil mengubah variabel asli kalau hanya menerima nilainya. Ia butuh **alamat**, dan itulah gunanya \`&\`. Tanpa \`&\`, \`scanf\` menerima nilai sampah, menganggapnya alamat, lalu menulis ke sana — hasilnya *segmentation fault*.

Pengecualiannya adalah **array**, termasuk string. Nama array otomatis berarti alamat elemen pertamanya, jadi \`nama\` sudah merupakan alamat dan tidak perlu \`&\` lagi.

Ini dibahas tuntas di topik **Pointer**; untuk sekarang cukup ingat aturannya: **variabel biasa pakai \`&\`, array tidak.**
`
    },
    {
      bahasa: 'c',
      kode: 'scanf("%f", &nilaiFloat);    // %f  untuk float\nscanf("%lf", &nilaiDouble);  // %lf untuk double\n\nprintf("%f", nilaiFloat);    // di printf, %f melayani KEDUANYA',
      penjelasan: `
Inilah ketidaksimetrisan C yang paling sering menjatuhkan mahasiswa, dan sering luput dijelaskan.

**Pada \`scanf\`, \`%f\` dan \`%lf\` berbeda dan tidak boleh tertukar.** \`%f\` menulis sebanyak 4 byte (ukuran \`float\`), sedangkan \`%lf\` menulis 8 byte (ukuran \`double\`). Memakai \`%f\` untuk variabel \`double\` hanya mengisi separuhnya sehingga nilainya kacau — dan sebaliknya, \`%lf\` untuk \`float\` menulis melewati batas variabel.

**Pada \`printf\`, keduanya sama saja.** Alasannya, argumen bertipe \`float\` otomatis dinaikkan menjadi \`double\` saat dikirim ke fungsi dengan argumen tak tentu seperti \`printf\`. Jadi \`printf\` memang hanya pernah menerima \`double\`.

Ringkasnya: **saat membaca harus tepat, saat mencetak lebih longgar.** Gejalanya khas — nilai tercetak sebagai \`0.000000\` atau angka raksasa yang tidak masuk akal.
`
    },
    {
      bahasa: 'c',
      kode: 'scanf("%d", &umur);\nscanf("%c", &huruf);       // langsung terlewat!\n\nscanf(" %c", &huruf);      // spasi di depan %c memperbaikinya',
      penjelasan: `
Bug klasik yang membuat program "melompati" satu input tanpa sebab yang terlihat.

Saat pengguna mengetik \`20\` lalu menekan Enter, \`scanf("%d", ...)\` mengambil angka \`20\` tapi **meninggalkan karakter Enter** di dalam antrean masukan. Ketika \`scanf("%c", ...)\` dijalankan, ia langsung mengambil karakter Enter yang tertinggal itu — sehingga terkesan tidak menunggu ketikan sama sekali.

Perbaikannya cukup menambahkan **satu spasi sebelum \`%c\`**: \`scanf(" %c", &huruf);\`. Spasi itu memerintahkan \`scanf\` melewati semua karakter kosong yang tersisa, termasuk Enter dan spasi.

Kenapa \`%d\` dan \`%s\` tidak bermasalah? Karena keduanya memang otomatis melewati karakter kosong di depan. Hanya \`%c\` yang menerima apa adanya, karena spasi pun dianggap karakter yang sah.
`
    },
    {
      bahasa: 'cpp',
      kode: 'int umur;\ncin >> umur;              // tidak perlu & dan tidak perlu %d\n\nstring nama;\ncin >> nama;              // berhenti di SPASI pertama\ngetline(cin, nama);       // membaca satu baris penuh',
      penjelasan: `
C++ menyederhanakan dua hal sekaligus: tidak butuh format specifier karena tipenya sudah diketahui kompiler, dan tidak butuh \`&\` karena \`>>\` sudah dirancang menerima referensi.

Tapi ada jebakan penting: **\`cin >> nama\` berhenti di spasi pertama.** Jika pengguna mengetik \`Budi Santoso\`, yang tersimpan hanya \`Budi\` — sisanya tertinggal di antrean dan akan terbaca oleh input berikutnya.

Untuk membaca satu baris penuh gunakan \`getline(cin, nama)\`. Namun kalau sebelumnya ada \`cin >> umur\`, karakter Enter tertinggal seperti kasus \`%c\` tadi, sehingga \`getline\` langsung membaca baris kosong.

Obatnya: sisipkan \`cin.ignore();\` di antaranya. Persoalannya sama persis dengan \`scanf(" %c")\`, cuma beda tampilannya.
`
    },
    {
      bahasa: 'python',
      kode: 'umur = input("Umur: ")        # SELALU bertipe teks\nprint(umur + 5)               # TypeError!\n\numur = int(input("Umur: "))   # dikonversi dulu\nprint(umur + 5)               # baru bisa dihitung',
      penjelasan: `
Jebakan nomor satu bagi pemula Python: **\`input()\` selalu mengembalikan \`str\`, apa pun yang diketik.** Mengetik \`20\` menghasilkan teks \`"20"\`, bukan angka \`20\`.

Akibatnya \`umur + 5\` gagal dengan \`TypeError\`, karena Python menolak menjumlahkan teks dengan angka. Lebih menyesatkan lagi, \`umur * 2\` **tidak** error — hasilnya \`"2020"\`, karena mengalikan teks berarti mengulangnya.

Karena itu bungkus dengan konverter yang sesuai: \`int()\` untuk bilangan bulat, \`float()\` untuk pecahan. Kalau pengguna mengetik sesuatu yang bukan angka, \`int()\` akan melempar \`ValueError\` — dan itu justru bagus, karena kesalahannya ketahuan langsung.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    static void Main() {
        // Console.ReadLine() SELALU mengembalikan string —
        // persis seperti input() di Python
        Console.Write("Masukkan nama : ");
        string nama = Console.ReadLine();

        Console.Write("Masukkan umur : ");
        int umur = int.Parse(Console.ReadLine());     // WAJIB dikonversi

        Console.Write("Masukkan IPK  : ");
        double ipk = double.Parse(Console.ReadLine());

        Console.WriteLine("\n===== DATA MAHASISWA =====");

        // String interpolation: cara yang paling dianjurkan
        Console.WriteLine($"Nama : {nama}");
        Console.WriteLine($"Umur : {umur} tahun");
        Console.WriteLine($"IPK  : {ipk:F2}");        // F2 = 2 angka desimal

        // Perataan kolom: angka negatif = rata kiri, positif = rata kanan
        Console.WriteLine();
        Console.WriteLine($"{"Item",-10}|{"Nilai",8}");
        Console.WriteLine($"{"Umur",-10}|{umur,8}");
        Console.WriteLine($"{"IPK",-10}|{ipk,8:F2}");

        // Cara lain: format bergaya printf
        Console.WriteLine("\n{0,-10}|{1,8:F2}", "IPK", ipk);

        // TryParse: aman kalau pengguna mengetik yang bukan angka
        Console.Write("\nMasukkan angka : ");
        if (int.TryParse(Console.ReadLine(), out int angka)) {
            Console.WriteLine($"Angkanya {angka}");
        } else {
            Console.WriteLine("Itu bukan angka!");
        }
    }
}`,

    java: String.raw`import java.util.Scanner;

public class Contoh {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Masukkan umur : ");
        int umur = input.nextInt();          // membaca angka saja

        // JEBAKAN KLASIK: nextInt() TIDAK ikut membaca Enter,
        // sehingga nextLine() berikutnya langsung menyambar sisa Enter itu.
        input.nextLine();                    // WAJIB, untuk membuang sisanya

        System.out.print("Masukkan nama : ");
        String nama = input.nextLine();      // boleh mengandung spasi

        System.out.print("Masukkan IPK  : ");
        double ipk = input.nextDouble();

        System.out.println("\n===== DATA MAHASISWA =====");
        System.out.println("Nama : " + nama);
        System.out.println("Umur : " + umur + " tahun");
        System.out.printf("IPK  : %.2f%n", ipk);      // %n = baris baru

        // Perataan kolom, sama seperti printf di C
        System.out.println();
        System.out.printf("%-10s|%8s%n", "Item", "Nilai");
        System.out.printf("%-10s|%8d%n", "Umur", umur);
        System.out.printf("%-10s|%8.2f%n", "IPK", ipk);

        // String.format menghasilkan teks, bukan langsung mencetak
        String ringkas = String.format("%s (%d th)", nama, umur);
        System.out.println("\nringkas : " + ringkas);

        input.close();
    }
}`,

    js: String.raw`// Di browser tidak ada stdin. Contoh ini memakai Node.js.
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membaca masukan bersifat asinkron — beda besar dengan bahasa lain
rl.question("Masukkan nama : ", function (nama) {
    rl.question("Masukkan umur : ", function (umurTeks) {

        // Sama seperti Python dan C#, masukan SELALU berupa teks
        const umur = Number(umurTeks);       // atau parseInt(umurTeks)

        console.log("\n===== DATA MAHASISWA =====");
        console.log("Nama :", nama);
        console.log("Umur :", umur, "tahun");

        // Membentuk teks: pakai + karena template literal tidak bisa
        // dipakai di berkas materi ini
        console.log("Ringkas : " + nama + " (" + umur + " th)");

        // Mengatur jumlah angka desimal
        const ipk = 3.756;
        console.log("IPK  :", ipk.toFixed(2));        // "3.76"

        // Perataan kolom
        console.log();
        console.log("Item".padEnd(10) + "|" + "Nilai".padStart(8));
        console.log("Umur".padEnd(10) + "|" + String(umur).padStart(8));
        console.log("IPK".padEnd(10) + "|" + ipk.toFixed(2).padStart(8));

        // JEBAKAN: lupa konversi
        console.log("\numurTeks + 1 =", umurTeks + 1, " <- teks disambung!");
        console.log("umur + 1     =", umur + 1, " <- baru dijumlahkan");

        rl.close();
    });
});

// Catatan: di browser, padanannya adalah prompt() dan alert(),
// tetapi keduanya jarang dipakai di aplikasi sungguhan.`,

    c: String.raw`#include <stdio.h>

int main(void) {
    char  nama[50];
    int   umur;
    float ipk;
    char  gender;

    /* Selalu beri petunjuk dulu, jangan biarkan layar kosong */
    printf("Masukkan nama    : ");
    scanf("%s", nama);              // TANPA & karena array

    printf("Masukkan umur    : ");
    scanf("%d", &umur);             // WAJIB &

    printf("Masukkan IPK     : ");
    scanf("%f", &ipk);              // %f untuk float

    printf("Gender (L/P)     : ");
    scanf(" %c", &gender);          // spasi di depan %c membuang sisa Enter

    /* Menampilkan hasil dengan format rapi */
    printf("\n===== DATA MAHASISWA =====\n");
    printf("Nama   : %s\n", nama);
    printf("Umur   : %d tahun\n", umur);
    printf("IPK    : %.2f\n", ipk);          // 2 angka desimal
    printf("Gender : %c\n", gender);

    /* Perataan kolom supaya tabel lurus */
    printf("\n%-10s|%8s\n", "Item", "Nilai");
    printf("%-10s|%8d\n", "Umur", umur);
    printf("%-10s|%8.2f\n", "IPK", ipk);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string nama;
    int    umur;
    float  ipk;

    cout << "Masukkan nama : ";
    getline(cin, nama);          // membaca SATU BARIS penuh, boleh ada spasi

    cout << "Masukkan umur : ";
    cin >> umur;

    cout << "Masukkan IPK  : ";
    cin >> ipk;

    // Kalau setelah ini mau getline lagi, wajib bersihkan sisa Enter:
    // cin.ignore();

    cout << "\n===== DATA MAHASISWA =====" << endl;
    cout << "Nama : " << nama << endl;
    cout << "Umur : " << umur << " tahun" << endl;
    cout << "IPK  : " << fixed << setprecision(2) << ipk << endl;

    // Perataan kolom memakai setw
    cout << "\n" << left  << setw(10) << "Item"
         << "|" << right << setw(8)  << "Nilai" << endl;
    cout << left  << setw(10) << "Umur"
         << "|" << right << setw(8)  << umur << endl;
    cout << left  << setw(10) << "IPK"
         << "|" << right << setw(8)  << ipk  << endl;

    return 0;
}`,

    python: String.raw`# input() SELALU mengembalikan teks, jadi wajib dikonversi
nama = input("Masukkan nama : ")              # tetap teks, tidak apa-apa
umur = int(input("Masukkan umur : "))         # dikonversi ke int
ipk  = float(input("Masukkan IPK  : "))       # dikonversi ke float

print("\n===== DATA MAHASISWA =====")

# Cara 1: dipisah koma (otomatis diberi spasi)
print("Nama :", nama)

# Cara 2: f-string — paling nyaman dan paling sering dipakai
print(f"Umur : {umur} tahun")
print(f"IPK  : {ipk:.2f}")                    # :.2f -> 2 angka desimal

# Mengatur lebar kolom di dalam f-string
print()
print(f"{'Item':<10}|{'Nilai':>8}")           # <10 rata kiri, >8 rata kanan
print(f"{'Umur':<10}|{umur:>8}")
print(f"{'IPK':<10}|{ipk:>8.2f}")

# print punya pengatur sep dan end
print()
print("a", "b", "c", sep="-")                 # a-b-c
print("tanpa pindah baris...", end="")
print(" <- lanjut di baris yang sama")`
  },

  output: `Masukkan nama    : Budi
Masukkan umur    : 20
Masukkan IPK     : 3.75
Gender (L/P)     : L

===== DATA MAHASISWA =====
Nama   : Budi
Umur   : 20 tahun
IPK    : 3.75
Gender : L

Item      |   Nilai
Umur      |      20
IPK       |    3.75`,

  kesalahanUmum: [
    {
      salah: 'Lupa `&` pada scanf variabel biasa: `scanf("%d", umur);`',
      kenapa: '`scanf` menerima nilai sampah yang ada di `umur` dan memperlakukannya sebagai alamat tujuan penulisan. Akibatnya *segmentation fault*, atau memori lain tertimpa diam-diam.',
      benar: 'Tulis `scanf("%d", &umur);`. Ingat aturannya: **variabel biasa pakai `&`, array/string tidak.**'
    },
    {
      salah: 'Tertukar `%f` dan `%lf` di scanf: `double x; scanf("%f", &x);`',
      kenapa: '`%f` hanya mengisi 4 byte pertama padahal `double` butuh 8 byte, sehingga nilainya kacau — biasanya tercetak `0.000000` atau angka raksasa. Kompiler tidak selalu memperingatkan.',
      benar: 'Di **scanf**: `%f` untuk `float`, `%lf` untuk `double`. Di **printf**, `%f` melayani keduanya karena `float` otomatis dinaikkan jadi `double`.'
    },
    {
      salah: 'Input `%c` terlewat setelah `scanf("%d", ...)`',
      kenapa: 'Karakter Enter dari input sebelumnya masih tertinggal di antrean masukan, lalu langsung disambar oleh `%c`. Program terkesan melompati satu pertanyaan tanpa alasan.',
      benar: 'Tambahkan satu spasi sebelum `%c`: `scanf(" %c", &huruf);`. Di C++, persoalan yang sama diatasi dengan `cin.ignore();` sebelum `getline`.'
    },
    {
      salah: 'Di C++, memakai `cin >> nama` untuk nama yang mengandung spasi.',
      kenapa: '`>>` berhenti di karakter kosong pertama. Mengetik `Budi Santoso` hanya menyimpan `Budi`, sedangkan `Santoso` tertinggal di antrean dan terbaca oleh input berikutnya — sering terlihat seperti input berikutnya "terlewat".',
      benar: 'Gunakan `getline(cin, nama);` untuk membaca satu baris penuh. Kalau sebelumnya ada `cin >> angka`, sisipkan `cin.ignore();` dulu.'
    },
    {
      salah: 'Di Python, lupa mengonversi: `umur = input("Umur: ")` lalu `umur + 1`',
      kenapa: '`input()` selalu menghasilkan `str`, sehingga `umur + 1` gagal dengan `TypeError`. Yang lebih menyesatkan, `umur * 2` justru **tidak** error melainkan menghasilkan `"2020"` karena teks digandakan.',
      benar: 'Bungkus sejak awal: `umur = int(input("Umur: "))`. Untuk pecahan gunakan `float(...)`.'
    }
  ],

  analogi: `
Untuk \`printf\`, pakai analogi **formulir dengan titik-titik**. Tulis di papan: *"Nama saya ...... , umur saya ...... tahun."* Titik-titik itulah \`%s\` dan \`%d\`, dan nilai setelah koma adalah jawaban yang mengisinya **berurutan**. Kalau titik-titiknya ada dua tapi jawabannya cuma satu, formulirnya jadi kacau — persis seperti \`printf\` yang kekurangan argumen.

Untuk \`scanf\` yang butuh \`&\`, pakai analogi **kurir paket**: *"Kurir mau mengantar barang ke rumahmu. Kamu kasih dia alamat rumah, atau kamu kasih foto isi kamarmu?"* Karena \`scanf\` bertugas **menaruh** data, ia jelas butuh alamat.

Untuk jebakan **Enter yang tertinggal**, peragakan dengan antrean orang: ketik \`20\` lalu Enter berarti ada **dua** orang mengantre — angka 20 dan si Enter. \`%d\` cuma mengambil yang pertama, jadi si Enter masih berdiri di antrean dan langsung disambar \`%c\` berikutnya. Setelah divisualkan begini, mahasiswa jarang lupa lagi.

Untuk Python, tekankan satu kalimat kunci: **"\`input()\` itu selalu mengembalikan teks, titik."** Peragakan \`"20" * 2\` yang menghasilkan \`"2020"\` — reaksi terkejut mahasiswa biasanya membuat pelajaran ini melekat.
`,

  latihan: [
    'Buat program yang meminta nama, NIM, dan tiga nilai ujian, lalu menampilkan rata-ratanya dengan 2 angka di belakang koma. Pastikan rata-ratanya benar (hati-hati jebakan pembagian bulat).',
    'Buat tabel perkalian 1–5 yang kolomnya lurus rapi memakai `%4d` di C, `setw(4)` di C++, atau f-string di Python. Bandingkan hasilnya bila pengatur lebar itu dihapus.',
    'Buat program yang meminta nama lengkap (mengandung spasi) **dan** umur secara berurutan. Kerjakan di C++ — kalau inputnya terlewat, jelaskan penyebabnya dan perbaiki dengan `cin.ignore()`.',
    'Sengaja tulis `scanf("%d", umur);` tanpa `&`, jalankan, lalu catat apa yang terjadi di komputermu. Setelah itu perbaiki. Pengalaman melihat error-nya langsung akan sangat berguna saat kamu mengajar nanti.',
    'Uji pemahaman: buat satu halaman contekan format specifier (`%d %f %lf %c %s %.2f %5d`) lengkap dengan contoh keluarannya, untuk kamu pakai sendiri saat mengulang materi.'
  ]
});

TOPICS.push({
  id: 'percabangan',
  judul: 'Percabangan (if, switch, ternary)',
  kategori: 'algoritma',
  tag: ['if', 'else', 'switch', 'ternary', 'kondisi', 'percabangan'],
  ringkas: 'Cara program mengambil keputusan — memilih jalan berdasarkan kondisi yang sedang berlaku.',

  fungsi: `**Membuat program mengambil keputusan — dengan syarat yang benar dan tidak saling menutupi.**

Setiap program yang lebih dari sekadar menghitung punya percabangan. Yang membedakan kode yang bisa dipelihara adalah **bagaimana cabangnya disusun**.

Terpakai di:

- **Penentuan nilai huruf, diskon, kategori** — soal praktikum yang paling lazim
- **Validasi** — memutuskan data diterima atau ditolak
- **Alur bisnis** — status pesanan, hak akses, jalur persetujuan
- **Uji Kualitas Perangkat Lunak** — tiap cabang adalah jalur yang harus diuji, dan jumlahnya menentukan berapa kasus uji yang dibutuhkan

Kesalahan yang paling mahal: **urutan cabang yang salah**. Kalau \`nilai >= 60\` diperiksa sebelum \`nilai >= 85\`, maka **tidak ada** yang pernah mendapat A — dan programnya tetap berjalan tanpa galat apa pun.`,

  praktik: {
    tujuan: `Kamu bisa menyusun percabangan berjenjang dengan urutan yang benar, dan sudah membuktikan sendiri bahwa urutan yang salah memberi hasil salah tanpa galat.`,
    alat: [
      'Python 3 atau C++',
      'Kertas untuk menggambar rentangnya'
    ],
    langkah: [
      { judul: 'Gambar rentangnya di garis bilangan dulu',
        isi: `Sebelum menulis kode, gambar garis 0 sampai 100 dan tandai batas tiap nilai huruf.

Ini sepuluh detik yang menghemat setengah jam, karena kamu langsung melihat **apakah ada rentang yang bertumpang atau bolong**.` },
      { judul: 'Tulis dari syarat yang PALING KETAT',
        isi: `Untuk rentang menurun, mulai dari batas tertinggi:

- \`if nilai >= 85:\` hasilkan A
- \`elif nilai >= 75:\` hasilkan B
- \`elif nilai >= 65:\` hasilkan C
- \`else:\` hasilkan D

Karena \`elif\` hanya diperiksa kalau yang di atasnya salah, kamu **tidak perlu** menulis batas bawah dan atas sekaligus. Menuliskannya justru memperbesar peluang salah ketik.` },
      { judul: 'Buktikan bahwa urutan terbalik gagal diam-diam',
        isi: `Balik urutannya — taruh \`nilai >= 65\` paling atas. Jalankan dengan nilai 90.

Hasilnya **C**. Tidak ada galat, tidak ada peringatan. Program berjalan sempurna dan memberi jawaban yang salah.

Inilah kenapa urutan cabang perlu diperiksa dengan sengaja, bukan diandaikan benar.` },
      { judul: 'Uji tepat di batasnya',
        isi: `Jangan uji dengan 90, 80, dan 70. Uji dengan **84, 85, 86** lalu **74, 75, 76**.

Di situlah kesalahan \`>\` versus \`>=\` bersembunyi, dan itu satu-satunya tempat ia terlihat.

Kamu akan bertemu prinsip ini lagi dengan nama **boundary value analysis**.` },
      { judul: 'Pakai guard clause untuk mengurangi kedalaman',
        isi: `Alih-alih membungkus seluruh isi fungsi dalam \`if (valid) { ... }\`, tulis \`if (!valid) return;\` lalu sisa fungsinya rata kiri.

Setiap tingkat bersarang menambah beban baca. Kode yang bersarang empat tingkat hampir selalu bisa diratakan, dan ini penerapan **kontraposisi** dari Logika Informatika.` },
      { judul: 'Kenali kapan switch lebih tepat',
        isi: `\`switch\` cocok untuk **nilai tepat** yang jumlahnya sedikit: kode menu, hari, status.

\`if-else\` cocok untuk **rentang** dan syarat majemuk.

Dan di C, C++, serta Java, **jangan lupa \`break\`**. Tanpa itu eksekusinya jatuh ke cabang berikutnya, dan itu bug yang sangat sulit dilihat karena kodenya terlihat benar.` }
    ],
    cek: [
      'Nilai 85 tepat memberi A, dan 84 memberi B — batasnya benar',
      `Kamu sudah menjalankan versi dengan urutan terbalik dan melihat sendiri ia salah tanpa galat`,
      'Tidak ada percabangan yang bersarang lebih dari dua tingkat di kodemu'
    ]
  },

  konsep: `
Sampai sekarang program kita berjalan lurus dari atas ke bawah. **Percabangan** memberinya kemampuan **memilih**: kerjakan blok ini kalau kondisinya terpenuhi, kerjakan blok itu kalau tidak.

Semua percabangan bertumpu pada satu hal: sebuah **kondisi** yang hasil akhirnya cuma dua kemungkinan — **benar** atau **salah**. Kondisi dibangun dari operator perbandingan (\`== != < > <= >=\`) dan bisa digabung dengan operator logika:

- **\`&&\` (DAN)** — benar hanya bila **kedua** sisi benar
- **\`||\` (ATAU)** — benar bila **salah satu** sisi benar
- **\`!\` (BUKAN)** — membalik hasilnya

Hal penting yang khas C dan C++: sebenarnya **tidak ada tipe benar/salah** di baliknya. Yang ada hanya angka, dengan aturan **nol berarti salah, selain nol berarti benar**. Karena itu \`if (5)\` sah dan selalu terpenuhi, dan \`if (jumlah)\` adalah cara ringkas menulis \`if (jumlah != 0)\`. Python punya \`True\`/\`False\` sungguhan, tapi juga menganggap \`0\`, \`""\`, dan \`[]\` sebagai salah.

Ada tiga bentuk yang perlu kamu kuasai beserta kapan memakainya:

- **\`if / else if / else\`** — paling luwes, sanggup menangani rentang seperti \`nilai >= 80\`. Ini pilihan bawaanmu.
- **\`switch\`** — rapi untuk membandingkan **satu variabel** dengan **banyak nilai persis**, misalnya pilihan menu 1/2/3. Tidak bisa untuk rentang.
- **Ternary (\`? :\`)** — bentuk singkat untuk memilih **satu nilai** saja, cocok dipakai langsung di dalam ekspresi.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'if (nilai >= 80) {\n    printf("A");\n} else if (nilai >= 70) {\n    printf("B");\n} else {\n    printf("C");\n}',
      penjelasan: `
Yang wajib dipahami di sini adalah **urutan pemeriksaannya**, karena inilah sumber bug paling sering pada percabangan bertingkat.

Kondisi diperiksa **satu per satu dari atas**. Begitu ada yang terpenuhi, bloknya dijalankan lalu **seluruh rantai sisanya dilewati** — tidak diperiksa lagi sama sekali.

Karena itu \`nilai = 85\` mencetak \`A\`, dan pemeriksaan \`nilai >= 70\` tidak pernah sampai dijalankan meskipun 85 juga memenuhi syarat itu.

Akibat praktisnya: **rantai harus disusun dari syarat paling ketat ke paling longgar.** Kalau dibalik menjadi \`if (nilai >= 70)\` di posisi pertama, maka nilai 85 akan mendapat \`B\` — dan cabang \`A\` menjadi kode mati yang tidak pernah tercapai. Kompiler tidak menganggap ini error, jadi bug-nya hanya ketahuan lewat pengujian.

Perhatikan juga bahwa \`else\` tidak punya kondisi: ia adalah **penampung terakhir** untuk semua kasus yang tidak tertangkap di atasnya.
`
    },
    {
      bahasa: 'c',
      kode: 'if (0 <= nilai <= 100) { ... }   // SALAH di C, selalu benar!\nif (nilai >= 0 && nilai <= 100) { ... }   // BENAR',
      penjelasan: `
Ini jebakan matematika yang terlihat sangat wajar, tapi hasilnya sama sekali berbeda dari yang dibayangkan.

C membacanya **dua tahap dari kiri**:

- Pertama \`0 <= nilai\` dihitung, hasilnya \`1\` (benar) atau \`0\` (salah)
- Lalu hasil itu dibandingkan: \`1 <= 100\` atau \`0 <= 100\`

Keduanya jelas benar. Jadi \`if (0 <= nilai <= 100)\` **selalu terpenuhi**, bahkan untuk \`nilai = 5000\` atau \`nilai = -300\`. Kompiler tidak protes karena secara tata bahasa penulisannya sah.

Cara yang benar adalah memecahnya menjadi dua perbandingan yang disambung \`&&\`.

Menariknya, **di Python penulisan ini justru sah dan bekerja seperti dugaan**: \`if 0 <= nilai <= 100:\` benar-benar memeriksa rentang, karena Python mendukung *chained comparison*. Perbedaan inilah yang sering membingungkan mahasiswa yang berpindah bahasa — dan bagus untuk kamu jadikan contoh saat mengajar.
`
    },
    {
      bahasa: 'c',
      kode: 'switch (pilihan) {\n    case 1:\n        printf("Satu");\n        break;          // tanpa ini, lanjut ke case 2!\n    case 2:\n        printf("Dua");\n        break;\n    default:\n        printf("Tidak dikenal");\n}',
      penjelasan: `
\`switch\` bekerja berbeda dari \`if\`, dan perbedaannya sering disalahpahami.

\`case\` bukanlah kotak terpisah, melainkan **titik masuk**. Begitu nilai yang cocok ditemukan, program **melompat ke sana lalu terus berjalan ke bawah** — menembus \`case\` berikutnya — sampai bertemu \`break\`. Perilaku ini disebut ***fall-through***.

Karena itu \`break\` bukan hiasan. Tanpa \`break\` pada \`case 1\`, memilih 1 akan mencetak \`"Satu"\` **dan** \`"Dua"\` sekaligus.

Fall-through kadang justru berguna dan sengaja dipakai, misal untuk mengelompokkan beberapa nilai:

\`case 'a': case 'i': case 'u': printf("vokal"); break;\`

**Kenapa \`switch\` tidak bisa dipakai untuk rentang seperti \`nilai >= 80\`?** Karena \`switch\` hanya membandingkan **kesamaan persis** dengan nilai konstanta. Ia juga hanya menerima tipe bilangan bulat — \`int\`, \`char\`, dan \`enum\`. Tipe \`float\` maupun string ditolak, karena di balik layar \`switch\` diterjemahkan menjadi tabel lompatan yang butuh nilai bulat yang pasti.
`
    },
    {
      bahasa: 'c',
      kode: 'int maks = (a > b) ? a : b;\n//          kondisi  ? kalau benar : kalau salah',
      penjelasan: `
Operator **ternary** adalah bentuk singkat dari \`if/else\`, dan namanya berasal dari fakta bahwa ia memakai **tiga** bagian.

Baris di atas setara dengan lima baris berikut:

\`if (a > b) { maks = a; } else { maks = b; }\`

Bedanya bukan cuma panjang tulisan. **Ternary menghasilkan sebuah nilai**, sehingga bisa dipakai langsung di tengah ekspresi — misalnya \`printf("%s", lulus ? "LULUS" : "GAGAL");\` — sementara \`if\` adalah pernyataan yang tidak menghasilkan nilai apa pun.

Kapan sebaiknya dipakai? **Hanya untuk memilih satu nilai sederhana.** Kalau tiap cabang perlu mengerjakan beberapa hal, atau kalau ternary-nya sampai bersarang seperti \`a ? b : c ? d : e\`, gunakan \`if\` biasa. Kode yang singkat tidak selalu lebih baik daripada kode yang jelas.
`
    },
    {
      bahasa: 'c',
      kode: 'if (n != 0 && total / n > 5) { ... }\n//     ^ dicek dulu, jadi pembagian nol tidak pernah terjadi',
      penjelasan: `
Operator \`&&\` dan \`||\` punya sifat khusus bernama ***short-circuit*** — mengevaluasi **secukupnya saja**, lalu berhenti.

- Pada \`A && B\`, jika \`A\` sudah salah maka hasilnya pasti salah, sehingga **\`B\` tidak pernah dijalankan**.
- Pada \`A || B\`, jika \`A\` sudah benar maka hasilnya pasti benar, sehingga **\`B\` dilewati**.

Ini bukan sekadar penghematan, tapi alat pengaman yang sering dipakai. Pada contoh di atas, jika \`n\` bernilai 0 maka \`n != 0\` salah dan pembagian \`total / n\` **tidak pernah dieksekusi** — sehingga program selamat dari pembagian dengan nol.

Konsekuensinya: **urutan penulisan kondisi jadi penting.** Menukarnya menjadi \`if (total / n > 5 && n != 0)\` membuat pembagian dikerjakan lebih dulu dan program tetap crash. Pola yang sama dipakai untuk pointer: \`if (p != NULL && p->nilai > 0)\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    static void Main() {
        int nilai = 85;

        // Penjagaan: WAJIB pakai && , bukan 0 <= nilai <= 100
        if (nilai < 0 || nilai > 100) {
            Console.WriteLine("Nilai tidak valid!");
            return;
        }

        // Rantai if-else: dari syarat paling ketat ke paling longgar
        if (nilai >= 85)      Console.WriteLine("Grade A");
        else if (nilai >= 75) Console.WriteLine("Grade B");
        else if (nilai >= 60) Console.WriteLine("Grade C");
        else                  Console.WriteLine("Grade E");

        // Ternary
        Console.WriteLine("Status : " + (nilai >= 60 ? "LULUS" : "TIDAK LULUS"));

        // switch klasik: C# MEWAJIBKAN break (beda dengan C/C++/Java)
        int menu = 2;
        switch (menu) {
            case 1:
                Console.WriteLine("Data ditambahkan");
                break;                       // tanpa ini -> ERROR kompilasi
            case 2:
                Console.WriteLine("Data dihapus");
                break;
            default:
                Console.WriteLine("Pilihan tidak ada");
                break;
        }

        // Mengelompokkan beberapa nilai
        char huruf = 'i';
        switch (huruf) {
            case 'a': case 'i': case 'u': case 'e': case 'o':
                Console.WriteLine("Huruf vokal");
                break;
            default:
                Console.WriteLine("Huruf konsonan");
                break;
        }

        // switch EXPRESSION (C# 8+): lebih ringkas, tanpa break
        string grade = nilai switch {
            >= 85 => "A",                    // boleh memakai RENTANG
            >= 75 => "B",
            >= 60 => "C",
            _     => "E"                     // _ berarti "selain itu"
        };
        Console.WriteLine($"\nswitch expression : {grade}");
        Console.WriteLine("-> berbeda dari switch klasik, ini BISA untuk rentang");

        // short-circuit: pembagian aman karena n != 0 dicek lebih dulu
        int total = 100, n = 0;
        if (n != 0 && total / n > 5) Console.WriteLine("besar");
        else Console.WriteLine("\nn nol -> pembagian dilewati, program aman");
    }
}`,

    java: String.raw`public class Contoh {
    public static void main(String[] args) {
        int nilai = 85;

        // WAJIB pakai && — Java sama seperti C, tidak bisa 0 <= nilai <= 100
        if (nilai < 0 || nilai > 100) {
            System.out.println("Nilai tidak valid!");
            return;
        }

        if (nilai >= 85)      System.out.println("Grade A");
        else if (nilai >= 75) System.out.println("Grade B");
        else if (nilai >= 60) System.out.println("Grade C");
        else                  System.out.println("Grade E");

        System.out.println("Status : " + (nilai >= 60 ? "LULUS" : "TIDAK LULUS"));

        // switch: sama seperti C, break WAJIB kalau tidak ingin fall-through
        int menu = 2;
        switch (menu) {
            case 1:
                System.out.println("Data ditambahkan");
                break;
            case 2:
                System.out.println("Data dihapus");
                break;
            default:
                System.out.println("Pilihan tidak ada");
        }

        // Java BISA switch pada String — C dan C++ tidak bisa
        String perintah = "hapus";
        switch (perintah) {
            case "tambah": System.out.println("menambah data"); break;
            case "hapus":  System.out.println("menghapus data"); break;
            default:       System.out.println("perintah tidak dikenal");
        }

        // switch bergaya panah (Java 14+): tanpa break, tanpa fall-through
        String hasil = switch (menu) {
            case 1 -> "Data ditambahkan";
            case 2 -> "Data dihapus";
            default -> "Pilihan tidak ada";
        };
        System.out.println("\nswitch panah : " + hasil);

        // short-circuit
        int total = 100, n = 0;
        if (n != 0 && total / n > 5) System.out.println("besar");
        else System.out.println("\nn nol -> pembagian dilewati, program aman");
    }
}`,

    js: String.raw`let nilai = 85;

if (nilai < 0 || nilai > 100) {
    console.log("Nilai tidak valid!");
} else if (nilai >= 85) {
    console.log("Grade A");
} else if (nilai >= 75) {
    console.log("Grade B");
} else {
    console.log("Grade C atau E");
}

console.log("Status :", nilai >= 60 ? "LULUS" : "TIDAK LULUS");

// switch: sama seperti C, break WAJIB
let menu = 2;
switch (menu) {
    case 1:
        console.log("Data ditambahkan");
        break;
    case 2:
        console.log("Data dihapus");
        break;
    default:
        console.log("Pilihan tidak ada");
}

// ---------- JEBAKAN TERBESAR JAVASCRIPT: == vs === ----------
console.log("\n== membandingkan setelah MENGUBAH tipe:");
console.log("  '5' == 5   ->", "5" == 5);        // true  (menyesatkan)
console.log("  0 == false ->", 0 == false);      // true
console.log("  null == undefined ->", null == undefined);

console.log("\n=== membandingkan nilai DAN tipe:");
console.log("  '5' === 5   ->", "5" === 5);      // false (benar)
console.log("  0 === false ->", 0 === false);    // false
console.log("-> SELALU pakai === , kecuali ada alasan khusus");

// ---------- TRUTHY & FALSY ----------
// Nilai yang dianggap SALAH: false, 0, "" , null, undefined, NaN
// Selain itu dianggap BENAR — termasuk "0" dan array kosong!
console.log("\nyang dianggap salah:");
for (const v of [false, 0, "", null, undefined, NaN]) {
    console.log("  " + String(v).padEnd(10) + " ->", v ? "benar" : "salah");
}
console.log("\nyang MENGEJUTKAN dianggap benar:");
for (const v of ["0", "false", [], {}]) {
    console.log("  " + JSON.stringify(v).padEnd(10) + " ->", v ? "benar" : "salah");
}

// short-circuit juga berlaku
let total = 100, n = 0;
if (n !== 0 && total / n > 5) console.log("besar");
else console.log("\nn nol -> pembagian dilewati, program aman");

// ?? mengambil nilai cadangan hanya kalau null/undefined
let masukan = 0;
console.log("\nmasukan || 10 =", masukan || 10, " <- 0 dianggap salah");
console.log("masukan ?? 10 =", masukan ?? 10, " <- 0 tetap dipakai");`,

    c: String.raw`#include <stdio.h>

int main(void) {
    int nilai;
    printf("Masukkan nilai (0-100): ");
    scanf("%d", &nilai);

    /* Penjagaan masukan: pakai && , BUKAN 0 <= nilai <= 100 */
    if (nilai < 0 || nilai > 100) {
        printf("Nilai tidak valid!\n");
        return 1;
    }

    /* Rantai if-else: disusun dari syarat paling ketat ke paling longgar */
    if (nilai >= 85) {
        printf("Grade A\n");
    } else if (nilai >= 75) {
        printf("Grade B\n");
    } else if (nilai >= 60) {
        printf("Grade C\n");
    } else {
        printf("Grade E\n");
    }

    /* Ternary: memilih satu nilai saja */
    printf("Status : %s\n", nilai >= 60 ? "LULUS" : "TIDAK LULUS");

    /* switch: cocok untuk pilihan pasti, bukan rentang */
    int menu;
    printf("\nMenu (1=Tambah 2=Hapus 3=Keluar): ");
    scanf("%d", &menu);

    switch (menu) {
        case 1:
            printf("Data ditambahkan\n");
            break;                       // WAJIB, kalau tidak lanjut ke case 2
        case 2:
            printf("Data dihapus\n");
            break;
        case 3:
            printf("Sampai jumpa\n");
            break;
        default:                         // penampung semua nilai lain
            printf("Pilihan tidak ada\n");
    }

    /* Fall-through yang SENGAJA: mengelompokkan beberapa nilai */
    char huruf;
    printf("\nMasukkan satu huruf: ");
    scanf(" %c", &huruf);                // spasi membuang sisa Enter

    switch (huruf) {
        case 'a': case 'i': case 'u': case 'e': case 'o':
            printf("Huruf vokal\n");     // ketiganya berbagi satu aksi
            break;
        default:
            printf("Huruf konsonan\n");
    }

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

int main() {
    int nilai;
    cout << "Masukkan nilai (0-100): ";
    cin >> nilai;

    if (nilai < 0 || nilai > 100) {
        cout << "Nilai tidak valid!" << endl;
        return 1;
    }

    if (nilai >= 85) {
        cout << "Grade A" << endl;
    } else if (nilai >= 75) {
        cout << "Grade B" << endl;
    } else if (nilai >= 60) {
        cout << "Grade C" << endl;
    } else {
        cout << "Grade E" << endl;
    }

    // Ternary bisa langsung ditempel di dalam ekspresi
    cout << "Status : " << (nilai >= 60 ? "LULUS" : "TIDAK LULUS") << endl;

    // short-circuit: pembagian aman karena n != 0 dicek lebih dulu
    int total = 100, n = 0;
    if (n != 0 && total / n > 5) {
        cout << "rata-rata besar" << endl;
    } else {
        cout << "\nn nol -> pembagian dilewati, program tetap aman" << endl;
    }

    int menu;
    cout << "\nMenu (1=Tambah 2=Hapus 3=Keluar): ";
    cin >> menu;

    switch (menu) {
        case 1: cout << "Data ditambahkan" << endl; break;
        case 2: cout << "Data dihapus"     << endl; break;
        case 3: cout << "Sampai jumpa"     << endl; break;
        default: cout << "Pilihan tidak ada" << endl;
    }

    return 0;
}`,

    python: String.raw`nilai = int(input("Masukkan nilai (0-100): "))

# Di Python, penulisan berantai ini SAH dan bekerja sesuai dugaan
if not (0 <= nilai <= 100):
    print("Nilai tidak valid!")
    exit()

# elif = else if. Perhatikan titik dua dan indentasi menggantikan kurung kurawal
if nilai >= 85:
    print("Grade A")
elif nilai >= 75:
    print("Grade B")
elif nilai >= 60:
    print("Grade C")
else:
    print("Grade E")

# Ternary Python urutannya berbeda: nilai_benar if kondisi else nilai_salah
print("Status :", "LULUS" if nilai >= 60 else "TIDAK LULUS")

# short-circuit juga berlaku di Python
total, n = 100, 0
if n != 0 and total / n > 5:
    print("rata-rata besar")
else:
    print("\nn nol -> pembagian dilewati, program tetap aman")

# Python tidak punya switch. Sebelum versi 3.10 dipakai dict atau if-elif:
menu = int(input("\nMenu (1=Tambah 2=Hapus 3=Keluar): "))

aksi = {
    1: "Data ditambahkan",
    2: "Data dihapus",
    3: "Sampai jumpa"
}
print(aksi.get(menu, "Pilihan tidak ada"))     # get() menyediakan nilai cadangan

# Python 3.10+ punya match-case, mirip switch tapi TANPA perlu break
match menu:
    case 1:
        print("(match) Data ditambahkan")
    case 2:
        print("(match) Data dihapus")
    case 1 | 2 | 3:
        print("(match) menu dikenal")
    case _:                                     # _ berarti "selain itu"
        print("(match) Pilihan tidak ada")`
  },

  output: `Masukkan nilai (0-100): 85
Grade A
Status : LULUS

Menu (1=Tambah 2=Hapus 3=Keluar): 2
Data dihapus

Masukkan satu huruf: i
Huruf vokal`,

  kesalahanUmum: [
    {
      salah: 'Menulis rentang seperti matematika: `if (0 <= nilai <= 100)`',
      kenapa: 'C membacanya bertahap: `(0 <= nilai)` menghasilkan 1 atau 0, lalu dibandingkan `<= 100` yang **selalu** benar. Jadi kondisinya selalu terpenuhi, bahkan untuk nilai 5000. Kompiler tidak protes karena penulisannya sah secara tata bahasa.',
      benar: 'Pecah jadi dua perbandingan: `if (nilai >= 0 && nilai <= 100)`. Catat bahwa di **Python** penulisan berantai itu justru sah dan bekerja benar — perbedaan ini sering membingungkan saat berpindah bahasa.'
    },
    {
      salah: 'Lupa `break` di dalam `switch`.',
      kenapa: '`case` hanyalah titik masuk, bukan kotak tertutup. Tanpa `break`, program terus berjalan menembus `case` di bawahnya (*fall-through*), sehingga beberapa aksi dijalankan sekaligus.',
      benar: 'Beri `break` di akhir setiap `case`. Kalau fall-through memang disengaja, tulis komentar `/* sengaja lanjut */` agar pembaca tahu itu bukan kelalaian.'
    },
    {
      salah: 'Menyusun rantai `else if` dari syarat longgar ke ketat.',
      kenapa: 'Kondisi diperiksa dari atas dan berhenti di kecocokan pertama. Kalau `if (nilai >= 60)` ditaruh paling atas, maka nilai 90 pun berhenti di situ dan cabang Grade A **tidak pernah tercapai** — menjadi kode mati yang tidak pernah dijalankan.',
      benar: 'Susun dari **paling ketat ke paling longgar**: `>= 85`, lalu `>= 75`, lalu `>= 60`. Uji selalu dengan nilai di batas atas, batas bawah, dan di tengah.'
    },
    {
      salah: 'Menaruh titik koma setelah `if`: `if (x > 5);` lalu blok di bawahnya.',
      kenapa: 'Titik koma itu menjadi **badan `if` yang kosong**, sehingga `if`-nya selesai di situ juga. Blok `{ ... }` di bawahnya lalu dianggap kode biasa dan **selalu** dijalankan, terlepas dari kondisinya. Ini murni kesalahan ketik yang tidak menghasilkan error.',
      benar: 'Hapus titik komanya: `if (x > 5) { ... }`. Kalau sebuah `if` terasa "selalu jalan", periksa titik koma nyasar lebih dulu.'
    },
    {
      salah: 'Membandingkan string C dengan `==`: `if (nama == "Budi")`',
      kenapa: 'Di C, `nama` adalah **alamat** array, sehingga `==` membandingkan alamat memori, bukan isi teksnya. Hasilnya hampir selalu salah meski isinya sama persis.',
      benar: 'Gunakan `strcmp` dari `<string.h>`: `if (strcmp(nama, "Budi") == 0)` — hasil `0` berarti identik. Di **C++** dengan tipe `string` dan di **Python**, `==` justru sudah membandingkan isi dengan benar.'
    }
  ],

  analogi: `
Pakai analogi **satpam di pintu masuk**. Setiap kondisi adalah satu pertanyaan yang jawabannya cuma "ya" atau "tidak", dan tiap jawaban mengarahkan orang ke jalur berbeda.

Untuk **urutan \`else if\`**, peragakan dengan pemeriksaan tiket berlapis: *"Punya tiket VIP? Kalau ya, langsung masuk lewat pintu VIP — pertanyaan sisanya tidak perlu ditanyakan lagi."* Di situ tekankan bahwa pemeriksaan **berhenti di kecocokan pertama**. Lalu balik urutannya di papan tulis dan tanya: *"kalau pertanyaan 'punya tiket biasa?' ditanya duluan, apa yang terjadi pada tamu VIP?"* Mahasiswa akan langsung melihat sendiri bug-nya.

Untuk **\`switch\` tanpa \`break\`**, pakai analogi **eskalator**: begitu kamu melangkah masuk di lantai yang cocok, kamu akan **terus terbawa turun** melewati lantai berikutnya sampai ada yang menghentikanmu. \`break\` adalah tombol berhentinya.

Untuk **short-circuit**, gunakan contoh sehari-hari: *"Kalau ada kunci DAN pintunya tidak terkunci, masuk."* Kalau kuncinya saja tidak ada, kamu tidak repot-repot mengecek pintunya. Itu persis cara kerja \`&&\`.

Untuk jebakan **\`0 <= x <= 100\`**, tulis langkah evaluasinya di papan tulis satu per satu — \`0 <= 5000\` menjadi \`1\`, lalu \`1 <= 100\` menjadi benar. Melihat proses dua tahapnya jauh lebih meyakinkan daripada sekadar diberi tahu "itu salah".
`,

  latihan: [
    'Buat program penentu grade dari nilai 0–100 dengan aturan: A (≥85), B (≥75), C (≥60), E (<60). Tambahkan penjagaan agar input di luar 0–100 ditolak. Uji dengan nilai tepat di batas: 85, 84, 75, 60, 59.',
    'Buat kalkulator sederhana memakai `switch`: minta dua angka dan satu operator (`+ - * /`), lalu tampilkan hasilnya. Wajib ada penjagaan pembagian dengan nol.',
    'Buat program penentu tahun kabisat. Aturannya: habis dibagi 4 **dan** tidak habis dibagi 100, **atau** habis dibagi 400. Uji dengan 2000 (kabisat), 1900 (bukan), dan 2024 (kabisat) — perhatikan kenapa 1900 berbeda dari 2000.',
    'Tanpa menjalankan programnya, tentukan keluaran potongan ini lalu buktikan: `int x = 5; if (0 <= x <= 3) printf("A"); else printf("B");` — jelaskan langkah evaluasinya satu per satu.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang kenapa `switch` tidak bisa dipakai untuk rentang nilai seperti `nilai >= 80`, sementara `if` bisa. Sertakan satu contoh kasus di mana `switch` justru lebih tepat daripada `if`.'
  ]
});

TOPICS.push({
  id: 'perulangan',
  judul: 'Perulangan (for, while, do-while)',
  kategori: 'algoritma',
  tag: ['for', 'while', 'do-while', 'loop', 'nested loop', 'pola bintang'],
  ringkas: 'Menyuruh komputer mengulang pekerjaan — termasuk perulangan bersarang dan pola bintang.',

  fungsi: `**Mengulang pekerjaan tanpa menyalin kode — dan berhenti tepat pada waktunya.**

Perulangan ada di hampir setiap program. Yang membedakan pemula dari yang sudah paham adalah **kepastian bahwa perulangannya berhenti**, dan berhenti di tempat yang benar.

Terpakai di:

- **Memproses daftar** — nilai mahasiswa, baris berkas, hasil kueri basis data
- **Mengulang sampai benar** — meminta masukan sampai sah
- **Simulasi** — menjalankan langkah demi langkah
- **Struktur Data dan Algoritma** — seluruh pencarian dan pengurutan adalah perulangan

Dua kesalahan yang paling sering, dan keduanya diam-diam:

- **Kesalahan satu langkah** — perulangan berjalan satu kali terlalu banyak atau terlalu sedikit, memberi hasil salah tanpa galat
- **Perulangan tak berujung** — lupa mengubah variabel penghitungnya, dan program menggantung`,

  praktik: {
    tujuan: `Kamu bisa memilih jenis perulangan yang tepat, memastikan ia berhenti, dan menemukan kesalahan satu langkah sebelum ia sampai ke hasil.`,
    alat: [
      'Python 3 atau C++',
      'Terminal'
    ],
    langkah: [
      { judul: 'Pilih jenisnya dari satu pertanyaan',
        isi: `**Apakah kamu tahu berapa kali akan mengulang, sebelum mulai?**

- **Tahu** → \`for\`
- **Tidak tahu** → \`while\`
- **Tidak tahu, tetapi minimal sekali** → \`do-while\`, atau \`while True\` dengan \`break\` di Python

Memilih yang salah tidak membuat programmu gagal, tetapi membuatnya lebih sulit dibaca dan lebih mudah salah.` },
      { judul: 'Tulis batasnya sebagai kalimat sebelum jadi kode',
        isi: `Tulis dulu: *"untuk i dari 0 sampai n dikurangi 1"* atau *"untuk i dari 1 sampai n"*.

Lalu terjemahkan: yang pertama jadi \`for i in range(n)\`, yang kedua \`for i in range(1, n+1)\`.

Menulis kalimatnya lebih dulu menghilangkan sebagian besar kesalahan satu langkah, karena kamu memutuskan batasnya **dalam bahasa yang kamu kuasai**.` },
      { judul: 'Uji dengan n bernilai 0, 1, dan 2',
        isi: `Ketiganya adalah kasus batas perulangan, dan hampir semua bug muncul di situ.

- \`n = 0\` → seharusnya tidak berjalan sama sekali
- \`n = 1\` → tepat sekali
- \`n = 2\` → tepat dua kali

Hitung sendiri berapa kali badan perulangan dijalankan dengan mencetak nomor iterasinya.` },
      { judul: 'Pastikan setiap while punya jalan keluar',
        isi: `Untuk setiap \`while\`, tunjuk dengan jari **baris mana** yang mengubah variabel syaratnya.

Kalau kamu tidak bisa menunjuknya, perulanganmu tidak akan berhenti.

Ini terdengar sepele, tetapi lupa menaikkan penghitung di dalam \`while\` adalah kesalahan yang bahkan programmer berpengalaman masih lakukan.` },
      { judul: 'Pakai break dan continue dengan hemat',
        isi: `\`break\` keluar dari perulangan, \`continue\` melompat ke iterasi berikutnya.

Keduanya berguna, tetapi lebih dari satu \`break\` dalam satu perulangan membuat alurnya sulit diikuti. Kalau kamu butuh tiga \`break\`, biasanya perulangan itu perlu dipecah jadi fungsi.` },
      { judul: 'Latih perulangan bersarang dengan pola',
        isi: `Buat segitiga bintang, lalu tabel perkalian.

Keduanya memaksa kamu memahami bahwa **perulangan dalam berjalan penuh untuk setiap satu putaran perulangan luar**.

Cetak juga nilai kedua penghitungnya di tiap iterasi. Melihat urutannya secara langsung jauh lebih jelas daripada membayangkannya.` }
    ],
    cek: [
      'Perulanganmu berjalan tepat nol kali saat n bernilai 0, dan tepat sekali saat n bernilai 1',
      'Untuk setiap while di kodemu, kamu bisa menunjuk baris yang mengubah syaratnya',
      'Segitiga bintangmu punya jumlah baris dan jumlah bintang yang persis sesuai masukan'
    ]
  },

  konsep: `
Kalau kamu perlu mencetak angka 1 sampai 100, menulis \`printf\` seratus kali jelas tidak masuk akal. **Perulangan** membuat satu blok kode dijalankan berkali-kali selama syaratnya masih terpenuhi.

Setiap perulangan, apa pun bentuknya, selalu punya **tiga bagian** yang wajib ada. Kalau salah satunya hilang, hasilnya bug:

- **Inisialisasi** — titik mulai, misal \`i = 1\`
- **Kondisi** — sampai kapan berlanjut, misal \`i <= 10\`
- **Perubahan** — yang menggerakkan menuju berhenti, misal \`i++\`

Melupakan bagian ketiga adalah penyebab utama **infinite loop**: kondisinya tidak pernah berubah, sehingga perulangannya tidak pernah berhenti.

Ada tiga bentuk, dan memilih yang tepat membuat kode jauh lebih mudah dibaca:

- **\`for\`** — dipakai saat **jumlah pengulangannya sudah diketahui**, misal "ulangi 10 kali" atau "telusuri seluruh array". Ketiga bagian tadi berkumpul rapi dalam satu baris.
- **\`while\`** — dipakai saat **berhentinya tergantung kejadian**, misal "selama pengguna belum mengetik 0". Jumlah pengulangannya belum tentu diketahui di awal.
- **\`do-while\`** — sama seperti \`while\`, tapi **dijalankan minimal satu kali** karena kondisinya baru diperiksa di akhir. Paling pas untuk menu program yang harus tampil dulu sebelum ditanya mau lanjut atau tidak.

Ketiganya bisa saling menggantikan secara teknis — tapi memilih yang paling sesuai maksudnya adalah bagian dari menulis kode yang baik.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'for (int i = 1; i <= 5; i++) {\n//       (1)      (2)   (3)\n    printf("%d ", i);\n}',
      penjelasan: `
Urutan jalannya **tidak** dari kiri ke kanan seperti membaca biasa. Inilah urutan sebenarnya:

- **(1) \`i = 1\`** dijalankan **sekali saja** di awal
- **(2) \`i <= 5\`** diperiksa **sebelum setiap** putaran. Kalau salah, perulangan langsung berhenti
- **badan perulangan** dijalankan
- **(3) \`i++\`** dijalankan **setelah** badan selesai
- kembali ke langkah (2)

Jadi alur lengkapnya: \`1 → cek → cetak → naik → cek → cetak → ...\`

Perhatikan satu hal penting: saat perulangan berhenti, nilai \`i\` sebenarnya sudah **6**, bukan 5. Karena \`i\` harus menjadi 6 dulu agar kondisi \`i <= 5\` gagal dan perulangan berakhir. Memahami ini penting saat men-debug perulangan yang hasilnya meleset satu langkah.
`
    },
    {
      bahasa: 'c',
      kode: 'for (int i = 0; i < 5; i++)    // 0,1,2,3,4  -> 5 kali\nfor (int i = 1; i <= 5; i++)   // 1,2,3,4,5  -> 5 kali\nfor (int i = 0; i <= 5; i++)   // 0,1,2,3,4,5 -> 6 kali!',
      penjelasan: `
Perbedaan antara \`<\` dan \`<=\` inilah sumber ***off-by-one error*** — bug yang hasilnya meleset tepat satu langkah, dan termasuk paling sering terjadi di semua bahasa.

Aturan praktis yang bisa kamu andalkan:

- Mulai dari **0**, pakai **\`<\`** → berjalan \`n\` kali. Ini yang **wajib** dipakai untuk array.
- Mulai dari **1**, pakai **\`<=\`** → berjalan \`n\` kali. Cocok untuk hitungan yang dibaca manusia.

Untuk array, gaya \`for (i = 0; i < n; i++)\` bukan sekadar selera. Indeks array dimulai dari 0 dan berakhir di \`n-1\`, sehingga memakai \`i <= n\` membuat program menyentuh \`arr[n]\` yang **berada di luar array**. Di C tidak ada peringatan apa pun untuk ini — programnya tetap jalan sambil membaca memori milik data lain.
`
    },
    {
      bahasa: 'c',
      kode: 'int i = 0;\nwhile (i < 5) {\n    printf("%d ", i);\n    i++;              // kalau baris ini lupa -> berputar selamanya\n}\n\ndo {\n    printf("jalan minimal sekali");\n} while (0);        // kondisi salah, tapi badan tetap dijalankan',
      penjelasan: `
Perbedaan intinya ada pada **kapan kondisi diperiksa**.

- **\`while\`** memeriksa **sebelum** badan dijalankan. Kalau kondisinya sudah salah sejak awal, badan **tidak pernah** dijalankan sama sekali — nol kali.
- **\`do-while\`** memeriksa **setelah** badan dijalankan. Karena itu badannya **selalu jalan minimal sekali**, bahkan ketika kondisinya jelas-jelas salah seperti \`while (0)\` di atas.

Kapan \`do-while\` benar-benar berguna? Saat sesuatu **harus terjadi dulu sebelum bisa dinilai**. Contoh paling pas adalah menu program: menunya wajib ditampilkan dulu, baru pengguna bisa memilih keluar atau tidak. Contoh lain adalah validasi input — mintanya harus dilakukan minimal sekali.

Perhatikan juga bahwa \`do-while\` diakhiri **titik koma** setelah kurung tutup: \`} while (kondisi);\` — satu-satunya bentuk perulangan yang begitu, dan sering terlupakan.

Pada \`while\`, bagian penambah (\`i++\`) berada di dalam badan, sehingga lebih mudah lupa dibanding \`for\` yang menaruhnya di kepala. Inilah kenapa infinite loop lebih sering terjadi pada \`while\`.
`
    },
    {
      bahasa: 'python',
      kode: 'for i in range(1, 6):    # 1,2,3,4,5 -> berhenti di 5, BUKAN 6\n    print(i)\n\nfor i in range(5):       # 0,1,2,3,4  -> versi satu argumen\n    print(i)',
      penjelasan: `
Pertanyaan yang hampir pasti ditanyakan mahasiswa: **"kenapa \`range(1, 6)\` berhenti di 5?"**

Karena \`range\` memakai batas **setengah terbuka**: angka awal **ikut**, angka akhir **tidak ikut**. Ditulis secara matematika: \`[1, 6)\`.

Alasannya bukan sekadar kebiasaan, melainkan supaya dua hal ini jadi rapi:

- **Jumlah pengulangannya bisa langsung dihitung** dengan pengurangan: \`range(1, 6)\` berjalan \`6 - 1 = 5\` kali. Tidak perlu repot menambah atau mengurangi satu.
- **\`range(0, n)\` pas persis dengan indeks array** yang berjalan dari 0 sampai \`n-1\`, sehingga \`range(len(data))\` selalu aman.

Bentuk lengkapnya adalah \`range(mulai, batas, langkah)\`. Jadi \`range(0, 10, 2)\` menghasilkan \`0 2 4 6 8\`, dan \`range(5, 0, -1)\` menghasilkan \`5 4 3 2 1\` untuk menghitung mundur.

Prinsipnya sama persis dengan \`for (i = 0; i < n; i++)\` di C — batas atas sama-sama tidak ikut disertakan.
`
    },
    {
      bahasa: 'c',
      kode: 'for (int i = 1; i <= 3; i++) {        // luar: BARIS\n    for (int j = 1; j <= 3; j++) {    // dalam: KOLOM\n        printf("*");\n    }\n    printf("\\n");                     // pindah baris setelah kolom habis\n}',
      penjelasan: `
Pada **perulangan bersarang**, kuncinya satu kalimat: **perulangan dalam menyelesaikan seluruh putarannya untuk setiap satu putaran perulangan luar.**

Jadi untuk \`i = 1\`, perulangan \`j\` berjalan penuh dari 1 sampai 3. Baru setelah itu \`i\` naik menjadi 2, dan \`j\` **dimulai ulang lagi dari 1**. Karena itu total putarannya \`3 × 3 = 9\` kali.

Pembagian peran yang perlu dihafal: **perulangan luar mengurus baris, perulangan dalam mengurus kolom.**

Perhatikan posisi \`printf("\\n")\` — ia berada di dalam perulangan luar tapi **di luar** perulangan dalam. Artinya pindah baris terjadi setiap kali satu baris selesai dicetak penuh. Kalau \`\\n\` itu keliru ditaruh di dalam perulangan dalam, hasilnya jadi satu bintang per baris.

Untuk membuat **pola segitiga**, cukup kaitkan batas perulangan dalam dengan \`i\`: \`for (j = 1; j <= i; j++)\` membuat baris ke-1 berisi 1 bintang, baris ke-2 berisi 2 bintang, dan seterusnya.
`
    },
    {
      bahasa: 'c',
      kode: 'for (int i = 1; i <= 10; i++) {\n    if (i == 5) continue;   // lewati SISA badan, lanjut i berikutnya\n    if (i == 8) break;      // keluar TOTAL dari perulangan\n    printf("%d ", i);\n}   // hasil: 1 2 3 4 6 7',
      penjelasan: `
Dua perintah pengendali yang sering tertukar, padahal akibatnya sangat berbeda.

- **\`continue\`** → lewati sisa badan pada putaran ini saja, lalu **lanjut ke putaran berikutnya**. Perulangannya tetap hidup.
- **\`break\`** → **hentikan seluruh perulangan** saat itu juga dan lompat ke kode setelahnya.

Pada contoh di atas, angka \`5\` dilewati oleh \`continue\` sehingga tidak tercetak tapi perulangan lanjut. Saat mencapai \`8\`, \`break\` menghentikan semuanya — itulah kenapa \`8\`, \`9\`, dan \`10\` tidak muncul.

Satu hal penting yang sering jadi bug: **pada \`while\`, \`continue\` melompati bagian penambah** kalau penambah itu ditulis di akhir badan. Akibatnya perulangan berhenti maju dan berputar selamanya. Pada \`for\`, hal ini aman karena \`i++\` berada di kepala dan tetap dijalankan.

Perlu diingat juga: pada perulangan bersarang, \`break\` hanya keluar dari **satu lapis** — yaitu perulangan terdekat tempat ia berada, bukan semuanya.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    static void Main() {
        // for biasa, sama persis dengan C/C++/Java
        Console.Write("1 sampai 5   : ");
        for (int i = 1; i <= 5; i++) Console.Write(i + " ");

        Console.Write("\nmundur       : ");
        for (int i = 5; i >= 1; i--) Console.Write(i + " ");

        // Menjumlahkan
        int total = 0;
        for (int i = 1; i <= 100; i++) total += i;
        Console.WriteLine($"\n1+2+...+100  : {total}");

        // while
        int n = 1234, jumlahDigit = 0;
        while (n > 0) {
            jumlahDigit += n % 10;
            n /= 10;                       // pembagian bulat, karena n itu int
        }
        Console.WriteLine($"jumlah digit 1234 : {jumlahDigit}");

        // do-while: badan dijalankan minimal sekali
        int hitung = 0;
        do {
            hitung++;
        } while (hitung < 3);
        Console.WriteLine($"do-while jalan {hitung} kali");

        // foreach: menelusuri isi tanpa indeks
        int[] data = { 10, 20, 30, 40, 50 };
        Console.Write("\nforeach      : ");
        foreach (int x in data) Console.Write(x + " ");

        // Kalau indeksnya dibutuhkan, tetap pakai for biasa
        Console.WriteLine();
        for (int i = 0; i < data.Length; i++)     // Length, bukan length()
            Console.WriteLine($"  indeks {i} berisi {data[i]}");

        // Nested loop: segitiga bintang
        Console.WriteLine("\nSegitiga:");
        for (int i = 1; i <= 5; i++) {
            Console.WriteLine(new string('*', i));   // cara singkat C#
        }

        // Piramida
        Console.WriteLine("\nPiramida:");
        for (int i = 1; i <= 4; i++) {
            Console.WriteLine(new string(' ', 4 - i) + new string('*', 2 * i - 1));
        }

        // break dan continue
        Console.Write("\nbreak/continue: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue;
            if (i == 8) break;
            Console.Write(i + " ");
        }
        Console.WriteLine();
    }
}`,

    java: String.raw`public class Contoh {
    public static void main(String[] args) {
        // for biasa, sama persis dengan C/C++
        System.out.print("1 sampai 5   : ");
        for (int i = 1; i <= 5; i++) System.out.print(i + " ");

        System.out.print("\nmundur       : ");
        for (int i = 5; i >= 1; i--) System.out.print(i + " ");

        int total = 0;
        for (int i = 1; i <= 100; i++) total += i;
        System.out.println("\n1+2+...+100  : " + total);

        // while
        int n = 1234, jumlahDigit = 0;
        while (n > 0) {
            jumlahDigit += n % 10;
            n /= 10;
        }
        System.out.println("jumlah digit 1234 : " + jumlahDigit);

        // do-while
        int hitung = 0;
        do {
            hitung++;
        } while (hitung < 3);
        System.out.println("do-while jalan " + hitung + " kali");

        // Enhanced for: menelusuri isi tanpa indeks
        int[] data = { 10, 20, 30, 40, 50 };
        System.out.print("\nenhanced for : ");
        for (int x : data) System.out.print(x + " ");

        // Kalau indeksnya dibutuhkan
        System.out.println();
        for (int i = 0; i < data.length; i++)     // length TANPA kurung
            System.out.println("  indeks " + i + " berisi " + data[i]);

        // Nested loop: segitiga bintang
        System.out.println("\nSegitiga:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }

        // Piramida
        System.out.println("\nPiramida:");
        for (int i = 1; i <= 4; i++) {
            for (int s = 1; s <= 4 - i; s++) System.out.print(" ");
            for (int b = 1; b <= 2 * i - 1; b++) System.out.print("*");
            System.out.println();
        }

        // break dan continue
        System.out.print("\nbreak/continue: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue;
            if (i == 8) break;
            System.out.print(i + " ");
        }
        System.out.println();

        // Label: cara Java keluar dari perulangan bersarang sekaligus
        System.out.println("\nkeluar dari dua loop sekaligus:");
        luar:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i * j > 4) break luar;        // keluar dari loop 'luar'
                System.out.println("  i=" + i + " j=" + j);
            }
        }
    }
}`,

    js: String.raw`// for biasa, sama seperti C
process.stdout.write("1 sampai 5   : ");
for (let i = 1; i <= 5; i++) process.stdout.write(i + " ");

process.stdout.write("\nmundur       : ");
for (let i = 5; i >= 1; i--) process.stdout.write(i + " ");

let total = 0;
for (let i = 1; i <= 100; i++) total += i;
console.log("\n1+2+...+100  :", total);

// while — hati-hati: JavaScript tidak punya pembagian bulat otomatis
let n = 1234, jumlahDigit = 0;
while (n > 0) {
    jumlahDigit += n % 10;
    n = Math.floor(n / 10);        // WAJIB Math.floor, kalau tidak jadi pecahan
}
console.log("jumlah digit 1234 :", jumlahDigit);

// do-while
let hitung = 0;
do {
    hitung++;
} while (hitung < 3);
console.log("do-while jalan", hitung, "kali");

// ---------- TIGA CARA MENELUSURI, DAN SATU JEBAKAN ----------
const data = [10, 20, 30, 40, 50];

console.log("\nfor...of  (ISI, ini yang biasa dipakai):");
for (const x of data) process.stdout.write(x + " ");

console.log("\n\nfor...in  (INDEKS, dan bertipe TEKS!):");
for (const i in data) process.stdout.write(i + " ");
console.log("\n-> perhatikan: for...in memberi '0','1','2' berupa teks,");
console.log("   jadi JANGAN dipakai untuk array. Pakai for...of.");

console.log("\nforEach (dapat isi sekaligus indeks):");
data.forEach(function (x, i) {
    console.log("  indeks " + i + " berisi " + x);
});

// Nested loop: segitiga bintang
console.log("\nSegitiga:");
for (let i = 1; i <= 5; i++) {
    console.log("*".repeat(i));          // repeat: mirip * di Python
}

// Piramida
console.log("\nPiramida:");
for (let i = 1; i <= 4; i++) {
    console.log(" ".repeat(4 - i) + "*".repeat(2 * i - 1));
}

// break dan continue
process.stdout.write("\nbreak/continue: ");
for (let i = 1; i <= 10; i++) {
    if (i === 5) continue;
    if (i === 8) break;
    process.stdout.write(i + " ");
}

// JEBAKAN: var bocor keluar dari blok, let tidak
console.log("\n\nbeda var dan let:");
for (var a = 0; a < 3; a++) { }
console.log("  setelah loop, var a =", a, " <- masih hidup!");
for (let b = 0; b < 3; b++) { }
try { console.log(b); } catch (e) { console.log("  let b -> sudah tidak ada"); }
console.log("  -> selalu pakai let atau const, jangan var");`,

    c: String.raw`#include <stdio.h>

int main(void) {
    /* 1. for: jumlah pengulangan sudah diketahui */
    printf("1 sampai 5   : ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }

    /* 2. Menghitung mundur */
    printf("\nmundur       : ");
    for (int i = 5; i >= 1; i--) {
        printf("%d ", i);
    }

    /* 3. Melompat dua-dua */
    printf("\ngenap 0-10   : ");
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);
    }

    /* 4. Menjumlahkan: variabel penampung WAJIB diinisialisasi 0 */
    int total = 0;
    for (int i = 1; i <= 100; i++) {
        total += i;
    }
    printf("\n1+2+...+100  : %d\n", total);

    /* 5. while: berhentinya tergantung kejadian */
    int n = 1234, jumlahDigit = 0;
    while (n > 0) {
        jumlahDigit += n % 10;      // ambil digit terakhir
        n /= 10;                    // buang digit terakhir
    }
    printf("jumlah digit 1234 : %d\n", jumlahDigit);

    /* 6. do-while: menu wajib tampil minimal sekali */
    int pilih;
    do {
        printf("\n[1] Lagi  [0] Keluar : ");
        scanf("%d", &pilih);
        if (pilih == 1) printf("Kamu memilih lagi\n");
    } while (pilih != 0);

    /* 7. Nested loop: segitiga bintang */
    printf("\nSegitiga:\n");
    for (int i = 1; i <= 5; i++) {          // baris
        for (int j = 1; j <= i; j++) {      // kolom, batasnya ikut i
            printf("*");
        }
        printf("\n");                        // pindah baris tiap baris selesai
    }

    /* 8. Piramida: spasi dulu, baru bintang */
    printf("\nPiramida:\n");
    for (int i = 1; i <= 4; i++) {
        for (int s = 1; s <= 4 - i; s++) printf(" ");      // spasi menyusut
        for (int b = 1; b <= 2 * i - 1; b++) printf("*");  // bintang ganjil
        printf("\n");
    }

    /* 9. break dan continue */
    printf("\nbreak/continue: ");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) continue;       // lewati 5 saja
        if (i == 8) break;          // berhenti total di 8
        printf("%d ", i);
    }
    printf("\n");

    return 0;
}`,

    cpp: String.raw`#include <iostream>
using namespace std;

int main() {
    cout << "1 sampai 5   : ";
    for (int i = 1; i <= 5; i++) cout << i << " ";

    cout << "\nmundur       : ";
    for (int i = 5; i >= 1; i--) cout << i << " ";

    int total = 0;
    for (int i = 1; i <= 100; i++) total += i;
    cout << "\n1+2+...+100  : " << total << endl;

    // while: memproses digit satu per satu
    int n = 1234, jumlahDigit = 0;
    while (n > 0) {
        jumlahDigit += n % 10;
        n /= 10;
    }
    cout << "jumlah digit 1234 : " << jumlahDigit << endl;

    // Nested loop: tabel perkalian yang rapi
    cout << "\nTabel perkalian 1-5:" << endl;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            cout << i * j << "\t";       // \t membuat kolom lurus
        }
        cout << endl;
    }

    // Segitiga bintang
    cout << "\nSegitiga:" << endl;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) cout << "*";
        cout << endl;
    }

    // Range-based for: khas C++, untuk menelusuri seluruh isi
    int data[5] = {10, 20, 30, 40, 50};
    cout << "\nisi array: ";
    for (int x : data) {              // "untuk setiap x di dalam data"
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,

    python: String.raw`# for + range: batas akhir TIDAK ikut
print("1 sampai 5   :", end=" ")
for i in range(1, 6):          # 1,2,3,4,5
    print(i, end=" ")

print("\nmundur       :", end=" ")
for i in range(5, 0, -1):      # 5,4,3,2,1  (langkah -1)
    print(i, end=" ")

print("\ngenap 0-10   :", end=" ")
for i in range(0, 11, 2):      # 0,2,4,6,8,10
    print(i, end=" ")

# Menjumlahkan
total = 0
for i in range(1, 101):
    total += i
print(f"\n1+2+...+100  : {total}")
print(f"cara singkat : {sum(range(1, 101))}")   # Python punya sum() bawaan

# while
n, jumlah_digit = 1234, 0
while n > 0:
    jumlah_digit += n % 10
    n //= 10                   # WAJIB // supaya tetap bilangan bulat
print("jumlah digit 1234 :", jumlah_digit)

# Python TIDAK punya do-while. Polanya ditiru dengan while True + break:
while True:
    pilih = int(input("\n[1] Lagi  [0] Keluar : "))
    if pilih == 1:
        print("Kamu memilih lagi")
    if pilih == 0:
        break                  # inilah pengganti kondisi do-while

# Nested loop: segitiga
print("\nSegitiga:")
for i in range(1, 6):
    print("*" * i)             # Python bisa mengalikan string!

# Piramida
print("\nPiramida:")
for i in range(1, 5):
    print(" " * (4 - i) + "*" * (2 * i - 1))

# Menelusuri list langsung, tanpa indeks
data = [10, 20, 30, 40, 50]
print("\nisi list:", end=" ")
for x in data:
    print(x, end=" ")

# Kalau indeksnya memang dibutuhkan, pakai enumerate
print("\n")
for i, x in enumerate(data):
    print(f"indeks {i} berisi {x}")`
  },

  output: `1 sampai 5   : 1 2 3 4 5
mundur       : 5 4 3 2 1
genap 0-10   : 0 2 4 6 8 10
1+2+...+100  : 5050
jumlah digit 1234 : 10

Segitiga:
*
**
***
****
*****

Piramida:
   *
  ***
 *****
*******

break/continue: 1 2 3 4 6 7`,

  kesalahanUmum: [
    {
      salah: 'Lupa menaikkan pencacah pada `while`: `while (i < 5) { printf("%d", i); }`',
      kenapa: 'Nilai `i` tidak pernah berubah, sehingga kondisi `i < 5` selamanya benar. Program berputar tanpa henti (*infinite loop*) dan biasanya harus dimatikan paksa dengan Ctrl+C. Ini lebih sering terjadi pada `while` karena penambahnya ada di dalam badan, bukan di kepala seperti `for`.',
      benar: 'Tambahkan `i++;` di dalam badan perulangan. Kebiasaan yang baik: begitu menulis `while`, langsung tulis juga baris penambahnya sebelum mengisi yang lain.'
    },
    {
      salah: 'Titik koma nyasar setelah `for`: `for (int i = 0; i < 5; i++);`',
      kenapa: 'Titik koma itu menjadi **badan perulangan yang kosong**, sehingga perulangannya cuma berputar tanpa mengerjakan apa pun. Blok `{ ... }` di bawahnya lalu dianggap kode biasa dan hanya dijalankan **satu kali**. Tidak ada error sama sekali, jadi sangat sulit dilihat.',
      benar: 'Hapus titik komanya. Kalau perulanganmu terasa "cuma jalan sekali", periksa titik koma nyasar sebelum mencurigai hal lain.'
    },
    {
      salah: 'Off-by-one saat menelusuri array: `for (int i = 0; i <= n; i++)`',
      kenapa: 'Indeks array yang sah adalah `0` sampai `n-1`. Memakai `i <= n` membuat program mengakses `arr[n]` yang berada **di luar array**, sehingga membaca memori milik data lain. C tidak memberi peringatan apa pun — nilainya sekadar sampah, atau program crash.',
      benar: 'Untuk array selalu gunakan `for (int i = 0; i < n; i++)` dengan tanda `<`. Hafalkan pasangannya: **mulai 0 pakai `<`, mulai 1 pakai `<=`**.'
    },
    {
      salah: 'Salah menaruh `printf("\\n")` pada perulangan bersarang.',
      kenapa: 'Kalau pindah baris diletakkan di dalam perulangan **dalam**, setiap satu bintang langsung diikuti baris baru sehingga polanya menjadi satu bintang per baris. Kalau diletakkan di luar perulangan **luar**, semua bintang menempel dalam satu baris panjang.',
      benar: 'Letakkan `printf("\\n")` di dalam perulangan luar tetapi **setelah** perulangan dalam selesai. Aturannya: satu pindah baris untuk setiap baris yang selesai dicetak.'
    },
    {
      salah: 'Mengubah variabel pencacah dari dalam badan perulangan.',
      kenapa: 'Menulis `i++` lagi di dalam badan `for` membuat pencacahnya naik dua langkah tiap putaran, sehingga separuh data terlewat. Bug ini sulit terlihat karena programnya tetap berjalan normal, hanya hasilnya tidak lengkap.',
      benar: 'Serahkan pengaturan pencacah sepenuhnya pada kepala `for`. Kalau memang perlu melompat, atur di kepalanya: `i += 2`.'
    },
    {
      salah: 'Di Python, memakai `/` untuk mengurangi bilangan di dalam perulangan: `n = n / 10`',
      kenapa: '`/` di Python selalu menghasilkan `float`, sehingga `n` berubah menjadi pecahan seperti `123.4`. Akibatnya `n % 10` ikut menghasilkan pecahan dan perulangan bisa berjalan sangat lama sebelum akhirnya `n` mendekati nol.',
      benar: 'Gunakan pembagian bulat `n //= 10`. Ini beda penting dengan C, di mana `/` pada dua bilangan bulat sudah otomatis menghasilkan bilangan bulat.'
    }
  ],

  analogi: `
Untuk **struktur \`for\`**, pakai analogi **lari keliling lapangan**: *"Mulai dari putaran ke-1 (inisialisasi), cek dulu apakah sudah 10 putaran (kondisi), kalau belum lari satu putaran (badan), lalu catat tambah satu (perubahan)."* Tekankan bahwa **pengecekan dilakukan sebelum lari**, bukan sesudah — itu sebabnya kalau targetnya 0 putaran, kamu sama sekali tidak lari.

Untuk beda **\`while\` dan \`do-while\`**, pakai analogi mencicipi makanan. \`while\` adalah *"cek dulu masakannya kurang garam atau tidak, baru tambahkan"* — kalau sudah pas, kamu tidak menambahkan sama sekali. \`do-while\` adalah *"cicipi dulu, baru putuskan"* — kamu **pasti** mencicipi minimal sekali. Untuk menu program, jelas menunya harus tampil dulu, jadi \`do-while\` yang cocok.

Untuk **perulangan bersarang**, gunakan analogi **jam dinding**. Jarum menit harus berputar penuh 60 langkah sebelum jarum jam bergerak **satu** langkah. Jarum jam adalah perulangan luar, jarum menit adalah perulangan dalam. Dari sini mahasiswa langsung paham kenapa totalnya adalah hasil perkalian.

Untuk **pola bintang**, jangan langsung menulis kode. Minta mahasiswa **menggambar polanya di kertas kotak-kotak** lebih dulu, lalu menghitung: baris ke-1 butuh berapa bintang, baris ke-2 berapa. Setelah hubungannya ketemu — misal "baris ke-\`i\` berisi \`i\` bintang" — kodenya tinggal menyalin temuan itu. Cara ini mengubah soal pola bintang dari tebak-tebakan menjadi langkah yang jelas.
`,

  latihan: [
    'Cetak semua bilangan genap dari 1 sampai 50, lalu tampilkan jumlah totalnya. Kerjakan dengan `for` dan ulangi dengan `while` — bandingkan mana yang lebih pas untuk kasus ini.',
    'Buat program yang meminta satu bilangan lalu menampilkan tabel perkaliannya dari 1 sampai 10, dengan kolom yang rapi lurus.',
    'Buat pola berikut dengan perulangan bersarang: (a) segitiga siku-siku, (b) segitiga terbalik, (c) piramida simetris. Kerjakan dengan menggambar di kertas dulu sebelum menulis kode.',
    'Buat program menu memakai `do-while` yang terus berjalan sampai pengguna memilih 0. Jelaskan kenapa `do-while` lebih tepat daripada `while` untuk kasus ini.',
    'Buat program yang meminta bilangan lalu menentukan apakah bilangan itu prima. Petunjuk: cukup periksa pembagi sampai akar kuadratnya. Jelaskan kenapa memeriksa sampai `n/2` atau `n` saja sudah cukup, tetapi boros.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang kenapa `for (i = 0; i < n; i++)` lebih aman untuk array dibanding `i <= n`. Gambarkan kotak arraynya dan tunjukkan persis kotak mana yang tersentuh saat memakai `<=`.'
  ]
});

TOPICS.push({
  id: 'array',
  judul: 'Array 1D & 2D (Matriks)',
  kategori: 'algoritma',
  tag: ['array', 'larik', 'matriks', 'indeks', '2 dimensi'],
  ringkas: 'Menyimpan banyak data sejenis dalam satu nama — beserta jebakan indeks yang wajib dipahami.',

  fungsi: `**Menyimpan banyak data sejenis dalam satu nama, dan mengaksesnya lewat nomor.**

Tanpa array, memproses seratus nilai mahasiswa berarti seratus variabel. Dengan array, satu variabel dan satu perulangan.

Terpakai di:

- **Semua pengolahan data** — nilai, harga, koordinat, piksel
- **Matriks** — pengolahan citra di Teknologi Multimedia, perhitungan SPK, jaringan syaraf
- **Struktur Data** — array adalah dasar dari stack, queue, hash table, dan heap
- **Tabel dinamis** di basis data dan JSON

Bahaya utamanya khas C dan C++: **mengakses di luar batas tidak menghasilkan galat**. Membaca indeks kesepuluh pada array berukuran lima akan mengambil memori sembarangan, dan programnya mungkin berjalan **seolah normal** sampai suatu saat merusak data lain.

Python dan Java melemparkan galat, dan itu jauh lebih baik — kesalahan yang berteriak lebih murah daripada kesalahan yang diam.`,

  praktik: {
    tujuan: `Kamu bisa memproses array satu dan dua dimensi dengan benar, dan sudah melihat sendiri apa yang terjadi saat mengakses di luar batas.`,
    alat: [
      'C atau C++ dengan gcc, dan Python 3, untuk membandingkan perilakunya'
    ],
    langkah: [
      { judul: 'Ingat bahwa indeks mulai dari nol',
        isi: `Array berukuran lima punya indeks **0, 1, 2, 3, 4**. Indeks kelima **tidak ada**.

Sumber kebingungannya: ukurannya lima, tetapi indeks terakhirnya empat.

Tulis di catatanmu: **indeks terakhir selalu ukuran dikurangi satu.**` },
      { judul: 'Lihat sendiri akses di luar batas',
        isi: `Di C, buat array \`int a[5]\` lalu cetak elemen indeks kesepuluh. Programnya **tidak** mati — ia mencetak angka sembarang.

Lalu coba hal yang sama di Python pada daftar berisi lima elemen. Kamu mendapat \`IndexError\`.

Perbedaan ini penting: di C kamu **tidak akan diberi tahu**, jadi kamu harus memeriksanya sendiri.` },
      { judul: 'Selalu bawa ukurannya',
        isi: `Di C, array yang dikirim ke fungsi **kehilangan informasi ukurannya**. \`sizeof\` di dalam fungsi akan memberi ukuran pointer, bukan array.

Jadi kirim ukurannya sebagai parameter terpisah: \`void cetak(int a[], int n)\`.

Di C++, \`std::vector\` menyimpan ukurannya sendiri lewat \`.size()\`, dan itu salah satu alasan kuat memakainya.` },
      { judul: 'Kuasai empat pola dasar sekali, pakai selamanya',
        isi: `Empat pola ini menutupi sebagian besar kebutuhan:

- **menjumlah** — siapkan total bernilai nol, tambahkan tiap elemen
- **mencari maksimum** — mulai dari elemen **pertama**, bukan dari nol. Kalau semua datanya negatif, mulai dari nol memberi jawaban salah
- **menghitung yang memenuhi syarat** — penghitung dinaikkan di dalam percabangan
- **mencari posisi** — kembalikan indeksnya, dan negatif satu kalau tidak ada` },
      { judul: 'Kerjakan array dua dimensi sebagai baris dan kolom',
        isi: `Penulisan \`matriks[i][j]\` berarti **baris i, kolom j**. Perulangan luar untuk baris, perulangan dalam untuk kolom.

Buat penjumlahan dua matriks lalu transposenya, dan cetak hasilnya dalam bentuk tabel rapi supaya kesalahannya kelihatan.

Untuk perkalian matriks, ingat syaratnya: **jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua**.` },
      { judul: 'Waspadai jebakan menyalin di Python',
        isi: `Penugasan \`b = a\` **tidak menyalin** — keduanya menunjuk daftar yang sama, jadi mengubah b ikut mengubah a.

Untuk menyalin: \`b = a.copy()\` atau \`b = a[:]\`.

Dan untuk daftar bersarang, keduanya **masih** berbagi isi dalamnya. Pakai \`copy.deepcopy(a)\`.

Ini penyebab bug "kenapa data aslinya ikut berubah" yang sangat sering terjadi.` }
    ],
    cek: [
      'Fungsi cari-maksimummu memberi jawaban benar untuk array yang semua isinya negatif',
      'Kamu sudah melihat perbedaan perilaku akses di luar batas antara C dan Python',
      'Setelah menyalin dengan `.copy()`, mengubah salinannya tidak mengubah aslinya'
    ]
  },

  konsep: `
Menyimpan nilai 30 mahasiswa dengan cara \`nilai1\`, \`nilai2\`, sampai \`nilai30\` jelas tidak masuk akal. **Array** menyelesaikannya: satu nama menampung **banyak data sejenis**, dan tiap data diakses lewat nomor urut yang disebut **indeks**.

Yang membuat array istimewa adalah cara penyimpanannya: seluruh elemennya diletakkan **berdempetan di memori**, tanpa sela. Dari sifat itu lahir dua akibat penting:

- **Aksesnya sangat cepat — O(1).** Untuk menuju \`arr[7]\`, komputer tidak perlu menelusuri satu per satu. Ia menghitung langsung: *alamat awal + (7 × ukuran tipe)*. Berapa pun besar arraynya, waktunya sama.
- **Ukurannya tidak bisa berubah.** Karena tempatnya sudah dipesan berdempetan, menambah elemen di belakang belum tentu bisa — memori sesudahnya mungkin sudah dipakai data lain.

**Indeks selalu dimulai dari 0.** Ini bukan kebiasaan aneh, melainkan konsekuensi langsung dari rumus tadi: indeks sebenarnya berarti "**berapa langkah dari awal**". Elemen pertama berjarak nol langkah, jadi indeksnya 0. Akibatnya, array berukuran \`n\` punya indeks sah dari \`0\` sampai \`n-1\` — dan indeks \`n\` **selalu di luar batas**.

**Array 2D** adalah array berisi array, dipakai untuk data berbentuk tabel seperti matriks atau papan permainan. Penulisannya \`int m[3][4]\` berarti 3 baris dan 4 kolom. Meski dibayangkan sebagai kotak-kotak, di memori ia tetap **satu deretan lurus**: baris pertama dulu sampai habis, baru baris kedua menyusul. Susunan ini disebut *row-major*.

Peringatan penting untuk C dan C++: **tidak ada pemeriksaan batas sama sekali.** Menulis \`arr[100]\` pada array 5 elemen tetap dikompilasi dan tetap dijalankan — ia hanya membaca atau menimpa memori milik data lain. Python jauh lebih ramah: ia langsung melempar \`IndexError\`.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int nilai[5] = {80, 75, 90, 65, 88};\n//  indeks:        0    1   2   3   4\nprintf("%d", nilai[0]);   // 80  <- elemen PERTAMA\nprintf("%d", nilai[4]);   // 88  <- elemen TERAKHIR\nprintf("%d", nilai[5]);   // DI LUAR BATAS!',
      penjelasan: `
Angka \`5\` di dalam \`nilai[5]\` saat **deklarasi** berarti **banyaknya elemen**. Tapi angka \`5\` di \`nilai[5]\` saat **dipakai** berarti **indeks**. Dua arti berbeda dengan penulisan yang sama — dan di sinilah kebingungan bermula.

Karena indeks mulai dari 0, array berisi 5 elemen punya indeks sah \`0, 1, 2, 3, 4\`. **Indeks 5 sudah di luar batas.**

Kenapa C tidak memberi peringatan? Karena demi kecepatan, C sengaja **tidak memeriksa batas** sama sekali. Ia hanya menghitung alamat lalu langsung mengaksesnya. Akibatnya \`nilai[5]\` membaca memori tepat setelah array — bisa jadi variabel lain, bisa jadi sampah.

Gejala khasnya sangat menyesatkan: **variabel lain berubah sendiri tanpa sebab yang terlihat**. Kalau kamu menemui gejala ini saat mendampingi praktikum, curigai penulisan di luar batas array lebih dulu.
`
    },
    {
      bahasa: 'c',
      kode: 'int arr[5];\nprintf("%d", arr[0]);        // sampah, bukan 0!\n\nint b[5] = {0};              // semua elemen jadi 0\nint c[5] = {1, 2};           // sisanya otomatis 0 -> {1,2,0,0,0}',
      penjelasan: `
Array yang dideklarasikan tanpa nilai awal berisi **sampah** — sisa data pemakai memori sebelumnya. Bukan otomatis nol.

Tapi begitu kamu memberi **sebagian** nilai awal, aturannya berubah: sisa elemen yang tidak disebut **otomatis diisi 0**. Karena itu \`int c[5] = {1, 2};\` menghasilkan \`{1, 2, 0, 0, 0}\`.

Dari aturan itu lahir trik yang sering dipakai: **\`int b[5] = {0};\`** mengisi elemen pertama dengan 0, lalu sisanya ikut jadi 0 — sehingga seluruh array bersih hanya dengan satu penulisan singkat.

Ini penting terutama untuk array pencacah atau penampung penjumlahan. Lupa menginisialisasi membuat hasilnya berbeda-beda setiap kali dijalankan, dan bug seperti itu sangat membingungkan karena kadang kebetulan benar.
`
    },
    {
      bahasa: 'c',
      kode: 'int arr[5] = {10, 20, 30, 40, 50};\nint n = sizeof(arr) / sizeof(arr[0]);   // 20/4 = 5\n\nvoid cetak(int a[], int n) {            // n WAJIB dikirim terpisah\n    // di sini sizeof(a) TIDAK menghasilkan 20\n}',
      penjelasan: `
Cara menghitung panjang array di C: \`sizeof(arr)\` memberi **total byte** seluruh array (5 × 4 = 20), lalu dibagi \`sizeof(arr[0])\` yaitu ukuran satu elemen (4). Hasilnya 5.

**Tapi trik ini hanya bekerja di tempat array itu dideklarasikan.**

Begitu array dikirim ke sebuah fungsi, ia **meluruh** (*decay*) menjadi sekadar **pointer ke elemen pertama**. Yang diterima fungsi bukan seluruh array, melainkan satu alamat saja. Karena itu \`sizeof(a)\` di dalam fungsi menghasilkan ukuran pointer (8 byte di sistem 64-bit), bukan 20.

Inilah alasan **panjang array selalu harus dikirim sebagai parameter terpisah**, dan kenapa hampir semua fungsi pengolah array di C berbentuk \`void f(int a[], int n)\`.

Efek samping dari peluruhan ini: perubahan isi array di dalam fungsi **ikut terasa di pemanggil**, karena yang dikirim memang alamat aslinya — bukan salinan. Array otomatis bersifat *pass by reference*, berbeda dari variabel biasa.
`
    },
    {
      bahasa: 'c',
      kode: 'int m[3][4];        // 3 baris, 4 kolom\nm[1][2] = 99;       // baris ke-1, kolom ke-2 (mulai dari 0)\n\n// di memori sebenarnya tersimpan lurus:\n// [b0k0][b0k1][b0k2][b0k3][b1k0][b1k1]...',
      penjelasan: `
Urutan penulisannya adalah **\`[baris][kolom]\`**, dan keduanya sama-sama dimulai dari 0. Jadi \`m[1][2]\` berarti baris kedua, kolom ketiga bila dihitung secara manusia.

Meskipun kita membayangkannya sebagai kotak-kotak, **di memori array 2D tetap satu deretan lurus**. Seluruh isi baris 0 disimpan dulu sampai habis, baru menyusul baris 1, dan seterusnya. Pola ini disebut *row-major*.

Karena itu \`m[1][2]\` sebenarnya diterjemahkan menjadi elemen ke-\`(1 × 4) + 2 = 6\` dari awal. Rumus umumnya: **\`baris × jumlahKolom + kolom\`**.

Pemahaman ini punya akibat praktis: **menelusuri array 2D per baris lebih cepat daripada per kolom**, karena data yang berdekatan di memori dibaca sekaligus oleh prosesor. Untuk ukuran kecil di praktikum bedanya tidak terasa, tapi ini alasan nyata di balik anjuran "loop baris di luar, kolom di dalam".

Perlu diingat juga: saat array 2D dikirim ke fungsi, **jumlah kolom wajib disebutkan** — \`void f(int m[][4], int baris)\` — karena tanpa itu kompiler tidak bisa menghitung rumus di atas.
`
    },
    {
      bahasa: 'python',
      kode: 'data = [10, 20, 30]      # list, bukan array\ndata.append(40)          # ukurannya BISA bertambah\nprint(data[-1])          # 40  <- indeks negatif dari belakang\nprint(data[0:2])         # [10, 20]  <- slicing',
      penjelasan: `
Python tidak memakai array bawaan seperti C, melainkan **list** yang jauh lebih luwes:

- **Ukurannya bisa berubah** lewat \`append()\` dan \`remove()\`. Di balik layar Python memesan tempat lebih lalu memindahkan isinya saat penuh — sesuatu yang di C harus dikerjakan manual.
- **Isinya boleh beragam tipe**, misal \`[1, "dua", 3.0]\`, sementara array C wajib seragam.
- **Indeks negatif** dihitung dari belakang: \`data[-1]\` adalah elemen terakhir. Ini jauh lebih aman daripada \`data[len(data)-1]\` yang rawan salah hitung.
- **Slicing** \`data[0:2]\` mengambil sepotong bagian, dan seperti \`range\`, batas akhirnya **tidak ikut**.

Yang paling penting: **Python memeriksa batas.** Mengakses \`data[99]\` langsung memunculkan \`IndexError\` dengan pesan jelas — tidak diam-diam merusak memori seperti di C.

Untuk array 2D, Python memakai list di dalam list: \`m = [[1,2],[3,4]]\`, lalu diakses dengan \`m[1][0]\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Array C#: ukuran tetap, TAPI batasnya diperiksa
        int[] nilai = { 80, 75, 90, 65, 88 };

        Console.Write("isi array : ");
        foreach (int x in nilai) Console.Write(x + " ");
        Console.WriteLine($"\njumlah elemen : {nilai.Length}");   // Length, bukan sizeof

        // LINQ: operasi umum tersedia siap pakai
        Console.WriteLine($"total : {nilai.Sum()}");
        Console.WriteLine($"rata2 : {nilai.Average():F2}");
        Console.WriteLine($"maks  : {nilai.Max()}");
        Console.WriteLine($"min   : {nilai.Min()}");

        // Batas DIPERIKSA — beda besar dengan C/C++
        try {
            Console.WriteLine(nilai[99]);
        } catch (IndexOutOfRangeException e) {
            Console.WriteLine($"\nnilai[99] -> {e.GetType().Name}");
            Console.WriteLine("  (di C, ini diam-diam merusak memori)");
        }

        // List: ukurannya bisa berubah
        List<int> daftar = new List<int> { 80, 75, 90 };
        daftar.Add(65);
        daftar.Insert(0, 100);
        Console.WriteLine($"\nList : {string.Join(", ", daftar)}");

        // ---------- ARRAY 2 DIMENSI ----------
        // C# punya DUA macam, dan ini khas C#

        // 1. Rectangular array: benar-benar 2D, satu blok memori
        int[,] m = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12}
        };
        Console.WriteLine("\nRectangular int[,] :");
        for (int i = 0; i < m.GetLength(0); i++) {          // GetLength(0) = baris
            for (int j = 0; j < m.GetLength(1); j++)        // GetLength(1) = kolom
                Console.Write($"{m[i, j],4}");              // koma, bukan [i][j]
            Console.WriteLine();
        }

        // 2. Jagged array: array berisi array, tiap baris boleh beda panjang
        int[][] jagged = {
            new int[] { 1, 2 },
            new int[] { 3, 4, 5, 6 }
        };
        Console.WriteLine("\nJagged int[][] (panjang baris boleh beda):");
        foreach (int[] baris in jagged)
            Console.WriteLine("  " + string.Join(" ", baris));
    }
}`,

    java: String.raw`import java.util.Arrays;
import java.util.ArrayList;

public class Contoh {
    // Panjang array TIDAK perlu dikirim terpisah — array Java tahu ukurannya
    static void cetak(int[] a) {
        for (int x : a) System.out.print(x + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        int[] nilai = { 80, 75, 90, 65, 88 };

        System.out.print("isi array : ");
        cetak(nilai);
        System.out.println("jumlah elemen : " + nilai.length);   // TANPA kurung

        // Menjumlahkan
        int total = 0, maks = nilai[0], min = nilai[0];
        for (int x : nilai) {
            total += x;
            if (x > maks) maks = x;
            if (x < min) min = x;
        }
        System.out.println("total : " + total);
        System.out.printf("rata2 : %.2f%n", (double) total / nilai.length);
        System.out.println("maks  : " + maks + ", min : " + min);

        // Batas DIPERIKSA saat program berjalan
        try {
            System.out.println(nilai[99]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("\nnilai[99] -> ArrayIndexOutOfBoundsException");
            System.out.println("  (di C, ini diam-diam merusak memori)");
        }

        // Array baru otomatis berisi 0 — beda dengan C yang berisi sampah
        int[] pencacah = new int[5];
        System.out.println("\narray baru : " + Arrays.toString(pencacah));

        // ArrayList: ukurannya bisa berubah
        ArrayList<Integer> daftar = new ArrayList<>();
        daftar.add(80); daftar.add(75); daftar.add(0, 100);
        System.out.println("ArrayList  : " + daftar);

        // ---------- ARRAY 2 DIMENSI ----------
        int[][] m = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12}
        };

        System.out.println("\nMatriks 3x4:");
        for (int i = 0; i < m.length; i++) {         // m.length = jumlah baris
            for (int j = 0; j < m[i].length; j++)    // m[i].length = kolom baris i
                System.out.printf("%4d", m[i][j]);
            System.out.println();
        }

        // Java sebenarnya memakai array-of-array, jadi barisnya boleh beda panjang
        int[][] jagged = { {1, 2}, {3, 4, 5, 6} };
        System.out.println("\npanjang baris boleh beda:");
        for (int[] baris : jagged) System.out.println("  " + Arrays.toString(baris));

        System.out.println("\nsalinan dalam: " + Arrays.deepToString(m));
    }
}`,

    js: String.raw`// Array JavaScript itu dinamis — mirip list Python
const nilai = [80, 75, 90, 65, 88];

console.log("isi array :", nilai.join(" "));
console.log("panjang   :", nilai.length);
console.log("pertama   :", nilai[0]);
console.log("terakhir  :", nilai[nilai.length - 1]);   // TIDAK ada indeks negatif
console.log("terakhir  :", nilai.at(-1), " <- at(-1) baru bisa negatif");
console.log("potongan  :", nilai.slice(1, 4));         // batas akhir tidak ikut

// Method bawaan
console.log("\ntotal :", nilai.reduce(function (a, b) { return a + b; }, 0));
console.log("maks  :", Math.max(...nilai));            // ... membongkar array
console.log("min   :", Math.min(...nilai));

// Ukuran bisa berubah
const daftar = [10, 20, 30];
daftar.push(40);        // tambah di belakang
daftar.unshift(0);      // tambah di depan
console.log("\nsetelah diubah :", daftar);

// ---------- JEBAKAN KHAS JAVASCRIPT ----------
// 1. Di luar batas TIDAK error, hasilnya undefined
console.log("\nnilai[99] :", nilai[99], " <- undefined, bukan error");
console.log("  (Python melempar IndexError, C merusak memori)");

// 2. length bisa DITULIS, dan itu memotong isinya
const uji = [1, 2, 3, 4, 5];
uji.length = 3;
console.log("setelah length = 3 :", uji, " <- terpotong!");

// 3. Menugasi indeks jauh membuat array berlubang
const bolong = [1, 2];
bolong[5] = 99;
console.log("array berlubang    :", bolong, "panjang", bolong.length);

// 4. sort() bawaan mengurutkan sebagai TEKS
const angka = [10, 9, 100, 2];
console.log("\nsort() polos  :", [...angka].sort(), " <- salah!");
console.log("sort() benar  :", [...angka].sort(function (a, b) { return a - b; }));

// ---------- ARRAY 2 DIMENSI ----------
const m = [
    [ 1,  2,  3,  4],
    [ 5,  6,  7,  8],
    [ 9, 10, 11, 12]
];

console.log("\nMatriks 3x4:");
for (const baris of m) {
    console.log("  " + baris.map(function (x) { return String(x).padStart(3); }).join(""));
}

console.log("\nJumlah tiap baris:");
m.forEach(function (baris, i) {
    console.log("  baris " + i + " = " + baris.reduce(function (a, b) { return a + b; }, 0));
});

// JEBAKAN membuat matriks — sama persis dengan jebakan di Python
const salah = Array(2).fill(Array(3).fill(0));   // kedua baris objek yang SAMA
salah[0][0] = 99;
console.log("\ncara salah :", JSON.stringify(salah));

const benar = Array.from({ length: 2 }, function () { return Array(3).fill(0); });
benar[0][0] = 99;
console.log("cara benar :", JSON.stringify(benar));`,

    c: String.raw`#include <stdio.h>

/* Panjang array WAJIB dikirim terpisah, karena array meluruh jadi pointer */
void cetakArray(int a[], int n) {
    for (int i = 0; i < n; i++) {       // ingat: i < n, BUKAN i <= n
        printf("%d ", a[i]);
    }
    printf("\n");
}

int main(void) {
    /* ---------- ARRAY 1 DIMENSI ---------- */
    int nilai[5] = {80, 75, 90, 65, 88};
    int n = sizeof(nilai) / sizeof(nilai[0]);   // hanya bisa di sini

    printf("isi array : ");
    cetakArray(nilai, n);
    printf("jumlah elemen : %d\n", n);

    /* Menjumlahkan dan mencari nilai ekstrem */
    int total = 0, maks = nilai[0], min = nilai[0];
    for (int i = 0; i < n; i++) {
        total += nilai[i];
        if (nilai[i] > maks) maks = nilai[i];
        if (nilai[i] < min)  min  = nilai[i];
    }
    printf("total   : %d\n", total);
    printf("rata2   : %.2f\n", (float)total / n);   // casting supaya pecahan
    printf("maks    : %d\n", maks);
    printf("min     : %d\n", min);

    /* Semua elemen jadi 0 dengan satu penulisan */
    int pencacah[5] = {0};
    printf("\npencacah awal : ");
    cetakArray(pencacah, 5);

    /* ---------- ARRAY 2 DIMENSI ---------- */
    int m[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    printf("\nMatriks 3x4:\n");
    for (int i = 0; i < 3; i++) {           // i = baris (loop luar)
        for (int j = 0; j < 4; j++) {       // j = kolom (loop dalam)
            printf("%4d", m[i][j]);         // %4d membuat kolom lurus
        }
        printf("\n");                        // pindah baris tiap baris selesai
    }

    /* Menjumlahkan per baris */
    printf("\nJumlah tiap baris:\n");
    for (int i = 0; i < 3; i++) {
        int jml = 0;
        for (int j = 0; j < 4; j++) jml += m[i][j];
        printf("baris %d = %d\n", i, jml);
    }

    /* Transpose: baris jadi kolom */
    printf("\nTranspose (4x3):\n");
    for (int j = 0; j < 4; j++) {
        for (int i = 0; i < 3; i++) {
            printf("%4d", m[i][j]);         // indeksnya ditukar
        }
        printf("\n");
    }

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
#include <algorithm>            // untuk sort, max_element
using namespace std;

int main() {
    /* Array gaya C tetap bisa dipakai di C++ */
    int nilai[5] = {80, 75, 90, 65, 88};
    int n = sizeof(nilai) / sizeof(nilai[0]);

    cout << "isi array : ";
    for (int i = 0; i < n; i++) cout << nilai[i] << " ";
    cout << endl;

    /* vector: array yang ukurannya bisa berubah — pilihan utama di C++ */
    vector<int> data = {80, 75, 90};
    data.push_back(65);                  // menambah di belakang
    data.push_back(88);

    cout << "isi vector: ";
    for (int x : data) cout << x << " ";         // range-based for
    cout << endl;
    cout << "ukuran    : " << data.size() << endl;   // tidak perlu sizeof

    /* vector tahu ukurannya sendiri, jadi lebih aman dikirim ke fungsi */
    int total = 0;
    for (int x : data) total += x;
    cout << "total     : " << total << endl;
    cout << "rata2     : " << (double)total / data.size() << endl;
    cout << "maks      : " << *max_element(data.begin(), data.end()) << endl;

    /* at() memeriksa batas, [] tidak */
    cout << "\ndata.at(2) : " << data.at(2) << endl;
    // data.at(99);   -> melempar exception, bukan diam-diam merusak memori

    /* ---------- ARRAY 2 DIMENSI ---------- */
    int m[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    cout << "\nMatriks 3x4:" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) cout << m[i][j] << "\t";
        cout << endl;
    }

    /* vector 2D: 3 baris berisi 4 kolom, semuanya 0 */
    vector<vector<int>> vm(3, vector<int>(4, 0));
    vm[1][2] = 99;
    cout << "\nvm[1][2] = " << vm[1][2] << endl;

    return 0;
}`,

    python: String.raw`# Python memakai list — ukurannya bisa berubah
nilai = [80, 75, 90, 65, 88]

print("isi list :", nilai)
print("panjang  :", len(nilai))          # tidak perlu sizeof
print("pertama  :", nilai[0])
print("terakhir :", nilai[-1])           # indeks negatif dari belakang
print("potongan :", nilai[1:4])          # indeks 1,2,3 (batas akhir tidak ikut)

# Python punya fungsi bawaan untuk operasi umum
print("\ntotal :", sum(nilai))
print("rata2 :", sum(nilai) / len(nilai))    # / selalu pecahan, jadi aman
print("maks  :", max(nilai))
print("min   :", min(nilai))

# Ukurannya bisa bertambah dan berkurang
nilai.append(70)                          # tambah di belakang
nilai.insert(0, 100)                      # sisipkan di indeks 0
nilai.remove(65)                          # hapus berdasarkan NILAI
print("\nsetelah diubah :", nilai)

# Menelusuri: langsung isinya, atau pakai indeks bila perlu
print()
for x in nilai:
    print(x, end=" ")
print()
for i, x in enumerate(nilai):
    print(f"indeks {i} -> {x}")

# Python MEMERIKSA batas — ini beda besar dengan C
try:
    print(nilai[99])
except IndexError as e:
    print("\nIndexError:", e)             # ketahuan langsung, tidak merusak memori

# ---------- ARRAY 2 DIMENSI: list di dalam list ----------
m = [
    [ 1,  2,  3,  4],
    [ 5,  6,  7,  8],
    [ 9, 10, 11, 12]
]

print("\nMatriks 3x4:")
for baris in m:
    for x in baris:
        print(f"{x:4}", end="")           # lebar 4 supaya lurus
    print()

print("\nJumlah tiap baris:")
for i, baris in enumerate(m):
    print(f"baris {i} = {sum(baris)}")

# Transpose dengan satu baris
transpose = [list(k) for k in zip(*m)]
print("\nTranspose:")
for baris in transpose:
    print(baris)

# HATI-HATI membuat matriks: cara ini SALAH
salah = [[0] * 3] * 2        # ketiga baris menunjuk list yang SAMA
salah[0][0] = 99
print("\ncara salah :", salah)     # [[99,0,0],[99,0,0]] -> ikut berubah!

benar = [[0] * 3 for _ in range(2)]   # tiap baris list baru
benar[0][0] = 99
print("cara benar :", benar)          # [[99,0,0],[0,0,0]]`
  },

  output: `isi array : 80 75 90 65 88
jumlah elemen : 5
total   : 398
rata2   : 79.60
maks    : 90
min     : 65

pencacah awal : 0 0 0 0 0

Matriks 3x4:
   1   2   3   4
   5   6   7   8
   9  10  11  12

Jumlah tiap baris:
baris 0 = 10
baris 1 = 26
baris 2 = 42`,

  kompleksitas: {
    tabel: [
      { operasi: 'akses arr[i]', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'ubah arr[i]', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'cari nilai (tak terurut)', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'sisip / hapus di tengah', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'sisip / hapus di belakang', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'menelusuri array 2D (m×n)', waktu: 'O(m×n)', memori: 'O(1)' },
      { operasi: 'penyimpanan n elemen', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa \`arr[i]\` bisa O(1)?** Karena elemennya berdempetan dan ukurannya seragam, alamatnya bisa **dihitung langsung** dengan *alamat awal + i × ukuran tipe*. Tidak ada penelusuran sama sekali, jadi mengambil elemen ke-1 dan ke-1.000.000 sama cepatnya. Inilah keunggulan utama array dibanding linked list.

**Kenapa menyisipkan di tengah jadi O(n)?** Karena tidak ada ruang kosong di antara elemen. Untuk menyisipkan di indeks 0, seluruh elemen lain harus **digeser satu langkah ke kanan** lebih dulu. Semakin banyak datanya, semakin banyak yang digeser. Menambah di **belakang** tidak perlu menggeser apa pun, jadi tetap O(1).

**Kenapa mencari jadi O(n)?** Karena pada array tak terurut tidak ada petunjuk letak data. Satu-satunya cara adalah memeriksa dari awal sampai ketemu. Kalau datanya **sudah terurut**, pencarian bisa dipercepat menjadi O(log n) memakai *binary search* — dibahas di topik Searching.

**Untuk array 2D**, menelusuri seluruh isi berarti mengunjungi \`m × n\` kotak, sehingga biayanya O(m×n). Kalau matriksnya bujur sangkar \`n × n\`, ini berarti **O(n²)** — dan itu sebabnya operasi matriks terasa berat begitu ukurannya membesar.
`
  },

  kesalahanUmum: [
    {
      salah: 'Mengakses di luar batas: `int arr[5];` lalu `arr[5] = 10;`',
      kenapa: 'Indeks yang sah hanya `0` sampai `4`. Indeks `5` menyentuh memori tepat setelah array. C **tidak memeriksa batas**, jadi tidak ada error — program menimpa memori milik variabel lain. Gejala khasnya: **variabel lain berubah sendiri** tanpa sebab yang terlihat.',
      benar: 'Ingat: array berukuran `n` punya indeks `0` sampai `n-1`. Selalu telusuri dengan `for (i = 0; i < n; i++)` memakai tanda `<`. Di C++ pakai `vector` dan `.at()` yang memeriksa batas; di Python `IndexError` sudah menjaganya otomatis.'
    },
    {
      salah: 'Memakai `sizeof(arr)` untuk menghitung panjang array **di dalam fungsi**.',
      kenapa: 'Array yang dikirim ke fungsi **meluruh menjadi pointer**. Yang diterima cuma satu alamat, bukan seluruh array. Jadi `sizeof(a)` menghasilkan ukuran pointer (8 byte), bukan total isinya — panjang yang terhitung jadi salah total.',
      benar: 'Kirim panjangnya sebagai parameter terpisah: `void cetak(int a[], int n)`. Hitung `sizeof(arr)/sizeof(arr[0])` hanya di tempat array itu dideklarasikan.'
    },
    {
      salah: 'Mengira array yang belum diisi otomatis bernilai 0: `int total[5]; total[0] += 10;`',
      kenapa: 'Isinya sampah dari pemakai memori sebelumnya, sehingga hasilnya berbeda-beda tiap kali dijalankan. Kadang kebetulan benar saat diuji, lalu salah di komputer lain — bug seperti ini sangat melelahkan dilacak.',
      benar: 'Inisialisasi eksplisit: `int total[5] = {0};` mengisi seluruh elemen dengan 0. Ini wajib untuk array pencacah atau penampung penjumlahan.'
    },
    {
      salah: 'Tertukar urutan baris dan kolom pada array 2D: `m[kolom][baris]`',
      kenapa: 'Urutan bakunya `[baris][kolom]`. Menukarnya membuat data masuk ke posisi yang salah. Pada matriks bujur sangkar programnya tetap jalan tanpa error, sehingga kesalahannya hanya terlihat dari hasil yang keliru — dan pada matriks tidak bujur sangkar, program malah mengakses di luar batas.',
      benar: 'Tanamkan urutan **baris dulu, kolom kemudian**. Beri nama variabel perulangan yang jelas seperti `for (baris...)` dan `for (kolom...)`, bukan `i` dan `j`, saat masih belajar.'
    },
    {
      salah: 'Di Python, membuat matriks dengan `m = [[0] * 3] * 2`',
      kenapa: 'Tanda `*` pada bagian luar hanya **menyalin acuan yang sama** sebanyak 2 kali, bukan membuat dua list terpisah. Akibatnya kedua baris menunjuk objek yang sama, sehingga mengubah `m[0][0]` ikut mengubah `m[1][0]`.',
      benar: 'Gunakan list comprehension agar tiap baris dibuat baru: `m = [[0] * 3 for _ in range(2)]`. Bagian dalam boleh memakai `*` karena angka bersifat *immutable*.'
    }
  ],

  analogi: `
Pakai analogi **deretan loker di stasiun** yang bernomor berurutan dan menempel satu sama lain.

Untuk menjelaskan **kenapa indeks mulai dari 0**, inilah analogi yang paling meyakinkan: indeks sebenarnya berarti **"berapa langkah dari loker pertama"**. Loker pertama? Nol langkah. Loker kedua? Satu langkah. Setelah dijelaskan begini, indeks 0 berhenti terasa aneh dan mulai terasa masuk akal.

Untuk **akses O(1)**, tanya: *"Kalau saya minta loker nomor 47, apa kamu harus menghitung dari loker 1 satu per satu?"* Tidak — kamu langsung melangkah ke sana karena lokernya berjajar rapi dan ukurannya sama. Itulah persis cara komputer menghitung alamat.

Untuk **menyisipkan di tengah yang mahal**, peragakan dengan mahasiswa yang duduk berjajar di kursi. Minta satu orang duduk di kursi paling depan — semua yang lain **harus bergeser satu kursi**. Rasa repotnya langsung terasa, dan itulah O(n).

Untuk **array 2D**, pakai **papan catur** atau denah tempat duduk kelas. Sebutkan satu posisi dengan format "baris 2, kolom 3" dan tekankan bahwa **urutannya tidak boleh dibalik**. Untuk menjelaskan penyimpanan *row-major*, minta mahasiswa membaca papan catur **seperti membaca buku** — kiri ke kanan, baru turun ke bawah. Itulah urutan sesungguhnya di memori.

Untuk **akses di luar batas**, analoginya paling mengena: *"Kamu buka loker nomor 6 padahal cuma disewa loker 1–5. Lokernya tetap terbuka — tapi isinya milik orang lain."* C tidak melarang, dan justru di situlah bahayanya.
`,

  latihan: [
    'Buat program yang meminta 10 bilangan, menyimpannya di array, lalu menampilkan nilai terbesar, terkecil, dan rata-ratanya. Pastikan rata-ratanya benar — hati-hati jebakan pembagian bulat.',
    'Buat program yang membalik isi array tanpa memakai array bantu. Petunjuk: tukar elemen pertama dengan terakhir, kedua dengan kedua terakhir, dan berhenti di tengah. Pertanyaan: kenapa perulangannya cuma sampai `n/2`, dan apa yang terjadi kalau sampai `n`?',
    'Buat program penjumlahan dua matriks 3×3, lalu tampilkan hasilnya dalam bentuk tabel yang rapi.',
    'Buat program yang mencari nilai terbesar pada tiap baris matriks 3×4, lalu tampilkan hasilnya per baris.',
    'Buat program yang menghitung berapa kali tiap angka 0–9 muncul dalam sebuah array. Petunjuk: pakai array pencacah berukuran 10 yang diinisialisasi `{0}`, lalu manfaatkan nilai data sebagai indeksnya.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang kenapa indeks array dimulai dari 0. Pakai analogi loker atau meteran, dan jangan sekali pun memakai kata "pointer".'
  ]
});

TOPICS.push({
  id: 'string',
  judul: 'String (C vs C++ vs Python)',
  kategori: 'algoritma',
  tag: ['string', 'teks', 'char array', 'strlen', 'strcmp', 'null terminator'],
  ringkas: 'Mengolah teks — dan kenapa string di C jauh lebih merepotkan daripada di C++ maupun Python.',

  fungsi: `**Mengolah teks — bagian data yang paling sering ditemui dan paling banyak jebakannya.**

Hampir semua data yang ditulis manusia adalah teks: nama, alamat, pesan, berkas, kueri.

Terpakai di:

- **Validasi masukan** — memeriksa format surel, NIM, nomor telepon
- **Mengurai berkas** — CSV, log, konfigurasi
- **Basis data** — membangun kueri, dan di sinilah SQL injection bermula
- **Pemrograman Web** — seluruh HTML dan JSON adalah teks
- **Data Mining** — pembersihan teks sebelum analisis

Jebakan terbesar ada di C: string adalah **array karakter yang diakhiri karakter nol**. Lupa menyediakan tempat untuk karakter nol itu menyebabkan kerusakan memori yang tidak langsung terlihat.

Dan di semua bahasa modern: **string tidak bisa diubah**, sehingga menyambung string di dalam perulangan bisa membuat program jauh lebih lambat daripada yang kamu kira.`,

  praktik: {
    tujuan: `Kamu bisa mengolah teks dengan aman di C dan Python, dan tahu mengapa cara menyambung string berpengaruh besar pada kecepatan.`,
    alat: [
      'C dengan gcc, dan Python 3'
    ],
    langkah: [
      { judul: 'Pahami karakter nol di C',
        isi: `Menulis \`char nama[6] = "Hafizh";\` itu **salah** — kata itu punya enam huruf **ditambah** satu karakter nol, jadi minimal \`char nama[7]\`.

Cetak \`strlen(nama)\` dan \`sizeof(nama)\`. Yang pertama menghitung huruf, yang kedua menghitung tempat yang disediakan.

Keduanya berbeda, dan tahu bedanya mencegah banyak kesalahan.` },
      { judul: 'Ganti fungsi yang berbahaya',
        isi: `- \`gets()\` — **jangan pernah dipakai**, ia sudah dihapus dari standar C karena tidak bisa dibatasi
- \`strcpy\` → pakai \`strncpy\` dan tambahkan sendiri karakter nolnya
- \`strcat\` → pakai \`strncat\`
- \`scanf("%s")\` → batasi menjadi \`scanf("%49s")\` untuk penampung berukuran 50

Semua ini mencegah **buffer overflow**, yang akan kamu temui lagi sebagai kerentanan keamanan.` },
      { judul: 'Kuasai operasi dasar di Python',
        isi: `- \`.strip()\` — membuang spasi di ujung, hampir selalu perlu untuk masukan pengguna
- \`.lower()\` — menyeragamkan sebelum membandingkan
- \`.split(",")\` — memecah jadi daftar
- \`",".join(daftar)\` — menggabungkan kembali
- \`.replace(a, b)\` — mengganti
- f-string — menyisipkan nilai, jauh lebih mudah dibaca daripada penyambungan` },
      { judul: 'Buktikan masalah menyambung di dalam perulangan',
        isi: `Bandingkan dua cara membangun teks dari 100.000 potongan:

- menambahkan dengan \`+=\` di dalam perulangan
- mengumpulkan ke daftar lalu \`"".join(daftar)\` sekali di akhir

Ukur keduanya dengan \`time.perf_counter()\`. Selisihnya besar, karena cara pertama membuat string **baru** setiap kali.

Kaidahnya: **kumpulkan ke daftar, gabungkan sekali di akhir.**` },
      { judul: 'Bandingkan teks dengan benar',
        isi: `- Di C, membandingkan dua nama dengan \`==\` membandingkan **alamat**, bukan isi. Pakai \`strcmp\`.
- Di Java, \`==\` juga membandingkan acuan. Pakai \`.equals()\`.
- Di Python, \`==\` membandingkan isi, jadi aman.

Ini salah satu perbedaan antar bahasa yang paling sering menjatuhkan orang yang berpindah bahasa.` },
      { judul: 'Buat satu fungsi validasi nyata',
        isi: `Tulis fungsi yang memeriksa apakah sebuah NIM sah: panjangnya tepat sembilan karakter, diawali huruf, sisanya angka.

Uji dengan masukan yang benar, yang terlalu pendek, yang berisi spasi di ujung, dan yang kosong.

Yang kosong dan yang berspasi adalah dua kasus yang paling sering terlewat.` }
    ],
    cek: [
      'Program C-mu tidak rusak saat diberi masukan lebih panjang daripada penampungnya',
      `Versi dengan join terbukti jauh lebih cepat daripada penambahan berulang pada 100.000 potongan`,
      'Fungsi validasi NIM-mu menolak teks kosong dan teks berspasi di ujung'
    ]
  },

  konsep: `
**String** adalah deretan karakter yang membentuk teks. Terdengar sederhana, tapi cara ketiga bahasa menanganinya sangat berbeda — dan perbedaan itulah yang paling sering membuat mahasiswa tersandung.

**Di C, string bukan tipe data.** C hanya menyediakan \`char\`, sehingga teks disimpan sebagai **array of char**. Karena panjang array tidak ikut tersimpan, C butuh cara lain untuk menandai di mana teks berakhir — yaitu dengan menaruh karakter khusus bernilai nol di ujungnya, ditulis \`'\\0'\` dan disebut **null terminator**.

Inilah kunci untuk memahami semua keanehan string di C. Fungsi seperti \`strlen\` dan \`printf("%s")\` bekerja dengan cara **berjalan dari awal sampai bertemu \`\\0\`**. Kalau penanda itu hilang, mereka terus berjalan menembus memori lain sampai kebetulan menemukan angka nol — menghasilkan teks sampah, atau program berhenti mendadak.

Akibat langsungnya, kata \`"Budi"\` memerlukan **5 byte**, bukan 4: empat huruf ditambah satu penanda akhir. Karena itu \`char nama[4] = "Budi";\` sudah salah sejak awal.

**Di C++ ada tipe \`string\` sungguhan.** Panjangnya tersimpan, ukurannya menyesuaikan sendiri, dan operator biasa bekerja seperti dugaan: \`+\` menyambung, \`==\` membandingkan isi.

**Di Python, \`str\` bahkan lebih sederhana** — tapi punya satu sifat penting: **immutable**, tidak bisa diubah isinya. Setiap operasi yang tampak "mengubah" string sebenarnya menghasilkan string baru.

Untuk kamu sebagai asprak, perbedaan inilah yang paling sering ditanyakan: *"kenapa di Python gampang, di C ribet?"* Jawabannya, C memberimu kendali penuh atas memori — dan kendali itu dibayar dengan tanggung jawab mengurus \`\\0\` serta batas ukurannya sendiri.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'char nama[5] = "Budi";\n// isi sebenarnya: B u d i \\0\n//        indeks:  0 1 2 3  4',
      penjelasan: `
Kata \`"Budi"\` terlihat hanya berisi 4 huruf, tapi memerlukan **5 slot**. Slot terakhir diisi \`'\\0'\` — karakter bernilai nol yang menandai akhir teks.

Kenapa penanda ini wajib ada? Karena array di C **tidak menyimpan panjangnya sendiri**. Saat kamu memberikan \`nama\` kepada \`printf\`, yang terkirim hanyalah **alamat huruf pertama**. Tanpa penanda akhir, \`printf\` tidak punya cara mengetahui kapan harus berhenti mencetak.

Karena itu \`char nama[4] = "Budi";\` adalah kesalahan: keempat slot habis untuk huruf, dan tidak tersisa tempat untuk \`'\\0'\`. Akibatnya fungsi string akan terus membaca melewati batas array.

Aturan praktisnya: **selalu sediakan minimal satu slot lebih banyak daripada jumlah huruf terpanjang.** Kalau nama bisa sampai 50 huruf, tulis \`char nama[51];\`. Menyediakan berlebih jauh lebih aman daripada kurang.
`
    },
    {
      bahasa: 'c',
      kode: 'char nama[50] = "Budi";\nprintf("%d", strlen(nama));   // 4  <- jumlah huruf\nprintf("%d", sizeof(nama));   // 50 <- ukuran wadahnya',
      penjelasan: `
Dua fungsi ini sering tertukar padahal jawabannya berbeda jauh.

- **\`strlen\`** menghitung **isi**: ia berjalan dari awal sambil mencacah sampai bertemu \`'\\0'\`. Hasilnya 4 — dan penanda akhirnya **tidak ikut dihitung**.
- **\`sizeof\`** melaporkan **ukuran wadahnya**: 50 byte sesuai deklarasi, terlepas dari berapa huruf yang benar-benar terisi.

Ada perbedaan penting lain: \`sizeof\` dihitung saat **kompilasi** sehingga tidak memakan waktu, sedangkan \`strlen\` bekerja saat **program berjalan** dengan menelusuri satu per satu — biayanya O(n).

Karena itu \`for (int i = 0; i < strlen(s); i++)\` sebenarnya boros: \`strlen\` dipanggil ulang setiap putaran, sehingga total biayanya menjadi O(n²). Simpan dulu hasilnya: \`int n = strlen(s);\` lalu pakai \`n\` di dalam perulangan.

Jangan lupa sertakan \`#include <string.h>\` untuk memakai \`strlen\`.
`
    },
    {
      bahasa: 'c',
      kode: 'char a[20] = "Budi", b[20] = "Budi";\n\nif (a == b) { ... }              // SALAH: membandingkan ALAMAT\nif (strcmp(a, b) == 0) { ... }   // BENAR: membandingkan ISI',
      penjelasan: `
Ini kesalahan yang paling sering terjadi, dan gejalanya membingungkan karena kodenya terlihat wajar.

Di C, nama array berarti **alamat elemen pertamanya**. Jadi \`a == b\` sebenarnya menanyakan *"apakah kedua array menempati alamat memori yang sama?"* — dan jawabannya hampir selalu **tidak**, meski isinya sama persis. Kompiler tidak protes karena membandingkan dua alamat memang sah.

Untuk membandingkan **isi**, gunakan \`strcmp\` yang menelusuri huruf demi huruf. Hasilnya perlu dibaca hati-hati karena tidak berupa benar/salah:

- **\`0\`** → kedua teks **identik**
- **negatif** → teks pertama lebih kecil menurut urutan abjad
- **positif** → teks pertama lebih besar

Bagian yang paling menjebak: \`if (strcmp(a, b))\` **tanpa \`== 0\`** justru bernilai benar ketika teksnya **berbeda**, karena hasil bukan nol dianggap benar di C. Kebalikan dari dugaan.

Di **C++** dengan tipe \`string\` dan di **Python**, \`==\` sudah membandingkan isi dengan benar — jadi masalah ini khusus C saja.
`
    },
    {
      bahasa: 'c',
      kode: 'char a[10] = "Budi";\na = "Ani";                  // ERROR: array tidak bisa ditugasi\nstrcpy(a, "Ani");           // BENAR: menyalin isinya\n\nchar kecil[5];\nstrcpy(kecil, "Halooo");    // BAHAYA: 7 byte ke wadah 5 byte',
      penjelasan: `
Nama array adalah **alamat tetap** yang tidak bisa dipindahkan, sehingga \`a = "Ani";\` ditolak kompiler. Untuk mengganti isi teks harus **menyalinnya** dengan \`strcpy\`.

Tapi \`strcpy\` menyimpan bahaya besar: **ia tidak memeriksa ukuran tujuan sama sekali.** Ia menyalin terus sampai bertemu \`'\\0'\` di sumbernya, tanpa peduli apakah wadahnya cukup.

Pada contoh di atas, \`"Halooo"\` butuh 7 byte tapi wadahnya cuma 5. Kelebihan 2 byte itu ditulis melewati batas array dan menimpa memori di sebelahnya. Inilah yang disebut ***buffer overflow*** — sumber bug yang sulit dilacak, dan di dunia nyata menjadi salah satu celah keamanan paling terkenal.

Alternatif yang lebih aman adalah \`strncpy(a, "Ani", sizeof(a) - 1);\` yang membatasi jumlah salinan. Fungsi lain yang perlu kamu kenal: \`strcat\` untuk menyambung, \`strchr\` untuk mencari karakter — dan semuanya menyimpan risiko serupa bila ukurannya tidak dijaga.

Di C++ cukup tulis \`a = "Ani";\` pada tipe \`string\`, karena ukurannya diurus otomatis.
`
    },
    {
      bahasa: 'python',
      kode: 's = "Budi"\ns[0] = "R"           # TypeError: string tidak bisa diubah\ns = "R" + s[1:]      # cara benar: buat string BARU',
      penjelasan: `
String di Python bersifat **immutable** — isinya tidak bisa diubah setelah dibuat. Mencoba mengganti satu huruf lewat indeks langsung ditolak dengan \`TypeError\`.

Yang bisa dilakukan hanyalah **membuat string baru** dari potongan yang lama. Semua method seperti \`.upper()\`, \`.replace()\`, dan \`.strip()\` pun sebenarnya **tidak mengubah aslinya** — mereka mengembalikan string baru. Karena itu \`s.upper()\` saja tidak berefek; harus ditulis \`s = s.upper()\`.

Kenapa dirancang begitu? Karena sifat tak berubah membuat string aman dipakai sebagai kunci \`dict\` dan bisa dibagi pakai tanpa risiko berubah diam-diam.

Efek sampingnya perlu diketahui: menyambung string berulang kali di dalam perulangan dengan \`s += x\` itu **boros**, karena setiap kali membuat string baru dan menyalin seluruh isinya. Untuk data banyak, kumpulkan dulu ke dalam list lalu satukan dengan \`"".join(daftar)\`.

Bandingkan dengan C, di mana \`char\` array justru **bisa** diubah per huruf: \`s[0] = 'R';\` sah dan mengubah aslinya.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Text;

class Program {
    static void Main() {
        string nama = "Budi";

        Console.WriteLine($"isi     : {nama}");
        Console.WriteLine($"panjang : {nama.Length}");     // Length, tanpa kurung

        // Bisa langsung ditugasi ulang — tidak perlu strcpy
        nama = "Ani";
        Console.WriteLine($"\ndiganti : {nama}");

        // Menyambung
        string sapaan = "Halo, " + nama + "!";
        Console.WriteLine($"sambung : {sapaan}");
        Console.WriteLine($"interpolasi : Halo, {nama}!");

        // ---------- PERBEDAAN PENTING DENGAN JAVA ----------
        // Di C#, == pada string MEMBANDINGKAN ISI (operator-nya di-overload)
        string a = "Budi";
        string b = "Bu" + "di";
        Console.WriteLine($"\na == b        : {a == b}          <- benar, isi sama");
        Console.WriteLine($"a.Equals(b)   : {a.Equals(b)}");
        Console.WriteLine("-> di JAVA, == justru membandingkan alamat!");

        // Method yang sering dipakai — semuanya mengembalikan string BARU
        string s = "  Algoritma dan Pemrograman  ";
        Console.WriteLine($"\nTrim()      : '{s.Trim()}'");
        Console.WriteLine($"ToUpper()   : {s.Trim().ToUpper()}");
        Console.WriteLine($"Replace()   : {s.Trim().Replace("dan", "&")}");
        Console.WriteLine($"IndexOf     : {s.IndexOf("dan")}");
        Console.WriteLine($"Substring   : {s.Trim().Substring(0, 9)}");
        Console.WriteLine($"Split       : {string.Join(" | ", s.Trim().Split(' '))}");

        // String bersifat IMMUTABLE, sama seperti Java dan Python
        string t = "budi";
        t.ToUpper();                       // hasilnya dibuang begitu saja
        Console.WriteLine($"\nsetelah t.ToUpper()     : {t}");
        t = t.ToUpper();
        Console.WriteLine($"setelah t = t.ToUpper() : {t}");

        // Menyambung berulang: pakai StringBuilder supaya hemat
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.Append(i).Append(" ");
        Console.WriteLine($"\nStringBuilder : {sb.ToString().Trim()}");

        // Membalik
        char[] huruf = "Algoritma".ToCharArray();
        Array.Reverse(huruf);
        Console.WriteLine($"dibalik       : {new string(huruf)}");

        // Menghitung vokal
        string kalimat = "Algoritma dan Pemrograman";
        int vokal = 0;
        foreach (char c in kalimat.ToLower()) if ("aiueo".Contains(c)) vokal++;
        Console.WriteLine($"jumlah vokal  : {vokal}");
    }
}`,

    java: String.raw`public class Contoh {
    public static void main(String[] args) {
        String nama = "Budi";

        System.out.println("isi     : " + nama);
        System.out.println("panjang : " + nama.length());   // length() PAKAI kurung

        nama = "Ani";                       // bisa langsung ditugasi
        System.out.println("\ndiganti : " + nama);

        String sapaan = "Halo, " + nama + "!";
        System.out.println("sambung : " + sapaan);

        // ---------- JEBAKAN PALING TERKENAL DI JAVA ----------
        // == pada String membandingkan ALAMAT, bukan isi
        String a = "Budi";
        String b = "Budi";                  // diambil dari kolam string
        String c = new String("Budi");      // sengaja dibuat object baru

        System.out.println("\na == b        : " + (a == b) + "   <- kebetulan true");
        System.out.println("a == c        : " + (a == c) + "  <- padahal isinya SAMA!");
        System.out.println("a.equals(c)   : " + a.equals(c) + "   <- INI yang benar");
        System.out.println("-> SELALU pakai .equals() untuk membandingkan String");
        System.out.println("   (di C# dan JavaScript, == justru sudah benar)");

        // Method yang sering dipakai — semuanya mengembalikan String BARU
        String s = "  Algoritma dan Pemrograman  ";
        System.out.println("\ntrim()      : '" + s.trim() + "'");
        System.out.println("toUpperCase : " + s.trim().toUpperCase());
        System.out.println("replace()   : " + s.trim().replace("dan", "&"));
        System.out.println("indexOf     : " + s.indexOf("dan"));
        System.out.println("substring   : " + s.trim().substring(0, 9));
        System.out.println("split       : " + String.join(" | ", s.trim().split(" ")));

        // IMMUTABLE
        String t = "budi";
        t.toUpperCase();                    // hasilnya dibuang
        System.out.println("\nsetelah t.toUpperCase()     : " + t);
        t = t.toUpperCase();
        System.out.println("setelah t = t.toUpperCase() : " + t);

        // Menyambung berulang: StringBuilder jauh lebih hemat
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.append(i).append(" ");
        System.out.println("\nStringBuilder : " + sb.toString().trim());

        // Membalik
        System.out.println("dibalik       : " + new StringBuilder("Algoritma").reverse());

        // Menghitung vokal
        String kalimat = "Algoritma dan Pemrograman";
        int vokal = 0;
        for (char ch : kalimat.toLowerCase().toCharArray())
            if ("aiueo".indexOf(ch) >= 0) vokal++;
        System.out.println("jumlah vokal  : " + vokal);
    }
}`,

    js: String.raw`let nama = "Budi";

console.log("isi     :", nama);
console.log("panjang :", nama.length);      // length TANPA kurung

nama = "Ani";
console.log("\ndiganti :", nama);

// Menyambung (template literal tidak dipakai di berkas materi ini)
console.log("sambung :", "Halo, " + nama + "!");

// === membandingkan ISI, jadi aman — beda dengan Java
const a = "Budi";
const b = "Bu" + "di";
console.log("\na === b :", a === b, " <- benar, isi sama");
console.log("-> di JAVA, == justru membandingkan alamat");

// String IMMUTABLE, sama seperti Java, C#, dan Python
let s = "Budi";
// s[0] = "R";                    // diam-diam GAGAL, tanpa error apa pun
s = "R" + s.slice(1);             // yang benar: buat string baru
console.log("\ndiubah  :", s);

// Slicing mirip Python
const teks = "Algoritma";
console.log("\npotongan 0-4 :", teks.slice(0, 4));
console.log("4 huruf akhir:", teks.slice(-4));
console.log("dibalik      :", teks.split("").reverse().join(""));

// Method yang sering dipakai — semuanya mengembalikan string BARU
const kal = "  Algoritma dan Pemrograman  ";
console.log("\ntrim()      : '" + kal.trim() + "'");
console.log("toUpperCase : " + kal.trim().toUpperCase());
console.log("replace()   : " + kal.trim().replace("dan", "&"));
console.log("indexOf     : " + kal.indexOf("dan"));
console.log("split()     : " + kal.trim().split(" ").join(" | "));
console.log("includes()  : " + kal.includes("dan"));

// Bukti immutable
let t = "budi";
t.toUpperCase();                  // hasilnya dibuang
console.log("\nsetelah t.toUpperCase()     :", t);
t = t.toUpperCase();
console.log("setelah t = t.toUpperCase() :", t);

// Menghitung vokal
const vokal = [...kal.toLowerCase()].filter(function (c) {
    return "aiueo".includes(c);
}).length;
console.log("\njumlah vokal :", vokal);

// JEBAKAN: menyambung angka dengan teks
console.log("\n'5' + 3 =", "5" + 3, " <- disambung jadi teks");
console.log("5 + 3   =", 5 + 3);
console.log("-> konversi dulu: Number('5') + 3 =", Number("5") + 3);

// padStart / padEnd untuk merapikan kolom
console.log("\nkolom rapi:");
console.log("Umur".padEnd(10) + "|" + "20".padStart(6));
console.log("IPK".padEnd(10) + "|" + "3.75".padStart(6));`,

    c: String.raw`#include <stdio.h>
#include <string.h>          // WAJIB untuk strlen, strcpy, strcmp, strcat

int main(void) {
    char nama[50] = "Budi";
    char sapaan[100];

    /* Panjang isi vs ukuran wadah */
    printf("isi          : %s\n", nama);
    printf("strlen (isi) : %d\n", (int)strlen(nama));   // 4
    printf("sizeof(wadah): %d\n", (int)sizeof(nama));   // 50

    /* Array tidak bisa ditugasi, harus disalin */
    /* nama = "Ani";  <- ERROR */
    strcpy(nama, "Ani");
    printf("\nsetelah strcpy : %s\n", nama);

    /* Menyambung teks */
    strcpy(sapaan, "Halo, ");
    strcat(sapaan, nama);
    strcat(sapaan, "!");
    printf("hasil strcat   : %s\n", sapaan);

    /* Membandingkan: WAJIB strcmp, bukan == */
    char a[20] = "Budi", b[20] = "Budi";
    printf("\na == b          : %d  <- membandingkan alamat, menyesatkan\n", a == b);
    printf("strcmp(a,b)==0  : %d  <- membandingkan isi, inilah yang benar\n",
           strcmp(a, b) == 0);

    /* Menelusuri per karakter — simpan strlen dulu supaya tidak boros */
    char teks[] = "Algoritma";
    int n = strlen(teks);
    printf("\nper karakter : ");
    for (int i = 0; i < n; i++) {
        printf("%c ", teks[i]);
    }

    /* Membalik string di tempat (bisa, karena char array boleh diubah) */
    for (int i = 0; i < n / 2; i++) {
        char simpan   = teks[i];
        teks[i]       = teks[n - 1 - i];
        teks[n - 1 - i] = simpan;
    }
    printf("\ndibalik      : %s\n", teks);

    /* Menghitung huruf vokal */
    char kalimat[100];
    printf("\nMasukkan satu kata: ");
    scanf("%s", kalimat);            // TANPA & karena array

    int vokal = 0;
    for (int i = 0; kalimat[i] != '\0'; i++) {    // berhenti di penanda akhir
        char c = kalimat[i];
        if (c=='a'||c=='i'||c=='u'||c=='e'||c=='o'||
            c=='A'||c=='I'||c=='U'||c=='E'||c=='O') {
            vokal++;
        }
    }
    printf("jumlah vokal : %d\n", vokal);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <string>              // tipe string sungguhan
#include <algorithm>           // untuk reverse
using namespace std;

int main() {
    string nama = "Budi";

    cout << "isi     : " << nama << endl;
    cout << "panjang : " << nama.length() << endl;   // atau .size()

    // Bisa langsung ditugasi — tidak perlu strcpy
    nama = "Ani";
    cout << "\nsetelah diganti : " << nama << endl;

    // Menyambung cukup dengan +
    string sapaan = "Halo, " + nama + "!";
    cout << "hasil sambung   : " << sapaan << endl;

    // Membandingkan cukup dengan == , sudah membandingkan ISI
    string a = "Budi", b = "Budi";
    cout << "\na == b : " << (a == b ? "sama" : "beda") << endl;

    // Menelusuri per karakter
    string teks = "Algoritma";
    cout << "\nper karakter : ";
    for (char c : teks) cout << c << " ";

    // Membalik: satu baris saja
    reverse(teks.begin(), teks.end());
    cout << "\ndibalik      : " << teks << endl;

    // Beberapa operasi yang sering dipakai
    string s = "Algoritma dan Pemrograman";
    cout << "\npotongan 0-8  : " << s.substr(0, 9) << endl;   // ambil sebagian
    cout << "posisi 'dan'  : " << s.find("dan") << endl;      // cari
    cout << "karakter ke-0 : " << s[0] << endl;

    // Membaca satu baris penuh yang mengandung spasi
    string kalimat;
    cout << "\nMasukkan satu kalimat: ";
    getline(cin, kalimat);

    int vokal = 0;
    for (char c : kalimat) {
        if (string("aiueoAIUEO").find(c) != string::npos) vokal++;
    }
    cout << "jumlah vokal : " << vokal << endl;

    return 0;
}`,

    python: String.raw`nama = "Budi"

print("isi     :", nama)
print("panjang :", len(nama))

# String bersifat IMMUTABLE — tidak bisa diubah per huruf
# nama[0] = "R"        -> TypeError
nama = "R" + nama[1:]   # yang bisa: membuat string BARU
print("diubah  :", nama)

# Menyambung
sapaan = "Halo, " + nama + "!"
print("\nsambung  :", sapaan)
print("f-string :", f"Halo, {nama}!")       # cara yang lebih disukai

# Membandingkan cukup dengan == (membandingkan isi)
a, b = "Budi", "Budi"
print("\na == b :", a == b)

# Slicing: [mulai:batas], batas TIDAK ikut
teks = "Algoritma"
print("\npotongan 0-4 :", teks[0:4])        # Algo
print("4 huruf akhir:", teks[-4:])          # itma
print("dibalik      :", teks[::-1])         # langkah -1 membalik urutan

# Method yang sering dipakai — semuanya mengembalikan string BARU
s = "  Algoritma dan Pemrograman  "
print("\nasli        : '" + s + "'")
print("strip()     : '" + s.strip() + "'")      # buang spasi tepi
print("upper()     :", s.strip().upper())
print("replace()   :", s.strip().replace("dan", "&"))
print("split()     :", s.split())               # jadi list per kata
print("find('dan') :", s.find("dan"))

# PENTING: method tidak mengubah aslinya
t = "budi"
t.upper()                   # hasilnya dibuang begitu saja
print("\nt setelah t.upper()      :", t)        # tetap "budi"
t = t.upper()               # harus ditugaskan ulang
print("t setelah t = t.upper()  :", t)

# Menelusuri per karakter
kalimat = input("\nMasukkan satu kalimat: ")
vokal = sum(1 for c in kalimat if c in "aiueoAIUEO")
print("jumlah vokal :", vokal)

# Menyambung banyak string: join jauh lebih hemat daripada += berulang
kata = ["Algoritma", "dan", "Pemrograman"]
print("hasil join :", " ".join(kata))`
  },

  output: `isi          : Budi
strlen (isi) : 4
sizeof(wadah): 50

setelah strcpy : Ani
hasil strcat   : Halo, Ani!

a == b          : 0  <- membandingkan alamat, menyesatkan
strcmp(a,b)==0  : 1  <- membandingkan isi, inilah yang benar

per karakter : A l g o r i t m a
dibalik      : amtiroglA`,

  kesalahanUmum: [
    {
      salah: 'Membandingkan string C dengan `==`: `if (nama == "Budi")`',
      kenapa: 'Nama array berarti **alamat**, sehingga `==` membandingkan letak memori, bukan isinya. Hasilnya hampir selalu salah meski teksnya identik. Kompiler tidak protes karena membandingkan alamat memang sah.',
      benar: 'Gunakan `strcmp(nama, "Budi") == 0`. Perhatikan `== 0` itu wajib: `if (strcmp(a,b))` tanpa itu justru bernilai benar saat teksnya **berbeda**.'
    },
    {
      salah: 'Wadah kekurangan satu slot: `char nama[4] = "Budi";`',
      kenapa: 'Empat huruf memenuhi seluruh slot, sehingga tidak tersisa tempat untuk penanda akhir `\\0`. Fungsi seperti `printf("%s")` lalu terus membaca melewati batas array sampai kebetulan menemukan nol — menghasilkan teks sampah di belakangnya.',
      benar: 'Sediakan minimal satu slot lebih: `char nama[5] = "Budi";` atau lebih aman `char nama[50];`. Ingat rumusnya: **jumlah huruf + 1**.'
    },
    {
      salah: 'Menugasi array string langsung: `char nama[20]; nama = "Ani";`',
      kenapa: 'Nama array adalah alamat tetap yang tidak bisa dipindahkan ke tempat lain, sehingga kompiler menolaknya. Ini sering mengejutkan mahasiswa yang terbiasa dengan Python atau C++.',
      benar: 'Salin isinya dengan `strcpy(nama, "Ani");`. Di **C++** dengan tipe `string`, penulisan `nama = "Ani";` justru sah karena ukurannya diurus otomatis.'
    },
    {
      salah: 'Memakai `strcpy` tanpa memeriksa ukuran tujuan.',
      kenapa: '`strcpy` menyalin sampai bertemu `\\0` **tanpa peduli** apakah wadahnya cukup. Kelebihannya ditulis melewati batas array dan menimpa memori tetangga (*buffer overflow*). Gejalanya sering muncul di tempat yang tidak berhubungan sehingga sangat sulit dilacak.',
      benar: 'Pastikan wadahnya cukup, atau batasi dengan `strncpy(tujuan, sumber, sizeof(tujuan) - 1);` lalu tutup manual dengan `tujuan[sizeof(tujuan)-1] = 0;`.'
    },
    {
      salah: 'Di Python, mengira method mengubah string aslinya: `nama.upper()` saja.',
      kenapa: 'String bersifat *immutable*, sehingga semua method mengembalikan string **baru** tanpa menyentuh aslinya. Menulis `nama.upper()` tanpa menugaskan hasilnya membuat hasil itu langsung terbuang, dan `nama` tetap seperti semula.',
      benar: 'Tugaskan kembali hasilnya: `nama = nama.upper()`. Berlaku untuk semua method string seperti `.strip()`, `.replace()`, dan `.lower()`.'
    },
    {
      salah: 'Memanggil `strlen` di dalam kondisi perulangan: `for (i = 0; i < strlen(s); i++)`',
      kenapa: '`strlen` dihitung ulang **setiap putaran**, dan tiap panggilan menelusuri seluruh string dari awal. Akibatnya total biayanya melonjak dari O(n) menjadi O(n²) — pada teks panjang perbedaannya terasa nyata.',
      benar: 'Simpan dulu: `int n = strlen(s);` lalu pakai `n` di dalam perulangan. Alternatif lain, telusuri sampai penanda akhir: `for (i = 0; s[i] != 0; i++)`.'
    }
  ],

  analogi: `
Untuk **null terminator**, pakai analogi **kereta api**. Tiap gerbong adalah satu huruf, dan \`'\\0'\` adalah **gerbong penanda ekor**. Masinis (yaitu \`printf\`) tidak diberi tahu panjang keretanya — ia berjalan dari depan sambil melihat, dan baru berhenti setelah melihat gerbong ekor. Kalau gerbong ekornya lupa dipasang, masinis terus berjalan ke rangkaian kereta lain. Analogi ini sekaligus menjelaskan kenapa \`"Budi"\` butuh 5 tempat, bukan 4.

Untuk beda **\`strlen\` dan \`sizeof\`**, pakai analogi **botol minum**: \`sizeof\` adalah **kapasitas botolnya** (500 ml), sedangkan \`strlen\` adalah **isi air yang benar-benar ada** (200 ml). Dua pertanyaan berbeda dengan jawaban berbeda.

Untuk **\`==\` versus \`strcmp\`**, ini yang paling mengena: *"Dua rumah punya isi yang persis sama. Apakah itu berarti rumahnya sama?"* Tidak — alamatnya berbeda. Tanda \`==\` membandingkan **alamat rumah**, sedangkan \`strcmp\` masuk ke dalam dan **membandingkan isinya** satu per satu.

Untuk **buffer overflow**, peragakan dengan menuang air dari botol besar ke gelas kecil. Airnya tidak hilang — ia **tumpah membasahi meja**, mengenai barang lain di sekitarnya. Persis seperti \`strcpy\` yang menimpa memori tetangga.

Untuk **immutable di Python**, pakai analogi **buku cetak**: kamu tidak bisa mengganti satu huruf di buku yang sudah dicetak — kamu harus **mencetak buku baru** dengan huruf yang sudah diperbaiki. Karena itu hasilnya wajib disimpan; kalau tidak, buku barunya cuma dibuang.
`,

  latihan: [
    'Buat program yang meminta satu kata lalu menampilkannya terbalik. Kerjakan di C (ubah langsung di tempat), lalu di Python (memakai slicing). Jelaskan kenapa cara C tidak bisa dipakai di Python.',
    'Buat program penghitung jumlah huruf vokal, konsonan, dan spasi dari sebuah kalimat. Ingat: untuk membaca kalimat berspasi, `scanf("%s")` tidak cukup.',
    'Buat program pemeriksa palindrom — kata yang sama dibaca dari depan maupun belakang, misal "katak". Abaikan perbedaan huruf besar-kecil.',
    'Buat program yang meminta nama lengkap lalu menampilkan inisialnya. Contoh: `"budi santoso wijaya"` menjadi `"B.S.W."`.',
    'Sengaja tulis `char nama[4] = "Budi";` lalu cetak dengan `printf("%s")`. Catat apa yang muncul di komputermu dan jelaskan penyebabnya. Setelah itu perbaiki.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang kenapa `if (nama == "Budi")` tidak bekerja di C tetapi bekerja di Python. Gambarkan kotak memorinya supaya perbedaannya terlihat.'
  ]
});

TOPICS.push({
  id: 'fungsi',
  judul: 'Fungsi (parameter, return, void)',
  kategori: 'algoritma',
  tag: ['fungsi', 'function', 'parameter', 'return', 'void', 'scope'],
  ringkas: 'Memecah program jadi bagian kecil yang bisa dipakai ulang — beserta aturan scope dan return.',

  fungsi: `**Memberi nama pada sepotong pekerjaan, supaya bisa dipakai ulang dan diuji sendiri.**

Fungsi adalah alat paling dasar untuk melawan kode yang membesar tak terkendali.

Terpakai di:

- **Menghapus pengulangan** — kode yang sama muncul tiga kali berarti satu fungsi yang belum dibuat
- **Membuat kode bisa diuji** — kamu tidak bisa menguji sepotong kode yang terkubur di tengah fungsi utama
- **Memecah masalah besar** — satu fungsi per langkah, masing-masing bisa dipahami sendiri
- **Rekayasa Perangkat Lunak** — prinsip satu tanggung jawab dimulai dari sini
- **Uji Kualitas Perangkat Lunak** — unit test menguji **fungsi**, jadi kode tanpa fungsi tidak bisa di-unit-test sama sekali

Patokan yang layak dipegang: **kalau kamu tidak bisa memberi nama yang tepat untuk sebuah fungsi, ia mengerjakan terlalu banyak hal.**`,

  praktik: {
    tujuan: `Kamu bisa memecah program panjang menjadi fungsi yang masing-masing punya satu tugas jelas dan bisa diuji sendiri.`,
    alat: [
      'Python 3 atau C++',
      'Satu tugas praktikum lamamu yang panjang'
    ],
    langkah: [
      { judul: 'Cari kode yang berulang',
        isi: `Buka tugas lamamu dan cari potongan yang muncul lebih dari sekali — bahkan kalau berbeda sedikit.

Bagian yang berbeda itu biasanya calon **parameter**. Kalau ada tiga potongan yang sama kecuali angkanya, angka itulah parameternya.` },
      { judul: 'Beri nama yang menyebut apa yang DIHASILKAN',
        isi: `Nama fungsi yang baik biasanya kata kerja atau pertanyaan:

- \`hitung_rata_rata\`, \`baca_data_mahasiswa\`, \`apakah_lulus\`
- bukan \`proses\`, \`data2\`, atau \`fungsiBaru\`

Kalau nama terbaik yang terpikir adalah "prosesSemua", itu tanda fungsinya mengerjakan lebih dari satu hal.` },
      { judul: 'Tetapkan apa yang masuk dan apa yang keluar',
        isi: `Tulis dua barisnya sebelum menulis isinya:

- **masuk**: daftar nilai
- **keluar**: rata-ratanya sebagai pecahan

Fungsi yang **mengembalikan nilai** hampir selalu lebih mudah diuji daripada yang **mencetak langsung**. Pisahkan menghitung dari menampilkan.` },
      { judul: 'Hindari mengubah keadaan di luar',
        isi: `Fungsi yang hanya bergantung pada parameternya dan hanya mengembalikan nilai disebut **murni**, dan ia:

- bisa diuji tanpa menyiapkan apa pun
- memberi hasil sama untuk masukan sama, selalu
- tidak merusak apa pun kalau dipanggil dua kali

Tidak semua fungsi bisa murni, tetapi makin banyak yang murni, makin mudah kodemu dipercaya.` },
      { judul: 'Tulis satu pengujian kecil untuk tiap fungsi',
        isi: `Tidak perlu kerangka kerja apa pun. Cukup pernyataan \`assert\`:

- \`assert hitung_rata_rata([80, 90]) == 85\`
- \`assert hitung_rata_rata([100]) == 100\`

Kalau \`assert\` gagal, program berhenti dengan jelas. Ini pengujian paling sederhana yang tetap berguna, dan kamu akan menemuinya lagi sebagai **unit testing**.` },
      { judul: 'Jaga panjangnya',
        isi: `Kalau fungsimu lebih dari sekitar tiga puluh baris, atau tidak muat dalam satu layar, pertimbangkan memecahnya.

Ini bukan aturan kaku — tetapi fungsi panjang hampir selalu punya bagian yang bisa diberi nama sendiri, dan memberi nama itu membuat kodenya menjelaskan dirinya.` }
    ],
    cek: [
      'Setiap fungsimu bisa dijelaskan dalam satu kalimat tanpa memakai kata "dan"',
      'Setiap fungsi punya sedikitnya satu pernyataan assert yang membuktikannya bekerja',
      'Tidak ada potongan kode yang sama persis muncul dua kali di berkasmu'
    ]
  },

  konsep: `
Ketika program bertambah panjang, menaruh semuanya di dalam \`main\` membuatnya sulit dibaca dan sulit diperbaiki. **Fungsi** memecah program menjadi bagian-bagian kecil yang masing-masing mengerjakan **satu tugas jelas**.

Manfaatnya ada empat, dan semuanya terasa nyata begitu programnya membesar:

- **Dipakai ulang** — tulis sekali, panggil berkali-kali dari mana saja
- **Mudah dibaca** — \`hitungLuas(5, 3)\` langsung menjelaskan maksudnya tanpa perlu membaca isinya
- **Mudah diperbaiki** — kalau rumusnya salah, cukup benahi di satu tempat
- **Mudah diuji** — tiap bagian bisa dicoba terpisah, sehingga sumber kesalahan cepat ditemukan

Sebuah fungsi punya empat bagian:

- **Tipe kembalian** — jenis nilai yang dihasilkan, atau \`void\` bila tidak menghasilkan apa-apa
- **Nama** — sebaiknya berupa kata kerja yang menjelaskan tugasnya, misal \`hitungRataRata\`
- **Parameter** — data yang dibutuhkan dari luar, boleh kosong
- **Badan** — langkah-langkah yang dikerjakan

Cara memandangnya yang paling berguna: fungsi itu seperti **mesin**. Ada yang masuk (parameter), ada proses di dalam, ada yang keluar (nilai kembalian). Yang memanggil cukup tahu *apa* yang dihasilkan, tidak perlu tahu *bagaimana* caranya — dan prinsip ini nantinya berkembang menjadi **abstraksi** di materi OOP.

Satu hal yang wajib dipahami sejak awal: **parameter di C dan C++ menerima salinan**, bukan variabel aslinya. Karena itu mengubah parameter di dalam fungsi tidak memengaruhi variabel pemanggil — pembahasan lengkapnya ada di topik berikutnya.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int tambah(int a, int b) {\n//  ^     ^        ^\n// tipe  nama   parameter\n    return a + b;\n}\n\nint hasil = tambah(3, 5);   // 8',
      penjelasan: `
Mari bedah tiap bagiannya:

- **\`int\` di depan** adalah **tipe nilai yang dikembalikan**. Fungsi ini berjanji akan menghasilkan sebuah \`int\`. Kalau janji itu diingkari — tidak ada \`return\` — hasilnya nilai sampah.
- **\`(int a, int b)\`** adalah **parameter**, yaitu variabel baru yang hanya hidup di dalam fungsi ini. Keduanya **diisi salinan** dari nilai yang dikirim pemanggil.
- **\`return a + b;\`** menghitung hasilnya lalu **langsung mengakhiri fungsi** dan menyerahkan nilainya ke pemanggil.

Istilah yang perlu dibedakan: \`a\` dan \`b\` di deklarasi disebut **parameter**, sedangkan \`3\` dan \`5\` yang dikirim saat pemanggilan disebut **argumen**. Perbedaan ini sering ditanyakan saat ujian.

Perhatikan juga bahwa \`tambah(3, 5)\` **menghasilkan nilai**, sehingga bisa dipakai di mana pun nilai dibutuhkan — disimpan ke variabel, dicetak langsung, atau bahkan jadi argumen fungsi lain seperti \`tambah(tambah(1,2), 3)\`.
`
    },
    {
      bahasa: 'c',
      kode: 'int tambah(int a, int b);   // prototipe: janji "fungsi ini ada"\n\nint main(void) {\n    printf("%d", tambah(3, 5));\n    return 0;\n}\n\nint tambah(int a, int b) {  // definisi lengkapnya menyusul\n    return a + b;\n}',
      penjelasan: `
Kompiler C membaca berkas **dari atas ke bawah, satu kali jalan**. Ketika sampai di \`main\` dan menemui \`tambah(3, 5)\`, ia belum pernah melihat fungsi itu sehingga tidak tahu berapa parameternya maupun tipe kembaliannya.

**Prototipe** menyelesaikannya: ia berupa janji di awal berkas — *"nanti ada fungsi bernama \`tambah\` yang menerima dua \`int\` dan mengembalikan \`int\`"*. Dengan itu kompiler bisa memeriksa pemanggilannya meski definisi lengkapnya baru muncul belakangan.

Perhatikan prototipe diakhiri **titik koma**, bukan kurung kurawal.

Kapan prototipe tidak diperlukan? Kalau fungsinya **ditulis di atas** pemanggilnya. Karena itu banyak kode praktikum menaruh semua fungsi sebelum \`main\` — cara ini sah dan lebih sederhana.

Kalau prototipe lupa ditulis, kompiler modern memberi peringatan *"implicit declaration of function"*, dan pada standar terbaru hal itu sudah dianggap error. Jangan abaikan peringatan ini — biasanya program tetap terbentuk tapi perilakunya tidak bisa diandalkan.
`
    },
    {
      bahasa: 'c',
      kode: 'void sapa(char nama[]) {     // void = tidak mengembalikan apa pun\n    printf("Halo, %s!\\n", nama);\n    // tidak perlu return\n}\n\nint x = sapa("Budi");        // ERROR: tidak ada nilai untuk disimpan',
      penjelasan: `
\`void\` berarti fungsi ini **tidak menghasilkan nilai apa pun**. Ia dipanggil karena **efeknya**, bukan karena hasilnya — misalnya mencetak ke layar, mengubah data, atau menyimpan berkas.

Karena tidak menghasilkan nilai, memanggilnya harus berdiri sendiri sebagai satu pernyataan: \`sapa("Budi");\`. Mencoba menyimpannya ke variabel langsung ditolak kompiler, karena memang tidak ada apa pun untuk disimpan.

Di dalam fungsi \`void\`, kata \`return\` tetap boleh dipakai **tanpa nilai** — cukup \`return;\` — untuk keluar lebih awal. Pola ini sering dipakai sebagai penjagaan di awal fungsi:

\`if (n <= 0) return;\`

Cara memilihnya sederhana: kalau pemanggil **butuh jawaban**, pakai tipe kembalian. Kalau pemanggil cuma butuh **pekerjaannya dilakukan**, pakai \`void\`.
`
    },
    {
      bahasa: 'c',
      kode: 'int cek(int n) {\n    if (n > 0) {\n        return 1;           // fungsi BERHENTI di sini\n        printf("tidak pernah tercetak");\n    }\n    return 0;\n}',
      penjelasan: `
\`return\` melakukan **dua hal sekaligus**: menyerahkan nilai ke pemanggil, dan **mengakhiri fungsi saat itu juga**.

Karena itu \`printf\` pada contoh di atas tidak akan pernah dijalankan — ia berada setelah \`return\` dalam blok yang sama. Kode seperti ini disebut *unreachable code*, dan kompiler biasanya memberi peringatan.

Sifat "langsung berhenti" ini justru sering dimanfaatkan untuk menyederhanakan kode. Alih-alih membungkus semuanya dalam \`if\` bertingkat, kita bisa memakai **penjagaan awal**:

\`if (n <= 0) return 0;\`

lalu sisa kodenya ditulis tanpa perlu menjorok ke dalam. Gaya ini disebut *early return* dan membuat fungsi jauh lebih mudah dibaca.

Bahaya yang perlu dijaga: kalau ada **jalur yang tidak berujung pada \`return\`**, fungsi mengembalikan nilai sampah. Kompiler memperingatkan lewat *"control reaches end of non-void function"* — dan peringatan ini tidak boleh diabaikan.
`
    },
    {
      bahasa: 'c',
      kode: 'int hitung(void) {\n    int lokal = 10;      // hanya hidup di dalam fungsi ini\n    return lokal;\n}                        // di sini lokal DIHAPUS\n\nprintf("%d", lokal);     // ERROR: tidak dikenal di luar',
      penjelasan: `
Variabel yang dideklarasikan di dalam fungsi disebut **variabel lokal**, dan jangkauannya (*scope*) hanya sebatas fungsi itu. Begitu fungsinya selesai, variabelnya **dihapus dari memori**.

Dari sini muncul dua akibat yang penting:

- **Nama boleh sama tanpa saling mengganggu.** Variabel \`i\` di fungsi A sama sekali tidak berhubungan dengan \`i\` di fungsi B. Justru inilah yang membuat fungsi bisa ditulis mandiri tanpa takut bentrok.
- **Jangan pernah mengembalikan alamat variabel lokal.** Mengembalikan nilainya aman, tapi mengembalikan alamatnya menghasilkan *dangling pointer* — alamat yang menunjuk ke tempat yang sudah tidak berlaku. Bahasannya ada di topik **Pointer**.

Ada juga **variabel global** yang ditulis di luar semua fungsi dan bisa diakses dari mana saja. Terlihat praktis, tapi **sebaiknya dihindari**: karena bisa diubah dari mana saja, melacak siapa yang mengubahnya menjadi sangat sulit ketika programnya membesar. Lebih baik kirim lewat parameter — dengan begitu, ketergantungan tiap fungsi terlihat jelas dari tanda tangannya.
`
    },
    {
      bahasa: 'python',
      kode: 'def tambah(a, b):        # tanpa tipe, tanpa kurung kurawal\n    return a + b\n\ndef sapa(nama="Teman"):  # nilai bawaan kalau argumen tidak diberi\n    print(f"Halo, {nama}!")\n\nsapa()                   # Halo, Teman!\nsapa("Budi")             # Halo, Budi!',
      penjelasan: `
Python menyederhanakan beberapa hal sekaligus:

- **Tanpa tipe dan tanpa prototipe.** Python membaca seluruh berkas dulu, jadi fungsi boleh dipanggil dari mana saja asal definisinya sudah dijalankan lebih dulu.
- **Nilai bawaan parameter** membuat argumen jadi opsional. Aturannya, parameter yang punya nilai bawaan harus diletakkan **setelah** yang tidak punya.
- **Bisa mengembalikan lebih dari satu nilai** sekaligus: \`return a, b\` lalu diterima dengan \`x, y = fungsi()\`. Di C, hal ini butuh pointer atau struct.
- **Fungsi tanpa \`return\`** otomatis mengembalikan \`None\` — padanan \`void\` di C.

Satu jebakan khas Python yang perlu kamu tahu: **jangan memakai list atau dict sebagai nilai bawaan**, misal \`def f(data=[])\`. Nilai bawaan hanya dibuat **sekali** saat fungsi didefinisikan, sehingga list itu dipakai bersama oleh semua pemanggilan dan isinya menumpuk. Cara amannya: \`def f(data=None):\` lalu \`if data is None: data = []\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    // Method biasa
    static double LuasPersegiPanjang(double p, double l) {
        return p * l;
    }

    // Overloading: nama sama, parameter beda
    static int Maks(int a, int b) { return a > b ? a : b; }
    static double Maks(double a, double b) { return a > b ? a : b; }

    // Parameter bernilai bawaan
    static void Garis(int n = 30, char c = '=') {
        Console.WriteLine(new string(c, n));
    }

    // out: mengembalikan BEBERAPA nilai sekaligus
    static void HitungStatistik(int[] data, out int maks, out int min) {
        maks = data[0];
        min = data[0];
        foreach (int x in data) {
            if (x > maks) maks = x;
            if (x < min) min = x;
        }
    }

    // ref: mengubah variabel pemanggil
    static void TambahSepuluh(ref int n) {
        n += 10;
    }

    // Tuple: cara modern mengembalikan beberapa nilai
    static (int hasil, int sisa) Bagi(int a, int b) {
        return (a / b, a % b);
    }

    static void Main() {
        Garis();                                  // memakai nilai bawaan
        Console.WriteLine($"luas 5 x 3 : {LuasPersegiPanjang(5, 3)}");
        Console.WriteLine($"Maks(7, 12): {Maks(7, 12)}");
        Console.WriteLine($"Maks(2.5, 1.5): {Maks(2.5, 1.5)}");
        Garis(30, '-');

        // out
        int[] data = { 30, 10, 50, 20 };
        HitungStatistik(data, out int maks, out int min);
        Console.WriteLine($"\nmaks={maks} min={min}  <- dua hasil sekaligus");

        // ref
        int angka = 5;
        TambahSepuluh(ref angka);
        Console.WriteLine($"setelah ref : {angka}");

        // tuple
        var (hasil, sisa) = Bagi(17, 5);
        Console.WriteLine($"17 dibagi 5 = {hasil} sisa {sisa}");

        // Argumen boleh disebut namanya, sehingga urutannya bebas
        Garis(c: '*', n: 20);
    }
}`,

    java: String.raw`public class Contoh {
    // Semua method di Java harus berada di dalam class.
    // static berarti bisa dipanggil tanpa membuat object.
    static double luasPersegiPanjang(double p, double l) {
        return p * l;
    }

    // Overloading: nama sama, parameter beda
    static int maks(int a, int b) { return a > b ? a : b; }
    static double maks(double a, double b) { return a > b ? a : b; }

    // Java TIDAK punya parameter bernilai bawaan.
    // Penggantinya: overloading berlapis.
    static void garis() { garis(30, '='); }
    static void garis(int n) { garis(n, '='); }
    static void garis(int n, char c) {
        for (int i = 0; i < n; i++) System.out.print(c);
        System.out.println();
    }

    // Varargs: menerima argumen sebanyak apa pun
    static int jumlahkan(int... angka) {
        int total = 0;
        for (int x : angka) total += x;
        return total;
    }

    // Java tidak punya out/ref. Untuk beberapa hasil, kembalikan array
    // atau buat class kecil.
    static int[] hitungStatistik(int[] data) {
        int maks = data[0], min = data[0];
        for (int x : data) {
            if (x > maks) maks = x;
            if (x < min) min = x;
        }
        return new int[] { maks, min };
    }

    public static void main(String[] args) {
        garis();
        System.out.println("luas 5 x 3    : " + luasPersegiPanjang(5, 3));
        System.out.println("maks(7, 12)   : " + maks(7, 12));
        System.out.println("maks(2.5,1.5) : " + maks(2.5, 1.5));
        garis(30, '-');

        System.out.println("\nvarargs:");
        System.out.println("  jumlahkan(1,2,3)     = " + jumlahkan(1, 2, 3));
        System.out.println("  jumlahkan(1,2,3,4,5) = " + jumlahkan(1, 2, 3, 4, 5));

        int[] stat = hitungStatistik(new int[] { 30, 10, 50, 20 });
        System.out.println("\nmaks=" + stat[0] + " min=" + stat[1]);

        // Java TIDAK bisa mengubah variabel primitif pemanggil.
        // Satu-satunya cara adalah lewat return.
        int angka = 5;
        angka = tambahSepuluh(angka);
        System.out.println("lewat return : " + angka);
    }

    static int tambahSepuluh(int n) { return n + 10; }
}`,

    js: String.raw`// Cara 1: function declaration — bisa dipanggil sebelum ditulis
function luasPersegiPanjang(p, l) {
    return p * l;
}

// Cara 2: function expression — harus ditulis dulu baru dipanggil
const maks = function (a, b) {
    return a > b ? a : b;
};

// Cara 3: arrow function — paling ringkas
const kuadrat = (x) => x * x;

// Parameter bernilai bawaan
function garis(n = 30, c = "=") {
    console.log(c.repeat(n));
}

// Rest parameter: menerima argumen sebanyak apa pun
function jumlahkan(...angka) {
    return angka.reduce(function (a, b) { return a + b; }, 0);
}

// Mengembalikan beberapa nilai lewat array atau object
function bagi(a, b) {
    return { hasil: Math.floor(a / b), sisa: a % b };
}

garis();
console.log("luas 5 x 3  :", luasPersegiPanjang(5, 3));
console.log("maks(7, 12) :", maks(7, 12));
console.log("kuadrat(5)  :", kuadrat(5));
garis(30, "-");

console.log("\nrest parameter:");
console.log("  jumlahkan(1,2,3)     =", jumlahkan(1, 2, 3));
console.log("  jumlahkan(1,2,3,4,5) =", jumlahkan(1, 2, 3, 4, 5));

// Destructuring saat menerima hasil
const { hasil, sisa } = bagi(17, 5);
console.log("\n17 dibagi 5 =", hasil, "sisa", sisa);

// ---------- FUNGSI ADALAH NILAI ----------
// Ini pembeda terbesar JavaScript: fungsi bisa disimpan di variabel,
// dikirim sebagai argumen, dan dikembalikan dari fungsi lain.
function terapkan(f, x) {
    return f(x);
}
console.log("\nfungsi sebagai argumen :", terapkan(kuadrat, 6));

function pengali(n) {
    return function (x) { return x * n; };    // mengembalikan FUNGSI
}
const kaliTiga = pengali(3);
console.log("fungsi dari fungsi     :", kaliTiga(7));

// JavaScript TIDAK punya overloading — definisi kedua menimpa
function luas(sisi) { return sisi * sisi; }
function luas(p, l) { return p * l; }
console.log("\nluas(5) =", luas(5), " <- NaN, definisi kedua menimpa");
console.log("-> penggantinya: parameter bernilai bawaan");

// Argumen berlebih diabaikan, argumen kurang jadi undefined
function dua(a, b) { return [a, b]; }
console.log("\ndua(1)       :", dua(1));
console.log("dua(1,2,3,4) :", dua(1, 2, 3, 4));
console.log("-> JavaScript tidak protes soal jumlah argumen");`,

    c: String.raw`#include <stdio.h>

/* Prototipe: diperlukan karena definisinya ditulis di bawah main */
float luasPersegiPanjang(float p, float l);
int   maksimum(int a, int b);
void  garis(int n);
int   faktorLoop(int n);

int main(void) {
    garis(30);
    printf("luas 5 x 3 : %.2f\n", luasPersegiPanjang(5, 3));
    printf("maks(7, 12): %d\n", maksimum(7, 12));
    printf("5!         : %d\n", faktorLoop(5));
    garis(30);

    /* Nilai kembalian bisa langsung dipakai sebagai argumen */
    printf("maks bertingkat : %d\n", maksimum(maksimum(3, 9), 5));

    return 0;
}

/* Fungsi dengan nilai kembalian */
float luasPersegiPanjang(float p, float l) {
    return p * l;
}

int maksimum(int a, int b) {
    return (a > b) ? a : b;
}

/* void: dipanggil karena efeknya, bukan hasilnya */
void garis(int n) {
    if (n <= 0) return;              // penjagaan awal, keluar lebih cepat
    for (int i = 0; i < n; i++) printf("=");
    printf("\n");
}

/* Semua jalur wajib berujung pada return */
int faktorLoop(int n) {
    if (n < 0) return -1;            // penanda kesalahan
    int hasil = 1;
    for (int i = 2; i <= n; i++) hasil *= i;
    return hasil;
}`,

    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

/* Di C++, fungsi boleh punya nama sama asal parameternya berbeda.
   Ini disebut function overloading — tidak ada di C. */
int  luas(int sisi)            { return sisi * sisi; }
int  luas(int p, int l)        { return p * l; }
double luas(double r)          { return 3.14159 * r * r; }

/* Parameter bernilai bawaan */
void garis(int n = 30, char c = '=') {
    for (int i = 0; i < n; i++) cout << c;
    cout << endl;
}

int maksimum(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    garis();                       // pakai bawaan: 30 karakter '='
    cout << "luas persegi 5      : " << luas(5)      << endl;
    cout << "luas p.panjang 5x3  : " << luas(5, 3)   << endl;
    cout << "luas lingkaran r=2  : " << luas(2.0)    << endl;
    garis(30, '-');                // menimpa nilai bawaan

    cout << "maks(7, 12) : " << maksimum(7, 12) << endl;

    return 0;
}`,

    python: String.raw`def luas_persegi_panjang(p, l):
    """Menghitung luas. Teks ini disebut docstring."""
    return p * l


def maksimum(a, b):
    return a if a > b else b


def garis(n=30, c="="):          # nilai bawaan untuk kedua parameter
    print(c * n)


def bagi(a, b):
    """Mengembalikan DUA nilai sekaligus — tidak bisa langsung di C."""
    return a // b, a % b         # hasil bagi dan sisanya


garis()
print("luas 5 x 3 :", luas_persegi_panjang(5, 3))
print("maks(7,12) :", maksimum(7, 12))
garis(30, "-")

# Menerima dua nilai kembalian sekaligus
hasil, sisa = bagi(17, 5)
print(f"17 dibagi 5 = {hasil} sisa {sisa}")

# Argumen boleh disebut namanya, sehingga urutannya bebas
garis(c="*", n=20)

# JEBAKAN: jangan pakai list sebagai nilai bawaan
def salah(data=[]):              # list ini dibuat SEKALI saja
    data.append(1)
    return data

print("\npemanggilan 1 :", salah())    # [1]
print("pemanggilan 2 :", salah())      # [1, 1]  <- menumpuk!

def benar(data=None):
    if data is None:
        data = []                # list baru untuk tiap pemanggilan
    data.append(1)
    return data

print("\nbenar 1 :", benar())          # [1]
print("benar 2 :", benar())            # [1]`
  },

  output: `==============================
luas 5 x 3 : 15.00
maks(7, 12): 12
5!         : 120
==============================
maks bertingkat : 9`,

  kesalahanUmum: [
    {
      salah: 'Memanggil fungsi sebelum dideklarasikan, tanpa prototipe.',
      kenapa: 'Kompiler C membaca dari atas ke bawah. Saat menemui pemanggilan fungsi yang belum dikenal, ia tidak tahu tipe parameter maupun kembaliannya. Muncul peringatan *implicit declaration*, dan pada standar terbaru ini sudah dianggap error.',
      benar: 'Tulis prototipe di atas `main`: `int tambah(int a, int b);` lengkap dengan titik koma. Atau letakkan seluruh definisi fungsi di atas `main`.'
    },
    {
      salah: 'Ada jalur di dalam fungsi yang tidak berujung pada `return`.',
      kenapa: 'Kalau eksekusi sampai ke akhir fungsi non-`void` tanpa menemui `return`, nilai yang dikembalikan adalah sampah. Programnya tetap berjalan, tapi hasilnya berbeda-beda tiap kali dijalankan sehingga sangat membingungkan.',
      benar: 'Pastikan **setiap** cabang punya `return`. Perhatikan peringatan kompiler *"control reaches end of non-void function"* — itu bukan peringatan yang boleh diabaikan.'
    },
    {
      salah: 'Mengira mengubah parameter ikut mengubah variabel pemanggil.',
      kenapa: 'Di C dan C++, parameter menerima **salinan**. Perubahan di dalam fungsi hanya terjadi pada salinan itu dan hilang begitu fungsi selesai. Programnya tidak error, hasilnya saja yang tidak berubah — sehingga terasa seperti fungsinya "tidak bekerja".',
      benar: 'Kembalikan nilainya dengan `return`, atau kirim alamatnya memakai pointer (C) / reference (C++). Bahasan lengkapnya ada di topik **Pass by Value vs Reference**.'
    },
    {
      salah: 'Memakai variabel global agar "tidak repot mengirim parameter".',
      kenapa: 'Karena bisa diubah dari fungsi mana pun, melacak siapa yang mengubahnya menjadi sangat sulit ketika program membesar. Fungsi juga jadi tidak bisa diuji sendiri-sendiri karena diam-diam bergantung pada keadaan luar.',
      benar: 'Kirim lewat parameter dan kembalikan hasilnya lewat `return`. Dengan begitu, kebutuhan setiap fungsi terbaca jelas dari tanda tangannya saja.'
    },
    {
      salah: 'Di Python, memakai list sebagai nilai bawaan parameter: `def f(data=[]):`',
      kenapa: 'Nilai bawaan dibuat **satu kali** saat fungsi didefinisikan, bukan tiap kali dipanggil. Akibatnya semua pemanggilan memakai list yang sama dan isinya terus menumpuk — gejalanya membingungkan karena terlihat seperti data "bocor" antar pemanggilan.',
      benar: 'Gunakan `None` sebagai penanda: `def f(data=None):` lalu `if data is None: data = []` di baris pertama.'
    }
  ],

  analogi: `
Pakai analogi **mesin jus**. Kamu masukkan buah (parameter), mesin bekerja di dalam (badan fungsi), lalu keluar jus (nilai kembalian). Yang memakai mesin **tidak perlu tahu isi mesinnya** — cukup tahu masukan dan keluarannya. Inilah bibit konsep abstraksi yang nanti muncul lagi di OOP.

Untuk membedakan **\`void\` dan bertipe kembalian**, bandingkan dua alat: mesin jus **memberimu sesuatu** (bertipe kembalian), sedangkan mesin cuci **melakukan sesuatu** tanpa memberi benda baru (\`void\`). Pertanyaan pemandunya: *"setelah fungsi ini selesai, apakah saya butuh jawaban darinya?"*

Untuk **prototipe**, pakai analogi **daftar isi buku**. Kompiler membaca berurutan dari halaman satu. Daftar isi di depan memberitahunya *"bab berjudul \`tambah\` itu ada, nanti muncul di halaman belakang"* — sehingga ia tidak bingung saat namanya disebut lebih dulu.

Untuk **scope lokal**, gunakan analogi **catatan di kertas buram saat ujian**: kertas itu cuma berlaku selama kamu mengerjakan soal itu, dan langsung dibuang setelah selesai. Karena itu variabel \`i\` di satu fungsi tidak ada hubungannya dengan \`i\` di fungsi lain.

Untuk **return yang langsung menghentikan**, analoginya **pintu keluar**: begitu kamu melangkah keluar, semua kegiatan di dalam ruangan berhenti untukmu — tidak peduli masih ada berapa baris kode di bawahnya.
`,

  latihan: [
    'Buat fungsi `int maksimum3(int a, int b, int c)` yang mengembalikan nilai terbesar dari tiga bilangan. Petunjuk: manfaatkan fungsi `maksimum` dua parameter yang sudah ada.',
    'Buat fungsi `int isPrima(int n)` yang mengembalikan 1 bila prima dan 0 bila tidak. Gunakan di dalam `main` untuk menampilkan semua bilangan prima dari 1 sampai 50.',
    'Buat fungsi `void tampilkanArray(int a[], int n)` dan `float rataRata(int a[], int n)`. Jelaskan kenapa panjang array wajib dikirim sebagai parameter terpisah.',
    'Buat fungsi konversi suhu: `celsiusKeFahrenheit` dan `fahrenheitKeCelsius`. Uji keduanya secara bolak-balik — hasilnya harus kembali ke angka semula.',
    'Tanpa menjalankan programnya, tentukan keluaran kode ini lalu buktikan: `int f(int n) { if (n > 5) return 1; return 0; printf("halo"); }` — jelaskan kenapa `printf` tidak pernah tercetak.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang perbedaan parameter dan argumen, serta kapan sebaiknya memakai `void` dibanding tipe kembalian. Pakai satu contoh nyata untuk masing-masing.'
  ]
});

TOPICS.push({
  id: 'pass-by-value-reference',
  judul: 'Pass by Value vs Pass by Reference',
  kategori: 'algoritma',
  tag: ['pass by value', 'pass by reference', 'parameter', 'salinan', 'referensi'],
  ringkas: 'Kenapa fungsi kadang bisa mengubah variabel aslinya dan kadang tidak — jawaban dari kebingungan terbesar soal fungsi.',

  fungsi: `**Mengendalikan apakah sebuah fungsi boleh mengubah data pemanggilnya.**

Ini menjelaskan salah satu kebingungan terbesar pemula: *"kenapa nilainya tidak berubah padahal sudah saya ubah di dalam fungsi?"* — atau kebalikannya, *"kenapa data aslinya ikut berubah padahal saya tidak menyuruhnya?"*

Terpakai di:

- **Fungsi tukar dan urut** — mustahil bekerja tanpa acuan
- **Menghindari salinan mahal** — mengirim array satu juta elemen *by value* menyalin seluruhnya
- **Melindungi data** — parameter \`const\` menyatakan bahwa fungsi ini **tidak akan** mengubahnya
- **Python dan Java** — memahami kenapa daftar berubah tetapi angka tidak
- **Pemrograman Berorientasi Objek** — objek hampir selalu dikirim sebagai acuan

Aturan praktisnya: **kalau fungsi perlu mengubah masukannya, itu harus terlihat dari tanda tangannya** — supaya pembaca tahu tanpa membuka isinya.`,

  praktik: {
    tujuan: `Kamu bisa memprediksi apakah sebuah fungsi akan mengubah data pemanggilnya, di C++ maupun Python, dan sudah membuktikannya dengan percobaan.`,
    alat: [
      'C++ dengan g++',
      'Python 3'
    ],
    langkah: [
      { judul: 'Buat fungsi tukar yang GAGAL dulu',
        isi: `Tulis \`void tukar(int a, int b)\` yang menukar isi a dan b, lalu panggil dan cetak hasilnya.

Nilainya **tidak berubah**. Fungsi itu bekerja pada **salinan**, dan salinannya dibuang saat fungsi selesai.

Melihat kegagalannya lebih dulu membuat perbaikannya masuk akal.` },
      { judul: 'Perbaiki dengan acuan',
        isi: `Ubah menjadi \`void tukar(int &a, int &b)\` di C++, atau \`void tukar(int *a, int *b)\` di C dengan memanggil \`tukar(&x, &y)\`.

Sekarang berhasil. Tanda \`&\` pada parameter berarti *"jangan salin, pakai yang aslinya"*.` },
      { judul: 'Ukur biaya menyalin',
        isi: `Buat \`vector<int>\` berisi lima juta elemen. Kirim ke fungsi dua kali:

- sekali *by value*: \`void proses(vector<int> v)\`
- sekali *by reference*: \`void proses(const vector<int> &v)\`

Ukur waktunya. Yang pertama menyalin seluruh lima juta elemen **setiap kali dipanggil**.` },
      { judul: 'Pakai const reference sebagai kebiasaan',
        isi: `\`const vector<int> &v\` memberi dua hal sekaligus: **tanpa salinan** dan **tanpa risiko diubah**.

Jadikan ini bentuk baku untuk parameter yang besar dan tidak perlu diubah. Pembaca kodemu langsung tahu maksudmu tanpa membaca isinya.` },
      { judul: 'Pahami perilaku Python',
        isi: `Python selalu mengirim **acuan ke objek**, tetapi hasilnya terasa berbeda karena sifat objeknya:

- angka dan teks **tidak bisa diubah**, jadi penugasan di dalam fungsi hanya mengganti nama lokal
- daftar dan kamus **bisa diubah**, jadi \`lst.append(1)\` di dalam fungsi **terlihat** dari luar

Buktikan keduanya: buat fungsi yang menambah angka dan fungsi yang menambah elemen daftar, lalu bandingkan.` },
      { judul: 'Kenali jebakan penugasan ulang di Python',
        isi: `\`def f(lst): lst = [9, 9]\` **tidak** mengubah daftar pemanggil — ia cuma mengarahkan nama lokal ke daftar baru.

Tetapi \`def f(lst): lst[0] = 9\` **mengubahnya**.

Bedanya: yang pertama mengganti **namanya**, yang kedua mengubah **isinya**. Perbedaan ini menjelaskan hampir semua kebingungan tentang "pass by reference" di Python.` }
    ],
    cek: [
      'Fungsi tukar versi nilai gagal menukar, dan versi acuan berhasil',
      `Pengiriman by value pada lima juta elemen terbukti jauh lebih lambat daripada const reference`,
      `Kamu bisa menjelaskan kenapa menambah elemen daftar terlihat dari luar tetapi menugaskan ulang daftar tidak`
    ]
  },

  konsep: `
Ini penjelasan atas satu keluhan yang hampir pasti kamu dengar saat mendampingi praktikum: *"Kak, fungsi saya sudah benar tapi nilainya tidak berubah!"*

Jawabannya terletak pada **apa yang sebenarnya dikirim** ke dalam fungsi.

**Pass by value** berarti yang dikirim adalah **salinan nilainya**. Fungsi bekerja pada salinan itu, sehingga sekeras apa pun ia mengubahnya, variabel asli di pemanggil tidak tersentuh. Salinannya pun langsung dibuang begitu fungsi selesai.

**Pass by reference** berarti yang dikirim adalah **akses ke variabel aslinya**. Perubahan di dalam fungsi langsung terasa di pemanggil.

Yang wajib kamu ingat: **di C, semuanya pass by value — tanpa kecuali.** C tidak punya pass by reference sama sekali. Yang biasa disebut "pass by reference di C" sebenarnya tetap pass by value, hanya saja **yang disalin adalah alamatnya**. Karena salinan alamat tetap menunjuk ke tempat yang sama, fungsi bisa menjangkau dan mengubah data aslinya.

Tiap bahasa menanganinya berbeda:

- **C** — selalu salinan. Untuk bisa mengubah asli, kirim **pointer** lalu ubah lewat \`*p\`.
- **C++** — punya **reference** sungguhan dengan tanda \`&\` pada parameter. Lebih ringkas karena pemanggil menulis biasa saja.
- **Python** — yang dikirim adalah **acuan ke objek**. Bisa tidaknya diubah ditentukan oleh **mutable atau tidaknya objek** itu, bukan oleh cara pemanggilan.

Satu pengecualian penting di C dan C++: **array selalu terasa seperti pass by reference**, karena nama array meluruh menjadi alamat. Inilah sebabnya fungsi bisa mengubah isi array tanpa perlu tanda \`&\` sama sekali.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'void ubah(int x) {      // x adalah SALINAN\n    x = 99;             // hanya salinan yang berubah\n}\n\nint a = 5;\nubah(a);\nprintf("%d", a);        // tetap 5',
      penjelasan: `
Saat \`ubah(a)\` dipanggil, terjadi tiga langkah:

- Dibuat **variabel baru** bernama \`x\` di dalam fungsi
- Nilai \`a\` (yaitu 5) **disalin** ke dalam \`x\`
- Sejak titik ini, \`x\` dan \`a\` **sama sekali tidak berhubungan**

Jadi \`x = 99\` cuma mengubah salinan. Begitu fungsi selesai, \`x\` dihapus dan perubahannya lenyap bersamanya.

Inilah yang membuat mahasiswa mengira fungsinya rusak. Padahal fungsinya bekerja persis seperti yang diperintahkan — masalahnya ada pada **pemahaman tentang apa yang dikirim**.

Cara mengeceknya sangat meyakinkan saat mengajar: cetak alamatnya di kedua tempat dengan \`printf("%p", &x)\` di dalam fungsi dan \`printf("%p", &a)\` di \`main\`. **Alamatnya berbeda** — bukti nyata bahwa keduanya memang dua variabel terpisah.
`
    },
    {
      bahasa: 'c',
      kode: 'void ubah(int *x) {     // menerima ALAMAT\n    *x = 99;            // ubah isi di alamat itu\n}\n\nint a = 5;\nubah(&a);               // kirim alamat a\nprintf("%d", a);        // 99 — berubah!',
      penjelasan: `
Perhatikan baik-baik: **ini tetap pass by value.** Yang disalin sekarang adalah **alamatnya**, bukan nilainya.

Bedanya, salinan alamat tetap menunjuk ke **tempat yang sama persis**. Jadi ketika fungsi menulis lewat \`*x\`, yang berubah adalah isi di lokasi asli — yaitu variabel \`a\` itu sendiri.

Ada tiga tanda yang harus muncul bersamaan, dan lupa salah satunya membuat kodenya gagal:

- **\`int *x\`** pada parameter — menyatakan yang diterima adalah alamat
- **\`&a\`** saat memanggil — mengirim alamat, bukan nilai
- **\`*x\`** saat mengubah — membuka isi di alamat tersebut

Kesalahan paling sering adalah menulis \`x = 99;\` tanpa bintang. Itu hanya mengubah **salinan alamatnya**, sehingga pointer lokal berpindah menunjuk ke alamat 99 — dan variabel asli tidak tersentuh sama sekali.

Pola ini juga menjelaskan \`scanf("%d", &umur)\`: \`scanf\` perlu mengubah variabelmu, jadi ia butuh alamatnya.
`
    },
    {
      bahasa: 'cpp',
      kode: 'void ubah(int &x) {     // & pada PARAMETER = reference\n    x = 99;             // tidak perlu bintang\n}\n\nint a = 5;\nubah(a);                // pemanggil menulis biasa saja\nprintf("%d", a);        // 99',
      penjelasan: `
C++ menyediakan **reference**, yang bisa dipahami sebagai **nama lain** (alias) untuk variabel yang sama. Bukan salinan, bukan pula pointer yang harus dibuka manual — \`x\` benar-benar **adalah** \`a\`, cuma dengan sebutan berbeda.

Keunggulannya dibanding pointer:

- **Lebih bersih** — tidak perlu \`*\` saat memakai maupun \`&\` saat memanggil
- **Lebih aman** — reference wajib diarahkan sejak awal dan **tidak bisa bernilai null**
- **Tidak bisa dipindah** — sekali menjadi alias suatu variabel, seterusnya begitu

Tapi ada harga yang dibayar: **dari sisi pemanggil, tidak terlihat bahwa variabelnya bisa berubah.** Tulisan \`ubah(a)\` tampak persis sama dengan pemanggilan biasa. Di C, tanda \`&a\` justru menjadi peringatan visual bahwa variabel ini diserahkan untuk diubah.

Hati-hati juga membedakan dua makna tanda \`&\`: pada **parameter** (\`int &x\`) ia berarti reference, sedangkan pada **ekspresi** (\`&a\`) ia berarti "alamat dari". Simbol sama, pekerjaan berbeda — persis seperti \`*\` pada pointer.
`
    },
    {
      bahasa: 'c',
      kode: 'void ubahArray(int a[], int n) {   // tanpa & sama sekali\n    a[0] = 99;                     // tetap mengubah aslinya!\n}\n\nint data[3] = {1, 2, 3};\nubahArray(data, 3);\nprintf("%d", data[0]);             // 99',
      penjelasan: `
Inilah pengecualian yang sering membingungkan: **array selalu berperilaku seperti pass by reference**, padahal aturan C bilang semuanya pass by value.

Penjelasannya konsisten: nama array, saat dipakai dalam ekspresi, **meluruh menjadi alamat elemen pertamanya**. Jadi \`ubahArray(data, 3)\` sebenarnya mengirim sebuah **alamat**, bukan seluruh isi array. Aturan pass by value tetap berlaku — yang disalin memang alamatnya.

Kenapa C dirancang begitu? Karena menyalin seluruh array setiap kali dikirim ke fungsi akan sangat boros. Array berisi sejuta elemen akan disalin sejuta kali.

Konsekuensi praktis yang harus kamu ingatkan ke mahasiswa: **fungsi bisa merusak isi array pemanggil tanpa sengaja.** Kalau memang tidak ingin diubah, tegaskan dengan \`const\`:

\`void cetak(const int a[], int n)\`

Dengan itu, kompiler akan menolak setiap upaya penulisan ke dalam array tersebut.
`
    },
    {
      bahasa: 'python',
      kode: 'def ubah_angka(n):\n    n = 99            # mengikat ulang nama lokal saja\n\ndef ubah_list(d):\n    d.append(99)      # MENGUBAH isi objek yang sama\n\nangka = 5\nubah_angka(angka)\nprint(angka)          # 5 — tidak berubah\n\ndata = [1, 2]\nubah_list(data)\nprint(data)           # [1, 2, 99] — berubah!',
      penjelasan: `
Python tidak memakai istilah pass by value maupun pass by reference. Cara kerjanya disebut ***call by sharing***: yang dikirim adalah **acuan ke objek**, dan objeknya dipakai bersama.

Yang menentukan hasilnya bukan cara memanggil, melainkan **sifat objeknya**:

- **Immutable** (\`int\`, \`float\`, \`str\`, \`tuple\`) — isinya memang tidak bisa diubah. Menulis \`n = 99\` hanya **mengikat ulang nama lokal** ke objek lain, sehingga yang di pemanggil tetap utuh.
- **Mutable** (\`list\`, \`dict\`, \`set\`) — isinya bisa diubah. Memanggil \`d.append(99)\` **mengubah objek yang sama**, sehingga perubahannya terlihat di pemanggil.

Kunci untuk membedakannya: perhatikan **apakah barisnya menugaskan ulang atau memanggil method**.

- \`d = [0, 0]\` → mengikat ulang nama lokal, **asli tidak berubah**
- \`d.append(0)\` → mengubah isi objeknya, **asli ikut berubah**

Kalau kamu ingin mengubah bilangan dan hasilnya terasa di pemanggil, Python tidak menyediakan pointer. Cara idiomatisnya adalah **mengembalikan nilainya**: \`angka = ubah_angka(angka)\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    // 1. Bawaan: pass by value — hanya salinan
    static void GagalTukar(int a, int b) {
        int simpan = a; a = b; b = simpan;
    }

    // 2. ref: pass by reference SUNGGUHAN. Variabel harus sudah terisi.
    static void Tukar(ref int a, ref int b) {
        int simpan = a; a = b; b = simpan;
    }

    // 3. out: seperti ref, tapi untuk MENGISI variabel yang belum terisi.
    //    Method WAJIB mengisinya sebelum selesai.
    static void HitungStatistik(int[] data, out int maks, out int min) {
        maks = data[0];
        min = data[0];
        foreach (int x in data) {
            if (x > maks) maks = x;
            if (x < min) min = x;
        }
    }

    // Array dan object dikirim sebagai SALINAN RUJUKAN:
    // isinya bisa diubah, tapi menugasi ulang tidak berpengaruh.
    static void UbahIsi(int[] a) { a[0] = 99; }        // asli IKUT berubah
    static void GantiArray(int[] a) { a = new int[] { 0, 0 }; }   // tidak berpengaruh

    class Kotak { public int Nilai; }
    static void UbahObjek(Kotak k) { k.Nilai = 99; }   // asli ikut berubah
    static void GantiObjek(Kotak k) { k = new Kotak { Nilai = 0 }; }  // tidak

    static void Main() {
        int a = 1, b = 2;

        GagalTukar(a, b);
        Console.WriteLine($"setelah GagalTukar : a={a} b={b}  <- tidak berubah");

        Tukar(ref a, ref b);        // 'ref' WAJIB ditulis juga saat memanggil
        Console.WriteLine($"setelah Tukar(ref) : a={a} b={b}  <- tertukar");

        HitungStatistik(new int[] { 30, 10, 50 }, out int maks, out int min);
        Console.WriteLine($"\nout: maks={maks} min={min}  <- dua hasil sekaligus");

        int[] arr = { 1, 2, 3 };
        UbahIsi(arr);
        Console.WriteLine($"\nsetelah UbahIsi    : {string.Join(",", arr)}  <- berubah");
        GantiArray(arr);
        Console.WriteLine($"setelah GantiArray : {string.Join(",", arr)}  <- TIDAK berubah");

        Kotak k = new Kotak { Nilai = 1 };
        UbahObjek(k);
        Console.WriteLine($"\nsetelah UbahObjek  : {k.Nilai}  <- berubah");
        GantiObjek(k);
        Console.WriteLine($"setelah GantiObjek : {k.Nilai}  <- TIDAK berubah");

        Console.WriteLine("\nRingkasan C#:");
        Console.WriteLine("  tanpa ref/out -> salinan (isi object tetap bisa diubah)");
        Console.WriteLine("  dengan ref/out -> variabel aslinya benar-benar terjangkau");
    }
}`,

    java: String.raw`public class Contoh {
    // Java SELALU pass by value. Tidak ada ref, tidak ada out, tidak ada pointer.
    static void gagalTukar(int a, int b) {
        int simpan = a; a = b; b = simpan;
    }

    // Object pun dikirim sebagai SALINAN RUJUKAN.
    // Isinya bisa diubah, tapi menugasi ulang tidak berpengaruh.
    static void ubahIsi(int[] a) { a[0] = 99; }             // asli IKUT berubah
    static void gantiArray(int[] a) { a = new int[] {0, 0}; } // tidak berpengaruh

    static class Kotak { int nilai; }
    static void ubahObjek(Kotak k) { k.nilai = 99; }        // asli ikut berubah
    static void gantiObjek(Kotak k) { k = new Kotak(); }    // tidak berpengaruh

    // Karena tidak ada ref/out, beberapa hasil dikembalikan lewat array
    static int[] hitungStatistik(int[] data) {
        int maks = data[0], min = data[0];
        for (int x : data) {
            if (x > maks) maks = x;
            if (x < min) min = x;
        }
        return new int[] { maks, min };
    }

    public static void main(String[] args) {
        int a = 1, b = 2;
        gagalTukar(a, b);
        System.out.println("setelah gagalTukar : a=" + a + " b=" + b + "  <- tidak berubah");
        System.out.println("-> di Java, menukar dua int lewat method MUSTAHIL");

        int[] arr = { 1, 2, 3 };
        ubahIsi(arr);
        System.out.println("\nsetelah ubahIsi    : " + arr[0] + "  <- berubah");
        gantiArray(arr);
        System.out.println("setelah gantiArray : " + arr[0] + "  <- TIDAK berubah");

        Kotak k = new Kotak();
        k.nilai = 1;
        ubahObjek(k);
        System.out.println("\nsetelah ubahObjek  : " + k.nilai + "  <- berubah");
        gantiObjek(k);
        System.out.println("setelah gantiObjek : " + k.nilai + "  <- TIDAK berubah");

        int[] stat = hitungStatistik(new int[] { 30, 10, 50 });
        System.out.println("\nlewat return: maks=" + stat[0] + " min=" + stat[1]);

        System.out.println("\nKALIMAT KUNCI:");
        System.out.println("  \"Java selalu pass by value —");
        System.out.println("   yang disalin untuk object adalah RUJUKANNYA.\"");
        System.out.println("  Karena salinan rujukan menunjuk object yang sama,");
        System.out.println("  isinya bisa diubah. Tapi menugasi ulang hanya");
        System.out.println("  mengubah salinan itu, bukan variabel pemanggil.");
    }
}`,

    js: String.raw`// JavaScript berperilaku seperti Java dan Python:
// yang dikirim selalu SALINAN NILAI. Untuk object, nilai itu berupa rujukan.

function gagalTukar(a, b) {
    let simpan = a; a = b; b = simpan;
}

function ubahIsi(arr) { arr[0] = 99; }              // asli IKUT berubah
function gantiArray(arr) { arr = [0, 0]; }          // tidak berpengaruh

function ubahObjek(o) { o.nilai = 99; }             // asli ikut berubah
function gantiObjek(o) { o = { nilai: 0 }; }        // tidak berpengaruh

let a = 1, b = 2;
gagalTukar(a, b);
console.log("setelah gagalTukar :", a, b, " <- tidak berubah");

// Cara menukar di JavaScript: destructuring, seperti Python
[a, b] = [b, a];
console.log("setelah [a,b]=[b,a]:", a, b, " <- tertukar");

const arr = [1, 2, 3];
ubahIsi(arr);
console.log("\nsetelah ubahIsi    :", arr, " <- berubah");
gantiArray(arr);
console.log("setelah gantiArray :", arr, " <- TIDAK berubah");

const obj = { nilai: 1 };
ubahObjek(obj);
console.log("\nsetelah ubahObjek  :", obj.nilai, " <- berubah");
gantiObjek(obj);
console.log("setelah gantiObjek :", obj.nilai, " <- TIDAK berubah");

// Cara idiomatis mengubah nilai: KEMBALIKAN hasilnya
function tambahSepuluh(n) { return n + 10; }
let angka = 5;
angka = tambahSepuluh(angka);
console.log("\nlewat return :", angka);

// Kalau tidak ingin object asli ikut berubah, salin dulu
const asli = [1, 2, 3];
const salinan = [...asli];            // salinan DANGKAL (satu tingkat)
salinan.push(4);
console.log("\nasli    :", asli);
console.log("salinan :", salinan);

// Hati-hati: salinan dangkal tidak menyalin isi bersarang
const bersarang = [[1, 2], [3, 4]];
const dangkal = [...bersarang];
dangkal[0][0] = 99;
console.log("\nsalinan dangkal mengubah asli :", bersarang[0]);
const dalam = structuredClone(bersarang);   // salinan MENDALAM
dalam[0][0] = 111;
console.log("salinan mendalam aman         :", bersarang[0]);

console.log("\nRINGKASAN:");
console.log("  perhatikan bentuk barisnya —");
console.log("  o.nilai = 5  -> mengubah isi, asli IKUT berubah");
console.log("  o = {...}    -> menugasi ulang, asli TIDAK berubah");`,

    c: String.raw`#include <stdio.h>

/* PASS BY VALUE: menerima salinan, asli tidak tersentuh */
void gagalTukar(int a, int b) {
    int simpan = a;
    a = b;
    b = simpan;
    printf("  di dalam fungsi : a=%d b=%d (salinannya memang tertukar)\n", a, b);
}

/* "PASS BY REFERENCE" ala C: yang disalin adalah alamatnya */
void tukar(int *a, int *b) {
    int simpan = *a;      // buka isi di alamat a
    *a = *b;              // tulis isi b ke tempat a
    *b = simpan;
}

/* Mengembalikan DUA hasil sekaligus lewat pointer */
void hitungStatistik(int arr[], int n, int *maks, int *min) {
    *maks = arr[0];
    *min  = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > *maks) *maks = arr[i];
        if (arr[i] < *min)  *min  = arr[i];
    }
}

/* Array otomatis terasa seperti reference — tanpa & sama sekali */
void nolkan(int a[], int n) {
    for (int i = 0; i < n; i++) a[i] = 0;
}

/* const melindungi array dari perubahan tak sengaja */
void cetak(const int a[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    /* a[0] = 5;  <- ditolak kompiler karena const */
}

int main(void) {
    int a = 1, b = 2;

    printf("PASS BY VALUE\n");
    printf("  sebelum : a=%d b=%d\n", a, b);
    gagalTukar(a, b);
    printf("  sesudah : a=%d b=%d  <- tidak berubah\n\n", a, b);

    printf("LEWAT POINTER\n");
    printf("  sebelum : a=%d b=%d\n", a, b);
    tukar(&a, &b);                       // WAJIB pakai &
    printf("  sesudah : a=%d b=%d  <- tertukar\n\n", a, b);

    /* Bukti bahwa salinan menempati alamat berbeda */
    printf("alamat a di main : %p\n\n", (void *)&a);

    int data[5] = {30, 10, 50, 20, 40};
    int maks, min;
    hitungStatistik(data, 5, &maks, &min);
    printf("maks=%d min=%d  <- dua hasil dari satu fungsi\n", maks, min);

    printf("\nsebelum dinolkan : ");
    cetak(data, 5);
    nolkan(data, 5);                     // tanpa &, tapi array tetap berubah
    printf("sesudah dinolkan : ");
    cetak(data, 5);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
using namespace std;

/* 1. Pass by value: salinan */
void gagalTukar(int a, int b) {
    int simpan = a; a = b; b = simpan;
}

/* 2. Pass by pointer: cara C, tetap bisa dipakai di C++ */
void tukarPointer(int *a, int *b) {
    int simpan = *a; *a = *b; *b = simpan;
}

/* 3. Pass by reference: cara C++, paling ringkas */
void tukarReference(int &a, int &b) {
    int simpan = a; a = b; b = simpan;    // tanpa bintang
}

/* Reference juga dipakai agar data besar tidak disalin.
   const berarti "boleh dibaca, tidak boleh diubah". */
double rataRata(const vector<int> &data) {
    int total = 0;
    for (int x : data) total += x;
    return (double)total / data.size();
}

int main() {
    int a = 1, b = 2;

    gagalTukar(a, b);
    cout << "setelah gagalTukar    : a=" << a << " b=" << b << endl;

    tukarPointer(&a, &b);                 // pemanggil menulis &
    cout << "setelah tukarPointer  : a=" << a << " b=" << b << endl;

    tukarReference(a, b);                 // pemanggil menulis biasa
    cout << "setelah tukarReference: a=" << a << " b=" << b << endl;

    // C++ juga punya swap bawaan
    swap(a, b);
    cout << "setelah swap bawaan   : a=" << a << " b=" << b << endl;

    vector<int> nilai = {80, 90, 70};
    cout << "\nrata-rata : " << rataRata(nilai) << endl;
    cout << "(dikirim by reference, jadi vector tidak disalin)" << endl;

    return 0;
}`,

    python: String.raw`# Python: yang menentukan adalah MUTABLE atau tidaknya objek

def ubah_angka(n):
    n = 99                      # mengikat ulang nama LOKAL
    print("  di dalam fungsi :", n)


def ubah_list(daftar):
    daftar.append(99)           # MENGUBAH isi objek yang sama


def ganti_list(daftar):
    daftar = [0, 0]             # mengikat ulang nama lokal saja
    print("  di dalam fungsi :", daftar)


# 1. int itu immutable -> asli tidak berubah
angka = 5
print("int (immutable)")
print("  sebelum :", angka)
ubah_angka(angka)
print("  sesudah :", angka, " <- tidak berubah\n")

# 2. list itu mutable + diubah isinya -> asli ikut berubah
data = [1, 2]
print("list (mutable) + append")
print("  sebelum :", data)
ubah_list(data)
print("  sesudah :", data, " <- berubah!\n")

# 3. list mutable TAPI ditugaskan ulang -> asli tidak berubah
print("list (mutable) + tugas ulang")
print("  sebelum :", data)
ganti_list(data)
print("  sesudah :", data, " <- tidak berubah\n")

# Cara idiomatis mengubah nilai: KEMBALIKAN hasilnya
def tambah_sepuluh(n):
    return n + 10

angka = tambah_sepuluh(angka)
print("lewat return :", angka)

# Menukar dua nilai jauh lebih sederhana di Python
a, b = 1, 2
a, b = b, a
print("setelah ditukar : a =", a, ", b =", b)

# Kalau tidak ingin list asli ikut berubah, salin dulu
asli = [1, 2, 3]
salinan = asli.copy()            # atau asli[:]
salinan.append(4)
print("\nasli    :", asli)
print("salinan :", salinan)`
  },

  output: `PASS BY VALUE
  sebelum : a=1 b=2
  di dalam fungsi : a=2 b=1 (salinannya memang tertukar)
  sesudah : a=1 b=2  <- tidak berubah

LEWAT POINTER
  sebelum : a=1 b=2
  sesudah : a=2 b=1  <- tertukar

maks=50 min=10  <- dua hasil dari satu fungsi

sebelum dinolkan : 30 10 50 20 40
sesudah dinolkan : 0 0 0 0 0`,

  kesalahanUmum: [
    {
      salah: 'Mengira `void tukar(int a, int b)` bisa menukar nilai aslinya.',
      kenapa: 'Fungsi hanya menerima salinan, jadi yang tertukar cuma salinan itu dan hilang saat fungsi selesai. Program tidak error sama sekali — hasilnya saja yang tidak berubah, sehingga terasa seperti fungsinya rusak.',
      benar: 'Gunakan pointer di C: `void tukar(int *a, int *b)` dipanggil dengan `tukar(&x, &y)`. Di C++ lebih ringkas dengan reference: `void tukar(int &a, int &b)` dipanggil `tukar(x, y)`.'
    },
    {
      salah: 'Sudah memakai pointer tapi lupa bintang saat mengubah: `void ubah(int *x) { x = 99; }`',
      kenapa: 'Tanpa `*`, yang diubah adalah **salinan alamatnya** — pointer lokal itu berpindah menunjuk ke alamat 99, dan variabel asli tidak tersentuh. Kompiler biasanya hanya memberi peringatan ketidakcocokan tipe, sehingga mudah terlewat.',
      benar: 'Tulis `*x = 99;`. Hafalkan pemetaannya: **tanpa `*` mengurus alamatnya, dengan `*` mengurus isinya.**'
    },
    {
      salah: 'Lupa `&` saat memanggil fungsi berparameter pointer: `tukar(a, b);`',
      kenapa: 'Yang terkirim adalah nilai `a`, lalu diperlakukan sebagai alamat oleh fungsi. Program menulis ke lokasi acak sehingga terjadi *segmentation fault*, atau memori lain rusak diam-diam.',
      benar: 'Tulis `tukar(&a, &b);`. Ingat kaitannya: kalau parameternya `int *`, maka argumennya harus berupa alamat.'
    },
    {
      salah: 'Mengira array juga dikirim sebagai salinan seperti variabel biasa.',
      kenapa: 'Nama array meluruh menjadi alamat, sehingga fungsi menerima akses ke array asli. Akibatnya fungsi bisa mengubah isi array pemanggil **tanpa sengaja**, dan penyebabnya sulit dilacak karena tidak ada tanda `&` sama sekali di pemanggilan.',
      benar: 'Sadari bahwa array memang selalu terasa seperti pass by reference. Kalau tidak ingin diubah, lindungi dengan `const`: `void cetak(const int a[], int n)`.'
    },
    {
      salah: 'Di Python, mengira semua parameter tidak bisa mengubah data pemanggil.',
      kenapa: 'Yang menentukan adalah sifat objeknya. Objek **mutable** seperti `list` dan `dict` bisa diubah isinya dari dalam fungsi, sehingga perubahannya terlihat di pemanggil — sering kali tanpa disadari.',
      benar: 'Perhatikan bentuk barisnya: `d.append(x)` mengubah objek aslinya, sedangkan `d = [...]` hanya mengikat ulang nama lokal. Kalau ingin aman, kirim salinannya dengan `data.copy()`.'
    }
  ],

  analogi: `
Ini topik yang paling terbantu oleh analogi, jadi pilih satu dan pakai konsisten.

**Pass by value = fotokopi.** Kamu memberi orang lain **fotokopi** dokumenmu. Ia boleh mencoret-coret sepuasnya — dokumen aslimu tetap bersih. Setelah selesai, fotokopinya dibuang.

**Pass by reference = memberi dokumen aslinya.** Apa pun yang ia tulis, dokumenmu benar-benar berubah.

**Pointer di C = memberi alamat brankas.** Kamu tidak memberikan dokumennya, tapi memberi **secarik kertas berisi alamat** tempat dokumen itu disimpan. Ia bisa datang ke sana dan mengubah isinya. Tekankan bagian pentingnya: **kertas alamatnya tetap difotokopi** — yang penting, alamat di fotokopi itu menunjuk ke brankas yang sama. Ini menjelaskan kenapa C tetap disebut pass by value.

**Reference di C++ = nama panggilan.** Orang yang sama bisa dipanggil "Budi" atau "Bud" — dua nama, satu orang. Tidak ada salinan, tidak ada alamat yang harus dibuka.

Peragaan yang paling meyakinkan di kelas: cetak **alamat** variabel di dalam fungsi dan di \`main\`, lalu tunjukkan di layar. Pada pass by value alamatnya **berbeda**; pada pointer dan reference alamatnya **sama**. Melihat angka alamat yang berbeda dengan mata sendiri jauh lebih meyakinkan daripada penjelasan lisan apa pun.

Untuk Python, cukup satu kalimat kunci: **"Yang menentukan bukan cara mengirim, tapi apakah objeknya bisa diubah."** Lalu peragakan \`int\` versus \`list\` berdampingan.
`,

  latihan: [
    'Buat dua fungsi penukar: satu memakai pass by value, satu memakai pointer. Panggil keduanya lalu tampilkan hasilnya berdampingan agar perbedaannya terlihat jelas.',
    'Buat fungsi `void hitung(int arr[], int n, int *total, float *rata)` yang mengisi total dan rata-rata melalui pointer. Jelaskan kenapa cara ini bisa mengembalikan dua nilai padahal `return` cuma bisa satu.',
    'Di dalam fungsi dan di `main`, cetak alamat variabel yang sama memakai `%p` — sekali dengan pass by value, sekali dengan pointer. Catat perbedaan alamatnya. Ini akan sangat berguna sebagai bahan peragaan saat kamu mengajar.',
    'Kerjakan di C++: buat tiga versi fungsi penukar (value, pointer, reference), lalu bandingkan cara pemanggilannya dari sisi pengguna. Menurutmu mana yang paling jelas maksudnya bagi pembaca kode?',
    'Di Python, buat fungsi yang menerima list lalu menambahkan satu elemen. Buat juga versi yang menugaskan ulang list tersebut. Jelaskan kenapa hasil keduanya berbeda.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri untuk orang yang berkata *"fungsi tukar saya sudah benar tapi nilainya tidak berubah"*. Gambarkan kotak memorinya dan tunjukkan persis di mana salinannya dibuat.'
  ]
});

TOPICS.push({
  id: 'rekursi',
  judul: 'Rekursi (base case & recursive case)',
  kategori: 'algoritma',
  tag: ['rekursi', 'recursive', 'base case', 'faktorial', 'fibonacci', 'call stack'],
  ringkas: 'Fungsi yang memanggil dirinya sendiri — beserta cara melacak jalannya langkah demi langkah.',

  fungsi: `**Menyelesaikan masalah yang bentuknya mengandung dirinya sendiri — dengan kode yang jauh lebih pendek.**

Rekursi bukan sekadar alternatif perulangan. Untuk struktur bercabang, ia hampir **satu-satunya cara yang wajar**.

Terpakai di:

- **Tree traversal** — menelusuri pohon direktori, DOM, atau BST. Menulisnya dengan perulangan menuntut stack manual
- **Divide and conquer** — Merge Sort dan Quick Sort di Materi Pelengkap
- **Backtracking** — N-Queens, Sudoku, pencarian jalur
- **Mengurai struktur bersarang** — JSON, XML, ekspresi matematika
- **Dynamic Programming** — memoization dimulai dari fungsi rekursif

Bahayanya nyata dan spesifik: **tanpa base case yang benar, programmu mati karena stack habis.** Dan setiap panggilan rekursif memakan memori stack, jadi kedalaman puluhan ribu bisa membuatnya jatuh meski logikanya benar.`,

  praktik: {
    tujuan: `Kamu bisa menulis fungsi rekursif yang pasti berhenti, tahu batas kedalamannya, dan bisa memutuskan kapan rekursi lebih baik daripada perulangan.`,
    alat: [
      'Python 3',
      'C++ untuk membandingkan batas stack'
    ],
    langkah: [
      { judul: 'Tulis base case SEBELUM recursive case',
        isi: `Selalu urutan ini, tanpa kecuali:

- **base case** — kapan berhenti, dan apa jawabannya
- **recursive case** — bagaimana mengecilkan masalahnya

Menulis base case lebih dulu membuatmu mustahil lupa. Rekursi tanpa base case bukan bug kecil — ia **selalu** membuat program mati.` },
      { judul: 'Pastikan masalahnya benar-benar MENGECIL',
        isi: `Setiap panggilan rekursif harus bergerak **menuju** base case.

Untuk \`faktorial(n)\` yang memanggil \`faktorial(n-1)\`, jelas mengecil. Tetapi \`f(n)\` yang memanggil \`f(n)\` atau \`f(n+1)\` tidak akan pernah sampai.

Tanyakan pada diri sendiri: **apa yang berkurang di tiap panggilan?** Kalau kamu tidak bisa menjawabnya, rekursinya salah.` },
      { judul: 'Lacak jalannya dengan mencetak kedalaman',
        isi: `Tambahkan parameter \`tingkat=0\` dan cetak spasi sebanyak tingkatnya sebelum tiap pesan.

Hasilnya adalah pohon panggilan yang terlihat, dan itu **penjelasan rekursi yang paling efektif** — jauh lebih jelas daripada penjelasan lisan mana pun.

Hapus lagi setelah paham; ini alat belajar, bukan bagian dari kode akhir.` },
      { judul: 'Cari batas kedalamannya',
        isi: `Di Python, jalankan fungsi rekursif yang menghitung mundur dari 5000. Kamu akan mendapat \`RecursionError\`.

Batas bawaannya sekitar 1000. Bisa dinaikkan dengan \`sys.setrecursionlimit(n)\`, tetapi itu **menunda masalah**, bukan menyelesaikannya — stack sistem operasi tetap punya batas.

Kalau kedalamanmu bisa mencapai puluhan ribu, pakai perulangan.` },
      { judul: 'Bandingkan dengan versi perulangan',
        isi: `Tulis faktorial dan Fibonacci dalam dua versi, lalu ukur waktunya.

Untuk Fibonacci, rekursi naif akan **jauh** lebih lambat karena menghitung nilai yang sama berkali-kali. Cetak berapa kali fungsi dipanggil untuk melihatnya sendiri.

Ini yang akan diselesaikan **memoization** di topik Dynamic Programming.` },
      { judul: 'Pilih rekursi hanya kalau ia menyederhanakan',
        isi: `Kaidah praktisnya:

- **struktur bercabang** seperti pohon dan graf → rekursi hampir selalu lebih jelas
- **pengulangan lurus** seperti menjumlah array → perulangan lebih jelas dan lebih aman

Rekursi yang membuat kode lebih sulit dibaca tidak memberi manfaat apa pun.` }
    ],
    cek: [
      'Fungsi rekursifmu punya base case yang tertulis paling atas',
      'Kamu bisa menyebutkan apa yang mengecil di setiap panggilan',
      'Kamu sudah melihat sendiri RecursionError, dan tahu berapa batas bawaan Python'
    ]
  },

  konsep: `
**Rekursi** adalah teknik di mana sebuah fungsi **memanggil dirinya sendiri** untuk menyelesaikan versi yang lebih kecil dari persoalan yang sama.

Idenya berangkat dari satu pengamatan: banyak masalah punya **struktur berulang di dalam dirinya**. Faktorial \`5!\` sebenarnya adalah \`5 × 4!\`, dan \`4!\` adalah \`4 × 3!\`, begitu seterusnya. Alih-alih menjelaskan seluruh langkahnya, kita cukup menjelaskan **hubungan satu tingkat** lalu membiarkan pola itu mengulang sendiri.

Setiap fungsi rekursif **wajib** punya dua bagian, dan melupakan salah satunya pasti menghasilkan bug:

- **Base case** — kondisi **berhenti**, yaitu kasus paling sederhana yang jawabannya sudah diketahui langsung tanpa perlu memanggil lagi. Pada faktorial, \`0! = 1\`.
- **Recursive case** — bagian yang **memanggil dirinya sendiri** dengan masukan yang **lebih kecil**, sehingga makin lama makin mendekati base case.

Dua syarat itu harus dipenuhi bersamaan. Base case tanpa penyusutan tidak akan pernah tercapai, dan penyusutan tanpa base case tidak akan pernah berhenti. Keduanya berujung sama: **stack overflow**.

Yang perlu dipahami di balik layar: **setiap pemanggilan fungsi menempati ruang di call stack** — berisi parameter, variabel lokal, dan catatan ke mana harus kembali. Pemanggilan rekursif menumpuk terus dan **baru dibongkar saat base case tercapai**. Karena itu rekursi selalu memakan memori sebesar kedalamannya, sesuatu yang tidak terjadi pada perulangan biasa.

Kapan sebaiknya memakai rekursi? Saat masalahnya **memang berbentuk bersarang** — menelusuri tree, membongkar folder di dalam folder, atau algoritma bagi-dan-taklukkan seperti merge sort. Untuk perhitungan lurus seperti menjumlahkan 1 sampai n, perulangan biasa lebih hemat dan lebih mudah dibaca.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int faktorial(int n) {\n    if (n <= 1) return 1;          // BASE CASE: berhenti di sini\n    return n * faktorial(n - 1);   // RECURSIVE CASE: menyusut\n}',
      penjelasan: `
Dua baris ini adalah kerangka baku semua fungsi rekursif, dan urutannya tidak boleh dibalik.

**Base case ditulis lebih dulu.** Ia adalah rem. Ketika \`n\` sudah mencapai 1, fungsi menjawab langsung tanpa memanggil lagi — dan di titik itulah tumpukan pemanggilan mulai dibongkar.

**Recursive case memanggil dengan \`n - 1\`.** Bagian \`- 1\` inilah yang menjamin masukannya **selalu mengecil**. Kalau keliru ditulis \`faktorial(n)\` tanpa pengurangan, nilainya tidak pernah berubah dan pemanggilannya berlangsung selamanya.

Kenapa base case-nya \`n <= 1\` dan bukan \`n == 1\`? Karena tanda \`<=\` sekaligus menangani \`n = 0\` (yang memang bernilai 1) **dan** melindungi dari masukan negatif. Kalau ditulis \`n == 1\`, memanggil \`faktorial(0)\` akan melewatinya dan terus turun ke \`-1\`, \`-2\`, sampai program jatuh.

Kebiasaan yang layak kamu tanamkan ke mahasiswa: **tulis base case-nya lebih dulu, baru recursive case.** Urutan menulis ini membuat rem-nya tidak pernah lupa dipasang.
`
    },
    {
      bahasa: 'c',
      kode: 'faktorial(4)\n = 4 * faktorial(3)\n = 4 * (3 * faktorial(2))\n = 4 * (3 * (2 * faktorial(1)))\n = 4 * (3 * (2 * 1))        <- base case tercapai\n = 24',
      penjelasan: `
Inilah **trace** — melacak jalannya rekursi langkah demi langkah. Kemampuan membaca trace jauh lebih penting daripada menghafal kodenya, dan ini yang akan sering kamu ajarkan.

Perhatikan bahwa prosesnya berlangsung **dua arah**:

- **Turun** — pemanggilan menumpuk makin dalam: \`4 → 3 → 2 → 1\`. Selama fase ini **belum ada satu pun perkalian yang dihitung**, karena tiap fungsi masih menunggu jawaban dari yang dipanggilnya.
- **Naik** — setelah base case menjawab \`1\`, hasilnya dikembalikan ke atas satu per satu dan barulah perkaliannya dikerjakan: \`2×1=2\`, lalu \`3×2=6\`, lalu \`4×6=24\`.

Bagian "belum dihitung apa-apa saat turun" inilah yang paling sering disalahpahami. Banyak mahasiswa mengira perkaliannya terjadi saat memanggil, padahal justru terjadi **saat kembali**.

Cara membuktikannya di kelas sangat efektif: sisipkan \`printf\` **sebelum** dan **sesudah** baris rekursifnya. Keluaran "masuk" akan tercetak berurutan menurun, lalu keluaran "keluar" tercetak menaik — bentuknya simetris seperti cermin.
`
    },
    {
      bahasa: 'c',
      kode: 'int salah(int n) {\n    return n * salah(n - 1);   // tidak ada base case!\n}\n// n: 3 -> 2 -> 1 -> 0 -> -1 -> -2 -> ... tidak pernah berhenti',
      penjelasan: `
Tanpa base case, rekursi tidak punya alasan untuk berhenti. Nilai \`n\` terus mengecil menembus nol dan berlanjut ke bilangan negatif tanpa batas.

Setiap pemanggilan menyisakan jejak di **call stack**: parameter, variabel lokal, dan alamat untuk kembali. Karena tidak ada yang selesai, tumpukan itu terus membesar sampai jatah memorinya habis — dan program berhenti paksa dengan **stack overflow**.

Gejalanya berbeda-beda menurut bahasa, dan berguna kamu kenali:

- **C dan C++** — program mati mendadak, biasanya dengan pesan *segmentation fault*
- **Python** — melempar \`RecursionError\` setelah kedalamannya menyentuh sekitar 1000

Ada bentuk lain yang lebih licik: base case-nya **ada tapi tidak pernah tercapai**. Contohnya \`faktorial(n)\` yang memanggil \`faktorial(n)\` tanpa pengurangan, atau base case \`n == 1\` yang dipanggil dengan \`n = 0\`. Kodenya terlihat benar sekilas, sehingga lebih sulit ketahuan.

Karena itu ada dua hal yang wajib diperiksa: **base case-nya ada**, dan **masukannya benar-benar menuju ke sana**.
`
    },
    {
      bahasa: 'c',
      kode: 'int fib(int n) {\n    if (n <= 1) return n;                 // base case ganda: 0 dan 1\n    return fib(n - 1) + fib(n - 2);       // memanggil DUA kali\n}',
      penjelasan: `
Fibonacci punya **dua base case** karena tiap suku bergantung pada **dua** suku sebelumnya. Tanpa keduanya, \`fib(1)\` akan turun ke \`fib(-1)\` dan program jatuh.

Yang jauh lebih penting: **versi rekursif ini sangat boros.** Karena setiap pemanggilan bercabang menjadi dua, jumlah pemanggilannya tumbuh **berlipat ganda** — kompleksitasnya sekitar **O(2ⁿ)**.

Penyebabnya adalah pekerjaan yang berulang percuma. Coba runut \`fib(5)\`:

- \`fib(5)\` memanggil \`fib(4)\` dan \`fib(3)\`
- \`fib(4)\` memanggil \`fib(3)\` **lagi** dan \`fib(2)\`
- \`fib(3)\` dihitung ulang dari nol, padahal jawabannya sudah pernah didapat

Untuk \`fib(40)\`, komputer melakukan lebih dari satu miliar pemanggilan dan butuh beberapa detik. Padahal versi perulangan menyelesaikannya seketika dengan **O(n)**.

Inilah pelajaran pentingnya: **rekursi itu elegan, tapi tidak selalu efisien.** Solusinya adalah **memoization** — menyimpan hasil yang sudah pernah dihitung agar tidak diulang. Dengan itu, biayanya turun drastis menjadi O(n).
`
    },
    {
      bahasa: 'python',
      kode: 'import sys\nprint(sys.getrecursionlimit())   # sekitar 1000\n\n# Python TIDAK mengoptimalkan tail recursion,\n# jadi rekursi dalam tetap menumpuk di stack',
      penjelasan: `
Python memasang **batas kedalaman rekursi** di sekitar 1000, dan melampauinya menghasilkan \`RecursionError\`. Batas ini sengaja dibuat sebagai pengaman supaya rekursi tanpa henti tidak menghabiskan memori sistem.

Yang perlu kamu tahu sebagai asprak: **Python tidak melakukan *tail call optimization*.** Pada sebagian bahasa, rekursi yang panggilan dirinya berada tepat di posisi terakhir bisa diubah otomatis menjadi perulangan sehingga tidak menumpuk di stack. Python **sengaja tidak melakukannya**, dengan alasan agar jejak error tetap utuh dan mudah dilacak.

Akibat praktisnya: di Python, rekursi hanya cocok untuk masalah yang kedalamannya wajar — menelusuri tree atau struktur bersarang. Untuk mengulang ribuan kali, **gunakan perulangan biasa**.

Batas itu bisa dinaikkan dengan \`sys.setrecursionlimit(5000)\`, tapi sebaiknya dihindari: menaikkannya terlalu tinggi membuat Python menabrak batas memori sistem yang sesungguhnya, dan program mati tanpa pesan yang jelas.

Kabar baiknya, Python menyediakan memoization siap pakai lewat \`@lru_cache\` — cukup satu baris di atas fungsinya.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    // 1. Faktorial
    static long Faktorial(int n) {
        if (n <= 1) return 1;                       // BASE CASE
        return n * Faktorial(n - 1);                // RECURSIVE CASE
    }

    // 2. Versi bertrace: memperlihatkan fase turun dan naik
    static long FaktorialTrace(int n, int level) {
        string spasi = new string(' ', level * 2);
        Console.WriteLine($"{spasi}masuk Faktorial({n})");

        if (n <= 1) {
            Console.WriteLine($"{spasi}base case -> 1");
            return 1;
        }
        long hasil = n * FaktorialTrace(n - 1, level + 1);
        Console.WriteLine($"{spasi}keluar Faktorial({n}) -> {hasil}");
        return hasil;
    }

    // 3. Fibonacci polos: sekitar O(2^n)
    static long Fib(int n) {
        if (n <= 1) return n;
        return Fib(n - 1) + Fib(n - 2);
    }

    // 4. Fibonacci + memoization: O(n)
    static Dictionary<int, long> memo = new Dictionary<int, long>();
    static long FibMemo(int n) {
        if (n <= 1) return n;
        if (memo.ContainsKey(n)) return memo[n];    // sudah pernah? pakai lagi
        memo[n] = FibMemo(n - 1) + FibMemo(n - 2);
        return memo[n];
    }

    static void Main() {
        Console.WriteLine($"Faktorial(10) : {Faktorial(10)}");
        Console.WriteLine($"Fib(20)       : {Fib(20)}");

        Console.WriteLine("\n--- TRACE Faktorial(4) ---");
        FaktorialTrace(4, 0);

        Console.WriteLine("\nfib memo (0-15) :");
        for (int i = 0; i <= 15; i++) Console.Write(FibMemo(i) + " ");

        Console.WriteLine($"\n\nFibMemo(80) : {FibMemo(80)}");
        Console.WriteLine("(versi polos butuh waktu bertahun-tahun)");

        // Rekursi tanpa henti -> StackOverflowException.
        // Di C#, exception ini TIDAK BISA ditangkap dengan try-catch;
        // programnya langsung dihentikan.
        Console.WriteLine("\nRekursi tanpa base case -> StackOverflowException");
        Console.WriteLine("(tidak bisa ditangkap try-catch, program langsung mati)");
    }
}`,

    java: String.raw`import java.util.HashMap;
import java.util.Map;

public class Contoh {
    // 1. Faktorial
    static long faktorial(int n) {
        if (n <= 1) return 1;                       // BASE CASE
        return n * faktorial(n - 1);                // RECURSIVE CASE
    }

    // 2. Versi bertrace
    static long faktorialTrace(int n, int level) {
        String spasi = "  ".repeat(level);
        System.out.println(spasi + "masuk faktorial(" + n + ")");

        if (n <= 1) {
            System.out.println(spasi + "base case -> 1");
            return 1;
        }
        long hasil = n * faktorialTrace(n - 1, level + 1);
        System.out.println(spasi + "keluar faktorial(" + n + ") -> " + hasil);
        return hasil;
    }

    // 3. Fibonacci polos: sekitar O(2^n)
    static long fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    // 4. Fibonacci + memoization: O(n)
    static Map<Integer, Long> memo = new HashMap<>();
    static long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long hasil = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, hasil);
        return hasil;
    }

    public static void main(String[] args) {
        System.out.println("faktorial(10) : " + faktorial(10));
        System.out.println("fib(20)       : " + fib(20));

        System.out.println("\n--- TRACE faktorial(4) ---");
        faktorialTrace(4, 0);

        System.out.print("\nfib memo (0-15) : ");
        for (int i = 0; i <= 15; i++) System.out.print(fibMemo(i) + " ");

        System.out.println("\n\nfibMemo(80) : " + fibMemo(80));
        System.out.println("(versi polos butuh waktu bertahun-tahun)");

        // Rekursi tanpa henti -> StackOverflowError.
        // Berbeda dari C#, di Java ini BISA ditangkap (walau tidak dianjurkan).
        System.out.println("\nrekursi tanpa base case:");
        try {
            tanpaHenti(1);
        } catch (StackOverflowError e) {
            System.out.println("  StackOverflowError tertangkap");
            System.out.println("  (di C, ini berupa segmentation fault)");
        }
    }

    static int tanpaHenti(int n) { return tanpaHenti(n + 1); }
}`,

    js: String.raw`// 1. Faktorial
function faktorial(n) {
    if (n <= 1) return 1;                 // BASE CASE
    return n * faktorial(n - 1);          // RECURSIVE CASE
}

// 2. Versi bertrace: memperlihatkan fase turun dan naik
function faktorialTrace(n, level = 0) {
    const spasi = "  ".repeat(level);
    console.log(spasi + "masuk faktorial(" + n + ")");

    if (n <= 1) {
        console.log(spasi + "base case -> 1");
        return 1;
    }
    const hasil = n * faktorialTrace(n - 1, level + 1);
    console.log(spasi + "keluar faktorial(" + n + ") -> " + hasil);
    return hasil;
}

// 3. Fibonacci polos: sekitar O(2^n)
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// 4. Fibonacci + memoization memakai Map
const memo = new Map();
function fibMemo(n) {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n);   // sudah pernah? pakai lagi
    const hasil = fibMemo(n - 1) + fibMemo(n - 2);
    memo.set(n, hasil);
    return hasil;
}

console.log("faktorial(10) :", faktorial(10));
console.log("fib(20)       :", fib(20));

console.log("\n--- TRACE faktorial(4) ---");
faktorialTrace(4);

console.log("\nfib memo (0-15) :");
const hasil = [];
for (let i = 0; i <= 15; i++) hasil.push(fibMemo(i));
console.log("  " + hasil.join(" "));

// Angka besar melewati batas aman JavaScript (2^53)
console.log("\nfibMemo(80) :", fibMemo(80));
console.log("angka aman  :", Number.MAX_SAFE_INTEGER);
console.log("-> untuk n besar, hasilnya sudah tidak tepat. Pakai BigInt.");

// Membalik string secara rekursif
function balik(s) {
    if (s.length <= 1) return s;
    return balik(s.slice(1)) + s[0];
}
console.log("\nbalik('asprak') :", balik("asprak"));

// Rekursi tanpa henti -> RangeError
function tanpaHenti(n) { return tanpaHenti(n + 1); }
try {
    tanpaHenti(1);
} catch (e) {
    console.log("\nrekursi tanpa base case:");
    console.log("  " + e.constructor.name + ": " + e.message);
    console.log("  (di C berupa segmentation fault,");
    console.log("   di Python berupa RecursionError)");
}

// Batas kedalaman JavaScript jauh lebih longgar dari Python
let dalam = 0;
function ukur() { dalam++; ukur(); }
try { ukur(); } catch (e) { }
console.log("\nkedalaman maksimum di sini : sekitar " + dalam);
console.log("(Python dibatasi sekitar 1000)");`,

    c: String.raw`#include <stdio.h>

/* 1. Faktorial: satu base case */
int faktorial(int n) {
    if (n <= 1) return 1;                 // <= melindungi dari 0 dan negatif
    return n * faktorial(n - 1);
}

/* 2. Versi bertrace: memperlihatkan fase turun dan naik */
int faktorialTrace(int n, int level) {
    for (int i = 0; i < level; i++) printf("  ");
    printf("masuk faktorial(%d)\n", n);

    if (n <= 1) {
        for (int i = 0; i < level; i++) printf("  ");
        printf("base case -> 1\n");
        return 1;
    }

    int hasil = n * faktorialTrace(n - 1, level + 1);

    for (int i = 0; i < level; i++) printf("  ");
    printf("keluar faktorial(%d) -> %d\n", n, hasil);
    return hasil;
}

/* 3. Fibonacci rekursif: elegan tapi boros, sekitar O(2^n) */
int fib(int n) {
    if (n <= 1) return n;                 // dua base case sekaligus
    return fib(n - 1) + fib(n - 2);
}

/* 4. Fibonacci perulangan: O(n), jauh lebih cepat */
int fibLoop(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/* 5. Menjumlahkan 1..n */
int jumlah(int n) {
    if (n == 0) return 0;
    return n + jumlah(n - 1);
}

/* 6. Pangkat */
int pangkat(int a, int b) {
    if (b == 0) return 1;                 // apa pun pangkat 0 = 1
    return a * pangkat(a, b - 1);
}

/* 7. Membalik string secara rekursif */
void balik(char s[], int awal, int akhir) {
    if (awal >= akhir) return;            // base case: sudah bertemu di tengah
    char simpan = s[awal];
    s[awal] = s[akhir];
    s[akhir] = simpan;
    balik(s, awal + 1, akhir - 1);        // menyempit dari dua sisi
}

int main(void) {
    printf("faktorial(5) : %d\n", faktorial(5));
    printf("fib(10)      : %d\n", fib(10));
    printf("jumlah(10)   : %d\n", jumlah(10));
    printf("pangkat(2,8) : %d\n", pangkat(2, 8));

    printf("\n--- TRACE faktorial(4) ---\n");
    faktorialTrace(4, 0);

    char kata[] = "asprak";
    balik(kata, 0, 5);
    printf("\ndibalik : %s\n", kata);

    printf("\nfib rekursif vs perulangan (harus sama):\n");
    for (int i = 0; i <= 10; i++) printf("%d ", fib(i));
    printf("\n");
    for (int i = 0; i <= 10; i++) printf("%d ", fibLoop(i));
    printf("\n");

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <map>
using namespace std;

int faktorial(int n) {
    if (n <= 1) return 1;
    return n * faktorial(n - 1);
}

/* Fibonacci polos: sekitar O(2^n) */
long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

/* Fibonacci + memoization: hasil disimpan supaya tidak dihitung ulang -> O(n) */
map<int, long long> memo;

long long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];          // sudah pernah? pakai lagi
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);  // belum? hitung lalu simpan
    return memo[n];
}

/* Penerapan nyata: binary search versi rekursif */
int cariBiner(int arr[], int kiri, int kanan, int target) {
    if (kiri > kanan) return -1;                // base case: tidak ditemukan
    int tengah = kiri + (kanan - kiri) / 2;     // aman dari overflow

    if (arr[tengah] == target) return tengah;   // base case: ketemu
    if (arr[tengah] > target)
        return cariBiner(arr, kiri, tengah - 1, target);   // cari di kiri
    return cariBiner(arr, tengah + 1, kanan, target);      // cari di kanan
}

int main() {
    cout << "faktorial(10) : " << faktorial(10) << endl;

    cout << "\nfib polos (0-15) : ";
    for (int i = 0; i <= 15; i++) cout << fib(i) << " ";

    cout << "\nfib memo  (0-15) : ";
    for (int i = 0; i <= 15; i++) cout << fibMemo(i) << " ";

    // Versi memo sanggup menghitung yang polosnya butuh waktu sangat lama
    cout << "\n\nfibMemo(80) : " << fibMemo(80) << endl;
    cout << "(fib(80) polos butuh waktu bertahun-tahun)" << endl;

    int data[] = {10, 20, 30, 40, 50, 60, 70};
    cout << "\nposisi 50 : " << cariBiner(data, 0, 6, 50) << endl;
    cout << "posisi 99 : " << cariBiner(data, 0, 6, 99) << endl;

    return 0;
}`,

    python: String.raw`import sys
from functools import lru_cache

print("batas rekursi Python :", sys.getrecursionlimit())


def faktorial(n):
    if n <= 1:                      # BASE CASE
        return 1
    return n * faktorial(n - 1)     # RECURSIVE CASE


def faktorial_trace(n, level=0):
    """Memperlihatkan fase turun dan naik secara visual."""
    spasi = "  " * level
    print(f"{spasi}masuk faktorial({n})")

    if n <= 1:
        print(f"{spasi}base case -> 1")
        return 1

    hasil = n * faktorial_trace(n - 1, level + 1)
    print(f"{spasi}keluar faktorial({n}) -> {hasil}")
    return hasil


def fib(n):
    """Polos: sekitar O(2^n), sangat lambat untuk n besar."""
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


@lru_cache(maxsize=None)            # memoization cukup satu baris
def fib_memo(n):
    """Dengan cache: O(n)."""
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)


def jumlah(n):
    return 0 if n == 0 else n + jumlah(n - 1)


def balik(s):
    """Membalik string secara rekursif."""
    if len(s) <= 1:                 # base case: 0 atau 1 huruf
        return s
    return balik(s[1:]) + s[0]      # sisanya dibalik, huruf pertama ke belakang


print("\nfaktorial(5) :", faktorial(5))
print("jumlah(10)   :", jumlah(10))
print("balik        :", balik("asprak"))

print("\n--- TRACE faktorial(4) ---")
faktorial_trace(4)

print("\nfib polos (0-15):", [fib(i) for i in range(16)])
print("fib memo  (0-15):", [fib_memo(i) for i in range(16)])

# Versi memo sanggup menangani angka yang mustahil bagi versi polos
print("\nfib_memo(100) :", fib_memo(100))

# Rekursi tanpa henti dijaga oleh batas Python
def tanpa_henti(n):
    return tanpa_henti(n + 1)       # tidak ada base case

try:
    tanpa_henti(1)
except RecursionError:
    print("\nRecursionError: batas kedalaman tercapai")
    print("(di C, ini akan berupa segmentation fault)")`
  },

  output: `faktorial(5) : 120
fib(10)      : 55
jumlah(10)   : 55
pangkat(2,8) : 256

--- TRACE faktorial(4) ---
masuk faktorial(4)
  masuk faktorial(3)
    masuk faktorial(2)
      masuk faktorial(1)
      base case -> 1
    keluar faktorial(2) -> 2
  keluar faktorial(3) -> 6
keluar faktorial(4) -> 24

dibalik : karpsa`,

  kompleksitas: {
    tabel: [
      { operasi: 'faktorial(n) rekursif', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'jumlah(n) rekursif', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'fibonacci polos', waktu: 'O(2ⁿ)', memori: 'O(n)' },
      { operasi: 'fibonacci + memoization', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'fibonacci perulangan', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'binary search rekursif', waktu: 'O(log n)', memori: 'O(log n)' }
    ],
    intuisi: `
**Kenapa rekursi selalu memakan memori O(kedalaman)?** Karena setiap pemanggilan yang belum selesai **tetap tersimpan di call stack** — lengkap dengan parameter, variabel lokal, dan alamat kembalinya. Pada \`faktorial(1000)\`, ada 1000 tumpukan hidup bersamaan sebelum satu pun selesai. Perulangan biasa hanya memakai satu set variabel, sehingga memorinya O(1). **Inilah perbedaan mendasar rekursi dan perulangan yang paling sering ditanyakan saat ujian.**

**Kenapa fibonacci polos bisa sampai O(2ⁿ)?** Karena tiap pemanggilan **bercabang dua**, sehingga jumlah pemanggilannya berlipat ganda tiap turun satu tingkat: 1, 2, 4, 8, dan seterusnya. Yang membuatnya sia-sia, banyak cabang menghitung **hal yang sama berulang kali** — \`fib(3)\` bisa dihitung belasan kali dalam satu pemanggilan \`fib(10)\`.

**Kenapa memoization menyembuhkannya jadi O(n)?** Karena tiap nilai cukup **dihitung sekali lalu disimpan**. Pemanggilan berikutnya tinggal mengambil jawaban yang sudah ada. Dari sekitar 2ⁿ pemanggilan, tersisa hanya n perhitungan berbeda. Inilah gagasan dasar **dynamic programming**.

**Kenapa binary search rekursif memorinya O(log n)?** Karena tiap langkah **membuang separuh data**, sehingga kedalamannya cuma sekitar log₂n. Untuk sejuta data, kedalamannya hanya sekitar 20 tingkat — sangat aman.
`
  },

  kesalahanUmum: [
    {
      salah: 'Lupa base case: `int f(int n) { return n * f(n - 1); }`',
      kenapa: 'Tidak ada yang menghentikan, sehingga `n` terus mengecil menembus nol ke bilangan negatif. Call stack terus menumpuk sampai memorinya habis. Di C gejalanya *segmentation fault*, di Python `RecursionError`.',
      benar: 'Selalu tulis base case **lebih dulu**: `if (n <= 1) return 1;`. Biasakan menulis rem sebelum menulis bagian rekursifnya.'
    },
    {
      salah: 'Base case ada, tapi masukannya tidak pernah menuju ke sana: `return n * f(n);`',
      kenapa: 'Nilai `n` tidak pernah berubah, sehingga base case `n <= 1` tidak akan pernah terpenuhi. Ini lebih licik daripada lupa base case, karena kodenya terlihat benar sekilas dan tidak menimbulkan peringatan apa pun.',
      benar: 'Pastikan tiap pemanggilan **memperkecil masalah**: `f(n - 1)` atau `f(n / 2)`. Periksa dengan bertanya: *"apakah pemanggilan ini pasti lebih dekat ke base case?"*'
    },
    {
      salah: 'Memakai `n == 1` sebagai base case lalu memanggil `faktorial(0)`',
      kenapa: 'Nilai 0 tidak sama dengan 1, sehingga base case-nya terlewati. Fungsi lanjut memanggil `faktorial(-1)`, lalu `-2`, dan seterusnya tanpa henti. Program bisa berjalan normal saat diuji dengan angka positif, lalu jatuh begitu diberi masukan 0.',
      benar: 'Gunakan `n <= 1` agar 0 dan bilangan negatif ikut tertangkap. Selalu uji fungsi rekursif dengan **nilai batas**: 0, 1, dan bilangan negatif.'
    },
    {
      salah: 'Memakai fibonacci rekursif polos untuk n besar, misal `fib(45)`',
      kenapa: 'Kompleksitasnya sekitar O(2ⁿ), sehingga `fib(45)` memerlukan lebih dari satu triliun pemanggilan. Programnya tidak error — hanya seolah menggantung selama berjam-jam, sehingga mahasiswa mengira komputernya rusak.',
      benar: 'Gunakan memoization (`@lru_cache` di Python, `map` di C++) atau versi perulangan yang O(n). Untuk n besar, pilih perulangan karena memorinya pun cuma O(1).'
    },
    {
      salah: 'Mengira rekursi selalu lebih baik daripada perulangan.',
      kenapa: 'Rekursi menambah biaya pemanggilan fungsi dan memakan memori sebesar kedalamannya. Untuk perhitungan lurus seperti menjumlahkan 1..n, versi perulangan lebih cepat, lebih hemat, dan tidak berisiko stack overflow.',
      benar: 'Pilih rekursi ketika masalahnya **memang berbentuk bersarang** — tree, folder di dalam folder, atau bagi-dan-taklukkan. Untuk pengulangan lurus, perulangan biasa lebih tepat.'
    }
  ],

  analogi: `
Analogi terbaik adalah **antrean orang bertanya**. Barisan orang ingin tahu nomor urutnya masing-masing. Setiap orang menoleh ke depan dan bertanya, *"kamu nomor berapa?"* — lalu menjawab dengan nomor itu ditambah satu. Orang **paling depan** tidak bertanya kepada siapa pun; ia sudah tahu dirinya nomor 1. **Itulah base case.**

Analogi ini sekaligus menjelaskan dua fase rekursi dengan sangat jelas: pertanyaannya **merambat ke depan** (fase turun), lalu jawabannya **kembali merambat ke belakang** (fase naik). Tekankan bahwa **tidak ada yang bisa menjawab sebelum orang terdepan menjawab lebih dulu.**

Untuk **rekursi tanpa base case**, lanjutkan analogi yang sama: kalau barisannya melingkar tanpa ujung, pertanyaannya berputar selamanya dan tidak ada satu pun yang bisa menjawab. Itulah stack overflow.

Untuk **call stack**, pakai **tumpukan piring**. Tiap pemanggilan menaruh satu piring. Piring baru bisa diambil setelah base case tercapai, dan pengambilannya dari atas ke bawah. Analogi ini juga menghubungkan langsung ke materi **Stack** — LIFO-nya persis sama.

Untuk **fibonacci yang boros**, gambarkan **pohon pemanggilan \`fib(5)\`** di papan tulis secara lengkap. Setelah selesai menggambar, minta mahasiswa **melingkari semua \`fib(3)\`** yang muncul. Melihat sendiri betapa banyak yang terhitung ulang jauh lebih meyakinkan daripada sekadar mendengar istilah O(2ⁿ).

Peragaan paling ampuh di kelas: jalankan fungsi bertrace yang menjorok ke dalam seperti pada contoh kode. Bentuk keluarannya yang simetris membuat fase turun dan naik terlihat **secara visual** — dan biasanya di titik inilah mahasiswa yang tadinya bingung tiba-tiba paham.
`,

  latihan: [
    'Buat fungsi rekursif untuk menghitung pangkat: `pangkat(a, b)`. Tentukan base case-nya lebih dulu sebelum menulis bagian rekursifnya.',
    'Buat fungsi rekursif yang menjumlahkan digit sebuah bilangan. Contoh: `1234` menghasilkan `10`. Petunjuk: manfaatkan `% 10` dan `/ 10`.',
    'Tanpa menjalankan programnya, tulis trace lengkap `faktorial(4)` di kertas — tunjukkan fase turun dan fase naiknya. Setelah itu buktikan dengan versi bertrace pada contoh kode.',
    'Jalankan `fib(35)` versi polos dan catat berapa lama waktunya. Lalu jalankan versi memoization untuk `fib(35)` dan bandingkan. Jelaskan penyebab perbedaannya.',
    'Buat fungsi rekursif pemeriksa palindrom: bandingkan huruf terdepan dan terbelakang, lalu periksa sisanya. Apa base case yang tepat untuk kasus ini?',
    'Ubah fungsi `jumlah(n)` rekursif menjadi versi perulangan. Bandingkan keduanya dari sisi kecepatan dan penggunaan memori — mana yang lebih tepat untuk `n = 100000`, dan kenapa?',
    'Uji pemahaman: jelaskan ulang dalam 5 menit dengan kata-katamu sendiri tentang rekursi memakai analogi antrean, lengkap dengan gambar tumpukan piring untuk menjelaskan call stack. Wajib menyebut base case sebagai "rem" minimal sekali.'
  ]
});

TOPICS.push({
  id: 'pointer',
  judul: 'Pointer',
  kategori: 'algoritma',
  tag: ['pointer', 'memori', 'alamat', 'C', 'C++'],
  ringkas: 'Variabel yang isinya alamat variabel lain — kunci memahami scanf, fungsi pengubah nilai, dan linked list.',

  fungsi: `**Bekerja langsung dengan alamat memori — sumber kekuatan C sekaligus sumber bug tersulitnya.**

Pointer tidak bisa dihindari kalau kamu memakai C atau C++, dan memahaminya menjelaskan banyak hal di bahasa lain.

Terpakai di:

- **Struktur data dinamis** — linked list, tree, dan graph seluruhnya dibangun dari pointer
- **Mengubah data pemanggil** — satu-satunya cara di C murni
- **Menghemat salinan** — mengirim alamat, bukan seluruh isinya
- **Alokasi dinamis** — data yang ukurannya baru diketahui saat berjalan
- **Memahami bahasa lain** — acuan di Java dan Python bekerja dengan prinsip yang sama, hanya disembunyikan

Tiga bug klasiknya layak dihafal karena semuanya **tidak selalu langsung terlihat**:

- **Pointer liar** — menunjuk ke tempat yang belum ditentukan
- **Kebocoran memori** — mengalokasikan tanpa pernah membebaskan
- **Dangling pointer** — memakai memori yang sudah dibebaskan`,

  praktik: {
    tujuan: `Kamu bisa memakai pointer dengan aman untuk alokasi dinamis, dan sudah memeriksa sendiri bahwa programmu tidak membocorkan memori.`,
    alat: [
      'C atau C++ dengan gcc',
      'Valgrind kalau tersedia (Linux), atau AddressSanitizer lewat -fsanitize=address'
    ],
    langkah: [
      { judul: 'Bedakan tiga lambang yang mirip',
        isi: `- \`int *p\` pada **deklarasi** — p adalah pointer ke int
- \`&x\` — **alamat** dari x
- \`*p\` pada **pemakaian** — **isi** dari alamat yang ditunjuk p

Tanda bintang punya dua arti berbeda tergantung tempatnya, dan itu sumber kebingungan yang paling sering. Tulis ketiganya di catatanmu.` },
      { judul: 'Selalu beri nilai awal',
        isi: `\`int *p;\` tanpa nilai awal menunjuk ke **tempat sembarang**. Menulis ke sana bisa merusak apa saja.

Biasakan \`int *p = NULL;\` lalu periksa \`if (p != NULL)\` sebelum memakainya.

Pointer NULL yang diakses akan **langsung mati dengan jelas** — dan itu jauh lebih baik daripada diam-diam merusak data lain.` },
      { judul: 'Pasangkan setiap alokasi dengan pembebasan',
        isi: `Setiap \`malloc\` butuh \`free\`. Setiap \`new\` butuh \`delete\`. Setiap \`new[]\` butuh \`delete[]\`.

Tulis keduanya **sekaligus** begitu kamu mengetik alokasinya, lalu isi kode di antaranya. Dengan begitu tidak ada yang terlupa.` },
      { judul: 'Setel ke NULL setelah membebaskan',
        isi: `Setelah \`free(p)\`, pointer p masih menyimpan alamat lama — dan alamat itu sudah tidak sah. Memakainya disebut **dangling pointer**.

Biasakan \`free(p); p = NULL;\` supaya pemakaian berikutnya gagal dengan jelas, bukan diam-diam membaca sampah.` },
      { judul: 'Periksa kebocoran dengan alat',
        isi: `Kompilasi dengan \`gcc -fsanitize=address -g program.c\` lalu jalankan.

Kalau ada memori yang tidak dibebaskan, alat itu akan melaporkannya lengkap dengan baris tempat alokasinya terjadi.

Di Linux, \`valgrind ./program\` memberi laporan serupa. Sekali mencobanya, kamu tidak akan mau menulis C tanpa alat ini lagi.` },
      { judul: 'Bangun satu linked list kecil',
        isi: `Buat struct dengan satu nilai dan satu pointer ke dirinya sendiri, lalu sambungkan tiga simpul.

Telusuri dari awal sampai pointer bernilai NULL, cetak isinya, lalu bebaskan semuanya.

Ini latihan yang menggabungkan struct, pointer, dan alokasi dinamis sekaligus — dan menjadi dasar seluruh Struktur Data.` }
    ],
    cek: [
      'Program dikompilasi dengan -fsanitize=address dan berjalan tanpa laporan kebocoran',
      'Setiap alokasi di kodemu punya pembebasan yang bisa kamu tunjuk',
      'Linked list-mu bisa ditelusuri dan dibebaskan tanpa program mati'
    ]
  },

  konsep: `
Bayangkan memori (RAM) sebagai **deretan loker panjang**. Setiap loker punya **nomor** yang unik dan tidak berubah — nomor inilah yang disebut **alamat memori**.

Variabel biasa seperti \`int x = 10;\` artinya: "sewa satu loker, beri nama x, isi angka 10". Nah, **pointer** adalah loker yang isinya **bukan data biasa, melainkan nomor loker lain**. Jadi pointer tidak menyimpan nilai — ia menyimpan *petunjuk ke mana harus pergi*.

Kenapa konsep ini harus ada? Ada empat alasan besar:

- **Supaya fungsi bisa mengubah variabel di luar dirinya.** Di C, semua argumen dikirim sebagai salinan. Kalau fungsi hanya menerima salinan, perubahannya tidak berpengaruh ke aslinya. Dengan memberi alamat, fungsi tahu loker mana yang harus diubah.
- **Supaya hemat.** Mengirim data besar (misal struct berisi 100 field) ke fungsi berarti menyalin semuanya. Mengirim alamatnya cuma menyalin satu angka.
- **Supaya ukuran data bisa ditentukan saat program berjalan**, lewat \`malloc\` (C) atau \`new\` (C++) — bukan dipatok saat menulis kode.
- **Supaya bisa membangun struktur berantai** seperti linked list, tree, dan graph, di mana tiap simpul menyimpan alamat simpul berikutnya.

Intinya: kalau kamu paham pointer, kamu otomatis paham kenapa \`scanf\` butuh \`&\`, kenapa array bisa "berubah" di dalam fungsi padahal variabel biasa tidak, dan bagaimana linked list bekerja. Tiga hal itu berakar pada satu konsep yang sama.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int x = 10;\nprintf("%p", &x);   // &x -> alamat loker x',
      penjelasan: `
Tanda \`&\` dibaca **"alamat dari"** (*address-of*). \`&x\` bukan nilai x, melainkan **nomor loker** tempat x disimpan — hasilnya angka heksadesimal seperti \`0x7ffd4c2a\`.

Jadi ada dua hal berbeda yang gampang tertukar: \`x\` adalah **isinya** (10), sedangkan \`&x\` adalah **letaknya**.
`
    },
    {
      bahasa: 'c',
      kode: 'int *p;',
      penjelasan: `
Cara baca deklarasi C yang benar adalah **dari dalam ke luar**: baca \`*p\` dulu, lalu tipenya. Artinya "\`*p\` bertipe int" — dan supaya \`*p\` menghasilkan int, maka \`p\` haruslah **alamat menuju sebuah int**.

Karena itu tanda \`*\` sebenarnya menempel ke **nama variabelnya**, bukan ke tipenya. Ini punya akibat yang sering menjebak:

- \`int* a, b;\` → \`a\` pointer, tapi \`b\` **int biasa**! Tanda \`*\` hanya berlaku untuk \`a\`.
- \`int *a, *b;\` → baru keduanya pointer.

Karena itu banyak pengajar C menyarankan menulis \`int *a;\` (bintang menempel ke nama), agar jebakan ini tidak terjadi.
`
    },
    {
      bahasa: 'c',
      kode: 'p = &x;      // p sekarang menyimpan alamat x\nprintf("%d", *p);   // *p -> lihat isi di alamat itu -> 10\n*p = 20;            // ubah isi x lewat p, x jadi 20',
      penjelasan: `
\`*p\` disebut **dereference**, dibaca "isi dari alamat yang disimpan p". Kalau \`&\` artinya "di mana", maka \`*\` artinya "pergi ke sana, lihat apa isinya".

Perhatikan jebakan terbesarnya: **tanda \`*\` punya dua pekerjaan berbeda** tergantung posisinya.

- Saat **deklarasi** (\`int *p;\`) → \`*\` menandai "p ini pointer".
- Saat **dipakai** (\`*p = 20;\`) → \`*\` berarti "buka isi di alamat p".

Jadi \`*p = 20\` **tidak** mengubah p; yang berubah adalah x. Bandingkan dengan \`p = 20\` yang justru mengubah p sendiri menjadi alamat 20 — hampir selalu salah dan berujung crash.
`
    },
    {
      bahasa: 'c',
      kode: 'int umur;\nscanf("%d", &umur);   // kenapa harus pakai & ?',
      penjelasan: `
Inilah alasan sebenarnya, dan ini menjelaskan salah satu error paling sering di praktikum.

Di C, **semua argumen dikirim sebagai salinan** (*pass by value*). Kalau kita menulis \`scanf("%d", umur)\`, yang dikirim adalah **salinan nilai** \`umur\` — dan karena \`umur\` belum diisi, isinya sampah acak. \`scanf\` lalu memperlakukan angka sampah itu sebagai alamat dan mencoba menulis ke sana → program **crash** (*segmentation fault*), atau diam-diam merusak memori lain.

Dengan menulis \`&umur\`, kita memberi \`scanf\` **alamat lokernya**, sehingga \`scanf\` tahu persis ke mana angka hasil ketikan harus ditaruh.

Aturan ringkasnya: **kalau sebuah fungsi harus mengisi variabelmu, ia butuh alamatnya.**
`
    },
    {
      bahasa: 'c',
      kode: 'char nama[50];\nscanf("%s", nama);    // yang ini justru TIDAK pakai &',
      penjelasan: `
Ini pengecualian yang sering ditanyakan mahasiswa, dan jawabannya konsisten dengan aturan tadi.

Nama array di C, saat dipakai dalam ekspresi, otomatis **meluruh** (*decay*) menjadi **alamat elemen pertamanya**. Jadi \`nama\` sudah **berarti** \`&nama[0]\` — ia memang sudah sebuah alamat. Menambahkan \`&\` lagi jadi mubazir.

Catatan jujur untuk kamu sebagai asprak: \`&nama\` sebenarnya juga menghasilkan **angka alamat yang sama**, tapi **tipenya berbeda** (\`char (*)[50]\`, bukan \`char *\`). Karena itu \`scanf("%s", &nama)\` biasanya "kelihatan jalan", padahal secara standar tipenya tidak cocok. Ajarkan yang benar: **tanpa \`&\` untuk array.**
`
    },
    {
      bahasa: 'c',
      kode: 'int arr[3] = {10, 20, 30};\nint *p = arr;\nprintf("%d", *(p + 1));   // 20, bukan isi byte ke-1',
      penjelasan: `
**Aritmetika pointer tidak berhitung dalam byte, melainkan dalam ukuran tipe datanya.**

\`p + 1\` artinya "maju satu **elemen int**", yang di kebanyakan sistem berarti maju 4 byte, bukan 1 byte. Kompiler otomatis mengalikannya dengan \`sizeof(int)\`.

Karena itu \`arr[i]\` sebenarnya hanyalah cara penulisan yang lebih enak dibaca untuk \`*(arr + i)\` — keduanya benar-benar identik bagi kompiler. Inilah jembatan antara array dan pointer.
`
    },
    {
      bahasa: 'c',
      kode: 'int *p = NULL;      // C\nint *q = nullptr;   // C++ (lebih aman)',
      penjelasan: `
\`NULL\` adalah nilai khusus yang artinya **"pointer ini sengaja tidak menunjuk ke mana-mana"**. Gunanya sebagai penanda agar kita bisa mengecek dulu sebelum memakai: \`if (p != NULL) { ... }\`.

Ini penting karena pointer yang **belum diisi apa-apa** berbeda dari NULL — isinya sampah acak, dan mengaksesnya berbahaya. Membiasakan menulis \`= NULL\` saat deklarasi membuat kesalahan jadi mudah dideteksi.

Di C++ modern gunakan \`nullptr\`, bukan \`NULL\`, karena \`NULL\` sebenarnya hanyalah angka \`0\` yang bisa keliru terpilih saat *overloading* fungsi.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

class Program {
    class Kotak { public int Nilai; }

    // C# memakai RUJUKAN, bukan pointer. Isi object bisa diubah...
    static void UbahIsi(Kotak k) { k.Nilai = 99; }
    // ...tapi menugasi ulang tidak berpengaruh ke pemanggil.
    static void GantiObjek(Kotak k) { k = new Kotak { Nilai = 0 }; }

    // Untuk tipe nilai seperti int, C# menyediakan ref —
    // inilah padanan terdekat pointer di C.
    static void TambahSepuluh(ref int n) { n += 10; }

    static void Main() {
        Console.WriteLine("C# TIDAK memakai pointer dalam kode sehari-hari.");
        Console.WriteLine("Yang dipakai adalah rujukan (reference).\n");

        // Tipe NILAI (int, struct) -> disalin isinya
        int a = 10;
        int b = a;
        b = 20;
        Console.WriteLine($"tipe nilai  : a={a} b={b}  <- terpisah");

        // Tipe RUJUKAN (class, array) -> yang disalin rujukannya
        Kotak k1 = new Kotak { Nilai = 10 };
        Kotak k2 = k1;
        k2.Nilai = 20;
        Console.WriteLine($"tipe rujukan: k1={k1.Nilai} k2={k2.Nilai}  <- object SAMA");

        Kotak k = new Kotak { Nilai = 1 };
        UbahIsi(k);
        Console.WriteLine($"\nsetelah UbahIsi    : {k.Nilai}  <- berubah");
        GantiObjek(k);
        Console.WriteLine($"setelah GantiObjek : {k.Nilai}  <- TIDAK berubah");

        int n = 5;
        TambahSepuluh(ref n);
        Console.WriteLine($"\nref (padanan pointer) : {n}");

        // null: padanan NULL di C
        Kotak kosong = null;
        try {
            Console.WriteLine(kosong.Nilai);
        } catch (NullReferenceException) {
            Console.WriteLine("\nmengakses null -> NullReferenceException");
            Console.WriteLine("  (di C, ini berupa segmentation fault)");
        }

        // Operator ?. memeriksa null lebih dulu
        Console.WriteLine($"kosong?.Nilai -> {(kosong?.Nilai.ToString() ?? "null, aman")}");

        Console.WriteLine("\nCATATAN: C# SEBENARNYA punya pointer sungguhan,");
        Console.WriteLine("tapi hanya di dalam blok 'unsafe' dan jarang dipakai:");
        Console.WriteLine("  unsafe { int x = 10; int* p = &x; *p = 20; }");
        Console.WriteLine("Ini menjadikan C# satu-satunya dari Java/Python/JS");
        Console.WriteLine("yang masih menyediakan pointer.");
    }
}`,

    java: String.raw`public class Contoh {
    static class Kotak { int nilai; }

    // Java memakai RUJUKAN. Isi object bisa diubah...
    static void ubahIsi(Kotak k) { k.nilai = 99; }
    // ...tapi menugasi ulang tidak berpengaruh ke pemanggil.
    static void gantiObjek(Kotak k) { k = new Kotak(); }

    public static void main(String[] args) {
        System.out.println("Java TIDAK punya pointer sama sekali.");
        System.out.println("Tidak ada &, tidak ada *, tidak ada aritmetika alamat.\n");

        // Tipe primitif -> disalin isinya
        int a = 10;
        int b = a;
        b = 20;
        System.out.println("tipe primitif : a=" + a + " b=" + b + "  <- terpisah");

        // Object -> yang disalin rujukannya
        Kotak k1 = new Kotak();
        k1.nilai = 10;
        Kotak k2 = k1;
        k2.nilai = 20;
        System.out.println("object        : k1=" + k1.nilai + " k2=" + k2.nilai
                           + "  <- object SAMA");

        Kotak k = new Kotak();
        k.nilai = 1;
        ubahIsi(k);
        System.out.println("\nsetelah ubahIsi    : " + k.nilai + "  <- berubah");
        gantiObjek(k);
        System.out.println("setelah gantiObjek : " + k.nilai + "  <- TIDAK berubah");

        // null: padanan NULL di C, dan sumber error paling terkenal di Java
        Kotak kosong = null;
        try {
            System.out.println(kosong.nilai);
        } catch (NullPointerException e) {
            System.out.println("\nmengakses null -> NullPointerException");
            System.out.println("  (di C, ini berupa segmentation fault)");
            System.out.println("  Namanya menyebut 'Pointer' karena warisan istilah,");
            System.out.println("  padahal Java sendiri tidak punya pointer.");
        }

        // Java tidak bisa menukar dua int lewat method
        System.out.println("\nMENUKAR DUA int LEWAT METHOD:");
        System.out.println("  C     : tukar(&a, &b)      -> bisa");
        System.out.println("  C++   : tukar(int&, int&)  -> bisa");
        System.out.println("  C#    : Tukar(ref a, ref b)-> bisa");
        System.out.println("  Java  : MUSTAHIL — harus lewat return atau array");

        // Satu-satunya siasat: bungkus dalam array atau object
        int[] bungkus = { 1, 2 };
        tukarLewatArray(bungkus);
        System.out.println("\nsiasat lewat array : " + bungkus[0] + " " + bungkus[1]);
    }

    static void tukarLewatArray(int[] x) {
        int simpan = x[0]; x[0] = x[1]; x[1] = simpan;
    }
}`,

    js: String.raw`// JavaScript TIDAK punya pointer. Yang ada hanyalah rujukan ke object.

console.log("JavaScript tidak punya & maupun *.");
console.log("Yang menentukan perilaku adalah TIPE datanya.\n");

// Tipe primitif (number, string, boolean) -> disalin isinya
let a = 10;
let b = a;
b = 20;
console.log("primitif :", "a =", a, ", b =", b, " <- terpisah");

// Object dan array -> yang disalin rujukannya
const o1 = { nilai: 10 };
const o2 = o1;
o2.nilai = 20;
console.log("object   :", "o1 =", o1.nilai, ", o2 =", o2.nilai, " <- object SAMA");

// Membuktikan keduanya benar-benar object yang sama
console.log("o1 === o2 ?", o1 === o2);
console.log("{a:1} === {a:1} ?", { a: 1 } === { a: 1 },
            " <- isinya sama, tapi object BERBEDA");

// Fungsi: isi bisa diubah, tapi menugasi ulang tidak berpengaruh
function ubahIsi(o) { o.nilai = 99; }
function gantiObjek(o) { o = { nilai: 0 }; }

const k = { nilai: 1 };
ubahIsi(k);
console.log("\nsetelah ubahIsi    :", k.nilai, " <- berubah");
gantiObjek(k);
console.log("setelah gantiObjek :", k.nilai, " <- TIDAK berubah");

// null dan undefined: dua bentuk "tidak ada" di JavaScript
let kosong = null;
let belumDiisi;
console.log("\nnull      :", kosong, "-> sengaja dikosongkan");
console.log("undefined :", belumDiisi, "-> belum pernah diisi");

try {
    console.log(kosong.nilai);
} catch (e) {
    console.log("\nmengakses null ->", e.constructor.name);
    console.log("  " + e.message);
}

// ?. memeriksa null/undefined lebih dulu — aman
console.log("kosong?.nilai ->", kosong?.nilai, " <- undefined, tidak error");

// const TIDAK membuat isinya tetap — hanya rujukannya yang dikunci
const arr = [1, 2, 3];
arr.push(4);                 // BOLEH: isinya diubah
console.log("\nconst arr setelah push :", arr);
try {
    eval("arr = [9]");       // DITOLAK: menugasi ulang rujukannya
} catch (e) {
    console.log("arr = [9] ->", e.constructor.name, " <- rujukan terkunci");
}
console.log("-> const mengunci RUJUKAN, bukan isinya");

console.log("\nMENUKAR DUA ANGKA:");
console.log("  C   : tukar(&a, &b)");
console.log("  JS  : [a, b] = [b, a]   <- jauh lebih sederhana");`,

    c: String.raw`#include <stdio.h>

// Fungsi ini menerima ALAMAT, sehingga bisa mengubah aslinya
void tukar(int *a, int *b) {
    int simpan = *a;   // ambil isi di alamat a
    *a = *b;           // tulis isi b ke tempat a
    *b = simpan;
}

// Bandingkan: yang ini hanya menerima SALINAN, jadi gagal
void tukarGagal(int x, int y) {
    int simpan = x;
    x = y;
    y = simpan;        // hanya mengubah salinan lokal
}

int main(void) {
    int x = 10;
    int *p = &x;       // p menyimpan alamat x

    printf("nilai x    : %d\n", x);
    printf("alamat x   : %p\n", (void *)&x);
    printf("isi p      : %p\n", (void *)p);      // sama dengan alamat x
    printf("isi *p     : %d\n", *p);             // 10

    *p = 20;                                     // ubah x lewat pointer
    printf("x setelah *p = 20 : %d\n\n", x);     // 20

    int a = 1, b = 2;
    tukarGagal(a, b);
    printf("tukarGagal -> a=%d b=%d\n", a, b);   // tidak berubah
    tukar(&a, &b);
    printf("tukar      -> a=%d b=%d\n", a, b);   // tertukar

    return 0;
}`,

    cpp: String.raw`#include <iostream>
using namespace std;

// Cara C: lewat pointer, wajib pakai * dan &
void tukarPointer(int *a, int *b) {
    int simpan = *a;
    *a = *b;
    *b = simpan;
}

// Cara C++: lewat reference, lebih ringkas dan tidak bisa null
void tukarReference(int &a, int &b) {
    int simpan = a;    // tidak perlu *, a sudah "nama lain" untuk aslinya
    a = b;
    b = simpan;
}

int main() {
    int x = 10;
    int *p = &x;

    cout << "nilai x  : " << x  << endl;
    cout << "alamat x : " << p  << endl;
    cout << "isi *p   : " << *p << endl;

    *p = 20;
    cout << "x jadi   : " << x  << endl << endl;

    int a = 1, b = 2;
    tukarPointer(&a, &b);              // pemanggil wajib menulis &
    cout << "pointer   -> a=" << a << " b=" << b << endl;

    tukarReference(a, b);              // pemanggil menulis biasa saja
    cout << "reference -> a=" << a << " b=" << b << endl;

    return 0;
}`,

    python: String.raw`# Python TIDAK punya pointer eksplisit — tidak ada & maupun *.
# Tapi konsep "nama menunjuk ke objek" tetap ada, dan itu yang perlu dipahami.

x = 10
print("nilai x :", x)
print("identitas x :", id(x))   # id() = identitas objek
                                # (di CPython kebetulan berupa alamat memori)

# Yang menentukan bisa/tidaknya sebuah fungsi mengubah data pemanggil
# bukanlah pointer, melainkan MUTABLE atau tidaknya objek tersebut.

def coba_ubah_angka(n):
    n = 99            # ini MENGIKAT ULANG nama lokal n ke objek baru
                      # objek int aslinya tidak tersentuh (int itu immutable)

def coba_ubah_list(daftar):
    daftar.append(99) # ini MENGUBAH ISI objek yang sama (list itu mutable)

def ganti_list(daftar):
    daftar = [0, 0]   # mengikat ulang nama lokal saja -> asli tidak berubah

angka = 5
coba_ubah_angka(angka)
print("angka :", angka)         # tetap 5

data = [1, 2]
coba_ubah_list(data)
print("data  :", data)          # [1, 2, 99]  -> berubah!

ganti_list(data)
print("data  :", data)          # [1, 2, 99]  -> tidak berubah

# Padanan "tukar" di C jadi jauh lebih sederhana:
a, b = 1, 2
a, b = b, a
print("a =", a, ", b =", b)`
  },

  output: `nilai x    : 10
alamat x   : 0x7ffd5c2a4b3c
isi p      : 0x7ffd5c2a4b3c
isi *p     : 10
x setelah *p = 20 : 20

tukarGagal -> a=1 b=2
tukar      -> a=2 b=1`,

  kesalahanUmum: [
    {
      salah: 'Lupa `&` saat scanf: `scanf("%d", umur);`',
      kenapa: 'Yang terkirim adalah **nilai** `umur` (masih sampah acak), lalu `scanf` menganggapnya sebagai alamat dan menulis ke lokasi asal. Akibatnya program berhenti mendadak (*segmentation fault*) atau memberi hasil aneh.',
      benar: 'Tulis `scanf("%d", &umur);`. Ingat aturannya: **kalau fungsi harus mengisi variabelmu, beri alamatnya.** Pengecualian hanya untuk array/string, karena namanya sudah berupa alamat.'
    },
    {
      salah: 'Mengira `int* a, b;` membuat dua pointer.',
      kenapa: 'Tanda `*` menempel pada **nama variabel**, bukan pada tipe. Jadi hanya `a` yang jadi pointer, sedangkan `b` adalah `int` biasa. Kesalahan ini tidak menimbulkan error saat kompilasi, jadi sulit dilacak.',
      benar: 'Tulis `int *a, *b;` bila keduanya memang pointer. Kebiasaan menempelkan `*` ke nama variabel (`int *a;`) membuat maksudnya selalu jelas.'
    },
    {
      salah: 'Memakai pointer yang belum diarahkan: `int *p; *p = 5;`',
      kenapa: '`p` belum berisi alamat yang sah — isinya nilai sampah dari memori bekas. Menulis ke sana berarti menimpa lokasi acak (*wild pointer*), dan program bisa crash atau rusak diam-diam.',
      benar: 'Selalu arahkan dulu: `int x; int *p = &x; *p = 5;` — atau beri `= NULL` saat deklarasi lalu cek `if (p != NULL)` sebelum dipakai.'
    },
    {
      salah: 'Tertukar antara `p = 20;` dan `*p = 20;`',
      kenapa: '`p = 20` mengubah **pointernya**, sehingga ia kini menunjuk ke alamat nomor 20 — alamat acak milik sistem. Sedangkan `*p = 20` mengubah **nilai yang ditunjuk**, yang biasanya itulah yang kita mau.',
      benar: 'Ingat pemetaan sederhana: **tanpa `*` berarti mengurus alamatnya, dengan `*` berarti mengurus isinya.**'
    },
    {
      salah: 'Mengembalikan alamat variabel lokal dari sebuah fungsi.',
      kenapa: 'Variabel lokal hidup di *stack* dan otomatis dibuang begitu fungsi selesai. Alamat yang dikembalikan jadi menunjuk ke loker yang sudah tidak berlaku (*dangling pointer*). Sering kali nilainya masih "kelihatan benar" saat diuji, lalu rusak di tempat lain — bug jenis ini paling melelahkan dilacak.',
      benar: 'Kembalikan nilainya langsung, atau alokasikan di *heap* dengan `malloc`/`new` (dan jangan lupa `free`/`delete`), atau minta pemanggil menyediakan tempat lalu kirim alamatnya.'
    }
  ],

  analogi: `
Pakai analogi **alamat rumah**, dan pertahankan istilahnya konsisten sepanjang penjelasan.

Nilai variabel itu **isi rumah**, sedangkan pointer adalah **secarik kertas berisi alamat rumah**. Dari situ semua simbol jadi masuk akal:

- \`&x\` = "tolong catatkan **alamat** rumah x di kertas ini"
- \`*p\` = "**datangi** rumah sesuai alamat di kertas p, lalu lihat isinya"
- \`*p = 20\` = "datangi rumahnya, **ganti** perabotnya jadi 20" (rumahnya tetap, isinya berubah)
- \`p = 20\` = "**tipp-ex** kertasnya, tulis alamat baru: nomor 20" — padahal rumah nomor 20 milik orang lain

Untuk menjelaskan \`scanf\`: tanya ke mahasiswa, *"kalau kamu minta kurir mengantar paket, kamu kasih **alamat rumahmu** atau kamu kasih **foto isi kamarmu**?"* Fungsi \`scanf\` itu kurir yang mau **menaruh** sesuatu — jelas ia butuh alamat. Itulah kenapa harus \`&\`.

Terakhir, gambarkan kotak-kotak memori di papan tulis dengan nomor di bawahnya. Hampir semua kebingungan pointer hilang begitu mahasiswa bisa **melihat** loker dan nomornya.
`,

  latihan: [
    'Buat program yang meminta dua bilangan dari pengguna, lalu menukar isinya memakai fungsi `tukar(int *a, int *b)`. Cetak nilainya sebelum dan sesudah ditukar.',
    'Tulis fungsi `void hitung(int arr[], int n, int *maks, int *min)` yang mengisi nilai terbesar dan terkecil sebuah array melalui pointer. Perhatikan: kenapa fungsi ini bisa mengembalikan **dua** nilai sekaligus, padahal `return` cuma bisa satu?',
    'Tanpa menjalankan programnya, tebak dulu keluaran potongan ini lalu buktikan: `int a[4] = {2,4,6,8}; int *p = a; printf("%d %d", *(p+2), *p+2);` — jelaskan kenapa kedua hasilnya berbeda padahal tulisannya mirip.',
    'Cari kesalahan pada kode berikut dan perbaiki: `int *p; scanf("%d", p); printf("%d", *p);` — sebutkan **dua** hal yang salah, bukan cuma satu.',
    'Uji pemahaman: jelaskan ulang dalam 2 menit dengan kata-katamu sendiri tentang perbedaan `int *a, b;` dan `int *a, *b;` seolah kepada orang yang baru belajar C, lengkap dengan gambar kotak memorinya.'
  ]
});

TOPICS.push({
  id: 'struct',
  judul: 'Struct',
  kategori: 'algoritma',
  tag: ['struct', 'record', 'typedef', 'data majemuk'],
  ringkas: 'Menyatukan beberapa data berbeda tipe menjadi satu kesatuan — cikal bakal class di OOP.',

  fungsi: `**Mengelompokkan data yang saling berhubungan jadi satu satuan bernama.**

Tanpa struct, data satu mahasiswa berarti tiga array terpisah yang harus kamu jaga agar indeksnya selalu sejalan — dan itu sumber bug yang tidak pernah habis.

Terpakai di:

- **Mewakili entitas** — mahasiswa, produk, transaksi, titik koordinat
- **Struktur data** — simpul linked list dan tree adalah struct yang menunjuk dirinya sendiri
- **Membaca berkas dan protokol** — header berkas gambar dan paket jaringan berbentuk struct
- **Jembatan ke OOP** — kelas pada dasarnya struct yang punya fungsi di dalamnya
- **Basis data** — satu struct sepadan dengan satu baris tabel

Manfaat yang paling langsung terasa: **satu fungsi cukup menerima satu parameter**, bukan lima. Dan menambah kolom baru tidak membuatmu mengubah tanda tangan setiap fungsi.`,

  praktik: {
    tujuan: `Kamu bisa merancang struct yang mewakili entitas nyata, memakainya dalam array dan fungsi, dan menyimpannya ke berkas.`,
    alat: [
      'C atau C++ dengan gcc',
      'Editor teks'
    ],
    langkah: [
      { judul: 'Rancang dari entitas nyata',
        isi: `Ambil satu benda nyata — misalnya buku perpustakaan — dan daftar apa saja yang perlu diketahui tentangnya: judul, penulis, tahun, jumlah eksemplar.

Itulah anggotanya. Aturannya: **kalau data selalu muncul bersama, ia layak jadi satu struct.**` },
      { judul: 'Pilih tipe tiap anggota dengan sadar',
        isi: `Pakai tabel keputusan tipe dari topik Variabel:

- judul dan penulis → array karakter atau \`std::string\`
- tahun → \`int\`
- ISBN → **teks**, bukan angka, karena ia pengenal
- harga → bilangan bulat rupiah

Salah tipe di sini akan menular ke setiap fungsi yang memakainya.` },
      { judul: 'Buat array of struct, bukan struct of array',
        isi: `Tulis \`Buku daftar[100];\` — satu array berisi seratus buku utuh.

Bandingkan dengan cara lama: tiga array terpisah untuk judul, penulis, dan tahun. Yang kedua memaksamu menjaga agar \`judul[i]\`, \`penulis[i]\`, dan \`tahun[i]\` selalu merujuk buku yang sama — dan satu kesalahan urutan merusak semuanya diam-diam.` },
      { judul: 'Kirim ke fungsi lewat pointer atau acuan',
        isi: `Mengirim struct besar *by value* menyalin seluruh isinya.

Di C: \`void cetak(const Buku *b)\`, diakses dengan \`b->judul\`.
Di C++: \`void cetak(const Buku &b)\`, diakses dengan \`b.judul\`.

Tanda panah dipakai untuk pointer, titik untuk objek atau acuan.` },
      { judul: 'Buat struct bersarang',
        isi: `Tambahkan struct \`Tanggal\` berisi hari, bulan, tahun, lalu pakai di dalam \`Buku\` sebagai tanggal terbit.

Akses jadi \`buku.terbit.tahun\`. Bersarang membuat data lebih terorganisasi, dan mencerminkan struktur nyatanya.` },
      { judul: 'Simpan dan baca kembali dari berkas',
        isi: `Tulis seluruh array struct ke berkas biner dengan \`fwrite\`, lalu baca kembali dengan \`fread\` ke program yang baru dijalankan.

Bandingkan hasilnya dengan yang asli. Kalau cocok, kamu baru saja membuat penyimpanan data paling sederhana — dan memahami kenapa basis data ada untuk menggantikannya.` }
    ],
    cek: [
      'Satu fungsi cukup menerima satu parameter struct, bukan lima parameter terpisah',
      'Data yang ditulis ke berkas terbaca kembali identik setelah program dijalankan ulang',
      'Menambah satu anggota baru ke struct tidak memaksamu mengubah tanda tangan fungsi mana pun'
    ]
  },

  konsep: `
Array bagus untuk menyimpan banyak data **sejenis**. Tapi bagaimana kalau satu mahasiswa punya nama (teks), umur (bilangan bulat), dan IPK (pecahan) sekaligus? Tipenya berbeda-beda, jadi array tidak bisa dipakai.

Menyimpannya sebagai variabel terpisah — \`nama1\`, \`umur1\`, \`ipk1\`, \`nama2\`, \`umur2\` — cepat menjadi kacau. Lebih parah lagi, tidak ada yang mengikat ketiganya; kompiler tidak tahu bahwa \`nama1\` dan \`umur1\` sebenarnya milik orang yang sama.

**Struct** menyelesaikannya dengan **menyatukan beberapa data berbeda tipe menjadi satu tipe baru**. Setelah didefinisikan, \`struct Mahasiswa\` bisa dipakai seperti tipe data biasa: dibuat variabelnya, dimasukkan ke array, dikirim ke fungsi, bahkan dikembalikan lewat \`return\`.

Manfaatnya bukan cuma kerapian:

- **Data yang berhubungan terikat jadi satu**, sehingga mustahil tertukar antar orang
- **Satu mahasiswa cukup satu variabel**, bukan tiga
- **Array of struct** menyimpan banyak record sekaligus — dasar dari hampir semua program pengelolaan data di praktikum

Bagian yang perlu kamu tekankan sebagai asprak: **struct adalah nenek moyang class.** Keduanya sama-sama menyatukan data menjadi satu kesatuan. Bedanya, class **juga** bisa menyimpan perilaku berupa method, sementara struct di C hanya menampung data — fungsinya harus ditulis terpisah dan objeknya dikirim manual.

Kalau kamu sudah paham struct, konsep class di materi OOP tinggal menambahkan satu hal saja: fungsinya ikut masuk ke dalam.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'struct Mahasiswa {\n    char  nama[50];\n    int   umur;\n    float ipk;\n};      // <- titik koma WAJIB\n\nstruct Mahasiswa mhs;   // di C, kata "struct" harus ikut ditulis',
      penjelasan: `
Definisi struct **hanya membuat cetakan** — belum ada memori yang dipesan. Memori baru dipakai saat kamu membuat variabelnya, yaitu di baris \`struct Mahasiswa mhs;\`.

Dua hal yang sering menjatuhkan mahasiswa di sini:

**Titik koma setelah kurung tutup itu wajib.** Sama seperti pada class C++, definisi struct adalah pernyataan yang boleh langsung diikuti nama variabel — misal \`struct Mahasiswa { ... } mhs1, mhs2;\`. Kompiler butuh titik koma untuk tahu di mana pernyataannya berakhir. Kalau lupa, pesan errornya muncul di **baris berikutnya** dan terasa membingungkan.

**Di C, kata \`struct\` harus ikut ditulis setiap kali.** Menulis \`Mahasiswa mhs;\` saja ditolak, karena nama tipenya secara resmi adalah \`struct Mahasiswa\`, bukan \`Mahasiswa\`. Inilah yang diselesaikan oleh \`typedef\` pada kartu berikutnya.

Di **C++** aturan ini dilonggarkan: cukup tulis \`Mahasiswa mhs;\` tanpa kata \`struct\`.
`
    },
    {
      bahasa: 'c',
      kode: 'typedef struct {\n    char  nama[50];\n    int   umur;\n} Mahasiswa;            // nama tipe barunya di sini\n\nMahasiswa mhs;          // tidak perlu menulis "struct" lagi',
      penjelasan: `
\`typedef\` berarti "beri nama panggilan untuk sebuah tipe". Dengan ini, \`struct { ... }\` yang panjang mendapat nama pendek \`Mahasiswa\`.

Perhatikan letak namanya: **di akhir, setelah kurung tutup** — bukan setelah kata \`struct\` seperti bentuk biasa. Ini sering membingungkan karena posisinya terasa terbalik.

Kenapa cara ini banyak dipakai? Karena membuat kodenya jauh lebih bersih, terutama saat struct dipakai berulang kali sebagai parameter fungsi atau tipe array. Bandingkan:

- Tanpa typedef: \`void cetak(struct Mahasiswa m)\`
- Dengan typedef: \`void cetak(Mahasiswa m)\`

Untuk struktur data berantai seperti linked list, bentuknya sedikit berbeda karena struct perlu menyebut dirinya sendiri:

\`typedef struct Node { int data; struct Node *next; } Node;\`

Di sini nama \`Node\` setelah kata \`struct\` tetap diperlukan, karena saat baris \`struct Node *next\` ditulis, nama panggilannya belum jadi.
`
    },
    {
      bahasa: 'c',
      kode: 'mhs.umur = 20;          // objek langsung -> pakai titik\n\nMahasiswa *p = &mhs;\np->umur = 21;           // lewat pointer -> pakai panah\n// p->umur sama dengan (*p).umur',
      penjelasan: `
Dua tanda ini punya aturan yang tegas:

- **Titik (\`.\`)** dipakai kalau kamu memegang **objeknya langsung**
- **Panah (\`->\`)** dipakai kalau kamu memegang **alamatnya** (pointer)

Hubungan keduanya sederhana: \`p->umur\` hanyalah singkatan dari \`(*p).umur\`, yang berarti "buka dulu isi pointernya, baru ambil anggotanya".

Kenapa tanda kurungnya wajib pada bentuk panjang? Karena tanda \`.\` dikerjakan **lebih dulu** daripada \`*\`. Jadi \`*p.umur\` akan dibaca sebagai \`*(p.umur)\` — dan itu salah, karena \`p\` adalah pointer yang tidak punya anggota bernama \`umur\`. Justru karena penulisan \`(*p).umur\` merepotkan itulah C menyediakan \`->\`.

Aturan praktisnya cukup satu kalimat: **kalau ada bintang di deklarasinya, pakai panah.**
`
    },
    {
      bahasa: 'c',
      kode: 'void ubah(Mahasiswa m)  { m.umur = 99; }   // SALINAN, asli tetap\nvoid ubah2(Mahasiswa *m) { m->umur = 99; }  // asli ikut berubah',
      penjelasan: `
Berbeda dari array, **struct benar-benar disalin utuh** saat dikirim ke fungsi. Aturan *pass by value* berlaku penuh di sini.

Ini punya dua akibat penting:

**Pertama, perubahan di dalam fungsi tidak berpengaruh ke aslinya** — persis seperti variabel biasa. Banyak mahasiswa terkejut karena mereka menyangka struct berperilaku seperti array yang otomatis terkirim sebagai alamat.

**Kedua, menyalin struct besar itu boros.** Struct berisi 20 field akan disalin seluruhnya setiap kali dikirim ke fungsi. Kalau ini terjadi di dalam perulangan, biayanya menumpuk.

Karena itu, praktik yang lazim adalah **selalu mengirim struct lewat pointer**, bahkan ketika kamu tidak berniat mengubahnya. Untuk menegaskan bahwa isinya tidak akan diubah, tambahkan \`const\`:

\`void cetak(const Mahasiswa *m)\`

Dengan begitu kamu mendapat dua keuntungan sekaligus: hemat karena tidak menyalin, dan aman karena kompiler menolak setiap upaya perubahan.
`
    },
    {
      bahasa: 'c',
      kode: 'Mahasiswa kelas[3];              // array of struct\nstrcpy(kelas[0].nama, "Budi");   // elemen ke-0, anggota nama\nkelas[0].umur = 20;',
      penjelasan: `
**Array of struct** adalah bentuk yang paling sering dipakai di praktikum, karena inilah cara menyimpan banyak record sekaligus — daftar mahasiswa, daftar barang, daftar transaksi.

Cara membacanya dari kiri ke kanan: \`kelas[0]\` memilih **record ke berapa**, lalu \`.nama\` memilih **anggota yang mana** dari record itu.

Perhatikan bahwa anggota bertipe array seperti \`nama\` **tidak bisa ditugasi langsung**. Menulis \`kelas[0].nama = "Budi";\` ditolak kompiler; harus disalin dengan \`strcpy\`. Sebaliknya, anggota bertipe angka seperti \`umur\` bisa langsung ditugasi.

Menariknya, **struct utuh justru bisa ditugasi langsung**: \`kelas[1] = kelas[0];\` menyalin seluruh isinya sekaligus, termasuk array \`nama\` di dalamnya. Ini pengecualian yang berguna — dan sering dipakai saat menukar posisi data ketika mengurutkan daftar.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;
using System.Linq;

// C# punya struct SUNGGUHAN, dan bedanya dengan class sangat penting:
// struct = TIPE NILAI  -> disalin saat ditugaskan
// class  = TIPE RUJUKAN -> yang disalin rujukannya
struct Titik {
    public int X, Y;
    public Titik(int x, int y) { X = x; Y = y; }
    public override string ToString() => $"({X}, {Y})";
}

class TitikClass {
    public int X, Y;
    public override string ToString() => $"({X}, {Y})";
}

struct Mahasiswa {
    public string Nama;
    public int    Umur;
    public double Ipk;

    public string Predikat() {
        if (Ipk >= 3.5) return "Cumlaude";
        if (Ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }
}

class Program {
    static void Main() {
        // ---------- PERBEDAAN INTI: NILAI vs RUJUKAN ----------
        Titik a = new Titik(1, 1);
        Titik b = a;                    // DISALIN seluruhnya
        b.X = 99;
        Console.WriteLine($"struct : a={a} b={b}   <- terpisah");

        TitikClass c = new TitikClass { X = 1, Y = 1 };
        TitikClass d = c;               // yang disalin RUJUKANNYA
        d.X = 99;
        Console.WriteLine($"class  : c={c} d={d}   <- object SAMA");
        Console.WriteLine("-> inilah beda struct dan class di C#\n");

        // Array of struct
        Mahasiswa[] kelas = {
            new Mahasiswa { Nama = "Dedi",  Umur = 20, Ipk = 3.10 },
            new Mahasiswa { Nama = "Eka",   Umur = 22, Ipk = 3.85 },
            new Mahasiswa { Nama = "Fajar", Umur = 21, Ipk = 2.95 }
        };

        Console.WriteLine($"{"NAMA",-10}| UMR | IPK");
        Console.WriteLine(new string('-', 27));
        foreach (var m in kelas)
            Console.WriteLine($"{m.Nama,-10}| {m.Umur,3} | {m.Ipk:F2}");

        var terbaik = kelas.OrderByDescending(m => m.Ipk).First();
        Console.WriteLine($"\nIPK tertinggi : {terbaik.Nama} ({terbaik.Ipk:F2})");
        Console.WriteLine($"predikat      : {terbaik.Predikat()}");

        // record: cara modern C# untuk data yang tidak berubah
        Console.WriteLine("\nAlternatif modern — record:");
        var r1 = new Buku("Algoritma", 2020);
        var r2 = new Buku("Algoritma", 2020);
        Console.WriteLine($"  {r1}");
        Console.WriteLine($"  r1 == r2 ? {r1 == r2}  <- record membandingkan ISI");
    }

    record Buku(string Judul, int Tahun);
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    // Java TIDAK punya struct. Padanannya adalah class biasa.
    static class Mahasiswa {
        String nama;
        int    umur;
        double ipk;

        Mahasiswa(String nama, int umur, double ipk) {
            this.nama = nama;
            this.umur = umur;
            this.ipk  = ipk;
        }

        String predikat() {
            if (ipk >= 3.5) return "Cumlaude";
            if (ipk >= 3.0) return "Sangat Baik";
            return "Baik";
        }
    }

    // Java 16+ punya record: ringkas, dan isinya tidak bisa diubah
    record Buku(String judul, int tahun) { }

    public static void main(String[] args) {
        // PENTING: berbeda dari C dan C#, object Java SELALU tipe rujukan.
        // Tidak ada padanan struct yang disalin utuh.
        Mahasiswa a = new Mahasiswa("Budi", 20, 3.75);
        Mahasiswa b = a;                     // yang disalin RUJUKANNYA
        b.umur = 99;
        System.out.println("a.umur = " + a.umur + "  <- ikut berubah, object sama");
        System.out.println("-> di C dan C#, struct akan disalin utuh\n");

        List<Mahasiswa> kelas = new ArrayList<>(List.of(
            new Mahasiswa("Dedi",  20, 3.10),
            new Mahasiswa("Eka",   22, 3.85),
            new Mahasiswa("Fajar", 21, 2.95)
        ));

        System.out.printf("%-10s| UMR | IPK%n", "NAMA");
        System.out.println("-".repeat(27));
        for (Mahasiswa m : kelas)
            System.out.printf("%-10s| %3d | %.2f%n", m.nama, m.umur, m.ipk);

        // Mengurutkan berdasarkan IPK
        kelas.sort(Comparator.comparingDouble((Mahasiswa m) -> m.ipk).reversed());
        System.out.println("\nurut IPK tertinggi:");
        for (Mahasiswa m : kelas) System.out.println("  " + m.nama + " " + m.ipk);

        Mahasiswa terbaik = kelas.get(0);
        System.out.println("\npredikat " + terbaik.nama + " : " + terbaik.predikat());

        // record: membandingkan ISI, bukan alamat
        Buku r1 = new Buku("Algoritma", 2020);
        Buku r2 = new Buku("Algoritma", 2020);
        System.out.println("\nrecord: " + r1);
        System.out.println("  r1.equals(r2) ? " + r1.equals(r2) + "  <- membandingkan isi");
        System.out.println("  r1 == r2      ? " + (r1 == r2) + "  <- tetap alamat");
    }
}`,

    js: String.raw`// JavaScript tidak punya struct. Padanannya adalah object biasa.
const mahasiswa = {
    nama: "Budi",
    umur: 20,
    ipk: 3.75,
    predikat() {
        if (this.ipk >= 3.5) return "Cumlaude";
        if (this.ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }
};

console.log("nama     :", mahasiswa.nama);
console.log("predikat :", mahasiswa.predikat());

// Object selalu tipe RUJUKAN — sama seperti Java
const a = { nama: "Budi", umur: 20 };
const b = a;
b.umur = 99;
console.log("\na.umur =", a.umur, " <- ikut berubah, object sama");
console.log("-> di C dan C#, struct akan disalin utuh");

// Menyalin isinya: spread operator
const salinan = { ...a };
salinan.umur = 1;
console.log("setelah disalin, a.umur =", a.umur, " <- aman");

// Array of object: bentuk yang paling sering dipakai
const kelas = [
    { nama: "Dedi",  umur: 20, ipk: 3.10 },
    { nama: "Eka",   umur: 22, ipk: 3.85 },
    { nama: "Fajar", umur: 21, ipk: 2.95 }
];

console.log("\n" + "NAMA".padEnd(10) + "| UMR | IPK");
console.log("-".repeat(27));
for (const m of kelas) {
    console.log(m.nama.padEnd(10) + "| " + String(m.umur).padStart(3) +
                " | " + m.ipk.toFixed(2));
}

// Mengurutkan berdasarkan IPK
const urut = [...kelas].sort(function (x, y) { return y.ipk - x.ipk; });
console.log("\nurut IPK tertinggi:");
urut.forEach(function (m) { console.log("  " + m.nama + " " + m.ipk); });

// Mencari
const terbaik = kelas.reduce(function (x, y) { return x.ipk > y.ipk ? x : y; });
console.log("\nIPK tertinggi :", terbaik.nama, terbaik.ipk);

// Destructuring: mengambil beberapa field sekaligus
const { nama, ipk } = terbaik;
console.log("destructuring :", nama, ipk);

// Object bersarang
const dataLengkap = {
    nama: "Budi",
    lahir: { hari: 17, bulan: 8, tahun: 2004 }
};
console.log("\ntahun lahir :", dataLengkap.lahir.tahun);

// JEBAKAN: membandingkan object
console.log("\n{a:1} === {a:1} ?", { a: 1 } === { a: 1 }, " <- selalu false");
console.log("-> bandingkan isinya:",
            JSON.stringify({ a: 1 }) === JSON.stringify({ a: 1 }));`,

    c: String.raw`#include <stdio.h>
#include <string.h>

/* typedef supaya tidak perlu menulis "struct" berulang kali */
typedef struct {
    char  nama[50];
    int   umur;
    float ipk;
} Mahasiswa;

/* Dikirim lewat pointer + const: hemat karena tidak menyalin, aman
   karena kompiler menolak perubahan */
void cetak(const Mahasiswa *m) {
    printf("%-10s | %3d | %.2f\n", m->nama, m->umur, m->ipk);
}

/* Tanpa pointer -> hanya salinan, aslinya tidak berubah */
void gagalUbah(Mahasiswa m) {
    m.umur = 99;
}

/* Dengan pointer -> aslinya benar-benar berubah */
void ubahUmur(Mahasiswa *m, int umurBaru) {
    m->umur = umurBaru;
}

/* Struct bisa dikembalikan lewat return */
Mahasiswa buat(const char *nama, int umur, float ipk) {
    Mahasiswa m;
    strcpy(m.nama, nama);
    m.umur = umur;
    m.ipk  = ipk;
    return m;
}

int main(void) {
    /* Cara 1: isi satu per satu */
    Mahasiswa a;
    strcpy(a.nama, "Budi");     // anggota array WAJIB strcpy
    a.umur = 20;                // anggota angka boleh langsung
    a.ipk  = 3.75;

    /* Cara 2: langsung saat deklarasi, urutannya harus sesuai */
    Mahasiswa b = {"Ani", 21, 3.20};

    /* Cara 3: lewat fungsi */
    Mahasiswa c = buat("Citra", 19, 3.90);

    printf("%-10s | %3s | %s\n", "NAMA", "UMR", "IPK");
    printf("---------------------------\n");
    cetak(&a);
    cetak(&b);
    cetak(&c);

    /* Pass by value vs pointer */
    gagalUbah(a);
    printf("\nsetelah gagalUbah : umur %d  <- tidak berubah\n", a.umur);
    ubahUmur(&a, 22);
    printf("setelah ubahUmur  : umur %d  <- berubah\n", a.umur);

    /* Array of struct: bentuk yang paling sering dipakai */
    Mahasiswa kelas[3] = {
        {"Dedi", 20, 3.10},
        {"Eka",  22, 3.85},
        {"Fajar",21, 2.95}
    };

    printf("\n--- DAFTAR KELAS ---\n");
    for (int i = 0; i < 3; i++) {
        cetak(&kelas[i]);
    }

    /* Mencari IPK tertinggi */
    int terbaik = 0;
    for (int i = 1; i < 3; i++) {
        if (kelas[i].ipk > kelas[terbaik].ipk) terbaik = i;
    }
    printf("\nIPK tertinggi : %s (%.2f)\n",
           kelas[terbaik].nama, kelas[terbaik].ipk);

    /* Struct utuh bisa ditugasi langsung — berguna saat menukar posisi */
    Mahasiswa simpan = kelas[0];
    kelas[0] = kelas[1];
    kelas[1] = simpan;
    printf("setelah ditukar, urutan pertama : %s\n", kelas[0].nama);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

/* Di C++ tidak perlu typedef — nama struct langsung jadi nama tipe.
   struct di C++ sebenarnya SAMA dengan class, bedanya hanya:
   struct bawaannya public, class bawaannya private. */
struct Mahasiswa {
    string nama;
    int    umur;
    double ipk;

    // struct C++ bahkan boleh punya method — di sinilah ia bertemu OOP
    void cetak() const {
        cout << nama << " | " << umur << " | " << ipk << endl;
    }
};

int main() {
    Mahasiswa a{"Budi", 20, 3.75};      // tidak perlu strcpy
    Mahasiswa b{"Ani",  21, 3.20};

    a.cetak();
    b.cetak();

    // vector of struct: array yang ukurannya bisa bertambah
    vector<Mahasiswa> kelas = {
        {"Dedi",  20, 3.10},
        {"Eka",   22, 3.85},
        {"Fajar", 21, 2.95}
    };
    kelas.push_back({"Gita", 20, 3.55});

    cout << "\n--- DAFTAR KELAS ---" << endl;
    for (const Mahasiswa &m : kelas) {   // & supaya tidak menyalin
        m.cetak();
    }

    // Mengurutkan berdasarkan IPK, dari besar ke kecil
    sort(kelas.begin(), kelas.end(),
         [](const Mahasiswa &x, const Mahasiswa &y) {
             return x.ipk > y.ipk;       // aturan pembanding
         });

    cout << "\n--- URUT IPK TERTINGGI ---" << endl;
    for (const Mahasiswa &m : kelas) m.cetak();

    return 0;
}`,

    python: String.raw`# Python tidak punya struct. Padanannya ada tiga, dari yang paling
# sederhana sampai yang paling mirip struct.

# 1. dict — paling cepat ditulis, tapi kunci mudah salah ketik
mhs = {"nama": "Budi", "umur": 20, "ipk": 3.75}
print(mhs["nama"], mhs["umur"], mhs["ipk"])

# 2. dataclass — paling mirip struct, dan inilah yang disarankan
from dataclasses import dataclass

@dataclass
class Mahasiswa:
    nama: str
    umur: int
    ipk: float

    def cetak(self):
        print(f"{self.nama:<10} | {self.umur:3} | {self.ipk:.2f}")


a = Mahasiswa("Budi", 20, 3.75)
b = Mahasiswa("Ani", 21, 3.20)

print()
a.cetak()
b.cetak()

# dataclass otomatis menyediakan tampilan dan perbandingan yang enak
print("\nrepr    :", a)
print("sama?   :", Mahasiswa("Budi", 20, 3.75) == a)   # True

# List of dataclass: padanan array of struct
kelas = [
    Mahasiswa("Dedi",  20, 3.10),
    Mahasiswa("Eka",   22, 3.85),
    Mahasiswa("Fajar", 21, 2.95),
]

print("\n--- DAFTAR KELAS ---")
for m in kelas:
    m.cetak()

# Mengurutkan berdasarkan IPK
kelas.sort(key=lambda m: m.ipk, reverse=True)
print("\n--- URUT IPK TERTINGGI ---")
for m in kelas:
    m.cetak()

print("\nIPK tertinggi :", max(kelas, key=lambda m: m.ipk).nama)

# CATATAN PENTING: berbeda dari C, objek Python dikirim sebagai acuan.
# Mengubahnya di dalam fungsi ikut mengubah aslinya.
def ubah_umur(m, umur_baru):
    m.umur = umur_baru            # asli IKUT berubah

ubah_umur(a, 99)
print("\nsetelah ubah_umur :", a.umur)   # 99`
  },

  output: `NAMA       | UMR | IPK
---------------------------
Budi       |  20 | 3.75
Ani        |  21 | 3.20
Citra      |  19 | 3.90

setelah gagalUbah : umur 20  <- tidak berubah
setelah ubahUmur  : umur 22  <- berubah

--- DAFTAR KELAS ---
Dedi       |  20 | 3.10
Eka        |  22 | 3.85
Fajar      |  21 | 2.95

IPK tertinggi : Eka (3.85)
setelah ditukar, urutan pertama : Eka`,

  kesalahanUmum: [
    {
      salah: 'Lupa titik koma setelah kurung tutup struct: `}` bukan `};`',
      kenapa: 'Kompiler menganggap definisinya belum selesai dan terus membaca ke bawah. Pesan errornya muncul di **baris berikutnya** — sering di `int main()` — sehingga terasa membingungkan karena baris itu tampak baik-baik saja.',
      benar: 'Tutup dengan `};`. Kalau muncul error aneh tepat setelah sebuah struct atau class, **periksa titik komanya lebih dulu.**'
    },
    {
      salah: 'Di C, lupa menulis kata `struct`: `Mahasiswa mhs;`',
      kenapa: 'Nama tipenya secara resmi adalah `struct Mahasiswa`, bukan `Mahasiswa` saja. Kompiler C menolak dengan pesan seperti *unknown type name*. Mahasiswa yang terbiasa C++ sering tersandung di sini karena di C++ penulisan itu justru sah.',
      benar: 'Tulis lengkap `struct Mahasiswa mhs;`, atau pakai `typedef` agar nama pendeknya bisa dipakai langsung.'
    },
    {
      salah: 'Menugasi anggota bertipe array: `mhs.nama = "Budi";`',
      kenapa: 'Anggota `nama` adalah array `char`, dan nama array merupakan alamat tetap yang tidak bisa dipindahkan. Kompiler menolaknya. Yang membingungkan, anggota bertipe angka seperti `umur` justru **bisa** ditugasi langsung.',
      benar: 'Salin isinya dengan `strcpy(mhs.nama, "Budi");`. Di **C++**, gunakan tipe `string` agar `mhs.nama = "Budi";` bisa langsung dipakai.'
    },
    {
      salah: 'Mengira struct otomatis terkirim sebagai alamat seperti array.',
      kenapa: 'Berbeda dari array, struct **disalin utuh** saat dikirim ke fungsi. Perubahan di dalam fungsi tidak berpengaruh ke aslinya, dan untuk struct besar penyalinan ini juga memboroskan waktu.',
      benar: 'Kirim lewat pointer: `void ubah(Mahasiswa *m)` dipanggil dengan `ubah(&mhs)`. Kalau memang tidak diubah, pakai `const Mahasiswa *m` agar hemat sekaligus aman.'
    },
    {
      salah: 'Tertukar `.` dan `->` saat memakai pointer struct.',
      kenapa: 'Menulis `p.umur` padahal `p` adalah pointer akan ditolak kompiler. Kebalikannya, `mhs->umur` pada objek langsung juga ditolak. Pesan errornya kadang panjang dan menyesatkan bagi pemula.',
      benar: 'Hafalkan aturan singkatnya: **ada bintang di deklarasinya, pakai panah.** Ingat pula bahwa `p->umur` sekadar singkatan dari `(*p).umur`.'
    }
  ],

  analogi: `
Pakai analogi **formulir pendaftaran**. Satu formulir memuat kolom nama, umur, dan IPK — semuanya jenis isian yang berbeda tapi **milik satu orang yang sama**. Itulah struct.

Lanjutkan dengan pertanyaan pancingan: *"Kalau ada 30 mahasiswa, kamu bikin 90 kertas kecil terpisah, atau 30 formulir?"* Jawabannya jelas — dan itulah **array of struct**. Tanpa struct, tidak ada yang mengikat "nama nomor 5" dengan "umur nomor 5"; keduanya bisa tertukar tanpa ada yang menyadari.

Untuk membedakan **struct dan array**, satu kalimat cukup: *"Array itu banyak barang **sejenis**, struct itu satu barang dengan banyak **sifat**."* Array of struct berarti banyak barang yang masing-masing punya banyak sifat.

Untuk **\`.\` versus \`->\`**, kembali ke analogi rumah dari materi pointer: tanda titik dipakai kalau **kamu sudah berada di dalam rumahnya**, sedangkan panah dipakai kalau **kamu baru memegang alamatnya** — kamu harus berangkat ke sana dulu. Tanda panahnya bahkan menggambarkan gerakan "pergi ke sana".

Untuk menyambung ke materi **OOP** nanti, tutup dengan kalimat ini: *"Struct itu formulir yang cuma bisa diisi. Class itu formulir yang bisa mengisi dirinya sendiri dan menghitung sendiri."* Perbedaannya cuma satu — class boleh punya method di dalamnya. Setelah pengantar ini, materi Class & Object akan terasa jauh lebih ringan.
`,

  latihan: [
    'Buat struct `Buku` berisi judul, penulis, tahun, dan harga. Buat tiga buku, simpan dalam array, lalu tampilkan semuanya dalam bentuk tabel yang rapi.',
    'Lanjutkan soal sebelumnya: buat fungsi yang mencari buku termahal dan buku tertua. Kirim arraynya lewat pointer dan jelaskan kenapa itu lebih baik daripada menyalin.',
    'Buat program data mahasiswa dengan struct berisi nama, NIM, dan tiga nilai ujian. Hitung rata-ratanya, lalu tentukan predikatnya. Simpan lima mahasiswa dalam array.',
    'Buat fungsi `void ubahIPK(Mahasiswa m, float baru)` **tanpa** pointer, jalankan, lalu amati bahwa IPK-nya tidak berubah. Setelah itu perbaiki dengan pointer dan jelaskan penyebabnya.',
    'Buat struct bersarang: `Tanggal` (hari, bulan, tahun) yang dipakai sebagai anggota di dalam struct `Mahasiswa` untuk menyimpan tanggal lahir. Bagaimana cara mengakses `tahun` dari dalam `Mahasiswa`?',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang beda array dan struct, lalu tutup dengan menghubungkannya ke class. Pakai analogi formulir dan jangan menyebut kata "objek" sama sekali.'
  ]
});

TOPICS.push({
  id: 'searching',
  judul: 'Searching (Linear & Binary Search)',
  kategori: 'algoritma',
  tag: ['searching', 'linear search', 'binary search', 'pencarian', 'O(log n)'],
  ringkas: 'Dua cara mencari data — dan kenapa yang satu bisa jauh lebih cepat asal datanya sudah terurut.',

  fungsi: `**Menemukan data di dalam kumpulan — dan tahu kapan cara cepat boleh dipakai.**

Pencarian adalah operasi yang paling sering dilakukan program, dan selisih antara cara lambat dan cepat sangat besar.

Terpakai di:

- **Mencari data** di array, berkas, atau daftar hasil
- **Indeks basis data** — \`CREATE INDEX\` pada dasarnya menyiapkan struktur agar pencarian biner bisa dipakai
- **Menemukan batas** — mencari nilai terkecil yang memenuhi syarat, misalnya kapasitas minimal
- **Struktur Data** — BST dan hash table ada untuk mempercepat pencarian
- **Debugging dengan git bisect** — pencarian biner pada riwayat commit

Perbandingannya nyata: pada satu juta data, pencarian linear butuh sampai satu juta langkah, sedangkan pencarian biner cukup **dua puluh**.

Syaratnya satu, dan tidak bisa ditawar: **datanya harus sudah terurut**.`,

  praktik: {
    tujuan: `Kamu bisa menulis pencarian biner yang benar tanpa kesalahan satu langkah, dan tahu kapan mengurutkan dulu itu sepadan.`,
    alat: [
      'Python 3 atau C++',
      'Modul `time` untuk mengukur'
    ],
    langkah: [
      { judul: 'Tulis pencarian linear dulu sebagai pembanding',
        isi: `Sederhana: telusuri dari awal, kembalikan indeks kalau ketemu, dan negatif satu kalau habis.

**Jangan hapus** setelah selesai. Ini akan jadi jawaban acuan untuk memeriksa apakah pencarian binermu benar.` },
      { judul: 'Tulis pencarian biner dengan batas yang jelas',
        isi: `Pakai bentuk baku ini dan jangan berimprovisasi sampai kamu hafal:

- \`kiri = 0\`, \`kanan = n - 1\`
- selama \`kiri <= kanan\`:
- \`tengah = kiri + (kanan - kiri) // 2\`
- kalau sama, kembalikan tengah
- kalau lebih kecil, \`kiri = tengah + 1\`
- kalau lebih besar, \`kanan = tengah - 1\`

Perhatikan \`+1\` dan \`-1\`. Tanpa itu, perulangannya bisa tidak pernah berhenti.` },
      { judul: 'Pahami kenapa rumus tengahnya begitu',
        isi: `Menulis \`(kiri + kanan) // 2\` bisa **meluap** kalau keduanya bilangan besar di C atau Java.

\`kiri + (kanan - kiri) // 2\` memberi hasil yang sama tanpa risiko itu.

Bug ini pernah ada di pustaka standar Java selama bertahun-tahun sebelum ditemukan — jadi ia bukan hal sepele.` },
      { judul: 'Uji dengan kasus batas',
        isi: `Uji sengaja dengan:

- array **kosong**
- array berisi **satu** elemen
- mencari elemen **pertama** dan **terakhir**
- mencari nilai yang **tidak ada**
- mencari nilai yang **lebih kecil dari semua** dan **lebih besar dari semua**

Kelima kelompok ini menangkap hampir semua kesalahan satu langkah.` },
      { judul: 'Bandingkan dengan pencarian linear pada data acak',
        isi: `Buat sejuta data terurut, lalu cari seribu nilai acak dengan kedua cara dan ukur waktunya.

Selisihnya akan sangat besar, dan itu penjelasan paling meyakinkan tentang kenapa pengurutan dan indeks itu penting.` },
      { judul: 'Hitung kapan mengurutkan itu sepadan',
        isi: `Mengurutkan butuh sekitar \`n log n\` operasi. Kalau kamu hanya mencari **sekali**, pencarian linear lebih cepat karena tidak perlu mengurutkan.

Kalau kamu mencari **berkali-kali** pada data yang sama, mengurutkan sekali di awal langsung terbayar.

Inilah alasan basis data punya indeks: dibuat sekali, dipakai jutaan kali.` }
    ],
    cek: [
      'Pencarian binermu memberi hasil sama dengan pencarian linear untuk 1000 pencarian acak',
      'Ia bekerja benar pada array kosong dan array berisi satu elemen',
      'Kamu memakai rumus tengah yang aman dari luapan'
    ]
  },

  konsep: `
**Searching** adalah proses mencari apakah sebuah nilai ada di dalam kumpulan data, dan di posisi mana. Terlihat sepele, tapi inilah operasi yang paling sering dijalankan komputer — dan pilihan algoritmanya menentukan apakah program terasa seketika atau menggantung.

Ada dua pendekatan dasar yang wajib kamu kuasai:

**Linear search** memeriksa data **satu per satu dari awal** sampai ketemu. Sederhana, selalu bisa dipakai, dan **tidak menuntut apa pun** — data boleh berantakan. Kelemahannya, kalau datanya sejuta dan yang dicari ada di ujung, ya harus diperiksa sejuta kali. Kompleksitasnya **O(n)**.

**Binary search** bekerja jauh lebih cerdas, tapi dengan **satu syarat mutlak: datanya harus sudah terurut.** Caranya, ia melihat elemen **tengah** lebih dulu. Kalau yang dicari lebih kecil, seluruh separuh kanan langsung dibuang tanpa diperiksa; kalau lebih besar, separuh kiri yang dibuang. Begitu terus sampai ketemu.

Kekuatannya terletak pada kata **"membuang separuh"**. Setiap langkah memangkas sisa pencarian jadi setengahnya, sehingga kompleksitasnya **O(log n)**. Untuk merasakan bedanya:

- **1.000 data** → linear butuh sampai 1.000 langkah, binary cukup **10**
- **1.000.000 data** → linear butuh sampai 1.000.000 langkah, binary cukup **20**
- **1 miliar data** → binary cukup **30** langkah

Perbedaannya bukan dua atau tiga kali lipat, melainkan puluhan ribu kali.

Tapi ada harga yang harus dibayar: **datanya wajib terurut lebih dulu**, dan mengurutkan itu sendiri butuh sekitar O(n log n). Karena itu aturan praktisnya: kalau datanya **dicari berkali-kali**, urutkan sekali di awal lalu pakai binary search seterusnya. Kalau cuma dicari sekali pada data acak, linear search justru lebih hemat.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int linear(int arr[], int n, int cari) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == cari) return i;   // ketemu -> kembalikan POSISI\n    }\n    return -1;                          // tidak ketemu\n}',
      penjelasan: `
Yang dikembalikan adalah **indeks**, bukan nilainya — karena nilainya sudah kita ketahui (itu yang dicari). Yang belum diketahui justru **letaknya**.

Kenapa memakai \`-1\` sebagai penanda gagal? Karena indeks yang sah selalu dimulai dari 0, sehingga \`-1\` **mustahil** menjadi posisi yang benar. Ini membuatnya aman dipakai sebagai penanda khusus.

Bagian \`return i\` di dalam perulangan penting: ia **langsung menghentikan pencarian** begitu ketemu. Tanpa itu, program tetap memeriksa sisa data secara percuma.

Perhatikan juga bahwa \`return -1\` diletakkan **setelah** perulangan, bukan di dalamnya. Ini kesalahan yang sering terjadi: kalau \`return -1\` ditaruh di dalam \`else\`, pencarian akan berhenti di elemen pertama yang tidak cocok — padahal yang dicari mungkin ada di posisi berikutnya.
`
    },
    {
      bahasa: 'c',
      kode: 'int tengah = kiri + (kanan - kiri) / 2;\n// BUKAN: (kiri + kanan) / 2',
      penjelasan: `
Kedua rumus ini menghasilkan angka yang sama dalam pemakaian normal, tapi bentuk pertama **lebih aman**.

Masalahnya ada pada \`kiri + kanan\`. Bila keduanya sudah bernilai besar, penjumlahannya bisa **melampaui batas \`int\`** dan berputar menjadi negatif — inilah **integer overflow**. Akibatnya \`tengah\` menjadi negatif, dan program mengakses memori di luar array.

Bentuk \`kiri + (kanan - kiri) / 2\` menghindari itu karena \`kanan - kiri\` pasti lebih kecil dari \`kanan\`, sehingga tidak pernah meluap.

Bug ini bukan sekadar teori: **binary search di pustaka standar Java menyimpan kesalahan ini selama sekitar sembilan tahun** sebelum akhirnya ditemukan pada 2006. Ceritanya bagus untuk kamu bawa ke kelas, karena menunjukkan bahwa algoritma yang tampak sederhana pun bisa menyimpan bug halus — bahkan di tangan ahli.

Untuk ukuran data di praktikum, kedua rumus itu sama saja hasilnya. Tapi membiasakan bentuk yang benar sejak awal adalah kebiasaan yang layak ditanamkan.
`
    },
    {
      bahasa: 'c',
      kode: 'while (kiri <= kanan) {          // <= , bukan <\n    int tengah = kiri + (kanan - kiri) / 2;\n    if (arr[tengah] == cari) return tengah;\n    if (arr[tengah] < cari) kiri  = tengah + 1;   // buang separuh KIRI\n    else                    kanan = tengah - 1;   // buang separuh KANAN\n}',
      penjelasan: `
Ada tiga detail di sini yang masing-masing bisa merusak seluruh algoritma bila keliru.

**Pertama, syaratnya \`kiri <= kanan\`, bukan \`kiri < kanan\`.** Saat tersisa **satu elemen**, \`kiri\` dan \`kanan\` menunjuk posisi yang sama. Dengan tanda \`<\` saja, elemen terakhir itu tidak pernah diperiksa — sehingga pencarian gagal padahal datanya ada.

**Kedua, harus \`tengah + 1\` dan \`tengah - 1\`, bukan \`tengah\` saja.** Elemen tengah sudah diperiksa dan terbukti tidak cocok, jadi tidak perlu diikutkan lagi. Kalau ditulis \`kiri = tengah\`, rentangnya bisa berhenti menyusut dan program **berputar selamanya**.

**Ketiga, arah pembuangannya harus tepat.** Kalau nilai tengah **lebih kecil** dari yang dicari, berarti target pasti ada di sebelah kanan — sehingga batas kiri yang digeser maju. Membalik logika ini membuat pencarian selalu gagal meski datanya ada.

Ketiga hal inilah yang membuat binary search terkenal *"gampang dimengerti, susah ditulis benar"*. Karena itu selalu uji dengan tiga kasus: elemen **pertama**, elemen **terakhir**, dan nilai yang **tidak ada**.
`
    },
    {
      bahasa: 'c',
      kode: 'int data[] = {50, 10, 30};    // TIDAK terurut\nbinary(data, 3, 30);          // hasilnya tidak bisa dipercaya',
      penjelasan: `
**Binary search hanya sah dipakai pada data yang sudah terurut.** Ini bukan anjuran, melainkan syarat mutlak.

Alasannya jelas begitu kamu memahami cara kerjanya. Ketika binary search melihat elemen tengah lebih kecil dari target, ia **menyimpulkan** bahwa seluruh bagian kiri pasti lebih kecil juga — lalu membuangnya tanpa diperiksa. Kesimpulan itu **hanya benar bila datanya terurut**.

Pada data acak, kesimpulan tersebut salah, sehingga separuh data dibuang secara sembarangan. Akibatnya nilai yang jelas-jelas ada bisa dilaporkan tidak ditemukan.

Yang berbahaya, **programnya tidak error sama sekali**. Ia berjalan mulus dan mengembalikan jawaban yang salah. Kadang jawabannya bahkan kebetulan benar, sehingga bug-nya lolos dari pengujian sederhana.

Karena itu tanamkan ke mahasiswa: **urutkan dulu, baru cari.** Kalau ragu apakah datanya terurut, pakai linear search saja — lebih lambat, tapi selalu memberi jawaban yang benar.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Linq;

class Program {
    // LINEAR SEARCH: O(n), data boleh berantakan
    static int Linear(int[] arr, int cari) {
        for (int i = 0; i < arr.Length; i++)
            if (arr[i] == cari) return i;
        return -1;
    }

    // BINARY SEARCH: O(log n), data WAJIB terurut
    static int Binary(int[] arr, int cari) {
        int kiri = 0, kanan = arr.Length - 1;

        while (kiri <= kanan) {                        // <= , bukan <
            int tengah = kiri + (kanan - kiri) / 2;    // aman dari overflow

            if (arr[tengah] == cari) return tengah;
            if (arr[tengah] < cari) kiri = tengah + 1; // target di kanan
            else                    kanan = tengah - 1;// target di kiri
        }
        return -1;
    }

    static int BinaryTrace(int[] arr, int cari) {
        int kiri = 0, kanan = arr.Length - 1, langkah = 0;
        while (kiri <= kanan) {
            int tengah = kiri + (kanan - kiri) / 2;
            langkah++;
            Console.WriteLine($"  langkah {langkah}: cek indeks {tengah} " +
                              $"(nilai {arr[tengah]}), sisa {kanan - kiri + 1} elemen");
            if (arr[tengah] == cari) return tengah;
            if (arr[tengah] < cari) kiri = tengah + 1;
            else                    kanan = tengah - 1;
        }
        return -1;
    }

    static void Main() {
        int[] terurut = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };

        Console.WriteLine($"linear(70) : {Linear(terurut, 70)}");
        Console.WriteLine($"binary(70) : {Binary(terurut, 70)}");
        Console.WriteLine($"binary(99) : {Binary(terurut, 99)}  <- -1 berarti tidak ada");

        Console.WriteLine("\nTRACE mencari 70:");
        BinaryTrace(terurut, 70);

        // C# menyediakan binary search bawaan
        Console.WriteLine($"\nArray.BinarySearch : {Array.BinarySearch(terurut, 70)}");
        Console.WriteLine($"LINQ Contains      : {terurut.Contains(70)}  (O(n))");

        // Uji kasus batas — paling cepat membongkar kesalahan
        Console.WriteLine("\nUJI BATAS:");
        Console.WriteLine($"  elemen pertama : {Binary(terurut, 10)}");
        Console.WriteLine($"  elemen terakhir: {Binary(terurut, 100)}");

        // Membuktikan data acak merusak binary search
        int[] acak = { 50, 10, 80, 30, 70 };
        Console.WriteLine($"\ndata acak, binary(30) : {Binary(acak, 30)}  <- salah!");
        Array.Sort(acak);
        Console.WriteLine($"setelah Sort, binary(30) : {Binary(acak, 30)}");
    }
}`,

    java: String.raw`import java.util.Arrays;

public class Contoh {
    // LINEAR SEARCH: O(n)
    static int linear(int[] arr, int cari) {
        for (int i = 0; i < arr.length; i++)
            if (arr[i] == cari) return i;
        return -1;                                  // -1 = tidak ditemukan
    }

    // BINARY SEARCH: O(log n), data WAJIB terurut
    static int binary(int[] arr, int cari) {
        int kiri = 0, kanan = arr.length - 1;

        while (kiri <= kanan) {                     // <= supaya sisa 1 tetap dicek
            int tengah = kiri + (kanan - kiri) / 2; // aman dari overflow

            if (arr[tengah] == cari) return tengah;
            if (arr[tengah] < cari) kiri = tengah + 1;
            else                    kanan = tengah - 1;
        }
        return -1;
    }

    // Versi rekursif
    static int binaryRek(int[] arr, int kiri, int kanan, int cari) {
        if (kiri > kanan) return -1;                // base case: habis
        int tengah = kiri + (kanan - kiri) / 2;
        if (arr[tengah] == cari) return tengah;     // base case: ketemu
        if (arr[tengah] < cari) return binaryRek(arr, tengah + 1, kanan, cari);
        return binaryRek(arr, kiri, tengah - 1, cari);
    }

    static int binaryTrace(int[] arr, int cari) {
        int kiri = 0, kanan = arr.length - 1, langkah = 0;
        while (kiri <= kanan) {
            int tengah = kiri + (kanan - kiri) / 2;
            langkah++;
            System.out.printf("  langkah %d: cek indeks %d (nilai %d), sisa %d elemen%n",
                              langkah, tengah, arr[tengah], kanan - kiri + 1);
            if (arr[tengah] == cari) return tengah;
            if (arr[tengah] < cari) kiri = tengah + 1;
            else                    kanan = tengah - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] terurut = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };

        System.out.println("linear(70)    : " + linear(terurut, 70));
        System.out.println("binary(70)    : " + binary(terurut, 70));
        System.out.println("binaryRek(70) : " + binaryRek(terurut, 0, terurut.length - 1, 70));

        System.out.println("\nTRACE mencari 70:");
        binaryTrace(terurut, 70);

        // Java menyediakan binary search bawaan
        System.out.println("\nArrays.binarySearch : " + Arrays.binarySearch(terurut, 70));

        System.out.println("\nUJI BATAS:");
        System.out.println("  elemen pertama : " + binary(terurut, 10));
        System.out.println("  elemen terakhir: " + binary(terurut, 100));
        System.out.println("  tidak ada      : " + binary(terurut, 99));

        // Data acak merusak binary search
        int[] acak = { 50, 10, 80, 30, 70 };
        System.out.println("\ndata acak, binary(30)    : " + binary(acak, 30) + "  <- salah!");
        Arrays.sort(acak);
        System.out.println("setelah sort, binary(30) : " + binary(acak, 30));
    }
}`,

    js: String.raw`// LINEAR SEARCH: O(n)
function linear(arr, cari) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === cari) return i;
    }
    return -1;
}

// BINARY SEARCH: O(log n), data WAJIB terurut
function binary(arr, cari) {
    let kiri = 0, kanan = arr.length - 1;

    while (kiri <= kanan) {                        // <= , bukan <
        const tengah = Math.floor((kiri + kanan) / 2);   // WAJIB Math.floor

        if (arr[tengah] === cari) return tengah;
        if (arr[tengah] < cari) kiri = tengah + 1; // target di kanan
        else                    kanan = tengah - 1;// target di kiri
    }
    return -1;
}

function binaryTrace(arr, cari) {
    let kiri = 0, kanan = arr.length - 1, langkah = 0;
    while (kiri <= kanan) {
        const tengah = Math.floor((kiri + kanan) / 2);
        langkah++;
        console.log("  langkah " + langkah + ": cek indeks " + tengah +
                    " (nilai " + arr[tengah] + "), sisa " + (kanan - kiri + 1) + " elemen");
        if (arr[tengah] === cari) return tengah;
        if (arr[tengah] < cari) kiri = tengah + 1;
        else                    kanan = tengah - 1;
    }
    return -1;
}

const terurut = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log("linear(70) :", linear(terurut, 70));
console.log("binary(70) :", binary(terurut, 70));
console.log("binary(99) :", binary(terurut, 99), " <- -1 berarti tidak ada");

console.log("\nTRACE mencari 70:");
binaryTrace(terurut, 70);

// Method bawaan JavaScript — semuanya O(n), bukan binary search
console.log("\nindexOf(70)   :", terurut.indexOf(70), " (O(n))");
console.log("includes(70)  :", terurut.includes(70), " (O(n))");
console.log("findIndex     :", terurut.findIndex(function (x) { return x > 55; }));
console.log("-> JavaScript TIDAK punya binary search bawaan");

console.log("\nUJI BATAS:");
console.log("  elemen pertama :", binary(terurut, 10));
console.log("  elemen terakhir:", binary(terurut, 100));

// PENTING: Math.floor wajib, kalau tidak indeksnya jadi pecahan
console.log("\nkenapa Math.floor wajib:");
console.log("  (0 + 9) / 2             =", (0 + 9) / 2, " <- pecahan!");
console.log("  Math.floor((0 + 9) / 2) =", Math.floor((0 + 9) / 2));
console.log("  arr[4.5] ->", terurut[4.5], " <- undefined");

// Data acak merusak binary search
const acak = [50, 10, 80, 30, 70];
console.log("\ndata acak, binary(30)    :", binary(acak, 30), " <- salah!");
acak.sort(function (a, b) { return a - b; });      // WAJIB pembanding
console.log("setelah sort, binary(30) :", binary(acak, 30));`,

    c: String.raw`#include <stdio.h>

/* LINEAR SEARCH: O(n), data boleh berantakan */
int linear(int arr[], int n, int cari) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == cari) return i;      // langsung berhenti saat ketemu
    }
    return -1;                             // -1 = penanda tidak ditemukan
}

/* BINARY SEARCH iteratif: O(log n), data WAJIB terurut */
int binary(int arr[], int n, int cari) {
    int kiri = 0, kanan = n - 1;

    while (kiri <= kanan) {                       // <= supaya sisa 1 tetap dicek
        int tengah = kiri + (kanan - kiri) / 2;   // aman dari overflow

        if (arr[tengah] == cari) return tengah;

        if (arr[tengah] < cari)
            kiri = tengah + 1;                    // target di kanan
        else
            kanan = tengah - 1;                   // target di kiri
    }
    return -1;
}

/* Versi bertrace: memperlihatkan separuh data dibuang tiap langkah */
int binaryTrace(int arr[], int n, int cari) {
    int kiri = 0, kanan = n - 1, langkah = 0;

    while (kiri <= kanan) {
        int tengah = kiri + (kanan - kiri) / 2;
        langkah++;
        printf("  langkah %d: cek indeks %d (nilai %d), sisa %d elemen\n",
               langkah, tengah, arr[tengah], kanan - kiri + 1);

        if (arr[tengah] == cari) {
            printf("  ketemu dalam %d langkah\n", langkah);
            return tengah;
        }
        if (arr[tengah] < cari) kiri = tengah + 1;
        else                    kanan = tengah - 1;
    }
    printf("  tidak ditemukan setelah %d langkah\n", langkah);
    return -1;
}

int main(void) {
    int acak[]   = {50, 10, 80, 30, 70, 20, 90, 40, 60, 100};
    int terurut[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int n = 10;

    printf("LINEAR SEARCH (data acak)\n");
    printf("  posisi 70  : %d\n", linear(acak, n, 70));
    printf("  posisi 999 : %d  <- -1 berarti tidak ada\n\n", linear(acak, n, 999));

    printf("BINARY SEARCH (data terurut)\n");
    printf("  posisi 70  : %d\n", binary(terurut, n, 70));
    printf("  posisi 999 : %d\n\n", binary(terurut, n, 999));

    printf("TRACE mencari 70 dari 10 data:\n");
    binaryTrace(terurut, n, 70);

    printf("\nTRACE mencari 999 (tidak ada):\n");
    binaryTrace(terurut, n, 999);

    /* Uji kasus batas — inilah yang paling sering bikin bug */
    printf("\nUJI BATAS:\n");
    printf("  elemen pertama (10)  : %d\n", binary(terurut, n, 10));
    printf("  elemen terakhir (100): %d\n", binary(terurut, n, 100));

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int linear(const vector<int> &v, int cari) {
    for (int i = 0; i < (int)v.size(); i++)
        if (v[i] == cari) return i;
    return -1;
}

int binary(const vector<int> &v, int cari) {
    int kiri = 0, kanan = (int)v.size() - 1;
    while (kiri <= kanan) {
        int tengah = kiri + (kanan - kiri) / 2;
        if (v[tengah] == cari) return tengah;
        if (v[tengah] < cari) kiri = tengah + 1;
        else                  kanan = tengah - 1;
    }
    return -1;
}

/* Versi rekursif: rentangnya menyempit tiap pemanggilan */
int binaryRek(const vector<int> &v, int kiri, int kanan, int cari) {
    if (kiri > kanan) return -1;                  // base case: habis
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] == cari) return tengah;         // base case: ketemu
    if (v[tengah] < cari)
        return binaryRek(v, tengah + 1, kanan, cari);
    return binaryRek(v, kiri, tengah - 1, cari);
}

int main() {
    vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};

    cout << "linear    : " << linear(data, 70) << endl;
    cout << "binary    : " << binary(data, 70) << endl;
    cout << "binaryRek : " << binaryRek(data, 0, data.size() - 1, 70) << endl;

    // C++ menyediakan binary search bawaan
    bool ada = binary_search(data.begin(), data.end(), 70);
    cout << "\nbinary_search bawaan : " << (ada ? "ada" : "tidak ada") << endl;

    // lower_bound mengembalikan posisinya
    auto it = lower_bound(data.begin(), data.end(), 70);
    if (it != data.end() && *it == 70)
        cout << "posisi lewat lower_bound : " << (it - data.begin()) << endl;

    // Kalau datanya belum terurut, urutkan DULU
    vector<int> acak = {50, 10, 80, 30, 70};
    cout << "\nsebelum sort, binary(30) : " << binary(acak, 30)
         << "  <- tidak bisa dipercaya" << endl;
    sort(acak.begin(), acak.end());
    cout << "sesudah sort, binary(30) : " << binary(acak, 30) << endl;

    return 0;
}`,

    python: String.raw`import bisect

def linear(data, cari):
    """O(n) — data boleh berantakan."""
    for i, x in enumerate(data):
        if x == cari:
            return i
    return -1


def binary(data, cari):
    """O(log n) — data WAJIB terurut."""
    kiri, kanan = 0, len(data) - 1

    while kiri <= kanan:                    # <= supaya sisa 1 elemen tetap dicek
        tengah = (kiri + kanan) // 2        # int Python tak terbatas, jadi aman
        if data[tengah] == cari:
            return tengah
        if data[tengah] < cari:
            kiri = tengah + 1               # target di kanan
        else:
            kanan = tengah - 1              # target di kiri
    return -1


def binary_trace(data, cari):
    kiri, kanan, langkah = 0, len(data) - 1, 0
    while kiri <= kanan:
        tengah = (kiri + kanan) // 2
        langkah += 1
        print(f"  langkah {langkah}: cek indeks {tengah} "
              f"(nilai {data[tengah]}), sisa {kanan - kiri + 1} elemen")
        if data[tengah] == cari:
            print(f"  ketemu dalam {langkah} langkah")
            return tengah
        if data[tengah] < cari:
            kiri = tengah + 1
        else:
            kanan = tengah - 1
    print(f"  tidak ditemukan setelah {langkah} langkah")
    return -1


terurut = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

print("linear :", linear(terurut, 70))
print("binary :", binary(terurut, 70))

print("\nTRACE mencari 70:")
binary_trace(terurut, 70)

# Python punya operator dan modul bawaan
print("\n70 in list ?", 70 in terurut)          # linear, O(n)
print("index bawaan :", terurut.index(70))      # linear, O(n)

# bisect = binary search bawaan, O(log n)
pos = bisect.bisect_left(terurut, 70)
print("bisect_left  :", pos if pos < len(terurut) and terurut[pos] == 70 else -1)

# Membuktikan bahwa data acak merusak binary search
acak = [50, 10, 80, 30, 70]
print("\ndata acak :", acak)
print("binary(30) :", binary(acak, 30), " <- salah, padahal 30 jelas ada!")
acak.sort()
print("setelah sort :", acak)
print("binary(30) :", binary(acak, 30), " <- baru benar")

# Perbandingan jumlah langkah pada data besar
n = 1_000_000
import math
print(f"\nuntuk {n:,} data:")
print(f"  linear : sampai {n:,} langkah")
print(f"  binary : sekitar {math.ceil(math.log2(n))} langkah")`
  },

  output: `LINEAR SEARCH (data acak)
  posisi 70  : 4
  posisi 999 : -1  <- -1 berarti tidak ada

BINARY SEARCH (data terurut)
  posisi 70  : 6
  posisi 999 : -1

TRACE mencari 70 dari 10 data:
  langkah 1: cek indeks 4 (nilai 50), sisa 10 elemen
  langkah 2: cek indeks 7 (nilai 80), sisa 5 elemen
  langkah 3: cek indeks 5 (nilai 60), sisa 2 elemen
  langkah 4: cek indeks 6 (nilai 70), sisa 1 elemen
  ketemu dalam 4 langkah`,

  kompleksitas: {
    tabel: [
      { operasi: 'Linear search — terbaik', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Linear search — rata-rata', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Linear search — terburuk', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Binary search — terbaik', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Binary search — terburuk', waktu: 'O(log n)', memori: 'O(1)' },
      { operasi: 'Binary search rekursif', waktu: 'O(log n)', memori: 'O(log n)' },
      { operasi: 'Mengurutkan dulu, lalu cari', waktu: 'O(n log n)', memori: 'O(1)–O(n)' }
    ],
    intuisi: `
**Kenapa binary search bisa O(log n)?** Karena tiap langkah **membuang separuh data**. Pertanyaannya berubah menjadi: *"berapa kali angka n harus dibagi dua sampai tersisa satu?"* — dan jawaban dari pertanyaan itulah yang disebut **logaritma basis 2**.

Angkanya jauh lebih mengesankan daripada yang dibayangkan: 1.000 data cukup **10** langkah, sejuta data cukup **20**, dan **satu miliar data cukup 30 langkah**. Menambah data sepuluh kali lipat hanya menambah sekitar 3 langkah. Inilah kenapa O(log n) dianggap nyaris secepat O(1) dalam praktik.

**Kenapa linear search kadang tetap lebih baik?** Karena tidak menuntut apa pun. Kalau datanya acak dan hanya dicari **sekali**, mengurutkannya dulu justru memakan O(n log n) — lebih mahal daripada sekadar memeriksa satu per satu dengan O(n). Untuk data kecil di bawah sekitar 50 elemen, bedanya juga tidak terasa sama sekali.

**Kapan mengurutkan itu sepadan?** Ketika data yang sama **dicari berkali-kali**. Biaya pengurutan dibayar sekali di awal, lalu setiap pencarian berikutnya jadi sangat murah. Kalau ada 1000 pencarian pada sejuta data: linear butuh sekitar satu miliar langkah, sedangkan sort + binary cukup sekitar 20 juta — sekitar **50 kali lebih cepat**.

**Soal memori:** versi iteratif hanya memakai beberapa variabel sehingga O(1). Versi rekursif memakai O(log n) karena tiap pemanggilan menempati call stack — tapi kedalamannya cuma sekitar 20 untuk sejuta data, jadi tetap sangat aman.
`
  },

  kesalahanUmum: [
    {
      salah: 'Memakai binary search pada data yang belum terurut.',
      kenapa: 'Binary search menyimpulkan letak target dari nilai tengahnya, dan kesimpulan itu hanya sah bila data terurut. Pada data acak, separuh data dibuang secara sembarangan sehingga nilai yang jelas ada bisa dilaporkan tidak ditemukan. **Programnya tidak error**, hanya jawabannya yang salah.',
      benar: 'Urutkan dulu dengan `sort` sebelum mencari. Kalau tidak yakin datanya terurut, pakai linear search saja — lebih lambat tapi selalu benar.'
    },
    {
      salah: 'Memakai `while (kiri < kanan)` alih-alih `<=`',
      kenapa: 'Saat tersisa satu elemen, `kiri` dan `kanan` menunjuk posisi yang sama sehingga kondisi `<` gagal. Elemen terakhir itu tidak pernah diperiksa, dan pencarian gagal padahal datanya ada. Bug ini sering lolos karena hanya muncul pada kasus tertentu.',
      benar: 'Gunakan `while (kiri <= kanan)`. Selalu uji dengan mencari **elemen pertama** dan **elemen terakhir** — dua kasus inilah yang paling cepat membongkar kesalahan batas.'
    },
    {
      salah: 'Menulis `kiri = tengah;` alih-alih `kiri = tengah + 1;`',
      kenapa: 'Elemen tengah sudah diperiksa dan tidak cocok, tapi tetap diikutkan lagi ke rentang berikutnya. Saat tersisa dua elemen, rentangnya berhenti menyusut sehingga program **berputar selamanya** tanpa pesan error apa pun.',
      benar: 'Tulis `kiri = tengah + 1;` dan `kanan = tengah - 1;`. Pastikan tiap putaran benar-benar **memperkecil** rentangnya.'
    },
    {
      salah: 'Menaruh `return -1` di dalam perulangan linear search.',
      kenapa: 'Kalau `return -1` diletakkan di dalam `else`, pencarian berhenti begitu bertemu elemen pertama yang tidak cocok. Padahal nilai yang dicari mungkin ada di posisi berikutnya — sehingga fungsinya hampir selalu melaporkan tidak ditemukan.',
      benar: 'Letakkan `return -1` **setelah** perulangan selesai. Artinya jelas: seluruh data sudah diperiksa dan tidak ada yang cocok.'
    },
    {
      salah: 'Mengembalikan `0` sebagai penanda tidak ditemukan.',
      kenapa: 'Angka `0` adalah **indeks yang sah**, yaitu elemen pertama. Pemanggil jadi tidak bisa membedakan antara "ditemukan di posisi 0" dan "tidak ditemukan sama sekali".',
      benar: 'Gunakan `-1` yang mustahil menjadi indeks sah. Di Python, alternatif lain adalah mengembalikan `None` yang lebih tegas maksudnya.'
    }
  ],

  analogi: `
Analogi terbaik adalah **mencari nama di buku telepon** — dan analogi ini bekerja karena mahasiswa langsung mengenali perilakunya sendiri.

**Linear search** ibarat membuka buku telepon dari halaman pertama dan membaca **setiap nama berurutan** sampai ketemu. Tanya ke kelas: *"ada yang mencari nomor telepon dengan cara begini?"* Semua akan tertawa — dan justru di situ letak pelajarannya.

**Binary search** adalah cara yang sebenarnya kamu pakai: buka di **tengah**, lihat namanya. Kalau yang kamu cari lebih awal secara abjad, **seluruh separuh belakang langsung diabaikan**. Ulangi terus. Tekankan bahwa **manusia sudah melakukan binary search secara alami** tanpa pernah menamainya.

Analogi ini juga menjelaskan syaratnya dengan sendirinya. Tanya: *"kalau buku teleponnya tidak urut abjad, cara tadi masih bisa dipakai?"* Jelas tidak — dan mahasiswa memahami syarat "harus terurut" tanpa perlu dihafalkan.

Untuk merasakan **kekuatan O(log n)**, mainkan **tebak angka 1–1000**. Kamu memikirkan sebuah angka, mahasiswa menebak, dan kamu cuma menjawab "lebih besar" atau "lebih kecil". Mereka akan terkejut karena angkanya selalu ketemu dalam **10 tebakan atau kurang**. Setelah itu tunjukkan bahwa 2¹⁰ = 1024 — dan angka 10 tadi jadi masuk akal.

Untuk menegaskan kembali: jumlah data sejuta hanya butuh **20 tebakan**, dan satu miliar cukup **30**. Perbandingan ini biasanya menjadi momen yang paling diingat mahasiswa dari seluruh materi kompleksitas.
`,

  latihan: [
    'Implementasikan linear search dan binary search, lalu cari nilai yang sama pada 10 data terurut. Tambahkan pencacah langkah pada masing-masing, dan bandingkan hasilnya.',
    'Uji binary search-mu dengan tiga kasus batas: elemen **pertama**, elemen **terakhir**, dan nilai yang **tidak ada**. Kalau salah satunya gagal, periksa tanda `<=` dan `tengah ± 1`.',
    'Ubah binary search agar mengembalikan **jumlah langkah** yang diperlukan, bukan posisinya. Jalankan pada data berukuran 10, 100, dan 1000 — lalu cocokkan hasilnya dengan log₂n.',
    'Sengaja jalankan binary search pada data yang **tidak terurut**, cari nilai yang jelas-jelas ada di dalamnya. Catat hasilnya dan jelaskan kenapa bisa salah padahal tidak ada error.',
    'Ubah linear search agar menampilkan **semua posisi** bila nilai yang dicari muncul lebih dari sekali. Kenapa binary search biasa tidak cocok untuk tugas ini?',
    'Buat versi rekursif dari binary search, lalu bandingkan dengan versi iteratifnya. Mana yang lebih hemat memori, dan kenapa?',
    'Uji pemahaman: mainkan permainan tebak angka 1–100 untuk dirimu sendiri, lalu pakai itu sebagai jembatan menjelaskan O(log n). Targetnya, kamu bisa menyimpulkan sendiri kenapa jawabannya selalu ketemu dalam 7 tebakan.'
  ]
});

TOPICS.push({
  id: 'sorting',
  judul: 'Sorting (Bubble, Selection, Insertion)',
  kategori: 'algoritma',
  tag: ['sorting', 'bubble sort', 'selection sort', 'insertion sort', 'pengurutan'],
  ringkas: 'Tiga algoritma pengurutan dasar — cara kerjanya, bedanya, dan kapan masing-masing lebih unggul.',

  fungsi: `**Mengurutkan data — prasyarat bagi pencarian cepat, pengelompokan, dan penyajian yang masuk akal.**

Terpakai di:

- **Menyiapkan pencarian biner** — tanpa urut, pencarian biner tidak bisa dipakai sama sekali
- **Menampilkan peringkat** — nilai tertinggi, produk terlaris, hasil SPK
- **Klausa ORDER BY** di basis data
- **Mendeteksi duplikat** — setelah terurut, duplikat pasti bersebelahan
- **Data Mining** — Apriori mengurutkan item berdasarkan frekuensi

Yang perlu jujur diakui: **di kerja nyata kamu hampir tidak akan pernah menulis algoritma pengurutan sendiri**. Setiap bahasa sudah punya yang jauh lebih cepat dan sudah teruji.

Yang dipelajari di sini bukan cara mengurutkan, melainkan **cara membandingkan algoritma** — dan itu keterampilan yang terpakai seumur hidup.`,

  praktik: {
    tujuan: `Kamu bisa menulis ketiga algoritma pengurutan dasar, mengukur perbedaannya sendiri, dan tahu kapan memakai pustaka bawaan.`,
    alat: [
      'Python 3 atau C++',
      'Modul `time` dan `random`'
    ],
    langkah: [
      { judul: 'Tulis ketiganya, satu per satu',
        isi: `Kerjakan berurutan dan pahami satu sebelum lanjut:

- **Bubble Sort** — tukar tetangga yang salah urutan, ulangi
- **Selection Sort** — cari yang terkecil, taruh di depan, ulangi
- **Insertion Sort** — sisipkan tiap elemen ke tempatnya di bagian yang sudah terurut

Ketiganya berkompleksitas kuadratik, tetapi perilakunya berbeda dan itu yang menarik.` },
      { judul: 'Tambahkan penghitung operasi',
        isi: `Hitung berapa kali **membandingkan** dan berapa kali **menukar**.

Angka ini jauh lebih informatif daripada waktu, karena tidak bergantung pada kecepatan komputer — dan bisa langsung kamu bandingkan dengan rumus teorinya.` },
      { judul: 'Uji pada tiga jenis data',
        isi: `Jalankan ketiganya pada:

- data **acak**
- data yang **sudah terurut**
- data yang **terbalik**

Kamu akan menemukan sesuatu: Insertion Sort **sangat cepat** pada data yang hampir terurut, sementara Selection Sort selalu sama saja. Itulah yang tidak terlihat dari notasi Big-O.` },
      { judul: 'Tambahkan penghentian dini pada Bubble Sort',
        isi: `Kalau dalam satu putaran penuh **tidak ada satu pun pertukaran**, berarti datanya sudah terurut dan bisa langsung berhenti.

Ukur lagi pada data yang sudah terurut. Waktunya turun drastis, dan itu contoh nyata bahwa **kasus terbaik dan terburuk bisa jauh berbeda** untuk algoritma yang sama.` },
      { judul: 'Bandingkan dengan pengurutan bawaan',
        isi: `Jalankan \`sorted()\` di Python atau \`std::sort\` di C++ pada data yang sama.

Selisihnya akan sangat besar. Pustaka bawaan memakai algoritma hibrida yang sudah dioptimalkan bertahun-tahun.

**Ini alasan kenapa di kerja nyata kamu memakainya**, bukan menulis sendiri.` },
      { judul: 'Pelajari cara mengurutkan menurut kunci',
        isi: `Yang benar-benar terpakai sehari-hari adalah mengurutkan objek menurut salah satu anggotanya:

- Python: \`sorted(mahasiswa, key=lambda m: m.ipk, reverse=True)\`
- C++: \`sort(v.begin(), v.end(), [](auto &a, auto &b){ return a.ipk > b.ipk; })\`

Latih juga pengurutan bertingkat: menurut IPK menurun, lalu menurut nama menaik untuk yang sama.` }
    ],
    cek: [
      'Ketiga algoritmamu menghasilkan urutan yang identik dengan pengurutan bawaan',
      `Insertion Sort terbukti jauh lebih cepat pada data yang sudah terurut daripada pada data acak`,
      'Bubble Sort dengan penghentian dini berhenti setelah satu putaran pada data terurut'
    ]
  },

  konsep: `
**Sorting** adalah menyusun data menurut urutan tertentu, biasanya dari kecil ke besar. Ini salah satu operasi paling mendasar di komputasi, dan pengurutan sering menjadi **prasyarat** bagi hal lain — binary search, misalnya, mustahil tanpa data terurut.

Di mata kuliah ini kamu akan bertemu tiga algoritma dasar. Ketiganya punya kompleksitas terburuk yang sama, **O(n²)**, tapi cara kerja dan keunggulannya berbeda:

- **Bubble sort** — membandingkan **dua elemen bertetangga** lalu menukarnya bila urutannya terbalik. Setiap putaran membuat satu elemen terbesar "menggelembung" ke ujung kanan. Paling mudah dipahami, tapi paling boros.
- **Selection sort** — mencari **elemen terkecil** dari bagian yang belum terurut, lalu menukarnya ke posisi paling depan. Jumlah penukarannya paling sedikit di antara ketiganya.
- **Insertion sort** — mengambil satu elemen lalu **menyisipkannya ke posisi yang tepat** di bagian yang sudah terurut, persis seperti menyusun kartu di tangan. Paling cepat bila data sudah hampir terurut.

Semuanya berbagi satu pola yang sama: **perulangan bersarang**. Perulangan luar menentukan sudah berapa bagian yang beres, perulangan dalam mengerjakan perbandingan. Dari pola bersarang inilah muncul O(n²) — dan memahami hal itu jauh lebih penting daripada menghafal kodenya.

Perlu kamu tahu juga bahwa ketiganya **tidak dipakai di dunia nyata** untuk data besar. Pustaka standar memakai algoritma O(n log n) seperti quicksort, mergesort, atau gabungan keduanya. Lalu kenapa tetap diajarkan? Karena ketiganya adalah **latihan berpikir algoritmik yang paling jernih**: cukup sederhana untuk ditelusuri manual di papan tulis, tapi cukup kaya untuk mengajarkan analisis kompleksitas, kasus terbaik dan terburuk, serta konsep stabilitas.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'for (int i = 0; i < n - 1; i++) {          // berapa putaran\n    for (int j = 0; j < n - 1 - i; j++) {  // -i : yang beres dilewati\n        if (arr[j] > arr[j + 1]) {\n            tukar(&arr[j], &arr[j + 1]);\n        }\n    }\n}',
      penjelasan: `
Ini kerangka **bubble sort**, dan bagian paling penting justru terletak pada dua angka pengurangnya.

**Kenapa perulangan luar sampai \`n - 1\`, bukan \`n\`?** Karena setiap putaran memastikan **satu elemen** menempati posisi akhirnya. Setelah \`n - 1\` elemen beres, elemen terakhir otomatis sudah benar — tidak ada lagi yang bisa ditukar dengannya.

**Kenapa perulangan dalam memakai \`n - 1 - i\`?** Inilah yang sering terlewat. Setelah putaran ke-\`i\`, sebanyak \`i\` elemen terbesar sudah berada di ujung kanan pada posisi finalnya. Memeriksanya lagi cuma membuang waktu. Bagian \`- i\` membuat wilayah pemeriksaan **menyusut** tiap putaran.

**Kenapa \`- 1\` di perulangan dalam?** Karena di dalamnya kita mengakses \`arr[j + 1]\`. Tanpa pengurangan itu, saat \`j\` mencapai nilai terakhir, \`arr[j + 1]\` sudah berada **di luar array**.

Menghilangkan \`- i\` tidak membuat hasilnya salah — hanya membuatnya boros. Tapi menghilangkan \`- 1\` **menyebabkan akses di luar batas array**, dan itu bug yang serius.
`
    },
    {
      bahasa: 'c',
      kode: 'int simpan = a;\na = b;\nb = simpan;      // WAJIB tiga langkah, tidak bisa dua',
      penjelasan: `
Menukar isi dua variabel **selalu butuh variabel ketiga**, dan alasannya wajib dipahami sebelum belajar sorting.

Kalau langsung ditulis \`a = b; b = a;\`, maka pada baris pertama nilai lama \`a\` **sudah tertimpa dan hilang**. Baris kedua lalu menyalin \`b\` ke dirinya sendiri, sehingga hasil akhirnya kedua variabel bernilai sama — datanya hilang satu.

Karena itu urutannya harus: **simpan dulu, baru timpa, lalu kembalikan.**

Analogi yang gampang diingat: menukar isi dua gelas yang penuh membutuhkan **gelas ketiga** yang kosong. Tidak ada cara lain.

Bahasa modern menyediakan jalan pintas: di C++ ada \`swap(a, b)\`, dan di Python cukup \`a, b = b, a\` karena sisi kanan dihitung lebih dulu menjadi pasangan sementara. Tapi tetap ajarkan versi tiga langkahnya — hampir semua soal ujian meminta bentuk manual ini.
`
    },
    {
      bahasa: 'c',
      kode: 'int adaTukar;\nfor (int i = 0; i < n - 1; i++) {\n    adaTukar = 0;\n    for (int j = 0; j < n - 1 - i; j++) {\n        if (arr[j] > arr[j+1]) { tukar(...); adaTukar = 1; }\n    }\n    if (!adaTukar) break;      // sudah terurut, berhenti lebih awal\n}',
      penjelasan: `
Penambahan penanda ini mengubah **kasus terbaik** bubble sort dari O(n²) menjadi **O(n)**.

Logikanya sederhana: kalau dalam satu putaran penuh **tidak ada satu pun penukaran**, berarti seluruh data sudah berada pada urutan yang benar. Melanjutkan putaran berikutnya cuma membuang waktu.

Pada data yang sudah terurut, perulangan luar cuma berjalan **sekali** — memeriksa \`n-1\` pasangan, tidak menemukan pertukaran, lalu langsung berhenti. Itulah O(n).

Yang perlu dicatat: **ini hanya memperbaiki kasus terbaik.** Pada data acak maupun data terbalik, tetap saja O(n²). Jadi bubble sort tidak menjadi algoritma yang bagus — ia cuma jadi lebih pintar mengenali pekerjaan yang sudah selesai.

Poin penting untuk kamu ajarkan: **selection sort tidak bisa dipercepat seperti ini.** Ia harus tetap memeriksa seluruh sisa data untuk memastikan mana yang terkecil, sehingga selamanya O(n²) — bahkan pada data yang sudah rapi.
`
    },
    {
      bahasa: 'c',
      kode: 'for (int i = 1; i < n; i++) {\n    int kunci = arr[i];\n    int j = i - 1;\n    while (j >= 0 && arr[j] > kunci) {   // urutan syarat penting!\n        arr[j + 1] = arr[j];             // geser ke kanan\n        j--;\n    }\n    arr[j + 1] = kunci;                  // sisipkan di tempatnya\n}',
      penjelasan: `
Ini **insertion sort**, dan ada tiga hal yang perlu dibedah.

**Kenapa mulai dari \`i = 1\`, bukan 0?** Karena satu elemen tunggal sudah pasti terurut. Bagian kiri dianggap "sudah rapi", lalu tiap elemen berikutnya disisipkan ke dalamnya.

**Kenapa \`j >= 0\` harus ditulis lebih dulu, sebelum \`arr[j] > kunci\`?** Inilah penerapan langsung dari *short-circuit*. Saat \`j\` menjadi \`-1\`, syarat pertama sudah salah sehingga \`arr[j]\` **tidak pernah dievaluasi**. Kalau urutannya dibalik menjadi \`arr[j] > kunci && j >= 0\`, program akan membaca \`arr[-1]\` — di luar array. Urutan penulisan kondisi di sini bukan selera, melainkan pengaman.

**Kenapa yang dilakukan menggeser, bukan menukar?** Karena menggeser lebih murah. Menukar butuh tiga penugasan, sedangkan menggeser cuma satu. Nilai \`kunci\` sudah disimpan di awal, jadi menimpanya aman — dan baru dikembalikan sekali di akhir.

Sifat inilah yang membuat insertion sort **sangat cepat pada data yang hampir terurut**: perulangan \`while\` langsung berhenti di perbandingan pertama, sehingga totalnya mendekati O(n).
`
    },
    {
      bahasa: 'c',
      kode: '// Selection sort: cari yang terkecil, baru tukar SEKALI\nfor (int i = 0; i < n - 1; i++) {\n    int idxMin = i;\n    for (int j = i + 1; j < n; j++)\n        if (arr[j] < arr[idxMin]) idxMin = j;   // catat POSISInya\n    if (idxMin != i) tukar(&arr[i], &arr[idxMin]);\n}',
      penjelasan: `
Perhatikan bahwa yang dicatat adalah **posisi** elemen terkecil (\`idxMin\`), bukan nilainya. Ini penting, karena untuk menukar nanti kita butuh tahu **di mana** elemen itu berada.

Inilah keunggulan khas selection sort: **penukaran hanya terjadi sekali per putaran**, yaitu setelah seluruh sisa data diperiksa. Total penukarannya paling banyak \`n-1\` kali — jauh lebih sedikit daripada bubble sort yang bisa menukar hingga O(n²) kali.

Sifat ini punya nilai praktis: kalau **memindahkan datanya mahal** — misalnya tiap elemen berupa struct besar — selection sort bisa lebih hemat meski jumlah perbandingannya sama.

Bagian \`if (idxMin != i)\` sekadar menghindari penukaran yang sia-sia ketika elemen terkecil memang sudah berada di tempatnya.

Tapi ada kelemahan yang tidak bisa diperbaiki: **jumlah perbandingannya selalu tetap**, berapa pun keadaan datanya. Bahkan pada data yang sudah terurut sempurna, seluruh sisa data tetap harus diperiksa untuk memastikan mana yang terkecil. Karena itu selection sort **selalu O(n²)** — tidak punya kasus terbaik yang lebih cepat.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Linq;

class Program {
    static void Tukar(ref int a, ref int b) {
        int simpan = a; a = b; b = simpan;
    }

    // 1. BUBBLE SORT
    static void BubbleSort(int[] a) {
        int n = a.Length;
        for (int i = 0; i < n - 1; i++) {
            bool adaTukar = false;
            for (int j = 0; j < n - 1 - i; j++) {       // -i melewati yang beres
                if (a[j] > a[j + 1]) {
                    Tukar(ref a[j], ref a[j + 1]);
                    adaTukar = true;
                }
            }
            if (!adaTukar) break;                        // sudah rapi -> O(n)
        }
    }

    // 2. SELECTION SORT
    static void SelectionSort(int[] a) {
        for (int i = 0; i < a.Length - 1; i++) {
            int idxMin = i;
            for (int j = i + 1; j < a.Length; j++)
                if (a[j] < a[idxMin]) idxMin = j;        // catat POSISInya
            if (idxMin != i) Tukar(ref a[i], ref a[idxMin]);
        }
    }

    // 3. INSERTION SORT
    static void InsertionSort(int[] a) {
        for (int i = 1; i < a.Length; i++) {             // mulai dari 1
            int kunci = a[i], j = i - 1;
            while (j >= 0 && a[j] > kunci) {             // j >= 0 WAJIB di depan
                a[j + 1] = a[j];                         // geser kanan
                j--;
            }
            a[j + 1] = kunci;
        }
    }

    static void Cetak(string label, int[] a) {
        Console.WriteLine($"{label,-18}: {string.Join(" ", a)}");
    }

    static void Main() {
        int[] asli = { 64, 25, 12, 22, 11 };
        Cetak("data asli", asli);
        Console.WriteLine();

        int[] a = (int[])asli.Clone(); BubbleSort(a);    Cetak("bubble sort", a);
        int[] b = (int[])asli.Clone(); SelectionSort(b); Cetak("selection sort", b);
        int[] c = (int[])asli.Clone(); InsertionSort(c); Cetak("insertion sort", c);

        // Di dunia nyata cukup pakai bawaan: O(n log n)
        int[] d = (int[])asli.Clone(); Array.Sort(d);    Cetak("Array.Sort", d);

        // Menurun
        int[] e = (int[])asli.Clone();
        Array.Sort(e); Array.Reverse(e);
        Cetak("menurun", e);

        // LINQ: tidak mengubah aslinya
        Cetak("OrderBy (LINQ)", asli.OrderBy(x => x).ToArray());
        Cetak("asli tetap", asli);

        // Mengurutkan berdasarkan aturan sendiri
        string[] nama = { "Citra", "Budi", "Ani" };
        Array.Sort(nama, (x, y) => x.Length - y.Length);   // menurut panjang
        Console.WriteLine($"\nurut panjang nama : {string.Join(", ", nama)}");
    }
}`,

    java: String.raw`import java.util.Arrays;
import java.util.Comparator;

public class Contoh {
    static void tukar(int[] a, int i, int j) {
        int simpan = a[i]; a[i] = a[j]; a[j] = simpan;
    }

    // 1. BUBBLE SORT
    static void bubbleSort(int[] a) {
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            boolean adaTukar = false;
            for (int j = 0; j < n - 1 - i; j++) {        // -i melewati yang beres
                if (a[j] > a[j + 1]) { tukar(a, j, j + 1); adaTukar = true; }
            }
            if (!adaTukar) break;                         // sudah rapi -> O(n)
        }
    }

    // 2. SELECTION SORT
    static void selectionSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int idxMin = i;
            for (int j = i + 1; j < a.length; j++)
                if (a[j] < a[idxMin]) idxMin = j;         // catat POSISInya
            if (idxMin != i) tukar(a, i, idxMin);
        }
    }

    // 3. INSERTION SORT
    static void insertionSort(int[] a) {
        for (int i = 1; i < a.length; i++) {              // mulai dari 1
            int kunci = a[i], j = i - 1;
            while (j >= 0 && a[j] > kunci) {              // j >= 0 WAJIB di depan
                a[j + 1] = a[j];                          // geser kanan
                j--;
            }
            a[j + 1] = kunci;
        }
    }

    static void cetak(String label, int[] a) {
        System.out.printf("%-18s: %s%n", label, Arrays.toString(a));
    }

    public static void main(String[] args) {
        int[] asli = { 64, 25, 12, 22, 11 };
        cetak("data asli", asli);
        System.out.println();

        int[] a = asli.clone(); bubbleSort(a);    cetak("bubble sort", a);
        int[] b = asli.clone(); selectionSort(b); cetak("selection sort", b);
        int[] c = asli.clone(); insertionSort(c); cetak("insertion sort", c);

        // Di dunia nyata: Arrays.sort() — O(n log n)
        int[] d = asli.clone(); Arrays.sort(d);   cetak("Arrays.sort", d);

        // Menurun: harus memakai Integer, bukan int
        Integer[] e = { 64, 25, 12, 22, 11 };
        Arrays.sort(e, Comparator.reverseOrder());
        System.out.printf("%-18s: %s%n", "menurun", Arrays.toString(e));

        // Mengurutkan berdasarkan aturan sendiri
        String[] nama = { "Citra", "Budi", "Ani" };
        Arrays.sort(nama, Comparator.comparingInt(String::length));
        System.out.printf("%-18s: %s%n", "urut panjang nama", Arrays.toString(nama));

        // JEBAKAN: clone() pada array 2D hanya menyalin satu tingkat
        System.out.println("\nCatatan: arr.clone() pada array 2D hanya");
        System.out.println("menyalin barisnya, bukan isinya (salinan dangkal).");
    }
}`,

    js: String.raw`function tukar(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];        // destructuring, khas JavaScript
}

// 1. BUBBLE SORT
function bubbleSort(a) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        let adaTukar = false;
        for (let j = 0; j < n - 1 - i; j++) {       // -i melewati yang beres
            if (a[j] > a[j + 1]) { tukar(a, j, j + 1); adaTukar = true; }
        }
        if (!adaTukar) break;                        // sudah rapi -> O(n)
    }
    return a;
}

// 2. SELECTION SORT
function selectionSort(a) {
    for (let i = 0; i < a.length - 1; i++) {
        let idxMin = i;
        for (let j = i + 1; j < a.length; j++)
            if (a[j] < a[idxMin]) idxMin = j;        // catat POSISInya
        if (idxMin !== i) tukar(a, i, idxMin);
    }
    return a;
}

// 3. INSERTION SORT
function insertionSort(a) {
    for (let i = 1; i < a.length; i++) {             // mulai dari 1
        const kunci = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > kunci) {             // j >= 0 WAJIB di depan
            a[j + 1] = a[j];                         // geser kanan
            j--;
        }
        a[j + 1] = kunci;
    }
    return a;
}

const asli = [64, 25, 12, 22, 11];
console.log("data asli      :", asli.join(" "));
console.log();
console.log("bubble sort    :", bubbleSort([...asli]).join(" "));
console.log("selection sort :", selectionSort([...asli]).join(" "));
console.log("insertion sort :", insertionSort([...asli]).join(" "));

// ---------- JEBAKAN BESAR: sort() BAWAAN ----------
console.log("\nsort() polos   :", [...asli].sort().join(" "));
console.log("-> BUKAN salah ketik. sort() bawaan mengurutkan sebagai TEKS,");
console.log("   sehingga '12' dianggap lebih kecil dari '9'.");

const uji = [10, 9, 100, 2];
console.log("\ncontoh nyata:");
console.log("  [10,9,100,2].sort()        =", [...uji].sort().join(" "));
console.log("  dengan pembanding (a-b)    =",
            [...uji].sort(function (a, b) { return a - b; }).join(" "));
console.log("-> SELALU beri fungsi pembanding untuk angka");

// Menurun
console.log("\nmenurun :", [...asli].sort(function (a, b) { return b - a; }).join(" "));

// sort() MENGUBAH array aslinya
const x = [3, 1, 2];
x.sort(function (a, b) { return a - b; });
console.log("\nsort() mengubah aslinya :", x);
console.log("-> pakai [...arr].sort() kalau tidak ingin asli berubah");
console.log("   atau arr.toSorted() di JavaScript versi baru");

// Mengurutkan object
const kelas = [
    { nama: "Citra", ipk: 2.95 },
    { nama: "Budi",  ipk: 3.75 }
];
kelas.sort(function (a, b) { return b.ipk - a.ipk; });
console.log("\nurut IPK :", kelas.map(function (m) { return m.nama; }).join(", "));`,

    c: String.raw`#include <stdio.h>

void tukar(int *a, int *b) {
    int simpan = *a;        // WAJIB variabel ketiga
    *a = *b;
    *b = simpan;
}

void cetak(const int a[], int n, const char *label) {
    printf("%-18s: ", label);
    for (int i = 0; i < n; i++) printf("%3d", a[i]);
    printf("\n");
}

/* 1. BUBBLE SORT — tukar tetangga, yang besar menggelembung ke kanan */
void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int adaTukar = 0;
        for (int j = 0; j < n - 1 - i; j++) {     // -i melewati yang sudah beres
            if (a[j] > a[j + 1]) {
                tukar(&a[j], &a[j + 1]);
                adaTukar = 1;
            }
        }
        if (!adaTukar) break;                     // sudah rapi -> berhenti, O(n)
    }
}

/* 2. SELECTION SORT — cari terkecil, tukar sekali per putaran */
void selectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int idxMin = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[idxMin]) idxMin = j;     // catat posisinya
        }
        if (idxMin != i) tukar(&a[i], &a[idxMin]);
    }
}

/* 3. INSERTION SORT — sisipkan ke bagian yang sudah terurut */
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {                 // mulai dari 1
        int kunci = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > kunci) {          // j >= 0 WAJIB di depan
            a[j + 1] = a[j];                      // geser kanan
            j--;
        }
        a[j + 1] = kunci;                         // taruh di tempatnya
    }
}

/* Versi bertrace: memperlihatkan keadaan array tiap putaran */
void bubbleTrace(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int adaTukar = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) { tukar(&a[j], &a[j + 1]); adaTukar = 1; }
        }
        printf("  putaran %d : ", i + 1);
        for (int k = 0; k < n; k++) printf("%3d", a[k]);
        printf("   (%d terbesar sudah di kanan)\n", i + 1);
        if (!adaTukar) { printf("  tidak ada tukar -> berhenti\n"); break; }
    }
}

int main(void) {
    int asli[] = {64, 25, 12, 22, 11};
    int n = 5;
    int a[5], b[5], c[5];

    for (int i = 0; i < n; i++) { a[i] = b[i] = c[i] = asli[i]; }

    cetak(asli, n, "data asli");
    printf("\n");

    bubbleSort(a, n);      cetak(a, n, "bubble sort");
    selectionSort(b, n);   cetak(b, n, "selection sort");
    insertionSort(c, n);   cetak(c, n, "insertion sort");

    printf("\n--- TRACE BUBBLE SORT ---\n");
    int t[] = {64, 25, 12, 22, 11};
    bubbleTrace(t, n);

    printf("\n--- DATA SUDAH TERURUT ---\n");
    int rapi[] = {11, 12, 22, 25, 64};
    bubbleTrace(rapi, n);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void cetak(const vector<int> &v, const string &label) {
    cout.width(18); cout << left << label << ": ";
    for (int x : v) cout << x << " ";
    cout << endl;
}

void bubbleSort(vector<int> &v) {
    int n = v.size();
    for (int i = 0; i < n - 1; i++) {
        bool adaTukar = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (v[j] > v[j + 1]) { swap(v[j], v[j + 1]); adaTukar = true; }
        }
        if (!adaTukar) break;
    }
}

void selectionSort(vector<int> &v) {
    int n = v.size();
    for (int i = 0; i < n - 1; i++) {
        int idxMin = i;
        for (int j = i + 1; j < n; j++)
            if (v[j] < v[idxMin]) idxMin = j;
        if (idxMin != i) swap(v[i], v[idxMin]);
    }
}

void insertionSort(vector<int> &v) {
    for (int i = 1; i < (int)v.size(); i++) {
        int kunci = v[i], j = i - 1;
        while (j >= 0 && v[j] > kunci) {
            v[j + 1] = v[j];
            j--;
        }
        v[j + 1] = kunci;
    }
}

int main() {
    vector<int> asli = {64, 25, 12, 22, 11};
    cetak(asli, "data asli");
    cout << endl;

    vector<int> a = asli; bubbleSort(a);    cetak(a, "bubble sort");
    vector<int> b = asli; selectionSort(b); cetak(b, "selection sort");
    vector<int> c = asli; insertionSort(c); cetak(c, "insertion sort");

    // Di dunia nyata cukup pakai sort bawaan: O(n log n)
    vector<int> d = asli;
    sort(d.begin(), d.end());
    cetak(d, "sort bawaan");

    // Mengurutkan dari besar ke kecil
    vector<int> e = asli;
    sort(e.begin(), e.end(), greater<int>());
    cetak(e, "menurun");

    // stable_sort menjaga urutan asli data yang nilainya sama
    vector<int> f = asli;
    stable_sort(f.begin(), f.end());
    cetak(f, "stable_sort");

    return 0;
}`,

    python: String.raw`def bubble_sort(a):
    n = len(a)
    for i in range(n - 1):
        ada_tukar = False
        for j in range(n - 1 - i):              # -i melewati yang sudah beres
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]  # tukar tanpa variabel ketiga
                ada_tukar = True
        if not ada_tukar:                        # sudah rapi -> O(n)
            break
    return a


def selection_sort(a):
    n = len(a)
    for i in range(n - 1):
        idx_min = i
        for j in range(i + 1, n):
            if a[j] < a[idx_min]:
                idx_min = j                      # catat posisinya
        if idx_min != i:
            a[i], a[idx_min] = a[idx_min], a[i]
    return a


def insertion_sort(a):
    for i in range(1, len(a)):                   # mulai dari 1
        kunci = a[i]
        j = i - 1
        while j >= 0 and a[j] > kunci:           # j >= 0 WAJIB di depan
            a[j + 1] = a[j]                      # geser kanan
            j -= 1
        a[j + 1] = kunci
    return a


def bubble_trace(a):
    n = len(a)
    for i in range(n - 1):
        ada_tukar = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                ada_tukar = True
        print(f"  putaran {i+1} : {a}")
        if not ada_tukar:
            print("  tidak ada tukar -> berhenti")
            break
    return a


asli = [64, 25, 12, 22, 11]
print("data asli      :", asli)
print()
print("bubble sort    :", bubble_sort(asli.copy()))
print("selection sort :", selection_sort(asli.copy()))
print("insertion sort :", insertion_sort(asli.copy()))

# Di dunia nyata cukup pakai bawaan Python: Timsort, O(n log n)
print("sorted() bawaan:", sorted(asli))
print("menurun        :", sorted(asli, reverse=True))

print("\n--- TRACE BUBBLE SORT ---")
bubble_trace(asli.copy())

print("\n--- DATA SUDAH TERURUT ---")
bubble_trace([11, 12, 22, 25, 64])

# Mengurutkan struktur data berdasarkan kunci tertentu
mahasiswa = [("Budi", 3.2), ("Ani", 3.9), ("Citra", 2.8)]
print("\nurut IPK :", sorted(mahasiswa, key=lambda m: m[1], reverse=True))`
  },

  output: `data asli         : 64 25 12 22 11

bubble sort       : 11 12 22 25 64
selection sort    : 11 12 22 25 64
insertion sort    : 11 12 22 25 64

--- TRACE BUBBLE SORT ---
  putaran 1 :  25 12 22 11 64   (1 terbesar sudah di kanan)
  putaran 2 :  12 22 11 25 64   (2 terbesar sudah di kanan)
  putaran 3 :  12 11 22 25 64   (3 terbesar sudah di kanan)
  putaran 4 :  11 12 22 25 64   (4 terbesar sudah di kanan)

--- DATA SUDAH TERURUT ---
  putaran 1 :  11 12 22 25 64   (1 terbesar sudah di kanan)
  tidak ada tukar -> berhenti`,

  kompleksitas: {
    tabel: [
      { operasi: 'Bubble — terbaik (sudah terurut)', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Bubble — rata-rata & terburuk', waktu: 'O(n²)', memori: 'O(1)' },
      { operasi: 'Selection — semua keadaan', waktu: 'O(n²)', memori: 'O(1)' },
      { operasi: 'Insertion — terbaik (hampir terurut)', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Insertion — rata-rata & terburuk', waktu: 'O(n²)', memori: 'O(1)' },
      { operasi: 'Jumlah tukar — Bubble', waktu: 'O(n²)', memori: '—' },
      { operasi: 'Jumlah tukar — Selection', waktu: 'O(n)', memori: '—' },
      { operasi: 'sort bawaan (quick/merge/Timsort)', waktu: 'O(n log n)', memori: 'O(log n)–O(n)' }
    ],
    intuisi: `
**Kenapa semuanya O(n²)?** Karena ketiganya memakai **perulangan bersarang**: untuk setiap elemen, hampir seluruh elemen lain diperiksa. Jumlah perbandingannya sekitar \`n × n / 2\`, dan dalam Big-O konstanta ½ diabaikan sehingga tersisa **n²**. Akibatnya terasa nyata: data 10 kali lebih banyak membuatnya **100 kali lebih lambat**.

**Kenapa bubble dan insertion punya kasus terbaik O(n), tapi selection tidak?** Karena keduanya bisa **mendeteksi bahwa pekerjaannya sudah selesai** — bubble lewat penanda "tidak ada tukar", insertion lewat \`while\` yang langsung berhenti di perbandingan pertama. Selection sort tidak punya jalan seperti itu: untuk memastikan mana yang terkecil, ia **wajib** memeriksa seluruh sisa data. Tidak ada jalan pintas, sehingga selamanya O(n²).

**Kenapa selection sort tetap punya nilai lebih?** Karena jumlah **penukarannya** cuma O(n), paling sedikit di antara ketiganya. Kalau memindahkan datanya mahal — misalnya tiap elemen adalah struct besar — jumlah penukaran bisa lebih menentukan daripada jumlah perbandingan.

**Kenapa insertion sort disukai untuk data hampir terurut?** Karena tiap elemen biasanya hanya perlu bergeser satu atau dua langkah sebelum \`while\` berhenti. Sifat ini nyata dipakai di dunia industri: **Timsort**, algoritma bawaan Python dan Java, memakai insertion sort untuk potongan-potongan kecil sebelum menggabungkannya.

**Kenapa memorinya O(1)?** Karena ketiganya mengurutkan **di tempat** (*in-place*) — cuma butuh satu variabel bantu untuk menukar, berapa pun besar datanya. Bandingkan dengan merge sort yang butuh array tambahan sebesar O(n).
`
  },

  kesalahanUmum: [
    {
      salah: 'Menukar isi tanpa variabel ketiga: `a = b; b = a;`',
      kenapa: 'Setelah baris pertama, nilai lama `a` sudah tertimpa dan hilang. Baris kedua lalu menyalin `b` ke dirinya sendiri, sehingga kedua variabel berakhir bernilai sama — satu data hilang tanpa ada error apa pun.',
      benar: 'Gunakan tiga langkah: `int simpan = a; a = b; b = simpan;`. Di C++ ada `swap(a, b)`, dan di Python cukup `a, b = b, a`.'
    },
    {
      salah: 'Perulangan dalam bubble sort ditulis `for (j = 0; j < n; j++)`',
      kenapa: 'Di dalamnya ada akses `arr[j + 1]`. Saat `j` mencapai `n - 1`, maka `arr[n]` berada **di luar array**. C tidak memberi peringatan, sehingga program membaca atau menimpa memori tetangga.',
      benar: 'Tulis `j < n - 1 - i`. Bagian `- 1` mengamankan `arr[j+1]`, sedangkan `- i` melewati elemen yang sudah beres di kanan.'
    },
    {
      salah: 'Insertion sort ditulis `while (arr[j] > kunci && j >= 0)`',
      kenapa: 'Urutan syaratnya terbalik. Saat `j` menjadi `-1`, `arr[-1]` **dievaluasi lebih dulu** sehingga program mengakses di luar array sebelum sempat dijaga oleh `j >= 0`.',
      benar: 'Tulis `while (j >= 0 && arr[j] > kunci)`. Ini penerapan langsung *short-circuit*: syarat penjaga harus selalu diletakkan **di depan**.'
    },
    {
      salah: 'Selection sort mencatat nilai terkecil, bukan posisinya.',
      kenapa: 'Untuk menukar, yang dibutuhkan adalah **letak** elemen terkecil. Kalau yang disimpan cuma nilainya, kamu tidak tahu harus menukar dengan indeks yang mana — dan mencarinya lagi berarti mengulang pekerjaan.',
      benar: 'Simpan indeksnya: `int idxMin = i;` lalu perbarui dengan `idxMin = j;`. Nilainya selalu bisa diambil lewat `arr[idxMin]`.'
    },
    {
      salah: 'Mengira bubble sort dengan penanda "adaTukar" menjadi algoritma yang cepat.',
      kenapa: 'Penanda itu hanya memperbaiki **kasus terbaik** menjadi O(n), yaitu ketika datanya sudah terurut. Pada data acak maupun data terbalik, kompleksitasnya tetap O(n²) — jadi tidak menolong pada kasus yang sesungguhnya penting.',
      benar: 'Pahami bahwa perbaikan itu hanya menyentuh kasus terbaik. Untuk data besar, gunakan algoritma O(n log n) seperti `sort` di C++ atau `sorted()` di Python.'
    },
    {
      salah: 'Di Python, menulis `b = a` lalu mengurutkan `b` dan mengira `a` tetap utuh.',
      kenapa: '`b = a` tidak menyalin list, melainkan membuat nama kedua yang menunjuk **objek yang sama**. Mengurutkan `b` otomatis mengubah `a` juga, karena keduanya memang satu list yang sama.',
      benar: 'Salin dulu dengan `b = a.copy()` atau `b = a[:]`. Alternatif lain, gunakan `sorted(a)` yang mengembalikan list **baru** tanpa menyentuh aslinya.'
    }
  ],

  analogi: `
Ketiga algoritma ini paling efektif diajarkan dengan **peragaan fisik**. Minta 5–7 mahasiswa berdiri di depan kelas sambil memegang kertas bernomor, lalu jalankan tiap algoritma secara langsung. Cara ini jauh lebih membekas daripada slide apa pun.

**Bubble sort** — minta mereka membandingkan **hanya dengan orang di sebelahnya**, lalu bertukar tempat bila urutannya salah. Setelah satu putaran, tunjukkan bahwa orang bernomor terbesar sudah berada di ujung kanan. Dari sini nama "bubble" jadi masuk akal: nilai besar **menggelembung naik ke permukaan** seperti gelembung di air.

**Selection sort** — minta seseorang **memindai seluruh barisan** untuk mencari angka terkecil, lalu menukarnya ke posisi paling kiri. Tekankan bahwa ia harus melihat **semuanya** sebelum memutuskan, dan itulah kenapa selection sort tidak pernah bisa berhenti lebih awal.

**Insertion sort** — analogi terbaiknya adalah **menyusun kartu remi di tangan**. Hampir semua orang sudah melakukannya secara alami: ambil satu kartu baru, geser ke kiri sampai menemukan tempatnya, sisipkan. Tanya ke kelas, *"waktu main kartu, kalian menyusunnya bagaimana?"* — mereka akan menjelaskan insertion sort tanpa sadar.

Untuk menjelaskan **O(n²)**, pakai perhitungan yang terasa nyata: 10 data butuh sekitar 100 langkah, 100 data butuh 10.000, dan 1.000 data butuh **satu juta**. Setelah itu bandingkan dengan O(n log n) yang untuk 1.000 data cuma butuh sekitar 10.000 langkah — **100 kali lebih sedikit**.

Cara paling meyakinkan untuk menutup materi: jalankan bubble sort pada 100.000 data acak di depan kelas, lalu jalankan \`sort\` bawaan pada data yang sama. Yang satu menggantung berpuluh detik, yang lain selesai seketika. Setelah melihat itu, tidak ada mahasiswa yang bertanya lagi kenapa kompleksitas itu penting.
`,

  latihan: [
    'Implementasikan ketiga algoritma pengurutan, lalu jalankan pada data yang sama. Tambahkan pencacah **perbandingan** dan **penukaran** pada masing-masing, lalu bandingkan hasilnya dalam bentuk tabel.',
    'Jalankan ketiganya pada tiga jenis data: sudah terurut, terurut terbalik, dan acak. Cocokkan hasil pencacahmu dengan teori kasus terbaik dan terburuk — apakah selection sort benar-benar tidak berubah?',
    'Tulis trace bubble sort untuk data `{5, 2, 9, 1}` di kertas, satu putaran per baris, tanpa menjalankan program. Setelah itu buktikan dengan versi bertrace pada contoh kode.',
    'Ubah ketiga algoritma agar mengurutkan dari **besar ke kecil**. Bagian mana yang perlu diubah, dan kenapa cukup itu saja?',
    'Urutkan array of struct `Mahasiswa` berdasarkan IPK dari tinggi ke rendah memakai salah satu algoritma di atas. Perhatikan: struct utuh bisa ditugasi langsung, jadi penukarannya tetap sederhana.',
    'Buat data acak sebanyak 50.000 elemen, lalu bandingkan waktu bubble sort dengan `sort` bawaan. Catat selisihnya — angka ini akan sangat berguna sebagai bahan peragaan saat kamu mengajar.',
    'Uji pemahaman: rancang peragaan fisik 5 menit dengan mahasiswa berbaris memegang nomor untuk menjelaskan bubble sort. Targetnya, kamu bisa menyimpulkan sendiri kenapa satu elemen pasti beres tiap putaran.'
  ]
});

TOPICS.push({
  id: 'debugging',
  judul: 'Debugging & Error Umum',
  kategori: 'algoritma',
  tag: ['debugging', 'error', 'compile error', 'runtime error', 'segmentation fault'],
  ringkas: 'Membaca pesan error, mengenali gejala, dan melacak bug secara sistematis — bekal wajib seorang asprak.',

  fungsi: `**Menemukan sebab sebuah program berperilaku salah — secara sistematis, bukan dengan menebak.**

Ini keterampilan yang paling banyak memakan waktu di seluruh karier pemrograman, dan paling jarang diajarkan secara langsung.

Terpakai di:

- **Setiap tugas yang tidak jalan** — dan itu sebagian besar tugas
- **Kerja praktik dan magang** — kamu akan lebih sering memperbaiki kode orang daripada menulis dari nol
- **Uji Kualitas Perangkat Lunak** — laporan cacat yang baik dimulai dari langkah reproduksi
- **Komputer Forensik** — menelusuri apa yang terjadi dari jejak yang tertinggal

Yang membedakan penelusuran sistematis dari menebak: **menebak bisa berhasil, tetapi tidak mengajarkan apa-apa dan tidak bisa diulang.**

Dan satu kebiasaan yang paling menghemat waktu: **membaca pesan galat sampai selesai.** Sebagian besar pesan galat sudah menyebutkan berkas, baris, dan jenis masalahnya — dan sebagian besar orang menutupnya sebelum membaca.`,

  praktik: {
    tujuan: `Kamu punya urutan langkah baku untuk menelusuri bug, dan bisa memakai debugger sungguhan alih-alih hanya mencetak nilai.`,
    alat: [
      'Debugger bawaan editor (VS Code) atau gdb',
      'Python 3 dengan modul `pdb`'
    ],
    langkah: [
      { judul: 'Buat bugnya bisa diulang',
        isi: `Sebelum apa pun: temukan **langkah pasti** yang selalu memunculkan bugnya.

Bug yang tidak bisa diulang tidak bisa diperbaiki dengan yakin — kamu tidak akan pernah tahu apakah perbaikanmu berhasil atau bugnya kebetulan tidak muncul.

Tulis langkahnya sebagai daftar bernomor, lengkap dengan masukan yang dipakai.` },
      { judul: 'Baca pesan galat sampai selesai',
        isi: `Pesan galat menyebutkan **jenis** masalah, **berkas**, dan **nomor baris**.

Di Python, baca **dari bawah ke atas** — baris terakhir adalah galat sebenarnya, dan baris di atasnya menunjukkan jalur pemanggilan.

Sebagian besar waktu yang terbuang saat debugging adalah karena orang tidak membaca bagian ini.` },
      { judul: 'Persempit dengan membagi dua',
        isi: `Kalau bugnya di antara baris 1 dan 200, taruh satu pemeriksaan di baris 100.

Nilainya masih benar? Berarti bugnya di paruh kedua. Sudah salah? Di paruh pertama.

Tujuh langkah seperti ini cukup untuk mempersempit dua ratus baris menjadi satu — itu pencarian biner yang sama dari topik sebelumnya, diterapkan pada kode.` },
      { judul: 'Pakai debugger, bukan hanya cetak',
        isi: `Mencetak nilai itu berguna, tetapi debugger jauh lebih cepat:

- pasang **breakpoint** dengan mengklik di sebelah nomor baris
- jalankan, dan program berhenti di situ
- **periksa semua variabel sekaligus** tanpa menambah satu baris pun
- **melangkah** baris demi baris untuk melihat alurnya

Di Python tanpa editor: sisipkan \`import pdb; pdb.set_trace()\` lalu pakai perintah \`n\`, \`s\`, \`p nama\`, dan \`c\`.` },
      { judul: 'Ubah satu hal pada satu waktu',
        isi: `Kalau kamu mengubah tiga hal lalu bugnya hilang, kamu **tidak tahu mana yang memperbaikinya** — dan dua perubahan lainnya mungkin menambah bug baru.

Ubah satu, uji, catat hasilnya. Membosankan, tetapi ia satu-satunya cara yang benar-benar memberi jawaban.` },
      { judul: 'Kenali tiga jenis galat',
        isi: `- **Galat sintaks** — kode tidak bisa dikompilasi. Paling mudah, karena langsung ditunjukkan.
- **Galat saat berjalan** — program mati di tengah jalan. Pesan galatnya biasanya menunjuk tempatnya.
- **Galat logika** — program berjalan mulus dan memberi jawaban **salah**. **Paling berbahaya**, karena tidak ada yang memberitahumu.

Jenis ketiga hanya bisa ditemukan dengan **membandingkan hasil terhadap yang seharusnya** — dan itulah kenapa pengujian ada.` },
      { judul: 'Tulis pengujian yang menangkap bugnya',
        isi: `Setelah bugnya diperbaiki, tulis satu \`assert\` yang **akan gagal kalau bugnya kembali**.

Ini yang membedakan memperbaiki dari sekadar menambal: bug yang sudah punya pengujian **tidak bisa kembali diam-diam**.

Kamu akan menemuinya lagi sebagai **regression testing**.` }
    ],
    cek: [
      'Kamu bisa memunculkan bugnya kapan saja dengan mengikuti langkahmu sendiri',
      'Kamu sudah memasang breakpoint dan memeriksa variabel tanpa menambah baris cetak',
      'Setiap bug yang kamu perbaiki punya satu assert yang akan gagal kalau ia kembali'
    ]
  },

  konsep: `
Materi ini mungkin yang paling sering kamu pakai sebagai asprak. Mahasiswa jarang datang bertanya *"apa itu pointer?"* — yang datang biasanya bilang *"Kak, error, tolong lihat"*. Kemampuan **membaca gejala lalu menebak penyebabnya dengan cepat** adalah keahlian utama seorang asisten praktikum.

Error dibagi menjadi tiga jenis, dan membedakannya adalah langkah pertama yang menentukan.

**1. Compile-time error** — ketahuan saat kode diterjemahkan, sehingga program bahkan tidak terbentuk. Ini jenis yang **paling ramah**, karena kompiler menunjukkan baris dan alasannya. Contohnya lupa titik koma, salah ketik nama variabel, atau tipe yang tidak cocok.

**2. Runtime error** — kompilasinya sukses, tapi program berhenti mendadak saat dijalankan. Lebih sulit karena pesannya sering tidak menunjuk baris mana pun. Contohnya *segmentation fault*, pembagian dengan nol, dan *stack overflow*.

**3. Logic error** — program berjalan mulus tanpa pesan apa pun, tapi **hasilnya salah**. Ini yang **paling berbahaya**, karena tidak ada satu pun petunjuk otomatis. Contohnya rumus keliru, salah tanda perbandingan, atau *off-by-one*.

Prinsip paling penting yang perlu kamu tanamkan: **jangan menebak-nebak, tapi persempit wilayahnya.** Alurnya selalu sama — baca pesan errornya dari **paling atas**, temukan baris yang disebut, pastikan gejalanya, lalu persempit sampai bagian yang bersalah terisolasi.

Tiga kebiasaan yang layak kamu ajarkan sejak awal:

- **Kompilasi dengan \`gcc -Wall -Wextra -g\`** agar peringatan yang menyelamatkan ikut ditampilkan
- **Baca error paling atas lebih dulu** — satu kesalahan sering memicu puluhan error palsu di bawahnya
- **Cetak nilai variabel di titik-titik kunci** dengan \`printf\`; cara sederhana ini menyelesaikan sebagian besar bug di praktikum
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '// GEJALA -> PENYEBAB TERSERING (runtime)\n// "Segmentation fault"        -> lupa & di scanf / indeks di luar array\n// program berhenti tanpa pesan -> stack overflow (rekursi tanpa henti)\n// hasil selalu 0 atau raksasa  -> %f dan %lf tertukar di scanf\n// input terlewat begitu saja   -> sisa Enter belum dibuang',
      penjelasan: `
Inilah tabel gejala yang paling sering kamu temui saat mendampingi praktikum. Hafalkan empat baris ini — mereka menutup sebagian besar kasus.

**"Segmentation fault"** berarti program mengakses memori yang bukan haknya. Tiga tersangka utamanya, urut dari yang paling sering: lupa \`&\` pada \`scanf\`, indeks array di luar batas, dan pointer yang belum diarahkan. Langsung periksa ketiganya sebelum yang lain.

**Program berhenti tanpa pesan apa pun** biasanya berarti *stack overflow* akibat rekursi yang tidak punya base case, atau base case-nya tidak pernah tercapai.

**Hasil selalu \`0.000000\` atau angka raksasa yang tidak masuk akal** hampir pasti karena \`%f\` dan \`%lf\` tertukar di \`scanf\`. Ingat aturannya: \`%f\` untuk \`float\`, \`%lf\` untuk \`double\`.

**Satu input terlewat begitu saja tanpa menunggu** disebabkan karakter Enter yang tertinggal di antrean masukan. Obatnya \`scanf(" %c", ...)\` dengan spasi di depan, atau \`cin.ignore()\` di C++.

Cara berpikir yang membedakan asprak berpengalaman: **mulai dari gejala, bukan dari membaca seluruh kode.** Gejala mempersempit kemungkinan jauh lebih cepat.
`
    },
    {
      bahasa: 'c',
      kode: 'error: expected \';\' before \'}\' token\n   |     return 0\n   |            ^\n// baca: BARIS berapa, PESAN apa, TANDA ^ menunjuk ke mana',
      penjelasan: `
Pesan error kompiler terasa menakutkan hanya karena jarang dibaca dengan benar. Padahal susunannya selalu tetap: **nama berkas, nomor baris, jenis pesan, keterangan**, lalu potongan kodenya dengan tanda \`^\` yang menunjuk posisi persisnya.

Dua kebiasaan yang mengubah segalanya:

**Selalu baca error paling atas lebih dulu.** Satu kesalahan kecil sering memicu puluhan error susulan yang sebenarnya palsu. Memperbaiki yang teratas kerap membuat sisanya hilang sendiri. Mahasiswa yang panik melihat "50 errors" biasanya cuma punya satu kesalahan sungguhan.

**Perhatikan bahwa error sering menunjuk baris SETELAH kesalahan yang sebenarnya.** Kompiler baru sadar ada yang kurang setelah membaca baris berikutnya. Karena itu, kalau baris yang ditunjuk terlihat baik-baik saja, **periksa baris di atasnya** — biasanya titik koma atau kurung kurawal yang hilang.

Bedakan juga dua kata kunci ini: **\`error\`** berarti program gagal terbentuk, sedangkan **\`warning\`** berarti program tetap terbentuk tapi ada yang mencurigakan. Jangan pernah abaikan \`warning\` — di situlah bug-bug paling licik bersembunyi.
`
    },
    {
      bahasa: 'c',
      kode: 'gcc -Wall -Wextra -g program.c -o program\n// -Wall -Wextra : tampilkan semua peringatan\n// -g            : sertakan info untuk debugger',
      penjelasan: `
Secara bawaan, \`gcc\` mendiamkan banyak hal mencurigakan. Menambahkan **\`-Wall -Wextra\`** membuatnya menunjukkan peringatan yang justru paling sering menyelamatkan:

- Variabel dipakai sebelum diisi
- \`if (x = 5)\` yang seharusnya \`==\`
- Fungsi non-\`void\` yang punya jalur tanpa \`return\`
- Format specifier yang tidak cocok dengan tipe argumennya
- Variabel dideklarasikan tapi tidak pernah dipakai

Empat yang pertama semuanya adalah bug sungguhan yang **tidak menimbulkan error**, sehingga tanpa peringatan ini programnya lolos begitu saja.

Bagian **\`-g\`** menyertakan informasi tambahan agar program bisa ditelusuri dengan debugger — dan itulah yang membuat tombol Run/Debug di VS Code bisa berhenti di *breakpoint* serta menunjukkan isi variabel.

Ini kebiasaan yang layak kamu wajibkan sejak praktikum pertama. Mahasiswa yang terbiasa mengompilasi dengan \`-Wall\` akan menemukan bug-nya sendiri jauh lebih cepat, dan antrean bertanya ke asprak jadi jauh lebih pendek.
`
    },
    {
      bahasa: 'c',
      kode: 'printf("DEBUG: i=%d, total=%d\\n", i, total);   // titik pemeriksaan\n// letakkan sebelum dan sesudah bagian yang dicurigai',
      penjelasan: `
Teknik ini sering diremehkan, padahal inilah alat yang **paling sering menyelesaikan bug di praktikum**. Namanya *printf debugging*, dan bahkan pemrogram profesional masih memakainya setiap hari.

Prinsipnya: **jangan menebak isi variabel — buktikan.** Sebagian besar bug muncul karena nilai sebuah variabel berbeda dari yang kita bayangkan. Sekali dicetak, dugaan itu langsung terbantah atau terbukti.

Cara memakainya yang efektif adalah **membelah wilayah pencarian**. Taruh satu \`printf\` di tengah program: kalau nilainya masih benar di situ, berarti bug-nya ada di paruh **setelahnya**; kalau sudah salah, bug-nya ada di paruh **sebelumnya**. Ulangi pada paruh yang mencurigakan. Cara ini mempersempit wilayah **setengah demi setengah**, persis seperti binary search — sepuluh baris kode yang bermasalah bisa terisolasi hanya dalam beberapa langkah.

Beri awalan seragam seperti \`"DEBUG:"\` agar mudah dicari dan dihapus setelah selesai.

Satu catatan teknis yang berguna: kalau program crash **sebelum** \`printf\` sempat tercetak, keluarannya mungkin masih tertahan di penyangga. Tambahkan \`fflush(stdout);\` setelahnya, atau akhiri dengan \`\\n\` agar isinya langsung dikeluarkan.
`
    },
    {
      bahasa: 'c',
      kode: '// LOGIC ERROR: tidak ada pesan apa pun, hasilnya saja yang salah\nint rata = total / n;        // pembagian bulat, desimalnya hilang\nfor (i = 0; i <= n; i++)     // off-by-one, kelebihan satu putaran\nif (nilai = 100)             // menugasi, bukan membandingkan',
      penjelasan: `
Ketiga baris ini **lolos kompilasi tanpa error**, programnya berjalan mulus — dan hasilnya salah. Inilah jenis error yang paling melelahkan karena tidak ada satu pun petunjuk otomatis.

Karena tidak ada pesan yang bisa dibaca, cara menemukannya berbeda: **uji dengan data yang jawabannya sudah kamu ketahui.** Kalau menghitung rata-rata dari \`{10, 20}\`, kamu tahu jawabannya harus 15. Begitu yang keluar 15 padahal seharusnya 15.0, atau malah 10, wilayah masalahnya langsung terlihat.

Yang paling ampuh adalah **menguji kasus batas**, karena di situlah bug logika paling sering bersembunyi:

- **Nol** — array kosong, pembagi bernilai nol
- **Satu** — data tunggal, sering membongkar kesalahan indeks
- **Elemen pertama dan terakhir** — pembongkar utama *off-by-one*
- **Nilai negatif** — sering terlupakan saat menulis syarat

Kebiasaan yang layak kamu tanamkan: **hitung dulu jawabannya di kertas, baru jalankan programnya.** Kalau tidak tahu jawaban yang benar, kamu tidak akan pernah tahu programmu salah.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("=== ERROR KHAS C# ===\n");

        // 1. NullReferenceException — paling sering
        Console.WriteLine("1. NullReferenceException");
        string kosong = null;
        try {
            Console.WriteLine(kosong.Length);
        } catch (NullReferenceException) {
            Console.WriteLine("   objectnya null, tapi tetap diakses");
            Console.WriteLine("   perbaikan: cek null, atau pakai kosong?.Length");
        }

        // 2. IndexOutOfRangeException
        Console.WriteLine("\n2. IndexOutOfRangeException");
        int[] data = { 1, 2, 3 };
        try {
            Console.WriteLine(data[10]);
        } catch (IndexOutOfRangeException) {
            Console.WriteLine("   indeks di luar batas");
            Console.WriteLine("   perbaikan: cek data.Length dulu");
        }

        // 3. FormatException — konversi gagal
        Console.WriteLine("\n3. FormatException");
        try {
            int.Parse("abc");
        } catch (FormatException) {
            Console.WriteLine("   teks bukan angka");
            Console.WriteLine("   perbaikan: pakai int.TryParse yang tidak melempar");
        }

        // 4. DivideByZeroException — hanya untuk BILANGAN BULAT
        Console.WriteLine("\n4. DivideByZeroException");
        try {
            int n = 0;
            Console.WriteLine(10 / n);
        } catch (DivideByZeroException) {
            Console.WriteLine("   pembagian bilangan bulat dengan nol");
            Console.WriteLine($"   catatan: 10.0 / 0 = {10.0 / 0} (tidak error!)");
        }

        // 5. KeyNotFoundException
        Console.WriteLine("\n5. KeyNotFoundException");
        var kamus = new Dictionary<string, int> { ["a"] = 1 };
        try {
            Console.WriteLine(kamus["z"]);
        } catch (KeyNotFoundException) {
            Console.WriteLine("   kunci tidak ada");
            Console.WriteLine("   perbaikan: kamus.TryGetValue(\"z\", out int v)");
        }

        // 6. LOGIC ERROR — tidak ada pesan sama sekali
        Console.WriteLine("\n6. LOGIC ERROR (tanpa pesan apa pun)");
        int total = 250, jml = 4;
        Console.WriteLine($"   total / jml          = {total / jml}   <- desimal hilang");
        Console.WriteLine($"   (double)total / jml  = {(double)total / jml}");

        Console.WriteLine("\n=== ALAT BANTU ===");
        Console.WriteLine("  Console.WriteLine($\"DEBUG: {variabel}\")");
        Console.WriteLine("  System.Diagnostics.Debug.Assert(kondisi)");
        Console.WriteLine("  nameof(variabel)  -> mendapat namanya sebagai teks");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    public static void main(String[] args) {
        System.out.println("=== MEMBACA STACK TRACE ===");
        System.out.println("Baris PALING ATAS = tempat error terjadi.");
        System.out.println("Baris di bawahnya = siapa yang memanggilnya.");
        System.out.println("(kebalikan dari traceback Python)\n");

        // 1. NullPointerException — error paling terkenal di Java
        System.out.println("1. NullPointerException");
        String kosong = null;
        try {
            System.out.println(kosong.length());
        } catch (NullPointerException e) {
            System.out.println("   objectnya null, tapi tetap diakses");
            System.out.println("   perbaikan: cek null dulu, atau pakai Optional");
        }

        // 2. ArrayIndexOutOfBoundsException
        System.out.println("\n2. ArrayIndexOutOfBoundsException");
        int[] data = { 1, 2, 3 };
        try {
            System.out.println(data[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("   " + e.getMessage());
            System.out.println("   perbaikan: cek data.length dulu");
        }

        // 3. NumberFormatException
        System.out.println("\n3. NumberFormatException");
        try {
            Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("   " + e.getMessage());
            System.out.println("   perbaikan: bungkus try-catch saat membaca input");
        }

        // 4. ArithmeticException — hanya untuk BILANGAN BULAT
        System.out.println("\n4. ArithmeticException");
        try {
            int n = 0;
            System.out.println(10 / n);
        } catch (ArithmeticException e) {
            System.out.println("   " + e.getMessage());
            System.out.println("   catatan: 10.0 / 0 = " + (10.0 / 0) + " (tidak error!)");
        }

        // 5. ConcurrentModificationException — khas Java
        System.out.println("\n5. ConcurrentModificationException");
        List<Integer> daftar = new ArrayList<>(List.of(1, 2, 3));
        try {
            for (Integer x : daftar) {
                if (x == 2) daftar.remove(x);      // mengubah saat menelusuri
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("   list diubah saat sedang ditelusuri");
            System.out.println("   perbaikan: pakai Iterator.remove() atau removeIf()");
        }

        // 6. LOGIC ERROR — tidak ada pesan
        System.out.println("\n6. LOGIC ERROR (tanpa pesan apa pun)");
        int total = 250, jml = 4;
        System.out.println("   total / jml         = " + (total / jml) + "   <- desimal hilang");
        System.out.println("   (double)total / jml = " + ((double) total / jml));

        // 7. == pada String
        System.out.println("\n7. LOGIC ERROR khas Java: == pada String");
        String a = new String("Budi"), b = new String("Budi");
        System.out.println("   a == b       : " + (a == b) + "  <- membandingkan alamat");
        System.out.println("   a.equals(b)  : " + a.equals(b) + "  <- yang benar");

        System.out.println("\n=== ALAT BANTU ===");
        System.out.println("  System.out.println(\"DEBUG: \" + variabel)");
        System.out.println("  assert kondisi : \"pesan\";   (jalankan dengan -ea)");
        System.out.println("  e.printStackTrace()  -> melihat jejak lengkap");
    }
}`,

    js: String.raw`console.log("=== ERROR KHAS JAVASCRIPT ===\n");

// 1. TypeError: mengakses properti dari undefined/null
console.log("1. TypeError");
let kosong = null;
try {
    console.log(kosong.length);
} catch (e) {
    console.log("   " + e.message);
    console.log("   perbaikan: kosong?.length  (optional chaining)");
}

// 2. ReferenceError: memakai nama yang belum ada
console.log("\n2. ReferenceError");
try {
    console.log(belumPernahAda);
} catch (e) {
    console.log("   " + e.message);
    console.log("   perbaikan: periksa ejaan, atau deklarasikan dulu");
}

// 3. Indeks di luar batas TIDAK error — ini yang berbahaya
console.log("\n3. Indeks di luar batas (TIDAK error!)");
const data = [1, 2, 3];
console.log("   data[10] =", data[10], " <- undefined, program lanjut");
console.log("   lalu data[10] + 1 =", data[10] + 1, " <- NaN diam-diam menyebar");
console.log("   perbaikan: cek data.length, atau pakai .at()");

// 4. NaN menyebar tanpa peringatan
console.log("\n4. NaN menyebar diam-diam");
const hasil = Number("abc");
console.log("   Number('abc')     =", hasil);
console.log("   hasil + 10        =", hasil + 10);
console.log("   NaN === NaN       =", NaN === NaN, " <- selalu false!");
console.log("   cara mengecek     : Number.isNaN(hasil) =", Number.isNaN(hasil));

// 5. Pembagian nol TIDAK error di JavaScript
console.log("\n5. Pembagian dengan nol");
console.log("   10 / 0  =", 10 / 0, " <- Infinity, bukan error");
console.log("   0 / 0   =", 0 / 0, " <- NaN");
console.log("   perbaikan: cek pembaginya sendiri, tidak ada exception");

// 6. LOGIC ERROR khas JavaScript
console.log("\n6. LOGIC ERROR khas JavaScript");
console.log("   '5' + 3       =", "5" + 3, " <- disambung jadi teks");
console.log("   '5' - 3       =", "5" - 3, " <- justru dihitung");
console.log("   [1,2] + [3]   =", [1, 2] + [3], " <- keduanya jadi teks");
console.log("   0.1 + 0.2     =", 0.1 + 0.2);

// 7. Perbandingan longgar
console.log("\n7. == menyesatkan");
console.log("   '' == 0       :", "" == 0);
console.log("   '0' == 0      :", "0" == 0);
console.log("   '' == '0'     :", "" == "0", " <- tidak konsisten!");
console.log("   perbaikan: SELALU pakai ===");

// ---------- ALAT BANTU ----------
console.log("\n=== ALAT BANTU ===");
const umur = 20, nama = "Budi";
console.log("  console.log({umur, nama}) ->", { umur, nama });
console.log("  -> mencetak NAMA sekaligus nilainya");

console.table([{ nama: "Budi", ipk: 3.75 }, { nama: "Ani", ipk: 3.2 }]);

console.log("\n  console.table()  -> tabel rapi");
console.log("  console.trace()  -> jejak pemanggilan");
console.log("  typeof x         -> memastikan tipenya");
console.log("  debugger;        -> berhenti di DevTools");

// 8. Kesalahan asinkron: lupa await
console.log("\n8. Lupa await (khas JavaScript modern)");
console.log("   const x = ambilData();        -> Promise, bukan datanya");
console.log("   const x = await ambilData();  -> baru datanya");`,

    c: String.raw`#include <stdio.h>

/* ============================================================
   Berkas ini berisi bug yang SENGAJA dibuat, lengkap dengan
   perbaikannya. Cocok dipakai sebagai bahan latihan mahasiswa.
   ============================================================ */

void bug1_pembagianBulat(void) {
    int total = 250, n = 4;

    int salah = total / n;                 // desimalnya terbuang
    float benar = (float)total / n;        // casting dulu

    printf("1. PEMBAGIAN BULAT\n");
    printf("   salah : %d      <- 62, desimal hilang\n", salah);
    printf("   benar : %.2f\n\n", benar);
}

void bug2_offByOne(void) {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("2. OFF-BY-ONE\n");
    printf("   benar (i < 5) : ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);

    printf("\n   salah (i <= 5): ");
    for (int i = 0; i <= 5; i++) printf("%d ", arr[i]);   // arr[5] di luar batas
    printf("  <- angka terakhir adalah sampah\n\n");
}

void bug3_samaDengan(void) {
    int nilai = 50;

    printf("3. = VERSUS ==\n");
    if (nilai = 100) {                     // menugasi, bukan membandingkan
        printf("   'if (nilai = 100)' dianggap benar, ");
        printf("dan nilai berubah jadi %d\n", nilai);
    }
    nilai = 50;
    if (nilai == 100) printf("   tidak akan tercetak\n");
    else              printf("   'if (nilai == 100)' -> benar, %d bukan 100\n\n", nilai);
}

void bug4_belumDiisi(void) {
    int belumDiisi;                        // berisi sampah
    int sudahDiisi = 0;

    for (int i = 1; i <= 5; i++) sudahDiisi += i;

    printf("4. VARIABEL BELUM DIISI\n");
    printf("   belum diisi : %d  <- angka acak, beda tiap dijalankan\n", belumDiisi);
    printf("   sudah diisi : %d\n\n", sudahDiisi);
}

void bug5_printfDebugging(void) {
    int data[] = {3, 7, 2, 9, 4};
    int maks = 0;                          // BUG: seharusnya data[0]

    printf("5. PRINTF DEBUGGING\n");
    for (int i = 0; i < 5; i++) {
        printf("   DEBUG: i=%d, data[i]=%d, maks=%d\n", i, data[i], maks);
        if (data[i] > maks) maks = data[i];
    }
    printf("   hasil : %d\n", maks);
    printf("   (kebetulan benar di sini, tapi GAGAL kalau semua data negatif)\n");
    printf("   perbaikan: mulai dengan maks = data[0], bukan 0\n\n");
}

int main(void) {
    bug1_pembagianBulat();
    bug2_offByOne();
    bug3_samaDengan();
    bug4_belumDiisi();
    bug5_printfDebugging();

    printf("Kompilasi dengan:  gcc -Wall -Wextra -g program.c -o program\n");
    printf("Peringatan yang muncul akan menunjuk sebagian besar bug di atas.\n");

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    cout << "=== ERROR KHAS C++ ===" << endl;

    // 1. cin >> gagal karena tipe tidak cocok
    cout << "\n1. cin GAGAL BACA" << endl;
    cout << "   Kalau pengguna mengetik huruf saat diminta angka," << endl;
    cout << "   cin masuk ke keadaan gagal dan SEMUA input berikutnya dilewati." << endl;
    cout << "   Perbaikan: cin.clear(); cin.ignore(1000, '\\n');" << endl;

    // 2. Sisa Enter merusak getline
    cout << "\n2. getline LANGSUNG TERLEWAT" << endl;
    cout << "   Setelah 'cin >> umur', karakter Enter masih tertinggal," << endl;
    cout << "   sehingga getline berikutnya membaca baris kosong." << endl;
    cout << "   Perbaikan: sisipkan cin.ignore(); sebelum getline." << endl;

    // 3. Indeks di luar batas: [] tidak memeriksa, at() memeriksa
    cout << "\n3. INDEKS DI LUAR BATAS" << endl;
    vector<int> v = {1, 2, 3};
    cout << "   v[10] -> tidak error, nilainya sampah (bahaya)" << endl;
    try {
        v.at(10);                       // at() memeriksa batas
    } catch (const out_of_range &e) {
        cout << "   v.at(10) -> tertangkap: " << e.what() << endl;
    }

    // 4. Pembagian bulat, sama seperti di C
    cout << "\n4. PEMBAGIAN BULAT" << endl;
    int total = 250, n = 4;
    cout << "   total / n           = " << total / n << "  <- salah" << endl;
    cout << "   (double)total / n   = " << (double)total / n << endl;

    // 5. Lupa #include
    cout << "\n5. LUPA #include" << endl;
    cout << "   'string was not declared'  -> kurang #include <string>" << endl;
    cout << "   'sort was not declared'    -> kurang #include <algorithm>" << endl;
    cout << "   'vector was not declared'  -> kurang #include <vector>" << endl;

    return 0;
}`,

    python: String.raw`"""Error khas Python beserta cara membacanya."""

print("=== MEMBACA TRACEBACK ===")
print("Traceback dibaca dari BAWAH ke ATAS:")
print("  baris terakhir  = jenis error dan pesannya")
print("  baris di atasnya = lokasi persisnya")
print()

# 1. TypeError: paling sering, akibat input() yang selalu berupa teks
print("1. TypeError")
try:
    umur = "20"          # anggap ini hasil dari input()
    print(umur + 5)
except TypeError as e:
    print("   ", e)
    print("    perbaikan: umur = int(input(...))")

# 2. IndexError: indeks di luar batas (di C ini jadi segfault diam-diam)
print("\n2. IndexError")
data = [1, 2, 3]
try:
    print(data[10])
except IndexError as e:
    print("   ", e)
    print("    perbaikan: cek len(data) dulu, atau pakai data[-1]")

# 3. KeyError: kunci dict tidak ada
print("\n3. KeyError")
mhs = {"nama": "Budi"}
try:
    print(mhs["umur"])
except KeyError as e:
    print("    kunci tidak ada:", e)
    print("    perbaikan: mhs.get('umur', 0) yang punya nilai cadangan")

# 4. ZeroDivisionError
print("\n4. ZeroDivisionError")
try:
    print(10 / 0)
except ZeroDivisionError as e:
    print("   ", e)
    print("    perbaikan: if n != 0: ... (short-circuit)")

# 5. ValueError: konversi gagal
print("\n5. ValueError")
try:
    int("abc")
except ValueError as e:
    print("   ", e)
    print("    perbaikan: bungkus dengan try-except saat membaca input")

# 6. IndentationError: khas Python
print("\n6. IndentationError")
print("    Terjadi kalau indentasi tidak konsisten.")
print("    Penyebab tersering: TAB dan SPASI tercampur dalam satu berkas.")
print("    Perbaikan: pilih salah satu (4 spasi disarankan) dan konsisten.")

# 7. Logic error: tidak ada pesan sama sekali
print("\n7. LOGIC ERROR (tanpa pesan apa pun)")
nilai = [80, 90, 70]
rata_salah = sum(nilai) // len(nilai)      # // membuang desimal
rata_benar = sum(nilai) / len(nilai)
print(f"    pakai // : {rata_salah}      <- desimal hilang")
print(f"    pakai /  : {rata_benar:.2f}")

print("\n=== ALAT BANTU ===")
print("  print(f'DEBUG: {variabel=}')   -> mencetak nama sekaligus nilainya")
print("  type(x)                        -> memastikan tipenya")
print("  breakpoint()                   -> debugger bawaan Python")`
  },

  output: `1. PEMBAGIAN BULAT
   salah : 62      <- 62, desimal hilang
   benar : 62.50

2. OFF-BY-ONE
   benar (i < 5) : 10 20 30 40 50
   salah (i <= 5): 10 20 30 40 50 32764   <- angka terakhir adalah sampah

3. = VERSUS ==
   'if (nilai = 100)' dianggap benar, dan nilai berubah jadi 100
   'if (nilai == 100)' -> benar, 50 bukan 100

4. VARIABEL BELUM DIISI
   belum diisi : 21845  <- angka acak, beda tiap dijalankan
   sudah diisi : 15`,

  kesalahanUmum: [
    {
      salah: 'Panik melihat "50 errors" lalu mengubah kode secara acak.',
      kenapa: 'Satu kesalahan kecil — misalnya kurang satu titik koma atau kurung kurawal — membuat kompiler salah membaca seluruh sisa berkas, sehingga memuntahkan puluhan error susulan yang sebenarnya palsu.',
      benar: 'Perbaiki **error paling atas saja**, lalu kompilasi ulang. Sering kali 49 error sisanya langsung hilang. Selalu tangani satu per satu dari atas.'
    },
    {
      salah: 'Mengabaikan `warning` karena programnya tetap bisa dijalankan.',
      kenapa: '`warning` justru menandai hal yang secara tata bahasa sah tapi hampir pasti bukan yang kamu maksud — seperti `if (x = 5)`, variabel yang belum diisi, atau fungsi yang lupa `return`. Semuanya adalah bug sungguhan yang tidak menghasilkan error.',
      benar: 'Kompilasi dengan `gcc -Wall -Wextra` dan **selesaikan semua peringatan**. Perlakukan warning seperti error sejak praktikum pertama.'
    },
    {
      salah: 'Mencari bug dengan membaca ulang seluruh kode dari awal.',
      kenapa: 'Cara ini lambat dan tidak dapat diandalkan, karena mata cenderung membaca **apa yang kita maksudkan**, bukan apa yang benar-benar tertulis. Kesalahan kecil justru paling mudah terlewat oleh penulisnya sendiri.',
      benar: 'Persempit wilayahnya dengan `printf` di tengah program. Kalau nilainya masih benar di situ, bug ada di paruh setelahnya. Ulangi membelah — mirip binary search.'
    },
    {
      salah: 'Menyimpulkan program sudah benar hanya karena berhasil dijalankan sekali.',
      kenapa: 'Logic error tidak memunculkan pesan apa pun. Program bisa memberi hasil yang benar untuk satu masukan lalu salah untuk masukan lain — terutama pada kasus batas seperti data kosong, satu elemen, atau nilai negatif.',
      benar: 'Uji dengan data yang **jawabannya sudah kamu ketahui**, dan selalu sertakan kasus batas: 0, 1, elemen pertama, elemen terakhir, dan nilai negatif.'
    },
    {
      salah: 'Mengira baris yang ditunjuk error selalu baris yang bersalah.',
      kenapa: 'Kompiler baru menyadari ada yang kurang **setelah** membaca baris berikutnya. Karena itu titik koma yang hilang di baris 20 sering dilaporkan sebagai error di baris 21 — dan baris 21 sendiri terlihat baik-baik saja.',
      benar: 'Kalau baris yang ditunjuk tampak tidak bermasalah, **periksa baris di atasnya**. Tersangka utamanya titik koma, kurung kurawal, atau kurung biasa yang belum ditutup.'
    },
    {
      salah: 'Di Python, membaca traceback dari atas ke bawah.',
      kenapa: 'Traceback disusun dari pemanggilan terluar menuju ke dalam, sehingga **baris paling bawah** justru berisi jenis error dan lokasi sebenarnya. Membacanya dari atas membuat waktu terbuang di bagian yang tidak relevan.',
      benar: 'Baca **dari bawah ke atas**: baris terakhir menyebut jenis errornya, baris di atasnya menunjukkan lokasinya. Bagian atas baru berguna saat melacak alur pemanggilan.'
    }
  ],

  analogi: `
Pakai analogi **dokter memeriksa pasien**, karena itulah peran sesungguhnya seorang asprak.

Pasien datang mengeluhkan **gejala** ("perut sakit"), bukan **diagnosis** ("saya radang usus buntu"). Begitu pula mahasiswa: mereka bilang *"errornya segmentation fault"*, dan tugasmu menerjemahkannya menjadi penyebab. Dokter yang baik tidak langsung mengobati — ia bertanya, mempersempit, lalu memastikan.

Bangun **daftar gejala → tersangka** milikmu sendiri, dan hafalkan yang paling sering:

- *Segmentation fault* → lupa \`&\` di \`scanf\`, indeks di luar array, pointer belum diarahkan
- *Hasilnya 0 atau angka raksasa* → \`%f\` dan \`%lf\` tertukar
- *Satu input terlewat* → sisa Enter di antrean masukan
- *Rata-rata kehilangan desimal* → pembagian bulat
- *Hasil meleset satu* → off-by-one pada batas perulangan

Untuk mengajarkan **cara mempersempit**, pakai permainan **tebak angka** yang sudah dikenal dari materi searching: jangan menebak satu per satu, tapi **belah dua terus**. Taruh \`printf\` di tengah program — kalau di situ masih benar, separuh pertama sudah bersih. Cara berpikir yang sama persis dengan binary search.

Ada satu teknik klasik yang layak kamu ajarkan: ***rubber duck debugging***. Jelaskan kodemu **baris demi baris dengan suara keras**, seolah kepada bebek karet. Sangat sering, di tengah menjelaskan, orangnya sendiri berhenti dan berkata *"oh, harusnya bukan begini"*. Ini bukan lelucon — memaksa diri menjelaskan membuat asumsi yang tersembunyi jadi terlihat.

Sebagai asprak, manfaatkan ini: **minta mahasiswa menjelaskan dulu maksud kodenya sebelum kamu melihatnya.** Sebagian akan menemukan bug-nya sendiri sebelum kamu sempat membaca satu baris pun — dan mereka belajar jauh lebih banyak dengan cara itu.
`,

  latihan: [
    'Ambil kode contoh pada topik ini, kompilasi dengan `gcc -Wall -Wextra`, lalu catat semua peringatan yang muncul. Cocokkan tiap peringatan dengan bug yang dimaksud.',
    'Sengaja buat lima error berbeda pada satu program: hilangkan titik koma, salah ketik nama variabel, lupa `&` di `scanf`, akses di luar array, dan rekursi tanpa base case. Catat pesan error masing-masing sebagai bahan referensimu saat mengajar nanti.',
    'Ambil program berisi bug logika (misalnya rata-rata yang selalu bulat), lalu temukan penyebabnya **hanya** dengan menambahkan `printf`. Catat berapa langkah yang kamu butuhkan.',
    'Buat program yang meminta angka lalu membaginya. Uji dengan masukan: 0, bilangan negatif, dan huruf. Apa yang terjadi pada masing-masing, dan bagaimana cara menjaganya?',
    'Kerjakan di Python: buat program yang memicu `TypeError`, `IndexError`, dan `ValueError`. Baca traceback-nya dari bawah ke atas, lalu tulis ulang pesan errornya dengan bahasamu sendiri.',
    'Susun **kartu contekan gejala → penyebab** berisi minimal 10 baris, berdasarkan error yang benar-benar kamu alami sendiri. Bawa saat mendampingi praktikum.',
    'Uji pemahaman: susun cara menjawab mahasiswa yang bilang *"Kak, error"* tanpa memberi tahu jawabannya langsung. Susun tiga pertanyaan pemandu yang membuat mereka menemukan bug-nya sendiri.'
  ]
});
