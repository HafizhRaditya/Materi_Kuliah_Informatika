/* ============================================================
   logika-informatika.js — materi mata kuliah Logika Informatika
   (Semester 1)

   Catatan: topik di sini memakai kolom `judulLogicSyntax` untuk
   mengganti judul seksi menjadi "Bedah Notasi", karena yang
   dibedah adalah notasi logika, bukan syntax pemrograman.

   Contoh kode diutamakan Python, mengikuti bahasa yang dipakai
   di Praktikum Alpro.
   ============================================================ */

TOPICS.push({
  id: 'proposisi',
  judul: 'Proposisi & Operator Logika',
  kategori: 'logika',
  tag: ['proposisi', 'negasi', 'konjungsi', 'disjungsi', 'implikasi', 'biimplikasi'],
  ringkas: 'Bahan dasar seluruh logika: pernyataan yang bernilai benar atau salah, dan lima operator penggabungnya.',

  fungsi: `**Menulis syarat program yang benar sejak awal, bukan ditebak lalu ditambal.**

Setiap \`if\` yang pernah kamu tulis adalah proposisi. Yang berubah setelah memahami topik ini adalah kamu bisa **memeriksa kebenarannya di atas kertas** sebelum menjalankan programnya.

Terpakai langsung di:

- **Menyusun syarat berlapis** — \`if (a && !b) || c\` yang benar sejak percobaan pertama
- **Menyederhanakan kondisi berbelit** yang sudah ditulis orang lain
- **Klausa WHERE pada SQL** — \`AND\`, \`OR\`, \`NOT\` bekerja persis sama
- **Aturan validasi formulir** — kapan tombol kirim boleh aktif
- **Uji Kualitas Perangkat Lunak** — tiap operator logika menambah cabang yang harus diuji

Manfaat yang paling terasa: **berhenti menebak**. Ketika syaratmu salah, kamu tidak lagi mencoba-coba membalik tanda sampai kebetulan jalan — kamu menuliskannya sebagai proposisi dan melihat di mana letak salahnya.`,

  praktik: {
    tujuan: `Kamu bisa mengubah aturan berbahasa Indonesia menjadi ekspresi logika yang benar, lalu memeriksanya tanpa menjalankan program.`,
    alat: [
      'Kertas dan pensil',
      'Python 3 untuk memeriksa hasilnya'
    ],
    langkah: [
      { judul: 'Ambil satu aturan nyata dan pecah jadi proposisi tunggal',
        isi: `Contoh aturan: *"Mahasiswa boleh mengambil skripsi kalau sudah lulus minimal 120 SKS dan IPK di atas 2,00, atau sudah mendapat izin khusus dari kaprodi."*

Beri nama tiap bagian yang **bisa bernilai benar atau salah sendirian**:

- \`p\` = sudah lulus minimal 120 SKS
- \`q\` = IPK di atas 2,00
- \`r\` = sudah mendapat izin khusus kaprodi

Aturannya: **jangan pernah menggabungkan dua fakta dalam satu huruf.** *"Lulus 120 SKS dan IPK bagus"* harus jadi dua huruf, bukan satu.` },
      { judul: 'Susun ekspresinya, perhatikan tanda kurung',
        isi: `Dari kalimat di atas: \`(p ∧ q) ∨ r\`

Perhatikan kurungnya. Tanpa kurung, \`p ∧ q ∨ r\` **tetap** berarti \`(p ∧ q) ∨ r\` karena \`∧\` lebih kuat daripada \`∨\` — tetapi menuliskannya membuat maksudmu **tidak bisa disalahpahami** oleh pembaca berikutnya.

Kalau kamu ragu tentang urutan operator di sebuah bahasa, **selalu pakai kurung**. Tidak ada yang pernah dirugikan oleh kurung yang berlebih.` },
      { judul: 'Terjemahkan ke kode',
        isi: `- \`∧\` menjadi \`&&\` (C/C++/Java/JS/PHP) atau \`and\` (Python)
- \`∨\` menjadi \`||\` atau \`or\`
- \`¬\` menjadi \`!\` atau \`not\`

Jadi: \`if ((sks >= 120 and ipk > 2.0) or izin_kaprodi:\`

Perhatikan bahwa \`sks >= 120\` adalah **satu proposisi utuh** — ia menghasilkan benar atau salah, dan itulah \`p\`.` },
      { judul: 'Uji dengan tiga kasus yang sengaja dipilih',
        isi: `Jangan uji dengan nilai acak. Pilih kasus yang **membedakan**:

- \`p\` benar, \`q\` benar, \`r\` salah → harus **boleh**
- \`p\` benar, \`q\` salah, \`r\` salah → harus **tidak boleh**
- \`p\` salah, \`q\` salah, \`r\` benar → harus **boleh** (jalur izin khusus)

Kalau ketiganya benar, ekspresimu hampir pasti benar.` },
      { judul: 'Terapkan pada aturan yang sudah ada di kodemu',
        isi: `Cari satu \`if\` panjang di tugas lamamu — yang membuatmu bingung waktu menulisnya.

Tulis ulang jadi proposisi bernama, lalu bandingkan dengan yang asli. Sering kali kamu akan menemukan bahwa **maksudmu dan kodemu berbeda** — dan selama ini ia kebetulan tidak ketahuan.` }
    ],
    cek: [
      'Ketiga kasus uji di langkah 4 memberi hasil yang kamu harapkan',
      'Setiap huruf proposisimu hanya memuat SATU fakta yang bisa benar atau salah',
      `Kamu bisa membaca ulang ekspresimu sebagai kalimat Indonesia dan hasilnya sama dengan aturan aslinya`
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Proposisi** adalah kalimat yang **bisa dinilai benar atau salah**, dan tidak mungkin keduanya sekaligus. Itu saja syaratnya — tapi syarat sederhana ini menyingkirkan banyak jenis kalimat.

Yang **termasuk** proposisi:

- "Jakarta adalah ibu kota Indonesia." → bernilai **benar**
- "2 + 2 = 5" → bernilai **salah**, dan itu tetap sah sebagai proposisi
- "Hari ini hujan." → benar atau salah tergantung kenyataannya, tapi jelas salah satunya

Yang **bukan** proposisi:

- "Siapa namamu?" → pertanyaan, tidak bisa dinilai benar atau salah
- "Tutup pintunya!" → perintah
- "x + 1 = 5" → belum bisa dinilai selama \`x\` belum diketahui. Kalimat seperti ini disebut **kalimat terbuka**, dan baru menjadi proposisi setelah \`x\` diberi nilai
- "Kalimat ini salah." → paradoks; kalau benar berarti salah, kalau salah berarti benar

Proposisi biasanya dilambangkan huruf kecil: **p, q, r**. Nilainya cuma dua: **benar (B / true / 1)** atau **salah (S / false / 0)**.

Dari proposisi-proposisi sederhana, kita bisa menyusun **proposisi majemuk** memakai **operator logika**. Ada lima yang wajib kamu kuasai:

- **Negasi (¬)** — "tidak", membalik nilai
- **Konjungsi (∧)** — "dan"
- **Disjungsi (∨)** — "atau"
- **Implikasi (→)** — "jika ... maka ..."
- **Biimplikasi (↔)** — "jika dan hanya jika"

Kenapa ini penting untuk informatika? Karena **setiap kondisi \`if\` di programmu adalah proposisi**. Operator \`&&\`, \`||\`, dan \`!\` yang sudah kamu pakai di Alpro adalah konjungsi, disjungsi, dan negasi. Selain itu, logika juga menjadi dasar rangkaian digital, kueri basis data, dan pembuktian kebenaran algoritma.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '¬p        # negasi: "tidak p"\n\n# p benar  -> ¬p salah\n# p salah  -> ¬p benar',
      penjelasan: `
**Negasi** adalah satu-satunya operator yang hanya butuh **satu** proposisi. Tugasnya sederhana: **membalik nilainya**.

Lambangnya bermacam-macam tergantung buku dan bidang, dan semuanya berarti sama:

- **¬p** — paling umum di buku logika
- **~p** — sering dipakai di matematika
- **p'** atau **p̄** — biasa di aljabar Boolean dan rangkaian digital
- **!p** — di bahasa pemrograman

Yang perlu diperhatikan saat menegasikan kalimat berbahasa Indonesia: **negasi bukan sekadar menambahkan kata "tidak" di depan.** Perhatikan lawan katanya baik-baik.

- p: "Semua mahasiswa lulus" → ¬p: **"Ada mahasiswa yang tidak lulus"**, bukan "semua mahasiswa tidak lulus"
- p: "x > 5" → ¬p: **"x ≤ 5"**, bukan "x < 5"

Kesalahan pada contoh pertama sangat sering terjadi, dan akan dibahas tuntas di topik **Kuantor**. Untuk sekarang cukup ingat: lawan dari "semua" adalah "**ada yang tidak**", bukan "semua tidak".
`
    },
    {
      bahasa: 'python',
      kode: 'p ∧ q     # konjungsi: "p dan q"\n\n#  p  |  q  | p ∧ q\n#  B  |  B  |   B     <- HANYA baris ini yang benar\n#  B  |  S  |   S\n#  S  |  B  |   S\n#  S  |  S  |   S',
      penjelasan: `
**Konjungsi bernilai benar hanya jika kedua-duanya benar.** Cukup satu yang salah, seluruhnya menjadi salah.

Ini paling gampang diterima karena cocok dengan pemakaian kata "dan" sehari-hari. Kalau kamu bilang *"saya lulus dan dapat beasiswa"*, pernyataan itu bohong bila salah satunya tidak terjadi.

Di pemrograman, ini persis operator **\`&&\`** (atau \`and\` di Python) yang sudah kamu pakai:

\`if (nilai >= 60 && kehadiran >= 75)\` — keduanya harus terpenuhi.

Yang menarik, sifat **short-circuit** yang kamu pelajari di topik Percabangan berasal langsung dari tabel ini: kalau operand pertama sudah salah, hasilnya **pasti** salah apa pun operand kedua — sehingga tidak perlu diperiksa lagi.

Beberapa lambang lain yang berarti sama: **p · q**, **p & q**, atau ditulis berdampingan **pq** dalam aljabar Boolean.
`
    },
    {
      bahasa: 'python',
      kode: 'p ∨ q     # disjungsi INKLUSIF: "p atau q, boleh dua-duanya"\n\n#  p  |  q  | p ∨ q\n#  B  |  B  |   B     <- perhatikan: TETAP benar\n#  B  |  S  |   B\n#  S  |  B  |   B\n#  S  |  S  |   S     <- hanya baris ini yang salah',
      penjelasan: `
Di sinilah kesalahpahaman pertama biasanya muncul. **Disjungsi bersifat inklusif** — artinya "p atau q, dan boleh juga dua-duanya".

Perhatikan baris pertama: ketika p dan q sama-sama benar, hasilnya **tetap benar**. Ini sering terasa janggal karena kata "atau" dalam bahasa sehari-hari sering berarti **pilih salah satu**.

Bandingkan dua kalimat ini:

- *"Beasiswa diberikan kepada mahasiswa berprestasi **atau** kurang mampu."* → inklusif. Mahasiswa yang berprestasi **sekaligus** kurang mampu tetap dapat.
- *"Kamu boleh memilih teh **atau** kopi."* → terasa eksklusif, karena dalam konteksnya cuma boleh satu.

**Dalam logika, ∨ selalu berarti yang pertama.** Kalau yang dimaksud adalah "salah satu saja, tidak boleh dua-duanya", operatornya berbeda yaitu **XOR** (⊕), yang dibahas nanti di topik Himpunan sebagai *beda setangkup*.

Padanannya di pemrograman adalah **\`||\`** (atau \`or\` di Python), dan itu juga inklusif — \`true || true\` menghasilkan \`true\`.
`
    },
    {
      bahasa: 'python',
      kode: 'p → q     # implikasi: "jika p maka q"\n\n#  p  |  q  | p → q\n#  B  |  B  |   B\n#  B  |  S  |   S     <- HANYA baris ini yang salah\n#  S  |  B  |   B     <- kenapa BENAR?\n#  S  |  S  |   B     <- kenapa BENAR?',
      penjelasan: `
**Inilah bagian yang paling membingungkan di seluruh logika proposisi**, dan hampir pasti keluar di ujian. Dua baris terakhir terasa melawan akal sehat.

Cara memahaminya: **anggap implikasi sebagai sebuah janji.**

Misalkan kamu berjanji: *"Kalau saya lulus, saya traktir kamu."*
Di sini p = "saya lulus", q = "saya traktir".

Sekarang periksa kapan janji itu **dilanggar**:

- **Lulus, dan mentraktir** (B, B) → janji ditepati → **benar**
- **Lulus, tapi tidak mentraktir** (B, S) → janji **dilanggar** → **salah**
- **Tidak lulus, tapi tetap mentraktir** (S, B) → janjinya tidak dilanggar. Kamu memang tidak berjanji apa-apa soal keadaan tidak lulus → **benar**
- **Tidak lulus, dan tidak mentraktir** (S, S) → juga tidak melanggar apa pun → **benar**

Kuncinya: **janji hanya bisa dilanggar kalau syaratnya terpenuhi tetapi hasilnya tidak dipenuhi.** Kalau syaratnya tidak terpenuhi, janjinya tidak diuji sama sekali — dan sesuatu yang tidak dilanggar dianggap **benar**.

Keadaan ketika p salah sehingga implikasinya otomatis benar disebut **benar secara hampa** (*vacuously true*). Contoh yang sering dipakai: *"Semua kuda bertanduk yang saya miliki berwarna merah"* — pernyataan ini **benar**, karena saya tidak punya kuda bertanduk sama sekali.

Istilah yang perlu kamu hafal: pada p → q, bagian **p disebut anteseden** (hipotesis) dan **q disebut konsekuen** (kesimpulan).
`
    },
    {
      bahasa: 'python',
      kode: 'p ↔ q     # biimplikasi: "p jika dan hanya jika q"\n\n#  p  |  q  | p ↔ q\n#  B  |  B  |   B     <- sama-sama benar\n#  B  |  S  |   S\n#  S  |  B  |   S\n#  S  |  S  |   B     <- sama-sama salah, tetap BENAR',
      penjelasan: `
**Biimplikasi bernilai benar ketika kedua sisinya bernilai sama** — sama-sama benar, atau sama-sama salah.

Bacanya "p jika dan hanya jika q", sering disingkat **"jika-taktif"** atau ditulis **"iff"** dalam bahasa Inggris.

Kenapa disebut *bi*-implikasi? Karena ia sebenarnya **dua implikasi sekaligus**:

**p ↔ q** setara dengan **(p → q) ∧ (q → p)**

Artinya p mengakibatkan q, **dan** q juga mengakibatkan p. Hubungannya dua arah.

Kapan dipakai? Untuk menyatakan **definisi** dan **kesetaraan**. Contoh: *"Sebuah bilangan genap **jika dan hanya jika** habis dibagi 2."* Kedua arahnya benar — kalau genap pasti habis dibagi 2, dan kalau habis dibagi 2 pasti genap.

Bandingkan dengan implikasi biasa yang cuma satu arah: *"Jika hujan maka jalanan basah."* Kebalikannya belum tentu benar — jalanan bisa basah karena disiram, bukan karena hujan.

Perhatikan juga baris terakhir tabelnya: **ketika keduanya salah, biimplikasi tetap benar.** Ini masuk akal karena yang dinilai adalah **kesamaan nilai**, bukan kebenaran isinya.
`
    },
    {
      bahasa: 'python',
      kode: '# URUTAN PENGERJAAN (dari yang paling kuat):\n#   1. ¬     negasi\n#   2. ∧     konjungsi\n#   3. ∨     disjungsi\n#   4. →     implikasi\n#   5. ↔     biimplikasi\n\n¬p ∧ q  →  r      dibaca:  ((¬p) ∧ q) → r',
      penjelasan: `
Sama seperti perkalian dikerjakan sebelum penjumlahan, operator logika juga punya **urutan pengerjaan**. Salah membacanya membuat seluruh jawaban meleset.

Urutannya dari yang paling kuat mengikat: **¬ → ∧ → ∨ → → → ↔**

Contoh pembacaan yang benar:

- **¬p ∧ q** berarti **(¬p) ∧ q**, bukan ¬(p ∧ q). Negasi hanya mengenai \`p\`
- **p ∨ q → r** berarti **(p ∨ q) → r**, karena ∨ lebih kuat daripada →
- **p → q → r** biasanya dibaca **p → (q → r)**, karena implikasi bersifat asosiatif ke kanan

Nasihat praktis yang layak kamu pakai: **kalau ragu, tulis tanda kurungnya.** Menulis \`(¬p) ∧ q\` sama sekali tidak salah dan justru menghindarkan kekeliruan. Di ujian, tanda kurung yang jelas juga memudahkan pemeriksa mengikuti alur pengerjaanmu.

Kaitannya dengan pemrograman: urutan yang sama berlaku pada \`!\`, \`&&\`, dan \`||\` — itulah sebabnya \`!a && b\` di C berarti \`(!a) && b\`.
`
    }
  ],

  kode: {
    python: String.raw`# Python bisa dipakai untuk MEMERIKSA jawaban tabel kebenaranmu.

from itertools import product

# ---------- Lima operator logika di Python ----------
p, q = True, False

print("p =", p, ", q =", q)
print()
print("negasi      ¬p     :", not p)
print("konjungsi   p ∧ q  :", p and q)
print("disjungsi   p ∨ q  :", p or q)
print("implikasi   p → q  :", (not p) or q)      # tidak ada operator bawaannya
print("biimplikasi p ↔ q  :", p == q)


# ---------- Implikasi tidak punya operator bawaan ----------
def implikasi(p, q):
    """p → q  setara dengan  ¬p ∨ q"""
    return (not p) or q


def biimplikasi(p, q):
    """p ↔ q  setara dengan  (p → q) ∧ (q → p)"""
    return implikasi(p, q) and implikasi(q, p)


# ---------- Mencetak tabel kebenaran semua operator ----------
def bl(x):
    return "B" if x else "S"      # tampilkan sebagai B/S, bukan True/False


print("\n=== TABEL KEBENARAN LIMA OPERATOR ===")
print(f"{'p':^3}|{'q':^3}|{'¬p':^4}|{'p∧q':^5}|{'p∨q':^5}|{'p→q':^5}|{'p↔q':^5}")
print("-" * 35)

for p, q in product([True, False], repeat=2):
    print(f"{bl(p):^3}|{bl(q):^3}|{bl(not p):^4}|{bl(p and q):^5}|"
          f"{bl(p or q):^5}|{bl(implikasi(p, q)):^5}|{bl(biimplikasi(p, q)):^5}")


# ---------- MEMBUKTIKAN implikasi setara dengan ¬p ∨ q ----------
print("\n=== p → q  vs  ¬p ∨ q ===")
print(f"{'p':^3}|{'q':^3}|{'p→q':^5}|{'¬p∨q':^6}|{'sama?':^6}")
print("-" * 28)
for p, q in product([True, False], repeat=2):
    kiri = implikasi(p, q)
    kanan = (not p) or q
    print(f"{bl(p):^3}|{bl(q):^3}|{bl(kiri):^5}|{bl(kanan):^6}|{str(kiri == kanan):^6}")
print("-> kolomnya identik, jadi keduanya SETARA")


# ---------- Membuktikan "benar secara hampa" ----------
print("\n=== KENAPA S → B BERNILAI BENAR? ===")
print("Janji: 'Kalau saya lulus, saya traktir kamu.'")
kasus = [
    (True,  True,  "lulus, mentraktir           -> janji ditepati"),
    (True,  False, "lulus, TIDAK mentraktir     -> janji DILANGGAR"),
    (False, True,  "tidak lulus, tetap traktir  -> janji tidak dilanggar"),
    (False, False, "tidak lulus, tidak traktir  -> janji tidak dilanggar"),
]
for p, q, ket in kasus:
    print(f"  {bl(p)} → {bl(q)} = {bl(implikasi(p, q))}   {ket}")


# ---------- Kaitan dengan kondisi if di Alpro ----------
print("\n=== KAITAN DENGAN PROGRAM ===")
nilai, kehadiran = 75, 80
lulus = nilai >= 60 and kehadiran >= 75        # ini KONJUNGSI
print(f"  nilai={nilai}, kehadiran={kehadiran} -> lulus? {lulus}")
print("  operator and/or/not di Alpro = ∧/∨/¬ di Logika Informatika")`,

    js: String.raw`// Lima operator logika di JavaScript
const p = true, q = false;

console.log("negasi      : " + (!p));
console.log("konjungsi   : " + (p && q));
console.log("disjungsi   : " + (p || q));
console.log("implikasi   : " + (!p || q));      // tidak ada operator bawaannya
console.log("biimplikasi : " + (p === q));

// Implikasi dan biimplikasi harus dibuat sendiri
function implikasi(p, q) { return !p || q; }        // p → q  =  ¬p ∨ q
function biimplikasi(p, q) { return implikasi(p, q) && implikasi(q, p); }

const bl = function (x) { return x ? "B" : "S"; };

console.log("\n=== TABEL KEBENARAN ===");
console.log("p | q | ¬p | p∧q | p∨q | p→q | p↔q");
console.log("-".repeat(36));

for (const a of [true, false]) {
    for (const b of [true, false]) {
        console.log(
            bl(a) + " | " + bl(b) + " | " + bl(!a).padStart(2) +
            " | " + bl(a && b).padStart(3) +
            " | " + bl(a || b).padStart(3) +
            " | " + bl(implikasi(a, b)).padStart(3) +
            " | " + bl(biimplikasi(a, b)).padStart(3)
        );
    }
}

// Membuktikan p → q setara dengan ¬p ∨ q
console.log("\n=== p → q  vs  ¬p ∨ q ===");
let semuaSama = true;
for (const a of [true, false]) {
    for (const b of [true, false]) {
        const kiri = implikasi(a, b), kanan = !a || b;
        if (kiri !== kanan) semuaSama = false;
        console.log("  " + bl(a) + "," + bl(b) + " -> " + bl(kiri) + " vs " + bl(kanan));
    }
}
console.log("  setara?", semuaSama);

// JEBAKAN JavaScript: || dan && TIDAK selalu mengembalikan boolean
console.log("\n=== CATATAN KHAS JAVASCRIPT ===");
console.log("  true || 'halo'  =", true || "halo");
console.log("  0 || 'halo'     =", 0 || "halo", " <- mengembalikan NILAINYA");
console.log("  -> di logika hasilnya selalu B/S, di JS bisa nilai apa pun");
console.log("  gunakan Boolean(x) kalau memang butuh benar/salah");`,

    cpp: String.raw`#include <iostream>
#include <iomanip>
using namespace std;

// Implikasi dan biimplikasi tidak punya operator bawaan
bool implikasi(bool p, bool q)   { return !p || q; }          // p → q = ¬p ∨ q
bool biimplikasi(bool p, bool q) { return implikasi(p, q) && implikasi(q, p); }

char bl(bool x) { return x ? 'B' : 'S'; }

int main() {
    cout << "=== TABEL KEBENARAN LIMA OPERATOR ===" << endl;
    cout << " p | q | !p | p&&q | p||q | p->q | p<->q" << endl;
    cout << string(38, '-') << endl;

    bool nilai[2] = { true, false };
    for (bool p : nilai) {
        for (bool q : nilai) {
            cout << " " << bl(p) << " | " << bl(q)
                 << " |  " << bl(!p)
                 << " |  " << bl(p && q)
                 << "   |  " << bl(p || q)
                 << "   |  " << bl(implikasi(p, q))
                 << "   |   " << bl(biimplikasi(p, q)) << endl;
        }
    }

    // Membuktikan p → q setara dengan ¬p ∨ q
    cout << "\n=== p -> q  vs  !p || q ===" << endl;
    bool setara = true;
    for (bool p : nilai)
        for (bool q : nilai)
            if (implikasi(p, q) != (!p || q)) setara = false;
    cout << "  setara? " << (setara ? "ya" : "tidak") << endl;

    // Di C dan C++, bool sebenarnya angka: 0 = salah, selain 0 = benar
    cout << "\n=== CATATAN KHAS C/C++ ===" << endl;
    cout << "  true  sebagai angka : " << (int)true << endl;
    cout << "  false sebagai angka : " << (int)false << endl;
    cout << "  if (5) dianggap BENAR, karena bukan nol" << endl;
    cout << "  -> di logika cuma ada dua nilai, di C semua angka bukan nol = benar" << endl;

    return 0;
}`
  },

  output: `=== TABEL KEBENARAN LIMA OPERATOR ===
 p | q | ¬p | p∧q | p∨q | p→q | p↔q
-----------------------------------
 B | B | S  |  B  |  B  |  B  |  B
 B | S | S  |  S  |  B  |  S  |  S
 S | B | B  |  S  |  B  |  B  |  S
 S | S | B  |  S  |  S  |  B  |  B

=== KENAPA S → B BERNILAI BENAR? ===
Janji: 'Kalau saya lulus, saya traktir kamu.'
  B → B = B   lulus, mentraktir           -> janji ditepati
  B → S = S   lulus, TIDAK mentraktir     -> janji DILANGGAR
  S → B = B   tidak lulus, tetap traktir  -> janji tidak dilanggar
  S → S = B   tidak lulus, tidak traktir  -> janji tidak dilanggar`,

  kesalahanUmum: [
    {
      salah: 'Mengira kalimat perintah, pertanyaan, atau kalimat terbuka adalah proposisi.',
      kenapa: 'Proposisi harus **bisa dinilai benar atau salah**. "Tutup pintunya!" tidak bisa dinilai benar, dan "x + 1 = 5" belum bisa dinilai selama `x` belum diketahui. Soal ujian sering menguji ini dengan mencampur beberapa jenis kalimat.',
      benar: 'Uji dengan pertanyaan: *"bisakah saya menjawab benar atau salah untuk kalimat ini?"* Kalau tidak bisa, itu bukan proposisi. Kalimat terbuka baru menjadi proposisi setelah variabelnya diberi nilai atau diberi kuantor.'
    },
    {
      salah: 'Mengira disjungsi (∨) bersifat eksklusif — "salah satu saja".',
      kenapa: 'Kata "atau" sehari-hari sering berarti pilih salah satu, padahal **∨ dalam logika selalu inklusif**. Ketika p dan q sama-sama benar, p ∨ q **tetap benar**. Kesalahan ini membuat satu baris tabel kebenaran keliru, dan biasanya merembet ke seluruh jawaban.',
      benar: 'Ingat: **∨ salah HANYA kalau kedua-duanya salah.** Kalau yang dimaksud "salah satu saja", operatornya XOR (⊕), bukan ∨.'
    },
    {
      salah: 'Mengira p → q bernilai salah ketika p salah.',
      kenapa: 'Baris S → B dan S → S keduanya bernilai **benar**, dan ini paling sering dijawab keliru. Penyebabnya, orang membayangkan implikasi sebagai sebab-akibat, padahal yang dinilai adalah **apakah janjinya dilanggar**.',
      benar: 'Hafalkan satu kalimat: **implikasi hanya salah pada satu baris, yaitu B → S.** Selain itu semuanya benar. Kalau lupa, kembali ke analogi janji: janji cuma bisa dilanggar kalau syaratnya terpenuhi.'
    },
    {
      salah: 'Mengira p → q sama artinya dengan q → p.',
      kenapa: 'Implikasi bersifat **satu arah**. "Jika hujan maka jalanan basah" tidak sama dengan "jika jalanan basah maka hujan" — jalanan bisa basah karena disiram. Menukar posisinya menghasilkan pernyataan yang berbeda, dan tabel kebenarannya pun berbeda.',
      benar: 'Bedakan ketiganya dengan tegas: q → p disebut **konvers**, ¬p → ¬q disebut **invers**, dan ¬q → ¬p disebut **kontraposisi**. Hanya kontraposisi yang setara dengan aslinya — dibahas di topik tersendiri.'
    },
    {
      salah: 'Menegasikan "semua" menjadi "semua tidak".',
      kenapa: 'Lawan dari "semua mahasiswa lulus" bukan "semua mahasiswa tidak lulus", melainkan **"ada mahasiswa yang tidak lulus"**. Cukup satu yang tidak lulus untuk membuat pernyataan aslinya salah, tidak perlu semuanya.',
      benar: 'Ingat pasangannya: negasi dari **semua** adalah **ada yang tidak**, dan negasi dari **ada** adalah **semua tidak**. Aturan ini dibahas lengkap di topik Kuantor.'
    },
    {
      salah: 'Salah membaca urutan operator, misalnya menganggap ¬p ∧ q berarti ¬(p ∧ q).',
      kenapa: 'Negasi paling kuat mengikat, sehingga hanya mengenai proposisi tepat di sebelahnya. Salah membaca urutan membuat seluruh tabel kebenaran keliru meski cara mengerjakannya sudah benar.',
      benar: 'Hafalkan urutannya: **¬ , ∧ , ∨ , → , ↔**. Kalau ragu, **tulis tanda kurungnya** — menulis `(¬p) ∧ q` sama sekali tidak salah dan menghindarkan kekeliruan.'
    }
  ],

  analogi: `
Untuk **implikasi** — bagian tersulit di topik ini — pakai analogi **janji**, dan pertahankan sepanjang belajar.

Bayangkan kamu berjanji: *"Kalau saya lulus, saya traktir kamu."* Lalu tanyakan pada dirimu untuk tiap kemungkinan: **apakah saya melanggar janji?**

- Lulus dan mentraktir → tidak melanggar → **benar**
- Lulus tapi tidak mentraktir → **melanggar** → **salah**
- Tidak lulus tapi tetap mentraktir → tidak melanggar, karena janjinya tidak menyinggung keadaan ini → **benar**
- Tidak lulus dan tidak mentraktir → juga tidak melanggar → **benar**

Kalimat kunci yang perlu kamu ingat: **janji hanya bisa dilanggar kalau syaratnya terpenuhi.** Karena itu implikasi hanya salah pada satu baris.

Untuk **disjungsi inklusif**, pakai analogi syarat beasiswa: *"diberikan kepada mahasiswa berprestasi **atau** kurang mampu."* Kalau ada mahasiswa yang berprestasi **sekaligus** kurang mampu, apakah ia berhak? Tentu berhak — dan itulah arti inklusif.

Untuk **mengingat tabel kebenaran tanpa menghafal**, pakai satu kalimat per operator:

- **∧** — benar kalau **semuanya** benar
- **∨** — salah kalau **semuanya** salah
- **→** — salah **hanya** kalau B → S
- **↔** — benar kalau **nilainya sama**

Empat kalimat itu menggantikan 16 baris hafalan.

Untuk menghubungkan dengan yang sudah kamu kuasai: **operator \`and\`, \`or\`, dan \`not\` di Python yang kamu pakai di Alpro adalah persis ∧, ∨, dan ¬.** Setiap kondisi \`if\` yang pernah kamu tulis sebenarnya adalah proposisi majemuk. Menyadari ini membuat Logika Informatika terasa jauh lebih dekat, bukan mata kuliah yang terpisah sendiri.

Cara menguji pemahamanmu sendiri: ambil satu kondisi \`if\` dari kode praktikum Alpro-mu, lalu tuliskan ulang dalam notasi logika. Kalau bisa, berarti kamu sudah paham.
`,

  latihan: [
    'Tentukan mana yang termasuk proposisi dan mana yang bukan, beserta alasannya: (a) "Bandung ada di Jawa Barat", (b) "Berapa umurmu?", (c) "x² = 4", (d) "Kerjakan tugasmu!", (e) "2 + 2 = 5", (f) "Semoga lulus".',
    'Misalkan p = "Saya belajar" dan q = "Saya lulus". Tuliskan dalam notasi logika: (a) Saya belajar dan lulus, (b) Jika saya belajar maka saya lulus, (c) Saya lulus jika dan hanya jika saya belajar, (d) Saya tidak belajar tetapi tetap lulus.',
    'Susun tabel kebenaran lengkap untuk ¬p ∨ q, lalu bandingkan dengan tabel p → q. Apa kesimpulanmu?',
    'Tentukan nilai kebenaran tiap pernyataan berikut dan jelaskan: (a) "Jika 2 + 2 = 5 maka bumi itu datar", (b) "Jika 2 + 2 = 4 maka bumi itu datar", (c) "Jika 2 + 2 = 5 maka langit berwarna biru".',
    'Bacalah ekspresi berikut dengan tanda kurung yang benar sesuai urutan operator: (a) ¬p ∧ q ∨ r, (b) p ∨ q → ¬r, (c) ¬p → q ↔ r.',
    'Ambil tiga kondisi `if` dari kode Praktikum Alpro-mu, lalu tuliskan ulang masing-masing dalam notasi logika proposisi.',
    'Negasikan kalimat berikut dengan benar: (a) "Semua mahasiswa hadir", (b) "x > 10", (c) "Saya lulus dan dapat beasiswa", (d) "Hari ini hujan atau mendung".',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa "Jika 2+2=5 maka saya presiden" bernilai **benar**. Pakai analogi janji, dan jangan menyebut tabel kebenaran sama sekali.'
  ]
});

