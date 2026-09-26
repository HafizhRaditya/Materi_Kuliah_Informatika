# Catatan Kuliah Informatika

Situs belajar **lokal dan luring** berisi catatan seluruh mata kuliah
Informatika Unsoed — dari semester 1 sampai 5.

Fokusnya bukan menyalin kode, melainkan **memahami kenapa** sesuatu ditulis
atau dikerjakan seperti itu. Tiap topik selalu menjawab tiga hal: **dipakai
untuk apa**, **kenapa begitu**, dan **langkah praktiknya bagaimana**.

---

## Cara membuka

**Versi daring:** https://hafizhraditya.github.io/Materi_Kuliah_Informatika/

**Versi luring:** klik dua kali `index.html`. Selesai — tidak perlu server,
tidak perlu internet, tidak perlu memasang apa pun.

Situs ini sengaja dibuat tanpa `fetch()` dan tanpa *build step*, supaya
benar-benar bisa dibuka langsung dari berkas (`file://`) maupun disajikan
apa adanya lewat GitHub Pages. Berkas `.nojekyll` di akar mematikan pemrosesan
Jekyll, yang kalau dibiarkan akan mengabaikan berkas berawalan titik.

### Pintasan papan ketik

| Tombol | Fungsi |
|--------|--------|
| `/` | Lompat ke kotak pencarian |
| `Esc` | Keluar dari kotak pencarian / tutup menu |

---

## Isi saat ini

**187 topik** di **35 mata kuliah**, ditambah glosarium.

| Semester | Mata kuliah |
|----------|-------------|
| **1** | Logika Informatika · Algoritma dan Pemrograman · Basis Data · Organisasi dan Struktur Komputer · Pengantar Teknologi Informasi · Matematika Dasar |
| **2** | Struktur Data · Basis Data II · Sistem Operasi · Web Desain · Matematika Diskrit · Probabilitas dan Statistika · E-Commerce |
| **3** | Pemrograman Berorientasi Objek · Kecerdasan Buatan · Jaringan Komputer · Pemrograman Web · Analisis & Desain Sistem · Aljabar Linear |
| **4** | Data Mining · Sistem Pendukung Keputusan · Rekayasa Perangkat Lunak · Interaksi Manusia & Komputer · Teknologi Multimedia · Komputer Forensik · Logika Fuzzy · Pemrograman Web II |
| **5** | Sistem Informasi · Uji Kualitas Perangkat Lunak · Manajemen Proyek Informatika · Audit Sistem Informasi · Pemrograman Mobile · Kewirausahaan |
| — | Keamanan Informasi (belum ada berkas kuliahnya — disusun dari referensi luar) |
| — | Materi Pelengkap (Big-O, sorting O(n log n), dynamic programming, Dijkstra) |

Urutan kategori di sidebar mengikuti urutan kurikulum, bukan abjad.

### Dari mana materinya

Sebagian besar disusun dari **slide dan berkas kuliah sendiri** di
`E:/Tugas Kuliah`. Untuk mata kuliah yang berkasnya tidak lengkap atau tidak
tersimpan, materinya disusun dari pengetahuan umum dan **dicatat di kepala tiap
berkas data** — supaya jelas mana yang berasal dari sumber kuliah dan mana yang
tidak. Contohnya `data/aljabar-linear.js`, `data/probstat.js`,
`data/ecommerce.js`, `data/mpi.js`, `data/mobile.js`, dan `data/kwu.js`.

Seluruh kode contoh **benar-benar dijalankan**, dan isi kolom `output` disalin
dari hasil eksekusinya — bukan ditulis tangan. Pengecualiannya Kotlin dan Dart,
yang tidak terpasang di komputer ini; keduanya ditemani model Python yang
dijalankan sungguhan, dan hal itu disebutkan di kepala berkasnya.

---

## Struktur folder

