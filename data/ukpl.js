/* ============================================================
   ukpl.js — materi Uji Kualitas Perangkat Lunak (Semester 5)

   Disusun dari RPS IF21506 Uji Kualitas Perangkat Lunak,
   Program Studi Informatika FT Unsoed.
   Berkas PDF-nya memakai penyandian huruf bergeser; isinya
   didekode lebih dulu sebelum dipakai.

   PEMBAGIAN DENGAN RPL SEMESTER 4:
   Topik rpl-pengujian sudah membahas dasar-dasarnya --
   kalimat Dijkstra, black vs white box, equivalence
   partitioning, boundary value, statement vs branch coverage,
   dan uji flaky. Di sini TIDAK diulang. Yang dibahas adalah
   lanjutannya: siklus hidup pengujian sebagai proses
   tersendiri, teknik perancangan kasus uji yang lebih rumit,
   serta otomatisasi dan pengukurannya.
   ============================================================ */

TOPICS.push({
  id: 'ukpl-stlc',
  judul: 'Siklus Hidup Pengujian (STLC)',
  kategori: 'ukpl',
  tag: ['STLC', 'test plan', 'test case', 'V-model', 'prinsip pengujian', 'defect'],
  ringkas: 'Pengujian sebagai proses tersendiri yang berjalan sejajar dengan pembangunan, bukan tahap di ujung.',

  fungsi: `**Menjalankan pengujian sebagai proses tersendiri yang berjalan sejak awal, bukan tahap di ujung.**

Terpakai di:

- **Merencanakan pengujian** tugas akhir atau proyek
- **Bab pengujian** — dokumen test plan dan test case hampir selalu diminta
- **Kerja praktik** — banyak posisi khusus pengujian
- **Menemukan cacat spesifikasi** sebelum kode ditulis

Manfaat terbesarnya sering tidak terduga: **menulis kasus uji memaksa kebutuhan diperiksa.**

Kalau kamu tidak bisa menulis kasus uji untuk sebuah kebutuhan, berarti kebutuhannya **belum cukup jelas** — dan itu ketahuan sebelum satu baris kode ditulis.

Dan kaidah yang paling menentukan: **hasil yang diharapkan ditulis dari spesifikasi, sebelum programnya dijalankan.**`,

  praktik: {
    tujuan: 'Kamu punya dokumen pengujian yang lengkap dan kasus uji yang terbukti bisa gagal.',
    alat: [
      'Spreadsheet untuk test case',
      'Proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Tulis test plan sebelum kode selesai',
        isi: `Isi: apa yang diuji, apa yang **tidak** diuji, siapa yang menguji, kapan, dan **syarat selesai**.

Bagian "apa yang tidak diuji" sama pentingnya — ia mencegah lingkupnya melebar dan membuat harapan jelas.` },
      { judul: 'Tetapkan syarat keluar yang bisa diperiksa',
        isi: `Buruk: *"pengujian selesai"*.

Baik: *"seluruh kasus uji dijalankan, tidak ada cacat tingkat tinggi yang terbuka, cakupan cabang minimal 70 persen"*.

Tanpa syarat yang bisa diperiksa, "selesai" cuma berarti waktunya habis.` },
      { judul: 'Susun kasus uji dari dokumen pasangannya',
        isi: `Ikuti V-Model: kasus uji penerimaan dari kebutuhan pengguna, uji sistem dari spesifikasi, uji unit dari perancangan rinci.

Tulis bersamaan dengan dokumennya, bukan belakangan.` },
      { judul: 'Isi kolom hasil yang diharapkan LEBIH DULU',
        isi: `Ambil dari spesifikasi, bukan dari keluaran program.

Kalau diisi setelah melihat hasilnya, ujimu **tidak pernah bisa gagal** — dan lebih buruk, ia mengunci bug sebagai perilaku resmi.

Enam bulan kemudian, orang yang memperbaiki bug itu akan melihat ujinya gagal dan mengira perbaikannya yang salah.` },
      { judul: 'Alokasikan usaha menurut riwayat cacat',
        isi: `Cacat mengelompok — sekitar 80 persen cacat ada di 20 persen modul.

Periksa riwayat bug proyekmu, lalu beri perhatian lebih pada modul yang sudah pernah bermasalah.

Membagi usaha merata menghabiskan waktu di tempat yang cacatnya memang sedikit.` },
      { judul: 'Tambahkan kasus uji baru secara berkala',
        isi: `Kumpulan uji yang tidak pernah berubah akan berhenti menemukan cacat baru — itu **paradoks pestisida**.

Tambahkan uji baru terutama untuk cacat yang baru ditemukan, dan pertahankan yang lama sebagai penjaga regresi.` },
      { judul: 'Bedakan error, defect, dan failure di laporanmu',
        isi: `- **error** — kekeliruan manusia
- **defect** — cacat di kode
- **failure** — perilaku salah yang teramati

Memakainya dengan tepat membuat laporan cacatmu jauh lebih mudah ditelusuri, dan menunjukkan kamu memahami rantainya.` }
    ],
    cek: [
      'Test plan-mu memuat apa yang tidak diuji dan syarat selesai yang bisa diperiksa',
      'Setiap kolom hasil yang diharapkan diisi dari spesifikasi, bukan dari keluaran program',
      'Kamu memberi perhatian lebih pada modul yang riwayat cacatnya paling banyak'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa siklusnya terpisah',

  konsep: `
Di RPL kamu belajar **SDLC** — siklus hidup pengembangan, dengan pengujian sebagai **salah satu tahap** di dekat ujung.

**STLC** (*Software Testing Life Cycle*) memandangnya berbeda: pengujian punya **siklus hidupnya sendiri**, yang berjalan **sejajar** dengan pembangunan sejak awal.

Perbedaan cara pandang ini punya akibat nyata. Kalau pengujian cuma satu tahap, ia **baru dimulai setelah kode selesai**. Kalau ia siklus tersendiri, **perencanaan dan perancangan kasus ujinya sudah berjalan** ketika kode belum ditulis satu baris pun.

**Enam tahap STLC**

- **Analisis kebutuhan uji** — apa yang perlu diuji, dan apa yang tidak
- **Perencanaan** — ruang lingkup, jadwal, sumber daya, alat bantu → menghasilkan **Test Plan**
- **Perancangan kasus uji** — menyusun kasus uji dan data uji → menghasilkan **Test Case**
- **Penyiapan lingkungan** — menyiapkan tempat pengujian dijalankan
- **Pelaksanaan** — kasus uji dijalankan, hasilnya dicatat, cacat dilaporkan
- **Penutupan** — evaluasi, pelaporan, dan pelajaran yang dipetik

Tiap tahap punya **syarat masuk** (*entry criteria*) dan **syarat keluar** (*exit criteria*). Tanpa itu, "pengujian selesai" cuma berarti "waktunya habis".

**V-Model: pengujian dirancang bersamaan dengan perancangan**

V-Model menempatkan tahap pembangunan di sisi kiri dan tahap pengujian di sisi kanan, saling berpasangan:

- Kebutuhan pengguna ↔ **Acceptance testing**
- Spesifikasi sistem ↔ **System testing**
- Perancangan arsitektur ↔ **Integration testing**
- Perancangan rinci ↔ **Unit testing**

Gagasan pokoknya: **kasus uji untuk sebuah tingkat disusun bersamaan dengan dokumen pasangannya**, bukan belakangan.

Manfaatnya bukan sekadar hemat waktu. Menyusun kasus uji **memaksa** dokumen itu diperiksa: kalau kamu tidak bisa menulis kasus uji untuk sebuah kebutuhan, berarti **kebutuhannya belum cukup jelas** — dan itu ketahuan **sebelum** kode ditulis.

**Tujuh prinsip pengujian**

Diakui luas dan disebut di banyak silabus:

- **Pengujian menunjukkan adanya cacat**, bukan ketiadaannya
- **Pengujian menyeluruh mustahil** — jumlah kombinasinya tak terhingga
- **Uji sedini mungkin** — makin awal cacat ditemukan, makin murah
- **Cacat mengelompok** — sebagian kecil modul memuat sebagian besar cacat
- **Paradoks pestisida** — kasus uji yang sama, diulang terus, berhenti menemukan cacat baru
- **Pengujian bergantung konteks** — cara menguji aplikasi bank ≠ cara menguji permainan
- **Keliru menganggap ketiadaan cacat berarti berguna** — sistem tanpa bug yang tidak dibutuhkan siapa pun tetap gagal

**Cacat mengelompok**, dan akibatnya

Ini pengamatan empiris yang berulang: sekitar **80 persen cacat** terkumpul di sekitar **20 persen modul**.

Akibat praktisnya langsung: **jangan sebar usaha pengujian secara merata.** Modul yang sudah pernah bermasalah **kemungkinan besar masih bermasalah** — beri ia perhatian lebih.

**Paradoks pestisida**

Serangga yang disemprot pestisida yang sama terus-menerus akan **kebal**. Begitu pula perangkat lunak: kasus uji yang tidak pernah berubah **berhenti menemukan cacat baru**, karena cacat yang bisa ia tangkap **sudah tertangkap semua**.

Ini bukan alasan menghapus kasus uji lama — mereka masih menjaga dari **regresi**. Ini alasan **menambah** yang baru.

**Cacat, kesalahan, kegagalan**

Tiga kata yang sering dipakai bergantian padahal berbeda:

- **Error / mistake** — kekeliruan **manusia** saat menulis
- **Defect / fault / bug** — akibatnya **di dalam kode**
- **Failure** — **perilaku salah** yang terlihat saat dijalankan

Satu kekeliruan bisa menimbulkan beberapa cacat; satu cacat bisa menimbulkan banyak kegagalan — atau **tidak satu pun**, kalau baris itu tidak pernah dijalankan.

Cacat yang **tidak pernah menimbulkan kegagalan** tetap cacat. Ia menunggu.

**Dokumen yang dihasilkan**

- **Test Plan** — ruang lingkup, pendekatan, sumber daya, jadwal, risiko
- **Test Case** — id, prasyarat, langkah, data uji, **hasil yang diharapkan**, hasil sesungguhnya, status
- **Test Report** — ringkasan pelaksanaan, cacat yang ditemukan, cakupan, rekomendasi

**Kolom yang paling menentukan** pada Test Case adalah **hasil yang diharapkan**, dan ia **harus ditulis sebelum kasus uji dijalankan**.

Kalau ditulis sesudahnya, kamu akan menulis apa pun yang keluar — dan pengujiannya **tidak pernah bisa gagal**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA "HASIL YANG DIHARAPKAN" HARUS DITULIS DULU\n#\n# URUTAN YANG BENAR:\n#   1. tulis kasus uji + hasil yang DIHARAPKAN\n#   2. jalankan\n#   3. bandingkan\n#\n# URUTAN YANG SALAH (dan sangat lazim):\n#   1. jalankan programnya\n#   2. lihat keluarannya\n#   3. tulis itu sebagai "hasil yang diharapkan"\n#\n# Cara kedua menghasilkan pengujian yang TIDAK PERNAH\n# BISA GAGAL. Ia cuma mencatat apa yang program lakukan,\n# lalu menyatakan itu benar.\n#\n# Pengujian semacam itu mengunci BUG sebagai perilaku\n# resmi -- dan bug itu jadi mustahil diperbaiki nanti,\n# karena "memperbaikinya" akan MEMBUAT UJIAN GAGAL.',
      penjelasan: `
Kesalahan ini terlihat sepele tetapi **membalikkan seluruh gunanya pengujian**, dan ia sangat sering terjadi karena terasa efisien.

Pikirkan apa yang sebenarnya diperiksa sebuah kasus uji. Ia membandingkan **dua hal**:

- Apa yang program **lakukan**
- Apa yang **seharusnya** program lakukan

Nilai perbandingan itu berasal seluruhnya dari kenyataan bahwa **keduanya ditentukan secara terpisah**. Sisi kanan berasal dari **spesifikasi**; sisi kiri berasal dari **kode**.

Kalau kamu mengisi sisi kanan **dengan menyalin sisi kiri**, kamu bukan lagi membandingkan dua hal. Kamu membandingkan sesuatu **dengan dirinya sendiri**, dan hasilnya selalu cocok.

Pengujian seperti itu **tidak bisa gagal** — bukan karena programnya benar, melainkan karena **tidak ada yang diperiksa**.

Dan akibatnya lebih buruk daripada sekadar tidak berguna.

Bayangkan programnya punya bug: fungsi menghitung diskon memberi 12 persen padahal seharusnya 10. Kamu menjalankannya, melihat angka 12, dan menuliskannya sebagai hasil yang diharapkan.

Sekarang bug itu **berubah status menjadi perilaku resmi**. Enam bulan kemudian, seseorang menemukan kekeliruannya dan memperbaikinya menjadi 10 persen.

**Ujiannya gagal.** Dan orang berikutnya yang melihat kegagalan itu akan menyimpulkan bahwa **perbaikannya yang salah**, lalu mengembalikan bugnya.

Kamu tidak cuma gagal menangkap bug. Kamu **memasang penjaga untuknya**.

Inilah alasan **TDD** menaruh penulisan uji **sebelum** kode: bukan karena urutan itu sakral, melainkan karena ia **memaksa** sisi kanan ditentukan tanpa melihat sisi kiri. Kalau ujinya ditulis lebih dulu, mustahil menyalin keluaran program yang belum ada.

Kaidah praktisnya: **kasus uji yang belum pernah kamu lihat gagal, belum terbukti bisa gagal.** Sebelum memercayainya, rusak sengaja kodenya sebentar dan pastikan ujinya menangkap.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Siklus hidup pengujian & dokumennya
# ============================================

# --------------------------------------------
# 1. Enam tahap STLC beserta syarat masuk/keluar
# --------------------------------------------
STLC = [
    ("Analisis kebutuhan uji",
     "SRS sudah disetujui",
     "daftar yang diuji & tidak diuji disepakati",
     "-"),
    ("Perencanaan",
     "kebutuhan uji sudah dianalisis",
     "test plan disetujui",
     "Test Plan"),
    ("Perancangan kasus uji",
     "test plan disetujui",
     "kasus uji ditinjau & disetujui",
     "Test Case, data uji"),
    ("Penyiapan lingkungan",
     "kasus uji siap",
     "lingkungan berhasil diuji-asap",
     "-"),
    ("Pelaksanaan",
     "lingkungan & kasus uji siap",
     "semua kasus uji dijalankan, cacat dilaporkan",
     "log hasil, laporan cacat"),
    ("Penutupan",
     "pelaksanaan selesai",
     "syarat keluar terpenuhi & disepakati",
     "Test Report"),
]

print("--- enam tahap STLC ---")
for nama, masuk, keluar, dokumen in STLC:
    print("  " + nama)
    print("      syarat masuk : " + masuk)
    print("      syarat keluar: " + keluar)
    print("      menghasilkan : " + dokumen)

print("")
print("  Tanpa syarat keluar yang disepakati, 'pengujian selesai'")
print("  cuma berarti 'waktunya habis'.")


# --------------------------------------------
# 2. V-Model: tiap dokumen punya pasangan ujinya
# --------------------------------------------
print("")
print("--- V-Model: pasangan dokumen dan pengujiannya ---")
V = [
    ("Kebutuhan pengguna",   "Acceptance testing",
     "apakah sistem memenuhi kebutuhan PENGGUNA"),
    ("Spesifikasi sistem",   "System testing",
     "apakah sistem memenuhi SPESIFIKASINYA"),
    ("Perancangan arsitektur","Integration testing",
     "apakah modul-modul bekerja sama dengan benar"),
    ("Perancangan rinci",    "Unit testing",
     "apakah tiap fungsi bekerja sendiri-sendiri"),
]
print("  " + "dokumen (kiri)".ljust(26) + "pengujian (kanan)".ljust(22) +
      "memeriksa")
for kiri, kanan, periksa in V:
    print("  " + kiri.ljust(26) + kanan.ljust(22) + periksa)

print("")
print("  Kasus uji disusun BERSAMAAN dengan dokumen pasangannya,")
print("  bukan belakangan. Manfaatnya bukan sekadar hemat waktu:")
print("  kalau kamu TIDAK BISA menulis kasus uji untuk sebuah")
print("  kebutuhan, berarti kebutuhannya belum cukup jelas --")
print("  dan itu ketahuan SEBELUM kode ditulis.")


# --------------------------------------------
# 3. Tujuh prinsip pengujian
# --------------------------------------------
print("")
print("--- tujuh prinsip pengujian ---")
PRINSIP = [
    ("Menunjukkan adanya cacat",
     "bukan membuktikan ketiadaannya"),
    ("Pengujian menyeluruh mustahil",
     "jumlah kombinasi masukan praktis tak terhingga"),
    ("Uji sedini mungkin",
     "makin awal ditemukan, makin murah diperbaiki"),
    ("Cacat mengelompok",
     "sebagian kecil modul memuat sebagian besar cacat"),
    ("Paradoks pestisida",
     "kasus uji yang sama berhenti menemukan cacat baru"),
    ("Bergantung konteks",
     "menguji aplikasi bank tidak sama dengan menguji permainan"),
    ("Ketiadaan cacat itu menyesatkan",
     "sistem tanpa bug yang tak dibutuhkan siapa pun tetap gagal"),
]
for i, (nama, arti) in enumerate(PRINSIP, 1):
    print("  " + str(i) + ". " + nama)
    print("     " + arti)


# --------------------------------------------
# 4. Kenapa "pengujian menyeluruh mustahil"
# --------------------------------------------
print("")
print("--- kenapa menguji SEMUA kemungkinan mustahil ---")
KASUS = [
    ("Satu kolom umur (0-150)",              151),
    ("Satu kolom teks 8 huruf kecil",        26 ** 8),
    ("Formulir 5 kolom teks 8 huruf",        (26 ** 8) ** 5),
]
for nama, jumlah in KASUS:
    if jumlah < 1e6:
        besar = format(jumlah, ",d").replace(",", ".")
    else:
        besar = "%.2e" % jumlah
    detik = jumlah / 1_000_000          # anggap 1 juta uji per detik
    if detik < 60:
        lama = "%.4f detik" % detik
    elif detik < 86400 * 365:
        lama = "%.1f hari" % (detik / 86400)
    else:
        lama = "%.2e tahun" % (detik / 86400 / 365)
    print("  " + nama.ljust(34) + besar.rjust(12) +
          " kemungkinan   " + lama)

print("")
print("  Bahkan pada sejuta uji per detik, satu formulir")
print("  sederhana butuh waktu melampaui umur alam semesta.")
print("")
print("  Karena itu pengujian selalu soal MEMILIH -- dan")
print("  teknik perancangan kasus uji ada untuk memilih")
print("  yang paling mungkin menemukan cacat.")


# --------------------------------------------
# 5. Cacat mengelompok: jangan sebar usaha merata
# --------------------------------------------
print("")
print("--- cacat mengelompok ---")
MODUL = [
    ("Pembayaran",     2400, 47),
    ("Laporan",        1800,  3),
    ("Autentikasi",     900, 21),
    ("Profil",          600,  2),
    ("Notifikasi",      500,  1),
    ("Pengaturan",      400,  1),
]
total_cacat = sum(c for _, _, c in MODUL)
total_baris = sum(b for _, b, _ in MODUL)

print("  " + "modul".ljust(15) + "baris".rjust(7) + "cacat".rjust(7) +
      "cacat/kbaris".rjust(14) + "  porsi cacat")
for nama, baris, cacat in sorted(MODUL, key=lambda m: -m[2]):
    kepadatan = cacat / baris * 1000
    porsi = cacat / total_cacat * 100
    batang = "#" * int(round(porsi / 2))
    print("  " + nama.ljust(15) + str(baris).rjust(7) +
          str(cacat).rjust(7) + ("%.1f" % kepadatan).rjust(14) +
          ("  %4.1f%% " % porsi) + batang)

dua = sorted(MODUL, key=lambda m: -m[2])[:2]
porsi_cacat = sum(c for _, _, c in dua) / total_cacat * 100
porsi_baris = sum(b for _, b, _ in dua) / total_baris * 100
print("")
print("  Dua modul teratas memuat %.0f%% cacat" % porsi_cacat)
print("  padahal cuma %.0f%% dari seluruh baris kode." % porsi_baris)
print("")
print("  Menyebar usaha pengujian MERATA berarti menghabiskan")
print("  waktu di tempat yang cacatnya sedikit. Modul yang")
print("  sudah pernah bermasalah kemungkinan besar MASIH")
print("  bermasalah -- beri ia perhatian lebih.")


# --------------------------------------------
# 6. Paradoks pestisida
# --------------------------------------------
print("")
print("--- paradoks pestisida ---")
print("  " + "putaran".rjust(8) + "kasus uji".rjust(11) +
      "cacat baru ditemukan".rjust(22))
kasus = 40
sisa_tertangkap = 18       # cacat yang bisa ditangkap kumpulan uji ini
for putaran in range(1, 6):
    ditemukan = sisa_tertangkap
    sisa_tertangkap = 0     # sudah habis setelah putaran pertama
    print("  " + str(putaran).rjust(8) + str(kasus).rjust(11) +
          str(ditemukan).rjust(22))

print("")
print("  Kumpulan uji yang tidak pernah berubah akan berhenti")
print("  menemukan cacat baru -- karena cacat yang BISA ia")
print("  tangkap sudah tertangkap semua di putaran pertama.")
print("")
print("  Ini BUKAN alasan menghapus uji lama: mereka masih")
print("  menjaga dari regresi. Ini alasan MENAMBAH yang baru.")


# --------------------------------------------
# 7. Error, defect, failure
# --------------------------------------------
print("")
print("--- membedakan error, defect, dan failure ---")
RANTAI = [
    ("ERROR (kekeliruan manusia)",
     "programmer salah membaca spesifikasi: mengira diskon 12%"),
    ("DEFECT (cacat di kode)",
     "baris 'diskon = total * 0.12' padahal seharusnya 0.10"),
    ("FAILURE (kegagalan saat jalan)",
     "pelanggan dikenai tagihan lebih murah dari seharusnya"),
]
for nama, contoh in RANTAI:
    print("  " + nama)
    print("      " + contoh)

print("")
print("  Satu error bisa menimbulkan BEBERAPA defect.")
print("  Satu defect bisa menimbulkan BANYAK failure --")
print("  atau TIDAK SATU PUN, kalau barisnya tak pernah dijalankan.")
print("")
print("  Cacat yang belum pernah menimbulkan kegagalan TETAP")
print("  cacat. Ia cuma sedang menunggu.")


# --------------------------------------------
# 8. Isi sebuah Test Case
# --------------------------------------------
print("")
print("--- contoh Test Case ---")
KASUS_UJI = {
    "ID":                "TC-LOGIN-004",
    "Modul":             "Autentikasi",
    "Prasyarat":         "Akun 'hafizh' terdaftar & aktif",
    "Langkah":           "1) buka halaman masuk  "
                         "2) isi username 'hafizh'  "
                         "3) isi sandi salah  "
                         "4) tekan Masuk",
    "Data uji":          "username=hafizh, password=salah123",
    "Hasil diharapkan":  "ditolak; pesan 'Username atau kata sandi salah'; "
                         "tetap di halaman masuk",
    "Hasil sebenarnya":  "(diisi SETELAH dijalankan)",
    "Status":            "(lulus / gagal)",
}
for k, v in KASUS_UJI.items():
    tanda = "   <-- ditulis SEBELUM dijalankan" if k == "Hasil diharapkan" else ""
    print("  " + (k + ":").ljust(20) + v + tanda)

print("")
print("  Kalau 'hasil diharapkan' diisi SETELAH melihat keluaran")
print("  program, pengujiannya TIDAK PERNAH BISA GAGAL -- ia cuma")
print("  mencatat apa yang program lakukan lalu menyebutnya benar.")


# --------------------------------------------
# 9. Membuktikan sebuah uji benar-benar bisa gagal
# --------------------------------------------
print("")
print("--- uji yang belum pernah gagal, belum terbukti bisa gagal ---")

def diskon_benar(total):
    return total * 0.10

def diskon_cacat(total):
    return total * 0.12

def uji_diskon(fungsi):
    """Hasil diharapkan ditulis dari SPESIFIKASI: diskon 10%."""
    return abs(fungsi(200_000) - 20_000) < 0.01

print("  spesifikasi: diskon 10 persen")
print("  hasil diharapkan untuk total 200.000 -> 20.000")
print("")
print("  versi benar  -> uji %s" % ("LULUS" if uji_diskon(diskon_benar) else "GAGAL"))
print("  versi cacat  -> uji %s" % ("LULUS" if uji_diskon(diskon_cacat) else "GAGAL"))
print("")
print("  Uji ini terbukti BISA membedakan keduanya.")
print("  Kalau versi cacat pun LULUS, ujinya yang tidak berguna --")
print("  bukan kodenya yang benar.")
print("")
print("  Karena itu: sebelum memercayai sebuah uji, rusak sengaja")
print("  kodenya sebentar dan pastikan ujinya menangkap.")`
  },

  output: `--- enam tahap STLC ---
  Analisis kebutuhan uji
      syarat masuk : SRS sudah disetujui
      syarat keluar: daftar yang diuji & tidak diuji disepakati
      menghasilkan : -
  Perencanaan
      syarat masuk : kebutuhan uji sudah dianalisis
      syarat keluar: test plan disetujui
      menghasilkan : Test Plan
  Perancangan kasus uji
      syarat masuk : test plan disetujui
      syarat keluar: kasus uji ditinjau & disetujui
      menghasilkan : Test Case, data uji
  Penyiapan lingkungan
      syarat masuk : kasus uji siap
      syarat keluar: lingkungan berhasil diuji-asap
      menghasilkan : -
  Pelaksanaan
      syarat masuk : lingkungan & kasus uji siap
      syarat keluar: semua kasus uji dijalankan, cacat dilaporkan
      menghasilkan : log hasil, laporan cacat
  Penutupan
      syarat masuk : pelaksanaan selesai
      syarat keluar: syarat keluar terpenuhi & disepakati
      menghasilkan : Test Report

  Tanpa syarat keluar yang disepakati, 'pengujian selesai'
  cuma berarti 'waktunya habis'.

--- V-Model: pasangan dokumen dan pengujiannya ---
  dokumen (kiri)            pengujian (kanan)     memeriksa
  Kebutuhan pengguna        Acceptance testing    apakah sistem memenuhi kebutuhan PENGGUNA
  Spesifikasi sistem        System testing        apakah sistem memenuhi SPESIFIKASINYA
  Perancangan arsitektur    Integration testing   apakah modul-modul bekerja sama dengan benar
  Perancangan rinci         Unit testing          apakah tiap fungsi bekerja sendiri-sendiri

  Kasus uji disusun BERSAMAAN dengan dokumen pasangannya,
  bukan belakangan. Manfaatnya bukan sekadar hemat waktu:
  kalau kamu TIDAK BISA menulis kasus uji untuk sebuah
  kebutuhan, berarti kebutuhannya belum cukup jelas --
  dan itu ketahuan SEBELUM kode ditulis.

--- tujuh prinsip pengujian ---
  1. Menunjukkan adanya cacat
     bukan membuktikan ketiadaannya
  2. Pengujian menyeluruh mustahil
     jumlah kombinasi masukan praktis tak terhingga
  3. Uji sedini mungkin
     makin awal ditemukan, makin murah diperbaiki
  4. Cacat mengelompok
     sebagian kecil modul memuat sebagian besar cacat
  5. Paradoks pestisida
     kasus uji yang sama berhenti menemukan cacat baru
  6. Bergantung konteks
     menguji aplikasi bank tidak sama dengan menguji permainan
  7. Ketiadaan cacat itu menyesatkan
     sistem tanpa bug yang tak dibutuhkan siapa pun tetap gagal

--- kenapa menguji SEMUA kemungkinan mustahil ---
  Satu kolom umur (0-150)                    151 kemungkinan   0.0002 detik
  Satu kolom teks 8 huruf kecil         2.09e+11 kemungkinan   2.4 hari
  Formulir 5 kolom teks 8 huruf         3.97e+56 kemungkinan   1.26e+43 tahun

  Bahkan pada sejuta uji per detik, satu formulir
  sederhana butuh waktu melampaui umur alam semesta.

  Karena itu pengujian selalu soal MEMILIH -- dan
  teknik perancangan kasus uji ada untuk memilih
  yang paling mungkin menemukan cacat.

--- cacat mengelompok ---
  modul            baris  cacat  cacat/kbaris  porsi cacat
  Pembayaran        2400     47          19.6  62.7% ###############################
  Autentikasi        900     21          23.3  28.0% ##############
  Laporan           1800      3           1.7   4.0% ##
  Profil             600      2           3.3   2.7% #
  Notifikasi         500      1           2.0   1.3% #
  Pengaturan         400      1           2.5   1.3% #

  Dua modul teratas memuat 91% cacat
  padahal cuma 50% dari seluruh baris kode.

  Menyebar usaha pengujian MERATA berarti menghabiskan
  waktu di tempat yang cacatnya sedikit. Modul yang
  sudah pernah bermasalah kemungkinan besar MASIH
  bermasalah -- beri ia perhatian lebih.

--- paradoks pestisida ---
   putaran  kasus uji  cacat baru ditemukan
         1         40                    18
         2         40                     0
         3         40                     0
         4         40                     0
         5         40                     0

  Kumpulan uji yang tidak pernah berubah akan berhenti
  menemukan cacat baru -- karena cacat yang BISA ia
  tangkap sudah tertangkap semua di putaran pertama.

  Ini BUKAN alasan menghapus uji lama: mereka masih
  menjaga dari regresi. Ini alasan MENAMBAH yang baru.

--- membedakan error, defect, dan failure ---
  ERROR (kekeliruan manusia)
      programmer salah membaca spesifikasi: mengira diskon 12%
  DEFECT (cacat di kode)
      baris 'diskon = total * 0.12' padahal seharusnya 0.10
  FAILURE (kegagalan saat jalan)
      pelanggan dikenai tagihan lebih murah dari seharusnya

  Satu error bisa menimbulkan BEBERAPA defect.
  Satu defect bisa menimbulkan BANYAK failure --
  atau TIDAK SATU PUN, kalau barisnya tak pernah dijalankan.

  Cacat yang belum pernah menimbulkan kegagalan TETAP
  cacat. Ia cuma sedang menunggu.

--- contoh Test Case ---
  ID:                 TC-LOGIN-004
  Modul:              Autentikasi
  Prasyarat:          Akun 'hafizh' terdaftar & aktif
  Langkah:            1) buka halaman masuk  2) isi username 'hafizh'  3) isi sandi salah  4) tekan Masuk
  Data uji:           username=hafizh, password=salah123
  Hasil diharapkan:   ditolak; pesan 'Username atau kata sandi salah'; tetap di halaman masuk   <-- ditulis SEBELUM dijalankan
  Hasil sebenarnya:   (diisi SETELAH dijalankan)
  Status:             (lulus / gagal)

  Kalau 'hasil diharapkan' diisi SETELAH melihat keluaran
  program, pengujiannya TIDAK PERNAH BISA GAGAL -- ia cuma
  mencatat apa yang program lakukan lalu menyebutnya benar.