TOPICS.push({
  id: 'tabel-kebenaran',
  judul: 'Tabel Kebenaran',
  kategori: 'logika',
  tag: ['tabel kebenaran', 'truth table', '2^n', 'evaluasi', 'proposisi majemuk'],
  ringkas: 'Cara baku menguji sebuah pernyataan majemuk untuk semua kemungkinan — alat utama sepanjang Logika Informatika.',

  fungsi: `**Membuktikan sebuah syarat benar untuk SEMUA kemungkinan, bukan cuma yang kebetulan kamu coba.**

Ini alat paling langsung untuk menjawab pertanyaan *"apakah dua syarat ini sebenarnya sama?"* dan *"apakah ada kombinasi yang belum tertangani?"*

Terpakai di:

- **Memeriksa apakah penyederhanaan \`if\`-mu benar** — bandingkan tabel yang lama dan yang baru
- **Menemukan kombinasi yang lolos** dari rangkaian \`if-else if\` — baris yang tidak tertangani siapa pun
- **Decision table testing** di Uji Kualitas Perangkat Lunak, yang secara harfiah adalah tabel kebenaran dengan kolom tindakan
- **Merancang rangkaian digital** di Organisasi Komputer
- **Memeriksa aturan bisnis** sebelum diprogram — sel kosong berarti spesifikasinya belum lengkap

Kekuatan sesungguhnya bukan menghitung, melainkan **menemukan kasus yang tidak kamu pikirkan**. Tabel memaksa kamu berhadapan dengan setiap kombinasi, termasuk yang tidak pernah terlintas.`,

  praktik: {
    tujuan: `Kamu bisa membuat tabel kebenaran untuk syarat apa pun, dan memakainya untuk menemukan kombinasi yang belum tertangani programmu.`,
    alat: [
      'Python 3 dengan modul `itertools` (bawaan)',
      'Kertas untuk kasus dua variabel'
    ],
    langkah: [
      { judul: 'Hitung dulu berapa barisnya',
        isi: `Untuk \`n\` proposisi, tabelnya punya **2ⁿ** baris.

- 2 proposisi → 4 baris
- 3 proposisi → 8 baris
- 4 proposisi → 16 baris
- 6 proposisi → 64 baris

Kalau lebih dari 4 atau 5, jangan tulis tangan — pakai kode. Dan kalau lebih dari 10, pertimbangkan bahwa syaratmu **terlalu rumit** dan sebaiknya dipecah.` },
      { judul: 'Isi kolom masukannya secara sistematis',
        isi: `Jangan mengarang urutan. Pakai pola baku: kolom paling kanan berganti tiap baris, kolom di sebelahnya tiap dua baris, berikutnya tiap empat baris.

Dengan pola itu **mustahil ada baris yang terlewat atau ganda** — dan itulah seluruh gunanya.` },
      { judul: 'Bangkitkan otomatis dengan Python',
        isi: `Buat \`tabel.py\`:

- \`from itertools import product\`
- \`for p, q, r in product([True, False], repeat=3):\`
- di dalamnya, hitung ekspresimu dan cetak barisnya

Ini lebih aman daripada menulis tangan, dan bisa langsung dipakai untuk membandingkan dua ekspresi.` },
      { judul: 'Bandingkan DUA ekspresi kolom demi kolom',
        isi: `Inilah pemakaian yang paling berguna. Kalau kamu menyederhanakan \`!(a && b)\` menjadi \`!a || !b\`, hitung keduanya di baris yang sama dan bandingkan.

Kalau ada **satu baris saja** yang berbeda, penyederhanaanmu salah — dan kamu menemukannya dalam hitungan detik, bukan setelah dipakai orang.` },
      { judul: 'Cari baris yang tidak tertangani siapa pun',
        isi: `Ambil rangkaian \`if / else if\` dari kodemu. Buat kolom untuk tiap cabang, lalu isi tabelnya.

Baris yang **semua kolomnya salah** adalah kombinasi yang **tidak ditangani siapa pun** — dan itu bug yang menunggu terjadi.

Kalau ada \`else\` di akhir, ia menangkap semuanya; pertanyaannya kemudian berubah menjadi *"apakah perilaku else itu memang yang diinginkan untuk baris-baris ini?"*` }
    ],
    cek: [
      'Jumlah baris tabelmu tepat 2 pangkat jumlah proposisinya',
      'Tidak ada dua baris yang kombinasi masukannya sama',
      'Saat membandingkan dua ekspresi yang seharusnya setara, seluruh barisnya cocok'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Tabel kebenaran** adalah daftar yang memuat **semua kemungkinan** nilai proposisi penyusun, beserta hasil akhirnya. Inilah alat kerja utama di Logika Informatika — hampir semua soal bisa diselesaikan dengannya.

Kenapa perlu semua kemungkinan? Karena sebuah pernyataan majemuk bisa saja **kebetulan benar** untuk satu keadaan tetapi salah untuk keadaan lain. Hanya dengan memeriksa semuanya kita bisa yakin.

Ukuran tabelnya mengikuti satu aturan sederhana:

**Kalau ada n proposisi berbeda, jumlah barisnya adalah 2ⁿ.**

- 1 proposisi → 2 baris
- 2 proposisi → 4 baris
- 3 proposisi → 8 baris
- 4 proposisi → 16 baris

Alasannya: tiap proposisi punya 2 kemungkinan, dan pilihannya saling bebas. Dua proposisi berarti 2 × 2, tiga proposisi berarti 2 × 2 × 2, dan seterusnya.

Cara menyusunnya ada urutan bakunya, dan mengikuti urutan ini membuat pekerjaanmu jauh lebih rapi:

- **Tentukan jumlah kolom masukan** dari banyaknya proposisi berbeda
- **Isi pola bakunya**: kolom paling kiri berganti paling lambat, kolom paling kanan berganti tiap baris
- **Buat kolom bantu** untuk bagian dalam tanda kurung, dari yang paling dalam
- **Kerjakan bertahap** sampai kolom terakhir, yaitu ekspresi utuhnya

Langkah ketiga sering dilewati mahasiswa, padahal justru itu yang mencegah kesalahan. Mengerjakan \`(p ∧ q) → (¬r ∨ p)\` sekaligus dalam kepala hampir pasti keliru; memecahnya jadi kolom-kolom kecil membuatnya hampir mustahil salah.

Dari tabel kebenaran inilah nanti lahir tiga hal penting yang dibahas di topik berikutnya: **tautologi** (semua barisnya benar), **kontradiksi** (semua barisnya salah), dan **ekuivalensi** (dua ekspresi yang kolom hasilnya identik).
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# 2 proposisi -> 2² = 4 baris\n#  p  |  q\n#  B  |  B\n#  B  |  S\n#  S  |  B\n#  S  |  S\n\n# perhatikan: kolom KANAN berganti tiap baris,\n#             kolom KIRI berganti tiap 2 baris',
      penjelasan: `
Pola pengisian ini adalah **kesepakatan baku**, dan memakainya membuat jawabanmu mudah dicocokkan dengan kunci maupun buku mana pun.

Aturannya: **kolom paling kanan berganti paling cepat**, dan setiap bergeser satu kolom ke kiri, kecepatan bergantinya **dibagi dua**.

Untuk 3 proposisi:

- Kolom **r** (kanan): B S B S B S B S → berganti **tiap baris**
- Kolom **q** (tengah): B B S S B B S S → berganti **tiap 2 baris**
- Kolom **p** (kiri): B B B B S S S S → berganti **tiap 4 baris**

Kalau kamu perhatikan, polanya persis **bilangan biner menurun**: BBB, BBS, BSB, BSS, SBB, ... — sama seperti 7, 6, 5, 4, 3, 2, 1, 0 dalam biner kalau B dianggap 1.

Kaitan ini bukan kebetulan, dan berguna untuk mengecek pekerjaanmu: kalau kamu bisa menuliskan angka biner 0 sampai 2ⁿ−1, kamu pasti tidak akan melewatkan satu baris pun.

Beberapa buku memakai urutan terbalik (S dulu baru B). Keduanya sah — yang penting **konsisten dalam satu pengerjaan**, dan jangan menukar urutan di tengah jalan.
`
    },
    {
      bahasa: 'python',
      kode: '# n proposisi -> 2^n baris\n#\n# n = 1  ->    2 baris\n# n = 2  ->    4 baris\n# n = 3  ->    8 baris\n# n = 4  ->   16 baris\n# n = 10 -> 1024 baris',
      penjelasan: `
Rumus **2ⁿ** berasal dari aturan perkalian: tiap proposisi punya **2 pilihan** nilai, dan pilihan-pilihan itu **saling bebas**.

Untuk 3 proposisi: 2 pilihan untuk p, dikali 2 untuk q, dikali 2 untuk r, hasilnya 8.

Yang perlu disadari: **jumlah barisnya tumbuh sangat cepat.** Menambah satu proposisi saja **melipatduakan** ukuran tabelnya.

Kalau kamu sudah mempelajari topik **Analisis Kompleksitas**, inilah contoh nyata pertumbuhan **O(2ⁿ)** — kelas pertumbuhan paling boros yang dibahas di sana. Untuk 20 proposisi, tabelnya sudah lebih dari satu juta baris.

Akibat praktisnya di dunia nyata: memeriksa kebenaran rangkaian logika yang rumit dengan tabel kebenaran menjadi tidak mungkin. Karena itu ada metode lain seperti **penyederhanaan aljabar** dan **peta Karnaugh** yang tidak perlu memeriksa semua kemungkinan.

Untuk keperluan kuliah, soal biasanya berhenti di 3 proposisi (8 baris). Kalau soalmu punya 4 proposisi, periksa dulu — sering kali ada proposisi yang sebenarnya sama dan bisa digabung.
`
    },
    {
      bahasa: 'python',
      kode: '# Kerjakan BERTAHAP, jangan sekaligus.\n# Contoh:  (p ∧ q) → ¬r\n#\n#  p | q | r | p∧q | ¬r | (p∧q) → ¬r\n#  B | B | B |  B  | S  |     S\n#  B | B | S |  B  | B  |     B\n#  ...        ^^^^^^^^^^ kolom BANTU',
      penjelasan: `
Inilah kebiasaan yang paling menentukan benar-tidaknya jawabanmu: **buat kolom bantu, jangan hitung di kepala.**

Aturannya: kerjakan **dari bagian paling dalam** menuju ke luar, persis seperti mengerjakan soal aritmetika bertanda kurung.

Untuk \`(p ∧ q) → ¬r\`, urutan kolomnya:

- Kolom masukan: **p, q, r**
- Kolom bantu: **p ∧ q** (isi tanda kurung)
- Kolom bantu: **¬r** (negasi)
- Kolom hasil: **(p ∧ q) → ¬r**, dibaca dari dua kolom bantu di sebelahnya

Keuntungannya ada tiga:

- **Kesalahan jadi mudah dilacak.** Kalau hasilnya keliru, kamu bisa menelusuri kolom mana yang salah, bukan mengulang semuanya
- **Pemeriksa bisa mengikuti alurmu**, sehingga tetap dapat nilai sebagian meski hasil akhirnya keliru
- **Kolom bantu sering terpakai ulang** pada ekspresi yang mirip

Saat mengisi kolom hasil, **jangan melihat kolom p, q, r lagi** — cukup lihat dua kolom bantu tepat di sebelahnya, lalu terapkan tabel operatornya. Ini mengurangi beban pikiran secara nyata.
`
    },
    {
      bahasa: 'python',
      kode: '# Menguji apakah dua ekspresi SETARA:\n# bandingkan kolom hasilnya baris per baris.\n#\n#  p | q | ¬(p ∧ q) | ¬p ∨ ¬q\n#  B | B |    S     |    S\n#  B | S |    B     |    B\n#  S | B |    B     |    B\n#  S | S |    B     |    B\n#            ^^^^^^^^^^^^^^ identik -> SETARA',
      penjelasan: `
Ini pemakaian tabel kebenaran yang paling sering keluar di ujian: **membuktikan dua ekspresi setara**.

Caranya sederhana dan tidak bisa dibantah: susun kedua ekspresi dalam satu tabel, lalu **bandingkan kolom hasilnya baris per baris**. Kalau **seluruh barisnya sama**, keduanya setara. Kalau ada **satu saja** yang berbeda, keduanya tidak setara.

Contoh di atas membuktikan salah satu **Hukum De Morgan**: ¬(p ∧ q) setara dengan ¬p ∨ ¬q. Perhatikan bahwa negasi tidak sekadar dibagikan — **operatornya juga ikut berubah**, dari ∧ menjadi ∨.

Cara menuliskan kesimpulan yang benar di lembar jawaban: *"Karena kolom hasil keduanya identik untuk seluruh kemungkinan, maka ¬(p ∧ q) ≡ ¬p ∨ ¬q."* Lambang **≡** berarti setara secara logika.

Ada satu jalan pintas yang berguna: **dua ekspresi setara jika dan hanya jika biimplikasinya merupakan tautologi.** Jadi membuktikan A ≡ B sama saja dengan membuktikan A ↔ B bernilai benar di semua baris.

Kalau kamu diminta membuktikan dua ekspresi **tidak** setara, kamu tidak perlu menyusun seluruh tabel — cukup tunjukkan **satu baris** yang hasilnya berbeda. Satu contoh penyangkal sudah cukup.
`
    },
    {
      bahasa: 'python',
      kode: '# Kolom masukan HARUS sesuai jumlah proposisi BERBEDA.\n#\n# (p ∧ q) ∨ (p ∧ ¬q)   -> hanya 2 proposisi berbeda (p, q)\n#                      -> 4 baris, BUKAN 8\n#\n# p muncul dua kali, tapi tetap dihitung SATU',
      penjelasan: `
Kesalahan yang sering terjadi: menghitung jumlah baris dari **banyaknya huruf yang muncul**, bukan dari **banyaknya proposisi yang berbeda**.

Pada \`(p ∧ q) ∨ (p ∧ ¬q)\`, huruf p muncul dua kali dan q muncul dua kali — tapi proposisi berbedanya cuma **dua**, yaitu p dan q. Jadi tabelnya **4 baris**, bukan 8 atau 16.

Yang lebih penting: **satu proposisi harus bernilai sama di sepanjang satu baris.** Kalau di baris pertama p bernilai B, maka **semua** kemunculan p di baris itu bernilai B. Tidak boleh yang satu B dan yang lain S.

Ini terdengar jelas, tapi sering keliru ketika ekspresinya panjang dan huruf yang sama muncul berjauhan.

Cara memastikannya: **sebelum mulai, tulis daftar proposisi berbedanya lebih dulu.** Untuk ekspresi di atas, tulis "proposisi: p, q" lalu simpulkan "2² = 4 baris". Kebiasaan kecil ini mencegah kesalahan yang sulit diperbaiki di tengah pengerjaan.

Catatan tambahan: kalau setelah disederhanakan sebuah ekspresi ternyata tidak lagi memuat suatu proposisi, kolomnya **tetap harus ada** di tabel. Contohnya \`p ∨ ¬p\` bernilai benar terlepas dari nilai p, tapi kolom p tetap ditulis.
`
    }
  ],

  kode: {
    python: String.raw`# Pembangkit tabel kebenaran otomatis — berguna untuk MEMERIKSA
# jawaban yang sudah kamu kerjakan manual, bukan menggantikannya.

from itertools import product


def implikasi(p, q):
    return (not p) or q


def biimplikasi(p, q):
    return p == q


def bl(x):
    return "B" if x else "S"


# ---------- 1. Tabel dasar untuk 2 proposisi ----------
print("=== (p ∧ q) → ¬r ===")
print(f"{'p':^3}|{'q':^3}|{'r':^3}|{'p∧q':^5}|{'¬r':^4}|{'(p∧q)→¬r':^10}")
print("-" * 34)

for p, q, r in product([True, False], repeat=3):
    pq = p and q                      # kolom bantu 1
    nr = not r                        # kolom bantu 2
    hasil = implikasi(pq, nr)         # kolom hasil
    print(f"{bl(p):^3}|{bl(q):^3}|{bl(r):^3}|{bl(pq):^5}|{bl(nr):^4}|{bl(hasil):^10}")


# ---------- 2. Membuktikan dua ekspresi SETARA ----------
def uji_setara(nama_a, fungsi_a, nama_b, fungsi_b, jumlah=2):
    """Bandingkan kolom hasil dua ekspresi untuk semua kemungkinan."""
    print(f"\n=== {nama_a}  vs  {nama_b} ===")
    huruf = ["p", "q", "r"][:jumlah]
    print("| ".join(f"{h:^3}" for h in huruf) +
          f"| {nama_a:^12}| {nama_b:^12}| sama?")
    print("-" * (jumlah * 5 + 36))

    semua_sama = True
    for nilai in product([True, False], repeat=jumlah):
        a = fungsi_a(*nilai)
        b = fungsi_b(*nilai)
        if a != b:
            semua_sama = False
        print("| ".join(f"{bl(v):^3}" for v in nilai) +
              f"| {bl(a):^12}| {bl(b):^12}| {a == b}")

    print(f"-> {'SETARA' if semua_sama else 'TIDAK setara'}")
    return semua_sama


# Hukum De Morgan
uji_setara("¬(p∧q)", lambda p, q: not (p and q),
           "¬p∨¬q",  lambda p, q: (not p) or (not q))

# Implikasi setara dengan ¬p ∨ q
uji_setara("p→q",   implikasi,
           "¬p∨q",  lambda p, q: (not p) or q)

# JEBAKAN: implikasi TIDAK setara dengan konversnya
uji_setara("p→q", implikasi,
           "q→p", lambda p, q: implikasi(q, p))


# ---------- 3. Membuktikan jumlah baris = 2^n ----------
print("\n=== JUMLAH BARIS TABEL ===")
for n in range(1, 11):
    jumlah = len(list(product([True, False], repeat=n)))
    catatan = "  <- masih wajar dikerjakan manual" if n <= 3 else ""
    print(f"  {n:>2} proposisi -> {jumlah:>5} baris{catatan}")

print("\n  menambah SATU proposisi -> baris jadi DUA KALI lipat")
print("  inilah pertumbuhan O(2^n) yang dibahas di Materi Pelengkap")


# ---------- 4. Menghitung jumlah proposisi BERBEDA ----------
print("\n=== JUMLAH PROPOSISI BERBEDA ===")
ekspresi = "(p ∧ q) ∨ (p ∧ ¬q)"
berbeda = sorted(set(c for c in ekspresi if c in "pqrs"))
print(f"  ekspresi          : {ekspresi}")
print(f"  proposisi berbeda : {berbeda}  ({len(berbeda)} buah)")
print(f"  jumlah baris      : 2^{len(berbeda)} = {2 ** len(berbeda)}")
print("  -> p muncul dua kali, tapi tetap dihitung SATU")`,

    js: String.raw`// Pembangkit tabel kebenaran — untuk memeriksa jawaban manualmu.

function implikasi(p, q) { return !p || q; }
function biimplikasi(p, q) { return p === q; }
const bl = function (x) { return x ? "B" : "S"; };

// Membangkitkan semua kombinasi untuk n proposisi
function semuaKombinasi(n) {
    const hasil = [];
    const total = Math.pow(2, n);                 // 2^n baris
    for (let i = 0; i < total; i++) {
        const baris = [];
        for (let j = n - 1; j >= 0; j--) {
            // bit ke-j menentukan nilai; dibalik supaya B dulu
            baris.push(!((i >> j) & 1));
        }
        hasil.push(baris);
    }
    return hasil;
}

// ---------- 1. Tabel (p ∧ q) → ¬r ----------
console.log("=== (p ∧ q) → ¬r ===");
console.log(" p | q | r | p∧q | ¬r | hasil");
console.log("-".repeat(32));

for (const [p, q, r] of semuaKombinasi(3)) {
    const pq = p && q;                            // kolom bantu 1
    const nr = !r;                                // kolom bantu 2
    const hasil = implikasi(pq, nr);              // kolom hasil
    console.log(" " + bl(p) + " | " + bl(q) + " | " + bl(r) +
                " |  " + bl(pq) + "  | " + bl(nr) + "  |   " + bl(hasil));
}

// ---------- 2. Menguji kesetaraan ----------
function ujiSetara(namaA, fa, namaB, fb, n) {
    console.log("\n=== " + namaA + "  vs  " + namaB + " ===");
    let semuaSama = true;

    for (const nilai of semuaKombinasi(n)) {
        const a = fa.apply(null, nilai);
        const b = fb.apply(null, nilai);
        if (a !== b) semuaSama = false;
        console.log("  " + nilai.map(bl).join(",") +
                    " -> " + bl(a) + " vs " + bl(b) +
                    (a === b ? "" : "   <- BERBEDA"));
    }
    console.log("  -> " + (semuaSama ? "SETARA" : "TIDAK setara"));
}

// Hukum De Morgan
ujiSetara("¬(p∧q)", function (p, q) { return !(p && q); },
          "¬p∨¬q",  function (p, q) { return !p || !q; }, 2);

// Implikasi vs konversnya — TIDAK setara
ujiSetara("p→q", implikasi,
          "q→p", function (p, q) { return implikasi(q, p); }, 2);

// ---------- 3. Pertumbuhan 2^n ----------
console.log("\n=== JUMLAH BARIS TABEL ===");
for (let n = 1; n <= 10; n++) {
    const catatan = n <= 3 ? "  <- masih wajar manual" : "";
    console.log("  " + String(n).padStart(2) + " proposisi -> " +
                String(Math.pow(2, n)).padStart(5) + " baris" + catatan);
}
console.log("\n  menambah SATU proposisi -> baris jadi DUA KALI lipat");`
  },

  output: `=== (p ∧ q) → ¬r ===
 p | q | r | p∧q | ¬r |(p∧q)→¬r
----------------------------------
 B | B | B |  B  | S  |    S
 B | B | S |  B  | B  |    B
 B | S | B |  S  | S  |    B
 B | S | S |  S  | B  |    B
 S | B | B |  S  | S  |    B
 S | B | S |  S  | B  |    B
 S | S | B |  S  | S  |    B
 S | S | S |  S  | B  |    B

=== ¬(p∧q)  vs  ¬p∨¬q ===
 p  | q  | ¬(p∧q)      | ¬p∨¬q       | sama?
 B  | B  |      S      |      S      | True
 B  | S  |      B      |      B      | True
 S  | B  |      B      |      B      | True
 S  | S  |      B      |      B      | True
-> SETARA

=== JUMLAH BARIS TABEL ===
   1 proposisi ->     2 baris  <- masih wajar dikerjakan manual
   2 proposisi ->     4 baris  <- masih wajar dikerjakan manual
   3 proposisi ->     8 baris  <- masih wajar dikerjakan manual
   4 proposisi ->    16 baris
  10 proposisi ->  1024 baris`,

  kompleksitas: {
    tabel: [
      { operasi: '1 proposisi', waktu: '2 baris', memori: 'wajar manual' },
      { operasi: '2 proposisi', waktu: '4 baris', memori: 'wajar manual' },
      { operasi: '3 proposisi', waktu: '8 baris', memori: 'wajar manual' },
      { operasi: '4 proposisi', waktu: '16 baris', memori: 'mulai melelahkan' },
      { operasi: '10 proposisi', waktu: '1.024 baris', memori: 'harus dengan program' },
      { operasi: '20 proposisi', waktu: '1.048.576 baris', memori: 'tidak praktis' },
      { operasi: 'n proposisi', waktu: 'O(2ⁿ)', memori: 'O(2ⁿ)' }
    ],
    intuisi: `
**Kenapa 2ⁿ?** Karena tiap proposisi punya **2 kemungkinan** nilai, dan pilihannya **saling bebas**. Menambah satu proposisi berarti setiap baris lama bercabang menjadi dua — sehingga jumlahnya **berlipat dua**.

Kalau kamu sudah membaca topik **Analisis Kompleksitas** di Materi Pelengkap, inilah contoh nyata pertumbuhan **O(2ⁿ)** — kelas paling boros yang dibahas di sana, sekelas dengan fibonacci rekursif polos.

**Akibat praktisnya untuk ujian:** soal biasanya berhenti di 3 proposisi karena 8 baris masih wajar dikerjakan tangan. Kalau kamu menemui soal dengan 4 proposisi, periksa dulu — sering kali ada proposisi yang sebenarnya sama, atau ekspresinya bisa disederhanakan lebih dulu.

**Akibatnya di dunia nyata:** memverifikasi rangkaian digital dengan 32 masukan berarti lebih dari 4 miliar baris — mustahil. Karena itu industri memakai cara lain: penyederhanaan aljabar Boolean, **peta Karnaugh**, atau perangkat pembukti otomatis (*SAT solver*) yang memangkas kemungkinan tanpa memeriksa semuanya.

**Untuk keperluan belajar,** tabel kebenaran tetap alat terbaik justru karena ia **memeriksa semua kemungkinan** — tidak ada celah yang terlewat, sehingga pembuktiannya tidak bisa dibantah.
`
  },

  kesalahanUmum: [
    {
      salah: 'Menghitung jumlah baris dari banyaknya huruf yang muncul, bukan proposisi yang berbeda.',
      kenapa: 'Pada `(p ∧ q) ∨ (p ∧ ¬q)`, huruf p muncul dua kali — tapi proposisi berbedanya cuma dua. Menghitungnya sebagai 4 proposisi menghasilkan 16 baris, padahal seharusnya 4. Seluruh tabelnya jadi salah sejak awal.',
      benar: 'Sebelum mulai, **tulis dulu daftar proposisi berbedanya**, misalnya "proposisi: p, q", lalu simpulkan "2² = 4 baris". Kebiasaan kecil ini mencegah kesalahan yang sulit diperbaiki di tengah jalan.'
    },
    {
      salah: 'Memberi nilai berbeda pada proposisi yang sama dalam satu baris.',
      kenapa: 'Kalau di suatu baris p bernilai B, maka **semua** kemunculan p di baris itu harus B. Kesalahan ini sering terjadi pada ekspresi panjang ketika huruf yang sama muncul berjauhan, dan hasilnya jadi tidak konsisten.',
      benar: 'Kerjakan **per kolom, bukan per baris**: selesaikan seluruh kolom `p ∧ q` untuk semua baris dulu, baru pindah ke kolom berikutnya. Dengan begitu nilainya otomatis konsisten.'
    },
    {
      salah: 'Mengerjakan ekspresi rumit sekaligus tanpa kolom bantu.',
      kenapa: 'Menghitung `(p ∧ q) → (¬r ∨ p)` langsung di kepala untuk 8 baris hampir pasti keliru di salah satu baris. Lebih buruk lagi, kalau hasilnya salah kamu tidak tahu di bagian mana kesalahannya, sehingga harus mengulang semuanya.',
      benar: 'Buat kolom bantu **dari bagian paling dalam ke luar**: kolom `p ∧ q`, kolom `¬r`, kolom `¬r ∨ p`, baru kolom hasil. Selain lebih aman, kamu juga tetap dapat nilai sebagian meski hasil akhirnya keliru.'
    },
    {
      salah: 'Menukar urutan pola pengisian di tengah pengerjaan.',
      kenapa: 'Kalau kolom p diisi B B S S tetapi kolom q diisi dengan pola yang tidak baku, ada kombinasi yang **terlewat** dan ada yang **terhitung dua kali**. Tabelnya jadi tidak mewakili semua kemungkinan, padahal itu justru tujuannya.',
      benar: 'Pakai pola baku: kolom paling kanan berganti tiap baris, dan tiap bergeser ke kiri kecepatannya dibagi dua. Cocokkan dengan bilangan biner menurun untuk memastikan tidak ada yang terlewat.'
    },
    {
      salah: 'Menyimpulkan dua ekspresi setara padahal baru mencocokkan sebagian baris.',
      kenapa: 'Dua ekspresi bisa **kebetulan sama** di beberapa baris tetapi berbeda di baris lain. Contohnya `p → q` dan `q → p` sama di dua baris, tapi berbeda di dua baris sisanya — sehingga keduanya **tidak** setara.',
      benar: 'Bandingkan **seluruh baris** sebelum menyimpulkan setara. Sebaliknya, untuk membuktikan **tidak** setara, cukup tunjukkan **satu** baris yang berbeda.'
    },
    {
      salah: 'Salah membaca urutan operator saat menentukan kolom bantu.',
      kenapa: 'Menganggap `¬p ∧ q` sebagai `¬(p ∧ q)` menghasilkan kolom bantu yang salah, dan seluruh tabel ikut keliru meski cara mengerjakannya sudah benar. Kesalahan ini tidak terlihat sampai jawabannya dicocokkan.',
      benar: 'Sebelum membuat kolom, **tulis ulang ekspresinya dengan tanda kurung lengkap** sesuai urutan ¬, ∧, ∨, →, ↔. Baru setelah itu tentukan kolom bantunya.'
    }
  ],

  analogi: `
Bayangkan tabel kebenaran sebagai **daftar hadir seluruh kemungkinan**. Tugasnya memastikan **tidak ada satu keadaan pun yang terlewat** — dan justru itulah kekuatannya. Kesimpulan dari tabel kebenaran tidak bisa dibantah, karena semua kemungkinan sudah diperiksa.

Untuk **mengingat pola pengisiannya**, hubungkan dengan **odometer** atau **angka biner**. Digit paling kanan berganti tiap langkah, digit di sebelah kirinya berganti setiap kali digit kanan selesai satu putaran. Kalau kamu menganggap B = 1 dan S = 0, isi tabelnya persis bilangan biner menurun.

Cara ini juga menjadi **alat pengecek**: kalau tabelmu tidak bisa dicocokkan dengan hitungan biner, berarti ada baris yang terlewat atau kembar.

Untuk **kebiasaan kolom bantu**, pakai analogi mengerjakan soal matematika bertingkat. Kamu tidak menghitung \`(3 + 4) × (8 − 2)\` sekaligus di kepala — kamu kerjakan isi kurung dulu, tulis hasilnya, baru dikalikan. Tabel kebenaran persis sama: **kerjakan yang paling dalam dulu, tulis, baru lanjut**.

Untuk **mengingat 2ⁿ**, bayangkan **melempar koin**. Satu koin punya 2 hasil, dua koin punya 4 kombinasi, tiga koin punya 8. Menambah satu koin selalu **melipatduakan** kemungkinannya.

Satu kebiasaan yang sangat membantu saat belajar: setelah mengerjakan tabel secara manual, **periksa dengan program** pada contoh kode di atas. Kalau hasilnya berbeda, telusuri kolom bantu mana yang meleset. Cara ini membuatmu belajar dari kesalahan sendiri tanpa perlu menunggu dikoreksi orang lain — dan itu jauh lebih cepat melekat.
`,

  latihan: [
    'Susun tabel kebenaran lengkap untuk `¬p ∨ q`. Berapa baris yang kamu butuhkan, dan kenapa?',
    'Susun tabel kebenaran untuk `(p ∧ q) → r`. Gunakan kolom bantu, jangan langsung ke kolom hasil.',
    'Tentukan berapa baris yang dibutuhkan tiap ekspresi berikut: (a) `p ∧ ¬p`, (b) `(p ∨ q) ∧ (q ∨ r)`, (c) `(p ∧ q) ∨ (p ∧ ¬q) ∨ (¬p ∧ q)`.',
    'Buktikan dengan tabel kebenaran bahwa `¬(p ∨ q)` setara dengan `¬p ∧ ¬q` (Hukum De Morgan kedua).',
    'Buktikan bahwa `p → q` **tidak** setara dengan `q → p`. Cukup tunjukkan baris mana yang berbeda — kenapa satu baris saja sudah cukup?',
    'Susun tabel kebenaran untuk `(p → q) ∧ (q → p)`, lalu bandingkan kolom hasilnya dengan `p ↔ q`. Apa kesimpulanmu?',
    'Kerjakan tabel kebenaran `(p ∨ ¬q) → (p ∧ r)` secara manual, lalu periksa jawabanmu dengan program pada contoh kode. Kalau berbeda, telusuri kolom bantu mana yang meleset.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa tabel dengan 3 proposisi punya 8 baris, dan kenapa jumlahnya berlipat dua tiap menambah satu proposisi.'
  ]
});

