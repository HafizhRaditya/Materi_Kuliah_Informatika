/* ============================================================
   web-desain.js — materi Web Desain (Semester 2)

   Disusun dari proyek kuliah sendiri: "BitByteBros studyy",
   sebuah situs forum belajar informatika bertema pixel art Mario.
   Berkasnya ada di E:\Tugas Kuliah\Semester Dua\Web Desain\,
   dengan beberapa versi bertahap sampai "(100% Fix)".

   Yang benar-benar dipakai di proyek itu, dan karena itu jadi
   tulang punggung materi ini:
     - HTML  : struktur semantik, nav, section, atribut data-*
     - CSS   : flexbox (84 kemunculan), transition, :hover,
               position, dan 5 blok @media
     - JS    : querySelectorAll, addEventListener, classList,
               getAttribute, closest, DOMContentLoaded

   Grid hanya muncul 3 kali di CSS proyeknya, jadi flexbox yang
   ditekankan — sesuai porsi sesungguhnya.

   Topik di sini memakai `judulLogicSyntax` menjadi
   "Bedah Markup" atau "Bedah Kode" sesuai isinya.
   ============================================================ */

TOPICS.push({
  id: 'web-html-struktur',
  judul: 'HTML Semantik & Struktur Dokumen',
  kategori: 'web-desain',
  tag: ['HTML', 'semantik', 'nav', 'section', 'aksesibilitas', 'atribut'],
  ringkas: 'Memilih tag berdasarkan arti, bukan berdasarkan tampilan bawaannya.',

  fungsi: `**Menyusun halaman dengan tag yang menyatakan MAKNA, bukan sekadar tampilan.**

Terpakai di:

- **Aksesibilitas** — pembaca layar menavigasi lewat heading dan landmark
- **SEO** — mesin pencari memahami struktur halamanmu
- **Kode yang bisa dipelihara** — \`<nav>\` jauh lebih jelas daripada \`<div class="nav">\`
- **Formulir yang benar** — label yang tertaut membuat area kliknya lebih besar
- **Pemrograman Web** — struktur yang rapi membuat penulisan CSS jauh lebih mudah

Yang paling sering salah dan paling merugikan: **memakai div untuk segalanya**.

Ia bekerja secara tampilan, dan sama sekali tidak membantu pengguna pembaca layar — yang tidak punya cara melompat ke bagian utama halaman.`,

  praktik: {
    tujuan: `Kamu punya satu halaman dengan struktur semantik yang benar, formulir yang bisa diakses, dan sudah lolos pemeriksa aksesibilitas.`,
    alat: [
      'Editor teks',
      'Peramban dengan Developer Tools',
      'Validator W3C di validator.w3.org',
      'Ekstensi axe DevTools atau Lighthouse'
    ],
    langkah: [
      { judul: 'Rangka halaman dengan landmark',
        isi: `Pakai \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<aside>\`, dan \`<footer>\`.

Aturan penting: **hanya boleh ada satu \`<main>\`** per halaman, dan ia memuat isi utamanya.

Pembaca layar memakai landmark ini untuk melompat langsung — tanpa itu, pengguna harus mendengarkan seluruh menu setiap kali berpindah halaman.` },
      { judul: 'Susun heading berjenjang tanpa melompat',
        isi: `Satu \`<h1>\` per halaman, lalu \`<h2>\`, \`<h3>\` berurutan.

**Jangan melompat** dari \`<h2>\` langsung ke \`<h4>\` hanya karena ukurannya terlihat pas. Ukuran diatur CSS; tingkat heading menyatakan struktur.

Periksa dengan ekstensi peramban yang menampilkan garis besar heading.` },
      { judul: 'Buat formulir yang bisa diakses',
        isi: `Setiap \`<input>\` butuh \`<label for="id">\` yang tertaut.

Manfaatnya dua: pembaca layar menyebutkan labelnya, **dan** mengklik label memindahkan fokus ke kolomnya — area kliknya jadi jauh lebih besar, terutama di ponsel.

Placeholder **bukan** pengganti label; ia hilang begitu pengguna mulai mengetik.` },
      { judul: 'Beri teks alternatif yang berarti',
        isi: `\`alt\` harus menjelaskan **fungsi** gambarnya, bukan sekadar namanya.

- gambar hias → \`alt=""\` supaya dilewati pembaca layar
- gambar bermakna → jelaskan apa yang penting darinya
- gambar dalam tautan → jelaskan **ke mana** tautannya

\`alt="gambar1.jpg"\` lebih buruk daripada tidak ada sama sekali.` },
      { judul: 'Validasi HTML-mu',
        isi: `Unggah halamanmu ke **validator.w3.org** atau tempel kodenya.

Perbaiki semua galat. Tag yang tidak ditutup dan atribut yang salah sering menyebabkan perilaku aneh yang sulit dilacak — dan validator menemukannya dalam hitungan detik.` },
      { judul: 'Uji dengan keyboard saja',
        isi: `Cabut tetikusmu, lalu jelajahi halamanmu hanya dengan \`Tab\`, \`Shift+Tab\`, dan \`Enter\`.

Periksa: apakah semua tautan dan tombol bisa dicapai? Apakah **terlihat** mana yang sedang difokus?

Kalau kamu tersesat, pengguna yang hanya bisa memakai keyboard juga akan tersesat.` },
      { judul: 'Jalankan pemeriksa otomatis',
        isi: `Buka Developer Tools, tab **Lighthouse**, lalu jalankan pemeriksaan Accessibility.

Ia memberi skor dan daftar masalah beserta cara memperbaikinya.

Perlu diingat: alat otomatis hanya menangkap sekitar sepertiga masalah aksesibilitas. Uji keyboard di langkah sebelumnya tetap wajib.` }
    ],
    cek: [
      'Halamanmu lolos validator W3C tanpa galat',
      'Seluruh halaman bisa dijelajahi hanya dengan keyboard, dan fokusnya selalu terlihat',
      'Skor Accessibility di Lighthouse di atas 90'
    ]
  },
  judulLogicSyntax: 'Bedah Markup — kenapa ditulis begitu',

  konsep: `
**HTML menjawab satu pertanyaan: apa isi halaman ini?** Bukan bagaimana tampilannya — itu urusan CSS.

Pembedaan ini terdengar sepele tetapi menentukan mutu seluruh situs.

**Kerangka dokumen**

- **\`<!DOCTYPE html>\`** — memberi tahu peramban ini HTML5. **Wajib** dan harus di baris paling atas. Tanpanya peramban masuk ke *quirks mode*, meniru perilaku peramban tahun 90-an, dan tata letakmu bisa berantakan tanpa sebab yang jelas.
- **\`<html lang="id">\`** — akar dokumen. Atribut \`lang\` penting untuk pembaca layar dan mesin penerjemah.
- **\`<head>\`** — keterangan tentang halaman: judul, encoding, tautan ke CSS. **Tidak tampil** di layar.
- **\`<body>\`** — isi yang terlihat.

Dua baris di \`<head>\` yang selalu perlu:

- **\`<meta charset="UTF-8">\`** — supaya huruf beraksen dan simbol tampil benar. Tanpanya, "Ekonomi" bisa berubah jadi karakter aneh.
- **\`<meta name="viewport" content="width=device-width, initial-scale=1">\`** — **wajib untuk tampilan ponsel**. Tanpanya, ponsel menganggap halamanmu selebar desktop lalu mengecilkannya, sehingga tulisannya jadi sangat kecil. Seluruh media query-mu tidak akan berpengaruh.

**Tag semantik**

HTML5 menyediakan tag yang menyatakan **peran**, bukan sekadar kotak:

- **\`<header>\`** — bagian atas halaman atau bagian
- **\`<nav>\`** — kumpulan tautan navigasi
- **\`<main>\`** — isi utama. **Hanya boleh satu** per halaman.
- **\`<section>\`** — bagian bertema, biasanya punya judul
- **\`<article>\`** — isi yang berdiri sendiri dan tetap bermakna kalau dipisah
- **\`<aside>\`** — isi sampingan
- **\`<footer>\`** — bagian bawah

Bandingkan dengan menulis \`<div class="header">\`. Bagi peramban, \`<div>\` **tidak berarti apa-apa** — ia kotak kosong tanpa makna. Bagi pembaca layar, \`<nav>\` bisa dilompati langsung; \`<div class="nav">\` tidak.

**Kenapa semantik penting?**

- **Aksesibilitas** — pembaca layar memakai struktur ini untuk menavigasi. Pengguna tunanetra bisa melompat antar-judul dan antar-landmark, dan itu hanya bekerja kalau tag-nya benar.
- **Mesin pencari** memahami mana isi utama dan mana pelengkap.
- **Perawatan** — kode yang tag-nya bermakna jauh lebih mudah dibaca daripada lautan \`<div>\`.

**Judul harus bertingkat rapi**

\`<h1>\` sampai \`<h6>\` menyatakan **tingkatan**, bukan ukuran. Aturannya: **jangan melompati tingkat.** Setelah \`<h1>\` boleh \`<h2>\`, tetapi jangan langsung \`<h4>\` hanya karena ukurannya kebetulan pas.

Satu halaman sebaiknya punya **satu \`<h1>\`** yang menyatakan topik utamanya.

**Atribut penting**

- **\`class\`** — boleh dipakai banyak elemen, penanda untuk CSS
- **\`id\`** — **harus unik** dalam satu halaman, penanda untuk JavaScript dan tautan dalam
- **\`alt\`** pada gambar — teks pengganti kalau gambarnya gagal dimuat, dan yang dibacakan pembaca layar. **Wajib ada.**
- **\`data-*\`** — atribut buatan sendiri untuk menyimpan data. Dipakai di proyek BitByteBros lewat \`data-matkul\`, lalu dibaca JavaScript.
`,

  logicSyntax: [
    {
      bahasa: 'html',
      kode: '<!-- Dari proyek BitByteBros: navigasi semantik -->\n<header>\n  <nav class="navbar-mario">\n    <div class="navbar-left">\n      <img src="logo.png" alt="Mario Logo" class="pixel-logo" />\n      <div class="brand-title">ByteBross Study</div>\n    </div>\n    <div class="navbar-center">\n      <a href="index.html" class="nav-link" aria-current="page">Home</a>\n      <a href="kelas.html" class="nav-link">Kelas Online</a>\n    </div>\n  </nav>\n</header>',
      penjelasan: `
Ini potongan dari proyekmu sendiri, dan beberapa pilihannya sudah benar.

**\`<header>\`** dan **\`<nav>\`** dipakai alih-alih \`<div>\`. Bedanya bukan tampilan — keduanya sama-sama tampil sebagai blok — melainkan **arti**. Pembaca layar mengenali \`<nav>\` sebagai landmark navigasi, dan penggunanya bisa melompat langsung ke situ atau melewatinya. Dengan \`<div class="nav">\`, kemampuan itu hilang sepenuhnya.

**\`alt="Mario Logo\"\`** pada gambar juga sudah benar. Atribut ini dibacakan pembaca layar dan tampil kalau gambarnya gagal dimuat. Aturannya: kalau gambarnya **bermakna**, tulis apa maknanya; kalau cuma hiasan, tulis \`alt=""\` kosong supaya pembaca layar melewatinya. Yang **salah** adalah menghilangkannya sama sekali — pembaca layar lalu membacakan nama berkasnya, dan pengguna mendengar *"logo-png-seeklogo-247880"*.

**\`aria-current="page"\`** menandai tautan mana yang sedang aktif. Ini bagus dan sering terlewat — tanpa itu, pengguna pembaca layar tidak tahu ia sedang di halaman mana.

Yang bisa diperbaiki: **\`<nav>\` sebaiknya berisi \`<ul>\` dan \`<li>\`**, bukan \`<a>\` yang berjajar langsung. Alasannya, daftar tautan memang sebuah **daftar**, dan pembaca layar akan mengumumkan *"navigasi, daftar dengan 4 item"* — memberi tahu penggunanya berapa banyak pilihan sebelum ia mulai menelusuri.

Perhatikan juga \`<div class="brand-title">\`. Di sini \`<div>\` memang tepat, karena bagian itu murni pembungkus untuk keperluan tata letak dan tidak punya arti khusus. **\`<div>\` tidak dilarang** — ia cuma tidak boleh dipakai menggantikan tag yang punya arti.
`
    },
    {
      bahasa: 'html',
      kode: '<!-- SALAH: tag dipilih berdasar TAMPILAN -->\n<h1>Judul Besar</h1>\n<h4>Ini sebenarnya subjudul, tapi h4 ukurannya pas</h4>\n<div class="navigasi">...</div>\n<b>penting</b>\n\n<!-- BENAR: tag dipilih berdasar ARTI -->\n<h1>Judul Besar</h1>\n<h2 class="kecil">Subjudul</h2>\n<nav>...</nav>\n<strong>penting</strong>',
      penjelasan: `
Perbandingan ini merangkum seluruh gagasan HTML semantik.

**Melompati tingkat judul** adalah kesalahan yang paling sering terjadi, dan alasannya selalu sama: *"h4 ukurannya kebetulan pas"*. Padahal ukuran itu cuma **tampilan bawaan** yang bisa diubah CSS dalam satu baris.

Akibatnya nyata bagi pengguna pembaca layar. Mereka menavigasi halaman lewat **daftar judul**, seperti daftar isi. Melompat dari h1 ke h4 membuat daftar isi itu terlihat bolong — seolah ada dua tingkat bagian yang hilang.

Aturannya: **pilih tingkat sesuai kedudukannya, atur ukurannya lewat CSS.**

**\`<b>\` dan \`<strong>\`** terlihat sama persis di layar, keduanya tebal. Bedanya arti:

- **\`<b>\`** — sekadar tebal, tanpa makna tambahan
- **\`<strong>\`** — **penting**. Pembaca layar mengucapkannya dengan penekanan.

Pasangan serupa: **\`<i>\`** hanya miring, sedangkan **\`<em>\`** berarti **penekanan**.

Aturan praktisnya: kalau kamu ingin sesuatu **terlihat** tebal, itu urusan CSS. Kalau sesuatu memang **penting**, pakai \`<strong>\`.

Yang paling merugikan adalah **\`<div class="navigasi">\`**. Kelas CSS **tidak berarti apa-apa** bagi peramban maupun pembaca layar — ia sekadar tulisan untuk keperluanmu sendiri. Menulis \`class="navigasi"\` tidak membuat elemen itu menjadi navigasi; ia tetap kotak kosong tanpa makna.

Uji sederhana yang bisa kamu pakai: **matikan seluruh CSS, lalu baca halamanmu.** Kalau strukturnya masih masuk akal dan urutannya masih terbaca, HTML-mu semantik. Kalau berubah jadi tumpukan teks tanpa bentuk, berarti maknanya selama ini cuma berasal dari CSS.
`
    }
  ],

  kode: {
    html: String.raw`<!DOCTYPE html>
<html lang="id">
<head>
  <!-- WAJIB: tanpa charset, huruf beraksen jadi karakter aneh -->
  <meta charset="UTF-8" />

  <!-- WAJIB untuk ponsel. Tanpa ini, media query TIDAK berpengaruh -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>ByteBross Study - Home</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

  <header>
    <nav aria-label="Navigasi utama">
      <img src="logo.png" alt="Logo ByteBross Study" />
      <!-- Daftar tautan memang sebuah DAFTAR -->
      <ul>
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="kelas.html">Kelas Online</a></li>
        <li><a href="bank.html">Bank Materi</a></li>
        <li><a href="kontak.html">Kontak Tentor</a></li>
      </ul>
    </nav>
  </header>

  <!-- Hanya boleh SATU main per halaman -->
  <main>
    <!-- h1 hanya satu, menyatakan topik utama halaman -->
    <h1>Selamat Datang di ByteBross Study</h1>

    <section aria-labelledby="judul-tentang">
      <h2 id="judul-tentang">Tentang Kami</h2>
      <p>
        Forum belajar Informatika dengan
        <strong>materi yang disusun bertahap</strong>.
      </p>
    </section>

    <section aria-labelledby="judul-matkul">
      <h2 id="judul-matkul">Mata Kuliah</h2>

      <!-- data-* : atribut buatan sendiri, dibaca JavaScript -->
      <ul class="matkul-list">
        <li class="matkul-item" data-matkul="web">Web Desain</li>
        <li class="matkul-item" data-matkul="struktur">Struktur Data</li>
        <li class="matkul-item" data-matkul="sistem">Sistem Operasi</li>
      </ul>
      <p class="matkul-desc" id="desc-web"></p>
    </section>

    <!-- article: berdiri sendiri, tetap bermakna kalau dipisah -->
    <article>
      <h2>Tips Belajar Struktur Data</h2>
      <p>Gambar dulu di kertas sebelum menulis kode.</p>
      <footer>Ditulis oleh Hafizh, 2025</footer>
    </article>
  </main>

  <aside>
    <h2>Pengumuman</h2>
    <p>Kelas tambahan setiap Sabtu.</p>
  </aside>

  <footer>
    <p>&copy; 2025 ByteBross Study</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>`,

    css: String.raw`/* Ukuran adalah urusan CSS, BUKAN alasan memilih tag.
   Tingkat judul dipilih dari kedudukannya, lalu diatur di sini. */

h1 { font-size: 32px; }
h2 { font-size: 20px; }          /* boleh dibuat kecil */

/* h2 di dalam article boleh tampil lebih kecil lagi,
   tanpa perlu mengubah tag-nya jadi h4 */
article h2 { font-size: 16px; }

/* Tag semantik tidak punya tampilan khusus -- kamu yang mengatur */
nav ul {
  display: flex;
  gap: 16px;
  list-style: none;              /* buang bulatan daftar */
  padding: 0;
}

/* Tautan halaman aktif ditandai dari atribut, bukan kelas tambahan */
nav a[aria-current="page"] {
  font-weight: bold;
  text-decoration: underline;
}`
  },

  output: `Yang dilihat pembaca layar dari struktur di atas:

  landmark: banner (header)
  landmark: navigasi utama
     daftar, 4 item
       tautan Home (halaman saat ini)
       tautan Kelas Online
       tautan Bank Materi
       tautan Kontak Tentor
  landmark: konten utama (main)
     judul tingkat 1: Selamat Datang di ByteBross Study
     judul tingkat 2: Tentang Kami
     judul tingkat 2: Mata Kuliah
     judul tingkat 2: Tips Belajar Struktur Data
  landmark: pelengkap (aside)
     judul tingkat 2: Pengumuman
  landmark: informasi konten (footer)

Kalau semua tag semantik diganti <div>, seluruh daftar
di atas menjadi KOSONG -- tidak ada landmark, tidak ada
daftar judul, dan pengguna harus menelusuri satu per satu
dari atas sampai bawah.`,

  kesalahanUmum: [
    {
      salah: 'Memilih tingkat judul berdasarkan ukuran tampilannya, misalnya memakai h4 karena ukurannya pas.',
      kenapa: 'Tingkat judul menyatakan kedudukan dalam struktur, bukan ukuran. Pengguna pembaca layar menavigasi lewat daftar judul seperti daftar isi, sehingga melompat dari h1 ke h4 membuat daftar itu terlihat bolong seolah ada dua tingkat yang hilang.',
      benar: 'Pilih tingkat sesuai kedudukannya, lalu atur ukurannya lewat CSS. Mengubah ukuran h2 cuma satu baris.'
    },
    {
      salah: 'Melupakan meta viewport di bagian head.',
      kenapa: 'Tanpa baris itu, ponsel menganggap halamanmu selebar desktop lalu mengecilkan seluruhnya, sehingga tulisannya sangat kecil. Yang lebih membingungkan, seluruh media query yang sudah kamu tulis menjadi tidak berpengaruh sama sekali, sehingga orang mengira CSS responsifnya yang salah.',
      benar: 'Selalu sertakan meta viewport dengan width=device-width dan initial-scale=1 sebelum menulis media query apa pun.'
    },
    {
      salah: 'Memakai div dengan nama kelas bermakna, seperti div class="navigasi", alih-alih tag semantik.',
      kenapa: 'Nama kelas tidak berarti apa-apa bagi peramban maupun pembaca layar; ia sekadar tulisan untuk keperluanmu sendiri. Elemen itu tetap kotak kosong tanpa makna, sehingga pengguna pembaca layar kehilangan kemampuan melompat langsung ke navigasi.',
      benar: 'Pakai tag yang memang bermakna seperti nav, main, header, dan footer. Sisakan div untuk pembungkus yang murni keperluan tata letak.'
    },
    {
      salah: 'Menghilangkan atribut alt pada gambar.',
      kenapa: 'Pembaca layar lalu membacakan nama berkasnya, sehingga pengguna mendengar rangkaian tak bermakna seperti logo-png-seeklogo-247880. Selain itu tidak ada penjelasan apa pun kalau gambarnya gagal dimuat.',
      benar: 'Tulis alt yang menjelaskan makna gambarnya. Kalau gambarnya murni hiasan, tulis alt kosong supaya pembaca layar melewatinya, bukan menghilangkan atributnya.'
    },
    {
      salah: 'Memakai b dan i untuk menandai sesuatu yang penting atau ditekankan.',
      kenapa: 'Keduanya hanya mengubah tampilan tanpa menyatakan makna, sehingga pembaca layar mengucapkannya datar seperti teks biasa. Penekanan yang kamu maksud tidak sampai ke pengguna yang mendengarkan.',
      benar: 'Pakai strong untuk penting dan em untuk penekanan. Kalau yang kamu inginkan cuma tampilan tebal atau miring, atur lewat CSS.'
    }
  ],

  analogi: `Bayangkan kamu menyusun sebuah buku.

**HTML** adalah **naskahnya** — mana judul bab, mana paragraf, mana catatan kaki. **CSS** adalah **penata letaknya** — memilih jenis huruf, ukuran, dan warna.

Sekarang bayangkan penulis yang menandai bab bukan dengan menulis *"BAB 3"*, melainkan sekadar **mengetiknya dengan huruf besar dan tebal**. Di halaman cetak, hasilnya terlihat sama persis.

Tetapi coba minta **daftar isi otomatis**. Tidak ada. Mesin tidak bisa tahu mana yang bab, karena penulisnya cuma mengatur tampilan, bukan menyatakan kedudukan.

Itulah bedanya \`<h2>\` dengan \`<div class="besar-tebal">\`.

Sekarang bayangkan **seseorang membacakan buku itu untuk temannya yang tunanetra**. Pembaca bisa bilang *"sekarang bab tiga"*, atau *"ini daftar berisi empat pilihan"*, atau *"ini catatan pinggir, boleh dilewati"* — **hanya kalau naskahnya menandai hal-hal itu**.

Kalau seluruh naskah cuma bertuliskan "kotak, kotak, kotak", pembacanya tidak punya apa-apa untuk disampaikan selain kata demi kata dari atas sampai bawah. Tidak bisa melompat, tidak bisa memilih.

Itulah yang terjadi pada situs yang seluruhnya \`<div>\`.

Dan **uji paling jujur**: **cabut penata letaknya.** Matikan seluruh CSS lalu baca halamanmu. Kalau masih terbaca berurutan dan strukturnya masuk akal, naskahmu bagus. Kalau berubah jadi tumpukan teks tanpa bentuk, berarti selama ini yang memberi makna cuma tampilannya — dan itu hilang bagi siapa pun yang tidak melihatnya.`,

  latihan: [
    'Tuliskan kerangka HTML5 lengkap dengan doctype, lang, charset, dan viewport. Jelaskan akibat kalau masing-masing dihilangkan.',
    'Ubah potongan berikut menjadi semantik: div class="header", div class="menu", div class="isi", div class="footer".',
    'Jelaskan perbedaan b dengan strong dan i dengan em. Berikan satu contoh kalimat yang memakai masing-masing dengan tepat.',
    'Susun struktur judul untuk halaman berisi satu topik utama, tiga bagian, dan dua sub-bagian di bagian kedua. Jelaskan kenapa tingkatnya tidak boleh melompat.',
    'Ambil salah satu halaman dari proyekmu, matikan seluruh CSS-nya, lalu baca hasilnya. Catat bagian mana yang jadi tidak jelas, dan tag apa yang bisa memperbaikinya.',
    'Jelaskan fungsi atribut data-* dan tunjukkan bagaimana data-matkul dipakai di proyek BitByteBros untuk menghubungkan HTML dengan JavaScript.'
  ]
});