```
Aprak Alpro/
├─ index.html              <- buka berkas ini
├─ css/
│  └─ style.css            <- semua tampilan
├─ js/
│  ├─ store.js             <- wadah data kosong (dimuat paling awal)
│  ├─ highlight.js         <- pewarna syntax + pemformat teks
│  └─ app.js               <- navigasi, pencarian, render materi
├─ tools/                  <- alat bantu, dijalankan manual
└─ data/                   <- SEMUA MATERI ADA DI SINI
   ├─ kategori.js          <- daftar & urutan mata kuliah
   ├─ logika.js
   ├─ algoritma-dasar.js
   ├─ ... (satu berkas per mata kuliah)
   └─ glosarium.js
```

Untuk menambah atau mengubah materi, **cukup sentuh folder `data/`.** Folder
`js/` dan `css/` tidak perlu diutak-atik.

---

## Cara menambah topik baru

### 1. Tulis topiknya di berkas `data/`

Buka berkas mata kuliah yang sesuai, lalu tambahkan satu blok
`TOPICS.push({ ... });` di posisi yang tepat — **urutan di dalam berkas
menentukan urutan di sidebar**.

```js
TOPICS.push({
  id: 'queue',                       // wajib, huruf kecil, tanpa spasi (jadi alamat #/t/queue)
  judul: 'Queue (Antrean)',          // wajib
  kategori: 'struktur-data',         // wajib, harus cocok dengan id di data/kategori.js
  tag: ['queue', 'FIFO'],            // opsional, ikut terbaca saat mencari
  ringkas: 'Kalimat singkat di bawah judul.',

  fungsi: `Dipakai untuk apa — kapan materi ini benar-benar terpakai.`,

  praktik: {                         // langkah yang bisa benar-benar dikerjakan
    tujuan: 'Apa yang bisa kamu lakukan setelah menyelesaikan langkah ini.',
    alat: ['Python 3', 'Kertas'],
    langkah: [
      { judul: 'Langkah pertama', isi: `Isinya. Boleh beberapa paragraf.` }
    ],
    cek: [
      'Cara memastikan langkahnya benar-benar berhasil.'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',   // opsional, mengganti judul seksi

  konsep: `
Penjelasan materi. Boleh panjang, boleh beberapa paragraf.
`,

  logicSyntax: [
    {
      bahasa: 'c',                   // lihat daftar bahasa di bawah
      kode: 'int depan = 0;',
      penjelasan: `Kenapa ditulis begitu, dan apa yang terjadi di balik layar.`
    }
  ],

  kode: {                            // boleh diisi sebagian saja
    c:      String.raw`...`,
    python: String.raw`...`
  },

  output: `Contoh hasil saat program dijalankan.`,

  kompleksitas: {                    // opsional — untuk topik algoritma & struktur data
    tabel: [
      { operasi: 'enqueue', waktu: 'O(1)', memori: 'O(1)' }
    ],
    intuisi: `Kenapa bisa segitu — pakai bahasa manusia, bukan rumus.`
  },

  kesalahanUmum: [
    {
      salah:  'Bug yang sering dilakukan pemula.',
      kenapa: 'Penyebabnya, dan kenapa gejalanya membingungkan.',
      benar:  'Cara memperbaikinya.'
    }
  ],

  analogi: `Cara singkat menjelaskan topik ini ke orang lain.`,   // opsional

  latihan: [
    'Soal pertama.',
    'Soal kedua.'
  ]
});
```

Semua kolom **selain** `id`, `judul`, dan `kategori` boleh dihilangkan. Bagian
yang kosong otomatis tidak ditampilkan, dan **penomoran seksinya menyesuaikan
sendiri**.

Urutan seksi di halaman selalu tetap:

> Dipakai untuk Apa → Konsep → Bedah/Logic Syntax → Contoh Kode →
> **Langkah Praktik** → Kompleksitas → Kesalahan Umum → Analogi → Latihan

### 2. Kalau membuat berkas `data/` yang benar-benar baru

Daftarkan satu baris di `index.html`:

```html
<script src="data/nama-berkas-barumu.js"></script>
```

Urutannya penting: berkas `data/` harus berada **setelah** `js/store.js` dan
**sebelum** `js/app.js`. Urutan antar berkas `data/` menentukan urutan
kategorinya di sidebar, jadi sisipkan di posisi kurikulum yang tepat.