--- uji yang belum pernah gagal, belum terbukti bisa gagal ---
  spesifikasi: diskon 10 persen
  hasil diharapkan untuk total 200.000 -> 20.000

  versi benar  -> uji LULUS
  versi cacat  -> uji GAGAL

  Uji ini terbukti BISA membedakan keduanya.
  Kalau versi cacat pun LULUS, ujinya yang tidak berguna --
  bukan kodenya yang benar.

  Karena itu: sebelum memercayai sebuah uji, rusak sengaja
  kodenya sebentar dan pastikan ujinya menangkap.`,

  kesalahanUmum: [
    {
      salah: 'Mulai merancang kasus uji setelah kode selesai ditulis.',
      kenapa: 'STLC berjalan sejajar dengan pembangunan, sehingga perancangan kasus uji seharusnya sudah selesai sebelum kode ada. Menundanya menghilangkan manfaat terbesarnya, yaitu memaksa dokumen kebutuhan diperiksa: kalau kasus uji tidak bisa ditulis untuk sebuah kebutuhan, berarti kebutuhannya belum cukup jelas.',
      benar: 'Susun kasus uji bersamaan dengan dokumen pasangannya menurut V-Model, dan perlakukan kesulitan menulisnya sebagai temuan tentang kebutuhannya.'
    },
    {
      salah: 'Mengisi kolom hasil yang diharapkan setelah menjalankan programnya.',
      kenapa: 'Kasus uji bekerja dengan membandingkan apa yang program lakukan terhadap apa yang seharusnya, dan nilainya berasal dari kenyataan bahwa keduanya ditentukan terpisah. Menyalin keluaran program ke kolom harapan membuat perbandingannya menjadi sesuatu dengan dirinya sendiri, sehingga ujinya tidak pernah bisa gagal.',
      benar: 'Tulis hasil yang diharapkan dari spesifikasi sebelum kasus uji dijalankan, dan buktikan ujinya bisa gagal dengan merusak kodenya sengaja sekali.'
    },
    {
      salah: 'Menyebar usaha pengujian secara merata ke seluruh modul.',
      kenapa: 'Cacat mengelompok, sehingga sebagian kecil modul memuat sebagian besar cacat. Pembagian yang merata menghabiskan waktu di modul yang cacatnya memang sedikit, sementara modul yang paling bermasalah kurang diperiksa.',
      benar: 'Alokasikan usaha berdasarkan riwayat cacat dan tingkat risiko, dan beri perhatian lebih pada modul yang sudah pernah bermasalah.'
    },
    {
      salah: 'Menganggap kumpulan uji yang selalu lulus sebagai tanda mutu yang baik.',
      kenapa: 'Paradoks pestisida menyatakan kasus uji yang tidak pernah berubah akan berhenti menemukan cacat baru karena cacat yang bisa ia tangkap sudah habis tertangkap. Kumpulan uji yang selalu hijau bisa berarti kodenya baik, atau bisa berarti ujinya sudah tidak menguji apa-apa lagi.',
      benar: 'Tambahkan kasus uji baru secara berkala, terutama untuk cacat yang baru ditemukan, dan pertahankan yang lama sebagai penjaga regresi.'
    },
    {
      salah: 'Memakai kata error, defect, dan failure secara bergantian.',
      kenapa: 'Ketiganya menunjuk tahap yang berbeda pada satu rantai: kekeliruan manusia menghasilkan cacat di kode, dan cacat itu baru menjadi kegagalan ketika barisnya dijalankan. Menyamakannya membuat laporan cacat kabur dan menyulitkan penelusuran sebabnya.',
      benar: 'Sebut error untuk kekeliruan manusia, defect untuk cacat di kode, dan failure untuk perilaku salah yang teramati saat program berjalan.'
    },
    {
      salah: 'Menyatakan pengujian selesai tanpa syarat keluar yang disepakati lebih dulu.',
      kenapa: 'Tanpa syarat keluar, pernyataan selesai hanya berarti waktunya habis atau tenggatnya tiba. Tidak ada dasar untuk menilai apakah cakupannya memadai, dan keputusan merilis diambil tanpa ukuran.',
      benar: 'Tetapkan syarat masuk dan keluar untuk tiap tahap STLC sejak perencanaan, misalnya cakupan cabang minimal sekian persen dan tidak ada cacat tingkat tinggi yang terbuka.'
    }
  ],

  analogi: `Bayangkan **inspeksi bangunan**.

**Cara yang buruk** adalah menunggu gedungnya berdiri sepenuhnya, lalu memanggil inspektur dan berkata: *"silakan periksa."*

Inspektur itu masuk, dan ia menghadapi dua persoalan sekaligus.

Pertama, **banyak yang tidak bisa lagi diperiksa** — pondasi sudah tertutup lantai, kabel sudah tertutup tembok. Ia cuma bisa menilai apa yang **masih terlihat**.

Kedua, dan lebih buruk: kalau ia menemukan masalah pada pondasi, **memperbaikinya berarti membongkar gedungnya**.

**Cara yang benar** — dan inilah **STLC** — adalah inspektur bekerja **sejak gambar teknik disetujui**, dengan **jadwal pemeriksaannya sendiri** yang berjalan sejajar dengan pembangunan.

Sebelum pondasi dicor, ia sudah menyiapkan **daftar apa yang akan diperiksa**. Dan itulah **V-Model**: setiap tahap pembangunan **punya pasangan pemeriksaannya**, dan daftar pemeriksaan disusun **bersamaan dengan gambarnya**.

Sekarang perhatikan manfaat yang tidak terduga dari menyusun daftar itu **lebih dulu**.

Kalau inspektur membaca gambar dan berkata *"saya tidak tahu bagaimana memeriksa apakah ini sesuai — gambarnya tidak menyebutkan ukurannya"* — maka ia **baru saja menemukan cacat pada gambar**, sebelum satu sak semen pun dibeli.

Itu **bukan pekerjaan pengujian**. Itu **hadiah dari** pekerjaan pengujian.

Sekarang bagian yang paling penting: **kolom "hasil yang diharapkan"**.

Bayangkan inspektur yang **mengukur tebal tembok dulu**, mendapat 12 sentimeter, lalu menuliskan di lembar pemeriksaannya: *"tebal tembok seharusnya 12 cm — SESUAI."*

Ia tidak sedang memeriksa apa pun. Ia sedang **mencatat**, lalu menyebut catatannya sebagai standar.

Dan akibatnya berlapis. Kalau tembok itu **memang seharusnya 15 sentimeter**, maka kesalahannya kini **tercatat sebagai standar resmi**.

Tahun depan, ada yang menyadari kekeliruannya dan membangun tembok 15 sentimeter dengan benar.

Lembar pemeriksaan menyatakan: **TIDAK SESUAI.**

Dan orang berikutnya akan **membongkar tembok yang benar**, untuk menyesuaikannya dengan catatan yang salah.`,

  latihan: [
    'Jelaskan perbedaan SDLC dan STLC, dan sebutkan akibat praktis dari memandang pengujian sebagai siklus tersendiri.',
    'Sebutkan enam tahap STLC beserta dokumen yang dihasilkan masing-masing.',
    'Jelaskan apa itu V-Model, dan sebutkan empat pasangan dokumen dengan tingkat pengujiannya.',
    'Sebutkan tujuh prinsip pengujian beserta arti singkatnya.',
    'Jelaskan prinsip cacat mengelompok dan apa akibatnya bagi cara mengalokasikan usaha pengujian.',
    'Jelaskan paradoks pestisida, dan jelaskan kenapa ia bukan alasan menghapus kasus uji lama.',
    'Jelaskan perbedaan error, defect, dan failure dengan satu rantai contoh yang menghubungkan ketiganya.',
    'Jelaskan kenapa kolom hasil yang diharapkan harus ditulis sebelum kasus uji dijalankan, dan apa yang terjadi kalau ditulis sesudahnya.',
    'Tulis satu Test Case lengkap untuk fitur pendaftaran akun, dengan seluruh kolom terisi kecuali hasil sebenarnya.'
  ]
});

TOPICS.push({
  id: 'ukpl-teknik-lanjut',
  judul: 'Teknik Perancangan Kasus Uji',
  kategori: 'ukpl',
  tag: ['decision table', 'state transition', 'cyclomatic complexity', 'basis path', 'grey box'],
  ringkas: 'Cara memilih sedikit kasus uji yang menemukan banyak cacat — termasuk menghitung jumlah minimalnya.',

  fungsi: `**Memilih sedikit kasus uji yang menemukan banyak cacat.**

Menguji semua kemungkinan mustahil, jadi seluruh keterampilan pengujian adalah keterampilan **memilih**.

Terpakai di:

- **Merancang kasus uji** yang efisien
- **Menghitung jumlah minimalnya** dengan cyclomatic complexity
- **Menemukan lubang spesifikasi** lewat decision table
- **Menguji alur berkeadaan** — status pesanan, alur persetujuan

Yang paling sering terlewat: **perpindahan keadaan yang TIDAK sah**.