TOPICS.push({
  id: 'tautologi',
  judul: 'Tautologi, Kontradiksi & Kontingensi',
  kategori: 'logika',
  tag: ['tautologi', 'kontradiksi', 'kontingensi', 'validitas'],
  ringkas: 'Tiga jenis proposisi majemuk berdasarkan kolom hasil tabel kebenarannya.',

  fungsi: `**Mengenali syarat yang tidak ada gunanya — yang selalu benar atau selalu salah.**

Ini terdengar akademis sampai kamu menemukannya di kode sungguhan. Contoh yang benar-benar sering terjadi:

- \`if (x > 5 || x <= 5)\` — **tautologi**, selalu benar, jadi \`if\`-nya tidak menyaring apa pun
- \`if (status == "aktif" && status == "nonaktif")\` — **kontradiksi**, isinya **tidak akan pernah dijalankan**
- Cabang \`else if\` yang syaratnya sudah tercakup cabang sebelumnya — **kode mati**

Terpakai di:

- **Menemukan kode mati** saat menelaah kode orang lain atau kode lamamu sendiri
- **Menyederhanakan syarat berlapis** — kalau sebagiannya tautologi, ia bisa dibuang
- **Menilai aturan bisnis** — kontradiksi berarti aturannya saling bertabrakan dan harus dikembalikan ke yang menulisnya
- **Cakupan pengujian** — cabang yang mustahil dicapai tidak akan pernah tercakup, berapa pun kasus uji yang kamu tambah

Yang paling berharga: **kontradiksi pada aturan bisnis adalah temuan**, bukan gangguan. Ia berarti dua orang menuliskan aturan yang saling meniadakan, dan tidak ada yang menyadarinya.`,

  praktik: {
    tujuan: `Kamu bisa memeriksa apakah sebuah syarat selalu benar, selalu salah, atau bergantung masukan — dan menemukan kode mati di proyekmu sendiri.`,
    alat: [
      'Python 3',
      'Satu berkas kode lamamu yang punya banyak `if`'
    ],
    langkah: [
      { judul: 'Buat pemeriksa sederhana',
        isi: `Tulis fungsi yang menghitung ekspresimu untuk **semua** kombinasi lalu melihat kolom hasilnya:

- semua **benar** → **tautologi**
- semua **salah** → **kontradiksi**
- **campuran** → **kontingensi** (yang wajar)

Pakai \`itertools.product\` seperti pada topik tabel kebenaran.` },
      { judul: 'Uji tiga bentuk baku dulu',
        isi: `Sebelum memakainya pada kode sungguhan, pastikan pemeriksamu benar dengan bentuk yang sudah pasti jawabannya:

- \`p or not p\` → harus **tautologi**
- \`p and not p\` → harus **kontradiksi**
- \`p and q\` → harus **kontingensi**

Kalau salah satu meleset, pemeriksamu yang salah, bukan logikanya.` },
      { judul: 'Sisir kode lamamu',
        isi: `Cari pola-pola ini di proyek lamamu:

- dua perbandingan pada variabel yang **sama** digabung \`&&\`, misalnya \`x > 10 && x < 5\`
- cabang \`else if\` yang syaratnya **lebih longgar** daripada cabang di atasnya
- \`if\` di dalam \`if\` yang menguji **hal yang sama** dua kali

Ketiganya kandidat kuat tautologi atau kontradiksi.` },
      { judul: 'Buktikan dengan tabel sebelum menghapus',
        isi: `**Jangan langsung menghapus** cabang yang kamu curigai mati. Buat tabelnya dulu dan pastikan semua barisnya salah.

Sering kali cabang itu **tidak** mati — kamu cuma salah membaca urutan operatornya. Menghapusnya akan menghilangkan perilaku yang sebenarnya dipakai.` },
      { judul: 'Manfaatkan tautologi yang berguna',
        isi: `Tidak semua tautologi itu kesalahan. \`p ∨ ¬p\` dipakai dengan sengaja dalam pembuktian, dan hukum-hukum ekuivalensi yang kamu pelajari di topik berikutnya **semuanya tautologi**.

Yang menjadi masalah adalah tautologi yang **tidak disengaja** — yang muncul karena penulisnya keliru.` }
    ],
    cek: [
      '`p or not p` terdeteksi tautologi dan `p and not p` terdeteksi kontradiksi',
      `Setiap cabang yang kamu nyatakan mati sudah dibuktikan dengan tabel yang seluruh barisnya salah`,
      'Setelah menghapus cabang mati, seluruh kasus uji lamamu masih lulus'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
Setelah menyusun tabel kebenaran, perhatikan **kolom hasilnya**. Ternyata cuma ada tiga kemungkinan bentuk, dan masing-masing punya nama.

**Tautologi** — kolom hasilnya **semuanya benar**. Pernyataan seperti ini benar terlepas dari nilai proposisi penyusunnya. Contoh paling sederhana: \`p ∨ ¬p\` — entah p benar atau salah, hasilnya selalu benar. Lambangnya kadang ditulis **T** atau **⊤**.

**Kontradiksi** — kolom hasilnya **semuanya salah**. Selalu salah apa pun nilainya. Contohnya \`p ∧ ¬p\` — mustahil p dan bukan-p benar bersamaan. Lambangnya **F** atau **⊥**.

**Kontingensi** — kolom hasilnya **campuran**, ada benar ada salah. Inilah bentuk yang paling umum; sebagian besar pernyataan yang kita tulis sehari-hari termasuk di sini.

Cara membedakannya sangat langsung: **susun tabel kebenarannya, lalu lihat kolom terakhir.** Semua B berarti tautologi, semua S berarti kontradiksi, campuran berarti kontingensi.

Kenapa tiga istilah ini penting, bukan sekadar penamaan?

- **Tautologi adalah "hukum" logika.** Setiap hukum yang akan kamu pelajari di topik Ekuivalensi sebenarnya adalah tautologi bila ditulis dalam bentuk biimplikasi.
- **Tautologi menandai argumen yang sahih.** Sebuah argumen dinyatakan valid tepat ketika bentuk implikasinya merupakan tautologi — ini dipakai di topik Inferensi.
- **Kontradiksi dipakai untuk pembuktian.** Metode *bukti dengan kontradiksi* bekerja dengan menunjukkan bahwa mengandaikan sebaliknya menghasilkan kontradiksi.

Ada hubungan rapi antara keduanya yang perlu kamu ingat: **negasi dari tautologi selalu kontradiksi, dan sebaliknya.** Kalau A selalu benar, maka ¬A pasti selalu salah.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: 'p ∨ ¬p        # TAUTOLOGI — selalu benar\n\n#  p  | ¬p | p ∨ ¬p\n#  B  | S  |   B\n#  S  | B  |   B\n#              ^^^ semua B',
      penjelasan: `
Ini tautologi paling terkenal, namanya **hukum tengah tersingkir** (*law of excluded middle*). Artinya: sebuah pernyataan **pasti** benar atau salah, tidak ada kemungkinan ketiga.

Kenapa hasilnya selalu benar? Karena \`p\` dan \`¬p\` **selalu berlawanan**. Kalau p benar, sisi kiri disjungsi terpenuhi. Kalau p salah, maka ¬p benar sehingga sisi kanan terpenuhi. Tidak ada keadaan di mana keduanya salah bersamaan — dan disjungsi hanya salah bila kedua sisinya salah.

Contoh tautologi lain yang sering muncul di soal:

- \`p → p\` — apa pun mengakibatkan dirinya sendiri
- \`(p ∧ q) → p\` — kalau keduanya benar, tentu p benar
- \`p → (p ∨ q)\` — kalau p benar, tentu "p atau q" benar
- \`(p ∧ (p → q)) → q\` — inilah **modus ponens**, dibahas di topik Inferensi

Perhatikan bahwa tautologi **tidak memberi informasi baru**. Mengatakan "besok hujan atau tidak hujan" memang selalu benar, tapi tidak berguna untuk memutuskan apa pun. Justru karena selalu benar itulah ia berguna sebagai **aturan penalaran** — bisa dipakai kapan saja tanpa perlu diperiksa lagi.
`
    },
    {
      bahasa: 'python',
      kode: 'p ∧ ¬p        # KONTRADIKSI — selalu salah\n\n#  p  | ¬p | p ∧ ¬p\n#  B  | S  |   S\n#  S  | B  |   S\n#              ^^^ semua S',
      penjelasan: `
Kebalikan tautologi. Karena \`p\` dan \`¬p\` selalu berlawanan, mustahil keduanya benar bersamaan — dan konjungsi butuh keduanya benar.

Ini disebut **hukum kontradiksi**, dan menjadi dasar salah satu metode pembuktian paling kuat di matematika: **bukti dengan kontradiksi** (*reductio ad absurdum*).

Cara kerjanya: untuk membuktikan sesuatu benar, kamu **andaikan sebaliknya**, lalu tunjukkan bahwa pengandaian itu menghasilkan kontradiksi. Karena kontradiksi mustahil, pengandaiannya pasti salah — sehingga yang asli pasti benar.

Contoh terkenalnya adalah pembuktian bahwa √2 bukan bilangan rasional: andaikan ia rasional, turunkan langkah demi langkah, sampai tiba pada kesimpulan yang bertentangan dengan pengandaian awal.

Hubungan yang perlu kamu hafal:

- **¬(tautologi) = kontradiksi**
- **¬(kontradiksi) = tautologi**
- **¬(kontingensi) = kontingensi** — negasi kontingensi tetap kontingensi, cuma polanya terbalik

Poin terakhir sering luput. Kalau kolom hasilnya campuran, membaliknya tetap menghasilkan campuran.
`
    },
    {
      bahasa: 'python',
      kode: 'p → q         # KONTINGENSI — kadang benar, kadang salah\n\n#  p  |  q  | p → q\n#  B  |  B  |   B\n#  B  |  S  |   S     <- ada yang salah\n#  S  |  B  |   B\n#  S  |  S  |   B',
      penjelasan: `
**Kontingensi** adalah bentuk yang paling umum — sebagian besar pernyataan yang kita tulis termasuk di sini. Nilainya **bergantung** pada nilai proposisi penyusunnya.

Cara mengenalinya paling cepat: **begitu kamu menemukan satu baris B dan satu baris S di kolom hasil, langsung simpulkan kontingensi.** Tidak perlu menyelesaikan seluruh tabel.

Ini trik menghemat waktu yang berguna saat ujian. Kalau soal cuma menanyakan *"tentukan apakah ekspresi ini tautologi, kontradiksi, atau kontingensi"*, kamu bisa berhenti begitu menemukan dua nilai berbeda.

Tapi hati-hati dengan arah sebaliknya: **untuk menyimpulkan tautologi, kamu WAJIB memeriksa semua baris.** Menemukan tiga baris bernilai B tidak cukup — baris keempat bisa saja S. Ini kesalahan yang sering terjadi karena orang berhenti terlalu cepat.

Ringkasan cara memeriksa:

- Menemukan **satu S** → **bukan** tautologi, langsung berhenti
- Menemukan **satu B** → **bukan** kontradiksi, langsung berhenti
- Menemukan **B dan S** → pasti **kontingensi**, langsung berhenti
- Menyimpulkan **tautologi atau kontradiksi** → harus periksa **seluruh** baris
`
    },
    {
      bahasa: 'python',
      kode: '# Dua ekspresi SETARA jika biimplikasinya TAUTOLOGI\n#\n#   A ≡ B      jika dan hanya jika      A ↔ B adalah tautologi\n#\n# Contoh: (p → q) ↔ (¬p ∨ q)  -> semua barisnya B -> SETARA',
      penjelasan: `
Inilah jembatan antara topik ini dan topik **Ekuivalensi** berikutnya, dan hubungannya sangat rapi.

Ingat bahwa **biimplikasi bernilai benar ketika kedua sisinya bernilai sama**. Jadi kalau \`A ↔ B\` bernilai benar di **semua baris**, artinya A dan B **selalu bernilai sama** — dan itulah definisi setara.

Karena itu ada dua cara membuktikan kesetaraan, dan keduanya sah:

- **Bandingkan dua kolom** — susun kolom A dan kolom B, lalu periksa apakah identik baris per baris
- **Buktikan A ↔ B tautologi** — susun satu kolom untuk biimplikasinya, lalu periksa apakah semuanya B

Keduanya menghasilkan kesimpulan yang sama. Cara pertama lebih mudah dilihat; cara kedua lebih ringkas ditulis.

Hubungan serupa juga berlaku untuk argumen, dan akan kamu pakai di topik Inferensi:

**Sebuah argumen sahih jika dan hanya jika (gabungan semua premis) → (kesimpulan) merupakan tautologi.**

Jadi tautologi bukan sekadar penggolongan — ia adalah **alat uji** untuk kesetaraan maupun kesahihan.
`
    }
  ],

  kode: {
    python: String.raw`from itertools import product


def bl(x):
    return "B" if x else "S"


def golongkan(fungsi, jumlah_proposisi):
    """Menentukan apakah ekspresi tautologi, kontradiksi, atau kontingensi."""
    hasil = [fungsi(*nilai)
             for nilai in product([True, False], repeat=jumlah_proposisi)]

    if all(hasil):
        return "TAUTOLOGI"
    if not any(hasil):
        return "KONTRADIKSI"
    return "KONTINGENSI"


def tampilkan(nama, fungsi, n=2):
    hasil = [fungsi(*nilai) for nilai in product([True, False], repeat=n)]
    kolom = " ".join(bl(x) for x in hasil)
    print(f"  {nama:<24} -> [{kolom}]  {golongkan(fungsi, n)}")


# ---------- Operator bantu ----------
def imp(p, q):
    return (not p) or q


print("=== MENGGOLONGKAN EKSPRESI ===")

# Tautologi
tampilkan("p ∨ ¬p", lambda p, q: p or (not p))
tampilkan("p → p", lambda p, q: imp(p, p))
tampilkan("(p ∧ q) → p", lambda p, q: imp(p and q, p))
tampilkan("p → (p ∨ q)", lambda p, q: imp(p, p or q))
tampilkan("(p ∧ (p → q)) → q", lambda p, q: imp(p and imp(p, q), q))

print()
# Kontradiksi
tampilkan("p ∧ ¬p", lambda p, q: p and (not p))
tampilkan("(p ↔ q) ∧ (p ⊕ q)", lambda p, q: (p == q) and (p != q))

print()
# Kontingensi
tampilkan("p → q", imp)
tampilkan("p ∧ q", lambda p, q: p and q)
tampilkan("p ↔ q", lambda p, q: p == q)


# ---------- Negasi tautologi = kontradiksi ----------
print("\n=== NEGASI MEMBALIK GOLONGANNYA ===")
pasangan = [
    ("p ∨ ¬p", lambda p, q: p or (not p)),
    ("¬(p ∨ ¬p)", lambda p, q: not (p or (not p))),
    ("p → q", imp),
    ("¬(p → q)", lambda p, q: not imp(p, q)),
]
for nama, f in pasangan:
    print(f"  {nama:<14} -> {golongkan(f, 2)}")
print("  -> negasi tautologi jadi kontradiksi,")
print("     tapi negasi kontingensi TETAP kontingensi")


# ---------- Kesetaraan = biimplikasi yang tautologi ----------
print("\n=== A ≡ B  <=>  A ↔ B TAUTOLOGI ===")

def uji_kesetaraan(nama_a, fa, nama_b, fb):
    bi = lambda p, q: fa(p, q) == fb(p, q)      # A ↔ B
    status = golongkan(bi, 2)
    print(f"  ({nama_a}) ↔ ({nama_b})")
    print(f"    -> {status}" +
          ("   maka SETARA" if status == "TAUTOLOGI" else "   maka TIDAK setara"))

uji_kesetaraan("p → q", imp, "¬p ∨ q", lambda p, q: (not p) or q)
uji_kesetaraan("p → q", imp, "q → p", lambda p, q: imp(q, p))


# ---------- Trik menghemat waktu ----------
print("\n=== TRIK MEMERIKSA CEPAT ===")
print("  ketemu satu S  -> BUKAN tautologi, berhenti")
print("  ketemu satu B  -> BUKAN kontradiksi, berhenti")
print("  ketemu B dan S -> pasti KONTINGENSI, berhenti")
print("  simpulkan tautologi/kontradiksi -> WAJIB periksa SEMUA baris")`,

    js: String.raw`function bl(x) { return x ? "B" : "S"; }
function imp(p, q) { return !p || q; }

// Membangkitkan semua kombinasi untuk n proposisi
function semuaKombinasi(n) {
    const hasil = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        const baris = [];
        for (let j = n - 1; j >= 0; j--) baris.push(!((i >> j) & 1));
        hasil.push(baris);
    }
    return hasil;
}

function golongkan(fungsi, n) {
    const hasil = semuaKombinasi(n).map(function (v) { return fungsi.apply(null, v); });
    if (hasil.every(Boolean)) return "TAUTOLOGI";
    if (!hasil.some(Boolean)) return "KONTRADIKSI";
    return "KONTINGENSI";
}

function tampilkan(nama, fungsi, n) {
    n = n || 2;
    const kolom = semuaKombinasi(n)
        .map(function (v) { return bl(fungsi.apply(null, v)); })
        .join(" ");
    console.log("  " + nama.padEnd(24) + " -> [" + kolom + "]  " + golongkan(fungsi, n));
}

console.log("=== MENGGOLONGKAN EKSPRESI ===");

// Tautologi
tampilkan("p ∨ ¬p", function (p) { return p || !p; });
tampilkan("p → p", function (p) { return imp(p, p); });
tampilkan("(p ∧ q) → p", function (p, q) { return imp(p && q, p); });
tampilkan("(p ∧ (p → q)) → q", function (p, q) { return imp(p && imp(p, q), q); });

console.log();
// Kontradiksi
tampilkan("p ∧ ¬p", function (p) { return p && !p; });

console.log();
// Kontingensi
tampilkan("p → q", imp);
tampilkan("p ↔ q", function (p, q) { return p === q; });

// Kesetaraan = biimplikasi yang tautologi
console.log("\n=== A ≡ B  <=>  A ↔ B TAUTOLOGI ===");
function ujiKesetaraan(namaA, fa, namaB, fb) {
    const bi = function (p, q) { return fa(p, q) === fb(p, q); };
    const status = golongkan(bi, 2);
    console.log("  (" + namaA + ") ↔ (" + namaB + ") -> " + status +
                (status === "TAUTOLOGI" ? "   maka SETARA" : "   maka TIDAK setara"));
}

ujiKesetaraan("p → q", imp, "¬p ∨ q", function (p, q) { return !p || q; });
ujiKesetaraan("p → q", imp, "q → p", function (p, q) { return imp(q, p); });`
  },

  output: `=== MENGGOLONGKAN EKSPRESI ===
  p ∨ ¬p                   -> [B B B B]  TAUTOLOGI
  p → p                    -> [B B B B]  TAUTOLOGI
  (p ∧ q) → p              -> [B B B B]  TAUTOLOGI
  p → (p ∨ q)              -> [B B B B]  TAUTOLOGI
  (p ∧ (p → q)) → q        -> [B B B B]  TAUTOLOGI

  p ∧ ¬p                   -> [S S S S]  KONTRADIKSI
  (p ↔ q) ∧ (p ⊕ q)        -> [S S S S]  KONTRADIKSI

  p → q                    -> [B S B B]  KONTINGENSI
  p ∧ q                    -> [B S S S]  KONTINGENSI
  p ↔ q                    -> [B S S B]  KONTINGENSI

=== A ≡ B  <=>  A ↔ B TAUTOLOGI ===
  (p → q) ↔ (¬p ∨ q)
    -> TAUTOLOGI   maka SETARA
  (p → q) ↔ (q → p)
    -> KONTINGENSI   maka TIDAK setara`,

  kesalahanUmum: [
    {
      salah: 'Menyimpulkan tautologi setelah memeriksa sebagian baris saja.',
      kenapa: 'Tiga baris bernilai B tidak menjamin baris keempat juga B. Ekspresi `p → q` bernilai B di tiga baris dan hanya S di satu baris — kalau berhenti terlalu cepat, ia bisa keliru digolongkan tautologi padahal kontingensi.',
      benar: 'Untuk menyimpulkan **tautologi atau kontradiksi**, periksa **seluruh** baris tanpa kecuali. Berhenti lebih awal hanya boleh untuk menyimpulkan **kontingensi**, yaitu begitu kamu menemukan satu B dan satu S.'
    },
    {
      salah: 'Mengira tautologi berarti "pernyataan yang benar".',
      kenapa: 'Tautologi berarti **selalu** benar karena bentuknya, bukan karena isinya. "Hari ini Senin atau bukan Senin" adalah tautologi, sedangkan "Jakarta ibu kota Indonesia" hanya kebetulan benar — nilainya bergantung kenyataan, bukan bentuk logikanya.',
      benar: 'Tautologi dinilai dari **bentuk**, bukan isi. Ujinya selalu sama: susun tabel kebenaran, dan pastikan seluruh kolom hasilnya B.'
    },
    {
      salah: 'Mengira negasi kontingensi menghasilkan tautologi atau kontradiksi.',
      kenapa: 'Membalik kolom campuran tetap menghasilkan kolom campuran. Kalau `p → q` bernilai [B S B B], maka negasinya bernilai [S B S S] — tetap ada B dan ada S, sehingga tetap kontingensi.',
      benar: 'Hafalkan ketiganya: **¬tautologi = kontradiksi**, **¬kontradiksi = tautologi**, dan **¬kontingensi = kontingensi**.'
    },
    {
      salah: 'Mengira ekspresi yang panjang dan rumit pasti kontingensi.',
      kenapa: 'Panjang ekspresi tidak menentukan golongannya. `(p → q) ∧ (q → r) → (p → r)` terlihat rumit tapi merupakan **tautologi** — ia adalah aturan silogisme hipotetis.',
      benar: 'Jangan menebak dari penampilan. Selalu susun tabelnya. Justru banyak tautologi penting yang bentuknya panjang, karena tautologi itulah yang menjadi aturan inferensi.'
    },
    {
      salah: 'Lupa bahwa kesetaraan bisa diuji lewat tautologi biimplikasi.',
      kenapa: 'Banyak yang hanya tahu satu cara, yaitu membandingkan dua kolom. Padahal soal sering meminta bentuk lain, misalnya *"buktikan bahwa A ↔ B merupakan tautologi"* — yang sebenarnya menanyakan hal yang sama.',
      benar: 'Ingat hubungannya: **A ≡ B jika dan hanya jika A ↔ B tautologi.** Dua cara, satu kesimpulan. Pakai yang lebih cocok dengan bentuk soalnya.'
    }
  ],

  analogi: `
Bayangkan tiga jenis pernyataan ini sebagai **tiga jenis ramalan cuaca**.

- **Tautologi** — *"Besok hujan atau tidak hujan."* Selalu benar, tapi **tidak berguna** untuk memutuskan apakah kamu perlu membawa payung. Benar karena bentuknya, bukan karena tahu sesuatu tentang cuaca.
- **Kontradiksi** — *"Besok hujan dan tidak hujan."* Selalu salah, mustahil terjadi.
- **Kontingensi** — *"Besok hujan."* Bisa benar bisa salah, dan **justru inilah yang membawa informasi**.

Pelajaran yang bisa diambil: **semakin sering sebuah pernyataan benar, semakin sedikit informasi yang dikandungnya.** Tautologi selalu benar justru karena tidak menyatakan apa-apa tentang kenyataan.

Lalu kenapa tautologi tetap penting? Karena justru sifat "selalu benar" itu membuatnya bisa **dipakai kapan saja tanpa perlu diperiksa lagi**. Itulah yang menjadikannya aturan penalaran — dan seluruh hukum logika di topik berikutnya adalah tautologi.

Untuk **mengingat cara memeriksanya**, pakai perumpamaan **memeriksa saklar lampu**:

- Kalau lampu menyala di **semua** posisi saklar → tautologi
- Kalau **tidak pernah** menyala → kontradiksi
- Kalau kadang menyala kadang tidak → kontingensi

Untuk **menghemat waktu di ujian**, ingat satu kalimat: **satu penyangkal sudah cukup untuk membatalkan, tapi membuktikan butuh semuanya.** Menemukan satu S langsung membatalkan tautologi. Tapi untuk memastikan tautologi, tidak ada jalan pintas — semua baris harus diperiksa.

Cara menguji pemahamanmu sendiri: ambil beberapa ekspresi dari contoh kode, tebak dulu golongannya sebelum menjalankan programnya. Kalau tebakanmu meleset, susun tabelnya manual untuk menemukan di mana penalaranmu salah.
`,

  latihan: [
    'Tentukan golongan tiap ekspresi berikut dengan tabel kebenaran: (a) `p ∨ ¬p`, (b) `p ∧ ¬p`, (c) `p → ¬p`, (d) `(p → q) ∨ (q → p)`.',
    'Buktikan bahwa `(p ∧ q) → p` adalah tautologi. Kenapa hasilnya masuk akal kalau dibaca dalam bahasa sehari-hari?',
    'Tentukan golongan `(p → q) ∧ (p ∧ ¬q)`. Apa arti hasilnya, dan mengapa demikian?',
    'Ekspresi `p → ¬p` terlihat mustahil, tetapi ternyata **bukan** kontradiksi. Susun tabelnya dan jelaskan kenapa.',
    'Buktikan bahwa `(p ∧ (p → q)) → q` adalah tautologi. Aturan inferensi apa yang sebenarnya kamu buktikan?',
    'Ambil tiga ekspresi kontingensi, negasikan masing-masing, lalu tentukan golongan hasilnya. Apa polanya?',
    'Buktikan `p → q` setara dengan `¬q → ¬p` dengan dua cara: membandingkan dua kolom, dan membuktikan biimplikasinya tautologi.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa untuk membantah tautologi cukup satu baris, tetapi untuk membuktikannya harus semua baris.'
  ]
});

