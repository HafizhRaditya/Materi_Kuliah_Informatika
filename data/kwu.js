/* ============================================================
   kwu.js — materi Kewirausahaan (Semester 5)

   ============================================================
   CATATAN KEJUJURAN — HARAP DIBACA
   ============================================================
   Folder "Semester Lima/KWU" masih KOSONG. Kerangkanya diambil
   dari pokok bahasan yang Hafizh tuliskan sendiri:

      1  Silabus & Pengantar Kewirausahaan
      2  Menjadi Wirausaha
      3  Berfikir Perubahan
      4  Berfikir Kreatif
      5  Berorientasi Pada Tindakan
      6  Pengambilan Resiko
      7  Kepemimpinan
      8  Etika Bisnis
      9  Faktor X
     10  Mencari Gagasan Usaha
     11  Pemasaran
     12  Manajemen Keuangan dan Pembiayaan Usaha
     13  Memulai Sebuah Usaha Baru
     14  Rencana Bisnis

   Urutan dan istilah itu -- khususnya "Berpikir Perubahan" dan
   "Faktor X" -- adalah ciri modul Kewirausahaan Rhenald Kasali
   dkk yang dipakai luas di perguruan tinggi Indonesia. Isi di
   sini disusun mengikuti kerangka itu ditambah pengetahuan
   umum, BUKAN dari slide dosen. Cocokkan lagi begitu materinya
   keluar.

   Bagian hitungan (BEP, marjin, arus kas, biaya akuisisi
   pelanggan) dihitung sungguhan dengan Python, karena di situlah
   mahasiswa Informatika bisa menambahkan ketelitian yang sering
   hilang dari rencana bisnis mahasiswa.
   ============================================================ */

