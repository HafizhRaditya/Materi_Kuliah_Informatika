/* ============================================================
   sisip-bahasa.js — menyisipkan bahasa baru ke blok `kode` topik
   yang sudah ada, berpatokan pada id topik.

   Pemakaian:  node sisip-bahasa.js <berkas-target> <berkas-tambahan>

   Berkas tambahan mengekspor objek:
     module.exports = { 'id-topik': { csharp: '...', java: '...', js: '...' } }
   ============================================================ */
const fs = require('fs');

const BT = String.fromCharCode(96);
const [target, tambahan] = process.argv.slice(2);

const data = require(tambahan);
let teks = fs.readFileSync(target, 'utf8');
const eol = teks.includes('\r\n') ? '\r\n' : '\n';

let jumlahTopik = 0, jumlahBlok = 0;
const gagal = [];

Object.keys(data).forEach(function (id) {
  const bahasa = data[id];

  // 1. Temukan baris  id: 'xxx',
  const penanda = "id: '" + id + "',";
  const posId = teks.indexOf(penanda);
  if (posId === -1) { gagal.push(id + ': id tidak ditemukan'); return; }

  // 2. Temukan  kode: {  pertama SETELAH id itu
  const posKode = teks.indexOf(eol + '  kode: {', posId);
  if (posKode === -1) { gagal.push(id + ': blok kode tidak ditemukan'); return; }

  const sisipDi = posKode + (eol + '  kode: {').length;

  // 3. Susun entri baru
  let sisipan = '';
  Object.keys(bahasa).forEach(function (b) {
    const kode = bahasa[b];
    if (kode.indexOf(BT) !== -1) {
      gagal.push(id + '/' + b + ': mengandung backtick, akan merusak String.raw');
      return;
    }
    sisipan += eol + '    ' + b + ': String.raw' + BT + kode + BT + ',' + eol;
    jumlahBlok++;
  });

  teks = teks.slice(0, sisipDi) + sisipan + teks.slice(sisipDi);
  jumlahTopik++;
});

if (gagal.length) {
  console.log('GAGAL:');
  gagal.forEach(function (g) { console.log('  ! ' + g); });
  process.exit(1);
}

fs.writeFileSync(target, teks, 'utf8');
console.log('Tersisip: ' + jumlahBlok + ' blok kode ke ' + jumlahTopik + ' topik');
console.log('Berkas  : ' + target.replace(/^.*[\\/]/, ''));
