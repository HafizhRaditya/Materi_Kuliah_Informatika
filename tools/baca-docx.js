/* Membaca teks dari sebuah .docx.
   Dipakai karena pandoc tidak terpasang di komputer ini.

   Boleh diberi:
     - berkas .docx langsung   -> word/document.xml diambil sendiri
     - berkas document.xml     -> dibaca apa adanya
*/
const fs = require('fs');
const { execFileSync } = require('child_process');

const berkas = process.argv[2];
if (!berkas) {
  console.error('pakai: node tools/baca-docx.js <berkas.docx | document.xml>');
  process.exit(1);
}

let xml;
const awalan = fs.readFileSync(berkas).subarray(0, 2).toString('latin1');
if (awalan === 'PK') {
  // .docx itu zip. Ambil word/document.xml dari dalamnya.
  xml = execFileSync('unzip', ['-p', berkas, 'word/document.xml'],
                     { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} else {
  xml = fs.readFileSync(berkas, 'utf8');
}

// Tandai batas paragraf & baris supaya strukturnya tidak hilang
xml = xml
  .replace(/<w:p [^>]*\/>/g, '\n')
  .replace(/<\/w:p>/g, '\n')
  .replace(/<w:br\s*\/>/g, '\n')
  .replace(/<w:tab\s*\/>/g, '\t')
  // penanda sel & baris tabel
  .replace(/<\/w:tc>/g, ' | ')
  .replace(/<\/w:tr>/g, '\n');

// Ambil hanya isi <w:t>
const teks = [];
const re = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|(\n)|(\t)|( \| )/g;
let m;
while ((m = re.exec(xml)) !== null) {
  if (m[1] !== undefined) teks.push(m[1]);
  else if (m[2]) teks.push('\n');
  else if (m[3]) teks.push('\t');
  else teks.push(' | ');
}

let hasil = teks.join('')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .replace(/\|\s*\n/g, '\n');

console.log(hasil.trim());
