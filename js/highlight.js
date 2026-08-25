/* ============================================================
   highlight.js — dua alat pengubah teks menjadi HTML:
     1) hl(kode, bahasa) → pewarnaan syntax C / C++ / Python
     2) fmt(teks)        → pemformat teks mini untuk materi
   Nol dependensi, jalan penuh secara offline.
   ============================================================ */

/* ---------- util ---------- */
function esc(s) {
  return String(s).replace(/[&<>]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
  });
}

/* ---------- 1. Syntax highlighter ---------- */

const KW_C = [
  'auto','break','case','char','const','continue','default','do','double','else','enum',
  'extern','float','for','goto','if','inline','int','long','register','return','short',
  'signed','sizeof','static','struct','switch','typedef','union','unsigned','void',
  'volatile','while','bool','size_t','NULL','true','false'
];

const KW_CPP = KW_C.concat([
  'class','public','private','protected','virtual','override','final','new','delete',
  'this','namespace','using','template','typename','try','catch','throw','nullptr',
  'friend','operator','explicit','constexpr','static_cast','dynamic_cast','const_cast',
  'reinterpret_cast','string','vector','map','set','pair','stack','queue','deque','bool'
]);

const KW_PY = [
  'and','as','assert','async','await','break','class','continue','def','del','elif',
  'else','except','False','finally','for','from','global','if','import','in','is',
  'lambda','None','nonlocal','not','or','pass','raise','return','self','True','try',
  'while','with','yield','match','case'
];

const KW_JAVA = [
  'abstract','assert','boolean','break','byte','case','catch','char','class','const',
  'continue','default','do','double','else','enum','extends','final','finally','float',
  'for','if','implements','import','instanceof','int','interface','long','native','new',
  'package','private','protected','public','return','short','static','strictfp','super',
  'switch','synchronized','this','throw','throws','transient','try','void','volatile',
  'while','true','false','null','var','record','String','System','ArrayList','List','Map'
];

const KW_JS = [
  'async','await','break','case','catch','class','const','continue','debugger','default',
  'delete','do','else','export','extends','finally','for','function','get','if','import',
  'in','instanceof','let','new','of','return','set','static','super','switch','this',
  'throw','try','typeof','var','void','while','yield','true','false','null','undefined',
  'NaN','console','Math','JSON','Object','Array','Promise'
];

const KW_CS = [
  'abstract','as','base','bool','break','byte','case','catch','char','checked','class',
  'const','continue','decimal','default','delegate','do','double','else','enum','event',
  'explicit','extern','finally','fixed','float','for','foreach','get','goto','if',
  'implicit','in','int','interface','internal','is','lock','long','namespace','new',
  'object','operator','out','override','params','private','protected','public','readonly',
  'ref','return','sbyte','sealed','set','short','sizeof','static','string','struct',
  'switch','this','throw','try','typeof','uint','ulong','ushort','using','var','virtual',
  'void','volatile','while','true','false','null','Console','List','Dictionary'
];

/* SQL ditulis huruf besar sesuai kebiasaan, tetapi orang sering mengetik
   huruf kecil. Daftarnya dibangun sekali lalu digandakan ke huruf kecil,
   supaya `SELECT` dan `select` sama-sama terwarnai tanpa menulis dua kali. */
const KW_SQL_BESAR = [
  'ADD','ALTER','AND','AS','ASC','AUTO_INCREMENT','BETWEEN','BY','CASCADE','CHANGE',
  'CHAR','CHECK','COLUMN','CONSTRAINT','CREATE','DATABASE','DATE','DATETIME','DECIMAL',
  'DEFAULT','DELETE','DESC','DISTINCT','DROP','ELSE','END','EXISTS','FLOAT','FOREIGN',
  'FROM','FULL','GRANT','GROUP','HAVING','IF','IN','INDEX','INNER','INSERT','INT',
  'INTEGER','INTO','IS','JOIN','KEY','LEFT','LIKE','LIMIT','MODIFY','NOT','NULL','ON',
  'OR','ORDER','OUTER','PRIMARY','PRIVILEGES','REFERENCES','RENAME','REVOKE','RIGHT',
  'SELECT','SET','SHOW','TABLE','TEXT','THEN','TO','TRIGGER','TRUNCATE','UNION',
  'UNIQUE','UPDATE','USE','USING','VALUES','VARCHAR','VIEW','WHEN','WHERE','WITH',
  /* PL/SQL Oracle — dipakai topik Basis Data II */
  'BEGIN','BODY','CLOSE','CURSOR','DECLARE','ELSIF','EXCEPTION','EXIT','FETCH',
  'FOR','FUNCTION','IS','LOOP','NUMBER','OPEN','OTHERS','OUT','PACKAGE',
  'PROCEDURE','RAISE','REPLACE','RETURN','VARCHAR2','WHILE'
];
const KW_SQL = KW_SQL_BESAR.concat(
  KW_SQL_BESAR.map(function (k) { return k.toLowerCase(); })
);