TOPICS.push({
  id: 'ekuivalensi',
  judul: 'Ekuivalensi & Hukum-Hukum Logika',
  kategori: 'logika',
  tag: ['ekuivalensi', 'hukum logika', 'de morgan', 'penyederhanaan', 'setara'],
  ringkas: 'Daftar hukum yang memungkinkan menyederhanakan ekspresi logika tanpa menyusun tabel kebenaran.',

  fungsi: `**Menyederhanakan syarat berbelit menjadi bentuk yang bisa dibaca manusia — tanpa mengubah artinya.**

Ini langsung terpakai setiap kali kamu berhadapan dengan kode seperti:

- \`if (!(a && b))\` → jadi \`if (!a || !b)\` lewat **De Morgan**
- \`if (!(x > 5))\` → jadi \`if (x <= 5)\`
- \`if (a && (b || c))\` → jadi \`if ((a && b) || (a && c))\` lewat **distributif**

Terpakai di:

- **Menelaah kode** — mengubah syarat yang membingungkan jadi bentuk yang jelas
- **Klausa WHERE SQL** — bentuk yang setara bisa jauh berbeda kecepatannya, dan optimizer tidak selalu menemukannya
- **Menyederhanakan rangkaian digital** di Organisasi Komputer, di mana tiap gerbang yang dibuang berarti biaya yang dihemat
- **Logika Fuzzy semester 4** — De Morgan tetap berlaku di sana, dan kamu akan memeriksanya sendiri

De Morgan adalah yang paling sering dipakai, dan pantas dihafal: **negasi membalik operatornya.** Bukan cuma menaruh tanda seru di depan.`,

  praktik: {
    tujuan: `Kamu bisa menyederhanakan syarat berlapis dengan hukum ekuivalensi, dan membuktikan hasilnya setara dengan yang asli.`,
    alat: [
      'Python 3',
      'Daftar hukum ekuivalensi (ada di bagian Konsep)'
    ],
    langkah: [
      { judul: 'Cari syarat berbelit di kodemu',
        isi: `Kandidat terbaik: \`if\` yang **diawali tanda seru dan berisi kurung**, seperti \`if (!(sudahBayar && stokAda))\`.

Bentuk itu sulit dibaca karena otak harus menahan negasinya sambil membaca isi kurung.` },
      { judul: 'Terapkan De Morgan',
        isi: `Aturannya dua baris, dan **operatornya ikut berbalik**:

- \`¬(p ∧ q)\` menjadi \`¬p ∨ ¬q\`
- \`¬(p ∨ q)\` menjadi \`¬p ∧ ¬q\`

Jadi \`!(sudahBayar && stokAda)\` menjadi \`!sudahBayar || !stokAda\` — dibaca: *"belum bayar, atau stoknya habis"*. Jauh lebih mudah dipahami.

**Kesalahan yang paling sering:** menulis \`!sudahBayar && !stokAda\`. Itu artinya *"belum bayar DAN stok habis"* — sama sekali berbeda.` },
      { judul: 'Buktikan kesetaraannya dengan tabel',
        isi: `Jangan percaya pada ingatan. Hitung kedua bentuk untuk semua kombinasi dan bandingkan barisnya.

Ini butuh sepuluh baris kode dan menyelamatkanmu dari bug yang sangat sulit dilacak — karena syarat yang salah **tetap berjalan**, hanya memberi jawaban keliru pada sebagian masukan.` },
      { judul: 'Bersihkan negasi ganda dan perbandingan',
        isi: `- \`!(!p)\` menjadi \`p\`
- \`!(x > 5)\` menjadi \`x <= 5\` — jangan tinggalkan tanda seru di depan perbandingan
- \`!(x == y)\` menjadi \`x != y\`

Ketiganya sepele, tetapi kode yang penuh negasi bertumpuk melelahkan dibaca.` },
      { judul: 'Terapkan ke SQL',
        isi: `Buka satu kueri lamamu yang punya \`WHERE NOT (... AND ...)\`.

Ubah dengan De Morgan, jalankan keduanya, dan **bandingkan jumlah baris hasilnya**. Kalau berbeda, penerapanmu salah.

Untuk tabel besar, bandingkan juga waktunya — kadang bentuk yang setara jauh lebih cepat karena bisa memakai indeks.` },
      { judul: 'Simpan hukumnya di tempat yang mudah dilihat',
        isi: `Tulis De Morgan, distributif, dan negasi ganda di catatan yang kamu buka saat mengerjakan tugas.

Menghafalnya akan datang sendiri setelah dipakai belasan kali — tetapi sebelum itu, **melihat daftarnya jauh lebih aman daripada menebak**.` }
    ],
    cek: [
      'Bentuk asli dan bentuk sederhanamu memberi hasil sama di seluruh baris tabel kebenaran',
      'Kueri SQL sebelum dan sesudah disederhanakan mengembalikan jumlah baris yang sama persis',
      'Tidak ada lagi tanda seru yang langsung membungkus tanda perbandingan'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
Dua ekspresi disebut **ekuivalen** (setara) bila **nilainya selalu sama** untuk semua kemungkinan. Lambangnya **≡**, dibaca "setara dengan".

Kamu sudah tahu satu cara membuktikannya: susun tabel kebenaran, lalu bandingkan kolom hasilnya. Cara itu selalu benar, tapi punya kelemahan — untuk 4 proposisi kamu harus mengerjakan 16 baris, dan untuk 5 proposisi 32 baris.

**Cara kedua jauh lebih cepat: memakai hukum-hukum logika**, mirip seperti menyederhanakan bentuk aljabar. Kamu tidak menghitung apa pun; kamu **mengganti bentuk** langkah demi langkah sampai menjadi bentuk yang dituju.

Berikut hukum-hukum yang perlu kamu kuasai. Perhatikan bahwa hampir semuanya **berpasangan** — versi ∧ dan versi ∨:

- **Identitas** — \`p ∧ T ≡ p\` · \`p ∨ F ≡ p\`
- **Dominasi** — \`p ∨ T ≡ T\` · \`p ∧ F ≡ F\`
- **Idempoten** — \`p ∧ p ≡ p\` · \`p ∨ p ≡ p\`
- **Negasi ganda** — \`¬(¬p) ≡ p\`
- **Komutatif** — \`p ∧ q ≡ q ∧ p\` · \`p ∨ q ≡ q ∨ p\`
- **Asosiatif** — \`(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)\`
- **Distributif** — \`p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)\`
- **De Morgan** — \`¬(p ∧ q) ≡ ¬p ∨ ¬q\` · \`¬(p ∨ q) ≡ ¬p ∧ ¬q\`
- **Absorpsi** — \`p ∨ (p ∧ q) ≡ p\` · \`p ∧ (p ∨ q) ≡ p\`
- **Negasi** — \`p ∨ ¬p ≡ T\` · \`p ∧ ¬p ≡ F\`
- **Implikasi** — \`p → q ≡ ¬p ∨ q\`
- **Kontraposisi** — \`p → q ≡ ¬q → ¬p\`
- **Biimplikasi** — \`p ↔ q ≡ (p → q) ∧ (q → p)\`

Tiga yang terakhir paling sering dipakai, karena memungkinkan kamu **membuang implikasi** dan mengubah seluruh ekspresi menjadi hanya ¬, ∧, dan ∨ — bentuk yang jauh lebih mudah disederhanakan.

Kalau daftar ini terasa banyak, ada kabar baik: **kamu tidak perlu menghafal semuanya.** Yang wajib benar-benar hafal cuma **De Morgan**, **Implikasi**, dan **Distributif**. Sisanya akan melekat sendiri lewat latihan, dan kebanyakan terasa masuk akal begitu dibaca.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '¬(p ∧ q) ≡ ¬p ∨ ¬q      # De Morgan 1\n¬(p ∨ q) ≡ ¬p ∧ ¬q      # De Morgan 2\n\n# negasi MASUK ke dalam, dan operatornya BERTUKAR',
      penjelasan: `
**De Morgan adalah hukum yang paling sering dipakai**, sekaligus yang paling sering salah diterapkan. Wajib hafal.

Aturannya dua langkah, dan **keduanya harus dilakukan**:

- **Negasi dibagikan** ke tiap bagian
- **Operatornya bertukar** — ∧ menjadi ∨, dan ∨ menjadi ∧

Langkah kedua inilah yang sering terlupakan. Menulis \`¬(p ∧ q) ≡ ¬p ∧ ¬q\` adalah kesalahan klasik: negasinya sudah dibagikan, tapi operatornya lupa ditukar.

Cara memahaminya lewat bahasa sehari-hari sangat membantu:

- \`¬(p ∧ q)\` berarti *"tidak benar bahwa keduanya terjadi"*. Kalau tidak keduanya, berarti **minimal satu tidak terjadi** — itulah \`¬p ∨ ¬q\`
- \`¬(p ∨ q)\` berarti *"tidak satu pun terjadi"*. Berarti **kedua-duanya tidak terjadi** — itulah \`¬p ∧ ¬q\`

Contoh nyata: lawan dari *"saya lulus **dan** dapat beasiswa"* bukan *"saya tidak lulus dan tidak dapat beasiswa"*, melainkan *"saya tidak lulus **atau** tidak dapat beasiswa"* — cukup salah satu gagal untuk membatalkan pernyataan aslinya.

Hukum ini juga langsung terpakai di pemrograman. Kondisi \`!(a && b)\` setara dengan \`!a || !b\`, dan sering dipakai untuk membalik logika \`if\` agar lebih mudah dibaca.
`
    },
    {
      bahasa: 'python',
      kode: 'p → q  ≡  ¬p ∨ q\n\n# Implikasi bisa DIBUANG dan diganti disjungsi.\n# Ini biasanya LANGKAH PERTAMA saat menyederhanakan.',
      penjelasan: `
Hukum ini adalah **kunci pembuka** hampir semua soal penyederhanaan.

Masalahnya, implikasi sulit disederhanakan secara langsung — hukum distributif, absorpsi, dan De Morgan semuanya bekerja pada ∧ dan ∨, bukan pada →. Jadi selama masih ada tanda →, kamu tidak bisa berbuat banyak.

Solusinya: **buang dulu semua implikasi** dengan mengubahnya menjadi \`¬p ∨ q\`. Setelah itu barulah hukum-hukum lain bisa dipakai.

Kenapa \`p → q\` setara dengan \`¬p ∨ q\`? Ingat kembali tabel implikasi: ia hanya salah pada satu baris, yaitu ketika p benar dan q salah. Sekarang perhatikan \`¬p ∨ q\` — ia juga hanya salah ketika ¬p salah (berarti p benar) dan q salah. Persis baris yang sama.

Karena itu **urutan baku menyederhanakan ekspresi logika** adalah:

- **Buang biimplikasi** → ubah \`p ↔ q\` menjadi \`(p → q) ∧ (q → p)\`
- **Buang implikasi** → ubah \`p → q\` menjadi \`¬p ∨ q\`
- **Dorong negasi ke dalam** memakai De Morgan dan negasi ganda
- **Sederhanakan** dengan distributif, absorpsi, idempoten, dan lainnya

Mengikuti urutan ini membuat soal yang tadinya membingungkan menjadi mekanis.
`
    },
    {
      bahasa: 'python',
      kode: 'p → q  ≡  ¬q → ¬p       # KONTRAPOSISI — setara\n\n# TAPI:\np → q  ≢  q → p         # konvers — TIDAK setara\np → q  ≢  ¬p → ¬q       # invers  — TIDAK setara',
      penjelasan: `
Dari tiga bentuk turunan implikasi, **hanya kontraposisi yang setara** dengan aslinya. Ini sangat sering diujikan, dan sering dijawab keliru.

Cara memahaminya lewat contoh: *"Jika hujan, maka jalanan basah."*

- **Kontraposisi**: *"Jika jalanan **tidak** basah, maka **tidak** hujan."* → masuk akal. Kalau benar-benar hujan, jalanan pasti basah; jadi jalanan kering membuktikan tidak hujan
- **Konvers**: *"Jika jalanan basah, maka hujan."* → **tidak** masuk akal. Jalanan bisa basah karena disiram
- **Invers**: *"Jika tidak hujan, maka jalanan tidak basah."* → juga tidak masuk akal, dengan alasan yang sama

Perhatikan bahwa konvers dan invers **salah karena alasan yang sama** — dan memang keduanya setara satu sama lain, karena invers adalah kontraposisi dari konvers.

Kegunaan praktis kontraposisi: kadang membuktikan \`¬q → ¬p\` **jauh lebih mudah** daripada membuktikan \`p → q\` secara langsung. Karena keduanya setara, membuktikan salah satu sudah cukup. Teknik ini dipakai luas dalam pembuktian matematika, dan namanya **bukti kontrapositif**.

Ketiga bentuk ini dibahas lebih dalam di topik tersendiri berikutnya.
`
    },
    {
      bahasa: 'python',
      kode: '# Menyederhanakan LANGKAH DEMI LANGKAH, sertakan nama hukumnya\n#\n#   ¬(p → q)\n# ≡ ¬(¬p ∨ q)        [hukum implikasi]\n# ≡ ¬(¬p) ∧ ¬q       [De Morgan]\n# ≡ p ∧ ¬q           [negasi ganda]',
      penjelasan: `
Inilah cara menuliskan penyederhanaan yang **diharapkan di lembar jawaban**: satu langkah per baris, dengan **nama hukumnya ditulis di sebelah kanan**.

Kenapa nama hukum harus ditulis? Karena yang dinilai bukan cuma hasil akhirnya, tapi **alasan tiap langkah**. Tanpa nama hukum, pemeriksa tidak bisa memastikan kamu paham atau sekadar menebak — dan biasanya nilainya dipotong meski hasilnya benar.

Perhatikan hasil akhir contoh di atas: **negasi dari "jika p maka q" adalah "p benar tetapi q salah"**. Ini masuk akal kalau dikaitkan dengan analogi janji: satu-satunya cara melanggar janji adalah syaratnya terpenuhi tapi hasilnya tidak dipenuhi.

Tiga nasihat praktis saat mengerjakan:

- **Kerjakan satu hukum per baris.** Menggabungkan dua langkah sekaligus adalah sumber kesalahan tersering, dan menyulitkan pelacakan kalau hasilnya keliru
- **Jangan melompat ke jawaban.** Kalau kamu sudah menebak hasil akhirnya, tetap tuliskan jalannya
- **Periksa hasilnya dengan tabel kebenaran** kalau sempat. Kalau kolom akhirnya berbeda, berarti ada langkah yang salah

Nasihat terakhir sangat berguna saat belajar sendiri: penyederhanaan aljabar cepat tapi rawan salah, sedangkan tabel kebenaran lambat tapi pasti. Pakai yang kedua untuk memeriksa yang pertama.
`
    },
    {
      bahasa: 'python',
      kode: 'p ∨ (p ∧ q) ≡ p         # ABSORPSI\n\n# "p, atau (p dan q)" -> cukup p saja\n# Kalau p sudah benar, bagian keduanya tidak menambah apa-apa.',
      penjelasan: `
**Absorpsi** sering terlewat padahal sangat berguna untuk memangkas ekspresi panjang dengan cepat.

Cara memahaminya tanpa menghafal: perhatikan bahwa \`p ∧ q\` **hanya bisa benar kalau p benar**. Jadi \`p ∨ (p ∧ q)\` sebenarnya berkata *"p benar, atau p benar bersama sesuatu"* — dan keduanya sama saja menuntut p benar. Bagian \`∧ q\` tidak menambah kemungkinan apa pun.

Pasangannya juga berlaku: \`p ∧ (p ∨ q) ≡ p\`. Kalau p sudah harus benar, syarat "p atau q" otomatis terpenuhi sehingga tidak menambah batasan.

Contoh sehari-hari: *"Saya akan datang kalau libur, atau kalau libur dan cuaca cerah."* Kalimat kedua tidak menambah apa pun — cukup katakan *"saya datang kalau libur"*.

Beberapa hukum lain yang cara memahaminya serupa:

- **Dominasi** \`p ∨ T ≡ T\` — kalau salah satu sisinya pasti benar, seluruhnya pasti benar apa pun p
- **Identitas** \`p ∧ T ≡ p\` — menambahkan syarat yang selalu terpenuhi tidak mengubah apa-apa
- **Idempoten** \`p ∨ p ≡ p\` — mengulang syarat yang sama tidak menambah apa-apa

Semua hukum ini terasa masuk akal begitu dibaca sebagai kalimat, bukan sebagai rumus. Itu cara terbaik mengingatnya.
`
    },
    {
      bahasa: 'python',
      kode: 'p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)     # DISTRIBUTIF 1\np ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)     # DISTRIBUTIF 2\n\n# Yang KEDUA tidak punya padanan di aljabar biasa!',
      penjelasan: `
Distributif pertama terasa akrab karena mirip aljabar biasa: \`a × (b + c) = ab + ac\`. Kalau kamu menganggap ∧ sebagai perkalian dan ∨ sebagai penjumlahan, bentuknya persis sama.

**Tapi distributif kedua tidak punya padanan di aljabar biasa.** Dalam aljabar, \`a + (b × c)\` **tidak** sama dengan \`(a + b) × (a + c)\`. Coba masukkan angka: \`2 + (3 × 4) = 14\`, sedangkan \`(2+3) × (2+4) = 30\`.

Namun dalam logika, \`p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)\` **benar-benar berlaku**. Inilah salah satu tempat di mana intuisi aljabar justru menyesatkan, jadi berhati-hatilah.

Cara memahaminya lewat kalimat: *"p benar, atau q dan r keduanya benar"*. Kalau ini terjadi, maka pasti *"p atau q"* benar (karena kalau bukan p, berarti q) **dan** *"p atau r"* benar. Arah sebaliknya juga bisa dirunut serupa.

Distributif sangat berguna untuk mengubah bentuk ekspresi menjadi susunan baku. Dua bentuk baku yang mungkin kamu temui di kuliah lanjutan:

- **DNF** (*disjunctive normal form*) — gabungan dari beberapa konjungsi, seperti \`(p ∧ q) ∨ (¬p ∧ r)\`
- **CNF** (*conjunctive normal form*) — konjungsi dari beberapa disjungsi

Bentuk-bentuk ini dipakai pada penyederhanaan rangkaian digital dan pada perangkat pembukti otomatis.
`
    }
  ],

  kode: {
    python: String.raw`from itertools import product


def bl(x):
    return "B" if x else "S"


def imp(p, q):
    return (not p) or q


def setara(fa, fb, n=2):
    """Memeriksa dua ekspresi setara dengan membandingkan semua baris."""
    return all(fa(*v) == fb(*v) for v in product([True, False], repeat=n))


def uji(nama, fa, fb, n=2):
    status = "SETARA" if setara(fa, fb, n) else "TIDAK setara"
    print(f"  {nama:<38} -> {status}")


print("=== MEMERIKSA HUKUM-HUKUM LOGIKA ===\n")

print("Identitas & Dominasi")
uji("p ∧ T ≡ p", lambda p, q: p and True, lambda p, q: p)
uji("p ∨ F ≡ p", lambda p, q: p or False, lambda p, q: p)
uji("p ∨ T ≡ T", lambda p, q: p or True, lambda p, q: True)
uji("p ∧ F ≡ F", lambda p, q: p and False, lambda p, q: False)

print("\nIdempoten & Negasi ganda")
uji("p ∧ p ≡ p", lambda p, q: p and p, lambda p, q: p)
uji("¬(¬p) ≡ p", lambda p, q: not (not p), lambda p, q: p)

print("\nKomutatif & Distributif")
uji("p ∧ q ≡ q ∧ p", lambda p, q: p and q, lambda p, q: q and p)
uji("p ∧ (q ∨ r) ≡ (p∧q) ∨ (p∧r)",
    lambda p, q, r: p and (q or r),
    lambda p, q, r: (p and q) or (p and r), 3)
uji("p ∨ (q ∧ r) ≡ (p∨q) ∧ (p∨r)",
    lambda p, q, r: p or (q and r),
    lambda p, q, r: (p or q) and (p or r), 3)

print("\nDe Morgan  <- WAJIB HAFAL")
uji("¬(p ∧ q) ≡ ¬p ∨ ¬q",
    lambda p, q: not (p and q), lambda p, q: (not p) or (not q))
uji("¬(p ∨ q) ≡ ¬p ∧ ¬q",
    lambda p, q: not (p or q), lambda p, q: (not p) and (not q))

print("\nKesalahan De Morgan yang sering terjadi:")
uji("¬(p ∧ q) ≡ ¬p ∧ ¬q   (SALAH)",
    lambda p, q: not (p and q), lambda p, q: (not p) and (not q))

print("\nAbsorpsi")
uji("p ∨ (p ∧ q) ≡ p", lambda p, q: p or (p and q), lambda p, q: p)
uji("p ∧ (p ∨ q) ≡ p", lambda p, q: p and (p or q), lambda p, q: p)

print("\nImplikasi & Kontraposisi  <- WAJIB HAFAL")
uji("p → q ≡ ¬p ∨ q", imp, lambda p, q: (not p) or q)
uji("p → q ≡ ¬q → ¬p", imp, lambda p, q: imp(not q, not p))
uji("p → q ≡ q → p     (konvers, SALAH)", imp, lambda p, q: imp(q, p))
uji("p → q ≡ ¬p → ¬q   (invers, SALAH)", imp, lambda p, q: imp(not p, not q))

print("\nBiimplikasi")
uji("p ↔ q ≡ (p→q) ∧ (q→p)",
    lambda p, q: p == q, lambda p, q: imp(p, q) and imp(q, p))


# ---------- Membuktikan penyederhanaan langkah demi langkah ----------
print("\n=== MEMERIKSA PENYEDERHANAAN ===")
print("  ¬(p → q)")
print("≡ ¬(¬p ∨ q)     [hukum implikasi]")
print("≡ ¬(¬p) ∧ ¬q    [De Morgan]")
print("≡ p ∧ ¬q        [negasi ganda]\n")

langkah = [
    ("¬(p → q)",      lambda p, q: not imp(p, q)),
    ("¬(¬p ∨ q)",     lambda p, q: not ((not p) or q)),
    ("¬(¬p) ∧ ¬q",    lambda p, q: (not (not p)) and (not q)),
    ("p ∧ ¬q",        lambda p, q: p and (not q)),
]

print(f"  {'ekspresi':<16}| kolom hasil")
print("  " + "-" * 34)
for nama, f in langkah:
    kolom = " ".join(bl(f(*v)) for v in product([True, False], repeat=2))
    print(f"  {nama:<16}| {kolom}")
print("  -> semua kolom identik, berarti tiap langkahnya benar")


# ---------- Urutan baku menyederhanakan ----------
print("\n=== URUTAN BAKU MENYEDERHANAKAN ===")
print("  1. buang biimplikasi : p ↔ q  ->  (p→q) ∧ (q→p)")
print("  2. buang implikasi   : p → q  ->  ¬p ∨ q")
print("  3. dorong negasi     : De Morgan + negasi ganda")
print("  4. sederhanakan      : distributif, absorpsi, idempoten")`,

    js: String.raw`function bl(x) { return x ? "B" : "S"; }
function imp(p, q) { return !p || q; }

function semuaKombinasi(n) {
    const hasil = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        const baris = [];
        for (let j = n - 1; j >= 0; j--) baris.push(!((i >> j) & 1));
        hasil.push(baris);
    }
    return hasil;
}

function setara(fa, fb, n) {
    return semuaKombinasi(n || 2).every(function (v) {
        return fa.apply(null, v) === fb.apply(null, v);
    });
}

function uji(nama, fa, fb, n) {
    const status = setara(fa, fb, n || 2) ? "SETARA" : "TIDAK setara";
    console.log("  " + nama.padEnd(38) + " -> " + status);
}

console.log("=== MEMERIKSA HUKUM-HUKUM LOGIKA ===\n");

console.log("De Morgan  <- WAJIB HAFAL");
uji("¬(p ∧ q) ≡ ¬p ∨ ¬q",
    function (p, q) { return !(p && q); },
    function (p, q) { return !p || !q; });
uji("¬(p ∨ q) ≡ ¬p ∧ ¬q",
    function (p, q) { return !(p || q); },
    function (p, q) { return !p && !q; });

console.log("\nKesalahan yang sering terjadi:");
uji("¬(p ∧ q) ≡ ¬p ∧ ¬q   (SALAH)",
    function (p, q) { return !(p && q); },
    function (p, q) { return !p && !q; });

console.log("\nImplikasi & Kontraposisi  <- WAJIB HAFAL");
uji("p → q ≡ ¬p ∨ q", imp, function (p, q) { return !p || q; });
uji("p → q ≡ ¬q → ¬p", imp, function (p, q) { return imp(!q, !p); });
uji("p → q ≡ q → p     (konvers, SALAH)", imp, function (p, q) { return imp(q, p); });

console.log("\nDistributif");
uji("p ∧ (q ∨ r) ≡ (p∧q) ∨ (p∧r)",
    function (p, q, r) { return p && (q || r); },
    function (p, q, r) { return (p && q) || (p && r); }, 3);
uji("p ∨ (q ∧ r) ≡ (p∨q) ∧ (p∨r)",
    function (p, q, r) { return p || (q && r); },
    function (p, q, r) { return (p || q) && (p || r); }, 3);

console.log("\nAbsorpsi");
uji("p ∨ (p ∧ q) ≡ p",
    function (p, q) { return p || (p && q); },
    function (p) { return p; });

// De Morgan langsung terpakai di pemrograman
console.log("\n=== DE MORGAN DI PEMROGRAMAN ===");
const a = true, b = false;
console.log("  !(a && b) =", !(a && b));
console.log("  !a || !b  =", !a || !b, " <- sama");
console.log("  -> berguna untuk membalik kondisi if agar lebih mudah dibaca");
console.log("     if (!(umur >= 17 && punyaKTP))");
console.log("     if (umur < 17 || !punyaKTP)      <- lebih jelas");`
  },

  output: `=== MEMERIKSA HUKUM-HUKUM LOGIKA ===

De Morgan  <- WAJIB HAFAL
  ¬(p ∧ q) ≡ ¬p ∨ ¬q                     -> SETARA
  ¬(p ∨ q) ≡ ¬p ∧ ¬q                     -> SETARA

Kesalahan De Morgan yang sering terjadi:
  ¬(p ∧ q) ≡ ¬p ∧ ¬q   (SALAH)           -> TIDAK setara

Implikasi & Kontraposisi  <- WAJIB HAFAL
  p → q ≡ ¬p ∨ q                         -> SETARA
  p → q ≡ ¬q → ¬p                        -> SETARA
  p → q ≡ q → p     (konvers, SALAH)     -> TIDAK setara
  p → q ≡ ¬p → ¬q   (invers, SALAH)      -> TIDAK setara

=== MEMERIKSA PENYEDERHANAAN ===
  ekspresi        | kolom hasil
  ----------------------------------
  ¬(p → q)        | S B S S
  ¬(¬p ∨ q)       | S B S S
  ¬(¬p) ∧ ¬q      | S B S S
  p ∧ ¬q          | S B S S
  -> semua kolom identik, berarti tiap langkahnya benar`,

  kesalahanUmum: [
    {
      salah: 'Menerapkan De Morgan tanpa menukar operatornya: `¬(p ∧ q) ≡ ¬p ∧ ¬q`',
      kenapa: 'Negasinya sudah dibagikan, tetapi operatornya lupa ditukar. Padahal De Morgan menuntut **dua** perubahan sekaligus. Hasilnya berbeda: `¬(p ∧ q)` bernilai [S B B B] sedangkan `¬p ∧ ¬q` bernilai [S S S B].',
      benar: 'Ingat dua langkahnya: **bagikan negasinya, DAN tukar operatornya.** ∧ menjadi ∨, ∨ menjadi ∧. Kalau ragu, uji dengan satu baris: ambil p benar dan q salah, lalu bandingkan hasil kedua bentuknya.'
    },
    {
      salah: 'Mencoba menyederhanakan ekspresi yang masih mengandung → atau ↔.',
      kenapa: 'Hukum distributif, absorpsi, dan De Morgan semuanya hanya bekerja pada ∧, ∨, dan ¬. Selama masih ada tanda implikasi, kamu akan mentok dan tidak tahu langkah berikutnya.',
      benar: 'Ikuti urutan baku: **buang biimplikasi dulu, lalu buang implikasi** dengan `p → q ≡ ¬p ∨ q`, baru sederhanakan. Ini hampir selalu menjadi langkah pertama yang benar.'
    },
    {
      salah: 'Menuliskan hasil penyederhanaan tanpa menyebutkan nama hukumnya.',
      kenapa: 'Yang dinilai bukan hanya hasil akhir, tetapi **alasan tiap langkah**. Tanpa nama hukum, pemeriksa tidak bisa membedakan pemahaman dari tebakan, dan nilainya biasanya dipotong meski hasilnya benar.',
      benar: 'Tulis satu langkah per baris dengan nama hukumnya di sebelah kanan, misalnya `≡ ¬(¬p) ∧ ¬q   [De Morgan]`. Selain dapat nilai penuh, kesalahan juga jadi mudah dilacak.'
    },
    {
      salah: 'Mengira distributif kedua tidak berlaku karena tidak ada padanannya di aljabar.',
      kenapa: 'Dalam aljabar biasa, `a + (b × c)` memang tidak sama dengan `(a+b) × (a+c)`. Tetapi dalam logika, `p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)` benar-benar berlaku. Intuisi aljabar justru menyesatkan di sini.',
      benar: 'Ingat bahwa logika punya **dua** hukum distributif, dan keduanya sah. Kalau ragu, buktikan dengan tabel kebenaran 3 proposisi — 8 baris saja.'
    },
    {
      salah: 'Menggabungkan beberapa hukum sekaligus dalam satu langkah.',
      kenapa: 'Melompat dari `¬(p → q)` langsung ke `p ∧ ¬q` menyembunyikan tiga langkah sekaligus. Kalau hasilnya keliru, kamu tidak tahu langkah mana yang salah dan harus mengulang dari awal.',
      benar: 'Kerjakan **satu hukum per baris**. Lebih panjang, tetapi jauh lebih aman dan mudah diperiksa — baik olehmu maupun oleh pemeriksa.'
    },
    {
      salah: 'Mengira ekuivalensi sama dengan implikasi.',
      kenapa: 'Lambang **≡** berarti kedua ekspresi **selalu** bernilai sama, sedangkan **→** adalah operator yang punya nilai kebenaran sendiri. Menulis `p ≡ q` sebagai bagian dari ekspresi adalah kekeliruan — ≡ adalah pernyataan **tentang** dua ekspresi, bukan operator di dalamnya.',
      benar: 'Bedakan tegas: **↔ adalah operator** yang bisa muncul di dalam ekspresi dan punya tabel kebenaran; **≡ adalah kesimpulan** bahwa dua ekspresi setara. Hubungannya: A ≡ B tepat ketika A ↔ B merupakan tautologi.'
    }
  ],

  analogi: `
Bayangkan hukum-hukum logika sebagai **aturan menyederhanakan pecahan**. Kamu tidak menghitung nilai desimalnya untuk menyederhanakan 6/8 — kamu langsung mencoretnya menjadi 3/4 memakai aturan yang sudah diketahui. Tabel kebenaran itu seperti menghitung nilai desimalnya: pasti benar, tetapi lambat.

Untuk **De Morgan**, pakai kalimat sehari-hari dan uji sendiri kebenarannya:

*"Tidak benar bahwa saya lulus **dan** dapat beasiswa."*

Apa artinya? Cukup **salah satu** yang gagal. Bisa jadi tidak lulus, bisa jadi lulus tapi tidak dapat beasiswa. Jadi lawannya adalah *"tidak lulus **atau** tidak dapat beasiswa"* — dan itulah kenapa ∧ berubah menjadi ∨.

Sekarang uji yang sebaliknya: *"Tidak benar bahwa saya lulus **atau** dapat beasiswa."* Ini berarti **dua-duanya** tidak terjadi — sehingga ∨ berubah menjadi ∧.

Cara mengingatnya dalam satu kalimat: **negasi masuk, operator bertukar.**

Untuk **hukum implikasi**, ingat bahwa "jika p maka q" bisa dibaca ulang sebagai *"p salah, atau q benar"*. Coba pada contoh: *"Jika hujan maka jalanan basah"* setara dengan *"tidak hujan, atau jalanan basah"*. Terdengar aneh tapi maknanya sama persis — dan begitu kamu terbiasa, mengubah → menjadi ∨ jadi refleks.

Untuk **absorpsi**, gunakan kalimat: *"Saya datang kalau libur, atau kalau libur dan cuaca cerah."* Bagian kedua jelas tidak menambah apa-apa. Cukup katakan *"saya datang kalau libur"*.

Strategi belajar yang paling efektif untuk topik ini: **jangan hafalkan seluruh daftar sekaligus.** Hafalkan tiga saja — **De Morgan**, **implikasi**, dan **distributif**. Sisanya kerjakan lewat latihan, dan sambil mengerjakan, bacalah tiap hukum sebagai kalimat sehari-hari. Hukum yang masuk akal jauh lebih melekat daripada hukum yang dihafal.

Satu kebiasaan yang membantu saat belajar sendiri: setelah menyederhanakan secara aljabar, **periksa hasilnya dengan tabel kebenaran**. Kalau kolomnya berbeda, telusuri langkah mana yang meleset. Cara ini melatih ketelitian sekaligus memberi umpan balik langsung.
`,

  latihan: [
    'Sederhanakan `¬(p ∨ ¬q)` selangkah demi selangkah, tuliskan nama hukum di tiap langkah.',
    'Buktikan `p → (q → r)` setara dengan `(p ∧ q) → r` (hukum ekspor). Petunjuk: buang semua implikasi lebih dulu.',
    'Sederhanakan `(p ∧ q) ∨ (p ∧ ¬q)` sampai bentuk sesederhana mungkin. Hukum apa saja yang kamu pakai?',
    'Buktikan `¬(p ↔ q)` setara dengan `p ⊕ q` (beda setangkup / XOR).',
    'Nyatakan `p → q` hanya memakai operator ¬ dan ∧ saja. Petunjuk: mulai dari `¬p ∨ q`, lalu pakai De Morgan.',
    'Sederhanakan `(p → q) ∧ (p → ¬q)`, lalu jelaskan arti hasilnya dalam bahasa sehari-hari.',
    'Kerjakan penyederhanaan `¬(¬p ∧ q) ∨ (p ∧ q)` secara aljabar, lalu **periksa hasilnya dengan tabel kebenaran**. Kalau berbeda, telusuri langkah mana yang salah.',
    'Tulis ulang kondisi program ini agar lebih mudah dibaca memakai De Morgan: `if (!(umur >= 17 && punyaKTP))`.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa De Morgan mengharuskan operatornya ditukar, bukan cuma negasinya dibagikan. Pakai contoh kalimat sehari-hari.'
  ]
});

