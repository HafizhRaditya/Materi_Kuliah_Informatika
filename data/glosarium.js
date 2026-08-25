/* ============================================================
   glosarium.js — istilah & singkatan yang sering muncul.
   Urutan bebas; situs otomatis mengurutkannya A-Z.
   Kolom: istilah, jenis (label kecil), definisi, contoh.
   ============================================================ */

GLOSARIUM.push(
  {
    istilah: 'Big-O / O(n)',
    jenis: 'analisis',
    definisi: `Cara menyatakan **seberapa cepat pertumbuhan** waktu atau memori sebuah algoritma ketika jumlah data (\`n\`) bertambah. Yang diukur bukan detik, melainkan **pola pertumbuhannya** — karena itu konstanta dan faktor kecil diabaikan.`,
    contoh: `Mencari satu nama di daftar tak berurut = \`O(n)\`: kalau datanya jadi 2x lipat, waktunya kira-kira 2x lipat juga. Sedangkan mengambil \`arr[5]\` = \`O(1)\`, tetap secepat itu berapa pun panjang array-nya.`
  },
  {
    istilah: 'LIFO',
    jenis: 'struktur data',
    definisi: `Singkatan dari *Last In, First Out* — **yang terakhir masuk, yang pertama keluar**. Ini aturan main sebuah **stack**.`,
    contoh: `Tumpukan piring: piring yang terakhir ditaruh di atas adalah yang pertama diambil. Sama seperti tombol Ctrl+Z yang membatalkan aksi terakhirmu lebih dulu.`
  },
  {
    istilah: 'FIFO',
    jenis: 'struktur data',
    definisi: `Singkatan dari *First In, First Out* — **yang pertama masuk, yang pertama keluar**. Ini aturan main sebuah **queue** (antrean).`,
    contoh: `Antrean kasir: yang datang duluan dilayani duluan. Sama seperti antrean cetak dokumen di printer.`
  },
  {
    istilah: 'Rekursi',
    jenis: 'algoritma',
    definisi: `Teknik di mana sebuah fungsi **memanggil dirinya sendiri** untuk menyelesaikan versi yang lebih kecil dari masalah yang sama. Wajib punya **base case** agar berhenti.`,
    contoh: `\`faktorial(5)\` memanggil \`faktorial(4)\`, yang memanggil \`faktorial(3)\`, dan seterusnya sampai \`faktorial(1)\` yang langsung menjawab 1 tanpa memanggil lagi.`
  },
  {
    istilah: 'Base case',
    jenis: 'algoritma',
    definisi: `Kondisi **berhenti** pada fungsi rekursif — kasus paling sederhana yang jawabannya sudah diketahui langsung, tanpa perlu memanggil diri sendiri lagi. Tanpa ini, rekursi berjalan selamanya sampai memori habis.`,
    contoh: `Pada faktorial, base case-nya \`if (n <= 1) return 1;\`. Inilah rem yang membuat rantai pemanggilan berhenti dan mulai mengembalikan hasil.`
  },
  {
    istilah: 'Pointer',
    jenis: 'C / C++',
    definisi: `Variabel yang isinya **alamat memori** variabel lain, bukan nilainya. Dipakai agar fungsi bisa mengubah data pemanggil, menghemat penyalinan data besar, dan membangun struktur berantai.`,
    contoh: `\`int x = 10; int *p = &x;\` — di sini \`p\` menyimpan alamat \`x\`, sedangkan \`*p\` menghasilkan nilainya, yaitu 10.`
  },
  {
    istilah: 'Dereference',
    jenis: 'C / C++',
    definisi: `Tindakan **membuka isi** dari alamat yang disimpan sebuah pointer, ditandai dengan \`*\` di depan nama pointer. Kalau \`&\` bertanya "di mana", maka \`*\` berarti "pergi ke sana dan lihat isinya".`,
    contoh: `Jika \`p\` menyimpan alamat \`x\` yang bernilai 10, maka \`*p\` menghasilkan 10 — dan \`*p = 20;\` mengubah nilai \`x\` menjadi 20.`
  },
  {
    istilah: 'NULL / nullptr',
    jenis: 'C / C++',
    definisi: `Nilai khusus yang menandakan sebuah pointer **sengaja tidak menunjuk ke mana-mana**. Berbeda dari pointer yang belum diisi, yang isinya sampah acak. Di C++ modern gunakan \`nullptr\`.`,
    contoh: `\`int *p = NULL;\` lalu dicek dengan \`if (p != NULL) { ... }\` sebelum dipakai, agar program tidak mengakses alamat yang tidak sah.`
  },
  {
    istilah: 'Segmentation fault',
    jenis: 'error',
    definisi: `Error saat program mencoba mengakses memori yang **bukan haknya**. Programnya langsung dihentikan paksa oleh sistem operasi. Ini error *runtime*, jadi tidak terdeteksi saat kompilasi.`,
    contoh: `Penyebab paling sering di praktikum: lupa \`&\` pada \`scanf("%d", umur)\`, memakai pointer yang belum diarahkan, atau mengakses \`arr[10]\` padahal array-nya cuma 5 elemen.`
  },
  {
    istilah: 'Stack overflow',
    jenis: 'error',
    definisi: `Kondisi saat **call stack** penuh karena terlalu banyak pemanggilan fungsi yang belum selesai. Penyebab paling umum adalah rekursi yang tidak punya base case atau base case-nya tidak pernah tercapai.`,
    contoh: `\`int f(int n) { return f(n - 1); }\` — tidak ada yang menghentikan, sehingga tumpukan pemanggilan terus bertambah sampai jatuh.`
  },
  {
    istilah: 'Encapsulation',
    jenis: 'OOP',
    definisi: `Prinsip **menyembunyikan data** di dalam object dan hanya membukanya lewat method tertentu. Tujuannya agar data tidak bisa diubah sembarangan dari luar, sehingga nilainya selalu terjaga sah.`,
    contoh: `Attribute \`saldo\` dibuat \`private\`, dan perubahannya hanya lewat method \`setoran()\` yang menolak nilai negatif — bukan dengan \`rekening.saldo = -500;\` langsung.`
  },
  {
    istilah: 'Inheritance',
    jenis: 'OOP',
    definisi: `Kemampuan sebuah class **mewarisi** attribute dan method dari class lain, sehingga kode yang sama tidak perlu ditulis ulang. Class asalnya disebut *parent* atau *base*, penerusnya disebut *child* atau *derived*.`,
    contoh: `Class \`Dosen\` dan \`Mahasiswa\` sama-sama mewarisi \`nama\` dan \`umur\` dari class \`Orang\`, lalu masing-masing menambahkan yang khas: \`nidn\` dan \`nim\`.`
  },
  {
    istilah: 'Polymorphism',
    jenis: 'OOP',
    definisi: `Kemampuan satu nama method berperilaku **berbeda-beda** tergantung objectnya. Berasal dari kata Yunani yang berarti "banyak bentuk".`,
    contoh: `Method \`bersuara()\` menghasilkan "Guk" pada object \`Anjing\` tapi "Meong" pada object \`Kucing\` — padahal keduanya dipanggil dengan cara yang sama persis.`
  },
  {
    istilah: 'Abstraction',
    jenis: 'OOP',
    definisi: `Prinsip menampilkan **apa yang bisa dilakukan** sambil menyembunyikan **bagaimana caranya**. Pemakai cukup tahu antarmukanya, tidak perlu tahu isi dalamnya.`,
    contoh: `Kamu memanggil \`sort(data)\` tanpa perlu tahu ia memakai quicksort atau mergesort. Sama seperti menyetir mobil tanpa perlu paham cara kerja mesinnya.`
  },
  {
    istilah: 'BST (Binary Search Tree)',
    jenis: 'struktur data',
    definisi: `Pohon biner dengan aturan tetap: semua nilai di **cabang kiri lebih kecil** dari simpulnya, dan semua nilai di **cabang kanan lebih besar**. Aturan inilah yang membuat pencarian bisa membuang separuh data tiap langkah.`,
    contoh: `Mencari angka 7 pada BST berakar 10: karena 7 < 10, cabang kanan langsung diabaikan. Rata-rata \`O(log n)\`, tapi bisa memburuk jadi \`O(n)\` kalau pohonnya tumbuh miring seperti garis lurus.`
  },
  {
    istilah: 'Heap',
    jenis: 'struktur data',
    definisi: `Pohon biner yang selalu menjaga satu aturan: **induk selalu lebih kecil** dari anaknya (*min-heap*), atau **selalu lebih besar** (*max-heap*). Membuat nilai terkecil/terbesar selalu berada di puncak dan bisa diambil cepat.`,
    contoh: `Dipakai pada *priority queue*, misal antrean IGD di mana pasien paling gawat dilayani duluan tanpa perlu mengurutkan ulang seluruh antrean.`
  },
  {
    istilah: 'Hash / Hash Table',
    jenis: 'struktur data',
    definisi: `Struktur yang mengubah **kunci** menjadi angka indeks lewat *hash function*, sehingga data bisa dicari nyaris seketika — rata-rata \`O(1)\` — tanpa memeriksa satu per satu.`,
    contoh: `\`map\` di C++ dan \`dict\` di Python. Mencari \`nilai["Budi"]\` langsung menuju tempatnya, tidak perlu menyusuri seluruh daftar nama.`
  },
  {
    istilah: 'Traversal',
    jenis: 'struktur data',
    definisi: `Proses **mengunjungi semua simpul** pada sebuah struktur data, masing-masing tepat satu kali, dengan urutan tertentu.`,
    contoh: `Pada tree ada *inorder*, *preorder*, dan *postorder*. Khusus pada BST, *inorder* menghasilkan data yang otomatis **terurut menaik**.`
  },
  {
    istilah: 'Compile-time vs Runtime error',
    jenis: 'error',
    definisi: `**Compile-time error** ketahuan saat kode diterjemahkan, jadi programnya bahkan tidak terbentuk — misal salah ketik atau lupa titik koma. **Runtime error** baru muncul saat program berjalan, padahal kompilasinya sukses.`,
    contoh: `Lupa \`;\` = compile-time (kompiler protes). Pembagian dengan nol atau *segmentation fault* = runtime (program jalan dulu, baru berhenti mendadak).`
  },
  {
    istilah: 'Off-by-one error',
    jenis: 'error',
    definisi: `Bug yang hasilnya **meleset tepat satu langkah** — biasanya karena tertukar antara \`<\` dan \`<=\`, atau lupa bahwa indeks array dimulai dari 0. Termasuk kesalahan paling sering di semua bahasa.`,
    contoh: `\`for (i = 0; i <= n; i++)\` pada array berukuran \`n\` akan menyentuh \`arr[n]\` yang berada di luar batas. Bentuk yang benar memakai \`i < n\`.`
  },
  {
    istilah: 'Null terminator',
    jenis: 'C',
    definisi: `Karakter bernilai nol, ditulis \`'\\0'\`, yang menandai **akhir sebuah string di C**. Diperlukan karena array C tidak menyimpan panjangnya sendiri, sehingga fungsi string berjalan dari awal sampai bertemu penanda ini.`,
    contoh: `Kata \`"Budi"\` memerlukan **5 byte**, bukan 4 — empat huruf ditambah satu penanda akhir. Karena itu \`char nama[4] = "Budi";\` sudah salah sejak awal.`
  },
  {
    istilah: 'Buffer overflow',
    jenis: 'error',
    definisi: `Kondisi saat data ditulis **melewati batas** wadah yang disediakan, sehingga menimpa memori milik data lain. Di C tidak ada peringatan sama sekali, dan ini termasuk celah keamanan paling terkenal di dunia nyata.`,
    contoh: `\`char kecil[5]; strcpy(kecil, "Halooo");\` menyalin 7 byte ke wadah 5 byte. Dua byte kelebihannya menimpa memori tetangga.`
  },
  {
    istilah: 'Casting (type casting)',
    jenis: 'tipe data',
    definisi: `Mengubah tipe sebuah nilai secara sengaja, ditulis dengan tipe tujuan di dalam kurung. Paling sering dipakai untuk menghindari jebakan pembagian bilangan bulat.`,
    contoh: `\`7 / 2\` menghasilkan \`3\`, tetapi \`(float)7 / 2\` menghasilkan \`3.5\`. Cukup satu operand yang di-cast, karena yang lain otomatis menyesuaikan.`
  },
  {
    istilah: 'Integer overflow',
    jenis: 'error',
    definisi: `Kondisi saat hasil perhitungan **melampaui batas** yang bisa ditampung sebuah tipe bilangan bulat, sehingga nilainya berputar menjadi negatif tanpa peringatan apa pun.`,
    contoh: `\`int\` 4 byte hanya menampung sampai sekitar 2,1 miliar. Karena itu binary search sebaiknya memakai \`kiri + (kanan - kiri) / 2\`, bukan \`(kiri + kanan) / 2\`. Di Python hal ini tidak terjadi karena \`int\`-nya tak terbatas.`
  },
  {
    istilah: 'Short-circuit',
    jenis: 'operator',
    definisi: `Sifat operator \`&&\` dan \`||\` yang **berhenti mengevaluasi begitu hasilnya sudah pasti**. Sering dimanfaatkan sebagai pengaman, sehingga urutan penulisan kondisi menjadi penting.`,
    contoh: `Pada \`if (n != 0 && total / n > 5)\`, jika \`n\` bernilai 0 maka pembagiannya **tidak pernah dijalankan** — program selamat dari pembagian dengan nol.`
  },
  {
    istilah: 'Scope (jangkauan)',
    jenis: 'fungsi',
    definisi: `Wilayah tempat sebuah variabel dikenal dan bisa dipakai. Variabel **lokal** hanya hidup di dalam blok tempatnya dideklarasikan dan dihapus begitu blok itu selesai.`,
    contoh: `Variabel \`i\` di fungsi A sama sekali tidak berhubungan dengan \`i\` di fungsi B. Justru inilah yang membuat fungsi bisa ditulis mandiri tanpa takut bentrok nama.`
  },
  {
    istilah: 'Format specifier',
    jenis: 'C',
    definisi: `Kode berawalan \`%\` pada \`printf\` dan \`scanf\` yang memberitahu **jenis data** yang sedang diproses. Diperlukan karena kedua fungsi itu tidak punya cara lain mengetahui tipe argumennya.`,
    contoh: `\`%d\` untuk \`int\`, \`%c\` untuk \`char\`, \`%s\` untuk string, \`%.2f\` untuk 2 angka desimal. Perhatikan: pada **scanf**, \`%f\` untuk \`float\` dan \`%lf\` untuk \`double\` — tidak boleh tertukar.`
  },
  {
    istilah: 'Call stack',
    jenis: 'memori',
    definisi: `Tumpukan yang mencatat semua pemanggilan fungsi yang **belum selesai**, lengkap dengan parameter, variabel lokal, dan alamat untuk kembali. Bekerja dengan aturan LIFO.`,
    contoh: `Saat fungsi A memanggil B, B harus selesai lebih dulu sebelum A bisa lanjut. Rekursi tanpa base case membuat tumpukan ini terus membesar sampai terjadi **stack overflow**.`
  },
  {
    istilah: 'Immutable',
    jenis: 'Python',
    definisi: `Sifat objek yang **isinya tidak bisa diubah** setelah dibuat. Setiap operasi yang tampak "mengubah" sebenarnya menghasilkan objek baru.`,
    contoh: `Di Python, \`str\`, \`int\`, dan \`tuple\` bersifat immutable, sedangkan \`list\` dan \`dict\` bersifat *mutable*. Karena itu \`nama.upper()\` saja tidak berefek — hasilnya wajib ditugaskan ulang: \`nama = nama.upper()\`.`
  },
  {
    istilah: 'In-place',
    jenis: 'algoritma',
    definisi: `Sifat algoritma yang bekerja **langsung pada data aslinya** tanpa memerlukan wadah tambahan yang besar, sehingga memori tambahannya hanya O(1).`,
    contoh: `Bubble, selection, dan insertion sort semuanya in-place — cuma butuh satu variabel bantu untuk menukar. Bandingkan dengan merge sort yang memerlukan array tambahan sebesar O(n).`
  },
  {
    istilah: 'Infinite loop',
    jenis: 'error',
    definisi: `Perulangan yang **tidak pernah berhenti** karena kondisinya selalu terpenuhi. Penyebab tersering adalah lupa mengubah variabel pencacah di dalam badan perulangan.`,
    contoh: `\`while (i < 5) { printf("%d", i); }\` tanpa \`i++\` akan berputar selamanya. Pada binary search, menulis \`kiri = tengah\` alih-alih \`tengah + 1\` menimbulkan gejala yang sama.`
  },
  {
    istilah: 'Node (simpul)',
    jenis: 'struktur data',
    definisi: `Satu satuan penyimpanan pada struktur berantai, berisi **data** dan **satu atau lebih pointer** menuju node lain. Pola ini menjadi dasar linked list, tree, maupun graph.`,
    contoh: `Node linked list punya satu pointer (\`next\`), node binary tree punya dua (\`kiri\` dan \`kanan\`). Yang disimpan selalu **pointer** ke sesamanya, bukan salinan dirinya.`
  },
  {
    istilah: 'Vertex & Edge',
    jenis: 'graph',
    definisi: `**Vertex** (simpul) adalah titik pada sebuah graph, dan **edge** (sisi) adalah garis yang menghubungkan dua vertex. Jumlahnya biasa dilambangkan **V** dan **E**.`,
    contoh: `Pada peta jalan, persimpangan adalah vertex dan ruas jalan adalah edge. Kompleksitas BFS dan DFS ditulis \`O(V + E)\` karena tiap vertex dan tiap edge disentuh sekali.`
  },
  {
    istilah: 'BFS (Breadth First Search)',
    jenis: 'graph',
    definisi: `Penjelajahan graph yang **melebar dulu** — semua tetangga berjarak 1 diperiksa sebelum yang berjarak 2. Memakai **queue**, dan menemukan **jalur terpendek** pada graph tanpa bobot.`,
    contoh: `Mencari berapa perantara antara dua orang di jejaring sosial. Pada tree, BFS dikenal sebagai **level order traversal**.`
  },
  {
    istilah: 'DFS (Depth First Search)',
    jenis: 'graph',
    definisi: `Penjelajahan graph yang **mendalam dulu** — masuk sejauh mungkin ke satu arah sebelum kembali mencoba cabang lain. Memakai **stack** atau rekursi.`,
    contoh: `Cocok untuk menelusuri semua kemungkinan seperti menyelesaikan labirin, mendeteksi siklus, dan menghitung komponen terhubung. **Tidak** menjamin jalur terpendek.`
  },
  {
    istilah: 'Adjacency matrix vs list',
    jenis: 'graph',
    definisi: `Dua cara menyimpan graph. **Matrix** berupa tabel \`V × V\` — cek hubungan O(1) tapi memori selalu O(V²). **List** menyimpan daftar tetangga tiap vertex — memori O(V + E), jauh lebih hemat untuk graph jarang.`,
    contoh: `Graph 10.000 vertex dengan 20.000 edge butuh 100 juta sel bila memakai matrix, tapi cuma sekitar 30.000 entri bila memakai list.`
  },
  {
    istilah: 'Chaining',
    jenis: 'hash',
    definisi: `Cara menangani **collision** pada hash table: tiap slot menyimpan sebuah **linked list**, sehingga kunci-kunci yang bertabrakan disambung berderet di slot yang sama.`,
    contoh: `Kalau \`"AB"\` dan \`"BA"\` sama-sama menghasilkan indeks 1, keduanya disimpan berurutan di rantai slot 1. Pencariannya menelusuri rantai itu sambil membandingkan kuncinya.`
  },
  {
    istilah: 'Load factor',
    jenis: 'hash',
    definisi: `Ukuran kepadatan hash table, yaitu **jumlah data dibagi jumlah slot**. Semakin padat, semakin sering terjadi tabrakan dan semakin lambat pencariannya.`,
    contoh: `Bila melewati sekitar 0,75, tabel biasanya diperbesar dan seluruh data dihitung ulang indeksnya — proses yang disebut **rehashing**.`
  },
  {
    istilah: 'Complete binary tree',
    jenis: 'struktur data',
    definisi: `Binary tree yang terisi **penuh dari kiri ke kanan** di setiap tingkat, dan hanya tingkat terakhir yang boleh belum penuh. Bentuk rapat ini menjamin tingginya selalu sekitar log n.`,
    contoh: `**Heap** wajib berbentuk complete binary tree. Karena rapat tanpa celah, posisinya bisa dihitung langsung: anak dari indeks \`i\` ada di \`2i+1\` dan \`2i+2\`.`
  },
  {
    istilah: 'Heapify',
    jenis: 'algoritma',
    definisi: `Proses menata ulang agar aturan heap terpenuhi. **Sift down** menurunkan sebuah nilai sampai posisinya benar; **sift up** menaikkannya.`,
    contoh: `Membangun heap dari array sembarang lewat heapify ternyata hanya **O(n)**, bukan O(n log n) — karena sebagian besar simpul berada di tingkat bawah dan hampir tidak perlu turun.`
  },
  {
    istilah: 'Self-balancing tree',
    jenis: 'struktur data',
    definisi: `Tree yang **menata ulang dirinya sendiri** setiap kali ada penyisipan atau penghapusan, agar tingginya selalu terjaga sekitar log n. Contohnya **AVL** dan **Red-Black Tree**.`,
    contoh: `BST biasa merosot jadi O(n) bila data masuk dalam keadaan terurut. \`map\` dan \`set\` di C++ memakai Red-Black Tree sehingga **dijamin O(log n)** apa pun urutan masukannya.`
  },
  {
    istilah: 'Amortized',
    jenis: 'analisis',
    definisi: `Cara menghitung biaya **rata-rata sepanjang banyak operasi**, bukan per operasi tunggal. Dipakai ketika sesekali ada operasi mahal di antara banyak operasi murah.`,
    contoh: `\`vector.push_back()\` biasanya O(1), tapi sesekali seluruh isinya harus dipindah ke wadah lebih besar yang O(n). Karena jarang, rata-ratanya tetap **O(1) amortized**.`
  },
  {
    istilah: 'Memory leak',
    jenis: 'error',
    definisi: `Memori yang sudah dipesan tetapi **tidak pernah dibebaskan** dan tidak lagi bisa dijangkau. Memorinya terpakai sia-sia sampai program berakhir.`,
    contoh: `Setiap \`malloc\` di C wajib berpasangan dengan \`free\`. Pada linked list, memindahkan \`head\` sebelum menyimpan alamat node lama membuat seluruh daftar bocor sekaligus.`
  },
  {
    istilah: 'Constructor',
    jenis: 'OOP',
    definisi: `Method khusus yang **dijalankan otomatis saat object dibuat**, sehingga object dijamin lahir dalam keadaan siap pakai. Di C++, Java, dan C# namanya sama dengan class dan **tanpa tipe kembalian**; di Python bernama \`__init__\`.`,
    contoh: `\`Mahasiswa a("Budi");\` menjalankan constructor secara otomatis. Menulis \`void Mahasiswa(...)\` dengan tipe kembalian membuatnya berubah menjadi method biasa yang tidak pernah dipanggil otomatis.`
  },
  {
    istilah: 'Destructor',
    jenis: 'OOP',
    definisi: `Kode yang berjalan otomatis **saat object dibuang**, dipakai untuk mengembalikan sumber daya. Di C++ ditulis dengan tilde: \`~Mahasiswa()\`.`,
    contoh: `Pada class yang diwarisi, destructor induk **wajib** \`virtual\` — tanpa itu, menghapus lewat pointer induk membuat destructor turunan terlewat dan sumber dayanya bocor.`
  },
  {
    istilah: 'RAII',
    jenis: 'C++',
    definisi: `Singkatan dari *Resource Acquisition Is Initialization*: **sumber daya diambil di constructor dan dikembalikan di destructor**. Karena destructor dijamin dipanggil, sumber daya mustahil terlupakan.`,
    contoh: `Berkas dibuka di constructor dan ditutup di destructor, sehingga tetap tertutup meski fungsinya keluar lebih awal. Padanannya di Python adalah **context manager** dengan \`with\`.`
  },
  {
    istilah: 'Access modifier',
    jenis: 'OOP',
    definisi: `Penentu siapa yang boleh mengakses sebuah anggota class. **\`private\`** hanya class itu sendiri, **\`protected\`** class itu dan turunannya, **\`public\`** siapa saja.`,
    contoh: `Attribute sebaiknya \`private\` sebagai bawaan. Gunakan \`protected\` bila turunan memang perlu menjangkaunya — \`private\` menutup akses bahkan dari turunan sendiri.`
  },
  {
    istilah: 'Getter & Setter',
    jenis: 'OOP',
    definisi: `Method pintu masuk untuk membaca (**getter**) dan mengubah (**setter**) attribute yang bersifat private. Manfaat sesungguhnya ada pada **penjagaan di dalam setter**.`,
    contoh: `Setter yang sekadar menyalin nilai tanpa memeriksa apa pun tidak memberi manfaat — sama saja dengan attribute publik. Lebih baik sediakan method yang mewakili operasi nyata seperti \`setor()\` dan \`tarik()\`.`
  },
  {
    istilah: 'Property',
    jenis: 'OOP',
    definisi: `Anggota yang **ditulis seperti attribute tetapi berperilaku seperti method**. Memungkinkan attribute biasa diubah menjadi terkendali **tanpa mengubah kode yang memakainya**.`,
    contoh: `Di C#: \`public double Saldo { get; private set; }\`. Di Python: penanda \`@property\`. Di JavaScript: \`get saldo() { ... }\`. Java tidak punya fitur ini.`
  },
  {
    istilah: 'Overloading',
    jenis: 'OOP',
    definisi: `Beberapa method **bernama sama tetapi parameternya berbeda**. Versi yang dipakai dipilih **saat kompilasi** berdasarkan argumen, dan tidak memerlukan pewarisan sama sekali.`,
    contoh: `\`luas(5)\` untuk persegi dan \`luas(5, 3)\` untuk persegi panjang. **Python dan JavaScript tidak punya overloading** — definisi kedua menimpa yang pertama.`
  },
  {
    istilah: 'Overriding',
    jenis: 'OOP',
    definisi: `Class turunan **mengganti** method induk dengan parameter yang **sama persis**. Versi yang dipakai ditentukan **saat program berjalan**, berdasarkan object sesungguhnya.`,
    contoh: `Pembeda cepatnya: **beda parameter berarti overloading; parameter sama tapi beda class berarti overriding.** Di C++ dan C#, method induk harus ditandai \`virtual\` lebih dulu.`
  },
  {
    istilah: 'Virtual & override',
    jenis: 'C++ / C#',
    definisi: `**\`virtual\`** memberi izin agar sebuah method boleh diganti turunan, dan **\`override\`** menyatakan bahwa turunan memang sengaja menggantinya.`,
    contoh: `Tanpa \`virtual\`, pemanggilan lewat pointer induk **selalu** menjalankan versi induk meski object-nya turunan. Di Java, semua method non-\`final\` otomatis bisa diganti.`
  },
  {
    istilah: 'Abstract class',
    jenis: 'OOP',
    definisi: `Class yang **tidak bisa dibuat object-nya** dan berisi minimal satu method tanpa isi yang **wajib** dilengkapi turunan. Boleh juga berisi method yang sudah lengkap untuk dipakai bersama.`,
    contoh: `Di C++ ditandai \`= 0\` (*pure virtual*), di Java dan C# dengan kata \`abstract\`, di Python dengan mewarisi \`ABC\` plus penanda \`@abstractmethod\`.`
  },
  {
    istilah: 'Interface',
    jenis: 'OOP',
    definisi: `Kontrak berisi **daftar method wajib tanpa isi** dan tanpa data. Java dan C# hanya mengizinkan pewarisan dari **satu** class, tetapi boleh menerapkan interface **sebanyak apa pun**.`,
    contoh: `\`class Bebek extends Hewan implements BisaTerbang, BisaBerenang\`. Uji pemilihannya: *"adalah sebuah"* mengarah ke abstract class, *"bisa melakukan"* mengarah ke interface.`
  },
  {
    istilah: 'Duck typing',
    jenis: 'Python / JS',
    definisi: `Gaya yang memeriksa **kemampuan object**, bukan jenisnya. Dari pepatah: *"kalau berjalan seperti bebek dan bersuara seperti bebek, maka ia bebek."*`,
    contoh: `Di Python, dua class yang sama sekali tidak saling mewarisi bisa dipakai bergantian asal keduanya punya method bernama sama. Luwes, tapi kesalahannya baru ketahuan saat program berjalan.`
  },
  {
    istilah: 'Komposisi (has-a)',
    jenis: 'OOP',
    definisi: `Menyimpan object lain sebagai **attribute**, untuk hubungan **"punya"** — berbeda dari inheritance yang untuk hubungan **"adalah sebuah"**.`,
    contoh: `*"Mobil **punya** Mesin"* berarti \`this.mesin = new Mesin()\`, bukan \`class Mobil extends Mesin\`. Ada nasihat terkenal: **utamakan komposisi daripada pewarisan**.`
  },
  {
    istilah: 'Divide and conquer',
    jenis: 'algoritma',
    definisi: `Strategi tiga langkah: **bagi** masalah jadi bagian kecil, **taklukkan** tiap bagian (biasanya rekursif), lalu **gabungkan** hasilnya.`,
    contoh: `Merge sort membagi tepat di tengah lalu bekerja keras saat menggabungkan; quick sort bekerja keras saat membagi lalu penggabungannya gratis. Berbeda dari DP karena bagiannya **tidak pernah berulang**.`
  },
  {
    istilah: 'Memoization',
    jenis: 'DP',
    definisi: `Menyimpan hasil perhitungan agar bagian yang sama **tidak dihitung dua kali**. Pendekatan DP **dari atas ke bawah** yang tetap memakai rekursi.`,
    contoh: `Menambahkan penyimpanan pada fibonacci rekursif menjatuhkan kompleksitasnya dari O(2ⁿ) menjadi **O(n)** — cukup dengan dua baris tambahan.`
  },
  {
    istilah: 'Tabulasi',
    jenis: 'DP',
    definisi: `Pendekatan DP **dari bawah ke atas**: mulai dari kasus terkecil, lalu bangun jawabannya ke atas memakai perulangan. Tidak memakai rekursi sama sekali.`,
    contoh: `Lebih aman dari memoization untuk \`n\` besar karena tidak berisiko stack overflow, dan sering bisa diciutkan memorinya dari O(n) menjadi O(1).`
  },
  {
    istilah: 'Overlapping subproblems',
    jenis: 'DP',
    definisi: `Keadaan ketika bagian masalah yang **sama muncul berulang kali**. Ini syarat pertama agar dynamic programming bermanfaat.`,
    contoh: `Pada \`fib(10)\` versi polos, \`fib(3)\` dipanggil 21 kali. Bandingkan dengan merge sort yang tiap potongannya berbeda — di sana DP tidak membantu.`
  },
  {
    istilah: 'Greedy',
    jenis: 'algoritma',
    definisi: `Strategi yang selalu mengambil **pilihan terbaik saat itu juga**, tanpa meninjau ulang. Hanya benar bila masalahnya menjamin pilihan lokal terbaik menghasilkan jawaban global terbaik.`,
    contoh: `Dijkstra selalu mengambil simpul terdekat yang belum dikunjungi. Jaminannya runtuh bila ada **bobot negatif**, dan di situlah greedy menjadi salah.`
  },
  {
    istilah: 'Relaksasi',
    jenis: 'graph',
    definisi: `Langkah memperbarui perkiraan jarak bila ditemukan jalur yang lebih pendek: *"kalau lewat simpul ini, apakah totalnya jadi lebih kecil?"*`,
    contoh: `\`if (jarak[v] + bobot < jarak[tetangga])\` lalu perbarui. Inilah inti Dijkstra maupun Bellman-Ford.`
  },
  {
    istilah: 'Dijkstra',
    jenis: 'graph',
    definisi: `Algoritma jalur terpendek untuk graph **berbobot tidak negatif**, memakai priority queue. Kompleksitasnya O((V+E) log V).`,
    contoh: `BFS hanya benar bila semua bobot sama. Untuk bobot berbeda pakai Dijkstra; untuk bobot **negatif** pakai Bellman-Ford.`
  },
  {
    istilah: 'Stabil (sorting)',
    jenis: 'algoritma',
    definisi: `Sifat pengurutan yang menjaga **urutan asli** data yang nilainya sama. Penting saat mengurutkan bertingkat dengan dua kunci.`,
    contoh: `**Stabil**: merge sort, insertion sort, Timsort. **Tidak stabil**: quick sort, selection sort, heap sort. Di C++, \`std::sort\` tidak stabil sehingga tersedia \`std::stable_sort\` terpisah.`
  },
  {
    istilah: 'Proposisi',
    jenis: 'logika',
    definisi: `Kalimat yang **bisa dinilai benar atau salah**, dan tidak keduanya sekaligus. Pertanyaan, perintah, dan kalimat terbuka bukan proposisi.`,
    contoh: `"2 + 2 = 5" adalah proposisi (bernilai salah). "Berapa umurmu?" bukan. "x + 1 = 5" juga bukan sampai \`x\` diberi nilai atau diberi kuantor.`
  },
  {
    istilah: 'Implikasi',
    jenis: 'logika',
    definisi: `Operator \`p → q\`, dibaca "jika p maka q". **Hanya bernilai salah pada satu keadaan**, yaitu ketika p benar tetapi q salah.`,
    contoh: `Anggap sebagai janji: *"kalau lulus, saya traktir"*. Janji hanya dilanggar bila lulus tetapi tidak mentraktir. Kalau tidak lulus, janjinya tidak diuji — sehingga bernilai **benar secara hampa**.`
  },
  {
    istilah: 'Tautologi & Kontradiksi',
    jenis: 'logika',
    definisi: `**Tautologi** selalu bernilai benar untuk semua kemungkinan; **kontradiksi** selalu salah. Yang campuran disebut **kontingensi**.`,
    contoh: `\`p ∨ ¬p\` tautologi, \`p ∧ ¬p\` kontradiksi. Untuk membantah tautologi cukup **satu** baris penyangkal, tetapi untuk membuktikannya harus **semua** baris diperiksa.`
  },
  {
    istilah: 'Kontraposisi',
    jenis: 'logika',
    definisi: `Bentuk \`¬q → ¬p\` dari implikasi \`p → q\`. **Satu-satunya bentuk turunan yang setara** dengan aslinya — konvers (\`q → p\`) dan invers (\`¬p → ¬q\`) tidak setara.`,
    contoh: `"Jika hujan maka jalanan basah" setara dengan "jika jalanan tidak basah maka tidak hujan". Tetapi **tidak** setara dengan "jika jalanan basah maka hujan" — jalanan bisa basah karena disiram.`
  },
  {
    istilah: 'De Morgan',
    jenis: 'logika',
    definisi: `Hukum yang memindahkan negasi ke dalam: \`¬(p ∧ q) ≡ ¬p ∨ ¬q\` dan \`¬(p ∨ q) ≡ ¬p ∧ ¬q\`. **Negasi masuk, operator bertukar.**`,
    contoh: `Berlaku juga pada himpunan: \`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ\`. Dan pada pemrograman: \`!(a && b)\` setara \`!a || !b\`. Kesalahan tersering adalah lupa menukar operatornya.`
  },
  {
    istilah: 'Modus Ponens & Modus Tollens',
    jenis: 'logika',
    definisi: `Dua aturan inferensi yang sah. **Modus ponens**: dari \`p → q\` dan \`p\`, simpulkan \`q\`. **Modus tollens**: dari \`p → q\` dan \`¬q\`, simpulkan \`¬p\`.`,
    contoh: `Kalimat kuncinya: **maju dari depan boleh, mundur dari belakang boleh asal dinegasikan.** Modus tollens inilah yang kamu pakai saat men-debug: "kalau kode benar, keluarannya X; ternyata bukan X, berarti kodenya salah".`
  },
  {
    istilah: 'Sesat pikir (fallacy)',
    jenis: 'logika',
    definisi: `Bentuk penalaran yang **menyerupai aturan sah tetapi tidak sahih**. Dua yang paling sering: **menegaskan konsekuen** (memakai konvers) dan **menyangkal anteseden** (memakai invers).`,
    contoh: `*"Orang sukses bangun pagi. Saya bangun pagi, jadi saya akan sukses."* — ini menegaskan konsekuen. Cara membantahnya selalu sama: cari kemungkinan lain.`
  },
  {
    istilah: 'Sahih vs Benar',
    jenis: 'logika',
    definisi: `**Sahih** (*valid*) menilai bentuk penalarannya: kalau premis benar, kesimpulan pasti benar. **Benar** (*sound*) menuntut sahih **dan** premisnya memang benar.`,
    contoh: `"Semua kucing bisa terbang. Tom kucing. Jadi Tom bisa terbang." — argumen ini **sahih** karena bentuknya benar, tetapi **tidak benar** karena premisnya salah.`
  },
  {
    istilah: 'Kuantor',
    jenis: 'logika',
    definisi: `Penanda seberapa banyak yang dimaksud. **∀** (universal) berarti "untuk semua", **∃** (eksistensial) berarti "ada paling sedikit satu".`,
    contoh: `Padanannya di Python: **∀** adalah \`all()\`, **∃** adalah \`any()\`. Bahkan sifat semesta kosong pun sama — \`all([])\` menghasilkan \`True\`, \`any([])\` menghasilkan \`False\`.`
  },
  {
    istilah: 'Negasi kuantor',
    jenis: 'logika',
    definisi: `Aturan yang mirip De Morgan: \`¬∀x P(x) ≡ ∃x ¬P(x)\` dan \`¬∃x P(x) ≡ ∀x ¬P(x)\`. **Kuantornya bertukar, negasi masuk.**`,
    contoh: `Lawan dari "semua mahasiswa lulus" adalah **"ada mahasiswa yang tidak lulus"**, bukan "semua mahasiswa tidak lulus". Cukup satu yang tidak lulus untuk membatalkannya.`
  },
  {
    istilah: 'Semesta pembicaraan',
    jenis: 'logika',
    definisi: `Himpunan nilai yang boleh dipakai pada pernyataan berkuantor. **Wajib disebutkan**, karena pernyataan yang sama bisa benar atau salah tergantung semestanya.`,
    contoh: `\`∀x (x > 0)\` bernilai **benar** pada semesta bilangan asli, tetapi **salah** pada bilangan bulat. Sejajar dengan himpunan semesta yang diperlukan untuk komplemen.`
  },
  {
    istilah: 'Himpunan',
    jenis: 'logika',
    definisi: `Kumpulan objek berbeda yang **terdefinisi jelas**. Tidak mengenal **urutan** maupun **duplikat**, berbeda dari list di pemrograman.`,
    contoh: `\`{1,2,3}\` sama dengan \`{3,1,2}\`, dan \`{1,2,2,3}\` berkardinalitas 3 bukan 4. Enam operasinya: irisan, gabungan, komplemen, selisih, beda setangkup, dan perkalian kartesian.`
  },
  {
    istilah: 'Inklusi-eksklusi',
    jenis: 'logika',
    definisi: `Rumus menghitung kardinalitas gabungan: **\`|A ∪ B| = |A| + |B| − |A ∩ B|\`**. Irisannya dikurangi karena anggota bersama terhitung dua kali.`,
    contoh: `5 anggota klub musik dan 4 anggota klub tari, dengan 2 orang ikut keduanya, berarti totalnya 5 + 4 − 2 = **7 orang**, bukan 9.`
  },
  {
    istilah: 'Pass by value vs Pass by reference',
    jenis: 'fungsi',
    definisi: `**Pass by value** mengirim **salinan** data, sehingga perubahannya tidak berpengaruh ke aslinya. **Pass by reference** mengirim akses ke data aslinya, sehingga perubahannya ikut terasa di pemanggil.`,
    contoh: `\`void f(int x)\` tidak mengubah aslinya, tapi \`void f(int *x)\` (C) atau \`void f(int &x)\` (C++) bisa. Inilah alasan \`scanf\` butuh \`&\`.`
  }
);