/* HTML bukan bahasa pemrograman, jadi yang diwarnai bukan keyword
   melainkan nama atribut. Nama tag ditangani lewat kolom `prep`. */
const KW_HTML = [
  'accept','action','alt','charset','checked','class','cols','content','disabled',
  'for','height','href','id','lang','maxlength','method','name','placeholder',
  'readonly','rel','required','rows','selected','src','style','target','title',
  'type','value','width'
];

/* CSS: yang diwarnai adalah nama properti, bukan keyword bahasa.
   Selector ditangani lewat kolom `prep`. */
const KW_CSS = [
  'align-items','background','background-color','border','border-radius','bottom',
  'box-shadow','box-sizing','color','content','cursor','display','flex','flex-direction',
  'flex-wrap','font-family','font-size','font-weight','gap','grid','grid-template-columns',
  'height','justify-content','left','line-height','margin','max-width','min-height',
  'opacity','overflow','padding','position','right','text-align','text-decoration','top',
  'transform','transition','visibility','width','z-index'
];

/* PHP: variabel selalu berawalan $ dan ditangani lewat kolom `prep`,
   jadi daftar ini murni kata kunci bahasanya. */
const KW_PHP = [
  'abstract','and','array','as','break','callable','case','catch','class','clone',
  'const','continue','declare','default','do','echo','else','elseif','empty',
  'enddeclare','endfor','endforeach','endif','endswitch','endwhile','enum','extends',
  'final','finally','fn','for','foreach','function','global','goto','if','implements',
  'include','include_once','instanceof','insteadof','interface','isset','list','match',
  'namespace','new','or','print','private','protected','public','readonly','require',
  'require_once','return','static','switch','throw','trait','try','unset','use','var',
  'while','xor','yield','true','false','null','int','float','string','bool','void',
  'self','parent','this'
];

const NUM = '\\b(?:0[xXbB][0-9a-fA-F]+|\\d+\\.?\\d*(?:[eE][+-]?\\d+)?)[fFuUlL]*\\b';
const FN  = '\\b[A-Za-z_]\\w*(?=\\s*\\()';

/* Kotlin dan Dart ditambahkan untuk mata kuliah Pemrograman Mobile
   (semester 5): pertemuan 1-8 memakai Kotlin + Jetpack Compose,
   pertemuan 9-16 memakai Dart + Flutter. */
const KW_KOTLIN = [
  'abstract','actual','annotation','as','break','by','catch','class','companion',
  'const','constructor','continue','crossinline','data','do','dynamic',
  'else','enum','expect','external','false','final','finally','for','fun','get',
  'if','import','in','infix','init','inline','inner','interface','internal','is',
  'lateinit','noinline','null','object','open','operator','out','override','package',
  'private','protected','public','reified','return','sealed','set','super','suspend',
  'this','throw','true','try','typealias','val','var','vararg','when','where','while',
  'Boolean','Double','Float','Int','List','Long','Map','Set','String','Unit','Any'
];

const KW_DART = [
  'abstract','as','assert','async','await','break','case','catch','class','const',
  'continue','covariant','default','deferred','do','dynamic','else','enum','export',
  'extends','extension','external','factory','false','final','finally','for','get',
  'hide','if','implements','import','in','interface','is','late','library','mixin',
  'new','null','on','operator','part','required','rethrow','return','sealed','set',
  'show','static','super','switch','sync','this','throw','true','try','typedef',
  'var','void','while','with','yield',
  'bool','double','int','num','String','List','Map','Set','Future','Stream','Widget'
];