TOPICS.push({
  id: 'konvers-invers-kontraposisi',
  judul: 'Konvers, Invers & Kontraposisi',
  kategori: 'logika',
  tag: ['konvers', 'invers', 'kontraposisi', 'implikasi', 'penalaran'],
  ringkas: 'Tiga bentuk turunan dari implikasi — dan hanya satu di antaranya yang setara dengan aslinya.',

  fungsi: `**Menghindari satu kesalahan penalaran yang sangat mahal: mengira kebalikan sebuah aturan juga berlaku.**

Bentuknya di dunia nyata:

- Aturan: *"kalau kata sandi salah, maka login ditolak"*
- Kesalahan: menyimpulkan *"kalau login ditolak, berarti kata sandinya salah"* — padahal bisa saja akunnya diblokir, jaringannya putus, atau peladennya mati

Itu **konvers**, dan ia **tidak setara** dengan pernyataan aslinya.

Terpakai di:

- **Menulis pesan galat yang benar** — jangan bilang "kata sandi salah" kalau yang gagal bisa banyak hal
- **Menyusun syarat validasi** — *"kalau tidak valid maka tolak"* tidak berarti *"kalau ditolak maka tidak valid"*
- **Menafsirkan hasil pengujian** — uji yang lulus tidak membuktikan kodenya benar, persis kalimat Dijkstra yang kamu temui lagi di Rekayasa Perangkat Lunak
- **Menyederhanakan syarat** — kontraposisi **setara**, jadi kamu boleh memakai bentuk mana pun yang lebih mudah dibaca

Yang wajib diingat: **hanya kontraposisi yang setara.** Konvers dan invers tidak.`,

  praktik: {
    tujuan: `Kamu bisa menuliskan konvers, invers, dan kontraposisi dari sebuah aturan, dan mengenali saat orang lain menarik kesimpulan yang keliru dari kebalikannya.`,
    alat: [
      'Kertas',
      'Python 3 untuk memeriksa kesetaraannya'
    ],
    langkah: [
      { judul: 'Tulis aturannya dalam bentuk JIKA-MAKA',
        isi: `Banyak aturan tidak ditulis dalam bentuk itu, jadi ubah dulu.

*"Mahasiswa dengan IPK di bawah 2,00 wajib mengikuti bimbingan"* menjadi:

**Jika** IPK di bawah 2,00, **maka** wajib bimbingan.

Tandai bagian **jika** sebagai \`p\` dan bagian **maka** sebagai \`q\`.` },
      { judul: 'Bentuk keempat versinya',
        isi: `- **Implikasi**: \`p → q\` — jika IPK rendah, maka wajib bimbingan
- **Konvers**: \`q → p\` — jika wajib bimbingan, maka IPK rendah
- **Invers**: \`¬p → ¬q\` — jika IPK tidak rendah, maka tidak wajib bimbingan
- **Kontraposisi**: \`¬q → ¬p\` — jika tidak wajib bimbingan, maka IPK tidak rendah

Bacalah keempatnya keras-keras. Kamu akan langsung merasakan bahwa konvers dan invers **terdengar masuk akal tetapi belum tentu benar**.` },
      { judul: 'Cari penyangkalnya',
        isi: `Untuk konvers di atas: apakah ada mahasiswa yang **wajib bimbingan** tetapi **IPK-nya tidak rendah**?

Ya — misalnya mahasiswa yang terancam DO karena masa studi, bukan karena IPK.

**Satu penyangkal saja sudah cukup** untuk membuktikan konversnya tidak setara.` },
      { judul: 'Buktikan dengan tabel bahwa kontraposisi setara',
        isi: `Hitung \`p → q\` dan \`¬q → ¬p\` untuk keempat baris. Hasilnya akan **identik**.

Lalu hitung konversnya juga, dan lihat baris mana yang berbeda. Baris itulah yang menjelaskan kenapa kesalahan penalaran ini begitu mudah terjadi: **pada tiga dari empat baris, konvers kebetulan benar.**` },
      { judul: 'Perbaiki pesan galat di kodemu',
        isi: `Cari fungsi login atau validasi di proyekmu. Periksa apakah pesan galatnya menyimpulkan sebab dari akibat.

*"Kata sandi salah"* saat sebenarnya bisa banyak hal adalah konvers yang diperlakukan sebagai kebenaran — dan ia menyesatkan pengguna sekaligus membocorkan informasi kepada penyerang.

Ganti dengan pesan yang **tidak menyimpulkan lebih dari yang diketahui**.` },
      { judul: 'Manfaatkan kontraposisi untuk menyederhanakan',
        isi: `Karena kontraposisi setara, kamu **boleh memilih** bentuk mana yang lebih mudah dibaca.

Kadang \`if (!selesai) return;\` di awal fungsi jauh lebih jelas daripada membungkus seluruh isi fungsi dalam \`if (selesai) { ... }\`.

Itu penerapan kontraposisi yang paling sering dipakai programmer tanpa menyadarinya, dan namanya *guard clause*.` }
    ],
    cek: [
      'Tabel kebenaran implikasi dan kontraposisinya identik di keempat baris',
      'Tabel konvers berbeda dari implikasi di sedikitnya satu baris',
      `Kamu bisa menyebutkan satu contoh penyangkal untuk konvers dari aturan yang kamu pilih sendiri`
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
Dari satu implikasi \`p → q\`, kita bisa menyusun **tiga bentuk turunan** dengan menukar posisi atau menegasikan bagiannya:

- **Konvers** — \`q → p\` (posisinya **ditukar**)
- **Invers** — \`¬p → ¬q\` (keduanya **dinegasikan**)
- **Kontraposisi** — \`¬q → ¬p\` (**ditukar dan dinegasikan**)

Dan inilah inti seluruh topik ini, satu kalimat yang wajib kamu kuasai:

**Hanya kontraposisi yang setara dengan implikasi aslinya. Konvers dan invers tidak.**

Kenapa ini penting? Karena mengira konvers setara dengan aslinya adalah **kesalahan penalaran yang paling sering terjadi manusia**, bukan cuma di ujian. Contohnya di kehidupan nyata:

- *"Semua pencuri adalah orang yang gugup."* → **tidak** berarti *"semua orang gugup adalah pencuri"*
- *"Kalau demam, berarti sakit."* → **tidak** berarti *"kalau sakit, berarti demam"*
- *"Kalau belajar, pasti lulus."* → **tidak** berarti *"kalau lulus, pasti belajar"*

Kesalahan menukar arah implikasi seperti ini punya nama resmi: **menegaskan konsekuen** (*affirming the consequent*), dan akan dibahas lagi di topik Inferensi sebagai salah satu sesat pikir.

Ada satu hubungan tambahan yang rapi dan sering ditanyakan: **konvers dan invers setara satu sama lain.** Alasannya masuk akal begitu dirunut — invers adalah kontraposisi dari konvers. Jadi keduanya sama-sama salah, dan sama-sama salah dengan alasan yang sama.

Ringkasan hubungannya:

- \`p → q\` **≡** \`¬q → ¬p\` (asli setara kontraposisi)
- \`q → p\` **≡** \`¬p → ¬q\` (konvers setara invers)
- Tetapi kelompok pertama **tidak** setara dengan kelompok kedua

Kontraposisi juga punya kegunaan praktis yang besar: kadang membuktikan \`¬q → ¬p\` **jauh lebih mudah** daripada membuktikan \`p → q\` secara langsung. Karena keduanya setara, membuktikan salah satunya sudah cukup — dan teknik ini bernama **bukti kontrapositif**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Dari:  p → q\n#\n# konvers      :  q → p          (tukar posisi)\n# invers       : ¬p → ¬q         (negasikan keduanya)\n# kontraposisi : ¬q → ¬p         (tukar DAN negasikan)',
      penjelasan: `
Cara mengingat pembentukannya cukup dengan dua tindakan: **menukar posisi** dan **menegasikan**.

- **Tukar saja** → konvers
- **Negasikan saja** → invers
- **Tukar dan negasikan** → kontraposisi

Perhatikan bahwa kontraposisi adalah **gabungan** dari dua tindakan lainnya. Ini bukan kebetulan, dan menjelaskan kenapa justru kontraposisi yang setara: dua kesalahan yang saling membatalkan.

Untuk memastikan kamu tidak tertukar, coba dengan contoh nyata. Ambil *"Jika hujan (p), maka jalanan basah (q)"*:

- **Konvers**: *"Jika jalanan basah, maka hujan."*
- **Invers**: *"Jika tidak hujan, maka jalanan tidak basah."*
- **Kontraposisi**: *"Jika jalanan tidak basah, maka tidak hujan."*

Bacalah keempatnya, lalu tanyakan mana yang **pasti benar** kalau kalimat aslinya benar. Hanya kontraposisi yang lolos — dan itu bisa kamu rasakan tanpa perlu tabel kebenaran.

Catatan penulisan: sebagian buku menyebut kontraposisi sebagai *kontrapositif*. Keduanya sama saja.
`
    },
    {
      bahasa: 'python',
      kode: '#  p | q | p→q | q→p | ¬p→¬q | ¬q→¬p\n#  B | B |  B  |  B  |   B   |   B\n#  B | S |  S  |  B  |   B   |   S\n#  S | B |  B  |  S  |   S   |   B\n#  S | S |  B  |  B  |   B   |   B\n#         ^^^^^                ^^^^^ identik',
      penjelasan: `
Tabel ini membuktikan seluruh isi topik dalam satu gambar, dan layak kamu tulis ulang sendiri sekali untuk memastikan.

Perhatikan **kolom 1 (p→q) dan kolom 4 (¬q→¬p)** — keduanya identik: B S B B. Itulah bukti kontraposisi setara dengan aslinya.

Sekarang perhatikan **kolom 2 (q→p) dan kolom 3 (¬p→¬q)** — keduanya juga identik: B B S B. Ini membuktikan konvers setara dengan invers.

Tetapi kolom 1 dan kolom 2 **berbeda** di dua baris, yaitu baris kedua dan ketiga. Karena itu asli dan konvers **tidak** setara.

Cara cepat mengingat pola kolomnya: implikasi dan kontraposisinya sama-sama **salah hanya di satu baris**, tetapi barisnya berbeda — asli salah saat (B, S), sedangkan konvers salah saat (S, B).

Untuk menguji ingatanmu tanpa menyusun tabel penuh, gunakan **satu baris penyangkal** saja. Ambil p salah dan q benar:

- \`p → q\` bernilai **B** (anteseden salah, jadi benar secara hampa)
- \`q → p\` bernilai **S** (q benar tapi p salah)

Satu baris ini sudah cukup membuktikan keduanya tidak setara — dan ini trik yang menghemat banyak waktu di ujian.
`
    },
    {
      bahasa: 'python',
      kode: '# KENAPA kontraposisi setara? Buktikan dengan hukum logika:\n#\n#   ¬q → ¬p\n# ≡ ¬(¬q) ∨ ¬p      [hukum implikasi]\n# ≡ q ∨ ¬p          [negasi ganda]\n# ≡ ¬p ∨ q          [komutatif]\n# ≡ p → q           [hukum implikasi, arah balik]',
      penjelasan: `
Selain lewat tabel kebenaran, kesetaraan ini bisa **dibuktikan secara aljabar** — dan cara ini sering diminta di soal karena menunjukkan penguasaan hukum logika.

Runut tiap langkahnya:

- Mulai dari kontraposisi \`¬q → ¬p\`
- Ubah implikasinya menjadi disjungsi: \`¬(¬q) ∨ ¬p\`
- Sederhanakan negasi ganda: \`q ∨ ¬p\`
- Tukar urutannya dengan komutatif: \`¬p ∨ q\`
- Kembalikan menjadi implikasi: \`p → q\`

Sampai di bentuk asli, terbukti setara.

Perhatikan bahwa **hukum implikasi dipakai dua kali** — sekali untuk membongkar, sekali untuk merakit kembali. Ini pola yang sangat sering muncul dalam pembuktian aljabar logika: bongkar semua implikasi, kerjakan di ranah ∧/∨/¬ yang hukumnya lengkap, lalu rakit kembali.

Coba juga lakukan hal yang sama untuk konvers \`q → p\`. Kamu akan sampai di \`¬q ∨ p\`, yang **tidak** bisa diubah menjadi \`¬p ∨ q\` dengan hukum mana pun — dan kebuntuan itulah tandanya keduanya memang tidak setara.
`
    },
    {
      bahasa: 'python',
      kode: '# BUKTI KONTRAPOSITIF — kegunaan praktisnya\n#\n# Buktikan: jika n² genap, maka n genap.\n#\n# Sulit dibuktikan langsung.\n# Kontraposisinya: jika n GANJIL, maka n² GANJIL.\n#   n ganjil -> n = 2k+1\n#   n² = 4k² + 4k + 1 = 2(2k²+2k) + 1 -> ganjil. Terbukti.',
      penjelasan: `
Inilah alasan kontraposisi bukan sekadar bahan hafalan: ia **alat pembuktian yang nyata dipakai** di matematika dan informatika.

Perhatikan contoh di atas. Membuktikan *"jika n² genap maka n genap"* secara langsung itu sulit — kamu harus mulai dari sifat n² lalu menyimpulkan sesuatu tentang n, dan jalannya berliku.

Tetapi **kontraposisinya** — *"jika n ganjil maka n² ganjil"* — bisa dibuktikan dalam tiga baris aljabar sederhana. Dan karena kontraposisi setara dengan aslinya, membuktikannya sudah cukup.

Kapan sebaiknya memakai teknik ini? **Ketika anteseden aslinya sulit dipakai sebagai titik mulai, tetapi negasi konsekuennya mudah.** Cirinya biasanya: pernyataan aslinya memuat kata seperti "tidak", "bukan", atau sifat yang sulit diurai.

Teknik ini nanti akan sering kamu pakai di **Matematika Diskrit** (Semester 2) untuk pembuktian, dan di analisis algoritma untuk membuktikan sifat kebenaran program.

Perlu dibedakan dengan **bukti dengan kontradiksi** yang mirip tapi berbeda: bukti kontrapositif membuktikan \`¬q → ¬p\`, sedangkan bukti kontradiksi mengandaikan \`p ∧ ¬q\` lalu mencari kejanggalan.
`
    },
    {
      bahasa: 'python',
      kode: '# SESAT PIKIR yang paling sering terjadi\n#\n# Diketahui : "Jika pencuri, maka gugup"\n# Diamati   : orang ini gugup\n# Disimpulkan: "berarti dia pencuri"      <- SALAH!\n#\n# Ini memakai KONVERS, padahal konvers tidak setara.',
      penjelasan: `
Kesalahan ini punya nama resmi: **menegaskan konsekuen** (*affirming the consequent*), dan ia adalah sesat pikir yang paling sering dilakukan manusia dalam penalaran sehari-hari.

Bentuknya: dari \`p → q\` dan fakta \`q\`, orang menyimpulkan \`p\`. Padahal yang sah cuma arah sebaliknya.

Kenapa terasa meyakinkan? Karena otak kita cenderung mencari **penjelasan** dan langsung menerima yang pertama masuk akal. Padahal orang gugup bisa karena banyak sebab — takut, malu, sakit, atau memang pembawaannya.

Sesat pikir pasangannya juga sering terjadi: **menyangkal anteseden** (*denying the antecedent*), yaitu dari \`p → q\` dan \`¬p\` menyimpulkan \`¬q\`. Ini memakai **invers**, yang juga tidak setara.

Contohnya: *"Kalau belajar, pasti lulus. Dia tidak belajar, jadi pasti tidak lulus."* — padahal ia bisa saja lulus karena sudah paham sebelumnya.

Bandingkan dengan dua bentuk yang **sah**, dan perhatikan bedanya tipis tapi menentukan:

- **Modus ponens** — dari \`p → q\` dan \`p\`, simpulkan \`q\` ✓
- **Modus tollens** — dari \`p → q\` dan \`¬q\`, simpulkan \`¬p\` ✓ (inilah kontraposisi yang dipakai)

Keempatnya dibahas tuntas di topik **Inferensi** berikutnya. Untuk sekarang cukup ingat: **yang boleh dipakai adalah arah maju dari anteseden, atau arah mundur dari negasi konsekuen.**
`
    }
  ],

  kode: {
    python: String.raw`from itertools import product


def bl(x):
    return "B" if x else "S"


def imp(p, q):
    return (not p) or q


# ---------- Empat bentuk dari p → q ----------
def asli(p, q):          return imp(p, q)              # p → q
def konvers(p, q):       return imp(q, p)              # q → p
def invers(p, q):        return imp(not p, not q)      # ¬p → ¬q
def kontraposisi(p, q):  return imp(not q, not p)      # ¬q → ¬p


print("=== TABEL EMPAT BENTUK ===")
print(f"{'p':^3}|{'q':^3}|{'p→q':^6}|{'q→p':^6}|{'¬p→¬q':^8}|{'¬q→¬p':^8}")
print("-" * 38)

kolom = {"asli": [], "konvers": [], "invers": [], "kontra": []}

for p, q in product([True, False], repeat=2):
    a, k, i, kp = asli(p, q), konvers(p, q), invers(p, q), kontraposisi(p, q)
    kolom["asli"].append(a)
    kolom["konvers"].append(k)
    kolom["invers"].append(i)
    kolom["kontra"].append(kp)
    print(f"{bl(p):^3}|{bl(q):^3}|{bl(a):^6}|{bl(k):^6}|{bl(i):^8}|{bl(kp):^8}")

print("\n=== MANA YANG SETARA? ===")
print(f"  asli == kontraposisi : {kolom['asli'] == kolom['kontra']}   <- SETARA")
print(f"  konvers == invers    : {kolom['konvers'] == kolom['invers']}   <- SETARA")
print(f"  asli == konvers      : {kolom['asli'] == kolom['konvers']}  <- TIDAK setara")
print(f"  asli == invers       : {kolom['asli'] == kolom['invers']}  <- TIDAK setara")


# ---------- Satu baris penyangkal sudah cukup ----------
print("\n=== TRIK: SATU BARIS PENYANGKAL ===")
p, q = False, True
print(f"  ambil p={bl(p)}, q={bl(q)}")
print(f"    p → q = {bl(asli(p, q))}")
print(f"    q → p = {bl(konvers(p, q))}")
print("  -> berbeda, jadi TIDAK setara. Tidak perlu tabel penuh.")


# ---------- Contoh kalimat sehari-hari ----------
print("\n=== CONTOH KALIMAT ===")
print('  asli         : "Jika hujan, maka jalanan basah."          -> masuk akal')
print('  konvers      : "Jika jalanan basah, maka hujan."          -> TIDAK')
print('  invers       : "Jika tidak hujan, jalanan tidak basah."   -> TIDAK')
print('  kontraposisi : "Jika jalanan tidak basah, tidak hujan."   -> masuk akal')
print("  (jalanan bisa basah karena disiram, bukan cuma karena hujan)")


# ---------- Sesat pikir ----------
print("\n=== DUA SESAT PIKIR YANG SERING TERJADI ===")
print("  Diketahui: p → q  ('jika pencuri, maka gugup')")
print()
print("  SAH:")
print("    modus ponens  : p benar        -> simpulkan q       ✓")
print("    modus tollens : q salah        -> simpulkan ¬p      ✓")
print()
print("  SESAT:")
print("    menegaskan konsekuen : q benar -> simpulkan p       ✗ (pakai konvers)")
print("    menyangkal anteseden : p salah -> simpulkan ¬q      ✗ (pakai invers)")


# ---------- Bukti kontrapositif ----------
print("\n=== BUKTI KONTRAPOSITIF ===")
print("  Klaim: jika n² genap, maka n genap.")
print("  Sulit dibuktikan langsung. Pakai kontraposisinya:")
print("    'jika n ganjil, maka n² ganjil'")
print("    n ganjil -> n = 2k+1")
print("    n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 -> ganjil. Terbukti.\n")

print("  Membuktikannya secara numerik untuk n = 1..10:")
for n in range(1, 11):
    n2 = n * n
    print(f"    n={n:>2}  n²={n2:>3}  n {'genap' if n % 2 == 0 else 'ganjil':<6}"
          f"  n² {'genap' if n2 % 2 == 0 else 'ganjil'}")
print("  -> n² genap SELALU bersamaan dengan n genap")`,

    js: String.raw`function bl(x) { return x ? "B" : "S"; }
function imp(p, q) { return !p || q; }

// Empat bentuk dari p → q
const asli         = function (p, q) { return imp(p, q); };
const konvers      = function (p, q) { return imp(q, p); };
const invers       = function (p, q) { return imp(!p, !q); };
const kontraposisi = function (p, q) { return imp(!q, !p); };

console.log("=== TABEL EMPAT BENTUK ===");
console.log(" p | q | p→q | q→p | ¬p→¬q | ¬q→¬p");
console.log("-".repeat(38));

const kolom = { asli: [], konvers: [], invers: [], kontra: [] };

for (const p of [true, false]) {
    for (const q of [true, false]) {
        const a = asli(p, q), k = konvers(p, q);
        const i = invers(p, q), kp = kontraposisi(p, q);
        kolom.asli.push(a); kolom.konvers.push(k);
        kolom.invers.push(i); kolom.kontra.push(kp);
        console.log(" " + bl(p) + " | " + bl(q) + " |  " + bl(a) +
                    "  |  " + bl(k) + "  |   " + bl(i) + "   |   " + bl(kp));
    }
}

const sama = function (a, b) { return a.join("") === b.join(""); };

console.log("\n=== MANA YANG SETARA? ===");
console.log("  asli == kontraposisi :", sama(kolom.asli, kolom.kontra), "  <- SETARA");
console.log("  konvers == invers    :", sama(kolom.konvers, kolom.invers), "  <- SETARA");
console.log("  asli == konvers      :", sama(kolom.asli, kolom.konvers), " <- TIDAK setara");

// Satu baris penyangkal sudah cukup
console.log("\n=== TRIK: SATU BARIS PENYANGKAL ===");
console.log("  ambil p=S, q=B");
console.log("    p → q =", bl(asli(false, true)));
console.log("    q → p =", bl(konvers(false, true)));
console.log("  -> berbeda, jadi TIDAK setara. Tidak perlu tabel penuh.");

// Sesat pikir
console.log("\n=== DUA SESAT PIKIR ===");
console.log("  SAH   : p benar -> simpulkan q      (modus ponens)");
console.log("  SAH   : q salah -> simpulkan ¬p     (modus tollens)");
console.log("  SESAT : q benar -> simpulkan p      (pakai konvers)");
console.log("  SESAT : p salah -> simpulkan ¬q     (pakai invers)");

// Membuktikan kontrapositif secara numerik
console.log("\n=== BUKTI KONTRAPOSITIF (numerik) ===");
console.log("  Klaim: jika n² genap, maka n genap");
let semuaCocok = true;
for (let n = 1; n <= 20; n++) {
    const n2Genap = (n * n) % 2 === 0;
    const nGenap = n % 2 === 0;
    if (n2Genap !== nGenap) semuaCocok = false;
}
console.log("  n² genap selalu bersamaan dengan n genap? " + semuaCocok);`
  },

  output: `=== TABEL EMPAT BENTUK ===
 p | q | p→q  | q→p  | ¬p→¬q  | ¬q→¬p
--------------------------------------
 B | B |  B   |  B   |   B    |   B
 B | S |  S   |  B   |   B    |   S
 S | B |  B   |  S   |   S    |   B
 S | S |  B   |  B   |   B    |   B

=== MANA YANG SETARA? ===
  asli == kontraposisi : True   <- SETARA
  konvers == invers    : True   <- SETARA
  asli == konvers      : False  <- TIDAK setara
  asli == invers       : False  <- TIDAK setara

=== TRIK: SATU BARIS PENYANGKAL ===
  ambil p=S, q=B
    p → q = B
    q → p = S
  -> berbeda, jadi TIDAK setara. Tidak perlu tabel penuh.

=== DUA SESAT PIKIR YANG SERING TERJADI ===
  SAH:
    modus ponens  : p benar        -> simpulkan q       ✓
    modus tollens : q salah        -> simpulkan ¬p      ✓

  SESAT:
    menegaskan konsekuen : q benar -> simpulkan p       ✗ (pakai konvers)
    menyangkal anteseden : p salah -> simpulkan ¬q      ✗ (pakai invers)`,

  kesalahanUmum: [
    {
      salah: 'Mengira konvers setara dengan implikasi aslinya.',
      kenapa: 'Ini kesalahan penalaran paling sering, bahkan di luar ujian. "Jika hujan maka jalanan basah" tidak berarti "jika jalanan basah maka hujan" — jalanan bisa basah karena disiram. Tabel kebenarannya berbeda di dua baris.',
      benar: 'Hafalkan satu kalimat: **hanya kontraposisi yang setara.** Kalau ragu, uji dengan satu baris penyangkal — ambil p salah dan q benar, lalu bandingkan hasilnya.'
    },
    {
      salah: 'Tertukar antara invers dan kontraposisi.',
      kenapa: 'Keduanya sama-sama memakai negasi, sehingga mudah tertukar. Padahal invers **hanya** menegasikan tanpa menukar posisi, sedangkan kontraposisi menegasikan **dan** menukar. Akibatnya fatal: satu setara, satu tidak.',
      benar: 'Ingat dua tindakannya: **tukar saja → konvers**, **negasikan saja → invers**, **tukar dan negasikan → kontraposisi**. Kontraposisi selalu melakukan keduanya.'
    },
    {
      salah: 'Menyimpulkan `p` dari `p → q` dan fakta bahwa `q` benar.',
      kenapa: 'Ini sesat pikir **menegaskan konsekuen**. Dari "jika pencuri maka gugup" dan fakta seseorang gugup, tidak bisa disimpulkan ia pencuri — gugup bisa karena banyak sebab lain. Bentuk ini memakai konvers yang tidak setara.',
      benar: 'Yang sah cuma dua: **modus ponens** (dari `p` simpulkan `q`) dan **modus tollens** (dari `¬q` simpulkan `¬p`). Selain itu tidak sah.'
    },
    {
      salah: 'Menyimpulkan `¬q` dari `p → q` dan fakta bahwa `p` salah.',
      kenapa: 'Ini sesat pikir **menyangkal anteseden**, yang memakai invers. "Kalau belajar pasti lulus. Dia tidak belajar, jadi tidak lulus" — padahal ia bisa lulus karena sudah paham sebelumnya. Implikasi tidak menjanjikan apa pun ketika antesedennya salah.',
      benar: 'Ingat kembali analogi janji: kalau syaratnya tidak terpenuhi, janjinya **tidak berkata apa-apa**. Tidak ada kesimpulan yang boleh ditarik dari anteseden yang salah.'
    },
    {
      salah: 'Mengira konvers dan invers tidak berhubungan sama sekali.',
      kenapa: 'Keduanya sebenarnya **setara satu sama lain**, karena invers adalah kontraposisi dari konvers. Soal ujian sering menguji hubungan ini, dan menjawab "tidak berhubungan" akan salah.',
      benar: 'Ingat dua pasangan: **asli ≡ kontraposisi**, dan **konvers ≡ invers**. Dua pasangan itu tidak setara satu sama lain.'
    },
    {
      salah: 'Menegasikan implikasi dengan cara membalik tanda panahnya.',
      kenapa: 'Negasi dari `p → q` bukan `p → ¬q`, bukan pula `q → p`. Yang benar adalah **`p ∧ ¬q`** — anteseden benar tetapi konsekuen salah, satu-satunya keadaan yang melanggar janji.',
      benar: 'Turunkan dengan hukum logika: `¬(p → q) ≡ ¬(¬p ∨ q) ≡ p ∧ ¬q`. Ingat maknanya: melanggar janji berarti syaratnya terpenuhi tapi hasilnya tidak.'
    }
  ],

  analogi: `
Pakai satu contoh saja sepanjang topik ini, dan uji keempat bentuknya:

**"Jika hujan, maka jalanan basah."**

- **Konvers** — *"Jika jalanan basah, maka hujan."* Bayangkan mobil pemadam baru lewat menyiram jalan. Jalanan basah, tapi tidak hujan. **Konvers gugur.**
- **Invers** — *"Jika tidak hujan, maka jalanan tidak basah."* Kasus yang sama membantahnya. **Invers gugur.**
- **Kontraposisi** — *"Jika jalanan tidak basah, maka tidak hujan."* Coba cari bantahannya... tidak ada. Kalau benar-benar hujan, jalanan pasti basah; jadi jalanan kering membuktikan tidak hujan. **Kontraposisi bertahan.**

Perhatikan bahwa konvers dan invers **gugur oleh contoh penyangkal yang sama** — itulah bukti nyata bahwa keduanya setara.

Untuk **mengingat mana yang setara**, pakai gambaran ini: implikasi seperti **jalan satu arah**. Kamu boleh berjalan maju dari p ke q. Kamu **tidak boleh** berjalan mundur dari q ke p — itu konvers. Tetapi kamu **boleh** berjalan mundur kalau semuanya dibalik: dari "bukan q" ke "bukan p" — itu kontraposisi.

Untuk **mengenali sesat pikir dalam kehidupan sehari-hari**, latih dirimu menangkap pola ini di iklan dan berita:

- *"Orang sukses bangun pagi. Saya bangun pagi, berarti saya akan sukses."* → menegaskan konsekuen
- *"Perokok berisiko kanker. Saya tidak merokok, jadi saya aman."* → menyangkal anteseden

Kemampuan menangkap dua pola ini berguna jauh melampaui mata kuliah — dan justru itu bagian paling berharga dari topik ini.

Cara menguji pemahamanmu sendiri: ambil satu kalimat "jika... maka..." dari catatan kuliah apa pun, tuliskan keempat bentuknya, lalu cari **contoh penyangkal** untuk konvers dan inversnya. Kalau kamu bisa menemukan penyangkalnya, berarti kamu benar-benar paham — bukan sekadar hafal.
`,

  latihan: [
    'Untuk pernyataan "Jika n habis dibagi 4, maka n habis dibagi 2", tuliskan konvers, invers, dan kontraposisinya. Mana yang bernilai benar?',
    'Susun tabel kebenaran lengkap untuk keempat bentuk sekaligus, lalu tunjukkan pasangan kolom mana yang identik.',
    'Buktikan secara aljabar bahwa `¬q → ¬p` setara dengan `p → q`, sertakan nama hukum di tiap langkah.',
    'Cari contoh penyangkal untuk konvers dari "Jika seseorang mahasiswa Unsoed, maka ia mahasiswa." Apa penyangkalnya?',
    'Tentukan sesat pikir apa yang dipakai: (a) "Semua kucing punya ekor. Hewan ini punya ekor, jadi ini kucing.", (b) "Kalau rajin, pasti lulus. Dia tidak rajin, jadi tidak lulus."',
    'Buktikan "jika n² ganjil maka n ganjil" memakai bukti kontrapositif. Kenapa cara ini lebih mudah daripada membuktikan langsung?',
    'Tuliskan negasi dari "Jika saya lulus, maka saya traktir kamu". Petunjuk: hasilnya bukan implikasi lagi.',
    'Ambil tiga kalimat "jika... maka..." dari iklan atau berita, lalu periksa apakah kesimpulan yang ditarik memakai bentuk yang sah atau sesat pikir.',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa "jika jalanan basah maka hujan" itu salah, sementara "jika jalanan tidak basah maka tidak hujan" itu benar.'
  ]
});

