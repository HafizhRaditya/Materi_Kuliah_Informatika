/* ============================================================
   struktur-data.js — materi kategori "struktur-data"
   ============================================================ */

TOPICS.push({
  id: 'linked-list',
  judul: 'Array vs Linked List',
  kategori: 'struktur-data',
  tag: ['linked list', 'array', 'node', 'pointer', 'single', 'double'],
  ringkas: 'Dua cara menyimpan deretan data — berdempetan atau berantai — beserta untung rugi masing-masing.',

  fungsi: `**Memilih antara array dan linked list berdasarkan operasi yang paling sering dilakukan.**

Terpakai di:

- **Memilih struktur data** untuk kebutuhan nyata
- **Memahami pustaka** — \`vector\` dan \`list\` di C++, \`ArrayList\` dan \`LinkedList\` di Java
- **Membangun struktur lain** — stack, queue, graph, dan hash table dengan chaining semuanya memakai linked list
- **Manajemen memori** — daftar blok bebas di sistem operasi adalah linked list

Yang perlu diketahui, dan sering mengejutkan: **di praktik, array hampir selalu menang** meski Big-O linked list terlihat lebih baik untuk penyisipan.

Sebabnya cache: elemen array berdekatan di memori, simpul linked list tersebar. Kamu sudah mengukurnya sendiri di topik cache.`,

  praktik: {
    tujuan: `Kamu bisa membangun linked list dari nol, dan sudah mengukur sendiri kapan ia menang dan kapan array menang.`,
    alat: [
      'C++ dengan g++ untuk pengukuran',
      'Python 3 untuk versi cepat'
    ],
    langkah: [
      { judul: 'Bangun simpulnya',
        isi: `Buat struct berisi data dan pointer ke simpul berikutnya:

- \`struct Node { int data; Node* next; };\`

Buat tiga simpul dan sambungkan dengan tangan, lalu telusuri dari kepala sampai \`next\` bernilai \`nullptr\`.` },
      { judul: 'Tulis empat operasi pokoknya',
        isi: `- **sisip di depan** — \`O(1)\`, sangat cepat
- **sisip di belakang** — \`O(n)\` tanpa penunjuk ekor, \`O(1)\` dengan
- **hapus** — \`O(1)\` kalau kamu sudah memegang simpul sebelumnya
- **cari** — \`O(n)\` selalu, tidak ada jalan pintas

Perhatikan bahwa **tidak ada akses acak**. Mengambil elemen ke-500 berarti melangkah 500 kali.` },
      { judul: 'Jaga kasus batas',
        isi: `Uji dengan: daftar **kosong**, daftar berisi **satu** elemen, menghapus **kepala**, dan menghapus **ekor**.

Empat kasus ini menangkap hampir semua bug linked list — biasanya berupa pointer yang tidak diperbarui atau simpul yang tidak dibebaskan.` },
      { judul: 'Ukur penelusuran array lawan linked list',
        isi: `Buat sejuta elemen dalam \`vector\` dan dalam linked list, lalu jumlahkan isinya. Ukur keduanya.

Array menang telak, meski keduanya \`O(n)\`. Inilah pengaruh cache yang kamu ukur di Orkom.` },
      { judul: 'Ukur penyisipan di tengah',
        isi: `Sekarang sisipkan seribu elemen di **tengah** struktur berisi sejuta elemen.

Untuk array, tiap penyisipan menggeser setengah juta elemen. Untuk linked list, cukup mengubah dua pointer — **kalau kamu sudah memegang posisinya**.

Uji dua versi: dengan posisi sudah dipegang, dan harus dicari dulu. Yang kedua menghapus seluruh keunggulannya.` },
      { judul: 'Buat aturan pemilihanmu sendiri',
        isi: `Tulis di catatanmu:

- sering **akses acak** atau **menelusuri** → array
- sering **menyisip dan menghapus** dan **posisinya sudah dipegang** → linked list
- **ragu** → array

Butir terakhir bukan bercanda. Di praktik, array adalah pilihan bawaan yang benar untuk sebagian besar kasus.` }
    ],
    cek: [
      'Linked list-mu bekerja benar untuk daftar kosong dan berisi satu elemen',
      'Penelusuran array terbukti lebih cepat daripada linked list pada sejuta elemen',
      'Tidak ada kebocoran memori saat kamu membebaskan seluruh simpulnya'
    ]
  },

  konsep: `
Kamu sudah kenal **array**: sekumpulan data yang disimpan **berdempetan di memori**. Dari sifat itu lahir kelebihan dan kelemahannya sekaligus — aksesnya secepat kilat, tapi ukurannya kaku dan menyisipkan di tengah itu mahal.

**Linked list** mengambil pendekatan yang berlawanan. Datanya **tidak perlu berdempetan**. Setiap potong data dibungkus dalam sebuah **node** yang berisi dua hal:

- **data** — isinya
- **pointer \`next\`** — alamat node berikutnya

Node-node itu boleh tersebar di mana saja dalam memori; yang mengikat mereka menjadi satu barisan adalah **rantai pointer**. Kita cukup menyimpan alamat node pertama, yang disebut **head**, dan node terakhir menunjuk ke \`NULL\` sebagai tanda ujung barisan.

Perbedaan mendasarnya bisa diringkas begini:

- **Array** — alamatnya bisa **dihitung**, jadi \`arr[500]\` langsung ketemu. Tapi menyisipkan di depan memaksa semua elemen bergeser.
- **Linked list** — alamatnya harus **ditelusuri**, jadi mencari data ke-500 berarti melompat 500 kali. Tapi menyisipkan cukup **mengubah dua pointer**, tidak ada yang bergeser.

Jadi keduanya bukan soal mana yang lebih baik, melainkan **mana yang cocok untuk pola pemakaianmu**. Kalau sering mengakses acak, pakai array. Kalau sering menyisipkan dan menghapus, pakai linked list.

Ada dua bentuk yang perlu kamu kuasai:

- **Single linked list** — tiap node hanya menunjuk ke **depan**. Hemat memori, tapi tidak bisa mundur.
- **Double linked list** — tiap node punya \`next\` **dan** \`prev\`, sehingga bisa ditelusuri dua arah. Lebih boros satu pointer per node, tapi menghapus node jadi jauh lebih mudah.

Satu hal yang jarang disebut di kelas tapi nyata di dunia industri: **array biasanya lebih cepat dari yang diperkirakan teori.** Karena datanya berdempetan, prosesor bisa membaca sekaligus beberapa elemen sekaligus ke cache. Node linked list yang tersebar membuat prosesor harus menunggu memori berkali-kali. Karena itu untuk data kecil, array sering menang meski secara teori kalah.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'struct Node {\n    int data;\n    struct Node *next;   // menunjuk ke sesamanya\n};',
      penjelasan: `
Pertanyaan yang sering muncul: **"kok bisa sebuah struct memuat dirinya sendiri?"**

Jawabannya: ia **tidak** memuat dirinya sendiri — ia memuat **pointer** ke dirinya sendiri. Ini perbedaan yang menentukan.

Kalau ditulis \`struct Node next;\` (tanpa bintang), kompiler akan menolak. Sebabnya masuk akal: untuk mengetahui ukuran \`Node\`, ia harus tahu ukuran \`Node\` di dalamnya, yang butuh ukuran \`Node\` lagi — tidak pernah selesai.

Dengan \`struct Node *next;\`, yang disimpan cuma **alamat**, dan ukuran sebuah alamat selalu tetap (8 byte di sistem 64-bit) **tanpa perlu tahu isi yang ditunjuknya**. Karena itu kompiler bisa menghitung ukuran \`Node\` dengan pasti.

Perhatikan juga bahwa kata \`struct Node\` tetap ditulis lengkap di dalamnya. Pada saat baris itu dibaca, \`typedef\` belum selesai dibuat, sehingga nama pendeknya belum tersedia.

Inilah pola dasar dari **semua** struktur data berantai — linked list, tree, dan graph semuanya berdiri di atas gagasan yang sama ini.
`
    },
    {
      bahasa: 'c',
      kode: 'Node *baru = (Node *)malloc(sizeof(Node));\nbaru->data = 10;\nbaru->next = NULL;      // WAJIB, kalau tidak isinya sampah',
      penjelasan: `
Node linked list dibuat saat program berjalan, bukan dipesan di awal seperti array. Itulah tugas **\`malloc\`** — meminta sepetak memori seukuran satu \`Node\` dari *heap*.

Tiga hal yang wajib diperhatikan:

**\`sizeof(Node)\`, bukan angka tebakan.** Dengan begitu ukurannya selalu benar meski isi struct-nya nanti berubah.

**\`next\` wajib diisi \`NULL\`.** Memori dari \`malloc\` berisi **sampah**, bukan otomatis nol. Kalau \`next\` dibiarkan, penelusuran akan mengikuti alamat acak dan program jatuh. Ini salah satu bug linked list paling sering.

**Hasil \`malloc\` bisa gagal.** Kalau memori habis, ia mengembalikan \`NULL\`. Kode yang benar memeriksanya dulu: \`if (baru == NULL) return;\`

Terakhir, setiap \`malloc\` harus berpasangan dengan **\`free\`**. Kalau tidak, memorinya tetap terpakai sampai program berakhir — inilah **memory leak**. Di C++ padanannya \`new\` dan \`delete\`; di Python dan Java hal ini diurus otomatis oleh *garbage collector*.
`
    },
    {
      bahasa: 'c',
      kode: 'baru->next = head;    // 1. sambungkan dulu ke barisan lama\nhead = baru;          // 2. baru pindahkan head\n\n// KALAU DIBALIK: head = baru; baru->next = head;\n// -> seluruh barisan lama HILANG, dan node menunjuk dirinya sendiri',
      penjelasan: `
**Urutan dua baris ini menentukan hidup matinya seluruh data.** Ini bug linked list paling klasik, dan wajib kamu kuasai untuk mengajar.

Cara yang benar:

- \`baru->next = head\` → node baru sekarang menunjuk ke barisan yang lama. Sampai di sini barisannya **masih utuh dan bisa dijangkau lewat \`head\`**
- \`head = baru\` → barulah \`head\` dipindahkan ke node baru

Kalau urutannya dibalik, yang terjadi begini:

- \`head = baru\` → \`head\` kini menunjuk node baru. **Alamat node pertama yang lama langsung hilang** karena tidak ada lagi yang menyimpannya
- \`baru->next = head\` → karena \`head\` sudah berubah, node itu menunjuk **ke dirinya sendiri**

Hasilnya dua bencana sekaligus: seluruh data lama menjadi *memory leak* yang tidak bisa dijangkau maupun dibebaskan, dan barisannya membentuk lingkaran sehingga penelusuran berputar selamanya.

Aturan yang bisa dihafalkan: **sambungkan yang baru dulu, baru lepaskan yang lama.** Prinsip ini berlaku untuk semua operasi pointer, termasuk menyisipkan di tengah dan menghapus.
`
    },
    {
      bahasa: 'c',
      kode: 'Node *p = head;\nwhile (p != NULL) {        // cek NULL, bukan p->next != NULL\n    printf("%d ", p->data);\n    p = p->next;           // melompat ke node berikutnya\n}',
      penjelasan: `
Inilah pola baku menelusuri linked list, dan tiga detailnya penting.

**Selalu pakai variabel bantu \`p\`, jangan menggerakkan \`head\`.** Kalau kamu menulis \`head = head->next\` di dalam perulangan, setelah selesai \`head\` sudah menunjuk \`NULL\` — **seluruh daftarmu hilang** dan tidak bisa dijangkau lagi.

**Syaratnya \`p != NULL\`, bukan \`p->next != NULL\`.** Perbedaannya satu node: dengan \`p->next != NULL\`, perulangan berhenti di node terakhir sehingga **data terakhir tidak ikut tercetak**. Bentuk \`p->next != NULL\` memang kadang dipakai, tapi khusus ketika kita memang ingin **berhenti di node terakhir** — misalnya saat menyisipkan di ujung.

**\`p = p->next\` adalah pengganti \`i++\`.** Kalau baris ini lupa, \`p\` diam di tempat dan perulangan berputar selamanya — persis seperti lupa menaikkan pencacah pada \`while\` biasa.

Dari pola ini juga terlihat kenapa akses linked list itu **O(n)**: untuk mencapai node ke-500, tidak ada jalan lain selain melompat 500 kali. Tidak ada rumus alamat seperti pada array.
`
    },
    {
      bahasa: 'c',
      kode: 'Node *hapus = sblm->next;\nsblm->next = hapus->next;   // 1. lompati node yang mau dihapus\nfree(hapus);                // 2. baru bebaskan memorinya',
      penjelasan: `
Menghapus node juga soal urutan, dan sekali lagi prinsipnya sama: **selamatkan dulu, baru lepaskan.**

Perhatikan bahwa yang dibutuhkan adalah **node sebelumnya** (\`sblm\`), bukan node yang mau dihapus. Ini konsekuensi langsung dari single linked list yang **tidak bisa mundur** — kalau kamu sudah berada di node target, kamu tidak punya cara mencari node sebelumnya kecuali menelusuri ulang dari \`head\`.

Kalau urutannya dibalik menjadi \`free(hapus)\` dulu baru \`sblm->next = hapus->next\`, kamu membaca \`hapus->next\` dari memori yang **sudah dibebaskan**. Ini disebut *use after free* — nilainya bisa saja masih "kelihatan benar" saat diuji, lalu tiba-tiba rusak di lain waktu. Bug jenis ini termasuk yang paling sulit dilacak.

Di sinilah **double linked list** unggul: karena tiap node menyimpan \`prev\`, node yang mau dihapus sudah tahu sendiri siapa pendahulunya. Menghapus jadi bisa dilakukan **tanpa menelusuri dari awal**, cukup O(1) asalkan alamat nodenya sudah dipegang.
`
    },
    {
      bahasa: 'python',
      kode: 'daftar = [1, 2, 3]        # list Python = array dinamis, BUKAN linked list\ndaftar.insert(0, 0)       # O(n) — semua elemen bergeser\n\nfrom collections import deque\nd = deque([1, 2, 3])\nd.appendleft(0)           # O(1) — inilah yang mirip linked list',
      penjelasan: `
Kesalahpahaman yang sering terjadi: **\`list\` Python bukan linked list.** Ia adalah *dynamic array* — datanya tetap berdempetan di memori, hanya saja ukurannya bisa bertambah otomatis.

Akibatnya, sifat biayanya mengikuti array:

- \`daftar[500]\` → **O(1)**, karena alamatnya dihitung
- \`daftar.insert(0, x)\` → **O(n)**, karena semua elemen harus bergeser
- \`daftar.append(x)\` → **O(1)** rata-rata, karena tidak ada yang digeser

Kalau kamu memang butuh sisip-hapus di kedua ujung dengan biaya O(1), gunakan **\`collections.deque\`**. Di baliknya ia memakai potongan-potongan berantai — mirip linked list — sehingga \`appendleft()\` dan \`popleft()\` keduanya O(1).

Untuk keperluan mengajar, membuat linked list manual di Python tetap berguna sebagai latihan konsep, memakai class \`Node\` dengan atribut \`data\` dan \`next\`. Bedanya, Python tidak perlu \`malloc\` maupun \`free\` — objek yang tidak lagi dirujuk dibersihkan otomatis oleh *garbage collector*.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Node {
    public int Data;
    public Node Next;                 // rujukan ke sesamanya
    public Node(int data) { Data = data; Next = null; }
}

class LinkedListManual {
    private Node head;

    public void SisipDepan(int nilai) {          // O(1)
        Node baru = new Node(nilai);
        baru.Next = head;                        // 1. sambungkan dulu
        head = baru;                             // 2. baru pindahkan head
    }

    public void SisipBelakang(int nilai) {       // O(n)
        Node baru = new Node(nilai);
        if (head == null) { head = baru; return; }

        Node p = head;
        while (p.Next != null) p = p.Next;        // berhenti di node TERAKHIR
        p.Next = baru;
    }

    public void Hapus(int nilai) {
        if (head == null) return;
        if (head.Data == nilai) { head = head.Next; return; }

        Node sblm = head;
        while (sblm.Next != null && sblm.Next.Data != nilai) sblm = sblm.Next;
        if (sblm.Next != null) sblm.Next = sblm.Next.Next;   // lompati
    }

    public int Cari(int nilai) {
        int posisi = 0;
        for (Node p = head; p != null; p = p.Next, posisi++)
            if (p.Data == nilai) return posisi;
        return -1;
    }

    public void Balik() {
        Node sblm = null, kini = head;
        while (kini != null) {
            Node stlh = kini.Next;                // simpan dulu
            kini.Next = sblm;                     // balik arah
            sblm = kini;
            kini = stlh;
        }
        head = sblm;
    }

    public void Cetak() {
        Console.Write("head -> ");
        for (Node p = head; p != null; p = p.Next) Console.Write($"[{p.Data}] -> ");
        Console.WriteLine("null");
    }
}

class Program {
    static void Main() {
        var l = new LinkedListManual();
        l.SisipBelakang(10); l.SisipBelakang(20); l.SisipBelakang(30);
        l.Cetak();

        l.SisipDepan(5);
        Console.Write("setelah sisip depan 5: "); l.Cetak();

        Console.WriteLine($"\nposisi 20 : {l.Cari(20)}");
        l.Hapus(20);
        Console.Write("setelah hapus 20: "); l.Cetak();

        l.Balik();
        Console.Write("setelah dibalik : "); l.Cetak();

        // C# menyediakan LinkedList<T> — DOUBLE linked list
        Console.WriteLine("\n--- LinkedList<T> bawaan (double linked) ---");
        var dl = new LinkedList<int>();
        dl.AddLast(20); dl.AddLast(30);
        dl.AddFirst(10);                          // O(1)
        Console.WriteLine("  isi : " + string.Join(" ", dl));
        Console.WriteLine("  bisa ditelusuri dua arah:");
        for (var n = dl.Last; n != null; n = n.Previous) Console.Write("  " + n.Value);

        // Bandingkan dengan List<T> yang berupa array dinamis
        Console.WriteLine("\n\nList<T>  : akses [i] O(1), sisip depan O(n)");
        Console.WriteLine("LinkedList<T> : akses harus telusuri O(n), sisip O(1)");
        Console.WriteLine("Tidak perlu free — sampahnya diurus otomatis.");
    }
}`,

    java: String.raw`import java.util.LinkedList;
import java.util.ArrayList;

public class Contoh {
    static class Node {
        int data;
        Node next;                     // rujukan ke sesamanya
        Node(int data) { this.data = data; this.next = null; }
    }

    static class ListManual {
        private Node head;

        void sisipDepan(int nilai) {              // O(1)
            Node baru = new Node(nilai);
            baru.next = head;                     // 1. sambungkan dulu
            head = baru;                          // 2. baru pindahkan head
        }

        void sisipBelakang(int nilai) {           // O(n)
            Node baru = new Node(nilai);
            if (head == null) { head = baru; return; }
            Node p = head;
            while (p.next != null) p = p.next;     // berhenti di node TERAKHIR
            p.next = baru;
        }

        void hapus(int nilai) {
            if (head == null) return;
            if (head.data == nilai) { head = head.next; return; }
            Node sblm = head;
            while (sblm.next != null && sblm.next.data != nilai) sblm = sblm.next;
            if (sblm.next != null) sblm.next = sblm.next.next;
        }

        int cari(int nilai) {
            int posisi = 0;
            for (Node p = head; p != null; p = p.next, posisi++)
                if (p.data == nilai) return posisi;
            return -1;
        }

        void balik() {
            Node sblm = null, kini = head;
            while (kini != null) {
                Node stlh = kini.next;             // simpan dulu
                kini.next = sblm;                  // balik arah
                sblm = kini;
                kini = stlh;
            }
            head = sblm;
        }

        void cetak() {
            System.out.print("head -> ");
            for (Node p = head; p != null; p = p.next)
                System.out.print("[" + p.data + "] -> ");
            System.out.println("null");
        }
    }

    public static void main(String[] args) {
        ListManual l = new ListManual();
        l.sisipBelakang(10); l.sisipBelakang(20); l.sisipBelakang(30);
        l.cetak();

        l.sisipDepan(5);
        System.out.print("setelah sisip depan 5: "); l.cetak();

        System.out.println("\nposisi 20 : " + l.cari(20));
        l.hapus(20);
        System.out.print("setelah hapus 20: "); l.cetak();

        l.balik();
        System.out.print("setelah dibalik : "); l.cetak();

        // Java menyediakan LinkedList — DOUBLE linked list
        System.out.println("\n--- LinkedList bawaan (double linked) ---");
        LinkedList<Integer> dl = new LinkedList<>();
        dl.add(20); dl.add(30);
        dl.addFirst(10);                          // O(1)
        System.out.println("  isi : " + dl);
        System.out.println("  addFirst/removeFirst O(1), get(i) tetap O(n)");

        // Bandingkan dengan ArrayList
        ArrayList<Integer> al = new ArrayList<>();
        al.add(20); al.add(30);
        al.add(0, 10);                            // O(n), semua bergeser
        System.out.println("  ArrayList : " + al);

        System.out.println("\nArrayList  : get(i) O(1), sisip depan O(n)");
        System.out.println("LinkedList : get(i) O(n), sisip depan O(1)");
        System.out.println("Tidak perlu free — sampahnya diurus otomatis.");
    }
}`,

    js: String.raw`class Node {
    constructor(data) {
        this.data = data;
        this.next = null;              // padanan NULL di C
    }
}

class LinkedList {
    constructor() {
        this.head = null;              // daftar kosong
    }

    sisipDepan(nilai) {                // O(1)
        const baru = new Node(nilai);
        baru.next = this.head;         // 1. sambungkan dulu
        this.head = baru;              // 2. baru pindahkan head
    }

    sisipBelakang(nilai) {             // O(n)
        const baru = new Node(nilai);
        if (this.head === null) { this.head = baru; return; }

        let p = this.head;
        while (p.next !== null) p = p.next;    // berhenti di node TERAKHIR
        p.next = baru;
    }

    hapus(nilai) {
        if (this.head === null) return;
        if (this.head.data === nilai) { this.head = this.head.next; return; }

        let sblm = this.head;
        while (sblm.next !== null && sblm.next.data !== nilai) sblm = sblm.next;
        if (sblm.next !== null) sblm.next = sblm.next.next;   // lompati
    }

    cari(nilai) {
        let posisi = 0;
        for (let p = this.head; p !== null; p = p.next, posisi++)
            if (p.data === nilai) return posisi;
        return -1;
    }

    balik() {
        let sblm = null, kini = this.head;
        while (kini !== null) {
            const stlh = kini.next;    // simpan dulu
            kini.next = sblm;          // balik arah
            sblm = kini;
            kini = stlh;
        }
        this.head = sblm;
    }

    cetak() {
        const bagian = [];
        for (let p = this.head; p !== null; p = p.next) bagian.push("[" + p.data + "]");
        console.log("head -> " + bagian.join(" -> ") + " -> null");
    }
}

const l = new LinkedList();
l.sisipBelakang(10);
l.sisipBelakang(20);
l.sisipBelakang(30);
l.cetak();

l.sisipDepan(5);
console.log("setelah sisip depan 5:");
l.cetak();

console.log("\nposisi 20 :", l.cari(20));
l.hapus(20);
console.log("setelah hapus 20:");
l.cetak();

l.balik();
console.log("setelah dibalik:");
l.cetak();

// PENTING: JavaScript TIDAK punya linked list bawaan.
// Array JavaScript adalah array dinamis, bukan linked list.
console.log("\n--- Array JavaScript BUKAN linked list ---");
const arr = [10, 20, 30];
arr.unshift(5);                  // O(n) — semua elemen bergeser
console.log("  arr.unshift(5) :", arr, " (O(n))");
console.log("  arr[2]         :", arr[2], " (O(1), karena array)");

console.log("\nKapan linked list berguna di JavaScript?");
console.log("  Nyaris tidak pernah dalam praktik —");
console.log("  array bawaan sudah dioptimalkan mesin JavaScript.");
console.log("  Tapi tetap penting dipelajari sebagai konsep,");
console.log("  karena tree dan graph memakai pola yang sama.");

// Tidak perlu free — sampahnya diurus garbage collector
console.log("\nTidak ada malloc/free: object yang tidak lagi");
console.log("dirujuk otomatis dibersihkan.");`,

    c: String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;      // pointer ke sesamanya
} Node;

/* Membuat satu node baru */
Node *buatNode(int nilai) {
    Node *baru = (Node *)malloc(sizeof(Node));
    if (baru == NULL) {                 // malloc bisa gagal
        printf("Memori penuh!\n");
        exit(1);
    }
    baru->data = nilai;
    baru->next = NULL;                  // WAJIB, kalau tidak isinya sampah
    return baru;
}

/* Sisip di DEPAN: O(1) — inilah keunggulan linked list */
void sisipDepan(Node **head, int nilai) {
    Node *baru = buatNode(nilai);
    baru->next = *head;                 // 1. sambungkan dulu
    *head = baru;                       // 2. baru pindahkan head
}

/* Sisip di BELAKANG: O(n) karena harus menelusuri sampai ujung */
void sisipBelakang(Node **head, int nilai) {
    Node *baru = buatNode(nilai);
    if (*head == NULL) { *head = baru; return; }   // kasus daftar kosong

    Node *p = *head;
    while (p->next != NULL) p = p->next;           // berhenti di node TERAKHIR
    p->next = baru;
}

/* Hapus node pertama yang datanya cocok */
void hapus(Node **head, int nilai) {
    if (*head == NULL) return;

    /* Kasus khusus: yang dihapus adalah node pertama */
    if ((*head)->data == nilai) {
        Node *buang = *head;
        *head = (*head)->next;          // 1. lompati
        free(buang);                    // 2. baru bebaskan
        return;
    }

    Node *sblm = *head;
    while (sblm->next != NULL && sblm->next->data != nilai) sblm = sblm->next;

    if (sblm->next == NULL) { printf("%d tidak ada\n", nilai); return; }

    Node *buang = sblm->next;
    sblm->next = buang->next;           // 1. lompati node target
    free(buang);                        // 2. baru bebaskan
}

/* Telusuri: pakai variabel bantu, JANGAN gerakkan head */
void cetak(Node *head) {
    Node *p = head;                     // p, bukan head
    printf("head -> ");
    while (p != NULL) {                 // != NULL, bukan p->next != NULL
        printf("[%d] -> ", p->data);
        p = p->next;
    }
    printf("NULL\n");
}

int cari(Node *head, int nilai) {
    int posisi = 0;
    for (Node *p = head; p != NULL; p = p->next, posisi++)
        if (p->data == nilai) return posisi;
    return -1;
}

/* Membalik arah rantai — soal wawancara kerja klasik */
void balik(Node **head) {
    Node *sblm = NULL, *kini = *head, *stlh = NULL;
    while (kini != NULL) {
        stlh = kini->next;      // simpan dulu supaya tidak hilang
        kini->next = sblm;      // balik arah panahnya
        sblm = kini;            // geser maju
        kini = stlh;
    }
    *head = sblm;
}

/* Setiap malloc wajib berpasangan dengan free */
void bebaskan(Node **head) {
    Node *p = *head;
    while (p != NULL) {
        Node *berikut = p->next;    // simpan DULU sebelum dibebaskan
        free(p);
        p = berikut;
    }
    *head = NULL;
}

int main(void) {
    Node *head = NULL;              // daftar kosong

    sisipBelakang(&head, 10);
    sisipBelakang(&head, 20);
    sisipBelakang(&head, 30);
    cetak(head);

    sisipDepan(&head, 5);           // O(1), tidak ada yang bergeser
    printf("setelah sisip depan 5:\n");
    cetak(head);

    printf("\nposisi 20 : %d\n", cari(head, 20));
    printf("posisi 99 : %d\n", cari(head, 99));

    hapus(&head, 20);
    printf("\nsetelah hapus 20:\n");
    cetak(head);

    balik(&head);
    printf("\nsetelah dibalik:\n");
    cetak(head);

    bebaskan(&head);                // cegah memory leak
    printf("\nsetelah dibebaskan:\n");
    cetak(head);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <list>
#include <forward_list>
#include <vector>
using namespace std;

/* Implementasi manual, untuk memahami cara kerjanya */
struct Node {
    int data;
    Node *next;
    Node(int d) : data(d), next(nullptr) {}   // constructor
};

class LinkedList {
private:
    Node *head;

public:
    LinkedList() : head(nullptr) {}

    ~LinkedList() {                    // destructor membebaskan semua node
        while (head != nullptr) {
            Node *berikut = head->next;
            delete head;
            head = berikut;
        }
    }

    void sisipDepan(int nilai) {       // O(1)
        Node *baru = new Node(nilai);
        baru->next = head;             // sambungkan dulu
        head = baru;                   // baru pindahkan head
    }

    void sisipBelakang(int nilai) {    // O(n)
        Node *baru = new Node(nilai);
        if (!head) { head = baru; return; }
        Node *p = head;
        while (p->next) p = p->next;
        p->next = baru;
    }

    void cetak() const {
        cout << "head -> ";
        for (Node *p = head; p != nullptr; p = p->next)
            cout << "[" << p->data << "] -> ";
        cout << "nullptr" << endl;
    }
};

int main() {
    LinkedList l;
    l.sisipBelakang(10);
    l.sisipBelakang(20);
    l.sisipDepan(5);
    l.cetak();

    // Di dunia nyata cukup pakai pustaka standar:
    // list = double linked list
    list<int> dl = {10, 20, 30};
    dl.push_front(5);                 // O(1)
    dl.push_back(40);                 // O(1), karena punya pointer ke ekor
    cout << "\nstd::list  : ";
    for (int x : dl) cout << x << " ";

    // forward_list = single linked list, lebih hemat memori
    forward_list<int> sl = {1, 2, 3};
    sl.push_front(0);
    cout << "\nforward_list: ";
    for (int x : sl) cout << x << " ";

    // Bandingkan dengan vector (array dinamis)
    vector<int> v = {10, 20, 30};
    v.insert(v.begin(), 5);           // O(n), semua elemen bergeser
    cout << "\nvector     : ";
    for (int x : v) cout << x << " ";
    cout << "\n\nvector: akses v[2] O(1), sisip depan O(n)";
    cout << "\nlist  : akses harus telusuri O(n), sisip depan O(1)" << endl;

    return 0;
}`,

    python: String.raw`from collections import deque


class Node:
    """Satu simpul: data + penunjuk ke simpul berikutnya."""
    def __init__(self, data):
        self.data = data
        self.next = None          # padanan NULL di C


class LinkedList:
    def __init__(self):
        self.head = None          # daftar kosong

    def sisip_depan(self, nilai):         # O(1)
        baru = Node(nilai)
        baru.next = self.head             # 1. sambungkan dulu
        self.head = baru                  # 2. baru pindahkan head

    def sisip_belakang(self, nilai):      # O(n)
        baru = Node(nilai)
        if self.head is None:
            self.head = baru
            return
        p = self.head
        while p.next is not None:         # berhenti di node TERAKHIR
            p = p.next
        p.next = baru

    def hapus(self, nilai):
        if self.head is None:
            return
        if self.head.data == nilai:       # kasus khusus: node pertama
            self.head = self.head.next    # Python otomatis membersihkan
            return
        sblm = self.head
        while sblm.next is not None and sblm.next.data != nilai:
            sblm = sblm.next
        if sblm.next is not None:
            sblm.next = sblm.next.next    # lompati node target

    def cari(self, nilai):
        posisi, p = 0, self.head
        while p is not None:
            if p.data == nilai:
                return posisi
            p, posisi = p.next, posisi + 1
        return -1

    def balik(self):
        sblm, kini = None, self.head
        while kini is not None:
            stlh = kini.next              # simpan dulu
            kini.next = sblm              # balik arah
            sblm, kini = kini, stlh       # geser maju
        self.head = sblm

    def cetak(self):
        bagian, p = [], self.head         # p, JANGAN gerakkan head
        while p is not None:
            bagian.append(f"[{p.data}]")
            p = p.next
        print("head -> " + " -> ".join(bagian) + " -> None")


l = LinkedList()
l.sisip_belakang(10)
l.sisip_belakang(20)
l.sisip_belakang(30)
l.cetak()

l.sisip_depan(5)
print("setelah sisip depan 5:")
l.cetak()

print("\nposisi 20 :", l.cari(20))
l.hapus(20)
print("setelah hapus 20:")
l.cetak()

l.balik()
print("setelah dibalik:")
l.cetak()

# PENTING: list Python itu array dinamis, BUKAN linked list
daftar = [1, 2, 3]
daftar.insert(0, 0)          # O(n) — semua elemen bergeser
print("\nlist Python  :", daftar, "(array dinamis)")

# deque baru yang perilakunya mirip linked list
d = deque([1, 2, 3])
d.appendleft(0)              # O(1)
d.popleft()                  # O(1)
print("deque        :", list(d), "(O(1) di kedua ujung)")`
  },

  output: `head -> [10] -> [20] -> [30] -> NULL
setelah sisip depan 5:
head -> [5] -> [10] -> [20] -> [30] -> NULL

posisi 20 : 2
posisi 99 : -1

setelah hapus 20:
head -> [5] -> [10] -> [30] -> NULL

setelah dibalik:
head -> [30] -> [10] -> [5] -> NULL

setelah dibebaskan:
head -> NULL`,

  kompleksitas: {
    tabel: [
      { operasi: 'Akses elemen ke-i — Array', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Akses elemen ke-i — Linked List', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Sisip di depan — Array', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Sisip di depan — Linked List', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Sisip di belakang — Array dinamis', waktu: 'O(1)*', memori: 'O(1)' },
      { operasi: 'Sisip di belakang — Linked List', waktu: 'O(n)**', memori: 'O(1)' },
      { operasi: 'Hapus bila node sudah dipegang', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Cari nilai (tak terurut)', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Memori tambahan per elemen', waktu: '—', memori: 'Array 0, List 1–2 pointer' }
    ],
    intuisi: `
**Kenapa array O(1) tapi linked list O(n) untuk akses?** Karena array bisa **menghitung** alamatnya dengan *awal + i × ukuran*, sedangkan linked list harus **menelusuri** rantai satu per satu. Tidak ada rumus untuk menuju node ke-500 selain melompat 500 kali.

**Kenapa justru terbalik saat menyisipkan di depan?** Karena array harus **menggeser semua elemen** untuk membuka ruang di indeks 0, sedangkan linked list cuma mengubah **dua pointer** — berapa pun panjang datanya. Inilah kekuatan utama linked list.

**Kenapa ada tanda bintang pada sisip belakang?** \`O(1)*\` pada array dinamis berarti **rata-rata**: sesekali wadahnya penuh dan seluruh isinya harus dipindah ke tempat yang lebih besar, dan itu O(n). Tapi karena kejadiannya jarang, rata-ratanya tetap O(1) — ini disebut *amortized*. Sedangkan \`O(n)**\` pada linked list bisa **turun jadi O(1)** kalau kita menyimpan pointer tambahan ke ekor (*tail*), dan itulah yang dilakukan \`std::list\`.

**Soal memori:** array tidak memerlukan tambahan apa pun per elemen, sedangkan tiap node linked list membayar 8 byte untuk \`next\` — dan 16 byte untuk double linked list. Untuk menyimpan \`int\` 4 byte, ini berarti **overhead-nya dua sampai empat kali lipat data aslinya**.

**Yang tidak muncul di tabel tapi penting:** array jauh lebih ramah *cache* prosesor karena datanya berdempetan. Dalam praktik, array sering mengalahkan linked list bahkan pada operasi yang secara teori kalah — terutama untuk data berukuran kecil sampai sedang.
`
  },

  kesalahanUmum: [
    {
      salah: 'Membalik urutan saat menyisipkan: `head = baru; baru->next = head;`',
      kenapa: 'Begitu `head` dipindahkan, **alamat node pertama yang lama langsung hilang** karena tidak ada lagi yang menyimpannya. Baris berikutnya lalu membuat node menunjuk ke dirinya sendiri, sehingga penelusuran berputar selamanya sekaligus meninggalkan seluruh data lama sebagai memory leak.',
      benar: 'Selalu **sambungkan yang baru dulu, baru lepaskan yang lama**: `baru->next = head; head = baru;`. Prinsip ini berlaku untuk semua operasi pointer.'
    },
    {
      salah: 'Menggerakkan `head` saat menelusuri: `while (head != NULL) head = head->next;`',
      kenapa: 'Setelah perulangan selesai, `head` sudah bernilai `NULL` — dan karena `head` adalah satu-satunya pegangan ke daftar itu, **seluruh datamu jadi tidak bisa dijangkau lagi**. Datanya masih ada di memori, tapi tidak ada jalan menuju ke sana.',
      benar: 'Gunakan variabel bantu: `Node *p = head;` lalu gerakkan `p`. Perlakukan `head` sebagai sesuatu yang tidak boleh disentuh kecuali memang sedang menyisipkan atau menghapus di depan.'
    },
    {
      salah: 'Lupa mengisi `next` dengan NULL setelah `malloc`.',
      kenapa: 'Memori dari `malloc` berisi **sampah**, bukan otomatis nol. Node terakhir jadi menunjuk ke alamat acak, sehingga penelusuran melanjutkan ke memori yang bukan haknya dan program jatuh dengan *segmentation fault*.',
      benar: 'Selalu tulis `baru->next = NULL;` tepat setelah `malloc`. Kalau memakai fungsi pembuat node, taruh di dalamnya agar tidak pernah terlupa.'
    },
    {
      salah: 'Membebaskan node sebelum menyimpan alamat berikutnya: `free(p); p = p->next;`',
      kenapa: 'Setelah `free(p)`, memori itu sudah tidak berlaku. Membaca `p->next` darinya adalah *use after free* — nilainya bisa saja masih terlihat benar saat diuji, lalu rusak di lain waktu. Bug jenis ini sangat sulit dilacak karena gejalanya tidak konsisten.',
      benar: 'Simpan dulu: `Node *berikut = p->next; free(p); p = berikut;`. Pola yang sama: **selamatkan dulu, baru lepaskan.**'
    },
    {
      salah: 'Lupa memeriksa kasus daftar kosong (`head == NULL`).',
      kenapa: 'Fungsi seperti hapus atau sisip belakang langsung mengakses `head->data` atau `head->next`. Kalau `head` bernilai `NULL`, ini berarti membuka isi alamat kosong — dan program berhenti dengan *segmentation fault*.',
      benar: 'Selalu jaga di awal fungsi: `if (head == NULL) { ... }`. Uji setiap fungsi linked list dengan tiga keadaan: **kosong**, **satu node**, dan **banyak node**.'
    },
    {
      salah: 'Mengira `list` di Python adalah linked list.',
      kenapa: '`list` Python sebenarnya *dynamic array* — datanya tetap berdempetan. Akibatnya `insert(0, x)` tetap **O(n)** karena semua elemen bergeser, padahal banyak yang menyangka O(1) seperti linked list sungguhan.',
      benar: 'Gunakan `collections.deque` bila memang butuh O(1) di kedua ujung. Untuk latihan konsep, buat class `Node` manual seperti pada contoh kode.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah membandingkan **gerbong kereta** dengan **perburuan harta karun**.

**Array itu gerbong kereta yang tersambung dan bernomor.** Kamu bisa langsung naik ke gerbong 7 karena letaknya bisa dihitung. Tapi menyisipkan gerbong baru di tengah berarti **semua gerbong setelahnya harus diberi nomor ulang**.

**Linked list itu perburuan harta karun.** Kamu cuma diberi petunjuk pertama (\`head\`). Tiap tempat berisi hadiah (data) plus **secarik kertas berisi alamat tempat berikutnya** (\`next\`). Tempat terakhir bertuliskan "selesai" (\`NULL\`).

Analogi ini menjelaskan semuanya sekaligus:

- **Kenapa akses O(n)?** Kamu tidak bisa langsung ke tempat ke-7. Harus lewati satu per satu, karena alamatnya cuma diketahui dari tempat sebelumnya.
- **Kenapa menyisipkan itu murah?** Cukup tulis ulang **satu kertas petunjuk**. Tidak ada tempat lain yang perlu dipindahkan.
- **Kenapa urutan menyambung itu kritis?** Kalau kamu membuang kertas petunjuk lama **sebelum** menyalinnya, seluruh sisa perburuan hilang selamanya. Peragakan ini di kelas — sobek kertasnya benar-benar, lalu tanya *"sekarang bagaimana caranya sampai ke hadiah berikutnya?"*

Peragaan fisik yang sangat efektif: minta 5 mahasiswa berdiri **berjauhan dan acak** di ruangan, masing-masing memegang kertas bertuliskan nama teman berikutnya. Kamu hanya diberi tahu nama orang pertama. Untuk mencapai orang kelima, kamu **harus** menghampiri satu per satu — dan mahasiswa langsung merasakan sendiri kenapa aksesnya O(n).

Lalu minta satu orang baru menyelip di tengah barisan. Yang perlu diubah cuma **dua kertas** — tidak ada yang perlu bergeser. Bandingkan dengan versi array, di mana mereka berdiri berderet rapat dan seorang yang menyelip memaksa semua orang bergeser. Perbedaannya langsung terasa di badan, bukan cuma di kepala.
`,

  latihan: [
    'Buat single linked list lengkap dengan fungsi sisip depan, sisip belakang, hapus, cari, dan cetak. Uji setiap fungsi dengan tiga keadaan: daftar kosong, satu node, dan banyak node.',
    'Tambahkan fungsi `int hitung(Node *head)` yang mengembalikan jumlah node. Kenapa ini O(n) sementara `v.size()` pada array itu O(1)?',
    'Buat fungsi untuk membalik arah linked list tanpa membuat node baru. Petunjuk: butuh tiga pointer — sebelum, kini, dan setelah. Gambar dulu prosesnya di kertas sebelum menulis kode.',
    'Sengaja tulis `head = baru; baru->next = head;` (urutan terbalik), lalu jalankan fungsi cetaknya. Catat apa yang terjadi dan jelaskan penyebabnya. Ini akan sangat berguna sebagai bahan peragaan saat mengajar.',
    'Ubah single linked list menjadi **double linked list** dengan menambahkan pointer `prev`. Buat fungsi cetak yang menampilkan isinya dari belakang ke depan.',
    'Buat program yang mengukur waktu: sisipkan 100.000 elemen di **depan** memakai array dan memakai linked list, lalu bandingkan. Setelah itu ukur waktu **mengakses** elemen ke-50.000 pada keduanya.',
    'Uji pemahaman: rancang peragaan 5 menit dengan mahasiswa berdiri memegang kertas alamat untuk menjelaskan linked list. Targetnya, kamu bisa menyimpulkan sendiri kenapa akses itu O(n) tetapi menyisipkan itu O(1).'
  ]
});

TOPICS.push({
  id: 'stack',
  judul: 'Stack (Tumpukan)',
  kategori: 'struktur-data',
  tag: ['stack', 'LIFO', 'push', 'pop', 'struktur data'],
  ringkas: 'Struktur data LIFO: yang terakhir masuk adalah yang pertama keluar. Dasar dari undo, tombol back, dan rekursi.',

  fungsi: `**Menyimpan sesuatu yang harus diambil dalam urutan terbalik.**

Terpakai di:

- **Undo** pada aplikasi apa pun
- **Memeriksa tanda kurung** pada penyunting kode dan penerjemah bahasa
- **Call stack** — cara program mengingat harus kembali ke mana, dan sumber \`StackOverflowError\`
- **Tombol kembali** pada peramban
- **DFS** pada graf, dan menghitung ekspresi postfix

Yang paling berguna dipahami: **rekursi dan stack itu hal yang sama**. Setiap fungsi rekursif bisa ditulis ulang dengan stack eksplisit, dan itulah yang dilakukan komputer di balik layar.

Memahami ini menjelaskan kenapa rekursi terlalu dalam membuat program mati.`,

  praktik: {
    tujuan: `Kamu bisa membangun stack, memakainya untuk memeriksa tanda kurung, dan mengubah fungsi rekursif menjadi versi berstack.`,
    alat: [
      'Python 3 atau C++'
    ],
    langkah: [
      { judul: 'Bangun dengan array dulu',
        isi: `Stack cuma butuh tiga operasi: \`push\`, \`pop\`, dan \`peek\` — semuanya \`O(1)\`.

Di Python, \`list\` sudah cukup: \`append()\` untuk push, \`pop()\` untuk pop.

**Jangan pakai \`pop(0)\`** — itu menggeser seluruh isi dan menjadikannya \`O(n)\`.` },
      { judul: 'Periksa kondisi kosong',
        isi: `\`pop\` pada stack kosong adalah bug paling sering.

Selalu periksa lebih dulu, atau lemparkan galat yang jelas — jangan biarkan program mati dengan pesan yang membingungkan.` },
      { judul: 'Buat pemeriksa tanda kurung',
        isi: `Aturannya sederhana: kurung pembuka di-push, kurung penutup harus cocok dengan yang di-pop.

Uji dengan: \`([{}])\` benar, \`([)]\` salah, \`((\` salah karena stack tidak kosong di akhir, dan \`))\` salah karena pop pada stack kosong.

Keempat kasus itu menangkap semua kemungkinan kesalahan.` },
      { judul: 'Lihat call stack sungguhan',
        isi: `Buat fungsi rekursif yang sengaja tidak berhenti, lalu jalankan.

Di Python kamu mendapat \`RecursionError\` beserta jejaknya. Jejak itu **adalah** isi call stack.

Ini menghubungkan struktur data yang kamu bangun dengan mekanisme yang dipakai bahasanya sendiri.` },
      { judul: 'Ubah rekursi menjadi stack eksplisit',
        isi: `Ambil fungsi rekursif sederhana, lalu tulis ulang dengan stack yang kamu kelola sendiri.

Kamu akan melihat bahwa yang kamu simpan di stack adalah **persis** yang disimpan komputer: parameter dan tempat kembali.

Setelah ini, rekursi berhenti terasa ajaib.` },
      { judul: 'Hitung ekspresi postfix',
        isi: `Untuk \`3 4 + 2 *\`: angka di-push, operator mengambil dua teratas lalu mem-push hasilnya.

Hasilnya 14. Ini cara kalkulator dan mesin virtual sungguhan bekerja, dan hanya butuh stack.` }
    ],
    cek: [
      'Pemeriksa kurungmu benar untuk keempat kasus uji di langkah tiga',
      'Stack-mu memberi pesan jelas saat di-pop dalam keadaan kosong',
      'Versi berstack dari fungsi rekursifmu memberi hasil identik'
    ]
  },

  konsep: `
**Stack** adalah struktur data yang cuma punya **satu pintu**: semua operasi terjadi di **ujung atas** saja. Konsekuensinya, data yang **terakhir dimasukkan** akan menjadi yang **pertama diambil**. Sifat ini disingkat **LIFO** — *Last In, First Out*.

Analogi paling pas adalah **tumpukan piring** di kantin. Piring bersih ditaruh di atas tumpukan, dan saat mengambil pun kamu ambil dari atas. Kamu tidak bisa menarik piring paling bawah tanpa membongkar semua yang di atasnya — dan justru **keterbatasan inilah yang membuat stack cepat**.

Operasi bakunya hanya empat:

- **push** — taruh satu data di atas tumpukan
- **pop** — ambil (dan buang) data paling atas
- **peek** atau **top** — intip data paling atas **tanpa** mengambilnya
- **isEmpty** — cek apakah tumpukan kosong

Kenapa struktur sesederhana ini penting? Karena pola "yang terakhir dikerjakan harus diselesaikan lebih dulu" ada di mana-mana:

- **Undo (Ctrl+Z)** — aksi terakhirmu yang dibatalkan duluan
- **Tombol Back browser** — halaman terakhir yang dikunjungi, itu yang ditinggalkan duluan
- **Call stack** — saat fungsi A memanggil B, B harus selesai dulu sebelum A lanjut. Inilah alasan rekursi yang terlalu dalam menghasilkan error bernama **stack overflow**
- **Pencocokan kurung** pada kompiler, misal memeriksa \`{ [ ( ) ] }\` seimbang atau tidak
- **DFS** (*Depth First Search*) pada graph, dan evaluasi ekspresi *postfix*

Poin penting yang sering terlewat: memahami stack membuat kamu paham **cara kerja rekursi**, karena rekursi sesungguhnya berjalan di atas sebuah stack yang diurus otomatis oleh sistem.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '#define MAKS 100\nint data[MAKS];\nint top = -1;      // kenapa -1, bukan 0 ?',
      penjelasan: `
\`top\` adalah **penanda posisi elemen teratas**. Diberi nilai awal \`-1\` karena saat tumpukan masih kosong, **belum ada indeks yang sah** — sedangkan indeks array yang sah dimulai dari 0.

Jadi \`-1\` di sini berarti "kosong". Setelah \`push\` pertama, \`top\` naik jadi \`0\`, yang pas menunjuk elemen pertama.

Sebenarnya ada dua konvensi yang sama-sama benar, dan **kamu wajib konsisten memilih satu**:

- \`top = -1\` → \`top\` menunjuk **elemen teratas**. Cek kosong: \`top == -1\`. Push: \`data[++top]\`.
- \`top = 0\` → \`top\` menunjuk **slot kosong berikutnya**. Cek kosong: \`top == 0\`. Push: \`data[top++]\`, dan intip jadi \`data[top-1]\`.

Mencampur keduanya adalah sumber bug nomor satu pada praktikum stack.
`
    },
    {
      bahasa: 'c',
      kode: 'data[++top] = nilai;   // push\n// bandingkan: data[top++] = nilai;',
      penjelasan: `
Ini beda yang halus tapi menentukan, dan hampir pasti keluar di soal ujian.

\`++top\` adalah **pre-increment**: naikkan dulu, baru nilainya dipakai. Jadi \`data[++top] = nilai\` setara dengan:

- \`top = top + 1;\`
- \`data[top] = nilai;\`

Sedangkan \`top++\` adalah **post-increment**: pakai nilai lamanya dulu, baru dinaikkan. Jadi \`data[top++] = nilai\` setara dengan:

- \`data[top] = nilai;\`
- \`top = top + 1;\`

Dengan konvensi \`top = -1\`, memakai \`data[top++]\` berarti push pertama menulis ke \`data[-1]\` — **di luar array**, dan itu merusak memori tanpa peringatan apa pun dari kompiler.

Aturan hafalannya: **awalan \`-1\` berpasangan dengan \`++top\`; awalan \`0\` berpasangan dengan \`top++\`.**
`
    },
    {
      bahasa: 'c',
      kode: 'int pop(void) {\n    if (top == -1) {              // WAJIB dicek lebih dulu\n        printf("Stack kosong!\\n");\n        return -1;\n    }\n    return data[top--];\n}',
      penjelasan: `
Pengecekan \`top == -1\` disebut penjagaan **underflow** — mencegah pengambilan dari tumpukan kosong. Tanpa itu, \`top\` akan turun jadi \`-2\`, \`-3\`, dan seterusnya sambil membaca memori di luar array.

Bagian \`return data[top--]\` memanfaatkan post-decrement dan urutannya penting: **nilai \`data[top]\` diambil dulu untuk dikembalikan, baru kemudian \`top\` diturunkan**. Kalau ditulis \`return data[--top]\`, yang terambil justru elemen di bawahnya — salah satu elemen jadi terlewat.

Perhatikan juga bahwa datanya **tidak benar-benar dihapus** dari memori; yang berubah hanya penanda \`top\`. Angka lama masih ada di sana, tapi dianggap tidak berlaku lagi karena berada di atas \`top\`.
`
    },
    {
      bahasa: 'cpp',
      kode: 'stack<int> s;\ns.push(10);\nint atas = s.top();   // ambil nilainya\ns.pop();              // baru buang — pop() TIDAK mengembalikan nilai',
      penjelasan: `
Ini jebakan khas C++ yang menjatuhkan banyak mahasiswa: pada \`std::stack\`, **\`pop()\` bertipe \`void\`** — ia hanya membuang elemen teratas dan **tidak mengembalikan apa pun**.

Jadi \`int x = s.pop();\` akan **gagal saat kompilasi**. Urutan yang benar selalu dua langkah: \`top()\` untuk mengambil nilainya, lalu \`pop()\` untuk membuangnya.

Kenapa dirancang begitu? Karena kalau \`pop()\` mengembalikan nilai sekaligus menghapus, dan proses penyalinan nilainya gagal di tengah jalan (melempar *exception*), datanya sudah terlanjur hilang dan tidak bisa dipulihkan. Dengan memisahkan keduanya, operasinya jadi aman.

Perlu diingat juga: \`s.top()\` pada stack kosong adalah *undefined behavior*, jadi tetap cek \`s.empty()\` lebih dulu.
`
    },
    {
      bahasa: 'python',
      kode: 'tumpukan = []\ntumpukan.append(10)   # push\nteratas = tumpukan.pop()   # pop dari UJUNG -> O(1)\n# hati-hati: tumpukan.pop(0) mengambil dari DEPAN -> O(n)',
      penjelasan: `
Python tidak menyediakan tipe stack khusus karena \`list\` biasa sudah cukup: \`append()\` untuk push dan \`pop()\` untuk pop.

Kuncinya ada pada \`pop()\` **tanpa argumen**, yang mengambil dari **ujung belakang** dan berjalan **O(1)**. Sementara \`pop(0)\` mengambil dari **depan**, dan itu memaksa seluruh elemen sisanya bergeser satu langkah ke kiri sehingga biayanya menjadi **O(n)**.

Jadi \`pop(0)\` bukan cuma lebih lambat — secara perilaku ia sudah bukan stack lagi, melainkan **queue** (FIFO). Kalau memang butuh antrean, pakai \`collections.deque\` yang \`popleft()\`-nya O(1).
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Stack<T> bawaan C#
        Stack<int> s = new Stack<int>();

        s.Push(10);
        s.Push(20);
        s.Push(30);

        Console.WriteLine($"ukuran   : {s.Count}");
        Console.WriteLine($"teratas  : {s.Peek()}");    // Peek, bukan Top

        // BEDA PENTING dengan C++: Pop() di C# MENGEMBALIKAN nilainya
        Console.WriteLine("\nurutan keluar (LIFO):");
        while (s.Count > 0) {
            Console.Write(s.Pop() + " ");               // satu langkah saja
        }
        Console.WriteLine("\n-> di C++, s.pop() bertipe void;");
        Console.WriteLine("   harus s.top() dulu baru s.pop()");

        // Selalu cek kosong sebelum Pop
        try {
            s.Pop();
        } catch (InvalidOperationException) {
            Console.WriteLine("\nPop pada stack kosong -> InvalidOperationException");
            Console.WriteLine("  (di C, ini merusak memori diam-diam)");
        }

        // TryPop: aman, tidak melempar exception
        if (!s.TryPop(out int hasil)) Console.WriteLine("TryPop -> stack kosong, aman");

        // ---------- Contoh nyata: memeriksa pasangan kurung ----------
        Console.WriteLine("\n--- pemeriksa kurung ---");
        foreach (string uji in new[] { "{[()]}", "{[(])}", "((" }) {
            Console.WriteLine($"  {uji,-8} -> {(Seimbang(uji) ? "seimbang" : "tidak")}");
        }

        // Membalik teks
        Console.WriteLine($"\nbalik 'asprak' : {Balik("asprak")}");
    }

    static bool Seimbang(string teks) {
        var pasangan = new Dictionary<char, char> {
            [')'] = '(', [']'] = '[', ['}'] = '{'
        };
        var tumpuk = new Stack<char>();

        foreach (char c in teks) {
            if (c == '(' || c == '[' || c == '{') {
                tumpuk.Push(c);                          // kurung buka -> simpan
            } else if (pasangan.ContainsKey(c)) {
                if (tumpuk.Count == 0 || tumpuk.Pop() != pasangan[c]) return false;
            }
        }
        return tumpuk.Count == 0;                        // sisa berarti belum ditutup
    }

    static string Balik(string s) {
        var tumpuk = new Stack<char>(s);                 // langsung dari string
        return new string(tumpuk.ToArray());
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    public static void main(String[] args) {
        // PENTING: java.util.Stack itu class LAMA dan TIDAK dianjurkan.
        // Yang dianjurkan adalah ArrayDeque.
        Deque<Integer> s = new ArrayDeque<>();

        s.push(10);                      // push = addFirst
        s.push(20);
        s.push(30);

        System.out.println("ukuran  : " + s.size());
        System.out.println("teratas : " + s.peek());

        // pop() di Java MENGEMBALIKAN nilainya, seperti C# dan Python
        System.out.print("\nurutan keluar (LIFO): ");
        while (!s.isEmpty()) System.out.print(s.pop() + " ");
        System.out.println("\n-> di C++, s.pop() bertipe void");

        // Selalu cek kosong
        try {
            s.pop();
        } catch (NoSuchElementException e) {
            System.out.println("\npop pada stack kosong -> NoSuchElementException");
            System.out.println("  (di C, ini merusak memori diam-diam)");
        }

        System.out.println("\nKenapa ArrayDeque, bukan Stack?");
        System.out.println("  java.util.Stack mewarisi Vector, sehingga tiap");
        System.out.println("  operasinya dikunci untuk keamanan antar-thread —");
        System.out.println("  membuatnya lebih lambat tanpa manfaat di kode biasa.");

        // ---------- Contoh nyata: memeriksa pasangan kurung ----------
        System.out.println("\n--- pemeriksa kurung ---");
        for (String uji : new String[] { "{[()]}", "{[(])}", "((" }) {
            System.out.printf("  %-8s -> %s%n", uji, seimbang(uji) ? "seimbang" : "tidak");
        }

        System.out.println("\nbalik 'asprak' : " + balik("asprak"));
    }

    static boolean seimbang(String teks) {
        Map<Character, Character> pasangan = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> tumpuk = new ArrayDeque<>();

        for (char c : teks.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                tumpuk.push(c);
            } else if (pasangan.containsKey(c)) {
                if (tumpuk.isEmpty() || tumpuk.pop() != pasangan.get(c)) return false;
            }
        }
        return tumpuk.isEmpty();
    }

    static String balik(String s) {
        Deque<Character> tumpuk = new ArrayDeque<>();
        for (char c : s.toCharArray()) tumpuk.push(c);

        StringBuilder sb = new StringBuilder();
        while (!tumpuk.isEmpty()) sb.append(tumpuk.pop());
        return sb.toString();
    }
}`,

    js: String.raw`// JavaScript tidak punya tipe stack khusus.
// Array biasa sudah cukup, dan keduanya O(1).
const tumpukan = [];

tumpukan.push(10);               // push
tumpukan.push(20);
tumpukan.push(30);

console.log("isi     :", tumpukan);
console.log("ukuran  :", tumpukan.length);
console.log("teratas :", tumpukan[tumpukan.length - 1]);   // intip
console.log("teratas :", tumpukan.at(-1), " <- cara yang lebih baru");

console.log("\nurutan keluar (LIFO):");
const salinan = [...tumpukan];
while (salinan.length > 0) process.stdout.write(salinan.pop() + " ");
console.log();

// Selalu cek kosong — JavaScript TIDAK melempar error
const kosong = [];
console.log("\npop pada array kosong :", kosong.pop(), " <- undefined, bukan error");
console.log("  (Python melempar IndexError, C# melempar exception)");
console.log("  perbaikan: if (arr.length > 0) ...");

// PENTING: push/pop di UJUNG itu O(1).
// Kalau memakai shift/unshift di DEPAN, biayanya jadi O(n) — itu queue.
console.log("\npush/pop  di ujung  -> O(1)  = stack");
console.log("shift/unshift depan -> O(n)  = jangan dipakai untuk stack");

// ---------- Contoh nyata: memeriksa pasangan kurung ----------
function seimbang(teks) {
    const pasangan = { ")": "(", "]": "[", "}": "{" };
    const tumpuk = [];

    for (const c of teks) {
        if (c === "(" || c === "[" || c === "{") {
            tumpuk.push(c);                       // kurung buka -> simpan
        } else if (c in pasangan) {
            // harus ada isinya DAN cocok dengan yang terakhir masuk
            if (tumpuk.length === 0 || tumpuk.pop() !== pasangan[c]) return false;
        }
    }
    return tumpuk.length === 0;                   // sisa berarti belum ditutup
}

console.log("\n--- pemeriksa kurung ---");
for (const uji of ["{[()]}", "{[(])}", "(("]) {
    console.log("  " + uji.padEnd(8) + "->", seimbang(uji) ? "seimbang" : "tidak");
}

// Membalik teks
function balik(s) {
    const tumpuk = [...s];
    let hasil = "";
    while (tumpuk.length > 0) hasil += tumpuk.pop();
    return hasil;
}
console.log("\nbalik 'asprak' :", balik("asprak"));

// Penerapan nyata: tombol undo
const riwayat = [];
function lakukan(aksi) { riwayat.push(aksi); console.log("  lakukan:", aksi); }
function batalkan() { console.log("  batalkan:", riwayat.pop()); }

console.log("\n--- undo memakai stack ---");
lakukan("ketik A"); lakukan("ketik B"); lakukan("hapus");
batalkan(); batalkan();`,

    c: String.raw`#include <stdio.h>
#define MAKS 5

int data[MAKS];
int top = -1;              // -1 menandakan stack kosong

int kosong(void) { return top == -1; }
int penuh(void)  { return top == MAKS - 1; }

void push(int nilai) {
    if (penuh()) {                       // penjagaan overflow
        printf("Stack penuh, %d ditolak\n", nilai);
        return;
    }
    data[++top] = nilai;                 // naikkan dulu, baru isi
    printf("push %d\n", nilai);
}

int pop(void) {
    if (kosong()) {                      // penjagaan underflow
        printf("Stack kosong!\n");
        return -1;
    }
    return data[top--];                  // ambil dulu, baru turunkan
}

int peek(void) {
    return kosong() ? -1 : data[top];    // intip tanpa mengambil
}

int main(void) {
    push(10);
    push(20);
    push(30);

    printf("teratas   : %d\n", peek());  // 30
    printf("pop -> %d\n", pop());        // 30
    printf("pop -> %d\n", pop());        // 20
    printf("teratas   : %d\n", peek());  // 10

    pop();
    pop();                               // memicu underflow
    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    s.push(10);
    s.push(20);
    s.push(30);

    cout << "ukuran  : " << s.size() << endl;   // 3
    cout << "teratas : " << s.top()  << endl;   // 30

    // PENTING: top() untuk mengambil, pop() untuk membuang.
    // pop() bertipe void, jadi  int x = s.pop();  tidak bisa dikompilasi.
    while (!s.empty()) {
        cout << "pop -> " << s.top() << endl;
        s.pop();
    }

    cout << "kosong? " << (s.empty() ? "ya" : "tidak") << endl;

    // Contoh nyata: memeriksa pasangan kurung
    string uji = "{[()]}";
    stack<char> k;
    bool seimbang = true;

    for (char c : uji) {
        if (c == '(' || c == '[' || c == '{') {
            k.push(c);                       // kurung buka -> simpan
        } else {
            if (k.empty()) { seimbang = false; break; }
            char b = k.top(); k.pop();       // harus cocok dengan yang terakhir
            if ((c == ')' && b != '(') ||
                (c == ']' && b != '[') ||
                (c == '}' && b != '{')) { seimbang = false; break; }
        }
    }
    if (!k.empty()) seimbang = false;        // masih ada yang belum ditutup

    cout << uji << " seimbang? " << (seimbang ? "ya" : "tidak") << endl;
    return 0;
}`,

    python: String.raw`# Di Python, list biasa sudah berfungsi sebagai stack.

tumpukan = []

tumpukan.append(10)          # push
tumpukan.append(20)
tumpukan.append(30)
print("isi     :", tumpukan)         # [10, 20, 30]
print("teratas :", tumpukan[-1])     # 30  (intip tanpa mengambil)

print("pop ->", tumpukan.pop())      # 30
print("pop ->", tumpukan.pop())      # 20
print("sisa    :", tumpukan)         # [10]

# Selalu cek kosong sebelum pop, kalau tidak muncul IndexError
if tumpukan:
    print("pop ->", tumpukan.pop())

print("kosong?", len(tumpukan) == 0)


# Contoh nyata: memeriksa pasangan kurung
def seimbang(teks):
    pasangan = {')': '(', ']': '[', '}': '{'}
    tumpuk = []
    for c in teks:
        if c in "([{":
            tumpuk.append(c)              # kurung buka -> simpan
        elif c in pasangan:
            # harus ada isinya DAN cocok dengan yang terakhir masuk
            if not tumpuk or tumpuk.pop() != pasangan[c]:
                return False
    return len(tumpuk) == 0               # sisa berarti ada yang belum ditutup

print(seimbang("{[()]}"))    # True
print(seimbang("{[(])}"))    # False`
  },

  output: `push 10
push 20
push 30
teratas   : 30
pop -> 30
pop -> 20
teratas   : 10
Stack kosong!`,

  kompleksitas: {
    tabel: [
      { operasi: 'push (tambah di atas)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'pop (ambil dari atas)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'peek / top (intip)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'isEmpty (cek kosong)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'cari nilai tertentu', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'total penyimpanan n data', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa push dan pop bisa O(1)?** Karena keduanya hanya menyentuh **satu titik**, yaitu ujung atas. Tidak ada elemen lain yang perlu digeser, dan tidak ada pencarian. Berapa pun banyaknya data — 10 atau 10 juta — jumlah langkahnya sama saja. Bandingkan dengan menyisipkan di **depan** array, yang memaksa semua elemen bergeser sehingga menjadi O(n).

**Kenapa mencari nilai jadi O(n)?** Karena stack sengaja tidak menyediakan akses ke tengah. Untuk memeriksa isi, mau tak mau semua elemen dibongkar satu per satu. Kalau kebutuhanmu memang sering mencari, stack **bukan** pilihan yang tepat — pakai array, hash table, atau tree.

**Soal memori:** stack berbasis array memesan tempat sebanyak \`MAKS\` sejak awal, jadi memorinya tetap tapi bisa mubazir atau malah kurang. Stack berbasis linked list tumbuh sesuai kebutuhan, tapi tiap simpul membayar tambahan memori untuk menyimpan pointer.
`
  },

  kesalahanUmum: [
    {
      salah: 'Melakukan `pop` tanpa mengecek stack kosong lebih dulu.',
      kenapa: 'Di C, `top` akan bernilai `-1` lalu turun terus, sehingga program membaca memori di luar array — hasilnya nilai sampah atau *segmentation fault*. Di Python, `list.pop()` pada list kosong melempar `IndexError`. Di C++, `s.top()` pada stack kosong adalah *undefined behavior*.',
      benar: 'Selalu jaga di awal fungsi: `if (top == -1) { ... }` di C, `if (!s.empty())` di C++, atau `if tumpukan:` di Python.'
    },
    {
      salah: 'Mencampur konvensi: `top` dimulai dari `-1` tetapi push memakai `data[top++]`.',
      kenapa: 'Push pertama akan menulis ke `data[-1]`, yaitu di luar batas array. Kompiler C **tidak** memberi peringatan, jadi program tampak jalan tapi diam-diam merusak memori di sekitarnya. Bug seperti ini muncul belakangan di tempat yang sama sekali tidak berhubungan.',
      benar: 'Konsisten sejak awal: `top = -1` dipasangkan dengan `data[++top]`, sedangkan `top = 0` dipasangkan dengan `data[top++]`. Tulis konvensi pilihanmu sebagai komentar di atas deklarasi.'
    },
    {
      salah: 'Di C++, menulis `int x = s.pop();`',
      kenapa: '`std::stack::pop()` bertipe `void` — ia membuang elemen teratas tanpa mengembalikan nilainya. Kodenya langsung gagal dikompilasi, dan pesan errornya sering membingungkan pemula.',
      benar: 'Pisahkan jadi dua langkah: `int x = s.top(); s.pop();` — ambil nilainya dulu, baru buang.'
    },
    {
      salah: 'Di Python, memakai `tumpukan.pop(0)` untuk mengambil data stack.',
      kenapa: '`pop(0)` mengambil dari **depan**, bukan dari atas. Selain berubah sifat menjadi FIFO (queue, bukan stack), semua elemen sisanya harus digeser sehingga biayanya **O(n)** — pada data besar ini terasa lambat.',
      benar: 'Gunakan `tumpukan.pop()` tanpa argumen untuk mengambil dari ujung, yang berjalan O(1). Kalau memang butuh antrean FIFO, pakai `collections.deque` dan `popleft()`.'
    },
    {
      salah: 'Lupa memeriksa `overflow` pada stack berbasis array statis.',
      kenapa: 'Saat `top` sudah mencapai `MAKS - 1`, push berikutnya menulis melewati akhir array dan menimpa memori milik variabel lain. Gejalanya khas dan menyesatkan: variabel lain berubah sendiri tanpa sebab yang terlihat.',
      benar: 'Tambahkan penjagaan `if (top == MAKS - 1) { printf("Stack penuh"); return; }` pada fungsi push. Perhatikan batasnya `MAKS - 1`, bukan `MAKS`, karena indeks array berhenti di `MAKS - 1`.'
    }
  ],

  analogi: `
Bawa **tumpukan piring** ke kelas — kalau bisa, benar-benar tumpuk buku di meja sambil menjelaskan. Efeknya jauh lebih nyata daripada gambar.

Ajukan pertanyaan pancingan: *"Kalau saya taruh buku A, lalu B, lalu C — buku mana yang bisa saya ambil?"* Mahasiswa akan langsung menjawab C. Di situ kamu tegaskan: **itulah LIFO, dan itu bukan kelemahan melainkan aturan main yang justru bikin cepat.**

Untuk menghubungkan ke materi lain, pakai contoh **tombol back browser**. Buka tiga situs berurutan, lalu tanya urutan halaman yang muncul saat back ditekan. Mahasiswa langsung paham bahwa stack itu ada di aplikasi yang mereka pakai tiap hari.

Untuk menjelaskan **stack overflow**, tulis fungsi rekursif tanpa base case lalu jalankan di depan kelas. Saat programnya berhenti dengan pesan error, tunjukkan: *"tiap pemanggilan fungsi menaruh satu piring; karena tidak ada yang mengambil, tumpukannya jatuh."* Penjelasan rekursi jadi jauh lebih mudah setelah ini.

Terakhir, tekankan bahwa **\`pop\` hanya menggeser penanda, bukan menghapus data**. Peragakan dengan mengangkat buku teratas tapi tidak membuangnya — cukup dianggap tidak berlaku. Ini menjelaskan kenapa data lama kadang masih "terlihat" saat di-debug.
`,

  latihan: [
    'Buat stack berbasis array untuk menyimpan bilangan bulat, lengkap dengan fungsi `push`, `pop`, `peek`, dan `isEmpty`. Pastikan penjagaan overflow dan underflow-nya bekerja — uji dengan sengaja melakukan pop pada stack kosong.',
    'Gunakan stack untuk membalik sebuah string. Contoh: `"asprak"` menjadi `"karpsa"`. Jelaskan kenapa stack cocok untuk tugas ini, sementara queue tidak.',
    'Buat program pemeriksa pasangan kurung untuk `()`, `[]`, dan `{}`. Uji dengan `"{[()]}"` (seimbang) dan `"{[(])}"` (tidak seimbang). Pertanyaan lanjutan: kenapa mengecek **jumlah** kurung buka dan tutup saja tidak cukup?',
    'Ubah bilangan desimal menjadi biner memakai stack: bagi terus dengan 2, push sisanya, lalu pop semuanya. Jelaskan kenapa hasilnya otomatis berurutan terbalik dengan benar.',
    'Uji pemahaman: jelaskan dalam 3 menit kenapa `push` itu O(1) tetapi mencari sebuah nilai di dalam stack itu O(n) — pakai analogi tumpukan piring, tanpa menyebut rumus apa pun.'
  ]
});

TOPICS.push({
  id: 'queue',
  judul: 'Queue (Antrean)',
  kategori: 'struktur-data',
  tag: ['queue', 'FIFO', 'enqueue', 'dequeue', 'circular queue', 'deque', 'priority queue'],
  ringkas: 'Struktur FIFO: yang pertama masuk, yang pertama keluar — beserta trik modulo pada circular queue.',

  fungsi: `**Melayani sesuatu dalam urutan kedatangan — yang pertama masuk, pertama keluar.**

Terpakai di:

- **Antrean cetak dan antrean tugas** — pekerjaan dilayani berurutan
- **Penjadwalan CPU** — algoritma FCFS dan Round Robin di Sistem Operasi
- **BFS** pada graf — mencari jarak terpendek
- **Penyangga** — data yang datang lebih cepat daripada yang bisa diproses
- **Antrean pesan** — RabbitMQ dan Kafka pada sistem besar

Jebakan yang paling sering: **membuat queue dari array dengan menghapus elemen pertama**. Itu menggeser seluruh isi setiap kali, menjadikannya \`O(n)\` padahal seharusnya \`O(1)\`.

Solusinya: **circular queue** atau **deque**.`,

  praktik: {
    tujuan: `Kamu bisa membangun queue yang benar-benar O(1), dan sudah mengukur sendiri betapa lambatnya versi yang naif.`,
    alat: [
      'Python 3 dengan `collections.deque`',
      'C++ dengan `std::queue`'
    ],
    langkah: [
      { judul: 'Buat versi naif dan ukur',
        isi: `Pakai \`list\` Python dengan \`append()\` dan \`pop(0)\`, lalu jalankan seratus ribu operasi. Ukur waktunya.

Akan terasa lambat, dan sebabnya \`pop(0)\` menggeser seluruh isi daftar setiap kali.` },
      { judul: 'Ganti dengan deque dan ukur lagi',
        isi: `\`from collections import deque\`, lalu pakai \`append()\` dan \`popleft()\`.

Ukur dengan jumlah operasi yang sama. Selisihnya akan sangat besar — dan itu karena \`deque\` dirancang cepat di **kedua ujung**.` },
      { judul: 'Bangun circular queue sendiri',
        isi: `Pakai array berukuran tetap dengan dua penunjuk: \`depan\` dan \`belakang\`, keduanya melingkar dengan operasi modulo.

Tantangannya: membedakan **penuh** dari **kosong**, karena pada keduanya kedua penunjuk bisa bertemu.

Dua cara: simpan jumlah elemennya, atau sisakan satu slot selalu kosong.` },
      { judul: 'Terapkan pada BFS',
        isi: `Buat graf kecil, lalu telusuri dengan BFS memakai queue.

Bandingkan urutan kunjungannya dengan DFS memakai stack pada graf yang sama.

Melihat keduanya berdampingan membuat perbedaan stack dan queue jauh lebih jelas daripada penjelasan apa pun.` },
      { judul: 'Kenali priority queue',
        isi: `Kalau urutannya bukan kedatangan melainkan **kepentingan**, yang kamu butuhkan priority queue.

Di Python: \`import heapq\`. Ini yang dipakai algoritma Dijkstra, dan kamu akan menemuinya lagi di Materi Pelengkap.` },
      { judul: 'Simulasikan antrean nyata',
        isi: `Buat simulasi loket: pelanggan datang tiap beberapa detik, layanan butuh waktu tertentu.

Hitung rata-rata waktu tunggu, lalu ubah jumlah loketnya dan hitung lagi.

Ini menggabungkan struktur data dengan hal yang benar-benar terpakai untuk mengambil keputusan.` }
    ],
    cek: [
      'Versi deque terbukti jauh lebih cepat daripada versi dengan pop(0)',
      'Circular queue-mu bisa membedakan penuh dari kosong dengan benar',
      'BFS dan DFS memberi urutan kunjungan yang berbeda pada graf yang sama'
    ]
  },

  konsep: `
Kalau stack punya **satu pintu**, maka **queue punya dua**: data masuk lewat satu ujung dan keluar lewat ujung yang lain. Akibatnya, yang **pertama masuk** akan menjadi yang **pertama keluar** — disingkat **FIFO** (*First In, First Out*).

Ini persis antrean kasir. Yang datang duluan dilayani duluan, dan menyerobot dari tengah tidak diperbolehkan.

Operasi bakunya empat, dan namanya berbeda dari stack:

- **enqueue** — masukkan data di **belakang** (*rear*)
- **dequeue** — ambil data dari **depan** (*front*)
- **front** atau **peek** — intip data terdepan tanpa mengambilnya
- **isEmpty** — cek apakah antreannya kosong

Karena ada dua ujung yang bergerak, queue memerlukan **dua penanda**: \`front\` dan \`rear\`. Stack cukup satu (\`top\`) karena semua kegiatannya di satu tempat. Perbedaan kecil ini melahirkan satu persoalan khas queue yang akan kita bedah nanti.

Queue dipakai di banyak tempat yang mungkin tidak kamu sadari:

- **Antrean cetak printer** — dokumen dilayani sesuai urutan pengiriman
- **Penjadwalan tugas** oleh sistem operasi
- **Buffer** pada pemutaran video, di mana data masuk dan keluar berurutan
- **BFS** (*Breadth First Search*) pada graph — inilah pemakaian yang paling penting untuk kuliahmu

Ada beberapa varian yang perlu kamu kenal:

- **Circular queue** — memperbaiki pemborosan tempat pada queue berbasis array
- **Deque** (*double-ended queue*) — bisa masuk dan keluar dari **kedua** ujung, jadi bisa berperan sebagai stack sekaligus queue
- **Priority queue** — urutannya ditentukan **prioritas**, bukan waktu kedatangan. Meski namanya queue, sifatnya sudah bukan FIFO lagi
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int data[MAKS];\nint front = 0;      // menunjuk yang terdepan\nint rear  = -1;     // menunjuk yang terbelakang\nint jumlah = 0;     // pencacah isi',
      penjelasan: `
Berbeda dari stack yang cuma butuh \`top\`, queue memerlukan **dua penanda** karena kedua ujungnya sama-sama bergerak.

- **\`front\`** menandai data yang akan diambil berikutnya
- **\`rear\`** menandai tempat data terakhir dimasukkan

Setiap **enqueue** menaikkan \`rear\`, dan setiap **dequeue** menaikkan \`front\`. Perhatikan bahwa **keduanya sama-sama bergerak maju** — tidak ada yang mundur. Inilah yang nanti menimbulkan persoalan pemborosan tempat.

Variabel \`jumlah\` sebenarnya opsional, tapi **sangat disarankan**. Tanpa itu, membedakan keadaan penuh dan kosong pada circular queue menjadi rumit — dan itulah sumber bug tersering pada materi ini.

Sama seperti stack, nilai awalnya punya beberapa konvensi. Yang dipakai di sini: \`front = 0\` dan \`rear = -1\`, sehingga enqueue pertama membuat \`rear\` menjadi 0 dan keduanya bertemu di elemen pertama. **Yang penting bukan pilihan konvensinya, melainkan konsistensinya.**
`
    },
    {
      bahasa: 'c',
      kode: '// Queue array biasa setelah beberapa operasi:\n// indeks : [0] [1] [2] [3] [4]\n// isi    :  -   -   -   30  40\n//                       ^       ^\n//                     front    rear\n// rear sudah di ujung -> dianggap PENUH,\n// padahal indeks 0,1,2 masih kosong!',
      penjelasan: `
Inilah persoalan khas queue berbasis array, dan wajib kamu pahami sebelum belajar circular queue.

Karena \`front\` dan \`rear\` **hanya bergerak maju**, setiap dequeue menyisakan **lubang kosong di depan** yang tidak pernah terpakai lagi. Lama-kelamaan \`rear\` mencapai ujung array, dan pemeriksaan sederhana \`if (rear == MAKS - 1)\` menyimpulkan antreannya penuh.

Padahal separuh arraynya menganggur. Kondisi ini kadang disebut ***false full*** — penuh yang palsu.

Ada dua cara mengatasinya:

- **Menggeser semua data ke depan** setiap kali dequeue. Berhasil, tapi biayanya **O(n)** per operasi — dan itu menghilangkan seluruh keunggulan queue yang seharusnya O(1).
- **Membuat arraynya berputar**, sehingga \`rear\` yang mentok di ujung **kembali ke indeks 0** untuk memakai lubang yang menganggur. Inilah **circular queue**, dan biayanya tetap O(1).

Pilihan kedua jelas lebih baik, dan caranya ternyata cuma butuh satu operator: modulo.
`
    },
    {
      bahasa: 'c',
      kode: 'rear = (rear + 1) % MAKS;    // inti dari circular queue\n\n// MAKS = 5, maka:\n// rear 0 -> 1 -> 2 -> 3 -> 4 -> 0 -> 1 -> ...\n//                            ^ berputar kembali',
      penjelasan: `
Satu baris ini adalah **inti seluruh circular queue**, dan layak dijelaskan pelan-pelan saat mengajar.

Operator \`%\` menghasilkan **sisa pembagian**. Karena sisa pembagian oleh \`MAKS\` selalu berada di rentang \`0\` sampai \`MAKS - 1\`, hasilnya **dijamin selalu berupa indeks yang sah**.

Runut dengan \`MAKS = 5\`:

- \`rear = 3\` → \`(3 + 1) % 5 = 4\` → maju biasa
- \`rear = 4\` → \`(4 + 1) % 5 = 0\` → **berputar kembali ke awal**

Jadi \`%\` mengubah array lurus menjadi **lingkaran**, tanpa perlu \`if\` sama sekali. Bandingkan dengan versi manualnya:

\`rear = rear + 1; if (rear == MAKS) rear = 0;\`

Keduanya sama benar, tapi bentuk modulo lebih ringkas dan tidak mungkin lupa dijaga.

Pola ini muncul di mana-mana di luar queue: menghitung hari dalam seminggu (\`% 7\`), memutar jam (\`% 12\`), dan mengambil digit terakhir (\`% 10\`). Sekali paham modulo sebagai **"pembuat putaran"**, banyak hal lain ikut terbuka.
`
    },
    {
      bahasa: 'c',
      kode: '// Masalah: front == rear bisa berarti KOSONG, bisa juga PENUH\n// Solusi 1 (dipakai di sini): simpan pencacah\nif (jumlah == 0)    -> kosong\nif (jumlah == MAKS) -> penuh\n\n// Solusi 2: sengaja sisakan satu slot kosong\nif ((rear + 1) % MAKS == front) -> penuh',
      penjelasan: `
Ini jebakan paling halus pada circular queue, dan sering luput dijelaskan di kelas.

Setelah arraynya berputar, keadaan **kosong** dan **penuh** bisa menghasilkan posisi \`front\` dan \`rear\` yang **persis sama**. Kalau kamu cuma memeriksa posisi keduanya, mustahil membedakan mana yang sedang terjadi — akibatnya program bisa menimpa data yang belum diambil, atau menolak data padahal masih ada ruang.

Dua cara mengatasinya:

**Menyimpan pencacah \`jumlah\`.** Paling gampang dipahami dan paling sering dipakai di praktikum. Naikkan saat enqueue, turunkan saat dequeue. Keadaan penuh dan kosong jadi terbaca langsung tanpa keraguan. Biayanya cuma satu variabel tambahan.

**Sengaja menyisakan satu slot kosong.** Antrean dianggap penuh ketika \`(rear + 1) % MAKS == front\`. Dengan begitu \`front == rear\` **pasti** berarti kosong. Kelemahannya, kapasitas nyatanya berkurang satu — array 5 slot hanya bisa menampung 4 data.

Untuk mengajar, **pilih cara pertama**. Lebih mudah dijelaskan, dan mahasiswa tidak perlu bingung kenapa satu slot sengaja dikorbankan.
`
    },
    {
      bahasa: 'cpp',
      kode: 'queue<int> q;\nq.push(10);              // enqueue\nint depan = q.front();   // ambil nilainya\nq.pop();                 // baru buang — pop() bertipe void',
      penjelasan: `
Jebakan yang sama persis dengan \`std::stack\`: **\`pop()\` bertipe \`void\`** dan tidak mengembalikan nilai apa pun.

Jadi \`int x = q.pop();\` **gagal saat kompilasi**. Urutannya selalu dua langkah — \`front()\` untuk mengambil nilainya, lalu \`pop()\` untuk membuangnya.

Perhatikan juga perbedaan penamaannya, yang sering tertukar saat berpindah antara stack dan queue:

- Pada **stack**, mengintip memakai \`top()\` — yang terakhir masuk
- Pada **queue**, mengintip memakai \`front()\` — yang pertama masuk

Menariknya, keduanya sama-sama memakai \`push()\` untuk memasukkan, walaupun tempat masuknya berbeda: stack menaruh di atas, queue menaruh di belakang.

Satu lagi yang perlu diketahui: \`std::queue\` sebenarnya bukan struktur data mandiri, melainkan **pembungkus** (*container adaptor*) yang di baliknya memakai \`std::deque\`. Karena itu ia sudah otomatis berperilaku seperti circular queue — kamu tidak perlu mengurus modulo sendiri.
`
    },
    {
      bahasa: 'python',
      kode: 'from collections import deque\n\nantrean = deque()\nantrean.append(10)          # enqueue, O(1)\ndepan = antrean.popleft()   # dequeue, O(1)\n\n# JANGAN pakai list biasa:\n# daftar.pop(0) itu O(n) karena semua elemen bergeser',
      penjelasan: `
Di Python, memakai \`list\` biasa sebagai queue adalah kesalahan yang sangat sering terjadi.

Masalahnya ada pada \`pop(0)\`. Karena \`list\` Python sebenarnya *dynamic array* yang datanya berdempetan, mengambil dari **depan** memaksa **seluruh elemen sisanya bergeser satu langkah ke kiri**. Biayanya jadi **O(n)** untuk setiap dequeue.

Untuk 10 data, ini tidak terasa. Untuk 100.000 data, program yang seharusnya selesai seketika bisa menggantung berdetik-detik.

**\`collections.deque\`** dirancang khusus untuk ini. Di baliknya ia memakai potongan-potongan berantai, sehingga operasi di **kedua ujung** sama-sama O(1):

- \`append()\` dan \`popleft()\` → dipakai sebagai **queue**
- \`append()\` dan \`pop()\` → dipakai sebagai **stack**
- \`appendleft()\` juga tersedia → jadi **deque** penuh

Ini kebalikan dari materi stack, di mana \`list\` biasa justru sudah cukup — karena di sana semua kegiatan terjadi di ujung belakang yang memang murah.
`
    },
    {
      bahasa: 'cpp',
      kode: 'priority_queue<int> pq;      // max-heap: yang TERBESAR keluar duluan\npq.push(30); pq.push(10); pq.push(50);\ncout << pq.top();            // 50, bukan 30\n\n// Meski namanya queue, ini BUKAN FIFO',
      penjelasan: `
**Priority queue bukan queue dalam arti FIFO.** Namanya memang mengandung kata queue, tapi urutan keluarnya ditentukan **prioritas**, bukan waktu kedatangan.

Pada contoh di atas, meski \`30\` masuk lebih dulu, yang keluar duluan adalah \`50\` karena nilainya terbesar. Secara bawaan, \`std::priority_queue\` bersifat **max-heap**.

Untuk membuatnya mengeluarkan yang **terkecil** duluan (*min-heap*), susunannya jadi agak panjang:

\`priority_queue<int, vector<int>, greater<int>> pq;\`

Di Python jauh lebih ringkas lewat modul \`heapq\`, yang bawaannya justru **min-heap**.

Yang perlu kamu tekankan ke mahasiswa: karena harus menjaga urutan prioritas, operasinya **tidak lagi O(1)** seperti queue biasa, melainkan **O(log n)**. Struktur di baliknya adalah **heap**, yang dibahas tersendiri nanti.

Contoh penerapannya yang paling mudah dicerna adalah **antrean IGD**: pasien paling gawat dilayani lebih dulu, tidak peduli siapa yang datang duluan. Contoh lain yang penting untuk kuliahmu, priority queue adalah komponen inti algoritma **Dijkstra** untuk mencari jalur terpendek.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Queue<T> bawaan C#
        Queue<int> q = new Queue<int>();

        q.Enqueue(10);                   // masuk dari belakang
        q.Enqueue(20);
        q.Enqueue(30);

        Console.WriteLine($"ukuran   : {q.Count}");
        Console.WriteLine($"terdepan : {q.Peek()}");

        // Dequeue() MENGEMBALIKAN nilainya — beda dengan C++
        Console.WriteLine("\nurutan keluar (FIFO):");
        while (q.Count > 0) Console.Write(q.Dequeue() + " ");
        Console.WriteLine("\n-> di C++, q.front() dulu baru q.pop()");

        // Tidak perlu mengurus modulo: Queue<T> tumbuh sendiri
        Console.WriteLine("\nQueue<T> mengurus sendiri putaran memorinya,");
        Console.WriteLine("jadi tidak ada urusan (rear + 1) % MAKS.");

        try {
            q.Dequeue();
        } catch (InvalidOperationException) {
            Console.WriteLine("\nDequeue pada antrean kosong -> InvalidOperationException");
        }

        // ---------- PRIORITY QUEUE (.NET 6+) ----------
        Console.WriteLine("\n--- PriorityQueue ---");
        // Bawaannya MIN-heap: prioritas terkecil keluar duluan
        var igd = new PriorityQueue<string, int>();
        igd.Enqueue("Budi  - patah tulang", 2);
        igd.Enqueue("Ani   - serangan jantung", 1);
        igd.Enqueue("Citra - demam", 5);

        while (igd.Count > 0) {
            igd.TryDequeue(out string nama, out int gawat);
            Console.WriteLine($"  gawat {gawat} -> {nama}");
        }

        // ---------- DEQUE: C# tidak punya, pakai LinkedList<T> ----------
        Console.WriteLine("\n--- deque memakai LinkedList<T> ---");
        var d = new LinkedList<int>();
        d.AddLast(20); d.AddLast(30);
        d.AddFirst(10);                              // masuk dari depan
        Console.WriteLine("  isi : " + string.Join(" ", d));
        d.RemoveFirst(); d.RemoveLast();
        Console.WriteLine("  setelah pop dua ujung : " + string.Join(" ", d));

        // ---------- Contoh nyata: simulasi antrean kasir ----------
        Console.WriteLine("\n--- antrean kasir ---");
        var kasir = new Queue<string>();
        foreach (var n in new[] { "Budi", "Ani", "Citra" }) {
            kasir.Enqueue(n);
            Console.WriteLine($"  {n} mengantre ({kasir.Count} menunggu)");
        }
        while (kasir.Count > 0)
            Console.WriteLine($"  melayani {kasir.Dequeue()}, sisa {kasir.Count}");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    public static void main(String[] args) {
        // Queue adalah interface; ArrayDeque adalah pilihan yang dianjurkan
        Queue<Integer> q = new ArrayDeque<>();

        q.offer(10);                     // offer = enqueue (add juga bisa)
        q.offer(20);
        q.offer(30);

        System.out.println("ukuran   : " + q.size());
        System.out.println("terdepan : " + q.peek());

        // poll() MENGEMBALIKAN nilainya
        System.out.print("\nurutan keluar (FIFO): ");
        while (!q.isEmpty()) System.out.print(q.poll() + " ");
        System.out.println();

        // Dua gaya method, dan bedanya penting:
        //   offer/poll/peek -> mengembalikan null kalau gagal (AMAN)
        //   add/remove/element -> melempar exception kalau gagal
        System.out.println("\npoll() pada antrean kosong   : " + q.poll() + " (null, aman)");
        try {
            q.remove();
        } catch (NoSuchElementException e) {
            System.out.println("remove() pada antrean kosong : NoSuchElementException");
        }

        // ---------- PRIORITY QUEUE ----------
        System.out.println("\n--- PriorityQueue (bawaannya MIN-heap) ---");
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : new int[] { 30, 10, 50, 20 }) pq.offer(x);
        System.out.print("  kecil dulu : ");
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");

        // MAX-heap: beri pembanding terbalik
        PriorityQueue<Integer> maks = new PriorityQueue<>(Comparator.reverseOrder());
        for (int x : new int[] { 30, 10, 50, 20 }) maks.offer(x);
        System.out.print("\n  besar dulu : ");
        while (!maks.isEmpty()) System.out.print(maks.poll() + " ");

        // Antrean IGD berdasarkan tingkat kegawatan
        System.out.println("\n\n--- antrean IGD ---");
        PriorityQueue<int[]> igd = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        igd.offer(new int[] { 2, 0 });
        igd.offer(new int[] { 1, 1 });
        igd.offer(new int[] { 5, 2 });
        String[] nama = { "Budi - patah tulang", "Ani - serangan jantung", "Citra - demam" };
        while (!igd.isEmpty()) {
            int[] p = igd.poll();
            System.out.println("  gawat " + p[0] + " -> " + nama[p[1]]);
        }

        // ---------- DEQUE: masuk-keluar dari kedua ujung ----------
        System.out.println("\n--- deque ---");
        Deque<Integer> d = new ArrayDeque<>();
        d.addLast(20); d.addLast(30);
        d.addFirst(10);
        System.out.println("  isi : " + d);
        d.pollFirst(); d.pollLast();
        System.out.println("  setelah pop dua ujung : " + d);
        System.out.println("\n  ArrayDeque bisa jadi stack SEKALIGUS queue.");
    }
}`,

    js: String.raw`// JavaScript tidak punya tipe queue khusus.
// Array bisa dipakai, TAPI ada jebakan biaya yang penting.

const antrean = [];

antrean.push(10);                // enqueue: O(1)
antrean.push(20);
antrean.push(30);

console.log("isi      :", antrean);
console.log("terdepan :", antrean[0]);

console.log("\nurutan keluar (FIFO):");
const salinan = [...antrean];
while (salinan.length > 0) process.stdout.write(salinan.shift() + " ");
console.log();

// ---------- JEBAKAN BIAYA ----------
// shift() mengambil dari DEPAN, sehingga semua elemen bergeser -> O(n).
// Persis seperti list.pop(0) di Python.
console.log("\npush()  di belakang -> O(1)");
console.log("shift() di depan    -> O(n)  <- semua elemen bergeser");

// Membuktikannya dengan pengukuran
function ukurShift(n) {
    const a = Array.from({ length: n }, function (_, i) { return i; });
    const mulai = Date.now();
    while (a.length > 0) a.shift();
    return Date.now() - mulai;
}

function ukurPointer(n) {
    const a = Array.from({ length: n }, function (_, i) { return i; });
    const mulai = Date.now();
    let depan = 0;
    while (depan < a.length) depan++;      // cuma menggeser penanda
    return Date.now() - mulai;
}

const n = 50000;
console.log("\nmengosongkan " + n.toLocaleString() + " data:");
console.log("  pakai shift()   : " + ukurShift(n) + " ms   (O(n) tiap kali)");
console.log("  pakai penanda   : " + ukurPointer(n) + " ms   (O(1) tiap kali)");

// Queue yang benar untuk data besar: pakai penanda depan
class Queue {
    constructor() {
        this.isi = [];
        this.depan = 0;           // penanda, bukan menghapus elemen
    }
    enqueue(x) { this.isi.push(x); }
    dequeue() {
        if (this.depan >= this.isi.length) return undefined;
        const nilai = this.isi[this.depan];
        this.depan++;             // O(1) — tidak ada yang bergeser
        return nilai;
    }
    get ukuran() { return this.isi.length - this.depan; }
    peek() { return this.isi[this.depan]; }
}

console.log("\n--- Queue dengan penanda (O(1)) ---");
const q = new Queue();
q.enqueue(10); q.enqueue(20); q.enqueue(30);
console.log("  terdepan :", q.peek(), ", ukuran :", q.ukuran);
console.log("  keluar   :", q.dequeue(), q.dequeue(), q.dequeue());

// ---------- Contoh nyata: antrean kasir ----------
console.log("\n--- antrean kasir ---");
const kasir = new Queue();
for (const nama of ["Budi", "Ani", "Citra"]) {
    kasir.enqueue(nama);
    console.log("  " + nama + " mengantre (" + kasir.ukuran + " menunggu)");
}
while (kasir.ukuran > 0) {
    const dilayani = kasir.dequeue();
    console.log("  melayani " + dilayani + ", sisa " + kasir.ukuran);
}

console.log("\nJavaScript tidak punya priority queue bawaan —");
console.log("harus dibuat sendiri memakai heap.");`,

    c: String.raw`#include <stdio.h>
#define MAKS 5

/* ---------- CIRCULAR QUEUE ---------- */
int data[MAKS];
int front = 0;
int rear  = -1;
int jumlah = 0;          // pencacah: membedakan penuh dan kosong

int kosong(void) { return jumlah == 0; }
int penuh(void)  { return jumlah == MAKS; }

void enqueue(int nilai) {
    if (penuh()) {
        printf("Antrean penuh, %d ditolak\n", nilai);
        return;
    }
    rear = (rear + 1) % MAKS;        // inti circular: berputar ke awal
    data[rear] = nilai;
    jumlah++;
    printf("enqueue %d  (front=%d rear=%d jumlah=%d)\n",
           nilai, front, rear, jumlah);
}

int dequeue(void) {
    if (kosong()) {
        printf("Antrean kosong!\n");
        return -1;
    }
    int nilai = data[front];
    front = (front + 1) % MAKS;      // front juga berputar
    jumlah--;
    return nilai;
}

int lihatDepan(void) {
    return kosong() ? -1 : data[front];
}

void cetak(void) {
    if (kosong()) { printf("(kosong)\n"); return; }
    printf("isi antrean : ");
    for (int i = 0; i < jumlah; i++) {
        printf("%d ", data[(front + i) % MAKS]);   // baca berputar juga
    }
    printf("\n");
}

int main(void) {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    cetak();

    printf("\nterdepan : %d\n", lihatDepan());
    printf("dequeue -> %d\n", dequeue());
    printf("dequeue -> %d\n", dequeue());
    cetak();

    /* Membuktikan sifat berputar: slot 0 dan 1 yang tadi kosong dipakai lagi */
    printf("\n-- enqueue lagi, perhatikan rear berputar --\n");
    enqueue(40);
    enqueue(50);
    enqueue(60);        // rear kembali ke indeks 0
    cetak();

    enqueue(70);        // sekarang benar-benar penuh
    printf("\n");
    cetak();

    printf("\nkosongkan semua:\n");
    while (!kosong()) printf("dequeue -> %d\n", dequeue());
    dequeue();          // memicu underflow

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <queue>
#include <deque>
#include <vector>
using namespace std;

int main() {
    /* ---------- QUEUE BIASA (FIFO) ---------- */
    queue<int> q;
    q.push(10);                 // enqueue
    q.push(20);
    q.push(30);

    cout << "ukuran   : " << q.size()  << endl;
    cout << "terdepan : " << q.front() << endl;   // 10
    cout << "terbelakang : " << q.back() << endl; // 30

    // PENTING: front() mengambil, pop() membuang. pop() bertipe void.
    cout << "\nurutan keluar (FIFO): ";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;

    /* ---------- DEQUE: bisa dua arah ---------- */
    deque<int> d = {20, 30};
    d.push_front(10);           // masuk dari depan
    d.push_back(40);            // masuk dari belakang

    cout << "\ndeque    : ";
    for (int x : d) cout << x << " ";
    cout << "\ndepan " << d.front() << ", belakang " << d.back() << endl;

    d.pop_front();
    d.pop_back();
    cout << "setelah pop kedua ujung : ";
    for (int x : d) cout << x << " ";
    cout << endl;

    /* ---------- PRIORITY QUEUE ---------- */
    // Bawaannya max-heap: yang TERBESAR keluar duluan
    priority_queue<int> pqMax;
    pqMax.push(30); pqMax.push(10); pqMax.push(50); pqMax.push(20);

    cout << "\nmax-heap (besar dulu) : ";
    while (!pqMax.empty()) { cout << pqMax.top() << " "; pqMax.pop(); }

    // min-heap: tambahkan greater<int>
    priority_queue<int, vector<int>, greater<int>> pqMin;
    pqMin.push(30); pqMin.push(10); pqMin.push(50); pqMin.push(20);

    cout << "\nmin-heap (kecil dulu) : ";
    while (!pqMin.empty()) { cout << pqMin.top() << " "; pqMin.pop(); }
    cout << endl;

    /* Contoh nyata: antrean IGD berdasarkan tingkat kegawatan */
    priority_queue<pair<int, string>> igd;
    igd.push({2, "Budi  (patah tulang)"});
    igd.push({5, "Ani   (serangan jantung)"});
    igd.push({1, "Citra (demam)"});

    cout << "\nurutan pelayanan IGD:" << endl;
    while (!igd.empty()) {
        cout << "  gawat " << igd.top().first << " -> " << igd.top().second << endl;
        igd.pop();
    }

    return 0;
}`,

    python: String.raw`from collections import deque
import heapq

# ---------- QUEUE dengan deque: O(1) di kedua ujung ----------
antrean = deque()

antrean.append(10)              # enqueue
antrean.append(20)
antrean.append(30)
print("isi antrean :", list(antrean))
print("terdepan    :", antrean[0])

print("\nurutan keluar (FIFO):", end=" ")
while antrean:
    print(antrean.popleft(), end=" ")   # dequeue, O(1)
print()

# ---------- KENAPA JANGAN PAKAI list ----------
import time

n = 50_000
daftar = list(range(n))
mulai = time.perf_counter()
while daftar:
    daftar.pop(0)               # O(n) setiap kali -> total O(n^2)
waktu_list = time.perf_counter() - mulai

dq = deque(range(n))
mulai = time.perf_counter()
while dq:
    dq.popleft()                # O(1) setiap kali -> total O(n)
waktu_deque = time.perf_counter() - mulai

print(f"\nmengosongkan {n:,} data:")
print(f"  list.pop(0)     : {waktu_list:.3f} detik")
print(f"  deque.popleft() : {waktu_deque:.3f} detik")
print(f"  deque lebih cepat sekitar {waktu_list/waktu_deque:.0f}x")

# ---------- DEQUE dua arah ----------
d = deque([20, 30])
d.appendleft(10)                # masuk dari depan
d.append(40)                    # masuk dari belakang
print("\ndeque   :", list(d))
d.popleft(); d.pop()
print("setelah pop dua ujung :", list(d))

# ---------- PRIORITY QUEUE dengan heapq (bawaannya MIN-heap) ----------
pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 50)
heapq.heappush(pq, 20)

print("\nmin-heap (kecil dulu):", end=" ")
while pq:
    print(heapq.heappop(pq), end=" ")
print()

# Untuk max-heap, simpan nilai negatifnya
pq = []
for x in [30, 10, 50, 20]:
    heapq.heappush(pq, -x)      # trik: negatifkan
print("max-heap (besar dulu):", end=" ")
while pq:
    print(-heapq.heappop(pq), end=" ")
print()

# Antrean IGD: pasangan (prioritas, nama)
igd = []
heapq.heappush(igd, (2, "Budi  (patah tulang)"))
heapq.heappush(igd, (1, "Ani   (serangan jantung)"))   # 1 = paling gawat
heapq.heappush(igd, (5, "Citra (demam)"))

print("\nurutan pelayanan IGD:")
while igd:
    gawat, nama = heapq.heappop(igd)
    print(f"  gawat {gawat} -> {nama}")`
  },

  output: `enqueue 10  (front=0 rear=0 jumlah=1)
enqueue 20  (front=0 rear=1 jumlah=2)
enqueue 30  (front=0 rear=2 jumlah=3)
isi antrean : 10 20 30

terdepan : 10
dequeue -> 10
dequeue -> 20
isi antrean : 30

-- enqueue lagi, perhatikan rear berputar --
enqueue 40  (front=2 rear=3 jumlah=2)
enqueue 50  (front=2 rear=4 jumlah=3)
enqueue 60  (front=2 rear=0 jumlah=4)
isi antrean : 30 40 50 60`,

  kompleksitas: {
    tabel: [
      { operasi: 'enqueue (circular queue)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'dequeue (circular queue)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'front / peek', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'dequeue dengan menggeser data', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'dequeue memakai list.pop(0) Python', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'cari nilai tertentu', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'priority queue — push & pop', waktu: 'O(log n)', memori: 'O(1)' },
      { operasi: 'penyimpanan n data', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa circular queue bisa O(1)?** Karena baik enqueue maupun dequeue hanya **menggeser satu penanda** — tidak ada elemen yang dipindahkan. Trik modulo membuat penanda itu berputar kembali ke awal saat mentok, sehingga tidak pernah ada penggeseran data sama sekali.

**Kenapa versi menggeser jadi O(n)?** Kalau setiap dequeue diikuti pemindahan seluruh sisa data ke depan, biayanya sebanding dengan banyaknya data. Ini menghapus seluruh keunggulan queue — dan inilah **persis yang terjadi** pada \`list.pop(0)\` di Python, meski tidak terlihat dari kodenya.

**Seberapa besar bedanya?** Mengosongkan 50.000 data dengan \`list.pop(0)\` berarti sekitar **1,25 miliar** langkah penggeseran, sedangkan \`deque.popleft()\` cukup 50.000 langkah. Contoh kode Python di atas mengukurnya langsung — perbedaannya biasanya ratusan kali lipat, dan angka itu bagus untuk kamu tunjukkan saat mengajar.

**Kenapa priority queue lebih mahal, O(log n)?** Karena ia harus **menjaga urutan prioritas** setiap kali data masuk atau keluar. Struktur di baliknya adalah heap berbentuk pohon, dan menata ulang pohon itu memerlukan langkah sebanyak tingginya, yaitu log n. Sebagai gantinya, mengambil elemen paling prioritas tetap seketika.

**Soal memori:** queue berbasis array memesan \`MAKS\` slot sejak awal — tetap tapi kaku. Queue berbasis linked list tumbuh sesuai kebutuhan, tapi tiap node membayar tambahan untuk menyimpan pointer.
`
  },

  kesalahanUmum: [
    {
      salah: 'Memakai `if (rear == MAKS - 1)` sebagai penanda penuh pada queue array biasa.',
      kenapa: 'Setelah beberapa dequeue, slot di depan menganggur tapi `rear` sudah mentok di ujung. Antrean dianggap penuh padahal separuh arraynya kosong — kondisi *false full*. Data baru ditolak tanpa alasan yang masuk akal.',
      benar: 'Gunakan circular queue: `rear = (rear + 1) % MAKS`, dan tentukan penuh berdasarkan **pencacah** `jumlah == MAKS`, bukan berdasarkan posisi `rear`.'
    },
    {
      salah: 'Membedakan penuh dan kosong hanya dari posisi: `if (front == rear)`',
      kenapa: 'Pada circular queue, keadaan kosong dan penuh bisa menghasilkan posisi `front` dan `rear` yang **sama persis**. Akibatnya program bisa menimpa data yang belum sempat diambil, atau menolak data padahal masih ada ruang.',
      benar: 'Simpan pencacah `jumlah`: kosong bila `jumlah == 0`, penuh bila `jumlah == MAKS`. Alternatifnya, sengaja sisakan satu slot dan pakai `(rear + 1) % MAKS == front` sebagai penanda penuh.'
    },
    {
      salah: 'Lupa memakai modulo saat membaca isi: `data[front + i]`',
      kenapa: 'Kalau antreannya sedang berputar — misalnya `front = 3` pada array 5 slot — maka `front + i` bisa mencapai 5, 6, dan seterusnya, yang berada **di luar array**. Isinya jadi sampah, atau program crash.',
      benar: 'Bungkus dengan modulo di **setiap** perhitungan indeks: `data[(front + i) % MAKS]`. Aturan sederhananya: kalau strukturnya circular, semua akses indeks wajib memakai `%`.'
    },
    {
      salah: 'Di Python, memakai `daftar.pop(0)` untuk dequeue.',
      kenapa: '`list` Python adalah array dinamis, sehingga mengambil dari depan memaksa **seluruh elemen bergeser** — O(n) per operasi. Untuk data besar, program yang seharusnya seketika bisa menggantung berdetik-detik, padahal kodenya terlihat wajar.',
      benar: 'Gunakan `collections.deque` dengan `popleft()` yang O(1). Ingat kebalikannya: untuk **stack**, `list` biasa justru sudah cukup karena kegiatannya di ujung belakang.'
    },
    {
      salah: 'Di C++, menulis `int x = q.pop();`',
      kenapa: '`std::queue::pop()` bertipe `void` — ia hanya membuang elemen terdepan tanpa mengembalikan nilainya. Kodenya langsung gagal dikompilasi. Jebakan ini sama persis dengan `std::stack`.',
      benar: 'Pisahkan dua langkah: `int x = q.front(); q.pop();`. Ingat bedanya dengan stack: queue memakai `front()`, stack memakai `top()`.'
    },
    {
      salah: 'Mengira priority queue tetap bersifat FIFO.',
      kenapa: 'Meski namanya mengandung kata queue, urutan keluarnya ditentukan **prioritas**, bukan waktu kedatangan. Data yang masuk belakangan bisa keluar lebih dulu bila prioritasnya lebih tinggi — dan ini sering mengejutkan mahasiswa.',
      benar: 'Pahami bahwa priority queue adalah struktur berbeda yang di baliknya memakai **heap**, dengan biaya O(log n). Kalau memang butuh urutan kedatangan murni, pakai queue biasa.'
    }
  ],

  analogi: `
Analogi bakunya jelas: **antrean kasir**. Yang datang duluan dilayani duluan, dan menyerobot tidak diperbolehkan. Hampir semua mahasiswa langsung paham FIFO dari sini.

Yang butuh peragaan justru **kenapa queue array biasa itu boros**. Lakukan begini di kelas: gambar lima kotak berjajar di papan tulis, isi tiga di antaranya, lalu layani dua pelanggan pertama dengan **menghapus isinya tanpa menggeser yang lain**. Sekarang tanya: *"masih ada dua kotak kosong di depan, tapi penanda belakang sudah mentok di ujung. Antreannya penuh atau tidak?"* Mahasiswa akan langsung melihat pemborosannya sendiri.

Setelah itu baru perkenalkan solusinya dengan analogi **komidi putar** atau **jam dinding**. Setelah angka 12, jarum tidak berhenti — ia **kembali ke angka 1**. Persis seperti \`(rear + 1) % MAKS\` yang membuat indeks berputar kembali ke 0.

Untuk memperkuat pemahaman modulo, ajukan pertanyaan cepat: *"sekarang hari Rabu, 10 hari lagi hari apa?"* Mahasiswa menghitungnya secara otomatis dengan cara berputar — dan itulah \`% 7\`. Setelah dikaitkan begini, modulo berhenti terasa sebagai rumus hafalan.

Untuk **membedakan stack dan queue**, pakai perbandingan yang mudah diingat: **tumpukan piring** versus **antrean kasir**. Lalu tanya, *"kalau tiga orang mengantre dan piring ditumpuk bertiga, siapa yang dilayani duluan pada masing-masing?"*

Untuk **priority queue**, analogi paling kuat adalah **IGD rumah sakit**. Tanya: *"kalau kamu datang duluan dengan demam, lalu ada pasien serangan jantung datang belakangan — siapa yang ditangani duluan?"* Semua akan menjawab benar, dan dari situ mereka paham bahwa prioritas bisa mengalahkan urutan kedatangan. Tutup dengan menyebut bahwa inilah yang dipakai algoritma Dijkstra untuk mencari jalur terpendek.
`,

  latihan: [
    'Buat circular queue berbasis array lengkap dengan `enqueue`, `dequeue`, `front`, `isEmpty`, dan `isFull`. Buktikan sifat berputarnya: isi penuh, ambil dua, lalu masukkan dua lagi — pastikan slot depan yang tadi kosong benar-benar terpakai.',
    'Sengaja buat queue array **tanpa** modulo, lalu lakukan enqueue dan dequeue bergantian sampai `rear` mentok. Tunjukkan kondisi *false full*-nya, lalu perbaiki dengan modulo.',
    'Buat queue berbasis **linked list** sehingga ukurannya tidak terbatas. Simpan pointer ke `front` dan `rear` agar kedua operasinya tetap O(1).',
    'Bandingkan langsung: mengosongkan 50.000 data memakai `list.pop(0)` versus `deque.popleft()` di Python. Catat selisih waktunya — angka ini berguna sebagai bahan peragaan saat mengajar.',
    'Buat simulasi antrean kasir: pelanggan masuk dengan nomor urut, lalu dilayani satu per satu. Tampilkan siapa yang sedang dilayani dan berapa yang masih menunggu.',
    'Buat priority queue sederhana untuk antrean IGD memakai pasangan (tingkat kegawatan, nama). Uji dengan memasukkan pasien tidak berurutan, lalu pastikan yang paling gawat keluar duluan.',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang kenapa circular queue butuh modulo. Mulai dengan memperagakan pemborosan pada queue biasa di kertas, baru perkenalkan `%` sebagai solusinya.'
  ]
});

TOPICS.push({
  id: 'hash-table',
  judul: 'Hash Table / Map',
  kategori: 'struktur-data',
  tag: ['hash table', 'hash map', 'dictionary', 'collision', 'chaining', 'O(1)'],
  ringkas: 'Mencari data nyaris seketika lewat perhitungan langsung — beserta cara menangani tabrakan.',

  fungsi: `**Mencari data dalam waktu hampir tetap, tidak peduli seberapa banyak datanya.**

Ini struktur data yang paling sering kamu pakai, sering tanpa menyadarinya — \`dict\` di Python, \`Map\` di JavaScript, \`HashMap\` di Java.

Terpakai di:

- **Mencari cepat** berdasarkan kunci — pengguna berdasarkan surel, produk berdasarkan kode
- **Menghitung frekuensi** — kata dalam teks, item dalam transaksi
- **Menghapus duplikat** — \`set\` dibangun dari hash table
- **Cache** — menyimpan hasil perhitungan agar tidak dihitung ulang
- **Indeks basis data** — sebagian jenis indeks memakai hashing

Yang perlu disadari: **\`O(1)\` itu rata-rata, bukan jaminan**. Kalau banyak kunci jatuh ke slot yang sama, kinerjanya merosot ke \`O(n)\`.`,

  praktik: {
    tujuan: `Kamu bisa membangun hash table dari nol dengan penanganan tabrakan, dan sudah mengukur pengaruh faktor muat terhadap kecepatannya.`,
    alat: [
      'Python 3'
    ],
    langkah: [
      { judul: 'Buat fungsi hash sederhana',
        isi: `Mulai dari yang paling sederhana: jumlahkan kode karakter kuncinya, lalu modulo ukuran tabel.

Uji sebarannya: masukkan seribu kata dan hitung berapa yang jatuh ke tiap slot.

Kamu akan melihat sebarannya **tidak merata** — itulah masalah yang harus diselesaikan fungsi hash yang baik.` },
      { judul: 'Tangani tabrakan dengan chaining',
        isi: `Tiap slot menyimpan **daftar**, bukan satu nilai.

Kalau dua kunci jatuh ke slot sama, keduanya masuk ke daftar itu dan dicari secara linear di dalamnya.

Ini cara paling sederhana dan paling sering dipakai.` },
      { judul: 'Ukur pengaruh faktor muat',
        isi: `Faktor muat adalah jumlah elemen dibagi jumlah slot.

Isi tabelmu sampai faktor muat 0,3 lalu 0,7 lalu 2,0, dan ukur waktu pencarian di masing-masing.

Pada 2,0, tiap slot rata-rata berisi dua elemen — dan kecepatannya mulai merosot.` },
      { judul: 'Tambahkan pembesaran otomatis',
        isi: `Kalau faktor muat melampaui sekitar 0,75, buat tabel baru **dua kali lebih besar** dan pindahkan semua isinya.

Perhatikan bahwa seluruh kunci harus di-hash **ulang**, karena ukuran modulonya berubah.

Operasi ini mahal, tetapi jarang — sehingga rata-ratanya tetap \`O(1)\`.` },
      { judul: 'Buktikan kasus terburuknya',
        isi: `Buat fungsi hash yang **sengaja buruk** — misalnya selalu mengembalikan nol.

Masukkan sepuluh ribu data dan ukur pencariannya. Sekarang ia \`O(n)\`, dan sangat lambat.

Ini bukan sekadar latihan: **serangan hash collision** memanfaatkan hal ini untuk melumpuhkan peladen.` },
      { judul: 'Bandingkan dengan dict bawaan',
        isi: `Ukur implementasimu terhadap \`dict\` Python pada data yang sama.

Bawaan akan jauh lebih cepat. Ia memakai **open addressing** dan fungsi hash yang sudah sangat dioptimalkan.

Ini alasan kamu memakainya di kerja nyata — yang kamu bangun tadi untuk **memahami**, bukan untuk dipakai.` }
    ],
    cek: [
      'Hash table-mu memberi hasil benar meski ada tabrakan',
      'Kecepatan pencarian merosot jelas saat faktor muat melebihi satu',
      'Fungsi hash yang sengaja buruk membuat kinerjanya turun ke O(n)'
    ]
  },

  konsep: `
Semua struktur yang sudah kamu pelajari punya kelemahan yang sama saat **mencari**: array tak terurut butuh O(n), linked list butuh O(n), dan bahkan array terurut butuh O(log n).

**Hash table** menawarkan sesuatu yang terasa mustahil: mencari data dalam **O(1) rata-rata** — waktunya hampir sama saja entah datanya seratus atau sejuta.

Idenya berani tapi sederhana: **jangan mencari, hitung saja letaknya.**

Caranya, kunci (*key*) dilewatkan ke sebuah **hash function** yang mengubahnya menjadi angka, lalu angka itu dijadikan indeks array. Untuk menyimpan maupun mengambil, langkahnya sama persis — hitung indeksnya, langsung menuju ke sana. Tidak ada penelusuran sama sekali.

Kalau array biasa memaksamu memakai indeks angka berurutan (\`nilai[0]\`, \`nilai[1]\`), hash table membebaskanmu memakai **apa saja sebagai kunci**: \`nilai["Budi"]\`, \`nilai["2024001"]\`. Karena itu strukturnya sangat cocok untuk data berpasangan **kunci → nilai**.

Tapi ada satu masalah yang tidak bisa dihindari: **collision** atau tabrakan. Dua kunci berbeda bisa saja menghasilkan indeks yang sama. Ini bukan kelemahan implementasi, melainkan keniscayaan — kunci yang mungkin ada jumlahnya tak terbatas, sedangkan slot arraynya terbatas.

Karena itu setiap hash table **wajib** punya cara menangani tabrakan. Yang paling umum adalah **chaining**: tiap slot menyimpan sebuah linked list, sehingga kunci-kunci yang bertabrakan tinggal disambung berderet di situ.

Nama strukturnya berbeda-beda di tiap bahasa, tapi gagasannya sama: **\`unordered_map\`** di C++, **\`dict\`** di Python, **\`HashMap\`** di Java. Perlu dicatat, \`map\` di C++ **bukan** hash table — ia memakai pohon seimbang dengan biaya O(log n), tapi isinya selalu terurut.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'int hash(char *kunci) {\n    int total = 0;\n    for (int i = 0; kunci[i] != 0; i++)\n        total += kunci[i];       // jumlahkan kode tiap huruf\n    return total % UKURAN;       // dipetakan ke rentang indeks\n}',
      penjelasan: `
Sebuah hash function mengerjakan dua hal berurutan.

**Pertama, mengubah kunci menjadi angka.** Pada contoh ini caranya sederhana: jumlahkan kode ASCII tiap hurufnya. Kata \`"AB"\` menjadi \`65 + 66 = 131\`.

**Kedua, memampatkannya ke rentang indeks yang tersedia** dengan \`% UKURAN\`. Ini wajib, karena hasil penjumlahan tadi bisa jauh melebihi ukuran arraynya. Sama seperti pada circular queue, modulo menjamin hasilnya **selalu indeks yang sah**.

Sifat yang harus dipenuhi sebuah hash function yang baik:

- **Deterministik** — kunci yang sama **harus selalu** menghasilkan indeks yang sama. Tanpa ini, data yang disimpan tidak akan pernah bisa ditemukan lagi.
- **Menyebar merata** — hasilnya tersebar ke seluruh slot, bukan menumpuk di beberapa tempat
- **Cepat dihitung** — kalau menghitungnya lama, keunggulan O(1) jadi tidak berarti

Fungsi contoh di atas sebenarnya **buruk** dalam hal penyebaran: \`"AB"\` dan \`"BA"\` menghasilkan angka yang sama karena penjumlahan tidak memperhatikan urutan. Hash function sungguhan mengalikan dengan bilangan prima di tiap langkah, misalnya \`total = total * 31 + kunci[i]\`, sehingga posisi huruf ikut berpengaruh.
`
    },
    {
      bahasa: 'c',
      kode: '// "AB" -> 65+66 = 131 -> 131 % 10 = 1\n// "BA" -> 66+65 = 131 -> 131 % 10 = 1   <- indeks SAMA!\n// dua kunci berbeda, satu slot -> COLLISION',
      penjelasan: `
**Collision tidak bisa dihindari, dan itu bukan tanda ada yang salah.**

Alasannya matematis: banyaknya kunci yang mungkin ada **tak terbatas** (semua kombinasi teks), sedangkan slot arraynya **terbatas**. Memaksa yang tak terbatas ke dalam yang terbatas pasti menimbulkan tumpang tindih. Prinsip ini dikenal sebagai *pigeonhole principle*.

Yang bisa dilakukan hanyalah dua hal: **memperkecil peluangnya** dengan hash function yang menyebar merata, dan **menyiapkan cara menanganinya** ketika tetap terjadi.

Ada satu kenyataan yang sering mengejutkan mahasiswa, namanya **birthday paradox**: dari 23 orang saja, peluang ada dua yang berulang tahun sama sudah melebihi 50%. Terapkan ke hash table — dengan 100 slot, tabrakan pertama biasanya sudah muncul setelah sekitar **12 data** saja. Jadi tabrakan bukan kejadian langka, melainkan hal yang **rutin terjadi**.

Karena itu pertanyaan yang tepat bukan *"bagaimana menghindari tabrakan?"* melainkan **"bagaimana menanganinya dengan rapi?"**
`
    },
    {
      bahasa: 'c',
      kode: '// CHAINING: tiap slot menyimpan linked list\n// indeks 0 -> NULL\n// indeks 1 -> ["AB":10] -> ["BA":20] -> NULL\n// indeks 2 -> ["XY":30] -> NULL',
      penjelasan: `
**Chaining** adalah cara penanganan tabrakan yang paling mudah dipahami dan paling sering dipakai di praktikum.

Gagasannya: slot array tidak menyimpan **satu** data, melainkan **pangkal sebuah linked list**. Kunci-kunci yang bertabrakan tinggal disambung berderet di rantai yang sama.

Alurnya jadi:

- **Menyimpan** — hitung indeksnya, lalu sambungkan node baru di rantai slot itu
- **Mencari** — hitung indeksnya, lalu telusuri rantainya sambil membandingkan kuncinya

Perhatikan bahwa **kunci tetap harus ikut disimpan** di dalam node. Tanpa itu, saat menelusuri rantai kamu tidak bisa membedakan mana data yang benar-benar kamu cari. Ini kesalahan yang sering terjadi saat pertama kali membuat hash table.

Di sinilah asal-usul **O(1) rata-rata** dan **O(n) terburuk**:

- Kalau penyebarannya bagus, tiap rantai cuma berisi satu atau dua data, sehingga penelusurannya nyaris tanpa biaya
- Kalau semua kunci kebetulan jatuh ke slot yang sama, seluruh data menumpuk jadi satu rantai panjang — dan hash table-nya **merosot menjadi linked list biasa**

Selain chaining, ada pendekatan lain bernama *open addressing*, yang mencari slot kosong berikutnya alih-alih membuat rantai. Lebih hemat memori, tapi penghapusan datanya jadi jauh lebih rumit.
`
    },
    {
      bahasa: 'c',
      kode: '// load factor = jumlah data / jumlah slot\n// 7 data pada 10 slot -> 0.7\n// Kalau melebihi ~0.75, tabel diperbesar lalu SEMUA data\n// dihitung ulang indeksnya (rehashing)',
      penjelasan: `
**Load factor** adalah ukuran seberapa padat hash table-mu terisi. Angka inilah yang menentukan apakah ia masih cepat atau mulai melambat.

Semakin padat, semakin sering terjadi tabrakan, dan semakin panjang rantai yang harus ditelusuri. Karena itu hash table sungguhan **memperbesar dirinya sendiri** begitu load factor melewati ambang tertentu — biasanya sekitar 0,75.

Yang penting dipahami: saat diperbesar, **seluruh data harus dihitung ulang indeksnya**. Ini disebut **rehashing**, dan wajib dilakukan karena indeks bergantung pada \`% UKURAN\` — begitu ukurannya berubah, semua hasil perhitungan lama menjadi tidak berlaku.

Rehashing memakan biaya **O(n)**, terdengar mahal. Tapi karena kejadiannya jarang — ukurannya digandakan tiap kali — biaya itu tersebar ke banyak operasi, sehingga rata-ratanya tetap **O(1)**. Cara berhitung seperti ini disebut *amortized*, sama seperti pada \`vector\` dan \`list\` Python.

Satu catatan praktis: ukuran tabel sebaiknya **bilangan prima**. Kalau ukurannya kelipatan angka bulat seperti 10 atau 16, pola data tertentu cenderung menumpuk di slot yang sama, membuat penyebarannya buruk.
`
    },
    {
      bahasa: 'python',
      kode: "nilai = {'Budi': 80, 'Ani': 90}\nprint(nilai['Budi'])         # O(1), langsung\n\nnilai[[1,2]] = 5             # TypeError: unhashable type: 'list'",
      penjelasan: `
Di Python, hash table adalah tipe bawaan bernama **\`dict\`**, dan cara pakainya sangat ringkas.

Tapi ada satu aturan yang sering membingungkan: **kunci \`dict\` wajib bersifat *immutable*.** Teks, angka, dan tuple boleh; list dan dict tidak boleh, dan mencobanya menghasilkan \`TypeError: unhashable type\`.

Alasannya masuk akal begitu kamu memahami cara kerjanya. Indeks penyimpanan **dihitung dari isi kuncinya**. Kalau kunci itu bisa berubah setelah disimpan, indeksnya jadi tidak cocok lagi — datanya masih ada di dalam tabel, tapi **tidak akan pernah ditemukan** karena perhitungan barunya mengarah ke slot yang berbeda.

Dengan mewajibkan kunci yang tak bisa berubah, Python menjamin indeksnya selalu konsisten sepanjang umur data.

Beberapa hal praktis yang perlu kamu kuasai untuk mengajar:

- **\`nilai.get('Xyz', 0)\`** mengembalikan nilai cadangan bila kunci tidak ada, sehingga tidak melempar \`KeyError\`
- **\`'Budi' in nilai\`** memeriksa keberadaan kunci dalam **O(1)** — jauh lebih cepat daripada \`in\` pada list yang O(n)
- Sejak Python 3.7, \`dict\` **mempertahankan urutan penyisipan**, meski secara konsep hash table tidak punya urutan
`
    },
    {
      bahasa: 'cpp',
      kode: 'map<string,int> m;            // pohon seimbang: O(log n), TERURUT\nunordered_map<string,int> um; // hash table: O(1) rata-rata, ACAK',
      penjelasan: `
Perbedaan ini sering tertukar, padahal keduanya struktur yang benar-benar berbeda.

**\`map\` bukan hash table.** Di baliknya ia memakai pohon pencarian seimbang (biasanya *red-black tree*). Konsekuensinya:

- Semua operasinya **O(log n)** — sedikit lebih lambat
- Isinya **selalu terurut berdasarkan kunci**, sehingga menelusurinya menghasilkan urutan yang rapi

**\`unordered_map\` barulah hash table** yang sesungguhnya:

- Operasinya **O(1) rata-rata** — lebih cepat
- Urutannya **tidak bisa ditebak**, dan bisa berubah saat tabel diperbesar

Cara memilihnya sederhana: **butuh urutan, pakai \`map\`; butuh kecepatan, pakai \`unordered_map\`.** Kalau tidak butuh keduanya secara khusus, \`unordered_map\` biasanya pilihan yang tepat.

Satu jebakan yang perlu diwaspadai: **\`m["kunci"]\` otomatis membuat entri baru** bernilai nol bila kuncinya belum ada. Jadi sekadar membaca dengan \`[]\` bisa diam-diam menambah data. Untuk memeriksa keberadaan tanpa efek samping, pakai \`m.count("kunci")\` atau \`m.find("kunci") != m.end()\`.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Dictionary<K,V> = hash table, O(1) rata-rata
        var nilai = new Dictionary<string, int> {
            ["Budi"]  = 80,
            ["Ani"]   = 90,
            ["Citra"] = 75
        };

        Console.WriteLine($"nilai Budi : {nilai["Budi"]}");
        Console.WriteLine($"jumlah     : {nilai.Count}");

        // Memeriksa keberadaan TANPA melempar exception
        if (nilai.ContainsKey("Ani")) Console.WriteLine($"Ani ada : {nilai["Ani"]}");

        // TryGetValue: cara yang paling dianjurkan
        if (nilai.TryGetValue("Zaki", out int n)) Console.WriteLine(n);
        else Console.WriteLine("Zaki tidak ada");

        // BEDA PENTING dengan C++: [] pada kunci yang belum ada
        // saat MEMBACA justru melempar exception, bukan membuat entri baru
        try {
            Console.WriteLine(nilai["Zaki"]);
        } catch (KeyNotFoundException) {
            Console.WriteLine("\nnilai[\"Zaki\"] -> KeyNotFoundException");
            Console.WriteLine("  (di C++, unordered_map justru membuat entri baru)");
        }

        // Menelusuri: urutannya TIDAK dijamin
        Console.WriteLine("\nisi Dictionary (urutan tidak dijamin):");
        foreach (var p in nilai) Console.WriteLine($"  {p.Key} = {p.Value}");

        // ---------- Menghitung frekuensi kata ----------
        string[] kalimat = { "apel", "jeruk", "apel", "mangga", "jeruk", "apel" };
        var hitung = new Dictionary<string, int>();
        foreach (string k in kalimat) {
            hitung[k] = hitung.GetValueOrDefault(k, 0) + 1;
        }
        Console.WriteLine("\nfrekuensi kata:");
        foreach (var p in hitung) Console.WriteLine($"  {p.Key,-8}: {p.Value}");

        // ---------- SortedDictionary: pohon seimbang, O(log n), TERURUT ----------
        Console.WriteLine("\n--- Dictionary vs SortedDictionary ---");
        var terurut = new SortedDictionary<string, int>(nilai);
        Console.WriteLine("  SortedDictionary (selalu terurut):");
        foreach (var p in terurut) Console.WriteLine($"    {p.Key} = {p.Value}");

        Console.WriteLine("\n  Dictionary       -> hash, O(1) rata-rata, acak");
        Console.WriteLine("  SortedDictionary -> pohon, O(log n), terurut");
        Console.WriteLine("  (sejajar dengan unordered_map dan map di C++)");

        // HashSet: hanya kunci, tanpa nilai
        var unik = new HashSet<int> { 1, 2, 2, 3, 3, 3 };
        Console.WriteLine($"\nHashSet membuang kembar : {string.Join(",", unik)}");
        Console.WriteLine($"  Contains(2) : {unik.Contains(2)}  (O(1))");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    public static void main(String[] args) {
        // HashMap = hash table, O(1) rata-rata
        Map<String, Integer> nilai = new HashMap<>();
        nilai.put("Budi", 80);
        nilai.put("Ani", 90);
        nilai.put("Citra", 75);

        System.out.println("nilai Budi : " + nilai.get("Budi"));
        System.out.println("jumlah     : " + nilai.size());

        // get() pada kunci yang tidak ada mengembalikan null — TIDAK error
        System.out.println("nilai Zaki : " + nilai.get("Zaki") + "  <- null");
        System.out.println("getOrDefault : " + nilai.getOrDefault("Zaki", 0));

        // JEBAKAN: null yang tidak diperiksa menyebabkan NullPointerException
        try {
            int n = nilai.get("Zaki");        // unboxing dari null
            System.out.println(n);
        } catch (NullPointerException e) {
            System.out.println("\nint n = nilai.get(\"Zaki\") -> NullPointerException");
            System.out.println("  penyebabnya: null tidak bisa diubah jadi int");
            System.out.println("  perbaikan: pakai getOrDefault atau containsKey");
        }

        System.out.println("\ncontainsKey('Ani') : " + nilai.containsKey("Ani"));

        // ---------- Menghitung frekuensi kata ----------
        String[] kalimat = { "apel", "jeruk", "apel", "mangga", "jeruk", "apel" };
        Map<String, Integer> hitung = new HashMap<>();
        for (String k : kalimat) {
            hitung.merge(k, 1, Integer::sum);      // cara ringkas Java
        }
        System.out.println("\nfrekuensi kata:");
        hitung.forEach((k, v) -> System.out.printf("  %-8s: %d%n", k, v));

        // ---------- TIGA macam Map, dan bedanya penting ----------
        System.out.println("\n--- tiga macam Map ---");

        Map<String, Integer> hash = new HashMap<>(nilai);
        System.out.println("  HashMap       (acak)   : " + hash.keySet());

        Map<String, Integer> urutMasuk = new LinkedHashMap<>();
        urutMasuk.put("Budi", 80); urutMasuk.put("Ani", 90); urutMasuk.put("Citra", 75);
        System.out.println("  LinkedHashMap (urut masuk): " + urutMasuk.keySet());

        Map<String, Integer> urutKunci = new TreeMap<>(nilai);
        System.out.println("  TreeMap       (urut kunci): " + urutKunci.keySet());

        System.out.println("\n  HashMap -> O(1) rata-rata, urutan tidak dijamin");
        System.out.println("  TreeMap -> O(log n), selalu terurut (pohon merah-hitam)");

        // HashSet
        Set<Integer> unik = new HashSet<>(List.of(1, 2, 2, 3, 3, 3));
        System.out.println("\nHashSet membuang kembar : " + unik);

        // Kunci wajib punya hashCode & equals yang benar
        System.out.println("\nCATATAN: kalau memakai class sendiri sebagai kunci,");
        System.out.println("WAJIB override hashCode() dan equals().");
        System.out.println("Kalau tidak, dua object berisi sama dianggap berbeda.");
    }
}`,

    js: String.raw`// JavaScript punya DUA pilihan: object biasa dan Map.

// ---------- 1. Object biasa ----------
const nilai = { Budi: 80, Ani: 90, Citra: 75 };

console.log("nilai Budi :", nilai.Budi);
console.log("nilai Budi :", nilai["Budi"]);       // dua cara, sama saja
console.log("jumlah     :", Object.keys(nilai).length);

// Kunci yang tidak ada -> undefined, TIDAK error
console.log("nilai Zaki :", nilai.Zaki, " <- undefined");
console.log("'Budi' in nilai ?", "Budi" in nilai);

// KETERBATASAN: kunci object SELALU diubah jadi teks
const aneh = {};
aneh[1] = "angka satu";
aneh["1"] = "teks satu";                          // menimpa yang di atas!
console.log("\nkunci 1 dan '1' :", aneh, " <- jadi satu");

// ---------- 2. Map: lebih tepat sebagai hash table ----------
const peta = new Map();
peta.set("Budi", 80);
peta.set("Ani", 90);
peta.set(1, "angka satu");
peta.set("1", "teks satu");                       // TIDAK menimpa

console.log("\nMap membedakan 1 dan '1':");
console.log("  peta.get(1)   :", peta.get(1));
console.log("  peta.get('1') :", peta.get("1"));

console.log("\nukuran   :", peta.size);           // size, bukan length
console.log("has('Ani'):", peta.has("Ani"));
console.log("get('Zaki'):", peta.get("Zaki"), " <- undefined");

// Map mempertahankan urutan penyisipan
console.log("\nisi Map (urut penyisipan):");
for (const [k, v] of peta) console.log("  " + k + " = " + v);

// ---------- Menghitung frekuensi kata ----------
const kalimat = ["apel", "jeruk", "apel", "mangga", "jeruk", "apel"];

const hitung = new Map();
for (const k of kalimat) {
    hitung.set(k, (hitung.get(k) || 0) + 1);
}
console.log("\nfrekuensi kata:");
for (const [k, v] of hitung) console.log("  " + k.padEnd(8) + ": " + v);

// ---------- Set: hanya kunci, tanpa nilai ----------
const unik = new Set([1, 2, 2, 3, 3, 3]);
console.log("\nSet membuang kembar :", [...unik]);
console.log("  has(2) :", unik.has(2), " (O(1))");

// Membuktikan O(1) vs O(n)
const n = 200000;
const daftar = Array.from({ length: n }, function (_, i) { return i; });
const himpunan = new Set(daftar);
const cari = n - 1;

let mulai = Date.now();
for (let i = 0; i < 100; i++) daftar.includes(cari);      // O(n)
const waktuArray = Date.now() - mulai;

mulai = Date.now();
for (let i = 0; i < 100; i++) himpunan.has(cari);         // O(1)
const waktuSet = Date.now() - mulai;

console.log("\n100x pencarian pada " + n.toLocaleString() + " data:");
console.log("  array.includes (O(n)) : " + waktuArray + " ms");
console.log("  set.has        (O(1)) : " + waktuSet + " ms");

console.log("\nKapan pakai Map, kapan object?");
console.log("  object -> data tetap dengan kunci teks yang sudah diketahui");
console.log("  Map    -> kunci dinamis, kunci bukan teks, atau butuh .size");`,

    c: String.raw`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define UKURAN 10

/* Tiap slot menyimpan pangkal linked list (chaining) */
typedef struct Node {
    char kunci[50];
    int  nilai;
    struct Node *next;
} Node;

Node *tabel[UKURAN] = {NULL};      // semua slot mulai kosong

/* Hash function: jumlahkan kode huruf, lalu mampatkan dengan modulo */
int hash(const char *kunci) {
    int total = 0;
    for (int i = 0; kunci[i] != 0; i++) {
        total = total * 31 + kunci[i];    // dikali 31 supaya urutan berpengaruh
        total = total % UKURAN;           // jaga supaya tidak overflow
    }
    return abs(total) % UKURAN;
}

void simpan(const char *kunci, int nilai) {
    int idx = hash(kunci);

    /* Kalau kuncinya sudah ada, perbarui nilainya */
    for (Node *p = tabel[idx]; p != NULL; p = p->next) {
        if (strcmp(p->kunci, kunci) == 0) {
            p->nilai = nilai;
            return;
        }
    }

    /* Belum ada -> sambungkan di depan rantai, O(1) */
    Node *baru = (Node *)malloc(sizeof(Node));
    strcpy(baru->kunci, kunci);
    baru->nilai = nilai;
    baru->next  = tabel[idx];      // sambungkan dulu
    tabel[idx]  = baru;            // baru pindahkan pangkalnya
    printf("simpan %-6s -> slot %d\n", kunci, idx);
}

int ambil(const char *kunci, int *ketemu) {
    int idx = hash(kunci);
    /* Kunci WAJIB dibandingkan, karena satu slot bisa berisi banyak data */
    for (Node *p = tabel[idx]; p != NULL; p = p->next) {
        if (strcmp(p->kunci, kunci) == 0) {
            *ketemu = 1;
            return p->nilai;
        }
    }
    *ketemu = 0;
    return -1;
}

void hapus(const char *kunci) {
    int idx = hash(kunci);
    Node *p = tabel[idx], *sblm = NULL;

    while (p != NULL && strcmp(p->kunci, kunci) != 0) {
        sblm = p;
        p = p->next;
    }
    if (p == NULL) { printf("%s tidak ada\n", kunci); return; }

    if (sblm == NULL) tabel[idx] = p->next;   // node pertama di rantai
    else              sblm->next = p->next;   // lompati
    free(p);
    printf("hapus %s\n", kunci);
}

void cetakTabel(void) {
    printf("\n--- ISI TABEL ---\n");
    int terisi = 0, total = 0;
    for (int i = 0; i < UKURAN; i++) {
        printf("slot %d : ", i);
        if (tabel[i] == NULL) { printf("-\n"); continue; }
        terisi++;
        for (Node *p = tabel[i]; p != NULL; p = p->next) {
            printf("[%s=%d] -> ", p->kunci, p->nilai);
            total++;
        }
        printf("NULL\n");
    }
    printf("slot terpakai: %d/%d, total data: %d, load factor: %.2f\n",
           terisi, UKURAN, total, (float)total / UKURAN);
}

int main(void) {
    simpan("Budi",  80);
    simpan("Ani",   90);
    simpan("Citra", 75);
    simpan("Dedi",  85);
    simpan("Eka",   95);

    cetakTabel();

    int ada;
    printf("\nnilai Budi : %d\n", ambil("Budi", &ada));
    printf("nilai Ani  : %d\n", ambil("Ani", &ada));

    int hasil = ambil("Zaki", &ada);
    printf("nilai Zaki : %s\n", ada ? "ada" : "tidak ada");

    simpan("Budi", 100);            // memperbarui, bukan menambah
    printf("\nsetelah diperbarui, Budi : %d\n", ambil("Budi", &ada));

    hapus("Ani");
    cetakTabel();

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <unordered_map>
#include <map>
#include <string>
using namespace std;

int main() {
    /* ---------- unordered_map: HASH TABLE, O(1) rata-rata ---------- */
    unordered_map<string, int> nilai;

    nilai["Budi"]  = 80;
    nilai["Ani"]   = 90;
    nilai["Citra"] = 75;

    cout << "nilai Budi : " << nilai["Budi"] << endl;
    cout << "jumlah data: " << nilai.size() << endl;

    // Memeriksa keberadaan TANPA membuat entri baru
    if (nilai.count("Ani")) cout << "Ani ada, nilainya " << nilai["Ani"] << endl;
    if (!nilai.count("Zaki")) cout << "Zaki tidak ada" << endl;

    // JEBAKAN: [] otomatis membuat entri baru bernilai 0
    cout << "\nsebelum : " << nilai.size() << " data" << endl;
    int x = nilai["Fajar"];              // diam-diam menambah Fajar = 0
    cout << "setelah baca nilai[\"Fajar\"] : " << nilai.size() << " data" << endl;
    cout << "-> pakai .count() atau .find() untuk sekadar memeriksa" << endl;

    // Menelusuri: urutannya TIDAK bisa ditebak
    cout << "\nisi unordered_map (urutan acak):" << endl;
    for (const auto &p : nilai)
        cout << "  " << p.first << " = " << p.second << endl;

    /* ---------- map: POHON SEIMBANG, O(log n), TERURUT ---------- */
    map<string, int> m;
    m["Budi"] = 80; m["Ani"] = 90; m["Citra"] = 75;

    cout << "\nisi map (selalu terurut menurut kunci):" << endl;
    for (const auto &p : m)
        cout << "  " << p.first << " = " << p.second << endl;

    /* Penerapan nyata: menghitung frekuensi kata */
    string kalimat[] = {"apel","jeruk","apel","mangga","jeruk","apel"};
    unordered_map<string, int> hitung;
    for (const string &k : kalimat) hitung[k]++;    // di sini [] justru berguna

    cout << "\nfrekuensi kata:" << endl;
    for (const auto &p : hitung)
        cout << "  " << p.first << " : " << p.second << endl;

    cout << "\nRingkasan:" << endl;
    cout << "  map           -> O(log n), terurut" << endl;
    cout << "  unordered_map -> O(1) rata-rata, acak" << endl;

    return 0;
}`,

    python: String.raw`# dict = hash table bawaan Python
nilai = {"Budi": 80, "Ani": 90, "Citra": 75}

print("nilai Budi :", nilai["Budi"])        # O(1)
print("jumlah     :", len(nilai))

# get() menyediakan nilai cadangan, jadi tidak melempar KeyError
print("nilai Zaki :", nilai.get("Zaki", 0))

# Memeriksa keberadaan kunci: O(1), jauh lebih cepat daripada list
print("\n'Budi' ada?", "Budi" in nilai)

# Menambah dan menghapus
nilai["Dedi"] = 85
del nilai["Ani"]
print("setelah diubah :", nilai)

# Menelusuri
print("\nisi dict:")
for kunci, isi in nilai.items():
    print(f"  {kunci:<7} = {isi}")

# ---------- KENAPA KUNCI HARUS IMMUTABLE ----------
print("\nkunci yang boleh : str, int, float, tuple  (tidak bisa berubah)")
print("kunci yang tidak : list, dict, set          (bisa berubah)")
try:
    salah = {[1, 2]: "nilai"}
except TypeError as e:
    print("  ->", e)

sah = {(1, 2): "boleh, karena tuple immutable"}
print("  tuple sebagai kunci :", sah)

# ---------- MENGHITUNG FREKUENSI: penerapan paling sering ----------
kalimat = "apel jeruk apel mangga jeruk apel".split()

frekuensi = {}
for kata in kalimat:
    frekuensi[kata] = frekuensi.get(kata, 0) + 1
print("\nfrekuensi :", frekuensi)

from collections import Counter
print("pakai Counter :", dict(Counter(kalimat)))

# ---------- MEMBUKTIKAN O(1) VS O(n) ----------
import time

n = 200_000
data_list = list(range(n))
data_set  = set(range(n))       # set juga memakai hash table

cari = n - 1                    # sengaja elemen terakhir, kasus terburuk list

mulai = time.perf_counter()
for _ in range(100):
    cari in data_list           # O(n) setiap kali
waktu_list = time.perf_counter() - mulai

mulai = time.perf_counter()
for _ in range(100):
    cari in data_set            # O(1) setiap kali
waktu_set = time.perf_counter() - mulai

print(f"\n100x pencarian pada {n:,} data:")
print(f"  list (O(n)) : {waktu_list:.4f} detik")
print(f"  set  (O(1)) : {waktu_set:.4f} detik")
print(f"  set lebih cepat sekitar {waktu_list/waktu_set:.0f}x")

# ---------- MELIHAT HASH SUNGGUHAN ----------
print("\nhash('Budi') % 10 =", hash("Budi") % 10)
print("(nilai hash str berubah tiap program dijalankan, demi keamanan)")`
  },

  output: `simpan Budi   -> slot 3
simpan Ani    -> slot 8
simpan Citra  -> slot 1
simpan Dedi   -> slot 3
simpan Eka    -> slot 6

--- ISI TABEL ---
slot 0 : -
slot 1 : [Citra=75] -> NULL
slot 2 : -
slot 3 : [Dedi=85] -> [Budi=80] -> NULL
slot 4 : -
slot 5 : -
slot 6 : [Eka=95] -> NULL
slot 7 : -
slot 8 : [Ani=90] -> NULL
slot 9 : -
slot terpakai: 4/10, total data: 5, load factor: 0.50

nilai Budi : 80
nilai Ani  : 90
nilai Zaki : tidak ada`,

  kompleksitas: {
    tabel: [
      { operasi: 'simpan / ubah — rata-rata', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'cari berdasarkan kunci — rata-rata', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'hapus — rata-rata', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'semua operasi — terburuk', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'rehashing saat diperbesar', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'cari berdasarkan NILAI', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'menelusuri seluruh isi', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'map C++ (pohon seimbang)', waktu: 'O(log n)', memori: 'O(n)' },
      { operasi: 'penyimpanan n data', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa bisa O(1)?** Karena letak data **dihitung, bukan dicari**. Hash function langsung memberi tahu slot mana yang harus dituju, dan jumlah langkahnya sama saja entah datanya 10 atau 10 juta. Inilah satu-satunya struktur dasar yang pencariannya tidak melambat saat data bertambah.

**Kenapa disebut "rata-rata", bukan pasti?** Karena tabrakan tetap terjadi. Kalau penyebarannya bagus, tiap slot cuma berisi satu-dua data sehingga penelusuran rantainya nyaris tanpa biaya. Tapi kalau **semua kunci kebetulan jatuh ke slot yang sama**, seluruh data menumpuk jadi satu rantai panjang dan hash table **merosot menjadi linked list** — di situlah muncul O(n) terburuk. Dalam praktik, ini nyaris tidak terjadi dengan hash function yang layak.

**Kenapa mencari berdasarkan nilai tetap O(n)?** Karena yang di-hash cuma **kuncinya**. Untuk pertanyaan *"siapa yang nilainya 90?"*, tidak ada jalan pintas — semua data harus diperiksa. Hash table hanya cepat untuk satu arah: kunci menuju nilai.

**Kenapa rehashing yang O(n) tidak merusak keunggulannya?** Karena kejadiannya jarang — ukurannya digandakan tiap kali penuh, sehingga jaraknya makin lama makin jauh. Biaya besar yang sesekali itu tersebar ke banyak operasi murah, dan rata-ratanya tetap O(1). Cara berhitung seperti ini disebut *amortized*.

**Harga yang dibayar:** hash table **memboroskan memori**. Agar tabrakan jarang terjadi, sebagian slot memang sengaja dibiarkan kosong — biasanya sekitar 25%. Ini pertukaran klasik dalam ilmu komputer: **memori ditukar dengan kecepatan.**
`
  },

  kesalahanUmum: [
    {
      salah: 'Tidak menyimpan kunci di dalam node, hanya nilainya saja.',
      kenapa: 'Karena satu slot bisa berisi beberapa data akibat tabrakan, saat menelusuri rantai kamu tidak punya cara membedakan mana data yang benar-benar dicari. Hasilnya, pencarian bisa mengembalikan **nilai milik kunci lain** — dan tidak ada error apa pun yang muncul.',
      benar: 'Selalu simpan pasangan **kunci dan nilai** di setiap node, lalu bandingkan kuncinya dengan `strcmp` saat menelusuri rantai.'
    },
    {
      salah: 'Memakai hash function yang penyebarannya buruk, misalnya `panjang_kunci % UKURAN`.',
      kenapa: 'Semua kunci yang panjangnya sama akan jatuh ke slot yang sama. Nama-nama berhuruf 4 semuanya menumpuk di satu rantai, sehingga hash table **merosot menjadi linked list** dan pencariannya kembali O(n).',
      benar: 'Gunakan seluruh isi kunci dan libatkan posisinya, misalnya `total = total * 31 + kunci[i]`. Pilih ukuran tabel berupa **bilangan prima** agar penyebarannya lebih merata.'
    },
    {
      salah: 'Di C++, memakai `m["kunci"]` hanya untuk memeriksa keberadaan data.',
      kenapa: 'Operator `[]` **otomatis membuat entri baru** bernilai nol bila kuncinya belum ada. Jadi sekadar membaca justru diam-diam menambah data, dan `m.size()` bertambah tanpa disadari.',
      benar: 'Pakai `m.count("kunci")` atau `m.find("kunci") != m.end()` untuk memeriksa. Gunakan `[]` hanya saat memang berniat menyimpan — misalnya pada `hitung[kata]++` yang justru memanfaatkan sifat ini.'
    },
    {
      salah: 'Di Python, memakai list sebagai kunci dict: `d[[1,2]] = 5`',
      kenapa: 'Indeks penyimpanan dihitung dari isi kuncinya. Kalau kunci bisa berubah setelah disimpan, indeksnya jadi tidak cocok lagi sehingga datanya **tidak akan pernah ditemukan**. Python mencegahnya sejak awal dengan `TypeError: unhashable type`.',
      benar: 'Gunakan kunci yang *immutable*: `str`, `int`, `float`, atau `tuple`. Untuk kunci majemuk, pakai tuple seperti `d[(1, 2)] = 5`.'
    },
    {
      salah: 'Mengandalkan urutan data di dalam hash table.',
      kenapa: 'Letak data ditentukan hasil perhitungan hash, bukan urutan penyisipan. Urutan penelusurannya bisa berbeda antar program, bahkan berubah sendiri setelah tabel diperbesar. Mengandalkannya menghasilkan bug yang muncul dan hilang tanpa pola.',
      benar: 'Kalau butuh urutan, pakai `map` di C++ yang selalu terurut menurut kunci. Di Python, `dict` memang mempertahankan urutan penyisipan sejak versi 3.7, tapi **tetap tidak terurut menurut kunci** — untuk itu pakai `sorted(d.items())`.'
    },
    {
      salah: 'Mengira hash table selalu lebih cepat daripada array untuk semua keperluan.',
      kenapa: 'Menghitung hash sendiri memakan waktu, dan datanya tersebar di memori sehingga tidak ramah cache prosesor. Untuk data kecil — di bawah sekitar 20 elemen — pencarian linear pada array sering **lebih cepat** meski secara teori O(n).',
      benar: 'Pakai hash table saat datanya banyak **dan** pencariannya sering. Untuk data kecil atau yang cuma ditelusuri seluruhnya, array biasa lebih sederhana sekaligus lebih cepat.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **rak loker berlabel huruf** di kolam renang atau perpustakaan.

Kalau lokernya cuma bernomor acak, mencari barangmu berarti membuka satu per satu — itu O(n). Tapi kalau ada aturan *"simpan di loker sesuai huruf pertama namamu"*, kamu **langsung tahu** harus ke loker mana. Aturan itulah **hash function**, dan kamu tidak mencari — kamu **menghitung**.

Dari analogi ini, **collision** muncul dengan sendirinya. Tanya ke kelas: *"kalau Budi dan Bayu sama-sama huruf B, bagaimana?"* Mahasiswa akan menjawab sendiri — keduanya masuk loker yang sama, lalu isinya ditumpuk. **Itulah chaining.** Dan mencarinya berarti membuka loker B lalu memeriksa isinya satu per satu.

Pertanyaan lanjutan yang membuka pemahaman: *"kalau seluruh kelas namanya berawalan B, apa yang terjadi?"* Semua menumpuk di satu loker, dan kamu kembali memeriksa satu per satu — **hash table-nya merosot jadi linked list**, O(n). Dari situ mahasiswa paham kenapa **penyebaran yang merata** itu penting, dan kenapa "huruf pertama" adalah hash function yang buruk.

Untuk **birthday paradox**, lakukan langsung di kelas: tanya tanggal lahir mahasiswa satu per satu. Di kelas berisi 30 orang, hampir pasti ada yang tanggalnya sama — dan biasanya lebih cepat dari dugaan semua orang. Setelah itu tegaskan: **tabrakan bukan kejadian langka, tapi hal yang rutin.**

Untuk menegaskan **beda dengan array biasa**, pakai perbandingan singkat: array memaksamu memakai nomor urut (\`nilai[0]\`, \`nilai[1]\`), sedangkan hash table membebaskanmu memakai **nama** (\`nilai["Budi"]\`). Itulah sebabnya struktur ini disebut *dictionary* di Python — kamu mencari arti berdasarkan **katanya**, bukan berdasarkan halaman ke berapa.
`,

  latihan: [
    'Buat hash table sederhana dengan chaining untuk menyimpan pasangan nama dan nilai. Sediakan fungsi simpan, ambil, hapus, dan cetak seluruh tabel beserta load factor-nya.',
    'Sengaja pakai hash function yang buruk, misalnya `strlen(kunci) % UKURAN`. Masukkan sepuluh nama yang panjangnya sama, lalu cetak tabelnya. Jelaskan kenapa hasilnya menjadi linked list.',
    'Buat program penghitung frekuensi kata dari sebuah kalimat memakai hash table. Kerjakan di C dengan implementasi manual, lalu di Python dengan `dict` — bandingkan panjang kodenya.',
    'Buktikan sendiri perbedaan O(1) dan O(n): cari sebuah elemen 100 kali pada `list` berisi 200.000 data, lalu ulangi pada `set` dengan data yang sama. Catat selisih waktunya.',
    'Di C++, tulis kode yang membuktikan bahwa `m["kunci"]` diam-diam menambah entri baru. Tampilkan `m.size()` sebelum dan sesudah membaca kunci yang belum ada.',
    'Buat program yang mendeteksi apakah sebuah array mengandung nilai kembar, memakai hash table. Kenapa cara ini O(n), sementara memeriksa dengan dua perulangan bersarang itu O(n²)?',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang collision memakai analogi loker berlabel huruf. Targetnya, kamu bisa menyimpulkan sendiri kenapa hash function yang buruk membuat pencarian kembali menjadi O(n).'
  ]
});

TOPICS.push({
  id: 'tree-bst',
  judul: 'Tree & Binary Search Tree (BST)',
  kategori: 'struktur-data',
  tag: ['tree', 'pohon', 'BST', 'binary search tree', 'root', 'leaf', 'height'],
  ringkas: 'Struktur bercabang seperti pohon terbalik — dan aturan sederhana yang membuat pencariannya jadi O(log n).',

  fungsi: `**Menyimpan data terurut yang bisa dicari, disisipkan, dan dihapus dengan cepat.**

Terpakai di:

- **Indeks basis data** — B-Tree adalah pengembangan langsung dari gagasan ini
- **Struktur berjenjang** — sistem berkas, DOM, struktur organisasi
- **Kumpulan terurut** — \`std::map\` dan \`std::set\` di C++ dibangun dari pohon
- **Mencari rentang** — mencari semua nilai antara dua batas, yang tidak bisa dilakukan hash table
- **Kecerdasan Buatan** — pohon keputusan pada klasifikasi

Yang menentukan segalanya: **keseimbangan**. BST yang seimbang memberi \`O(log n)\`; yang miring merosot menjadi \`O(n)\` — persis seperti linked list.

Dan datanya **tidak perlu jahat** untuk membuatnya miring. Memasukkan data yang sudah terurut sudah cukup.`,

  praktik: {
    tujuan: `Kamu bisa membangun BST, melihat sendiri kapan ia menjadi miring, dan tahu kenapa pohon seimbang diperlukan.`,
    alat: [
      'Python 3 atau C++'
    ],
    langkah: [
      { judul: 'Bangun simpul dan penyisipan',
        isi: `Tiap simpul punya nilai, anak kiri, dan anak kanan.

Aturan penyisipan: lebih kecil ke kiri, lebih besar ke kanan, mulai dari akar dan turun sampai menemukan tempat kosong.

Tulis versi rekursif — di sinilah rekursi benar-benar lebih jelas daripada perulangan.` },
      { judul: 'Buktikan pohon bisa miring',
        isi: `Masukkan angka 1 sampai 1000 **secara berurutan**, lalu ukur kedalamannya.

Kedalamannya **1000**, bukan sekitar 10. Pohonmu berubah menjadi linked list.

Lalu masukkan seribu angka **acak** dan ukur lagi. Kedalamannya sekitar 20-an.

Ini sebabnya urutan penyisipan sangat menentukan.` },
      { judul: 'Ukur pencarian pada keduanya',
        isi: `Cari seribu nilai pada pohon miring dan pada pohon acak.

Selisihnya besar, dan itu bukti langsung bahwa \`O(log n)\` **bergantung pada keseimbangan** — ia bukan jaminan bawaan BST.` },
      { judul: 'Tangani penghapusan dengan tiga kasus',
        isi: `- simpul **tanpa anak** — hapus langsung
- simpul dengan **satu anak** — sambungkan anaknya ke induknya
- simpul dengan **dua anak** — ganti dengan penerus inorder, yaitu nilai terkecil di subpohon kanan

Kasus ketiga yang paling sering salah. Uji khusus untuk itu.` },
      { judul: 'Kenali pohon seimbang',
        isi: `AVL dan Red-Black Tree menjaga keseimbangan otomatis dengan **rotasi** setiap kali penyisipan membuatnya terlalu miring.

Kamu tidak perlu menulisnya sendiri, tetapi perlu tahu bahwa \`std::map\` dan \`TreeMap\` memakainya — itulah kenapa mereka menjamin \`O(log n)\` dan BST polos tidak.` },
      { judul: 'Bandingkan dengan hash table',
        isi: `Hash table lebih cepat untuk pencarian **satu kunci tepat**.

Tetapi pohon bisa: mencari **rentang**, menemukan **terkecil dan terbesar**, dan menelusuri **secara terurut**.

Hash table tidak bisa satu pun dari ketiganya. Itulah kenapa keduanya sama-sama ada.` }
    ],
    cek: [
      'Pohon dari data berurutan punya kedalaman jauh lebih besar daripada dari data acak',
      'Penghapusan simpul berdua anak tidak merusak urutan pohonmu',
      'Kamu bisa menyebutkan tiga hal yang bisa dilakukan pohon tetapi tidak bisa hash table'
    ]
  },

  konsep: `
Semua struktur yang sudah kamu pelajari bersifat **linear**: array, linked list, stack, dan queue semuanya berupa satu barisan. **Tree** berbeda — datanya tersusun **bercabang dan bertingkat**, seperti pohon yang digambar terbalik dengan akar di atas.

Struktur bercabang ini cocok untuk data yang memang berhierarki: struktur folder di komputer, silsilah keluarga, struktur organisasi, atau menu bertingkat.

Istilah-istilah yang wajib kamu hafal untuk mengajar:

- **Root** — simpul paling atas, satu-satunya yang tidak punya induk
- **Parent** dan **child** — hubungan atas-bawah antar simpul yang bersambung
- **Leaf** (daun) — simpul yang **tidak punya anak** sama sekali
- **Sibling** — simpul-simpul yang induknya sama
- **Subtree** — satu simpul beserta seluruh keturunannya, yang **juga merupakan tree utuh**
- **Depth** sebuah simpul — jarak dari root menuju simpul itu
- **Height** — jarak terjauh dari sebuah simpul turun sampai daun. Height sebuah tree adalah height root-nya

Catatan penting soal konvensi: di sini height dihitung dari **jumlah sisi** (garis penghubung), sehingga tree berisi satu simpul saja punya height **0**. Sebagian buku menghitungnya dari jumlah simpul sehingga jawabannya 1 — keduanya dipakai di dunia nyata, jadi **selalu sebutkan konvensi yang kamu pakai** saat memberi soal.

**Binary tree** adalah tree yang tiap simpulnya punya **paling banyak dua anak**, disebut kiri dan kanan.

**Binary Search Tree (BST)** menambahkan satu aturan yang mengubah segalanya:

- Semua nilai di **subtree kiri lebih kecil** dari simpulnya
- Semua nilai di **subtree kanan lebih besar** dari simpulnya
- Dan aturan itu berlaku **di setiap simpul**, bukan cuma di root

Aturan sederhana ini membuat pencarian bisa **membuang separuh kemungkinan di tiap langkah**, persis seperti binary search — sehingga biayanya turun menjadi **O(log n)**.

Tapi ada satu kelemahan besar yang harus kamu tekankan: kalau data dimasukkan dalam keadaan **sudah terurut**, BST tumbuh **miring seperti garis lurus** dan merosot menjadi linked list dengan biaya O(n). Untuk mengatasinya ada tree yang menyeimbangkan dirinya sendiri seperti **AVL** dan **Red-Black Tree**.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'typedef struct Node {\n    int data;\n    struct Node *kiri;    // dua pointer, bukan satu\n    struct Node *kanan;\n} Node;',
      penjelasan: `
Bandingkan dengan node linked list yang cuma punya satu \`next\`. Di sini ada **dua pointer**, dan justru dari situlah kemampuan bercabang muncul.

Polanya sama persis dengan linked list: struct memuat **pointer** ke sesamanya, bukan salinan dirinya. Alasannya juga sama — ukuran pointer selalu tetap sehingga kompiler bisa menghitung ukuran \`Node\`.

Yang perlu ditekankan saat mengajar: **daun adalah simpul yang kedua pointernya \`NULL\`.** Jadi \`NULL\` di sini bukan sekadar penanda akhir seperti pada linked list, melainkan penanda bahwa **cabang itu tidak ada**.

Dari struktur ini juga terlihat kenapa hampir semua operasi tree ditulis **secara rekursif**. Setiap pointer \`kiri\` dan \`kanan\` sebenarnya menunjuk ke sebuah **tree utuh yang lebih kecil** — dan itulah definisi masalah yang berulang di dalam dirinya sendiri. Karena itu materi tree jauh lebih mudah dipahami setelah rekursi dikuasai.
`
    },
    {
      bahasa: 'c',
      kode: '//        50\n//       /  \\\n//     30    70\n//    /  \\     \\\n//  20    40    80\n// Aturan BST berlaku di SETIAP simpul, bukan cuma root',
      penjelasan: `
Inilah bagian yang paling sering disalahpahami mahasiswa: **aturan BST tidak cuma berlaku antara satu simpul dan dua anaknya, tapi terhadap seluruh isi subtree-nya.**

Perhatikan simpul \`70\`. Aturannya bukan sekadar "anak kirinya lebih kecil", melainkan **semua nilai di subtree kiri 70 harus lebih kecil dari 70**, dan semuanya juga harus **lebih besar dari 50** karena berada di subtree kanan root.

Karena itu tree berikut **bukan BST yang sah**, meski tiap pasangan induk-anak terlihat benar:

- Root \`50\`, anak kanannya \`70\`, dan anak kiri dari \`70\` adalah \`40\`
- Secara lokal terlihat benar karena \`40 < 70\`
- Tapi \`40\` berada di **subtree kanan** \`50\`, padahal \`40 < 50\` — jadi aturannya dilanggar

Cara memeriksa yang paling gampang: **lakukan penelusuran inorder.** Kalau hasilnya terurut menaik, berarti BST-nya sah. Kalau ada satu saja yang tidak urut, berarti ada aturan yang dilanggar. Trik ini sangat berguna saat memeriksa pekerjaan mahasiswa.
`
    },
    {
      bahasa: 'c',
      kode: 'Node *cari(Node *akar, int nilai) {\n    if (akar == NULL) return NULL;              // habis, tidak ketemu\n    if (akar->data == nilai) return akar;       // ketemu\n    if (nilai < akar->data)\n        return cari(akar->kiri, nilai);         // buang seluruh subtree KANAN\n    return cari(akar->kanan, nilai);            // buang seluruh subtree KIRI\n}',
      penjelasan: `
Di sinilah kekuatan BST terlihat. Perhatikan dua baris terakhir: begitu satu arah dipilih, **seluruh subtree di sisi lain langsung dibuang tanpa diperiksa satu pun**.

Ini persis gagasan binary search, hanya saja bentuknya pohon. Setiap langkah turun membuang kira-kira separuh kemungkinan, sehingga jumlah langkahnya sebanyak **tinggi pohon** — dan pada pohon yang seimbang, tingginya sekitar **log₂n**.

Untuk sejuta data, itu berarti cuma sekitar **20 langkah**.

Fungsi ini juga contoh bagus penerapan rekursi, dengan **dua base case** yang keduanya wajib ada:

- \`akar == NULL\` → sudah mentok di ujung, berarti nilainya memang tidak ada
- \`akar->data == nilai\` → ketemu

Melupakan base case pertama adalah bug tersering: saat pencarian mencapai daun dan lanjut ke \`NULL\`, program membaca \`NULL->data\` dan langsung jatuh dengan *segmentation fault*.

Perhatikan pula bahwa urutan pemeriksaannya penting — \`akar == NULL\` **harus** diperiksa sebelum \`akar->data\`, karena membaca \`data\` dari pointer kosong sudah terlanjur salah.
`
    },
    {
      bahasa: 'c',
      kode: 'Node *sisip(Node *akar, int nilai) {\n    if (akar == NULL) return buatNode(nilai);   // tempat kosong ketemu\n    if (nilai < akar->data)\n        akar->kiri = sisip(akar->kiri, nilai);  // hasilnya DITUGASKAN kembali\n    else if (nilai > akar->data)\n        akar->kanan = sisip(akar->kanan, nilai);\n    return akar;                                // kembalikan akar subtree ini\n}',
      penjelasan: `
Pola ini terlihat aneh pada awalnya, tapi sangat rapi setelah dipahami — dan pola yang sama dipakai untuk hampir semua operasi tree.

Kuncinya ada pada **\`akar->kiri = sisip(akar->kiri, nilai)\`**. Fungsi ini selalu mengembalikan **akar dari subtree yang sudah diperbarui**, lalu hasilnya ditugaskan kembali ke pointer induknya.

Kenapa harus begitu? Karena ketika \`akar == NULL\`, fungsi membuat node baru dan mengembalikannya. Node baru itu **harus disambungkan ke induknya**, dan penugasan itulah yang melakukannya. Tanpa penugasan balik, node baru dibuat lalu langsung hilang karena tidak ada yang menunjuknya.

Perhatikan juga bahwa penyisipan **selalu terjadi di daun**. BST tidak pernah menyisipkan di tengah — nilai baru terus turun mengikuti aturan besar-kecil sampai menemukan tempat kosong.

Bagian \`else if (nilai > akar->data)\` sengaja tidak menangani nilai yang **sama persis**, sehingga data kembar diabaikan. Ini pilihan desain yang lazim; kalau kamu ingin mengizinkan kembar, tentukan aturannya sendiri (misalnya selalu ke kanan) dan **konsisten**.
`
    },
    {
      bahasa: 'c',
      kode: '// Data masuk terurut: 10, 20, 30, 40, 50\n//  10\n//    \\\n//     20\n//       \\\n//        30      <- miring seperti garis lurus\n//          \\\n//           40   O(n), bukan O(log n) lagi',
      penjelasan: `
Inilah kelemahan terbesar BST biasa, dan wajib kamu jelaskan supaya mahasiswa tidak menganggap BST selalu cepat.

Kalau data dimasukkan dalam keadaan **sudah terurut**, setiap nilai baru selalu lebih besar dari yang sebelumnya, sehingga selalu jatuh ke kanan. Hasilnya pohon yang **tidak pernah bercabang** — bentuknya garis lurus, dan secara praktis ia **sudah menjadi linked list**.

Akibatnya tingginya menjadi \`n\`, bukan \`log n\`, dan semua operasinya merosot dari O(log n) menjadi **O(n)**.

Yang ironis: data terurut justru **kondisi yang sangat sering terjadi** di dunia nyata — misalnya memasukkan NIM mahasiswa yang memang berurutan. Jadi ini bukan kasus buatan yang jarang muncul.

Ada dua cara mengatasinya:

- **Acak dulu urutan masukannya** sebelum disisipkan, sehingga pohonnya cenderung seimbang
- Gunakan **self-balancing tree** seperti **AVL** atau **Red-Black Tree**, yang otomatis menata ulang dirinya agar tingginya selalu terjaga sekitar log n

\`map\` dan \`set\` di C++ memakai Red-Black Tree, sehingga **dijamin O(log n)** apa pun urutan masukannya. Inilah alasan pustaka standar tidak memakai BST polos.
`
    },
    {
      bahasa: 'python',
      kode: "# Menghapus simpul: ada TIGA kasus yang harus dibedakan\n# 1. daun            -> hapus langsung\n# 2. satu anak       -> ganti dengan anaknya\n# 3. dua anak        -> ganti dengan penerus inorder",
      penjelasan: `
Menghapus adalah operasi BST yang paling rumit, dan sumber kerumitannya ada pada **kasus ketiga**.

**Kasus daun** paling gampang: langsung dibuang, dan pointer induknya diisi \`NULL\`.

**Kasus satu anak** juga sederhana: simpul dilewati, dan anaknya disambungkan langsung ke induknya — persis seperti menghapus node di linked list.

**Kasus dua anak** tidak bisa diselesaikan dengan cara itu, karena satu tempat tidak bisa diisi dua cabang sekaligus. Solusinya cerdik: **jangan hapus simpulnya, tapi ganti isinya.**

Penggantinya harus berupa nilai yang **tetap menjaga aturan BST**, dan hanya ada dua pilihan yang memenuhi:

- **Penerus inorder** — nilai **terkecil di subtree kanan**. Caranya, masuk ke kanan sekali lalu terus ke kiri sampai mentok
- **Pendahulu inorder** — nilai terbesar di subtree kiri

Setelah isinya diganti, tinggal hapus simpul pengganti itu dari posisi lamanya — dan simpul itu **dijamin punya paling banyak satu anak**, sehingga kembali ke kasus yang mudah.

Kenapa pilihan itu benar? Karena nilai terkecil di subtree kanan adalah **nilai terdekat yang masih lebih besar** dari simpul yang dihapus, sehingga semua aturan besar-kecil tetap terpenuhi.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Node {
    public int Data;
    public Node Kiri, Kanan;          // DUA rujukan -> bisa bercabang
    public Node(int data) { Data = data; }
}

class BST {
    private Node akar;

    // SISIP: hasilnya selalu ditugaskan kembali ke rujukan induk
    private Node Sisip(Node akar, int nilai) {
        if (akar == null) return new Node(nilai);         // tempat kosong ketemu
        if (nilai < akar.Data)      akar.Kiri  = Sisip(akar.Kiri, nilai);
        else if (nilai > akar.Data) akar.Kanan = Sisip(akar.Kanan, nilai);
        return akar;
    }
    public void Sisip(int nilai) { akar = Sisip(akar, nilai); }

    // CARI: tiap langkah membuang separuh kemungkinan
    public bool Cari(int nilai, out int langkah) {
        langkah = 0;
        Node p = akar;
        while (p != null) {
            langkah++;
            if (p.Data == nilai) return true;
            p = nilai < p.Data ? p.Kiri : p.Kanan;        // buang satu sisi
        }
        return false;
    }

    private Node Terkecil(Node akar) {
        while (akar.Kiri != null) akar = akar.Kiri;       // terus ke kiri
        return akar;
    }

    // HAPUS: tiga kasus
    private Node Hapus(Node akar, int nilai) {
        if (akar == null) return null;

        if (nilai < akar.Data)      akar.Kiri  = Hapus(akar.Kiri, nilai);
        else if (nilai > akar.Data) akar.Kanan = Hapus(akar.Kanan, nilai);
        else {
            if (akar.Kiri == null)  return akar.Kanan;    // kasus 1 & 2
            if (akar.Kanan == null) return akar.Kiri;
            Node penerus = Terkecil(akar.Kanan);          // kasus 3: dua anak
            akar.Data = penerus.Data;
            akar.Kanan = Hapus(akar.Kanan, penerus.Data);
        }
        return akar;
    }
    public void Hapus(int nilai) { akar = Hapus(akar, nilai); }

    public int Tinggi() { return Tinggi(akar); }
    private int Tinggi(Node a) {
        if (a == null) return -1;                         // konvensi: hitung SISI
        return Math.Max(Tinggi(a.Kiri), Tinggi(a.Kanan)) + 1;
    }

    public List<int> Inorder() {
        var hasil = new List<int>();
        void Telusuri(Node a) {
            if (a == null) return;
            Telusuri(a.Kiri); hasil.Add(a.Data); Telusuri(a.Kanan);
        }
        Telusuri(akar);
        return hasil;
    }

    public void Gambar() { Gambar(akar, 0); }
    private void Gambar(Node a, int level) {
        if (a == null) return;
        Gambar(a.Kanan, level + 1);
        Console.WriteLine(new string(' ', level * 6) + a.Data);
        Gambar(a.Kiri, level + 1);
    }
}

class Program {
    static void Main() {
        var t = new BST();
        foreach (int x in new[] { 50, 30, 70, 20, 40, 60, 80 }) t.Sisip(x);

        Console.WriteLine("--- BENTUK POHON (miring 90 derajat) ---");
        t.Gambar();

        Console.WriteLine($"\ninorder (harus terurut) : {string.Join(" ", t.Inorder())}");
        Console.WriteLine($"tinggi : {t.Tinggi()}");

        t.Cari(40, out int langkah);
        Console.WriteLine($"cari 40 : ketemu ({langkah} langkah)");

        t.Hapus(30);
        Console.WriteLine($"\nsetelah hapus 30 : {string.Join(" ", t.Inorder())}");

        // Data terurut membuat pohon MIRING
        var miring = new BST();
        for (int i = 10; i <= 50; i += 10) miring.Sisip(i);
        Console.WriteLine($"\ndata terurut -> tinggi {miring.Tinggi()} (garis lurus)");

        // Di dunia nyata: SortedSet memakai pohon merah-hitam,
        // sehingga DIJAMIN seimbang
        Console.WriteLine("\n--- SortedSet (pohon seimbang bawaan) ---");
        var s = new SortedSet<int>();
        for (int i = 1; i <= 5; i++) s.Add(i * 10);        // terurut pun aman
        Console.WriteLine("  isi : " + string.Join(" ", s));
        Console.WriteLine("  Contains(30) : " + s.Contains(30) + "  (dijamin O(log n))");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static class Node {
        int data;
        Node kiri, kanan;             // DUA rujukan -> bisa bercabang
        Node(int data) { this.data = data; }
    }

    static Node sisip(Node akar, int nilai) {
        if (akar == null) return new Node(nilai);          // tempat kosong ketemu
        if (nilai < akar.data)      akar.kiri  = sisip(akar.kiri, nilai);
        else if (nilai > akar.data) akar.kanan = sisip(akar.kanan, nilai);
        return akar;                                        // WAJIB dikembalikan
    }

    static boolean cari(Node akar, int nilai) {
        if (akar == null) return false;                     // base case
        if (akar.data == nilai) return true;
        return nilai < akar.data ? cari(akar.kiri, nilai) : cari(akar.kanan, nilai);
    }

    static Node terkecil(Node akar) {
        while (akar.kiri != null) akar = akar.kiri;
        return akar;
    }

    static Node hapus(Node akar, int nilai) {
        if (akar == null) return null;

        if (nilai < akar.data)      akar.kiri  = hapus(akar.kiri, nilai);
        else if (nilai > akar.data) akar.kanan = hapus(akar.kanan, nilai);
        else {
            if (akar.kiri == null)  return akar.kanan;      // kasus 1 & 2
            if (akar.kanan == null) return akar.kiri;
            Node penerus = terkecil(akar.kanan);            // kasus 3
            akar.data = penerus.data;
            akar.kanan = hapus(akar.kanan, penerus.data);
        }
        return akar;
    }

    static int tinggi(Node a) {
        if (a == null) return -1;                           // konvensi: hitung SISI
        return Math.max(tinggi(a.kiri), tinggi(a.kanan)) + 1;
    }

    static void inorder(Node a, List<Integer> hasil) {
        if (a == null) return;
        inorder(a.kiri, hasil);
        hasil.add(a.data);
        inorder(a.kanan, hasil);
    }

    // Memeriksa keabsahan: aturan berlaku ke SELURUH subtree
    static boolean sahBST(Node a, long min, long max) {
        if (a == null) return true;
        if (a.data <= min || a.data >= max) return false;
        return sahBST(a.kiri, min, a.data) && sahBST(a.kanan, a.data, max);
    }

    static void gambar(Node a, int level) {
        if (a == null) return;
        gambar(a.kanan, level + 1);
        System.out.println(" ".repeat(level * 6) + a.data);
        gambar(a.kiri, level + 1);
    }

    public static void main(String[] args) {
        Node akar = null;
        for (int x : new int[] { 50, 30, 70, 20, 40, 60, 80 }) akar = sisip(akar, x);

        System.out.println("--- BENTUK POHON (miring 90 derajat) ---");
        gambar(akar, 0);

        List<Integer> hasil = new ArrayList<>();
        inorder(akar, hasil);
        System.out.println("\ninorder : " + hasil);
        System.out.println("tinggi  : " + tinggi(akar));
        System.out.println("cari 40 : " + cari(akar, 40));
        System.out.println("BST sah : " + sahBST(akar, Long.MIN_VALUE, Long.MAX_VALUE));

        // Data terurut -> pohon miring
        Node miring = null;
        for (int i = 1; i <= 5; i++) miring = sisip(miring, i * 10);
        System.out.println("\ndata terurut -> tinggi " + tinggi(miring) + " (garis lurus)");

        // TreeSet memakai pohon merah-hitam, DIJAMIN seimbang
        System.out.println("\n--- TreeSet (pohon seimbang bawaan) ---");
        TreeSet<Integer> s = new TreeSet<>();
        for (int i = 1; i <= 5; i++) s.add(i * 10);
        System.out.println("  isi : " + s);
        System.out.println("  contains(30) : " + s.contains(30) + " (dijamin O(log n))");
        System.out.println("  first/last   : " + s.first() + " / " + s.last());
        System.out.println("  floor(35)    : " + s.floor(35) + " <- terbesar yang <= 35");
    }
}`,

    js: String.raw`class Node {
    constructor(data) {
        this.data = data;
        this.kiri = null;             // DUA rujukan -> bisa bercabang
        this.kanan = null;
    }
}

function sisip(akar, nilai) {
    if (akar === null) return new Node(nilai);        // tempat kosong ketemu
    if (nilai < akar.data)      akar.kiri  = sisip(akar.kiri, nilai);
    else if (nilai > akar.data) akar.kanan = sisip(akar.kanan, nilai);
    return akar;                                       // WAJIB dikembalikan
}

function cari(akar, nilai, langkah = 0) {
    langkah++;
    if (akar === null) return { ketemu: false, langkah: langkah };
    if (akar.data === nilai) return { ketemu: true, langkah: langkah };
    return nilai < akar.data
        ? cari(akar.kiri, nilai, langkah)              // buang subtree KANAN
        : cari(akar.kanan, nilai, langkah);            // buang subtree KIRI
}

function terkecil(akar) {
    while (akar.kiri !== null) akar = akar.kiri;       // terus ke kiri
    return akar;
}

function hapus(akar, nilai) {
    if (akar === null) return null;

    if (nilai < akar.data)      akar.kiri  = hapus(akar.kiri, nilai);
    else if (nilai > akar.data) akar.kanan = hapus(akar.kanan, nilai);
    else {
        if (akar.kiri === null)  return akar.kanan;    // kasus 1 & 2
        if (akar.kanan === null) return akar.kiri;
        const penerus = terkecil(akar.kanan);          // kasus 3: dua anak
        akar.data = penerus.data;
        akar.kanan = hapus(akar.kanan, penerus.data);
    }
    return akar;
}

function tinggi(a) {
    if (a === null) return -1;                         // konvensi: hitung SISI
    return Math.max(tinggi(a.kiri), tinggi(a.kanan)) + 1;
}

function inorder(a, hasil = []) {
    if (a !== null) {
        inorder(a.kiri, hasil);
        hasil.push(a.data);
        inorder(a.kanan, hasil);
    }
    return hasil;
}

function sahBST(a, min = -Infinity, max = Infinity) {
    if (a === null) return true;
    if (a.data <= min || a.data >= max) return false;
    return sahBST(a.kiri, min, a.data) && sahBST(a.kanan, a.data, max);
}

function gambar(a, level = 0) {
    if (a === null) return;
    gambar(a.kanan, level + 1);
    console.log(" ".repeat(level * 6) + a.data);
    gambar(a.kiri, level + 1);
}

let akar = null;
for (const x of [50, 30, 70, 20, 40, 60, 80]) akar = sisip(akar, x);

console.log("--- BENTUK POHON (miring 90 derajat) ---");
gambar(akar);

console.log("\ninorder :", inorder(akar).join(" "));
console.log("tinggi  :", tinggi(akar));
console.log("BST sah :", sahBST(akar));

const hasil = cari(akar, 40);
console.log("cari 40 :", hasil.ketemu ? "ketemu" : "tidak", "(" + hasil.langkah + " langkah)");

akar = hapus(akar, 30);
console.log("\nsetelah hapus 30 :", inorder(akar).join(" "));

// Data terurut -> pohon miring
let miring = null;
for (let i = 10; i <= 50; i += 10) miring = sisip(miring, i);
console.log("\ndata terurut -> tinggi", tinggi(miring), "(garis lurus)");
console.log("kalau seimbang, seharusnya sekitar 2");

// PENTING: JavaScript TIDAK punya BST bawaan
console.log("\nJavaScript tidak punya TreeMap/TreeSet seperti Java dan C#.");
console.log("Map dan Set memakai hash, jadi O(1) tapi TIDAK terurut.");
console.log("Kalau butuh data terurut, urutkan sendiri atau pakai pustaka luar.");

// Membuktikan inorder = cara memeriksa keabsahan BST
const urut = inorder(akar);
const sudahUrut = urut.every(function (v, i) { return i === 0 || urut[i - 1] <= v; });
console.log("\ninorder terurut?", sudahUrut, "-> BST sah");`,

    c: String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *kiri, *kanan;
} Node;

Node *buatNode(int nilai) {
    Node *baru = (Node *)malloc(sizeof(Node));
    baru->data  = nilai;
    baru->kiri  = NULL;          // WAJIB, kalau tidak isinya sampah
    baru->kanan = NULL;
    return baru;
}

/* SISIP: hasilnya selalu ditugaskan kembali ke pointer induk */
Node *sisip(Node *akar, int nilai) {
    if (akar == NULL) return buatNode(nilai);        // tempat kosong ketemu

    if (nilai < akar->data)
        akar->kiri = sisip(akar->kiri, nilai);
    else if (nilai > akar->data)
        akar->kanan = sisip(akar->kanan, nilai);
    /* nilai sama diabaikan */

    return akar;
}

/* CARI: tiap langkah membuang separuh kemungkinan */
Node *cari(Node *akar, int nilai, int *langkah) {
    (*langkah)++;
    if (akar == NULL) return NULL;                   // base case: tidak ada
    if (akar->data == nilai) return akar;            // base case: ketemu
    if (nilai < akar->data) return cari(akar->kiri, nilai, langkah);
    return cari(akar->kanan, nilai, langkah);
}

/* Nilai terkecil = terus ke kiri sampai mentok */
Node *terkecil(Node *akar) {
    while (akar->kiri != NULL) akar = akar->kiri;
    return akar;
}

Node *terbesar(Node *akar) {
    while (akar->kanan != NULL) akar = akar->kanan;
    return akar;
}

/* HAPUS: tiga kasus */
Node *hapus(Node *akar, int nilai) {
    if (akar == NULL) return NULL;

    if (nilai < akar->data)      akar->kiri  = hapus(akar->kiri, nilai);
    else if (nilai > akar->data) akar->kanan = hapus(akar->kanan, nilai);
    else {
        /* Kasus 1 & 2: tidak punya anak, atau punya satu anak */
        if (akar->kiri == NULL) {
            Node *anak = akar->kanan;
            free(akar);
            return anak;
        }
        if (akar->kanan == NULL) {
            Node *anak = akar->kiri;
            free(akar);
            return anak;
        }
        /* Kasus 3: dua anak -> ganti isinya dengan penerus inorder */
        Node *penerus = terkecil(akar->kanan);       // terkecil di subtree kanan
        akar->data = penerus->data;
        akar->kanan = hapus(akar->kanan, penerus->data);
    }
    return akar;
}

/* Tinggi pohon, dihitung dari jumlah SISI (satu simpul -> 0) */
int tinggi(Node *akar) {
    if (akar == NULL) return -1;                     // pohon kosong -> -1
    int kr = tinggi(akar->kiri);
    int kn = tinggi(akar->kanan);
    return (kr > kn ? kr : kn) + 1;
}

int jumlahSimpul(Node *akar) {
    if (akar == NULL) return 0;
    return 1 + jumlahSimpul(akar->kiri) + jumlahSimpul(akar->kanan);
}

int jumlahDaun(Node *akar) {
    if (akar == NULL) return 0;
    if (akar->kiri == NULL && akar->kanan == NULL) return 1;
    return jumlahDaun(akar->kiri) + jumlahDaun(akar->kanan);
}

/* Inorder: kalau BST-nya sah, hasilnya pasti terurut menaik */
void inorder(Node *akar) {
    if (akar == NULL) return;
    inorder(akar->kiri);
    printf("%d ", akar->data);
    inorder(akar->kanan);
}

/* Menggambar pohon miring: putar kepala 90 derajat ke kiri untuk membacanya */
void gambar(Node *akar, int level) {
    if (akar == NULL) return;
    gambar(akar->kanan, level + 1);
    for (int i = 0; i < level; i++) printf("      ");
    printf("%d\n", akar->data);
    gambar(akar->kiri, level + 1);
}

void bebaskan(Node *akar) {
    if (akar == NULL) return;
    bebaskan(akar->kiri);           // anak dulu, baru induk (postorder)
    bebaskan(akar->kanan);
    free(akar);
}

int main(void) {
    Node *akar = NULL;
    int nilai[] = {50, 30, 70, 20, 40, 60, 80};

    for (int i = 0; i < 7; i++) akar = sisip(akar, nilai[i]);

    printf("--- BENTUK POHON (miring 90 derajat) ---\n");
    gambar(akar, 0);

    printf("\ninorder (harus terurut) : ");
    inorder(akar);

    printf("\n\njumlah simpul : %d\n", jumlahSimpul(akar));
    printf("jumlah daun   : %d\n", jumlahDaun(akar));
    printf("tinggi        : %d\n", tinggi(akar));
    printf("terkecil      : %d\n", terkecil(akar)->data);
    printf("terbesar      : %d\n", terbesar(akar)->data);

    int langkah = 0;
    printf("\ncari 40 : %s (%d langkah)\n",
           cari(akar, 40, &langkah) ? "ketemu" : "tidak ada", langkah);
    langkah = 0;
    printf("cari 99 : %s (%d langkah)\n",
           cari(akar, 99, &langkah) ? "ketemu" : "tidak ada", langkah);

    akar = hapus(akar, 30);          // simpul berdua anak
    printf("\nsetelah hapus 30, inorder : ");
    inorder(akar);
    printf("\n");

    /* Membuktikan pohon miring akibat data terurut */
    Node *miring = NULL;
    for (int i = 10; i <= 50; i += 10) miring = sisip(miring, i);
    printf("\n--- DATA MASUK TERURUT ---\n");
    gambar(miring, 0);
    printf("tinggi : %d  <- garis lurus, sudah jadi linked list\n", tinggi(miring));

    bebaskan(akar);
    bebaskan(miring);
    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <set>
#include <map>
#include <algorithm>
using namespace std;

struct Node {
    int data;
    Node *kiri, *kanan;
    Node(int d) : data(d), kiri(nullptr), kanan(nullptr) {}
};

Node *sisip(Node *akar, int nilai) {
    if (!akar) return new Node(nilai);
    if (nilai < akar->data)      akar->kiri  = sisip(akar->kiri, nilai);
    else if (nilai > akar->data) akar->kanan = sisip(akar->kanan, nilai);
    return akar;
}

bool cari(Node *akar, int nilai) {
    if (!akar) return false;
    if (akar->data == nilai) return true;
    return nilai < akar->data ? cari(akar->kiri, nilai) : cari(akar->kanan, nilai);
}

int tinggi(Node *akar) {
    if (!akar) return -1;
    return max(tinggi(akar->kiri), tinggi(akar->kanan)) + 1;
}

void inorder(Node *akar) {
    if (!akar) return;
    inorder(akar->kiri);
    cout << akar->data << " ";
    inorder(akar->kanan);
}

/* Memeriksa keabsahan BST: aturannya berlaku terhadap SELURUH subtree,
   bukan cuma antara induk dan anak langsungnya. */
bool sahBST(Node *akar, long min, long max) {
    if (!akar) return true;
    if (akar->data <= min || akar->data >= max) return false;
    return sahBST(akar->kiri, min, akar->data) &&
           sahBST(akar->kanan, akar->data, max);
}

void bebaskan(Node *akar) {
    if (!akar) return;
    bebaskan(akar->kiri); bebaskan(akar->kanan);
    delete akar;
}

int main() {
    Node *akar = nullptr;
    for (int x : {50, 30, 70, 20, 40, 60, 80}) akar = sisip(akar, x);

    cout << "inorder : ";  inorder(akar);
    cout << "\ntinggi  : " << tinggi(akar) << endl;
    cout << "cari 40 : " << (cari(akar, 40) ? "ketemu" : "tidak") << endl;
    cout << "BST sah : " << (sahBST(akar, -1e18, 1e18) ? "ya" : "tidak") << endl;

    // Membuktikan pohon miring
    Node *miring = nullptr;
    for (int i = 1; i <= 5; i++) miring = sisip(miring, i * 10);
    cout << "\ndata terurut -> tinggi : " << tinggi(miring)
         << "  (seharusnya sekitar 2 kalau seimbang)" << endl;

    /* Di dunia nyata cukup pakai pustaka standar.
       set dan map memakai Red-Black Tree, jadi DIJAMIN O(log n)
       berapa pun urutan masukannya. */
    set<int> s;
    for (int i = 1; i <= 5; i++) s.insert(i * 10);   // terurut pun tetap aman

    cout << "\nstd::set (selalu terurut & seimbang) : ";
    for (int x : s) cout << x << " ";
    cout << "\ncari 30 : " << (s.count(30) ? "ada" : "tidak") << endl;

    bebaskan(akar); bebaskan(miring);
    return 0;
}`,

    python: String.raw`class Node:
    def __init__(self, data):
        self.data = data
        self.kiri = None
        self.kanan = None


def sisip(akar, nilai):
    """Hasilnya selalu ditugaskan kembali ke pointer induk."""
    if akar is None:
        return Node(nilai)                      # tempat kosong ketemu
    if nilai < akar.data:
        akar.kiri = sisip(akar.kiri, nilai)
    elif nilai > akar.data:
        akar.kanan = sisip(akar.kanan, nilai)
    return akar


def cari(akar, nilai, langkah=0):
    langkah += 1
    if akar is None:
        return False, langkah                   # base case: tidak ada
    if akar.data == nilai:
        return True, langkah                    # base case: ketemu
    if nilai < akar.data:
        return cari(akar.kiri, nilai, langkah)  # buang subtree KANAN
    return cari(akar.kanan, nilai, langkah)     # buang subtree KIRI


def terkecil(akar):
    while akar.kiri is not None:                # terus ke kiri sampai mentok
        akar = akar.kiri
    return akar


def hapus(akar, nilai):
    if akar is None:
        return None
    if nilai < akar.data:
        akar.kiri = hapus(akar.kiri, nilai)
    elif nilai > akar.data:
        akar.kanan = hapus(akar.kanan, nilai)
    else:
        if akar.kiri is None:                   # kasus 1 & 2
            return akar.kanan
        if akar.kanan is None:
            return akar.kiri
        penerus = terkecil(akar.kanan)          # kasus 3: dua anak
        akar.data = penerus.data
        akar.kanan = hapus(akar.kanan, penerus.data)
    return akar


def tinggi(akar):
    if akar is None:
        return -1                               # konvensi: hitung SISI
    return max(tinggi(akar.kiri), tinggi(akar.kanan)) + 1


def jumlah_simpul(akar):
    return 0 if akar is None else 1 + jumlah_simpul(akar.kiri) + jumlah_simpul(akar.kanan)


def jumlah_daun(akar):
    if akar is None:
        return 0
    if akar.kiri is None and akar.kanan is None:
        return 1
    return jumlah_daun(akar.kiri) + jumlah_daun(akar.kanan)


def inorder(akar, hasil=None):
    if hasil is None:
        hasil = []
    if akar is not None:
        inorder(akar.kiri, hasil)
        hasil.append(akar.data)
        inorder(akar.kanan, hasil)
    return hasil


def gambar(akar, level=0):
    """Putar kepala 90 derajat ke kiri untuk membacanya."""
    if akar is None:
        return
    gambar(akar.kanan, level + 1)
    print("      " * level + str(akar.data))
    gambar(akar.kiri, level + 1)


def sah_bst(akar, minimum=float("-inf"), maksimum=float("inf")):
    """Aturan berlaku terhadap SELURUH subtree, bukan cuma anak langsung."""
    if akar is None:
        return True
    if not (minimum < akar.data < maksimum):
        return False
    return (sah_bst(akar.kiri, minimum, akar.data) and
            sah_bst(akar.kanan, akar.data, maksimum))


akar = None
for x in [50, 30, 70, 20, 40, 60, 80]:
    akar = sisip(akar, x)

print("--- BENTUK POHON (miring 90 derajat) ---")
gambar(akar)

print("\ninorder (harus terurut) :", inorder(akar))
print("jumlah simpul :", jumlah_simpul(akar))
print("jumlah daun   :", jumlah_daun(akar))
print("tinggi        :", tinggi(akar))
print("BST sah?      :", sah_bst(akar))

ketemu, langkah = cari(akar, 40)
print(f"\ncari 40 : {'ketemu' if ketemu else 'tidak ada'} ({langkah} langkah)")
ketemu, langkah = cari(akar, 99)
print(f"cari 99 : {'ketemu' if ketemu else 'tidak ada'} ({langkah} langkah)")

akar = hapus(akar, 30)
print("\nsetelah hapus 30 :", inorder(akar))

# Membuktikan pohon miring akibat data terurut
miring = None
for i in range(10, 60, 10):
    miring = sisip(miring, i)
print("\n--- DATA MASUK TERURUT ---")
gambar(miring)
print(f"tinggi : {tinggi(miring)}  <- garis lurus, sudah jadi linked list")
print(f"kalau seimbang, seharusnya sekitar {2}")`
  },

  output: `--- BENTUK POHON (miring 90 derajat) ---
            80
      70
            60
50
            40
      30
            20

inorder (harus terurut) : 20 30 40 50 60 70 80

jumlah simpul : 7
jumlah daun   : 4
tinggi        : 2
terkecil      : 20
terbesar      : 80

cari 40 : ketemu (3 langkah)
cari 99 : tidak ada (3 langkah)

setelah hapus 30, inorder : 20 40 50 60 70 80`,

  kompleksitas: {
    tabel: [
      { operasi: 'Cari — pohon seimbang', waktu: 'O(log n)', memori: 'O(log n)' },
      { operasi: 'Sisip — pohon seimbang', waktu: 'O(log n)', memori: 'O(log n)' },
      { operasi: 'Hapus — pohon seimbang', waktu: 'O(log n)', memori: 'O(log n)' },
      { operasi: 'Semua operasi — pohon miring', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'Cari nilai terkecil / terbesar', waktu: 'O(tinggi)', memori: 'O(1)' },
      { operasi: 'Menelusuri seluruh simpul', waktu: 'O(n)', memori: 'O(tinggi)' },
      { operasi: 'AVL / Red-Black Tree — dijamin', waktu: 'O(log n)', memori: 'O(log n)' },
      { operasi: 'penyimpanan n simpul', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa O(log n) pada pohon seimbang?** Karena setiap langkah turun **membuang seluruh subtree di sisi lain** — kira-kira separuh dari sisa kemungkinan. Pertanyaannya sama seperti pada binary search: *"berapa kali n dibagi dua sampai tersisa satu?"* Jawabannya log₂n. Untuk sejuta data, cukup sekitar **20 langkah**.

**Kenapa bisa merosot jadi O(n)?** Karena yang sebenarnya menentukan biaya bukan jumlah simpul, melainkan **tinggi pohonnya**. Kalau data masuk dalam keadaan terurut, tiap simpul baru selalu jatuh ke sisi yang sama sehingga pohonnya tidak pernah bercabang. Tingginya menjadi \`n\`, dan strukturnya **secara praktis sudah menjadi linked list**.

**Kenapa memorinya O(log n)?** Karena operasi tree ditulis rekursif, dan tiap tingkat pemanggilan menempati satu ruang di call stack. Kedalamannya sebanding dengan tinggi pohon — jadi O(log n) saat seimbang, dan **O(n) saat miring**. Pada pohon miring berisi ratusan ribu data, ini bisa menyebabkan stack overflow.

**Kenapa AVL dan Red-Black Tree lebih dipercaya?** Karena keduanya **menata ulang dirinya sendiri** setiap kali ada penyisipan atau penghapusan, sehingga tingginya selalu terjaga sekitar log n. Jaminan itulah alasan \`map\` dan \`set\` di C++ memakainya, bukan BST polos.

**Bandingkan dengan hash table:** hash table lebih cepat untuk pencarian tunggal — O(1) melawan O(log n). Tapi tree punya satu keunggulan yang tidak dimiliki hash table: **isinya selalu terurut**. Pertanyaan seperti *"siapa saja yang nilainya antara 70 dan 90?"* mudah dijawab tree, tapi memaksa hash table memeriksa seluruh datanya.
`
  },

  kesalahanUmum: [
    {
      salah: 'Lupa base case `if (akar == NULL)` pada fungsi rekursif tree.',
      kenapa: 'Saat penelusuran mencapai daun lalu melanjutkan ke anaknya yang bernilai `NULL`, program membaca `NULL->data` — yaitu membuka isi alamat kosong. Akibatnya *segmentation fault*, dan ini bug tersering pada materi tree.',
      benar: 'Selalu tulis `if (akar == NULL) return ...;` sebagai **baris pertama** setiap fungsi tree, sebelum menyentuh `akar->data`. Urutannya tidak boleh dibalik.'
    },
    {
      salah: 'Lupa menugaskan kembali hasil rekursi: `sisip(akar->kiri, nilai);` tanpa `akar->kiri =`',
      kenapa: 'Fungsi membuat node baru dan mengembalikannya, tapi karena hasilnya tidak ditugaskan ke mana pun, **node itu langsung hilang** tanpa pernah tersambung ke pohon. Programnya berjalan normal, tapi datanya tidak pernah bertambah.',
      benar: 'Tulis lengkap `akar->kiri = sisip(akar->kiri, nilai);`. Pola "ubah lalu tugaskan kembali" ini dipakai pada hampir semua operasi tree yang mengubah struktur.'
    },
    {
      salah: 'Mengira aturan BST hanya berlaku antara induk dan anak langsungnya.',
      kenapa: 'Aturannya berlaku terhadap **seluruh isi subtree**. Sebuah simpul bisa terlihat benar terhadap induknya tapi melanggar aturan terhadap kakeknya — dan pohon seperti itu bukan BST yang sah, sehingga pencariannya bisa gagal menemukan data yang jelas-jelas ada.',
      benar: 'Periksa dengan penelusuran **inorder**: kalau hasilnya terurut menaik, BST-nya sah. Alternatif lain, tulis fungsi pemeriksa yang membawa batas minimum dan maksimum seperti pada contoh kode C++.'
    },
    {
      salah: 'Memasukkan data yang sudah terurut ke dalam BST lalu mengharapkan O(log n).',
      kenapa: 'Setiap nilai baru selalu jatuh ke sisi yang sama, sehingga pohonnya tumbuh **miring seperti garis lurus**. Tingginya menjadi `n` dan semua operasinya merosot ke O(n) — sama saja dengan linked list. Kondisi ini sering terjadi karena data nyata memang kerap sudah terurut, misalnya NIM.',
      benar: 'Acak dulu urutan masukannya, atau pakai self-balancing tree. Di C++ cukup gunakan `set` dan `map` yang memakai Red-Black Tree sehingga **dijamin O(log n)**.'
    },
    {
      salah: 'Menghapus simpul berdua anak dengan cara menyambungkan salah satu anaknya ke induk.',
      kenapa: 'Satu tempat tidak bisa menampung dua cabang sekaligus, sehingga salah satu subtree pasti terputus dan **seluruh isinya hilang** dari pohon. Programnya tidak error, datanya saja yang lenyap diam-diam.',
      benar: 'Ganti **isinya** dengan penerus inorder — nilai terkecil di subtree kanan — lalu hapus simpul pengganti itu dari posisi lamanya. Simpul pengganti dijamin punya paling banyak satu anak, sehingga kembali ke kasus yang mudah.'
    },
    {
      salah: 'Membebaskan memori pohon dengan urutan induk lebih dulu.',
      kenapa: 'Setelah induknya di-`free`, pointer `kiri` dan `kanan` di dalamnya sudah tidak berlaku. Membacanya untuk menuju anak berarti *use after free*, sehingga seluruh subtree menjadi tidak terjangkau dan program bisa jatuh.',
      benar: 'Bebaskan dengan urutan **postorder**: anak kiri dulu, lalu anak kanan, baru induknya. Inilah salah satu alasan nyata kenapa postorder traversal itu penting.'
    }
  ],

  analogi: `
Mulai dengan analogi yang sudah dikenal semua orang: **struktur folder di komputer**. Folder utama adalah root, di dalamnya ada subfolder (anak), dan folder yang tidak berisi folder lagi adalah daun. Setiap subfolder **juga merupakan struktur folder yang utuh** — dan dari sini konsep *subtree* jadi terasa alami, sekaligus menjelaskan kenapa operasinya ditulis rekursif.

Untuk **aturan BST**, analogi terkuatnya adalah **menebak angka**. Kamu memikirkan angka 1–100, mahasiswa menebak, dan kamu cuma menjawab "lebih besar" atau "lebih kecil". Setiap jawaban **membuang separuh kemungkinan** — dan itulah persis yang terjadi saat turun ke kiri atau ke kanan di BST. Karena mereka sudah memainkan ini di materi Searching, kaitannya langsung terasa.

Untuk menegaskan bahwa **aturannya berlaku ke seluruh subtree**, gambar contoh yang salah di papan tulis: root 50, kanannya 70, lalu kiri dari 70 diisi 40. Tanya: *"secara sekilas benar karena 40 < 70. Tapi coba cari angka 40 dari root — ke mana kamu belok?"* Mahasiswa akan menjawab "ke kiri", lalu menyadari 40 tidak akan pernah ditemukan. Kesalahan itu jadi terasa akibatnya, bukan cuma dihafal.

Untuk **pohon miring**, peragakan langsung: masukkan 1, 2, 3, 4, 5 secara berurutan sambil menggambarnya di papan tulis. Bentuk garis lurusnya akan terlihat jelas, lalu tanya: *"ini masih pohon, atau sudah jadi linked list?"* Setelah itu ulangi dengan urutan acak, dan perbedaan bentuknya bicara sendiri.

Untuk **kasus hapus dengan dua anak**, pakai analogi **struktur organisasi**: seorang manajer punya dua bawahan lalu mengundurkan diri. Kamu tidak bisa menaikkan keduanya ke satu kursi. Solusinya adalah **mempromosikan orang yang tingkatnya paling dekat di bawah** — yaitu bawahan paling senior di sisi kanan. Setelah analogi ini, aturan "ambil terkecil dari subtree kanan" berhenti terdengar sewenang-wenang.
`,

  latihan: [
    'Buat BST lengkap dengan fungsi sisip, cari, dan inorder. Masukkan angka 50, 30, 70, 20, 40, lalu pastikan inorder-nya menghasilkan urutan menaik.',
    'Tambahkan fungsi `tinggi()`, `jumlahSimpul()`, dan `jumlahDaun()`. Ketiganya rekursif — tentukan base case masing-masing lebih dulu sebelum menulis kodenya.',
    'Masukkan data terurut 10, 20, 30, 40, 50 ke dalam BST, lalu hitung tingginya. Bandingkan dengan memasukkan data yang sama dalam urutan acak. Jelaskan kenapa hasilnya berbeda jauh.',
    'Buat fungsi yang memeriksa apakah sebuah binary tree merupakan BST yang sah. Petunjuk: bawa batas minimum dan maksimum di setiap pemanggilan rekursif — memeriksa induk dan anak saja tidak cukup.',
    'Implementasikan penghapusan simpul untuk ketiga kasusnya. Uji dengan menghapus daun, simpul beranak satu, dan simpul beranak dua. Setiap kali, pastikan inorder-nya masih terurut.',
    'Buat fungsi yang mencari nilai terkecil dan terbesar dalam BST **tanpa** rekursi. Kenapa cukup terus ke satu arah saja?',
    'Uji pemahaman: jelaskan ulang dalam 5 menit dengan kata-katamu sendiri tentang kenapa BST bisa O(log n) tapi merosot jadi O(n). Peragakan dengan menggambar dua pohon berdampingan — satu dari data acak, satu dari data terurut.'
  ]
});

TOPICS.push({
  id: 'tree-traversal',
  judul: 'Tree Traversal (Inorder, Preorder, Postorder)',
  kategori: 'struktur-data',
  tag: ['traversal', 'inorder', 'preorder', 'postorder', 'level order', 'BFS'],
  ringkas: 'Empat cara menelusuri seluruh isi pohon — dan kenapa tiap urutan punya kegunaan berbeda.',

  fungsi: `**Mengunjungi seluruh simpul pohon dalam urutan yang sesuai kebutuhan.**

Urutan yang dipilih menentukan hasilnya, dan masing-masing punya kegunaan yang berbeda.

Terpakai di:

- **Inorder pada BST** — menghasilkan data **terurut**, dan itu cara memeriksa apakah BST-mu benar
- **Preorder** — menyalin pohon, dan menghasilkan notasi prefix
- **Postorder** — **membebaskan memori**, karena anak harus dibebaskan sebelum induknya; juga menghitung ukuran folder
- **Level-order** — menampilkan pohon per tingkat, dan BFS

Yang paling sering terpakai tanpa disadari: **postorder saat menghapus struktur bersarang**. Menghapus induk sebelum anaknya meninggalkan memori yang tidak bisa dijangkau lagi.`,

  praktik: {
    tujuan: 'Kamu bisa menulis keempat penelusuran, dan tahu urutan mana yang tepat untuk tugas apa.',
    alat: [
      'Python 3 atau C++'
    ],
    langkah: [
      { judul: 'Tulis ketiga penelusuran rekursif',
        isi: `Bedanya cuma **kapan simpul dicetak**:

- **preorder** — cetak, kiri, kanan
- **inorder** — kiri, cetak, kanan
- **postorder** — kiri, kanan, cetak

Satu baris berpindah tempat, dan hasilnya sama sekali berbeda. Tulis ketiganya berdampingan untuk melihatnya.` },
      { judul: 'Pakai inorder untuk memeriksa BST-mu',
        isi: `Jalankan inorder pada BST yang kamu bangun. Hasilnya **harus terurut menaik**.

Kalau tidak, ada yang salah pada penyisipan atau penghapusanmu.

Ini cara pemeriksaan paling cepat dan paling meyakinkan untuk BST.` },
      { judul: 'Tulis level-order dengan queue',
        isi: `Berbeda dari ketiganya, level-order **tidak rekursif**. Ia memakai queue:

masukkan akar, lalu selama queue tidak kosong: ambil satu, cetak, masukkan kedua anaknya.

Ini persis BFS, dan menghubungkan topik queue dengan pohon.` },
      { judul: 'Pakai postorder untuk membebaskan memori',
        isi: `Di C++, tulis fungsi penghapus pohon dengan postorder: hapus kiri, hapus kanan, baru hapus dirinya.

Coba dengan preorder dan lihat apa yang terjadi — kamu menghapus induk lalu mencoba mengakses anaknya lewat pointer yang sudah tidak sah.

Ini contoh nyata bahwa urutan penelusuran bukan soal selera.` },
      { judul: 'Hitung ukuran folder dengan postorder',
        isi: `Buat program yang menghitung total ukuran sebuah direktori beserta isinya.

Ukuran folder = jumlah ukuran isinya, jadi kamu **harus** menghitung anaknya dulu. Itu postorder.

Ini penerapan yang benar-benar terpakai, dan cuma butuh belasan baris.` },
      { judul: 'Bangun kembali pohon dari dua penelusuran',
        isi: `Dari hasil preorder **dan** inorder, sebuah pohon bisa dibangun kembali secara unik.

Coba dengan pohon kecil di kertas dulu. Ini soal wawancara kerja yang sangat sering muncul, dan latihan bagus untuk memahami ketiganya.` }
    ],
    cek: [
      'Inorder pada BST-mu menghasilkan urutan menaik',
      'Level-order-mu mencetak pohon per tingkat dengan benar',
      'Penghapusan pohon dengan postorder tidak menyebabkan program mati'
    ]
  },

  konsep: `
Pada array, mengunjungi seluruh isi itu jelas: mulai dari indeks 0 sampai \`n-1\`. Tapi pohon **bercabang**, sehingga muncul pertanyaan yang tidak ada pada struktur linear: **setelah selesai di sebuah simpul, harus ke kiri dulu atau ke kanan dulu? Dan kapan simpul itu sendiri diproses?**

**Traversal** adalah aturan yang menjawab pertanyaan itu — cara mengunjungi **setiap simpul tepat satu kali** dengan urutan tertentu.

Ada tiga traversal berbasis kedalaman, dan ketiganya cuma berbeda pada **kapan simpul induk diproses**:

- **Preorder** — **induk dulu**, lalu kiri, lalu kanan
- **Inorder** — kiri dulu, **induk di tengah**, lalu kanan
- **Postorder** — kiri dulu, kanan, **induk terakhir**

Perhatikan polanya: urutan **kiri sebelum kanan selalu sama**. Yang berpindah-pindah hanya posisi induknya. Karena itu namanya mudah diingat — awalan **pre**, **in**, dan **post** menunjukkan letak induk: di **depan**, di **tengah**, atau di **belakang**.

Ada satu lagi yang berbeda sendiri:

- **Level order** — mengunjungi **per tingkat**, dari atas ke bawah dan kiri ke kanan. Ini adalah **BFS** pada pohon, dan satu-satunya yang **tidak** ditulis rekursif karena butuh bantuan **queue**.

Yang penting dipahami bukan sekadar urutannya, melainkan **kegunaan masing-masing**:

- **Inorder pada BST menghasilkan data terurut menaik.** Ini yang paling sering dipakai, sekaligus cara termudah memeriksa keabsahan sebuah BST.
- **Preorder** cocok untuk **menyalin atau menyimpan** pohon, karena induk diproses lebih dulu sehingga strukturnya bisa dibangun ulang dari atas.
- **Postorder** wajib dipakai saat **menghapus pohon**, karena anak harus dibebaskan sebelum induknya. Juga dipakai untuk menghitung ekspresi matematika.
- **Level order** dipakai untuk mencari **jalur terpendek** dan menampilkan pohon per tingkat.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: 'void inorder(Node *akar) {\n    if (akar == NULL) return;   // base case WAJIB paling atas\n    inorder(akar->kiri);        // 1. seluruh subtree kiri\n    printf("%d ", akar->data);  // 2. induk\n    inorder(akar->kanan);       // 3. seluruh subtree kanan\n}',
      penjelasan: `
Perhatikan betapa ringkasnya — dan itu bukan kebetulan. Rekursi cocok untuk pohon karena **tiap cabang sebenarnya adalah pohon utuh yang lebih kecil**, jadi masalahnya memang berulang di dalam dirinya sendiri.

Yang wajib dipahami: baris \`inorder(akar->kiri)\` **tidak cuma mengunjungi satu anak**. Ia menyelesaikan **seluruh subtree kiri sampai tuntas** sebelum baris berikutnya dijalankan. Ini kesalahpahaman yang paling sering terjadi — mahasiswa mengira alurnya berpindah bolak-balik, padahal satu cabang diselesaikan penuh dulu.

Base case \`if (akar == NULL) return;\` harus berada **paling atas**, sebelum menyentuh \`akar->data\`. Kalau lupa, penelusuran yang mencapai daun akan lanjut ke \`NULL\` lalu membaca \`NULL->data\` — dan program jatuh.

Untuk mengubah ini menjadi **preorder atau postorder**, yang perlu diubah **cuma posisi baris \`printf\`**. Ketiga fungsinya identik selain itu. Tunjukkan ini saat mengajar — mahasiswa sering mengira ketiganya adalah algoritma yang benar-benar berbeda, padahal bedanya cuma satu baris yang berpindah tempat.
`
    },
    {
      bahasa: 'c',
      kode: '// Pohon:      50\n//            /  \\\n//          30    70\n//         /  \\\n//       20    40\n\n// preorder  : 50 30 20 40 70   <- induk DULU\n// inorder   : 20 30 40 50 70   <- induk TENGAH, hasilnya TERURUT\n// postorder : 20 40 30 70 50   <- induk TERAKHIR',
      penjelasan: `
Bandingkan ketiga hasilnya baik-baik, karena inilah yang paling sering keluar di ujian.

**Preorder dimulai dari 50**, yaitu root — karena induk selalu diproses lebih dulu. Sifat ini membuatnya cocok untuk **menyimpan atau menyalin** pohon: dengan membaca hasilnya dari kiri, kamu bisa membangun ulang pohonnya dari atas ke bawah.

**Inorder menghasilkan 20 30 40 50 70** — **terurut menaik**. Ini bukan kebetulan, melainkan akibat langsung dari aturan BST: semua yang lebih kecil ada di kiri dan diproses lebih dulu, baru induknya, baru yang lebih besar. Karena itu **inorder adalah cara termudah memeriksa apakah sebuah BST sah**.

**Postorder berakhir di 50**, yaitu root — karena induk diproses paling akhir. Sifat ini yang membuatnya **wajib dipakai saat menghapus pohon**: anak dibebaskan lebih dulu, sehingga saat induknya dibebaskan, pointer ke anak-anaknya sudah tidak diperlukan lagi.

Cara menghafal yang paling mudah: **perhatikan di mana root muncul di hasilnya.** Preorder menaruh root di **paling depan**, postorder di **paling belakang**, dan inorder di **tengah**. Dari situ ketiganya bisa dibedakan sekilas tanpa menghitung ulang.
`
    },
    {
      bahasa: 'c',
      kode: '// Ketiganya sama persis, hanya BARIS printf yang berpindah:\n\nvoid pre(Node *a)  { if(!a) return; printf("%d",a->data); pre(a->kiri);  pre(a->kanan); }\nvoid in(Node *a)   { if(!a) return; in(a->kiri);  printf("%d",a->data);  in(a->kanan); }\nvoid post(Node *a) { if(!a) return; post(a->kiri); post(a->kanan); printf("%d",a->data); }',
      penjelasan: `
Ditulis berdampingan begini, pola dasarnya jadi terlihat jelas: **struktur ketiganya identik**, dan yang berbeda cuma **letak baris yang memproses induknya**.

Ini fakta yang layak kamu tunjukkan langsung di kelas, karena banyak mahasiswa menghafal ketiganya sebagai tiga algoritma terpisah — padahal sebenarnya satu algoritma dengan satu baris yang dipindah-pindah.

Yang menarik, dari sudut pandang komputer **jalur penelusurannya sama persis untuk ketiganya**. Program tetap turun ke kiri sampai mentok, lalu naik, lalu ke kanan, dengan urutan langkah yang identik. Yang berbeda hanyalah **kapan simpul itu "dilaporkan"**.

Cara memvisualkannya: bayangkan kamu berjalan mengelilingi pohon mengikuti garis tepinya. Setiap simpul akan kamu lewati **tiga kali** — saat pertama tiba dari kiri, saat kembali dari subtree kiri, dan saat kembali dari subtree kanan.

- Catat pada perjumpaan **pertama** → hasilnya **preorder**
- Catat pada perjumpaan **kedua** → hasilnya **inorder**
- Catat pada perjumpaan **ketiga** → hasilnya **postorder**

Peragaan ini biasanya membuat mahasiswa berhenti menghafal dan mulai benar-benar paham.
`
    },
    {
      bahasa: 'c',
      kode: '// LEVEL ORDER: satu-satunya yang butuh QUEUE, bukan rekursi\nenqueue(akar);\nwhile (!kosong()) {\n    Node *n = dequeue();\n    printf("%d ", n->data);\n    if (n->kiri)  enqueue(n->kiri);    // anak masuk antrean\n    if (n->kanan) enqueue(n->kanan);\n}',
      penjelasan: `
Level order berbeda sendiri dari tiga yang lain, dan **rekursi tidak cocok** untuknya.

Alasannya: rekursi secara alami menelusuri **ke dalam** dulu — ia turun sedalam mungkin sebelum kembali. Padahal level order butuh yang sebaliknya, yaitu **melebar dulu**: selesaikan seluruh tingkat sebelum turun ke tingkat berikutnya.

Yang cocok untuk itu adalah **queue**, dan cara kerjanya sangat rapi:

- Simpul yang diambil dari antrean langsung dicetak
- Kedua anaknya dimasukkan ke **belakang** antrean
- Karena queue bersifat FIFO, seluruh simpul satu tingkat pasti keluar lebih dulu sebelum simpul tingkat berikutnya

Di sinilah materi **queue** yang sudah kamu pelajari terpakai secara nyata, dan bagus untuk ditunjukkan sebagai kaitan antar topik.

Perhatikan bahwa \`if (n->kiri)\` diperiksa **sebelum** dimasukkan. Tanpa pemeriksaan itu, \`NULL\` ikut masuk antrean lalu dibaca \`NULL->data\` saat keluar — dan program jatuh.

Yang perlu diketahui juga: pola ini adalah **BFS**. Algoritma yang sama persis dipakai pada graph untuk mencari **jalur terpendek**, dan itu akan kamu temui di topik Graph.
`
    },
    {
      bahasa: 'python',
      kode: "# Kegunaan tiap traversal:\n# inorder   -> data terurut, memeriksa keabsahan BST\n# preorder  -> menyalin / menyimpan pohon\n# postorder -> menghapus pohon, menghitung ekspresi\n# level     -> jalur terpendek, tampilan per tingkat",
      penjelasan: `
Bagian ini yang membedakan sekadar hafal dengan benar-benar paham, dan inilah yang layak kamu tanyakan ke mahasiswa.

**Kenapa inorder untuk data terurut?** Karena aturan BST menaruh semua yang lebih kecil di kiri. Dengan memproses kiri dulu, lalu induk, lalu kanan, urutannya otomatis menaik. Ini juga cara tercepat memeriksa keabsahan BST.

**Kenapa preorder untuk menyalin?** Karena induk diproses lebih dulu, sehingga saat membangun ulang, simpul induk sudah ada sebelum anaknya dipasang. Kalau memakai inorder, kamu tidak tahu simpul mana yang seharusnya menjadi root.

**Kenapa postorder untuk menghapus?** Karena anak harus dibebaskan **sebelum** induknya. Kalau induk dibebaskan lebih dulu, pointer menuju anak-anaknya ikut hilang dan seluruh subtree jadi tidak terjangkau — sekaligus menjadi *use after free*. Postorder juga dipakai untuk menghitung *expression tree*, karena operator baru bisa dihitung setelah kedua operandnya siap.

**Kenapa level order untuk jalur terpendek?** Karena ia memeriksa **semua yang berjarak 1 dulu**, baru yang berjarak 2, dan seterusnya. Jadi begitu targetnya ditemukan, **jalur yang dilalui dijamin yang terpendek**. Inilah dasar BFS pada graph.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;

class Node {
    public int Data;
    public Node Kiri, Kanan;
    public Node(int data) { Data = data; }
}

class Program {
    static Node Sisip(Node akar, int nilai) {
        if (akar == null) return new Node(nilai);
        if (nilai < akar.Data) akar.Kiri = Sisip(akar.Kiri, nilai);
        else                   akar.Kanan = Sisip(akar.Kanan, nilai);
        return akar;
    }

    /* ===== Ketiganya identik, hanya posisi Add yang berpindah ===== */

    static void Preorder(Node a, List<int> h) {
        if (a == null) return;
        h.Add(a.Data);                     // induk DULU
        Preorder(a.Kiri, h);
        Preorder(a.Kanan, h);
    }

    static void Inorder(Node a, List<int> h) {
        if (a == null) return;
        Inorder(a.Kiri, h);
        h.Add(a.Data);                     // induk TENGAH
        Inorder(a.Kanan, h);
    }

    static void Postorder(Node a, List<int> h) {
        if (a == null) return;
        Postorder(a.Kiri, h);
        Postorder(a.Kanan, h);
        h.Add(a.Data);                     // induk TERAKHIR
    }

    /* LEVEL ORDER: butuh QUEUE, bukan rekursi */
    static List<List<int>> PerTingkat(Node akar) {
        var hasil = new List<List<int>>();
        if (akar == null) return hasil;

        var q = new Queue<Node>();
        q.Enqueue(akar);

        while (q.Count > 0) {
            int n = q.Count;               // catat DULU jumlah tingkat ini
            var tingkat = new List<int>();
            for (int i = 0; i < n; i++) {
                Node k = q.Dequeue();
                tingkat.Add(k.Data);
                if (k.Kiri != null)  q.Enqueue(k.Kiri);    // cek null dulu
                if (k.Kanan != null) q.Enqueue(k.Kanan);
            }
            hasil.Add(tingkat);
        }
        return hasil;
    }

    /* Inorder TANPA rekursi — membuktikan rekursi memang memakai stack */
    static List<int> InorderIteratif(Node akar) {
        var hasil = new List<int>();
        var tumpuk = new Stack<Node>();
        Node kini = akar;

        while (kini != null || tumpuk.Count > 0) {
            while (kini != null) {         // turun sejauh mungkin ke kiri
                tumpuk.Push(kini);
                kini = kini.Kiri;
            }
            kini = tumpuk.Pop();
            hasil.Add(kini.Data);          // proses induk
            kini = kini.Kanan;             // lalu ke kanan
        }
        return hasil;
    }

    static void Main() {
        Node akar = null;
        foreach (int x in new[] { 50, 30, 70, 20, 40, 60, 80 }) akar = Sisip(akar, x);

        var a = new List<int>(); Preorder(akar, a);
        var b = new List<int>(); Inorder(akar, b);
        var c = new List<int>(); Postorder(akar, c);

        Console.WriteLine($"preorder  : {string.Join(" ", a)}   <- induk dulu");
        Console.WriteLine($"inorder   : {string.Join(" ", b)}   <- TERURUT");
        Console.WriteLine($"postorder : {string.Join(" ", c)}   <- induk terakhir");

        Console.WriteLine("\nper tingkat:");
        int t = 0;
        foreach (var tingkat in PerTingkat(akar))
            Console.WriteLine($"  tingkat {t++} : {string.Join(" ", tingkat)}");

        Console.WriteLine($"\ninorder iteratif : {string.Join(" ", InorderIteratif(akar))}");
        Console.WriteLine("-> hasilnya sama, membuktikan rekursi memakai stack");

        Console.WriteLine("\nKEGUNAAN:");
        Console.WriteLine("  inorder   -> data terurut, memeriksa keabsahan BST");
        Console.WriteLine("  preorder  -> menyalin / menyimpan pohon");
        Console.WriteLine("  postorder -> menghapus pohon, menghitung ekspresi");
        Console.WriteLine("  level     -> jalur terpendek, tampilan per tingkat");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static class Node {
        int data;
        Node kiri, kanan;
        Node(int data) { this.data = data; }
    }

    static Node sisip(Node akar, int nilai) {
        if (akar == null) return new Node(nilai);
        if (nilai < akar.data) akar.kiri = sisip(akar.kiri, nilai);
        else                   akar.kanan = sisip(akar.kanan, nilai);
        return akar;
    }

    /* ===== Ketiganya identik, hanya posisi add yang berpindah ===== */

    static void preorder(Node a, List<Integer> h) {
        if (a == null) return;
        h.add(a.data);                     // induk DULU
        preorder(a.kiri, h);
        preorder(a.kanan, h);
    }

    static void inorder(Node a, List<Integer> h) {
        if (a == null) return;
        inorder(a.kiri, h);
        h.add(a.data);                     // induk TENGAH
        inorder(a.kanan, h);
    }

    static void postorder(Node a, List<Integer> h) {
        if (a == null) return;
        postorder(a.kiri, h);
        postorder(a.kanan, h);
        h.add(a.data);                     // induk TERAKHIR
    }

    /* LEVEL ORDER memakai Queue */
    static List<List<Integer>> perTingkat(Node akar) {
        List<List<Integer>> hasil = new ArrayList<>();
        if (akar == null) return hasil;

        Queue<Node> q = new ArrayDeque<>();
        q.offer(akar);

        while (!q.isEmpty()) {
            int n = q.size();              // catat DULU jumlah tingkat ini
            List<Integer> tingkat = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                Node k = q.poll();
                tingkat.add(k.data);
                if (k.kiri != null)  q.offer(k.kiri);      // cek null dulu
                if (k.kanan != null) q.offer(k.kanan);
            }
            hasil.add(tingkat);
        }
        return hasil;
    }

    /* Inorder TANPA rekursi, memakai stack manual */
    static List<Integer> inorderIteratif(Node akar) {
        List<Integer> hasil = new ArrayList<>();
        Deque<Node> tumpuk = new ArrayDeque<>();
        Node kini = akar;

        while (kini != null || !tumpuk.isEmpty()) {
            while (kini != null) {         // turun sejauh mungkin ke kiri
                tumpuk.push(kini);
                kini = kini.kiri;
            }
            kini = tumpuk.pop();
            hasil.add(kini.data);          // proses induk
            kini = kini.kanan;             // lalu ke kanan
        }
        return hasil;
    }

    /* Menghapus pohon WAJIB postorder — walau di Java diurus otomatis */
    static void bebaskan(Node a) {
        if (a == null) return;
        bebaskan(a.kiri);                  // anak dulu
        bebaskan(a.kanan);
        a.kiri = a.kanan = null;           // induk terakhir
    }

    public static void main(String[] args) {
        Node akar = null;
        for (int x : new int[] { 50, 30, 70, 20, 40, 60, 80 }) akar = sisip(akar, x);

        List<Integer> a = new ArrayList<>(); preorder(akar, a);
        List<Integer> b = new ArrayList<>(); inorder(akar, b);
        List<Integer> c = new ArrayList<>(); postorder(akar, c);

        System.out.println("preorder  : " + a + "   <- induk dulu");
        System.out.println("inorder   : " + b + "   <- TERURUT");
        System.out.println("postorder : " + c + "   <- induk terakhir");

        System.out.println("\nper tingkat:");
        int t = 0;
        for (List<Integer> tingkat : perTingkat(akar))
            System.out.println("  tingkat " + (t++) + " : " + tingkat);

        System.out.println("\ninorder iteratif : " + inorderIteratif(akar));
        System.out.println("-> hasilnya sama, membuktikan rekursi memakai stack");

        System.out.println("\nCatatan Java: penghapusan diurus garbage collector,");
        System.out.println("jadi postorder tidak wajib untuk membebaskan memori.");
        System.out.println("Tapi urutannya tetap penting untuk kasus lain,");
        System.out.println("misalnya menghitung expression tree.");
    }
}`,

    js: String.raw`class Node {
    constructor(data) {
        this.data = data;
        this.kiri = null;
        this.kanan = null;
    }
}

function sisip(akar, nilai) {
    if (akar === null) return new Node(nilai);
    if (nilai < akar.data) akar.kiri = sisip(akar.kiri, nilai);
    else                   akar.kanan = sisip(akar.kanan, nilai);
    return akar;
}

/* ===== Ketiganya identik, hanya posisi push yang berpindah ===== */

function preorder(a, hasil = []) {
    if (a !== null) {
        hasil.push(a.data);                // induk DULU
        preorder(a.kiri, hasil);
        preorder(a.kanan, hasil);
    }
    return hasil;
}

function inorder(a, hasil = []) {
    if (a !== null) {
        inorder(a.kiri, hasil);
        hasil.push(a.data);                // induk TENGAH
        inorder(a.kanan, hasil);
    }
    return hasil;
}

function postorder(a, hasil = []) {
    if (a !== null) {
        postorder(a.kiri, hasil);
        postorder(a.kanan, hasil);
        hasil.push(a.data);                // induk TERAKHIR
    }
    return hasil;
}

/* LEVEL ORDER: butuh queue, bukan rekursi */
function levelOrder(akar) {
    if (akar === null) return [];
    const hasil = [], antrean = [akar];
    let depan = 0;                         // penanda, supaya tetap O(1)

    while (depan < antrean.length) {
        const n = antrean.length - depan;  // catat DULU jumlah tingkat ini
        const tingkat = [];
        for (let i = 0; i < n; i++) {
            const k = antrean[depan++];
            tingkat.push(k.data);
            if (k.kiri)  antrean.push(k.kiri);     // cek null dulu
            if (k.kanan) antrean.push(k.kanan);
        }
        hasil.push(tingkat);
    }
    return hasil;
}

/* Inorder TANPA rekursi, memakai stack manual */
function inorderIteratif(akar) {
    const hasil = [], tumpuk = [];
    let kini = akar;

    while (kini !== null || tumpuk.length > 0) {
        while (kini !== null) {            // turun sejauh mungkin ke kiri
            tumpuk.push(kini);
            kini = kini.kiri;
        }
        kini = tumpuk.pop();
        hasil.push(kini.data);             // proses induk
        kini = kini.kanan;                 // lalu ke kanan
    }
    return hasil;
}

let akar = null;
for (const x of [50, 30, 70, 20, 40, 60, 80]) akar = sisip(akar, x);

console.log("Pohon:");
console.log("        50");
console.log("       /  \\");
console.log("     30    70");
console.log("    /  \\  /  \\");
console.log("  20   40 60  80");
console.log();

console.log("preorder  :", preorder(akar).join(" "), "  <- induk dulu");
console.log("inorder   :", inorder(akar).join(" "), "  <- TERURUT");
console.log("postorder :", postorder(akar).join(" "), "  <- induk terakhir");

console.log("\nper tingkat:");
levelOrder(akar).forEach(function (tingkat, i) {
    console.log("  tingkat " + i + " : " + tingkat.join(" "));
});

console.log("\ninorder iteratif :", inorderIteratif(akar).join(" "));
console.log("-> hasilnya sama, membuktikan rekursi memakai stack");

// Membuktikan inorder pada BST menghasilkan urutan menaik
const urut = inorder(akar);
const naik = urut.every(function (v, i) { return i === 0 || urut[i - 1] <= v; });
console.log("\ninorder terurut menaik?", naik, "-> BST sah");

console.log("\nCARA MENGHAFAL:");
console.log("  lihat di mana ROOT muncul di hasilnya —");
console.log("  paling depan = preorder, tengah = inorder, belakang = postorder");`,

    c: String.raw`#include <stdio.h>
#include <stdlib.h>
#define MAKS 100

typedef struct Node {
    int data;
    struct Node *kiri, *kanan;
} Node;

Node *buatNode(int nilai) {
    Node *b = (Node *)malloc(sizeof(Node));
    b->data = nilai; b->kiri = b->kanan = NULL;
    return b;
}

Node *sisip(Node *akar, int nilai) {
    if (akar == NULL) return buatNode(nilai);
    if (nilai < akar->data) akar->kiri  = sisip(akar->kiri, nilai);
    else                    akar->kanan = sisip(akar->kanan, nilai);
    return akar;
}

/* ===== Ketiganya identik, hanya posisi printf yang berpindah ===== */

void preorder(Node *akar) {
    if (akar == NULL) return;
    printf("%d ", akar->data);      // induk DULU
    preorder(akar->kiri);
    preorder(akar->kanan);
}

void inorder(Node *akar) {
    if (akar == NULL) return;
    inorder(akar->kiri);
    printf("%d ", akar->data);      // induk TENGAH
    inorder(akar->kanan);
}

void postorder(Node *akar) {
    if (akar == NULL) return;
    postorder(akar->kiri);
    postorder(akar->kanan);
    printf("%d ", akar->data);      // induk TERAKHIR
}

/* ===== LEVEL ORDER: butuh queue, bukan rekursi ===== */
void levelOrder(Node *akar) {
    if (akar == NULL) return;

    Node *antrean[MAKS];
    int depan = 0, belakang = 0;

    antrean[belakang++] = akar;

    while (depan < belakang) {
        Node *n = antrean[depan++];             // dequeue
        printf("%d ", n->data);
        if (n->kiri)  antrean[belakang++] = n->kiri;   // cek NULL dulu
        if (n->kanan) antrean[belakang++] = n->kanan;
    }
}

/* Level order yang memisahkan tiap tingkat */
void perTingkat(Node *akar) {
    if (akar == NULL) return;
    Node *antrean[MAKS];
    int depan = 0, belakang = 0, tingkat = 0;
    antrean[belakang++] = akar;

    while (depan < belakang) {
        int jumlahTingkatIni = belakang - depan;    // kunci: catat DULU
        printf("  tingkat %d : ", tingkat++);
        for (int i = 0; i < jumlahTingkatIni; i++) {
            Node *n = antrean[depan++];
            printf("%d ", n->data);
            if (n->kiri)  antrean[belakang++] = n->kiri;
            if (n->kanan) antrean[belakang++] = n->kanan;
        }
        printf("\n");
    }
}

/* Menghapus pohon WAJIB postorder */
void bebaskan(Node *akar) {
    if (akar == NULL) return;
    bebaskan(akar->kiri);           // anak dulu
    bebaskan(akar->kanan);
    printf("bebaskan %d\n", akar->data);
    free(akar);                     // induk terakhir
}

int main(void) {
    Node *akar = NULL;
    int nilai[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) akar = sisip(akar, nilai[i]);

    printf("Pohon:\n");
    printf("        50\n");
    printf("       /  \\\n");
    printf("     30    70\n");
    printf("    /  \\  /  \\\n");
    printf("  20   40 60  80\n\n");

    printf("preorder  : "); preorder(akar);
    printf("  <- induk dulu\n");

    printf("inorder   : "); inorder(akar);
    printf("  <- TERURUT\n");

    printf("postorder : "); postorder(akar);
    printf("  <- induk terakhir\n");

    printf("levelorder: "); levelOrder(akar);
    printf("  <- per tingkat\n");

    printf("\nDipisah per tingkat:\n");
    perTingkat(akar);

    printf("\nMenghapus pohon (postorder, anak dulu):\n");
    bebaskan(akar);

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node *kiri, *kanan;
    Node(int d) : data(d), kiri(nullptr), kanan(nullptr) {}
};

Node *sisip(Node *akar, int nilai) {
    if (!akar) return new Node(nilai);
    if (nilai < akar->data) akar->kiri  = sisip(akar->kiri, nilai);
    else                    akar->kanan = sisip(akar->kanan, nilai);
    return akar;
}

void preorder(Node *a, vector<int> &h)  { if(!a) return; h.push_back(a->data); preorder(a->kiri,h); preorder(a->kanan,h); }
void inorder(Node *a, vector<int> &h)   { if(!a) return; inorder(a->kiri,h);  h.push_back(a->data);  inorder(a->kanan,h); }
void postorder(Node *a, vector<int> &h) { if(!a) return; postorder(a->kiri,h); postorder(a->kanan,h); h.push_back(a->data); }

/* Level order memakai std::queue */
vector<vector<int>> perTingkat(Node *akar) {
    vector<vector<int>> hasil;
    if (!akar) return hasil;

    queue<Node *> q;
    q.push(akar);

    while (!q.empty()) {
        int n = q.size();               // catat DULU jumlah simpul tingkat ini
        vector<int> tingkat;
        for (int i = 0; i < n; i++) {
            Node *k = q.front(); q.pop();
            tingkat.push_back(k->data);
            if (k->kiri)  q.push(k->kiri);
            if (k->kanan) q.push(k->kanan);
        }
        hasil.push_back(tingkat);
    }
    return hasil;
}

/* Inorder TANPA rekursi, memakai stack secara manual.
   Ini memperlihatkan bahwa rekursi sebenarnya memakai stack juga. */
vector<int> inorderIteratif(Node *akar) {
    vector<int> hasil;
    vector<Node *> tumpuk;
    Node *kini = akar;

    while (kini != nullptr || !tumpuk.empty()) {
        while (kini != nullptr) {       // turun sejauh mungkin ke kiri
            tumpuk.push_back(kini);
            kini = kini->kiri;
        }
        kini = tumpuk.back(); tumpuk.pop_back();
        hasil.push_back(kini->data);    // proses induk
        kini = kini->kanan;             // lalu ke kanan
    }
    return hasil;
}

void cetak(const string &label, const vector<int> &v) {
    cout << label;
    for (int x : v) cout << x << " ";
    cout << endl;
}

int main() {
    Node *akar = nullptr;
    for (int x : {50, 30, 70, 20, 40, 60, 80}) akar = sisip(akar, x);

    vector<int> a, b, c;
    preorder(akar, a);  cetak("preorder  : ", a);
    inorder(akar, b);   cetak("inorder   : ", b);
    postorder(akar, c); cetak("postorder : ", c);

    cout << "\nper tingkat:" << endl;
    int t = 0;
    for (const auto &tingkat : perTingkat(akar)) {
        cout << "  tingkat " << t++ << " : ";
        for (int x : tingkat) cout << x << " ";
        cout << endl;
    }

    cetak("\ninorder iteratif (pakai stack) : ", inorderIteratif(akar));
    cout << "-> hasilnya sama, membuktikan rekursi memang memakai stack" << endl;

    return 0;
}`,

    python: String.raw`from collections import deque


class Node:
    def __init__(self, data):
        self.data = data
        self.kiri = None
        self.kanan = None


def sisip(akar, nilai):
    if akar is None:
        return Node(nilai)
    if nilai < akar.data:
        akar.kiri = sisip(akar.kiri, nilai)
    else:
        akar.kanan = sisip(akar.kanan, nilai)
    return akar


# ===== Ketiganya identik, hanya posisi append yang berpindah =====

def preorder(akar, hasil=None):
    if hasil is None:
        hasil = []
    if akar:
        hasil.append(akar.data)         # induk DULU
        preorder(akar.kiri, hasil)
        preorder(akar.kanan, hasil)
    return hasil


def inorder(akar, hasil=None):
    if hasil is None:
        hasil = []
    if akar:
        inorder(akar.kiri, hasil)
        hasil.append(akar.data)         # induk TENGAH
        inorder(akar.kanan, hasil)
    return hasil


def postorder(akar, hasil=None):
    if hasil is None:
        hasil = []
    if akar:
        postorder(akar.kiri, hasil)
        postorder(akar.kanan, hasil)
        hasil.append(akar.data)         # induk TERAKHIR
    return hasil


def level_order(akar):
    """Satu-satunya yang butuh queue, bukan rekursi."""
    if akar is None:
        return []
    hasil, antrean = [], deque([akar])
    while antrean:
        n = antrean.popleft()           # dequeue
        hasil.append(n.data)
        if n.kiri:                      # cek None dulu
            antrean.append(n.kiri)
        if n.kanan:
            antrean.append(n.kanan)
    return hasil


def per_tingkat(akar):
    if akar is None:
        return []
    hasil, antrean = [], deque([akar])
    while antrean:
        n = len(antrean)                # catat DULU jumlah simpul tingkat ini
        tingkat = []
        for _ in range(n):
            k = antrean.popleft()
            tingkat.append(k.data)
            if k.kiri:
                antrean.append(k.kiri)
            if k.kanan:
                antrean.append(k.kanan)
        hasil.append(tingkat)
    return hasil


def inorder_iteratif(akar):
    """Tanpa rekursi — membuktikan rekursi memang memakai stack."""
    hasil, tumpuk, kini = [], [], akar
    while kini is not None or tumpuk:
        while kini is not None:         # turun sejauh mungkin ke kiri
            tumpuk.append(kini)
            kini = kini.kiri
        kini = tumpuk.pop()
        hasil.append(kini.data)         # proses induk
        kini = kini.kanan               # lalu ke kanan
    return hasil


akar = None
for x in [50, 30, 70, 20, 40, 60, 80]:
    akar = sisip(akar, x)

print("Pohon:")
print("        50")
print("       /  \\")
print("     30    70")
print("    /  \\  /  \\")
print("  20   40 60  80")
print()

print("preorder  :", preorder(akar),  " <- induk dulu")
print("inorder   :", inorder(akar),   " <- TERURUT")
print("postorder :", postorder(akar), " <- induk terakhir")
print("levelorder:", level_order(akar), " <- per tingkat")

print("\nper tingkat:")
for i, t in enumerate(per_tingkat(akar)):
    print(f"  tingkat {i} : {t}")

print("\ninorder iteratif :", inorder_iteratif(akar))
print("-> sama dengan versi rekursif")

# Membuktikan inorder = cara memeriksa keabsahan BST
hasil = inorder(akar)
print("\ninorder terurut?", hasil == sorted(hasil), "-> BST sah")`
  },

  output: `Pohon:
        50
       /  \
     30    70
    /  \  /  \
  20   40 60  80

preorder  : 50 30 20 40 70 60 80   <- induk dulu
inorder   : 20 30 40 50 60 70 80   <- TERURUT
postorder : 20 40 30 60 80 70 50   <- induk terakhir
levelorder: 50 30 70 20 40 60 80   <- per tingkat

Dipisah per tingkat:
  tingkat 0 : 50
  tingkat 1 : 30 70
  tingkat 2 : 20 40 60 80`,

  kompleksitas: {
    tabel: [
      { operasi: 'Preorder / Inorder / Postorder', waktu: 'O(n)', memori: 'O(tinggi)' },
      { operasi: 'Level order (BFS)', waktu: 'O(n)', memori: 'O(lebar)' },
      { operasi: 'Memori — pohon seimbang', waktu: '—', memori: 'O(log n)' },
      { operasi: 'Memori — pohon miring', waktu: '—', memori: 'O(n)' },
      { operasi: 'Level order — tingkat terbawah', waktu: '—', memori: 'O(n/2)' },
      { operasi: 'Inorder iteratif (pakai stack)', waktu: 'O(n)', memori: 'O(tinggi)' }
    ],
    intuisi: `
**Kenapa semua traversal O(n)?** Karena tugasnya memang **mengunjungi setiap simpul tepat satu kali** — tidak ada yang terlewat, dan tidak ada yang dikunjungi dua kali. Jadi apa pun urutannya, jumlah kunjungannya selalu sama dengan jumlah simpulnya. Yang berbeda hanya urutan, bukan biaya.

**Kenapa memorinya bergantung pada tinggi, bukan jumlah simpul?** Karena traversal rekursif menyimpan jejak di call stack, dan yang tersimpan hanyalah **jalur dari root sampai simpul yang sedang dikunjungi** — bukan seluruh pohon. Pada pohon seimbang, jalur itu panjangnya sekitar log n. Pada **pohon miring**, jalurnya sepanjang n, dan di situlah risiko **stack overflow** muncul untuk data besar.

**Kenapa level order memorinya berdasarkan lebar, bukan tinggi?** Karena queue-nya menampung seluruh simpul **satu tingkat sekaligus**. Tingkat terbawah pohon seimbang berisi sekitar **separuh dari seluruh simpul**, sehingga memorinya bisa mencapai O(n/2) — yaitu O(n). Ini kebalikan dari traversal rekursif: **DFS hemat memori pada pohon lebar, BFS hemat memori pada pohon dalam.**

**Kenapa versi iteratif tetap O(tinggi)?** Karena ia memakai stack secara manual untuk menyimpan jalur yang sama. Ini justru membuktikan hal penting: **rekursi sebenarnya memakai stack juga**, hanya saja diurus otomatis oleh sistem. Versi iteratif berguna ketika pohonnya sangat dalam dan call stack tidak cukup.
`
  },

  kesalahanUmum: [
    {
      salah: 'Menaruh base case setelah mengakses data: `printf("%d", akar->data); if (akar == NULL) return;`',
      kenapa: 'Urutannya terbalik. Saat penelusuran mencapai anak dari sebuah daun, `akar` bernilai `NULL` dan `akar->data` dibaca **sebelum** sempat dijaga. Program langsung jatuh dengan *segmentation fault*.',
      benar: 'Selalu letakkan `if (akar == NULL) return;` sebagai **baris pertama**, sebelum menyentuh isi simpulnya.'
    },
    {
      salah: 'Menghapus pohon dengan urutan preorder: `free(akar); bebaskan(akar->kiri);`',
      kenapa: 'Setelah induknya dibebaskan, pointer `kiri` dan `kanan` di dalamnya sudah tidak berlaku. Membacanya adalah *use after free* — seluruh subtree jadi tidak terjangkau, dan program bisa jatuh atau merusak memori lain diam-diam.',
      benar: 'Selalu pakai **postorder** untuk menghapus: bebaskan anak kiri, anak kanan, baru induknya. Inilah alasan nyata kenapa postorder penting, bukan sekadar hafalan.'
    },
    {
      salah: 'Memasukkan simpul ke queue tanpa memeriksa `NULL` lebih dulu.',
      kenapa: 'Anak yang bernilai `NULL` ikut masuk antrean, lalu saat keluar dibaca `NULL->data`. Program jatuh — dan gejalanya muncul di tengah penelusuran, bukan di awal, sehingga terasa membingungkan.',
      benar: 'Periksa dulu: `if (n->kiri) enqueue(n->kiri);`. Berlaku untuk kedua anaknya.'
    },
    {
      salah: 'Pada level order per tingkat, membaca ukuran antrean di dalam perulangan.',
      kenapa: 'Ukuran antrean **berubah terus** karena anak-anak baru ikut dimasukkan saat perulangan berjalan. Akibatnya batas perulangannya ikut bergeser, dan simpul dari tingkat berikutnya tercampur ke tingkat yang sedang diproses.',
      benar: 'Catat jumlahnya **sebelum** perulangan dimulai: `int n = q.size();` lalu ulangi tepat `n` kali. Inilah kunci memisahkan tingkat dengan benar.'
    },
    {
      salah: 'Mengira inorder selalu menghasilkan data terurut untuk semua binary tree.',
      kenapa: 'Sifat terurut itu hanya berlaku pada **BST**, karena berasal dari aturan besar-kecilnya. Pada binary tree biasa yang tidak punya aturan itu, inorder tetap mengunjungi semua simpul tapi hasilnya acak.',
      benar: 'Ingat kaitannya: **inorder terurut ⟺ pohonnya BST yang sah**. Justru karena itu inorder bisa dipakai sebagai alat pemeriksa keabsahan BST.'
    },
    {
      salah: 'Memakai traversal rekursif pada pohon yang sangat dalam.',
      kenapa: 'Tiap tingkat menempati satu ruang di call stack. Pada pohon miring berisi ratusan ribu simpul, kedalamannya mencapai n dan menyebabkan **stack overflow**. Di Python bahkan lebih cepat terjadi karena batas rekursinya hanya sekitar 1000.',
      benar: 'Gunakan versi iteratif yang memakai stack manual, atau pastikan pohonnya seimbang sehingga kedalamannya cuma sekitar log n.'
    }
  ],

  analogi: `
Analogi terbaik untuk ketiga traversal berbasis kedalaman adalah **berjalan mengelilingi tepi pohon**.

Gambar pohonnya di papan tulis, lalu tarik satu garis yang mengelilingi seluruh bentuknya — turun di sisi kiri, memutari tiap simpul, naik lagi di sisi kanan. Sekarang tunjukkan bahwa **setiap simpul dilewati tepat tiga kali** oleh garis itu: saat pertama tiba, saat kembali dari kiri, dan saat kembali dari kanan.

Dari situ ketiganya jadi satu gagasan, bukan tiga hafalan:

- Catat pada perjumpaan **pertama** → **preorder**
- Catat pada perjumpaan **kedua** → **inorder**
- Catat pada perjumpaan **ketiga** → **postorder**

Untuk membedakan **level order**, pakai perbandingan yang mudah dibayangkan: traversal biasa itu seperti **menjelajahi gua** — masuk sedalam mungkin dulu, baru kembali dan mencoba cabang lain. Level order itu seperti **air yang menyebar** — meratakan satu lapis dulu sebelum turun ke lapis berikutnya.

Untuk kegunaannya, pakai contoh yang terasa nyata:

- **Postorder = membongkar rak buku.** Kamu harus mengeluarkan bukunya dulu sebelum raknya bisa dibongkar. Tidak mungkin sebaliknya — dan itulah kenapa menghapus pohon wajib postorder.
- **Preorder = mencatat struktur folder.** Nama foldernya ditulis dulu, baru isinya menjorok ke dalam. Persis seperti daftar isi buku.
- **Inorder pada BST = membaca daftar terurut.** Tunjukkan dengan angka sungguhan supaya sifat terurutnya terlihat, bukan cuma diklaim.

Cara menghafal yang paling ringkas untuk ujian: **lihat di mana root muncul di hasilnya.** Paling depan berarti preorder, paling belakang berarti postorder, di tengah berarti inorder. Satu kalimat ini biasanya cukup menyelamatkan mahasiswa saat ujian.
`,

  latihan: [
    'Buat BST dari angka 50, 30, 70, 20, 40, 60, 80, lalu tampilkan hasil preorder, inorder, postorder, dan level order. Pastikan inorder-nya terurut.',
    'Tanpa menjalankan program, tulis hasil ketiga traversal untuk pohon dengan root 8, anak kiri 3, anak kanan 10, dan cucu 1, 6, 14. Setelah itu buktikan dengan kode.',
    'Buat fungsi level order yang **memisahkan tiap tingkat** ke baris berbeda. Petunjuk: catat jumlah simpul di antrean **sebelum** perulangan tingkat dimulai.',
    'Tulis fungsi penghapus pohon memakai preorder (sengaja salah), jalankan, lalu catat apa yang terjadi. Setelah itu perbaiki dengan postorder dan jelaskan sebabnya.',
    'Buat fungsi inorder **tanpa rekursi** memakai stack manual. Bandingkan hasilnya dengan versi rekursif — kenapa keduanya bisa sama persis?',
    'Buat fungsi yang menampilkan pohon secara visual (miring 90 derajat) memakai traversal terbalik: kanan, induk, kiri, dengan indentasi sesuai kedalaman.',
    'Uji pemahaman: rancang peragaan 5 menit dengan menggambar garis mengelilingi pohon di kertas. Targetnya, kamu bisa menyimpulkan sendiri bahwa ketiga traversal cuma berbeda pada perjumpaan ke berapa simpul itu dicatat.'
  ]
});

TOPICS.push({
  id: 'heap',
  judul: 'Heap (Min-Heap & Max-Heap)',
  kategori: 'struktur-data',
  tag: ['heap', 'min-heap', 'max-heap', 'priority queue', 'heapify', 'complete binary tree'],
  ringkas: 'Pohon yang selalu menyimpan nilai ekstrem di puncak — mesin di balik priority queue.',

  fungsi: `**Mengambil nilai terbesar atau terkecil berulang kali dengan cepat.**

Terpakai di:

- **Priority queue** — antrean berdasarkan kepentingan, bukan kedatangan
- **Dijkstra** — memilih simpul terdekat berikutnya, dan itu yang membuatnya cepat
- **Penjadwalan** — memilih tugas berprioritas tertinggi
- **Mencari K terbesar** — sepuluh produk terlaris dari sejuta data, tanpa mengurutkan semuanya
- **Heap Sort** — pengurutan \`O(n log n)\` tanpa memori tambahan

Yang paling sering terpakai dan paling menghemat: **mencari K terbesar**. Mengurutkan sejuta data untuk mengambil sepuluh teratas itu boros; dengan heap berukuran sepuluh, kamu cukup satu kali telusur.`,

  praktik: {
    tujuan: `Kamu bisa memakai heap untuk mencari K terbesar secara efisien, dan memahami kenapa ia disimpan dalam array.`,
    alat: [
      'Python 3 dengan modul `heapq`'
    ],
    langkah: [
      { judul: 'Pahami penyimpanannya dalam array',
        isi: `Heap adalah pohon lengkap, jadi bisa disimpan dalam array tanpa pointer sama sekali:

- anak kiri dari indeks i ada di \`2i + 1\`
- anak kanan di \`2i + 2\`
- induk di \`(i - 1) // 2\`

Gambar sebuah heap kecil di kertas dan periksa rumus ini pada tiap simpulnya.` },
      { judul: 'Pakai heapq bawaan Python',
        isi: `\`heapq\` menyediakan **min-heap**:

- \`heapq.heappush(h, x)\`
- \`heapq.heappop(h)\` mengambil yang **terkecil**

Untuk max-heap, masukkan nilainya sebagai **negatif** — trik yang lazim dan lebih sederhana daripada menulis heap sendiri.` },
      { judul: 'Cari sepuluh terbesar dari sejuta data',
        isi: `Bandingkan dua cara:

- urutkan semuanya lalu ambil sepuluh terakhir
- pakai heap berukuran sepuluh: masukkan tiap elemen, buang yang terkecil kalau ukurannya lewat sepuluh

Ukur keduanya. Cara kedua jauh lebih cepat, dan memakai memori jauh lebih sedikit.

Atau langsung: \`heapq.nlargest(10, data)\`.` },
      { judul: 'Tulis heapify sendiri',
        isi: `Implementasikan \`sift_down\` dan \`sift_up\`, lalu bangun heap dari array acak.

Periksa hasilnya: untuk setiap indeks i, nilainya harus tidak lebih besar dari kedua anaknya.

Menulis pemeriksa sifat heap ini adalah cara terbaik memastikan implementasimu benar.` },
      { judul: 'Pakai heap untuk prioritas nyata',
        isi: `Simpan tuple \`(prioritas, data)\` ke dalam heap. Python membandingkan elemen pertama lebih dulu.

Kalau prioritasnya sama, ia membandingkan elemen kedua — dan itu bisa gagal kalau datanya tidak bisa dibandingkan.

Solusinya: sisipkan nomor urut di tengah, menjadi \`(prioritas, urutan, data)\`.` },
      { judul: 'Terapkan pada Dijkstra',
        isi: `Di Materi Pelengkap kamu akan memakai heap untuk memilih simpul terdekat berikutnya.

Tanpa heap, Dijkstra butuh \`O(V²)\`. Dengan heap, ia menjadi \`O((V + E) log V)\`.

Ini contoh paling jelas bahwa memilih struktur data yang tepat mengubah kelas kompleksitas algoritmanya.` }
    ],
    cek: [
      'Rumus indeks anak dan induk cocok saat kamu periksa pada heap gambaranmu',
      'Mencari sepuluh terbesar dengan heap terbukti lebih cepat daripada mengurutkan semuanya',
      'Pemeriksa sifat heap-mu tidak menemukan pelanggaran setelah heapify'
    ]
  },

  konsep: `
Bayangkan kamu perlu berulang kali mengambil **nilai terkecil** dari sekumpulan data yang terus berubah. Pilihan yang sudah kamu kenal semuanya kurang pas:

- **Array tak terurut** — mengambil yang terkecil butuh O(n) karena harus diperiksa semua
- **Array terurut** — mengambilnya O(1), tapi **menyisipkan** data baru butuh O(n) untuk menggeser
- **BST** — bisa O(log n), tapi bisa merosot jadi O(n) kalau pohonnya miring

**Heap** menyelesaikan persoalan ini dengan satu gagasan: **jangan urutkan semuanya, cukup pastikan yang paling ekstrem selalu di puncak.**

Heap adalah **complete binary tree** — pohon biner yang terisi penuh dari kiri ke kanan di setiap tingkat, dan hanya tingkat terakhir yang boleh belum penuh. Sifat inilah yang menjamin tingginya **selalu** sekitar log n, sehingga heap **tidak bisa menjadi miring** seperti BST.

Aturannya cuma satu, dan berlaku di setiap simpul:

- **Min-heap** — nilai induk **selalu lebih kecil** dari kedua anaknya. Akibatnya nilai **terkecil** pasti berada di root
- **Max-heap** — nilai induk **selalu lebih besar** dari anaknya. Nilai **terbesar** ada di root

Perhatikan bedanya dengan BST, karena ini paling sering disalahpahami: **heap tidak terurut.** Aturannya hanya mengatur hubungan **induk dengan anaknya**, bukan hubungan kiri dengan kanan. Jadi anak kiri boleh lebih besar dari anak kanan, dan itu sah. **Yang dijamin hanyalah nilai di root.**

Karena itu heap **tidak berguna** untuk mencari nilai sembarang — itu tetap O(n). Ia hanya unggul untuk satu hal, dan sangat unggul di situ: **mengambil nilai paling ekstrem berulang kali.**

Yang membuat heap istimewa, ia biasanya **disimpan dalam array biasa**, bukan dengan node dan pointer. Karena bentuknya selalu rapat tanpa celah, posisi induk dan anak bisa **dihitung langsung** dari indeksnya — sehingga tidak perlu pointer sama sekali.

Penerapan utamanya: **priority queue**, algoritma **Dijkstra** untuk jalur terpendek, penjadwalan tugas, dan **heap sort**.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '// Heap disimpan di ARRAY, tanpa pointer sama sekali\n// indeks : 0   1   2   3   4   5\n// isi    : 10  20  15  40  30  25\n\ninduk(i)      = (i - 1) / 2\nanakKiri(i)   = 2 * i + 1\nanakKanan(i)  = 2 * i + 2',
      penjelasan: `
Inilah trik utama heap: **struktur pohonnya tidak perlu disimpan sama sekali** — ia bisa dihitung.

Ini hanya mungkin karena heap berupa *complete binary tree*, yaitu terisi rapat dari kiri ke kanan **tanpa celah**. Kalau ada satu saja lubang di tengah, rumus indeksnya langsung meleset.

Runut dengan contoh di atas. Simpul di indeks 1 (nilai 20) punya anak di indeks \`2×1+1 = 3\` (nilai 40) dan \`2×1+2 = 4\` (nilai 30). Induknya ada di \`(1-1)/2 = 0\` (nilai 10). Semuanya cocok dengan gambar pohonnya.

Keuntungannya besar sekali:

- **Hemat memori** — tidak ada pointer, jadi tidak ada tambahan 8 byte per simpul seperti pada tree biasa
- **Cepat** — datanya berdempetan sehingga ramah cache prosesor, tidak seperti node tree yang tersebar

Perhatikan bahwa \`(i - 1) / 2\` memanfaatkan **pembagian bulat** yang membuang desimalnya. Indeks 3 dan 4 sama-sama menghasilkan induk \`(3-1)/2 = 1\` dan \`(4-1)/2 = 1\` — dan memang benar, keduanya bersaudara dengan induk yang sama. Jebakan pembagian bulat yang biasanya merepotkan, di sini justru dimanfaatkan.
`
    },
    {
      bahasa: 'c',
      kode: '// SISIP: taruh di ujung, lalu NAIKKAN sampai posisinya benar\nvoid sisip(int nilai) {\n    heap[n] = nilai;              // taruh di slot kosong terakhir\n    int i = n++;\n    while (i > 0 && heap[induk(i)] > heap[i]) {   // min-heap\n        tukar(&heap[i], &heap[induk(i)]);\n        i = induk(i);             // ikut naik bersama nilainya\n    }\n}',
      penjelasan: `
Proses ini disebut ***sift up*** atau *bubble up*, dan alurnya sangat masuk akal setelah dipahami.

Data baru **selalu ditaruh di slot kosong paling belakang**. Kenapa? Karena itu satu-satunya posisi yang **menjaga bentuk complete binary tree** — kalau ditaruh di tengah, bentuk rapatnya rusak dan rumus indeksnya jadi tidak berlaku.

Tapi menaruh di belakang biasanya melanggar aturan heap, karena nilainya bisa saja lebih kecil dari induknya. Karena itu nilai tadi **dinaikkan** dengan menukarnya ke atas terus-menerus sampai induknya sudah lebih kecil, atau sampai mencapai root.

Perhatikan syarat \`i > 0\` yang ditulis **lebih dulu** — ini penjagaan agar tidak mencari induk dari root. Sama seperti pada insertion sort, urutan penulisan syarat memanfaatkan *short-circuit* dan tidak boleh dibalik.

Jangan lupa baris \`i = induk(i)\`. Kalau lupa, \`i\` diam di tempat dan perulangannya berputar selamanya — persis seperti lupa menaikkan pencacah.

Biayanya **O(log n)**, karena paling jauh nilai itu naik sebanyak tinggi pohon. Dan karena heap selalu rapat, tingginya dijamin sekitar log n — **tidak seperti BST yang bisa merosot**.
`
    },
    {
      bahasa: 'c',
      kode: '// AMBIL: root diambil, elemen TERAKHIR dipindah ke root,\n// lalu diturunkan sampai posisinya benar\nint ambil(void) {\n    int hasil = heap[0];          // nilai ekstrem selalu di root\n    heap[0] = heap[--n];          // pindahkan yang terakhir ke atas\n    turunkan(0);                  // lalu perbaiki posisinya\n    return hasil;\n}',
      penjelasan: `
Mengambil dari heap butuh dua langkah, dan langkah keduanya yang sering membingungkan.

**Kenapa elemen terakhir yang dipindah ke root?** Karena setelah root diambil, ada lubang di puncak. Kalau lubang itu diisi dengan salah satu anaknya, akan muncul lubang baru di tempat anak itu, dan seterusnya — bentuk rapatnya jadi rusak. Memindahkan elemen **paling belakang** adalah satu-satunya cara yang **menjaga bentuk complete binary tree**, karena lubang yang ditinggalkannya berada di ujung.

Tentu saja elemen terakhir itu biasanya nilai yang besar, sehingga ia tidak pantas berada di puncak min-heap. Karena itu ia **diturunkan** kembali lewat proses ***sift down*** sampai menemukan tempatnya.

Perhatikan \`heap[--n]\` yang memakai pre-decrement: jumlah datanya dikurangi **lebih dulu**, sehingga indeksnya menunjuk ke elemen terakhir yang sah. Kalau ditulis \`heap[n--]\`, indeksnya menunjuk satu slot di luar data — persis jebakan yang sama seperti pada stack.

Prinsip yang berlaku sama pada sisip dan ambil: **bentuknya dijaga dulu, aturannya diperbaiki kemudian.**
`
    },
    {
      bahasa: 'c',
      kode: 'void turunkan(int i) {\n    int kecil = i;\n    int kr = 2*i+1, kn = 2*i+2;\n\n    if (kr < n && heap[kr] < heap[kecil]) kecil = kr;   // cek batas dulu\n    if (kn < n && heap[kn] < heap[kecil]) kecil = kn;\n\n    if (kecil != i) {                  // ada yang lebih kecil -> tukar\n        tukar(&heap[i], &heap[kecil]);\n        turunkan(kecil);               // lanjut turun secara rekursif\n    }\n}',
      penjelasan: `
Ini bagian tersulit heap, dan ada tiga hal yang wajib benar.

**Harus dibandingkan dengan kedua anaknya, lalu dipilih yang terkecil.** Ini penting: kalau ditukar dengan anak yang salah — misalnya asal ambil anak kiri — aturan heap justru rusak di tingkat berikutnya. Pada min-heap, penukaran harus dilakukan dengan **anak terkecil**; pada max-heap, dengan **anak terbesar**.

**\`kr < n\` harus diperiksa lebih dulu.** Tidak semua simpul punya dua anak, terutama di tingkat terakhir yang belum penuh. Tanpa penjagaan itu, program membaca slot di luar data — dan isinya sampah yang membuat perbandingannya salah tanpa error apa pun.

**\`if (kecil != i)\` adalah base case rekursinya.** Kalau induknya ternyata sudah yang terkecil, berarti posisinya sudah benar dan tidak perlu turun lagi. Tanpa pemeriksaan ini, rekursinya tidak pernah berhenti.

Biayanya **O(log n)** karena paling jauh turun sebanyak tinggi pohon.

Fungsi ini sering disebut **heapify**, dan ia dipakai di banyak tempat: saat mengambil dari heap, saat membangun heap dari array yang sudah ada, dan sebagai inti dari **heap sort**.
`
    },
    {
      bahasa: 'c',
      kode: '// Heap: 10, 20, 15, 40, 30\n//         10\n//        /  \\\n//      20    15     <- 20 > 15, dan itu SAH\n//     /  \\\n//   40    30\n// Aturan hanya mengatur INDUK-ANAK, bukan kiri-kanan',
      penjelasan: `
Inilah perbedaan heap dan BST yang paling sering tertukar, dan wajib kamu tegaskan saat mengajar.

**Pada BST**, aturannya mengatur hubungan **kiri-kanan**: semua yang di kiri lebih kecil, semua yang di kanan lebih besar. Karena itu BST **terurut**, dan inorder-nya menghasilkan urutan menaik.

**Pada heap**, aturannya hanya mengatur hubungan **induk-anak**: induk lebih kecil dari kedua anaknya. Tidak ada aturan apa pun antara anak kiri dan anak kanan. Pada contoh di atas, \`20\` berada di kiri dan \`15\` di kanan — dan itu **sepenuhnya sah** karena keduanya sama-sama lebih besar dari induknya.

Akibatnya sangat praktis:

- **Heap tidak terurut.** Menelusurinya secara inorder menghasilkan urutan acak, bukan menaik
- **Mencari nilai sembarang di heap tetap O(n)**, karena tidak ada petunjuk arah seperti di BST
- **Yang dijamin hanyalah root** — nilai paling ekstrem

Justru karena aturannya lebih longgar, heap lebih murah dirawat. Ia tidak perlu menjaga urutan menyeluruh, cuma menjaga satu hubungan sederhana. Itulah sebabnya heap **tidak pernah bisa menjadi miring** seperti BST.

Ringkasnya: **BST untuk mencari apa saja, heap untuk mengambil yang paling ekstrem.**
`
    },
    {
      bahasa: 'python',
      kode: 'import heapq\npq = [30, 10, 50]\nheapq.heapify(pq)          # ubah list biasa jadi heap, O(n)\nheapq.heappush(pq, 20)     # O(log n)\nprint(heapq.heappop(pq))   # 10 — heapq bawaannya MIN-heap',
      penjelasan: `
Python menyediakan heap lewat modul **\`heapq\`**, dan bawaannya adalah **min-heap** — yang terkecil keluar duluan.

Yang perlu diketahui, \`heapq\` bekerja **langsung di atas \`list\` biasa**. Tidak ada tipe khusus; yang ada hanyalah fungsi-fungsi yang menjaga aturan heap pada list tersebut. Karena itu \`pq\` tetap bisa dicetak sebagai list biasa — dan isinya akan terlihat **tidak terurut**, yang justru membuktikan bahwa heap memang tidak terurut.

Ada satu hal yang menarik soal **\`heapify\`**: mengubah list sembarang menjadi heap ternyata **O(n)**, bukan O(n log n) seperti dugaan umum. Alasannya, sebagian besar simpul berada di tingkat bawah dan hanya perlu turun sedikit; simpul yang perlu turun jauh jumlahnya sedikit. Kalau dijumlahkan, totalnya ternyata cuma O(n).

Untuk membuat **max-heap**, Python tidak menyediakannya langsung. Trik yang lazim adalah **menyimpan nilai negatifnya**, lalu dinegatifkan lagi saat diambil. Cara ini terlihat seperti akal-akalan, tapi memang itulah pendekatan resminya.

Untuk menyimpan pasangan data, gunakan **tuple** dengan prioritas di posisi pertama, misalnya \`(prioritas, nama)\`. Python membandingkan tuple mulai dari elemen pertama, sehingga urutannya otomatis mengikuti prioritas.
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;
using System.Linq;

class MinHeap {
    private List<int> heap = new List<int>();

    private int Induk(int i)     => (i - 1) / 2;
    private int AnakKiri(int i)  => 2 * i + 1;
    private int AnakKanan(int i) => 2 * i + 2;

    private void Tukar(int i, int j) {
        (heap[i], heap[j]) = (heap[j], heap[i]);       // tuple swap, khas C#
    }

    // SIFT UP: taruh di ujung, lalu naikkan
    public void Sisip(int nilai) {
        heap.Add(nilai);                                // jaga bentuk rapat
        int i = heap.Count - 1;
        while (i > 0 && heap[Induk(i)] > heap[i]) {     // i > 0 WAJIB di depan
            Tukar(i, Induk(i));
            i = Induk(i);                               // ikut naik
        }
    }

    // SIFT DOWN alias heapify
    private void Turunkan(int i) {
        int kecil = i;
        int kr = AnakKiri(i), kn = AnakKanan(i);

        if (kr < heap.Count && heap[kr] < heap[kecil]) kecil = kr;   // cek batas
        if (kn < heap.Count && heap[kn] < heap[kecil]) kecil = kn;

        if (kecil != i) {                               // base case
            Tukar(i, kecil);
            Turunkan(kecil);
        }
    }

    public int Ambil() {
        int hasil = heap[0];                            // ekstrem selalu di root
        heap[0] = heap[heap.Count - 1];                 // pindahkan yang TERAKHIR
        heap.RemoveAt(heap.Count - 1);
        if (heap.Count > 0) Turunkan(0);
        return hasil;
    }

    public int Puncak => heap[0];
    public int Jumlah => heap.Count;
    public override string ToString() => string.Join(" ", heap);
}

class Program {
    static void Main() {
        var h = new MinHeap();
        foreach (int x in new[] { 40, 10, 30, 50, 20 }) h.Sisip(x);

        Console.WriteLine($"isi array : {h}");
        Console.WriteLine("-> PERHATIKAN: TIDAK terurut!");
        Console.WriteLine($"   yang dijamin hanya puncaknya : {h.Puncak}");

        Console.Write("\nmengambil satu per satu (otomatis terurut): ");
        while (h.Jumlah > 0) Console.Write(h.Ambil() + " ");

        // ---------- PriorityQueue bawaan (.NET 6+) ----------
        Console.WriteLine("\n\n--- PriorityQueue bawaan ---");
        var pq = new PriorityQueue<string, int>();       // bawaannya MIN-heap
        pq.Enqueue("Budi",  3);
        pq.Enqueue("Ani",   1);
        pq.Enqueue("Citra", 2);

        Console.Write("  urutan keluar : ");
        while (pq.Count > 0) Console.Write(pq.Dequeue() + " ");

        // MAX-heap: balik pembandingnya
        var maks = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        foreach (int x in new[] { 40, 10, 30, 50, 20 }) maks.Enqueue(x, x);
        Console.Write("\n  max-heap      : ");
        while (maks.Count > 0) Console.Write(maks.Dequeue() + " ");

        // ---------- Penerapan: k nilai terbesar ----------
        int[] data = { 35, 12, 88, 47, 91, 23, 66 };
        int k = 3;
        var topK = new PriorityQueue<int, int>();        // min-heap ukuran k
        foreach (int x in data) {
            topK.Enqueue(x, x);
            if (topK.Count > k) topK.Dequeue();          // buang yang terkecil
        }
        Console.Write($"\n\n{k} nilai terbesar : ");
        while (topK.Count > 0) Console.Write(topK.Dequeue() + " ");
        Console.WriteLine("\n-> O(n log k), tidak perlu mengurutkan semuanya");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static List<Integer> heap = new ArrayList<>();

    static int induk(int i)     { return (i - 1) / 2; }
    static int anakKiri(int i)  { return 2 * i + 1; }
    static int anakKanan(int i) { return 2 * i + 2; }

    static void tukar(int i, int j) {
        int s = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, s);
    }

    // SIFT UP
    static void sisip(int nilai) {
        heap.add(nilai);                                 // jaga bentuk rapat
        int i = heap.size() - 1;
        while (i > 0 && heap.get(induk(i)) > heap.get(i)) {   // i > 0 WAJIB di depan
            tukar(i, induk(i));
            i = induk(i);
        }
    }

    // SIFT DOWN alias heapify
    static void turunkan(int i) {
        int kecil = i;
        int kr = anakKiri(i), kn = anakKanan(i);

        if (kr < heap.size() && heap.get(kr) < heap.get(kecil)) kecil = kr;
        if (kn < heap.size() && heap.get(kn) < heap.get(kecil)) kecil = kn;

        if (kecil != i) {                                // base case
            tukar(i, kecil);
            turunkan(kecil);
        }
    }

    static int ambil() {
        int hasil = heap.get(0);                         // ekstrem selalu di root
        heap.set(0, heap.get(heap.size() - 1));          // pindahkan yang TERAKHIR
        heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) turunkan(0);
        return hasil;
    }

    public static void main(String[] args) {
        for (int x : new int[] { 40, 10, 30, 50, 20 }) sisip(x);

        System.out.println("isi array : " + heap);
        System.out.println("-> PERHATIKAN: TIDAK terurut!");
        System.out.println("   yang dijamin hanya puncaknya : " + heap.get(0));

        System.out.print("\nmengambil satu per satu (otomatis terurut): ");
        while (!heap.isEmpty()) System.out.print(ambil() + " ");

        // ---------- PriorityQueue bawaan ----------
        System.out.println("\n\n--- PriorityQueue bawaan (MIN-heap) ---");
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : new int[] { 40, 10, 30, 50, 20 }) pq.offer(x);

        System.out.println("  isi internal : " + pq + "  <- juga tidak terurut");
        System.out.print("  urutan keluar: ");
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");

        // MAX-heap
        PriorityQueue<Integer> maks = new PriorityQueue<>(Comparator.reverseOrder());
        for (int x : new int[] { 40, 10, 30, 50, 20 }) maks.offer(x);
        System.out.print("\n  max-heap     : ");
        while (!maks.isEmpty()) System.out.print(maks.poll() + " ");

        // heapify dari koleksi: O(n), bukan O(n log n)
        PriorityQueue<Integer> cepat = new PriorityQueue<>(List.of(64, 25, 12, 22, 11));
        System.out.println("\n\n  dibangun dari List sekaligus -> O(n)");
        System.out.println("  puncaknya : " + cepat.peek());

        // ---------- k nilai terbesar ----------
        int[] data = { 35, 12, 88, 47, 91, 23, 66 };
        int k = 3;
        PriorityQueue<Integer> topK = new PriorityQueue<>();   // min-heap ukuran k
        for (int x : data) {
            topK.offer(x);
            if (topK.size() > k) topK.poll();                  // buang terkecil
        }
        System.out.print("\n" + k + " nilai terbesar : ");
        while (!topK.isEmpty()) System.out.print(topK.poll() + " ");
        System.out.println("\n-> O(n log k), tidak perlu mengurutkan semuanya");
    }
}`,

    js: String.raw`// JavaScript TIDAK punya heap bawaan — harus dibuat sendiri.
class MinHeap {
    constructor() {
        this.heap = [];
    }

    induk(i)     { return Math.floor((i - 1) / 2); }   // WAJIB Math.floor
    anakKiri(i)  { return 2 * i + 1; }
    anakKanan(i) { return 2 * i + 2; }

    tukar(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // SIFT UP: taruh di ujung, lalu naikkan
    sisip(nilai) {
        this.heap.push(nilai);                          // jaga bentuk rapat
        let i = this.heap.length - 1;
        while (i > 0 && this.heap[this.induk(i)] > this.heap[i]) {
            this.tukar(i, this.induk(i));
            i = this.induk(i);                          // ikut naik
        }
    }

    // SIFT DOWN alias heapify
    turunkan(i) {
        let kecil = i;
        const kr = this.anakKiri(i), kn = this.anakKanan(i);
        const n = this.heap.length;

        if (kr < n && this.heap[kr] < this.heap[kecil]) kecil = kr;   // cek batas
        if (kn < n && this.heap[kn] < this.heap[kecil]) kecil = kn;

        if (kecil !== i) {                              // base case
            this.tukar(i, kecil);
            this.turunkan(kecil);
        }
    }

    ambil() {
        if (this.heap.length === 0) return undefined;
        const hasil = this.heap[0];                     // ekstrem selalu di root
        const akhir = this.heap.pop();                  // ambil yang TERAKHIR
        if (this.heap.length > 0) {
            this.heap[0] = akhir;                       // pindahkan ke puncak
            this.turunkan(0);
        }
        return hasil;
    }

    get puncak() { return this.heap[0]; }
    get jumlah() { return this.heap.length; }
}

const h = new MinHeap();
for (const x of [40, 10, 30, 50, 20]) h.sisip(x);

console.log("isi array :", h.heap.join(" "));
console.log("-> PERHATIKAN: TIDAK terurut!");
console.log("   yang dijamin hanya puncaknya :", h.puncak);

process.stdout.write("\nmengambil satu per satu (otomatis terurut): ");
while (h.jumlah > 0) process.stdout.write(h.ambil() + " ");
console.log();

// ---------- Priority queue dengan pasangan (prioritas, data) ----------
class PriorityQueue {
    constructor() { this.isi = []; }

    enqueue(data, prioritas) {
        this.isi.push({ data: data, prioritas: prioritas });
        this.isi.sort(function (a, b) { return a.prioritas - b.prioritas; });
        // Catatan: sort tiap kali itu O(n log n) — untuk data besar,
        // pakai heap seperti di atas supaya O(log n).
    }

    dequeue() { return this.isi.shift(); }
    get jumlah() { return this.isi.length; }
}

console.log("\n--- antrean IGD ---");
const igd = new PriorityQueue();
igd.enqueue("Budi  - patah tulang", 2);
igd.enqueue("Ani   - serangan jantung", 1);
igd.enqueue("Citra - demam", 5);

while (igd.jumlah > 0) {
    const p = igd.dequeue();
    console.log("  gawat " + p.prioritas + " -> " + p.data);
}

// ---------- k nilai terbesar memakai heap ukuran tetap ----------
function kTerbesar(data, k) {
    const min = new MinHeap();
    for (const x of data) {
        min.sisip(x);
        if (min.jumlah > k) min.ambil();          // buang yang terkecil
    }
    const hasil = [];
    while (min.jumlah > 0) hasil.push(min.ambil());
    return hasil;
}

const data = [35, 12, 88, 47, 91, 23, 66];
console.log("\n3 nilai terbesar :", kTerbesar(data, 3).join(" "));
console.log("-> O(n log k), tidak perlu mengurutkan semuanya");

console.log("\nJavaScript tidak punya heap maupun priority queue bawaan.");
console.log("Java, C#, C++, dan Python semuanya menyediakannya.");`,

    c: String.raw`#include <stdio.h>
#define MAKS 100

int heap[MAKS];
int n = 0;                        // jumlah data saat ini

int induk(int i)    { return (i - 1) / 2; }
int anakKiri(int i) { return 2 * i + 1; }
int anakKanan(int i){ return 2 * i + 2; }

void tukar(int *a, int *b) { int s = *a; *a = *b; *b = s; }

/* SIFT UP: naikkan sampai posisinya benar */
void sisip(int nilai) {
    if (n == MAKS) { printf("Heap penuh\n"); return; }

    heap[n] = nilai;              // taruh di slot terakhir (jaga bentuk)
    int i = n++;

    while (i > 0 && heap[induk(i)] > heap[i]) {   // min-heap
        tukar(&heap[i], &heap[induk(i)]);
        i = induk(i);             // ikut naik
    }
}

/* SIFT DOWN alias heapify */
void turunkan(int i) {
    int kecil = i;
    int kr = anakKiri(i), kn = anakKanan(i);

    if (kr < n && heap[kr] < heap[kecil]) kecil = kr;   // cek batas dulu
    if (kn < n && heap[kn] < heap[kecil]) kecil = kn;

    if (kecil != i) {             // base case: kalau sama, berhenti
        tukar(&heap[i], &heap[kecil]);
        turunkan(kecil);
    }
}

int ambilTerkecil(void) {
    if (n == 0) { printf("Heap kosong\n"); return -1; }

    int hasil = heap[0];          // nilai ekstrem selalu di root
    heap[0] = heap[--n];          // pindahkan elemen terakhir ke root
    turunkan(0);                  // perbaiki posisinya
    return hasil;
}

int lihatTerkecil(void) { return n == 0 ? -1 : heap[0]; }

void cetakArray(void) {
    printf("array : ");
    for (int i = 0; i < n; i++) printf("%d ", heap[i]);
    printf("\n");
}

void cetakPohon(int i, int level) {
    if (i >= n) return;
    cetakPohon(anakKanan(i), level + 1);
    for (int k = 0; k < level; k++) printf("      ");
    printf("%d\n", heap[i]);
    cetakPohon(anakKiri(i), level + 1);
}

/* HEAP SORT: ambil terus dari heap, hasilnya otomatis terurut */
void heapSort(int arr[], int jml) {
    n = 0;
    for (int i = 0; i < jml; i++) sisip(arr[i]);      // O(n log n)
    for (int i = 0; i < jml; i++) arr[i] = ambilTerkecil();
}

int main(void) {
    int nilai[] = {40, 10, 30, 50, 20};

    printf("menyisipkan: ");
    for (int i = 0; i < 5; i++) { printf("%d ", nilai[i]); sisip(nilai[i]); }
    printf("\n\n");

    cetakArray();
    printf("\nbentuk pohon (miring 90 derajat):\n");
    cetakPohon(0, 0);

    printf("\nterkecil di root : %d\n", lihatTerkecil());
    printf("PERHATIKAN: array di atas TIDAK terurut,\n");
    printf("yang dijamin hanya nilai di root.\n");

    printf("\nmengambil satu per satu (otomatis terurut):\n  ");
    while (n > 0) printf("%d ", ambilTerkecil());
    printf("\n");

    /* Heap sort */
    int data[] = {64, 25, 12, 22, 11};
    heapSort(data, 5);
    printf("\nheap sort : ");
    for (int i = 0; i < 5; i++) printf("%d ", data[i]);
    printf("\n");

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    /* ---------- priority_queue: bawaannya MAX-heap ---------- */
    priority_queue<int> maxHeap;
    for (int x : {40, 10, 30, 50, 20}) maxHeap.push(x);   // O(log n) tiap kali

    cout << "max-heap, puncaknya : " << maxHeap.top() << endl;
    cout << "urutan keluar       : ";
    while (!maxHeap.empty()) { cout << maxHeap.top() << " "; maxHeap.pop(); }

    /* ---------- MIN-heap: tambahkan greater<int> ---------- */
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : {40, 10, 30, 50, 20}) minHeap.push(x);

    cout << "\n\nmin-heap, puncaknya : " << minHeap.top() << endl;
    cout << "urutan keluar       : ";
    while (!minHeap.empty()) { cout << minHeap.top() << " "; minHeap.pop(); }

    /* ---------- Heap manual di atas vector ---------- */
    vector<int> v = {40, 10, 30, 50, 20};

    make_heap(v.begin(), v.end());          // jadikan max-heap, O(n)
    cout << "\n\nsetelah make_heap : ";
    for (int x : v) cout << x << " ";
    cout << "\n-> TIDAK terurut, yang dijamin cuma v[0] = " << v.front() << endl;

    v.push_back(60);
    push_heap(v.begin(), v.end());          // perbaiki setelah menambah
    cout << "setelah push 60   : puncak = " << v.front() << endl;

    pop_heap(v.begin(), v.end());           // pindahkan puncak ke belakang
    int terbesar = v.back();
    v.pop_back();
    cout << "setelah pop       : diambil " << terbesar
         << ", puncak baru = " << v.front() << endl;

    sort_heap(v.begin(), v.end());          // heap sort
    cout << "setelah sort_heap : ";
    for (int x : v) cout << x << " ";

    /* ---------- Penerapan: k nilai terbesar ---------- */
    vector<int> data = {35, 12, 88, 47, 91, 23, 66};
    priority_queue<int, vector<int>, greater<int>> topK;   // min-heap ukuran k
    int k = 3;

    for (int x : data) {
        topK.push(x);
        if ((int)topK.size() > k) topK.pop();   // buang yang terkecil
    }
    cout << "\n\n" << k << " nilai terbesar : ";
    while (!topK.empty()) { cout << topK.top() << " "; topK.pop(); }
    cout << "\n-> hanya O(n log k), tidak perlu mengurutkan semuanya" << endl;

    return 0;
}`,

    python: String.raw`import heapq

# heapq bekerja di atas list biasa, dan bawaannya MIN-heap
pq = []
for x in [40, 10, 30, 50, 20]:
    heapq.heappush(pq, x)               # O(log n)

print("isi list  :", pq)
print("-> TIDAK terurut! Yang dijamin cuma pq[0] =", pq[0])

print("\nmengambil satu per satu (otomatis terurut):")
salinan = pq.copy()
hasil = []
while salinan:
    hasil.append(heapq.heappop(salinan))
print(" ", hasil)

# heapify: mengubah list sembarang jadi heap, dan ini O(n) — bukan O(n log n)
data = [64, 25, 12, 22, 11]
heapq.heapify(data)
print("\nsetelah heapify :", data)
print("terkecil        :", data[0])

# MAX-heap: Python tidak menyediakannya, trik resminya menegatifkan nilai
maks = []
for x in [40, 10, 30, 50, 20]:
    heapq.heappush(maks, -x)
print("\nmax-heap (dinegatifkan):", [-x for x in maks])
print("terbesar :", -maks[0])

# Priority queue dengan pasangan (prioritas, data)
antrean = []
heapq.heappush(antrean, (2, "Budi  - patah tulang"))
heapq.heappush(antrean, (1, "Ani   - serangan jantung"))
heapq.heappush(antrean, (5, "Citra - demam"))

print("\nantrean IGD (prioritas kecil = lebih gawat):")
while antrean:
    gawat, nama = heapq.heappop(antrean)
    print(f"  {gawat} -> {nama}")

# Fungsi siap pakai untuk k terbesar/terkecil
angka = [35, 12, 88, 47, 91, 23, 66]
print("\n3 terbesar  :", heapq.nlargest(3, angka))
print("3 terkecil  :", heapq.nsmallest(3, angka))

# Membandingkan biaya: mengurutkan semua vs mengambil k terbesar
import random, time

besar = [random.randint(1, 1_000_000) for _ in range(500_000)]
k = 10

mulai = time.perf_counter()
hasil_sort = sorted(besar, reverse=True)[:k]        # O(n log n)
waktu_sort = time.perf_counter() - mulai

mulai = time.perf_counter()
hasil_heap = heapq.nlargest(k, besar)               # O(n log k)
waktu_heap = time.perf_counter() - mulai

print(f"\nmengambil {k} terbesar dari {len(besar):,} data:")
print(f"  sorted()  : {waktu_sort:.4f} detik  (O(n log n))")
print(f"  nlargest(): {waktu_heap:.4f} detik  (O(n log k))")
print("  hasil sama?", hasil_sort == hasil_heap)`
  },

  output: `menyisipkan: 40 10 30 50 20

array : 10 20 30 50 40

bentuk pohon (miring 90 derajat):
      30
10
            40
      20
            50

terkecil di root : 10
PERHATIKAN: array di atas TIDAK terurut,
yang dijamin hanya nilai di root.

mengambil satu per satu (otomatis terurut):
  10 20 30 40 50

heap sort : 11 12 22 25 64`,

  kompleksitas: {
    tabel: [
      { operasi: 'Lihat nilai ekstrem (peek)', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Sisip (sift up)', waktu: 'O(log n)', memori: 'O(1)' },
      { operasi: 'Ambil nilai ekstrem (sift down)', waktu: 'O(log n)', memori: 'O(1)' },
      { operasi: 'Bangun heap dari array (heapify)', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Cari nilai sembarang', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Heap sort', waktu: 'O(n log n)', memori: 'O(1)' },
      { operasi: 'Ambil k terbesar dari n data', waktu: 'O(n log k)', memori: 'O(k)' },
      { operasi: 'penyimpanan n data', waktu: '—', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa peek bisa O(1)?** Karena nilai ekstremnya **selalu di root**, yaitu indeks 0. Tidak perlu dicari sama sekali — aturan heap sudah menjaminnya. Inilah satu-satunya jaminan yang diberikan heap, dan justru itu yang membuatnya murah.

**Kenapa sisip dan ambil O(log n)?** Karena nilai paling jauh hanya bergerak sebanyak **tinggi pohon**. Dan karena heap selalu berbentuk *complete binary tree* yang rapat, tingginya **dijamin** sekitar log₂n. Ini keunggulan penting dibanding BST: **heap tidak bisa menjadi miring**, jadi tidak ada kasus terburuk O(n).

**Kenapa heapify cuma O(n), bukan O(n log n)?** Ini mengejutkan tapi masuk akal setelah dirunut. Separuh simpul berada di tingkat paling bawah dan **tidak perlu turun sama sekali**. Seperempatnya cuma turun satu tingkat, seperdelapannya dua tingkat, dan seterusnya. Kalau semua dijumlahkan, hasilnya konvergen ke sekitar **n**, bukan n log n. Karena itu membangun heap sekaligus jauh lebih murah daripada menyisipkan satu per satu.

**Kenapa mencari nilai sembarang tetap O(n)?** Karena aturan heap **tidak memberi petunjuk arah**. Kalau nilai yang dicari lebih besar dari root, ia bisa ada di cabang kiri atau kanan — tidak ada cara memilih. Bandingkan dengan BST yang selalu tahu harus belok ke mana. **Heap dirancang untuk mengambil yang ekstrem, bukan untuk mencari.**

**Kenapa "k terbesar" pakai heap lebih hemat?** Dengan menjaga min-heap berukuran tetap \`k\`, setiap data cukup dibandingkan dengan yang terkecil di heap. Biayanya **O(n log k)**, dan karena \`k\` biasanya jauh lebih kecil dari \`n\`, ini jauh lebih murah daripada mengurutkan semuanya yang O(n log n). Contoh kode Python di atas mengukurnya langsung.
`
  },

  kesalahanUmum: [
    {
      salah: 'Mengira isi array heap sudah terurut.',
      kenapa: 'Aturan heap hanya mengatur hubungan **induk dan anak**, bukan kiri dan kanan. Mencetak arraynya menghasilkan urutan yang terlihat acak, dan hanya elemen di indeks 0 yang dijamin ekstrem. Banyak mahasiswa menyangka heap adalah versi lain dari BST.',
      benar: 'Ingat bedanya: **BST terurut, heap tidak.** Untuk mendapat urutan terurut dari heap, ambil elemennya satu per satu — dan itulah yang disebut heap sort.'
    },
    {
      salah: 'Saat sift down, menukar dengan anak kiri tanpa membandingkan keduanya.',
      kenapa: 'Kalau anak kanan ternyata lebih kecil, penukaran dengan anak kiri justru **melanggar aturan heap** di tingkat berikutnya — induk barunya menjadi lebih besar dari anaknya. Kesalahan ini tidak menimbulkan error, hanya membuat urutan pengambilannya salah.',
      benar: 'Bandingkan dengan **kedua** anaknya dulu, lalu tukar dengan yang **terkecil** (min-heap) atau **terbesar** (max-heap). Pola `if (kr < n && ...) kecil = kr;` untuk keduanya.'
    },
    {
      salah: 'Lupa memeriksa batas sebelum mengakses anak: `if (heap[2*i+1] < heap[i])`',
      kenapa: 'Tidak semua simpul punya dua anak, terutama di tingkat terakhir yang belum penuh. Tanpa penjagaan `2*i+1 < n`, program membaca slot di luar data. Isinya sampah, sehingga perbandingannya salah — dan tidak ada error apa pun yang muncul.',
      benar: 'Selalu tulis `if (kr < n && heap[kr] < heap[kecil])`. Urutan syaratnya penting: pemeriksaan batas **harus di depan** agar *short-circuit* melindungi akses berikutnya.'
    },
    {
      salah: 'Saat mengambil, mengisi root dengan salah satu anaknya.',
      kenapa: 'Cara itu meninggalkan lubang di tengah pohon, sehingga bentuk *complete binary tree*-nya rusak. Begitu ada celah, **rumus indeks induk dan anak langsung tidak berlaku** — dan seluruh heap menjadi kacau meski tidak ada error.',
      benar: 'Pindahkan **elemen terakhir** ke root, kurangi jumlah datanya, lalu jalankan sift down. Hanya cara ini yang menjaga bentuk rapatnya.'
    },
    {
      salah: 'Memakai heap untuk mencari nilai tertentu, mengira biayanya O(log n).',
      kenapa: 'Aturan heap tidak memberi petunjuk arah, sehingga nilai yang dicari bisa berada di cabang mana saja. Mencarinya berarti memeriksa seluruh isi — tetap **O(n)**, sama saja dengan array biasa.',
      benar: 'Gunakan heap **hanya** untuk mengambil nilai paling ekstrem berulang kali. Kalau butuh pencarian umum, pakai BST atau hash table.'
    },
    {
      salah: 'Di Python, mengira `heapq` menyediakan max-heap.',
      kenapa: '`heapq` hanya menyediakan **min-heap**. Memanggil `heappop` mengembalikan yang terkecil, sehingga program yang mengharapkan nilai terbesar mendapat hasil kebalikannya — tanpa error apa pun.',
      benar: 'Simpan nilai negatifnya: `heappush(h, -x)` lalu ambil dengan `-heappop(h)`. Untuk kebutuhan sederhana, `heapq.nlargest(k, data)` sudah cukup dan lebih terbaca.'
    }
  ],

  analogi: `
Analogi terkuat untuk heap adalah **struktur organisasi perusahaan yang aturannya longgar**.

Aturannya cuma satu: **setiap atasan harus lebih senior daripada bawahan langsungnya.** Tidak ada aturan yang mengatur perbandingan antar orang di divisi berbeda. Akibatnya, seorang staf di divisi A bisa saja lebih senior daripada seorang manajer di divisi B — dan itu **tidak melanggar apa pun**.

Dari analogi ini semuanya jadi jelas:

- **Siapa yang paling senior?** Pasti direktur di puncak — tidak perlu dicari. Itulah O(1).
- **Siapa orang paling senior ketiga?** Tidak ada yang tahu tanpa memeriksa semuanya. Itulah kenapa heap tidak terurut.
- **Karyawan baru masuk?** Tempatkan di posisi kosong paling bawah, lalu **promosikan ke atas** selama ia lebih senior dari atasannya. Itulah sift up.
- **Direktur pensiun?** Jangan biarkan kursinya kosong. Ambil **karyawan paling bawah**, dudukkan sementara di puncak, lalu **turunkan** bertahap sampai posisinya wajar. Itulah sift down.

Bagian terakhir biasanya terasa aneh bagi mahasiswa — kenapa justru yang paling bawah yang dinaikkan? Jawabannya: **supaya bentuk organisasinya tetap rapat tanpa kursi kosong di tengah.** Setelah dijelaskan begitu, langkahnya berhenti terasa sewenang-wenang.

Untuk membedakan **heap dan BST**, pakai satu kalimat pembanding: *"BST itu lemari arsip yang tersusun rapi menurut abjad — bagus untuk mencari apa saja. Heap itu antrean IGD — tidak tersusun rapi, tapi selalu tahu siapa yang paling gawat."*

Peragaan yang efektif di kelas: buat max-heap dari 5 angka di papan tulis, lalu tunjukkan bahwa arraynya **tidak terurut**. Setelah itu ambil satu per satu dari puncaknya, dan tunjukkan bahwa hasil pengambilannya **justru terurut sempurna**. Kejutan kecil itu biasanya yang membuat konsep heap sort langsung dipahami.
`,

  latihan: [
    'Buat min-heap berbasis array lengkap dengan `sisip`, `ambilTerkecil`, dan `lihatTerkecil`. Setelah menyisipkan 40, 10, 30, 50, 20, cetak arraynya dan tunjukkan bahwa isinya **tidak** terurut.',
    'Ubah min-heap buatanmu menjadi max-heap. Bagian mana saja yang perlu diubah, dan kenapa cukup itu saja?',
    'Buat fungsi yang memeriksa apakah sebuah array memenuhi aturan min-heap. Petunjuk: cukup periksa tiap simpul terhadap kedua anaknya.',
    'Implementasikan heap sort: masukkan semua data ke heap, lalu ambil satu per satu. Jelaskan kenapa hasilnya otomatis terurut, dan kenapa biayanya O(n log n).',
    'Buat program yang mencari **10 nilai terbesar** dari 500.000 data acak dengan dua cara: mengurutkan semuanya, dan memakai heap berukuran tetap 10. Bandingkan waktunya.',
    'Buat simulasi antrean IGD memakai priority queue dengan pasangan (tingkat kegawatan, nama pasien). Masukkan pasien tidak berurutan, lalu pastikan yang paling gawat keluar duluan.',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri tentang beda heap dan BST. Peragakan dengan menggambar keduanya berdampingan dari data yang sama, lalu tunjukkan bahwa inorder BST terurut sedangkan array heap tidak.'
  ]
});

TOPICS.push({
  id: 'graph',
  judul: 'Graph (Adjacency, BFS & DFS)',
  kategori: 'struktur-data',
  tag: ['graph', 'adjacency matrix', 'adjacency list', 'BFS', 'DFS', 'visited'],
  ringkas: 'Struktur paling luwes: simpul yang saling terhubung bebas — beserta dua cara menjelajahinya.',

  fungsi: `**Mewakili apa pun yang berupa hubungan antar hal.**

Graf adalah struktur data paling umum — hampir semua struktur lain adalah graf dengan batasan tambahan.

Terpakai di:

- **Jaringan sosial** — teman, pengikut, rekomendasi
- **Peta dan rute** — jalan sebagai sisi, persimpangan sebagai simpul
- **Ketergantungan** — paket, tugas, prasyarat mata kuliah
- **Jaringan Komputer** — topologi dan perutean
- **Basis data** — hubungan antar tabel adalah graf

Dua penelusuran pokoknya menjawab pertanyaan berbeda:

- **BFS** — jarak **terpendek** dalam jumlah langkah, memakai queue
- **DFS** — apakah **bisa dicapai**, deteksi siklus, dan pengurutan topologis, memakai stack atau rekursi

Memilih yang salah tidak membuat programmu gagal — ia memberi jawaban yang salah untuk pertanyaan yang kamu ajukan.`,

  praktik: {
    tujuan: `Kamu bisa mewakili graf dalam dua bentuk, menulis BFS dan DFS, dan memakainya untuk mendeteksi siklus serta mencari jalur terpendek.`,
    alat: [
      'Python 3'
    ],
    langkah: [
      { judul: 'Pilih bentuk penyimpanannya',
        isi: `- **Adjacency matrix** — array dua dimensi, \`O(1)\` untuk memeriksa satu sisi, tetapi memakan \`O(V²)\` memori
- **Adjacency list** — daftar tetangga per simpul, hemat memori untuk graf jarang

Hampir semua graf nyata **jarang** — media sosial punya jutaan orang tetapi tiap orang cuma punya ratusan teman. Jadi adjacency list hampir selalu pilihan yang benar.` },
      { judul: 'Tulis BFS dengan queue',
        isi: `Masukkan simpul awal ke queue dan tandai dikunjungi. Selama queue tidak kosong: ambil satu, kunjungi tetangganya yang belum ditandai, masukkan ke queue.

**Tandai saat memasukkan**, bukan saat mengeluarkan. Kalau tidak, satu simpul bisa masuk queue beberapa kali.` },
      { judul: 'Tulis DFS dengan rekursi',
        isi: `Kunjungi simpul, tandai, lalu panggil DFS untuk tiap tetangga yang belum ditandai.

Bandingkan urutan kunjungannya dengan BFS pada graf yang sama. Perbedaannya akan langsung terlihat: BFS menyebar melebar, DFS menyelam sedalam mungkin.` },
      { judul: 'Cari jalur terpendek dengan BFS',
        isi: `Simpan **dari mana** tiap simpul dicapai, lalu telusuri balik dari tujuan ke asal.

Ini memberi jalur terpendek **dalam jumlah langkah** — tepat untuk graf tak berbobot.

Kalau sisinya punya bobot berbeda, BFS memberi jawaban salah dan kamu butuh Dijkstra.` },
      { judul: 'Deteksi siklus',
        isi: `Untuk graf berarah, pakai DFS dengan tiga warna: belum dikunjungi, sedang diproses, sudah selesai.

Kalau kamu menemukan simpul yang **sedang diproses**, berarti ada siklus.

Ini yang dipakai pengelola paket untuk menolak ketergantungan melingkar, dan pemeriksa prasyarat mata kuliah.` },
      { judul: 'Terapkan pada data nyata',
        isi: `Buat graf prasyarat mata kuliah di jurusanmu, lalu:

- deteksi apakah ada siklus — seharusnya tidak ada
- hitung urutan pengambilan yang sah dengan pengurutan topologis
- cari mata kuliah yang paling banyak menjadi prasyarat

Yang terakhir memberi tahu mata kuliah mana yang paling merugikan kalau kamu mengulangnya.` }
    ],
    cek: [
      'BFS dan DFS memberi urutan kunjungan berbeda pada graf yang sama',
      'Jalur terpendek dari BFS-mu cocok dengan hitungan manual pada graf kecil',
      `Deteksi siklusmu menemukan siklus yang sengaja kamu buat, dan tidak melaporkan siklus palsu`
    ]
  },

  konsep: `
Tree sudah bisa menggambarkan hubungan bercabang, tapi ia punya batasan ketat: **setiap simpul cuma boleh punya satu induk**, dan **tidak boleh ada lingkaran**.

**Graph** melepas kedua batasan itu. Simpul boleh terhubung ke simpul mana pun, boleh punya banyak tetangga, dan boleh membentuk lingkaran. Karena itu graph adalah struktur data **paling luwes** — dan justru karena itu, tree sebenarnya hanyalah **jenis khusus dari graph**.

Istilahnya sederhana:

- **Vertex** (atau simpul/node) — titiknya
- **Edge** (atau sisi) — garis yang menghubungkan dua vertex

Graph dibedakan menjadi beberapa jenis:

- **Undirected** — hubungannya dua arah. Kalau A berteman dengan B, otomatis B berteman dengan A
- **Directed** — hubungannya satu arah, seperti jalan satu arah atau "A mengikuti B" di media sosial
- **Weighted** — tiap edge punya bobot, misalnya jarak atau biaya

Contoh nyatanya ada di mana-mana: **peta jalan** (persimpangan sebagai vertex, jalan sebagai edge), **jejaring sosial** (orang dan pertemanan), **jaringan internet**, dan **rute penerbangan**.

Ada dua cara menyimpan graph di program, dan memilihnya berpengaruh besar:

- **Adjacency matrix** — tabel dua dimensi \`n × n\`, di mana \`m[i][j] = 1\` berarti ada hubungan. Memeriksa hubungan sangat cepat O(1), tapi memorinya selalu **O(V²)** meski hubungannya sedikit
- **Adjacency list** — tiap vertex menyimpan **daftar tetangganya** saja. Memorinya cuma **O(V + E)**, jauh lebih hemat untuk graph yang jarang terhubung

Untuk menjelajahi graph, ada dua algoritma yang wajib kamu kuasai:

- **BFS** (*Breadth First Search*) — **melebar dulu**, memakai **queue**. Menemukan **jalur terpendek** pada graph tanpa bobot
- **DFS** (*Depth First Search*) — **mendalam dulu**, memakai **stack** atau rekursi. Cocok untuk menelusuri semua kemungkinan, mendeteksi siklus, dan mencari komponen terhubung

Ada satu hal yang **wajib** ada di kedua algoritma dan tidak boleh dilupakan: **penanda \`visited\`**. Karena graph boleh mengandung lingkaran, tanpa penanda ini penjelajahan akan berputar selamanya.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '// ADJACENCY MATRIX: tabel n x n\nint m[5][5] = {0};\nm[0][1] = 1;    // ada jalur 0 -> 1\nm[1][0] = 1;    // WAJIB juga, kalau graph-nya undirected',
      penjelasan: `
Cara paling mudah dipahami: sebuah tabel dua dimensi di mana \`m[i][j] = 1\` berarti ada hubungan dari \`i\` ke \`j\`, dan \`0\` berarti tidak ada.

Yang paling sering terlupakan: **pada graph undirected, setiap hubungan harus dicatat dua kali.** Menulis \`m[0][1] = 1\` saja berarti jalur itu cuma bisa dilewati dari 0 ke 1 — dan itu membuat graph-mu diam-diam menjadi directed. Akibatnya BFS dan DFS memberi hasil yang salah tanpa error apa pun.

Ciri khas graph undirected: matriksnya **simetris** terhadap diagonal. Ini bisa kamu pakai untuk memeriksa pekerjaan mahasiswa dengan cepat.

Kelebihannya, memeriksa hubungan cuma **O(1)** — cukup lihat satu sel.

Kelemahannya besar: memorinya **selalu O(V²)**, tidak peduli berapa sedikit hubungan yang ada. Untuk 10.000 vertex, itu berarti 100 juta sel — padahal mungkin cuma ada 20.000 edge. Karena itu adjacency matrix hanya cocok untuk graph kecil atau graph yang **padat** hubungannya.
`
    },
    {
      bahasa: 'c',
      kode: '// ADJACENCY LIST: tiap vertex menyimpan daftar tetangganya\n// 0 -> [1, 2]\n// 1 -> [0, 3]\n// 2 -> [0, 3]\n// 3 -> [1, 2, 4]\n// 4 -> [3]',
      penjelasan: `
Alih-alih menyimpan seluruh kemungkinan hubungan, tiap vertex cukup menyimpan **daftar tetangga yang benar-benar ada**.

Memorinya menjadi **O(V + E)** — sebanding dengan jumlah vertex ditambah jumlah edge. Untuk graph yang **jarang** terhubung (dan sebagian besar graph di dunia nyata memang begitu), ini jauh lebih hemat.

Bandingkan langsung: graph berisi 10.000 vertex dengan 20.000 edge memerlukan **100 juta sel** dengan matrix, tapi cuma sekitar **30.000 entri** dengan list. Selisihnya lebih dari tiga ribu kali lipat.

Ada pertukaran yang harus diterima: memeriksa *"apakah A terhubung ke B?"* menjadi **O(derajat)** karena daftar tetangganya harus ditelusuri — tidak lagi O(1) seperti matrix.

Tapi untuk BFS dan DFS, adjacency list justru **lebih cepat**. Kedua algoritma itu selalu menanyakan *"siapa saja tetangga vertex ini?"*, dan list menjawabnya langsung. Matrix harus memeriksa **seluruh baris sepanjang V**, termasuk sel-sel nol yang tidak berguna.

Karena itu di dunia nyata, **adjacency list adalah pilihan bawaan** kecuali graph-nya memang kecil atau sangat padat.
`
    },
    {
      bahasa: 'c',
      kode: 'int visited[MAKS] = {0};      // WAJIB ADA\n\n// Tanpa ini, pada graph berlingkar:\n// 0 -> 1 -> 2 -> 0 -> 1 -> 2 -> ... selamanya',
      penjelasan: `
Inilah perbedaan mendasar antara menjelajahi **graph** dan **tree**, dan bagian yang paling sering dilupakan mahasiswa.

Tree **tidak punya lingkaran**, jadi penelusurannya pasti berakhir. Graph **boleh punya lingkaran** — dan begitu penjelajahan masuk ke lingkaran tanpa penanda, ia akan berputar tanpa henti.

Penanda \`visited\` memastikan **setiap vertex diproses tepat satu kali**. Alurnya sederhana: sebelum mengunjungi sebuah vertex, periksa dulu apakah sudah pernah dikunjungi; kalau belum, tandai lalu proses.

Yang penting diperhatikan: **kapan penandaan dilakukan.**

Pada **BFS**, vertex harus ditandai **saat dimasukkan ke queue**, bukan saat dikeluarkan. Kalau ditandai saat keluar, satu vertex bisa terlanjur masuk antrean beberapa kali lewat tetangga yang berbeda — hasilnya tetap benar, tapi pekerjaannya jadi berlipat dan pada graph padat bisa sangat boros.

Pada **DFS rekursif**, penandaan dilakukan di awal fungsi, sebelum menelusuri tetangganya.

Akibat lain dari \`visited\`: kedua algoritma dijamin **O(V + E)**, karena tiap vertex dan tiap edge disentuh paling banyak sekali.
`
    },
    {
      bahasa: 'c',
      kode: '// BFS: melebar dulu, memakai QUEUE\nenqueue(mulai); visited[mulai] = 1;\nwhile (!kosong()) {\n    int v = dequeue();\n    printf("%d ", v);\n    for (setiap tetangga t dari v)\n        if (!visited[t]) { visited[t] = 1; enqueue(t); }\n}',
      penjelasan: `
BFS memakai **queue**, dan justru sifat FIFO queue itulah yang menghasilkan penjelajahan melebar.

Alurnya: vertex yang keluar dari antrean langsung diproses, lalu semua tetangganya dimasukkan ke **belakang** antrean. Karena yang masuk lebih dulu keluar lebih dulu, **seluruh tetangga berjarak 1 pasti diproses sebelum yang berjarak 2**.

Dari sifat itu lahir keunggulan utamanya: **BFS menemukan jalur terpendek** pada graph tanpa bobot. Begitu targetnya ditemukan, jalur yang dilalui **dijamin** yang paling sedikit langkahnya — karena semua jalur yang lebih pendek sudah pasti diperiksa lebih dulu.

Inilah yang dipakai untuk mencari jarak terpendek di peta sederhana, menghitung "derajat pemisahan" di jejaring sosial, dan mencari jalan keluar labirin.

Perhatikan bahwa **penandaan dilakukan saat memasukkan ke antrean**, bukan saat mengeluarkan. Kalau terbalik, satu vertex bisa masuk antrean berkali-kali lewat tetangga berbeda.

Kalau kamu merasa pola ini mirip sesuatu — memang benar. **Level order traversal pada tree adalah BFS**, hanya saja tanpa perlu \`visited\` karena tree tidak punya lingkaran.
`
    },
    {
      bahasa: 'c',
      kode: '// DFS: mendalam dulu, memakai REKURSI (atau stack)\nvoid dfs(int v) {\n    visited[v] = 1;               // tandai SEBELUM menelusuri\n    printf("%d ", v);\n    for (setiap tetangga t dari v)\n        if (!visited[t]) dfs(t);  // masuk sedalam mungkin\n}',
      penjelasan: `
DFS memilih satu arah lalu **masuk sedalam mungkin** sebelum kembali dan mencoba cabang lain.

Struktur di baliknya adalah **stack** — tapi kalau ditulis rekursif seperti di atas, stack itu **diurus otomatis oleh call stack**. Karena itu DFS rekursif jauh lebih pendek daripada BFS.

Versi iteratifnya memakai stack manual, dan bentuknya hampir sama persis dengan BFS. Bedanya cuma satu: **queue diganti stack**. Fakta ini bagus untuk ditunjukkan saat mengajar — dua algoritma yang terasa sangat berbeda ternyata cuma berbeda pada pilihan strukturnya.

Kapan memilih DFS?

- **Menelusuri semua kemungkinan**, misalnya menyelesaikan labirin atau sudoku
- **Mendeteksi siklus** dalam graph
- **Mencari komponen terhubung** — bagian graph yang saling terpisah
- **Topological sort** untuk mengurutkan tugas yang saling bergantung

Yang perlu diwaspadai: pada graph yang sangat besar, DFS rekursif berisiko **stack overflow** karena kedalamannya bisa mencapai V. Untuk kasus itu, pakai versi iteratif dengan stack manual.

Perlu ditegaskan juga: **DFS tidak menjamin jalur terpendek.** Ia menemukan *sebuah* jalur, belum tentu yang terpendek. Untuk jalur terpendek pada graph tanpa bobot, gunakan BFS.
`
    },
    {
      bahasa: 'python',
      kode: '# Perbandingan cepat:\n# BFS -> queue  -> melebar -> jalur TERPENDEK\n# DFS -> stack  -> mendalam -> semua kemungkinan\n# Keduanya O(V + E) dengan adjacency list',
      penjelasan: `
Kedua algoritma ini **struktur kodenya nyaris identik** — yang berbeda cuma wadah penyimpanannya.

- Pakai **queue** (FIFO) → yang masuk duluan keluar duluan → penjelajahan **melebar** → BFS
- Pakai **stack** (LIFO) → yang masuk terakhir keluar duluan → penjelajahan **mendalam** → DFS

Ini contoh bagus untuk menunjukkan bahwa **memilih struktur data adalah keputusan algoritmik**, bukan sekadar soal penyimpanan. Satu penggantian kecil mengubah seluruh perilaku dan kegunaannya.

Biaya keduanya sama, yaitu **O(V + E)** dengan adjacency list, karena tiap vertex dikunjungi sekali dan tiap edge diperiksa sekali. Dengan adjacency matrix, keduanya menjadi **O(V²)** karena mencari tetangga memaksa pemeriksaan satu baris penuh.

Perbedaan pemakaian memorinya patut diperhatikan:

- **BFS** menyimpan seluruh vertex satu tingkat sekaligus, sehingga boros pada graph yang **lebar**
- **DFS** menyimpan jalur dari awal sampai posisi sekarang, sehingga boros pada graph yang **dalam**

Kalau harus memilih satu kalimat untuk mahasiswa: **"butuh jalur terpendek pakai BFS, butuh menelusuri semua kemungkinan pakai DFS."**
`
    }
  ],

  kode: {
    csharp: String.raw`using System;
using System.Collections.Generic;
using System.Linq;

class Graph {
    private int V;
    private List<List<int>> adj;          // adjacency list: O(V + E)

    public Graph(int v) {
        V = v;
        adj = new List<List<int>>();
        for (int i = 0; i < v; i++) adj.Add(new List<int>());
    }

    public void TambahEdge(int a, int b) {
        adj[a].Add(b);
        adj[b].Add(a);                    // WAJIB dua arah untuk undirected
    }

    public void CetakList() {
        for (int i = 0; i < V; i++)
            Console.WriteLine($"  {i} -> {string.Join(" ", adj[i])}");
    }

    // BFS: queue, melebar, jalur TERPENDEK
    public List<int> Bfs(int mulai) {
        var visited = new bool[V];        // WAJIB ADA
        var hasil = new List<int>();
        var q = new Queue<int>();

        visited[mulai] = true;            // tandai SAAT MASUK antrean
        q.Enqueue(mulai);

        while (q.Count > 0) {
            int v = q.Dequeue();
            hasil.Add(v);
            foreach (int t in adj[v]) {
                if (!visited[t]) { visited[t] = true; q.Enqueue(t); }
            }
        }
        return hasil;
    }

    // DFS rekursif: mendalam
    public void DfsRekursif(int v, bool[] visited, List<int> hasil) {
        visited[v] = true;                // tandai SEBELUM menelusuri
        hasil.Add(v);
        foreach (int t in adj[v])
            if (!visited[t]) DfsRekursif(t, visited, hasil);
    }

    // DFS iteratif: sama seperti BFS, queue diganti STACK
    public List<int> DfsIteratif(int mulai) {
        var visited = new bool[V];
        var hasil = new List<int>();
        var s = new Stack<int>();
        s.Push(mulai);

        while (s.Count > 0) {
            int v = s.Pop();              // Pop, bukan Dequeue
            if (visited[v]) continue;
            visited[v] = true;
            hasil.Add(v);
            for (int i = adj[v].Count - 1; i >= 0; i--)
                if (!visited[adj[v][i]]) s.Push(adj[v][i]);
        }
        return hasil;
    }

    // BFS memberi jarak terpendek pada graph tanpa bobot
    public int[] JarakDari(int mulai) {
        var jarak = Enumerable.Repeat(-1, V).ToArray();
        var q = new Queue<int>();
        jarak[mulai] = 0;
        q.Enqueue(mulai);

        while (q.Count > 0) {
            int v = q.Dequeue();
            foreach (int t in adj[v]) {
                if (jarak[t] == -1) {     // -1 sekaligus penanda visited
                    jarak[t] = jarak[v] + 1;
                    q.Enqueue(t);
                }
            }
        }
        return jarak;
    }

    public int HitungKomponen() {
        var visited = new bool[V];
        int komponen = 0;
        for (int i = 0; i < V; i++)
            if (!visited[i]) { komponen++; DfsRekursif(i, visited, new List<int>()); }
        return komponen;
    }
}

class Program {
    static void Main() {
        //   0 --- 1
        //   |     |
        //   2 --- 3 --- 4     5 (terpisah)
        var g = new Graph(6);
        g.TambahEdge(0, 1); g.TambahEdge(0, 2);
        g.TambahEdge(1, 3); g.TambahEdge(2, 3); g.TambahEdge(3, 4);

        Console.WriteLine("--- ADJACENCY LIST ---");
        g.CetakList();

        Console.WriteLine($"\nBFS dari 0          : {string.Join(" ", g.Bfs(0))}");

        var hasil = new List<int>();
        g.DfsRekursif(0, new bool[6], hasil);
        Console.WriteLine($"DFS rekursif dari 0 : {string.Join(" ", hasil)}");
        Console.WriteLine($"DFS iteratif dari 0 : {string.Join(" ", g.DfsIteratif(0))}");

        Console.WriteLine("\njarak terpendek dari 0:");
        int[] jarak = g.JarakDari(0);
        for (int i = 0; i < 6; i++)
            Console.WriteLine($"  ke {i} : {(jarak[i] == -1 ? "tidak terhubung" : jarak[i] + " langkah")}");

        Console.WriteLine($"\nkomponen terhubung : {g.HitungKomponen()}");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static int V = 6;
    static List<List<Integer>> adj = new ArrayList<>();

    static void tambahEdge(int a, int b) {
        adj.get(a).add(b);
        adj.get(b).add(a);                // WAJIB dua arah untuk undirected
    }

    // BFS: queue, melebar, jalur TERPENDEK
    static List<Integer> bfs(int mulai) {
        boolean[] visited = new boolean[V];        // WAJIB ADA
        List<Integer> hasil = new ArrayList<>();
        Queue<Integer> q = new ArrayDeque<>();

        visited[mulai] = true;                     // tandai SAAT MASUK antrean
        q.offer(mulai);

        while (!q.isEmpty()) {
            int v = q.poll();
            hasil.add(v);
            for (int t : adj.get(v)) {
                if (!visited[t]) { visited[t] = true; q.offer(t); }
            }
        }
        return hasil;
    }

    // DFS rekursif
    static void dfsRekursif(int v, boolean[] visited, List<Integer> hasil) {
        visited[v] = true;                         // tandai SEBELUM menelusuri
        hasil.add(v);
        for (int t : adj.get(v))
            if (!visited[t]) dfsRekursif(t, visited, hasil);
    }

    // DFS iteratif: struktur sama dengan BFS, queue diganti STACK
    static List<Integer> dfsIteratif(int mulai) {
        boolean[] visited = new boolean[V];
        List<Integer> hasil = new ArrayList<>();
        Deque<Integer> s = new ArrayDeque<>();
        s.push(mulai);

        while (!s.isEmpty()) {
            int v = s.pop();                       // pop, bukan poll
            if (visited[v]) continue;
            visited[v] = true;
            hasil.add(v);
            List<Integer> tetangga = adj.get(v);
            for (int i = tetangga.size() - 1; i >= 0; i--)
                if (!visited[tetangga.get(i)]) s.push(tetangga.get(i));
        }
        return hasil;
    }

    // BFS memberi jarak terpendek pada graph tanpa bobot
    static int[] jarakDari(int mulai) {
        int[] jarak = new int[V];
        Arrays.fill(jarak, -1);
        Queue<Integer> q = new ArrayDeque<>();
        jarak[mulai] = 0;
        q.offer(mulai);

        while (!q.isEmpty()) {
            int v = q.poll();
            for (int t : adj.get(v)) {
                if (jarak[t] == -1) {              // -1 sekaligus penanda visited
                    jarak[t] = jarak[v] + 1;
                    q.offer(t);
                }
            }
        }
        return jarak;
    }

    public static void main(String[] args) {
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());

        //   0 --- 1
        //   |     |
        //   2 --- 3 --- 4     5 (terpisah)
        tambahEdge(0, 1); tambahEdge(0, 2);
        tambahEdge(1, 3); tambahEdge(2, 3); tambahEdge(3, 4);

        System.out.println("--- ADJACENCY LIST ---");
        for (int i = 0; i < V; i++) System.out.println("  " + i + " -> " + adj.get(i));

        System.out.println("\nBFS dari 0          : " + bfs(0));

        List<Integer> hasil = new ArrayList<>();
        dfsRekursif(0, new boolean[V], hasil);
        System.out.println("DFS rekursif dari 0 : " + hasil);
        System.out.println("DFS iteratif dari 0 : " + dfsIteratif(0));

        System.out.println("\njarak terpendek dari 0:");
        int[] jarak = jarakDari(0);
        for (int i = 0; i < V; i++)
            System.out.println("  ke " + i + " : " +
                (jarak[i] == -1 ? "tidak terhubung" : jarak[i] + " langkah"));

        // Menghitung komponen terhubung
        boolean[] v2 = new boolean[V];
        int komponen = 0;
        for (int i = 0; i < V; i++)
            if (!v2[i]) { komponen++; dfsRekursif(i, v2, new ArrayList<>()); }
        System.out.println("\nkomponen terhubung : " + komponen);

        System.out.println("\nBFS -> queue -> melebar  -> jalur terpendek");
        System.out.println("DFS -> stack -> mendalam -> semua kemungkinan");
    }
}`,

    js: String.raw`class Graph {
    constructor() {
        this.adj = new Map();           // adjacency list memakai Map
    }

    tambahVertex(v) {
        if (!this.adj.has(v)) this.adj.set(v, []);
    }

    tambahEdge(a, b) {
        this.tambahVertex(a);
        this.tambahVertex(b);
        this.adj.get(a).push(b);
        this.adj.get(b).push(a);        // WAJIB dua arah untuk undirected
    }

    cetak() {
        for (const [v, tetangga] of this.adj)
            console.log("  " + v + " -> [" + tetangga.join(", ") + "]");
    }

    // BFS: queue, melebar, jalur TERPENDEK
    bfs(mulai) {
        const visited = new Set([mulai]);      // WAJIB ADA
        const hasil = [];
        const antrean = [mulai];
        let depan = 0;                          // penanda supaya tetap O(1)

        while (depan < antrean.length) {
            const v = antrean[depan++];
            hasil.push(v);
            for (const t of this.adj.get(v)) {
                if (!visited.has(t)) {
                    visited.add(t);             // tandai SAAT MASUK antrean
                    antrean.push(t);
                }
            }
        }
        return hasil;
    }

    // DFS rekursif
    dfsRekursif(v, visited = new Set(), hasil = []) {
        visited.add(v);                         // tandai SEBELUM menelusuri
        hasil.push(v);
        for (const t of this.adj.get(v))
            if (!visited.has(t)) this.dfsRekursif(t, visited, hasil);
        return hasil;
    }

    // DFS iteratif: sama seperti BFS, hanya pop() bukan geser depan
    dfsIteratif(mulai) {
        const visited = new Set();
        const hasil = [];
        const tumpuk = [mulai];

        while (tumpuk.length > 0) {
            const v = tumpuk.pop();             // LIFO — inilah satu-satunya bedanya
            if (visited.has(v)) continue;
            visited.add(v);
            hasil.push(v);
            const tetangga = this.adj.get(v);
            for (let i = tetangga.length - 1; i >= 0; i--)
                if (!visited.has(tetangga[i])) tumpuk.push(tetangga[i]);
        }
        return hasil;
    }

    jarakDari(mulai) {
        const jarak = new Map([[mulai, 0]]);    // Map sekaligus jadi visited
        const antrean = [mulai];
        let depan = 0;

        while (depan < antrean.length) {
            const v = antrean[depan++];
            for (const t of this.adj.get(v)) {
                if (!jarak.has(t)) {
                    jarak.set(t, jarak.get(v) + 1);
                    antrean.push(t);
                }
            }
        }
        return jarak;
    }

    jalurTerpendek(mulai, tujuan) {
        if (mulai === tujuan) return [mulai];
        const asal = new Map([[mulai, null]]);
        const antrean = [mulai];
        let depan = 0;

        while (depan < antrean.length) {
            const v = antrean[depan++];
            for (const t of this.adj.get(v)) {
                if (!asal.has(t)) {
                    asal.set(t, v);
                    if (t === tujuan) {          // runut balik ke awal
                        const jalur = [t];
                        while (asal.get(jalur[jalur.length - 1]) !== null)
                            jalur.push(asal.get(jalur[jalur.length - 1]));
                        return jalur.reverse();
                    }
                    antrean.push(t);
                }
            }
        }
        return null;                             // tidak terhubung
    }
}

//   0 --- 1
//   |     |
//   2 --- 3 --- 4     5 (terpisah)
const g = new Graph();
for (const [a, b] of [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]]) g.tambahEdge(a, b);
g.tambahVertex(5);

console.log("--- ADJACENCY LIST ---");
g.cetak();

console.log("\nBFS dari 0          :", g.bfs(0).join(" "));
console.log("DFS rekursif dari 0 :", g.dfsRekursif(0).join(" "));
console.log("DFS iteratif dari 0 :", g.dfsIteratif(0).join(" "));

console.log("\njarak terpendek dari 0:");
const jarak = g.jarakDari(0);
for (const v of [0, 1, 2, 3, 4, 5]) {
    const d = jarak.get(v);
    console.log("  ke " + v + " : " + (d === undefined ? "tidak terhubung" : d + " langkah"));
}

console.log("\njalur terpendek 0 -> 4 :", g.jalurTerpendek(0, 4));
console.log("jalur terpendek 0 -> 5 :", g.jalurTerpendek(0, 5));

console.log("\nBFS -> queue -> melebar  -> jalur TERPENDEK");
console.log("DFS -> stack -> mendalam -> semua kemungkinan");
console.log("\nTanpa visited, graph berlingkar akan dijelajahi selamanya.");`,

    c: String.raw`#include <stdio.h>
#include <stdlib.h>
#define MAKS 10

/* ---------- ADJACENCY MATRIX ---------- */
int matrix[MAKS][MAKS] = {0};
int jumlahVertex = 6;

void tambahEdge(int a, int b) {
    matrix[a][b] = 1;
    matrix[b][a] = 1;          // WAJIB dua arah untuk graph undirected
}

void cetakMatrix(void) {
    printf("    ");
    for (int i = 0; i < jumlahVertex; i++) printf("%2d", i);
    printf("\n");
    for (int i = 0; i < jumlahVertex; i++) {
        printf("%2d :", i);
        for (int j = 0; j < jumlahVertex; j++) printf("%2d", matrix[i][j]);
        printf("\n");
    }
}

/* ---------- BFS: queue, melebar, jalur terpendek ---------- */
void bfs(int mulai) {
    int visited[MAKS] = {0};
    int antrean[MAKS], depan = 0, belakang = 0;

    visited[mulai] = 1;                    // tandai SAAT MASUK antrean
    antrean[belakang++] = mulai;

    printf("BFS dari %d : ", mulai);
    while (depan < belakang) {
        int v = antrean[depan++];
        printf("%d ", v);

        for (int t = 0; t < jumlahVertex; t++) {
            if (matrix[v][t] && !visited[t]) {
                visited[t] = 1;            // tandai sebelum dimasukkan
                antrean[belakang++] = t;
            }
        }
    }
    printf("\n");
}

/* ---------- DFS rekursif: mendalam ---------- */
void dfsRekursif(int v, int visited[]) {
    visited[v] = 1;                        // tandai SEBELUM menelusuri
    printf("%d ", v);

    for (int t = 0; t < jumlahVertex; t++)
        if (matrix[v][t] && !visited[t])
            dfsRekursif(t, visited);
}

/* ---------- DFS iteratif: sama seperti BFS, queue diganti STACK ---------- */
void dfsIteratif(int mulai) {
    int visited[MAKS] = {0};
    int tumpuk[MAKS], atas = 0;

    tumpuk[atas++] = mulai;
    printf("DFS iteratif  : ");

    while (atas > 0) {
        int v = tumpuk[--atas];            // pop, bukan dequeue
        if (visited[v]) continue;
        visited[v] = 1;
        printf("%d ", v);

        for (int t = jumlahVertex - 1; t >= 0; t--)   // mundur supaya urut
            if (matrix[v][t] && !visited[t]) tumpuk[atas++] = t;
    }
    printf("\n");
}

/* ---------- BFS mencari JARAK TERPENDEK ---------- */
void jarakTerpendek(int mulai) {
    int jarak[MAKS], visited[MAKS] = {0};
    int antrean[MAKS], depan = 0, belakang = 0;

    for (int i = 0; i < jumlahVertex; i++) jarak[i] = -1;

    visited[mulai] = 1; jarak[mulai] = 0;
    antrean[belakang++] = mulai;

    while (depan < belakang) {
        int v = antrean[depan++];
        for (int t = 0; t < jumlahVertex; t++) {
            if (matrix[v][t] && !visited[t]) {
                visited[t] = 1;
                jarak[t] = jarak[v] + 1;   // satu langkah dari v
                antrean[belakang++] = t;
            }
        }
    }

    printf("\njarak terpendek dari %d:\n", mulai);
    for (int i = 0; i < jumlahVertex; i++)
        printf("  ke %d : %d langkah\n", i, jarak[i]);
}

int main(void) {
    /*   0 --- 1
         |     |
         2 --- 3 --- 4     5 (terpisah)  */
    tambahEdge(0, 1);
    tambahEdge(0, 2);
    tambahEdge(1, 3);
    tambahEdge(2, 3);
    tambahEdge(3, 4);

    printf("--- ADJACENCY MATRIX ---\n");
    cetakMatrix();
    printf("(simetris -> tanda graph undirected)\n\n");

    bfs(0);

    int visited[MAKS] = {0};
    printf("DFS rekursif  : ");
    dfsRekursif(0, visited);
    printf("\n");

    dfsIteratif(0);

    jarakTerpendek(0);

    printf("\nvertex 5 tidak tercapai -> komponen terpisah\n");

    return 0;
}`,

    cpp: String.raw`#include <iostream>
#include <vector>
#include <queue>
#include <stack>
using namespace std;

/* ADJACENCY LIST: hemat memori, O(V + E) */
class Graph {
    int V;
    vector<vector<int>> adj;      // adj[i] = daftar tetangga vertex i

public:
    Graph(int v) : V(v), adj(v) {}

    void tambahEdge(int a, int b) {
        adj[a].push_back(b);
        adj[b].push_back(a);      // dua arah untuk undirected
    }

    void cetakList() {
        for (int i = 0; i < V; i++) {
            cout << "  " << i << " -> ";
            for (int t : adj[i]) cout << t << " ";
            cout << endl;
        }
    }

    void bfs(int mulai) {
        vector<bool> visited(V, false);
        queue<int> q;

        visited[mulai] = true;    // tandai saat MASUK antrean
        q.push(mulai);

        cout << "BFS : ";
        while (!q.empty()) {
            int v = q.front(); q.pop();
            cout << v << " ";
            for (int t : adj[v]) {
                if (!visited[t]) { visited[t] = true; q.push(t); }
            }
        }
        cout << endl;
    }

    void dfsRekursif(int v, vector<bool> &visited) {
        visited[v] = true;
        cout << v << " ";
        for (int t : adj[v])
            if (!visited[t]) dfsRekursif(t, visited);
    }

    /* Perhatikan: strukturnya sama persis dengan BFS,
       hanya queue diganti stack. */
    void dfsIteratif(int mulai) {
        vector<bool> visited(V, false);
        stack<int> s;
        s.push(mulai);

        cout << "DFS iteratif : ";
        while (!s.empty()) {
            int v = s.top(); s.pop();
            if (visited[v]) continue;
            visited[v] = true;
            cout << v << " ";
            for (int t : adj[v])
                if (!visited[t]) s.push(t);
        }
        cout << endl;
    }

    /* BFS memberi jarak terpendek pada graph tanpa bobot */
    vector<int> jarakDari(int mulai) {
        vector<int> jarak(V, -1);
        queue<int> q;
        jarak[mulai] = 0;
        q.push(mulai);

        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (int t : adj[v]) {
                if (jarak[t] == -1) {            // -1 sekaligus penanda visited
                    jarak[t] = jarak[v] + 1;
                    q.push(t);
                }
            }
        }
        return jarak;
    }

    /* DFS untuk menghitung komponen terhubung */
    int hitungKomponen() {
        vector<bool> visited(V, false);
        int komponen = 0;
        for (int i = 0; i < V; i++) {
            if (!visited[i]) { komponen++; dfsRekursif(i, visited); }
        }
        return komponen;
    }
};

int main() {
    Graph g(6);
    g.tambahEdge(0, 1);
    g.tambahEdge(0, 2);
    g.tambahEdge(1, 3);
    g.tambahEdge(2, 3);
    g.tambahEdge(3, 4);
    // vertex 5 sengaja dibiarkan terpisah

    cout << "--- ADJACENCY LIST ---" << endl;
    g.cetakList();
    cout << endl;

    g.bfs(0);

    vector<bool> visited(6, false);
    cout << "DFS rekursif : ";
    g.dfsRekursif(0, visited);
    cout << endl;

    g.dfsIteratif(0);

    cout << "\njarak terpendek dari 0:" << endl;
    vector<int> jarak = g.jarakDari(0);
    for (int i = 0; i < 6; i++)
        cout << "  ke " << i << " : " << jarak[i]
             << (jarak[i] == -1 ? "  (tidak terhubung)" : " langkah") << endl;

    cout << "\nkomponen terhubung : ";
    int k = g.hitungKomponen();
    cout << "\njumlahnya " << k << endl;

    return 0;
}`,

    python: String.raw`from collections import deque, defaultdict


class Graph:
    def __init__(self):
        self.adj = defaultdict(list)      # adjacency list

    def tambah_edge(self, a, b):
        self.adj[a].append(b)
        self.adj[b].append(a)             # dua arah untuk undirected

    def cetak(self):
        for v in sorted(self.adj):
            print(f"  {v} -> {self.adj[v]}")

    def bfs(self, mulai):
        """Queue -> melebar -> jalur terpendek."""
        visited = {mulai}                 # tandai saat MASUK antrean
        antrean = deque([mulai])
        hasil = []

        while antrean:
            v = antrean.popleft()         # FIFO
            hasil.append(v)
            for t in self.adj[v]:
                if t not in visited:
                    visited.add(t)
                    antrean.append(t)
        return hasil

    def dfs_rekursif(self, v, visited=None, hasil=None):
        """Stack (lewat call stack) -> mendalam."""
        if visited is None:
            visited, hasil = set(), []
        visited.add(v)                    # tandai SEBELUM menelusuri
        hasil.append(v)
        for t in self.adj[v]:
            if t not in visited:
                self.dfs_rekursif(t, visited, hasil)
        return hasil

    def dfs_iteratif(self, mulai):
        """Sama persis dengan BFS, queue diganti stack."""
        visited, tumpuk, hasil = set(), [mulai], []
        while tumpuk:
            v = tumpuk.pop()              # LIFO — inilah satu-satunya bedanya
            if v in visited:
                continue
            visited.add(v)
            hasil.append(v)
            for t in reversed(self.adj[v]):
                if t not in visited:
                    tumpuk.append(t)
        return hasil

    def jarak_dari(self, mulai):
        """BFS memberi jarak terpendek pada graph tanpa bobot."""
        jarak = {mulai: 0}
        antrean = deque([mulai])
        while antrean:
            v = antrean.popleft()
            for t in self.adj[v]:
                if t not in jarak:        # dict sekaligus jadi penanda visited
                    jarak[t] = jarak[v] + 1
                    antrean.append(t)
        return jarak

    def jalur_terpendek(self, mulai, tujuan):
        """Menyimpan asal tiap simpul supaya jalurnya bisa direkonstruksi."""
        if mulai == tujuan:
            return [mulai]
        asal = {mulai: None}
        antrean = deque([mulai])
        while antrean:
            v = antrean.popleft()
            for t in self.adj[v]:
                if t not in asal:
                    asal[t] = v
                    if t == tujuan:                   # runut balik ke awal
                        jalur = [t]
                        while asal[jalur[-1]] is not None:
                            jalur.append(asal[jalur[-1]])
                        return jalur[::-1]
                    antrean.append(t)
        return None                                   # tidak terhubung


#   0 --- 1
#   |     |
#   2 --- 3 --- 4     5 (terpisah)
g = Graph()
for a, b in [(0,1), (0,2), (1,3), (2,3), (3,4)]:
    g.tambah_edge(a, b)
g.adj[5]                                  # vertex terpisah

print("--- ADJACENCY LIST ---")
g.cetak()

print("\nBFS dari 0          :", g.bfs(0))
print("DFS rekursif dari 0 :", g.dfs_rekursif(0))
print("DFS iteratif dari 0 :", g.dfs_iteratif(0))

print("\njarak terpendek dari 0:")
jarak = g.jarak_dari(0)
for v in range(6):
    d = jarak.get(v)
    print(f"  ke {v} : {d if d is not None else 'tidak terhubung'}")

print("\njalur terpendek 0 -> 4 :", g.jalur_terpendek(0, 4))
print("jalur terpendek 0 -> 5 :", g.jalur_terpendek(0, 5))

# Membuktikan kenapa visited itu WAJIB
print("\nTanpa visited, graph berlingkar 0-1-3-2-0 akan")
print("dijelajahi selamanya: 0 -> 1 -> 3 -> 2 -> 0 -> 1 -> ...")`
  },

  output: `--- ADJACENCY MATRIX ---
     0 1 2 3 4 5
 0 : 0 1 1 0 0 0
 1 : 1 0 0 1 0 0
 2 : 1 0 0 1 0 0
 3 : 0 1 1 0 1 0
 4 : 0 0 0 1 0 0
 5 : 0 0 0 0 0 0
(simetris -> tanda graph undirected)

BFS dari 0 : 0 1 2 3 4
DFS rekursif  : 0 1 3 2 4
DFS iteratif  : 0 1 3 2 4

jarak terpendek dari 0:
  ke 0 : 0 langkah
  ke 1 : 1 langkah
  ke 2 : 1 langkah
  ke 3 : 2 langkah
  ke 4 : 3 langkah
  ke 5 : -1 langkah

vertex 5 tidak tercapai -> komponen terpisah`,

  kompleksitas: {
    tabel: [
      { operasi: 'BFS / DFS — adjacency list', waktu: 'O(V + E)', memori: 'O(V)' },
      { operasi: 'BFS / DFS — adjacency matrix', waktu: 'O(V²)', memori: 'O(V)' },
      { operasi: 'Cek hubungan — matrix', waktu: 'O(1)', memori: '—' },
      { operasi: 'Cek hubungan — list', waktu: 'O(derajat)', memori: '—' },
      { operasi: 'Ambil semua tetangga — matrix', waktu: 'O(V)', memori: '—' },
      { operasi: 'Ambil semua tetangga — list', waktu: 'O(derajat)', memori: '—' },
      { operasi: 'Penyimpanan — adjacency matrix', waktu: '—', memori: 'O(V²)' },
      { operasi: 'Penyimpanan — adjacency list', waktu: '—', memori: 'O(V + E)' }
    ],
    intuisi: `
**Kenapa BFS dan DFS O(V + E) dengan adjacency list?** Karena berkat penanda \`visited\`, **tiap vertex diproses tepat sekali** dan **tiap edge diperiksa paling banyak sekali** dari masing-masing ujungnya. Jadi totalnya adalah jumlah vertex ditambah jumlah edge — tidak bisa lebih.

**Kenapa dengan matrix menjadi O(V²)?** Karena untuk mencari tetangga sebuah vertex, matrix memaksa pemeriksaan **satu baris penuh sepanjang V**, termasuk sel-sel nol yang tidak berguna. Dilakukan untuk semua V vertex, hasilnya V². Untuk graph jarang, ini pemborosan besar — dan itulah alasan adjacency list menjadi pilihan bawaan.

**Kapan matrix justru lebih baik?** Saat graph-nya **padat**, yaitu jumlah edge mendekati V². Di situ O(V²) memang tak terhindarkan, dan matrix menawarkan pemeriksaan hubungan yang O(1) plus akses memori yang berdempetan sehingga ramah cache.

**Seberapa besar selisih memorinya?** Graph berisi 10.000 vertex dan 20.000 edge memerlukan **100 juta sel** dengan matrix, tapi cuma sekitar **30.000 entri** dengan list. Sebagian besar graph dunia nyata — jejaring sosial, peta jalan, jaringan internet — semuanya jarang terhubung. Karena itu list hampir selalu menang.

**Kenapa memori BFS dan DFS sama-sama O(V), tapi terasa berbeda?** Karena bagian terbesarnya adalah penanda \`visited\` yang memang sepanjang V. Tapi wadah kerjanya berbeda watak: **BFS menyimpan satu tingkat penuh sekaligus**, sehingga boros pada graph **lebar**; **DFS menyimpan jalur dari awal sampai posisi sekarang**, sehingga boros pada graph **dalam**.
`
  },

  kesalahanUmum: [
    {
      salah: 'Lupa penanda `visited` saat menjelajahi graph.',
      kenapa: 'Berbeda dari tree, graph boleh mengandung lingkaran. Tanpa penanda, penjelajahan yang masuk ke lingkaran akan **berputar selamanya** — BFS mengisi antrean sampai memori habis, dan DFS rekursif jatuh dengan stack overflow.',
      benar: 'Sediakan array atau set `visited`, periksa sebelum mengunjungi, dan tandai setelahnya. Ini **wajib** pada graph, meski tidak diperlukan pada tree.'
    },
    {
      salah: 'Pada graph undirected, hanya mencatat satu arah: `matrix[a][b] = 1;`',
      kenapa: 'Graph-mu diam-diam menjadi **directed**. Jalur hanya bisa dilewati satu arah, sehingga BFS dan DFS melewatkan sebagian vertex yang seharusnya tercapai. Tidak ada error apa pun — hasilnya saja yang salah.',
      benar: 'Catat dua arah: `matrix[a][b] = 1; matrix[b][a] = 1;`. Ciri graph undirected yang benar adalah **matriksnya simetris** terhadap diagonal.'
    },
    {
      salah: 'Pada BFS, menandai vertex saat **dikeluarkan** dari antrean, bukan saat dimasukkan.',
      kenapa: 'Satu vertex bisa terlanjur masuk antrean beberapa kali lewat tetangga berbeda sebelum sempat ditandai. Hasil akhirnya masih benar, tapi pekerjaannya berlipat — dan pada graph padat, antreannya bisa membengkak jauh melebihi V.',
      benar: 'Tandai **tepat saat memasukkan** ke antrean: `visited[t] = 1; enqueue(t);`. Dengan begitu tiap vertex dijamin masuk antrean tepat sekali.'
    },
    {
      salah: 'Mengira DFS juga menemukan jalur terpendek.',
      kenapa: 'DFS masuk sedalam mungkin ke satu arah lebih dulu, sehingga jalur yang ditemukannya bisa jauh berputar padahal ada jalur langsung. Ia menemukan **sebuah** jalur, bukan yang terpendek.',
      benar: 'Untuk jalur terpendek pada graph **tanpa bobot**, gunakan **BFS** — sifat melebar menjamin jalur pertama yang ditemukan adalah yang terpendek. Untuk graph **berbobot**, gunakan algoritma Dijkstra.'
    },
    {
      salah: 'Memakai adjacency matrix untuk graph besar yang jarang terhubung.',
      kenapa: 'Memorinya **selalu O(V²)** tanpa peduli berapa sedikit edge yang ada. Untuk 10.000 vertex, itu 100 juta sel yang hampir semuanya bernilai nol — dan penjelajahannya ikut melambat menjadi O(V²).',
      benar: 'Gunakan **adjacency list** yang memorinya O(V + E). Pakai matrix hanya bila graph-nya kecil, atau memang padat dengan edge mendekati V².'
    },
    {
      salah: 'Mengira satu kali BFS atau DFS pasti mengunjungi seluruh vertex.',
      kenapa: 'Graph bisa terdiri atas beberapa bagian yang **saling terpisah**. Penjelajahan dari satu titik hanya menjangkau komponen tempat titik itu berada, sehingga vertex di komponen lain terlewat tanpa disadari.',
      benar: 'Bungkus dengan perulangan atas semua vertex: `for (i = 0; i < V; i++) if (!visited[i]) dfs(i);`. Jumlah pemanggilan yang terjadi sekaligus menunjukkan **banyaknya komponen terhubung**.'
    }
  ],

  analogi: `
Analogi terbaik untuk graph adalah **peta pertemanan di kelas**. Tiap mahasiswa adalah vertex, tiap hubungan pertemanan adalah edge. Gambar di papan tulis dengan nama-nama asli mahasiswa — keterlibatannya langsung naik.

Dari gambar itu, konsep-konsepnya muncul sendiri:

- **Undirected** — *"kalau Budi berteman dengan Ani, otomatis Ani berteman dengan Budi"*
- **Directed** — *"tapi kalau Budi mengikuti akun Ani di media sosial, belum tentu sebaliknya"*
- **Komponen terpisah** — *"kelompok yang sama sekali tidak kenal kelompok lain"*

Untuk membedakan **BFS dan DFS**, pakai analogi **mencari teman di gedung berlantai banyak**:

- **BFS** — *"periksa dulu semua ruangan di lantai ini, baru naik ke lantai berikutnya."* Menyeluruh dan berlapis
- **DFS** — *"masuk satu lorong, terus sampai buntu, baru balik dan coba lorong lain."* Nekat dan mendalam

Peragaan yang paling meyakinkan untuk **kenapa BFS memberi jalur terpendek**: pakai jejaring pertemanan tadi, lalu tanya *"berapa perantara dari Budi ke Citra?"* Mahasiswa secara alami akan memeriksa **semua teman langsung Budi dulu**, baru teman dari teman. Itulah BFS — dan karena semua jarak 1 diperiksa sebelum jarak 2, jawaban pertama yang ditemukan **pasti** yang terpendek.

Untuk **kenapa \`visited\` wajib ada**, peragakan dengan tiga mahasiswa berdiri melingkar saling menunjuk. Minta seseorang menelusuri tanpa mencatat siapa yang sudah dikunjungi — ia akan berputar terus. Setelah beberapa putaran, tanya *"kapan ini berhenti?"* Jawabannya tidak pernah, dan kebutuhan akan penanda jadi terasa sendiri.

Terakhir, tunjukkan bahwa **BFS dan DFS cuma berbeda satu baris**: queue diganti stack. Tulis kedua versi iteratifnya berdampingan di papan tulis. Fakta bahwa dua algoritma yang perilakunya sangat berbeda ternyata cuma dibedakan oleh pilihan struktur data biasanya menjadi bagian yang paling berkesan dari seluruh materi struktur data.
`,

  latihan: [
    'Buat graph undirected dengan 6 vertex memakai adjacency matrix, lalu jalankan BFS dan DFS dari vertex 0. Bandingkan urutan kunjungannya dan jelaskan kenapa berbeda.',
    'Ubah program di atas agar memakai **adjacency list**. Bandingkan pemakaian memorinya untuk graph berisi 1000 vertex dengan hanya 20 edge.',
    'Sengaja hapus penanda `visited` dari fungsi BFS, lalu jalankan pada graph yang mengandung lingkaran. Catat apa yang terjadi, lalu kembalikan dan jelaskan sebabnya.',
    'Buat fungsi yang menghitung **jarak terpendek** dari satu vertex ke semua vertex lain memakai BFS. Tampilkan hasilnya, dan tandai vertex yang tidak terhubung.',
    'Buat fungsi yang mengembalikan **jalur** terpendek, bukan cuma jaraknya. Petunjuk: simpan asal tiap vertex saat dikunjungi, lalu runut balik dari tujuan.',
    'Buat fungsi yang menghitung berapa **komponen terhubung** yang ada dalam sebuah graph. Petunjuk: jalankan DFS dari setiap vertex yang belum dikunjungi, lalu hitung berapa kali DFS dipanggil.',
    'Sengaja catat edge hanya satu arah pada graph undirected, lalu jalankan BFS. Vertex mana yang jadi terlewat, dan kenapa? Setelah itu perbaiki.',
    'Uji pemahaman: rancang peragaan 5 menit memakai peta pertemanan kelas untuk menjelaskan BFS dan DFS. Targetnya, kamu bisa menyimpulkan sendiri kenapa BFS memberi jalur terpendek sedangkan DFS tidak.'
  ]
});
