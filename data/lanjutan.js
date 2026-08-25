/* ============================================================
   lanjutan.js — materi kategori "lanjutan"

   Kategori ini di LUAR spec awal. Isinya melengkapi lubang yang
   tersisa: Big-O yang dipakai di seluruh situs tapi belum pernah
   dibahas tersendiri, sorting O(n log n), dynamic programming,
   dan jalur terpendek pada graph berbobot.
   ============================================================ */

TOPICS.push({
  id: 'analisis-kompleksitas',
  judul: 'Analisis Kompleksitas (Big-O)',
  kategori: 'lanjutan',
  tag: ['big-o', 'kompleksitas', 'analisis', 'O(n)', 'O(log n)', 'growth'],
  ringkas: 'Cara menghitung sendiri O(...) sebuah algoritma — notasi yang dipakai di seluruh situs ini.',

  fungsi: `**Meramalkan apakah programmu akan tetap cepat saat datanya membesar.**

Terpakai di:

- **Memilih algoritma** sebelum menulisnya
- **Menjelaskan kenapa program lambat** saat data bertambah
- **Wawancara kerja** — hampir selalu ditanyakan
- **Menilai apakah brute force layak** — kamu sudah memakainya di Matematika Diskrit

Yang paling berguna dipahami: **Big-O berbicara tentang bagaimana waktu TUMBUH, bukan berapa lama.**

Algoritma \`O(n log n)\` bisa lebih lambat daripada \`O(n²)\` untuk data kecil. Yang dijanjikan Big-O adalah bahwa pada suatu ukuran, yang pertama akan menang — dan menang semakin telak.

Dan yang sering dilupakan: **Big-O mengabaikan konstanta dan cache**, sehingga array bisa mengalahkan linked list meski keduanya \`O(n)\`.`,

  praktik: {
    tujuan: `Kamu bisa menentukan kompleksitas sebuah fungsi dan membuktikannya dengan pengukuran nyata.`,
    alat: [
      'Python 3',
      'Modul time',
      'matplotlib untuk grafik'
    ],
    langkah: [
      { judul: 'Tentukan dari struktur perulangannya',
        isi: `- satu perulangan sepanjang n → \`O(n)\`
- dua perulangan bersarang → \`O(n²)\`
- membagi dua tiap langkah → \`O(log n)\`
- mengurutkan lalu menelusuri → \`O(n log n)\`

Buang konstanta dan suku berorde rendah: \`3n² + 1000n\` tetap \`O(n²)\`.` },
      { judul: 'Buktikan dengan pengukuran',
        isi: `Ukur waktu fungsimu untuk n = 1000, 2000, 4000, dan 8000.

- \`O(n)\` → waktunya **berlipat dua** tiap n berlipat dua
- \`O(n²)\` → berlipat **empat**
- \`O(log n)\` → bertambah **sedikit** saja

Kalau pola pengukuranmu tidak cocok dengan dugaanmu, salah satunya keliru — dan itu layak diselidiki.` },
      { judul: 'Gambar grafiknya',
        isi: `Plot waktu terhadap n untuk beberapa algoritma di satu gambar.

Bentuk kurvanya jauh lebih jelas daripada tabel angka, dan langsung menunjukkan mana yang meledak.

Pakai skala logaritmik kalau selisihnya terlalu besar.` },
      { judul: 'Cari titik potongnya',
        isi: `Bandingkan \`n²\` dengan \`100 n log n\`. Untuk n kecil, yang kedua lebih lambat meski teorinya lebih baik.

Cari n berapa keduanya berpotongan.

Ini menjelaskan kenapa pustaka pengurutan memakai Insertion Sort untuk bagian kecil, dan baru beralih ke algoritma canggih untuk bagian besar.` },
      { judul: 'Bedakan kasus terbaik, rata-rata, dan terburuk',
        isi: `Ukur algoritma yang sama pada data acak, data sudah terurut, dan data terbalik.

Insertion Sort sangat cepat pada data hampir terurut. Quick Sort dengan pivot buruk bisa merosot ke \`O(n²)\` pada data terurut.

Notasi Big-O saja tidak menceritakan ini.` },
      { judul: 'Perhatikan kompleksitas ruang juga',
        isi: `Merge Sort butuh \`O(n)\` memori tambahan; Quick Sort hanya \`O(log n)\` untuk stack rekursinya.

Untuk data yang hampir memenuhi memori, perbedaan ini menentukan mana yang bisa dipakai sama sekali.` },
      { judul: 'Ingat bahwa Big-O bukan segalanya',
        isi: `Bandingkan penjumlahan sejuta angka dalam array dan dalam linked list. Keduanya \`O(n)\`, tetapi array menang telak.

Sebabnya cache — yang kamu ukur sendiri di Organisasi Komputer.

Big-O menjawab *"bagaimana ia tumbuh"*, bukan *"mana yang lebih cepat hari ini"*.` }
    ],
    cek: [
      'Waktu fungsi kuadratikmu berlipat empat setiap n berlipat dua',
      'Kamu menemukan titik n ketika algoritma n log n mulai mengalahkan n kuadrat',
      'Kamu bisa menunjukkan satu kasus di mana Big-O tidak menentukan yang lebih cepat'
    ]
  },

  konsep: `
Sepanjang situs ini kamu sudah bertemu \`O(1)\`, \`O(n)\`, \`O(log n)\`, dan \`O(n²)\` di tabel kompleksitas tiap topik. Sekarang saatnya membedah **dari mana angka-angka itu berasal**, supaya kamu bisa menghitungnya sendiri untuk algoritma apa pun.

**Kenapa tidak diukur pakai stopwatch saja?** Karena hasil pengukuran bergantung pada hal-hal yang tidak ada hubungannya dengan algoritmanya: kecepatan komputer, bahasa yang dipakai, beban sistem saat itu. Algoritma buruk di komputer cepat bisa terlihat lebih baik daripada algoritma bagus di komputer lambat — padahal kesimpulan itu menyesatkan.

**Big-O mengukur hal yang berbeda: seberapa cepat kebutuhan waktu TUMBUH ketika data bertambah.** Pertanyaannya bukan *"berapa detik?"* melainkan *"kalau datanya jadi 10 kali lipat, waktunya jadi berapa kali lipat?"*

Karena yang dinilai pertumbuhannya, dua hal boleh dibuang:

- **Konstanta pengali.** \`O(2n)\` ditulis \`O(n)\`, karena keduanya sama-sama tumbuh lurus.
- **Suku berderajat lebih rendah.** \`O(n² + n)\` ditulis \`O(n²)\`, karena saat \`n\` membesar, \`n²\` jauh mendominasi.

Kelas pertumbuhan yang perlu kamu hafal, urut dari paling cepat:

- **O(1)** — tetap. Contoh: \`arr[5]\`, push ke stack
- **O(log n)** — tumbuh sangat lambat. Contoh: binary search, operasi BST seimbang
- **O(n)** — lurus. Contoh: linear search, menjumlahkan array
- **O(n log n)** — batas terbaik pengurutan berbasis perbandingan. Contoh: merge sort
- **O(n²)** — kuadrat. Contoh: bubble sort, perulangan bersarang
- **O(2ⁿ)** — meledak. Contoh: fibonacci rekursif polos
- **O(n!)** — praktis mustahil. Contoh: mencoba semua urutan

Perlu juga dibedakan **tiga keadaan**: kasus **terbaik**, **rata-rata**, dan **terburuk**. Kalau orang menyebut kompleksitas tanpa keterangan, biasanya yang dimaksud **terburuk** — karena itulah jaminan yang bisa diandalkan.

Terakhir, selain waktu ada juga **kompleksitas memori** (*space complexity*), yang mengukur memori tambahan di luar data masukannya.
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'for (int i = 0; i < n; i++) {\n    cout << arr[i];        // dijalankan n kali\n}\n// -> O(n)',
      penjelasan: `
Cara menghitungnya sederhana: **hitung berapa kali baris terdalam dijalankan, lalu nyatakan dalam \`n\`.**

Perulangan ini berjalan dari \`0\` sampai \`n-1\`, jadi tepat \`n\` kali. Kompleksitasnya **O(n)**.

Yang penting dipahami: **isi badan perulangan tidak mengubah kelasnya**, asalkan isinya sendiri O(1). Kalau di dalamnya ada lima pernyataan, totalnya \`5n\` — dan konstanta 5 dibuang, sehingga tetap **O(n)**.

Ini sering membingungkan pemula: *"kok lima operasi dianggap sama dengan satu operasi?"* Jawabannya, Big-O tidak mengukur jumlah operasi, melainkan **pola pertumbuhannya**. Baik \`n\` maupun \`5n\`, keduanya sama-sama menjadi 10 kali lipat ketika data menjadi 10 kali lipat.

Perhatikan juga bahwa **batas perulangan yang menentukan**, bukan isinya. Perulangan \`for (i = 0; i < 100; i++)\` tetap **O(1)** meski berjalan 100 kali — karena 100 itu tetap, tidak bergantung pada \`n\`.
`
    },
    {
      bahasa: 'cpp',
      kode: 'for (int i = 0; i < n; i++)        // n kali\n    for (int j = 0; j < n; j++)    // n kali untuk SETIAP i\n        cout << arr[i][j];\n// -> n x n = O(n^2)',
      penjelasan: `
Aturan untuk perulangan bersarang: **kalikan**.

Perulangan luar berjalan \`n\` kali, dan untuk **setiap** putarannya perulangan dalam berjalan penuh \`n\` kali. Totalnya \`n × n = n²\`, sehingga **O(n²)**.

Tapi hati-hati — **bersarang tidak selalu berarti O(n²).** Yang menentukan adalah **batas perulangan dalam**:

- \`for (j = 0; j < n; j++)\` → O(n²), karena batasnya ikut \`n\`
- \`for (j = 0; j < 10; j++)\` → **O(n)**, karena batasnya tetap 10 berapa pun \`n\`
- \`for (j = i; j < n; j++)\` → tetap **O(n²)**, walau jumlah langkahnya kira-kira separuhnya

Kasus ketiga sering ditanyakan. Jumlah langkahnya adalah \`n + (n-1) + ... + 1\`, yang hasilnya \`n(n+1)/2\` — dan setelah konstanta ½ dibuang, tersisa **n²**. Inilah pola yang dipakai bubble sort dan selection sort.

Aturan yang perlu dibedakan: perulangan **bersarang dikalikan**, sedangkan perulangan **berurutan dijumlahkan** — dan pada penjumlahan, yang terbesar yang menang.
`
    },
    {
      bahasa: 'cpp',
      kode: 'while (n > 1) {\n    n = n / 2;        // data dibuang SEPARUH tiap langkah\n}\n// -> O(log n)',
      penjelasan: `
Inilah tanda pengenal **O(log n)**: setiap langkah **membuang sebagian tetap** dari sisa data — biasanya separuh.

Pertanyaan yang dijawab logaritma adalah: *"berapa kali \`n\` harus dibagi dua sampai tersisa satu?"* Untuk \`n = 8\` jawabannya 3, karena \`8 → 4 → 2 → 1\`. Dan memang \`log₂8 = 3\`.

Angkanya sangat mengesankan, dan bagus untuk kamu tunjukkan ke mahasiswa:

- 1.000 data → sekitar **10** langkah
- 1.000.000 data → sekitar **20** langkah
- 1.000.000.000 data → sekitar **30** langkah

Data bertambah **sejuta kali lipat**, langkahnya cuma bertambah **tiga kali lipat**. Karena itu O(log n) dianggap nyaris secepat O(1) dalam praktik.

Di mana pola ini muncul? **Binary search**, **operasi pada BST seimbang**, dan **sift up/down pada heap** — semuanya membagi dua.

Catatan kecil: basis logaritmanya tidak pernah ditulis, karena mengubah basis hanya mengalikan dengan konstanta — dan konstanta dibuang. Jadi \`log₂n\` dan \`log₁₀n\` sama-sama ditulis **O(log n)**.
`
    },
    {
      bahasa: 'cpp',
      kode: '// Berurutan -> DIJUMLAHKAN, yang terbesar menang\nfor (int i = 0; i < n; i++) { }          // O(n)\nfor (int i = 0; i < n; i++)              // O(n^2)\n    for (int j = 0; j < n; j++) { }\n// total: O(n + n^2) = O(n^2)',
      penjelasan: `
Dua aturan penggabungan yang harus dibedakan:

- **Bersarang** (satu di dalam yang lain) → **dikalikan**
- **Berurutan** (satu setelah yang lain) → **dijumlahkan**

Pada penjumlahan, **suku terbesar yang menentukan** dan sisanya dibuang. Jadi \`O(n + n²)\` cukup ditulis \`O(n²)\`.

Kenapa boleh dibuang? Karena saat \`n\` membesar, selisihnya makin tidak berarti. Untuk \`n = 1.000.000\`, suku \`n²\` bernilai sejuta kali lipat lebih besar daripada suku \`n\` — menambahkan \`n\` praktis tidak mengubah apa pun.

Urutan dominasi yang perlu dihafal, dari yang paling menentukan:

\`n! > 2ⁿ > n² > n log n > n > log n > 1\`

Contoh penerapannya: sebuah algoritma yang **mengurutkan dulu** lalu **mencari dengan binary search** punya biaya \`O(n log n) + O(log n)\`. Karena \`n log n\` lebih besar, totalnya **O(n log n)**.

Inilah alasan kenapa mengoptimalkan bagian yang bukan penentu sering sia-sia — kamu bisa mempercepat bagian O(n) sebanyak apa pun, tapi selama masih ada bagian O(n²), pertumbuhannya tetap dikuasai O(n²).
`
    },
    {
      bahasa: 'python',
      kode: '# HATI-HATI: operasi yang terlihat sederhana bisa mahal\nfor x in data:            # O(n)\n    if x in daftar:       # O(n) juga! -> total O(n^2)\n        ...\n\n# perbaikan: ubah daftar jadi set -> in menjadi O(1)\nhimpunan = set(daftar)\nfor x in data:            # O(n)\n    if x in himpunan:     # O(1) -> total O(n)',
      penjelasan: `
Ini jebakan yang paling sering terjadi dalam praktik, dan tidak terlihat dari bentuk kodenya.

Perulangan di atas **hanya terlihat satu tingkat**, sehingga banyak yang menyimpulkan O(n). Padahal operasi \`x in daftar\` pada sebuah **list** sendiri berbiaya **O(n)**, karena harus memeriksa isinya satu per satu. Karena dijalankan di dalam perulangan, totalnya menjadi **O(n²)**.

Pelajaran pentingnya: **kamu harus tahu biaya operasi yang kamu pakai, bukan cuma menghitung perulangan yang terlihat.**

Beberapa biaya tersembunyi yang perlu kamu ingat:

- \`x in list\` → **O(n)**, tapi \`x in set\` atau \`x in dict\` → **O(1)**
- \`list.insert(0, x)\` dan \`list.pop(0)\` → **O(n)**, karena semua elemen bergeser
- \`strlen(s)\` di C → **O(n)**, sehingga memanggilnya di dalam kondisi perulangan membuatnya O(n²)
- Menyambung string berulang di dalam perulangan → **O(n²)** di banyak bahasa
- \`array.shift()\` di JavaScript → **O(n)**

Perbaikannya biasanya sama: **pilih struktur data yang tepat.** Mengubah list menjadi set membuat pencarian jatuh dari O(n) menjadi O(1), sehingga total algoritmanya turun dari O(n²) menjadi O(n).
`
    },
    {
      bahasa: 'cpp',
      kode: '// Rekursi: berapa kali dipanggil x berapa biaya tiap panggilan\nint faktorial(int n) {\n    if (n <= 1) return 1;\n    return n * faktorial(n - 1);    // 1 cabang, kedalaman n -> O(n)\n}\n\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);     // 2 cabang -> O(2^n)\n}',
      penjelasan: `
Untuk fungsi rekursif, kalikan **berapa banyak pemanggilan** dengan **biaya tiap pemanggilan**.

**Faktorial** memanggil dirinya **satu kali** per tingkat, dan kedalamannya \`n\`. Jadi totalnya \`n\` pemanggilan, masing-masing O(1), sehingga **O(n)**.

**Fibonacci** memanggil dirinya **dua kali** per tingkat. Jumlah pemanggilannya berlipat ganda tiap turun satu tingkat: 1, 2, 4, 8, dan seterusnya — sehingga sekitar **O(2ⁿ)**.

Cara cepat menaksirnya: **perhatikan jumlah cabang dan seberapa cepat masalahnya mengecil.**

- **1 cabang, berkurang 1** (\`f(n-1)\`) → O(n)
- **1 cabang, dibagi 2** (\`f(n/2)\`) → **O(log n)**, contohnya binary search rekursif
- **2 cabang, berkurang 1** (\`f(n-1) + f(n-2)\`) → **O(2ⁿ)**
- **2 cabang, dibagi 2, plus kerja O(n)** → **O(n log n)**, contohnya merge sort

Yang terakhir itu pola *divide and conquer*, dan dibahas di topik Sorting Lanjutan.

Jangan lupa **memorinya**: rekursi memakai call stack sedalam pemanggilannya. Faktorial memakai **O(n)** memori, sedangkan versi perulangannya cuma **O(1)**.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <chrono>
#include <vector>
using namespace std;
using namespace std::chrono;

// O(1) — tetap, berapa pun n
int pertama(const vector<int>& a) {
    return a[0];
}

// O(n) — satu perulangan
long total(const vector<int>& a) {
    long t = 0;
    for (int x : a) t += x;
    return t;
}

// O(n^2) — perulangan bersarang
bool adaKembar(const vector<int>& a) {
    for (size_t i = 0; i < a.size(); i++)
        for (size_t j = i + 1; j < a.size(); j++)
            if (a[i] == a[j]) return true;
    return false;
}

// O(log n) — membuang separuh tiap langkah
int hitungPembagian(int n) {
    int langkah = 0;
    while (n > 1) { n /= 2; langkah++; }
    return langkah;
}

// JEBAKAN: terlihat O(n), padahal O(1)
void terlihatBesar(int n) {
    for (int i = 0; i < 100; i++) { }   // batasnya TETAP -> O(1)
}

int main() {
    // Membuktikan pertumbuhan O(n^2) secara nyata
    cout << "--- MENGUKUR PERTUMBUHAN O(n^2) ---" << endl;
    for (int n : {1000, 2000, 4000}) {
        vector<int> a(n);
        for (int i = 0; i < n; i++) a[i] = i;

        auto mulai = high_resolution_clock::now();
        adaKembar(a);
        auto lama = duration_cast<milliseconds>(
                        high_resolution_clock::now() - mulai).count();
        cout << "  n = " << n << " -> " << lama << " ms" << endl;
    }
    cout << "  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat" << endl;

    cout << "\n--- O(log n) tumbuh sangat lambat ---" << endl;
    for (int n : {1000, 1000000, 1000000000})
        cout << "  n = " << n << " -> " << hitungPembagian(n) << " langkah" << endl;

    cout << "\n--- PERBANDINGAN JUMLAH LANGKAH ---" << endl;
    cout << "  n         O(log n)   O(n)        O(n log n)   O(n^2)" << endl;
    for (long n : {10L, 100L, 1000L, 1000000L}) {
        long lg = hitungPembagian(n);
        cout << "  " << n
             << "\t  " << lg
             << "\t     " << n
             << "\t         " << n * lg
             << "\t      " << (n <= 1000 ? to_string(n * n) : "terlalu besar")
             << endl;
    }

    return 0;
}`,

    csharp: String.raw`using System;
using System.Diagnostics;
using System.Linq;

class Program {
    // O(1) — tetap
    static int Pertama(int[] a) => a[0];

    // O(n) — satu perulangan
    static long Total(int[] a) {
        long t = 0;
        foreach (int x in a) t += x;
        return t;
    }

    // O(n^2) — perulangan bersarang
    static bool AdaKembar(int[] a) {
        for (int i = 0; i < a.Length; i++)
            for (int j = i + 1; j < a.Length; j++)
                if (a[i] == a[j]) return true;
        return false;
    }

    // O(n) — memakai HashSet, jauh lebih baik
    static bool AdaKembarCepat(int[] a) {
        var terlihat = new System.Collections.Generic.HashSet<int>();
        foreach (int x in a) {
            if (!terlihat.Add(x)) return true;      // Add mengembalikan false kalau sudah ada
        }
        return false;
    }

    // O(log n)
    static int HitungPembagian(long n) {
        int langkah = 0;
        while (n > 1) { n /= 2; langkah++; }
        return langkah;
    }

    static void Main() {
        Console.WriteLine("--- MENGUKUR PERTUMBUHAN O(n^2) ---");
        foreach (int n in new[] { 5000, 10000, 20000 }) {
            int[] a = Enumerable.Range(0, n).ToArray();
            var jam = Stopwatch.StartNew();
            AdaKembar(a);
            Console.WriteLine($"  n = {n,-6} -> {jam.ElapsedMilliseconds} ms");
        }
        Console.WriteLine("  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat");

        Console.WriteLine("\n--- O(n^2) vs O(n) untuk masalah yang SAMA ---");
        int[] besar = Enumerable.Range(0, 40000).ToArray();

        var j1 = Stopwatch.StartNew();
        AdaKembar(besar);
        long t1 = j1.ElapsedMilliseconds;

        var j2 = Stopwatch.StartNew();
        AdaKembarCepat(besar);
        long t2 = j2.ElapsedMilliseconds;

        Console.WriteLine($"  dua perulangan (O(n^2)) : {t1} ms");
        Console.WriteLine($"  HashSet        (O(n))   : {t2} ms");

        Console.WriteLine("\n--- O(log n) tumbuh sangat lambat ---");
        foreach (long n in new[] { 1000L, 1000000L, 1000000000L })
            Console.WriteLine($"  n = {n,-12} -> {HitungPembagian(n)} langkah");

        Console.WriteLine("\n--- TABEL PERBANDINGAN ---");
        Console.WriteLine($"  {"n",-10}{"O(log n)",-12}{"O(n)",-12}{"O(n log n)",-14}O(n^2)");
        foreach (long n in new[] { 10L, 100L, 1000L, 1000000L }) {
            int lg = HitungPembagian(n);
            string kuadrat = n <= 1000 ? (n * n).ToString() : "1 triliun";
            Console.WriteLine($"  {n,-10}{lg,-12}{n,-12}{n * lg,-14}{kuadrat}");
        }
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    // O(1) — tetap
    static int pertama(int[] a) { return a[0]; }

    // O(n) — satu perulangan
    static long total(int[] a) {
        long t = 0;
        for (int x : a) t += x;
        return t;
    }

    // O(n^2) — perulangan bersarang
    static boolean adaKembar(int[] a) {
        for (int i = 0; i < a.length; i++)
            for (int j = i + 1; j < a.length; j++)
                if (a[i] == a[j]) return true;
        return false;
    }

    // O(n) — memakai HashSet untuk masalah yang SAMA
    static boolean adaKembarCepat(int[] a) {
        Set<Integer> terlihat = new HashSet<>();
        for (int x : a) {
            if (!terlihat.add(x)) return true;     // add mengembalikan false kalau sudah ada
        }
        return false;
    }

    // O(log n)
    static int hitungPembagian(long n) {
        int langkah = 0;
        while (n > 1) { n /= 2; langkah++; }
        return langkah;
    }

    public static void main(String[] args) {
        System.out.println("--- MENGUKUR PERTUMBUHAN O(n^2) ---");
        for (int n : new int[] { 5000, 10000, 20000 }) {
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = i;

            long mulai = System.currentTimeMillis();
            adaKembar(a);
            System.out.printf("  n = %-6d -> %d ms%n", n, System.currentTimeMillis() - mulai);
        }
        System.out.println("  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat");

        System.out.println("\n--- O(n^2) vs O(n) untuk masalah yang SAMA ---");
        int[] besar = new int[40000];
        for (int i = 0; i < besar.length; i++) besar[i] = i;

        long m1 = System.currentTimeMillis();
        adaKembar(besar);
        long t1 = System.currentTimeMillis() - m1;

        long m2 = System.currentTimeMillis();
        adaKembarCepat(besar);
        long t2 = System.currentTimeMillis() - m2;

        System.out.println("  dua perulangan (O(n^2)) : " + t1 + " ms");
        System.out.println("  HashSet        (O(n))   : " + t2 + " ms");

        System.out.println("\n--- O(log n) tumbuh sangat lambat ---");
        for (long n : new long[] { 1000L, 1000000L, 1000000000L })
            System.out.printf("  n = %-12d -> %d langkah%n", n, hitungPembagian(n));

        System.out.println("\n--- TABEL PERBANDINGAN ---");
        System.out.printf("  %-10s%-12s%-12s%-14s%s%n",
                          "n", "O(log n)", "O(n)", "O(n log n)", "O(n^2)");
        for (long n : new long[] { 10L, 100L, 1000L, 1000000L }) {
            int lg = hitungPembagian(n);
            String kuadrat = n <= 1000 ? String.valueOf(n * n) : "1 triliun";
            System.out.printf("  %-10d%-12d%-12d%-14d%s%n", n, lg, n, n * lg, kuadrat);
        }
    }
}`,

    python: String.raw`import time

# O(1) — tetap, berapa pun n
def pertama(a):
    return a[0]

# O(n) — satu perulangan
def total(a):
    t = 0
    for x in a:
        t += x
    return t

# O(n^2) — perulangan bersarang
def ada_kembar(a):
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            if a[i] == a[j]:
                return True
    return False

# O(n) — memakai set untuk masalah yang SAMA
def ada_kembar_cepat(a):
    terlihat = set()
    for x in a:
        if x in terlihat:        # O(1), bukan O(n)
            return True
        terlihat.add(x)
    return False

# O(log n) — membuang separuh tiap langkah
def hitung_pembagian(n):
    langkah = 0
    while n > 1:
        n //= 2
        langkah += 1
    return langkah


print("--- MENGUKUR PERTUMBUHAN O(n^2) ---")
for n in [1000, 2000, 4000]:
    a = list(range(n))
    mulai = time.perf_counter()
    ada_kembar(a)
    print(f"  n = {n:<6} -> {(time.perf_counter() - mulai) * 1000:.0f} ms")
print("  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat")

print("\n--- O(n^2) vs O(n) untuk masalah yang SAMA ---")
besar = list(range(20000))

mulai = time.perf_counter()
ada_kembar(besar)
t1 = time.perf_counter() - mulai

mulai = time.perf_counter()
ada_kembar_cepat(besar)
t2 = time.perf_counter() - mulai

print(f"  dua perulangan (O(n^2)) : {t1:.3f} detik")
print(f"  set            (O(n))   : {t2:.4f} detik")
print(f"  -> sekitar {t1 / t2:.0f}x lebih cepat")

print("\n--- O(log n) tumbuh sangat lambat ---")
for n in [1_000, 1_000_000, 1_000_000_000]:
    print(f"  n = {n:<15,} -> {hitung_pembagian(n)} langkah")

print("\n--- TABEL PERBANDINGAN JUMLAH LANGKAH ---")
print(f"  {'n':<12}{'O(log n)':<11}{'O(n)':<13}{'O(n log n)':<15}O(n^2)")
for n in [10, 100, 1_000, 1_000_000]:
    lg = hitung_pembagian(n)
    kuadrat = f"{n*n:,}" if n <= 1000 else "1 triliun"
    print(f"  {n:<12,}{lg:<11}{n:<13,}{n*lg:<15,}{kuadrat}")

# JEBAKAN: biaya tersembunyi
print("\n--- JEBAKAN BIAYA TERSEMBUNYI ---")
print("  x in list  -> O(n)   |  x in set   -> O(1)")
print("  list.pop(0)-> O(n)   |  list.pop() -> O(1)")
print("  s += huruf -> O(n^2) |  ''.join()  -> O(n)")`,

    js: String.raw`// O(1) — tetap, berapa pun n
function pertama(a) {
    return a[0];
}

// O(n) — satu perulangan
function total(a) {
    let t = 0;
    for (const x of a) t += x;
    return t;
}

// O(n^2) — perulangan bersarang
function adaKembar(a) {
    for (let i = 0; i < a.length; i++)
        for (let j = i + 1; j < a.length; j++)
            if (a[i] === a[j]) return true;
    return false;
}

// O(n) — memakai Set untuk masalah yang SAMA
function adaKembarCepat(a) {
    const terlihat = new Set();
    for (const x of a) {
        if (terlihat.has(x)) return true;    // O(1), bukan O(n)
        terlihat.add(x);
    }
    return false;
}

// O(log n) — membuang separuh tiap langkah
function hitungPembagian(n) {
    let langkah = 0;
    while (n > 1) { n = Math.floor(n / 2); langkah++; }
    return langkah;
}

console.log("--- MENGUKUR PERTUMBUHAN O(n^2) ---");
for (const n of [2000, 4000, 8000]) {
    const a = Array.from({ length: n }, function (_, i) { return i; });
    const mulai = Date.now();
    adaKembar(a);
    console.log("  n = " + String(n).padEnd(6) + " -> " + (Date.now() - mulai) + " ms");
}
console.log("  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat");

console.log("\n--- O(n^2) vs O(n) untuk masalah yang SAMA ---");
const besar = Array.from({ length: 30000 }, function (_, i) { return i; });

let mulai = Date.now();
adaKembar(besar);
const t1 = Date.now() - mulai;

mulai = Date.now();
adaKembarCepat(besar);
const t2 = Date.now() - mulai;

console.log("  dua perulangan (O(n^2)) : " + t1 + " ms");
console.log("  Set            (O(n))   : " + t2 + " ms");

console.log("\n--- O(log n) tumbuh sangat lambat ---");
for (const n of [1000, 1000000, 1000000000]) {
    console.log("  n = " + n.toLocaleString().padEnd(15) +
                " -> " + hitungPembagian(n) + " langkah");
}

console.log("\n--- TABEL PERBANDINGAN JUMLAH LANGKAH ---");
console.log("  " + "n".padEnd(12) + "O(log n)".padEnd(11) +
            "O(n)".padEnd(13) + "O(n log n)".padEnd(15) + "O(n^2)");
for (const n of [10, 100, 1000, 1000000]) {
    const lg = hitungPembagian(n);
    const kuadrat = n <= 1000 ? (n * n).toLocaleString() : "1 triliun";
    console.log("  " + n.toLocaleString().padEnd(12) + String(lg).padEnd(11) +
                n.toLocaleString().padEnd(13) + (n * lg).toLocaleString().padEnd(15) + kuadrat);
}

console.log("\n--- JEBAKAN BIAYA TERSEMBUNYI DI JAVASCRIPT ---");
console.log("  arr.includes(x) -> O(n)  |  set.has(x)   -> O(1)");
console.log("  arr.shift()     -> O(n)  |  arr.pop()    -> O(1)");
console.log("  arr.unshift(x)  -> O(n)  |  arr.push(x)  -> O(1)");`
  },

  output: `--- MENGUKUR PERTUMBUHAN O(n^2) ---
  n = 1000   -> 12 ms
  n = 2000   -> 48 ms
  n = 4000   -> 191 ms
  -> n dilipatduakan, waktunya sekitar EMPAT kali lipat

--- O(log n) tumbuh sangat lambat ---
  n = 1,000           -> 9 langkah
  n = 1,000,000       -> 19 langkah
  n = 1,000,000,000   -> 29 langkah

--- TABEL PERBANDINGAN JUMLAH LANGKAH ---
  n           O(log n)   O(n)         O(n log n)     O(n^2)
  10          3          10           30             100
  100         6          100          600            10,000
  1,000       9          1,000        9,000          1,000,000
  1,000,000   19         1,000,000    19,000,000     1 triliun`,

  kompleksitas: {
    tabel: [
      { operasi: 'O(1) — tetap', waktu: 'n=1 juta → 1 langkah', memori: 'contoh: arr[i]' },
      { operasi: 'O(log n) — logaritmik', waktu: 'n=1 juta → 20', memori: 'binary search' },
      { operasi: 'O(n) — lurus', waktu: 'n=1 juta → 1 juta', memori: 'linear search' },
      { operasi: 'O(n log n) — hampir lurus', waktu: 'n=1 juta → 20 juta', memori: 'merge sort' },
      { operasi: 'O(n²) — kuadrat', waktu: 'n=1 juta → 1 triliun', memori: 'bubble sort' },
      { operasi: 'O(2ⁿ) — meledak', waktu: 'n=50 → lebih dari umur alam semesta', memori: 'fibonacci polos' },
      { operasi: 'O(n!) — faktorial', waktu: 'n=20 → mustahil', memori: 'coba semua urutan' }
    ],
    intuisi: `
**Cara membaca tabel ini:** anggap komputer sanggup mengerjakan sekitar 100 juta langkah sederhana per detik. Dari situ, O(n²) pada sejuta data berarti satu triliun langkah — sekitar **tiga jam**. Sedangkan O(n log n) untuk data yang sama cuma 20 juta langkah, yaitu **kurang dari satu detik**.

**Aturan praktis yang bisa kamu pakai** untuk menaksir apakah algoritmamu sanggup, dengan batas waktu satu detik:

- **O(n²)** aman sampai sekitar **n = 10.000**
- **O(n log n)** aman sampai sekitar **n = 10.000.000**
- **O(n)** aman sampai sekitar **n = 100.000.000**
- **O(2ⁿ)** hanya aman sampai sekitar **n = 25**

Angka-angka ini sangat berguna saat mendampingi praktikum: kalau program mahasiswa menggantung pada data 100.000, kemungkinan besar algoritmanya O(n²).

**Kenapa konstanta tetap penting dalam praktik?** Karena Big-O mengabaikannya, algoritma O(n) dengan konstanta besar bisa **kalah** dari O(n²) pada data kecil. Inilah sebabnya pustaka pengurutan sungguhan beralih ke insertion sort untuk potongan di bawah sekitar 16 elemen — meski O(n²), konstantanya sangat kecil.

**Jangan lupa memorinya.** Sebuah algoritma bisa saja cepat tapi memakan memori sangat besar. Merge sort O(n log n) memerlukan O(n) memori tambahan, sedangkan quick sort yang sama cepatnya bekerja di tempat. Pada data yang sangat besar, perbedaan ini menentukan.
`
  },

  kesalahanUmum: [
    {
      salah: 'Mengira `O(2n)` berbeda dari `O(n)`, atau `O(n² + n)` berbeda dari `O(n²)`.',
      kenapa: 'Big-O mengukur **pola pertumbuhan**, bukan jumlah langkah persis. Konstanta pengali dan suku berderajat rendah tidak mengubah polanya — baik `n` maupun `2n` sama-sama menjadi sepuluh kali lipat ketika data menjadi sepuluh kali lipat.',
      benar: 'Buang konstanta dan suku kecil: `O(3n² + 5n + 100)` cukup ditulis **O(n²)**. Yang dipertahankan hanya suku paling dominan tanpa koefisiennya.'
    },
    {
      salah: 'Mengira setiap perulangan bersarang pasti O(n²).',
      kenapa: 'Yang menentukan adalah **batas perulangan dalam**, bukan sekadar adanya sarang. Perulangan dalam dengan batas tetap seperti `for (j = 0; j < 10; j++)` tidak bergantung pada `n`, sehingga totalnya tetap **O(n)**.',
      benar: 'Periksa apakah batas perulangan dalam ikut bergantung pada `n`. Kalau ikut, kalikan. Kalau tetap, ia hanya menjadi konstanta yang dibuang.'
    },
    {
      salah: 'Hanya menghitung perulangan yang terlihat, mengabaikan biaya operasi di dalamnya.',
      kenapa: 'Operasi yang tampak sederhana bisa mahal. `x in list` berbiaya O(n), `list.pop(0)` berbiaya O(n), dan `strlen()` di C berbiaya O(n). Satu perulangan yang di dalamnya memanggil operasi O(n) sebenarnya **O(n²)** — dan itu tidak terlihat dari bentuk kodenya.',
      benar: 'Ketahui biaya tiap operasi yang kamu pakai. Ganti struktur datanya bila perlu: mengubah list menjadi set membuat pencarian jatuh dari O(n) menjadi O(1).'
    },
    {
      salah: 'Menyimpulkan algoritma lebih cepat hanya dari hasil stopwatch pada satu ukuran data.',
      kenapa: 'Hasilnya bergantung pada mesin, bahasa, dan beban sistem. Lebih penting lagi, algoritma O(n²) bisa **menang** pada data kecil karena konstantanya lebih kecil — dan kesimpulan itu langsung runtuh begitu datanya membesar.',
      benar: 'Uji dengan **beberapa ukuran** yang dilipatgandakan, lalu perhatikan **pola pertumbuhannya**. Kalau data dua kali lipat membuat waktunya empat kali lipat, itu tanda O(n²).'
    },
    {
      salah: 'Menyebut kompleksitas tanpa menjelaskan kasus mana yang dimaksud.',
      kenapa: 'Satu algoritma bisa punya tiga jawaban berbeda. Quick sort adalah O(n log n) rata-rata tetapi O(n²) pada kasus terburuk; bubble sort adalah O(n) pada kasus terbaik tetapi O(n²) rata-rata. Menyebut satu angka saja bisa menyesatkan.',
      benar: 'Sebutkan kasusnya. Kalau tidak disebut, yang dimaksud biasanya **kasus terburuk**, karena itulah jaminan yang bisa diandalkan.'
    },
    {
      salah: 'Mengabaikan kompleksitas memori dan hanya memperhatikan waktu.',
      kenapa: 'Algoritma bisa cepat tapi memakan memori sangat besar. Merge sort memerlukan O(n) memori tambahan, dan rekursi memakai call stack sedalam pemanggilannya — pada data besar ini bisa menyebabkan stack overflow meski waktunya baik-baik saja.',
      benar: 'Selalu sebutkan keduanya. Perhatikan terutama rekursi: versi rekursif faktorial memakai O(n) memori, sedangkan versi perulangannya cuma O(1).'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **memasak untuk sejumlah tamu**.

Pertanyaan Big-O bukan *"berapa menit memasaknya?"* — itu bergantung dapur dan jumlah kompor. Pertanyaannya adalah **"kalau tamunya jadi sepuluh kali lipat, kerjanya jadi berapa kali lipat?"**

Dari situ tiap kelas jadi mudah dibayangkan:

- **O(1)** — menyalakan lampu dapur. Sama saja untuk 1 tamu atau 1000 tamu.
- **O(n)** — mengupas bawang untuk tiap porsi. Tamu 10 kali lipat, kerja 10 kali lipat.
- **O(n²)** — **setiap tamu bersalaman dengan setiap tamu lain.** Tamu 10 kali lipat, salaman **100 kali lipat**.
- **O(log n)** — mencari nama di buku telepon dengan membuka tengah. Tamu sejuta pun cukup 20 kali buka.
- **O(2ⁿ)** — mencoba semua kemungkinan susunan tempat duduk. Tambah satu tamu saja, kerjanya berlipat dua.

Peragaan yang paling berkesan di kelas: minta 5 mahasiswa berdiri dan **bersalaman dengan semua orang lain**. Hitung jumlah salamannya. Lalu tambah jadi 10 orang dan tanya *"kira-kira jadi berapa?"* Kebanyakan menebak dua kali lipat, padahal jawabannya **sekitar empat kali lipat**. Kejutan itu membuat O(n²) langsung terasa nyata.

Untuk **kenapa konstanta dibuang**, pakai analogi perjalanan: *"Jakarta ke Surabaya naik mobil atau motor sama-sama sekitar 12 jam. Yang membedakan besar bukan kendaraannya, tapi apakah kamu ke Surabaya atau ke Papua."* Konstanta itu pilihan kendaraan; Big-O itu jaraknya.

Untuk menutup, tunjukkan **tabel perbandingan** pada contoh kode dan biarkan angkanya bicara: pada sejuta data, O(n log n) butuh 20 juta langkah sedangkan O(n²) butuh satu triliun. Perbandingan **50.000 kali lipat** itu biasanya menjadi momen yang paling diingat mahasiswa dari seluruh materi kompleksitas.
`,

  latihan: [
    'Tentukan kompleksitas tiap potongan berikut beserta alasannya: (a) satu perulangan sampai `n`, (b) dua perulangan berurutan sampai `n`, (c) perulangan bersarang keduanya sampai `n`, (d) perulangan bersarang dengan batas dalam tetap 100.',
    'Jalankan fungsi `adaKembar` pada data berukuran 1000, 2000, dan 4000, lalu catat waktunya. Buktikan bahwa melipatduakan data membuat waktunya sekitar empat kali lipat.',
    'Tulis ulang `adaKembar` memakai set atau hash table sehingga menjadi O(n). Ukur waktunya pada data 40.000 dan bandingkan dengan versi O(n²).',
    'Tentukan kompleksitas potongan ini dan jelaskan kenapa jawabannya mungkin mengejutkan: `for x in data: if x in daftar: ...` di mana `daftar` bertipe list.',
    'Sebuah algoritma mengurutkan data lebih dulu (O(n log n)) lalu mencari dengan binary search (O(log n)). Berapa kompleksitas totalnya, dan kenapa?',
    'Tentukan kompleksitas **waktu dan memori** untuk faktorial versi rekursif dan versi perulangan. Kenapa memorinya berbeda padahal waktunya sama?',
    'Program mahasiswa menggantung saat diberi 200.000 data tetapi baik-baik saja pada 1.000 data. Tanpa melihat kodenya, apa dugaan kompleksitasnya? Susun tiga pertanyaan untuk memastikannya.',
    'Uji pemahaman: rancang peragaan bersalaman untuk 5 lalu 10 mahasiswa. Targetnya, kamu bisa menyimpulkan sendiri bahwa melipatduakan orang membuat salaman sekitar empat kali lipat — tanpa kamu menyebut rumus apa pun.'
  ]
});

TOPICS.push({
  id: 'sorting-lanjutan',
  judul: 'Sorting Lanjutan (Merge Sort & Quick Sort)',
  kategori: 'lanjutan',
  tag: ['merge sort', 'quick sort', 'divide and conquer', 'O(n log n)', 'pivot', 'stabil'],
  ringkas: 'Dua algoritma O(n log n) yang benar-benar dipakai di dunia nyata — beserta gagasan bagi-dan-taklukkan di baliknya.',

  fungsi: `**Mengurutkan data besar dengan algoritma yang tumbuh jauh lebih lambat.**

Terpakai di:

- **Memahami pengurutan bawaan** — Timsort di Python menggabungkan Merge dan Insertion Sort
- **Divide and conquer** — pola yang sama dipakai di banyak algoritma lain
- **Wawancara kerja** — Merge dan Quick Sort hampir selalu ditanyakan
- **Data yang tidak muat di memori** — Merge Sort bisa bekerja dari berkas

Yang perlu dipahami tentang pertukarannya:

- **Merge Sort** — selalu \`O(n log n)\`, **stabil**, tetapi butuh memori tambahan
- **Quick Sort** — biasanya lebih cepat dan hemat memori, tetapi **bisa merosot ke \`O(n²)\`** kalau pivotnya buruk

Dan kasus terburuk Quick Sort bukan hal langka: **data yang sudah terurut** sudah cukup memicunya kalau pivotnya dipilih naif.`,

  praktik: {
    tujuan: `Kamu bisa menulis kedua algoritma, membuktikan kasus terburuk Quick Sort, dan tahu kapan memakai masing-masing.`,
    alat: [
      'Python 3',
      'Modul time dan sys'
    ],
    langkah: [
      { judul: 'Tulis Merge Sort dulu',
        isi: `Lebih mudah dipahami: bagi dua sampai satu elemen, lalu gabungkan dua bagian terurut.

Fungsi penggabungnya yang penting. Uji terpisah dengan dua daftar terurut sebelum memakainya.` },
      { judul: 'Buktikan Merge Sort stabil',
        isi: `Urutkan daftar pasangan berdasarkan angkanya saja, dan periksa apakah urutan asli elemen bernilai sama **tetap terjaga**.

Stabilitas penting saat mengurutkan bertingkat: urutkan dulu berdasarkan nama, lalu berdasarkan nilai — dan yang bernilai sama tetap urut nama.` },
      { judul: 'Tulis Quick Sort',
        isi: `Pilih pivot, pisahkan yang lebih kecil dan lebih besar, lalu rekursi pada keduanya.

Versi paling sederhana memakai daftar tambahan; versi in-place dengan partisi Lomuto lebih hemat memori tetapi lebih rumit.

Mulai dari yang sederhana.` },
      { judul: 'Munculkan kasus terburuknya',
        isi: `Jalankan Quick Sort dengan pivot elemen pertama pada data yang **sudah terurut**.

Ia merosot ke \`O(n²)\`, dan untuk data besar bisa melempar \`RecursionError\` karena rekursinya sedalam n.

Naikkan \`sys.setrecursionlimit\` untuk melihatnya berjalan lambat, lalu ukur waktunya.` },
      { judul: 'Perbaiki dengan pivot acak',
        isi: `Ganti pemilihan pivot menjadi acak, atau pakai median dari tiga elemen.

Jalankan lagi pada data terurut. Sekarang kecepatannya normal.

Ini perbaikan satu baris yang menghilangkan seluruh kasus terburuk yang praktis.` },
      { judul: 'Bandingkan dengan pengurutan bawaan',
        isi: `Ukur ketiganya pada sejuta data: Merge Sort-mu, Quick Sort-mu, dan \`sorted()\`.

Bawaan akan jauh lebih cepat. Ia memakai **Timsort**, yang menggabungkan Merge Sort dengan Insertion Sort untuk bagian kecil, dan memanfaatkan bagian yang sudah terurut.

Ini alasan kamu memakainya di kerja nyata.` },
      { judul: 'Uji pada data yang hampir terurut',
        isi: `Timsort sangat cepat pada data yang sebagian sudah terurut — dan data nyata sering begitu.

Ukur \`sorted()\` pada data acak dan pada data yang 90 persen terurut. Selisihnya besar.

Ini contoh bahwa algoritma yang baik memanfaatkan sifat data nyata, bukan cuma menang secara teori.` }
    ],
    cek: [
      'Merge Sort-mu terbukti stabil pada data berpasangan',
      'Quick Sort dengan pivot pertama merosot pada data terurut, dan pivot acak memperbaikinya',
      'Ketiga algoritmamu memberi hasil identik dengan sorted() bawaan'
    ]
  },

  konsep: `
Tiga algoritma pengurutan yang sudah kamu pelajari — bubble, selection, dan insertion — semuanya **O(n²)**. Untuk sejuta data, itu berarti sekitar satu triliun langkah, atau **berjam-jam**.

Dua algoritma di topik ini menyelesaikan hal yang sama dalam **O(n log n)**, yaitu sekitar 20 juta langkah untuk sejuta data — **kurang dari satu detik**. Inilah yang benar-benar dipakai di dunia nyata.

Keduanya berdiri di atas satu gagasan yang sama: ***divide and conquer*** (bagi dan taklukkan), yang selalu terdiri atas tiga langkah:

- **Bagi** — pecah masalah menjadi beberapa bagian yang lebih kecil
- **Taklukkan** — selesaikan tiap bagian, biasanya secara rekursif
- **Gabungkan** — satukan hasilnya menjadi jawaban utuh

Yang membedakan keduanya adalah **di langkah mana pekerjaan beratnya dilakukan**.

**Merge sort** membagi dengan gampang — cukup potong tepat di tengah — lalu bekerja keras saat **menggabungkan** dua bagian terurut menjadi satu. Karena pembagiannya selalu tepat separuh, tingginya **dijamin** log n, sehingga **selalu O(n log n)** apa pun keadaan datanya.

**Quick sort** kebalikannya: ia bekerja keras saat **membagi** — memilih sebuah **pivot** lalu menata data sehingga yang lebih kecil ada di kiri dan yang lebih besar di kanan — dan setelah itu penggabungannya gratis. Rata-rata **O(n log n)**, tapi kalau pivotnya selalu terpilih buruk, pembagiannya jadi timpang dan merosot menjadi **O(n²)**.

Ada satu sifat lagi yang perlu kamu kenalkan: **stabilitas**. Sebuah pengurutan disebut **stabil** kalau data yang nilainya sama **tetap terjaga urutan aslinya**. Ini penting saat mengurutkan bertingkat — misalnya mengurutkan mahasiswa menurut nama dulu, lalu menurut IPK; kalau stabil, yang IPK-nya sama tetap urut menurut nama.

**Merge sort stabil, quick sort tidak.**

Karena itu pustaka sungguhan biasanya memakai **gabungan**: Python dan Java memakai **Timsort** (merge sort yang dipadu insertion sort untuk potongan kecil), sedangkan C++ memakai **introsort** (quick sort yang beralih ke heap sort bila kedalamannya berlebihan).
`,

  logicSyntax: [
    {
      bahasa: 'cpp',
      kode: 'void mergeSort(int a[], int kiri, int kanan) {\n    if (kiri >= kanan) return;             // BASE CASE: 0 atau 1 elemen\n    int tengah = kiri + (kanan - kiri) / 2;\n\n    mergeSort(a, kiri, tengah);            // BAGI kiri\n    mergeSort(a, tengah + 1, kanan);       // BAGI kanan\n    gabung(a, kiri, tengah, kanan);        // GABUNGKAN\n}',
      penjelasan: `
Inilah kerangka *divide and conquer* dalam bentuk paling murni, dan strukturnya sangat rapi.

**Base case-nya \`kiri >= kanan\`**, yang berarti bagian itu tinggal berisi nol atau satu elemen. Dan satu elemen **sudah pasti terurut** — tidak perlu dikerjakan apa-apa. Inilah titik berhentinya.

Perhatikan bahwa **pembagiannya selalu tepat di tengah**, tidak bergantung isi datanya sama sekali. Dari sinilah jaminan merge sort berasal: berapa pun keadaan datanya, pohon pembagiannya selalu setinggi **log n**.

Bandingkan dengan quick sort, yang tinggi pohonnya bergantung pada seberapa baik pivotnya terpilih — dan itulah sebabnya quick sort punya kasus terburuk sementara merge sort tidak.

Urutan tiga barisnya juga bermakna: kedua pemanggilan rekursif **harus selesai lebih dulu** sebelum \`gabung\` dijalankan. Saat \`gabung\` dipanggil, kedua separuhnya dijamin sudah terurut — dan justru anggapan itulah yang membuat penggabungannya bisa sederhana.

Kalau kamu perhatikan, pola pemanggilan ini persis **postorder traversal**: kerjakan kiri, kerjakan kanan, baru olah induknya.
`
    },
    {
      bahasa: 'cpp',
      kode: '// GABUNG: dua bagian yang MASING-MASING sudah terurut\nwhile (i <= tengah && j <= kanan) {\n    if (a[i] <= a[j]) bantu[k++] = a[i++];   // <= menjaga STABILITAS\n    else              bantu[k++] = a[j++];\n}',
      penjelasan: `
Inilah inti merge sort, dan cara kerjanya seperti **menyatukan dua tumpukan kartu yang masing-masing sudah terurut**.

Bandingkan kartu teratas dari kedua tumpukan, ambil yang lebih kecil, lalu maju. Ulangi. Karena kedua tumpukan sudah terurut, **cukup melihat yang paling atas saja** — tidak perlu mencari ke dalam. Itulah sebabnya penggabungan cuma memakan **O(n)**.

Perhatikan tanda **\`<=\`**, bukan \`<\`. Bagian kecil ini yang menentukan **stabilitas**.

Kalau nilainya sama, \`<=\` membuat elemen dari **bagian kiri** yang diambil duluan. Karena bagian kiri memang berasal dari posisi yang lebih awal, urutan aslinya jadi terjaga. Mengganti \`<=\` menjadi \`<\` membuat elemen kanan yang menang, dan merge sort **kehilangan sifat stabilnya**.

Setelah perulangan ini selesai, salah satu bagian pasti masih menyisakan elemen. Sisa itu tinggal disalin apa adanya, karena sudah terurut dan pasti lebih besar dari semua yang sudah masuk.

Yang perlu dicatat: penggabungan ini **memerlukan array bantu** seukuran datanya. Inilah harga yang dibayar merge sort — **O(n) memori tambahan**, tidak seperti quick sort yang bekerja di tempat.
`
    },
    {
      bahasa: 'cpp',
      kode: '// Kenapa O(n log n)?\n//\n// tingkat 0 : [........ n ........]   -> gabung n elemen\n// tingkat 1 : [... n/2 ...][... n/2 ...] -> total tetap n\n// tingkat 2 : [n/4][n/4][n/4][n/4]      -> total tetap n\n// ...\n// ada log n tingkat, tiap tingkat O(n) -> O(n log n)',
      penjelasan: `
Gambar ini menjelaskan **dari mana \`n log n\` berasal**, dan layak kamu tulis di papan tulis saat mengajar.

Ada dua pengamatan yang digabungkan:

**Pertama, ada berapa tingkat?** Karena tiap tingkat membagi dua, pertanyaannya sama seperti pada binary search: *"berapa kali \`n\` dibagi dua sampai tersisa satu?"* Jawabannya **log₂n**. Untuk sejuta data, sekitar 20 tingkat.

**Kedua, berapa biaya tiap tingkat?** Di tingkat mana pun, seluruh \`n\` elemen tetap ikut digabungkan — cuma terbagi dalam potongan yang lebih banyak dan lebih kecil. Dua potongan berukuran n/2 tetap berjumlah n elemen. Jadi tiap tingkat berbiaya **O(n)**.

Kalikan keduanya: **log n tingkat × O(n) per tingkat = O(n log n)**.

Yang penting ditekankan: **merge sort selalu begini**, tidak peduli datanya acak, terurut, atau terbalik. Pembagiannya tidak pernah melihat isi data, sehingga tingginya selalu terjamin. Inilah kelebihan merge sort dibanding quick sort — **tidak punya kasus terburuk yang buruk**.
`
    },
    {
      bahasa: 'cpp',
      kode: '// QUICK SORT: kerja berat ada di PEMBAGIAN\nint partisi(int a[], int kiri, int kanan) {\n    int pivot = a[kanan];        // pilih elemen terakhir sebagai pivot\n    int i = kiri - 1;\n\n    for (int j = kiri; j < kanan; j++) {\n        if (a[j] <= pivot) tukar(a[++i], a[j]);   // yang kecil didorong ke kiri\n    }\n    tukar(a[i + 1], a[kanan]);   // taruh pivot di posisi FINALNYA\n    return i + 1;\n}',
      penjelasan: `
Fungsi ini disebut **partisi**, dan tugasnya menata ulang data sehingga semua yang **lebih kecil dari pivot** berada di kiri, dan sisanya di kanan.

Cara membacanya: variabel \`i\` menandai **batas akhir wilayah kecil**. Setiap kali ditemukan elemen yang tidak lebih besar dari pivot, \`i\` maju satu langkah lalu elemen itu ditukar ke posisi tersebut — seolah "didorong" masuk ke wilayah kiri.

Setelah perulangan selesai, pivot ditukar ke posisi \`i + 1\`. Di sinilah kuncinya: **posisi itu adalah tempat final pivot** dalam array terurut nanti. Pivot tersebut **tidak akan pernah dipindahkan lagi**.

Karena itu quick sort tidak butuh langkah penggabungan sama sekali. Setelah partisi, bagian kiri dan kanan tinggal diurutkan sendiri-sendiri, dan hasilnya otomatis tersusun benar.

Bandingkan pembagian kerjanya:

- **Merge sort** → membagi itu gampang, menggabungkan itu berat
- **Quick sort** → membagi itu berat, menggabungkan itu gratis

Perhatikan juga bahwa penukaran dilakukan **di dalam array itu sendiri**. Quick sort bekerja **di tempat** dan hanya memakai O(log n) memori untuk call stack — jauh lebih hemat daripada merge sort yang butuh O(n).
`
    },
    {
      bahasa: 'cpp',
      kode: '// KASUS TERBURUK: data sudah terurut + pivot elemen terakhir\n// [1, 2, 3, 4, 5], pivot = 5\n//   -> kiri berisi 4 elemen, kanan KOSONG   (timpang!)\n// [1, 2, 3, 4],    pivot = 4\n//   -> kiri berisi 3 elemen, kanan KOSONG\n// ... kedalaman jadi n, bukan log n -> O(n^2)',
      penjelasan: `
Inilah kelemahan quick sort, dan ironisnya ia muncul justru pada keadaan yang **paling sering terjadi di dunia nyata**: data yang sudah terurut.

Kalau pivot selalu terpilih sebagai elemen terbesar atau terkecil, pembagiannya menjadi **timpang total** — satu sisi berisi hampir semuanya, sisi lain kosong. Akibatnya kedalaman rekursinya menjadi \`n\`, bukan \`log n\`, dan biayanya merosot menjadi **O(n²)**.

Lebih buruk lagi, kedalaman \`n\` juga berisiko menyebabkan **stack overflow**.

Ada tiga cara mengatasinya, dan semuanya dipakai di dunia nyata:

- **Pivot acak** — pilih posisi acak lalu tukar ke belakang. Peluang terkena kasus terburuk jadi sangat kecil
- **Median of three** — ambil nilai tengah dari elemen pertama, tengah, dan terakhir. Ini yang paling umum dipakai
- **Introsort** — pantau kedalamannya; kalau melewati batas, beralih ke **heap sort** yang dijamin O(n log n). Inilah yang dipakai \`std::sort\` di C++

Pelajaran pentingnya untuk mahasiswa: **kompleksitas rata-rata dan terburuk bisa berbeda jauh**, dan kasus terburuk itu kadang justru bukan kasus yang langka. Quick sort polos dengan pivot elemen terakhir adalah contoh sempurna.
`
    },
    {
      bahasa: 'python',
      kode: '# STABIL: data bernilai sama tetap terjaga urutan aslinya\ndata = [("Budi", 3), ("Ani", 1), ("Citra", 3)]\n\n# merge sort / Timsort -> Budi tetap sebelum Citra\n# quick sort           -> urutannya bisa tertukar',
      penjelasan: `
**Stabilitas** adalah sifat yang sering dianggap sepele, padahal sangat menentukan saat mengurutkan bertingkat.

Sebuah pengurutan disebut **stabil** kalau elemen yang **nilainya sama** tetap mempertahankan urutan aslinya. Pada contoh di atas, Budi dan Citra sama-sama bernilai 3 — pengurutan stabil menjamin Budi tetap muncul lebih dulu karena memang begitu urutan awalnya.

Kapan ini penting? Saat kamu ingin mengurutkan menurut **dua kunci**. Caranya: urutkan menurut kunci kedua dulu, lalu menurut kunci utama. Kalau pengurutannya stabil, hasil pengurutan pertama **tetap terjaga** di dalam kelompok yang nilainya sama.

Contoh nyata: mengurutkan daftar mahasiswa menurut **IPK**, dan yang IPK-nya sama diurutkan menurut **nama**. Dengan pengurutan stabil, cukup urutkan menurut nama dulu, lalu menurut IPK.

Yang mana yang stabil?

- **Stabil** — merge sort, insertion sort, bubble sort, Timsort
- **Tidak stabil** — quick sort, selection sort, heap sort

Karena itu \`sorted()\` di Python dan \`Collections.sort()\` di Java **dijamin stabil** (keduanya memakai Timsort), sedangkan \`std::sort\` di C++ **tidak** — dan C++ menyediakan \`std::stable_sort\` terpisah bila stabilitas memang dibutuhkan.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;

/* ---------- MERGE SORT: selalu O(n log n), stabil, butuh O(n) memori ---------- */
void gabung(vector<int>& a, int kiri, int tengah, int kanan) {
    vector<int> bantu(kanan - kiri + 1);           // array bantu O(n)
    int i = kiri, j = tengah + 1, k = 0;

    while (i <= tengah && j <= kanan) {
        if (a[i] <= a[j]) bantu[k++] = a[i++];     // <= menjaga STABILITAS
        else              bantu[k++] = a[j++];
    }
    while (i <= tengah) bantu[k++] = a[i++];       // sisa kiri
    while (j <= kanan)  bantu[k++] = a[j++];       // sisa kanan

    for (int t = 0; t < k; t++) a[kiri + t] = bantu[t];
}

void mergeSort(vector<int>& a, int kiri, int kanan) {
    if (kiri >= kanan) return;                     // BASE CASE
    int tengah = kiri + (kanan - kiri) / 2;

    mergeSort(a, kiri, tengah);                    // BAGI kiri
    mergeSort(a, tengah + 1, kanan);               // BAGI kanan
    gabung(a, kiri, tengah, kanan);                // GABUNGKAN
}

/* ---------- QUICK SORT: rata-rata O(n log n), di tempat, tidak stabil ---------- */
int partisi(vector<int>& a, int kiri, int kanan) {
    int pivot = a[kanan];
    int i = kiri - 1;

    for (int j = kiri; j < kanan; j++) {
        if (a[j] <= pivot) swap(a[++i], a[j]);     // dorong yang kecil ke kiri
    }
    swap(a[i + 1], a[kanan]);                      // pivot ke posisi FINALNYA
    return i + 1;
}

void quickSort(vector<int>& a, int kiri, int kanan) {
    if (kiri >= kanan) return;                     // BASE CASE
    int p = partisi(a, kiri, kanan);               // BAGI (kerja berat di sini)
    quickSort(a, kiri, p - 1);                     // kiri pivot
    quickSort(a, p + 1, kanan);                    // kanan pivot
    // tidak ada langkah gabung — sudah otomatis benar
}

void cetak(const string& label, const vector<int>& a) {
    cout << label;
    for (int x : a) cout << x << " ";
    cout << endl;
}

int main() {
    vector<int> asli = { 64, 25, 12, 22, 11, 90, 45 };
    cetak("data asli   : ", asli);

    vector<int> a = asli;
    mergeSort(a, 0, a.size() - 1);
    cetak("merge sort  : ", a);

    vector<int> b = asli;
    quickSort(b, 0, b.size() - 1);
    cetak("quick sort  : ", b);

    /* ---------- MEMBUKTIKAN O(n log n) vs O(n^2) ---------- */
    cout << "\n--- bubble sort vs merge sort ---" << endl;
    for (int n : {2000, 4000, 8000}) {
        vector<int> data(n);
        for (int i = 0; i < n; i++) data[i] = rand() % 100000;

        vector<int> d1 = data;
        auto m1 = chrono::high_resolution_clock::now();
        for (int i = 0; i < n - 1; i++)                       // bubble sort
            for (int j = 0; j < n - 1 - i; j++)
                if (d1[j] > d1[j + 1]) swap(d1[j], d1[j + 1]);
        auto t1 = chrono::duration_cast<chrono::milliseconds>(
                      chrono::high_resolution_clock::now() - m1).count();

        vector<int> d2 = data;
        auto m2 = chrono::high_resolution_clock::now();
        mergeSort(d2, 0, n - 1);
        auto t2 = chrono::duration_cast<chrono::milliseconds>(
                      chrono::high_resolution_clock::now() - m2).count();

        cout << "  n = " << n << "\tbubble " << t1 << " ms\tmerge " << t2 << " ms" << endl;
    }

    cout << "\nstd::sort       -> introsort, TIDAK stabil" << endl;
    cout << "std::stable_sort-> dijamin stabil" << endl;

    return 0;
}`,

    csharp: String.raw`using System;
using System.Diagnostics;
using System.Linq;

class Program {
    /* ---------- MERGE SORT ---------- */
    static void Gabung(int[] a, int kiri, int tengah, int kanan) {
        int[] bantu = new int[kanan - kiri + 1];        // array bantu O(n)
        int i = kiri, j = tengah + 1, k = 0;

        while (i <= tengah && j <= kanan) {
            if (a[i] <= a[j]) bantu[k++] = a[i++];      // <= menjaga STABILITAS
            else              bantu[k++] = a[j++];
        }
        while (i <= tengah) bantu[k++] = a[i++];
        while (j <= kanan)  bantu[k++] = a[j++];

        Array.Copy(bantu, 0, a, kiri, k);
    }

    static void MergeSort(int[] a, int kiri, int kanan) {
        if (kiri >= kanan) return;                      // BASE CASE
        int tengah = kiri + (kanan - kiri) / 2;
        MergeSort(a, kiri, tengah);
        MergeSort(a, tengah + 1, kanan);
        Gabung(a, kiri, tengah, kanan);
    }

    /* ---------- QUICK SORT ---------- */
    static int Partisi(int[] a, int kiri, int kanan) {
        int pivot = a[kanan], i = kiri - 1;
        for (int j = kiri; j < kanan; j++) {
            if (a[j] <= pivot) { i++; (a[i], a[j]) = (a[j], a[i]); }
        }
        (a[i + 1], a[kanan]) = (a[kanan], a[i + 1]);    // pivot ke posisi final
        return i + 1;
    }

    static void QuickSort(int[] a, int kiri, int kanan) {
        if (kiri >= kanan) return;
        int p = Partisi(a, kiri, kanan);
        QuickSort(a, kiri, p - 1);
        QuickSort(a, p + 1, kanan);
    }

    static void Main() {
        int[] asli = { 64, 25, 12, 22, 11, 90, 45 };
        Console.WriteLine($"data asli   : {string.Join(" ", asli)}");

        int[] a = (int[])asli.Clone();
        MergeSort(a, 0, a.Length - 1);
        Console.WriteLine($"merge sort  : {string.Join(" ", a)}");

        int[] b = (int[])asli.Clone();
        QuickSort(b, 0, b.Length - 1);
        Console.WriteLine($"quick sort  : {string.Join(" ", b)}");

        /* Membuktikan O(n log n) vs O(n^2) */
        Console.WriteLine("\n--- bubble sort vs merge sort ---");
        var acak = new Random(42);
        foreach (int n in new[] { 5000, 10000, 20000 }) {
            int[] data = Enumerable.Range(0, n).Select(_ => acak.Next(100000)).ToArray();

            int[] d1 = (int[])data.Clone();
            var j1 = Stopwatch.StartNew();
            for (int i = 0; i < n - 1; i++)
                for (int j = 0; j < n - 1 - i; j++)
                    if (d1[j] > d1[j + 1]) (d1[j], d1[j + 1]) = (d1[j + 1], d1[j]);
            long t1 = j1.ElapsedMilliseconds;

            int[] d2 = (int[])data.Clone();
            var j2 = Stopwatch.StartNew();
            MergeSort(d2, 0, n - 1);
            long t2 = j2.ElapsedMilliseconds;

            Console.WriteLine($"  n = {n,-6} bubble {t1,6} ms   merge {t2,4} ms");
        }

        /* Membuktikan STABILITAS */
        Console.WriteLine("\n--- stabilitas ---");
        var orang = new[] {
            ("Budi", 3), ("Ani", 1), ("Citra", 3), ("Dedi", 1)
        };
        Console.WriteLine("  asli      : " + string.Join(" ", orang.Select(o => o.Item1 + o.Item2)));

        var stabil = orang.OrderBy(o => o.Item2).ToArray();     // LINQ OrderBy STABIL
        Console.WriteLine("  OrderBy   : " + string.Join(" ", stabil.Select(o => o.Item1 + o.Item2)));
        Console.WriteLine("  -> Budi tetap sebelum Citra, Ani tetap sebelum Dedi");

        Console.WriteLine("\n  Array.Sort   -> introsort, TIDAK stabil");
        Console.WriteLine("  LINQ OrderBy -> dijamin stabil");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    /* ---------- MERGE SORT ---------- */
    static void gabung(int[] a, int kiri, int tengah, int kanan) {
        int[] bantu = new int[kanan - kiri + 1];        // array bantu O(n)
        int i = kiri, j = tengah + 1, k = 0;

        while (i <= tengah && j <= kanan) {
            if (a[i] <= a[j]) bantu[k++] = a[i++];      // <= menjaga STABILITAS
            else              bantu[k++] = a[j++];
        }
        while (i <= tengah) bantu[k++] = a[i++];
        while (j <= kanan)  bantu[k++] = a[j++];

        System.arraycopy(bantu, 0, a, kiri, k);
    }

    static void mergeSort(int[] a, int kiri, int kanan) {
        if (kiri >= kanan) return;                      // BASE CASE
        int tengah = kiri + (kanan - kiri) / 2;
        mergeSort(a, kiri, tengah);                     // BAGI kiri
        mergeSort(a, tengah + 1, kanan);                // BAGI kanan
        gabung(a, kiri, tengah, kanan);                 // GABUNGKAN
    }

    /* ---------- QUICK SORT ---------- */
    static void tukar(int[] a, int i, int j) { int s = a[i]; a[i] = a[j]; a[j] = s; }

    static int partisi(int[] a, int kiri, int kanan) {
        int pivot = a[kanan], i = kiri - 1;
        for (int j = kiri; j < kanan; j++)
            if (a[j] <= pivot) tukar(a, ++i, j);        // dorong yang kecil ke kiri
        tukar(a, i + 1, kanan);                          // pivot ke posisi FINALNYA
        return i + 1;
    }

    static void quickSort(int[] a, int kiri, int kanan) {
        if (kiri >= kanan) return;
        int p = partisi(a, kiri, kanan);
        quickSort(a, kiri, p - 1);
        quickSort(a, p + 1, kanan);
    }

    public static void main(String[] args) {
        int[] asli = { 64, 25, 12, 22, 11, 90, 45 };
        System.out.println("data asli   : " + Arrays.toString(asli));

        int[] a = asli.clone(); mergeSort(a, 0, a.length - 1);
        System.out.println("merge sort  : " + Arrays.toString(a));

        int[] b = asli.clone(); quickSort(b, 0, b.length - 1);
        System.out.println("quick sort  : " + Arrays.toString(b));

        /* Membuktikan O(n log n) vs O(n^2) */
        System.out.println("\n--- bubble sort vs merge sort ---");
        Random r = new Random(42);
        for (int n : new int[] { 5000, 10000, 20000 }) {
            int[] data = new int[n];
            for (int i = 0; i < n; i++) data[i] = r.nextInt(100000);

            int[] d1 = data.clone();
            long m1 = System.currentTimeMillis();
            for (int i = 0; i < n - 1; i++)
                for (int j = 0; j < n - 1 - i; j++)
                    if (d1[j] > d1[j + 1]) tukar(d1, j, j + 1);
            long t1 = System.currentTimeMillis() - m1;

            int[] d2 = data.clone();
            long m2 = System.currentTimeMillis();
            mergeSort(d2, 0, n - 1);
            long t2 = System.currentTimeMillis() - m2;

            System.out.printf("  n = %-6d bubble %6d ms   merge %4d ms%n", n, t1, t2);
        }

        System.out.println("\n--- yang dipakai Java ---");
        System.out.println("  Arrays.sort(int[])    -> dual-pivot quicksort, TIDAK stabil");
        System.out.println("  Arrays.sort(Object[]) -> Timsort, DIJAMIN stabil");
        System.out.println("  Timsort = merge sort + insertion sort untuk potongan kecil");

        /* Membuktikan stabilitas */
        String[][] orang = { {"Budi","3"}, {"Ani","1"}, {"Citra","3"}, {"Dedi","1"} };
        Arrays.sort(orang, Comparator.comparing(o -> o[1]));
        System.out.print("\n  setelah sort stabil : ");
        for (String[] o : orang) System.out.print(o[0] + o[1] + " ");
        System.out.println("\n  -> Budi tetap sebelum Citra");
    }
}`,

    python: String.raw`import time
import random
import sys


# ---------- MERGE SORT: selalu O(n log n), stabil ----------
def merge_sort(a):
    if len(a) <= 1:                       # BASE CASE
        return a

    tengah = len(a) // 2
    kiri = merge_sort(a[:tengah])         # BAGI kiri
    kanan = merge_sort(a[tengah:])        # BAGI kanan
    return gabung(kiri, kanan)            # GABUNGKAN


def gabung(kiri, kanan):
    hasil = []
    i = j = 0

    while i < len(kiri) and j < len(kanan):
        if kiri[i] <= kanan[j]:           # <= menjaga STABILITAS
            hasil.append(kiri[i]); i += 1
        else:
            hasil.append(kanan[j]); j += 1

    hasil.extend(kiri[i:])                # sisa kiri
    hasil.extend(kanan[j:])               # sisa kanan
    return hasil


# ---------- QUICK SORT: di tempat, rata-rata O(n log n) ----------
def partisi(a, kiri, kanan):
    pivot = a[kanan]
    i = kiri - 1
    for j in range(kiri, kanan):
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]       # dorong yang kecil ke kiri
    a[i + 1], a[kanan] = a[kanan], a[i + 1]   # pivot ke posisi FINALNYA
    return i + 1


def quick_sort(a, kiri=0, kanan=None):
    if kanan is None:
        kanan = len(a) - 1
    if kiri >= kanan:                     # BASE CASE
        return a
    p = partisi(a, kiri, kanan)
    quick_sort(a, kiri, p - 1)
    quick_sort(a, p + 1, kanan)
    return a


asli = [64, 25, 12, 22, 11, 90, 45]
print("data asli   :", asli)
print("merge sort  :", merge_sort(asli.copy()))
print("quick sort  :", quick_sort(asli.copy()))


# ---------- MEMBUKTIKAN O(n log n) vs O(n^2) ----------
def bubble_sort(a):
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a


print("\n--- bubble sort vs merge sort ---")
random.seed(42)
for n in [1000, 2000, 4000]:
    data = [random.randint(0, 100000) for _ in range(n)]

    mulai = time.perf_counter()
    bubble_sort(data.copy())
    t1 = time.perf_counter() - mulai

    mulai = time.perf_counter()
    merge_sort(data.copy())
    t2 = time.perf_counter() - mulai

    print(f"  n = {n:<6} bubble {t1:6.3f} s   merge {t2:6.3f} s"
          f"   ({t1/t2:.0f}x lebih cepat)")


# ---------- KASUS TERBURUK QUICK SORT ----------
print("\n--- kasus terburuk quick sort ---")
n = 2000
terurut = list(range(n))                  # data SUDAH terurut

# PENTING: pada data terurut, partisi Lomuto selalu menghasilkan
# satu sisi kosong, sehingga rekursinya sedalam n -- bukan log n.
# Batas rekursi bawaan Python cuma 1000, jadi tanpa baris ini
# programnya MATI dengan RecursionError sebelum sempat diukur.
# Kematian itu sendiri sudah membuktikan kasus terburuknya.
sys.setrecursionlimit(n + 100)

mulai = time.perf_counter()
quick_sort(terurut.copy())
t_buruk = time.perf_counter() - mulai

acak = [random.randint(0, 100000) for _ in range(n)]
mulai = time.perf_counter()
quick_sort(acak.copy())
t_baik = time.perf_counter() - mulai

print(f"  data acak    : {t_baik:.4f} s   (O(n log n))")
print(f"  data terurut : {t_buruk:.4f} s   (O(n^2), pivot selalu terburuk)")
print("  -> perbaikannya: pilih pivot acak atau median of three")


# ---------- STABILITAS ----------
print("\n--- stabilitas ---")
orang = [("Budi", 3), ("Ani", 1), ("Citra", 3), ("Dedi", 1)]
print("  asli          :", [o[0] + str(o[1]) for o in orang])

stabil = sorted(orang, key=lambda o: o[1])    # sorted() Python DIJAMIN stabil
print("  sorted (stabil):", [o[0] + str(o[1]) for o in stabil])
print("  -> Budi tetap sebelum Citra, Ani tetap sebelum Dedi")

print("\n  Python memakai Timsort:")
print("  merge sort + insertion sort untuk potongan kecil,")
print("  dan sangat cepat pada data yang sudah hampir terurut.")`,

    js: String.raw`// ---------- MERGE SORT: selalu O(n log n), stabil ----------
function mergeSort(a) {
    if (a.length <= 1) return a;                 // BASE CASE

    const tengah = Math.floor(a.length / 2);
    const kiri = mergeSort(a.slice(0, tengah));  // BAGI kiri
    const kanan = mergeSort(a.slice(tengah));    // BAGI kanan
    return gabung(kiri, kanan);                  // GABUNGKAN
}

function gabung(kiri, kanan) {
    const hasil = [];
    let i = 0, j = 0;

    while (i < kiri.length && j < kanan.length) {
        if (kiri[i] <= kanan[j]) hasil.push(kiri[i++]);   // <= menjaga STABILITAS
        else                     hasil.push(kanan[j++]);
    }
    while (i < kiri.length)  hasil.push(kiri[i++]);       // sisa kiri
    while (j < kanan.length) hasil.push(kanan[j++]);      // sisa kanan
    return hasil;
}

// ---------- QUICK SORT: di tempat ----------
function partisi(a, kiri, kanan) {
    const pivot = a[kanan];
    let i = kiri - 1;

    for (let j = kiri; j < kanan; j++) {
        if (a[j] <= pivot) {
            i++;
            [a[i], a[j]] = [a[j], a[i]];         // dorong yang kecil ke kiri
        }
    }
    [a[i + 1], a[kanan]] = [a[kanan], a[i + 1]]; // pivot ke posisi FINALNYA
    return i + 1;
}

function quickSort(a, kiri = 0, kanan = a.length - 1) {
    if (kiri >= kanan) return a;                 // BASE CASE
    const p = partisi(a, kiri, kanan);
    quickSort(a, kiri, p - 1);
    quickSort(a, p + 1, kanan);
    return a;
}

const asli = [64, 25, 12, 22, 11, 90, 45];
console.log("data asli   :", asli.join(" "));
console.log("merge sort  :", mergeSort([...asli]).join(" "));
console.log("quick sort  :", quickSort([...asli]).join(" "));

// ---------- MEMBUKTIKAN O(n log n) vs O(n^2) ----------
function bubbleSort(a) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++)
        for (let j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    return a;
}

console.log("\n--- bubble sort vs merge sort ---");
for (const n of [2000, 4000, 8000]) {
    const data = Array.from({ length: n }, function () {
        return Math.floor(Math.random() * 100000);
    });

    let mulai = Date.now();
    bubbleSort([...data]);
    const t1 = Date.now() - mulai;

    mulai = Date.now();
    mergeSort([...data]);
    const t2 = Date.now() - mulai;

    console.log("  n = " + String(n).padEnd(6) + " bubble " +
                String(t1).padStart(5) + " ms   merge " +
                String(t2).padStart(4) + " ms");
}

// ---------- KASUS TERBURUK QUICK SORT ----------
console.log("\n--- kasus terburuk quick sort ---");
const n = 5000;
const terurut = Array.from({ length: n }, function (_, i) { return i; });
const acak = Array.from({ length: n }, function () {
    return Math.floor(Math.random() * 100000);
});

let mulai = Date.now();
quickSort([...acak]);
const tBaik = Date.now() - mulai;

mulai = Date.now();
quickSort([...terurut]);
const tBuruk = Date.now() - mulai;

console.log("  data acak    : " + tBaik + " ms   (O(n log n))");
console.log("  data terurut : " + tBuruk + " ms   (O(n^2), pivot selalu terburuk)");

// ---------- STABILITAS ----------
console.log("\n--- stabilitas ---");
const orang = [
    { nama: "Budi", nilai: 3 }, { nama: "Ani", nilai: 1 },
    { nama: "Citra", nilai: 3 }, { nama: "Dedi", nilai: 1 }
];
console.log("  asli   :", orang.map(function (o) { return o.nama + o.nilai; }).join(" "));

const stabil = [...orang].sort(function (a, b) { return a.nilai - b.nilai; });
console.log("  sort() :", stabil.map(function (o) { return o.nama + o.nilai; }).join(" "));
console.log("  -> sejak ES2019, Array.sort() DIJAMIN stabil");
console.log("     (sebelumnya bergantung mesin JavaScript)");`
  },

  output: `data asli   : [64, 25, 12, 22, 11, 90, 45]
merge sort  : [11, 12, 22, 25, 45, 64, 90]
quick sort  : [11, 12, 22, 25, 45, 64, 90]

--- bubble sort vs merge sort ---
  n = 1000   bubble  0.062 s   merge  0.002 s   (31x lebih cepat)
  n = 2000   bubble  0.248 s   merge  0.004 s   (62x lebih cepat)
  n = 4000   bubble  0.995 s   merge  0.009 s   (111x lebih cepat)

--- kasus terburuk quick sort ---
  data acak    : 0.0041 s   (O(n log n))
  data terurut : 0.2183 s   (O(n^2), pivot selalu terburuk)
  -> perbaikannya: pilih pivot acak atau median of three

--- stabilitas ---
  asli          : ['Budi3', 'Ani1', 'Citra3', 'Dedi1']
  sorted (stabil): ['Ani1', 'Dedi1', 'Budi3', 'Citra3']
  -> Budi tetap sebelum Citra, Ani tetap sebelum Dedi

  Python memakai Timsort:
  merge sort + insertion sort untuk potongan kecil,
  dan sangat cepat pada data yang sudah hampir terurut.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Merge sort — semua keadaan', waktu: 'O(n log n)', memori: 'O(n)' },
      { operasi: 'Quick sort — terbaik & rata-rata', waktu: 'O(n log n)', memori: 'O(log n)' },
      { operasi: 'Quick sort — terburuk (pivot buruk)', waktu: 'O(n²)', memori: 'O(n)' },
      { operasi: 'Bubble / selection / insertion', waktu: 'O(n²)', memori: 'O(1)' },
      { operasi: 'Heap sort', waktu: 'O(n log n)', memori: 'O(1)' },
      { operasi: 'Timsort (Python, Java)', waktu: 'O(n log n)', memori: 'O(n)' },
      { operasi: 'Timsort — data hampir terurut', waktu: 'O(n)', memori: 'O(n)' }
    ],
    intuisi: `
**Kenapa merge sort selalu O(n log n), tanpa kasus terburuk?** Karena pembagiannya **tidak pernah melihat isi data** — selalu tepat di tengah. Tingginya dijamin log n apa pun keadaan datanya. Inilah keunggulan utamanya, dan alasan ia dipakai ketika jaminan lebih penting daripada kecepatan rata-rata.

**Kenapa quick sort bisa merosot ke O(n²)?** Karena pembagiannya **bergantung pada pivot**. Kalau pivot selalu terpilih sebagai nilai ekstrem — misalnya pada data yang sudah terurut dengan pivot elemen terakhir — pembagiannya timpang total, kedalamannya menjadi n, dan biayanya melonjak. Contoh kode di atas mengukurnya langsung, dan selisihnya biasanya puluhan kali lipat.

**Kalau begitu, kenapa quick sort tetap populer?** Karena pada data acak ia biasanya **lebih cepat daripada merge sort** meski kelasnya sama. Penyebabnya bukan jumlah langkah, melainkan konstanta: quick sort bekerja **di tempat**, sehingga datanya berdempetan dan ramah cache prosesor. Merge sort harus menyalin ke array bantu bolak-balik.

**Soal memori.** Merge sort memerlukan **O(n)** memori tambahan — pada data sangat besar, ini bisa menjadi penghalang. Quick sort hanya memakai O(log n) untuk call stack. Heap sort bahkan O(1), tapi konstantanya lebih besar dan tidak stabil.

**Kenapa pustaka sungguhan memakai gabungan?** Karena tiap algoritma punya titik lemah. **Timsort** (Python dan Java) memadukan merge sort dengan insertion sort untuk potongan kecil, dan mengenali bagian yang sudah terurut — sehingga pada data hampir terurut biayanya turun sampai **O(n)**. **Introsort** (C++) memakai quick sort tapi memantau kedalamannya, lalu beralih ke heap sort bila terlalu dalam — sehingga kasus terburuknya tetap terjamin O(n log n).
`
  },

  kesalahanUmum: [
    {
      salah: 'Memakai `<` alih-alih `<=` saat menggabungkan di merge sort.',
      kenapa: 'Ketika kedua nilai sama, `<` membuat elemen dari bagian **kanan** yang diambil duluan — padahal ia berasal dari posisi yang lebih belakang. Akibatnya merge sort **kehilangan sifat stabilnya**, dan pengurutan bertingkat jadi kacau tanpa ada error apa pun.',
      benar: 'Gunakan `if (kiri[i] <= kanan[j])`. Satu karakter ini yang menentukan stabilitas, dan sering luput saat mahasiswa menyalin kode.'
    },
    {
      salah: 'Memakai quick sort polos dengan pivot elemen terakhir pada data yang sudah terurut.',
      kenapa: 'Pivot selalu menjadi nilai terbesar, sehingga pembagiannya timpang total — satu sisi berisi hampir semuanya, sisi lain kosong. Kedalaman menjadi `n` dan biayanya merosot ke **O(n²)**, sekaligus berisiko stack overflow. Ironisnya, data terurut justru sering terjadi di dunia nyata.',
      benar: 'Pilih pivot secara acak, atau pakai **median of three** dari elemen pertama, tengah, dan terakhir. Untuk kode produksi, gunakan `sort` bawaan yang sudah menangani ini.'
    },
    {
      salah: 'Lupa base case pada merge sort atau quick sort.',
      kenapa: 'Tanpa `if (kiri >= kanan) return;`, rekursinya tidak pernah berhenti dan berujung stack overflow. Pada merge sort versi Python, lupa `if len(a) <= 1` membuat pembagiannya berputar terus pada list kosong.',
      benar: 'Selalu tulis base case sebagai baris pertama. Untuk pengurutan, base case-nya adalah bagian berisi **nol atau satu elemen** — yang memang sudah pasti terurut.'
    },
    {
      salah: 'Mengira merge sort bekerja di tempat seperti quick sort.',
      kenapa: 'Merge sort memerlukan **array bantu seukuran datanya** untuk menggabungkan. Pada data yang sangat besar, kebutuhan memori O(n) ini bisa menjadi penghalang nyata — dan sering terlupakan karena orang hanya memperhatikan waktunya.',
      benar: 'Ingat pertukarannya: **merge sort menukar memori dengan jaminan**, sedangkan **quick sort menukar jaminan dengan hemat memori**. Pilih sesuai kebutuhan.'
    },
    {
      salah: 'Menganggap O(n log n) selalu lebih cepat daripada O(n²) untuk semua ukuran data.',
      kenapa: 'Big-O mengabaikan konstanta. Merge sort dan quick sort memakai pemanggilan rekursif dan penyalinan yang konstantanya lebih besar. Untuk data di bawah sekitar 16 elemen, **insertion sort justru lebih cepat** meski kelasnya O(n²).',
      benar: 'Pahami bahwa inilah alasan pustaka sungguhan memakai gabungan — Timsort dan introsort keduanya beralih ke insertion sort untuk potongan kecil.'
    },
    {
      salah: 'Mengira `sort` bawaan semua bahasa itu stabil.',
      kenapa: 'Jaminannya berbeda-beda. `std::sort` di C++ **tidak stabil**, dan `Arrays.sort(int[])` di Java juga tidak. Mengandalkan stabilitas yang tidak dijamin menghasilkan bug yang muncul hanya pada data tertentu.',
      benar: 'Periksa jaminannya: Python `sorted()` stabil, Java `Arrays.sort(Object[])` stabil, JavaScript `sort()` stabil sejak ES2019, C++ perlu `std::stable_sort` secara khusus.'
    }
  ],

  analogi: `
Untuk **merge sort**, analogi terbaiknya adalah **membagi tumpukan ujian ke beberapa asisten**.

Kamu punya 100 lembar ujian yang harus diurutkan menurut nama. Bagi dua ke dua asisten, masing-masing membagi dua lagi ke asisten berikutnya, dan seterusnya sampai tiap orang cuma memegang satu lembar — yang otomatis sudah "terurut". Lalu hasilnya digabungkan naik: dua tumpukan terurut disatukan dengan **membandingkan lembar teratas** masing-masing.

Tekankan bagian penggabungannya, karena di situlah letak keindahannya: *"kenapa kamu cuma perlu melihat lembar paling atas?"* Karena kedua tumpukan sudah terurut, yang paling atas pasti yang terkecil di tumpukan itu. Dari situ mahasiswa paham kenapa penggabungan cuma O(n).

Untuk **quick sort**, pakai analogi **membariskan orang menurut tinggi badan**. Pilih satu orang sebagai patokan (pivot), lalu minta semua yang lebih pendek berdiri di kirinya dan yang lebih tinggi di kanannya. Sekarang **orang patokan itu sudah berada di posisi finalnya** — ia tidak akan pindah lagi. Ulangi pada kelompok kiri dan kelompok kanan.

Untuk **kasus terburuk quick sort**, lanjutkan analogi yang sama dan buat kejadiannya terasa: *"kalau kamu selalu memilih orang PALING TINGGI sebagai patokan, apa yang terjadi?"* Semua orang masuk ke kiri, kanan kosong. Tidak ada pembagian yang berarti — dan prosesnya berubah menjadi seperti selection sort.

Untuk **stabilitas**, pakai contoh yang langsung terasa: daftar mahasiswa yang sudah urut menurut nama, lalu diurutkan lagi menurut IPK. Tanya: *"dua mahasiswa dengan IPK sama, siapa yang di atas?"* Kalau pengurutannya stabil, yang namanya lebih awal tetap di atas. Kalau tidak, urutannya acak. Peragakan dengan contoh kode Python yang menunjukkan Budi tetap sebelum Citra.

Peragaan penutup yang paling meyakinkan: jalankan bubble sort dan merge sort pada 4.000 data acak di depan kelas. Selisih **seratus kali lipat** yang muncul di layar biasanya jauh lebih berkesan daripada penjelasan rumus apa pun.
`,

  latihan: [
    'Implementasikan merge sort lengkap dengan fungsi `gabung`. Uji pada data acak, data sudah terurut, dan data terbalik — pastikan waktunya kira-kira sama untuk ketiganya.',
    'Implementasikan quick sort dengan pivot elemen terakhir. Jalankan pada data acak dan data yang sudah terurut berukuran 5.000, lalu bandingkan waktunya. Jelaskan penyebab selisihnya.',
    'Perbaiki quick sort di atas dengan **pivot acak**, lalu ulangi pengujian pada data terurut. Berapa besar perbaikannya?',
    'Bandingkan bubble sort dan merge sort pada data berukuran 1.000, 2.000, dan 4.000. Catat waktunya, lalu tunjukkan bahwa selisihnya makin melebar seiring bertambahnya data.',
    'Ganti `<=` menjadi `<` pada fungsi gabung merge sort, lalu urutkan daftar pasangan (nama, nilai) yang punya nilai kembar. Buktikan bahwa stabilitasnya hilang.',
    'Buat fungsi yang menghitung berapa kali `gabung` dipanggil untuk data berukuran 8, 16, dan 32. Cocokkan hasilnya dengan perkiraan `n log n`.',
    'Urutkan daftar mahasiswa menurut **dua kunci**: IPK menurun, dan yang IPK-nya sama diurutkan menurut nama. Manfaatkan sifat stabil — urutkan menurut nama dulu, baru menurut IPK.',
    'Cari tahu algoritma apa yang dipakai `sort` bawaan di bahasa pilihanmu, dan apakah dijamin stabil. Bandingkan jawabannya untuk C++, Java, Python, dan JavaScript.',
    'Uji pemahaman: rancang peragaan 5 menit dengan tumpukan kartu untuk menjelaskan merge sort. Targetnya, kamu bisa menyimpulkan sendiri kenapa penggabungan cuma perlu melihat kartu teratas.'
  ]
});

TOPICS.push({
  id: 'dynamic-programming',
  judul: 'Dynamic Programming (Memoization & Tabulasi)',
  kategori: 'lanjutan',
  tag: ['dynamic programming', 'memoization', 'tabulasi', 'DP', 'overlapping subproblem'],
  ringkas: 'Mengubah rekursi yang O(2ⁿ) menjadi O(n) dengan satu gagasan: jangan hitung dua kali.',

  fungsi: `**Menghindari menghitung ulang hal yang sama berkali-kali.**

Terpakai di:

- **Masalah optimasi** — knapsack, potongan tongkat, penjadwalan
- **Perbandingan teks** — jarak edit, dipakai pada pemeriksa ejaan dan diff
- **Wawancara kerja** — kelompok soal yang paling sering muncul
- **Mempercepat rekursi** yang lambat tanpa mengubah logikanya

Yang paling langsung terpakai: **memoization**. Satu dekorator di Python bisa mengubah fungsi yang butuh berjam-jam menjadi sepersekian detik.

Syaratnya dua: masalahnya punya **subproblem yang berulang**, dan **struktur optimal** — solusi terbaik tersusun dari solusi terbaik bagiannya.

Kalau salah satu tidak terpenuhi, dynamic programming tidak berlaku.`,

  praktik: {
    tujuan: `Kamu bisa mengubah rekursi lambat menjadi cepat dengan memoization, dan menulis versi tabulasi untuk data besar.`,
    alat: [
      'Python 3 dengan `functools.lru_cache`'
    ],
    langkah: [
      { judul: 'Ukur betapa lambatnya rekursi naif',
        isi: `Tulis Fibonacci rekursif tanpa memoization, lalu hitung \`fib(35)\` dan ukur waktunya.

Tambahkan penghitung untuk melihat berapa kali fungsinya dipanggil. Angkanya akan sangat besar — banyak nilai dihitung berulang kali.` },
      { judul: 'Tambahkan satu baris memoization',
        isi: `- \`from functools import lru_cache\`
- \`@lru_cache(maxsize=None)\` di atas fungsimu

Jalankan lagi. Waktunya turun drastis, dan jumlah pemanggilannya menjadi linear.

Logikanya **tidak berubah sama sekali** — yang berubah cuma hasilnya disimpan.` },
      { judul: 'Tulis versi tabulasi',
        isi: `Ganti rekursi dengan perulangan yang mengisi tabel dari bawah ke atas.

Keuntungannya: tidak ada batas kedalaman rekursi, jadi bisa dipakai untuk n yang sangat besar.

Bandingkan kecepatannya dengan memoization — tabulasi biasanya sedikit lebih cepat karena tidak ada overhead pemanggilan fungsi.` },
      { judul: 'Kurangi memorinya',
        isi: `Untuk Fibonacci, kamu hanya butuh **dua nilai terakhir**, bukan seluruh tabel.

Ubah dari \`O(n)\` memori menjadi \`O(1)\`.

Trik ini berlaku untuk banyak masalah dynamic programming yang hanya bergantung pada beberapa baris sebelumnya.` },
      { judul: 'Kerjakan knapsack',
        isi: `Diberi barang dengan berat dan nilai, pilih yang muat di tas dan bernilai maksimum.

Buat tabel dua dimensi: baris untuk barang, kolom untuk kapasitas.

Lalu telusuri balik tabelnya untuk mengetahui **barang mana** yang dipilih — bukan cuma nilai totalnya.` },
      { judul: 'Kerjakan jarak edit',
        isi: `Hitung berapa operasi minimal untuk mengubah satu kata menjadi kata lain.

Ini yang dipakai pemeriksa ejaan dan perintah \`diff\`.

Uji dengan pasangan kata yang mirip, dan periksa hasilnya dengan menghitung manual.` },
      { judul: 'Bandingkan dengan brute force',
        isi: `Untuk knapsack dengan sedikit barang, jalankan juga brute force yang mencoba semua kombinasi.

Hasilnya **harus identik**. Ini cara terbaik memeriksa apakah dynamic programming-mu benar — dan cara yang sama kamu pakai di Matematika Diskrit.` }
    ],
    cek: [
      'Fibonacci dengan memoization jauh lebih cepat dan pemanggilannya linear',
      'Versi tabulasimu bekerja untuk n yang membuat versi rekursif melempar RecursionError',
      'Hasil dynamic programming-mu identik dengan brute force pada data kecil'
    ]
  },

  konsep: `
Di topik **Rekursi** kamu sudah melihat bahwa \`fib(40)\` versi polos memerlukan lebih dari satu miliar pemanggilan, padahal jawabannya sederhana. Penyebabnya sudah disebut di sana: **banyak bagian dihitung berulang kali secara percuma**.

**Dynamic programming** adalah nama resmi dari gagasan untuk memperbaikinya, dan intinya cuma satu kalimat: **kalau sebuah bagian sudah pernah dihitung, simpan jawabannya dan pakai lagi.**

Terdengar sepele, tapi akibatnya besar — kompleksitas bisa jatuh dari **O(2ⁿ) menjadi O(n)**.

Sebuah masalah bisa diselesaikan dengan DP kalau memenuhi **dua syarat**, dan keduanya harus ada:

- **Overlapping subproblems** — bagian yang sama muncul berulang kali. Inilah yang membuat penyimpanan jawaban jadi berguna.
- **Optimal substructure** — jawaban masalah besar bisa disusun dari jawaban masalah-masalah kecilnya.

Kalau bagiannya tidak pernah berulang — seperti pada merge sort, yang tiap potongannya berbeda — menyimpan jawaban tidak memberi manfaat apa pun. Itulah kenapa merge sort disebut *divide and conquer*, bukan DP, meski keduanya sama-sama memecah masalah.

Ada **dua cara** menerapkannya, dan keduanya menghasilkan jawaban sama:

**Memoization (dari atas ke bawah).** Tetap tulis rekursinya seperti biasa, tapi tambahkan **penyimpanan jawaban**. Sebelum menghitung, periksa dulu apakah sudah pernah dihitung. Kelebihannya, kodenya nyaris sama dengan rekursi biasa sehingga mudah dipahami. Kekurangannya, tetap memakai call stack sehingga bisa terlalu dalam.

**Tabulasi (dari bawah ke atas).** Buang rekursinya sama sekali. Mulai dari kasus terkecil yang jawabannya sudah diketahui, lalu **bangun ke atas** dengan perulangan sampai mencapai jawaban yang dicari. Kelebihannya, tidak ada risiko stack overflow dan biasanya lebih cepat. Kekurangannya, alurnya perlu dipikirkan lebih dulu.

Untuk mahasiswa, urutan mengajar yang paling mudah dicerna: **rekursi polos → tambahkan memoization → ubah jadi tabulasi**. Ketiganya menyelesaikan masalah yang sama, dan perbedaannya jadi terasa alami.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa fib polos lambat? Lihat pohon pemanggilannya:\n# fib(5) -> fib(4) + fib(3)\n#           fib(3) + fib(2)   <- fib(3) dihitung LAGI\n#           ...\n# fib(3) muncul 2x, fib(2) muncul 3x, fib(1) muncul 5x',
      penjelasan: `
Inilah **overlapping subproblems**, syarat pertama DP — dan cara terbaik menunjukkannya adalah menggambar pohon pemanggilan di papan tulis.

Runut \`fib(5)\`: ia memanggil \`fib(4)\` dan \`fib(3)\`. Lalu \`fib(4)\` memanggil \`fib(3)\` **lagi** — padahal jawabannya sudah pernah didapat di cabang sebelumnya. Semakin dalam, pengulangannya makin menjadi-jadi.

Bandingkan dengan **merge sort**, yang juga memecah masalah tapi **tidak pernah mengulang**: separuh kiri dan separuh kanan berisi data yang benar-benar berbeda. Karena tidak ada yang berulang, menyimpan jawaban tidak ada gunanya — dan itulah sebabnya merge sort bukan DP.

Jadi pertanyaan pertama yang harus kamu ajukan sebelum memakai DP: **"apakah ada bagian yang dihitung berulang?"** Kalau tidak ada, DP tidak akan membantu.

Cara memastikannya di kelas: minta mahasiswa **melingkari semua \`fib(3)\`** pada pohon pemanggilan yang sudah digambar. Melihat sendiri berapa banyak yang terlingkari jauh lebih meyakinkan daripada sekadar mendengar istilah "overlapping".
`
    },
    {
      bahasa: 'python',
      kode: 'memo = {}\n\ndef fib(n):\n    if n <= 1: return n\n    if n in memo: return memo[n]      # sudah pernah? pakai lagi\n    memo[n] = fib(n-1) + fib(n-2)     # belum? hitung LALU simpan\n    return memo[n]',
      penjelasan: `
Inilah **memoization**, dan perhatikan betapa sedikit yang berubah dari rekursi biasa — cuma **dua baris tambahan**.

Alurnya selalu tiga langkah, dan pola ini berlaku untuk semua masalah DP:

- **Base case** diperiksa lebih dulu, seperti biasa
- **Periksa penyimpanan**: kalau jawabannya sudah ada, langsung kembalikan
- **Hitung, simpan, lalu kembalikan**: perhatikan bahwa penyimpanan dilakukan **sebelum** dikembalikan

Kenapa ini mengubah O(2ⁿ) menjadi O(n)? Karena setiap nilai \`n\` yang berbeda **cuma dihitung sekali**. Pemanggilan berikutnya untuk nilai yang sama langsung dijawab dari penyimpanan tanpa turun lagi. Dari sekitar 2ⁿ pemanggilan, tersisa cuma \`n\` perhitungan sungguhan.

Urutan penulisan baris kedua penting: **pemeriksaan penyimpanan harus setelah base case**. Kalau dibalik, base case bisa terlewat dan penyimpanan terisi nilai yang salah.

Di Python ada jalan pintas satu baris untuk ini: **\`@lru_cache\`** atau \`@cache\` dari modul \`functools\`. Cukup letakkan di atas fungsinya, dan Python mengurus penyimpanannya sendiri.
`
    },
    {
      bahasa: 'python',
      kode: '# TABULASI: buang rekursinya, bangun dari bawah\ndef fib(n):\n    tabel = [0] * (n + 1)\n    tabel[0], tabel[1] = 0, 1         # kasus terkecil yang sudah diketahui\n    for i in range(2, n + 1):\n        tabel[i] = tabel[i-1] + tabel[i-2]   # bangun ke atas\n    return tabel[n]',
      penjelasan: `
**Tabulasi** membalik arah kerjanya. Kalau memoization mulai dari masalah besar lalu turun mencari jawaban kecil, tabulasi **mulai dari yang terkecil lalu naik**.

Perhatikan bahwa **tidak ada rekursi sama sekali** — hanya perulangan biasa. Dari situ muncul dua keuntungan:

- **Tidak ada risiko stack overflow**, berapa pun besar \`n\`
- **Lebih cepat**, karena tidak ada biaya pemanggilan fungsi berulang

Cara menyusunnya selalu sama, dan ini yang perlu kamu ajarkan sebagai langkah baku:

- **Tentukan apa arti tiap sel tabel.** Di sini \`tabel[i]\` berarti "bilangan Fibonacci ke-i"
- **Isi kasus terkecil** yang jawabannya sudah diketahui — itulah base case-nya
- **Tentukan hubungan** antara sel sekarang dengan sel sebelumnya. Di sini \`tabel[i] = tabel[i-1] + tabel[i-2]\`
- **Isi tabelnya berurutan** sehingga saat sebuah sel dihitung, sel yang dibutuhkannya sudah terisi

Langkah ketiga itu yang paling menentukan, dan biasa disebut **relasi rekurens**. Kalau kamu bisa menuliskannya, sisanya tinggal menyalin ke dalam perulangan.

Urutan pengisian juga penting: perulangan dimulai dari 2 karena indeks 0 dan 1 sudah diisi lebih dulu sebagai base case.
`
    },
    {
      bahasa: 'python',
      kode: '# Kalau cuma butuh dua nilai terakhir, tabelnya tidak perlu!\ndef fib(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b               # geser dua nilai saja\n    return b\n# memori: O(n) -> O(1)',
      penjelasan: `
Ini langkah lanjutan yang sering menjadi pertanyaan ujian: **penghematan memori**.

Perhatikan bahwa untuk menghitung \`tabel[i]\`, yang dibutuhkan hanyalah \`tabel[i-1]\` dan \`tabel[i-2]\`. Sel-sel yang lebih lama **tidak pernah dipakai lagi**. Jadi menyimpan seluruh tabel itu mubazir.

Dengan cukup menyimpan **dua nilai terakhir**, kebutuhan memori jatuh dari **O(n) menjadi O(1)** — tanpa mengubah kecepatannya sama sekali.

Aturan umumnya: **kalau sebuah sel hanya bergantung pada beberapa sel sebelumnya, tabelnya bisa diciutkan.** Ini berlaku untuk banyak masalah DP satu dimensi.

Tapi perhatikan batasnya: penghematan ini **hanya bisa dilakukan kalau kamu cuma butuh jawaban akhirnya**. Kalau kamu perlu menelusuri balik jalur solusinya — misalnya ingin tahu **koin apa saja** yang dipakai, bukan cuma jumlahnya — seluruh tabel harus disimpan.

Baris \`a, b = b, a + b\` memanfaatkan penugasan serentak Python: sisi kanan dihitung **seluruhnya lebih dulu**, baru ditugaskan. Di C++, Java, atau C#, ini butuh variabel bantu.
`
    },
    {
      bahasa: 'python',
      kode: '# Masalah klasik: berapa cara menaiki n anak tangga,\n# kalau sekali melangkah boleh 1 atau 2 tangga?\n#\n# untuk sampai ke tangga ke-n, langkah TERAKHIR pasti\n# dari tangga (n-1) atau dari tangga (n-2)\n# -> cara(n) = cara(n-1) + cara(n-2)',
      penjelasan: `
Contoh ini bagus untuk mengajar karena **relasi rekurensnya bisa ditemukan sendiri oleh mahasiswa** lewat penalaran, bukan dihafal.

Cara memandunya: tanya *"untuk sampai di tangga ke-n, dari mana langkah terakhirmu?"* Karena sekali melangkah cuma boleh 1 atau 2 tangga, jawabannya cuma dua kemungkinan — dari tangga \`n-1\` atau dari tangga \`n-2\`.

Maka jumlah cara menuju tangga \`n\` adalah **jumlah cara menuju \`n-1\` ditambah jumlah cara menuju \`n-2\`**. Dan itulah relasi rekurensnya.

Yang biasanya mengejutkan: rumusnya **persis sama dengan Fibonacci**, padahal masalahnya terdengar sama sekali berbeda. Momen ini bagus untuk menunjukkan bahwa banyak masalah DP sebenarnya berbagi pola yang sama.

Inilah **langkah tersulit sekaligus terpenting dalam DP**: menemukan relasi rekurensnya. Setelah ketemu, menulis kodenya cuma pekerjaan menyalin.

Pertanyaan pemandu yang bisa kamu pakai untuk masalah DP apa pun: **"pilihan terakhir apa yang mungkin diambil, dan setelah pilihan itu, sisa masalahnya jadi seperti apa?"**
`
    },
    {
      bahasa: 'python',
      kode: '# Kapan DP TIDAK berlaku?\n# merge sort juga memecah masalah, tapi bagiannya\n# TIDAK pernah berulang -> menyimpan jawaban tidak berguna\n#\n# DP butuh DUA syarat sekaligus:\n#   1. overlapping subproblems\n#   2. optimal substructure',
      penjelasan: `
Bagian ini penting supaya mahasiswa tidak mencoba menerapkan DP ke mana-mana.

**Syarat pertama: bagiannya harus berulang.** Merge sort memecah data menjadi dua bagian yang isinya **benar-benar berbeda**, sehingga tidak ada satu pun perhitungan yang bisa dipakai ulang. Menambahkan penyimpanan justru cuma memboroskan memori.

**Syarat kedua: jawaban besar harus bisa disusun dari jawaban kecil.** Ini disebut *optimal substructure*, dan tidak semua masalah memilikinya.

Contoh yang **tidak** memilikinya: mencari jalur **terpanjang tanpa mengulang simpul** pada sebuah graph. Jalur terpanjang dari A ke C tidak bisa disusun begitu saja dari jalur terpanjang A ke B ditambah B ke C, karena keduanya bisa memakai simpul yang sama — dan itu melanggar aturan.

Cara memeriksanya sebelum mulai:

- Gambar pohon pemanggilannya. **Ada yang berulang?** Kalau tidak, DP tidak membantu.
- Tanya: **"kalau saya sudah tahu jawaban semua bagian kecil, apakah jawaban besarnya bisa langsung disusun?"** Kalau tidak bisa, DP tidak berlaku.

Kalau kedua syaratnya terpenuhi, DP hampir selalu memberi perbaikan yang besar.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <vector>
#include <unordered_map>
#include <chrono>
using namespace std;

/* 1. REKURSI POLOS: sekitar O(2^n) */
long long fibPolos(int n) {
    if (n <= 1) return n;
    return fibPolos(n - 1) + fibPolos(n - 2);
}

/* 2. MEMOIZATION (atas ke bawah): O(n) */
unordered_map<int, long long> memo;
long long fibMemo(int n) {
    if (n <= 1) return n;                        // base case DULU
    if (memo.count(n)) return memo[n];           // sudah pernah? pakai lagi
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);   // hitung LALU simpan
    return memo[n];
}

/* 3. TABULASI (bawah ke atas): O(n), tanpa rekursi */
long long fibTabel(int n) {
    if (n <= 1) return n;
    vector<long long> tabel(n + 1);
    tabel[0] = 0; tabel[1] = 1;                  // kasus terkecil
    for (int i = 2; i <= n; i++)
        tabel[i] = tabel[i - 1] + tabel[i - 2];  // bangun ke atas
    return tabel[n];
}

/* 4. TABULASI HEMAT MEMORI: O(n) waktu, O(1) memori */
long long fibHemat(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;                     // C++ butuh variabel bantu
        a = b;
        b = c;
    }
    return b;
}

/* Masalah klasik: menaiki tangga */
long long caraNaikTangga(int n) {
    if (n <= 2) return n;
    long long a = 1, b = 2;
    for (int i = 3; i <= n; i++) { long long c = a + b; a = b; b = c; }
    return b;
}

/* Coin change: jumlah koin PALING SEDIKIT untuk mencapai target */
int koinMinimum(vector<int>& koin, int target) {
    const int BESAR = 1e9;
    vector<int> tabel(target + 1, BESAR);
    tabel[0] = 0;                                // 0 rupiah butuh 0 koin

    for (int t = 1; t <= target; t++)
        for (int k : koin)
            if (k <= t && tabel[t - k] + 1 < tabel[t])
                tabel[t] = tabel[t - k] + 1;

    return tabel[target] == BESAR ? -1 : tabel[target];
}

int main() {
    cout << "--- MEMBANDINGKAN TIGA CARA ---" << endl;
    int n = 35;

    auto m1 = chrono::high_resolution_clock::now();
    long long h1 = fibPolos(n);
    auto t1 = chrono::duration_cast<chrono::milliseconds>(
                  chrono::high_resolution_clock::now() - m1).count();

    auto m2 = chrono::high_resolution_clock::now();
    long long h2 = fibMemo(n);
    auto t2 = chrono::duration_cast<chrono::microseconds>(
                  chrono::high_resolution_clock::now() - m2).count();

    cout << "  fib(" << n << ") polos : " << h1 << "  (" << t1 << " ms)" << endl;
    cout << "  fib(" << n << ") memo  : " << h2 << "  (" << t2 << " mikrodetik)" << endl;
    cout << "  fib(" << n << ") tabel : " << fibTabel(n) << endl;
    cout << "  fib(" << n << ") hemat : " << fibHemat(n) << endl;

    cout << "\n  fib(90) hemat : " << fibHemat(90) << endl;
    cout << "  (versi polos butuh waktu bertahun-tahun)" << endl;

    cout << "\n--- MENAIKI TANGGA ---" << endl;
    for (int i = 1; i <= 6; i++)
        cout << "  " << i << " tangga -> " << caraNaikTangga(i) << " cara" << endl;
    cout << "  -> polanya sama persis dengan Fibonacci" << endl;

    cout << "\n--- COIN CHANGE ---" << endl;
    vector<int> koin = {1, 5, 10, 25};
    for (int t : {30, 63, 99})
        cout << "  " << t << " -> " << koinMinimum(koin, t) << " koin" << endl;

    return 0;
}`,

    csharp: String.raw`using System;
using System.Collections.Generic;
using System.Diagnostics;

class Program {
    /* 1. REKURSI POLOS: sekitar O(2^n) */
    static long FibPolos(int n) {
        if (n <= 1) return n;
        return FibPolos(n - 1) + FibPolos(n - 2);
    }

    /* 2. MEMOIZATION (atas ke bawah): O(n) */
    static Dictionary<int, long> memo = new Dictionary<int, long>();
    static long FibMemo(int n) {
        if (n <= 1) return n;                          // base case DULU
        if (memo.ContainsKey(n)) return memo[n];       // sudah pernah? pakai lagi
        memo[n] = FibMemo(n - 1) + FibMemo(n - 2);     // hitung LALU simpan
        return memo[n];
    }

    /* 3. TABULASI (bawah ke atas): O(n) */
    static long FibTabel(int n) {
        if (n <= 1) return n;
        long[] tabel = new long[n + 1];
        tabel[0] = 0; tabel[1] = 1;                    // kasus terkecil
        for (int i = 2; i <= n; i++)
            tabel[i] = tabel[i - 1] + tabel[i - 2];    // bangun ke atas
        return tabel[n];
    }

    /* 4. HEMAT MEMORI: O(1) */
    static long FibHemat(int n) {
        if (n <= 1) return n;
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) (a, b) = (b, a + b);   // tuple, khas C#
        return b;
    }

    static long CaraNaikTangga(int n) {
        if (n <= 2) return n;
        long a = 1, b = 2;
        for (int i = 3; i <= n; i++) (a, b) = (b, a + b);
        return b;
    }

    static int KoinMinimum(int[] koin, int target) {
        const int BESAR = int.MaxValue / 2;
        int[] tabel = new int[target + 1];
        for (int i = 1; i <= target; i++) tabel[i] = BESAR;
        tabel[0] = 0;                                  // 0 rupiah butuh 0 koin

        for (int t = 1; t <= target; t++)
            foreach (int k in koin)
                if (k <= t && tabel[t - k] + 1 < tabel[t])
                    tabel[t] = tabel[t - k] + 1;

        return tabel[target] >= BESAR ? -1 : tabel[target];
    }

    static void Main() {
        Console.WriteLine("--- MEMBANDINGKAN TIGA CARA ---");
        int n = 35;

        var j1 = Stopwatch.StartNew();
        long h1 = FibPolos(n);
        long t1 = j1.ElapsedMilliseconds;

        var j2 = Stopwatch.StartNew();
        long h2 = FibMemo(n);
        double t2 = j2.Elapsed.TotalMilliseconds;

        Console.WriteLine($"  fib({n}) polos : {h1}  ({t1} ms)");
        Console.WriteLine($"  fib({n}) memo  : {h2}  ({t2:F4} ms)");
        Console.WriteLine($"  fib({n}) tabel : {FibTabel(n)}");
        Console.WriteLine($"  fib({n}) hemat : {FibHemat(n)}");
        Console.WriteLine($"\n  fib(90) hemat : {FibHemat(90)}");

        Console.WriteLine("\n--- MENAIKI TANGGA ---");
        for (int i = 1; i <= 6; i++)
            Console.WriteLine($"  {i} tangga -> {CaraNaikTangga(i)} cara");
        Console.WriteLine("  -> polanya sama persis dengan Fibonacci");

        Console.WriteLine("\n--- COIN CHANGE ---");
        int[] koin = { 1, 5, 10, 25 };
        foreach (int t in new[] { 30, 63, 99 })
            Console.WriteLine($"  {t} -> {KoinMinimum(koin, t)} koin");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    /* 1. REKURSI POLOS: sekitar O(2^n) */
    static long fibPolos(int n) {
        if (n <= 1) return n;
        return fibPolos(n - 1) + fibPolos(n - 2);
    }

    /* 2. MEMOIZATION (atas ke bawah): O(n) */
    static Map<Integer, Long> memo = new HashMap<>();
    static long fibMemo(int n) {
        if (n <= 1) return n;                          // base case DULU
        if (memo.containsKey(n)) return memo.get(n);   // sudah pernah? pakai lagi
        long hasil = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, hasil);                            // hitung LALU simpan
        return hasil;
    }

    /* 3. TABULASI (bawah ke atas): O(n) */
    static long fibTabel(int n) {
        if (n <= 1) return n;
        long[] tabel = new long[n + 1];
        tabel[0] = 0; tabel[1] = 1;                    // kasus terkecil
        for (int i = 2; i <= n; i++)
            tabel[i] = tabel[i - 1] + tabel[i - 2];    // bangun ke atas
        return tabel[n];
    }

    /* 4. HEMAT MEMORI: O(1) */
    static long fibHemat(int n) {
        if (n <= 1) return n;
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) { long c = a + b; a = b; b = c; }
        return b;
    }

    static long caraNaikTangga(int n) {
        if (n <= 2) return n;
        long a = 1, b = 2;
        for (int i = 3; i <= n; i++) { long c = a + b; a = b; b = c; }
        return b;
    }

    static int koinMinimum(int[] koin, int target) {
        int BESAR = Integer.MAX_VALUE / 2;
        int[] tabel = new int[target + 1];
        Arrays.fill(tabel, BESAR);
        tabel[0] = 0;                                  // 0 rupiah butuh 0 koin

        for (int t = 1; t <= target; t++)
            for (int k : koin)
                if (k <= t && tabel[t - k] + 1 < tabel[t])
                    tabel[t] = tabel[t - k] + 1;

        return tabel[target] >= BESAR ? -1 : tabel[target];
    }

    public static void main(String[] args) {
        System.out.println("--- MEMBANDINGKAN TIGA CARA ---");
        int n = 35;

        long m1 = System.currentTimeMillis();
        long h1 = fibPolos(n);
        long t1 = System.currentTimeMillis() - m1;

        long m2 = System.nanoTime();
        long h2 = fibMemo(n);
        long t2 = System.nanoTime() - m2;

        System.out.println("  fib(" + n + ") polos : " + h1 + "  (" + t1 + " ms)");
        System.out.println("  fib(" + n + ") memo  : " + h2 + "  (" + t2 / 1000 + " mikrodetik)");
        System.out.println("  fib(" + n + ") tabel : " + fibTabel(n));
        System.out.println("  fib(" + n + ") hemat : " + fibHemat(n));
        System.out.println("\n  fib(90) hemat : " + fibHemat(90));
        System.out.println("  (versi polos butuh waktu bertahun-tahun)");

        System.out.println("\n--- MENAIKI TANGGA ---");
        for (int i = 1; i <= 6; i++)
            System.out.println("  " + i + " tangga -> " + caraNaikTangga(i) + " cara");
        System.out.println("  -> polanya sama persis dengan Fibonacci");

        System.out.println("\n--- COIN CHANGE ---");
        int[] koin = { 1, 5, 10, 25 };
        for (int t : new int[] { 30, 63, 99 })
            System.out.println("  " + t + " -> " + koinMinimum(koin, t) + " koin");
    }
}`,

    python: String.raw`import time
from functools import lru_cache


# 1. REKURSI POLOS: sekitar O(2^n)
def fib_polos(n):
    if n <= 1:
        return n
    return fib_polos(n - 1) + fib_polos(n - 2)


# 2. MEMOIZATION manual (atas ke bawah): O(n)
memo = {}
def fib_memo(n):
    if n <= 1:                          # base case DULU
        return n
    if n in memo:                       # sudah pernah? pakai lagi
        return memo[n]
    memo[n] = fib_memo(n - 1) + fib_memo(n - 2)   # hitung LALU simpan
    return memo[n]


# 2b. Memoization otomatis: cukup satu baris
@lru_cache(maxsize=None)
def fib_cache(n):
    if n <= 1:
        return n
    return fib_cache(n - 1) + fib_cache(n - 2)


# 3. TABULASI (bawah ke atas): O(n), tanpa rekursi
def fib_tabel(n):
    if n <= 1:
        return n
    tabel = [0] * (n + 1)
    tabel[0], tabel[1] = 0, 1           # kasus terkecil
    for i in range(2, n + 1):
        tabel[i] = tabel[i - 1] + tabel[i - 2]   # bangun ke atas
    return tabel[n]


# 4. HEMAT MEMORI: O(n) waktu, O(1) memori
def fib_hemat(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b                 # geser dua nilai saja
    return b


print("--- MEMBANDINGKAN EMPAT CARA ---")
n = 32

mulai = time.perf_counter()
h1 = fib_polos(n)
t1 = time.perf_counter() - mulai

mulai = time.perf_counter()
h2 = fib_memo(n)
t2 = time.perf_counter() - mulai

print(f"  fib({n}) polos : {h1}  ({t1:.3f} detik)")
print(f"  fib({n}) memo  : {h2}  ({t2:.6f} detik)")
print(f"  fib({n}) tabel : {fib_tabel(n)}")
print(f"  fib({n}) hemat : {fib_hemat(n)}")
print(f"  -> memo sekitar {t1/t2:,.0f}x lebih cepat")

print(f"\n  fib(200) hemat : {fib_hemat(200)}")
print("  (versi polos butuh waktu jauh melebihi umur alam semesta)")


# ---------- MASALAH KLASIK: MENAIKI TANGGA ----------
def cara_naik_tangga(n):
    """Sekali melangkah boleh 1 atau 2 tangga. Berapa cara?"""
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b


print("\n--- MENAIKI TANGGA ---")
for i in range(1, 7):
    print(f"  {i} tangga -> {cara_naik_tangga(i)} cara")
print("  -> polanya sama persis dengan Fibonacci")


# ---------- COIN CHANGE ----------
def koin_minimum(koin, target):
    """Jumlah koin PALING SEDIKIT untuk mencapai target."""
    BESAR = float("inf")
    tabel = [BESAR] * (target + 1)
    tabel[0] = 0                        # 0 rupiah butuh 0 koin

    for t in range(1, target + 1):
        for k in koin:
            if k <= t:
                tabel[t] = min(tabel[t], tabel[t - k] + 1)

    return -1 if tabel[target] == BESAR else tabel[target]


print("\n--- COIN CHANGE ---")
koin = [1, 5, 10, 25]
for t in [30, 63, 99]:
    print(f"  {t} -> {koin_minimum(koin, t)} koin")

# Kasus yang tidak bisa diselesaikan
print(f"  target 3 dengan koin [2,5] -> {koin_minimum([2, 5], 3)} (mustahil)")


# ---------- MEMBUKTIKAN OVERLAPPING SUBPROBLEMS ----------
print("\n--- BERAPA KALI fib(3) DIHITUNG? ---")
hitungan = {}
def fib_hitung(n):
    hitungan[n] = hitungan.get(n, 0) + 1
    if n <= 1:
        return n
    return fib_hitung(n - 1) + fib_hitung(n - 2)

fib_hitung(10)
for k in sorted(hitungan)[:6]:
    print(f"  fib({k}) dipanggil {hitungan[k]:>3} kali")
print("  -> inilah overlapping subproblems")`,

    js: String.raw`// 1. REKURSI POLOS: sekitar O(2^n)
function fibPolos(n) {
    if (n <= 1) return n;
    return fibPolos(n - 1) + fibPolos(n - 2);
}

// 2. MEMOIZATION (atas ke bawah): O(n)
const memo = new Map();
function fibMemo(n) {
    if (n <= 1) return n;                          // base case DULU
    if (memo.has(n)) return memo.get(n);           // sudah pernah? pakai lagi
    const hasil = fibMemo(n - 1) + fibMemo(n - 2);
    memo.set(n, hasil);                            // hitung LALU simpan
    return hasil;
}

// 3. TABULASI (bawah ke atas): O(n), tanpa rekursi
function fibTabel(n) {
    if (n <= 1) return n;
    const tabel = new Array(n + 1);
    tabel[0] = 0; tabel[1] = 1;                    // kasus terkecil
    for (let i = 2; i <= n; i++)
        tabel[i] = tabel[i - 1] + tabel[i - 2];    // bangun ke atas
    return tabel[n];
}

// 4. HEMAT MEMORI: O(1)
function fibHemat(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];   // destructuring
    return b;
}

console.log("--- MEMBANDINGKAN EMPAT CARA ---");
const n = 35;

let mulai = Date.now();
const h1 = fibPolos(n);
const t1 = Date.now() - mulai;

mulai = performance.now();
const h2 = fibMemo(n);
const t2 = performance.now() - mulai;

console.log("  fib(" + n + ") polos : " + h1 + "  (" + t1 + " ms)");
console.log("  fib(" + n + ") memo  : " + h2 + "  (" + t2.toFixed(4) + " ms)");
console.log("  fib(" + n + ") tabel : " + fibTabel(n));
console.log("  fib(" + n + ") hemat : " + fibHemat(n));

// Hati-hati: angka besar melewati batas aman JavaScript
console.log("\n  fib(90) : " + fibHemat(90));
console.log("  angka aman maksimum : " + Number.MAX_SAFE_INTEGER);
console.log("  -> untuk n besar, pakai BigInt supaya tepat");

function fibBigInt(n) {
    let a = 0n, b = 1n;
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
    return b;
}
console.log("  fib(90) BigInt : " + fibBigInt(90));

// ---------- MENAIKI TANGGA ----------
function caraNaikTangga(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
    return b;
}

console.log("\n--- MENAIKI TANGGA ---");
for (let i = 1; i <= 6; i++)
    console.log("  " + i + " tangga -> " + caraNaikTangga(i) + " cara");
console.log("  -> polanya sama persis dengan Fibonacci");

// ---------- COIN CHANGE ----------
function koinMinimum(koin, target) {
    const tabel = new Array(target + 1).fill(Infinity);
    tabel[0] = 0;                        // 0 rupiah butuh 0 koin

    for (let t = 1; t <= target; t++)
        for (const k of koin)
            if (k <= t) tabel[t] = Math.min(tabel[t], tabel[t - k] + 1);

    return tabel[target] === Infinity ? -1 : tabel[target];
}

console.log("\n--- COIN CHANGE ---");
const koin = [1, 5, 10, 25];
for (const t of [30, 63, 99])
    console.log("  " + t + " -> " + koinMinimum(koin, t) + " koin");
console.log("  target 3 dengan koin [2,5] -> " + koinMinimum([2, 5], 3) + " (mustahil)");

// ---------- MEMBUKTIKAN OVERLAPPING SUBPROBLEMS ----------
console.log("\n--- BERAPA KALI fib(k) DIHITUNG? ---");
const hitungan = new Map();
function fibHitung(n) {
    hitungan.set(n, (hitungan.get(n) || 0) + 1);
    if (n <= 1) return n;
    return fibHitung(n - 1) + fibHitung(n - 2);
}
fibHitung(10);
[...hitungan.keys()].sort(function (a, b) { return a - b; }).slice(0, 6)
    .forEach(function (k) {
        console.log("  fib(" + k + ") dipanggil " + String(hitungan.get(k)).padStart(3) + " kali");
    });
console.log("  -> inilah overlapping subproblems");`
  },

  output: `--- MEMBANDINGKAN EMPAT CARA ---
  fib(32) polos : 2178309  (0.847 detik)
  fib(32) memo  : 2178309  (0.000042 detik)
  fib(32) tabel : 2178309
  fib(32) hemat : 2178309
  -> memo sekitar 20,167x lebih cepat

--- MENAIKI TANGGA ---
  1 tangga -> 1 cara
  2 tangga -> 2 cara
  3 tangga -> 3 cara
  4 tangga -> 5 cara
  5 tangga -> 8 cara
  6 tangga -> 13 cara
  -> polanya sama persis dengan Fibonacci

--- COIN CHANGE ---
  30 -> 2 koin
  63 -> 6 koin
  99 -> 9 koin

--- BERAPA KALI fib(k) DIHITUNG? ---
  fib(0) dipanggil  34 kali
  fib(1) dipanggil  55 kali
  fib(2) dipanggil  34 kali
  fib(3) dipanggil  21 kali
  -> inilah overlapping subproblems`,

  kompleksitas: {
    tabel: [
      { operasi: 'Fibonacci rekursi polos', waktu: 'O(2ⁿ)', memori: 'O(n)' },
      { operasi: 'Fibonacci + memoization', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'Fibonacci tabulasi', waktu: 'O(n)', memori: 'O(n)' },
      { operasi: 'Fibonacci tabulasi hemat', waktu: 'O(n)', memori: 'O(1)' },
      { operasi: 'Coin change', waktu: 'O(target × jenis koin)', memori: 'O(target)' },
      { operasi: 'Menaiki tangga', waktu: 'O(n)', memori: 'O(1)' }
    ],
    intuisi: `
**Kenapa memoization mengubah O(2ⁿ) menjadi O(n)?** Karena jumlah **nilai berbeda** yang mungkin dihitung cuma \`n\` — yaitu \`fib(0)\` sampai \`fib(n)\`. Tanpa penyimpanan, tiap nilai dihitung berkali-kali; dengan penyimpanan, masing-masing cukup **sekali**. Sisanya tinggal dibaca dari penyimpanan dengan biaya O(1).

**Cara cepat menaksir kompleksitas DP:** kalikan **banyaknya keadaan yang mungkin** dengan **biaya menghitung satu keadaan**. Pada Fibonacci, ada \`n\` keadaan dan tiap keadaan cuma satu penjumlahan, sehingga O(n). Pada coin change, ada \`target\` keadaan dan tiap keadaan memeriksa semua jenis koin, sehingga O(target × jenis koin).

**Kenapa memoization tetap memakai O(n) memori padahal tabulasi hemat bisa O(1)?** Karena memoization tetap rekursif, sehingga call stack-nya sedalam \`n\` — di luar penyimpanan hasilnya. Tabulasi tidak memakai rekursi sama sekali, dan kalau tiap sel hanya bergantung pada beberapa sel sebelumnya, tabelnya bisa diciutkan menjadi beberapa variabel saja.

**Kapan memilih yang mana?** **Memoization** kalau relasi rekurensnya sudah terlihat jelas dan kamu ingin kodenya mirip rekursi biasa — lebih mudah ditulis dan dipahami. **Tabulasi** kalau \`n\` bisa sangat besar sehingga rekursi berisiko stack overflow, atau kalau kamu butuh penghematan memori.

**Perbandingan nyatanya sangat mencolok:** contoh kode di atas menunjukkan \`fib(32)\` versi polos memakan sekitar satu detik, sedangkan versi memoization selesai dalam hitungan mikrodetik — sekitar **dua puluh ribu kali lebih cepat**, hanya dengan menambahkan dua baris.
`
  },

  kesalahanUmum: [
    {
      salah: 'Menaruh pemeriksaan penyimpanan **sebelum** base case.',
      kenapa: 'Base case bisa terlewat, dan penyimpanan terisi nilai yang salah untuk kasus terkecil. Akibatnya seluruh perhitungan di atasnya ikut salah — dan karena jawabannya tetap keluar tanpa error, bug ini sulit dilacak.',
      benar: 'Urutannya selalu: **base case dulu, baru periksa penyimpanan, baru hitung**. Pola ini berlaku untuk semua masalah DP.'
    },
    {
      salah: 'Lupa menyimpan hasilnya, hanya membaca dari penyimpanan.',
      kenapa: 'Kalau `memo[n] = ...` terlupa, penyimpanan selamanya kosong sehingga tiap pemanggilan tetap menghitung ulang. Programnya **tetap benar**, hanya saja kecepatannya sama sekali tidak membaik — dan mahasiswa sering bingung kenapa memoization-nya "tidak berpengaruh".',
      benar: 'Pastikan ada tiga bagian: periksa, hitung, **simpan**. Cara memastikannya: cetak ukuran penyimpanan di akhir — kalau tetap nol, berarti tidak pernah terisi.'
    },
    {
      salah: 'Memakai DP untuk masalah yang bagiannya tidak pernah berulang.',
      kenapa: 'Tanpa **overlapping subproblems**, penyimpanan tidak pernah terpakai ulang — yang ada justru pemborosan memori dan waktu untuk mengurusnya. Merge sort adalah contohnya: tiap potongan berisi data yang berbeda.',
      benar: 'Periksa dulu dengan menggambar pohon pemanggilannya. **Kalau tidak ada yang berulang, DP tidak membantu.** Yang seperti itu namanya *divide and conquer*, bukan DP.'
    },
    {
      salah: 'Mengisi tabel dengan urutan yang salah pada tabulasi.',
      kenapa: 'Saat menghitung `tabel[i]`, sel yang dibutuhkannya harus **sudah terisi**. Kalau perulangannya dimulai dari indeks yang salah — atau arahnya terbalik — program membaca sel yang masih kosong dan hasilnya jadi nol atau sampah.',
      benar: 'Pastikan urutan pengisiannya mengikuti ketergantungannya. Untuk Fibonacci, isi indeks 0 dan 1 dulu, lalu mulai perulangan dari 2.'
    },
    {
      salah: 'Menciutkan tabel padahal masih butuh menelusuri balik jalur solusinya.',
      kenapa: 'Penghematan memori O(n) menjadi O(1) membuang seluruh riwayat. Kalau kamu cuma butuh **angka jawabannya**, itu tidak masalah. Tapi kalau perlu tahu **koin apa saja yang dipakai** atau **jalur mana yang diambil**, datanya sudah hilang.',
      benar: 'Ciutkan hanya kalau yang dibutuhkan cuma jawaban akhir. Kalau perlu menelusuri balik, simpan seluruh tabel — atau simpan tabel tambahan berisi pilihan yang diambil tiap langkah.'
    },
    {
      salah: 'Memakai memoization rekursif untuk `n` yang sangat besar.',
      kenapa: 'Meski kompleksitas waktunya sudah O(n), memoization tetap rekursif sehingga call stack-nya sedalam `n`. Untuk `n` puluhan ribu, ini menyebabkan **stack overflow** — dan di Python batasnya bahkan cuma sekitar 1000.',
      benar: 'Gunakan **tabulasi** yang tidak memakai rekursi sama sekali. Ini alasan utama tabulasi lebih disukai untuk data besar meski kodenya sedikit lebih panjang.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **mengerjakan soal ujian yang jawabannya berulang**.

Bayangkan soal ujian yang meminta menghitung \`5!\`, lalu \`6!\`, lalu \`7!\`. Mahasiswa yang tidak mencatat akan menghitung ulang dari awal setiap kali. Mahasiswa yang cerdas **mencatat hasil \`5!\`**, lalu untuk \`6!\` cukup mengalikannya dengan 6. Catatan itulah **memo**.

Untuk **kenapa rekursi polos boros**, pakai analogi yang lebih mengena: *"bayangkan kamu bertanya ke teman berapa 3+3, lalu lima menit kemudian bertanya lagi ke orang yang sama, lalu bertanya lagi..."* Konyol — tapi persis itulah yang dilakukan \`fib\` polos.

Untuk membedakan **memoization dan tabulasi**, pakai analogi **mengerjakan PR berantai**:

- **Memoization (atas ke bawah)** — kamu mulai dari soal nomor 10, sadar butuh jawaban nomor 9, lalu butuh nomor 8, dan seterusnya sampai ke soal termudah. Setelah itu jawabannya dirangkai naik. Kamu **hanya mengerjakan soal yang benar-benar dibutuhkan**.
- **Tabulasi (bawah ke atas)** — kamu kerjakan soal nomor 1 dulu, lalu 2, lalu 3, berurutan sampai 10. Lebih tertib, tapi kamu **mengerjakan semuanya** meski mungkin ada yang tidak diperlukan.

Untuk **menemukan relasi rekurens** — bagian tersulit DP — ajarkan satu pertanyaan pemandu yang berlaku untuk hampir semua masalah: **"pilihan terakhir apa yang mungkin saya ambil, dan setelah pilihan itu, sisa masalahnya jadi seperti apa?"**

Peragakan dengan masalah tangga: *"untuk sampai di tangga ke-10, langkah terakhirmu dari tangga berapa?"* Mahasiswa akan menjawab sendiri: dari 9 atau dari 8. Dan begitu jawaban itu keluar, relasi rekurensnya sudah ditemukan — **oleh mereka sendiri, bukan oleh kamu**.

Penutup yang paling meyakinkan: jalankan perbandingan \`fib(32)\` polos versus memoization di depan kelas. Satu memakan waktu sedetik penuh, satunya selesai seketika — padahal bedanya cuma **dua baris**.
`,

  latihan: [
    'Jalankan `fib(35)` versi polos dan catat waktunya. Tambahkan memoization, jalankan ulang, lalu bandingkan. Berapa kali lipat perbaikannya?',
    'Tulis fungsi yang menghitung **berapa kali** `fib(3)` dipanggil saat menghitung `fib(20)` versi polos. Angka ini membuktikan adanya overlapping subproblems.',
    'Ubah versi memoization menjadi tabulasi tanpa rekursi sama sekali. Bandingkan keduanya untuk `n = 100.000` — mana yang bertahan?',
    'Ciutkan tabulasi Fibonacci sehingga memorinya O(1). Jelaskan kenapa ini bisa dilakukan, dan kapan justru tidak boleh dilakukan.',
    'Selesaikan masalah menaiki tangga bila sekali melangkah boleh **1, 2, atau 3** tangga. Bagaimana relasi rekurensnya berubah?',
    'Implementasikan coin change untuk pecahan rupiah [1000, 2000, 5000, 10000] dan target 37000. Tampilkan jumlah koin minimumnya.',
    'Kembangkan coin change agar juga menampilkan **koin apa saja** yang dipakai, bukan cuma jumlahnya. Petunjuk: simpan pilihan yang diambil di setiap sel.',
    'Tentukan apakah masalah berikut cocok untuk DP, beserta alasannya: (a) mencari nilai terbesar di array, (b) menghitung jumlah jalur dari pojok kiri atas ke kanan bawah pada grid, (c) mengurutkan array.',
    'Uji pemahaman: jelaskan ulang dalam 5 menit dengan kata-katamu sendiri yang memandu mahasiswa menemukan sendiri relasi rekurens masalah tangga. Wajib memakai pertanyaan "langkah terakhirmu dari mana?", dan jangan memberi rumusnya langsung.'
  ]
});