Lalu daftarkan kategorinya di `data/kategori.js` pada posisi yang sama.

---

## Aturan penulisan isi

### Teks materi (`konsep`, `penjelasan`, `analogi`, `fungsi`, dll.)

Dipakai format sederhana:

| Tulisan | Hasil |
|---------|-------|
| baris kosong | paragraf baru |
| `**tebal**` | **tebal** |
| `` `kode` `` | potongan kode di dalam kalimat |
| `- item` | daftar berpoin |
| `\| a \| b \|` + baris `\|---\|---\|` | tabel |

Tabel ditulis bergaya Markdown: baris pertama kepala, baris kedua pemisah
(`|---|---|`), sisanya isi. Tabelnya digulir sendiri kalau terlalu lebar,
sehingga halaman tidak ikut melebar.

Tanda `<` dan `>` aman ditulis apa adanya — otomatis ditangani, jadi
`<stdio.h>` tampil normal.

Yang **tidak** didukung: pagar kode gaya Markdown (```` ``` ````), judul dengan
`#`, dan penekanan miring dengan `*satu bintang*`. Pakai daftar berpoin sebagai
gantinya. `tools/uji-render.js` akan menandai kalau ada yang terlewat.

### Bahasa yang didukung

| Kunci | Bahasa | | Kunci | Bahasa |
|-------|--------|---|-------|--------|
| `c` | C | | `python` | Python |
| `cpp` | C++ | | `js` | JavaScript |
| `csharp` | C# | | `php` | PHP |
| `java` | Java | | `html` | HTML |
| `kotlin` | Kotlin | | `css` | CSS |
| `dart` | Dart | | `sql` | SQL |

Urutan tab **selalu mengikuti `URUTAN_BAHASA`** di `js/highlight.js`, bukan
urutan penulisan di berkas data. Semua bahasa opsional — isi hanya yang relevan.
Untuk menambah bahasa baru, daftarkan satu blok di `LANGS` lalu tambahkan
kuncinya ke `URUTAN_BAHASA`, keduanya di `js/highlight.js`.

### Kode contoh — selalu pakai `String.raw`

```js
c: String.raw`printf("Halo\n");`
```

**Kenapa harus `String.raw`?** Karena tanpa itu, JavaScript menganggap `\n`
sebagai perintah ganti baris, sehingga `\n` di dalam `printf` **hilang** dari
kode yang ditampilkan. Dengan `String.raw`, semua backslash tampil apa adanya.

### Aturan backtick — tiga hal yang wajib diingat

Seluruh isi topik dibungkus tanda backtick, jadi backtick punya arti khusus.
Ketiganya adalah penyebab error tersering saat menambah materi.

**1. Di dalam blok kode (`String.raw`): backtick DILARANG.**

Backtick akan menutup teksnya lebih awal dan membuat berkasnya rusak. C, C++,
C#, Java, dan Python tidak memakainya, jadi aman. **Yang perlu diwaspadai
JavaScript, Kotlin, dan Dart**, karena ketiganya punya *template string*:

```js
// SALAH — merusak berkas
js: String.raw`console.log(`Halo ${nama}`);`

// BENAR — pakai kutip biasa dan tanda +
js: String.raw`console.log("Halo " + nama);`
```

**2. `String.raw` tetap memproses `${...}`.**

Ini jebakan yang mudah terlewat: `String.raw` mematikan arti backslash, tetapi
**tidak** mematikan penyisipan nilai. Kode Kotlin atau Dart yang memakai
`"$nama"` atau `"${obj.field}"` akan gagal dimuat. Ganti dengan penyambungan
biasa memakai tanda `+`.

**3. Di dalam teks materi: backtick harus ditulis `` \` ``.**

Untuk kode sebaris di dalam `konsep`, `penjelasan`, `fungsi`, atau `analogi`,
backtick-nya wajib diberi garis miring terbalik:

```js
konsep: `
Gunakan \`private\` supaya aman.      <- BENAR
Gunakan `private` supaya aman.        <- SALAH, berkas jadi rusak
`
```

Pengecualiannya: kolom yang ditulis dengan **kutip tunggal** — seperti `salah`,
`kenapa`, `benar`, dan isi `latihan` — tidak perlu di-escape.

> **Cara cepat memastikan tidak ada yang salah:** jalankan
> `node --check data/namaberkas.js`. Kalau ada backtick yang keliru, perintah
> ini langsung menunjukkan nomor barisnya.

---

## Cara menambah kategori

Edit `data/kategori.js`. Urutan di berkas itu menentukan urutan di sidebar,
dan sebaiknya mengikuti urutan kurikulum.

```js
KATEGORI.push({
  id: 'basis-data',                   // dipakai di kolom "kategori" tiap topik
  nama: 'Basis Data',
  ringkas: 'Kalimat singkat untuk kartu di beranda.'
});
```

## Cara menambah istilah glosarium

Edit `data/glosarium.js`. Daftarnya diurutkan A–Z otomatis.

```js
GLOSARIUM.push({
  istilah: 'Deadlock',
  jenis: 'sistem operasi',            // label kecil, opsional
  definisi: `Penjelasan singkat.`,
  contoh: `Satu contoh nyata.`        // opsional
});
```

---

## Alat bantu di folder `tools/`

Kecuali yang berakhiran `.py`, semuanya dijalankan dengan Node dari akar
project.

### Pemeriksa — jalankan setiap kali selesai mengedit `data/`

**`node tools/validasi.js`** — pemeriksa struktur. Memeriksa field wajib, id
unik, backtick berpasangan, sintaks yang tidak didukung, byte NUL, `String.raw`
yang hilang, bentuk `fungsi` dan `praktik`, serta cakupan bahasa. Di akhir ia
mencetak **laporan cakupan** `fungsi` dan `praktik` per mata kuliah, sehingga
langsung terlihat mana yang belum lengkap. Daftar berkas data dibaca dari
`index.html`, jadi berkas baru otomatis ikut terperiksa.

**`node tools/uji-render.js`** — melangkah lebih jauh. Kalau `validasi.js`
memeriksa *struktur*, skrip ini benar-benar menjalankan `fmt()` dan `hl()` pada
setiap blok lalu memeriksa HTML hasilnya. Ia menangkap hal yang lolos dari
pemeriksa struktur: pagar ```` ``` ```` gaya Markdown yang menyisakan backtick
mentah, tabel Markdown yang tidak terender, tag yang tidak berpasangan, dan
bahasa yang lupa didaftarkan ke `URUTAN_BAHASA` sehingga tabnya tidak muncul.

Keduanya sebaiknya dijalankan berbarengan:

```bash
node tools/validasi.js && node tools/uji-render.js
```

### Penyisip — untuk mengedit berkas yang sudah ribuan baris

**`node tools/sisip-praktik.js <berkas-isi>`** — menyisipkan `fungsi` dan
`praktik` ke topik yang sudah ada, berpatokan pada `id`. Sifatnya *idempotent*:
topik yang sudah punya `fungsi` dilewati, jadi aman dijalankan berulang.

Berkas isinya mengekspor `{ 'id-topik': { fungsi: '...', praktik: {...} } }`.
Di dalamnya, kode sebaris ditulis `@@begini@@` — penanda itu diubah menjadi
backtick yang sudah di-escape saat disisipkan, sehingga tidak perlu memikirkan
escaping sama sekali.

**`node tools/sisip-bahasa.js <target> <tambahan>`** — menyisipkan bahasa baru
ke blok `kode` topik yang sudah ada. Berkas tambahannya mengekspor
`{ 'id-topik': { java: '...', csharp: '...' } }`.

### Pembaca berkas kuliah

Semuanya dipakai untuk **membaca bahan**, bukan untuk membangun situs.

**`node tools/baca-docx.js <berkas.docx>`** — membaca teks dari `.docx`.
Menerima berkasnya langsung dan meng-`unzip` sendiri.

**`node tools/baca-pptx.js <berkas.pptx> [slideAwal] [slideAkhir]`** — membaca
teks slide, satu blok per slide. Tanpa argumen rentang, semua slide dibaca:

```bash
node tools/baca-pptx.js "E:/Tugas Kuliah/Semester Satu/Organisasi dan Struktur Komputer/Pert-05 CPU.pptx"
```

**`python tools/baca-ppt.py <berkas.ppt>`** — untuk `.ppt` **lama** (format
biner PowerPoint 97-2003), yang tidak terbaca oleh `baca-pptx.js`. Butuh satu
pustaka: `pip install olefile`. Keluarannya kasar dan memuat teks placeholder
master serta penanda internal, jadi saring sendiri:

```bash
python tools/baca-ppt.py slide.ppt | grep -v '___PPT' | grep -v 'Click to edit'
```

**`node tools/baca-pdf.js <berkas.pdf>`** — membaca teks PDF tanpa alat luar.
Streams-nya dikembangkan pakai `zlib` bawaan Node.

> **Hasilnya kasar, jangan dipercaya bulat-bulat.** Rumus matematika, subscript,
> dan tabel sering kacau urutannya karena PDF menyimpan posisi, bukan alur
> bacaan. Bullet dari font Wingdings muncul sebagai karakter aneh seperti `Í`,
> dan sebagian PDF memakai font dengan pemetaan karakter yang bergeser sehingga
> teksnya perlu digeser balik. PDF hasil pindaian akan keluar kosong — itu butuh
> OCR. Untuk bagian yang penting, tetap buka PDF-nya sendiri.

Pemeriksaan tercepat saat menulis materi tetap:

```bash
node --check data/namaberkas.js
```

---

## Catatan teknis

**Kenapa data disimpan sebagai `.js`, bukan `.json`?**

Karena browser memblokir `fetch()` terhadap berkas lokal saat halaman dibuka
lewat `file://` (dianggap pelanggaran CORS, dengan origin `null`). Kalau memakai
`.json`, situs ini akan **wajib** dijalankan lewat server lokal.

Dengan membungkusnya sebagai `.js` yang dimuat melalui tag `<script>`, isinya
tetap **murni data** persis seperti JSON, tetapi situsnya bisa dibuka cukup
dengan klik dua kali. **Jangan mengubahnya menjadi JSON.**

**Tema terang dan gelap.** Palet warnanya disusun dengan rasio kontras yang
dihitung dan ditulis sebagai komentar di `css/style.css`. Semua warna teks
memenuhi WCAG 2.1 tingkat AA, sebagian besar AAA. Kalau mengubah warna,
hitung ulang kontrasnya.

**Progres "sudah dibaca"** disimpan di `localStorage` peramban. Artinya progres
itu menempel pada satu peramban di satu komputer, dan akan hilang bila riwayat
penjelajahan dibersihkan. Materinya sendiri aman karena tersimpan sebagai
berkas.

**Berkas data yang panjang.** Beberapa berkas sudah ribuan baris. Cara tercepat
menemukan satu topik adalah mencari **id**-nya, misalnya `id: 'sorting'` lewat
`Ctrl+F` di editor. Kalau sebuah berkas terasa terlalu panjang, ia bisa dipecah
menjadi beberapa berkas bertema — yang perlu diubah hanya daftar `<script>` di
`index.html`.

---

## Cara memeriksa hasil di peramban

Untuk perubahan pada `js/` atau `css/`, peramban sering menyajikan versi lama
dari cache. Cara paling andal memeriksanya: buat salinan `index.html` dengan
penanda versi pada tiap `<script>` dan `<link>`, lalu buka salinan itu.

```bash
node -e "const fs=require('fs');let h=fs.readFileSync('index.html','utf8');const v=Date.now();h=h.replace(/(src=\"(?:data|js)\/[^\"]+?\.js)\"/g,'\$1?v='+v+'\"').replace(/(href=\"css\/[^\"]+?\.css)\"/g,'\$1?v='+v+'\"');fs.writeFileSync('_cek.html',h);console.log('_cek.html siap')"
```

Hapus `_cek.html` setelah selesai — ia tidak perlu ikut tersimpan.
