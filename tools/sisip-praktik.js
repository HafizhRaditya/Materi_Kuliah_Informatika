/* ============================================================
   sisip-praktik.js — menyisipkan kolom `fungsi` dan `praktik`
   ke topik yang sudah ada di /data.

   Dipakai saat menambahkan dua bagian baru ("Dipakai untuk Apa"
   dan "Langkah Praktik") ke seluruh topik, tanpa harus menulis
   ulang berkas datanya dengan tangan.

   Cara pakai:
     node tools/sisip-praktik.js <berkas-isi.js>

   Berkas isi berbentuk:
     module.exports = {
       'id-topik': {
         fungsi: `teks mini-markup`,
         praktik: {
           tujuan: 'satu kalimat hasil akhir',
           alat: ['...'],                        // opsional
           langkah: [{ judul: '...', isi: `...` }],
           cek: ['...']                          // opsional
         }
       }
     };

   Penyisipan dilakukan tepat SETELAH baris `ringkas:` milik
   topik itu, supaya urutan bacanya wajar di berkas sumber.
   Topik yang sudah punya `fungsi` dilewati, jadi menjalankan
   ulang berkas yang sama tidak menggandakan apa pun.
   ============================================================ */
const fs = require('fs');
const path = require('path');

/* ---------- serialisasi aman ke sumber JavaScript ---------- */

/* Berkas isi juga berupa JavaScript, jadi menulis backtick di dalamnya
   menuntut escape dan itu sangat mudah terlewat. Supaya tidak perlu:
   tulis kode sebaris sebagai @@kode@@, dan alat ini yang mengubahnya
   jadi backtick saat menyisipkan. */
function bukaPenanda(teks) {
  // Isi kode boleh memuat SATU '@' (misalnya 'app'@'localhost'),
  // jadi yang dilarang cuma '@@' -- bukan '@' tunggal.
  return String(teks).replace(/@@((?:[^@]|@(?!@))+)@@/g, '`$1`');
}

/** Teks panjang -> template literal, dengan backtick dan
    interpolasi dolar-kurung dilumpuhkan. */
function litPanjang(teks) {
  const aman = bukaPenanda(teks)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  return '`' + aman + '`';
}

/** Teks pendek satu baris -> string berkutip tunggal. */
function litPendek(teks) {
  const aman = bukaPenanda(teks)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ');
  return "'" + aman + "'";
}

/** Pilih bentuk kutipan menurut isinya. */
function lit(teks) {
  const s = bukaPenanda(teks);
  return (s.includes('\n') || s.length > 90) ? litPanjang(s) : litPendek(s);
}

function daftar(arr, spasi) {
  if (!arr || !arr.length) return null;
  const dalam = ' '.repeat(spasi + 2);
  return '[\n' + arr.map(x => dalam + lit(x)).join(',\n') +
         '\n' + ' '.repeat(spasi) + ']';
}

function blokPraktik(p, spasi) {
  const s = ' '.repeat(spasi);
  const d = ' '.repeat(spasi + 2);
  let out = '{\n';
  out += d + 'tujuan: ' + lit(p.tujuan) + ',\n';
  if (p.alat && p.alat.length) {
    out += d + 'alat: ' + daftar(p.alat, spasi + 2) + ',\n';
  }
  out += d + 'langkah: [\n';
  out += p.langkah.map(l =>
    d + '  { judul: ' + litPendek(l.judul) + ',\n' +
    d + '    isi: ' + lit(l.isi) + ' }'
  ).join(',\n') + '\n';
  out += d + ']';
  if (p.cek && p.cek.length) {
    out += ',\n' + d + 'cek: ' + daftar(p.cek, spasi + 2);
  }
  out += '\n' + s + '}';
  return out;
}

/* ---------- penyisipan ---------- */

const berkasIsi = process.argv[2];
if (!berkasIsi) {
  console.error('pakai: node tools/sisip-praktik.js <berkas-isi.js>');
  process.exit(1);
}
const ISI = require(path.resolve(berkasIsi));

const dirData = path.join(__dirname, '..', 'data');
const berkasData = fs.readdirSync(dirData).filter(f => f.endsWith('.js'));

let disisip = 0, dilewati = 0;
const tidakKetemu = new Set(Object.keys(ISI));

for (const nama of berkasData) {
  const jalur = path.join(dirData, nama);
  let teks = fs.readFileSync(jalur, 'utf8');
  let berubah = false;

  for (const [id, data] of Object.entries(ISI)) {
    const penanda = "id: '" + id + "',";
    const iTopik = teks.indexOf(penanda);
    if (iTopik === -1) continue;
    tidakKetemu.delete(id);

    // batas topik ini: sampai penanda id berikutnya (atau akhir berkas)
    // Akhir baris bisa LF maupun CRLF, tergantung bagaimana berkas datanya
    // terakhir disunting -- keduanya harus tertangkap.
    const mBerikut = /\r?\n  id: '/.exec(teks.slice(iTopik + 1));
    const batas = mBerikut ? iTopik + 1 + mBerikut.index : teks.length;
    const potongan = teks.slice(iTopik, batas);

    if (/\r?\n  fungsi:/.test(potongan)) { dilewati++; continue; }

    // cari akhir baris `ringkas:` -- nilainya selalu satu baris
    const mRingkas = /\r?\n  ringkas: .*,\r?\n/.exec(potongan);
    if (!mRingkas) {
      console.error('  ! ' + id + ': baris ringkas tidak ketemu, dilewati');
      continue;
    }
    const iSisip = iTopik + mRingkas.index + mRingkas[0].length;

    let tambahan = '';
    if (data.fungsi) {
      tambahan += '\n  fungsi: ' + litPanjang(data.fungsi) + ',\n';
    }
    if (data.praktik) {
      tambahan += '\n  praktik: ' + blokPraktik(data.praktik, 2) + ',\n';
    }

    teks = teks.slice(0, iSisip) + tambahan + teks.slice(iSisip);
    berubah = true;
    disisip++;
  }

  if (berubah) fs.writeFileSync(jalur, teks);
}

console.log(`  disisipkan : ${disisip} topik`);
if (dilewati) console.log(`  dilewati   : ${dilewati} topik (sudah punya 'fungsi')`);
if (tidakKetemu.size) {
  console.log('  TIDAK KETEMU di /data: ' + [...tidakKetemu].join(', '));
  process.exit(1);
}