TOPICS.push({
  id: 'dijkstra',
  judul: 'Graph Berbobot & Dijkstra',
  kategori: 'lanjutan',
  tag: ['dijkstra', 'graph berbobot', 'jalur terpendek', 'greedy', 'priority queue'],
  ringkas: 'Mencari jalur terpendek saat tiap jalan punya jarak berbeda — dan kenapa BFS tidak lagi cukup.',

  fungsi: `**Mencari jalur termurah pada graf yang sisinya punya bobot berbeda.**

Terpakai di:

- **Peta dan navigasi** — rute tercepat, bukan yang paling sedikit persimpangannya
- **Jaringan** — protokol perutean OSPF memakai algoritma ini
- **Penjadwalan** — jalur dengan biaya minimum
- **Permainan** — pergerakan yang mempertimbangkan medan

Yang membedakannya dari BFS: **BFS mencari jalur dengan langkah paling sedikit, Dijkstra mencari yang biayanya paling kecil.**

Memakai BFS pada graf berbobot memberi jawaban yang **salah** — dan salahnya tidak terlihat, karena ia tetap mengembalikan sebuah jalur.

Dan satu batas yang penting: **Dijkstra tidak bekerja untuk bobot negatif.** Untuk itu dibutuhkan Bellman-Ford.`,

  praktik: {
    tujuan: `Kamu bisa menulis Dijkstra dengan priority queue, membuktikan BFS salah untuk graf berbobot, dan tahu batasnya.`,
    alat: [
      'Python 3 dengan `heapq`',
      'Data graf nyata atau buatan'
    ],
    langkah: [
      { judul: 'Buktikan BFS salah untuk graf berbobot',
        isi: `Buat graf kecil di mana jalur dengan **dua sisi** total bobotnya lebih kecil daripada jalur dengan **satu sisi**.

Jalankan BFS. Ia memilih yang satu sisi — dan itu **lebih mahal**.

Melihat kegagalannya lebih dulu membuat kebutuhan akan Dijkstra jelas.` },
      { judul: 'Tulis Dijkstra dengan heap',
        isi: `Simpan \`(jarak, simpul)\` di heap, ambil yang jaraknya terkecil, lalu perbarui tetangganya.

Tanpa heap, Dijkstra butuh \`O(V²)\`. Dengan heap, \`O((V + E) log V)\`.

Ini contoh paling jelas bahwa memilih struktur data yang tepat mengubah kelas kompleksitas algoritmanya.` },
      { judul: 'Simpan jalurnya, bukan cuma jaraknya',
        isi: `Simpan **dari simpul mana** tiap simpul dicapai, lalu telusuri balik dari tujuan ke asal.

Tanpa ini, kamu tahu berapa biayanya tetapi tidak tahu lewat mana — dan biasanya justru itu yang dibutuhkan.` },
      { judul: 'Tandai yang sudah selesai',
        isi: `Simpul yang sudah diambil dari heap **tidak perlu diproses lagi**.

Tanpa penandaan, simpul yang sama bisa masuk heap beberapa kali dan diproses berulang.

Periksa dengan mencetak berapa kali tiap simpul diproses — seharusnya tepat sekali.` },
      { judul: 'Buktikan gagal pada bobot negatif',
        isi: `Buat graf dengan satu sisi berbobot negatif, lalu jalankan Dijkstra.

Hasilnya **salah**, karena Dijkstra mengandaikan menambah sisi selalu memperbesar jarak — dan itu tidak berlaku lagi.

Untuk kasus ini dibutuhkan **Bellman-Ford**, yang lebih lambat tetapi menangani bobot negatif.` },
      { judul: 'Terapkan pada data nyata',
        isi: `Buat graf dari jarak antar gedung di kampusmu, atau antar kota, lalu cari rute terpendek.

Bandingkan hasilnya dengan yang kamu tahu benar. Data nyata membuat kesalahan lebih mudah terlihat daripada data buatan.` },
      { judul: 'Bandingkan dengan A-star',
        isi: `A-star menambahkan **perkiraan sisa jarak** ke tujuan, sehingga tidak perlu menjelajah ke segala arah.

Untuk peta, perkiraan yang lazim adalah jarak garis lurus.

Bandingkan berapa simpul yang diperiksa keduanya. A-star biasanya jauh lebih sedikit — dan itu alasan aplikasi peta memakainya.` }
    ],
    cek: [
      'BFS terbukti memberi jalur yang lebih mahal pada graf berbobot buatanmu',
      'Dijkstra-mu mengembalikan jalurnya, bukan cuma total biayanya',
      'Tiap simpul diproses tepat sekali'
    ]
  },

  konsep: `
Di topik **Graph** kamu sudah melihat bahwa **BFS menemukan jalur terpendek**. Tapi ada satu syarat tersembunyi yang belum ditekankan di sana: **itu hanya berlaku kalau semua edge dianggap berbiaya sama.**

Pada peta jalan sungguhan, syarat itu tidak terpenuhi. Jalan A–B mungkin 2 km sementara A–C 50 km. Graph seperti ini disebut **berbobot** (*weighted*), dan bobotnya bisa berarti jarak, waktu tempuh, biaya, atau apa pun.

**Kenapa BFS gagal pada graph berbobot?** Karena BFS menghitung **jumlah langkah**, bukan **total bobot**. Ia akan memilih jalur satu langkah berbobot 100 daripada jalur dua langkah yang totalnya 5 — padahal yang kedua jelas lebih pendek.

**Algoritma Dijkstra** menyelesaikannya dengan pendekatan **greedy** (rakus): *"dari semua simpul yang belum dikunjungi, ambil yang jaraknya paling dekat dari titik awal."*

Langkahnya berulang seperti ini:

- Beri jarak awal **0** untuk titik mula, dan **tak hingga** untuk semua simpul lain
- Ambil simpul **belum dikunjungi yang jaraknya terkecil**
- Untuk tiap tetangganya, periksa: *"kalau lewat simpul ini, apakah jalurnya jadi lebih pendek?"* Kalau ya, perbarui jaraknya. Langkah ini disebut **relaksasi**
- Tandai simpul itu sudah selesai, lalu ulangi

Yang membuatnya bekerja adalah satu jaminan: **saat sebuah simpul diambil sebagai yang terdekat, jaraknya sudah pasti final.** Tidak mungkin ada jalur yang lebih pendek lewat simpul lain, karena simpul lain mana pun jaraknya sudah lebih jauh.

Justru dari jaminan itulah muncul **batasannya yang paling penting: Dijkstra tidak boleh dipakai kalau ada bobot negatif.** Dengan bobot negatif, jalur yang tadinya jauh bisa tiba-tiba menjadi lebih pendek — dan jaminan tadi runtuh. Untuk kasus itu, algoritma yang tepat adalah **Bellman-Ford**.

Untuk memilih simpul terdekat secara efisien, Dijkstra memakai **priority queue** — dan di sinilah materi **Heap** yang sudah kamu pelajari terpakai secara nyata.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa BFS GAGAL pada graph berbobot?\n#\n#   A --(100)-- C\n#   |           |\n#  (2)         (3)\n#   |           |\n#   B ----------+\n#\n# BFS  : A->C = 1 langkah  -> dipilih (total 100)\n# benar: A->B->C = 2 langkah -> total 5',
      penjelasan: `
Gambar ini menjelaskan seluruh alasan Dijkstra perlu ada, dan bagus untuk kamu tulis di papan tulis.

**BFS menghitung jumlah langkah, bukan total bobot.** Karena \`A → C\` cuma satu langkah, BFS langsung menganggapnya jalur terpendek dan berhenti di situ. Padahal biayanya 100, sementara jalur \`A → B → C\` yang dua langkah cuma berbiaya \`2 + 3 = 5\`.

Yang berbahaya, **BFS tidak error sama sekali** — ia memberi jawaban yang terasa masuk akal tapi salah.

Kapan BFS masih boleh dipakai? Kalau **semua bobotnya sama**. Dalam keadaan itu, jumlah langkah dan total bobot berbanding lurus, sehingga jalur dengan langkah paling sedikit memang yang paling murah. Graph tanpa bobot sebenarnya adalah kasus khusus di mana semua bobotnya bernilai 1.

Perbedaan intinya bisa diringkas begini:

- **BFS** memakai **queue biasa** — mengambil yang **paling dulu masuk**
- **Dijkstra** memakai **priority queue** — mengambil yang **jaraknya paling kecil**

Jadi Dijkstra sebenarnya adalah BFS dengan queue-nya diganti priority queue. Menunjukkan kesejajaran ini biasanya membuat Dijkstra langsung terasa masuk akal, bukan seperti algoritma yang benar-benar baru.
`
    },
    {
      bahasa: 'python',
      kode: 'jarak = {v: float("inf") for v in graph}   # semua tak hingga\njarak[mulai] = 0                           # kecuali titik mula\n\n# Kenapa tak hingga? Supaya perbandingan pertama PASTI menang:\n#   jarak_baru < inf  -> selalu benar',
      penjelasan: `
Pemberian nilai awal ini bukan sekadar formalitas — ia punya alasan yang tepat.

**Tak hingga berarti "belum diketahui ada jalur ke sana".** Dengan begitu, perbandingan pertama untuk simpul mana pun **pasti menang**, sehingga jarak sungguhan langsung tercatat tanpa perlu penanganan khusus.

Kalau nilai awalnya diisi 0, semua simpul akan terlihat sudah berjarak nol dan tidak akan pernah diperbarui. Kalau diisi angka besar tapi terbatas, ada risiko bobot yang lebih besar dari itu tidak tertangani.

Cara menuliskannya berbeda-beda antar bahasa:

- **Python** → \`float("inf")\`
- **JavaScript** → \`Infinity\`
- **C++** → \`INT_MAX\` atau \`1e9\` (hati-hati penjumlahannya bisa overflow)
- **Java** → \`Integer.MAX_VALUE\`
- **C#** → \`int.MaxValue\`

Untuk bahasa yang memakai angka terbatas, **hati-hati saat menjumlahkan**: \`INT_MAX + bobot\` bisa meluap menjadi negatif, dan tiba-tiba jalur yang tidak ada malah terlihat sangat pendek. Karena itu banyak yang memakai \`1e9\` — cukup besar untuk berperan sebagai tak hingga, tapi masih aman dijumlahkan.

Simpul yang **tetap bernilai tak hingga di akhir** berarti **tidak terhubung** sama sekali dari titik mula.
`
    },
    {
      bahasa: 'python',
      kode: '# RELAKSASI: inti Dijkstra\nfor tetangga, bobot in graph[v]:\n    lewat_v = jarak[v] + bobot\n    if lewat_v < jarak[tetangga]:      # ketemu jalur LEBIH PENDEK?\n        jarak[tetangga] = lewat_v      # perbarui\n        asal[tetangga] = v             # catat asalnya untuk menelusuri jalur',
      penjelasan: `
Langkah ini disebut **relaksasi**, dan inilah jantung Dijkstra. Nama itu berasal dari gagasan "mengendurkan" perkiraan jarak yang tadinya terlalu besar.

Pertanyaan yang diajukan tiap kali sederhana: *"kalau saya ke tetangga ini **lewat v**, apakah totalnya lebih pendek daripada jalur terbaik yang sudah saya ketahui?"*

Kalau ya, perkiraan jaraknya diperbarui. Kalau tidak, jalur lama dipertahankan.

Perhatikan baris \`asal[tetangga] = v\`. Baris ini **tidak memengaruhi perhitungan jarak sama sekali**, tapi menyimpan **dari mana** jalur terbaik itu datang. Tanpa itu, kamu cuma tahu jaraknya berapa — tapi tidak tahu lewat mana.

Untuk merekonstruksi jalurnya nanti, tinggal **runut balik** dari tujuan: siapa asalnya, lalu siapa asal dari asalnya, dan seterusnya sampai kembali ke titik mula. Hasilnya dibalik, dan jalurnya lengkap.

Pola yang sama persis dipakai pada BFS saat mencari jalur terpendek pada graph tanpa bobot — di sana pun ada penyimpanan \`asal\`.
`
    },
    {
      bahasa: 'python',
      kode: 'import heapq\npq = [(0, mulai)]                       # (jarak, simpul)\n\nwhile pq:\n    d, v = heapq.heappop(pq)            # ambil yang jaraknya TERKECIL\n    if d > jarak[v]: continue           # catatan usang, lewati\n    ...',
      penjelasan: `
Di sinilah materi **Heap** terpakai secara nyata.

Priority queue menjawab pertanyaan *"simpul mana yang jaraknya paling kecil?"* dalam **O(log n)**. Tanpa itu, kamu harus memeriksa semua simpul setiap langkah, yang berbiaya O(V) — dan total algoritmanya melambat dari O((V+E) log V) menjadi O(V²).

Perhatikan urutan di dalam pasangan: **jarak ditulis lebih dulu**, baru simpulnya. Ini disengaja, karena heap membandingkan mulai dari elemen pertama — sehingga urutannya otomatis mengikuti jarak.

Baris **\`if d > jarak[v]: continue\`** sering membingungkan, padahal penting. Penyebabnya: sebuah simpul bisa **masuk antrean lebih dari sekali** dengan jarak berbeda, karena tiap kali jaraknya diperbarui kita memasukkannya lagi. Catatan lama yang jaraknya lebih besar jadi **usang**.

Alih-alih repot menghapus catatan lama dari heap — yang mahal — kita cukup **mengabaikannya saat keluar**. Kalau jarak yang tercatat di antrean lebih besar daripada jarak terbaik yang sudah diketahui, berarti catatan itu sudah kedaluwarsa dan boleh dilewati.

Cara ini disebut *lazy deletion*, dan jauh lebih sederhana daripada mencari lalu memperbarui posisi di dalam heap.
`
    },
    {
      bahasa: 'python',
      kode: '# BATASAN: bobot NEGATIF merusak Dijkstra\n#   A --(1)--> B\n#   A --(4)--> C\n#   B --(-5)-> C\n#\n# Dijkstra menetapkan C = 4 lalu menganggapnya FINAL,\n# padahal lewat B totalnya 1 + (-5) = -4',
      penjelasan: `
Ini batasan terpenting Dijkstra, dan alasannya berakar langsung pada cara kerjanya.

Dijkstra bertumpu pada satu anggapan: **begitu sebuah simpul diambil sebagai yang terdekat, jaraknya sudah final.** Anggapan itu masuk akal selama semua bobot **tidak negatif** — karena menambah langkah berarti menambah jarak, sehingga jalur lewat simpul yang lebih jauh mustahil lebih pendek.

Bobot negatif meruntuhkan anggapan tersebut. Menambah langkah bisa **mengurangi** total jarak, sehingga simpul yang sudah dianggap selesai ternyata masih bisa diperpendek.

Runut contoh di atas: Dijkstra mengambil B (jarak 1), lalu C (jarak 4) dan menandainya final. Tapi lewat B, jarak ke C sebenarnya \`1 + (-5) = -4\` — jauh lebih pendek. Jawaban Dijkstra salah, **tanpa error apa pun**.

Untuk graph dengan bobot negatif, gunakan **Bellman-Ford**. Ia lebih lambat — O(V×E) dibanding O((V+E) log V) — tapi menangani bobot negatif dengan benar, dan bahkan bisa **mendeteksi siklus negatif** yang membuat jalur terpendek tidak terdefinisi.

Di mana bobot negatif muncul di dunia nyata? Pada penukaran mata uang, atau jaringan yang sebagian langkahnya justru memberi keuntungan. Untuk peta jalan biasa, jaraknya selalu positif sehingga Dijkstra aman.
`
    }
  ],

  kode: {
    cpp: String.raw`#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

const int TAKHINGGA = 1e9;      // dipakai sebagai "tak hingga" yang aman dijumlahkan

/* Graph berbobot: adj[v] berisi pasangan (tetangga, bobot) */
vector<vector<pair<int,int>>> adj;

void tambahEdge(int a, int b, int bobot) {
    adj[a].push_back({b, bobot});
    adj[b].push_back({a, bobot});          // dua arah untuk undirected
}

vector<int> dijkstra(int mulai, int V, vector<int>& asal) {
    vector<int> jarak(V, TAKHINGGA);
    asal.assign(V, -1);
    jarak[mulai] = 0;

    // priority_queue bawaannya MAX-heap, jadi dibalik dengan greater
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, mulai});                   // (jarak, simpul)

    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();  // ambil jarak TERKECIL
        if (d > jarak[v]) continue;        // catatan usang, lewati

        for (auto [tetangga, bobot] : adj[v]) {
            int lewatV = jarak[v] + bobot;
            if (lewatV < jarak[tetangga]) {          // RELAKSASI
                jarak[tetangga] = lewatV;
                asal[tetangga] = v;                  // catat asalnya
                pq.push({lewatV, tetangga});
            }
        }
    }
    return jarak;
}

vector<int> jalurKe(int tujuan, vector<int>& asal) {
    vector<int> jalur;
    for (int v = tujuan; v != -1; v = asal[v]) jalur.push_back(v);
    reverse(jalur.begin(), jalur.end());
    return jalur;
}

int main() {
    int V = 6;
    adj.assign(V, {});

    //      (4)      (8)
    //   0------1------2
    //   |    / |      |
    //  (2) (1)(5)    (2)
    //   |  /   |      |
    //   3------4------5
    //      (3)    (6)
    tambahEdge(0, 1, 4);
    tambahEdge(0, 3, 2);
    tambahEdge(1, 2, 8);
    tambahEdge(1, 3, 1);
    tambahEdge(1, 4, 5);
    tambahEdge(2, 5, 2);
    tambahEdge(3, 4, 3);
    tambahEdge(4, 5, 6);

    vector<int> asal;
    vector<int> jarak = dijkstra(0, V, asal);

    cout << "--- JARAK TERPENDEK DARI 0 ---" << endl;
    for (int i = 0; i < V; i++) {
        cout << "  ke " << i << " : ";
        if (jarak[i] == TAKHINGGA) { cout << "tidak terhubung" << endl; continue; }
        cout << jarak[i] << "\tjalur: ";
        for (int v : jalurKe(i, asal)) cout << v << " ";
        cout << endl;
    }

    cout << "\nPerhatikan ke simpul 4:" << endl;
    cout << "  jalur langsung 0->1->4 = 4 + 5 = 9" << endl;
    cout << "  jalur terpilih 0->3->4 = 2 + 3 = 5  <- lebih pendek" << endl;
    cout << "  BFS akan memilih yang langkahnya lebih sedikit, dan itu SALAH." << endl;

    return 0;
}`,

    csharp: String.raw`using System;
using System.Collections.Generic;

class Program {
    const int TAKHINGGA = 1000000000;
    static List<List<(int tetangga, int bobot)>> adj;

    static void TambahEdge(int a, int b, int bobot) {
        adj[a].Add((b, bobot));
        adj[b].Add((a, bobot));                   // dua arah untuk undirected
    }

    static int[] Dijkstra(int mulai, int V, out int[] asal) {
        int[] jarak = new int[V];
        asal = new int[V];
        for (int i = 0; i < V; i++) { jarak[i] = TAKHINGGA; asal[i] = -1; }
        jarak[mulai] = 0;

        // PriorityQueue bawaannya MIN-heap — persis yang dibutuhkan
        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(mulai, 0);                     // (simpul, prioritas=jarak)

        while (pq.Count > 0) {
            pq.TryDequeue(out int v, out int d);  // ambil jarak TERKECIL
            if (d > jarak[v]) continue;           // catatan usang, lewati

            foreach (var (tetangga, bobot) in adj[v]) {
                int lewatV = jarak[v] + bobot;
                if (lewatV < jarak[tetangga]) {   // RELAKSASI
                    jarak[tetangga] = lewatV;
                    asal[tetangga] = v;           // catat asalnya
                    pq.Enqueue(tetangga, lewatV);
                }
            }
        }
        return jarak;
    }

    static List<int> JalurKe(int tujuan, int[] asal) {
        var jalur = new List<int>();
        for (int v = tujuan; v != -1; v = asal[v]) jalur.Add(v);
        jalur.Reverse();
        return jalur;
    }

    static void Main() {
        int V = 6;
        adj = new List<List<(int, int)>>();
        for (int i = 0; i < V; i++) adj.Add(new List<(int, int)>());

        TambahEdge(0, 1, 4); TambahEdge(0, 3, 2);
        TambahEdge(1, 2, 8); TambahEdge(1, 3, 1); TambahEdge(1, 4, 5);
        TambahEdge(2, 5, 2); TambahEdge(3, 4, 3); TambahEdge(4, 5, 6);

        int[] jarak = Dijkstra(0, V, out int[] asal);

        Console.WriteLine("--- JARAK TERPENDEK DARI 0 ---");
        for (int i = 0; i < V; i++) {
            if (jarak[i] == TAKHINGGA) {
                Console.WriteLine($"  ke {i} : tidak terhubung");
                continue;
            }
            Console.WriteLine($"  ke {i} : {jarak[i]}\tjalur: {string.Join(" ", JalurKe(i, asal))}");
        }

        Console.WriteLine("\nPerhatikan ke simpul 4:");
        Console.WriteLine("  jalur langsung 0->1->4 = 4 + 5 = 9");
        Console.WriteLine("  jalur terpilih 0->3->4 = 2 + 3 = 5  <- lebih pendek");
        Console.WriteLine("  BFS akan memilih yang langkahnya lebih sedikit, dan itu SALAH.");
    }
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static final int TAKHINGGA = 1_000_000_000;
    static List<List<int[]>> adj = new ArrayList<>();   // {tetangga, bobot}

    static void tambahEdge(int a, int b, int bobot) {
        adj.get(a).add(new int[] { b, bobot });
        adj.get(b).add(new int[] { a, bobot });         // dua arah
    }

    static int[] dijkstra(int mulai, int V, int[] asal) {
        int[] jarak = new int[V];
        Arrays.fill(jarak, TAKHINGGA);
        Arrays.fill(asal, -1);
        jarak[mulai] = 0;

        // PriorityQueue diurutkan menurut jarak (elemen ke-0)
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[] { 0, mulai });               // {jarak, simpul}

        while (!pq.isEmpty()) {
            int[] atas = pq.poll();                     // ambil jarak TERKECIL
            int d = atas[0], v = atas[1];
            if (d > jarak[v]) continue;                 // catatan usang, lewati

            for (int[] e : adj.get(v)) {
                int tetangga = e[0], bobot = e[1];
                int lewatV = jarak[v] + bobot;
                if (lewatV < jarak[tetangga]) {         // RELAKSASI
                    jarak[tetangga] = lewatV;
                    asal[tetangga] = v;                 // catat asalnya
                    pq.offer(new int[] { lewatV, tetangga });
                }
            }
        }
        return jarak;
    }

    static List<Integer> jalurKe(int tujuan, int[] asal) {
        List<Integer> jalur = new ArrayList<>();
        for (int v = tujuan; v != -1; v = asal[v]) jalur.add(v);
        Collections.reverse(jalur);
        return jalur;
    }

    public static void main(String[] args) {
        int V = 6;
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());

        tambahEdge(0, 1, 4); tambahEdge(0, 3, 2);
        tambahEdge(1, 2, 8); tambahEdge(1, 3, 1); tambahEdge(1, 4, 5);
        tambahEdge(2, 5, 2); tambahEdge(3, 4, 3); tambahEdge(4, 5, 6);

        int[] asal = new int[V];
        int[] jarak = dijkstra(0, V, asal);

        System.out.println("--- JARAK TERPENDEK DARI 0 ---");
        for (int i = 0; i < V; i++) {
            if (jarak[i] == TAKHINGGA) {
                System.out.println("  ke " + i + " : tidak terhubung");
                continue;
            }
            System.out.println("  ke " + i + " : " + jarak[i] + "\tjalur: " + jalurKe(i, asal));
        }

        System.out.println("\nPerhatikan ke simpul 4:");
        System.out.println("  jalur langsung 0->1->4 = 4 + 5 = 9");
        System.out.println("  jalur terpilih 0->3->4 = 2 + 3 = 5  <- lebih pendek");
        System.out.println("  BFS akan memilih yang langkahnya lebih sedikit, dan itu SALAH.");
    }
}`,

    python: String.raw`import heapq
from collections import deque


def dijkstra(graph, mulai):
    """graph[v] = list pasangan (tetangga, bobot)"""
    jarak = {v: float("inf") for v in graph}    # semua tak hingga
    jarak[mulai] = 0                            # kecuali titik mula
    asal = {v: None for v in graph}

    pq = [(0, mulai)]                           # (jarak, simpul)

    while pq:
        d, v = heapq.heappop(pq)                # ambil jarak TERKECIL
        if d > jarak[v]:                        # catatan usang, lewati
            continue

        for tetangga, bobot in graph[v]:
            lewat_v = jarak[v] + bobot
            if lewat_v < jarak[tetangga]:       # RELAKSASI
                jarak[tetangga] = lewat_v
                asal[tetangga] = v              # catat asalnya
                heapq.heappush(pq, (lewat_v, tetangga))

    return jarak, asal


def jalur_ke(tujuan, asal):
    """Runut balik dari tujuan sampai titik mula."""
    jalur = []
    v = tujuan
    while v is not None:
        jalur.append(v)
        v = asal[v]
    return jalur[::-1]


def bfs_langkah(graph, mulai):
    """BFS biasa: menghitung LANGKAH, bukan bobot."""
    langkah = {mulai: 0}
    antrean = deque([mulai])
    while antrean:
        v = antrean.popleft()
        for tetangga, _ in graph[v]:            # bobotnya DIABAIKAN
            if tetangga not in langkah:
                langkah[tetangga] = langkah[v] + 1
                antrean.append(tetangga)
    return langkah


#      (4)      (8)
#   0------1------2
#   |    / |      |
#  (2) (1)(5)    (2)
#   |  /   |      |
#   3------4------5
#      (3)    (6)
graph = {
    0: [(1, 4), (3, 2)],
    1: [(0, 4), (2, 8), (3, 1), (4, 5)],
    2: [(1, 8), (5, 2)],
    3: [(0, 2), (1, 1), (4, 3)],
    4: [(1, 5), (3, 3), (5, 6)],
    5: [(2, 2), (4, 6)],
}

jarak, asal = dijkstra(graph, 0)

print("--- JARAK TERPENDEK DARI 0 ---")
for v in sorted(graph):
    d = jarak[v]
    if d == float("inf"):
        print(f"  ke {v} : tidak terhubung")
    else:
        print(f"  ke {v} : {d:<3} jalur: {' -> '.join(map(str, jalur_ke(v, asal)))}")

# ---------- MEMBUKTIKAN BFS SALAH PADA GRAPH BERBOBOT ----------
langkah = bfs_langkah(graph, 0)
print("\n--- BFS vs DIJKSTRA ---")
print(f"  {'simpul':<8}{'BFS (langkah)':<16}{'Dijkstra (bobot)'}")
for v in sorted(graph):
    print(f"  {v:<8}{langkah[v]:<16}{jarak[v]}")

print("\nPerhatikan simpul 4:")
print("  BFS      : 1 langkah lewat 0->1->4?  tidak, 0->1->4 itu 2 langkah")
print("  jalur langsung 0->1->4 = 4 + 5 = 9")
print("  jalur terpilih 0->3->4 = 2 + 3 = 5  <- lebih pendek")
print("  -> BFS memilih berdasarkan LANGKAH, dan itu salah di graph berbobot")

# ---------- BATASAN: BOBOT NEGATIF ----------
print("\n--- KENAPA BOBOT NEGATIF MERUSAK DIJKSTRA ---")
graph_negatif = {
    "A": [("B", 1), ("C", 4)],
    "B": [("C", -5)],
    "C": [],
}
jarak_n, _ = dijkstra(graph_negatif, "A")
print(f"  hasil Dijkstra  : A->C = {jarak_n['C']}")
print("  jawaban benar   : A->B->C = 1 + (-5) = -4")
print("  -> Dijkstra menetapkan C sebagai final terlalu cepat")
print("  -> untuk bobot negatif, pakai Bellman-Ford")`,

    js: String.raw`// JavaScript tidak punya priority queue bawaan.
// Untuk contoh ini dipakai heap sederhana.
class MinHeap {
    constructor() { this.isi = []; }

    push(item) {                          // item = [jarak, simpul]
        this.isi.push(item);
        let i = this.isi.length - 1;
        while (i > 0) {
            const induk = Math.floor((i - 1) / 2);
            if (this.isi[induk][0] <= this.isi[i][0]) break;
            [this.isi[induk], this.isi[i]] = [this.isi[i], this.isi[induk]];
            i = induk;
        }
    }

    pop() {
        const atas = this.isi[0];
        const akhir = this.isi.pop();
        if (this.isi.length > 0) {
            this.isi[0] = akhir;
            let i = 0;
            for (;;) {
                const kr = 2 * i + 1, kn = 2 * i + 2;
                let kecil = i;
                if (kr < this.isi.length && this.isi[kr][0] < this.isi[kecil][0]) kecil = kr;
                if (kn < this.isi.length && this.isi[kn][0] < this.isi[kecil][0]) kecil = kn;
                if (kecil === i) break;
                [this.isi[i], this.isi[kecil]] = [this.isi[kecil], this.isi[i]];
                i = kecil;
            }
        }
        return atas;
    }

    get kosong() { return this.isi.length === 0; }
}

function dijkstra(graph, mulai) {
    const jarak = new Map(), asal = new Map();
    for (const v of graph.keys()) {
        jarak.set(v, Infinity);           // semua tak hingga
        asal.set(v, null);
    }
    jarak.set(mulai, 0);                  // kecuali titik mula

    const pq = new MinHeap();
    pq.push([0, mulai]);                  // [jarak, simpul]

    while (!pq.kosong) {
        const [d, v] = pq.pop();          // ambil jarak TERKECIL
        if (d > jarak.get(v)) continue;   // catatan usang, lewati

        for (const [tetangga, bobot] of graph.get(v)) {
            const lewatV = jarak.get(v) + bobot;
            if (lewatV < jarak.get(tetangga)) {      // RELAKSASI
                jarak.set(tetangga, lewatV);
                asal.set(tetangga, v);               // catat asalnya
                pq.push([lewatV, tetangga]);
            }
        }
    }
    return { jarak: jarak, asal: asal };
}

function jalurKe(tujuan, asal) {
    const jalur = [];
    let v = tujuan;
    while (v !== null && v !== undefined) {
        jalur.push(v);
        v = asal.get(v);
    }
    return jalur.reverse();
}

//      (4)      (8)
//   0------1------2
//   |    / |      |
//  (2) (1)(5)    (2)
//   |  /   |      |
//   3------4------5
//      (3)    (6)
const graph = new Map([
    [0, [[1, 4], [3, 2]]],
    [1, [[0, 4], [2, 8], [3, 1], [4, 5]]],
    [2, [[1, 8], [5, 2]]],
    [3, [[0, 2], [1, 1], [4, 3]]],
    [4, [[1, 5], [3, 3], [5, 6]]],
    [5, [[2, 2], [4, 6]]]
]);

const hasil = dijkstra(graph, 0);

console.log("--- JARAK TERPENDEK DARI 0 ---");
for (const v of [...graph.keys()].sort()) {
    const d = hasil.jarak.get(v);
    if (d === Infinity) {
        console.log("  ke " + v + " : tidak terhubung");
    } else {
        console.log("  ke " + v + " : " + String(d).padEnd(3) +
                    " jalur: " + jalurKe(v, hasil.asal).join(" -> "));
    }
}

console.log("\nPerhatikan simpul 4:");
console.log("  jalur langsung 0->1->4 = 4 + 5 = 9");
console.log("  jalur terpilih 0->3->4 = 2 + 3 = 5  <- lebih pendek");
console.log("  BFS memilih berdasarkan LANGKAH, dan itu salah di graph berbobot");

// ---------- BATASAN: BOBOT NEGATIF ----------
console.log("\n--- KENAPA BOBOT NEGATIF MERUSAK DIJKSTRA ---");
const negatif = new Map([
    ["A", [["B", 1], ["C", 4]]],
    ["B", [["C", -5]]],
    ["C", []]
]);
const hn = dijkstra(negatif, "A");
console.log("  hasil Dijkstra : A->C = " + hn.jarak.get("C"));
console.log("  jawaban benar  : A->B->C = 1 + (-5) = -4");
console.log("  -> untuk bobot negatif, pakai Bellman-Ford");`
  },

  output: `--- JARAK TERPENDEK DARI 0 ---
  ke 0 : 0   jalur: 0
  ke 1 : 3   jalur: 0 -> 3 -> 1
  ke 2 : 11  jalur: 0 -> 3 -> 1 -> 2
  ke 3 : 2   jalur: 0 -> 3
  ke 4 : 5   jalur: 0 -> 3 -> 4
  ke 5 : 11  jalur: 0 -> 3 -> 4 -> 5

--- BFS vs DIJKSTRA ---
  simpul  BFS (langkah)   Dijkstra (bobot)
  0       0               0
  1       1               3
  2       2               11
  3       1               2
  4       2               5
  5       3               11

Perhatikan simpul 1:
  BFS      : 1 langkah lewat 0->1, biayanya 4
  Dijkstra : 2 langkah lewat 0->3->1, biayanya 2 + 1 = 3
  -> jalur dengan LANGKAH LEBIH BANYAK ternyata lebih murah`,

  kompleksitas: {
    tabel: [
      { operasi: 'Dijkstra + priority queue', waktu: 'O((V+E) log V)', memori: 'O(V)' },
      { operasi: 'Dijkstra tanpa priority queue', waktu: 'O(V²)', memori: 'O(V)' },
      { operasi: 'BFS (graph tanpa bobot)', waktu: 'O(V+E)', memori: 'O(V)' },
      { operasi: 'Bellman-Ford (boleh bobot negatif)', waktu: 'O(V×E)', memori: 'O(V)' },
      { operasi: 'Floyd-Warshall (semua pasangan)', waktu: 'O(V³)', memori: 'O(V²)' },
      { operasi: 'Merekonstruksi satu jalur', waktu: 'O(V)', memori: 'O(V)' }
    ],
    intuisi: `
**Dari mana O((V+E) log V) berasal?** Tiap simpul masuk dan keluar priority queue, dan tiap operasi heap berbiaya O(log V). Selain itu, tiap edge diperiksa sekali untuk relaksasi, dan relaksasi yang berhasil menambahkan satu catatan ke heap. Digabungkan, hasilnya O((V+E) log V).

**Kapan versi tanpa priority queue justru lebih baik?** Kalau graph-nya **padat**, yaitu jumlah edge mendekati V². Dalam keadaan itu O(V²) sudah tak terhindarkan, dan memindai array biasa punya konstanta lebih kecil daripada mengurus heap. Untuk graph **jarang** — yang jauh lebih umum — versi priority queue menang telak.

**Kenapa Bellman-Ford jauh lebih lambat?** Karena ia tidak bisa memakai strategi greedy. Tanpa jaminan "yang terdekat sudah final", ia harus **merelaksasi semua edge sebanyak V−1 kali** untuk memastikan tidak ada yang terlewat. Harga itu dibayar demi kemampuan menangani bobot negatif.

**Kapan memakai yang mana?**

- Semua bobot **tidak negatif**, cari dari **satu titik** → **Dijkstra**
- Ada bobot **negatif** → **Bellman-Ford**
- Butuh jarak antara **semua pasangan** titik → **Floyd-Warshall**
- Semua bobot **sama** → cukup **BFS**, yang O(V+E) dan paling cepat

**Soal memori:** semuanya O(V) kecuali Floyd-Warshall yang menyimpan tabel V×V. Untuk 10.000 simpul, itu berarti 100 juta sel — jadi Floyd-Warshall hanya cocok untuk graph kecil.
`
  },

  kesalahanUmum: [
    {
      salah: 'Memakai BFS untuk mencari jalur terpendek pada graph **berbobot**.',
      kenapa: 'BFS menghitung **jumlah langkah**, bukan total bobot. Ia bisa memilih jalur satu langkah berbiaya 100 daripada jalur dua langkah berbiaya 5. Program tidak error sama sekali — jawabannya saja yang salah, dan terlihat masuk akal.',
      benar: 'Gunakan **Dijkstra** untuk graph berbobot. BFS hanya sah kalau **semua bobotnya sama**, karena di situ jumlah langkah berbanding lurus dengan total bobot.'
    },
    {
      salah: 'Memakai Dijkstra pada graph yang punya **bobot negatif**.',
      kenapa: 'Dijkstra bertumpu pada anggapan bahwa simpul terdekat yang diambil sudah final. Bobot negatif meruntuhkan anggapan itu, karena menambah langkah bisa **mengurangi** total jarak. Hasilnya salah tanpa peringatan apa pun.',
      benar: 'Gunakan **Bellman-Ford** untuk bobot negatif. Ia lebih lambat, O(V×E), tapi benar — dan bisa mendeteksi siklus negatif.'
    },
    {
      salah: 'Lupa memeriksa catatan usang: tidak menulis `if (d > jarak[v]) continue;`',
      kenapa: 'Sebuah simpul bisa masuk antrean beberapa kali dengan jarak berbeda, karena tiap kali jaraknya diperbarui ia dimasukkan lagi. Tanpa pemeriksaan ini, catatan lama yang sudah kedaluwarsa ikut diproses — memboroskan waktu, dan pada implementasi tertentu bisa menghasilkan jarak yang salah.',
      benar: 'Selalu tambahkan `if (d > jarak[v]) continue;` tepat setelah mengambil dari antrean. Cara ini disebut *lazy deletion*, dan jauh lebih sederhana daripada memperbarui posisi di dalam heap.'
    },
    {
      salah: 'Memberi nilai awal jarak dengan 0, bukan tak hingga.',
      kenapa: 'Semua simpul jadi terlihat sudah berjarak nol, sehingga syarat `lewatV < jarak[tetangga]` tidak pernah terpenuhi. Akibatnya tidak ada satu pun relaksasi yang terjadi, dan hasilnya nol untuk semua simpul.',
      benar: 'Isi dengan tak hingga: `float("inf")` di Python, `Infinity` di JavaScript, atau `1e9` di C++/Java/C#. Hanya titik mula yang diberi 0.'
    },
    {
      salah: 'Memakai `INT_MAX` sebagai tak hingga lalu menjumlahkannya dengan bobot.',
      kenapa: '`INT_MAX + bobot` **meluap** menjadi bilangan negatif. Akibatnya jalur yang sebenarnya tidak ada malah terlihat sangat pendek, dan Dijkstra memilihnya. Bug ini sangat menyesatkan karena hasilnya terlihat seperti jalur yang sah.',
      benar: 'Pakai nilai yang aman dijumlahkan seperti `1e9`, atau periksa dulu `if (jarak[v] != TAKHINGGA)` sebelum menjumlahkan.'
    },
    {
      salah: 'Hanya menyimpan jaraknya, lupa mencatat asal tiap simpul.',
      kenapa: 'Kamu jadi tahu jarak terpendeknya berapa, tapi **tidak tahu lewat mana**. Padahal dalam banyak kasus — misalnya aplikasi peta — jalurnya justru yang paling dibutuhkan, bukan sekadar angka jaraknya.',
      benar: 'Tambahkan `asal[tetangga] = v;` setiap kali relaksasi berhasil. Untuk merekonstruksi jalurnya, runut balik dari tujuan lalu balikkan urutannya.'
    }
  ],

  analogi: `
Analogi terbaiknya adalah **aplikasi peta di ponsel**, dan semua mahasiswa sudah memakainya setiap hari.

Mulai dengan pertanyaan pancingan: *"kalau aplikasi peta cuma menghitung jumlah persimpangan, apakah rutenya akan masuk akal?"* Jelas tidak — rute lewat satu jalan tol sepanjang 100 km akan dianggap lebih baik daripada tiga jalan pendek yang totalnya 5 km. **Itulah persis kesalahan yang dilakukan BFS pada graph berbobot.**

Untuk **cara kerja Dijkstra**, pakai analogi **noda tinta yang menyebar di kertas**. Tetesan dimulai di titik awal dan menyebar ke segala arah dengan kecepatan yang sama. Jalan yang lebih panjang butuh waktu lebih lama untuk dilalui. **Titik mana pun yang baru saja tersentuh tinta, berarti jarak terpendeknya sudah ditemukan** — karena kalau ada jalur yang lebih pendek, tintanya pasti sudah sampai lebih dulu.

Analogi ini sekaligus menjelaskan **kenapa greedy-nya sah**: tinta tidak mungkin sampai ke suatu titik lewat jalur yang lebih panjang lebih dulu.

Untuk **relaksasi**, pakai kalimat pemandu yang sederhana: *"aku tadinya mengira ke rumah Citra butuh 20 menit. Tapi ternyata lewat rumah Budi cuma 12 menit. Berarti catatanku perlu diperbarui."* Itulah yang dilakukan satu baris relaksasi.

Untuk **kenapa bobot negatif merusak**, analoginya paling mengena: *"bayangkan ada jalan yang kalau dilewati justru mengembalikan waktumu."* Kalau itu mungkin, kamu tidak akan pernah bisa memastikan sebuah rute sudah final — mungkin saja ada jalan ajaib di depan yang membuat rute yang tadinya buruk menjadi terbaik. Karena itu jaminan Dijkstra runtuh.

Peragaan yang efektif di kelas: gambar graph berbobot pada contoh kode di papan tulis, lalu minta mahasiswa mencari jalur terpendek dari 0 ke 1 **secara manual**. Kebanyakan akan menjawab jalur langsung \`0 → 1\` yang berbobot 4. Setelah itu tunjukkan bahwa \`0 → 3 → 1\` ternyata cuma 3. Kejutan bahwa **jalur dengan langkah lebih banyak justru lebih murah** biasanya menjadi momen yang membuat seluruh materi ini melekat.
`,

  latihan: [
    'Implementasikan Dijkstra memakai priority queue, lalu jalankan pada graph contoh. Tampilkan jarak terpendek dari simpul 0 ke semua simpul lain.',
    'Tambahkan pencatatan `asal` sehingga jalurnya bisa direkonstruksi, bukan cuma jaraknya. Tampilkan jalur lengkap dari 0 ke setiap simpul.',
    'Jalankan BFS biasa pada graph berbobot yang sama, lalu bandingkan hasilnya dengan Dijkstra dalam bentuk tabel. Simpul mana saja yang jawabannya berbeda, dan kenapa?',
    'Sengaja hapus baris `if (d > jarak[v]) continue;`, lalu tambahkan pencacah untuk menghitung berapa kali perulangan berjalan. Berapa banyak pekerjaan sia-sia yang terjadi?',
    'Buat graph dengan satu edge berbobot negatif, jalankan Dijkstra, lalu tunjukkan bahwa hasilnya salah. Hitung sendiri jawaban yang benar secara manual.',
    'Ubah Dijkstra agar berhenti begitu simpul tujuan tercapai, tidak perlu menghitung semua simpul. Kenapa optimasi ini sah?',
    'Terapkan Dijkstra pada kasus nyata: buat graph berisi 5 kota dengan jarak antar kota, lalu cari rute terpendek dari kota A ke kota E.',
    'Bandingkan kapan sebaiknya memakai BFS, Dijkstra, dan Bellman-Ford. Buat tabel berisi syarat pemakaian dan kompleksitas masing-masing.',
    'Uji pemahaman: rancang peragaan 5 menit dengan graph berbobot di kertas. Coba dulu sendiri mencari jalur terpendek secara manual lebih dulu, lalu tunjukkan bahwa jalur dengan langkah lebih banyak ternyata lebih murah.'
  ]
});
