import { ModuleContent } from '../../types';

export const module12StrategiBelajar: ModuleContent = {
  id: 'strategi-belajar-karir',
  nomor: 12,
  judul: 'Strategi Belajar Efektif Menghadapi Ujian & Pengambilan Keputusan Karir',
  subjudul: 'Menguasai Metode Belajar Berbasis Neurosains (Active Recall & Spaced Repetition) dan Membangun Peta Jalan Karir Impian',
  emoji: '🎯',
  warnaAesthetic: 'from-amber-600 via-orange-700 to-stone-900',
  deskripsiSingkat: 'Layanan bimbingan klasikal mendalam untuk membekali siswa kelas 9 dengan metode belajar berbasis bukti ilmiah, manajemen waktu bebas prokrastinasi, serta keterampilan merumuskan keputusan karir strategis.',
  kelasTarget: ['9'],
  fokusJenjang: 'Kelas 9 / Ganjil (Fase D)',
  rpp: {
    identitas: {
      satuanPendidikan: 'SMP Negeri 7 Pasuruan',
      mataPelajaran: 'Bimbingan dan Konseling (BK)',
      kelasSemester: '9 / Ganjil',
      waktu: '2 JP (2 x 40 Menit)',
      materiPokok: 'Strategi Belajar Efektif Menghadapi Ujian & Pengambilan Keputusan Karir',
      bidangBimbingan: 'Belajar & Karir',
      modelPembelajaran: 'Project Based Learning (PjBL) & Deep Learning'
    },
    identifikasi: {
      kesiapanMurid: 'Banyak siswa kelas 9 masih terjebak metode belajar pasif (hanya membaca ulang dan menstabilo buku tanpa pemahaman), sistem kebut semalam (SKS), prokrastinasi gawai, serta kebingungan menentukan orientasi kelanjutan studi pasca SMP.',
      karakteristikMateri: 'Materi membedakan passive learning vs active retrieval practice, kurva lupa Ebbinghaus (Forgetting Curve), siklus Pomodoro 25/5, Cornell Note-taking system, serta framework pengambilan keputusan karir berdasar minat, bakat, dan peluang masa depan.',
      dimensiPancasila: [
        { dimensi: 'Mandiri', keterangan: 'Mampu menyusun jadwal belajar harian, menetapkan target akademik pribadi, dan memantau kemajuan belajarnya secara disiplin.' },
        { dimensi: 'Bernalar Kritis', keterangan: 'Mampu membedakan informasi krusial dalam materi ujian serta menganalisis relevansi pilihan studi dengan bakat dan pasar kerja masa depan.' },
        { dimensi: 'Kreatif', keterangan: 'Merancang flashcard rangkuman, peta pikiran (mind mapping), dan strategi pemecahan masalah soal ujian secara inovatif.' },
        { dimensi: 'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia', keterangan: 'Menjunjung tinggi integritas akademik, kejujuran dalam menempuh ujian, dan niat belajar sebagai ibadah mencari ilmu.' },
        { dimensi: 'Gotong Royong', keterangan: 'Berbagi rangkuman materi, menjadi tutor sebaya, dan saling menyemangati dalam tim belajar menghadapi ujian kelulusan.' },
        { dimensi: 'Kesehatan & Kesejahteraan', keterangan: 'Menghindari kelelahan kognitif (burnout) dengan menjaga ritme istirahat dan nutrisi otak yang proporsional.' },
        { dimensi: 'Berkebinekaan Global', keterangan: 'Melihat lanskap peluang karir global abad 21 di bidang teknologi, lingkungan, dan ekonomi kreatif.' },
        { dimensi: 'Kewargaan Digital', keterangan: 'Memanfaatkan aplikasi flashcard digital (seperti Anki/Quizlet) dan kecerdasan buatan untuk menguji pemahaman konsep secara etis.' }
      ]
    },
    desainKlasikal: {
      skkpd: 'Kematangan Hubungan Belajar dan Kemandirian Pengambilan Keputusan Karir',
      topikKontekstual: 'Kebiasaan SKS yang bikin lelah dan nilai anjlok, kebingungan memilih SMA Jurusan atau SMK Kejuruan, dan perancangan portofolio karir siswa kelas 9 SMPN 7 Pasuruan.',
      lintasDisiplin: 'Informatika (Aplikasi Produktivitas Digital), Bahasa Indonesia (Teknik Merangkum Efektif), Matematika (Perhitungan Peluang & Manajemen Waktu)',
      tujuanLayanan: [
        'Peserta didik mampu membedakan metode belajar pasif dan aktif serta memahami kurva daya ingat manusia (Tahap Pengenalan - C4).',
        'Peserta didik mampu menghargai pentingnya konsistensi belajar harian dan merumuskan prioritas karir masa depan (Tahap Akomodasi - A4).',
        'Peserta didik mampu menyusun jadwal belajar berkala (Spaced Repetition Schedule) dan membuat "Pohon Keputusan Karir Pribadi" (Tahap Tindakan - P4).'
      ],
      kerangkaPembelajaran: {
        praktikPedagogis: 'Demonstrasi active recall, simulasi teknik Pomodoro dengan timer, pemetaan SWOT diri, dan bedah studi kasus karir.',
        kemitraanPembelajaran: 'Kolaborasi Guru BK dengan Guru Wali Kelas 9, Guru Mata Pelajaran Ujian, Alumni sukses SMPN 7 Pasuruan, dan orang tua siswa.',
        lingkunganPembelajaran: 'Suasana kelas yang dinamis, fokus, dilengkapi musik pengiring konsentrasi (lo-fi beats), dan ruang apresiasi karya peta karir.',
        pemanfaatanDigital: 'Aplikasi modul interaktif web BK, timer Pomodoro digital, generator jadwal belajar, kuisioner diagnostik, dan kuis evaluasi.'
      }
    },
    integrasi7Jurus: [
      { jurusNo: 1, namaJurus: 'Jurus Active Recall (Uji Ingatan Mandiri)', implementasi: 'Menutup buku setelah membaca satu bab lalu menguji diri menuliskan apa yang diingat tanpa melihat sontekan.', mediaBentuk: 'Flashcard Uji Konsep' },
      { jurusNo: 2, namaJurus: 'Jurus Spaced Repetition (Pengulangan Berjarak)', implementasi: 'Mengulang materi di hari ke-1, ke-3, ke-7, dan ke-14 untuk mengunci memori ke ingatan jangka panjang.', mediaBentuk: 'Kalender Pengulangan Belajar' },
      { jurusNo: 3, namaJurus: 'Jurus Pomodoro 25/5 Fokus Tajam', implementasi: 'Belajar tanpa gawai selama 25 menit fokus penuh, dilanjutkan istirahat regang tubuh 5 menit.', mediaBentuk: 'Timer Pomodoro Kelas' },
      { jurusNo: 4, namaJurus: 'Jurus Catatan Cornell Tiga Kolom', implementasi: 'Membagi lembar catatan menjadi kolom kata kunci, catatan inti, dan ringkasan simpulan 2 kalimat.', mediaBentuk: 'Template Cornell Notes' },
      { jurusNo: 5, namaJurus: 'Jurus Teknik Feynman (Jelaskan ke Anak Kecil)', implementasi: 'Menjelaskan konsep rumus atau teori rumit dengan bahasa sehari-hari yang sangat sederhana.', mediaBentuk: 'Simulasi Tutor Sebaya' },
      { jurusNo: 6, namaJurus: 'Jurus Kompas Minat-Bakat Holland (RIASEC)', implementasi: 'Mencocokkan kecenderungan tipe kepribadian kerja dengan pilihan rumpun kejuruan SMA/SMK.', mediaBentuk: 'Lembar Skrining Karir' },
      { jurusNo: 7, namaJurus: 'Jurus Papan Visi Karir Abad 21', implementasi: 'Membuat visualisasi target sekolah impian, profesi masa depan, dan kompetensi yang harus diasah.', mediaBentuk: 'Vision Board Karya Siswa' }
    ],
    pelaksanaan: {
      prinsipPembelajaran: {
        berkesadaran: 'Siswa menyadari bahwa otak adalah otot yang dapat dilatih; bukan seberapa lama duduk membaca, melainkan seberapa dalam otak memproses informasi.',
        bermakna: 'Menghubungkan ketekunan belajar hari ini dengan terbukanya gerbang karir masa depan yang bermartabat dan membanggakan keluarga.',
        menggembirakan: 'Eksperimen belajar interaktif, tantangan Pomodoro seru, kuis ular tangga HOTS, dan permainan klasifikasi karir masa depan.'
      },
      pengalamanBelajar: {
        memahami: 'Mempelajari cara kerja memori jangka pendek vs jangka panjang dan pentingnya perencanaan karir sejak bangku SMP.',
        mengaplikasi: 'Mempraktikkan teknik Active Recall pada salah satu materi tersulit kelas 9 dan menyusun jadwal belajar pengulangan berjarak.',
        merefleksi: 'Mengevaluasi kebiasaan buruk belajar yang membuang waktu dan merumuskan komitmen belajar efektif bebas distraksi gawai.'
      },
      pjbl: 'Proyek "Papan Visi Karir & Panduan Jadwal Belajar Juara". Siswa secara personal merancang poster roadmap belajar 3 bulan menjelang ujian dan pohon keputusan karir pasca lulus SMP.',
      langkahLangkah: [
        { tahap: '1. Apersepsi & Audit Gaya Belajar (15 Menit)', aktivitas: 'Guru BK mendemonstrasikan fenomena "ilusi kompetensi" (merasa paham saat membaca tapi lupa saat ujian). Siswa mengisi kuisioner diagnostik strategi belajar & karir.' },
        { tahap: '2. Eksplorasi Strategi & Pemutaran Video Edukatif (25 Menit)', aktivitas: 'Menonton video inspiratif tentang transformasi Fajar dari siswa SKS berprestasi rendah menjadi pembelajar cerdas dengan metode Spaced Repetition dan kepastian arah karir.' },
        { tahap: '3. Workshop "Active Recall & Peta Karir Masa Depan" (25 Menit)', aktivitas: 'Siswa mempraktikkan teknik Feynman secara berpasangan, menyusun catatan Cornell, dan memetakan minat bakat menggunakan lembar keputusan karir.' },
        { tahap: '4. Kuis Ular Tangga HOTS & Komitmen Belajar (15 Menit)', aktivitas: 'Siswa menyelesaikan kuis evaluasi pemahaman, menyusun rencana aksi 7 hari ke depan, dan menandatangani pakta integritas belajar juara.' }
      ]
    },
    asesmenIndikatorTindakLanjut: {
      asesmen: 'Asesmen Proses (keaktifan simulasi teknik Feynman dan pembuatan catatan Cornell) dan Asesmen Hasil (skor 30 butir soal evaluasi, skor kuisioner diagnostik, dan produk Peta Visi Karir).',
      indikatorKeberhasilan: [
        'Siswa meninggalkan sistem kebut semalam (SKS) dan beralih ke belajar terjadwal secara konsisten.',
        'Siswa mampu mempraktikkan teknik Active Recall saat mereview materi pelajaran.',
        'Setiap siswa memiliki minimal dua opsi pilihan karir dan sekolah lanjutan yang realistis.'
      ],
      rencanaTindakLanjut: 'Siswa yang masih mengalami kesulitan belajar berat atau disorientasi karir akan difasilitasi dalam sesi bimbingan belajar khusus dan konseling karir terarah.'
    }
  },
  kuisioner: [
    {
      id: 1,
      pertanyaan: 'Bagaimana pola belajarmu yang paling dominan saat menghadapi ujian semester atau try out?',
      pilihan: [
        { label: 'Sistem Kebut Semalam (SKS): Belajar maraton semalaman penuh hingga subuh sebelum ujian', skor: 1, emoji: '🧟' },
        { label: 'Hanya membaca sekilas buku cetak atau catatan tanpa mencatat atau menguji ingatan', skor: 2, emoji: '📖' },
        { label: 'Belajar 2-3 hari sebelum ujian dengan membuat ringkasan sederhana', skor: 3, emoji: '📝' },
        { label: 'Belajar teratur setiap hari dengan mencicil materi, menggunakan metode Active Recall dan jadwal berjarak', skor: 4, emoji: '🏆' }
      ]
    },
    {
      id: 2,
      pertanyaan: 'Ketika sedang belajar di kamar atau meja belajar, bagaimana kamu mengelola godaan smartphone / media sosial?',
      pilihan: [
        { label: 'HP selalu di tangan, setiap 2 menit mengecek notifikasi TikTok/Instagram hingga lupa waktu belajar', skor: 1, emoji: '📱' },
        { label: 'Mencoba belajar tapi sering terdistraksi membalas chat teman berjam-jam', skor: 2, emoji: '💬' },
        { label: 'Menyimpan HP di dekat meja dalam mode hening (silent) dan hanya mengecek saat istirahat', skor: 3, emoji: '🔕' },
        { label: 'Menerapkan teknik Pomodoro: HP ditaruh di luar kamar atau mode fokus penuh selama sesi belajar berlangsung', skor: 4, emoji: '🎯' }
      ]
    },
    {
      id: 3,
      pertanyaan: 'Seberapa jelas pemahamanmu tentang perbedaan jalur pendidikan SMA, SMK, dan MA serta kaitannya dengan karir masa depanmu?',
      pilihan: [
        { label: 'Sama sekali tidak tahu, hanya ikut-ikutan teman dekat tanpa pertimbangan sendiri', skor: 1, emoji: '🤷' },
        { label: 'Tahu sedikit, tapi masih sangat bingung menentukan pilihan yang cocok untuk diriku', skor: 2, emoji: '🤔' },
        { label: 'Sudah memiliki gambaran umum mengenai perbedaan SMA dan SMK namun belum mantap', skor: 3, emoji: '🧐' },
        { label: 'Sangat paham karakteristik masing-masing jalur dan sudah memiliki target sekolah yang sesuai dengan bakat dan cita-cita karirku', skor: 4, emoji: '🧭' }
      ]
    },
    {
      id: 4,
      pertanyaan: 'Metode apakah yang biasa kamu gunakan untuk memastikan bahwa kamu benar-benar menguasai materi pelajaran yang sulit?',
      pilihan: [
        { label: 'Hanya membaca ulang materi berulang kali sampai mengantuk', skor: 1, emoji: '🥱' },
        { label: 'Menandai seluruh halaman buku dengan spidol stabilo warna-warni', skor: 2, emoji: '🖍️' },
        { label: 'Membaca ringkasan milik teman lain', skor: 3, emoji: '👀' },
        { label: 'Mengerjakan bank latihan soal, menguji diri sendiri tanpa melihat buku, atau menjelaskan konsep tersebut kepada orang lain', skor: 4, emoji: '💡' }
      ]
    },
    {
      id: 5,
      pertanyaan: 'Apakah kamu sudah pernah mendiskusikan rencana karir dan sekolah lanjutanmu secara mendalam bersama orang tua?',
      pilihan: [
        { label: 'Belum pernah sama sekali, selalu takut dan menghindar', skor: 1, emoji: '🤐' },
        { label: 'Pernah, tetapi sering berakhir dengan perdebatan tanpa kesepakatan', skor: 2, emoji: '⚡' },
        { label: 'Kadang-kadang dibahas sekilas saat makan malam', skor: 3, emoji: '🍽️' },
        { label: 'Sudah berdiskusi secara berkala, terbuka, saling mendengarkan harapan, dan menyepakati rencana bersama', skor: 4, emoji: '🤝' }
      ]
    }
  ],
  video: {
    judul: 'Dari Begadang Hingga Berjaya: Rahasia Fajar Menaklukkan Ujian & Meraih Cita-Cita',
    durasi: '11:00',
    ceritaRealistis: 'Fajar adalah siswa kelas 9 yang memiliki kebiasaan buruk: menunda belajar hingga H-1 ujian (SKS) sambil scrolling gawai tanpa henti. Akibatnya, ia sering sakit kepala saat ujian, nilai try out anjlok, dan ia merasa minder ketika teman-temannya mulai mantap memilih jurusan SMK Multimedia dan SMA IPA. Dalam bimbingan konseling, Guru BK mengajak Fajar mengaudit waktu belajarnya dan memperkenalkan teknik revolusioner: "Spaced Repetition", "Active Recall", serta sistem fokus 25 menit Pomodoro. Fajar juga diajak membedah peta bakatnya yang kuat dalam bidang logika komputer. Dalam waktu dua bulan, kebiasaan baru Fajar membuahkan hasil luar biasa: nilai ujiannya melonjak ke peringkat teratas dan ia mantap mendaftar di SMK jurusan Rekayasa Perangkat Lunak impiannya dengan restu penuh orang tua.',
    resolusiMoral: 'Keberhasilan bukan milik mereka yang belajar paling lama hingga menyiksa diri, melainkan milik mereka yang belajar paling cerdas dengan metode yang tepat, konsisten, dan terarah pada tujuan hidup yang jelas.',
    kutipanInspiratif: 'Jangan bekerja lebih keras dari kemampuan fisikmu, tetapi belajarlah lebih cerdas dari biasanya. Rencana karir yang matang dimulai dari kedisiplinan belajar hari ini.',
    youtubeId: 'DbdIe1lqDrY',
    youtubeUrl: 'https://youtu.be/DbdIe1lqDrY',
    adegan: [
      {
        id: 1,
        judulAdegan: 'Malam Melelahkan Sistem Kebut Semalam',
        waktuStart: 0,
        narasi: 'Jam dinding menunjukkan pukul 02.30 dini hari. Fajar terkantuk-kantuk di depan tumpukan buku tebal, secangkir kopi instan dingin, dan layar smartphone yang menyala.',
        karakter: 'Fajar & Narator',
        dialog: '"Aduh... mataku perih banget. Rumus Matematika ini baru kubaca lima menit lalu tapi sekarang udah lupa lagi... Kenapa otakku lemot banget ya?"',
        latar: 'Kamar Belajar Fajar',
        pilihanInteraktif: {
          pertanyaan: 'Kesalahan mendasar apakah yang dilakukan Fajar dalam proses belajarnya malam itu?',
          opsi: [
            { teks: 'Kurang banyak minum minuman suplemen energi dosis tinggi agar bisa melek sampai subuh.', dampak: 'Sangat keliru! Ini merusak kesehatan jantung dan membuat otak mengalami kelelahan ekstrem.', isTerpuji: false },
            { teks: 'Menerapkan metode pasif membaca maraton semalam suntuk (SKS) yang tidak memberi waktu bagi otak mengonsolidasi memori dalam tidur nyenyak.', dampak: 'Tepat sekali! Memori jangka panjang butuh istirahat dan pengulangan berjarak, bukan maraton paksa semalam.', isTerpuji: true }
          ]
        }
      },
      {
        id: 2,
        judulAdegan: 'Titik Balik di Ruang Bimbingan Karir BK',
        waktuStart: 260,
        narasi: 'Guru BK memperlihatkan grafik "Kurva Lupa Ebbinghaus" kepada Fajar dan membantunya memetakan minat bakat masa depan.',
        karakter: 'Guru BK & Fajar',
        dialog: '"Fajar, kamu berbakat besar dalam logika pemrograman. Jika kamu ingin menjadi software engineer handal, kamu harus belajar mengelola energimu layaknya seorang atlet: teratur, berjarak, dan fokus tajam!"',
        latar: 'Ruang Layanan Bimbingan Karir SMPN 7 Pasuruan',
        pilihanInteraktif: {
          pertanyaan: 'Langkah taktis pertama apakah yang harus segera dipraktikkan Fajar di rumah?',
          opsi: [
            { teks: 'Menjual smartphone-nya dan mengunci diri di kamar selama 24 jam sehari.', dampak: 'Ekstrem dan tidak berkelanjutan, memicu stres berat.', isTerpuji: false },
            { teks: 'Menyusun jadwal belajar harian 2 sesi @ 25 menit Pomodoro, membuat kartu tanya-jawab (flashcard) active recall, dan menjadwalkan review berkala.', dampak: 'Luar biasa! Inilah fondasi pembelajar mandiri berprestasi tinggi yang terbukti secara ilmiah.', isTerpuji: true }
          ]
        }
      }
    ]
  },
  materiPoin: [
    {
      judul: 'Ilusi Kompetensi vs Active Recall (Retrieval Practice)',
      isi: 'Hanya membaca ulang materi atau menstabilo buku memberikan perasaan palsu "sudah paham" (ilusi kompetensi). Active Recall memaksa otak memanggil kembali informasi dari dalam memori tanpa melihat teks, menghasilkan koneksi saraf yang 3x lebih kuat dan tahan lama.',
      ikon: '🧠'
    },
    {
      judul: 'Kurva Lupa Ebbinghaus & Spaced Repetition System',
      isi: 'Manusia melupakan 70% materi baru dalam 24 jam jika tidak diulang. Dengan Spaced Repetition (mengulang materi di hari ke-1, ke-3, ke-7, dan ke-14), kurva lupa diratakan sehingga ingatan menjadi permanen menjelang ujian akhir.',
      ikon: '📈'
    },
    {
      judul: 'Teknik Fokus Pomodoro 25/5 Bebas Prokrastinasi',
      isi: 'Bagi waktu belajarmu menjadi blok 25 menit fokus murni tanpa distraksi sama sekali (jauhkan HP), diselingi 5 menit istirahat regang tubuh. Setelah 4 siklus, ambil istirahat panjang 20 menit. Teknik ini mencegah kelelahan otak dan rasa malas.',
      ikon: '⏱️'
    },
    {
      judul: 'Framework Keputusan Karir: Kenali Diri, Pahami Peluang',
      isi: 'Keputusan karir yang kokoh berada di irisan antara: 1) Apa yang kamu sukai (Minat); 2) Apa keahlian terbaikmu (Bakat); dan 3) Kebutuhan dunia kerja masa depan (Peluang Karir Abad 21). Gunakan data ini untuk memilih kelanjutan studi ke SMA atau SMK.',
      ikon: '🧭'
    }
  ],
  soalEval: [
    // 1-10: PG Tunggal
    {
      id: 1,
      type: 'pg_tunggal',
      pertanyaan: 'Kelemahan paling fatal dari kebiasaan "Sistem Kebut Semalam" (SKS) yang sering dilakukan siswa sebelum ujian adalah...',
      pilihan: [
        'A. Membutuhkan biaya listrik yang terlalu murah',
        'B. Informasi hanya tersimpan sementara di memori kerja jangka pendek dan cepat menguap, serta otak mengalami kelelahan ekstrem saat ujian',
        'C. Guru pengawas ujian akan langsung mengetahui siapa saja yang belajar semalam',
        'D. Nilai yang diperoleh pasti selalu bernilai nol bulat'
      ],
      jawabanBenar: 'B. Informasi hanya tersimpan sementara di memori kerja jangka pendek dan cepat menguap, serta otak mengalami kelelahan ekstrem saat ujian',
      pembahasan: 'SKS tidak memungkinkan otak melakukan konsolidasi memori selama fase tidur nyenyak (REM sleep), memicu rasa pusing dan lupa saat ujian.'
    },
    {
      id: 2,
      type: 'pg_tunggal',
      pertanyaan: 'Fenomena psikologis di mana seorang siswa merasa sudah sangat menguasai materi hanya karena telah membaca ulang atau menstabilo buku teks disebut...',
      pilihan: [
        'A. Sindrom Impostor',
        'B. Ilusi Kompetensi (Illusion of Competence)',
        'C. Halusinasi Visual',
        'D. Kecerdasan Kinestetik Spontan'
      ],
      jawabanBenar: 'B. Ilusi Kompetensi (Illusion of Competence)',
      pembahasan: 'Membaca ulang adalah aktivitas kognitif pasif yang menipu otak merasa familiar dengan tulisan, padahal otak belum tentu mampu mereproduksinya saat ujian.'
    },
    {
      id: 3,
      type: 'pg_tunggal',
      pertanyaan: 'Inti dari metode belajar "Active Recall" (Retrieval Practice) adalah...',
      pilihan: [
        'A. Menyalin buku catatan dari awal hingga akhir tanpa berpikir',
        'B. Secara aktif memanggil kembali informasi dari dalam ingatan tanpa melihat buku referensi atau catatan',
        'C. Menghafal sambil mendengarkan musik rock volume keras',
        'D. Menggarisbawahi setiap kata yang ada di halaman ganjil'
      ],
      jawabanBenar: 'B. Secara aktif memanggil kembali informasi dari dalam ingatan tanpa melihat buku referensi atau catatan',
      pembahasan: 'Memaksa otak mengambil kembali informasi melatih kekuatan sinapsis saraf sehingga daya ingat menjadi sangat kokoh.'
    },
    {
      id: 4,
      type: 'pg_tunggal',
      pertanyaan: 'Hermann Ebbinghaus terkenal dengan penemuan kurva lupa (forgetting curve) yang membuktikan bahwa...',
      pilihan: [
        'A. Manusia tidak akan pernah lupa jika memakan ikan setiap hari',
        'B. Sebagian besar informasi yang baru dipelajari akan terlupakan dalam waktu 24-48 jam pertama jika tidak dilakukan pengulangan terencana',
        'C. Otak manusia hanya mampu menampung 5 kata baru per bulan',
        'D. Tidur siang membuat seluruh memori pelajaran hilang seketika'
      ],
      jawabanBenar: 'B. Sebagian besar informasi yang baru dipelajari akan terlupakan dalam waktu 24-48 jam pertama jika tidak dilakukan pengulangan terencana',
      pembahasan: 'Kurva lupa membuktikan penurunan drastis retensi memori jika tidak dilakukan pengulangan berjarak (Spaced Repetition).'
    },
    {
      id: 5,
      type: 'pg_tunggal',
      pertanyaan: 'Struktur catatan sistem Cornell (Cornell Note-Taking System) membagi selembar kertas menjadi 3 bagian utama, yaitu...',
      pilihan: [
        'A. Kolom Puisi, Kolom Cerita, dan Kolom Pantun',
        'B. Kolom Isyarat/Kata Kunci (Kiri), Kolom Catatan Inti (Kanan), dan Baris Rangkuman Simpulan (Bawah)',
        'C. Kolom Gambar Kartun, Kolom Nilai, dan Kolom Tanda Tangan Orang Tua',
        'D. Kolom Biodata, Kolom Jadwal Piket, dan Kolom Kas'
      ],
      jawabanBenar: 'B. Kolom Isyarat/Kata Kunci (Kiri), Kolom Catatan Inti (Kanan), dan Baris Rangkuman Simpulan (Bawah)',
      pembahasan: 'Sistem Cornell memfasilitasi pencatatan ringkas, penulisan kata kunci untuk uji diri (cues), dan sintesis pemahaman di bagian bawah.'
    },
    {
      id: 6,
      type: 'pg_tunggal',
      pertanyaan: 'Teknik Feynman (The Feynman Technique) menguji kedalaman pemahaman seseorang terhadap suatu konsep rumit dengan cara...',
      pilihan: [
        'A. Menghafal definisi kata per kata sesuai kamus besar bahasa Indonesia',
        'B. Menjelaskan konsep tersebut menggunakan bahasa sehari-hari yang sangat sederhana seolah-olah sedang mengajari anak usia SD',
        'C. Menuliskan rumus dengan tinta emas di kertas karton',
        'D. Menantang guru berdebat di depan kelas'
      ],
      jawabanBenar: 'B. Menjelaskan konsep tersebut menggunakan bahasa sehari-hari yang sangat sederhana seolah-olah sedang mengajari anak usia SD',
      pembahasan: 'Jika kita tidak mampu menjelaskan suatu hal secara sederhana kepada orang awam, berarti kita sendiri belum benar-benar memahaminya.'
    },
    {
      id: 7,
      type: 'pg_tunggal',
      pertanyaan: 'Aturan baku dalam siklus dasar teknik Pomodoro yang dirancang oleh Francesco Cirillo adalah...',
      pilihan: [
        'A. Belajar 2 jam nonstop, tidur 10 menit',
        'B. Belajar fokus penuh selama 25 menit, dilanjutkan istirahat relaksasi selama 5 menit',
        'C. Bermain game 25 menit, belajar 5 menit',
        'D. Membaca novel 50 menit, istirahat 50 menit'
      ],
      jawabanBenar: 'B. Belajar fokus penuh selama 25 menit, dilanjutkan istirahat relaksasi selama 5 menit',
      pembahasan: 'Interval 25/5 menjaga konsentrasi berada di puncak optimal tanpa memicu kelelahan kognitif.'
    },
    {
      id: 8,
      type: 'pg_tunggal',
      pertanyaan: 'Perbedaan karakteristik orientasi pendidikan antara Sekolah Menengah Atas (SMA) dan Sekolah Menengah Kejuruan (SMK) adalah...',
      pilihan: [
        'A. SMA mempersiapkan penguasaan sains dan konsep teoritis untuk lanjut ke perguruan tinggi, sedangkan SMK menitikberatkan keterampilan terapan spesifik untuk siap terjun ke dunia kerja/industri',
        'B. Lulusan SMA tidak boleh kuliah, sedangkan lulusan SMK wajib kuliah',
        'C. SMK tidak memiliki mata pelajaran umum sama sekali',
        'D. SMA hanya diperuntukkan bagi siswa yang kaya raya'
      ],
      jawabanBenar: 'A. SMA mempersiapkan penguasaan sains dan konsep teoritis untuk lanjut ke perguruan tinggi, sedangkan SMK menitikberatkan keterampilan terapan spesifik untuk siap terjun ke dunia kerja/industri',
      pembahasan: 'SMA berfokus pada pendalaman keilmuan akademis, sementara SMK berfokus pada kejuruan vokasional aplikatif.'
    },
    {
      id: 9,
      type: 'pg_tunggal',
      pertanyaan: 'Dalam analisis SWOT pribadi untuk penentuan karir, huruf "O" (Opportunities) merepresentasikan...',
      pilihan: [
        'A. Kelemahan internal diri yang sulit diperbaiki',
        'B. Peluang eksternal seperti ketersediaan beasiswa, perkembangan industri digital, dan dukungan fasilitas dari lingkungan',
        'C. Ancaman dari pesaing yang ingin menjatuhkan kita',
        'D. Opini negatif orang lain terhadap cita-cita kita'
      ],
      jawabanBenar: 'B. Peluang eksternal seperti ketersediaan beasiswa, perkembangan industri digital, dan dukungan fasilitas dari lingkungan',
      pembahasan: 'Opportunities adalah faktor eksternal positif yang dapat dimanfaatkan untuk mengakselerasi pencapaian karir.'
    },
    {
      id: 10,
      type: 'pg_tunggal',
      pertanyaan: 'Tindakan yang mencerminkan integritas akademik tertinggi seorang siswa saat mengerjakan ujian akhir adalah...',
      pilihan: [
        'A. Membawa contekan kecil yang diselipkan di dalam kaus kaki',
        'B. Mengerjakan soal secara mandiri dengan jujur berbekal ikhtiar belajar, menolak memberi atau meminta sontekan',
        'C. Menggunakan smartwatch untuk mencari jawaban di internet saat pengawas lengah',
        'D. Memberikan jawaban kepada sahabat dekat karena rasa solidaritas pertemanan'
      ],
      jawabanBenar: 'B. Mengerjakan soal secara mandiri dengan jujur berbekal ikhtiar belajar, menolak memberi atau meminta sontekan',
      pembahasan: 'Kejujuran akademik adalah nilai moral mutlak yang membentuk pondasi karakter mulia sepanjang hayat.'
    },

    // 11-16: PG Kompleks
    {
      id: 11,
      type: 'pg_kompleks',
      pertanyaan: 'Manakah dari praktik berikut yang terbukti secara ilmiah sangat efektif dalam meningkatkan daya ingat jangka panjang? (Pilih kombinasi yang paling tepat)',
      pilihan: [
        '1. Menguji diri sendiri menggunakan flashcard tanya-jawab (Active Retrieval)',
        '2. Mengatur jadwal review materi secara berjarak (Spaced Repetition)',
        '3. Menggarisbawahi seluruh kalimat di buku teks dengan warna mencolok',
        '4. Menjelaskan konsep yang dipelajari kepada teman belajar (Teknik Feynman)',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Active retrieval, spaced repetition, dan teknik mengajar (Feynman) adalah tiga pilar belajar berbasis bukti ilmiah paling ampuh.'
    },
    {
      id: 12,
      type: 'pg_kompleks',
      pertanyaan: 'Langkah-langkah praktis untuk mengatasi kebiasaan menunda-nunda belajar (prokrastinasi) antara lain:',
      pilihan: [
        '1. Memecah tugas besar menjadi bagian-bagian kecil yang mudah diselesaikan dalam 15 menit',
        '2. Menyingkirkan distraksi gawai dari jangkauan pandangan selama sesi belajar',
        '3. Menunggu sampai muncul "mood" yang sempurna sebelum mulai membuka buku',
        '4. Memberikan penghargaan kecil (reward) setelah menyelesaikan satu target belajar',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Menunggu mood adalah jebakan prokrastinasi; tindakan kecil justru yang akan memicu datangnya motivasi.'
    },
    {
      id: 13,
      type: 'pg_kompleks',
      pertanyaan: 'Faktor-faktor internal yang wajib dipertimbangkan seorang siswa kelas 9 dalam memilih jurusan atau sekolah lanjutan meliputi:',
      pilihan: [
        '1. Minat pribadi (aktivitas yang disukai dan dinikmati dengan antusias)',
        '2. Bakat dan potensi kemampuan akademis maupun non-akademis',
        '3. Keinginan untuk selalu sekelas bersama teman dekat atau pacar',
        '4. Nilai-nilai kehidupan dan tipe kepribadian kerja yang dimiliki',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Memilih sekolah hanya karena ikut-ikutan teman adalah penyebab utama salah jurusan dan penyesalan di masa depan.'
    },
    {
      id: 14,
      type: 'pg_kompleks',
      pertanyaan: 'Keuntungan bagi siswa yang memiliki dan mengaplikasikan jadwal belajar terstruktur menjelang ujian akhir adalah:',
      pilihan: [
        '1. Mengurangi tingkat stres dan kepanikan karena materi terdistribusi merata',
        '2. Memiliki waktu istirahat dan tidur yang cukup tanpa rasa bersalah',
        '3. Menjamin bahwa siswa tidak perlu lagi mendengarkan penjelasan guru di kelas',
        '4. Meningkatkan rasa percaya diri saat memasuki ruang ujian',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Jadwal terstruktur menstabilkan beban mental, menjamin kesehatan tidur, dan membangun efikasi diri yang tinggi.'
    },
    {
      id: 15,
      type: 'pg_kompleks',
      pertanyaan: 'Manakah dari keterampilan berikut yang diprediksi menjadi "Top Skills Abad 21" yang sangat dibutuhkan di berbagai bidang karir masa depan?',
      pilihan: [
        '1. Berpikir kritis dan pemecahan masalah yang kompleks (Critical Thinking & Problem Solving)',
        '2. Literasi teknologi digital, kecerdasan buatan, dan analisis data',
        '3. Keterampilan menghafal tanggal sejarah tanpa memahami konteks peristiwanya',
        '4. Kolaborasi antartim, komunikasi asertif, dan kecerdasan emosional',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Hafalan mekanis mudah digantikan mesin/AI; keterampilan analitis, adaptabilitas, dan kecerdasan emosional adalah keunggulan manusia.'
    },
    {
      id: 16,
      type: 'pg_kompleks',
      pertanyaan: 'Prinsip-prinsip pembuatan "Vision Board" atau Peta Impian Karir yang efektif dan berdampak bagi siswa adalah:',
      pilihan: [
        '1. Menempelkan gambar visual yang spesifik mewakili target sekolah lanjutan dan profesi idaman',
        '2. Menuliskan langkah aksi nyata dan tenggat waktu pencapaian (SMART Goals)',
        '3. Ditaruh di tempat tersembunyi yang tidak pernah dilihat sama sekali',
        '4. Diletakkan di area yang sering terlihat setiap hari (misalnya di atas meja belajar) sebagai pengingat visual',
        'Kombinasi Pernyataan: 1, 2, dan 4 Benar'
      ],
      jawabanBenar: 'Kombinasi Pernyataan: 1, 2, dan 4 Benar',
      pembahasan: 'Vision board bekerja optimal jika visualisasinya jelas, disertai target SMART, dan menjadi pengingat harian di ruang belajar.'
    },

    // 17-21: Benar - Salah
    {
      id: 17,
      type: 'benar_salah',
      pertanyaan: 'Membaca ulang buku catatan secara berulang-ulang sampai 10 kali adalah cara paling efektif untuk mengunci materi ke memori jangka panjang.',
      jawabanBenar: false,
      pembahasan: 'Pernyataan SALAH. Membaca ulang adalah metode belajar pasif dengan tingkat retensi rendah jika dibandingkan dengan Active Recall.'
    },
    {
      id: 18,
      type: 'benar_salah',
      pertanyaan: 'Dalam teknik Pomodoro, istirahat 5 menit setelah 25 menit belajar sebaiknya digunakan untuk mengistirahatkan mata dan peregangan tubuh, bukan untuk scrolling media sosial.',
      jawabanBenar: true,
      pembahasan: 'Pernyataan BENAR. Scrolling medsos justru memberikan beban stimuli baru pada otak sehingga otak tidak benar-benar beristirahat.'
    },
    {
      id: 19,
      type: 'benar_salah',
      pertanyaan: 'Siswa lulusan SMK tidak memiliki hak atau kesempatan untuk melanjutkan kuliah ke jenjang perguruan tinggi / universitas.',
      jawabanBenar: false,
      pembahasan: 'Pernyataan SALAH. Lulusan SMK memiliki hak penuh untuk melanjutkan kuliah baik di perguruan tinggi vokasi maupun universitas umum.'
    },
    {
      id: 20,
      type: 'benar_salah',
      pertanyaan: 'Membuat jadwal pengulangan berjarak (Spaced Repetition) dapat menghemat total jam belajar sekaligus meningkatkan hasil retensi ingatan secara signifikan.',
      jawabanBenar: true,
      pembahasan: 'Pernyataan BENAR. Belajar 30 menit selama 4 hari berjarak jauh lebih efektif daripada belajar 2 jam sekaligus dalam satu malam.'
    },
    {
      id: 21,
      type: 'benar_salah',
      pertanyaan: 'Keputusan karir yang baik adalah keputusan yang semata-mata ditentukan oleh orang tua tanpa perlu mendengarkan minat dan potensi diri anak.',
      jawabanBenar: false,
      pembahasan: 'Pernyataan SALAH. Keputusan karir terbaik lahir dari musyawarah harmonis antara potensi/minat anak dengan arahan bijak dan restu orang tua.'
    },

    // 22-25: Menjodohkan
    {
      id: 22,
      type: 'menjodohkan',
      pertanyaan: 'Jodohkan metode belajar di Kolom Kiri dengan karakteristik pelaksanaannya di Kolom Kanan:',
      pilihan: [
        'A. (1-b), (2-c), (3-a), (4-d)',
        'B. (1-a), (2-b), (3-c), (4-d)',
        'C. (1-c), (2-a), (3-d), (4-b)',
        'D. (1-d), (2-b), (3-a), (4-c)'
      ],
      pasangan: [
        { kiri: '1. Active Recall', kanan: 'a. Menguji pemahaman dengan menjelaskan materi memakai bahasa sederhana kepada orang lain' },
        { kiri: '2. Spaced Repetition', kanan: 'b. Menutup catatan dan memaksa memori mengeluarkan informasi yang telah dipelajari' },
        { kiri: '3. Teknik Feynman', kanan: 'c. Menjadwalkan pengulangan materi pada interval waktu yang semakin renggang' },
        { kiri: '4. Cornell Notes', kanan: 'd. Format mencatat terbagi atas kolom kata kunci, catatan utama, dan ringkasan simpulan' }
      ],
      jawabanBenar: 'A. (1-b), (2-c), (3-a), (4-d)',
      pembahasan: 'Active recall (memaksa memori keluar), Spaced repetition (jadwal berjarak), Feynman (menjelaskan sederhana), Cornell (tiga kolom catatan).'
    },
    {
      id: 23,
      type: 'menjodohkan',
      pertanyaan: 'Jodohkan tipe kepribadian karir Holland (RIASEC) di Kolom Kiri dengan preferensi bidang kerjanya di Kolom Kanan:',
      pilihan: [
        'A. (1-y), (2-z), (3-x)',
        'B. (1-z), (2-x), (3-y)',
        'C. (1-x), (2-y), (3-z)',
        'D. (1-y), (2-x), (3-z)'
      ],
      pasangan: [
        { kiri: '1. Tipe Realistik (Realistic)', kanan: 'x. Menyukai ide abstrak, ekspresi bebas, desain seni, musik, dan sastra' },
        { kiri: '2. Tipe Investigatif (Investigative)', kanan: 'y. Menyukai aktivitas fisik praktis, manipulasi alat, mesin, dan alam terbuka' },
        { kiri: '3. Tipe Artistik (Artistic)', kanan: 'z. Menyukai observasi ilmiah, riset laboratorium, logika analitis, dan matematika' }
      ],
      jawabanBenar: 'A. (1-y), (2-z), (3-x)',
      pembahasan: 'Realistik berhubungan dengan alat/mesin, Investigatif dengan sains/riset, Artistik dengan seni/kreativitas bebas.'
    },
    {
      id: 24,
      type: 'menjodohkan',
      pertanyaan: 'Jodohkan jenis jalur pendidikan menengah di Kolom Kiri dengan fokus kurikulumnya di Kolom Kanan:',
      pilihan: [
        'A. (1-p), (2-q), (3-r)',
        'B. (1-q), (2-p), (3-r)',
        'C. (1-r), (2-p), (3-q)',
        'D. (1-p), (2-r), (3-q)'
      ],
      pasangan: [
        { kiri: '1. SMA (Sekolah Menengah Atas)', kanan: 'p. Penguatan teori akademis komprehensif sebagai basis pendidikan tinggi' },
        { kiri: '2. SMK (Sekolah Menengah Kejuruan)', kanan: 'q. Penguasaan kompetensi keahlian terapan, praktikum industri, dan sertifikasi profesi' },
        { kiri: '3. MA (Madrasah Aliyah)', kanan: 'r. Integrasi kurikulum pendidikan umum setara SMA dengan pendalaman ilmu agama Islam' }
      ],
      jawabanBenar: 'A. (1-p), (2-q), (3-r)',
      pembahasan: 'SMA berbasis teori akademik, SMK berbasis kejuruan kerja terapan, MA integrasi sains umum dengan studi keagamaan.'
    },
    {
      id: 25,
      type: 'menjodohkan',
      pertanyaan: 'Jodohkan tahapan siklus belajar efektif di Kolom Kiri dengan aktivitas intinya di Kolom Kanan:',
      pilihan: [
        'A. (1-beta), (2-alfa), (3-gamma)',
        'B. (1-alfa), (2-gamma), (3-beta)',
        'C. (1-beta), (2-gamma), (3-alfa)',
        'D. (1-gamma), (2-beta), (3-alfa)'
      ],
      pasangan: [
        { kiri: '1. Tahap Input (Encoding)', kanan: 'alfa. Menguji diri tanpa melihat materi dan mengerjakan latihan soal' },
        { kiri: '2. Tahap Retrieval (Recall)', kanan: 'beta. Membaca kritis, mendengarkan penjelasan guru, dan memahami konteks' },
        { kiri: '3. Tahap Konsolidasi (Storage)', kanan: 'gamma. Tidur nyenyak yang cukup agar hippocampus mentransfer data ke korteks' }
      ],
      jawabanBenar: 'C. (1-beta), (2-alfa), (3-gamma)',
      pembahasan: 'Input adalah proses memahami awal, Retrieval adalah proses uji ingatan aktif, Konsolidasi adalah penyimpanan memori saat tidur.'
    },

    // 26-30: Studi Kasus
    {
      id: 26,
      type: 'studi_kasus',
      studiKasusTeks: 'Dian selalu mengalokasikan waktu 4 jam setiap malam untuk belajar. Namun sebagian besar waktunya dihabiskan untuk menghias buku catatan dengan tulisan kaligrafi indah dan mewarnai judul materi dengan aneka stabilo. Saat ujian tiba, Dian kebingungan menjawab soal penalaran dan nilainya mengecewakan. Dian menangis dan merasa usahanya mengkhianati hasil.',
      pertanyaan: 'Analisis evaluasi belajar apakah yang paling tepat diberikan kepada Dian untuk mengubah nasib akademisnya?',
      pilihan: [
        'A. Menyuruh Dian menambah waktu belajarnya menjadi 8 jam per malam',
        'B. Menjelaskan kepada Dian bahwa ia terjebak dalam "Passive Learning" dan estetika visual; menyarankannya mengalokasikan 20% waktu untuk membuat ringkasan ringkas dan 80% waktu untuk latihan soal (Active Retrieval)',
        'C. Melarang Dian menggunakan kertas dan pensil sama sekali',
        'D. Menyuruh Dian berhenti belajar karena menghias buku adalah perbuatan sia-sia'
      ],
      jawabanBenar: 'B. Menjelaskan kepada Dian bahwa ia terjebak dalam "Passive Learning" dan estetika visual; menyarankannya mengalokasikan 20% waktu untuk membuat ringkasan ringkas dan 80% waktu untuk latihan soal (Active Retrieval)',
      pembahasan: 'Kerapian catatan tidak berkorelasi langsung dengan daya ingat; pengujian aktif lewat latihan soal adalah penentu keberhasilan kognitif.'
    },
    {
      id: 27,
      type: 'studi_kasus',
      studiKasusTeks: 'Arga memiliki cita-cita menjadi seorang teknisi otomotif motor balap profesional dan ingin segera mandiri secara ekonomi setelah lulus sekolah. Namun ayahnya mendesak Arga harus masuk SMA jurusan IPA karena menganggap bahwa lulusan SMK memiliki gengsi sosial yang lebih rendah di mata masyarakat.',
      pertanyaan: 'Langkah strategis dan bijaksana apakah yang sebaiknya ditempuh Arga untuk memecahkan dilema karir ini?',
      pilihan: [
        'A. Melawan ayahnya secara kasar dan minggat dari rumah',
        'B. Meminta Guru BK memfasilitasi sesi konsultasi karir bersama ayahnya untuk memaparkan data prospek SMK Otomotif modern, fasilitas bengkel standar industri, peluang sertifikasi profesi, dan fakta bahwa lulusan SMK tetap bisa kuliah jika ingin meningkatkan jenjang karir',
        'C. Menyerah total dan sengaja tidak mengerjakan soal ujian kelas 9',
        'D. Mengabaikan bakat otomotifnya dan menjadi pengangguran'
      ],
      jawabanBenar: 'B. Meminta Guru BK memfasilitasi sesi konsultasi karir bersama ayahnya untuk memaparkan data prospek SMK Otomotif modern, fasilitas bengkel standar industri, peluang sertifikasi profesi, dan fakta bahwa lulusan SMK tetap bisa kuliah jika ingin meningkatkan jenjang karir',
      pembahasan: 'Dialog berbasis data objektif dan bantuan profesional Guru BK adalah jembatan terbaik meruntuhkan stereotip negatif tentang SMK.'
    },
    {
      id: 28,
      type: 'studi_kasus',
      studiKasusTeks: 'Tiga orang sahabat karib di kelas 9—Ilham, Bayu, dan Candra—berjanji untuk selalu bersama. Ilham sangat unggul dalam bidang matematika teoritis dan ingin menjadi ilmuwan (cocok di SMA). Bayu sangat tertarik pada tata boga dan memasak (cocok di SMK Tata Boga). Candra ingin masuk SMA karena Ilham ke SMA, dan memaksa Bayu ikut agar geng mereka tidak bubar.',
      pertanyaan: 'Nasihat persahabatan dan kemandirian karir apakah yang paling bijaksana untuk Candra dan Bayu?',
      pilihan: [
        'A. Mengorbankan impian masa depan masing-masing demi menjaga geng pertemanan tetap satu sekolah',
        'B. Memahami bahwa persahabatan sejati tidak diukur dari gedung sekolah yang sama, melainkan saling mendukung sahabat mengejar jalan terbaik sesuai potensi uniknya masing-masing',
        'C. Memutuskan tali persahabatan saat itu juga karena perbedaan sekolah',
        'D. Memilih sekolah dengan cara mengundi koin agar adil'
      ],
      jawabanBenar: 'B. Memahami bahwa persahabatan sejati tidak diukur dari gedung sekolah yang sama, melainkan saling mendukung sahabat mengejar jalan terbaik sesuai potensi uniknya masing-masing',
      pembahasan: 'Kedewasaan remaja tercermin dari keberanian memilih jalan karir mandiri tanpa memaksakan keseragaman pada sahabat.'
    },
    {
      id: 29,
      type: 'studi_kasus',
      studiKasusTeks: 'Nadia merasa sangat sulit berkonsentrasi saat belajar karena setiap 5 menit ada notifikasi pesan di grup WhatsApp dan rasa ingin tahu yang besar untuk melihat update status media sosial. Akibatnya waktu belajar 2 jam habis hanya untuk membuka HP dan materinya tidak selesai.',
      pertanyaan: 'Penerapan aturan lingkungan (environmental design) apakah yang paling ampuh untuk Nadia?',
      pilihan: [
        'A. Meletakkan HP tepat di samping bukunya sambil menyalakan notifikasi volume maksimal',
        'B. Menerapkan aturan "Out of Sight, Out of Mind": Menitipkan HP kepada ibu di ruang keluarga selama sesi belajar Pomodoro 25 menit berlangsung dan mematikan koneksi internet',
        'C. Berhenti sekolah agar bisa bermain HP sepuasnya',
        'D. Membeli HP kedua untuk ditaruh di meja belajar'
      ],
      jawabanBenar: 'B. Menerapkan aturan "Out of Sight, Out of Mind": Menitipkan HP kepada ibu di ruang keluarga selama sesi belajar Pomodoro 25 menit berlangsung dan mematikan koneksi internet',
      pembahasan: 'Mengubah lingkungan dengan menyingkirkan pemicu godaan jauh lebih efektif daripada mengandalkan kekuatan niat belaka.'
    },
    {
      id: 30,
      type: 'studi_kasus',
      studiKasusTeks: 'Menghadapi 5 mata pelajaran ujian asesmen akhir yang bobot materinya sangat luas, Rendra bingung harus mulai belajar dari mana. Ia merasa kewalahan (overwhelmed) dan akhirnya memilih tidur seharian tanpa belajar sama sekali.',
      pertanyaan: 'Solusi manajemen belajar taktis apakah yang harus segera dipraktikkan Rendra?',
      pilihan: [
        'A. Membakar buku pelajaran dan meminum abunya dengan air putih',
        'B. Membuat "Peta Prioritas Belajar": Mengidentifikasi materi esensial kisi-kisi ujian, memecah setiap bab menjadi sub-topik 20 menitan, dan mencicil 2 sub-topik setiap hari menggunakan kalender belajar terencana',
        'C. Mengeluh terus-menerus di grup angkatan',
        'D. Menyerahkan nasib sepenuhnya kepada tebakan pilihan ganda saat ujian'
      ],
      jawabanBenar: 'B. Membuat "Peta Prioritas Belajar": Mengidentifikasi materi esensial kisi-kisi ujian, memecah setiap bab menjadi sub-topik 20 menitan, dan mencicil 2 sub-topik setiap hari menggunakan kalender belajar terencana',
      pembahasan: 'Memecah beban besar (chunking) menjadi unit-unit kecil yang dapat dikelola menghilangkan kelumpuhan tindakan dan membangkitkan momentum belajar.'
    }
  ],
  kuisTTS: {
    pertanyaanMendatar: [
      { no: 1, petunjuk: 'Metode belajar aktif memanggil kembali ingatan tanpa melihat buku.', jawaban: 'RECALL', x: 1, y: 1 },
      { no: 3, petunjuk: 'Sistem pengulangan materi pada interval waktu berjarak.', jawaban: 'SPACED', x: 1, y: 3 },
      { no: 5, petunjuk: 'Teknik manajemen waktu interval 25 menit fokus dan 5 menit jeda.', jawaban: 'POMODORO', x: 1, y: 5 },
      { no: 7, petunjuk: 'Pilihan sekolah menengah yang fokus pada kejuruan vokasi kerja.', jawaban: 'SMK', x: 1, y: 7 }
    ],
    pertanyaanMenurun: [
      { no: 2, petunjuk: 'Penemu kurva lupa (forgetting curve) daya ingat manusia.', jawaban: 'EBBINGHAUS', x: 3, y: 1 },
      { no: 4, petunjuk: 'Kebiasaan menunda-nunda pekerjaan atau belajar.', jawaban: 'PROKRASTINASI', x: 5, y: 2 },
      { no: 6, petunjuk: 'Format catatan ringkas dengan tiga pembagian kolom.', jawaban: 'CORNELL', x: 7, y: 4 }
    ]
  },
  permainanType: 'puzzle'
};
