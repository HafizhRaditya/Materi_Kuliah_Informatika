/* ============================================================
   matematika-dasar.js — materi Matematika Dasar (Semester 1)

   Disusun dari slide kuliah sendiri:
     Pertemuan 4-5  Relasi dan Fungsi
     Pertemuan 6    Limit Fungsi
     Pertemuan 7    Limit Tak Hingga

   CATATAN CAKUPAN: hanya tiga berkas itu yang ada di drive, jadi
   pertemuan 1-3 dan 8 ke atas tidak ada bahannya sendiri. Empat
   topik tambahan (pertidaksamaan & nilai mutlak, kontinuitas,
   turunan, integral) karena itu disusun dari REFERENSI LUAR --
   keterangan lengkapnya ada di kepala bagian tambahan di bawah.

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


/* ------------------------------------------------------------
   TAMBAHAN dari referensi luar (empat topik di bawah).

   Tiga topik pertama berkas ini berasal dari slide kuliah
   sendiri (pertemuan 4-7). Empat topik berikutnya mengisi
   pokok bahasan yang ada di RPS Kalkulus / Matematika Dasar
   program studi informatika kampus lain tetapi tidak ada
   slidenya di drive: sistem bilangan real, pertidaksamaan dan
   nilai mutlak; kontinuitas; turunan dan penerapannya; integral
   dan penerapannya.

   Himpunan sengaja tidak diulang -- sudah ada di Logika
   Informatika.

   Seperti topik di atas, setiap angka dihitung dengan program
   Python yang benar-benar dijalankan, dan keluarannya disalin
   apa adanya.
   ------------------------------------------------------------ */