const LANGS = {
  c: {
    nama: 'C', file: 'contoh.c',
    kw: KW_C,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: '^[ \\t]*#[a-zA-Z_]+(?:[ \\t]*<[^>\\n]*>)?'
  },
  cpp: {
    nama: 'C++', file: 'contoh.cpp',
    kw: KW_CPP,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: '^[ \\t]*#[a-zA-Z_]+(?:[ \\t]*<[^>\\n]*>)?'
  },
  python: {
    nama: 'Python', file: 'contoh.py',
    kw: KW_PY,
    com: '#[^\\n]*',
    str: '"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|[fFrRbB]{0,2}"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|[fFrRbB]{0,2}\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: null
  },
  csharp: {
    nama: 'C#', file: 'Contoh.cs',
    kw: KW_CS,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    // [@$] mendukung string verbatim @"..." dan interpolasi $"..."
    str: '[@$]{0,2}"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: null
  },
  java: {
    nama: 'Java', file: 'Contoh.java',
    kw: KW_JAVA,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: null
  },
  kotlin: {
    nama: 'Kotlin', file: 'Contoh.kt',
    kw: KW_KOTLIN,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    /* anotasi seperti @Composable dan @Preview diwarnai seperti pengarah */
    prep: '@[A-Za-z_][\\w.]*'
  },
  dart: {
    nama: 'Dart', file: 'contoh.dart',
    kw: KW_DART,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: '@[A-Za-z_][\\w.]*'
  },
  js: {
    nama: 'JavaScript', file: 'contoh.js',
    kw: KW_JS,
    com: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    // Catatan: template literal `...` sengaja tidak didukung, karena
    // backtick tidak bisa ditulis di dalam String.raw pada berkas /data.
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    prep: null
  },
  html: {
    nama: 'HTML', file: 'contoh.html',
    kw: KW_HTML,
    com: '<!--[\\s\\S]*?-->',
    str: '"(?:[^"\\n])*"|\'(?:[^\'\\n])*\'',
    // Nama tag pembuka & penutup: <div, </div, <br/
    prep: '<\\/?[a-zA-Z][\\w-]*'
  },
  php: {
    nama: 'PHP', file: 'contoh.php',
    kw: KW_PHP,
    com: '\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:\\\\[\\s\\S]|[^"\\\\\\n])*"|\'(?:\\\\[\\s\\S]|[^\'\\\\\\n])*\'',
    // Tag pembuka & penutup PHP, plus variabel bertanda $
    prep: '<\\?php|<\\?=|\\?>|\\$[a-zA-Z_]\\w*'
  },
  css: {
    nama: 'CSS', file: 'contoh.css',
    kw: KW_CSS,
    com: '\\/\\*[\\s\\S]*?\\*\\/',
    str: '"(?:[^"\\n])*"|\'(?:[^\'\\n])*\'',
    // Selector & at-rule: .kelas, #id, @media, :hover, ::before
    prep: '@[a-zA-Z-]+|[.#][a-zA-Z_][\\w-]*|::?[a-zA-Z-]+'
  },
  sql: {
    nama: 'SQL', file: 'contoh.sql',
    kw: KW_SQL,
    // SQL punya dua gaya komentar: -- sampai akhir baris, dan /* ... */
    com: '--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    // Kutip tunggal untuk nilai; kutip ganda dipakai sebagian dialek untuk nama kolom
    str: '\'(?:\'\'|[^\'\\n])*\'|"(?:""|[^"\\n])*"',
    prep: null
  }
};

/* Urutan baku tab bahasa — dikelompokkan per rumpun, bukan abjad.
   Dipakai app.js supaya urutannya seragam di semua topik.

   Enam yang pertama bahasa prosedural. HTML dan SQL ditaruh paling
   akhir karena beda rumpun: HTML bahasa penanda, SQL bahasa kueri,
   dan keduanya cuma dipakai topik tertentu. */
const URUTAN_BAHASA = ['c', 'cpp', 'csharp', 'java', 'kotlin', 'dart', 'python', 'js', 'php', 'html', 'css', 'sql'];

/* regex master dibangun sekali per bahasa lalu disimpan */
const _cache = {};

