/* ============================================================
   mobile.js — materi Pemrograman Mobile (Semester 5)

   ============================================================
   CATATAN KEJUJURAN — HARAP DIBACA
   ============================================================
   Berkas materi untuk mata kuliah ini BELUM ADA di komputer ini
   (folder "Semester Lima/Pemrograman Mobile" masih kosong).
   Yang dipakai sebagai kerangka adalah rencana pembelajaran yang
   Hafizh tuliskan sendiri:

     Pertemuan 1-8  : Native Android dengan Kotlin & Jetpack Compose
       UI deklaratif, Layouts & Modifiers, Material Design 3,
       State Management, Lazy Layouts, Networking (REST API),
       arsitektur (ViewModel & Data Layer), Navigation Compose
     Pertemuan 9-16 : Cross-platform dengan Flutter & Dart
       bahasa Dart, Widget (Stateless & Stateful), Layouting,
       State Management, Networking, strategi deployment

   Isinya disusun dari pengetahuan umum tentang Compose dan
   Flutter, BUKAN dari slide dosen. Karena itu:
     - istilah dan urutan pembahasan mungkin berbeda dari kelas
     - angka versi pustaka sengaja tidak disebut, karena cepat basi
     - COCOKKAN LAGI dengan slide begitu materinya keluar

   Kotlin dan Dart TIDAK terpasang di komputer ini, jadi kode
   keduanya tidak bisa dijalankan untuk membuktikan keluarannya.
   Karena itu tiap topik menyertakan blok Python yang MEMODELKAN
   mekanismenya -- dan blok Python itulah yang benar-benar
   dijalankan untuk mengisi bagian Output.
   ============================================================ */

