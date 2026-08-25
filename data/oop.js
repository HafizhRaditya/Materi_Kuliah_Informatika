/* ============================================================
   oop.js — materi kategori "oop"
   Catatan: bahasa C tidak punya OOP. Kalau tab C diisi, isinya
   adalah PADANAN MANUAL memakai struct + fungsi, supaya mahasiswa
   melihat apa yang sebenarnya dikerjakan oleh sebuah class.
   ============================================================ */

TOPICS.push({
  id: 'class-object',
  judul: 'Class & Object',
  kategori: 'oop',
  tag: ['oop', 'class', 'object', 'instance', 'self', 'this'],
  ringkas: 'Class adalah cetakan, object adalah barang jadinya. Pintu masuk seluruh materi OOP.',

  fungsi: `**Membuat cetakan untuk data yang selalu muncul bersama beserta perilakunya.**

Kalau struct mengelompokkan **data**, kelas mengelompokkan **data dan fungsi yang mengurusnya**.

Terpakai di:

- **Model data** di setiap aplikasi — Mahasiswa, Produk, Transaksi
- **Kerangka kerja web** — Controller, Model, dan Middleware semuanya kelas
- **ORM** — satu kelas mewakili satu tabel basis data
- **Pustaka apa pun** yang kamu pakai — hampir semuanya berbasis kelas

Yang membedakannya dari sekadar struct: **fungsinya ikut pindah bersama datanya.**

Fungsi \`hitungIPK\` yang berdiri sendiri harus diberi tahu data mana yang diolah. Method \`mahasiswa.hitungIPK()\` **sudah tahu**, dan tidak bisa dipanggil untuk data yang salah.`,

  praktik: {
    tujuan: `Kamu bisa merancang kelas dari entitas nyata, membuat objeknya, dan memahami perbedaan kelas dengan objek.`,
    alat: [
      'Python 3, Java, atau C++'
    ],
    langkah: [
      { judul: 'Ambil entitas nyata dari proyekmu',
        isi: `Jangan pakai contoh Hewan dan Kucing. Pakai sesuatu dari proyekmu sendiri: Mahasiswa, Buku, atau Transaksi.

Belajar dengan data yang kamu pedulikan membuat keputusan rancangannya terasa nyata.` },
      { judul: 'Pisahkan cetakan dari wujudnya',
        isi: `**Kelas** adalah cetakan — ia tidak menyimpan data siapa pun.

**Objek** adalah wujudnya — satu objek per mahasiswa sungguhan.

Buat tiga objek dari satu kelas, isi dengan data berbeda, lalu cetak semuanya. Melihat tiga objek dari satu kelas membuat perbedaannya jelas.` },
      { judul: 'Buktikan tiap objek punya datanya sendiri',
        isi: `Ubah nama pada objek pertama, lalu cetak objek kedua.

Objek kedua **tidak berubah**. Masing-masing punya salinan datanya sendiri.

Ini terdengar jelas, tetapi menjadi tidak jelas begitu kamu bertemu **atribut kelas** di langkah berikutnya.` },
      { judul: 'Bedakan atribut objek dan atribut kelas',
        isi: `Di Python, atribut yang ditulis **di dalam** \`__init__\` milik tiap objek. Yang ditulis **di luar** milik kelasnya, dan **dibagi semua objek**.

Buat penghitung jumlah objek sebagai atribut kelas, dan naikkan di \`__init__\`. Semua objek melihat angka yang sama.

Jebakannya: **jangan pernah memakai daftar sebagai atribut kelas** — semua objek akan berbagi daftar yang sama, dan itu bug yang sangat membingungkan.` },
      { judul: 'Beri nama yang tepat',
        isi: `Nama kelas adalah **kata benda tunggal** dengan huruf besar di awal: \`Mahasiswa\`, bukan \`DataMahasiswa\` atau \`Mahasiswas\`.

Nama method adalah **kata kerja**: \`hitungIPK\`, \`tambahMataKuliah\`.

Kalau kamu kesulitan menamai kelasnya, biasanya ia mencakup terlalu banyak hal.` },
      { judul: 'Uji satu kelas secara terpisah',
        isi: `Tulis beberapa \`assert\` yang membuat objeknya, memanggil method-nya, dan memeriksa hasilnya.

Kelas yang tidak bisa diuji tanpa menjalankan seluruh aplikasi biasanya terlalu terikat pada hal lain — dan itu tanda rancangan yang perlu diperbaiki.` }
    ],
    cek: [
      'Mengubah data satu objek tidak mempengaruhi objek lain dari kelas yang sama',
      'Kamu bisa menjelaskan bedanya atribut objek dan atribut kelas',
      'Kelasmu punya sedikitnya tiga assert yang membuktikannya bekerja'
    ]
  },

  konsep: `
Sebelum ada OOP, data dan fungsi hidup terpisah. Untuk mengelola tiga mahasiswa, kita menulis \`nama1\`, \`umur1\`, \`ipk1\`, \`nama2\`, \`umur2\`, dan seterusnya — lalu fungsi-fungsi lepas yang harus dikirimi semua variabel itu satu per satu. Begitu datanya bertambah, kodenya jadi sulit dirawat.

**OOP menjawabnya dengan satu ide sederhana: bungkus data dan perilakunya jadi satu.**

- **Class** adalah **cetakan** atau rancangan. Ia menjelaskan *"benda jenis ini punya data apa saja, dan bisa melakukan apa saja"*. Class **tidak memakan memori untuk data** — ia baru sekadar rancangan.
- **Object** (disebut juga **instance**) adalah **barang nyata** yang dibuat dari cetakan itu. Object inilah yang punya nilai sungguhan dan menempati memori.

Perbandingan yang paling gampang dicerna: **class itu resep kue, object itu kuenya**. Satu resep bisa dipakai membuat ratusan kue, dan tiap kue bisa punya rasa berbeda meski cetakannya sama. Kamu tidak bisa memakan resepnya.

Di dalam class ada dua jenis anggota:

- **Attribute** (disebut juga *field*, *property*, atau *member variable*) — **datanya**, misal \`nama\`, \`umur\`, \`ipk\`.
- **Method** — **perilakunya**, yaitu fungsi yang hidup di dalam class, misal \`tampilkan()\` atau \`hitungPredikat()\`.

Manfaat nyata yang bisa kamu tekankan ke mahasiswa: dengan class, menambah satu mahasiswa cukup dengan membuat satu object baru — bukan menambah tiga variabel lepas. Dan setiap object membawa datanya sendiri-sendiri, sehingga tidak saling mengganggu.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    string nama;\n    int umur;\n};      // <- titik koma ini WAJIB',
      penjelasan: `
Dua hal yang wajib dipahami di baris-baris ini.

**Pertama, kenapa ada titik koma setelah \`}\`?** Karena dalam C++, definisi class itu sendiri merupakan sebuah **pernyataan** yang boleh langsung diikuti nama variabel, seperti \`class Mahasiswa { ... } mhs1, mhs2;\`. Kompiler perlu tahu di mana pernyataan itu berakhir — itulah tugas titik koma tersebut. Kalau lupa, pesan errornya biasanya menunjuk ke **baris berikutnya** dan terasa membingungkan karena seolah tidak ada yang salah di sana.

**Kedua, kenapa harus ada \`public:\`?** Karena pada \`class\`, hak akses bawaannya adalah **private**. Tanpa \`public:\`, semua anggota tidak bisa disentuh dari luar class dan \`mhs.nama\` akan ditolak kompiler.

Di sinilah satu-satunya perbedaan teknis antara \`class\` dan \`struct\` di C++: **\`struct\` bawaannya \`public\`, \`class\` bawaannya \`private\`.** Selain itu keduanya sama persis.
`
    },
    {
      bahasa: 'cpp',
      kode: 'Mahasiswa mhs;          // membuat object\nmhs.nama = "Budi";      // tanda titik untuk mengakses anggota\n\nMahasiswa *p = &mhs;\np->nama = "Ani";        // lewat pointer pakai ->',
      penjelasan: `
\`Mahasiswa mhs;\` menjalankan cetakan tadi menjadi barang nyata. Di titik inilah memori benar-benar dipesan, sebesar total semua attribute-nya.

Tanda **titik** (\`.\`) berarti "ambil anggota dari **object langsung**". Sedangkan tanda **panah** (\`->\`) berarti "ambil anggota dari object yang **ditunjuk pointer**".

Hubungannya sangat lurus: \`p->nama\` sebenarnya hanyalah singkatan dari \`(*p).nama\`. Artinya "buka dulu isi pointernya, baru ambil anggotanya". Tanda kurungnya wajib, karena \`.\` dikerjakan lebih dulu daripada \`*\` — dan karena penulisan itu merepotkan, C++ menyediakan \`->\` sebagai penggantinya.

Aturan singkat: **kalau bendanya object pakai \`.\`, kalau alamatnya pakai \`->\`.**
`
    },
    {
      bahasa: 'python',
      kode: 'class Mahasiswa:\n    def __init__(self, nama, umur):\n        self.nama = nama\n        self.umur = umur',
      penjelasan: `
\`__init__\` adalah **constructor** Python — method yang dijalankan **otomatis** setiap kali object baru dibuat. Nama dengan dua garis bawah di kiri-kanan menandakan method khusus yang dipanggil oleh Python sendiri, bukan oleh kita.

Perhatikan baris \`self.nama = nama\`. Kedua kata itu **berbeda**: \`self.nama\` adalah attribute yang menempel pada object, sedangkan \`nama\` (tanpa \`self\`) hanyalah parameter yang umurnya sebatas di dalam method ini. Kalau kamu menulis \`nama = nama\` saja, datanya hilang begitu \`__init__\` selesai.

Jadi \`self.\` bukan hiasan — **itulah yang menentukan data disimpan di object atau cuma numpang lewat.**
`
    },
    {
      bahasa: 'python',
      kode: 'mhs = Mahasiswa("Budi", 20)\nmhs.tampilkan()\n\n# sebenarnya Python menjalankan ini:\n# Mahasiswa.tampilkan(mhs)',
      penjelasan: `
**Inilah jawaban dari pertanyaan "kenapa Python harus menulis \`self\` terus?"**

Saat kamu memanggil \`mhs.tampilkan()\`, Python diam-diam menerjemahkannya menjadi \`Mahasiswa.tampilkan(mhs)\` — **object-nya dikirim sebagai argumen pertama**. Karena itulah setiap method **wajib** menyediakan satu parameter di posisi pertama untuk menampungnya, dan parameter itu kita namai \`self\`.

Yang penting diketahui: \`self\` **bukan kata kunci**. Ia cuma kesepakatan penamaan — secara teknis kamu boleh menamainya \`aku\` dan programnya tetap jalan. Tapi jangan pernah lakukan itu, karena seluruh dunia Python memakai \`self\`.

Bandingkan dengan C++ yang menyembunyikan mekanisme ini: di C++, object dikirim diam-diam sebagai pointer bernama \`this\`. Jadi keduanya melakukan hal yang sama; Python hanya memilih menampakkannya secara terbuka. Prinsip ini terkenal di komunitas Python: *lebih baik eksplisit daripada tersirat*.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    string nama;\n    void setNama(string nama) {\n        this->nama = nama;   // kenapa perlu this-> ?\n    }\n};',
      penjelasan: `
\`this\` adalah **pointer menuju object yang sedang menjalankan method tersebut**. Ia disiapkan otomatis oleh C++, jadi tidak perlu (dan tidak bisa) kita deklarasikan sendiri.

Pada contoh ini, parameter \`nama\` **menutupi** (*shadowing*) attribute \`nama\` karena namanya sama persis. Di dalam method, tulisan \`nama\` selalu merujuk ke parameter — yang lebih dekat jangkauannya. Menulis \`nama = nama;\` berarti menyalin parameter ke dirinya sendiri: attribute-nya tidak berubah sama sekali, dan **kompiler tidak menganggap ini error**.

Dengan \`this->nama\`, kita menegaskan "yang kiri itu milik object, yang kanan itu parameter". Karena \`this\` adalah pointer, aksesnya memakai \`->\`, bukan \`.\`.

Alternatif yang juga umum: bedakan saja penamaannya, misal parameternya \`namaBaru\`. Banyak dosen justru menyarankan ini untuk pemula karena lebih jelas terbaca.
`
    },
    {
      bahasa: 'python',
      kode: 'class Salah:\n    daftar = []          # menempel ke CLASS -> dipakai bersama\n\nclass Benar:\n    def __init__(self):\n        self.daftar = []  # menempel ke OBJECT -> milik masing-masing',
      penjelasan: `
Ini bug klasik Python yang wajib kamu kuasai sebagai asprak, karena gejalanya sangat membingungkan bagi mahasiswa.

Variabel yang ditulis **langsung di dalam class** (bukan di dalam \`__init__\`) menjadi **class attribute** — hanya ada **satu** salinan yang dipakai bersama oleh semua object. Jadi \`a = Salah(); b = Salah(); a.daftar.append(1)\` membuat \`b.daftar\` **ikut berisi** \`[1]\`, padahal terasa seperti dua benda terpisah.

Sedangkan yang ditulis dengan \`self.\` di dalam \`__init__\` menjadi **instance attribute** — dibuat baru setiap kali object dibuat, sehingga tiap object punya miliknya sendiri.

Aturan amannya: **semua data yang seharusnya berbeda antar object wajib ditulis dengan \`self.\` di dalam \`__init__\`.** Class attribute hanya cocok untuk hal yang memang sengaja dibagi bersama, misalnya penghitung jumlah object atau konstanta seperti \`NAMA_KAMPUS\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

public class Mahasiswa {
    // Attribute
    public string Nama;
    public int    Umur;
    public double Ipk;

    // Method
    public void Tampilkan() {
        Console.WriteLine($"{Nama} ({Umur} th) - IPK {Ipk:F2}");
    }

    public string Predikat() {
        if (Ipk >= 3.5) return "Cumlaude";
        if (Ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }

    public void SetNama(string nama) {
        this.Nama = nama;              // this membedakan attribute dan parameter
    }
}
// Perhatikan: TIDAK ada titik koma setelah kurung tutup class —
// berbeda dengan C++ yang mewajibkannya.

class Program {
    static void Main() {
        // Object WAJIB dibuat dengan new — beda dengan C++
        Mahasiswa a = new Mahasiswa();
        a.Nama = "Budi";
        a.Umur = 20;
        a.Ipk  = 3.75;

        // Object initializer: cara ringkas khas C#
        Mahasiswa b = new Mahasiswa { Nama = "Ani", Umur = 21, Ipk = 3.20 };

        a.Tampilkan();
        b.Tampilkan();

        Console.WriteLine($"\n{a.Nama} -> {a.Predikat()}");
        Console.WriteLine($"{b.Nama} -> {b.Predikat()}");

        // Object adalah TIPE RUJUKAN: c dan a menunjuk object yang SAMA
        Mahasiswa c = a;
        c.Umur = 99;
        Console.WriteLine($"\nsetelah c.Umur = 99, a.Umur = {a.Umur}");
        Console.WriteLine("-> di C++, 'Mahasiswa c = a;' akan MENYALIN objectnya");

        // Karena rujukan, aksesnya selalu dengan titik — tidak ada ->
        Console.WriteLine($"\nselalu pakai titik : {a.Nama}");
        Console.WriteLine("(di C++, pointer memakai -> )");
    }
}`,

    java: String.raw`public class Mahasiswa {
    // Attribute
    String nama;
    int    umur;
    double ipk;

    // Method
    void tampilkan() {
        System.out.printf("%s (%d th) - IPK %.2f%n", nama, umur, ipk);
    }

    String predikat() {
        if (ipk >= 3.5) return "Cumlaude";
        if (ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }

    void setNama(String nama) {
        this.nama = nama;              // this membedakan attribute dan parameter
    }
    // TIDAK ada titik koma setelah kurung tutup class

    public static void main(String[] args) {
        // Object WAJIB dibuat dengan new
        Mahasiswa a = new Mahasiswa();
        a.nama = "Budi";
        a.umur = 20;
        a.ipk  = 3.75;

        Mahasiswa b = new Mahasiswa();
        b.setNama("Ani");
        b.umur = 21;
        b.ipk  = 3.20;

        a.tampilkan();
        b.tampilkan();

        System.out.println("\n" + a.nama + " -> " + a.predikat());
        System.out.println(b.nama + " -> " + b.predikat());

        // Object adalah RUJUKAN: c dan a menunjuk object yang SAMA
        Mahasiswa c = a;
        c.umur = 99;
        System.out.println("\nsetelah c.umur = 99, a.umur = " + a.umur);
        System.out.println("-> di C++, 'Mahasiswa c = a;' akan MENYALIN objectnya");

        // Object yang belum diisi bernilai null
        Mahasiswa kosong = null;
        try {
            kosong.tampilkan();
        } catch (NullPointerException e) {
            System.out.println("\nmemanggil method dari null -> NullPointerException");
        }

        System.out.println("\nDi Java, SEMUA kode harus berada di dalam class.");
        System.out.println("Tidak ada fungsi lepas seperti di C++ dan Python.");
    }
}`,

    js: String.raw`class Mahasiswa {
    // Di JavaScript, attribute biasanya dibuat di dalam constructor
    constructor(nama, umur, ipk) {
        this.nama = nama;
        this.umur = umur;
        this.ipk = ipk;
    }

    // Method: tanpa kata 'function'
    tampilkan() {
        console.log(this.nama + " (" + this.umur + " th) - IPK " + this.ipk);
    }

    predikat() {
        if (this.ipk >= 3.5) return "Cumlaude";
        if (this.ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }
}
// TIDAK ada titik koma setelah kurung tutup class

const a = new Mahasiswa("Budi", 20, 3.75);
const b = new Mahasiswa("Ani", 21, 3.20);

a.tampilkan();
b.tampilkan();

console.log("\n" + a.nama + " -> " + a.predikat());
console.log(b.nama + " -> " + b.predikat());

// Object adalah RUJUKAN
const c = a;
c.umur = 99;
console.log("\nsetelah c.umur = 99, a.umur =", a.umur);

// ---------- KHAS JAVASCRIPT ----------
// 1. Attribute bisa DITAMBAH kapan saja, bahkan setelah object dibuat
a.jurusan = "Informatika";
console.log("\nattribute baru ditambah :", a.jurusan);
console.log("-> mustahil di C++, Java, dan C#");

// 2. Attribute bisa DIHAPUS
delete a.jurusan;
console.log("setelah delete           :", a.jurusan, " <- undefined");

// 3. class sebenarnya hanyalah penulisan yang lebih enak dibaca
//    di atas mekanisme prototype
console.log("\ntypeof Mahasiswa :", typeof Mahasiswa, " <- ternyata fungsi!");
console.log("class di JavaScript adalah 'gula sintaksis' di atas prototype.");

// Cara lama sebelum ada class (masih sering ditemui di kode lama)
function MahasiswaLama(nama) {
    this.nama = nama;
}
MahasiswaLama.prototype.sapa = function () {
    console.log("  halo, saya " + this.nama);
};
console.log("\ncara lama (prototype):");
new MahasiswaLama("Citra").sapa();

// 4. Object literal: sering dipakai tanpa class sama sekali
const sederhana = {
    nama: "Dedi",
    sapa() { console.log("  halo, saya " + this.nama); }
};
console.log("\nobject literal tanpa class:");
sederhana.sapa();`,

    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

class Mahasiswa {
public:                       // tanpa ini semua anggota jadi private
    string nama;              // attribute
    int    umur;
    float  ipk;

    void tampilkan() {        // method
        cout << nama << " (" << umur << " th) - IPK " << ipk << endl;
    }

    string predikat() {
        if (ipk >= 3.5) return "Cumlaude";
        if (ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }

    void setNama(string nama) {
        this->nama = nama;    // kiri = attribute, kanan = parameter
    }
};                            // titik koma WAJIB

int main() {
    Mahasiswa a;              // object pertama
    a.nama = "Budi";
    a.umur = 20;
    a.ipk  = 3.75;

    Mahasiswa b;              // object kedua, datanya terpisah
    b.setNama("Ani");
    b.umur = 21;
    b.ipk  = 3.20;

    a.tampilkan();
    b.tampilkan();

    cout << a.nama << " -> " << a.predikat() << endl;
    cout << b.nama << " -> " << b.predikat() << endl;

    Mahasiswa *p = &a;        // lewat pointer memakai ->
    p->umur = 22;
    cout << "setelah lewat pointer: ";
    a.tampilkan();

    return 0;
}`,

    python: String.raw`class Mahasiswa:
    kampus = "Universitas Contoh"      # class attribute: dipakai BERSAMA

    def __init__(self, nama, umur, ipk):
        # instance attribute: milik masing-masing object
        self.nama = nama
        self.umur = umur
        self.ipk  = ipk

    def tampilkan(self):               # self wajib jadi parameter pertama
        print(f"{self.nama} ({self.umur} th) - IPK {self.ipk}")

    def predikat(self):
        if self.ipk >= 3.5:
            return "Cumlaude"
        if self.ipk >= 3.0:
            return "Sangat Baik"
        return "Baik"


a = Mahasiswa("Budi", 20, 3.75)        # __init__ jalan otomatis di sini
b = Mahasiswa("Ani", 21, 3.20)         # object kedua, datanya terpisah

a.tampilkan()
b.tampilkan()

print(a.nama, "->", a.predikat())
print(b.nama, "->", b.predikat())

# dua penulisan di bawah ini benar-benar sama artinya
a.tampilkan()
Mahasiswa.tampilkan(a)                 # inilah wujud asli dari self

# class attribute dipakai bersama oleh semua object
print(a.kampus, "|", b.kampus)`,

    c: String.raw`/* C TIDAK punya class. Ini padanan manualnya, supaya terlihat
   apa yang sebenarnya dikerjakan sebuah class di balik layar. */
#include <stdio.h>
#include <string.h>

/* "Class" tanpa method: struct hanya menyatukan datanya saja */
struct Mahasiswa {
    char  nama[50];
    int   umur;
    float ipk;
};

/* "Method" terpaksa ditulis sebagai fungsi lepas, dan objectnya
   harus dikirim manual — inilah yang di C++/Python disebut this/self. */
void tampilkan(struct Mahasiswa *m) {
    printf("%s (%d th) - IPK %.2f\n", m->nama, m->umur, m->ipk);
}

const char *predikat(struct Mahasiswa *m) {
    if (m->ipk >= 3.5) return "Cumlaude";
    if (m->ipk >= 3.0) return "Sangat Baik";
    return "Baik";
}

int main(void) {
    struct Mahasiswa a;
    strcpy(a.nama, "Budi");
    a.umur = 20;
    a.ipk  = 3.75;

    /* Perhatikan: objectnya harus disebut DUA kali —
       sekali sebagai pemilik data, sekali sebagai argumen. */
    tampilkan(&a);
    printf("%s -> %s\n", a.nama, predikat(&a));

    return 0;
}`
  },

  output: `Budi (20 th) - IPK 3.75
Ani (21 th) - IPK 3.2
Budi -> Cumlaude
Ani -> Sangat Baik
setelah lewat pointer: Budi (22 th) - IPK 3.75`,

  kesalahanUmum: [
    {
      salah: 'Lupa titik koma setelah kurung tutup class C++: `}` bukan `};`',
      kenapa: 'Kompiler menganggap definisi class-nya belum selesai, sehingga ia terus membaca ke baris berikutnya. Akibatnya pesan error muncul di **baris setelahnya** — sering di `int main()` — dan terasa membingungkan karena baris itu tampak baik-baik saja.',
      benar: 'Tutup dengan `};`. Kalau muncul error aneh tepat di baris setelah sebuah class, **periksa titik komanya lebih dulu** sebelum mencari yang lain.'
    },
    {
      salah: 'Di Python, mendefinisikan method tanpa `self`: `def tampilkan():`',
      kenapa: 'Saat dipanggil lewat `mhs.tampilkan()`, Python tetap mengirim object sebagai argumen pertama. Karena method-nya tidak menyediakan parameter untuk menampung, muncul `TypeError: tampilkan() takes 0 positional arguments but 1 was given` — pesan yang terasa aneh karena mahasiswa merasa tidak mengirim argumen apa pun.',
      benar: 'Tulis `def tampilkan(self):`. Ingat: **argumen "tak terlihat" itu selalu ada**, karena `mhs.tampilkan()` sebenarnya adalah `Mahasiswa.tampilkan(mhs)`.'
    },
    {
      salah: 'Di Python, menaruh data object langsung di badan class: `class M: daftar = []`',
      kenapa: 'Itu membuat **class attribute** yang salinannya cuma satu dan dipakai bersama semua object. Menambah data lewat satu object membuatnya ikut muncul di object lain — gejalanya membingungkan karena terasa seperti data "bocor" antar object.',
      benar: 'Taruh di dalam constructor dengan `self.`: `def __init__(self): self.daftar = []`. Simpan di level class **hanya** untuk hal yang memang sengaja dibagi bersama, misal konstanta `NAMA_KAMPUS`.'
    },
    {
      salah: 'Mengira class dan object itu hal yang sama.',
      kenapa: 'Class hanyalah rancangan dan belum menyimpan data apa pun; object-lah yang nyata dan menempati memori. Kesalahpahaman ini membuat mahasiswa mencoba mengisi attribute langsung ke class-nya, atau bingung kenapa dua object bisa punya nilai berbeda padahal class-nya satu.',
      benar: 'Tegaskan dengan kalimat kunci: **satu class, banyak object.** `Mahasiswa` adalah jenisnya, sedangkan `a` dan `b` adalah orangnya — masing-masing membawa datanya sendiri.'
    },
    {
      salah: 'Di C++, langsung menulis attribute tanpa `public:` lalu mengaksesnya dari `main`.',
      kenapa: 'Anggota `class` bawaannya **private**, sehingga `a.nama = "Budi";` ditolak dengan pesan seperti `error: \'nama\' is private within this context`. Banyak mahasiswa mengira ada salah ketik, padahal masalahnya hak akses.',
      benar: 'Tambahkan `public:` sebelum anggota yang ingin diakses dari luar. Ingat pula perbedaannya: `struct` bawaannya public, `class` bawaannya private — itulah satu-satunya beda keduanya di C++.'
    }
  ],

  analogi: `
Pakai analogi **cetakan kue**, dan bawa benda nyata kalau memungkinkan — cetakan kue, atau bahkan cetakan es batu dari kulkas.

Alurnya begini: tunjukkan cetakannya, lalu bilang *"ini class — bentuknya sudah ditentukan, tapi ini bukan kue dan tidak bisa dimakan."* Setelah itu tunjukkan beberapa kue hasil cetakannya: *"ini object. Bentuknya sama karena cetakannya sama, tapi rasanya bisa cokelat, bisa keju."* Attribute adalah rasanya, method adalah apa yang bisa dilakukan padanya.

Pertanyaan pancingan yang efektif: *"Kalau saya bikin 100 kue, cetakannya perlu 100 juga?"* Jawabannya tidak — dan dari situ mahasiswa paham bahwa **satu class bisa melahirkan object sebanyak apa pun.**

Untuk \`self\` di Python, pakai analogi **absensi**. Semua mahasiswa memakai formulir yang sama, tapi tiap formulir harus dituliskan namanya sendiri. \`self\` adalah cara object berkata *"yang sedang diisi ini punya SAYA, bukan punya teman sebelah."*

Analogi terkuat untuk kelas praktikum: mulai dari kode **tanpa** class — \`nama1\`, \`umur1\`, \`nama2\`, \`umur2\` — lalu minta mereka menambah mahasiswa kelima. Setelah mereka merasakan sendiri repotnya, baru tunjukkan versi class-nya. **Rasa sakit dulu, solusi kemudian** — cara ini membuat OOP terasa sebagai jawaban atas masalah nyata, bukan aturan yang harus dihafal.
`,

  latihan: [
    'Buat class `Buku` dengan attribute `judul`, `penulis`, dan `tahun`, serta method `tampilkan()`. Buat dua object berbeda dan tampilkan keduanya. Kerjakan di C++ dan Python, lalu bandingkan bagian mana yang berbeda.',
    'Tambahkan method `umurBuku()` pada class `Buku` yang mengembalikan selisih tahun sekarang dengan tahun terbit. Perhatikan: kenapa method ini tidak perlu parameter tahun terbit, padahal ia membutuhkannya?',
    'Di Python, buat class `Keranjang` dengan attribute `isi` berupa list. Sengaja tulis `isi = []` di badan class, buat dua object, lalu tambahkan barang ke salah satunya. Amati apa yang terjadi pada object satunya, jelaskan sebabnya, lalu perbaiki.',
    'Buat class `PersegiPanjang` dengan attribute `panjang` dan `lebar`, serta method `luas()` dan `keliling()`. Di C++, tambahkan constructor agar object bisa dibuat langsung dengan `PersegiPanjang p(5, 3);`.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang beda class dan object memakai satu benda nyata di sekitarmu. Syaratnya, jangan sekali pun menyebut kata "instansiasi" atau "abstraksi".'
  ]
});

