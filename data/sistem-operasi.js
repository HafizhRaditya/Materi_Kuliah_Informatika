/* ============================================================
   sistem-operasi.js — materi Sistem Operasi (Semester 2)

   CATATAN SUMBER — penting dibaca.

   Mata kuliah ini di kelasmu sangat berorientasi PRAKTIKUM, bukan
   teori. Bukti dari berkasnya:
     - UTS  : instalasi Ubuntu di VirtualBox, konfigurasi jaringan
              bridge, instalasi MongoDB, program C sebagai client
              remote, lalu Challenge 4 "modifikasi program supaya
              menghasilkan deadlock"
     - UAS  : dua VM Ubuntu primary & secondary, Java + Maven,
              remote lewat SSH, replikasi
     - Deadlock/ : Deadlock.docx berisi program C pthread yang
              benar-benar mengunci dua mutex bersilangan

   Jadi satu-satunya topik yang bahannya BENAR-BENAR ADA di berkas
   adalah sinkronisasi dan deadlock — dan bahannya kuat, berupa
   kode pthread sungguhan.

   Topik penjadwalan CPU dan manajemen memori TIDAK ada di berkas,
   dan disusun dari silabus Sistem Operasi baku. Keduanya ditandai
   di awal topiknya masing-masing.

   Contoh kode memakai C dengan pthread, mengikuti bahasa yang
   dipakai di praktikum.

   Topik di sini memakai `judulLogicSyntax` menjadi "Bedah Konsep".
   ============================================================ */

TOPICS.push({
  id: 'so-proses-thread',
  judul: 'Proses & Thread',
  kategori: 'sistem-operasi',
  tag: ['proses', 'thread', 'PCB', 'context switch', 'concurrency', 'pthread'],
  ringkas: 'Dua cara menjalankan banyak pekerjaan sekaligus, dan kenapa pilihan di antaranya menentukan segalanya.',

  fungsi: `**Memahami apa yang terjadi saat program dijalankan, dan kenapa satu program bisa mengerjakan beberapa hal sekaligus.**

Terpakai di:

- **Menelusuri masalah kinerja** — apakah programmu terhambat CPU, disk, atau menunggu jaringan
- **Membaca Task Manager** dengan paham, bukan sekadar melihat angka
- **Memilih antara thread dan proses** saat membuat program yang mengerjakan banyak hal
- **Menjalankan peladen** — memahami worker dan proses anak
- **Komputer Forensik** — daftar proses yang berjalan adalah bukti yang paling cepat hilang

Perbedaan pokoknya: **proses punya memori sendiri, thread berbagi memori**.

Itu membuat thread jauh lebih ringan — dan jauh lebih berbahaya, karena mereka bisa saling merusak data.`,

  praktik: {
    tujuan: `Kamu bisa membaca daftar proses, membuat program bermulti-thread, dan tahu kapan thread tidak membantu sama sekali.`,
    alat: [
      'Python 3',
      'Task Manager, htop, atau perintah ps'
    ],
    langkah: [
      { judul: 'Amati proses yang sedang berjalan',
        isi: `- Windows: Task Manager, tab Details, tambahkan kolom PID dan Threads
- Linux atau macOS: \`ps aux\` atau \`htop\`

Cari satu aplikasi yang kamu buka, lihat berapa **thread** yang dimilikinya. Peramban biasanya punya puluhan, dan beberapa **proses** terpisah untuk tiap tab.` },
      { judul: 'Buat proses anak',
        isi: `Di Python, \`subprocess.run(["python", "lain.py"])\` menjalankan program lain sebagai proses terpisah.

Perhatikan bahwa keduanya punya **memori sendiri** — variabel di satu program tidak terlihat oleh yang lain.` },
      { judul: 'Buat thread dan lihat mereka berbagi memori',
        isi: `Pakai \`threading.Thread\` untuk menjalankan dua fungsi bersamaan.

Buat keduanya menambah satu variabel yang sama sebanyak sejuta kali, lalu cetak hasilnya.

Hasilnya **tidak** dua juta. Itulah bukti bahwa mereka berbagi memori dan saling menimpa — dan itu pengantar langsung ke topik sinkronisasi.` },
      { judul: 'Kenali GIL di Python',
        isi: `Python punya **Global Interpreter Lock** — hanya satu thread yang benar-benar menjalankan kode Python pada satu waktu.

Buktikan: jalankan perhitungan berat di satu thread lalu di empat thread. Waktunya **tidak** membaik.

Untuk pekerjaan berat CPU di Python, pakai \`multiprocessing\`, bukan \`threading\`.` },
      { judul: 'Buktikan thread tetap berguna untuk menunggu',
        isi: `Sekarang coba pekerjaan yang **menunggu** — misalnya mengunduh sepuluh halaman web.

Dengan satu thread butuh sepuluh kali waktu; dengan sepuluh thread hampir sama dengan satu unduhan.

GIL dilepas saat menunggu masukan atau keluaran, jadi thread tetap sangat berguna di sini.

Kaidahnya: **thread untuk menunggu, proses untuk menghitung.**` },
      { judul: 'Amati keadaan proses',
        isi: `Di \`htop\`, perhatikan kolom status: \`R\` berjalan, \`S\` tidur menunggu, \`D\` menunggu disk, \`Z\` zombie.

Proses yang lama berstatus \`D\` berarti terhambat disk, bukan CPU — dan menambah prosesor tidak akan menolong.

Membaca ini menghemat banyak waktu saat menelusuri kinerja.` }
    ],
    cek: [
      'Dua thread yang menambah variabel sama memberi hasil kurang dari yang seharusnya',
      'Empat thread tidak mempercepat perhitungan berat di Python',
      'Sepuluh thread mempercepat sepuluh unduhan secara berarti'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Program bukan proses.** Ini pembedaan pertama yang harus jelas:

- **Program** adalah berkas mati di disk. Sekumpulan instruksi yang tersimpan.
- **Proses** adalah program yang **sedang berjalan** — punya memori sendiri, register sendiri, dan keadaan sendiri.

Satu program bisa melahirkan **banyak proses**. Membuka tiga jendela peramban dari satu berkas \`.exe\` menghasilkan tiga proses berbeda.

**Apa yang dimiliki sebuah proses**

Sistem operasi menyimpan keterangan tiap proses di **PCB** (*Process Control Block*):

- **PID** — nomor pengenal proses
- **Keadaan** — sedang berjalan, siap, atau menunggu
- **Program counter** — instruksi berikutnya yang akan dijalankan
- **Isi register** — supaya bisa dilanjutkan persis di tempat ia berhenti
- **Ruang memori** — kode, data, heap, dan stack miliknya
- **Berkas yang sedang terbuka**

**Lima keadaan proses**

- **New** — baru dibuat
- **Ready** — siap jalan, menunggu giliran CPU
- **Running** — sedang dikerjakan CPU
- **Waiting** — menunggu sesuatu, misalnya pembacaan disk selesai
- **Terminated** — selesai

Perhatikan bahwa perpindahan dari **Running ke Ready** bukan karena prosesnya salah — ia sekadar **kehabisan jatah waktu**, lalu digeser supaya proses lain kebagian.

**Context switch**

Saat CPU berpindah dari satu proses ke proses lain, sistem operasi harus **menyimpan seluruh keadaan** proses lama ke PCB-nya, lalu **memuat keadaan** proses baru. Itulah **context switch**.

Prosesnya **tidak gratis**. Ia memakan waktu, dan selama itu CPU tidak mengerjakan pekerjaan berguna apa pun. Lebih dari itu, isi cache yang tadinya penuh data proses lama jadi **tidak berguna** untuk proses baru — dan seperti yang kamu pelajari di Orkom, cache yang meleset itu mahal.

**Thread — proses yang berbagi memori**

**Thread** adalah alur eksekusi di dalam satu proses. Beberapa thread dalam satu proses **berbagi**:

- Ruang memori yang sama
- Berkas yang terbuka
- Kode program yang sama

Tetapi masing-masing punya **sendiri**:

- Program counter
- Register
- Stack

**Inilah pembedaan yang paling menentukan.** Karena thread berbagi memori, mereka bisa saling berkomunikasi dengan mudah — cukup lewat variabel biasa. Tetapi karena itu pula, mereka bisa **saling merusak data** kalau tidak diatur. Itulah yang dibahas di topik Sinkronisasi.

**Kenapa thread, bukan proses?**

- **Jauh lebih ringan dibuat.** Membuat proses berarti menyalin seluruh ruang memori; membuat thread cukup menyiapkan stack baru.
- **Context switch antar-thread lebih murah**, karena ruang memorinya sama sehingga tabel halamannya tidak perlu diganti.
- **Berbagi data langsung**, tanpa perlu mekanisme khusus antar-proses.

Harganya: **satu thread yang crash bisa menjatuhkan seluruh proses**, karena memorinya bersama. Proses yang crash tidak mengganggu proses lain.

**Concurrency dan paralelisme**

Dua kata yang sering dianggap sama, padahal berbeda:

- **Concurrency** — banyak pekerjaan **sedang berlangsung** dalam rentang waktu yang sama. Bisa terjadi di satu inti CPU, dengan cara bergantian sangat cepat.
- **Paralelisme** — banyak pekerjaan **benar-benar dikerjakan pada saat yang sama**. Butuh lebih dari satu inti.

Satu inti CPU bisa **concurrent** tetapi tidak bisa **paralel**.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '#include <pthread.h>\n\n/* Thread berbagi memori: variabel ini dilihat SEMUA thread */\nint counter = 0;\n\nvoid* kerja(void* arg) {\n    counter++;          /* semua thread menyentuh variabel yang SAMA */\n    return NULL;\n}\n\nint main() {\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, kerja, NULL);\n    pthread_create(&t2, NULL, kerja, NULL);\n    pthread_join(t1, NULL);   /* tunggu t1 selesai */\n    pthread_join(t2, NULL);\n    return 0;\n}',
      penjelasan: `
Perhatikan variabel \`counter\` yang berada **di luar** fungsi. Karena thread berbagi ruang memori, **kedua thread menyentuh variabel yang sama persis** — bukan salinan masing-masing.

Inilah yang membedakan thread dari proses secara paling nyata. Kalau ini dua proses terpisah, masing-masing akan punya \`counter\` sendiri dan tidak saling melihat.

**\`pthread_create\`** menerima empat argumen, dan tiga yang penting:

- Alamat variabel \`pthread_t\` untuk menampung pengenal thread
- Atribut thread, biasanya \`NULL\` untuk bawaan
- **Fungsi yang akan dijalankan** thread itu
- Argumen untuk fungsi tersebut

Perhatikan bentuk fungsinya: **\`void* kerja(void* arg)\`**. Bentuk ini wajib — menerima pointer apa pun, mengembalikan pointer apa pun. Sifat serba-bisa \`void*\` dipakai supaya satu bentuk fungsi bisa menampung segala jenis data, dan kamu yang bertanggung jawab mengubahnya ke tipe yang benar.

**\`pthread_join\`** menunggu thread selesai. Ini sering dilupakan, dan akibatnya khas: **\`main\` selesai lebih dulu**, dan ketika proses induk berakhir, **seluruh thread di dalamnya ikut dimatikan** — bahkan yang belum selesai bekerja. Gejalanya berupa keluaran yang kadang muncul kadang tidak, berubah tiap kali dijalankan.

Perhatikan juga apa yang **tidak** ada di kode ini: **tidak ada penjamin urutan**. Thread mana yang jalan duluan tidak ditentukan sama sekali — itu urusan penjadwal sistem operasi, dan bisa berbeda tiap kali program dijalankan.

Dan karena keduanya menyentuh \`counter\` tanpa pengaman, kode ini punya **race condition**. Itu bahasan topik berikutnya.
`
    },
    {
      bahasa: 'c',
      kode: '/* PROSES: fork() menyalin seluruh ruang memori */\nint x = 10;\npid_t pid = fork();\nif (pid == 0) {\n    x = 20;             /* HANYA berubah di anak */\n} else {\n    /* di induk, x tetap 10 */\n}\n\n/* THREAD: berbagi memori, tidak ada penyalinan */\nint y = 10;\n/* kalau thread mengubah y jadi 20,\n   SEMUA thread melihat 20 */',
      penjelasan: `
Perbandingan ini memperlihatkan perbedaan mendasar antara proses dan thread dalam satu layar.

**\`fork()\`** membuat proses baru dengan **menyalin** seluruh ruang memori induknya. Setelah itu keduanya **terpisah sepenuhnya** — perubahan di satu sisi tidak terlihat di sisi lain. Karena itu \`x\` di anak berubah jadi 20 sementara di induk tetap 10.

Ada keanehan yang khas soal \`fork()\`: ia **mengembalikan dua kali**, di dua proses berbeda. Di proses anak ia mengembalikan **0**, di proses induk ia mengembalikan **PID anak**. Itulah cara membedakan keduanya, karena setelah titik itu **kode yang dijalankan sama persis**.

Sebaliknya thread **tidak menyalin apa pun**. Semua thread menunjuk ke ruang memori yang sama, sehingga perubahan langsung terlihat oleh semuanya.

Dari sini muncul pertukaran yang menentukan pilihan rancangan:

**Proses lebih aman.** Satu proses yang crash tidak menyentuh proses lain. Peramban modern memakai proses terpisah untuk tiap tab justru karena ini — satu halaman yang bermasalah tidak menjatuhkan seluruh peramban.

**Thread lebih cepat dan lebih hemat.** Tidak ada penyalinan memori, context switch-nya murah, dan berbagi data cukup lewat variabel biasa.

**Thread lebih berbahaya.** Justru karena berbagi memori, satu thread yang menulis sembarangan bisa merusak data thread lain. Dan satu thread yang crash biasanya menjatuhkan seluruh proses.

Aturan praktisnya: **pakai thread kalau pekerjaannya erat dan banyak berbagi data; pakai proses kalau pekerjaannya berdiri sendiri dan keandalan lebih penting daripada kecepatan.**
`
    }
  ],

  kode: {
    c: String.raw`/* ============================================
   Proses vs Thread
   Kompilasi: gcc program.c -o program -lpthread
   ============================================ */
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

/* ---------- Variabel global: DIBAGI semua thread ---------- */
int counter = 0;

void* naikkan(void* arg) {
    int id = *(int*)arg;
    for (int i = 0; i < 3; i++) {
        counter++;
        printf("  thread %d: counter = %d\n", id, counter);
        usleep(1000);            /* beri kesempatan thread lain */
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    int id1 = 1, id2 = 2;

    printf("counter awal = %d\n", counter);

    /* Membuat dua thread: keduanya menyentuh counter yang SAMA */
    pthread_create(&t1, NULL, naikkan, &id1);
    pthread_create(&t2, NULL, naikkan, &id2);

    /* WAJIB: tanpa join, main selesai duluan dan
       seluruh thread ikut dimatikan sebelum selesai */
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("counter akhir = %d\n", counter);
    printf("\nPerhatikan: urutan baris bisa BERBEDA tiap dijalankan.\n");
    printf("Penjadwal sistem operasi yang menentukan, bukan kodemu.\n");

    return 0;
}`,

    python: String.raw`# ============================================
# Proses vs Thread di Python
# ============================================
import threading
import multiprocessing
import time

counter_thread = 0

def naikkan_thread():
    global counter_thread
    for _ in range(3):
        counter_thread += 1
        time.sleep(0.001)

counter_proses = 0

def naikkan_proses():
    global counter_proses
    for _ in range(3):
        counter_proses += 1


# PENTING: SELURUH kode yang dijalankan harus berada di dalam
# penjaga ini, bukan cuma bagian prosesnya.
#
# Di Windows dan macOS, multiprocessing memakai metode "spawn":
# tiap proses anak MENGIMPOR ULANG berkas ini dari awal. Kalau ada
# kode di tingkat atas tanpa penjaga, kode itu ikut berjalan di
# setiap anak. Gejalanya: keluaran tercetak berkali-kali, dan
# jumlahnya berubah kalau jumlah prosesnya diubah.
#
# Di Linux metodenya "fork" sehingga tidak mengimpor ulang, dan
# masalah ini TIDAK muncul -- itu sebabnya bug seperti ini sering
# baru ketahuan saat program dipindah ke sistem operasi lain.
if __name__ == "__main__":
    # ---------- THREAD: berbagi memori ----------
    t1 = threading.Thread(target=naikkan_thread)
    t2 = threading.Thread(target=naikkan_thread)
    t1.start(); t2.start()
    t1.join(); t2.join()
    print("thread  -> counter =", counter_thread,
          " (terlihat perubahannya)")

    # ---------- PROSES: memori TERPISAH ----------
    p1 = multiprocessing.Process(target=naikkan_proses)
    p2 = multiprocessing.Process(target=naikkan_proses)
    p1.start(); p2.start()
    p1.join(); p2.join()
    print("proses  -> counter =", counter_proses,
          " (TIDAK berubah, memorinya terpisah)")

    # ---------- Concurrency vs paralelisme ----------
    print("")
    print("jumlah inti CPU :", multiprocessing.cpu_count())
    print("")
    print("Satu inti bisa CONCURRENT (bergantian sangat cepat)")
    print("tapi tidak bisa PARALEL (benar-benar bersamaan).")`
  },

  output: `counter awal = 0
  thread 1: counter = 1
  thread 2: counter = 2
  thread 1: counter = 3
  thread 2: counter = 4
  thread 2: counter = 5
  thread 1: counter = 6
counter akhir = 6

Perhatikan: urutan baris bisa BERBEDA tiap dijalankan.
Penjadwal sistem operasi yang menentukan, bukan kodemu.

-- versi Python --
thread  -> counter = 6  (terlihat perubahannya)
proses  -> counter = 0  (TIDAK berubah, memorinya terpisah)

jumlah inti CPU : 12

Satu inti bisa CONCURRENT (bergantian sangat cepat)
tapi tidak bisa PARALEL (benar-benar bersamaan).`,

  kesalahanUmum: [
    {
      salah: 'Memakai kata program dan proses seolah artinya sama.',
      kenapa: 'Program adalah berkas mati di disk, sedangkan proses adalah program yang sedang berjalan lengkap dengan memori dan keadaannya sendiri. Satu program bisa melahirkan banyak proses. Menyamakannya membuat soal tentang PCB dan keadaan proses jadi tidak masuk akal, karena berkas di disk tidak punya keadaan.',
      benar: 'Ingat bahwa proses adalah program plus keadaannya saat berjalan. Membuka tiga jendela dari satu berkas exe menghasilkan tiga proses dari satu program.'
    },
    {
      salah: 'Lupa memanggil pthread_join sehingga main selesai lebih dulu.',
      kenapa: 'Ketika proses induk berakhir, seluruh thread di dalamnya ikut dimatikan meski belum selesai bekerja. Gejalanya khas dan menyesatkan: keluaran kadang muncul lengkap kadang terpotong, dan berubah tiap kali dijalankan, sehingga terlihat seperti kesalahan acak yang sulit dilacak.',
      benar: 'Panggil pthread_join untuk setiap thread yang dibuat, sebelum main mengembalikan nilai.'
    },
    {
      salah: 'Mengira urutan jalannya thread bisa ditebak dari urutan pembuatannya.',
      kenapa: 'Penjadwal sistem operasi yang menentukan giliran, dan keputusannya bisa berbeda tiap kali program dijalankan. Program yang diam-diam mengandalkan urutan tertentu akan berjalan benar berkali-kali lalu tiba-tiba salah, dan bug seperti ini paling sulit direproduksi.',
      benar: 'Jangan pernah mengandalkan urutan. Kalau urutan memang penting, tegakkan dengan mekanisme sinkronisasi yang tegas.'
    },
    {
      salah: 'Menganggap thread selalu lebih baik daripada proses karena lebih ringan.',
      kenapa: 'Thread berbagi memori, sehingga satu thread yang menulis sembarangan bisa merusak data thread lain, dan satu thread yang crash biasanya menjatuhkan seluruh proses. Peramban modern justru memakai proses terpisah per tab demi keandalan, meski lebih boros.',
      benar: 'Pilih berdasarkan kebutuhan: thread untuk pekerjaan erat yang banyak berbagi data, proses untuk pekerjaan berdiri sendiri yang mengutamakan keandalan.'
    },
    {
      salah: 'Menyamakan concurrency dengan paralelisme.',
      kenapa: 'Concurrency berarti banyak pekerjaan sedang berlangsung dalam rentang waktu yang sama, dan bisa terjadi di satu inti dengan cara bergantian sangat cepat. Paralelisme berarti benar-benar dikerjakan bersamaan, dan menuntut lebih dari satu inti. Menyamakannya membuat orang mengira menambah thread di satu inti akan mempercepat perhitungan.',
      benar: 'Ingat bahwa satu inti bisa concurrent tetapi tidak bisa paralel. Menambah thread hanya mempercepat kalau pekerjaannya banyak menunggu, atau kalau intinya memang lebih dari satu.'
    }
  ],

  analogi: `Bayangkan sebuah dapur restoran.

**Program** adalah **buku resep** di rak. Diam, tidak melakukan apa-apa. **Proses** adalah **koki yang sedang memasak** resep itu — punya wajan sendiri, bahan sendiri, dan sudah sampai langkah tertentu.

Satu buku resep bisa dimasak **tiga koki sekaligus** di tiga meja berbeda. Itulah satu program, tiga proses.

**PCB** adalah **catatan di clipboard** tiap koki: sudah sampai langkah berapa, apa yang ada di wajannya, alat apa yang sedang dipegang.

**Context switch** adalah ketika satu kompor harus dipakai bergantian. Koki A harus **mencatat dulu** persis di langkah mana dia berhenti, menyingkirkan wajannya, lalu koki B menata ulang alatnya. Perpindahan itu memakan waktu — dan selama itu **tidak ada masakan yang maju**.

Sekarang **thread**. Bayangkan **satu koki dengan beberapa tangan**, semuanya bekerja di **meja yang sama** dengan **bahan yang sama**.

Keuntungannya jelas: tangan-tangan itu bisa saling menyodorkan bahan langsung, tanpa perlu berteriak antar-meja. Jauh lebih cepat daripada tiga koki di tiga meja terpisah.

Bahayanya juga jelas: kalau **dua tangan meraih mangkuk garam yang sama** pada saat bersamaan, atau satu tangan menuang gula sementara tangan lain sedang mengaduk adonan yang sama, hasilnya kacau. **Justru karena mereka berbagi meja.**

Dan kalau **satu tangan menjatuhkan panci panas**, seluruh koki itu terluka — bukan cuma satu tangan. Itulah kenapa satu thread yang crash menjatuhkan seluruh proses.

Terakhir: **concurrency** adalah satu koki yang menangani tiga masakan bergantian dengan cekatan. **Paralelisme** adalah tiga koki sungguhan. Dari luar sama-sama terlihat "tiga masakan berjalan", tetapi hanya yang kedua yang benar-benar bersamaan.`,

  latihan: [
    'Jelaskan perbedaan program, proses, dan thread dengan satu contoh dari komputermu sendiri.',
    'Sebutkan lima keadaan proses dan jelaskan apa yang memicu perpindahan dari Running ke Ready dan dari Running ke Waiting.',
    'Sebutkan apa saja yang dibagi bersama antar-thread dalam satu proses, dan apa saja yang dimiliki masing-masing.',
    'Jelaskan apa itu context switch dan sebutkan dua alasan kenapa ia memakan biaya. Kaitkan salah satunya dengan cache yang kamu pelajari di Orkom.',
    'Tuliskan program C yang membuat dua thread, masing-masing mencetak namanya lima kali. Jalankan beberapa kali dan catat apakah urutannya selalu sama.',
    'Jelaskan perbedaan concurrency dan paralelisme, lalu jelaskan kenapa menambah thread di komputer berinti satu belum tentu mempercepat perhitungan.'
  ]
});

