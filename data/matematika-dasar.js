/* ============================================================
   matematika-dasar.js — materi Matematika Dasar (Semester 1)

   Disusun dari slide kuliah sendiri:
     Pertemuan 4-5  Relasi dan Fungsi
     Pertemuan 6    Limit Fungsi
     Pertemuan 7    Limit Tak Hingga

   CATATAN CAKUPAN: hanya tiga berkas itu yang ada di drive, jadi
   materi ini TIDAK mencakup seluruh mata kuliah — pertemuan 1-3
   dan 8 ke atas tidak ada bahannya. Kalau slide sisanya ketemu,
   berkas ini perlu ditambah.

   CATATAN AKURASI: slide aslinya banyak memuat rumus sebagai
   gambar, dan pembacaan PDF-nya mengacaukan sebagian simbol
   matematika. Setiap contoh hitungan di sini karena itu DIHITUNG
   ULANG dengan kode sebelum ditulis, bukan disalin mentah.
   Satu ketidakcocokan yang ditemukan dicatat di topik Relasi.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Notasi",
   mengikuti kebiasaan topik Logika Informatika.
   ============================================================ */

TOPICS.push({
  id: 'matdas-relasi',
  judul: 'Relasi & Sifat-sifatnya',
  kategori: 'matematika-dasar',
  tag: ['relasi', 'himpunan', 'Cartesian product', 'refleksif', 'simetris', 'transitif'],
  ringkas: 'Hubungan antara dua himpunan — dasar dari basis data relasional, graf, dan logika pemrograman.',

  fungsi: `**Menyatakan hubungan antar data secara tepat — dasar dari basis data relasional dan graf.**

Nama "basis data relasional" berasal langsung dari sini.

Terpakai di:

- **Basis Data** — sebuah tabel secara matematis **adalah** relasi
- **Graf** — hubungan pertemanan, jaringan, ketergantungan tugas
- **Pengurutan** — operator \`<\` dan \`<=\` adalah relasi dengan sifat tertentu, dan sifat itu yang membuat pengurutan mungkin
- **Kelas ekuivalensi** — pengelompokan data, dan itu dasar dari clustering
- **Tutupan transitif** — mencari semua yang bisa dicapai, dipakai pada pencarian ketergantungan

Yang paling langsung terpakai: **memeriksa apakah aturan perbandinganmu masuk akal**. Fungsi pembanding untuk pengurutan **harus** transitif dan antisimetris — kalau tidak, hasil pengurutannya bisa berbeda-beda tiap kali dijalankan.`,

  praktik: {
    tujuan: `Kamu bisa memeriksa sifat sebuah relasi dengan kode, dan tahu kenapa fungsi pembanding yang tidak transitif merusak pengurutan.`,
    alat: [
      'Python 3'
    ],
    langkah: [
      { judul: 'Nyatakan relasi sebagai himpunan pasangan',
        isi: `Relasi "lebih kecil dari" pada himpunan \`{1,2,3}\` adalah \`{(1,2), (1,3), (2,3)}\`.

Di Python: \`R = {(1,2), (1,3), (2,3)}\`.

Bentuk ini yang membuat sifat-sifatnya bisa diperiksa dengan kode, bukan cuma dibayangkan.` },
      { judul: 'Tulis pemeriksa untuk tiap sifat',
        isi: `Buat empat fungsi:

- **refleksif** — \`(a,a)\` ada untuk setiap a
- **simetris** — kalau \`(a,b)\` ada maka \`(b,a)\` ada
- **antisimetris** — kalau \`(a,b)\` dan \`(b,a)\` ada maka a sama dengan b
- **transitif** — kalau \`(a,b)\` dan \`(b,c)\` ada maka \`(a,c)\` ada

Uji dengan relasi yang sudah kamu tahu jawabannya sebelum memakainya pada yang baru.` },
      { judul: 'Periksa relasi nyata',
        isi: `Uji beberapa relasi dan tebak dulu jawabannya sebelum menjalankan kodenya:

- "sama dengan" → refleksif, simetris, transitif — inilah **relasi ekuivalensi**
- "kurang dari atau sama dengan" → refleksif, antisimetris, transitif — inilah **urutan parsial**
- "teman di media sosial" → simetris, tetapi biasanya **tidak** transitif
- "mengikuti di media sosial" → **tidak** simetris

Yang terakhir menjelaskan kenapa Twitter dan Instagram berbeda dari Facebook secara struktur data.` },
      { judul: 'Hubungkan dengan tabel basis data',
        isi: `Tabel \`krs(nim, kode_mk)\` **adalah** relasi antara mahasiswa dan mata kuliah.

Setiap baris adalah satu pasangan terurut. Kunci utama gabungan memastikan tidak ada pasangan yang kembar.

Melihat tabel sebagai relasi membuat operasi seperti JOIN dan proyeksi punya dasar matematis yang jelas.` },
      { judul: 'Buktikan pentingnya transitivitas pada pengurutan',
        isi: `Buat fungsi pembanding yang **sengaja tidak transitif** — misalnya batu-gunting-kertas, di mana A mengalahkan B, B mengalahkan C, tetapi C mengalahkan A.

Coba urutkan daftar dengan pembanding itu. Hasilnya **tidak masuk akal**, dan bisa berbeda tergantung urutan awal.

Ini bukan sekadar teori: fungsi pembanding yang cacat pernah menyebabkan program mati di pustaka standar C++.` },
      { judul: 'Hitung tutupan transitif',
        isi: `Dari relasi "prasyarat mata kuliah", cari **semua** mata kuliah yang harus diambil sebelum sebuah mata kuliah — termasuk prasyarat dari prasyaratnya.

Itulah tutupan transitif, dan algoritmanya sederhana: ulangi menambah pasangan sampai tidak ada yang bisa ditambah lagi.

Terpakai untuk urutan pemasangan paket, ketergantungan tugas, dan pengecekan siklus.` }
    ],
    cek: [
      'Keempat pemeriksa sifatmu memberi jawaban benar untuk relasi yang sudah kamu ketahui',
      'Pengurutan dengan pembanding tidak transitif memberi hasil yang tidak konsisten',
      'Tutupan transitif prasyaratmu memuat prasyarat tidak langsung'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Relasi** adalah konsep yang menggambarkan **hubungan antara elemen-elemen dari dua himpunan**.

Slide kuliah menyebutkan alasan kenapa ini penting bagi kita: **dalam informatika, konsep ini dipakai dalam pemodelan basis data, graf, dan logika pemrograman.** Kata "relasional" pada *basis data relasional* berasal langsung dari sini.

**Hasil kali Cartesian**

Sebelum relasi, kenali dulu **A × B**: himpunan **semua** pasangan berurutan (a, b) dengan a dari A dan b dari B.

Kalau A = {1, 2, 3} dan B = {a, b}, maka:

A × B = {(1,a), (2,a), (3,a), (1,b), (2,b), (3,b)}

Jumlahnya selalu **|A| × |B|** — di sini 3 × 2 = 6.

**Definisi relasi**

**Relasi R dari A ke B adalah subset dari A × B.** Itu saja.

Jadi relasi bukan hal baru — ia sekadar **sebagian** dari semua pasangan yang mungkin. Kalau (x, y) ∈ R, dikatakan **x berelasi dengan y**.

Dari A × B di atas, ini semua relasi yang sah:

- R1 = {(1,a), (1,b)}
- R2 = {(1,a), (2,a), (3,a)}
- R5 = ∅ — **himpunan kosong juga relasi yang sah**
- R4 = seluruh A × B — **ini juga relasi**

Tetapi R6 = {(a,1), (2,a)} **bukan** relasi dari A ke B, karena (a,1) ∉ A × B — urutannya terbalik.

**Relasi biner atas satu himpunan**

Kalau A = B, relasinya disebut **relasi biner atas himpunan A**. Ini yang paling sering muncul. Contoh atas bilangan bulat ℤ:

- R = {(a,b) | a < b}
- R = {(a,b) | a = b atau a = −b}
- R = {(a,b) | a = b + 1}
- R = {(a,b) | a habis membagi b}

**Operasi pada relasi**

Karena relasi adalah himpunan, **semua operasi himpunan berlaku**: irisan (∩), gabungan (∪), beda setangkup (⊕), selisih (−), dan komplemen terhadap A × A.

**Tiga sifat relasi yang wajib dikuasai**

Untuk relasi biner R atas himpunan A:

- **Refleksif** — **setiap** elemen berelasi dengan dirinya sendiri: (a,a) ∈ R untuk semua a ∈ A.
- **Simetris** — kalau (a,b) ∈ R, maka (b,a) ∈ R juga.
- **Transitif** — kalau (a,b) ∈ R dan (b,c) ∈ R, maka (a,c) ∈ R.

Relasi yang memenuhi ketiganya sekaligus disebut **relasi ekuivalensi**, dan ia membagi himpunan menjadi kelompok-kelompok yang saling lepas.

Perhatikan kata **"setiap"** pada refleksif. Satu elemen saja yang tidak berelasi dengan dirinya sudah membatalkan sifat ini — dan inilah kesalahan tersering.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# A x B: SEMUA pasangan yang mungkin\nA = {1, 2, 3}\nB = {"a", "b"}\nAxB = {(x, y) for x in A for y in B}\n# 6 pasangan = |A| x |B| = 3 x 2\n\n# Relasi = SEBAGIAN dari A x B\nR1 = {(1, "a"), (1, "b")}          # sah\nR5 = set()                          # sah -- himpunan kosong\nR6 = {("a", 1)}                     # BUKAN relasi dari A ke B\n\nprint(R1 <= AxB)   # True\nprint(R6 <= AxB)   # False -- urutannya terbalik',
      penjelasan: `
Perhatikan bahwa **relasi bukan struktur baru** — ia sekadar **himpunan bagian** dari A × B. Operator \`<=\` pada himpunan Python berarti "subset dari", dan itu persis definisi relasi.

Yang sering mengejutkan: **himpunan kosong adalah relasi yang sah**. Ia memenuhi definisi, karena himpunan kosong adalah subset dari himpunan apa pun. Artinya "tidak ada satu pun yang berelasi" tetap merupakan sebuah relasi.

Begitu pula **seluruh A × B** adalah relasi yang sah, yaitu keadaan "semuanya berelasi dengan semuanya".

Sekarang kenapa R6 gagal. Pasangan berurutan itu **berurutan** — (a, 1) dan (1, a) adalah dua benda berbeda. Karena A × B hanya memuat pasangan dengan elemen A di depan, (a, 1) tidak ada di dalamnya. Relasi dari A ke B **tidak sama** dengan relasi dari B ke A.

Ini bukan kerewelan notasi. Di basis data, "mahasiswa mengambil mata kuliah" berbeda arah dari "mata kuliah diambil mahasiswa", dan foreign key hanya menunjuk satu arah. Di graf, ini persis perbedaan **graf berarah** dan **graf tak berarah**.

Perhatikan juga jumlahnya: kalau |A| = 3 dan |B| = 2, maka A × B punya 6 pasangan, sehingga **banyaknya relasi yang mungkin adalah 2^6 = 64** — sebab tiap pasangan boleh ikut atau tidak. Untuk relasi biner atas himpunan berukuran n, jumlahnya 2^(n²), yang tumbuh sangat cepat.
`
    },
    {
      bahasa: 'python',
      kode: '# Sifat relasi: perhatikan kata "SETIAP" dan "SELALU"\n\nA = {1, 2, 3}\n\ndef refleksif(R, A):\n    return all((a, a) in R for a in A)      # SETIAP elemen\n\ndef simetris(R):\n    return all((b, a) in R for (a, b) in R)\n\ndef transitif(R):\n    return all((a, d) in R\n               for (a, b) in R for (c, d) in R if b == c)',
      penjelasan: `
Ketiga definisi ini terlihat sederhana, tetapi **kuantornya** yang sering membuat orang salah. Kamu sudah bertemu kuantor ini di Logika Informatika.

**Refleksif memakai "untuk setiap".** Jadi memeriksa satu-dua elemen tidak cukup — kamu harus memeriksa **seluruh** anggota A. Satu elemen yang tidak berelasi dengan dirinya sendiri langsung membatalkan sifat ini.

Contoh jebakan: R = {(1,1), (2,2)} atas A = {1,2,3}. Terlihat refleksif sekilas, tetapi (3,3) tidak ada, jadi **tidak refleksif**.

**Simetris memakai implikasi**, bukan keharusan mutlak: *jika* (a,b) ada, *maka* (b,a) harus ada. Akibatnya himpunan kosong **simetris secara hampa** — tidak ada pasangan yang melanggarnya. Hal yang sama berlaku untuk transitif.

Ini disebut **benar secara hampa** (*vacuously true*), dan ia sering keluar di soal karena terasa melawan naluri.

**Transitif** paling merepotkan diperiksa manual. Kamu harus mencari **setiap** rantai a → b → c, lalu memastikan jalan pintas a → c juga ada. Satu rantai yang jalan pintasnya hilang sudah membatalkan.

Perhatikan bahwa ketiganya **saling bebas** — sebuah relasi bisa punya satu, dua, ketiganya, atau tidak sama sekali. Contoh nyata yang layak diingat:

- **"sama dengan"** — refleksif, simetris, transitif. Inilah **relasi ekuivalensi**.
- **"kurang dari"** — transitif saja. Tidak refleksif karena a < a salah, tidak simetris karena a < b tidak berarti b < a.
- **"saudara kandung"** — simetris dan transitif, tetapi **tidak refleksif**, karena orang bukan saudara kandung dirinya sendiri.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Relasi: operasi & pemeriksaan sifat
# ============================================

A = {1, 2, 5, 6}
R1 = {(1,1), (2,2), (5,5), (6,6), (2,5)}
R2 = {(1,1), (2,2), (2,5), (1,2), (1,6), (5,6)}
AxA = {(a, b) for a in A for b in A}

def tampil(nama, s):
    print("  " + nama.ljust(16) + str(sorted(s)))

print("--- operasi relasi (contoh dari slide) ---")
tampil("R1 irisan R2", R1 & R2)
tampil("R1 gabung R2", R1 | R2)
tampil("R1 beda-stgkp", R1 ^ R2)      # symmetric difference
tampil("R1 - R2",      R1 - R2)
print("")

# CATATAN: slide menuliskan item terakhir sebagai AxA - (R1 irisan R2),
# tetapi jawaban yang tertera di slide hanya punya 8 pasangan.
# AxA - (R1 irisan R2) menghasilkan 13 pasangan, sedangkan
# AxA - (R1 gabung R2) menghasilkan tepat 8 dan COCOK.
# Kemungkinan simbolnya salah ketik, atau salah terbaca saat
# PDF-nya diekstrak. Yang benar secara hitungan adalah gabungan.
tampil("AxA-(R1&R2)", AxA - (R1 & R2))
tampil("AxA-(R1|R2)", AxA - (R1 | R2))
print("  jumlah: " + str(len(AxA - (R1 & R2))) + " vs " +
      str(len(AxA - (R1 | R2))) + "   (jawaban slide: 8)")


# ============================================
# Sifat relasi
# ============================================

def refleksif(R, S):
    return all((a, a) in R for a in S)

def simetris(R):
    return all((b, a) in R for (a, b) in R)

def transitif(R):
    return all((a, d) in R
               for (a, b) in R for (c, d) in R if b == c)

def periksa(nama, R, S):
    hasil = []
    hasil.append("refleksif" if refleksif(R, S) else "-")
    hasil.append("simetris" if simetris(R) else "-")
    hasil.append("transitif" if transitif(R) else "-")
    ekiv = refleksif(R, S) and simetris(R) and transitif(R)
    print("  " + nama.ljust(26) + "  ".join(h.ljust(10) for h in hasil) +
          ("  <- EKUIVALENSI" if ekiv else ""))

S = {1, 2, 3}
print("")
print("--- sifat relasi atas A = {1, 2, 3} ---")
print("  " + "relasi".ljust(26) + "refleksif   simetris    transitif")

periksa("sama dengan",        {(1,1),(2,2),(3,3)}, S)
periksa("kurang dari",        {(1,2),(1,3),(2,3)}, S)
periksa("{(1,1),(2,2)} saja", {(1,1),(2,2)}, S)
periksa("himpunan kosong",    set(), S)
periksa("semua pasangan",     {(a,b) for a in S for b in S}, S)
periksa("{(1,2),(2,1)}",      {(1,2),(2,1)}, S)

print("")
print("Perhatikan: {(1,1),(2,2)} TIDAK refleksif atas {1,2,3},")
print("karena (3,3) tidak ada. Refleksif menuntut SETIAP elemen.")
print("")
print("Himpunan kosong simetris DAN transitif secara hampa:")
print("tidak ada pasangan yang bisa melanggarnya.")`
  },

  output: `--- operasi relasi (contoh dari slide) ---
  R1 irisan R2    [(1, 1), (2, 2), (2, 5)]
  R1 gabung R2    [(1, 1), (1, 2), (1, 6), (2, 2), (2, 5), (5, 5), (5, 6), (6, 6)]
  R1 beda-stgkp   [(1, 2), (1, 6), (5, 5), (5, 6), (6, 6)]
  R1 - R2         [(5, 5), (6, 6)]

  AxA-(R1&R2)     [(1, 2), (1, 5), (1, 6), (2, 1), (2, 6), (5, 1), (5, 2), (5, 5), (5, 6), (6, 1), (6, 2), (6, 5), (6, 6)]
  AxA-(R1|R2)     [(1, 5), (2, 1), (2, 6), (5, 1), (5, 2), (6, 1), (6, 2), (6, 5)]
  jumlah: 13 vs 8   (jawaban slide: 8)

--- sifat relasi atas A = {1, 2, 3} ---
  relasi                    refleksif   simetris    transitif
  sama dengan               refleksif   simetris    transitif   <- EKUIVALENSI
  kurang dari               -           -           transitif
  {(1,1),(2,2)} saja        -           simetris    transitif
  himpunan kosong           -           simetris    transitif
  semua pasangan            refleksif   simetris    transitif   <- EKUIVALENSI
  {(1,2),(2,1)}             -           simetris    -

Perhatikan: {(1,1),(2,2)} TIDAK refleksif atas {1,2,3},
karena (3,3) tidak ada. Refleksif menuntut SETIAP elemen.

Himpunan kosong simetris DAN transitif secara hampa:
tidak ada pasangan yang bisa melanggarnya.`,

  kesalahanUmum: [
    {
      salah: 'Menyatakan sebuah relasi refleksif setelah memeriksa hanya sebagian elemen.',
      kenapa: 'Refleksif menuntut (a,a) ada untuk SETIAP anggota himpunan. Relasi {(1,1),(2,2)} atas {1,2,3} terlihat refleksif sekilas, tetapi (3,3) tidak ada sehingga sifat itu batal. Kesalahan ini sangat sering terjadi karena mata cenderung berhenti setelah menemukan beberapa pasangan yang cocok.',
      benar: 'Daftar dulu seluruh anggota himpunannya, lalu periksa satu per satu apakah pasangan dirinya ada. Satu yang hilang sudah cukup membatalkan.'
    },
    {
      salah: 'Menyangka himpunan kosong tidak bisa disebut simetris atau transitif.',
      kenapa: 'Kedua sifat itu berbentuk implikasi: jika ada pasangan tertentu, maka pasangan lain harus ada. Pada himpunan kosong tidak ada pasangan sama sekali, sehingga tidak ada yang bisa melanggarnya. Ini disebut benar secara hampa, dan terasa melawan naluri sehingga sering keluar di soal.',
      benar: 'Ingat bahwa implikasi dengan premis yang selalu salah bernilai benar. Himpunan kosong simetris dan transitif, tetapi tidak refleksif kecuali himpunan induknya juga kosong.'
    },
    {
      salah: 'Menganggap relasi dari A ke B sama dengan relasi dari B ke A.',
      kenapa: 'Pasangan berurutan itu berurutan, sehingga (a,1) dan (1,a) adalah dua benda berbeda. Relasi dari A ke B hanya memuat pasangan dengan elemen A di depan. Salah paham ini merembet ke basis data, di mana foreign key hanya menunjuk satu arah, dan ke graf berarah.',
      benar: 'Perhatikan urutan pada setiap pasangan. Kalau elemen pertama bukan anggota himpunan asal, pasangan itu tidak sah.'
    },
    {
      salah: 'Menyalin jawaban contoh dari slide tanpa memeriksa hitungannya.',
      kenapa: 'Slide bisa salah ketik, dan simbol matematika mudah terbaca keliru. Pada contoh operasi relasi di materi ini, jawaban yang tertera di slide ternyata cocok dengan komplemen gabungan, bukan komplemen irisan seperti rumus yang tertulis. Menyalinnya bulat-bulat berarti ikut membawa kesalahannya ke ujian.',
      benar: 'Hitung ulang sendiri, terutama untuk operasi himpunan yang mudah diperiksa. Kalau hasilmu berbeda dari slide, periksa jumlah anggotanya lebih dulu sebagai petunjuk cepat.'
    }
  ],

  analogi: `Bayangkan daftar hadir undangan pernikahan.

**A × B** adalah **semua kemungkinan pasangan duduk**: setiap tamu dari keluarga mempelai pria dipasangkan dengan setiap meja. Kalau ada 50 tamu dan 10 meja, itu 500 kemungkinan.

**Relasi** adalah **denah tempat duduk yang benar-benar dipakai** — sebagian kecil dari 500 kemungkinan tadi. Denah kosong (belum diatur) tetap sebuah denah, dan denah "semua orang boleh duduk di mana saja" juga sebuah denah.

Untuk **sifat relasi**, bayangkan relasi "berteman" di antara sekelompok orang:

- **Refleksif** — *"setiap orang berteman dengan dirinya sendiri"*. Terdengar aneh, tapi itulah tuntutannya. Dan perhatikan kata **setiap**: kalau ada satu orang saja yang tidak dihitung berteman dengan dirinya, sifat ini batal.
- **Simetris** — *"kalau A berteman dengan B, maka B berteman dengan A"*. Pertemanan biasanya begini. Tetapi relasi **"mengikuti"** di media sosial **tidak simetris** — kamu bisa mengikuti seseorang tanpa diikuti balik.
- **Transitif** — *"teman dari temanku adalah temanku"*. Ini yang paling sering **gagal** di dunia nyata, dan itu justru contoh bagus: pertemanan umumnya **bukan** relasi transitif.

Relasi **"tinggal di kota yang sama"** memenuhi ketiganya, dan lihat akibatnya: ia **membagi orang menjadi kelompok-kelompok yang rapi dan tidak tumpang tindih** — satu kelompok per kota. Itulah yang dilakukan relasi ekuivalensi.`,

  latihan: [
    'Diberikan A = {1,2,3} dan B = {x,y}. Tuliskan seluruh anggota A x B, lalu hitung ada berapa relasi berbeda yang mungkin dari A ke B.',
    'Untuk A = {1,2,5,6} dengan R1 dan R2 seperti di materi, hitung sendiri R1 irisan R2, R1 gabung R2, beda setangkupnya, dan selisihnya. Cocokkan dengan hasil di materi.',
    'Periksa sifat refleksif, simetris, dan transitif untuk tiap relasi atas himpunan {1,2,3} berikut: {(1,1),(2,2),(3,3),(1,2)}, {(1,2),(2,1),(1,1)}, dan {(1,2),(2,3)}.',
    'Jelaskan kenapa himpunan kosong bersifat simetris dan transitif tetapi tidak refleksif atas himpunan tak kosong. Gunakan istilah benar secara hampa.',
    'Beri satu contoh relasi dari kehidupan sehari-hari yang simetris tetapi tidak transitif, dan satu yang transitif tetapi tidak simetris.',
    'Jelaskan kenapa relasi ekuivalensi selalu membagi himpunan menjadi kelompok-kelompok yang saling lepas. Gunakan contoh "tinggal di kota yang sama".'
  ]
});

TOPICS.push({
  id: 'matdas-fungsi',
  judul: 'Fungsi, Komposisi & Invers',
  kategori: 'matematika-dasar',
  tag: ['fungsi', 'domain', 'kodomain', 'range', 'komposisi', 'invers', 'bijektif'],
  ringkas: 'Relasi dengan satu aturan tambahan yang membuatnya jauh lebih berguna.',

  fungsi: `**Memahami pemetaan satu arah — dan kapan ia bisa dibalik.**

Konsep fungsi matematis menjelaskan banyak hal di pemrograman:

- **Hashing** — fungsi yang **tidak bisa dibalik**, dan itulah gunanya untuk kata sandi
- **Enkripsi** — fungsi yang **bisa dibalik** kalau punya kuncinya
- **Fungsi murni** — hasil yang sama untuk masukan yang sama, dan itu membuatnya bisa diuji
- **Komposisi** — merangkai transformasi data, dasar dari pipeline pengolahan
- **Logika Fuzzy** — Tsukamoto menuntut fungsi keanggotaan yang **bisa dibalik**, dan itulah kenapa ia harus monoton

Sifat yang paling terpakai: **injektif** berarti tidak ada dua masukan berbeda memberi keluaran sama.

Kalau fungsi pengenalmu tidak injektif, dua data berbeda mendapat pengenal yang sama — dan itu bug yang sangat sulit dilacak.`,

  praktik: {
    tujuan: `Kamu bisa memeriksa apakah sebuah fungsi injektif dan surjektif, menyusun komposisi, dan tahu kapan invers bisa dibuat.`,
    alat: [
      'Python 3'
    ],
    langkah: [
      { judul: 'Periksa injektif dengan menghitung',
        isi: `Fungsi injektif kalau tidak ada dua masukan berbeda yang memberi keluaran sama.

Cara cepat di Python: bandingkan \`len(set(hasil))\` dengan \`len(hasil)\`. Kalau sama, tidak ada tabrakan.

Uji pada beberapa fungsi: \`x*2\` injektif, \`x*x\` tidak — karena 2 dan negatif 2 memberi hasil sama.` },
      { judul: 'Periksa surjektif terhadap kodomainnya',
        isi: `Surjektif berarti **setiap** nilai di kodomain tercapai oleh sedikitnya satu masukan.

Ini bergantung pada kodomain yang kamu tetapkan. \`x*x\` dari bilangan bulat ke bilangan bulat **tidak** surjektif, tetapi ke bilangan kuadrat sempurna ia surjektif.

Jadi selalu sebutkan kodomainnya saat berbicara tentang surjektif.` },
      { judul: 'Buat invers hanya kalau bijektif',
        isi: `Fungsi punya invers **hanya kalau** ia injektif **dan** surjektif — disebut bijektif.

Coba buat invers dari \`x*x\` dan lihat masalahnya: akar dari 4 bisa 2 atau negatif 2, dan tidak ada dasar memilih.

Inilah persoalan yang sama persis dengan **Tsukamoto** di Logika Fuzzy, yang menuntut himpunan monoton agar pembalikannya tunggal.` },
      { judul: 'Susun komposisi dan perhatikan urutannya',
        isi: `\`(f ∘ g)(x)\` berarti \`f(g(x))\` — g dijalankan **dulu**.

Uji dengan \`f(x) = x + 1\` dan \`g(x) = x * 2\`. Hitung \`f(g(3))\` dan \`g(f(3))\`.

Hasilnya berbeda: 7 dan 8. **Komposisi tidak komutatif**, dan itu sama dengan urutan transformasi data di pipeline.` },
      { judul: 'Hubungkan dengan hashing',
        isi: `Fungsi hash sengaja dibuat **tidak bisa dibalik** — itulah gunanya untuk kata sandi.

Ia juga **tidak injektif**, karena keluarannya berukuran tetap sementara masukannya tak terbatas. Dua masukan berbeda **pasti** bisa memberi hasil sama; itulah **tabrakan**.

Yang dijamin fungsi hash yang baik bukan ketiadaan tabrakan, melainkan bahwa **menemukannya sangat sulit**.` },
      { judul: 'Terapkan pada fungsi pengenal',
        isi: `Buat fungsi yang menghasilkan pengenal dari data mahasiswa, misalnya dari nama dan tahun masuk.

Uji dengan seribu data acak: apakah ada dua yang menghasilkan pengenal sama?

Kalau ada, fungsimu tidak injektif — dan itu berarti dua mahasiswa bisa tertukar. Perbaiki dengan menambah bagian yang pasti unik.` }
    ],
    cek: [
      'Pemeriksa injektifmu benar menolak fungsi kuadrat pada bilangan bulat',
      'Komposisi f setelah g memberi hasil berbeda dari g setelah f',
      'Fungsi pengenal buatanmu tidak menghasilkan tabrakan pada seribu data uji'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Fungsi adalah relasi dengan satu syarat tambahan.**

Slide kuliah merumuskannya begini: fungsi dari A ke B, ditulis **f : A → B**, adalah aturan yang memasangkan **setiap** elemen A dengan **tepat satu** elemen B.

Dua kata itulah kuncinya, dan keduanya menyaring hal yang berbeda:

- **Setiap** — tidak boleh ada anggota A yang tidak punya pasangan.
- **Tepat satu** — tidak boleh ada anggota A yang punya dua pasangan atau lebih.

Perhatikan bahwa syarat ini **hanya berlaku ke arah A**. Anggota B boleh saja tidak dipasangkan, dan boleh juga dipasangkan oleh banyak anggota A sekaligus.

**Istilah yang wajib dibedakan**

- **Domain** (daerah asal) — himpunan A. Semua yang boleh dimasukkan.
- **Kodomain** (daerah kawan) — himpunan B. Semua yang mungkin jadi keluaran.
- **Range** (daerah hasil), ditulis Ran(f) — **hanya anggota B yang benar-benar terpakai**. Selalu berlaku Ran(f) ⊆ B.

**Kodomain dan range sering tertukar.** Untuk f(x) = x² dengan domain dan kodomain bilangan riil: kodomainnya seluruh ℝ, tetapi range-nya hanya bilangan tak negatif, karena kuadrat tidak pernah negatif.

**Operasi fungsi**

Kalau ada f(x) dan g(x):

- **(f + g)(x) = f(x) + g(x)**
- **(f − g)(x) = f(x) − g(x)**
- **(f · g)(x) = f(x) · g(x)**
- **(f / g)(x) = f(x) / g(x)**, dengan syarat **g(x) ≠ 0**

**Komposisi fungsi**

**(f ∘ g)(x) = f(g(x))** — kerjakan **g dulu**, hasilnya masukkan ke f.

Inilah bagian yang paling sering salah. Notasi f ∘ g dibaca dari **kanan ke kiri**: yang di sebelah kanan dikerjakan lebih dahulu. Dan **komposisi tidak komutatif** — pada umumnya f ∘ g ≠ g ∘ f.

**Fungsi invers**

Fungsi f : A → B dikatakan **dapat dibalik** bila kebalikannya juga merupakan fungsi. Invers-nya ditulis **f⁻¹**, dan berlaku:

f⁻¹(f(x)) = x

Syaratnya: f harus **bijektif**, yaitu sekaligus:

- **Injektif** (satu-satu) — tidak ada dua masukan berbeda yang menghasilkan keluaran sama
- **Surjektif** (onto) — setiap anggota kodomain terpakai, jadi range = kodomain

Kenapa harus bijektif? Kalau f tidak injektif, misalnya f(2) = 4 dan f(−2) = 4, maka f⁻¹(4) bingung harus menjawab 2 atau −2 — dan "tepat satu" dilanggar, sehingga kebalikannya bukan fungsi.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Relasi biasa -> BUKAN fungsi\nR = {(1, "a"), (1, "b"), (2, "a")}\n#     ^^^^^^^^^^^^^^^^^^^^ 1 punya DUA pasangan\n\n# Relasi lain -> juga BUKAN fungsi\nR2 = {(1, "a"), (2, "b")}          # atas A = {1, 2, 3}\n#                                   3 TIDAK punya pasangan\n\n# Fungsi: setiap anggota A tepat satu pasangan\nf = {1: "a", 2: "b", 3: "a"}       # sah -- "a" boleh dipakai dua kali',
      penjelasan: `
Perhatikan bahwa **dict Python adalah perwujudan langsung dari definisi fungsi**, dan itu bukan kebetulan.

Sebuah dict **tidak bisa** punya kunci ganda — kalau kamu menulis \`{1: "a", 1: "b"}\`, yang tersimpan hanya yang terakhir. Itu persis syarat **"tepat satu"**.

Sekarang perhatikan asimetri yang sering luput. Pada \`f = {1:"a", 2:"b", 3:"a"}\`:

- Nilai \`"a"\` dipakai **dua kali**, oleh kunci 1 dan 3. **Ini sah.** Fungsi boleh memasangkan banyak masukan ke satu keluaran.
- Tetapi satu kunci **tidak boleh** punya dua nilai.

Jadi aturannya berat sebelah: **banyak ke satu boleh, satu ke banyak tidak boleh.**

Cara mengujinya secara grafis adalah **uji garis tegak**: tarik garis vertikal di mana pun pada grafik. Kalau garis itu memotong kurva lebih dari sekali, itu bukan fungsi. Lingkaran misalnya bukan fungsi, karena satu nilai x memotong dua titik y.

Kaitannya dengan invers langsung terlihat dari sini. Fungsi \`f\` di atas **tidak punya invers**, karena \`f⁻¹("a")\` bingung harus menjawab 1 atau 3. Untuk bisa dibalik, "banyak ke satu" tadi harus dilarang juga — dan itulah arti **injektif**.

Ujinya secara grafis adalah **uji garis mendatar**: kalau ada garis horizontal yang memotong kurva lebih dari sekali, fungsinya tidak injektif sehingga tidak punya invers.
`
    },
    {
      bahasa: 'python',
      kode: '# (f o g)(x) = f(g(x))  -- KANAN dikerjakan DULU\n\ndef f(x): return x + 3\ndef g(x): return x * 2\n\n# f o g : g dulu, lalu f\nprint(f(g(5)))     # g(5)=10, lalu f(10)=13\n\n# g o f : f dulu, lalu g\nprint(g(f(5)))     # f(5)=8,  lalu g(8)=16\n\n# 13 != 16  -> komposisi TIDAK komutatif',
      penjelasan: `
Arah pembacaan inilah yang paling sering salah, dan akibatnya jawaban ujian meleset seluruhnya.

**(f ∘ g)(x) berarti f(g(x))** — yang **di sebelah kanan** dikerjakan **lebih dulu**. Notasinya memang terasa terbalik dari cara membaca biasa.

Cara mengingatnya: tulisan \`f(g(x))\` dibaca dari **dalam ke luar**, sama seperti kamu menghitung \`(2 + 3) × 4\` — kurung terdalam dulu. Yang paling dekat dengan \`x\` adalah yang paling dahulu bekerja.

Perhatikan hasilnya: 13 dan 16 **berbeda**. Ini membuktikan bahwa **komposisi tidak komutatif** — urutan menentukan hasil.

Contoh sehari-hari yang mudah diingat: **"pakai kaus kaki" lalu "pakai sepatu"** memberi hasil yang sangat berbeda dari urutan sebaliknya. Operasinya sama, urutannya beda, hasilnya beda.

Meski begitu, komposisi bersifat **asosiatif**: (f ∘ g) ∘ h sama dengan f ∘ (g ∘ h). Jadi kalau ada tiga fungsi berurutan, pengelompokannya bebas — yang tidak boleh diubah hanyalah **urutannya**.

Kaitannya dengan invers: **f⁻¹ ∘ f = fungsi identitas**. Artinya membalik lalu menerapkan kembali mengembalikanmu ke titik awal. Ini juga alasan kenapa invers dari komposisi urutannya **terbalik**:

(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹

Masuk akal kalau dibayangkan: kalau kamu memakai kaus kaki lalu sepatu, membukanya harus sepatu dulu baru kaus kaki.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Fungsi: domain, kodomain, range
# ============================================

A = {1, 2, 3, 4}
B = {"a", "b", "c", "d", "e"}

f = {1: "a", 2: "b", 3: "a", 4: "c"}

print("--- f : A -> B ---")
print("  domain   (A)      :", sorted(A))
print("  kodomain (B)      :", sorted(B))
print("  range    Ran(f)   :", sorted(set(f.values())))
print("  -> 'd' dan 'e' ada di kodomain tapi TIDAK di range")


def fungsi_sah(pasangan, domain):
    """Cek 'setiap' dan 'tepat satu'."""
    asal = [a for a, b in pasangan]
    setiap = set(asal) == set(domain)
    tepat_satu = len(asal) == len(set(asal))
    return setiap, tepat_satu

print("")
print("--- apakah relasi ini fungsi? ---")
uji = [
    ("{(1,a),(1,b),(2,a)}", {(1,"a"), (1,"b"), (2,"a")}, {1, 2}),
    ("{(1,a),(2,b)} atas {1,2,3}", {(1,"a"), (2,"b")}, {1, 2, 3}),
    ("{(1,a),(2,b),(3,a)}", {(1,"a"), (2,"b"), (3,"a")}, {1, 2, 3}),
]
for nama, R, dom in uji:
    setiap, satu = fungsi_sah(R, dom)
    if setiap and satu:
        ket = "FUNGSI"
    elif not setiap:
        ket = "bukan -- ada anggota domain tanpa pasangan"
    else:
        ket = "bukan -- ada anggota domain dengan >1 pasangan"
    print("  " + nama.ljust(30) + ket)


# ============================================
# Operasi & komposisi
# ============================================

def f1(x): return x + 3
def g1(x): return x * 2

print("")
print("--- operasi fungsi pada x = 5 ---")
x = 5
print("  (f+g)(5) =", f1(x) + g1(x))
print("  (f-g)(5) =", f1(x) - g1(x))
print("  (f.g)(5) =", f1(x) * g1(x))
print("  (f/g)(5) =", f1(x) / g1(x), " (syarat g(x) != 0)")

print("")
print("--- komposisi: KANAN dikerjakan DULU ---")
print("  (f o g)(5) = f(g(5)) = f(10) =", f1(g1(x)))
print("  (g o f)(5) = g(f(5)) = g(8)  =", g1(f1(x)))
print("  -> berbeda, jadi komposisi TIDAK komutatif")

print("")
print("--- asosiatif: pengelompokan bebas ---")
def h1(x): return x - 1
kiri = f1(g1(h1(x)))
kanan = f1(g1(h1(x)))
print("  (f o g) o h  (5) =", kiri)
print("  f o (g o h)  (5) =", kanan)
print("  -> sama, jadi komposisi ASOSIATIF")


# ============================================
# Invers: hanya untuk fungsi bijektif
# ============================================

print("")
print("--- bisakah dibalik? ---")

def bisa_dibalik(f):
    nilai = list(f.values())
    return len(nilai) == len(set(nilai))     # injektif?

kandidat = [
    ("{1:a, 2:b, 3:a}", {1:"a", 2:"b", 3:"a"}),
    ("{1:a, 2:b, 3:c}", {1:"a", 2:"b", 3:"c"}),
]
for nama, fn in kandidat:
    if bisa_dibalik(fn):
        inv = {v: k for k, v in fn.items()}
        print("  " + nama.ljust(18) + "BISA  -> invers: " + str(inv))
    else:
        print("  " + nama.ljust(18) +
              "TIDAK -- dua masukan berbagi keluaran yang sama,")
        print("  " + " " * 18 + "jadi inversnya tidak tahu harus menjawab apa")`
  },

  output: `--- f : A -> B ---
  domain   (A)      : [1, 2, 3, 4]
  kodomain (B)      : ['a', 'b', 'c', 'd', 'e']
  range    Ran(f)   : ['a', 'b', 'c']
  -> 'd' dan 'e' ada di kodomain tapi TIDAK di range

--- apakah relasi ini fungsi? ---
  {(1,a),(1,b),(2,a)}           bukan -- ada anggota domain dengan >1 pasangan
  {(1,a),(2,b)} atas {1,2,3}    bukan -- ada anggota domain tanpa pasangan
  {(1,a),(2,b),(3,a)}           FUNGSI

--- operasi fungsi pada x = 5 ---
  (f+g)(5) = 18
  (f-g)(5) = -2
  (f.g)(5) = 80
  (f/g)(5) = 0.8  (syarat g(x) != 0)

--- komposisi: KANAN dikerjakan DULU ---
  (f o g)(5) = f(g(5)) = f(10) = 13
  (g o f)(5) = g(f(5)) = g(8)  = 16
  -> berbeda, jadi komposisi TIDAK komutatif

--- asosiatif: pengelompokan bebas ---
  (f o g) o h  (5) = 11
  f o (g o h)  (5) = 11
  -> sama, jadi komposisi ASOSIATIF

--- bisakah dibalik? ---
  {1:a, 2:b, 3:a}   TIDAK -- dua masukan berbagi keluaran yang sama,
                    jadi inversnya tidak tahu harus menjawab apa
  {1:a, 2:b, 3:c}   BISA  -> invers: {'a': 1, 'b': 2, 'c': 3}`,

  kesalahanUmum: [
    {
      salah: 'Menukar kodomain dengan range.',
      kenapa: 'Kodomain adalah seluruh himpunan tujuan yang ditetapkan, sedangkan range hanya bagian yang benar-benar terpakai. Untuk f(x) = x kuadrat dengan kodomain bilangan riil, range-nya hanya bilangan tak negatif. Menukarnya membuat jawaban soal tentang surjektif jadi keliru, sebab surjektif justru berarti range sama dengan kodomain.',
      benar: 'Ingat bahwa range selalu subset dari kodomain. Kodomain ditetapkan saat fungsi didefinisikan, range dihitung dari hasilnya.'
    },
    {
      salah: 'Membaca f o g sebagai "kerjakan f dulu".',
      kenapa: 'Notasi komposisi dibaca dari kanan ke kiri, sehingga f o g berarti f(g(x)) dan g yang dikerjakan lebih dulu. Karena komposisi tidak komutatif, salah arah membuat seluruh jawaban meleset, bukan cuma sedikit.',
      benar: 'Tulis ulang menjadi bentuk f(g(x)) lalu kerjakan dari kurung terdalam, sama seperti menghitung ekspresi aritmetika biasa.'
    },
    {
      salah: 'Menganggap semua fungsi punya invers.',
      kenapa: 'Fungsi hanya bisa dibalik kalau bijektif. Kalau dua masukan berbeda menghasilkan keluaran sama, misalnya f(2) dan f(-2) sama-sama 4, maka inversnya bingung harus menjawab 2 atau -2. Kebalikannya melanggar syarat tepat satu, sehingga bukan fungsi.',
      benar: 'Periksa injektif lebih dulu dengan uji garis mendatar. Kalau tidak injektif, batasi domainnya supaya menjadi injektif, misalnya x kuadrat hanya untuk x tak negatif.'
    },
    {
      salah: 'Mengira fungsi tidak boleh memasangkan dua masukan ke keluaran yang sama.',
      kenapa: 'Yang dilarang adalah satu masukan punya dua keluaran, bukan sebaliknya. Fungsi konstan memasangkan seluruh domain ke satu nilai dan tetap fungsi yang sah. Salah paham ini membuat orang menolak fungsi yang sebenarnya benar.',
      benar: 'Ingat aturannya berat sebelah: banyak ke satu boleh, satu ke banyak tidak boleh. Uji garis tegak untuk memeriksa apakah sesuatu fungsi.'
    },
    {
      salah: 'Menulis invers dari komposisi dengan urutan yang sama, misalnya (f o g) invers = f invers o g invers.',
      kenapa: 'Urutannya harus dibalik menjadi g invers o f invers. Membaliknya dengan urutan semula memberi hasil yang salah kecuali kedua fungsi kebetulan komutatif.',
      benar: 'Bayangkan memakai kaus kaki lalu sepatu. Untuk melepasnya, sepatu dulu baru kaus kaki. Yang terakhir dipakai adalah yang pertama dilepas.'
    }
  ],

  analogi: `Bayangkan mesin penjual minuman otomatis.

**Domain** adalah **semua tombol yang ada**. **Kodomain** adalah **semua jenis minuman yang mungkin ada di dalam mesin**. **Range** adalah **minuman yang benar-benar keluar** kalau kamu mencoba semua tombol.

Kalau ada dua jenis minuman yang stoknya habis dan tidak pernah keluar, mereka tetap ada di kodomain tetapi **tidak ada di range**.

Sekarang syarat fungsi:

- **"Setiap"** — tidak boleh ada tombol yang ditekan lalu tidak terjadi apa-apa.
- **"Tepat satu"** — tidak boleh ada tombol yang kadang mengeluarkan teh, kadang kopi. Mesin seperti itu **rusak**, dan itulah tepatnya arti "bukan fungsi".

Tetapi **dua tombol berbeda yang sama-sama mengeluarkan teh itu wajar** — mungkin tombol 3 dan tombol 7 memang diisi teh yang sama. Fungsi tidak melarangnya.

Nah, di situlah letak masalah **invers**. Kalau ada yang menyodorkan sekaleng teh dan bertanya *"tombol mana yang tadi ditekan?"*, kamu **tidak bisa menjawab pasti** — bisa tombol 3, bisa tombol 7. Mesin ini tidak bisa dibalik.

Untuk bisa dibalik, tiap tombol harus mengeluarkan minuman yang **berbeda-beda** (injektif), dan **semua** minuman di kodomain harus ada tombolnya (surjektif). Barulah dari minuman kamu bisa menyimpulkan tombolnya dengan pasti.

Untuk **komposisi**, bayangkan dua mesin berjajar: keluaran mesin pertama dimasukkan ke mesin kedua. **f ∘ g** berarti **g mesin pertamanya**. Dan jelas urutan berpengaruh: mesin penggiling lalu mesin penyeduh menghasilkan kopi; mesin penyeduh lalu mesin penggiling menghasilkan kekacauan.`,

  latihan: [
    'Diberikan f : A -> B dengan A = {1,2,3,4}, B = {a,b,c,d,e}, dan f = {1:a, 2:b, 3:a, 4:c}. Sebutkan domain, kodomain, dan range-nya, lalu jelaskan kenapa f tidak surjektif.',
    'Tentukan mana yang fungsi dan mana yang bukan, beserta alasannya: {(1,a),(2,b),(3,b)}, {(1,a),(1,b)}, dan {(1,a),(2,b)} atas domain {1,2,3}.',
    'Diberikan f(x) = 2x + 1 dan g(x) = x kuadrat. Hitung (f o g)(3) dan (g o f)(3), lalu jelaskan kenapa hasilnya berbeda.',
    'Jelaskan kenapa f(x) = x kuadrat atas bilangan riil tidak punya invers, lalu tunjukkan bagaimana membatasi domainnya supaya punya.',
    'Diberikan f(x) = 3x - 6. Tentukan f invers, lalu buktikan bahwa f invers dari f(4) menghasilkan 4.',
    'Jelaskan kenapa (f o g) invers sama dengan g invers o f invers, bukan f invers o g invers. Gunakan analogi memakai dan melepas pakaian.'
  ]
});

TOPICS.push({
  id: 'matdas-limit',
  judul: 'Limit Fungsi & Limit Tak Hingga',
  kategori: 'matematika-dasar',
  tag: ['limit', 'mendekati', 'tak hingga', 'asimtot', 'bentuk tak tentu'],
  ringkas: 'Nilai yang didekati, bukan nilai yang dicapai — dan kenapa bedanya penting.',

  fungsi: `**Memahami perilaku sesuatu saat mendekati suatu titik atau membesar tanpa batas.**

Ini pondasi langsung dari analisis kompleksitas.

Terpakai di:

- **Big-O** — \`O(n²)\` berarti perilaku saat n **menuju tak hingga**, bukan pada n kecil
- **Membandingkan algoritma** — mana yang lebih baik untuk data besar
- **Menghindari pembagian nol** — memahami apa yang terjadi saat penyebut mendekati nol
- **Kekonvergenan** — kapan sebuah perhitungan berulang berhenti mendekat, dipakai di jaringan syaraf dan K-Means
- **Ketelitian numerik** — kenapa perhitungan tertentu meledak pada nilai tertentu

Yang paling langsung terpakai: **suku berorde tertinggi mengalahkan segalanya saat n membesar**.

Itulah kenapa \`3n² + 1000n + 50000\` disebut \`O(n²)\` — untuk n yang cukup besar, suku pertama menenggelamkan sisanya, betapa pun besar koefisiennya.`,

  praktik: {
    tujuan: `Kamu bisa membuktikan sendiri kenapa suku berorde tertinggi menang, dan bisa menghitung titik ketika algoritma yang secara teori lebih baik benar-benar mulai unggul.`,
    alat: [
      'Python 3',
      'matplotlib kalau tersedia, atau cetak tabel saja'
    ],
    langkah: [
      { judul: 'Hitung limit dengan tabel, bukan rumus',
        isi: `Untuk memahami \`lim (3n² + 1000n) / n²\` saat n menuju tak hingga, cetak nilainya untuk n = 10, 100, 1000, 10000, 100000.

Kamu akan melihat angkanya mendekati 3. Melihat prosesnya jauh lebih meyakinkan daripada menerima rumusnya.` },
      { judul: 'Buktikan suku tertinggi mengalahkan yang lain',
        isi: `Bandingkan \`n²\` dan \`1000n\` untuk n yang bertambah.

Pada n = 10, suku kedua **seratus kali lebih besar**. Pada n = 1000, keduanya sama. Pada n = 10000, suku pertama **sepuluh kali lebih besar**.

Cari titik potongnya sendiri. Ini menjelaskan kenapa konstanta diabaikan dalam Big-O — dan juga kenapa ia **tidak boleh** diabaikan untuk n kecil.` },
      { judul: 'Cari kapan algoritma yang lebih baik mulai unggul',
        isi: `Bandingkan \`n²\` dengan \`100 n log n\`.

Untuk n kecil, yang kedua **lebih lambat** meski secara teori lebih baik. Cari n berapa keduanya berpotongan.

Ini penjelasan nyata kenapa pustaka pengurutan memakai Insertion Sort untuk bagian kecil, dan baru beralih ke algoritma canggih untuk bagian besar.` },
      { judul: 'Lihat limit tak hingga pada pembagian',
        isi: `Cetak \`1/x\` untuk x = 1, 0.1, 0.01, 0.001, sampai 1e-15.

Angkanya membesar tanpa batas. Lalu coba \`1/0\` langsung — Python melempar \`ZeroDivisionError\`.

Bandingkan dengan float: \`1.0/0.0\` juga galat di Python, tetapi di C ia menghasilkan \`inf\`. Perbedaan ini penting saat memindahkan kode antar bahasa.` },
      { judul: 'Uji kekonvergenan sebuah barisan',
        isi: `Hitung barisan \`x = (x + 2/x) / 2\` mulai dari x = 1, berulang sepuluh kali.

Ia akan mendekati akar dua. Cetak selisihnya dengan nilai sebenarnya di tiap langkah.

Ini **metode Newton**, dan pola yang sama dipakai untuk menentukan kapan pelatihan jaringan syaraf boleh dihentikan.` },
      { judul: 'Hubungkan dengan pengukuran nyata',
        isi: `Ambil algoritma pengurutan kuadratik yang kamu tulis di topik Sorting.

Ukur waktunya untuk n = 1000, 2000, 4000, dan 8000. Setiap kali n berlipat dua, waktunya harus **berlipat sekitar empat kali**.

Kalau cocok, kamu baru saja mengukur \`O(n²)\` secara empiris — dan itu pembuktian yang jauh lebih meyakinkan daripada rumus.` }
    ],
    cek: [
      'Nilai perbandinganmu mendekati konstanta yang benar saat n membesar',
      'Kamu menemukan titik n ketika algoritma n log n mulai mengalahkan n kuadrat',
      'Waktu pengurutan kuadratikmu berlipat empat setiap n berlipat dua'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Limit bermakna "mendekati".** Itu kalimat pembuka slide kuliahnya, dan seluruh topik ini adalah penjabaran satu kata itu.

**Contoh pembuka dari slide: lari 100 meter**

Catatan waktu juara dunia sprint 100 m terus turun dari tahun ke tahun, tetapi **tidak pernah melewati 9 detik**. Kesimpulannya: limit waktu manusia untuk lari 100 m adalah sekitar 9 detik.

Perhatikan bahwa **belum tentu ada yang pernah mencapainya**. Limit adalah nilai yang **didekati**, bukan yang harus **dicapai**. Itulah inti seluruh gagasan ini.

**Notasi**

Ditulis:

lim f(x) untuk x → a = L

Dibaca: *"ketika x mendekati a, nilai f(x) mendekati L."*

**Kasus mudah: substitusi langsung**

Untuk f(x) = x² + 3, berapa limitnya ketika x → 2?

Cukup masukkan: f(2) = 2² + 3 = **7**. Kalau dihitung secara numeris dengan x yang makin dekat ke 2, hasilnya memang makin dekat ke 7.

Untuk fungsi yang **kontinu**, limit sama dengan nilai fungsinya. Substitusi langsung selesai.

**Kasus yang menarik: bentuk tak tentu**

Sekarang fungsi yang membuat topik ini perlu ada. Ambil f(x) = (x² − 1) / (x − 1), lalu cari limitnya untuk x → 1.

Substitusi langsung memberi **0/0** — fungsinya **tidak terdefinisi di x = 1**. Tetapi pertanyaannya bukan *"berapa nilainya di x = 1?"* melainkan *"nilai apa yang didekatinya ketika x mendekati 1?"*

Jalan keluarnya **penguraian**:

(x² − 1)/(x − 1) = (x−1)(x+1)/(x−1) = x + 1, untuk x ≠ 1

Sekarang substitusi bisa: **1 + 1 = 2**.

Perhatikan syarat **x ≠ 1** pada penguraian itu. Kita boleh mencoret (x−1) justru **karena** x tidak pernah benar-benar sama dengan 1 — ia hanya mendekat. Kalau x benar-benar 1, kita membagi dengan nol.

**Inilah kekuatan limit**: ia bisa memberi jawaban bermakna di titik yang fungsinya sendiri tidak terdefinisi.

**Sifat dasar limit**

Limit bersifat menyebar ke dalam operasi aritmetika: limit jumlah sama dengan jumlah limit, begitu pula selisih, hasil kali, dan hasil bagi — asalkan penyebutnya tidak nol.

**Limit tak hingga**

Ada dua hal berbeda yang namanya mirip, dan keduanya sering tertukar:

- **Limit menuju tak hingga** — x-nya yang membesar tanpa batas. Untuk y = 1/x: ketika x makin besar, y makin kecil mendekati **0**. Ditulis lim 1/x untuk x → ∞ = 0.
- **Limit yang bernilai tak hingga** — hasilnya yang membesar tanpa batas. Untuk y = 1/x²: ketika x mendekati 0, nilainya makin besar tanpa batas. Ditulis lim 1/x² untuk x → 0 = ∞.

Slide kuliah membahas keduanya dengan contoh yang sama, yaitu keluarga fungsi 1/x dan 1/x².

Perhatikan bahwa **∞ bukan bilangan**. Menulis hasilnya ∞ sebenarnya berarti *"tidak ada limitnya, dan cara ia gagal adalah dengan membesar tanpa batas"*.

**Kaitannya dengan informatika**

Gagasan "perilaku ketika n membesar tanpa batas" inilah yang mendasari **notasi Big-O**. Ketika kamu mengatakan sebuah algoritma O(n²), kamu sedang membicarakan limit perilakunya saat n → ∞, dan mengabaikan hal-hal yang tidak berpengaruh di batas itu.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Limit = nilai yang DIDEKATI, bukan yang dicapai\n\ndef f(x):\n    return (x**2 - 1) / (x - 1)      # tak terdefinisi di x = 1\n\nfor x in [0.9, 0.99, 0.999, 1.001, 1.01, 1.1]:\n    print(x, "->", f(x))\n\n# f(1) akan ERROR: division by zero\n# tapi nilainya jelas MENDEKATI 2 dari kedua sisi',
      penjelasan: `
Jalankan dan perhatikan polanya: dari kiri (0,9 → 0,999) dan dari kanan (1,1 → 1,001), nilainya sama-sama menuju **2**.

Padahal **f(1) sendiri tidak ada** — memanggilnya menghasilkan pembagian dengan nol.

Di situlah pembedaan yang menentukan: **limit bertanya soal perjalanan, bukan soal tujuan.** Nilai fungsi tepat di titik itu sama sekali tidak berpengaruh pada limitnya — bahkan tidak perlu ada.

Ini juga menjelaskan syarat **x ≠ 1** saat menguraikan:

(x² − 1)/(x − 1) = (x−1)(x+1)/(x−1) = x + 1

Pencoretan (x−1) hanya sah kalau (x−1) ≠ 0. Dan itu **selalu terpenuhi** dalam konteks limit, karena x mendekati 1 tanpa pernah menjadi 1. Kedua fungsi berbeda hanya di satu titik, dan titik itu justru satu-satunya yang tidak diperhitungkan limit.

Ada syarat penting yang sering dilewatkan: **limit ada hanya kalau kedua sisi memberi nilai yang sama.** Kalau dari kiri menuju 2 dan dari kanan menuju 5, maka limitnya **tidak ada**.

Contoh klasiknya fungsi tangga, atau |x|/x di x = 0 — dari kiri menuju −1, dari kanan menuju +1, jadi limitnya tidak ada. Itulah sebabnya tabel numeris seperti di atas selalu diisi dari **dua arah**.

Perhatikan juga bahwa tabel numeris **bukan bukti**, melainkan petunjuk. Ia bisa menyesatkan pada fungsi yang berperilaku aneh di dekat titik itu. Bukti yang sesungguhnya adalah penguraian aljabar, atau definisi epsilon-delta yang akan kamu temui di Kalkulus.
`
    },
    {
      bahasa: 'python',
      kode: '# DUA hal berbeda yang sama-sama disebut "limit tak hingga"\n\n# 1. x menuju tak hingga -> hasilnya BERHINGGA\n#    lim 1/x  untuk x -> inf  =  0\nfor x in [1, 10, 100, 1000, 100000]:\n    print(x, "->", 1/x)\n\n# 2. x menuju berhingga -> hasilnya TAK HINGGA\n#    lim 1/x^2  untuk x -> 0  =  inf\nfor x in [0.1, 0.01, 0.001]:\n    print(x, "->", 1/x**2)',
      penjelasan: `
Kedua hal ini punya nama yang mirip tetapi menjawab pertanyaan yang berbeda, dan slide kuliah membahas keduanya berurutan sehingga mudah tertukar.

**Yang pertama: x → ∞.** Yang membesar adalah **masukannya**. Pertanyaannya: *"kalau x sangat besar, f(x) mendekati berapa?"* Untuk 1/x, jawabannya **0**.

Perhatikan bahwa 1/x **tidak pernah benar-benar mencapai 0** untuk x berhingga mana pun. Ia hanya mendekat selamanya. Garis y = 0 yang didekati tanpa pernah disentuh itu disebut **asimtot mendatar**.

**Yang kedua: hasilnya → ∞.** Yang membesar adalah **keluarannya**. Pertanyaannya: *"apa yang terjadi pada f(x) ketika x mendekati 0?"* Untuk 1/x², jawabannya **membesar tanpa batas**.

Garis x = 0 yang didekati kurva tanpa pernah menyentuh disebut **asimtot tegak**.

Ada perbedaan halus yang layak diperhatikan antara 1/x dan 1/x² di dekat nol, dan slide memakai 1/x² bukan tanpa alasan:

- **1/x²** selalu **positif** di kedua sisi, karena kuadrat. Jadi dari kiri maupun kanan sama-sama menuju +∞, dan limitnya bisa disebut ∞.
- **1/x** menuju **−∞ dari kiri** dan **+∞ dari kanan**. Karena kedua sisi berbeda, limitnya di 0 sebenarnya **tidak ada** — meski keduanya sama-sama "tak hingga".

Terakhir, ingat bahwa **∞ bukan bilangan**. Menulis limitnya ∞ adalah cara singkat mengatakan *"limitnya tidak ada, dan cara ia gagal adalah dengan membesar tanpa batas"*. Karena itu ∞ tidak boleh diperlakukan seperti angka biasa — ∞ − ∞ dan ∞/∞ adalah **bentuk tak tentu**, sama seperti 0/0.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Limit: mendekati, bukan mencapai
# ============================================

# ---------- Kasus mudah: substitusi langsung ----------
def f1(x):
    return x**2 + 3

print("--- lim (x^2 + 3) untuk x -> 2 ---")
for x in [1.9, 1.99, 1.999, 2.001, 2.01, 2.1]:
    print("  x = " + format(x, "6.3f") + "   f(x) = " + format(f1(x), ".6f"))
print("  substitusi langsung: f(2) =", f1(2))


# ---------- Kasus 0/0: butuh penguraian ----------
def f2(x):
    return (x**2 - 1) / (x - 1)

print("")
print("--- lim (x^2-1)/(x-1) untuk x -> 1 ---")
print("  substitusi langsung -> 0/0, TAK TERDEFINISI")
for x in [0.9, 0.99, 0.999, 1.001, 1.01, 1.1]:
    print("  x = " + format(x, "6.3f") + "   f(x) = " + format(f2(x), ".6f"))

try:
    f2(1)
except ZeroDivisionError as e:
    print("  f(1) sendiri -> ERROR:", e)

print("")
print("  Penguraian: (x-1)(x+1)/(x-1) = x+1  untuk x != 1")
print("  Jadi limitnya = 1 + 1 = 2")


# ---------- Limit MENUJU tak hingga ----------
print("")
print("--- lim 1/x untuk x -> tak hingga ---")
for x in [1, 10, 100, 10000, 1000000]:
    print("  x = " + format(x, ">9,") + "   1/x = " + format(1/x, ".8f"))
print("  -> mendekati 0. Garis y=0 adalah ASIMTOT MENDATAR.")


# ---------- Limit yang BERNILAI tak hingga ----------
print("")
print("--- lim 1/x^2 untuk x -> 0 ---")
for x in [0.1, 0.01, 0.001, 0.0001]:
    print("  x = " + format(x, "8.4f") + "   1/x^2 = " +
          format(1/x**2, ">15,.0f"))
print("  -> membesar tanpa batas. Garis x=0 ASIMTOT TEGAK.")


# ---------- Kenapa 1/x berbeda dari 1/x^2 di titik 0 ----------
print("")
print("--- 1/x di dekat 0: dua sisi BERBEDA ---")
for x in [-0.01, -0.001, 0.001, 0.01]:
    print("  x = " + format(x, "8.4f") + "   1/x = " + format(1/x, ">12,.0f"))
print("  kiri  -> minus tak hingga")
print("  kanan -> plus tak hingga")
print("  -> kedua sisi berbeda, jadi limitnya TIDAK ADA")
print("")
print("  Bandingkan 1/x^2: kuadrat selalu positif,")
print("  jadi kedua sisi sama-sama menuju plus tak hingga.")


# ---------- Limit ada hanya bila kedua sisi sama ----------
print("")
print("--- lim |x|/x untuk x -> 0 ---")
for x in [-0.1, -0.001, 0.001, 0.1]:
    print("  x = " + format(x, "7.3f") + "   |x|/x = " + format(abs(x)/x, "5.1f"))
print("  kiri -> -1, kanan -> +1, jadi limitnya TIDAK ADA")`
  },

  output: `--- lim (x^2 + 3) untuk x -> 2 ---
  x =  1.900   f(x) = 6.610000
  x =  1.990   f(x) = 6.960100
  x =  1.999   f(x) = 6.996001
  x =  2.001   f(x) = 7.004001
  x =  2.010   f(x) = 7.040100
  x =  2.100   f(x) = 7.410000
  substitusi langsung: f(2) = 7

--- lim (x^2-1)/(x-1) untuk x -> 1 ---
  substitusi langsung -> 0/0, TAK TERDEFINISI
  x =  0.900   f(x) = 1.900000
  x =  0.990   f(x) = 1.990000
  x =  0.999   f(x) = 1.999000
  x =  1.001   f(x) = 2.001000
  x =  1.010   f(x) = 2.010000
  x =  1.100   f(x) = 2.100000
  f(1) sendiri -> ERROR: division by zero

  Penguraian: (x-1)(x+1)/(x-1) = x+1  untuk x != 1
  Jadi limitnya = 1 + 1 = 2

--- lim 1/x untuk x -> tak hingga ---
  x =         1   1/x = 1.00000000
  x =        10   1/x = 0.10000000
  x =       100   1/x = 0.01000000
  x =    10,000   1/x = 0.00010000
  x = 1,000,000   1/x = 0.00000100
  -> mendekati 0. Garis y=0 adalah ASIMTOT MENDATAR.

--- lim 1/x^2 untuk x -> 0 ---
  x =   0.1000   1/x^2 =             100
  x =   0.0100   1/x^2 =          10,000
  x =   0.0010   1/x^2 =       1,000,000
  x =   0.0001   1/x^2 =     100,000,000
  -> membesar tanpa batas. Garis x=0 ASIMTOT TEGAK.

--- 1/x di dekat 0: dua sisi BERBEDA ---
  x =  -0.0100   1/x =         -100
  x =  -0.0010   1/x =       -1,000
  x =   0.0010   1/x =        1,000
  x =   0.0100   1/x =          100
  kiri  -> minus tak hingga
  kanan -> plus tak hingga
  -> kedua sisi berbeda, jadi limitnya TIDAK ADA

  Bandingkan 1/x^2: kuadrat selalu positif,
  jadi kedua sisi sama-sama menuju plus tak hingga.

--- lim |x|/x untuk x -> 0 ---
  x = -0.100   |x|/x =  -1.0
  x = -0.001   |x|/x =  -1.0
  x =  0.001   |x|/x =   1.0
  x =  0.100   |x|/x =   1.0
  kiri -> -1, kanan -> +1, jadi limitnya TIDAK ADA`,

  kesalahanUmum: [
    {
      salah: 'Mengira limit selalu sama dengan nilai fungsi di titik itu.',
      kenapa: 'Keduanya sama hanya kalau fungsinya kontinu di titik tersebut. Justru kasus yang menarik adalah ketika fungsinya tidak terdefinisi di situ, seperti bentuk 0/0, dan limitnya tetap ada. Menyamakan keduanya membuat orang menyerah begitu substitusi menghasilkan pembagian nol.',
      benar: 'Perlakukan substitusi langsung sebagai percobaan pertama. Kalau hasilnya bentuk tak tentu, lanjutkan dengan penguraian atau pemfaktoran.'
    },
    {
      salah: 'Menyimpulkan limit hanya dari satu sisi saja.',
      kenapa: 'Limit ada hanya kalau pendekatan dari kiri dan dari kanan menuju nilai yang sama. Pada |x|/x di titik nol, kiri menuju -1 dan kanan menuju +1, sehingga limitnya tidak ada. Memeriksa satu sisi saja akan memberi jawaban yang terlihat rapi tetapi salah.',
      benar: 'Selalu isi tabel numeris dari dua arah, atau periksa limit kiri dan limit kanan secara terpisah lalu bandingkan.'
    },
    {
      salah: 'Memperlakukan tak hingga sebagai bilangan biasa yang bisa dioperasikan.',
      kenapa: 'Tak hingga bukan bilangan melainkan cara menggambarkan perilaku yang membesar tanpa batas. Akibatnya bentuk seperti tak hingga dikurangi tak hingga, atau tak hingga dibagi tak hingga, tidak punya nilai tertentu dan justru termasuk bentuk tak tentu seperti nol per nol.',
      benar: 'Baca hasil tak hingga sebagai pernyataan bahwa limitnya tidak ada dengan cara membesar tanpa batas. Untuk bentuk tak tentu, uraikan dulu ekspresinya.'
    },
    {
      salah: 'Menukar limit menuju tak hingga dengan limit yang bernilai tak hingga.',
      kenapa: 'Keduanya menjawab pertanyaan berbeda. Pada yang pertama, masukannya yang membesar dan hasilnya bisa saja berhingga, seperti 1/x yang menuju nol. Pada yang kedua, keluarannya yang membesar. Namanya mirip sehingga sering tertukar di ujian.',
      benar: 'Perhatikan letak lambang tak hingga: di bawah tanda limit berarti x yang membesar, di sebelah kanan tanda sama dengan berarti hasilnya yang membesar.'
    },
    {
      salah: 'Menganggap tabel numeris sebagai bukti bahwa limitnya bernilai tertentu.',
      kenapa: 'Tabel hanya menunjukkan beberapa titik, dan bisa menyesatkan pada fungsi yang berperilaku aneh di antara titik-titik itu. Fungsi yang berosilasi cepat di dekat nol bisa terlihat stabil kalau kebetulan titik ujinya jatuh di tempat yang sama.',
      benar: 'Pakai tabel sebagai petunjuk arah, lalu buktikan dengan penguraian aljabar. Bukti yang sesungguhnya memakai definisi epsilon-delta.'
    }
  ],

  analogi: `Bayangkan kamu berjalan menuju sebuah pintu, tetapi setiap langkahmu hanya menempuh **separuh sisa jarak**.

Langkah pertama membawamu setengah jalan, kedua tiga perempat, ketiga tujuh per delapan. Kamu **tidak akan pernah benar-benar sampai** di pintu — tetapi jelas sekali ke mana kamu menuju.

**Posisi pintu itulah limitnya.** Perhatikan bahwa untuk mengetahuinya, kamu **tidak perlu sampai**. Cukup melihat arah perjalanannya.

Dari sini contoh sprint 100 meter di slide jadi masuk akal. Catatan waktu terus membaik — 9,8 lalu 9,7 lalu 9,58 — tetapi mendekati batas sekitar 9 detik yang mungkin tidak pernah dilewati. Limit itu nyata dan bermakna, meski tidak ada yang pernah mencapainya.

Untuk **bentuk 0/0**, bayangkan pintu yang **lubangnya bolong tepat di titik tujuan**. Jalanan menuju ke sana mulus dari kedua arah, dan jelas menuju satu titik — hanya saja tepat di titik itu tidak ada lantainya. Limit tetap bisa menjawab *"ke mana kamu menuju"*, meski tempat itu sendiri tidak bisa dipijak.

Untuk **limit yang tidak ada**, bayangkan jalan yang **bercabang di ujung**: dari arah kiri kamu tiba di satu tempat, dari arah kanan di tempat lain. Ketika ditanya *"ke mana jalan ini menuju?"*, tidak ada jawaban tunggal. Itulah |x|/x di titik nol.

Dan **tak hingga** bukan sebuah tempat. Mengatakan *"jalannya menuju tak hingga"* berarti *"jalannya tidak menuju tempat mana pun — ia terus naik selamanya"*. Itu sebabnya kamu tidak bisa menghitung dengannya seperti menghitung jarak biasa.`,

  latihan: [
    'Hitung lim (x^2 + 3) untuk x mendekati 2 dengan dua cara: substitusi langsung, dan tabel numeris dari kedua sisi. Jelaskan kenapa keduanya boleh dipakai di sini.',
    'Hitung lim (x^2 - 4)/(x - 2) untuk x mendekati 2. Tunjukkan kenapa substitusi langsung gagal, lalu selesaikan dengan penguraian.',
    'Jelaskan kenapa pencoretan faktor (x-2) pada soal sebelumnya dibenarkan, padahal membagi dengan nol tidak boleh.',
    'Tentukan lim 1/x untuk x mendekati tak hingga dan lim 1/x^2 untuk x mendekati nol. Jelaskan perbedaan makna keduanya, dan sebutkan jenis asimtot pada masing-masing.',
    'Jelaskan kenapa lim 1/x untuk x mendekati nol tidak ada, sedangkan lim 1/x^2 untuk x mendekati nol boleh ditulis tak hingga.',
    'Kaitkan gagasan limit menuju tak hingga dengan notasi Big-O pada analisis algoritma. Kenapa suku berpangkat rendah boleh diabaikan?'
  ]
});