TOPICS.push({
  id: 'attribute-method',
  judul: 'Attribute & Method',
  kategori: 'oop',
  tag: ['attribute', 'method', 'static', 'class attribute', 'instance'],
  ringkas: 'Isi sebuah class: datanya dan perilakunya — plus beda milik object dan milik bersama.',

  fungsi: `**Menentukan apa yang diketahui sebuah objek dan apa yang bisa dilakukannya.**

Terpakai di:

- **Merancang antarmuka kelas** — apa yang boleh dipanggil dari luar
- **Menyembunyikan kerumitan** — pemakai kelasmu tidak perlu tahu isinya
- **Mengubah implementasi tanpa merusak pemakainya** — selama methodnya tetap sama
- **Membaca dokumentasi pustaka** — daftar method adalah kontraknya

Kaidah yang paling berguna: **objek yang baik menyembunyikan datanya dan menawarkan perilaku**.

Alih-alih pemakai mengambil daftar nilai lalu menghitung sendiri, ia cukup memanggil \`hitungIPK()\`. Kalau nanti rumusnya berubah, hanya satu tempat yang disunting.`,

  praktik: {
    tujuan: 'Kamu bisa merancang kelas yang menawarkan perilaku, bukan sekadar tempat menyimpan data.',
    alat: [
      'Python 3, Java, atau C++'
    ],
    langkah: [
      { judul: 'Daftar dulu apa yang DILAKUKAN, bukan apa yang disimpan',
        isi: `Untuk kelas Mahasiswa, tulis: mendaftar mata kuliah, menghitung IPK, memeriksa syarat skripsi.

**Baru** setelah itu tanyakan data apa yang dibutuhkan untuk melakukannya.

Urutan ini menghasilkan kelas yang jauh lebih berguna daripada mulai dari daftar kolom.` },
      { judul: 'Kenali tanda kelas yang cuma tempat data',
        isi: `Kalau kelasmu hanya berisi atribut plus getter dan setter untuk semuanya, ia bukan objek — ia struct dengan langkah tambahan.

Tandanya: pemakainya selalu mengambil datanya lalu menghitung sendiri di luar.

Perbaikannya: **pindahkan perhitungan itu ke dalam kelas**.` },
      { judul: 'Tulis method yang bermakna',
        isi: `Bandingkan:

- \`m.setStatus("aktif")\` — pemanggil harus tahu nilai apa yang sah
- \`m.aktifkan()\` — kelasnya yang tahu, dan bisa memeriksa syaratnya

Yang kedua lebih sulit dipakai salah, dan itu ukuran rancangan yang baik.` },
      { judul: 'Pakai property di Python',
        isi: `Python tidak butuh getter dan setter untuk semuanya. Akses langsung sudah cukup.

Kalau nanti butuh pemeriksaan, ubah jadi \`@property\` **tanpa** mengubah kode pemanggilnya:

- \`@property def ipk(self): return self._hitung()\`

Pemakai tetap menulis \`m.ipk\`, dan tidak perlu tahu ia kini dihitung.` },
      { judul: 'Bedakan method biasa, static, dan class',
        isi: `- **method biasa** — butuh objek, memakai datanya
- **staticmethod** — tidak butuh objek maupun kelas, cuma dikelompokkan di situ
- **classmethod** — butuh kelasnya, sering dipakai sebagai pembuat objek alternatif

Contoh classmethod yang berguna: \`Mahasiswa.dari_csv(baris)\` yang membuat objek dari satu baris berkas.` },
      { judul: 'Jaga jumlah method tetap wajar',
        isi: `Kelas dengan tiga puluh method hampir pasti mengerjakan lebih dari satu hal.

Cari kelompok method yang selalu dipakai bersama dan memakai atribut yang sama — itu calon kelas terpisah.

Ini prinsip yang akan kamu temui lagi sebagai **single responsibility** di Rekayasa Perangkat Lunak.` }
    ],
    cek: [
      `Kelasmu punya sedikitnya satu method yang benar-benar menghitung, bukan cuma mengembalikan atribut`,
      'Pemakai kelasmu tidak perlu tahu bagaimana IPK dihitung',
      'Tidak ada kelas di kodemu yang isinya cuma getter dan setter'
    ]
  },

  konsep: `
Sebuah class hanya berisi dua macam anggota, dan memisahkan keduanya adalah kunci memahami OOP:

- **Attribute** — **datanya**. Disebut juga *field*, *property*, atau *member variable*. Contohnya \`nama\`, \`umur\`, \`ipk\`.
- **Method** — **perilakunya**. Yaitu fungsi yang hidup di dalam class, misalnya \`tampilkan()\` atau \`hitungPredikat()\`.

Cara membedakannya sederhana: **attribute menjawab "punya apa", method menjawab "bisa apa".** Mobil **punya** warna dan kecepatan; mobil **bisa** maju dan mengerem.

Yang membuat method berbeda dari fungsi biasa: ia **otomatis bisa mengakses attribute object-nya sendiri** tanpa perlu dikirim sebagai parameter. Method \`tampilkan()\` tahu sendiri nama siapa yang harus ditampilkan, karena ia dipanggil dari sebuah object tertentu.

Selanjutnya ada pembagian kedua yang sering membingungkan, yaitu **milik siapa** anggota itu:

- **Instance member** — **milik masing-masing object**. Tiap object punya salinannya sendiri. Mengubah milik satu object tidak memengaruhi yang lain. Ini yang paling sering dipakai.
- **Static member** (di Python disebut **class attribute**) — **hanya ada satu salinan yang dipakai bersama** seluruh object. Berguna untuk hal yang memang berlaku umum: menghitung berapa object sudah dibuat, atau menyimpan konstanta seperti nama kampus.

Kalau kamu bisa menjawab pertanyaan *"apakah nilai ini seharusnya berbeda untuk tiap object?"*, kamu sudah bisa memilih dengan benar. Kalau jawabannya ya, jadikan instance member. Kalau tidak, static bisa dipertimbangkan.

Kesalahan memilih di sini menghasilkan bug yang gejalanya sangat membingungkan — data terasa "bocor" antar object — dan itu akan kita bedah di bagian kesalahan umum.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    string nama;              // ATTRIBUTE: datanya\n    int    umur;\n\n    void tampilkan() {        // METHOD: perilakunya\n        cout << nama;         // langsung pakai, tanpa parameter\n    }\n};',
      penjelasan: `
Perhatikan baris \`cout << nama;\` di dalam method. Dari mana \`nama\` itu berasal?

Ia **bukan** variabel lokal, dan **bukan** parameter. Ia adalah **attribute milik object yang sedang memanggil method ini**. Method secara otomatis punya akses ke seluruh attribute object-nya tanpa perlu dikirimkan.

Inilah perbedaan mendasar method dengan fungsi biasa. Bandingkan dengan versi C:

- Fungsi biasa: \`void tampilkan(Mahasiswa *m) { printf("%s", m->nama); }\` — object harus **dikirim manual**
- Method: \`void tampilkan() { cout << nama; }\` — object **sudah menempel dengan sendirinya**

Jadi ketika kamu menulis \`budi.tampilkan()\`, method itu tahu bahwa \`nama\` yang dimaksud adalah \`nama\` milik \`budi\`. Object-nya dikirim diam-diam di balik layar.

Mekanisme "diam-diam" itulah yang di C++ bernama **\`this\`** dan di Python bernama **\`self\`** — dan akan kita bedah tuntas di topik tersendiri.
`
    },
    {
      bahasa: 'python',
      kode: 'class Mahasiswa:\n    def __init__(self, nama):\n        self.nama = nama      # ATTRIBUTE object -> pakai self.\n\n    def tampilkan(self):\n        judul = "Data:"       # variabel LOKAL -> tanpa self.\n        print(judul, self.nama)',
      penjelasan: `
Di Python, **awalan \`self.\` adalah pembeda antara attribute dan variabel lokal**, dan ini sumber kebingungan nomor satu bagi pemula.

- **\`self.nama\`** → attribute yang **menempel pada object** dan tetap hidup setelah method selesai
- **\`judul\`** → variabel lokal biasa yang **langsung hilang** begitu method selesai dijalankan

Konsekuensinya nyata: kalau di dalam \`__init__\` kamu menulis \`nama = nama\` (tanpa \`self.\`), datanya tidak pernah tersimpan ke object. Programnya **tidak error** — attribute-nya sekadar tidak pernah ada, lalu muncul \`AttributeError\` belakangan saat hendak dibaca.

Karena itu aturannya tegas: **semua data yang harus bertahan setelah method selesai wajib ditulis dengan \`self.\`**

Berbeda dengan C++, Python tidak mendaftarkan attribute di awal class. Attribute **tercipta pada saat pertama kali ditugaskan**, biasanya di dalam \`__init__\`. Itu sebabnya kamu bisa menambahkan attribute baru kapan saja — luwes, tapi juga berarti salah ketik nama attribute tidak akan ketahuan oleh kompiler.
`
    },
    {
      bahasa: 'python',
      kode: 'class Mahasiswa:\n    kampus = "Univ Contoh"    # CLASS attribute: dipakai BERSAMA\n    jumlah = 0                # cocok untuk pencacah\n\n    def __init__(self, nama):\n        self.nama = nama      # INSTANCE attribute: milik sendiri\n        Mahasiswa.jumlah += 1 # ubah lewat nama CLASS-nya',
      penjelasan: `
Letak penulisannya menentukan kepemilikannya, dan bedanya besar.

- Ditulis **langsung di badan class** → **class attribute**, satu salinan dipakai bersama semua object
- Ditulis dengan **\`self.\` di dalam method** → **instance attribute**, tiap object punya sendiri

Perhatikan \`Mahasiswa.jumlah += 1\` yang memakai **nama class**, bukan \`self.jumlah += 1\`. Ini penting dan sering salah.

Kalau ditulis \`self.jumlah += 1\`, Python membacanya sebagai \`self.jumlah = self.jumlah + 1\`. Sisi kanan memang membaca nilai class attribute, tapi sisi kiri **membuat instance attribute baru** yang menutupi class attribute-nya. Akibatnya tiap object punya pencacah sendiri yang selalu bernilai 1 — dan pencacah bersamanya tidak pernah bertambah.

Ini akibat dari aturan pencarian Python: saat **membaca** \`self.x\`, ia mencari di instance dulu lalu naik ke class. Tapi saat **menulis** \`self.x = ...\`, ia **selalu** membuat atau mengubah di tingkat instance.

Aturan amannya: **baca boleh lewat \`self\`, tapi menulis class attribute harus lewat nama class-nya.**
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    static int jumlah;        // deklarasi saja di dalam class\n};\n\nint Mahasiswa::jumlah = 0;    // definisi WAJIB di luar class',
      penjelasan: `
Static member di C++ punya keanehan yang hampir pasti membuat mahasiswa tersandung: **ia harus ditulis dua kali.**

Baris di dalam class hanyalah **deklarasi** — sekadar pemberitahuan bahwa anggota ini ada. Memorinya belum dipesan sama sekali.

Baris di luar class barulah **definisi** yang benar-benar menyediakan memorinya. Tanpa baris ini, program berhasil dikompilasi tapi **gagal saat linking** dengan pesan seperti *undefined reference to Mahasiswa::jumlah* — pesan yang membingungkan karena tidak menunjuk baris mana pun di kodemu.

Kenapa harus begitu? Karena definisi class biasanya diletakkan di berkas header yang di-\`include\` di banyak tempat. Kalau memorinya dipesan di situ, tiap berkas akan membuat salinannya sendiri dan terjadi bentrok. Dengan memisahkan definisinya, memori itu dijamin **hanya dibuat satu kali** di seluruh program.

Perhatikan penulisannya: \`int Mahasiswa::jumlah = 0;\` — diawali tipenya, lalu nama class, lalu \`::\`, dan **tanpa** kata \`static\` lagi.

Sejak C++17 ada jalan pintas dengan \`inline static int jumlah = 0;\` yang cukup ditulis sekali di dalam class.
`
    },
    {
      bahasa: 'python',
      kode: 'class Kalkulator:\n    @staticmethod\n    def tambah(a, b):        # tidak perlu self — tidak menyentuh object\n        return a + b\n\nKalkulator.tambah(2, 3)      # dipanggil lewat CLASS, tanpa object',
      penjelasan: `
Tidak semua method membutuhkan object. Kalau isinya **tidak menyentuh \`self\` sama sekali**, method itu sebenarnya cuma fungsi biasa yang kebetulan diletakkan di dalam class.

Untuk kasus seperti itu, tandai dengan **\`@staticmethod\`** supaya tidak perlu menulis \`self\`. Method-nya lalu bisa dipanggil langsung lewat nama class, tanpa membuat object sama sekali.

Kapan ini berguna? Untuk fungsi bantu yang **secara logis termasuk kelompok class itu** tapi tidak bergantung pada data object mana pun — misalnya \`Tanggal.apakahKabisat(2024)\` atau fungsi konversi satuan.

Ada satu lagi yang sering tertukar dengannya, yaitu **\`@classmethod\`**. Bedanya, classmethod menerima **class-nya** sebagai parameter pertama (biasanya dinamai \`cls\`), bukan object. Ia berguna untuk membuat cara alternatif membuat object, misalnya \`Mahasiswa.dariTeks("Budi,20")\`.

Ringkasnya ada tiga: **method biasa** butuh object (\`self\`), **classmethod** butuh class (\`cls\`), dan **staticmethod** tidak butuh keduanya.

Di C++, padanannya adalah **\`static\` method** yang juga tidak punya \`this\` dan hanya boleh mengakses anggota static.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    string nama;\n    void tampilkan() const {   // const = berjanji TIDAK mengubah apa pun\n        cout << nama;\n        // nama = "X";           <- ditolak kompiler\n    }\n};',
      penjelasan: `
Kata \`const\` di **belakang** daftar parameter adalah janji: *"method ini hanya membaca, tidak akan mengubah attribute apa pun."*

Kompiler menegakkan janji itu. Setiap upaya mengubah attribute di dalam method \`const\` langsung ditolak saat kompilasi — jadi ini bukan sekadar dokumentasi, melainkan jaminan.

Kenapa ini penting? Karena object yang dideklarasikan \`const\` **hanya boleh memanggil method \`const\`**. Kalau method \`tampilkan()\` lupa diberi \`const\`, maka kode ini gagal dikompilasi:

\`const Mahasiswa m; m.tampilkan();\`

Hal yang sama terjadi saat object dikirim sebagai \`const Mahasiswa &\` — pola yang sangat lazim untuk menghindari penyalinan data besar. Karena itu **method yang sekadar membaca sebaiknya selalu diberi \`const\`.**

Perhatikan letaknya, karena dua posisi berbeda punya arti berbeda:

- \`const string nama;\` → **attribute**-nya yang tidak bisa diubah
- \`void tampilkan() const\` → **method**-nya yang berjanji tidak mengubah

Python tidak punya padanan untuk ini. Di sana, tidak ada cara memaksa sebuah method agar tidak mengubah object.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

public class Mahasiswa {
    // ---------- INSTANCE: milik masing-masing object ----------
    public string Nama;
    public int    Umur;

    // ---------- STATIC: dipakai BERSAMA semua object ----------
    public static int Jumlah = 0;
    public const string Kampus = "Universitas Contoh";   // const otomatis static

    public Mahasiswa(string nama, int umur) {
        Nama = nama;
        Umur = umur;
        Jumlah++;                        // pencacah bersama bertambah
    }

    // Method biasa: butuh object
    public void Tampilkan() {
        Console.WriteLine($"{Nama} ({Umur} th)");
    }

    public void UlangTahun() { Umur++; }

    // Static method: tidak punya this, hanya menyentuh anggota static
    public static void CetakJumlah() {
        Console.WriteLine($"Total mahasiswa : {Jumlah}");
        // Console.WriteLine(Nama);      <- ditolak: Nama milik object mana?
    }

    // Static method sebagai fungsi bantu
    public static bool IpkValid(double nilai) => nilai >= 0 && nilai <= 4.0;
}

class Program {
    static void Main() {
        Mahasiswa.CetakJumlah();         // dipanggil tanpa object sama sekali

        var a = new Mahasiswa("Budi", 20);
        var b = new Mahasiswa("Ani", 21);

        a.Tampilkan();
        b.Tampilkan();
        Mahasiswa.CetakJumlah();         // sekarang 2

        // Instance attribute terpisah untuk tiap object
        a.UlangTahun();
        Console.WriteLine("\nsetelah a ulang tahun:");
        a.Tampilkan();
        b.Tampilkan();                   // umur b TIDAK ikut berubah

        // Static diakses lewat nama CLASS, bukan lewat object
        Console.WriteLine($"\nkampus : {Mahasiswa.Kampus}");
        Console.WriteLine("-> di C#, a.Kampus DITOLAK kompiler.");
        Console.WriteLine("   (di Java, a.kampus masih boleh tapi tidak dianjurkan)");

        Console.WriteLine($"\nIpkValid(3.9) : {Mahasiswa.IpkValid(3.9)}");
        Console.WriteLine($"IpkValid(5.0) : {Mahasiswa.IpkValid(5.0)}");
    }
}`,

    java: String.raw`public class Mahasiswa {
    // ---------- INSTANCE: milik masing-masing object ----------
    String nama;
    int    umur;

    // ---------- STATIC: dipakai BERSAMA semua object ----------
    static int jumlah = 0;
    static final String KAMPUS = "Universitas Contoh";   // final = konstanta

    Mahasiswa(String nama, int umur) {
        this.nama = nama;
        this.umur = umur;
        jumlah++;                        // pencacah bersama bertambah
    }

    // Method biasa: butuh object
    void tampilkan() {
        System.out.println(nama + " (" + umur + " th)");
    }

    void ulangTahun() { umur++; }

    // Static method: tidak punya this
    static void cetakJumlah() {
        System.out.println("Total mahasiswa : " + jumlah);
        // System.out.println(nama);     <- ditolak: nama milik object mana?
    }

    static boolean ipkValid(double nilai) {
        return nilai >= 0 && nilai <= 4.0;
    }

    public static void main(String[] args) {
        cetakJumlah();                   // dipanggil tanpa object

        Mahasiswa a = new Mahasiswa("Budi", 20);
        Mahasiswa b = new Mahasiswa("Ani", 21);

        a.tampilkan();
        b.tampilkan();
        cetakJumlah();                   // sekarang 2

        // Instance attribute terpisah
        a.ulangTahun();
        System.out.println("\nsetelah a ulang tahun:");
        a.tampilkan();
        b.tampilkan();                   // umur b TIDAK ikut berubah

        System.out.println("\nkampus lewat class  : " + Mahasiswa.KAMPUS);
        System.out.println("kampus lewat object : " + a.KAMPUS + "  <- boleh, TAPI");
        System.out.println("  menyesatkan karena terlihat seperti milik object.");
        System.out.println("  Selalu akses static lewat nama class.");

        System.out.println("\nipkValid(3.9) : " + ipkValid(3.9));
        System.out.println("ipkValid(5.0) : " + ipkValid(5.0));

        // Kenapa main() harus static?
        System.out.println("\nCatatan: main() bersifat static karena dipanggil");
        System.out.println("sebelum object apa pun sempat dibuat.");
    }
}`,

    js: String.raw`class Mahasiswa {
    // ---------- STATIC: dipakai BERSAMA ----------
    static jumlah = 0;
    static KAMPUS = "Universitas Contoh";

    constructor(nama, umur) {
        // ---------- INSTANCE: milik masing-masing object ----------
        this.nama = nama;
        this.umur = umur;
        Mahasiswa.jumlah++;              // WAJIB lewat nama class, bukan this
    }

    tampilkan() {
        console.log(this.nama + " (" + this.umur + " th)");
    }

    ulangTahun() { this.umur++; }

    // Static method: tidak punya this milik object
    static cetakJumlah() {
        console.log("Total mahasiswa : " + Mahasiswa.jumlah);
    }

    static ipkValid(nilai) {
        return nilai >= 0 && nilai <= 4.0;
    }

    // Getter: dipanggil TANPA tanda kurung
    get ringkas() {
        return this.nama + "/" + this.umur;
    }
}

Mahasiswa.cetakJumlah();                 // tanpa object sama sekali

const a = new Mahasiswa("Budi", 20);
const b = new Mahasiswa("Ani", 21);

a.tampilkan();
b.tampilkan();
Mahasiswa.cetakJumlah();                 // sekarang 2

// Instance attribute terpisah
a.ulangTahun();
console.log("\nsetelah a ulang tahun:");
a.tampilkan();
b.tampilkan();                           // umur b TIDAK ikut berubah

console.log("\nkampus lewat class  :", Mahasiswa.KAMPUS);
console.log("kampus lewat object :", a.KAMPUS, " <- undefined!");
console.log("-> di JavaScript, static TIDAK bisa diakses lewat object");
console.log("   (di Java masih boleh, walau tidak dianjurkan)");

console.log("\ngetter (tanpa kurung) :", a.ringkas);
console.log("ipkValid(3.9) :", Mahasiswa.ipkValid(3.9));

// ---------- KHAS JAVASCRIPT ----------
// Method bisa ditambahkan ke object tertentu saja
a.sapaKhusus = function () { console.log("  halo dari Budi saja"); };
console.log("\nmethod khusus untuk satu object:");
a.sapaKhusus();
console.log("b punya sapaKhusus?", typeof b.sapaKhusus);

// Menambah method ke SELURUH class lewat prototype
Mahasiswa.prototype.sapa = function () {
    console.log("  halo, saya " + this.nama);
};
console.log("\nsetelah ditambah ke prototype, SEMUA object punya:");
a.sapa();
b.sapa();
console.log("-> mustahil di C++, Java, dan C#");`,

    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

class Mahasiswa {
public:
    /* ---------- ATTRIBUTE ---------- */
    string nama;                    // instance: milik masing-masing object
    int    umur;
    double ipk;

    static int jumlah;              // static: dipakai BERSAMA semua object
    static const string kampus;

    /* ---------- METHOD ---------- */
    Mahasiswa(string n, int u, double i) : nama(n), umur(u), ipk(i) {
        jumlah++;                   // pencacah bersama bertambah
    }

    // const = berjanji tidak mengubah attribute apa pun
    void tampilkan() const {
        cout << nama << " (" << umur << " th) - IPK " << ipk << endl;
    }

    string predikat() const {
        if (ipk >= 3.5) return "Cumlaude";
        if (ipk >= 3.0) return "Sangat Baik";
        return "Baik";
    }

    // method yang MENGUBAH attribute -> tidak boleh const
    void ulangTahun() {
        umur++;
    }

    // static method: tidak punya this, hanya boleh menyentuh anggota static
    static void cetakJumlah() {
        cout << "Total mahasiswa : " << jumlah << endl;
        // cout << nama;            <- ERROR: nama milik object mana?
    }
};

/* Static member WAJIB didefinisikan di luar class */
int Mahasiswa::jumlah = 0;
const string Mahasiswa::kampus = "Universitas Contoh";

int main() {
    Mahasiswa::cetakJumlah();       // dipanggil tanpa object sama sekali

    Mahasiswa a("Budi", 20, 3.75);
    Mahasiswa b("Ani", 21, 3.20);

    a.tampilkan();
    b.tampilkan();
    Mahasiswa::cetakJumlah();       // sekarang 2

    /* Instance attribute: terpisah untuk tiap object */
    a.ulangTahun();
    cout << "\nsetelah a ulang tahun:" << endl;
    a.tampilkan();
    b.tampilkan();                  // umur b TIDAK ikut berubah

    /* Static attribute: satu salinan, terlihat dari mana saja */
    cout << "\nkampus lewat object a : " << a.kampus << endl;
    cout << "kampus lewat class    : " << Mahasiswa::kampus << endl;

    cout << "\npredikat " << a.nama << " : " << a.predikat() << endl;

    /* const object hanya boleh memanggil method const */
    const Mahasiswa c("Citra", 19, 3.90);
    c.tampilkan();                  // boleh, karena tampilkan() const
    // c.ulangTahun();              <- ditolak kompiler

    return 0;
}`,

    python: String.raw`class Mahasiswa:
    # ---------- CLASS ATTRIBUTE: dipakai BERSAMA ----------
    kampus = "Universitas Contoh"
    jumlah = 0

    def __init__(self, nama, umur, ipk):
        # ---------- INSTANCE ATTRIBUTE: milik masing-masing ----------
        self.nama = nama
        self.umur = umur
        self.ipk = ipk
        Mahasiswa.jumlah += 1        # WAJIB lewat nama class, bukan self

    # ---------- METHOD BIASA: butuh object ----------
    def tampilkan(self):
        judul = "Data"               # variabel LOKAL, tanpa self
        print(f"{judul}: {self.nama} ({self.umur} th) - IPK {self.ipk}")

    def predikat(self):
        if self.ipk >= 3.5:
            return "Cumlaude"
        if self.ipk >= 3.0:
            return "Sangat Baik"
        return "Baik"

    def ulang_tahun(self):
        self.umur += 1               # mengubah attribute object ini saja

    # ---------- CLASSMETHOD: butuh class, bukan object ----------
    @classmethod
    def cetak_jumlah(cls):
        print(f"Total mahasiswa : {cls.jumlah}")

    @classmethod
    def dari_teks(cls, teks):
        """Cara alternatif membuat object: Mahasiswa.dari_teks('Budi,20,3.5')"""
        nama, umur, ipk = teks.split(",")
        return cls(nama, int(umur), float(ipk))

    # ---------- STATICMETHOD: tidak butuh keduanya ----------
    @staticmethod
    def ipk_valid(nilai):
        return 0.0 <= nilai <= 4.0


Mahasiswa.cetak_jumlah()             # tanpa object sama sekali

a = Mahasiswa("Budi", 20, 3.75)
b = Mahasiswa("Ani", 21, 3.20)

a.tampilkan()
b.tampilkan()
Mahasiswa.cetak_jumlah()             # sekarang 2

# Instance attribute terpisah untuk tiap object
a.ulang_tahun()
print("\nsetelah a ulang tahun:")
a.tampilkan()
b.tampilkan()                        # umur b TIDAK ikut berubah

# Class attribute: satu salinan, terlihat dari mana saja
print("\nkampus lewat object :", a.kampus)
print("kampus lewat class  :", Mahasiswa.kampus)

# classmethod sebagai cara alternatif membuat object
c = Mahasiswa.dari_teks("Citra,19,3.90")
c.tampilkan()

# staticmethod dipanggil tanpa object
print("\nIPK 3.9 valid?", Mahasiswa.ipk_valid(3.9))
print("IPK 5.0 valid?", Mahasiswa.ipk_valid(5.0))

# ---------- JEBAKAN: menulis class attribute lewat self ----------
class Salah:
    hitung = 0

    def naikkan(self):
        self.hitung += 1             # membuat instance attribute BARU!


x, y = Salah(), Salah()
x.naikkan(); x.naikkan(); y.naikkan()
print("\nSalah  -> x:", x.hitung, " y:", y.hitung, " class:", Salah.hitung)
print("  (pencacah bersamanya tidak pernah bertambah)")


class Benar:
    hitung = 0

    def naikkan(self):
        Benar.hitung += 1            # lewat nama CLASS


p, q = Benar(), Benar()
p.naikkan(); p.naikkan(); q.naikkan()
print("Benar  -> class:", Benar.hitung, " (3 kali dipanggil)")`,

    c: String.raw`/* C tidak punya class. Ini padanan manualnya, supaya terlihat apa
   yang sebenarnya dikerjakan attribute dan method di balik layar. */
#include <stdio.h>
#include <string.h>

/* "Attribute" -> struct hanya menyatukan datanya */
typedef struct {
    char   nama[50];
    int    umur;
    double ipk;
} Mahasiswa;

/* "Static attribute" -> variabel global; tidak terikat object mana pun */
int jumlahMahasiswa = 0;
const char *KAMPUS = "Universitas Contoh";

/* "Method" -> fungsi lepas, dan objectnya WAJIB dikirim manual.
   Parameter *m inilah yang di C++ bernama this, di Python bernama self. */
void tampilkan(const Mahasiswa *m) {
    printf("Data: %s (%d th) - IPK %.2f\n", m->nama, m->umur, m->ipk);
}

const char *predikat(const Mahasiswa *m) {
    if (m->ipk >= 3.5) return "Cumlaude";
    if (m->ipk >= 3.0) return "Sangat Baik";
    return "Baik";
}

/* Method yang mengubah -> tanpa const */
void ulangTahun(Mahasiswa *m) {
    m->umur++;
}

/* "Constructor" ditiru dengan fungsi pembuat */
Mahasiswa buat(const char *nama, int umur, double ipk) {
    Mahasiswa m;
    strcpy(m.nama, nama);
    m.umur = umur;
    m.ipk  = ipk;
    jumlahMahasiswa++;
    return m;
}

int main(void) {
    printf("Total mahasiswa : %d\n", jumlahMahasiswa);

    Mahasiswa a = buat("Budi", 20, 3.75);
    Mahasiswa b = buat("Ani", 21, 3.20);

    /* Perhatikan: objectnya harus disebut DUA kali —
       sekali sebagai pemilik, sekali sebagai argumen. */
    tampilkan(&a);
    tampilkan(&b);
    printf("Total mahasiswa : %d\n", jumlahMahasiswa);

    ulangTahun(&a);
    printf("\nsetelah a ulang tahun:\n");
    tampilkan(&a);
    tampilkan(&b);              /* umur b tidak ikut berubah */

    printf("\nkampus : %s\n", KAMPUS);
    printf("predikat %s : %s\n", a.nama, predikat(&a));

    return 0;
}`
  },

  output: `Total mahasiswa : 0
Data: Budi (20 th) - IPK 3.75
Data: Ani (21 th) - IPK 3.2
Total mahasiswa : 2

setelah a ulang tahun:
Data: Budi (21 th) - IPK 3.75
Data: Ani (21 th) - IPK 3.2

kampus lewat object : Universitas Contoh
kampus lewat class  : Universitas Contoh
Data: Citra (19 th) - IPK 3.9

IPK 3.9 valid? True
IPK 5.0 valid? False

Salah  -> x: 2  y: 1  class: 0
  (pencacah bersamanya tidak pernah bertambah)
Benar  -> class: 3  (3 kali dipanggil)`,

  kesalahanUmum: [
    {
      salah: 'Di Python, menulis `nama = nama` di dalam `__init__` tanpa `self.`',
      kenapa: 'Yang tercipta hanyalah variabel lokal yang langsung hilang begitu `__init__` selesai. Attribute-nya tidak pernah ada. Program **tidak error** saat itu juga — barulah muncul `AttributeError` belakangan ketika attribute itu hendak dibaca, sehingga penyebabnya terasa jauh dari gejalanya.',
      benar: 'Selalu tulis `self.nama = nama`. Aturannya: **semua data yang harus bertahan setelah method selesai wajib memakai `self.`**'
    },
    {
      salah: 'Menaikkan pencacah bersama lewat `self.jumlah += 1`',
      kenapa: 'Python membacanya sebagai `self.jumlah = self.jumlah + 1`. Sisi kanan memang membaca class attribute, tapi sisi kiri **membuat instance attribute baru** yang menutupinya. Akibatnya tiap object punya pencacah sendiri yang selalu bernilai 1, dan pencacah bersamanya tidak pernah bertambah.',
      benar: 'Tulis lewat nama class: `Mahasiswa.jumlah += 1`, atau di dalam classmethod pakai `cls.jumlah += 1`. Ingat: **membaca boleh lewat `self`, menulis class attribute harus lewat nama class.**'
    },
    {
      salah: 'Di Python, menaruh list sebagai class attribute: `class M: daftar = []`',
      kenapa: 'Hanya ada **satu** list yang dipakai bersama semua object. Menambah data lewat satu object membuatnya ikut muncul di object lain — gejalanya membingungkan karena terasa seperti data bocor antar object. Jebakan ini lebih berbahaya pada tipe *mutable* seperti list dan dict.',
      benar: 'Taruh di dalam `__init__` dengan `self.daftar = []` agar tiap object mendapat list baru. Class attribute hanya untuk yang memang sengaja dibagi bersama, seperti konstanta.'
    },
    {
      salah: 'Di C++, lupa mendefinisikan static member di luar class.',
      kenapa: 'Baris di dalam class hanyalah deklarasi tanpa memori. Programnya berhasil dikompilasi tapi **gagal saat linking** dengan pesan *undefined reference* — dan pesan itu tidak menunjuk baris mana pun di kodemu, sehingga sangat membingungkan bagi pemula.',
      benar: 'Tambahkan `int Mahasiswa::jumlah = 0;` di luar class, tanpa kata `static`. Sejak C++17 bisa dipersingkat dengan `inline static int jumlah = 0;` di dalam class.'
    },
    {
      salah: 'Di C++, mengakses attribute biasa dari dalam static method.',
      kenapa: 'Static method **tidak punya `this`** karena ia tidak terikat object mana pun. Pertanyaannya jadi tidak terjawab: `nama` milik object yang mana? Kompiler menolaknya dengan pesan tentang *invalid use of member in static member function*.',
      benar: 'Static method hanya boleh menyentuh anggota static. Kalau memang butuh data object, jadikan method biasa, atau kirim object-nya sebagai parameter.'
    },
    {
      salah: 'Lupa memberi `const` pada method yang sekadar membaca.',
      kenapa: 'Object yang dideklarasikan `const` — atau dikirim sebagai `const Mahasiswa &` untuk menghindari penyalinan — **hanya boleh memanggil method `const`**. Tanpa itu, kode yang tampak wajar seperti `void cetak(const Mahasiswa &m) { m.tampilkan(); }` gagal dikompilasi.',
      benar: 'Beri `const` pada semua method yang tidak mengubah attribute: `void tampilkan() const { ... }`. Ini kebiasaan yang layak ditanamkan sejak awal di C++.'
    }
  ],

  analogi: `
Pakai analogi **mobil**, dan pertahankan sepanjang penjelasan.

**Attribute adalah "punya apa"**: warna, merek, kecepatan saat ini, sisa bensin. **Method adalah "bisa apa"**: maju, mengerem, membunyikan klakson. Minta mahasiswa menyebutkan lima attribute dan lima method dari benda di sekitar mereka — biasanya langsung bisa, dan pembagiannya jadi melekat tanpa perlu definisi formal.

Untuk **beda instance dan static**, lanjutkan analogi yang sama. **Warna** itu instance attribute — tiap mobil bisa berbeda. Sedangkan **jumlah roda pada model tertentu** atau **nama pabriknya** itu static — berlaku sama untuk semua unit.

Pertanyaan pemandu yang selalu berhasil: *"kalau saya ubah nilai ini pada satu mobil, apakah mobil lain ikut berubah?"* Kalau jawabannya tidak, itu instance. Kalau iya, itu static.

Untuk **method yang otomatis tahu object-nya**, pakai peragaan sederhana. Tanya: *"kalau saya bilang 'tekan klakson', klakson mobil siapa yang bunyi?"* Jawabannya: mobil yang sedang kamu naiki. Method \`tampilkan()\` juga begitu — ia menampilkan data object yang memanggilnya, tanpa perlu diberi tahu.

Untuk **static method**, analoginya **buku manual pabrik**: informasinya berlaku umum dan bisa dibaca **tanpa perlu punya mobilnya**. Karena itu static method dipanggil lewat nama class, bukan lewat object.

Peragaan yang paling meyakinkan untuk jebakan class attribute: jalankan kode \`class Salah\` dan \`class Benar\` pada contoh Python di atas berdampingan di depan kelas. Melihat pencacah yang tidak pernah bertambah biasanya membuat aturan "tulis lewat nama class" langsung dipahami, bukan sekadar dihafal.
`,

  latihan: [
    'Buat class `Buku` dengan attribute judul, penulis, dan stok, serta method `tampilkan()` dan `pinjam()` yang mengurangi stok. Buat dua object dan pastikan stok keduanya berubah sendiri-sendiri.',
    'Tambahkan class attribute `jumlahBuku` yang mencatat berapa object sudah dibuat. Naikkan nilainya di dalam constructor, lalu tampilkan lewat nama class.',
    'Di Python, buat class dengan class attribute berupa list, tambahkan data lewat satu object, lalu cetak isinya dari object lain. Jelaskan apa yang terjadi dan perbaiki.',
    'Buat program yang sengaja memakai `self.hitung += 1` untuk menaikkan class attribute, lalu buktikan bahwa pencacah bersamanya tidak bertambah. Setelah itu perbaiki dan jelaskan sebabnya.',
    'Di C++, buat class dengan static member lalu sengaja lupa mendefinisikannya di luar class. Catat pesan error linking yang muncul — ini akan berguna saat kamu mendampingi praktikum.',
    'Buat class `Lingkaran` dengan attribute `jari` dan static constant `PI`. Tambahkan method `luas()` dan `keliling()` yang keduanya `const` di C++, lalu coba panggil dari object `const`.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri tentang beda instance dan static attribute memakai satu benda nyata. Targetnya, pendengarmu bisa menentukan sendiri kategori tiap attribute yang kamu sebutkan.'
  ]
});