TOPICS.push({
  id: 'mobile-compose-dasar',
  judul: 'UI Deklaratif dengan Compose',
  kategori: 'mobile',
  tag: ['Kotlin', 'Jetpack Compose', 'deklaratif', 'Composable', 'Modifier', 'Material 3'],
  ringkas: 'Berhenti memerintahkan perubahan tampilan, dan mulai menyatakan tampilan seharusnya seperti apa.',

  fungsi: `**Membangun antarmuka Android dengan menyatakan tampilan, bukan memerintahkan perubahannya.**

Terpakai di:

- **Membuat aplikasi Android** — Compose sudah jadi cara yang dianjurkan Google
- **Tugas mata kuliah** pertemuan 1 sampai 8
- **Menghindari bug tampilan tidak sesuai data** — jenis bug yang mustahil muncul di sini
- **Membuat purwarupa cepat** — Preview memperbarui seketika

Yang paling perlu dipahami: **composable boleh dijalankan ulang kapan saja dan sesering apa pun.**

Karena itu ia harus bebas efek samping. Panggilan jaringan di dalam composable bisa terkirim puluhan kali untuk satu ketikan pengguna.

Dan **urutan modifier berpengaruh** — yang ditulis lebih awal berada lebih luar.`,

  praktik: {
    tujuan: `Kamu punya satu layar Compose yang rapi, memakai Material 3, dan bisa dilihat lewat Preview tanpa menjalankan aplikasi.`,
    alat: [
      'Android Studio versi terbaru',
      'Emulator atau perangkat Android'
    ],
    langkah: [
      { judul: 'Buat proyek dengan templat Compose',
        isi: `Di Android Studio: **New Project** lalu pilih **Empty Activity** yang sudah memakai Compose.

Jalankan sekali untuk memastikan lingkunganmu siap sebelum menulis apa pun.` },
      { judul: 'Pakai Preview sejak awal',
        isi: `Tambahkan \`@Preview(showBackground = true)\` pada composable-mu.

Panel di sebelah kanan memperbarui **seketika** saat kode diubah. Memasang ulang aplikasi untuk memeriksa satu perubahan jarak bisa makan puluhan detik.

Buat beberapa Preview untuk keadaan berbeda: data kosong, data panjang, dan mode gelap.` },
      { judul: 'Susun dengan Column, Row, dan Box',
        isi: `Ketiganya cukup untuk hampir semua tata letak, dan bisa disarangkan sedalam apa pun tanpa hukuman kinerja seperti pada sistem lama.

Latih dengan membuat kartu berisi judul, keterangan, dan satu baris berisi label di kiri dan nilai di kanan.` },
      { judul: 'Buktikan urutan modifier berpengaruh',
        isi: `Buat dua Text dengan modifier yang sama tetapi urutan berbeda:

- \`padding\` lalu \`background\` — warnanya **tidak** mencakup jaraknya
- \`background\` lalu \`padding\` — warnanya **mencakup** jaraknya

Lihat keduanya di Preview berdampingan. Perbedaannya langsung terlihat.` },
      { judul: 'Pakai Material 3 dan dynamic color',
        isi: `Pakai \`MaterialTheme.colorScheme\` dan \`MaterialTheme.typography\`, jangan menulis warna langsung.

Dengan begitu aplikasimu ikut berubah saat mode gelap dinyalakan, dan bisa mengikuti warna wallpaper pengguna.

Uji dengan menyalakan mode gelap di emulator.` },
      { judul: 'Jaga composable bebas efek samping',
        isi: `Jangan memanggil jaringan, menulis berkas, atau mengubah variabel luar di dalam composable.

Untuk efek samping, pakai \`LaunchedEffect\` atau taruh di ViewModel.

Kalau kamu ragu, tanyakan: *"apakah ini boleh terjadi dua puluh kali?"* Kalau tidak, ia tidak boleh ada di dalam composable.` },
      { judul: 'Beri nama seperti kelas',
        isi: `Nama composable ditulis dengan huruf besar di awal: \`KartuMahasiswa\`, bukan \`tampilkanKartu\`.

Ia menggambarkan **sesuatu**, bukan **melakukan sesuatu** — dan penamaan yang tepat membuat pembaca langsung tahu mana yang memancarkan UI.` }
    ],
    cek: [
      'Preview-mu memperbarui seketika saat kode diubah',
      'Kedua urutan modifier memberi tampilan yang jelas berbeda di Preview',
      'Aplikasimu ikut berubah saat mode gelap dinyalakan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa tidak ada setText',

  konsep: `
Selama puluhan tahun, membangun antarmuka Android dilakukan secara **imperatif**: kamu menemukan komponennya lewat \`findViewById\`, lalu **menyuruhnya berubah** lewat \`setText\`, \`setVisibility\`, dan sejenisnya.

Dengan **Jetpack Compose**, cara itu diganti sepenuhnya. Kamu **tidak menyuruh apa pun berubah**. Kamu **menyatakan** tampilan seharusnya seperti apa **untuk keadaan tertentu**, lalu membiarkan kerangka kerjanya menghitung sendiri apa yang perlu diubah.

**Imperatif vs deklaratif**

- **Imperatif** — *"cari TextView itu, lalu ganti teksnya jadi X"*
- **Deklaratif** — *"kalau keadaannya begini, teksnya adalah X"*

Bedanya bukan gaya penulisan. Yang berubah adalah **siapa yang bertanggung jawab menjaga tampilan tetap sesuai data**.

Pada cara imperatif, **kamu** yang bertanggung jawab. Setiap kali data berubah, **kamu harus ingat** memperbarui setiap bagian tampilan yang bergantung padanya. Kalau ada satu yang lupa, tampilannya **tidak sesuai** dengan datanya — dan itu jenis bug yang paling melelahkan, karena tidak ada yang salah pada logikanya.

Pada cara deklaratif, **kerangka kerjanya** yang bertanggung jawab. Lupa memperbarui **menjadi mustahil**, karena tidak ada langkah "memperbarui" untuk dilupakan.

**Composable**

Fungsi yang ditandai \`@Composable\` menggambarkan **sepotong antarmuka**.

Sifat-sifatnya yang harus dipahami:

- **Tidak mengembalikan nilai** — ia **memancarkan** UI, bukan menghasilkan objek
- **Boleh dipanggil berkali-kali**, dan **urutannya tidak dijamin**
- **Harus bebas efek samping** — tidak boleh mengubah variabel di luar, menulis berkas, atau memanggil jaringan
- Namanya ditulis dengan **huruf besar di awal**, seperti kelas — karena ia menggambarkan **sesuatu**, bukan **melakukan sesuatu**

Syarat "bebas efek samping" itu **bukan anjuran gaya**. Compose boleh menjalankan ulang fungsimu **kapan saja dan sesering apa pun**; kalau ia punya efek samping, efek itu terjadi berkali-kali tanpa bisa diramalkan.

**Recomposition**

Ketika keadaan berubah, Compose **menjalankan ulang** composable yang membaca keadaan itu, lalu **membandingkan** hasilnya dengan yang sudah tergambar, dan **hanya mengubah bagian yang berbeda**.

Dua hal penting yang sering disalahpahami:

- Yang dijalankan ulang **hanya composable yang membaca keadaan itu**, bukan seluruh layar
- Compose boleh **melewati** composable yang parameternya tidak berubah — disebut *skipping*

**Modifier**

Semua pengaturan tampilan — ukuran, jarak, latar, sudut, klik — diberikan lewat **rantai \`Modifier\`**, bukan lewat atribut khusus tiap komponen.

**Urutannya berpengaruh**, dan ini sumber kebingungan yang paling lazim:

- \`padding(16.dp).background(Merah)\` → jarak dulu, **latar hanya mengisi bagian dalam**
- \`background(Merah).padding(16.dp)\` → latar dulu, **latar mencakup jarak itu juga**

Cara mengingatnya: modifier bekerja **berurutan dari luar ke dalam**. Yang ditulis lebih awal berada **lebih luar**.

**Tata letak dasar**

- **\`Column\`** — menyusun ke bawah
- **\`Row\`** — menyusun ke samping
- **\`Box\`** — menumpuk di atas satu sama lain

Ketiganya **cukup untuk hampir semua tata letak**, dan bisa disarangkan sedalam apa pun tanpa hukuman kinerja seperti pada \`LinearLayout\` bersarang di sistem lama.

**Material Design 3**

Kumpulan komponen siap pakai — \`Button\`, \`Card\`, \`TextField\`, \`Scaffold\` — beserta sistem **warna, tipografi, dan bentuk** yang saling terkait.

Keunggulan pentingnya adalah **dynamic color**: palet aplikasi bisa mengikuti warna wallpaper pengguna, sehingga aplikasinya terasa menyatu dengan peranti.

**Preview**

Anotasi \`@Preview\` membuat composable bisa dilihat **langsung di Android Studio tanpa menjalankan aplikasi di perangkat**.

Ini menghemat waktu jauh lebih banyak daripada yang terlihat: memasang ulang aplikasi untuk memeriksa satu perubahan jarak bisa memakan puluhan detik; preview memperbaruinya **seketika**.
`,

  logicSyntax: [
    {
      bahasa: 'kotlin',
      kode: '// KENAPA TIDAK ADA setText()\n//\n// CARA LAMA (imperatif) -- KAMU yang bertanggung jawab:\n//   val label = findViewById<TextView>(R.id.label)\n//   label.text = "Halo"\n//   // setiap data berubah, kamu HARUS INGAT memanggil ini\n//   // lupa satu -> tampilan tidak sesuai data\n\n// CARA COMPOSE (deklaratif) -- KERANGKA KERJA yang bertanggung jawab:\n@Composable\nfun Salam(nama: String) {\n    Text(text = "Halo, $nama")\n}\n// Tidak ada setText. Tidak ada findViewById.\n// Kamu menyatakan HUBUNGAN antara nama dan teks;\n// Compose yang menjaga hubungan itu tetap benar.\n//\n// Lupa memperbarui jadi MUSTAHIL, karena tidak ada\n// langkah "memperbarui" untuk dilupakan.',
      penjelasan: `
Perbedaan ini terlihat sekadar gaya penulisan sampai kamu memikirkan **jenis bug apa yang masing-masing mungkinkan**.

Pada cara imperatif, ada satu jenis kesalahan yang **selalu mungkin terjadi**: **tampilan tidak sesuai dengan data**.

Bayangkan layar profil dengan nama pengguna muncul di **tiga tempat** — judul, sapaan, dan kartu ringkasan. Ketika nama diubah, kamu harus memanggil tiga pembaruan.

Lupa satu, dan sekarang layarmu menunjukkan **dua nama berbeda pada saat yang sama**.

Dan inilah yang membuatnya melelahkan: **tidak ada yang salah pada logikanya**. Data di memori benar. Fungsi penyimpanan benar. Yang salah cuma **satu panggilan yang tidak ditulis** — dan tidak ada compiler yang bisa memberitahumu.

Pada Compose, bug jenis itu **tidak punya tempat untuk muncul**. Kamu tidak menulis tiga pembaruan; kamu menulis **tiga kali pembacaan data yang sama**. Ketika datanya berubah, ketiganya ikut, karena ketiganya **memang menggambarkan data itu**.

Sekarang perhatikan apa yang **dibayar** untuk itu.

Compose harus **menjalankan ulang fungsimu** setiap kali keadaan berubah — bisa puluhan kali per detik saat pengguna menggulir atau mengetik.

Dan di situlah dua aturan yang tadinya terasa sewenang-wenang menjadi **konsekuensi yang wajar**:

**Pertama, composable harus bebas efek samping.** Kalau fungsimu menambah penghitung atau mengirim permintaan jaringan setiap kali dipanggil, maka satu ketikan pengguna bisa mengirim **dua puluh permintaan**. Compose tidak menjanjikan berapa kali ia memanggilmu — jadi apa pun yang **tidak boleh terjadi dua kali** tidak boleh berada di dalam composable.

**Kedua, urutan pemanggilan tidak dijamin.** Compose boleh menjalankan composable secara paralel atau melewati yang parameternya tidak berubah. Kode yang bergantung pada *"yang ini dipanggil sebelum yang itu"* akan rusak secara acak.

Jadi aturan-aturan itu bukan pembatasan yang dibuat-buat. Semuanya **harga dari jaminan bahwa tampilan selalu sesuai data** — dan bagi hampir semua aplikasi, itu harga yang sangat murah.
`
    }
  ],

  kode: {
    kotlin: String.raw`// ============================================
// Dasar Jetpack Compose
//
// CATATAN: Kotlin tidak terpasang di komputer ini,
// jadi kode ini TIDAK dijalankan untuk membuktikan
// keluarannya. Blok Output di bawah berasal dari
// versi Python di tab sebelah, yang memodelkan
// mekanisme recomposition dan benar-benar dijalankan.
// Kode Kotlin ini untuk dijalankan di Android Studio.
// ============================================

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.tooling.preview.Preview

// --------------------------------------------
// 1. Composable paling sederhana
// --------------------------------------------
@Composable
fun Salam(nama: String) {
    // Tidak mengembalikan nilai -- ia MEMANCARKAN UI.
    Text(text = "Halo, $nama")
}

// --------------------------------------------
// 2. Tata letak: Column, Row, Box
// --------------------------------------------
@Composable
fun KartuMahasiswa(nama: String, nim: String, ipk: Double) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)          // jarak DI LUAR kartu
    ) {
        Column(
            modifier = Modifier.padding(16.dp)   // jarak DI DALAM kartu
        ) {
            Text(
                text = nama,
                style = MaterialTheme.typography.titleLarge
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = nim,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(12.dp))

            // Row menyusun ke samping
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text = "IPK")
                Text(
                    text = String.format("%.2f", ipk),
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
    }
}

// --------------------------------------------
// 3. URUTAN MODIFIER BERPENGARUH
// --------------------------------------------
@Composable
fun ContohUrutanModifier() {
    Column {
        // padding DULU, lalu background:
        // warnanya hanya mengisi bagian DALAM
        Text(
            text = "padding lalu background",
            modifier = Modifier
                .padding(16.dp)
                .background(Color(0xFFDDE1FF))
        )

        Spacer(modifier = Modifier.height(8.dp))

        // background DULU, lalu padding:
        // warnanya MENCAKUP jarak itu juga
        Text(
            text = "background lalu padding",
            modifier = Modifier
                .background(Color(0xFFDDE1FF))
                .padding(16.dp)
        )
    }
}
// Cara mengingatnya: modifier bekerja BERURUTAN DARI LUAR
// KE DALAM. Yang ditulis lebih awal berada lebih LUAR.

// --------------------------------------------
// 4. Box: menumpuk
// --------------------------------------------
@Composable
fun LencanaNotifikasi(jumlah: Int) {
    Box {
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = "Notifikasi"
        )
        if (jumlah > 0) {
            Badge(
                modifier = Modifier.align(Alignment.TopEnd)
            ) {
                Text(text = if (jumlah > 99) "99+" else "$jumlah")
            }
        }
    }
}

// --------------------------------------------
// 5. Preview: lihat tanpa menjalankan aplikasi
// --------------------------------------------
@Preview(showBackground = true)
@Composable
fun PratinjauKartu() {
    MaterialTheme {
        KartuMahasiswa(
            nama = "Hafizh Naufal Raditya",
            nim = "H1D024061",
            ipk = 3.67
        )
    }
}

// Preview memperbarui SEKETIKA saat kode diubah.
// Memasang ulang aplikasi untuk memeriksa satu perubahan
// jarak bisa makan puluhan detik; preview tidak.`,

    python: String.raw`# ============================================
# MODEL mekanisme Compose, ditulis dengan Python
#
# Kotlin tidak terpasang di komputer ini, jadi kode
# Compose di tab sebelah tidak bisa dijalankan.
# Berkas ini MENIRUKAN cara kerjanya supaya
# mekanismenya bisa dilihat dan dibuktikan.
# ============================================


# --------------------------------------------
# 1. Cara lama (imperatif): KAMU yang memperbarui
# --------------------------------------------
class LayarImperatif:
    """Tiap bagian tampilan disimpan sendiri-sendiri,
       dan harus diperbarui satu per satu."""

    def __init__(self, nama):
        self.data_nama = nama
        self.judul = "Profil " + nama       # salinan 1
        self.sapaan = "Halo, " + nama       # salinan 2
        self.kartu = "Pemilik: " + nama     # salinan 3

    def ganti_nama_lengkap(self, baru):
        self.data_nama = baru
        self.judul = "Profil " + baru
        self.sapaan = "Halo, " + baru
        self.kartu = "Pemilik: " + baru     # ingat ketiganya!

    def ganti_nama_lupa_satu(self, baru):
        self.data_nama = baru
        self.judul = "Profil " + baru
        self.sapaan = "Halo, " + baru
        # LUPA memperbarui self.kartu

    def tampilkan(self):
        return [self.judul, self.sapaan, self.kartu]


print("--- cara imperatif ---")
layar = LayarImperatif("Hafizh")
print("  awal          : " + " | ".join(layar.tampilkan()))
layar.ganti_nama_lengkap("Nadia")
print("  diganti benar : " + " | ".join(layar.tampilkan()))

layar2 = LayarImperatif("Hafizh")
layar2.ganti_nama_lupa_satu("Nadia")
print("  LUPA satu     : " + " | ".join(layar2.tampilkan()))
print("")
print("  Layar menunjukkan DUA NAMA BERBEDA sekaligus.")
print("  Dan tidak ada yang salah pada logikanya -- datanya")
print("  benar, fungsinya benar. Yang salah cuma satu baris")
print("  yang TIDAK DITULIS, dan tidak ada compiler yang bisa")
print("  memberitahumu.")


# --------------------------------------------
# 2. Cara deklaratif: tampilan DIHITUNG dari data
# --------------------------------------------
class LayarDeklaratif:
    """Tidak ada salinan. Tampilan selalu dihitung dari data."""

    def __init__(self, nama):
        self.nama = nama                     # SATU sumber kebenaran

    def tampilkan(self):
        return ["Profil " + self.nama,
                "Halo, " + self.nama,
                "Pemilik: " + self.nama]


print("")
print("--- cara deklaratif ---")
d = LayarDeklaratif("Hafizh")
print("  awal          : " + " | ".join(d.tampilkan()))
d.nama = "Nadia"                             # cukup ubah datanya
print("  ganti data    : " + " | ".join(d.tampilkan()))
print("")
print("  Tidak ada langkah 'memperbarui tampilan', jadi tidak")
print("  ada yang bisa dilupakan. Bug 'tampilan tidak sesuai")
print("  data' TIDAK PUNYA TEMPAT untuk muncul.")


# --------------------------------------------
# 3. Recomposition: hanya yang membaca yang dijalankan ulang
# --------------------------------------------
class Compose:
    """Model sangat sederhana dari mesin recomposition."""

    def __init__(self):
        self.keadaan = {}
        self.pembaca = {}     # keadaan -> composable yang membacanya
        self.jumlah_jalan = {}

    def state(self, nama, nilai):
        self.keadaan[nama] = nilai
        self.pembaca.setdefault(nama, set())

    def composable(self, nama, baca, gambar):
        """baca  = daftar keadaan yang dibaca composable ini
           gambar = fungsi yang menghasilkan tampilannya"""
        for k in baca:
            self.pembaca.setdefault(k, set()).add(nama)
        self.jumlah_jalan[nama] = 0
        setattr(self, "_g_" + nama, gambar)

    def jalankan(self, nama):
        self.jumlah_jalan[nama] += 1
        return getattr(self, "_g_" + nama)(self.keadaan)

    def ubah(self, nama_keadaan, nilai_baru):
        """Mengubah keadaan -> recomposition composable pembacanya SAJA."""
        if self.keadaan.get(nama_keadaan) == nilai_baru:
            return []                       # nilai sama -> tidak ada apa-apa
        self.keadaan[nama_keadaan] = nilai_baru
        terpengaruh = sorted(self.pembaca.get(nama_keadaan, set()))
        for c in terpengaruh:
            self.jalankan(c)
        return terpengaruh


c = Compose()
c.state("nama", "Hafizh")
c.state("jumlah_notif", 3)
c.state("tema_gelap", False)

c.composable("Judul",     ["nama"],
             lambda s: "Profil " + s["nama"])
c.composable("Sapaan",    ["nama"],
             lambda s: "Halo, " + s["nama"])
c.composable("Lencana",   ["jumlah_notif"],
             lambda s: "(" + str(s["jumlah_notif"]) + ")")
c.composable("TombolTema",["tema_gelap"],
             lambda s: "gelap" if s["tema_gelap"] else "terang")

# gambar pertama: semua dijalankan
for nama in ["Judul", "Sapaan", "Lencana", "TombolTema"]:
    c.jalankan(nama)

print("")
print("--- recomposition: siapa yang dijalankan ulang? ---")
print("  " + "perubahan".ljust(30) + "yang dijalankan ulang")
for keadaan, nilai in [("nama", "Nadia"),
                       ("jumlah_notif", 7),
                       ("jumlah_notif", 7),      # nilai SAMA
                       ("tema_gelap", True)]:
    kena = c.ubah(keadaan, nilai)
    ket = ", ".join(kena) if kena else "(tidak ada -- nilainya sama)"
    print("  " + ("%s -> %s" % (keadaan, nilai)).ljust(30) + ket)

print("")
print("  " + "composable".ljust(14) + "berapa kali dijalankan")
for nama, n in sorted(c.jumlah_jalan.items()):
    print("  " + nama.ljust(14) + str(n))

print("")
print("  Yang dijalankan ulang HANYA composable yang MEMBACA")
print("  keadaan itu -- bukan seluruh layar.")
print("")
print("  Dan kalau nilainya diubah menjadi nilai yang SAMA,")
print("  tidak ada apa pun yang dijalankan ulang. Itulah")
print("  'skipping' yang membuat Compose tetap cepat.")


# --------------------------------------------
# 4. Kenapa composable harus bebas efek samping
# --------------------------------------------
print("")
print("--- kenapa efek samping dilarang di dalam composable ---")

permintaan_jaringan = {"jumlah": 0}

def composable_buruk(s):
    permintaan_jaringan["jumlah"] += 1       # EFEK SAMPING!
    return "data untuk " + s["nama"]

c2 = Compose()
c2.state("nama", "Hafizh")
c2.state("ketikan", "")
c2.composable("LayarBuruk", ["nama", "ketikan"], composable_buruk)
c2.jalankan("LayarBuruk")

print("  pengguna mengetik 'Purwokerto' huruf demi huruf...")
for i in range(1, len("Purwokerto") + 1):
    c2.ubah("ketikan", "Purwokerto"[:i])

print("  permintaan jaringan terkirim: %d kali"
      % permintaan_jaringan["jumlah"])
print("")
print("  Sepuluh ketikan -> sebelas permintaan jaringan.")
print("  Compose TIDAK MENJANJIKAN berapa kali ia memanggil")
print("  composable-mu, jadi apa pun yang tidak boleh terjadi")
print("  dua kali TIDAK BOLEH ada di dalamnya.")


# --------------------------------------------
# 5. Urutan modifier berpengaruh
# --------------------------------------------
print("")
print("--- kenapa urutan modifier berpengaruh ---")

def terapkan(rantai, tersedia=18):
    """Modifier diterapkan dari LUAR ke dalam.
       padding MENGURANGI lebar yang tersisa untuk lapisan
       di dalamnya; background mewarnai lebar yang tersisa
       PADA SAAT ia dipasang."""
    lebar = tersedia
    lapis = []
    lebar_background = None
    for nama, nilai in rantai:
        if nama == "padding":
            lapis.append("padding(%d) pada lebar %d" % (nilai, lebar))
            lebar -= nilai * 2
        elif nama == "background":
            lebar_background = lebar
            lapis.append("background(%s) selebar %d" % (nilai, lebar))
    lapis.append("ISI selebar %d" % lebar)
    return lebar_background, lapis


print("  ruang yang tersedia: 18 satuan")
print("")
for judul, rantai in [
    ("padding(4) lalu background",  [("padding", 4), ("background", "biru")]),
    ("background lalu padding(4)",  [("background", "biru"), ("padding", 4)]),
]:
    lebar_bg, lapis = terapkan(rantai)
    print("  " + judul)
    print("      dari LUAR ke dalam: " + " -> ".join(lapis))
    print("      lebar yang BERWARNA: %d dari 18" % lebar_bg)
    print("")

print("  Urutan pertama: padding berada lebih LUAR, jadi warnanya")
print("  hanya mengisi 10 dari 18 -- ia TIDAK mencakup jaraknya.")
print("")
print("  Urutan kedua: background berada lebih LUAR, jadi warnanya")
print("  mengisi penuh 18 -- jaraknya IKUT berwarna, dan isinya")
print("  yang bergeser ke dalam.")
print("")
print("  Cara mengingat: yang ditulis lebih AWAL berada lebih LUAR.")`
  },

  output: `--- cara imperatif ---
  awal          : Profil Hafizh | Halo, Hafizh | Pemilik: Hafizh
  diganti benar : Profil Nadia | Halo, Nadia | Pemilik: Nadia
  LUPA satu     : Profil Nadia | Halo, Nadia | Pemilik: Hafizh

  Layar menunjukkan DUA NAMA BERBEDA sekaligus.
  Dan tidak ada yang salah pada logikanya -- datanya
  benar, fungsinya benar. Yang salah cuma satu baris
  yang TIDAK DITULIS, dan tidak ada compiler yang bisa
  memberitahumu.

--- cara deklaratif ---
  awal          : Profil Hafizh | Halo, Hafizh | Pemilik: Hafizh
  ganti data    : Profil Nadia | Halo, Nadia | Pemilik: Nadia

  Tidak ada langkah 'memperbarui tampilan', jadi tidak
  ada yang bisa dilupakan. Bug 'tampilan tidak sesuai
  data' TIDAK PUNYA TEMPAT untuk muncul.

--- recomposition: siapa yang dijalankan ulang? ---
  perubahan                     yang dijalankan ulang
  nama -> Nadia                 Judul, Sapaan
  jumlah_notif -> 7             Lencana
  jumlah_notif -> 7             (tidak ada -- nilainya sama)
  tema_gelap -> True            TombolTema

  composable    berapa kali dijalankan
  Judul         2
  Lencana       2
  Sapaan        2
  TombolTema    2

  Yang dijalankan ulang HANYA composable yang MEMBACA
  keadaan itu -- bukan seluruh layar.

  Dan kalau nilainya diubah menjadi nilai yang SAMA,
  tidak ada apa pun yang dijalankan ulang. Itulah
  'skipping' yang membuat Compose tetap cepat.

--- kenapa efek samping dilarang di dalam composable ---
  pengguna mengetik 'Purwokerto' huruf demi huruf...
  permintaan jaringan terkirim: 11 kali

  Sepuluh ketikan -> sebelas permintaan jaringan.
  Compose TIDAK MENJANJIKAN berapa kali ia memanggil
  composable-mu, jadi apa pun yang tidak boleh terjadi
  dua kali TIDAK BOLEH ada di dalamnya.

--- kenapa urutan modifier berpengaruh ---
  ruang yang tersedia: 18 satuan

  padding(4) lalu background
      dari LUAR ke dalam: padding(4) pada lebar 18 -> background(biru) selebar 10 -> ISI selebar 10
      lebar yang BERWARNA: 10 dari 18

  background lalu padding(4)
      dari LUAR ke dalam: background(biru) selebar 18 -> padding(4) pada lebar 18 -> ISI selebar 10
      lebar yang BERWARNA: 18 dari 18

  Urutan pertama: padding berada lebih LUAR, jadi warnanya
  hanya mengisi 10 dari 18 -- ia TIDAK mencakup jaraknya.

  Urutan kedua: background berada lebih LUAR, jadi warnanya
  mengisi penuh 18 -- jaraknya IKUT berwarna, dan isinya
  yang bergeser ke dalam.

  Cara mengingat: yang ditulis lebih AWAL berada lebih LUAR.`,

  kesalahanUmum: [
    {
      salah: 'Memanggil jaringan, menulis berkas, atau mengubah variabel luar di dalam fungsi composable.',
      kenapa: 'Compose boleh menjalankan ulang composable kapan saja dan sesering apa pun, dan ia tidak menjanjikan berapa kali. Efek samping di dalamnya jadi terjadi berulang tanpa bisa diramalkan, sehingga sepuluh ketikan pengguna bisa mengirim belasan permintaan jaringan.',
      benar: 'Taruh efek samping di tempat yang disediakan seperti LaunchedEffect atau di lapisan ViewModel, dan biarkan composable murni menggambarkan tampilan.'
    },
    {
      salah: 'Mengira urutan modifier tidak berpengaruh selama semua modifier yang dibutuhkan ada.',
      kenapa: 'Modifier bekerja berurutan dari luar ke dalam, sehingga padding sebelum background membuat warna mengisi bagian dalam saja, sedangkan background sebelum padding membuat warna mencakup jarak itu juga. Hasilnya terlihat sangat berbeda meski kodenya hampir sama.',
      benar: 'Baca rantai modifier sebagai lapisan dari luar ke dalam, dan ingat bahwa yang ditulis lebih awal berada lebih luar.'
    },
    {
      salah: 'Menganggap perubahan satu keadaan menjalankan ulang seluruh layar.',
      kenapa: 'Compose hanya menjalankan ulang composable yang benar-benar membaca keadaan itu, dan bahkan melewati composable yang parameternya tidak berubah. Anggapan sebaliknya membuat orang mengoptimalkan hal yang tidak perlu, atau takut memecah UI menjadi banyak composable kecil.',
      benar: 'Pecah UI menjadi composable kecil yang masing-masing membaca sesedikit mungkin keadaan, karena itu justru mempersempit cakupan recomposition.'
    },
    {
      salah: 'Menyimpan salinan data di beberapa tempat lalu memperbaruinya satu per satu.',
      kenapa: 'Itu membawa kembali kesalahan khas cara imperatif, yaitu tampilan tidak sesuai data ketika ada satu pembaruan yang terlewat. Kesalahan semacam itu tidak bisa ditangkap compiler karena logikanya sendiri benar.',
      benar: 'Simpan satu sumber kebenaran dan biarkan setiap bagian tampilan membacanya langsung, sehingga tidak ada salinan yang bisa tertinggal.'
    },
    {
      salah: 'Menamai fungsi composable dengan huruf kecil di awal seperti fungsi biasa.',
      kenapa: 'Kebiasaan di Compose adalah menamainya dengan huruf besar di awal karena ia menggambarkan sesuatu, bukan melakukan sesuatu. Penamaan yang salah membuat pembaca sulit membedakan mana yang memancarkan UI dan mana yang menghitung nilai.',
      benar: 'Tulis nama composable seperti nama kelas, misalnya KartuMahasiswa dan bukan tampilkanKartuMahasiswa.'
    }
  ],

  analogi: `Bayangkan kamu mengatur **papan pengumuman jadwal kuliah** di lobi jurusan.

**Cara imperatif** adalah papan yang ditulis dengan spidol. Ketika jadwal berubah, kamu **berjalan ke papan itu dan menghapus baris yang berubah**, lalu menulis ulang.

Cara ini bekerja. Tetapi perhatikan apa yang menjadi tanggung jawabmu: **kamu harus ingat**.

Dan ketika nama dosen yang sama muncul di **tiga baris berbeda**, kamu harus ingat menghapus **ketiganya**.

Lupa satu, dan papan itu kini mengumumkan **dua hal yang bertentangan** pada saat yang sama. Mahasiswa yang membacanya tidak tahu mana yang benar.

Yang paling menjengkelkan: **tidak ada yang bisa memperingatkanmu**. Papannya tidak rusak. Spidolnya tidak rusak. Kamu cuma **tidak berjalan ke sana** untuk satu baris.

**Cara deklaratif** adalah papan yang **terhubung ke basis data jadwal**, dan menampilkan isinya.

Kamu tidak lagi menulis di papan. Kamu **mengubah datanya**, dan papan itu menggambar ulang dirinya.

Sekarang **mustahil** papan menunjukkan dua nama dosen berbeda — karena ketiga baris itu **membaca kolom yang sama**. Tidak ada salinan yang bisa tertinggal.

Sekarang perhatikan **harga** yang dibayar, karena ini yang menjelaskan aturan-aturannya.

Papan itu harus **menggambar ulang dirinya** setiap kali data berubah — mungkin puluhan kali sehari.

Jadi bayangkan kalau proses menggambar ulang itu **mengirim SMS ke seluruh mahasiswa**. Satu perubahan kecil, dan ratusan orang menerima pesan.

Itulah kenapa **efek samping dilarang di dalam composable**. Menggambar boleh dilakukan berkali-kali; **mengirim SMS tidak**.

Terakhir, **urutan modifier**.

Bayangkan membungkus kado. Kalau kamu **memberi bantalan busa dulu**, lalu membungkus dengan kertas kado, maka **kertasnya menutupi busa** — bungkusannya jadi besar.

Kalau kamu **membungkus kertas kado dulu**, lalu memberi bantalan busa di luarnya, maka **busanya yang terlihat**.

Bahan yang sama. Urutan berbeda. **Hasil yang sama sekali berbeda.**

Dan yang kamu pasang **lebih dulu** berakhir berada **lebih dalam**.`,

  latihan: [
    'Jelaskan perbedaan antarmuka imperatif dan deklaratif, dan sebutkan jenis bug yang hanya mungkin terjadi pada yang pertama.',
    'Sebutkan empat sifat fungsi composable, dan jelaskan kenapa bebas efek samping bukan sekadar anjuran gaya.',
    'Jelaskan apa itu recomposition, dan jelaskan kenapa memecah UI menjadi banyak composable kecil justru menguntungkan.',
    'Jelaskan kenapa urutan modifier berpengaruh, lalu ramalkan tampilan dari padding lalu background dibanding sebaliknya.',
    'Sebutkan tiga tata letak dasar Compose beserta cara menyusunnya masing-masing.',
    'Tulis composable bernama KartuBuku yang menampilkan judul, penulis, dan tahun terbit dalam sebuah Card.',
    'Jelaskan apa gunanya anotasi Preview dan kenapa ia menghemat waktu lebih banyak daripada yang terlihat.'
  ]
});

TOPICS.push({
  id: 'mobile-state',
  judul: 'State, Hoisting & ViewModel',
  kategori: 'mobile',
  tag: ['state', 'remember', 'state hoisting', 'ViewModel', 'unidirectional', 'LazyColumn'],
  ringkas: 'Di mana keadaan disimpan menentukan komponen mana yang bisa dipakai ulang — dan mana yang tidak.',

  fungsi: `**Menentukan di mana keadaan disimpan — dan itu menentukan komponen mana yang bisa dipakai ulang.**

Terpakai di:

- **Membuat komponen yang bisa dipakai ulang** di banyak layar
- **Menjaga data saat layar diputar** — masalah klasik Android
- **Daftar panjang** — LazyColumn dan pentingnya key yang stabil
- **Memanggil API** — dari ViewModel, bukan dari UI

Kaidah yang paling menentukan: **naikkan keadaan ke pemanggil**.

Komponen yang menyimpan keadaannya sendiri tidak bisa diberi nilai awal, tidak bisa dikendalikan dari luar, dan tidak bisa diuji tanpa menjalankan seluruh antarmuka. Ia bekerja, tetapi buntu.

Dan satu hal yang sering merusak diam-diam: **items tanpa key** membuat keadaan seperti "sudah dicentang" berpindah ke butir yang salah saat ada penyisipan.`,

  praktik: {
    tujuan: `Kamu punya layar dengan daftar panjang yang mulus, keadaan yang bertahan saat layar diputar, dan komponen yang bisa dipakai ulang.`,
    alat: [
      'Android Studio',
      'Emulator'
    ],
    langkah: [
      { judul: 'Buktikan perlunya remember',
        isi: `Buat penghitung dengan \`mutableStateOf\` **tanpa** \`remember\`.

Tekan tombolnya — angkanya tidak pernah bertambah, karena nilainya dibuat ulang tiap recomposition.

Tambahkan \`remember\` dan coba lagi. Melihat kegagalannya lebih dulu membuat perbaikannya masuk akal.` },
      { judul: 'Buktikan perlunya rememberSaveable',
        isi: `Dengan \`remember\` saja, putar layar emulator. Angkanya **kembali ke nol**.

Ganti dengan \`rememberSaveable\` dan putar lagi. Sekarang bertahan.

Ini masalah Android yang paling sering ditemui pemula.` },
      { judul: 'Naikkan keadaannya',
        isi: `Ubah komponenmu menjadi stateless: terima **nilai** sebagai parameter dan **fungsi peristiwa** sebagai parameter.

Sekarang pemanggilnya bisa memberi nilai awal, mengendalikannya, dan mengujinya tanpa menjalankan UI.

Naikkan hanya sampai leluhur bersama terendah dari yang membutuhkannya — lebih tinggi berarti parameter numpang lewat.` },
      { judul: 'Pindahkan keadaan layar ke ViewModel',
        isi: `Buat ViewModel dengan \`StateFlow\`, lalu kumpulkan di UI dengan \`collectAsStateWithLifecycle\`.

Aturan yang tidak boleh dilanggar: **ViewModel tidak boleh mengenal Context atau View**. Kalau ia mengenalnya, ia tidak bisa diuji tanpa perangkat dan bisa menahan Activity yang sudah mati.` },
      { judul: 'Pakai LazyColumn dengan key stabil',
        isi: `Untuk daftar panjang, \`LazyColumn\` hanya menyusun butir yang terlihat.

Sertakan \`key = { it.id }\` pada \`items\`.

Buktikan pentingnya: sisipkan butir baru di paling depan tanpa key, dan perhatikan keadaan centang berpindah ke butir yang salah.` },
      { judul: 'Gambarkan keadaan layar sebagai satu tipe tertutup',
        isi: `Alih-alih tiga variabel terpisah untuk memuat, data, dan galat, buat satu \`sealed interface\` dengan tiga kemungkinan.

Tiga variabel memberi delapan kombinasi dan hanya tiga yang berarti. Satu tipe tertutup membuat keadaan mustahil **tidak bisa diwakili**.` },
      { judul: 'Panggil jaringan dari ViewModel',
        isi: `Pakai \`viewModelScope.launch\` dan tangani ketiga keadaannya: sedang memuat, berhasil, gagal.

Uji dengan mematikan jaringan emulator. Aplikasimu harus menampilkan pesan yang jelas, bukan layar kosong atau berhenti.` }
    ],
    cek: [
      'Penghitungmu bertahan saat layar diputar',
      'Komponenmu bisa dipratinjau dalam beberapa keadaan berbeda tanpa dijalankan',
      'Aplikasimu menampilkan pesan jelas saat jaringan dimatikan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa keadaan dinaikkan',

  konsep: `
Pada UI deklaratif, **keadaan** (*state*) adalah satu-satunya hal yang bisa berubah. Tampilan cuma **akibat**.

Karena itu pertanyaan terpenting dalam merancang layar Compose bukan *"komponennya apa saja?"*, melainkan **"keadaan apa yang ada, dan siapa yang memilikinya?"**

**Keadaan di dalam composable**

Composable dijalankan ulang berkali-kali. Variabel biasa **akan hilang** setiap kali itu terjadi.

Karena itu keadaan harus **diingat** melewati recomposition:

- \`remember { }\` — nilainya bertahan melewati recomposition
- \`mutableStateOf()\` — perubahan nilainya **memicu** recomposition
- \`rememberSaveable { }\` — juga bertahan melewati **perubahan konfigurasi**, misalnya layar diputar

Ketiganya menjawab pertanyaan berbeda, dan sering tertukar:

- \`remember\` saja → bertahan saat recomposition, **hilang saat layar diputar**
- \`mutableStateOf\` saja → memicu recomposition, tetapi **direset tiap kali dijalankan ulang**

Keduanya hampir selalu dipakai **bersama**.

**State hoisting**

Gagasan terpentingnya: **naikkan keadaan ke pemanggil**.

Sebuah composable menjadi **stateless** ketika ia tidak menyimpan keadaannya sendiri, melainkan menerima:

- **nilai** sebagai parameter — apa yang harus ditampilkan
- **fungsi peristiwa** sebagai parameter — apa yang harus dipanggil saat pengguna berbuat sesuatu

Pola ini disebut **value down, events up**.

**Kenapa ini penting** — dan ini yang membedakan komponen yang bisa dipakai ulang dari yang tidak:

Composable yang menyimpan keadaannya sendiri **hanya bisa dipakai satu cara**. Ia tidak bisa dikendalikan dari luar, tidak bisa diberi nilai awal yang berbeda, dan **tidak bisa diuji tanpa menjalankan seluruh UI**.

Composable stateless bisa **dipakai ulang di mana saja**, karena pemanggilnya yang menentukan perilakunya.

**Aliran data satu arah**

Akibat langsung dari hoisting: data mengalir **turun**, peristiwa mengalir **naik**.

Tidak ada komponen yang mengubah keadaan milik komponen lain. Ketika terjadi bug, kamu **selalu tahu ke mana harus melihat**: ke pemilik keadaannya.

Bandingkan dengan sistem dua arah, di mana keadaan bisa diubah dari mana saja — di situ melacak *"siapa yang mengubah nilai ini?"* bisa memakan berjam-jam.

**ViewModel**

Keadaan yang harus **bertahan lebih lama daripada layar** ditaruh di \`ViewModel\`.

Ia bertahan melewati **perubahan konfigurasi** — layar diputar, bahasa diganti, mode gelap dinyalakan — karena ia **tidak dimiliki Activity**, melainkan dimiliki cakupan yang lebih panjang umurnya.

Pembagian tanggung jawab yang lazim:

- **UI (composable)** — menggambar, dan meneruskan peristiwa
- **ViewModel** — menyimpan keadaan layar dan logika penyajian
- **Repository** — memutuskan data diambil dari jaringan atau simpanan lokal
- **Data source** — benar-benar mengambilnya

**Aturan yang tidak boleh dilanggar**: ViewModel **tidak boleh** mengenal komponen Android seperti \`Context\` atau \`View\`. Kalau ia mengenalnya, ia **tidak bisa diuji tanpa perangkat** — dan itu membatalkan sebagian besar gunanya.

**Lazy layouts**

\`Column\` biasa **menyusun semua anaknya sekaligus**, termasuk yang berada di luar layar. Untuk seribu butir, itu berarti seribu komponen dibuat padahal cuma sepuluh yang terlihat.

\`LazyColumn\` dan \`LazyRow\` hanya menyusun **yang terlihat**, dan **memakai ulang** komponen saat digulir.

Bedanya bukan soal kerapian — ia soal apakah aplikasinya **bisa dipakai sama sekali** pada daftar panjang.

**Kunci pada daftar**

Saat memakai \`items()\`, sertakan \`key\` yang **stabil dan unik**:

- Tanpa \`key\`, Compose mengenali butir berdasarkan **posisinya**
- Dengan \`key\`, ia mengenali berdasarkan **identitasnya**

Bedanya terasa saat butir **disisipkan di tengah** atau **dihapus**: tanpa key, seluruh butir setelahnya dianggap berubah dan digambar ulang — dan keadaan seperti "sudah dicentang" bisa **berpindah ke butir yang salah**.

**Networking**

Panggilan jaringan **tidak boleh** dilakukan di dalam composable. Ia ditempatkan di ViewModel, dijalankan dalam **coroutine**, dan hasilnya diserahkan sebagai keadaan.

Keadaan layar biasanya digambarkan sebagai **satu tipe tertutup**: sedang memuat, berhasil dengan data, atau gagal dengan pesan.

Menyimpannya sebagai **satu nilai** — bukan tiga variabel terpisah — membuat keadaan mustahil seperti *"sedang memuat DAN gagal sekaligus"* **tidak bisa diwakili sama sekali**.
`,

  logicSyntax: [
    {
      bahasa: 'kotlin',
      kode: '// STATE HOISTING: kenapa keadaan dinaikkan ke pemanggil\n//\n// SEBELUM -- menyimpan keadaannya sendiri:\n@Composable\nfun KotakCentang() {\n    var dicentang by remember { mutableStateOf(false) }\n    Checkbox(\n        checked = dicentang,\n        onCheckedChange = { dicentang = it }\n    )\n}\n// Masalahnya: pemanggil TIDAK BISA apa-apa.\n//   - tidak bisa memberi nilai awal\n//   - tidak bisa tahu nilainya sekarang\n//   - tidak bisa mengubahnya dari luar\n//   - tidak bisa diuji tanpa menjalankan UI\n\n// SESUDAH -- stateless, keadaan dinaikkan:\n@Composable\nfun KotakCentang(\n    dicentang: Boolean,              // NILAI turun\n    onUbah: (Boolean) -> Unit        // PERISTIWA naik\n) {\n    Checkbox(checked = dicentang, onCheckedChange = onUbah)\n}\n// Sekarang pemanggil yang menentukan. Komponen yang sama\n// bisa dipakai untuk seratus keperluan berbeda.',
      penjelasan: `
State hoisting terlihat seperti menambah pekerjaan — kamu memindahkan sesuatu keluar, lalu harus meneruskannya masuk lagi. Tetapi yang didapat jauh lebih besar daripada yang dikorbankan.

Mulai dari pertanyaan sederhana: **apa yang bisa dilakukan pemanggil** terhadap versi pertama?

Jawabannya: **tidak ada.** Ia bisa menampilkannya, dan itu saja.

Ia tidak bisa menentukan nilai awalnya. Tidak bisa mengetahui nilainya sekarang. Tidak bisa mengubahnya — misalnya untuk tombol *"pilih semua"*. Tidak bisa menyimpannya. Tidak bisa mengujinya tanpa menjalankan seluruh antarmuka.

Komponen itu **bekerja**, tetapi ia **buntu**.

Sekarang perhatikan apa yang terjadi ketika keadaannya dinaikkan. Komponennya menjadi **fungsi murni dari parameternya** — beri nilai yang sama, dapat tampilan yang sama, selalu.

Dan dari situ semuanya mengikuti:

- **Bisa diuji** — panggil dengan \`true\`, periksa hasilnya. Tidak perlu perangkat.
- **Bisa dipakai ulang** — satu komponen melayani daftar tugas, formulir persetujuan, dan pengaturan.
- **Bisa dikendalikan** — tombol "pilih semua" tinggal mengubah keadaan di pemilik.
- **Bisa dipratinjau** dalam berbagai keadaan sekaligus, tanpa mengklik apa pun.

Sekarang bagian yang lebih dalam, dan ini yang membuat hoisting **bukan sekadar trik**.

Ketika setiap komponen stateless, maka pada setiap saat **hanya ada satu tempat** yang menyimpan kebenaran untuk sebuah nilai. Data mengalir **turun** dari sana; peristiwa mengalir **naik** ke sana.

Akibatnya, pertanyaan **"kenapa nilai ini salah?"** selalu punya jawaban yang bisa dilacak: **lihat pemiliknya**. Tidak ada kemungkinan komponen lain diam-diam mengubahnya, karena tidak ada komponen lain yang **memilikinya**.

Bandingkan dengan keadaan yang tersebar di sepuluh komponen, masing-masing bisa mengubah miliknya sendiri dan saling memberi tahu. Di situ pertanyaan yang sama bisa memakan berjam-jam.

Ada satu kaidah praktis untuk memutuskan **seberapa tinggi** keadaan harus dinaikkan: **naikkan sampai ke leluhur bersama terendah dari semua composable yang membutuhkannya.**

Lebih rendah dari itu, ada yang tidak bisa mengaksesnya. Lebih tinggi dari itu, kamu meneruskan parameter melewati komponen yang **tidak peduli** — dan itu membuat komponen perantara ikut berubah setiap kali nilainya berubah.
`
    }
  ],

  kode: {
    kotlin: String.raw`// ============================================
// State, hoisting, ViewModel, dan Lazy layouts
//
// CATATAN: Kotlin tidak terpasang di komputer ini,
// jadi kode ini tidak dijalankan. Blok Output berasal
// dari versi Python di tab sebelah, yang memodelkan
// mekanismenya dan benar-benar dijalankan.
// ============================================

// --------------------------------------------
// 1. remember + mutableStateOf
// --------------------------------------------
@Composable
fun Penghitung() {
    // remember       -> nilainya bertahan melewati recomposition
    // mutableStateOf -> perubahannya MEMICU recomposition
    var jumlah by remember { mutableStateOf(0) }

    Column {
        Text(text = "Jumlah: $jumlah")
        Button(onClick = { jumlah++ }) {
            Text(text = "Tambah")
        }
    }
}

// Kalau 'remember' dihapus: nilai kembali 0 tiap recomposition.
// Kalau 'mutableStateOf' diganti nilai biasa: nilainya berubah
// tapi UI TIDAK pernah tahu, jadi tampilannya tidak diperbarui.
// Keduanya hampir selalu dipakai BERSAMA.

// --------------------------------------------
// 2. rememberSaveable: bertahan saat layar diputar
// --------------------------------------------
@Composable
fun PenghitungAman() {
    var jumlah by rememberSaveable { mutableStateOf(0) }
    Text(text = "Jumlah: $jumlah")
}

// --------------------------------------------
// 3. STATE HOISTING
// --------------------------------------------

// Stateless: menerima nilai, memancarkan peristiwa
@Composable
fun BarisTugas(
    judul: String,
    selesai: Boolean,                 // NILAI turun
    onUbah: (Boolean) -> Unit         // PERISTIWA naik
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = selesai, onCheckedChange = onUbah)
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = judul,
            textDecoration = if (selesai) TextDecoration.LineThrough
                             else TextDecoration.None
        )
    }
}

// Pemilik keadaan
@Composable
fun DaftarTugas(viewModel: TugasViewModel = viewModel()) {
    val keadaan by viewModel.keadaan.collectAsStateWithLifecycle()

    when (val k = keadaan) {
        is KeadaanTugas.Memuat -> CircularProgressIndicator()
        // Catatan: sengaja ditulis dengan penggabungan, bukan
        // interpolasi bertanda dolar-kurung-kurawal. Berkas materi
        // ini disimpan di dalam String.raw JavaScript, dan
        // String.raw TETAP memproses interpolasi semacam itu --
        // ia hanya menonaktifkan escape sequence.
        is KeadaanTugas.Gagal  -> Text(text = "Gagal: " + k.pesan)
        is KeadaanTugas.Berhasil -> {
            LazyColumn {
                items(
                    items = k.daftar,
                    key = { tugas -> tugas.id }   // KUNCI STABIL
                ) { tugas ->
                    BarisTugas(
                        judul = tugas.judul,
                        selesai = tugas.selesai,
                        onUbah = { viewModel.ubahSelesai(tugas.id, it) }
                    )
                }
            }
        }
    }
}

// --------------------------------------------
// 4. Keadaan layar sebagai SATU tipe tertutup
// --------------------------------------------
sealed interface KeadaanTugas {
    object Memuat : KeadaanTugas
    data class Berhasil(val daftar: List<Tugas>) : KeadaanTugas
    data class Gagal(val pesan: String) : KeadaanTugas
}

// Karena ketiganya satu nilai, keadaan mustahil seperti
// "sedang memuat DAN gagal sekaligus" TIDAK BISA diwakili.

// --------------------------------------------
// 5. ViewModel: tidak mengenal Android sama sekali
// --------------------------------------------
class TugasViewModel(
    private val repo: TugasRepository
) : ViewModel() {

    private val _keadaan = MutableStateFlow<KeadaanTugas>(
        KeadaanTugas.Memuat
    )
    val keadaan: StateFlow<KeadaanTugas> = _keadaan.asStateFlow()

    init {
        muat()
    }

    fun muat() {
        viewModelScope.launch {          // jaringan di sini, BUKAN di UI
            _keadaan.value = KeadaanTugas.Memuat
            _keadaan.value = try {
                KeadaanTugas.Berhasil(repo.ambilSemua())
            } catch (e: Exception) {
                KeadaanTugas.Gagal(e.message ?: "kesalahan tidak dikenal")
            }
        }
    }

    fun ubahSelesai(id: Int, selesai: Boolean) {
        viewModelScope.launch { repo.perbarui(id, selesai) }
    }
}

// Perhatikan: tidak ada Context, tidak ada View, tidak ada
// referensi ke kelas Android mana pun. Karena itu ViewModel
// ini bisa diuji dengan JUnit biasa, tanpa perangkat.`,

    python: String.raw`# ============================================
# MODEL mekanisme state Compose, dengan Python
#
# Kotlin tidak terpasang, jadi kode Compose di tab
# sebelah tidak bisa dijalankan. Berkas ini menirukan
# mekanismenya supaya bisa dibuktikan.
# ============================================


# --------------------------------------------
# 1. Kenapa 'remember' dibutuhkan
# --------------------------------------------
class TanpaRemember:
    """Variabel biasa: direset tiap kali composable dijalankan ulang."""
    def jalankan(self):
        jumlah = 0          # dibuat ulang SETIAP KALI
        jumlah += 1
        return jumlah


class DenganRemember:
    """remember { }: nilainya bertahan melewati recomposition."""
    def __init__(self):
        self._ingatan = {}

    def jalankan(self, kunci="jumlah"):
        if kunci not in self._ingatan:
            self._ingatan[kunci] = 0        # hanya sekali
        self._ingatan[kunci] += 1
        return self._ingatan[kunci]


print("--- kenapa 'remember' dibutuhkan ---")
a, b = TanpaRemember(), DenganRemember()
print("  " + "recomposition ke-".ljust(20) + "tanpa remember".rjust(16) +
      "dengan remember".rjust(17))
for i in range(1, 5):
    print("  " + str(i).ljust(20) + str(a.jalankan()).rjust(16) +
          str(b.jalankan()).rjust(17))

print("")
print("  Tanpa remember, nilainya SELALU kembali ke awal --")
print("  karena composable dijalankan ulang dari nol.")


# --------------------------------------------
# 2. remember vs mutableStateOf: menjawab hal BERBEDA
# --------------------------------------------
print("")
print("--- remember vs mutableStateOf ---")
BEDA = [
    ("remember saja",
     "bertahan melewati recomposition",
     "perubahan TIDAK memicu gambar ulang"),
    ("mutableStateOf saja",
     "perubahan memicu gambar ulang",
     "nilainya DIRESET tiap recomposition"),
    ("keduanya bersama",
     "bertahan DAN memicu gambar ulang",
     "-"),
    ("rememberSaveable",
     "juga bertahan saat layar DIPUTAR",
     "-"),
]
print("  " + "cara".ljust(22) + "yang didapat".ljust(36) + "yang HILANG")
for cara, dapat, hilang in BEDA:
    print("  " + cara.ljust(22) + dapat.ljust(36) + hilang)


# --------------------------------------------
# 3. State hoisting: apa yang BISA dilakukan pemanggil
# --------------------------------------------
class KotakCentangStateful:
    """Menyimpan keadaannya sendiri -- pemanggil tidak bisa apa-apa."""
    def __init__(self):
        self._dicentang = False

    def klik(self):
        self._dicentang = not self._dicentang


class KotakCentangStateless:
    """Menerima nilai, memancarkan peristiwa."""
    def gambar(self, dicentang, on_ubah):
        return {"tampilan": "[x]" if dicentang else "[ ]",
                "on_ubah": on_ubah}


print("")
print("--- state hoisting: apa yang bisa dilakukan PEMANGGIL? ---")
KEMAMPUAN = [
    ("Memberi nilai awal",              False, True),
    ("Mengetahui nilainya sekarang",    False, True),
    ("Mengubahnya dari luar",           False, True),
    ("Menyimpan nilainya",              False, True),
    ("Menguji tanpa menjalankan UI",    False, True),
    ("Pratinjau berbagai keadaan",      False, True),
]
print("  " + "kemampuan".ljust(34) + "stateful".rjust(10) +
      "stateless".rjust(12))
for nama, sf, sl in KEMAMPUAN:
    print("  " + nama.ljust(34) + ("bisa" if sf else "TIDAK").rjust(10) +
          ("bisa" if sl else "tidak").rjust(12))

print("")
print("  Komponen stateful BEKERJA, tapi ia BUNTU.")
print("  Setelah keadaannya dinaikkan, ia jadi fungsi murni dari")
print("  parameternya -- dan semua kemampuan di atas mengikuti.")


# --------------------------------------------
# 4. Aliran satu arah: satu pemilik per nilai
# --------------------------------------------
class Pemilik:
    """Satu tempat menyimpan kebenaran. Data turun, peristiwa naik."""
    def __init__(self, tugas):
        self.tugas = list(tugas)
        self.jejak = []

    def data_untuk(self, i):
        return self.tugas[i]                      # NILAI turun

    def on_ubah(self, i, selesai):                # PERISTIWA naik
        judul, _ = self.tugas[i]
        self.tugas[i] = (judul, selesai)
        self.jejak.append("baris %d -> %s" % (i, selesai))


p = Pemilik([("Baca bab 3", False), ("Kerjakan tugas SPK", False),
             ("Latihan Compose", True)])

kotak = KotakCentangStateless()
print("")
print("--- aliran data satu arah ---")
for i in range(len(p.tugas)):
    judul, selesai = p.data_untuk(i)
    hasil = kotak.gambar(selesai, lambda v, i=i: p.on_ubah(i, v))
    print("  " + hasil["tampilan"] + " " + judul)

print("")
print("  pengguna mencentang baris 0 dan 1:")
p.on_ubah(0, True)
p.on_ubah(1, True)
for i in range(len(p.tugas)):
    judul, selesai = p.data_untuk(i)
    print("  " + ("[x]" if selesai else "[ ]") + " " + judul)

print("")
print("  jejak perubahan: " + " | ".join(p.jejak))
print("")
print("  Tidak ada komponen yang mengubah keadaan milik komponen")
print("  lain. Kalau ada nilai yang salah, kamu SELALU tahu ke")
print("  mana harus melihat: ke pemiliknya.")


# --------------------------------------------
# 5. LazyColumn vs Column biasa
# --------------------------------------------
def column_biasa(jumlah_butir, terlihat):
    return jumlah_butir                    # semua disusun


def lazy_column(jumlah_butir, terlihat):
    return min(jumlah_butir, terlihat + 4)  # yang terlihat + sedikit cadangan


print("")
print("--- Column biasa vs LazyColumn ---")
print("  " + "butir dalam daftar".rjust(20) + "Column".rjust(10) +
      "LazyColumn".rjust(13) + "  hemat")
for n in [10, 100, 1000, 10000]:
    c = column_biasa(n, 10)
    l = lazy_column(n, 10)
    hemat = (1 - l / c) * 100
    print("  " + str(n).rjust(20) + str(c).rjust(10) + str(l).rjust(13) +
          ("  %.1f%%" % hemat))

print("")
print("  Column biasa menyusun SEMUA anaknya, termasuk yang")
print("  jauh di luar layar. Untuk 10.000 butir itu berarti")
print("  10.000 komponen dibuat padahal cuma 10 yang terlihat.")
print("")
print("  Bedanya bukan soal kerapian -- ia soal apakah")
print("  aplikasinya BISA DIPAKAI sama sekali.")


# --------------------------------------------
# 6. Kenapa daftar butuh 'key' yang stabil
# --------------------------------------------
def gambar_ulang_tanpa_key(lama, baru):
    """Tanpa key: butir dikenali dari POSISINYA."""
    n = max(len(lama), len(baru))
    berubah = []
    for i in range(n):
        l = lama[i] if i < len(lama) else None
        b = baru[i] if i < len(baru) else None
        if l != b:
            berubah.append(i)
    return berubah


def gambar_ulang_dengan_key(lama, baru):
    """Dengan key: butir dikenali dari IDENTITASNYA."""
    id_lama = {t[0] for t in lama}
    return [i for i, t in enumerate(baru) if t[0] not in id_lama]


LAMA = [(1, "Baca bab 3"), (2, "Tugas SPK"), (3, "Latihan Compose"),
        (4, "Rapat kelompok"), (5, "Kirim laporan")]
BARU = [(9, "Beli buku")] + LAMA          # butir baru DISISIPKAN di depan

print("")
print("--- kenapa daftar butuh key yang stabil ---")
print("  daftar lama: " + ", ".join(t[1] for t in LAMA))
print("  satu butir DISISIPKAN di posisi paling depan")
print("")
tanpa = gambar_ulang_tanpa_key(LAMA, BARU)
dengan = gambar_ulang_dengan_key(LAMA, BARU)
print("  tanpa key  : %d butir dianggap berubah -> posisi %s"
      % (len(tanpa), tanpa))
print("  dengan key : %d butir dianggap berubah -> posisi %s"
      % (len(dengan), dengan))

print("")
print("  Tanpa key, SELURUH butir setelah sisipan dianggap")
print("  berubah -- padahal isinya sama persis, cuma bergeser.")
print("")
print("  Akibatnya bukan cuma lambat: keadaan yang menempel pada")
print("  posisi -- misalnya 'sudah dicentang' atau posisi gulir")
print("  di dalam butir -- bisa BERPINDAH KE BUTIR YANG SALAH.")


# --------------------------------------------
# 7. Keadaan layar sebagai SATU nilai
# --------------------------------------------
print("")
print("--- kenapa keadaan layar disimpan sebagai SATU nilai ---")

print("  CARA BURUK: tiga variabel terpisah")
KOMBINASI = [
    (True,  None,  None,  "sedang memuat"),
    (False, "data", None, "berhasil"),
    (False, None,  "galat", "gagal"),
    (True,  "data", "galat", "MUSTAHIL -- tapi bisa terjadi!"),
    (False, None,  None,  "MUSTAHIL -- tidak jelas apa artinya"),
]
print("  " + "memuat".rjust(8) + "data".rjust(8) + "galat".rjust(8) +
      "   arti")
for memuat, data, galat, arti in KOMBINASI:
    print("  " + str(memuat).rjust(8) + str(data).rjust(8) +
          str(galat).rjust(8) + "   " + arti)

print("")
print("  Tiga variabel boolean/nullable memberi 8 kombinasi,")
print("  dan hanya 3 di antaranya yang punya arti.")
print("")
print("  CARA BAIK: satu tipe tertutup")
for k in ["Memuat", "Berhasil(daftar)", "Gagal(pesan)"]:
    print("      " + k)
print("")
print("  Hanya 3 kemungkinan, dan SEMUANYA punya arti.")
print("  Keadaan mustahil tidak bisa DIWAKILI sama sekali --")
print("  jadi tidak perlu diuji, dan tidak bisa terjadi.")`
  },

  output: `--- kenapa 'remember' dibutuhkan ---
  recomposition ke-     tanpa remember  dengan remember
  1                                  1                1
  2                                  1                2
  3                                  1                3
  4                                  1                4

  Tanpa remember, nilainya SELALU kembali ke awal --
  karena composable dijalankan ulang dari nol.

--- remember vs mutableStateOf ---
  cara                  yang didapat                        yang HILANG
  remember saja         bertahan melewati recomposition     perubahan TIDAK memicu gambar ulang
  mutableStateOf saja   perubahan memicu gambar ulang       nilainya DIRESET tiap recomposition
  keduanya bersama      bertahan DAN memicu gambar ulang    -
  rememberSaveable      juga bertahan saat layar DIPUTAR    -

--- state hoisting: apa yang bisa dilakukan PEMANGGIL? ---
  kemampuan                           stateful   stateless
  Memberi nilai awal                     TIDAK        bisa
  Mengetahui nilainya sekarang           TIDAK        bisa
  Mengubahnya dari luar                  TIDAK        bisa
  Menyimpan nilainya                     TIDAK        bisa
  Menguji tanpa menjalankan UI           TIDAK        bisa
  Pratinjau berbagai keadaan             TIDAK        bisa

  Komponen stateful BEKERJA, tapi ia BUNTU.
  Setelah keadaannya dinaikkan, ia jadi fungsi murni dari
  parameternya -- dan semua kemampuan di atas mengikuti.

--- aliran data satu arah ---
  [ ] Baca bab 3
  [ ] Kerjakan tugas SPK
  [x] Latihan Compose

  pengguna mencentang baris 0 dan 1:
  [x] Baca bab 3
  [x] Kerjakan tugas SPK
  [x] Latihan Compose

  jejak perubahan: baris 0 -> True | baris 1 -> True

  Tidak ada komponen yang mengubah keadaan milik komponen
  lain. Kalau ada nilai yang salah, kamu SELALU tahu ke
  mana harus melihat: ke pemiliknya.

--- Column biasa vs LazyColumn ---
    butir dalam daftar    Column   LazyColumn  hemat
                    10        10           10  0.0%
                   100       100           14  86.0%
                  1000      1000           14  98.6%
                 10000     10000           14  99.9%

  Column biasa menyusun SEMUA anaknya, termasuk yang
  jauh di luar layar. Untuk 10.000 butir itu berarti
  10.000 komponen dibuat padahal cuma 10 yang terlihat.

  Bedanya bukan soal kerapian -- ia soal apakah
  aplikasinya BISA DIPAKAI sama sekali.

--- kenapa daftar butuh key yang stabil ---
  daftar lama: Baca bab 3, Tugas SPK, Latihan Compose, Rapat kelompok, Kirim laporan
  satu butir DISISIPKAN di posisi paling depan

  tanpa key  : 6 butir dianggap berubah -> posisi [0, 1, 2, 3, 4, 5]
  dengan key : 1 butir dianggap berubah -> posisi [0]

  Tanpa key, SELURUH butir setelah sisipan dianggap
  berubah -- padahal isinya sama persis, cuma bergeser.

  Akibatnya bukan cuma lambat: keadaan yang menempel pada
  posisi -- misalnya 'sudah dicentang' atau posisi gulir
  di dalam butir -- bisa BERPINDAH KE BUTIR YANG SALAH.

--- kenapa keadaan layar disimpan sebagai SATU nilai ---
  CARA BURUK: tiga variabel terpisah
    memuat    data   galat   arti
      True    None    None   sedang memuat
     False    data    None   berhasil
     False    None   galat   gagal
      True    data   galat   MUSTAHIL -- tapi bisa terjadi!
     False    None    None   MUSTAHIL -- tidak jelas apa artinya

  Tiga variabel boolean/nullable memberi 8 kombinasi,
  dan hanya 3 di antaranya yang punya arti.

  CARA BAIK: satu tipe tertutup
      Memuat
      Berhasil(daftar)
      Gagal(pesan)

  Hanya 3 kemungkinan, dan SEMUANYA punya arti.
  Keadaan mustahil tidak bisa DIWAKILI sama sekali --
  jadi tidak perlu diuji, dan tidak bisa terjadi.`,

  kesalahanUmum: [
    {
      salah: 'Memakai mutableStateOf tanpa membungkusnya dengan remember.',
      kenapa: 'Composable dijalankan ulang berkali-kali, dan tanpa remember nilainya dibuat ulang dari awal setiap kali. Penghitung akan selalu kembali ke nol dan pengguna melihat tampilan yang seolah tidak menanggapi apa pun.',
      benar: 'Pakai remember bersama mutableStateOf, dan gunakan rememberSaveable kalau nilainya juga harus bertahan saat layar diputar.'
    },
    {
      salah: 'Menyimpan keadaan di dalam composable yang seharusnya bisa dipakai ulang.',
      kenapa: 'Komponen yang memiliki keadaannya sendiri tidak bisa diberi nilai awal, tidak bisa dikendalikan dari luar, dan tidak bisa diuji tanpa menjalankan seluruh antarmuka. Ia bekerja, tetapi hanya untuk satu keperluan saja.',
      benar: 'Naikkan keadaannya ke pemanggil sehingga komponennya menerima nilai sebagai parameter dan memancarkan peristiwa lewat fungsi.'
    },
    {
      salah: 'Menaikkan keadaan terlalu tinggi, sampai ke composable paling atas.',
      kenapa: 'Parameter jadi harus diteruskan melewati banyak komponen yang tidak memedulikannya, dan komponen perantara itu ikut dijalankan ulang setiap kali nilainya berubah. Kodenya juga jadi penuh parameter yang cuma numpang lewat.',
      benar: 'Naikkan hanya sampai leluhur bersama terendah dari semua composable yang benar-benar membutuhkannya.'
    },
    {
      salah: 'Memakai Column biasa untuk daftar yang panjang.',
      kenapa: 'Column menyusun seluruh anaknya sekaligus, termasuk yang jauh di luar layar, sehingga daftar sepuluh ribu butir membuat sepuluh ribu komponen padahal cuma sepuluh yang terlihat. Aplikasinya menjadi lambat atau kehabisan memori.',
      benar: 'Pakai LazyColumn atau LazyRow, yang hanya menyusun butir yang terlihat dan memakai ulang komponen saat digulir.'
    },
    {
      salah: 'Memakai items pada LazyColumn tanpa menyertakan key yang stabil.',
      kenapa: 'Tanpa key, Compose mengenali butir berdasarkan posisinya, sehingga menyisipkan satu butir di depan membuat seluruh butir sesudahnya dianggap berubah. Selain lambat, keadaan yang menempel pada posisi seperti sudah dicentang bisa berpindah ke butir yang salah.',
      benar: 'Sertakan key berisi pengenal unik dan stabil dari datanya, misalnya id dari basis data, bukan indeks.'
    },
    {
      salah: 'Menyimpan keadaan layar sebagai beberapa variabel terpisah untuk memuat, data, dan galat.',
      kenapa: 'Tiga variabel memberi delapan kombinasi padahal hanya tiga yang punya arti, sehingga keadaan mustahil seperti sedang memuat sekaligus gagal bisa terjadi dan harus ditangani. Kode penanganannya jadi penuh pemeriksaan yang seharusnya tidak perlu ada.',
      benar: 'Gambarkan keadaan layar sebagai satu tipe tertutup dengan tiga kemungkinan, sehingga keadaan mustahil tidak bisa diwakili sama sekali.'
    },
    {
      salah: 'Menyimpan Context atau referensi View di dalam ViewModel.',
      kenapa: 'ViewModel bertahan lebih lama daripada Activity, sehingga menyimpan Context berisiko menahan Activity yang sudah mati dan menyebabkan kebocoran memori. Ia juga jadi tidak bisa diuji dengan JUnit biasa tanpa perangkat.',
      benar: 'Jaga ViewModel bebas dari kelas Android mana pun, dan serahkan kebutuhan Context ke lapisan repository atau ke UI.'
    }
  ],

  analogi: `Bayangkan **panitia acara jurusan** dan sebuah **daftar hadir**.

**Komponen yang menyimpan keadaannya sendiri** adalah panitia yang membawa **buku catatan pribadi** dan mencatat kehadiran di situ.

Ia bekerja. Tetapi coba minta sesuatu darinya:

*"Berapa yang sudah hadir?"* — ia harus membuka bukunya dan menghitung. *"Tandai semua hadir."* — kamu tidak bisa; itu bukunya. *"Cetak laporannya."* — datanya ada di bukunya, bukan di sistem.

Dan yang paling merepotkan: kalau ada **tiga panitia** dengan **tiga buku**, tidak ada yang tahu angka mana yang benar.

**State hoisting** adalah memindahkan daftar hadirnya ke **satu papan besar di depan ruangan**.

Sekarang panitia **tidak menyimpan apa-apa**. Ia melihat papan, dan kalau ada yang datang, ia **melapor** supaya papannya diperbarui.

Panitia mana pun bisa menggantikan panitia mana pun. Tidak ada lagi tiga versi kebenaran.

Dan ketika ada angka yang salah, pertanyaan *"siapa yang menulis ini?"* punya jawaban — karena **hanya papan itu yang bisa ditulisi**.

**ViewModel** adalah **papan itu diletakkan di ruang panitia**, bukan di ruang acara.

Kenapa? Karena ruang acaranya **dibongkar dan dipasang ulang** setiap kali tata letaknya berubah. Kalau papannya ada di sana, catatannya **hilang setiap kali meja digeser**.

Itulah yang terjadi saat layar ponsel diputar.

Dan **aturan bahwa ViewModel tidak boleh mengenal Context** adalah aturan bahwa papan itu **tidak boleh dipaku ke tembok ruang acara**. Kalau dipaku, ia ikut hancur saat ruangannya dibongkar — dan lebih buruk lagi, ia **menahan puing ruangan lama** menempel padanya.

Terakhir, **kenapa daftar butuh key**.

Bayangkan papan itu bertuliskan **nomor kursi**, bukan nama: *"kursi 1 hadir, kursi 2 hadir, kursi 3 belum."*

Lalu seseorang datang terlambat dan **duduk di kursi 1**, menggeser semua orang satu kursi ke belakang.

Sekarang papan itu **salah untuk semua orang**. Bukan karena datanya hilang, melainkan karena ia mencatat **posisi**, bukan **orang**.

Dengan **key**, papannya bertuliskan **nama**. Siapa pun boleh duduk di mana saja; catatannya tetap benar.`,

  latihan: [
    'Jelaskan apa yang dilakukan remember dan apa yang dilakukan mutableStateOf, dan apa yang terjadi kalau salah satunya dihilangkan.',
    'Jelaskan perbedaan remember dan rememberSaveable, dan sebutkan satu keadaan yang membedakan keduanya.',
    'Jelaskan apa itu state hoisting, dan sebutkan lima kemampuan yang didapat pemanggil setelah keadaan dinaikkan.',
    'Ubah composable Penghitung pada materi ini menjadi versi stateless, lalu tulis composable pemanggil yang memiliki keadaannya.',
    'Jelaskan kaidah seberapa tinggi keadaan sebaiknya dinaikkan, beserta akibat kalau terlalu rendah dan terlalu tinggi.',
    'Jelaskan perbedaan Column dan LazyColumn, dan hitung berapa komponen yang dibuat masing-masing untuk daftar 5000 butir dengan 12 butir terlihat.',
    'Jelaskan kenapa items pada LazyColumn perlu key yang stabil, dan sebutkan akibat yang lebih buruk daripada sekadar lambat.',
    'Jelaskan kenapa keadaan layar sebaiknya disimpan sebagai satu tipe tertutup, dan sebutkan berapa kombinasi mustahil yang muncul kalau dipakai tiga variabel terpisah.',
    'Jelaskan kenapa ViewModel tidak boleh menyimpan Context, dan sebutkan dua akibatnya.'
  ]
});

TOPICS.push({
  id: 'mobile-flutter',
  judul: 'Dart & Flutter',
  kategori: 'mobile',
  tag: ['Dart', 'Flutter', 'widget', 'StatelessWidget', 'StatefulWidget', 'setState'],
  ringkas: 'Gagasan yang sama dengan Compose, dijalankan dengan cara yang sama sekali berbeda.',

  fungsi: `**Membangun aplikasi untuk Android dan iOS sekaligus dengan satu kode.**

Terpakai di:

- **Tugas mata kuliah** pertemuan 9 sampai 16
- **Aplikasi lintas peron** — satu tim, dua peron
- **Purwarupa cepat** — hot reload sangat cepat
- **Memperluas keterampilan** — gagasannya sama dengan Compose, jadi berpindah tidak sulit

Perbedaan yang paling terasa dalam praktik: **Flutter menuntut \`setState\` dipanggil**, sementara Compose otomatis.

Lupa memanggilnya adalah kesalahan pemula yang paling sering: datanya berubah, layarnya tidak, dan **tidak ada galat apa pun**.

Dan satu hal yang membingungkan orang dari Compose: **Widget dan State dipisah dua kelas**, karena objek Widget dibuang dan dibuat ulang terus.`,

  praktik: {
    tujuan: `Kamu punya aplikasi Flutter yang berjalan dengan daftar dan keadaan, dan tahu perbedaan pentingnya dari Compose.`,
    alat: [
      'Flutter SDK',
      'Android Studio atau VS Code dengan ekstensi Flutter',
      'Emulator'
    ],
    langkah: [
      { judul: 'Pasang dan periksa lingkunganmu',
        isi: `Setelah memasang Flutter SDK, jalankan \`flutter doctor\`.

Ia memeriksa semua yang dibutuhkan dan memberi tahu apa yang kurang. Jangan lanjut sebelum semuanya hijau.

Lalu \`flutter create nama_proyek\` dan \`flutter run\`.` },
      { judul: 'Rasakan hot reload',
        isi: `Dengan aplikasi berjalan, ubah satu teks lalu simpan. Perubahannya muncul **dalam sepersekian detik** tanpa kehilangan keadaan.

Tekan \`r\` untuk hot reload, \`R\` untuk restart penuh.

Ini keunggulan Flutter yang paling langsung terasa.` },
      { judul: 'Buktikan perlunya setState',
        isi: `Buat penghitung, lalu ubah nilainya **tanpa** membungkus dengan \`setState\`.

Tekan tombolnya berkali-kali — angkanya tidak berubah di layar, padahal nilainya bertambah.

Tidak ada galat, tidak ada peringatan. Ini kesalahan pemula Flutter yang paling sering.` },
      { judul: 'Pahami kenapa dua kelas dipisah',
        isi: `Objek Widget di Flutter **dibuang dan dibuat ulang** setiap kali build berjalan.

Kalau keadaan disimpan di kelas Widget, ia ikut hilang. Karena itu ia ditaruh di kelas \`State\` yang dipegang kerangka kerja.

Coba simpan nilai di kelas Widget dan lihat sendiri ia tidak bertahan.` },
      { judul: 'Pakai ListView.builder untuk daftar panjang',
        isi: `\`ListView\` dengan \`children\` membangun semuanya sekaligus, sama seperti Column.

\`ListView.builder\` hanya membangun yang terlihat — padanan \`LazyColumn\` di Compose.

Sertakan \`key: ValueKey(item.id)\` dengan alasan yang sama seperti di Compose.` },
      { judul: 'Perhatikan pohon widget yang dalam',
        isi: `Di Flutter, **jarak pun berupa widget** — \`Padding\`, bukan properti.

Pohonmu akan jauh lebih dalam daripada Compose. Pakai fitur **Extract Widget** di editor untuk memecahnya jadi widget bernama.

Widget yang lebih kecil juga membangun ulang lebih sedikit.` },
      { judul: 'Bandingkan langsung dengan Compose',
        isi: `Buat aplikasi sederhana yang sama di kedua peron, lalu bandingkan:

cara memicu gambar ulang, cara mengatur tampilan, cara menangani daftar panjang, dan berapa baris kodenya.

Tabel perbandingan ini bagus untuk laporan, dan membuat kamu benar-benar memahami keduanya.` }
    ],
    cek: [
      'Perintah flutter doctor tidak melaporkan masalah',
      'Kamu sudah melihat sendiri penghitung yang tidak berubah karena lupa setState',
      'Daftar panjangmu memakai ListView.builder dengan key stabil'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa semuanya widget',

  konsep: `
**Flutter** memakai gagasan pokok yang **sama persis** dengan Compose: **UI deklaratif**, digambar ulang dari keadaan.

Yang berbeda adalah **caranya sampai ke layar** — dan perbedaan itu punya akibat yang nyata.

**Compose** memakai komponen **asli Android**. Aplikasinya terlihat seperti aplikasi Android karena **memang** memakai bahan Android.

**Flutter** **menggambar sendiri setiap piksel** lewat mesin grafisnya. Ia tidak memakai tombol bawaan sistem; ia **melukis tombol** yang terlihat seperti tombol.

Akibatnya:

- **Tampilannya identik** di Android dan iOS — bisa jadi keunggulan atau kekurangan
- **Tidak otomatis mengikuti** perubahan gaya sistem operasi
- **Satu kode** untuk Android, iOS, web, dan desktop

**Dart**

Bahasa Flutter. Beberapa hal yang perlu diketahui:

- **Bertipe kuat**, dengan **null safety** — \`String\` tidak boleh null, \`String?\` boleh
- \`final\` untuk nilai yang ditetapkan saat berjalan, \`const\` untuk yang **sudah diketahui saat kompilasi**
- \`async\` / \`await\` dengan \`Future\` untuk pekerjaan yang butuh waktu
- Parameter bernama dengan \`required\`, yang **sangat lazim** dipakai di Flutter karena konstruktor widget punya banyak parameter

**Semuanya adalah widget**

Di Compose, ada composable untuk isi dan \`Modifier\` untuk pengaturan.

Di Flutter, **pengaturan pun berupa widget**. Jarak bukan properti — ia widget bernama \`Padding\`. Perataan bukan properti — ia widget bernama \`Center\`.

Akibatnya pohon widget Flutter **jauh lebih dalam** daripada pohon Compose. Ini yang membuat pemula merasa Flutter "banyak sekali kurung kurawal".

Sisi baiknya: **hanya ada satu gagasan yang perlu dipelajari**. Semuanya widget, dan widget bisa disarangkan di mana saja.

**StatelessWidget dan StatefulWidget**

- **\`StatelessWidget\`** — tidak menyimpan keadaan. Tampilannya sepenuhnya ditentukan parameternya.
- **\`StatefulWidget\`** — menyimpan keadaan yang bisa berubah, disimpan di kelas \`State\` terpisah.

**Kenapa dipisah dua kelas?** Karena widget di Flutter **dibuang dan dibuat ulang terus-menerus**, sedangkan \`State\` **bertahan**. Pemisahan itu yang memungkinkan keadaan tetap hidup meski widget-nya sudah diganti berkali-kali.

**\`setState()\`**

Memberi tahu Flutter bahwa keadaan berubah, sehingga \`build()\` perlu dipanggil lagi.

**Perbedaan penting dari Compose**: di Compose, perubahan \`mutableStateOf\` **otomatis** memicu recomposition — kamu tidak memberi tahu siapa pun. Di Flutter, kamu **harus memanggil \`setState\`** secara eksplisit.

Lupa memanggilnya adalah **kesalahan pemula yang paling sering terjadi**: datanya berubah, tetapi layarnya tidak.

Dan sebaliknya, mengubah nilai **di dalam** \`setState\` yang bukan bagian dari keadaan tidak berguna — yang memicu gambar ulang adalah **pemanggilannya**, bukan isinya.

**Tata letak**

- **\`Column\`** dan **\`Row\`** — sama seperti Compose
- **\`Stack\`** — sepadan dengan \`Box\`
- **\`Expanded\`** dan **\`Flexible\`** — membagi ruang sisa
- **\`ListView.builder\`** — sepadan dengan \`LazyColumn\`

**Manajemen keadaan di luar setState**

\`setState\` cukup untuk keadaan yang **dimiliki satu widget**. Untuk keadaan yang dipakai bersama antar-layar, dipakai pustaka seperti **Provider**, **Riverpod**, atau **BLoC**.

Semuanya menyelesaikan masalah yang sama dengan **ViewModel** di Android: **memisahkan keadaan dari widget yang menampilkannya**.

**Membandingkan keduanya**

Keduanya deklaratif, keduanya punya konsep keadaan yang memicu gambar ulang, keduanya memisahkan komponen bernilai dari komponen berkeadaan.

Yang berbeda: **cara menggambar**, **cara memicu gambar ulang** (otomatis vs \`setState\`), dan **cara mengatur tampilan** (\`Modifier\` vs widget pembungkus).

Karena gagasan pokoknya sama, **berpindah dari satu ke lain jauh lebih mudah** daripada belajar dari nol — dan itu sebabnya mata kuliah ini mengajarkan keduanya berurutan.
`,

  logicSyntax: [
    {
      bahasa: 'dart',
      kode: '// KENAPA WIDGET DIPISAH JADI DUA KELAS\n//\n// Di Flutter, objek Widget DIBUANG dan DIBUAT ULANG\n// setiap kali build() berjalan -- bisa 60 kali per detik.\n//\n// Kalau keadaan disimpan DI DALAM widget, ia akan\n// ikut hilang setiap kali itu terjadi.\n//\n// Karena itu keadaan ditaruh di kelas State TERPISAH,\n// yang TIDAK dibuang:\n//\n//   Widget  -> ringan, sekali pakai, dibuat ulang terus\n//   State   -> bertahan, menyimpan yang harus diingat\n//\nclass Penghitung extends StatefulWidget {\n  const Penghitung({super.key});\n\n  @override\n  State<Penghitung> createState() => _PenghitungState();\n}\n\nclass _PenghitungState extends State<Penghitung> {\n  int jumlah = 0;   // BERTAHAN meski widget dibuat ulang\n\n  @override\n  Widget build(BuildContext context) {\n    return Text("Jumlah: $jumlah");\n  }\n}',
      penjelasan: `
Pemisahan menjadi dua kelas adalah hal pertama yang membingungkan orang yang datang dari Compose, dan alasannya terletak pada **apa sebenarnya objek Widget itu**.

Di Flutter, \`Widget\` **bukan** benda yang ada di layar. Ia **resep** — keterangan tentang bagaimana sesuatu seharusnya terlihat.

Dan resep itu **murah dan sekali pakai**. Setiap kali \`build()\` berjalan, Flutter membuat objek Widget yang **sama sekali baru**, membandingkannya dengan yang lama, lalu membuang keduanya.

Sekarang jelas kenapa keadaan tidak boleh disimpan di sana: **menyimpan sesuatu di objek yang dirancang untuk dibuang** berarti kehilangan sesuatu itu.

Objek \`State\`, sebaliknya, **dipegang oleh kerangka kerja** dan bertahan selama widget-nya masih berada di pohon. Widget-nya boleh diganti seratus kali; \`State\`-nya tetap yang sama.

Sekarang bandingkan dengan **Compose**, yang menyelesaikan persoalan yang **sama persis** dengan cara berbeda.

Compose juga menjalankan ulang fungsimu terus-menerus, dan variabel lokal juga hilang. Tetapi alih-alih memisahkan dua kelas, Compose menyediakan \`remember { }\` — yang **menitipkan nilai ke kerangka kerja**, bukan ke fungsinya.

Jadi keduanya melakukan hal yang sama: **menaruh keadaan di tempat yang tidak ikut dibuang.** Flutter melakukannya dengan **kelas terpisah**; Compose dengan **fungsi penitipan**.

Ada satu perbedaan lagi yang lebih terasa sehari-hari, dan layak diperhatikan: **siapa yang memberi tahu bahwa keadaan berubah.**

Di Compose, \`mutableStateOf\` **mengawasi dirinya sendiri**. Kamu cukup menetapkan nilai baru, dan recomposition terjadi. Tidak ada yang perlu kamu panggil.

Di Flutter, kamu **harus memanggil \`setState()\`**. Mengubah \`jumlah = 5\` saja **tidak melakukan apa-apa** pada layar.

Dan inilah sumber kesalahan pemula yang paling sering: **datanya berubah, layarnya tidak.** Tidak ada galat, tidak ada peringatan — cuma tombol yang terasa mati.

Kaidah praktisnya: **kalau kamu mengubah sesuatu yang memengaruhi tampilan, perubahan itu harus berada di dalam \`setState\`.** Dan sebaliknya, jangan taruh pekerjaan berat di dalamnya — \`setState\` seharusnya cuma berisi perubahan nilai, bukan panggilan jaringan.
`
    }
  ],

  kode: {
    dart: String.raw`// ============================================
// Dart & Flutter
//
// CATATAN: Dart tidak terpasang di komputer ini,
// jadi kode ini tidak dijalankan. Blok Output berasal
// dari versi Python di tab sebelah, yang memodelkan
// mekanismenya dan benar-benar dijalankan.
// ============================================

import 'package:flutter/material.dart';

// --------------------------------------------
// 1. StatelessWidget: tampilan = fungsi parameter
// --------------------------------------------
class KartuMahasiswa extends StatelessWidget {
  final String nama;
  final String nim;
  final double ipk;

  const KartuMahasiswa({
    super.key,
    required this.nama,      // parameter bernama + required
    required this.nim,
    required this.ipk,
  });

  @override
  Widget build(BuildContext context) {
    // Perhatikan: Padding adalah WIDGET, bukan properti.
    // Itulah kenapa pohon widget Flutter jauh lebih dalam.
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(nama, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 4),
            Text(nim, style: Theme.of(context).textTheme.bodyMedium),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('IPK'),
                Text(ipk.toStringAsFixed(2)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// --------------------------------------------
// 2. StatefulWidget: dua kelas, dan alasannya
// --------------------------------------------
class Penghitung extends StatefulWidget {
  const Penghitung({super.key});

  // Widget-nya dibuang & dibuat ulang terus.
  // State-nya BERTAHAN.
  @override
  State<Penghitung> createState() => _PenghitungState();
}

class _PenghitungState extends State<Penghitung> {
  int jumlah = 0;

  void tambah() {
    // WAJIB di dalam setState. Menulis 'jumlah++' saja
    // mengubah nilainya, tapi layar TIDAK diperbarui.
    setState(() {
      jumlah++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Jumlah: $jumlah'),
        ElevatedButton(
          onPressed: tambah,
          child: const Text('Tambah'),
        ),
      ],
    );
  }
}

// --------------------------------------------
// 3. Daftar panjang: ListView.builder
// --------------------------------------------
class DaftarTugas extends StatelessWidget {
  final List<Tugas> tugas;
  final void Function(int id, bool selesai) onUbah;

  const DaftarTugas({
    super.key,
    required this.tugas,
    required this.onUbah,
  });

  @override
  Widget build(BuildContext context) {
    // .builder hanya membangun butir yang TERLIHAT --
    // sepadan dengan LazyColumn di Compose.
    return ListView.builder(
      itemCount: tugas.length,
      itemBuilder: (context, i) {
        final t = tugas[i];
        return CheckboxListTile(
          key: ValueKey(t.id),          // kunci stabil
          title: Text(t.judul),
          value: t.selesai,
          onChanged: (nilai) => onUbah(t.id, nilai ?? false),
        );
      },
    );
  }
}

// --------------------------------------------
// 4. Null safety & async
// --------------------------------------------
class TugasRepository {
  // String? boleh null; String TIDAK boleh.
  Future<List<Tugas>> ambilSemua({String? kataKunci}) async {
    final hasil = await http.get(
      Uri.parse('https://contoh.id/api/tugas'),
    );
    if (hasil.statusCode != 200) {
      // ditulis dengan penggabungan; lihat catatan di berkas Kotlin
      throw Exception('Gagal memuat: ' + hasil.statusCode.toString());
    }
    final data = jsonDecode(hasil.body) as List<dynamic>;
    return data.map((e) => Tugas.fromJson(e)).toList();
  }
}

// --------------------------------------------
// 5. Expanded: membagi ruang sisa
// --------------------------------------------
class BarisRingkasan extends StatelessWidget {
  const BarisRingkasan({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        Expanded(flex: 2, child: Text('Nama')),   // 2 bagian
        Expanded(flex: 1, child: Text('IPK')),    // 1 bagian
        Icon(Icons.chevron_right),                // ukuran aslinya
      ],
    );
  }
}`,

    python: String.raw`# ============================================
# MODEL mekanisme Flutter, dengan Python
#
# Dart tidak terpasang, jadi kode Flutter di tab
# sebelah tidak bisa dijalankan. Berkas ini menirukan
# mekanismenya supaya bisa dibuktikan.
# ============================================


# --------------------------------------------
# 1. Kenapa Widget dan State dipisah
# --------------------------------------------
class WidgetSalah:
    """Keadaan disimpan DI DALAM widget -- ikut hilang."""
    def __init__(self):
        self.jumlah = 0

    def tambah(self):
        self.jumlah += 1


class StateTerpisah:
    """Keadaan disimpan di objek yang TIDAK dibuang."""
    def __init__(self):
        self.jumlah = 0


class WidgetBenar:
    """Widget cuma resep; State dipegang kerangka kerja."""
    def __init__(self, state):
        self.state = state

    def tambah(self):
        self.state.jumlah += 1


print("--- kenapa Widget dan State dipisah ---")
print("  Flutter MEMBUANG objek widget tiap kali build() jalan.")
print("")

# yang salah: widget dibuat ulang -> keadaan hilang
w = WidgetSalah()
w.tambah(); w.tambah(); w.tambah()
print("  keadaan di dalam widget : %d" % w.jumlah)
w = WidgetSalah()                        # build() jalan lagi
print("  setelah build() ulang   : %d   <-- HILANG" % w.jumlah)

# yang benar: State bertahan
s = StateTerpisah()
wb = WidgetBenar(s)
wb.tambah(); wb.tambah(); wb.tambah()
print("")
print("  keadaan di objek State  : %d" % s.jumlah)
wb = WidgetBenar(s)                      # build() jalan lagi
print("  setelah build() ulang   : %d   <-- BERTAHAN" % s.jumlah)

print("")
print("  Widget di Flutter BUKAN benda di layar -- ia RESEP.")
print("  Menyimpan sesuatu di objek yang dirancang untuk dibuang")
print("  berarti kehilangan sesuatu itu.")


# --------------------------------------------
# 2. setState: Flutter perlu diberi tahu
# --------------------------------------------
class LayarFlutter:
    def __init__(self):
        self.jumlah = 0
        self.digambar = 0
        self.terlihat = 0

    def build(self):
        self.digambar += 1
        self.terlihat = self.jumlah
        return "Jumlah: %d" % self.terlihat

    def set_state(self, ubah):
        ubah()
        self.build()          # setState memicu build ulang


class LayarCompose:
    """Compose: mutableStateOf mengawasi dirinya sendiri."""
    def __init__(self):
        self._jumlah = 0
        self.digambar = 0
        self.terlihat = 0
        self.build()

    @property
    def jumlah(self):
        return self._jumlah

    @jumlah.setter
    def jumlah(self, nilai):
        if nilai != self._jumlah:
            self._jumlah = nilai
            self.build()      # OTOMATIS, tanpa dipanggil
    def build(self):
        self.digambar += 1
        self.terlihat = self._jumlah


print("")
print("--- setState vs mutableStateOf ---")

f = LayarFlutter(); f.build()
print("  FLUTTER, lupa memanggil setState:")
f.jumlah += 1
f.jumlah += 1
print("      nilai sebenarnya : %d" % f.jumlah)
print("      yang TERLIHAT    : %d   <-- layar tidak berubah!" % f.terlihat)

f2 = LayarFlutter(); f2.build()
print("")
print("  FLUTTER, dengan setState:")
f2.set_state(lambda: setattr(f2, "jumlah", f2.jumlah + 1))
f2.set_state(lambda: setattr(f2, "jumlah", f2.jumlah + 1))
print("      nilai sebenarnya : %d" % f2.jumlah)
print("      yang TERLIHAT    : %d" % f2.terlihat)

c = LayarCompose()
print("")
print("  COMPOSE, tanpa memanggil apa pun:")
c.jumlah += 1
c.jumlah += 1
print("      nilai sebenarnya : %d" % c.jumlah)
print("      yang TERLIHAT    : %d" % c.terlihat)

print("")
print("  Inilah kesalahan pemula Flutter yang paling sering:")
print("  datanya berubah, layarnya tidak. Tidak ada galat,")
print("  tidak ada peringatan -- cuma tombol yang terasa mati.")


# --------------------------------------------
# 3. Semuanya widget: pohon jadi lebih dalam
# --------------------------------------------
def kedalaman(pohon, tingkat=0):
    hasil = [(tingkat, pohon[0])]
    for anak in pohon[1]:
        hasil += kedalaman(anak, tingkat + 1)
    return hasil


FLUTTER = ("Card", [("Padding", [("Column", [
    ("Text(nama)", []),
    ("SizedBox", []),
    ("Text(nim)", []),
    ("SizedBox", []),
    ("Row", [("Text(IPK)", []), ("Text(nilai)", [])]),
])])])

COMPOSE = ("Card(Modifier.padding)", [("Column(Modifier.padding)", [
    ("Text(nama)", []),
    ("Spacer", []),
    ("Text(nim)", []),
    ("Spacer", []),
    ("Row(Modifier.fillMaxWidth)", [("Text(IPK)", []), ("Text(nilai)", [])]),
])])

print("")
print("--- 'semuanya widget': pohonnya lebih dalam ---")
for nama, pohon in [("FLUTTER", FLUTTER), ("COMPOSE", COMPOSE)]:
    isi = kedalaman(pohon)
    print("")
    print("  " + nama + " (kedalaman maksimum %d):"
          % max(t for t, _ in isi))
    for tingkat, simpul in isi:
        print("      " + "  " * tingkat + simpul)

print("")
print("  Di Flutter, JARAK pun berupa widget (Padding).")
print("  Di Compose, ia bagian dari rantai Modifier.")
print("")
print("  Itulah kenapa pemula merasa Flutter 'banyak sekali")
print("  kurung kurawal'. Sisi baiknya: cuma ada SATU gagasan")
print("  yang perlu dipelajari -- semuanya widget.")


# --------------------------------------------
# 4. Expanded: membagi ruang sisa
# --------------------------------------------
def bagi_ruang(total, anak):
    """anak: (nama, flex) -- flex 0 berarti pakai ukuran aslinya."""
    tetap = sum(u for _, f, u in anak if f == 0)
    sisa = total - tetap
    total_flex = sum(f for _, f, _ in anak)
    hasil = []
    for nama, f, u in anak:
        lebar = u if f == 0 else int(sisa * f / total_flex)
        hasil.append((nama, lebar))
    return hasil


print("")
print("--- Expanded: membagi ruang sisa ---")
ANAK = [("Nama (flex 2)", 2, 0), ("IPK (flex 1)", 1, 0),
        ("Ikon (tetap)", 0, 24)]
print("  lebar layar: 360")
for nama, lebar in bagi_ruang(360, ANAK):
    batang = "#" * (lebar // 8)
    print("  " + nama.ljust(18) + str(lebar).rjust(5) + "  " + batang)

print("")
print("  Ikon memakai ukuran aslinya (24), lalu sisanya (336)")
print("  dibagi 2:1 antara Nama dan IPK.")


# --------------------------------------------
# 5. Membandingkan Compose dan Flutter
# --------------------------------------------
print("")
print("--- Compose vs Flutter ---")
BANDING = [
    ("Bahasa",             "Kotlin",              "Dart"),
    ("Cara menggambar",    "komponen asli Android","melukis tiap piksel"),
    ("Tampilan lintas OS", "mengikuti gaya OS",   "identik di mana pun"),
    ("Memicu gambar ulang","OTOMATIS (mutableStateOf)", "setState() manual"),
    ("Mengatur tampilan",  "rantai Modifier",     "widget pembungkus"),
    ("Daftar panjang",     "LazyColumn",          "ListView.builder"),
    ("Keadaan bersama",    "ViewModel",           "Provider / Riverpod / BLoC"),
    ("Peron yang didukung","Android (+ multiplatform)",
     "Android, iOS, web, desktop"),
]
print("  " + "hal".ljust(21) + "Compose".ljust(28) + "Flutter")
for hal, k, f in BANDING:
    print("  " + hal.ljust(21) + k.ljust(28) + f)

print("")
print("  Yang SAMA: keduanya deklaratif, keduanya punya keadaan")
print("  yang memicu gambar ulang, keduanya memisahkan komponen")
print("  bernilai dari komponen berkeadaan.")
print("")
print("  Karena gagasan pokoknya sama, berpindah dari satu ke")
print("  lain JAUH lebih mudah daripada belajar dari nol --")
print("  dan itu sebabnya mata kuliah ini mengajarkan keduanya")
print("  berurutan, bukan memilih salah satu.")`
  },

  output: `--- kenapa Widget dan State dipisah ---
  Flutter MEMBUANG objek widget tiap kali build() jalan.

  keadaan di dalam widget : 3
  setelah build() ulang   : 0   <-- HILANG

  keadaan di objek State  : 3
  setelah build() ulang   : 3   <-- BERTAHAN

  Widget di Flutter BUKAN benda di layar -- ia RESEP.
  Menyimpan sesuatu di objek yang dirancang untuk dibuang
  berarti kehilangan sesuatu itu.

--- setState vs mutableStateOf ---
  FLUTTER, lupa memanggil setState:
      nilai sebenarnya : 2
      yang TERLIHAT    : 0   <-- layar tidak berubah!

  FLUTTER, dengan setState:
      nilai sebenarnya : 2
      yang TERLIHAT    : 2

  COMPOSE, tanpa memanggil apa pun:
      nilai sebenarnya : 2
      yang TERLIHAT    : 2

  Inilah kesalahan pemula Flutter yang paling sering:
  datanya berubah, layarnya tidak. Tidak ada galat,
  tidak ada peringatan -- cuma tombol yang terasa mati.

--- 'semuanya widget': pohonnya lebih dalam ---

  FLUTTER (kedalaman maksimum 4):
      Card
        Padding
          Column
            Text(nama)
            SizedBox
            Text(nim)
            SizedBox
            Row
              Text(IPK)
              Text(nilai)

  COMPOSE (kedalaman maksimum 3):
      Card(Modifier.padding)
        Column(Modifier.padding)
          Text(nama)
          Spacer
          Text(nim)
          Spacer
          Row(Modifier.fillMaxWidth)
            Text(IPK)
            Text(nilai)

  Di Flutter, JARAK pun berupa widget (Padding).
  Di Compose, ia bagian dari rantai Modifier.

  Itulah kenapa pemula merasa Flutter 'banyak sekali
  kurung kurawal'. Sisi baiknya: cuma ada SATU gagasan
  yang perlu dipelajari -- semuanya widget.

--- Expanded: membagi ruang sisa ---
  lebar layar: 360
  Nama (flex 2)       224  ############################
  IPK (flex 1)        112  ##############
  Ikon (tetap)         24  ###

  Ikon memakai ukuran aslinya (24), lalu sisanya (336)
  dibagi 2:1 antara Nama dan IPK.

--- Compose vs Flutter ---
  hal                  Compose                     Flutter
  Bahasa               Kotlin                      Dart
  Cara menggambar      komponen asli Android       melukis tiap piksel
  Tampilan lintas OS   mengikuti gaya OS           identik di mana pun
  Memicu gambar ulang  OTOMATIS (mutableStateOf)   setState() manual
  Mengatur tampilan    rantai Modifier             widget pembungkus
  Daftar panjang       LazyColumn                  ListView.builder
  Keadaan bersama      ViewModel                   Provider / Riverpod / BLoC
  Peron yang didukung  Android (+ multiplatform)   Android, iOS, web, desktop

  Yang SAMA: keduanya deklaratif, keduanya punya keadaan
  yang memicu gambar ulang, keduanya memisahkan komponen
  bernilai dari komponen berkeadaan.

  Karena gagasan pokoknya sama, berpindah dari satu ke
  lain JAUH lebih mudah daripada belajar dari nol --
  dan itu sebabnya mata kuliah ini mengajarkan keduanya
  berurutan, bukan memilih salah satu.`,

  kesalahanUmum: [
    {
      salah: 'Mengubah nilai keadaan tanpa membungkusnya dengan setState.',
      kenapa: 'Flutter tidak mengawasi perubahan nilai sendiri, sehingga nilainya memang berubah tetapi build tidak pernah dipanggil lagi dan layar tetap menampilkan yang lama. Tidak ada galat maupun peringatan, sehingga tombolnya sekadar terasa mati.',
      benar: 'Bungkus setiap perubahan yang memengaruhi tampilan di dalam setState, dan ingat bahwa yang memicu gambar ulang adalah pemanggilannya, bukan isinya.'
    },
    {
      salah: 'Menaruh panggilan jaringan atau pekerjaan berat di dalam setState.',
      kenapa: 'setState dimaksudkan hanya untuk menandai bahwa keadaan berubah, dan Flutter langsung menjadwalkan gambar ulang sesudahnya. Pekerjaan berat di dalamnya menahan penggambaran dan membuat antarmuka tersendat.',
      benar: 'Lakukan pekerjaan beratnya lebih dulu secara asinkron, lalu panggil setState hanya untuk menetapkan hasilnya.'
    },
    {
      salah: 'Menyimpan keadaan di dalam kelas StatefulWidget, bukan di kelas State.',
      kenapa: 'Objek widget di Flutter adalah resep sekali pakai yang dibuang dan dibuat ulang setiap kali build berjalan. Apa pun yang disimpan di sana ikut hilang, sedangkan objek State dipegang kerangka kerja dan bertahan.',
      benar: 'Taruh seluruh nilai yang harus diingat di kelas State, dan biarkan kelas widget hanya menampung parameter yang tidak berubah.'
    },
    {
      salah: 'Memakai ListView biasa dengan children untuk daftar yang panjang.',
      kenapa: 'ListView dengan children membangun seluruh butirnya sekaligus, sama seperti Column, sehingga daftar ribuan butir membuat ribuan widget padahal cuma belasan yang terlihat.',
      benar: 'Pakai ListView.builder dengan itemCount dan itemBuilder, sehingga hanya butir yang terlihat yang dibangun.'
    },
    {
      salah: 'Mengharapkan aplikasi Flutter otomatis mengikuti perubahan gaya sistem operasi.',
      kenapa: 'Flutter menggambar sendiri setiap piksel lewat mesin grafisnya dan tidak memakai komponen bawaan sistem. Ketika sistem operasi memperbarui gaya tombol atau dialognya, aplikasi Flutter tetap menggambar yang lama sampai pustakanya diperbarui.',
      benar: 'Sadari bahwa tampilan identik lintas peron adalah pilihan, bukan kebetulan, dan perbarui pustaka Flutter secara berkala kalau ingin mengikuti gaya terbaru.'
    },
    {
      salah: 'Memakai setState untuk keadaan yang dipakai bersama oleh banyak layar.',
      kenapa: 'setState hanya menggambar ulang widget yang memilikinya, sehingga keadaan bersama harus diteruskan lewat banyak lapisan atau disalin di beberapa tempat. Keduanya membawa kembali masalah tampilan yang tidak sesuai data.',
      benar: 'Pakai pustaka manajemen keadaan seperti Provider, Riverpod, atau BLoC, yang menyelesaikan masalah yang sama dengan ViewModel di Android.'
    }
  ],

  analogi: `Bayangkan dua **rumah makan** yang menyajikan menu yang sama.

**Compose** adalah rumah makan yang **memesan bahan jadi dari pemasok setempat** — roti dari toko roti sebelah, saus dari pabrik lokal.

Hasilnya **terasa seperti masakan daerah itu**, karena bahannya memang dari sana. Kalau pemasok memperbaiki resep rotinya, rumah makan itu **ikut membaik tanpa berbuat apa-apa**.

Tetapi ia hanya bisa berdiri **di daerah yang punya pemasok itu**.

**Flutter** adalah rumah makan yang **membuat semuanya sendiri dari nol** — menggiling tepungnya, memanggang rotinya, meracik sausnya.

Hasilnya **sama persis di kota mana pun** ia dibuka. Cabang di Purwokerto dan di Singapura menyajikan rasa yang identik.

Tetapi kalau selera setempat berubah, ia **tidak ikut berubah sendiri**. Ada yang harus memperbarui resepnya.

Sekarang **kenapa Widget dipisah dari State**.

Bayangkan **daftar pesanan** di dapur. Kertas pesanannya **dibuang setelah masakan jadi** — itu memang tujuannya, sekali pakai.

Sekarang bayangkan seseorang menulis **jumlah stok telur** di pojok kertas pesanan itu.

Kertasnya dibuang. **Catatan stoknya ikut hilang.**

Itulah kenapa Flutter memisahkan keduanya: **kertas pesanan** adalah Widget — sekali pakai, dibuat ulang terus. **Papan stok di dinding** adalah State — tetap di sana.

Terakhir, **kenapa \`setState\` harus dipanggil**.

Bayangkan kamu **mengubah angka di papan stok** dari 30 menjadi 12.

Angkanya berubah. Tetapi **koki yang sedang memasak tidak melihatnya** — ia sedang menghadap kompor.

Di dapur **Flutter**, kamu harus **memanggil koki** dan bilang *"papannya berubah, lihat lagi."* Itulah \`setState\`.

Di dapur **Compose**, papannya **berbunyi sendiri** setiap kali diubah.

Dan inilah yang membuat kesalahannya begitu sering terjadi di Flutter: kalau kamu lupa memanggil koki, **tidak ada yang salah**. Papannya benar. Angkanya benar. Kokinya cuma **belum melihatnya** — dan ia terus memasak dengan angka lama.`,

  latihan: [
    'Jelaskan perbedaan mendasar cara Compose dan Flutter sampai ke layar, dan sebutkan dua akibat dari perbedaan itu.',
    'Sebutkan empat hal yang perlu diketahui tentang bahasa Dart, beserta contoh singkat masing-masing.',
    'Jelaskan maksud pernyataan bahwa di Flutter semuanya adalah widget, dan apa akibatnya bagi bentuk pohon widget.',
    'Jelaskan kenapa StatefulWidget dipisah menjadi dua kelas, dan apa yang terjadi kalau keadaan disimpan di kelas yang salah.',
    'Jelaskan apa yang dilakukan setState, dan kenapa lupa memanggilnya adalah kesalahan pemula yang paling sering terjadi.',
    'Tulis StatelessWidget bernama KartuBuku yang menampilkan judul, penulis, dan tahun terbit.',
    'Ubah widget Penghitung pada materi ini agar punya tombol kurang, dan pastikan nilainya tidak bisa turun di bawah nol.',
    'Buat tabel perbandingan Compose dan Flutter untuk sedikitnya enam hal, dan tandai mana yang sama dan mana yang berbeda.',
    'Jelaskan kapan setState tidak lagi memadai, dan sebutkan padanan ViewModel di dunia Flutter.'
  ]
});


/* ============================================================
   Tambahan Pemrograman Mobile & Kewirausahaan — menutup pokok
   bahasan dari rencana pembelajaran yang belum tercakup:
     - Arsitektur aplikasi (ViewModel & Data Layer) + Navigation
     - Networking (REST API) + strategi deployment
     - Kepemimpinan (pertemuan 7) & Etika Bisnis (pertemuan 8)

   Kotlin dan Dart tidak terpasang di mesin ini, jadi kode
   kedua bahasa itu TIDAK dieksekusi. Keluaran yang tertera
   berasal dari model Python yang dijalankan sungguhan.
   ============================================================ */

TOPICS.push({
  id: 'mobile-arsitektur-navigasi',
  judul: 'Arsitektur Aplikasi & Navigasi',
  kategori: 'mobile',
  tag: ['ViewModel', 'Repository', 'data layer', 'Navigation Compose', 'back stack', 'UDF', 'single source of truth'],
  ringkas: 'Menekan Kembali dari beranda mengembalikanmu ke layar login yang sudah dilewati. Itu bukan bug kecil.',

  fungsi: `**Menyusun aplikasi berbilang layar supaya datanya tetap satu dan tombol Kembali berperilaku benar.**

Terpakai di:

- **Aplikasi apa pun** yang lebih dari satu layar
- **Tugas mata kuliah** — Navigation Compose ada di rencana pertemuan
- **Menghindari data basi** yang tampil di layar detail
- **Membuat kode yang bisa diuji** tanpa menjalankan perangkat

Yang paling sering jadi cacat dan paling mudah dihindari: **menekan Kembali setelah login mengembalikan pengguna ke layar login.**

Satu baris \`popUpTo\` menghapusnya. Tanpa itu, aplikasinya terasa rusak meski tidak ada galat apa pun.

Dan satu kaidah yang menjaga data tetap benar: **kirim ID, bukan objek.** Objek yang dikirim adalah salinan yang tidak pernah menyegarkan diri — dan sekarang ada dua kebenaran di aplikasimu.`,

  praktik: {
    tujuan: `Kamu punya aplikasi berbilang layar dengan satu sumber kebenaran dan back stack yang berperilaku benar.`,
    alat: [
      'Android Studio',
      'Emulator',
      'Ketergantungan navigation-compose dan lifecycle-viewmodel-compose'
    ],
    langkah: [
      { judul: 'Buat repository lebih dulu, sebelum layar kedua',
        isi: `Pindahkan semua pengambilan data ke satu kelas Repository.

Uji aturannya: **Repository tidak boleh mengenal layar mana pun**. Kalau ia mengenalnya, ia tidak bisa dipakai layar kedua.` },
      { judul: 'Buktikan perlunya satu sumber kebenaran',
        isi: `Buat dua layar yang sama-sama memanggil API secara langsung, lalu segarkan salah satunya.

Perhatikan keduanya kini menampilkan angka berbeda, dan tidak ada yang bisa disebut benar.

Lalu ubah keduanya membaca dari repository, dan lihat masalahnya hilang.` },
      { judul: 'Ganti tiga variabel dengan satu tipe tertutup',
        isi: `Kalau ViewModel-mu punya \`isLoading\`, \`data\`, dan \`error\` terpisah, daftar semua kombinasinya.

Delapan kombinasi, empat yang berarti. Ubah menjadi satu \`sealed interface\` berisi Memuat, Berhasil, Gagal, dan Kosong.

Sekarang keempat keadaan mustahil itu **tidak bisa ditulis lagi**.` },
      { judul: 'Pasang NavHost dengan rute berupa teks',
        isi: `Daftarkan tiap tujuan dengan \`composable("nama")\`, dan argumen dengan \`composable("detail/{id}")\`.

Mulai dari dua layar saja. Menambah layar ketiga jadi sepele setelah polanya benar.` },
      { judul: 'Kirim ID, lalu buktikan kenapa',
        isi: `Coba dulu yang salah: kirim objek lengkap ke layar detail. Ubah datanya dari layar lain, lalu buka detail lagi.

Data lamanya muncul. Sekarang ganti dengan mengirim ID dan biarkan layar detail membaca sendiri — dan masalahnya hilang.` },
      { judul: 'Perhatikan back stack tumbuh',
        isi: `Bolak-balik daftar dan detail tiga kali, lalu tekan Kembali berulang sampai keluar.

Hitung berapa kali kamu harus menekan. Tiap layar di tumpukan masih memegang memorinya.` },
      { judul: 'Bereskan dengan popUpTo',
        isi: `Untuk alur masuk:

- \`navigate("beranda") { popUpTo("login") { inclusive = true } }\`

Uji: setelah login berhasil, tekan Kembali sekali. Aplikasinya harus **keluar**, bukan kembali ke login.` },
      { judul: 'Pisahkan ViewModel dari Android',
        isi: `Periksa ViewModel-mu tidak mengimpor apa pun dari \`android.content\` atau \`android.view\`.

Kalau bersih, ia bisa diuji tanpa perangkat — dan itu bukti rancangannya benar, bukan sekadar kemudahan.` }
    ],
    cek: [
      'Repository-mu tidak mengenal satu layar pun',
      'Menekan Kembali setelah login langsung keluar dari aplikasi',
      'Layar detail selalu menampilkan data terbaru meski diubah dari layar lain'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa hanya ID yang boleh dikirim antar layar',

  konsep: `
Aplikasi yang lebih dari satu layar butuh dua hal yang sering dianggap urusan lanjutan, padahal keduanya menentukan sejak awal: **di mana data tinggal**, dan **bagaimana layar berpindah**.

**Tiga lapis**

- **UI Layer** — Composable dan ViewModel. Menampilkan keadaan, mengirim peristiwa.
- **Domain Layer** — *Use Case*, boleh tidak ada. Aturan bisnis yang dipakai ulang banyak layar.
- **Data Layer** — Repository dan sumber datanya. **Satu sumber kebenaran** untuk tiap jenis data.

Aturan arahnya satu: **lapis atas boleh mengenal lapis bawah, tidak sebaliknya.**

Repository tidak pernah tahu ada layar. Kalau ia tahu, ia tidak bisa dipakai layar kedua — dan seluruh gunanya hilang.

**Aliran data satu arah**

**Keadaan turun, peristiwa naik.**

- ViewModel memancarkan \`StateFlow\`; UI menggambar apa yang dipancarkan
- UI memanggil fungsi di ViewModel saat pengguna berbuat sesuatu
- UI **tidak pernah** memanggil jaringan, dan **tidak pernah** menyimpan salinan datanya sendiri

Kalau UI menyimpan salinan, kamu punya dua kebenaran, dan keduanya akan berbeda suatu hari.

**Repository dan satu sumber kebenaran**

Repository memutuskan data datang dari mana: jaringan, basis data lokal, atau cache. Bagian lain tidak perlu tahu.

Kalau dua layar memanggil API yang sama secara langsung, mereka akan menampilkan angka yang berbeda saat salah satunya lebih dulu menyegarkan. Dengan repository, keduanya membaca sumber yang sama.

**Keadaan mustahil harus mustahil ditulis**

Tiga variabel terpisah untuk *memuat*, *data*, dan *galat* memberi **delapan** kombinasi, dan hanya **empat** yang berarti. Empat sisanya bug yang menunggu — misalnya menampilkan data lama bersama pesan galat.

Satu \`sealed interface\` berisi empat kemungkinan membuat keempat kombinasi mustahil itu **tidak bisa ditulis**. Ini cara memperbaiki cacat dengan menghapus tempatnya bersembunyi, bukan dengan mengingat untuk menghindarinya.

**Navigation Compose**

Satu \`NavHost\` memuat daftar tujuan; tiap tujuan punya **rute** berupa teks.

- \`navController.navigate("detail/123")\` — pindah
- \`composable("detail/{id}")\` — mendaftarkan tujuan beserta argumennya
- \`navController.popBackStack()\` — kembali

**Back stack adalah tumpukan**, dan ia tumbuh setiap kali \`navigate\` dipanggil.

Kalau pengguna bolak-balik daftar → detail → daftar → detail, tumpukannya memanjang terus. Menekan Kembali harus dilakukan berkali-kali untuk keluar, dan tiap layar di tumpukan masih memegang memorinya.

**popUpTo** membereskannya:

\`navigate("beranda") { popUpTo("login") { inclusive = true } }\`

Ini membuang layar login dari tumpukan sekalian. Tanpa itu, menekan Kembali dari beranda **mengembalikan pengguna ke layar login yang sudah dilewati** — cacat yang sangat sering terjadi dan sangat mudah dihindari.

**Kirim ID, bukan objek**

Argumen navigasi hanya boleh berisi **penanda**, bukan objek utuh.

Objek yang dikirim akan **basi**: layar detail menampilkan data lama meski sumbernya sudah berubah. Kirim ID, lalu biarkan layar detail membaca sendiri dari repository — supaya satu sumber kebenaran tetap satu.

**Padanan di Flutter**

Gagasannya sama, namanya berbeda: \`Navigator.push\` dan \`Navigator.pop\` untuk tumpukan, \`go_router\` untuk rute berbasis teks, dan Provider, Riverpod, atau Bloc untuk peran ViewModel. Yang berpindah antar peron bukan kodenya, melainkan **caranya berpikir**.
`,

  logicSyntax: [
    {
      bahasa: 'kotlin',
      kode: '// SATU NavHost, RUTE BERUPA TEKS\n\nNavHost(navController, startDestination = "daftar") {\n\n    composable("daftar") {\n        LayarDaftar(onKlik = { id ->\n            navController.navigate("detail/" + id)   // kirim ID\n        })\n    }\n\n    composable("detail/{id}") { entri ->\n        val id = entri.arguments?.getString("id")\n        LayarDetail(id = id)                          // baca sendiri\n    }\n}\n\n// Setelah login berhasil: buang login dari tumpukan\nnavController.navigate("beranda") {\n    popUpTo("login") { inclusive = true }\n}',
      penjelasan: `
Dua keputusan kecil di kode ini menentukan apakah aplikasimu terasa benar atau terasa aneh, dan keduanya mudah dilewatkan.

**Keputusan pertama: yang dikirim hanya ID.**

Godaannya besar untuk mengirim objek lengkap. Layar daftar sudah punya objek \`Mahasiswa\` di tangan; mengirimnya menghemat satu pembacaan, dan layar detail langsung bisa menggambar tanpa menunggu.

Masalahnya muncul kemudian, dan tidak pernah terasa seperti akibat dari keputusan ini.

Pengguna membuka detail dari daftar. Ia mengubah nomor teleponnya di layar lain. Ia kembali ke daftar, lalu membuka detail yang sama lagi. **Nomor lamanya muncul** — karena objek yang tersimpan di argumen navigasi adalah salinan yang dibuat saat pertama kali dikirim, dan tidak ada yang memperbaruinya.

Sekarang ada dua kebenaran di aplikasimu: yang di repository, dan yang menempel di back stack. Yang kedua tidak punya pemilik dan tidak pernah menyegarkan diri.

Dengan mengirim ID saja, layar detail **membaca sendiri** setiap kali ia dibuka. Data yang tampil selalu yang terbaru, karena ia selalu datang dari satu tempat yang sama.

Ada alasan teknis tambahan: argumen navigasi disimpan sebagai teks di dalam rute. Objek besar tidak muat, dan memaksanya masuk lewat serialisasi membuat rute panjang, rapuh, dan sulit dibaca saat dicatat ke log.

**Keputusan kedua: popUpTo pada alur masuk.**

Tanpanya, urutan tumpukan setelah login berhasil adalah \`splash > login > beranda\`.

Pengguna sudah masuk. Ia menekan tombol Kembali. Ia mendarat di **layar login** — layar yang secara logis sudah tidak berlaku baginya.

Apa yang ia lakukan sekarang? Ia mungkin masuk lagi, dan sekarang tumpukannya \`splash > login > beranda > login > beranda\`. Atau ia menekan Kembali lagi dan tiba di splash. Aplikasinya terasa rusak, meskipun tidak ada satu pun galat.

\`popUpTo("login") { inclusive = true }\` membuang login dari tumpukan sekalian dengan tujuan yang disebut. Sekarang tumpukannya cuma \`beranda\`, dan menekan Kembali **keluar dari aplikasi** — yang memang perilaku yang benar.

Kaidah yang bisa langsung dipakai: **setelah sebuah layar selesai tugasnya dan tidak boleh dikunjungi lagi, buang ia dari tumpukan.** Ini berlaku untuk splash, login, pendaftaran, dan layar pembayaran yang sudah berhasil.

Dan satu bentuk yang lebih halus dari masalah yang sama: bolak-balik daftar dan detail berkali-kali. Tanpa \`popUpTo\`, tiap kali kembali ke daftar akan **menumpuk salinan baru** daftar itu di atas yang lama. Setelah tiga putaran, tumpukannya berisi tujuh layar, empat di antaranya daftar yang sama — dan semuanya masih memegang memorinya.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Arsitektur aplikasi & navigasi (model Python)
# ============================================

# --------------------------------------------
# 1. Tiga lapis
# --------------------------------------------
print("--- tiga lapis arsitektur yang dianjurkan ---")
LAPIS = [
    ("UI Layer",     "Composable + ViewModel",
     "menampilkan keadaan, mengirim peristiwa"),
    ("Domain Layer", "Use Case (opsional)",
     "aturan bisnis yang dipakai ulang banyak layar"),
    ("Data Layer",   "Repository + sumber data",
     "SATU sumber kebenaran untuk tiap jenis data"),
]
for nama, isi, tugas in LAPIS:
    print("  " + nama.ljust(14) + isi)
    print("      " + tugas)
print("")
print("  Aturan arahnya: lapis atas boleh mengenal lapis")
print("  bawah, TIDAK sebaliknya. Repository tidak pernah")
print("  tahu ada layar; kalau ia tahu, ia tidak bisa")
print("  dipakai layar kedua.")

# --------------------------------------------
# 2. Aliran data satu arah
# --------------------------------------------
class ViewModel:
    """Keadaan turun, peristiwa naik."""
    def __init__(self, repo):
        self._repo = repo
        self.state = {"muat": False, "data": None, "galat": None}
        self._log = []

    def _pancar(self, **ubah):
        self.state = dict(self.state, **ubah)
        self._log.append(dict(self.state))

    def muat(self, kunci):                 # peristiwa NAIK dari UI
        self._pancar(muat=True, galat=None)
        try:
            self._pancar(muat=False, data=self._repo.ambil(kunci))
        except Exception as e:
            self._pancar(muat=False, galat=str(e))

class TidakAda(Exception):
    pass

class Repo:
    ISI = {"H1D024061": "Hafizh Naufal R."}
    def ambil(self, kunci):
        if kunci not in self.ISI:
            raise TidakAda("mahasiswa tidak ditemukan")
        return self.ISI[kunci]

print("")
print("--- aliran data satu arah ---")
vm = ViewModel(Repo())
vm.muat("H1D024061")
for i, s in enumerate(vm._log, 1):
    print("  keadaan " + str(i) + " : muat=" + str(s["muat"])
          + "  data=" + str(s["data"]) + "  galat=" + str(s["galat"]))
print("")
print("  UI cukup menggambar state yang terakhir dipancarkan.")
print("  Ia tidak pernah memanggil jaringan dan tidak pernah")
print("  menyimpan salinan datanya sendiri.")

print("")
print("--- sekarang gagal, dan perhatikan cacatnya ---")
vm._log.clear()
vm.muat("X999")
for i, s in enumerate(vm._log, 1):
    print("  keadaan " + str(i) + " : muat=" + str(s["muat"]))
    print("              data=" + str(s["data"]))
    print("              galat=" + str(s["galat"]))
print("")
print("  Keadaan terakhir memuat data DAN galat sekaligus.")
print("  Layar akan menampilkan nama lama beserta pesan")
print("  'tidak ditemukan' -- dua hal yang bertentangan.")
print("  Cacat ini tidak dilaporkan siapa pun, karena tidak")
print("  ada yang melarangnya.")

# --------------------------------------------
# 3. Keadaan mustahil dihapus oleh tipe tertutup
# --------------------------------------------
print("")
print("--- kenapa tiga boolean terpisah berbahaya ---")
print("  " + "muat".ljust(7) + "data".ljust(7) + "galat".ljust(8)
      + "masuk akal?")
for muat in (False, True):
    for ada in (False, True):
        for galat in (False, True):
            masuk = (muat and not ada and not galat) \
                    or (not muat and ada and not galat) \
                    or (not muat and not ada and galat) \
                    or (not muat and not ada and not galat)
            print("  " + str(muat).ljust(7) + str(ada).ljust(7)
                  + str(galat).ljust(8) + ("ya" if masuk else "TIDAK"))
print("")
print("  8 kombinasi, hanya 4 yang berarti. Dan bagian 2")
print("  barusan menghasilkan DUA di antara yang tidak masuk")
print("  akal: (muat, data) saat memuat ulang, lalu (data,")
print("  galat) di akhir. Keduanya tidak dilarang oleh apa")
print("  pun, jadi keduanya terjadi.")

# --------------------------------------------
# 3b. Tipe tertutup membuat keadaan mustahil tak bisa ditulis
# --------------------------------------------
class Memuat:  pass
class Berhasil:
    def __init__(self, data): self.data = data
class Gagal:
    def __init__(self, pesan): self.pesan = pesan
class Kosong: pass

class ViewModelAman:
    def __init__(self, repo):
        self._repo = repo
        self.state = Kosong()
        self._log = []
    def _pancar(self, s):
        self.state = s
        self._log.append(type(s).__name__)
    def muat(self, kunci):
        self._pancar(Memuat())
        try:
            self._pancar(Berhasil(self._repo.ambil(kunci)))
        except TidakAda as e:
            self._pancar(Gagal(str(e)))

print("")
print("--- versi dengan satu tipe tertutup ---")
vm2 = ViewModelAman(Repo())
vm2.muat("H1D024061")
print("  berhasil : " + " -> ".join(vm2._log))
vm2._log.clear()
vm2.muat("X999")
print("  gagal    : " + " -> ".join(vm2._log))
print("")
print("  Keadaan akhirnya Gagal, TITIK. Tidak ada data lama")
print("  yang menempel, karena tidak ada tempat untuk")
print("  menaruhnya. Cacat bagian 2 tidak bisa ditulis lagi.")

# --------------------------------------------
# 4. Back stack navigasi
# --------------------------------------------
class BackStack:
    def __init__(self, awal):
        self.tumpukan = [awal]
    def ke(self, rute, pop_sampai=None, inklusif=False):
        if pop_sampai is not None:
            while self.tumpukan:
                atas = self.tumpukan[-1]
                if atas == pop_sampai:
                    if inklusif:
                        self.tumpukan.pop()
                    break
                self.tumpukan.pop()
        self.tumpukan.append(rute)
    def kembali(self):
        if len(self.tumpukan) > 1:
            self.tumpukan.pop()
            return True
        return False          # keluar dari aplikasi
    def __str__(self):
        return " > ".join(self.tumpukan)

print("")
print("--- back stack tanpa popUpTo ---")
bs = BackStack("daftar")
for i in range(1, 4):
    bs.ke("detail/" + str(i))
    bs.ke("daftar")
print("  " + str(bs))
print("  kedalaman: " + str(len(bs.tumpukan)))
print("  Pengguna harus menekan Kembali "
      + str(len(bs.tumpukan) - 1) + " kali untuk keluar,")
print("  dan tiap 'daftar' di tumpukan adalah layar yang")
print("  masih memegang memorinya.")

print("")
print("--- dengan popUpTo(daftar) inklusif ---")
bs2 = BackStack("daftar")
for i in range(1, 4):
    bs2.ke("detail/" + str(i))
    bs2.ke("daftar", pop_sampai="daftar", inklusif=True)
print("  " + str(bs2))
print("  kedalaman: " + str(len(bs2.tumpukan)))

print("")
print("--- alur masuk: setelah login, jangan bisa kembali ---")
bs3 = BackStack("splash")
bs3.ke("login", pop_sampai="splash", inklusif=True)
print("  setelah login dibuka : " + str(bs3))
bs3.ke("beranda", pop_sampai="login", inklusif=True)
print("  setelah berhasil     : " + str(bs3))
print("  tekan Kembali        : "
      + ("masih di aplikasi" if bs3.kembali() else "KELUAR aplikasi"))
print("")
print("  Tanpa popUpTo, menekan Kembali dari beranda akan")
print("  mengembalikan pengguna ke layar login yang sudah")
print("  dilewati -- cacat yang sangat sering terjadi.")

# --------------------------------------------
# 5. Kirim ID, bukan objek
# --------------------------------------------
print("")
print("--- apa yang boleh dikirim antar layar ---")
CARA = [
    ("detail/{id}",              "ID saja", "BENAR"),
    ("detail?nama=..&ipk=..",    "beberapa nilai kecil", "boleh"),
    ("objek Mahasiswa lengkap",  "seluruh objek", "SALAH"),
]
for rute, isi, nilai in CARA:
    print("  " + rute.ljust(28) + isi.ljust(24) + nilai)
print("")
print("  Objek yang dikirim akan BASI: layar detail menampilkan")
print("  data lama meski sumbernya sudah berubah. Kirim ID,")
print("  lalu biarkan layar detail membaca sendiri dari")
print("  repository -- satu sumber kebenaran tetap satu.")` },
  output: `--- tiga lapis arsitektur yang dianjurkan ---
  UI Layer      Composable + ViewModel
      menampilkan keadaan, mengirim peristiwa
  Domain Layer  Use Case (opsional)
      aturan bisnis yang dipakai ulang banyak layar
  Data Layer    Repository + sumber data
      SATU sumber kebenaran untuk tiap jenis data

  Aturan arahnya: lapis atas boleh mengenal lapis
  bawah, TIDAK sebaliknya. Repository tidak pernah
  tahu ada layar; kalau ia tahu, ia tidak bisa
  dipakai layar kedua.

--- aliran data satu arah ---
  keadaan 1 : muat=True  data=None  galat=None
  keadaan 2 : muat=False  data=Hafizh Naufal R.  galat=None

  UI cukup menggambar state yang terakhir dipancarkan.
  Ia tidak pernah memanggil jaringan dan tidak pernah
  menyimpan salinan datanya sendiri.

--- sekarang gagal, dan perhatikan cacatnya ---
  keadaan 1 : muat=True
              data=Hafizh Naufal R.
              galat=None
  keadaan 2 : muat=False
              data=Hafizh Naufal R.
              galat=mahasiswa tidak ditemukan

  Keadaan terakhir memuat data DAN galat sekaligus.
  Layar akan menampilkan nama lama beserta pesan
  'tidak ditemukan' -- dua hal yang bertentangan.
  Cacat ini tidak dilaporkan siapa pun, karena tidak
  ada yang melarangnya.

--- kenapa tiga boolean terpisah berbahaya ---
  muat   data   galat   masuk akal?
  False  False  False   ya
  False  False  True    ya
  False  True   False   ya
  False  True   True    TIDAK
  True   False  False   ya
  True   False  True    TIDAK
  True   True   False   TIDAK
  True   True   True    TIDAK

  8 kombinasi, hanya 4 yang berarti. Dan bagian 2
  barusan menghasilkan DUA di antara yang tidak masuk
  akal: (muat, data) saat memuat ulang, lalu (data,
  galat) di akhir. Keduanya tidak dilarang oleh apa
  pun, jadi keduanya terjadi.

--- versi dengan satu tipe tertutup ---
  berhasil : Memuat -> Berhasil
  gagal    : Memuat -> Gagal

  Keadaan akhirnya Gagal, TITIK. Tidak ada data lama
  yang menempel, karena tidak ada tempat untuk
  menaruhnya. Cacat bagian 2 tidak bisa ditulis lagi.

--- back stack tanpa popUpTo ---
  daftar > detail/1 > daftar > detail/2 > daftar > detail/3 > daftar
  kedalaman: 7
  Pengguna harus menekan Kembali 6 kali untuk keluar,
  dan tiap 'daftar' di tumpukan adalah layar yang
  masih memegang memorinya.

--- dengan popUpTo(daftar) inklusif ---
  daftar
  kedalaman: 1

--- alur masuk: setelah login, jangan bisa kembali ---
  setelah login dibuka : login
  setelah berhasil     : beranda
  tekan Kembali        : KELUAR aplikasi

  Tanpa popUpTo, menekan Kembali dari beranda akan
  mengembalikan pengguna ke layar login yang sudah
  dilewati -- cacat yang sangat sering terjadi.

--- apa yang boleh dikirim antar layar ---
  detail/{id}                 ID saja                 BENAR
  detail?nama=..&ipk=..       beberapa nilai kecil    boleh
  objek Mahasiswa lengkap     seluruh objek           SALAH

  Objek yang dikirim akan BASI: layar detail menampilkan
  data lama meski sumbernya sudah berubah. Kirim ID,
  lalu biarkan layar detail membaca sendiri dari
  repository -- satu sumber kebenaran tetap satu.`,

  kesalahanUmum: [
    {
      salah: 'Mengirim objek lengkap sebagai argumen navigasi.',
      kenapa: 'Objek yang dikirim adalah salinan yang dibuat saat navigasi terjadi, dan tidak ada yang memperbaruinya. Setelah datanya berubah di tempat lain, layar tujuan tetap menampilkan salinan lama, dan aplikasinya kini punya dua kebenaran yang salah satunya tidak berpemilik.',
      benar: 'Kirim ID saja, lalu biarkan layar tujuan membaca sendiri dari repository setiap kali dibuka.'
    },
    {
      salah: 'Berpindah ke beranda setelah login tanpa popUpTo.',
      kenapa: 'Layar login tetap berada di back stack, sehingga menekan Kembali dari beranda mengembalikan pengguna ke layar yang secara logis sudah tidak berlaku baginya. Tidak ada galat yang muncul, tetapi aplikasinya terasa rusak.',
      benar: 'Pakai popUpTo dengan inclusive true untuk membuang layar yang sudah selesai tugasnya dari tumpukan.'
    },
    {
      salah: 'Menyimpan tiga variabel terpisah untuk memuat, data, dan galat.',
      kenapa: 'Tiga boolean memberi delapan kombinasi sementara hanya empat yang berarti, sehingga keadaan seperti data ada bersamaan dengan galat ada bisa terjadi tanpa dilarang apa pun. Layarnya lalu menampilkan data lama beserta pesan gagal.',
      benar: 'Nyatakan keadaan layar sebagai satu sealed interface berisi kemungkinan yang sah saja, sehingga keadaan mustahil tidak bisa ditulis.'
    },
    {
      salah: 'Memanggil API langsung dari beberapa layar tanpa melewati repository.',
      kenapa: 'Tiap layar menyimpan hasilnya sendiri, sehingga dua layar bisa menampilkan angka yang berbeda ketika salah satunya lebih dulu menyegarkan. Tidak ada satu tempat pun yang bisa disebut sebagai jawaban yang benar.',
      benar: 'Letakkan seluruh pengambilan data di repository, dan biarkan tiap layar membaca dari sana.'
    },
    {
      salah: 'Memberi ViewModel akses ke Context atau View.',
      kenapa: 'ViewModel hidup lebih lama daripada Activity, sehingga memegang Context berarti menahan objek yang sudah mati dan membocorkan memorinya. Selain itu ViewModel jadi tidak bisa diuji tanpa menjalankan perangkat.',
      benar: 'Kirim yang dibutuhkan lewat parameter atau injeksi, dan biarkan ViewModel hanya mengenal data dan aturan.'
    },
    {
      salah: 'Membiarkan back stack tumbuh setiap kali pengguna bolak-balik antar dua layar.',
      kenapa: 'Tiap pemanggilan navigate menumpuk layar baru, sehingga setelah beberapa putaran tumpukannya berisi banyak salinan layar yang sama dan semuanya masih memegang memorinya. Pengguna juga harus menekan Kembali berkali-kali untuk keluar.',
      benar: 'Gunakan popUpTo saat kembali ke layar yang sudah ada di tumpukan, atau pakai popBackStack alih-alih navigate.'
    }
  ],

  analogi: `Bayangkan **tumpukan nampan di kantin**.

Tiap kali kamu pindah layar, satu nampan ditaruh di atas. Tiap kali menekan Kembali, satu nampan diangkat.

Kalau kamu bolak-balik daftar-menu dan detail-makanan lima kali, ada **sebelas nampan** di tumpukan. Untuk keluar dari kantin, kamu harus mengangkatnya satu per satu.

Dan tiap nampan itu **masih ada isinya** — masih memakan tempat, masih harus dicuci.

\`popUpTo\` adalah instruksi *"sebelum menaruh nampan ini, angkat dulu sampai nampan daftar-menu"*. Tumpukannya tidak pernah tumbuh.

Sekarang bagian ID versus objek.

Bayangkan nampan detail-makanan itu membawa **foto makanan** yang diambil saat kamu memilihnya. Kamu kembali, penjualnya mengganti menunya, kamu buka lagi nampan yang sama — dan fotonya **masih yang lama**.

Alternatifnya: nampannya cuma membawa **nomor menu**. Setiap kali dibuka, ia melihat ke papan menu yang asli.

Papan menu bisa berubah kapan saja, dan nampan yang cuma membawa nomor **selalu benar**.`,

  latihan: [
    'Sebutkan tiga lapis arsitektur yang dianjurkan beserta tugas masing-masing, dan jelaskan aturan arah ketergantungannya.',
    'Jelaskan maksud keadaan turun dan peristiwa naik, lalu jelaskan kenapa UI tidak boleh menyimpan salinan datanya sendiri.',
    'Daftar semua kombinasi dari tiga variabel memuat, data, dan galat, lalu tandai mana yang tidak masuk akal.',
    'Tulis ulang keadaan layar itu sebagai satu sealed interface, dan jelaskan kenapa keadaan mustahilnya jadi tidak bisa ditulis.',
    'Gambar isi back stack setelah pengguna bolak-balik daftar dan detail tiga kali, tanpa popUpTo dan dengan popUpTo.',
    'Tulis pemanggilan navigate untuk pindah ke beranda setelah login sehingga menekan Kembali langsung keluar dari aplikasi.',
    'Jelaskan dua alasan kenapa argumen navigasi sebaiknya hanya berisi ID, bukan objek lengkap.',
    'Sebutkan tiga jenis layar yang sebaiknya dibuang dari back stack setelah selesai tugasnya, beserta alasannya.',
    'Jelaskan kenapa ViewModel tidak boleh memegang Context, dan sebutkan dua akibatnya.',
    'Sebutkan padanan Navigation Compose, ViewModel, dan StateFlow di Flutter, lalu jelaskan bagian mana yang gagasannya sama.'
  ]
});


TOPICS.push({
  id: 'mobile-networking-rilis',
  judul: 'Networking, Offline & Rilis Aplikasi',
  kategori: 'mobile',
  tag: ['REST API', 'Retrofit', 'coroutine', 'offline-first', 'exponential backoff', 'APK', 'AAB', 'versionCode'],
  ringkas: 'Lima andaian tentang jaringan yang benar di emulator dan salah di tangan pengguna.',

  fungsi: `**Membuat aplikasi tetap berguna saat jaringan buruk, lalu menerbitkannya dengan benar.**

Terpakai di:

- **Hampir semua aplikasi** — sedikit yang tidak bicara dengan server
- **Tugas mata kuliah** — Networking dan deployment ada di rencana pertemuan
- **Menerbitkan aplikasi** ke Play Store atau App Store
- **Menghindari keluhan** yang tidak pernah muncul saat pengembangan

Yang paling banyak menemukan cacat dalam satu langkah: **matikan jaringan lalu uji ulang.**

Lima andaian tentang jaringan yang benar di emulator semuanya salah di tangan pengguna.

Dan satu hal yang tidak boleh hilang dari rencana rilismu: **cadangkan keystore-mu.** Kehilangannya berarti aplikasi yang sudah terbit tidak bisa diperbarui — selamanya.`,

  praktik: {
    tujuan: `Aplikasimu tetap berguna tanpa jaringan, memulihkan diri dengan sopan dari kegagalan, dan siap diunggah.`,
    alat: [
      'Android Studio',
      'Retrofit atau paket http',
      'Room atau sqflite',
      'Emulator'
    ],
    langkah: [
      { judul: 'Uji dengan jaringan dimatikan',
        isi: `Sebelum menambah apa pun, matikan jaringan emulator dan jalankan aplikasimu.

Catat apa yang terjadi. Biasanya: layar kosong, pemutar tanpa akhir, atau berhenti mendadak. Ketiganya cacat.` },
      { judul: 'Tangani ketiga keadaan',
        isi: `Tiap panggilan jaringan punya tiga akhir: **sedang memuat**, **berhasil**, **gagal**.

Yang ketiga butuh pesan jelas **dan** tombol coba lagi. Layar yang berputar selamanya adalah kegagalan yang tidak diberitahukan.` },
      { judul: 'Tambahkan jeda berlipat dengan acakan',
        isi: `Jangan mencoba lagi seketika, dan jangan pada jeda tetap.

- jeda berlipat: 1, 2, 4, 8, sampai batas
- acakan: ambil nilai acak antara nol dan jeda itu

Tanpa acakan, semua aplikasi mencoba lagi serentak dan server yang baru pulih roboh lagi.` },
      { judul: 'Pilih galat mana yang layak diulang',
        isi: `Tanyakan satu hal: **apakah penyebabnya bisa hilang dengan sendirinya?**

- **500, 503, timeout** → ya, ulangi
- **400, 401, 404** → jangan, akan gagal lagi dan membuang kuota pengguna` },
      { judul: 'Terapkan offline-first',
        isi: `Simpan hasilnya di Room atau sqflite, lalu jadikan penyimpanan lokal itu **sumber tampilan**.

Jaringan hanya menyegarkan. Buka aplikasimu tanpa jaringan: layarnya harus tetap terisi.` },
      { judul: 'Uji jaringan yang lambat, bukan cuma yang mati',
        isi: `Di emulator, atur kecepatan jaringan ke GPRS atau EDGE.

Yang mati mudah ditangani. Yang **lambat** lebih jahat: permintaan setengah jalan, timeout di tempat yang tidak diduga, dan pengguna menekan tombol dua kali.` },
      { judul: 'Buat keystore dan cadangkan',
        isi: `Buat keystore untuk penandatanganan, lalu **salin ke tempat lain yang aman** beserta kata sandinya.

Aktifkan Play App Signing. Ini satu-satunya kesalahan di daftar ini yang **tidak bisa diperbaiki** kemudian.` },
      { judul: 'Bangun dan uji varian rilis',
        isi: `Bangun varian rilis yang sudah diperkecil R8, lalu jalankan di **perangkat nyata**.

Pengaburan mengganti nama kelas, sehingga pembacaan JSON lewat pantulan bisa rusak. Versi debug jalan sempurna, versi rilis macet.` },
      { judul: 'Unggah AAB, bukan APK',
        isi: `Bangun Android App Bundle. Play Store menyusun paket khusus tiap perangkat, jadi unduhannya jauh lebih kecil.

Naikkan \`versionCode\` tiap unggahan — ia harus selalu naik dan tidak bisa dipakai ulang.` },
      { judul: 'Pasang pelaporan macet sebelum rilis',
        isi: `Pasang Crashlytics atau sejenisnya, lalu pantau **crash-free rate** setelah terbit.

Pengguna seluler jarang mengeluh; mereka menghapus aplikasinya. Tanpa pelaporan, kamu tidak akan pernah tahu.` }
    ],
    cek: [
      'Aplikasimu tetap menampilkan isi saat jaringan dimatikan',
      'Setiap kegagalan jaringan punya pesan jelas dan tombol coba lagi',
      'Keystore-mu sudah dicadangkan di tempat terpisah'
    ]
  },

  judulLogicSyntax: 'Bedah Konsep — kenapa mencoba lagi harus diacak',

  konsep: `
Aplikasi seluler hampir selalu bicara dengan server. Dan jaringan seluler **tidak seperti localhost** — inilah sumber sebagian besar keluhan pengguna yang tidak pernah muncul saat pengembangan.

**Lima andaian yang salah**

| Andaian | Kenyataannya |
|---|---|
| selalu tersambung | kereta, lift, pedesaan |
| cepat | 3G di jam sibuk |
| stabil | berpindah WiFi ke seluler |
| gratis | kuota berbayar per MB |
| selalu berhasil | server balas 500 atau timeout |

Kelimanya benar di emulator. Karena itu **matikan jaringan** dan uji ulang — itu satu langkah yang paling banyak menemukan cacat.

**Memanggil API**

Di Android: **Retrofit** untuk mendefinisikan titik akhir sebagai antarmuka, **Moshi** atau **Kotlinx Serialization** untuk mengubah JSON menjadi objek, dan **coroutine** supaya panggilannya tidak menahan tampilan.

Di Flutter: paket **http** untuk yang sederhana, **dio** untuk yang butuh pencegat dan pembatalan, \`async\` dan \`await\` untuk asinkronnya.

Aturan yang berlaku di keduanya: **panggilan jaringan tidak pernah di lapisan tampilan**. Ia ada di repository, dipanggil dari ViewModel.

**Tiga keadaan wajib**

Tiap panggilan jaringan punya **tiga** kemungkinan akhir, dan ketiganya harus punya tampilan:

- **sedang memuat** — pengguna tahu ada yang berjalan
- **berhasil** — datanya tampil
- **gagal** — pesan yang jelas **dan** tombol coba lagi

Yang paling sering dilupakan yang ketiga. Layar yang berputar selamanya adalah kegagalan yang tidak diberi tahu.

**Mencoba lagi: jeda berlipat dengan acakan**

Kalau panggilan gagal karena sebab sementara, coba lagi. Tetapi **jangan langsung**, dan **jangan pada jeda tetap**.

- **jeda berlipat** — 1 detik, 2, 4, 8, 16, sampai batas
- **acakan** (*jitter*) — ambil nilai acak antara nol dan jeda itu

Acakannya penting. Kalau server sempat mati dan sepuluh ribu aplikasi mencoba lagi pada detik yang sama, server yang baru pulih **langsung roboh lagi**.

**Tidak semua galat layak dicoba lagi**

| Kode | Arti | Coba lagi? |
|---|---|---|
| 400 | permintaan kita salah | jangan, akan salah lagi |
| 401 | belum masuk | jangan, minta login |
| 404 | tidak ada | jangan, memang tidak ada |
| 429 | terlalu sering | ya, tunggu sesuai header |
| 500 | server bermasalah | ya, dengan jeda berlipat |
| 503 | server sibuk | ya, dengan jeda berlipat |

Yang layak dicoba lagi hanya galat yang penyebabnya **sementara**. Mencoba lagi galat 4xx membuang kuota pengguna dan tidak akan pernah berhasil.

**Offline-first**

Simpan hasilnya di **Room** (Android) atau **sqflite** / **Hive** (Flutter), lalu jadikan penyimpanan lokal itu **sumber tampilan**. Jaringan hanya menyegarkannya.

Akibatnya: layar terisi **seketika** saat dibuka, dan tetap berguna saat jaringan mati. Ini bukan fitur tambahan — di aplikasi seluler ini perilaku yang diharapkan.

**Menyiapkan rilis**

- **Penandatanganan** — buat *keystore* dan **simpan baik-baik**. Kehilangan keystore berarti tidak bisa memperbarui aplikasi yang sudah terbit, selamanya, kecuali memakai Play App Signing.
- **R8 / ProGuard** — memperkecil dan mengaburkan kode. Uji versi rilisnya, karena pengaburan bisa merusak kode yang mengandalkan nama kelas.
- **AAB, bukan APK** — Play Store menyusun paket khusus tiap perangkat, sehingga unduhannya jauh lebih kecil.
- **versionCode dan versionName** — yang pertama untuk mesin dan harus selalu naik; yang kedua untuk manusia dan boleh apa saja.
- **Jalur bertahap** — internal testing, closed, open, lalu produksi. Rilis bertahap memungkinkan penghentian sebelum semua pengguna terkena.

Di iOS padanannya: sertifikat dan *provisioning profile*, TestFlight untuk uji, App Store Connect untuk terbit.

**Setelah terbit**

Pasang pelaporan macet seperti **Crashlytics** dan pantau **crash-free rate**. Cacat yang tidak dilaporkan tidak akan pernah kamu ketahui, karena pengguna seluler jarang mengeluh — mereka **menghapus aplikasinya**.
`,

  logicSyntax: [
    {
      bahasa: 'kotlin',
      kode: '// COBA LAGI DENGAN JEDA BERLIPAT + ACAKAN\n\nsuspend fun <T> cobaLagi(\n    maks: Int = 5,\n    dasar: Long = 1000,\n    batas: Long = 32000,\n    blok: suspend () -> T\n): T {\n    var jeda = dasar\n    repeat(maks - 1) { percobaan ->\n        try {\n            return blok()\n        } catch (e: IOException) {\n            // hanya galat SEMENTARA yang diulang\n            delay(Random.nextLong(0, jeda))     // full jitter\n            jeda = minOf(jeda * 2, batas)\n        }\n    }\n    return blok()          // percobaan terakhir, biarkan melempar\n}',
      penjelasan: `
Tiga bagian kecil di fungsi ini masing-masing menyelesaikan masalah yang berbeda, dan menghilangkan salah satunya membuat sisanya tidak berguna.

**Bagian pertama: jedanya berlipat.**

Kenapa tidak mencoba lagi setiap satu detik saja? Karena penyebab kegagalan menentukan berapa lama ia berlangsung.

Kalau server sedang dinyalakan ulang, ia butuh belasan detik. Mencoba tiap detik selama itu berarti dua belas permintaan yang **pasti gagal** — membuang baterai pengguna, membuang kuotanya, dan menambah beban server yang sedang berusaha bangkit.

Jeda berlipat membuat percobaan awal cepat, untuk gangguan yang sekejap, lalu **melambat sendiri** untuk gangguan yang panjang. Ia menyesuaikan tanpa perlu tahu penyebabnya.

**Bagian kedua: batasnya.**

Tanpa \`batas\`, jedanya jadi 1, 2, 4, ... 1024, 2048 detik. Aplikasi yang menunggu setengah jam sebelum mencoba lagi sama saja dengan menyerah, tetapi tanpa memberi tahu penggunanya.

Batas 32 detik menjaga aplikasinya tetap responsif ketika jaringannya pulih.

**Bagian ketiga, dan yang paling sering hilang: acakannya.**

Bayangkan sepuluh ribu aplikasi yang semuanya gagal pada detik yang sama karena servernya mati. Tanpa acakan, semuanya menunggu 1 detik, lalu semuanya mencoba pada detik yang sama. Lalu 2 detik, lalu 4 — **selalu serempak**.

Server yang baru pulih menerima sepuluh ribu permintaan dalam satu kedipan dan **roboh lagi**. Lalu semuanya mencoba lagi bersamaan. Sistemnya terkunci dalam putaran ini dan tidak bisa pulih sendiri.

Dengan \`Random.nextLong(0, jeda)\` — disebut *full jitter* — tiap aplikasi menunggu selama antara nol dan jedanya. Sepuluh ribu permintaan **menyebar merata** sepanjang jendela itu. Servernya menerima beban yang menanjak, bukan menghantam.

Perhatikan bahwa acakan **tidak memperbaiki apa pun untuk satu pengguna**. Aplikasi tunggal tidak peduli menunggu 2 detik atau 1,3 detik. Yang diperbaikinya adalah **perilaku bersama** — dan itu jenis masalah yang tidak akan pernah muncul saat kamu menguji sendirian.

Satu hal terakhir, dan ini menentukan: perhatikan bahwa hanya \`IOException\` yang ditangkap.

Mencoba lagi galat **400** tidak akan pernah berhasil, karena permintaannya memang salah bentuk. Mencoba lagi **401** juga tidak, karena yang dibutuhkan pengguna masuk kembali, bukan menunggu. Mencoba lagi **404** paling percuma — datanya memang tidak ada.

Mengulang galat yang penyebabnya tetap berarti membuang kuota pengguna untuk sesuatu yang **dijamin gagal**. Tanyakan satu hal sebelum mengulang: *"apakah penyebabnya bisa hilang dengan sendirinya?"* Kalau tidak, jangan ulangi — laporkan.
`
    }
  ],

  kode: { python: String.raw`# ============================================
# Networking, penyimpanan lokal, dan rilis
# ============================================
import random

# --------------------------------------------
# 1. Jaringan seluler tidak seperti localhost
# --------------------------------------------
print("--- andaian yang salah tentang jaringan ---")
ANDAIAN = [
    ("selalu tersambung",   "kereta, lift, pedesaan"),
    ("cepat",               "3G di jam sibuk"),
    ("stabil",              "berpindah dari WiFi ke seluler"),
    ("gratis",              "kuota berbayar per MB"),
    ("selalu berhasil",     "server balas 500 atau timeout"),
]
for salah, nyata in ANDAIAN:
    print("  '" + salah + "'")
    print("      kenyataannya: " + nyata)
print("")
print("  Kelima andaian itu benar di emulator dan salah di")
print("  tangan pengguna. Uji dengan mematikan jaringan.")

# --------------------------------------------
# 2. Coba lagi dengan jeda berlipat + acakan
# --------------------------------------------
def jeda(percobaan, dasar=1.0, batas=32.0, acak=True, rng=None):
    t = min(dasar * (2 ** (percobaan - 1)), batas)
    if acak:
        t = rng.uniform(0, t)          # full jitter
    return t

print("")
print("--- jeda sebelum mencoba lagi ---")
print("  " + "percobaan".rjust(10) + "tanpa acakan".rjust(15)
      + "dengan acakan".rjust(16))
r = random.Random(3)
for p in range(1, 7):
    tetap = jeda(p, acak=False)
    berubah = jeda(p, acak=True, rng=r)
    print("  " + str(p).rjust(10) + ("%.1f s" % tetap).rjust(15)
          + ("%.1f s" % berubah).rjust(16))
print("")
print("  Kenapa perlu diacak: kalau server sempat mati dan")
print("  10.000 aplikasi mencoba lagi pada detik yang sama,")
print("  server yang baru pulih langsung roboh lagi.")

# --------------------------------------------
# 3. Tanpa acakan semua serentak, dengan acakan menyebar
# --------------------------------------------
print("")
print("--- 10.000 aplikasi mencoba lagi setelah server mati ---")
r2 = random.Random(5)
tanpa = {}
dengan = {}
for _ in range(10_000):
    d1 = int(jeda(3, acak=False))
    d2 = int(jeda(3, acak=True, rng=r2))
    tanpa[d1] = tanpa.get(d1, 0) + 1
    dengan[d2] = dengan.get(d2, 0) + 1
print("  tanpa acakan  -> puncak " + str(max(tanpa.values()))
      + " permintaan pada detik yang sama")
print("  dengan acakan -> puncak " + str(max(dengan.values()))
      + " permintaan pada detik tersibuk")

# --------------------------------------------
# 4. Kode status: mana yang layak dicoba lagi
# --------------------------------------------
print("")
print("--- kapan boleh mencoba lagi ---")
STATUS = [
    (200, "berhasil",              "tidak perlu"),
    (400, "permintaan kita salah", "JANGAN -- akan salah lagi"),
    (401, "belum masuk",           "JANGAN -- minta login"),
    (404, "tidak ada",             "JANGAN -- memang tidak ada"),
    (429, "terlalu sering",        "ya, tunggu sesuai header"),
    (500, "server bermasalah",     "ya, dengan jeda berlipat"),
    (503, "server sibuk",          "ya, dengan jeda berlipat"),
]
print("  " + "kode".rjust(5) + "  " + "arti".ljust(24) + "coba lagi?")
for kode, arti, saran in STATUS:
    print("  " + str(kode).rjust(5) + "  " + arti.ljust(24) + saran)
print("")
print("  Mencoba lagi galat 4xx membuang kuota pengguna dan")
print("  tidak akan pernah berhasil. Yang layak dicoba lagi")
print("  hanya galat yang penyebabnya SEMENTARA.")

# --------------------------------------------
# 5. Offline-first: cache lokal sebagai sumber tampilan
# --------------------------------------------
class Lokal:
    def __init__(self): self.isi = None
    def simpan(self, d): self.isi = d
    def baca(self): return self.isi

class Jaringan:
    def __init__(self, hidup=True): self.hidup = hidup
    def ambil(self):
        if not self.hidup:
            raise ConnectionError("tidak ada jaringan")
        return "20 mata kuliah (dari server)"

def tampilkan(lokal, net):
    """Offline-first: tampilkan lokal dulu, segarkan di belakang."""
    langkah = []
    awal = lokal.baca()
    langkah.append("tampil segera : " + (awal or "(kosong, tampilkan pemuat)"))
    try:
        baru = net.ambil()
        lokal.simpan(baru)
        langkah.append("segarkan      : " + baru)
    except ConnectionError as e:
        langkah.append("segarkan gagal: " + str(e))
        langkah.append("tetap tampil  : " + (awal or "(kosong -> pesan galat)"))
    return langkah

print("")
print("--- offline-first ---")
lokal = Lokal()
print("  [pemakaian pertama, jaringan hidup]")
for s in tampilkan(lokal, Jaringan(True)):
    print("    " + s)
print("  [pemakaian kedua, jaringan MATI]")
for s in tampilkan(lokal, Jaringan(False)):
    print("    " + s)
print("")
print("  Layar tidak pernah kosong dan tidak pernah berputar")
print("  selamanya. Sumber tampilan adalah PENYIMPANAN LOKAL;")
print("  jaringan cuma menyegarkannya.")

# --------------------------------------------
# 6. Rilis: APK vs AAB
# --------------------------------------------
print("")
print("--- APK universal vs AAB ---")
BAGIAN = [
    ("kode aplikasi",       8.0, 8.0),
    ("gambar mdpi..xxxhdpi",12.0, 3.0),
    ("pustaka native 4 ABI",24.0, 6.0),
    ("terjemahan 30 bahasa", 3.0, 0.2),
]
print("  " + "bagian".ljust(24) + "APK (MB)".rjust(10)
      + "AAB (MB)".rjust(10))
for nama, a, b in BAGIAN:
    print("  " + nama.ljust(24) + ("%.1f" % a).rjust(10)
          + ("%.1f" % b).rjust(10))
ta = sum(x[1] for x in BAGIAN)
tb = sum(x[2] for x in BAGIAN)
print("  " + "-" * 44)
print("  " + "yang diunduh pengguna".ljust(24)
      + ("%.1f" % ta).rjust(10) + ("%.1f" % tb).rjust(10))
print("")
print("  Hemat " + ("%.0f%%" % ((1 - tb / ta) * 100))
      + ". Angka MB di atas ilustrasi, bukan hasil")
print("  pengukuran; yang nyata mekanismenya. Play Store")
print("  menyusun paket khusus tiap perangkat, jadi pengguna")
print("  tidak mengunduh gambar dan pustaka yang tidak")
print("  dipakai ponselnya.")

# --------------------------------------------
# 7. versionCode harus naik terus
# --------------------------------------------
print("")
print("--- versionCode vs versionName ---")
RILIS = [
    (1, "1.0.0", "rilis pertama"),
    (2, "1.0.1", "perbaikan cacat"),
    (3, "1.1.0", "fitur baru"),
    (3, "1.1.1", "lupa naikkan code"),
    (4, "2.0.0", "perombakan besar"),
]
sebelum = 0
for code, nama, catatan in RILIS:
    naik = code > sebelum
    tanda = "diterima" if naik else "DITOLAK Play Store"
    print("  code=" + str(code) + "  nama=" + nama.ljust(7)
          + catatan.ljust(22) + tanda)
    if naik:
        sebelum = code
print("")
print("  versionName untuk MANUSIA, boleh apa saja.")
print("  versionCode untuk MESIN, harus bilangan bulat yang")
print("  selalu naik. Sekali sebuah code dipakai, ia tidak")
print("  bisa dipakai ulang selamanya.")` },
  output: `--- andaian yang salah tentang jaringan ---
  'selalu tersambung'
      kenyataannya: kereta, lift, pedesaan
  'cepat'
      kenyataannya: 3G di jam sibuk
  'stabil'
      kenyataannya: berpindah dari WiFi ke seluler
  'gratis'
      kenyataannya: kuota berbayar per MB
  'selalu berhasil'
      kenyataannya: server balas 500 atau timeout

  Kelima andaian itu benar di emulator dan salah di
  tangan pengguna. Uji dengan mematikan jaringan.

--- jeda sebelum mencoba lagi ---
   percobaan   tanpa acakan   dengan acakan
           1          1.0 s           0.2 s
           2          2.0 s           1.1 s
           3          4.0 s           1.5 s
           4          8.0 s           4.8 s
           5         16.0 s          10.0 s
           6         32.0 s           2.1 s

  Kenapa perlu diacak: kalau server sempat mati dan
  10.000 aplikasi mencoba lagi pada detik yang sama,
  server yang baru pulih langsung roboh lagi.

--- 10.000 aplikasi mencoba lagi setelah server mati ---
  tanpa acakan  -> puncak 10000 permintaan pada detik yang sama
  dengan acakan -> puncak 2525 permintaan pada detik tersibuk

--- kapan boleh mencoba lagi ---
   kode  arti                    coba lagi?
    200  berhasil                tidak perlu
    400  permintaan kita salah   JANGAN -- akan salah lagi
    401  belum masuk             JANGAN -- minta login
    404  tidak ada               JANGAN -- memang tidak ada
    429  terlalu sering          ya, tunggu sesuai header
    500  server bermasalah       ya, dengan jeda berlipat
    503  server sibuk            ya, dengan jeda berlipat

  Mencoba lagi galat 4xx membuang kuota pengguna dan
  tidak akan pernah berhasil. Yang layak dicoba lagi
  hanya galat yang penyebabnya SEMENTARA.

--- offline-first ---
  [pemakaian pertama, jaringan hidup]
    tampil segera : (kosong, tampilkan pemuat)
    segarkan      : 20 mata kuliah (dari server)
  [pemakaian kedua, jaringan MATI]
    tampil segera : 20 mata kuliah (dari server)
    segarkan gagal: tidak ada jaringan
    tetap tampil  : 20 mata kuliah (dari server)

  Layar tidak pernah kosong dan tidak pernah berputar
  selamanya. Sumber tampilan adalah PENYIMPANAN LOKAL;
  jaringan cuma menyegarkannya.

--- APK universal vs AAB ---
  bagian                    APK (MB)  AAB (MB)
  kode aplikasi                  8.0       8.0
  gambar mdpi..xxxhdpi          12.0       3.0
  pustaka native 4 ABI          24.0       6.0
  terjemahan 30 bahasa           3.0       0.2
  --------------------------------------------
  yang diunduh pengguna         47.0      17.2

  Hemat 63%. Angka MB di atas ilustrasi, bukan hasil
  pengukuran; yang nyata mekanismenya. Play Store
  menyusun paket khusus tiap perangkat, jadi pengguna
  tidak mengunduh gambar dan pustaka yang tidak
  dipakai ponselnya.

--- versionCode vs versionName ---
  code=1  nama=1.0.0  rilis pertama         diterima
  code=2  nama=1.0.1  perbaikan cacat       diterima
  code=3  nama=1.1.0  fitur baru            diterima
  code=3  nama=1.1.1  lupa naikkan code     DITOLAK Play Store
  code=4  nama=2.0.0  perombakan besar      diterima

  versionName untuk MANUSIA, boleh apa saja.
  versionCode untuk MESIN, harus bilangan bulat yang
  selalu naik. Sekali sebuah code dipakai, ia tidak
  bisa dipakai ulang selamanya.`,

  kesalahanUmum: [
    {
      salah: 'Menguji aplikasi hanya di emulator dengan WiFi kampus yang stabil.',
      kenapa: 'Lima andaian tentang jaringan yang benar di emulator semuanya salah di tangan pengguna, mulai dari terputus di lift sampai server yang membalas 500. Cacat penanganan galat baru muncul setelah aplikasinya dipakai, dan pengguna seluler biasanya tidak mengeluh melainkan menghapusnya.',
      benar: 'Uji dengan mematikan jaringan, memperlambatnya, dan memutuskannya di tengah permintaan, sebelum aplikasinya dirilis.'
    },
    {
      salah: 'Mencoba lagi dengan jeda tetap yang sama untuk semua pengguna.',
      kenapa: 'Ketika server sempat mati, semua aplikasi gagal pada saat yang sama dan mencoba lagi pada saat yang sama pula. Server yang baru pulih menerima seluruh beban serentak dan roboh lagi, sehingga sistemnya tidak pernah bisa pulih sendiri.',
      benar: 'Pakai jeda berlipat dengan acakan penuh, sehingga percobaan ulang menyebar merata sepanjang jendela waktunya.'
    },
    {
      salah: 'Mencoba lagi setiap galat jaringan tanpa memeriksa kodenya.',
      kenapa: 'Galat 400, 401, dan 404 penyebabnya tetap dan tidak akan hilang dengan menunggu, sehingga mengulanginya membuang kuota dan baterai pengguna untuk sesuatu yang dijamin gagal.',
      benar: 'Ulangi hanya galat yang penyebabnya sementara, dan tanyakan lebih dulu apakah penyebabnya bisa hilang dengan sendirinya.'
    },
    {
      salah: 'Menampilkan pemutar tanpa akhir ketika panggilan jaringan gagal.',
      kenapa: 'Tiap panggilan punya tiga akhir yang mungkin, dan yang gagal butuh tampilannya sendiri. Layar yang berputar selamanya adalah kegagalan yang tidak diberitahukan, dan pengguna tidak punya cara mencoba lagi selain menutup aplikasinya.',
      benar: 'Sediakan tampilan gagal dengan pesan yang jelas dan tombol coba lagi, dan uji jalur itu dengan mematikan jaringan.'
    },
    {
      salah: 'Menjadikan jaringan sebagai sumber tampilan, tanpa penyimpanan lokal.',
      kenapa: 'Layar jadi kosong setiap kali dibuka sampai jaringannya menjawab, dan sama sekali tidak berguna ketika jaringannya mati. Di aplikasi seluler, terisi seketika bukan fitur tambahan melainkan perilaku yang diharapkan.',
      benar: 'Simpan hasilnya di basis data lokal, tampilkan dari sana, lalu segarkan dari jaringan di belakang layar.'
    },
    {
      salah: 'Mengunggah APK universal ke Play Store.',
      kenapa: 'APK universal memuat gambar untuk semua kerapatan layar, pustaka native untuk semua arsitektur, dan seluruh terjemahan, sehingga tiap pengguna mengunduh bagian yang tidak dipakai ponselnya. Ukuran unduhan berpengaruh langsung pada berapa orang menyelesaikan pemasangan.',
      benar: 'Unggah Android App Bundle, dan biarkan Play Store menyusun paket khusus untuk tiap perangkat.'
    },
    {
      salah: 'Menyimpan keystore di folder proyek yang tidak dicadangkan.',
      kenapa: 'Aplikasi yang sudah terbit hanya bisa diperbarui dengan kunci yang sama, sehingga kehilangan keystore berarti tidak bisa memperbarui aplikasinya selamanya dan harus menerbitkan aplikasi baru dari nol tanpa membawa penggunanya.',
      benar: 'Cadangkan keystore dan kata sandinya di tempat terpisah yang aman, dan aktifkan Play App Signing.'
    },
    {
      salah: 'Merilis tanpa menguji versi rilis yang sudah diperkecil R8.',
      kenapa: 'Pengaburan mengganti nama kelas dan metode, sehingga kode yang mengandalkan nama seperti pembacaan JSON lewat pantulan bisa rusak. Versi debug berjalan sempurna sementara versi yang sampai ke pengguna langsung macet.',
      benar: 'Bangun dan jalankan varian rilis di perangkat nyata sebelum mengunggah, dan sertakan aturan keep untuk kelas yang dibaca lewat pantulan.'
    }
  ],

  analogi: `Bayangkan **antrean di loket yang tiba-tiba tutup**.

Lima puluh orang sedang mengantre. Loketnya tutup mendadak, dan pengumumannya bilang *"coba lagi nanti"*.

Kalau semua orang menafsirkan "nanti" sebagai **lima menit**, maka lima menit kemudian lima puluh orang datang serentak ke loket yang baru buka. Petugasnya kewalahan, loketnya tutup lagi. Lima menit kemudian, hal yang sama.

Antreannya **tidak pernah selesai**, dan bukan karena petugasnya lambat.

Sekarang bayangkan pengumumannya berbunyi: *"coba lagi antara sekarang dan lima menit lagi, terserah kamu"*.

Orang-orang datang **tersebar**. Petugasnya melayani satu per satu, tetap buka, dan antreannya habis.

Tidak ada yang berubah pada petugasnya. Yang berubah cuma **kapan orang datang** — dan itu cukup untuk membedakan antara sistem yang pulih dan sistem yang terkunci.

Dan perhatikan: bagi **satu orang**, menunggu 5 menit atau 3 menit 20 detik sama saja. Acakannya tidak menolongnya sedikit pun.

Ia menolong **kerumunan** — dan kerumunan adalah hal yang tidak pernah kamu lihat saat menguji sendirian.`,

  latihan: [
    'Sebutkan lima andaian tentang jaringan yang benar di emulator dan salah di tangan pengguna, beserta contoh nyatanya.',
    'Sebutkan tiga keadaan yang wajib punya tampilan untuk tiap panggilan jaringan, dan jelaskan mana yang paling sering dilupakan.',
    'Hitung jeda percobaan ulang untuk enam percobaan dengan dasar 1 detik dan batas 32 detik, dengan dan tanpa acakan.',
    'Jelaskan kenapa acakan tidak menolong satu pengguna tetapi menyelamatkan servernya.',
    'Untuk kode status 400, 401, 404, 429, 500, dan 503, tentukan mana yang layak dicoba lagi beserta alasannya.',
    'Jelaskan pola offline-first, lalu gambar urutan langkahnya untuk pemakaian pertama dan pemakaian saat jaringan mati.',
    'Bandingkan APK universal dan AAB, dan jelaskan kenapa ukuran unduhan berpengaruh pada jumlah pemasangan.',
    'Jelaskan beda versionCode dan versionName, dan apa yang terjadi kalau versionCode tidak dinaikkan saat mengunggah.',
    'Jelaskan kenapa keystore harus dicadangkan, dan apa akibatnya kalau hilang.',
    'Jelaskan kenapa versi rilis yang sudah diperkecil R8 harus diuji terpisah dari versi debug.'
  ]
});