TOPICS.push({
  id: 'inferensi',
  judul: 'Argumen & Aturan Inferensi',
  kategori: 'logika',
  tag: ['argumen', 'inferensi', 'modus ponens', 'modus tollens', 'silogisme', 'validitas'],
  ringkas: 'Cara menarik kesimpulan yang sahih dari sekumpulan premis — beserta sesat pikir yang menyerupainya.',

  fungsi: `**Memeriksa apakah sebuah kesimpulan benar-benar mengikuti dari alasannya — atau cuma terdengar meyakinkan.**

Ini terpakai jauh di luar kelas logika:

- **Membaca laporan bug** — *"error muncul setelah update, jadi update-nya penyebabnya"* belum tentu benar
- **Menelusuri sebab masalah** di Debugging — memastikan langkah penalaranmu sah, bukan kebetulan cocok
- **Sistem pakar** di Kecerdasan Buatan — mesin inferensi maju dan mundur secara harfiah menerapkan modus ponens
- **Menilai argumen** dalam sidang skripsi, rapat, atau tulisan ilmiah
- **Menyusun aturan bisnis berantai** — kalau A maka B, kalau B maka C, jadi kalau A maka C

Dua bentuk yang wajib dikenali karena keduanya sangat mirip tetapi hanya satu yang sah:

- **Modus ponens** — \`p → q\`, \`p\` benar, maka \`q\` benar. **SAH.**
- **Menegaskan konsekuen** — \`p → q\`, \`q\` benar, maka \`p\` benar. **TIDAK SAH**, dan ini kesalahan yang paling sering terjadi.`,

  praktik: {
    tujuan: `Kamu bisa memeriksa keabsahan sebuah argumen dengan tabel kebenaran, dan mengenali dua kesalahan penalaran yang paling sering muncul.`,
    alat: [
      'Python 3',
      'Satu laporan bug atau kesimpulan yang ingin kamu periksa'
    ],
    langkah: [
      { judul: 'Tulis argumennya dalam bentuk baku',
        isi: `Susun sebagai daftar premis, lalu garis, lalu kesimpulan:

- \`premis 1   : p → q\`
- \`premis 2   : p\`
- \`------------------\`
- \`kesimpulan : q\`

Menuliskannya seperti ini sudah menyelesaikan separuh pekerjaan, karena kamu dipaksa memisahkan **apa yang diketahui** dari **apa yang disimpulkan**.` },
      { judul: 'Pakai definisi keabsahan yang tepat',
        isi: `Sebuah argumen **sah** kalau: **tidak ada satu pun baris** di mana semua premisnya benar tetapi kesimpulannya salah.

Perhatikan bahwa ini **tidak** berarti kesimpulannya benar. Argumen sah dengan premis salah bisa menghasilkan kesimpulan salah — dan tetap sah.

Keabsahan menilai **bentuk penalarannya**, bukan kebenaran isinya.` },
      { judul: 'Periksa dengan kode',
        isi: `Untuk tiap baris tabel kebenaran, periksa: apakah **semua premis benar**? Kalau ya, apakah **kesimpulannya juga benar**?

Kalau kamu menemukan satu baris dengan premis semua benar dan kesimpulan salah, itu **baris penyangkal**, dan argumennya tidak sah.

Cetak baris itu — ia menjelaskan persis di mana penalarannya bocor.` },
      { judul: 'Uji dua bentuk yang mirip tapi berbeda nasibnya',
        isi: `Bandingkan langsung:

- **Modus ponens**: premis \`p → q\` dan \`p\`; kesimpulan \`q\` → **sah**
- **Menegaskan konsekuen**: premis \`p → q\` dan \`q\`; kesimpulan \`p\` → **tidak sah**

Cari baris penyangkal untuk yang kedua. Baris itu adalah \`p\` salah, \`q\` benar — dan begitu kamu melihatnya, kesalahannya jadi jelas selamanya.` },
      { judul: 'Terapkan pada satu laporan bug sungguhan',
        isi: `Ambil kesimpulan seperti *"errornya muncul setelah kita ganti pustaka X, jadi penyebabnya pustaka X"*.

Tulis sebagai argumen. Kamu akan melihat bahwa bentuknya adalah **menegaskan konsekuen**: *"kalau X bermasalah maka error muncul; error muncul; maka X bermasalah."*

Itu tidak sah. Yang benar adalah **menguji langsung** — kembalikan pustakanya dan lihat apakah errornya hilang.` },
      { judul: 'Kenali silogisme berantai',
        isi: `\`p → q\` dan \`q → r\` menghasilkan \`p → r\`. Ini **sah**, dan sangat berguna.

Terpakai saat menelusuri aturan berantai: *"kalau stok nol maka pesanan ditahan; kalau pesanan ditahan maka pelanggan diberi tahu"* — maka **kalau stok nol, pelanggan diberi tahu**, tanpa perlu aturan terpisah untuk itu.` }
    ],
    cek: [
      'Modus ponens terdeteksi sah, dan menegaskan konsekuen terdeteksi tidak sah',
      'Untuk setiap argumen tidak sah, kodemu bisa mencetak baris penyangkalnya',
      'Kamu bisa menjelaskan kenapa argumen sah dengan premis salah tetap disebut sah'
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Argumen** adalah rangkaian pernyataan yang terdiri atas beberapa **premis** dan satu **kesimpulan**. Tujuannya menunjukkan bahwa kesimpulan itu **mengikuti** dari premis-premisnya.

Penulisannya biasa disusun bertingkat, dengan garis pemisah sebelum kesimpulan:

- \`premis 1   : p → q\`
- \`premis 2   : p\`
- \`--------------------\`
- \`kesimpulan : q\`

Ada dua istilah yang **wajib kamu bedakan**, dan ini paling sering tertukar:

**Sahih (valid)** — kalau semua premisnya benar, kesimpulannya **pasti** benar. Yang dinilai adalah **bentuknya**, bukan isinya.

**Benar (sound)** — argumennya sahih **dan** semua premisnya memang benar dalam kenyataan.

Perbedaannya penting. Argumen ini **sahih** meski premisnya jelas salah:

- Premis: Semua kucing bisa terbang
- Premis: Tom adalah kucing
- Kesimpulan: Tom bisa terbang

Bentuk penalarannya benar — **kalau** premisnya benar, kesimpulannya pasti benar. Yang bermasalah adalah premisnya, bukan penalarannya. Jadi argumen ini sahih tetapi tidak benar.

Ada dua cara menguji kesahihan:

- **Lewat tabel kebenaran** — susun \`(premis1 ∧ premis2 ∧ ...) → kesimpulan\`. Kalau hasilnya **tautologi**, argumennya sahih. Cara ini pasti benar tapi lambat.
- **Lewat aturan inferensi** — rangkai aturan-aturan baku sampai sampai ke kesimpulan. Lebih cepat, dan inilah yang biasanya diminta di soal.

Aturan inferensi baku yang perlu kamu kuasai:

- **Modus Ponens** — dari \`p → q\` dan \`p\`, simpulkan \`q\`
- **Modus Tollens** — dari \`p → q\` dan \`¬q\`, simpulkan \`¬p\`
- **Silogisme Hipotetis** — dari \`p → q\` dan \`q → r\`, simpulkan \`p → r\`
- **Silogisme Disjungtif** — dari \`p ∨ q\` dan \`¬p\`, simpulkan \`q\`
- **Simplifikasi** — dari \`p ∧ q\`, simpulkan \`p\`
- **Konjungsi** — dari \`p\` dan \`q\`, simpulkan \`p ∧ q\`
- **Adisi** — dari \`p\`, simpulkan \`p ∨ q\`

Dan dua bentuk yang **menyerupai** tetapi **tidak sahih**, sudah kamu kenali di topik sebelumnya: **menegaskan konsekuen** dan **menyangkal anteseden**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# MODUS PONENS — aturan paling dasar\n#\n#   p → q        "jika hujan, jalanan basah"\n#   p            "hujan"\n#   ---------\n#   ∴ q          "jalanan basah"',
      penjelasan: `
**Modus ponens** adalah aturan penalaran paling dasar, dan namanya berarti "cara menegaskan".

Alurnya: kalau kamu punya aturan \`p → q\` dan kamu tahu \`p\` benar, maka \`q\` pasti benar. Ini langsung mengikuti dari tabel implikasi — satu-satunya baris di mana p benar dan implikasinya benar adalah baris di mana q juga benar.

Lambang **∴** berarti "maka" atau "jadi", dan dipakai untuk menandai kesimpulan.

Kesahihannya bisa dibuktikan sebagai tautologi: **(p ∧ (p → q)) → q** bernilai benar di semua baris. Kamu sudah membuktikan ini di topik Tautologi.

Perhatikan bahwa modus ponens memakai implikasi **searah maju**: dari anteseden ke konsekuen. Inilah arah yang diizinkan.

Aturan ini juga menjadi dasar cara kerja komputer menjalankan program. Setiap \`if (kondisi) { aksi }\` sebenarnya modus ponens: ada aturan "jika kondisi maka aksi", dan ketika kondisinya terpenuhi, aksinya dijalankan.

Kesalahan yang menyerupainya — dari \`q\` menyimpulkan \`p\` — adalah **menegaskan konsekuen**, dan itu tidak sahih.
`
    },
    {
      bahasa: 'python',
      kode: '# MODUS TOLLENS — menarik kesimpulan MUNDUR\n#\n#   p → q        "jika hujan, jalanan basah"\n#   ¬q           "jalanan TIDAK basah"\n#   ---------\n#   ∴ ¬p         "berarti TIDAK hujan"',
      penjelasan: `
**Modus tollens** berarti "cara menyangkal", dan ia adalah **kontraposisi yang dipakai sebagai aturan penalaran**.

Alurnya: kalau aturan \`p → q\` berlaku dan ternyata \`q\` **tidak** terjadi, maka \`p\` pasti tidak terjadi. Sebab kalau p terjadi, q pasti ikut terjadi — dan itu bertentangan dengan kenyataan.

Inilah satu-satunya arah mundur yang sah. Bandingkan dengan dua bentuk yang tidak sahih:

- Dari \`q\` menyimpulkan \`p\` → **tidak sahih** (menegaskan konsekuen)
- Dari \`¬p\` menyimpulkan \`¬q\` → **tidak sahih** (menyangkal anteseden)
- Dari \`¬q\` menyimpulkan \`¬p\` → **sahih** (modus tollens) ✓

Modus tollens sangat berguna dalam **pengujian dan pencarian kesalahan**. Contohnya saat men-debug: *"Kalau kode ini benar, keluarannya pasti X. Keluarannya bukan X, berarti kodenya salah."*

Cara kerja ilmu pengetahuan juga bertumpu pada aturan ini: *"Kalau teori ini benar, percobaan pasti memberi hasil Y. Hasilnya bukan Y, berarti teorinya salah."* Inilah dasar pengujian hipotesis.
`
    },
    {
      bahasa: 'python',
      kode: '# SILOGISME HIPOTETIS — merangkai implikasi\n#\n#   p → q        "jika belajar, paham"\n#   q → r        "jika paham, lulus"\n#   ---------\n#   ∴ p → r      "jika belajar, lulus"',
      penjelasan: `
**Silogisme hipotetis** memungkinkan kamu **merangkai** beberapa implikasi menjadi satu. Sifatnya seperti transitif pada urutan bilangan: kalau a < b dan b < c, maka a < c.

Aturan ini bisa dirangkai berapa kali pun. Dari \`p → q\`, \`q → r\`, dan \`r → s\`, kamu bisa menyimpulkan \`p → s\`.

Yang perlu diperhatikan: **bagian tengahnya harus benar-benar sama.** Dari \`p → q\` dan \`r → s\` tidak bisa disimpulkan apa-apa, karena tidak ada penghubungnya.

Aturan ini sangat sering dipakai dalam soal yang memberi banyak premis dan meminta satu kesimpulan. Strategi mengerjakannya: **cari rantai implikasi yang bisa disambung**, lalu rangkai sampai bertemu kesimpulan yang diminta.

Contoh soal khas: diberikan \`a → b\`, \`b → c\`, \`c → d\`, dan \`a\`. Buktikan \`d\`. Jalannya: rangkai ketiga implikasi menjadi \`a → d\` dengan silogisme hipotetis, lalu pakai modus ponens dengan premis \`a\`.

Di pemrograman, aturan ini muncul saat menalar tentang alur program bertingkat: kalau fungsi A memanggil B, dan B memanggil C, maka menjalankan A berarti menjalankan C.
`
    },
    {
      bahasa: 'python',
      kode: '# SILOGISME DISJUNGTIF — proses menyingkirkan\n#\n#   p ∨ q        "dia naik bus atau kereta"\n#   ¬p           "dia TIDAK naik bus"\n#   ---------\n#   ∴ q          "berarti naik kereta"',
      penjelasan: `
**Silogisme disjungtif** bekerja dengan cara **menyingkirkan kemungkinan**. Kalau salah satu dari dua kemungkinan pasti terjadi, dan kamu tahu yang satu tidak terjadi, maka yang lain pasti terjadi.

Aturan ini terasa sangat alami, dan sering kamu pakai tanpa sadar saat menalar sehari-hari.

Tetapi ada satu jebakan penting yang perlu diwaspadai: **ingat bahwa ∨ bersifat inklusif.** Dari \`p ∨ q\` dan \`p\` benar, kamu **tidak** bisa menyimpulkan \`¬q\` — karena keduanya boleh benar bersamaan.

Jadi yang sah cuma satu arah:

- Dari \`p ∨ q\` dan \`¬p\`, simpulkan \`q\` → **sahih** ✓
- Dari \`p ∨ q\` dan \`p\`, simpulkan \`¬q\` → **tidak sahih** ✗

Kesalahan kedua itu sering terjadi karena orang membaca "atau" sebagai eksklusif. Kalau memang yang dimaksud eksklusif, premisnya harus ditulis berbeda.

Aturan ini menjadi dasar cara kerja **penyelesaian masalah dengan menyingkirkan pilihan** — misalnya pada soal logika, permainan tebak-tebakan, maupun diagnosis kerusakan. Kamu daftar semua kemungkinan, lalu singkirkan satu per satu sampai tersisa satu.
`
    },
    {
      bahasa: 'python',
      kode: '# Menguji kesahihan lewat TABEL KEBENARAN:\n# susun (premis1 ∧ premis2) → kesimpulan\n# Kalau TAUTOLOGI -> argumen SAHIH\n#\n# Modus ponens : (p ∧ (p → q)) → q      -> tautologi ✓\n# Konvers      : (q ∧ (p → q)) → p      -> BUKAN tautologi ✗',
      penjelasan: `
Ini cara menguji kesahihan yang **pasti benar** dan tidak bisa dibantah, walau lebih lambat daripada merangkai aturan.

Langkahnya:

- **Gabungkan semua premis dengan ∧**
- **Hubungkan ke kesimpulan dengan →**
- **Susun tabel kebenarannya**
- Kalau **semua barisnya B**, argumennya sahih

Kenapa bentuknya begitu? Karena definisi sahih adalah *"kalau semua premis benar, kesimpulan pasti benar"* — dan itu persis makna implikasi. Argumen tidak sahih tepat ketika ada keadaan di mana premisnya semua benar tetapi kesimpulannya salah, yaitu baris B → S.

Cara cepat memeriksanya tanpa tabel penuh: **cari satu baris di mana semua premis bernilai B tetapi kesimpulannya S.** Kalau ketemu, argumennya langsung terbukti tidak sahih. Kalau tidak ada, argumennya sahih.

Baris seperti itu disebut **contoh penyangkal** (*counterexample*), dan menunjukkannya sudah cukup sebagai bukti ketidaksahihan — tidak perlu tabel lengkap.

Untuk soal dengan banyak premis, cara merangkai aturan inferensi biasanya jauh lebih cepat. Tetapi kalau kamu buntu atau ragu, tabel kebenaran selalu bisa diandalkan.
`
    },
    {
      bahasa: 'python',
      kode: '# DUA SESAT PIKIR yang menyerupai aturan sah\n#\n# MENEGASKAN KONSEKUEN (pakai konvers):\n#   p → q ,  q   ⊬  p          ✗ TIDAK SAHIH\n#\n# MENYANGKAL ANTESEDEN (pakai invers):\n#   p → q , ¬p   ⊬  ¬q         ✗ TIDAK SAHIH',
      penjelasan: `
Dua bentuk ini **sangat mirip** dengan modus ponens dan modus tollens, dan justru kemiripannya yang membuatnya berbahaya.

Bandingkan berdampingan:

- **Modus ponens** — \`p → q\`, **\`p\`** ⊢ \`q\` ✓
- **Menegaskan konsekuen** — \`p → q\`, **\`q\`** ⊢ \`p\` ✗
- **Modus tollens** — \`p → q\`, **\`¬q\`** ⊢ \`¬p\` ✓
- **Menyangkal anteseden** — \`p → q\`, **\`¬p\`** ⊢ \`¬q\` ✗

Perhatikan polanya: yang sah adalah **menegaskan yang depan** atau **menyangkal yang belakang**. Yang tidak sah adalah kebalikannya — menegaskan yang belakang atau menyangkal yang depan.

Cara mengingatnya dalam satu kalimat: **maju dari depan boleh, mundur dari belakang boleh asal dinegasikan.**

Lambang **⊢** berarti "menghasilkan kesimpulan", dan **⊬** berarti "tidak menghasilkan".

Contoh sesat pikir yang sering muncul di kehidupan nyata:

- *"Orang sukses bangun pagi. Saya bangun pagi, jadi saya akan sukses."* → menegaskan konsekuen
- *"Kalau vaksin, tidak sakit parah. Saya tidak vaksin, jadi pasti sakit parah."* → menyangkal anteseden

Cara membantahnya selalu sama: **cari kemungkinan lain**. Orang bisa bangun pagi tanpa menjadi sukses; orang bisa tidak vaksin dan tetap tidak sakit parah.
`
    }
  ],

  kode: {
    python: String.raw`from itertools import product


def bl(x):
    return "B" if x else "S"


def imp(p, q):
    return (not p) or q


def sahih(premis, kesimpulan, n=2):
    """Argumen sahih bila TIDAK ADA baris dengan semua premis B tapi kesimpulan S."""
    for nilai in product([True, False], repeat=n):
        if all(f(*nilai) for f in premis) and not kesimpulan(*nilai):
            return False, nilai          # ketemu contoh penyangkal
    return True, None


def uji(nama, premis, kesimpulan, n=2):
    hasil, sangkal = sahih(premis, kesimpulan, n)
    if hasil:
        print(f"  {nama:<28} -> SAHIH")
    else:
        huruf = "pqr"[:n]
        keadaan = ", ".join(f"{h}={bl(v)}" for h, v in zip(huruf, sangkal))
        print(f"  {nama:<28} -> TIDAK SAHIH   (penyangkal: {keadaan})")


print("=== ATURAN INFERENSI YANG SAH ===")

uji("Modus Ponens",
    [lambda p, q: imp(p, q), lambda p, q: p],
    lambda p, q: q)

uji("Modus Tollens",
    [lambda p, q: imp(p, q), lambda p, q: not q],
    lambda p, q: not p)

uji("Silogisme Hipotetis",
    [lambda p, q, r: imp(p, q), lambda p, q, r: imp(q, r)],
    lambda p, q, r: imp(p, r), 3)

uji("Silogisme Disjungtif",
    [lambda p, q: p or q, lambda p, q: not p],
    lambda p, q: q)

uji("Simplifikasi",
    [lambda p, q: p and q],
    lambda p, q: p)

uji("Konjungsi",
    [lambda p, q: p, lambda p, q: q],
    lambda p, q: p and q)

uji("Adisi",
    [lambda p, q: p],
    lambda p, q: p or q)


print("\n=== SESAT PIKIR (MIRIP TAPI TIDAK SAHIH) ===")

uji("Menegaskan konsekuen",
    [lambda p, q: imp(p, q), lambda p, q: q],
    lambda p, q: p)

uji("Menyangkal anteseden",
    [lambda p, q: imp(p, q), lambda p, q: not p],
    lambda p, q: not q)

uji("Disjungsi: p benar -> ¬q",
    [lambda p, q: p or q, lambda p, q: p],
    lambda p, q: not q)


# ---------- Membaca contoh penyangkal ----------
print("\n=== MEMBACA CONTOH PENYANGKAL ===")
print("  Menegaskan konsekuen, penyangkal p=S, q=B:")
print("    premis 1: p → q  =", bl(imp(False, True)), " (benar)")
print("    premis 2: q      =", bl(True), " (benar)")
print("    kesimpulan: p    =", bl(False), " (SALAH)")
print("  -> semua premis benar tapi kesimpulan salah = TIDAK SAHIH")


# ---------- Merangkai beberapa aturan ----------
print("\n=== MERANGKAI ATURAN ===")
print("  Diketahui: a → b,  b → c,  c → d,  a")
print("  Buktikan : d\n")
print("    1. a → b, b → c        [premis]")
print("    2. a → c               [silogisme hipotetis dari 1]")
print("    3. a → c, c → d        [dari 2 dan premis]")
print("    4. a → d               [silogisme hipotetis dari 3]")
print("    5. a → d, a            [dari 4 dan premis]")
print("    6. ∴ d                 [modus ponens dari 5]")

# Membuktikannya dengan program
def rantai(a, b, c, d):
    premis = imp(a, b) and imp(b, c) and imp(c, d) and a
    return (not premis) or d          # premis → kesimpulan

semua = all(rantai(*v) for v in product([True, False], repeat=4))
print(f"\n  Diperiksa dengan tabel 2^4 = 16 baris -> tautologi? {semua}")


# ---------- Sahih vs Benar ----------
print("\n=== SAHIH vs BENAR ===")
print("  Argumen:")
print("    premis 1 : Semua kucing bisa terbang")
print("    premis 2 : Tom adalah kucing")
print("    ∴          Tom bisa terbang")
print()
print("  SAHIH?  ya  -> bentuk penalarannya benar")
print("  BENAR?  tidak -> premis pertamanya salah")
print("  -> argumen bisa sahih tanpa premisnya benar")`,

    js: String.raw`function bl(x) { return x ? "B" : "S"; }
function imp(p, q) { return !p || q; }

function semuaKombinasi(n) {
    const hasil = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        const baris = [];
        for (let j = n - 1; j >= 0; j--) baris.push(!((i >> j) & 1));
        hasil.push(baris);
    }
    return hasil;
}

// Argumen sahih bila TIDAK ADA baris dengan semua premis B tapi kesimpulan S
function sahih(premis, kesimpulan, n) {
    for (const nilai of semuaKombinasi(n || 2)) {
        const semuaPremis = premis.every(function (f) { return f.apply(null, nilai); });
        if (semuaPremis && !kesimpulan.apply(null, nilai)) {
            return { sahih: false, penyangkal: nilai };
        }
    }
    return { sahih: true, penyangkal: null };
}

function uji(nama, premis, kesimpulan, n) {
    const h = sahih(premis, kesimpulan, n || 2);
    if (h.sahih) {
        console.log("  " + nama.padEnd(28) + " -> SAHIH");
    } else {
        const huruf = "pqr".slice(0, n || 2).split("");
        const keadaan = huruf.map(function (x, i) {
            return x + "=" + bl(h.penyangkal[i]);
        }).join(", ");
        console.log("  " + nama.padEnd(28) + " -> TIDAK SAHIH   (penyangkal: " + keadaan + ")");
    }
}

console.log("=== ATURAN INFERENSI YANG SAH ===");

uji("Modus Ponens",
    [function (p, q) { return imp(p, q); }, function (p) { return p; }],
    function (p, q) { return q; });

uji("Modus Tollens",
    [function (p, q) { return imp(p, q); }, function (p, q) { return !q; }],
    function (p) { return !p; });

uji("Silogisme Hipotetis",
    [function (p, q, r) { return imp(p, q); }, function (p, q, r) { return imp(q, r); }],
    function (p, q, r) { return imp(p, r); }, 3);

uji("Silogisme Disjungtif",
    [function (p, q) { return p || q; }, function (p) { return !p; }],
    function (p, q) { return q; });

uji("Simplifikasi",
    [function (p, q) { return p && q; }],
    function (p) { return p; });

console.log("\n=== SESAT PIKIR ===");

uji("Menegaskan konsekuen",
    [function (p, q) { return imp(p, q); }, function (p, q) { return q; }],
    function (p) { return p; });

uji("Menyangkal anteseden",
    [function (p, q) { return imp(p, q); }, function (p) { return !p; }],
    function (p, q) { return !q; });

console.log("\n=== POLA YANG PERLU DIINGAT ===");
console.log("  SAH   : maju dari DEPAN        (p → q, p  ⊢ q)");
console.log("  SAH   : mundur dari BELAKANG   (p → q, ¬q ⊢ ¬p)");
console.log("  SESAT : mundur dari belakang tanpa negasi  (p → q, q  ⊬ p)");
console.log("  SESAT : maju dari depan dengan negasi      (p → q, ¬p ⊬ ¬q)");`
  },

  output: `=== ATURAN INFERENSI YANG SAH ===
  Modus Ponens                 -> SAHIH
  Modus Tollens                -> SAHIH
  Silogisme Hipotetis          -> SAHIH
  Silogisme Disjungtif         -> SAHIH
  Simplifikasi                 -> SAHIH
  Konjungsi                    -> SAHIH
  Adisi                        -> SAHIH

=== SESAT PIKIR (MIRIP TAPI TIDAK SAHIH) ===
  Menegaskan konsekuen         -> TIDAK SAHIH   (penyangkal: p=S, q=B)
  Menyangkal anteseden         -> TIDAK SAHIH   (penyangkal: p=S, q=B)
  Disjungsi: p benar -> ¬q     -> TIDAK SAHIH   (penyangkal: p=B, q=B)

=== MEMBACA CONTOH PENYANGKAL ===
  Menegaskan konsekuen, penyangkal p=S, q=B:
    premis 1: p → q  = B  (benar)
    premis 2: q      = B  (benar)
    kesimpulan: p    = S  (SALAH)
  -> semua premis benar tapi kesimpulan salah = TIDAK SAHIH`,

  kesalahanUmum: [
    {
      salah: 'Mencampuradukkan "sahih" dengan "benar".',
      kenapa: 'Argumen bisa **sahih** meski premisnya salah, karena yang dinilai adalah bentuk penalarannya. Sebaliknya, argumen dengan premis benar bisa **tidak sahih** kalau penalarannya keliru. Soal ujian sering menguji perbedaan ini secara khusus.',
      benar: 'Ingat pembedaannya: **sahih** menilai bentuk ("kalau premis benar, kesimpulan pasti benar"), sedangkan **benar** menuntut sahih **dan** premisnya memang benar dalam kenyataan.'
    },
    {
      salah: 'Memakai bentuk "dari `p → q` dan `q`, simpulkan `p`".',
      kenapa: 'Ini **menegaskan konsekuen**, dan tidak sahih karena memakai konvers. Contoh penyangkalnya: p salah dan q benar — kedua premis bernilai benar tetapi kesimpulannya salah.',
      benar: 'Yang sah cuma **modus ponens** (dari `p` simpulkan `q`). Untuk arah mundur, gunakan **modus tollens** yang menuntut `¬q`, bukan `q`.'
    },
    {
      salah: 'Memakai bentuk "dari `p → q` dan `¬p`, simpulkan `¬q`".',
      kenapa: 'Ini **menyangkal anteseden**, memakai invers yang tidak setara. Implikasi tidak menjanjikan apa pun ketika antesedennya salah — sehingga tidak ada kesimpulan yang boleh ditarik.',
      benar: 'Ingat analogi janji: kalau syaratnya tidak terpenuhi, janjinya tidak berkata apa-apa. Untuk menyimpulkan sesuatu dari negasi, gunakan **modus tollens** yang bekerja dari `¬q`.'
    },
    {
      salah: 'Dari `p ∨ q` dan `p` benar, menyimpulkan `¬q`.',
      kenapa: 'Disjungsi bersifat **inklusif** — p dan q boleh benar bersamaan. Mengetahui p benar tidak memberi informasi apa pun tentang q. Kesalahan ini berakar pada kebiasaan membaca "atau" sebagai eksklusif.',
      benar: 'Silogisme disjungtif hanya sah dari **negasi** salah satu: dari `p ∨ q` dan `¬p`, simpulkan `q`. Arah sebaliknya tidak sah.'
    },
    {
      salah: 'Menyimpulkan argumen sahih setelah memeriksa beberapa baris saja.',
      kenapa: 'Sama seperti tautologi, kesahihan menuntut **seluruh** baris diperiksa. Beberapa baris yang cocok tidak menjamin tidak ada baris penyangkal di tempat lain.',
      benar: 'Untuk membuktikan **tidak sahih**, cukup tunjukkan **satu** baris penyangkal — yaitu baris di mana semua premis B tetapi kesimpulan S. Untuk membuktikan **sahih**, periksa semua baris.'
    },
    {
      salah: 'Merangkai silogisme hipotetis pada implikasi yang bagian tengahnya berbeda.',
      kenapa: 'Dari `p → q` dan `r → s` tidak bisa disimpulkan apa pun, karena tidak ada penghubung di antaranya. Merangkainya secara paksa menghasilkan kesimpulan yang tidak sahih.',
      benar: 'Pastikan **konsekuen premis pertama sama persis dengan anteseden premis kedua**. Kalau tidak sama, cari premis lain yang bisa menjembatani.'
    }
  ],

  analogi: `
Bayangkan argumen sebagai **mesin**: premis adalah bahan yang masuk, kesimpulan adalah barang yang keluar.

**Sahih** berarti **mesinnya bekerja benar** — kalau bahannya bagus, barangnya pasti bagus. **Benar** berarti mesinnya bagus **dan** bahannya memang bagus.

Dari situ jelas bahwa mesin bagus dengan bahan busuk tetap menghasilkan barang busuk — dan itu bukan salah mesinnya. Itulah argumen yang sahih tetapi tidak benar.

Untuk **membedakan aturan sah dari sesat pikir**, pakai gambaran **jalan satu arah** yang sudah kamu kenal di topik sebelumnya:

- **Modus ponens** — berjalan maju dari p ke q ✓
- **Modus tollens** — berjalan mundur, tetapi dengan tanda negatif di kedua ujungnya ✓
- **Menegaskan konsekuen** — berjalan mundur tanpa negasi ✗
- **Menyangkal anteseden** — berjalan maju dengan negasi ✗

Satu kalimat untuk mengingat semuanya: **maju dari depan boleh, mundur dari belakang boleh asal dinegasikan.**

Untuk **modus tollens**, hubungkan dengan kebiasaan mencari kesalahan program. Saat men-debug kamu sebenarnya sedang memakai modus tollens: *"Kalau kode ini benar, keluarannya pasti X. Ternyata keluarannya bukan X. Berarti kodenya salah."* Menyadari ini membuat aturan tersebut terasa alami, bukan hafalan.

Untuk **silogisme disjungtif**, gunakan cara berpikir menyingkirkan pilihan: *"Berkasnya ada di folder A, B, atau C. Bukan di A. Bukan di B. Berarti di C."* Kamu sudah sering melakukannya tanpa menamainya.

Cara paling efektif menguasai topik ini: **kumpulkan sesat pikir dari kehidupan nyata.** Perhatikan iklan, berita, atau perdebatan di media sosial, lalu tanyakan: *"apakah kesimpulan ini memakai bentuk yang sah?"* Kemampuan menangkapnya berguna jauh melampaui ujian — dan justru latihan inilah yang membuat aturan-aturan tadi benar-benar melekat.
`,

  latihan: [
    'Tentukan aturan inferensi yang dipakai: (a) "Jika hujan jalanan basah. Hujan. Jadi jalanan basah.", (b) "Jika hujan jalanan basah. Jalanan tidak basah. Jadi tidak hujan."',
    'Uji kesahihan argumen ini dengan tabel kebenaran: premis `p → q`, premis `q`, kesimpulan `p`. Kalau tidak sahih, tunjukkan baris penyangkalnya.',
    'Diketahui `a → b`, `b → c`, `c → d`, dan `a`. Buktikan `d` dengan merangkai aturan inferensi. Tulis nama aturan di tiap langkah.',
    'Tentukan apakah argumen ini sahih: premis `p ∨ q`, premis `p`, kesimpulan `¬q`. Jelaskan jawabanmu dengan sifat disjungsi inklusif.',
    'Buat satu contoh argumen yang **sahih tetapi tidak benar**, dan satu yang **premisnya benar tetapi tidak sahih**.',
    'Kenali sesat pikir pada pernyataan berikut: (a) "Semua juara kelas rajin membaca. Andi rajin membaca, jadi Andi juara kelas.", (b) "Kalau makan teratur, tidak sakit maag. Dia tidak makan teratur, jadi dia pasti sakit maag."',
    'Diberikan premis `¬p ∨ q`, `q → r`, dan `p`. Kesimpulan apa yang bisa ditarik? Petunjuk: ubah premis pertama menjadi implikasi lebih dulu.',
    'Kumpulkan tiga contoh sesat pikir dari iklan, berita, atau media sosial. Tentukan jenisnya dan jelaskan cara membantahnya.',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri beda modus tollens dan menegaskan konsekuen. Pakai satu contoh nyata untuk masing-masing.'
  ]
});

