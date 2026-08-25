/* Membaca teks dari .pptx (slide per slide).
   Dipakai karena pandoc tidak terpasang di komputer ini.

   Cara pakai:  node tools/baca-pptx.js "path/ke/slide.pptx"
                node tools/baca-pptx.js "path/ke/slide.pptx" 3 7   <- hanya slide 3..7

   Berbeda dengan baca-docx.js yang minta berkas XML hasil unzip,
   skrip ini menerima .pptx langsung dan meng-unzip sendiri lewat `unzip -p`. */
const { execFileSync } = require('child_process');

const berkas = process.argv[2];
const dari = process.argv[3] ? parseInt(process.argv[3], 10) : 1;
const sampai = process.argv[4] ? parseInt(process.argv[4], 10) : Infinity;

if (!berkas) {
  console.error('Pemakaian: node tools/baca-pptx.js <berkas.pptx> [slideAwal] [slideAkhir]');
  process.exit(1);
}

/* Daftar isi arsip -> ambil nomor slide yang benar-benar ada, urut angka. */
let daftar;
try {
  daftar = execFileSync('unzip', ['-Z1', berkas], { encoding: 'utf8' });
} catch (e) {
  console.error('Gagal membuka arsip: ' + berkas);
  process.exit(1);
}

const nomor = daftar
  .split('\n')
  .map(function (b) { return /^ppt\/slides\/slide(\d+)\.xml$/.exec(b.trim()); })
  .filter(Boolean)
  .map(function (m) { return parseInt(m[1], 10); })
  .sort(function (a, b) { return a - b; })
  .filter(function (n) { return n >= dari && n <= sampai; });

if (nomor.length === 0) {
  console.error('Tidak ada slide pada rentang itu. Apakah berkasnya benar .pptx?');
  process.exit(1);
}

nomor.forEach(function (n) {
  let xml;
  try {
    xml = execFileSync('unzip', ['-p', berkas, 'ppt/slides/slide' + n + '.xml'], { encoding: 'utf8' });
  } catch (e) {
    return;
  }

  /* Tandai batas paragraf supaya butir-butirnya tidak menyatu jadi satu baris. */
  xml = xml.replace(/<\/a:p>/g, '\n');

  const teks = [];
  const re = /<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>|(\n)/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    if (m[1] !== undefined) teks.push(m[1]);
    else teks.push('\n');
  }

  const hasil = teks.join('')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  console.log('===== Slide ' + n + ' =====');
  console.log(hasil.length ? hasil : '(tanpa teks)');
  console.log('');
});
