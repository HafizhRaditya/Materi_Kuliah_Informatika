/* ============================================================
   jaringan-komputer.js — materi Jaringan Komputer (Semester 3)

   Disusun dari berkas kuliah sendiri:
     - Wireshark Jarkom_*.docx   analisis paket per lapisan OSI,
                                 lengkap dengan pembedahan Frame 20
     - Quiz Jaringan Komputer 2_*.docx  perancangan pengalamatan IP:
                                 VLSM, perbandingan dengan FLSM,
                                 CIDR, dan summarization

   Kedua berkas itu menentukan cakupan materi di sini. Topik model
   OSI dan TCP/IP disusun sebagai landasan yang dipakai kedua tugas
   tersebut, sehingga urutannya: model dulu, lalu pengalamatan,
   lalu analisis paket.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep".
   ============================================================ */

TOPICS.push({
  id: 'jarkom-osi-tcpip',
  judul: 'Model OSI & TCP/IP',
  kategori: 'jaringan-komputer',
  tag: ['OSI', 'TCP/IP', 'lapisan', 'enkapsulasi', 'protokol', 'PDU'],
  ringkas: 'Tujuh lapisan yang membuat jaringan bisa dibangun sepotong demi sepotong.',

  fungsi: `**Memisahkan masalah jaringan menjadi lapisan, supaya bisa ditelusuri berurutan.**

Terpakai di:

- **Menelusuri masalah** — periksa lapisan bawah dulu, jangan menebak acak
- **Membaca hasil Wireshark** — tiap lapisan punya headernya sendiri
- **Memahami perangkat** — switch bekerja di lapisan 2, router di lapisan 3
- **Berbicara dengan teknisi** — "masalahnya di layer 3" langsung dipahami

Manfaat terbesarnya bukan hafalan tujuh lapisan, melainkan **urutan pemeriksaan**.

Ketika sesuatu tidak jalan, periksa dari bawah: kabel dan sinyal, alamat MAC, alamat IP, port, lalu aplikasinya. Ini menghemat berjam-jam dibanding mencoba-coba.`,

  praktik: {
    tujuan: `Kamu bisa menelusuri masalah jaringan lapis demi lapis, dan mengenali header tiap lapisan pada paket sungguhan.`,
    alat: [
      'Terminal',
      'Wireshark'
    ],
    langkah: [
      { judul: 'Hafal urutannya lewat pemakaian, bukan jembatan keledai',
        isi: `Tujuh lapisan OSI: Physical, Data Link, Network, Transport, Session, Presentation, Application.

TCP/IP menyederhanakannya jadi empat: Network Access, Internet, Transport, Application.

Kamu akan hafal sendiri setelah beberapa kali menelusuri masalah. Jangan buang waktu menghafal di awal.` },
      { judul: 'Telusuri dari lapisan paling bawah',
        isi: `- **Lapisan 1** — kabel tercolok? lampu menyala? WiFi tersambung?
- **Lapisan 2** — \`arp -a\` menunjukkan tetangga di jaringan lokal
- **Lapisan 3** — \`ping\` ke gateway, lalu ke luar
- **Lapisan 4** — \`telnet host 80\` atau \`nc -zv host 80\` untuk memeriksa port
- **Lapisan 7** — baru di sini periksa aplikasinya

Berhenti di lapisan pertama yang gagal. Memeriksa aplikasi saat kabelnya lepas adalah pemborosan waktu yang paling sering terjadi.` },
      { judul: 'Lihat pembungkusan di Wireshark',
        isi: `Tangkap satu paket HTTP, lalu buka panel rinciannya.

Kamu akan melihat lapisan bersarang: Ethernet membungkus IP, IP membungkus TCP, TCP membungkus HTTP.

Klik tiap lapisan dan perhatikan bagian byte mana yang tersorot. Ini penjelasan enkapsulasi yang paling jelas yang bisa kamu dapatkan.` },
      { judul: 'Bandingkan TCP dan UDP',
        isi: `- **TCP** — ada jabat tangan, urutan dijaga, yang hilang dikirim ulang. Untuk web, surel, transfer berkas
- **UDP** — kirim saja, tanpa jaminan. Untuk DNS, panggilan suara, permainan

Tangkap keduanya di Wireshark. Kamu akan melihat TCP punya jabat tangan tiga langkah; UDP langsung mengirim data.` },
      { judul: 'Amati jabat tangan TCP',
        isi: `Saring di Wireshark dengan \`tcp.flags.syn == 1\`.

Kamu akan melihat pola SYN, SYN-ACK, ACK sebelum data apa pun dikirim.

Ini yang membuat TCP lebih lambat memulai daripada UDP, dan alasan HTTP/3 beralih ke QUIC yang berbasis UDP.` },
      { judul: 'Cocokkan perangkat dengan lapisannya',
        isi: `- **hub** — lapisan 1, meneruskan ke semua port tanpa berpikir
- **switch** — lapisan 2, tahu alamat MAC dan meneruskan ke port yang tepat
- **router** — lapisan 3, meneruskan antar jaringan berdasarkan IP
- **firewall** — lapisan 3 sampai 7, tergantung jenisnya

Mengetahui ini menjelaskan kenapa switch tidak bisa menghubungkan dua jaringan berbeda.` }
    ],
    cek: [
      'Kamu bisa menyebutkan urutan pemeriksaan dari lapisan bawah ke atas',
      'Kamu bisa menunjukkan header Ethernet, IP, dan TCP pada satu paket di Wireshark',
      'Kamu sudah melihat jabat tangan tiga langkah TCP dengan mata sendiri'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Jaringan itu rumit: kabel, sinyal, alamat, rute, keandalan, enkripsi, tampilan. Menangani semuanya sekaligus mustahil. Jalan keluarnya **membaginya menjadi lapisan**, masing-masing dengan satu tanggung jawab.

**Model OSI — tujuh lapisan**

Dari atas ke bawah:

- **7. Application** — antarmuka bagi aplikasi. Protokolnya HTTP, FTP, SMTP, DNS.
- **6. Presentation** — bentuk data: enkripsi, kompresi, penyandian karakter.
- **5. Session** — membuka, menjaga, dan menutup sesi percakapan.
- **4. Transport** — pengiriman ujung ke ujung. **TCP** menjamin, **UDP** tidak. Di sinilah **port** dipakai.
- **3. Network** — pengalamatan logis dan **routing** antarjaringan. Protokolnya **IP**. Perangkatnya **router**.
- **2. Data Link** — pengiriman antar-perangkat pada satu jaringan lokal. Alamatnya **MAC**. Perangkatnya **switch**.
- **1. Physical** — bit sebagai sinyal listrik, cahaya, atau gelombang. Kabel dan konektor.

Cara menghafal dari bawah: **P**hysical, **D**ata link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication.

**Model TCP/IP — empat lapisan**

Model OSI adalah **acuan teoretis**. Yang benar-benar dipakai internet adalah **TCP/IP**:

- **Application** — menggabungkan lapisan 5, 6, 7 OSI
- **Transport** — sama dengan lapisan 4
- **Internet** — sama dengan lapisan 3
- **Network Access** — menggabungkan lapisan 1 dan 2

Bedanya bukan sekadar jumlah. **OSI dirancang lebih dulu lalu dicari penerapannya; TCP/IP tumbuh dari penerapan lalu dirumuskan.** Itu sebabnya TCP/IP lebih ringkas dan yang benar-benar dipakai, sementara OSI tetap dipakai sebagai bahasa bersama untuk membicarakan jaringan.

**Enkapsulasi**

Ini gagasan terpenting di topik ini. Saat data turun melewati lapisan, **setiap lapisan menambahkan header** miliknya sendiri:

- Application menghasilkan **data**
- Transport menambah header TCP → disebut **segment**
- Network menambah header IP → disebut **packet**
- Data Link menambah header dan trailer → disebut **frame**
- Physical mengirimnya sebagai **bit**

Di sisi penerima, prosesnya dibalik: tiap lapisan **melepas header miliknya** lalu meneruskan sisanya ke atas.

Nama-nama itu disebut **PDU** (*Protocol Data Unit*), dan sering ditanyakan: **segment, packet, frame, bit** — sesuai lapisannya.

**Kenapa berlapis itu berguna**

- **Satu lapisan bisa diganti tanpa menyentuh yang lain.** Berpindah dari kabel ke WiFi mengubah lapisan 1 dan 2 saja; aplikasimu tidak tahu-menahu.
- **Pembagian kerja jelas.** Pembuat aplikasi tidak perlu memikirkan sinyal listrik.
- **Melacak masalah jadi sistematis.** Kalau ping gagal tetapi kabel tersambung, kamu tahu masalahnya di lapisan 3 ke atas.

Ini gagasan **abstraksi bertingkat** yang sudah kamu temui di struktur komputer dan di OOP.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Enkapsulasi: tiap lapisan MENAMBAH header\n\n# Turun (pengirim):\n#   L7  data                          "Halo"\n#   L4  + header TCP    -> segment    [TCP|Halo]\n#   L3  + header IP     -> packet     [IP|TCP|Halo]\n#   L2  + header MAC    -> frame      [MAC|IP|TCP|Halo|FCS]\n#   L1  bit di kabel\n\n# Naik (penerima): tiap lapisan MELEPAS header miliknya\n#   dan meneruskan sisanya ke atas.\n\n# Nama PDU per lapisan: bit, frame, packet, segment, data',
      penjelasan: `
Perhatikan bahwa **setiap lapisan hanya membaca header miliknya sendiri**, lalu memperlakukan sisanya sebagai muatan yang tidak perlu ia pahami.

Router bekerja di lapisan 3. Ia membaca header IP untuk menentukan ke mana paket diteruskan, dan **sama sekali tidak peduli** apakah isinya HTTP, email, atau video. Bagi router, itu cuma deretan byte.

Inilah yang membuat jaringan bisa **dibangun sepotong demi sepotong** oleh pihak yang berbeda-beda. Perusahaan yang membuat router tidak perlu tahu aplikasi apa yang akan lewat, dan pembuat aplikasi tidak perlu tahu router mana yang akan dilewatinya.

Perhatikan juga bahwa **alamat berubah, tetapi tidak semuanya**:

- **Alamat IP** di header lapisan 3 **tetap sama** dari ujung ke ujung. Ia menyatakan tujuan akhir.
- **Alamat MAC** di header lapisan 2 **diganti di setiap lompatan**. Ia cuma menyatakan perangkat berikutnya di jalur.

Jadi paket yang berjalan dari laptopmu ke server Unsoed akan berganti alamat MAC berkali-kali — di router rumah, di router ISP, di setiap lompatan — sementara alamat IP tujuannya tidak pernah berubah.

Ini pembedaan yang sering ditanyakan, dan gambarannya sederhana: **alamat IP adalah alamat rumah tujuan, alamat MAC adalah nama kurir yang sedang memegang paketnya sekarang.**

Perhatikan pula **FCS** di ujung frame — *Frame Check Sequence*, sebuah kode pemeriksa kesalahan. Ini gagasan yang sama dengan paritas dan kode Hamming yang kamu pelajari di Orkom, dipakai di tempat berbeda.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menirukan enkapsulasi dan dekapsulasi
# ============================================

LAPISAN_OSI = [
    (7, "Application",  "HTTP, FTP, SMTP, DNS",    "data"),
    (6, "Presentation", "enkripsi, kompresi",      "data"),
    (5, "Session",      "buka/tutup sesi",         "data"),
    (4, "Transport",    "TCP, UDP, port",          "segment"),
    (3, "Network",      "IP, routing, router",     "packet"),
    (2, "Data Link",    "MAC, switch, frame",      "frame"),
    (1, "Physical",     "kabel, sinyal, bit",      "bit"),
]

print("--- model OSI ---")
print("  no  lapisan        isi                       PDU")
for no, nama, isi, pdu in LAPISAN_OSI:
    print("  " + str(no) + "   " + nama.ljust(14) +
          isi.ljust(26) + pdu)

print("")
print("--- padanan di model TCP/IP ---")
PADANAN = [
    ("Application",    "OSI 5, 6, 7"),
    ("Transport",      "OSI 4"),
    ("Internet",       "OSI 3"),
    ("Network Access", "OSI 1, 2"),
]
for nama, osi in PADANAN:
    print("  " + nama.ljust(18) + osi)


# ============================================
# Enkapsulasi
# ============================================
def enkapsulasi(pesan):
    langkah = []
    unit = pesan
    langkah.append((7, "data", unit))

    unit = "[TCP src=54321 dst=80]" + unit
    langkah.append((4, "segment", unit))

    unit = "[IP src=192.168.1.5 dst=103.23.20.10]" + unit
    langkah.append((3, "packet", unit))

    unit = "[MAC src=AA:BB dst=CC:DD]" + unit + "[FCS]"
    langkah.append((2, "frame", unit))

    langkah.append((1, "bit", "01001000 01100001 ... (sinyal)"))
    return langkah

print("")
print("--- TURUN: pengirim menambah header ---")
for no, pdu, isi in enkapsulasi("Halo"):
    potong = isi if len(isi) <= 62 else isi[:59] + "..."
    print("  L" + str(no) + " " + pdu.ljust(8) + potong)


# ============================================
# Alamat mana yang berubah di tiap lompatan?
# ============================================
print("")
print("--- perjalanan paket: 3 lompatan ---")
JALUR = [
    ("laptop -> router rumah",  "AA:BB", "11:22"),
    ("router rumah -> router ISP", "11:22", "33:44"),
    ("router ISP -> server",     "33:44", "CC:DD"),
]
print("  IP tujuan TETAP 103.23.20.10 sepanjang perjalanan")
print("")
for lompatan, mac_asal, mac_tujuan in JALUR:
    print("  " + lompatan.ljust(28) +
          "MAC " + mac_asal + " -> " + mac_tujuan)
print("")
print("  Alamat IP  = alamat rumah tujuan (tidak berubah)")
print("  Alamat MAC = kurir yang memegang paket SEKARANG")


# ============================================
# Melacak masalah dari lapisan bawah ke atas
# ============================================
print("")
print("--- melacak masalah secara berlapis ---")
GEJALA = [
    ("kabel tercabut / WiFi mati",        1, "periksa fisik"),
    ("perangkat tak terlihat di switch",  2, "periksa MAC & switch"),
    ("ping gagal ke IP lain",             3, "periksa IP, gateway, routing"),
    ("ping berhasil tapi port tertutup",  4, "periksa firewall & port"),
    ("port terbuka tapi halaman error",   7, "periksa aplikasi & server"),
]
for gejala, lapis, tindakan in GEJALA:
    print("  L" + str(lapis) + "  " + gejala.ljust(36) + tindakan)

print("")
print("  Inilah guna model berlapis di dunia nyata:")
print("  masalah dilacak dari bawah ke atas, satu lapis")
print("  pada satu waktu, bukan menebak-nebak.")`
  },

  output: `--- model OSI ---
  no  lapisan        isi                       PDU
  7   Application   HTTP, FTP, SMTP, DNS      data
  6   Presentation  enkripsi, kompresi        data
  5   Session       buka/tutup sesi           data
  4   Transport     TCP, UDP, port            segment
  3   Network       IP, routing, router       packet
  2   Data Link     MAC, switch, frame        frame
  1   Physical      kabel, sinyal, bit        bit

--- padanan di model TCP/IP ---
  Application       OSI 5, 6, 7
  Transport         OSI 4
  Internet          OSI 3
  Network Access    OSI 1, 2

--- TURUN: pengirim menambah header ---
  L7 data    Halo
  L4 segment [TCP src=54321 dst=80]Halo
  L3 packet  [IP src=192.168.1.5 dst=103.23.20.10][TCP src=54321 dst=80]...
  L2 frame   [MAC src=AA:BB dst=CC:DD][IP src=192.168.1.5 dst=103.23.20....
  L1 bit     01001000 01100001 ... (sinyal)

--- perjalanan paket: 3 lompatan ---
  IP tujuan TETAP 103.23.20.10 sepanjang perjalanan

  laptop -> router rumah        MAC AA:BB -> 11:22
  router rumah -> router ISP    MAC 11:22 -> 33:44
  router ISP -> server          MAC 33:44 -> CC:DD

  Alamat IP  = alamat rumah tujuan (tidak berubah)
  Alamat MAC = kurir yang memegang paket SEKARANG

--- melacak masalah secara berlapis ---
  L1  kabel tercabut / WiFi mati          periksa fisik
  L2  perangkat tak terlihat di switch    periksa MAC & switch
  L3  ping gagal ke IP lain               periksa IP, gateway, routing
  L4  ping berhasil tapi port tertutup    periksa firewall & port
  L7  port terbuka tapi halaman error     periksa aplikasi & server

  Inilah guna model berlapis di dunia nyata:
  masalah dilacak dari bawah ke atas, satu lapis
  pada satu waktu, bukan menebak-nebak.`,

  kesalahanUmum: [
    {
      salah: 'Mengira alamat IP berubah di setiap lompatan seperti alamat MAC.',
      kenapa: 'Alamat IP menyatakan tujuan akhir dan tetap sama sepanjang perjalanan, sedangkan alamat MAC diganti di setiap lompatan karena hanya menyatakan perangkat berikutnya. Menukarnya membuat penjelasan routing jadi tidak masuk akal, sebab router tidak akan tahu ke mana paket harus dikirim kalau tujuan akhirnya ikut berubah.',
      benar: 'Ingat perumpamaannya: IP adalah alamat rumah tujuan, MAC adalah kurir yang memegang paket sekarang. Yang pertama tetap, yang kedua berganti tiap lompatan.'
    },
    {
      salah: 'Menyebut model OSI sebagai yang dipakai internet.',
      kenapa: 'Yang benar-benar dipakai adalah TCP/IP dengan empat lapisan. OSI adalah model acuan teoretis yang dirancang lebih dulu lalu dicari penerapannya, sementara TCP/IP tumbuh dari penerapan lalu dirumuskan. OSI tetap berguna sebagai bahasa bersama, tetapi bukan yang berjalan di jaringan.',
      benar: 'Sebutkan OSI sebagai model acuan dan TCP/IP sebagai yang diterapkan, lalu jelaskan padanan lapisannya.'
    },
    {
      salah: 'Menukar nama PDU antar lapisan, misalnya menyebut paket untuk lapisan Data Link.',
      kenapa: 'Nama PDU menandakan lapisan tempat unit itu berada, dan sering ditanyakan langsung di ujian. Lapisan Data Link memakai frame, Network memakai packet, Transport memakai segment. Menukarnya membuat pembahasan enkapsulasi jadi kacau.',
      benar: 'Hafalkan dari bawah: bit, frame, packet, segment, lalu data untuk tiga lapisan teratas.'
    },
    {
      salah: 'Menganggap switch dan router mengerjakan hal yang sama.',
      kenapa: 'Switch bekerja di lapisan 2 memakai alamat MAC dan hanya meneruskan dalam satu jaringan lokal, sedangkan router bekerja di lapisan 3 memakai alamat IP dan menghubungkan antarjaringan. Menyamakannya membuat orang bingung kenapa perangkat di jaringan berbeda tidak bisa saling terhubung lewat switch saja.',
      benar: 'Ingat lapisannya: switch di lapisan 2 untuk dalam jaringan, router di lapisan 3 untuk antarjaringan.'
    }
  ],

  analogi: `Bayangkan mengirim surat ke luar kota.

**Lapisan 7** adalah **kamu menulis suratnya** — isi pesannya, dalam bahasa yang dimengerti penerima.

**Lapisan 4** adalah **memberi nomor urut** kalau suratnya lebih dari satu lembar, dan meminta balasan supaya tahu semuanya sampai. Itulah TCP.

**Lapisan 3** adalah **menulis alamat tujuan lengkap** di amplop. Alamat ini **tidak pernah berubah** sepanjang perjalanan.

**Lapisan 2** adalah **menyerahkan ke kurir yang sekarang**. Dan di sinilah bedanya: kurir berganti berkali-kali. Dari rumahmu ke kantor pos kecamatan, lalu ke sortir kota, lalu ke kota tujuan. **Tiap serah terima adalah kurir baru** — tetapi alamat di amplop tetap sama.

**Lapisan 1** adalah **kendaraannya** — motor, truk, pesawat.

Sekarang **kenapa berlapis itu berguna**: kantor pos bisa **mengganti seluruh armada** dari motor ke drone, dan **kamu tidak perlu mengubah cara menulis surat sama sekali**. Sebaliknya, kamu boleh menulis surat dalam bahasa apa pun, dan kurirnya tidak perlu bisa membacanya.

Itulah kenapa berpindah dari kabel ke WiFi tidak menuntut aplikasimu ditulis ulang.

Dan **enkapsulasi** adalah **amplop di dalam amplop**. Suratmu dimasukkan amplop bernomor, amplop itu dimasukkan amplop beralamat, amplop itu dimasukkan kantong kurir. Di ujung sana, dibuka satu per satu dari luar ke dalam — dan tiap petugas **hanya membuka lapisan yang menjadi urusannya**, lalu meneruskan sisanya.`,

  latihan: [
    'Sebutkan tujuh lapisan OSI dari bawah ke atas beserta satu contoh protokol atau perangkat untuk masing-masing.',
    'Jelaskan padanan antara empat lapisan TCP/IP dan tujuh lapisan OSI, lalu jelaskan kenapa TCP/IP yang benar-benar dipakai.',
    'Jelaskan proses enkapsulasi dari data sampai bit, sebutkan nama PDU di tiap lapisan.',
    'Jelaskan kenapa alamat IP tetap sama sepanjang perjalanan sementara alamat MAC berganti tiap lompatan. Gunakan gambaran pengiriman surat.',
    'Sebuah komputer bisa ping ke gateway tetapi tidak bisa membuka situs web. Tentukan lapisan mana yang kemungkinan bermasalah dan urutan pemeriksaannya.',
    'Jelaskan perbedaan switch dan router beserta lapisan tempat masing-masing bekerja.'
  ]
});

TOPICS.push({
  id: 'jarkom-ip-subnetting',
  judul: 'Pengalamatan IP & Subnetting',
  kategori: 'jaringan-komputer',
  tag: ['IP address', 'subnet mask', 'prefix', 'network address', 'broadcast', 'subnetting'],
  ringkas: 'Membaca alamat IP, memisahkan bagian jaringan dari host, dan menghitung isi sebuah subnet.',

  fungsi: `**Membagi satu jaringan menjadi beberapa bagian, dan menghitung alamat yang tersedia.**

Terpakai di:

- **Merancang jaringan** kantor, kampus, atau laboratorium
- **Konfigurasi router** — menentukan rentang tiap segmen
- **Menelusuri masalah** — memastikan dua perangkat memang sejaringan
- **Cloud** — VPC di AWS atau Azure menuntut kamu menentukan CIDR
- **Docker dan container** — masing-masing punya jaringan sendiri

Yang paling sering terpakai dan paling sering salah: **menghitung alamat host yang bisa dipakai**.

Rumusnya \`2^(32 - prefix) - 2\`. Dikurangi dua karena alamat pertama adalah **alamat jaringan** dan terakhir adalah **broadcast** — keduanya tidak bisa diberikan ke perangkat.`,

  praktik: {
    tujuan: `Kamu bisa menghitung subnet dengan cepat tanpa kalkulator, dan memeriksa apakah dua alamat berada di jaringan yang sama.`,
    alat: [
      'Kertas dan pensil',
      'Python 3 dengan modul `ipaddress`',
      'Cisco Packet Tracer kalau tersedia'
    ],
    langkah: [
      { judul: 'Hafal tabel blok subnet',
        isi: `Hafalkan yang ini; ia dipakai terus-menerus:

- \`/24\` → 256 alamat, blok kelipatan 1 pada oktet keempat
- \`/25\` → 128, \`/26\` → 64, \`/27\` → 32
- \`/28\` → 16, \`/29\` → 8, \`/30\` → 4

Alamat host yang bisa dipakai selalu **dikurangi dua**.` },
      { judul: 'Hitung satu subnet dengan tangan',
        isi: `Untuk \`192.168.1.0/26\`:

- ukuran blok 64
- subnet-nya: .0, .64, .128, .192
- untuk blok pertama: jaringan .0, host .1 sampai .62, broadcast .63

Kerjakan lima soal seperti ini di kertas sebelum memakai alat bantu. Kecepatan menghitungnya akan sangat berguna saat ujian dan saat bekerja.` },
      { judul: 'Periksa dengan Python',
        isi: `- \`import ipaddress\`
- \`net = ipaddress.ip_network('192.168.1.0/26')\`
- \`net.network_address\`, \`net.broadcast_address\`, \`net.num_addresses\`
- \`list(net.hosts())\` untuk daftar host yang bisa dipakai

Bandingkan dengan hitungan tanganmu. Kalau berbeda, cari di mana salahnya.` },
      { judul: 'Periksa apakah dua alamat sejaringan',
        isi: `- \`ipaddress.ip_address('192.168.1.70') in ipaddress.ip_network('192.168.1.0/26')\`

Hasilnya \`False\` — karena .70 ada di blok kedua, bukan pertama.

Ini penyebab masalah "kenapa tidak bisa saling ping" yang sangat sering terjadi, dan sekarang kamu bisa memeriksanya dalam satu baris.` },
      { judul: 'Kenali alamat khusus',
        isi: `- \`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\` — privat, tidak dirutekan di internet
- \`127.0.0.0/8\` — loopback
- \`169.254.0.0/16\` — APIPA, muncul saat **DHCP gagal**

Butir terakhir berguna: kalau komputermu mendapat alamat 169.254, itu tanda ia **tidak mendapat alamat dari DHCP** — dan itu langsung mempersempit pencarian masalahnya.` },
      { judul: 'Rancang jaringan untuk kebutuhan nyata',
        isi: `Diberi \`192.168.10.0/24\`, bagi untuk: 50 komputer laboratorium, 20 komputer kantor, 10 perangkat WiFi, dan 2 tautan router.

Hitung prefix yang tepat untuk masing-masing, lalu susun tanpa tumpang tindih.

Ini soal yang hampir pasti keluar di ujian, dan juga persis pekerjaan nyata.` }
    ],
    cek: [
      'Kamu bisa menghitung subnet /26 di kertas dalam waktu kurang dari satu menit',
      'Hitungan tanganmu cocok dengan hasil modul ipaddress',
      'Rancangan jaringanmu tidak punya rentang yang tumpang tindih'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dihitung begitu',

  konsep: `
**Alamat IPv4** panjangnya **32 bit**, ditulis sebagai empat angka desimal 0-255 dipisah titik. Contoh: \`192.168.1.10\`.

Setiap alamat punya **dua bagian**:

- **Network ID** — menyatakan **jaringan mana**
- **Host ID** — menyatakan **perangkat mana** di jaringan itu

Yang menentukan batas keduanya adalah **subnet mask**.

**Subnet mask dan prefix**

Subnet mask adalah 32 bit juga, tetapi bentuknya khas: **deretan 1 diikuti deretan 0**. Bit **1** menandai bagian network, bit **0** menandai bagian host.

- \`255.255.255.0\` = 24 bit satu → ditulis **/24**
- \`255.255.255.192\` = 26 bit satu → ditulis **/26**

Bentuk **/n** disebut **prefix**, dan jauh lebih ringkas. Menuliskan \`192.168.1.10/24\` sudah menyatakan alamat dan mask sekaligus.

**Tiga alamat khusus dalam setiap subnet**

- **Network Address** — seluruh bit host bernilai **0**. Menyatakan jaringannya sendiri, **tidak boleh dipakai perangkat**.
- **Broadcast Address** — seluruh bit host bernilai **1**. Untuk mengirim ke semua perangkat sekaligus, **tidak boleh dipakai perangkat**.
- **Host valid** — semua yang di antara keduanya.

Dari situ muncul rumus yang dipakai di tugasmu:

**Jumlah host valid = 2ⁿ − 2**, dengan **n = jumlah bit host**

Pengurangan **2** itu **bukan pembulatan sembarangan** — ia karena dua alamat khusus di atas. Ini yang paling sering ditanyakan.

**Jumlah subnet**

Kalau kamu meminjam **m** bit dari bagian host untuk membuat subnet, jumlah subnetnya **2^m**.

**Kelas alamat**

Pembagian lama yang masih sering ditanyakan:

- **Kelas A** — 1-126, mask bawaan /8
- **Kelas B** — 128-191, mask bawaan /16
- **Kelas C** — 192-223, mask bawaan /24
- **Kelas D** — 224-239, untuk multicast
- **Kelas E** — 240-255, untuk percobaan

Perhatikan **127** dilewati: seluruh blok itu dipakai untuk **loopback**, alamat yang menunjuk ke diri sendiri.

Sistem kelas ini sudah **tidak dipakai lagi** — digantikan CIDR yang dibahas di topik berikutnya — tetapi istilahnya masih sering muncul.

**Alamat privat**

Blok yang boleh dipakai bebas di jaringan lokal dan **tidak dirutekan di internet**:

- \`10.0.0.0/8\`
- \`172.16.0.0/12\`
- \`192.168.0.0/16\`

Itulah kenapa alamat \`192.168.x.x\` muncul di hampir semua rumah — dan kenapa alamat itu tidak bentrok meski dipakai jutaan orang sekaligus.

**Cara menghitung**

Untuk menentukan network address dari sebuah alamat, lakukan **AND biner** antara alamat dan mask-nya. Bit host otomatis menjadi nol.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa dikurangi 2?\n#\n# /26 -> 26 bit network, 6 bit host\n#   2^6 = 64 alamat seluruhnya\n#\n#   bit host 000000 -> Network Address   (tidak dipakai)\n#   bit host 111111 -> Broadcast Address (tidak dipakai)\n#\n#   host valid = 64 - 2 = 62\n\n# Menemukan network address: AND biner\n#   alamat : 192.168.1.100 = ...01100100\n#   mask   : 255.255.255.192 = ...11000000\n#   AND    : 192.168.1.64   = ...01000000',
      penjelasan: `
Pengurangan **2** pada rumus \`2ⁿ − 2\` adalah hal yang paling sering ditanyakan, dan jawabannya bukan soal pembulatan.

Dalam setiap subnet, ada **dua pola bit host yang sudah dipesan**:

- **Semua nol** → **Network Address**. Ini nama jaringannya sendiri, yang dipakai router untuk menyatakan tujuan. Kalau kamu memberikannya ke sebuah komputer, router jadi tidak bisa membedakan antara *"kirim ke jaringan ini"* dan *"kirim ke komputer itu"*.
- **Semua satu** → **Broadcast Address**. Paket yang dikirim ke sini diterima **semua perangkat** di jaringan itu. Kalau dipakai satu komputer, setiap kali ada yang mengirim broadcast, komputer itu akan bingung.

Jadi dari 64 alamat pada /26, yang benar-benar bisa dipakai perangkat cuma **62**.

Sekarang cara menghitungnya dengan **AND biner**. Ini operasi yang sudah kamu kenal dari Logika Informatika: hasilnya 1 hanya kalau kedua bitnya 1.

Perhatikan apa yang dilakukan mask: **bagian network bertemu bit 1, sehingga isinya dipertahankan.** Bagian host bertemu bit 0, sehingga **hasilnya selalu nol**. Dengan satu operasi, bagian host dibersihkan dan yang tersisa adalah network address.

Ini alasan kenapa **subnet mask harus berupa deretan 1 lalu deretan 0** dan tidak boleh berselang-seling. Kalau maskanya \`11001100\`, batas antara network dan host jadi tidak jelas, dan operasi AND tidak lagi bermakna sebagai pemisah.

Untuk **broadcast address**, caranya kebalikan: pertahankan bagian network, lalu **isi seluruh bit host dengan 1**. Dalam kode, ini dikerjakan dengan OR terhadap kebalikan mask.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Pengalamatan IP: hitung sendiri, tanpa pustaka
# ============================================

def ke_int(ip):
    a, b, c, d = (int(x) for x in ip.split("."))
    return (a << 24) | (b << 16) | (c << 8) | d

def ke_ip(n):
    return ".".join(str((n >> geser) & 255) for geser in (24, 16, 8, 0))

def mask_dari_prefix(p):
    return (0xFFFFFFFF << (32 - p)) & 0xFFFFFFFF

def biner(n):
    s = format(n, "032b")
    return ".".join(s[i:i+8] for i in range(0, 32, 8))


def analisis(ip, prefix):
    alamat = ke_int(ip)
    mask = mask_dari_prefix(prefix)

    network = alamat & mask                       # AND -> bit host jadi 0
    broadcast = network | (~mask & 0xFFFFFFFF)    # OR  -> bit host jadi 1
    bit_host = 32 - prefix
    total = 2 ** bit_host
    valid = total - 2 if bit_host >= 2 else 0

    print("  alamat        : " + ip + "/" + str(prefix))
    print("    biner       : " + biner(alamat))
    print("    subnet mask : " + ke_ip(mask))
    print("    mask biner  : " + biner(mask))
    print("    network     : " + ke_ip(network) + "   <- bit host semua 0")
    print("    broadcast   : " + ke_ip(broadcast) + "   <- bit host semua 1")
    if valid:
        print("    host valid  : " + ke_ip(network + 1) +
              "  s/d  " + ke_ip(broadcast - 1))
    print("    bit host    : " + str(bit_host) +
          "   -> 2^" + str(bit_host) + " = " + str(total) +
          " alamat, " + str(valid) + " host valid")
    print("")


print("--- membedah alamat IP ---")
analisis("192.168.1.100", 24)
analisis("192.168.1.100", 26)
analisis("10.20.30.40", 22)


# ============================================
# Kenapa dikurangi 2
# ============================================
print("--- kenapa 2^n - 2, bukan 2^n ---")
print("  prefix  bit host   total   dipesan   host valid")
for p in [24, 25, 26, 27, 28, 30]:
    bit = 32 - p
    total = 2 ** bit
    print("   /" + str(p) + "      " + str(bit).rjust(2) +
          format(total, "10,") + "         2" +
          format(total - 2, "12,"))
print("")
print("  Dua yang dipesan: Network Address (bit host semua 0)")
print("  dan Broadcast Address (bit host semua 1).")


# ============================================
# Membagi satu jaringan jadi beberapa subnet
# ============================================
print("")
print("--- membagi 192.168.1.0/24 menjadi 4 subnet ---")
print("  pinjam 2 bit dari host -> 2^2 = 4 subnet, jadi /26")
print("")
dasar = ke_int("192.168.1.0")
for i in range(4):
    net = dasar + i * 64
    print("  subnet " + str(i) + ": " + ke_ip(net) + "/26" +
          "   host " + ke_ip(net + 1) + " - " + ke_ip(net + 62) +
          "   broadcast " + ke_ip(net + 63))


# ============================================
# Alamat privat & khusus
# ============================================
print("")
print("--- alamat privat: tidak dirutekan di internet ---")
for blok, prefix in [("10.0.0.0", 8), ("172.16.0.0", 12),
                     ("192.168.0.0", 16)]:
    jumlah = 2 ** (32 - prefix)
    print("  " + (blok + "/" + str(prefix)).ljust(18) +
          format(jumlah, ">15,") + " alamat")

print("")
print("  127.0.0.0/8 dipesan untuk LOOPBACK -- alamat yang")
print("  menunjuk ke diri sendiri. Itu sebabnya kelas A")
print("  berhenti di 126, bukan 127.")


# ============================================
# Memeriksa apakah dua alamat SEJARINGAN
# ============================================
print("")
print("--- apakah dua alamat berada di jaringan yang sama? ---")
def sejaringan(ip1, ip2, prefix):
    m = mask_dari_prefix(prefix)
    return (ke_int(ip1) & m) == (ke_int(ip2) & m)

uji = [
    ("192.168.1.10", "192.168.1.200", 24),
    ("192.168.1.10", "192.168.1.200", 26),
    ("192.168.1.10", "192.168.2.10",  24),
]
for a, b, p in uji:
    hasil = "YA" if sejaringan(a, b, p) else "TIDAK"
    print("  " + a.ljust(15) + " & " + b.ljust(15) +
          " pada /" + str(p) + " -> " + hasil)

print("")
print("  Perhatikan pasangan pertama dan kedua: alamat yang SAMA,")
print("  prefix berbeda, hasilnya berbeda. Prefix-lah yang")
print("  menentukan batas jaringan, bukan alamatnya sendiri.")`
  },

  output: `--- membedah alamat IP ---
  alamat        : 192.168.1.100/24
    biner       : 11000000.10101000.00000001.01100100
    subnet mask : 255.255.255.0
    mask biner  : 11111111.11111111.11111111.00000000
    network     : 192.168.1.0   <- bit host semua 0
    broadcast   : 192.168.1.255   <- bit host semua 1
    host valid  : 192.168.1.1  s/d  192.168.1.254
    bit host    : 8   -> 2^8 = 256 alamat, 254 host valid

  alamat        : 192.168.1.100/26
    biner       : 11000000.10101000.00000001.01100100
    subnet mask : 255.255.255.192
    mask biner  : 11111111.11111111.11111111.11000000
    network     : 192.168.1.64   <- bit host semua 0
    broadcast   : 192.168.1.127   <- bit host semua 1
    host valid  : 192.168.1.65  s/d  192.168.1.126
    bit host    : 6   -> 2^6 = 64 alamat, 62 host valid

  alamat        : 10.20.30.40/22
    biner       : 00001010.00010100.00011110.00101000
    subnet mask : 255.255.252.0
    mask biner  : 11111111.11111111.11111100.00000000
    network     : 10.20.28.0   <- bit host semua 0
    broadcast   : 10.20.31.255   <- bit host semua 1
    host valid  : 10.20.28.1  s/d  10.20.31.254
    bit host    : 10   -> 2^10 = 1024 alamat, 1022 host valid

--- kenapa 2^n - 2, bukan 2^n ---
  prefix  bit host   total   dipesan   host valid
   /24       8       256         2         254
   /25       7       128         2         126
   /26       6        64         2          62
   /27       5        32         2          30
   /28       4        16         2          14
   /30       2         4         2           2

  Dua yang dipesan: Network Address (bit host semua 0)
  dan Broadcast Address (bit host semua 1).

--- membagi 192.168.1.0/24 menjadi 4 subnet ---
  pinjam 2 bit dari host -> 2^2 = 4 subnet, jadi /26

  subnet 0: 192.168.1.0/26   host 192.168.1.1 - 192.168.1.62   broadcast 192.168.1.63
  subnet 1: 192.168.1.64/26   host 192.168.1.65 - 192.168.1.126   broadcast 192.168.1.127
  subnet 2: 192.168.1.128/26   host 192.168.1.129 - 192.168.1.190   broadcast 192.168.1.191
  subnet 3: 192.168.1.192/26   host 192.168.1.193 - 192.168.1.254   broadcast 192.168.1.255

--- alamat privat: tidak dirutekan di internet ---
  10.0.0.0/8             16,777,216 alamat
  172.16.0.0/12           1,048,576 alamat
  192.168.0.0/16             65,536 alamat

  127.0.0.0/8 dipesan untuk LOOPBACK -- alamat yang
  menunjuk ke diri sendiri. Itu sebabnya kelas A
  berhenti di 126, bukan 127.

--- apakah dua alamat berada di jaringan yang sama? ---
  192.168.1.10    & 192.168.1.200   pada /24 -> YA
  192.168.1.10    & 192.168.1.200   pada /26 -> TIDAK
  192.168.1.10    & 192.168.2.10    pada /24 -> TIDAK

  Perhatikan pasangan pertama dan kedua: alamat yang SAMA,
  prefix berbeda, hasilnya berbeda. Prefix-lah yang
  menentukan batas jaringan, bukan alamatnya sendiri.`,

  kesalahanUmum: [
    {
      salah: 'Memakai rumus 2 pangkat n tanpa mengurangi 2 saat menghitung jumlah host.',
      kenapa: 'Dua alamat dalam setiap subnet sudah dipesan: yang bit host-nya semua nol untuk Network Address dan yang semua satu untuk Broadcast Address. Melupakannya membuat perancangan subnet meleset, dan pada subnet kecil seperti /30 kesalahannya fatal karena dari 4 alamat hanya 2 yang benar-benar bisa dipakai.',
      benar: 'Selalu pakai 2 pangkat n dikurangi 2, dan ingat alasannya bukan pembulatan melainkan dua alamat yang memang dipesan.'
    },
    {
      salah: 'Mengira dua alamat yang tiga oktet pertamanya sama pasti berada di jaringan yang sama.',
      kenapa: 'Yang menentukan batas jaringan adalah prefix, bukan kemiripan angkanya. Alamat 192.168.1.10 dan 192.168.1.200 sejaringan pada /24 tetapi berbeda jaringan pada /26. Salah paham ini membuat perangkat tidak bisa saling terhubung padahal alamatnya terlihat mirip.',
      benar: 'Hitung network address masing-masing dengan operasi AND terhadap mask, lalu bandingkan hasilnya.'
    },
    {
      salah: 'Memberikan network address atau broadcast address ke sebuah perangkat.',
      kenapa: 'Network address dipakai router untuk menyatakan jaringannya, dan broadcast address dipakai mengirim ke semua perangkat sekaligus. Memberikannya ke satu komputer membuat perilaku jaringan menjadi kacau, dan gejalanya sering berupa perangkat yang kadang bisa kadang tidak bisa dihubungi.',
      benar: 'Pakai hanya alamat di antara keduanya. Host pertama adalah network address ditambah satu, host terakhir adalah broadcast dikurangi satu.'
    },
    {
      salah: 'Menyangka subnet mask boleh berpola berselang-seling seperti 255.255.0.255.',
      kenapa: 'Subnet mask harus berupa deretan bit 1 diikuti deretan bit 0 tanpa putus, karena tugasnya memisahkan bagian network dari bagian host di satu titik. Pola berselang membuat batas itu tidak jelas dan operasi AND kehilangan maknanya sebagai pemisah.',
      benar: 'Periksa bentuk binernya. Semua mask yang sah bisa ditulis sebagai prefix garis miring n, dan yang tidak bisa berarti tidak sah.'
    }
  ],

  analogi: `Bayangkan alamat rumah lengkap: **"Jalan Melati Nomor 17"**.

**Network ID** adalah **nama jalannya** — menyatakan kompleks mana. **Host ID** adalah **nomor rumahnya** — menyatakan rumah mana di jalan itu.

**Subnet mask** adalah **aturan sampai mana bagian nama jalan berakhir**. Dan inilah yang sering mengejutkan: **alamat yang sama bisa berada di kompleks berbeda kalau aturannya berbeda.**

Bayangkan Jalan Melati sepanjang 254 rumah. Dengan aturan */24*, semuanya satu kompleks — nomor 10 dan nomor 200 bertetangga. Tetapi kalau pengurus memutuskan membaginya jadi empat kompleks dengan aturan */26*, maka nomor 10 dan nomor 200 kini **berada di kompleks berbeda** dan surat di antara keduanya harus lewat pos.

Alamatnya tidak berubah sama sekali. **Aturannya yang berubah.**

Sekarang **dua alamat yang dipesan** di tiap kompleks:

- **Nomor paling awal** adalah **papan nama kompleksnya**. Kamu tidak bisa tinggal di papan nama.
- **Nomor paling akhir** adalah **pengeras suara kompleks**. Apa pun yang diumumkan di situ terdengar semua rumah. Kamu juga tidak bisa tinggal di pengeras suara.

Jadi dari 64 nomor, yang bisa ditinggali cuma **62**. Itulah asal \`2ⁿ − 2\`, dan sekarang jelas kenapa bukan pembulatan.

Dan **alamat privat** seperti \`192.168.x.x\` adalah **nomor rumah di dalam sebuah gedung apartemen**. Setiap gedung punya "Kamar 101", dan itu tidak masalah — karena **surat dari luar tidak pernah dialamatkan ke kamar langsung**, melainkan ke gedungnya, lalu resepsionis yang meneruskan. Resepsionis itulah router NAT-mu.`,

  latihan: [
    'Untuk alamat 192.168.10.77/27, tentukan subnet mask, network address, broadcast address, rentang host valid, dan jumlah host valid.',
    'Jelaskan kenapa rumus jumlah host adalah 2 pangkat n dikurangi 2, dan alamat mana saja yang dipesan.',
    'Bagilah jaringan 172.16.0.0/16 menjadi 8 subnet berukuran sama. Tentukan prefix barunya dan tuliskan network address tiap subnet.',
    'Tentukan apakah 10.1.5.100 dan 10.1.6.200 berada di jaringan yang sama untuk prefix /16, /22, dan /24. Tunjukkan perhitungan AND-nya.',
    'Sebutkan tiga blok alamat privat beserta prefixnya, dan jelaskan kenapa alamat 192.168.1.1 bisa dipakai jutaan rumah sekaligus tanpa bentrok.',
    'Jelaskan kenapa kelas A berhenti di 126 dan bukan 127, lalu jelaskan fungsi blok 127.0.0.0/8.'
  ]
});

TOPICS.push({
  id: 'jarkom-vlsm-cidr',
  judul: 'VLSM, CIDR & Summarization',
  kategori: 'jaringan-komputer',
  tag: ['VLSM', 'FLSM', 'CIDR', 'summarization', 'supernetting', 'efisiensi alamat'],
  ringkas: 'Membagi alamat sesuai kebutuhan nyata, bukan dipukul rata — dan meringkas rute agar router tidak kewalahan.',

  fungsi: `**Membagi alamat sesuai kebutuhan nyata, bukan sama rata — supaya tidak boros.**

Terpakai di:

- **Merancang jaringan** yang tiap bagiannya berbeda ukuran
- **Menghemat alamat** — penting sekali pada IPv4 yang sudah habis
- **Meringkas rute** — mengurangi jumlah baris di tabel perutean
- **Cloud** — merancang subnet VPC yang tidak boros

Bedanya dengan subnetting biasa: **VLSM mengizinkan tiap subnet berukuran berbeda.**

Membagi \`/24\` menjadi empat \`/26\` yang sama besar berarti bagian yang cuma butuh 2 alamat tetap mendapat 62 — dan 60 alamat terbuang.

VLSM memberi masing-masing sebesar yang dibutuhkannya.`,

  praktik: {
    tujuan: `Kamu bisa merancang pembagian alamat dengan VLSM tanpa tumpang tindih, dan meringkas beberapa rute jadi satu.`,
    alat: [
      'Kertas',
      'Python 3 dengan `ipaddress`',
      'Packet Tracer kalau tersedia'
    ],
    langkah: [
      { judul: 'Urutkan kebutuhan dari yang TERBESAR',
        isi: `Ini aturan yang tidak boleh dilanggar. Alokasikan yang terbesar dulu.

Kalau kamu mulai dari yang kecil, blok besar tidak akan muat lagi di sisa yang terpecah-pecah — dan kamu harus mengulang dari awal.` },
      { judul: 'Hitung prefix untuk tiap kebutuhan',
        isi: `Untuk 50 host, kamu butuh sedikitnya 52 alamat termasuk jaringan dan broadcast. Blok terkecil yang cukup adalah 64, jadi \`/26\`.

Untuk 2 host pada tautan antar router: butuh 4, jadi \`/30\`.

Selalu bulatkan **ke atas** ke pangkat dua berikutnya.` },
      { judul: 'Alokasikan berurutan tanpa celah',
        isi: `Mulai dari alamat pertama, alokasikan blok terbesar, lalu lanjutkan dari alamat berikutnya.

Tulis tabelnya: nama bagian, jaringan, rentang host, broadcast, dan prefix.

Tabel ini yang akan kamu masukkan ke konfigurasi router, jadi buat serapi mungkin.` },
      { judul: 'Periksa tumpang tindih dengan kode',
        isi: `- \`net1.overlaps(net2)\` di modul ipaddress

Periksa **setiap pasangan** subnet-mu. Satu tumpang tindih saja membuat sebagian perangkat tidak bisa berkomunikasi, dan gejalanya sangat membingungkan.` },
      { judul: 'Hitung pemborosannya',
        isi: `Bandingkan total alamat yang dialokasikan dengan yang benar-benar dibutuhkan, untuk pembagian sama rata dan untuk VLSM.

Selisihnya akan besar, dan itu penjelasan paling langsung tentang kenapa VLSM ada.` },
      { judul: 'Ringkas beberapa rute jadi satu',
        isi: `Empat jaringan \`/26\` yang berurutan bisa diringkas menjadi satu \`/24\`.

- \`ipaddress.collapse_addresses([...])\` melakukannya untukmu

Di router nyata, ini mengurangi tabel perutean dari ratusan baris menjadi belasan — dan itu berpengaruh besar pada kecepatan.` }
    ],
    cek: [
      'Tidak ada dua subnet-mu yang tumpang tindih, diperiksa dengan kode',
      'Tiap bagian mendapat alamat yang cukup tetapi tidak berlebihan',
      'Kamu bisa meringkas beberapa subnet berurutan menjadi satu rute'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dihitung begitu',

  konsep: `
Topik ini langsung mengikuti tugas Quiz Jaringan Komputer 2 milikmu, yang membahas perancangan pengalamatan IP dengan VLSM, membandingkannya dengan FLSM, lalu menjelaskan CIDR dan summarization.

**FLSM — semua subnet berukuran sama**

*Fixed Length Subnet Mask* membagi jaringan menjadi subnet yang **semuanya berukuran sama**, mengikuti kebutuhan **terbesar**.

Masalahnya langsung terlihat: kalau satu segmen butuh 100 host dan segmen lain cuma butuh 2, keduanya tetap dapat jatah yang sama. **Sebagian besar alamat terbuang.**

**VLSM — ukuran menyesuaikan kebutuhan**

*Variable Length Subnet Mask* memberi tiap subnet **prefix yang berbeda-beda**, sesuai kebutuhan nyatanya.

**Langkah-langkah perancangan VLSM**

Tugasmu merumuskannya, dan urutannya penting:

- **Analisis kebutuhan** — daftar segmen jaringan yang diperlukan beserta jumlah host tiap segmen.
- **Sortir kebutuhan** — urutkan dari yang **paling banyak** butuh host ke yang paling sedikit.
- **Tentukan kebutuhan bit** — cari nilai **n** terkecil sehingga **2ⁿ − 2 ≥ jumlah host** yang dibutuhkan.
- **Alokasikan** blok mulai dari yang terbesar, berurutan.

**Kenapa harus diurutkan dari besar ke kecil?**

Ini bagian yang paling sering ditanyakan, dan alasannya soal **penyelarasan blok**.

Setiap blok berukuran 2ⁿ harus dimulai pada alamat yang merupakan **kelipatan ukurannya sendiri**. Blok /26 berukuran 64 harus mulai di 0, 64, 128, atau 192 — tidak boleh di 32.

Kalau kamu mengalokasikan yang kecil lebih dulu, alamat awal untuk blok besar menjadi **tidak selaras**, dan kamu terpaksa membuang ruang di depannya. Mengurutkan dari besar ke kecil membuat setiap blok berikutnya **otomatis jatuh pada batas yang benar**.

**CIDR**

*Classless Inter-Domain Routing* menghapus sistem kelas A, B, C. Alih-alih mask bawaan yang dipatok kelas, **prefix bisa berapa pun** dari /0 sampai /32.

Dua manfaatnya:

- **Alokasi lebih luwes.** Organisasi yang butuh 500 alamat bisa diberi /23, bukan dipaksa mengambil seluruh kelas B yang berisi 65 ribu.
- **Memungkinkan summarization**, yang dibahas berikutnya.

**Summarization / Supernetting**

Kebalikan dari subnetting: **menggabungkan beberapa jaringan berdekatan menjadi satu entri rute**.

Kalau sebuah router harus mengetahui rute ke \`192.168.0.0/24\`, \`192.168.1.0/24\`, \`192.168.2.0/24\`, dan \`192.168.3.0/24\`, keempatnya bisa diringkas menjadi **satu** entri: \`192.168.0.0/22\`.

**Kenapa ini penting?** Tabel rute internet berisi ratusan ribu entri. Tanpa summarization, jumlahnya akan berlipat-lipat, dan setiap router harus menyimpan serta menyisir tabel yang jauh lebih besar. Meringkas rute **mengurangi ukuran tabel, mempercepat pencarian, dan mengurangi lalu lintas pembaruan rute**.

**Cara menghitung summary**

- Tulis seluruh alamat jaringan dalam biner
- Cari **berapa bit terdepan yang sama persis** di semuanya
- Jumlah bit itulah prefix ringkasannya
- Network address-nya adalah bit yang sama itu, sisanya nol

Syaratnya: jaringan yang diringkas harus **berurutan** dan **jumlahnya pangkat dua**, serta blok gabungannya harus **selaras**.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Kenapa VLSM harus diurutkan BESAR ke KECIL\n#\n# Kebutuhan: 100, 50, 2 host  dari 192.168.1.0/24\n#\n# SALAH -- kecil dulu:\n#   /30 (2 host)   -> 192.168.1.0   - 3\n#   /26 (50 host)  -> harus mulai di kelipatan 64\n#                     alamat 4-63 TERBUANG\n#\n# BENAR -- besar dulu:\n#   /25 (100 host) -> 192.168.1.0   - 127\n#   /26 (50 host)  -> 192.168.1.128 - 191\n#   /30 (2 host)   -> 192.168.1.192 - 195\n#   tidak ada yang terbuang di antaranya',
      penjelasan: `
Aturan **besar ke kecil** bukan soal kerapian — ia soal **penyelarasan blok**, dan tanpanya alamat benar-benar terbuang.

Aturannya: blok berukuran 2ⁿ **harus dimulai pada alamat yang merupakan kelipatan 2ⁿ**. Blok 64 alamat harus mulai di 0, 64, 128, atau 192. Ia **tidak boleh** mulai di 4 atau 32.

Alasannya kembali ke cara kerja mask. Network address diperoleh dengan operasi AND, yang **memaksa bit host menjadi nol**. Kalau blok /26 dimulai di alamat 4, maka bit host-nya bukan nol — dan alamat itu **bukan network address yang sah**.

Sekarang lihat contoh yang salah. Setelah blok /30 memakai alamat 0 sampai 3, blok /26 berikutnya **tidak bisa** mulai di alamat 4. Ia harus menunggu sampai kelipatan 64 berikutnya, yaitu alamat 64. **Alamat 4 sampai 63 hangus** — 60 alamat terbuang untuk menghemat 4.

Dengan urutan besar ke kecil, persoalan itu **tidak pernah muncul**. Blok besar selalu berukuran kelipatan blok yang lebih kecil, sehingga ujung sebuah blok besar **selalu jatuh tepat** pada batas yang sah untuk blok berikutnya.

Ini juga menjelaskan kenapa **VLSM jauh lebih hemat daripada FLSM**. Pada contoh di atas, FLSM harus memakai /25 untuk **ketiga** segmen karena mengikuti kebutuhan terbesar — dan segmen yang cuma butuh 2 host mendapat 126 alamat. Dari 254 alamat yang tersedia, satu /24 bahkan **tidak cukup** untuk tiga segmen dengan FLSM.

Perhatikan juga cara menentukan bit host: cari **n terkecil** dengan \`2ⁿ − 2 ≥ kebutuhan\`. Untuk 50 host, \`2⁵ − 2 = 30\` kurang, sedangkan \`2⁶ − 2 = 62\` cukup. Jadi n = 6, dan prefixnya \`32 − 6 = /26\`.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# VLSM, FLSM, dan Summarization
# ============================================
import math

def ke_int(ip):
    a, b, c, d = (int(x) for x in ip.split("."))
    return (a << 24) | (b << 16) | (c << 8) | d

def ke_ip(n):
    return ".".join(str((n >> g) & 255) for g in (24, 16, 8, 0))

def bit_host_untuk(jumlah):
    """n terkecil dengan 2^n - 2 >= jumlah host."""
    n = 1
    while (2 ** n) - 2 < jumlah:
        n += 1
    return n


# ---------- Kebutuhan jaringan ----------
KEBUTUHAN = [
    ("Lab Komputer",  100),
    ("Ruang Dosen",    50),
    ("Perpustakaan",   25),
    ("Kantor TU",      10),
    ("Link Router",     2),
]

BLOK = "192.168.1.0"
PREFIX_AWAL = 24
TERSEDIA = 2 ** (32 - PREFIX_AWAL)

print("blok tersedia : " + BLOK + "/" + str(PREFIX_AWAL) +
      "  (" + str(TERSEDIA) + " alamat)")
print("")


# ============================================
# FLSM: semua subnet SAMA BESAR
# ============================================
print("--- FLSM: ukuran dipukul rata ---")
terbesar = max(k[1] for k in KEBUTUHAN)
n = bit_host_untuk(terbesar)
ukuran = 2 ** n
prefix = 32 - n
muat = TERSEDIA // ukuran

print("  kebutuhan terbesar : " + str(terbesar) + " host")
print("  semua subnet jadi  : /" + str(prefix) +
      " (" + str(ukuran) + " alamat, " + str(ukuran - 2) + " host)")
print("  subnet yang muat   : " + str(muat) +
      "  padahal dibutuhkan " + str(len(KEBUTUHAN)))
print("")

terpakai_flsm = 0
for nama, butuh in KEBUTUHAN:
    terbuang = (ukuran - 2) - butuh
    terpakai_flsm += ukuran
    print("  " + nama.ljust(16) + "butuh " + str(butuh).rjust(3) +
          "  dapat " + str(ukuran - 2).rjust(3) +
          "  TERBUANG " + str(terbuang).rjust(3))

print("")
print("  total alamat dibutuhkan: " + str(terpakai_flsm) +
      "  padahal cuma ada " + str(TERSEDIA))
print("  -> satu /24 TIDAK CUKUP dengan FLSM")


# ============================================
# VLSM: ukuran menyesuaikan kebutuhan
# ============================================
print("")
print("--- VLSM: diurutkan BESAR ke KECIL ---")
urut = sorted(KEBUTUHAN, key=lambda x: -x[1])
mulai = ke_int(BLOK)
total_terbuang = 0

print("  segmen          butuh  bit  prefix  ukuran  network         broadcast")
for nama, butuh in urut:
    n = bit_host_untuk(butuh)
    ukuran = 2 ** n
    prefix = 32 - n
    net = mulai
    brd = mulai + ukuran - 1
    terbuang = (ukuran - 2) - butuh
    total_terbuang += terbuang

    print("  " + nama.ljust(16) + str(butuh).rjust(4) +
          str(n).rjust(6) + ("/" + str(prefix)).rjust(8) +
          str(ukuran).rjust(8) + "  " + ke_ip(net).ljust(16) +
          ke_ip(brd))
    mulai += ukuran

terpakai = mulai - ke_int(BLOK)
print("")
print("  alamat terpakai : " + str(terpakai) + " dari " + str(TERSEDIA))
print("  sisa bebas      : " + str(TERSEDIA - terpakai))
print("  terbuang dalam subnet: " + str(total_terbuang))
print("  -> satu /24 CUKUP, bahkan masih bersisa")


# ============================================
# Kenapa harus diurutkan besar ke kecil
# ============================================
print("")
print("--- bukti: kalau diurutkan KECIL ke BESAR ---")
mulai = ke_int(BLOK)
hangus_total = 0
for nama, butuh in sorted(KEBUTUHAN, key=lambda x: x[1]):
    n = bit_host_untuk(butuh)
    ukuran = 2 ** n
    # Blok harus mulai di kelipatan ukurannya sendiri
    selaras = ((mulai + ukuran - 1) // ukuran) * ukuran
    hangus = selaras - mulai
    hangus_total += hangus
    catatan = ("  <- " + str(hangus) + " alamat HANGUS") if hangus else ""
    print("  " + nama.ljust(16) + "/" + str(32 - n) +
          "  mulai " + ke_ip(selaras) + catatan)
    mulai = selaras + ukuran

print("")
print("  total hangus karena tidak selaras: " + str(hangus_total))
print("  Blok 2^n WAJIB mulai di kelipatan 2^n. Mengurutkan")
print("  dari besar ke kecil membuat setiap blok berikutnya")
print("  otomatis jatuh di batas yang sah.")


# ============================================
# Summarization: menggabungkan rute
# ============================================
print("")
print("--- summarization: 4 rute jadi 1 ---")
RUTE = ["192.168.0.0", "192.168.1.0", "192.168.2.0", "192.168.3.0"]

for r in RUTE:
    print("  " + r + "/24   " + format(ke_int(r), "032b"))

# Cari berapa bit terdepan yang SAMA di semua rute
angka = [ke_int(r) for r in RUTE]
sama = 32
for i in range(32):
    bit = (angka[0] >> (31 - i)) & 1
    if any(((a >> (31 - i)) & 1) != bit for a in angka):
        sama = i
        break

ringkas = angka[0] & ((0xFFFFFFFF << (32 - sama)) & 0xFFFFFFFF)
print("")
print("  bit terdepan yang sama : " + str(sama))
print("  ringkasan              : " + ke_ip(ringkas) + "/" + str(sama))
print("")
print("  4 entri tabel rute -> 1 entri.")
print("  Pada tabel rute internet yang berisi ratusan ribu entri,")
print("  penghematan seperti ini menentukan apakah router sanggup.")`
  },

  output: `blok tersedia : 192.168.1.0/24  (256 alamat)

--- FLSM: ukuran dipukul rata ---
  kebutuhan terbesar : 100 host
  semua subnet jadi  : /25 (128 alamat, 126 host)
  subnet yang muat   : 2  padahal dibutuhkan 5

  Lab Komputer    butuh 100  dapat 126  TERBUANG  26
  Ruang Dosen     butuh  50  dapat 126  TERBUANG  76
  Perpustakaan    butuh  25  dapat 126  TERBUANG 101
  Kantor TU       butuh  10  dapat 126  TERBUANG 116
  Link Router     butuh   2  dapat 126  TERBUANG 124

  total alamat dibutuhkan: 640  padahal cuma ada 256
  -> satu /24 TIDAK CUKUP dengan FLSM

--- VLSM: diurutkan BESAR ke KECIL ---
  segmen          butuh  bit  prefix  ukuran  network         broadcast
  Lab Komputer     100     7     /25     128  192.168.1.0     192.168.1.127
  Ruang Dosen       50     6     /26      64  192.168.1.128   192.168.1.191
  Perpustakaan      25     5     /27      32  192.168.1.192   192.168.1.223
  Kantor TU         10     4     /28      16  192.168.1.224   192.168.1.239
  Link Router        2     2     /30       4  192.168.1.240   192.168.1.243

  alamat terpakai : 244 dari 256
  sisa bebas      : 12
  terbuang dalam subnet: 47
  -> satu /24 CUKUP, bahkan masih bersisa

--- bukti: kalau diurutkan KECIL ke BESAR ---
  Link Router     /30  mulai 192.168.1.0
  Kantor TU       /28  mulai 192.168.1.16  <- 12 alamat HANGUS
  Perpustakaan    /27  mulai 192.168.1.32
  Ruang Dosen     /26  mulai 192.168.1.64
  Lab Komputer    /25  mulai 192.168.1.128

  total hangus karena tidak selaras: 12
  Blok 2^n WAJIB mulai di kelipatan 2^n. Mengurutkan
  dari besar ke kecil membuat setiap blok berikutnya
  otomatis jatuh di batas yang sah.

--- summarization: 4 rute jadi 1 ---
  192.168.0.0/24   11000000101010000000000000000000
  192.168.1.0/24   11000000101010000000000100000000
  192.168.2.0/24   11000000101010000000001000000000
  192.168.3.0/24   11000000101010000000001100000000

  bit terdepan yang sama : 22
  ringkasan              : 192.168.0.0/22

  4 entri tabel rute -> 1 entri.
  Pada tabel rute internet yang berisi ratusan ribu entri,
  penghematan seperti ini menentukan apakah router sanggup.`,

  kesalahanUmum: [
    {
      salah: 'Mengalokasikan subnet VLSM dari kebutuhan terkecil lebih dulu.',
      kenapa: 'Blok berukuran 2 pangkat n harus dimulai pada alamat kelipatan 2 pangkat n. Kalau blok kecil dialokasikan lebih dulu, blok besar berikutnya tidak bisa mulai tepat setelahnya dan harus menunggu batas selaras berikutnya, sehingga alamat di antaranya hangus tanpa bisa dipakai siapa pun.',
      benar: 'Urutkan kebutuhan dari yang paling banyak host ke yang paling sedikit sebelum mengalokasikan, sesuai langkah yang ditulis di tugas.'
    },
    {
      salah: 'Memakai FLSM untuk jaringan dengan kebutuhan host yang sangat beragam.',
      kenapa: 'Semua subnet dipaksa mengikuti kebutuhan terbesar, sehingga segmen yang cuma butuh 2 host tetap mendapat jatah sebesar segmen yang butuh 100. Pada contoh di materi, satu blok /24 bahkan tidak cukup untuk lima segmen dengan FLSM, padahal dengan VLSM masih bersisa.',
      benar: 'Pakai VLSM kalau kebutuhan tiap segmen berbeda jauh. FLSM hanya masuk akal kalau semua segmen memang berukuran serupa.'
    },
    {
      salah: 'Meringkas beberapa jaringan yang tidak berurutan atau jumlahnya bukan pangkat dua.',
      kenapa: 'Ringkasan bekerja dengan mencari bit terdepan yang sama, sehingga blok gabungannya pasti mencakup seluruh rentang di antaranya. Meringkas jaringan yang tidak berurutan membuat ringkasan itu ikut mengklaim jaringan lain yang bukan miliknya, dan lalu lintas untuk jaringan itu akan salah arah.',
      benar: 'Pastikan jaringan yang diringkas berurutan, jumlahnya pangkat dua, dan blok gabungannya selaras pada batas ukurannya.'
    },
    {
      salah: 'Menghitung bit host dengan 2 pangkat n lebih besar sama dengan kebutuhan, tanpa mengurangi 2.',
      kenapa: 'Dua alamat dalam tiap subnet dipesan untuk network dan broadcast, sehingga syaratnya adalah 2 pangkat n dikurangi 2 lebih besar sama dengan kebutuhan. Melupakannya membuat subnet kurang satu ukuran, dan pada kebutuhan yang pas di batas seperti 62 host, hasilnya tidak muat.',
      benar: 'Pakai syarat 2 pangkat n dikurangi 2 lebih besar sama dengan jumlah host, persis seperti yang ditulis di langkah perancangan tugasmu.'
    }
  ],

  analogi: `Bayangkan membagi sebidang tanah untuk lima keluarga dengan kebutuhan berbeda.

**FLSM** adalah aturan *"semua kavling harus sama luas"*. Karena keluarga terbesar butuh 100 meter, **semua** kavling dibuat 128 meter — termasuk untuk keluarga yang cuma butuh 2 meter.

Hasilnya: tanahmu **habis sebelum semua keluarga kebagian**. Persis yang terjadi di contoh: satu /24 tidak cukup untuk lima segmen.

**VLSM** adalah *"kavling dibuat sesuai kebutuhan"*. Keluarga besar dapat kavling besar, yang kecil dapat kecil. Semua kebagian, dan masih bersisa.

Sekarang **kenapa harus dari besar dulu**. Ada aturan tata kota yang aneh tapi mengikat: **kavling 64 meter hanya boleh dimulai di patok kelipatan 64.** Tidak boleh di patok ke-4, tidak boleh di patok ke-32.

Kalau kamu memberikan kavling 4 meter lebih dulu di patok 0, maka kavling 64 meter berikutnya **tidak bisa mulai di patok 4** — ia harus menunggu patok 64. Tanah dari patok 4 sampai 63 **hangus**, tidak bisa dipakai siapa pun.

Tetapi kalau kamu mulai dari kavling terbesar, ujungnya **selalu jatuh tepat di patok yang sah** untuk kavling berikutnya. Tidak ada yang hangus.

Untuk **summarization**, bayangkan kantor pos. Alih-alih menghafal *"Jalan Melati 1, Jalan Melati 2, Jalan Melati 3, Jalan Melati 4 semuanya ke arah barat"*, petugas cukup menghafal **"seluruh Kompleks Melati ke arah barat"**.

Empat catatan jadi satu. Kalikan dengan ratusan ribu jalan di seluruh negeri, dan kamu mengerti kenapa tanpa peringkasan, **tidak ada petugas yang sanggup menghafalnya.**

Tetapi ada syaratnya: kompleks itu harus **benar-benar berdampingan**. Kalau Jalan Melati 3 ternyata di seberang kota, meringkasnya jadi "seluruh Kompleks Melati" akan **menyesatkan surat** yang seharusnya ke sana.`,

  latihan: [
    'Sebutkan empat langkah perancangan VLSM sesuai tugasmu, dan jelaskan kenapa langkah menyortir tidak boleh dilewati.',
    'Rancang VLSM dari blok 172.16.0.0/22 untuk kebutuhan: 300, 120, 60, 25, dan 2 host. Tuliskan prefix, network, dan broadcast tiap segmen.',
    'Hitung berapa alamat terbuang kalau kelima kebutuhan pada soal sebelumnya dikerjakan dengan FLSM. Bandingkan dengan hasil VLSM.',
    'Jelaskan aturan penyelarasan blok, lalu tunjukkan berapa alamat hangus kalau segmen 2 host dialokasikan sebelum segmen 100 host pada blok /24.',
    'Ringkas keempat jaringan berikut menjadi satu entri rute: 10.1.4.0/24, 10.1.5.0/24, 10.1.6.0/24, 10.1.7.0/24. Tunjukkan perhitungan binernya.',
    'Jelaskan kenapa 192.168.1.0/24 dan 192.168.3.0/24 tidak bisa diringkas menjadi satu entri tanpa ikut mengklaim jaringan lain.'
  ]
});

TOPICS.push({
  id: 'jarkom-analisis-paket',
  judul: 'Analisis Paket dengan Wireshark',
  kategori: 'jaringan-komputer',
  tag: ['Wireshark', 'packet capture', 'filter', 'TCP handshake', 'analisis jaringan'],
  ringkas: 'Melihat langsung isi lalu lintas jaringan, lapis demi lapis.',

  fungsi: `**Melihat langsung apa yang benar-benar dikirim jaringan — bukan menebak.**

Terpakai di:

- **Menelusuri masalah aplikasi** — apakah permintaannya benar-benar terkirim
- **Memahami protokol** — cara tercepat mempelajari protokol adalah melihatnya bekerja
- **Keamanan** — melihat data apa yang terkirim tanpa terenkripsi
- **Komputer Forensik** — tangkapan paket adalah bukti
- **Membuktikan letak masalah** — apakah di sisimu atau di sisi peladen

Yang paling meyakinkan untuk dilakukan sekali: **melihat sendiri kata sandi terkirim dalam bentuk teks polos lewat HTTP**.

Setelah melihatnya, kamu tidak akan pernah lagi menganggap HTTPS sebagai formalitas.

**Peringatan penting:** hanya tangkap paket di jaringan yang kamu miliki atau punya izin. Menyadap jaringan orang lain melanggar hukum.`,

  praktik: {
    tujuan: `Kamu bisa menangkap dan menyaring paket, membaca isinya, dan memakainya untuk menelusuri masalah nyata.`,
    alat: [
      'Wireshark',
      'Jaringan milikmu sendiri atau laboratorium'
    ],
    langkah: [
      { judul: 'Pastikan kamu berhak menangkap',
        isi: `Tangkap hanya di jaringan pribadimu, laboratorium kampus dengan izin, atau lalu lintas komputermu sendiri.

Menangkap paket di jaringan publik atau milik orang lain **melanggar hukum**, dan tidak ada alasan akademis yang membenarkannya.` },
      { judul: 'Kurangi kebisingan dengan filter',
        isi: `Tanpa filter, kamu akan tenggelam dalam ribuan paket.

Filter yang paling sering dipakai:

- \`http\` atau \`dns\` — protokol tertentu
- \`ip.addr == 192.168.1.5\` — alamat tertentu
- \`tcp.port == 80\` — port tertentu
- gabungkan dengan \`and\` dan \`or\`` },
      { judul: 'Ikuti satu percakapan utuh',
        isi: `Klik kanan sebuah paket, pilih **Follow** lalu **TCP Stream**.

Kamu akan melihat seluruh percakapan sebagai teks berurutan — permintaan dan tanggapan lengkap.

Ini cara tercepat memahami protokol apa pun.` },
      { judul: 'Buktikan HTTP mengirim teks polos',
        isi: `Cari situs latihan berbasis HTTP, atau jalankan peladen HTTP lokalmu sendiri dengan formulir masuk.

Kirim nama pengguna dan kata sandi, lalu cari paketnya di Wireshark.

Kata sandinya **terbaca jelas**. Lakukan ini sekali; ia mengubah cara kamu memandang HTTPS selamanya.` },
      { judul: 'Bandingkan dengan HTTPS',
        isi: `Ulangi pada situs berbasis HTTPS. Sekarang isinya **acak**.

Yang masih terlihat: alamat IP tujuan dan nama domainnya lewat SNI. Jadi HTTPS menyembunyikan **isi**, bukan **kepada siapa** kamu terhubung.

Membedakan keduanya penting untuk memahami batas perlindungannya.` },
      { judul: 'Telusuri masalah nyata',
        isi: `Jalankan aplikasimu yang bermasalah sambil menangkap paket.

Pertanyaan yang bisa dijawab: apakah permintaannya benar-benar terkirim? apakah peladen menjawab? berapa lama jedanya? kode status apa yang dikembalikan?

Ini memisahkan masalah di sisimu dari masalah di sisi peladen — dan itu sering menghemat berjam-jam saling menyalahkan.` },
      { judul: 'Simpan tangkapan sebagai bukti',
        isi: `Simpan sebagai berkas \`.pcapng\`, lalu catat: kapan ditangkap, di antarmuka mana, dan filter apa yang dipakai.

Untuk keperluan forensik, hitung juga hash berkasnya — supaya bisa dibuktikan tidak berubah sejak ditangkap.

Ini menghubungkan langsung dengan chain of custody di Komputer Forensik.` }
    ],
    cek: [
      'Kamu bisa menyaring hanya lalu lintas satu alamat dan satu protokol',
      'Kamu sudah melihat sendiri kata sandi terkirim polos lewat HTTP',
      'Berkas tangkapanmu tersimpan beserta catatan waktu dan filternya'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa dibaca begitu',

  konsep: `
**Wireshark** adalah perangkat lunak **penganalisis protokol jaringan** yang paling banyak dipakai. Sifatnya **sumber terbuka**, dan tugasnya **merekam serta menganalisis lalu lintas data** yang lewat di jaringan secara langsung.

Cara kerjanya: **menangkap paket** yang lalu-lalang di antarmuka jaringan — WiFi atau Ethernet — lalu menampilkannya dalam bentuk yang **bisa dibaca manusia**.

**Tiga fungsi utamanya**

Tugas Wireshark milikmu menyebutkan tiganya:

- **Packet Capturing** — merekam aktivitas jaringan secara langsung, dimulai dengan menekan tombol Start dan memilih antarmuka.
- **Filtering** — memilih data tertentu dari ribuan paket yang masuk agar mudah dianalisis, misalnya mengetik \`tcp\` di kolom filter.
- **Deep Inspection** — melihat isi paket **berdasarkan lapisan OSI**.

Fungsi ketiga inilah yang membuat Wireshark begitu berguna untuk belajar: **model OSI yang tadinya abstrak menjadi terlihat.**

**Membaca satu paket per lapisan**

Tugasmu membedah Frame 20 dan menunjukkan polanya:

- **Layer 1 (Physical)** — nomor urut frame dan **ukuran paket**. Pada contohmu, 54 bytes atau 432 bits. Keterangan *"on wire"* dan *"captured"* yang sama besarnya menandakan paket tertangkap **utuh**.
- **Layer 2 (Data Link)** — **MAC Address** pengirim dan tujuan.
- **Layer 3 (Network)** — **IP Address** pengirim dan tujuan.
- **Layer 4 (Transport)** — **Port** dan protokolnya, misalnya TCP.

Perhatikan bahwa urutan pembacaan ini **persis kebalikan dari enkapsulasi**. Saat mengirim, header ditambahkan dari atas ke bawah; saat membaca di Wireshark, kamu membukanya dari luar ke dalam.

**Dua jenis filter yang harus dibedakan**

Ini yang paling sering membingungkan pemula:

- **Capture filter** — dipasang **sebelum** merekam. Paket yang tidak cocok **tidak pernah disimpan**. Sintaksnya BPF, misalnya \`port 80\`.
- **Display filter** — dipasang **sesudah** merekam. Semua paket tetap tersimpan, hanya tampilannya yang disaring. Sintaksnya berbeda, misalnya \`tcp.port == 80\`.

Perbedaannya menentukan. Kalau kamu memakai capture filter lalu ternyata butuh data lain, **datanya sudah hilang** dan harus merekam ulang. Karena itu untuk belajar, **rekam semuanya lalu saring saat menampilkan**.

**TCP three-way handshake**

Salah satu hal paling berguna yang bisa dilihat di Wireshark. Sebelum data mengalir, TCP membuka sambungan dengan tiga langkah:

- Klien mengirim **SYN**
- Server membalas **SYN, ACK**
- Klien mengirim **ACK**

Setelah itu barulah data dikirim. Menutupnya memakai **FIN** dan **ACK**.

Melihatnya langsung di Wireshark membuat gagasan *"TCP menjamin keandalan"* berubah dari kalimat hafalan menjadi sesuatu yang bisa diamati.

**Etika dan hukum**

Ini bukan catatan tambahan. Wireshark menangkap **lalu lintas milik orang lain** yang lewat di jaringan yang sama. Menyadap jaringan yang bukan milikmu atau tanpa izin **melanggar hukum** — di Indonesia diatur UU ITE.

Rekam hanya di jaringan yang kamu miliki atau yang kamu punya izin tertulis untuk mengujinya. Ini penerapan langsung dari topik Etika di PTI.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Capture filter vs Display filter -- BEDA sintaks & waktu\n\n# CAPTURE filter (sebelum rekam, sintaks BPF)\n#   port 80\n#   host 192.168.1.10\n#   tcp and not port 22\n#   -> paket tak cocok TIDAK PERNAH disimpan\n\n# DISPLAY filter (sesudah rekam, sintaks Wireshark)\n#   tcp.port == 80\n#   ip.addr == 192.168.1.10\n#   http.request.method == "GET"\n#   -> semua tersimpan, cuma tampilannya disaring\n\n# Untuk belajar: rekam SEMUA, saring saat menampilkan.',
      penjelasan: `
Perhatikan bahwa **sintaksnya berbeda**, dan itu sumber kebingungan yang paling sering terjadi. Menuliskan \`tcp.port == 80\` di kolom capture filter akan ditolak, begitu pula \`port 80\` di kolom display filter.

Alasannya sejarah: capture filter memakai **BPF**, bahasa penyaring tingkat rendah yang berjalan di dalam sistem operasi sebelum paket sampai ke Wireshark. Display filter adalah bahasa milik Wireshark sendiri, yang jauh lebih kaya karena bekerja pada paket yang sudah dibedah.

Perbedaan **waktu** jauh lebih menentukan daripada perbedaan sintaks:

**Capture filter** membuang paket **selamanya**. Kalau kamu merekam dengan filter \`port 80\` lalu menyadari masalahnya ternyata di DNS, kamu **tidak bisa** memeriksanya — paket DNS-nya tidak pernah tersimpan. Satu-satunya jalan adalah merekam ulang, dan kejadian yang ingin kamu amati mungkin sudah lewat.

**Display filter** tidak membuang apa pun. Kamu bisa mengubahnya berkali-kali, mencoba sudut pandang berbeda, tanpa kehilangan data.

Jadi kapan capture filter tetap berguna? Ketika lalu lintasnya **sangat padat** dan kamu tahu persis apa yang dicari. Merekam seluruh lalu lintas jaringan kampus selama sepuluh menit bisa menghasilkan berkas berukuran gigabyte yang sulit dibuka.

Aturan praktisnya: **untuk belajar dan menelusuri masalah, rekam semuanya.** Pakai capture filter hanya kalau volume datanya benar-benar menjadi persoalan.

Satu hal lagi yang berguna: display filter bisa digabung dengan **and**, **or**, dan **not**, serta dibandingkan dengan operator seperti \`>=\`. Misalnya \`tcp.len > 0 and ip.addr == 192.168.1.10\` untuk melihat hanya paket yang benar-benar membawa data.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Menirukan pembacaan paket seperti di Wireshark
# ============================================

# Satu frame hasil tangkapan, dibedah per lapisan
FRAME = {
    "nomor": 20,
    "waktu": 3.482917,
    "panjang_on_wire": 54,
    "panjang_captured": 54,
    "layer2": {"src_mac": "a4:5e:60:c1:22:31",
               "dst_mac": "e8:de:27:0f:9a:14",
               "type": "IPv4"},
    "layer3": {"src_ip": "192.168.1.5",
               "dst_ip": "103.23.20.10",
               "ttl": 64, "protocol": "TCP"},
    "layer4": {"src_port": 54321, "dst_port": 443,
               "flags": "SYN", "seq": 0, "window": 64240},
}

print("--- membedah Frame " + str(FRAME["nomor"]) + " ---")
print("")
print("  Layer 1 (Physical)")
print("    nomor urut  : " + str(FRAME["nomor"]))
print("    panjang     : " + str(FRAME["panjang_on_wire"]) + " bytes (" +
      str(FRAME["panjang_on_wire"] * 8) + " bits) on wire")
utuh = FRAME["panjang_on_wire"] == FRAME["panjang_captured"]
print("    captured    : " + str(FRAME["panjang_captured"]) + " bytes" +
      ("   -> tertangkap UTUH" if utuh else "   -> TERPOTONG"))

print("")
print("  Layer 2 (Data Link)  -- alamat MAC, berganti tiap lompatan")
print("    src MAC     : " + FRAME["layer2"]["src_mac"])
print("    dst MAC     : " + FRAME["layer2"]["dst_mac"])

print("")
print("  Layer 3 (Network)    -- alamat IP, TETAP sampai tujuan")
print("    src IP      : " + FRAME["layer3"]["src_ip"])
print("    dst IP      : " + FRAME["layer3"]["dst_ip"])
print("    TTL         : " + str(FRAME["layer3"]["ttl"]) +
      "   (berkurang 1 tiap router)")

print("")
print("  Layer 4 (Transport)  -- port menentukan APLIKASI mana")
print("    src port    : " + str(FRAME["layer4"]["src_port"]) +
      "   (acak, dipilih klien)")
print("    dst port    : " + str(FRAME["layer4"]["dst_port"]) +
      "     (HTTPS)")
print("    flags       : " + FRAME["layer4"]["flags"])


# ============================================
# TCP three-way handshake
# ============================================
print("")
print("--- TCP three-way handshake ---")
HANDSHAKE = [
    (1, "klien -> server", "SYN",      "seq=0",           "minta buka sambungan"),
    (2, "server -> klien", "SYN, ACK", "seq=0 ack=1",     "setuju, sekalian minta"),
    (3, "klien -> server", "ACK",      "seq=1 ack=1",     "setuju juga -- SIAP"),
    (4, "klien -> server", "PSH, ACK", "data 517 bytes",  "barulah data dikirim"),
]
for no, arah, flag, detail, arti in HANDSHAKE:
    print("  " + str(no) + ". " + arah.ljust(16) + flag.ljust(10) +
          detail.ljust(18) + arti)

print("")
print("  Tiga langkah pertama TIDAK membawa data sama sekali.")
print("  Itulah harga jaminan keandalan TCP -- dan alasan")
print("  UDP dipilih untuk panggilan video yang tak sanggup")
print("  menunggu tiga perjalanan bolak-balik dulu.")


# ============================================
# Port yang umum
# ============================================
print("")
print("--- port umum: dari port, tahu APLIKASI-nya ---")
PORT = [
    (20, 21, "FTP"), (22, 22, "SSH"), (25, 25, "SMTP"),
    (53, 53, "DNS"), (80, 80, "HTTP"), (443, 443, "HTTPS"),
    (3306, 3306, "MySQL"), (1521, 1521, "Oracle"),
]
for a, b, nama in PORT:
    label = str(a) if a == b else str(a) + "-" + str(b)
    print("  " + label.rjust(9) + "  " + nama)


# ============================================
# Display filter yang sering dipakai
# ============================================
print("")
print("--- display filter yang berguna ---")
FILTER = [
    ("tcp",                          "hanya paket TCP"),
    ("ip.addr == 192.168.1.10",      "dari ATAU ke alamat itu"),
    ("tcp.port == 443",              "lalu lintas HTTPS"),
    ("http.request.method == \"GET\"", "permintaan GET saja"),
    ("dns",                          "lalu lintas DNS"),
    ("tcp.flags.syn == 1 && tcp.flags.ack == 0",
                                     "hanya SYN awal -- pembuka sambungan"),
    ("tcp.analysis.retransmission",  "paket yang dikirim ulang"),
    ("frame.len > 1000",             "paket besar saja"),
]
for f, arti in FILTER:
    print("  " + f.ljust(42) + arti)

print("")
print("  CATATAN ETIKA: Wireshark menangkap lalu lintas milik")
print("  orang lain yang lewat di jaringan yang sama. Menyadap")
print("  jaringan tanpa izin melanggar hukum, di Indonesia")
print("  diatur UU ITE. Rekam hanya di jaringan sendiri, atau")
print("  yang kamu punya izin tertulis untuk mengujinya.")`
  },

  output: `--- membedah Frame 20 ---

  Layer 1 (Physical)
    nomor urut  : 20
    panjang     : 54 bytes (432 bits) on wire
    captured    : 54 bytes   -> tertangkap UTUH

  Layer 2 (Data Link)  -- alamat MAC, berganti tiap lompatan
    src MAC     : a4:5e:60:c1:22:31
    dst MAC     : e8:de:27:0f:9a:14

  Layer 3 (Network)    -- alamat IP, TETAP sampai tujuan
    src IP      : 192.168.1.5
    dst IP      : 103.23.20.10
    TTL         : 64   (berkurang 1 tiap router)

  Layer 4 (Transport)  -- port menentukan APLIKASI mana
    src port    : 54321   (acak, dipilih klien)
    dst port    : 443     (HTTPS)
    flags       : SYN

--- TCP three-way handshake ---
  1. klien -> server SYN       seq=0             minta buka sambungan
  2. server -> klien SYN, ACK  seq=0 ack=1       setuju, sekalian minta
  3. klien -> server ACK       seq=1 ack=1       setuju juga -- SIAP
  4. klien -> server PSH, ACK  data 517 bytes    barulah data dikirim

  Tiga langkah pertama TIDAK membawa data sama sekali.
  Itulah harga jaminan keandalan TCP -- dan alasan
  UDP dipilih untuk panggilan video yang tak sanggup
  menunggu tiga perjalanan bolak-balik dulu.

--- port umum: dari port, tahu APLIKASI-nya ---
      20-21  FTP
         22  SSH
         25  SMTP
         53  DNS
         80  HTTP
        443  HTTPS
       3306  MySQL
       1521  Oracle

--- display filter yang berguna ---
  tcp                                       hanya paket TCP
  ip.addr == 192.168.1.10                   dari ATAU ke alamat itu
  tcp.port == 443                           lalu lintas HTTPS
  http.request.method == "GET"              permintaan GET saja
  dns                                       lalu lintas DNS
  tcp.flags.syn == 1 && tcp.flags.ack == 0  hanya SYN awal -- pembuka sambungan
  tcp.analysis.retransmission               paket yang dikirim ulang
  frame.len > 1000                          paket besar saja

  CATATAN ETIKA: Wireshark menangkap lalu lintas milik
  orang lain yang lewat di jaringan yang sama. Menyadap
  jaringan tanpa izin melanggar hukum, di Indonesia
  diatur UU ITE. Rekam hanya di jaringan sendiri, atau
  yang kamu punya izin tertulis untuk mengujinya.`,

  kesalahanUmum: [
    {
      salah: 'Memakai sintaks display filter di kolom capture filter, atau sebaliknya.',
      kenapa: 'Keduanya bahasa yang berbeda: capture filter memakai BPF seperti port 80, sedangkan display filter memakai bahasa Wireshark seperti tcp.port == 80. Menukarnya membuat filter ditolak, dan pemula sering mengira Wireshark-nya yang bermasalah.',
      benar: 'Ingat bedanya dari titik pada nama field. Display filter memakai titik seperti tcp.port, capture filter tidak.'
    },
    {
      salah: 'Memasang capture filter yang sempit sejak awal saat menelusuri masalah.',
      kenapa: 'Paket yang tidak cocok tidak pernah disimpan, sehingga ketika ternyata masalahnya di protokol lain, datanya sudah hilang dan harus merekam ulang. Kejadian yang ingin diamati mungkin sudah lewat dan sulit diulang.',
      benar: 'Rekam semuanya, lalu saring dengan display filter yang bisa diubah berkali-kali. Pakai capture filter hanya kalau volume datanya benar-benar jadi persoalan.'
    },
    {
      salah: 'Menyadap jaringan publik atau jaringan orang lain untuk latihan.',
      kenapa: 'Wireshark menangkap lalu lintas milik semua orang di jaringan yang sama, termasuk data pribadi mereka. Melakukannya tanpa izin melanggar hukum, di Indonesia diatur UU ITE, dan tidak ada pembenaran berupa niat belajar.',
      benar: 'Rekam hanya di jaringan milikmu sendiri, atau di jaringan uji dengan izin tertulis. Untuk latihan, tersedia berkas rekaman contoh yang bisa diunduh resmi.'
    },
    {
      salah: 'Mengira bisa membaca isi lalu lintas HTTPS dari hasil rekaman biasa.',
      kenapa: 'HTTPS mengenkripsi muatannya, sehingga yang terlihat cuma header lapisan bawah seperti alamat IP dan port. Isi percakapannya berupa data acak. Salah paham ini membuat orang mengira rekamannya rusak atau Wireshark-nya salah pakai.',
      benar: 'Pahami bahwa yang terlihat pada HTTPS hanya metadata, bukan isinya. Inilah persis jaminan yang dijelaskan di topik Internet & Teknologi Web pada PTI.'
    }
  ],

  analogi: `Bayangkan kamu berdiri di gerbang tol dan mencatat setiap kendaraan yang lewat.

**Packet capturing** adalah **mulai mencatat**. Ribuan kendaraan lewat, dan kamu mencatat semuanya.

**Filtering** adalah *"tolong hanya tunjukkan truk"*. Dan di sinilah bedanya dua jenis filter:

- **Capture filter** — kamu berkata kepada petugas *"jangan catat apa pun selain truk"*. Hemat kertas. Tetapi kalau besok ternyata kamu perlu tahu soal bus, **catatannya tidak pernah ada**.
- **Display filter** — kamu mencatat semuanya, lalu memakai stabilo untuk menyorot truk. Besok kamu bisa menyorot bus, lalu motor, tanpa kehilangan apa pun.

**Deep inspection** adalah membuka satu kendaraan dan memeriksanya berlapis:

- **Lapisan 1** — seberapa besar kendaraannya, apakah utuh
- **Lapisan 2** — **siapa sopirnya sekarang**. Berganti di setiap pos.
- **Lapisan 3** — **alamat tujuan di surat jalan**. Tidak pernah berubah.
- **Lapisan 4** — **pintu nomor berapa** di gedung tujuan. Itulah port.

**TCP three-way handshake** adalah **percakapan sebelum kiriman**:

- *"Halo, saya mau kirim barang."* — SYN
- *"Silakan, saya siap menerima. Saya juga mau kirim balasan."* — SYN, ACK
- *"Baik, saya juga siap menerima balasanmu."* — ACK

Baru setelah itu barangnya berangkat. **Tiga percakapan, nol barang.** Itulah harga kepastian.

Dan itu pula alasan **panggilan video memilih UDP**: menunggu tiga kali bolak-balik sebelum setiap potongan gambar akan membuat percakapannya tersendat. Lebih baik ada satu-dua potongan yang hilang.

Terakhir, dan ini bukan sekadar catatan kaki: **kendaraan yang lewat gerbang itu bukan milikmu.** Mencatat lalu lintas jalan umum tanpa izin, lalu membuka isi muatannya, adalah hal yang jelas melanggar — betapa pun menariknya isinya.`,

  latihan: [
    'Sebutkan tiga fungsi utama Wireshark menurut tugasmu, dan jelaskan apa yang dilakukan masing-masing.',
    'Jelaskan informasi apa yang bisa dibaca pada Layer 1, 2, 3, dan 4 saat membedah sebuah frame di Wireshark.',
    'Jelaskan perbedaan capture filter dan display filter dari segi sintaks dan waktu penerapannya. Mana yang sebaiknya dipakai untuk menelusuri masalah, dan kenapa?',
    'Tuliskan display filter untuk: hanya lalu lintas DNS, hanya paket ke alamat 10.0.0.5, dan hanya paket SYN pembuka sambungan.',
    'Jelaskan tiga langkah TCP three-way handshake beserta flag di tiap langkah, lalu jelaskan kenapa panggilan video sering memilih UDP.',
    'Jelaskan kenapa isi lalu lintas HTTPS tidak bisa dibaca dari hasil rekaman biasa, dan informasi apa yang tetap terlihat.'
  ]
});
