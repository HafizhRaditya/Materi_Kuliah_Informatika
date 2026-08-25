/* uji-render.js — menjalankan mesin render terhadap SELURUH konten.

   Bedanya dengan validasi.js: validasi.js memeriksa *struktur* data
   (field wajib, id unik, backtick berpasangan). Skrip ini melangkah
   lebih jauh dengan benar-benar memanggil fmt() dan hl() pada tiap
   blok, lalu memeriksa hasil HTML-nya.

   Yang ditangkapnya dan tidak tertangkap validasi.js:
   - pagar ``` gaya Markdown, yang tidak didukung fmt() dan menyisakan
     backtick mentah di halaman
   - penampung kode sebaris yang bocor sebagai <<0>>
   - tag atau span yang tidak berpasangan
   - bahasa di blok `kode` yang tidak terdaftar di URUTAN_BAHASA,
     sehingga tabnya tidak akan pernah muncul di situs

   Cara pakai:  node tools/uji-render.js

   Daftar berkas data dibaca dari index.html, jadi berkas baru otomatis
   ikut terperiksa. app.js sengaja dilewati karena ia butuh document. */
const fs = require('fs');
const path = require('path');

const akar = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(akar, 'index.html'), 'utf8');
const berkas = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);

let src = '';
for (const b of berkas) {
  if (b === 'js/app.js') continue;            // app.js butuh document
  src += fs.readFileSync(path.join(akar, b), 'utf8') + '\n;\n';
}
src += 'return { TOPICS, KATEGORI, GLOSARIUM, hl, fmt, LANGS, URUTAN_BAHASA };';

const { TOPICS, KATEGORI, GLOSARIUM, hl, fmt, LANGS, URUTAN_BAHASA } = new Function(src)();

let cekProsa = 0, cekKode = 0;
const masalah = [];

function prosa(nilai, dimana) {
  if (typeof nilai !== 'string' || !nilai.trim()) return;
  cekProsa++;
  let out;
  try { out = fmt(nilai); }
  catch (e) { masalah.push(dimana + ' -> fmt() melempar: ' + e.message); return; }
  if (/<<\d+>>/.test(out))    masalah.push(dimana + ' -> penampung kode sebaris bocor ke keluaran');
  if (out.includes('`'))      masalah.push(dimana + ' -> masih ada backtick mentah di hasil render');
  const buka = (out.match(/<(p|ul|li|strong|code|table|thead|tbody|tr|th|td)\b/g) || []).length;
  const tutup = (out.match(/<\/(p|ul|li|strong|code|table|thead|tbody|tr|th|td)>/g) || []).length;
  if (buka !== tutup)         masalah.push(dimana + ' -> tag tidak berpasangan (' + buka + ' buka, ' + tutup + ' tutup)');
  // Tabel bergaya markdown yang tidak terdeteksi tersisa sebagai deretan
  // pipa di dalam satu <p>. Penandanya baris pemisah |---|, bukan sekadar
  // pipa -- notasi kardinalitas seperti |A| x |B| juga memakai pipa.
  if (/\|\s*:?-{2,}:?\s*\|/.test(out))
    masalah.push(dimana + ' -> ada tabel markdown yang tidak terender (baris pemisah bocor)');
}

for (const t of TOPICS) {
  const id = t.id;
  if (!KATEGORI.some(k => k.id === t.kategori))
    masalah.push(id + ' -> kategori "' + t.kategori + '" tidak terdaftar di kategori.js');

  prosa(t.konsep, id + '.konsep');
  prosa(t.analogi, id + '.analogi');
  prosa(t.fungsi, id + '.fungsi');
  if (t.praktik) {
    prosa(t.praktik.tujuan, id + '.praktik.tujuan');
    (t.praktik.alat || []).forEach((a, i) => prosa(a, id + '.praktik.alat[' + i + ']'));
    (t.praktik.langkah || []).forEach((l, i) => prosa(l.isi, id + '.praktik.langkah[' + i + '].isi'));
    (t.praktik.cek || []).forEach((c, i) => prosa(c, id + '.praktik.cek[' + i + ']'));
  }
  if (t.kompleksitas) prosa(t.kompleksitas.intuisi, id + '.kompleksitas.intuisi');

  (t.logicSyntax || []).forEach((l, i) => {
    prosa(l.penjelasan, id + '.logicSyntax[' + i + '].penjelasan');
    const bhs = l.bahasa || 'cpp';
    if (!LANGS[bhs]) masalah.push(id + '.logicSyntax[' + i + '] -> bahasa "' + bhs + '" tidak ada di LANGS');
    if (l.kode) { cekKode++; try { hl(l.kode, bhs); } catch (e) { masalah.push(id + '.logicSyntax[' + i + '] -> hl() melempar: ' + e.message); } }
  });

  Object.keys(t.kode || {}).forEach(bhs => {
    if (!LANGS[bhs])          masalah.push(id + '.kode -> bahasa "' + bhs + '" tidak ada di LANGS');
    if (!URUTAN_BAHASA.includes(bhs)) masalah.push(id + '.kode -> "' + bhs + '" tidak ada di URUTAN_BAHASA, tabnya tak akan muncul');
    cekKode++;
    try {
      const out = hl(t.kode[bhs], bhs);
      const buka = (out.match(/<span\b/g) || []).length;
      const tutup = (out.match(/<\/span>/g) || []).length;
      if (buka !== tutup) masalah.push(id + '.kode.' + bhs + ' -> span tidak berpasangan');
    } catch (e) { masalah.push(id + '.kode.' + bhs + ' -> hl() melempar: ' + e.message); }
  });

  (t.kesalahanUmum || []).forEach((k, i) => {
    ['salah', 'kenapa', 'benar'].forEach(f => prosa(k[f], id + '.kesalahanUmum[' + i + '].' + f));
  });
}

GLOSARIUM.forEach((g, i) => { prosa(g.definisi, 'glosarium[' + i + '].definisi'); prosa(g.contoh, 'glosarium[' + i + '].contoh'); });

console.log('Topik diperiksa   : ' + TOPICS.length);
console.log('Blok prosa dirender: ' + cekProsa);
console.log('Blok kode diwarnai : ' + cekKode);
console.log('');
if (masalah.length === 0) console.log('BERSIH - seluruh konten berhasil dirender tanpa masalah.');
else { console.log('DITEMUKAN ' + masalah.length + ' MASALAH:'); masalah.slice(0, 40).forEach(m => console.log('  - ' + m)); process.exitCode = 1; }