TOPICS.push({
  id: 'so-sinkronisasi',
  judul: 'Race Condition & Sinkronisasi',
  kategori: 'sistem-operasi',
  tag: ['race condition', 'critical section', 'mutex', 'semaphore', 'atomic'],
  ringkas: 'Kenapa dua thread yang menambah satu variabel bisa menghasilkan angka yang salah.',

  fungsi: `**Mencegah beberapa alur kerja merusak data yang sama.**

Terpakai di:

- **Program bermulti-thread** — penghitung, penyangga, kumpulan data bersama
- **Aplikasi web** — dua pengguna memesan kursi terakhir pada saat yang sama
- **Basis data** — transaksi dan penguncian menyelesaikan masalah yang sama
- **Sistem berkas** — dua program menulis berkas yang sama

Yang membuatnya sulit: **bugnya tidak selalu muncul**. Program yang salah bisa berjalan benar seribu kali lalu gagal sekali — dan gagalnya justru saat beban tinggi.

Karena itu race condition tidak bisa ditemukan dengan mencoba-coba. Ia harus **dicegah dengan rancangan**.`,

  praktik: {
    tujuan: `Kamu bisa memunculkan race condition dengan sengaja, memperbaikinya dengan kunci, dan tahu biaya yang dibayar.`,
    alat: [
      'Python 3 dengan modul `threading`'
    ],
    langkah: [
      { judul: 'Munculkan race condition',
        isi: `Buat variabel bernilai nol, lalu jalankan dua thread yang masing-masing menambahnya sejuta kali.

Hasil yang benar dua juta. Yang keluar hampir selalu **kurang**.

Jalankan sepuluh kali dan catat hasilnya. Angkanya berbeda-beda — itulah ciri khas race condition.` },
      { judul: 'Pahami kenapa bisa hilang',
        isi: `\`x += 1\` terlihat satu langkah, tetapi sebenarnya tiga: **baca**, **tambah**, **tulis**.

Kalau thread kedua membaca di antara baca dan tulis milik thread pertama, keduanya menulis nilai yang sama — dan satu penambahan hilang.

Ini disebut **operasi tidak atomik**, dan hampir semua operasi terlihat lebih sederhana daripada sebenarnya.` },
      { judul: 'Perbaiki dengan Lock',
        isi: `- \`kunci = threading.Lock()\`
- lalu bungkus: \`with kunci: x += 1\`

Jalankan lagi sepuluh kali. Sekarang hasilnya **selalu** dua juta.

Bagian di dalam kunci disebut **critical section** — hanya satu thread boleh berada di sana pada satu waktu.` },
      { judul: 'Ukur biayanya',
        isi: `Bandingkan waktu versi tanpa kunci dan versi berkunci.

Versi berkunci **lebih lambat**. Itulah harga kebenaran, dan biasanya sepadan.

Tetapi ini juga alasan untuk membuat critical section **sesempit mungkin** — kunci hanya baris yang benar-benar perlu.` },
      { judul: 'Coba Semaphore untuk membatasi jumlah',
        isi: `Lock hanya mengizinkan satu. \`Semaphore(3)\` mengizinkan tiga sekaligus.

Berguna untuk membatasi sambungan basis data atau unduhan bersamaan.

Buat sepuluh thread yang memakai semaphore berukuran tiga, dan cetak berapa yang aktif tiap saat.` },
      { judul: 'Kenali padanannya di basis data',
        isi: `Masalah yang sama muncul saat dua pengguna memesan kursi terakhir.

Penyelesaiannya sama: **penguncian**. Di SQL, \`SELECT ... FOR UPDATE\` mengunci baris sampai transaksi selesai.

Coba dari dua terminal sekaligus dan lihat yang kedua menunggu.` }
    ],
    cek: [
      'Versi tanpa kunci memberi hasil berbeda-beda tiap dijalankan',
      'Versi berkunci selalu memberi hasil yang tepat',
      'Kamu bisa menjelaskan kenapa penambahan satu bukan operasi atomik'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
Perhatikan satu baris yang terlihat paling tidak berbahaya di dunia:

\`counter++;\`

Baris itu **tidak atomik**. Ia sebenarnya **tiga operasi**:

- **Baca** nilai \`counter\` dari memori ke register
- **Tambah** satu di register
- **Tulis** kembali ke memori

Dan di antara ketiga langkah itu, **thread lain bisa menyela**.

**Race condition**

Bayangkan \`counter\` bernilai 5, lalu dua thread menjalankan \`counter++\` bersamaan:

- Thread A **baca** 5
- Thread B **baca** 5 — sebelum A menulis
- Thread A **hitung** 6, **tulis** 6
- Thread B **hitung** 6, **tulis** 6

Hasilnya **6**, padahal seharusnya **7**. Satu penambahan **hilang**.

Inilah **race condition**: hasil program bergantung pada **urutan kebetulan** thread berjalan. Sifat terburuknya bukan salahnya, melainkan bahwa ia **tidak selalu salah**. Program bisa benar seribu kali lalu salah sekali, dan itu membuatnya sangat sulit diperbaiki.

**Critical section**

**Critical section** adalah bagian kode yang **menyentuh sumber daya bersama** dan karenanya **hanya boleh dimasuki satu thread pada satu waktu**.

Penyelesaiannya harus memenuhi tiga syarat, dan ketiganya sering ditanyakan:

- **Mutual exclusion** — hanya satu thread di dalam critical section pada satu waktu
- **Progress** — kalau tidak ada yang di dalam, salah satu yang menunggu harus boleh masuk
- **Bounded waiting** — ada batas berapa lama sebuah thread menunggu, supaya tidak ada yang terabaikan selamanya

**Mutex — kunci paling sederhana**

**Mutex** (*mutual exclusion*) adalah kunci yang hanya bisa dipegang **satu** thread. Yang lain menunggu sampai dilepas.

- **\`pthread_mutex_lock\`** — kunci. Kalau sudah terkunci, **tunggu**.
- **\`pthread_mutex_unlock\`** — lepas.

**Semaphore — kunci berhitung**

Semaphore memegang **hitungan**, bukan cuma terkunci atau tidak. Ia mengizinkan **sejumlah tertentu** thread masuk bersamaan.

- **\`wait\`** (turun) — kurangi hitungan; kalau nol, tunggu
- **\`signal\`** (naik) — tambah hitungan, bangunkan yang menunggu

Semaphore dengan hitungan awal **1** berperilaku seperti mutex, dan disebut *binary semaphore*. Gunanya yang khas adalah membatasi akses ke sumber daya yang jumlahnya terbatas — misalnya tiga printer untuk dua puluh pekerjaan.

**Biaya sinkronisasi**

Kunci bukan barang gratis. Ada tiga harganya:

- **Menunggu** — thread yang terhalang tidak mengerjakan apa pun
- **Overhead** — mengunci dan melepas sendiri butuh waktu
- **Kehilangan paralelisme** — critical section yang terlalu lebar membuat program kembali berjalan berurutan meski punya banyak inti

Karena itu **critical section harus dibuat sesempit mungkin**: kunci tepat sebelum menyentuh data bersama, lepas segera sesudahnya. Mengunci seluruh badan fungsi adalah kesalahan yang lazim.

Dan kunci sendiri bisa melahirkan masalah baru — itulah **deadlock**, yang dibahas di topik berikutnya.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '/* counter++ TERLIHAT satu operasi, sebenarnya TIGA */\n\ncounter++;\n\n/* Yang sesungguhnya terjadi:\n     1. baca  counter dari memori   -> register\n     2. tambah 1 di register\n     3. tulis register              -> memori\n\n   Thread lain bisa menyela DI ANTARA ketiganya. */\n\n/* counter = 5, dua thread bersamaan:\n     A baca 5\n     B baca 5        <- sebelum A menulis\n     A tulis 6\n     B tulis 6       <- satu penambahan HILANG\n   hasil 6, seharusnya 7 */',
      penjelasan: `
Inilah akar seluruh persoalan concurrency, dan letaknya di tempat yang paling tidak dicurigai.

Alasan \`counter++\` tidak atomik ada di tingkat perangkat keras, dan kamu sudah melihatnya di **Orkom**. Ingat tujuh tahap siklus instruksi? Menaikkan nilai di memori butuh **Operand Fetch**, **Data Operation**, dan **Operand Store** — tiga tahap terpisah. Di antara tahap-tahap itu, **interupsi bisa terjadi** dan penjadwal bisa memindahkan CPU ke thread lain.

Yang membuat bug ini begitu jahat adalah **sifatnya yang tidak konsisten**:

- Pada beban ringan, thread jarang bersamaan, jadi hasilnya sering benar.
- Pada mesin berinti satu, peluang bersamaannya lebih kecil.
- Menambahkan \`printf\` untuk memeriksa justru **mengubah waktunya** sehingga bugnya menghilang — inilah yang disebut *heisenbug*: menghilang begitu diamati.

Jadi program bisa lulus pengujian, berjalan berbulan-bulan, lalu salah tepat pada hari beban puncak.

Perhatikan bahwa masalahnya **bukan pada kecepatan atau jumlah thread**, melainkan pada **adanya data yang dibagi dan diubah**. Kalau setiap thread hanya menyentuh datanya sendiri, tidak ada race condition sama sekali — berapa pun jumlah thread-nya.

Itulah kenapa salah satu penyelesaian terbaik justru **bukan** menambah kunci, melainkan **menghilangkan data bersama**: beri tiap thread penghitung sendiri, lalu jumlahkan semuanya di akhir. Tidak ada kunci, tidak ada penungguan, dan hasilnya selalu benar.
`
    },
    {
      bahasa: 'c',
      kode: 'pthread_mutex_t kunci = PTHREAD_MUTEX_INITIALIZER;\n\n/* SALAH: critical section terlalu lebar */\nvoid* buruk(void* arg) {\n    pthread_mutex_lock(&kunci);\n    hitung_berat();        /* tidak menyentuh data bersama! */\n    counter++;\n    tulis_log();           /* juga tidak perlu dikunci */\n    pthread_mutex_unlock(&kunci);\n    return NULL;\n}\n\n/* BENAR: kunci hanya di sekitar data bersama */\nvoid* baik(void* arg) {\n    hitung_berat();\n    pthread_mutex_lock(&kunci);\n    counter++;             /* HANYA ini yang perlu dilindungi */\n    pthread_mutex_unlock(&kunci);\n    tulis_log();\n    return NULL;\n}',
      penjelasan: `
Kedua versi ini **sama-sama benar** hasilnya — tidak ada race condition di keduanya. Tetapi yang pertama membuang hampir seluruh manfaat memakai thread.

Bayangkan \`hitung_berat()\` memakan 100 milidetik dan \`counter++\` memakan sepersejuta detik. Pada versi **buruk**, seluruh 100 milidetik itu berada di dalam kunci — sehingga thread lain **menunggu** sepanjang itu.

Akibatnya: dengan delapan thread di delapan inti, hanya **satu** yang benar-benar bekerja pada satu waktu. Programnya kembali berjalan **berurutan**, dan kamu menanggung seluruh kerumitan thread tanpa mendapat kecepatannya. Kadang malah **lebih lambat** daripada versi satu thread, karena masih menanggung biaya penungguan dan context switch.

Pada versi **baik**, kunci hanya menutup satu baris. Kedelapan thread bisa mengerjakan \`hitung_berat()\` **benar-benar bersamaan**, dan hanya berebut selama sepersejuta detik.

Ini pola yang layak dihafal: **kerjakan yang berat di luar kunci, kunci hanya saat menyentuh data bersama.**

Ada satu bahaya lain yang tidak terlihat di sini: **jangan pernah memanggil fungsi yang tidak kamu kenali dari dalam critical section.** Kalau ternyata fungsi itu juga mencoba mengunci kunci yang sama, kamu mendapat **deadlock dengan diri sendiri** — thread itu menunggu kunci yang dipegangnya sendiri, selamanya.

Dan yang paling sering terjadi: **lupa melepas kunci** pada salah satu jalur keluar. Kalau ada \`return\` di tengah critical section tanpa \`unlock\`, kunci itu terkunci selamanya, dan **semua thread lain menggantung** — bukan cuma yang sekarang, tetapi selamanya sampai program dimatikan.
`
    }
  ],

  kode: {
    c: String.raw`/* ============================================
   Race condition dan tiga cara mengatasinya
   Kompilasi: gcc program.c -o program -lpthread
   ============================================ */
#include <stdio.h>
#include <pthread.h>

#define JUMLAH_THREAD 4
#define PUTARAN       100000

/* ---------- 1. TANPA pengaman: race condition ---------- */
long counter_rusak = 0;

void* tanpa_kunci(void* arg) {
    for (int i = 0; i < PUTARAN; i++) {
        counter_rusak++;          /* baca-tambah-tulis, bisa disela */
    }
    return NULL;
}

/* ---------- 2. DENGAN mutex: benar tapi ada biaya ---------- */
long counter_mutex = 0;
pthread_mutex_t kunci = PTHREAD_MUTEX_INITIALIZER;

void* dengan_kunci(void* arg) {
    for (int i = 0; i < PUTARAN; i++) {
        pthread_mutex_lock(&kunci);
        counter_mutex++;          /* critical section: SESEMPIT mungkin */
        pthread_mutex_unlock(&kunci);
    }
    return NULL;
}

/* ---------- 3. TANPA data bersama: tak perlu kunci ---------- */
long hasil_lokal[JUMLAH_THREAD];

void* tanpa_berbagi(void* arg) {
    int id = *(int*)arg;
    long lokal = 0;               /* milik thread ini sendiri */
    for (int i = 0; i < PUTARAN; i++) {
        lokal++;                  /* tidak ada yang berebut */
    }
    hasil_lokal[id] = lokal;      /* tulis sekali, ke slot sendiri */
    return NULL;
}

void jalankan(void* (*fungsi)(void*), const char* nama) {
    pthread_t t[JUMLAH_THREAD];
    int id[JUMLAH_THREAD];

    for (int i = 0; i < JUMLAH_THREAD; i++) {
        id[i] = i;
        pthread_create(&t[i], NULL, fungsi, &id[i]);
    }
    for (int i = 0; i < JUMLAH_THREAD; i++) {
        pthread_join(t[i], NULL);
    }
    printf("  %s selesai\n", nama);
}

int main(void) {
    long harusnya = (long)JUMLAH_THREAD * PUTARAN;
    printf("%d thread x %d putaran, seharusnya = %ld\n\n",
           JUMLAH_THREAD, PUTARAN, harusnya);

    jalankan(tanpa_kunci, "tanpa kunci ");
    printf("  hasil = %ld   %s\n\n", counter_rusak,
           counter_rusak == harusnya ? "(kebetulan benar)" : "<- SALAH");

    jalankan(dengan_kunci, "dengan mutex");
    printf("  hasil = %ld   %s\n\n", counter_mutex,
           counter_mutex == harusnya ? "<- benar" : "<- SALAH");

    jalankan(tanpa_berbagi, "tanpa berbagi");
    long total = 0;
    for (int i = 0; i < JUMLAH_THREAD; i++) total += hasil_lokal[i];
    printf("  hasil = %ld   %s\n\n", total,
           total == harusnya ? "<- benar, TANPA kunci sama sekali" : "<- SALAH");

    printf("Pelajarannya: cara terbaik mengatasi race condition\n");
    printf("sering bukan menambah kunci, melainkan MENGHILANGKAN\n");
    printf("data bersama sehingga tidak ada yang perlu diperebutkan.\n");
    return 0;
}`
  },

  output: `4 thread x 100000 putaran, seharusnya = 400000

  tanpa kunci  selesai
  hasil = 153277   <- SALAH  (angkanya BERBEDA tiap dijalankan)

  dengan mutex selesai
  hasil = 400000   <- benar

  tanpa berbagi selesai
  hasil = 400000   <- benar, TANPA kunci sama sekali

Pelajarannya: cara terbaik mengatasi race condition
sering bukan menambah kunci, melainkan MENGHILANGKAN
data bersama sehingga tidak ada yang perlu diperebutkan.`,

  kesalahanUmum: [
    {
      salah: 'Mengira operasi seperti counter++ bersifat atomik karena hanya satu baris.',
      kenapa: 'Satu baris kode bisa menjadi beberapa instruksi mesin: baca, tambah, tulis. Thread lain bisa menyela di antaranya, sehingga satu penambahan hilang. Panjang baris kode sama sekali tidak menentukan keatomikannya, dan ini sumber race condition yang paling sering luput.',
      benar: 'Anggap setiap operasi pada data bersama tidak atomik kecuali dijamin sebaliknya. Lindungi dengan mutex, atau pakai tipe atomik yang disediakan bahasa.'
    },
    {
      salah: 'Menyimpulkan tidak ada race condition karena program sudah dijalankan berkali-kali dan hasilnya benar.',
      kenapa: 'Race condition bergantung pada urutan kebetulan, sehingga bisa benar seribu kali lalu salah sekali. Beban ringan, mesin berinti sedikit, atau penambahan printf untuk memeriksa justru mengubah waktunya sehingga bug menghilang. Program bisa lulus pengujian lalu gagal tepat pada beban puncak.',
      benar: 'Periksa dengan menalar kodenya, bukan dengan mencoba. Kalau ada data bersama yang diubah tanpa pengaman, race condition itu ada meski belum pernah terlihat.'
    },
    {
      salah: 'Mengunci seluruh badan fungsi alih-alih hanya bagian yang menyentuh data bersama.',
      kenapa: 'Pekerjaan berat yang sebenarnya tidak perlu dilindungi ikut masuk ke dalam kunci, sehingga thread lain menunggu sepanjang itu. Programnya kembali berjalan berurutan meski punya banyak inti, dan kadang malah lebih lambat daripada versi satu thread karena masih menanggung biaya penungguan.',
      benar: 'Kerjakan yang berat di luar kunci. Kunci tepat sebelum menyentuh data bersama, lepas segera sesudahnya.'
    },
    {
      salah: 'Lupa melepas mutex pada salah satu jalur keluar fungsi.',
      kenapa: 'Kalau ada return di tengah critical section tanpa unlock, kunci itu terkunci selamanya. Seluruh thread lain yang membutuhkannya menggantung bukan cuma sesaat, melainkan sampai program dimatikan. Gejalanya berupa program yang membeku tanpa pesan kesalahan apa pun.',
      benar: 'Pastikan setiap jalur keluar melepas kunci. Kalau memungkinkan, pakai mekanisme yang melepas otomatis seperti with statement di Python atau lock_guard di C++.'
    },
    {
      salah: 'Menganggap menambah kunci selalu jalan keluar terbaik untuk data bersama.',
      kenapa: 'Kunci menambah penungguan, overhead, dan mengurangi paralelisme. Sering kali persoalannya bisa dihilangkan sepenuhnya dengan memberi tiap thread datanya sendiri lalu menggabungkan hasilnya di akhir, sehingga tidak ada yang perlu diperebutkan sama sekali.',
      benar: 'Pertimbangkan dulu apakah data bersamanya benar-benar perlu dibagi. Menghilangkan perebutan selalu lebih baik daripada mengatur perebutan.'
    }
  ],

  analogi: `Bayangkan papan tulis di ruang rapat, bertuliskan jumlah stok: **5**.

Dua petugas masuk hampir bersamaan, keduanya baru menerima satu barang.

- Petugas A **melihat** papan: 5. Dia berbalik mengambil spidol.
- Petugas B **melihat** papan: masih 5, karena A belum menulis.
- A menulis **6**.
- B menulis **6**, menimpa tulisan A.

Satu barang **hilang dari catatan**. Bukan karena ada yang malas atau salah hitung — keduanya bekerja dengan benar. Yang salah adalah **tidak ada aturan siapa boleh menulis kapan**.

**Mutex** adalah **satu spidol tunggal**. Siapa yang mau menulis harus memegang spidolnya, dan yang lain menunggu. Sederhana, dan menyelesaikan masalah sepenuhnya.

**Semaphore** adalah **tiga spidol**. Tiga orang boleh menulis bersamaan, orang keempat menunggu. Gunanya untuk sumber daya yang jumlahnya memang terbatas tapi lebih dari satu.

Sekarang soal **critical section yang terlalu lebar**. Bayangkan petugas yang mengambil spidol, lalu **menghitung ulang seluruh gudang selama dua jam** sambil tetap memegang spidol, baru menulis satu angka. Selama dua jam itu **tidak ada seorang pun yang boleh menulis**, padahal spidolnya hanya dibutuhkan sepuluh detik terakhir.

Yang benar: hitung gudangnya dulu, **baru** ambil spidol, tulis, letakkan.

Dan **lupa meletakkan spidol**? Itu petugas yang menulis lalu **membawa spidolnya pulang**. Besok tidak ada yang bisa menulis apa-apa, dan tidak ada yang tahu kenapa.

Terakhir, jalan keluar yang paling elegan: **beri setiap petugas papan tulisnya sendiri**, lalu jumlahkan semua papan di akhir hari. Tidak perlu spidol bersama, tidak ada yang menunggu, dan tidak mungkin ada yang hilang.`,

  latihan: [
    'Jelaskan kenapa counter++ tidak atomik, dan tunjukkan urutan penyelaan yang membuat satu penambahan hilang.',
    'Sebutkan tiga syarat yang harus dipenuhi penyelesaian critical section, dan jelaskan apa yang terjadi kalau bounded waiting dilanggar.',
    'Tuliskan program C dengan empat thread yang masing-masing menaikkan satu variabel bersama 100.000 kali. Jalankan tanpa mutex, catat hasilnya, lalu tambahkan mutex dan bandingkan.',
    'Jelaskan perbedaan mutex dan semaphore, lalu beri satu contoh keadaan yang lebih tepat memakai semaphore.',
    'Diberikan fungsi yang mengunci mutex, memanggil perhitungan berat, menaikkan penghitung, lalu melepas kunci. Tulis ulang supaya paralelismenya tidak hilang, dan jelaskan perbaikannya.',
    'Jelaskan kenapa memberi tiap thread penghitung sendiri lalu menjumlahkannya di akhir bisa lebih baik daripada memakai mutex. Sebutkan juga kapan cara ini tidak bisa dipakai.'
  ]
});

