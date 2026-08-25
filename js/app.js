/* ============================================================
   app.js — mesin aplikasi: navigasi, pencarian, render materi,
            tema, penanda dibaca.
   Dimuat paling akhir, setelah store.js, /data/*.js, highlight.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Penyimpanan lokal (aman kalau diblokir) ---------- */
  const KEY = { tema: 'asprak:tema', bahasa: 'asprak:bahasa', dibaca: 'asprak:dibaca' };

  function simpan(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* diabaikan */ }
  }
  function ambil(k, bawaan) {
    try {
      const v = localStorage.getItem(k);
      return v === null ? bawaan : JSON.parse(v);
    } catch (e) { return bawaan; }
  }

  /* ---------- Keadaan aplikasi ---------- */
  let dibaca = ambil(KEY.dibaca, []);
  let bahasaPilihan = ambil(KEY.bahasa, 'cpp');
  let kueri = '';

  const $ = function (s) { return document.querySelector(s); };
  const elNav = $('#nav');
  const elMain = $('#main');
  const elCari = $('#search');

  /* ---------- Indeks pencarian ---------- */
  // Dibangun sekali di awal: seluruh teks tiap topik digabung jadi satu
  // string kecil huruf, supaya pencarian tinggal cek .includes()
  const INDEKS = {};

  function bangunIndeks() {
    TOPICS.forEach(function (t) {
      const bagian = [t.judul, t.ringkas, (t.tag || []).join(' '), t.konsep, t.analogi, t.fungsi];
      if (t.praktik) {
        bagian.push(t.praktik.tujuan || '');
        (t.praktik.alat || []).forEach(function (a) { bagian.push(a); });
        (t.praktik.langkah || []).forEach(function (l) { bagian.push(l.judul, l.isi); });
        (t.praktik.cek || []).forEach(function (c) { bagian.push(c); });
      }
      (t.logicSyntax || []).forEach(function (l) { bagian.push(l.kode, l.penjelasan); });
      (t.kesalahanUmum || []).forEach(function (k) { bagian.push(k.salah, k.kenapa, k.benar); });
      (t.latihan || []).forEach(function (l) { bagian.push(l); });
      if (t.kode) Object.keys(t.kode).forEach(function (b) { bagian.push(t.kode[b]); });
      INDEKS[t.id] = bagian.filter(Boolean).join(' \n ').toLowerCase();
    });
  }

  function cocok(t) {
    if (!kueri) return true;
    return (INDEKS[t.id] || '').indexOf(kueri) !== -1;
  }

  function topikKategori(katId) {
    return TOPICS.filter(function (t) { return t.kategori === katId; });
  }

  /** Semua topik berurutan sesuai urutan kategori — dipakai tombol sebelumnya/berikutnya. */
  function urutanTopik() {
    let hasil = [];
    KATEGORI.forEach(function (k) { hasil = hasil.concat(topikKategori(k.id)); });
    return hasil;
  }

  /* ---------- Sidebar ---------- */
  const IKON_CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

  function sorotJudul(judul) {
    if (!kueri) return esc(judul);
    const i = judul.toLowerCase().indexOf(kueri);
    if (i === -1) return esc(judul);
    return esc(judul.slice(0, i)) +
      '<mark class="hit">' + esc(judul.slice(i, i + kueri.length)) + '</mark>' +
      esc(judul.slice(i + kueri.length));
  }

  function renderNav() {
    const rute = location.hash;
    let html = '';
    let totalTampil = 0;

    KATEGORI.forEach(function (kat) {
      const semua = topikKategori(kat.id);
      const tampil = semua.filter(cocok);
      if (!tampil.length) return;
      totalTampil += tampil.length;

      const sudah = semua.filter(function (t) { return dibaca.indexOf(t.id) !== -1; }).length;
      // Saat mencari, semua kategori dipaksa terbuka agar hasil langsung terlihat.
      const terbuka = kueri ? true : ambil('asprak:buka:' + kat.id, true);

      html += '<div class="nav-cat" data-open="' + terbuka + '" data-kat="' + esc(kat.id) + '">' +
        '<button class="nav-cat-head" type="button">' + IKON_CHEV +
          '<span class="nav-cat-name">' + esc(kat.nama) + '</span>' +
          '<span class="nav-count">' + sudah + '/' + semua.length + '</span>' +
        '</button><ul class="nav-list">';

      tampil.forEach(function (t) {
        const aktif = rute === '#/t/' + t.id;
        html += '<li class="nav-item' + (dibaca.indexOf(t.id) !== -1 ? ' is-read' : '') + '">' +
          '<a href="#/t/' + esc(t.id) + '"' + (aktif ? ' class="active"' : '') + '>' +
            '<span class="dot"></span><span class="label">' + sorotJudul(t.judul) + '</span>' +
          '</a></li>';
      });
      html += '</ul></div>';
    });

    if (!totalTampil) {
      html = '<p class="nav-empty">Tidak ada materi yang cocok dengan<br><strong>"' + esc(kueri) + '"</strong></p>';
    }

    if (!kueri) {
      html += '<div class="nav-sep"></div>' +
        '<div class="nav-cat" data-open="true"><ul class="nav-list" style="border:0;padding-left:0">' +
        '<li class="nav-item"><a href="#/glosarium"' + (rute === '#/glosarium' ? ' class="active"' : '') + '>' +
        '<span class="dot"></span><span class="label">Glosarium Istilah</span></a></li>' +
        '</ul></div>';
    }

    elNav.innerHTML = html;
  }

  /* ---------- Potongan HTML yang dipakai berulang ---------- */
  let nomorSeksi = 0;

  function seksi(judul, isi) {
    nomorSeksi++;
    return '<section class="sec"><div class="sec-head">' +
      '<span class="sec-num">' + nomorSeksi + '</span><h2>' + judul + '</h2></div>' +
      isi + '</section>';
  }

  const IKON_SALIN = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg>';

  function blokKode(kode, bahasa) {
    // Nama berkas & label bahasa diambil dari LANGS (highlight.js) supaya
    // menambah bahasa baru cukup dilakukan di satu tempat.
    const spek = LANGS[bahasa];
    return '<div class="code-block"><div class="code-bar">' +
        '<span class="code-file">' + esc(spek ? spek.file : 'kode') + '</span>' +
        '<button class="copy-btn" type="button" data-salin>' + IKON_SALIN + '<span>Salin</span></button>' +
      '</div><pre class="code"><code>' + hl(kode, bahasa) + '</code></pre></div>';
  }

  function areaKode(t) {
    // Diurutkan menurut URUTAN_BAHASA, bukan urutan penulisan di berkas data,
    // supaya susunan tab seragam di semua topik.
    const ada = URUTAN_BAHASA.filter(function (b) { return t.kode && t.kode[b]; });
    if (!ada.length) return '';
    // Kalau bahasa pilihan tidak tersedia di topik ini, pakai yang pertama ada.
    const aktif = ada.indexOf(bahasaPilihan) !== -1 ? bahasaPilihan : ada[0];

    let tabs = '<div class="lang-tabs" role="tablist">';
    ada.forEach(function (b) {
      tabs += '<button class="lang-tab" type="button" role="tab" data-bahasa="' + b + '"' +
        ' aria-selected="' + (b === aktif) + '">' + esc(LANGS[b].nama) + '</button>';
    });
    tabs += '</div>';

    let isi = blokKode(t.kode[aktif], aktif);
    if (t.output) {
      isi += '<div class="out-block"><div class="out-label">Contoh keluaran</div>' +
        '<pre class="out">' + esc(t.output) + '</pre></div>';
    }
    return tabs + '<div id="areaKode">' + isi + '</div>';
  }

  /* ---------- Halaman: satu topik ---------- */
  function halamanTopik(t) {
    nomorSeksi = 0;
    const kat = KATEGORI.find(function (k) { return k.id === t.kategori; });
    let h = '<div class="wrap"><article>';

    h += '<header class="topic-head">' +
      '<div class="crumb">' + esc(kat ? kat.nama : t.kategori) + '</div>' +
      '<h1>' + esc(t.judul) + '</h1>' +
      (t.ringkas ? '<p class="ringkas">' + esc(t.ringkas) + '</p>' : '') +
      (t.tag && t.tag.length
        ? '<div class="tags">' + t.tag.map(function (x) { return '<span class="tag">#' + esc(x) + '</span>'; }).join('') + '</div>'
        : '') +
      '</header>';

    /* "Dipakai untuk apa" sengaja ditaruh SEBELUM Konsep: ia menjawab
       kenapa topik ini perlu dibaca sama sekali, dan pembaca yang tahu
       gunanya membaca teorinya dengan jauh lebih tekun. */
    if (t.fungsi) {
      h += seksi('Dipakai untuk Apa', '<div class="use prose">' + fmt(t.fungsi) + '</div>');
    }

    if (t.konsep) h += seksi('Konsep', '<div class="prose">' + fmt(t.konsep) + '</div>');

    if (t.logicSyntax && t.logicSyntax.length) {
      const kartu = t.logicSyntax.map(function (l) {
        return '<div class="logic-card">' +
          '<div class="logic-code">' + hl(l.kode, l.bahasa || 'cpp') + '</div>' +
          '<div class="logic-body prose">' + fmt(l.penjelasan) + '</div></div>';
      }).join('');
      // Judul seksi bisa ditimpa per topik lewat kolom `judulLogicSyntax`,
      // supaya topik non-pemrograman bisa memakai istilah yang lebih pas
      // (misalnya "Bedah Notasi" untuk Logika Informatika).
      h += seksi(t.judulLogicSyntax || 'Logic Syntax — kenapa ditulis begitu',
                 '<div class="logic">' + kartu + '</div>');
    }

    const kode = areaKode(t);
    if (kode) h += seksi('Contoh Kode', kode);

    /* Langkah praktik: apa yang benar-benar dikerjakan sendiri.
       Bentuknya { tujuan, alat[], langkah[{judul,isi}], cek[] };
       alat dan cek boleh dikosongkan. */
    if (t.praktik && t.praktik.langkah && t.praktik.langkah.length) {
      const p = t.praktik;
      let isi = '';
      if (p.tujuan) {
        isi += '<div class="prak-tujuan prose"><strong>Hasil akhir:</strong> ' +
               fmt(p.tujuan).replace(/^<p>|<\/p>$/g, '') + '</div>';
      }
      if (p.alat && p.alat.length) {
        isi += '<div class="prak-alat"><span class="prak-label">Yang disiapkan</span>' +
               '<ul>' + p.alat.map(function (a) {
                 return '<li><div class="prose">' + fmt(a) + '</div></li>';
               }).join('') + '</ul></div>';
      }
      isi += '<ol class="prak-langkah">' + p.langkah.map(function (l) {
        return '<li><div class="prak-judul">' + esc(l.judul) + '</div>' +
               '<div class="prose">' + fmt(l.isi) + '</div></li>';
      }).join('') + '</ol>';
      if (p.cek && p.cek.length) {
        isi += '<div class="prak-cek"><span class="prak-label">Cara memastikan berhasil</span>' +
               '<ul>' + p.cek.map(function (c) {
                 return '<li><div class="prose">' + fmt(c) + '</div></li>';
               }).join('') + '</ul></div>';
      }
      h += seksi('Langkah Praktik', '<div class="prak">' + isi + '</div>');
    }

    if (t.kompleksitas && t.kompleksitas.tabel) {
      let tabel = '<div class="table-wrap"><table><thead><tr>' +
        '<th>Operasi</th><th>Waktu</th><th>Memori</th></tr></thead><tbody>';
      t.kompleksitas.tabel.forEach(function (r) {
        tabel += '<tr><td>' + esc(r.operasi) + '</td>' +
          '<td><span class="big-o">' + esc(r.waktu) + '</span></td>' +
          '<td><span class="big-o">' + esc(r.memori || '—') + '</span></td></tr>';
      });
      tabel += '</tbody></table></div>';
      if (t.kompleksitas.intuisi) {
        tabel += '<div class="note prose">' + fmt(t.kompleksitas.intuisi) + '</div>';
      }
      h += seksi('Kompleksitas', tabel);
    }

    if (t.kesalahanUmum && t.kesalahanUmum.length) {
      const kartu = t.kesalahanUmum.map(function (k) {
        return '<div class="miss-card">' +
          '<div class="miss-row miss-x"><span class="miss-badge">SALAH</span><div class="prose">' + fmt(k.salah) + '</div></div>' +
          '<div class="miss-row miss-w"><span class="miss-badge">SEBAB</span><div class="prose">' + fmt(k.kenapa) + '</div></div>' +
          '<div class="miss-row miss-v"><span class="miss-badge">BENAR</span><div class="prose">' + fmt(k.benar) + '</div></div>' +
          '</div>';
      }).join('');
      h += seksi('Kesalahan Umum', '<div class="miss">' + kartu + '</div>');
    }

    if (t.analogi) {
      h += seksi('Analogi & Cara Mengingat', '<div class="analogy prose">' + fmt(t.analogi) + '</div>');
    }

    if (t.latihan && t.latihan.length) {
      h += seksi('Latihan', '<ol class="drill">' +
        t.latihan.map(function (l) { return '<li><div class="prose">' + fmt(l) + '</div></li>'; }).join('') +
        '</ol>');
    }

    /* kaki halaman: penanda dibaca + navigasi */
    const urut = urutanTopik();
    const i = urut.findIndex(function (x) { return x.id === t.id; });
    const sblm = i > 0 ? urut[i - 1] : null;
    const stlh = i < urut.length - 1 ? urut[i + 1] : null;
    const sudah = dibaca.indexOf(t.id) !== -1;

    h += '<div class="topic-foot">' +
      '<button class="read-btn' + (sudah ? ' on' : '') + '" type="button" data-baca="' + esc(t.id) + '">' +
        '<span class="box">' + (sudah ? '✓' : '') + '</span>' +
        '<span>' + (sudah ? 'Sudah dibaca' : 'Tandai sudah dibaca') + '</span></button>' +
      '<div class="pager">' +
        (sblm ? '<a href="#/t/' + esc(sblm.id) + '">← ' + esc(sblm.judul) + '</a>' : '') +
        (stlh ? '<a href="#/t/' + esc(stlh.id) + '">' + esc(stlh.judul) + ' →</a>' : '') +
      '</div></div>';

    return h + '</article></div>';
  }

  /* ---------- Halaman: beranda ---------- */
  function halamanBeranda() {
    let kartu = '';
    KATEGORI.forEach(function (k) {
      const semua = topikKategori(k.id);
      const sudah = semua.filter(function (t) { return dibaca.indexOf(t.id) !== -1; }).length;
      const persen = semua.length ? Math.round(sudah / semua.length * 100) : 0;
      const tujuan = semua.length ? '#/t/' + semua[0].id : '#/';
      kartu += '<a class="card" href="' + tujuan + '">' +
        '<h3>' + esc(k.nama) + '</h3>' +
        '<p>' + esc(k.ringkas || '') + '</p>' +
        '<div class="bar"><span style="width:' + persen + '%"></span></div>' +
        '<div class="card-meta"><span>' + semua.length + ' topik</span><span>' + persen + '%</span></div>' +
        '</a>';
    });

    return '<div class="wrap"><section class="hero">' +
      '<h1>Catatan Kuliah</h1>' +
      '<p class="hero-sub">Rangkuman materi kuliah Teknik Informatika — lengkap dengan bedah ' +
      '<strong>logic</strong> di balik tiap konsep, kesalahan yang sering terjadi, dan latihan.</p>' +
      '<div class="cards">' + kartu +
        '<a class="card" href="#/glosarium"><h3>Glosarium Istilah</h3>' +
        '<p>Arti singkat istilah &amp; singkatan yang sering muncul.</p>' +
        '<div class="card-meta"><span>' + GLOSARIUM.length + ' istilah</span><span>A–Z</span></div></a>' +
      '</div></section></div>';
  }

  /* ---------- Halaman: glosarium ---------- */
  function halamanGlosarium() {
    const daftar = GLOSARIUM
      .filter(function (g) {
        if (!kueri) return true;
        return (g.istilah + ' ' + g.definisi + ' ' + (g.contoh || '')).toLowerCase().indexOf(kueri) !== -1;
      })
      .slice()
      .sort(function (a, b) { return a.istilah.localeCompare(b.istilah, 'id'); });

    const isi = daftar.length
      ? daftar.map(function (g) {
          return '<div class="gloss-item">' +
            '<div class="gloss-term"><h3>' + esc(g.istilah) + '</h3>' +
            (g.jenis ? '<span class="kind">' + esc(g.jenis) + '</span>' : '') + '</div>' +
            '<div class="gloss-def prose">' + fmt(g.definisi) + '</div>' +
            (g.contoh ? '<div class="gloss-ex prose"><b>Contoh:</b> ' + fmt(g.contoh) + '</div>' : '') +
            '</div>';
        }).join('')
      : '<p class="nav-empty">Tidak ada istilah yang cocok.</p>';

    return '<div class="wrap"><header class="topic-head">' +
      '<div class="crumb">Referensi</div><h1>Glosarium Istilah</h1>' +
      '<p class="ringkas">Definisi singkat plus satu contoh, supaya cepat dipakai saat menjelaskan.</p>' +
      '</header><div class="gloss">' + isi + '</div></div>';
  }

  /* ---------- Router ---------- */
  function render() {
    const h = location.hash || '#/';
    if (h.indexOf('#/t/') === 0) {
      const id = h.slice(4);
      const t = TOPICS.find(function (x) { return x.id === id; });
      elMain.innerHTML = t
        ? halamanTopik(t)
        : '<div class="wrap"><h1>Topik tidak ditemukan</h1><p class="ringkas">Materi <code class="icode">' +
          esc(id) + '</code> belum ada. <a href="#/">Kembali ke beranda</a>.</p></div>';
    } else if (h === '#/glosarium') {
      elMain.innerHTML = halamanGlosarium();
    } else {
      elMain.innerHTML = halamanBeranda();
    }
    renderNav();
    window.scrollTo(0, 0);
    tutupNav();
  }

  /* ---------- Tema ---------- */
  function pasangTema(t) {
    document.documentElement.setAttribute('data-theme', t);
    simpan(KEY.tema, t);
  }

  /* ---------- Sidebar mobile ---------- */
  function bukaNav() {
    document.body.classList.add('nav-open');
    $('#overlay').hidden = false;
    $('#btnMenu').setAttribute('aria-expanded', 'true');
  }
  function tutupNav() {
    document.body.classList.remove('nav-open');
    $('#overlay').hidden = true;
    $('#btnMenu').setAttribute('aria-expanded', 'false');
  }

  /* ---------- Salin kode ---------- */
  function salin(teks, tombol) {
    function sukses() {
      const label = tombol.querySelector('span');
      const asli = label.textContent;
      tombol.classList.add('done');
      label.textContent = 'Tersalin!';
      setTimeout(function () { tombol.classList.remove('done'); label.textContent = asli; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teks).then(sukses, function () { salinCadangan(teks, sukses); });
    } else {
      salinCadangan(teks, sukses);
    }
  }
  // Cadangan untuk browser/konteks yang memblokir Clipboard API.
  function salinCadangan(teks, sukses) {
    const ta = document.createElement('textarea');
    ta.value = teks;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); sukses(); } catch (e) { /* diabaikan */ }
    document.body.removeChild(ta);
  }

  /* ---------- Pemasangan event ---------- */
  function pasangEvent() {
    window.addEventListener('hashchange', render);

    $('#btnTheme').addEventListener('click', function () {
      pasangTema(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    $('#btnMenu').addEventListener('click', function () {
      document.body.classList.contains('nav-open') ? tutupNav() : bukaNav();
    });
    $('#overlay').addEventListener('click', tutupNav);

    /* pencarian instan */
    elCari.addEventListener('input', function () {
      kueri = elCari.value.trim().toLowerCase();
      renderNav();
      if (location.hash === '#/glosarium') elMain.innerHTML = halamanGlosarium();
    });

    /* pintasan papan ketik */
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== elCari) {
        e.preventDefault(); elCari.focus(); elCari.select();
      } else if (e.key === 'Escape') {
        if (document.activeElement === elCari) { elCari.blur(); }
        tutupNav();
      }
    });

    /* buka/tutup kategori di sidebar */
    elNav.addEventListener('click', function (e) {
      const kepala = e.target.closest('.nav-cat-head');
      if (!kepala) return;
      const kotak = kepala.closest('.nav-cat');
      const jadi = kotak.getAttribute('data-open') !== 'true';
      kotak.setAttribute('data-open', jadi);
      if (kotak.dataset.kat) simpan('asprak:buka:' + kotak.dataset.kat, jadi);
    });

    /* interaksi di dalam materi (delegasi, karena isinya sering dirender ulang) */
    elMain.addEventListener('click', function (e) {
      /* salin kode */
      const btnSalin = e.target.closest('[data-salin]');
      if (btnSalin) {
        const pre = btnSalin.closest('.code-block').querySelector('pre.code');
        salin(pre.textContent, btnSalin);
        return;
      }

      /* ganti bahasa */
      const tab = e.target.closest('.lang-tab');
      if (tab) {
        const t = TOPICS.find(function (x) { return x.id === location.hash.slice(4); });
        if (!t) return;
        bahasaPilihan = tab.dataset.bahasa;
        simpan(KEY.bahasa, bahasaPilihan);
        tab.parentNode.querySelectorAll('.lang-tab').forEach(function (b) {
          b.setAttribute('aria-selected', String(b === tab));
        });
        let isi = blokKode(t.kode[bahasaPilihan], bahasaPilihan);
        if (t.output) {
          isi += '<div class="out-block"><div class="out-label">Contoh keluaran</div>' +
            '<pre class="out">' + esc(t.output) + '</pre></div>';
        }
        document.getElementById('areaKode').innerHTML = isi;
        return;
      }

      /* penanda sudah dibaca */
      const btnBaca = e.target.closest('[data-baca]');
      if (btnBaca) {
        const id = btnBaca.dataset.baca;
        const i = dibaca.indexOf(id);
        if (i === -1) dibaca.push(id); else dibaca.splice(i, 1);
        simpan(KEY.dibaca, dibaca);
        const kini = dibaca.indexOf(id) !== -1;
        btnBaca.classList.toggle('on', kini);
        btnBaca.querySelector('.box').textContent = kini ? '✓' : '';
        btnBaca.querySelector('span:last-child').textContent = kini ? 'Sudah dibaca' : 'Tandai sudah dibaca';
        renderNav();
      }
    });
  }

  /* ---------- Mulai ---------- */
  function mulai() {
    const temaSistem = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    pasangTema(ambil(KEY.tema, temaSistem));
    bangunIndeks();
    pasangEvent();
    render();
  }

  mulai();
})();