TOPICS.push({
  id: 'matdas-pertidaksamaan',
  judul: 'Pertidaksamaan & Nilai Mutlak',
  kategori: 'matematika-dasar',
  tag: ['bilangan real', 'selang', 'pertidaksamaan', 'tabel tanda', 'nilai mutlak', 'epsilon-delta', 'floating point'],
  ringkas: 'Nilai mutlak adalah jarak — dan "cukup dekat" adalah cara satu-satunya membandingkan bilangan pecahan di komputer.',

  fungsi: `**Menyelesaikan pertidaksamaan tanpa kehilangan atau menambah jawaban, dan memakai nilai mutlak sebagai ukuran jarak.**

Terpakai di:

- **Syarat di program** — setiap \`if\` dengan \`<\` atau \`>=\` adalah pertidaksamaan, dan batas selangnya menentukan data mana yang lolos
- **Membandingkan bilangan pecahan** — \`0.1 + 0.2 == 0.3\` bernilai salah, jadi perbandingan harus diganti "jaraknya cukup kecil"
- **Toleransi dan kriteria berhenti** — algoritme berulang berhenti saat \`abs(x_baru - x_lama) < toleransi\`
- **Definisi limit** — epsilon-delta yang disebut di topik limit sepenuhnya ditulis dengan nilai mutlak
- **Validasi masukan** — rentang umur, nilai, suhu: semuanya selang

Yang paling sering salah: **mengalikan kedua ruas dengan sesuatu yang tandanya belum diketahui.** Kalau yang dikalikan ternyata negatif, arah pertidaksamaannya harus dibalik — dan lupa membaliknya memberi jawaban yang salah tanpa tanda peringatan apa pun.

Dan yang paling langsung terpakai di pemrograman: **epsilon yang tetap tidak cukup.** Selisih 0,00016 bisa berarti "hampir sama" untuk bilangan sejuta, dan "sangat berbeda" untuk bilangan 0,001.`,

  praktik: {
    tujuan: 'Kamu bisa menyelesaikan pertidaksamaan pecahan dengan tabel tanda, menerjemahkan nilai mutlak menjadi selang, memeriksa jawabanmu dengan menguji ribuan titik, dan memilih cara membandingkan bilangan pecahan yang benar di kode.',
    alat: ['Kertas untuk tabel tanda', 'Python 3 untuk menguji jawaban', 'Modul math (math.isclose)'],
    langkah: [
      { judul: 'Pindahkan semua ke satu ruas',
        isi: `Untuk \`(x + 2)/(x − 3) ≥ 1\`, jangan kalikan dengan \`(x − 3)\`. Kurangkan 1 dari kedua ruas, lalu satukan penyebutnya:

\`(x + 2)/(x − 3) − 1 = 5/(x − 3) ≥ 0\`

Mengurangkan aman: tidak pernah membalik arah pertidaksamaan. Mengalikan bisa.` },
      { judul: 'Cari titik kritis',
        isi: `Titik kritis adalah pembuat nol pembilang dan pembuat nol penyebut. Untuk \`(x − 1)(x + 2)/(x − 3)\`: −2, 1, dan 3.

Titik-titik itu membagi garis bilangan menjadi selang. Di dalam setiap selang, tanda ekspresinya tidak berubah.` },
      { judul: 'Isi tabel tanda dengan satu wakil per selang',
        isi: `Pilih satu bilangan dari setiap selang, hitung tanda setiap faktor, lalu kalikan tandanya.

Satu wakil cukup, karena tanda tidak bisa berganti di dalam selang tanpa melewati titik kritis.` },
      { judul: 'Putuskan ujung selangnya',
        isi: `Pembuat nol pembilang ikut kalau tandanya \`≤\` atau \`≥\`. Pembuat nol penyebut **tidak pernah** ikut — di sana ekspresinya tidak terdefinisi.

Tulis jawabannya dengan notasi selang: kurung siku untuk ujung yang ikut, kurung biasa untuk yang tidak.` },
      { judul: 'Terjemahkan nilai mutlak menjadi jarak',
        isi: `\`|x − a| < r\` berarti "jarak x ke a kurang dari r" — satu selang, \`a − r < x < a + r\`.

\`|x − a| ≥ r\` berarti "jarak x ke a paling sedikit r" — dua selang terpisah, \`x ≤ a − r\` **atau** \`x ≥ a + r\`.` },
      { judul: 'Uji jawabanmu dengan ribuan titik',
        isi: `Tulis perulangan yang mencoba x dari −6 sampai 8 dengan langkah 0,01, lalu kumpulkan yang memenuhi pertidaksamaan aslinya.

Kalau hasilnya tidak cocok dengan jawaban kertasmu, ada yang salah di salah satunya. Program di topik ini melakukan persis itu untuk setiap contoh.` },
      { judul: 'Ganti == untuk bilangan pecahan',
        isi: `Di kode, jangan pernah membandingkan dua hasil perhitungan pecahan dengan \`==\`. Pakai \`math.isclose(a, b)\` di Python, yang memakai toleransi **relatif**.

Kalau salah satu nilainya bisa nol, tambahkan \`abs_tol\` — toleransi relatif terhadap nol selalu nol, sehingga \`math.isclose(1e-20, 0)\` bernilai salah.` }
    ],
    cek: [
      'Kamu menyelesaikan pertidaksamaan pecahan tanpa pernah mengalikan dengan ekspresi yang tandanya belum diketahui',
      'Jawabanmu untuk setiap contoh cocok dengan hasil uji ribuan titik',
      'Kamu bisa menjelaskan kenapa |x − a| < r satu selang dan |x − a| ≥ r dua selang',
      'Kodemu tidak memakai == untuk membandingkan hasil perhitungan pecahan'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `Topik limit menutup dengan menyebut **definisi epsilon-delta** yang akan ditemui di Kalkulus. Definisi itu ditulis seluruhnya dengan dua alat: **pertidaksamaan** dan **nilai mutlak**. Topik ini tentang keduanya — dan ternyata keduanya juga yang dipakai setiap kali program membandingkan bilangan pecahan.

**Bilangan real dan selang**

Himpunan bilangan real bisa dibayangkan sebagai garis tanpa celah. Pertidaksamaan memotong garis itu menjadi **selang**:

| Notasi selang | Artinya | Ujung |
|---|---|---|
| (1, 4) | 1 < x < 4 | tidak ikut |
| [1, 4] | 1 ≤ x ≤ 4 | ikut |
| [1, 4) | 1 ≤ x < 4 | kiri ikut |
| (3, ∞) | x > 3 | ∞ tidak pernah ikut |

∞ selalu memakai kurung biasa, karena ∞ bukan bilangan dan tidak bisa "dicapai" — hal yang sama yang dibahas di topik limit.

**Jebakan terbesar: mengalikan dengan penyebut**

Selesaikan \`(x + 2)/(x − 3) ≥ 1\`.

Cara yang terlihat wajar: kalikan kedua ruas dengan \`(x − 3)\`. Hasilnya \`x + 2 ≥ x − 3\`, lalu \`2 ≥ −3\` — selalu benar. Kesimpulannya: semua x kecuali 3.

Uji dengan x = 0: \`(0 + 2)/(0 − 3) = −0,667\`. Itu **tidak** ≥ 1. Kesimpulannya salah.

Penyebabnya: mengalikan dengan bilangan negatif **membalik** arah pertidaksamaan. Untuk x < 3, \`(x − 3)\` negatif, dan cara tadi lupa membaliknya.

Cara yang benar: jangan kalikan. Pindahkan ke satu ruas, lalu satukan:

\`(x + 2)/(x − 3) − 1 = 5/(x − 3) ≥ 0\`

Pembilangnya 5, selalu positif, jadi syaratnya cuma penyebut positif: **x > 3**. Program menguji 1.401 titik dari −6 sampai 8, dan yang memenuhi tepat [3,01 .. 8] — semuanya di atas 3.

**Tabel tanda**

Untuk \`(x − 1)(x + 2)/(x − 3) ≤ 0\`, titik kritisnya −2 dan 1 (pembuat nol) serta 3 (penyebut nol):

| Selang | Wakil | x − 1 | x + 2 | x − 3 | Hasil |
|---|---|---|---|---|---|
| x < −2 | −3 | − | − | − | **−** |
| −2 < x < 1 | 0 | − | + | − | + |
| 1 < x < 3 | 2 | + | + | − | **−** |
| x > 3 | 4 | + | + | + | + |

Yang dicari ≤ 0, jadi selang bertanda − ditambah pembuat nol pembilang: **x ≤ −2 atau 1 ≤ x < 3**. Uji 1.401 titik memberi [−6 .. −2] dan [1 .. 2,99] — cocok. x = 3 tidak pernah ikut karena di sana penyebutnya nol.

**Nilai mutlak adalah jarak**

\`|x|\` adalah jarak x ke nol. \`|x − a|\` adalah jarak x ke a. Dengan cara membaca ini, pertidaksamaan nilai mutlak berubah menjadi pertanyaan tentang jarak:

- \`|2x − 5| < 3\` dibaca "2x berjarak kurang dari 3 dari 5". Jawabannya \`−3 < 2x − 5 < 3\`, yaitu **1 < x < 4** — satu selang. Uji ribuan titik memberi [1,01 .. 3,99]: kedua ujung tidak ikut.
- \`|x − 2| ≥ 1\` dibaca "x berjarak paling sedikit 1 dari 2". Jawabannya **x ≤ 1 atau x ≥ 3** — dua selang. Uji memberi [−6 .. 1] dan [3 .. 8].

"Dekat" menghasilkan **satu** selang di sekitar titik tengah. "Jauh" menghasilkan **dua** selang di kedua sisi. Menulis yang kedua sebagai \`1 ≥ x ≥ 3\` adalah salah — tidak ada bilangan yang sekaligus ≤ 1 dan ≥ 3.

**Ketaksamaan segitiga**

\`|a + b| ≤ |a| + |b|\`. Sama persis hanya kalau a dan b bertanda sama; kalau berlawanan tanda, sebagian saling menghapus:

| a | b | abs(a + b) | abs(a) + abs(b) |
|---|---|---|---|
| 3 | 4 | 7 | 7 |
| 3 | −4 | 1 | 7 |
| 7 | −7 | 0 | 14 |

Ketaksamaan ini yang dipakai untuk membatasi galat: kalau dua perhitungan masing-masing meleset paling banyak 0,01, jumlahnya meleset paling banyak 0,02 — mungkin kurang, tidak pernah lebih.

**Epsilon-delta: limit ditulis dengan nilai mutlak**

"Limit f(x) untuk x → a sama dengan L" berarti: untuk **setiap** ε > 0 yang diminta, ada δ > 0 sehingga \`|x − a| < δ\` menjamin \`|f(x) − L| < ε\`.

Untuk f(x) = 2x + 1 di x → 3 dengan L = 7: \`|f(x) − 7| = |2x − 6| = 2|x − 3|\`. Jadi δ = ε/2 selalu cukup.

| ε | δ | x terjauh diuji | abs(f(x) − 7) |
|---|---|---|---|
| 0,1 | 0,05 | 3,0499500 | 0,0999000 |
| 0,01 | 0,005 | 3,0049950 | 0,0099900 |
| 0,001 | 0,0005 | 3,0004995 | 0,0009990 |

Seberapa pun kecil ε yang diminta, selalu ada δ yang menjawabnya. Itu bentuk tepat dari kata "mendekati" di topik limit.

**Bilangan real di komputer: "sama" menjadi "cukup dekat"**

Kebanyakan pecahan desimal tidak tersimpan tepat dalam biner. Akibatnya \`0.1 + 0.2 == 0.3\` bernilai **False** — selisihnya 5,55 × 10⁻¹⁷.

Jalan keluarnya adalah nilai mutlak: ganti \`a == b\` dengan \`|a − b| < ε\`. Tetapi ε yang **tetap** gagal di dua arah:

| Pasangan | abs(a − b) < 1e-9 | math.isclose |
|---|---|---|
| 0.1 + 0.2 vs 0.3 | True | True |
| 0.1 dijumlah 10 juta kali vs 1e6 | **False** | True |
| 1e-12 vs 2e-12 | **True** | False |

Baris kedua: menjumlahkan 0,1 sepuluh juta kali menghasilkan 999999,9998389754. Selisihnya dengan sejuta 0,000161 — besar secara mutlak, tetapi cuma 1,61 × 10⁻¹⁰ **relatif** terhadap sejuta. ε tetap menolaknya.

Baris ketiga: 2e-12 **dua kali** 1e-12, tetapi selisihnya di bawah 1e-9, sehingga ε tetap menganggap keduanya sama.

\`math.isclose\` memakai toleransi relatif: \`|a − b| ≤ rel_tol × max(|a|, |b|)\`. Jaraknya diukur dibanding besar bilangannya — pertidaksamaan nilai mutlak yang sama, dengan batas yang ikut membesar dan mengecil.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "# (x + 2)/(x - 3) >= 1\n\n# SALAH: kalikan dengan (x - 3)\n#   x + 2 >= x - 3  ->  2 >= -3  ->  semua x kecuali 3\n\n# BENAR: pindahkan ke satu ruas\n#   (x + 2)/(x - 3) - 1 >= 0  ->  5/(x - 3) >= 0  ->  x > 3\n\nfor x in [0, 2.9, 3.1, 10]:\n    print(x, (x + 2) / (x - 3) >= 1)\n\n# 0    False   <- cara SALAH menerima x = 0\n# 2.9  False\n# 3.1  True\n# 10   True",
      penjelasan: `Dua cara menyelesaikan pertidaksamaan yang sama, dan cara pertama — yang terasa paling alami — memberi jawaban yang salah untuk separuh garis bilangan.

**Kenapa mengalikan dengan bilangan negatif membalik tanda?**

Ambil pertidaksamaan yang pasti benar: \`2 < 5\`. Kalikan kedua ruas dengan −1: \`−2\` dan \`−5\`. Sekarang −2 **lebih besar** dari −5. Urutannya berbalik.

Pada garis bilangan, mengalikan dengan −1 adalah mencerminkan terhadap nol. Yang tadinya di kanan pindah ke kiri, dan sebaliknya. Karena itu tanda \`<\` harus menjadi \`>\`.

**Sekarang lihat apa yang dilakukan cara pertama.**

Ia mengalikan dengan \`(x − 3)\`. Untuk x > 3, itu positif, dan tanda tetap — langkahnya benar. Untuk x < 3, itu **negatif**, dan tanda seharusnya dibalik — tetapi tidak dibalik.

Jadi cara pertama sebenarnya benar untuk setengah garis bilangan dan salah untuk setengah lainnya. Masalahnya, ia tidak memberi tanda apa pun di mana salahnya.

**Kenapa memindahkan ke satu ruas selalu aman.**

Mengurangkan atau menambahkan bilangan yang sama ke kedua ruas **tidak pernah** membalik tanda — ia cuma menggeser semuanya sejauh yang sama di garis bilangan, tanpa mencerminkan.

Setelah semuanya di satu ruas, pertanyaannya berubah menjadi "kapan ekspresi ini ≥ 0?" — dan itu dijawab tabel tanda, yang tidak pernah perlu mengalikan apa-apa.

**Kalau tetap ingin mengalikan.**

Boleh, asalkan dipecah menjadi dua kasus: x > 3 (tanda tetap) dan x < 3 (tanda dibalik). Kasus kedua memberi \`x + 2 ≤ x − 3\`, lalu \`2 ≤ −3\` — mustahil, jadi tidak ada jawaban di x < 3. Hasil gabungannya sama: x > 3.

Cara itu benar, tetapi dua kali lebih panjang dan dua kali lebih banyak peluang salah. Memindahkan ke satu ruas lebih ringkas.

**Dan kenapa kode di atas berguna.**

Empat titik uji — dua di tiap sisi x = 3 — cukup untuk menangkap kesalahan cara pertama: x = 0 seharusnya diterima menurut cara itu, tetapi pertidaksamaan aslinya menolaknya. Selalu uji jawaban dengan titik di **setiap** selang dari tabel tandamu.`
    },
    {
      bahasa: 'python',
      kode: "import math\n\n# epsilon TETAP: |a - b| < 1e-9\n# epsilon RELATIF: |a - b| <= rel_tol * max(|a|, |b|)\n\ns = 0.0\nfor _ in range(10_000_000):\n    s += 0.1                     # s = 999999.9998389754\n\nabs(s - 1e6) < 1e-9              # False  (selisih 0.000161)\nmath.isclose(s, 1e6)             # True   (relatif 1.61e-10)\n\nabs(1e-12 - 2e-12) < 1e-9        # True   (padahal beda 2 kali)\nmath.isclose(1e-12, 2e-12)       # False\n\nmath.isclose(1e-20, 0)           # False  (relatif ke nol = 0)\nmath.isclose(1e-20, 0, abs_tol=1e-12)   # True",
      penjelasan: `Tiga cara membaca "a dan b sama", dan kenapa masing-masing gagal di tempat yang berbeda.

**Kenapa \`==\` tidak bisa dipakai.**

0,1 dalam biner adalah pecahan yang berulang tanpa akhir — seperti 1/3 dalam desimal. Komputer memotongnya di 53 bit, jadi yang tersimpan bukan 0,1 melainkan bilangan yang sangat dekat dengannya.

Setiap penjumlahan membawa potongan kecil itu. Sepuluh juta penjumlahan menumpuk menjadi selisih 0,000161. Hasilnya **tidak akan pernah** sama persis dengan 1.000.000, dan \`==\` selalu menjawab tidak.

**Epsilon tetap: pertidaksamaan nilai mutlak yang paling sederhana.**

\`abs(a - b) < 1e-9\` membaca "jarak a dan b kurang dari satu per semiliar". Untuk bilangan di sekitar 1, itu wajar.

Masalahnya, 1e-9 adalah jarak **mutlak**, dan tidak peduli seberapa besar bilangannya:

- Untuk bilangan di sekitar sejuta, galat pembulatan yang wajar sudah jauh di atas 1e-9. Epsilon tetap menolak dua bilangan yang sebenarnya sama.
- Untuk bilangan di sekitar 1e-12, jarak 1e-9 jauh lebih besar dari bilangannya sendiri. Epsilon tetap menerima dua bilangan yang berbeda dua kali lipat.

**Toleransi relatif: jaraknya dibanding besarnya.**

\`math.isclose\` menguji \`|a − b| ≤ rel_tol × max(|a|, |b|)\`, dengan rel_tol bawaan 1e-9 — kira-kira "sama sampai 9 digit bermakna". Batasnya ikut membesar untuk bilangan besar dan mengecil untuk bilangan kecil.

Itu masih pertidaksamaan nilai mutlak yang sama. Bedanya, ruas kanannya tidak tetap.

**Satu lubang yang harus ditutup sendiri: nol.**

Kalau salah satu bilangannya nol, \`max(|a|, |b|)\` adalah bilangan yang lain, dan toleransi relatif terhadap nol pada dasarnya menuntut kesamaan persis. \`math.isclose(1e-20, 0)\` bernilai False.

Untuk kasus seperti "apakah sisa perhitungan ini praktis nol?", tambahkan \`abs_tol\` — batas mutlak yang dipakai bersama batas relatif. \`math.isclose\` menerima kalau **salah satu** batas terpenuhi.

Nilai abs_tol yang tepat bergantung pada soalnya: seberapa kecil sebuah nilai boleh dianggap nol dalam satuan yang kamu pakai. Tidak ada angka yang benar untuk semua kasus.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Bilangan real, pertidaksamaan, dan nilai mutlak
# ============================================
import math

def grid(a, b, langkah):
    """Titik-titik uji dari a sampai b (tanpa galat pembulatan)."""
    n = round((b - a) / langkah)
    return [round(a + i * langkah, 6) for i in range(n + 1)]

def ringkas(xs):
    """Ubah daftar titik yang memenuhi menjadi potongan selang."""
    if not xs:
        return "(kosong)"
    potong, awal, akhir = [], xs[0], xs[0]
    for x in xs[1:]:
        if round(x - akhir, 6) > 0.0100001:
            potong.append((awal, akhir))
            awal = x
        akhir = x
    potong.append((awal, akhir))
    return "  ".join("[" + format(a, "g") + " .. " + format(b, "g") + "]"
                     for a, b in potong)

UJI = grid(-6, 8, 0.01)

# --------------------------------------------
# 1. Mengalikan dengan penyebut yang tandanya belum diketahui
# --------------------------------------------
print("--- (x + 2) / (x - 3) >= 1 ---")
print("  cara SALAH: kalikan kedua ruas dengan (x - 3)")
print("    x + 2 >= x - 3   ->   2 >= -3   ->   selalu benar")
print("    kesimpulan salah: semua x kecuali 3")
print()
print("  cara BENAR: pindahkan ke satu ruas, jangan kalikan")
print("    (x + 2)/(x - 3) - 1 >= 0   ->   5 / (x - 3) >= 0")
print("    pembilang 5 selalu positif, jadi cukup x - 3 > 0")
print("    kesimpulan: x > 3")
print()
for x in [0, 2.9, 3.1, 10]:
    kiri = (x + 2) / (x - 3)
    print("  x = " + format(x, "<5g") + "  (x+2)/(x-3) = "
          + format(kiri, "8.3f") + "   >= 1 ? " + ("ya" if kiri >= 1 else "TIDAK"))
cocok = [x for x in UJI if x != 3 and (x + 2) / (x - 3) >= 1]
print("\n  diuji di " + str(len(UJI)) + " titik, -6 sampai 8:")
print("  yang memenuhi: " + ringkas(cocok))
print()
print("  Mengalikan dengan bilangan NEGATIF membalik tanda")
print("  pertidaksamaan. Untuk x < 3, (x - 3) negatif, dan cara")
print("  salah lupa membaliknya -- sehingga x = 0 ikut 'lolos'.")

# --------------------------------------------
# 2. Tabel tanda
# --------------------------------------------
print("\n--- (x - 1)(x + 2) / (x - 3) <= 0 dengan tabel tanda ---")
print("  titik kritis: -2, 1 (pembuat nol), 3 (penyebut nol)")
print()
print("  selang        wakil   x-1   x+2   x-3   hasil")
selang = [("x < -2", -3), ("-2 < x < 1", 0), ("1 < x < 3", 2), ("x > 3", 4)]
for nama, w in selang:
    t = lambda v: "+" if v > 0 else "-"
    nilai = (w - 1) * (w + 2) / (w - 3)
    print("  " + format(nama, "<13") + format(w, ">5") + "     " + t(w - 1)
          + "     " + t(w + 2) + "     " + t(w - 3) + "     " + t(nilai))
cocok = [x for x in UJI if x != 3 and (x - 1) * (x + 2) / (x - 3) <= 0]
print("\n  jawaban dari tabel : x <= -2  atau  1 <= x < 3")
print("  diuji di " + str(len(UJI)) + " titik: " + ringkas(cocok))
print("  (x = 3 tidak pernah ikut: penyebutnya nol)")

# --------------------------------------------
# 3. Nilai mutlak sebagai jarak
# --------------------------------------------
print("\n--- nilai mutlak = jarak ---")
print("  |2x - 5| < 3   ->   -3 < 2x - 5 < 3   ->   1 < x < 4")
cocok = [x for x in UJI if abs(2 * x - 5) < 3]
print("  diuji: " + ringkas(cocok) + "   (ujung 1 dan 4 tidak ikut)")
print()
print("  |x - 2| >= 1   ->   x - 2 <= -1  ATAU  x - 2 >= 1")
cocok = [x for x in UJI if abs(x - 2) >= 1]
print("  diuji: " + ringkas(cocok))
print()
print("  '<' menghasilkan SATU selang (dekat dengan 2,5).")
print("  '>=' menghasilkan DUA selang (jauh dari 2) -- dan menulisnya")
print("  sebagai 1 >= x >= 3 adalah salah: tidak ada x yang begitu.")

print("\n--- ketaksamaan segitiga |a + b| <= |a| + |b| ---")
for a, b in [(3, 4), (3, -4), (-2, -5), (7, -7)]:
    print("  a = " + format(a, ">2") + ", b = " + format(b, ">2")
          + "   |a+b| = " + format(abs(a + b), ">2")
          + "   |a|+|b| = " + format(abs(a) + abs(b), ">2")
          + ("   sama" if abs(a + b) == abs(a) + abs(b) else "   lebih kecil"))
print("  Sama persis hanya kalau a dan b bertanda sama (atau nol).")

# --------------------------------------------
# 4. Epsilon dan delta: nilai mutlak di definisi limit
# --------------------------------------------
print("\n--- epsilon-delta untuk lim (2x + 1) = 7 saat x -> 3 ---")
print("  syarat: |x - 3| < delta  menjamin  |f(x) - 7| < epsilon")
print("  |f(x) - 7| = |2x - 6| = 2|x - 3|, jadi delta = epsilon / 2")
print()
print("  epsilon    delta     x terjauh diuji     |f(x) - 7|")
for eps in [0.1, 0.01, 0.001]:
    d = eps / 2
    x = 3 + d * 0.999
    print("  " + format(eps, "<9g") + "  " + format(d, "<8g") + "  "
          + format(x, "<18.7f") + "  " + format(abs(2 * x + 1 - 7), ".7f"))
print("  Setiap epsilon punya delta -- itulah arti limitnya 7.")

# --------------------------------------------
# 5. Bilangan real di komputer: |a - b| < epsilon
# --------------------------------------------
print("\n--- membandingkan bilangan pecahan di komputer ---")
print("  0.1 + 0.2 == 0.3       :", 0.1 + 0.2 == 0.3)
print("  |(0.1 + 0.2) - 0.3|    :", abs((0.1 + 0.2) - 0.3))
print()
print("  Kebanyakan pecahan desimal tidak tersimpan tepat dalam biner,")
print("  jadi 'sama' diganti 'jaraknya lebih kecil dari epsilon'.")
print("  Tetapi epsilon yang TETAP gagal di dua arah:")
print()
s = 0.0
for _ in range(10_000_000):
    s += 0.1
kasus = [
    ("0.1 + 0.2  vs  0.3", 0.1 + 0.2, 0.3),
    ("0.1 x 10 juta  vs  1e6", s, 1e6),
    ("1e-12  vs  2e-12", 1e-12, 2e-12),
]
print("  pasangan                     |a-b|<1e-9   isclose")
for nama, a, b in kasus:
    mutlak = abs(a - b) < 1e-9
    relatif = math.isclose(a, b, rel_tol=1e-9)
    print("  " + format(nama, "<28") + " " + format(str(mutlak), "<12")
          + " " + str(relatif))
print()
print("  jumlah 0.1 sepuluh juta kali :", s)
print("  selisih mutlaknya            :", format(abs(s - 1e6), ".3g"))
print("  selisih relatifnya           :", format(abs(s - 1e6) / 1e6, ".3g"))
print()
print("  Baris kedua: selisihnya 0,00016 -- besar secara mutlak,")
print("  kecil sekali dibanding 1 juta. Epsilon tetap menolaknya.")
print("  Baris ketiga: 2e-12 DUA KALI 1e-12, tetapi selisihnya di")
print("  bawah 1e-9, jadi epsilon tetap menganggapnya sama.")
print("  math.isclose memakai selisih RELATIF: |a-b| <= rel x max(|a|,|b|).")` },
  output: `--- (x + 2) / (x - 3) >= 1 ---
  cara SALAH: kalikan kedua ruas dengan (x - 3)
    x + 2 >= x - 3   ->   2 >= -3   ->   selalu benar
    kesimpulan salah: semua x kecuali 3

  cara BENAR: pindahkan ke satu ruas, jangan kalikan
    (x + 2)/(x - 3) - 1 >= 0   ->   5 / (x - 3) >= 0
    pembilang 5 selalu positif, jadi cukup x - 3 > 0
    kesimpulan: x > 3

  x = 0      (x+2)/(x-3) =   -0.667   >= 1 ? TIDAK
  x = 2.9    (x+2)/(x-3) =  -49.000   >= 1 ? TIDAK
  x = 3.1    (x+2)/(x-3) =   51.000   >= 1 ? ya
  x = 10     (x+2)/(x-3) =    1.714   >= 1 ? ya

  diuji di 1401 titik, -6 sampai 8:
  yang memenuhi: [3.01 .. 8]

  Mengalikan dengan bilangan NEGATIF membalik tanda
  pertidaksamaan. Untuk x < 3, (x - 3) negatif, dan cara
  salah lupa membaliknya -- sehingga x = 0 ikut 'lolos'.

--- (x - 1)(x + 2) / (x - 3) <= 0 dengan tabel tanda ---
  titik kritis: -2, 1 (pembuat nol), 3 (penyebut nol)

  selang        wakil   x-1   x+2   x-3   hasil
  x < -2          -3     -     -     -     -
  -2 < x < 1       0     -     +     -     +
  1 < x < 3        2     +     +     -     -
  x > 3            4     +     +     +     +

  jawaban dari tabel : x <= -2  atau  1 <= x < 3
  diuji di 1401 titik: [-6 .. -2]  [1 .. 2.99]
  (x = 3 tidak pernah ikut: penyebutnya nol)

--- nilai mutlak = jarak ---
  |2x - 5| < 3   ->   -3 < 2x - 5 < 3   ->   1 < x < 4
  diuji: [1.01 .. 3.99]   (ujung 1 dan 4 tidak ikut)

  |x - 2| >= 1   ->   x - 2 <= -1  ATAU  x - 2 >= 1
  diuji: [-6 .. 1]  [3 .. 8]

  '<' menghasilkan SATU selang (dekat dengan 2,5).
  '>=' menghasilkan DUA selang (jauh dari 2) -- dan menulisnya
  sebagai 1 >= x >= 3 adalah salah: tidak ada x yang begitu.

--- ketaksamaan segitiga |a + b| <= |a| + |b| ---
  a =  3, b =  4   |a+b| =  7   |a|+|b| =  7   sama
  a =  3, b = -4   |a+b| =  1   |a|+|b| =  7   lebih kecil
  a = -2, b = -5   |a+b| =  7   |a|+|b| =  7   sama
  a =  7, b = -7   |a+b| =  0   |a|+|b| = 14   lebih kecil
  Sama persis hanya kalau a dan b bertanda sama (atau nol).

--- epsilon-delta untuk lim (2x + 1) = 7 saat x -> 3 ---
  syarat: |x - 3| < delta  menjamin  |f(x) - 7| < epsilon
  |f(x) - 7| = |2x - 6| = 2|x - 3|, jadi delta = epsilon / 2

  epsilon    delta     x terjauh diuji     |f(x) - 7|
  0.1        0.05      3.0499500           0.0999000
  0.01       0.005     3.0049950           0.0099900
  0.001      0.0005    3.0004995           0.0009990
  Setiap epsilon punya delta -- itulah arti limitnya 7.

--- membandingkan bilangan pecahan di komputer ---
  0.1 + 0.2 == 0.3       : False
  |(0.1 + 0.2) - 0.3|    : 5.551115123125783e-17

  Kebanyakan pecahan desimal tidak tersimpan tepat dalam biner,
  jadi 'sama' diganti 'jaraknya lebih kecil dari epsilon'.
  Tetapi epsilon yang TETAP gagal di dua arah:

  pasangan                     |a-b|<1e-9   isclose
  0.1 + 0.2  vs  0.3           True         True
  0.1 x 10 juta  vs  1e6       False        True
  1e-12  vs  2e-12             True         False

  jumlah 0.1 sepuluh juta kali : 999999.9998389754
  selisih mutlaknya            : 0.000161
  selisih relatifnya           : 1.61e-10

  Baris kedua: selisihnya 0,00016 -- besar secara mutlak,
  kecil sekali dibanding 1 juta. Epsilon tetap menolaknya.
  Baris ketiga: 2e-12 DUA KALI 1e-12, tetapi selisihnya di
  bawah 1e-9, jadi epsilon tetap menganggapnya sama.
  math.isclose memakai selisih RELATIF: |a-b| <= rel x max(|a|,|b|).`,

  kompleksitas: {
    tabel: [
      { operasi: 'Tabel tanda dengan k faktor', waktu: 'O(k²)', memori: 'k + 1 selang, masing-masing k tanda' },
      { operasi: 'Menguji jawaban di n titik', waktu: 'O(n)', memori: 'O(n) kalau titiknya disimpan' },
      { operasi: 'Membandingkan dua bilangan pecahan', waktu: 'O(1)', memori: 'O(1)' },
      { operasi: 'Menjumlahkan n pecahan', waktu: 'O(n)', memori: 'galat pembulatan bisa menumpuk sebanding n' }
    ],
    intuisi: `Tabel tanda untuk k faktor punya k titik kritis dan k + 1 selang, dan setiap selang butuh k tanda — jadi pekerjaannya tumbuh kuadratik, tetapi k jarang lebih dari lima.

Yang lebih menarik adalah baris terakhir. Menjumlahkan n bilangan pecahan butuh waktu O(n), tetapi **galatnya** juga bisa tumbuh mengikuti n dalam kasus terburuk, karena setiap penjumlahan menambah pembulatan kecil. Program menunjukkannya: sepuluh juta kali 0,1 meleset 0,000161.

Karena itu toleransi yang wajar untuk hasil perhitungan panjang lebih longgar daripada untuk satu operasi. Python menyediakan \`math.fsum\` yang melacak potongan pembulatan itu dan menjumlahkan dengan hasil yang dibulatkan dengan benar.`
  },

  kesalahanUmum: [
    {
      salah: 'Mengalikan kedua ruas pertidaksamaan dengan ekspresi yang memuat x, seperti penyebut x − 3.',
      kenapa: 'Kalau ekspresinya negatif untuk sebagian x, arah pertidaksamaan harus dibalik di bagian itu. Tanpa membedakan kasus, jawabannya salah untuk seluruh bagian itu dan tidak ada tanda peringatan.',
      benar: 'Pindahkan semua suku ke satu ruas, satukan menjadi satu pecahan, lalu selesaikan dengan tabel tanda.'
    },
    {
      salah: 'Mengikutsertakan pembuat nol penyebut ke dalam jawaban pertidaksamaan ≤ atau ≥.',
      kenapa: 'Di titik itu ekspresinya tidak terdefinisi, jadi tidak bisa bernilai ≤ 0 atau ≥ 0. Hanya pembuat nol pembilang yang bisa ikut.',
      benar: 'Tandai pembuat nol penyebut dengan kurung biasa di jawaban, apa pun tanda pertidaksamaannya.'
    },
    {
      salah: 'Menulis jawaban |x − 2| ≥ 1 sebagai 1 ≥ x ≥ 3.',
      kenapa: 'Tidak ada bilangan yang sekaligus paling banyak 1 dan paling sedikit 3, jadi notasi itu menyatakan himpunan kosong. Jawaban yang benar adalah dua selang yang terpisah.',
      benar: 'Tulis x ≤ 1 atau x ≥ 3, atau dalam notasi selang (−∞, 1] ∪ [3, ∞).'
    },
    {
      salah: 'Menganggap |a + b| selalu sama dengan |a| + |b|.',
      kenapa: 'Kalau a dan b berlawanan tanda, sebagian saling menghapus sehingga |a + b| lebih kecil. Kesamaan hanya berlaku kalau keduanya bertanda sama atau salah satunya nol.',
      benar: 'Pakai |a + b| ≤ |a| + |b| sebagai batas atas, bukan sebagai kesamaan.'
    },
    {
      salah: 'Membandingkan dua hasil perhitungan pecahan dengan ==.',
      kenapa: 'Kebanyakan pecahan desimal tidak tersimpan tepat dalam biner, sehingga dua perhitungan yang secara matematis sama bisa berbeda di digit terakhir. 0.1 + 0.2 == 0.3 bernilai salah.',
      benar: 'Bandingkan jaraknya dengan toleransi, misalnya math.isclose(a, b) di Python.'
    },
    {
      salah: 'Memakai satu epsilon tetap seperti 1e-9 untuk semua perbandingan.',
      kenapa: 'Untuk bilangan besar, galat pembulatan yang wajar melebihi epsilon sehingga bilangan yang sama dianggap berbeda. Untuk bilangan sangat kecil, epsilon melebihi bilangannya sendiri sehingga bilangan yang berbeda jauh dianggap sama.',
      benar: 'Pakai toleransi relatif, dan tambahkan toleransi mutlak hanya bila salah satu nilainya bisa nol.'
    },
    {
      salah: 'Memakai math.isclose(x, 0) untuk memeriksa apakah x praktis nol.',
      kenapa: 'Toleransi relatif terhadap nol adalah nol, sehingga fungsi itu menuntut x tepat nol. math.isclose(1e-20, 0) bernilai salah.',
      benar: 'Berikan abs_tol yang sesuai dengan satuan soalnya, misalnya math.isclose(x, 0, abs_tol=1e-12).'
    }
  ],

  analogi: `Bayangkan kamu mengatur **suhu ruang server** yang harus dijaga di sekitar 22 °C.

**Nilai mutlak adalah jarak.** Aturan "suhu tidak boleh menyimpang lebih dari 3 derajat dari 22" ditulis \`|T − 22| ≤ 3\`. Jawabannya satu selang, 19 sampai 25 — satu rentang di sekitar titik tengah.

Aturan alarm "bunyikan kalau menyimpang **lebih** dari 3 derajat" ditulis \`|T − 22| > 3\`. Jawabannya **dua** selang: di bawah 19 atau di atas 25. Alarm yang ditulis sebagai "25 < T < 19" tidak akan pernah berbunyi, karena tidak ada suhu yang sekaligus di atas 25 dan di bawah 19.

**Mengalikan dengan bilangan negatif.** Bayangkan kamu mengubah skala termometer menjadi "derajat di bawah titik beku" — kebalikan dari biasanya, jadi makin dingin makin besar angkanya. Suhu yang tadinya "lebih panas" sekarang punya angka "lebih kecil". Setiap aturan "lebih dari" harus diganti "kurang dari". Mengalikan dengan bilangan negatif adalah pergantian skala seperti itu, dan lupa membalik tanda berarti alarmmu berbunyi saat ruangan dingin, bukan saat panas.

**Epsilon tetap dan relatif.** Dua termometer menunjukkan 22,00 dan 22,01. Kamu menganggapnya sama: selisihnya 0,01 derajat, tidak berarti.

Sekarang dua timbangan truk menunjukkan 12.000,00 kg dan 12.000,01 kg. Juga sama — selisih 10 gram pada truk 12 ton tidak berarti apa-apa.

Lalu dua timbangan emas menunjukkan 0,01 g dan 0,02 g. Selisihnya juga 0,01 — tetapi yang satu **dua kali** yang lain.

Aturan "sama kalau selisihnya kurang dari 0,05" benar untuk termometer, terlalu ketat untuk timbangan truk yang lebih kasar, dan terlalu longgar untuk timbangan emas. Yang dipakai orang tanpa sadar adalah aturan **relatif**: selisihnya dibanding besarnya. Itulah yang dilakukan \`math.isclose\`.`,

  latihan: [
    'Selesaikan (2x − 1)/(x + 4) ≤ 1 dengan memindahkan semua suku ke satu ruas, lalu uji jawabanmu di satu titik dari setiap selang.',
    'Tunjukkan dengan satu nilai x bahwa mengalikan kedua ruas (2x − 1)/(x + 4) ≤ 1 dengan (x + 4) tanpa membedakan kasus memberi jawaban yang salah.',
    'Buat tabel tanda untuk x(x − 2)/(x + 1) > 0 dan tulis jawabannya dalam notasi selang.',
    'Selesaikan |3x + 1| < 5 dan |3x + 1| ≥ 5, lalu jelaskan kenapa yang satu satu selang dan yang lain dua selang.',
    'Tulis program Python yang menguji jawaban latihan nomor 3 di 1.000 titik atau lebih.',
    'Cari δ untuk lim (5x − 2) = 8 saat x → 2 dengan ε = 0,01, lalu periksa dengan angka.',
    'Beri contoh a dan b sehingga |a + b| sama dengan |a| + |b|, dan contoh lain sehingga |a + b| = 0 padahal |a| + |b| = 10.',
    'Jumlahkan 0,1 sebanyak seribu kali dengan perulangan biasa dan dengan math.fsum, lalu bandingkan keduanya dengan 100.',
    'Tulis fungsi hampir_sama(a, b) yang memakai toleransi relatif dan mutlak sekaligus, lalu uji dengan ketiga pasangan di tabel topik ini ditambah pasangan (1e-20, 0).',
    'Jelaskan kenapa aturan "selisih kurang dari 0,05 berarti sama" cocok untuk termometer tetapi tidak untuk timbangan emas.'
  ]
});


TOPICS.push({
  id: 'matdas-kontinuitas',
  judul: 'Kontinuitas & Metode Bagi Dua',
  kategori: 'matematika-dasar',
  tag: ['kontinu', 'diskontinu', 'lubang', 'lompatan', 'teorema nilai antara', 'metode bagi dua', 'git bisect'],
  ringkas: 'Fungsi yang kontinu tidak bisa berpindah dari negatif ke positif tanpa melewati nol — dan dari situ lahir algoritme pencari akar yang tidak pernah gagal.',

  fungsi: `**Mengenali apakah sebuah fungsi "tersambung" di suatu titik, dan memakai sifat itu untuk menjamin sebuah algoritme menemukan jawabannya.**

Terpakai di:

- **Mencari akar persamaan** yang tidak bisa diselesaikan dengan rumus — metode bagi dua bekerja untuk fungsi kontinu apa pun
- **Mencari commit pembawa galat** dengan \`git bisect\` — gagasan yang sama, di atas riwayat kode
- **Memahami tarif bertingkat** — ongkos kirim per kilogram, pajak progresif, harga per paket kuota — yang melompat di batas-batasnya
- **Memilih algoritme optimasi** — banyak metode mensyaratkan fungsi yang kontinu, dan diam-diam memberi hasil salah kalau syaratnya dilanggar

Yang paling penting dipahami: **syarat kontinu bukan hiasan.** Metode bagi dua pada fungsi yang tidak kontinu tetap berjalan, tetap berhenti, dan tetap mencetak angka — angka yang bisa sepenuhnya salah.

Dan yang membuat metode bagi dua istimewa: **jumlah langkahnya bisa dihitung sebelum mulai.** Untuk ketelitian sepersejuta di selang selebar 1, jawabannya 20 langkah — apa pun bentuk fungsinya.`,

  praktik: {
    tujuan: 'Kamu bisa memeriksa tiga syarat kontinu di sebuah titik, menggolongkan jenis diskontinuitasnya, menjalankan metode bagi dua dengan jumlah langkah yang dihitung di awal, dan mengenali kapan hasilnya tidak boleh dipercaya.',
    alat: ['Python 3', 'Kertas untuk sketsa grafik'],
    langkah: [
      { judul: 'Periksa tiga syarat kontinu',
        isi: `Fungsi f kontinu di a kalau tiga hal terpenuhi: **f(a) ada**, **limit f(x) untuk x → a ada**, dan **keduanya sama**.

Periksa berurutan. Begitu satu gagal, fungsinya tidak kontinu di titik itu, dan syarat yang gagal menentukan jenis diskontinuitasnya.` },
      { judul: 'Dekati dari dua arah dengan angka',
        isi: `Hitung f(a − h) dan f(a + h) untuk h = 0,01, 0,0001, 0,000001.

Kalau keduanya menuju angka yang sama, limitnya ada. Kalau menuju angka berbeda, ada lompatan. Kalau membesar tanpa batas, ada kutub.` },
      { judul: 'Golongkan diskontinuitasnya',
        isi: `- **Lubang**: limitnya ada, tetapi f(a) tidak ada atau berbeda. Bisa ditambal dengan mendefinisikan ulang f(a).
- **Lompatan**: limit kiri dan kanan ada tetapi berbeda. Tidak bisa ditambal.
- **Kutub**: fungsinya membesar tanpa batas. Tidak bisa ditambal.` },
      { judul: 'Pastikan ada pergantian tanda',
        isi: `Sebelum mencari akar di selang [a, b], hitung f(a) dan f(b). Kalau tandanya berlawanan **dan** f kontinu di seluruh selang, teorema nilai antara menjamin ada akar di dalamnya.

Kalau tandanya sama, metode bagi dua tidak bisa dipakai di selang itu — belum tentu tidak ada akar, tetapi tidak ada jaminan.` },
      { judul: 'Hitung jumlah langkah lebih dulu',
        isi: `Setiap langkah membelah selang jadi dua, jadi setelah k langkah lebarnya (b − a)/2^k. Supaya lebarnya di bawah toleransi t, butuh k = ⌈log₂((b − a)/t)⌉ langkah.

Untuk selang selebar 1 dan t = 10⁻⁶: 20 langkah.` },
      { judul: 'Jalankan, lalu periksa hasilnya',
        isi: `Setelah metode bagi dua berhenti, hitung |f(hasil)|. Kalau kecil, hasilnya akar. Kalau besar — apalagi sangat besar — fungsinya kemungkinan tidak kontinu di selang itu, dan yang ditemukan adalah kutub atau lompatan, bukan akar.` },
      { judul: 'Coba git bisect di proyekmu',
        isi: `Di repo mana pun, tandai satu commit lama yang masih benar dengan \`git bisect good\` dan commit sekarang yang salah dengan \`git bisect bad\`. Git memilih commit di tengah untuk kamu uji, lalu membelah lagi berdasarkan jawabanmu.

Untuk 1.000 commit, cukup sekitar 10 kali uji. Akhiri dengan \`git bisect reset\`.` }
    ],
    cek: [
      'Kamu bisa menunjuk syarat mana yang gagal untuk lubang, lompatan, dan kutub',
      'Kamu menghitung jumlah langkah metode bagi dua sebelum menjalankannya, dan hasilnya cocok',
      'Kamu selalu memeriksa |f(hasil)| setelah metode bagi dua berhenti',
      'Kamu bisa menjelaskan syarat yang harus dipenuhi riwayat commit supaya git bisect memberi jawaban yang benar'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `Topik limit menyebut sekilas bahwa untuk fungsi yang **kontinu**, limit sama dengan nilai fungsinya, sehingga substitusi langsung selesai. Topik ini membahas kata itu dengan sungguh-sungguh: apa artinya, bagaimana ia bisa gagal, dan kenapa ia menjadi syarat sebuah algoritme.

**Tiga syarat**

Secara kasar, fungsi kontinu adalah fungsi yang grafiknya bisa digambar tanpa mengangkat pena. Secara tepat, f kontinu di x = a kalau:

1. **f(a) ada** — fungsinya terdefinisi di titik itu
2. **lim f(x) untuk x → a ada** — dari kiri dan kanan menuju angka yang sama
3. **keduanya sama** — nilai di titik itu adalah nilai yang didekati

**Tiga cara gagal**

| Fungsi, titik | Dari kiri | Dari kanan | f(a) | Jenis |
|---|---|---|---|---|
| (x² − 4)/(x − 2), x = 2 | → 4 | → 4 | tidak ada | **lubang** |
| floor(x), x = 1 | → 0 | → 1 | 1 | **lompatan** |
| 1/(x − 1), x = 1 | → −∞ | → +∞ | tidak ada | **kutub** |

Angka pendekatannya dari program: untuk (x² − 4)/(x − 2), dari kiri 3,99 → 3,9999 → 3,999999 dan dari kanan 4,01 → 4,0001 → 4,000001.

**Lubang** gagal di syarat pertama saja. Limitnya ada, cuma titiknya kosong. Menambalnya cukup dengan mendefinisikan f(2) = 4 — dan fungsi yang sudah ditambal itu identik dengan x + 2.

**Lompatan** gagal di syarat kedua. Floor(1) = 1 ada, tetapi dari kiri nilainya 0 dan dari kanan 1. Tidak ada satu nilai pun yang bisa diisikan untuk menyambungnya.

**Kutub** gagal di dua syarat pertama. Fungsinya membesar tanpa batas — ke arah yang berlawanan di kedua sisi.

**Lompatan di dunia nyata**

Tarif kirim Rp9.000 per kilogram, dengan berat dibulatkan ke atas:

| Berat | Tarif |
|---|---|
| 1,00 kg | Rp9.000 |
| 1,01 kg | Rp18.000 |
| 2,00 kg | Rp18.000 |
| 2,01 kg | Rp27.000 |

Sepuluh gram tambahan menaikkan tarif Rp9.000 sekaligus. Itu lompatan: perubahan kecil pada masukan memberi perubahan besar pada keluaran. Fungsi tangga seperti ini ada di mana-mana — pajak bertingkat, harga paket, pembulatan — dan setiap batasnya adalah tempat pengujian perangkat lunak harus paling teliti.

**Teorema nilai antara**

Kalau f kontinu di [a, b], dan f(a) dan f(b) berlawanan tanda, maka ada **setidaknya satu** c di antara a dan b dengan f(c) = 0.

Alasannya intuitif: grafik yang digambar tanpa mengangkat pena tidak bisa berpindah dari bawah sumbu x ke atasnya tanpa menyeberanginya.

Untuk g(x) = x³ − x − 2: g(1) = −2 dan g(2) = 4. g kontinu — ia polinomial — jadi **pasti** ada akar di antara 1 dan 2. Teorema itu tidak memberi tahu di mana; ia cuma menjamin ada.

**Metode bagi dua: mengubah jaminan menjadi algoritme**

Ambil titik tengah. Lihat tandanya. Akarnya pasti di separuh yang ujung-ujungnya masih berlawanan tanda. Ulangi.

| Langkah | Selang sebelum dibelah | Lebar |
|---|---|---|
| 1 | [1,0000000, 2,0000000] | 1,0 |
| 5 | [1,5000000, 1,5625000] | 0,0625 |
| 10 | [1,5195312, 1,5214844] | 0,002 |
| 20 | [1,5213795, 1,5213814] | 0,0000019 |

Hasilnya 1,5213799, dengan g(akar) ≈ 1,4 × 10⁻⁶. Dua puluh langkah — **persis** jumlah yang dihitung di awal dengan ⌈log₂(1/10⁻⁶)⌉ = 20.

Itu sifat yang langka pada algoritme numerik: jumlah langkahnya **tidak bergantung pada bentuk fungsinya**. Fungsi yang rumit atau sederhana, hasilnya sama-sama 20 langkah untuk ketelitian itu.

**Tanpa kontinuitas, jaminannya hilang**

Jalankan metode yang sama pada f(x) = 1/(x − 1,3) di [1, 2]. f(1) = −3,3333 dan f(2) = 1,4286 — berlawanan tanda. Metode bagi dua berjalan 20 langkah dan "menemukan" x = 1,2999997.

Nilai fungsinya di sana: sekitar **−3,5 juta** (program mencetak −3,495 × 10⁶). Itu bukan akar. Itu kutub.

Tanda berganti bukan karena grafiknya menyeberangi sumbu x, melainkan karena grafiknya **melompat** dari minus tak hingga ke plus tak hingga. Teorema nilai antara tidak berlaku, karena syarat kontinunya dilanggar.

Yang berbahaya: algoritmenya tidak mengeluh sama sekali. Ia berhenti dengan normal dan mencetak angka. Satu-satunya perlindungan adalah memeriksa |f(hasil)| setelahnya.

**Gagasan yang sama di tempat lain**

Membelah dua adalah pencarian biner yang kamu kenal dari Struktur Data, dipakai pada bilangan real. Dan dipakai juga pada riwayat kode: \`git bisect\` mencari commit pertama yang membawa galat dengan membelah deretan commit.

| Jumlah commit | Kali uji |
|---|---|
| 100 | 7 |
| 1.000 | 10 |
| 100.000 | 17 |

Syaratnya mirip kontinuitas: sekali galatnya muncul, ia harus tetap ada di semua commit sesudahnya. Kalau galatnya muncul, hilang, lalu muncul lagi, git bisect bisa menunjuk commit yang salah — persis seperti metode bagi dua pada fungsi yang melompat.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def bagi_dua(f, a, b, toleransi):\n    fa = f(a)\n    while b - a > toleransi:\n        m = (a + b) / 2\n        fm = f(m)\n        if (fa < 0) == (fm < 0):\n            a, fa = m, fm      # tanda sama: akar di separuh kanan\n        else:\n            b = m              # tanda beda: akar di separuh kiri\n    return (a + b) / 2\n\n# g(x) = x^3 - x - 2 di [1, 2], toleransi 1e-6\n# -> 1.5213799 setelah 20 langkah",
      penjelasan: `Sepuluh baris, dan setiap barisnya adalah terjemahan langsung dari teorema nilai antara.

**Keadaan yang dijaga: f(a) dan f(b) selalu berlawanan tanda.**

Itu yang disebut *invarian* — sesuatu yang benar sebelum perulangan, dan tetap benar setelah setiap putaran. Selama invarian itu terjaga dan f kontinu, teorema nilai antara menjamin ada akar di [a, b].

Perhatikan bahwa kodenya tidak pernah mencari akar secara langsung. Ia cuma **mempersempit selang sambil menjaga invariannya**. Akarnya ditemukan sebagai akibat: selang yang terus menyempit dan selalu memuat akar pada akhirnya cuma memuat titik-titik yang sangat dekat dengan akar itu.

**Membandingkan tanda: \`(fa < 0) == (fm < 0)\`.**

Kenapa tidak \`fa * fm > 0\`, yang terlihat lebih matematis?

Karena perkalian dua bilangan yang sangat kecil bisa menjadi nol — misalnya 10⁻²⁰⁰ × 10⁻²⁰⁰ melampaui batas terkecil float dan dibulatkan ke 0. Tandanya hilang. Membandingkan tanda masing-masing secara terpisah tidak pernah punya masalah itu.

**Kenapa \`fa\` disimpan, bukan dihitung ulang.**

Setiap putaran cuma menghitung **satu** nilai fungsi baru, di titik tengah. f(a) sudah diketahui dari putaran sebelumnya. Kalau f mahal dihitung — misalnya satu simulasi yang butuh satu detik — ini memotong waktunya separuh.

f(b) bahkan tidak pernah dibutuhkan: kalau tanda f(m) sama dengan f(a), akarnya pasti di sisi b, tanpa perlu melihat f(b).

**Kondisi berhenti: lebar selang, bukan nilai fungsi.**

Perulangan berhenti saat \`b − a\` di bawah toleransi — ketelitian **letak** akarnya. Ini yang membuat jumlah langkahnya bisa dihitung di awal: lebarnya separuh setiap putaran, tidak peduli seperti apa fungsinya.

Berhenti saat \`|f(m)|\` kecil juga mungkin, tetapi jumlah langkahnya tidak bisa diramal — fungsi yang sangat landai di dekat akarnya bisa punya |f| kecil jauh sebelum letak akarnya tepat.

**Yang tidak diperiksa kode ini — dan harus diperiksa pemakainya.**

Kode ini menganggap f kontinu dan f(a), f(b) berlawanan tanda. Ia tidak memeriksa keduanya. Diberi fungsi yang melompat, ia tetap berjalan 20 langkah dan mengembalikan angka — seperti 1,2999997 untuk 1/(x − 1,3), tempat nilai fungsinya sekitar minus 3,5 juta.

Versi yang lebih aman memeriksa tanda di awal dan |f(hasil)| di akhir, lalu menolak kalau salah satunya gagal.`
    },
    {
      bahasa: 'python',
      kode: "import math\n\n# lebar setelah k langkah: (b - a) / 2**k\n# supaya < t:  k >= log2((b - a) / t)\n\nmath.ceil(math.log2(1 / 1e-6))       # 20\nmath.ceil(math.log2(1 / 1e-12))      # 40\n\n# git bisect di antara n commit\nmath.ceil(math.log2(1000))           # 10\nmath.ceil(math.log2(100000))         # 17",
      penjelasan: `Satu rumus yang menjawab "berapa lama?" sebelum algoritmenya dijalankan.

**Dari mana rumusnya.**

Selang awal selebar (b − a). Setiap langkah membelahnya dua. Setelah 1 langkah, lebarnya (b − a)/2. Setelah 2 langkah, (b − a)/4. Setelah k langkah, (b − a)/2^k.

Supaya lebarnya di bawah t: (b − a)/2^k < t, yaitu 2^k > (b − a)/t, yaitu k > log₂((b − a)/t). Karena k harus bilangan bulat, dibulatkan ke atas.

**Yang menarik: menambah digit itu murah.**

Enam digit ketelitian butuh 20 langkah. Dua belas digit butuh 40 — cuma **dua kali**, bukan seribu kali. Setiap 10 langkah tambahan memberi sekitar 3 digit lagi, karena 2¹⁰ = 1024 ≈ 10³.

Itu sifat logaritma yang sama yang membuat pencarian biner di larik sejuta elemen cuma butuh sekitar 20 perbandingan.

**Tetapi juga: ia tidak bisa lebih cepat dari itu.**

Metode bagi dua cuma memakai **tanda** f(m) — satu bit informasi per langkah. Ia tidak memakai seberapa besar f(m), atau seberapa curam fungsinya.

Metode Newton di topik turunan memakai lebih banyak informasi — nilai fungsi dan kemiringannya — dan hasilnya jauh lebih cepat untuk fungsi yang cukup mulus: jumlah digit yang benar berlipat dua di setiap langkah. Harganya: Newton tidak punya jaminan seperti metode bagi dua, dan bisa melenceng jauh kalau titik awalnya buruk.

Karena itu banyak pustaka numerik menggabungkan keduanya: Newton untuk kecepatan, dan metode bagi dua sebagai jaring pengaman ketika Newton mulai melenceng.

**Dan pada git bisect.**

Rumus yang sama berlaku, dengan n commit menggantikan (b − a)/t. Seribu commit butuh sekitar 10 kali uji; seratus ribu, 17. Mengkompilasi dan menguji tujuh belas versi jauh lebih cepat daripada membaca seratus ribu commit — asalkan syarat "sekali rusak, tetap rusak" terpenuhi.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Kontinuitas, teorema nilai antara, dan metode bagi dua
# ============================================
import math

# --------------------------------------------
# 1. Tiga syarat kontinu, tiga cara gagal
# --------------------------------------------
def dekati(f, a):
    """Nilai f sedikit di kiri dan kanan a."""
    kiri = [f(a - h) for h in (1e-2, 1e-4, 1e-6)]
    kanan = [f(a + h) for h in (1e-2, 1e-4, 1e-6)]
    return kiri, kanan

def f_lubang(x):
    return (x * x - 4) / (x - 2)            # tidak terdefinisi di x = 2

def f_tangga(x):
    return math.floor(x)                    # melompat di setiap bilangan bulat

def f_kutub(x):
    return 1 / (x - 1)                      # meledak di x = 1

print("--- tiga fungsi, tiga cara TIDAK kontinu ---")
for nama, f, a in [("(x^2 - 4)/(x - 2)", f_lubang, 2),
                   ("floor(x)", f_tangga, 1),
                   ("1/(x - 1)", f_kutub, 1)]:
    kiri, kanan = dekati(f, a)
    try:
        nilai = format(f(a), "g")
    except ZeroDivisionError:
        nilai = "tidak ada"
    print("\n  f(x) = " + nama + ", di x = " + str(a))
    print("    dari kiri  : " + "   ".join(format(v, "12.6f") for v in kiri))
    print("    dari kanan : " + "   ".join(format(v, "12.6f") for v in kanan))
    print("    f(" + str(a) + ")       : " + nilai)

print()
print("  syarat kontinu di a: f(a) ada, limitnya ada, dan keduanya sama")
print()
print("  (x^2-4)/(x-2): kiri dan kanan sama-sama menuju 4, tetapi f(2)")
print("                 tidak ada -> LUBANG. Bisa ditambal: f(2) = 4.")
print("  floor(x)     : kiri menuju 0, kanan menuju 1, tidak sepakat")
print("                 -> LOMPATAN. Tidak bisa ditambal.")
print("  1/(x-1)      : kiri ke minus tak hingga, kanan ke plus tak")
print("                 hingga -> KUTUB. Tidak bisa ditambal.")

# --------------------------------------------
# 2. Lompatan di dunia nyata: tarif per kilogram yang dibulatkan
# --------------------------------------------
print("\n--- tarif kirim Rp9.000 per kg, berat dibulatkan ke atas ---")
for berat in [0.99, 1.00, 1.01, 1.99, 2.00, 2.01]:
    tarif = 9000 * math.ceil(berat)
    print("  " + format(berat, ".2f") + " kg  ->  Rp" + format(tarif, ",").replace(",", "."))
print("  Tambah 10 gram dari 1,00 kg: tarif naik Rp9.000 sekaligus.")
print("  Fungsi tangga tidak kontinu, jadi perubahan kecil pada")
print("  masukan bisa memberi perubahan besar pada keluaran.")

# --------------------------------------------
# 3. Teorema nilai antara -> metode bagi dua
# --------------------------------------------
def g(x):
    return x ** 3 - x - 2

def bagi_dua(f, a, b, toleransi, cetak=False):
    fa = f(a)
    langkah = 0
    while b - a > toleransi:
        m = (a + b) / 2
        fm = f(m)
        langkah += 1
        if cetak and (langkah <= 5 or langkah % 5 == 0):
            print("  " + format(langkah, ">4") + "   [" + format(a, ".7f") + ", "
                  + format(b, ".7f") + "]   lebar " + format(b - a, ".1e"))
        if (fa < 0) == (fm < 0):
            a, fa = m, fm                   # tanda sama: akar di separuh kanan
        else:
            b = m                           # tanda beda: akar di separuh kiri
    return (a + b) / 2, langkah

print("\n--- akar x^3 - x - 2 = 0 dengan metode bagi dua ---")
print("  g(1) = " + str(g(1)) + "  (negatif)")
print("  g(2) = " + str(g(2)) + "   (positif)")
print("  g kontinu dan berganti tanda di [1, 2], jadi PASTI ada akar")
print("  di dalamnya -- itu teorema nilai antara.\n")
print("  langkah  selang sebelum dibelah")
akar, n = bagi_dua(g, 1.0, 2.0, 1e-6, cetak=True)
print("\n  akar  ~ " + format(akar, ".7f") + "   g(akar) = " + format(g(akar), ".1e"))
print("  langkah: " + str(n) + ", dihitung di awal: ceil(log2(1 / 1e-6)) = "
      + str(math.ceil(math.log2(1 / 1e-6))))
print()
print("  Setiap langkah membelah selang jadi dua. Setelah k langkah")
print("  lebarnya (b - a) / 2^k, jadi jumlah langkah bisa dihitung")
print("  SEBELUM mulai -- tidak bergantung pada bentuk fungsinya.")

# --------------------------------------------
# 4. Tanpa kontinuitas, jaminannya hilang
# --------------------------------------------
def kutub(x):
    return 1 / (x - 1.3)

print("\n--- bagi dua pada 1/(x - 1.3) di [1, 2] ---")
print("  f(1) = " + format(kutub(1), ".4f") + "   f(2) = " + format(kutub(2), ".4f")
      + "   (berganti tanda)")
hasil, n = bagi_dua(kutub, 1.0, 2.0, 1e-6)
print("  bagi dua 'menemukan'  x = " + format(hasil, ".7f")
      + " setelah " + str(n) + " langkah")
print("  nilai fungsinya di sana : " + format(kutub(hasil), ".4g"))
print()
print("  Tanda berganti bukan karena ada akar, melainkan karena")
print("  fungsinya MELOMPAT dari minus ke plus tak hingga di 1,3.")
print("  Teorema nilai antara mensyaratkan kontinu; tanpa syarat")
print("  itu, algoritmenya tetap berhenti dan tetap memberi angka")
print("  -- yang salah. Periksa selalu |f(hasil)| sebelum percaya.")

# --------------------------------------------
# 5. Gagasan yang sama di tempat lain
# --------------------------------------------
print("\n--- membelah dua di tempat lain ---")
for n_commit in [100, 1000, 100000]:
    print("  mencari commit pembawa galat di antara " + format(n_commit, ",").replace(",", ".")
          + " commit: " + str(math.ceil(math.log2(n_commit))) + " kali uji")
print("  (git bisect: syaratnya, sekali galatnya muncul ia tidak")
print("   hilang lagi di commit sesudahnya -- 'kontinu' versi git)")` },
  output: `--- tiga fungsi, tiga cara TIDAK kontinu ---

  f(x) = (x^2 - 4)/(x - 2), di x = 2
    dari kiri  :     3.990000       3.999900       3.999999
    dari kanan :     4.010000       4.000100       4.000001
    f(2)       : tidak ada

  f(x) = floor(x), di x = 1
    dari kiri  :     0.000000       0.000000       0.000000
    dari kanan :     1.000000       1.000000       1.000000
    f(1)       : 1

  f(x) = 1/(x - 1), di x = 1
    dari kiri  :  -100.000000   -10000.000000   -999999.999971
    dari kanan :   100.000000   10000.000000   1000000.000082
    f(1)       : tidak ada

  syarat kontinu di a: f(a) ada, limitnya ada, dan keduanya sama

  (x^2-4)/(x-2): kiri dan kanan sama-sama menuju 4, tetapi f(2)
                 tidak ada -> LUBANG. Bisa ditambal: f(2) = 4.
  floor(x)     : kiri menuju 0, kanan menuju 1, tidak sepakat
                 -> LOMPATAN. Tidak bisa ditambal.
  1/(x-1)      : kiri ke minus tak hingga, kanan ke plus tak
                 hingga -> KUTUB. Tidak bisa ditambal.

--- tarif kirim Rp9.000 per kg, berat dibulatkan ke atas ---
  0.99 kg  ->  Rp9.000
  1.00 kg  ->  Rp9.000
  1.01 kg  ->  Rp18.000
  1.99 kg  ->  Rp18.000
  2.00 kg  ->  Rp18.000
  2.01 kg  ->  Rp27.000
  Tambah 10 gram dari 1,00 kg: tarif naik Rp9.000 sekaligus.
  Fungsi tangga tidak kontinu, jadi perubahan kecil pada
  masukan bisa memberi perubahan besar pada keluaran.

--- akar x^3 - x - 2 = 0 dengan metode bagi dua ---
  g(1) = -2  (negatif)
  g(2) = 4   (positif)
  g kontinu dan berganti tanda di [1, 2], jadi PASTI ada akar
  di dalamnya -- itu teorema nilai antara.

  langkah  selang sebelum dibelah
     1   [1.0000000, 2.0000000]   lebar 1.0e+00
     2   [1.5000000, 2.0000000]   lebar 5.0e-01
     3   [1.5000000, 1.7500000]   lebar 2.5e-01
     4   [1.5000000, 1.6250000]   lebar 1.2e-01
     5   [1.5000000, 1.5625000]   lebar 6.2e-02
    10   [1.5195312, 1.5214844]   lebar 2.0e-03
    15   [1.5213623, 1.5214233]   lebar 6.1e-05
    20   [1.5213795, 1.5213814]   lebar 1.9e-06

  akar  ~ 1.5213799   g(akar) = 1.4e-06
  langkah: 20, dihitung di awal: ceil(log2(1 / 1e-6)) = 20

  Setiap langkah membelah selang jadi dua. Setelah k langkah
  lebarnya (b - a) / 2^k, jadi jumlah langkah bisa dihitung
  SEBELUM mulai -- tidak bergantung pada bentuk fungsinya.

--- bagi dua pada 1/(x - 1.3) di [1, 2] ---
  f(1) = -3.3333   f(2) = 1.4286   (berganti tanda)
  bagi dua 'menemukan'  x = 1.2999997 setelah 20 langkah
  nilai fungsinya di sana : -3.495e+06

  Tanda berganti bukan karena ada akar, melainkan karena
  fungsinya MELOMPAT dari minus ke plus tak hingga di 1,3.
  Teorema nilai antara mensyaratkan kontinu; tanpa syarat
  itu, algoritmenya tetap berhenti dan tetap memberi angka
  -- yang salah. Periksa selalu |f(hasil)| sebelum percaya.

--- membelah dua di tempat lain ---
  mencari commit pembawa galat di antara 100 commit: 7 kali uji
  mencari commit pembawa galat di antara 1.000 commit: 10 kali uji
  mencari commit pembawa galat di antara 100.000 commit: 17 kali uji
  (git bisect: syaratnya, sekali galatnya muncul ia tidak
   hilang lagi di commit sesudahnya -- 'kontinu' versi git)`,

  kompleksitas: {
    tabel: [
      { operasi: 'Memeriksa kontinuitas secara numerik', waktu: 'O(k)', memori: 'k = banyaknya h yang dicoba di tiap sisi' },
      { operasi: 'Metode bagi dua sampai lebar t', waktu: 'O(log((b − a)/t))', memori: 'O(1)' },
      { operasi: 'Evaluasi fungsi per langkah', waktu: '1 kali', memori: 'f(a) disimpan dari langkah sebelumnya' },
      { operasi: 'git bisect pada n commit', waktu: 'O(log n) kali uji', memori: 'O(1) di luar repo' }
    ],
    intuisi: `Metode bagi dua adalah pencarian biner di garis bilangan real. Setiap langkah memberi tepat satu bit informasi — kiri atau kanan — sehingga ketelitian t dari selang (b − a) butuh log₂((b − a)/t) bit, dan sebanyak itu pula langkahnya.

Karena yang dihitung adalah evaluasi fungsi, biaya sebenarnya bergantung pada seberapa mahal f. Untuk polinomial, 20 evaluasi tidak terasa. Untuk f yang berupa simulasi atau pengujian seluruh program — seperti pada git bisect — setiap evaluasi bisa butuh menit, dan logaritma itulah yang membuat pencarian di seratus ribu kemungkinan tetap praktis.

Satu hal yang tidak ditunjukkan notasi O: batas bawah ketelitiannya. Float cuma punya sekitar 16 digit desimal. Kalau toleransinya lebih kecil dari jarak antara dua float bertetangga di sekitar akar, a dan b akhirnya bersebelahan, titik tengahnya dibulatkan menjadi a atau b sendiri, dan lebar selangnya berhenti mengecil — perulangan \`while b - a > toleransi\` tidak pernah selesai. Pilih toleransi yang masuk akal untuk besar akarnya, atau batasi juga jumlah langkahnya.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap fungsi yang terdefinisi di setiap titik pasti kontinu.',
      kenapa: 'floor(x) terdefinisi di setiap bilangan real, tetapi melompat di setiap bilangan bulat. Terdefinisi cuma syarat pertama dari tiga.',
      benar: 'Periksa ketiga syarat: f(a) ada, limitnya ada dari kedua arah, dan keduanya sama.'
    },
    {
      salah: 'Memeriksa limit dari satu arah saja.',
      kenapa: 'Lompatan cuma terlihat kalau kedua arah dibandingkan. Dari kiri saja, floor(x) di x = 1 terlihat menuju 0 dengan mulus.',
      benar: 'Dekati titiknya dari kiri dan dari kanan, dan bandingkan hasilnya.'
    },
    {
      salah: 'Memakai metode bagi dua tanpa memastikan fungsinya kontinu di seluruh selang.',
      kenapa: 'Pergantian tanda bisa disebabkan kutub atau lompatan, bukan akar. Algoritmenya tetap berhenti normal dan mengembalikan angka yang salah tanpa peringatan.',
      benar: 'Pastikan fungsinya kontinu di selang itu, dan periksa |f(hasil)| setelah metodenya berhenti.'
    },
    {
      salah: 'Menyimpulkan tidak ada akar karena f(a) dan f(b) bertanda sama.',
      kenapa: 'Fungsi bisa menyeberangi sumbu x dua kali di dalam selang sehingga ujung-ujungnya bertanda sama. Teorema nilai antara cuma berlaku satu arah: tanda berlawanan menjamin akar, tanda sama tidak menjamin apa-apa.',
      benar: 'Bagi selangnya menjadi bagian-bagian lebih kecil dan periksa tanda di setiap batas.'
    },
    {
      salah: 'Memeriksa tanda dengan fa * fm > 0.',
      kenapa: 'Perkalian dua bilangan yang sangat kecil bisa dibulatkan menjadi nol oleh float, sehingga tandanya hilang dan metode memilih separuh yang salah.',
      benar: 'Bandingkan tanda masing-masing secara terpisah, misalnya (fa < 0) == (fm < 0).'
    },
    {
      salah: 'Memberi toleransi yang sangat kecil, misalnya 1e-20, untuk akar di sekitar 1.',
      kenapa: 'Jarak antara dua float bertetangga di sekitar 1 kira-kira 2e-16. Begitu a dan b bersebelahan, titik tengahnya dibulatkan menjadi salah satu ujung, lebar selang tidak mengecil lagi, dan perulangan tidak pernah berhenti.',
      benar: 'Pilih toleransi di atas ketelitian float untuk besar akarnya, dan tambahkan batas jumlah langkah sebagai pengaman.'
    },
    {
      salah: 'Memakai git bisect untuk galat yang muncul dan hilang berselang-seling.',
      kenapa: 'git bisect menganggap semua commit sesudah commit pembawa galat juga rusak. Kalau galatnya sempat diperbaiki lalu muncul lagi, pembelahan bisa mengarah ke commit yang salah.',
      benar: 'Pastikan pengujianmu memberi jawaban yang konsisten, dan persempit rentang commit ke bagian di mana galatnya tetap ada.'
    }
  ],

  analogi: `Bayangkan kamu mendaki **jalan setapak di gunung** dari pos A yang berada di bawah awan ke pos B yang berada di atas awan.

**Kontinuitas.** Jalan setapaknya tidak terputus: tidak ada jurang yang harus dilompati, tidak ada lubang di tanah. Kalau begitu, di suatu tempat di antara A dan B, kamu **pasti** melewati ketinggian awan. Kamu tidak tahu di mana, tetapi kamu yakin ada. Itu teorema nilai antara.

Sekarang bayangkan jalannya punya **jembatan gantung yang putus**, dan kamu naik kereta gantung dari satu sisi jurang ke sisi lain. Kamu bisa sampai dari bawah awan ke atas awan tanpa pernah berjalan melewati ketinggian awan. Tanpa jalan yang tersambung, jaminannya hilang.

**Metode bagi dua.** Kamu ingin tahu persis di mana jalan itu memotong ketinggian awan, tetapi kabut membuatmu cuma bisa tahu satu hal di setiap titik: "aku di bawah awan" atau "aku di atas awan".

Kamu berjalan ke titik tengah antara A dan B. Di atas awan? Berarti batasnya di separuh pertama. Kamu berjalan ke tengah separuh itu. Di bawah? Berarti di separuh kedua dari separuh itu. Setiap kali, sisa jalan yang harus dicari berkurang separuh.

Kalau jalannya sepanjang 1 km dan kamu ingin tahu letaknya sampai ketelitian 1 mm, kamu cuma perlu berhenti 20 kali — karena 2²⁰ kira-kira sejuta. Dan jumlah itu bisa kamu hitung sebelum berangkat, tanpa tahu seberapa curam jalannya.

**Lompatan.** Loket karcis kereta gantung itu memasang tarif per 10 menit perjalanan, dibulatkan ke atas. Perjalanan 10 menit bayar sekali; 10 menit 1 detik bayar dua kali. Satu detik yang membuat tarifnya berlipat — itulah lompatan, dan itulah tempat penumpang paling sering protes.

**git bisect.** Minggu lalu aplikasimu jalan, hari ini tidak, dan di antaranya ada 1.000 commit. Kamu memeriksa commit ke-500. Rusak? Berarti masalahnya muncul di 500 pertama. Kamu memeriksa ke-250. Sepuluh kali memeriksa, dan kamu menemukan commit persisnya.

Syaratnya sama dengan jalan setapak: sekali kamu sudah di atas awan, kamu tidak turun lagi. Kalau galatnya sempat hilang lalu muncul lagi di tengah jalan, pembelahan bisa mengarahkanmu ke tempat yang salah.`,

  latihan: [
    'Periksa ketiga syarat kontinu untuk f(x) = (x² − 9)/(x − 3) di x = 3, tentukan jenis diskontinuitasnya, dan tambal kalau bisa.',
    'Dekati |x|/x dari kiri dan kanan di x = 0 dengan angka, lalu tentukan jenis diskontinuitasnya.',
    'Tulis fungsi tarif parkir Rp3.000 untuk jam pertama dan Rp2.000 untuk setiap jam berikutnya yang dibulatkan ke atas, lalu tunjukkan di mana saja fungsinya melompat.',
    'Tunjukkan bahwa x³ + x − 1 = 0 punya akar di antara 0 dan 1 dengan teorema nilai antara.',
    'Hitung dengan rumus berapa langkah metode bagi dua yang dibutuhkan untuk menemukan akar latihan nomor 4 dengan toleransi 10⁻⁹, lalu jalankan dan bandingkan.',
    'Jalankan metode bagi dua pada tan(x) di selang [1, 2], lalu jelaskan hasilnya dengan memeriksa |f(hasil)|.',
    'Tambahkan pemeriksaan tanda di awal dan pemeriksaan |f(hasil)| di akhir ke fungsi bagi_dua, sehingga ia menolak masukan yang tidak memenuhi syarat.',
    'Beri contoh fungsi yang punya dua akar di [a, b] padahal f(a) dan f(b) bertanda sama.',
    'Hitung berapa kali uji yang dibutuhkan git bisect untuk 5.000 commit, lalu coba git bisect di repo milikmu sendiri.',
    'Jelaskan kenapa metode bagi dua disebut pencarian biner pada bilangan real, dan apa padanan larik terurut dalam metode ini.'
  ]
});


TOPICS.push({
  id: 'matdas-turunan',
  judul: 'Turunan & Penerapannya',
  kategori: 'matematika-dasar',
  tag: ['turunan', 'laju perubahan', 'aturan rantai', 'turunan numerik', 'nilai ekstrem', 'metode Newton', 'optimasi'],
  ringkas: 'Kemiringan garis singgung — dipakai untuk menemukan puncak, mencari akar dalam empat langkah, dan melatih jaringan syaraf.',

  fungsi: `**Mengukur seberapa cepat sesuatu berubah di satu titik, lalu memakai ukuran itu untuk menemukan titik terbaik atau titik nol sebuah fungsi.**

Terpakai di:

- **Optimasi** — ukuran, harga, atau parameter yang memberi hasil terbesar atau biaya terkecil ada di titik yang turunannya nol
- **Pembelajaran mesin** — gradient descent melatih model dengan berjalan berlawanan arah turunan fungsi galatnya
- **Mencari akar dengan cepat** — metode Newton memakai garis singgung dan menggandakan jumlah digit yang benar di setiap langkah
- **Laju di sistem nyata** — kecepatan unduh adalah turunan jumlah byte terhadap waktu; alat pemantau menghitungnya dari selisih dua pembacaan penghitung
- **Grafika dan animasi** — arah garis singgung menentukan pantulan, pencahayaan, dan kelengkungan kurva

Yang paling sering salah saat menghitung dengan tangan: **aturan rantai.** Turunan sin(x²) bukan cos(x²) — turunan bagian dalamnya, 2x, harus ikut dikalikan.

Dan yang paling sering salah saat menghitung dengan komputer: **h yang terlalu kecil.** Turunan numerik makin teliti saat h mengecil — sampai titik tertentu, lalu makin buruk, karena komputer mulai mengurangkan dua bilangan yang hampir sama.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung turunan dari definisinya, memeriksa hasil aturan turunan dengan turunan numerik, memilih h yang masuk akal, menyelesaikan soal nilai ekstrem, dan menjalankan metode Newton.',
    alat: ['Python 3 dengan modul math', 'Kertas untuk menurunkan dengan aturan'],
    langkah: [
      { judul: 'Hitung turunan dari definisinya',
        isi: `Turunan f di x adalah limit dari \`(f(x + h) − f(x))/h\` untuk h → 0 — kemiringan garis potong yang makin mendekati garis singgung.

Untuk f(x) = x² di x = 3, hitung hasil bagi itu untuk h = 1, 0,1, 0,01. Uraikan juga secara aljabar: hasilnya 6 + h, yang menuju 6.` },
      { judul: 'Turunkan dengan aturan',
        isi: `Aturan pangkat, perkalian, dan rantai:

- \`(xⁿ)' = n xⁿ⁻¹\`
- \`(f g)' = f' g + f g'\`
- \`(f(g(x)))' = f'(g(x)) · g'(x)\`

Kerjakan d/dx (x² sin x) dan d/dx sin(x²) di kertas.` },
      { judul: 'Periksa hasil kertasmu dengan angka',
        isi: `Tulis fungsi turunan numerik dengan selisih tengah: \`(f(x + h) − f(x − h)) / (2h)\` dengan h = 10⁻⁵.

Bandingkan dengan rumus hasil kertasmu di satu titik, misalnya x = 1,2. Kalau berbeda lebih dari sekitar 10⁻⁶, ada yang salah di rumusmu.` },
      { judul: 'Cari h terbaik sendiri',
        isi: `Untuk sin(x) di x = 1, hitung galat selisih maju dan selisih tengah untuk h = 10⁻¹ sampai 10⁻¹⁵.

Catat h yang memberi galat terkecil untuk masing-masing. Kamu akan melihat galat naik lagi untuk h yang terlalu kecil.` },
      { judul: 'Selesaikan soal nilai ekstrem',
        isi: `Tulis besaran yang ingin dimaksimalkan sebagai fungsi satu variabel, turunkan, samakan dengan nol, lalu buang jawaban yang tidak masuk akal secara fisik.

Periksa jenisnya: turunan positif sebelum titik itu dan negatif sesudahnya berarti puncak.` },
      { judul: 'Periksa dengan pencarian kasar',
        isi: `Coba ribuan nilai x di seluruh daerah asal dan ambil yang terbaik. Kalau jawabannya tidak cocok dengan jawaban kalkulusmu, salah satunya keliru.

Pencarian kasar lambat tetapi hampir tidak mungkin salah — pasangan yang baik untuk memeriksa kalkulus.` },
      { judul: 'Jalankan metode Newton',
        isi: `Mulai dari tebakan x₀, ulangi \`x ← x − f(x)/f'(x)\`. Cetak galatnya di setiap langkah.

Perhatikan jumlah angka nol di belakang koma pada galatnya: kira-kira berlipat dua setiap langkah.` }
    ],
    cek: [
      'Setiap rumus turunan yang kamu tulis cocok dengan turunan numerik di satu titik uji',
      'Kamu bisa menjelaskan kenapa h yang terlalu kecil membuat turunan numerik makin buruk',
      'Jawaban soal nilai ekstremmu cocok dengan pencarian kasar',
      'Metode Newton-mu mencapai ketelitian penuh float dalam beberapa langkah dari tebakan awal yang dekat'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `Topik limit bertanya "nilai apa yang didekati?". Turunan memakai pertanyaan itu untuk satu hal khusus: **kemiringan**.

**Dari garis potong ke garis singgung**

Kemiringan garis yang melewati dua titik di grafik f — di x dan di x + h — adalah \`(f(x + h) − f(x))/h\`. Makin kecil h, makin dekat kedua titiknya, dan garis potong itu makin mirip garis singgung.

Turunan adalah limitnya:

f'(x) = lim (f(x + h) − f(x))/h untuk h → 0

Untuk f(x) = x² di x = 3:

| h | Kemiringan garis potong |
|---|---|
| 1 | 7,000000 |
| 0,1 | 6,100000 |
| 0,01 | 6,010000 |
| 0,0001 | 6,000100 |

Aljabarnya: ((3 + h)² − 9)/h = (6h + h²)/h = 6 + h, yang menuju **6**. Pembagian dengan h sah karena h tidak pernah benar-benar nol — alasan yang sama dengan pencoretan (x − 1) di topik limit.

**Aturan turunan, diperiksa dengan angka**

Menurunkan dari definisi setiap kali terlalu panjang. Aturan-aturan turunan adalah hasil definisi itu yang sudah dikerjakan sekali untuk selamanya. Program membandingkan hasil aturan dengan turunan numerik di x = 1,2:

| Fungsi | Rumus turunan | Nilai | Numerik |
|---|---|---|---|
| x⁵ | 5x⁴ | 10,36800 | cocok |
| x² sin x | 2x sin x + x² cos x | 2,75869 | cocok |
| sin(x²) | cos(x²) · 2x | 0,31302 | cocok |
| sin(x²) | cos(x²) | 0,13042 | **SALAH** |

Baris terakhir adalah kesalahan paling umum: lupa **aturan rantai**. sin(x²) adalah fungsi di dalam fungsi, dan turunannya adalah turunan luar **dikali** turunan dalam. Lupa 2x membuat hasilnya meleset lebih dari dua kali lipat di titik ini.

**Kontinu belum tentu punya turunan**

Fungsi |x| di x = 0 kontinu: tidak ada lubang, tidak ada lompatan. Tetapi kemiringan dari kiri selalu −1 dan dari kanan selalu +1, seberapa pun kecil h. Limitnya tidak ada, jadi turunannya tidak ada. Grafiknya punya **sudut**.

Arah sebaliknya selalu berlaku: kalau f punya turunan di a, f pasti kontinu di a. Jadi punya turunan adalah syarat yang lebih kuat dari kontinu.

**Turunan numerik: h terkecil bukan yang terbaik**

Di komputer, limit h → 0 tidak bisa dijalankan. Yang bisa dilakukan adalah memilih h kecil. Tetapi seberapa kecil?

Galat turunan numerik sin(x) di x = 1:

| h | Selisih maju | Selisih tengah |
|---|---|---|
| 10⁻¹ | 4,29 × 10⁻² | 9,00 × 10⁻⁴ |
| 10⁻³ | 4,21 × 10⁻⁴ | 9,01 × 10⁻⁸ |
| 10⁻⁵ | 4,21 × 10⁻⁶ | **1,11 × 10⁻¹¹** |
| 10⁻⁷ | **4,18 × 10⁻⁸** | 1,94 × 10⁻¹⁰ |
| 10⁻⁹ | 5,25 × 10⁻⁸ | 2,97 × 10⁻⁹ |
| 10⁻¹¹ | 1,17 × 10⁻⁶ | 1,17 × 10⁻⁶ |
| 10⁻¹³ | 7,34 × 10⁻⁴ | 1,79 × 10⁻⁴ |
| 10⁻¹⁵ | 1,48 × 10⁻² | 1,48 × 10⁻² |

Galat turun, mencapai titik terendah, lalu **naik lagi**. Di h = 10⁻¹⁵, galat selisih maju sudah kembali ke kisaran galat di h = 10⁻¹, dan galat selisih tengah malah lebih buruk daripada di h = 10⁻¹.

Ada dua sumber galat yang saling tarik. Galat **pemotongan** — karena h bukan nol — mengecil saat h mengecil. Galat **pembulatan** — karena f(x + h) dan f(x) hampir sama, dan mengurangkan dua bilangan yang hampir sama membuang digit bermaknanya — membesar saat h mengecil. Titik terbaiknya ada di tengah: menurut teorinya sekitar 10⁻⁸ untuk selisih maju dan 10⁻⁵ untuk selisih tengah. Tabel ini cuma mencoba pangkat ganjil, dan yang terbaik di sana 10⁻⁷ dan 10⁻⁵ — sejalan dengan teori itu.

Selisih tengah lebih teliti karena galat pemotongannya sebanding h², bukan h. Pada h = 10⁻³, galatnya 9 × 10⁻⁸ dibanding 4 × 10⁻⁴.

**Nilai ekstrem: turunan nol di puncak**

Karton 30 × 30 cm dipotong persegi x cm di tiap sudut, lalu sisinya dilipat menjadi kotak tanpa tutup. Berapa x yang memberi volume terbesar?

V(x) = x(30 − 2x)², dan V'(x) = (30 − 2x)(30 − 6x). V' = 0 di x = 5 atau x = 15. x = 15 membuat alasnya nol, jadi jawabannya **x = 5**, dengan V = **2000 cm³**.

| x | V | V' |
|---|---|---|
| 4 | 1936,0 | +132,0 |
| 4,9 | 1999,4 | +12,1 |
| 5 | 2000,0 | 0 |
| 5,1 | 1999,4 | −11,9 |
| 6 | 1944,0 | −108,0 |

V' positif sebelum 5 — volumenya masih naik — dan negatif sesudahnya. Di puncaknya kemiringan tepat nol. Pencarian kasar di 15.001 nilai x memberi jawaban yang sama.

Gagasan ini yang dipakai pembelajaran mesin, dalam dimensi yang jauh lebih banyak: model dilatih dengan mencari parameter yang membuat turunan fungsi galatnya nol, dengan terus melangkah berlawanan arah turunannya.

**Metode Newton: garis singgung sebagai tebakan**

Di titik x, garis singgung f memotong sumbu x di \`x − f(x)/f'(x)\`. Kalau f cukup mulus, titik itu jauh lebih dekat ke akar daripada x. Ulangi.

Untuk x³ − x − 2 = 0, akar yang sama yang dicari metode bagi dua di topik kontinuitas:

| Langkah | x | Galat |
|---|---|---|
| 0 | 1,5000000000000000 | 2,1 × 10⁻² |
| 1 | 1,5217391304347827 | 3,6 × 10⁻⁴ |
| 2 | 1,5213798059647863 | 9,9 × 10⁻⁸ |
| 3 | 1,5213797068045751 | 7,5 × 10⁻¹⁵ |
| 4 | 1,5213797068045676 | 0 |

Galatnya kira-kira **dikuadratkan** setiap langkah: 10⁻² → 10⁻⁴ → 10⁻⁸ → 10⁻¹⁵. Jumlah digit yang benar berlipat dua. Metode bagi dua butuh 20 langkah untuk 6 digit; Newton mencapai batas ketelitian float dalam 4.

Dan satu hal yang mungkin sudah kamu kenali: iterasi \`x = (x + 2/x)/2\` untuk akar dua di topik limit adalah metode Newton untuk x² − 2 = 0. Uraikan \`x − (x² − 2)/(2x)\`, dan hasilnya persis itu.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "import math\n\n# selisih MAJU:   (f(x+h) - f(x)) / h          galat ~ h\n# selisih TENGAH: (f(x+h) - f(x-h)) / (2h)     galat ~ h^2\n\ndef turunan(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\nturunan(math.sin, 1) - math.cos(1)     # ~1e-11\n\n# h terlalu kecil:\nh = 1e-15\n(math.sin(1 + h) - math.sin(1)) / h    # galat ~1.5e-2",
      penjelasan: `Dua rumus yang sama-sama menuju turunan saat h → 0, tetapi berperilaku sangat berbeda saat h harus berupa bilangan sungguhan.

**Kenapa selisih tengah lebih teliti.**

Uraian Taylor — yang akan kamu temui di Kalkulus lanjut — menunjukkan bahwa \`f(x + h) = f(x) + h f'(x) + (h²/2) f''(x) + ...\`.

Selisih maju memakai f(x + h) dan f(x). Setelah dibagi h, sisa pertama yang tertinggal adalah \`(h/2) f''(x)\` — galatnya sebanding h.

Selisih tengah memakai f(x + h) dan f(x − h). Suku \`h²/2 · f''\` muncul di keduanya dengan tanda sama, sehingga **saling menghapus** saat dikurangkan. Sisa pertama yang tertinggal sebanding h².

Akibatnya: memperkecil h sepuluh kali memperkecil galat selisih maju sepuluh kali, tetapi galat selisih tengah seratus kali. Tabel di konsep menunjukkannya — dari h = 10⁻¹ ke 10⁻³, galat selisih tengah turun dari 9 × 10⁻⁴ ke 9 × 10⁻⁸.

**Kenapa h yang terlalu kecil malah memburuk.**

Float menyimpan sekitar 16 digit desimal. sin(1) = 0,8414709848078965. Dengan h = 10⁻¹⁵, sin(1 + h) berbeda dari sin(1) cuma di digit ke-15 atau ke-16.

Mengurangkan keduanya membuang 15 digit pertama yang sama, dan yang tersisa cuma satu atau dua digit — yang sebagian besar adalah galat pembulatan. Lalu hasil yang hampir tak bermakna itu dibagi dengan 10⁻¹⁵, sehingga galatnya ikut membesar 10¹⁵ kali.

Ini disebut **pembatalan**, dan ia terjadi setiap kali dua bilangan yang hampir sama dikurangkan.

**Jadi h berapa yang dipakai?**

Galat pemotongan ingin h kecil; galat pembulatan ingin h besar. Titik keseimbangannya bisa dihitung: untuk selisih maju, kira-kira akar kuadrat ketelitian float, sekitar 10⁻⁸. Untuk selisih tengah, kira-kira akar pangkat tiga ketelitian float, sekitar 10⁻⁵ sampai 10⁻⁶.

Program ini memakai h = 10⁻⁵ sebagai bawaan untuk selisih tengah, dan tabelnya membenarkan pilihan itu: galat 1,11 × 10⁻¹¹, yang terkecil di tabel.

**Dan kenapa turunan numerik tetap berguna, meski ada rumusnya.**

Untuk memeriksa rumus. Rumus turunan yang kamu tulis dengan tangan — atau yang diprogram di kode — bisa salah, dan turunan numerik adalah pembanding yang hampir tidak pernah salah dengan cara yang sama. Pustaka pembelajaran mesin memakai pemeriksaan seperti ini, disebut *gradient checking*, untuk menemukan galat di rumus turunan yang diprogram tangan.`
    },
    {
      bahasa: 'python',
      kode: "g  = lambda x: x ** 3 - x - 2\ndg = lambda x: 3 * x ** 2 - 1        # turunannya\n\nx = 1.5\nfor _ in range(4):\n    x = x - g(x) / dg(x)\n\n# galat: 2.1e-02 -> 3.6e-04 -> 9.9e-08 -> 7.5e-15 -> 0\n\n# akar dua dari topik limit = Newton untuk x^2 - 2:\n#   x - (x^2 - 2) / (2x)  =  (x + 2/x) / 2",
      penjelasan: `Satu baris di dalam perulangan, dan ia menemukan akar sampai batas ketelitian float dalam empat langkah.

**Dari mana rumusnya.**

Di titik x, garis singgung f punya kemiringan f'(x) dan melewati (x, f(x)). Persamaannya: \`y = f(x) + f'(x)(t − x)\`.

Garis itu memotong sumbu x saat y = 0: \`t = x − f(x)/f'(x)\`. Itulah tebakan berikutnya.

Gagasannya: di dekat akar, fungsi yang mulus hampir lurus. Jadi akar garis singgungnya hampir sama dengan akar fungsinya.

**Kenapa digitnya berlipat dua.**

Kalau tebakan sekarang meleset sejauh e, garis singgung meleset dari kurva sebesar kira-kira kelengkungan kali e². Jadi tebakan berikutnya meleset sekitar C × e², dengan C bergantung pada fungsinya.

Meleset 10⁻² menjadi meleset sekitar 10⁻⁴, lalu 10⁻⁸, lalu 10⁻¹⁶. Jumlah angka nol di belakang koma berlipat dua. Program menunjukkannya: 2,1 × 10⁻² → 3,6 × 10⁻⁴ → 9,9 × 10⁻⁸ → 7,5 × 10⁻¹⁵.

Ini disebut kekonvergenan **kuadratik**, dan ia yang membuat Newton jauh lebih cepat dari metode bagi dua, yang cuma memberi satu bit per langkah.

**Harganya: tidak ada jaminan.**

Metode bagi dua **pasti** berhasil untuk fungsi kontinu dengan tanda yang berlawanan di ujung-ujungnya. Newton tidak:

- Kalau f'(x) nol atau sangat kecil, pembagiannya meledak dan tebakan berikutnya terlempar jauh.
- Kalau tebakan awalnya jauh dari akar, Newton bisa melompat ke akar lain, berputar-putar, atau menjauh.
- Newton butuh rumus turunan — atau turunan numerik, dengan semua masalah pemilihan h.

Karena itu pustaka numerik yang serius sering menggabungkan keduanya: memulai dengan selang yang menjamin ada akar, memakai langkah Newton selama tebakannya tetap di dalam selang itu, dan kembali ke metode bagi dua kalau Newton melenceng keluar.

**Dan akar dua itu.**

Terapkan rumus Newton ke f(x) = x² − 2, yang turunannya 2x: \`x − (x² − 2)/(2x) = x − x/2 + 1/x = (x + 2/x)/2\`.

Iterasi yang dipakai di topik limit untuk mendekati √2 ternyata metode Newton, tanpa disebut namanya. Cara ini sering disebut metode Babilonia, karena perkiraan √2 yang sangat teliti sudah ditemukan di lempeng tanah liat Babilonia — meskipun sejarawan belum sepakat apakah mereka memakai iterasi persis ini.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Turunan: laju perubahan sesaat, dan kegunaannya
# ============================================
import math

# --------------------------------------------
# 1. Turunan = limit hasil bagi selisih
# --------------------------------------------
print("--- f(x) = x^2 di x = 3: kemiringan garis potong ---")
print("  h          (f(3+h) - f(3)) / h")
for h in [1, 0.1, 0.01, 0.001, 0.0001]:
    q = ((3 + h) ** 2 - 3 ** 2) / h
    print("  " + format(h, "<9g") + "  " + format(q, ".6f"))
print("  Aljabarnya: ((3+h)^2 - 9) / h = 6 + h, yang menuju 6.")
print("  f'(3) = 6 -- kemiringan garis singgung di x = 3.")

# --------------------------------------------
# 2. Turunan numerik: h yang terlalu kecil juga salah
# --------------------------------------------
print("\n--- turunan numerik sin(x) di x = 1 (tepatnya cos 1) ---")
tepat = math.cos(1)
print("  h        galat selisih maju     galat selisih tengah")
terbaik_maju = (None, 1.0)
terbaik_tengah = (None, 1.0)
for k in range(1, 16, 2):
    h = 10.0 ** -k
    maju = (math.sin(1 + h) - math.sin(1)) / h
    tengah = (math.sin(1 + h) - math.sin(1 - h)) / (2 * h)
    gm, gt = abs(maju - tepat), abs(tengah - tepat)
    if gm < terbaik_maju[1]:
        terbaik_maju = (h, gm)
    if gt < terbaik_tengah[1]:
        terbaik_tengah = (h, gt)
    print("  1e-" + format(k, "<2") + "    " + format(gm, "<22.2e") + " " + format(gt, ".2e"))
print()
print("  Galat mengecil saat h mengecil -- sampai titik tertentu,")
print("  lalu MEMBESAR lagi. Di h yang sangat kecil, sin(1+h) dan")
print("  sin(1) hampir sama, dan mengurangkan dua bilangan yang")
print("  hampir sama membuang hampir semua digit yang bermakna.")
print()
print("  h terbaik di tabel ini: selisih maju " + format(terbaik_maju[0], "g")
      + ", selisih tengah " + format(terbaik_tengah[0], "g"))

# --------------------------------------------
# 3. Aturan turunan, diperiksa dengan angka
# --------------------------------------------
def turunan(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)

print("\n--- aturan turunan, dibandingkan dengan turunan numerik ---")
x0 = 1.2
uji = [
    ("x^5          -> 5x^4",
     lambda x: x ** 5, lambda x: 5 * x ** 4),
    ("x^2 sin x    -> 2x sin x + x^2 cos x",
     lambda x: x * x * math.sin(x),
     lambda x: 2 * x * math.sin(x) + x * x * math.cos(x)),
    ("sin(x^2)     -> cos(x^2) 2x",
     lambda x: math.sin(x * x), lambda x: math.cos(x * x) * 2 * x),
    ("sin(x^2)     -> cos(x^2)   (lupa 2x)",
     lambda x: math.sin(x * x), lambda x: math.cos(x * x)),
]
print("  di x = 1.2")
for nama, f, rumus in uji:
    num, rum = turunan(f, x0), rumus(x0)
    cocok = "cocok" if abs(num - rum) < 1e-6 else "SALAH"
    print("  " + format(nama, "<37") + format(rum, "9.5f") + "  " + cocok)
print("  Aturan rantai: turunan bagian dalam (2x) tidak boleh lupa.")

# --------------------------------------------
# 4. Kontinu tetapi tidak punya turunan
# --------------------------------------------
print("\n--- |x| di x = 0 ---")
for h in [0.1, 0.001, 0.00001]:
    kiri = (abs(0 - h) - abs(0)) / (-h)
    kanan = (abs(0 + h) - abs(0)) / h
    print("  h = " + format(h, "<7g") + "  kemiringan kiri " + format(kiri, "+.0f")
          + "   kanan " + format(kanan, "+.0f"))
print("  |x| kontinu di 0 (tidak ada lubang atau lompatan), tetapi")
print("  kemiringan kiri dan kanan tidak pernah sepakat: ada SUDUT.")
print("  Punya turunan -> pasti kontinu. Kontinu -> belum tentu")
print("  punya turunan.")

# --------------------------------------------
# 5. Nilai ekstrem: turunan = 0
# --------------------------------------------
print("\n--- kotak tanpa tutup dari karton 30 x 30 cm ---")
print("  potong persegi x cm di tiap sudut, lipat sisinya")
print("  V(x)  = x (30 - 2x)^2")
print("  V'(x) = (30 - 2x)(30 - 6x) = 0   ->   x = 5  atau  x = 15")
print("  x = 15 memberi alas nol (V = 0), jadi yang dicari x = 5")
V = lambda x: x * (30 - 2 * x) ** 2
print("  V(5) = " + format(V(5), "g") + " cm^3\n")
for x in [3, 4, 4.9, 5, 5.1, 6, 7]:
    print("  x = " + format(x, "<4g") + "  V = " + format(V(x), "8.1f")
          + "   V' = " + format(turunan(V, x), "+8.1f"))
terbaik = max((V(i / 1000), i / 1000) for i in range(0, 15001))
print("\n  cek kasar: 15.001 nilai x dicoba, V terbesar di x = "
      + format(terbaik[1], "g"))
print("  V' positif sebelum 5 (volume masih naik), negatif sesudah 5")
print("  (sudah turun). Di puncaknya kemiringan tepat nol.")

# --------------------------------------------
# 6. Metode Newton: memakai garis singgung untuk mencari akar
# --------------------------------------------
print("\n--- akar x^3 - x - 2 = 0 dengan metode Newton ---")
g = lambda x: x ** 3 - x - 2
dg = lambda x: 3 * x ** 2 - 1
akar = 1.5213797068045676        # akar yang sama dengan topik kontinuitas
x = 1.5
print("  langkah   x                     galat")
print("  " + format(0, ">4") + "      " + format(x, "<.16f") + "    " + format(abs(x - akar), ".1e"))
for i in range(1, 5):
    x = x - g(x) / dg(x)
    print("  " + format(i, ">4") + "      " + format(x, "<.16f") + "    " + format(abs(x - akar), ".1e"))
print()
print("  Galatnya kira-kira DIKUADRATKAN di setiap langkah: jumlah")
print("  digit yang benar kira-kira berlipat dua. Bagi dua butuh 20")
print("  langkah untuk 6 digit; Newton sampai batas ketelitian float")
print("  dalam 4 langkah.")
print()
print("  Iterasi x = (x + 2/x) / 2 di topik limit adalah metode Newton")
print("  untuk x^2 - 2 = 0: x - (x^2 - 2)/(2x) = (x + 2/x) / 2.")` },
  output: `--- f(x) = x^2 di x = 3: kemiringan garis potong ---
  h          (f(3+h) - f(3)) / h
  1          7.000000
  0.1        6.100000
  0.01       6.010000
  0.001      6.001000
  0.0001     6.000100
  Aljabarnya: ((3+h)^2 - 9) / h = 6 + h, yang menuju 6.
  f'(3) = 6 -- kemiringan garis singgung di x = 3.

--- turunan numerik sin(x) di x = 1 (tepatnya cos 1) ---
  h        galat selisih maju     galat selisih tengah
  1e-1     4.29e-02               9.00e-04
  1e-3     4.21e-04               9.01e-08
  1e-5     4.21e-06               1.11e-11
  1e-7     4.18e-08               1.94e-10
  1e-9     5.25e-08               2.97e-09
  1e-11    1.17e-06               1.17e-06
  1e-13    7.34e-04               1.79e-04
  1e-15    1.48e-02               1.48e-02

  Galat mengecil saat h mengecil -- sampai titik tertentu,
  lalu MEMBESAR lagi. Di h yang sangat kecil, sin(1+h) dan
  sin(1) hampir sama, dan mengurangkan dua bilangan yang
  hampir sama membuang hampir semua digit yang bermakna.

  h terbaik di tabel ini: selisih maju 1e-07, selisih tengah 1e-05

--- aturan turunan, dibandingkan dengan turunan numerik ---
  di x = 1.2
  x^5          -> 5x^4                  10.36800  cocok
  x^2 sin x    -> 2x sin x + x^2 cos x   2.75869  cocok
  sin(x^2)     -> cos(x^2) 2x            0.31302  cocok
  sin(x^2)     -> cos(x^2)   (lupa 2x)   0.13042  SALAH
  Aturan rantai: turunan bagian dalam (2x) tidak boleh lupa.

--- |x| di x = 0 ---
  h = 0.1      kemiringan kiri -1   kanan +1
  h = 0.001    kemiringan kiri -1   kanan +1
  h = 1e-05    kemiringan kiri -1   kanan +1
  |x| kontinu di 0 (tidak ada lubang atau lompatan), tetapi
  kemiringan kiri dan kanan tidak pernah sepakat: ada SUDUT.
  Punya turunan -> pasti kontinu. Kontinu -> belum tentu
  punya turunan.

--- kotak tanpa tutup dari karton 30 x 30 cm ---
  potong persegi x cm di tiap sudut, lipat sisinya
  V(x)  = x (30 - 2x)^2
  V'(x) = (30 - 2x)(30 - 6x) = 0   ->   x = 5  atau  x = 15
  x = 15 memberi alas nol (V = 0), jadi yang dicari x = 5
  V(5) = 2000 cm^3

  x = 3     V =   1728.0   V' =   +288.0
  x = 4     V =   1936.0   V' =   +132.0
  x = 4.9   V =   1999.4   V' =    +12.1
  x = 5     V =   2000.0   V' =     +0.0
  x = 5.1   V =   1999.4   V' =    -11.9
  x = 6     V =   1944.0   V' =   -108.0
  x = 7     V =   1792.0   V' =   -192.0

  cek kasar: 15.001 nilai x dicoba, V terbesar di x = 5
  V' positif sebelum 5 (volume masih naik), negatif sesudah 5
  (sudah turun). Di puncaknya kemiringan tepat nol.

--- akar x^3 - x - 2 = 0 dengan metode Newton ---
  langkah   x                     galat
     0      1.5000000000000000    2.1e-02
     1      1.5217391304347827    3.6e-04
     2      1.5213798059647863    9.9e-08
     3      1.5213797068045751    7.5e-15
     4      1.5213797068045676    0.0e+00

  Galatnya kira-kira DIKUADRATKAN di setiap langkah: jumlah
  digit yang benar kira-kira berlipat dua. Bagi dua butuh 20
  langkah untuk 6 digit; Newton sampai batas ketelitian float
  dalam 4 langkah.

  Iterasi x = (x + 2/x) / 2 di topik limit adalah metode Newton
  untuk x^2 - 2 = 0: x - (x^2 - 2)/(2x) = (x + 2/x) / 2.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Turunan numerik selisih maju', waktu: '2 evaluasi f', memori: 'galat ~ h + ε/h' },
      { operasi: 'Turunan numerik selisih tengah', waktu: '2 evaluasi f', memori: 'galat ~ h² + ε/h' },
      { operasi: 'Metode Newton sampai d digit', waktu: 'sekitar log₂ d langkah', memori: 'dari tebakan yang cukup dekat' },
      { operasi: 'Metode bagi dua sampai d digit', waktu: 'sekitar 3,3 d langkah', memori: 'selalu, untuk fungsi kontinu' },
      { operasi: 'Pencarian kasar di n titik', waktu: 'O(n)', memori: 'ketelitian sebanding lebar/n' }
    ],
    intuisi: `ε di kolom galat adalah ketelitian float, sekitar 2 × 10⁻¹⁶. Kedua rumus turunan numerik butuh jumlah evaluasi yang sama, tetapi selisih tengah punya galat pemotongan yang jauh lebih kecil — jadi hampir selalu lebih baik untuk harga yang sama.

Perbandingan Newton dan metode bagi dua adalah perbandingan antara kekonvergenan kuadratik dan linear. Metode bagi dua memberi satu bit per langkah, jadi d digit desimal butuh sekitar d × log₂10 ≈ 3,3d langkah — 20 langkah untuk 6 digit. Newton menggandakan digit per langkah, jadi d digit butuh sekitar log₂d langkah setelah tebakannya cukup dekat — 4 langkah untuk 15 digit.

Pencarian kasar yang dipakai untuk memeriksa soal kotak memerlukan 15.001 evaluasi untuk ketelitian 0,001. Mahal, tetapi tidak butuh turunan dan tidak bisa melenceng — itulah kenapa ia pembanding yang baik.`
  },

  kesalahanUmum: [
    {
      salah: 'Menurunkan sin(x²) menjadi cos(x²).',
      kenapa: 'sin(x²) adalah komposisi fungsi, dan aturan rantai mengharuskan turunan luar dikali turunan dalam. Tanpa faktor 2x, hasilnya meleset — di x = 1,2 nilainya 0,13042, padahal seharusnya 0,31302.',
      benar: 'Tulis cos(x²) · 2x, dan periksa rumusmu dengan turunan numerik di satu titik.'
    },
    {
      salah: 'Menurunkan hasil kali sebagai hasil kali turunannya, misalnya (x² sin x)\' = 2x cos x.',
      kenapa: 'Turunan hasil kali bukan hasil kali turunan. Aturan perkalian memberi dua suku, masing-masing dengan satu faktor yang diturunkan.',
      benar: 'Pakai (f g)\' = f\' g + f g\', sehingga (x² sin x)\' = 2x sin x + x² cos x.'
    },
    {
      salah: 'Memakai h sekecil mungkin, misalnya 1e-15, untuk turunan numerik.',
      kenapa: 'f(x + h) dan f(x) menjadi hampir sama sehingga pengurangannya membuang hampir semua digit bermakna, lalu galatnya diperbesar oleh pembagian dengan h. Di h = 1e-15 galatnya sudah seburuk di h = 0,1.',
      benar: 'Pakai selisih tengah dengan h sekitar 1e-5 sampai 1e-6 untuk bilangan di sekitar 1, dan sesuaikan dengan besar x.'
    },
    {
      salah: 'Menganggap fungsi yang kontinu pasti punya turunan.',
      kenapa: '|x| kontinu di 0 tetapi kemiringan kiri dan kanannya berbeda, jadi turunannya tidak ada. Hanya arah sebaliknya yang selalu berlaku: punya turunan berarti kontinu.',
      benar: 'Periksa kemiringan dari kiri dan dari kanan secara terpisah di titik yang mencurigakan.'
    },
    {
      salah: 'Menerima semua penyelesaian V\'(x) = 0 sebagai jawaban soal nilai ekstrem.',
      kenapa: 'Turunan nol juga terjadi di titik minimum, di titik belok, dan di titik yang tidak masuk akal secara fisik. Pada soal kotak, x = 15 membuat turunan nol tetapi alasnya nol.',
      benar: 'Buang jawaban di luar daerah asal yang masuk akal, lalu periksa tanda turunan sebelum dan sesudah titiknya.'
    },
    {
      salah: 'Memakai metode Newton tanpa memeriksa turunannya dan tanpa batas jumlah langkah.',
      kenapa: 'Kalau f\'(x) nol atau sangat kecil, langkahnya meledak. Dari tebakan awal yang buruk, Newton bisa berputar atau menjauh tanpa pernah berhenti.',
      benar: 'Batasi jumlah langkah, tolak langkah dengan turunan yang terlalu kecil, dan pertimbangkan metode bagi dua sebagai pengaman.'
    }
  ],

  analogi: `Bayangkan kamu mengemudi dan melihat **dua hal di dasbor**: odometer yang mencatat jarak total, dan spidometer yang menunjukkan kecepatan.

**Turunan adalah spidometer.** Odometer bilang kamu sudah menempuh 120 km. Spidometer bilang kamu sedang melaju 60 km/jam — **sekarang**, di detik ini. Kecepatan adalah turunan jarak terhadap waktu.

Bagaimana spidometer tahu kecepatan "sekarang"? Ia tidak bisa mengukur di satu titik waktu — dalam nol detik, jarak yang ditempuh nol. Yang ia lakukan adalah mengukur jarak dalam selang yang sangat pendek, lalu membaginya dengan panjang selang itu. Itu hasil bagi selisih, dan makin pendek selangnya, makin dekat ke kecepatan sesaat.

**Tetapi selang yang terlalu pendek juga buruk.** Kalau spidometermu mengukur dalam sepersejuta detik, jarak yang ditempuh cuma beberapa mikrometer — lebih kecil dari getaran roda dan ketelitian sensornya. Angka yang muncul akan loncat-loncat tak karuan. Itulah galat pembulatan di turunan numerik: selang yang terlalu kecil membuat derau pengukuran lebih besar dari sinyalnya.

**Nilai ekstrem.** Kamu melempar bola ke atas. Ia naik, melambat, berhenti sesaat di titik tertinggi, lalu jatuh. Di puncaknya — dan hanya di sana — kecepatan vertikalnya **nol**. Mencari tinggi maksimum adalah mencari saat kecepatannya nol. Itu turunan sama dengan nol.

**Metode Newton.** Kamu tersesat di jalan menurun berkabut dan ingin tahu di mana jalan itu mencapai permukaan laut. Kamu cuma bisa melihat ketinggianmu dan kemiringan jalan di tempatmu berdiri.

Jadi kamu menebak: "kalau jalan ini terus menurun dengan kemiringan yang sama, aku akan sampai di permukaan laut sejauh sekian meter lagi." Kamu berjalan ke sana, melihat ketinggian dan kemiringan yang baru, lalu menebak lagi.

Karena jalannya melengkung, tebakan pertamamu meleset. Tetapi makin dekat ke tujuan, jalannya makin mirip garis lurus di sekitarmu, dan tebakanmu makin tepat — begitu cepatnya sampai setiap tebakan menggandakan ketepatanmu.

Kecuali kalau kamu berdiri di tempat yang datar. Kemiringan nol, dan tebakan "berapa jauh sampai permukaan laut" menjadi tak terhingga. Itulah saat Newton gagal.`,

  latihan: [
    'Hitung turunan f(x) = x³ di x = 2 dari definisinya dengan tabel h = 1, 0,1, 0,01, lalu uraikan aljabarnya untuk menunjukkan limitnya 12.',
    'Turunkan x³ cos x dan cos(x³) dengan aturan, lalu periksa keduanya dengan turunan numerik selisih tengah di x = 0,8.',
    'Buat tabel galat selisih maju dan selisih tengah untuk f(x) = eˣ di x = 1, dari h = 10⁻¹ sampai 10⁻¹⁵, dan tentukan h terbaik untuk masing-masing.',
    'Jelaskan dengan kata-katamu sendiri kenapa galat turunan numerik naik lagi untuk h yang terlalu kecil.',
    'Tunjukkan dengan angka bahwa f(x) = |x − 2| tidak punya turunan di x = 2.',
    'Sebuah kandang persegi panjang dibuat dengan 40 meter pagar, dengan satu sisinya berupa tembok. Cari ukuran yang memberi luas terbesar dengan turunan, lalu periksa dengan pencarian kasar.',
    'Jalankan metode Newton untuk x³ − 2x − 5 = 0 mulai dari x = 2, cetak galatnya setiap langkah, dan tunjukkan bahwa jumlah digit yang benar kira-kira berlipat dua.',
    'Jalankan metode Newton untuk x³ − 2x + 2 = 0 mulai dari x = 0, lalu jelaskan apa yang terjadi.',
    'Tunjukkan bahwa metode Newton untuk x² − a = 0 menghasilkan iterasi x = (x + a/x)/2, lalu pakai untuk menghitung √10.',
    'Hitung berapa langkah metode bagi dua dan berapa langkah Newton yang dibutuhkan untuk menemukan akar x³ − x − 2 = 0 sampai 12 digit, lalu bandingkan.'
  ]
});


TOPICS.push({
  id: 'matdas-integral',
  judul: 'Integral & Luas di Bawah Kurva',
  kategori: 'matematika-dasar',
  tag: ['integral', 'jumlah Riemann', 'antiturunan', 'teorema dasar kalkulus', 'trapesium', 'Simpson', 'akumulasi'],
  ringkas: 'Menjumlahkan potongan yang makin tipis — dan kenapa cara memotongnya lebih penting daripada jumlah potongannya.',

  fungsi: `**Menjumlahkan besaran yang terus berubah: luas di bawah kurva, jumlah dari laju, total dari kerapatan.**

Integral adalah kebalikan turunan. Turunan mengubah jarak menjadi kecepatan; integral mengubah kecepatan kembali menjadi jarak.

Terpakai di:

- **Dari laju ke jumlah** — total data yang diunduh dari grafik laju unduh, total energi dari grafik daya, total pengunjung dari laju kedatangan
- **Peluang dan statistika** — peluang di distribusi kontinu adalah luas di bawah kurva kerapatannya
- **Integrasi numerik** — simulasi fisika di gim dan animasi menjumlahkan kecepatan setiap bingkai untuk mendapat posisi
- **Pengolahan sinyal dan citra** — rata-rata, energi, dan banyak filter adalah integral atau jumlah yang mendekatinya
- **Analisis algoritme** — jumlah seperti 1 + 1/2 + ... + 1/n didekati dengan integral, dan dari situ muncul batas log n

Yang paling penting dipahami saat menghitung dengan komputer: **orde galat lebih menentukan daripada jumlah potongan.** Metode Simpson dengan 64 potongan lebih teliti daripada jumlah titik kiri dengan sejuta potongan.

Dan yang paling sering tertukar: **integral bukan selalu luas.** Bagian kurva di bawah sumbu x dihitung negatif, sehingga integral sin(x) dari 0 sampai 2π adalah 0 — padahal luas daerahnya 4.`,

  praktik: {
    tujuan: 'Kamu bisa menghitung integral tentu dengan antiturunan, mendekatinya dengan jumlah Riemann, trapesium, dan Simpson, mengukur sendiri orde galat masing-masing, dan membedakan integral bertanda dari luas.',
    alat: ['Python 3 dengan modul math', 'Kertas untuk mencari antiturunan'],
    langkah: [
      { judul: 'Gambar persegi panjangnya lebih dulu',
        isi: `Untuk luas di bawah x² dari 0 sampai 1, bagi selangnya menjadi 4 potongan dan gambar persegi panjang dengan tinggi dari titik kiri, lalu dari titik kanan.

Karena x² naik, persegi panjang titik kiri selalu di bawah kurva dan titik kanan selalu di atasnya. Luas sebenarnya ada di antara keduanya.` },
      { judul: 'Tulis keempat metode sebagai fungsi',
        isi: `Titik kiri, titik tengah, trapesium, dan Simpson — masing-masing menerima f, a, b, dan n.

Simpson membutuhkan n genap, karena ia memasang parabola pada setiap dua potongan. Beri bobot 1, 4, 2, 4, ..., 2, 4, 1 pada nilai-nilai fungsinya, lalu kalikan h/3.` },
      { judul: 'Ukur orde galatnya sendiri',
        isi: `Hitung integral eˣ dari 0 sampai 1 — nilai tepatnya e − 1 — dengan n = 4, 8, 16, 32, 64. Untuk setiap metode, bagi galat di n dengan galat di 2n.

Rasio 2 berarti galat sebanding 1/n. Rasio 4 berarti 1/n². Rasio 16 berarti 1/n⁴.` },
      { judul: 'Cari antiturunan dan pakai teorema dasar',
        isi: `Untuk ∫ (3x² + 2x) dx dari 1 sampai 3, cari F dengan F' = 3x² + 2x. Jawabannya F(x) = x³ + x² + C.

Integral tentunya F(3) − F(1). C boleh diabaikan: ia muncul di kedua suku dan saling menghapus.` },
      { judul: 'Periksa antiturunanmu dengan Simpson',
        isi: `Hitung integral yang sama dengan Simpson n = 10. Untuk polinomial berderajat tiga atau kurang, Simpson memberi hasil tepat sampai ketelitian float.

Kalau hasilnya berbeda dari F(3) − F(1), antiturunanmu salah.` },
      { judul: 'Bedakan integral dari luas',
        isi: `Hitung ∫ sin x dari 0 sampai 2π, lalu ∫ |sin x| di selang yang sama.

Yang pertama 0, yang kedua 4. Kalau soal meminta luas daerah, pakai nilai mutlak, atau pecah selangnya di titik potong sumbu x dan jumlahkan nilai mutlak tiap bagian.` },
      { judul: 'Ubah laju menjadi jumlah',
        isi: `Ambil laju yang berubah terhadap waktu, misalnya laju unduh dalam MB/detik. Hitung jumlah data dengan antiturunan, lalu dengan trapesium dari sampel tiap 5 detik dan tiap 1 detik.

Bandingkan juga dengan cara naif: laju awal dikali lamanya.` }
    ],
    cek: [
      'Kamu bisa menunjukkan dengan angka bahwa galat titik kiri, trapesium, dan Simpson masing-masing berorde 1/n, 1/n², dan 1/n⁴',
      'Antiturunan yang kamu cari cocok dengan hasil Simpson',
      'Kamu tahu kapan soal meminta integral bertanda dan kapan meminta luas',
      'Kamu bisa menghitung jumlah dari data laju yang diambil berkala'
    ]
  },

  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `Topik turunan menjawab "seberapa cepat berubah?". Integral menjawab pertanyaan kebalikannya: **kalau lajunya diketahui di setiap saat, berapa jumlah seluruhnya?**

**Notasi**

∫ f(x) dx dari a sampai b

Tanda ∫ adalah huruf S yang dipanjangkan — dari *summa*, jumlah. f(x) dx adalah luas satu potongan tipis: tinggi f(x) dikali lebar dx. Seluruh notasinya dibaca: "jumlahkan potongan-potongan setipis dx, dari a sampai b".

**Jumlah Riemann: luas sebagai jumlah persegi panjang**

Luas di bawah x² dari 0 sampai 1, yang nilai tepatnya 1/3:

| n | Titik kiri | Titik kanan | Titik tengah |
|---|---|---|---|
| 4 | 0,218750 | 0,468750 | 0,328125 |
| 10 | 0,285000 | 0,385000 | 0,332500 |
| 100 | 0,328350 | 0,338350 | 0,333325 |
| 1000 | 0,332834 | 0,333834 | 0,333333 |

x² naik di [0, 1], jadi titik kiri selalu terlalu rendah dan titik kanan selalu terlalu tinggi. Integral adalah angka yang diapit keduanya saat potongannya makin tipis — sebuah limit, seperti turunan.

Perhatikan kolom titik tengah: dengan 100 potongan galatnya sekitar 0,000008, sedangkan titik kiri dengan 1000 potongan masih meleset sekitar 0,0005.

**Orde galat: seberapa cepat mendekat**

Integral eˣ dari 0 sampai 1, galat masing-masing metode:

| n | Titik kiri | Titik tengah | Trapesium | Simpson |
|---|---|---|---|---|
| 4 | 2,06 × 10⁻¹ | 4,47 × 10⁻³ | 8,94 × 10⁻³ | 3,70 × 10⁻⁵ |
| 16 | 5,31 × 10⁻² | 2,80 × 10⁻⁴ | 5,59 × 10⁻⁴ | 1,46 × 10⁻⁷ |
| 64 | 1,34 × 10⁻² | 1,75 × 10⁻⁵ | 3,50 × 10⁻⁵ | 5,69 × 10⁻¹⁰ |

Setiap kali n digandakan, galat berkurang:

| Metode | Rasio galat | Orde |
|---|---|---|
| Titik kiri | 2,0 | 1/n |
| Titik tengah | 4,0 | 1/n² |
| Trapesium | 4,0 | 1/n² |
| Simpson | 16,0 | 1/n⁴ |

Rasionya hampir tidak berubah dari n = 4 sampai 64 — itulah yang membuat orde galat bisa diandalkan untuk meramal. Mau galat seperseribu kali lebih kecil? Titik kiri butuh potongan seribu kali lebih banyak. Simpson butuh cuma sekitar 5,6 kali lebih banyak, karena 5,6⁴ ≈ 1000.

Perbandingan yang paling mencolok:

| | Galat |
|---|---|
| Simpson, n = 64 | 5,69 × 10⁻¹⁰ |
| Titik kiri, n = 1.000.000 | 8,59 × 10⁻⁷ |

64 potongan mengalahkan sejuta. Memilih metode yang tepat lebih penting daripada menambah daya komputasi.

**Teorema dasar kalkulus**

Menjumlahkan potongan selalu bisa dilakukan, tetapi ada jalan pintas yang tepat. Kalau F adalah **antiturunan** f — artinya F' = f — maka:

∫ f(x) dx dari a sampai b = F(b) − F(a)

Untuk ∫ (3x² + 2x) dx dari 1 sampai 3: antiturunannya F(x) = x³ + x² + C, jadi hasilnya (27 + 9) − (1 + 1) = **34**. Simpson dengan 10 potongan memberi 34,0000000000.

Kenapa ini masuk akal? F(b) − F(a) adalah perubahan total F dari a ke b. Perubahan total adalah jumlah semua perubahan kecil sepanjang jalan. Dan setiap perubahan kecil adalah laju perubahannya — F' = f — dikali lebar langkahnya. Itu persis jumlah potongan f(x) dx.

Konstanta C tidak pernah perlu ditulis di integral tentu: dengan C = 0, 7, atau −100, F(3) − F(1) tetap 34, karena C muncul di kedua suku dan saling menghapus.

**Integral bertanda bukan luas**

| | Hasil |
|---|---|
| ∫ sin x dari 0 sampai 2π | 0,000000 |
| ∫ abs(sin x) dari 0 sampai 2π | 4,000000 |

Integral menghitung potongan di bawah sumbu x sebagai **negatif**, karena tingginya f(x) negatif. Setengah gelombang di atas (luas 2) dan setengah di bawah (luas 2) saling menghapus.

Itu bukan kesalahan — itu yang diinginkan kalau f adalah laju. Kecepatan negatif berarti bergerak mundur, dan integral kecepatan memberi **perpindahan**, yang memang bisa nol kalau kamu kembali ke titik awal. Tetapi kalau yang ditanya **luas** atau **jarak tempuh**, integralkan nilai mutlaknya.

**Dari laju ke jumlah**

Laju unduh r(t) = 5 + 3 sin(πt/30) MB/detik selama 30 detik:

| Cara | Jumlah data |
|---|---|
| tepat, dengan antiturunan | 207,296 MB |
| laju awal × 30 detik | 150,000 MB |
| trapesium, sampel tiap 5 detik | 205,981 MB |
| trapesium, sampel tiap 1 detik | 207,243 MB |

Mengalikan laju dengan waktu cuma benar kalau lajunya tetap. Di sini lajunya naik sampai 8 MB/detik di tengah, sehingga cara naif meleset lebih dari 57 MB.

Grafik lalu lintas jaringan menampilkan laju, dan jumlah data yang lewat adalah luas di bawah grafik itu. Kalau yang tersimpan cuma sampel laju berkala, jumlahnya didapat dengan menjumlahkan potongan seperti trapesium di atas.

Arah sebaliknya juga dipakai: antarmuka jaringan menyimpan penghitung **total** byte, dan alat pemantau menurunkan lajunya dari selisih dua pembacaan. Itu turunan. Turunan dan integral adalah dua arah dari hubungan yang sama.`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: "def trapesium(f, a, b, n):\n    h = (b - a) / n\n    return h * (f(a) / 2 + sum(f(a + i * h) for i in range(1, n)) + f(b) / 2)\n\ndef simpson(f, a, b, n):             # n harus genap\n    h = (b - a) / n\n    s = f(a) + f(b)\n    s += 4 * sum(f(a + i * h) for i in range(1, n, 2))   # titik ganjil\n    s += 2 * sum(f(a + i * h) for i in range(2, n, 2))   # titik genap\n    return h * s / 3\n\n# galat untuk e^x di [0, 1], n = 64:\n#   trapesium 3.50e-05     Simpson 5.69e-10",
      penjelasan: `Dua fungsi yang memakai **titik yang sama persis** — n + 1 nilai fungsi di titik-titik yang berjarak sama — dan berbeda cuma di bobotnya. Perbedaan bobot itu yang membuat galat Simpson lebih dari enam puluh ribu kali lebih kecil di n = 64.

**Trapesium: garis lurus di setiap potongan.**

Setiap potongan didekati trapesium: sisi kiri setinggi f(xᵢ), sisi kanan setinggi f(xᵢ₊₁), dan luasnya h × rata-rata keduanya.

Jumlahkan semua trapesium, dan setiap titik dalam muncul **dua kali** — sebagai sisi kanan satu trapesium dan sisi kiri trapesium berikutnya — masing-masing dengan bobot setengah. Titik ujung cuma muncul sekali. Karena itu bobotnya \`1/2, 1, 1, ..., 1, 1/2\`, persis seperti di kode.

Galatnya berasal dari lengkungan kurva di antara dua titik, yang tidak bisa diikuti garis lurus. Galat per potongan sebanding h³, dan ada n potongan, jadi galat totalnya sebanding n × h³ = (b − a) × h² — orde 1/n².

**Simpson: parabola di setiap dua potongan.**

Simpson mengambil tiga titik berurutan dan memasang **parabola** yang melewati ketiganya, lalu menghitung luas di bawah parabola itu dengan tepat. Hasilnya: \`h/3 × (f₀ + 4f₁ + f₂)\` untuk setiap pasangan potongan.

Jumlahkan semua pasangan, dan titik tengah setiap pasangan mendapat bobot 4, sementara titik yang menjadi batas dua pasangan mendapat 1 + 1 = 2. Itulah pola \`1, 4, 2, 4, 2, ..., 4, 1\` — dan itu juga kenapa n harus genap: potongannya harus bisa dipasangkan.

**Kenapa Simpson jauh lebih baik dari yang diharapkan.**

Parabola bisa mengikuti kurva berderajat dua dengan tepat, jadi orang mungkin mengira galatnya berorde 1/n³. Kenyataannya 1/n⁴ — satu orde lebih baik.

Alasannya simetri: galat parabola pada kurva berderajat tiga ternyata saling menghapus di kedua sisi titik tengah. Akibatnya Simpson memberi hasil **tepat** untuk polinomial berderajat tiga atau kurang. Itu sebabnya Simpson dengan 10 potongan memberi 34,0000000000 untuk integral 3x² + 2x — tepat, bukan cuma dekat.

**Pelajaran yang lebih umum.**

Menambah titik adalah cara paling mahal untuk menambah ketelitian. Cara yang jauh lebih murah adalah memakai titik yang sudah ada dengan lebih cerdas. Simpson tidak menghitung satu pun nilai fungsi lebih banyak dari trapesium, tetapi memakai bentuk kurva — lengkungannya — yang diabaikan trapesium.`
    },
    {
      bahasa: 'python',
      kode: "# teorema dasar: integral f dari a ke b = F(b) - F(a),  F' = f\nF = lambda x: x ** 3 + x ** 2          # antiturunan 3x^2 + 2x\nF(3) - F(1)                            # 34\n\n# integral bertanda vs luas\nsimpson(math.sin, 0, 2 * math.pi, 100)                    # 0.000000\nsimpson(lambda x: abs(math.sin(x)), 0, 2 * math.pi, 100)  # 4.000000\n\n# laju -> jumlah\nr = lambda t: 5 + 3 * math.sin(math.pi * t / 30)   # MB/detik\n150 + 180 / math.pi                    # 207.296 MB, tepat\nr(0) * 30                              # 150.000 MB, naif",
      penjelasan: `Tiga pemakaian integral, dan masing-masing menjawab pertanyaan yang sedikit berbeda.

**Teorema dasar: kenapa antiturunan memberi luas.**

Bayangkan F adalah jarak yang sudah ditempuh sebuah mobil, dan f = F' adalah kecepatannya. Jarak total dari jam a sampai jam b adalah F(b) − F(a) — posisi akhir dikurangi posisi awal.

Tetapi jarak total juga bisa dihitung dengan cara lain: bagi perjalanan menjadi selang-selang pendek, kalikan kecepatan di setiap selang dengan panjangnya, lalu jumlahkan. Itu jumlah Riemann dari f.

Dua cara menghitung hal yang sama harus memberi hasil yang sama. Itulah isi teorema dasar kalkulus, dan itu yang membuat integral — yang didefinisikan sebagai limit jumlah — bisa dihitung dengan membalik turunan.

**Dari mana 150 + 180/π.**

Antiturunan 5 adalah 5t. Antiturunan 3 sin(πt/30) adalah \`−(90/π) cos(πt/30)\` — periksa dengan menurunkannya, dan aturan rantai memberi faktor π/30 yang mengembalikan 3 sin(πt/30).

Dari 0 sampai 30: bagian pertama 150. Bagian kedua \`−(90/π)(cos π − cos 0) = −(90/π)(−1 − 1) = 180/π\`. Totalnya 150 + 180/π ≈ 207,296.

**Kenapa cara naif meleset.**

\`r(0) × 30\` menganggap laju tetap 5 MB/detik sepanjang 30 detik. Padahal laju naik sampai 8 MB/detik di detik ke-15. Mengalikan laju dengan waktu adalah integral dari fungsi **tetap** — benar hanya kalau lajunya memang tidak berubah.

**Integral bertanda: arah ikut dihitung.**

Integral sin x dari 0 sampai 2π bernilai 0 karena separuh gelombangnya di bawah sumbu. Kalau sin x adalah kecepatan sebuah benda yang bergerak maju lalu mundur, 0 adalah jawaban yang benar untuk "seberapa jauh ia dari titik awal" — ia kembali ke tempat semula.

Tetapi untuk "berapa jarak yang ditempuh", jawabannya 4: maju 2, lalu mundur 2. Itu integral nilai mutlaknya.

Kedua pertanyaan itu sah, dan integral menjawab keduanya — asalkan kamu tahu mana yang sedang ditanyakan. Kesalahan yang umum adalah menghitung integral biasa saat soal meminta luas, lalu heran kenapa hasilnya nol atau negatif.`
    }
  ],

  kode: { python: String.raw`# ============================================
# Integral: menjumlahkan potongan yang makin tipis
# ============================================
import math

def kiri(f, a, b, n):
    h = (b - a) / n
    return h * sum(f(a + i * h) for i in range(n))

def kanan(f, a, b, n):
    h = (b - a) / n
    return h * sum(f(a + i * h) for i in range(1, n + 1))

def tengah(f, a, b, n):
    h = (b - a) / n
    return h * sum(f(a + (i + 0.5) * h) for i in range(n))

def trapesium(f, a, b, n):
    h = (b - a) / n
    return h * (f(a) / 2 + sum(f(a + i * h) for i in range(1, n)) + f(b) / 2)

def simpson(f, a, b, n):                 # n harus genap
    h = (b - a) / n
    s = f(a) + f(b)
    s += 4 * sum(f(a + i * h) for i in range(1, n, 2))
    s += 2 * sum(f(a + i * h) for i in range(2, n, 2))
    return h * s / 3

# --------------------------------------------
# 1. Jumlah Riemann: luas sebagai jumlah persegi panjang
# --------------------------------------------
print("--- luas di bawah x^2 dari 0 sampai 1 (tepatnya 1/3) ---")
f = lambda x: x * x
print("  n        kiri        kanan       tengah")
for n in [4, 10, 100, 1000]:
    print("  " + format(n, "<6") + format(kiri(f, 0, 1, n), "10.6f")
          + format(kanan(f, 0, 1, n), "12.6f") + format(tengah(f, 0, 1, n), "12.6f"))
print("  1/3 =   0.333333")
print()
print("  x^2 naik di [0, 1], jadi titik kiri selalu terlalu rendah dan")
print("  titik kanan selalu terlalu tinggi. Integral adalah angka yang")
print("  diapit keduanya saat potongannya makin tipis.")

# --------------------------------------------
# 2. Seberapa cepat galatnya mengecil
# --------------------------------------------
print("\n--- integral e^x dari 0 sampai 1 (tepatnya e - 1) ---")
tepat = math.e - 1
cara = [("kiri", kiri), ("tengah", tengah),
        ("trapesium", trapesium), ("Simpson", simpson)]
print("  " + format("n", "<4") + "".join(format(nama, ">13") for nama, _ in cara))
galat = {nama: [] for nama, _ in cara}
for n in [4, 8, 16, 32, 64]:
    baris = "  " + format(n, "<4")
    for nama, fungsi in cara:
        g = abs(fungsi(math.exp, 0, 1, n) - tepat)
        galat[nama].append(g)
        baris += format(g, "13.2e")
    print(baris)
print("\n  galat berkurang berapa kali setiap n digandakan:")
for nama, _ in cara:
    rasio = [galat[nama][i] / galat[nama][i + 1] for i in range(4)]
    print("  " + format(nama, "<10") + "  " + "  ".join(format(r, "5.1f") for r in rasio))
print()
print("  Titik kiri: n dua kali -> galat separuh      (orde 1/n)")
print("  Tengah dan trapesium: galat jadi 1/4         (orde 1/n^2)")
print("  Simpson: galat jadi 1/16                     (orde 1/n^4)")
g_sejuta = abs(kiri(math.exp, 0, 1, 1_000_000) - tepat)
print()
print("  Simpson, n = 64         : galat " + format(galat["Simpson"][-1], ".2e"))
print("  titik kiri, n = 1 juta  : galat " + format(g_sejuta, ".2e"))
print("  Orde galat lebih menentukan daripada jumlah potongan.")

# --------------------------------------------
# 3. Teorema dasar kalkulus: integral lewat antiturunan
# --------------------------------------------
print("\n--- integral (3x^2 + 2x) dari 1 sampai 3 ---")
F = lambda x: x ** 3 + x ** 2                     # antiturunannya
print("  antiturunan  F(x) = x^3 + x^2 + C")
print("  F(3) - F(1) = (27 + 9) - (1 + 1) = " + format(F(3) - F(1), "g"))
print("  Simpson n=10                     = "
      + format(simpson(lambda x: 3 * x * x + 2 * x, 1, 3, 10), ".10f"))
for C in [0, 7, -100]:
    print("  dengan C = " + format(C, "<4") + ": F(3) - F(1) = "
          + format((F(3) + C) - (F(1) + C), "g"))
print("  C selalu saling menghapus, jadi di integral tentu ia tidak")
print("  pernah perlu ditulis.")

# --------------------------------------------
# 4. Integral bertanda bukan luas
# --------------------------------------------
print("\n--- sin(x) dari 0 sampai 2 pi ---")
print("  integral sin(x)        : " + format(simpson(math.sin, 0, 2 * math.pi, 100), ".6f"))
print("  integral |sin(x)|      : " + format(simpson(lambda x: abs(math.sin(x)), 0, 2 * math.pi, 100), ".6f"))
print("  Bagian di bawah sumbu x dihitung NEGATIF. Luas 2 di atas dan")
print("  luas 2 di bawah saling menghapus menjadi 0. Luas sungguhan")
print("  (4) didapat dari integral nilai mutlaknya.")

# --------------------------------------------
# 5. Dari laju ke jumlah: data yang diunduh
# --------------------------------------------
print("\n--- laju unduh r(t) = 5 + 3 sin(pi t / 30) MB/detik, 30 detik ---")
r = lambda t: 5 + 3 * math.sin(math.pi * t / 30)
tepat = 150 + 180 / math.pi
print("  " + format("tepat (antiturunan)", "<32") + ": " + format(tepat, "8.3f") + " MB")
print("  " + format("laju awal x 30 detik", "<32") + ": " + format(r(0) * 30, "8.3f") + " MB")
for dt in [5, 1]:
    n = 30 // dt
    print("  " + format("trapesium, sampel tiap " + str(dt) + " detik", "<32") + ": "
          + format(trapesium(r, 0, 30, n), "8.3f") + " MB")
print()
print("  Grafik lalu lintas jaringan menampilkan LAJU (MB/detik).")
print("  Jumlah data yang lewat adalah luas di bawah grafik itu.")
print("  Kalau yang tersimpan cuma sampel laju berkala, jumlahnya")
print("  didapat dengan menjumlahkan potongan seperti di atas.")
print()
print("  Arah sebaliknya juga dipakai: antarmuka jaringan menyimpan")
print("  penghitung TOTAL byte, dan alat pemantau menurunkan lajunya")
print("  dari selisih dua pembacaan -- itu turunan, bukan integral.")` },
  output: `--- luas di bawah x^2 dari 0 sampai 1 (tepatnya 1/3) ---
  n        kiri        kanan       tengah
  4       0.218750    0.468750    0.328125
  10      0.285000    0.385000    0.332500
  100     0.328350    0.338350    0.333325
  1000    0.332834    0.333834    0.333333
  1/3 =   0.333333

  x^2 naik di [0, 1], jadi titik kiri selalu terlalu rendah dan
  titik kanan selalu terlalu tinggi. Integral adalah angka yang
  diapit keduanya saat potongannya makin tipis.

--- integral e^x dari 0 sampai 1 (tepatnya e - 1) ---
  n            kiri       tengah    trapesium      Simpson
  4        2.06e-01     4.47e-03     8.94e-03     3.70e-05
  8        1.05e-01     1.12e-03     2.24e-03     2.33e-06
  16       5.31e-02     2.80e-04     5.59e-04     1.46e-07
  32       2.67e-02     6.99e-05     1.40e-04     9.10e-09
  64       1.34e-02     1.75e-05     3.50e-05     5.69e-10

  galat berkurang berapa kali setiap n digandakan:
  kiri          2.0    2.0    2.0    2.0
  tengah        4.0    4.0    4.0    4.0
  trapesium     4.0    4.0    4.0    4.0
  Simpson      15.9   16.0   16.0   16.0

  Titik kiri: n dua kali -> galat separuh      (orde 1/n)
  Tengah dan trapesium: galat jadi 1/4         (orde 1/n^2)
  Simpson: galat jadi 1/16                     (orde 1/n^4)

  Simpson, n = 64         : galat 5.69e-10
  titik kiri, n = 1 juta  : galat 8.59e-07
  Orde galat lebih menentukan daripada jumlah potongan.

--- integral (3x^2 + 2x) dari 1 sampai 3 ---
  antiturunan  F(x) = x^3 + x^2 + C
  F(3) - F(1) = (27 + 9) - (1 + 1) = 34
  Simpson n=10                     = 34.0000000000
  dengan C = 0   : F(3) - F(1) = 34
  dengan C = 7   : F(3) - F(1) = 34
  dengan C = -100: F(3) - F(1) = 34
  C selalu saling menghapus, jadi di integral tentu ia tidak
  pernah perlu ditulis.

--- sin(x) dari 0 sampai 2 pi ---
  integral sin(x)        : 0.000000
  integral |sin(x)|      : 4.000000
  Bagian di bawah sumbu x dihitung NEGATIF. Luas 2 di atas dan
  luas 2 di bawah saling menghapus menjadi 0. Luas sungguhan
  (4) didapat dari integral nilai mutlaknya.

--- laju unduh r(t) = 5 + 3 sin(pi t / 30) MB/detik, 30 detik ---
  tepat (antiturunan)             :  207.296 MB
  laju awal x 30 detik            :  150.000 MB
  trapesium, sampel tiap 5 detik  :  205.981 MB
  trapesium, sampel tiap 1 detik  :  207.243 MB

  Grafik lalu lintas jaringan menampilkan LAJU (MB/detik).
  Jumlah data yang lewat adalah luas di bawah grafik itu.
  Kalau yang tersimpan cuma sampel laju berkala, jumlahnya
  didapat dengan menjumlahkan potongan seperti di atas.

  Arah sebaliknya juga dipakai: antarmuka jaringan menyimpan
  penghitung TOTAL byte, dan alat pemantau menurunkan lajunya
  dari selisih dua pembacaan -- itu turunan, bukan integral.`,

  kompleksitas: {
    tabel: [
      { operasi: 'Titik kiri atau kanan, n potongan', waktu: 'O(n)', memori: 'galat ~ 1/n' },
      { operasi: 'Titik tengah atau trapesium', waktu: 'O(n)', memori: 'galat ~ 1/n²' },
      { operasi: 'Simpson', waktu: 'O(n)', memori: 'galat ~ 1/n⁴, n genap' },
      { operasi: 'Antiturunan lalu F(b) − F(a)', waktu: 'O(1) setelah F ditemukan', memori: 'tepat, tetapi F tidak selalu ada dalam rumus sederhana' },
      { operasi: 'Mencapai galat ε', waktu: 'titik kiri ~1/ε, trapesium ~1/√ε, Simpson ~1/ε^(1/4) potongan', memori: 'O(1) kalau dijumlah berjalan' }
    ],
    intuisi: `Keempat metode numerik sama-sama O(n) — satu evaluasi fungsi per titik. Yang membedakan adalah seberapa banyak ketelitian yang didapat untuk setiap evaluasi.

Baris terakhir menerjemahkan orde galat menjadi biaya. Untuk integral eˣ di topik ini, mencapai galat 10⁻⁸ butuh sekitar 10⁸ potongan dengan titik kiri, beberapa ribu dengan trapesium, dan cuma beberapa puluh dengan Simpson — untuk hasil yang sama.

Antiturunan adalah jalan tercepat dan tepat — kalau ada. Banyak fungsi penting tidak punya antiturunan yang bisa ditulis dengan fungsi-fungsi biasa; contoh yang paling terkenal adalah e^(−x²), kurva lonceng di statistika. Untuk fungsi seperti itu, integrasi numerik bukan pilihan kedua, melainkan satu-satunya cara.`
  },

  kesalahanUmum: [
    {
      salah: 'Menganggap integral tentu selalu sama dengan luas daerah.',
      kenapa: 'Bagian kurva di bawah sumbu x dihitung negatif, sehingga bagian atas dan bawah bisa saling menghapus. Integral sin x dari 0 sampai 2π adalah 0, padahal luasnya 4.',
      benar: 'Untuk luas, integralkan nilai mutlaknya, atau pecah selang di titik potong sumbu x dan jumlahkan nilai mutlak setiap bagian.'
    },
    {
      salah: 'Menambah jumlah potongan sebagai satu-satunya cara menambah ketelitian.',
      kenapa: 'Dengan metode berorde rendah, galat turun sangat lambat. Titik kiri dengan sejuta potongan masih kalah teliti dari Simpson dengan 64 potongan.',
      benar: 'Pilih metode dengan orde galat yang lebih tinggi lebih dulu, baru tambah potongannya bila perlu.'
    },
    {
      salah: 'Memakai Simpson dengan jumlah potongan ganjil.',
      kenapa: 'Simpson memasang parabola pada setiap pasangan potongan, jadi potongannya harus bisa dipasangkan. Dengan n ganjil, pola bobotnya rusak dan hasilnya salah tanpa pesan galat.',
      benar: 'Pastikan n genap, dan periksa di awal fungsi supaya n ganjil ditolak.'
    },
    {
      salah: 'Mengalikan laju awal dengan lamanya waktu untuk mendapat jumlah.',
      kenapa: 'Cara itu hanya benar kalau lajunya tetap. Pada laju unduh yang berubah di topik ini, cara itu memberi 150 MB padahal jumlah sebenarnya sekitar 207 MB.',
      benar: 'Integralkan lajunya, dengan antiturunan atau dengan menjumlahkan sampel memakai trapesium.'
    },
    {
      salah: 'Lupa aturan rantai saat memeriksa antiturunan, misalnya menganggap antiturunan sin(πt/30) adalah −cos(πt/30).',
      kenapa: 'Menurunkan −cos(πt/30) memberi (π/30) sin(πt/30), bukan sin(πt/30). Faktor dalamnya harus diimbangi dengan membagi.',
      benar: 'Tulis −(30/π) cos(πt/30), lalu periksa dengan menurunkannya kembali atau dengan Simpson.'
    },
    {
      salah: 'Mengira setiap fungsi punya antiturunan yang bisa ditulis dengan rumus.',
      kenapa: 'Banyak fungsi penting, seperti e^(−x²), tidak punya antiturunan dalam fungsi-fungsi dasar. Mencarinya lewat rumus akan sia-sia.',
      benar: 'Pakai integrasi numerik seperti Simpson untuk fungsi seperti itu, atau fungsi pustaka yang sudah menyediakannya.'
    }
  ],

  analogi: `Bayangkan kamu mengisi **bak mandi** dengan keran yang alirannya berubah-ubah — kadang deras, kadang kecil — dan ingin tahu berapa liter air di bak setelah setengah jam.

**Laju dan jumlah.** Keran menunjukkan **laju**: sekian liter per menit, saat ini. Bak menunjukkan **jumlah**: sekian liter, total. Integral mengubah catatan laju menjadi jumlah; turunan mengubah catatan jumlah menjadi laju.

**Cara naif.** Kamu melihat keran di menit pertama mengalir 5 liter per menit, lalu mengalikan dengan 30 menit: 150 liter. Tetapi kerannya makin deras di tengah jalan, jadi baknya berisi jauh lebih banyak. Mengalikan laju dengan waktu hanya benar kalau kerannya tidak pernah diputar.

**Jumlah Riemann.** Kamu mencatat laju setiap 5 menit, lalu menganggap laju itu berlaku selama 5 menit berikutnya. Enam catatan, enam perkalian, lalu dijumlah. Hasilnya lebih dekat. Mencatat setiap menit lebih dekat lagi.

**Trapesium.** Daripada menganggap laju tetap selama 5 menit, kamu menganggapnya berubah **lurus** dari satu catatan ke catatan berikutnya, dan memakai rata-rata keduanya. Dengan catatan yang sama, hasilnya jauh lebih dekat.

**Simpson.** Kamu melihat tiga catatan berurutan sekaligus dan menyadari bahwa alirannya **melengkung** — naik lalu melambat. Kamu memakai lengkungan itu, bukan garis lurus. Dengan catatan yang sama persis, hasilnya lebih dekat lagi — begitu dekat sampai menambah catatan hampir tidak ada gunanya.

Pelajarannya: cara membaca catatan lebih penting daripada seberapa sering mencatat.

**Integral bertanda.** Sekarang baknya juga punya lubang pembuangan, dan kadang pembuangannya lebih deras dari keran — lajunya **negatif**. Air yang masuk dan air yang keluar saling menghapus. Integral laju memberi **perubahan isi bak**, yang bisa nol kalau air yang keluar sama dengan yang masuk.

Tetapi kalau yang ditanya adalah "berapa liter air yang **lewat** keran dan pembuangan", jawabannya bukan nol. Itu integral nilai mutlaknya — dan tagihan airmu dihitung dari yang ini.`,

  latihan: [
    'Hitung jumlah Riemann titik kiri dan titik kanan untuk x³ dari 0 sampai 2 dengan n = 4 dengan tangan, lalu jelaskan kenapa nilai sebenarnya ada di antara keduanya.',
    'Tulis keempat fungsi integrasi numerik dari topik ini, lalu hitung integral x³ dari 0 sampai 2 dengan n = 10.',
    'Ukur rasio galat saat n digandakan untuk integral cos x dari 0 sampai 1 dengan keempat metode, dan tunjukkan orde galatnya.',
    'Tunjukkan bahwa Simpson memberi hasil tepat untuk integral x³ − 2x dari 0 sampai 3, lalu jelaskan kenapa.',
    'Hitung integral (4x³ − 6x + 1) dari −1 sampai 2 dengan antiturunan, lalu periksa dengan Simpson.',
    'Hitung integral x dari −2 sampai 2 dan luas daerah antara y = x dan sumbu x di selang yang sama, lalu jelaskan kenapa berbeda.',
    'Cari antiturunan 2 cos(3t) dan periksa dengan menurunkannya kembali memakai aturan rantai.',
    'Sebuah sensor mencatat daya listrik sebuah server setiap menit selama sejam. Tulis program yang menghitung energi total dengan trapesium, dan jelaskan satuannya.',
    'Hitung integral e^(−x²) dari 0 sampai 1 dengan Simpson n = 10, 20, dan 40, lalu tentukan berapa digit yang sudah pasti benar.',
    'Hitung berapa potongan yang dibutuhkan titik kiri, trapesium, dan Simpson untuk mencapai galat di bawah 10⁻⁶ pada integral eˣ dari 0 sampai 1, dengan memakai rasio galat dari tabel topik ini.'
  ]
});