TOPICS.push({
  id: 'kwu-pola-pikir',
  judul: 'Pola Pikir Wirausaha',
  kategori: 'kwu',
  tag: ['wirausaha', 'berpikir perubahan', 'kreatif', 'Faktor X', 'tindakan'],
  ringkas: 'Yang membedakan wirausaha bukan modal atau gagasan, melainkan cara menghadapi ketidakpastian.',

  fungsi: `**Melihat perubahan sebagai peluang, dan bertindak sebelum sepenuhnya yakin.**

Terpakai di:

- **Mencari ide usaha** — dari perubahan yang sedang terjadi
- **Kerja apa pun** — intrapreneur menciptakan hal baru di dalam perusahaan
- **Tugas kelompok** — orang yang bertindak lebih dulu biasanya yang memimpin
- **Menemukan keunggulanmu sendiri** — Faktor X sering terasa biasa bagi pemiliknya

Yang paling langsung berguna: **pisahkan menghasilkan gagasan dari menilainya.**

Keduanya memakai cara berpikir yang berlawanan. Melakukannya bersamaan membuat orang berhenti mengusulkan setelah dua penolakan — dan gagasan terbaik sering yang ketiga.

Dan satu kaidah yang menghemat banyak waktu: **sebagian besar ketidakpastian hanya bisa dijawab dengan mencoba**, bukan dengan berdebat.`,

  praktik: {
    tujuan: `Kamu punya daftar gagasan usaha yang berasal dari perubahan nyata, dan tahu Faktor X-mu sendiri.`,
    alat: [
      'Kertas',
      'Beberapa teman untuk curah gagasan'
    ],
    langkah: [
      { judul: 'Daftar perubahan di sekitarmu',
        isi: `Tulis sepuluh hal yang **berubah** dalam dua tahun terakhir di lingkunganmu: kebiasaan, teknologi, peraturan, harga.

Untuk tiap perubahan, tanyakan: **kebutuhan baru apa yang ia ciptakan, yang belum ada yang melayani?**` },
      { judul: 'Jalankan curah gagasan yang terpisah',
        isi: `Dua puluh menit **tanpa penilaian sama sekali**. Gagasan aneh diterima, dicatat, dan dilanjutkan.

Baru setelah waktunya habis, nilai dengan tegas.

Bandingkan jumlah gagasan yang keluar dengan sesi biasa yang menilai sambil jalan. Selisihnya besar.` },
      { judul: 'Temukan Faktor X-mu',
        isi: `Tanyakan ke lima orang: *"menurutmu, apa yang aku kuasai yang orang lain kesulitan?"*

Jawabannya sering mengejutkan, karena Faktor X biasanya terasa **biasa saja** bagi pemiliknya — justru karena ia menguasainya tanpa merasa berusaha.

Untuk mahasiswa Informatika, kemampuan menjelaskan hal teknis ke orang awam sangat sering muncul.` },
      { judul: 'Uji satu gagasan dalam satu hari',
        isi: `Ambil satu gagasan, lalu **hari ini juga** tawarkan ke sepuluh orang.

Satu hari mencoba menjawab lebih pasti daripada seminggu berdebat.

Catat jawabannya apa adanya, termasuk yang menolak — penolakan adalah informasi.` },
      { judul: 'Hitung nilai pelanggan dengan jujur',
        isi: `Untuk gagasanmu, hitung: berapa ia belanja per bulan, berapa lama bertahan, berapa orang yang ia rujuk.

Angka ini menjelaskan kenapa etika bisnis bukan sekadar moral — kepercayaan yang hilang jauh lebih mahal daripada keuntungan sesaat.` },
      { judul: 'Amati penurunan yang belum terasa',
        isi: `Kalau kamu punya usaha atau mengamati satu usaha, hitung perubahannya dalam **persentase**, bukan selisih mutlak.

Penurunan tetap dua puluh persen per tahun terasa ringan bertahun-tahun lalu tiba-tiba parah.

Saat perubahannya sudah jelas terasa, sebagian besar waktu untuk menanggapinya sudah habis.` },
      { judul: 'Kerjakan satu hal kecil minggu ini',
        isi: `Berorientasi pada tindakan bukan slogan. Pilih satu langkah yang bisa selesai minggu ini: satu wawancara, satu maket, satu penawaran.

Yang membedakan orang yang berwirausaha dari yang cuma punya gagasan adalah **langkah pertama yang benar-benar dikerjakan**.` }
    ],
    cek: [
      'Kamu punya sepuluh perubahan beserta kebutuhan baru yang ia ciptakan',
      'Sesi curah gagasan terpisah menghasilkan jauh lebih banyak gagasan',
      'Kamu sudah menawarkan satu gagasan ke sepuluh orang sungguhan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa bukan soal gagasan',

  konsep: `
**Kewirausahaan** adalah kemampuan **menciptakan nilai** dari sumber daya yang ada, dengan menanggung **risiko dan ketidakpastian**.

Perhatikan dua kata terakhir. Menciptakan nilai saja bisa dilakukan karyawan. Yang membedakan wirausaha adalah **siapa yang menanggung akibatnya kalau salah**.

**Wirausaha bukan berarti punya usaha**

Salah paham yang paling dasar. Orang bisa punya toko dan **tidak berwirausaha sama sekali** — kalau ia cuma menjalankan pola yang sudah ada tanpa mengubah apa pun.

Sebaliknya, karyawan bisa **berwirausaha di dalam perusahaan** — disebut *intrapreneur*.

Yang menentukan bukan status kepemilikan, melainkan **apakah kamu menciptakan sesuatu yang belum ada dan menanggung risikonya**.

**Berpikir perubahan**

Modul kewirausahaan menaruh ini di awal karena satu alasan: **wirausaha hidup dari perubahan**.

Perubahan yang bagi orang lain adalah ancaman, bagi wirausaha adalah **peluang** — karena setiap perubahan menciptakan kebutuhan baru yang belum ada yang melayani.

Yang menghalangi bukan ketidaktahuan, melainkan **kenyamanan**. Orang menolak perubahan bukan karena tidak paham, melainkan karena **yang lama masih cukup enak**.

Dan di sinilah letak jebakannya: **yang lama berhenti cukup enak secara mendadak**, bukan perlahan. Warung fotokopi tidak menyusut sedikit demi sedikit — ia baik-baik saja sampai tiba-tiba tidak.

**Berpikir kreatif**

Kreativitas dalam kewirausahaan **bukan** soal menemukan sesuatu yang belum pernah ada. Ia soal **menghubungkan hal yang sudah ada dengan cara yang belum terpikir**.

Penghambat yang lazim disebut:

- **Merasa tidak kreatif** — kepercayaan yang memenuhi dirinya sendiri
- **Takut salah dan ditertawakan**
- **Terpaku pada satu jawaban benar** — kebiasaan dari sekolah
- **Terlalu cepat menilai** — gagasan dibunuh sebelum sempat berkembang
- **Menganggap bermain itu tidak serius**

Butir keempat yang paling merugikan saat curah gagasan. Menilai dan menghasilkan gagasan memakai **cara berpikir yang berlawanan**; melakukan keduanya bersamaan membuat keduanya buruk.

**Berorientasi pada tindakan**

Ciri wirausaha yang paling membedakan dalam praktik: ia **lebih cepat mencoba daripada menyempurnakan rencana**.

Bukan karena rencana tidak penting, melainkan karena **sebagian besar ketidakpastian hanya bisa dijawab dengan mencoba**.

Kamu bisa berdebat berminggu-minggu tentang apakah orang mau membayar; satu hari menawarkannya kepada sepuluh orang **menjawabnya lebih pasti** daripada seluruh perdebatan itu.

**Faktor X**

Istilah dari modul Kasali: **potensi yang dimiliki setiap orang, yang bisa berkembang menjadi keunggulan**.

Ciri-cirinya:

- **Dimiliki setiap orang**, tetapi **tidak semua menemukannya**
- **Tersembunyi**, dan sering baru terlihat saat diuji keadaan
- **Berkembang kalau diasah**, mengecil kalau diabaikan
- **Berbeda-beda** antar orang — dan itu justru kekuatannya

Faktor X sering berupa hal yang bagimu **terasa biasa saja**, justru karena kamu menguasainya tanpa merasa berusaha.

Contoh untuk mahasiswa Informatika: kemampuan **menjelaskan hal teknis kepada orang awam** terasa biasa bagimu — dan sangat langka bagi orang yang membutuhkannya.

**Kepemimpinan**

Wirausaha harus memimpin sebelum punya wewenang. Ia mengajak orang bekerja untuk sesuatu yang **belum terbukti**, sering tanpa bisa membayar setimpal.

Yang dipakai bukan jabatan, melainkan **kejelasan arah** dan **kepercayaan**.

**Etika bisnis**

Sering dianggap pelajaran moral yang ditempelkan. Padahal ia punya alasan yang sangat praktis.

Bisnis berjalan di atas **kepercayaan**, dan kepercayaan adalah aset yang **dibangun lambat dan hilang seketika**. Keuntungan sekali dari menipu pelanggan hampir selalu **lebih kecil** daripada nilai hubungan jangka panjang yang hilang.

Untuk usaha kecil yang bergantung pada **cerita dari mulut ke mulut**, hitungannya bahkan tidak dekat.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA MENILAI DAN MENGGAGAS TIDAK BOLEH BERSAMAAN\n#\n# Menghasilkan gagasan menuntut cara berpikir MELEBAR:\n#   "apa lagi? apa lagi? tidak apa-apa kalau aneh"\n#\n# Menilai gagasan menuntut cara berpikir MENYEMPIT:\n#   "mana yang paling mungkin? apa kelemahannya?"\n#\n# Keduanya BERLAWANAN. Melakukannya bersamaan\n# membuat keduanya buruk:\n#\n#   gagasan ke-1  -> langsung dinilai -> "ah, tidak mungkin"\n#   gagasan ke-2  -> langsung dinilai -> "sudah ada yang buat"\n#   gagasan ke-3  -> tidak jadi diucapkan sama sekali\n#\n# Yang hilang bukan gagasan buruk yang tersaring.\n# Yang hilang adalah gagasan BAIK yang tidak sempat\n# muncul, karena orangnya berhenti mencoba.',
      penjelasan: `
Ini satu-satunya bagian dari "berpikir kreatif" yang bisa **dibuktikan dengan angka**, dan hasilnya mengejutkan.

Bayangkan sesi curah gagasan dua puluh menit dengan lima orang.

Pada **cara yang bercampur**, setiap gagasan langsung ditanggapi. Tanggapan itu makan waktu — mungkin satu menit per gagasan untuk berdebat.

Dan ada akibat kedua yang lebih besar: setelah dua atau tiga gagasan ditolak, **orang berhenti mengusulkan**. Bukan karena kehabisan gagasan, melainkan karena **biaya sosial** mengusulkan sesuatu yang akan ditertawakan terasa lebih besar daripada manfaatnya.

Pada **cara yang dipisah**, dua puluh menit pertama **tidak ada penilaian sama sekali**. Gagasan aneh diterima, dicatat, dan dilanjutkan.

Sekarang perhatikan apa yang sebenarnya hilang pada cara pertama.

Bukan gagasan buruk — itu memang layak tersaring. Yang hilang adalah **gagasan baik yang tidak sempat muncul**, dan itu terjadi karena dua sebab yang saling menguatkan:

**Pertama**, gagasan baik sering **datang setelah** gagasan buruk. Gagasan ke-15 lahir karena gagasan ke-12 yang konyol memancing arah baru. Kalau ke-12 dibunuh, ke-15 **tidak pernah ada**.

**Kedua**, orang yang gagasannya ditolak dua kali akan **menyimpan yang ketiga**. Dan yang ketiga itu mungkin yang terbaik — kamu tidak akan pernah tahu.

Karena itu aturan curah gagasan yang lazim bukan sekadar sopan santun. **"Jangan menilai dulu"** adalah aturan **teknis** untuk menjaga jumlah gagasan tetap mengalir.

Dan aturan pendampingnya sama pentingnya: **setelah waktunya habis, barulah menilai — dan menilailah dengan tegas.** Curah gagasan yang tidak pernah masuk tahap penilaian menghasilkan daftar panjang yang tidak berujung pada apa pun.

Pemisahan itulah kuncinya. Bukan "selalu terbuka", bukan "selalu kritis" — melainkan **terbuka dulu, kritis kemudian**.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Pola pikir wirausaha -- dengan hitungan
# ============================================

# --------------------------------------------
# 1. Wirausaha bukan soal status kepemilikan
# --------------------------------------------
ORANG = [
    ("Pemilik warung yang menjual sama seperti 20 tahun lalu",
     True, False, "punya usaha, tapi tidak berwirausaha"),
    ("Karyawan yang merintis lini produk baru di perusahaannya",
     False, True, "intrapreneur -- berwirausaha tanpa memiliki"),
    ("Mahasiswa yang membuat jasa titip dan menanggung ruginya",
     False, True, "berwirausaha meski belum punya badan usaha"),
    ("Pewaris toko yang menjalankan pola yang sudah ada",
     True, False, "memiliki, tapi tidak menciptakan apa pun baru"),
]

print("--- wirausaha bukan soal status kepemilikan ---")
print("  " + "orang".ljust(56) + "punya".rjust(7) +
      "wirausaha".rjust(11))
for nama, punya, wira, ket in ORANG:
    print("  " + nama.ljust(56) + ("ya" if punya else "tidak").rjust(7) +
          ("YA" if wira else "tidak").rjust(11))
    print("  " + " " * 56 + "-> " + ket)

print("")
print("  Yang menentukan bukan kepemilikan, melainkan apakah")
print("  kamu MENCIPTAKAN sesuatu yang belum ada dan MENANGGUNG")
print("  risikonya.")


# --------------------------------------------
# 2. Kenapa menilai dan menggagas harus DIPISAH
# --------------------------------------------
def sesi_bercampur(menit, orang):
    """Tiap gagasan langsung dinilai; setelah 2 penolakan
       tiap orang, ia berhenti mengusulkan."""
    gagasan = 0
    berhenti = 0
    penolakan = {i: 0 for i in range(orang)}
    waktu = 0.0
    giliran = 0
    while waktu < menit and berhenti < orang:
        i = giliran % orang
        giliran += 1
        if penolakan[i] >= 2:
            continue
        gagasan += 1
        waktu += 0.3          # mengusulkan
        waktu += 1.0          # berdebat menilainya
        if gagasan % 3 != 0:  # 2 dari 3 ditolak
            penolakan[i] += 1
            if penolakan[i] == 2:
                berhenti += 1
    return gagasan, berhenti


def sesi_dipisah(menit, orang):
    """Tidak ada penilaian selama waktu menggagas."""
    waktu = 0.0
    gagasan = 0
    while waktu < menit:
        gagasan += 1
        waktu += 0.3
    return gagasan, 0


print("")
print("--- sesi curah gagasan 20 menit, 5 orang ---")
print("  " + "cara".ljust(28) + "gagasan".rjust(9) +
      "orang yang berhenti".rjust(22))
for nama, fungsi in [("Menilai sambil menggagas", sesi_bercampur),
                     ("Menggagas dulu, nilai nanti", sesi_dipisah)]:
    g, b = fungsi(20, 5)
    print("  " + nama.ljust(28) + str(g).rjust(9) + str(b).rjust(22))

print("")
print("  Yang hilang pada cara pertama BUKAN gagasan buruk --")
print("  itu memang layak tersaring.")
print("")
print("  Yang hilang adalah gagasan BAIK yang tidak sempat")
print("  muncul, karena dua sebab yang saling menguatkan:")
print("      (a) gagasan baik sering datang SETELAH gagasan")
print("          buruk yang memancing arah baru")
print("      (b) orang yang ditolak dua kali menyimpan yang")
print("          ketiga -- dan yang ketiga mungkin yang terbaik")


# --------------------------------------------
# 3. Berorientasi tindakan: berdebat vs mencoba
# --------------------------------------------
print("")
print("--- berdebat vs mencoba ---")
PERTANYAAN = [
    ("Apakah orang mau membayar untuk ini?",
     "berminggu-minggu", "tawarkan ke 10 orang, 1 hari"),
    ("Berapa harga yang pas?",
     "berhari-hari", "coba 3 harga berbeda, 1 minggu"),
    ("Fitur mana yang paling dicari?",
     "berjam-jam rapat", "tanya 20 calon pengguna, 2 hari"),
    ("Apakah namanya mudah diingat?",
     "berdebat tanpa ujung", "sebut ke 15 orang, 1 jam"),
]
print("  " + "pertanyaan".ljust(38) + "kalau didebatkan".ljust(20) +
      "kalau dicoba")
for tanya, debat, coba in PERTANYAAN:
    print("  " + tanya.ljust(38) + debat.ljust(20) + coba)

print("")
print("  Bukan berarti rencana tidak penting. Tapi sebagian besar")
print("  ketidakpastian HANYA BISA dijawab dengan mencoba --")
print("  dan mencobanya sering jauh lebih murah daripada")
print("  memperdebatkannya.")


# --------------------------------------------
# 4. Faktor X: sering terasa biasa bagi pemiliknya
# --------------------------------------------
print("")
print("--- Faktor X ---")
CIRI = [
    "Dimiliki SETIAP orang, tapi tidak semua menemukannya",
    "Tersembunyi -- sering baru terlihat saat diuji keadaan",
    "Berkembang kalau diasah, mengecil kalau diabaikan",
    "Berbeda-beda antar orang, dan itu justru kekuatannya",
]
for c in CIRI:
    print("  - " + c)

print("")
print("  Faktor X sering berupa hal yang bagimu TERASA BIASA,")
print("  justru karena kamu menguasainya tanpa merasa berusaha.")
print("")
CONTOH = [
    ("Menjelaskan hal teknis ke orang awam",
     "biasa saja", "sangat langka & dicari"),
    ("Sabar menelusuri bug berjam-jam",
     "biasa saja", "banyak orang menyerah di menit ke-20"),
    ("Merapikan data berantakan",
     "membosankan", "dibayar mahal di banyak tempat"),
    ("Kenal banyak orang lintas jurusan",
     "kebetulan", "jalan masuk ke pasar pertama"),
]
print("  " + "kemampuan".ljust(38) + "terasa".ljust(14) + "sebenarnya")
for nama, rasa, nyata in CONTOH:
    print("  " + nama.ljust(38) + rasa.ljust(14) + nyata)


# --------------------------------------------
# 5. Etika bisnis, dihitung
# --------------------------------------------
def nilai_pelanggan(belanja_per_bulan, bulan_bertahan, rujukan):
    """Nilai seorang pelanggan = belanjanya sendiri
       + belanja orang yang ia rujuk."""
    sendiri = belanja_per_bulan * bulan_bertahan
    dari_rujukan = rujukan * belanja_per_bulan * bulan_bertahan
    return sendiri + dari_rujukan


print("")
print("--- etika bisnis, dihitung ---")
print("  Usaha kecil yang hidup dari cerita mulut ke mulut.")
print("")

BELANJA = 150_000
BULAN = 24
RUJUKAN = 2.5

jujur = nilai_pelanggan(BELANJA, BULAN, RUJUKAN)
untung_menipu = 200_000       # untung sekali dari menaikkan harga diam-diam
# kalau ketahuan: pelanggan pergi DAN merujuk secara negatif
menipu = untung_menipu + nilai_pelanggan(BELANJA, 1, -1.5)

def rp(x):
    tanda = "-" if x < 0 else ""
    return tanda + "Rp " + format(int(abs(x)), ",d").replace(",", ".")

print("  " + "pilihan".ljust(46) + "nilai seorang pelanggan")
print("  " + "Jujur, pelanggan bertahan 24 bulan".ljust(46) + rp(jujur))
print("  " + "  belanja sendiri".ljust(46) +
      rp(BELANJA * BULAN))
print("  " + "  dari 2,5 orang yang ia rujuk".ljust(46) +
      rp(RUJUKAN * BELANJA * BULAN))
print("")
print("  " + "Menipu sekali lalu ketahuan".ljust(46) + rp(menipu))
print("  " + "  untung sekali dari menipu".ljust(46) + rp(untung_menipu))
print("  " + "  belanja 1 bulan lalu pergi".ljust(46) + rp(BELANJA))
print("  " + "  1,5 orang BATAL datang karena cerita buruk".ljust(46) +
      rp(-1.5 * BELANJA))
print("")
print("  selisih: " + rp(jujur - menipu))
print("")
print("  Etika bisnis sering dianggap pelajaran moral yang")
print("  ditempelkan. Padahal alasannya sangat praktis:")
print("  kepercayaan DIBANGUN LAMBAT dan HILANG SEKETIKA,")
print("  dan untuk usaha yang hidup dari cerita mulut ke mulut,")
print("  hitungannya bahkan tidak dekat.")


# --------------------------------------------
# 6. Kenapa perubahan terasa mendadak
# --------------------------------------------
print("")
print("--- kenapa yang lama berhenti 'cukup enak' secara MENDADAK ---")
print("")
print("  " + "tahun".rjust(6) + "pelanggan".rjust(11) +
      "pendapatan".rjust(14) + "  rasanya")
pelanggan = 1000.0
for tahun in range(0, 8):
    pendapatan = pelanggan * 50_000
    if pelanggan >= 800:   rasa = "aman"
    elif pelanggan >= 500: rasa = "agak sepi, musiman mungkin"
    elif pelanggan >= 250: rasa = "mulai mengkhawatirkan"
    else:                  rasa = "TERLAMBAT"
    print("  " + str(2019 + tahun).rjust(6) +
          str(int(pelanggan)).rjust(11) +
          rp(pendapatan).rjust(14) + "  " + rasa)
    pelanggan *= 0.72          # turun 28% per tahun, tetap

print("")
print("  Penurunannya TETAP 28 persen setiap tahun -- tidak ada")
print("  yang mendadak sama sekali dalam angkanya.")
print("")
print("  Yang mendadak adalah KAPAN ia TERASA. Dua tahun")
print("  pertama masih bisa disebut 'musiman'; baru di tahun")
print("  kelima keadaannya jelas terlambat -- dan pada saat")
print("  itu yang tersisa tinggal seperlima.")
print("")
print("  Itulah kenapa berpikir perubahan ditaruh di AWAL modul:")
print("  saat perubahannya sudah TERASA, sebagian besar waktu")
print("  untuk menanggapinya sudah habis.")`
  },

  output: `--- wirausaha bukan soal status kepemilikan ---
  orang                                                     punya  wirausaha
  Pemilik warung yang menjual sama seperti 20 tahun lalu       ya      tidak
                                                          -> punya usaha, tapi tidak berwirausaha
  Karyawan yang merintis lini produk baru di perusahaannya  tidak         YA
                                                          -> intrapreneur -- berwirausaha tanpa memiliki
  Mahasiswa yang membuat jasa titip dan menanggung ruginya  tidak         YA
                                                          -> berwirausaha meski belum punya badan usaha
  Pewaris toko yang menjalankan pola yang sudah ada            ya      tidak
                                                          -> memiliki, tapi tidak menciptakan apa pun baru

  Yang menentukan bukan kepemilikan, melainkan apakah
  kamu MENCIPTAKAN sesuatu yang belum ada dan MENANGGUNG
  risikonya.

--- sesi curah gagasan 20 menit, 5 orang ---
  cara                          gagasan   orang yang berhenti
  Menilai sambil menggagas           14                     5
  Menggagas dulu, nilai nanti        67                     0

  Yang hilang pada cara pertama BUKAN gagasan buruk --
  itu memang layak tersaring.

  Yang hilang adalah gagasan BAIK yang tidak sempat
  muncul, karena dua sebab yang saling menguatkan:
      (a) gagasan baik sering datang SETELAH gagasan
          buruk yang memancing arah baru
      (b) orang yang ditolak dua kali menyimpan yang
          ketiga -- dan yang ketiga mungkin yang terbaik

--- berdebat vs mencoba ---
  pertanyaan                            kalau didebatkan    kalau dicoba
  Apakah orang mau membayar untuk ini?  berminggu-minggu    tawarkan ke 10 orang, 1 hari
  Berapa harga yang pas?                berhari-hari        coba 3 harga berbeda, 1 minggu
  Fitur mana yang paling dicari?        berjam-jam rapat    tanya 20 calon pengguna, 2 hari
  Apakah namanya mudah diingat?         berdebat tanpa ujungsebut ke 15 orang, 1 jam

  Bukan berarti rencana tidak penting. Tapi sebagian besar
  ketidakpastian HANYA BISA dijawab dengan mencoba --
  dan mencobanya sering jauh lebih murah daripada
  memperdebatkannya.

--- Faktor X ---
  - Dimiliki SETIAP orang, tapi tidak semua menemukannya
  - Tersembunyi -- sering baru terlihat saat diuji keadaan
  - Berkembang kalau diasah, mengecil kalau diabaikan
  - Berbeda-beda antar orang, dan itu justru kekuatannya

  Faktor X sering berupa hal yang bagimu TERASA BIASA,
  justru karena kamu menguasainya tanpa merasa berusaha.

  kemampuan                             terasa        sebenarnya
  Menjelaskan hal teknis ke orang awam  biasa saja    sangat langka & dicari
  Sabar menelusuri bug berjam-jam       biasa saja    banyak orang menyerah di menit ke-20
  Merapikan data berantakan             membosankan   dibayar mahal di banyak tempat
  Kenal banyak orang lintas jurusan     kebetulan     jalan masuk ke pasar pertama

--- etika bisnis, dihitung ---
  Usaha kecil yang hidup dari cerita mulut ke mulut.

  pilihan                                       nilai seorang pelanggan
  Jujur, pelanggan bertahan 24 bulan            Rp 12.600.000
    belanja sendiri                             Rp 3.600.000
    dari 2,5 orang yang ia rujuk                Rp 9.000.000

  Menipu sekali lalu ketahuan                   Rp 125.000
    untung sekali dari menipu                   Rp 200.000
    belanja 1 bulan lalu pergi                  Rp 150.000
    1,5 orang BATAL datang karena cerita buruk  -Rp 225.000

  selisih: Rp 12.475.000

  Etika bisnis sering dianggap pelajaran moral yang
  ditempelkan. Padahal alasannya sangat praktis:
  kepercayaan DIBANGUN LAMBAT dan HILANG SEKETIKA,
  dan untuk usaha yang hidup dari cerita mulut ke mulut,
  hitungannya bahkan tidak dekat.

--- kenapa yang lama berhenti 'cukup enak' secara MENDADAK ---

   tahun  pelanggan    pendapatan  rasanya
    2019       1000 Rp 50.000.000  aman
    2020        720 Rp 36.000.000  agak sepi, musiman mungkin
    2021        518 Rp 25.920.000  agak sepi, musiman mungkin
    2022        373 Rp 18.662.400  mulai mengkhawatirkan
    2023        268 Rp 13.436.928  mulai mengkhawatirkan
    2024        193  Rp 9.674.588  TERLAMBAT
    2025        139  Rp 6.965.703  TERLAMBAT
    2026        100  Rp 5.015.306  TERLAMBAT

  Penurunannya TETAP 28 persen setiap tahun -- tidak ada
  yang mendadak sama sekali dalam angkanya.

  Yang mendadak adalah KAPAN ia TERASA. Dua tahun
  pertama masih bisa disebut 'musiman'; baru di tahun
  kelima keadaannya jelas terlambat -- dan pada saat
  itu yang tersisa tinggal seperlima.

  Itulah kenapa berpikir perubahan ditaruh di AWAL modul:
  saat perubahannya sudah TERASA, sebagian besar waktu
  untuk menanggapinya sudah habis.`,

  kesalahanUmum: [
    {
      salah: 'Menyamakan berwirausaha dengan memiliki usaha.',
      kenapa: 'Orang bisa memiliki toko dan sekadar menjalankan pola yang sudah ada tanpa menciptakan apa pun, sedangkan karyawan bisa merintis lini baru di perusahaannya dan menanggung risikonya. Yang menentukan adalah penciptaan nilai baru beserta risikonya, bukan status kepemilikan.',
      benar: 'Nilai dari dua hal: apakah ada sesuatu yang belum ada yang kamu ciptakan, dan apakah kamu yang menanggung akibatnya kalau salah.'
    },
    {
      salah: 'Menilai gagasan sambil mengumpulkannya dalam satu sesi curah gagasan.',
      kenapa: 'Menghasilkan gagasan menuntut cara berpikir yang melebar sedangkan menilai menuntut yang menyempit, sehingga melakukan keduanya bersamaan membuat keduanya buruk. Setelah dua atau tiga penolakan orang berhenti mengusulkan, dan gagasan baik yang biasanya lahir dari gagasan konyol sebelumnya tidak pernah muncul.',
      benar: 'Pisahkan waktunya: kumpulkan tanpa menilai sama sekali, lalu setelah waktunya habis nilailah dengan tegas.'
    },
    {
      salah: 'Menyempurnakan rencana bisnis sebelum menguji apakah ada yang mau membayar.',
      kenapa: 'Sebagian besar ketidakpastian sebuah usaha hanya bisa dijawab dengan mencoba, dan mencobanya biasanya jauh lebih murah daripada memperdebatkannya. Menawarkan kepada sepuluh orang dalam satu hari menjawab lebih pasti daripada rapat berminggu-minggu.',
      benar: 'Cari pertanyaan yang bisa diuji murah, uji lebih dulu, lalu susun rencana di atas jawaban yang sudah didapat.'
    },
    {
      salah: 'Mengira Faktor X berupa bakat luar biasa yang jelas terlihat.',
      kenapa: 'Faktor X justru sering berupa hal yang terasa biasa bagi pemiliknya, karena ia menguasainya tanpa merasa berusaha. Kemampuan menjelaskan hal teknis kepada orang awam terasa sepele bagi mahasiswa Informatika padahal sangat langka bagi yang membutuhkannya.',
      benar: 'Cari hal yang bagi orang lain sulit tetapi bagimu tidak terasa berat, dan tanyakan kepada orang lain apa yang mereka anggap kamu kuasai.'
    },
    {
      salah: 'Memandang etika bisnis sebagai pelajaran moral yang tidak berhubungan dengan keuntungan.',
      kenapa: 'Bisnis berjalan di atas kepercayaan, yang dibangun lambat dan hilang seketika. Untuk usaha kecil yang hidup dari cerita mulut ke mulut, keuntungan sekali dari menipu jauh lebih kecil daripada nilai pelanggan beserta orang-orang yang ia rujuk.',
      benar: 'Hitung nilai pelanggan sepanjang hubungannya beserta rujukannya, lalu bandingkan dengan keuntungan sesaat yang ditawarkan jalan pintas.'
    },
    {
      salah: 'Menunggu sampai penurunan usaha benar-benar terasa sebelum menanggapi perubahan.',
      kenapa: 'Penurunan yang tetap secara persentase terasa ringan bertahun-tahun lalu tiba-tiba menjadi parah, karena yang berkurang selalu persentase dari sisa yang makin kecil. Saat perubahannya terasa jelas, sebagian besar waktu untuk menanggapinya sudah habis.',
      benar: 'Pantau kecenderungan dalam persentase, bukan selisih mutlak, dan tanggapi ketika angkanya masih terlihat baik-baik saja.'
    }
  ],

  analogi: `Bayangkan dua orang menghadapi **jembatan yang sedang dibangun** menuju kota sebelah.

Yang pertama berpikir: *"Wah, kalau jembatannya jadi, orang tidak lewat depan warung saya lagi."*

Yang kedua berpikir: *"Kalau jembatannya jadi, akan ada ribuan orang yang lewat setiap hari — dan tidak satu pun tahu di mana beli makan di sisi sana."*

**Fakta yang sama. Kesimpulan yang berlawanan.**

Dan itulah yang dimaksud **berpikir perubahan**: bukan menyukai perubahan, melainkan **melihat kebutuhan baru yang ia ciptakan**.

Sekarang **kenapa perubahan terasa mendadak**.

Bayangkan warung yang pelanggannya berkurang **28 persen setiap tahun** — tetap, tidak pernah berubah.

Tahun pertama: dari 1000 jadi 720. Terasa seperti tahun yang sepi.
Tahun kedua: 518. *"Musiman, nanti juga ramai lagi."*
Tahun ketiga: 373. Mulai gelisah, tetapi masih bisa bertahan.
Tahun keempat: 268. **Sekarang jelas ada yang salah.**

Empat tahun untuk **menyadari**. Dan pada saat itu, yang tersisa tinggal **seperempat**.

Angkanya **tidak pernah mendadak**. Yang mendadak adalah **kapan ia terasa** — karena yang hilang selalu persentase dari sisa yang makin kecil.

Sekarang **kenapa curah gagasan harus memisahkan menggagas dan menilai**.

Bayangkan mencari kunci yang hilang di rumah. Ada dua cara mencari:

**Melebar** — buka semua laci, angkat semua bantal, periksa semua saku. Tidak berpikir, cuma membuka.

**Menyempit** — berhenti, pikirkan terakhir kali kamu memegangnya, dan periksa satu tempat itu dengan teliti.

Keduanya berguna. Tetapi mencoba melakukan **keduanya sekaligus** menghasilkan yang terburuk: kamu membuka satu laci, berhenti untuk berpikir, lupa laci mana yang sudah dibuka, mulai ragu, dan akhirnya berdiri di tengah ruangan **tanpa membuka apa-apa**.

Dan **Faktor X** adalah hal yang paling mudah terlewat justru karena ia dekat.

Bayangkan seseorang yang seumur hidup tinggal di dekat laut. Baginya, mengetahui **kapan ombak aman untuk melaut** bukan keahlian — itu cuma **tahu**.

Sampai suatu hari datang orang dari kota yang bersedia **membayar** untuk pengetahuan itu.

Ia tidak pernah menganggapnya berharga, **justru karena ia tidak pernah harus berusaha untuk memilikinya.**`,

  latihan: [
    'Jelaskan definisi kewirausahaan dan tunjukkan bagian mana yang membedakannya dari sekadar bekerja.',
    'Beri satu contoh orang yang punya usaha tetapi tidak berwirausaha, dan satu contoh orang yang berwirausaha tanpa memiliki usaha.',
    'Jelaskan maksud berpikir perubahan, dan berikan satu contoh perubahan di sekitarmu beserta peluang yang ia ciptakan.',
    'Sebutkan lima penghambat berpikir kreatif, dan jelaskan kenapa yang keempat paling merugikan saat curah gagasan.',
    'Jelaskan kenapa menilai dan menghasilkan gagasan tidak boleh dilakukan bersamaan, beserta dua sebab hilangnya gagasan baik.',
    'Tulis tiga pertanyaan tentang gagasan usahamu yang lebih murah dijawab dengan mencoba daripada didebatkan.',
    'Jelaskan apa itu Faktor X beserta empat cirinya, lalu sebutkan dua kemampuanmu yang terasa biasa tetapi mungkin langka.',
    'Hitung nilai seorang pelanggan yang berbelanja 200 ribu per bulan selama 18 bulan dan merujuk 2 orang, lalu bandingkan dengan keuntungan sesaat 500 ribu dari jalan pintas.'
  ]
});

TOPICS.push({
  id: 'kwu-risiko-gagasan',
  judul: 'Risiko & Mencari Gagasan Usaha',
  kategori: 'kwu',
  tag: ['risiko', 'gagasan usaha', 'peluang', 'validasi', 'kegagalan'],
  ringkas: 'Wirausaha bukan penyuka risiko — ia orang yang pandai memperkecilnya sebelum melangkah.',

  fungsi: `**Memperkecil risiko sebelum melangkah, dan menguji gagasan sebelum membangun.**

Terpakai di:

- **Memutuskan apakah gagasan layak dilanjutkan**
- **Membatasi kerugian** kalau ternyata salah
- **Menghindari membangun yang tidak dibutuhkan** — kesalahan termahal
- **Tugas akhir** — validasi kebutuhan sebelum membangun sistem

Kaidah yang paling menyelamatkan: **kegagalan tidak bisa dihindari, tetapi biayanya bisa diatur.**

Gagal setelah dua minggu dan tiga ratus ribu adalah pelajaran. Gagal setelah delapan bulan dan tabungan orang tua adalah bencana — padahal kesalahannya bisa sama persis.

Dan yang paling sering menjatuhkan mahasiswa: **bertanya "mau pakai nggak?"** — pertanyaan yang menjawabnya gratis, jadi jawabannya tidak memberi informasi apa pun.`,

  praktik: {
    tujuan: `Kamu sudah menguji satu gagasan dengan pertanyaan yang ada harganya, sebelum membangun apa pun.`,
    alat: [
      'Kertas',
      'Akses ke sepuluh calon pengguna'
    ],
    langkah: [
      { judul: 'Tentukan kerugian yang sanggup kamu tanggung',
        isi: `Jangan bertanya *"berapa keuntungan yang mungkin?"*. Tanyakan **"berapa kerugian yang sanggup saya tanggung?"**

Lalu batasi taruhanmu sampai angka itu. Cara ini tidak menuntut kamu meramalkan masa depan, dan itu yang membuatnya tahan banting.` },
      { judul: 'Tanyakan apa yang SUDAH mereka lakukan',
        isi: `Ini pertanyaan paling jujur, karena ia menanyakan **kenyataan**, bukan niat:

*"Sekarang kalau menghadapi masalah itu, biasanya bagaimana?"*

- *"Ya sudah, dibiarkan"* → masalahnya ringan
- *"Saya sampai bikin catatan sendiri"* → menjanjikan
- *"Saya bayar orang"* → calon pembeli terbaik` },
      { judul: 'Ajukan pertanyaan yang ada harganya',
        isi: `Urutan dari lemah ke kuat:

- *"Mau pakai?"* — nol biaya, nol informasi
- *"Boleh saya kabari kalau jadi?"* — minta nomor, biaya kecil
- *"Bayar di muka lima puluh ribu"* — biaya nyata, informasi nyata

Sebuah jawaban hanya memberi informasi kalau **menjawabnya ada biayanya**.` },
      { judul: 'Buat versi paling murah yang bisa diuji',
        isi: `Sebelum membangun aplikasi, layani **manual** dulu.

Terima pesanan lewat pesan, kerjakan dengan tangan, kirim hasilnya. Kalau sepuluh orang mau membayar untuk itu, barulah membangun.

Ini menghemat berbulan-bulan, dan sering mengubah gagasan awalmu secara mendasar.` },
      { judul: 'Ceritakan gagasanmu, jangan disembunyikan',
        isi: `Gagasan hampir tidak bernilai sendirian; yang bernilai adalah pelaksanaannya.

Yang kamu dapat dari merahasiakan sangat kecil. Yang kamu kehilangan — masukan yang bisa menyelamatkanmu dari membangun sesuatu yang tidak dibutuhkan — sangat besar.` },
      { judul: 'Buat kegagalannya cepat dan murah',
        isi: `Rancang percobaanmu supaya kalau salah, ketahuan dalam **hitungan minggu**, bukan bulan.

Untuk tiap rencana, tanyakan: *"kalau ini salah, kapan saya tahu, dan berapa yang sudah terbuang?"*` },
      { judul: 'Hitung ruang pencariannya kalau perlu',
        isi: `Untuk gagasan yang menuntut pemilihan dari banyak kemungkinan, hitung dulu jumlahnya seperti di Matematika Diskrit.

Kalau di bawah sejuta, cara sederhana sudah cukup. Kalau jauh lebih besar, baru butuh pendekatan rumit.` }
    ],
    cek: [
      'Kamu tahu berapa kerugian maksimal yang sanggup kamu tanggung',
      `Kamu sudah bertanya apa yang sudah dilakukan calon pengguna, bukan cuma apa yang mereka mau`,
      'Kamu sudah melayani sedikitnya satu orang secara manual sebelum membangun apa pun'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa bukan penjudi',

  konsep: `
Salah paham paling luas tentang wirausaha: bahwa ia **berani mengambil risiko besar**.

Yang benar hampir kebalikannya. Wirausaha yang bertahan adalah orang yang **pandai memperkecil risiko** sebelum melangkah — dan hanya menanggung risiko yang **tidak bisa dihilangkan**.

**Risiko dan ketidakpastian itu berbeda**

- **Risiko** — hasilnya belum pasti, tetapi **kemungkinannya bisa diperkirakan**. Seperti melempar dadu.
- **Ketidakpastian** — kemungkinannya pun **tidak diketahui**. Seperti menebak apakah orang akan menyukai produk yang belum pernah ada.

Kewirausahaan sebagian besar berurusan dengan yang **kedua**. Dan karena kemungkinannya tidak bisa dihitung, satu-satunya cara mengeceknya adalah **mencobanya dalam skala kecil**.

**Tiga sikap terhadap risiko**

- **Penghindar risiko** — memilih yang pasti meski hasilnya kecil
- **Pengambil risiko terukur** — menghitung, memperkecil, lalu melangkah
- **Penjudi** — menanggung risiko besar tanpa mengukurnya

Wirausaha berada di tengah. Yang membedakannya dari penjudi bukan keberaniannya, melainkan **apa yang ia lakukan sebelum melangkah**.

**Memperkecil risiko: empat cara**

- **Perkecil taruhannya** — uji dengan modal yang kalau hilang tidak mematikan
- **Perkecil kerugiannya** — sewa dulu, jangan beli; kerjakan sendiri dulu, jangan rekrut
- **Perbanyak informasinya** — tanya calon pembeli sebelum membuat
- **Buat kegagalannya cepat dan murah** — kalau salah, ketahuan dalam minggu, bukan tahun

Butir terakhir sering paling menentukan. **Kegagalan tidak bisa dihindari; yang bisa diatur adalah biayanya.**

Usaha yang gagal setelah **tiga minggu dan dua juta rupiah** adalah pelajaran. Usaha yang gagal setelah **tiga tahun dan tabungan orang tua** adalah bencana — padahal kesalahannya bisa jadi sama persis.

**Prinsip affordable loss**

Alih-alih bertanya *"berapa keuntungan yang mungkin?"*, tanyakan **"berapa kerugian yang sanggup saya tanggung?"**

Lalu batasi taruhannya sampai angka itu.

Ini membalik cara berpikir yang lazim, dan ia jauh lebih tahan banting: kamu **tidak perlu meramalkan masa depan** untuk memakainya.

**Mencari gagasan usaha**

Sumber gagasan yang lazim disebut:

- **Masalah yang kamu alami sendiri** — sumber paling baik, karena kamu tahu bahwa masalahnya nyata
- **Keluhan orang di sekitarmu** — dengarkan kata *"kenapa tidak ada yang..."*
- **Ketidakefisienan** — proses yang jelas boros tetapi diterima begitu saja
- **Perubahan** — peraturan baru, teknologi baru, kebiasaan baru
- **Menyalin dengan penyesuaian** — model yang berhasil di tempat lain, disesuaikan dengan keadaan setempat
- **Menggabungkan dua hal** yang sudah ada

**Gagasan itu murah**

Bagian yang paling perlu diterima: **gagasan hampir tidak bernilai sendirian**.

Yang bernilai adalah **pelaksanaan** — dan pelaksanaan menuntut hal yang tidak dimiliki gagasan: waktu, ketekunan, kemauan mendengar, dan kesanggupan mengubah rencana ketika kenyataan tidak sesuai.

Karena itu **merahasiakan gagasan** hampir selalu keliru. Yang kamu dapat dari merahasiakannya sangat kecil; yang kamu kehilangan — masukan yang bisa menyelamatkanmu dari membangun sesuatu yang tidak dibutuhkan — sangat besar.

**Menguji gagasan sebelum membangun**

Urutan yang menghemat paling banyak waktu:

- **Apakah masalahnya nyata?** — tanya sepuluh orang tanpa menyebut solusimu
- **Apakah cukup menyakitkan?** — apa yang mereka lakukan sekarang untuk mengatasinya
- **Maukah mereka membayar?** — tawarkan, jangan tanya "kira-kira mau tidak"
- **Bisakah kamu melayaninya?** — baru di sini bicara teknologi

Kebanyakan orang **mulai dari langkah keempat**, dan itulah sebabnya banyak aplikasi mahasiswa selesai dengan rapi lalu tidak dipakai siapa pun.

**Perbedaan "mau" dan "bayar"**

Pertanyaan *"apakah kamu mau memakai ini?"* hampir selalu dijawab **ya** — karena menjawab ya itu **gratis dan menyenangkan**.

Pertanyaan yang benar-benar menguji adalah yang **ada harganya**: *"saya jual seharga sekian, mau pesan sekarang?"* — atau bahkan sekadar meminta alamat surel dan komitmen.

Jawaban yang **tidak ada biayanya** tidak memberi informasi apa pun.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA "MAU" TIDAK SAMA DENGAN "BAYAR"\n#\n# Pertanyaan yang GRATIS dijawab:\n#   "Kalau ada aplikasi begini, mau pakai?"\n#   -> 9 dari 10 bilang YA\n#   -> karena menjawab ya itu gratis DAN menyenangkan:\n#      tidak enak mengecewakan orang yang bersemangat\n#\n# Pertanyaan yang ADA HARGANYA:\n#   "Harganya 25 ribu sebulan. Mau pesan sekarang?"\n#   -> mungkin 1 dari 10\n#\n# Selisihnya BUKAN karena orang berbohong.\n# Mereka memang "mau" -- dalam arti tidak keberatan.\n# Yang belum teruji adalah apakah mereka mau\n# MENGELUARKAN SESUATU untuk itu.\n#\n# Jawaban yang tidak ada biayanya tidak memberi\n# informasi apa pun.',
      penjelasan: `
Ini kesalahan yang membunuh paling banyak usaha rintisan mahasiswa, dan penyebabnya bukan kebodohan — melainkan **kesopanan orang yang ditanya**.

Bayangkan kamu ditanya temanmu yang bersemangat: *"Aku mau bikin aplikasi buat cari tempat fotokopi terdekat. Kira-kira kamu mau pakai nggak?"*

Menjawab **"nggak"** berarti mengecewakannya, terdengar meremehkan, dan mungkin harus menjelaskan kenapa. Menjawab **"wah boleh tuh"** memakan nol usaha dan membuat suasana menyenangkan.

Jadi orang menjawab ya. **Dan mereka tidak berbohong** — mereka memang tidak keberatan memakainya, kalau kebetulan ada, kalau gratis, kalau ingat.

Yang **belum diuji sama sekali** adalah apakah masalah itu cukup mengganggu sehingga mereka bersedia **mengeluarkan sesuatu** — uang, waktu, atau sekadar upaya memasang aplikasi.

Sekarang inti gagasannya, dan ia berlaku jauh melampaui kewirausahaan: **sebuah jawaban hanya memberi informasi kalau menjawabnya ada biayanya.**

Karena itu urutan pertanyaan yang menguji, dari yang paling lemah ke yang paling kuat:

- *"Mau pakai?"* — **nol biaya**, nol informasi
- *"Sekarang kamu mengatasinya bagaimana?"* — sedikit biaya, dan **jauh lebih jujur**, karena ia menanyakan **kenyataan**, bukan niat
- *"Boleh saya minta nomor kamu untuk saya kabari?"* — ada biaya kecil
- *"Bayar di muka 50 ribu, saya kirim bulan depan"* — **biaya nyata**, informasi nyata

Perhatikan pertanyaan kedua secara khusus. Ia tidak menanyakan **masa depan** sama sekali — ia menanyakan **apa yang sudah orang itu lakukan**.

Kalau jawabannya *"ya saya tanya-tanya teman saja"*, itu berarti masalahnya **ada tetapi ringan**. Kalau jawabannya *"saya sampai bikin catatan sendiri di ponsel"*, itu **jauh lebih menjanjikan** — ia sudah berusaha, artinya masalahnya cukup mengganggu.

Orang yang **sudah repot-repot mencari jalan sendiri** adalah calon pembeli terbaik yang bisa kamu temukan.

Dan ada akibat lanjutan yang menghemat banyak waktu: kamu bisa melakukan **seluruh pengujian ini sebelum menulis satu baris kode**. Kebanyakan orang membaliknya — membangun dulu, bertanya belakangan — dan itulah sebabnya banyak aplikasi mahasiswa selesai dengan rapi lalu tidak dipakai siapa pun.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Risiko, gagasan usaha, dan mengujinya
# ============================================

def rp(x):
    return "Rp " + format(int(round(x)), ",d").replace(",", ".")


# --------------------------------------------
# 1. Risiko vs ketidakpastian
# --------------------------------------------
print("--- risiko vs ketidakpastian ---")
CONTOH = [
    ("Melempar dadu", "risiko",
     "peluang tiap sisi 1/6 -- bisa dihitung tepat"),
    ("Membuka warung kopi ke-5 di jalan yang sama", "risiko",
     "ada data 4 warung sebelumnya untuk diperkirakan"),
    ("Menjual produk yang belum pernah ada", "ketidakpastian",
     "tidak ada data untuk memperkirakan apa pun"),
    ("Masuk pasar di kota yang belum pernah dikunjungi", "ketidakpastian",
     "peluangnya sendiri tidak diketahui"),
]
print("  " + "keadaan".ljust(44) + "jenis".ljust(17) + "kenapa")
for nama, jenis, alasan in CONTOH:
    print("  " + nama.ljust(44) + jenis.ljust(17) + alasan)

print("")
print("  Kewirausahaan sebagian besar berurusan dengan yang KEDUA.")
print("  Dan karena peluangnya tidak bisa dihitung, satu-satunya")
print("  cara mengeceknya adalah MENCOBANYA DALAM SKALA KECIL.")


# --------------------------------------------
# 2. Wirausaha bukan penjudi
# --------------------------------------------
def hasil_taruhan(modal, peluang_berhasil, kelipatan, kali=1):
    """Nilai harapan sederhana dari sebuah taruhan."""
    untung = modal * kelipatan * peluang_berhasil
    rugi = modal * (1 - peluang_berhasil)
    return (untung - rugi) * kali


print("")
print("--- tiga sikap terhadap risiko ---")
SIKAP = [
    ("Penghindar risiko", 500_000, 0.95, 0.2,
     "aman, tapi hampir tidak tumbuh"),
    ("Pengambil risiko terukur", 2_000_000, 0.35, 5.0,
     "menghitung dulu, lalu melangkah"),
    ("Penjudi", 50_000_000, 0.10, 5.0,
     "besar, tanpa diukur"),
]
print("  " + "sikap".ljust(26) + "taruhan".rjust(14) +
      "peluang".rjust(9) + "nilai harapan".rjust(16))
for nama, modal, p, k, ket in SIKAP:
    nh = hasil_taruhan(modal, p, k)
    print("  " + nama.ljust(26) + rp(modal).rjust(14) +
          ("%.0f%%" % (p * 100)).rjust(9) + rp(nh).rjust(16))
    print("  " + " " * 26 + "-> " + ket)

print("")
print("  Nilai harapan penjudi bisa saja POSITIF. Yang membuatnya")
print("  penjudi bukan angka itu, melainkan bahwa satu kegagalan")
print("  MENGHABISKANNYA -- dan ia tidak punya kesempatan kedua.")


# --------------------------------------------
# 3. Kenapa 'affordable loss' lebih tahan banting
# --------------------------------------------
def simulasi_berulang(modal_awal, taruhan_persen, peluang, kelipatan,
                      putaran, benih=42):
    import random
    acak = random.Random(benih)
    uang = float(modal_awal)
    mati = None
    for i in range(1, putaran + 1):
        taruhan = uang * taruhan_persen
        if taruhan < 1:
            mati = i
            break
        uang -= taruhan
        if acak.random() < peluang:
            uang += taruhan * kelipatan
        if uang < modal_awal * 0.02:
            mati = i
            break
    return uang, mati


print("")
print("--- bertaruh besar vs bertaruh terbatas ---")
print("  modal awal Rp 10.000.000, peluang berhasil 35%,")
print("  kalau berhasil balik 5 kali lipat, dicoba 15 kali")
print("")
print("  " + "porsi tiap taruhan".ljust(22) + "sisa modal".rjust(16) +
      "  keterangan")
for persen in [1.00, 0.50, 0.20, 0.10]:
    sisa, mati = simulasi_berulang(10_000_000, persen, 0.35, 5.0, 15)
    ket = ("HABIS di putaran %d" % mati) if mati else "masih hidup"
    print("  " + ("%.0f%% dari modal" % (persen * 100)).ljust(22) +
          rp(sisa).rjust(16) + "  " + ket)

print("")
print("  Peluang dan imbalannya SAMA PERSIS di keempat baris.")
print("  Yang berbeda cuma berapa banyak yang dipertaruhkan.")
print("")
print("  Bertaruh seluruh modal berarti satu kegagalan mengakhiri")
print("  permainan -- dan dengan peluang 35 persen, kegagalan itu")
print("  hampir pasti datang.")
print("")
print("  Prinsip affordable loss membalik pertanyaannya: bukan")
print("  'berapa keuntungan yang mungkin?' melainkan 'BERAPA")
print("  KERUGIAN YANG SANGGUP SAYA TANGGUNG?' -- lalu batasi")
print("  taruhannya sampai angka itu.")


# --------------------------------------------
# 4. Biaya kegagalan: yang bisa diatur
# --------------------------------------------
print("")
print("--- kegagalan tidak bisa dihindari; biayanya bisa diatur ---")
JALAN = [
    ("Bangun aplikasi lengkap dulu, baru cari pengguna",
     8, 25_000_000, "kesalahan ketahuan setelah 8 bulan"),
    ("Bangun versi paling sederhana, cari 10 pengguna",
     2, 3_000_000,  "kesalahan ketahuan setelah 2 bulan"),
    ("Tawarkan dulu lewat pesan, layani manual",
     0.5, 300_000,  "kesalahan ketahuan setelah 2 minggu"),
]
print("  " + "cara".ljust(50) + "waktu".rjust(9) + "biaya".rjust(16))
for nama, bulan, biaya, ket in JALAN:
    print("  " + nama.ljust(50) +
          ("%.1f bln" % bulan).rjust(9) + rp(biaya).rjust(16))
    print("  " + " " * 50 + "-> " + ket)

termahal = JALAN[0][2]
termurah = JALAN[2][2]
print("")
print("  Kesalahannya bisa SAMA PERSIS di ketiga jalan.")
print("  Yang berbeda cuma berapa mahal untuk mengetahuinya:")
print("  %s lawan %s -- %.0f kali lipat."
      % (rp(termahal), rp(termurah), termahal / termurah))


# --------------------------------------------
# 5. Sumber gagasan usaha
# --------------------------------------------
print("")
print("--- sumber gagasan usaha ---")
SUMBER = [
    ("Masalah yang kamu alami sendiri",
     "paling baik -- kamu TAHU masalahnya nyata"),
    ("Keluhan orang di sekitarmu",
     "dengarkan kalimat 'kenapa tidak ada yang...'"),
    ("Ketidakefisienan yang diterima begitu saja",
     "proses boros yang tidak ada yang mempertanyakan"),
    ("Perubahan",
     "peraturan baru, teknologi baru, kebiasaan baru"),
    ("Menyalin dengan penyesuaian",
     "model yang berhasil di tempat lain"),
    ("Menggabungkan dua hal yang sudah ada",
     "kreativitas = menghubungkan, bukan menciptakan"),
]
for nama, ket in SUMBER:
    print("  " + nama)
    print("      " + ket)


# --------------------------------------------
# 6. Menguji gagasan: pertanyaan yang ADA HARGANYA
# --------------------------------------------
print("")
print("--- kenapa 'mau' tidak sama dengan 'bayar' ---")

DITANYA = 40
PERTANYAAN = [
    ("Kalau ada aplikasi begini, mau pakai?",
     0.90, "nol biaya menjawab ya"),
    ("Sekarang kamu mengatasinya bagaimana?",
     0.35, "menanyakan KENYATAAN, bukan niat"),
    ("Boleh saya kabari kalau sudah jadi? (minta nomor)",
     0.20, "ada biaya kecil"),
    ("Bayar di muka 50 ribu, saya kirim bulan depan",
     0.05, "biaya nyata -> informasi nyata"),
]
print("  ditanya ke %d orang" % DITANYA)
print("")
print("  " + "pertanyaan".ljust(50) + "menjawab ya".rjust(13) +
      "  keterangan")
for tanya, porsi, ket in PERTANYAAN:
    n = round(DITANYA * porsi)
    print("  " + tanya.ljust(50) + ("%d (%.0f%%)" % (n, porsi * 100)).rjust(13) +
          "  " + ket)

print("")
print("  Selisihnya BUKAN karena orang berbohong. Mereka memang")
print("  'mau' -- dalam arti tidak keberatan. Yang belum teruji")
print("  adalah apakah mereka mau MENGELUARKAN SESUATU untuk itu.")
print("")
print("  Sebuah jawaban hanya memberi informasi kalau MENJAWABNYA")
print("  ADA BIAYANYA.")


# --------------------------------------------
# 7. Pertanyaan kedua: yang paling sering dilewatkan
# --------------------------------------------
print("")
print("--- 'sekarang kamu mengatasinya bagaimana?' ---")
JAWABAN = [
    ("Ya sudah, saya biarkan saja",
     0, "masalahnya ADA tapi tidak mengganggu"),
    ("Saya tanya-tanya teman",
     1, "ringan; mungkin tidak cukup untuk dibayar"),
    ("Saya bikin catatan sendiri di ponsel",
     2, "MENJANJIKAN -- ia sudah berusaha"),
    ("Saya bayar orang untuk mengurusnya",
     3, "CALON PEMBELI TERBAIK -- sudah mengeluarkan uang"),
]
print("  " + "jawaban calon pengguna".ljust(42) + "sinyal".rjust(8) +
      "  arti")
for jwb, nilai, arti in JAWABAN:
    bintang = "*" * nilai if nilai else "-"
    print("  " + jwb.ljust(42) + bintang.rjust(8) + "  " + arti)

print("")
print("  Pertanyaan ini tidak menanyakan MASA DEPAN sama sekali.")
print("  Ia menanyakan apa yang SUDAH orang itu lakukan.")
print("")
print("  Orang yang sudah repot-repot mencari jalan sendiri adalah")
print("  calon pembeli terbaik yang bisa kamu temukan -- karena ia")
print("  sudah membuktikan masalahnya cukup mengganggu.")


# --------------------------------------------
# 8. Urutan menguji gagasan
# --------------------------------------------
print("")
print("--- urutan yang menghemat paling banyak waktu ---")
URUT = [
    (1, "Apakah masalahnya nyata?",
     "tanya 10 orang TANPA menyebut solusimu"),
    (2, "Apakah cukup menyakitkan?",
     "tanya apa yang mereka lakukan sekarang"),
    (3, "Maukah mereka membayar?",
     "TAWARKAN, jangan tanya 'kira-kira mau tidak'"),
    (4, "Bisakah kamu melayaninya?",
     "BARU di sini bicara teknologi"),
]
for no, tanya, cara in URUT:
    print("  " + str(no) + ". " + tanya.ljust(32) + cara)

print("")
print("  Kebanyakan orang MULAI DARI LANGKAH KEEMPAT.")
print("")
print("  Itulah sebabnya banyak aplikasi mahasiswa selesai dengan")
print("  rapi, berjalan tanpa bug, terdokumentasi baik -- dan")
print("  tidak dipakai siapa pun.")
print("")
print("  Seluruh langkah 1 sampai 3 bisa dikerjakan SEBELUM")
print("  menulis satu baris kode.")`
  },

  output: `--- risiko vs ketidakpastian ---
  keadaan                                     jenis            kenapa
  Melempar dadu                               risiko           peluang tiap sisi 1/6 -- bisa dihitung tepat
  Membuka warung kopi ke-5 di jalan yang sama risiko           ada data 4 warung sebelumnya untuk diperkirakan
  Menjual produk yang belum pernah ada        ketidakpastian   tidak ada data untuk memperkirakan apa pun
  Masuk pasar di kota yang belum pernah dikunjungiketidakpastian   peluangnya sendiri tidak diketahui

  Kewirausahaan sebagian besar berurusan dengan yang KEDUA.
  Dan karena peluangnya tidak bisa dihitung, satu-satunya
  cara mengeceknya adalah MENCOBANYA DALAM SKALA KECIL.

--- tiga sikap terhadap risiko ---
  sikap                            taruhan  peluang   nilai harapan
  Penghindar risiko             Rp 500.000      95%       Rp 70.000
                            -> aman, tapi hampir tidak tumbuh
  Pengambil risiko terukur    Rp 2.000.000      35%    Rp 2.200.000
                            -> menghitung dulu, lalu melangkah
  Penjudi                    Rp 50.000.000      10%  Rp -20.000.000
                            -> besar, tanpa diukur

  Nilai harapan penjudi bisa saja POSITIF. Yang membuatnya
  penjudi bukan angka itu, melainkan bahwa satu kegagalan
  MENGHABISKANNYA -- dan ia tidak punya kesempatan kedua.

--- bertaruh besar vs bertaruh terbatas ---
  modal awal Rp 10.000.000, peluang berhasil 35%,
  kalau berhasil balik 5 kali lipat, dicoba 15 kali

  porsi tiap taruhan          sisa modal  keterangan
  100% dari modal                   Rp 0  HABIS di putaran 1
  50% dari modal          Rp 512.578.125  masih hidup
  20% dari modal          Rp 231.105.324  masih hidup
  10% dari modal           Rp 70.586.533  masih hidup

  Peluang dan imbalannya SAMA PERSIS di keempat baris.
  Yang berbeda cuma berapa banyak yang dipertaruhkan.

  Bertaruh seluruh modal berarti satu kegagalan mengakhiri
  permainan -- dan dengan peluang 35 persen, kegagalan itu
  hampir pasti datang.

  Prinsip affordable loss membalik pertanyaannya: bukan
  'berapa keuntungan yang mungkin?' melainkan 'BERAPA
  KERUGIAN YANG SANGGUP SAYA TANGGUNG?' -- lalu batasi
  taruhannya sampai angka itu.

--- kegagalan tidak bisa dihindari; biayanya bisa diatur ---
  cara                                                  waktu           biaya
  Bangun aplikasi lengkap dulu, baru cari pengguna    8.0 bln   Rp 25.000.000
                                                    -> kesalahan ketahuan setelah 8 bulan
  Bangun versi paling sederhana, cari 10 pengguna     2.0 bln    Rp 3.000.000
                                                    -> kesalahan ketahuan setelah 2 bulan
  Tawarkan dulu lewat pesan, layani manual            0.5 bln      Rp 300.000
                                                    -> kesalahan ketahuan setelah 2 minggu

  Kesalahannya bisa SAMA PERSIS di ketiga jalan.
  Yang berbeda cuma berapa mahal untuk mengetahuinya:
  Rp 25.000.000 lawan Rp 300.000 -- 83 kali lipat.

--- sumber gagasan usaha ---
  Masalah yang kamu alami sendiri
      paling baik -- kamu TAHU masalahnya nyata
  Keluhan orang di sekitarmu
      dengarkan kalimat 'kenapa tidak ada yang...'
  Ketidakefisienan yang diterima begitu saja
      proses boros yang tidak ada yang mempertanyakan
  Perubahan
      peraturan baru, teknologi baru, kebiasaan baru
  Menyalin dengan penyesuaian
      model yang berhasil di tempat lain
  Menggabungkan dua hal yang sudah ada
      kreativitas = menghubungkan, bukan menciptakan

--- kenapa 'mau' tidak sama dengan 'bayar' ---
  ditanya ke 40 orang

  pertanyaan                                          menjawab ya  keterangan
  Kalau ada aplikasi begini, mau pakai?                  36 (90%)  nol biaya menjawab ya
  Sekarang kamu mengatasinya bagaimana?                  14 (35%)  menanyakan KENYATAAN, bukan niat
  Boleh saya kabari kalau sudah jadi? (minta nomor)       8 (20%)  ada biaya kecil
  Bayar di muka 50 ribu, saya kirim bulan depan            2 (5%)  biaya nyata -> informasi nyata

  Selisihnya BUKAN karena orang berbohong. Mereka memang
  'mau' -- dalam arti tidak keberatan. Yang belum teruji
  adalah apakah mereka mau MENGELUARKAN SESUATU untuk itu.

  Sebuah jawaban hanya memberi informasi kalau MENJAWABNYA
  ADA BIAYANYA.

--- 'sekarang kamu mengatasinya bagaimana?' ---
  jawaban calon pengguna                      sinyal  arti
  Ya sudah, saya biarkan saja                      -  masalahnya ADA tapi tidak mengganggu
  Saya tanya-tanya teman                           *  ringan; mungkin tidak cukup untuk dibayar
  Saya bikin catatan sendiri di ponsel            **  MENJANJIKAN -- ia sudah berusaha
  Saya bayar orang untuk mengurusnya             ***  CALON PEMBELI TERBAIK -- sudah mengeluarkan uang

  Pertanyaan ini tidak menanyakan MASA DEPAN sama sekali.
  Ia menanyakan apa yang SUDAH orang itu lakukan.

  Orang yang sudah repot-repot mencari jalan sendiri adalah
  calon pembeli terbaik yang bisa kamu temukan -- karena ia
  sudah membuktikan masalahnya cukup mengganggu.

--- urutan yang menghemat paling banyak waktu ---
  1. Apakah masalahnya nyata?        tanya 10 orang TANPA menyebut solusimu
  2. Apakah cukup menyakitkan?       tanya apa yang mereka lakukan sekarang
  3. Maukah mereka membayar?         TAWARKAN, jangan tanya 'kira-kira mau tidak'
  4. Bisakah kamu melayaninya?       BARU di sini bicara teknologi

  Kebanyakan orang MULAI DARI LANGKAH KEEMPAT.

  Itulah sebabnya banyak aplikasi mahasiswa selesai dengan
  rapi, berjalan tanpa bug, terdokumentasi baik -- dan
  tidak dipakai siapa pun.

  Seluruh langkah 1 sampai 3 bisa dikerjakan SEBELUM
  menulis satu baris kode.`,

  kesalahanUmum: [
    {
      salah: 'Mengira wirausaha adalah orang yang berani mengambil risiko besar.',
      kenapa: 'Wirausaha yang bertahan justru pandai memperkecil risiko sebelum melangkah, dan hanya menanggung yang tidak bisa dihilangkan. Yang membedakannya dari penjudi bukan keberaniannya melainkan apa yang ia lakukan sebelum melangkah.',
      benar: 'Perkecil taruhannya, perkecil kerugiannya, perbanyak informasinya, dan buat kegagalannya cepat serta murah.'
    },
    {
      salah: 'Mempertaruhkan seluruh modal pada satu percobaan karena nilai harapannya positif.',
      kenapa: 'Nilai harapan yang positif tidak berarti apa-apa kalau satu kegagalan menghabiskan modalmu, sebab kamu tidak akan punya kesempatan kedua untuk mengambil rata-ratanya. Dengan peluang berhasil sepertiga, kegagalan itu hampir pasti datang.',
      benar: 'Pakai prinsip affordable loss: tentukan berapa kerugian yang sanggup ditanggung, lalu batasi setiap taruhan sampai angka itu.'
    },
    {
      salah: 'Membangun produk lengkap lebih dulu, baru mencari pengguna.',
      kenapa: 'Kesalahan yang sama bisa terjadi pada jalan mana pun, tetapi biaya mengetahuinya berbeda puluhan kali lipat. Gagal setelah dua minggu dan tiga ratus ribu adalah pelajaran, sedangkan gagal setelah delapan bulan dan dua puluh lima juta adalah bencana.',
      benar: 'Rancang percobaan yang membuat kesalahan ketahuan dalam hitungan minggu, misalnya melayani manual lebih dulu sebelum membangun apa pun.'
    },
    {
      salah: 'Merahasiakan gagasan usaha karena takut ditiru.',
      kenapa: 'Gagasan hampir tidak bernilai sendirian; yang bernilai adalah pelaksanaan yang menuntut waktu, ketekunan, dan kesanggupan mengubah rencana. Yang didapat dari merahasiakan sangat kecil, sedangkan yang hilang adalah masukan yang bisa menyelamatkanmu dari membangun sesuatu yang tidak dibutuhkan.',
      benar: 'Ceritakan gagasanmu kepada calon pengguna sedini mungkin, dan perlakukan penolakan mereka sebagai penghematan waktu.'
    },
    {
      salah: 'Menguji minat dengan bertanya apakah orang mau memakai produkmu.',
      kenapa: 'Menjawab ya tidak ada biayanya dan menyenangkan bagi yang ditanya, apalagi kalau penanyanya terlihat bersemangat. Jawabannya karena itu tidak memberi informasi apa pun tentang apakah mereka bersedia mengeluarkan uang, waktu, atau upaya.',
      benar: 'Ajukan pertanyaan yang ada biayanya, seperti meminta nomor kontak, pemesanan di muka, atau tanyakan apa yang sudah mereka lakukan untuk mengatasi masalahnya.'
    },
    {
      salah: 'Melewatkan pertanyaan tentang bagaimana calon pengguna mengatasi masalahnya sekarang.',
      kenapa: 'Pertanyaan itu satu-satunya yang menanyakan kenyataan dan bukan niat, sehingga jawabannya jauh lebih jujur. Orang yang sudah membuat catatan sendiri atau membayar orang lain telah membuktikan masalahnya cukup mengganggu, dan ia calon pembeli terbaik yang bisa ditemukan.',
      benar: 'Jadikan pertanyaan itu sebagai langkah kedua yang wajib, sebelum menawarkan apa pun dan jauh sebelum membangun apa pun.'
    }
  ],

  analogi: `Bayangkan kamu ingin tahu apakah **air di kolam itu dingin**.

**Penjudi** melompat masuk dengan kepala lebih dulu. Kalau airnya hangat, ia yang paling cepat menikmatinya. Kalau airnya beku — atau dangkal — ia tidak punya kesempatan kedua.

**Penghindar risiko** berdiri di tepi selama dua jam, membaca ramalan cuaca, dan pulang tanpa pernah tahu.

**Wirausaha** **mencelupkan satu jari**.

Perhatikan bahwa ia **tidak menghindari risiko** — ia tetap menyentuh air yang mungkin sangat dingin. Yang ia lakukan adalah **memperkecil taruhannya** sampai kesalahan menjadi murah.

Dan setelah jarinya masuk, ia **tahu sesuatu yang tidak bisa dikatakan ramalan cuaca mana pun**.

Sekarang **kenapa "mau" bukan "bayar"**.

Bayangkan kamu berdiri di depan gerbang kampus membawa nampan **kue yang belum kamu buat**, dan bertanya kepada orang yang lewat:

*"Kalau saya jualan kue di sini, kira-kira mau beli nggak?"*

Hampir semua akan bilang **"boleh"**, sambil tersenyum, sambil terus berjalan. Menjawab begitu **tidak memakan apa pun** dari mereka — tidak uang, tidak waktu, bahkan tidak perlu berhenti.

Sekarang ubah pertanyaannya: *"Kuenya lima ribu. Mau ambil sekarang?"*

Tiba-tiba orang **berhenti berjalan**. Mereka melihat kuenya. Mereka mengecek dompet. Beberapa bilang **"lain kali ya"** — dan itu jawaban yang **seratus kali lebih berguna** daripada "boleh" tadi.

Tetapi ada pertanyaan yang **lebih baik lagi**, dan ia sering dilewatkan:

*"Biasanya kalau lapar sebelum kelas, kamu makan apa?"*

Pertanyaan ini **tidak menanyakan masa depan sama sekali**. Ia menanyakan **kebiasaan yang sudah ada**.

Kalau jawabannya *"biasanya sih nggak makan"* — masalahnya ringan.
Kalau jawabannya *"saya sengaja bawa roti dari kos karena di sini nggak ada yang jual"* — itu **jauh lebih menjanjikan**.

Orang kedua **sudah repot-repot mencari jalan sendiri**. Ia sudah membuktikan masalahnya nyata — **dengan tindakan, bukan dengan kalimat sopan**.

Dan yang paling penting: kamu bisa mengetahui semua itu **sebelum membuat satu kue pun**.`,

  latihan: [
    'Jelaskan perbedaan risiko dan ketidakpastian, dan jelaskan mana yang lebih banyak dihadapi wirausaha beserta akibatnya.',
    'Sebutkan tiga sikap terhadap risiko, dan jelaskan apa yang membedakan pengambil risiko terukur dari penjudi.',
    'Sebutkan empat cara memperkecil risiko, dan jelaskan kenapa membuat kegagalan cepat dan murah sering paling menentukan.',
    'Jelaskan prinsip affordable loss dan tunjukkan bagaimana ia membalik pertanyaan yang biasa diajukan.',
    'Sebutkan enam sumber gagasan usaha, lalu tulis satu gagasan yang berasal dari masalah yang kamu alami sendiri.',
    'Jelaskan kenapa merahasiakan gagasan usaha hampir selalu keliru.',
    'Jelaskan kenapa pertanyaan "apakah kamu mau memakai ini" tidak memberi informasi, dan tulis tiga pertanyaan pengganti yang ada biayanya.',
    'Jelaskan kenapa pertanyaan tentang cara mengatasi masalah sekarang lebih jujur daripada pertanyaan tentang niat, dan tafsirkan empat kemungkinan jawabannya.',
    'Sebutkan empat langkah menguji gagasan secara berurutan, dan jelaskan kenapa kebanyakan orang mulai dari langkah keempat.'
  ]
});

TOPICS.push({
  id: 'kwu-bisnis-keuangan',
  judul: 'Pemasaran, Keuangan & Rencana Bisnis',
  kategori: 'kwu',
  tag: ['pemasaran', 'BEP', 'arus kas', 'marjin', 'rencana bisnis', 'unit economics'],
  ringkas: 'Angka-angka yang menentukan usaha bertahan atau tidak — dan yang paling sering dilewatkan mahasiswa.',

  fungsi: `**Menghitung apakah usahamu bisa bertahan — dengan angka, bukan perasaan.**

Terpakai di:

- **Rencana bisnis** — bab keuangan hampir selalu diminta
- **Menentukan harga** yang masuk akal
- **Menilai apakah promosi sepadan**
- **Menghindari kehabisan uang** meski untung di atas kertas

Yang paling sering mematikan usaha, dan paling jarang dipahami mahasiswa: **untung dan kas itu berbeda.**

Usaha bisa untung besar di atas kertas dan berhenti karena tidak bisa membayar gaji — dan itu justru sering terjadi ketika penjualan **sedang tumbuh pesat**, karena tumbuh berarti membeli lebih banyak bahan lebih dulu.

Di sinilah mahasiswa Informatika punya keunggulan: **kamu bisa menghitungnya dengan kode.**`,

  praktik: {
    tujuan: `Kamu punya proyeksi keuangan yang memuat arus kas, bukan hanya laba rugi, dan asumsinya bisa dibantah.`,
    alat: [
      'Spreadsheet atau Python',
      'Data harga nyata dari survei kecil'
    ],
    langkah: [
      { judul: 'Pisahkan biaya tetap dan variabel',
        isi: `Uji tiap pos dengan satu pertanyaan: **kalau bulan ini tidak menjual apa pun, apakah biaya ini tetap keluar?**

Kalau ya, ia tetap. Salah menggolongkan membuat semua perhitungan berikutnya salah.` },
      { judul: 'Hitung marjin kontribusi dan BEP',
        isi: `- marjin kontribusi = harga jual dikurangi biaya variabel per unit
- BEP = biaya tetap dibagi marjin kontribusi

Ubah menjadi per hari. Kalau BEP-nya melebihi kapasitasmu, rencananya **sudah gagal di atas kertas** — dan itu ketahuan sebelum satu rupiah dikeluarkan.` },
      { judul: 'Uji beberapa tingkat harga',
        isi: `Hitung BEP untuk beberapa harga berbeda.

Kamu akan melihat bahwa menurunkan harga membuat marjin turun **jauh lebih tajam** daripada harganya, karena biaya variabelnya tidak ikut turun.

Harga murah terasa aman, padahal ia mempersempit ruang gerak.` },
      { judul: 'Buat proyeksi KAS bulanan',
        isi: `Bukan laba rugi — **kas**. Catat kapan uang benar-benar masuk dan keluar.

Kalau pelanggan membayar tempo tiga puluh hari sementara bahan dibayar tunai, tulis begitu.

Periksa kolom **kas terendah**. Begitu ia menyentuh nol, usahamu berhenti hari itu juga.` },
      { judul: 'Uji cara memperbaiki kasnya',
        isi: `Coba empat hal dan bandingkan kas terendahnya: menambah modal awal, meminta uang muka, mempersingkat tempo, dan tumbuh lebih pelan.

Perhatikan bahwa **keuntungannya sama** di keempatnya. Yang berubah cuma **kapan** uang berpindah.` },
      { judul: 'Hitung apakah promosinya sepadan',
        isi: `- biaya mendapatkan pelanggan = biaya promosi dibagi jumlah pelanggan yang didapat
- nilai pelanggan = **marjin** dikali frekuensi beli dikali lama bertahan

Pakai **marjin**, bukan harga jual — kesalahan ini membesar-besarkan nilai pelanggan beberapa kali lipat.

Patokan: nilai pelanggan minimal tiga kali biaya mendapatkannya.` },
      { judul: 'Tulis asumsi yang bisa dibantah',
        isi: `Buruk: *"kami memperkirakan 500 pelanggan"*.

Baik: *"ada 3.000 mahasiswa di gedung ini; dari 40 yang kami tanya, 12 bersedia mencoba; kami menargetkan 5 persen mencoba bulan pertama"*.

Yang kedua bisa dipersoalkan satu per satu — dan justru itu yang membuatnya berguna.` },
      { judul: 'Hitung beberapa skenario',
        isi: `Jalankan proyeksimu untuk keadaan sesuai rencana, setengah dari harapan, dan lebih baik dari harapan.

Periksa asumsi mana yang kalau meleset paling cepat membuat rencanamu gagal. Itulah yang harus paling kamu jaga.` }
    ],
    cek: [
      'Proyeksimu memuat kolom kas, bukan hanya laba rugi',
      'Kas terendahmu tidak pernah menyentuh nol pada skenario sesuai rencana',
      'Setiap angka proyeksimu bisa ditelusuri ke asumsi yang bisa dibantah'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa untung bisa bangkrut',

  konsep: `
Bagian ini yang paling sering dikerjakan asal-asalan pada tugas rencana bisnis mahasiswa — padahal di sinilah **mahasiswa Informatika justru punya keunggulan**, karena terbiasa dengan angka.

**Pemasaran bukan penjualan**

- **Penjualan** — membujuk orang membeli apa yang **sudah kamu buat**
- **Pemasaran** — mencari tahu **apa yang orang mau beli**, lalu menyediakannya

Pemasaran datang **lebih dulu**, dan kalau ia dikerjakan dengan baik, penjualan menjadi jauh lebih mudah.

**Bauran pemasaran (4P)**

- **Product** — apa yang ditawarkan, dan **masalah apa yang ia selesaikan**
- **Price** — berapa harganya, dan **atas dasar apa**
- **Place** — di mana orang bisa mendapatkannya
- **Promotion** — bagaimana orang tahu ia ada

Untuk jasa sering ditambah tiga lagi: **People, Process, Physical evidence**.

**Menentukan harga**

Tiga dasar yang lazim:

- **Berdasarkan biaya** — biaya ditambah marjin. Paling aman, tetapi **mengabaikan berapa yang sebenarnya mau dibayar orang**.
- **Berdasarkan pesaing** — mengikuti harga pasar. Mudah, tetapi **menjebak ke perang harga**.
- **Berdasarkan nilai** — berapa nilai masalah yang kamu selesaikan bagi pembeli. **Paling menguntungkan**, dan paling sulit.

**Kesalahan harga yang paling sering: memasang terlalu murah.**

Terasa aman, padahal ia **mempersempit ruang gerak**. Harga rendah menuntut **jumlah penjualan jauh lebih besar** untuk mencapai untung yang sama, sementara biayanya sering ikut naik.

Dan menaikkan harga nanti **jauh lebih sulit** daripada menurunkannya.

**Segmentasi dan target**

Melayani **semua orang** berarti melayani **tidak seorang pun dengan baik**.

Menyempitkan pasar terasa seperti membuang peluang, padahal ia **menajamkan** — karena kamu bisa berbicara dengan bahasa yang tepat, dan mereka merasa produk itu **memang untuk mereka**.

**Biaya tetap dan biaya variabel**

- **Biaya tetap** — tidak berubah meski produksi naik-turun. Sewa, gaji tetap, langganan peladen.
- **Biaya variabel** — naik seiring jumlah yang dijual. Bahan baku, ongkos kirim, komisi.

Pembedaan ini **wajib benar**, karena seluruh perhitungan berikutnya bergantung padanya.

**Marjin kontribusi**

\`harga jual − biaya variabel per unit\`

Inilah yang **tersisa dari tiap penjualan** untuk menutup biaya tetap. Kalau ia **nol atau negatif**, menjual lebih banyak justru **memperbesar kerugian**.

**Titik impas (BEP)**

\`BEP (unit) = biaya tetap ÷ marjin kontribusi\`

Berapa unit harus terjual supaya **tidak rugi dan tidak untung**.

Angka ini yang seharusnya **paling dulu dihitung**, karena ia langsung menjawab: *"apakah ini masuk akal sama sekali?"*

Kalau BEP-nya 4.000 porsi per bulan sementara kapasitasmu 1.200, rencananya **sudah gagal di atas kertas** — dan itu ketahuan sebelum satu rupiah pun dikeluarkan.

**Untung dan kas itu berbeda**

Bagian yang **paling sering tidak dipahami**, dan paling sering mematikan usaha.

- **Untung** — pendapatan dikurangi biaya, dicatat **saat transaksi terjadi**
- **Kas** — uang yang **benar-benar ada** di tangan sekarang

Usaha bisa **untung di atas kertas dan bangkrut karena kehabisan kas**.

Sebabnya sederhana: pelanggan membayar **belakangan**, sementara pemasok dan karyawan menuntut dibayar **sekarang**. Selisih waktu itu harus **ditalangi**, dan kalau tidak ada yang menalangi, usahanya berhenti.

Dan ini terjadi justru ketika penjualan **sedang tumbuh pesat** — karena tumbuh berarti membeli lebih banyak bahan lebih dulu.

**Rencana bisnis**

Isi yang lazim: ringkasan eksekutif, gambaran usaha, analisis pasar, rencana pemasaran, rencana operasional, rencana keuangan, dan analisis risiko.

**Gunanya bukan dokumennya.** Gunanya adalah **memaksa kamu memikirkan hal yang ingin kamu hindari** — terutama angkanya.

Rencana bisnis yang bagus **memuat asumsi yang bisa dibantah**, bukan angka yang terlihat meyakinkan. *"Kami memperkirakan 500 pelanggan"* tidak berarti apa-apa. *"Ada 3.000 mahasiswa di gedung ini, kami menargetkan 5 persen mencoba dalam bulan pertama, berdasarkan 12 dari 40 orang yang kami tanya bersedia mencoba"* — itu **bisa diperiksa dan bisa salah**, dan justru itu yang membuatnya berguna.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# KENAPA USAHA BISA UNTUNG TAPI BANGKRUT\n#\n# Bulan ini:\n#   penjualan (dibayar 30 hari lagi)   Rp 50.000.000\n#   biaya (dibayar SEKARANG)           Rp 35.000.000\n#   ---------------------------------------------\n#   UNTUNG di atas kertas              Rp 15.000.000\n#   KAS yang benar-benar masuk         Rp  0\n#   KAS yang benar-benar keluar        Rp 35.000.000\n#   ---------------------------------------------\n#   KAS berubah                       -Rp 35.000.000\n#\n# Dan makin CEPAT tumbuh, makin PARAH -- karena tumbuh\n# berarti membeli lebih banyak bahan LEBIH DULU.\n#\n# Untung dicatat saat transaksi TERJADI.\n# Kas berubah saat uang BERPINDAH.\n# Usaha mati karena kehabisan KAS, bukan karena rugi.',
      penjelasan: `
Ini penyebab kematian usaha kecil yang paling sering, dan yang paling sulit dipercaya sebelum mengalaminya: **usaha bisa mati justru ketika sedang berhasil.**

Mulai dari sebab yang sederhana. Ada **selisih waktu** antara dua hal:

- Kamu **membayar** bahan, gaji, dan sewa — **sekarang**
- Pelanggan **membayarmu** — **tiga puluh hari lagi**, atau lebih

Selama tiga puluh hari itu, **kamu yang menalangi**. Dan uang talangan itu harus datang dari suatu tempat.

Sekarang bagian yang membalik dugaan: **makin cepat kamu tumbuh, makin besar lubangnya.**

Bulan ini kamu menjual seratus juta, jadi bulan depan kamu membeli bahan untuk **seratus lima puluh juta** — karena permintaannya naik. Tetapi uang dari penjualan seratus juta itu **belum masuk**.

Jadi setiap bulan pertumbuhan **memperbesar** jarak antara uang keluar dan uang masuk. Laporan labamu terlihat **semakin bagus** sementara rekeningmu **semakin kosong**.

Dan inilah kalimat yang layak diingat: **usaha tidak mati karena rugi; ia mati karena tidak bisa membayar.**

Perusahaan yang rugi tetapi punya kas masih bisa berjalan bertahun-tahun. Perusahaan yang untung tetapi tidak bisa membayar gaji **berhenti bulan itu juga**.

Sekarang apa yang bisa dilakukan, dan perhatikan bahwa **tidak satu pun berkaitan dengan menaikkan keuntungan**:

- **Persingkat waktu tagihan** — minta bayar di muka, atau sebagian di muka
- **Perpanjang waktu bayar ke pemasok** — negosiasikan tempo
- **Kurangi persediaan** — jangan menumpuk barang yang uangnya tertahan di rak
- **Sediakan penyangga kas** — cukup untuk beberapa bulan biaya tetap
- **Tumbuh lebih pelan** kalau kasnya tidak sanggup

Butir terakhir terasa berlawanan dengan naluri, dan justru itu yang paling sering menyelamatkan.

Ada satu kaidah praktis yang menutup seluruh gagasan ini: **buat proyeksi kas bulanan, bukan cuma proyeksi laba rugi.**

Rencana bisnis mahasiswa hampir selalu memuat tabel laba rugi yang rapi, dan **hampir tidak pernah** memuat proyeksi kas. Padahal yang membunuh usaha adalah **yang kedua** — dan ia bisa dihitung sebelum apa pun dimulai.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Pemasaran, keuangan, dan rencana bisnis
# Kasus: kedai kopi kecil di dekat kampus
# ============================================

def rp(x):
    tanda = "-" if x < 0 else ""
    return tanda + "Rp " + format(int(round(abs(x))), ",d").replace(",", ".")


# --------------------------------------------
# 1. Biaya tetap vs biaya variabel
# --------------------------------------------
BIAYA_TETAP = {
    "Sewa tempat":            3_500_000,
    "Gaji 2 barista":         5_000_000,
    "Listrik & air (tetap)":    800_000,
    "Langganan internet":       300_000,
    "Penyusutan alat":          700_000,
}
BIAYA_VARIABEL = {
    "Biji kopi":       4_500,
    "Susu":            3_000,
    "Gelas & tutup":   1_200,
    "Gula & sirup":      800,
}
HARGA_JUAL = 18_000

tetap = sum(BIAYA_TETAP.values())
variabel = sum(BIAYA_VARIABEL.values())

print("--- biaya tetap (per bulan) ---")
for nama, n in BIAYA_TETAP.items():
    print("  " + nama.ljust(26) + rp(n).rjust(14))
print("  " + "TOTAL".ljust(26) + rp(tetap).rjust(14))

print("")
print("--- biaya variabel (per gelas) ---")
for nama, n in BIAYA_VARIABEL.items():
    print("  " + nama.ljust(26) + rp(n).rjust(14))
print("  " + "TOTAL".ljust(26) + rp(variabel).rjust(14))


# --------------------------------------------
# 2. Marjin kontribusi & titik impas
# --------------------------------------------
marjin = HARGA_JUAL - variabel
bep_unit = tetap / marjin
bep_rupiah = bep_unit * HARGA_JUAL

print("")
print("--- marjin kontribusi & titik impas ---")
print("  harga jual per gelas        " + rp(HARGA_JUAL).rjust(14))
print("  biaya variabel per gelas    " + rp(variabel).rjust(14))
print("  " + "-" * 42)
print("  MARJIN KONTRIBUSI           " + rp(marjin).rjust(14) +
      "   (%.0f%% dari harga)" % (marjin / HARGA_JUAL * 100))
print("")
print("  BEP = biaya tetap / marjin kontribusi")
print("      = %s / %s" % (rp(tetap), rp(marjin)))
print("      = %.0f gelas per bulan" % bep_unit)
print("      = %.0f gelas per hari (26 hari kerja)" % (bep_unit / 26))
print("      = %s omzet per bulan" % rp(bep_rupiah))

print("")
print("  Inilah angka yang seharusnya PALING DULU dihitung,")
print("  karena ia langsung menjawab: apakah ini masuk akal")
print("  sama sekali?")


# --------------------------------------------
# 3. Kenapa harga murah TIDAK aman
# --------------------------------------------
print("")
print("--- kenapa memasang harga terlalu murah berbahaya ---")
print("  " + "harga".rjust(9) + "marjin".rjust(10) +
      "BEP/bulan".rjust(12) + "BEP/hari".rjust(10) +
      "  butuh berapa kali lipat")
dasar = None
for harga in [12_000, 15_000, 18_000, 22_000, 25_000]:
    m = harga - variabel
    if m <= 0:
        print("  " + rp(harga).rjust(9) + rp(m).rjust(10) +
              "MUSTAHIL".rjust(12))
        continue
    b = tetap / m
    if harga == 18_000:
        dasar = b
    lipat = "" if dasar is None else " %.2fx" % (b / dasar)
    print("  " + rp(harga).rjust(9) + rp(m).rjust(10) +
          ("%.0f" % b).rjust(12) + ("%.0f" % (b / 26)).rjust(10) +
          "  " + lipat)

m12 = 12_000 - variabel
m25 = 25_000 - variabel
print("")
print("  Harga turun dari 25 ribu ke 12 ribu = turun %.0f%%,"
      % ((25_000 - 12_000) / 25_000 * 100))
print("  tapi marjinnya turun dari %s ke %s = turun %.0f%%."
      % (rp(m25), rp(m12), (m25 - m12) / m25 * 100))
print("")
print("  Marjin turun JAUH LEBIH TAJAM daripada harganya, karena")
print("  biaya variabelnya tidak ikut turun sama sekali.")
print("")
print("  Dan menaikkan harga NANTI jauh lebih sulit daripada")
print("  menurunkannya.")


# --------------------------------------------
# 4. UNTUNG lawan KAS
# --------------------------------------------
print("")
print("--- untung lawan kas: enam bulan pertama ---")
print("  Pelanggan korporat membayar 30 hari setelah tagihan.")
print("  Bahan dan gaji dibayar SEKARANG.")
print("")

penjualan = [20_000_000, 30_000_000, 45_000_000,
             65_000_000, 90_000_000, 120_000_000]

kas = 25_000_000          # modal awal
print("  " + "bln".rjust(4) + "penjualan".rjust(16) +
      "biaya".rjust(16) + "untung".rjust(16) +
      "kas masuk".rjust(16) + "kas akhir".rjust(16))

laba_kumulatif = 0
for i, jual in enumerate(penjualan):
    # biaya bulan ini disiapkan untuk penjualan BULAN INI
    biaya = tetap + (jual / HARGA_JUAL) * variabel
    untung = jual - biaya
    laba_kumulatif += untung

    # uang masuk = penjualan BULAN LALU (tempo 30 hari)
    masuk = penjualan[i - 1] if i > 0 else 0
    kas += masuk - biaya

    tanda = "   <-- KAS HABIS" if kas < 0 else ""
    print("  " + str(i + 1).rjust(4) + rp(jual).rjust(16) +
          rp(biaya).rjust(16) + rp(untung).rjust(16) +
          rp(masuk).rjust(16) + rp(kas).rjust(16) + tanda)

print("")
print("  laba kumulatif enam bulan : " + rp(laba_kumulatif))
print("  kas di akhir bulan keenam : " + rp(kas))

print("")
print("  Usahanya UNTUNG BESAR di atas kertas dan tetap kehabisan")
print("  uang -- karena penjualannya TUMBUH, dan tumbuh berarti")
print("  membeli lebih banyak bahan LEBIH DULU.")
print("")
print("  Usaha tidak mati karena rugi. Ia mati karena tidak bisa")
print("  MEMBAYAR.")


# --------------------------------------------
# 5. Apa yang menolong -- dan tidak satu pun
#    berkaitan dengan menaikkan keuntungan
# --------------------------------------------
def jalankan_kas(penjualan, modal, tempo_bulan, uang_muka=0.0):
    kas = float(modal)
    terendah = kas
    for i, jual in enumerate(penjualan):
        biaya = tetap + (jual / HARGA_JUAL) * variabel
        masuk = jual * uang_muka
        if i - tempo_bulan >= 0:
            masuk += penjualan[i - tempo_bulan] * (1 - uang_muka)
        kas += masuk - biaya
        terendah = min(terendah, kas)
    return kas, terendah


print("")
print("--- apa yang menolong ---")
PILIHAN = [
    ("Apa adanya (tempo 30 hari)",       25_000_000, 1, 0.00),
    ("Modal awal ditambah 40 juta",      65_000_000, 1, 0.00),
    ("Minta 50% uang muka",              25_000_000, 1, 0.50),
    ("Bayar tunai (tanpa tempo)",        25_000_000, 0, 0.00),
]
print("  " + "cara".ljust(32) + "kas akhir".rjust(17) +
      "kas terendah".rjust(17) + "  selamat?")
for nama, modal, tempo, dp in PILIHAN:
    akhir, rendah = jalankan_kas(penjualan, modal, tempo, dp)
    print("  " + nama.ljust(32) + rp(akhir).rjust(17) +
          rp(rendah).rjust(17) +
          ("  ya" if rendah >= 0 else "  TIDAK"))

print("")
print("  Keuntungan enam bulan SAMA PERSIS di keempat baris:")
print("  " + rp(laba_kumulatif) + ". Yang berubah cuma KAPAN uangnya")
print("  berpindah tangan.")
print("")
print("  Kas akhir yang berbeda-beda BUKAN untung yang berbeda --")
print("  itu cuma bagian yang SUDAH TERTAGIH sampai bulan keenam.")
print("  Sisanya masih berupa piutang yang belum dibayar.")
print("")
print("  Yang benar-benar menentukan hidup mati adalah kolom")
print("  KAS TERENDAH: begitu ia menyentuh nol, usahanya berhenti")
print("  hari itu juga -- betapa pun bagus kolom untungnya.")
print("")
print("  Karena itu jalan keluarnya tidak ada hubungannya dengan")
print("  menaikkan untung: persingkat tempo tagihan, minta uang")
print("  muka, kurangi persediaan, sediakan penyangga kas, atau")
print("  TUMBUH LEBIH PELAN.")


# --------------------------------------------
# 6. Biaya mendapatkan pelanggan
# --------------------------------------------
print("")
print("--- apakah promosinya sepadan? ---")
PROMOSI = [
    ("Sebar brosur di kampus",   500_000,  40, 3, 6),
    ("Iklan media sosial",     2_000_000, 260, 2, 4),
    ("Diskon pembukaan 50%",   3_000_000, 400, 1, 2),
    ("Endorse mahasiswa",      1_500_000,  55, 4, 9),
]
print("  " + "cara".ljust(24) + "biaya".rjust(13) +
      "pelanggan".rjust(11) + "CAC".rjust(11) +
      "nilai seumur".rjust(14) + "  putusan")
for nama, biaya, dapat, per_bulan, bulan in PROMOSI:
    cac = biaya / dapat
    nilai = per_bulan * bulan * marjin       # marjin, bukan harga jual
    putusan = "LANJUT" if nilai > cac * 3 else (
              "hati-hati" if nilai > cac else "RUGI")
    print("  " + nama.ljust(24) + rp(biaya).rjust(13) +
          str(dapat).rjust(11) + rp(cac).rjust(11) +
          rp(nilai).rjust(14) + "  " + putusan)

print("")
print("  CAC = biaya promosi / jumlah pelanggan yang didapat.")
print("  Nilai seumur hidup dihitung dari MARJIN, bukan dari")
print("  harga jual -- kesalahan yang sangat sering terjadi.")
print("")
print("  Patokan yang lazim: nilai seumur hidup minimal 3 kali CAC,")
print("  supaya masih ada ruang untuk biaya tetap dan kesalahan.")


# --------------------------------------------
# 7. Asumsi yang bisa dibantah
# --------------------------------------------
print("")
print("--- rencana bisnis: asumsi yang BISA DIBANTAH ---")
print("")
print("  BURUK  : 'Kami memperkirakan 500 pelanggan per bulan.'")
print("           -> tidak bisa diperiksa, tidak bisa salah,")
print("              jadi tidak berguna")
print("")
print("  BAIK   : 'Ada 3.000 mahasiswa di gedung ini. Dari 40")
print("            yang kami tanya, 12 bersedia mencoba (30%).")
print("            Kami menargetkan 5% mencoba bulan pertama")
print("            = 150 orang, dengan 3 kali beli per bulan.'")
print("")

MAHASISWA = 3000
DITANYA, BERSEDIA = 40, 12
TARGET_COBA = 0.05
BELI_PER_BULAN = 3

porsi = BERSEDIA / DITANYA
mencoba = MAHASISWA * TARGET_COBA
gelas = mencoba * BELI_PER_BULAN

print("  " + "dari survei 40 orang".ljust(34) +
      ("%d bersedia (%.0f%%)" % (BERSEDIA, porsi * 100)).rjust(20))
print("  " + "target mencoba bulan pertama".ljust(34) +
      ("%.0f orang (%.0f%%)" % (mencoba, TARGET_COBA * 100)).rjust(20))
print("  " + "gelas per bulan".ljust(34) + ("%.0f" % gelas).rjust(20))
print("  " + "BEP yang dibutuhkan".ljust(34) +
      ("%.0f gelas" % bep_unit).rjust(20))
print("")
if gelas >= bep_unit:
    print("  %.0f >= %.0f -> proyeksinya MELAMPAUI titik impas"
          % (gelas, bep_unit))
    print("  dengan kelebihan %.0f gelas (%.0f%%)."
          % (gelas - bep_unit, (gelas / bep_unit - 1) * 100))
else:
    print("  %.0f < %.0f -> proyeksinya BELUM mencapai titik impas."
          % (gelas, bep_unit))
    print("  Kurang %.0f gelas (%.0f%%)."
          % (bep_unit - gelas, (1 - gelas / bep_unit) * 100))

print("")
print("  Angka kedua BISA DIBANTAH: orang boleh mempersoalkan")
print("  apakah 40 responden cukup, apakah 5 persen masuk akal,")
print("  apakah 3 kali sebulan terlalu optimistis.")
print("")
print("  Dan justru ITULAH yang membuatnya berguna. Rencana yang")
print("  tidak bisa salah juga tidak bisa memberi tahu apa-apa.")


# --------------------------------------------
# 8. Menguji asumsi yang paling rapuh
# --------------------------------------------
print("")
print("--- kalau asumsinya meleset ---")
print("  " + "skenario".ljust(30) + "gelas/bln".rjust(11) +
      "vs BEP".rjust(11) + "  hasil")
SKENARIO = [
    ("Sesuai rencana",              0.05, 3),
    ("Yang mencoba separuhnya",     0.025, 3),
    ("Beli 2x sebulan, bukan 3x",   0.05, 2),
    ("Keduanya meleset",            0.025, 2),
    ("Lebih baik dari harapan",     0.08, 3),
]
for nama, coba, beli in SKENARIO:
    g = MAHASISWA * coba * beli
    selisih = g - bep_unit
    hasil = "UNTUNG" if selisih > 0 else "RUGI"
    print("  " + nama.ljust(30) + ("%.0f" % g).rjust(11) +
          ("%+.0f" % selisih).rjust(11) + "  " + hasil)

print("")
print("  Inilah gunanya rencana bisnis yang sesungguhnya: bukan")
print("  dokumennya, melainkan MEMAKSA kamu memikirkan hal yang")
print("  ingin kamu hindari.")`
  },

  output: `--- biaya tetap (per bulan) ---
  Sewa tempat                 Rp 3.500.000
  Gaji 2 barista              Rp 5.000.000
  Listrik & air (tetap)         Rp 800.000
  Langganan internet            Rp 300.000
  Penyusutan alat               Rp 700.000
  TOTAL                      Rp 10.300.000

--- biaya variabel (per gelas) ---
  Biji kopi                       Rp 4.500
  Susu                            Rp 3.000
  Gelas & tutup                   Rp 1.200
  Gula & sirup                      Rp 800
  TOTAL                           Rp 9.500

--- marjin kontribusi & titik impas ---
  harga jual per gelas             Rp 18.000
  biaya variabel per gelas          Rp 9.500
  ------------------------------------------
  MARJIN KONTRIBUSI                 Rp 8.500   (47% dari harga)

  BEP = biaya tetap / marjin kontribusi
      = Rp 10.300.000 / Rp 8.500
      = 1212 gelas per bulan
      = 47 gelas per hari (26 hari kerja)
      = Rp 21.811.765 omzet per bulan

  Inilah angka yang seharusnya PALING DULU dihitung,
  karena ia langsung menjawab: apakah ini masuk akal
  sama sekali?

--- kenapa memasang harga terlalu murah berbahaya ---
      harga    marjin   BEP/bulan  BEP/hari  butuh berapa kali lipat
  Rp 12.000  Rp 2.500        4120       158  
  Rp 15.000  Rp 5.500        1873        72  
  Rp 18.000  Rp 8.500        1212        47   1.00x
  Rp 22.000 Rp 12.500         824        32   0.68x
  Rp 25.000 Rp 15.500         665        26   0.55x

  Harga turun dari 25 ribu ke 12 ribu = turun 52%,
  tapi marjinnya turun dari Rp 15.500 ke Rp 2.500 = turun 84%.

  Marjin turun JAUH LEBIH TAJAM daripada harganya, karena
  biaya variabelnya tidak ikut turun sama sekali.

  Dan menaikkan harga NANTI jauh lebih sulit daripada
  menurunkannya.

--- untung lawan kas: enam bulan pertama ---
  Pelanggan korporat membayar 30 hari setelah tagihan.
  Bahan dan gaji dibayar SEKARANG.

   bln       penjualan           biaya          untung       kas masuk       kas akhir
     1   Rp 20.000.000   Rp 20.855.556     -Rp 855.556            Rp 0    Rp 4.144.444
     2   Rp 30.000.000   Rp 26.133.333    Rp 3.866.667   Rp 20.000.000   -Rp 1.988.889   <-- KAS HABIS
     3   Rp 45.000.000   Rp 34.050.000   Rp 10.950.000   Rp 30.000.000   -Rp 6.038.889   <-- KAS HABIS
     4   Rp 65.000.000   Rp 44.605.556   Rp 20.394.444   Rp 45.000.000   -Rp 5.644.444   <-- KAS HABIS
     5   Rp 90.000.000   Rp 57.800.000   Rp 32.200.000   Rp 65.000.000    Rp 1.555.556
     6  Rp 120.000.000   Rp 73.633.333   Rp 46.366.667   Rp 90.000.000   Rp 17.922.222

  laba kumulatif enam bulan : Rp 112.922.222
  kas di akhir bulan keenam : Rp 17.922.222

  Usahanya UNTUNG BESAR di atas kertas dan tetap kehabisan
  uang -- karena penjualannya TUMBUH, dan tumbuh berarti
  membeli lebih banyak bahan LEBIH DULU.

  Usaha tidak mati karena rugi. Ia mati karena tidak bisa
  MEMBAYAR.

--- apa yang menolong ---
  cara                                    kas akhir     kas terendah  selamat?
  Apa adanya (tempo 30 hari)          Rp 17.922.222    -Rp 6.038.889  TIDAK
  Modal awal ditambah 40 juta         Rp 57.922.222    Rp 33.961.111  ya
  Minta 50% uang muka                 Rp 77.922.222    Rp 13.011.111  ya
  Bayar tunai (tanpa tempo)          Rp 137.922.222    Rp 24.144.444  ya

  Keuntungan enam bulan SAMA PERSIS di keempat baris:
  Rp 112.922.222. Yang berubah cuma KAPAN uangnya
  berpindah tangan.

  Kas akhir yang berbeda-beda BUKAN untung yang berbeda --
  itu cuma bagian yang SUDAH TERTAGIH sampai bulan keenam.
  Sisanya masih berupa piutang yang belum dibayar.

  Yang benar-benar menentukan hidup mati adalah kolom
  KAS TERENDAH: begitu ia menyentuh nol, usahanya berhenti
  hari itu juga -- betapa pun bagus kolom untungnya.

  Karena itu jalan keluarnya tidak ada hubungannya dengan
  menaikkan untung: persingkat tempo tagihan, minta uang
  muka, kurangi persediaan, sediakan penyangga kas, atau
  TUMBUH LEBIH PELAN.

--- apakah promosinya sepadan? ---
  cara                            biaya  pelanggan        CAC  nilai seumur  putusan
  Sebar brosur di kampus     Rp 500.000         40  Rp 12.500    Rp 153.000  LANJUT
  Iklan media sosial       Rp 2.000.000        260   Rp 7.692     Rp 68.000  LANJUT
  Diskon pembukaan 50%     Rp 3.000.000        400   Rp 7.500     Rp 17.000  hati-hati
  Endorse mahasiswa        Rp 1.500.000         55  Rp 27.273    Rp 306.000  LANJUT

  CAC = biaya promosi / jumlah pelanggan yang didapat.
  Nilai seumur hidup dihitung dari MARJIN, bukan dari
  harga jual -- kesalahan yang sangat sering terjadi.

  Patokan yang lazim: nilai seumur hidup minimal 3 kali CAC,
  supaya masih ada ruang untuk biaya tetap dan kesalahan.

--- rencana bisnis: asumsi yang BISA DIBANTAH ---

  BURUK  : 'Kami memperkirakan 500 pelanggan per bulan.'
           -> tidak bisa diperiksa, tidak bisa salah,
              jadi tidak berguna

  BAIK   : 'Ada 3.000 mahasiswa di gedung ini. Dari 40
            yang kami tanya, 12 bersedia mencoba (30%).
            Kami menargetkan 5% mencoba bulan pertama
            = 150 orang, dengan 3 kali beli per bulan.'

  dari survei 40 orang                 12 bersedia (30%)
  target mencoba bulan pertama            150 orang (5%)
  gelas per bulan                                    450
  BEP yang dibutuhkan                         1212 gelas

  450 < 1212 -> proyeksinya BELUM mencapai titik impas.
  Kurang 762 gelas (63%).

  Angka kedua BISA DIBANTAH: orang boleh mempersoalkan
  apakah 40 responden cukup, apakah 5 persen masuk akal,
  apakah 3 kali sebulan terlalu optimistis.

  Dan justru ITULAH yang membuatnya berguna. Rencana yang
  tidak bisa salah juga tidak bisa memberi tahu apa-apa.

--- kalau asumsinya meleset ---
  skenario                        gelas/bln     vs BEP  hasil
  Sesuai rencana                        450       -762  RUGI
  Yang mencoba separuhnya               225       -987  RUGI
  Beli 2x sebulan, bukan 3x             300       -912  RUGI
  Keduanya meleset                      150      -1062  RUGI
  Lebih baik dari harapan               720       -492  RUGI

  Inilah gunanya rencana bisnis yang sesungguhnya: bukan
  dokumennya, melainkan MEMAKSA kamu memikirkan hal yang
  ingin kamu hindari.`,

  kesalahanUmum: [
    {
      salah: 'Menyusun proyeksi laba rugi tanpa proyeksi arus kas.',
      kenapa: 'Usaha bisa untung besar di atas kertas dan tetap berhenti karena tidak bisa membayar gaji, sebab pelanggan membayar belakangan sementara pemasok menuntut dibayar sekarang. Yang membunuh usaha adalah kehabisan kas, bukan kerugian.',
      benar: 'Buat proyeksi kas bulanan yang mencatat kapan uang benar-benar berpindah, dan periksa apakah kas terendahnya pernah menyentuh nol.'
    },
    {
      salah: 'Memasang harga serendah mungkin agar terasa aman.',
      kenapa: 'Biaya variabel tidak ikut turun ketika harga diturunkan, sehingga marjin kontribusi menyusut jauh lebih tajam daripada harganya. Titik impasnya melonjak, dan menaikkan harga di kemudian hari jauh lebih sulit daripada menurunkannya.',
      benar: 'Hitung marjin kontribusi dan titik impas untuk beberapa tingkat harga lebih dulu, dan tetapkan harga berdasarkan nilai yang kamu berikan, bukan sekadar biaya.'
    },
    {
      salah: 'Menghitung nilai pelanggan seumur hidup dari harga jual, bukan dari marjin.',
      kenapa: 'Harga jual masih memuat biaya variabel yang harus dikeluarkan untuk melayani pelanggan itu, sehingga memakainya membesar-besarkan nilai pelanggan beberapa kali lipat. Promosi yang sebenarnya rugi jadi terlihat menguntungkan.',
      benar: 'Pakai marjin kontribusi dikali frekuensi beli dikali lama bertahan, lalu bandingkan dengan biaya mendapatkan pelanggan.'
    },
    {
      salah: 'Menaruh biaya yang sebenarnya variabel ke dalam kelompok biaya tetap, atau sebaliknya.',
      kenapa: 'Seluruh perhitungan marjin kontribusi dan titik impas bergantung pada pembedaan itu, sehingga satu kesalahan penggolongan membuat semua angka berikutnya salah. Titik impas bisa terlihat setengah dari yang sebenarnya.',
      benar: 'Uji tiap pos dengan pertanyaan sederhana: kalau bulan ini tidak menjual apa pun, apakah biaya ini tetap keluar. Kalau ya, ia tetap.'
    },
    {
      salah: 'Menulis proyeksi penjualan berupa angka bulat tanpa dasar.',
      kenapa: 'Angka seperti lima ratus pelanggan per bulan tidak bisa diperiksa dan tidak bisa dibantah, sehingga ia tidak memberi informasi apa pun kepada pembaca maupun kepada penulisnya sendiri. Rencana yang tidak bisa salah juga tidak bisa memberi tahu apa-apa.',
      benar: 'Turunkan angkanya dari asumsi yang bisa dipersoalkan satu per satu, misalnya jumlah calon pengguna dikali porsi yang mencoba dikali frekuensi beli, dan sebutkan dari mana tiap angka berasal.'
    },
    {
      salah: 'Menghitung satu skenario saja pada rencana keuangan.',
      kenapa: 'Asumsi yang paling menentukan hampir selalu meleset, dan rencana satu skenario tidak memberi tahu seberapa besar kelonggaran yang kamu punya. Kamu tidak tahu apakah meleset dua puluh persen masih aman atau sudah mematikan.',
      benar: 'Hitung sedikitnya tiga skenario dan periksa asumsi mana yang kalau meleset paling cepat membuat rencananya gagal.'
    }
  ],

  analogi: `Bayangkan kamu **menyewa perahu untuk mengantar orang menyeberang sungai**.

**Biaya tetap** adalah sewa perahunya — kamu membayarnya **entah ada penumpang atau tidak**. Sepuluh penumpang atau nol, harganya sama.

**Biaya variabel** adalah bensin per penyeberangan. Tidak menyeberang, tidak ada bensin.

**Marjin kontribusi** adalah **ongkos dikurangi bensin** — yang tersisa dari tiap penyeberangan untuk **mencicil sewa perahu**.

Dan dari situ **titik impas** menjadi jelas: berapa kali harus menyeberang sampai sewa perahunya tertutup.

Kalau sewanya sejuta sebulan dan tiap penyeberangan menyisakan sepuluh ribu, kamu butuh **seratus penyeberangan**. Kalau sungainya cuma bisa dilewati **enam puluh kali sebulan**, kamu **sudah rugi sebelum berangkat** — dan itu ketahuan tanpa membasahi kaki.

Sekarang **kenapa menurunkan ongkos itu berbahaya**.

Misalkan ongkosnya lima belas ribu dan bensin lima ribu. Marjinmu sepuluh ribu.

Kamu turunkan ongkos jadi **sepuluh ribu** — turun sepertiga, terdengar wajar.

Tetapi bensinnya **tetap lima ribu**. Marjinmu kini **lima ribu** — turun **separuh**.

Dan titik impasmu **berlipat dua**: dari seratus penyeberangan jadi dua ratus.

Ongkos turun sepertiga, kerja **naik dua kali lipat**.

Sekarang bagian yang paling sering mematikan: **untung lawan kas**.

Bayangkan sebuah sekolah menyewamu untuk mengantar murid, dan berjanji **membayar akhir bulan**.

Setiap hari kamu menyeberang, mencatat pendapatan, dan angkanya bagus. Di buku catatanmu, kamu **untung besar**.

Tetapi **bensin dibayar hari itu juga**. Sewa perahu dibayar tanggal satu.

Dan sekolahnya semakin senang, jadi bulan depan mereka minta **dua kali lebih banyak** — yang berarti kamu harus membeli **dua kali lebih banyak bensin**, masih dengan uang sendiri.

Semakin **berhasil** kamu, semakin **besar** uang yang harus kamu talangi.

Sampai suatu pagi, pemilik perahu datang menagih, dan kamu **tidak punya uang** — meski catatanmu menunjukkan keuntungan puluhan juta.

**Perahunya diambil.** Bukan karena kamu rugi, melainkan karena **kamu tidak bisa membayar hari itu**.`,

  latihan: [
    'Jelaskan perbedaan pemasaran dan penjualan, dan jelaskan kenapa urutannya penting.',
    'Sebutkan empat unsur bauran pemasaran beserta pertanyaan yang dijawab masing-masing.',
    'Jelaskan tiga dasar penentuan harga beserta kelemahan masing-masing.',
    'Golongkan pos berikut sebagai biaya tetap atau variabel: sewa kios, kemasan, gaji pegawai tetap, ongkos kirim, langganan peladen, komisi penjualan.',
    'Hitung marjin kontribusi dan titik impas untuk usaha dengan biaya tetap 6 juta per bulan, harga jual 25 ribu, dan biaya variabel 9 ribu per unit.',
    'Untuk usaha pada soal sebelumnya, hitung ulang titik impasnya kalau harga diturunkan menjadi 18 ribu, lalu jelaskan kenapa marjinnya turun lebih tajam daripada harganya.',
    'Jelaskan perbedaan untung dan kas, dan jelaskan kenapa usaha yang tumbuh pesat justru lebih rawan kehabisan kas.',
    'Sebutkan lima cara memperbaiki keadaan kas, dan jelaskan kenapa tidak satu pun berkaitan dengan menaikkan keuntungan.',
    'Hitung biaya mendapatkan pelanggan untuk promosi berbiaya 4 juta yang mendatangkan 80 pelanggan, lalu tentukan apakah sepadan bila tiap pelanggan membeli 2 kali sebulan selama 5 bulan dengan marjin 12 ribu.',
    'Tulis ulang proyeksi "kami memperkirakan 800 pelanggan per bulan" menjadi bentuk yang asumsinya bisa dibantah satu per satu.'
  ]
});


TOPICS.push({
  id: 'kwu-kepemimpinan-etika',
  judul: 'Kepemimpinan & Etika Bisnis',
  kategori: 'kwu',
  tag: ['kepemimpinan', 'delegasi', 'gaya kepemimpinan', 'etika bisnis', 'kepercayaan', 'konflik'],
  ringkas: 'Mendelegasikan memang lebih lambat — sampai tugas keempat. Kebanyakan orang menyerah di tugas ketiga.',

  fungsi: `**Bekerja lewat orang lain, dan menjaga kepercayaan yang membuat mereka mau.**

Terpakai di:

- **Tugas kelompok** — sekarang juga, bukan nanti
- **Menjalankan usaha** yang sudah lebih dari satu orang
- **Kerja di perusahaan** — memimpin tanpa jabatan tetap memimpin
- **Keputusan sulit** yang aturannya tidak jelas

Yang paling sering membuat orang tidak pernah lepas dari mengerjakan sendiri: **mendelegasikan memang lebih lambat di awal.**

Titik impasnya datang belakangan, dan kebanyakan orang menyerah tepat sebelum itu. Kesimpulan *"lebih cepat saya kerjakan sendiri"* **benar untuk hari itu** dan **salah untuk tahun itu**.

Dan untuk etika, satu hitungan yang bertahan bahkan saat alasan moral terasa jauh: **keuntungan curang bersifat sekali, kerugiannya berulang.**`,

  praktik: {
    tujuan: `Kamu bisa memilih gaya memimpin yang tepat per orang, melewati titik impas delegasi, dan punya alat uji untuk keputusan sulit.`,
    alat: [
      'Kertas',
      'Satu tim nyata — tugas kelompok pun cukup'
    ],
    langkah: [
      { judul: 'Nilai tiap anggota pada dua sumbu',
        isi: `Untuk tiap orang di timmu, nilai dua hal terpisah: seberapa **mampu**, dan seberapa **mau**.

Keduanya berbeda dan sering tertukar. Orang yang mampu tapi tidak mau butuh perlakuan yang sama sekali berbeda dari yang mau tapi belum mampu.` },
      { judul: 'Pilih gaya per orang, bukan per tim',
        isi: `- baru dan bersemangat → **mengarahkan**
- sudah mencoba dan mulai patah → **melatih**
- mampu tapi ragu → **mendukung**
- mampu dan percaya diri → **mendelegasikan**

Memakai satu gaya untuk semua orang pasti salah di sebagian besar kasus.` },
      { judul: 'Hitung titik impas delegasi sebelum memulai',
        isi: `Perkirakan tiga angka: berapa jam kalau dikerjakan sendiri, berapa jam mengajari, berapa jam memeriksa tiap kali.

- impas = jam mengajari dibagi (jam sendiri dikurangi jam memeriksa)

Tulis angkanya. Kamu akan membutuhkannya di langkah berikutnya.` },
      { judul: 'Berkomitmen melewati titik impasnya',
        isi: `Sebelum mendelegasikan, putuskan: **saya akan melewati sekian tugas sebelum menilai ulang.**

Tanpa komitmen itu, kamu akan menyerah di tugas ketiga — dan kesimpulanmu akan terasa masuk akal, karena memang benar untuk hari itu.` },
      { judul: 'Latih menangani satu konflik yang dipendam',
        isi: `Cari satu perbedaan pendapat yang selama ini dihindari di timmu.

Bahas dengan tiga langkah: pisahkan **orangnya** dari **masalahnya**, cari **kepentingan** di balik posisi masing-masing, lalu sepakati **kriteria** sebelum membahas jawabannya.` },
      { judul: 'Hitung nilai pelanggan berulang',
        isi: `Untuk satu usaha nyata, hitung: marjin per pembelian, dikali frekuensi, dikali lama bertahan, dikali satu ditambah jumlah rujukan.

Bandingkan dengan keuntungan sekali dari berlaku curang. Selisihnya biasanya berlipat-lipat.` },
      { judul: 'Pakai empat pertanyaan pada keputusan nyata',
        isi: `- **Legal** — melanggar hukum atau aturan?
- **Terbuka** — sanggup dijelaskan di depan umum?
- **Bertukar** — kalau saya di posisi mereka, saya terima?
- **Berulang** — kalau semua melakukannya, masih jalan?

Yang **kedua** paling cepat menjawab. Keputusan yang harus disembunyikan sudah menjawab dirinya sendiri.` },
      { judul: 'Periksa empat persoalan khas bidangmu',
        isi: `Untuk proyek yang sedang kamu kerjakan, periksa:

- **data pengguna** — apa yang dikumpulkan, berapa lama disimpan
- **lisensi** pustaka yang dipakai
- **lubang keamanan** yang kamu tahu dan belum dilaporkan
- **estimasi** yang kamu sanggupi padahal tahu mustahil

Yang terakhir paling sering terjadi dan paling jarang disebut sebagai persoalan etika.` }
    ],
    cek: [
      'Kamu punya penilaian mampu dan mau untuk tiap anggota, beserta gayanya',
      'Kamu tahu titik impas delegasimu dan sudah berkomitmen melewatinya',
      'Kamu sudah memeriksa keempat persoalan etika khas bidangmu pada proyek berjalan'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa curang selalu kalah dalam hitungan',

  konsep: `
Wirausaha yang berhasil hampir selalu berhenti sebagai pekerja tunggal pada suatu titik. Sejak titik itu, yang menentukan bukan lagi seberapa baik ia bekerja, melainkan **seberapa baik orang lain bekerja karenanya**.

**Memimpin bukan mengelola**

| Hal | Manajer | Pemimpin |
|---|---|---|
| Sumber kewenangan | jabatan | kepercayaan |
| Pertanyaan pokok | bagaimana | kenapa & ke mana |
| Cara menggerakkan | menugaskan | meyakinkan |
| Ukuran berhasil | rencana jalan | orang mau ikut |

Keduanya dibutuhkan, dan **bukan orang yang berbeda**. Yang membedakan: kewenangan jabatan bisa diberikan lewat satu surat keputusan; kepercayaan tidak bisa.

**Gaya yang cocok bergantung keadaan**

Tidak ada satu gaya yang benar untuk semua orang dan semua saat. Yang menentukan dua hal: seberapa **mampu** anggotanya, dan seberapa **mau**.

- **baru, semangat tinggi** → **mengarahkan** — beri tahu apa dan bagaimana
- **sudah mencoba, mulai patah** → **melatih** — arahkan sekaligus dorong semangatnya
- **mampu tetapi ragu** → **mendukung** — dampingi, jangan diambil alih
- **mampu dan percaya diri** → **mendelegasikan** — serahkan, lalu menyingkir

Memakai satu gaya untuk semua orang **pasti salah** di sebagian besar kasus. Mendelegasikan ke orang baru membuatnya tenggelam; mengarahkan orang yang sudah mahir membuatnya tersinggung dan pergi.

**Mendelegasikan terasa merugikan di awal**

Ini yang membuat banyak orang tidak pernah lepas dari mengerjakan sendiri.

Mengajari orang butuh waktu di depan. Untuk beberapa tugas pertama, mendelegasikan **memang lebih lambat** daripada mengerjakan sendiri. Titik impasnya datang belakangan.

Dan di situlah kebanyakan orang menyerah — **tepat sebelum keuntungannya mulai**. Mereka menyimpulkan *"lebih cepat saya kerjakan sendiri"*, dan kesimpulan itu **benar untuk hari itu** serta **salah untuk tahun itu**.

**Menangani konflik**

Konflik dalam tim tidak selalu buruk; yang buruk adalah konflik yang **dipendam**. Beberapa hal yang membantu:

- pisahkan **orangnya** dari **masalahnya**
- cari **kepentingan** di balik posisi, bukan menawar posisinya
- sepakati **kriteria** yang bisa diperiksa sebelum membahas jawabannya

**Etika bisnis bukan sekadar soal moral**

Etika sering diajarkan sebagai kewajiban, dan itu benar. Tetapi bagi wirausaha ada alasan kedua yang lebih dingin dan sama kuatnya: **hitungannya tidak pernah menguntungkan.**

Keuntungan dari berlaku curang bersifat **sekali**. Kerugiannya bersifat **berulang** — pelanggan yang tidak kembali, rujukan yang tidak terjadi, dan kabar buruk yang menyebar lebih cepat daripada kabar baik.

**Empat pertanyaan sebelum memutuskan**

- **Legal** — apakah ini melanggar hukum atau aturan?
- **Terbuka** — sanggupkah saya menjelaskannya di depan umum?
- **Bertukar** — kalau saya di posisi mereka, saya terima?
- **Berulang** — kalau semua orang melakukannya, masih jalan?

Pertanyaan **kedua** paling tajam dan paling cepat. Keputusan yang harus disembunyikan hampir selalu sudah menjawab dirinya sendiri, jauh sebelum aturannya sempat diperiksa.

**Yang khusus untuk bidangmu**

Sebagai orang Informatika, ada beberapa hal yang akan kamu hadapi lebih cepat daripada yang lain:

- **data pengguna** — apa yang boleh dikumpulkan, berapa lama disimpan, siapa boleh melihat
- **lisensi** — memakai pustaka tanpa mematuhi lisensinya adalah pelanggaran, bukan kelalaian teknis
- **keamanan** — mengetahui ada lubang dan diam adalah keputusan, bukan penundaan
- **estimasi** — menyanggupi jadwal yang kamu tahu mustahil adalah bentuk ketidakjujuran yang paling lazim di bidang ini

Yang terakhir itu paling sering terjadi dan paling jarang disebut sebagai persoalan etika.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# NILAI SATU PELANGGAN: SEKALI vs BERULANG\n#\n# Marjin per pembelian  : Rp 20.000\n# Beli 12x setahun, bertahan 3 tahun, merujuk 2 orang\n#\n# curang sekali          : Rp    50.000\n# jujur (pelanggan saja) : Rp   720.000\n# jujur + rujukannya     : Rp 2.160.000\n#\n# Curang menghasilkan 2% dari yang didapat dengan jujur.\n#\n# Dan itu belum menghitung kabar buruknya. Cerita baik\n# dan cerita buruk sama-sama BERLIPAT, tetapi yang\n# buruk berlipat lebih cepat.',
      penjelasan: `
Etika biasanya dibela dengan alasan moral, dan alasan itu sah. Tetapi ada alasan kedua yang lebih dingin, dan justru alasan kedua ini yang bertahan ketika seseorang sedang tergoda: **hitungannya tidak pernah menguntungkan.**

Sebabnya terletak pada satu perbedaan yang mudah dilewatkan: **keuntungan curang bersifat sekali, kerugiannya bersifat berulang.**

Ambil satu pelanggan. Ia membeli dua belas kali setahun dengan marjin dua puluh ribu, dan bertahan tiga tahun. Nilainya **tujuh ratus dua puluh ribu**.

Ia juga merujuk dua orang, dan mereka berperilaku serupa. Nilai sesungguhnya menjadi **dua juta seratus enam puluh ribu**.

Sekarang bandingkan dengan mengambil seluruh uangnya sekali lalu tidak mengirim barangnya: **lima puluh ribu**.

Dua persen. Dan itu belum menghitung apa pun yang terjadi setelahnya.

Sekarang bagian yang membuatnya jauh lebih buruk lagi.

Cerita menyebar secara **berlipat**, bukan bertambah. Satu orang bercerita ke beberapa orang, dan tiap orang itu bercerita lagi. Baik maupun buruk, keduanya berlipat.

Tetapi keduanya berlipat dengan **laju yang berbeda**. Orang jauh lebih terdorong menceritakan pengalaman buruk daripada pengalaman biasa-biasa saja yang berjalan sesuai harapan. Layanan yang baik dianggap **seharusnya**; layanan yang buruk adalah **cerita**.

Setelah beberapa putaran, selisihnya bukan sedikit — ia berlipat ganda berkali-kali.

Dan sekarang persoalan yang lebih dalam, yang tidak muncul dari perhitungan mana pun.

Andai kamu memilih curang. Sekarang kamu harus **mengingat** kepada siapa kamu berkata apa. Kamu harus menghindari mempertemukan dua pelanggan yang menerima janji berbeda. Kamu harus menyaring apa yang boleh dibicarakan karyawanmu di luar.

Semua itu **memakan perhatian** — sumber daya yang paling langka bagi wirausaha, dan yang seharusnya dipakai untuk membangun.

Kejujuran punya keuntungan yang jarang disebut: ia **tidak menuntut ingatan**. Kamu bisa mengatakan hal yang sama ke semua orang tanpa memeriksa apa pun lebih dulu.

Terakhir, satu keberatan yang jujur perlu diakui.

Semua hitungan di atas mengandaikan pelanggan yang **berulang** dan komunitas yang **saling bicara**. Ada usaha yang tidak begitu — pedagang di jalur wisata yang pembelinya lewat sekali seumur hidup, misalnya. Di situ hitungan sempitnya bisa saja mendukung yang sebaliknya.

Dan justru di situlah alasan moral menjadi penting, karena ia **tidak bergantung pada hitungannya**. Yang menarik: usaha yang membuat pilihan itu hampir selalu tetap kecil dan tetap di tempatnya — karena ia tidak pernah punya pelanggan yang kembali untuk membuatnya tumbuh.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Kepemimpinan & etika bisnis
# ============================================

# --------------------------------------------
# 1. Memimpin bukan mengelola
# --------------------------------------------
print("--- manajer dan pemimpin ---")
BEDA = [
    ("Sumber kewenangan", "jabatan",        "kepercayaan"),
    ("Pertanyaan pokok",  "bagaimana",      "kenapa & ke mana"),
    ("Cara menggerakkan", "menugaskan",     "meyakinkan"),
    ("Ukuran berhasil",   "rencana jalan",  "orang mau ikut"),
]
print("  " + "hal".ljust(20) + "manajer".ljust(16) + "pemimpin")
for hal, m, p in BEDA:
    print("  " + hal.ljust(20) + m.ljust(16) + p)
print("")
print("  Keduanya dibutuhkan, dan bukan orang yang berbeda.")
print("  Yang membedakan: kewenangan jabatan bisa diberikan")
print("  dalam satu surat keputusan; kepercayaan tidak.")

# --------------------------------------------
# 2. Gaya memimpin bergantung keadaan
# --------------------------------------------
print("")
print("--- gaya yang cocok bergantung pada anggotanya ---")
ANGGOTA = [
    ("baru, semangat tinggi",   "rendah", "tinggi", "mengarahkan"),
    ("sudah coba, mulai patah", "sedang", "rendah", "melatih"),
    ("mampu, ragu-ragu",        "tinggi", "sedang", "mendukung"),
    ("mampu & percaya diri",    "tinggi", "tinggi", "mendelegasikan"),
]
print("  " + "keadaan anggota".ljust(26) + "mampu".ljust(8)
      + "mau".ljust(8) + "gaya")
for keadaan, mampu, mau, gaya in ANGGOTA:
    print("  " + keadaan.ljust(26) + mampu.ljust(8) + mau.ljust(8) + gaya)
print("")
print("  Memakai satu gaya untuk semua orang pasti salah di")
print("  sebagian besar kasus. Mendelegasikan ke orang baru")
print("  membuatnya tenggelam; mengarahkan orang mahir")
print("  membuatnya tersinggung dan pergi.")

# --------------------------------------------
# 3. Kenapa mendelegasikan terasa merugikan di awal
# --------------------------------------------
print("")
print("--- mengerjakan sendiri vs mendelegasikan ---")
sendiri_per_tugas = 2.0        # jam
ajar = 6.0                     # jam sekali di depan
periksa = 0.5                  # jam per tugas setelah diajari

print("  " + "tugas ke-".rjust(10) + "sendiri".rjust(11)
      + "delegasi".rjust(11) + "selisih".rjust(10))
total_s = 0.0
total_d = ajar
impas = None
for n in range(1, 21):
    total_s += sendiri_per_tugas
    total_d += periksa
    if impas is None and total_d <= total_s:
        impas = n
    if n in (1, 2, 4, 6, 8, 12, 20):
        print("  " + str(n).rjust(10) + ("%.1f j" % total_s).rjust(11)
              + ("%.1f j" % total_d).rjust(11)
              + ("%+.1f j" % (total_s - total_d)).rjust(10))
print("")
print("  Impas di tugas ke-" + str(impas) + ". Sebelum titik itu,")
print("  mendelegasikan memang LEBIH LAMBAT, dan di situlah")
print("  kebanyakan orang menyerah lalu kembali mengerjakan")
print("  sendiri -- tepat sebelum keuntungannya mulai.")
print("  Setelah 20 tugas, selisihnya "
      + ("%.0f jam" % (total_s - total_d)) + ".")

# --------------------------------------------
# 4. Etika bisnis: sekali untung, lalu berhenti
# --------------------------------------------
print("")
print("--- curang sekali, lalu apa? ---")
harga = 50_000
marjin = 20_000
beli_per_tahun = 12
tahun_bertahan = 3
rujukan = 2

nilai_jujur = marjin * beli_per_tahun * tahun_bertahan
nilai_dengan_rujukan = nilai_jujur * (1 + rujukan)
untung_curang = harga            # ambil seluruh uangnya, tidak kirim

print("  satu pelanggan, marjin Rp "
      + f"{marjin:,}".replace(",", ".") + " per pembelian")
print("  beli " + str(beli_per_tahun) + "x setahun, bertahan "
      + str(tahun_bertahan) + " tahun, merujuk "
      + str(rujukan) + " orang")
print("")
print("  " + "pilihan".ljust(24) + "hasil".rjust(16))
print("  " + "curang sekali".ljust(24)
      + ("Rp " + f"{untung_curang:,}".replace(",", ".")).rjust(16))
print("  " + "jujur (pelanggan saja)".ljust(24)
      + ("Rp " + f"{nilai_jujur:,}".replace(",", ".")).rjust(16))
print("  " + "jujur + rujukannya".ljust(24)
      + ("Rp " + f"{nilai_dengan_rujukan:,}".replace(",", ".")).rjust(16))
print("")
print("  Curang menghasilkan "
      + ("%.0f%%" % (untung_curang / nilai_dengan_rujukan * 100))
      + " dari yang didapat dengan jujur.")
print("  Dan itu belum menghitung kabar buruk yang menyebar.")

# --------------------------------------------
# 5. Kabar buruk menyebar lebih cepat
# --------------------------------------------
print("")
print("--- satu pelanggan kecewa memberi tahu berapa orang ---")
print("  " + "putaran".rjust(8) + "cerita baik".rjust(14)
      + "cerita buruk".rjust(15))
baik, buruk = 1, 1
for putaran in range(1, 6):
    baik *= 2          # cerita baik: tiap orang cerita ke 2
    buruk *= 5         # cerita buruk: tiap orang cerita ke 5
    print("  " + str(putaran).rjust(8) + str(baik).rjust(14)
          + str(buruk).rjust(15))
print("")
print("  Angka 2 dan 5 itu andaian, bukan hasil pengukuran.")
print("  Yang nyata perbandingannya: keduanya sama-sama")
print("  BERLIPAT, dan yang buruk berlipat lebih cepat.")
print("  Karena itu satu keputusan curang tidak berhenti")
print("  pada satu pelanggan.")

# --------------------------------------------
# 6. Uji sederhana sebelum memutuskan
# --------------------------------------------
print("")
print("--- empat pertanyaan sebelum memutuskan ---")
UJI = [
    ("Legal",       "apakah ini melanggar hukum atau aturan?"),
    ("Terbuka",     "sanggupkah saya menjelaskannya di depan umum?"),
    ("Bertukar",    "kalau saya di posisi mereka, saya terima?"),
    ("Berulang",    "kalau semua orang melakukannya, masih jalan?"),
]
for nama, tanya in UJI:
    print("  " + nama.ljust(11) + tanya)
print("")
print("  Pertanyaan kedua paling tajam. Keputusan yang harus")
print("  disembunyikan hampir selalu sudah menjawab dirinya")
print("  sendiri, jauh sebelum aturannya diperiksa.")` },
  output: `--- manajer dan pemimpin ---
  hal                 manajer         pemimpin
  Sumber kewenangan   jabatan         kepercayaan
  Pertanyaan pokok    bagaimana       kenapa & ke mana
  Cara menggerakkan   menugaskan      meyakinkan
  Ukuran berhasil     rencana jalan   orang mau ikut

  Keduanya dibutuhkan, dan bukan orang yang berbeda.
  Yang membedakan: kewenangan jabatan bisa diberikan
  dalam satu surat keputusan; kepercayaan tidak.

--- gaya yang cocok bergantung pada anggotanya ---
  keadaan anggota           mampu   mau     gaya
  baru, semangat tinggi     rendah  tinggi  mengarahkan
  sudah coba, mulai patah   sedang  rendah  melatih
  mampu, ragu-ragu          tinggi  sedang  mendukung
  mampu & percaya diri      tinggi  tinggi  mendelegasikan

  Memakai satu gaya untuk semua orang pasti salah di
  sebagian besar kasus. Mendelegasikan ke orang baru
  membuatnya tenggelam; mengarahkan orang mahir
  membuatnya tersinggung dan pergi.

--- mengerjakan sendiri vs mendelegasikan ---
   tugas ke-    sendiri   delegasi   selisih
           1      2.0 j      6.5 j    -4.5 j
           2      4.0 j      7.0 j    -3.0 j
           4      8.0 j      8.0 j    +0.0 j
           6     12.0 j      9.0 j    +3.0 j
           8     16.0 j     10.0 j    +6.0 j
          12     24.0 j     12.0 j   +12.0 j
          20     40.0 j     16.0 j   +24.0 j

  Impas di tugas ke-4. Sebelum titik itu,
  mendelegasikan memang LEBIH LAMBAT, dan di situlah
  kebanyakan orang menyerah lalu kembali mengerjakan
  sendiri -- tepat sebelum keuntungannya mulai.
  Setelah 20 tugas, selisihnya 24 jam.

--- curang sekali, lalu apa? ---
  satu pelanggan, marjin Rp 20.000 per pembelian
  beli 12x setahun, bertahan 3 tahun, merujuk 2 orang

  pilihan                            hasil
  curang sekali                  Rp 50.000
  jujur (pelanggan saja)        Rp 720.000
  jujur + rujukannya          Rp 2.160.000

  Curang menghasilkan 2% dari yang didapat dengan jujur.
  Dan itu belum menghitung kabar buruk yang menyebar.

--- satu pelanggan kecewa memberi tahu berapa orang ---
   putaran   cerita baik   cerita buruk
         1             2              5
         2             4             25
         3             8            125
         4            16            625
         5            32           3125

  Angka 2 dan 5 itu andaian, bukan hasil pengukuran.
  Yang nyata perbandingannya: keduanya sama-sama
  BERLIPAT, dan yang buruk berlipat lebih cepat.
  Karena itu satu keputusan curang tidak berhenti
  pada satu pelanggan.

--- empat pertanyaan sebelum memutuskan ---
  Legal      apakah ini melanggar hukum atau aturan?
  Terbuka    sanggupkah saya menjelaskannya di depan umum?
  Bertukar   kalau saya di posisi mereka, saya terima?
  Berulang   kalau semua orang melakukannya, masih jalan?

  Pertanyaan kedua paling tajam. Keputusan yang harus
  disembunyikan hampir selalu sudah menjawab dirinya
  sendiri, jauh sebelum aturannya diperiksa.`,

  kesalahanUmum: [
    {
      salah: 'Memakai satu gaya kepemimpinan untuk semua anggota tim.',
      kenapa: 'Gaya yang cocok ditentukan oleh seberapa mampu dan seberapa mau tiap orang, dan keduanya berbeda-beda. Mendelegasikan ke orang baru membuatnya tenggelam, sementara mengarahkan orang yang sudah mahir membuatnya tersinggung dan pergi.',
      benar: 'Nilai kemampuan dan kemauan tiap anggota secara terpisah, lalu pilih gaya untuk orang itu, bukan untuk tim secara keseluruhan.'
    },
    {
      salah: 'Kembali mengerjakan sendiri karena mendelegasikan terasa lebih lambat.',
      kenapa: 'Mengajari butuh waktu di depan, sehingga untuk beberapa tugas pertama mendelegasikan memang lebih lambat. Kesimpulan bahwa lebih cepat dikerjakan sendiri benar untuk hari itu dan salah untuk tahun itu, dan orang yang menyerah biasanya berhenti tepat sebelum titik impasnya.',
      benar: 'Hitung titik impasnya lebih dulu, lalu berkomitmen melewati jumlah tugas itu sebelum menilai ulang.'
    },
    {
      salah: 'Menghindari konflik dalam tim demi menjaga suasana.',
      kenapa: 'Konflik yang dipendam tidak hilang melainkan berpindah menjadi kerja yang melambat dan orang yang berhenti bicara. Yang berbahaya bukan adanya perbedaan pendapat, melainkan perbedaan yang tidak pernah dibahas.',
      benar: 'Pisahkan orangnya dari masalahnya, cari kepentingan di balik posisi masing-masing, dan sepakati kriteria sebelum membahas jawabannya.'
    },
    {
      salah: 'Membela etika hanya dengan alasan moral saat berhadapan dengan orang yang sedang tergoda.',
      kenapa: 'Alasan moral sah tetapi mudah ditunda ketika tekanannya besar. Hitungan nilai pelanggan menunjukkan keuntungan curang bersifat sekali sementara kerugiannya berulang, dan angka itu bertahan justru pada saat alasan moral terasa jauh.',
      benar: 'Sampaikan keduanya: hitung nilai pelanggan berulang beserta rujukannya, lalu sebutkan alasan moralnya sebagai dasar yang tidak bergantung pada hitungan.'
    },
    {
      salah: 'Menyanggupi jadwal yang sudah diketahui mustahil demi memenangkan proyek.',
      kenapa: 'Ini bentuk ketidakjujuran yang paling lazim di bidang perangkat lunak dan paling jarang disebut sebagai persoalan etika. Akibatnya bukan cuma keterlambatan, melainkan mutu yang diam-diam dikorbankan dan kepercayaan yang habis di proyek berikutnya.',
      benar: 'Sampaikan estimasi yang kamu percayai beserta asumsinya, lalu tawarkan pengurangan lingkup sebagai jalan mencapai tanggal yang diminta.'
    },
    {
      salah: 'Mengumpulkan data pengguna sebanyak mungkin karena mungkin berguna nanti.',
      kenapa: 'Data yang disimpan adalah data yang bisa bocor, dan tanggung jawabnya melekat sejak ia dikumpulkan, bukan sejak ia dipakai. Kepercayaan pengguna yang hilang karena kebocoran jauh lebih mahal daripada nilai data yang belum tentu terpakai.',
      benar: 'Kumpulkan hanya yang dibutuhkan sekarang, tetapkan berapa lama disimpan, dan hapus setelahnya.'
    }
  ],

  analogi: `Bayangkan **warung makan di dekat kampus**.

Suatu hari kehabisan ayam. Pemiliknya punya dua pilihan.

**Pilihan pertama**: pakai ayam kemarin, tidak usah bilang. Hari ini untung penuh — katakan lima puluh ribu dari sepuluh porsi.

**Pilihan kedua**: bilang apa adanya, tawarkan menu lain, atau kasih tahu besok saja.

Hitung pilihan pertama sampai selesai.

Sepuluh mahasiswa makan ayam kemarin. Mungkin tidak ada yang sakit. Tapi rasanya beda, dan mereka **tahu**.

Sepuluh orang itu tidak kembali. Tiap orang makan tiga kali seminggu selama empat tahun kuliah. Itu bukan sepuluh porsi yang hilang — itu **ribuan porsi**.

Dan mereka bercerita. Di kos, di grup angkatan, di kelas. Cerita buruk berjalan lebih cepat daripada cerita baik, karena tidak ada yang bercerita tentang ayam yang biasa-biasa saja.

Untung hari itu: lima puluh ribu.

Sekarang bagian yang tidak muncul di hitungan mana pun.

Pemilik yang memilih pilihan pertama sekarang harus **ingat** hari apa ia memakai ayam kemarin. Ia harus waspada kalau ada yang bertanya. Ia harus memastikan pegawainya tidak keceplosan.

Pemilik yang memilih pilihan kedua **tidak perlu mengingat apa pun**. Ia bisa mengatakan hal yang sama kepada siapa saja, kapan saja.

Itu bukan kebaikan hati. **Itu kepala yang kosong untuk memikirkan hal lain** — dan bagi orang yang sedang membangun usaha, itu barang yang paling mahal.`,

  latihan: [
    'Jelaskan beda manajer dan pemimpin pada empat hal, lalu jelaskan kenapa kepercayaan tidak bisa diberikan lewat surat keputusan.',
    'Sebutkan empat gaya kepemimpinan beserta keadaan anggota yang cocok untuk masing-masing.',
    'Ambil tiga orang yang pernah bekerja denganmu, nilai kemampuan dan kemauannya, lalu tentukan gaya yang cocok untuk tiap orang.',
    'Hitung titik impas mendelegasikan untuk tugas yang butuh 3 jam bila dikerjakan sendiri, dengan 8 jam mengajari dan 1 jam memeriksa per tugas.',
    'Jelaskan kenapa kebanyakan orang menyerah mendelegasikan tepat sebelum titik impasnya.',
    'Sebutkan tiga cara menangani konflik dalam tim, dan jelaskan kenapa konflik yang dipendam lebih berbahaya.',
    'Hitung nilai satu pelanggan berulang beserta rujukannya untuk satu usaha nyata di sekitarmu, lalu bandingkan dengan keuntungan sekali dari berlaku curang.',
    'Jelaskan kenapa cerita buruk menyebar lebih cepat daripada cerita baik, dan apa akibatnya bagi satu keputusan curang.',
    'Sebutkan empat pertanyaan uji etika, lalu terapkan pada satu keputusan nyata yang pernah kamu ragukan.',
    'Sebutkan empat persoalan etika yang khusus dihadapi orang Informatika, dan jelaskan kenapa menyanggupi jadwal yang mustahil termasuk di dalamnya.'
  ]
});