Jumlahnya jauh lebih banyak daripada yang sah, dan justru di situ cacat bersembunyi — karena programmer memikirkan alur normal dan lupa apa yang terjadi kalau tombol ditekan dua kali.`,

  praktik: {
    tujuan: `Kamu bisa menghitung jumlah kasus uji minimal dan merancangnya dengan teknik yang tepat untuk tiap jenis logika.`,
    alat: [
      'Python 3',
      'Spreadsheet',
      'Kode dari proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Hitung cyclomatic complexity fungsimu',
        isi: `Hitung: jumlah \`if\`, \`elif\`, \`while\`, \`for\`, \`case\`, \`except\`, ditambah setiap \`and\` dan \`or\` di dalam syarat, lalu tambah satu.

Yang paling sering terlewat adalah \`and\` dan \`or\` — satu \`if\` dengan tiga syarat berarti empat, bukan dua.

Angka itu adalah **jumlah kasus uji minimalmu**.` },
      { judul: 'Pakai alat untuk memeriksa',
        isi: `- \`pip install radon\` lalu \`radon cc -s berkasmu.py\`

Bandingkan dengan hitungan tanganmu. Kalau berbeda, biasanya kamu melewatkan operator logika.

Perlakukan nilai di atas sepuluh sebagai peringatan untuk **memecah fungsinya**, bukan sekadar menulis lebih banyak uji.` },
      { judul: 'Susun decision table untuk aturan berlapis',
        isi: `Untuk aturan dengan beberapa syarat, buat tabel **semua** kombinasinya — \`2^n\` baris.

Isi kolom tindakannya. Sel yang **kosong** berarti aturannya belum ditetapkan siapa pun.

Itu temuan spesifikasi, dan jauh lebih berharga daripada temuan bug.` },
      { judul: 'Buat matriks keadaan dikali aksi',
        isi: `Untuk alur berkeadaan, buat tabel: baris keadaan, kolom aksi.

Isi sel yang sah dengan keadaan tujuannya, dan tandai yang tidak sah.

Hitung keduanya — yang tidak sah biasanya jauh lebih banyak.` },
      { judul: 'Uji perpindahan yang TIDAK sah',
        isi: `Uji: membatalkan pesanan yang sudah selesai, membayar dua kali, mengirim barang yang belum dibayar.

Ketiganya harus **ditolak** dengan pesan yang jelas.

Ini kelompok kasus uji yang paling sering dilewatkan, dan paling sering menemukan bug.` },
      { judul: 'Pakai matrix testing pada variabel',
        isi: `Daftar variabel yang dipakai sebuah modul beserta cara pemakaiannya.

Cari yang **ditulis tetapi tidak pernah dibaca** — itu kode mati. Dan yang **dibaca sebelum diisi** — itu cacat.

Keduanya ketahuan tanpa membaca seluruh kodenya.` },
      { judul: 'Terapkan pattern testing',
        isi: `Telaah riwayat bug proyekmu dan cari **pola** — jenis kesalahan yang berulang di modul berbeda.

Lalu cari modul lain yang belum diuji dengan pola itu.

Ini masuk akal justru karena cacat mengelompok: kesalahan yang pernah terjadi cenderung terulang di kode yang ditulis dengan cara serupa.` }
    ],
    cek: [
      'Hitungan tanganmu cocok dengan hasil radon',
      'Decision table-mu tidak punya sel kosong yang belum ditetapkan',
      'Setiap perpindahan keadaan yang tidak sah ditolak dengan pesan jelas'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa jumlahnya bisa dihitung',

  konsep: `
Menguji semua kemungkinan **mustahil**. Karena itu seluruh teknik di bawah ini punya satu tujuan yang sama: **memilih sedikit kasus uji yang paling mungkin menemukan cacat**.

Di RPL kamu sudah belajar dua yang paling dasar — **equivalence partitioning** dan **boundary value analysis**. Berikut yang lebih rumit.

**Decision table testing**

Dipakai ketika keputusan bergantung pada **beberapa syarat yang saling berkaitan**.

Tabelnya menyusun **semua kombinasi syarat** beserta tindakan yang seharusnya. Untuk *n* syarat biner, ada **2ⁿ** kombinasi.

Manfaat terbesarnya bukan menemukan cacat pada kode, melainkan **menemukan lubang pada spesifikasi**. Ketika kamu mengisi tabelnya, kombinasi yang **belum ditentukan jawabannya** langsung terlihat sebagai sel kosong.

Setelah tabel lengkap, kolom yang **tindakannya sama dan syaratnya tidak berpengaruh** bisa digabung — disebut penyederhanaan dengan *don't care*.

**State transition testing**

Dipakai ketika sistem punya **keadaan** dan perilakunya bergantung pada **keadaan sekarang**, bukan cuma pada masukan.

Contoh: mesin ATM, status pesanan, alur persetujuan, pemutar musik.

Yang diuji ada empat macam:

- Setiap **keadaan** bisa dicapai
- Setiap **perpindahan sah** berjalan
- Setiap **perpindahan tidak sah** ditolak
- Setiap **keadaan akhir** bisa dicapai dari keadaan awal

**Perpindahan tidak sah justru yang paling sering bermasalah** — karena programmer memikirkan alur normal, dan lupa apa yang terjadi kalau pengguna menekan "Bayar" dua kali.

**Cyclomatic complexity**

Ukuran dari **Thomas McCabe (1976)**: berapa banyak **jalur bebas linier** di dalam sebuah fungsi.

Cara menghitungnya yang paling praktis: **jumlah titik keputusan + 1**.

Titik keputusan adalah setiap \`if\`, \`elif\`, \`while\`, \`for\`, \`case\`, dan setiap operator \`and\` / \`or\` di dalam syarat.

Angkanya berguna karena **dua hal sekaligus**:

- Ia adalah **batas atas** jumlah kasus uji yang dibutuhkan untuk *branch coverage*
- Ia adalah **batas bawah** jumlah jalur yang harus dilalui untuk *basis path coverage*

Jadi ia sekaligus menjawab *"seberapa rumit fungsi ini?"* dan *"berapa kasus uji minimal yang saya butuhkan?"*

**Patokan yang lazim dipakai:**

- **1–10** — sederhana, risiko rendah
- **11–20** — cukup rumit, risiko sedang
- **21–50** — rumit, risiko tinggi
- **> 50** — sangat rumit, hampir tidak bisa diuji dengan baik

**Basis path testing**

Memakai cyclomatic complexity untuk menentukan **berapa jalur** yang harus diuji, lalu memilih **jalur bebas linier** — jalur yang masing-masing memuat **setidaknya satu sisi baru** yang belum dilalui jalur sebelumnya.

**Grey box testing**

Di antara black box dan white box: penguji **tahu sebagian** struktur dalamnya — biasanya skema basis data, rancangan antarmuka, atau alur data — tetapi **tidak melihat seluruh kodenya**.

Dua teknik yang disebut di silabus:

- **Matrix testing** — memeriksa variabel yang dipakai sebuah modul, lalu menilai risiko dan pemakaiannya. Variabel yang **tidak pernah dipakai** atau **dipakai tanpa diisi** langsung ketahuan.
- **Pattern testing** — menelaah **cacat masa lalu** untuk menemukan polanya, lalu merancang kasus uji yang mengincar pola yang sama di tempat lain.

Pattern testing masuk akal justru karena **cacat mengelompok**: kalau sebuah jenis kesalahan pernah terjadi, ia **cenderung terulang** di modul lain yang ditulis dengan cara serupa.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA CYCLOMATIC COMPLEXITY = TITIK KEPUTUSAN + 1\n#\n# def f(a, b):\n#     if a > 0:          <- keputusan 1\n#         x = 1\n#     else:\n#         x = 2\n#     if b > 0:          <- keputusan 2\n#         y = 1\n#     return x + y\n#\n# Jalur yang mungkin:\n#   a>0 & b>0     a>0 & b<=0\n#   a<=0 & b>0    a<=0 & b<=0\n#\n# Tapi JALUR BEBAS LINIER cuma 3: tiap jalur baru\n# harus memuat setidaknya satu SISI yang belum\n# pernah dilalui. Jalur keempat tidak menambah\n# sisi baru mana pun.\n#\n#   V(G) = 2 keputusan + 1 = 3\n#\n# Perhatikan: "and" dan "or" JUGA dihitung, karena\n# keduanya membuat cabang tersembunyi.',
      penjelasan: `
Rumus **titik keputusan + 1** terlihat seperti aturan hafalan, tetapi ia punya alasan yang bisa dilihat.

Bayangkan alur sebuah fungsi sebagai **peta jalan**: satu titik masuk, satu titik keluar, dan percabangan di antaranya.

Setiap **percabangan menambah tepat satu jalur baru** ke peta itu. Fungsi tanpa percabangan sama sekali punya **satu** jalur — dari masuk langsung ke keluar. Tambah satu \`if\`, dan sekarang ada **dua**. Tambah satu lagi, jadi **tiga**.

Karena itu \`V(G) = jumlah percabangan + 1\`.

Sekarang perhatikan hal yang paling sering membingungkan: **kenapa jalur bebas linier lebih sedikit daripada kombinasi masukan?**

Pada contoh di atas ada **empat** kombinasi \`a\` dan \`b\`, tetapi \`V(G)\` cuma **3**.

Sebabnya, yang dihitung bukan kombinasi, melainkan **jalur yang menambah sesuatu yang baru**. Setelah kamu melalui tiga jalur pertama, **setiap sisi pada peta sudah pernah dilewati**. Jalur keempat cuma menggabungkan sisi-sisi yang sudah dikenal.

Dari sudut pandang *coverage*, jalur keempat **tidak menambah apa-apa**.

Sekarang bagian yang paling berguna secara praktis, dan sering dilewatkan: **\`and\` dan \`or\` ikut dihitung.**

Baris ini terlihat seperti satu keputusan:

- \`if usia >= 17 and punya_ktp and not diblokir:\`

Padahal ia **tiga** keputusan. Python berhenti mengevaluasi begitu ada yang \`False\` — disebut *short-circuit* — sehingga ada **tiga titik** tempat alurnya bisa berbelok.

Akibatnya nyata: fungsi yang tampak sederhana karena cuma punya dua \`if\` bisa punya \`V(G)\` **delapan** kalau syaratnya panjang-panjang. Dan itu berarti kamu butuh **delapan** kasus uji, bukan tiga.

Terakhir, alasan angka ini layak dipantau **sebelum** menulis uji: **V(G) yang tinggi adalah tanda fungsi itu perlu dipecah.**

Fungsi ber-\`V(G)\` 30 tidak cuma sulit diuji — ia sulit **dibaca**, sulit **diubah**, dan hampir pasti punya **lebih dari satu tanggung jawab**. Memecahnya menurunkan angkanya sekaligus memperbaiki rancangannya.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Teknik perancangan kasus uji lanjutan
# ============================================
import itertools
import re


# --------------------------------------------
# 1. DECISION TABLE
# --------------------------------------------
SYARAT = ["anggota", "belanja >= 500rb", "punya kupon"]

def diskon(anggota, banyak, kupon):
    """Aturan yang DIMAKSUD:
       anggota + banyak            -> 20%
       anggota saja                -> 10%
       banyak saja                 -> 5%
       kupon menambah 5% (kalau ada diskon lain)
       bukan anggota, sedikit, tanpa kupon -> 0%"""
    d = 0
    if anggota and banyak: d = 20
    elif anggota:          d = 10
    elif banyak:           d = 5
    if kupon and d > 0:    d += 5
    elif kupon:            d = 5
    return d


print("--- decision table: semua kombinasi syarat ---")
print("  " + "".join(s.ljust(19) for s in SYARAT) + "diskon")
tabel = []
for kombinasi in itertools.product([True, False], repeat=3):
    hasil = diskon(*kombinasi)
    tabel.append((kombinasi, hasil))
    print("  " + "".join(("ya" if k else "tidak").ljust(19)
                         for k in kombinasi) + str(hasil) + "%")

print("")
print("  " + str(len(tabel)) + " baris untuk 3 syarat biner (2 pangkat 3).")
print("")
print("  Manfaat terbesarnya BUKAN menemukan cacat pada kode,")
print("  melainkan menemukan LUBANG pada spesifikasi: kombinasi")
print("  yang belum ditentukan jawabannya langsung terlihat.")

# Menggabungkan baris yang salah satu syaratnya tidak berpengaruh
print("")
print("  --- penyederhanaan: syarat yang tidak berpengaruh ---")
digabung = 0
for a in [True, False]:
    for b in [True, False]:
        h1, h2 = diskon(a, b, True), diskon(a, b, False)
        if h1 == h2:
            digabung += 1
            print("      anggota=%-5s banyak=%-5s -> kupon TIDAK berpengaruh"
                  % (a, b))
if digabung == 0:
    print("      (tidak ada; kupon selalu berpengaruh)")


# --------------------------------------------
# 2. STATE TRANSITION
# --------------------------------------------
print("")
print("--- state transition: status pesanan ---")

TRANSISI = {
    ("baru",      "bayar"):   "dibayar",
    ("baru",      "batal"):   "dibatalkan",
    ("dibayar",   "kirim"):   "dikirim",
    ("dibayar",   "batal"):   "dibatalkan",
    ("dikirim",   "terima"):  "selesai",
    ("dikirim",   "kembali"): "dikembalikan",
}
KEADAAN = ["baru", "dibayar", "dikirim", "selesai",
           "dibatalkan", "dikembalikan"]
AKSI = ["bayar", "kirim", "terima", "batal", "kembali"]

print("  " + "dari \\ aksi".ljust(15) + "".join(a.ljust(14) for a in AKSI))
for k in KEADAAN:
    baris = []
    for a in AKSI:
        baris.append(TRANSISI.get((k, a), "-"))
    print("  " + k.ljust(15) + "".join(b.ljust(14) for b in baris))

sah = len(TRANSISI)
semua = len(KEADAAN) * len(AKSI)
print("")
print("  perpindahan SAH        : %d" % sah)
print("  perpindahan TIDAK SAH  : %d" % (semua - sah))
print("")
print("  Yang tidak sah jumlahnya JAUH lebih banyak -- dan")
print("  justru di situ cacat paling sering bersembunyi, karena")
print("  programmer memikirkan alur normal dan lupa apa yang")
print("  terjadi kalau pengguna menekan 'Bayar' dua kali.")

print("")
print("  --- menguji perpindahan TIDAK SAH ---")
UJI_TIDAK_SAH = [
    ("selesai",     "batal",  "pesanan selesai tidak boleh dibatalkan"),
    ("dibatalkan",  "bayar",  "pesanan batal tidak boleh dibayar"),
    ("baru",        "kirim",  "belum dibayar tidak boleh dikirim"),
    ("dibayar",     "bayar",  "tidak boleh dibayar dua kali"),
]
for dari, aksi, alasan in UJI_TIDAK_SAH:
    hasil = TRANSISI.get((dari, aksi))
    status = "DITOLAK (benar)" if hasil is None else "DITERIMA -- CACAT!"
    print("      %-12s + %-8s -> %-20s %s" % (dari, aksi, status, alasan))


# --------------------------------------------
# 3. CYCLOMATIC COMPLEXITY
# --------------------------------------------
def hitung_vg(kode):
    """V(G) = jumlah titik keputusan + 1.
       Titik keputusan: if, elif, while, for, and, or,
       serta except dan ekspresi kondisional."""
    tanpa_komentar = "\n".join(
        b.split("#")[0] for b in kode.split("\n"))
    n = 0
    for pola in [r"\bif\b", r"\belif\b", r"\bwhile\b", r"\bfor\b",
                 r"\band\b", r"\bor\b", r"\bexcept\b"]:
        n += len(re.findall(pola, tanpa_komentar))
    return n + 1


CONTOH = [
    ("tanpa percabangan", '''
def luas(p, l):
    return p * l
'''),
    ("satu if", '''
def absolut(x):
    if x < 0:
        return -x
    return x
'''),
    ("dua if terpisah", '''
def f(a, b):
    if a > 0:
        x = 1
    else:
        x = 2
    if b > 0:
        y = 1
    else:
        y = 0
    return x + y
'''),
    ("satu if, syarat panjang", '''
def boleh_daftar(usia, punya_ktp, diblokir):
    if usia >= 17 and punya_ktp and not diblokir:
        return True
    return False
'''),
    ("banyak cabang", '''
def nilai_huruf(n):
    if n >= 85: return "A"
    elif n >= 75: return "B"
    elif n >= 65: return "C"
    elif n >= 55: return "D"
    else: return "E"
'''),
]

def tafsir(vg):
    if vg <= 10: return "sederhana, risiko rendah"
    if vg <= 20: return "cukup rumit, risiko sedang"
    if vg <= 50: return "rumit, risiko tinggi"
    return "sangat rumit, hampir tak bisa diuji baik"


print("")
print("--- cyclomatic complexity ---")
print("  " + "fungsi".ljust(26) + "V(G)".rjust(6) +
      "kasus uji minimal".rjust(20) + "  tafsiran")
for nama, kode in CONTOH:
    vg = hitung_vg(kode)
    print("  " + nama.ljust(26) + str(vg).rjust(6) +
          str(vg).rjust(20) + "  " + tafsir(vg))

print("")
print("  Perhatikan baris keempat: fungsinya cuma punya SATU if,")
print("  tapi V(G)-nya 4 -- karena kedua 'and'-nya ikut dihitung")
print("  sebagai titik keputusan (1 if + 2 and, lalu ditambah 1).")
print("  Python berhenti mengevaluasi begitu ada yang False")
print("  (short-circuit), jadi ada beberapa titik tempat alurnya")
print("  bisa berbelok -- meski ditulis dalam satu baris.")


# --------------------------------------------
# 4. Membuktikan V(G) memang jumlah kasus uji minimal
# --------------------------------------------
print("")
print("--- membuktikan V(G) = jumlah kasus uji minimal ---")

def boleh_daftar(usia, punya_ktp, diblokir):
    if usia >= 17 and punya_ktp and not diblokir:
        return True
    return False


# Tiap kasus uji dipilih supaya menyentuh CABANG yang belum tersentuh
BASIS = [
    ((20, True,  False), True,  "semua syarat terpenuhi"),
    ((15, True,  False), False, "gagal di syarat PERTAMA (usia)"),
    ((20, False, False), False, "gagal di syarat KEDUA (ktp)"),
    ((20, True,  True),  False, "gagal di syarat KETIGA (diblokir)"),
]
print("  " + "masukan".ljust(24) + "harapan".rjust(9) +
      "hasil".rjust(8) + "   cabang yang disentuh")
lulus = 0
for masukan, harapan, ket in BASIS:
    hasil = boleh_daftar(*masukan)
    cocok = hasil == harapan
    lulus += cocok
    print("  " + str(masukan).ljust(24) + str(harapan).rjust(9) +
          str(hasil).rjust(8) + "   " + ket)

print("")
print("  %d kasus uji, dan V(G) fungsi ini = %d -- cocok."
      % (len(BASIS), hitung_vg('''
def boleh_daftar(usia, punya_ktp, diblokir):
    if usia >= 17 and punya_ktp and not diblokir:
        return True
    return False
''')))
print("")
print("  Menghapus salah satu kasus uji akan menyisakan cabang")
print("  yang tidak pernah dijalankan. Menambah kasus kelima")
print("  tidak menyentuh cabang baru mana pun.")


# --------------------------------------------
# 5. Kenapa V(G) tinggi = tanda perlu dipecah
# --------------------------------------------
print("")
print("--- V(G) tinggi bukan cuma soal pengujian ---")
BESAR = '''
def proses_pesanan(p):
    if p.status == "baru":
        if p.bayar and p.stok_ada:
            if p.pelanggan_vip or p.total > 1000000:
                if p.alamat_lengkap and p.telepon_valid:
                    for item in p.barang:
                        if item.berat > 20 or item.rapuh:
                            if item.asuransi:
                                pass
                            elif item.nilai > 500000:
                                pass
    return p
'''
vg = hitung_vg(BESAR)
print("  contoh fungsi bersarang dalam: V(G) = %d  (%s)" % (vg, tafsir(vg)))
print("")
print("  Fungsi ber-V(G) tinggi tidak cuma SULIT DIUJI.")
print("  Ia sulit dibaca, sulit diubah, dan hampir pasti punya")
print("  LEBIH DARI SATU tanggung jawab.")
print("")
print("  Memecahnya menurunkan angkanya SEKALIGUS memperbaiki")
print("  rancangannya -- persis 'single responsibility' yang")
print("  kamu pelajari di Rekayasa Perangkat Lunak.")


# --------------------------------------------
# 6. GREY BOX: matrix testing
# --------------------------------------------
print("")
print("--- grey box: matrix testing ---")
VARIABEL = [
    ("total_bayar",  "dibaca & ditulis", "tinggi",  "uang pelanggan"),
    ("diskon",       "dibaca & ditulis", "tinggi",  "memengaruhi tagihan"),
    ("nama_kurir",   "hanya dibaca",     "rendah",  "cuma ditampilkan"),
    ("temp_hitung",  "ditulis, TAK PERNAH dibaca", "?",
     "kode mati atau lupa dipakai"),
    ("kode_promo",   "dibaca SEBELUM diisi", "tinggi",
     "nilai tak tentu -- cacat"),
]
print("  " + "variabel".ljust(15) + "pemakaian".ljust(28) +
      "risiko".ljust(9) + "catatan")
for nama, pakai, risiko, catatan in VARIABEL:
    print("  " + nama.ljust(15) + pakai.ljust(28) +
          risiko.ljust(9) + catatan)

print("")
print("  Dua baris terakhir ketahuan TANPA membaca seluruh kode --")
print("  cukup tahu variabel apa yang dipakai modul itu dan")
print("  bagaimana. Itulah gunanya grey box.")


# --------------------------------------------
# 7. GREY BOX: pattern testing
# --------------------------------------------
print("")
print("--- grey box: pattern testing ---")
RIWAYAT = [
    ("Login",     "tidak memeriksa panjang masukan"),
    ("Pendaftaran","tidak memeriksa panjang masukan"),
    ("Profil",    "tidak memeriksa panjang masukan"),
    ("Pencarian", "salah menangani teks kosong"),
    ("Komentar",  "salah menangani teks kosong"),
]
pola = {}
for modul, cacat in RIWAYAT:
    pola.setdefault(cacat, []).append(modul)

print("  pola cacat yang berulang:")
for cacat, modul in sorted(pola.items(), key=lambda x: -len(x[1])):
    print("      '%s' -> %d modul: %s" % (cacat, len(modul), ", ".join(modul)))

print("")
print("  BELUM DIUJI dengan pola yang sama:")
for m in ["Ulasan", "Pesan", "Alamat"]:
    print("      %-10s <- uji masukan panjang & teks kosong" % m)

print("")
print("  Pattern testing masuk akal justru KARENA cacat")
print("  mengelompok: kalau sebuah jenis kesalahan pernah")
print("  terjadi, ia cenderung terulang di modul lain yang")
print("  ditulis dengan cara serupa.")`
  },

  output: `--- decision table: semua kombinasi syarat ---
  anggota            belanja >= 500rb   punya kupon        diskon
  ya                 ya                 ya                 25%
  ya                 ya                 tidak              20%
  ya                 tidak              ya                 15%
  ya                 tidak              tidak              10%
  tidak              ya                 ya                 10%
  tidak              ya                 tidak              5%
  tidak              tidak              ya                 5%
  tidak              tidak              tidak              0%

  8 baris untuk 3 syarat biner (2 pangkat 3).

  Manfaat terbesarnya BUKAN menemukan cacat pada kode,
  melainkan menemukan LUBANG pada spesifikasi: kombinasi
  yang belum ditentukan jawabannya langsung terlihat.

  --- penyederhanaan: syarat yang tidak berpengaruh ---
      (tidak ada; kupon selalu berpengaruh)

--- state transition: status pesanan ---
  dari \ aksi    bayar         kirim         terima        batal         kembali       
  baru           dibayar       -             -             dibatalkan    -             
  dibayar        -             dikirim       -             dibatalkan    -             
  dikirim        -             -             selesai       -             dikembalikan  
  selesai        -             -             -             -             -             
  dibatalkan     -             -             -             -             -             
  dikembalikan   -             -             -             -             -             

  perpindahan SAH        : 6
  perpindahan TIDAK SAH  : 24

  Yang tidak sah jumlahnya JAUH lebih banyak -- dan
  justru di situ cacat paling sering bersembunyi, karena
  programmer memikirkan alur normal dan lupa apa yang
  terjadi kalau pengguna menekan 'Bayar' dua kali.

  --- menguji perpindahan TIDAK SAH ---
      selesai      + batal    -> DITOLAK (benar)      pesanan selesai tidak boleh dibatalkan
      dibatalkan   + bayar    -> DITOLAK (benar)      pesanan batal tidak boleh dibayar
      baru         + kirim    -> DITOLAK (benar)      belum dibayar tidak boleh dikirim
      dibayar      + bayar    -> DITOLAK (benar)      tidak boleh dibayar dua kali

--- cyclomatic complexity ---
  fungsi                      V(G)   kasus uji minimal  tafsiran
  tanpa percabangan              1                   1  sederhana, risiko rendah
  satu if                        2                   2  sederhana, risiko rendah
  dua if terpisah                3                   3  sederhana, risiko rendah
  satu if, syarat panjang        4                   4  sederhana, risiko rendah
  banyak cabang                  5                   5  sederhana, risiko rendah

  Perhatikan baris keempat: fungsinya cuma punya SATU if,
  tapi V(G)-nya 4 -- karena kedua 'and'-nya ikut dihitung
  sebagai titik keputusan (1 if + 2 and, lalu ditambah 1).
  Python berhenti mengevaluasi begitu ada yang False
  (short-circuit), jadi ada beberapa titik tempat alurnya
  bisa berbelok -- meski ditulis dalam satu baris.

--- membuktikan V(G) = jumlah kasus uji minimal ---
  masukan                   harapan   hasil   cabang yang disentuh
  (20, True, False)            True    True   semua syarat terpenuhi
  (15, True, False)           False   False   gagal di syarat PERTAMA (usia)
  (20, False, False)          False   False   gagal di syarat KEDUA (ktp)
  (20, True, True)            False   False   gagal di syarat KETIGA (diblokir)

  4 kasus uji, dan V(G) fungsi ini = 4 -- cocok.

  Menghapus salah satu kasus uji akan menyisakan cabang
  yang tidak pernah dijalankan. Menambah kasus kelima
  tidak menyentuh cabang baru mana pun.

--- V(G) tinggi bukan cuma soal pengujian ---
  contoh fungsi bersarang dalam: V(G) = 13  (cukup rumit, risiko sedang)

  Fungsi ber-V(G) tinggi tidak cuma SULIT DIUJI.
  Ia sulit dibaca, sulit diubah, dan hampir pasti punya
  LEBIH DARI SATU tanggung jawab.

  Memecahnya menurunkan angkanya SEKALIGUS memperbaiki
  rancangannya -- persis 'single responsibility' yang
  kamu pelajari di Rekayasa Perangkat Lunak.

--- grey box: matrix testing ---
  variabel       pemakaian                   risiko   catatan
  total_bayar    dibaca & ditulis            tinggi   uang pelanggan
  diskon         dibaca & ditulis            tinggi   memengaruhi tagihan
  nama_kurir     hanya dibaca                rendah   cuma ditampilkan
  temp_hitung    ditulis, TAK PERNAH dibaca  ?        kode mati atau lupa dipakai
  kode_promo     dibaca SEBELUM diisi        tinggi   nilai tak tentu -- cacat

  Dua baris terakhir ketahuan TANPA membaca seluruh kode --
  cukup tahu variabel apa yang dipakai modul itu dan
  bagaimana. Itulah gunanya grey box.

--- grey box: pattern testing ---
  pola cacat yang berulang:
      'tidak memeriksa panjang masukan' -> 3 modul: Login, Pendaftaran, Profil
      'salah menangani teks kosong' -> 2 modul: Pencarian, Komentar

  BELUM DIUJI dengan pola yang sama:
      Ulasan     <- uji masukan panjang & teks kosong
      Pesan      <- uji masukan panjang & teks kosong
      Alamat     <- uji masukan panjang & teks kosong

  Pattern testing masuk akal justru KARENA cacat
  mengelompok: kalau sebuah jenis kesalahan pernah
  terjadi, ia cenderung terulang di modul lain yang
  ditulis dengan cara serupa.`,

  kesalahanUmum: [
    {
      salah: 'Menghitung cyclomatic complexity hanya dari jumlah if dan mengabaikan operator and serta or.',
      kenapa: 'Bahasa yang memakai evaluasi hubung singkat berhenti menilai begitu hasilnya sudah pasti, sehingga setiap and dan or menambah titik tempat alur bisa berbelok. Fungsi dengan satu if bersyarat panjang bisa punya empat jalur, bukan dua, dan kasus ujinya jadi kurang separuh.',
      benar: 'Hitung setiap if, elif, while, for, case, except, serta setiap and dan or di dalam syarat, lalu tambahkan satu.'
    },
    {
      salah: 'Menguji hanya perpindahan keadaan yang sah pada state transition testing.',
      kenapa: 'Jumlah perpindahan tidak sah jauh lebih banyak daripada yang sah, dan justru di situ cacat paling sering bersembunyi karena programmer memikirkan alur normal. Menekan tombol bayar dua kali atau membatalkan pesanan yang sudah selesai adalah kasus yang sering terlewat.',
      benar: 'Susun matriks keadaan dikali aksi secara lengkap, lalu uji juga sel yang seharusnya ditolak dan pastikan penolakannya benar.'
    },
    {
      salah: 'Menganggap decision table hanya berguna untuk menemukan cacat pada kode.',
      kenapa: 'Manfaat terbesarnya justru muncul saat tabelnya diisi: kombinasi syarat yang belum ditentukan jawabannya langsung terlihat sebagai sel kosong. Itu berarti lubang pada spesifikasi, dan ia ditemukan sebelum kode ditulis.',
      benar: 'Susun decision table pada tahap analisis kebutuhan, dan perlakukan sel kosong sebagai pertanyaan yang harus dijawab pemangku kepentingan.'
    },
    {
      salah: 'Menyamakan jumlah kombinasi masukan dengan jumlah jalur yang perlu diuji.',
      kenapa: 'Yang dihitung basis path testing adalah jalur bebas linier, yaitu jalur yang masing-masing memuat setidaknya satu sisi baru. Fungsi dengan dua percabangan punya empat kombinasi masukan tetapi hanya tiga jalur bebas, karena jalur keempat tidak menambah sisi baru mana pun.',
      benar: 'Pakai cyclomatic complexity sebagai jumlah jalur minimal, dan pilih kasus uji yang masing-masing menyentuh cabang yang belum tersentuh.'
    },
    {
      salah: 'Membiarkan fungsi dengan cyclomatic complexity tinggi asalkan kasus ujinya lengkap.',
      kenapa: 'Angka yang tinggi bukan sekadar menuntut banyak kasus uji, ia menandakan fungsi itu sulit dibaca, sulit diubah, dan hampir pasti punya lebih dari satu tanggung jawab. Kasus uji yang lengkap tidak memperbaiki satu pun dari ketiganya.',
      benar: 'Perlakukan nilai di atas sepuluh sebagai peringatan untuk memecah fungsinya, karena memecahnya menurunkan angkanya sekaligus memperbaiki rancangannya.'
    }
  ],

  analogi: `Bayangkan kamu **menguji sebuah gedung parkir bertingkat**.

**Decision table** adalah menyusun **semua kombinasi keadaan**: kartu berlangganan atau tidak, lewat jam malam atau tidak, kendaraan roda dua atau roda empat.

Delapan kombinasi. Kamu menuliskan tarif yang seharusnya untuk masing-masing — dan pada kombinasi *"berlangganan, roda dua, lewat jam malam"* kamu berhenti, karena **tidak ada yang pernah menentukannya**.

Kamu belum menguji apa pun. Kamu **baru saja menemukan lubang pada peraturannya**.

**State transition** adalah menyadari bahwa palang parkir **punya ingatan**. Ia berperilaku berbeda tergantung **apakah kartumu sudah dipakai masuk atau belum**.

Alur normalnya jelas: masuk, parkir, bayar, keluar. Yang **tidak jelas** adalah apa yang terjadi kalau kamu mencoba **keluar tanpa pernah masuk**, atau **membayar dua kali**, atau **masuk lagi dengan kartu yang belum keluar**.

Dan perhatikan: **jumlah kelakuan aneh jauh lebih banyak** daripada jumlah alur normal. Perancang memikirkan alur normal — di sanalah perhatiannya. Kelakuan anehnya **yang tidak dipikirkan siapa pun**.

Sekarang **cyclomatic complexity**, dan kenapa ia bisa dihitung.

Bayangkan **denah jalan di dalam gedung parkir**: satu pintu masuk, satu pintu keluar, dan **percabangan** di tiap lantai.

Kalau tidak ada percabangan sama sekali — jalan lurus dari masuk ke keluar — ada **satu** rute. Tambah satu simpang, jadi **dua**. Tambah satu lagi, jadi **tiga**.

**Setiap simpang menambah tepat satu rute.** Itulah kenapa rumusnya *"jumlah simpang ditambah satu"*.

Dan inilah bagian yang paling sering membingungkan: **kenapa rute yang perlu ditelusuri lebih sedikit daripada semua kemungkinan jalan?**

Karena begitu kamu sudah melewati tiga rute, **setiap ruas jalan sudah pernah kamu lewati**. Rute keempat cuma menggabungkan ruas-ruas yang sudah kamu kenal — ia tidak menunjukkan apa pun yang baru.

Terakhir, **kenapa angka tinggi itu peringatan**.

Gedung parkir dengan **tiga puluh simpang** memang butuh tiga puluh rute untuk diperiksa. Tetapi masalahnya lebih dalam dari itu: **tidak ada pengemudi yang bisa menemukan jalan keluar** di gedung seperti itu.

Kamu bisa saja menguji ketiga puluh rutenya dengan sempurna. Gedungnya **tetap gedung yang buruk**.`,

  latihan: [
    'Susun decision table untuk aturan berikut: pengiriman gratis jika total di atas 300 ribu, atau jika pelanggan berlangganan, atau jika memakai kupon ongkir. Tunjukkan seluruh kombinasinya.',
    'Gambarkan diagram state transition untuk mesin ATM, lalu daftar tiga perpindahan tidak sah yang wajib diuji.',
    'Hitung cyclomatic complexity fungsi berikut dan jelaskan langkahnya: sebuah fungsi dengan dua if bersarang dan satu perulangan for.',
    'Jelaskan kenapa operator and dan or ikut dihitung dalam cyclomatic complexity, dan hitung V(G) untuk sebuah if dengan empat syarat yang digabung and.',
    'Jelaskan perbedaan jumlah kombinasi masukan dan jumlah jalur bebas linier, dengan contoh fungsi berpercabangan dua.',
    'Untuk fungsi boleh_daftar pada materi ini, tulis empat kasus uji basis path dan jelaskan cabang yang disentuh masing-masing.',
    'Jelaskan apa itu grey box testing, dan sebutkan dua tekniknya beserta apa yang bisa ditemukan masing-masing.',
    'Jelaskan kenapa pattern testing masuk akal, dengan mengaitkannya pada prinsip cacat mengelompok.'
  ]
});