TOPICS.push({
  id: 'kuantor',
  judul: 'Logika Predikat & Kuantor',
  kategori: 'logika',
  tag: ['predikat', 'kuantor', 'universal', 'eksistensial', 'semesta pembicaraan'],
  ringkas: 'Memperluas logika agar bisa menangani kata "semua" dan "ada" — yang tidak tertangkap logika proposisi.',

  fungsi: `**Menyatakan aturan yang berlaku untuk banyak data sekaligus — dan menegasikannya dengan benar.**

Kuantor muncul di mana-mana begitu kamu berhadapan dengan kumpulan data:

- **Validasi**: *"semua kolom wajib harus terisi"* adalah kuantor universal
- **Pencarian**: *"ada tidak mahasiswa yang IPK-nya di atas 3,5?"* adalah kuantor eksistensial
- **SQL**: \`EXISTS\`, \`NOT EXISTS\`, \`ALL\`, \`ANY\` adalah kuantor secara harfiah
- **Kode**: \`all()\` dan \`any()\` di Python, \`every()\` dan \`some()\` di JavaScript
- **Pengujian**: *"tidak ada satu pun kasus uji yang gagal"* adalah negasi kuantor eksistensial

Yang paling sering salah dan paling mahal: **menegasikan kuantor**.

Lawan dari *"semua mahasiswa lulus"* **bukan** *"semua mahasiswa tidak lulus"* — melainkan *"ada setidaknya satu yang tidak lulus"*.

Salah di sini berarti syarat validasimu menolak data yang seharusnya diterima, atau sebaliknya.`,

  praktik: {
    tujuan: `Kamu bisa menuliskan aturan berkuantor dalam kode, menegasikannya dengan benar, dan memakai \`all()\` serta \`any()\` dengan tepat.`,
    alat: [
      'Python 3',
      'Basis data kecil atau daftar data untuk diuji'
    ],
    langkah: [
      { judul: 'Kenali kuantornya dari kata kuncinya',
        isi: `Cari kata-kata ini di aturan yang kamu baca:

- **universal (∀)**: semua, setiap, seluruh, tidak ada yang tidak
- **eksistensial (∃)**: ada, terdapat, sedikitnya satu, minimal satu, beberapa

Kalau kalimatnya tidak memuat kata itu, sering kali kuantornya **tersirat**. *"Mahasiswa wajib mengisi KRS"* sebenarnya berarti *"setiap mahasiswa..."*.` },
      { judul: 'Tulis dalam kode',
        isi: `Python menyediakan keduanya langsung:

- \`all(m.lulus for m in mahasiswa)\` — untuk universal
- \`any(m.ipk > 3.5 for m in mahasiswa)\` — untuk eksistensial

Keduanya berhenti begitu jawabannya pasti — \`all\` berhenti pada yang pertama salah, \`any\` pada yang pertama benar. Jadi mereka juga **lebih cepat** daripada menghitung semuanya.` },
      { judul: 'Perhatikan jebakan himpunan kosong',
        isi: `Ini yang paling sering mengejutkan orang:

- \`all([])\` menghasilkan **True**
- \`any([])\` menghasilkan **False**

Jadi *"semua mahasiswa di kelas ini lulus"* bernilai **benar** untuk kelas yang **tidak punya mahasiswa sama sekali**.

Terdengar aneh, tetapi konsisten: tidak ada satu pun penyangkal, jadi pernyataannya tidak terbantahkan. Yang penting adalah **kamu menyadarinya**, karena validasi yang mengandalkan \`all\` bisa lolos pada data kosong.` },
      { judul: 'Latih negasinya sampai otomatis',
        isi: `Aturannya cuma satu baris, dan pantas dihafal:

- \`¬∀x P(x)\` menjadi \`∃x ¬P(x)\`
- \`¬∃x P(x)\` menjadi \`∀x ¬P(x)\`

Dalam kalimat: **negasi membalik kuantornya**, lalu menegasikan isinya.

Uji di Python: \`not all(xs)\` harus selalu sama dengan \`any(not x for x in xs)\`. Coba pada sepuluh daftar acak dan pastikan cocok setiap kali.` },
      { judul: 'Terapkan ke SQL',
        isi: `Ubah *"tampilkan mahasiswa yang BELUM mengambil satu pun mata kuliah wajib"* menjadi kueri.

Itu negasi eksistensial, jadi bentuknya \`NOT EXISTS\`:

- \`SELECT * FROM mahasiswa m WHERE NOT EXISTS (SELECT 1 FROM krs k WHERE k.nim = m.nim AND k.wajib = 1)\`

Perhatikan bahwa mencoba menulisnya dengan \`!=\` biasa akan salah — karena satu baris yang tidak cocok tidak berarti **tidak ada** baris yang cocok.` },
      { judul: 'Hati-hati dengan kuantor bersarang',
        isi: `*"Setiap mahasiswa punya sedikitnya satu dosen pembimbing"* berbeda dari *"ada satu dosen yang membimbing setiap mahasiswa"*.

Yang pertama: tiap mahasiswa punya pembimbing, boleh berbeda-beda.
Yang kedua: **satu dosen yang sama** membimbing semuanya.

Urutan kuantornya berpengaruh, dan salah membacanya menghasilkan basis data dengan relasi yang salah.` }
    ],
    cek: [
      '`not all(xs)` dan `any(not x for x in xs)` memberi hasil sama untuk 10 daftar acak',
      'Kamu bisa menjelaskan kenapa `all([])` bernilai True',
      `Kueri NOT EXISTS-mu mengembalikan baris yang sama dengan hasil pemeriksaan manual pada data kecil`
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
Logika proposisi yang sudah kamu pelajari punya satu keterbatasan besar. Coba tuliskan kalimat berikut dalam notasi proposisi:

*"Semua mahasiswa Informatika belajar pemrograman."*

Kamu hanya bisa melambangkannya sebagai satu huruf, misalnya \`p\`. Tapi itu **membuang seluruh strukturnya** — kata "semua", siapa yang dimaksud, dan apa yang dilakukan semuanya hilang. Akibatnya kamu tidak bisa menghubungkannya dengan kalimat *"Budi mahasiswa Informatika"* untuk menyimpulkan *"Budi belajar pemrograman"*.

**Logika predikat** memperbaiki ini dengan memecah kalimat menjadi dua bagian:

- **Predikat** — sifat atau hubungan, ditulis seperti fungsi: \`P(x)\` berarti "x punya sifat P"
- **Kuantor** — penanda seberapa banyak yang dimaksud

Contohnya \`M(x)\` berarti "x adalah mahasiswa Informatika" dan \`B(x)\` berarti "x belajar pemrograman". Kalimat tadi menjadi \`∀x (M(x) → B(x))\`.

Ada **dua kuantor** yang perlu kamu kuasai:

- **Kuantor universal (∀)** — dibaca "untuk semua". \`∀x P(x)\` berarti P benar untuk **setiap** x
- **Kuantor eksistensial (∃)** — dibaca "ada" atau "terdapat". \`∃x P(x)\` berarti P benar untuk **paling sedikit satu** x

Satu hal yang wajib selalu disertakan: **semesta pembicaraan** (*domain*), yaitu himpunan nilai yang boleh dipakai untuk x. Tanpa itu, pernyataannya tidak punya arti pasti. Kalimat \`∀x (x > 0)\` bernilai **benar** bila semestanya bilangan asli, tetapi **salah** bila semestanya bilangan bulat.

Yang paling sering diujikan dari topik ini adalah **menegasikan kuantor**, dan aturannya mirip De Morgan:

- \`¬∀x P(x) ≡ ∃x ¬P(x)\` — "tidak semua" berarti "ada yang tidak"
- \`¬∃x P(x) ≡ ∀x ¬P(x)\` — "tidak ada" berarti "semua tidak"

Inilah yang menjawab pertanyaan dari topik pertama: kenapa lawan dari "semua mahasiswa lulus" adalah "ada mahasiswa yang tidak lulus", bukan "semua mahasiswa tidak lulus".
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '∀x P(x)     # untuk SEMUA x, P(x) benar\n∃x P(x)     # ADA paling sedikit satu x dengan P(x) benar\n\n# ∀ = huruf A terbalik (All)\n# ∃ = huruf E terbalik (Exists)',
      penjelasan: `
Cara mengingat lambangnya sangat mudah karena memang dirancang begitu:

- **∀** adalah huruf **A** yang dibalik, dari kata *All* — semua
- **∃** adalah huruf **E** yang dibalik, dari kata *Exists* — ada

Perhatikan perbedaan tuntutan keduanya:

- \`∀x P(x)\` **salah** kalau ada **satu saja** x yang membuat P(x) salah. Cukup satu penyangkal untuk merobohkannya
- \`∃x P(x)\` **benar** kalau ada **satu saja** x yang membuat P(x) benar. Cukup satu contoh untuk membuktikannya

Ini punya akibat praktis yang penting saat mengerjakan soal:

- Untuk **membantah** pernyataan berkuantor universal, cukup berikan **satu contoh penyangkal**
- Untuk **membuktikan** pernyataan berkuantor eksistensial, cukup berikan **satu contoh**
- Untuk **membuktikan** universal atau **membantah** eksistensial, kamu harus memeriksa **seluruh** semesta

Polanya sama persis dengan tautologi: yang menuntut "semua" itu mahal dibuktikan tapi murah dibantah, dan sebaliknya.

Beberapa buku memakai lambang lain, misalnya \`(x)\` untuk universal atau \`(∃x)\` dengan kurung. Artinya tetap sama.
`
    },
    {
      bahasa: 'python',
      kode: '# SEMESTA PEMBICARAAN menentukan nilai kebenarannya\n#\n# ∀x (x > 0)\n#   semesta bilangan asli {1,2,3,...}  -> BENAR\n#   semesta bilangan bulat {...,-1,0,1} -> SALAH (x = -1)',
      penjelasan: `
**Semesta pembicaraan wajib disebutkan.** Tanpa itu, pernyataan berkuantor tidak punya nilai kebenaran yang pasti — dan soal yang tidak menyebutkannya sebenarnya tidak lengkap.

Contoh di atas menunjukkan pernyataan yang **sama persis** bisa benar atau salah tergantung semestanya. Ini bukan kasus buatan; hal seperti ini sering menjadi jebakan di soal.

Contoh lain yang lebih tajam:

- \`∃x (x² = 2)\` → **salah** bila semestanya bilangan rasional, **benar** bila bilangan real
- \`∀x (x² ≥ 0)\` → **benar** bila semestanya bilangan real, **salah** bila bilangan kompleks

Ada satu kasus khusus yang sering menjebak: **semesta kosong**. Bila semestanya tidak berisi apa pun:

- \`∀x P(x)\` bernilai **benar** — tidak ada yang bisa menyangkalnya. Inilah "benar secara hampa" yang sudah kamu temui di topik implikasi
- \`∃x P(x)\` bernilai **salah** — tidak ada yang bisa membuktikannya

Kalau terasa janggal, ingat kembali contoh dari topik pertama: *"Semua kuda bertanduk yang saya miliki berwarna merah"* bernilai benar, karena saya tidak punya kuda bertanduk sama sekali.

Kebiasaan yang baik saat mengerjakan soal: **tulis semestanya lebih dulu** sebelum menilai kebenarannya.
`
    },
    {
      bahasa: 'python',
      kode: '¬∀x P(x)  ≡  ∃x ¬P(x)      # "tidak semua" = "ada yang tidak"\n¬∃x P(x)  ≡  ∀x ¬P(x)      # "tidak ada"   = "semua tidak"\n\n# Polanya: kuantornya BERTUKAR, negasi masuk ke dalam',
      penjelasan: `
Inilah bagian yang **paling sering diujikan** dari topik ini, dan polanya persis seperti De Morgan yang sudah kamu kuasai.

Aturannya dua langkah, dan **keduanya harus dilakukan**:

- **Kuantornya bertukar** — ∀ menjadi ∃, dan ∃ menjadi ∀
- **Negasi masuk** ke dalam predikatnya

Cara memahaminya lewat bahasa sehari-hari:

*"Tidak benar bahwa semua mahasiswa lulus"* — apa artinya? Cukup **satu** yang tidak lulus untuk membuatnya benar. Jadi artinya *"ada mahasiswa yang tidak lulus"*. Perhatikan bahwa ini **tidak** sama dengan *"semua mahasiswa tidak lulus"*, yang jauh lebih kuat.

Sebaliknya: *"Tidak ada mahasiswa yang lulus"* berarti **setiap** mahasiswa tidak lulus — dan di sini ∃ berubah menjadi ∀.

Kesalahan tersering adalah menegasikan tanpa menukar kuantornya, sehingga *"tidak semua lulus"* keliru ditulis sebagai *"semua tidak lulus"*. Dua kalimat itu sangat berbeda maknanya.

Untuk kalimat berkuantor yang mengandung implikasi, negasinya jadi menarik:

\`¬∀x (M(x) → B(x)) ≡ ∃x ¬(M(x) → B(x)) ≡ ∃x (M(x) ∧ ¬B(x))\`

Artinya: lawan dari *"semua mahasiswa belajar"* adalah *"ada seseorang yang mahasiswa **tetapi** tidak belajar"*. Perhatikan implikasinya berubah menjadi konjungsi — memakai hukum \`¬(p → q) ≡ p ∧ ¬q\` yang sudah kamu pelajari.
`
    },
    {
      bahasa: 'python',
      kode: '# Pola baku menerjemahkan kalimat:\n#\n# "Semua A adalah B"   ->  ∀x (A(x) → B(x))     pakai IMPLIKASI\n# "Ada A yang B"       ->  ∃x (A(x) ∧ B(x))     pakai KONJUNGSI',
      penjelasan: `
Dua pola ini wajib dihafal, karena **operatornya berbeda** dan sering tertukar.

**Universal memakai implikasi.** Kalimat *"Semua mahasiswa rajin"* ditulis \`∀x (M(x) → R(x))\`, bukan \`∀x (M(x) ∧ R(x))\`.

Kenapa bukan konjungsi? Karena \`∀x (M(x) ∧ R(x))\` berarti *"setiap benda di semesta adalah mahasiswa **dan** rajin"* — termasuk meja, kucing, dan bilangan. Jelas bukan itu maksudnya. Yang kita mau adalah *"kalau x mahasiswa, maka x rajin"*, dan itulah implikasi.

**Eksistensial memakai konjungsi.** Kalimat *"Ada mahasiswa yang rajin"* ditulis \`∃x (M(x) ∧ R(x))\`, bukan \`∃x (M(x) → R(x))\`.

Kenapa bukan implikasi? Karena implikasi bernilai benar secara hampa ketika antesedennya salah. Jadi \`∃x (M(x) → R(x))\` akan bernilai benar **hanya karena ada benda yang bukan mahasiswa** — tidak menyatakan apa pun tentang kerajinan. Pernyataannya jadi tidak berguna.

Cara mengingatnya dalam satu kalimat: **"semua" pakai panah, "ada" pakai dan.**

Pola ini juga membantu saat menegasikan. Negasi dari \`∀x (A(x) → B(x))\` adalah \`∃x (A(x) ∧ ¬B(x))\` — dan perhatikan bahwa hasilnya otomatis mengikuti pola eksistensial dengan konjungsi.
`
    },
    {
      bahasa: 'python',
      kode: '# URUTAN kuantor MENENTUKAN artinya\n#\n# ∀x ∃y  (y > x)   "setiap x punya y yang lebih besar"   -> BENAR\n# ∃y ∀x  (y > x)   "ada satu y lebih besar dari SEMUA x" -> SALAH\n#\n# semesta: bilangan asli',
      penjelasan: `
Ketika ada **lebih dari satu kuantor**, urutannya sangat menentukan — dan menukarnya mengubah arti sepenuhnya.

Runut contoh di atas dengan semesta bilangan asli:

**\`∀x ∃y (y > x)\`** dibaca: *"untuk setiap x, ada y yang lebih besar dari x."* Ini **benar** — berapa pun x yang kamu pilih, kamu selalu bisa memilih y = x + 1. Perhatikan bahwa **y boleh berbeda untuk tiap x**.

**\`∃y ∀x (y > x)\`** dibaca: *"ada satu y yang lebih besar dari semua x."* Ini **salah** — tidak ada bilangan asli terbesar. Di sini **y harus satu nilai yang sama** untuk semua x.

Perbedaannya terletak pada **apakah nilai yang dijamin ada itu boleh berubah-ubah atau harus tetap**.

Contoh dalam bahasa sehari-hari yang lebih terasa:

- *"Setiap orang punya ibu"* → \`∀x ∃y (ibu(y, x))\` → **benar**, dan ibunya berbeda-beda
- *"Ada seorang ibu dari semua orang"* → \`∃y ∀x (ibu(y, x))\` → **salah**

Aturan praktis yang perlu diingat: **kuantor yang sama boleh ditukar urutannya, kuantor yang berbeda tidak.**

- \`∀x ∀y P(x,y) ≡ ∀y ∀x P(x,y)\` ✓
- \`∃x ∃y P(x,y) ≡ ∃y ∃x P(x,y)\` ✓
- \`∀x ∃y P(x,y) ≢ ∃y ∀x P(x,y)\` ✗

Satu arah tetap berlaku: \`∃y ∀x P(x,y)\` **mengakibatkan** \`∀x ∃y P(x,y)\`, tetapi tidak sebaliknya. Yang lebih kuat mengakibatkan yang lebih lemah.
`
    },
    {
      bahasa: 'python',
      kode: '# Di Python, kuantor punya padanan langsung:\n#\n# ∀x P(x)  ->  all(P(x) for x in semesta)\n# ∃x P(x)  ->  any(P(x) for x in semesta)\n\nall(x > 0 for x in [1, 2, 3])     # True  -> ∀\nany(x > 5 for x in [1, 2, 3])     # False -> ∃',
      penjelasan: `
Kalau kamu sudah terbiasa dengan Python di Praktikum Alpro, kedua kuantor ini punya padanan yang **persis sama** — dan ini cara tercepat memahaminya.

- **\`all()\`** adalah kuantor universal ∀ — bernilai benar bila **semua** anggota memenuhi
- **\`any()\`** adalah kuantor eksistensial ∃ — bernilai benar bila **paling sedikit satu** memenuhi

Yang menarik, sifat **semesta kosong** yang tadi terasa janggal jadi masuk akal begitu dicoba di Python:

- \`all([])\` menghasilkan **\`True\`** — sesuai \`∀\` pada semesta kosong
- \`any([])\` menghasilkan **\`False\`** — sesuai \`∃\` pada semesta kosong

Jadi Python memakai kesepakatan yang sama persis dengan logika. Ini bukan kebetulan; perancangnya memang mengikuti kaidah logika.

Aturan negasi kuantor pun bisa kamu buktikan sendiri di Python:

\`not all(P(x) for x in S)\` selalu sama hasilnya dengan \`any(not P(x) for x in S)\`

Bahasa lain punya padanannya juga: JavaScript memakai \`.every()\` dan \`.some()\`, Java memakai \`allMatch()\` dan \`anyMatch()\` pada Stream, dan C++ memakai \`std::all_of\` dan \`std::any_of\`.

Menyadari kaitan ini membuat kuantor berhenti terasa sebagai lambang matematika asing — ia sesuatu yang sudah kamu pakai saat menulis program.
`
    }
  ],

  kode: {
    python: String.raw`# Kuantor punya padanan LANGSUNG di Python: all() dan any()

semesta = [1, 2, 3, 4, 5]

print("=== KUANTOR DI PYTHON ===")
print(f"  semesta = {semesta}\n")

# ∀x (x > 0)
print("  ∀x (x > 0)  ->", all(x > 0 for x in semesta), " (all)")
# ∃x (x > 4)
print("  ∃x (x > 4)  ->", any(x > 4 for x in semesta), " (any)")
# ∀x (x > 3)
print("  ∀x (x > 3)  ->", all(x > 3 for x in semesta), " <- satu penyangkal cukup")
# ∃x (x > 9)
print("  ∃x (x > 9)  ->", any(x > 9 for x in semesta))


# ---------- SEMESTA menentukan nilai kebenaran ----------
print("\n=== SEMESTA MENENTUKAN HASILNYA ===")
asli  = [1, 2, 3, 4, 5]
bulat = [-2, -1, 0, 1, 2]

print(f"  ∀x (x > 0), semesta asli  {asli}  -> {all(x > 0 for x in asli)}")
print(f"  ∀x (x > 0), semesta bulat {bulat} -> {all(x > 0 for x in bulat)}")
print("  -> pernyataan SAMA, hasil BERBEDA")


# ---------- SEMESTA KOSONG ----------
print("\n=== SEMESTA KOSONG ===")
print(f"  all([])  -> {all([])}   sesuai ∀ pada semesta kosong (benar hampa)")
print(f"  any([])  -> {any([])}  sesuai ∃ pada semesta kosong")


# ---------- NEGASI KUANTOR ----------
print("\n=== NEGASI KUANTOR ===")
mahasiswa = [
    {"nama": "Budi",  "lulus": True},
    {"nama": "Ani",   "lulus": True},
    {"nama": "Citra", "lulus": False},
]

semua_lulus = all(m["lulus"] for m in mahasiswa)
ada_tak_lulus = any(not m["lulus"] for m in mahasiswa)

print(f"  ∀x lulus(x)      : {semua_lulus}")
print(f"  ¬∀x lulus(x)     : {not semua_lulus}")
print(f"  ∃x ¬lulus(x)     : {ada_tak_lulus}")
print(f"  keduanya sama?   : {(not semua_lulus) == ada_tak_lulus}   <- ¬∀ ≡ ∃¬")

semua_tak_lulus = all(not m["lulus"] for m in mahasiswa)
print(f"\n  ∀x ¬lulus(x)     : {semua_tak_lulus}  <- 'semua TIDAK lulus'")
print("  -> BEDA dengan ¬∀x lulus(x). Inilah kesalahan yang sering terjadi.")


# ---------- POLA PENERJEMAHAN ----------
print("\n=== POLA PENERJEMAHAN ===")
benda = [
    {"nama": "Budi", "mahasiswa": True,  "rajin": True},
    {"nama": "Ani",  "mahasiswa": True,  "rajin": False},
    {"nama": "meja", "mahasiswa": False, "rajin": False},
]

# "Semua mahasiswa rajin" -> ∀x (M(x) → R(x))
benar_universal = all((not b["mahasiswa"]) or b["rajin"] for b in benda)
# SALAH kalau pakai konjungsi
salah_universal = all(b["mahasiswa"] and b["rajin"] for b in benda)

print(f"  ∀x (M(x) → R(x))  -> {benar_universal}   <- BENAR caranya")
print(f"  ∀x (M(x) ∧ R(x))  -> {salah_universal}  <- SALAH: meja pun harus mahasiswa")

# "Ada mahasiswa yang rajin" -> ∃x (M(x) ∧ R(x))
benar_eksis = any(b["mahasiswa"] and b["rajin"] for b in benda)
salah_eksis = any((not b["mahasiswa"]) or b["rajin"] for b in benda)

print(f"\n  ∃x (M(x) ∧ R(x))  -> {benar_eksis}   <- BENAR caranya")
print(f"  ∃x (M(x) → R(x))  -> {salah_eksis}   <- SALAH: benar cuma karena ada meja")


# ---------- URUTAN KUANTOR ----------
print("\n=== URUTAN KUANTOR MENENTUKAN ARTI ===")
S = [1, 2, 3, 4, 5]

# ∀x ∃y (y > x)  -> untuk tiap x, ada y yang lebih besar
a = all(any(y > x for y in S) for x in S)
# ∃y ∀x (y > x)  -> ada satu y lebih besar dari SEMUA x
b = any(all(y > x for x in S) for y in S)

print(f"  ∀x ∃y (y > x) -> {a}   'tiap x punya y lebih besar'")
print(f"  ∃y ∀x (y > x) -> {b}  'ada y lebih besar dari semua x'")
print("  -> urutan ditukar, artinya BERUBAH TOTAL")`,

    js: String.raw`// Kuantor di JavaScript: .every() untuk ∀, .some() untuk ∃
const semesta = [1, 2, 3, 4, 5];

console.log("=== KUANTOR DI JAVASCRIPT ===");
console.log("  semesta =", semesta, "\n");

console.log("  ∀x (x > 0)  ->", semesta.every(function (x) { return x > 0; }), " (every)");
console.log("  ∃x (x > 4)  ->", semesta.some(function (x) { return x > 4; }), " (some)");
console.log("  ∀x (x > 3)  ->", semesta.every(function (x) { return x > 3; }),
            " <- satu penyangkal cukup");

// Semesta kosong
console.log("\n=== SEMESTA KOSONG ===");
console.log("  [].every(...) ->", [].every(function () { return false; }),
            "  sesuai ∀ (benar hampa)");
console.log("  [].some(...)  ->", [].some(function () { return true; }),
            " sesuai ∃");

// Negasi kuantor
console.log("\n=== NEGASI KUANTOR ===");
const mahasiswa = [
    { nama: "Budi", lulus: true },
    { nama: "Ani", lulus: true },
    { nama: "Citra", lulus: false }
];

const semuaLulus = mahasiswa.every(function (m) { return m.lulus; });
const adaTakLulus = mahasiswa.some(function (m) { return !m.lulus; });
const semuaTakLulus = mahasiswa.every(function (m) { return !m.lulus; });

console.log("  ∀x lulus(x)   :", semuaLulus);
console.log("  ¬∀x lulus(x)  :", !semuaLulus);
console.log("  ∃x ¬lulus(x)  :", adaTakLulus);
console.log("  sama?         :", !semuaLulus === adaTakLulus, "  <- ¬∀ ≡ ∃¬");
console.log("\n  ∀x ¬lulus(x)  :", semuaTakLulus, " <- 'semua TIDAK lulus'");
console.log("  -> BEDA dengan ¬∀. Ini kesalahan yang sering terjadi.");

// Urutan kuantor
console.log("\n=== URUTAN KUANTOR ===");
const S = [1, 2, 3, 4, 5];

const a = S.every(function (x) {
    return S.some(function (y) { return y > x; });
});
const b = S.some(function (y) {
    return S.every(function (x) { return y > x; });
});

console.log("  ∀x ∃y (y > x) ->", a, "  'tiap x punya y lebih besar'");
console.log("  ∃y ∀x (y > x) ->", b, " 'ada y lebih besar dari semua x'");
console.log("  -> urutan ditukar, artinya BERUBAH TOTAL");`
  },

  output: `=== KUANTOR DI PYTHON ===
  semesta = [1, 2, 3, 4, 5]

  ∀x (x > 0)  -> True  (all)
  ∃x (x > 4)  -> True  (any)
  ∀x (x > 3)  -> False  <- satu penyangkal cukup
  ∃x (x > 9)  -> False

=== SEMESTA KOSONG ===
  all([])  -> True   sesuai ∀ pada semesta kosong (benar hampa)
  any([])  -> False  sesuai ∃ pada semesta kosong

=== NEGASI KUANTOR ===
  ∀x lulus(x)      : False
  ¬∀x lulus(x)     : True
  ∃x ¬lulus(x)     : True
  keduanya sama?   : True   <- ¬∀ ≡ ∃¬

  ∀x ¬lulus(x)     : False  <- 'semua TIDAK lulus'
  -> BEDA dengan ¬∀x lulus(x). Inilah kesalahan yang sering terjadi.

=== URUTAN KUANTOR MENENTUKAN ARTI ===
  ∀x ∃y (y > x) -> False   'tiap x punya y lebih besar'
  ∃y ∀x (y > x) -> False  'ada y lebih besar dari semua x'`,

  kesalahanUmum: [
    {
      salah: 'Menegasikan `∀x P(x)` menjadi `∀x ¬P(x)` tanpa menukar kuantornya.',
      kenapa: '"Tidak semua mahasiswa lulus" **tidak sama** dengan "semua mahasiswa tidak lulus". Yang pertama cukup dibuktikan satu orang tidak lulus; yang kedua menuntut semuanya tidak lulus. Ini kesalahan tersering di topik ini.',
      benar: 'Ingat polanya seperti De Morgan: **kuantornya bertukar, negasi masuk**. `¬∀x P(x) ≡ ∃x ¬P(x)` dan `¬∃x P(x) ≡ ∀x ¬P(x)`.'
    },
    {
      salah: 'Menerjemahkan "Semua A adalah B" menjadi `∀x (A(x) ∧ B(x))`.',
      kenapa: 'Bentuk itu berarti **setiap benda di semesta** adalah A sekaligus B — termasuk meja dan kucing. Jelas bukan itu maksudnya, dan pernyataannya hampir selalu bernilai salah.',
      benar: 'Universal memakai **implikasi**: `∀x (A(x) → B(x))`. Hafalkan pasangannya: **"semua" pakai panah, "ada" pakai dan.**'
    },
    {
      salah: 'Menerjemahkan "Ada A yang B" menjadi `∃x (A(x) → B(x))`.',
      kenapa: 'Implikasi bernilai benar secara hampa ketika antesedennya salah. Jadi pernyataan itu bernilai benar **hanya karena ada benda yang bukan A** — sama sekali tidak menyatakan apa pun tentang sifat B.',
      benar: 'Eksistensial memakai **konjungsi**: `∃x (A(x) ∧ B(x))`. Ini menuntut adanya benda yang benar-benar A **dan** B sekaligus.'
    },
    {
      salah: 'Menukar urutan kuantor yang berbeda jenis.',
      kenapa: '`∀x ∃y` dan `∃y ∀x` punya arti yang sangat berbeda. Yang pertama membolehkan y berbeda untuk tiap x; yang kedua menuntut satu y yang sama untuk semua x. "Setiap orang punya ibu" benar, tetapi "ada satu ibu dari semua orang" salah.',
      benar: 'Kuantor **sejenis** boleh ditukar (∀∀ atau ∃∃), kuantor **berbeda jenis** tidak boleh. Saat membaca, kerjakan dari kiri ke kanan dan perhatikan kuantor mana yang membungkus yang lain.'
    },
    {
      salah: 'Menilai kebenaran pernyataan berkuantor tanpa menyebut semestanya.',
      kenapa: 'Pernyataan yang sama bisa benar atau salah tergantung semesta. `∀x (x > 0)` benar pada bilangan asli tetapi salah pada bilangan bulat. Tanpa semesta, soalnya tidak punya jawaban pasti.',
      benar: '**Tulis semestanya lebih dulu** sebelum menilai. Kalau soal tidak menyebutkan, tanyakan atau nyatakan asumsimu secara tertulis.'
    },
    {
      salah: 'Mengira semesta kosong membuat kedua kuantor bernilai salah.',
      kenapa: 'Pada semesta kosong, `∀x P(x)` bernilai **benar** (tidak ada yang menyangkalnya) sedangkan `∃x P(x)` bernilai **salah** (tidak ada yang membuktikannya). Keduanya berlawanan, bukan sama.',
      benar: 'Uji langsung di Python: `all([])` menghasilkan `True`, `any([])` menghasilkan `False`. Ini kesepakatan yang sama persis dengan logika.'
    }
  ],

  analogi: `
Bayangkan **∀ sebagai pemeriksa** dan **∃ sebagai pencari**.

**Pemeriksa (∀)** bertugas memastikan **semuanya** memenuhi syarat. Ia baru bisa bilang "lolos" setelah memeriksa **seluruhnya**. Tetapi begitu menemukan **satu** yang tidak memenuhi, ia langsung bisa bilang "gagal" dan berhenti.

**Pencari (∃)** bertugas menemukan **satu saja** yang memenuhi. Begitu ketemu, ia langsung bilang "ada" dan berhenti. Tetapi untuk bilang "tidak ada", ia harus memeriksa **seluruhnya**.

Perhatikan bahwa keduanya **berkebalikan** — dan justru itulah isi aturan negasi kuantor.

Untuk **mengingat aturan negasi**, pakai percakapan sehari-hari:

- *"Semua mahasiswa lulus."* — *"Tidak kok!"* — Bagaimana kamu membuktikannya? Cukup tunjuk **satu** yang tidak lulus. Itulah \`∃x ¬P(x)\`
- *"Tidak ada yang lulus."* — Untuk membantahnya, cukup tunjuk **satu** yang lulus

Untuk **pola penerjemahan**, ingat satu kalimat: **"semua" pakai panah, "ada" pakai dan.** Kalau lupa alasannya, uji dengan benda yang jelas bukan anggotanya — misalnya meja. Kalau terjemahanmu memaksa meja menjadi mahasiswa, berarti kamu salah pakai operator.

Untuk **urutan kuantor**, pakai contoh yang tidak mungkin salah diingat:

- *"Setiap orang punya ibu"* → benar, dan ibunya berbeda-beda
- *"Ada satu ibu dari semua orang"* → jelas salah

Perbedaannya: pada yang pertama, ibunya **boleh berganti** mengikuti orangnya. Pada yang kedua, harus **satu ibu yang sama** untuk semua.

Cara paling cepat menguasai topik ini kalau kamu sudah terbiasa Python: **anggap ∀ sebagai \`all()\` dan ∃ sebagai \`any()\`.** Semua sifat yang tadinya terasa aneh — termasuk semesta kosong — bisa kamu buktikan sendiri di penyunting Python dalam hitungan detik. Menjalankan \`all([])\` dan melihat hasilnya \`True\` jauh lebih meyakinkan daripada menghafal istilah "benar secara hampa".
`,

  latihan: [
    'Terjemahkan ke notasi kuantor dengan semesta manusia: (a) "Semua mahasiswa rajin", (b) "Ada mahasiswa yang tidak rajin", (c) "Tidak ada mahasiswa yang malas".',
    'Tuliskan negasi dari tiap pernyataan berikut: (a) `∀x (x > 0)`, (b) `∃x (x² = 4)`, (c) `∀x (M(x) → R(x))`.',
    'Tentukan nilai kebenaran `∀x (x² > x)` untuk tiga semesta berbeda: bilangan asli, bilangan bulat, dan bilangan real. Jelaskan kenapa berbeda.',
    'Jelaskan perbedaan arti antara `∀x ∃y (x + y = 0)` dan `∃y ∀x (x + y = 0)` pada semesta bilangan bulat. Mana yang benar?',
    'Kenapa "Semua A adalah B" tidak boleh ditulis `∀x (A(x) ∧ B(x))`? Berikan contoh yang menunjukkan kekeliruannya.',
    'Buktikan dengan Python bahwa `not all(...)` selalu sama hasilnya dengan `any(not ...)` untuk sebuah daftar. Aturan apa yang kamu buktikan?',
    'Pada semesta kosong, tentukan nilai `∀x P(x)` dan `∃x P(x)`. Buktikan jawabanmu dengan `all([])` dan `any([])` di Python.',
    'Terjemahkan pernyataan matematika ini ke bahasa Indonesia: `∀x ∃y (y > x ∧ prima(y))`, dengan semesta bilangan asli. Apakah pernyataannya benar?',
    'Uji pemahaman: jelaskan ulang dalam 3 menit dengan kata-katamu sendiri kenapa lawan dari "semua mahasiswa lulus" adalah "ada yang tidak lulus", bukan "semua tidak lulus".'
  ]
});

