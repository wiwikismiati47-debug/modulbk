import React, { useState } from 'react';
import { ModuleContent } from '../types';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  Heart,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  HelpCircle,
  Check,
  X,
  Smile,
  AlertCircle,
  ListChecks
} from 'lucide-react';

interface EducationalGameProps {
  module: ModuleContent;
  onScoreChange?: (score: number) => void;
}

interface GameScenarioQuestion {
  id: number;
  skenario: string;
  pertanyaan: string;
  pilihan: {
    label: string;
    teks: string;
    isCorrect: boolean;
  }[];
  penjelasan: string;
  kategori: string;
}

interface SortingCard {
  id: number;
  perilaku: string;
  isPositive: boolean;
  penjelasan: string;
}

export const EducationalGame: React.FC<EducationalGameProps> = ({ module, onScoreChange }) => {
  const [activeMode, setActiveMode] = useState<'scenario' | 'sorting'>('scenario');

  // Game stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);

  // Scenario Mode State
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

  // Sorting Mode State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [lastSortingResult, setLastSortingResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [sortingCompleted, setSortingCompleted] = useState(false);

  // Helper to get module-specific scenario questions
  const getScenarioQuestions = (): GameScenarioQuestion[] => {
    switch (module.id) {
      case 'ibadah-akhlak':
        return [
          {
            id: 1,
            kategori: 'Kejujuran & Akhlak Mulia',
            skenario: 'Di area perpustakaan SMPN 7 Pasuruan, kamu menemukan dompet tebal berisi uang saku tanpa identitas. Teman dekatmu membisikkan agar uangnya dibagi dua untuk jajan bersama.',
            pertanyaan: 'Tindakan manakah yang paling mencerminkan kejujuran dan akhlak mulia?',
            pilihan: [
              { label: 'A', teks: 'Menyerahkan dompet secara utuh kepada Guru BK atau Piket Sekolah.', isCorrect: true },
              { label: 'B', teks: 'Membagi dua uangnya dengan teman agar terasa adil.', isCorrect: false },
              { label: 'C', teks: 'Menyimpan dompet di dalam tas untuk keperluan pribadi.', isCorrect: false },
              { label: 'D', teks: 'Membiarkan dompet tersebut tergeletak di lantai.', isCorrect: false }
            ],
            penjelasan: 'Kejujuran (Sidqu) dan Amanah adalah mahkota akhlak mulia. Memulangkan barang temuan kepada pihak berwenang adalah wujud integritas pelajar.'
          },
          {
            id: 2,
            kategori: 'Moderasi Beragama & Toleransi',
            skenario: 'Saat jam istirahat, terjadi perbedaan pendapat di antara teman-temanmu mengenai tata cara ibadah dan tradisi keagamaan keluarga. Suasana diskusi mulai emosional dan saling sindir.',
            pertanyaan: 'Bagaimana sikap pelajar yang memiliki kesadaran Moderasi Beragama?',
            pilihan: [
              { label: 'A', teks: 'Meredakan suasana dengan santun dan mengingatkan untuk saling menghormati keragaman cara ibadah.', isCorrect: true },
              { label: 'B', teks: 'Ikut membela salah satu kelompok dan mengejek kelompok lainnya.', isCorrect: false },
              { label: 'C', teks: 'Merekam perdebatan lalu mengunggahnya ke media sosial.', isCorrect: false },
              { label: 'D', teks: 'Memaksa semua teman agar mengikuti tata cara ibadah sesuai paham diri sendiri.', isCorrect: false }
            ],
            penjelasan: 'Moderasi Beragama menekankan toleransi, sikap menghargai perbedaan, dan anti-kekerasan demi menjaga kedamaian di lingkungan sekolah.'
          },
          {
            id: 3,
            kategori: 'Disiplin Ibadah Harian',
            skenario: 'Saat kamu sedang asyik bermain game di ponsel bersama teman-teman, panggilan ibadah/azan berkumandang.',
            pertanyaan: 'Langkah disiplin ibadah yang tepat dan berkesadaran adalah...',
            pilihan: [
              { label: 'A', teks: 'Segera menghentikan permainan, mengambil air wudhu/bersiap ibadah dengan khusyuk.', isCorrect: true },
              { label: 'B', teks: 'Melanjutkan permainan sampai level selesai 2 jam kemudian.', isCorrect: false },
              { label: 'C', teks: 'Pura-pura tidak mendengar panggilan ibadah.', isCorrect: false },
              { label: 'D', teks: 'Menyuruh teman saja yang pergi beribadah.', isCorrect: false }
            ],
            penjelasan: 'Disiplin ibadah melatih manajemen waktu, menenangkan hati, dan melatih kontrol diri di tengah godaan gadget.'
          },
          {
            id: 4,
            kategori: '4 Pilar Moderasi Beragama',
            skenario: 'Guru BK menjelaskan bahwa pelajar SMPN 7 Pasuruan harus memegang teguh 4 Pilar Moderasi Beragama dalam kehidupan sehari-hari.',
            pertanyaan: 'Manakah kombinasi 4 Pilar Moderasi Beragama yang benar?',
            pilihan: [
              { label: 'A', teks: 'Komitmen Kebangsaan, Toleransi, Anti-Kekerasan, dan Akomodatif Kebudayaan Lokal.', isCorrect: true },
              { label: 'B', teks: 'Egois, Memaksa Kehendak, Menjauhi Teman, dan Menyontek Ujian.', isCorrect: false },
              { label: 'C', teks: 'Bebas Berbuat Apa Saja, Menghakimi, Tawuran, dan Bolos Sekolah.', isCorrect: false },
              { label: 'D', teks: 'Individualis, Suka Mengritik, Berbohong, dan Menolak Aturan.', isCorrect: false }
            ],
            penjelasan: '4 Pilar Moderasi Beragama menjaga keharmonisan, persatuan kebangsaan, serta kedamaian antarsesama warga sekolah.'
          }
        ];

      case 'etika-pergaulan':
        return [
          {
            id: 1,
            kategori: 'Komunikasi Asertif',
            skenario: 'Teman akrabmu mengancam akan memutuskan pertemanan jika kamu menolak diajak bolos saat jam pelajaran terakhir.',
            pertanyaan: 'Bagaimana tindakan asertif yang paling tepat?',
            pilihan: [
              { label: 'A', teks: 'Menolak ajakan bolos dengan tegas namun tetap santun, serta menjelaskan pentingnya belajar.', isCorrect: true },
              { label: 'B', teks: 'Menuruti ajakan bolos karena takut dimusuhi.', isCorrect: false },
              { label: 'C', teks: 'Ikut bolos sekali saja demi rasa solidaritas.', isCorrect: false },
              { label: 'D', teks: 'Memukul teman tersebut karena kesal.', isCorrect: false }
            ],
            penjelasan: 'Pertemanan sehat saling mendukung dalam kebaikan, bukan memaksa melakukan pelanggaran yang merugikan masa depan.'
          },
          {
            id: 2,
            kategori: 'Pesan "Saya" (I-Message)',
            skenario: 'Kamu merasa tersinggung karena candaan teman di kelas yang membawa-bawa nama orang tua.',
            pertanyaan: 'Penggunaan kalimat "I-Message" yang paling tepat adalah...',
            pilihan: [
              { label: 'A', teks: '"Saya merasa kurang nyaman ketika bercanda membawa nama orang tua, mari ganti topik lain."', isCorrect: true },
              { label: 'B', teks: '"Kamu selalu jahat dan tidak punya perasaan!"', isCorrect: false },
              { label: 'C', teks: '"Dasar kamu teman yang tidak tahu diri!"', isCorrect: false },
              { label: 'D', teks: 'Membalas mengejek orang tuanya lebih parah.', isCorrect: false }
            ],
            penjelasan: 'I-Message menyampaikan perasaan diri tanpa menyerang atau menyudutkan pribadi lawan bicara.'
          },
          {
            id: 3,
            kategori: 'Pencegahan Bullying / Perundungan',
            skenario: 'Kamu melihat kawan sekelas yang pendiam sering ditarik tasnya dan diejek aksen bicaranya di lorong sekolah.',
            pertanyaan: 'Sikap pahlawan kebaikan (upstander) yang tepat dilakukan adalah...',
            pilihan: [
              { label: 'A', teks: 'Merangkul kawan tersebut, menemuinya, dan melaporkan tindakan perundungan kepada Guru BK.', isCorrect: true },
              { label: 'B', teks: 'Ikut menertawakan agar tidak ikut menjadi sasaran.', isCorrect: false },
              { label: 'C', teks: 'Merekam video kejadian untuk ditonton bersama.', isCorrect: false },
              { label: 'D', teks: 'Mengabaikan karena menganggap itu urusan pribadi mereka.', isCorrect: false }
            ],
            penjelasan: 'Menjadi Upstander berarti berani membela kawan yang terintimidasi dan menghentikan mata rantai bullying di sekolah.'
          },
          {
            id: 4,
            kategori: 'Pertemanan Sehat (Healthy Friendship)',
            skenario: 'Di lingkungan sekolah, penting bagi setiap siswa untuk memiliki pertemanan yang saling menguatkan.',
            pertanyaan: 'Manakah di bawah ini yang merupakan ciri utama dari lingkungan pertemanan yang sehat?',
            pilihan: [
              { label: 'A', teks: 'Saling mendukung meraih cita-cita, menghargai batasan pribadi, dan menerima keberagaman.', isCorrect: true },
              { label: 'B', teks: 'Memaksa teman menuruti semua keinginan ketua geng.', isCorrect: false },
              { label: 'C', teks: 'Mengejek kawan yang mendapatkan nilai lebih tinggi.', isCorrect: false },
              { label: 'D', teks: 'Membuat lingkaran pertemanan tertutup dan menolak kawan baru.', isCorrect: false }
            ],
            penjelasan: 'Pertemanan positif menciptakan rasa aman, mendukung perkembangan diri, dan menghargai nilai-nilai kebaikan.'
          }
        ];

      case 'emosi-stres':
        return [
          {
            id: 1,
            kategori: 'Regulasi Emosi & Panic Attack',
            skenario: 'Tugas sekolah terasa menumpuk bertepatan dengan ujian besok pagi. Kamu merasa sangat cemas, jantung berdebar cepat, dan pikiran kacau.',
            pertanyaan: 'Langkah pertama dalam teknik regulasi emosi yang disarankan Guru BK adalah...',
            pilihan: [
              { label: 'A', teks: 'Melakukan teknik pernapasan dalam (4-7-8), menenangkan pikiran, dan menyusun daftar prioritas.', isCorrect: true },
              { label: 'B', teks: 'Membanting buku dan menangis histeris di dalam kamar.', isCorrect: false },
              { label: 'C', teks: 'Begadang seharian tanpa tidur sambil bermain game online.', isCorrect: false },
              { label: 'D', teks: 'Menyalahkan guru yang memberikan banyak tugas.', isCorrect: false }
            ],
            penjelasan: 'Latihan pernapasan 4-7-8 mengaktifkan sistem saraf parasimpatis untuk menurunkan kepanikan dan mengembalikan ketenangan berpikir.'
          },
          {
            id: 2,
            kategori: 'Pengendalian Amarah (Anger Management)',
            skenario: 'Di kantin sekolah, temanmu tidak sengaja menyenggol lenganmu hingga es teh tumpah dan membasahi seragam baru.',
            pertanyaan: 'Tindakan pengelolaan amarah yang dewasa adalah...',
            pilihan: [
              { label: 'A', teks: 'Menarik napas panjang, menahan emosi ledakan, dan mengomunikasikan penyelesaian secara tenang.', isCorrect: true },
              { label: 'B', teks: 'Langsung memukul dan memaki teman tersebut.', isCorrect: false },
              { label: 'C', teks: 'Membalas menyiramkan makanan ke seragam teman tersebut.', isCorrect: false },
              { label: 'D', teks: 'Menyimpan dendam dan mengajak teman lain membencinya.', isCorrect: false }
            ],
            penjelasan: 'Menjeda reaksi emosi selama beberapa detik mencegah tindakan impulsif yang dapat memicu pertengkaran fisik.'
          },
          {
            id: 3,
            kategori: 'Strategi Coping Stres Sehat',
            skenario: 'Ketika tekanan ujian atau aktivitas sekolah terasa berat, siswa perlu merilis stres dengan cara yang bermanfaat.',
            pertanyaan: 'Manakah kegiatan di bawah ini yang termasuk metode pelepasan stres (coping mechanism) yang positif?',
            pilihan: [
              { label: 'A', teks: 'Olahraga ringan, mendengarkan musik relaksasi, dan bercerita kepada Guru BK.', isCorrect: true },
              { label: 'B', teks: 'Mengkonsumsi makanan manis berlebihan dan merusak barang.', isCorrect: false },
              { label: 'C', teks: 'Menyendiri di kamar berhari-hari tanpa makan.', isCorrect: false },
              { label: 'D', teks: 'Melampiaskan amarah di kolom komentar sosmed.', isCorrect: false }
            ],
            penjelasan: 'Coping stress positif membantu menyegarkan pikiran tanpa merusak kesehatan atau hubungan sosial.'
          }
        ];

      case 'gaya-belajar':
        return [
          {
            id: 1,
            kategori: 'Strategi Belajar Tipe Visual',
            skenario: 'Kamu memiliki gaya belajar Visual yang lebih mudah memahami materi jika disajikan dalam bentuk gambar dan skema.',
            pertanyaan: 'Strategi belajar mandiri yang paling cocok untukmu adalah...',
            pilihan: [
              { label: 'A', teks: 'Membuat mind map (peta konsep) berwarna dan ringkasan peta visual.', isCorrect: true },
              { label: 'B', teks: 'Mendengarkan rekaman suara penjelasan materi tanpa mencatat.', isCorrect: false },
              { label: 'C', teks: 'Belajar sambil jalan-jalan tanpa melihat buku.', isCorrect: false },
              { label: 'D', teks: 'Menghafal rumus secara lisan tanpa menggunakan gambar.', isCorrect: false }
            ],
            penjelasan: 'Pelajar tipe Visual mengoptimalkan memori kognitif melalui warna, diagram, dan tata letak grafis yang rapi.'
          },
          {
            id: 2,
            kategori: 'Manajemen Waktu (Teknik Pomodoro)',
            skenario: 'Kamu sering merasa cepat lelah dan konsentrasi buyar saat harus belajar dalam durasi lama.',
            pertanyaan: 'Penerapan Teknik Pomodoro yang benar untuk menjaga fokus belajar adalah...',
            pilihan: [
              { label: 'A', teks: 'Belajar fokus selama 25 menit diselingi istirahat singkat 5 menit.', isCorrect: true },
              { label: 'B', teks: 'Belajar nonstop 4 jam tanpa jeda minum atau istirahat.', isCorrect: false },
              { label: 'C', teks: 'Istirahat 25 menit dan belajar hanya 5 menit.', isCorrect: false },
              { label: 'D', teks: 'Belajar sambil menonton televisi dan bermain HP.', isCorrect: false }
            ],
            penjelasan: 'Teknik Pomodoro menjaga stamina ketahanan otak dan mencegah kelelahan mental (brain fatigue).'
          },
          {
            id: 3,
            kategori: 'Strategi Tipe Auditori & Kinestetik',
            skenario: 'Teman kelompokmu sangat aktif bergerak dan sulit diam saat membaca buku teks.',
            pertanyaan: 'Metode belajar yang paling efektif membantu teman tipe Kinestetik tersebut adalah...',
            pilihan: [
              { label: 'A', teks: 'Ajak melakukan simulasi peran, praktik langsung, atau menggunakan peraga fisik.', isCorrect: true },
              { label: 'B', teks: 'Memaksa duduk tenang selama 3 jam membaca buku tebal.', isCorrect: false },
              { label: 'C', teks: 'Melarangnya ikut kelompok belajar.', isCorrect: false },
              { label: 'D', teks: 'Menyuruhnya menghafal teks secara diam.', isCorrect: false }
            ],
            penjelasan: 'Tipe Kinestetik menyerap informasi paling baik melalui pengalaman gerak, eksperimen, dan sentuhan fisik.'
          }
        ];

      case 'penyesuaian-sosial':
        return [
          {
            id: 1,
            kategori: 'Adaptasi Lingkungan SMP Baru',
            skenario: 'Sebagai peserta didik baru kelas 7 di SMPN 7 Pasuruan, kamu masuk ke kelas yang sebagian besar siswanya belum kamu kenal.',
            pertanyaan: 'Sikap awal yang ramah dan adaptif untuk memulai pertemanan adalah...',
            pilihan: [
              { label: 'A', teks: 'Tersenyum ramah, menyapa kawan sebangku, dan memperkenal diri dengan sopan.', isCorrect: true },
              { label: 'B', teks: 'Duduk diam di sudut kelas dan memasang muka jutek.', isCorrect: false },
              { label: 'C', teks: 'Pura-pura sombong agar disegani teman baru.', isCorrect: false },
              { label: 'D', teks: 'Menjauhi teman dan sibuk main ponsel sendirian.', isCorrect: false }
            ],
            penjelasan: 'Inisiatif ramah dan sikap terbuka mempercepat proses penyesuaian diri dan menciptakan rasa nyaman di sekolah baru.'
          },
          {
            id: 2,
            kategori: 'Inklusivitas & Menghargai Perbedaan',
            skenario: 'Dalam pembentukan kelompok belajar, kamu sekelompok dengan kawan yang berasal dari latar belakang daerah dan budaya yang berbeda.',
            pertanyaan: 'Tindakan yang menunjukkan kematangan adaptasi sosial adalah...',
            pilihan: [
              { label: 'A', teks: 'Menerima dengan gembira, saling menukar kebudayaan positif, dan berkolaborasi erat.', isCorrect: true },
              { label: 'B', teks: 'Minta pindah kelompok karena tidak mau berteman beda latar belakang.', isCorrect: false },
              { label: 'C', teks: 'Mengejek gaya bahasa kawan tersebut.', isCorrect: false },
              { label: 'D', teks: 'Membatasi percakapan hanya mengenai tugas saja.', isCorrect: false }
            ],
            penjelasan: 'Inklusivitas memperkaya wawasan kebangsaan dan membangun persaudaraan yang kokoh di sekolah.'
          }
        ];

      case 'pubertas-kesehatan':
        return [
          {
            id: 1,
            kategori: 'Kebersihan Diri (Personal Hygiene)',
            skenario: 'Di masa pubertas, kelenjar keringat dan minyak bekerja lebih aktif sehingga berisiko menimbulkan bau badan jika tidak dirawat.',
            pertanyaan: 'Langkah perawatan kebersihan diri yang paling efektif adalah...',
            pilihan: [
              { label: 'A', teks: 'Mandi teratur 2x sehari, berganti pakaian bersih, dan merawat kebersihan kulit.', isCorrect: true },
              { label: 'B', teks: 'Menyemprot parfum sangat banyak tanpa perlu mandi.', isCorrect: false },
              { label: 'C', teks: 'Memakai pakaian olahraga secara berulang tanpa dicuci.', isCorrect: false },
              { label: 'D', teks: 'Jarang mencuci muka dan membiarkan rambut lepek.', isCorrect: false }
            ],
            penjelasan: 'Menjaga kebersihan tubuh saat pubertas adalah kewajiban untuk kesehatan, kenyamanan pergaulan, dan rasa percaya diri.'
          },
          {
            id: 2,
            kategori: 'Sikap Mental Menghadapi Pubertas',
            skenario: 'Kamu mengalami pertumbuhan tinggi badan yang sangat cepat dan muncul jerawat di wajah, membuatmu merasa kurang percaya diri.',
            pertanyaan: 'Sikap mental yang benar dalam menyikapi perubahan pubertas adalah...',
            pilihan: [
              { label: 'A', teks: 'Memahami bahwa perubahan fisik adalah hal wajar dan alami, serta fokus merawat kebersihan diri.', isCorrect: true },
              { label: 'B', teks: 'Mengurung diri di rumah karena malu bertemu teman.', isCorrect: false },
              { label: 'C', teks: 'Membeli obat pemutih/pemulus racikan tanpa izin dokter.', isCorrect: false },
              { label: 'D', teks: 'Membenci bentuk tubuh sendiri.', isCorrect: false }
            ],
            penjelasan: 'Menerima perubahan pubertas dengan sikap positif (Body Positivity) membina kesehatan mental dan rasa percaya diri.'
          }
        ];

      case 'self-awareness':
        return [
          {
            id: 1,
            kategori: 'Refleksi Diri (Johari Window)',
            skenario: 'Kamu merasa minder karena menganggap dirimu tidak memiliki bakat menonjol seperti teman-teman kelas lainnya.',
            pertanyaan: 'Langkah pengenalan diri (Self-Awareness) yang disarankan Guru BK adalah...',
            pilihan: [
              { label: 'A', teks: 'Mencatat kekuatan & minat pribadi, meminta masukan positif kawan/guru, serta mengasah bakat.', isCorrect: true },
              { label: 'B', teks: 'Menyerah dan berhenti mencoba hal-hal baru.', isCorrect: false },
              { label: 'C', teks: 'Iri dan meniru gaya hidup teman lain secara paksa.', isCorrect: false },
              { label: 'D', teks: 'Menyalahkan orang tua atas potensi diri.', isCorrect: false }
            ],
            penjelasan: 'Setiap individu memiliki potensi unik. Mengenali area diri membantu mengarahkan energi pada pengembangan potensi nyata.'
          },
          {
            id: 2,
            kategori: 'Penerimaan Diri & Growth Mindset',
            skenario: 'Ketika mendapatkan hasil tes evaluasi yang di bawah target, kawanmu mengejek kemampuanmu.',
            pertanyaan: 'Penerapan Growth Mindset yang tepat dalam menghadapi situasi ini adalah...',
            pilihan: [
              { label: 'A', teks: 'Menjadikan nilai tersebut sebagai bahan evaluasi untuk belajar lebih efektif dan membuktikan kemampuan.', isCorrect: true },
              { label: 'B', teks: 'Percaya bahwa dirimu memang bodoh dan tidak bisa berubah.', isCorrect: false },
              { label: 'C', teks: 'Membalas mengejek teman tersebut dengan kata kasar.', isCorrect: false },
              { label: 'D', teks: 'Bolos sekolah agar tidak diejek lagi.', isCorrect: false }
            ],
            penjelasan: 'Growth Mindset meyakini bahwa kecerdasan dan kemampuan dapat berkembang melalui usaha, strategi, dan latihan konsisten.'
          }
        ];

      case 'karir-profesi':
        return [
          {
            id: 1,
            kategori: 'Eksplorasi Cita-Cita & Minat',
            skenario: 'Kamu tertarik dengan dunia teknologi, pemrograman komputer, dan pembuatan aplikasi web, namun bingung harus mulai dari mana.',
            pertanyaan: 'Langkah awal eksplorasi karir yang tepat di jenjang SMP adalah...',
            pilihan: [
              { label: 'A', teks: 'Mendalami mata pelajaran Matematika & TIK, mengikuti ekstrakurikuler sains/komputer, serta berkonsultasi ke Guru BK.', isCorrect: true },
              { label: 'B', teks: 'Menunggu sampai lulus SMA baru mulai belajar.', isCorrect: false },
              { label: 'C', teks: 'Hanya bermain game tanpa mempelajari ilmu dasarnya.', isCorrect: false },
              { label: 'D', teks: 'Mengikuti pilihan cita-cita kawan dekat saja.', isCorrect: false }
            ],
            penjelasan: 'Eksplorasi karir sejak SMP membangun fondasi minat, pemahaman jalur studi, dan kebiasaan belajar yang terarah.'
          },
          {
            id: 2,
            kategori: 'Pengembangan Soft Skill Masa Depan',
            skenario: 'Dunia kerja masa depan memerlukan gabungan antara keahlian teknis (hard skill) dan kecakapan sosial (soft skill).',
            pertanyaan: 'Manakah contoh pengembangan soft skill yang bisa dilatih di sekolah?',
            pilihan: [
              { label: 'A', teks: 'Keterampilan komunikasi asertif, kepemimpinan organisasi, dan kemampuan kerja sama tim.', isCorrect: true },
              { label: 'B', teks: 'Menghafal isi buku tanpa mengerti penerapannya.', isCorrect: false },
              { label: 'C', teks: 'Kemampuan mengerjakan tugas tanpa bantuan siapapun.', isCorrect: false },
              { label: 'D', teks: 'Mengabaikan pendapat anggota kelompok.', isCorrect: false }
            ],
            penjelasan: 'Soft skill seperti komunikasi dan kolaborasi sangat menentukan kesuksesan karir dan kepemimpinan di masa depan.'
          }
        ];

      default:
        // Fallback scenario generator from module's evaluation questions
        return module.soalEval.map((q, idx) => ({
          id: idx + 1,
          kategori: `Tantangan ${module.judul}`,
          skenario: q.studiKasusTeks || `Skenario Tantangan Edukasi BK pada topik ${module.judul}.`,
          pertanyaan: q.pertanyaan,
          pilihan: Array.isArray(q.pilihan)
            ? q.pilihan.map((p, pIdx) => ({
                label: String.fromCharCode(65 + pIdx),
                teks: p,
                isCorrect: typeof q.jawabanBenar === 'string' ? p === q.jawabanBenar : Array.isArray(q.jawabanBenar) ? q.jawabanBenar.includes(p) : false
              }))
            : [
                { label: 'A', teks: 'Benar / Tepat', isCorrect: q.jawabanBenar === true },
                { label: 'B', teks: 'Salah / Kurang Tepat', isCorrect: q.jawabanBenar === false }
              ],
          penjelasan: q.pembahasan || 'Tindakan terpuji dan bijak memberikan dampak positif bagi diri sendiri dan lingkungan sekolah.'
        }));
    }
  };

  // Helper to get module-specific sorting cards
  const getSortingCards = (): SortingCard[] => {
    switch (module.id) {
      case 'ibadah-akhlak':
        return [
          { id: 1, perilaku: 'Menyapa guru dan teman dengan adab 5S (Senyum, Salam, Sapa, Sopan, Santun)', isPositive: true, penjelasan: 'Sikap mulia yang mempererat tali silaturahmi.' },
          { id: 2, perilaku: 'Memaksa teman memeluk atau mengikuti paham keagamaan pribadi', isPositive: false, penjelasan: 'Perilaku yang melanggar prinsip toleransi dan Moderasi Beragama.' },
          { id: 3, perilaku: 'Menghormati teman yang sedang beribadah sesuai tata cara organisasinya', isPositive: true, penjelasan: 'Wujud nyata Moderasi Beragama dan rasa saling menghargai.' },
          { id: 4, perilaku: 'Menyontek saat ujian Pendidikan Agama dan berbohong kepada guru', isPositive: false, penjelasan: 'Perilaku tercela yang merusak kejujuran dan nilai ibadah.' },
          { id: 5, perilaku: 'Menyerahkan barang temuan di lingkungan sekolah kepada piket/BK', isPositive: true, penjelasan: 'Bentuk integritas, kejujuran (sidqu), dan sifat amanah.' },
          { id: 6, perilaku: 'Menyebarkan ujaran kebencian atau ajaran ekstrem di media sosial', isPositive: false, penjelasan: 'Perilaku berbahaya yang merusak kedamaian dan persatuan.' }
        ];

      case 'etika-pergaulan':
        return [
          { id: 1, perilaku: 'Menggunakan kalimat "Saya merasa..." (I-Message) saat menyampaikan rasa ketidaksenangan', isPositive: true, penjelasan: 'Komunikasi asertif yang sehat tanpa memicu konflik.' },
          { id: 2, perilaku: 'Mengajak kawan bolos sekolah dan mengancam memutus pertemanan', isPositive: false, penjelasan: 'Pertemanan toksik yang merusak masa depan.' },
          { id: 3, perilaku: 'Menghargai batasan pribadi (personal space) dan privasi kawan', isPositive: true, penjelasan: 'Sikap empati dan penghormatan dalam pergaulan.' },
          { id: 4, perilaku: 'Mengejek bentuk fisik (body shaming) kawan sekelas di depan umum', isPositive: false, penjelasan: 'Tindakan perundungan yang menyakiti perasaan.' },
          { id: 5, perilaku: 'Membela kawan yang terintimidasi dan melaporkan kasus ke BK', isPositive: true, penjelasan: 'Sikap ksatria (Upstander) pencegah perundungan.' },
          { id: 6, perilaku: 'Menyebarkan rumor palsu di grup WhatsApp untuk menjatuhkan teman', isPositive: false, penjelasan: 'Perilaku cyberbullying yang berbahaya.' }
        ];

      case 'emosi-stres':
        return [
          { id: 1, perilaku: 'Melakukan latihan pernapasan relaksasi (4-7-8) saat merasa panik', isPositive: true, penjelasan: 'Langkah tepat meredakan ketegangan emosi.' },
          { id: 2, perilaku: 'Membanting barang dan berteriak kasar saat keinginan tidak dituruti', isPositive: false, penjelasan: 'Pelampiasan emosi tidak sehat yang merugikan.' },
          { id: 3, perilaku: 'Menuliskan luapan emosi di jurnal pribadi atau bercerita ke BK', isPositive: true, penjelasan: 'Pelepasan emosi yang aman dan konstruktif.' },
          { id: 4, perilaku: 'Memendam stres sendirian hingga jatuh sakit dan insomnia', isPositive: false, penjelasan: 'Kebiasaan memendam yang membahayakan fisik dan mental.' },
          { id: 5, perilaku: 'Mengalihkan stres dengan olahraga atau hobi seni yang positif', isPositive: true, penjelasan: 'Coping mechanism yang menyehatkan jiwa.' },
          { id: 6, perilaku: 'Melampiaskan amarah dengan merusak fasilitas umum sekolah', isPositive: false, penjelasan: 'Tindakan perusakan yang melanggar aturan.' }
        ];

      case 'gaya-belajar':
        return [
          { id: 1, perilaku: 'Membuat peta konsep (mind mapping) dan catatan ber-highlighter warna', isPositive: true, penjelasan: 'Sangat membantu pemahaman tipe Visual.' },
          { id: 2, perilaku: 'Belajar SKS (Sistem Kebut Semalam) tanpa tidur sebelum ujian', isPositive: false, penjelasan: 'Membuat fungsi otak menurun dan kelelahan.' },
          { id: 3, perilaku: 'Menerapkan Teknik Pomodoro (25 menit belajar, 5 menit istirahat)', isPositive: true, penjelasan: 'Menjaga stamina dan fokus belajar tinggi.' },
          { id: 4, perilaku: 'Belajar sambil membuka game online dan notifikasi media sosial', isPositive: false, penjelasan: 'Mengganggu konsentrasi dan memicu distraksi.' },
          { id: 5, perilaku: 'Merekam poin penting pembahasan guru untuk didengarkan ulang', isPositive: true, penjelasan: 'Strategi belajar yang ampuh bagi tipe Auditori.' },
          { id: 6, perilaku: 'Menunda pengerjaan tugas hingga batas waktu pengumpulan habis', isPositive: false, penjelasan: 'Kebiasaan prokrastinasi yang merugikan nilai.' }
        ];

      case 'penyesuaian-sosial':
        return [
          { id: 1, perilaku: 'Menyapa kawan baru dengan ramah dan mempraktekkan adab 5S', isPositive: true, penjelasan: 'Kunci utama kemudahan beradaptasi di sekolah baru.' },
          { id: 2, perilaku: 'Mengurung diri di pojok kelas karena merasa asing dan ragu', isPositive: false, penjelasan: 'Menghambat perkembangan pergaulan sosial.' },
          { id: 3, perilaku: 'Mematuhi tata tertib sekolah dan menghormati aturan SMPN 7 Pasuruan', isPositive: true, penjelasan: 'Bentuk kesadaran disiplin siswa yang baik.' },
          { id: 4, perilaku: 'Melanggar jam masuk kelas dan merasa bangga membangkang aturan', isPositive: false, penjelasan: 'Pelanggaran disiplin yang mendapat sanksi BK.' },
          { id: 5, perilaku: 'Berteman inklusif tanpa membeda-bedakan suku, agama, dan status', isPositive: true, penjelasan: 'Menciptakan iklim sekolah yang damai dan toleran.' },
          { id: 6, perilaku: 'Membentuk geng eksklusif yang menolak kehadiran kawan baru', isPositive: false, penjelasan: 'Memicu perpecahan dan rasa tidak aman.' }
        ];

      case 'pubertas-kesehatan':
        return [
          { id: 1, perilaku: 'Mandi teratur 2x sehari dan berganti pakaian bersih secara rutin', isPositive: true, penjelasan: 'Menjaga kebersihan dan kesehatan kulit pubertas.' },
          { id: 2, perilaku: 'Mengejek atau menertawakan perubahan fisik pubertas teman', isPositive: false, penjelasan: 'Tindakan tidak terpuji yang merusak rasa percaya diri.' },
          { id: 3, perilaku: 'Berkonsultasi ke Guru BK atau Orang Tua mengenai perubahan pubertas', isPositive: true, penjelasan: 'Langkah tepat mendapat bimbingan tepercaya.' },
          { id: 4, perilaku: 'Percaya begitu saja pada mitos/hoaks pubertas di media sosial', isPositive: false, penjelasan: 'Risiko salah informasi yang membahayakan.' },
          { id: 5, perilaku: 'Menjaga batasan pergaulan dan menghormati personal space', isPositive: true, penjelasan: 'Bentuk perlindungan diri dan akhlak mulia.' },
          { id: 6, perilaku: 'Malas mencuci muka dan biarkan pakaian olahraga basah berhari-hari', isPositive: false, penjelasan: 'Penyebab bau badan dan penyakit kulit.' }
        ];

      case 'self-awareness':
        return [
          { id: 1, perilaku: 'Menyadari kelebihan dan kekurangan diri secara jujur dan obyektif', isPositive: true, penjelasan: 'Fondasi utama pengenalan diri (Self-Awareness).' },
          { id: 2, perilaku: 'Membanding-bandingkan diri dengan kawan lain hingga merasa rendah diri', isPositive: false, penjelasan: 'Memicu kecemasan dan merusak self-esteem.' },
          { id: 3, perilaku: 'Menulis jurnal refleksi pertumbuhan karakter harian', isPositive: true, penjelasan: 'Aktivitas pemahaman diri yang sangat konstruktif.' },
          { id: 4, perilaku: 'Menolak saran/kritik membangun dari orang lain karena gengsi', isPositive: false, penjelasan: 'Menghambat pertumbuhan pribadi.' },
          { id: 5, perilaku: 'Menghargai keunikan diri dan bersyukur atas pemberian Tuhan', isPositive: true, penjelasan: 'Sikap Penerimaan Diri (Self-Acceptance) yang sehat.' },
          { id: 6, perilaku: 'Menyalahkan orang lain atas kegagalan atau nilai yang diperoleh', isPositive: false, penjelasan: 'Sikap tidak bertanggung jawab atas diri sendiri.' }
        ];

      case 'karir-profesi':
        return [
          { id: 1, perilaku: 'Eksplorasi minat dan bakat melalui kegiatan ekstrakurikuler sekolah', isPositive: true, penjelasan: 'Persiapan awal mengenali potensi karir.' },
          { id: 2, perilaku: 'Ikut-ikutan pilihan cita-cita teman tanpa tahu potensi pribadi', isPositive: false, penjelasan: 'Risiko salah jurusan / jalur karir di masa depan.' },
          { id: 3, perilaku: 'Melatih kemampuan komunikasi dan kerja sama tim dalam organisasi', isPositive: true, penjelasan: 'Mengasah soft skill kunci kesuksesan profesi.' },
          { id: 4, perilaku: 'Bermalas-malasan dan menganggap perencanaan karir tidak penting', isPositive: false, penjelasan: 'Membuat kehilangan arah di masa depan.' },
          { id: 5, perilaku: 'Membaca buku / informasi mengenai ragam profesi masa depan', isPositive: true, penjelasan: 'Membuka wawasan karir dan motivasi belajar.' },
          { id: 6, perilaku: 'Patah semangat mengejar cita-cita hanya karena satu kali gagal', isPositive: false, penjelasan: 'Sikap pantang menyerah harus selalu dilatih.' }
        ];

      default:
        return [
          { id: 1, perilaku: `Melaksanakan kebiasaan positif sesuai panduan ${module.judul}`, isPositive: true, penjelasan: 'Langkah tepat dalam pengembangan karakter.' },
          { id: 2, perilaku: 'Mengabaikan saran guru BK dan melanggar tata tertib sekolah', isPositive: false, penjelasan: 'Sikap yang perlu diperbaiki.' },
          { id: 3, perilaku: 'Menjaga integritas, disiplin, dan menghormati sesama teman', isPositive: true, penjelasan: 'Sikap terpuji yang patut dicontoh.' }
        ];
    }
  };

  const scenarioQuestions = getScenarioQuestions();
  const sortingCards = getSortingCards();

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = scenarioQuestions[currentScenarioIndex];
    const isCorrect = currentQ.pilihan[index]?.isCorrect;

    if (isCorrect) {
      const addedScore = 25 + streak * 5;
      const newScore = score + addedScore;
      setScore(newScore);
      setStreak(s => s + 1);
      if (onScoreChange) onScoreChange(newScore);
    } else {
      setStreak(0);
      setLives(l => Math.max(0, l - 1));
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex + 1 < scenarioQuestions.length) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setScenarioCompleted(true);
    }
  };

  const handleSortCard = (userAnswerPositive: boolean) => {
    const currentCard = sortingCards[currentCardIndex];
    const isCorrect = currentCard.isPositive === userAnswerPositive;

    if (isCorrect) {
      const newScore = score + 20;
      setScore(newScore);
      if (onScoreChange) onScoreChange(newScore);
      setLastSortingResult({ isCorrect: true, message: `Tepat Sekali! ${currentCard.penjelasan}` });
    } else {
      setLives(l => Math.max(0, l - 1));
      setLastSortingResult({ isCorrect: false, message: `Kurang Tepat. ${currentCard.penjelasan}` });
    }

    setTimeout(() => {
      setLastSortingResult(null);
      if (currentCardIndex + 1 < sortingCards.length) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        setSortingCompleted(true);
      }
    }, 1800);
  };

  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScenarioCompleted(false);
    setCurrentCardIndex(0);
    setSortingCompleted(false);
    setLastSortingResult(null);
  };

  const currentQ = scenarioQuestions[currentScenarioIndex];
  const currentCard = sortingCards[currentCardIndex];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6">
      {/* Header Game */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-amber-500" />
            <span>Permainan Edukatif BK & Modul Karakter</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Game Edukasi: {module.judul}
          </h2>
        </div>

        {/* Live Game Scoreboard */}
        <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <div className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>{score} Poin</span>
          </div>

          <div className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold flex items-center space-x-1 border border-amber-200">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Combo x{streak}</span>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-1.5 bg-rose-50 rounded-xl border border-rose-200">
            {[1, 2, 3].map(heartId => (
              <Heart
                key={heartId}
                className={`w-4 h-4 transition-all ${
                  heartId <= lives ? 'text-rose-500 fill-rose-500 scale-100' : 'text-slate-300 fill-slate-200 scale-90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selector Mode Game */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl max-w-md">
        <button
          onClick={() => {
            setActiveMode('scenario');
            handleRestartGame();
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeMode === 'scenario'
              ? 'bg-white text-indigo-900 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>1. Tantangan Skenario BK</span>
        </button>

        <button
          onClick={() => {
            setActiveMode('sorting');
            handleRestartGame();
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeMode === 'sorting'
              ? 'bg-white text-indigo-900 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListChecks className="w-3.5 h-3.5 text-teal-600" />
          <span>2. Klasifikasi Sikap</span>
        </button>
      </div>

      {/* GAME OVER STATE */}
      {lives <= 0 && (
        <div className="p-8 bg-rose-50 rounded-3xl border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-6 animate-fadeIn">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            💔
          </div>
          <h3 className="text-xl font-black text-rose-950">Kesempatan Nyawa Habis!</h3>
          <p className="text-xs text-rose-800 leading-relaxed">
            Jangan berkecil hati! Pelajari kembali materi modul BK dan coba ulangi tantangan game edukasi ini untuk meraih skor tertinggi.
          </p>
          <div className="pt-2">
            <button
              onClick={handleRestartGame}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi dari Awal</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 1: TANTANGAN SKENARIO BK */}
      {activeMode === 'scenario' && lives > 0 && !scenarioCompleted && currentQ && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
                {currentQ.kategori}
              </span>
              <span>Tantangan {currentScenarioIndex + 1} dari {scenarioQuestions.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2 transition-all duration-300 rounded-full"
                style={{ width: `${((currentScenarioIndex + 1) / scenarioQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Kartu Skenario Tantangan */}
          <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-md space-y-4 border border-indigo-800">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Skenario Kasus Realistis:</span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-indigo-100 bg-white/10 p-4 rounded-2xl border border-white/10">
              "{currentQ.skenario}"
            </p>
            <h3 className="text-base sm:text-lg font-black text-white pt-2">
              ❓ {currentQ.pertanyaan}
            </h3>
          </div>

          {/* Opsi Pilihan Tindakan */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.pilihan.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-indigo-300';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${btnStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    isAnswered && opt.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswered && isSelected && !opt.isCorrect
                      ? 'bg-rose-600 text-white'
                      : 'bg-indigo-100 text-indigo-900'
                  }`}>
                    {opt.label}
                  </span>
                  <div className="flex-1 pt-0.5 leading-relaxed font-semibold">
                    {opt.teks}
                  </div>
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Umpan Balik & Penjelasan Edukatif */}
          {isAnswered && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
              currentQ.pilihan[selectedOption!]?.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center space-x-2 font-black text-sm">
                {currentQ.pilihan[selectedOption!]?.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">Jawaban Tepat! (+25 Poin)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-800">Jawaban Kurang Tepat (-1 Nyawa)</span>
                  </>
                )}
              </div>

              <div className="text-xs leading-relaxed font-medium bg-white/80 p-3.5 rounded-xl border border-slate-200 text-slate-800">
                <span className="font-bold text-slate-900 block mb-1">💡 Penjelasan Nilai Moral BK:</span>
                {currentQ.penjelasan}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextScenario}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>{currentScenarioIndex + 1 < scenarioQuestions.length ? 'Tantangan Berikutnya' : 'Lihat Hasil Akhir Game'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCENARIO COMPLETED */}
      {scenarioCompleted && lives > 0 && (
        <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-200 text-center space-y-6 max-w-md mx-auto animate-fadeIn">
          <div className="w-20 h-20 bg-amber-400 text-indigo-950 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-lg border-2 border-amber-300">
            🏆
          </div>
          <div>
            <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-black uppercase">
              Tantangan Selesai!
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">Selamat! Kamu Lulus!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Kamu telah menyelesaikan seluruh Tantangan Skenario BK untuk modul {module.judul}.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm space-y-2">
            <div className="text-xs text-slate-500 font-bold uppercase">Total Skor Perolehan</div>
            <div className="text-3xl font-black text-indigo-900">{score} Poin</div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Gelar: Pelajar Moderat & Berakhlak Mulia</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveMode('sorting');
                handleRestartGame();
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Lanjut ke Tantangan 2 (Klasifikasi Sikap)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleRestartGame}
              className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
            >
              Main Ulang Tantangan Skenario
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: KLASIFIKASI / SORTING SIKAP */}
      {activeMode === 'sorting' && lives > 0 && !sortingCompleted && currentCard && (
        <div className="space-y-6 max-w-xl mx-auto text-center animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-teal-600 uppercase tracking-wider">
              Tantangan {currentCardIndex + 1} dari {sortingCards.length}
            </span>
            <h3 className="text-lg font-black text-slate-900">Klasifikasikan Perilaku Berikut:</h3>
            <p className="text-xs text-slate-500">
              Pilih apakah perilaku di bawah ini termasuk **Sikap Terpuji & Moderat** atau **Sikap Tercela / Perlu Diperbaiki**.
            </p>
          </div>

          {/* Kartu Perilaku */}
          <div className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl border-2 border-teal-200 shadow-md space-y-4 relative">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl mx-auto flex items-center justify-center text-xl font-bold shadow-sm">
              ✨
            </div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed px-4">
              "{currentCard.perilaku}"
            </p>
          </div>

          {/* Result Alert */}
          {lastSortingResult && (
            <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed animate-fadeIn ${
              lastSortingResult.isCorrect
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : 'bg-rose-100 border-rose-300 text-rose-900'
            }`}>
              {lastSortingResult.message}
            </div>
          )}

          {/* Tombol Klasifikasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              disabled={lastSortingResult !== null}
              onClick={() => handleSortCard(true)}
              className="py-4 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              <span>Sikap Terpuji & Moderat (+20 Poin)</span>
            </button>

            <button
              disabled={lastSortingResult !== null}
              onClick={() => handleSortCard(false)}
              className="py-4 px-5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
              <span>Sikap Tercela / Perlu Diperbaiki</span>
            </button>
          </div>
        </div>
      )}

      {/* SORTING COMPLETED */}
      {sortingCompleted && lives > 0 && (
        <div className="p-8 bg-teal-50 rounded-3xl border border-teal-200 text-center space-y-6 max-w-md mx-auto animate-fadeIn">
          <div className="w-20 h-20 bg-teal-600 text-white rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-lg">
            ⭐
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">Klasifikasi Selesai!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Luar biasa! Kamu telah mengklasifikasikan seluruh perilaku dalam modul {module.judul} dengan cermat.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-teal-100 shadow-sm space-y-1">
            <div className="text-xs text-slate-500 font-bold uppercase">Total Skor Akhir Game</div>
            <div className="text-3xl font-black text-teal-900">{score} Poin</div>
          </div>

          <button
            onClick={handleRestartGame}
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Ulang Permainan Edukatif</span>
          </button>
        </div>
      )}
    </div>
  );
};