TOPICS.push({
  id: 'ukpl-otomatisasi',
  judul: 'Otomatisasi & Metrik Kualitas',
  kategori: 'ukpl',
  tag: ['otomatisasi', 'piramida pengujian', 'TDD', 'BDD', 'defect density', 'DRE'],
  ringkas: 'Kapan pengujian layak diotomatiskan, dan bagaimana mutu diukur dengan angka.',

  fungsi: `**Menjalankan pengujian secara otomatis, dan mengukur mutu dengan angka yang tidak menipu.**

Terpakai di:

- **Regression testing** — mustahil dilakukan manual untuk ratusan kasus
- **Integrasi berkelanjutan** — uji berjalan otomatis tiap kali kode diunggah
- **Bab pengujian** tugas akhir — metrik memberi bukti terukur
- **Memutuskan kapan siap rilis**

Yang paling penting dipahami tentang metrik: **cakupan mengukur kode yang DIJALANKAN, bukan yang DIPERIKSA.**

Uji yang memanggil setiap fungsi tanpa satu pun pernyataan pemeriksaan memberi cakupan seratus persen dan menangkap nol cacat.

Karena itu jangan menjadikan cakupan sebagai target — begitu ia jadi target, ia berhenti menjadi ukuran yang baik.`,

  praktik: {
    tujuan: `Kamu punya kumpulan uji otomatis yang berjalan tiap kali kode diunggah, dan metrik yang kamu pahami batasnya.`,
    alat: [
      'pytest dan pytest-cov',
      'GitHub Actions',
      'radon'
    ],
    langkah: [
      { judul: 'Hitung dulu apakah otomatisasi sepadan',
        isi: `Bandingkan biaya menulis skrip dengan biaya uji manual dikali berapa kali ia akan dijalankan.

Uji yang jarang dijalankan atau fitur yang masih sering berubah **tidak** layak diotomatiskan.

Penilaian tampilan dan exploratory testing tetap milik manusia.` },
      { judul: 'Susun sebagai piramida',
        isi: `Banyak unit test, sedang integration, sedikit end-to-end.

Susunan terbalik disebut ice cream cone, dan gagal karena tiga hal: **lambat** sehingga orang berhenti menjalankannya, **rapuh** karena perubahan tata letak kecil mematahkan banyak uji, dan **tidak menunjuk** penyebabnya.

Ukur waktu total kumpulan ujimu. Kalau lebih dari beberapa menit, susunannya perlu diperiksa.` },
      { judul: 'Jalankan otomatis di GitHub Actions',
        isi: `Buat \`.github/workflows/uji.yml\` yang menjalankan \`pytest\` pada tiap push.

Sekarang setiap unggahan diperiksa otomatis, dan pull request yang merusak uji akan tertandai sebelum digabung.

Ini gratis untuk repositori publik.` },
      { judul: 'Ukur cakupan, lalu periksa yang belum tersentuh',
        isi: `- \`pytest --cov --cov-report=html\` lalu buka laporannya

Lihat baris yang **belum pernah dijalankan**. Biasanya itu penanganan galat — dan justru di situ bug bersembunyi.

Perlakukan angkanya sebagai petunjuk, bukan target.` },
      { judul: 'Buktikan cakupan bisa menipu',
        isi: `Tulis uji yang memanggil sebuah fungsi tanpa satu pun \`assert\`.

Jalankan dengan cakupan. Angkanya naik, dan ujinya **lulus** bahkan untuk kode yang salah.

Lakukan sekali; ia mengubah cara kamu membaca angka cakupan selamanya.` },
      { judul: 'Hitung defect density dan DRE',
        isi: `- **defect density** = jumlah cacat dibagi ribuan baris kode
- **DRE** = cacat sebelum rilis dibagi total cacat, dikali seratus

Defect density memungkinkan perbandingan antar modul yang ukurannya berbeda.

DRE baru bisa dihitung setelah rilis, dan angkanya **terus berubah** — sebutkan jangka waktunya bersama angkanya.` },
      { judul: 'Coba siklus TDD sekali',
        isi: `Untuk satu fungsi baru: tulis uji yang **gagal** dulu, lalu kode secukupnya supaya lulus, lalu rapikan.

Manfaat terbesarnya bukan kodenya jadi teruji, melainkan kamu **merancang antarmuka fungsinya dari sudut pandang pemakai** — sebelum terjebak pada cara membuatnya bekerja.

Dan mustahil menyalin keluaran program ke kolom harapan, karena programnya belum ada.` }
    ],
    cek: [
      'Uji berjalan otomatis di GitHub Actions setiap kali kamu push',
      `Kamu sudah melihat sendiri uji tanpa assert memberi cakupan tinggi tetapi lulus untuk kode salah`,
      'Kumpulan ujimu selesai dalam waktu yang masih nyaman dijalankan berulang'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa bentuknya piramida',

  konsep: `
**Otomatisasi pengujian** adalah menjalankan kasus uji lewat program, bukan lewat orang.

Manfaatnya nyata: **cepat, konsisten, bisa diulang tanpa lelah**, dan bisa dijalankan tiap kali kode berubah. Tanpa otomatisasi, **regression testing praktis mustahil** — tidak ada yang sanggup menjalankan lima ratus kasus uji manual setiap hari.

Tetapi otomatisasi **bukan selalu menguntungkan**.

**Kapan otomatisasi TIDAK layak**

- Kasus uji yang **jarang dijalankan** — biaya menulisnya tidak pernah kembali
- Fitur yang **masih sering berubah** — skripnya harus ditulis ulang terus
- Pengujian **tampilan dan rasa** — mesin tidak bisa menilai "terasa canggung"
- **Exploratory testing** — justru mengandalkan penilaian manusia yang spontan

**Hitungan sederhananya:** otomatisasi menguntungkan kalau \`biaya menulis skrip < (biaya sekali uji manual × berapa kali akan dijalankan)\`.

**Piramida pengujian**

Bentuk yang disarankan untuk sebuah kumpulan uji:

- **Unit test** — **paling banyak**. Cepat (milidetik), murah, dan menunjuk tepat ke sumber masalah.
- **Integration test** — **sedang**. Menguji modul bekerja sama.
- **End-to-end / UI test** — **paling sedikit**. Lambat (detik sampai menit), rapuh, dan kalau gagal **tidak langsung menunjukkan penyebabnya**.

**Kenapa harus piramida, bukan kotak atau kerucut terbalik**

Kerucut terbalik — banyak uji UI, sedikit unit — disebut **ice cream cone anti-pattern**, dan ia gagal karena tiga hal sekaligus:

- **Lambat** — kumpulan uji butuh berjam-jam, sehingga orang berhenti menjalankannya
- **Rapuh** — perubahan tata letak kecil mematahkan puluhan uji yang logikanya tidak berubah
- **Tidak menunjuk** — "checkout gagal" bisa berarti seratus hal berbeda

**TDD dan BDD**

**TDD** — *Test-Driven Development*. Siklusnya: **merah → hijau → perbaiki**.

- Tulis uji yang **gagal** lebih dulu
- Tulis kode **secukupnya** supaya lulus
- Rapikan kodenya tanpa mengubah perilaku

Manfaat terpentingnya sering disalahpahami. Bukan sekadar "kodenya jadi teruji" — melainkan bahwa menulis uji lebih dulu **memaksa kamu merancang antarmuka fungsinya dari sudut pandang pemakai**, sebelum terjebak pada cara membuatnya bekerja.

Dan karena ujinya ditulis sebelum kodenya ada, **mustahil menyalin keluaran program** ke kolom hasil yang diharapkan.

**BDD** — *Behavior-Driven Development*. Menuliskan perilaku dalam bahasa yang **bisa dibaca orang non-teknis**, dengan pola **Given–When–Then**.

Gunanya menjembatani penguji, pengembang, dan pemangku kepentingan lewat satu kalimat yang **artinya sama bagi ketiganya**.

**Metrik kualitas**

**Defect Density** = jumlah cacat ÷ ukuran (biasanya per 1000 baris atau per function point).

Berguna untuk **membandingkan modul**. Modul 5000 baris dengan 20 cacat lebih baik daripada modul 500 baris dengan 15 cacat, meski jumlah mutlaknya lebih besar.

**Defect Removal Efficiency (DRE)** = cacat ditemukan sebelum rilis ÷ (cacat sebelum rilis + cacat setelah rilis) × 100%.

Ini **metrik paling jujur tentang mutu pengujian**, karena ia mengukur apa yang **lolos**.

Tetapi ia punya sifat yang harus disadari: **DRE baru bisa dihitung setelah rilis**, dan angkanya **terus berubah** selama cacat baru ditemukan. DRE yang dihitung seminggu setelah rilis hampir selalu **terlalu optimistis**.

**Test Coverage** = bagian kode yang dijalankan oleh kumpulan uji.

**Batasnya penting**: cakupan mengukur kode yang **dijalankan**, bukan kode yang **diperiksa**. Uji yang menjalankan seluruh baris tanpa satu pun pernyataan pemeriksaan tetap memberi cakupan 100 persen.

**Test Case Effectiveness** = cacat yang ditemukan kasus uji ÷ total cacat × 100%.

**Kaidah yang menyatukan semuanya**

Setiap metrik bisa **dipermainkan** kalau ia dijadikan sasaran. Menargetkan cakupan 90 persen menghasilkan uji yang menjalankan banyak baris tanpa memeriksa apa pun; menargetkan jumlah cacat menghasilkan pelaporan cacat sepele.

Metrik berguna untuk **melihat kecenderungan dan menimbulkan pertanyaan**, bukan untuk dijadikan target.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA CAKUPAN 100% TIDAK BERARTI TERUJI\n#\n# def bagi(a, b):\n#     if b == 0:\n#         return 0\n#     return a / b\n#\n# UJI YANG BURUK -- cakupan 100%:\n#     bagi(10, 2)\n#     bagi(10, 0)\n#   Kedua baris dijalankan. Cakupan penuh.\n#   Tapi TIDAK ADA satu pun pemeriksaan hasil!\n#   Kalau fungsinya mengembalikan 999, uji ini\n#   tetap "lulus".\n#\n# UJI YANG BAIK -- cakupan sama, nilai berbeda:\n#     assert bagi(10, 2) == 5\n#     assert bagi(10, 0) == 0\n#\n# Cakupan mengukur kode yang DIJALANKAN,\n# bukan kode yang DIPERIKSA.',
      penjelasan: `
Ini jebakan metrik yang paling sering ditemui, dan ia mengajarkan sesuatu yang berlaku untuk **semua** metrik.

Cakupan kode dihitung dengan cara yang sangat sederhana: **catat baris mana yang dijalankan** selama kumpulan uji berjalan, lalu bagi dengan jumlah seluruh baris.

Perhatikan bahwa dalam definisi itu **tidak ada satu kata pun tentang pemeriksaan**. Alat pengukurnya tidak tahu — dan tidak peduli — apakah kamu membandingkan hasilnya dengan sesuatu.

Jadi uji yang cuma **memanggil** setiap fungsi, tanpa satu pun \`assert\`, akan memberi **cakupan 100 persen** dan **menangkap nol cacat**.

Sekarang bagian yang membuatnya berbahaya, bukan sekadar tidak berguna.

Ketika sebuah organisasi menetapkan **"cakupan minimal 90 persen"** sebagai syarat rilis, ia baru saja mengubah cakupan dari **pengukuran** menjadi **sasaran**.

Dan cara termurah mencapai sasaran itu bukan menulis uji yang baik — melainkan menulis uji yang **menjalankan banyak baris**. Menambah \`assert\` tidak menaikkan angkanya sama sekali.

Jadi aturan itu **secara aktif mendorong** uji tanpa pemeriksaan.

Ini contoh **hukum Goodhart**: *ketika sebuah ukuran menjadi sasaran, ia berhenti menjadi ukuran yang baik.*

Dan pola yang sama muncul di setiap metrik lain di topik ini:

- Menargetkan **jumlah cacat ditemukan** → penguji melaporkan cacat sepele
- Menargetkan **jumlah kasus uji** → dibuat banyak kasus uji yang hampir sama
- Menargetkan **DRE tinggi** → cacat setelah rilis dicatat sebagai "permintaan fitur"

Karena itu cara memakai metrik yang benar bukan menetapkan angka yang harus dicapai, melainkan **melihat kecenderungannya** dan **bertanya kenapa**.

Cakupan yang **turun** dari 78 ke 61 persen adalah pertanyaan yang bagus. Cakupan yang **tepat 90 persen** karena diwajibkan tidak memberi tahu apa-apa.

Dan ada satu ukuran yang jauh lebih sulit dipermainkan, meski juga tidak sempurna: **berapa cacat yang lolos ke pengguna**. Ia sulit dipalsukan karena **penggunanya yang melapor**, bukan timnya sendiri.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Otomatisasi pengujian & metrik kualitas
# ============================================

# --------------------------------------------
# 1. Kapan otomatisasi layak?
# --------------------------------------------
def layak_otomatis(biaya_skrip_menit, biaya_manual_menit, berapa_kali):
    manual_total = biaya_manual_menit * berapa_kali
    otomatis_total = biaya_skrip_menit + (0.1 * berapa_kali)  # jalan ~6 detik
    return manual_total, otomatis_total, otomatis_total < manual_total


print("--- kapan otomatisasi menguntungkan? ---")
KASUS = [
    ("Uji login (tiap hari, setahun)",      120, 3, 250),
    ("Uji laporan tahunan",                  90, 20,  1),
    ("Uji checkout (tiap rilis, 2 mingguan)",240, 15, 26),
    ("Uji fitur baru yang masih berubah",   180, 10,  4),
]
print("  " + "kasus uji".ljust(38) + "manual".rjust(9) +
      "otomatis".rjust(10) + "  putusan")
for nama, skrip, manual, kali in KASUS:
    m, o, untung = layak_otomatis(skrip, manual, kali)
    print("  " + nama.ljust(38) + ("%.0f mnt" % m).rjust(9) +
          ("%.0f mnt" % o).rjust(10) +
          ("  OTOMATISKAN" if untung else "  biarkan manual"))

print("")
print("  Aturannya sederhana: biaya menulis skrip harus lebih")
print("  kecil daripada biaya uji manual dikali berapa kali")
print("  ia akan dijalankan.")
print("")
print("  Yang TIDAK layak diotomatiskan:")
for x in ["kasus uji yang jarang dijalankan",
          "fitur yang masih sering berubah",
          "penilaian tampilan dan rasa ('terasa canggung')",
          "exploratory testing yang mengandalkan penilaian spontan"]:
    print("      - " + x)


# --------------------------------------------
# 2. Piramida pengujian
# --------------------------------------------
print("")
print("--- piramida pengujian ---")
LAPIS = [
    ("Unit",        700, 0.003, "menunjuk tepat ke sumber masalah"),
    ("Integration", 150, 0.250, "menguji modul bekerja sama"),
    ("End-to-end",   30, 8.000, "meniru pemakaian sungguhan"),
]
print("  " + "lapisan".ljust(14) + "jumlah".rjust(8) +
      "detik/uji".rjust(11) + "total".rjust(12) + "  kalau gagal")
total_piramida = 0
for nama, jumlah, detik, ket in LAPIS:
    t = jumlah * detik
    total_piramida += t
    print("  " + nama.ljust(14) + str(jumlah).rjust(8) +
          ("%.3f" % detik).rjust(11) + ("%.1f dtk" % t).rjust(12) +
          "  " + ket)
print("  " + "TOTAL".ljust(14) + str(sum(l[1] for l in LAPIS)).rjust(8) +
      " " * 11 + ("%.1f dtk" % total_piramida).rjust(12))

print("")
print("  --- kerucut terbalik (ice cream cone anti-pattern) ---")
TERBALIK = [("Unit", 30, 0.003), ("Integration", 150, 0.250),
            ("End-to-end", 700, 8.000)]
total_terbalik = 0
for nama, jumlah, detik in TERBALIK:
    t = jumlah * detik
    total_terbalik += t
    print("  " + nama.ljust(14) + str(jumlah).rjust(8) +
          ("%.3f" % detik).rjust(11) + ("%.1f dtk" % t).rjust(12))
print("  " + "TOTAL".ljust(14) + str(sum(l[1] for l in TERBALIK)).rjust(8) +
      " " * 11 + ("%.1f dtk" % total_terbalik).rjust(12))

print("")
print("  piramida      : %.1f detik  (%.1f menit)"
      % (total_piramida, total_piramida / 60))
print("  kerucut balik : %.1f detik  (%.1f menit)"
      % (total_terbalik, total_terbalik / 60))
print("  selisih       : %.0f kali lebih lambat"
      % (total_terbalik / total_piramida))
print("")
print("  Jumlah ujinya SAMA (880). Yang berbeda cuma sebarannya.")
print("")
print("  Dan lambat itu bukan sekadar tidak nyaman: kumpulan uji")
print("  yang butuh berjam-jam akan BERHENTI DIJALANKAN orang.")


# --------------------------------------------
# 3. Kenapa uji UI rapuh dan tidak menunjuk
# --------------------------------------------
print("")
print("--- tiga kelemahan uji end-to-end ---")
MASALAH = [
    ("Lambat",
     "880 uji jadi 100+ menit -> orang berhenti menjalankannya"),
    ("Rapuh",
     "tombol dipindah 20 piksel -> 40 uji patah, logikanya tak berubah"),
    ("Tidak menunjuk",
     "'checkout gagal' bisa berarti 100 hal berbeda"),
]
for nama, akibat in MASALAH:
    print("  " + nama.ljust(17) + akibat)

print("")
print("  Bandingkan dengan unit test yang gagal: ia menyebut")
print("  fungsi mana, masukan apa, dan hasil yang diharapkan.")


# --------------------------------------------
# 4. TDD: merah -> hijau -> perbaiki
# --------------------------------------------
print("")
print("--- siklus TDD ---")

# TAHAP MERAH: uji ditulis dari SPESIFIKASI, kodenya belum ada
def uji_potong_teks(fungsi):
    """Spesifikasi: potong teks jadi maksimal n huruf,
       tambahkan '...' kalau terpotong."""
    kasus = [
        (("halo", 10),                  "halo"),
        (("selamat datang", 8),         "selamat..."),
        (("tepat", 5),                  "tepat"),
        (("", 5),                       ""),
    ]
    gagal = []
    for masukan, harapan in kasus:
        try:
            hasil = fungsi(*masukan)
        except Exception as e:
            gagal.append((masukan, harapan, "GALAT: " + type(e).__name__))
            continue
        if hasil != harapan:
            gagal.append((masukan, harapan, hasil))
    return gagal


print("  [MERAH] uji ditulis lebih dulu, kodenya belum ada:")
def potong_belum_ada(teks, n):
    raise NotImplementedError
gagal = uji_potong_teks(potong_belum_ada)
print("      %d dari 4 kasus GAGAL -- seperti yang diharapkan" % len(gagal))

print("")
print("  [HIJAU] tulis kode secukupnya supaya lulus:")
def potong(teks, n):
    if len(teks) <= n:
        return teks
    return teks[:n] + "..."
gagal = uji_potong_teks(potong)
print("      %d kasus gagal -> %s" % (len(gagal), "LULUS SEMUA"
                                      if not gagal else str(gagal)))

print("")
print("  [PERBAIKI] rapikan tanpa mengubah perilaku:")
def potong_rapi(teks, n):
    return teks if len(teks) <= n else teks[:n] + "..."
gagal = uji_potong_teks(potong_rapi)
print("      setelah dirapikan: %d kasus gagal -> %s"
      % (len(gagal), "masih LULUS SEMUA" if not gagal else "RUSAK"))

print("")
print("  Manfaat terpenting TDD sering disalahpahami. Bukan")
print("  sekadar 'kodenya jadi teruji', melainkan:")
print("      (a) kamu merancang antarmuka fungsi dari sudut")
print("          pandang PEMAKAINYA, sebelum terjebak pada cara")
print("          membuatnya bekerja")
print("      (b) mustahil menyalin keluaran program ke kolom")
print("          'hasil diharapkan', karena programnya belum ada")


# --------------------------------------------
# 5. BDD: Given - When - Then
# --------------------------------------------
print("")
print("--- BDD: satu kalimat untuk tiga pihak ---")
SKENARIO = [
    ("Masuk dengan sandi salah",
     "Given pengguna 'hafizh' sudah terdaftar",
     "When ia memasukkan sandi yang salah",
     "Then sistem menolak dan menampilkan "
     "'Username atau kata sandi salah'"),
    ("Diskon anggota",
     "Given pelanggan berstatus anggota",
     "When ia berbelanja senilai 600 ribu",
     "Then total tagihan mendapat potongan 20 persen"),
]
for judul, given, when, then in SKENARIO:
    print("  Skenario: " + judul)
    for baris in (given, when, then):
        print("      " + baris)

print("")
print("  Kalimat ini bisa dibaca penguji, pengembang, DAN")
print("  pemangku kepentingan -- dan artinya SAMA bagi ketiganya.")
print("  Itulah gunanya BDD: menjembatani, bukan mempercanggih.")


# --------------------------------------------
# 6. Metrik: Defect Density
# --------------------------------------------
print("")
print("--- Defect Density ---")
MODUL = [
    ("Pembayaran",   5000, 20),
    ("Autentikasi",   500, 15),
    ("Laporan",      3000,  6),
    ("Notifikasi",    800,  8),
]
print("  " + "modul".ljust(15) + "baris".rjust(7) + "cacat".rjust(7) +
      "cacat/1000 baris".rjust(19) + "  penilaian")
for nama, baris, cacat in sorted(
        MODUL, key=lambda m: -(m[2] / m[1])):
    kepadatan = cacat / baris * 1000
    nilai = ("BURUK" if kepadatan > 20 else
             "perlu perhatian" if kepadatan > 5 else "baik")
    print("  " + nama.ljust(15) + str(baris).rjust(7) +
          str(cacat).rjust(7) + ("%.1f" % kepadatan).rjust(19) +
          "  " + nilai)

print("")
print("  Pembayaran punya cacat TERBANYAK secara mutlak (20),")
print("  tapi Autentikasi jauh lebih buruk per baris (30.0 vs 4.0).")
print("  Membandingkan jumlah mutlak antar-modul berukuran beda")
print("  akan menyesatkan.")


# --------------------------------------------
# 7. Metrik: DRE
# --------------------------------------------
print("")
print("--- Defect Removal Efficiency ---")
RILIS = [
    ("v1.0", 120, 30),
    ("v1.1", 145, 18),
    ("v1.2", 160,  9),
    ("v2.0", 210, 34),
]
print("  " + "rilis".ljust(8) + "cacat sebelum".rjust(15) +
      "cacat sesudah".rjust(15) + "DRE".rjust(9) + "  penilaian")
for nama, sebelum, sesudah in RILIS:
    dre = sebelum / (sebelum + sesudah) * 100
    nilai = ("sangat baik" if dre >= 95 else
             "baik" if dre >= 90 else
             "perlu diperbaiki")
    print("  " + nama.ljust(8) + str(sebelum).rjust(15) +
          str(sesudah).rjust(15) + ("%.1f%%" % dre).rjust(9) +
          "  " + nilai)

print("")
print("  DRE adalah metrik paling jujur tentang mutu PENGUJIAN,")
print("  karena ia mengukur apa yang LOLOS.")
print("")
print("  Tapi perhatikan sifatnya: DRE baru bisa dihitung SETELAH")
print("  rilis, dan angkanya TERUS BERUBAH selama cacat baru")
print("  ditemukan. DRE yang dihitung seminggu setelah rilis")
print("  hampir selalu terlalu optimistis.")


# --------------------------------------------
# 8. Cakupan tinggi tanpa pemeriksaan
# --------------------------------------------
print("")
print("--- cakupan 100% yang tidak menguji apa-apa ---")

def bagi(a, b):
    if b == 0:
        return 0
    return a / b


def bagi_cacat(a, b):
    if b == 0:
        return 999          # SALAH
    return a / b


def uji_buruk(f):
    """Menjalankan kedua cabang, tapi TIDAK memeriksa apa pun."""
    f(10, 2)
    f(10, 0)
    return True             # selalu 'lulus'


def uji_baik(f):
    """Cakupan SAMA, tapi memeriksa hasilnya."""
    return f(10, 2) == 5 and f(10, 0) == 0


print("  " + "kumpulan uji".ljust(16) + "cakupan".rjust(10) +
      "versi benar".rjust(14) + "versi cacat".rjust(14))
print("  " + "uji buruk".ljust(16) + "100%".rjust(10) +
      ("LULUS" if uji_buruk(bagi) else "gagal").rjust(14) +
      ("LULUS" if uji_buruk(bagi_cacat) else "gagal").rjust(14))
print("  " + "uji baik".ljust(16) + "100%".rjust(10) +
      ("LULUS" if uji_baik(bagi) else "gagal").rjust(14) +
      ("LULUS" if uji_baik(bagi_cacat) else "GAGAL").rjust(14))

print("")
print("  Cakupan keduanya SAMA PERSIS: 100 persen.")
print("  Tapi hanya yang kedua bisa membedakan kode benar dari")
print("  kode cacat.")
print("")
print("  Cakupan mengukur kode yang DIJALANKAN, bukan yang")
print("  DIPERIKSA. Alat pengukurnya tidak tahu -- dan tidak")
print("  peduli -- apakah kamu membandingkan hasilnya.")


# --------------------------------------------
# 9. Hukum Goodhart pada metrik pengujian
# --------------------------------------------
print("")
print("--- ketika ukuran jadi sasaran ---")
GOODHART = [
    ("Cakupan minimal 90%",
     "uji yang menjalankan banyak baris TANPA assert"),
    ("Temukan minimal 50 cacat per bulan",
     "melaporkan cacat sepele: salah ketik, beda spasi"),
    ("Buat minimal 200 kasus uji",
     "banyak kasus uji yang hampir sama persis"),
    ("DRE harus di atas 95%",
     "cacat setelah rilis dicatat sebagai 'permintaan fitur'"),
]
print("  " + "sasaran yang ditetapkan".ljust(36) + "cara termurah mencapainya")
for sasaran, akal in GOODHART:
    print("  " + sasaran.ljust(36) + akal)

print("")
print("  Hukum Goodhart: KETIKA SEBUAH UKURAN MENJADI SASARAN,")
print("  IA BERHENTI MENJADI UKURAN YANG BAIK.")
print("")
print("  Cara memakai metrik yang benar bukan menetapkan angka")
print("  yang harus dicapai, melainkan melihat KECENDERUNGANNYA")
print("  dan bertanya KENAPA.")
print("")
print("  Cakupan yang TURUN dari 78% ke 61% adalah pertanyaan")
print("  yang bagus. Cakupan yang tepat 90% karena diwajibkan")
print("  tidak memberi tahu apa-apa.")`
  },

  output: `--- kapan otomatisasi menguntungkan? ---
  kasus uji                                manual  otomatis  putusan
  Uji login (tiap hari, setahun)          750 mnt   145 mnt  OTOMATISKAN
  Uji laporan tahunan                      20 mnt    90 mnt  biarkan manual
  Uji checkout (tiap rilis, 2 mingguan)   390 mnt   243 mnt  OTOMATISKAN
  Uji fitur baru yang masih berubah        40 mnt   180 mnt  biarkan manual

  Aturannya sederhana: biaya menulis skrip harus lebih
  kecil daripada biaya uji manual dikali berapa kali
  ia akan dijalankan.

  Yang TIDAK layak diotomatiskan:
      - kasus uji yang jarang dijalankan
      - fitur yang masih sering berubah
      - penilaian tampilan dan rasa ('terasa canggung')
      - exploratory testing yang mengandalkan penilaian spontan

--- piramida pengujian ---
  lapisan         jumlah  detik/uji       total  kalau gagal
  Unit               700      0.003     2.1 dtk  menunjuk tepat ke sumber masalah
  Integration        150      0.250    37.5 dtk  menguji modul bekerja sama
  End-to-end          30      8.000   240.0 dtk  meniru pemakaian sungguhan
  TOTAL              880              279.6 dtk

  --- kerucut terbalik (ice cream cone anti-pattern) ---
  Unit                30      0.003     0.1 dtk
  Integration        150      0.250    37.5 dtk
  End-to-end         700      8.000  5600.0 dtk
  TOTAL              880             5637.6 dtk

  piramida      : 279.6 detik  (4.7 menit)
  kerucut balik : 5637.6 detik  (94.0 menit)
  selisih       : 20 kali lebih lambat

  Jumlah ujinya SAMA (880). Yang berbeda cuma sebarannya.

  Dan lambat itu bukan sekadar tidak nyaman: kumpulan uji
  yang butuh berjam-jam akan BERHENTI DIJALANKAN orang.

--- tiga kelemahan uji end-to-end ---
  Lambat           880 uji jadi 100+ menit -> orang berhenti menjalankannya
  Rapuh            tombol dipindah 20 piksel -> 40 uji patah, logikanya tak berubah
  Tidak menunjuk   'checkout gagal' bisa berarti 100 hal berbeda

  Bandingkan dengan unit test yang gagal: ia menyebut
  fungsi mana, masukan apa, dan hasil yang diharapkan.

--- siklus TDD ---
  [MERAH] uji ditulis lebih dulu, kodenya belum ada:
      4 dari 4 kasus GAGAL -- seperti yang diharapkan

  [HIJAU] tulis kode secukupnya supaya lulus:
      1 kasus gagal -> [(('selamat datang', 8), 'selamat...', 'selamat ...')]

  [PERBAIKI] rapikan tanpa mengubah perilaku:
      setelah dirapikan: 1 kasus gagal -> RUSAK

  Manfaat terpenting TDD sering disalahpahami. Bukan
  sekadar 'kodenya jadi teruji', melainkan:
      (a) kamu merancang antarmuka fungsi dari sudut
          pandang PEMAKAINYA, sebelum terjebak pada cara
          membuatnya bekerja
      (b) mustahil menyalin keluaran program ke kolom
          'hasil diharapkan', karena programnya belum ada

--- BDD: satu kalimat untuk tiga pihak ---
  Skenario: Masuk dengan sandi salah
      Given pengguna 'hafizh' sudah terdaftar
      When ia memasukkan sandi yang salah
      Then sistem menolak dan menampilkan 'Username atau kata sandi salah'
  Skenario: Diskon anggota
      Given pelanggan berstatus anggota
      When ia berbelanja senilai 600 ribu
      Then total tagihan mendapat potongan 20 persen

  Kalimat ini bisa dibaca penguji, pengembang, DAN
  pemangku kepentingan -- dan artinya SAMA bagi ketiganya.
  Itulah gunanya BDD: menjembatani, bukan mempercanggih.

--- Defect Density ---
  modul            baris  cacat   cacat/1000 baris  penilaian
  Autentikasi        500     15               30.0  BURUK
  Notifikasi         800      8               10.0  perlu perhatian
  Pembayaran        5000     20                4.0  baik
  Laporan           3000      6                2.0  baik

  Pembayaran punya cacat TERBANYAK secara mutlak (20),
  tapi Autentikasi jauh lebih buruk per baris (30.0 vs 4.0).
  Membandingkan jumlah mutlak antar-modul berukuran beda
  akan menyesatkan.

--- Defect Removal Efficiency ---
  rilis     cacat sebelum  cacat sesudah      DRE  penilaian
  v1.0                120             30    80.0%  perlu diperbaiki
  v1.1                145             18    89.0%  perlu diperbaiki
  v1.2                160              9    94.7%  baik
  v2.0                210             34    86.1%  perlu diperbaiki

  DRE adalah metrik paling jujur tentang mutu PENGUJIAN,
  karena ia mengukur apa yang LOLOS.

  Tapi perhatikan sifatnya: DRE baru bisa dihitung SETELAH
  rilis, dan angkanya TERUS BERUBAH selama cacat baru
  ditemukan. DRE yang dihitung seminggu setelah rilis
  hampir selalu terlalu optimistis.

--- cakupan 100% yang tidak menguji apa-apa ---
  kumpulan uji       cakupan   versi benar   versi cacat
  uji buruk             100%         LULUS         LULUS
  uji baik              100%         LULUS         GAGAL

  Cakupan keduanya SAMA PERSIS: 100 persen.
  Tapi hanya yang kedua bisa membedakan kode benar dari
  kode cacat.

  Cakupan mengukur kode yang DIJALANKAN, bukan yang
  DIPERIKSA. Alat pengukurnya tidak tahu -- dan tidak
  peduli -- apakah kamu membandingkan hasilnya.

--- ketika ukuran jadi sasaran ---
  sasaran yang ditetapkan             cara termurah mencapainya
  Cakupan minimal 90%                 uji yang menjalankan banyak baris TANPA assert
  Temukan minimal 50 cacat per bulan  melaporkan cacat sepele: salah ketik, beda spasi
  Buat minimal 200 kasus uji          banyak kasus uji yang hampir sama persis
  DRE harus di atas 95%               cacat setelah rilis dicatat sebagai 'permintaan fitur'

  Hukum Goodhart: KETIKA SEBUAH UKURAN MENJADI SASARAN,
  IA BERHENTI MENJADI UKURAN YANG BAIK.

  Cara memakai metrik yang benar bukan menetapkan angka
  yang harus dicapai, melainkan melihat KECENDERUNGANNYA
  dan bertanya KENAPA.

  Cakupan yang TURUN dari 78% ke 61% adalah pertanyaan
  yang bagus. Cakupan yang tepat 90% karena diwajibkan
  tidak memberi tahu apa-apa.`,

  kesalahanUmum: [
    {
      salah: 'Menargetkan persentase cakupan kode sebagai syarat rilis.',
      kenapa: 'Cakupan menghitung baris yang dijalankan tanpa memedulikan apakah hasilnya diperiksa, sehingga cara termurah mencapai target itu adalah menulis uji yang memanggil banyak fungsi tanpa satu pun pernyataan pemeriksaan. Aturannya justru mendorong uji yang tidak menguji apa-apa.',
      benar: 'Pantau kecenderungan cakupan dan tanyakan kenapa ia berubah, dan nilai mutu uji dari kemampuannya menangkap kode yang sengaja dirusak.'
    },
    {
      salah: 'Membangun banyak uji antarmuka dan sedikit unit test.',
      kenapa: 'Susunan itu disebut ice cream cone dan gagal karena tiga hal sekaligus: kumpulan ujinya lambat sehingga orang berhenti menjalankannya, rapuh karena perubahan tata letak kecil mematahkan banyak uji, dan tidak menunjuk penyebab karena satu kegagalan bisa berarti seratus hal.',
      benar: 'Susun seperti piramida: unit test paling banyak, integration sedang, end-to-end paling sedikit dan hanya untuk alur terpenting.'
    },
    {
      salah: 'Mengotomatiskan semua kasus uji tanpa memeriksa apakah menguntungkan.',
      kenapa: 'Biaya menulis skrip baru kembali kalau ujinya dijalankan berkali-kali. Kasus uji yang jarang dijalankan atau fitur yang masih sering berubah membuat skripnya harus ditulis ulang terus, sehingga biayanya melebihi manfaatnya.',
      benar: 'Bandingkan biaya menulis skrip dengan biaya uji manual dikali berapa kali ia akan dijalankan, dan sisakan penilaian tampilan serta exploratory testing untuk manusia.'
    },
    {
      salah: 'Membandingkan jumlah cacat antar-modul yang ukurannya berbeda.',
      kenapa: 'Modul besar wajar punya lebih banyak cacat secara mutlak. Modul lima ribu baris dengan dua puluh cacat sebenarnya jauh lebih baik daripada modul lima ratus baris dengan lima belas cacat, meski angkanya lebih besar.',
      benar: 'Pakai defect density, yaitu jumlah cacat dibagi ukuran, sehingga perbandingannya adil.'
    },
    {
      salah: 'Melaporkan DRE segera setelah rilis sebagai bukti mutu pengujian.',
      kenapa: 'DRE membandingkan cacat sebelum rilis dengan cacat setelah rilis, sedangkan cacat setelah rilis masih terus bermunculan berbulan-bulan. Angka yang dihitung seminggu setelah rilis hampir selalu terlalu optimistis karena penyebutnya belum lengkap.',
      benar: 'Hitung DRE setelah jangka waktu yang disepakati, misalnya tiga atau enam bulan, dan sebutkan jangka waktunya bersama angkanya.'
    },
    {
      salah: 'Mengira manfaat TDD hanya membuat kode jadi teruji.',
      kenapa: 'Manfaat yang lebih besar adalah menulis uji lebih dulu memaksa perancangan antarmuka fungsi dari sudut pandang pemakainya, sebelum pikiran terjebak pada cara membuatnya bekerja. Ia juga membuat penyalinan keluaran program ke kolom hasil yang diharapkan menjadi mustahil.',
      benar: 'Perlakukan TDD sebagai alat perancangan, dan nilai hasilnya dari seberapa mudah antarmuka fungsinya dipakai, bukan hanya dari jumlah ujinya.'
    }
  ],

  analogi: `Bayangkan sebuah **pabrik roti** yang ingin menjaga mutunya.

**Piramida pengujian** adalah susunan pemeriksaannya.

**Di dasar**, ada ratusan pemeriksaan kecil dan cepat: suhu oven, berat adonan, kadar ragi. Masing-masing butuh **dua detik**, dan kalau ada yang meleset kamu **langsung tahu apa yang salah**.

**Di tengah**, ada pemeriksaan lini: apakah adonan yang keluar mesin pengaduk cocok masuk ke mesin pemanggang.

**Di puncak**, ada **mencicipi rotinya**. Ini pemeriksaan yang **paling mirip pengalaman pelanggan** — dan juga paling lambat, paling mahal, dan paling tidak menunjuk.

Kalau rotinya terasa aneh, kamu tahu **ada yang salah**. Kamu tidak tahu **apa**.

Sekarang bayangkan pabrik yang **membalik susunannya**: berhenti mengukur suhu oven, dan sebagai gantinya **mencicipi seratus roti** setiap batch.

Ini terasa lebih meyakinkan — bukankah mencicipi lebih "nyata" daripada mengukur suhu?

Tetapi tiga hal terjadi. **Pertama**, pemeriksaannya butuh berjam-jam, jadi lama-lama dilakukan seminggu sekali. **Kedua**, mengganti merek tepung membuat semua penilai bilang "berbeda", padahal rotinya baik-baik saja. **Ketiga**, ketika ada yang bilang "rasanya aneh", tidak ada yang tahu harus memeriksa apa.

Sekarang **kenapa cakupan bisa menipu**.

Bayangkan inspektur yang tugasnya **menyentuh setiap mesin di pabrik** setiap pagi, dan mencatat berapa persen mesin yang sudah ia sentuh.

Suatu hari ia mencapai **100 persen**. Laporannya sempurna.

Tetapi ia **cuma menyentuh**. Ia tidak pernah memeriksa apakah mesinnya menyala, apakah suhunya benar, apakah ada yang berbunyi aneh.

Angkanya jujur — **100 persen mesin memang tersentuh**. Yang keliru adalah anggapan bahwa "tersentuh" berarti "diperiksa".

Dan inilah bagian terakhirnya, **hukum Goodhart**.

Bayangkan manajemen menetapkan: *"inspektur harus mencapai 100 persen setiap hari."*

Sebelumnya inspektur mungkin **berhenti lebih lama** di mesin yang mencurigakan. Sekarang ia tidak bisa — berhenti lama berarti tidak sempat menyentuh semuanya.

Aturan itu **tidak cuma gagal memperbaiki mutu**. Ia **mengambil satu-satunya hal berguna** yang tadinya inspektur itu lakukan.`,

  latihan: [
    'Sebutkan empat keadaan ketika pengujian sebaiknya TIDAK diotomatiskan, beserta alasannya.',
    'Tulis rumus sederhana untuk menilai apakah sebuah kasus uji layak diotomatiskan, lalu terapkan pada uji yang butuh 2 jam untuk diskrip dan 10 menit manual, dijalankan 30 kali.',
    'Jelaskan susunan piramida pengujian dan sebutkan ciri tiap lapisan dari segi kecepatan, kerapuhan, dan kemampuan menunjuk penyebab.',
    'Jelaskan apa itu ice cream cone anti-pattern dan sebutkan tiga sebab kegagalannya.',
    'Sebutkan tiga tahap siklus TDD, dan jelaskan manfaat TDD yang lebih besar daripada sekadar membuat kode teruji.',
    'Tulis satu skenario BDD lengkap dengan pola Given-When-Then untuk fitur lupa kata sandi.',
    'Hitung defect density untuk modul 2500 baris dengan 12 cacat, lalu bandingkan dengan modul 400 baris dengan 9 cacat.',
    'Hitung DRE untuk rilis dengan 180 cacat ditemukan sebelum rilis dan 12 cacat setelah rilis, lalu jelaskan kenapa angka itu bisa berubah.',
    'Jelaskan kenapa cakupan 100 persen tidak menjamin kode teruji, dan tulis satu contoh uji bercakupan penuh yang tidak menguji apa pun.',
    'Jelaskan hukum Goodhart, dan berikan dua contoh metrik pengujian yang rusak ketika dijadikan sasaran.'
  ]
});


/* ============================================================
   Tambahan Uji Kualitas Perangkat Lunak — tiga topik dari
   pokok bahasan RPS IF21506 yang belum tercakup:
     - Teknik Pengujian Black Box (EP, BVA, use case)
     - Tingkatan Pengujian (unit, integrasi, sistem, penerimaan)
     - Pengujian Kinerja & Pengujian Keamanan
   ============================================================ */

TOPICS.push({
  id: 'ukpl-blackbox',
  judul: 'Teknik Pengujian Black Box',
  kategori: 'ukpl',
  tag: ['black box', 'equivalence partitioning', 'boundary value analysis', 'use case testing', 'error guessing'],
  ringkas: 'Lima kasus uji lulus semua, dan cacatnya tetap lolos. Yang keenam menemukannya.',

  fungsi: `**Memilih sedikit kasus uji yang menemukan cacat, tanpa perlu membaca kodenya.**

Terpakai di:

- **Bab pengujian** tugas akhir — tabel kasus uji hampir selalu diminta
- **Menguji sistem orang lain** yang kodenya tidak kamu punya
- **Menguji API** — masukan dan keluaran saja yang terlihat
- **Wawancara kerja** untuk posisi QA — EP dan BVA hampir pasti ditanyakan

Yang paling sering menyelamatkan: **cacat berkumpul di tepi.**

Batas ditulis sebagai perbandingan, dan salah memilih antara \`<\` dan \`<=\` menghasilkan cacat yang **hanya salah pada satu nilai**. Tidak akan pernah muncul di nilai lain mana pun.

Dan pasangan yang wajib dipakai bersama: **EP memastikan tiap kelas tersentuh, BVA memastikan tepinya diperiksa.** EP sendirian akan memilih wakil di tengah, jauh dari tempat cacatnya berada.`,

  praktik: {
    tujuan: 'Kamu punya tabel kasus uji yang tersusun rapi dan terbukti bisa menemukan cacat batas.',
    alat: [
      'Spreadsheet untuk tabel kasus uji',
      'Satu fungsi dari proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Hitung dulu kenapa tidak bisa diuji semua',
        isi: `Untuk satu formulir di proyekmu, hitung jumlah kombinasi semua masukannya.

Angkanya akan besar sekali. Ini bukan untuk menakuti — ini yang membuat pemilihan kasus uji jadi keterampilan, bukan kerajinan.` },
      { judul: 'Bagi tiap masukan menjadi kelas ekuivalen',
        isi: `Untuk tiap kolom, tulis kelompok nilai yang **diperlakukan sama** oleh program.

Jangan lupa kelas **tidak sah** di kedua ujung: di bawah jangkauan dan di atasnya.

Ambil satu wakil dari tiap kelas.` },
      { judul: 'Jalankan kasus EP-mu, dan perhatikan semuanya lulus',
        isi: `Kalau semuanya lulus, jangan berhenti. Justru di sinilah kesalahan paling sering terjadi.

Wakil yang kamu pilih ada di tengah kelas, jauh dari tepi — dan cacat batas tidak pernah salah di tengah.` },
      { judul: 'Tambahkan nilai batas',
        isi: `Untuk tiap batas \`b\`, tambahkan tiga kasus: \`b-1\`, \`b\`, \`b+1\`.

Jangan lupakan tepi terluar: nilai terkecil yang sah, nilai terbesar yang sah, dan satu langkah di luar keduanya.` },
      { judul: 'Periksa penolakannya juga',
        isi: `Untuk masukan tidak sah, jangan cuma periksa bahwa ia ditolak.

Periksa juga **pesannya jelas**. Program yang menolak tanpa memberi tahu alasannya membuat penggunanya menebak.` },
      { judul: 'Tambahkan satu use case utuh',
        isi: `Telusuri satu alur pemakaian nyata dari awal sampai akhir, bukan satu fungsi.

Ini menemukan cacat yang **hanya muncul saat langkah dirangkai** — misalnya data yang tidak terbawa dari layar satu ke layar berikutnya.

Pengujian per fungsi tidak akan pernah menemukannya, karena tiap fungsinya memang benar.` },
      { judul: 'Tutup dengan error guessing',
        isi: `Coba yang biasanya bermasalah: teks kosong, spasi di awal, tanda kutip, angka nol, tanggal 29 Februari, dan teks yang sangat panjang.

Teknik ini tidak sistematis dan tidak bisa menggantikan yang lain, tetapi sering menemukan yang lolos dari semuanya.` },
      { judul: 'Jadikan tiap cacat sebagai uji permanen',
        isi: `Setiap cacat batas yang kamu temukan, masukkan nilainya ke kumpulan uji tetap **sebelum** memperbaiki kodenya.

Cacat yang diperbaiki tanpa uji penjaga akan kembali — mungkin oleh orang lain, mungkin oleh kamu sendiri.` }
    ],
    cek: [
      'Tabel kasus ujimu memuat kelas tidak sah di kedua ujung jangkauan',
      'Tiap batas punya tiga kasus uji: sebelum, tepat, dan sesudah',
      'Setiap cacat yang kamu temukan sudah punya kasus uji penjaganya'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa cacat berkumpul di tepi',

  konsep: `
**Black box testing** menguji perangkat lunak **dari luar**: masukan diberikan, keluaran diperiksa, isi kodenya tidak dilihat sama sekali.

Karena kodenya tidak dilihat, acuannya adalah **spesifikasi**. Dan karena acuannya spesifikasi, teknik ini bisa dipakai oleh orang yang bukan programmer — termasuk penguji khusus dan pengguna.

**Kenapa tidak diuji semuanya saja**

Karena mustahil. Satu masukan usia 0 sampai 120 sudah 121 nilai. Ditambah kelas tiket dan rute, jumlahnya belasan ribu. Ditambah tanggal, jutaan.

Ini bukan alasan untuk menyerah — ini yang membuat pengujian menjadi **keterampilan memilih**. Seluruh teknik di bawah ini adalah cara memilih sedikit kasus yang menemukan banyak cacat.

**Equivalence Partitioning**

Bagi seluruh kemungkinan masukan menjadi **kelas-kelas yang diperlakukan sama** oleh program. Ambil **satu wakil** dari tiap kelas.

Dasarnya sederhana: kalau usia 6 dan usia 7 diperlakukan sama persis, maka mengujinya keduanya tidak memberi informasi lebih daripada menguji salah satunya.

Yang sering dilupakan: **kelas tidak sah juga harus diuji**. Usia negatif, usia 200, teks di kolom angka, kolom kosong. Program yang benar harus **menolaknya dengan jelas**, dan itu perilaku yang perlu diperiksa.

**Boundary Value Analysis**

Cacat **berkumpul di tepi**, bukan di tengah. Untuk tiap batas \`b\`, uji **\`b-1\`, \`b\`, dan \`b+1\`**.

Alasannya bisa dilihat dari kodenya. Batas ditulis sebagai perbandingan: \`<\`, \`<=\`, \`>\`, \`>=\`. Salah memilih satu di antaranya menghasilkan cacat yang **hanya muncul tepat di titik batasnya** — dan tidak pernah muncul di nilai lain mana pun.

Karena itu EP dan BVA hampir selalu dipakai **bersama**: EP memastikan tiap kelas tersentuh, BVA memastikan tepi tiap kelas diperiksa.

**Decision Table Testing**

Untuk aturan dengan beberapa syarat, buat tabel semua kombinasinya lalu isi tindakannya. Sel yang kosong berarti aturannya **belum ditetapkan siapa pun** — dan itu temuan spesifikasi, bukan temuan bug.

**State Transition Testing**

Untuk sistem yang punya keadaan — status pesanan, alur persetujuan. Uji perpindahan yang sah **dan yang tidak sah**. Yang tidak sah jumlahnya jauh lebih banyak, dan justru di situ cacat bersembunyi.

**Use Case Testing**

Susun kasus uji dari **alur pemakaian nyata**, bukan dari daftar fungsi. Satu use case dibaca dari awal sampai akhir seperti yang akan dilakukan pengguna.

Kelebihannya: ia menemukan cacat yang **hanya muncul saat langkah-langkah dirangkai** — misalnya data yang tidak terbawa dari layar satu ke layar berikutnya. Pengujian per fungsi tidak akan pernah menemukannya, karena tiap fungsinya memang benar.

**Error Guessing**

Menebak berdasarkan pengalaman: nilai nol, teks kosong, tanda kutip, spasi di awal, angka negatif, tanggal 29 Februari.

Teknik ini **tidak sistematis** dan tidak bisa menggantikan yang lain. Tetapi ia sering menemukan cacat yang lolos dari semua teknik sistematis, dan ia menjadi lebih tajam seiring bertambahnya pengalaman.

**Kelebihan dan batas black box**

Kelebihannya: tidak butuh akses kode, bisa dikerjakan oleh penguji khusus, dan mengukur **yang dijanjikan spesifikasi**.

Batasnya: ia tidak bisa tahu ada **cabang kode yang tidak pernah tersentuh**. Untuk itu dibutuhkan white box. Keduanya melengkapi, bukan bersaing.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA CACAT BERKUMPUL DI TEPI\n#\n# Spesifikasi: anak 0-12 tahun dapat diskon 50%\n#\n# Ditulis programmer:\n#     if usia < 12:  return 50\n#\n# Seharusnya:\n#     if usia <= 12: return 50\n#\n# Usia  6 -> 50%  benar\n# Usia 11 -> 50%  benar\n# Usia 12 ->  0%  SALAH   <-- hanya di sini\n# Usia 13 ->  0%  benar\n#\n# Cacatnya cuma ada pada SATU nilai dari 121.\n# Uji acak punya peluang 1/121 menyentuhnya.\n# Uji batas menyentuhnya dengan PASTI.',
      penjelasan: `
Kenapa cacat berkumpul di tepi? Ini bukan kebetulan atau kebiasaan buruk programmer. Alasannya ada pada **bentuk kodenya sendiri**.

Sebuah batas dinyatakan dengan operator perbandingan, dan ada **empat** pilihan: \`<\`, \`<=\`, \`>\`, \`>=\`. Untuk batas "anak sampai 12 tahun", programmer harus memilih antara \`usia < 12\` dan \`usia <= 12\`.

Kedua pilihan itu berbeda **tepat pada satu nilai**: usia 12.

Untuk 120 nilai lainnya, keduanya memberi jawaban yang sama persis. Itulah sebabnya cacat batas begitu sulit ditemukan secara kebetulan — ia **tidak salah di mana-mana kecuali di satu titik**.

Sekarang lihat betapa mudahnya kesalahan ini terjadi. Spesifikasinya berbunyi *"anak 0 sampai 12 tahun"*. Kata "sampai" dalam bahasa sehari-hari **ambigu**: apakah 12 termasuk atau tidak?

Programmer membacanya sekilas, menulis \`< 12\`, dan pindah ke baris berikutnya. Tidak ada yang terasa salah. Kodenya berjalan. Ujinya lulus.

Dan di sinilah equivalence partitioning saja **tidak cukup**, meskipun ia dikerjakan dengan benar.

EP menyuruh mengambil satu wakil dari tiap kelas. Wakil yang wajar untuk kelas "anak" adalah 6 — di tengah, jauh dari tepi, terasa mewakili. Ujinya lulus. Wakil untuk "dewasa" adalah 30. Lulus. Wakil untuk "lansia" adalah 70. Lulus.

**Lima kasus uji, lima kali lulus, dan cacatnya masih di sana.**

Yang membuatnya ketahuan adalah menambahkan **tepi** ke tiap kelas. Untuk batas 12: uji 11, 12, dan 13. Nilai 12 langsung gagal, dan letak cacatnya langsung terlihat.

Perhatikan bahwa BVA **tidak menggantikan** EP — ia melengkapinya. EP memastikan tiap kelas tersentuh; BVA memastikan tepi tiap kelas diperiksa. Dipakai bersama, jumlah kasusnya masih kecil: sekitar tiga kali jumlah batasnya.

Ada satu hal lagi yang sering terlewat: **tepi terluar**.

Untuk jangkauan 0 sampai 120, tepinya bukan cuma 12 dan 60. Ada juga \`-1\`, \`0\`, \`120\`, dan \`121\`. Dua di antaranya harus **ditolak**, dan penolakan itu perilaku yang perlu diperiksa sama seriusnya dengan penerimaan.

Program yang menerima usia \`-5\` dan menghitung diskon untuknya tidak melempar galat apa pun. Ia cuma memberi jawaban yang salah, diam-diam.

Terakhir, satu kebiasaan yang membuat semua ini bertahan: **setiap cacat batas yang ditemukan, jadikan kasus uji permanen**. Cacat yang diperbaiki tanpa uji penjaga akan kembali — mungkin oleh orang lain, mungkin oleh kamu sendiri enam bulan kemudian, saat kondisi itu ditulis ulang karena alasan lain.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Black box: equivalence partitioning & BVA
# ============================================
import random

# --------------------------------------------
# 0. Fungsi yang diuji -- ada satu cacat batas
# --------------------------------------------
def potongan(usia):
    """Diskon tiket: 0-12 anak 50%, 13-59 dewasa 0%,
       60+ lansia 30%.  (ada cacat di salah satu batas)"""
    if usia < 0 or usia > 120:
        raise ValueError("usia di luar jangkauan")
    if usia < 12:              # <-- CACAT: seharusnya <= 12
        return 50
    if usia >= 60:
        return 30
    return 0

# --------------------------------------------
# 1. Pengujian menyeluruh itu mustahil
# --------------------------------------------
print("--- kenapa tidak diuji semuanya saja ---")
print("  Satu masukan usia 0..120        : 121 nilai")
print("  Ditambah kelas (3) & rute (40)  : "
      + str(121 * 3 * 40) + " kombinasi")
print("  Ditambah tanggal (365)          : "
      + str(121 * 3 * 40 * 365) + " kombinasi")
print("")
print("  Dan itu baru empat masukan. Menguji semuanya")
print("  mustahil, jadi seluruh keterampilan pengujian")
print("  adalah keterampilan MEMILIH.")

# --------------------------------------------
# 2. Equivalence Partitioning
# --------------------------------------------
print("")
print("--- equivalence partitioning ---")
KELAS = [
    ("tidak sah bawah", -5,   "ditolak"),
    ("anak",             6,   "50%"),
    ("dewasa",          30,   "0%"),
    ("lansia",          70,   "30%"),
    ("tidak sah atas", 130,   "ditolak"),
]
print("  " + "kelas".ljust(18) + "wakil".rjust(7)
      + "  harapan".ljust(12) + "hasil")
for nama, wakil, harap in KELAS:
    try:
        hasil = str(potongan(wakil)) + "%"
    except ValueError:
        hasil = "ditolak"
    tanda = "  OK" if hasil == harap else "  GAGAL"
    print("  " + nama.ljust(18) + str(wakil).rjust(7)
          + "  " + harap.ljust(10) + hasil + tanda)
print("")
print("  5 kasus uji, semuanya LULUS. Kalau berhenti di")
print("  sini, cacatnya lolos ke produksi.")

# --------------------------------------------
# 3. Boundary Value Analysis
# --------------------------------------------
print("")
print("--- boundary value analysis ---")
print("  Cacat berkumpul di TEPI, bukan di tengah.")
print("  Untuk tiap batas b, uji b-1, b, dan b+1.")
print("")
BATAS = [
    (-1,   "ditolak"), (0,   "50%"),  (1,   "50%"),
    (11,   "50%"),     (12,  "50%"),  (13,  "0%"),
    (59,   "0%"),      (60,  "30%"),  (61,  "30%"),
    (120,  "30%"),     (121, "ditolak"),
]
gagal = 0
print("  " + "usia".rjust(6) + "  " + "harapan".ljust(10) + "hasil")
for usia, harap in BATAS:
    try:
        hasil = str(potongan(usia)) + "%"
    except ValueError:
        hasil = "ditolak"
    if hasil == harap:
        tanda = "  OK"
    else:
        tanda = "  <-- GAGAL"
        gagal += 1
    print("  " + str(usia).rjust(6) + "  " + harap.ljust(10)
          + hasil.ljust(9) + tanda)
print("")
print("  " + str(gagal) + " kasus gagal. Cacatnya di batas 12:")
print("  ditulis 'usia < 12', seharusnya 'usia <= 12'.")
print("  Anak berusia tepat 12 tahun kehilangan diskonnya.")

# --------------------------------------------
# 4. Kenapa uji acak tidak menemukannya
# --------------------------------------------
print("")
print("--- 1000 uji acak vs 11 uji batas ---")
random.seed(7)
ketemu = 0
for _ in range(1000):
    u = random.randint(0, 120)
    if u == 12:
        ketemu += 1
print("  usia 12 muncul " + str(ketemu) + " kali dari 1000 uji acak")
print("  peluang tiap uji menyentuhnya: 1/121 = "
      + ("%.2f%%" % (100 / 121)))
print("")
print("  Uji acak MUNGKIN menemukannya. Uji batas PASTI")
print("  menemukannya, dengan 11 kasus, bukan 1000.")

# --------------------------------------------
# 5. Setelah diperbaiki
# --------------------------------------------
def potongan_benar(usia):
    if usia < 0 or usia > 120:
        raise ValueError("usia di luar jangkauan")
    if usia <= 12:
        return 50
    if usia >= 60:
        return 30
    return 0

print("")
print("--- setelah diperbaiki ---")
sisa = 0
for usia, harap in BATAS:
    try:
        hasil = str(potongan_benar(usia)) + "%"
    except ValueError:
        hasil = "ditolak"
    if hasil != harap:
        sisa += 1
        print("  masih gagal: usia " + str(usia))
print("  kasus gagal tersisa: " + str(sisa))
print("")
print("  Tambahkan kasus uji usia 12 ini ke kumpulan uji")
print("  permanenmu. Cacat yang sudah diperbaiki tanpa uji")
print("  penjaga akan kembali suatu hari.")` },
  output: `--- kenapa tidak diuji semuanya saja ---
  Satu masukan usia 0..120        : 121 nilai
  Ditambah kelas (3) & rute (40)  : 14520 kombinasi
  Ditambah tanggal (365)          : 5299800 kombinasi

  Dan itu baru empat masukan. Menguji semuanya
  mustahil, jadi seluruh keterampilan pengujian
  adalah keterampilan MEMILIH.

--- equivalence partitioning ---
  kelas               wakil  harapan   hasil
  tidak sah bawah        -5  ditolak   ditolak  OK
  anak                    6  50%       50%  OK
  dewasa                 30  0%        0%  OK
  lansia                 70  30%       30%  OK
  tidak sah atas        130  ditolak   ditolak  OK

  5 kasus uji, semuanya LULUS. Kalau berhenti di
  sini, cacatnya lolos ke produksi.

--- boundary value analysis ---
  Cacat berkumpul di TEPI, bukan di tengah.
  Untuk tiap batas b, uji b-1, b, dan b+1.

    usia  harapan   hasil
      -1  ditolak   ditolak    OK
       0  50%       50%        OK
       1  50%       50%        OK
      11  50%       50%        OK
      12  50%       0%         <-- GAGAL
      13  0%        0%         OK
      59  0%        0%         OK
      60  30%       30%        OK
      61  30%       30%        OK
     120  30%       30%        OK
     121  ditolak   ditolak    OK

  1 kasus gagal. Cacatnya di batas 12:
  ditulis 'usia < 12', seharusnya 'usia <= 12'.
  Anak berusia tepat 12 tahun kehilangan diskonnya.

--- 1000 uji acak vs 11 uji batas ---
  usia 12 muncul 6 kali dari 1000 uji acak
  peluang tiap uji menyentuhnya: 1/121 = 0.83%

  Uji acak MUNGKIN menemukannya. Uji batas PASTI
  menemukannya, dengan 11 kasus, bukan 1000.

--- setelah diperbaiki ---
  kasus gagal tersisa: 0

  Tambahkan kasus uji usia 12 ini ke kumpulan uji
  permanenmu. Cacat yang sudah diperbaiki tanpa uji
  penjaga akan kembali suatu hari.`,

  kesalahanUmum: [
    {
      salah: 'Memakai equivalence partitioning saja dan menganggap cakupannya sudah memadai.',
      kenapa: 'Wakil yang dipilih untuk tiap kelas biasanya nilai di tengah, jauh dari tepi. Cacat batas hanya salah pada satu nilai tepat di titik batasnya, sehingga seluruh kasus uji bisa lulus sementara cacatnya masih ada.',
      benar: 'Pakai EP untuk memastikan tiap kelas tersentuh, lalu tambahkan BVA untuk memeriksa tepi tiap kelas.'
    },
    {
      salah: 'Menguji hanya kelas masukan yang sah.',
      kenapa: 'Program yang benar harus menolak masukan tidak sah dengan jelas, dan penolakan itu adalah perilaku yang dijanjikan spesifikasi. Program yang menerima usia negatif lalu menghitung diskon untuknya tidak melempar galat apa pun, ia hanya memberi jawaban salah secara diam-diam.',
      benar: 'Sertakan kelas tidak sah di kedua ujung jangkauan, dan periksa bahwa pesan penolakannya jelas.'
    },
    {
      salah: 'Menambah jumlah kasus uji acak dengan harapan menemukan lebih banyak cacat.',
      kenapa: 'Cacat batas hanya salah pada satu nilai dari seluruh jangkauan, sehingga tiap uji acak cuma punya peluang kecil menyentuhnya. Seribu uji acak tetap tidak menjamin, sementara sebelas uji batas menemukannya dengan pasti.',
      benar: 'Pilih kasus uji dari batas dan kelas ekuivalen, bukan dari pembangkit acak.'
    },
    {
      salah: 'Menyusun kasus uji dari daftar fungsi, satu fungsi satu uji.',
      kenapa: 'Sebagian cacat hanya muncul ketika langkah-langkah dirangkai, misalnya data yang tidak terbawa dari satu layar ke layar berikutnya. Pengujian per fungsi tidak akan menemukannya karena tiap fungsinya memang benar bila dijalankan sendiri.',
      benar: 'Tambahkan use case testing yang menelusuri satu alur pemakaian nyata dari awal sampai akhir.'
    },
    {
      salah: 'Menganggap error guessing sebagai teknik yang bisa menggantikan yang sistematis.',
      kenapa: 'Error guessing bergantung pada pengalaman penguji dan tidak punya jaminan cakupan apa pun, sehingga dua penguji bisa menghasilkan kumpulan uji yang sangat berbeda. Ia tidak bisa dipertanggungjawabkan sebagai bukti cakupan.',
      benar: 'Kerjakan teknik sistematisnya lebih dulu, lalu pakai error guessing sebagai tambahan di atasnya.'
    },
    {
      salah: 'Memperbaiki cacat batas tanpa menambahkan kasus uji penjaganya.',
      kenapa: 'Kondisi batas sering ditulis ulang karena alasan lain di kemudian hari, dan tanpa uji penjaga tidak ada yang memberi tahu bahwa cacat lama kembali. Cacat yang pernah terjadi cenderung terulang di kode yang ditulis dengan cara serupa.',
      benar: 'Setiap kali menemukan cacat batas, tambahkan nilai batasnya ke kumpulan uji permanen sebelum memperbaiki kodenya.'
    }
  ],

  analogi: `Bayangkan **pagar kampus yang dijaga satpam**.

Kamu diminta menguji apakah aturan "hanya mahasiswa yang boleh masuk" benar-benar berlaku.

Cara pertama: kamu kirim **satu mahasiswa**, satu dosen, dan satu orang asing. Ketiganya diperlakukan dengan benar. Kesimpulan: pagarnya aman.

Tapi kamu belum menguji **tepinya**. Bagaimana dengan mahasiswa yang kartunya kedaluwarsa **hari ini**? Kemarin? Besok?

Di situlah aturannya ditulis sebagai perbandingan tanggal — dan di situlah satpam, atau kodenya, bisa salah memilih antara "sebelum" dan "sampai dengan".

Orang yang kartunya kedaluwarsa sebulan lalu jelas ditolak. Orang yang kartunya berlaku sebulan lagi jelas diterima. **Yang kedaluwarsa tepat hari ini** — itu satu-satunya kasus yang jawabannya bergantung pada pilihan operator, dan satu-satunya yang bisa salah.

Kirim sepuluh ribu orang acak, dan kemungkinan besar tidak satu pun kartunya kedaluwarsa tepat hari ini.

Kirim **tiga orang** — kemarin, hari ini, besok — dan kamu pasti tahu jawabannya.`,

  latihan: [
    'Jelaskan kenapa pengujian menyeluruh mustahil, dengan menghitung jumlah kombinasi untuk empat masukan pada satu formulir nyata.',
    'Bagi masukan sebuah formulir pendaftaran menjadi kelas ekuivalen, termasuk kelas tidak sah, lalu pilih wakilnya.',
    'Untuk kelas yang sama, tambahkan kasus uji batas, lalu hitung berapa jumlah kasus ujinya bertambah.',
    'Tulis satu fungsi dengan cacat batas, lalu tunjukkan bahwa lima kasus EP lulus semua sementara kasus batas menemukannya.',
    'Hitung peluang satu uji acak menyentuh nilai batas pada jangkauan 0 sampai 1000, lalu bandingkan dengan jumlah kasus uji batas yang dibutuhkan.',
    'Susun decision table untuk aturan diskon dengan tiga syarat, lalu tunjukkan sel mana yang aturannya belum ditetapkan.',
    'Buat state transition diagram untuk status pesanan, lalu daftar perpindahan yang tidak sah dan uji penolakannya.',
    'Susun kasus uji use case untuk satu alur pemakaian nyata, dan jelaskan cacat jenis apa yang hanya bisa ditemukan cara ini.',
    'Sebutkan lima tebakan error guessing yang menurutmu paling sering menemukan cacat, beserta alasannya.',
    'Jelaskan satu jenis cacat yang tidak mungkin ditemukan black box testing, dan teknik apa yang dibutuhkan untuk itu.'
  ]
});


TOPICS.push({
  id: 'ukpl-tingkatan',
  judul: 'Tingkatan Pengujian & Strategi Integrasi',
  kategori: 'ukpl',
  tag: ['unit testing', 'integration testing', 'system testing', 'acceptance testing', 'stub', 'driver', 'regresi', 'smoke'],
  ringkas: 'Dua puluh modul disatukan sekaligus, satu cacat muncul — dan ada 190 tersangka.',

  fungsi: `**Menyusun urutan pengujian supaya kegagalan menunjuk ke satu tempat, bukan ke mana-mana.**

Terpakai di:

- **Merencanakan pengujian** proyek yang punya banyak modul
- **Bab pengujian** — tingkatan pengujian hampir selalu diminta
- **Kerja tim** — menentukan siapa menguji apa
- **Menjawab "kenapa lambat sekali mencari bug ini"**

Yang paling menghemat waktu: **integrasi bertahap membeli kemampuan menunjuk letak cacat.**

Menyatukan dua puluh modul sekaligus lalu menemukan satu cacat berarti 190 hubungan jadi tersangka. Menambah satu modul tiap kali membuat tersangkanya selalu modul terbaru.

Dan yang paling sering tertukar: **retest menjalankan uji yang dulu GAGAL; regresi menjalankan uji yang dulu LULUS.** Keduanya wajib, dan tidak saling menggantikan.`,

  praktik: {
    tujuan: 'Kamu punya rencana integrasi bertahap yang jelas, beserta stub dan driver yang dibutuhkan.',
    alat: [
      'Kertas untuk pohon modul',
      'Kerangka pengujian seperti pytest',
      'Proyekmu sendiri'
    ],
    langkah: [
      { judul: 'Gambar pohon modulmu',
        isi: `Gambar modul mana memanggil modul mana.

Kalau gambarnya terlalu ruwet untuk digambar, itu sendiri temuan: modulmu terlalu saling terikat, dan integrasinya akan sulit apa pun strateginya.` },
      { judul: 'Hitung tersangkanya untuk big bang',
        isi: `- pasangan antarmuka = \`n(n-1)/2\`

Isi n dengan jumlah modulmu. Angka itu adalah berapa hubungan yang harus dicurigai kalau kamu menyatukan semuanya sekaligus.

Bandingkan dengan \`n-1\` untuk integrasi bertahap.` },
      { judul: 'Pilih strategi dari risikonya',
        isi: `Satu pertanyaan menentukan: **bagian mana yang paling berisiko?**

- risiko di **alur dan logika utama** → **top-down**, supaya alurnya bisa diperlihatkan lebih awal
- risiko di **modul dasar** yang rumit → **bottom-up**, supaya bagian tersulitnya terbukti lebih dulu` },
      { judul: 'Buat stub atau driver yang dibutuhkan',
        isi: `- **stub** menggantikan modul yang **dipanggil** — ia menjawab
- **driver** menggantikan modul yang **memanggil** — ia bertanya

Top-down butuh stub, bottom-up butuh driver. Hitung berapa yang harus kamu buat sebelum memulai.` },
      { judul: 'Buat stub-nya bisa gagal',
        isi: `Stub yang selalu mengembalikan data rapi dan selalu berhasil **berbahaya**.

Modul di atasnya lulus uji tanpa pernah menghadapi data kosong atau panggilan yang gagal — dan cacat penanganan galatnya baru muncul setelah modul asli dipasang.

Buat stub yang juga bisa mengembalikan kegagalan.` },
      { judul: 'Integrasikan satu per satu, uji tiap kali',
        isi: `Tambah satu modul, jalankan seluruh ujinya, catat hasilnya.

Kalau tadi lulus dan sekarang gagal, penyebabnya hampir pasti berkaitan dengan modul yang baru masuk.` },
      { judul: 'Pisahkan retest dan regresi',
        isi: `Setelah tiap perbaikan, jalankan **dua** hal:

- **retest** — kasus uji yang tadi gagal, untuk membuktikan cacatnya hilang
- **regresi** — kasus uji yang tadi lulus, untuk membuktikan tidak ada yang rusak

Hanya menjalankan yang pertama adalah kesalahan yang paling sering terjadi.` },
      { judul: 'Susun kasus uji penerimaan lebih dulu',
        isi: `Tulis kasus uji penerimaan **bersamaan** dengan dokumen kebutuhan, sebelum satu baris kode ditulis.

Menyusunnya belakangan berarti menyusunnya dari sistem yang sudah ada — dan ia tidak lagi bisa membuktikan kesesuaian dengan permintaan.` }
    ],
    cek: [
      'Kamu tahu berapa tersangka yang kamu hindari dengan integrasi bertahap',
      'Stub-mu bisa mengembalikan kegagalan, bukan cuma keberhasilan',
      'Setiap perbaikan diikuti retest dan regresi, bukan salah satunya saja'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa integrasi dilakukan bertahap',

  konsep: `
Pengujian dilakukan pada **empat tingkat**, dan masing-masing menjawab pertanyaan yang berbeda. Melewatkan satu tingkat tidak bisa ditutup dengan memperbanyak tingkat yang lain.

| Tingkat | Yang diuji | Siapa | Acuannya |
|---|---|---|---|
| **Unit** | satu fungsi atau kelas | programmer | perancangan rinci |
| **Integrasi** | hubungan antar modul | programmer / penguji | perancangan arsitektur |
| **Sistem** | seluruh sistem utuh | penguji | spesifikasi kebutuhan |
| **Penerimaan** | sesuai kebutuhan bisnis | pengguna / klien | kebutuhan pengguna |

Perhatikan kolom **acuan**. Tiap tingkat diuji terhadap **dokumen pasangannya** di sisi kiri V-Model — bukan terhadap kode yang sedang dibaca. Inilah yang membuat uji bisa gagal; kalau acuannya kodenya sendiri, ujinya selalu lulus.

**Unit testing**

Menguji satu bagian terkecil **secara terpisah**. Ketergantungannya diganti tiruan supaya kegagalannya menunjuk tepat ke satu tempat.

Kalau sebuah unit sulit diuji sendiri, itu **bukan masalah pengujian** — itu tanda rancangannya terlalu terikat pada hal lain. Kesulitan mengujinya adalah umpan balik tentang rancangan.

**Integration testing**

Modul yang masing-masing benar bisa **gagal saat disatukan**: satuan berbeda, urutan argumen tertukar, satu mengira nilai kosong artinya nol sementara yang lain mengira artinya belum diisi.

Empat strateginya:

- **Big bang** — satukan semuanya sekaligus. Cepat disiapkan, tetapi ketika cacat muncul, **semua hubungan jadi tersangka**.
- **Top-down** — mulai dari modul atas, modul bawah yang belum siap diganti **stub**. Alur utama terlihat sejak awal; modul bawah teruji paling akhir.
- **Bottom-up** — mulai dari modul bawah, pemanggilnya diganti **driver**. Modul dasar teruji paling awal; alur utama baru terlihat di akhir.
- **Sandwich** — keduanya sekaligus, bertemu di tengah. Paling cepat, paling banyak tiruan yang harus dibuat.

**Stub dan driver** sering tertukar:

- **stub** menggantikan modul yang **dipanggil** — ia menjawab
- **driver** menggantikan modul yang **memanggil** — ia bertanya

**System testing**

Menguji sistem **utuh** terhadap spesifikasi kebutuhan, di lingkungan yang menyerupai lingkungan sebenarnya.

Di sinilah kebutuhan **non-fungsional** diuji: kinerja, keamanan, keterpakaian, kompatibilitas. Kebutuhan seperti ini tidak bisa diuji di tingkat unit, karena ia sifat **keseluruhan**, bukan sifat bagian.

**Acceptance testing**

- **Alpha** — di tempat pengembang, oleh pengguna internal atau QA
- **Beta** — di tempat pengguna, oleh pengguna nyata terbatas
- **UAT** — skenario bisnis nyata, oleh klien yang membayar

Yang diuji di sini **bukan** *"apakah sistemnya benar"*, melainkan *"apakah ini yang kami minta"*.

Sistem bisa lulus semua uji sistem dan tetap gagal di sini. Kalau itu terjadi, yang salah **spesifikasinya**, bukan kodenya — dan itulah sebabnya kasus uji penerimaan sebaiknya disusun **di awal**, bersamaan dengan kebutuhannya.

**Empat jenis uji yang sering tertukar**

- **Smoke** — cepat dan dangkal. Menjawab: layak diuji lebih lanjut atau tidak?
- **Sanity** — cepat dan sempit. Menjawab: perbaikan tadi jalan, tanpa uji lengkap?
- **Retest** — menjalankan kasus uji yang **dulu gagal**. Menjawab: cacatnya benar-benar hilang?
- **Regresi** — menjalankan kasus uji yang **dulu lulus**. Menjawab: perbaikan tadi merusak yang lain?

Retest dan regresi paling sering tertukar, dan keduanya wajib. Retest membuktikan perbaikannya berhasil; regresi membuktikan perbaikannya tidak merusak hal lain.

**Biaya memperbaiki cacat naik tiap tingkat**

Makin lambat sebuah cacat ditemukan, makin mahal memperbaikinya — karena makin banyak pekerjaan yang sudah dibangun di atasnya. Cacat spesifikasi yang ketahuan setelah sistem dipakai menuntut perubahan pada rancangan, kode, dokumen, data yang sudah masuk, dan kebiasaan penggunanya.

Inilah alasan sesungguhnya menguji sejak awal: bukan karena lebih rajin, melainkan karena **lebih murah**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# BIG BANG vs INTEGRASI BERTAHAP\n#\n# n modul disatukan -> jumlah pasangan antarmuka:\n#     n * (n-1) / 2\n#\n#   modul   pasangan   tersangka bila cacat muncul\n#       3          3   3   (big bang)\n#      10         45   45\n#      20        190   190\n#\n# Integrasi bertahap: tambah SATU modul tiap kali.\n# Cacat yang muncul setelah menambahkan modul ke-k\n# hampir pasti ada pada hubungan modul itu --\n# tersangkanya k-1, bukan 190.\n#\n# Waktu penyiapannya lebih lama.\n# Waktu MENCARI cacatnya jauh lebih pendek.',
      penjelasan: `
Big bang integration terlihat masuk akal kalau dilihat dari sisi persiapannya. Tidak perlu membuat stub, tidak perlu membuat driver, tidak perlu menyusun urutan. Tinggal satukan semuanya dan jalankan.

Yang tidak terlihat adalah harganya, dan harganya dibayar di tempat lain.

Hitung jumlah **pasangan antarmuka**. Dengan \`n\` modul, ada \`n(n-1)/2\` pasangan yang mungkin saling berhubungan. Untuk 20 modul: **190**.

Sekarang jalankan sistemnya dan muncul satu kegagalan. Pertanyaannya: **di antarmuka mana?**

Jawabannya bisa di mana saja dari 190 kemungkinan. Dan kamu tidak punya petunjuk untuk mempersempitnya, karena semuanya baru pertama kali berjalan bersamaan.

Bandingkan dengan integrasi bertahap. Kamu menyatukan modul satu per satu. Setelah menambahkan modul ke-\`k\`, sistemnya diuji lagi. Kalau ia gagal sekarang padahal tadi lulus, maka penyebabnya hampir pasti **berkaitan dengan modul yang baru saja ditambahkan**.

Tersangkanya turun dari 190 menjadi paling banyak \`k-1\` — dan biasanya jauh lebih sedikit, karena tidak semua modul berhubungan langsung.

Perhatikan apa yang sebenarnya kamu beli. Bukan lebih sedikit cacat — cacatnya sama saja. Yang kamu beli adalah **kemampuan menunjuk letaknya**.

Dan itu berharga karena waktu memperbaiki cacat sebagian besar habis untuk **mencari**, bukan untuk mengetik perbaikannya. Menemukan baris yang salah biasanya jauh lebih lama daripada mengubahnya.

Sekarang biaya bertahap juga jelas: kamu harus membuat **stub** atau **driver** untuk modul yang belum ikut. Itu pekerjaan tambahan yang tidak akan dikirim ke pengguna.

Untuk pohon dengan enam modul, top-down membutuhkan stub untuk semua modul selain akar. Bottom-up membutuhkan driver untuk semua modul selain akar. Sandwich membutuhkan keduanya, dan karena itu paling banyak pekerjaan tiruannya — tetapi paling cepat selesai, karena dua sisi berjalan bersamaan.

Cara memilihnya bisa ditentukan dari satu pertanyaan: **bagian mana yang paling berisiko?**

Kalau risiko terbesarnya ada pada **alur dan logika utama** — misalnya spesifikasinya masih diperdebatkan — pilih **top-down**, supaya alur utamanya bisa diperlihatkan ke pengguna lebih awal.

Kalau risiko terbesarnya ada pada **modul dasar** — misalnya perhitungan rumit atau akses ke perangkat keras — pilih **bottom-up**, supaya bagian tersulitnya terbukti bekerja sebelum yang lain dibangun di atasnya.

Dan satu hal yang berlaku untuk semua strategi: **stub yang terlalu pintar berbahaya**. Stub yang mengembalikan data yang selalu rapi dan selalu berhasil membuat modul di atasnya lulus uji tanpa pernah menghadapi keadaan yang sulit. Buat stub yang juga bisa mengembalikan kegagalan dan data kosong.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Tingkatan pengujian & strategi integrasi
# ============================================

# --------------------------------------------
# 1. Empat tingkatan
# --------------------------------------------
print("--- empat tingkatan pengujian ---")
TINGKAT = [
    ("Unit",        "satu fungsi / kelas",     "programmer",
     "perancangan rinci"),
    ("Integrasi",   "hubungan antar modul",    "programmer/penguji",
     "perancangan arsitektur"),
    ("Sistem",      "seluruh sistem utuh",     "penguji",
     "spesifikasi kebutuhan"),
    ("Penerimaan",  "sesuai kebutuhan bisnis", "pengguna/klien",
     "kebutuhan pengguna"),
]
print("  " + "tingkat".ljust(12) + "yang diuji".ljust(26)
      + "siapa")
for nama, apa, siapa, dari in TINGKAT:
    print("  " + nama.ljust(12) + apa.ljust(26) + siapa)
    print("  " + " " * 12 + "acuannya: " + dari)
print("")
print("  Perhatikan kolom acuan: tiap tingkat diuji terhadap")
print("  dokumen PASANGANNYA di sisi kiri V-Model, bukan")
print("  terhadap kode yang sedang dibaca.")

# --------------------------------------------
# 2. Kenapa integrasi big bang menyulitkan
# --------------------------------------------
print("")
print("--- big bang: satu cacat, berapa tersangka? ---")
print("  " + "modul".rjust(7) + "pasangan".rjust(11)
      + "tersangka".rjust(12) + "tersangka".rjust(12))
print("  " + "".rjust(7) + "antarmuka".rjust(11)
      + "big bang".rjust(12) + "bertahap".rjust(12))
for n in (3, 5, 10, 20):
    pasangan = n * (n - 1) // 2
    print("  " + str(n).rjust(7) + str(pasangan).rjust(11)
          + str(pasangan).rjust(12) + str(n - 1).rjust(12))
print("")
print("  Menyatukan 20 modul sekaligus lalu menemukan satu")
print("  cacat berarti 190 hubungan yang harus dicurigai.")
print("  Integrasi bertahap menambah SATU modul tiap kali,")
print("  sehingga tersangkanya selalu hanya modul terbaru.")

# --------------------------------------------
# 3. Stub dan driver
# --------------------------------------------
print("")
print("--- berapa stub & driver yang dibutuhkan? ---")
# Pohon modul: A memanggil B & C; B memanggil D & E; C memanggil F
ANAK = {"A": ["B", "C"], "B": ["D", "E"], "C": ["F"],
        "D": [], "E": [], "F": []}
INDUK = {}
for p, cs in ANAK.items():
    for c in cs:
        INDUK[c] = p

daun = [m for m in ANAK if not ANAK[m]]
akar = [m for m in ANAK if m not in INDUK]
tengah = [m for m in ANAK if m not in daun and m not in akar]

print("  Pohon: A -> B, C   |   B -> D, E   |   C -> F")
print("")
print("  TOP-DOWN (mulai dari atas)")
print("    butuh STUB   : tiruan modul bawah yang belum ada")
print("    jumlah stub  : " + str(len(ANAK) - len(akar))
      + " (semua modul selain akar)")
print("    kelebihan    : alur utama terlihat sejak awal")
print("    kekurangan   : modul bawah teruji paling akhir")
print("")
print("  BOTTOM-UP (mulai dari bawah)")
print("    butuh DRIVER : pemanggil buatan untuk modul bawah")
print("    jumlah driver: " + str(len(daun) + len(tengah))
      + " (semua modul selain akar)")
print("    kelebihan    : modul dasar teruji paling awal")
print("    kekurangan   : alur utama baru terlihat di akhir")
print("")
print("  SANDWICH: keduanya sekaligus, bertemu di tengah.")
print("  Paling cepat, paling banyak tiruan yang harus dibuat.")

# --------------------------------------------
# 4. Jenis uji yang sering tertukar
# --------------------------------------------
print("")
print("--- empat jenis uji yang sering tertukar ---")
JENIS = [
    ("Smoke",     "cepat & dangkal",
     "layak diuji lebih lanjut atau tidak?"),
    ("Sanity",    "cepat & sempit",
     "perbaikan tadi jalan, tanpa uji lengkap?"),
    ("Retest",    "kasus uji yang DULU gagal",
     "cacat itu benar-benar hilang?"),
    ("Regresi",   "kasus uji yang DULU lulus",
     "perbaikan tadi merusak yang lain?"),
]
for nama, sifat, tanya in JENIS:
    print("  " + nama.ljust(10) + sifat)
    print("  " + " " * 10 + "menjawab: " + tanya)
print("")
print("  Retest dan regresi paling sering tertukar. Retest")
print("  menjalankan uji yang GAGAL; regresi menjalankan uji")
print("  yang LULUS. Keduanya wajib, dan tidak saling")
print("  menggantikan.")

# --------------------------------------------
# 5. Biaya memperbaiki cacat naik tiap tingkat
# --------------------------------------------
print("")
print("--- biaya memperbaiki satu cacat ---")
BIAYA = [
    ("saat menulis kebutuhan",  1),
    ("saat merancang",          5),
    ("saat menulis kode",      10),
    ("saat pengujian sistem",  50),
    ("setelah dipakai",       100),
]
print("  " + "ditemukan".ljust(26) + "biaya relatif")
for nama, x in BIAYA:
    print("  " + nama.ljust(26) + ("%3d x" % x)
          + "  " + "#" * (x // 4 + 1))
print("")
print("  Angka ini perbandingan kasar yang sering dikutip,")
print("  bukan hasil pengukuran yang berlaku di semua tempat.")
print("  Yang nyata bukan angkanya, melainkan ARAHNYA: makin")
print("  lambat ditemukan, makin mahal -- karena makin banyak")
print("  pekerjaan yang sudah dibangun di atas cacat itu.")

# --------------------------------------------
# 6. Penerimaan: alpha, beta, UAT
# --------------------------------------------
print("")
print("--- pengujian penerimaan ---")
TERIMA = [
    ("Alpha", "di tempat pengembang", "pengguna internal / QA"),
    ("Beta",  "di tempat pengguna",   "pengguna nyata terbatas"),
    ("UAT",   "skenario bisnis nyata","klien yang membayar"),
]
for nama, tempat, siapa in TERIMA:
    print("  " + nama.ljust(7) + tempat.ljust(24) + siapa)
print("")
print("  Yang diuji di sini BUKAN 'apakah sistemnya benar',")
print("  melainkan 'apakah ini yang kami minta'. Sistem bisa")
print("  lulus semua uji sistem dan tetap gagal di sini --")
print("  dan kalau itu terjadi, yang salah spesifikasinya.")` },
  output: `--- empat tingkatan pengujian ---
  tingkat     yang diuji                siapa
  Unit        satu fungsi / kelas       programmer
              acuannya: perancangan rinci
  Integrasi   hubungan antar modul      programmer/penguji
              acuannya: perancangan arsitektur
  Sistem      seluruh sistem utuh       penguji
              acuannya: spesifikasi kebutuhan
  Penerimaan  sesuai kebutuhan bisnis   pengguna/klien
              acuannya: kebutuhan pengguna

  Perhatikan kolom acuan: tiap tingkat diuji terhadap
  dokumen PASANGANNYA di sisi kiri V-Model, bukan
  terhadap kode yang sedang dibaca.

--- big bang: satu cacat, berapa tersangka? ---
    modul   pasangan   tersangka   tersangka
           antarmuka    big bang    bertahap
        3          3           3           2
        5         10          10           4
       10         45          45           9
       20        190         190          19

  Menyatukan 20 modul sekaligus lalu menemukan satu
  cacat berarti 190 hubungan yang harus dicurigai.
  Integrasi bertahap menambah SATU modul tiap kali,
  sehingga tersangkanya selalu hanya modul terbaru.

--- berapa stub & driver yang dibutuhkan? ---
  Pohon: A -> B, C   |   B -> D, E   |   C -> F

  TOP-DOWN (mulai dari atas)
    butuh STUB   : tiruan modul bawah yang belum ada
    jumlah stub  : 5 (semua modul selain akar)
    kelebihan    : alur utama terlihat sejak awal
    kekurangan   : modul bawah teruji paling akhir

  BOTTOM-UP (mulai dari bawah)
    butuh DRIVER : pemanggil buatan untuk modul bawah
    jumlah driver: 5 (semua modul selain akar)
    kelebihan    : modul dasar teruji paling awal
    kekurangan   : alur utama baru terlihat di akhir

  SANDWICH: keduanya sekaligus, bertemu di tengah.
  Paling cepat, paling banyak tiruan yang harus dibuat.

--- empat jenis uji yang sering tertukar ---
  Smoke     cepat & dangkal
            menjawab: layak diuji lebih lanjut atau tidak?
  Sanity    cepat & sempit
            menjawab: perbaikan tadi jalan, tanpa uji lengkap?
  Retest    kasus uji yang DULU gagal
            menjawab: cacat itu benar-benar hilang?
  Regresi   kasus uji yang DULU lulus
            menjawab: perbaikan tadi merusak yang lain?

  Retest dan regresi paling sering tertukar. Retest
  menjalankan uji yang GAGAL; regresi menjalankan uji
  yang LULUS. Keduanya wajib, dan tidak saling
  menggantikan.

--- biaya memperbaiki satu cacat ---
  ditemukan                 biaya relatif
  saat menulis kebutuhan      1 x  #
  saat merancang              5 x  ##
  saat menulis kode          10 x  ###
  saat pengujian sistem      50 x  #############
  setelah dipakai           100 x  ##########################

  Angka ini perbandingan kasar yang sering dikutip,
  bukan hasil pengukuran yang berlaku di semua tempat.
  Yang nyata bukan angkanya, melainkan ARAHNYA: makin
  lambat ditemukan, makin mahal -- karena makin banyak
  pekerjaan yang sudah dibangun di atas cacat itu.

--- pengujian penerimaan ---
  Alpha  di tempat pengembang    pengguna internal / QA
  Beta   di tempat pengguna      pengguna nyata terbatas
  UAT    skenario bisnis nyata   klien yang membayar

  Yang diuji di sini BUKAN 'apakah sistemnya benar',
  melainkan 'apakah ini yang kami minta'. Sistem bisa
  lulus semua uji sistem dan tetap gagal di sini --
  dan kalau itu terjadi, yang salah spesifikasinya.`,

  kesalahanUmum: [
    {
      salah: 'Menyatukan semua modul sekaligus karena tidak mau repot membuat stub dan driver.',
      kenapa: 'Persiapannya memang lebih cepat, tetapi ketika satu cacat muncul, seluruh pasangan antarmuka menjadi tersangka. Untuk dua puluh modul itu berarti 190 kemungkinan tanpa petunjuk untuk mempersempitnya, dan waktu memperbaiki cacat sebagian besar habis untuk mencari, bukan mengetik.',
      benar: 'Satukan modul satu per satu dan jalankan ujinya tiap kali, sehingga tersangkanya selalu modul yang baru ditambahkan.'
    },
    {
      salah: 'Membuat stub yang selalu mengembalikan data rapi dan selalu berhasil.',
      kenapa: 'Modul di atasnya jadi lulus uji tanpa pernah menghadapi keadaan sulit seperti data kosong, nilai di luar jangkauan, atau kegagalan panggilan. Cacat penanganan galatnya baru muncul setelah modul asli dipasang, yaitu saat tersangkanya sudah banyak.',
      benar: 'Buat stub yang bisa mengembalikan kegagalan dan data kosong, lalu uji kedua jalur itu sejak tahap integrasi.'
    },
    {
      salah: 'Menukar arti stub dan driver.',
      kenapa: 'Stub menggantikan modul yang dipanggil sehingga ia menjawab, sedangkan driver menggantikan modul yang memanggil sehingga ia bertanya. Salah memilih berarti membuat tiruan untuk arah yang salah dan integrasinya tidak bisa dijalankan.',
      benar: 'Ingat arahnya: top-down butuh stub karena yang belum ada berada di bawah, bottom-up butuh driver karena yang belum ada berada di atas.'
    },
    {
      salah: 'Menjalankan retest saja setelah memperbaiki cacat, lalu menganggap pekerjaan selesai.',
      kenapa: 'Retest menjalankan kasus uji yang dulu gagal dan hanya membuktikan cacat itu hilang. Ia tidak menjawab apakah perbaikannya merusak bagian lain yang tadinya benar, dan justru itu risiko terbesar dari sebuah perbaikan.',
      benar: 'Jalankan retest untuk membuktikan cacatnya hilang, lalu regresi untuk membuktikan tidak ada yang rusak karenanya.'
    },
    {
      salah: 'Menyusun kasus uji penerimaan setelah sistemnya jadi.',
      kenapa: 'Uji penerimaan menanyakan apakah ini yang diminta klien, dan jawabannya ditentukan oleh kebutuhan yang disepakati di awal. Menyusunnya belakangan berarti menyusunnya dari sistem yang sudah ada, sehingga ia tidak lagi bisa membuktikan kesesuaian dengan permintaan.',
      benar: 'Susun kasus uji penerimaan bersamaan dengan dokumen kebutuhan, sebelum satu baris kode ditulis.'
    },
    {
      salah: 'Menganggap unit yang sulit diuji sendiri sebagai masalah pengujian.',
      kenapa: 'Kesulitan menguji unit secara terpisah hampir selalu berarti unit itu terlalu terikat pada hal lain, misalnya membuat koneksi sendiri atau membaca berkas langsung. Itu umpan balik tentang rancangannya, bukan tentang alat ujinya.',
      benar: 'Perbaiki rancangannya dengan memindahkan ketergantungan ke parameter, lalu ujinya menjadi mudah dengan sendirinya.'
    }
  ],

  analogi: `Bayangkan **merakit sepeda dari kotak**.

Cara pertama: pasang semua bagian sekaligus, lalu naiki. Terasa oleng.

Sekarang, **bagian mana yang salah?** Bisa stangnya, bisa rodanya, bisa sadelnya, bisa rangkanya — dan bisa juga **hubungan** antara dua di antaranya: baut yang kurang kencang di titik yang tidak kamu curigai. Kamu harus membongkar hampir semuanya untuk mencari.

Cara kedua: pasang rangka, uji berdiri. Pasang roda depan, dorong. Pasang roda belakang, dorong lagi. Pasang stang, belokkan. Pasang sadel, duduki.

Kalau setelah memasang stang sepedanya jadi oleng, penyebabnya **hampir pasti stang atau pemasangannya** — karena empat langkah sebelumnya sudah terbukti baik.

Cara kedua lebih lama disiapkan. Kamu harus menyangga sepeda yang belum punya roda, dan menahan rangka yang belum punya sadel — itulah stub dan driver.

Tetapi ketika ada yang salah, kamu **tahu di mana**. Dan pada perakitan yang benar-benar rumit, waktu yang habis bukan untuk mengencangkan baut, melainkan untuk **mencari baut mana**.`,

  latihan: [
    'Sebutkan empat tingkatan pengujian beserta yang diuji, siapa yang menguji, dan dokumen acuannya masing-masing.',
    'Jelaskan kenapa tiap tingkat diuji terhadap dokumen pasangannya di V-Model, bukan terhadap kodenya sendiri.',
    'Hitung jumlah pasangan antarmuka untuk 8, 15, dan 30 modul, lalu bandingkan jumlah tersangka pada big bang dan integrasi bertahap.',
    'Gambar pohon modul dengan tujuh simpul, lalu hitung berapa stub yang dibutuhkan top-down dan berapa driver yang dibutuhkan bottom-up.',
    'Jelaskan beda stub dan driver, lalu tentukan mana yang dibutuhkan untuk tiap strategi integrasi.',
    'Jelaskan kenapa stub yang selalu berhasil justru berbahaya, dan apa yang sebaiknya bisa dikembalikan stub yang baik.',
    'Jelaskan beda smoke, sanity, retest, dan regresi, lalu tentukan kapan masing-masing dijalankan.',
    'Jelaskan beda alpha, beta, dan UAT, lalu jelaskan apa artinya kalau sistem lulus uji sistem tetapi gagal di UAT.',
    'Jelaskan kenapa biaya memperbaiki cacat naik makin lambat ia ditemukan, dan sebutkan apa saja yang harus ikut diubah bila cacat spesifikasi ketahuan setelah sistem dipakai.',
    'Ambil satu unit di proyekmu yang sulit diuji sendiri, lalu ubah rancangannya sehingga ketergantungannya bisa digantikan.'
  ]
});


TOPICS.push({
  id: 'ukpl-kinerja-keamanan',
  judul: 'Pengujian Kinerja & Keamanan',
  kategori: 'ukpl',
  tag: ['load testing', 'stress testing', 'endurance', 'persentil', 'hukum Little', 'penetration testing', 'vulnerability scanning'],
  ringkas: 'Rata-rata 215 ms, target terpenuhi — dan dua dari tiga kunjungan tetap terasa lambat.',

  fungsi: `**Menguji hal yang tidak bisa dijawab oleh benar atau salah.**

Terpakai di:

- **Menentukan target kinerja** yang bisa diuji dan bisa gagal
- **Menjelaskan** kenapa laporan hijau tapi pengguna mengeluh
- **Menghitung kapasitas** sebelum sistem dipasang
- **Bab pengujian** — pengujian non-fungsional makin sering diminta

Yang paling mengubah cara kerja: **ukur persentil, bukan rata-rata.**

Rata-rata mencampur mayoritas yang cepat dengan minoritas yang menderita, dan menghasilkan angka yang **tidak dialami siapa pun**. Kalau 5 persen permintaan lambat dan satu halaman memuat 20 permintaan, hampir dua dari tiga kunjungan terasa lambat.

Dan untuk keamanan, satu kaidah yang tidak boleh dilewatkan: **uji keamanan hanya pada sistem yang kamu punya izin untuk menguji.** Tanpa izin tertulis, ia pelanggaran hukum betapa pun baik niatnya.`,

  praktik: {
    tujuan: `Kamu punya angka kinerja yang jujur, tahu kapasitas sistemmu, dan sudah menguji masukan berbahaya di tempat yang tepat.`,
    alat: [
      'Python dengan modul time',
      'JMeter atau k6 untuk beban',
      'Sistem milikmu sendiri'
    ],
    langkah: [
      { judul: 'Kumpulkan waktu tanggap yang nyata',
        isi: `Catat waktu tiap permintaan, jangan cuma rata-ratanya.

Simpan semuanya. Persentil tidak bisa dihitung dari rata-rata, jadi data mentahnya harus disimpan.` },
      { judul: 'Hitung persentilnya',
        isi: `Urutkan datamu, lalu ambil nilai di posisi 50, 90, 95, dan 99 persen.

Bandingkan p95 dengan rata-ratanya. Selisihnya biasanya besar, dan di situlah penderitaan yang tersembunyi.` },
      { judul: 'Hitung di tingkat kunjungan',
        isi: `- peluang halaman terasa lambat = \`1 - (1 - p)^n\`

Isi p dengan peluang satu permintaan lambat, dan n dengan jumlah permintaan per halaman.

Angka ini yang harus kamu bandingkan dengan keluhan pengguna, bukan angka per permintaan.` },
      { judul: 'Tulis ulang target kinerjamu',
        isi: `Buruk: *"sistem harus cepat"*.

Benar: *"p95 di bawah 500 ms dan p99 di bawah 2 detik, pada beban 200 permintaan per detik"*.

Yang kedua bisa diuji dan bisa gagal — dan itu syarat sebuah target.` },
      { judul: 'Naikkan beban sampai patah',
        isi: `Jalankan beban bertahap: 50, 100, 200, 400 pengguna. Catat throughput, p95, dan galat.

Cari titik ketika **throughput berhenti naik** sementara latency terus memburuk. Itulah kapasitas sesungguhnya.

Menguji hanya di beban aman berarti kapasitasnya tidak pernah diketahui sampai lonjakan pertama di produksi.` },
      { judul: 'Periksa bagaimana ia gagal',
        isi: `Pada beban berlebih, periksa: apakah ia **menolak dengan sopan** dan pulih setelah beban turun, atau rusak dan kehilangan data?

Ini pertanyaan sesungguhnya dari stress testing — bukan apakah ia sanggup, melainkan bagaimana ia menyerah.` },
      { judul: 'Jalankan uji ketahanan',
        isi: `Jalankan beban normal berjam-jam sampai berhari-hari sambil memantau pemakaian memori dan jumlah koneksi.

Kebocoran menumpuk perlahan dan tidak terlihat pada uji beberapa menit.` },
      { judul: 'Hitung ukuran kolam koneksi',
        isi: `- \`L = lambda x W\`

Isi lambda dengan laju kedatangan dan W dengan waktu proses. Hasilnya berapa permintaan berjalan bersamaan.

Kolam yang lebih kecil dari itu akan selalu penuh — dan itu bisa dihitung sebelum sistemnya dipasang.` },
      { judul: 'Uji masukan berbahaya di sistemmu sendiri',
        isi: `Di setiap tempat data pengguna diterima, coba: teks sangat panjang, tanda kutip, tanda kurung sudut, titik-titik ganda, dan bita nol.

Uji fungsional bertanya *"apakah yang seharusnya bekerja, bekerja"*. Ini bertanya *"apakah yang seharusnya tidak bisa, benar-benar tidak bisa"*.

Lakukan **hanya pada sistem milikmu sendiri**.` }
    ],
    cek: [
      'Target kinerjamu ditulis sebagai persentil beserta bebannya',
      'Kamu tahu di beban berapa throughput sistemmu berhenti naik',
      'Setiap tempat data pengguna diterima sudah diuji dengan masukan berbahaya'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa rata-rata menyembunyikan penderitaan',

  konsep: `
Sistem bisa **benar** dan tetap **tidak layak dipakai**. Ia menghitung jawaban yang tepat, tetapi butuh delapan detik. Atau ia melayani seratus pengguna dengan baik dan roboh pada pengguna ke-seratus satu. Atau ia bekerja sempurna sampai seseorang mengetik tanda kutip di kolom nama.

Ketiganya adalah **kebutuhan non-fungsional**, dan tidak satu pun bisa diuji di tingkat unit — karena ketiganya sifat **keseluruhan**, bukan sifat bagian.

**Empat jenis pengujian kinerja**

- **Load testing** — beban yang **diharapkan**. Menjawab: sanggup melayani beban normal?
- **Stress testing** — beban **di atas batas**. Menjawab: di titik mana ia patah, dan **bagaimana**?
- **Endurance testing** — beban normal, **waktu lama**. Menjawab: ada kebocoran memori yang menumpuk?
- **Spike testing** — lonjakan **mendadak**. Menjawab: pulih setelah lonjakannya lewat?

Yang paling sering disalahpahami **stress testing**. Ia bukan untuk membuktikan sistem kuat. Ia untuk mengetahui **bagaimana** ia gagal: menolak dengan sopan dan pulih sendiri, atau rusak dan kehilangan data?

Sistem yang menolak permintaan berlebih dengan pesan jelas jauh lebih baik daripada sistem yang menerima semuanya lalu berhenti bekerja seluruhnya.

**Ukur persentil, bukan rata-rata**

Ini kaidah terpenting dalam pengujian kinerja.

Rata-rata **menyembunyikan** pengguna yang menderita. Kalau 95 persen permintaan selesai dalam 80 ms dan 5 persen butuh 3 detik, rata-ratanya tetap terlihat baik — sementara satu dari dua puluh pengguna menunggu tiga detik.

Dan angka itu **jauh lebih buruk** daripada kelihatannya, karena satu halaman biasanya memuat banyak permintaan. Kalau satu halaman memuat dua puluh permintaan dan tiap permintaan punya peluang 5 persen menjadi lambat, maka peluang **sebuah kunjungan** menemui setidaknya satu permintaan lambat jauh melebihi 5 persen.

Karena itu target kinerja ditulis sebagai persentil: *"p95 di bawah 500 ms"*, bukan *"rata-rata di bawah 500 ms"*.

**Throughput dan titik patah**

- **throughput** — berapa permintaan diselesaikan per detik
- **latency** — berapa lama satu permintaan diselesaikan

Keduanya berbeda dan sering dikira sama. Sistem bisa punya throughput tinggi dengan latency buruk — banyak yang selesai, tetapi tiap orang menunggu lama.

Saat beban dinaikkan terus, throughput **berhenti naik** di suatu titik, sementara latency terus memburuk dan galat mulai muncul. Titik itulah **kapasitas sesungguhnya**, dan ia hanya bisa ditemukan dengan menaikkan beban **sampai lewat**.

**Hukum Little**

\`L = lambda x W\`

- **L** — jumlah permintaan yang sedang diproses bersamaan
- **lambda** — laju kedatangan, permintaan per detik
- **W** — waktu rata-rata satu permintaan, dalam detik

Rumus sederhana ini menjawab pertanyaan yang sangat praktis: **berapa besar kolam koneksi yang dibutuhkan?**

Kalau 100 permintaan tiba tiap detik dan tiap permintaan butuh setengah detik, maka rata-rata ada 50 permintaan berjalan bersamaan. Kolam berisi 20 koneksi akan **selalu penuh**, dan itu bisa dihitung sebelum sistemnya dipasang.

**Pengujian keamanan bertanya hal yang berlawanan**

Uji fungsional bertanya: *"apakah yang seharusnya bekerja, bekerja?"*

Uji keamanan bertanya: *"apakah yang seharusnya TIDAK bisa, benar-benar tidak bisa?"*

Kedua pertanyaan itu berbeda arah, dan kumpulan uji fungsional yang sempurna **tidak menjawab pertanyaan kedua sama sekali**.

Masukan yang perlu dicoba di kolom teks biasa: teks yang jauh melebihi panjang, tanda kutip, tanda kurung sudut, titik-titik ganda untuk menelusuri direktori, dan bita nol.

**Dua cara menguji keamanan**

- **Vulnerability scanning** — otomatis, luas, dangkal. Murah dan bisa dijalankan tiap hari, tetapi banyak temuan palsu.
- **Penetration testing** — dikerjakan manusia, sempit, dalam. Menemukan **rantai serangan** yang tidak terlihat oleh pemindai, tetapi mahal dan hanya sesekali.

Keduanya saling melengkapi. Pemindai menemukan pintu yang tidak terkunci. Penguji penetrasi menemukan bahwa pintu terkunci itu bisa dibuka lewat jendela yang tidak dianggap pintu oleh siapa pun.

**Satu hal yang tidak boleh dilewatkan**

Pengujian keamanan hanya boleh dilakukan pada sistem yang **kamu punya izin untuk menguji**. Mencoba teknik ini pada sistem milik orang lain tanpa izin tertulis adalah pelanggaran hukum, betapa pun baik niatnya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# RATA-RATA MENYEMBUNYIKAN PENDERITAAN\n#\n# 10.000 permintaan:\n#   95% selesai 40-120 ms\n#    5% tersendat 1500-4000 ms\n#\n#   rata-rata :  215.1 ms   <- target 300 ms TERPENUHI\n#   median    :   81.6 ms\n#   p90       :  115.9 ms\n#   p95       : 1518.1 ms   <- di sini kelihatan\n#   p99       : 3553.6 ms\n#\n# Satu halaman memuat 20 permintaan.\n# Peluang minimal satu di antaranya lambat:\n#   1 - (1 - 0.05)^20 = 64.5%\n#\n# "Cuma 5% permintaan" -> 2 dari 3 KUNJUNGAN lambat.',
      penjelasan: `
Angka **rata-rata 215 ms** itu jujur secara aritmetika dan menyesatkan secara praktis. Melihat kenapa akan mengubah cara kamu menulis target kinerja selamanya.

Rata-rata mencampur dua kelompok yang sangat berbeda. Ada 9.500 permintaan yang selesai sekitar 80 ms, dan ada 500 yang butuh 1,5 sampai 4 detik. Dicampur, hasilnya 215 ms — angka yang **tidak dialami oleh siapa pun**.

Tidak ada satu pun pengguna yang menunggu 215 ms. Mereka menunggu 80 ms atau 3 detik. Rata-rata di sini menggambarkan sebuah pengalaman yang **tidak pernah terjadi**.

Perhatikan bahwa **median tidak menolong** juga. Mediannya 81,6 ms, dan itu terlihat bagus sekali. Median memberi tahu pengalaman pengguna yang **di tengah**, dan ia sengaja mengabaikan yang di ujung — padahal justru yang di ujung yang mengeluh.

Persentil menjawab pertanyaan yang benar. **p95 = 1518 ms** berarti: 95 persen pengguna mengalami lebih cepat dari ini, 5 persen lebih lambat. Sekarang penderitaannya kelihatan.

Sekarang bagian yang membuatnya jauh lebih buruk.

Satu halaman web tidak membuat satu permintaan. Ia membuat banyak — memuat data, gambar, daftar, hitungan. Katakan dua puluh.

Halaman itu terasa lambat kalau **setidaknya satu** dari dua puluh permintaan itu lambat. Peluangnya:

\`1 - (1 - 0,05)^20 = 64,5 persen\`

Jadi meski hanya 5 persen **permintaan** yang lambat, hampir **dua dari tiga kunjungan** menemui setidaknya satu permintaan lambat.

Inilah yang membuat laporan kinerja sering bertentangan dengan keluhan pengguna. Grafiknya hijau, rata-ratanya bagus, dan penggunanya tetap bilang lambat. **Keduanya benar** — mereka mengukur hal yang berbeda.

Dari sini muncul kaidah yang bisa langsung dipakai: **tulis target sebagai persentil, dan sebutkan angkanya.**

Buruk: *"sistem harus cepat"*.
Lebih baik: *"rata-rata di bawah 300 ms"*.
Yang benar: *"p95 di bawah 500 ms dan p99 di bawah 2 detik, pada beban 200 permintaan per detik"*.

Yang terakhir bisa diuji, bisa gagal, dan mencakup pengguna yang paling menderita.

Ada satu hal lagi. Kalau kamu mengejar p99, perhatikan bahwa **memperbaikinya berbeda** dari memperbaiki rata-rata.

Rata-rata membaik dengan mempercepat jalur yang **umum** — memasang cache, mengoptimalkan query yang sering dipanggil. p99 membaik dengan memperbaiki hal yang **sesekali** terjadi: pengumpulan sampah memori, koneksi yang harus dibuat ulang, kolam yang habis, atau satu query yang lambat hanya untuk pengguna dengan data terbanyak.

Keduanya menuntut pekerjaan yang berbeda, dan mengejar yang satu tidak otomatis memperbaiki yang lain.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Pengujian kinerja & pengujian keamanan
# ============================================
import random

# --------------------------------------------
# 1. Rata-rata menyembunyikan penderitaan
# --------------------------------------------
random.seed(11)
waktu = []
for _ in range(10_000):
    if random.random() < 0.95:
        waktu.append(random.uniform(40, 120))     # normal
    else:
        waktu.append(random.uniform(1500, 4000))  # tersendat
waktu.sort()

def persentil(data, p):
    i = int(len(data) * p / 100)
    return data[min(i, len(data) - 1)]

rata = sum(waktu) / len(waktu)
print("--- 10.000 permintaan, waktu tanggap (ms) ---")
print("  rata-rata : " + ("%7.1f ms" % rata))
print("  median    : " + ("%7.1f ms" % persentil(waktu, 50)))
print("  p90       : " + ("%7.1f ms" % persentil(waktu, 90)))
print("  p95       : " + ("%7.1f ms" % persentil(waktu, 95)))
print("  p99       : " + ("%7.1f ms" % persentil(waktu, 99)))
print("  terburuk  : " + ("%7.1f ms" % waktu[-1]))
print("")
lambat = sum(1 for w in waktu if w > 1000)
print("  Target 'rata-rata di bawah 300 ms' TERPENUHI.")
print("  Tapi " + str(lambat) + " permintaan (" 
      + ("%.1f%%" % (lambat / len(waktu) * 100))
      + ") makan lebih dari 1 detik.")
print("")
print("  Kalau satu halaman memuat 20 permintaan, peluang")
p_lambat = lambat / len(waktu)
print("  minimal satu di antaranya lambat = "
      + ("%.1f%%" % ((1 - (1 - p_lambat) ** 20) * 100)) + ".")
print("  Jadi 'cuma 5% permintaan' berarti sebagian besar")
print("  KUNJUNGAN terasa lambat. Ukur persentil, bukan")
print("  rata-rata.")

# --------------------------------------------
# 2. Empat jenis pengujian kinerja
# --------------------------------------------
print("")
print("--- empat jenis pengujian kinerja ---")
JENIS = [
    ("Load",      "beban yang DIHARAPKAN",
     "sanggup melayani beban normal?"),
    ("Stress",    "beban di ATAS batas",
     "di titik mana ia patah, dan bagaimana?"),
    ("Endurance", "beban normal, WAKTU LAMA",
     "ada kebocoran memori yang menumpuk?"),
    ("Spike",     "lonjakan MENDADAK",
     "pulih setelah lonjakannya lewat?"),
]
for nama, beban, tanya in JENIS:
    print("  " + nama.ljust(11) + beban)
    print("  " + " " * 11 + "menjawab: " + tanya)
print("")
print("  Stress test bukan untuk membuktikan sistem kuat.")
print("  Ia untuk mengetahui BAGAIMANA ia gagal: menolak")
print("  dengan sopan, atau rusak dan kehilangan data?")

# --------------------------------------------
# 3. Mencari titik patah
# --------------------------------------------
print("")
print("--- menaikkan beban sampai patah ---")
print("  " + "pengguna".rjust(9) + "throughput".rjust(13)
      + "p95 (ms)".rjust(11) + "galat".rjust(8))
KAPASITAS = 200.0          # permintaan/detik yang sanggup dilayani
for n in (50, 100, 200, 400, 800, 1600):
    tiba = n * 1.0                       # 1 permintaan/detik/pengguna
    lewat = min(tiba, KAPASITAS)
    if tiba <= KAPASITAS * 0.8:
        p95 = 80 + (tiba / KAPASITAS) * 150
        galat = 0.0
    else:
        p95 = 80 + (tiba / KAPASITAS) ** 3 * 900
        galat = max(0.0, (tiba - KAPASITAS) / tiba * 100)
    print("  " + str(n).rjust(9) + ("%.0f/s" % lewat).rjust(13)
          + ("%.0f" % min(p95, 30000)).rjust(11)
          + ("%.0f%%" % galat).rjust(8))
print("")
print("  Throughput BERHENTI naik di 200/detik, tapi waktu")
print("  tanggap terus memburuk dan galat mulai muncul.")
print("  Itulah titik patahnya -- dan ia ditemukan dengan")
print("  MENAIKKAN beban sampai lewat, bukan dengan menguji")
print("  di beban yang aman.")

# --------------------------------------------
# 4. Hukum Little
# --------------------------------------------
print("")
print("--- hukum Little: L = lambda x W ---")
print("  L      = jumlah permintaan yang sedang diproses")
print("  lambda = laju kedatangan (permintaan/detik)")
print("  W      = waktu rata-rata satu permintaan (detik)")
print("")
print("  " + "lambda".rjust(8) + "W".rjust(8) + "L".rjust(8))
for lam, w in ((100, 0.1), (100, 0.5), (100, 2.0), (500, 0.5)):
    print("  " + str(lam).rjust(8) + ("%.1f" % w).rjust(8)
          + ("%.0f" % (lam * w)).rjust(8))
print("")
print("  Kalau kolam koneksimu cuma 50, baris ketiga sudah")
print("  penuh dan permintaan berikutnya menunggu. Rumus ini")
print("  memberi tahu ukuran kolam yang dibutuhkan SEBELUM")
print("  sistemnya dipasang.")

# --------------------------------------------
# 5. Pengujian keamanan: lulus fungsional, tetap bocor
# --------------------------------------------
print("")
print("--- masukan yang lolos uji fungsional ---")
UJI = [
    ("Budi",                       "fungsional", "wajar"),
    ("",                           "fungsional", "kosong, ditolak"),
    ("x" * 300,                    "keamanan",   "melebihi panjang"),
    ("' OR '1'='1",                "keamanan",   "SQL injection"),
    ("<script>alert(1)</script>",  "keamanan",   "XSS"),
    ("../../etc/passwd",           "keamanan",   "path traversal"),
    ("%00",                        "keamanan",   "null byte"),
]
print("  " + "masukan".ljust(30) + "jenis uji".ljust(13) + "maksud")
for isi, jenis, maksud in UJI:
    tampil = isi if len(isi) <= 26 else isi[:23] + "..."
    tampil = tampil if tampil else "(kosong)"
    print("  " + tampil.ljust(30) + jenis.ljust(13) + maksud)
print("")
print("  Uji fungsional bertanya 'apakah yang seharusnya")
print("  bekerja, bekerja'. Uji keamanan bertanya 'apakah")
print("  yang seharusnya TIDAK bisa, benar-benar tidak bisa'.")
print("  Kumpulan uji fungsional yang sempurna tidak")
print("  menjawab pertanyaan kedua sama sekali.")

# --------------------------------------------
# 6. Pemindaian vs uji penetrasi
# --------------------------------------------
print("")
print("--- dua cara menguji keamanan ---")
CARA = [
    ("Vulnerability scanning", "otomatis, luas, dangkal",
     "murah, bisa tiap hari", "banyak temuan palsu"),
    ("Penetration testing",    "manusia, sempit, dalam",
     "menemukan rantai serangan", "mahal, sesekali"),
]
for nama, sifat, plus, minus in CARA:
    print("  " + nama)
    print("      sifat : " + sifat)
    print("      plus  : " + plus)
    print("      minus : " + minus)
print("")
print("  Pemindai menemukan pintu yang tidak terkunci.")
print("  Penguji penetrasi menemukan bahwa pintu terkunci")
print("  itu bisa dibuka lewat jendela kamar mandi yang")
print("  tidak dianggap pintu oleh siapa pun.")` },
  output: `--- 10.000 permintaan, waktu tanggap (ms) ---
  rata-rata :   215.1 ms
  median    :    81.6 ms
  p90       :   115.9 ms
  p95       :  1518.1 ms
  p99       :  3553.6 ms
  terburuk  :  3996.3 ms

  Target 'rata-rata di bawah 300 ms' TERPENUHI.
  Tapi 505 permintaan (5.1%) makan lebih dari 1 detik.

  Kalau satu halaman memuat 20 permintaan, peluang
  minimal satu di antaranya lambat = 64.5%.
  Jadi 'cuma 5% permintaan' berarti sebagian besar
  KUNJUNGAN terasa lambat. Ukur persentil, bukan
  rata-rata.

--- empat jenis pengujian kinerja ---
  Load       beban yang DIHARAPKAN
             menjawab: sanggup melayani beban normal?
  Stress     beban di ATAS batas
             menjawab: di titik mana ia patah, dan bagaimana?
  Endurance  beban normal, WAKTU LAMA
             menjawab: ada kebocoran memori yang menumpuk?
  Spike      lonjakan MENDADAK
             menjawab: pulih setelah lonjakannya lewat?

  Stress test bukan untuk membuktikan sistem kuat.
  Ia untuk mengetahui BAGAIMANA ia gagal: menolak
  dengan sopan, atau rusak dan kehilangan data?

--- menaikkan beban sampai patah ---
   pengguna   throughput   p95 (ms)   galat
         50         50/s        118      0%
        100        100/s        155      0%
        200        200/s        980      0%
        400        200/s       7280     50%
        800        200/s      30000     75%
       1600        200/s      30000     88%

  Throughput BERHENTI naik di 200/detik, tapi waktu
  tanggap terus memburuk dan galat mulai muncul.
  Itulah titik patahnya -- dan ia ditemukan dengan
  MENAIKKAN beban sampai lewat, bukan dengan menguji
  di beban yang aman.

--- hukum Little: L = lambda x W ---
  L      = jumlah permintaan yang sedang diproses
  lambda = laju kedatangan (permintaan/detik)
  W      = waktu rata-rata satu permintaan (detik)

    lambda       W       L
       100     0.1      10
       100     0.5      50
       100     2.0     200
       500     0.5     250

  Kalau kolam koneksimu cuma 50, baris ketiga sudah
  penuh dan permintaan berikutnya menunggu. Rumus ini
  memberi tahu ukuran kolam yang dibutuhkan SEBELUM
  sistemnya dipasang.

--- masukan yang lolos uji fungsional ---
  masukan                       jenis uji    maksud
  Budi                          fungsional   wajar
  (kosong)                      fungsional   kosong, ditolak
  xxxxxxxxxxxxxxxxxxxxxxx...    keamanan     melebihi panjang
  ' OR '1'='1                   keamanan     SQL injection
  <script>alert(1)</script>     keamanan     XSS
  ../../etc/passwd              keamanan     path traversal
  %00                           keamanan     null byte

  Uji fungsional bertanya 'apakah yang seharusnya
  bekerja, bekerja'. Uji keamanan bertanya 'apakah
  yang seharusnya TIDAK bisa, benar-benar tidak bisa'.
  Kumpulan uji fungsional yang sempurna tidak
  menjawab pertanyaan kedua sama sekali.

--- dua cara menguji keamanan ---
  Vulnerability scanning
      sifat : otomatis, luas, dangkal
      plus  : murah, bisa tiap hari
      minus : banyak temuan palsu
  Penetration testing
      sifat : manusia, sempit, dalam
      plus  : menemukan rantai serangan
      minus : mahal, sesekali

  Pemindai menemukan pintu yang tidak terkunci.
  Penguji penetrasi menemukan bahwa pintu terkunci
  itu bisa dibuka lewat jendela kamar mandi yang
  tidak dianggap pintu oleh siapa pun.`,

  kesalahanUmum: [
    {
      salah: 'Menulis target kinerja sebagai rata-rata waktu tanggap.',
      kenapa: 'Rata-rata mencampur mayoritas yang cepat dengan minoritas yang sangat lambat, sehingga menghasilkan angka yang tidak dialami siapa pun. Target rata-rata bisa terpenuhi sementara satu dari dua puluh pengguna menunggu beberapa detik.',
      benar: 'Tulis target sebagai persentil beserta bebannya, misalnya p95 di bawah 500 ms pada 200 permintaan per detik.'
    },
    {
      salah: 'Menganggap 5 persen permintaan yang lambat berarti 5 persen pengguna terganggu.',
      kenapa: 'Satu halaman biasanya membuat banyak permintaan, dan halaman terasa lambat bila setidaknya satu di antaranya lambat. Untuk dua puluh permintaan per halaman, peluangnya menjadi sekitar 64 persen, bukan 5 persen.',
      benar: 'Hitung peluang di tingkat kunjungan, bukan di tingkat permintaan, lalu bandingkan dengan keluhan pengguna yang nyata.'
    },
    {
      salah: 'Menjalankan stress testing untuk membuktikan sistem sanggup menahan beban besar.',
      kenapa: 'Tujuan stress testing adalah mengetahui di titik mana sistem patah dan bagaimana ia patah, bukan membuktikan ia tidak patah. Sistem yang menolak beban berlebih dengan pesan jelas dan pulih sendiri jauh lebih baik daripada sistem yang menerima semuanya lalu berhenti bekerja.',
      benar: 'Naikkan beban sampai melewati titik patahnya, lalu periksa apakah kegagalannya sopan dan apakah sistemnya pulih setelah beban turun.'
    },
    {
      salah: 'Menguji kinerja hanya pada beban yang dianggap normal.',
      kenapa: 'Throughput berhenti naik di suatu titik sementara latency terus memburuk, dan titik itulah kapasitas sesungguhnya. Menguji hanya di bawahnya membuat kapasitas nyata tidak pernah diketahui sampai lonjakan pertama terjadi di produksi.',
      benar: 'Naikkan beban bertahap sampai throughput berhenti naik, lalu catat angka itu sebagai kapasitas.'
    },
    {
      salah: 'Melewatkan endurance testing karena load testing sudah lulus.',
      kenapa: 'Kebocoran memori dan sumber daya yang tidak dilepas menumpuk perlahan dan tidak terlihat pada uji yang berlangsung beberapa menit. Sistem yang lulus load testing bisa roboh setelah berjalan tiga hari tanpa pernah menghadapi beban yang lebih besar.',
      benar: 'Jalankan uji beban normal selama berjam-jam sampai berhari-hari sambil memantau pemakaian memori dan jumlah koneksi.'
    },
    {
      salah: 'Menganggap kumpulan uji fungsional yang lengkap sudah mencakup keamanan.',
      kenapa: 'Uji fungsional memastikan yang seharusnya bekerja memang bekerja, sedangkan uji keamanan memastikan yang seharusnya tidak bisa memang tidak bisa. Kedua pertanyaan itu berlawanan arah, dan yang pertama tidak menjawab yang kedua sama sekali.',
      benar: 'Tambahkan kasus uji khusus dengan masukan berbahaya di setiap tempat data pengguna diterima.'
    },
    {
      salah: 'Menganggap hasil vulnerability scanning yang bersih sebagai bukti sistem aman.',
      kenapa: 'Pemindai bekerja otomatis, luas, dan dangkal, sehingga ia menemukan kelemahan yang sudah dikenal polanya tetapi tidak menemukan rantai serangan yang menggabungkan beberapa hal yang masing-masing terlihat wajar.',
      benar: 'Pakai pemindaian sebagai pemeriksaan rutin, lalu lengkapi dengan uji penetrasi oleh manusia secara berkala.'
    }
  ],

  analogi: `Bayangkan **kantin kampus melaporkan waktu tunggu rata-rata: 3 menit**.

Terdengar bagus. Tapi coba dilihat lebih dekat.

Sembilan puluh lima dari seratus orang dilayani dalam **satu menit** — mereka membeli minuman dingin dari kulkas. Lima orang menunggu **empat puluh menit**, karena memesan makanan yang harus dimasak dan kompornya cuma satu.

Rata-ratanya benar: 3 menit. Dan **tidak ada seorang pun** yang menunggu 3 menit. Angka itu menggambarkan pengalaman yang tidak pernah terjadi.

Sekarang bagian yang lebih buruk. Kamu tidak datang sendiri — kamu datang bertujuh, dan kalian pulang bersama. Kelompokmu baru bisa pergi kalau **semua** sudah dilayani.

Peluang setidaknya satu dari tujuh orang memesan makanan yang dimasak jauh lebih besar daripada lima persen. Jadi meski *"cuma 5 persen pesanan"* yang lama, **sebagian besar kelompok** pulang terlambat.

Itulah kenapa laporan kantin selalu hijau dan mahasiswa selalu mengeluh. Kantin mengukur **pesanan**; mahasiswa mengalami **kunjungan**.

Dan pengujian stress? Itu bukan bertanya *"berapa banyak yang bisa dilayani kantin"*. Itu bertanya: kalau tiba-tiba datang tiga ratus orang sekaligus, apakah kantin **menutup antrean dengan sopan** dan tetap melayani yang sudah masuk — atau kompornya mati, uangnya tercampur, dan semua orang pulang tanpa makan?`,

  latihan: [
    'Jelaskan beda load, stress, endurance, dan spike testing, beserta pertanyaan yang dijawab masing-masing.',
    'Ambil seratus angka waktu tanggap, lalu hitung rata-rata, median, p90, p95, dan p99, dan jelaskan apa yang berbeda di antara kelimanya.',
    'Jelaskan kenapa rata-rata bisa menggambarkan pengalaman yang tidak dialami siapa pun.',
    'Hitung peluang sebuah halaman terasa lambat bila ia memuat 15 permintaan dan tiap permintaan punya peluang 3 persen menjadi lambat.',
    'Tulis ulang target "sistem harus cepat" menjadi target yang bisa diuji dan bisa gagal.',
    'Jelaskan beda throughput dan latency, lalu jelaskan bagaimana keduanya berubah ketika beban dinaikkan melewati kapasitas.',
    'Hitung dengan hukum Little berapa koneksi bersamaan yang dibutuhkan untuk 250 permintaan per detik dengan waktu proses 0,4 detik.',
    'Jelaskan kenapa uji fungsional dan uji keamanan menanyakan hal yang berlawanan arah, lalu berikan satu contoh masukan yang lolos uji fungsional tetapi berbahaya.',
    'Bandingkan vulnerability scanning dan penetration testing, lalu jelaskan kenapa keduanya dibutuhkan.',
    'Jelaskan kenapa memperbaiki p99 menuntut pekerjaan yang berbeda dari memperbaiki rata-rata, beserta contohnya masing-masing.'
  ]
});