TOPICS.push({
  id: 'constructor-destructor',
  judul: 'Constructor & Destructor',
  kategori: 'oop',
  tag: ['constructor', 'destructor', 'init', 'initializer list', 'RAII'],
  ringkas: 'Kode yang berjalan otomatis saat object lahir dan saat object dibuang.',

  fungsi: `**Memastikan objek selalu lahir dalam keadaan sah, dan sumber dayanya dilepas saat selesai.**

Terpakai di:

- **Mencegah objek setengah jadi** — objek yang dibuat tanpa data wajib adalah sumber bug
- **Membuka dan menutup sumber daya** — berkas, sambungan basis data, soket
- **Memberi nilai bawaan** yang masuk akal
- **Beberapa cara membuat objek** — dari CSV, dari JSON, dari basis data

Kaidah yang paling menyelamatkan: **objek tidak boleh bisa dibuat dalam keadaan tidak sah.**

Kalau Mahasiswa wajib punya NIM, maka NIM harus jadi parameter konstruktor — bukan diisi belakangan lewat setter yang bisa terlupa.`,

  praktik: {
    tujuan: `Kamu bisa membuat konstruktor yang menolak data tidak sah, dan memastikan sumber daya selalu dilepas meski terjadi galat.`,
    alat: [
      'Python 3 dan C++ untuk membandingkan perilakunya'
    ],
    langkah: [
      { judul: 'Wajibkan data yang memang wajib',
        isi: `Taruh data wajib sebagai parameter konstruktor **tanpa nilai bawaan**.

Bahasa akan menolak pembuatan objek yang kurang lengkap — dan itu jauh lebih baik daripada menemukan objek kosong beberapa jam kemudian.` },
      { judul: 'Validasi di dalam konstruktor',
        isi: `Periksa datanya sebelum objeknya jadi. Kalau tidak sah, lempar galat.

- \`if len(nim) != 9: raise ValueError("NIM harus 9 karakter")\`

Objek yang sudah terlanjur ada dengan data salah akan menyebar ke mana-mana. Menolaknya di awal jauh lebih murah.` },
      { judul: 'Hati-hati dengan nilai bawaan yang bisa diubah',
        isi: `Di Python, \`def __init__(self, daftar=[])\` adalah jebakan terkenal.

Daftar itu dibuat **satu kali** saat fungsinya didefinisikan, dan **dibagi oleh semua objek**.

Buktikan sendiri: buat dua objek, tambahkan sesuatu ke daftar objek pertama, lalu cetak daftar objek kedua.

Perbaikannya: pakai \`None\` sebagai bawaan lalu buat daftarnya di dalam.` },
      { judul: 'Sediakan beberapa cara membuat objek',
        isi: `Konstruktor utama menerima data yang sudah bersih. Untuk sumber lain, buat classmethod:

- \`Mahasiswa.dari_baris_csv(baris)\`
- \`Mahasiswa.dari_dict(data)\`

Keduanya memanggil konstruktor utama setelah menyiapkan datanya. Dengan begitu validasinya tetap satu tempat.` },
      { judul: 'Lepas sumber daya dengan pasti',
        isi: `Di C++, destruktor dipanggil **otomatis dan pasti** saat objek keluar dari cakupannya. Itu disebut RAII, dan sangat andal.

Di Python, \`__del__\` **tidak dijamin** kapan dipanggil. Jangan mengandalkannya.

Pakai **context manager** sebagai gantinya: \`__enter__\` dan \`__exit__\`, lalu dipakai dengan \`with\`.` },
      { judul: 'Buktikan context manager tetap menutup saat galat',
        isi: `Buat kelas yang membuka berkas di \`__enter__\` dan menutupnya di \`__exit__\`.

Lalu lempar galat di tengah blok \`with\`.

Berkasnya **tetap tertutup**. Itulah jaminan yang tidak diberikan oleh menutup manual di akhir blok — karena galat akan melompatinya.` }
    ],
    cek: [
      'Membuat objek tanpa data wajib ditolak oleh bahasanya',
      'Dua objek yang dibuat berurutan tidak berbagi daftar yang sama',
      'Berkas tetap tertutup meski terjadi galat di dalam blok with'
    ]
  },

  konsep: `
Setelah membuat object, biasanya kita perlu mengisi attribute-nya. Menuliskannya satu per satu — \`a.nama = "Budi"; a.umur = 20;\` — punya dua kelemahan: melelahkan, dan **mudah lupa** sehingga object bisa terlanjur dipakai dalam keadaan setengah terisi.

**Constructor** menyelesaikannya. Ia adalah method khusus yang **dijalankan otomatis setiap kali object dibuat**, sehingga object dijamin lahir dalam keadaan siap pakai.

Ciri constructor di C++:

- **Namanya sama persis dengan nama class**
- **Tidak punya tipe kembalian** — bahkan \`void\` pun tidak boleh ditulis
- Boleh ada beberapa versi dengan parameter berbeda (*overloading*)

Di Python, constructor bernama **\`__init__\`** dan parameter pertamanya selalu \`self\`.

**Destructor** adalah kebalikannya: kode yang berjalan otomatis **saat object dibuang**. Di C++ namanya sama dengan class tapi diawali **tilde** (\`~\`), misalnya \`~Mahasiswa()\`.

Kenapa destructor penting? Karena object sering **memegang sumber daya** yang harus dikembalikan — memori dari \`new\`, berkas yang terbuka, atau koneksi jaringan. Kalau tidak dikembalikan, terjadi kebocoran.

Di sinilah C++ punya pola yang sangat kuat bernama **RAII** (*Resource Acquisition Is Initialization*): sumber daya diambil di constructor, dan dikembalikan di destructor. Karena destructor **dijamin dipanggil** saat object keluar dari jangkauannya, sumber daya itu tidak mungkin terlupakan — bahkan ketika terjadi error di tengah jalan.

**Python berbeda dan ini penting kamu pahami.** Python punya \`__del__\`, tapi **jangan diandalkan**. Python membersihkan memori secara otomatis lewat *garbage collector*, dan **waktu pastinya tidak dijamin** — \`__del__\` bisa terlambat dijalankan, atau tidak dijalankan sama sekali saat program berakhir. Untuk mengurus berkas dan koneksi, Python memakai cara lain yaitu **context manager** dengan kata kunci \`with\`.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    string nama;\n    Mahasiswa(string n) {    // nama SAMA dengan class, TANPA tipe kembalian\n        nama = n;\n        cout << "lahir: " << nama << endl;\n    }\n};\n\nMahasiswa a("Budi");         // constructor jalan OTOMATIS di sini',
      penjelasan: `
Dua ciri yang membuat kompiler mengenalinya sebagai constructor: **namanya persis sama dengan nama class**, dan **tidak ada tipe kembalian sama sekali**.

Menulis \`void Mahasiswa(string n)\` adalah kesalahan yang sering terjadi. Dengan \`void\` di depannya, itu bukan lagi constructor melainkan **method biasa** yang kebetulan bernama sama dengan class. Akibatnya ia tidak pernah dipanggil otomatis, dan object lahir dengan attribute berisi sampah — tanpa error apa pun.

Perhatikan bahwa \`Mahasiswa a("Budi");\` **tidak** memanggil constructor secara eksplisit. Pemanggilannya terjadi otomatis sebagai bagian dari pembuatan object. Inilah yang menjamin **tidak ada object yang lahir dalam keadaan belum siap**.

Di Python, peran ini dipegang \`__init__\` yang juga dipanggil otomatis oleh \`Mahasiswa("Budi")\`.

Catatan ketelitian untuk kamu sebagai asprak: secara teknis \`__init__\` di Python bukan constructor melainkan **initializer** — object-nya sudah dibuat lebih dulu oleh \`__new__\`, dan \`__init__\` hanya mengisinya. Dalam praktik sehari-hari orang tetap menyebutnya constructor, dan itu tidak masalah, tapi ada baiknya kamu tahu bedanya kalau ada mahasiswa yang bertanya.
`
    },
    {
      bahasa: 'cpp',
      kode: '// Cara biasa: dibuat kosong dulu, lalu ditimpa\nMahasiswa(string n, int u) { nama = n; umur = u; }\n\n// Initializer list: langsung diisi saat dibuat — lebih baik\nMahasiswa(string n, int u) : nama(n), umur(u) { }',
      penjelasan: `
Keduanya menghasilkan object yang sama, tapi cara kerjanya berbeda — dan bedanya nyata.

**Cara biasa berjalan dua tahap.** Attribute \`nama\` dibuat lebih dulu sebagai string kosong, baru kemudian isinya **ditimpa** oleh \`n\`. Jadi ada satu pekerjaan sia-sia: membuat string kosong yang langsung dibuang.

**Initializer list mengisinya langsung** saat attribute itu dibuat, tanpa tahap perantara. Untuk tipe sederhana seperti \`int\` bedanya tidak terasa, tapi untuk tipe berat seperti \`string\` atau object lain, penghematannya nyata.

Yang lebih penting, ada dua keadaan di mana initializer list **wajib** dipakai:

- **Attribute \`const\`** — nilainya cuma bisa ditetapkan saat dibuat, tidak bisa ditimpa belakangan
- **Attribute berupa reference** — sama, harus diarahkan sejak awal

Ada satu jebakan halus yang perlu kamu tahu: **urutan pengisiannya mengikuti urutan deklarasi attribute di dalam class**, bukan urutan penulisan di initializer list. Kalau ditulis \`: umur(u), nama(n)\` padahal \`nama\` dideklarasikan lebih dulu, kompiler tetap mengisi \`nama\` duluan. Ini baru berbahaya kalau satu attribute dipakai untuk menghitung attribute lain — dan kompiler biasanya memberi peringatan bila urutannya tidak cocok.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa {\npublic:\n    Mahasiswa(string n) { }   // begitu ini ditulis...\n};\n\nMahasiswa a("Budi");          // boleh\nMahasiswa b;                  // ERROR: constructor kosong sudah HILANG',
      penjelasan: `
Ini kejutan yang menjatuhkan banyak mahasiswa, dan penyebabnya jarang dijelaskan.

Kalau kamu **tidak menulis constructor sama sekali**, kompiler diam-diam menyediakan **default constructor** — versi tanpa parameter — sehingga \`Mahasiswa b;\` sah.

Tapi begitu kamu menulis **satu saja** constructor sendiri, **fasilitas gratis itu langsung dicabut**. Kompiler menganggap kamu sudah mengambil alih urusan pembuatan object, jadi ia tidak lagi menebak-nebak.

Akibatnya \`Mahasiswa b;\` gagal dikompilasi, dan pesan errornya sering membingungkan karena baris itu terlihat sangat wajar.

Kapan ini terasa? Terutama saat membuat **array of object**: \`Mahasiswa kelas[5];\` membutuhkan constructor tanpa parameter untuk kelima elemennya.

Ada tiga cara mengatasinya:

- Tulis sendiri constructor kosongnya: \`Mahasiswa() { }\`
- Minta kompiler menyediakannya kembali: \`Mahasiswa() = default;\`
- Beri nilai bawaan pada parameternya: \`Mahasiswa(string n = "")\`

Python tidak punya persoalan ini karena hanya boleh ada satu \`__init__\`, dan parameter bawaan sudah menyelesaikan semuanya.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Berkas {\n    FILE *f;\npublic:\n    Berkas(const char *nama) { f = fopen(nama, "r"); }   // ambil sumber daya\n    ~Berkas() { if (f) fclose(f); }                      // kembalikan\n};',
      penjelasan: `
Inilah **RAII**, pola terpenting di C++ modern — dan penjelasannya akan sangat berguna saat kamu mengajar.

Gagasannya: **sumber daya diambil di constructor, dan dikembalikan di destructor.**

Kekuatannya terletak pada satu jaminan: **destructor pasti dipanggil saat object keluar dari jangkauannya.** Tidak peduli fungsinya selesai normal, keluar lebih awal lewat \`return\`, atau bahkan terjadi *exception* di tengah jalan — destructor tetap dijalankan.

Akibatnya, berkas itu **mustahil lupa ditutup**. Bandingkan dengan cara manual: \`fopen\` di awal lalu \`fclose\` di akhir. Kalau ada \`return\` di tengah fungsi, \`fclose\` terlewat dan berkasnya bocor.

Tanda **tilde** (\`~\`) di depan nama destructor melambangkan kebalikan dari constructor. Destructor **tidak punya parameter** dan **tidak punya tipe kembalian**, sehingga hanya boleh ada satu per class.

Pola ini dipakai di seluruh pustaka standar C++: \`vector\` membebaskan memorinya sendiri, \`string\` juga, dan \`fstream\` menutup berkasnya sendiri. Itulah sebabnya di C++ modern kamu jarang menulis \`delete\` secara langsung.
`
    },
    {
      bahasa: 'cpp',
      kode: '{\n    Mahasiswa a("Budi");\n    Mahasiswa b("Ani");\n}   // di sini destructor jalan — urutannya TERBALIK: Ani dulu, baru Budi',
      penjelasan: `
Urutan pembuatan dan pembuangan object berjalan **berlawanan**, dan ini bukan kebetulan.

Object dibuat berurutan dari atas: Budi dulu, lalu Ani. Tapi saat blok berakhir, destructor dipanggil dari yang **terakhir dibuat**: Ani dulu, baru Budi.

Kenapa terbalik? Karena object lokal disimpan di **stack**, dan stack bersifat **LIFO** — yang terakhir masuk keluar duluan. Di sinilah materi Stack yang sudah kamu pelajari terpakai secara nyata.

Alasan praktisnya juga masuk akal: object yang dibuat belakangan mungkin **bergantung** pada object yang dibuat lebih dulu. Membuang yang terbaru duluan memastikan tidak ada yang memakai sesuatu yang sudah terlanjur dibuang.

Kapan tepatnya destructor dipanggil?

- **Object lokal** → saat blok \`{ }\` tempatnya berakhir
- **Object dari \`new\`** → saat \`delete\` dipanggil. **Tidak otomatis** — inilah sumber kebocoran memori tersering
- **Object di dalam class lain** → saat object pembungkusnya dibuang

Untuk melihatnya langsung, taruh \`cout\` di dalam constructor dan destructor lalu jalankan. Peragaan ini sangat efektif di kelas karena urutannya terlihat nyata di layar.
`
    },
    {
      bahasa: 'python',
      kode: 'class Berkas:\n    def __enter__(self):  ...   # dipakai lewat "with"\n    def __exit__(self, *a): ... # DIJAMIN jalan\n\n    def __del__(self): ...      # JANGAN diandalkan waktunya\n\nwith open("data.txt") as f:     # cara yang benar di Python\n    isi = f.read()              # berkas ditutup otomatis',
      penjelasan: `
Python tidak punya destructor yang bisa diandalkan seperti C++, dan ini perbedaan penting yang perlu kamu tegaskan.

Method \`__del__\` memang ada, tapi **waktu pemanggilannya tidak dijamin**. Python membersihkan object lewat *garbage collector* yang bekerja sesuai kebutuhannya sendiri. Akibatnya \`__del__\` bisa terlambat, atau bahkan **tidak dipanggil sama sekali** saat program berakhir.

Karena itu **jangan pernah menaruh penutupan berkas atau koneksi di dalam \`__del__\`.**

Cara yang benar di Python adalah **context manager** dengan kata kunci \`with\`. Method \`__exit__\` **dijamin dijalankan** begitu blok \`with\` selesai — termasuk ketika terjadi error di tengahnya.

Jadi peran yang di C++ dipegang destructor, di Python dipegang \`with\`:

- **C++** → RAII lewat constructor dan destructor
- **Python** → context manager lewat \`__enter__\` dan \`__exit__\`

Keduanya menyelesaikan masalah yang sama — memastikan sumber daya dikembalikan — hanya dengan mekanisme berbeda. Menunjukkan kesejajaran ini biasanya membuat mahasiswa lebih cepat paham kenapa \`with\` itu ada.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;

public class Mahasiswa {
    private string nama;
    private int    umur;

    // Constructor: nama SAMA dengan class, TANPA tipe kembalian
    public Mahasiswa(string nama, int umur) {
        this.nama = nama;
        this.umur = umur;
        Console.WriteLine($"  [lahir]  {nama}");
    }

    // Overloading: beberapa versi dengan parameter berbeda
    public Mahasiswa(string nama) : this(nama, 0) {      // memanggil versi lain
        Console.WriteLine("  (data belum lengkap)");
    }

    // C# punya finalizer, TAPI waktunya tidak dijamin — sama seperti Python.
    // Jangan diandalkan untuk menutup sumber daya.
    ~Mahasiswa() {
        // dipanggil garbage collector, waktunya tidak pasti
    }

    public void Tampilkan() => Console.WriteLine($"{nama} ({umur} th)");
}

// Cara yang BENAR mengurus sumber daya di C#: IDisposable + using
public class Berkas : IDisposable {
    private string nama;

    public Berkas(string nama) {
        this.nama = nama;
        Console.WriteLine($"  [buka]  {nama}");
    }

    public void Dispose() {
        // DIJAMIN dipanggil saat blok using selesai, termasuk saat error
        Console.WriteLine($"  [tutup] {nama}");
    }
}

class Program {
    static void Main() {
        Console.WriteLine("--- constructor overloading ---");
        var a = new Mahasiswa("Budi", 20);
        var b = new Mahasiswa("Ani");

        Console.WriteLine("\ndata:");
        a.Tampilkan();
        b.Tampilkan();

        // ---------- using: padanan RAII di C# ----------
        Console.WriteLine("\n--- using (jalan normal) ---");
        using (var f = new Berkas("berkas-a")) {
            Console.WriteLine("  sedang dipakai...");
        }   // Dispose() dipanggil di sini

        Console.WriteLine("\n--- using (terjadi error) ---");
        try {
            using (var f = new Berkas("berkas-b")) {
                Console.WriteLine("  sedang dipakai...");
                throw new Exception("ada masalah");
            }
        } catch (Exception e) {
            Console.WriteLine($"  error tertangkap: {e.Message}");
        }
        Console.WriteLine("  -> [tutup] TETAP jalan meski ada error");

        Console.WriteLine("\nRINGKASAN:");
        Console.WriteLine("  C++    -> destructor, dipanggil otomatis & pasti");
        Console.WriteLine("  C#     -> IDisposable + using");
        Console.WriteLine("  Java   -> AutoCloseable + try-with-resources");
        Console.WriteLine("  Python -> context manager + with");
    }
}`,

    java: String.raw`public class Contoh {
    static class Mahasiswa {
        private String nama;
        private int    umur;

        // Constructor: nama SAMA dengan class, TANPA tipe kembalian
        Mahasiswa(String nama, int umur) {
            this.nama = nama;
            this.umur = umur;
            System.out.println("  [lahir]  " + nama);
        }

        // Overloading: this(...) memanggil constructor lain,
        // dan WAJIB jadi baris pertama
        Mahasiswa(String nama) {
            this(nama, 0);
            System.out.println("  (data belum lengkap)");
        }

        void tampilkan() {
            System.out.println(nama + " (" + umur + " th)");
        }
    }

    // Java TIDAK punya destructor. finalize() sudah usang dan dihapus.
    // Cara yang benar: AutoCloseable + try-with-resources
    static class Berkas implements AutoCloseable {
        private String nama;

        Berkas(String nama) {
            this.nama = nama;
            System.out.println("  [buka]  " + nama);
        }

        @Override
        public void close() {
            // DIJAMIN dipanggil saat blok try selesai, termasuk saat error
            System.out.println("  [tutup] " + nama);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- constructor overloading ---");
        Mahasiswa a = new Mahasiswa("Budi", 20);
        Mahasiswa b = new Mahasiswa("Ani");

        System.out.println("\ndata:");
        a.tampilkan();
        b.tampilkan();

        // ---------- try-with-resources: padanan RAII di Java ----------
        System.out.println("\n--- try-with-resources (jalan normal) ---");
        try (Berkas f = new Berkas("berkas-a")) {
            System.out.println("  sedang dipakai...");
        }   // close() dipanggil di sini

        System.out.println("\n--- try-with-resources (terjadi error) ---");
        try (Berkas f = new Berkas("berkas-b")) {
            System.out.println("  sedang dipakai...");
            throw new RuntimeException("ada masalah");
        } catch (RuntimeException e) {
            System.out.println("  error tertangkap: " + e.getMessage());
        }
        System.out.println("  -> [tutup] TETAP jalan meski ada error");

        System.out.println("\nKENAPA JAVA TIDAK PUNYA DESTRUCTOR?");
        System.out.println("  Memori diurus garbage collector, dan waktunya");
        System.out.println("  tidak bisa ditebak. Karena itu Java menyediakan");
        System.out.println("  try-with-resources yang waktunya PASTI.");
    }
}`,

    js: String.raw`class Mahasiswa {
    // JavaScript hanya boleh punya SATU constructor —
    // tidak ada overloading. Penggantinya: nilai bawaan.
    constructor(nama, umur = 0, ipk = 0) {
        this.nama = nama;
        this.umur = umur;
        this.ipk = ipk;
        console.log("  [lahir]  " + nama);
    }

    tampilkan() {
        console.log(this.nama + " (" + this.umur + " th)");
    }

    // Static method sebagai constructor alternatif —
    // padanan terdekat overloading
    static dariTeks(teks) {
        const [nama, umur] = teks.split(",");
        return new Mahasiswa(nama, Number(umur));
    }
}

console.log("--- membuat object ---");
const a = new Mahasiswa("Budi", 20);
const b = new Mahasiswa("Ani");            // umur memakai nilai bawaan

console.log("\ndata:");
a.tampilkan();
b.tampilkan();

console.log("\nconstructor alternatif:");
Mahasiswa.dariTeks("Citra,19").tampilkan();

// ---------- JAVASCRIPT TIDAK PUNYA DESTRUCTOR ----------
console.log("\nJavaScript TIDAK punya destructor sama sekali.");
console.log("Object dibersihkan garbage collector, waktunya tidak diketahui.");
console.log("Tidak ada padanan ~Class(), __del__, maupun Dispose().");

// Yang tersedia: pola buka-tutup manual dengan try/finally
class Berkas {
    constructor(nama) {
        this.nama = nama;
        console.log("  [buka]  " + nama);
    }
    tutup() {
        console.log("  [tutup] " + this.nama);
    }
}

console.log("\n--- pola try/finally ---");
const f = new Berkas("berkas-a");
try {
    console.log("  sedang dipakai...");
    throw new Error("ada masalah");
} catch (e) {
    console.log("  error tertangkap: " + e.message);
} finally {
    f.tutup();                             // finally DIJAMIN jalan
}
console.log("  -> [tutup] tetap jalan berkat finally");

// Pola fungsi pembungkus: mendekati using di C#
function pakaiBerkas(nama, kerjakan) {
    const berkas = new Berkas(nama);
    try {
        return kerjakan(berkas);
    } finally {
        berkas.tutup();                    // selalu ditutup
    }
}

console.log("\n--- pola fungsi pembungkus ---");
pakaiBerkas("berkas-b", function () {
    console.log("  sedang dipakai...");
});

console.log("\nRINGKASAN PENGURUSAN SUMBER DAYA:");
console.log("  C++        -> destructor (otomatis & pasti)");
console.log("  C#         -> using + IDisposable");
console.log("  Java       -> try-with-resources");
console.log("  Python     -> with + context manager");
console.log("  JavaScript -> try/finally (paling manual)");`,

    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

class Mahasiswa {
private:
    string nama;
    int    umur;
    const string nim;          // const -> WAJIB lewat initializer list

public:
    /* Constructor dengan initializer list */
    Mahasiswa(string n, int u, string id)
        : nama(n), umur(u), nim(id) {          // urutan ikut deklarasi di atas
        cout << "  [lahir]  " << nama << endl;
    }

    /* Overloading: beberapa versi dengan parameter berbeda */
    Mahasiswa(string n) : nama(n), umur(0), nim("-") {
        cout << "  [lahir]  " << nama << " (data belum lengkap)" << endl;
    }

    /* Default constructor: WAJIB ditulis sendiri kalau sudah ada
       constructor lain, dan diperlukan untuk array of object */
    Mahasiswa() : nama("(kosong)"), umur(0), nim("-") {
        cout << "  [lahir]  object kosong" << endl;
    }

    /* Destructor: tilde, tanpa parameter, tanpa tipe kembalian */
    ~Mahasiswa() {
        cout << "  [dibuang] " << nama << endl;
    }

    void tampilkan() const {
        cout << nama << " | " << umur << " th | NIM " << nim << endl;
    }
};

/* RAII: sumber daya diambil di constructor, dikembalikan di destructor */
class Penampung {
private:
    int *data;
    int  ukuran;

public:
    Penampung(int n) : ukuran(n) {
        data = new int[n];                     // ambil memori
        for (int i = 0; i < n; i++) data[i] = i * 10;
        cout << "  [alokasi] " << n << " int" << endl;
    }

    ~Penampung() {
        delete[] data;                         // kembalikan, DIJAMIN jalan
        cout << "  [bebaskan] " << ukuran << " int" << endl;
    }

    void cetak() const {
        for (int i = 0; i < ukuran; i++) cout << data[i] << " ";
        cout << endl;
    }
};

int main() {
    cout << "--- constructor overloading ---" << endl;
    Mahasiswa a("Budi", 20, "2024001");
    Mahasiswa b("Ani");
    Mahasiswa c;

    cout << "\ndata:" << endl;
    a.tampilkan();
    b.tampilkan();
    c.tampilkan();

    cout << "\n--- urutan destructor di dalam blok ---" << endl;
    {
        Mahasiswa x("Pertama");
        Mahasiswa y("Kedua");
        cout << "  (blok akan berakhir)" << endl;
    }   // destructor jalan TERBALIK: Kedua dulu, baru Pertama
    cout << "  (blok sudah berakhir)" << endl;

    cout << "\n--- RAII ---" << endl;
    {
        Penampung p(5);
        p.cetak();
    }   // delete[] dijalankan otomatis, mustahil lupa

    cout << "\n--- object dari new: TIDAK otomatis ---" << endl;
    Mahasiswa *d = new Mahasiswa("Dedi", 22, "2024002");
    delete d;                                  // WAJIB manual

    cout << "\n--- program berakhir ---" << endl;
    return 0;   // destructor a, b, c jalan di sini (terbalik: c, b, a)
}`,

    python: String.raw`class Mahasiswa:
    """__init__ dijalankan otomatis saat object dibuat."""

    def __init__(self, nama, umur=0, nim="-"):
        # Python tidak punya overloading — pakai nilai bawaan
        self.nama = nama
        self.umur = umur
        self.nim = nim
        print(f"  [lahir]  {self.nama}")

    def __del__(self):
        # ADA, tapi JANGAN diandalkan waktunya
        print(f"  [dibuang] {self.nama}")

    def __str__(self):
        # dipanggil saat object dicetak dengan print()
        return f"{self.nama} | {self.umur} th | NIM {self.nim}"


print("--- membuat object ---")
a = Mahasiswa("Budi", 20, "2024001")
b = Mahasiswa("Ani")                    # umur & nim memakai nilai bawaan

print("\ndata:")
print(a)
print(b)

print("\n--- menghapus rujukan ---")
del a                                    # __del__ biasanya jalan di sini
print("  (a sudah dihapus)")


# ---------- CONTEXT MANAGER: pengganti destructor di Python ----------
class Penampung:
    """Cara yang BENAR mengurus sumber daya di Python."""

    def __init__(self, nama):
        self.nama = nama

    def __enter__(self):
        print(f"  [buka]  {self.nama}")
        return self

    def __exit__(self, tipe, nilai, jejak):
        # DIJAMIN jalan, bahkan kalau terjadi error di dalam blok
        print(f"  [tutup] {self.nama}")
        return False                     # False = error tetap diteruskan


print("\n--- context manager (jalan normal) ---")
with Penampung("berkas-a") as p:
    print("  sedang dipakai...")

print("\n--- context manager (terjadi error) ---")
try:
    with Penampung("berkas-b") as p:
        print("  sedang dipakai...")
        raise ValueError("ada masalah")
except ValueError as e:
    print(f"  error tertangkap: {e}")
print("  -> perhatikan [tutup] TETAP jalan meski ada error")


# Cara yang paling lazim dipakai sehari-hari
print("\n--- with pada berkas sungguhan ---")
print("  with open('data.txt') as f:   -> berkas ditutup otomatis")
print("  Ini padanan RAII di C++, hanya beda mekanismenya.")


# ---------- classmethod sebagai constructor alternatif ----------
class Tanggal:
    def __init__(self, hari, bulan, tahun):
        self.hari, self.bulan, self.tahun = hari, bulan, tahun

    @classmethod
    def dari_teks(cls, teks):
        """Python tidak punya overloading, jadi ini penggantinya."""
        h, b, t = map(int, teks.split("-"))
        return cls(h, b, t)

    def __str__(self):
        return f"{self.hari:02d}/{self.bulan:02d}/{self.tahun}"


print("\n--- constructor alternatif ---")
print("cara biasa   :", Tanggal(17, 8, 1945))
print("dari teks    :", Tanggal.dari_teks("17-8-1945"))`,

    c: String.raw`/* C tidak punya constructor maupun destructor.
   Keduanya harus ditiru manual — dan di situlah letak risikonya:
   kalau lupa dipanggil, tidak ada yang mengingatkan. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char  nama[50];
    int   umur;
    int  *nilai;            /* memori dinamis: WAJIB dibebaskan */
    int   jumlahNilai;
} Mahasiswa;

/* "Constructor" -> fungsi pembuat, harus dipanggil manual */
void buat(Mahasiswa *m, const char *nama, int umur, int jumlahNilai) {
    strcpy(m->nama, nama);
    m->umur = umur;
    m->jumlahNilai = jumlahNilai;
    m->nilai = (int *)malloc(jumlahNilai * sizeof(int));
    for (int i = 0; i < jumlahNilai; i++) m->nilai[i] = 0;
    printf("  [lahir]  %s\n", m->nama);
}

/* "Destructor" -> fungsi pembebas, juga harus dipanggil manual */
void hapus(Mahasiswa *m) {
    free(m->nilai);
    m->nilai = NULL;        /* cegah dipakai lagi tanpa sengaja */
    printf("  [dibuang] %s\n", m->nama);
}

void tampilkan(const Mahasiswa *m) {
    printf("%s | %d th | %d nilai\n", m->nama, m->umur, m->jumlahNilai);
}

int main(void) {
    Mahasiswa a;
    buat(&a, "Budi", 20, 3);      /* kalau baris ini lupa -> isinya sampah */
    tampilkan(&a);

    a.nilai[0] = 80;
    a.nilai[1] = 90;
    printf("nilai pertama : %d\n", a.nilai[0]);

    hapus(&a);                    /* kalau baris ini lupa -> memory leak */

    printf("\nInilah yang diselesaikan constructor & destructor:\n");
    printf("di C++, kedua pemanggilan itu terjadi OTOMATIS,\n");
    printf("sehingga mustahil terlupakan.\n");

    return 0;
}`
  },

  output: `--- constructor overloading ---
  [lahir]  Budi
  [lahir]  Ani (data belum lengkap)
  [lahir]  object kosong

data:
Budi | 20 th | NIM 2024001
Ani | 0 th | NIM -
(kosong) | 0 th | NIM -

--- urutan destructor di dalam blok ---
  [lahir]  Pertama
  [lahir]  Kedua
  (blok akan berakhir)
  [dibuang] Kedua
  [dibuang] Pertama
  (blok sudah berakhir)

--- RAII ---
  [alokasi] 5 int
0 10 20 30 40
  [bebaskan] 5 int`,

  kesalahanUmum: [
    {
      salah: 'Menulis tipe kembalian pada constructor: `void Mahasiswa(string n) { }`',
      kenapa: 'Dengan `void` di depannya, itu bukan lagi constructor melainkan **method biasa** yang kebetulan bernama sama dengan class. Ia tidak pernah dipanggil otomatis, sehingga object lahir dengan attribute berisi sampah — dan tidak ada error apa pun yang muncul.',
      benar: 'Constructor **tidak boleh punya tipe kembalian sama sekali**: `Mahasiswa(string n) { }`. Ingat dua cirinya: nama sama dengan class, dan tanpa tipe kembalian.'
    },
    {
      salah: 'Membuat `Mahasiswa b;` padahal sudah ada constructor berparameter.',
      kenapa: 'Begitu kamu menulis satu saja constructor sendiri, kompiler **mencabut default constructor gratisnya**. Deklarasi tanpa argumen jadi ditolak, dan pesan errornya membingungkan karena baris itu terlihat wajar. Paling sering terasa saat membuat array of object.',
      benar: 'Tulis sendiri constructor kosongnya: `Mahasiswa() { }`, atau `Mahasiswa() = default;`, atau beri nilai bawaan pada parameternya: `Mahasiswa(string n = "")`.'
    },
    {
      salah: 'Mengisi attribute `const` di dalam badan constructor.',
      kenapa: 'Attribute `const` hanya bisa **ditetapkan saat dibuat**, tidak bisa ditimpa setelahnya. Badan constructor berjalan **setelah** semua attribute selesai dibuat, sehingga penugasannya sudah terlambat dan kompiler menolaknya.',
      benar: 'Gunakan initializer list: `Mahasiswa(string id) : nim(id) { }`. Aturan yang sama berlaku untuk attribute berupa reference.'
    },
    {
      salah: 'Membuat object dengan `new` lalu lupa `delete`.',
      kenapa: 'Berbeda dari object lokal, object di *heap* **tidak dibuang otomatis** saat keluar dari blok. Destructor tidak pernah dipanggil, dan memorinya bocor. Kalau object itu memegang sumber daya lain, kebocorannya berlipat.',
      benar: 'Pasangkan setiap `new` dengan `delete` (dan `new[]` dengan `delete[]`). Di C++ modern, lebih baik pakai `unique_ptr` atau `shared_ptr` yang membuangnya otomatis.'
    },
    {
      salah: 'Di Python, menaruh penutupan berkas di dalam `__del__`.',
      kenapa: 'Waktu pemanggilan `__del__` **tidak dijamin** karena bergantung pada *garbage collector*. Berkasnya bisa tertutup jauh belakangan, atau tidak tertutup sama sekali saat program berakhir. Datanya berisiko tidak tersimpan.',
      benar: 'Gunakan **context manager**: `with open("data.txt") as f:`. Method `__exit__` dijamin dijalankan, bahkan ketika terjadi error di dalam bloknya.'
    },
    {
      salah: 'Di Python, mencoba membuat dua `__init__` dengan parameter berbeda.',
      kenapa: 'Python **tidak punya overloading**. Definisi kedua langsung **menimpa** yang pertama, sehingga hanya versi terakhir yang berlaku. Tidak ada error — pemanggilan dengan bentuk lama tiba-tiba gagal dengan `TypeError`.',
      benar: 'Gunakan parameter bernilai bawaan: `def __init__(self, nama, umur=0)`. Untuk cara pembuatan yang benar-benar berbeda, pakai `@classmethod` seperti `Tanggal.dari_teks("17-8-1945")`.'
    }
  ],

  analogi: `
Untuk **constructor**, pakai analogi **formulir pendaftaran wajib**. Saat mahasiswa baru masuk kampus, ia **tidak bisa langsung berkeliaran** — harus mengisi formulir dulu: nama, NIM, jurusan. Constructor adalah petugas yang memastikan formulir itu terisi **sebelum** orangnya dianggap resmi terdaftar.

Pertanyaan pemandu: *"kenapa tidak diisi belakangan saja?"* Jawabannya karena bisa lupa — dan mahasiswa tanpa NIM akan mengacaukan seluruh sistem. Constructor menghilangkan kemungkinan itu.

Untuk **destructor**, analoginya **prosedur keluar kos**. Sebelum pergi, kamu harus mengembalikan kunci, melunasi tagihan, dan mengosongkan kamar. Kalau tidak, kamar itu tetap tercatat terpakai padahal kosong — persis seperti **memory leak**.

Untuk **RAII**, pakai analogi **kunci loker kolam renang**. Saat masuk kamu ambil kunci (constructor), dan saat keluar **pintu putarnya memaksamu mengembalikan kunci** (destructor). Kamu tidak bisa lupa, karena sistemnya yang menjamin. Bandingkan dengan sistem manual yang cuma mengandalkan ingatan — pasti ada yang lupa.

Untuk **urutan destructor yang terbalik**, pakai analogi **memakai pakaian**: kaus kaki dulu baru sepatu, tapi saat melepas justru sepatu dulu baru kaus kaki. Yang terakhir dipakai, dilepas duluan. Kaitkan langsung dengan **Stack** yang sudah dipelajari — object lokal memang disimpan di stack, dan LIFO-nya persis sama.

Peragaan yang paling efektif di kelas: taruh \`cout\` di constructor dan destructor, buat beberapa object dalam blok bersarang, lalu jalankan. Urutan lahir dan dibuang yang muncul di layar biasanya langsung menjawab semua pertanyaan tanpa perlu penjelasan tambahan.
`,

  latihan: [
    'Buat class `Buku` dengan constructor berparameter judul, penulis, dan tahun. Tambahkan pesan di constructor dan destructor, lalu amati kapan masing-masing dijalankan.',
    'Tambahkan constructor overloading pada `Buku`: satu versi lengkap, satu versi hanya judul, dan satu versi kosong. Buat ketiganya lalu tampilkan isinya.',
    'Buat class dengan attribute `const` (misalnya `nim`), lalu sengaja isi di dalam badan constructor. Catat pesan errornya, kemudian perbaiki dengan initializer list.',
    'Buat class yang mengalokasikan array dengan `new` di constructor dan membebaskannya di destructor. Buat object di dalam blok `{ }`, lalu buktikan pembebasannya berjalan otomatis saat blok berakhir.',
    'Buat tiga object di dalam satu blok dan catat urutan pemanggilan destructornya. Jelaskan kenapa urutannya terbalik, dan kaitkan dengan materi Stack.',
    'Di Python, buat context manager sederhana dengan `__enter__` dan `__exit__`. Buktikan bahwa `__exit__` tetap dijalankan meski terjadi error di dalam blok `with`.',
    'Buat class `Mahasiswa` di C++ dan Python dengan constructor yang sama fungsinya, lalu bandingkan. Bagian mana yang harus diurus manual di C++ tapi otomatis di Python?',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang RAII memakai analogi kunci loker. Targetnya, pendengarmu bisa menjelaskan sendiri kenapa `with` di Python menyelesaikan masalah yang sama.'
  ]
});

