/* Membaca teks dari .pdf tanpa alat luar.
   Dipakai karena pandoc & poppler (pdftotext/pdftoppm) tidak terpasang
   di komputer ini.

   Cara pakai:  node tools/baca-pdf.js "path/ke/berkas.pdf"

   Cara kerjanya: cari objek stream, kembangkan yang ber-FlateDecode pakai
   zlib bawaan Node, lalu ambil operator penampil teks (Tj, TJ).

   BATASAN — baca hasilnya dengan skeptis:
   - PDF hasil scan (gambar tanpa lapisan teks) akan keluar kosong; itu
     berarti butuh OCR, bukan skrip ini.
   - Rumus matematika, subscript, dan tabel sering berantakan urutannya
     karena PDF menyimpan posisi, bukan alur bacaan.
   - Font dengan encoding khusus bisa memunculkan karakter aneh.
   Untuk memastikan isi yang penting, tetap buka PDF-nya sendiri. */
const fs = require('fs');
const zlib = require('zlib');

const berkas = process.argv[2];
if (!berkas) {
  console.error('Pemakaian: node tools/baca-pdf.js <berkas.pdf>');
  process.exit(1);
}

const buf = fs.readFileSync(berkas);

/* Kumpulkan setiap pasangan "stream ... endstream" sebagai data mentah. */
const potongan = [];
let pos = 0;
while (true) {
  const mulai = buf.indexOf('stream', pos);
  if (mulai === -1) break;

  /* Pastikan ini kata "stream" utuh, bukan ekor "endstream". */
  const sebelum = buf.slice(Math.max(0, mulai - 3), mulai).toString('latin1');
  if (sebelum.endsWith('end')) { pos = mulai + 6; continue; }

  /* Lewati EOL sesudah kata "stream". */
  let d = mulai + 6;
  if (buf[d] === 0x0d) d++;
  if (buf[d] === 0x0a) d++;

  const habis = buf.indexOf('endstream', d);
  if (habis === -1) break;

  potongan.push(buf.slice(d, habis));
  pos = habis + 9;
}

/* Kembangkan yang terkompresi; yang gagal dilewati tanpa berisik. */
const isi = [];
potongan.forEach(function (p) {
  let teks = null;
  try {
    teks = zlib.inflateSync(p).toString('latin1');
  } catch (e) {
    try {
      teks = zlib.inflateRawSync(p).toString('latin1');
    } catch (e2) {
      const mentah = p.toString('latin1');
      /* Stream tak terkompresi tetap berguna kalau mengandung operator teks. */
      if (/\bTf\b|\bTj\b|\bTJ\b/.test(mentah)) teks = mentah;
    }
  }
  if (teks) isi.push(teks);
});

if (isi.length === 0) {
  console.error('Tidak ada stream yang bisa dibaca. Kemungkinan PDF terenkripsi.');
  process.exit(1);
}

/* Ubah escape di dalam literal string PDF: \( \) \\ \n \t dan oktal \053. */
function bukaEscape(s) {
  return s.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, function (_, k) {
    if (k === 'n') return '\n';
    if (k === 'r') return '\r';
    if (k === 't') return '\t';
    if (k === 'b' || k === 'f') return ' ';
    if (k === '(' || k === ')' || k === '\\') return k;
    return String.fromCharCode(parseInt(k, 8));
  });
}

/* Ambil isi satu literal ( ... ) mulai dari tanda buka, hormati kurung bersarang. */
function ambilLiteral(s, i) {
  let dalam = 1, keluar = '';
  i++;
  while (i < s.length && dalam > 0) {
    const c = s[i];
    if (c === '\\') { keluar += c + (s[i + 1] || ''); i += 2; continue; }
    if (c === '(') dalam++;
    else if (c === ')') { dalam--; if (dalam === 0) break; }
    keluar += c;
    i++;
  }
  return { teks: keluar, akhir: i };
}

/* Stream gambar yang sudah dikembangkan bisa berukuran megabyte dan kebetulan
   memuat "Tj". Menyisirnya karakter per karakter memakan menit-menitan tanpa
   hasil, jadi buang dulu yang jelas bukan aliran teks. */
function alirannyaTeks(s) {
  if (s.length > 4000000) return false;
  const contoh = s.slice(0, 2000);
  let cetak = 0;
  for (let i = 0; i < contoh.length; i++) {
    const k = contoh.charCodeAt(i);
    if (k === 9 || k === 10 || k === 13 || (k >= 32 && k <= 126)) cetak++;
  }
  return contoh.length === 0 || cetak / contoh.length > 0.85;
}

const baris = [];
isi.forEach(function (aliran) {
  if (!/\bTj\b|\bTJ\b/.test(aliran)) return;
  if (!alirannyaTeks(aliran)) return;

  let sekarang = '';
  let i = 0;

  const dorong = function () {
    const bersih = sekarang.replace(/[ \t]+/g, ' ').trim();
    if (bersih) baris.push(bersih);
    sekarang = '';
  };

  while (i < aliran.length) {
    const c = aliran[i];

    if (c === '(') {
      const hasil = ambilLiteral(aliran, i);
      sekarang += bukaEscape(hasil.teks);
      i = hasil.akhir + 1;
      continue;
    }

    /* String heksadesimal <48656C6C6F>. Buang byte 00 dari teks UTF-16BE. */
    if (c === '<' && aliran[i + 1] !== '<') {
      const tutup = aliran.indexOf('>', i);
      if (tutup !== -1 && tutup - i < 4096) {
        const heks = aliran.slice(i + 1, tutup).replace(/[^0-9A-Fa-f]/g, '');
        let t = '';
        for (let k = 0; k + 1 < heks.length; k += 2) {
          const kode = parseInt(heks.substr(k, 2), 16);
          if (kode !== 0) t += String.fromCharCode(kode);
        }
        sekarang += t;
        i = tutup + 1;
        continue;
      }
    }

    /* Td, TD, T-bintang, dan ET memindahkan kursor teks -> anggap ganti baris. */
    if (aliran.startsWith('Td', i) || aliran.startsWith('TD', i) ||
        aliran.startsWith('T*', i) || aliran.startsWith('ET', i)) {
      dorong();
      i += 2;
      continue;
    }

    i++;
  }
  dorong();
});

const hasil = baris.join('\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

console.log(hasil.length ? hasil : '(tidak ada lapisan teks — kemungkinan hasil scan, butuh OCR)');