TOPICS.push({
  id: 'so-deadlock',
  judul: 'Deadlock',
  kategori: 'sistem-operasi',
  tag: ['deadlock', 'Coffman', 'circular wait', 'mutex', 'starvation', 'pencegahan'],
  ringkas: 'Dua thread yang saling menunggu selamanya — dan empat syarat yang harus terpenuhi agar itu terjadi.',

  fungsi: `**Mengenali dan mencegah keadaan saat semua pihak saling menunggu selamanya.**

Terpakai di:

- **Program bermulti-thread** yang memakai lebih dari satu kunci
- **Basis data** — dua transaksi saling menunggu baris yang dikunci lawannya
- **Menelusuri program yang menggantung** tanpa memakai CPU sama sekali
- **Merancang urutan penguncian** pada sistem yang rumit

Gejalanya khas dan mudah dikenali: **program berhenti merespons tetapi pemakaian CPU-nya nol**.

Kalau CPU-nya penuh, itu perulangan tak berujung. Kalau nol, itu saling menunggu.

Pencegahan yang paling praktis dan hampir selalu berhasil: **selalu ambil kunci dalam urutan yang sama**.`,

  praktik: {
    tujuan: `Kamu bisa membuat deadlock dengan sengaja, mendeteksinya, dan mencegahnya dengan urutan penguncian yang konsisten.`,
    alat: [
      'Python 3 dengan `threading`',
      'Basis data untuk percobaan kedua'
    ],
    langkah: [
      { judul: 'Buat deadlock dengan sengaja',
        isi: `Buat dua kunci, A dan B. Lalu:

- thread pertama: ambil A, tidur sebentar, ambil B
- thread kedua: ambil B, tidur sebentar, ambil A

Jalankan. Programnya **menggantung selamanya**, dan CPU-nya nol.

Tidur sebentar itu penting — ia memastikan keduanya sempat mengambil kunci pertamanya.` },
      { judul: 'Kenali keempat syaratnya',
        isi: `Deadlock butuh **keempat** hal ini sekaligus:

- **mutual exclusion** — sumber daya tidak bisa dibagi
- **hold and wait** — memegang satu sambil menunggu yang lain
- **no preemption** — tidak bisa direbut paksa
- **circular wait** — ada lingkaran saling menunggu

Menghilangkan **satu saja** sudah cukup untuk mencegahnya.` },
      { judul: 'Cegah dengan urutan penguncian',
        isi: `Ubah kedua thread agar **sama-sama** mengambil A dulu, baru B.

Jalankan lagi. Sekarang tidak pernah deadlock.

Ini menghilangkan **circular wait**, dan merupakan cara pencegahan yang paling praktis: tetapkan urutan baku untuk semua kunci, dan patuhi di seluruh program.` },
      { judul: 'Pakai batas waktu sebagai jaring pengaman',
        isi: `\`kunci.acquire(timeout=2)\` mengembalikan \`False\` kalau gagal dalam dua detik.

Dengan begitu programmu **melapor** alih-alih menggantung diam-diam.

Ini bukan pengganti urutan penguncian, melainkan tambahan supaya kegagalannya terlihat.` },
      { judul: 'Coba deadlock di basis data',
        isi: `Buka dua terminal. Di masing-masing mulai transaksi, lalu:

- terminal pertama memperbarui baris 1, lalu baris 2
- terminal kedua memperbarui baris 2, lalu baris 1

Basis data akan **mendeteksinya** dan membatalkan salah satu dengan pesan deadlock.

Ini perbedaan penting: basis data punya pendeteksi, program biasa tidak.` },
      { judul: 'Kenali starvation sebagai masalah berbeda',
        isi: `Starvation berbeda dari deadlock: tidak ada yang saling menunggu, tetapi satu pihak **tidak pernah kebagian** karena selalu kalah prioritas.

Programnya tetap berjalan, hanya saja ada yang tidak pernah dilayani.

Solusinya **aging** — menaikkan prioritas yang sudah lama menunggu, yang kamu temui di topik penjadwalan.` }
    ],
    cek: [
      'Deadlock buatanmu membuat program menggantung dengan CPU nol persen',
      'Setelah urutan penguncian disamakan, ia tidak pernah deadlock lagi',
      'Basis datamu mendeteksi dan membatalkan salah satu transaksi saat deadlock'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
**Deadlock** adalah keadaan di mana dua proses atau lebih **saling menunggu sumber daya** yang dipegang satu sama lain, sehingga **tidak ada satu pun yang bisa maju**. Selamanya.

Perhatikan bahwa ini bukan program yang lambat, dan bukan program yang crash. Programnya **hidup tetapi tidak bergerak** — dan tidak ada pesan kesalahan apa pun.

**Empat syarat Coffman**

Deadlock hanya terjadi kalau **keempat** syarat ini terpenuhi **bersamaan**. Ini bahan ujian yang hampir pasti muncul:

- **Mutual exclusion** — sumber dayanya tidak bisa dipakai bersama; hanya satu pemegang pada satu waktu.
- **Hold and wait** — sebuah proses **memegang** satu sumber daya sambil **menunggu** yang lain.
- **No preemption** — sumber daya **tidak bisa diambil paksa**; harus dilepas sendiri oleh pemegangnya.
- **Circular wait** — ada **rantai melingkar** proses yang saling menunggu: A menunggu B, B menunggu A.

Kata **bersamaan** itu kuncinya. Karena keempatnya wajib, **mematahkan satu saja sudah cukup** untuk mencegah deadlock. Inilah dasar semua strategi pencegahan.

**Contoh dari praktikummu**

Berkas \`Deadlock.docx\` di folder kuliahmu memuat kasus paling klasik:

- **Thread 1** mengunci **mutexA**, lalu mencoba mengunci **mutexB**
- **Thread 2** mengunci **mutexB**, lalu mencoba mengunci **mutexA**

Kalau keduanya berhasil mengunci yang pertama sebelum meminta yang kedua, keduanya **menunggu selamanya**. Perhatikan bahwa \`sleep(1)\` di kode itu bukan hiasan — ia **memastikan** kedua thread sudah memegang kunci pertamanya sebelum meminta yang kedua, sehingga deadlock-nya **dijamin terjadi** setiap kali dijalankan.

Tanpa \`sleep\`, deadlock-nya hanya **kadang-kadang** muncul, tergantung keberuntungan penjadwalan.

**Tiga pendekatan menangani deadlock**

- **Pencegahan** (*prevention*) — rancang sistem supaya salah satu syarat Coffman **mustahil** terpenuhi.
- **Penghindaran** (*avoidance*) — periksa sebelum mengabulkan permintaan, apakah keadaan tetap aman. Algoritma bankir milik Dijkstra adalah contohnya.
- **Deteksi dan pemulihan** — biarkan deadlock terjadi, deteksi lewat graf tunggu, lalu pulihkan dengan mematikan salah satu proses.

Ada pendekatan keempat yang jujur: **abaikan saja.** Sistem operasi seperti Linux dan Windows sebagian besar memakai cara ini untuk mutex tingkat pengguna, dengan alasan deadlock jarang terjadi dan biaya pencegahannya lebih mahal daripada kerugiannya. Reboot dianggap lebih murah.

**Cara pencegahan yang paling praktis: urutan kunci**

Ini yang paling sering dipakai di dunia nyata, dan paling mudah diterapkan: **selalu kunci sumber daya dalam urutan yang sama** di seluruh program.

Kalau setiap thread selalu mengunci mutexA sebelum mutexB, **circular wait menjadi mustahil**. Tidak akan pernah ada yang memegang B sambil menunggu A.

**Deadlock bukan starvation**

Dua istilah yang sering tertukar:

- **Deadlock** — semua yang terlibat **tidak bergerak sama sekali**. Tidak ada yang maju.
- **Starvation** — prosesnya **bisa** jalan, tetapi terus-menerus **kalah prioritas** sehingga tidak pernah kebagian. Sistemnya maju, satu proses itu saja yang tertinggal.
`,

  logicSyntax: [
    {
      bahasa: 'c',
      kode: '/* Dari Deadlock.docx -- kasus klasik dua mutex bersilangan */\n\nvoid* thread_func1(void* arg) {\n    pthread_mutex_lock(&mutexA);      /* dapat A */\n    sleep(1);                         /* pastikan thread 2 dapat B */\n    pthread_mutex_lock(&mutexB);      /* MENUNGGU B selamanya */\n    ...\n}\n\nvoid* thread_func2(void* arg) {\n    pthread_mutex_lock(&mutexB);      /* dapat B */\n    sleep(1);\n    pthread_mutex_lock(&mutexA);      /* MENUNGGU A selamanya */\n    ...\n}',
      penjelasan: `
Perhatikan bahwa **kedua fungsi ini benar kalau dibaca sendiri-sendiri.** Masing-masing mengunci dua mutex lalu melepasnya dengan rapi. Tidak ada satu pun baris yang salah.

Masalahnya baru muncul dari **hubungan antara keduanya**, dan justru itu yang membuat deadlock sulit ditemukan lewat pembacaan kode biasa. Kamu harus memeriksa **semua pasangan** jalur eksekusi yang mungkin berjalan bersamaan.

Sekarang perhatikan **\`sleep(1)\`**. Di kode praktikum, ia bukan sekadar penunda — ia **alat**. Fungsinya memastikan kedua thread sudah memegang kunci pertamanya **sebelum** ada yang meminta kunci kedua.

Tanpa \`sleep\`, urutan berikut sangat mungkin terjadi:

- Thread 1 kunci A, kunci B, lepas B, lepas A — **selesai**
- Thread 2 baru mulai, dan mendapat keduanya tanpa halangan

Programnya berjalan normal, dan deadlock-nya **tidak muncul**. Itulah kenapa Challenge 4 di UTS-mu meminta *"modifikasi program supaya menghasilkan deadlock"* — deadlock harus **dipaksa** supaya bisa diamati.

Ini pelajaran penting tentang sifatnya: **deadlock bergantung pada waktu**. Program yang punya potensi deadlock bisa berjalan normal berbulan-bulan, lalu menggantung tepat ketika beban tinggi membuat waktunya kebetulan pas. Pengujian di mesin ringan hampir tidak pernah menemukannya.

Sekarang mari petakan **keempat syarat Coffman** ke kode ini:

- **Mutual exclusion** — mutex memang hanya boleh dipegang satu thread. Terpenuhi.
- **Hold and wait** — thread 1 memegang A sambil menunggu B. Terpenuhi.
- **No preemption** — tidak ada yang bisa merampas mutex dari pemegangnya. Terpenuhi.
- **Circular wait** — 1 menunggu 2, dan 2 menunggu 1. Terpenuhi.

Keempatnya lengkap, jadi deadlock **pasti** bisa terjadi.
`
    },
    {
      bahasa: 'c',
      kode: '/* PERBAIKAN 1: urutan kunci SERAGAM\n   Semua thread mengunci A dulu, baru B.\n   Circular wait jadi MUSTAHIL. */\n\nvoid* aman1(void* arg) {\n    pthread_mutex_lock(&mutexA);\n    pthread_mutex_lock(&mutexB);      /* urutan sama */\n    ...\n    pthread_mutex_unlock(&mutexB);\n    pthread_mutex_unlock(&mutexA);\n}\n\nvoid* aman2(void* arg) {\n    pthread_mutex_lock(&mutexA);      /* BUKAN B dulu */\n    pthread_mutex_lock(&mutexB);\n    ...\n}',
      penjelasan: `
Inilah penyelesaian yang paling banyak dipakai di dunia nyata, dan cara kerjanya menyerang **circular wait** secara langsung.

Kalau **setiap** thread di seluruh program selalu mengunci dalam urutan A lalu B, maka keadaan "seseorang memegang B sambil menunggu A" **tidak akan pernah terbentuk**. Rantai melingkarnya patah, dan salah satu dari empat syarat Coffman gugur.

Untuk sumber daya yang jumlahnya banyak, aturannya diperluas: **tetapkan urutan menyeluruh** — misalnya berdasarkan alamat memori atau nomor pengenalnya — lalu selalu kunci dari yang kecil ke yang besar.

Contoh nyata yang sering muncul: transfer uang antar-rekening. Kalau kamu selalu mengunci **rekening bernomor lebih kecil lebih dulu**, transfer A ke B dan transfer B ke A tidak akan pernah saling memblokir.

Penyelesaian lain, masing-masing menyerang syarat yang berbeda:

**Menyerang hold and wait** — minta **semua** kunci sekaligus di awal, atau tidak sama sekali. Kalau tidak semuanya tersedia, lepaskan yang sudah didapat dan coba lagi dari awal. Harganya: bisa terjadi *livelock*, yaitu semua terus mencoba dan gagal berulang-ulang tanpa ada yang maju.

**Menyerang no preemption** — pakai **\`pthread_mutex_trylock\`**, yang **langsung gagal** kalau kunci sedang dipegang alih-alih menunggu. Kamu bisa melepas kunci yang sudah dipegang lalu mencoba lagi. Ini juga cara mendeteksi potensi deadlock secara praktis.

**Menyerang mutual exclusion** — hilangkan kebutuhan mengunci sama sekali, misalnya dengan struktur data *lock-free*, atau dengan memberi tiap thread datanya sendiri seperti yang dibahas di topik Sinkronisasi.

Dari semuanya, **urutan kunci yang seragam** adalah yang paling murah dan paling mudah dipatuhi, karena tidak menambah kode sama sekali — cuma disiplin.
`
    }
  ],

  kode: {
    c: String.raw`/* ============================================
   Deadlock: memaksanya terjadi, lalu memperbaikinya
   Kompilasi: gcc program.c -o program -lpthread
   ============================================ */
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

pthread_mutex_t mutexA = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t mutexB = PTHREAD_MUTEX_INITIALIZER;

/* ============================================
   VERSI DEADLOCK  (dari Deadlock.docx)
   Urutan kuncinya BERSILANGAN.
   ============================================ */

void* deadlock1(void* arg) {
    pthread_mutex_lock(&mutexA);
    printf("Thread 1: Locked mutexA\n");
    sleep(1);                       /* pastikan T2 sudah dapat B */
    printf("Thread 1: Trying to lock mutexB...\n");
    pthread_mutex_lock(&mutexB);    /* MENGGANTUNG di sini */
    printf("Thread 1: Locked mutexB\n");

    pthread_mutex_unlock(&mutexB);
    pthread_mutex_unlock(&mutexA);
    return NULL;
}

void* deadlock2(void* arg) {
    pthread_mutex_lock(&mutexB);
    printf("Thread 2: Locked mutexB\n");
    sleep(1);
    printf("Thread 2: Trying to lock mutexA...\n");
    pthread_mutex_lock(&mutexA);    /* MENGGANTUNG di sini */
    printf("Thread 2: Locked mutexA\n");

    pthread_mutex_unlock(&mutexA);
    pthread_mutex_unlock(&mutexB);
    return NULL;
}

/* ============================================
   VERSI AMAN: urutan kunci SERAGAM (A dulu, lalu B)
   Circular wait jadi mustahil.
   ============================================ */

void* aman1(void* arg) {
    pthread_mutex_lock(&mutexA);
    printf("Aman 1: dapat A\n");
    sleep(1);
    pthread_mutex_lock(&mutexB);
    printf("Aman 1: dapat B -- selesai\n");
    pthread_mutex_unlock(&mutexB);
    pthread_mutex_unlock(&mutexA);
    return NULL;
}

void* aman2(void* arg) {
    pthread_mutex_lock(&mutexA);    /* A dulu, BUKAN B */
    printf("Aman 2: dapat A\n");
    pthread_mutex_lock(&mutexB);
    printf("Aman 2: dapat B -- selesai\n");
    pthread_mutex_unlock(&mutexB);
    pthread_mutex_unlock(&mutexA);
    return NULL;
}

/* ============================================
   VERSI trylock: menyerang syarat no-preemption
   ============================================ */

void* pakai_trylock(void* arg) {
    int percobaan = 0;
    while (1) {
        percobaan++;
        pthread_mutex_lock(&mutexB);
        if (pthread_mutex_trylock(&mutexA) == 0) {
            printf("trylock: dapat B lalu A pada percobaan %d\n", percobaan);
            pthread_mutex_unlock(&mutexA);
            pthread_mutex_unlock(&mutexB);
            break;
        }
        /* gagal -> LEPASKAN yang sudah dipegang, jangan menunggu */
        pthread_mutex_unlock(&mutexB);
        usleep(1000);
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;

    printf("=== versi AMAN: urutan kunci seragam ===\n");
    pthread_create(&t1, NULL, aman1, NULL);
    pthread_create(&t2, NULL, aman2, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("\n=== versi trylock ===\n");
    pthread_create(&t1, NULL, aman1, NULL);
    pthread_create(&t2, NULL, pakai_trylock, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("\nEmpat syarat Coffman pada versi bersilangan:\n");
    printf("  1. mutual exclusion : mutex hanya satu pemegang\n");
    printf("  2. hold and wait    : pegang A, tunggu B\n");
    printf("  3. no preemption    : mutex tak bisa dirampas\n");
    printf("  4. circular wait    : 1 tunggu 2, 2 tunggu 1\n");
    printf("Patahkan SATU saja, deadlock mustahil terjadi.\n");

    /* Untuk melihat deadlock sungguhan, ganti aman1/aman2
       dengan deadlock1/deadlock2 -- programnya akan MENGGANTUNG
       dan harus dihentikan paksa dengan Ctrl+C. */
    return 0;
}`
  },

  output: `=== versi AMAN: urutan kunci seragam ===
Aman 1: dapat A
Aman 1: dapat B -- selesai
Aman 2: dapat A
Aman 2: dapat B -- selesai

=== versi trylock ===
Aman 1: dapat A
Aman 1: dapat B -- selesai
trylock: dapat B lalu A pada percobaan 99
   (jumlah percobaan berbeda tiap dijalankan -- itulah
    tanda ia benar-benar berebut, bukan menunggu)

Empat syarat Coffman pada versi bersilangan:
  1. mutual exclusion : mutex hanya satu pemegang
  2. hold and wait    : pegang A, tunggu B
  3. no preemption    : mutex tak bisa dirampas
  4. circular wait    : 1 tunggu 2, 2 tunggu 1
Patahkan SATU saja, deadlock mustahil terjadi.

-- Kalau deadlock1/deadlock2 yang dijalankan: --
Thread 1: Locked mutexA
Thread 2: Locked mutexB
Thread 1: Trying to lock mutexB...
Thread 2: Trying to lock mutexA...
   (menggantung selamanya, harus Ctrl+C)`,

  kesalahanUmum: [
    {
      salah: 'Menyebut tiga dari empat syarat Coffman, biasanya melupakan no preemption.',
      kenapa: 'Keempatnya harus terpenuhi bersamaan agar deadlock terjadi, sehingga daftar yang kurang satu membuat penalaran pencegahannya jadi salah. No preemption paling sering terlupa karena terasa seperti sifat bawaan yang tidak perlu disebut, padahal justru ia yang bisa dipatahkan dengan trylock.',
      benar: 'Hafalkan keempatnya: mutual exclusion, hold and wait, no preemption, dan circular wait. Ingat bahwa mematahkan satu saja sudah cukup mencegah.'
    },
    {
      salah: 'Menyimpulkan program bebas deadlock karena sudah dijalankan berkali-kali tanpa menggantung.',
      kenapa: 'Deadlock bergantung pada waktu. Tanpa penundaan yang memaksa, kedua thread sering selesai bergantian sehingga tidak pernah bertemu. Program bisa berjalan normal berbulan-bulan lalu menggantung tepat saat beban tinggi membuat waktunya kebetulan pas, dan pengujian di mesin ringan hampir tidak pernah menemukannya.',
      benar: 'Periksa urutan penguncian di seluruh kode, bukan dengan mencoba. Kalau ada dua jalur yang mengunci dua sumber daya dengan urutan berbeda, potensi deadlock sudah ada.'
    },
    {
      salah: 'Menukar deadlock dengan starvation.',
      kenapa: 'Pada deadlock, semua yang terlibat sama sekali tidak bergerak dan sistemnya berhenti di titik itu. Pada starvation, prosesnya sebenarnya bisa jalan tetapi terus kalah prioritas, sementara sistemnya secara keseluruhan tetap maju. Penanganannya berbeda: deadlock butuh pemutusan rantai, starvation butuh penuaan prioritas.',
      benar: 'Tanyakan apakah ada yang maju. Kalau tidak ada sama sekali, itu deadlock. Kalau sistemnya maju tetapi satu proses tertinggal terus, itu starvation.'
    },
    {
      salah: 'Mengunci dua sumber daya dengan urutan berbeda di dua fungsi yang berbeda.',
      kenapa: 'Masing-masing fungsi benar kalau dibaca sendiri-sendiri, dan tidak ada satu baris pun yang salah. Deadlock muncul dari hubungan antar keduanya, sehingga tidak terlihat saat memeriksa satu fungsi. Inilah yang membuatnya lolos dari tinjauan kode biasa.',
      benar: 'Tetapkan urutan penguncian yang seragam di seluruh program, misalnya berdasarkan alamat atau nomor pengenal sumber daya, lalu selalu kunci dari kecil ke besar.'
    },
    {
      salah: 'Mengira memakai trylock secara otomatis menghilangkan seluruh masalah.',
      kenapa: 'Trylock mencegah penungguan tak berujung, tetapi bisa melahirkan livelock: semua thread terus mencoba, gagal, melepas, lalu mencoba lagi dengan pola yang sama sehingga tidak ada yang pernah maju. Programnya sibuk memakai CPU penuh tanpa menghasilkan apa pun, dan itu lebih sulit dikenali daripada deadlock yang jelas membeku.',
      benar: 'Kalau memakai trylock, tambahkan penundaan acak sebelum mencoba lagi supaya polanya tidak seragam, dan batasi jumlah percobaannya.'
    }
  ],

  analogi: `Bayangkan dua orang di lorong sempit yang hanya bisa dilewati satu orang.

Bukan itu deadlock — itu cuma antre. **Deadlock** butuh gambaran yang lebih tepat: bayangkan dua orang makan di meja, dan hanya ada **satu sendok** dan **satu garpu**.

- Orang A mengambil **sendok**, lalu menunggu **garpu**.
- Orang B mengambil **garpu**, lalu menunggu **sendok**.

Keduanya duduk memegang satu alat, menatap alat yang dipegang orang lain. **Selamanya.** Tidak ada yang marah, tidak ada yang salah langkah — masing-masing bertindak masuk akal. Mereka cuma **tidak pernah bisa makan**.

Sekarang periksa keempat syaratnya:

- **Mutual exclusion** — sendoknya cuma satu, tak bisa dipakai berdua.
- **Hold and wait** — A memegang sendok sambil menunggu garpu.
- **No preemption** — tidak ada yang boleh merebut dari tangan orang lain.
- **Circular wait** — A menunggu B, B menunggu A.

Dan sekarang lihat betapa mudahnya **mematahkan satu saja**:

- **Aturan urutan** — *"siapa pun harus ambil sendok dulu, baru garpu"*. Sekarang siapa yang dapat sendok pasti bisa lanjut mengambil garpu, karena tidak mungkin ada orang yang memegang garpu tanpa sendok. **Rantainya patah.**
- **Ambil semua atau tidak sama sekali** — kalau kamu tidak bisa mengambil kedua alat sekaligus, letakkan kembali dan tunggu.
- **Boleh merebut** — pelayan berhak mengambil alat dari orang yang sudah menunggu terlalu lama.
- **Sediakan sumpit** — hilangkan kebutuhan berbagi sama sekali.

Terakhir, bedanya dengan **starvation**: kalau ada aturan *"yang paling senior makan dulu"*, dan terus ada senior baru datang, maka yang paling junior **bisa makan** — dia cuma tidak pernah kebagian. Meja itu tetap berjalan, hidangan tetap keluar. Hanya satu orang yang terus tertinggal.`,

  latihan: [
    'Sebutkan empat syarat Coffman, lalu tunjukkan bagaimana masing-masing terpenuhi pada program dua mutex bersilangan di materi ini.',
    'Jelaskan fungsi sleep(1) pada program deadlock di praktikum. Apa yang terjadi kalau baris itu dihapus, dan kenapa itu justru membuat bugnya lebih berbahaya?',
    'Perbaiki program deadlock dua mutex dengan menyeragamkan urutan penguncian. Jelaskan syarat Coffman mana yang kamu patahkan.',
    'Jelaskan perbedaan deadlock dan starvation, lalu beri satu contoh nyata untuk masing-masing.',
    'Jelaskan cara kerja pthread_mutex_trylock dalam mencegah deadlock, dan jelaskan masalah baru bernama livelock yang bisa muncul karenanya.',
    'Sebuah sistem transfer uang mengunci rekening pengirim lalu rekening penerima. Tunjukkan bagaimana dua transfer bersamaan bisa menimbulkan deadlock, lalu usulkan aturan penguncian yang mencegahnya.'
  ]
});

TOPICS.push({
  id: 'so-penjadwalan',
  judul: 'Penjadwalan CPU',
  kategori: 'sistem-operasi',
  tag: ['penjadwalan', 'FCFS', 'SJF', 'Round Robin', 'priority', 'starvation'],
  ringkas: 'Siapa dapat giliran CPU berikutnya — dan kenapa tidak ada jawaban yang benar untuk semua keadaan.',

  fungsi: `**Memahami bagaimana sistem operasi memilih proses mana yang jalan berikutnya.**

Terpakai di:

- **Menjelaskan kenapa program terasa lambat** meski CPU tidak penuh
- **Memilih prioritas proses** — \`nice\` di Linux, prioritas di Task Manager
- **Merancang antrean tugas** di aplikasimu sendiri
- **Sistem waktu nyata** — di mana tenggat lebih penting daripada rata-rata

Yang paling berguna dipahami: **tidak ada algoritma terbaik**, karena ukurannya bertentangan.

Yang cepat menyelesaikan rata-rata bisa membuat sebagian proses menunggu sangat lama. Yang adil bisa membuat semuanya agak lambat.

Pilihannya bergantung pada **apa yang paling penting** untuk sistem itu.`,

  praktik: {
    tujuan: `Kamu bisa menghitung waktu tunggu dan waktu penyelesaian untuk beberapa algoritma penjadwalan, dan melihat sendiri pertukarannya.`,
    alat: [
      'Python 3',
      'Kertas untuk diagram Gantt'
    ],
    langkah: [
      { judul: 'Siapkan satu kumpulan proses uji',
        isi: `Buat daftar berisi nama proses, waktu kedatangan, dan lama proses.

Pakai kumpulan yang **sama** untuk semua algoritma — hanya dengan begitu perbandingannya adil.

Sertakan satu proses yang sangat panjang dan beberapa yang pendek. Di situlah perbedaan algoritmanya terlihat.` },
      { judul: 'Gambar diagram Gantt-nya',
        isi: `Untuk tiap algoritma, gambar garis waktu dan tandai proses mana berjalan kapan.

Menggambarnya di kertas jauh lebih cepat memberi pemahaman daripada langsung menulis kode.` },
      { judul: 'Hitung ketiga ukurannya',
        isi: `- **waktu tunggu** = waktu mulai dikurangi waktu datang
- **waktu penyelesaian** = waktu selesai dikurangi waktu datang
- **waktu tanggap** = kapan pertama kali mendapat CPU

Yang terakhir paling penting untuk aplikasi interaktif — pengguna peduli **kapan mulai merespons**, bukan kapan selesai.` },
      { judul: 'Bandingkan FCFS dan SJF',
        isi: `**FCFS** melayani sesuai kedatangan. Adil, tetapi satu proses panjang di depan membuat semua menunggu — disebut **efek konvoi**.

**SJF** mendahulukan yang terpendek. Rata-rata waktu tunggunya **paling kecil**, dan itu terbukti secara matematis.

Tetapi SJF menuntut kamu **tahu lama proses sebelumnya** — dan di dunia nyata kamu tidak tahu.` },
      { judul: 'Uji Round Robin dengan beberapa kuantum',
        isi: `Jalankan Round Robin dengan kuantum 1, 4, dan 100.

- kuantum **kecil** → tanggapan cepat, tetapi banyak waktu terbuang untuk pergantian
- kuantum **besar** → mendekati FCFS

Cari kuantum yang memberi keseimbangan terbaik untuk kumpulan prosesmu.` },
      { judul: 'Buktikan starvation dan aging',
        isi: `Pakai penjadwalan berprioritas, lalu masukkan terus proses berprioritas tinggi.

Proses berprioritas rendah **tidak pernah** jalan.

Sekarang tambahkan **aging** — naikkan prioritas proses yang sudah lama menunggu. Jalankan lagi dan lihat ia akhirnya mendapat giliran.

Ini menghubungkan penjadwalan dengan masalah starvation dari topik deadlock.` }
    ],
    cek: [
      'SJF memberi rata-rata waktu tunggu paling kecil di antara algoritma yang kamu uji',
      'Round Robin dengan kuantum besar berperilaku mendekati FCFS',
      'Proses berprioritas rendah akhirnya berjalan setelah aging dinyalakan'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
> **Catatan sumber:** topik ini **tidak ada di berkas kuliahmu**. Praktikum Sistem Operasi di kelasmu berorientasi VM, MongoDB, dan deadlock. Materi ini disusun dari silabus Sistem Operasi baku, dan perlu dicocokkan kalau slide dosennya ketemu.

Proses yang siap jalan hampir selalu **lebih banyak daripada inti CPU**. **Penjadwal** (*scheduler*) adalah bagian sistem operasi yang memutuskan **siapa dapat giliran berikutnya**.

**Ukuran yang dinilai**

Sebelum membandingkan algoritma, kenali dulu apa yang diukur — karena algoritma yang menang di satu ukuran sering kalah di ukuran lain:

- **Waktu tunggu** (*waiting time*) — berapa lama proses menunggu di antrean Ready
- **Waktu penyelesaian** (*turnaround time*) — dari datang sampai selesai
- **Waktu tanggap** (*response time*) — dari datang sampai **pertama kali** mendapat CPU
- **Throughput** — berapa proses selesai per satuan waktu
- **Pemakaian CPU** — persentase waktu CPU sibuk

**Preemptive dan non-preemptive**

- **Non-preemptive** — proses yang sedang jalan **tidak bisa diganggu** sampai ia selesai atau menunggu I/O sendiri.
- **Preemptive** — sistem operasi **boleh merebut** CPU di tengah jalan.

Sistem interaktif hampir selalu preemptive. Tanpanya, satu proses yang berhitung lama akan **membekukan seluruh sistem**.

**Empat algoritma dasar**

**FCFS** (*First Come First Served*) — siapa datang duluan, dilayani duluan. Non-preemptive.

Sederhana dan adil dalam arti urutan. Kelemahannya besar: **convoy effect** — satu proses panjang di depan membuat semua proses pendek di belakangnya menunggu lama. Bayangkan satu orang belanja sebulan di depan antrean kasir, sementara sepuluh orang di belakangnya cuma beli permen.

**SJF** (*Shortest Job First*) — yang paling pendek dikerjakan duluan.

Secara matematis, **SJF menghasilkan waktu tunggu rata-rata paling kecil** — ini bisa dibuktikan, dan sering ditanyakan. Tetapi ia punya dua masalah serius: **durasi proses tidak bisa diketahui sebelumnya** (hanya bisa diperkirakan dari riwayat), dan proses panjang bisa **kelaparan** kalau proses pendek terus berdatangan.

Versi preemptive-nya disebut **SRTF** (*Shortest Remaining Time First*).

**Round Robin** — tiap proses dapat jatah waktu tetap yang disebut **quantum**, lalu digilir.

Inilah yang dipakai sistem interaktif. Keunggulannya **waktu tanggap yang baik dan merata** — tidak ada yang menunggu lama untuk mulai.

Pemilihan **quantum** menentukan segalanya:

- **Terlalu besar** → berperilaku seperti FCFS, dan waktu tanggapnya memburuk
- **Terlalu kecil** → context switch terlalu sering, dan CPU habis untuk berpindah alih-alih bekerja

**Priority Scheduling** — proses berprioritas tinggi didahulukan.

Masalah utamanya **starvation**: proses berprioritas rendah bisa tidak pernah kebagian. Penyelesaiannya **aging** — prioritas dinaikkan perlahan seiring lamanya menunggu.

**Tidak ada algoritma terbaik**

Ini kesimpulan yang penting. Pilihannya bergantung pada tujuan sistemnya:

- **Sistem interaktif** butuh waktu tanggap baik → **Round Robin**
- **Sistem batch** butuh throughput tinggi → **SJF**
- **Sistem waktu nyata** butuh jaminan tenggat → penjadwalan khusus dengan tenggat

Sistem operasi modern memakai gabungan berlapis yang disebut **multilevel feedback queue**, di mana proses berpindah antar-antrean berdasarkan perilakunya.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Convoy effect: satu proses panjang di depan\n# proses: (nama, durasi)\n\n# Urutan FCFS: P1 datang duluan\n#   P1 (24)  P2 (3)  P3 (3)\n#   tunggu:   0      24      27   -> rata-rata 17\n\n# Urutan SJF: yang pendek didahulukan\n#   P2 (3)  P3 (3)  P1 (24)\n#   tunggu:  0       3       6    -> rata-rata 3\n\n# Pekerjaannya SAMA, urutannya beda,\n# waktu tunggu rata-rata turun 17 -> 3',
      penjelasan: `
Perhatikan bahwa **tidak ada pekerjaan yang dihapus** di antara kedua susunan itu. Ketiga proses tetap butuh 24, 3, dan 3 satuan waktu. Yang berubah **hanya urutannya**, dan waktu tunggu rata-ratanya turun hampir enam kali lipat.

Alasannya bisa dinalar. Ketika proses panjang ditaruh di depan, **penantiannya ditanggung semua orang di belakang** — dua proses harus menunggu 24 satuan yang bukan urusan mereka. Ketika ditaruh di belakang, penantian panjang itu **hanya ditanggung dirinya sendiri**.

Inilah **convoy effect**, dan namanya tepat: satu truk lambat di jalan sempit membuat seluruh kendaraan di belakangnya ikut merayap.

Dari sini juga terlihat kenapa **SJF terbukti optimal** untuk waktu tunggu rata-rata. Bayangkan menukar dua proses bersebelahan sehingga yang lebih pendek di depan: proses pendek menunggu lebih sedikit, dan proses panjang menunggu lebih banyak — tetapi **penghematannya selalu lebih besar daripada tambahannya**, karena penantian proses di depan ditanggung semua yang di belakang. Ulangi penukaran itu terus, dan kamu sampai pada susunan terurut dari pendek ke panjang.

Tetapi perhatikan apa yang membuat SJF sulit dipakai: **kamu harus tahu durasinya lebih dulu**. Di dunia nyata, sistem operasi **tidak tahu** berapa lama sebuah proses akan berjalan. Yang bisa dilakukan hanyalah **memperkirakan dari riwayat** — biasanya dengan rata-rata bergerak eksponensial, di mana perilaku terakhir diberi bobot lebih besar.

Dan ada harga lain: kalau proses pendek terus berdatangan, proses panjang itu **tidak pernah kebagian sama sekali**. Itulah starvation.
`
    },
    {
      bahasa: 'python',
      kode: '# Round Robin: quantum menentukan segalanya\n\n# quantum = 100 -> mirip FCFS\n#   P1 jalan penuh 24, P2 baru mulai di detik 24\n#   waktu tanggap P3 = 27, BURUK untuk interaktif\n\n# quantum = 1 -> tanggap bagus, tapi boros\n#   30 proses x context switch tiap 1 satuan\n#   sebagian besar waktu habis untuk BERPINDAH\n\n# quantum = 4 -> jalan tengah\n#   umumnya dipilih supaya 80% proses selesai\n#   dalam satu quantum tanpa perlu digilir',
      penjelasan: `
Pemilihan **quantum** adalah pertukaran paling jelas di seluruh topik penjadwalan, dan kedua ujungnya sama-sama buruk.

**Quantum terlalu besar** membuat Round Robin **berubah menjadi FCFS**. Kalau quantum-nya lebih panjang daripada hampir semua proses, tidak ada yang pernah benar-benar digilir — masing-masing selesai dalam jatahnya. Waktu tanggapnya memburuk, dan seluruh keunggulan Round Robin hilang.

**Quantum terlalu kecil** menimbulkan masalah yang berbeda. Ingat dari topik Proses & Thread bahwa **context switch tidak gratis**: menyimpan register, memuat register, dan yang paling mahal, **cache yang jadi tidak berguna**.

Kalau quantum-nya 1 milidetik sementara context switch memakan 0,1 milidetik, maka **10 persen waktu CPU habis hanya untuk berpindah**. Sistemnya terlihat sibuk penuh tetapi pekerjaan yang benar-benar selesai jauh lebih sedikit.

Aturan praktis yang lazim dipakai: **pilih quantum supaya sekitar 80 persen proses selesai dalam satu quantum**. Dengan begitu sebagian besar proses tidak perlu digilir sama sekali, sementara proses panjang tetap tidak bisa memonopoli CPU.

Perhatikan satu hal yang membedakan Round Robin dari yang lain: ia **tidak unggul di waktu tunggu rata-rata** — SJF mengalahkannya. Yang diunggulkan Round Robin adalah **waktu tanggap** dan **pemerataan**.

Dan itulah yang sebenarnya kamu rasakan sebagai pengguna. Ketika kamu mengetik, kamu tidak peduli berapa waktu tunggu rata-rata seluruh sistem — kamu peduli **hurufnya muncul segera**. Round Robin menjamin tidak ada proses yang menunggu lebih dari jumlah proses dikali quantum sebelum mendapat giliran.

Inilah contoh nyata kenapa **"algoritma terbaik" bergantung pada apa yang kamu ukur.**
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Membandingkan empat algoritma penjadwalan
# ============================================

def hitung(nama_algo, jadwal, durasi):
    """jadwal = daftar (nama, mulai, selesai) potongan eksekusi."""
    selesai_akhir = {}
    mulai_pertama = {}
    for nama, mulai, selesai in jadwal:
        selesai_akhir[nama] = selesai
        if nama not in mulai_pertama:
            mulai_pertama[nama] = mulai

    print("  " + nama_algo)
    total_tunggu = total_selesai = total_tanggap = 0
    for nama in sorted(durasi):
        turnaround = selesai_akhir[nama]          # semua datang di t=0
        tunggu = turnaround - durasi[nama]
        tanggap = mulai_pertama[nama]
        total_tunggu += tunggu
        total_selesai += turnaround
        total_tanggap += tanggap
        print("    " + nama + "  durasi " + str(durasi[nama]).rjust(2) +
              "   tunggu " + str(tunggu).rjust(3) +
              "   selesai " + str(turnaround).rjust(3) +
              "   tanggap " + str(tanggap).rjust(3))
    n = len(durasi)
    print("    rata-rata: tunggu " + format(total_tunggu/n, "5.1f") +
          "   selesai " + format(total_selesai/n, "5.1f") +
          "   tanggap " + format(total_tanggap/n, "5.1f"))
    print("")
    return total_tunggu / n


durasi = {"P1": 24, "P2": 3, "P3": 3}

print("Tiga proses, semua datang pada waktu 0:")
print("  P1 = 24, P2 = 3, P3 = 3")
print("")

# ---------- FCFS: urutan kedatangan ----------
jadwal_fcfs = [("P1", 0, 24), ("P2", 24, 27), ("P3", 27, 30)]
w_fcfs = hitung("FCFS (urutan datang: P1, P2, P3)", jadwal_fcfs, durasi)

# ---------- SJF: terpendek dulu ----------
jadwal_sjf = [("P2", 0, 3), ("P3", 3, 6), ("P1", 6, 30)]
w_sjf = hitung("SJF (terpendek dulu: P2, P3, P1)", jadwal_sjf, durasi)

# ---------- Round Robin quantum 4 ----------
def round_robin(durasi, quantum):
    sisa = dict(durasi)
    antre = list(durasi)
    waktu = 0
    jadwal = []
    while antre:
        p = antre.pop(0)
        jalan = min(quantum, sisa[p])
        jadwal.append((p, waktu, waktu + jalan))
        waktu += jalan
        sisa[p] -= jalan
        if sisa[p] > 0:
            antre.append(p)
    return jadwal

w_rr4 = hitung("Round Robin (quantum 4)", round_robin(durasi, 4), durasi)
w_rr1 = hitung("Round Robin (quantum 1)", round_robin(durasi, 1), durasi)


# ============================================
# Kesimpulan: tidak ada yang menang di segalanya
# ============================================
print("=" * 52)
print("waktu tunggu rata-rata terkecil : SJF (" +
      format(w_sjf, ".1f") + ")")
print("waktu tanggap terbaik           : Round Robin quantum kecil")
print("")
print("SJF menang di waktu tunggu, TAPI:")
print("  - durasinya harus diketahui lebih dulu (di dunia nyata: tidak)")
print("  - proses panjang bisa kelaparan kalau yang pendek terus datang")
print("")
print("Round Robin kalah di waktu tunggu, TAPI:")
print("  - tidak ada proses yang menunggu lama untuk MULAI")
print("  - itulah yang kamu rasakan saat mengetik")
print("")
print("Yang 'terbaik' bergantung pada apa yang kamu ukur.")


# ============================================
# Starvation pada Priority Scheduling, dan obatnya
# ============================================

def simulasi_prioritas(pakai_aging, langkah=24):
    """Tiap satuan waktu datang satu proses berprioritas tinggi.
       P_rendah berprioritas 1, yang tinggi berprioritas 9."""
    antrean = [["P_rendah", 1, 0]]        # [nama, prioritas, lama tunggu]
    kapan_rendah_jalan = None

    for t in range(1, langkah + 1):
        antrean.append(["P_tinggi_" + str(t), 9, 0])
        for item in antrean:
            item[2] += 1                  # semua bertambah waktu tunggunya

        def efektif(x):
            # aging: tiap 2 satuan menunggu menaikkan prioritas 1 tingkat
            return x[1] + (x[2] // 2 if pakai_aging else 0)

        pilih = max(antrean, key=efektif)
        if pilih[0] == "P_rendah" and kapan_rendah_jalan is None:
            kapan_rendah_jalan = t
        antrean.remove(pilih)

    return kapan_rendah_jalan


print("")
print("--- starvation pada priority scheduling ---")
print("  P_rendah (prioritas 1) menunggu, sementara tiap satuan")
print("  waktu datang satu proses baru berprioritas 9.")
print("")

tanpa = simulasi_prioritas(pakai_aging=False)
dengan = simulasi_prioritas(pakai_aging=True)

if tanpa is None:
    print("  TANPA aging : P_rendah TIDAK PERNAH jalan (starvation)")
else:
    print("  TANPA aging : P_rendah jalan pada t=" + str(tanpa))

if dengan is None:
    print("  DENGAN aging: P_rendah masih belum jalan")
else:
    print("  DENGAN aging: P_rendah jalan pada t=" + str(dengan))

print("")
print("  Aging menaikkan prioritas efektif seiring lama menunggu,")
print("  sehingga cepat atau lambat proses rendah PASTI kebagian.")`
  },

  output: `Tiga proses, semua datang pada waktu 0:
  P1 = 24, P2 = 3, P3 = 3

  FCFS (urutan datang: P1, P2, P3)
    P1  durasi 24   tunggu   0   selesai  24   tanggap   0
    P2  durasi  3   tunggu  24   selesai  27   tanggap  24
    P3  durasi  3   tunggu  27   selesai  30   tanggap  27
    rata-rata: tunggu  17.0   selesai  27.0   tanggap  17.0

  SJF (terpendek dulu: P2, P3, P1)
    P1  durasi 24   tunggu   6   selesai  30   tanggap   6
    P2  durasi  3   tunggu   0   selesai   3   tanggap   0
    P3  durasi  3   tunggu   3   selesai   6   tanggap   3
    rata-rata: tunggu   3.0   selesai  13.0   tanggap   3.0

  Round Robin (quantum 4)
    P1  durasi 24   tunggu   6   selesai  30   tanggap   0
    P2  durasi  3   tunggu   4   selesai   7   tanggap   4
    P3  durasi  3   tunggu   7   selesai  10   tanggap   7
    rata-rata: tunggu   5.7   selesai  15.7   tanggap   3.7

  Round Robin (quantum 1)
    P1  durasi 24   tunggu   6   selesai  30   tanggap   0
    P2  durasi  3   tunggu   5   selesai   8   tanggap   1
    P3  durasi  3   tunggu   6   selesai   9   tanggap   2
    rata-rata: tunggu   5.7   selesai  15.7   tanggap   1.0

====================================================
waktu tunggu rata-rata terkecil : SJF (3.0)
waktu tanggap terbaik           : Round Robin quantum kecil

SJF menang di waktu tunggu, TAPI:
  - durasinya harus diketahui lebih dulu (di dunia nyata: tidak)
  - proses panjang bisa kelaparan kalau yang pendek terus datang

Round Robin kalah di waktu tunggu, TAPI:
  - tidak ada proses yang menunggu lama untuk MULAI
  - itulah yang kamu rasakan saat mengetik

Yang 'terbaik' bergantung pada apa yang kamu ukur.

--- starvation pada priority scheduling ---
  P_rendah (prioritas 1) menunggu, sementara tiap satuan
  waktu datang satu proses baru berprioritas 9.

  TANPA aging : P_rendah TIDAK PERNAH jalan (starvation)
  DENGAN aging: P_rendah jalan pada t=16

  Aging menaikkan prioritas efektif seiring lama menunggu,
  sehingga cepat atau lambat proses rendah PASTI kebagian.`,

  kesalahanUmum: [
    {
      salah: 'Menyimpulkan SJF adalah algoritma terbaik karena waktu tunggu rata-ratanya paling kecil.',
      kenapa: 'SJF memang terbukti optimal untuk ukuran itu, tetapi menuntut durasi proses diketahui lebih dulu, padahal sistem operasi tidak bisa mengetahuinya. Selain itu proses panjang bisa kelaparan kalau proses pendek terus berdatangan. Menyimpulkan terbaik dari satu ukuran saja mengabaikan kedua persoalan itu.',
      benar: 'Sebutkan ukuran mana yang dimenangkan, lalu sebutkan harganya. SJF unggul di waktu tunggu rata-rata tetapi tidak bisa diterapkan murni di sistem nyata.'
    },
    {
      salah: 'Menukar waktu tunggu dengan waktu tanggap.',
      kenapa: 'Waktu tunggu adalah total lama berada di antrean Ready, sedangkan waktu tanggap adalah lama sampai pertama kali mendapat CPU. Perbedaannya paling terasa pada Round Robin: waktu tunggunya bisa besar tetapi waktu tanggapnya sangat kecil, dan justru yang kedua itulah yang dirasakan pengguna interaktif.',
      benar: 'Ingat bahwa waktu tanggap hanya sampai sentuhan pertama, sedangkan waktu tunggu menjumlahkan seluruh penantian termasuk yang di tengah-tengah.'
    },
    {
      salah: 'Mengira memperkecil quantum Round Robin selalu memperbaiki kinerja.',
      kenapa: 'Quantum yang terlalu kecil membuat context switch terjadi sangat sering, dan tiap perpindahan memakan waktu sekaligus membuat isi cache tidak berguna. Pada quantum 1 milidetik dengan switch 0,1 milidetik, sepersepuluh waktu CPU habis hanya untuk berpindah. Sistemnya terlihat sibuk penuh padahal pekerjaan yang selesai lebih sedikit.',
      benar: 'Pilih quantum supaya sekitar 80 persen proses selesai dalam satu quantum. Perhitungkan biaya context switch, bukan cuma waktu tanggapnya.'
    },
    {
      salah: 'Memakai penjadwalan non-preemptive untuk sistem interaktif.',
      kenapa: 'Proses yang sedang berjalan tidak bisa diganggu sampai selesai, sehingga satu proses yang berhitung lama akan membekukan seluruh sistem. Pengguna tidak bisa menggerakkan kursor atau mengetik sampai proses itu selesai dengan sendirinya.',
      benar: 'Pakai penjadwalan preemptive untuk sistem interaktif. Non-preemptive hanya cocok untuk sistem batch yang tidak menuntut tanggapan cepat.'
    },
    {
      salah: 'Menganggap starvation pada Priority Scheduling tidak bisa diatasi.',
      kenapa: 'Ada penyelesaian baku bernama aging, yaitu menaikkan prioritas proses secara bertahap seiring lamanya ia menunggu. Dengan begitu proses berprioritas rendah pada akhirnya pasti terpilih. Tidak menyebut aging membuat jawaban soal tentang starvation jadi tidak lengkap.',
      benar: 'Sebut aging sebagai penyelesaiannya, dan jelaskan bahwa prioritas efektif adalah gabungan prioritas awal dengan lamanya menunggu.'
    }
  ],

  analogi: `Bayangkan satu kasir melayani antrean.

**FCFS** adalah antre biasa: siapa datang duluan dilayani duluan. Terasa adil — sampai ada satu orang di depan yang **belanja sebulan penuh**, dan sepuluh orang di belakangnya yang cuma beli permen harus menunggu setengah jam. Itulah **convoy effect**.

**SJF** adalah kasir yang melihat isi keranjang semua orang, lalu melayani yang **paling sedikit belanjaannya** dulu. Total penantian semua orang jadi paling kecil — itu bisa dibuktikan.

Tapi dua masalahnya nyata. Pertama, kasir **tidak bisa tahu** isi keranjang sebelum dihitung — di dunia nyata dia cuma bisa menebak dari kebiasaan pelanggan itu. Kedua, orang yang belanja sebulan itu **tidak akan pernah dilayani** selama masih ada yang datang membeli permen.

**Round Robin** adalah kasir yang memberi **setiap orang lima menit**, lalu menyuruhnya kembali ke belakang antrean kalau belum selesai.

Total penantiannya **lebih buruk** daripada SJF. Tapi perhatikan apa yang berubah: **tidak ada seorang pun yang berdiri setengah jam tanpa disentuh**. Semua merasa dilayani. Dan itulah yang kamu rasakan saat mengetik — kamu tidak peduli statistik seluruh sistem, kamu peduli **hurufmu muncul sekarang**.

Sekarang soal **quantum**. Kalau jatahnya **satu jam**, itu sama saja dengan FCFS — semua selesai dalam jatahnya, tidak ada yang digilir. Kalau jatahnya **sepuluh detik**, kasirnya menghabiskan lebih banyak waktu **menggeser orang** daripada memindai barang. Antreannya sibuk luar biasa dan hampir tidak ada yang selesai.

Dan **priority scheduling tanpa aging** adalah antrean yang selalu mendahulukan anggota VIP. Kalau VIP terus berdatangan, pelanggan biasa itu **bisa duduk di situ sampai toko tutup**. **Aging** adalah aturan bahwa setiap sepuluh menit menunggu, statusmu naik satu tingkat — sehingga cepat atau lambat, kamu pasti kebagian.`,

  latihan: [
    'Tiga proses datang pada waktu 0 dengan durasi P1=24, P2=3, P3=3. Hitung waktu tunggu rata-rata untuk FCFS dan SJF, lalu jelaskan kenapa selisihnya sebesar itu.',
    'Jelaskan apa itu convoy effect, dan tunjukkan susunan antrean yang memicunya.',
    'Jelaskan perbedaan waktu tunggu, waktu penyelesaian, dan waktu tanggap. Algoritma mana yang unggul pada masing-masing ukuran?',
    'Jelaskan pengaruh quantum yang terlalu besar dan terlalu kecil pada Round Robin. Sebutkan aturan praktis untuk memilihnya.',
    'Jelaskan kenapa SJF terbukti optimal untuk waktu tunggu rata-rata, lalu sebutkan dua alasan kenapa ia tetap tidak bisa dipakai murni di sistem nyata.',
    'Jelaskan apa itu starvation pada Priority Scheduling dan bagaimana aging mengatasinya. Tuliskan satu rumus prioritas efektif yang memperhitungkan lama menunggu.'
  ]
});

TOPICS.push({
  id: 'so-memori',
  judul: 'Manajemen Memori & Virtual Memory',
  kategori: 'sistem-operasi',
  tag: ['memori', 'paging', 'virtual memory', 'page fault', 'MMU', 'thrashing'],
  ringkas: 'Bagaimana banyak program muat di RAM yang terbatas — dan berpura-pura punya memori lebih besar.',

  fungsi: `**Memahami bagaimana program mendapat memori, dan kenapa ia bisa memakai lebih banyak daripada RAM yang ada.**

Terpakai di:

- **Menelusuri masalah memori** — kenapa program lambat saat RAM hampir penuh
- **Memahami kebocoran memori** dan cara menemukannya
- **Menjelaskan swap** — kenapa komputer tersendat parah saat RAM habis
- **Menjalankan peladen** — mengatur batas memori container
- **Keamanan** — mengapa satu program tidak bisa membaca memori program lain

Yang paling sering terasa dalam praktik: **thrashing**. Saat RAM habis, sistem menghabiskan lebih banyak waktu memindahkan halaman ke disk daripada bekerja — dan komputer terasa membeku meski CPU-nya tidak sibuk.`,

  praktik: {
    tujuan: `Kamu bisa membaca pemakaian memori sebuah program, menemukan kebocoran, dan menjelaskan kenapa memori virtual bisa lebih besar dari RAM.`,
    alat: [
      'Python 3 dengan `tracemalloc`',
      'htop atau Task Manager',
      'valgrind untuk C kalau tersedia'
    ],
    langkah: [
      { judul: 'Lihat peta memori sebuah proses',
        isi: `Di Linux: \`cat /proc/[pid]/maps\`

Kamu akan melihat bagian terpisah untuk kode, data, heap, stack, dan pustaka bersama.

Perhatikan bahwa alamatnya **virtual** — dua proses bisa punya alamat yang sama persis dan tidak bertabrakan.` },
      { judul: 'Bedakan memori virtual dan fisik',
        isi: `Di \`htop\`, kolom \`VIRT\` adalah memori virtual dan \`RES\` adalah yang benar-benar di RAM.

\`VIRT\` sering **jauh lebih besar** — karena mencakup yang dipesan tetapi belum dipakai, dan pustaka yang dibagi dengan proses lain.

Yang perlu kamu perhatikan saat menelusuri masalah adalah \`RES\`.` },
      { judul: 'Temukan kebocoran memori di Python',
        isi: `Pakai \`tracemalloc\`:

- \`tracemalloc.start()\` di awal
- jalankan bagian yang dicurigai
- \`tracemalloc.take_snapshot()\` lalu tampilkan sepuluh besar

Ia menyebutkan **baris mana** yang paling banyak mengalokasikan. Jauh lebih cepat daripada menebak.` },
      { judul: 'Buat kebocoran dengan sengaja',
        isi: `Buat daftar global, lalu tambahkan data ke dalamnya di dalam perulangan tanpa pernah dibuang.

Amati \`RES\` di htop naik terus. Inilah bentuk kebocoran paling umum di bahasa bergarbage collector: **objek masih dirujuk sehingga tidak pernah dibersihkan**.

Kebocoran di Python bukan lupa membebaskan, melainkan **lupa melepaskan rujukan**.` },
      { judul: 'Amati thrashing',
        isi: `**Hati-hati, ini bisa membuat komputermu tidak responsif sementara.** Lakukan saat tidak ada pekerjaan penting terbuka.

Alokasikan memori terus-menerus sampai mendekati kapasitas RAM, sambil mengamati kolom swap di htop.

Kamu akan melihat sistem mulai memindahkan halaman ke disk, dan semuanya melambat drastis. Hentikan programnya begitu terlihat.` },
      { judul: 'Hitung fragmentasi',
        isi: `Alokasikan seribu blok kecil, bebaskan yang berselang-seling, lalu coba alokasikan satu blok besar.

Total memori bebasnya cukup, tetapi tidak ada satu **potongan berurutan** yang cukup besar. Itulah **fragmentasi eksternal**.

Paging menyelesaikan ini dengan memecah memori menjadi halaman berukuran sama — dan itu alasan utama paging dipakai.` }
    ],
    cek: [
      'Kamu bisa membedakan kolom VIRT dan RES serta menjelaskan kenapa berbeda',
      'tracemalloc menunjukkan baris yang menyebabkan kebocoran buatanmu',
      'Kamu bisa menjelaskan kenapa fragmentasi membuat alokasi gagal meski memori bebas cukup'
    ]
  },
  judulLogicSyntax: 'Bedah Konsep — kenapa begitu',

  konsep: `
> **Catatan sumber:** sama seperti topik Penjadwalan, materi ini **tidak ada di berkas kuliahmu** dan disusun dari silabus Sistem Operasi baku.

Setiap proses merasa punya memori sendiri yang utuh dan berurutan mulai dari alamat nol. Padahal RAM fisiknya dibagi banyak proses sekaligus, dan letaknya berserakan. **Sistem operasi yang menciptakan ilusi itu.**

**Alamat logis dan alamat fisik**

- **Alamat logis** (*virtual*) — yang dilihat program. Selalu dimulai dari nol.
- **Alamat fisik** — letak sesungguhnya di RAM.

Yang menerjemahkan keduanya adalah **MMU** (*Memory Management Unit*), sebuah perangkat keras di dalam CPU. Penerjemahannya terjadi pada **setiap** akses memori — karena itu ia harus sangat cepat, dan tidak bisa dikerjakan perangkat lunak.

**Paging**

Gagasan intinya: **jangan memaksa memori proses berada di satu potongan berurutan.**

- Memori logis dibagi menjadi potongan berukuran tetap bernama **page**
- Memori fisik dibagi menjadi potongan berukuran sama bernama **frame**
- **Page mana menempati frame mana** dicatat di **tabel halaman** (*page table*)

Ukuran page yang lazim adalah **4 KB**.

Keuntungan besarnya: **fragmentasi eksternal hilang sepenuhnya.** Karena semua potongan berukuran sama, page mana pun muat di frame mana pun. Tidak ada lagi lubang yang terlalu kecil untuk dipakai.

Yang tersisa hanya **fragmentasi internal** — sisa ruang di page terakhir yang tidak terpakai penuh. Rata-rata setengah page per proses, dan itu dianggap harga yang murah.

**Virtual memory**

Kalau page bisa ditaruh di frame mana saja, ia juga bisa **tidak ditaruh di RAM sama sekali** — melainkan disimpan di disk, dan baru dimuat saat dibutuhkan.

Inilah **virtual memory**, dan akibatnya besar:

- Program bisa **lebih besar daripada RAM**
- **Lebih banyak proses** muat bersamaan
- Bagian program yang tidak pernah dipakai **tidak pernah memakan RAM**

**Page fault**

Ketika program mengakses page yang **tidak ada di RAM**, terjadi **page fault**:

- MMU menyadari page-nya tidak ada
- Sistem operasi mengambil alih
- Page-nya dibaca dari disk ke frame kosong
- Kalau tidak ada frame kosong, **satu page lama digusur**
- Instruksi yang tadi gagal **diulang**

Perhatikan bahwa page fault **bukan kesalahan program**. Ia bagian normal dari cara kerja sistem. Yang mahal adalah **biayanya**: akses RAM sekitar 100 nanodetik, akses disk bisa **jutaan** nanodetik. Satu page fault setara puluhan ribu akses RAM.

**Algoritma penggantian page**

Page mana yang digusur saat RAM penuh?

- **FIFO** — yang paling lama berada di RAM. Sederhana, tetapi bisa menggusur page yang justru sering dipakai. Ia juga bisa mengalami **anomali Belady**: menambah frame malah **menambah** page fault.
- **LRU** (*Least Recently Used*) — yang paling lama tidak dipakai. Paling mendekati optimal, dan sesuai prinsip lokalitas yang kamu pelajari di Orkom.
- **Optimal** — menggusur yang paling lama tidak akan dipakai di masa depan. **Mustahil diterapkan** karena butuh mengetahui masa depan, tetapi berguna sebagai pembanding.

**Thrashing**

Kalau proses terlalu banyak, tiap proses tidak kebagian cukup frame. Akibatnya page fault terus-menerus, dan sistem **menghabiskan lebih banyak waktu memindahkan page daripada bekerja**.

Gejalanya khas: **CPU hampir menganggur, disk sibuk penuh, dan sistem terasa membeku.** Penyelesaiannya justru **mengurangi** jumlah proses, bukan menambah.
`,

  logicSyntax: [
    {
      bahasa: 'python',
      kode: '# Alamat logis -> alamat fisik\n#\n# Ukuran page 4 KB = 4096 byte\n# Alamat logis dipecah dua bagian:\n#   nomor page  = alamat // 4096\n#   offset      = alamat %  4096\n\nalamat_logis = 9000\nnomor_page = alamat_logis // 4096      # 2\noffset     = alamat_logis %  4096      # 808\n\n# Tabel halaman: page 2 ada di frame 7\ntabel = {0: 5, 1: 3, 2: 7}\nframe = tabel[nomor_page]              # 7\n\nalamat_fisik = frame * 4096 + offset   # 29480',
      penjelasan: `
Perhatikan bahwa **offset tidak pernah diterjemahkan**. Ia disalin apa adanya dari alamat logis ke alamat fisik.

Itu bukan kebetulan — ia akibat langsung dari ukuran page dan frame yang **sama persis**. Kalau page 2 dipindahkan ke frame 7, letak sebuah byte **di dalam** page itu tidak berubah sama sekali. Yang berpindah cuma seluruh potongannya.

Karena itu penerjemahannya sangat murah di perangkat keras. Kalau ukuran page adalah pangkat dua, pembagian dan sisa bagi **tidak perlu dihitung sama sekali** — nomor page adalah bit-bit atas alamat, dan offset adalah bit-bit bawahnya. MMU cukup **memotong** alamatnya, lalu mengganti bagian atasnya dengan nomor frame.

Ini alasan yang sama dengan kenapa jumlah saluran cache selalu pangkat dua, yang kamu pelajari di topik Pemetaan Cache.

Sekarang persoalan yang muncul: **tabel halaman itu sendiri berada di memori.** Artinya setiap akses memori butuh **dua** akses: satu untuk membaca tabel halaman, satu untuk data yang sebenarnya. Kecepatannya jadi setengah.

Penyelesaiannya adalah **TLB** (*Translation Lookaside Buffer*), yaitu **cache khusus untuk tabel halaman** yang berada di dalam MMU. Ia menyimpan penerjemahan yang baru-baru ini dipakai.

Kalau penerjemahannya ada di TLB — disebut **TLB hit** — penerjemahan selesai tanpa menyentuh memori sama sekali. Karena prinsip lokalitas, hit rate TLB biasanya di atas 99 persen.

Jadi pola yang sama muncul lagi: **ada yang lambat tapi besar, maka taruh salinan yang sering dipakai di tempat kecil yang cepat.** Kamu sudah bertemu pola ini pada cache di Orkom, dan akan bertemu lagi di indeks basis data.
`
    },
    {
      bahasa: 'python',
      kode: '# Thrashing: gejalanya berlawanan dengan dugaan\n#\n# Sistem lambat -> naluri: "tambah prosesnya biar produktif"\n# Kenyataannya:  makin banyak proses\n#                -> tiap proses makin sedikit frame\n#                -> page fault makin sering\n#                -> disk makin sibuk\n#                -> CPU makin menganggur\n#                -> sistem makin lambat\n#\n# Ciri khas: CPU hampir 0%, disk 100%, sistem membeku\n# Obatnya: KURANGI proses, jangan tambah',
      penjelasan: `
Thrashing adalah contoh terbaik dari sistem yang **rusak dengan cara yang menyesatkan**, karena gejalanya mendorongmu melakukan hal yang justru memperparah.

Ikuti lingkaran setannya:

- Terlalu banyak proses berebut frame, sehingga masing-masing kebagian sedikit.
- Dengan frame yang sedikit, tiap proses **terus-menerus** mengalami page fault.
- Semua proses menunggu disk, sehingga **CPU menganggur**.
- Sistem operasi melihat CPU menganggur dan menyimpulkan *"masih ada kapasitas"*, lalu **memasukkan lebih banyak proses**.
- Frame per proses makin sedikit lagi. Lingkarannya mengencang.

Yang membuatnya jahat: **indikator yang biasa kamu percaya justru berbohong.** Pemakaian CPU rendah biasanya berarti sistem santai. Di sini, CPU rendah justru tanda sistem sedang sekarat.

Cara mengenalinya dari luar: **CPU hampir nol, disk seratus persen, dan sistem tidak menanggapi apa pun.** Kalau kamu pernah membuka terlalu banyak aplikasi berat sampai komputer membeku dan lampu hard disk menyala terus, itulah yang terjadi.

Penyelesaiannya berlawanan dengan naluri: **kurangi jumlah proses**, bukan tambah. Menutup beberapa aplikasi mengembalikan sistem jauh lebih cepat daripada menunggu.

Kaitannya dengan **prinsip lokalitas** langsung. Setiap proses punya kumpulan page yang sedang aktif dipakai, disebut **working set**. Selama working set-nya muat di frame yang tersedia, page fault jarang terjadi. Begitu tidak muat, page fault meledak.

Karena itu sistem operasi modern memakai **model working set**: perkirakan berapa frame yang benar-benar dibutuhkan tiap proses, lalu **jangan menerima proses baru** kalau jumlah keseluruhannya melebihi frame yang ada.
`
    }
  ],

  kode: {
    python: String.raw`# ============================================
# Paging: penerjemahan alamat & penggantian page
# ============================================

UKURAN_PAGE = 4096

def terjemah(alamat_logis, tabel):
    nomor_page = alamat_logis // UKURAN_PAGE
    offset     = alamat_logis %  UKURAN_PAGE
    if nomor_page not in tabel:
        return None, nomor_page, offset          # PAGE FAULT
    fisik = tabel[nomor_page] * UKURAN_PAGE + offset
    return fisik, nomor_page, offset


tabel = {0: 5, 1: 3, 2: 7}

print("--- penerjemahan alamat (page 4 KB) ---")
for alamat in [0, 4096, 9000, 20000]:
    fisik, page, offset = terjemah(alamat, tabel)
    if fisik is None:
        print("  logis " + str(alamat).rjust(6) +
              "  -> page " + str(page) + " offset " + str(offset).rjust(4) +
              "   PAGE FAULT (tidak ada di RAM)")
    else:
        print("  logis " + str(alamat).rjust(6) +
              "  -> page " + str(page) + " offset " + str(offset).rjust(4) +
              "   -> frame " + str(tabel[page]) +
              "  fisik " + str(fisik))

print("")
print("  Perhatikan: OFFSET tidak pernah berubah.")
print("  Hanya nomor page yang diganti jadi nomor frame.")


# ============================================
# Membandingkan algoritma penggantian page
# ============================================

def fifo(urutan, jumlah_frame):
    frame, fault = [], 0
    for p in urutan:
        if p not in frame:
            fault += 1
            if len(frame) >= jumlah_frame:
                frame.pop(0)                 # yang paling lama masuk
            frame.append(p)
    return fault

def lru(urutan, jumlah_frame):
    frame, fault = [], 0
    for p in urutan:
        if p in frame:
            frame.remove(p)
            frame.append(p)                  # segarkan posisi
        else:
            fault += 1
            if len(frame) >= jumlah_frame:
                frame.pop(0)                 # paling lama tak dipakai
            frame.append(p)
    return fault

def optimal(urutan, jumlah_frame):
    frame, fault = [], 0
    for i, p in enumerate(urutan):
        if p not in frame:
            fault += 1
            if len(frame) >= jumlah_frame:
                # gusur yang paling lama TIDAK akan dipakai lagi
                jauh, korban = -1, frame[0]
                for f in frame:
                    if f in urutan[i+1:]:
                        jarak = urutan[i+1:].index(f)
                    else:
                        jarak = len(urutan)   # tidak dipakai lagi
                    if jarak > jauh:
                        jauh, korban = jarak, f
                frame.remove(korban)
            frame.append(p)
    return fault


urutan = [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1]
print("")
print("--- page fault untuk urutan yang sama ---")
print("  urutan: " + " ".join(str(x) for x in urutan))
print("")
print("  frame   FIFO   LRU   Optimal")
for n in [3, 4]:
    print("    " + str(n) + "      " +
          str(fifo(urutan, n)).rjust(2) + "     " +
          str(lru(urutan, n)).rjust(2) + "      " +
          str(optimal(urutan, n)).rjust(2))


# ============================================
# Anomali Belady: menambah frame MENAMBAH fault
# ============================================
print("")
print("--- anomali Belady pada FIFO ---")
belady = [1,2,3,4,1,2,5,1,2,3,4,5]
print("  urutan: " + " ".join(str(x) for x in belady))
for n in [3, 4]:
    print("    FIFO " + str(n) + " frame -> " +
          str(fifo(belady, n)) + " page fault")
print("  Menambah frame justru MENAMBAH fault -- ini anomali Belady.")
print("  LRU tidak pernah mengalaminya:")
for n in [3, 4]:
    print("    LRU  " + str(n) + " frame -> " +
          str(lru(belady, n)) + " page fault")`
  },

  output: `--- penerjemahan alamat (page 4 KB) ---
  logis      0  -> page 0 offset    0   -> frame 5  fisik 20480
  logis   4096  -> page 1 offset    0   -> frame 3  fisik 12288
  logis   9000  -> page 2 offset  808   -> frame 7  fisik 29480
  logis  20000  -> page 4 offset 3616   PAGE FAULT (tidak ada di RAM)

  Perhatikan: OFFSET tidak pernah berubah.
  Hanya nomor page yang diganti jadi nomor frame.

--- page fault untuk urutan yang sama ---
  urutan: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1

  frame   FIFO   LRU   Optimal
    3      15     12       9
    4      10      8       8

--- anomali Belady pada FIFO ---
  urutan: 1 2 3 4 1 2 5 1 2 3 4 5
    FIFO 3 frame -> 9 page fault
    FIFO 4 frame -> 10 page fault
  Menambah frame justru MENAMBAH fault -- ini anomali Belady.
  LRU tidak pernah mengalaminya:
    LRU  3 frame -> 10 page fault
    LRU  4 frame -> 8 page fault`,

  kesalahanUmum: [
    {
      salah: 'Menganggap page fault sebagai kesalahan atau bug program.',
      kenapa: 'Page fault adalah bagian normal dari cara kerja virtual memory, bukan kesalahan. Ia terjadi setiap kali program menyentuh bagian yang belum dimuat ke RAM. Menganggapnya bug membuat orang mencari kesalahan di kode padahal yang perlu diperhatikan adalah frekuensinya.',
      benar: 'Perlakukan page fault sebagai peristiwa biasa yang mahal. Yang perlu dikhawatirkan bukan adanya page fault, melainkan seberapa sering ia terjadi.'
    },
    {
      salah: 'Menambah jumlah proses ketika sistem terasa lambat karena thrashing.',
      kenapa: 'Makin banyak proses berarti tiap proses kebagian frame lebih sedikit, page fault makin sering, dan sistem makin lambat. Yang menyesatkan adalah indikator CPU yang terlihat menganggur, sehingga sistem maupun pengguna menyimpulkan masih ada kapasitas kosong padahal justru sedang sekarat.',
      benar: 'Kenali cirinya: CPU hampir nol, disk penuh, sistem membeku. Kurangi jumlah proses, jangan tambah.'
    },
    {
      salah: 'Menukar fragmentasi internal dengan fragmentasi eksternal.',
      kenapa: 'Fragmentasi eksternal adalah lubang di antara alokasi yang terlalu kecil untuk dipakai, dan paging menghapusnya sepenuhnya karena semua potongan berukuran sama. Fragmentasi internal adalah sisa ruang di dalam page terakhir yang tidak terpakai penuh, dan justru inilah yang tersisa pada paging.',
      benar: 'Ingat bahwa paging menghapus fragmentasi eksternal tetapi memunculkan fragmentasi internal sebesar rata-rata setengah page per proses.'
    },
    {
      salah: 'Mengira menambah frame selalu mengurangi page fault.',
      kenapa: 'Pada algoritma FIFO bisa terjadi anomali Belady, di mana menambah frame justru menambah page fault. Contohnya urutan tertentu menghasilkan sembilan fault dengan tiga frame tetapi sepuluh fault dengan empat frame. LRU tidak pernah mengalaminya karena termasuk algoritma tumpukan.',
      benar: 'Sebutkan bahwa anomali Belady hanya terjadi pada algoritma tertentu seperti FIFO. LRU dan Optimal kebal terhadapnya.'
    },
    {
      salah: 'Melupakan TLB saat menjelaskan penerjemahan alamat.',
      kenapa: 'Tanpa TLB, setiap akses memori butuh dua akses: satu membaca tabel halaman, satu membaca datanya, sehingga kecepatannya jadi setengah. Penjelasan yang melewatkan TLB tidak bisa menerangkan kenapa paging tetap cepat meski tabelnya berada di memori.',
      benar: 'Sebutkan TLB sebagai cache khusus tabel halaman di dalam MMU, dengan hit rate biasanya di atas 99 persen berkat prinsip lokalitas.'
    }
  ],

  analogi: `Bayangkan perpustakaan dengan meja baca yang muat sepuluh buku.

**Alamat logis** adalah nomor halaman di daftar isi bukumu — kamu bilang *"halaman 200"*, dan tidak peduli buku itu sekarang ada di meja atau di gudang.

**Alamat fisik** adalah letak sesungguhnya. **MMU** adalah petugas yang menerjemahkan.

**Paging** adalah aturan bahwa **semua buku dipotong menjadi bendel setebal sama**. Karena tebalnya seragam, bendel mana pun muat di slot mana pun di meja. Tidak ada lagi celah yang terlalu sempit — itulah hilangnya **fragmentasi eksternal**.

Yang tersisa cuma **bendel terakhir yang tidak penuh**, dan itu **fragmentasi internal**. Kecil, dan dianggap wajar.

**Virtual memory** adalah menyadari bahwa **kamu tidak perlu seluruh buku di meja**. Cukup bendel yang sedang dibaca. Sisanya biar di gudang. Dengan begitu kamu bisa "membaca" buku yang jauh lebih tebal daripada mejamu.

**Page fault** adalah saat kamu membalik ke bendel yang ternyata masih di gudang. Petugas harus **berjalan ke gudang** mengambilnya. Bukan kesalahan — memang begitu cara kerjanya. Tapi **mahal**: mengambil dari meja butuh sedetik, dari gudang butuh sepuluh menit.

**TLB** adalah **catatan kecil di sakumu** berisi letak bendel yang baru-baru ini kamu pakai, supaya tidak perlu membuka katalog besar tiap kali.

Dan **thrashing** adalah gambaran yang paling penting dipahami. Bayangkan **dua puluh orang berbagi satu meja sepuluh slot**. Setiap orang cuma kebagian setengah slot, jadi hampir setiap kali membalik halaman, bendelnya harus diambil dari gudang — sambil menggusur bendel orang lain, yang sebentar lagi juga harus diambil ulang.

Petugas gudang **berlari terus tanpa henti**. Tapi **tidak ada seorang pun yang benar-benar membaca**. Semua duduk menunggu.

Dan inilah bagian yang menyesatkan: kalau kamu melihat ruangan itu, **mejanya terlihat sepi dan orang-orangnya terlihat menganggur**. Kesimpulan yang wajar tapi fatal: *"masih longgar, masukkan sepuluh orang lagi"*.`,

  latihan: [
    'Jelaskan perbedaan alamat logis dan alamat fisik, lalu jelaskan peran MMU dalam menerjemahkannya.',
    'Ukuran page 4 KB dan tabel halaman memetakan page 0 ke frame 5, page 1 ke frame 3, page 2 ke frame 7. Terjemahkan alamat logis 9000 menjadi alamat fisik, tunjukkan perhitungannya.',
    'Jelaskan kenapa offset tidak ikut diterjemahkan, dan kenapa ukuran page selalu dipilih pangkat dua.',
    'Jelaskan perbedaan fragmentasi internal dan eksternal, lalu jelaskan mana yang dihapus paging dan mana yang justru dimunculkannya.',
    'Untuk urutan referensi 7 0 1 2 0 3 0 4 2 3 0 3 2 dengan tiga frame, hitung jumlah page fault untuk FIFO dan LRU, lalu bandingkan.',
    'Jelaskan apa itu thrashing, sebutkan tiga cirinya yang bisa diamati, dan jelaskan kenapa menambah proses justru memperparahnya.'
  ]
});