TOPICS.push({
  id: 'this-self',
  judul: 'this (C++/Java/C#) & self (Python)',
  kategori: 'oop',
  tag: ['this', 'self', 'parameter tersembunyi', 'shadowing', 'binding'],
  ringkas: 'Parameter tersembunyi yang membuat method tahu object mana yang sedang memanggilnya.',

  fungsi: `**Merujuk objek yang sedang mengerjakan method — dan tahu kapan ia bisa hilang.**

Terpakai di:

- **Membedakan atribut dari parameter** yang namanya sama
- **Merangkai pemanggilan method** — \`obj.set(1).set(2)\`
- **Callback di JavaScript** — di mana \`this\` terkenal sering berubah tak terduga
- **Membaca kode orang lain** — memahami dari mana sebuah nilai berasal

Perbedaan yang perlu diketahui: di Python, \`self\` **wajib ditulis** sebagai parameter pertama. Di C++, Java, dan C#, \`this\` **tersirat**.

Python memilih yang eksplisit dengan sengaja — supaya jelas bahwa method sebenarnya fungsi biasa yang menerima objeknya sebagai argumen pertama.`,

  praktik: {
    tujuan: `Kamu paham kapan \`this\` dan \`self\` diperlukan, dan bisa mengatasi masalah \`this\` yang hilang di JavaScript.`,
    alat: [
      'Python 3',
      'Peramban untuk bagian JavaScript'
    ],
    langkah: [
      { judul: 'Lihat kenapa self diperlukan',
        isi: `Buat method dengan parameter yang namanya **sama** dengan atributnya, misalnya \`nama\`.

Tanpa \`self\`, kamu cuma menugaskan parameter ke dirinya sendiri — dan atributnya tidak pernah berubah.

\`self.nama = nama\` membedakan keduanya dengan jelas.` },
      { judul: 'Buktikan method adalah fungsi biasa',
        isi: `Di Python, \`Mahasiswa.cetak(m)\` memberi hasil sama dengan \`m.cetak()\`.

Yang kedua cuma cara penulisan yang lebih enak; Python menyisipkan objeknya sebagai argumen pertama.

Melihat ini membuat \`self\` berhenti terasa ajaib.` },
      { judul: 'Rangkai pemanggilan dengan mengembalikan diri sendiri',
        isi: `Kalau method mengembalikan \`self\`, pemanggilannya bisa dirangkai:

- \`kueri.pilih("nama").dari("mahasiswa").urut("nim")\`

Ini pola yang dipakai banyak pustaka, dan membuat kodenya terbaca seperti kalimat.` },
      { judul: 'Munculkan masalah this di JavaScript',
        isi: `Buat objek dengan method yang memakai \`this\`, lalu kirim method itu sebagai callback ke \`setTimeout\`.

\`this\`-nya **berubah** dan nilainya menjadi \`undefined\`.

Ini penyebab bug JavaScript yang paling terkenal, dan mengejutkan orang yang datang dari Java atau C++.` },
      { judul: 'Perbaiki dengan arrow function',
        isi: `Arrow function **tidak punya \`this\` sendiri** — ia memakai \`this\` dari tempat ia ditulis.

Ganti \`function() { ... }\` dengan \`() => { ... }\` dan masalahnya hilang.

Cara lain: \`.bind(this)\`, atau simpan dulu ke variabel \`const self = this\`.` },
      { judul: 'Perhatikan bayangan nama',
        isi: `Kalau parameter dan atribut bernama sama, di C++ dan Java yang menang adalah **parameternya**.

\`this->nama = nama\` atau \`this.nama = nama\` diperlukan untuk membedakan.

Sebagian orang menghindarinya dengan memberi awalan pada atribut, misalnya \`m_nama\` — keduanya sah, yang penting konsisten.` }
    ],
    cek: [
      'Method-mu benar-benar mengubah atribut, bukan cuma parameternya',
      'Pemanggilan berantai bekerja karena method-mu mengembalikan self',
      'Callback JavaScript-mu tetap punya this yang benar setelah diperbaiki'
    ]
  },

  konsep: `
Ada satu pertanyaan yang hampir selalu muncul saat mengajar OOP: *"Kalau ada 100 object dari satu class, kenapa method-nya tahu data siapa yang harus dipakai?"*

Jawabannya: **setiap method diam-diam menerima satu parameter tambahan berisi object yang memanggilnya.**

Ketika kamu menulis \`budi.tampilkan()\`, yang sebenarnya terjadi adalah kira-kira \`tampilkan(budi)\`. Object \`budi\` **dikirim sebagai argumen tersembunyi**, dan di dalam method itulah ia dikenali.

Yang membedakan bahasa satu dengan lainnya hanyalah **seberapa terang-terangan mekanisme ini ditampilkan**:

- **C++, Java, dan C#** menyembunyikannya. Object itu tersedia lewat kata kunci **\`this\`** yang muncul sendiri tanpa perlu dideklarasikan.
- **Python menampakkannya.** Object itu **wajib ditulis** sebagai parameter pertama, dan kesepakatannya dinamai **\`self\`**.
- **JavaScript berbeda sendiri**, dan ini yang paling sering menjebak: nilai \`this\` di JavaScript **tidak ditentukan saat fungsi ditulis, melainkan saat fungsi dipanggil.**

Ada tiga alasan kenapa \`this\` dan \`self\` perlu ditulis secara eksplisit dalam kode:

- **Membedakan attribute dari parameter** yang namanya kebetulan sama (*shadowing*)
- **Mengembalikan object itu sendiri**, sehingga pemanggilan method bisa dirangkai berurutan
- **Mengirim object ke fungsi lain** dari dalam method

Satu hal yang perlu diluruskan: di C++, **\`this\` adalah pointer**, sehingga aksesnya memakai \`->\`. Di Java, C#, dan Python, ia berupa **rujukan biasa**, sehingga memakai titik. Perbedaan kecil ini sering membingungkan mahasiswa yang berpindah bahasa.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: 'mhs.tampilkan()\n\n# Python menerjemahkannya menjadi:\nMahasiswa.tampilkan(mhs)   # object jadi argumen PERTAMA',
      penjelasan: `
**Inilah jawaban lengkap dari pertanyaan "kenapa Python harus menulis \`self\` terus?"**

Kedua baris itu benar-benar setara — kamu bisa membuktikannya sendiri dengan menjalankan keduanya. Penulisan \`mhs.tampilkan()\` hanyalah bentuk yang lebih enak dibaca dari \`Mahasiswa.tampilkan(mhs)\`.

Karena object dikirim sebagai argumen pertama, setiap method **wajib menyediakan satu parameter untuk menampungnya**. Kalau tidak, Python protes dengan pesan yang terasa aneh bagi pemula:

*"tampilkan() takes 0 positional arguments but 1 was given"*

Mahasiswa merasa tidak mengirim argumen apa pun, padahal Python mengirimkan satu secara diam-diam.

Perlu ditegaskan: **\`self\` bukan kata kunci.** Secara teknis kamu boleh menamainya apa saja — \`aku\`, \`obj\`, atau \`x\` — dan programnya tetap jalan. Tapi **jangan pernah lakukan itu**, karena seluruh dunia Python memakai \`self\` dan kode yang menyimpang jadi sulit dibaca orang lain.

Filosofi Python di balik keputusan ini terkenal: *lebih baik eksplisit daripada tersirat*. Mereka memilih menampakkan mekanisme yang di bahasa lain disembunyikan.
`
    },
    {
      bahasa: 'cpp',
      kode: 'void setNama(string nama) {\n    this->nama = nama;   // kiri: attribute, kanan: parameter\n}\n\n// this adalah POINTER, jadi memakai ->',
      penjelasan: `
Di C++, \`this\` adalah **pointer** menuju object yang sedang menjalankan method. Ia disiapkan otomatis oleh kompiler, jadi tidak perlu dan tidak bisa dideklarasikan sendiri.

Pada contoh ini, parameter \`nama\` **menutupi** attribute \`nama\` karena namanya persis sama. Keadaan ini disebut ***shadowing***. Di dalam method, tulisan \`nama\` polos selalu merujuk ke **parameter**, karena jangkauannya lebih dekat.

Akibatnya \`nama = nama;\` berarti menyalin parameter ke dirinya sendiri — attribute-nya sama sekali tidak berubah, dan **kompiler tidak menganggapnya error**. Bug ini diam dan sulit dilihat.

Dengan \`this->nama\`, kita menegaskan mana yang milik object dan mana yang parameter.

Perhatikan tanda **\`->\`** yang dipakai karena \`this\` berupa pointer. Bandingkan dengan bahasa lain:

- **C++** → \`this->nama\` (pointer)
- **Java, C#, JavaScript** → \`this.nama\` (rujukan)
- **Python** → \`self.nama\` (rujukan, tapi ditulis eksplisit)

Ada jalan keluar yang lebih sederhana dan banyak disarankan untuk pemula: **beri nama parameter yang berbeda**, misalnya \`namaBaru\`. Dengan begitu shadowing tidak pernah terjadi dan \`this\` tidak diperlukan.
`
    },
    {
      bahasa: 'java',
      kode: 'public class Mahasiswa {\n    private String nama;\n\n    public Mahasiswa(String nama) {\n        this.nama = nama;      // pola paling lazim di Java\n    }\n\n    public Mahasiswa setNama(String nama) {\n        this.nama = nama;\n        return this;           // dikembalikan supaya bisa dirangkai\n    }\n}',
      penjelasan: `
Di Java, **memberi parameter constructor nama yang sama dengan attribute adalah kebiasaan baku**, bukan kecerobohan. Justru \`this.\` yang menjadi pembedanya, dan pola ini kamu temui di hampir semua kode Java.

Perhatikan \`return this;\` pada method kedua. Karena method mengembalikan object itu sendiri, pemanggilannya bisa **dirangkai berurutan**:

\`mhs.setNama("Budi").setUmur(20).setIpk(3.75);\`

Gaya penulisan ini disebut ***method chaining***, dan sangat lazim dipakai pada *builder pattern*.

Di C++, karena \`this\` berupa pointer, yang dikembalikan adalah \`*this\` dengan tipe kembalian berupa reference: \`Mahasiswa& setNama(...) { ...; return *this; }\`.

Satu perbedaan penting dengan C++: di Java, \`this\` **tidak pernah bernilai null** di dalam method biasa. Ia dijamin menunjuk ke object yang sah. Sedangkan di C++, memanggil method lewat pointer yang null menghasilkan \`this\` yang null dan berujung *undefined behavior*.
`
    },
    {
      bahasa: 'js',
      kode: 'const mhs = {\n    nama: "Budi",\n    sapa() { console.log(this.nama); }\n};\n\nmhs.sapa();                  // "Budi"  -> this = mhs\n\nconst f = mhs.sapa;\nf();                         // undefined -> this BUKAN mhs lagi!',
      penjelasan: `
**Inilah keanehan JavaScript yang wajib kamu kuasai sebagai asprak**, karena gejalanya sangat membingungkan dan berbeda dari semua bahasa lain.

Di C++, Java, C#, dan Python, \`this\` atau \`self\` ditentukan oleh **object mana yang memiliki method itu**. Di JavaScript, \`this\` ditentukan oleh **cara fungsi itu dipanggil** — bukan oleh tempat fungsi itu ditulis.

Runut contohnya:

- \`mhs.sapa()\` → dipanggil **lewat titik dari \`mhs\`**, sehingga \`this\` bernilai \`mhs\`. Hasilnya benar.
- \`const f = mhs.sapa; f();\` → fungsinya **dilepas dari object-nya**, lalu dipanggil sendirian. Tidak ada object di sebelah kiri titik, sehingga \`this\` menjadi \`undefined\` (dalam mode ketat) atau object global.

Fungsinya sama persis — yang berubah cuma cara memanggilnya.

Kapan ini menggigit di dunia nyata? Saat method dikirim sebagai *callback*, misalnya \`setTimeout(mhs.sapa, 1000)\` atau sebagai penangan klik tombol. Method-nya terlepas dari object-nya, dan \`this\` jadi salah.

Ada dua obatnya:

- **Arrow function**, yang **tidak punya \`this\` sendiri** melainkan meminjam dari lingkungan sekitarnya: \`setTimeout(() => mhs.sapa(), 1000)\`
- **\`.bind(mhs)\`**, yang mengunci nilai \`this\` secara permanen: \`const f = mhs.sapa.bind(mhs);\`
`
    },
    {
      bahasa: 'csharp',
      kode: 'public class Mahasiswa {\n    private string nama;\n\n    public Mahasiswa(string nama) {\n        this.nama = nama;\n    }\n\n    // static method TIDAK punya this — tidak terikat object mana pun\n    public static void Info() {\n        // Console.WriteLine(this.nama);  <- ditolak kompiler\n    }\n}',
      penjelasan: `
C# memakai \`this\` dengan cara yang praktis sama dengan Java: berupa rujukan, diakses dengan titik, dan dipakai untuk membedakan attribute dari parameter.

Yang penting diperhatikan di sini adalah **static method tidak punya \`this\` sama sekali**, dan aturan ini berlaku sama di C++, Java, maupun C#.

Alasannya masuk akal begitu dipahami: static method **tidak terikat object mana pun** — ia dipanggil lewat nama class-nya. Jadi pertanyaannya tidak terjawab: \`this.nama\` itu nama milik object yang mana? Tidak ada jawabannya, dan karena itu kompiler menolaknya.

Hal yang sama berlaku di Python: method yang ditandai \`@staticmethod\` tidak menerima \`self\`, sehingga tidak bisa menyentuh data object.

Dari sini muncul aturan praktis yang mudah diingat: **kalau sebuah method butuh data object, ia tidak boleh static.** Sebaliknya, kalau isinya sama sekali tidak menyentuh \`this\` atau \`self\`, method itu memang lebih pantas dijadikan static.

Satu ciri khas C# yang tidak ada di Java: kata \`this\` juga dipakai untuk mendefinisikan **indexer**, yaitu kemampuan object diakses dengan kurung siku seperti array — \`public int this[int i] { get; set; }\`.
`
    },
    {
      bahasa: 'python',
      kode: 'class Salah:\n    def tampilkan():          # lupa self\n        print("halo")\n\nSalah().tampilkan()\n# TypeError: tampilkan() takes 0 positional arguments but 1 was given',
      penjelasan: `
Pesan error ini terasa membingungkan bagi pemula, dan kamu akan sering menemuinya saat mendampingi praktikum. Mahasiswa akan berkata *"tapi saya tidak mengirim argumen apa pun!"*

Justru di situlah letak pelajarannya: **Python-lah yang mengirimkannya.** Saat \`Salah().tampilkan()\` dipanggil, Python otomatis menyisipkan object sebagai argumen pertama. Karena method-nya tidak menyediakan parameter untuk menampung, jumlahnya tidak cocok — dan errornya muncul.

Cara menjelaskannya yang paling cepat dipahami: tulis ulang pemanggilannya dalam bentuk panjang di papan tulis.

\`Salah.tampilkan(objectnya)\`

Sekarang terlihat jelas ada satu argumen yang dikirim, sementara \`def tampilkan():\` tidak menyediakan tempat untuknya.

Perbaikannya cukup menambahkan \`self\`: \`def tampilkan(self):\`

Kesalahan sejenis yang juga sering terjadi: **lupa \`self.\` saat mengakses attribute** di dalam method. Menulis \`print(nama)\` alih-alih \`print(self.nama)\` menghasilkan \`NameError\`, karena Python mencarinya sebagai variabel lokal yang memang tidak ada.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

class Mahasiswa {
private:
    string nama;
    int    umur;

public:
    Mahasiswa(string nama, int umur) {
        this->nama = nama;        // this adalah POINTER -> pakai ->
        this->umur = umur;
    }

    // Mengembalikan *this supaya pemanggilan bisa dirangkai
    Mahasiswa& setNama(string nama) {
        this->nama = nama;
        return *this;             // buka pointernya jadi reference
    }

    Mahasiswa& setUmur(int umur) {
        this->umur = umur;
        return *this;
    }

    void tampilkan() const {
        cout << nama << " (" << umur << " th)" << endl;
    }

    // Membuktikan this memang berbeda untuk tiap object
    void alamatObjek() const {
        cout << "  " << nama << " -> this = " << this << endl;
    }

    static void info() {
        cout << "static method: tidak punya this" << endl;
        // cout << this->nama;    <- ditolak kompiler
    }
};

int main() {
    Mahasiswa a("Budi", 20);
    Mahasiswa b("Ani", 21);

    a.tampilkan();
    b.tampilkan();

    cout << "\nalamat this tiap object (pasti berbeda):" << endl;
    a.alamatObjek();
    b.alamatObjek();

    cout << "\nmethod chaining:" << endl;
    a.setNama("Budi Santoso").setUmur(22);   // dirangkai berkat return *this
    a.tampilkan();

    cout << endl;
    Mahasiswa::info();

    return 0;
}`,

    csharp: String.raw`using System;

public class Mahasiswa {
    private string nama;
    private int umur;

    public Mahasiswa(string nama, int umur) {
        this.nama = nama;         // this berupa RUJUKAN -> pakai titik
        this.umur = umur;
    }

    // Method chaining: kembalikan this
    public Mahasiswa SetNama(string nama) {
        this.nama = nama;
        return this;
    }

    public Mahasiswa SetUmur(int umur) {
        this.umur = umur;
        return this;
    }

    public void Tampilkan() {
        Console.WriteLine($"{nama} ({umur} th)");
    }

    // static tidak punya this
    public static void Info() {
        Console.WriteLine("static method: tidak punya this");
        // Console.WriteLine(this.nama);   <- ditolak kompiler
    }
}

class Program {
    static void Main() {
        Mahasiswa a = new Mahasiswa("Budi", 20);
        Mahasiswa b = new Mahasiswa("Ani", 21);

        a.Tampilkan();
        b.Tampilkan();

        Console.WriteLine("\nmethod chaining:");
        a.SetNama("Budi Santoso").SetUmur(22);
        a.Tampilkan();

        Console.WriteLine();
        Mahasiswa.Info();
    }
}`,

    java: String.raw`public class Mahasiswa {
    private String nama;
    private int umur;

    // Memberi parameter nama yang SAMA dengan attribute adalah
    // kebiasaan baku di Java. this. yang membedakannya.
    public Mahasiswa(String nama, int umur) {
        this.nama = nama;
        this.umur = umur;
    }

    // Method chaining: kembalikan this
    public Mahasiswa setNama(String nama) {
        this.nama = nama;
        return this;
    }

    public Mahasiswa setUmur(int umur) {
        this.umur = umur;
        return this;
    }

    public void tampilkan() {
        System.out.println(nama + " (" + umur + " th)");
    }

    // static tidak punya this
    public static void info() {
        System.out.println("static method: tidak punya this");
        // System.out.println(this.nama);   <- ditolak kompiler
    }

    public static void main(String[] args) {
        Mahasiswa a = new Mahasiswa("Budi", 20);
        Mahasiswa b = new Mahasiswa("Ani", 21);

        a.tampilkan();
        b.tampilkan();

        System.out.println("\nmethod chaining:");
        a.setNama("Budi Santoso").setUmur(22);
        a.tampilkan();

        System.out.println();
        Mahasiswa.info();
    }
}`,

    python: String.raw`class Mahasiswa:
    def __init__(self, nama, umur):
        self.nama = nama          # self WAJIB ditulis, tidak tersembunyi
        self.umur = umur

    def tampilkan(self):
        print(f"{self.nama} ({self.umur} th)")

    # Method chaining: kembalikan self
    def set_nama(self, nama):
        self.nama = nama
        return self

    def set_umur(self, umur):
        self.umur = umur
        return self

    def identitas(self):
        print(f"  {self.nama} -> id(self) = {id(self)}")

    @staticmethod
    def info():
        print("staticmethod: tidak menerima self")


a = Mahasiswa("Budi", 20)
b = Mahasiswa("Ani", 21)

a.tampilkan()
b.tampilkan()

print("\nid(self) tiap object (pasti berbeda):")
a.identitas()
b.identitas()

# ---------- MEMBUKTIKAN self ITU ARGUMEN BIASA ----------
print("\ndua penulisan ini SAMA PERSIS:")
a.tampilkan()                     # bentuk yang biasa dipakai
Mahasiswa.tampilkan(a)            # bentuk aslinya — object jadi argumen ke-1

print("\nmethod chaining:")
a.set_nama("Budi Santoso").set_umur(22)
a.tampilkan()

print()
Mahasiswa.info()

# ---------- JEBAKAN: lupa self ----------
class Salah:
    def tampilkan():              # tidak ada parameter untuk menampung object
        print("halo")

print("\nmemanggil method tanpa self:")
try:
    Salah().tampilkan()
except TypeError as e:
    print("  TypeError:", e)
    print("  -> Python mengirim object sebagai argumen ke-1,")
    print("     tapi method-nya tidak menyediakan tempat untuk itu.")

# ---------- self bukan kata kunci ----------
class Aneh:
    def __init__(aku, nama):      # dinamai 'aku', tetap jalan
        aku.nama = nama

    def sapa(aku):
        print(f"  halo, saya {aku.nama}")

print("\nself dinamai 'aku' (jalan, TAPI jangan ditiru):")
Aneh("Citra").sapa()`,

    js: String.raw`class Mahasiswa {
    constructor(nama, umur) {
        this.nama = nama;         // this berupa rujukan -> pakai titik
        this.umur = umur;
    }

    tampilkan() {
        console.log(this.nama + " (" + this.umur + " th)");
    }

    setNama(nama) {
        this.nama = nama;
        return this;              // method chaining
    }

    setUmur(umur) {
        this.umur = umur;
        return this;
    }
}

const a = new Mahasiswa("Budi", 20);
const b = new Mahasiswa("Ani", 21);

a.tampilkan();
b.tampilkan();

console.log("\nmethod chaining:");
a.setNama("Budi Santoso").setUmur(22);
a.tampilkan();

// ---------- KEANEHAN KHAS JAVASCRIPT ----------
// Di bahasa lain, this ditentukan oleh PEMILIK method.
// Di JavaScript, this ditentukan oleh CARA method dipanggil.

console.log("\n1. dipanggil lewat object -> this benar:");
a.tampilkan();

console.log("2. method dilepas dari object -> this hilang:");
const lepas = a.tampilkan;
try {
    lepas();                      // tidak ada object di kiri titik
} catch (e) {
    console.log("   TypeError: " + e.message);
}

console.log("3. diperbaiki dengan bind:");
const terikat = a.tampilkan.bind(a);
terikat();

console.log("4. diperbaiki dengan arrow function:");
const bungkus = () => a.tampilkan();
bungkus();

// Arrow function TIDAK punya this sendiri — ia meminjam dari sekitarnya.
// Karena itu arrow function TIDAK boleh dipakai sebagai method biasa:
const salah = {
    nama: "Dedi",
    sapa: () => console.log("   this.nama = " + this.nama)   // bukan object ini
};
console.log("5. arrow function sebagai method (SALAH):");
salah.sapa();`
  },

  output: `Budi (20 th)
Ani (21 th)

alamat this tiap object (pasti berbeda):
  Budi -> this = 0x7ffd4c2a4b30
  Ani -> this = 0x7ffd4c2a4b10

method chaining:
Budi Santoso (22 th)

static method: tidak punya this`,

  kesalahanUmum: [
    {
      salah: 'Di Python, mendefinisikan method tanpa `self`: `def tampilkan():`',
      kenapa: 'Python otomatis mengirim object sebagai argumen pertama. Karena method-nya tidak menyediakan parameter untuk menampung, muncul `TypeError: takes 0 positional arguments but 1 was given` — pesan yang membingungkan karena mahasiswa merasa tidak mengirim argumen apa pun.',
      benar: 'Tulis `def tampilkan(self):`. Cara menjelaskan tercepat: tulis ulang pemanggilannya sebagai `Mahasiswa.tampilkan(obj)` di papan tulis, sehingga argumen tersembunyinya jadi terlihat.'
    },
    {
      salah: 'Di Python, mengakses attribute tanpa `self.`: `print(nama)` di dalam method.',
      kenapa: 'Python mencarinya sebagai variabel lokal, lalu variabel global — dan karena tidak ditemukan, muncul `NameError`. Attribute object **hanya** bisa dijangkau lewat `self`, tidak pernah otomatis seperti di C++ atau Java.',
      benar: 'Tulis `print(self.nama)`. Inilah harga dari filosofi eksplisit Python: semua akses ke data object harus lewat `self`.'
    },
    {
      salah: 'Di C++, menulis `nama = nama;` saat parameter dan attribute bernama sama.',
      kenapa: 'Parameter **menutupi** attribute (*shadowing*), sehingga kedua sisi merujuk ke parameter yang sama. Nilainya disalin ke dirinya sendiri dan attribute-nya tidak berubah sama sekali. **Kompiler tidak menganggapnya error**, jadi bug ini diam dan sulit dilihat.',
      benar: 'Gunakan `this->nama = nama;` di C++, atau `this.nama = nama;` di Java, C#, dan JavaScript. Alternatif yang lebih sederhana untuk pemula: beri nama parameter yang berbeda, misalnya `namaBaru`.'
    },
    {
      salah: 'Mengakses `this` atau `self` dari dalam static method.',
      kenapa: 'Static method tidak terikat object mana pun karena dipanggil lewat nama class. Pertanyaan "milik object yang mana?" tidak punya jawaban, sehingga kompiler menolaknya. Aturan ini sama di C++, Java, C#, dan Python.',
      benar: 'Kalau method butuh data object, jangan jadikan static. Kalau isinya sama sekali tidak menyentuh `this`/`self`, method itu memang lebih pantas static.'
    },
    {
      salah: 'Di JavaScript, mengirim method sebagai callback: `setTimeout(mhs.sapa, 1000)`',
      kenapa: 'Method-nya **terlepas dari object-nya**, sehingga saat dipanggil tidak ada object di sebelah kiri titik. Nilai `this` menjadi `undefined` atau object global, dan attribute-nya tidak ditemukan. Ini jebakan khas JavaScript yang tidak ada di bahasa lain.',
      benar: 'Bungkus dengan arrow function: `setTimeout(() => mhs.sapa(), 1000)`, atau kunci dengan `mhs.sapa.bind(mhs)`. Ingat: di JavaScript, `this` ditentukan oleh **cara memanggil**, bukan tempat menulis.'
    },
    {
      salah: 'Di JavaScript, memakai arrow function sebagai method di dalam object.',
      kenapa: 'Arrow function **tidak punya `this` sendiri** — ia meminjam dari lingkungan tempatnya ditulis, yang biasanya bukan object tersebut. Akibatnya `this.nama` menghasilkan `undefined` meski object-nya jelas punya attribute itu.',
      benar: 'Untuk method di dalam class atau object, pakai bentuk biasa: `sapa() { ... }`. Arrow function justru berguna untuk **callback di dalam method**, karena di situ sifat meminjam `this` itulah yang diinginkan.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **kartu nama pada name tag**.

Bayangkan sebuah perusahaan dengan 100 karyawan yang semuanya memakai seragam sama. Ketika atasan berkata *"sebutkan namamu"*, tiap orang menjawab berbeda — bukan karena perintahnya berbeda, tapi karena **masing-masing membaca name tag miliknya sendiri**. Name tag itulah \`this\` atau \`self\`.

Untuk menunjukkan bahwa ini **argumen tersembunyi**, tulis dua baris berdampingan di papan tulis:

- \`budi.tampilkan()\`
- \`Mahasiswa.tampilkan(budi)\`

Lalu katakan: *"kedua baris ini sama persis, dan kalian bisa membuktikannya sendiri di Python."* Momen ini biasanya membuat mahasiswa berhenti menganggap \`self\` sebagai aturan hafalan.

Untuk **perbedaan filosofi antar bahasa**, pakai perbandingan singkat: *"C++, Java, dan C# menaruh name tag itu di saku — ada, tapi tidak terlihat. Python menaruhnya di dada — jelas terlihat oleh semua orang."* Keduanya bekerja sama; yang berbeda cuma seberapa terang-terangan.

Untuk **keanehan JavaScript**, analoginya berbeda dan perlu ditekankan: di JavaScript, name tag itu **tidak menempel pada orangnya**, melainkan **diberikan saat orang itu dipanggil**. Kalau seseorang dipanggil tanpa disebut dari divisi mana, ia tidak tahu harus mengaku sebagai siapa. Itulah kenapa method yang dilepas dari object-nya kehilangan \`this\`.

Peragaan yang paling meyakinkan: cetak **alamat \`this\`** di C++ atau **\`id(self)\`** di Python dari dua object berbeda. Melihat dua angka yang benar-benar berbeda di layar membuktikan bahwa method yang sama memang menerima object yang berbeda — dan itu jauh lebih meyakinkan daripada penjelasan lisan apa pun.
`,

  latihan: [
    'Buat class `Mahasiswa` dengan constructor yang parameternya bernama sama persis dengan attribute-nya. Sengaja tulis tanpa `this.` lebih dulu, jalankan, lalu amati bahwa attribute-nya tidak terisi. Setelah itu perbaiki.',
    'Buktikan bahwa `obj.method()` sama dengan `Class.method(obj)` di Python. Jalankan keduanya dan pastikan keluarannya identik.',
    'Cetak `id(self)` di Python atau alamat `this` di C++ dari dua object berbeda. Catat hasilnya sebagai bahan peragaan saat kamu mengajar.',
    'Buat method chaining: tiga method setter yang masing-masing mengembalikan `this` (atau `*this` di C++), lalu panggil ketiganya dalam satu baris.',
    'Di JavaScript, buat object dengan method, lalu lepaskan method itu ke sebuah variabel dan panggil. Catat errornya, lalu perbaiki dengan `bind` dan dengan arrow function.',
    'Sengaja akses `this` dari dalam static method di C++, Java, atau C#. Catat pesan errornya dan jelaskan kenapa aturan itu masuk akal.',
    'Bandingkan cara menulis constructor yang sama di lima bahasa: C++, C#, Java, Python, dan JavaScript. Bagian mana yang benar-benar berbeda, dan bagian mana yang cuma beda tulisan?',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri yang menjawab pertanyaan "kenapa Python harus menulis self terus?". Wajib menuliskan bentuk panjang `Class.method(obj)` di kertas sebagai bukti.'
  ]
});

TOPICS.push({
  id: 'encapsulation',
  judul: 'Encapsulation (Enkapsulasi)',
  kategori: 'oop',
  tag: ['encapsulation', 'private', 'public', 'getter', 'setter', 'property'],
  ringkas: 'Menyembunyikan data agar tidak bisa diubah sembarangan — pilar pertama OOP.',

  fungsi: `**Menyembunyikan isi objek supaya tidak bisa dirusak dari luar.**

Terpakai di:

- **Menjaga data tetap sah** — saldo tidak bisa diisi angka negatif dari luar
- **Mengubah isi tanpa merusak pemakai** — selama methodnya tetap sama
- **Membatasi permukaan yang bisa salah** — makin sedikit yang terbuka, makin sedikit yang bisa dipakai keliru
- **Pemrograman Web II** — PDO dan model memakai prinsip yang sama

Manfaat yang paling terasa dalam kerja kelompok: **kamu bisa mengubah bagian dalam kelasmu tanpa mengabari siapa pun**, selama methodnya tidak berubah.

Kalau atributnya terbuka semua, setiap perubahan berisiko merusak kode orang lain.`,

  praktik: {
    tujuan: 'Kamu bisa membuat kelas yang mustahil dibawa ke keadaan tidak sah dari luar.',
    alat: [
      'Python 3, Java, atau C++'
    ],
    langkah: [
      { judul: 'Temukan keadaan tidak sah yang mungkin',
        isi: `Untuk kelas Rekening, tulis daftar keadaan yang **tidak boleh** terjadi: saldo negatif, penarikan melebihi saldo, jumlah nol atau negatif.

Daftar ini yang akan kamu jaga. Tanpa menuliskannya, kamu tidak tahu apa yang sedang dilindungi.` },
      { judul: 'Tutup atributnya',
        isi: `- Java atau C++: \`private double saldo;\`
- Python: \`self._saldo\` dengan satu garis bawah sebagai kesepakatan, atau \`self.__saldo\` untuk name mangling

Python tidak benar-benar mencegah akses, tetapi kesepakatan garis bawah dipahami semua orang: *"ini urusan dalam, jangan disentuh"*.` },
      { judul: 'Buka lewat method yang menjaga aturan',
        isi: `- \`setor(jumlah)\` menolak jumlah nol atau negatif
- \`tarik(jumlah)\` menolak kalau melebihi saldo
- \`saldo\` hanya bisa dibaca, tidak bisa ditulis

Perhatikan bahwa tidak ada \`setSaldo\`. Menyediakannya akan membatalkan seluruh perlindungan yang baru kamu buat.` },
      { judul: 'Uji dengan sengaja melanggar',
        isi: `Coba: setor negatif, tarik melebihi saldo, dan tulis langsung ke atribut privatnya.

Ketiganya harus gagal. Kalau ada yang lolos, perlindunganmu bocor.

**Langkah ini yang paling sering dilewatkan**, dan tanpanya kamu tidak tahu apakah enkapsulasimu bekerja.` },
      { judul: 'Pakai property untuk yang hanya bisa dibaca',
        isi: `Di Python, \`@property\` tanpa setter membuat atribut **hanya bisa dibaca**:

- \`@property def saldo(self): return self._saldo\`

Pemakai menulis \`rek.saldo\` seperti biasa, tetapi \`rek.saldo = 999\` ditolak.` },
      { judul: 'Buktikan manfaat mengubah isi',
        isi: `Ubah cara penyimpanan saldo dari rupiah menjadi sen di dalam kelasnya, tetapi jaga agar method-nya tetap menerima dan mengembalikan rupiah.

Kode yang memakai kelasmu **tidak perlu diubah sama sekali**.

Itulah manfaat enkapsulasi yang paling nyata, dan sekarang kamu sudah membuktikannya sendiri.` }
    ],
    cek: [
      'Setor dengan jumlah negatif ditolak',
      'Saldo tidak bisa ditulis langsung dari luar',
      'Mengubah satuan penyimpanan di dalam kelas tidak memaksa perubahan di kode pemakainya'
    ]
  },

  konsep: `
Bayangkan class \`RekeningBank\` dengan attribute \`saldo\` yang bersifat publik. Siapa pun bisa menulis:

\`rekening.saldo = -5000000;\`

Program tidak error. Tapi datanya sudah **rusak dan tidak masuk akal**, dan tidak ada satu pun bagian program yang bisa mencegahnya.

**Encapsulation** adalah pilar pertama OOP yang menjawab persoalan ini: **sembunyikan datanya, dan sediakan pintu terkendali untuk mengaksesnya.**

Caranya lewat **access modifier**:

- **\`private\`** — hanya bisa diakses **dari dalam class itu sendiri**. Ini yang sebaiknya jadi pilihan bawaanmu
- **\`protected\`** — bisa diakses dari dalam class **dan class turunannya**
- **\`public\`** — bisa diakses dari mana saja

Data dibuat \`private\`, lalu diberi pintu berupa **getter** (untuk membaca) dan **setter** (untuk mengubah). Bedanya dengan attribute publik: **setter bisa memeriksa dulu** sebelum menerima nilai.

Manfaat sesungguhnya ada tiga, dan yang ketiga sering terlewat:

- **Menjaga data tetap sah.** Setter menolak saldo negatif, umur di atas 200, atau IPK lebih dari 4,0.
- **Membatasi hak.** Sebuah nilai bisa dibuat hanya-baca dengan menyediakan getter tanpa setter.
- **Bebas mengubah isi dalam tanpa merusak pemakai.** Kalau suatu saat \`saldo\` diganti cara penyimpanannya, selama getter dan setter-nya tetap sama, **semua kode yang memakainya tidak perlu diubah sama sekali.** Inilah alasan terpenting encapsulation, dan baru terasa saat program membesar.

Perlu kamu ketahui, tingkat ketegasannya berbeda antar bahasa. **C++, Java, dan C# menegakkannya lewat kompiler.** **JavaScript** baru punya *private field* sungguhan sejak ES2022 lewat awalan \`#\`. Sedangkan **Python tidak menegakkan apa pun** — di sana privasi hanyalah **kesepakatan**, dan itu perlu dijelaskan hati-hati supaya mahasiswa tidak salah paham.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Rekening {\nprivate:\n    double saldo;          // tidak bisa disentuh dari luar\n\npublic:\n    double getSaldo() const { return saldo; }   // pintu BACA\n\n    void setor(double jml) {                    // pintu UBAH + penjagaan\n        if (jml > 0) saldo += jml;\n    }\n};',
      penjelasan: `
Perhatikan bahwa **tidak ada \`setSaldo\`** di sini, dan itu disengaja.

Kalau kita menyediakan \`setSaldo(double)\`, maka \`rekening.setSaldo(-5000000)\` tetap bisa dilakukan — dan kita kembali ke masalah semula, cuma dengan tulisan yang lebih panjang. **Setter yang sekadar menyalin nilai tanpa memeriksa apa pun tidak memberi manfaat.**

Yang benar adalah menyediakan method yang **mewakili operasi nyata**: \`setor()\`, \`tarik()\`, \`transfer()\`. Masing-masing punya aturannya sendiri — setoran harus positif, penarikan tidak boleh melebihi saldo.

Inilah kesalahpahaman terbesar tentang encapsulation: banyak yang mengira ia berarti *"buat semua private lalu tambahkan getter dan setter untuk semuanya"*. Padahal kalau setiap attribute punya getter dan setter tanpa penjagaan, **hasilnya sama saja dengan attribute publik** — cuma lebih bertele-tele.

Pertanyaan yang tepat bukan *"apa getter dan setter-nya?"* melainkan **"operasi apa yang masuk akal dilakukan pada object ini?"**

Perhatikan juga \`const\` pada getter: ia berjanji tidak mengubah apa pun, sehingga tetap bisa dipanggil dari object \`const\`.
`
    },
    {
      bahasa: 'java',
      kode: 'public class Rekening {\n    private double saldo;\n\n    public double getSaldo() { return saldo; }      // hanya BACA\n\n    public void setor(double jml) {\n        if (jml <= 0) throw new IllegalArgumentException("harus positif");\n        saldo += jml;\n    }\n}',
      penjelasan: `
Java memakai pola yang sama, dengan satu kebiasaan tambahan yang perlu kamu kenalkan: **melempar exception saat nilainya tidak sah**, bukan sekadar mengabaikannya diam-diam.

Bandingkan dua sikap ini:

- \`if (jml > 0) saldo += jml;\` → nilai tidak sah **diabaikan tanpa kabar**. Pemanggil mengira setorannya berhasil padahal tidak terjadi apa-apa
- \`throw new IllegalArgumentException(...)\` → pemanggil **langsung tahu** ada yang salah

Sikap kedua hampir selalu lebih baik, karena bug yang berteriak jauh lebih mudah diperbaiki daripada bug yang diam.

Java punya kesepakatan penamaan yang sangat baku dan diikuti seluruh ekosistemnya:

- **\`getNama()\`** untuk membaca
- **\`setNama(...)\`** untuk mengubah
- **\`isAktif()\`** untuk membaca nilai \`boolean\`

Kesepakatan ini bukan sekadar gaya — banyak pustaka Java **bergantung padanya** untuk bekerja otomatis. Karena itu di Java sebaiknya diikuti persis.

Java juga punya tingkat akses keempat yang tidak ada di C++: **package-private**, yaitu ketika tidak ditulis modifier apa pun. Anggotanya bisa diakses oleh class lain dalam paket yang sama.
`
    },
    {
      bahasa: 'csharp',
      kode: 'public class Rekening {\n    // Property: terlihat seperti attribute, padahal method\n    public double Saldo { get; private set; }\n\n    public string Pemilik { get; set; }        // baca & tulis\n    public string NoRek   { get; }             // hanya baca\n}',
      penjelasan: `
Inilah ciri khas C# yang tidak dimiliki C++ maupun Java: **property**.

Dari luar, \`rekening.Saldo\` **terlihat persis seperti attribute biasa** — tidak ada tanda kurung, tidak ada kata \`get\`. Tapi di baliknya, C# menjalankan method. Jadi kamu mendapat penulisan yang ringkas **sekaligus** kendali penuh.

Perhatikan \`{ get; private set; }\` pada \`Saldo\`. Artinya: **siapa pun boleh membaca, tapi hanya class ini sendiri yang boleh mengubah.** Ini pola yang sangat rapi dan sulit ditiru seringkas itu di Java.

Kalau butuh penjagaan, property bisa ditulis lengkap:

\`public double Saldo { get { return saldo; } set { if (value > 0) saldo = value; } }\`

Kata \`value\` di dalam \`set\` adalah kata kunci khusus yang berisi nilai yang sedang ditugaskan.

**Kenapa ini penting untuk dipahami?** Karena di Java, mengubah attribute publik menjadi terkendali berarti **mengubah semua kode yang memakainya** dari \`obj.saldo\` menjadi \`obj.getSaldo()\`. Di C#, kamu bisa mengubah property biasa menjadi property berpenjagaan **tanpa mengubah satu baris pun** kode pemakainya. Inilah keunggulan nyata property.

Python punya gagasan yang sama persis lewat **\`@property\`**.
`
    },
    {
      bahasa: 'python',
      kode: 'class Rekening:\n    def __init__(self):\n        self.saldo = 0        # publik\n        self._internal = 0    # "jangan disentuh" — hanya kesepakatan\n        self.__rahasia = 0    # name mangling, TETAP bisa diakses\n\nr = Rekening()\nprint(r._Rekening__rahasia)   # berhasil! bukan private sungguhan',
      penjelasan: `
**Python tidak punya \`private\` yang sesungguhnya**, dan ini wajib kamu jelaskan dengan jujur supaya mahasiswa tidak salah paham.

Yang ada hanyalah dua kesepakatan:

- **Satu garis bawah** (\`_internal\`) → murni **kesepakatan sosial** yang berarti *"ini urusan dalam, sebaiknya jangan disentuh"*. Python tidak melarang apa pun.
- **Dua garis bawah** (\`__rahasia\`) → memicu ***name mangling***: Python diam-diam mengubah namanya menjadi \`_Rekening__rahasia\`. Ini **bukan** penyembunyian, melainkan mekanisme untuk mencegah bentrok nama dengan class turunan. Seperti terlihat di contoh, datanya tetap bisa diakses kalau kamu tahu nama barunya.

Filosofi Python soal ini terkenal: *"kita semua orang dewasa yang bertanggung jawab"*. Bahasanya memilih **memberi tanda**, bukan **memasang gembok**.

Konsekuensi praktis untuk kamu sebagai asprak: kalau ada mahasiswa yang bertanya *"kenapa di Python masih bisa diakses padahal sudah private?"*, jawabannya bukan karena mereka salah menulis kode — memang begitulah Python dirancang.

Cara Python menegakkan aturan bukan lewat larangan, melainkan lewat **\`@property\`** yang membuat akses langsung menjadi terkendali tanpa mengubah cara penulisannya.
`
    },
    {
      bahasa: 'python',
      kode: 'class Rekening:\n    @property\n    def saldo(self):              # dipanggil saat DIBACA\n        return self._saldo\n\n    @saldo.setter\n    def saldo(self, nilai):       # dipanggil saat DITUGASI\n        if nilai < 0:\n            raise ValueError("saldo tidak boleh negatif")\n        self._saldo = nilai\n\nr.saldo = -100                    # ValueError! padahal tulisannya biasa',
      penjelasan: `
**\`@property\` adalah cara Python menegakkan aturan tanpa mengubah cara penulisan.**

Perhatikan baris terakhir: \`r.saldo = -100\` **terlihat seperti penugasan attribute biasa**, tapi diam-diam menjalankan method \`setter\` yang menolaknya. Pemakainya tidak perlu tahu apa pun; ia cukup menulis seperti biasa.

Inilah yang membuat \`@property\` sangat berguna, dan alasannya sama dengan property di C#:

**Kamu bisa mengubah attribute biasa menjadi attribute berpenjagaan tanpa mengubah satu baris pun kode yang memakainya.**

Karena itu di Python **tidak lazim** menulis getter dan setter bergaya Java sejak awal. Yang idiomatis adalah:

- Mulai dengan attribute biasa: \`self.saldo = 0\`
- **Baru** ubah menjadi \`@property\` kalau memang butuh penjagaan

Menulis \`get_saldo()\` dan \`set_saldo()\` di Python justru dianggap gaya yang tidak wajar, karena Python sudah menyediakan cara yang lebih baik.

Untuk membuat attribute **hanya-baca**, cukup sediakan \`@property\` tanpa setter-nya. Setiap upaya menugasi nilainya akan ditolak dengan \`AttributeError\`.
`
    },
    {
      bahasa: 'js',
      kode: 'class Rekening {\n    #saldo = 0;              // # = private SUNGGUHAN sejak ES2022\n\n    get saldo() { return this.#saldo; }   // getter\n\n    setor(jml) {\n        if (jml > 0) this.#saldo += jml;\n    }\n}\n\nconst r = new Rekening();\n// r.#saldo  -> SyntaxError, benar-benar tidak bisa diakses',
      penjelasan: `
JavaScript baru mendapat **private field sungguhan** pada ES2022, ditandai dengan awalan **\`#\`**.

Berbeda dari Python, ini **benar-benar ditegakkan**. Mengakses \`r.#saldo\` dari luar class bukan sekadar menghasilkan \`undefined\`, melainkan **SyntaxError** — kodenya bahkan tidak bisa dijalankan.

Sebelum ES2022, JavaScript hanya punya kesepakatan garis bawah (\`_saldo\`) yang persis seperti Python: sekadar tanda, tanpa perlindungan.

Perhatikan juga \`get saldo()\` yang membuat **getter**. Sama seperti property di C# dan \`@property\` di Python, ia dipanggil **tanpa tanda kurung** dari luar: \`r.saldo\` — bukan \`r.saldo()\`.

Jadi kalau kita rangkum keempat pendekatannya:

- **C++ dan Java** → \`private\` + method \`getX()\`/\`setX()\` yang ditulis eksplisit
- **C#** → property \`{ get; set; }\` yang tampak seperti attribute
- **Python** → \`@property\`, dengan privasi yang hanya berupa kesepakatan
- **JavaScript** → \`#field\` untuk privasi sungguhan, plus \`get\`/\`set\`

Yang menarik, ketiga bahasa modern — C#, Python, dan JavaScript — sama-sama bergerak ke arah yang sama: **penulisan seperti attribute, tapi perilaku seperti method.**
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

class Rekening {
private:                                  // tidak bisa disentuh dari luar
    string pemilik;
    double saldo;

public:
    Rekening(string p, double awal) : pemilik(p), saldo(0) {
        if (awal > 0) saldo = awal;
    }

    /* GETTER: hanya membaca, diberi const */
    double getSaldo() const { return saldo; }
    string getPemilik() const { return pemilik; }

    /* Bukan setSaldo, tapi operasi yang MASUK AKAL + penjagaan */
    void setor(double jml) {
        if (jml <= 0) {
            cout << "  [ditolak] setoran harus positif" << endl;
            return;
        }
        saldo += jml;
        cout << "  [ok] setor " << jml << ", saldo = " << saldo << endl;
    }

    void tarik(double jml) {
        if (jml <= 0) {
            cout << "  [ditolak] penarikan harus positif" << endl;
            return;
        }
        if (jml > saldo) {
            cout << "  [ditolak] saldo tidak cukup" << endl;
            return;
        }
        saldo -= jml;
        cout << "  [ok] tarik " << jml << ", saldo = " << saldo << endl;
    }
};

int main() {
    Rekening r("Budi", 100000);

    cout << "pemilik : " << r.getPemilik() << endl;
    cout << "saldo   : " << r.getSaldo() << endl << endl;

    r.setor(50000);
    r.tarik(30000);

    cout << "\npercobaan yang dijaga:" << endl;
    r.setor(-1000);          // ditolak
    r.tarik(999999);         // ditolak

    cout << "\nsaldo akhir : " << r.getSaldo() << endl;

    // r.saldo = -5000000;   <- ditolak kompiler: saldo bersifat private
    cout << "\nakses langsung ke r.saldo ditolak kompiler." << endl;

    return 0;
}`,

    csharp: String.raw`using System;

public class Rekening {
    // Property ringkas: boleh dibaca siapa saja, hanya class ini yang mengubah
    public double Saldo { get; private set; }
    public string Pemilik { get; }          // hanya baca, diisi di constructor

    public Rekening(string pemilik, double awal) {
        Pemilik = pemilik;
        Saldo = awal > 0 ? awal : 0;
    }

    public void Setor(double jml) {
        if (jml <= 0) {
            Console.WriteLine("  [ditolak] setoran harus positif");
            return;
        }
        Saldo += jml;
        Console.WriteLine($"  [ok] setor {jml}, saldo = {Saldo}");
    }

    public void Tarik(double jml) {
        if (jml > Saldo) {
            Console.WriteLine("  [ditolak] saldo tidak cukup");
            return;
        }
        Saldo -= jml;
        Console.WriteLine($"  [ok] tarik {jml}, saldo = {Saldo}");
    }
}

/* Property versi lengkap, kalau butuh penjagaan saat menulis */
public class Mahasiswa {
    private double ipk;

    public double Ipk {
        get { return ipk; }
        set {
            // 'value' adalah kata kunci berisi nilai yang sedang ditugaskan
            if (value < 0 || value > 4.0)
                throw new ArgumentException("IPK harus 0 sampai 4");
            ipk = value;
        }
    }
}

class Program {
    static void Main() {
        Rekening r = new Rekening("Budi", 100000);

        Console.WriteLine($"pemilik : {r.Pemilik}");
        Console.WriteLine($"saldo   : {r.Saldo}\n");   // dibaca seperti attribute

        r.Setor(50000);
        r.Tarik(30000);

        Console.WriteLine("\npercobaan yang dijaga:");
        r.Setor(-1000);
        r.Tarik(999999);

        // r.Saldo = -5000000;   <- ditolak: set bersifat private
        Console.WriteLine("\nmenulis r.Saldo ditolak kompiler.");

        Console.WriteLine("\nproperty dengan penjagaan:");
        Mahasiswa m = new Mahasiswa();
        m.Ipk = 3.75;
        Console.WriteLine($"  IPK = {m.Ipk}");
        try {
            m.Ipk = 5.0;                    // tulisannya biasa, tapi dijaga
        } catch (ArgumentException e) {
            Console.WriteLine($"  ditolak: {e.Message}");
        }
    }
}`,

    java: String.raw`public class Rekening {
    private String pemilik;      // private -> ditegakkan kompiler
    private double saldo;

    public Rekening(String pemilik, double awal) {
        this.pemilik = pemilik;
        this.saldo = awal > 0 ? awal : 0;
    }

    /* GETTER: kesepakatan penamaan Java sangat baku */
    public double getSaldo()   { return saldo; }
    public String getPemilik() { return pemilik; }

    /* Operasi nyata, bukan setSaldo */
    public void setor(double jml) {
        if (jml <= 0) {
            throw new IllegalArgumentException("setoran harus positif");
        }
        saldo += jml;
        System.out.println("  [ok] setor " + jml + ", saldo = " + saldo);
    }

    public void tarik(double jml) {
        if (jml > saldo) {
            throw new IllegalStateException("saldo tidak cukup");
        }
        saldo -= jml;
        System.out.println("  [ok] tarik " + jml + ", saldo = " + saldo);
    }

    public static void main(String[] args) {
        Rekening r = new Rekening("Budi", 100000);

        System.out.println("pemilik : " + r.getPemilik());
        System.out.println("saldo   : " + r.getSaldo() + "\n");

        r.setor(50000);
        r.tarik(30000);

        System.out.println("\npercobaan yang dijaga:");
        try {
            r.setor(-1000);
        } catch (IllegalArgumentException e) {
            System.out.println("  ditolak: " + e.getMessage());
        }
        try {
            r.tarik(999999);
        } catch (IllegalStateException e) {
            System.out.println("  ditolak: " + e.getMessage());
        }

        System.out.println("\nsaldo akhir : " + r.getSaldo());
        // r.saldo = -5000000;   <- ditolak kompiler
    }
}`,

    python: String.raw`class Rekening:
    def __init__(self, pemilik, awal=0):
        self._pemilik = pemilik      # satu garis bawah = "urusan dalam"
        self._saldo = awal if awal > 0 else 0

    # ---------- @property: dibaca seperti attribute ----------
    @property
    def saldo(self):
        return self._saldo

    @property
    def pemilik(self):
        return self._pemilik          # tanpa setter -> HANYA BACA

    # ---------- Operasi nyata, bukan set_saldo ----------
    def setor(self, jml):
        if jml <= 0:
            raise ValueError("setoran harus positif")
        self._saldo += jml
        print(f"  [ok] setor {jml}, saldo = {self._saldo}")

    def tarik(self, jml):
        if jml > self._saldo:
            raise ValueError("saldo tidak cukup")
        self._saldo -= jml
        print(f"  [ok] tarik {jml}, saldo = {self._saldo}")


r = Rekening("Budi", 100000)
print("pemilik :", r.pemilik)         # tanpa tanda kurung — terlihat attribute
print("saldo   :", r.saldo, "\n")

r.setor(50000)
r.tarik(30000)

print("\npercobaan yang dijaga:")
for aksi, jml in [(r.setor, -1000), (r.tarik, 999999)]:
    try:
        aksi(jml)
    except ValueError as e:
        print(f"  ditolak: {e}")

# Attribute hanya-baca
print("\nmencoba menulis r.pemilik:")
try:
    r.pemilik = "Ani"
except AttributeError as e:
    print("  AttributeError -> tidak ada setter")


# ---------- @property DENGAN setter berpenjagaan ----------
class Mahasiswa:
    def __init__(self, nama):
        self.nama = nama
        self._ipk = 0.0

    @property
    def ipk(self):
        return self._ipk

    @ipk.setter
    def ipk(self, nilai):
        if not 0 <= nilai <= 4.0:
            raise ValueError("IPK harus 0 sampai 4")
        self._ipk = nilai


print("\nproperty dengan penjagaan:")
m = Mahasiswa("Citra")
m.ipk = 3.75                          # tulisannya biasa, diam-diam dijaga
print(f"  IPK = {m.ipk}")
try:
    m.ipk = 5.0
except ValueError as e:
    print(f"  ditolak: {e}")


# ---------- KEJUJURAN: Python TIDAK punya private sungguhan ----------
class Rahasia:
    def __init__(self):
        self.__kode = "12345"         # dua garis bawah -> name mangling


x = Rahasia()
print("\nprivate di Python:")
try:
    print(x.__kode)
except AttributeError:
    print("  x.__kode        -> AttributeError")
print("  x._Rahasia__kode ->", x._Rahasia__kode, " <- tetap bisa diakses!")
print("  Python memberi TANDA, bukan GEMBOK.")`,

    js: String.raw`class Rekening {
    #saldo = 0;                    // # = private SUNGGUHAN (ES2022)
    #pemilik;

    constructor(pemilik, awal) {
        this.#pemilik = pemilik;
        this.#saldo = awal > 0 ? awal : 0;
    }

    // getter: dipanggil TANPA tanda kurung dari luar
    get saldo() { return this.#saldo; }
    get pemilik() { return this.#pemilik; }

    // Operasi nyata, bukan set saldo
    setor(jml) {
        if (jml <= 0) throw new Error("setoran harus positif");
        this.#saldo += jml;
        console.log("  [ok] setor " + jml + ", saldo = " + this.#saldo);
    }

    tarik(jml) {
        if (jml > this.#saldo) throw new Error("saldo tidak cukup");
        this.#saldo -= jml;
        console.log("  [ok] tarik " + jml + ", saldo = " + this.#saldo);
    }
}

const r = new Rekening("Budi", 100000);

console.log("pemilik : " + r.pemilik);      // getter, tanpa kurung
console.log("saldo   : " + r.saldo + "\n");

r.setor(50000);
r.tarik(30000);

console.log("\npercobaan yang dijaga:");
try { r.setor(-1000); } catch (e) { console.log("  ditolak: " + e.message); }
try { r.tarik(999999); } catch (e) { console.log("  ditolak: " + e.message); }

console.log("\nsaldo akhir : " + r.saldo);

// r.#saldo  -> SyntaxError, benar-benar tidak bisa diakses dari luar
console.log("\nr.#saldo dari luar -> SyntaxError (private sungguhan)");

// setter juga tersedia bila memang dibutuhkan
class Mahasiswa {
    #ipk = 0;
    get ipk() { return this.#ipk; }
    set ipk(nilai) {
        if (nilai < 0 || nilai > 4) throw new Error("IPK harus 0 sampai 4");
        this.#ipk = nilai;
    }
}

console.log("\nsetter dengan penjagaan:");
const m = new Mahasiswa();
m.ipk = 3.75;                               // tulisannya biasa
console.log("  IPK = " + m.ipk);
try { m.ipk = 5.0; } catch (e) { console.log("  ditolak: " + e.message); }`
  },

  output: `pemilik : Budi
saldo   : 100000

  [ok] setor 50000, saldo = 150000
  [ok] tarik 30000, saldo = 120000

percobaan yang dijaga:
  [ditolak] setoran harus positif
  [ditolak] saldo tidak cukup

saldo akhir : 120000

akses langsung ke r.saldo ditolak kompiler.`,

  kesalahanUmum: [
    {
      salah: 'Membuat getter dan setter untuk **semua** attribute tanpa penjagaan apa pun.',
      kenapa: 'Kalau `setSaldo(double x) { saldo = x; }` menerima nilai apa pun, hasilnya **sama saja dengan attribute publik** — cuma lebih panjang. Data tetap bisa dirusak dengan `setSaldo(-5000000)`. Encapsulation-nya jadi sekadar formalitas.',
      benar: 'Tanyakan **"operasi apa yang masuk akal pada object ini?"**, lalu sediakan method yang mewakili operasi itu: `setor()`, `tarik()`. Masing-masing membawa aturannya sendiri.'
    },
    {
      salah: 'Di Python, mengira `__nama` membuat attribute benar-benar private.',
      kenapa: 'Dua garis bawah hanya memicu **name mangling** — namanya diubah menjadi `_NamaClass__nama`. Datanya **tetap bisa diakses** kalau nama barunya diketahui. Tujuan aslinya mencegah bentrok nama dengan class turunan, bukan menyembunyikan.',
      benar: 'Pahami bahwa Python **memberi tanda, bukan gembok**. Gunakan satu garis bawah sebagai penanda "urusan dalam", dan pakai `@property` bila memang butuh penjagaan nilai.'
    },
    {
      salah: 'Di Python, menulis getter dan setter bergaya Java: `get_saldo()` dan `set_saldo()`',
      kenapa: 'Gaya ini tidak idiomatis di Python dan membuat kode jadi bertele-tele tanpa manfaat tambahan. Python sudah menyediakan `@property` yang memberi kendali sama tanpa mengubah cara penulisan pemakainya.',
      benar: 'Mulai dengan attribute biasa `self.saldo = 0`. **Baru** ubah menjadi `@property` kalau nanti butuh penjagaan — dan kode yang sudah memakainya tidak perlu diubah sama sekali.'
    },
    {
      salah: 'Menjadikan attribute `public` supaya "lebih praktis".',
      kenapa: 'Selain data bisa dirusak, ada akibat yang baru terasa belakangan: begitu banyak kode sudah memakai `obj.saldo` secara langsung, mengubah cara penyimpanannya berarti **mengubah semua tempat yang memakainya**. Di Java, ini berarti mengganti `obj.saldo` menjadi `obj.getSaldo()` di seluruh program.',
      benar: 'Jadikan `private` sebagai pilihan bawaan, dan buka hanya yang memang perlu. Di C#, Python, dan JavaScript, property memungkinkan perubahan itu dilakukan **tanpa menyentuh kode pemakainya**.'
    },
    {
      salah: 'Membuat setter yang mengabaikan nilai tidak sah secara diam-diam.',
      kenapa: 'Pemanggil mengira operasinya berhasil padahal tidak terjadi apa-apa. Bug jenis ini muncul jauh dari sumbernya dan sangat sulit dilacak — jauh lebih sulit daripada program yang langsung berhenti dengan pesan jelas.',
      benar: 'Lempar exception (`IllegalArgumentException` di Java, `ValueError` di Python, `throw new Error` di JavaScript) atau kembalikan penanda gagal yang **wajib** diperiksa pemanggil. Bug yang berteriak lebih baik daripada bug yang diam.'
    },
    {
      salah: 'Di C++, lupa menulis `public:` sehingga seluruh anggota jadi private.',
      kenapa: 'Anggota `class` di C++ bawaannya **private**. Tanpa `public:`, bahkan constructor pun tidak bisa diakses dari luar, sehingga object tidak bisa dibuat sama sekali. Pesan errornya menyebut *is private within this context* dan sering dikira salah ketik.',
      benar: 'Tulis `public:` sebelum anggota yang memang perlu diakses dari luar. Ingat bedanya: `struct` bawaannya public, `class` bawaannya private.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **mesin ATM**.

Uangmu ada di dalam brankas bank — kamu **tidak bisa** menjangkaunya langsung. Yang tersedia hanyalah beberapa tombol: cek saldo, setor, tarik. Setiap tombol punya aturannya sendiri: tarik tunai ditolak kalau saldomu tidak cukup, dan tidak ada tombol *"ubah saldo jadi sesuka hati"*.

Dari analogi ini semuanya jadi jelas:

- **Brankas** = attribute \`private\`
- **Tombol** = method \`public\`
- **Aturan tiap tombol** = penjagaan di dalam setter

Pertanyaan pemandu yang efektif: *"kenapa bank tidak menyediakan tombol 'atur saldo langsung'?"* Mahasiswa akan menjawab sendiri — karena akan disalahgunakan. Itulah alasan \`setSaldo()\` sebaiknya tidak ada.

Untuk menekankan **manfaat ketiga yang sering terlewat**, pakai analogi lanjutannya: bank boleh mengganti seluruh sistem penyimpanan di belakang — dari catatan kertas ke basis data — dan **kamu sebagai nasabah tidak perlu belajar apa pun lagi**, karena tombol ATM-nya tetap sama. Inilah kenapa encapsulation membuat program mudah diubah.

Untuk **perbedaan Python**, pakai perbandingan yang jujur dan mudah diingat: *"C++, Java, dan C# memasang gembok. Python cuma menempel stiker bertuliskan 'jangan dibuka'."* Keduanya menyampaikan maksud yang sama, tapi hanya satu yang benar-benar menghalangi. Peragakan dengan menjalankan \`x._Rahasia__kode\` di depan kelas — reaksi terkejut mahasiswa biasanya membuat pelajaran ini melekat.

Untuk **property di C#, Python, dan JavaScript**, analoginya **keran air**: kamu memutar keran seperti biasa, tapi di baliknya ada penyaring yang bekerja tanpa kamu sadari. Cara memakainya tidak berubah, tapi yang keluar sudah terjaga.
`,

  latihan: [
    'Buat class `Rekening` dengan saldo `private`, lalu sediakan `setor()` dan `tarik()` yang menolak nilai tidak sah. Sengaja coba akses saldonya langsung dari luar dan catat pesan errornya.',
    'Buat class `Mahasiswa` dengan attribute `ipk` yang hanya menerima nilai 0 sampai 4. Kerjakan di dua bahasa: satu memakai setter biasa, satu memakai property (C#, Python, atau JavaScript).',
    'Buat attribute **hanya-baca**: sediakan getter tanpa setter, lalu buktikan bahwa upaya menulisnya ditolak. Kapan pola ini berguna di dunia nyata?',
    'Di Python, buat attribute dengan dua garis bawah lalu akses lewat nama hasil *name mangling*-nya. Jelaskan kenapa ini membuktikan Python tidak punya private sungguhan.',
    'Ambil class yang attribute-nya publik, lalu ubah menjadi terkendali. Di Java, hitung berapa baris kode pemakai yang ikut berubah. Ulangi di Python dengan `@property` — berapa baris yang berubah?',
    'Buat class `Suhu` yang menyimpan derajat Celsius secara internal, tapi menyediakan property `fahrenheit` yang menghitung otomatis saat dibaca maupun ditulis.',
    'Bandingkan cara mendeklarasikan attribute private di lima bahasa: C++, C#, Java, Python, dan JavaScript. Mana yang ditegakkan kompiler, dan mana yang cuma kesepakatan?',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang encapsulation memakai analogi ATM. Targetnya, kamu bisa menyimpulkan sendiri kenapa `setSaldo()` sebaiknya tidak disediakan.'
  ]
});

TOPICS.push({
  id: 'inheritance',
  judul: 'Inheritance (Pewarisan)',
  kategori: 'oop',
  tag: ['inheritance', 'pewarisan', 'extends', 'super', 'base', 'protected'],
  ringkas: 'Membuat class baru yang mewarisi sifat class lain — supaya kode yang sama tidak ditulis dua kali.',

  fungsi: `**Membuat kelas baru yang mewarisi sifat kelas lain, tanpa menyalin kodenya.**

Terpakai di:

- **Kelas dasar bersama** — \`BaseModel\` di Pemrograman Web II adalah contohnya
- **Kerangka kerja** — kamu mewarisi \`Controller\` atau \`Activity\` dan mengisi bagianmu
- **Hierarki yang memang bertingkat** — Pegawai, lalu Dosen dan Staf
- **Penanganan galat** — hierarki exception

Peringatan yang penting sejak awal: **pewarisan sering dipakai berlebihan.**

Aturan yang membantu memutuskan: pakai pewarisan hanya kalau **"B adalah sejenis A"** benar-benar masuk akal. Kalau hubungannya **"B punya A"**, yang kamu butuhkan **komposisi**, bukan pewarisan.

Mobil **punya** mesin. Mobil **bukan** sejenis mesin.`,

  praktik: {
    tujuan: `Kamu bisa memutuskan kapan memakai pewarisan dan kapan komposisi, serta membuat hierarki yang tidak menyulitkan nanti.`,
    alat: [
      'Python 3, Java, atau C++'
    ],
    langkah: [
      { judul: 'Uji dengan kalimat "adalah sejenis"',
        isi: `Sebelum menulis \`extends\`, ucapkan kalimatnya:

- *"Dosen adalah sejenis Pegawai"* → masuk akal, pewarisan cocok
- *"Mobil adalah sejenis Mesin"* → tidak masuk akal, pakai komposisi

Uji sederhana ini menyaring sebagian besar pemakaian pewarisan yang keliru.` },
      { judul: 'Panggil konstruktor induk',
        isi: `- Python: \`super().__init__(...)\`
- Java: \`super(...)\` dan harus baris **pertama**
- C++: di daftar inisialisasi konstruktor

Lupa memanggilnya membuat bagian induk objekmu **tidak terinisialisasi**, dan galatnya sering muncul jauh dari penyebabnya.` },
      { judul: 'Timpa method dengan hati-hati',
        isi: `Method turunan harus tetap **bisa dipakai** di mana pun induknya dipakai. Ini prinsip **Liskov** dari Rekayasa Perangkat Lunak.

Kalau turunanmu melempar galat untuk masukan yang diterima induknya, kamu melanggarnya — dan kode yang bekerja dengan induknya akan rusak saat diberi turunannya.` },
      { judul: 'Jaga kedalaman hierarki',
        isi: `Lebih dari tiga tingkat hampir selalu terlalu dalam.

Untuk memahami satu kelas, pembaca harus membuka semua induknya. Empat tingkat berarti empat berkas dibuka untuk memahami satu method.

Kalau hierarkimu dalam, pertimbangkan komposisi.` },
      { judul: 'Coba komposisi sebagai gantinya',
        isi: `Alih-alih \`class Mobil extends Mesin\`, tulis \`class Mobil\` yang **punya** atribut \`mesin\`.

Keuntungannya: mesinnya bisa **diganti saat berjalan**, bisa diuji terpisah, dan Mobil tidak mewarisi method Mesin yang tidak relevan.

Kaidah yang lazim: **utamakan komposisi daripada pewarisan.**` },
      { judul: 'Kenali masalah pewarisan berganda',
        isi: `Python mengizinkan mewarisi dari beberapa kelas. Kalau dua induk punya method bernama sama, mana yang dipakai?

Python memakai urutan bernama **MRO**, dan bisa dilihat dengan \`Kelas.__mro__\`.

Java melarangnya untuk kelas, dan hanya mengizinkan banyak interface. Itu keputusan sadar untuk menghindari kerumitan ini.` }
    ],
    cek: [
      'Setiap pewarisan di kodemu lolos uji kalimat "adalah sejenis"',
      'Konstruktor induk dipanggil di semua kelas turunanmu',
      'Tidak ada hierarki yang lebih dalam dari tiga tingkat'
    ]
  },

  konsep: `
Bayangkan kamu membuat class \`Mahasiswa\` dan \`Dosen\`. Keduanya sama-sama punya \`nama\`, \`umur\`, dan \`alamat\`, serta sama-sama bisa \`perkenalan()\`. Yang berbeda cuma sedikit: mahasiswa punya \`nim\`, dosen punya \`nidn\`.

Menulis ulang bagian yang sama di kedua class punya dua kerugian: melelahkan, dan **kalau ada perbaikan, kamu harus mengubahnya di dua tempat** — dan biasanya satu tempat terlupakan.

**Inheritance** menyelesaikannya: buat satu class induk berisi semua kesamaan, lalu class-class lain **mewarisinya**.

Istilahnya berpasangan, dan tiap bahasa memakai kata berbeda:

- **Base class** / **parent** / **superclass** — class yang diwarisi
- **Derived class** / **child** / **subclass** — class yang mewarisi

Yang diwarisi adalah **seluruh attribute dan method** milik induk, kecuali yang bersifat \`private\`. Class turunan lalu bisa **menambahkan** hal baru, atau **mengubah** perilaku yang diwarisinya.

Di sinilah muncul access modifier ketiga yang sebelumnya belum terpakai: **\`protected\`**. Anggota \`protected\` bisa diakses **dari dalam class dan class turunannya**, tapi tetap tertutup dari luar. Inilah jalan tengah antara \`private\` dan \`public\`.

Satu hal yang wajib kamu tekankan sebagai asprak: **inheritance hanya tepat untuk hubungan "adalah sebuah"** (*is-a*). Tanyakan dengan kalimat lengkap:

- *"Mahasiswa **adalah sebuah** Orang"* → masuk akal, pakai inheritance
- *"Mobil **adalah sebuah** Mesin"* → tidak masuk akal. Mobil **punya** mesin — dan untuk hubungan "punya" (*has-a*), yang tepat adalah **komposisi**, yaitu menyimpan object lain sebagai attribute

Kesalahan memakai inheritance untuk hubungan "punya" adalah salah satu kesalahan desain OOP paling sering, dan akibatnya baru terasa saat program membesar.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Orang {                    // base class\nprotected:\n    string nama;                 // bisa diakses turunan, tertutup dari luar\n};\n\nclass Mahasiswa : public Orang { // derived class\n    string nim;                  // tambahan khas Mahasiswa\n};',
      penjelasan: `
Tanda **titik dua** menyatakan pewarisan di C++, dan kata \`public\` sesudahnya menentukan **bagaimana hak akses induk diteruskan**.

Hampir selalu yang dipakai adalah \`public\`, yang berarti hak akses anggota induk **dipertahankan apa adanya**: yang publik tetap publik, yang protected tetap protected. Ada juga \`private\` dan \`protected\` inheritance, tapi keduanya jarang dipakai dan bisa diabaikan untuk sekarang.

Perhatikan penggunaan **\`protected\`** pada \`nama\`. Kalau ditulis \`private\`, class \`Mahasiswa\` **tidak bisa menyentuhnya sama sekali** — padahal ia turunannya sendiri. Kalau ditulis \`public\`, siapa pun dari luar bisa mengubahnya. \`protected\` adalah jalan tengahnya.

Perbandingan penulisannya di lima bahasa:

- **C++** → \`class Mahasiswa : public Orang\`
- **C#** → \`class Mahasiswa : Orang\`
- **Java** → \`class Mahasiswa extends Orang\`
- **Python** → \`class Mahasiswa(Orang):\`
- **JavaScript** → \`class Mahasiswa extends Orang\`

Semuanya menyatakan hal yang sama; hanya tulisannya yang berbeda. Menunjukkan kelima bentuk ini berdampingan biasanya membantu mahasiswa melihat bahwa konsepnya satu.
`
    },
    {
      bahasa: 'java',
      kode: 'public class Mahasiswa extends Orang {\n    private String nim;\n\n    public Mahasiswa(String nama, int umur, String nim) {\n        super(nama, umur);      // WAJIB, dan harus baris PERTAMA\n        this.nim = nim;\n    }\n}',
      penjelasan: `
**Constructor tidak diwariskan.** Ini kejutan pertama yang biasa dialami mahasiswa: meski semua attribute diwarisi, cara membuat object-nya harus ditulis ulang.

Karena itu constructor turunan harus **memanggil constructor induk** lebih dulu, memakai \`super(...)\` di Java, C#, JavaScript, dan Python; atau lewat initializer list di C++.

Kenapa harus? Karena bagian induk dari object itu **perlu disiapkan lebih dulu** sebelum bagian turunannya diisi. Object dibangun **dari lapisan terluar ke dalam**: bagian Orang dulu, baru bagian Mahasiswa.

Di Java dan JavaScript, aturannya tegas: **\`super(...)\` wajib menjadi pernyataan pertama** di dalam constructor. Menulis apa pun sebelumnya langsung ditolak kompiler.

Kalau \`super(...)\` tidak ditulis sama sekali, Java diam-diam menyisipkan \`super()\` tanpa argumen. Ini berhasil **hanya kalau induknya punya constructor tanpa parameter**. Kalau tidak ada, muncul error yang membingungkan karena menunjuk baris constructor turunan padahal masalahnya di induk.

Urutan pemanggilannya perlu diingat: **constructor berjalan dari induk ke turunan, sedangkan destructor berjalan terbalik** — dari turunan ke induk. Sama seperti memakai dan melepas pakaian.
`
    },
    {
      bahasa: 'python',
      kode: 'class Mahasiswa(Orang):\n    def __init__(self, nama, umur, nim):\n        super().__init__(nama, umur)   # tanpa argumen di super()\n        self.nim = nim\n\n    def perkenalan(self):              # MENGGANTI method induk\n        dasar = super().perkenalan()   # panggil versi induk dulu\n        return dasar + f", NIM {self.nim}"',
      penjelasan: `
Python memakai \`super()\` **tanpa argumen apa pun** — berbeda dari Python 2 yang memerlukan \`super(Mahasiswa, self)\`. Bentuk ringkas ini berlaku sejak Python 3.

Yang lebih penting di sini adalah pola pada method \`perkenalan()\`. Class turunan **mengganti** method induk, tapi **tetap memanggil versi induknya** lewat \`super().perkenalan()\`, lalu menambahkan bagiannya sendiri.

Pola ini sangat sering dipakai dan layak kamu ajarkan: **jangan menyalin ulang kode induk, panggil saja versinya lalu tambahkan.** Dengan begitu, kalau versi induknya nanti diperbaiki, turunannya ikut terbaiki dengan sendirinya.

Perhatikan pula bahwa Python **tidak membedakan penulisan** untuk mengganti method. Cukup tulis method dengan nama sama, dan otomatis menggantikan versi induk. Tidak perlu kata kunci seperti \`virtual\` di C++ atau \`override\` di C#.

Satu hal yang perlu diketahui: kalau \`__init__\` turunan **tidak memanggil** \`super().__init__()\`, maka attribute milik induk **tidak pernah dibuat**. Programnya tidak error saat itu, tapi muncul \`AttributeError\` belakangan saat attribute itu hendak dipakai — dan penyebabnya terasa jauh dari gejalanya.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Mahasiswa : public Orang {\npublic:\n    // Constructor induk dipanggil lewat initializer list\n    Mahasiswa(string n, int u, string id)\n        : Orang(n, u), nim(id) { }\n\nprivate:\n    string nim;\n};',
      penjelasan: `
Di C++, constructor induk dipanggil lewat **initializer list**, bukan lewat kata kunci \`super\`. Nama induknya ditulis langsung: \`Orang(n, u)\`.

Yang perlu diperhatikan: **class induk selalu diinisialisasi lebih dulu**, sebelum attribute milik turunan — tidak peduli urutan penulisannya di initializer list. Ini konsisten dengan gagasan membangun object dari lapisan terluar ke dalam.

Kalau kamu **tidak menyebut induknya sama sekali**, C++ otomatis memanggil constructor induk **tanpa parameter**. Kalau induknya tidak punya constructor seperti itu, program gagal dikompilasi.

Ada satu hal khas C++ yang wajib diketahui dan akan dibahas lebih dalam di topik Polymorphism: **destructor class induk sebaiknya dibuat \`virtual\`.** Tanpa itu, menghapus object turunan lewat pointer bertipe induk hanya menjalankan destructor induk — destructor turunannya terlewat, dan sumber daya yang dipegangnya bocor.

Sejak C++11 ada jalan pintas yang berguna: **\`using Orang::Orang;\`** membuat seluruh constructor induk ikut tersedia di turunan, sehingga tidak perlu ditulis ulang satu per satu.
`
    },
    {
      bahasa: 'csharp',
      kode: 'public class Orang {\n    protected string nama;\n    public virtual string Perkenalan() {      // virtual = boleh diganti\n        return $"Saya {nama}";\n    }\n}\n\npublic class Mahasiswa : Orang {\n    public override string Perkenalan() {     // override WAJIB ditulis\n        return base.Perkenalan() + ", mahasiswa";\n    }\n}',
      penjelasan: `
C# menuntut penulisan yang paling tegas di antara kelima bahasa, dan justru itu kelebihannya.

Untuk mengganti method induk, **dua kata kunci wajib ada**:

- **\`virtual\`** pada method induk → menyatakan *"method ini boleh diganti turunan"*
- **\`override\`** pada method turunan → menyatakan *"saya sengaja menggantinya"*

Kenapa dituntut seketat itu? Karena mencegah dua kesalahan sekaligus.

**Pertama, salah ketik nama method.** Kalau kamu menulis \`override string Perkenalen()\` (salah eja), kompiler langsung menolak karena tidak ada method induk bernama begitu. Di Java tanpa anotasi \`@Override\`, kesalahan seperti ini menghasilkan method **baru** yang diam-diam tidak pernah terpanggil.

**Kedua, mengganti tanpa sengaja.** Method yang tidak ditandai \`virtual\` memang tidak dimaksudkan untuk diganti, dan C# menegakkannya.

Perbandingan sikap kelima bahasa soal ini:

- **C# dan C++** → harus ditandai \`virtual\` dulu; C++ menyarankan \`override\` sejak C++11
- **Java** → semua method non-\`final\` **otomatis bisa diganti**; \`@Override\` bersifat opsional tapi sangat disarankan
- **Python dan JavaScript** → semuanya bisa diganti, tanpa penanda apa pun

Kata \`base\` di C# setara dengan \`super\` di Java, Python, dan JavaScript.
`
    },
    {
      bahasa: 'js',
      kode: '// BENAR: hubungan "adalah sebuah"\nclass Mahasiswa extends Orang { }      // Mahasiswa ADALAH Orang\n\n// SALAH: hubungan "punya"\nclass Mobil extends Mesin { }          // Mobil bukan Mesin!\n\n// Yang benar untuk "punya" adalah komposisi:\nclass Mobil {\n    constructor() { this.mesin = new Mesin(); }\n}',
      penjelasan: `
Inilah kesalahan desain OOP yang paling sering terjadi, dan akibatnya baru terasa saat program membesar.

**Uji dengan kalimat lengkap** sebelum memakai inheritance:

- *"Mahasiswa **adalah sebuah** Orang"* → terdengar benar → inheritance tepat
- *"Mobil **adalah sebuah** Mesin"* → terdengar aneh → inheritance **salah**

Kalau hubungannya adalah **"punya"** (*has-a*), yang tepat adalah **komposisi**: simpan object itu sebagai attribute biasa.

Kenapa memaksakan inheritance itu berbahaya? Karena turunan **mewarisi seluruh isi induknya**. Kalau \`Mobil\` mewarisi \`Mesin\`, maka \`mobil.nyalakanBusi()\` menjadi sah — padahal itu tidak masuk akal. Antarmuka class-mu jadi penuh hal yang tidak relevan, dan perubahan pada \`Mesin\` bisa merusak \`Mobil\` tanpa alasan yang jelas.

Ada nasihat yang sangat terkenal di dunia OOP: ***"utamakan komposisi daripada pewarisan"***. Alasannya, komposisi lebih longgar — kamu bisa mengganti mesinnya tanpa menyentuh class \`Mobil\` sama sekali.

Untuk kamu sebagai asprak, ajarkan uji kalimat itu sebagai kebiasaan. Mahasiswa yang terbiasa mengucapkan hubungannya dengan lantang **sebelum** menulis kode akan jauh lebih jarang salah merancang.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <string>
using namespace std;

/* ---------- BASE CLASS ---------- */
class Orang {
protected:                        // bisa diakses turunan, tertutup dari luar
    string nama;
    int    umur;

public:
    Orang(string n, int u) : nama(n), umur(u) {
        cout << "  [Orang lahir] " << nama << endl;
    }

    virtual ~Orang() {            // virtual: penting untuk pewarisan
        cout << "  [Orang dibuang] " << nama << endl;
    }

    virtual string perkenalan() const {
        return "Saya " + nama + ", " + to_string(umur) + " tahun";
    }

    void bernapas() const {       // diwarisi apa adanya
        cout << nama << " sedang bernapas" << endl;
    }
};

/* ---------- DERIVED CLASS ---------- */
class Mahasiswa : public Orang {
private:
    string nim;

public:
    Mahasiswa(string n, int u, string id)
        : Orang(n, u), nim(id) {          // constructor induk DULU
        cout << "  [Mahasiswa lahir] " << nim << endl;
    }

    ~Mahasiswa() override {
        cout << "  [Mahasiswa dibuang] " << nim << endl;
    }

    // Mengganti method induk, tapi tetap memakai versinya
    string perkenalan() const override {
        return Orang::perkenalan() + ", NIM " + nim;
    }

    void kuliah() const {                  // tambahan khas Mahasiswa
        cout << nama << " sedang kuliah" << endl;
    }
};

class Dosen : public Orang {
private:
    string nidn;

public:
    Dosen(string n, int u, string id) : Orang(n, u), nidn(id) { }

    string perkenalan() const override {
        return Orang::perkenalan() + ", NIDN " + nidn;
    }

    void mengajar() const {
        cout << nama << " sedang mengajar" << endl;
    }
};

int main() {
    cout << "--- urutan constructor (induk dulu) ---" << endl;
    Mahasiswa m("Budi", 20, "2024001");

    cout << "\n--- method warisan & method sendiri ---" << endl;
    m.bernapas();                  // diwarisi dari Orang
    m.kuliah();                    // milik Mahasiswa
    cout << m.perkenalan() << endl;

    Dosen d("Pak Andi", 45, "0012345");
    cout << d.perkenalan() << endl;
    d.mengajar();

    cout << "\n--- urutan destructor (terbalik) ---" << endl;
    return 0;
}`,

    csharp: String.raw`using System;

public class Orang {
    protected string nama;
    protected int umur;

    public Orang(string nama, int umur) {
        this.nama = nama;
        this.umur = umur;
        Console.WriteLine($"  [Orang lahir] {nama}");
    }

    // virtual = MEMBERI IZIN untuk diganti turunan
    public virtual string Perkenalan() {
        return $"Saya {nama}, {umur} tahun";
    }

    public void Bernapas() {
        Console.WriteLine($"{nama} sedang bernapas");
    }
}

public class Mahasiswa : Orang {          // titik dua, tanpa kata public
    private string nim;

    public Mahasiswa(string nama, int umur, string nim)
        : base(nama, umur) {              // base = super
        this.nim = nim;
        Console.WriteLine($"  [Mahasiswa lahir] {nim}");
    }

    // override WAJIB ditulis — mencegah salah ketik nama method
    public override string Perkenalan() {
        return base.Perkenalan() + $", NIM {nim}";
    }

    public void Kuliah() {
        Console.WriteLine($"{nama} sedang kuliah");
    }
}

public class Dosen : Orang {
    private string nidn;

    public Dosen(string nama, int umur, string nidn) : base(nama, umur) {
        this.nidn = nidn;
    }

    public override string Perkenalan() {
        return base.Perkenalan() + $", NIDN {nidn}";
    }
}

class Program {
    static void Main() {
        Console.WriteLine("--- urutan constructor (induk dulu) ---");
        Mahasiswa m = new Mahasiswa("Budi", 20, "2024001");

        Console.WriteLine("\n--- method warisan & method sendiri ---");
        m.Bernapas();
        m.Kuliah();
        Console.WriteLine(m.Perkenalan());

        Dosen d = new Dosen("Pak Andi", 45, "0012345");
        Console.WriteLine(d.Perkenalan());
    }
}`,

    java: String.raw`class Orang {
    protected String nama;        // bisa diakses turunan
    protected int umur;

    public Orang(String nama, int umur) {
        this.nama = nama;
        this.umur = umur;
        System.out.println("  [Orang lahir] " + nama);
    }

    // Di Java, semua method non-final OTOMATIS bisa diganti
    public String perkenalan() {
        return "Saya " + nama + ", " + umur + " tahun";
    }

    public void bernapas() {
        System.out.println(nama + " sedang bernapas");
    }
}

class Mahasiswa extends Orang {   // extends
    private String nim;

    public Mahasiswa(String nama, int umur, String nim) {
        super(nama, umur);        // WAJIB baris PERTAMA
        this.nim = nim;
        System.out.println("  [Mahasiswa lahir] " + nim);
    }

    @Override                     // opsional, tapi SANGAT disarankan
    public String perkenalan() {
        return super.perkenalan() + ", NIM " + nim;
    }

    public void kuliah() {
        System.out.println(nama + " sedang kuliah");
    }
}

class Dosen extends Orang {
    private String nidn;

    public Dosen(String nama, int umur, String nidn) {
        super(nama, umur);
        this.nidn = nidn;
    }

    @Override
    public String perkenalan() {
        return super.perkenalan() + ", NIDN " + nidn;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- urutan constructor (induk dulu) ---");
        Mahasiswa m = new Mahasiswa("Budi", 20, "2024001");

        System.out.println("\n--- method warisan & method sendiri ---");
        m.bernapas();
        m.kuliah();
        System.out.println(m.perkenalan());

        Dosen d = new Dosen("Pak Andi", 45, "0012345");
        System.out.println(d.perkenalan());

        // Java TIDAK mengizinkan pewarisan dari dua class sekaligus.
        // Untuk itu gunakan interface.
    }
}`,

    python: String.raw`class Orang:
    def __init__(self, nama, umur):
        self.nama = nama
        self.umur = umur
        print(f"  [Orang lahir] {nama}")

    def perkenalan(self):
        return f"Saya {self.nama}, {self.umur} tahun"

    def bernapas(self):
        print(f"{self.nama} sedang bernapas")


class Mahasiswa(Orang):                    # kurung, bukan extends
    def __init__(self, nama, umur, nim):
        super().__init__(nama, umur)       # tanpa argumen di super()
        self.nim = nim
        print(f"  [Mahasiswa lahir] {nim}")

    def perkenalan(self):                  # otomatis mengganti, tanpa penanda
        return super().perkenalan() + f", NIM {self.nim}"

    def kuliah(self):
        print(f"{self.nama} sedang kuliah")


class Dosen(Orang):
    def __init__(self, nama, umur, nidn):
        super().__init__(nama, umur)
        self.nidn = nidn

    def perkenalan(self):
        return super().perkenalan() + f", NIDN {self.nidn}"

    def mengajar(self):
        print(f"{self.nama} sedang mengajar")


print("--- urutan constructor (induk dulu) ---")
m = Mahasiswa("Budi", 20, "2024001")

print("\n--- method warisan & method sendiri ---")
m.bernapas()                               # diwarisi dari Orang
m.kuliah()                                 # milik Mahasiswa
print(m.perkenalan())

d = Dosen("Pak Andi", 45, "0012345")
print(d.perkenalan())
d.mengajar()

# Memeriksa hubungan pewarisan
print("\nm adalah Mahasiswa?", isinstance(m, Mahasiswa))
print("m adalah Orang?     ", isinstance(m, Orang))     # True — "adalah sebuah"
print("Mahasiswa turunan Orang?", issubclass(Mahasiswa, Orang))

# ---------- JEBAKAN: lupa memanggil super().__init__() ----------
class Lupa(Orang):
    def __init__(self, nama, umur, nim):
        self.nim = nim                     # super() tidak dipanggil!


print("\nlupa memanggil super().__init__():")
x = Lupa("Citra", 19, "2024002")
try:
    print(x.perkenalan())
except AttributeError as e:
    print("  AttributeError:", e)
    print("  -> attribute milik induk tidak pernah dibuat")

# ---------- IS-A vs HAS-A ----------
class Mesin:
    def nyala(self):
        print("  brumm...")


class Mobil:                               # Mobil PUNYA mesin, bukan ADALAH mesin
    def __init__(self):
        self.mesin = Mesin()               # komposisi

    def jalan(self):
        self.mesin.nyala()
        print("  mobil berjalan")


print("\nkomposisi (has-a):")
Mobil().jalan()`,

    js: String.raw`class Orang {
    constructor(nama, umur) {
        this.nama = nama;
        this.umur = umur;
        console.log("  [Orang lahir] " + nama);
    }

    perkenalan() {
        return "Saya " + this.nama + ", " + this.umur + " tahun";
    }

    bernapas() {
        console.log(this.nama + " sedang bernapas");
    }
}

class Mahasiswa extends Orang {
    constructor(nama, umur, nim) {
        super(nama, umur);          // WAJIB, dan harus SEBELUM this dipakai
        this.nim = nim;
        console.log("  [Mahasiswa lahir] " + nim);
    }

    perkenalan() {                  // otomatis mengganti, tanpa penanda
        return super.perkenalan() + ", NIM " + this.nim;
    }

    kuliah() {
        console.log(this.nama + " sedang kuliah");
    }
}

class Dosen extends Orang {
    constructor(nama, umur, nidn) {
        super(nama, umur);
        this.nidn = nidn;
    }

    perkenalan() {
        return super.perkenalan() + ", NIDN " + this.nidn;
    }
}

console.log("--- urutan constructor (induk dulu) ---");
const m = new Mahasiswa("Budi", 20, "2024001");

console.log("\n--- method warisan & method sendiri ---");
m.bernapas();
m.kuliah();
console.log(m.perkenalan());

const d = new Dosen("Pak Andi", 45, "0012345");
console.log(d.perkenalan());

// Memeriksa hubungan pewarisan
console.log("\nm instanceof Mahasiswa?", m instanceof Mahasiswa);
console.log("m instanceof Orang?     ", m instanceof Orang);

// JEBAKAN: memakai this sebelum super()
class Salah extends Orang {
    constructor(nama) {
        // this.nama = nama;   <- ReferenceError: harus super() dulu
        super(nama, 0);
    }
}
console.log("\nmemakai this sebelum super() -> ReferenceError");

// IS-A vs HAS-A
class Mesin {
    nyala() { console.log("  brumm..."); }
}

class Mobil {                       // Mobil PUNYA mesin, bukan ADALAH mesin
    constructor() { this.mesin = new Mesin(); }
    jalan() {
        this.mesin.nyala();
        console.log("  mobil berjalan");
    }
}

console.log("\nkomposisi (has-a):");
new Mobil().jalan();`
  },

  output: `--- urutan constructor (induk dulu) ---
  [Orang lahir] Budi
  [Mahasiswa lahir] 2024001

--- method warisan & method sendiri ---
Budi sedang bernapas
Budi sedang kuliah
Saya Budi, 20 tahun, NIM 2024001
  [Orang lahir] Pak Andi
Saya Pak Andi, 45 tahun, NIDN 0012345
Pak Andi sedang mengajar

--- urutan destructor (terbalik) ---
  [Mahasiswa dibuang] 2024001
  [Orang dibuang] Budi`,

  kesalahanUmum: [
    {
      salah: 'Lupa memanggil constructor induk: `super(...)` atau `Orang(n, u)` tidak ditulis.',
      kenapa: 'Attribute milik induk **tidak pernah diinisialisasi**. Di Python, muncul `AttributeError` belakangan saat attribute itu hendak dipakai — jauh dari penyebabnya. Di Java dan C++, kompiler mencoba memanggil constructor induk tanpa parameter, dan gagal kalau induknya tidak punya.',
      benar: 'Selalu panggil constructor induk sebagai **langkah pertama**: `super().__init__(...)` di Python, `super(...)` di Java/JavaScript, `base(...)` di C#, atau lewat initializer list `: Orang(n, u)` di C++.'
    },
    {
      salah: 'Memakai inheritance untuk hubungan "punya": `class Mobil extends Mesin`',
      kenapa: 'Turunan **mewarisi seluruh isi induknya**, sehingga `mobil.nyalakanBusi()` menjadi sah padahal tidak masuk akal. Antarmuka class jadi penuh hal tidak relevan, dan perubahan pada `Mesin` bisa merusak `Mobil` tanpa alasan yang jelas.',
      benar: 'Uji dengan kalimat lengkap: *"Mobil **adalah sebuah** Mesin"* terdengar aneh, jadi inheritance salah. Pakai **komposisi**: simpan `this.mesin = new Mesin()` sebagai attribute.'
    },
    {
      salah: 'Menjadikan attribute induk `private` lalu heran turunan tidak bisa mengaksesnya.',
      kenapa: '`private` berarti **hanya class itu sendiri**, dan turunan pun tidak termasuk. Ini sering mengejutkan karena secara logika turunan terasa "bagian dari" induknya.',
      benar: 'Gunakan `protected` untuk anggota yang memang perlu dijangkau turunan tapi tetap tertutup dari luar. Kalau tidak yakin, tetap `private` lalu sediakan getter `protected`.'
    },
    {
      salah: 'Di C++, lupa membuat destructor induk `virtual`.',
      kenapa: 'Menghapus object turunan lewat pointer bertipe induk hanya menjalankan **destructor induk**. Destructor turunannya terlewat, sehingga sumber daya yang dipegangnya bocor. Secara standar ini bahkan *undefined behavior*, dan tidak ada peringatan apa pun.',
      benar: 'Selalu tulis `virtual ~Orang() { }` pada class yang dimaksudkan untuk diwarisi. Aturan praktisnya: **kalau ada satu saja method `virtual`, destructornya juga harus `virtual`.**'
    },
    {
      salah: 'Di Java, mengganti method tanpa menulis `@Override`, lalu salah mengeja namanya.',
      kenapa: 'Tanpa anotasi, `perkenalen()` yang salah eja dianggap sebagai method **baru** — bukan pengganti. Kompiler tidak protes, dan method induk tetap yang terpanggil. Bug ini sangat sulit dilihat karena kodenya terlihat benar.',
      benar: 'Selalu tulis `@Override` saat mengganti method. Kalau namanya tidak cocok dengan method induk mana pun, kompiler langsung menolak. C# menegakkan hal ini lewat kata kunci `override` yang wajib.'
    },
    {
      salah: 'Di JavaScript, memakai `this` sebelum memanggil `super()`.',
      kenapa: 'Object turunan **belum sepenuhnya terbentuk** sebelum constructor induk dijalankan, sehingga `this` belum tersedia. JavaScript menolaknya dengan `ReferenceError: Must call super constructor before accessing this`.',
      benar: 'Taruh `super(...)` sebagai **baris pertama** di constructor turunan. Aturan yang sama berlaku di Java.'
    }
  ],

  analogi: `
Analogi bakunya adalah **silsilah keluarga**, dan hampir semua mahasiswa langsung menangkapnya. Anak mewarisi ciri dari orang tua — warna mata, tinggi badan — lalu menambahkan ciri khasnya sendiri.

Tapi analogi yang lebih tepat untuk pemrograman adalah **formulir bertingkat**. Ada formulir dasar berisi nama, umur, dan alamat yang **dipakai semua orang di kampus**. Lalu ada lembar tambahan: mahasiswa mengisi NIM, dosen mengisi NIDN. Tidak ada yang menulis ulang bagian dasarnya — itulah inheritance.

Untuk **urutan constructor**, pakai analogi **membangun rumah**: fondasi dulu, baru dindingnya. Bagian induk harus siap sebelum bagian turunan bisa berdiri di atasnya. Dan saat dibongkar, urutannya terbalik — atap dulu, fondasi terakhir. Kaitkan dengan destructor, dan sekalian dengan materi Stack yang LIFO-nya persis sama.

Untuk **\`protected\`**, analoginya **ruang keluarga di rumah**: tamu tidak boleh masuk (bukan publik), tapi seluruh anggota keluarga boleh (termasuk turunan). Sedangkan \`private\` itu seperti **buku harian** — bahkan anaknya sendiri tidak boleh membacanya.

Untuk **is-a versus has-a**, ini bagian terpenting dan paling sering salah. Ajarkan **uji kalimat** sebagai kebiasaan wajib. Minta mahasiswa mengucapkannya lantang sebelum menulis kode:

- *"Kucing **adalah sebuah** Hewan"* → benar, pakai inheritance
- *"Mobil **adalah sebuah** Mesin"* → aneh, berarti salah
- *"Mobil **punya** Mesin"* → nah, ini komposisi

Peragaan yang efektif: tulis \`class Mobil extends Mesin\` di papan tulis, lalu tanya *"berarti mobil bisa dinyalakan businya, dipasang ke perahu, dan dijual terpisah dari bodinya?"* Kejanggalan itu langsung terasa, dan aturan is-a jadi masuk akal tanpa perlu dihafal.
`,

  latihan: [
    'Buat class `Kendaraan` dengan attribute merek dan kecepatan, lalu turunkan menjadi `Mobil` dan `Motor` yang masing-masing punya tambahan khas. Pastikan constructor induk dipanggil dengan benar.',
    'Tambahkan pesan di constructor induk dan turunan, lalu buat satu object. Catat urutan pemanggilannya dan jelaskan kenapa induk selalu duluan.',
    'Buat method `perkenalan()` di induk, lalu ganti di turunan dengan tetap memanggil versi induknya. Kenapa cara ini lebih baik daripada menyalin ulang kode induk?',
    'Sengaja jadikan attribute induk `private`, lalu coba akses dari turunan. Catat pesan errornya, kemudian ubah menjadi `protected` dan jelaskan bedanya.',
    'Di Python, buat class turunan yang **lupa** memanggil `super().__init__()`. Jalankan, catat `AttributeError`-nya, lalu perbaiki.',
    'Rancang dua hubungan class: satu yang tepat memakai inheritance, satu yang seharusnya memakai komposisi. Tuliskan uji kalimat "adalah sebuah" untuk membuktikan pilihanmu.',
    'Bandingkan penulisan inheritance di lima bahasa: C++, C#, Java, Python, dan JavaScript. Buat tabel berisi cara mendeklarasikan dan cara memanggil constructor induk.',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang beda is-a dan has-a. Wajib memakai uji kalimat, dan tunjukkan satu contoh salah beserta akibat janggalnya.'
  ]
});

TOPICS.push({
  id: 'polymorphism',
  judul: 'Polymorphism (Overloading & Overriding)',
  kategori: 'oop',
  tag: ['polymorphism', 'overloading', 'overriding', 'virtual', 'override', 'duck typing'],
  ringkas: 'Satu nama, banyak perilaku — dan kenapa C++ butuh kata kunci `virtual` sementara Python tidak.',

  fungsi: `**Memanggil method yang sama pada objek berbeda, dan masing-masing menanggapi dengan caranya sendiri.**

Ini yang membuat kode bisa menerima jenis baru **tanpa diubah**.

Terpakai di:

- **Memproses banyak jenis dengan satu perulangan** — cetak semua bentuk, hitung semua gaji
- **Menambah jenis baru tanpa menyentuh kode lama** — prinsip open-closed
- **Kerangka kerja** — ia memanggil method-mu tanpa tahu kelasmu
- **Menggantikan rangkaian if bertingkat** yang memeriksa jenis

Tandanya kamu membutuhkannya: **rangkaian \`if\` yang memeriksa jenis objek**.

Setiap kali ada jenis baru, kamu harus menyunting rangkaian itu — dan biasanya ada beberapa tempat yang terlewat. Polimorfisme menghilangkan seluruh rangkaian itu.`,

  praktik: {
    tujuan: `Kamu bisa mengganti percabangan berdasarkan jenis dengan polimorfisme, dan menambah jenis baru tanpa menyentuh kode lama.`,
    alat: [
      'Python 3, Java, atau C++'
    ],
    langkah: [
      { judul: 'Cari rangkaian if yang memeriksa jenis',
        isi: `Cari di kodemu pola seperti:

- \`if jenis == "lingkaran": ... elif jenis == "persegi": ...\`

Setiap kali ada bentuk baru, rangkaian ini harus disunting — dan biasanya ada di lebih dari satu tempat.` },
      { judul: 'Buat method dengan nama sama di tiap kelas',
        isi: `Beri tiap kelas method \`luas()\` dengan isi yang sesuai.

Sekarang kode pemanggilnya cukup: \`for b in bentuk: print(b.luas())\`

Rangkaian \`if\`-nya **hilang seluruhnya**.` },
      { judul: 'Tambahkan jenis baru tanpa menyentuh kode lama',
        isi: `Buat kelas Segitiga dengan method \`luas()\`, lalu masukkan ke daftar.

Perulangan tadi **langsung bekerja** tanpa disunting sedikit pun.

Inilah yang dimaksud **terbuka untuk perluasan, tertutup untuk perubahan**.` },
      { judul: 'Bedakan overloading dan overriding',
        isi: `- **Overloading** — beberapa method **nama sama, parameter berbeda**, dipilih **saat kompilasi**
- **Overriding** — method turunan **mengganti** method induk, dipilih **saat berjalan**

Python tidak punya overloading sejati; definisi terakhir menimpa yang sebelumnya. Pakai parameter bawaan atau \`*args\` sebagai gantinya.` },
      { judul: 'Ingat virtual di C++',
        isi: `Di C++, method **harus** ditandai \`virtual\` agar overriding bekerja lewat pointer atau acuan induk.

Tanpa itu, yang terpanggil adalah versi **induknya** — dan ini bug yang sangat membingungkan karena kodenya terlihat benar.

Java dan Python melakukannya secara bawaan.` },
      { judul: 'Manfaatkan duck typing di Python',
        isi: `Python tidak menuntut kelasmu mewarisi apa pun. Kalau objekmu punya method \`luas()\`, ia bisa dipakai.

*"Kalau ia berjalan seperti bebek dan bersuara seperti bebek, perlakukan sebagai bebek."*

Ini sangat luwes, tetapi kesalahannya baru ketahuan **saat berjalan** — bukan saat menulis. Pakai type hint untuk mengurangi risikonya.` }
    ],
    cek: [
      'Menambah kelas bentuk baru tidak memaksamu menyunting kode perulangannya',
      'Kamu bisa menjelaskan perbedaan overloading dan overriding',
      'Kode C++-mu memanggil versi turunan, bukan versi induk, lewat pointer induk'
    ]
  },

  konsep: `
**Polymorphism** berasal dari bahasa Yunani yang berarti *"banyak bentuk"*. Maksudnya: **satu nama method bisa berperilaku berbeda-beda**, tergantung siapa yang menjalankannya atau argumen apa yang diberikan.

Ada dua jenis yang sama sekali berbeda, dan membedakannya adalah kunci memahami topik ini.

**1. Overloading — polymorphism saat kompilasi**

Beberapa method **bernama sama** tapi **parameternya berbeda** (jumlah atau tipenya). Kompiler memilih versi mana yang dipakai **saat program diterjemahkan**, berdasarkan argumen yang kamu tulis.

Contohnya \`luas(5)\` untuk persegi dan \`luas(5, 3)\` untuk persegi panjang. Keduanya bernama sama karena tugasnya memang serupa.

**2. Overriding — polymorphism saat program berjalan**

Class turunan **mengganti** method milik induknya dengan versinya sendiri. Yang menentukan versi mana yang dipakai adalah **object sesungguhnya saat program berjalan**, bukan tipe yang tertulis di kode.

Inilah polymorphism yang sesungguhnya penting, dan yang membuat OOP kuat. Bayangkan kamu punya daftar berisi \`Kucing\`, \`Anjing\`, dan \`Sapi\` yang semuanya disimpan sebagai \`Hewan\`. Kamu cukup memanggil \`bersuara()\` pada masing-masing, dan **tiap object otomatis menjalankan versinya sendiri** — tanpa satu pun \`if\` untuk memeriksa jenisnya.

Manfaat nyatanya: **menambah jenis hewan baru tidak memaksamu mengubah kode yang sudah ada.** Tanpa polymorphism, kamu perlu rantai \`if-else\` panjang yang harus ditambah setiap kali ada jenis baru.

Yang membedakan bahasa satu dengan lainnya adalah **seberapa banyak izin yang harus ditulis**:

- **C++ dan C#** menuntut penandaan. Method harus ditandai \`virtual\` dulu supaya boleh diganti
- **Java** membebaskan — semua method non-\`final\` otomatis bisa diganti
- **Python dan JavaScript** bahkan tidak peduli hubungan pewarisan sama sekali. Selama object-nya punya method dengan nama itu, ia bisa dipakai. Gaya ini disebut ***duck typing***
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: '// OVERLOADING: nama sama, parameter beda — dipilih saat KOMPILASI\nint luas(int sisi)            { return sisi * sisi; }\nint luas(int p, int l)        { return p * l; }\ndouble luas(double r)         { return 3.14159 * r * r; }\n\nluas(5);        // versi pertama\nluas(5, 3);     // versi kedua',
      penjelasan: `
Kompiler memilih versi yang dipakai berdasarkan **jumlah dan tipe argumen** yang kamu tulis. Keputusan ini diambil **saat kompilasi**, sehingga tidak ada biaya tambahan sama sekali saat program berjalan.

Yang penting dipahami: **tipe kembalian tidak ikut dipertimbangkan.** Menulis \`int f(int)\` dan \`double f(int)\` berdampingan akan ditolak kompiler, karena saat kamu menulis \`f(5)\` tidak ada cara menentukan versi mana yang dimaksud.

Jadi yang membedakan hanyalah **daftar parameternya**.

Kapan overloading tepat dipakai? Ketika beberapa method **mengerjakan hal yang secara logika sama**, cuma berbeda masukannya. Kalau tugasnya berbeda, beri nama berbeda — memaksakan nama sama justru membingungkan pembaca.

Perbedaan penting antar bahasa yang wajib kamu tahu:

- **C++, Java, dan C#** mendukung overloading sepenuhnya
- **Python dan JavaScript tidak punya overloading sama sekali.** Definisi kedua **menimpa** yang pertama tanpa peringatan apa pun

Karena itu di Python, padanannya adalah **parameter bernilai bawaan** atau pemeriksaan tipe di dalam satu method.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Hewan {\npublic:\n    virtual void bersuara() { cout << "..."; }   // virtual = boleh diganti\n};\n\nclass Kucing : public Hewan {\npublic:\n    void bersuara() override { cout << "Meong"; }\n};',
      penjelasan: `
Kata **\`virtual\`** adalah izin: *"method ini boleh diganti oleh class turunan, dan yang dipakai nanti ditentukan saat program berjalan."*

**Tanpa \`virtual\`, polymorphism tidak terjadi.** Ini jebakan terbesar di C++ dan wajib kamu tekankan.

Kalau method induk tidak ditandai \`virtual\`, maka pemanggilan lewat pointer bertipe induk akan **selalu menjalankan versi induk** — meski object sesungguhnya adalah \`Kucing\`. Yang menentukan bukan isi object-nya, melainkan **tipe yang tertulis di kode**. Perilaku ini disebut *static binding*.

Dengan \`virtual\`, keputusannya ditunda sampai program berjalan. C++ menyimpan sebuah tabel penunjuk fungsi di balik layar — sering disebut **vtable** — dan tiap object membawa penunjuk ke tabel miliknya. Saat method dipanggil, program melihat tabel itu untuk menemukan versi yang benar. Inilah *dynamic binding*.

Kata **\`override\`** (sejak C++11) bersifat opsional tapi **sangat disarankan**. Ia meminta kompiler memeriksa bahwa method ini benar-benar mengganti sesuatu. Kalau kamu salah mengeja namanya, kompiler langsung menolak — tanpa itu, kesalahan eja diam-diam menghasilkan method baru yang tidak pernah terpanggil.

Java kebalikannya: semua method **otomatis virtual**, dan \`final\` dipakai untuk melarang penggantian.
`
    },
    {
      bahasa: 'cpp',
      kode: 'Hewan* daftar[3] = { new Kucing(), new Anjing(), new Sapi() };\n\nfor (int i = 0; i < 3; i++)\n    daftar[i]->bersuara();     // tiap object menjalankan versinya SENDIRI\n\n// Meong, Guk, Moo — tanpa satu pun if',
      penjelasan: `
**Inilah gunanya polymorphism, dan bagian ini yang paling penting untuk kamu ajarkan.**

Perhatikan bahwa \`daftar\` bertipe \`Hewan*\` — kode ini **tidak tahu** dan **tidak perlu tahu** jenis sebenarnya dari tiap object. Ia cukup memanggil \`bersuara()\`, dan tiap object menjalankan versinya sendiri.

Bandingkan dengan cara tanpa polymorphism:

\`if (jenis == "kucing") suaraKucing(); else if (jenis == "anjing") suaraAnjing(); ...\`

Rantai \`if\` itu punya masalah serius: **setiap kali ada jenis hewan baru, kamu harus mencari dan mengubah semua tempat yang punya rantai serupa.** Dan biasanya ada satu yang terlewat.

Dengan polymorphism, menambah \`class Bebek : public Hewan\` **tidak memaksamu mengubah satu baris pun** kode di atas. Prinsip ini dikenal sebagai *"terbuka untuk perluasan, tertutup untuk perubahan"*.

Ini juga menjelaskan kenapa polymorphism selalu dibahas bersama inheritance — keduanya bekerja sebagai pasangan.

Satu peringatan penting untuk C++: pola ini **wajib** disertai **destructor \`virtual\`** pada class induk. Tanpa itu, \`delete daftar[i]\` hanya menjalankan destructor induk, dan bagian turunannya bocor.
`
    },
    {
      bahasa: 'cpp',
      kode: 'class Hewan {\npublic:\n    virtual void bersuara() { }\n    virtual ~Hewan() { }        // WAJIB kalau class ini diwarisi\n};\n\nHewan* h = new Kucing();\ndelete h;                       // tanpa virtual ~Hewan, destructor Kucing TERLEWAT',
      penjelasan: `
**Destructor virtual adalah aturan C++ yang paling sering dilupakan, dan akibatnya serius.**

Saat kamu menulis \`delete h\` di mana \`h\` bertipe \`Hewan*\` tapi isinya sebenarnya \`Kucing\`, C++ perlu memutuskan destructor mana yang dijalankan.

- **Tanpa \`virtual\`** → hanya destructor \`Hewan\` yang jalan. Destructor \`Kucing\` **terlewat**, sehingga semua sumber daya yang dipegangnya bocor. Menurut standar, ini bahkan *undefined behavior*
- **Dengan \`virtual\`** → destructor \`Kucing\` jalan lebih dulu, lalu \`Hewan\` — urutan yang benar

Yang berbahaya, **tidak ada error maupun peringatan**. Programnya berjalan normal dan kebocorannya baru terasa setelah berjalan lama.

Aturan praktis yang layak kamu hafalkan dan ajarkan:

**Kalau sebuah class punya satu saja method \`virtual\`, destructornya juga harus \`virtual\`.**

Alasannya sederhana: adanya method \`virtual\` menandakan class itu memang dimaksudkan untuk diwarisi dan dipakai lewat pointer induk — dan justru itulah keadaan yang menuntut destructor virtual.

Java, C#, Python, dan JavaScript tidak punya persoalan ini karena pembersihan memorinya diurus otomatis.
`
    },
    {
      bahasa: 'python',
      kode: 'class Bebek:\n    def bersuara(self): print("Kwek")\n\nclass Robot:                        # TIDAK mewarisi apa pun\n    def bersuara(self): print("Bip")\n\nfor x in [Bebek(), Robot()]:\n    x.bersuara()                    # keduanya jalan',
      penjelasan: `
**Python dan JavaScript memakai pendekatan yang sama sekali berbeda, dan ini perlu dijelaskan hati-hati.**

Perhatikan bahwa \`Robot\` **tidak mewarisi apa pun** dari \`Bebek\`, dan keduanya tidak punya induk bersama. Namun keduanya tetap bisa dipakai bergantian, karena keduanya **punya method bernama \`bersuara\`**.

Gaya ini disebut ***duck typing***, dari pepatah: *"Kalau ia berjalan seperti bebek dan bersuara seperti bebek, maka ia bebek."* Yang diperiksa bukan **jenisnya**, melainkan **kemampuannya**.

Akibatnya, Python **tidak butuh \`virtual\`, tidak butuh \`override\`, dan bahkan tidak butuh inheritance** untuk mendapat polymorphism.

Ini sangat luwes, tapi ada harganya: kesalahan baru ketahuan **saat program berjalan**. Kalau sebuah object ternyata tidak punya method itu, muncul \`AttributeError\` di tengah jalan — sementara C++, Java, dan C# akan menolaknya sejak saat kompilasi.

Jadi perbandingannya bukan soal mana yang lebih baik, melainkan pertukaran:

- **C++, Java, C#** → lebih banyak yang harus ditulis, tapi kesalahan tertangkap lebih awal
- **Python, JavaScript** → lebih ringkas dan luwes, tapi kesalahan tertangkap lebih lambat

Untuk memberi jaminan lebih di Python, tersedia **abstract base class** yang dibahas di topik berikutnya.
`
    },
    {
      bahasa: 'python',
      kode: '# Python TIDAK punya overloading — definisi kedua MENIMPA yang pertama\nclass Hitung:\n    def luas(self, sisi): return sisi * sisi\n    def luas(self, p, l): return p * l      # menimpa versi di atasnya\n\nHitung().luas(5)   # TypeError: butuh 2 argumen',
      penjelasan: `
Ini kejutan bagi mahasiswa yang datang dari C++ atau Java: **Python tidak mendukung overloading sama sekali.**

Method kedua **menimpa** yang pertama, persis seperti menugaskan nilai baru ke variabel yang sama. Tidak ada peringatan apa pun — dan pemanggilan dengan bentuk lama tiba-tiba gagal dengan \`TypeError\`.

Penyebabnya berakar pada sifat Python: nama method disimpan di dalam kamus milik class, dan kunci yang sama hanya bisa punya satu nilai. Definisi terakhirlah yang berlaku.

Ada tiga cara menggantikannya di Python:

- **Parameter bernilai bawaan** — cara yang paling lazim: \`def luas(self, p, l=None)\`, lalu periksa apakah \`l\` bernilai \`None\`
- **Argumen sebanyak apa pun** dengan \`*args\`, lalu putuskan berdasarkan jumlahnya
- **\`@singledispatch\`** dari modul \`functools\`, untuk memilih berdasarkan tipe argumen

JavaScript punya keterbatasan yang sama dan penyelesaian yang mirip: parameter bernilai bawaan, atau memeriksa \`arguments.length\`.

Karena itu saat mengajar, tekankan bahwa **overloading bukan bagian wajib dari OOP.** Ia fitur milik sebagian bahasa saja, sedangkan **overriding** ada di semua bahasa berorientasi objek.
`
    },
    {
      bahasa: 'csharp',
      kode: 'class Hewan {\n    public virtual void Bersuara() { }        // izin diberikan\n}\nclass Kucing : Hewan {\n    public override void Bersuara() { }       // override WAJIB\n}\nclass Anjing : Hewan {\n    public new void Bersuara() { }            // BUKAN override — menyembunyikan\n}',
      penjelasan: `
C# menuntut penulisan paling tegas di antara kelima bahasa, dan menyediakan pembedaan yang tidak dimiliki Java.

Perhatikan kata **\`new\`** pada class \`Anjing\`. Itu **bukan overriding**, melainkan ***method hiding*** — method induk disembunyikan, bukan diganti.

Bedanya terlihat saat dipanggil lewat rujukan bertipe induk:

- Pada \`Kucing\` yang memakai \`override\` → versi \`Kucing\` yang jalan (polymorphism bekerja)
- Pada \`Anjing\` yang memakai \`new\` → versi **\`Hewan\`** yang jalan (polymorphism tidak terjadi)

Kenapa C# menyediakan \`new\`? Untuk kasus ketika kamu memang sengaja ingin method dengan nama sama tapi **tidak** berperan sebagai pengganti. Kalau kamu menulis method bernama sama **tanpa** \`override\` maupun \`new\`, C# memberi peringatan — memaksamu menyatakan maksudmu dengan jelas.

Inilah filosofi C#: **maksud harus dinyatakan, tidak boleh tersirat.** Bandingkan dengan Java, di mana method bernama sama otomatis dianggap pengganti — lebih ringkas, tapi salah eja bisa lolos tanpa terdeteksi kalau \`@Override\` tidak ditulis.

Untuk mengajar, \`new\` sebaiknya disebut sekilas saja sebagai peringatan. Yang penting mahasiswa paham: **kalau ingin mengganti, pakai \`override\`.**
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <vector>
#include <string>
using namespace std;

/* ---------- OVERLOADING: dipilih saat KOMPILASI ---------- */
int    luas(int sisi)        { return sisi * sisi; }
int    luas(int p, int l)    { return p * l; }
double luas(double r)        { return 3.14159 * r * r; }

/* ---------- OVERRIDING: dipilih saat PROGRAM BERJALAN ---------- */
class Hewan {
protected:
    string nama;
public:
    Hewan(string n) : nama(n) { }

    virtual void bersuara() const {          // virtual = boleh diganti
        cout << nama << ": ..." << endl;
    }

    virtual ~Hewan() { }                     // WAJIB pada class yang diwarisi
};

class Kucing : public Hewan {
public:
    Kucing(string n) : Hewan(n) { }
    void bersuara() const override {         // override: dicek kompiler
        cout << nama << ": Meong" << endl;
    }
};

class Anjing : public Hewan {
public:
    Anjing(string n) : Hewan(n) { }
    void bersuara() const override {
        cout << nama << ": Guk guk" << endl;
    }
};

class Sapi : public Hewan {
public:
    Sapi(string n) : Hewan(n) { }
    void bersuara() const override {
        cout << nama << ": Moo" << endl;
    }
};

/* Membuktikan pentingnya virtual */
class TanpaVirtual {
public:
    void sapa() { cout << "  versi INDUK (tanpa virtual)" << endl; }
};
class TurunanTanpaVirtual : public TanpaVirtual {
public:
    void sapa() { cout << "  versi TURUNAN" << endl; }
};

int main() {
    cout << "--- OVERLOADING (saat kompilasi) ---" << endl;
    cout << "luas(5)      = " << luas(5)      << "  <- persegi" << endl;
    cout << "luas(5, 3)   = " << luas(5, 3)   << "  <- persegi panjang" << endl;
    cout << "luas(2.0)    = " << luas(2.0)    << "  <- lingkaran" << endl;

    cout << "\n--- OVERRIDING (saat program berjalan) ---" << endl;
    vector<Hewan*> kandang;
    kandang.push_back(new Kucing("Kitty"));
    kandang.push_back(new Anjing("Rex"));
    kandang.push_back(new Sapi("Sapi"));

    // Kode ini TIDAK tahu jenis sebenarnya — dan tidak perlu tahu
    for (Hewan* h : kandang) h->bersuara();

    cout << "\n(tidak ada satu pun if untuk memeriksa jenis)" << endl;

    for (Hewan* h : kandang) delete h;        // aman karena destructor virtual

    cout << "\n--- TANPA virtual, polymorphism GAGAL ---" << endl;
    TanpaVirtual* p = new TurunanTanpaVirtual();
    p->sapa();                                // versi INDUK yang jalan!
    cout << "  -> tipe yang tertulis menang, bukan isi objectnya" << endl;
    delete p;

    return 0;
}`,

    csharp: String.raw`using System;
using System.Collections.Generic;

class Hitung {
    // OVERLOADING: nama sama, parameter beda
    public static int Luas(int sisi) { return sisi * sisi; }
    public static int Luas(int p, int l) { return p * l; }
    public static double Luas(double r) { return 3.14159 * r * r; }
}

class Hewan {
    protected string nama;
    public Hewan(string nama) { this.nama = nama; }

    public virtual void Bersuara() {          // virtual = MEMBERI IZIN
        Console.WriteLine($"{nama}: ...");
    }
}

class Kucing : Hewan {
    public Kucing(string nama) : base(nama) { }
    public override void Bersuara() {         // override WAJIB ditulis
        Console.WriteLine($"{nama}: Meong");
    }
}

class Anjing : Hewan {
    public Anjing(string nama) : base(nama) { }
    public override void Bersuara() {
        Console.WriteLine($"{nama}: Guk guk");
    }
}

/* Method hiding: BUKAN override — polymorphism tidak terjadi */
class Bebek : Hewan {
    public Bebek(string nama) : base(nama) { }
    public new void Bersuara() {
        Console.WriteLine($"{nama}: Kwek");
    }
}

class Program {
    static void Main() {
        Console.WriteLine("--- OVERLOADING ---");
        Console.WriteLine($"Luas(5)    = {Hitung.Luas(5)}");
        Console.WriteLine($"Luas(5, 3) = {Hitung.Luas(5, 3)}");
        Console.WriteLine($"Luas(2.0)  = {Hitung.Luas(2.0)}");

        Console.WriteLine("\n--- OVERRIDING ---");
        List<Hewan> kandang = new List<Hewan> {
            new Kucing("Kitty"),
            new Anjing("Rex")
        };
        foreach (Hewan h in kandang) h.Bersuara();

        Console.WriteLine("\n--- new vs override ---");
        Hewan b = new Bebek("Donal");
        b.Bersuara();      // versi HEWAN yang jalan, bukan Bebek
        Console.WriteLine("  -> 'new' menyembunyikan, bukan mengganti");

        Bebek b2 = new Bebek("Donal");
        b2.Bersuara();     // baru versi Bebek yang jalan
    }
}`,

    java: String.raw`import java.util.*;

class Hewan {
    protected String nama;

    public Hewan(String nama) { this.nama = nama; }

    // Di Java, semua method non-final OTOMATIS bisa diganti.
    // Tidak perlu kata kunci virtual.
    public void bersuara() {
        System.out.println(nama + ": ...");
    }
}

class Kucing extends Hewan {
    public Kucing(String nama) { super(nama); }

    @Override                                 // opsional, tapi WAJIB dibiasakan
    public void bersuara() {
        System.out.println(nama + ": Meong");
    }
}

class Anjing extends Hewan {
    public Anjing(String nama) { super(nama); }

    @Override
    public void bersuara() {
        System.out.println(nama + ": Guk guk");
    }
}

public class Main {
    // OVERLOADING: nama sama, parameter beda
    static int luas(int sisi)     { return sisi * sisi; }
    static int luas(int p, int l) { return p * l; }
    static double luas(double r)  { return 3.14159 * r * r; }

    public static void main(String[] args) {
        System.out.println("--- OVERLOADING ---");
        System.out.println("luas(5)    = " + luas(5));
        System.out.println("luas(5, 3) = " + luas(5, 3));
        System.out.println("luas(2.0)  = " + luas(2.0));

        System.out.println("\n--- OVERRIDING ---");
        List<Hewan> kandang = new ArrayList<>();
        kandang.add(new Kucing("Kitty"));
        kandang.add(new Anjing("Rex"));
        kandang.add(new Hewan("Entah"));

        // Kode ini tidak tahu jenis sebenarnya
        for (Hewan h : kandang) h.bersuara();

        System.out.println("\n(tanpa satu pun if untuk memeriksa jenis)");

        // BAHAYA tanpa @Override: salah eja jadi method BARU
        System.out.println("\nkalau 'bersuara' salah eja jadi 'bersuar',");
        System.out.println("tanpa @Override kompiler DIAM, dan versi induk");
        System.out.println("yang tetap terpanggil. @Override mencegahnya.");
    }
}`,

    python: String.raw`# ---------- OVERRIDING: tanpa virtual, tanpa override ----------
class Hewan:
    def __init__(self, nama):
        self.nama = nama

    def bersuara(self):
        print(f"{self.nama}: ...")


class Kucing(Hewan):
    def bersuara(self):                    # cukup nama sama, otomatis mengganti
        print(f"{self.nama}: Meong")


class Anjing(Hewan):
    def bersuara(self):
        print(f"{self.nama}: Guk guk")


print("--- OVERRIDING ---")
kandang = [Kucing("Kitty"), Anjing("Rex"), Hewan("Entah")]
for h in kandang:
    h.bersuara()                           # tiap object menjalankan versinya
print("(tanpa satu pun if untuk memeriksa jenis)")


# ---------- DUCK TYPING: bahkan tanpa pewarisan ----------
class Robot:                               # TIDAK mewarisi Hewan
    def bersuara(self):
        print("Robot: Bip bip")


class Mobil:                               # juga tidak
    def bersuara(self):
        print("Mobil: Tin tin")


print("\n--- DUCK TYPING ---")
for x in [Kucing("Kitty"), Robot(), Mobil()]:
    x.bersuara()                           # yang dicek KEMAMPUAN, bukan jenis
print("(tidak satu pun saling mewarisi)")


# ---------- Python TIDAK punya overloading ----------
class Hitung:
    def luas(self, sisi):
        return sisi * sisi

    def luas(self, p, l):                  # MENIMPA definisi di atasnya
        return p * l


print("\n--- TIDAK ADA OVERLOADING ---")
try:
    print(Hitung().luas(5))
except TypeError as e:
    print("  TypeError:", e)
    print("  -> definisi kedua menimpa yang pertama")


# Penggantinya: parameter bernilai bawaan
class HitungBenar:
    def luas(self, p, l=None):
        return p * p if l is None else p * l


print("\npenggantinya (nilai bawaan):")
h = HitungBenar()
print("  luas(5)    =", h.luas(5))
print("  luas(5, 3) =", h.luas(5, 3))


# Atau berdasarkan tipe argumen
from functools import singledispatchmethod


class HitungTipe:
    @singledispatchmethod
    def luas(self, x):
        raise NotImplementedError

    @luas.register
    def _(self, x: int):
        return x * x

    @luas.register
    def _(self, x: float):
        return 3.14159 * x * x


print("\nberdasarkan tipe (singledispatch):")
t = HitungTipe()
print("  luas(5)   =", t.luas(5))
print("  luas(2.0) =", round(t.luas(2.0), 4))`,

    js: String.raw`// ---------- OVERRIDING ----------
class Hewan {
    constructor(nama) { this.nama = nama; }

    bersuara() {                       // otomatis bisa diganti
        console.log(this.nama + ": ...");
    }
}

class Kucing extends Hewan {
    bersuara() {                       // cukup nama sama
        console.log(this.nama + ": Meong");
    }
}

class Anjing extends Hewan {
    bersuara() {
        console.log(this.nama + ": Guk guk");
    }
}

console.log("--- OVERRIDING ---");
const kandang = [new Kucing("Kitty"), new Anjing("Rex"), new Hewan("Entah")];
for (const h of kandang) h.bersuara();
console.log("(tanpa satu pun if untuk memeriksa jenis)");

// ---------- DUCK TYPING ----------
class Robot {                          // tidak mewarisi apa pun
    bersuara() { console.log("Robot: Bip bip"); }
}

console.log("\n--- DUCK TYPING ---");
for (const x of [new Kucing("Kitty"), new Robot()]) x.bersuara();
console.log("(tidak saling mewarisi, tapi keduanya jalan)");

// ---------- JavaScript juga TIDAK punya overloading ----------
class Hitung {
    luas(sisi) { return sisi * sisi; }
    luas(p, l) { return p * l; }        // menimpa yang di atasnya
}

console.log("\n--- TIDAK ADA OVERLOADING ---");
const hit = new Hitung();
console.log("  luas(5)    =", hit.luas(5));      // NaN: l bernilai undefined
console.log("  -> definisi kedua menimpa yang pertama");

// Penggantinya: parameter bernilai bawaan
class HitungBenar {
    luas(p, l) {
        return l === undefined ? p * p : p * l;
    }
}

console.log("\npenggantinya (nilai bawaan):");
const hb = new HitungBenar();
console.log("  luas(5)    =", hb.luas(5));
console.log("  luas(5, 3) =", hb.luas(5, 3));

// Memeriksa kemampuan sebelum memakai (pola aman untuk duck typing)
function coba(x) {
    if (typeof x.bersuara === "function") x.bersuara();
    else console.log("  object ini tidak bisa bersuara");
}

console.log("\nmemeriksa kemampuan dulu:");
coba(new Kucing("Kitty"));
coba({ nama: "Batu" });`
  },

  output: `--- OVERLOADING (saat kompilasi) ---
luas(5)      = 25  <- persegi
luas(5, 3)   = 15  <- persegi panjang
luas(2.0)    = 12.5664  <- lingkaran

--- OVERRIDING (saat program berjalan) ---
Kitty: Meong
Rex: Guk guk
Sapi: Moo

(tidak ada satu pun if untuk memeriksa jenis)

--- TANPA virtual, polymorphism GAGAL ---
  versi INDUK (tanpa virtual)
  -> tipe yang tertulis menang, bukan isi objectnya`,

  kesalahanUmum: [
    {
      salah: 'Di C++, lupa menulis `virtual` pada method induk.',
      kenapa: 'Tanpa `virtual`, pemanggilan lewat pointer bertipe induk **selalu menjalankan versi induk** — meski object sesungguhnya adalah turunan. Yang menentukan adalah tipe yang tertulis, bukan isi object-nya. Tidak ada error apa pun, sehingga bug ini sangat sulit dilihat.',
      benar: 'Tandai method induk dengan `virtual`, dan tambahkan `override` pada turunannya. Ingat: **C++ dan C# butuh izin, Java memberikannya otomatis.**'
    },
    {
      salah: 'Di C++, lupa membuat destructor induk `virtual` pada class yang dipakai secara polimorfik.',
      kenapa: '`delete` lewat pointer induk hanya menjalankan destructor induk, sehingga destructor turunan **terlewat** dan sumber dayanya bocor. Menurut standar ini *undefined behavior*, dan tidak ada peringatan apa pun.',
      benar: 'Aturan praktisnya: **kalau ada satu saja method `virtual`, destructornya juga harus `virtual`.** Tulis `virtual ~Hewan() { }` pada class induk.'
    },
    {
      salah: 'Di Java, mengganti method tanpa `@Override` lalu salah mengeja namanya.',
      kenapa: 'Method salah eja dianggap sebagai method **baru**, bukan pengganti. Kompiler diam, dan versi induk tetap yang terpanggil. Programnya berjalan tanpa error tapi perilakunya salah — dan penyebabnya nyaris tidak terlihat saat membaca kode.',
      benar: 'Selalu tulis `@Override`. Kalau nama method tidak cocok dengan milik induk mana pun, kompiler langsung menolak. C# menegakkan ini lewat kata kunci `override` yang wajib.'
    },
    {
      salah: 'Di Python atau JavaScript, membuat dua method bernama sama dengan parameter berbeda.',
      kenapa: 'Keduanya **tidak punya overloading**. Definisi kedua menimpa yang pertama tanpa peringatan apa pun, sehingga pemanggilan bentuk lama tiba-tiba gagal dengan `TypeError` — atau di JavaScript, diam-diam menghasilkan `NaN`.',
      benar: 'Gunakan parameter bernilai bawaan: `def luas(self, p, l=None)` lalu periksa `if l is None`. Untuk pemilihan berdasarkan tipe, pakai `@singledispatchmethod` di Python.'
    },
    {
      salah: 'Memakai rantai `if-else` untuk memeriksa jenis object alih-alih polymorphism.',
      kenapa: 'Setiap kali ada jenis baru, kamu harus mencari dan mengubah **semua** tempat yang punya rantai serupa — dan biasanya ada satu yang terlewat. Kodenya juga makin panjang seiring bertambahnya jenis.',
      benar: 'Buat method dengan nama sama di tiap turunan, lalu panggil lewat tipe induk. Menambah jenis baru jadi **tidak memaksa perubahan** pada kode yang sudah ada.'
    },
    {
      salah: 'Mengira overloading dan overriding adalah hal yang sama.',
      kenapa: 'Keduanya sangat berbeda. **Overloading** memakai parameter berbeda dan diputuskan **saat kompilasi**, tanpa perlu pewarisan sama sekali. **Overriding** memakai parameter **sama persis** dan diputuskan **saat program berjalan**, serta menuntut hubungan pewarisan.',
      benar: 'Hafalkan pembedanya: **beda parameter = overloading; sama parameter tapi beda class = overriding.** Kalau parameternya berbeda saat kamu bermaksud mengganti, yang terjadi justru overloading — dan method induk tidak pernah tergantikan.'
    }
  ],

  analogi: `
Untuk **overloading**, pakai analogi kata **"potong"** dalam bahasa Indonesia. Kata yang sama, tapi maknanya menyesuaikan objeknya: *potong rambut*, *potong kue*, *potong gaji*. Kamu tahu maksudnya dari **apa yang menyertainya** — dan itulah cara kompiler memilih versi method berdasarkan argumennya.

Untuk **overriding**, analogi terbaiknya adalah **perintah "beri suara" di kebun binatang**. Kamu meneriakkan satu perintah yang sama ke semua kandang, dan tiap hewan menjawab dengan caranya sendiri: meong, guk, moo. **Perintahnya satu, hasilnya bermacam-macam.**

Lanjutkan analogi itu untuk menunjukkan **manfaatnya**. Tanya ke kelas: *"kalau besok kebun binatang kedatangan bebek, apakah petugas perlu belajar perintah baru?"* Tidak — perintahnya tetap sama. Itulah kenapa polymorphism membuat program mudah diperluas.

Untuk menegaskan **buruknya rantai if-else**, tulis di papan tulis:

\`if (jenis == "kucing") ... else if (jenis == "anjing") ...\`

Lalu tanya: *"kalau ada 20 jenis hewan dan rantai ini tersebar di 5 tempat berbeda, apa yang terjadi saat menambah satu jenis?"* Kerepotannya langsung terasa.

Untuk **\`virtual\` di C++**, analoginya **surat izin**. Method induk harus **memberi izin** dulu (\`virtual\`) sebelum turunan boleh menggantikannya. Tanpa izin, turunan boleh menulis method bernama sama — tapi yang dipanggil tetap versi induknya. Peragakan langsung dengan menghapus kata \`virtual\` dari contoh kode, lalu jalankan. Keluarannya yang tiba-tiba salah biasanya sangat berkesan.

Untuk **duck typing**, pakai pepatah aslinya: *"kalau ia berjalan seperti bebek dan bersuara seperti bebek, maka ia bebek."* Python tidak menanyakan **akta kelahiran** object, ia cuma menanyakan **apa yang bisa dilakukannya**. Bandingkan dengan C++ dan Java yang memeriksa silsilah lebih dulu — dan tekankan bahwa keduanya punya untung ruginya masing-masing.
`,

  latihan: [
    'Buat class `Bangun` dengan method `luas()`, lalu turunkan menjadi `Persegi`, `Lingkaran`, dan `Segitiga`. Simpan ketiganya dalam satu array bertipe induk, lalu hitung luas semuanya tanpa satu pun `if`.',
    'Di C++, jalankan program di atas, lalu **hapus kata `virtual`** dari method induk. Catat perubahan keluarannya dan jelaskan penyebabnya.',
    'Buat overloading method `luas()` dengan tiga versi: satu parameter, dua parameter, dan parameter bertipe `double`. Kerjakan di C++, Java, atau C#.',
    'Di Python atau JavaScript, sengaja buat dua method bernama sama dengan parameter berbeda. Buktikan bahwa yang kedua menimpa yang pertama, lalu perbaiki dengan parameter bernilai bawaan.',
    'Di C++, buat class induk **tanpa** destructor virtual yang mengalokasikan memori di turunannya. Hapus lewat pointer induk, lalu jelaskan apa yang bocor. Setelah itu perbaiki.',
    'Buat contoh **duck typing** di Python: tiga class yang sama sekali tidak saling mewarisi tapi punya method bernama sama, lalu pakai bergantian dalam satu perulangan.',
    'Tulis satu program memakai rantai `if-else` untuk memeriksa jenis, lalu tulis ulang memakai polymorphism. Bandingkan berapa baris yang harus diubah saat menambah satu jenis baru.',
    'Uji pemahaman: jelaskan ulang dalam 5 menit dengan kata-katamu sendiri tentang beda overloading dan overriding. Wajib menyebut kapan masing-masing diputuskan — saat kompilasi atau saat program berjalan.'
  ]
});