TOPICS.push({
  id: 'himpunan',
  judul: 'Himpunan',
  kategori: 'logika',
  tag: ['himpunan', 'irisan', 'gabungan', 'komplemen', 'selisih', 'venn', 'kartesian'],
  ringkas: 'Kumpulan objek yang terdefinisi jelas, beserta enam operasinya — dan kaitannya yang rapi dengan logika.',

  fungsi: `**Menggabungkan, memotong, dan mengurangkan kumpulan data — dengan cara yang tidak mungkin salah hitung.**

Operasi himpunan terpakai langsung di:

- **SQL** — \`UNION\`, \`INTERSECT\`, \`EXCEPT\` adalah operasi himpunan; \`JOIN\` juga bisa dipahami begitu
- **Membandingkan dua daftar** — mahasiswa yang mengambil A tetapi tidak B, berkas yang ada di sini tetapi hilang di sana
- **Menghapus duplikat** — \`set()\` di Python menyelesaikannya dalam satu langkah
- **Memeriksa hak akses** — apakah peran pengguna memuat izin yang dibutuhkan
- **Data Mining** — perhitungan *support* pada Apriori adalah irisan himpunan transaksi
- **Git** — melihat berkas apa yang berubah antara dua cabang

Keunggulan praktisnya besar: mencari selisih dua daftar dengan perulangan bersarang butuh \`O(n²)\` dan mudah salah; dengan himpunan ia satu baris dan \`O(n)\`.`,

  praktik: {
    tujuan: `Kamu bisa menyelesaikan soal "bandingkan dua daftar" dengan operasi himpunan, di Python maupun SQL, dan tahu kapan tidak boleh memakainya.`,
    alat: [
      'Python 3',
      'Akses ke basis data (MySQL, PostgreSQL, atau SQLite)'
    ],
    langkah: [
      { judul: 'Ubah daftarmu jadi himpunan',
        isi: `Di Python: \`set(daftar)\`.

Perhatikan dua hal yang langsung berubah:

- **duplikat hilang** — itu memang gunanya, tetapi pastikan kamu memang tidak membutuhkannya
- **urutan hilang** — himpunan tidak punya urutan sama sekali

Kalau kamu butuh urutan atau duplikat, himpunan bukan alatnya.` },
      { judul: 'Pakai keempat operasi pokoknya',
        isi: `- \`a | b\` — **gabungan**: ada di salah satu
- \`a & b\` — **irisan**: ada di keduanya
- \`a - b\` — **selisih**: ada di a, tidak ada di b
- \`a ^ b\` — **beda simetris**: ada di salah satu tapi tidak keduanya

Yang paling sering dipakai sehari-hari adalah **selisih**, untuk menjawab *"apa yang hilang?"*` },
      { judul: 'Kerjakan satu kasus nyata',
        isi: `Ambil dua daftar sungguhan — misalnya NIM peserta kelas A dan peserta kelas B — lalu jawab:

- siapa yang ikut **keduanya**? → \`a & b\`
- siapa yang **hanya** kelas A? → \`a - b\`
- berapa **total orang berbeda**? → \`len(a | b)\`

Bandingkan hasilnya dengan hitungan manual pada data kecil sebelum memercayainya pada data besar.` },
      { judul: 'Terjemahkan ke SQL',
        isi: `- gabungan → \`UNION\` (menghapus duplikat) atau \`UNION ALL\` (mempertahankannya)
- irisan → \`INTERSECT\`, atau \`INNER JOIN\` kalau basis datamu tidak mendukungnya
- selisih → \`EXCEPT\`, atau \`LEFT JOIN ... WHERE kanan IS NULL\`

MySQL lama tidak punya \`INTERSECT\` dan \`EXCEPT\`, jadi bentuk \`JOIN\`-nya perlu diketahui.` },
      { judul: 'Periksa hukum De Morgan versi himpunan',
        isi: `Hukum yang sama dari topik ekuivalensi berlaku di sini:

- komplemen dari \`A ∪ B\` sama dengan komplemen A **irisan** komplemen B
- komplemen dari \`A ∩ B\` sama dengan komplemen A **gabungan** komplemen B

Buktikan sendiri di Python dengan semesta yang kamu tentukan. Melihatnya berlaku di dua tempat berbeda membuat hukumnya jauh lebih melekat.` },
      { judul: 'Ukur bedanya dengan perulangan bersarang',
        isi: `Buat dua daftar berisi 20.000 angka, lalu cari selisihnya dengan dua cara: perulangan bersarang, dan operasi himpunan.

Ukur waktunya dengan \`time.perf_counter()\`. Selisihnya akan **sangat besar** — dan itu penjelasan paling meyakinkan tentang kenapa himpunan layak dipelajari.` }
    ],
    cek: [
      'Hasil `a - b` di Python sama dengan hasil `EXCEPT` di SQL untuk data yang sama',
      '`len(a | b)` sama dengan `len(a) + len(b) - len(a & b)` — ini prinsip inklusi-eksklusi',
      `Versi himpunan jauh lebih cepat daripada perulangan bersarang pada 20.000 data, dan hasilnya identik`
    ]
  },
  judulLogicSyntax: 'Bedah Notasi — kenapa ditulis begitu',

  konsep: `
**Himpunan** adalah kumpulan objek berbeda yang **terdefinisi dengan jelas** dan dipandang sebagai satu kesatuan. Objek di dalamnya disebut **anggota** atau **elemen**.

Kata "terdefinisi dengan jelas" itu syarat penting: harus ada cara pasti menentukan sesuatu masuk atau tidak. "Himpunan bilangan genap" jelas; "himpunan orang tinggi" tidak jelas karena batas "tinggi" tidak pasti.

Ada dua cara menuliskannya:

- **Mendaftar** — \`A = {1, 2, 3, 4, 5}\`
- **Menyebut sifat** — \`A = {x | x bilangan asli, x ≤ 5}\`, dibaca "himpunan semua x sedemikian sehingga..."

Notasi dasar yang perlu kamu kuasai:

- **∈** — anggota. \`3 ∈ A\` berarti 3 anggota A
- **∉** — bukan anggota
- **∅** atau **{}** — himpunan kosong, tidak punya anggota sama sekali
- **⊆** — himpunan bagian. \`A ⊆ B\` berarti semua anggota A juga anggota B
- **|A|** — kardinalitas, yaitu banyaknya anggota
- **S** — himpunan semesta, memuat semua objek yang dibicarakan

Ada **enam operasi** yang perlu kamu kuasai:

- **Irisan (∩)** — anggota yang ada di **kedua**-duanya
- **Gabungan (∪)** — anggota yang ada di **salah satu atau keduanya**
- **Komplemen (Aᶜ atau A')** — anggota semesta yang **bukan** anggota A
- **Selisih (A − B)** — anggota A yang **bukan** anggota B
- **Beda setangkup (A ⊕ B)** — anggota yang ada di salah satu **tetapi tidak keduanya**
- **Perkalian kartesian (A × B)** — semua pasangan terurut \`(a, b)\`

Yang membuat topik ini menyatu dengan seluruh mata kuliah: **operasi himpunan adalah operator logika yang berpakaian lain.**

- **∩ bersesuaian dengan ∧** — anggota irisan harus memenuhi keduanya
- **∪ bersesuaian dengan ∨** — anggota gabungan memenuhi salah satu
- **komplemen bersesuaian dengan ¬** — bukan anggota
- **⊕ bersesuaian dengan XOR** — salah satu tapi tidak keduanya

Karena itu semua hukum logika punya pasangannya di himpunan, termasuk **De Morgan**: \`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ\`.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: 'A ∩ B     # IRISAN: anggota yang ada di KEDUANYA\n\n# A = {Blouse, Dress, Hoodie, Jeans, ...}   (Pakaian)\n# C = {Backpack, Belt, Gloves, Hat, ...}    (Aksesoris)\n#\n# A ∩ C = ∅    -> tidak ada anggota yang sama',
      penjelasan: `
**Irisan** hanya memuat anggota yang ada di **kedua** himpunan sekaligus. Bersesuaian dengan konjungsi: \`x ∈ A ∩ B\` tepat ketika \`x ∈ A ∧ x ∈ B\`.

Contoh di atas diambil dari kasus Pakaian dan Aksesoris. Karena tidak ada satu pun benda yang termasuk keduanya, hasilnya **himpunan kosong** — ditulis \`∅\`, bukan \`{∅}\` atau \`0\`.

Dua himpunan yang irisannya kosong disebut **saling lepas** (*disjoint*). Ini keadaan yang wajar, bukan tanda ada yang salah.

Perhatikan penulisan himpunan kosong, karena sering keliru:

- **∅** atau **{}** → benar, himpunan tanpa anggota
- **{∅}** → **salah** untuk maksud ini. Ini himpunan yang **berisi satu anggota**, yaitu himpunan kosong. Kardinalitasnya 1, bukan 0

Beberapa sifat irisan yang perlu diketahui:

- \`A ∩ A = A\` (idempoten)
- \`A ∩ ∅ = ∅\` (apa pun beririsan dengan kosong menghasilkan kosong)
- \`A ∩ S = A\` (beririsan dengan semesta menghasilkan dirinya)
- \`A ∩ B = B ∩ A\` (komutatif)

Bandingkan dengan hukum logika yang sudah kamu pelajari — polanya sama persis dengan ∧.
`
    },
    {
      bahasa: 'python',
      kode: 'A ∪ B     # GABUNGAN: anggota di salah satu ATAU keduanya\n\n# A = {Backpack, Belt, Gloves, Handbag, Hat, ...}\n# C = {Blouse, Dress, Hoodie, Jeans, Pants, ...}\n#\n# A ∪ C = semua anggota keduanya, TANPA pengulangan',
      penjelasan: `
**Gabungan** memuat semua anggota dari kedua himpunan. Bersesuaian dengan disjungsi: \`x ∈ A ∪ B\` tepat ketika \`x ∈ A ∨ x ∈ B\`.

Sama seperti disjungsi, gabungan bersifat **inklusif** — anggota yang ada di kedua himpunan tetap masuk, tetapi **hanya ditulis sekali**.

Aturan "tanpa pengulangan" ini penting: himpunan **tidak mengenal duplikat**. Menulis \`{1, 2, 2, 3}\` sama saja dengan \`{1, 2, 3}\`, dan kardinalitasnya 3, bukan 4.

Himpunan juga **tidak mengenal urutan**. \`{1, 2, 3}\` dan \`{3, 1, 2}\` adalah himpunan yang sama persis. Ini berbeda dari **list** di pemrograman yang urutannya bermakna dan boleh berisi duplikat.

Untuk menghitung kardinalitas gabungan, ada rumus yang sering diujikan — **prinsip inklusi-eksklusi**:

\`|A ∪ B| = |A| + |B| − |A ∩ B|\`

Kenapa harus dikurangi? Karena anggota yang ada di kedua himpunan **terhitung dua kali** saat \`|A|\` dan \`|B|\` dijumlahkan. Mengurangi irisannya membetulkan perhitungan itu.

Untuk tiga himpunan rumusnya memanjang, tetapi polanya sama: tambah yang tunggal, kurangi yang berpasangan, tambah lagi yang bertiga.
`
    },
    {
      bahasa: 'python',
      kode: "Aᶜ        # KOMPLEMEN: anggota SEMESTA yang bukan anggota A\nA − B     # SELISIH: anggota A yang bukan anggota B\n\n# Perhatikan: A − B  =  A ∩ Bᶜ\n# Selisih itu sebenarnya irisan dengan komplemen.",
      penjelasan: `
**Komplemen** menuntut adanya **himpunan semesta**. Tanpa semesta, "bukan anggota A" tidak punya batas — bisa berarti apa saja di dunia. Karena itu semesta wajib disebutkan.

Ini sejajar dengan **semesta pembicaraan** pada kuantor yang baru kamu pelajari. Keduanya menjawab kebutuhan yang sama: membatasi apa saja yang sedang dibicarakan.

**Selisih** \`A − B\` memuat anggota A yang bukan anggota B. Kadang ditulis \`A \\ B\`.

Hubungan yang perlu diingat: **selisih sebenarnya irisan dengan komplemen**, yaitu \`A − B = A ∩ Bᶜ\`. Ini berguna saat menyederhanakan ekspresi himpunan.

Perhatikan bahwa selisih **tidak komutatif**:

- \`A − B\` memuat anggota A yang tidak di B
- \`B − A\` memuat anggota B yang tidak di A
- Keduanya **berbeda**, kecuali A dan B sama

Ini berbeda dari irisan dan gabungan yang keduanya komutatif. Kesalahan menukar urutan selisih sering terjadi karena terbawa kebiasaan dari dua operasi sebelumnya.

Beberapa sifat komplemen:

- \`(Aᶜ)ᶜ = A\` — sejajar dengan negasi ganda
- \`A ∪ Aᶜ = S\` — sejajar dengan \`p ∨ ¬p ≡ T\`
- \`A ∩ Aᶜ = ∅\` — sejajar dengan \`p ∧ ¬p ≡ F\`
`
    },
    {
      bahasa: 'python',
      kode: 'A ⊕ B     # BEDA SETANGKUP: di salah satu, TAPI TIDAK keduanya\n\n# A ⊕ B = (A ∪ B) − (A ∩ B)\n#       = (A − B) ∪ (B − A)\n#\n# Inilah padanan XOR pada logika.',
      penjelasan: `
**Beda setangkup** (*symmetric difference*) memuat anggota yang ada di salah satu himpunan **tetapi tidak di keduanya**. Inilah "atau" yang **eksklusif** — yang di topik Proposisi sempat disebut sebagai XOR.

Ada dua cara menghitungnya, dan keduanya menghasilkan hal yang sama:

- **Gabungan dikurangi irisan** — \`(A ∪ B) − (A ∩ B)\`. Ambil semuanya, buang yang dimiliki bersama
- **Gabungan dari dua selisih** — \`(A − B) ∪ (B − A)\`. Ambil yang khas A, gabungkan dengan yang khas B

Cara pertama biasanya lebih cepat dihitung; cara kedua lebih mudah dibayangkan pada diagram Venn.

Namanya "setangkup" karena bersifat **simetris**: \`A ⊕ B = B ⊕ A\`. Berbeda dari selisih biasa yang urutannya berpengaruh.

Sifat menariknya yang kadang diujikan:

- \`A ⊕ A = ∅\` — semua anggota dimiliki bersama, jadi tidak ada yang tersisa
- \`A ⊕ ∅ = A\`
- \`(A ⊕ B) ⊕ B = A\` — menerapkannya dua kali mengembalikan yang asli

Sifat terakhir itu punya penerapan nyata di informatika: operasi XOR dipakai pada **enkripsi sederhana** dan **pendeteksian galat**, justru karena bisa dibalik dengan menerapkannya lagi.
`
    },
    {
      bahasa: 'python',
      kode: 'A × B     # PERKALIAN KARTESIAN: semua pasangan TERURUT (a, b)\n\n# A = {1, 2},  B = {x, y}\n# A × B = {(1,x), (1,y), (2,x), (2,y)}\n#\n# |A × B| = |A| × |B| = 2 × 2 = 4',
      penjelasan: `
**Perkalian kartesian** menghasilkan himpunan berisi semua **pasangan terurut**, dengan anggota pertama dari A dan anggota kedua dari B.

Kata **terurut** itu kunci: \`(1, x)\` **berbeda** dari \`(x, 1)\`. Karena itu perkalian kartesian **tidak komutatif** — \`A × B ≠ B × A\` kecuali A dan B sama.

Kardinalitasnya mudah dihitung: **\`|A × B| = |A| × |B|\`**. Kalau A punya 3 anggota dan B punya 4, hasilnya 12 pasangan.

Ini berbeda dari lima operasi sebelumnya yang hasilnya masih berisi jenis anggota yang sama. Perkalian kartesian menghasilkan **jenis objek baru**, yaitu pasangan.

Penerapannya sangat nyata di informatika:

- **Basis data** — tabel hasil operasi *join* pada dasarnya berasal dari perkalian kartesian dua tabel, lalu disaring
- **Koordinat** — bidang koordinat adalah \`ℝ × ℝ\`, yaitu semua pasangan (x, y)
- **Relasi** — sebuah relasi antara A dan B secara resmi didefinisikan sebagai **himpunan bagian** dari \`A × B\`

Poin terakhir menjadi jembatan ke materi **Relasi dan Fungsi** yang biasanya dibahas setelah himpunan, dan juga ke Basis Data di semester berikutnya.
`
    },
    {
      bahasa: 'python',
      kode: '# KAITAN DENGAN LOGIKA — inilah inti topik ini\n#\n#   x ∈ A ∩ B    <->    (x ∈ A) ∧ (x ∈ B)\n#   x ∈ A ∪ B    <->    (x ∈ A) ∨ (x ∈ B)\n#   x ∈ Aᶜ       <->   ¬(x ∈ A)\n#\n# De Morgan pun berlaku:  (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',
      penjelasan: `
Inilah bagian yang menyatukan seluruh mata kuliah: **operasi himpunan sebenarnya operator logika yang berpakaian lain.**

Perhatikan pasangannya:

- **∩ ↔ ∧** — anggota irisan harus memenuhi **keduanya**
- **∪ ↔ ∨** — anggota gabungan memenuhi **salah satu**
- **komplemen ↔ ¬** — **bukan** anggota
- **⊕ ↔ XOR** — salah satu **tapi tidak keduanya**
- **⊆ ↔ →** — \`A ⊆ B\` berarti \`∀x (x ∈ A → x ∈ B)\`

Akibatnya, **setiap hukum logika punya pasangannya di himpunan**:

- \`¬(p ∧ q) ≡ ¬p ∨ ¬q\` menjadi \`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ\`
- \`p ∧ (q ∨ r) ≡ (p∧q) ∨ (p∧r)\` menjadi \`A ∩ (B ∪ C) = (A∩B) ∪ (A∩C)\`
- \`p ∨ (p ∧ q) ≡ p\` menjadi \`A ∪ (A ∩ B) = A\`

Ini kabar baik untuk belajar: **kamu tidak perlu menghafal hukum himpunan secara terpisah.** Kalau sudah menguasai hukum logika, tinggal terjemahkan lambangnya.

Cara membuktikan kesamaan dua himpunan pun memakai jembatan ini. Untuk membuktikan \`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ\`, tunjukkan bahwa \`x ∈\` sisi kiri **jika dan hanya jika** \`x ∈\` sisi kanan — dan pembuktiannya menjadi soal logika biasa yang sudah kamu kuasai.
`
    }
  ],

  kode: {
    python: String.raw`# Python punya tipe set bawaan dengan operator yang mirip notasi matematika.

# Contoh dari tugas Pertemuan 10
pakaian   = {"Blouse", "Dress", "Hoodie", "Jeans", "Pants",
             "Shirt", "Shorts", "Skirt", "Socks", "Sweater", "T-shirt"}
aksesoris = {"Backpack", "Belt", "Gloves", "Handbag", "Hat",
             "Jewelry", "Scarf", "Sunglasses"}

print("=== IRISAN & GABUNGAN ===")
print(f"  |Pakaian|   = {len(pakaian)}")
print(f"  |Aksesoris| = {len(aksesoris)}")
print(f"\n  irisan   : {pakaian & aksesoris}  <- himpunan KOSONG")
print(f"  |irisan| = {len(pakaian & aksesoris)}")
print("  -> tidak ada benda yang termasuk keduanya (saling lepas)")

gabungan = pakaian | aksesoris
print(f"\n  |gabungan| = {len(gabungan)}")
print(f"  |A| + |C| - |A ∩ C| = {len(pakaian)} + {len(aksesoris)} - "
      f"{len(pakaian & aksesoris)} = {len(pakaian) + len(aksesoris) - len(pakaian & aksesoris)}")
print("  -> cocok dengan prinsip inklusi-eksklusi")


# ---------- ENAM OPERASI dengan contoh yang beririsan ----------
S = set(range(1, 11))          # semesta {1..10}
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7}

print("\n=== ENAM OPERASI ===")
print(f"  S = {sorted(S)}")
print(f"  A = {sorted(A)}")
print(f"  B = {sorted(B)}\n")

print(f"  irisan      A ∩ B  = {sorted(A & B)}")
print(f"  gabungan    A ∪ B  = {sorted(A | B)}")
print(f"  komplemen   Aᶜ     = {sorted(S - A)}")
print(f"  selisih     A − B  = {sorted(A - B)}")
print(f"  selisih     B − A  = {sorted(B - A)}   <- BEDA, tidak komutatif")
print(f"  beda stkp   A ⊕ B  = {sorted(A ^ B)}")

# Beda setangkup lewat dua rumus
cara1 = (A | B) - (A & B)
cara2 = (A - B) | (B - A)
print(f"\n  (A∪B) − (A∩B)      = {sorted(cara1)}")
print(f"  (A−B) ∪ (B−A)      = {sorted(cara2)}")
print(f"  sama dengan A ⊕ B ? {cara1 == cara2 == (A ^ B)}")


# ---------- KARDINALITAS & INKLUSI-EKSKLUSI ----------
print("\n=== PRINSIP INKLUSI-EKSKLUSI ===")
print(f"  |A| = {len(A)}, |B| = {len(B)}, |A ∩ B| = {len(A & B)}")
print(f"  |A ∪ B| sebenarnya      = {len(A | B)}")
print(f"  |A| + |B|               = {len(A) + len(B)}  <- terhitung dua kali")
print(f"  |A| + |B| − |A ∩ B|     = {len(A) + len(B) - len(A & B)}  <- benar")


# ---------- HIMPUNAN BAGIAN ----------
print("\n=== HIMPUNAN BAGIAN ===")
C = {1, 2, 3}
print(f"  C = {sorted(C)}")
print(f"  C ⊆ A ? {C <= A}")
print(f"  A ⊆ C ? {A <= C}")
print(f"  ∅ ⊆ A ? {set() <= A}   <- himpunan kosong SELALU bagian dari apa pun")
print(f"  A ⊆ A ? {A <= A}   <- setiap himpunan bagian dari dirinya")

# Himpunan kuasa: semua himpunan bagian
from itertools import combinations
D = {1, 2, 3}
kuasa = [set(k) for n in range(len(D) + 1) for k in combinations(D, n)]
print(f"\n  himpunan kuasa dari {sorted(D)}:")
print(f"    {[sorted(k) for k in kuasa]}")
print(f"    banyaknya = 2^{len(D)} = {2 ** len(D)}")


# ---------- PERKALIAN KARTESIAN ----------
from itertools import product

print("\n=== PERKALIAN KARTESIAN ===")
X = {1, 2}
Y = {"x", "y"}
kartesian = list(product(sorted(X), sorted(Y)))
print(f"  X = {sorted(X)}, Y = {sorted(Y)}")
print(f"  X × Y = {kartesian}")
print(f"  |X × Y| = |X| × |Y| = {len(X)} × {len(Y)} = {len(kartesian)}")

balik = list(product(sorted(Y), sorted(X)))
print(f"\n  Y × X = {balik}")
print("  -> BERBEDA dari X × Y, karena pasangannya TERURUT")


# ---------- DE MORGAN untuk himpunan ----------
print("\n=== DE MORGAN ===")
kiri1  = S - (A & B)            # (A ∩ B)ᶜ
kanan1 = (S - A) | (S - B)      # Aᶜ ∪ Bᶜ
kiri2  = S - (A | B)            # (A ∪ B)ᶜ
kanan2 = (S - A) & (S - B)      # Aᶜ ∩ Bᶜ

print(f"  (A ∩ B)ᶜ = {sorted(kiri1)}")
print(f"  Aᶜ ∪ Bᶜ  = {sorted(kanan1)}")
print(f"  sama? {kiri1 == kanan1}\n")
print(f"  (A ∪ B)ᶜ = {sorted(kiri2)}")
print(f"  Aᶜ ∩ Bᶜ  = {sorted(kanan2)}")
print(f"  sama? {kiri2 == kanan2}")
print("\n  -> persis hukum De Morgan pada logika, cuma beda lambang")


# ---------- KAITAN DENGAN LOGIKA ----------
print("\n=== HIMPUNAN vs LOGIKA ===")
x = 4
print(f"  untuk x = {x}:")
print(f"    x ∈ A ∩ B  -> {x in (A & B)}")
print(f"    (x∈A) ∧ (x∈B) -> {(x in A) and (x in B)}   <- sama")
print(f"    x ∈ A ∪ B  -> {x in (A | B)}")
print(f"    (x∈A) ∨ (x∈B) -> {(x in A) or (x in B)}   <- sama")


# ---------- Himpunan tidak mengenal urutan & duplikat ----------
print("\n=== SIFAT DASAR HIMPUNAN ===")
print(f"  {{1,2,3}} == {{3,1,2}} ? {set([1,2,3]) == set([3,1,2])}   <- urutan tidak berarti")
print(f"  {{1,2,2,3}} -> {sorted(set([1,2,2,3]))}   <- duplikat dibuang")
print(f"  kardinalitasnya {len(set([1,2,2,3]))}, bukan 4")`,

    js: String.raw`// JavaScript punya Set, tetapi operasinya harus dibuat sendiri
// (di versi terbaru sudah ada .union(), .intersection(), dll)

const irisan   = function (a, b) { return new Set([...a].filter(x => b.has(x))); };
const gabungan = function (a, b) { return new Set([...a, ...b]); };
const selisih  = function (a, b) { return new Set([...a].filter(x => !b.has(x))); };
const bedaStkp = function (a, b) { return gabungan(selisih(a, b), selisih(b, a)); };
const urut     = function (s) { return [...s].sort(function (x, y) { return x - y; }); };

const S = new Set([1,2,3,4,5,6,7,8,9,10]);
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([4, 5, 6, 7]);

console.log("=== ENAM OPERASI ===");
console.log("  A =", urut(A));
console.log("  B =", urut(B), "\n");

console.log("  irisan     A ∩ B =", urut(irisan(A, B)));
console.log("  gabungan   A ∪ B =", urut(gabungan(A, B)));
console.log("  komplemen  Aᶜ    =", urut(selisih(S, A)));
console.log("  selisih    A − B =", urut(selisih(A, B)));
console.log("  selisih    B − A =", urut(selisih(B, A)), "  <- BEDA");
console.log("  beda stkp  A ⊕ B =", urut(bedaStkp(A, B)));

// Inklusi-eksklusi
console.log("\n=== PRINSIP INKLUSI-EKSKLUSI ===");
console.log("  |A ∪ B| sebenarnya  =", gabungan(A, B).size);
console.log("  |A| + |B|           =", A.size + B.size, " <- terhitung dua kali");
console.log("  |A| + |B| − |A ∩ B| =", A.size + B.size - irisan(A, B).size);

// Himpunan bagian
const bagian = function (a, b) { return [...a].every(x => b.has(x)); };
console.log("\n=== HIMPUNAN BAGIAN ===");
console.log("  {1,2,3} ⊆ A ?", bagian(new Set([1,2,3]), A));
console.log("  ∅ ⊆ A ?", bagian(new Set(), A), "  <- selalu benar");

// Perkalian kartesian
console.log("\n=== PERKALIAN KARTESIAN ===");
const X = [1, 2], Y = ["x", "y"];
const kartesian = [];
for (const a of X) for (const b of Y) kartesian.push([a, b]);
console.log("  X × Y =", JSON.stringify(kartesian));
console.log("  |X × Y| =", X.length * Y.length);

// De Morgan
console.log("\n=== DE MORGAN ===");
const kiri  = selisih(S, irisan(A, B));           // (A ∩ B)ᶜ
const kanan = gabungan(selisih(S, A), selisih(S, B)); // Aᶜ ∪ Bᶜ
console.log("  (A ∩ B)ᶜ =", urut(kiri));
console.log("  Aᶜ ∪ Bᶜ  =", urut(kanan));
console.log("  sama?", JSON.stringify(urut(kiri)) === JSON.stringify(urut(kanan)));

// Set membuang duplikat
console.log("\n=== SIFAT DASAR ===");
console.log("  new Set([1,2,2,3]) ->", [...new Set([1,2,2,3])]);
console.log("  duplikat otomatis dibuang, urutan tidak berarti");`,

    cpp: String.raw`#include <iostream>
#include <set>
#include <algorithm>
#include <iterator>
#include <vector>
using namespace std;

void cetak(const string& label, const set<int>& s) {
    cout << "  " << label << " = { ";
    for (int x : s) cout << x << " ";
    cout << "}" << endl;
}

int main() {
    set<int> S = {1,2,3,4,5,6,7,8,9,10};
    set<int> A = {1, 2, 3, 4, 5};
    set<int> B = {4, 5, 6, 7};

    cout << "=== ENAM OPERASI ===" << endl;
    cetak("A", A);
    cetak("B", B);
    cout << endl;

    set<int> hasil;

    // Irisan
    set_intersection(A.begin(), A.end(), B.begin(), B.end(),
                     inserter(hasil, hasil.begin()));
    cetak("A n B ", hasil);

    // Gabungan
    hasil.clear();
    set_union(A.begin(), A.end(), B.begin(), B.end(),
              inserter(hasil, hasil.begin()));
    cetak("A u B ", hasil);

    // Komplemen = S - A
    hasil.clear();
    set_difference(S.begin(), S.end(), A.begin(), A.end(),
                   inserter(hasil, hasil.begin()));
    cetak("A^c   ", hasil);

    // Selisih A - B
    hasil.clear();
    set_difference(A.begin(), A.end(), B.begin(), B.end(),
                   inserter(hasil, hasil.begin()));
    cetak("A - B ", hasil);

    // Selisih B - A  (BERBEDA)
    hasil.clear();
    set_difference(B.begin(), B.end(), A.begin(), A.end(),
                   inserter(hasil, hasil.begin()));
    cetak("B - A ", hasil);
    cout << "  -> selisih TIDAK komutatif" << endl;

    // Beda setangkup
    hasil.clear();
    set_symmetric_difference(A.begin(), A.end(), B.begin(), B.end(),
                             inserter(hasil, hasil.begin()));
    cetak("\n  A + B ", hasil);

    // Himpunan bagian
    set<int> C = {1, 2, 3};
    bool bagian = includes(A.begin(), A.end(), C.begin(), C.end());
    cout << "\n=== HIMPUNAN BAGIAN ===" << endl;
    cout << "  C subset A ? " << (bagian ? "ya" : "tidak") << endl;

    // Perkalian kartesian
    cout << "\n=== PERKALIAN KARTESIAN ===" << endl;
    vector<int> X = {1, 2};
    vector<char> Y = {'x', 'y'};
    cout << "  X x Y = { ";
    for (int a : X) for (char b : Y) cout << "(" << a << "," << b << ") ";
    cout << "}" << endl;
    cout << "  |X x Y| = " << X.size() * Y.size() << endl;

    // std::set otomatis membuang duplikat dan mengurutkan
    cout << "\n=== SIFAT std::set ===" << endl;
    set<int> uji = {3, 1, 2, 2, 1};
    cetak("dari {3,1,2,2,1}", uji);
    cout << "  -> duplikat dibuang, otomatis terurut" << endl;

    return 0;
}`,

    java: String.raw`import java.util.*;

public class Contoh {
    static void cetak(String label, Set<Integer> s) {
        System.out.println("  " + label + " = " + new TreeSet<>(s));
    }

    public static void main(String[] args) {
        Set<Integer> S = new HashSet<>(List.of(1,2,3,4,5,6,7,8,9,10));
        Set<Integer> A = new HashSet<>(List.of(1, 2, 3, 4, 5));
        Set<Integer> B = new HashSet<>(List.of(4, 5, 6, 7));

        System.out.println("=== ENAM OPERASI ===");
        cetak("A", A);
        cetak("B", B);
        System.out.println();

        // Irisan
        Set<Integer> irisan = new HashSet<>(A);
        irisan.retainAll(B);
        cetak("A ∩ B ", irisan);

        // Gabungan
        Set<Integer> gabungan = new HashSet<>(A);
        gabungan.addAll(B);
        cetak("A ∪ B ", gabungan);

        // Komplemen
        Set<Integer> komplemen = new HashSet<>(S);
        komplemen.removeAll(A);
        cetak("Aᶜ    ", komplemen);

        // Selisih
        Set<Integer> selisihAB = new HashSet<>(A);
        selisihAB.removeAll(B);
        cetak("A − B ", selisihAB);

        Set<Integer> selisihBA = new HashSet<>(B);
        selisihBA.removeAll(A);
        cetak("B − A ", selisihBA);
        System.out.println("  -> selisih TIDAK komutatif");

        // Beda setangkup = (A−B) ∪ (B−A)
        Set<Integer> beda = new HashSet<>(selisihAB);
        beda.addAll(selisihBA);
        cetak("\n  A ⊕ B ", beda);

        // Inklusi-eksklusi
        System.out.println("\n=== INKLUSI-EKSKLUSI ===");
        System.out.println("  |A ∪ B| sebenarnya  = " + gabungan.size());
        System.out.println("  |A| + |B|           = " + (A.size() + B.size()));
        System.out.println("  |A| + |B| − |A ∩ B| = " +
                           (A.size() + B.size() - irisan.size()));

        // Himpunan bagian
        System.out.println("\n=== HIMPUNAN BAGIAN ===");
        System.out.println("  {1,2,3} ⊆ A ? " + A.containsAll(List.of(1, 2, 3)));
        System.out.println("  ∅ ⊆ A ?       " + A.containsAll(new HashSet<>()));

        // De Morgan
        System.out.println("\n=== DE MORGAN ===");
        Set<Integer> kiri = new HashSet<>(S);
        kiri.removeAll(irisan);                       // (A ∩ B)ᶜ

        Set<Integer> kompA = new HashSet<>(S); kompA.removeAll(A);
        Set<Integer> kompB = new HashSet<>(S); kompB.removeAll(B);
        Set<Integer> kanan = new HashSet<>(kompA);
        kanan.addAll(kompB);                          // Aᶜ ∪ Bᶜ

        cetak("(A ∩ B)ᶜ", kiri);
        cetak("Aᶜ ∪ Bᶜ ", kanan);
        System.out.println("  sama? " + kiri.equals(kanan));
    }
}`
  },

  output: `=== IRISAN & GABUNGAN ===
  |Pakaian|   = 11
  |Aksesoris| = 8

  irisan   : set()  <- himpunan KOSONG
  |irisan| = 0
  -> tidak ada benda yang termasuk keduanya (saling lepas)

  |gabungan| = 19
  |A| + |C| - |A ∩ C| = 11 + 8 - 0 = 19
  -> cocok dengan prinsip inklusi-eksklusi

=== ENAM OPERASI ===
  irisan      A ∩ B  = [4, 5]
  gabungan    A ∪ B  = [1, 2, 3, 4, 5, 6, 7]
  komplemen   Aᶜ     = [6, 7, 8, 9, 10]
  selisih     A − B  = [1, 2, 3]
  selisih     B − A  = [6, 7]   <- BEDA, tidak komutatif
  beda stkp   A ⊕ B  = [1, 2, 3, 6, 7]

=== PRINSIP INKLUSI-EKSKLUSI ===
  |A ∪ B| sebenarnya      = 7
  |A| + |B|               = 9  <- terhitung dua kali
  |A| + |B| − |A ∩ B|     = 7  <- benar

=== DE MORGAN ===
  (A ∩ B)ᶜ = [1, 2, 3, 6, 7, 8, 9, 10]
  Aᶜ ∪ Bᶜ  = [1, 2, 3, 6, 7, 8, 9, 10]
  sama? True`,

  kesalahanUmum: [
    {
      salah: 'Menulis himpunan kosong sebagai `{∅}`.',
      kenapa: '`{∅}` adalah himpunan yang **berisi satu anggota**, yaitu himpunan kosong — kardinalitasnya 1. Sedangkan himpunan kosong sendiri ditulis `∅` atau `{}` dan kardinalitasnya 0. Keduanya berbeda, dan soal sering menguji ini.',
      benar: 'Tulis `∅` atau `{}` untuk himpunan kosong. Ingat: `|∅| = 0` tetapi `|{∅}| = 1`.'
    },
    {
      salah: 'Mengira selisih bersifat komutatif, sehingga `A − B` disamakan dengan `B − A`.',
      kenapa: 'Irisan dan gabungan memang komutatif, sehingga kebiasaan itu terbawa. Padahal `A − B` memuat anggota A yang bukan di B, sedangkan `B − A` memuat anggota B yang bukan di A — hasilnya berbeda kecuali A dan B sama.',
      benar: 'Ingat bahwa **hanya ∩, ∪, dan ⊕ yang komutatif**. Selisih dan perkalian kartesian tidak. Kalau ragu, hitung keduanya dengan contoh kecil.'
    },
    {
      salah: 'Menghitung `|A ∪ B|` sebagai `|A| + |B|` saja.',
      kenapa: 'Anggota yang ada di kedua himpunan **terhitung dua kali**. Untuk A dengan 5 anggota dan B dengan 4 anggota yang beririsan 2, hasilnya bukan 9 melainkan 7.',
      benar: 'Pakai prinsip inklusi-eksklusi: **`|A ∪ B| = |A| + |B| − |A ∩ B|`**. Kurangi irisannya untuk membetulkan hitungan ganda.'
    },
    {
      salah: 'Memakai komplemen tanpa menyebutkan himpunan semestanya.',
      kenapa: '"Bukan anggota A" tidak punya arti pasti tanpa batas. Kalau semestanya bilangan asli 1–10, komplemen `{1,2}` adalah `{3,...,10}`. Kalau semestanya seluruh bilangan bulat, hasilnya tak terhingga.',
      benar: 'Selalu tetapkan semesta lebih dulu. Ini sejajar dengan **semesta pembicaraan** pada kuantor — keduanya menjawab kebutuhan yang sama.'
    },
    {
      salah: 'Mengira `A × B` sama dengan `B × A`.',
      kenapa: 'Perkalian kartesian menghasilkan pasangan **terurut**, dan `(1, x)` berbeda dari `(x, 1)`. Karena itu kedua hasilnya berbeda, meski kardinalitasnya sama.',
      benar: 'Ingat kata **terurut**. `A × B ≠ B × A` kecuali A dan B sama. Yang sama hanyalah banyaknya anggota: `|A × B| = |B × A| = |A| × |B|`.'
    },
    {
      salah: 'Menganggap `{1, 2, 2, 3}` punya empat anggota.',
      kenapa: 'Himpunan **tidak mengenal duplikat**. Anggota yang sama hanya dihitung sekali, sehingga kardinalitasnya 3. Kebiasaan ini terbawa dari list di pemrograman yang membolehkan duplikat.',
      benar: 'Ingat dua sifat dasar himpunan: **tidak mengenal duplikat** dan **tidak mengenal urutan**. Karena itu `{1,2,3}` dan `{3,1,2}` adalah himpunan yang sama.'
    }
  ],

  analogi: `
Bayangkan dua himpunan sebagai **dua kelompok anggota organisasi**, lalu terjemahkan tiap operasi menjadi pertanyaan sehari-hari:

- **Irisan** — *"siapa yang ikut kedua organisasi?"*
- **Gabungan** — *"siapa saja yang ikut organisasi, minimal satu?"*
- **Selisih A − B** — *"siapa yang ikut A tapi tidak ikut B?"*
- **Beda setangkup** — *"siapa yang cuma ikut satu, tidak dua-duanya?"*
- **Komplemen** — *"siapa mahasiswa yang tidak ikut A sama sekali?"*

Untuk **kenapa selisih tidak komutatif**, pertanyaannya langsung terasa berbeda: *"siapa yang ikut A tapi tidak B"* jelas bukan pertanyaan yang sama dengan *"siapa yang ikut B tapi tidak A"*.

Untuk **inklusi-eksklusi**, pakai kasus pendataan. Kamu mendata 5 anggota klub musik dan 4 anggota klub tari, lalu menyimpulkan ada 9 orang. Tetapi ternyata 2 orang ikut keduanya — mereka **terhitung dua kali**. Jadi yang benar 9 − 2 = 7 orang. Rumusnya tidak perlu dihafal kalau kamu paham bahwa ia sekadar membetulkan hitungan ganda.

Untuk **kaitan dengan logika** — bagian terpenting topik ini — ingat satu kalimat: **himpunan adalah logika yang digambar.** Diagram Venn sebenarnya tabel kebenaran yang diberi bentuk.

- Wilayah tumpang tindih = ∧
- Seluruh wilayah kedua lingkaran = ∨
- Wilayah di luar lingkaran = ¬

Kalau kamu sudah menguasai hukum logika, **kamu tidak perlu menghafal hukum himpunan sama sekali** — cukup terjemahkan lambangnya. \`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ\` adalah De Morgan yang sama, hanya berganti pakaian.

Cara belajar yang paling efektif untuk topik ini: **gambar diagram Venn-nya dulu, baru tulis notasinya.** Arsir wilayah yang dimaksud, lalu terjemahkan ke lambang. Hampir semua kesalahan operasi himpunan hilang begitu kamu terbiasa menggambar lebih dulu.

Dan karena Python punya tipe \`set\` bawaan dengan operator yang mirip notasi matematika, kamu bisa **memeriksa jawabanmu sendiri** dalam hitungan detik — cara tercepat belajar dari kesalahan tanpa menunggu dikoreksi.
`,

  latihan: [
    'Diberikan `S = {1,...,10}`, `A = {1,2,3,4,5}`, `B = {4,5,6,7}`. Hitung: `A ∩ B`, `A ∪ B`, `Aᶜ`, `A − B`, `B − A`, dan `A ⊕ B`.',
    'Buktikan `|A ∪ B| = |A| + |B| − |A ∩ B|` memakai himpunan pada soal nomor 1. Kenapa irisannya harus dikurangi?',
    'Gambar diagram Venn untuk `A ⊕ B`, lalu tunjukkan bahwa hasilnya sama dengan `(A ∪ B) − (A ∩ B)` maupun `(A − B) ∪ (B − A)`.',
    'Buktikan hukum De Morgan `(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ` dengan dua cara: memakai diagram Venn, dan memakai definisi keanggotaan berbasis logika.',
    'Tentukan kardinalitas: (a) `|∅|`, (b) `|{∅}|`, (c) `|{1, 2, 2, 3, 3, 3}|`, (d) `|A × B|` bila `|A| = 3` dan `|B| = 4`.',
    'Diberikan `X = {a, b}` dan `Y = {1, 2, 3}`. Tuliskan `X × Y` dan `Y × X` selengkapnya. Kenapa keduanya berbeda?',
    'Tuliskan semua himpunan bagian dari `{p, q, r}`. Berapa banyaknya, dan kenapa jumlahnya `2ⁿ`?',
    'Terjemahkan tiap operasi himpunan ke operator logika yang sesuai, lalu tuliskan hukum logika pasangannya untuk `A ∩ (B ∪ C) = (A∩B) ∪ (A∩C)`.',
    'Kerjakan soal nomor 1 secara manual, lalu periksa jawabanmu dengan tipe `set` di Python. Kalau berbeda, telusuri operasi mana yang keliru.',
    'Uji pemahaman: jelaskan ulang dalam 4 menit dengan kata-katamu sendiri kenapa `|A ∪ B|` tidak sama dengan `|A| + |B|`, memakai contoh pendataan anggota organisasi.'
  ]
});