function _re(lang) {
  if (_cache[lang]) return _cache[lang];
  const L = LANGS[lang];
  const parts = [
    '(?<com>' + L.com + ')',
    '(?<str>' + L.str + ')'
  ];
  if (L.prep) parts.push('(?<prep>' + L.prep + ')');
  parts.push('(?<num>' + NUM + ')');
  parts.push('(?<kw>\\b(?:' + L.kw.join('|') + ')\\b)');
  parts.push('(?<fn>' + FN + ')');
  // Urutan penting: komentar & string diperiksa lebih dulu supaya isinya
  // tidak ikut diwarnai sebagai keyword.
  _cache[lang] = new RegExp(parts.join('|'), 'gm');
  return _cache[lang];
}

const WARNA = { com: 'c-com', str: 'c-str', prep: 'c-prep', num: 'c-num', kw: 'c-key', fn: 'c-fn' };

/** Ubah kode mentah menjadi HTML berwarna. */
function hl(code, lang) {
  if (!LANGS[lang]) lang = 'cpp';
  const re = _re(lang);
  let out = '', last = 0, m;
  re.lastIndex = 0;

  while ((m = re.exec(code)) !== null) {
    if (m[0] === '') { re.lastIndex++; continue; }        // jaga-jaga anti loop tak berujung
    out += esc(code.slice(last, m.index));
    const g = m.groups;
    const jenis = Object.keys(WARNA).find(function (k) { return g[k] !== undefined; });
    out += '<span class="' + WARNA[jenis] + '">' + esc(m[0]) + '</span>';
    last = re.lastIndex;
  }
  out += esc(code.slice(last));
  return out;
}

/* ---------- 2. Pemformat teks materi ---------- */
/*
   Sintaks yang didukung (sengaja sedikit, biar gampang diingat):
     baris kosong   → paragraf baru
     **tebal**      → huruf tebal
     `kode`         → kode sebaris
     - item         → daftar berpoin
*/
function _inline(s) {
  const simpan = [];
  // 1) amankan `kode` dulu supaya isinya tidak kena aturan **tebal**
  //    (penting: kode seperti  int **pp  mengandung ** )
  s = s.replace(/`([^`]+)`/g, function (_, isi) {
    simpan.push('<code class="icode">' + isi + '</code>');
    return '<<' + (simpan.length - 1) + '>>';
  });
  // 2) tebal
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // 3) kembalikan kode
  return s.replace(/<<(\d+)>>/g, function (_, i) { return simpan[+i]; });
}

/** Pecah satu baris tabel menjadi selnya. */
function _sel(baris) {
  let s = baris.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(function (x) { return x.trim(); });
}

/** Apakah blok ini tabel bergaya markdown? */
function _tabel(baris) {
  return baris.length >= 2
    && baris.every(function (x) { return x.indexOf('|') >= 0; })
    && /^\|?[\s:|-]*-[\s:|-]*\|?$/.test(baris[1])
    && baris[1].indexOf('|') >= 0;
}

/** Ubah teks materi menjadi HTML paragraf/daftar/tabel. */
function fmt(teks) {
  if (!teks) return '';
  const blok = esc(String(teks).trim()).split(/\n\s*\n/);
  return blok.map(function (b) {
    const baris = b.split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    if (baris.length && baris.every(function (x) { return /^-\s+/.test(x); })) {
      return '<ul>' + baris.map(function (x) {
        return '<li>' + _inline(x.replace(/^-\s+/, '')) + '</li>';
      }).join('') + '</ul>';
    }
    if (_tabel(baris)) {
      const kepala = _sel(baris[0]);
      const isi = baris.slice(2).map(_sel);
      const lebar = kepala.length;
      let h = '<div class="tbl-gulir"><table class="tbl">';
      h += '<thead><tr>' + kepala.map(function (s) {
        return '<th>' + _inline(s) + '</th>';
      }).join('') + '</tr></thead><tbody>';
      h += isi.map(function (r) {
        // samakan jumlah sel supaya tabelnya tidak rusak
        while (r.length < lebar) r.push('');
        return '<tr>' + r.slice(0, lebar).map(function (s) {
          return '<td>' + _inline(s) + '</td>';
        }).join('') + '</tr>';
      }).join('');
      return h + '</tbody></table></div>';
    }
    return '<p>' + _inline(baris.join(' ')) + '</p>';
  }).join('');
}