TOPICS.push({
  id: 'abstraction',
  judul: 'Abstraction (Abstract Class & Interface)',
  kategori: 'oop',
  tag: ['abstraction', 'abstract class', 'interface', 'pure virtual', 'kontrak'],
  ringkas: 'Menetapkan apa yang harus bisa dilakukan, tanpa menentukan bagaimana caranya — pilar terakhir OOP.',

  fungsi: `**Menetapkan kontrak yang harus dipenuhi kelas turunan, tanpa menentukan caranya.**

Terpakai di:

- **Kelas dasar** — \`BaseModel\` yang menuntut tiap turunan mengisi nama tabelnya
- **Antarmuka pustaka** — kamu diberi kontrak, bebas mengisi dengan apa pun
- **Mengganti implementasi** — beralih dari MySQL ke PostgreSQL tanpa menyentuh logika bisnis
- **Pengujian** — mengganti sambungan basis data asli dengan tiruan saat menguji

Manfaat yang paling nyata: **kompiler atau interpreter memaksa turunanmu lengkap**.

Kalau kamu lupa mengisi salah satu method wajib, kesalahannya ketahuan **saat membuat objeknya**, bukan berbulan-bulan kemudian saat method itu kebetulan dipanggil.`,

  praktik: {
    tujuan: 'Kamu bisa membuat kelas abstrak yang menolak diinstansiasi dan memaksa turunannya lengkap.',
    alat: [
      'Python 3 dengan modul `abc`',
      'Java atau C++ untuk perbandingan'
    ],
    langkah: [
      { judul: 'Buat kelas abstrak di Python',
        isi: `- \`from abc import ABC, abstractmethod\`
- \`class Pembayaran(ABC):\`
- \`@abstractmethod def proses(self, jumlah): ...\`

Tanpa \`ABC\` dan \`@abstractmethod\`, Python tidak akan memaksa apa pun — kelasnya bisa diinstansiasi seperti biasa.` },
      { judul: 'Buktikan ia tidak bisa diinstansiasi',
        isi: `Coba \`Pembayaran()\` langsung. Python menolak dengan pesan yang menyebutkan method abstrak mana yang belum diisi.

Ini bukti bahwa kontrakmu benar-benar dijaga, bukan sekadar kesepakatan.` },
      { judul: 'Buat turunan yang sengaja tidak lengkap',
        isi: `Buat kelas turunan yang **tidak** mengisi \`proses\`, lalu coba buat objeknya.

Ia juga ditolak. Kesalahannya ketahuan **saat pembuatan objek**, bukan saat method-nya dipanggil.

Inilah manfaat utamanya: kesalahan ditemukan sedini mungkin.` },
      { judul: 'Bedakan kelas abstrak dan interface',
        isi: `- **Kelas abstrak** boleh punya **implementasi bersama** dan atribut
- **Interface** murni kontrak, tanpa isi

Java membedakan keduanya dengan tegas dan mengizinkan banyak interface tetapi satu kelas induk.

Python tidak punya interface terpisah; kelas abstrak tanpa implementasi sudah berfungsi seperti itu.` },
      { judul: 'Terapkan pada kasus nyata',
        isi: `Buat \`Pembayaran\` abstrak, lalu turunan \`Transfer\`, \`KartuKredit\`, dan \`EWallet\`.

Kode pemesanan cukup menerima \`Pembayaran\` apa pun. Menambah metode pembayaran baru tidak menyentuhnya sama sekali.

Ini penerapan langsung dari **dependency inversion**: bergantung pada abstraksi, bukan wujud nyatanya.` },
      { judul: 'Manfaatkan untuk pengujian',
        isi: `Karena kodemu menerima abstraksi, kamu bisa membuat \`PembayaranTiruan\` yang tidak benar-benar memproses apa pun.

Sekarang pengujianmu berjalan **tanpa** menyentuh layanan pembayaran sungguhan — cepat, gratis, dan bisa dijalankan berkali-kali.

Ini alasan paling praktis untuk memakai abstraksi, dan sering baru disadari belakangan.` }
    ],
    cek: [
      'Kelas abstrakmu ditolak saat dicoba diinstansiasi langsung',
      'Turunan yang tidak lengkap juga ditolak saat pembuatan objek',
      'Pengujianmu bisa berjalan dengan implementasi tiruan tanpa layanan asli'
    ]
  },

  konsep: `
**Abstraction** adalah pilar terakhir OOP, dan punya dua sisi yang saling melengkapi.

**Sisi pertama: menyembunyikan kerumitan.** Saat kamu memanggil \`sort(data)\`, kamu tidak perlu tahu ia memakai quicksort atau mergesort. Kamu cukup tahu **apa** yang dihasilkannya. Sama seperti menyetir mobil tanpa perlu paham cara kerja mesinnya.

**Sisi kedua: menetapkan kontrak.** Ini yang akan kita bahas lebih dalam. Kita membuat class yang berkata: *"siapa pun yang menjadi turunanku **wajib** menyediakan method-method ini"* — tanpa menentukan bagaimana caranya.

Ada dua bentuk yang perlu kamu kuasai.

**Abstract class** adalah class yang **tidak bisa dibuat object-nya secara langsung**, dan berisi minimal satu method yang **belum punya isi**. Method tanpa isi itu disebut *pure virtual* di C++, atau *abstract method* di bahasa lain.

Kenapa berguna? Karena ia memaksa. Kalau class turunan lupa menyediakan method wajib itu, **programnya ditolak sejak awal** — bukan baru ketahuan saat berjalan.

Abstract class juga boleh berisi method yang **sudah ada isinya**, sehingga bisa berbagi kode dengan turunannya.

**Interface** adalah bentuk yang lebih murni: **hanya berisi daftar method wajib, tanpa isi sama sekali** dan biasanya tanpa data. Ia benar-benar cuma sebuah kontrak.

Kenapa keduanya perlu dibedakan? Karena **Java dan C# hanya mengizinkan pewarisan dari satu class**, tapi **boleh menerapkan interface sebanyak apa pun**. Jadi interface adalah cara mendapat keluwesan tanpa kerumitan pewarisan berganda.

Aturan praktis memilihnya:

- **Abstract class** dipakai untuk hubungan *"adalah sebuah"* di mana ada **kode bersama** yang ingin dibagi
- **Interface** dipakai untuk menyatakan *"bisa melakukan"* — misalnya \`BisaTerbang\` atau \`BisaDisimpan\` — yang mungkin dimiliki class-class yang sama sekali tidak berkerabat

C++ tidak punya kata kunci \`interface\`; padanannya adalah class yang **semua** method-nya pure virtual. Python memakai **ABC** dari modul \`abc\`. JavaScript tidak punya keduanya secara resmi, dan mengandalkan duck typing.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'class Bangun {\npublic:\n    virtual double luas() = 0;    // = 0 berarti PURE VIRTUAL, tanpa isi\n    virtual ~Bangun() { }\n};\n\nBangun b;                          // ERROR: abstract, tidak bisa dibuat object',
      penjelasan: `
Tanda **\`= 0\`** di akhir deklarasi method adalah cara C++ menyatakan *pure virtual* — method yang **sengaja tidak punya isi**.

Adanya satu saja method seperti ini membuat class-nya menjadi **abstract**, dan akibatnya langsung: **object-nya tidak bisa dibuat.** Menulis \`Bangun b;\` ditolak kompiler.

Kenapa itu justru yang diinginkan? Karena \`Bangun\` memang bukan benda nyata. Tidak ada yang namanya "sebuah bangun" tanpa bentuk yang jelas — yang ada adalah persegi, lingkaran, segitiga. Class ini hanya berperan sebagai **kontrak bersama**.

Manfaat sesungguhnya adalah **paksaan di waktu kompilasi**: setiap turunan **wajib** menyediakan isi untuk \`luas()\`. Kalau lupa, turunannya ikut menjadi abstract dan object-nya juga tidak bisa dibuat — sehingga kesalahannya ketahuan **sejak awal**, bukan saat program sudah berjalan.

Perhatikan bahwa destructor tetap ditulis \`virtual\` dan **punya isi**. Ini penting: abstract class hampir selalu dipakai lewat pointer induk, dan justru itulah keadaan yang menuntut destructor virtual.

Angka \`0\` di situ tidak berarti nilai nol — ia sekadar penanda yang dipilih perancang C++ untuk menyatakan "belum ada isinya".
`
    },
    {
      bahasa: 'java',
      kode: 'abstract class Bangun {\n    abstract double luas();          // wajib disediakan turunan\n\n    void tampilkan() {               // boleh punya method yang SUDAH berisi\n        System.out.println("Luas: " + luas());\n    }\n}',
      penjelasan: `
Java memakai kata kunci **\`abstract\`** di dua tempat: pada **class**-nya dan pada **method** yang belum berisi.

Yang menarik dan sering terlewat: perhatikan method \`tampilkan()\`. Ia **sudah punya isi**, dan di dalamnya **memanggil \`luas()\` yang belum ada isinya sama sekali**.

Bagaimana bisa? Karena saat program berjalan, object yang sesungguhnya pasti berupa turunan yang **sudah** menyediakan \`luas()\`. Jadi \`tampilkan()\` bisa ditulis sekali di induk dan **dipakai bersama semua turunan**, meski bagian yang berbeda-beda diserahkan ke masing-masing.

Pola ini sangat kuat dan punya nama: ***template method***. Induk menetapkan **kerangka alurnya**, turunan mengisi **bagian yang berbeda**.

Inilah keunggulan abstract class dibanding interface: ia bisa **berbagi kode**, bukan cuma menetapkan daftar kewajiban.

Aturan yang berlaku sama di Java, C#, dan C++:

- Class yang punya method abstract **tidak bisa dibuat object-nya**
- Turunan **wajib** mengisi semua method abstract, kalau tidak ia ikut menjadi abstract
- Abstract class **boleh** punya constructor, dan itu dipanggil lewat \`super()\` oleh turunannya
`
    },
    {
      bahasa: 'java',
      kode: 'interface BisaTerbang {\n    void terbang();               // otomatis public & abstract\n}\n\ninterface BisaBerenang {\n    void berenang();\n}\n\n// Boleh menerapkan BANYAK interface, tapi hanya boleh extends SATU class\nclass Bebek extends Hewan implements BisaTerbang, BisaBerenang { }',
      penjelasan: `
**Inilah alasan utama interface ada**, dan wajib kamu jelaskan supaya perbedaannya dengan abstract class jadi masuk akal.

Java dan C# **melarang pewarisan dari lebih dari satu class**. Larangan ini disengaja, untuk menghindari kerumitan yang di C++ dikenal sebagai *diamond problem* — kebingungan saat dua induk punya method bernama sama.

Tapi larangan itu menimbulkan masalah baru: bagaimana kalau sebuah class memang perlu punya beberapa peran sekaligus? Bebek adalah hewan, **sekaligus** bisa terbang, **sekaligus** bisa berenang.

Jawabannya interface. Sebuah class boleh **\`extends\` satu class** tapi **\`implements\` interface sebanyak apa pun**.

Perhatikan juga penamaannya. Interface biasanya dinamai berdasarkan **kemampuan**, bukan jenis — \`BisaTerbang\`, \`Comparable\`, \`Serializable\`. Ini mencerminkan bedanya dengan class:

- **Class** menjawab *"ini **adalah** apa"*
- **Interface** menjawab *"ini **bisa melakukan** apa"*

Kekuatannya: class yang sama sekali tidak berkerabat bisa berbagi interface yang sama. \`Pesawat\` dan \`Burung\` sama-sama \`BisaTerbang\` meski tidak punya induk bersama — dan keduanya bisa diperlakukan sama oleh kode yang cuma butuh kemampuan terbang.
`
    },
    {
      bahasa: 'python',
      kode: 'from abc import ABC, abstractmethod\n\nclass Bangun(ABC):                # ABC = Abstract Base Class\n    @abstractmethod\n    def luas(self): pass\n\nBangun()   # TypeError: Can\'t instantiate abstract class',
      penjelasan: `
Python memerlukan modul **\`abc\`** untuk mendapat paksaan yang di bahasa lain sudah tersedia sejak awal.

Class harus mewarisi **\`ABC\`**, dan method wajibnya ditandai dengan **\`@abstractmethod\`**. Barulah Python menolak pembuatan object-nya.

Kenapa perlu diminta secara khusus? Karena Python secara alami memakai **duck typing** — ia tidak peduli jenis object selama method yang diperlukan tersedia. Jadi paksaan seperti ini bukan bawaan, melainkan tambahan yang dipilih ketika kamu memang menginginkan jaminan.

Perlu diperhatikan perbedaan waktunya: di C++, Java, dan C#, kesalahan tertangkap **saat kompilasi**. Di Python, ia tertangkap **saat object hendak dibuat** — lebih awal daripada duck typing biasa, tapi tetap saat program berjalan.

Kapan sebaiknya dipakai di Python? Ketika kamu menulis kerangka yang akan dipakai orang lain, dan ingin **kesalahan mereka ketahuan sedini mungkin** disertai pesan yang jelas. Untuk program kecil, duck typing biasa sudah cukup dan lebih ringkas.

Python tidak punya \`interface\` terpisah. Sebuah ABC yang **semua** method-nya abstract sudah berperan sebagai interface. Dan karena Python **mengizinkan pewarisan berganda**, ia tidak memerlukan pembedaan seketat Java.
`
    },
    {
      bahasa: 'csharp',
      kode: 'public abstract class Bangun {\n    public abstract double Luas();          // wajib diisi turunan\n    public void Tampilkan() {               // sudah berisi, dipakai bersama\n        Console.WriteLine($"Luas: {Luas()}");\n    }\n}\n\npublic interface IBisaTerbang {             // kesepakatan: diawali huruf I\n    void Terbang();\n}',
      penjelasan: `
C# memakai aturan yang hampir sama dengan Java, dengan beberapa ciri khas yang layak kamu sebut.

**Kesepakatan penamaan interface diawali huruf \`I\`** — \`IBisaTerbang\`, \`IComparable\`, \`IDisposable\`. Ini bukan aturan bahasa, melainkan kebiasaan yang diikuti seluruh ekosistem .NET, sehingga interface langsung dikenali sekilas.

Perhatikan bahwa method abstract **tidak perlu ditandai \`virtual\`**. Sifat abstract sudah mencakupnya — ia memang harus diganti. Turunannya tetap menulis \`override\` seperti biasa.

Sama seperti Java, C# hanya mengizinkan **satu base class** tapi **banyak interface**:

\`class Bebek : Hewan, IBisaTerbang, IBisaBerenang\`

Perhatikan penulisannya: base class harus disebut **paling depan**, baru interface-nya.

Satu perkembangan yang perlu diketahui: sejak C# 8, interface **boleh punya method yang sudah berisi** (*default implementation*). Java juga menambahkan hal serupa lewat kata kunci \`default\`. Ini sedikit mengaburkan batas antara interface dan abstract class — tapi bedanya yang mendasar tetap: **interface tidak boleh menyimpan data**, sedangkan abstract class boleh.
`
    },
    {
      bahasa: 'js',
      kode: '// JavaScript TIDAK punya abstract class maupun interface resmi.\nclass Bangun {\n    luas() {\n        throw new Error("method luas() wajib diisi turunan");\n    }\n}\n\nnew Bangun().luas();   // Error — ketahuan saat DIPANGGIL, bukan lebih awal',
      penjelasan: `
JavaScript **tidak menyediakan \`abstract\` maupun \`interface\`** sama sekali. Yang ada hanyalah dua siasat.

**Siasat pertama**, seperti contoh di atas: buat method induk yang isinya **melempar error**. Kalau turunan lupa menggantinya, error muncul saat method itu dipanggil.

Kelemahannya jelas: kesalahannya baru ketahuan **saat method itu benar-benar dipanggil** — bisa jadi setelah program berjalan lama. Bandingkan dengan C++ dan Java yang menolaknya sejak kompilasi, atau Python yang menolaknya saat object dibuat.

**Siasat kedua**, mencegah pembuatan object induk secara langsung di dalam constructor:

\`if (new.target === Bangun) throw new Error("Bangun bersifat abstract");\`

Ini lebih baik karena kesalahannya tertangkap lebih awal, yaitu saat object dibuat.

Untuk pengganti interface, JavaScript mengandalkan **duck typing**: periksa saja apakah method-nya tersedia dengan \`typeof obj.terbang === "function"\`.

Kalau memerlukan jaminan yang sesungguhnya, banyak proyek besar beralih ke **TypeScript**, yang menambahkan \`interface\` dan \`abstract\` dengan pemeriksaan saat kompilasi. Ini bagus disebut sekilas ke mahasiswa sebagai gambaran kenapa TypeScript banyak dipakai di industri.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

/* ---------- ABSTRACT CLASS ---------- */
class Bangun {
protected:
    string nama;
public:
    Bangun(string n) : nama(n) { }
    virtual ~Bangun() { }                    // WAJIB virtual

    virtual double luas() = 0;               // pure virtual: WAJIB diisi turunan
    virtual double keliling() = 0;

    // Method yang SUDAH berisi — dipakai bersama semua turunan.
    // Ia memanggil luas() yang isinya baru ada di turunan (template method).
    void tampilkan() {
        cout << nama << " -> luas " << luas()
             << ", keliling " << keliling() << endl;
    }
};

class Persegi : public Bangun {
    double sisi;
public:
    Persegi(double s) : Bangun("Persegi"), sisi(s) { }
    double luas() override      { return sisi * sisi; }
    double keliling() override  { return 4 * sisi; }
};

class Lingkaran : public Bangun {
    double jari;
public:
    Lingkaran(double r) : Bangun("Lingkaran"), jari(r) { }
    double luas() override      { return M_PI * jari * jari; }
    double keliling() override  { return 2 * M_PI * jari; }
};

/* ---------- "INTERFACE" ala C++: semua method pure virtual ---------- */
class BisaTerbang {
public:
    virtual void terbang() = 0;
    virtual ~BisaTerbang() { }
};

class BisaBerenang {
public:
    virtual void berenang() = 0;
    virtual ~BisaBerenang() { }
};

/* C++ MENGIZINKAN pewarisan berganda */
class Bebek : public BisaTerbang, public BisaBerenang {
public:
    void terbang() override  { cout << "Bebek terbang rendah" << endl; }
    void berenang() override { cout << "Bebek berenang" << endl; }
};

int main() {
    // Bangun b("x");     <- ERROR: abstract, tidak bisa dibuat object
    cout << "Bangun tidak bisa dibuat object (abstract)" << endl << endl;

    vector<Bangun*> daftar;
    daftar.push_back(new Persegi(5));
    daftar.push_back(new Lingkaran(3));

    for (Bangun* b : daftar) b->tampilkan();   // kode induk, isi dari turunan

    for (Bangun* b : daftar) delete b;         // aman: destructor virtual

    cout << "\n--- interface ala C++ ---" << endl;
    Bebek d;
    d.terbang();
    d.berenang();

    cout << "\nKontraknya dipaksakan sejak KOMPILASI:" << endl;
    cout << "turunan yang lupa mengisi luas() tidak bisa dibuat objectnya." << endl;

    return 0;
}`,

    csharp: String.raw`using System;
using System.Collections.Generic;

/* ---------- ABSTRACT CLASS ---------- */
public abstract class Bangun {
    protected string nama;

    public Bangun(string nama) { this.nama = nama; }

    // Wajib diisi turunan. Tidak perlu ditandai virtual.
    public abstract double Luas();
    public abstract double Keliling();

    // Sudah berisi — dipakai bersama (template method)
    public void Tampilkan() {
        Console.WriteLine($"{nama} -> luas {Luas():F2}, keliling {Keliling():F2}");
    }
}

public class Persegi : Bangun {
    private double sisi;
    public Persegi(double s) : base("Persegi") { sisi = s; }
    public override double Luas()     { return sisi * sisi; }
    public override double Keliling() { return 4 * sisi; }
}

public class Lingkaran : Bangun {
    private double jari;
    public Lingkaran(double r) : base("Lingkaran") { jari = r; }
    public override double Luas()     { return Math.PI * jari * jari; }
    public override double Keliling() { return 2 * Math.PI * jari; }
}

/* ---------- INTERFACE: kesepakatan diawali huruf I ---------- */
public interface IBisaTerbang {
    void Terbang();
}

public interface IBisaBerenang {
    void Berenang();
}

/* Satu base class, banyak interface. Base class disebut PALING DEPAN. */
public class Bebek : Bangun, IBisaTerbang, IBisaBerenang {
    public Bebek() : base("Bebek") { }
    public override double Luas()     { return 0; }
    public override double Keliling() { return 0; }
    public void Terbang()  { Console.WriteLine("Bebek terbang rendah"); }
    public void Berenang() { Console.WriteLine("Bebek berenang"); }
}

class Program {
    static void Main() {
        // Bangun b = new Bangun("x");   <- ERROR: abstract
        Console.WriteLine("Bangun tidak bisa dibuat object (abstract)\n");

        List<Bangun> daftar = new List<Bangun> {
            new Persegi(5),
            new Lingkaran(3)
        };
        foreach (Bangun b in daftar) b.Tampilkan();

        Console.WriteLine("\n--- interface ---");
        Bebek d = new Bebek();
        d.Terbang();
        d.Berenang();

        // Object bisa diperlakukan sebagai interface-nya saja
        IBisaTerbang t = d;
        Console.WriteLine("\nsebagai IBisaTerbang:");
        t.Terbang();
    }
}`,

    java: String.raw`import java.util.*;

/* ---------- ABSTRACT CLASS ---------- */
abstract class Bangun {
    protected String nama;

    public Bangun(String nama) { this.nama = nama; }

    abstract double luas();              // wajib diisi turunan
    abstract double keliling();

    // Sudah berisi, memanggil method yang belum berisi (template method)
    public void tampilkan() {
        System.out.printf("%s -> luas %.2f, keliling %.2f%n",
                          nama, luas(), keliling());
    }
}

class Persegi extends Bangun {
    private double sisi;
    public Persegi(double s) { super("Persegi"); sisi = s; }
    @Override double luas()     { return sisi * sisi; }
    @Override double keliling() { return 4 * sisi; }
}

class Lingkaran extends Bangun {
    private double jari;
    public Lingkaran(double r) { super("Lingkaran"); jari = r; }
    @Override double luas()     { return Math.PI * jari * jari; }
    @Override double keliling() { return 2 * Math.PI * jari; }
}

/* ---------- INTERFACE ---------- */
interface BisaTerbang {
    void terbang();                      // otomatis public abstract
}

interface BisaBerenang {
    void berenang();
}

/* SATU extends, BANYAK implements */
class Bebek extends Bangun implements BisaTerbang, BisaBerenang {
    public Bebek() { super("Bebek"); }
    @Override double luas()     { return 0; }
    @Override double keliling() { return 0; }
    @Override public void terbang()  { System.out.println("Bebek terbang rendah"); }
    @Override public void berenang() { System.out.println("Bebek berenang"); }
}

public class Main {
    public static void main(String[] args) {
        // Bangun b = new Bangun("x");   <- ERROR: abstract
        System.out.println("Bangun tidak bisa dibuat object (abstract)\n");

        List<Bangun> daftar = new ArrayList<>();
        daftar.add(new Persegi(5));
        daftar.add(new Lingkaran(3));

        for (Bangun b : daftar) b.tampilkan();

        System.out.println("\n--- interface ---");
        Bebek d = new Bebek();
        d.terbang();
        d.berenang();

        // Class tak berkerabat pun bisa berbagi interface yang sama
        List<BisaTerbang> yangTerbang = new ArrayList<>();
        yangTerbang.add(d);
        System.out.println("\nsemua yang BisaTerbang:");
        for (BisaTerbang t : yangTerbang) t.terbang();
    }
}`,

    python: String.raw`from abc import ABC, abstractmethod
import math


# ---------- ABSTRACT BASE CLASS ----------
class Bangun(ABC):                          # ABC = Abstract Base Class
    def __init__(self, nama):
        self.nama = nama

    @abstractmethod
    def luas(self):
        """Wajib diisi turunan."""

    @abstractmethod
    def keliling(self):
        """Wajib diisi turunan."""

    # Method yang SUDAH berisi — dipakai bersama (template method)
    def tampilkan(self):
        print(f"{self.nama} -> luas {self.luas():.2f}, "
              f"keliling {self.keliling():.2f}")


class Persegi(Bangun):
    def __init__(self, sisi):
        super().__init__("Persegi")
        self.sisi = sisi

    def luas(self):      return self.sisi ** 2
    def keliling(self):  return 4 * self.sisi


class Lingkaran(Bangun):
    def __init__(self, jari):
        super().__init__("Lingkaran")
        self.jari = jari

    def luas(self):      return math.pi * self.jari ** 2
    def keliling(self):  return 2 * math.pi * self.jari


# Abstract class tidak bisa dibuat objectnya
print("mencoba membuat object Bangun:")
try:
    Bangun("x")
except TypeError as e:
    print("  TypeError:", e)

print()
for b in [Persegi(5), Lingkaran(3)]:
    b.tampilkan()


# Turunan yang LUPA mengisi method wajib juga ditolak
class Segitiga(Bangun):
    def __init__(self):
        super().__init__("Segitiga")

    def luas(self):
        return 0
    # keliling() sengaja tidak diisi


print("\nturunan yang lupa mengisi keliling():")
try:
    Segitiga()
except TypeError as e:
    print("  TypeError:", e)
    print("  -> ketahuan saat object dibuat, bukan saat method dipanggil")


# ---------- "INTERFACE" di Python: ABC yang semua method-nya abstract ----------
class BisaTerbang(ABC):
    @abstractmethod
    def terbang(self): ...


class BisaBerenang(ABC):
    @abstractmethod
    def berenang(self): ...


# Python MENGIZINKAN pewarisan berganda, jadi tidak perlu
# pembedaan seketat Java
class Bebek(BisaTerbang, BisaBerenang):
    def terbang(self):  print("Bebek terbang rendah")
    def berenang(self): print("Bebek berenang")


print("\n--- interface ala Python ---")
d = Bebek()
d.terbang()
d.berenang()

print("\nBebek adalah BisaTerbang?", isinstance(d, BisaTerbang))
print("Bebek adalah BisaBerenang?", isinstance(d, BisaBerenang))`,

    js: String.raw`// JavaScript TIDAK punya abstract class maupun interface resmi.
// Yang ada hanyalah siasat.

class Bangun {
    constructor(nama) {
        // Siasat 1: cegah pembuatan object induk secara langsung
        if (new.target === Bangun) {
            throw new Error("Bangun bersifat abstract, tidak bisa dibuat langsung");
        }
        this.nama = nama;
    }

    // Siasat 2: method yang melempar error kalau tidak diganti
    luas() {
        throw new Error("method luas() wajib diisi turunan");
    }

    keliling() {
        throw new Error("method keliling() wajib diisi turunan");
    }

    // Method yang sudah berisi — dipakai bersama
    tampilkan() {
        console.log(this.nama + " -> luas " + this.luas().toFixed(2) +
                    ", keliling " + this.keliling().toFixed(2));
    }
}

class Persegi extends Bangun {
    constructor(sisi) { super("Persegi"); this.sisi = sisi; }
    luas()     { return this.sisi * this.sisi; }
    keliling() { return 4 * this.sisi; }
}

class Lingkaran extends Bangun {
    constructor(jari) { super("Lingkaran"); this.jari = jari; }
    luas()     { return Math.PI * this.jari * this.jari; }
    keliling() { return 2 * Math.PI * this.jari; }
}

console.log("mencoba membuat object Bangun:");
try {
    new Bangun("x");
} catch (e) {
    console.log("  Error: " + e.message);
}

console.log();
for (const b of [new Persegi(5), new Lingkaran(3)]) b.tampilkan();

// Turunan yang LUPA mengisi method wajib
class Segitiga extends Bangun {
    constructor() { super("Segitiga"); }
    luas() { return 0; }
    // keliling() sengaja tidak diisi
}

console.log("\nturunan yang lupa mengisi keliling():");
try {
    new Segitiga().tampilkan();
} catch (e) {
    console.log("  Error: " + e.message);
    console.log("  -> baru ketahuan saat method DIPANGGIL (kelemahan JS)");
}

// Pengganti interface: duck typing — periksa kemampuannya
function bisaTerbang(obj) {
    return typeof obj.terbang === "function";
}

class Bebek {
    terbang()  { console.log("Bebek terbang rendah"); }
    berenang() { console.log("Bebek berenang"); }
}

console.log("\n--- duck typing sebagai pengganti interface ---");
const d = new Bebek();
console.log("Bebek bisa terbang?", bisaTerbang(d));
console.log("Batu bisa terbang? ", bisaTerbang({}));
if (bisaTerbang(d)) d.terbang();

console.log("\nUntuk jaminan sungguhan, proyek besar biasanya");
console.log("beralih ke TypeScript yang punya interface & abstract.");`
  },

  output: `Bangun tidak bisa dibuat object (abstract)

Persegi -> luas 25, keliling 20
Lingkaran -> luas 28.2743, keliling 18.8496

--- interface ala C++ ---
Bebek terbang rendah
Bebek berenang

Kontraknya dipaksakan sejak KOMPILASI:
turunan yang lupa mengisi luas() tidak bisa dibuat objectnya.`,

  kesalahanUmum: [
    {
      salah: 'Mencoba membuat object dari abstract class: `Bangun b;`',
      kenapa: 'Abstract class **sengaja** tidak bisa dibuat object-nya, karena ia mewakili gagasan umum yang belum lengkap. Tidak ada yang namanya "sebuah bangun" tanpa bentuk yang jelas. Ini bukan kelemahan, melainkan justru tujuannya.',
      benar: 'Buat object dari **class turunan** yang sudah lengkap: `Persegi p(5);`. Abstract class dipakai sebagai **tipe penampung**, misalnya `Bangun* b = new Persegi(5);`.'
    },
    {
      salah: 'Turunan lupa mengisi salah satu method abstract.',
      kenapa: 'Turunannya ikut menjadi abstract, sehingga object-nya juga tidak bisa dibuat. Pesan errornya sering membingungkan karena menunjuk baris pembuatan object, bukan baris method yang terlupa.',
      benar: 'Pastikan **semua** method abstract terisi. Bacalah pesan errornya sampai selesai — biasanya disebutkan method mana yang belum ada. Di C#, `override` yang wajib membuat kesalahan ini lebih cepat terdeteksi.'
    },
    {
      salah: 'Di C++, lupa `= 0` sehingga method dikira abstract padahal bukan.',
      kenapa: 'Tanpa `= 0`, method itu hanyalah method `virtual` biasa yang **boleh** diganti tapi **tidak wajib**. Class-nya pun tidak menjadi abstract, sehingga object-nya bisa dibuat — dan turunan yang lupa mengganti diam-diam memakai versi induk yang mungkin kosong.',
      benar: 'Tulis `virtual double luas() = 0;` lengkap dengan `= 0`. Kalau memang ingin ada versi bawaan yang boleh dipakai, barulah `= 0` dihilangkan.'
    },
    {
      salah: 'Di Java atau C#, mencoba `extends` dari dua class sekaligus.',
      kenapa: 'Keduanya **melarang pewarisan berganda** untuk menghindari kebingungan saat dua induk punya method bernama sama (*diamond problem*). Kompiler langsung menolak.',
      benar: 'Gunakan **interface** untuk peran tambahan: `class Bebek extends Hewan implements BisaTerbang, BisaBerenang`. Satu `extends`, sebanyak apa pun `implements`. C++ dan Python justru mengizinkan pewarisan berganda.'
    },
    {
      salah: 'Di Python, mengira `@abstractmethod` bekerja tanpa mewarisi `ABC`.',
      kenapa: 'Tanpa mewarisi `ABC`, penanda `@abstractmethod` **tidak berpengaruh apa pun**. Object tetap bisa dibuat, dan method yang belum diisi baru menimbulkan masalah saat dipanggil. Tidak ada peringatan sama sekali.',
      benar: 'Tulis `class Bangun(ABC):` dan impor `from abc import ABC, abstractmethod`. Keduanya harus ada; salah satu saja tidak cukup.'
    },
    {
      salah: 'Memakai abstract class padahal yang dibutuhkan interface.',
      kenapa: 'Abstract class memakai jatah pewarisan satu-satunya di Java dan C#. Kalau ia cuma berisi daftar kewajiban tanpa kode bersama, ia menghabiskan jatah itu tanpa memberi manfaat tambahan — dan class turunan jadi tidak bisa mewarisi hal lain.',
      benar: 'Pakai **interface** kalau isinya cuma kontrak tanpa kode bersama, dan **abstract class** kalau memang ada kode yang ingin dibagi. Uji dengan kalimat: *"adalah sebuah"* mengarah ke abstract class, *"bisa melakukan"* mengarah ke interface.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **formulir resep dokter yang belum diisi**.

Formulir itu sudah menentukan **apa saja yang wajib ada**: nama pasien, nama obat, dosis. Tapi ia **belum berisi apa pun**, dan tidak berguna sampai ada dokter yang mengisinya. Kamu tidak bisa menebus resep dari formulir kosong — itulah abstract class yang tidak bisa dibuat object-nya.

Untuk menegaskan **manfaat paksaannya**, tanya ke kelas: *"kalau ada kolom dosis yang tidak diisi, apa yang terjadi di apotek?"* Ditolak — dan lebih baik ditolak di apotek daripada obatnya terlanjur diminum. Persis seperti kompiler yang menolak turunan yang belum lengkap, ketimbang program yang jatuh saat sudah dipakai.

Untuk membedakan **abstract class dan interface**, pakai perbandingan yang mudah diingat:

- **Abstract class** = **kurikulum jurusan**. Ada mata kuliah wajib yang isinya sudah ditentukan (kode bersama), dan ada yang harus kamu pilih sendiri (method abstract). Kamu cuma bisa masuk **satu jurusan**.
- **Interface** = **sertifikasi keahlian**. Ia cuma menyatakan *"orang ini bisa melakukan X"*. Kamu boleh punya **sebanyak apa pun** — sertifikat renang, sertifikat menyetir, sertifikat bahasa.

Dari analogi ini, aturan Java dan C# jadi masuk akal dengan sendirinya: satu jurusan, banyak sertifikat.

Untuk **sisi pertama abstraction** — menyembunyikan kerumitan — pakai analogi **setir mobil**. Kamu memutar setir untuk berbelok tanpa perlu tahu apa pun tentang rack and pinion. Antarmukanya sederhana, isinya rumit. Tanya: *"kalau mobilnya diganti jadi listrik, apakah cara menyetirnya berubah?"* Tidak — dan itulah kenapa abstraction membuat sistem mudah diganti isinya.

Terakhir, tekankan **uji kalimat** yang sama seperti pada inheritance, karena ini paling membantu mahasiswa memilih:

- *"Persegi **adalah sebuah** Bangun"* → abstract class
- *"Bebek **bisa** terbang"* → interface
`,

  latihan: [
    'Buat abstract class `Bangun` dengan method abstract `luas()` dan `keliling()`, lalu turunkan menjadi `Persegi`, `Lingkaran`, dan `Segitiga`. Simpan semuanya dalam satu daftar bertipe induk.',
    'Sengaja coba buat object dari abstract class-nya. Catat pesan errornya, lalu jelaskan kenapa larangan itu justru berguna.',
    'Buat turunan yang **lupa** mengisi salah satu method abstract. Catat kapan kesalahannya ketahuan — saat kompilasi, saat object dibuat, atau saat method dipanggil? Bandingkan jawabannya di tiga bahasa berbeda.',
    'Tambahkan method `tampilkan()` yang **sudah berisi** di abstract class, dan di dalamnya panggil method yang belum berisi. Jelaskan kenapa itu bisa bekerja.',
    'Buat interface `BisaTerbang` dan `BisaBerenang`, lalu buat class `Bebek` yang menerapkan keduanya sekaligus. Kerjakan di Java atau C#, lalu jelaskan kenapa ini tidak bisa dilakukan dengan dua abstract class.',
    'Di Python, buat ABC lalu sengaja hilangkan pewarisan `ABC`-nya. Buktikan bahwa `@abstractmethod` menjadi tidak berpengaruh sama sekali.',
    'Di JavaScript, buat class "abstract" memakai kedua siasat: pemeriksaan `new.target` dan method yang melempar error. Bandingkan kapan masing-masing kesalahan tertangkap.',
    'Rancang satu kasus yang tepat memakai abstract class dan satu yang tepat memakai interface. Tuliskan uji kalimat "adalah sebuah" dan "bisa melakukan" untuk membuktikan pilihanmu.',
    'Uji pemahaman: jelaskan ulang dalam 5 menit dengan kata-katamu sendiri tentang beda abstract class dan interface memakai analogi jurusan dan sertifikat. Targetnya, pendengarmu bisa memilih sendiri untuk kasus baru yang kamu berikan.'
  ]
});
