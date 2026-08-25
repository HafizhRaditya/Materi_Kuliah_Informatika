/* ============================================================
   kecerdasan-buatan.js — materi Kecerdasan Buatan (Semester 3)

   Disusun dari slide kuliah sendiri, folder Materi/:
     Kecerdasan Buatan 2      Representasi Pengetahuan
     Kecerdasan Buatan 3      Sistem Pakar
     Kecerdasan Buatan 5_JST  Jaringan Syaraf Tiruan
     Kecerdasan Buatan 6      Algoritma Genetika
     Kecerdasan Buatan 7_NLP  Natural Language Processing
     Kecerdasan Buatan 8_LLM  Large Language Model

   Ini sumber TERLENGKAP di seluruh arsip kuliah — enam slide
   dosen yang utuh. Karena itu materi di sini paling dekat dengan
   apa yang benar-benar diajarkan di kelas.

   Catatan: slide 1 dan 4 tidak ada di folder, jadi ada dua
   pertemuan yang tidak tercakup.

   Ada juga projek kelompok "Togel Singapore" yang memakai data
   CSV dan JST — dipakai sebagai contoh penerapan di topik JST.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep".
   ============================================================ */

TOPICS.push({
  id: 'kb-representasi-pengetahuan',
  judul: 'Representasi Pengetahuan',
  kategori: 'kecerdasan-buatan',
  tag: ['representasi pengetahuan', 'symbolic AI', 'knowledge base', 'inference engine', 'jaringan semantik'],
  ringkas: 'Bagaimana pengetahuan manusia diubah menjadi simbol yang bisa dinalar komputer.',

  fungsi: `**Menyimpan pengetahuan dalam bentuk yang bisa diolah komputer untuk menarik kesimpulan.**

Terpakai di:

- **Sistem pakar** — basis aturan diagnosis
- **Graf pengetahuan** — hubungan antar entitas, dipakai mesin pencari
- **Ontologi** — kosakata baku suatu bidang
- **Basis data semantik** — RDF dan SPARQL
- **Menjelaskan keputusan AI** — sistem berbasis aturan bisa menunjukkan alasannya, jaringan syaraf tidak

Yang membedakannya dari basis data biasa: **basis data menyimpan fakta, representasi pengetahuan menyimpan fakta DAN aturan untuk menurunkan fakta baru.**

Basis data tahu Budi adalah ayah Ani. Sistem berbasis pengetahuan bisa **menyimpulkan** bahwa Budi adalah kakek anak Ani, tanpa fakta itu pernah disimpan.`,

  praktik: {
    tujuan: `Kamu bisa mewakili pengetahuan sebagai fakta dan aturan, lalu menurunkan fakta baru darinya.`,
    alat: [
      'Python 3',
      'Kertas untuk menggambar jaringan semantik'
    ],
    langkah: [
      { judul: 'Pilih bentuk representasinya',
        isi: `- **Aturan produksi** — \`JIKA ... MAKA ...\`, paling mudah dijelaskan ke orang awam
- **Jaringan semantik** — simpul dan panah berlabel, bagus untuk hubungan
- **Frame** — objek dengan slot, mirip kelas
- **Logika predikat** — paling tepat, tetapi paling sulit dibaca

Untuk sistem pakar sederhana, aturan produksi hampir selalu pilihan yang tepat.` },
      { judul: 'Pisahkan fakta dari aturan',
        isi: `Simpan keduanya di tempat berbeda:

- **fakta** — \`ayah(budi, ani)\`
- **aturan** — \`kakek(X, Z) :- ayah(X, Y), ayah(Y, Z)\`

Pemisahan ini yang memungkinkan aturan diubah tanpa menyentuh data, dan sebaliknya.` },
      { judul: 'Bangun jaringan semantik kecil',
        isi: `Gambar di kertas: simpul untuk entitas, panah berlabel untuk hubungan.

Buat untuk keluarga atau untuk prasyarat mata kuliah.

Lalu ubah menjadi kode: kamus dengan kunci berupa pasangan hubungan.` },
      { judul: 'Turunkan fakta baru',
        isi: `Dari \`ayah(budi, ani)\` dan \`ayah(ani, citra)\`, sistemmu harus bisa menyimpulkan \`kakek(budi, citra)\` — meski fakta itu tidak pernah disimpan.

Tulis kode yang melakukannya. Inilah yang membedakan sistem berbasis pengetahuan dari basis data.` },
      { judul: 'Kenali masalah pewarisan sifat',
        isi: `Pada jaringan semantik, sifat diwariskan ke bawah: burung bisa terbang, pinguin adalah burung, jadi pinguin bisa terbang.

**Tetapi pinguin tidak bisa terbang.**

Ini masalah nyata, dan penyelesaiannya butuh **pengecualian** yang bisa menimpa sifat warisan. Coba tambahkan mekanisme itu di kodemu.` },
      { judul: 'Bandingkan dengan basis data',
        isi: `Simpan hubungan yang sama di tabel SQL, lalu coba jawab pertanyaan "siapa kakek Citra".

Kamu butuh \`JOIN\` tabel dengan dirinya sendiri. Untuk buyut, dua \`JOIN\`. Untuk leluhur sejauh apa pun, SQL biasa **tidak bisa** — butuh kueri rekursif.

Sistem berbasis aturan menanganinya secara alami, dan itulah kelebihannya.` }
    ],
    cek: [
      'Sistemmu menyimpulkan hubungan kakek tanpa fakta itu disimpan',
      'Kamu bisa menambah aturan baru tanpa mengubah faktanya',
      'Pengecualian seperti pinguin tidak bisa terbang tertangani dengan benar'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Classical AI** atau **Symbolic AI** adalah pendekatan kecerdasan buatan yang:

- Menggunakan **pengetahuan eksplisit**
- Berbasis **aturan logika dan pengetahuan**
- Pengetahuannya **diberikan oleh pakar**, lewat proses yang disebut *knowledge engineering*
- **Dapat dijelaskan cara kerjanya**

Sifat terakhir itu penting, dan menjadi pembeda utamanya dari pendekatan modern berbasis pembelajaran. Sistem simbolik bisa ditanya *"kenapa kamu menyimpulkan begitu?"* dan menjawabnya dengan rantai aturan yang dipakainya.

**Dua bagian utama**

Slide kuliah menyebutkan Classical AI terdiri atas dua komponen:

- **Knowledge Base** (Basis Pengetahuan) — komponen berisi pengetahuan tentang domain masalah dalam bentuk **fakta dan aturan**. Ia kumpulan kalimat yang menyatakan sesuatu tentang dunia, diungkapkan dalam bentuk representasi pengetahuan. Fungsinya **menyediakan informasi** yang dibutuhkan sistem untuk melakukan inferensi.
- **Inference Engine** (Mesin Inferensi) — komponen yang **menggunakan** fakta dan aturan di Knowledge Base untuk melakukan penalaran dan menarik kesimpulan. Cara kerjanya dengan **menghubungkan aturan-aturan** yang ada di basis pengetahuan dengan **fakta-fakta** yang juga ada di sana.

Pembagian ini penting: **pengetahuan dipisahkan dari cara menalarnya.** Kamu bisa mengganti isi Knowledge Base tanpa menyentuh Inference Engine — persis seperti memisahkan data dari program.

**Apa itu representasi pengetahuan**

Slide merumuskannya bertahap:

- **Pengetahuan** adalah pemahaman teoretis atau praktis tentang suatu subjek yang membantu membuat keputusan yang tepat.
- **Representasi** adalah **simbol formal** — karakter atau kelompok karakter dari alfabet yang telah ditentukan. Tujuannya: **lebih mudah memanipulasi simbol daripada objek yang diwakilinya.**
- **Representasi pengetahuan** adalah proses menyusun informasi dan fakta dalam bentuk formal, lalu menyimpannya dalam sistem komputer.

Tujuan utamanya: memungkinkan sistem melakukan **penalaran**, **menjawab pertanyaan**, dan **memecahkan masalah** berdasarkan pengetahuan yang dimilikinya.

Kalimat *"lebih mudah memanipulasi simbol daripada objek yang diwakilinya"* adalah inti seluruh gagasan ini. Kamu tidak bisa menghitung dengan kucing sungguhan — tetapi kamu bisa menghitung dengan simbol yang mewakili kucing.

**Posisinya dalam AI**

Representasi pengetahuan adalah **bagian inti dari Knowledge Base**. Tanpa bentuk representasi yang baik:

- Mesin inferensi **tidak dapat bekerja efektif**
- Sistem menjadi **tidak dapat dijelaskan** (*explainable*)

**Jenis-jenis representasi pengetahuan**

Slide menyebutkan enam:

- **Logika** — proposisi dan predikat, seperti yang kamu pelajari di Logika Informatika
- **Pohon** — struktur hierarkis
- **Jaringan Semantik** — simpul dan panah yang menyatakan hubungan antar-konsep
- **Frame** — struktur berisi slot dan nilainya, mirip objek di OOP
- **Naskah** (*script*) — urutan kejadian baku dalam suatu keadaan
- **Kaidah** (*rule*) — aturan berbentuk JIKA-MAKA

Bentuk **kaidah** adalah yang paling banyak dipakai di sistem pakar, dan menjadi bahasan topik berikutnya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Pemisahan yang menentukan:\n#   Knowledge Base  = APA yang diketahui (data)\n#   Inference Engine = BAGAIMANA menalarnya (program)\n\nfakta = {"berbulu", "menyusui"}\n\naturan = [\n    ({"berbulu", "menyusui"}, "mamalia"),\n    ({"mamalia", "mengeong"}, "kucing"),\n]\n\n# Mesin inferensi TIDAK tahu apa-apa soal kucing.\n# Ia cuma tahu cara mencocokkan syarat dengan fakta.\n# Ganti isi aturan -> sistem jadi ahli bidang lain,\n# tanpa satu baris pun mesinnya diubah.',
      penjelasan: `
Perhatikan bahwa **mesin inferensinya sama sekali tidak tahu soal kucing.** Ia hanya tahu satu hal: cara memeriksa apakah syarat sebuah aturan sudah terpenuhi oleh fakta yang ada.

Inilah wujud nyata pemisahan yang disebut di slide. Ganti isi \`aturan\` dengan pengetahuan kedokteran, dan sistem yang sama menjadi alat bantu diagnosis. Ganti dengan pengetahuan perbaikan mesin, ia menjadi alat bantu montir. **Mesinnya tidak berubah satu baris pun.**

Ini pola yang sudah kamu temui berkali-kali: **memisahkan data dari program.** Di Basis Data, kamu memisahkan isi tabel dari kueri. Di Web Desain, kamu memisahkan isi (HTML) dari tampilan (CSS). Di sini, pengetahuan dipisahkan dari penalaran.

Keuntungan praktisnya besar. Seorang **pakar bidang** — dokter, montir, ahli pertanian — bisa menambah atau memperbaiki aturan **tanpa bisa memprogram sama sekali**. Ia cukup menuliskan *"jika begini maka begitu"*.

Proses mengambil pengetahuan dari kepala pakar dan mengubahnya menjadi bentuk formal inilah yang disebut **knowledge engineering** di slide, dan ia ternyata bagian tersulit dari membangun sistem pakar. Pakar sering **tahu tanpa bisa menjelaskan** — seorang dokter berpengalaman bisa mengenali penyakit dari kesan sekilas, tetapi kesulitan merumuskan aturannya.

Perhatikan juga bahwa aturan di atas **bertingkat**: aturan kedua memakai kesimpulan aturan pertama sebagai syarat. Rantai seperti inilah yang membuat sistem bisa menarik kesimpulan yang tidak tertulis langsung di fakta awal.
`
    },
    {
      bahasa: 'python',
      kode: '# Jaringan semantik: simpul = konsep, panah = hubungan\n#\n#   Kucing --adalah--> Mamalia --adalah--> Hewan\n#      |                  |\n#   punya              punya\n#      v                  v\n#    Ekor              Tulang belakang\n#\n# Pewarisan: kalau Kucing adalah Mamalia,\n# dan Mamalia punya tulang belakang,\n# maka Kucing PUNYA tulang belakang --\n# meski itu tidak pernah ditulis langsung.',
      penjelasan: `
**Jaringan semantik** menyimpan pengetahuan sebagai **graf**: simpulnya konsep, panahnya hubungan.

Yang membuatnya kuat adalah **pewarisan**. Kamu tidak perlu menuliskan bahwa kucing punya tulang belakang — cukup nyatakan bahwa kucing adalah mamalia, dan mamalia punya tulang belakang. Sisanya bisa **disimpulkan dengan menelusuri panah**.

Ini menghemat penyimpanan dan, yang lebih penting, **menjaga konsistensi**. Kalau suatu hari kamu memperbaiki sifat mamalia, seluruh keturunannya ikut terperbaiki. Bandingkan dengan menuliskan sifat itu di setiap hewan satu per satu — persis persoalan redundansi dan anomali pembaruan yang kamu pelajari di Basis Data.

Kamu juga sudah bertemu gagasan ini di **OOP**, dalam bentuk pewarisan kelas. Bukan kebetulan: representasi **frame** yang disebut di slide — struktur berisi slot dan nilai — adalah nenek moyang langsung dari gagasan objek dan atribut.

Ada satu masalah klasik jaringan semantik yang layak diketahui, karena menunjukkan batas pendekatan simbolik: **pengecualian**.

Burung bisa terbang. Pinguin adalah burung. Maka pinguin bisa terbang — dan itu **salah**.

Menanganinya butuh mekanisme tambahan berupa **penalaran bawaan** (*default reasoning*) yang bisa dibatalkan pengecualian. Dan begitu pengecualiannya banyak, sistem simbolik menjadi rumit dan rapuh.

Kesulitan inilah, di antara sebab lain, yang mendorong AI bergeser ke pendekatan **berbasis data** seperti jaringan syaraf tiruan — yang belajar polanya sendiri, termasuk pengecualiannya, tanpa perlu dituliskan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Sistem berbasis pengetahuan sederhana
# Knowledge Base terpisah dari Inference Engine
# ============================================

# ---------- KNOWLEDGE BASE: fakta & aturan ----------
# Bentuk kaidah: (himpunan syarat, kesimpulan)
ATURAN = [
    ({"berbulu"},                          "mamalia"),
    ({"menyusui"},                         "mamalia"),
    ({"berbulu_halus", "bertelur"},        "burung"),
    ({"mamalia", "mengeong"},              "kucing"),
    ({"mamalia", "menggonggong"},          "anjing"),
    ({"burung", "tidak_bisa_terbang",
      "berenang"},                         "pinguin"),
    ({"kucing"},                           "peliharaan"),
    ({"anjing"},                           "peliharaan"),
]


# ---------- INFERENCE ENGINE: forward chaining ----------
# Mesin ini TIDAK tahu apa-apa soal kucing atau burung.
# Ia cuma mencocokkan syarat dengan fakta, berulang-ulang.
def forward_chaining(fakta_awal, aturan, jelaskan=False):
    fakta = set(fakta_awal)
    jejak = []
    berubah = True

    while berubah:
        berubah = False
        for syarat, kesimpulan in aturan:
            if syarat <= fakta and kesimpulan not in fakta:
                fakta.add(kesimpulan)
                jejak.append((sorted(syarat), kesimpulan))
                berubah = True

    if jelaskan:
        for syarat, kesimpulan in jejak:
            print("    karena " + " + ".join(syarat) +
                  "  ->  " + kesimpulan)
    return fakta


print("--- menalar dari fakta awal ---")
for awal in [
    {"berbulu", "mengeong"},
    {"menyusui", "menggonggong"},
    {"berbulu_halus", "bertelur", "tidak_bisa_terbang", "berenang"},
]:
    print("")
    print("  fakta awal :", sorted(awal))
    hasil = forward_chaining(awal, ATURAN, jelaskan=True)
    baru = sorted(hasil - awal)
    print("  disimpulkan:", baru)


# ============================================
# Explainable: sistem bisa ditanya "kenapa?"
# ============================================
print("")
print("--- inilah yang dimaksud EXPLAINABLE ---")
print("  Setiap kesimpulan punya jejak aturan yang dipakai.")
print("  Sistem bisa ditanya 'kenapa?' dan menjawabnya.")
print("  Bandingkan dengan jaringan syaraf, yang jawabannya")
print("  berupa jutaan bobot angka tanpa penjelasan.")


# ============================================
# Ganti Knowledge Base -> ganti bidang keahlian
# Mesinnya TIDAK disentuh sama sekali
# ============================================
ATURAN_MEDIS = [
    ({"demam", "batuk"},                   "infeksi_saluran_napas"),
    ({"infeksi_saluran_napas", "sesak"},   "perlu_dokter"),
    ({"demam", "ruam"},                    "perlu_dokter"),
]

print("")
print("--- Knowledge Base diganti, mesin TETAP ---")
hasil = forward_chaining({"demam", "batuk", "sesak"},
                         ATURAN_MEDIS, jelaskan=True)
print("  kesimpulan:", sorted(hasil - {"demam", "batuk", "sesak"}))


# ============================================
# Batas pendekatan simbolik: PENGECUALIAN
# ============================================
print("")
print("--- masalah klasik: pengecualian ---")
ATURAN_NAIF = [
    ({"burung"}, "bisa_terbang"),
]
hasil = forward_chaining({"burung", "pinguin"}, ATURAN_NAIF)
print("  pinguin adalah burung -> disimpulkan:",
      sorted(hasil - {"burung", "pinguin"}))
print("  ...dan itu SALAH.")
print("")
print("  Menanganinya butuh penalaran bawaan yang bisa")
print("  dibatalkan pengecualian. Begitu pengecualiannya")
print("  banyak, sistem simbolik jadi rumit dan rapuh --")
print("  salah satu sebab AI bergeser ke pendekatan data.")`
  },

  output: `--- menalar dari fakta awal ---

  fakta awal : ['berbulu', 'mengeong']
    karena berbulu  ->  mamalia
    karena mamalia + mengeong  ->  kucing
    karena kucing  ->  peliharaan
  disimpulkan: ['kucing', 'mamalia', 'peliharaan']

  fakta awal : ['menggonggong', 'menyusui']
    karena menyusui  ->  mamalia
    karena mamalia + menggonggong  ->  anjing
    karena anjing  ->  peliharaan
  disimpulkan: ['anjing', 'mamalia', 'peliharaan']

  fakta awal : ['berbulu_halus', 'berenang', 'bertelur', 'tidak_bisa_terbang']
    karena berbulu_halus + bertelur  ->  burung
    karena berenang + burung + tidak_bisa_terbang  ->  pinguin
  disimpulkan: ['burung', 'pinguin']

--- inilah yang dimaksud EXPLAINABLE ---
  Setiap kesimpulan punya jejak aturan yang dipakai.
  Sistem bisa ditanya 'kenapa?' dan menjawabnya.
  Bandingkan dengan jaringan syaraf, yang jawabannya
  berupa jutaan bobot angka tanpa penjelasan.

--- Knowledge Base diganti, mesin TETAP ---
    karena batuk + demam  ->  infeksi_saluran_napas
    karena infeksi_saluran_napas + sesak  ->  perlu_dokter
  kesimpulan: ['infeksi_saluran_napas', 'perlu_dokter']

--- masalah klasik: pengecualian ---
  pinguin adalah burung -> disimpulkan: ['bisa_terbang']
  ...dan itu SALAH.

  Menanganinya butuh penalaran bawaan yang bisa
  dibatalkan pengecualian. Begitu pengecualiannya
  banyak, sistem simbolik jadi rumit dan rapuh --
  salah satu sebab AI bergeser ke pendekatan data.`,

  kesalahanUmum: [
    {
      salah: 'Menukar Knowledge Base dengan Inference Engine.',
      kenapa: 'Knowledge Base menyimpan fakta dan aturan, sedangkan Inference Engine yang memakainya untuk menalar. Menukarnya membuat gagasan pemisahan data dari penalaran jadi hilang, padahal justru itu yang memungkinkan satu mesin dipakai untuk banyak bidang keahlian.',
      benar: 'Ingat bahwa Knowledge Base adalah apa yang diketahui, Inference Engine adalah bagaimana menalarnya. Yang pertama diganti-ganti, yang kedua tetap.'
    },
    {
      salah: 'Mengira representasi pengetahuan sekadar soal menyimpan data.',
      kenapa: 'Tujuannya bukan penyimpanan melainkan memungkinkan penalaran, menjawab pertanyaan, dan memecahkan masalah. Basis data juga menyimpan data, tetapi tidak bisa menyimpulkan bahwa kucing punya tulang belakang dari fakta bahwa kucing adalah mamalia.',
      benar: 'Tekankan tujuannya sesuai slide: memungkinkan sistem melakukan penalaran, bukan sekadar menyimpan.'
    },
    {
      salah: 'Menganggap sistem simbolik sudah usang dan tidak relevan lagi.',
      kenapa: 'Keunggulannya justru pada sifat yang paling sulit dicapai pendekatan modern: dapat dijelaskan. Di bidang seperti kedokteran, hukum, dan keuangan, kemampuan menjawab pertanyaan kenapa sering menjadi syarat wajib, sehingga sistem berbasis aturan tetap dipakai.',
      benar: 'Bandingkan keduanya sebagai pertukaran. Simbolik unggul dalam penjelasan dan kepastian, pendekatan data unggul dalam menangani pola rumit yang sulit dirumuskan.'
    },
    {
      salah: 'Menyebut jaringan semantik hanya sebagai gambar berisi kotak dan panah.',
      kenapa: 'Yang membuatnya berguna bukan gambarnya, melainkan kemampuan pewarisan: sifat induk otomatis berlaku pada keturunannya tanpa perlu ditulis ulang. Tanpa menyebut pewarisan, keunggulannya dibanding daftar fakta biasa tidak terjelaskan.',
      benar: 'Jelaskan pewarisannya, dan sebutkan bahwa gagasan ini menurunkan konsep frame yang kemudian menjadi objek dan atribut di OOP.'
    }
  ],

  analogi: `Bayangkan seorang montir berpengalaman dan buku panduannya.

**Knowledge Base** adalah **buku panduannya** — daftar gejala dan penyebabnya: *"kalau mesin berbunyi begini, periksa bagian itu"*. **Inference Engine** adalah **cara membaca buku itu** — menelusuri gejala yang ada, mencocokkan dengan halaman yang sesuai, lalu menarik kesimpulan.

Perhatikan bahwa **cara membacanya tidak tahu apa-apa soal mesin.** Ganti bukunya dengan panduan memasak, dan orang yang sama bisa memakai cara membaca yang sama untuk menyimpulkan kenapa kuenya bantat.

Itulah kenapa keduanya dipisah.

**Representasi pengetahuan** adalah **cara menuliskan isi buku itu**. Kamu bisa menulisnya sebagai kalimat panjang, sebagai tabel, sebagai bagan pohon, atau sebagai daftar *"jika–maka"*. Bentuk yang kamu pilih menentukan **seberapa mudah buku itu ditelusuri**.

Dan inilah alasan slide menyebut *"lebih mudah memanipulasi simbol daripada objek yang diwakilinya"*: kamu tidak bisa membongkar seribu mesin untuk menguji dugaanmu, tetapi kamu bisa membolak-balik seribu halaman.

**Jaringan semantik** adalah buku yang halamannya **saling menunjuk**: *"untuk mesin diesel, lihat dulu bab mesin pembakaran umum"*. Kamu tidak perlu mengulang seluruh isi bab umum di setiap jenis mesin — dan kalau ada koreksi, cukup diperbaiki di satu tempat.

Dan **masalah pengecualian**? Itu ketika buku bilang *"semua mesin bermerek X memakai oli jenis Y"*, lalu datang satu model langka yang tidak. Menambahkan satu pengecualian mudah. Menambahkan dua ratus pengecualian membuat bukunya lebih banyak berisi kekecualian daripada aturan — dan tidak ada lagi yang bisa memakainya.`,

  latihan: [
    'Sebutkan empat ciri Classical AI menurut slide, dan jelaskan kenapa sifat dapat dijelaskan menjadi keunggulan pentingnya.',
    'Jelaskan perbedaan Knowledge Base dan Inference Engine, lalu jelaskan keuntungan memisahkan keduanya.',
    'Sebutkan enam jenis representasi pengetahuan menurut slide, dan berikan satu contoh singkat untuk tiga di antaranya.',
    'Buat knowledge base berisi lima aturan untuk mendiagnosis masalah komputer yang tidak menyala, lalu telusuri penalarannya dari dua fakta awal.',
    'Jelaskan apa itu pewarisan pada jaringan semantik, dan kaitkan dengan pewarisan kelas yang kamu pelajari di OOP.',
    'Jelaskan masalah pengecualian pada representasi simbolik dengan contoh pinguin, lalu jelaskan kenapa masalah ini mendorong AI bergeser ke pendekatan berbasis data.'
  ]
});

TOPICS.push({
  id: 'kb-sistem-pakar',
  judul: 'Sistem Pakar',
  kategori: 'kecerdasan-buatan',
  tag: ['sistem pakar', 'expert system', 'forward chaining', 'backward chaining', 'MYCIN'],
  ringkas: 'Memindahkan keahlian manusia ke komputer — beserta batas yang membuatnya gagal dan berhasil.',

  fungsi: `**Meniru penalaran seorang ahli dalam bidang sempit, dan bisa menjelaskan alasannya.**

Terpakai di:

- **Diagnosis awal** — penyakit, kerusakan mesin, hama tanaman
- **Sistem rekomendasi berbasis aturan** — pemilihan jurusan, pemilihan produk
- **Bantuan keputusan** yang harus bisa **dipertanggungjawabkan**
- **Tugas akhir Informatika** — salah satu tema yang paling sering diambil

Kelebihannya dibanding jaringan syaraf, dan ini yang sering menentukan: **ia bisa menjelaskan kenapa.**

*"Kamu mungkin terkena X karena punya gejala A dan B, sesuai aturan nomor 12."* Jaringan syaraf tidak bisa mengatakan itu — dan di bidang medis atau hukum, penjelasan sering wajib.`,

  praktik: {
    tujuan: `Kamu punya sistem pakar sederhana yang bisa bertanya seperlunya dan menjelaskan kesimpulannya.`,
    alat: [
      'Python 3',
      'Satu bidang yang kamu pahami untuk dijadikan basis aturan'
    ],
    langkah: [
      { judul: 'Pilih bidang yang sempit',
        isi: `Jangan "diagnosis semua penyakit". Pilih yang sempit: lima penyakit tanaman padi, atau kerusakan umum sepeda motor.

Sistem pakar bekerja baik justru **karena** bidangnya sempit. Yang luas menjadi tidak terkelola.` },
      { judul: 'Tulis aturannya sebagai tabel',
        isi: `Kolom: nomor aturan, syarat, kesimpulan.

Tulis di spreadsheet dulu, bukan langsung di kode. Lebih mudah diperiksa, dan **lebih mudah ditunjukkan ke ahlinya** untuk dikoreksi.

Butir terakhir penting: basis aturan yang tidak diperiksa ahli hanya tebakan yang rapi.` },
      { judul: 'Pisahkan mesin inferensi dari basis aturan',
        isi: `Mesin inferensi adalah kode yang menjalankan aturan. Basis aturan adalah datanya.

Simpan aturan di berkas JSON atau CSV terpisah, sehingga bisa **diubah tanpa menyentuh kode**.

Ini memungkinkan pakar memperbarui aturannya sendiri tanpa memanggilmu.` },
      { judul: 'Bandingkan penalaran maju dan mundur',
        isi: `- **Maju** — dari fakta yang ada, cari kesimpulan apa yang bisa ditarik
- **Mundur** — dari hipotesis, cari fakta apa yang perlu diperiksa

Untuk sistem yang **bertanya kepada pengguna**, penalaran mundur jauh lebih baik: ia hanya menanyakan yang **relevan** dengan hipotesis yang sedang diuji.

Bandingkan jumlah pertanyaannya untuk kasus yang sama. Selisihnya besar.` },
      { judul: 'Simpan jejak untuk penjelasan',
        isi: `Setiap kali aturan dipakai, catat: nomor aturan, fakta apa yang cocok, kesimpulan apa yang ditarik.

Di akhir, tampilkan jejaknya sebagai penjelasan.

Ini fitur yang paling dihargai pengguna, dan paling sering dilupakan pembuatnya.` },
      { judul: 'Tambahkan derajat kepastian',
        isi: `Kenyataan jarang pasti. Beri tiap aturan nilai kepercayaan, lalu gabungkan saat menarik kesimpulan.

Bentuk paling sederhana: kalikan kepercayaan aturan dengan kepercayaan faktanya.

Kalau kamu butuh yang lebih halus, itulah yang diselesaikan **Logika Fuzzy** di semester 4.` },
      { judul: 'Uji dengan kasus yang jawabannya diketahui',
        isi: `Siapkan sepuluh kasus beserta jawaban yang benar menurut ahlinya, lalu jalankan sistemmu.

Hitung berapa yang tepat. Kalau di bawah delapan, basis aturanmu perlu diperbaiki — bukan kodenya.

Ini pemeriksaan yang sama dengan pengujian di Uji Kualitas Perangkat Lunak.` }
    ],
    cek: [
      'Sistemmu bisa menjelaskan kesimpulannya dengan menyebut aturan yang dipakai',
      'Penalaran mundur menanyakan lebih sedikit pertanyaan daripada maju untuk kasus yang sama',
      'Basis aturanmu bisa diubah tanpa menyentuh kode program'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Sistem pakar** adalah salah satu cabang kecerdasan buatan yang dikembangkan pada **tahun 1960-an**. Slide merumuskannya: sistem yang berusaha **mengadopsi pengetahuan manusia ke komputer**, agar komputer dapat menyelesaikan problem seperti yang biasa dilakukan **manusia yang ahli**.

**Definisi para ahli** yang disebut di slide:

- **Durkin** — program komputer yang dirancang untuk **memodelkan kemampuan penyelesaian masalah** yang dilakukan seorang pakar
- **Giarratano dan Riley** — sistem komputer yang bisa **menyamai atau meniru** kemampuan seorang pakar
- **Ignizio** — model dan prosedur yang berkaitan, **dalam suatu domain tertentu**, yang tingkat keahliannya dapat dibandingkan dengan keahlian seorang pakar

Perhatikan kata **"domain tertentu"** pada definisi Ignizio. Itu bukan sekadar keterangan — ia **syarat keberhasilan**, dan alasannya terlihat dari sejarahnya.

Manfaat yang disebut slide: dengan sistem pakar, **orang awam pun dapat menyelesaikan masalah rumit** yang sebenarnya hanya bisa diselesaikan dengan bantuan ahli.

**Sejarah: satu kegagalan yang mengajarkan segalanya**

Slide mencatat bahwa sistem pakar pertama adalah **GPS** (*General-purpose Problem Solver*), dikembangkan **Newell dan Simon** pada pertengahan 1960-an.

**GPS gagal.** Dan alasannya persis yang disebut slide: **cakupannya terlalu luas**, sehingga terkadang justru **meninggalkan pengetahuan penting** yang seharusnya disediakan.

Ini pelajaran yang bertahan sampai sekarang: **sistem yang berusaha tahu segalanya berakhir tidak tahu apa-apa dengan cukup dalam.** Sistem pakar berhasil justru ketika **dipersempit** ke satu bidang.

**Komponen sistem pakar**

Melanjutkan struktur dari topik Representasi Pengetahuan, sistem pakar menambahkan beberapa bagian:

- **Knowledge Base** — fakta dan aturan, biasanya berbentuk **kaidah JIKA-MAKA**
- **Inference Engine** — mesin penalaran
- **Working Memory** — fakta sementara tentang kasus yang sedang ditangani
- **Antarmuka pengguna** — tempat bertanya dan menjawab
- **Fasilitas penjelasan** — menjawab *"kenapa"* dan *"bagaimana"*
- **Fasilitas akuisisi pengetahuan** — cara pakar menambah aturan

**Fasilitas penjelasan** inilah yang membedakannya dari program biasa. Sistem pakar tidak cuma menjawab, ia bisa **menunjukkan rantai penalarannya**.

**Dua arah penalaran**

- **Forward chaining** (*data-driven*) — mulai dari **fakta**, terapkan aturan, lihat kesimpulan apa yang muncul. Cocok kalau kamu punya banyak data dan ingin tahu *"apa artinya ini?"*
- **Backward chaining** (*goal-driven*) — mulai dari **dugaan kesimpulan**, telusuri mundur untuk memeriksa syaratnya terpenuhi. Cocok kalau kamu punya sedikit dugaan dan ingin tahu *"apa yang perlu saya periksa?"*

Diagnosis medis biasanya memakai **backward chaining** — dokter menduga beberapa penyakit lalu memeriksa gejala yang relevan, alih-alih memeriksa seluruh gejala yang mungkin ada.

**Keuntungan dan keterbatasan**

Keuntungan yang disebut slide antara lain: pengetahuan pakar **tersimpan permanen**, bisa **digandakan** ke banyak tempat, **tidak lelah**, dan **konsisten**.

Keterbatasannya juga nyata: sistem pakar **tidak punya akal sehat**, **tidak bisa belajar sendiri** dari pengalaman, dan **rapuh di tepi domainnya** — begitu pertanyaannya sedikit di luar bidangnya, jawabannya bisa sangat keliru tanpa tanda apa pun.

Contoh aplikasi modern yang disebut slide termasuk **IBM Watson Assistant** untuk layanan pelanggan.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# FORWARD chaining: dari FAKTA ke kesimpulan\n#   punya: demam, batuk, sesak\n#   -> terapkan semua aturan yang cocok\n#   -> dapat: perlu_dokter\n#   Cocok kalau data banyak, pertanyaannya "apa artinya?"\n\n# BACKWARD chaining: dari DUGAAN ke fakta\n#   duga: perlu_dokter?\n#   -> apa syaratnya? infeksi + sesak\n#   -> apa syarat infeksi? demam + batuk\n#   -> tanya pengguna: demam? batuk? sesak?\n#   Cocok kalau dugaan sedikit, pertanyaannya\n#   "apa yang perlu saya periksa?"',
      penjelasan: `
Kedua arah ini sampai pada kesimpulan yang sama, tetapi **jumlah pertanyaan yang diajukan** bisa jauh berbeda — dan di situlah pilihannya menentukan.

**Forward chaining** menerapkan **semua** aturan yang bisa diterapkan. Kalau knowledge base-mu punya 500 aturan tentang seluruh penyakit, ia akan berusaha menyimpulkan segalanya dari fakta yang ada. Efisien kalau faktanya memang sudah lengkap di depan.

**Backward chaining** bekerja terbalik dan jauh lebih hemat untuk diagnosis. Ia mengambil satu dugaan, lalu bertanya *"apa yang harus benar supaya dugaan ini benar?"*, dan terus menelusuri mundur sampai bertemu pertanyaan yang bisa diajukan ke pengguna.

Bedanya terasa dalam pengalaman pemakaian. Sistem forward chaining akan meminta kamu mengisi **seluruh** gejala yang mungkin sebelum memberi jawaban. Sistem backward chaining **bertanya seperlunya** — dan berhenti bertanya begitu satu dugaan sudah bisa disingkirkan.

Itulah cara kerja dokter sungguhan, dan itulah kenapa **MYCIN**, sistem pakar diagnosis infeksi darah yang terkenal dari tahun 1970-an, memakai backward chaining.

Ada satu hal penting yang dibawa MYCIN dan layak diketahui: ia menambahkan **faktor kepastian** (*certainty factor*). Aturannya tidak berbunyi *"jika A maka B"*, melainkan *"jika A maka B dengan kepercayaan 0,7"*.

Ini menjawab keterbatasan besar logika kaku: **dunia nyata jarang pasti.** Gejala tidak selalu berarti satu penyakit, dan pakar sungguhan pun berbicara dalam kemungkinan.

Menariknya, MYCIN terbukti **setara atau lebih baik** daripada dokter ahli dalam pengujian — tetapi **tidak pernah dipakai di rumah sakit**. Alasannya bukan teknis, melainkan soal tanggung jawab hukum dan keengganan memercayakan keputusan medis kepada mesin. Persoalan yang **masih persis sama** dengan yang dihadapi AI medis hari ini.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Sistem pakar: forward vs backward chaining
# ============================================

# ---------- KNOWLEDGE BASE ----------
ATURAN = [
    ({"demam", "batuk"},                  "infeksi_napas"),
    ({"infeksi_napas", "sesak"},          "perlu_dokter"),
    ({"demam", "ruam"},                   "perlu_dokter"),
    ({"batuk", "pilek"},                  "flu_biasa"),
    ({"flu_biasa", "tanpa_demam"},        "cukup_istirahat"),
]

# Fakta yang bisa ditanyakan langsung ke pengguna
DAPAT_DITANYA = {"demam", "batuk", "sesak", "ruam", "pilek", "tanpa_demam"}


# ---------- FORWARD: dari fakta ke kesimpulan ----------
def forward(fakta):
    fakta = set(fakta)
    berubah = True
    while berubah:
        berubah = False
        for syarat, kesimpulan in ATURAN:
            if syarat <= fakta and kesimpulan not in fakta:
                fakta.add(kesimpulan)
                berubah = True
    return fakta


# ---------- BACKWARD: dari dugaan ke fakta ----------
def backward(tujuan, jawaban, ditanya, kedalaman=0):
    """jawaban = apa yang AKAN dijawab pengguna kalau ditanya.
       Pengguna belum menjawab apa pun sebelum benar-benar ditanya."""
    spasi = "    " + "  " * kedalaman

    # Gejala dasar: harus DITANYAKAN ke pengguna
    if tujuan in DAPAT_DITANYA:
        if tujuan in ditanya:                 # jangan tanya dua kali
            return jawaban.get(tujuan, False)
        ditanya.append(tujuan)
        hasil = jawaban.get(tujuan, False)
        print(spasi + "tanya: " + tujuan + "? -> " +
              ("ya" if hasil else "tidak"))
        return hasil

    # Cari aturan yang menyimpulkan tujuan ini
    for syarat, kesimpulan in ATURAN:
        if kesimpulan != tujuan:
            continue
        print(spasi + "untuk " + tujuan + ", perlu: " +
              " + ".join(sorted(syarat)))
        if all(backward(s, jawaban, ditanya, kedalaman + 1)
               for s in sorted(syarat)):
            print(spasi + tujuan + " -> TERBUKTI")
            return True
        print(spasi + tujuan + " -> aturan ini gagal, coba yang lain")

    return False


# ============================================
# Membandingkan keduanya pada kasus yang sama
# ============================================
kasus = {"demam": True, "batuk": True, "sesak": True,
         "ruam": False, "pilek": False, "tanpa_demam": False}

print("=== FORWARD CHAINING ===")
print("  SELURUH gejala harus ditanyakan dulu, " +
      str(len(DAPAT_DITANYA)) + " pertanyaan:")
print("   ", sorted(DAPAT_DITANYA))
awal = {k for k, v in kasus.items() if v}
print("  yang dijawab ya:", sorted(awal))
hasil = forward(awal)
print("  kesimpulan:", sorted(hasil - awal))

print("")
print("=== BACKWARD CHAINING ===")
print("  mulai dari DUGAAN: perlu_dokter?")
ditanya = []
terbukti = backward("perlu_dokter", kasus, ditanya)
print("  hasil:", "TERBUKTI" if terbukti else "tidak terbukti")
print("  pertanyaan yang diajukan:", ditanya)

print("")
print("  Perhatikan: backward cuma menanyakan " + str(len(ditanya)) +
      " hal,")
print("  dan berhenti begitu cukup. Forward menuntut seluruh")
print("  gejala diisi lebih dulu.")


# ============================================
# Faktor kepastian: dunia nyata jarang pasti
# ============================================
print("")
print("=== FAKTOR KEPASTIAN (gagasan MYCIN) ===")

ATURAN_CF = [
    ({"demam", "batuk"}, "infeksi_napas", 0.7),
    ({"infeksi_napas", "sesak"}, "perlu_dokter", 0.9),
]

def forward_cf(fakta_cf):
    fakta = dict(fakta_cf)
    berubah = True
    while berubah:
        berubah = False
        for syarat, kesimpulan, cf_aturan in ATURAN_CF:
            if all(s in fakta for s in syarat):
                # kepercayaan syarat = yang PALING LEMAH
                cf_syarat = min(fakta[s] for s in syarat)
                baru = round(cf_syarat * cf_aturan, 3)
                if baru > fakta.get(kesimpulan, 0):
                    fakta[kesimpulan] = baru
                    berubah = True
    return fakta

hasil_cf = forward_cf({"demam": 1.0, "batuk": 0.8, "sesak": 0.9})
for nama in ["infeksi_napas", "perlu_dokter"]:
    print("  " + nama.ljust(16) + " kepercayaan " + str(hasil_cf[nama]))

print("")
print("  Aturannya bukan 'jika A maka B', melainkan")
print("  'jika A maka B dengan kepercayaan sekian'.")
print("  Kepercayaan rantai = yang paling lemah dikali bobot aturan.")`
  },

  output: `=== FORWARD CHAINING ===
  SELURUH gejala harus ditanyakan dulu, 6 pertanyaan:
    ['batuk', 'demam', 'pilek', 'ruam', 'sesak', 'tanpa_demam']
  yang dijawab ya: ['batuk', 'demam', 'sesak']
  kesimpulan: ['infeksi_napas', 'perlu_dokter']

=== BACKWARD CHAINING ===
  mulai dari DUGAAN: perlu_dokter?
    untuk perlu_dokter, perlu: infeksi_napas + sesak
      untuk infeksi_napas, perlu: batuk + demam
        tanya: batuk? -> ya
        tanya: demam? -> ya
      infeksi_napas -> TERBUKTI
      tanya: sesak? -> ya
    perlu_dokter -> TERBUKTI
  hasil: TERBUKTI
  pertanyaan yang diajukan: ['batuk', 'demam', 'sesak']

  Perhatikan: backward cuma menanyakan 3 hal,
  dan berhenti begitu cukup. Forward menuntut seluruh
  gejala diisi lebih dulu.

=== FAKTOR KEPASTIAN (gagasan MYCIN) ===
  infeksi_napas    kepercayaan 0.56
  perlu_dokter     kepercayaan 0.504

  Aturannya bukan 'jika A maka B', melainkan
  'jika A maka B dengan kepercayaan sekian'.
  Kepercayaan rantai = yang paling lemah dikali bobot aturan.`,

  kesalahanUmum: [
    {
      salah: 'Merancang sistem pakar dengan cakupan yang sangat luas supaya bisa menjawab banyak hal.',
      kenapa: 'Inilah persis kegagalan GPS yang disebut slide: cakupannya terlalu luas sehingga justru meninggalkan pengetahuan penting yang seharusnya disediakan. Sistem yang berusaha tahu segalanya berakhir tidak tahu apa pun dengan cukup dalam untuk berguna.',
      benar: 'Persempit ke satu domain tertentu, sesuai definisi Ignizio. Sistem pakar berhasil justru karena batas bidangnya jelas.'
    },
    {
      salah: 'Menukar forward chaining dengan backward chaining.',
      kenapa: 'Forward mulai dari fakta menuju kesimpulan, backward mulai dari dugaan menelusuri mundur ke fakta. Menukarnya membuat pemilihan metode jadi salah: sistem diagnosis yang memakai forward akan memaksa pengguna mengisi seluruh gejala yang mungkin sebelum memberi jawaban apa pun.',
      benar: 'Ingat arah pertanyaannya. Forward menjawab apa artinya data ini, backward menjawab apa yang perlu saya periksa.'
    },
    {
      salah: 'Mengira sistem pakar bisa belajar sendiri dari kasus yang ditanganinya.',
      kenapa: 'Sistem pakar klasik tidak punya kemampuan belajar; seluruh pengetahuannya harus dimasukkan pakar lewat akuisisi pengetahuan. Ia akan mengulang kesalahan yang sama selamanya sampai ada manusia yang memperbaiki aturannya.',
      benar: 'Bedakan dari pendekatan pembelajaran mesin. Sistem pakar menyimpan pengetahuan yang diberikan, jaringan syaraf menemukan polanya sendiri dari data.'
    },
    {
      salah: 'Memercayai jawaban sistem pakar untuk pertanyaan yang sedikit di luar domainnya.',
      kenapa: 'Sistem pakar rapuh di tepi bidangnya dan tidak punya akal sehat untuk menyadari bahwa pertanyaannya di luar kemampuannya. Ia tetap menjawab dengan yakin memakai aturan yang paling mendekati, dan jawabannya bisa sangat keliru tanpa tanda peringatan apa pun.',
      benar: 'Rancang sistem supaya mengenali batas dirinya dan menjawab tidak tahu, alih-alih memaksakan kesimpulan dari aturan yang tidak relevan.'
    }
  ],

  analogi: `Bayangkan seorang dokter spesialis yang menuliskan seluruh cara berpikirnya ke dalam buku.

**Sistem pakar** adalah buku itu, plus cara membacanya. Orang awam yang memegangnya bisa sampai pada kesimpulan yang sama dengan si dokter — itulah manfaat yang disebut slide.

Sekarang **kenapa GPS gagal**. Bayangkan seseorang mencoba menulis buku yang memuat **seluruh keahlian manusia**: kedokteran, hukum, memasak, memperbaiki mesin. Bukunya jadi setebal ensiklopedia, dan setiap bidangnya cuma dibahas sehalaman.

Ketika kamu benar-benar sakit, halaman itu **tidak cukup dalam untuk menolongmu**. Buku yang tahu sedikit tentang segalanya kalah oleh buku tipis yang tahu banyak tentang satu hal.

Untuk **dua arah penalaran**, bayangkan dua cara dokter bekerja:

- **Forward chaining** — *"ceritakan semua yang kamu rasakan, dari ujung kepala sampai ujung kaki"*, lalu setelah semuanya terkumpul, dia menyimpulkan.
- **Backward chaining** — *"saya curiga ini radang paru. Apakah kamu demam? Batuk? Sesak?"* Tiga pertanyaan, dan kalau salah satu tidak cocok, dia langsung pindah ke dugaan lain.

Dokter sungguhan jelas memakai cara kedua, dan itulah kenapa sistem diagnosis memakainya.

**Faktor kepastian** adalah pengakuan bahwa dokter tidak pernah bilang *"pasti radang paru"*. Ia bilang *"kemungkinan besar"*. Dan ketika beberapa dugaan disambung, **kepercayaannya mengikuti mata rantai terlemah** — sama seperti rantai yang putus di sambungan paling rapuh.

Terakhir, dan ini yang paling penting untuk diingat: **buku itu tidak punya akal sehat.** Kalau kamu bertanya soal patah tulang kepada buku tentang penyakit dalam, ia akan tetap menjawab — dengan yakin, memakai halaman yang paling mendekati, dan jawabannya bisa berbahaya. **Buku tidak tahu bahwa ia tidak tahu.**`,

  latihan: [
    'Sebutkan tiga definisi sistem pakar menurut Durkin, Giarratano-Riley, dan Ignizio. Jelaskan kenapa frasa domain tertentu pada definisi Ignizio penting.',
    'Jelaskan apa itu GPS, siapa pengembangnya, dan kenapa ia gagal menurut slide. Apa pelajaran yang bisa diambil untuk merancang sistem pakar hari ini?',
    'Sebutkan komponen sistem pakar, dan jelaskan kenapa fasilitas penjelasan membedakannya dari program biasa.',
    'Jelaskan perbedaan forward chaining dan backward chaining, lalu tentukan mana yang lebih tepat untuk: diagnosis penyakit, pemantauan sensor pabrik, dan penentuan kelayakan kredit.',
    'Buat sistem pakar sederhana berisi lima aturan untuk menentukan jenis laptop yang cocok bagi seorang mahasiswa. Telusuri penalarannya dengan backward chaining.',
    'Jelaskan apa itu faktor kepastian dan kenapa MYCIN membutuhkannya. Hitung kepercayaan akhir kalau aturan berbobot 0,8 diterapkan pada fakta berkepercayaan 0,6.'
  ]
});

TOPICS.push({
  id: 'kb-jst',
  judul: 'Jaringan Syaraf Tiruan (JST)',
  kategori: 'kecerdasan-buatan',
  tag: ['JST', 'neural network', 'perceptron', 'bobot', 'fungsi aktivasi', 'pembelajaran'],
  ringkas: 'Meniru cara kerja neuron otak — dan belajar sebagai persoalan optimisasi.',

  fungsi: `**Mengenali pola dari data, tanpa aturan yang ditulis manusia.**

Terpakai di:

- **Klasifikasi** — mengenali tulisan tangan, gambar, atau teks
- **Prediksi** — harga, permintaan, risiko
- **Pengenalan suara dan wajah**
- **Model bahasa besar** — semuanya jaringan syaraf, hanya jauh lebih besar

Bedanya dengan sistem pakar sangat mendasar, dan menentukan kapan masing-masing dipakai:

- **Sistem pakar** — aturannya **ditulis manusia**, bisa dijelaskan
- **Jaringan syaraf** — polanya **dipelajari dari data**, sulit dijelaskan

Karena itu jaringan syaraf tidak cocok untuk keputusan yang harus dipertanggungjawabkan secara hukum — meski akurasinya lebih tinggi.

Dan satu hal yang sering dilupakan: **jaringan syaraf butuh data banyak**. Untuk ratusan contoh saja, metode yang lebih sederhana sering lebih baik.`,

  praktik: {
    tujuan: `Kamu bisa melatih jaringan syaraf sederhana, memahami pengaruh laju belajar, dan mengenali overfitting.`,
    alat: [
      'Python 3',
      'NumPy untuk versi dari nol',
      'scikit-learn atau TensorFlow untuk versi praktis'
    ],
    langkah: [
      { judul: 'Bangun perceptron dari nol dulu',
        isi: `Tulis satu neuron: kalikan masukan dengan bobot, jumlahkan, tambah bias, lalu lewatkan fungsi aktivasi.

Latih untuk gerbang AND dan OR. Keduanya bisa dipelajari satu neuron.

Menulisnya sendiri sekali membuat semua yang datang sesudahnya masuk akal.` },
      { judul: 'Buktikan batasnya dengan XOR',
        isi: `Coba latih perceptron tunggal untuk XOR. Ia **tidak akan pernah** berhasil, berapa pun lama dilatih.

Sebabnya: XOR tidak bisa dipisahkan satu garis lurus.

Ini penemuan bersejarah yang sempat menghentikan penelitian jaringan syaraf selama bertahun-tahun. Tambahkan satu lapisan tersembunyi, dan XOR bisa dipelajari.` },
      { judul: 'Amati pengaruh laju belajar',
        isi: `Latih model yang sama dengan laju belajar 0,001, 0,01, 0,1, dan 1,0.

- terlalu kecil → belajar sangat lambat
- terlalu besar → galatnya melompat-lompat dan tidak pernah stabil

Buat grafik galat terhadap iterasi untuk keempatnya. Bentuk grafiknya langsung memberi tahu mana yang tepat.` },
      { judul: 'Pisahkan data latih dan data uji',
        isi: `**Jangan pernah** menilai model dengan data yang dipakai melatihnya.

Bagi 80 persen untuk melatih, 20 persen untuk menguji. Di scikit-learn: \`train_test_split\`.

Akurasi pada data latih hampir selalu lebih tinggi, dan angka itu **menyesatkan**.` },
      { judul: 'Kenali overfitting dari grafiknya',
        isi: `Plot galat data latih dan data uji pada sumbu yang sama, terhadap jumlah iterasi.

Kalau galat latih terus turun sementara galat uji mulai **naik**, model mulai menghafal alih-alih belajar.

Titik ketika keduanya mulai berpisah adalah tempat sebaiknya kamu berhenti melatih.` },
      { judul: 'Kerjakan satu kasus nyata',
        isi: `Pakai dataset MNIST untuk pengenalan angka tulisan tangan — tersedia langsung di banyak pustaka.

Latih, uji, lalu **lihat gambar yang salah dikenali**. Sering kali tulisannya memang ambigu, dan itu memberi rasa yang lebih jujur tentang kemampuan modelmu daripada angka akurasi saja.` }
    ],
    cek: [
      'Perceptron tunggalmu berhasil untuk AND tetapi gagal untuk XOR',
      'Grafikmu menunjukkan laju belajar terlalu besar membuat galat tidak stabil',
      'Kamu bisa menunjukkan titik ketika model mulai overfitting'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Slide kuliah membuka topik ini dari **Biological Inspiration**: JST lahir dari pengamatan cara kerja **otak manusia**.

**Neuron biologis**

Satu sel syaraf punya bagian yang perannya langsung ditiru JST:

- **Dendrit** — menerima sinyal dari neuron lain
- **Badan sel** — menjumlahkan sinyal yang masuk
- **Akson** — meneruskan keluaran ke neuron berikutnya
- **Sinapsis** — sambungan antar-neuron, dan **kekuatannya bisa berubah**

Bagian terakhir itu yang menentukan. Slide menyebutnya **learning in biological system**: otak belajar bukan dengan menambah neuron, melainkan dengan **mengubah kekuatan sambungan** antar-neuron.

**Belajar sebagai optimisasi**

Slide memakai istilah **learning as optimisation**, dan ini kunci memahami seluruh topik.

Belajar diterjemahkan menjadi persoalan matematis: **cari nilai bobot yang membuat kesalahan sekecil mungkin.** Tidak ada pemahaman, tidak ada penalaran — cuma pencarian angka.

**Neuron tiruan**

Satu neuron JST mengerjakan tiga langkah:

- **Jumlahkan** tiap masukan dikali bobotnya, lalu tambahkan **bias**
- **Lewatkan** hasilnya ke **fungsi aktivasi**
- **Keluarkan** hasilnya

Rumusnya: **keluaran = f(Σ wᵢxᵢ + b)**

**Kenapa perlu fungsi aktivasi?**

Ini pertanyaan yang sering ditanyakan dan jawabannya penting. Tanpa fungsi aktivasi, seluruh jaringan — sebanyak apa pun lapisannya — **runtuh menjadi satu perkalian linear**. Menumpuk seratus lapis tidak menambah kemampuan apa pun.

Fungsi aktivasi memasukkan **ketaklinieran**, dan itulah yang membuat jaringan berlapis sanggup mempelajari pola rumit.

Yang lazim dipakai: **step**, **sigmoid**, **tanh**, dan **ReLU**.

**Bobot dan bias**

- **Bobot** menyatakan **seberapa penting** sebuah masukan. Inilah padanan kekuatan sinapsis.
- **Bias** menggeser ambang, sehingga neuron bisa aktif meski seluruh masukannya nol.

**Bobot inilah yang dipelajari.** Struktur jaringannya kamu tentukan, tetapi isinya ditemukan sendiri lewat pelatihan.

**Cara belajarnya**

- Berikan masukan, hitung keluarannya
- Bandingkan dengan jawaban yang benar → dapat **error**
- **Sesuaikan bobot** ke arah yang memperkecil error
- Ulangi ribuan kali

Untuk jaringan berlapis, penyesuaian ini dikerjakan dengan **backpropagation**, yang menyebarkan kesalahan mundur dari lapisan keluaran ke lapisan sebelumnya.

**Perceptron dan batasnya**

Neuron tunggal disebut **perceptron**. Ia hanya sanggup memisahkan data yang bisa dibelah **satu garis lurus**.

Contoh terkenalnya: perceptron bisa mempelajari AND dan OR, tetapi **tidak bisa mempelajari XOR** — karena XOR tidak bisa dipisahkan satu garis. Penemuan ini sempat menghentikan penelitian JST bertahun-tahun, sampai orang menyadari bahwa **menambah lapisan tersembunyi** menyelesaikannya.

**Bedanya dengan sistem pakar**

Ini pertukaran yang perlu disadari:

- **Sistem pakar** — pengetahuan **dimasukkan manusia**, dan **bisa dijelaskan**
- **JST** — pengetahuan **ditemukan sendiri dari data**, tetapi berupa **jutaan angka yang tidak bisa dibaca manusia**

JST unggul pada pola yang **sulit dirumuskan** — mengenali wajah, memahami suara. Sistem pakar unggul ketika **penjelasan itu wajib**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Satu neuron: jumlahkan, aktivasi, keluarkan\n\ndef neuron(masukan, bobot, bias):\n    total = sum(x * w for x, w in zip(masukan, bobot)) + bias\n    return 1 if total >= 0 else 0        # aktivasi step\n\n# Bobot = seberapa PENTING tiap masukan\n# Bias  = menggeser ambang\n\n# Tanpa aktivasi, jaringan berlapis RUNTUH:\n#   lapis1: y = w1 * x\n#   lapis2: z = w2 * y = w2 * w1 * x = (w2*w1) * x\n#   -> tetap satu perkalian linear, seratus lapis pun sama',
      penjelasan: `
Perhatikan penurunan di komentar terakhir, karena itulah jawaban dari pertanyaan *"kenapa perlu fungsi aktivasi?"*

Kalau tiap lapisan cuma mengalikan, maka menumpuk dua lapisan menghasilkan \`w2 × w1 × x\` — yang **sama saja** dengan satu lapisan berbobot \`w2 × w1\`. Seratus lapisan pun tetap setara satu lapisan.

Artinya **kedalaman tidak menambah kemampuan apa pun** tanpa ketaklinieran. Fungsi aktivasi memutus rantai perkalian itu, dan barulah lapisan tambahan berarti sesuatu.

Soal **bias**, perhatikan apa yang terjadi tanpanya. Kalau seluruh masukan bernilai nol, maka \`Σ wᵢxᵢ = 0\` berapa pun bobotnya. Neuron **tidak akan pernah bisa** menghasilkan keluaran yang bergantung pada keadaan itu. Bias memberi neuron kemampuan menggeser ambangnya sendiri.

Bandingkan dengan garis lurus \`y = mx + c\`: bobot adalah kemiringan \`m\`, bias adalah perpotongan \`c\`. Tanpa \`c\`, semua garis dipaksa melewati titik nol.

Sekarang **batas perceptron**. Neuron tunggal dengan aktivasi step membelah ruang masukan dengan **satu garis lurus** — sisi mana pun menentukan keluarannya 0 atau 1.

Untuk **AND**, titik-titiknya bisa dipisah satu garis. Untuk **OR**, juga bisa. Tetapi untuk **XOR**, titik yang harus bernilai 1 berada di **dua sudut yang berseberangan**, dan tidak ada satu garis lurus yang bisa memisahkannya dari dua sudut lainnya.

Penemuan ini, yang dipublikasikan Minsky dan Papert pada 1969, membuat pendanaan penelitian JST hampir berhenti selama lebih dari satu dekade — dikenal sebagai *AI winter* pertama.

Jalan keluarnya ternyata sederhana: **tambahkan lapisan tersembunyi.** Dengan dua lapisan, jaringan bisa membentuk beberapa garis lalu menggabungkannya, dan XOR pun terpecahkan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# JST: dari satu neuron sampai memecahkan XOR
# ============================================
import math
import random

# ---------- 1. Satu neuron dengan aktivasi step ----------
def neuron_step(masukan, bobot, bias):
    total = sum(x * w for x, w in zip(masukan, bobot)) + bias
    return 1 if total >= 0 else 0

print("--- satu neuron menirukan gerbang logika ---")
uji = [(0, 0), (0, 1), (1, 0), (1, 1)]

print("  AND  (bobot 1,1  bias -1.5):")
for a, b in uji:
    print("    " + str(a) + " AND " + str(b) + " = " +
          str(neuron_step([a, b], [1, 1], -1.5)))

print("  OR   (bobot 1,1  bias -0.5):")
for a, b in uji:
    print("    " + str(a) + " OR  " + str(b) + " = " +
          str(neuron_step([a, b], [1, 1], -0.5)))


# ---------- 2. Melatih perceptron: belajar = mencari bobot ----------
def latih_perceptron(data, epoch=20, laju=0.1):
    bobot = [0.0, 0.0]
    bias = 0.0
    for _ in range(epoch):
        for masukan, benar in data:
            keluar = neuron_step(masukan, bobot, bias)
            error = benar - keluar
            # Inilah "belajar": geser bobot ke arah yang mengurangi error
            for i in range(len(bobot)):
                bobot[i] += laju * error * masukan[i]
            bias += laju * error
    return bobot, bias

def akurasi(data, bobot, bias):
    benar = sum(1 for m, t in data if neuron_step(m, bobot, bias) == t)
    return benar / len(data)

data_and = [([0,0],0), ([0,1],0), ([1,0],0), ([1,1],1)]
data_or  = [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],1)]
data_xor = [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],0)]

print("")
print("--- perceptron BELAJAR sendiri bobotnya ---")
for nama, data in [("AND", data_and), ("OR", data_or), ("XOR", data_xor)]:
    b, bs = latih_perceptron(data)
    akur = akurasi(data, b, bs)
    tanda = "" if akur == 1.0 else "   <- GAGAL"
    print("  " + nama.ljust(4) + " akurasi " +
          format(akur * 100, "5.1f") + "%" + tanda)

print("")
print("  XOR gagal karena tidak bisa dipisah SATU garis lurus.")
print("  Inilah penemuan Minsky & Papert 1969 yang sempat")
print("  menghentikan penelitian JST lebih dari satu dekade.")


# ---------- 3. Dua lapis: XOR terpecahkan ----------
def sigmoid(x):
    return 1 / (1 + math.exp(-max(-60, min(60, x))))

class JSTDuaLapis:
    """2 masukan -> 2 neuron tersembunyi -> 1 keluaran."""
    def __init__(self, seed=1):
        r = random.Random(seed)
        self.w1 = [[r.uniform(-1, 1) for _ in range(2)] for _ in range(2)]
        self.b1 = [r.uniform(-1, 1) for _ in range(2)]
        self.w2 = [r.uniform(-1, 1) for _ in range(2)]
        self.b2 = r.uniform(-1, 1)

    def maju(self, x):
        self.h = [sigmoid(sum(x[i] * self.w1[j][i] for i in range(2))
                          + self.b1[j]) for j in range(2)]
        self.y = sigmoid(sum(self.h[j] * self.w2[j] for j in range(2))
                         + self.b2)
        return self.y

    def mundur(self, x, target, laju=0.5):
        """Backpropagation: sebarkan error MUNDUR ke lapisan sebelumnya."""
        y = self.maju(x)
        d_out = (y - target) * y * (1 - y)

        d_h = [d_out * self.w2[j] * self.h[j] * (1 - self.h[j])
               for j in range(2)]

        for j in range(2):
            self.w2[j] -= laju * d_out * self.h[j]
        self.b2 -= laju * d_out

        for j in range(2):
            for i in range(2):
                self.w1[j][i] -= laju * d_h[j] * x[i]
            self.b1[j] -= laju * d_h[j]

        return (y - target) ** 2


print("")
print("--- dua lapis: XOR terpecahkan ---")
jst = JSTDuaLapis()
for epoch in range(1, 20001):
    total = sum(jst.mundur(m, t) for m, t in data_xor)
    if epoch in (1, 100, 1000, 5000, 20000):
        print("  epoch " + str(epoch).rjust(5) +
              "   error " + format(total, ".6f"))

print("")
print("  hasil akhir:")
for m, t in data_xor:
    keluar = jst.maju(m)
    print("    " + str(m[0]) + " XOR " + str(m[1]) +
          " = " + format(keluar, ".4f") +
          "   (target " + str(t) + ")   -> bulat: " +
          str(1 if keluar >= 0.5 else 0))

print("")
print("  Bobot yang ditemukan JST:")
print("    lapis tersembunyi:", [[round(w, 2) for w in b] for b in jst.w1])
print("    lapis keluaran   :", [round(w, 2) for w in jst.w2])
print("")
print("  Perhatikan: angka-angka itu BENAR. Tapi tidak ada")
print("  seorang pun yang bisa membacanya dan menjelaskan")
print("  KENAPA. Itulah harga yang dibayar JST dibanding")
print("  sistem pakar yang setiap kesimpulannya punya jejak.")`
  },

  output: `--- satu neuron menirukan gerbang logika ---
  AND  (bobot 1,1  bias -1.5):
    0 AND 0 = 0
    0 AND 1 = 0
    1 AND 0 = 0
    1 AND 1 = 1
  OR   (bobot 1,1  bias -0.5):
    0 OR  0 = 0
    0 OR  1 = 1
    1 OR  0 = 1
    1 OR  1 = 1

--- perceptron BELAJAR sendiri bobotnya ---
  AND  akurasi 100.0%
  OR   akurasi 100.0%
  XOR  akurasi  50.0%   <- GAGAL

  XOR gagal karena tidak bisa dipisah SATU garis lurus.
  Inilah penemuan Minsky & Papert 1969 yang sempat
  menghentikan penelitian JST lebih dari satu dekade.

--- dua lapis: XOR terpecahkan ---
  epoch     1   error 1.077790
  epoch   100   error 1.040799
  epoch  1000   error 0.030729
  epoch  5000   error 0.002514
  epoch 20000   error 0.000524

  hasil akhir:
    0 XOR 0 = 0.0126   (target 0)   -> bulat: 0
    0 XOR 1 = 0.9891   (target 1)   -> bulat: 1
    1 XOR 0 = 0.9891   (target 1)   -> bulat: 1
    1 XOR 1 = 0.0113   (target 0)   -> bulat: 0

  Bobot yang ditemukan JST:
    lapis tersembunyi: [[-6.33, 6.15], [6.09, -6.28]]
    lapis keluaran   : [10.15, 10.16]

  Perhatikan: angka-angka itu BENAR. Tapi tidak ada
  seorang pun yang bisa membacanya dan menjelaskan
  KENAPA. Itulah harga yang dibayar JST dibanding
  sistem pakar yang setiap kesimpulannya punya jejak.`,

  kesalahanUmum: [
    {
      salah: 'Mengira menambah lapisan selalu menambah kemampuan jaringan, tanpa memakai fungsi aktivasi.',
      kenapa: 'Tanpa ketaklinieran, seluruh lapisan runtuh menjadi satu perkalian linear tunggal, karena w2 dikali w1 dikali x sama saja dengan satu bobot gabungan dikali x. Seratus lapisan pun setara satu lapisan, sehingga pelatihannya sia-sia.',
      benar: 'Selalu sertakan fungsi aktivasi taklinier seperti sigmoid, tanh, atau ReLU di antara lapisan. Itulah yang membuat kedalaman berarti.'
    },
    {
      salah: 'Mengira perceptron tunggal bisa mempelajari pola apa pun kalau dilatih cukup lama.',
      kenapa: 'Perceptron hanya sanggup memisahkan data yang bisa dibelah satu garis lurus. XOR tidak bisa, dan tidak ada jumlah epoch yang mengubahnya. Melatih lebih lama pada persoalan seperti ini cuma membuang waktu tanpa perbaikan apa pun.',
      benar: 'Kenali batas keterpisahan linearnya. Kalau datanya tidak terpisah satu garis, tambahkan lapisan tersembunyi.'
    },
    {
      salah: 'Melupakan bias dan mengira bobot saja cukup.',
      kenapa: 'Tanpa bias, jumlah berbobot selalu nol ketika seluruh masukan nol, sehingga neuron tidak bisa menghasilkan keluaran yang bergantung pada keadaan itu. Ini seperti memaksa semua garis lurus melewati titik nol, yang membuang separuh kemampuan modelnya.',
      benar: 'Sertakan bias di tiap neuron. Ia padanan perpotongan sumbu pada persamaan garis, dan ikut dilatih bersama bobot.'
    },
    {
      salah: 'Menganggap JST selalu lebih baik daripada sistem pakar karena lebih modern.',
      kenapa: 'JST menemukan polanya sendiri tetapi hasilnya berupa ribuan angka yang tidak bisa dibaca manusia, sehingga tidak bisa menjelaskan kenapa ia menyimpulkan sesuatu. Di bidang yang menuntut pertanggungjawaban seperti kedokteran dan hukum, sifat ini bisa membuatnya tidak bisa dipakai sama sekali.',
      benar: 'Bandingkan sebagai pertukaran. JST unggul pada pola yang sulit dirumuskan, sistem pakar unggul ketika penjelasan itu wajib.'
    }
  ],

  analogi: `Bayangkan panitia yang memutuskan menerima atau menolak sebuah proposal.

**Satu neuron** adalah **satu anggota panitia**. Ia mendengar beberapa pertimbangan — anggaran, jadwal, manfaat — lalu memberi **bobot** berbeda pada masing-masing.

Anggota yang sangat peduli anggaran memberi bobot besar untuk itu, dan bobot kecil untuk yang lain. **Bobot itulah pendapatnya.**

**Bias** adalah **kecenderungan pribadinya**. Ada anggota yang cenderung menyetujui apa pun, ada yang cenderung menolak. Bias menggeser ambangnya, terlepas dari isi proposalnya.

**Belajar** adalah **menyesuaikan bobot setelah tahu hasilnya.** Kalau proposal yang disetujui ternyata gagal, anggota itu mengurangi bobot pada pertimbangan yang menyesatkannya. Ribuan proposal kemudian, bobotnya menjadi tajam.

Perhatikan bahwa ia **tidak pernah memahami** apa itu proposal yang baik. Ia cuma menyetel angka sampai kesalahannya kecil. Itulah arti *"learning as optimisation"* di slide.

Sekarang **kenapa satu anggota tidak cukup**. Bayangkan aturan: *"terima kalau anggarannya besar ATAU jadwalnya longgar, tapi TOLAK kalau keduanya sekaligus"* — karena itu tanda proposalnya mengada-ada.

Satu anggota **tidak bisa** membuat keputusan seperti itu dengan cara menimbang biasa. Berapa pun bobot yang dia pilih, dia akan salah di salah satu kasus. Itulah XOR.

Jalan keluarnya: **bentuk dua sub-panitia.** Satu memeriksa *"apakah setidaknya salah satu bagus?"*, satu lagi memeriksa *"apakah keduanya bagus?"*. Lalu ketua menggabungkan kedua laporan itu.

Itulah **lapisan tersembunyi** — dan dengan itu, keputusan yang tadinya mustahil jadi bisa.

Dan harganya? Setelah dua puluh ribu proposal, panitiamu memang **akurat**. Tetapi kalau kamu bertanya *"kenapa yang ini ditolak?"*, yang bisa ditunjukkan cuma **selembar tabel angka**. Tidak ada seorang pun, termasuk panitianya sendiri, yang bisa menjelaskan alasannya.`,

  latihan: [
    'Sebutkan bagian neuron biologis dan padanannya di neuron tiruan, lalu jelaskan bagian mana yang berubah saat belajar.',
    'Tuliskan rumus keluaran satu neuron, dan jelaskan peran bobot serta bias masing-masing.',
    'Jelaskan kenapa jaringan tanpa fungsi aktivasi runtuh menjadi satu lapisan. Tunjukkan penurunannya untuk dua lapisan.',
    'Tentukan bobot dan bias untuk satu neuron yang menirukan gerbang NAND, lalu uji pada keempat kemungkinan masukan.',
    'Jelaskan kenapa perceptron tunggal tidak bisa mempelajari XOR, dan bagaimana lapisan tersembunyi menyelesaikannya.',
    'Jelaskan perbedaan mendasar antara sistem pakar dan JST dalam hal asal pengetahuan dan kemampuan menjelaskan. Sebutkan satu bidang yang lebih cocok untuk masing-masing.'
  ]
});

TOPICS.push({
  id: 'kb-algoritma-genetika',
  judul: 'Algoritma Genetika & Heuristik',
  kategori: 'kecerdasan-buatan',
  tag: ['algoritma genetika', 'heuristik', 'optimisasi', 'seleksi', 'crossover', 'mutasi'],
  ringkas: 'Meniru evolusi untuk mencari jawaban di ruang yang terlalu besar untuk disisir.',

  fungsi: `**Mencari solusi bagus untuk masalah yang terlalu besar untuk dicoba semua kemungkinannya.**

Terpakai di:

- **Penjadwalan** — jadwal kuliah, jadwal ujian, penugasan ruang
- **Optimasi rute** — pengiriman, kunjungan
- **Penataan** — tata letak pabrik, penempatan menara
- **Penyetelan parameter** — mencari kombinasi terbaik untuk model lain

Yang harus jujur diakui sejak awal: **algoritma genetika tidak menjamin solusi terbaik.**

Ia menjanjikan solusi **cukup baik** dalam waktu yang wajar. Untuk masalah yang ruang pencariannya 10 pangkat 50, itu jauh lebih berguna daripada jaminan optimal yang tidak akan pernah selesai dihitung.

Yang paling menentukan keberhasilannya bukan kodenya, melainkan **fungsi fitness** — dan itu yang paling sering dirancang asal-asalan.`,

  praktik: {
    tujuan: `Kamu punya algoritma genetika yang bekerja untuk masalah penjadwalan nyata, dan tahu pengaruh tiap parameternya.`,
    alat: [
      'Python 3',
      'Data jadwal atau masalah optimasi nyata'
    ],
    langkah: [
      { judul: 'Hitung dulu ruang pencariannya',
        isi: `Pakai kombinatorial dari Matematika Diskrit. Kalau hasilnya di bawah sejuta, **pakai brute force** — hasilnya pasti optimal dan kodenya lebih sederhana.

Algoritma genetika hanya masuk akal kalau ruangnya terlalu besar.

Langkah ini sering dilewatkan, dan orang memakai algoritma rumit untuk masalah yang bisa diselesaikan dengan perulangan biasa.` },
      { judul: 'Rancang fungsi fitness dengan hati-hati',
        isi: `Ini bagian yang paling menentukan. Fungsi fitness yang buruk membuat algoritma secanggih apa pun menemukan solusi yang salah.

Untuk penjadwalan: kurangi nilai untuk tiap bentrok, tiap ruang yang tidak muat, tiap dosen yang mengajar dua kelas bersamaan.

Uji fungsinya dulu **secara terpisah**: buat jadwal yang jelas buruk dan jelas bagus, dan pastikan nilainya sesuai.` },
      { judul: 'Pilih cara mewakili individu',
        isi: `Untuk penjadwalan, satu individu bisa berupa daftar: indeks ke-i adalah slot waktu untuk mata kuliah ke-i.

Bentuk yang sederhana membuat crossover dan mutasi mudah ditulis, dan itu lebih penting daripada bentuk yang paling "tepat".` },
      { judul: 'Terapkan seleksi, crossover, dan mutasi',
        isi: `- **seleksi turnamen** — ambil beberapa individu acak, pilih yang terbaik. Sederhana dan bekerja baik
- **crossover** — gabungkan dua induk pada satu atau dua titik potong
- **mutasi** — ubah beberapa gen secara acak

Simpan **individu terbaik** ke generasi berikutnya tanpa diubah. Ini disebut elitisme, dan mencegah solusi terbaikmu hilang karena mutasi.` },
      { judul: 'Uji pengaruh laju mutasi',
        isi: `Jalankan dengan laju mutasi 0, 0.01, 0.05, dan 0.3, masing-masing beberapa kali.

- **nol** → populasi cepat seragam dan berhenti membaik
- **terlalu tinggi** → menjadi pencarian acak, tidak pernah stabil

Plot fitness terbaik terhadap generasi untuk keempatnya. Bentuk grafiknya menjelaskan lebih baik daripada angka akhir saja.` },
      { judul: 'Ukur keragaman populasi',
        isi: `Hitung berapa individu yang **berbeda** di tiap generasi.

Kalau angkanya turun cepat mendekati satu, populasimu **kehilangan keragaman** dan terjebak di optimum lokal.

Ini pemeriksaan yang jauh lebih informatif daripada hanya melihat fitness terbaik.` },
      { judul: 'Bandingkan dengan pembanding sederhana',
        isi: `Jalankan juga: solusi acak murni, dan algoritma serakah sederhana.

Kalau algoritma genetikamu tidak mengalahkan keduanya, ada yang salah — biasanya fungsi fitness-nya.

Pembanding sederhana ini wajib ada. Tanpanya, kamu tidak tahu apakah hasilmu benar-benar bagus.` }
    ],
    cek: [
      'Fungsi fitness-mu memberi nilai lebih tinggi untuk jadwal yang memang lebih baik',
      'Algoritma genetikamu mengalahkan solusi acak dan algoritma serakah',
      'Grafikmu menunjukkan pengaruh laju mutasi terhadap kecepatan perbaikan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Slide membuka topik ini dari **Search and Optimization Problem** — dan itu titik sambung langsung dengan yang kamu pelajari di Matematika Diskrit.

**Persoalannya**

Banyak persoalan nyata punya **ruang pencarian yang terlalu besar** untuk disisir seluruhnya. Menyusun jadwal kuliah, menentukan rute pengiriman, menata tata letak pabrik — semuanya punya jumlah kemungkinan yang tumbuh faktorial atau eksponensial.

Brute force **pasti menemukan jawaban terbaik**, tetapi tidak akan pernah selesai. Kamu butuh cara lain.

**Heuristik**

**Heuristik** adalah aturan praktis untuk **menebak arah yang menjanjikan**, tanpa jaminan menemukan jawaban terbaik.

Pertukarannya jelas: kamu **menyerah pada jaminan optimal**, dan sebagai gantinya mendapat jawaban yang **cukup baik dalam waktu yang masuk akal**.

Untuk banyak persoalan nyata, itu pertukaran yang tepat. Rute pengiriman yang 3 persen lebih panjang tetapi dihitung dalam sedetik jauh lebih berguna daripada rute sempurna yang butuh seribu tahun.

**Algoritma Genetika**

Algoritma genetika adalah heuristik yang meniru **evolusi biologis**. Gagasannya: alih-alih mencari satu jawaban, **pelihara sekumpulan calon jawaban** lalu biarkan yang bagus **berkembang biak**.

Istilahnya diambil langsung dari biologi:

- **Individu / Kromosom** — satu calon jawaban
- **Gen** — satu bagian dari jawaban itu
- **Populasi** — kumpulan calon jawaban
- **Fitness** — seberapa bagus sebuah calon
- **Generasi** — satu putaran proses

**Empat langkahnya**

- **Inisialisasi** — buat populasi awal secara acak
- **Seleksi** — pilih individu yang akan berkembang biak, condong ke yang fitness-nya tinggi
- **Crossover** (persilangan) — gabungkan dua induk menjadi keturunan
- **Mutasi** — ubah sedikit bagian secara acak

Lalu ulangi sampai cukup baik atau sampai batas generasi tercapai.

**Peran masing-masing langkah**

Ini yang paling penting dipahami, karena tiap langkah menyelesaikan masalah yang berbeda:

- **Seleksi** mengarahkan pencarian ke wilayah yang menjanjikan. Tanpanya, prosesnya cuma pencarian acak.
- **Crossover** menggabungkan **bagian bagus dari dua jawaban berbeda**. Inilah yang membuat algoritma genetika lebih dari sekadar mencoba-coba.
- **Mutasi** menjaga **keragaman**. Tanpanya, populasi cepat menjadi seragam dan pencarian **macet di optimum lokal**.

**Optimum lokal**

Inilah persoalan utama semua metode pencarian heuristik. Bayangkan mencari puncak tertinggi dalam kabut: kamu terus mendaki, sampai di puncak sebuah bukit, dan **setiap arah menurun**. Kamu berhenti — padahal ada gunung yang jauh lebih tinggi di seberang lembah.

Mutasi adalah cara **melompat keluar** dari bukit itu. Karena itu kadar mutasi punya pertukaran sendiri:

- **Terlalu kecil** → macet di optimum lokal
- **Terlalu besar** → berubah jadi pencarian acak, dan kemajuan yang sudah dicapai ikut rusak

**Kapan dipakai**

Algoritma genetika cocok ketika:

- Ruang pencarian **sangat besar**
- Tidak ada rumus langsung untuk jawaban terbaiknya
- Fitness **mudah dihitung**, meski jawabannya sulit dicari
- Jawaban **cukup baik** sudah memadai

Ia **tidak cocok** kalau ada algoritma pasti yang sudah efisien. Memakai algoritma genetika untuk mengurutkan angka adalah kesalahan — sudah ada quicksort.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Tiga langkah, tiga peran BERBEDA\n\n# SELEKSI  -> mengarahkan ke wilayah menjanjikan\n#   tanpa ini: cuma pencarian acak\n\n# CROSSOVER -> menggabungkan bagian bagus dua induk\n#   induk A: [1,1,0,0,0,0]  bagus di depan\n#   induk B: [0,0,0,0,1,1]  bagus di belakang\n#   anak   : [1,1,0,0,1,1]  bagus di DUA-DUANYA\n\n# MUTASI   -> menjaga keragaman\n#   tanpa ini: populasi seragam, macet di optimum lokal',
      penjelasan: `
Contoh crossover di atas menunjukkan **kenapa algoritma genetika bukan sekadar mencoba-coba secara acak**.

Perhatikan bahwa anaknya **lebih baik daripada kedua induknya**. Induk A punya bagian depan yang bagus, induk B punya bagian belakang yang bagus, dan crossover menggabungkan keduanya. Tidak ada satu pun individu yang perlu "beruntung" menemukan seluruh jawaban sekaligus.

Inilah yang disebut **building block hypothesis**: jawaban bagus tersusun dari potongan-potongan bagus, dan crossover memungkinkan potongan itu **berpindah antar-individu**.

Sekarang perhatikan apa yang terjadi kalau **salah satu langkah dihilangkan**:

- **Tanpa seleksi** — semua individu punya peluang sama berkembang biak, sehingga tidak ada tekanan ke arah yang lebih baik. Yang tersisa cuma pencarian acak dengan langkah tambahan yang sia-sia.
- **Tanpa crossover** — tiap individu berevolusi sendiri-sendiri lewat mutasi saja. Metodenya masih bekerja, tetapi jauh lebih lambat karena potongan bagus tidak bisa digabungkan.
- **Tanpa mutasi** — inilah yang paling berbahaya. Seleksi terus-menerus mempersempit populasi, dan setelah beberapa generasi **semua individu menjadi kembar**. Crossover antara dua individu identik menghasilkan individu yang identik pula. Pencarian **berhenti total**, dan tidak ada yang memberitahumu.

Gejala yang terakhir itu khas: nilai fitness terbaik **membeku di angka yang sama** selama ratusan generasi, tanpa pesan kesalahan apa pun.

Karena itu keragaman populasi layak dipantau, bukan cuma nilai fitness-nya. Kalau seluruh populasi sudah seragam, menambah generasi tidak akan mengubah apa pun.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Algoritma Genetika: menyusun jadwal ujian
# Ruang pencarian terlalu besar untuk brute force
# ============================================
import random

random.seed(42)

# ---------- Persoalan ----------
# 8 mata kuliah dijadwalkan ke 4 slot waktu.
# Beberapa pasangan TIDAK BOLEH bentrok karena
# diambil mahasiswa yang sama.
MATKUL = ["Alpro", "Strukdat", "Basdat", "Orkom", "Jarkom",
          "KB", "Pemweb", "RPL", "SO", "Matdis", "IMK", "SPK"]
SLOT = 3            # sengaja SEDIKIT, supaya persoalannya sulit

# Bentroknya padat: ini persoalan pewarnaan graf dengan 3 warna
BENTROK = [
    ("Alpro", "Strukdat"), ("Alpro", "Matdis"),   ("Alpro", "Orkom"),
    ("Strukdat", "Basdat"), ("Strukdat", "KB"),   ("Strukdat", "Matdis"),
    ("Basdat", "Pemweb"),  ("Basdat", "SPK"),     ("Basdat", "RPL"),
    ("Orkom", "Jarkom"),   ("Orkom", "SO"),       ("Orkom", "Matdis"),
    ("Jarkom", "KB"),      ("Jarkom", "SO"),
    ("KB", "Pemweb"),      ("KB", "SPK"),
    ("Pemweb", "RPL"),     ("Pemweb", "IMK"),
    ("RPL", "IMK"),        ("RPL", "SPK"),
    ("SO", "Matdis"),      ("IMK", "SPK"),
]

print("ruang pencarian = " + str(SLOT) + "^" + str(len(MATKUL)) +
      " = " + format(SLOT ** len(MATKUL), ",") + " kemungkinan")
print("")


# ---------- Fitness: makin sedikit bentrok, makin bagus ----------
def fitness(individu):
    """individu = daftar slot untuk tiap matkul."""
    jadwal = dict(zip(MATKUL, individu))
    bentrok = sum(1 for a, b in BENTROK if jadwal[a] == jadwal[b])
    return len(BENTROK) - bentrok        # maksimal = 8


# ---------- Empat langkah algoritma genetika ----------
def individu_acak():
    return [random.randrange(SLOT) for _ in MATKUL]

def seleksi(populasi, k=3):
    """Turnamen: ambil k acak, menangkan yang terbaik."""
    peserta = random.sample(populasi, k)
    return max(peserta, key=fitness)

def crossover(a, b):
    """Gabungkan bagian depan A dengan bagian belakang B."""
    titik = random.randrange(1, len(a))
    return a[:titik] + b[titik:]

def mutasi(ind, kadar):
    return [random.randrange(SLOT) if random.random() < kadar else g
            for g in ind]


def jalankan(kadar_mutasi, generasi=100, ukuran=30, diam=False):
    populasi = [individu_acak() for _ in range(ukuran)]
    riwayat = []

    for g in range(generasi):
        populasi.sort(key=fitness, reverse=True)
        terbaik = fitness(populasi[0])
        keragaman = len({tuple(i) for i in populasi})
        riwayat.append((g, terbaik, keragaman))

        if not diam and g in (0, 10, 30, 60, 99):
            print("    gen " + str(g).rjust(3) +
                  "   fitness terbaik " + str(terbaik) + "/" + str(len(BENTROK)) +
                  "   individu unik " + str(keragaman).rjust(2) +
                  "/" + str(ukuran))

        if terbaik == len(BENTROK):
            if not diam:
                print("    gen " + str(g).rjust(3) +
                      "   SEMPURNA, tidak ada bentrok")
            break

        # elitisme: 2 terbaik lolos langsung
        baru = populasi[:2]
        while len(baru) < ukuran:
            anak = crossover(seleksi(populasi), seleksi(populasi))
            baru.append(mutasi(anak, kadar_mutasi))
        populasi = baru

    populasi.sort(key=fitness, reverse=True)
    return populasi[0], riwayat


print("--- kadar mutasi 0.10 (seimbang) ---")
terbaik, _ = jalankan(0.10)
jadwal = dict(zip(MATKUL, terbaik))
print("")
print("  jadwal yang ditemukan:")
for slot in range(SLOT):
    isi = [m for m in MATKUL if jadwal[m] == slot]
    print("    slot " + str(slot) + ": " + ", ".join(isi))


# ============================================
# Kenapa mutasi diperlukan: bukti
# ============================================
print("")
print("--- pengaruh kadar mutasi ---")
print("  kadar   fitness akhir   individu unik di akhir")
for kadar in [0.0, 0.02, 0.10, 0.60]:
    hasil = []
    for percobaan in range(20):
        random.seed(percobaan)
        terbaik, riwayat = jalankan(kadar, diam=True)
        hasil.append((fitness(terbaik), riwayat[-1][2]))
    rata_fit = sum(h[0] for h in hasil) / len(hasil)
    rata_unik = sum(h[1] for h in hasil) / len(hasil)
    catatan = ""
    if kadar == 0.0:
        catatan = "  <- macet: populasi jadi kembar"
    if kadar == 0.60:
        catatan = "  <- jadi pencarian acak"
    print("  " + format(kadar, ".2f") +
          format(rata_fit, "14.2f") +
          format(rata_unik, "22.1f") + catatan)

print("")
print("  Tanpa mutasi, seleksi terus mempersempit populasi")
print("  sampai semua individu identik. Crossover antara dua")
print("  individu yang sama menghasilkan yang sama pula --")
print("  pencarian BERHENTI tanpa pesan apa pun.")`
  },

  output: `ruang pencarian = 3^12 = 531,441 kemungkinan

--- kadar mutasi 0.10 (seimbang) ---
    gen   0   fitness terbaik 18/22   individu unik 30/30
    gen  10   fitness terbaik 22/22   individu unik 20/30
    gen  10   SEMPURNA, tidak ada bentrok

  jadwal yang ditemukan:
    slot 0: Strukdat, Orkom, RPL
    slot 1: Jarkom, Pemweb, Matdis, SPK
    slot 2: Alpro, Basdat, KB, SO, IMK

--- pengaruh kadar mutasi ---
  kadar   fitness akhir   individu unik di akhir
  0.00         20.90                   2.5  <- macet: populasi jadi kembar
  0.02         21.75                   8.8
  0.10         21.90                  21.2
  0.60         21.15                  29.9  <- jadi pencarian acak

  Tanpa mutasi, seleksi terus mempersempit populasi
  sampai semua individu identik. Crossover antara dua
  individu yang sama menghasilkan yang sama pula --
  pencarian BERHENTI tanpa pesan apa pun.`,

  kesalahanUmum: [
    {
      salah: 'Menghilangkan mutasi karena dianggap merusak jawaban yang sudah bagus.',
      kenapa: 'Seleksi terus mempersempit populasi, dan tanpa mutasi seluruh individu menjadi identik setelah beberapa generasi. Crossover antara dua individu yang sama menghasilkan yang sama pula, sehingga pencarian berhenti total. Gejalanya khas dan diam: fitness terbaik membeku di angka yang sama selama ratusan generasi tanpa pesan apa pun.',
      benar: 'Pertahankan kadar mutasi kecil, biasanya di bawah sepuluh persen, dan pantau keragaman populasi bukan cuma nilai fitness-nya.'
    },
    {
      salah: 'Menaikkan kadar mutasi tinggi supaya pencariannya lebih menjelajah.',
      kenapa: 'Mutasi yang terlalu besar merusak kemajuan yang sudah dicapai, sehingga prosesnya berubah menjadi pencarian acak dengan langkah tambahan yang sia-sia. Percobaan pada contoh kode menunjukkan kadar 0,60 menghasilkan populasi yang seluruhnya unik tetapi fitness-nya justru tidak lebih baik.',
      benar: 'Perlakukan kadar mutasi sebagai pertukaran antara menjelajah dan memanfaatkan. Mulai dari nilai kecil, naikkan hanya kalau terbukti macet.'
    },
    {
      salah: 'Memakai algoritma genetika untuk persoalan yang sudah punya algoritma pasti dan efisien.',
      kenapa: 'Algoritma genetika tidak menjamin jawaban terbaik dan butuh banyak putaran, sehingga memakainya untuk mengurutkan angka atau mencari nilai terbesar hanya menghasilkan jawaban yang lebih buruk dalam waktu yang lebih lama.',
      benar: 'Pakai hanya kalau ruang pencarian sangat besar, tidak ada rumus langsung, dan jawaban cukup baik sudah memadai.'
    },
    {
      salah: 'Mengira algoritma genetika pasti menemukan jawaban terbaik kalau dijalankan cukup lama.',
      kenapa: 'Ia heuristik, bukan metode pasti. Ia bisa macet di optimum lokal dan berhenti di jawaban yang bukan terbaik, tanpa cara mengetahui bahwa masih ada yang lebih baik. Menjalankannya lebih lama tidak mengubah hal itu kalau keragamannya sudah habis.',
      benar: 'Perlakukan hasilnya sebagai jawaban yang cukup baik. Kalau perlu keyakinan lebih, jalankan beberapa kali dengan benih acak berbeda dan bandingkan hasilnya.'
    }
  ],

  analogi: `Bayangkan kamu mencari puncak tertinggi di daerah berbukit, **dalam kabut tebal**. Kamu hanya bisa merasakan kemiringan tanah di bawah kakimu.

Cara paling sederhana: **terus mendaki**. Kamu akan sampai di suatu puncak — tetapi kalau kabutnya tidak pernah hilang, kamu **tidak akan pernah tahu** apakah ada gunung yang lebih tinggi di seberang lembah. Itulah **optimum lokal**.

**Algoritma genetika** adalah menyebar **tiga puluh pendaki sekaligus** di titik-titik acak.

- **Seleksi** — yang berada di tempat tinggi diberi kesempatan mengirim lebih banyak keturunan. Yang di lembah perlahan tersingkir.
- **Crossover** — dua pendaki bertukar kabar. Yang satu tahu arah timur bagus, yang lain tahu arah utara bagus. Keturunannya berangkat ke **timur laut** — tempat yang tidak dikenal keduanya, tetapi menggabungkan pengetahuan mereka.
- **Mutasi** — sesekali ada pendaki yang **berbelok sembarangan**. Sebagian besar tersesat. Tetapi sesekali, satu di antaranya menyeberangi lembah dan menemukan gunung yang lebih tinggi.

Sekarang **kenapa mutasi tidak boleh dihilangkan**. Tanpa pembelokan acak, seleksi terus memusatkan semua pendaki ke bukit yang sama. Setelah beberapa generasi, **mereka semua berdiri di titik yang sama persis**.

Dan pada saat itu, bertukar kabar jadi percuma — semua orang tahu hal yang sama. **Pencarian berhenti**, dan tidak ada seorang pun yang menyadarinya, karena mereka memang sedang berdiri di puncak. Puncak yang salah.

Tetapi **kalau semua orang berbelok sembarangan setiap saat**, tidak ada yang pernah sempat mendaki. Kelompok itu cuma berkeliaran acak di seluruh daerah. Itulah kadar mutasi yang terlalu tinggi.

Yang dicari adalah **sedikit orang yang berani menyimpang**, di tengah kelompok yang sebagian besar tekun mendaki.`,

  latihan: [
    'Jelaskan apa itu heuristik, dan pertukaran apa yang kamu terima ketika memakainya alih-alih brute force.',
    'Sebutkan empat langkah algoritma genetika, dan jelaskan masalah berbeda apa yang diselesaikan oleh seleksi, crossover, dan mutasi.',
    'Jelaskan apa itu optimum lokal dengan gambaran pendaki di kabut, lalu jelaskan bagaimana mutasi membantu keluar darinya.',
    'Jalankan percobaan dengan kadar mutasi nol, lalu catat nilai fitness terbaik dan jumlah individu unik di generasi terakhir. Jelaskan apa yang terjadi.',
    'Rancang fungsi fitness untuk persoalan menyusun kelompok tugas berisi 20 mahasiswa ke dalam 5 kelompok, dengan syarat kemampuan tiap kelompok merata.',
    'Sebutkan dua persoalan yang cocok diselesaikan algoritma genetika dan dua yang tidak cocok, beserta alasannya masing-masing.'
  ]
});

TOPICS.push({
  id: 'kb-nlp-llm',
  judul: 'NLP & Large Language Model',
  kategori: 'kecerdasan-buatan',
  tag: ['NLP', 'LLM', 'tokenisasi', 'stemming', 'embedding', 'transformer', 'halusinasi'],
  ringkas: 'Bagaimana komputer mengolah bahasa manusia — dan apa yang sebenarnya dilakukan model bahasa besar.',

  fungsi: `**Mengolah bahasa manusia dengan komputer, dan memakai model bahasa besar secara bertanggung jawab.**

Terpakai di:

- **Analisis teks** — mengelompokkan keluhan, menilai sentimen ulasan
- **Pencarian** — mencocokkan makna, bukan sekadar kata
- **Chatbot dan asisten**
- **Membantu tugas kuliah** — dengan cara yang jujur dan disebutkan
- **Data Mining** — pembersihan teks sebelum analisis

Yang paling perlu dipahami tentang model bahasa besar: **ia meramalkan kata berikutnya, bukan mencari kebenaran.**

Karena itu ia bisa menghasilkan kalimat yang meyakinkan dan **sepenuhnya salah** — termasuk nama pustaka yang tidak ada, kutipan yang tidak pernah ditulis, dan angka yang dikarang.

Kaidah praktisnya: **pakai untuk menyusun dan menjelaskan, verifikasi untuk fakta.**`,

  praktik: {
    tujuan: `Kamu bisa memproses teks Indonesia dengan langkah baku, dan memakai model bahasa besar dengan verifikasi yang memadai.`,
    alat: [
      'Python 3',
      'Pustaka Sastrawi untuk teks Indonesia',
      'scikit-learn'
    ],
    langkah: [
      { judul: 'Kerjakan pra-pemrosesan berurutan',
        isi: `Urutan bakunya:

- ubah ke huruf kecil
- buang tanda baca dan angka kalau tidak relevan
- pecah jadi kata
- buang kata henti seperti "yang", "di", "dan"
- ubah ke kata dasar

Untuk bahasa Indonesia, pakai **Sastrawi**: \`pip install Sastrawi\`.` },
      { judul: 'Periksa hasil stemming-nya',
        isi: `Stemmer bahasa Indonesia harus menangani **peluluhan**: "menyediakan" berasal dari "sedia", bukan "edia".

Uji dengan kata berawalan meny-, meng-, mem-, dan men-. Kalau hasilnya aneh, jangan dipakai begitu saja.

Selalu periksa keluaran pra-pemrosesan sebelum melanjutkan — kesalahan di sini merambat ke semua langkah berikutnya.` },
      { judul: 'Ubah teks jadi angka',
        isi: `- **Bag of Words** — menghitung kemunculan kata
- **TF-IDF** — memberi bobot lebih pada kata yang **khas**, bukan yang sering

TF-IDF hampir selalu lebih baik untuk klasifikasi, karena kata yang muncul di semua dokumen tidak membedakan apa pun.

Di scikit-learn: \`TfidfVectorizer\`.` },
      { judul: 'Buat satu pengklasifikasi nyata',
        isi: `Kumpulkan ulasan atau keluhan berbahasa Indonesia, beri label positif atau negatif, lalu latih model sederhana seperti Naive Bayes.

Uji dengan data yang **tidak** dipakai melatih, dan lihat kalimat mana yang salah dikelompokkan.

Kalimat bernada sindiran hampir selalu gagal — dan itu batas nyata dari metode ini.` },
      { judul: 'Uji halusinasi model bahasa besar',
        isi: `Minta model bahasa besar menyebutkan lima pustaka Python untuk tugas tertentu, lengkap dengan cara pemasangannya.

Lalu **periksa satu per satu** di PyPI.

Sering kali ada yang tidak pernah ada. Melakukan ini sekali membuatmu tidak akan pernah lagi menyalin nama pustaka tanpa memeriksanya.` },
      { judul: 'Tetapkan aturan pemakaianmu sendiri',
        isi: `Tulis di catatanmu apa yang boleh dan tidak:

- **boleh** — menjelaskan konsep, menyusun kerangka, memperbaiki tata bahasa, membuat data uji
- **verifikasi dulu** — kode, nama pustaka, rumus, angka
- **jangan** — menyalin sebagai tugas tanpa memahami, mengarang sumber

Dan **sebutkan** kalau kamu memakainya. Menyebutkan bukan kelemahan; tidak menyebutkan yang jadi masalah.` }
    ],
    cek: [
      'Stemmer-mu menghasilkan "sedia" dari "menyediakan", bukan "edia"',
      'Pengklasifikasimu diuji dengan data yang tidak dipakai melatih',
      'Kamu sudah menemukan sendiri sedikitnya satu nama pustaka yang dikarang model bahasa besar'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Slide **KB 7** membahas NLP dan slide **KB 8** membahas LLM. Keduanya digabung di sini karena LLM adalah kelanjutan langsung dari NLP.

**Apa itu NLP**

**Natural Language Processing** adalah bidang yang membuat komputer bisa **memahami, mengolah, dan menghasilkan bahasa manusia**.

Slide menyebut **NLP is everywhere**, dengan contoh yang kamu pakai sehari-hari: **penerjemah**, **klasifikasi berita**, **deteksi spam**, dan mesin pencari.

**Kenapa bahasa manusia sulit bagi komputer**

Ini akar seluruh kesulitannya:

- **Ambiguitas** — *"Saya melihat orang dengan teropong"*. Siapa yang memegang teropong?
- **Konteks** — arti *"bisa"* berbeda pada *"ular bisa"* dan *"saya bisa"*
- **Sinonim dan variasi** — *"mobil"*, *"kendaraan"*, *"mobilku"* saling berkaitan
- **Bahasa terus berubah** — kata baru muncul, arti kata bergeser

Bandingkan dengan bahasa pemrograman yang **dirancang tanpa ambiguitas**. Kompiler bisa menolak kode yang menyimpang satu karakter; NLP harus menerima bahasa yang berantakan sekalipun.

**Tahap pengolahan NLP klasik**

- **Tokenisasi** — memecah teks menjadi satuan kata
- **Case folding** — menyeragamkan huruf besar-kecil
- **Stopword removal** — membuang kata yang terlalu umum seperti *"yang"*, *"di"*, *"dan"*
- **Stemming / Lemmatisasi** — mengembalikan kata ke bentuk dasarnya
- **POS tagging** — menandai jenis kata
- **Representasi vektor** — mengubah kata menjadi angka

Tahap terakhir wajib, karena **komputer tidak bisa menghitung dengan kata**. Ini gagasan yang sama dengan representasi pengetahuan di topik pertama: **lebih mudah memanipulasi simbol daripada objeknya**.

**Dari Bag of Words ke Embedding**

- **Bag of Words** — teks diwakili jumlah kemunculan tiap kata. Sederhana, tetapi **urutan hilang sepenuhnya** dan kata yang mirip arti dianggap tak berhubungan.
- **TF-IDF** — memberi bobot lebih pada kata yang **khas** untuk sebuah dokumen.
- **Word Embedding** — tiap kata diwakili vektor padat, dan **kata yang mirip arti punya vektor yang berdekatan**.

Embedding adalah lompatan besar: model jadi tahu bahwa *"raja"* dan *"ratu"* berhubungan, tanpa ada yang memberitahunya.

**Large Language Model**

Slide KB 8 membedah namanya per kata, dan itu cara yang baik memahaminya:

- **"Large"** — jumlah **parameter** dan jumlah **data latih** yang sangat besar
- **"Language Model"** — model yang memperkirakan **kata berikutnya** dari kata-kata sebelumnya

Inti kerjanya sesederhana itu: **menebak kata berikutnya**. Diulang berkali-kali, hasilnya berupa kalimat, paragraf, bahkan program.

Yang mengubah segalanya adalah arsitektur **Transformer** dengan mekanisme **attention**, yang membuat model bisa **menimbang bagian mana dari kalimat yang paling relevan** untuk memperkirakan kata berikutnya.

**Keterbatasan yang wajib disadari**

- **Halusinasi** — LLM bisa menghasilkan pernyataan yang **terdengar meyakinkan tetapi salah**, lengkap dengan rujukan yang tidak pernah ada. Ini bukan kerusakan, melainkan **akibat langsung** dari cara kerjanya: ia menebak kata yang **paling mungkin**, bukan yang **paling benar**.
- **Tidak punya pemahaman** — ia mengenali pola statistik, bukan makna.
- **Batas pengetahuan** — hanya tahu sampai data latihnya.
- **Bias data** — mewarisi ketimpangan yang ada di data latihnya, seperti yang kamu pelajari di topik Etika PTI.

Karena itu, untuk hal yang bisa salah dan penting, **keluaran LLM harus diperiksa**, bukan dipercaya begitu saja.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa teks harus diubah jadi ANGKA\n\n# Komputer tidak bisa menghitung dengan kata:\n#   "kucing" - "anjing" = ???\n\n# Bag of Words: hitung kemunculan\n#   "saya suka kopi"  -> {saya:1, suka:1, kopi:1}\n#   URUTAN HILANG:\n#   "anjing gigit orang" dan "orang gigit anjing"\n#   -> vektornya SAMA PERSIS\n\n# Embedding: vektor padat, arti terbawa\n#   vektor("raja") - vektor("pria") + vektor("wanita")\n#   -> mendekati vektor("ratu")',
      penjelasan: `
Perhatikan keterbatasan **Bag of Words** yang ditunjukkan di komentar tengah. Kalimat *"anjing gigit orang"* dan *"orang gigit anjing"* memuat kata yang sama persis, sehingga vektornya **identik** — padahal artinya berlawanan, dan yang satu jauh lebih layak jadi berita.

Ini menunjukkan bahwa **urutan membawa makna**, dan setiap representasi yang membuangnya kehilangan sesuatu yang penting.

Keterbatasan kedua lebih halus: pada Bag of Words, **setiap kata sama sekali tidak berhubungan dengan kata lain**. Kata *"kucing"* dan *"anjing"* diperlakukan sejauh *"kucing"* dan *"kalkulus"*. Model tidak punya cara tahu bahwa dua yang pertama sama-sama hewan peliharaan.

**Embedding** menyelesaikan keduanya. Tiap kata diwakili vektor padat — biasanya beberapa ratus angka — dan vektor itu **dipelajari dari data**, bukan ditentukan manusia.

Hasilnya sering mengejutkan. Contoh terkenalnya adalah hubungan aritmetika seperti \`raja − pria + wanita ≈ ratu\`. Tidak ada yang mengajarkan hubungan itu; ia **muncul sendiri** dari pola pemakaian kata di jutaan kalimat.

Kenapa bisa? Karena kata yang **muncul di konteks serupa** cenderung punya arti serupa. Kata *"raja"* dan *"ratu"* sama-sama muncul dekat kata *"istana"*, *"memerintah"*, *"kerajaan"*. Model menangkap kemiripan itu sebagai kedekatan vektor.

Gagasan ini disebut *distributional hypothesis*: **arti sebuah kata tercermin dari kata-kata yang menemaninya.**

Dan dari sinilah jalan menuju LLM. Kalau kata bisa diwakili vektor yang membawa arti, maka **kalimat** bisa pula — dan model yang cukup besar bisa belajar memperkirakan kelanjutan sebuah kalimat dengan meyakinkan.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# NLP: dari teks mentah ke angka
# ============================================
import re
import math
from collections import Counter

DOKUMEN = [
    "Saya suka belajar pemrograman di kampus",
    "Kampus menyediakan kelas pemrograman yang bagus",
    "Saya tidak suka begadang mengerjakan tugas",
    "Tugas pemrograman itu menantang dan seru",
]

STOPWORD = {"yang", "di", "dan", "itu", "ke", "dari", "untuk", "pada"}

# ---------- 1. Tahap pengolahan ----------
def tokenisasi(teks):
    return re.findall(r"[a-z]+", teks.lower())     # sekaligus case folding

def buang_stopword(token):
    return [t for t in token if t not in STOPWORD]

def stemming_sederhana(token):
    """Pemenggalan imbuhan Indonesia yang disederhanakan.

    Menangani PELULUHAN: huruf awal kata dasar melebur ke awalan,
    dan harus dikembalikan. Ini yang membedakan stemming bahasa
    Indonesia dari bahasa Inggris yang cukup dipotong ujungnya.
        meny + s -> menyediakan  -> sedia
        meng + k -> mengerjakan  -> kerja
        mem  + p -> memakai      -> pakai
        men  + t -> menulis      -> tulis
    """
    # (awalan, huruf yang harus dikembalikan)
    AWALAN = [("meny", "s"), ("meng", "k"), ("mem", "p"), ("men", "t"),
              ("peny", "s"), ("peng", "k"), ("pem", "p"), ("pen", "t"),
              ("me", ""), ("ber", ""), ("per", ""), ("di", ""), ("ter", "")]
    AKHIRAN = ("kan", "an", "i", "nya")

    hasil = []
    for t in token:
        for awal, kembali in AWALAN:
            if t.startswith(awal) and len(t) - len(awal) >= 3:
                t = kembali + t[len(awal):]
                break
        for akhir in AKHIRAN:
            if t.endswith(akhir) and len(t) - len(akhir) >= 4:
                t = t[:-len(akhir)]
                break
        hasil.append(t)
    return hasil

print("--- tahap pengolahan teks ---")
contoh = DOKUMEN[1]
print("  mentah      :", contoh)
t = tokenisasi(contoh)
print("  tokenisasi  :", t)
t = buang_stopword(t)
print("  tanpa stop  :", t)
t = stemming_sederhana(t)
print("  stemming    :", t)


# ---------- 2. Bag of Words: urutan HILANG ----------
print("")
print("--- Bag of Words: urutan hilang ---")
a = "anjing gigit orang"
b = "orang gigit anjing"
print("  '" + a + "' ->", dict(Counter(tokenisasi(a))))
print("  '" + b + "' ->", dict(Counter(tokenisasi(b))))
print("  vektornya SAMA PERSIS, padahal artinya berlawanan.")


# ---------- 3. TF-IDF: menonjolkan kata yang KHAS ----------
def tf_idf(dokumen):
    olahan = [stemming_sederhana(buang_stopword(tokenisasi(d)))
              for d in dokumen]
    n = len(olahan)
    df = Counter()
    for tokens in olahan:
        for kata in set(tokens):
            df[kata] += 1

    hasil = []
    for tokens in olahan:
        tf = Counter(tokens)
        skor = {}
        for kata, jumlah in tf.items():
            idf = math.log(n / df[kata]) + 1
            skor[kata] = round(jumlah / len(tokens) * idf, 3)
        hasil.append(skor)
    return hasil

print("")
print("--- TF-IDF: kata khas dapat bobot lebih tinggi ---")
skor = tf_idf(DOKUMEN)
for i, s in enumerate(skor):
    tiga = sorted(s.items(), key=lambda x: -x[1])[:3]
    print("  dok " + str(i) + ": " +
          ", ".join(k + "=" + str(v) for k, v in tiga))

print("")
print("  Kata 'program' muncul di 3 dari 4 dokumen, jadi")
print("  bobotnya RENDAH -- ia tidak membedakan apa pun.")
print("  Kata yang cuma muncul sekali justru bobotnya tinggi.")


# ---------- 4. Kemiripan dokumen ----------
def kemiripan(a, b):
    """Cosine similarity antara dua kantong kata."""
    sama = set(a) & set(b)
    atas = sum(a[k] * b[k] for k in sama)
    bawah = math.sqrt(sum(v*v for v in a.values())) * \
            math.sqrt(sum(v*v for v in b.values()))
    return round(atas / bawah, 3) if bawah else 0.0

print("")
print("--- kemiripan antar dokumen ---")
for i in range(len(DOKUMEN)):
    for j in range(i + 1, len(DOKUMEN)):
        print("  dok " + str(i) + " vs dok " + str(j) + ": " +
              format(kemiripan(skor[i], skor[j]), ".3f"))


# ---------- 5. Language model sederhana: menebak kata berikutnya ----------
print("")
print("--- inti LLM: menebak kata BERIKUTNYA ---")

korpus = (" ".join(DOKUMEN) + " " +
          "saya suka pemrograman saya suka kampus " +
          "saya suka belajar saya suka kelas")
kata = tokenisasi(korpus)

# bigram: peluang kata berikutnya dari satu kata sebelumnya
berikut = {}
for i in range(len(kata) - 1):
    berikut.setdefault(kata[i], Counter())[kata[i + 1]] += 1

for awal in ["saya", "suka", "pemrograman"]:
    if awal in berikut:
        pilihan = berikut[awal].most_common(3)
        total = sum(berikut[awal].values())
        teks = ", ".join(k + " (" + format(v/total*100, ".0f") + "%)"
                         for k, v in pilihan)
        print("  setelah '" + awal + "' -> " + teks)

print("")
print("  Inilah yang dilakukan LLM, tapi dengan konteks")
print("  ribuan kata dan miliaran parameter, bukan satu kata.")
print("")
print("  Perhatikan: model ini memilih kata yang paling MUNGKIN,")
print("  bukan yang paling BENAR. Itulah asal halusinasi --")
print("  bukan kerusakan, melainkan akibat langsung cara kerjanya.")`
  },

  output: `--- tahap pengolahan teks ---
  mentah      : Kampus menyediakan kelas pemrograman yang bagus
  tokenisasi  : ['kampus', 'menyediakan', 'kelas', 'pemrograman', 'yang', 'bagus']
  tanpa stop  : ['kampus', 'menyediakan', 'kelas', 'pemrograman', 'bagus']
  stemming    : ['kampus', 'sedia', 'kelas', 'program', 'bagus']

--- Bag of Words: urutan hilang ---
  'anjing gigit orang' -> {'anjing': 1, 'gigit': 1, 'orang': 1}
  'orang gigit anjing' -> {'orang': 1, 'gigit': 1, 'anjing': 1}
  vektornya SAMA PERSIS, padahal artinya berlawanan.

--- TF-IDF: kata khas dapat bobot lebih tinggi ---
  dok 0: belajar=0.477, saya=0.339, suka=0.339
  dok 1: sedia=0.477, kelas=0.477, bagus=0.477
  dok 2: tidak=0.398, begadang=0.398, kerja=0.398
  dok 3: tantang=0.597, seru=0.597, tugas=0.423

--- kemiripan antar dokumen ---
  dok 0 vs dok 1: 0.244
  dok 0 vs dok 2: 0.283
  dok 0 vs dok 3: 0.104
  dok 1 vs dok 2: 0.000
  dok 1 vs dok 3: 0.090
  dok 2 vs dok 3: 0.142

--- inti LLM: menebak kata BERIKUTNYA ---
  setelah 'saya' -> suka (83%), tidak (17%)
  setelah 'suka' -> belajar (33%), begadang (17%), pemrograman (17%)
  setelah 'pemrograman' -> di (25%), yang (25%), itu (25%)

  Inilah yang dilakukan LLM, tapi dengan konteks
  ribuan kata dan miliaran parameter, bukan satu kata.

  Perhatikan: model ini memilih kata yang paling MUNGKIN,
  bukan yang paling BENAR. Itulah asal halusinasi --
  bukan kerusakan, melainkan akibat langsung cara kerjanya.`,

  kesalahanUmum: [
    {
      salah: 'Mengira halusinasi LLM adalah kerusakan yang bisa diperbaiki sepenuhnya.',
      kenapa: 'Halusinasi adalah akibat langsung dari cara kerjanya: model memilih kata yang paling mungkin secara statistik, bukan yang paling benar secara fakta. Ia tidak punya mekanisme untuk membedakan keduanya, sehingga pernyataan salah yang terdengar wajar justru mendapat peluang tinggi.',
      benar: 'Perlakukan sebagai sifat bawaan yang harus dikelola, bukan bug. Periksa keluarannya untuk hal yang penting, dan minta rujukan yang bisa ditelusuri.'
    },
    {
      salah: 'Memakai Bag of Words untuk tugas yang maknanya bergantung pada urutan kata.',
      kenapa: 'Bag of Words membuang urutan sepenuhnya, sehingga anjing gigit orang dan orang gigit anjing menghasilkan vektor yang sama persis. Untuk analisis sentimen atau ekstraksi hubungan, kehilangan ini fatal karena justru urutan yang membawa maknanya.',
      benar: 'Pakai representasi yang mempertahankan urutan, misalnya n-gram, atau model berbasis embedding dan transformer.'
    },
    {
      salah: 'Melewatkan tahap pembersihan teks dan langsung menghitung kata mentah.',
      kenapa: 'Tanpa case folding, kata Kampus dan kampus dihitung sebagai dua kata berbeda. Tanpa stopword removal, kata seperti yang dan di mendominasi hitungan padahal tidak membedakan apa pun. Tanpa stemming, bentuk berbeda dari kata yang sama tidak pernah dikenali berhubungan.',
      benar: 'Jalankan tahapannya berurutan sesuai kebutuhan tugasnya. Untuk sebagian tugas, stopword justru perlu dipertahankan karena membawa makna.'
    },
    {
      salah: 'Menganggap LLM memahami arti kalimat seperti manusia.',
      kenapa: 'LLM mengenali pola statistik dari data latihnya, bukan makna. Ia bisa menghasilkan kalimat yang benar secara tata bahasa dan meyakinkan secara isi, tanpa punya model tentang dunia yang bisa diperiksa. Menganggapnya memahami membuat orang terlalu memercayai keluarannya.',
      benar: 'Pahami cara kerjanya sebagai perkiraan kata berikutnya dalam skala besar. Kemampuannya nyata, tetapi asalnya berbeda dari pemahaman manusia.'
    }
  ],

  analogi: `Bayangkan seorang penerjemah yang **tidak pernah belajar bahasa asing**, tetapi sudah membaca sepuluh juta halaman terjemahan.

Dia tidak tahu arti satu kata pun. Yang dia tahu: **pola**. Kalau kalimat sumbernya begini, terjemahan yang biasanya muncul begitu.

Anehnya, dia **sangat sering benar**. Bahkan lebih lancar daripada penerjemah pemula yang benar-benar belajar tata bahasanya.

Itulah **LLM**.

Sekarang perhatikan kapan dia gagal. Kamu bertanya soal sesuatu yang **jarang muncul** di sepuluh juta halaman itu — misalnya nama peraturan daerah yang spesifik. Dia tidak akan bilang *"saya tidak tahu"*, karena kalimat itu jarang muncul sebagai jawaban di bacaannya.

Yang dia lakukan: **menyusun jawaban yang bentuknya paling mirip jawaban benar.** Nomor peraturan yang formatnya masuk akal, tahun yang wajar, judul yang terdengar resmi. Semuanya **karangan** — tetapi karangan yang tampilannya sempurna.

Itulah **halusinasi**, dan perhatikan bahwa ia **bukan kerusakan**. Dia melakukan persis tugasnya: menghasilkan lanjutan yang paling mungkin. Kebenaran tidak pernah masuk hitungan, karena dia memang tidak punya alat untuk mengukurnya.

Untuk **tahap pengolahan NLP**, bayangkan menyiapkan bahan sebelum memasak: **tokenisasi** memotong, **case folding** menyeragamkan, **stopword removal** membuang bagian yang tidak berasa, **stemming** mengupas kulitnya sampai ke isinya.

Dan **embedding**? Itu menyadari bahwa bahan-bahan itu punya **kedekatan rasa**. Bawang merah dan bawang putih lebih dekat satu sama lain daripada dengan gula — dan kamu tahu itu bukan karena ada yang memberitahumu, melainkan karena keduanya **selalu muncul di resep yang mirip**.`,

  latihan: [
    'Sebutkan empat alasan kenapa bahasa manusia sulit diolah komputer, dan beri satu contoh kalimat ambigu dalam bahasa Indonesia.',
    'Sebutkan tahap pengolahan NLP klasik secara berurutan, dan jelaskan apa yang hilang kalau salah satunya dilewatkan.',
    'Jelaskan keterbatasan Bag of Words dengan contoh dua kalimat yang vektornya sama tetapi artinya berlawanan.',
    'Jelaskan apa itu word embedding dan kenapa hubungan seperti raja dikurangi pria ditambah wanita mendekati ratu bisa muncul sendiri dari data.',
    'Bedah nama Large Language Model per kata sesuai slide, dan jelaskan apa inti pekerjaan yang dilakukannya.',
    'Jelaskan kenapa halusinasi LLM merupakan akibat langsung dari cara kerjanya, bukan kerusakan. Sebutkan dua langkah praktis untuk mengurangi risikonya.'
  ]
});