TOPICS.push({
  id: 'web-css-dasar',
  judul: 'CSS — Selector, Spesifisitas & Box Model',
  kategori: 'web-desain',
  tag: ['CSS', 'selector', 'spesifisitas', 'box model', 'cascade', 'box-sizing'],
  ringkas: 'Kenapa aturan CSS-mu kadang diabaikan, dan kenapa lebar 300px sering bukan 300px.',

  fungsi: `**Mengatur tampilan halaman, dan memahami kenapa aturanmu kadang tidak berlaku.**

Terpakai di:

- **Setiap halaman web** yang pernah kamu buat
- **Menelusuri gaya yang tidak berlaku** — hampir selalu soal spesifisitas
- **Mengatur ukuran** — box model menjelaskan kenapa lebarnya tidak sesuai yang kamu tulis
- **Sistem desain** — variabel CSS membuat tema bisa diganti sekaligus

Dua penyebab kebingungan terbesar, dan keduanya bisa diselesaikan sekali:

- **Spesifisitas** — kenapa aturanmu kalah dari aturan lain
- **Box model** — kenapa kotak berlebar 300 piksel ternyata memakan 340 piksel

Yang kedua punya perbaikan satu baris yang layak dipakai di setiap proyek: \`box-sizing: border-box\`.`,

  praktik: {
    tujuan: `Kamu bisa menelusuri kenapa sebuah gaya tidak berlaku, dan mengatur ukuran elemen dengan hasil yang bisa diramalkan.`,
    alat: [
      'Editor teks',
      'Peramban dengan Developer Tools'
    ],
    langkah: [
      { judul: 'Buktikan masalah box model',
        isi: `Buat kotak dengan \`width: 300px; padding: 20px; border: 5px solid\`.

Ukur di Developer Tools. Lebarnya **350 piksel**, bukan 300 — karena bawaannya \`content-box\`, dan padding serta border ditambahkan di luar lebar itu.

Ini penyebab tata letak yang meleset yang paling sering terjadi.` },
      { judul: 'Perbaiki dengan satu aturan global',
        isi: `Tambahkan di paling atas berkas CSS-mu:

- \`*, *::before, *::after { box-sizing: border-box; }\`

Sekarang \`width: 300px\` berarti **total 300 piksel**, sudah termasuk padding dan border.

Hampir semua proyek modern memakai ini. Pasang sekali dan lupakan.` },
      { judul: 'Hitung spesifisitas saat gayamu kalah',
        isi: `Urutannya, dari yang paling kuat:

- gaya sebaris pada atribut \`style\`
- id, misalnya \`#judul\`
- kelas, atribut, dan pseudo-class
- nama tag

Selector yang lebih spesifik **menang**, tidak peduli urutannya di berkas. Aturan yang sama spesifik, yang belakangan menang.` },
      { judul: 'Lihat sendiri di Developer Tools',
        isi: `Klik kanan sebuah elemen, pilih **Inspect**, lalu lihat panel Styles.

Aturan yang **dicoret** adalah yang kalah. Panel itu juga menunjukkan **dari berkas dan baris mana** aturan yang menang berasal.

Ini menyelesaikan pertanyaan "kenapa CSS-ku tidak berlaku" dalam hitungan detik, dan jauh lebih cepat daripada menambah tanda seru penting.` },
      { judul: 'Hindari tanda penting',
        isi: `\`!important\` mengalahkan segalanya, dan itulah masalahnya — ia hanya bisa dikalahkan oleh \`!important\` lain.

Setelah beberapa bulan, berkas CSS-mu penuh dengan itu dan tidak ada yang bisa diubah lagi.

Kalau kamu merasa membutuhkannya, hampir selalu jawabannya adalah **memperbaiki spesifisitas selector-mu**.` },
      { judul: 'Pakai variabel CSS',
        isi: `- \`:root { --warna-utama: #1e40af; }\`
- lalu \`color: var(--warna-utama);\`

Mengganti satu nilai mengubah seluruh halaman. Ini juga yang membuat tema terang dan gelap bisa ditukar tanpa menulis ulang apa pun.

Coba buat toggle tema di halamanmu sendiri dengan mengubah variabel pada \`:root\`.` }
    ],
    cek: [
      'Setelah border-box, lebar yang tertulis sama dengan lebar yang terukur',
      'Kamu bisa menemukan sumber aturan yang menang lewat panel Styles',
      'Tema halamanmu bisa diganti hanya dengan mengubah variabel di :root'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
**CSS** menentukan tampilan. Bentuk aturannya selalu sama:

\`selector { properti: nilai; }\`

**Selector — memilih elemen mana**

- **\`p\`** — semua tag \`<p>\`
- **\`.kartu\`** — semua elemen ber-\`class="kartu"\`
- **\`#judul\`** — elemen ber-\`id="judul"\`. Hanya satu per halaman.
- **\`nav a\`** — semua \`<a>\` **di dalam** \`<nav>\`, sedalam apa pun
- **\`nav > a\`** — \`<a>\` yang **anak langsung** \`<nav>\`
- **\`a:hover\`** — \`<a>\` saat kursor di atasnya
- **\`[data-matkul]\`** — elemen yang punya atribut itu

**Cascade — kenapa disebut *Cascading***

Ketika beberapa aturan mengenai elemen yang sama, urutan penentunya:

- **Kekhususan (*specificity*)** — selector yang lebih khusus menang
- Kalau kekhususannya sama, **yang ditulis belakangan menang**
- **\`!important\`** mengalahkan semuanya — dan justru karena itu **sebaiknya dihindari**

**Menghitung kekhususan**

Dihitung sebagai tiga angka: **(id, kelas, tag)**

- \`p\` → (0, 0, 1)
- \`.kartu\` → (0, 1, 0)
- \`#judul\` → (1, 0, 0)
- \`nav a.aktif\` → (0, 1, 2)

Bandingkan dari kiri. **Satu id mengalahkan berapa pun kelas**, dan satu kelas mengalahkan berapa pun tag. Jadi \`#judul\` (1,0,0) mengalahkan \`.a.b.c.d\` (0,4,0).

Inilah jawaban dari kebingungan yang paling sering muncul: *"kenapa aturan CSS-ku tidak berlaku?"* Biasanya karena ada aturan lain yang **lebih khusus**.

**Box model — setiap elemen adalah kotak berlapis**

Dari dalam ke luar:

- **content** — isinya
- **padding** — jarak **di dalam**, antara isi dan garis tepi
- **border** — garis tepinya
- **margin** — jarak **di luar**, memisahkan dari elemen lain

**Jebakan terbesar CSS**

Secara bawaan, \`width: 300px\` mengatur lebar **content saja**. Padding dan border **ditambahkan di luarnya**.

Jadi kotak dengan \`width: 300px; padding: 20px; border: 5px\` sebenarnya memakan **350px** — 300 + 20 + 20 + 5 + 5.

Ini penyebab tata letak yang meleset sedikit tanpa sebab yang jelas, dan sangat sering menjengkelkan pemula.

Penyelesaiannya satu baris:

\`* { box-sizing: border-box; }\`

Dengan itu, \`width: 300px\` berarti **300px termasuk padding dan border**. Isinya yang menyusut, bukan kotaknya yang melar. Hampir semua proyek modern memasang baris ini di paling atas.

**Margin collapse**

Keanehan lain yang perlu diketahui: **margin atas dan bawah dua elemen bersebelahan tidak dijumlahkan, melainkan diambil yang terbesar.**

Elemen bermargin-bawah 20px di atas elemen bermargin-atas 30px menghasilkan jarak **30px**, bukan 50px. Ini disengaja, dan hanya berlaku pada margin vertikal — margin kiri-kanan selalu dijumlahkan.
`,

  logicSyntax: [
    {
      bahasa: 'css',
      kode: '/* Kekhususan: (id, kelas, tag) */\n\np              { color: black; }   /* (0,0,1) */\n.teks          { color: blue;  }   /* (0,1,0) menang atas p */\nnav p          { color: green; }   /* (0,0,2) kalah dari .teks */\nnav p.teks     { color: red;   }   /* (0,1,2) menang */\n#khusus        { color: gold;  }   /* (1,0,0) menang atas SEMUA di atas */\n\n/* Bandingkan dari KIRI:\n   satu id mengalahkan berapa pun kelas,\n   satu kelas mengalahkan berapa pun tag */',
      penjelasan: `
Inilah jawaban dari pertanyaan yang paling sering muncul saat belajar CSS: *"kenapa warnanya tidak berubah padahal sudah saya tulis?"*

Jawabannya hampir selalu: ada aturan lain yang **lebih khusus**, dan aturan itulah yang menang.

Cara menghitungnya: **hitung berapa id, berapa kelas, berapa tag** di selector-nya, lalu bandingkan **dari kiri**.

- \`nav p\` punya dua tag → (0, 0, 2)
- \`.teks\` punya satu kelas → (0, 1, 0)

Bandingkan dari kiri: id sama-sama 0, lalu kelas 0 lawan 1 → **\`.teks\` menang**, meski \`nav p\` terlihat "lebih spesifik" karena lebih panjang.

Ini yang sering menyesatkan: **panjang selector tidak menentukan.** Selector sepanjang \`body div section article p span\` (0,0,6) tetap **kalah** dari satu \`.teks\` (0,1,0).

Perhatikan juga bahwa **pseudo-class dihitung sebagai kelas**. Jadi \`a:hover\` bernilai (0,1,1), dan \`[data-matkul]\` juga dihitung sebagai kelas.

Sekarang soal **\`!important\`**. Ia mengalahkan seluruh perhitungan di atas, dan justru itulah masalahnya. Begitu kamu memakainya sekali, satu-satunya cara mengalahkannya nanti adalah **\`!important\` lain yang lebih khusus**. Situsnya perlahan penuh \`!important\` yang saling berebut, dan tidak ada lagi yang bisa menalar mana yang menang.

Aturan yang layak dipegang: **kalau kamu merasa butuh \`!important\`, biasanya yang sebenarnya perlu diperbaiki adalah kekhususan selector-mu.** Naikkan kekhususannya sedikit, atau turunkan kekhususan aturan yang mengganggu.
`
    },
    {
      bahasa: 'css',
      kode: '/* BAWAAN: width mengatur CONTENT saja */\n.kotak {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}\n/* Lebar sesungguhnya = 300 + 20 + 20 + 5 + 5 = 350px */\n\n/* PERBAIKAN: satu baris, dipasang paling atas */\n* {\n  box-sizing: border-box;\n}\n/* Sekarang width: 300px berarti 300px TERMASUK\n   padding dan border. Isinya yang menyusut. */',
      penjelasan: `
Ini jebakan CSS yang paling banyak memakan waktu pemula, dan gejalanya sangat khas: **tata letak yang meleset sedikit tanpa sebab yang jelas**.

Bayangkan kamu membuat tiga kolom, masing-masing \`width: 33.33%\`. Secara hitungan, pas seratus persen. Lalu kamu menambahkan \`padding: 10px\` supaya isinya tidak menempel tepi — dan tiba-tiba **kolom ketiga terlempar ke baris berikutnya**.

Penyebabnya: dengan perilaku bawaan, tiga kolom itu sekarang memakan 100% **ditambah** 60px padding. Melebihi lebar yang tersedia.

Penyelesaiannya **\`box-sizing: border-box\`**, yang mengubah arti \`width\` menjadi **lebar total termasuk padding dan border**. Sekarang tiga kolom 33.33% tetap pas, dan padding-nya memakan ruang isi, bukan menambah lebar luar.

Perhatikan bahwa **margin tetap tidak ikut dihitung**, bahkan dengan \`border-box\`. Margin memang berada **di luar** kotak — ia jarak antar-kotak, bukan bagian kotaknya.

Bentuk yang lebih baik daripada \`* { box-sizing: border-box; }\` adalah:

\`*, *::before, *::after { box-sizing: border-box; }\`

supaya elemen semu ikut terkena.

Kenapa perilaku bawaannya justru yang merepotkan? Sejarah. \`content-box\` adalah perilaku yang ditetapkan standar CSS awal, dan mengubahnya sekarang akan **merusak jutaan situs lama**. Jadi standarnya dibiarkan, dan \`border-box\` disediakan sebagai pilihan yang harus kamu nyalakan sendiri.

Inilah alasan hampir semua proyek modern memasang baris itu di paling atas berkas CSS-nya — termasuk yang layak kamu tiru di proyekmu sendiri.
`
    }
  ],

  kode: {
    css: String.raw`/* ============================================
   CSS dasar: reset, selector, box model
   ============================================ */

/* ---------- Selalu paling atas ---------- */
*, *::before, *::after {
  box-sizing: border-box;        /* width = lebar TOTAL */
}

body {
  margin: 0;                     /* buang margin bawaan peramban */
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

/* ---------- Selector: dari umum ke khusus ---------- */

/* tag: semua paragraf */
p { color: #333; }

/* kelas: elemen ber-class tertentu */
.kartu {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* id: hanya satu per halaman */
#judul-utama { font-size: 32px; }

/* keturunan: semua a di dalam nav, sedalam apa pun */
nav a { text-decoration: none; }

/* anak langsung: hanya a yang tepat di bawah nav */
nav > a { font-weight: bold; }

/* pseudo-class: keadaan elemen */
.nav-link:hover  { color: #e52521; }
.nav-link:focus  { outline: 2px solid #049cd8; }

/* atribut: dipakai di proyek BitByteBros */
[data-matkul]        { cursor: pointer; }
[aria-current="page"] { text-decoration: underline; }

/* ---------- Box model ---------- */
.demo-kotak {
  width: 300px;                  /* dengan border-box: TOTAL 300px */
  padding: 20px;                 /* jarak di DALAM */
  border: 5px solid #333;        /* garis tepi */
  margin: 16px;                  /* jarak di LUAR, tidak ikut width */
  background: #fff;
}

/* ---------- Transisi: dipakai 21 kali di proyek ---------- */
.tombol {
  background: #049cd8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.tombol:hover {
  background: #e52521;
  transform: translateY(-2px);   /* naik sedikit saat disentuh */
}

/* Selalu sediakan gaya :focus juga, bukan cuma :hover --
   pengguna keyboard tidak punya kursor untuk hover */
.tombol:focus-visible {
  outline: 3px solid #fbd000;
  outline-offset: 2px;
}`,

    html: String.raw`<!-- Membuktikan aturan kekhususan -->
<p>Hitam: hanya kena aturan tag p (0,0,1)</p>

<p class="teks">Biru: .teks (0,1,0) mengalahkan p (0,0,1)</p>

<nav>
  <p>Hijau: nav p (0,0,2) mengalahkan p (0,0,1)</p>

  <p class="teks">
    Merah: nav p.teks (0,1,2) mengalahkan .teks (0,1,0)
  </p>

  <p class="teks" id="khusus">
    Emas: #khusus (1,0,0) mengalahkan SEMUA di atas
  </p>
</nav>

<!-- Selector panjang belum tentu menang: -->
<!-- body div section article p span  = (0,0,6) -->
<!-- .teks                            = (0,1,0)  <- MENANG -->`
  },

  output: `Warna yang menang untuk tiap paragraf:

  <p>                              -> hitam   (0,0,1)
  <p class="teks">                 -> biru    (0,1,0)
  <nav><p>                         -> hijau   (0,0,2)
  <nav><p class="teks">            -> merah   (0,1,2)
  <nav><p class="teks" id="khusus"> -> emas   (1,0,0)

Perhitungan box model untuk .demo-kotak:

  TANPA box-sizing: border-box
    lebar total = 300 + 20 + 20 + 5 + 5 = 350px
    (padding & border DITAMBAHKAN di luar width)

  DENGAN box-sizing: border-box
    lebar total = 300px
    ruang isi   = 300 - 20 - 20 - 5 - 5 = 250px
    (padding & border memakan ruang isi)

  margin 16px TIDAK ikut dihitung di keduanya --
  ia jarak antar kotak, bukan bagian kotaknya.`,

  kesalahanUmum: [
    {
      salah: 'Mengira selector yang lebih panjang pasti mengalahkan selector yang lebih pendek.',
      kenapa: 'Kekhususan dibandingkan per golongan dari kiri, bukan dari jumlah keseluruhan. Selector sepanjang body div section article p span bernilai nol id, nol kelas, enam tag, dan tetap kalah dari satu kelas. Salah paham ini membuat orang terus memanjangkan selector padahal masalahnya tidak di situ.',
      benar: 'Hitung sebagai tiga angka: id, kelas, tag. Bandingkan dari kiri, dan berhenti pada golongan pertama yang berbeda.'
    },
    {
      salah: 'Memakai !important untuk memaksa aturan berlaku.',
      kenapa: 'Sekali dipakai, satu-satunya cara mengalahkannya nanti adalah !important lain yang lebih khusus. Berkas CSS perlahan penuh dengan penanda itu yang saling berebut, dan tidak ada lagi yang bisa menalar aturan mana yang menang tanpa mencoba satu per satu.',
      benar: 'Perbaiki kekhususan selector-nya. Naikkan kekhususan aturanmu sedikit, atau turunkan kekhususan aturan yang mengganggu.'
    },
    {
      salah: 'Menyangka width: 300px berarti elemen itu selebar 300px.',
      kenapa: 'Secara bawaan, width hanya mengatur lebar isi, sedangkan padding dan border ditambahkan di luarnya. Kotak dengan padding 20px dan border 5px sebenarnya memakan 350px. Gejalanya berupa tata letak yang meleset sedikit tanpa sebab yang jelas, misalnya kolom ketiga terlempar ke baris berikutnya.',
      benar: 'Pasang box-sizing: border-box di paling atas berkas CSS, sehingga width berarti lebar total termasuk padding dan border.'
    },
    {
      salah: 'Mengira margin ikut dihitung ke dalam width setelah memakai border-box.',
      kenapa: 'Border-box hanya memasukkan padding dan border, tidak margin. Margin berada di luar kotak karena ia jarak antar elemen, bukan bagian elemennya. Salah paham ini membuat perhitungan lebar total pada tata letak berkolom tetap meleset.',
      benar: 'Ingat bahwa margin selalu di luar. Kalau lebar totalnya kritis, perhitungkan margin secara terpisah atau pakai gap pada flexbox.'
    },
    {
      salah: 'Menambahkan gaya :hover tanpa menyediakan gaya :focus.',
      kenapa: 'Pengguna keyboard dan pembaca layar tidak memakai kursor, sehingga tidak pernah memicu hover. Tanpa penanda fokus, mereka tidak bisa tahu elemen mana yang sedang terpilih, dan navigasi lewat tombol Tab menjadi mustahil diikuti.',
      benar: 'Sediakan gaya focus-visible bersama setiap gaya hover. Jangan pernah menulis outline: none tanpa menyediakan penanda fokus pengganti.'
    }
  ],

  analogi: `Bayangkan sebuah kantor dengan banyak aturan tertulis.

- Aturan umum: *"semua karyawan berseragam biru"*
- Aturan divisi: *"karyawan bagian gudang berseragam oranye"*
- Aturan perorangan: *"Budi berseragam putih"*

Ketika Budi dari gudang datang, aturan mana yang berlaku? **Yang paling khusus.** Budi pakai putih.

Itulah **kekhususan CSS**. Aturan perorangan (id) mengalahkan aturan divisi (kelas), yang mengalahkan aturan umum (tag).

Dan perhatikan jebakannya: aturan *"semua karyawan laki-laki berusia di atas 25 yang bekerja di lantai tiga sejak 2020"* terdengar sangat rinci — tetapi ia tetap **aturan umum**, dan kalah dari satu aturan divisi. **Panjangnya kalimat tidak menentukan; golongannya yang menentukan.**

**\`!important\`** adalah menempelkan tulisan *"INI MUTLAK, ABAIKAN SEMUA"* di aturan. Sekali seseorang melakukannya, orang berikutnya yang perlu mengubahnya terpaksa menulis *"INI LEBIH MUTLAK"*. Sebentar saja seluruh papan pengumuman penuh tulisan mutlak yang saling bertentangan, dan **tidak ada seorang pun yang tahu lagi harus pakai seragam apa.**

Untuk **box model**, bayangkan sebuah **bingkai foto**:

- **content** — fotonya
- **padding** — paspartu putih di sekeliling foto
- **border** — bingkai kayunya
- **margin** — jarak ke bingkai sebelah di dinding

Sekarang jebakannya. Kamu memesan bingkai *"ukuran 30 cm"*. Yang datang: **fotonya** 30 cm, ditambah paspartu, ditambah kayu — totalnya 35 cm. Kamu sudah mengukur dindingmu untuk 30 cm, dan sekarang bingkai ketiga tidak muat.

**\`border-box\`** adalah memesan dengan cara yang lain: *"total 30 cm, termasuk paspartu dan kayunya"*. Fotonya jadi lebih kecil, tetapi **bingkainya pas di dinding** — dan itulah yang sebenarnya kamu ukur sejak awal.`,

  latihan: [
    'Hitung kekhususan tiap selector berikut dan tentukan mana yang menang: div p, .kartu, nav ul li a, #utama, dan a:hover.',
    'Sebuah elemen punya width 200px, padding 15px, border 3px, dan margin 10px. Hitung lebar totalnya dengan dan tanpa box-sizing: border-box.',
    'Jelaskan kenapa tiga kolom selebar 33.33% bisa terlempar ke baris berikutnya setelah diberi padding, dan bagaimana memperbaikinya dengan satu baris.',
    'Jelaskan kenapa !important sebaiknya dihindari, lalu tuliskan dua cara lain untuk membuat aturanmu menang.',
    'Jelaskan perbedaan nav a dan nav > a, lalu buat contoh HTML yang membuat keduanya memilih elemen berbeda.',
    'Jelaskan kenapa setiap gaya :hover sebaiknya disertai gaya :focus, dan siapa yang dirugikan kalau tidak.'
  ]
});

TOPICS.push({
  id: 'web-flexbox',
  judul: 'Flexbox — Menata Letak',
  kategori: 'web-desain',
  tag: ['flexbox', 'display:flex', 'justify-content', 'align-items', 'gap', 'flex'],
  ringkas: 'Alat tata letak yang dipakai 84 kali di proyekmu — dan dua sumbu yang harus kamu bedakan.',

  fungsi: `**Menata elemen dalam satu baris atau kolom, dengan pembagian ruang yang otomatis.**

Sebelum Flexbox, menengahkan sesuatu secara vertikal adalah persoalan yang terkenal sulit. Sekarang dua baris.

Terpakai di:

- **Bilah navigasi** — logo di kiri, menu di kanan
- **Kartu yang tingginya sama** meski isinya berbeda
- **Menengahkan apa pun** — secara mendatar dan tegak sekaligus
- **Tata letak responsif** — elemen membungkus sendiri saat layar menyempit
- **Formulir** — label dan kolom yang sejajar rapi

Yang harus dipahami sebelum apa pun: **sumbu utama dan sumbu silang**.

\`justify-content\` bekerja pada **sumbu utama**, \`align-items\` pada **sumbu silang**. Dan keduanya **bertukar** kalau kamu mengubah \`flex-direction\` menjadi \`column\`.

Kebingungan tentang mana yang mana adalah penyebab hampir semua kesulitan Flexbox.`,

  praktik: {
    tujuan: `Kamu bisa membuat tata letak baris dan kolom yang responsif dengan Flexbox, dan tidak lagi bingung antara justify dan align.`,
    alat: [
      'Editor teks',
      'Peramban',
      'Permainan latihan Flexbox Froggy'
    ],
    langkah: [
      { judul: 'Main Flexbox Froggy dulu',
        isi: `Buka **flexboxfroggy.com** dan selesaikan seluruh 24 levelnya. Butuh sekitar dua puluh menit.

Ini cara tercepat memahami Flexbox yang pernah ada, dan jauh lebih efektif daripada membaca dokumentasi.` },
      { judul: 'Pahami kedua sumbunya',
        isi: `Dengan \`flex-direction: row\` (bawaan):

- sumbu utama **mendatar** → \`justify-content\` mengatur kiri-kanan
- sumbu silang **tegak** → \`align-items\` mengatur atas-bawah

Dengan \`column\`, **keduanya bertukar**.

Tulis ini di catatanmu. Kamu akan melihatnya berkali-kali sampai hafal.` },
      { judul: 'Tengahkan sesuatu sepenuhnya',
        isi: `- \`display: flex; justify-content: center; align-items: center;\`

Tiga baris, dan isinya berada tepat di tengah secara mendatar dan tegak.

Bandingkan dengan cara lama yang memakai posisi mutlak dan transform — dan hargai betapa jauh lebih sederhananya.` },
      { judul: 'Buat bilah navigasi',
        isi: `Logo di kiri, menu di kanan:

- wadahnya \`display: flex; justify-content: space-between; align-items: center;\`

Untuk mendorong satu elemen ke ujung tanpa mengubah yang lain, beri \`margin-left: auto\` pada elemen itu. Trik ini sangat sering terpakai.` },
      { judul: 'Pahami flex-grow, shrink, dan basis',
        isi: `Singkatan \`flex: 1\` berarti \`flex-grow: 1; flex-shrink: 1; flex-basis: 0\`.

- \`flex: 1\` pada semua anak → ruang dibagi **rata**
- \`flex: 2\` pada satu anak → ia mendapat **dua kali** bagian yang lain

Coba beberapa kombinasi dan amati hasilnya langsung di peramban.` },
      { judul: 'Buat kartu yang membungkus sendiri',
        isi: `- wadah: \`display: flex; flex-wrap: wrap; gap: 16px;\`
- kartu: \`flex: 1 1 250px;\`

Artinya: lebar dasarnya 250 piksel, boleh membesar dan mengecil. Saat layar menyempit, kartunya **turun sendiri** ke baris berikutnya.

Ini tata letak responsif tanpa satu pun media query.` },
      { judul: 'Ketahui kapan memakai Grid',
        isi: `Flexbox untuk **satu dimensi** — satu baris atau satu kolom.

CSS Grid untuk **dua dimensi** — baris dan kolom sekaligus, seperti tata letak halaman utuh.

Keduanya sering dipakai bersama: Grid untuk kerangka halaman, Flexbox untuk isi tiap bagiannya.` }
    ],
    cek: [
      'Kamu menyelesaikan seluruh level Flexbox Froggy',
      'Kartu-kartumu membungkus sendiri saat jendela peramban dipersempit',
      'Kamu bisa menjelaskan kenapa justify-content berubah arah saat direction diubah ke column'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
Sebelum flexbox, menata elemen berdampingan dan menengahkannya secara vertikal adalah pekerjaan yang terkenal menyusahkan. **Flexbox menyelesaikan keduanya dengan beberapa baris.**

Di proyek BitByteBros milikmu, \`flex\` muncul **84 kali** — jauh melampaui semua alat tata letak lain. Itu wajar, dan mencerminkan pemakaian di dunia nyata.

**Cara kerjanya: wadah dan anak**

Flexbox selalu melibatkan **dua tingkat**:

- **Flex container** — elemen yang diberi \`display: flex\`
- **Flex item** — **anak langsung** dari container itu

Perhatikan kata **anak langsung**. Cucu tidak ikut terpengaruh. Ini sering jadi sumber kebingungan.

**Dua sumbu — inti dari flexbox**

Inilah yang paling penting dipahami, dan paling sering membingungkan:

- **Main axis** (sumbu utama) — arah elemen berjajar
- **Cross axis** (sumbu silang) — tegak lurus terhadapnya

Arahnya ditentukan **\`flex-direction\`**:

- **\`row\`** (bawaan) — main axis **mendatar**, cross axis **tegak**
- **\`column\`** — main axis **tegak**, cross axis **mendatar**

**Properti pada container**

- **\`justify-content\`** — menata sepanjang **main axis**
- **\`align-items\`** — menata sepanjang **cross axis**
- **\`flex-wrap\`** — bolehkah pindah baris kalau tidak muat
- **\`gap\`** — jarak antar item

**Inilah pasangan yang paling sering tertukar.** \`justify-content\` **tidak selalu** berarti mendatar — ia mengikuti main axis. Kalau \`flex-direction: column\`, maka \`justify-content\` mengatur **arah tegak**, dan \`align-items\` mengatur **mendatar**.

Cara mengingatnya: **\`justify\` mengikuti arah \`flex-direction\`, \`align\` tegak lurus terhadapnya.**

**Nilai yang sering dipakai**

Untuk \`justify-content\`: \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`.

Untuk \`align-items\`: \`stretch\` (bawaan), \`flex-start\`, \`center\`, \`flex-end\`, \`baseline\`.

**Properti pada item**

- **\`flex-grow\`** — bolehkah membesar mengisi sisa ruang. Bawaan 0.
- **\`flex-shrink\`** — bolehkah mengecil kalau kurang ruang. Bawaan 1.
- **\`flex-basis\`** — ukuran awal sebelum dibagi.
- **\`flex\`** — ringkasan ketiganya. **\`flex: 1\`** berarti \`1 1 0\`, artinya *"bagi rata sisa ruangnya"*.

**Menengahkan sempurna**

Persoalan legendaris yang dulu butuh trik rumit, kini tiga baris:

\`display: flex; justify-content: center; align-items: center;\`

**Pakai \`gap\`, jangan margin**

Sebelum \`gap\` ada, jarak antar item dibuat dengan \`margin-right\` — lalu item terakhir harus dikecualikan supaya tidak ada jarak menggantung di ujung. \`gap\` menyelesaikannya sekaligus: ia hanya memberi jarak **di antara**, tidak di tepi luar.
`,

  logicSyntax: [
    {
      bahasa: 'css',
      kode: '/* Dari proyek BitByteBros: navbar */\n.navbar-mario {\n  display: flex;\n  justify-content: space-between;  /* main axis: MENDATAR */\n  align-items: center;             /* cross axis: TEGAK */\n  padding: 12px 24px;\n}\n\n/* Kalau arahnya diubah, ARTI keduanya ikut BERTUKAR */\n.kolom {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;         /* sekarang TEGAK */\n  align-items: center;             /* sekarang MENDATAR */\n}',
      penjelasan: `
Perhatikan bahwa **kedua blok memakai properti yang sama persis**, tetapi artinya bertukar. Inilah yang paling sering membingungkan saat belajar flexbox.

Kuncinya: **\`justify-content\` selalu mengikuti arah \`flex-direction\`**, dan **\`align-items\` selalu tegak lurus terhadapnya**.

Pada blok pertama dengan arah bawaan \`row\`:

- \`justify-content: space-between\` → menyebar item **ke kiri dan kanan**, dengan ruang kosong di tengah. Inilah cara membuat logo di kiri dan menu di kanan.
- \`align-items: center\` → menengahkan **secara tegak**, sehingga logo dan tulisan sejajar rapi berapa pun tingginya.

Pada blok kedua dengan \`flex-direction: column\`, keduanya bertukar peran sepenuhnya.

Gejala kebingungan ini sangat khas: kamu menulis \`align-items: center\` berharap sesuatu ke tengah secara mendatar, tetapi tidak terjadi apa-apa — karena arahnya \`row\`, dan yang kamu ubah justru penataan tegaknya yang memang sudah pas.

Cara memeriksanya cepat: **tanyakan dulu ke mana item-nya berjajar.** Kalau berjajar mendatar, maka main axis mendatar, dan \`justify-content\` yang mengurus mendatar.

Perhatikan juga \`padding: 12px 24px\` — bentuk singkat yang berarti **12px atas-bawah, 24px kiri-kanan**. Bentuk singkatnya punya empat pola: satu nilai untuk semua sisi, dua nilai untuk tegak dan mendatar, tiga nilai untuk atas, mendatar, bawah, dan empat nilai searah jarum jam mulai dari atas.
`
    },
    {
      bahasa: 'css',
      kode: '/* Menengahkan sempurna: dulu sulit, kini 3 baris */\n.tengah {\n  display: flex;\n  justify-content: center;   /* tengah mendatar */\n  align-items: center;       /* tengah tegak */\n  min-height: 100vh;         /* setinggi layar */\n}\n\n/* flex: 1 -> bagi rata sisa ruang */\n.sidebar { width: 250px; }   /* tetap */\n.konten  { flex: 1; }        /* ambil SISANYA */',
      penjelasan: `
Bagian pertama menyelesaikan persoalan yang dulu terkenal menyusahkan. Sebelum flexbox, menengahkan sesuatu **secara tegak** butuh trik seperti \`position: absolute\` dengan \`transform: translate(-50%, -50%)\`, atau bahkan tabel.

Perhatikan **\`min-height: 100vh\`**. Satuan \`vh\` berarti persen dari tinggi **viewport**, jadi \`100vh\` adalah setinggi layar. Tanpa ini, containernya hanya setinggi isinya, sehingga "menengahkan secara tegak" tidak terlihat efeknya — tidak ada ruang kosong untuk ditengahkan.

Pakai \`min-height\`, bukan \`height\`. Dengan \`height: 100vh\`, isi yang lebih tinggi dari layar akan **terpotong**.

Bagian kedua adalah pola tata letak yang paling sering dipakai: **sidebar tetap, konten mengisi sisanya.**

**\`flex: 1\`** adalah ringkasan dari \`flex-grow: 1; flex-shrink: 1; flex-basis: 0\`. Artinya *"ukuran awalku nol, tapi ambil semua sisa ruang yang ada"*.

Karena \`.sidebar\` tidak diberi \`flex-grow\` (bawaannya 0), ia **tidak ikut membesar** dan tetap 250px. Seluruh sisa ruang jatuh ke \`.konten\`.

Kalau ada **dua** elemen ber-\`flex: 1\`, keduanya berbagi rata. Kalau satu diberi \`flex: 2\` dan yang lain \`flex: 1\`, pembagiannya dua banding satu.

Ada satu jebakan yang perlu diketahui: **flex item punya \`min-width: auto\` secara bawaan**, yang membuatnya menolak mengecil lebih kecil daripada isinya. Akibatnya teks panjang atau gambar besar bisa **membuat kolom melar melewati batas**. Kalau itu terjadi, tambahkan \`min-width: 0\` pada item-nya.
`
    }
  ],

  kode: {
    css: String.raw`/* ============================================
   Flexbox: pola yang paling sering dipakai
   ============================================ */

*, *::before, *::after { box-sizing: border-box; }

/* ---------- 1. Navbar: logo kiri, menu kanan ---------- */
.navbar {
  display: flex;
  justify-content: space-between;   /* dorong ke dua ujung */
  align-items: center;              /* sejajar tegak */
  padding: 12px 24px;
  gap: 16px;
}

.navbar-menu {
  display: flex;
  gap: 20px;                        /* jarak ANTAR item saja */
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ---------- 2. Menengahkan sempurna ---------- */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;                /* min-height, BUKAN height */
  text-align: center;
}

/* ---------- 3. Sidebar tetap + konten mengisi sisa ---------- */
.layout {
  display: flex;
  gap: 24px;
}

.sidebar {
  width: 250px;                     /* tetap, flex-grow bawaan 0 */
  flex-shrink: 0;                   /* jangan mengecil saat sempit */
}

.konten {
  flex: 1;                          /* ambil SISA ruang */
  min-width: 0;                     /* izinkan mengecil di bawah isinya */
}

/* ---------- 4. Kartu berjajar, boleh pindah baris ---------- */
.daftar-kartu {
  display: flex;
  flex-wrap: wrap;                  /* tanpa ini, kartu memaksa 1 baris */
  gap: 16px;
}

.kartu {
  flex: 1 1 280px;                  /* grow, shrink, lebar dasar 280px */
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* ---------- 5. Footer menempel bawah ---------- */
body {
  display: flex;
  flex-direction: column;           /* main axis jadi TEGAK */
  min-height: 100vh;
  margin: 0;
}

main {
  flex: 1;                          /* dorong footer ke bawah */
}

/* ---------- 6. Arah berubah -> ARTI properti bertukar ---------- */
.kolom-tengah {
  display: flex;
  flex-direction: column;
  justify-content: center;          /* sekarang mengatur TEGAK */
  align-items: center;              /* sekarang mengatur MENDATAR */
  min-height: 300px;
}`,

    html: String.raw`<!-- Struktur untuk contoh CSS di atas -->

<!-- 1. Navbar -->
<nav class="navbar">
  <img src="logo.png" alt="Logo" />
  <ul class="navbar-menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Kelas</a></li>
    <li><a href="#">Kontak</a></li>
  </ul>
</nav>

<!-- 3. Sidebar + konten -->
<div class="layout">
  <aside class="sidebar">
    <h2>Daftar Materi</h2>
  </aside>
  <main class="konten">
    <h1>Isi Halaman</h1>
  </main>
</div>

<!-- 4. Kartu berjajar, otomatis pindah baris kalau sempit -->
<div class="daftar-kartu">
  <article class="kartu"><h3>Web Desain</h3></article>
  <article class="kartu"><h3>Struktur Data</h3></article>
  <article class="kartu"><h3>Sistem Operasi</h3></article>
  <article class="kartu"><h3>Basis Data II</h3></article>
</div>

<!-- CATATAN: flex hanya mempengaruhi ANAK LANGSUNG.
     .kartu di bawah ini adalah CUCU, jadi TIDAK ikut
     ditata oleh .daftar-kartu -->
<div class="daftar-kartu">
  <div>
    <article class="kartu">Ini cucu, tidak jadi flex item</article>
  </div>
</div>`
  },

  output: `Ringkasan dua sumbu:

  flex-direction: row  (bawaan)
    main axis  = MENDATAR  -> diatur justify-content
    cross axis = TEGAK     -> diatur align-items

  flex-direction: column
    main axis  = TEGAK     -> diatur justify-content
    cross axis = MENDATAR  -> diatur align-items

  Ingat: justify MENGIKUTI flex-direction,
         align TEGAK LURUS terhadapnya.


Nilai justify-content pada 3 item (arah row):

  flex-start      [A][B][C]..........
  center          .....[A][B][C].....
  flex-end        ..........[A][B][C]
  space-between   [A].....[B].....[C]
  space-around    ..[A]...[B]...[C]..
  space-evenly    ...[A]..[B]..[C]...


flex: 1 pada pembagian sisa ruang:

  .sidebar (250px tetap) | .konten (flex: 1)
  |<--- 250px --->|<------ sisa ruang ------>|

  dua item flex: 1        -> 50% : 50%
  flex: 2 dan flex: 1     -> 67% : 33%`,

  kesalahanUmum: [
    {
      salah: 'Memakai justify-content untuk menengahkan secara tegak, atau align-items untuk mendatar.',
      kenapa: 'Keduanya mengikuti sumbu, bukan arah tetap. Dengan flex-direction bawaan row, justify-content mengurus mendatar dan align-items mengurus tegak. Begitu arahnya diubah jadi column, keduanya bertukar peran. Gejalanya khas: propertinya ditulis tetapi tidak terjadi apa-apa.',
      benar: 'Tanyakan dulu ke mana item berjajar. Justify mengikuti arah flex-direction, align tegak lurus terhadapnya.'
    },
    {
      salah: 'Menyangka display: flex mempengaruhi seluruh keturunan.',
      kenapa: 'Flexbox hanya menata anak langsung dari container. Elemen yang dibungkus div tambahan menjadi cucu dan tidak ikut ditata sama sekali. Kesalahan ini sering terjadi setelah menambahkan pembungkus untuk keperluan lain, dan tata letaknya tiba-tiba rusak tanpa ada CSS yang diubah.',
      benar: 'Periksa struktur HTML-nya. Kalau perlu, jadikan pembungkus itu flex container juga, atau hilangkan pembungkusnya.'
    },
    {
      salah: 'Lupa menambahkan flex-wrap ketika item berjajar banyak.',
      kenapa: 'Secara bawaan flexbox memaksa seluruh item berada di satu baris, dan mengecilkan mereka sampai muat. Pada layar sempit, kartu yang seharusnya turun ke baris berikutnya justru gepeng sampai isinya tidak terbaca.',
      benar: 'Tambahkan flex-wrap: wrap pada container, dan beri item flex-basis yang masuk akal seperti flex: 1 1 280px.'
    },
    {
      salah: 'Memakai height: 100vh untuk container yang isinya bisa panjang.',
      kenapa: 'Tinggi dipatok tepat setinggi layar, sehingga isi yang lebih panjang terpotong dan tidak bisa digulir. Gejalanya baru muncul pada layar pendek atau saat isinya bertambah, sehingga sering lolos pengujian di layar besar.',
      benar: 'Pakai min-height: 100vh. Ia menjamin tinggi minimal setinggi layar tetapi tetap membesar kalau isinya lebih panjang.'
    },
    {
      salah: 'Membuat jarak antar item dengan margin-right lalu mengecualikan item terakhir.',
      kenapa: 'Cara ini butuh aturan tambahan seperti :last-child, dan mudah rusak saat urutan item berubah atau ada yang disembunyikan. Jarak menggantung di ujung sering baru ketahuan setelah tata letaknya dipakai.',
      benar: 'Pakai properti gap pada container. Ia hanya memberi jarak di antara item, tidak di tepi luar, dan tidak perlu pengecualian apa pun.'
    }
  ],

  analogi: `Bayangkan menata kursi di sebuah ruangan.

**Flex container** adalah **ruangannya**. **Flex item** adalah **kursi-kursinya** — tetapi hanya kursi yang **langsung diletakkan di lantai ruangan itu**. Kursi yang ditaruh di dalam kotak, lalu kotaknya diletakkan di ruangan, **tidak ikut kamu tata** — yang kamu tata cuma kotaknya.

**\`flex-direction\`** adalah keputusan **kursinya berbaris ke samping atau ke belakang**.

Dan di sinilah bagian yang membingungkan. Perintah *"ratakan sepanjang barisan"* dan *"ratakan tegak lurus barisan"* artinya **berubah** tergantung arah barisannya.

Kalau kursi berbaris ke samping, *"sepanjang barisan"* berarti kiri-kanan. Kalau berbaris ke belakang, *"sepanjang barisan"* berarti depan-belakang. **Perintahnya sama, hasilnya berbeda** — dan itu persis \`justify-content\`.

**\`space-between\`** adalah *"dorong kursi pertama ke ujung sini, terakhir ke ujung sana, sisanya bagi rata"*. Itulah cara membuat logo menempel kiri dan menu menempel kanan.

**\`flex: 1\`** adalah kursi yang berkata *"aku ambil semua sisa ruang yang ada"*. Kalau ada dua kursi seperti itu, mereka membagi rata. Kursi lain yang ukurannya sudah dipatok tidak ikut berebut.

**\`flex-wrap\`** adalah izin *"kalau sudah tidak muat, silakan mulai baris baru"*. Tanpa izin itu, panitia akan **memaksa semua kursi masuk satu baris** dengan cara mengecilkannya — sampai tidak ada yang bisa diduduki.

Dan **\`gap\`** adalah *"beri jarak setengah meter antar kursi"*. Perhatikan bedanya dengan menempeli setiap kursi bantalan di sisi kanannya: dengan cara itu, **kursi paling kanan punya bantalan menggantung** yang menempel tembok. \`gap\` tidak pernah punya masalah itu — ia cuma mengurus **antara**, bukan tepi.`,

  latihan: [
    'Jelaskan perbedaan main axis dan cross axis, lalu jelaskan bagaimana flex-direction mengubah arti justify-content dan align-items.',
    'Tuliskan CSS untuk navbar dengan logo di kiri dan tiga tautan di kanan, sejajar rapi secara tegak.',
    'Tuliskan CSS untuk menengahkan sebuah kotak tepat di tengah layar, mendatar maupun tegak. Jelaskan kenapa min-height diperlukan.',
    'Buat tata letak sidebar selebar 250px dengan konten mengisi sisanya. Jelaskan arti flex: 1 dan kenapa sidebar tidak ikut membesar.',
    'Jelaskan kenapa display: flex tidak mempengaruhi cucu, lalu tunjukkan satu struktur HTML yang tata letaknya rusak karena hal ini.',
    'Jelaskan keuntungan gap dibandingkan margin-right untuk memberi jarak antar item, dan masalah apa yang dihindarinya.'
  ]
});

TOPICS.push({
  id: 'web-responsif',
  judul: 'Desain Responsif & Media Query',
  kategori: 'web-desain',
  tag: ['responsif', 'media query', 'mobile first', 'breakpoint', 'viewport', 'rem'],
  ringkas: 'Satu halaman yang menyesuaikan diri dari ponsel sampai layar lebar.',

  fungsi: `**Membuat halaman yang enak dipakai di ponsel maupun layar besar.**

Lebih dari separuh pengunjung situs Indonesia memakai ponsel. Halaman yang hanya diuji di laptop akan mengecewakan sebagian besar penggunanya.

Terpakai di:

- **Setiap proyek web** — tugas kuliah pun akan dibuka dosen dari ponsel
- **Menyesuaikan tata letak** — tiga kolom di layar besar, satu kolom di ponsel
- **Ukuran sentuh** — tombol yang cukup besar untuk jari
- **Gambar responsif** — tidak mengirim gambar 4000 piksel ke ponsel
- **Interaksi Manusia & Komputer** — aksesibilitas dan kenyamanan diuji di sana

Kesalahan yang paling sering, dan paling mendasar: **lupa meta viewport**.

Tanpa satu baris itu, seluruh media query-mu diabaikan dan halamanmu tampil mengecil di ponsel.`,

  praktik: {
    tujuan: `Halamanmu enak dipakai di lebar 320 piksel sampai layar besar, dan sudah kamu uji di perangkat sungguhan.`,
    alat: [
      'Peramban dengan mode perangkat di Developer Tools',
      'Ponsel sungguhan di jaringan yang sama'
    ],
    langkah: [
      { judul: 'Pasang meta viewport lebih dulu',
        isi: `- \`<meta name="viewport" content="width=device-width, initial-scale=1">\`

Tanpa ini, ponsel menganggap halamanmu selebar 980 piksel lalu mengecilkannya — dan media query tidak pernah aktif.

Periksa halaman lamamu; kalau tidak ada, tambahkan sekarang.` },
      { judul: 'Rancang dari layar terkecil dulu',
        isi: `Tulis CSS dasar untuk ponsel, lalu tambahkan \`@media (min-width: ...)\` untuk layar yang lebih besar.

Ini disebut **mobile-first**, dan hasilnya lebih sederhana: kamu **menambah** untuk layar besar, bukan **membatalkan** untuk layar kecil.` },
      { judul: 'Pilih titik pindah dari isinya, bukan dari merek ponsel',
        isi: `Jangan memakai lebar iPhone tertentu sebagai patokan — perangkat berubah tiap tahun.

Perlebar jendela peramban pelan-pelan, dan tandai lebar di mana tata letakmu **mulai terlihat buruk**. Di situlah titik pindahmu.

Biasanya cukup dua atau tiga titik untuk seluruh situs.` },
      { judul: 'Pakai satuan yang lentur',
        isi: `- \`%\` dan \`fr\` untuk lebar
- \`rem\` untuk ukuran huruf dan jarak
- \`max-width\` agar isi tidak terlalu melebar di layar besar
- \`clamp(1rem, 2.5vw, 1.5rem)\` untuk ukuran huruf yang menyesuaikan sendiri

Hindari lebar tetap dalam piksel untuk wadah — itu sumber utama halaman yang menggeser ke samping.` },
      { judul: 'Buat gambar responsif',
        isi: `- \`img { max-width: 100%; height: auto; }\` mencegah gambar meluber
- \`srcset\` menyediakan beberapa ukuran, dan peramban memilih yang sesuai

Ini penting bukan hanya untuk tampilan: mengirim gambar 4000 piksel ke ponsel berarti membuang kuota penggunamu.` },
      { judul: 'Periksa ukuran sentuh',
        isi: `Tombol dan tautan harus cukup besar untuk jari. Patokan yang lazim: sekitar 44 piksel.

Ukur di Developer Tools. Tautan yang terlalu kecil dan berdempetan adalah keluhan paling umum pengguna ponsel.` },
      { judul: 'Uji di ponsel sungguhan',
        isi: `Mode perangkat di peramban **tidak cukup** — ia tidak menirukan jari, kecepatan jaringan, atau layar di bawah sinar matahari.

Jalankan peladen lokalmu di \`0.0.0.0\`, lalu buka dari ponsel memakai alamat IP komputermu.

Coba juga dengan jaringan diperlambat lewat tab Network. Halaman yang cepat di kabel bisa terasa sangat lambat di data seluler.` }
    ],
    cek: [
      'Halamanmu tidak menggeser ke samping pada lebar 320 piksel',
      'Meta viewport ada di setiap halamanmu',
      'Kamu sudah membuka halamanmu dari ponsel sungguhan, bukan cuma dari mode perangkat'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
**Desain responsif** berarti satu halaman yang **menyesuaikan diri** dengan lebar layar, bukan membuat versi terpisah untuk ponsel.

Di proyek BitByteBros milikmu ada **5 blok \`@media\`** — awal yang baik, dan topik ini menjelaskan cara memakainya dengan benar.

**Syarat mutlak: meta viewport**

\`<meta name="viewport" content="width=device-width, initial-scale=1">\`

**Tanpa baris ini, seluruh media query-mu tidak berpengaruh sama sekali.** Ponsel akan berpura-pura layarnya selebar 980px, merender halaman desktop, lalu mengecilkannya. Media query \`max-width: 768px\` tidak pernah cocok karena ponsel merasa lebarnya 980.

Ini kesalahan yang paling sering membuat orang mengira CSS responsifnya salah, padahal masalahnya di HTML.

**Media query**

\`@media (max-width: 768px) { ... }\` — aturan di dalamnya berlaku **hanya** kalau lebar layar 768px atau kurang.

Bisa juga \`min-width\`, dan keduanya bisa digabung dengan \`and\`.

**Mobile first — dan kenapa lebih baik**

Ada dua pendekatan:

- **Desktop first** — tulis gaya desktop dulu, lalu pakai \`max-width\` untuk memperbaiki tampilan kecil
- **Mobile first** — tulis gaya ponsel dulu, lalu pakai \`min-width\` untuk **menambah** saat layar melebar

**Mobile first lebih dianjurkan**, dan alasannya praktis:

- Gaya dasarnya lebih sederhana, karena tampilan ponsel biasanya satu kolom
- Kamu **menambah** kerumitan saat ruang bertambah, alih-alih **membatalkan** kerumitan saat ruang berkurang
- Ponsel — yang sering berjaringan lambat — hanya memproses gaya dasar

**Breakpoint**

Titik lebar tempat tata letak berubah. Yang lazim: 480px, 768px, 1024px, 1280px.

Tetapi aturan yang lebih baik: **tentukan breakpoint dari kapan tata letakmu mulai jelek**, bukan dari daftar ukuran perangkat. Ukuran perangkat terus berubah; tata letakmu tidak.

**Satuan yang perlu dibedakan**

- **\`px\`** — tetap. Tidak ikut pengaturan ukuran huruf pengguna.
- **\`rem\`** — kelipatan ukuran huruf akar. **Ikut** pengaturan pengguna, dan karena itu lebih baik untuk ukuran huruf.
- **\`em\`** — kelipatan ukuran huruf **elemen induknya**. Bisa bertumpuk tak terduga.
- **\`%\`** — persen dari induknya.
- **\`vw\` / \`vh\`** — persen dari lebar/tinggi layar.

**Pakai \`rem\` untuk ukuran huruf.** Kalau seluruh situs memakai \`px\`, pengguna yang membesarkan huruf lewat pengaturan peramban **tidak akan melihat perubahan apa pun** — dan itu merugikan pengguna dengan penglihatan terbatas.

**Gambar responsif**

\`img { max-width: 100%; height: auto; }\`

Ini menjaga gambar tidak pernah melebihi wadahnya, sambil mempertahankan perbandingan sisinya. Satu aturan ini menyelesaikan sebagian besar masalah gambar meluber.

**Responsif bukan cuma lebar**

Yang juga perlu ikut menyesuaikan: ukuran huruf, jarak, jumlah kolom, dan **ukuran sasaran sentuh**. Tombol di ponsel sebaiknya minimal sekitar **44 x 44 piksel** supaya nyaman ditekan jari.
`,

  logicSyntax: [
    {
      bahasa: 'css',
      kode: '/* DESKTOP FIRST: menulis, lalu MEMBATALKAN */\n.layout { display: flex; gap: 24px; }\n@media (max-width: 768px) {\n  .layout { flex-direction: column; gap: 12px; }\n}\n\n/* MOBILE FIRST: dasar sederhana, lalu MENAMBAH */\n.layout { display: flex; flex-direction: column; gap: 12px; }\n@media (min-width: 768px) {\n  .layout { flex-direction: row; gap: 24px; }\n}',
      penjelasan: `
Kedua versi menghasilkan tampilan yang **sama persis**. Yang berbeda adalah **arah berpikirnya**, dan itu terasa begitu proyeknya membesar.

Pada **desktop first**, kamu menulis tata letak rumit lebih dulu, lalu **membatalkannya** untuk layar kecil. Blok \`@media\` isinya penuh pembatalan: \`flex-direction: column\`, \`width: 100%\`, \`display: none\`.

Masalahnya menumpuk. Setiap kali kamu menambah sesuatu di gaya desktop, kamu juga harus **ingat membatalkannya** di blok ponsel. Yang terlupa akan bocor ke tampilan ponsel, dan biasanya baru ketahuan belakangan.

Pada **mobile first**, gaya dasarnya adalah yang **paling sederhana** — satu kolom, penuh lebar. Blok \`@media\` isinya **penambahan**, bukan pembatalan. Kalau kamu lupa menambahkan sesuatu, yang muncul di desktop cuma versi sederhananya, dan itu jauh lebih tidak merusak daripada tata letak desktop yang bocor ke ponsel.

Ada keuntungan lain yang sering luput: **ponsel hanya memproses gaya dasar**. Ia tidak perlu menghitung aturan desktop lalu membatalkannya. Pada perangkat lemah, ini terasa.

Perhatikan pemilihan angka pada \`min-width: 768px\` dan \`max-width: 768px\`. Kalau kamu memakai **keduanya sekaligus** di proyek yang sama dengan angka yang sama, ada risiko **tumpang tindih tepat di 768px** — keduanya cocok, dan yang menang tergantung urutan penulisan. Untuk aman, pakai \`max-width: 767.98px\` berpasangan dengan \`min-width: 768px\`.

Cara paling aman: **pilih satu pendekatan dan pakai konsisten di seluruh proyek.** Mencampur keduanya adalah sumber kebingungan yang tidak perlu.
`
    },
    {
      bahasa: 'css',
      kode: '/* px: TIDAK ikut pengaturan pengguna */\nbody { font-size: 16px; }\n\n/* rem: ikut ukuran huruf akar, jadi ikut pengaturan */\nhtml { font-size: 100%; }   /* biarkan pengguna yang menentukan */\nbody { font-size: 1rem; }\nh1   { font-size: 2rem; }    /* dua kali ukuran akar */\n\n/* Gambar responsif: satu aturan, sebagian besar masalah selesai */\nimg {\n  max-width: 100%;\n  height: auto;\n}',
      penjelasan: `
Perbedaan \`px\` dan \`rem\` terasa sepele sampai kamu memikirkan **siapa yang dirugikan**.

Peramban menyediakan pengaturan ukuran huruf, dan sebagian orang **benar-benar memakainya** — pengguna berusia lanjut, atau siapa pun dengan penglihatan terbatas. Mereka menaikkannya menjadi 20px atau 24px.

Kalau situsmu menulis \`font-size: 16px\` di mana-mana, pengaturan itu **diabaikan sepenuhnya**. Situsmu tetap 16px, dan orang itu tidak bisa membacanya.

Dengan \`rem\`, angkanya adalah **kelipatan ukuran huruf akar**. Kalau pengguna menaikkan bawaan menjadi 20px, maka \`1rem\` menjadi 20px dan \`2rem\` menjadi 40px. **Seluruh situs ikut membesar secara proporsional.**

Itulah kenapa \`html { font-size: 100%; }\` lebih baik daripada mematoknya ke angka tetap — ia berarti *"pakai apa pun yang pengguna pilih"*.

Untuk **\`em\`**, perhatikan bedanya: ia relatif terhadap **induknya**, bukan akar. Akibatnya ia **bertumpuk**. Elemen \`1.2em\` di dalam elemen \`1.2em\` menghasilkan 1.44 kali. Bersarang tiga tingkat, ukurannya membengkak tanpa kamu sadari. Karena itu \`rem\` lebih mudah ditalar untuk ukuran huruf, dan \`em\` lebih cocok untuk jarak yang memang harus mengikuti ukuran huruf setempat.

Bagian gambar juga layak diperhatikan. **\`max-width: 100%\`** — bukan \`width: 100%\` — artinya *"jangan pernah melebihi wadahmu, tapi jangan dipaksa melar juga"*. Gambar kecil tetap tampil pada ukuran aslinya.

**\`height: auto\`** menjaga perbandingan sisinya. Tanpa itu, kalau ada atribut \`height\` di HTML-nya, gambar akan gepeng saat lebarnya menyusut.
`
    }
  ],

  kode: {
    css: String.raw`/* ============================================
   Mobile first: dasar sederhana, lalu ditambah
   ============================================ */

*, *::before, *::after { box-sizing: border-box; }

/* Biarkan pengguna menentukan ukuran huruf dasarnya */
html { font-size: 100%; }

body {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  font-family: system-ui, sans-serif;
}

img {
  max-width: 100%;      /* jangan pernah melebihi wadah */
  height: auto;         /* jaga perbandingan sisi */
}

/* ---------- DASAR: gaya untuk PONSEL ---------- */

.navbar {
  display: flex;
  flex-direction: column;      /* menumpuk di ponsel */
  gap: 8px;
  padding: 12px 16px;
}

.layout {
  display: flex;
  flex-direction: column;      /* satu kolom */
  gap: 12px;
  padding: 16px;
}

.sidebar { width: 100%; }

.daftar-kartu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h1 { font-size: 1.5rem; }

/* Sasaran sentuh minimal 44x44 supaya nyaman ditekan jari */
.tombol,
.nav-link {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

/* ---------- TABLET ke atas: TAMBAHKAN ---------- */
@media (min-width: 768px) {
  .navbar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
  }

  .layout {
    flex-direction: row;
    gap: 24px;
    padding: 24px;
  }

  .sidebar {
    width: 250px;
    flex-shrink: 0;
  }

  .daftar-kartu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .kartu { flex: 1 1 280px; }

  h1 { font-size: 2rem; }
}

/* ---------- DESKTOP lebar: batasi lebar baca ---------- */
@media (min-width: 1200px) {
  .layout {
    max-width: 1200px;      /* baris terlalu panjang sulit dibaca */
    margin: 0 auto;         /* tengahkan */
  }

  h1 { font-size: 2.5rem; }
}

/* ---------- Menghormati pengguna yang tak suka animasi ---------- */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}`,

    html: String.raw`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />

  <!-- TANPA BARIS INI, SELURUH MEDIA QUERY DI ATAS
       TIDAK BERPENGARUH SAMA SEKALI.
       Ponsel akan berpura-pura layarnya 980px lebar,
       sehingga max-width: 768px tidak pernah cocok. -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>ByteBross Study</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="navbar">
    <img src="logo.png" alt="Logo ByteBross Study" />
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">Kelas</a>
  </nav>

  <div class="layout">
    <aside class="sidebar">
      <h2>Materi</h2>
    </aside>

    <main>
      <h1>Selamat Datang</h1>
      <div class="daftar-kartu">
        <article class="kartu">Web Desain</article>
        <article class="kartu">Struktur Data</article>
        <article class="kartu">Sistem Operasi</article>
      </div>
    </main>
  </div>
</body>
</html>`
  },

  output: `Perilaku tata letak pada tiga lebar layar:

  < 768px  (ponsel) -- gaya DASAR, tanpa media query
    navbar   : menumpuk ke bawah
    layout   : satu kolom
    sidebar  : lebar penuh
    kartu    : menumpuk
    h1       : 1.5rem

  768px - 1199px (tablet) -- min-width: 768px aktif
    navbar   : mendatar, logo kiri menu kanan
    layout   : dua kolom
    sidebar  : 250px tetap
    kartu    : berjajar, pindah baris kalau sempit
    h1       : 2rem

  >= 1200px (desktop) -- kedua media query aktif
    layout   : dibatasi 1200px, ditengahkan
    h1       : 2.5rem


Pengaruh satuan saat pengguna menaikkan
ukuran huruf peramban dari 16px ke 20px:

  font-size: 16px    -> tetap 16px   (pengaturan DIABAIKAN)
  font-size: 1rem    -> jadi 20px    (ikut)
  font-size: 2rem    -> jadi 40px    (ikut)`,

  kesalahanUmum: [
    {
      salah: 'Menulis media query tanpa menyertakan meta viewport di HTML.',
      kenapa: 'Ponsel berpura-pura layarnya selebar sekitar 980px, merender halaman desktop, lalu mengecilkannya. Media query max-width 768px tidak pernah cocok karena ponsel merasa lebarnya 980. Akibatnya orang mengira CSS responsifnya yang salah dan menghabiskan waktu memperbaiki bagian yang sebenarnya sudah benar.',
      benar: 'Selalu sertakan meta viewport dengan width=device-width dan initial-scale=1 sebelum menulis media query apa pun.'
    },
    {
      salah: 'Memakai px untuk seluruh ukuran huruf.',
      kenapa: 'Pengaturan ukuran huruf peramban jadi diabaikan sepenuhnya, sehingga pengguna dengan penglihatan terbatas yang menaikkannya tidak melihat perubahan apa pun. Situsnya tetap kecil dan tidak terbaca bagi mereka.',
      benar: 'Pakai rem untuk ukuran huruf, dan biarkan html memakai font-size 100% supaya mengikuti pilihan pengguna.'
    },
    {
      salah: 'Menentukan breakpoint dari daftar ukuran perangkat populer.',
      kenapa: 'Ukuran perangkat terus berubah setiap tahun, dan mengejarnya adalah pekerjaan tanpa akhir. Tata letak yang dipatok ke ukuran iPhone tertentu akan salah di perangkat berikutnya, dan tidak menjelaskan apa pun tentang kapan tata letak itu sebenarnya mulai jelek.',
      benar: 'Perkecil jendela peramban perlahan sampai tata letakmu mulai berantakan, lalu taruh breakpoint di titik itu. Breakpoint mengikuti isi, bukan perangkat.'
    },
    {
      salah: 'Mencampur pendekatan desktop first dan mobile first dalam satu proyek.',
      kenapa: 'Sebagian aturan memakai max-width dan sebagian min-width dengan angka yang sama, sehingga tepat di titik breakpoint keduanya cocok sekaligus dan yang menang bergantung pada urutan penulisan. Hasilnya tampilan yang berubah-ubah tanpa pola yang bisa ditalar.',
      benar: 'Pilih satu pendekatan dan pakai konsisten. Kalau terpaksa mencampur, pasangkan max-width 767.98px dengan min-width 768px supaya tidak tumpang tindih.'
    },
    {
      salah: 'Memakai width: 100% pada gambar alih-alih max-width: 100%.',
      kenapa: 'Gambar kecil ikut dipaksa melar memenuhi wadahnya, sehingga tampil buram dan pecah. Yang diinginkan sebenarnya adalah batas atas, bukan paksaan untuk selalu penuh.',
      benar: 'Pakai max-width: 100% bersama height: auto. Gambar besar menyusut mengikuti wadah, gambar kecil tetap pada ukuran aslinya.'
    }
  ],

  analogi: `Bayangkan menata perabot di rumah yang **dindingnya bisa bergerak**.

Kadang ruangannya selebar kamar kos, kadang selebar aula. **Satu susunan perabot** harus masuk akal di keduanya.

**Media query** adalah aturan *"kalau ruangannya lebih sempit dari sekian meter, susun begini"*.

Sekarang bedanya dua pendekatan:

**Desktop first** adalah menata aula mewah dulu — sofa besar, meja panjang, dua lemari — lalu untuk kamar kos kamu menulis daftar panjang berisi *"buang sofanya, lipat mejanya, singkirkan satu lemari"*. Setiap kali kamu menambah perabot di aula, kamu **wajib ingat** menambahkan satu baris pembuangan lagi. Yang terlupa akan menyumbat kamar kos.

**Mobile first** adalah menata kamar kos dulu — satu kasur, satu meja lipat. Lalu untuk aula kamu menulis *"tambahkan sofa, tambahkan lemari"*. Kalau kamu lupa menambah sesuatu, **aulanya cuma terlihat lengang** — jauh lebih tidak merusak daripada kamar kos yang tersumbat.

Sekarang **meta viewport**, dan ini yang paling penting. Bayangkan kamu menulis semua aturan itu dengan rapi, tetapi **tukangnya mengukur ruangan dengan meteran yang salah** — dia selalu melaporkan "ruangan ini 980 sentimeter" berapa pun ukuran sebenarnya.

Seluruh aturanmu jadi percuma. Bukan karena aturannya salah, melainkan karena **ukurannya tidak pernah sampai dengan benar**. Itulah yang terjadi tanpa meta viewport.

Dan soal **rem lawan px**: bayangkan tamu yang meminta kursi lebih tinggi. Dengan \`rem\`, seluruh perabot ikut menyesuaikan proporsinya. Dengan \`px\`, kamu sudah **memaku semua perabot ke lantai** — permintaannya tidak bisa dipenuhi sama sekali, dan tamu itu terpaksa pulang.`,

  latihan: [
    'Jelaskan fungsi meta viewport dan apa yang terjadi kalau dihilangkan. Kenapa kesalahan ini sering disangka masalah CSS?',
    'Tulis ulang media query berikut dari desktop first menjadi mobile first: layout dua kolom yang menumpuk di bawah 768px.',
    'Jelaskan perbedaan px, rem, dan em untuk ukuran huruf, lalu jelaskan siapa yang dirugikan kalau seluruh situs memakai px.',
    'Jelaskan kenapa breakpoint sebaiknya ditentukan dari kapan tata letak mulai jelek, bukan dari ukuran perangkat populer.',
    'Tuliskan satu aturan CSS yang membuat semua gambar responsif, dan jelaskan kenapa max-width lebih tepat daripada width.',
    'Ambil satu halaman dari proyekmu, perkecil jendela peramban perlahan, dan catat pada lebar berapa tata letaknya mulai berantakan. Tuliskan media query yang memperbaikinya.'
  ]
});

TOPICS.push({
  id: 'web-dom',
  judul: 'JavaScript DOM & Event',
  kategori: 'web-desain',
  tag: ['DOM', 'querySelector', 'addEventListener', 'classList', 'event', 'delegation'],
  ringkas: 'Membuat halaman menanggapi sentuhan — persis yang dipakai di proyek BitByteBros.',

  fungsi: `**Mengubah halaman setelah dimuat, dan menanggapi apa yang dilakukan pengguna.**

Terpakai di:

- **Formulir interaktif** — validasi sebelum dikirim, kolom yang muncul sesuai pilihan
- **Menampilkan data** dari API tanpa memuat ulang halaman
- **Komponen antarmuka** — tab, modal, akordeon, menu
- **Pemrograman Web** — dasar dari kerangka kerja mana pun yang akan kamu pakai

Dua hal yang paling sering menjatuhkan pemula:

- **Skrip berjalan sebelum HTML ada** — \`querySelector\` mengembalikan \`null\`
- **Memakai innerHTML dengan masukan pengguna** — itu celah XSS langsung

Yang kedua bukan sekadar soal kerapian; ia lubang keamanan yang sungguhan, dan kamu akan menemuinya lagi di Pemrograman Web II.`,

  praktik: {
    tujuan: `Kamu bisa memanipulasi halaman dengan aman, menangani peristiwa dengan efisien, dan menghindari celah XSS.`,
    alat: [
      'Editor teks',
      'Peramban dengan Console dan Developer Tools'
    ],
    langkah: [
      { judul: 'Pastikan skripmu berjalan setelah HTML ada',
        isi: `Tiga cara, dan yang pertama paling sederhana:

- taruh \`<script>\` **sebelum \`</body>\`**
- atau pakai \`<script defer src="...">\` di head
- atau bungkus dengan \`document.addEventListener('DOMContentLoaded', ...)\`

Kalau \`querySelector\`-mu mengembalikan \`null\`, ini penyebabnya sembilan dari sepuluh kali.` },
      { judul: 'Pilih elemen dengan selector CSS',
        isi: `- \`document.querySelector('.kelas')\` — yang pertama cocok
- \`document.querySelectorAll('.kelas')\` — semua, hasilnya \`NodeList\`

Untuk mengulang \`NodeList\` dengan aman, ubah dulu: \`[...document.querySelectorAll('.x')]\` lalu pakai \`forEach\` atau \`map\`.` },
      { judul: 'Pakai textContent, bukan innerHTML',
        isi: `\`innerHTML\` **menjalankan** HTML yang kamu masukkan. Kalau isinya berasal dari pengguna, skrip di dalamnya ikut berjalan.

Buktikan sendiri: masukkan tag gambar dengan atribut \`onerror\` lewat \`innerHTML\` dan lihat ia berjalan.

Lalu coba yang sama dengan \`textContent\` — ia ditampilkan sebagai teks biasa. Pakai ini secara bawaan.` },
      { judul: 'Pahami event bubbling',
        isi: `Peristiwa naik dari elemen yang diklik ke induknya, terus sampai \`document\`.

Buktikan: pasang \`click\` pada tombol dan pada wadahnya, lalu klik tombolnya. **Keduanya** terpanggil.

\`event.stopPropagation()\` menghentikannya, tetapi pakai dengan hemat — ia sering menyebabkan perilaku yang membingungkan di tempat lain.` },
      { judul: 'Pakai delegasi peristiwa',
        isi: `Untuk seratus tombol, jangan pasang seratus pendengar. Pasang **satu** di wadahnya, lalu periksa \`event.target\`.

Manfaatnya dua: jauh lebih hemat, **dan** tombol yang ditambahkan **setelah** halaman dimuat ikut bekerja tanpa pemasangan ulang.

Ini teknik yang terpakai di hampir semua aplikasi nyata.` },
      { judul: 'Tangani pengiriman formulir',
        isi: `- \`form.addEventListener('submit', e => { e.preventDefault(); ... })\`

\`preventDefault\` mencegah halaman dimuat ulang. Tanpa itu, kodemu berjalan lalu halamannya langsung berpindah dan kamu tidak sempat melihat apa pun.

Ambil nilainya dengan \`new FormData(form)\` — lebih rapi daripada mengambil satu per satu.` },
      { judul: 'Kurangi penataan ulang',
        isi: `Menyisipkan seratus elemen satu per satu memaksa peramban menghitung ulang tata letak seratus kali.

Kumpulkan dulu ke \`DocumentFragment\`, lalu sisipkan sekali.

Ukur keduanya dengan \`performance.now()\` untuk seribu elemen — selisihnya nyata.` }
    ],
    cek: [
      'Skripmu tidak pernah mengembalikan null saat memilih elemen',
      'Masukan pengguna yang berisi tag HTML ditampilkan sebagai teks, bukan dijalankan',
      'Satu pendengar dengan delegasi menangani semua tombol, termasuk yang ditambah kemudian'
    ]
  },
  judulLogicSyntax: 'Bedah Kode — kenapa ditulis begitu',

  konsep: `
**DOM** (*Document Object Model*) adalah **gambaran halaman sebagai pohon objek** yang bisa disentuh JavaScript.

Ketika peramban membaca HTML-mu, ia membangun pohon ini. Mengubah pohonnya berarti **mengubah halaman yang terlihat**, seketika.

**Memilih elemen**

- **\`document.getElementById('nama')\`** — satu elemen berdasarkan id
- **\`document.querySelector('.kelas')\`** — **elemen pertama** yang cocok dengan selector CSS
- **\`document.querySelectorAll('.kelas')\`** — **semua** yang cocok

Dua yang terakhir menerima **selector CSS apa pun**, jadi kamu sudah tahu cara memakainya dari topik CSS.

Perhatikan bahwa \`querySelectorAll\` mengembalikan **NodeList**, bukan array biasa. Ia punya \`forEach\`, tetapi **tidak punya** \`map\` atau \`filter\`. Kalau butuh, ubah dulu dengan \`Array.from(...)\`.

**Mengubah elemen**

- **\`.textContent\`** — mengubah teksnya. **Aman.**
- **\`.innerHTML\`** — mengubah isinya sebagai HTML. **Berbahaya** kalau isinya berasal dari pengguna.
- **\`.classList.add / remove / toggle / contains\`** — mengurus kelas CSS
- **\`.style.warna\`** — mengubah gaya langsung
- **\`.getAttribute / setAttribute\`** — membaca dan menulis atribut

**Mengubah kelas, bukan gaya langsung**

Ini prinsip yang layak dipegang. Alih-alih menulis \`el.style.display = 'block'\` di JavaScript, lebih baik \`el.classList.add('aktif')\` dan biarkan **CSS yang menentukan apa arti "aktif"**.

Keuntungannya: tampilan tetap terkumpul di CSS, dan mengubahnya nanti tidak perlu menyentuh JavaScript sama sekali.

**Event**

\`element.addEventListener('click', function () { ... });\`

Event yang sering dipakai: \`click\`, \`submit\`, \`input\`, \`change\`, \`keydown\`, \`mouseenter\`, \`DOMContentLoaded\`.

**\`DOMContentLoaded\` — kenapa perlu**

Kalau \`<script>\` berada di \`<head>\`, ia berjalan **sebelum** elemen HTML ada. \`querySelector\` akan mengembalikan \`null\`, dan kodemu gagal dengan *"Cannot read properties of null"*.

Dua penyelesaiannya:

- Bungkus dengan \`document.addEventListener('DOMContentLoaded', ...)\` — inilah yang dipakai di proyekmu
- Taruh \`<script>\` **di akhir \`<body>\`**, atau pakai atribut \`defer\`

**Objek event dan \`this\`**

Fungsi penanganan menerima objek \`event\`, dan di dalamnya:

- **\`event.target\`** — elemen yang **benar-benar** disentuh
- **\`event.currentTarget\`** — elemen yang **dipasangi** penanganan
- **\`event.preventDefault()\`** — batalkan perilaku bawaan, misalnya form yang mengirim dan memuat ulang halaman

Perhatikan: pada **\`function\` biasa**, \`this\` menunjuk elemen yang dipasangi penanganan. Pada **arrow function**, \`this\` **tidak** menunjuk elemen itu. Proyekmu memakai \`function\` biasa justru untuk bisa memakai \`this\` — dan itu pilihan yang tepat.

**Event delegation**

Alih-alih memasang penanganan pada seratus tombol, pasang **satu** pada induknya lalu periksa \`event.target\`.

Ini lebih hemat, dan yang lebih penting: **ikut bekerja pada elemen yang ditambahkan belakangan** — sesuatu yang tidak dilakukan pemasangan satu per satu.
`,

  logicSyntax: [
    {
      bahasa: 'js',
      kode: '// Dari proyek BitByteBros\ndocument.addEventListener("DOMContentLoaded", function () {\n  document.querySelectorAll(".matkul-item").forEach(function (item) {\n    item.addEventListener("click", function () {\n      var key = this.getAttribute("data-matkul");\n      var desc = document.getElementById("desc-" + key);\n      desc.textContent = matkulInfo[key];\n      desc.style.display = "block";\n    });\n  });\n});',
      penjelasan: `
Ini kode dari proyekmu sendiri, dan beberapa pilihannya sudah tepat.

**\`DOMContentLoaded\`** membungkus semuanya. Ini yang membuat kodenya tetap bekerja meski \`<script>\` diletakkan di \`<head>\`. Tanpa pembungkus itu, \`querySelectorAll\` berjalan sebelum elemennya ada, mengembalikan daftar kosong, dan **tidak ada satu pun penanganan yang terpasang** — tanpa pesan kesalahan apa pun. Gejalanya: tombol yang sama sekali tidak menanggapi.

**\`function\` biasa, bukan arrow** — dan ini disengaja dengan benar. Di dalamnya dipakai \`this\` untuk menunjuk elemen yang diklik. Kalau diganti arrow function, \`this\` **tidak lagi menunjuk elemen itu**, dan \`this.getAttribute\` akan gagal. Kalau kamu lebih suka arrow, gantinya adalah \`event.currentTarget\`.

**\`data-matkul\`** menunjukkan pola yang bagus: **HTML menyimpan datanya, JavaScript membacanya.** Alternatifnya — menulis if bercabang berdasarkan teks yang tampil — akan rusak begitu tulisannya diubah. Dengan atribut data, tampilan dan logika terpisah rapi.

Satu hal yang bisa diperbaiki: **\`desc.style.display = "block"\`** mengatur tampilan langsung dari JavaScript. Lebih baik \`desc.classList.add("tampil")\`, lalu biarkan CSS menentukan apa arti \`.tampil\`. Dengan begitu, kalau nanti kamu ingin menambahkan animasi muncul, cukup menyunting CSS tanpa menyentuh JavaScript.

Kaitannya dengan **keamanan**: kode ini memakai \`.textContent\`, bukan \`.innerHTML\`. Itu pilihan yang aman. Kalau isinya berasal dari pengguna dan dimasukkan lewat \`.innerHTML\`, tag \`<script>\` di dalamnya bisa ikut berjalan — itulah celah **XSS** yang kamu pelajari di topik Keamanan Informasi.
`
    },
    {
      bahasa: 'js',
      kode: '// BURUK: satu penanganan untuk tiap tombol\ndocument.querySelectorAll(".hapus").forEach(function (b) {\n  b.addEventListener("click", hapusBaris);\n});\n// Tombol yang DITAMBAHKAN NANTI tidak punya penanganan\n\n// BAIK: satu penanganan di induk (event delegation)\ndocument.querySelector(".daftar").addEventListener("click", function (e) {\n  if (e.target.classList.contains("hapus")) {\n    hapusBaris(e);\n  }\n});\n// Tombol baru langsung ikut bekerja',
      penjelasan: `
Perbedaannya baru terasa ketika halaman **berubah setelah dimuat**, dan itu sangat lazim.

Pada versi pertama, \`querySelectorAll\` mengambil **potret sesaat** dari tombol yang ada **saat itu**. Tombol yang kamu tambahkan lima detik kemudian lewat JavaScript **tidak pernah dilewati perulangan itu**, sehingga tidak punya penanganan.

Gejalanya sangat khas dan membingungkan: **tombol lama berfungsi, tombol baru diam saja.** Padahal HTML-nya sama persis, kelasnya sama, dan tidak ada pesan kesalahan.

Versi kedua memasang **satu** penanganan di induknya. Cara kerjanya bergantung pada **event bubbling**: ketika kamu mengklik tombol, event-nya **merambat naik** ke induk, kakek, sampai \`document\`. Induk cukup memeriksa \`event.target\` untuk tahu apa yang sebenarnya diklik.

Karena penanganannya menempel di induk yang **tidak pernah diganti**, tombol baru sebanyak apa pun langsung ikut bekerja.

Keuntungan lainnya soal ingatan: seratus tombol dengan seratus penanganan memakan lebih banyak memori daripada satu penanganan. Pada daftar panjang, bedanya nyata.

Di sinilah perbedaan **\`event.target\`** dan **\`event.currentTarget\`** menjadi penting:

- **\`target\`** — yang **benar-benar** diklik, bisa jauh di dalam
- **\`currentTarget\`** — elemen yang **dipasangi** penanganan, di sini induknya

Ada satu jebakan yang perlu diketahui: kalau tombolmu berisi elemen lain, misalnya \`<button class="hapus"><span>Hapus</span></button>\`, maka mengklik tulisannya membuat \`event.target\` menunjuk \`<span>\` — bukan tombolnya. Pemeriksaan \`classList.contains("hapus")\` akan gagal.

Penyelesaiannya memakai **\`e.target.closest(".hapus")\`**, yang menelusuri naik sampai menemukan elemen yang cocok. Proyekmu sudah memakai \`closest\` di bagian lain, jadi polanya sudah kamu kenal.
`
    }
  ],

  kode: {
    js: String.raw`// ============================================
// DOM & Event -- pola dari proyek BitByteBros
// ============================================

var matkulInfo = {
  web:      "Web Desain: tampilan dan interaksi website.",
  struktur: "Struktur Data: menyimpan dan mengelola data.",
  sistem:   "Sistem Operasi: dasar-dasar dan cara kerjanya."
};

// Tanpa pembungkus ini, script di <head> berjalan
// SEBELUM elemennya ada -> querySelectorAll kosong,
// tidak ada penanganan terpasang, dan TIDAK ADA pesan error.
document.addEventListener("DOMContentLoaded", function () {

  // ---------- 1. Memilih & memasang penanganan ----------
  document.querySelectorAll(".matkul-item").forEach(function (item) {
    item.addEventListener("click", function () {
      // function biasa dipakai supaya "this" menunjuk elemen ini
      var key = this.getAttribute("data-matkul");
      var desc = document.getElementById("desc-" + key);

      // Tutup semua yang lain dulu
      document.querySelectorAll(".matkul-desc").forEach(function (d) {
        d.classList.remove("tampil");
        d.textContent = "";
      });

      // textContent, BUKAN innerHTML -- aman dari XSS
      desc.textContent = matkulInfo[key];

      // Ubah KELAS, bukan style langsung.
      // Biarkan CSS yang menentukan arti "tampil".
      desc.classList.add("tampil");
    });
  });

  // ---------- 2. Event delegation ----------
  var daftar = document.querySelector(".daftar-tugas");
  if (daftar) {
    daftar.addEventListener("click", function (e) {
      // closest menelusuri NAIK, jadi klik pada <span>
      // di dalam tombol pun tetap tertangkap
      var tombol = e.target.closest(".hapus");
      if (!tombol) return;

      tombol.closest("li").remove();
    });
  }

  // ---------- 3. Form: cegah muat ulang halaman ----------
  var form = document.querySelector(".form-tambah");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();          // tanpa ini, halaman MEMUAT ULANG

      var input = form.querySelector("input");
      var nilai = input.value.trim();
      if (nilai === "") return;

      var li = document.createElement("li");
      li.textContent = nilai;      // aman

      var hapus = document.createElement("button");
      hapus.className = "hapus";
      hapus.textContent = "Hapus";
      li.appendChild(hapus);

      daftar.appendChild(li);
      input.value = "";

      // Tombol hapus ini langsung berfungsi TANPA
      // dipasangi penanganan, berkat delegation di atas.
    });
  }

  // ---------- 4. target vs currentTarget ----------
  var kartu = document.querySelector(".kartu-demo");
  if (kartu) {
    kartu.addEventListener("click", function (e) {
      console.log("target        :", e.target.tagName);
      console.log("currentTarget :", e.currentTarget.tagName);
      // Klik pada <span> di dalam kartu:
      //   target        = SPAN   (yang benar-benar diklik)
      //   currentTarget = DIV    (yang dipasangi penanganan)
    });
  }
});`,

    html: String.raw`<!-- Struktur untuk kode JavaScript di atas -->

<ul class="matkul-list">
  <li class="matkul-item" data-matkul="web">Web Desain</li>
  <li class="matkul-item" data-matkul="struktur">Struktur Data</li>
  <li class="matkul-item" data-matkul="sistem">Sistem Operasi</li>
</ul>

<p class="matkul-desc" id="desc-web"></p>
<p class="matkul-desc" id="desc-struktur"></p>
<p class="matkul-desc" id="desc-sistem"></p>

<!-- Event delegation: penanganan dipasang di UL, bukan di tiap tombol -->
<form class="form-tambah">
  <input type="text" placeholder="Tugas baru" />
  <button type="submit">Tambah</button>
</form>

<ul class="daftar-tugas">
  <li>Kerjakan laporan <button class="hapus">Hapus</button></li>
  <li>Baca materi <button class="hapus"><span>Hapus</span></button></li>
</ul>

<!-- Perhatikan tombol kedua berisi <span>.
     Tanpa closest(), e.target akan menunjuk SPAN
     dan pemeriksaan kelas akan gagal. -->

<div class="kartu-demo">
  <span>Klik tulisan ini</span>
</div>

<!-- defer: berjalan setelah HTML selesai dibaca.
     Alternatif dari membungkus dengan DOMContentLoaded. -->
<script src="js/script.js" defer></script>`,

    css: String.raw`/* JavaScript cukup menambah/membuang kelas.
   CSS yang menentukan APA ARTINYA. */

.matkul-desc {
  display: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.matkul-desc.tampil {
  display: block;
  opacity: 1;
}

.matkul-item {
  cursor: pointer;
  padding: 8px 12px;
  transition: background 0.2s;
}

.matkul-item:hover  { background: #f0f0f0; }
.matkul-item:focus-visible {
  outline: 2px solid #049cd8;
}

/* Kalau nanti ingin mengubah cara munculnya,
   cukup sunting berkas ini -- JavaScript tidak disentuh. */`
  },

  output: `Urutan kejadian saat mengklik "Web Desain":

  1. DOMContentLoaded sudah berjalan, penanganan terpasang
  2. Klik -> this menunjuk <li class="matkul-item">
  3. getAttribute("data-matkul") -> "web"
  4. getElementById("desc-web")  -> <p id="desc-web">
  5. semua .matkul-desc dibersihkan
  6. textContent diisi keterangannya
  7. classList.add("tampil") -> CSS menampilkannya


target vs currentTarget saat mengklik <span> di dalam .kartu-demo:

  target        : SPAN     (yang benar-benar diklik)
  currentTarget : DIV      (yang dipasangi penanganan)


Event delegation -- kenapa tombol baru ikut berfungsi:

  klik <span>Hapus</span>
    -> event merambat NAIK (bubbling):
       SPAN -> BUTTON -> LI -> UL.daftar-tugas
    -> penanganan di UL menerima event
    -> e.target.closest(".hapus") menelusuri naik
       dari SPAN dan menemukan BUTTON
    -> baris dihapus

  Tanpa closest(), pemeriksaan gagal karena
  e.target adalah SPAN, bukan BUTTON.`,

  kesalahanUmum: [
    {
      salah: 'Menjalankan querySelector di script yang ada di head tanpa menunggu DOMContentLoaded.',
      kenapa: 'Script berjalan sebelum elemen HTML dibuat, sehingga querySelector mengembalikan null dan querySelectorAll mengembalikan daftar kosong. Pada querySelectorAll tidak ada pesan kesalahan sama sekali, penanganannya cuma tidak terpasang, dan tombol diam saja tanpa petunjuk apa pun.',
      benar: 'Bungkus dengan DOMContentLoaded, atau taruh tag script di akhir body, atau tambahkan atribut defer pada tag script-nya.'
    },
    {
      salah: 'Mengganti function biasa dengan arrow function pada penanganan yang memakai this.',
      kenapa: 'Arrow function tidak punya this sendiri; ia mewarisi dari cakupan di luarnya, yang biasanya bukan elemen yang diklik. Akibatnya this.getAttribute gagal dengan pesan yang membingungkan, padahal kodenya terlihat sama dengan versi yang bekerja.',
      benar: 'Pakai function biasa kalau butuh this, atau pakai arrow function dengan event.currentTarget sebagai gantinya.'
    },
    {
      salah: 'Memakai innerHTML untuk memasukkan teks yang berasal dari pengguna.',
      kenapa: 'Isi yang dimasukkan diperlakukan sebagai HTML, sehingga tag script atau atribut onerror di dalamnya bisa ikut berjalan. Inilah celah XSS, dan penyerang bisa mencuri sesi pengguna lain lewat komentar atau nama profil.',
      benar: 'Pakai textContent untuk memasukkan teks. Sisakan innerHTML hanya untuk HTML yang kamu tulis sendiri, bukan yang datang dari pengguna.'
    },
    {
      salah: 'Memasang penanganan satu per satu pada elemen yang jumlahnya bisa bertambah.',
      kenapa: 'querySelectorAll hanya mengambil potret elemen yang ada saat itu, sehingga elemen yang ditambahkan belakangan tidak punya penanganan. Gejalanya membingungkan: tombol lama berfungsi, tombol baru diam, padahal HTML-nya identik dan tidak ada pesan kesalahan.',
      benar: 'Pakai event delegation dengan memasang satu penanganan di induk yang tidak pernah diganti, lalu periksa e.target.closest untuk mengenali sasarannya.'
    },
    {
      salah: 'Lupa memanggil preventDefault pada penanganan submit form.',
      kenapa: 'Perilaku bawaan form adalah mengirim data dan memuat ulang halaman, sehingga seluruh perubahan yang baru dibuat JavaScript lenyap seketika. Gejalanya berupa halaman yang berkedip lalu kembali ke keadaan semula, dan sering disangka kodenya tidak berjalan.',
      benar: 'Panggil e.preventDefault() di baris pertama penanganan submit, sebelum mengerjakan apa pun yang lain.'
    }
  ],

  analogi: `Bayangkan halaman web sebagai **pohon keluarga**, dan DOM adalah **silsilahnya**.

\`querySelector\` adalah cara **menunjuk satu anggota keluarga**. \`textContent\` adalah **mengganti namanya**. \`classList\` adalah **menempelkan atau mencabut label** di bajunya.

Sekarang **\`DOMContentLoaded\`**. Bayangkan kamu datang ke acara keluarga lalu langsung berteriak *"Pak Budi, tolong maju!"* — padahal **acaranya belum mulai dan belum ada seorang pun yang datang**. Tidak ada yang menjawab, dan tidak ada yang memberitahumu bahwa ruangannya kosong. Kamu cuma berdiri bingung.

Menunggu \`DOMContentLoaded\` adalah menunggu **semua orang duduk** dulu.

Untuk **event delegation**, bayangkan kamu mengurus antrean seratus orang.

Cara pertama: kamu **mendatangi setiap orang** dan berkata *"kalau kamu mau bertanya, angkat tangan dan aku akan datang"*. Melelahkan — dan yang lebih parah, **orang yang datang belakangan tidak pernah kamu beri tahu**. Mereka mengangkat tangan dan kamu tidak pernah datang.

Cara kedua: kamu berdiri di **pintu ruangan** dan berkata *"siapa pun yang mau bertanya, datang ke sini"*. Satu pengumuman, dan **berlaku untuk semua orang** — termasuk yang baru masuk sejam kemudian.

Itulah bedanya, dan itulah kenapa cara kedua yang dipakai untuk daftar yang isinya bertambah.

Dan **\`target\` lawan \`currentTarget\`**: kalau seseorang datang ke pintu sambil menggendong anaknya, dan **anaknya** yang menyodorkan kertas — maka \`target\` adalah anaknya, sedangkan \`currentTarget\` adalah **pintu tempat kamu berdiri**. Untuk tahu siapa orang tuanya, kamu perlu **menelusuri ke atas** — itulah \`closest()\`.`,

  latihan: [
    'Jelaskan apa itu DOM, lalu sebutkan tiga cara memilih elemen beserta perbedaannya.',
    'Jelaskan kenapa script di head perlu dibungkus DOMContentLoaded, dan sebutkan dua cara lain untuk mengatasinya.',
    'Jelaskan perbedaan textContent dan innerHTML, lalu jelaskan kapan innerHTML berbahaya dan kenapa.',
    'Tuliskan kode yang menampilkan keterangan mata kuliah saat item diklik, memakai atribut data-* dan classList, bukan style langsung.',
    'Jelaskan apa itu event delegation, kenapa ia diperlukan untuk elemen yang ditambahkan belakangan, dan bagaimana closest() membantu ketika tombol berisi elemen lain.',
    'Jelaskan perbedaan event.target dan event.currentTarget dengan satu contoh HTML yang membuat keduanya menunjuk elemen berbeda.'
  ]
});
