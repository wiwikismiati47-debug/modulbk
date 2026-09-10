import React, { useState } from 'react';
import { ModuleContent, Question, JurusBKItem } from '../types';
import { 
  FileText, HelpCircle, PlayCircle, BookOpen, CheckSquare, Edit3, 
  Gamepad2, ArrowLeft, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, Send, ChevronRight,
  Printer, Download, FileSpreadsheet, UserCheck, Plus, Users, X, ExternalLink
} from 'lucide-react';
import { exportToDoc, exportToExcel, exportToTxt, printDocumentContent } from '../utils/exportUtils';
import { PrintPreviewModal } from './PrintPreviewModal';
import { EducationalGame } from './EducationalGame';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';

const get7JurusForModule = (mod: ModuleContent): JurusBKItem[] => {
  if (mod.rpp.integrasi7Jurus && mod.rpp.integrasi7Jurus.length > 0) {
    return mod.rpp.integrasi7Jurus;
  }

  switch (mod.id) {
    case 'ibadah-akhlak':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Asesmen diagnostik kedisiplinan ibadah harian, pemetaan profil akhlak mulia, & pemetaan wawasan Moderasi Beragama siswa kelas 7 SMPN 7 Pasuruan.', mediaBentuk: 'Google Form Asesmen Spiritual & Angket AKPD Bidang Pribadi-Sosial' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal interaktif tata cara ibadah khusyuk, habituasi 5S, & penguatan 4 Pilar Moderasi Beragama (Komitmen Kebangsaan, Toleransi, Anti-Kekerasan, Akomodatif Tradisi).', mediaBentuk: 'Modul Digital BK, Slide Animasi, & Diskusi Klasikal Moderasi Beragama' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling individual/kelompok bagi siswa yang mengalami hambatan kedisiplinan ibadah atau prasangka keberagaman.', mediaBentuk: 'Ruang Konseling BK, Lembar Refleksi Diri, & Kartu Konseling' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi sinergis antara Guru BK, Guru Pendidikan Agama, Guru PPKn, & Orang Tua di rumah.', mediaBentuk: 'Buku Penghubung Ibadah Harian & WAG Pembiasaan Karakter Moderat' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Pembuatan target ibadah mandiri, komitmen akhlak terpuji, & ikrar pelajar moderat berkebinekaan.', mediaBentuk: 'Jurnal Pembiasaan Ibadah Harian & Chart Target Diri' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Penanganan responsif & mediasi terhadap gesekan kesepahaman keagamaan atau intoleransi di lingkungan sekolah.', mediaBentuk: 'Format Layanan Responsif BK & Sesi Mediasi Damai' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Penggunaan modul interaktif berbasis web, kuis digital HOTS, poster digital Moderasi Beragama, & video animasi moral.', mediaBentuk: 'Web Applet BK, Video YouTube Teladan, & Kuis Online Interaktif' }
      ];
    case 'etika-pergaulan':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Angket sosiometri & pemetaan potensi/pengalaman perundungan (bullying) di lingkungan kelas 7 baru.', mediaBentuk: 'Angket Sosiometri Digital & Lembar AKPD Bidang Sosial' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal / Kelompok', implementasi: 'Bimbingan klasikal pencegahan 4 jenis bullying (fisik, verbal, relasional, cyberbullying) & sosrodrama etika pergaulan.', mediaBentuk: 'Role Play / Sosrodrama, Slide Animasi, & Modul Interaktif' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling individual/kelompok bagi korban, pelaku, atau saksi (bystander) perundungan secara rahasia.', mediaBentuk: 'Ruang Konseling Bimbingan Kelompok & Lembar Restoratif' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Tim TPPK (Tim Pencegahan & Penanganan Kekerasan Sekolah), Wali Kelas, & Orang Tua.', mediaBentuk: 'SK TPPK Sekolah, Berita Acara Mediasi, & Pertemuan Wali Murid' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Penyusunan deklarasi pertemanan sehat & komitmen pribadi budaya ramah anak kelas 7.', mediaBentuk: 'Lembar Ikrar Pertemanan Sehat & Pohon Komitmen Kelas' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Intervensi krisis & mediasi penanganan kasus perundungan secara cepat, adil, & berkesadaran.', mediaBentuk: 'Kotak Pelaporan Anti-Bullying Digital & Protokol Layanan Responsif' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Kampanye digital Anti-Bullying via Canva/Instagram, poster digital, & barcode kotak curhat BK.', mediaBentuk: 'E-Poster Canva, Web Modul BK, & Video Simulasi Kasus' }
      ];
    case 'emosi-stres':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Pemetaan tingkat kecemasan transisi sekolah, skala pemantauan emosi (Mood Tracker), & inventori emosi remaja.', mediaBentuk: 'Skala Mood Tracker Digital & Angket Kebutuhan Emosional' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal neurosains emosi remaja, teknik STOP (Stop, Take a breath, Observe, Proceed), & coping stress.', mediaBentuk: 'Modul Digital BK, Slide Animasi Emosi, & Praktik Mindfulness' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling individual regulasi emosi & manajemen amarah (anger management) bagi siswa yang belum stabil.', mediaBentuk: 'Lembar Kerja Refleksi Emosi & Ruang Konseling Individual' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Wali Kelas & Orang Tua dalam menciptakan lingkungan belajar yang kondusif & ramah kesehatan mental.', mediaBentuk: 'Panduan Pendampingan Emosi Remaja untuk Orang Tua' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Lembar rencana pengelolaan emosi pribadi & jurnal refleksi perasaan harian siswa.', mediaBentuk: 'Jurnal Refleksi Emosi Harian & Kartu Coping Mechanism' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Pendampingan krisis emosional, ledakan amarah, atau kecemasan tinggi saat menghadapi ujian sekolah.', mediaBentuk: 'Sesi Relaksasi Krisis BK & Lembar Intervensi Emosi' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Aplikasi Mood Tracker digital, audio panduan mindfulness, & kuis emosi interaktif.', mediaBentuk: 'Web Application BK, Audio Relaksasi MP3, & Game Edukasi' }
      ];
    case 'gaya-belajar':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Tes online/angket diagnostik modalitas gaya belajar (Visual, Auditori, Kinestetik) & inventori manajemen waktu.', mediaBentuk: 'Tes Online VAK Gaya Belajar & Google Form Diagnostik Belajar' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal strategi belajar efektif, Matriks Prioritas Eisenhower, & Teknik Pomodoro 25 menit.', mediaBentuk: 'Workshop Time Management, Modul Digital, & Slide Interaktif' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Bimbingan belajar individual untuk siswa yang mengalami penurunan nilai atau kejenuhan belajar.', mediaBentuk: 'Kartu Bimbingan Belajar & Lembar Analisis Kesulitan Belajar' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Guru Mata Pelajaran & Orang Tua untuk mendampingi jadwal belajar mandiri di rumah.', mediaBentuk: 'Lembar Jadwal Belajar Rumah & Konsultasi Orang Tua' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Penyusunan Jadwal Belajar Mandiri harian, Matriks Eisenhower pribadi, & target pencapaian akademik.', mediaBentuk: 'Matriks Prioritas Belajar & Kartu Keputusan Belajar' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Bimbingan belajar khusus & intervensi bagi siswa terindikasi prokrastinasi (menunda-nunda tugas) berat.', mediaBentuk: 'Lembar Kontrak Belajar Mandiri & Sesi Bimbingan Responsif' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Aplikasi pengatur waktu Pomodoro digital, Google Form tes gaya belajar, & kalender agenda online.', mediaBentuk: 'Timer Pomodoro Web, E-Booklet Gaya Belajar, & Kuis HOTS' }
      ];
    case 'teman-sebaya':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Sosiometri kelas untuk memetakan hubungan pertemanan, siswa terisolasi, & dinamika kelompok belajar.', mediaBentuk: 'Angket Sosiometri Digital & Software Pemetaan Sosiogram' },
        { jurusNo: 2, namaJurus: 'Bimbingan Kelompok / Klasikal', implementasi: 'Bimbingan kelompok dinamika sosial, permainan kerja sama tim, & latihan komunikasi asertif (I-Message).', mediaBentuk: 'Dinamika Kelompok, Game Kerja Sama, & Kartu Studi Kasus' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling pertemanan bagi siswa yang merasa tidak diterima dalam kelompok atau canggung bergaul.', mediaBentuk: 'Ruang Konseling Kelompok & Lembar Restoratif Pertemanan' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Wali Kelas, Pembina OSIS/Ekstrakurikuler, & lingkungan masyarakat.', mediaBentuk: 'Program Project Bakti Sosial & Kolaborasi Kegiatan Sekolah' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Penyusunan peta jaringan pertemanan sehat & komitmen berkontribusi aktif dalam kegiatan kelompok.', mediaBentuk: 'Lembar Rencana Aksi Sosialisasi & Portofolio Kerja Sama' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Mediasi konflik pertemanan, penyelesaian perselisihan kelompok secara adil, emosional stabil, & damai.', mediaBentuk: 'Formulir Mediasi Konflik Sebaya & Sesi Konseling Responsif' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Visualisasi sosiogram digital, e-poster komunikasi asertif, & kuis kerja sama tim interaktif.', mediaBentuk: 'Sosiogram Interactive Applet, E-Poster Canva, & Game Edukasi' }
      ];
    case 'pubertas-kebersihan':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Asesmen pemahaman awal kesehatan reproduksi, pemetaan kesiapan fisik & emosi pubertas remaja awal.', mediaBentuk: 'Angket AKPD Kesehatan Reproduksi & Google Form Diagnostik' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal edukasi pubertas primer/sekunder, personal hygiene, & pergaulan sehat lawan jenis.', mediaBentuk: 'Seminar Kesehatan Reproduksi, Slide Animasi, & Modul BK' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling individual/kelompok bagi siswa yang mengalami kebingungan atau ketakutan terkait pubertas.', mediaBentuk: 'Ruang Konseling Privat & Lembar Edukasi Pubertas' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kemitraan sinergis dengan Tenaga Kesehatan / Puskesmas Pasuruan, Pembina UKS, & Orang Tua.', mediaBentuk: 'Program Penyuluhan Kesehatan Puskesmas & Modul Orang Tua' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Penyusunan checklist pola hidup bersih sehat (PHBS) & rencana perawatan kebersihan diri mandiri.', mediaBentuk: 'Lembar Checklist PHBS Harian & Kartu Komitmen Diri' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Bimbingan responsif bagi siswa yang memerlukan pendampingan khusus kebersihan diri atau batas pergaulan.', mediaBentuk: 'Format Bimbingan Responsif Diri & Konseling Khusus' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Video animasi anatomi pubertas ramah remaja, e-brochure kesehatan reproduksi, & kuis interaktif.', mediaBentuk: 'Video Youtube Edukasi, E-Brochure Digital, & Web App BK' }
      ];
    case 'kelebihan-kekurangan':
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Asesmen SWOT diri (Strength, Weakness, Opportunity, Threat) & pemetaan potensi minat bakat.', mediaBentuk: 'Angket Asesmen Potensi Diri & Lembar Kerja SWOT' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal pembentukan konsep diri positif, harga diri (self-esteem), & penerimaan diri (self-acceptance).', mediaBentuk: 'Modul Digital Self-Awareness, Slide Interaktif, & Refleksi' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Konseling Self-Concept bagi siswa yang mengalami krisis percaya diri, perasaan inferior, atau minder.', mediaBentuk: 'Konseling Self-Concept, Lembar Afirmasi, & Ruang BK' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Guru Seni/Olahraga/Mapel untuk mengidentifikasi prestasi siswa serta Orang Tua.', mediaBentuk: 'Kartu Rekomendasi Bakat Guru Mapel & Konsultasi Wali Murid' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Pembuatan Dokumen Portofolio Prestasi Diri, Goal Setting 3 Tahun SMP, & kartu target masa depan.', mediaBentuk: 'Portofolio Prestasi Diri & Lembar Goal Setting 3 Tahun' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Konseling pemulihan rasa percaya diri pasca kegagalan akademik atau kekecewaan dalam kompetisi.', mediaBentuk: 'Sesi Konseling Pemulihan Diri & Lembar Restrukturisasi Kognitif' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Lembar kerja SWOT digital, Pohon Potensi Diri interactive canvas, & aplikasi afirmasi harian.', mediaBentuk: 'Web Interactive Canvas SWOT, E-Portofolio, & Kuis Diri' }
      ];
    case 'wawasan-karir':
    default:
      return [
        { jurusNo: 1, namaJurus: 'Asesmen Kebutuhan / AKPD', implementasi: 'Tes Bakat Minat Karier (Holland Code / RIASEC) & pemetaan hubungan hobi dengan cita-cita siswa.', mediaBentuk: 'Tes Online Bakat Minat RIASEC & Angket AKPD Karir' },
        { jurusNo: 2, namaJurus: 'Bimbingan Klasikal', implementasi: 'Bimbingan klasikal eksplorasi profesi era digital, pemetaan jalur studi lanjutan SMA vs SMK vs MA.', mediaBentuk: 'Modul Bimbingan Karir Klasikal, Slide Profesi, & Film Karir' },
        { jurusNo: 3, namaJurus: 'Konseling Individual / Kelompok', implementasi: 'Bimbingan karir individual untuk mengarahkan minat bakat ke pilihan sekolah tujuan lanjutan.', mediaBentuk: 'Konsultasi Karir Individual & Lembar Perencanaan Studi' },
        { jurusNo: 4, namaJurus: 'Kolaborasi & Kemitraan', implementasi: 'Kolaborasi dengan Alumni, Career Day / Expo Sekolah, Guru Bimbingan Karir, & Orang Tua.', mediaBentuk: 'Program Career Day Expo, Edu-Expo, & Konsultasi Orang Tua' },
        { jurusNo: 5, namaJurus: 'Perencanaan Individual', implementasi: 'Pembuatan Pohon Karir Digital, Peta Rencana Studi Lanjutan, & target persiapan masuk SMA/SMK.', mediaBentuk: 'Web Pohon Karir Digital & Lembar Rencana Karir Masa Depan' },
        { jurusNo: 6, namaJurus: 'Layanan Responsif', implementasi: 'Konseling bagi siswa yang mengalami kecemasan masa depan atau perbedaan pilihan karir dengan orang tua.', mediaBentuk: 'Sesi Mediasi Karir Orang Tua - Anak & Konseling Responsif' },
        { jurusNo: 7, namaJurus: 'Media & Pemanfaatan Digital', implementasi: 'Web Pohon Karir Digital, Game Edukasi Mitos vs Fakta SMA/SMK, & direktori jurusan online.', mediaBentuk: 'Web Applet Karir, Game Edukasi Interaktif, & E-Brochure SMA/SMK' }
      ];
  }
};

interface ModuleDetailProps {
  module: ModuleContent;
  onBack: () => void;
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rpp' | 'kuisioner' | 'video' | 'materi' | 'soal' | 'latihan' | 'kuis' | 'permainan'>('rpp');

  // Kuisioner state
  const [kuisionerAnswers, setKuisionerAnswers] = useState<Record<number, number>>({});
  const [kuisionerSubmitted, setKuisionerSubmitted] = useState(false);

  // Soal Eval state (30 soal simulation / rich test runner)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | boolean | string[]>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Mini-game state
  const [gameScore, setGameScore] = useState(0);
  const [gameStep, setGameStep] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Ular Tangga / Kuis state
  const [playerPos, setPlayerPos] = useState(1);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [quizCardActive, setQuizCardActive] = useState<string | null>(null);

  const handleAnswerSelect = (qid: number, answer: string | boolean | string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [qid]: answer }));
  };

  const handleTestSubmit = () => {
    let correctCount = 0;
    module.soalEval.forEach(q => {
      const userAns = selectedAnswers[q.id];
      if (userAns !== undefined) {
        if (Array.isArray(q.jawabanBenar) && Array.isArray(userAns)) {
          if (q.jawabanBenar.length === userAns.length && q.jawabanBenar.every(v => userAns.includes(v))) {
            correctCount++;
          }
        } else if (q.jawabanBenar === userAns) {
          correctCount++;
        }
      }
    });
    // Calculate out of total
    const finalScore = Math.round((correctCount / module.soalEval.length) * 100);
    setScore(finalScore);
    setTestSubmitted(true);
  };

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    let newPos = playerPos + roll;
    if (newPos > 30) newPos = 30; // 30 steps board
    // Snakes and ladders
    if (newPos === 5) newPos = 14; // Ladder up
    if (newPos === 12) newPos = 22; // Ladder up
    if (newPos === 19) newPos = 8;  // Snake down
    if (newPos === 27) newPos = 16; // Snake down
    setPlayerPos(newPos);
    if (newPos === 30) {
      alert('Selamat! Kamu berhasil mencapai puncak Kuis Ular Tangga HOTS!');
    }
  };

  // Modal state for print and export preview
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    title: string;
    filename: string;
    htmlBody: string;
    jsonDataForExcel?: { sheetName: string; data: any[] };
  }>({
    isOpen: false,
    title: '',
    filename: '',
    htmlBody: ''
  });

  // Pengesahan (Guru BK & Kepala Sekolah) State
  const [guruBkList, setGuruBkList] = useState([
    { nama: 'WIWIK ISMIATI, S.Pd', nip: '19831116 200904 2 003' },
    { nama: 'EKI FEBRIANI, S.Pd', nip: '19940214 202221 2 014' }
  ]);
  const [selectedGuruBkIndex, setSelectedGuruBkIndex] = useState(0);

  const [kepalaSekolah, setKepalaSekolah] = useState({
    nama: 'NUR FADILAH, S.Pd., M.Pd',
    nip: '19860410 201001 2 030'
  });

  const [isGuruBkModalOpen, setIsGuruBkModalOpen] = useState(false);
  const [newGuruBk, setNewGuruBk] = useState({ nama: '', nip: '' });

  const handleAddGuruBk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuruBk.nama.trim()) return;
    const updated = [...guruBkList, { nama: newGuruBk.nama.trim(), nip: newGuruBk.nip.trim() || '-' }];
    setGuruBkList(updated);
    setSelectedGuruBkIndex(updated.length - 1);
    setNewGuruBk({ nama: '', nip: '' });
    setIsGuruBkModalOpen(false);
  };

  // HTML content generators & Modal openers
  const openRPPModal = () => {
    const rpp = module.rpp;
    const identitas = rpp?.identitas || {} as any;
    const identifikasi = rpp?.identifikasi || {} as any;
    const desain = rpp?.desainKlasikal || {} as any;
    const kerangka = desain?.kerangkaPembelajaran || {} as any;
    const pelaksanaan = rpp?.pelaksanaan || {} as any;
    const prinsip = pelaksanaan?.prinsipPembelajaran || {} as any;
    const pengalaman = pelaksanaan?.pengalamanBelajar || {} as any;
    const langkah = pelaksanaan?.langkahLangkah || [] as any[];
    const jurus = get7JurusForModule(module) || [];
    const asesmen = rpp?.asesmenIndikatorTindakLanjut || {} as any;

    const jurusRows = jurus.map(j => `
      <tr>
        <td style="font-weight: bold; width: 25%; vertical-align: top; border: 1px solid #000000; padding: 6px 8px;">Jurus ${j.jurusNo}: ${j.namaJurus}</td>
        <td style="vertical-align: top; border: 1px solid #000000; padding: 6px 8px;">${j.implementasi}</td>
        <td style="width: 25%; font-style: italic; vertical-align: top; border: 1px solid #000000; padding: 6px 8px;">${j.mediaBentuk}</td>
      </tr>
    `).join('');

    const dimensiRows = (identifikasi?.dimensiPancasila || []).map((d: any, idx: number) => `
      <tr>
        <td style="text-align: center; font-weight: bold; width: 6%; border: 1px solid #000000; padding: 5px 6px;">${idx + 1}</td>
        <td style="font-weight: bold; width: 32%; border: 1px solid #000000; padding: 5px 8px;">${d.dimensi}</td>
        <td style="border: 1px solid #000000; padding: 5px 8px;">${d.keterangan}</td>
      </tr>
    `).join('');

    const tujuanItems = (desain?.tujuanLayanan || []).map((t: any) => `
      <li style="margin-bottom: 4px;">${t}</li>
    `).join('');

    const langkahRows = langkah.map((l: any, idx: number) => `
      <tr>
        <td style="text-align: center; font-weight: bold; width: 6%; border: 1px solid #000000; padding: 6px 8px;">${idx + 1}</td>
        <td style="font-weight: bold; width: 26%; border: 1px solid #000000; padding: 6px 8px;">${l.tahap}</td>
        <td style="border: 1px solid #000000; padding: 6px 8px;">${l.aktivitas}</td>
      </tr>
    `).join('');

    const indikatorItems = (asesmen?.indikatorKeberhasilan || []).map((i: any) => `
      <li style="margin-bottom: 4px;">${i}</li>
    `).join('');

    const kuisionerRows = (module.kuisioner || []).map((q, idx) => {
      const pilihanLabels = (q.pilihan || []).map(p => `[  ] ${p.label}`).join('<br/>');
      return `
        <tr>
          <td style="text-align: center; font-weight: bold; width: 6%; border: 1px solid #000000; padding: 6px 8px;">${idx + 1}</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;"><b>${q.pertanyaan}</b></td>
          <td style="width: 42%; font-size: 9pt; border: 1px solid #000000; padding: 6px 8px;">${pilihanLabels}</td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 18px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1.5px; color: #1e3a8a; text-transform: uppercase;">
          KURIKULUM MERDEKA • PEMBELAJARAN MENDALAM (DEEP LEARNING)
        </div>
        <div style="font-size: 13.5pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          RENCANA PELAKSANAAN PEMBELAJARAN (RPP) BIMBINGAN DAN KONSELING
        </div>
        <div style="font-size: 11.5pt; font-weight: bold; color: #1e293b; margin-top: 3px;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>
      
      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        1. IDENTITAS PEMBELAJARAN
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 30%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Satuan Pendidikan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${identitas.satuanPendidikan || 'SMP Negeri 7 Pasuruan'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Mata Pelajaran</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${identitas.mataPelajaran || 'Bimbingan dan Konseling (BK)'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Kelas / Semester</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">${identitas.kelasSemester || '7 / Ganjil'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Alokasi Waktu</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${identitas.waktu || '2 JP (2 x 40 Menit)'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Materi Pokok Layanan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-weight: bold; color: #1e3a8a;">${identitas.materiPokok || module.judul}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Bidang Bimbingan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${identitas.bidangBimbingan || 'Pribadi & Sosial'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Model Pembelajaran</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${identitas.modelPembelajaran || 'Project Based Learning (PjBL) & Deep Learning'}</td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        2. IDENTIFIKASI MURID & PROFIL PELAJAR PANCASILA (8 DIMENSI)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 30%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Kesiapan Murid</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify;">${identifikasi.kesiapanMurid || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Karakteristik Materi Layanan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify;">${identifikasi.karakteristikMateri || '-'}</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #f1f5f9; border: 1px solid #000000; padding: 6px 8px; font-weight: bold; text-align: center;">
            8 DIMENSI PROFIL PELAJAR PANCASILA
          </td>
        </tr>
        <tr>
          <td colspan="2" style="border: 1px solid #000000; padding: 0;">
            <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 9.5pt;">
              <tr style="background-color: #f8fafc;">
                <th style="width: 6%; border: 1px solid #000000; padding: 5px; text-align: center;">No</th>
                <th style="width: 32%; border: 1px solid #000000; padding: 5px; text-align: left;">Dimensi Profil</th>
                <th style="border: 1px solid #000000; padding: 5px; text-align: left;">Keterangan & Capaian Karakter Peserta Didik</th>
              </tr>
              ${dimensiRows}
            </table>
          </td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        3. DESAIN LAYANAN KLASIKAL (DEEP LEARNING)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 30%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Standar Kemandirian (SKKPD)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${desain.skkpd || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Topik Layanan Kontekstual</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">${desain.topikKontekstual || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Integrasi Lintas Disiplin Ilmu</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${desain.lintasDisiplin || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Tujuan Layanan BK</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">
            <ol style="margin: 0; padding-left: 18px;">
              ${tujuanItems}
            </ol>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #f1f5f9; border: 1px solid #000000; padding: 6px 8px; font-weight: bold; text-align: center;">
            4 KERANGKA PEMBELAJARAN MENDALAM
          </td>
        </tr>
        <tr>
          <td colspan="2" style="border: 1px solid #000000; padding: 0;">
            <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 9.5pt;">
              <tr style="background-color: #f8fafc;">
                <th style="width: 6%; border: 1px solid #000000; padding: 5px; text-align: center;">No</th>
                <th style="width: 28%; border: 1px solid #000000; padding: 5px; text-align: left;">Kerangka Pembelajaran</th>
                <th style="border: 1px solid #000000; padding: 5px; text-align: left;">Deskripsi Penerapan Layanan</th>
              </tr>
              <tr>
                <td style="border: 1px solid #000000; padding: 5px; text-align: center;">1</td>
                <td style="border: 1px solid #000000; padding: 5px; font-weight: bold;">Praktik Pedagogis</td>
                <td style="border: 1px solid #000000; padding: 5px;">${kerangka.praktikPedagogis || '-'}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000000; padding: 5px; text-align: center;">2</td>
                <td style="border: 1px solid #000000; padding: 5px; font-weight: bold;">Kemitraan Pembelajaran</td>
                <td style="border: 1px solid #000000; padding: 5px;">${kerangka.kemitraanPembelajaran || '-'}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000000; padding: 5px; text-align: center;">3</td>
                <td style="border: 1px solid #000000; padding: 5px; font-weight: bold;">Lingkungan Pembelajaran</td>
                <td style="border: 1px solid #000000; padding: 5px;">${kerangka.lingkunganPembelajaran || '-'}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000000; padding: 5px; text-align: center;">4</td>
                <td style="border: 1px solid #000000; padding: 5px; font-weight: bold;">Pemanfaatan Digital</td>
                <td style="border: 1px solid #000000; padding: 5px;">${kerangka.pemanfaatanDigital || '-'}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        4. INTEGRASI 7 JURUS BK HEBAT (SMP NEGERI 7 PASURUAN)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="width: 25%; border: 1px solid #000000; padding: 6px 8px; text-align: left;">Jurus BK Hebat</th>
            <th style="border: 1px solid #000000; padding: 6px 8px; text-align: left;">Implementasi Layanan di Sekolah</th>
            <th style="width: 25%; border: 1px solid #000000; padding: 6px 8px; text-align: left;">Bentuk / Media Layanan</th>
          </tr>
        </thead>
        <tbody>
          ${jurusRows}
        </tbody>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        5. PELAKSANAAN PEMBELAJARAN & PENGALAMAN BELAJAR (DEEP LEARNING)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td colspan="2" style="background-color: #f1f5f9; border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">
            A. 3 PRINSIP PEMBELAJARAN MENDALAM
          </td>
        </tr>
        <tr>
          <td style="width: 30%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">1. Berkesadaran (Mindful)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${prinsip.berkesadaran || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">2. Bermakna (Meaningful)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${prinsip.bermakna || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">3. Menggembirakan (Joyful)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${prinsip.menggembirakan || '-'}</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #f1f5f9; border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">
            B. 3 PENGALAMAN BELAJAR PESERTA DIDIK
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">1. Memahami (Acquiring)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${pengalaman.memahami || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">2. Mengaplikasi (Applying)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${pengalaman.mengaplikasi || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">3. Merefleksi (Reflecting)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">${pengalaman.merefleksi || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Proyek Pembelajaran (PjBL)</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-weight: bold; color: #1e3a8a;">${pelaksanaan.pjbl || '-'}</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #f1f5f9; border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">
            C. LANGKAH-LANGKAH KEGIATAN PEMBELAJARAN MENDALAM
          </td>
        </tr>
        <tr>
          <td colspan="2" style="border: 1px solid #000000; padding: 0;">
            <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 9.5pt;">
              <tr style="background-color: #f8fafc;">
                <th style="width: 6%; border: 1px solid #000000; padding: 6px; text-align: center;">No</th>
                <th style="width: 26%; border: 1px solid #000000; padding: 6px; text-align: left;">Tahap Kegiatan</th>
                <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Aktivitas Guru BK & Peserta Didik</th>
              </tr>
              ${langkahRows}
            </table>
          </td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
        6. ASESMEN, INDIKATOR KEBERHASILAN & RENCANA TINDAK LANJUT
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 30%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Asesmen Pembelajaran Mendalam</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify;">${asesmen.asesmen || '-'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Indikator Keberhasilan Layanan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px;">
            <ul style="margin: 0; padding-left: 18px;">
              ${indikatorItems}
            </ul>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Rencana Tindak Lanjut Layanan</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify; font-weight: bold; color: #065f46; background-color: #f0fdf4;">${asesmen.rencanaTindakLanjut || '-'}</td>
        </tr>
      </table>

      ${module.kuisioner && module.kuisioner.length > 0 ? `
        <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 18px; margin-bottom: 6px; text-transform: uppercase; border-radius: 2px;">
          LAMPIRAN: INSTRUMEN ASESMEN DIAGNOSTIK NON-KOGNITIF
        </div>
        <p style="font-size: 9.5pt; font-style: italic; margin-top: 2px; margin-bottom: 6px;">
          <b>Petunjuk:</b> Berikan tanda centang (✓) pada pilihan jawaban yang paling sesuai dengan kondisi diri Anda.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="width: 6%; border: 1px solid #000000; padding: 6px; text-align: center;">No</th>
              <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Pernyataan Asesmen Diagnostik</th>
              <th style="width: 42%; border: 1px solid #000000; padding: 6px; text-align: left;">Pilihan Jawaban & Skor</th>
            </tr>
          </thead>
          <tbody>
            ${kuisionerRows}
          </tbody>
        </table>
      ` : ''}
    `;

    setPreviewModal({
      isOpen: true,
      title: `RPP BK Mendalam - Modul ${module.nomor}: ${module.judul}`,
      filename: `RPP_BK_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent
    });
  };

  const openKuisionerModal = () => {
    const identitas = module.rpp?.identitas || {} as any;
    const kuisionerRows = (module.kuisioner || []).map((q, idx) => {
      const pilihanBoxes = (q.pilihan || []).map(p => `
        <div style="display: inline-block; margin-right: 12px; margin-bottom: 4px;">
          [ &nbsp; ] ${p.emoji || ''} ${p.label} <span style="font-size: 8pt; color: #475569;">(Skor ${p.skor})</span>
        </div>
      `).join('');

      return `
        <tr>
          <td style="text-align: center; font-weight: bold; width: 6%; border: 1px solid #000000; padding: 6px 8px; vertical-align: top;">${idx + 1}</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; vertical-align: top;">
            <b>${q.pertanyaan}</b>
            <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed #cbd5e1;">
              ${pilihanBoxes}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1px; color: #1e3a8a; text-transform: uppercase;">
          INSTRUMEN ASESMEN DIAGNOSTIK NON-KOGNITIF
        </div>
        <div style="font-size: 13pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          LAYANAN BIMBINGAN DAN KONSELING (DEEP LEARNING)
        </div>
        <div style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 2px;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Fokus Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 20%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Nama Peserta Didik</td>
          <td style="width: 40%; border: 1px solid #000000; padding: 5px 8px;">...............................................................</td>
          <td style="width: 15%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Kelas / No. Absen</td>
          <td style="width: 25%; border: 1px solid #000000; padding: 5px 8px;">${identitas.kelasSemester || '7'} / ..........</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Hari / Tanggal</td>
          <td style="border: 1px solid #000000; padding: 5px 8px;">...............................................................</td>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Materi Layanan</td>
          <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; color: #1e3a8a;">${identitas.materiPokok || module.judul}</td>
        </tr>
      </table>

      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 12px; margin-bottom: 12px; font-size: 9.5pt; border-radius: 4px;">
        <b>Petunjuk Pengisian:</b><br/>
        1. Bacalah setiap pernyataan butir instrumen di bawah ini dengan seksama.<br/>
        2. Berikan tanda centang [ ✓ ] pada kotak salah satu pilihan yang paling sesuai dengan kondisi diri Anda saat ini secara jujur.<br/>
        3. Tidak ada jawaban benar atau salah, instrumen ini bertujuan membantu Guru BK memahami kebutuhan dan potensi Anda.
      </div>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 6px; text-transform: uppercase;">
        DAFTAR BUTIR PERNYATAAN ASESMEN DIAGNOSTIK
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="width: 6%; border: 1px solid #000000; padding: 6px; text-align: center;">No</th>
            <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Pernyataan Butir Asesmen & Pilihan Respons Peserta Didik</th>
          </tr>
        </thead>
        <tbody>
          ${kuisionerRows}
        </tbody>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 6px; text-transform: uppercase;">
        PEDOMAN PENSKORAN & INTERPRETASI DIAGNOSTIK
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
        <tr style="background-color: #f1f5f9;">
          <th style="width: 25%; border: 1px solid #000000; padding: 6px; text-align: center;">Rentang Skor</th>
          <th style="width: 30%; border: 1px solid #000000; padding: 6px; text-align: left;">Kategori Diagnostik</th>
          <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Rekomendasi Tindak Lanjut Layanan BK</th>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 6px;">Skor Tinggi (76% - 100%)</td>
          <td style="font-weight: bold; color: #065f46; border: 1px solid #000000; padding: 6px;">Sangat Baik / Mandiri</td>
          <td style="border: 1px solid #000000; padding: 6px;">Penguatan karakter positif, keteladanan teman sebaya (peer tutor).</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 6px;">Skor Sedang (50% - 75%)</td>
          <td style="font-weight: bold; color: #854d0e; border: 1px solid #000000; padding: 6px;">Cukup / Perlu Pembiasaan</td>
          <td style="border: 1px solid #000000; padding: 6px;">Bimbingan klasikal berkala, diskusi kelompok terarah, jurnal refleksi.</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 6px;">Skor Rendah (&lt; 50%)</td>
          <td style="font-weight: bold; color: #991b1b; border: 1px solid #000000; padding: 6px;">Perlu Perhatian Khusus</td>
          <td style="border: 1px solid #000000; padding: 6px;">Konseling individual, kolaborasi intensif dengan wali kelas & orang tua.</td>
        </tr>
      </table>
    `;

    const excelData = (module.kuisioner || []).map((q, idx) => ({
      No: idx + 1,
      'Pertanyaan Kuisioner Diagnostik': q.pertanyaan,
      'Pilihan 1': q.pilihan?.[0]?.label || '-',
      'Pilihan 2': q.pilihan?.[1]?.label || '-',
      'Pilihan 3': q.pilihan?.[2]?.label || '-',
      'Pilihan 4': q.pilihan?.[3]?.label || '-'
    }));

    setPreviewModal({
      isOpen: true,
      title: `Kuisioner Diagnostik BK - Modul ${module.nomor}: ${module.judul}`,
      filename: `Kuisioner_Diagnostik_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent,
      jsonDataForExcel: {
        sheetName: 'Kuisioner Diagnostik',
        data: excelData
      }
    });
  };

  const openMateriModal = () => {
    const materiRows = (module.materiPoin || []).map((m, idx) => `
      <tr>
        <td style="text-align: center; font-weight: bold; width: 6%; border: 1px solid #000000; padding: 6px 8px; vertical-align: top;">${idx + 1}</td>
        <td style="width: 30%; font-weight: bold; border: 1px solid #000000; padding: 6px 8px; vertical-align: top;">
          ${m.ikon || '📌'} ${m.judul}
        </td>
        <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify; line-height: 1.5;">
          ${m.isi}
        </td>
      </tr>
    `).join('');

    const videoSec = module.video ? `
      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase;">
        SKENARIO MEDIA VIDEO EDUKATIF ANIMASI
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 25%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Judul & Durasi</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-weight: bold;">${module.video.judul} (${module.video.durasi})</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Alur Cerita Realistis</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify;">${module.video.ceritaRealistis}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Resolusi Moral</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; text-align: justify;">${module.video.resolusiMoral}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 6px 8px;">Pesan Moral Inspiratif</td>
          <td style="border: 1px solid #000000; padding: 6px 8px; font-style: italic; color: #1e3a8a;">"${module.video.kutipanInspiratif}"</td>
        </tr>
      </table>
    ` : '';

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1px; color: #1e3a8a; text-transform: uppercase;">
          MATERI LAYANAN EDUKASI & BACAAN BK BERMAKNA
        </div>
        <div style="font-size: 13pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Fokus Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>

      ${videoSec}

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase;">
        POIN-POIN MATERI PEMBELAJARAN MENDALAM
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="width: 6%; border: 1px solid #000000; padding: 6px; text-align: center;">No</th>
            <th style="width: 30%; border: 1px solid #000000; padding: 6px; text-align: left;">Topik / Poin Inti</th>
            <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Uraian Materi & Pembahasan Bermakna</th>
          </tr>
        </thead>
        <tbody>
          ${materiRows}
        </tbody>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-top: 14px; margin-bottom: 6px; text-transform: uppercase;">
        RANGKUMAN & REFLEKSI DIRI PESERTA DIDIK
      </div>
      <div style="border: 1px solid #000000; padding: 12px; font-size: 10pt; line-height: 1.6; text-align: justify; margin-bottom: 14px; background-color: #f8fafc;">
        <p style="margin: 0 0 8px 0;">
          <b>Kesimpulan Utama:</b> Melalui pembelajaran mendalam pada Modul ${module.nomor}, peserta didik diajak untuk menginternalisasi nilai-nilai kebaikan, memahami hakikat diri dan interaksi sosial yang sehat, serta menumbuhkan kesadaran moral yang kokoh.
        </p>
        <p style="margin: 0;">
          <b>Komitmen Nyata:</b> Terus biasakan nilai-nilai ini di lingkungan keluarga, kelas, dan masyarakat demi mewujudkan Profil Pelajar Pancasila yang utuh di UPT SMP Negeri 7 Pasuruan.
        </p>
      </div>
    `;

    setPreviewModal({
      isOpen: true,
      title: `Materi Edukasi BK - Modul ${module.nomor}: ${module.judul}`,
      filename: `Materi_BK_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent
    });
  };

  const openSoalModal = () => {
    const identitas = module.rpp?.identitas || {} as any;
    const soalList = (module.soalEval || []).map((q, idx) => {
      const pilihanHtml = q.pilihan ? `
        <div style="margin-top: 5px; margin-bottom: 5px; padding-left: 18px;">
          ${q.pilihan.map((p, pIdx) => `<div>${String.fromCharCode(65 + pIdx)}. ${p}</div>`).join('')}
        </div>
      ` : '';

      return `
        <div style="margin-bottom: 12px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; page-break-inside: avoid;">
          <div style="font-weight: bold;">
            Soal ${idx + 1} <span style="font-size: 8.5pt; background-color: #e2e8f0; padding: 1px 6px; border-radius: 3px; font-weight: normal;">[${(q.type || 'PILIHAN GANDA').toUpperCase().replace('_', ' ')}]</span>:
          </div>
          <div style="margin-top: 4px; text-align: justify;">${q.pertanyaan}</div>
          ${pilihanHtml}
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed #cbd5e1; font-size: 9pt;">
            <span style="color: #15803d; font-weight: bold;">Kunci Jawaban: ${Array.isArray(q.jawabanBenar) ? q.jawabanBenar.join(', ') : String(q.jawabanBenar)}</span>
            <div style="color: #475569; font-style: italic; margin-top: 2px;">Pembahasan: ${q.pembahasan}</div>
          </div>
        </div>
      `;
    }).join('');

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1px; color: #1e3a8a; text-transform: uppercase;">
          BANK SOAL EVALUASI PEMBELAJARAN MENDALAM (HOTS)
        </div>
        <div style="font-size: 13pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Fokus Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 20%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Nama Siswa</td>
          <td style="width: 40%; border: 1px solid #000000; padding: 5px 8px;">...............................................................</td>
          <td style="width: 15%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Kelas / No. Absen</td>
          <td style="width: 25%; border: 1px solid #000000; padding: 5px 8px;">${identitas.kelasSemester || '7'} / ..........</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Hari / Tanggal</td>
          <td style="border: 1px solid #000000; padding: 5px 8px;">...............................................................</td>
          <td style="font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Nilai / Skor</td>
          <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; font-size: 12pt;">&nbsp;</td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 8px; text-transform: uppercase;">
        DAFTAR 30 SOAL EVALUASI HOTS BESERTA KUNCI & PEMBAHASAN
      </div>
      ${soalList}
    `;

    const excelData = (module.soalEval || []).map((q, idx) => ({
      No: idx + 1,
      'Tipe Soal': q.type,
      Pertanyaan: q.pertanyaan,
      'Pilihan A': q.pilihan?.[0] || '-',
      'Pilihan B': q.pilihan?.[1] || '-',
      'Pilihan C': q.pilihan?.[2] || '-',
      'Pilihan D': q.pilihan?.[3] || '-',
      'Kunci Jawaban': Array.isArray(q.jawabanBenar) ? q.jawabanBenar.join(', ') : String(q.jawabanBenar),
      Pembahasan: q.pembahasan
    }));

    setPreviewModal({
      isOpen: true,
      title: `Bank Soal Evaluasi 30 HOTS - Modul ${module.nomor}: ${module.judul}`,
      filename: `Bank_Soal_30_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent,
      jsonDataForExcel: {
        sheetName: 'Bank Soal 30',
        data: excelData
      }
    });
  };

  const openLatihanModal = () => {
    const identitas = module.rpp?.identitas || {} as any;
    const htmlContent = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1px; color: #1e3a8a; text-transform: uppercase;">
          LEMBAR KERJA PESERTA DIDIK (LKPD) / JURNAL REFLEKSI MENDALAM
        </div>
        <div style="font-size: 13pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Fokus Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <td style="width: 20%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Nama Lengkap</td>
          <td style="width: 40%; border: 1px solid #000000; padding: 5px 8px;">...............................................................</td>
          <td style="width: 15%; font-weight: bold; background-color: #f8fafc; border: 1px solid #000000; padding: 5px 8px;">Kelas / No. Absen</td>
          <td style="width: 25%; border: 1px solid #000000; padding: 5px 8px;">${identitas.kelasSemester || '7'} / ..........</td>
        </tr>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 6px; text-transform: uppercase;">
        AKTIVITAS REFLEKSI & PENERAPAN NILAI (DEEP LEARNING)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt;">
        <tr>
          <th style="width: 6%; border: 1px solid #000000; padding: 6px; text-align: center;">No</th>
          <th style="width: 34%; border: 1px solid #000000; padding: 6px; text-align: left;">Fokus Pengalaman Belajar</th>
          <th style="border: 1px solid #000000; padding: 6px; text-align: left;">Lembar Jawaban & Refleksi Peserta Didik</th>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 8px;">1</td>
          <td style="font-weight: bold; border: 1px solid #000000; padding: 8px;">
            <b>Memahami:</b><br/>
            Apa wawasan baru terpenting yang Anda dapatkan setelah mempelajari modul bimbingan ini?
          </td>
          <td style="height: 90px; border: 1px solid #000000; padding: 8px; vertical-align: top;">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 8px;">2</td>
          <td style="font-weight: bold; border: 1px solid #000000; padding: 8px;">
            <b>Mengaplikasi:</b><br/>
            Tuliskan 2 rencana aksi nyata yang akan Anda praktikkan di sekolah atau di rumah minggu ini!
          </td>
          <td style="height: 90px; border: 1px solid #000000; padding: 8px; vertical-align: top;">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold; border: 1px solid #000000; padding: 8px;">3</td>
          <td style="font-weight: bold; border: 1px solid #000000; padding: 8px;">
            <b>Merefleksi:</b><br/>
            Bagaimana perasaan Anda dan tantangan apa yang mungkin dihadapi saat menerapkan komitmen tersebut?
          </td>
          <td style="height: 90px; border: 1px solid #000000; padding: 8px; vertical-align: top;">
            &nbsp;
          </td>
        </tr>
      </table>
    `;

    setPreviewModal({
      isOpen: true,
      title: `LKPD Latihan Mandiri - Modul ${module.nomor}: ${module.judul}`,
      filename: `LKPD_Latihan_Mandiri_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent
    });
  };

  const openKuisModal = () => {
    const mendatarRows = (module.kuisTTS?.pertanyaanMendatar || []).map(p => `
      <tr>
        <td style="text-align: center; font-weight: bold; width: 10%; border: 1px solid #000000; padding: 5px;">${p.no}</td>
        <td style="border: 1px solid #000000; padding: 5px;">${p.petunjuk}</td>
        <td style="width: 25%; font-weight: bold; border: 1px solid #000000; padding: 5px; color: #1e3a8a;">${p.jawaban}</td>
      </tr>
    `).join('');

    const menurunRows = (module.kuisTTS?.pertanyaanMenurun || []).map(p => `
      <tr>
        <td style="text-align: center; font-weight: bold; width: 10%; border: 1px solid #000000; padding: 5px;">${p.no}</td>
        <td style="border: 1px solid #000000; padding: 5px;">${p.petunjuk}</td>
        <td style="width: 25%; font-weight: bold; border: 1px solid #000000; padding: 5px; color: #1e3a8a;">${p.jawaban}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
        <div style="font-size: 10pt; font-weight: bold; letter-spacing: 1px; color: #1e3a8a; text-transform: uppercase;">
          LEMBAR KUIS EDUKATIF & TEKA-TEKI SILANG (TTS) BK
        </div>
        <div style="font-size: 13pt; font-weight: bold; color: #000000; margin-top: 4px; text-transform: uppercase;">
          MODUL ${module.nomor}: ${module.judul.toUpperCase()}
        </div>
        <div style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 2px;">
          Fokus Jenjang: ${module.fokusJenjang || `Kelas ${module.kelasTarget?.[0] || '7'} (Fase D)`} • UPT SMP Negeri 7 Pasuruan
        </div>
      </div>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 6px; text-transform: uppercase;">
        PERTANYAAN MENDATAR
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="width: 10%; border: 1px solid #000000; padding: 5px; text-align: center;">No</th>
            <th style="border: 1px solid #000000; padding: 5px; text-align: left;">Petunjuk Pertanyaan</th>
            <th style="width: 25%; border: 1px solid #000000; padding: 5px; text-align: left;">Kunci Jawaban</th>
          </tr>
        </thead>
        <tbody>
          ${mendatarRows || '<tr><td colspan="3" style="text-align: center; padding: 8px;">-</td></tr>'}
        </tbody>
      </table>

      <div class="section-banner" style="background-color: #1e3a8a; color: #ffffff; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; margin-bottom: 6px; text-transform: uppercase;">
        PERTANYAAN MENURUN
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="width: 10%; border: 1px solid #000000; padding: 5px; text-align: center;">No</th>
            <th style="border: 1px solid #000000; padding: 5px; text-align: left;">Petunjuk Pertanyaan</th>
            <th style="width: 25%; border: 1px solid #000000; padding: 5px; text-align: left;">Kunci Jawaban</th>
          </tr>
        </thead>
        <tbody>
          ${menurunRows || '<tr><td colspan="3" style="text-align: center; padding: 8px;">-</td></tr>'}
        </tbody>
      </table>
    `;

    setPreviewModal({
      isOpen: true,
      title: `TTS & Kuis BK - Modul ${module.nomor}: ${module.judul}`,
      filename: `TTS_Kuis_Modul_${module.nomor}_${module.id}`,
      htmlBody: htmlContent
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Banner with Back Button */}
      <div className={`bg-gradient-to-r ${module.warnaAesthetic} rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden`}>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-9xl opacity-10 select-none pointer-events-none">
          {module.emoji}
        </div>
        <div className="relative z-10 space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda / Dashboard</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-4xl p-2 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
              {module.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Modul {module.nomor}
                </span>
                {module.fokusJenjang ? (
                  <span className="text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-sm">
                    {module.fokusJenjang}
                  </span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                    Fase D (SMP)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
                {module.judul}
              </h1>
            </div>
          </div>
          <p className="text-indigo-100 text-sm max-w-3xl leading-relaxed">
            {module.subjudul}
          </p>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: 'rpp', label: 'RPP Mendalam', icon: FileText },
          { id: 'kuisioner', label: 'Kuisioner Diagnostik', icon: HelpCircle },
          { id: 'video', label: 'Video Interaktif', icon: PlayCircle },
          { id: 'materi', label: 'Materi Animasi', icon: BookOpen },
          { id: 'soal', label: 'Contoh Soal (30)', icon: CheckSquare },
          { id: 'latihan', label: 'Latihan Mandiri', icon: Edit3 },
          { id: 'kuis', label: 'Kuis (Ular Tangga & TTS)', icon: Award },
          { id: 'permainan', label: 'Permainan Edukatif', icon: Gamepad2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: RPP MENDALAM (Tabel Lengkap) */}
      {activeSubTab === 'rpp' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Kurikulum Merdeka / Deep Learning</span>
              <h2 className="text-2xl font-black text-slate-900">Rencana Pelaksanaan Pembelajaran Mendalam (RPP) BK</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openRPPModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openRPPModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            {/* 1. Identitas Pembelajaran */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-indigo-900 flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span>1. Identitas Pembelajaran</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Satuan Pendidikan:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.satuanPendidikan}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Mata Pelajaran:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.mataPelajaran}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Kelas / Semester:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.kelasSemester}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Alokasi Waktu:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.waktu}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
                  <span className="text-xs text-slate-500 font-bold block">Materi Pokok Layanan:</span>
                  <span className="font-bold text-indigo-700">{module.rpp.identitas.materiPokok}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Bidang Bimbingan:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.bidangBimbingan}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Model Pembelajaran:</span>
                  <span className="font-bold text-slate-900">{module.rpp.identitas.modelPembelajaran}</span>
                </div>
              </div>
            </div>

            {/* 2. Identifikasi */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-indigo-900 flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span>2. Identifikasi & Profil Pelajar Pancasila (8 Dimensi)</span>
              </h3>
              <div className="space-y-3 pl-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase">Kesiapan Murid:</span>
                  <p className="text-slate-800 font-medium">{module.rpp.identifikasi.kesiapanMurid}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase">Karakteristik Materi Layanan:</span>
                  <p className="text-slate-800 font-medium">{module.rpp.identifikasi.karakteristikMateri}</p>
                </div>
                <div className="space-y-2 pt-2">
                  <span className="text-xs text-slate-600 font-bold uppercase block">8 Dimensi Profil Pelajar Pancasila:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {module.rpp.identifikasi.dimensiPancasila.map((d, i) => (
                      <div key={i} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-0.5">
                        <span className="text-xs font-bold text-indigo-900 block">• {d.dimensi}</span>
                        <span className="text-xs text-slate-600 block">{d.keterangan}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Desain Layanan Klasikal */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-indigo-900 flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span>3. Desain Layanan Klasikal (SKKPD & 4 Kerangka Pembelajaran)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">SKKPD:</span>
                  <span className="font-bold text-slate-900">{module.rpp.desainKlasikal.skkpd}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Topik Kontekstual:</span>
                  <span className="font-bold text-slate-900">{module.rpp.desainKlasikal.topikKontekstual}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-bold block">Lintas Disiplin Ilmu:</span>
                  <span className="font-bold text-slate-900">{module.rpp.desainKlasikal.lintasDisiplin}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
                  <span className="text-xs text-slate-500 font-bold block mb-1">Tujuan Layanan:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-800">
                    {module.rpp.desainKlasikal.tujuanLayanan.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 md:col-span-2 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 uppercase block">4 Kerangka Pembelajaran Mendalam:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div><strong>Praktik Pedagogis:</strong> {module.rpp.desainKlasikal.kerangkaPembelajaran.praktikPedagogis}</div>
                    <div><strong>Kemitraan Pembelajaran:</strong> {module.rpp.desainKlasikal.kerangkaPembelajaran.kemitraanPembelajaran}</div>
                    <div><strong>Lingkungan Pembelajaran:</strong> {module.rpp.desainKlasikal.kerangkaPembelajaran.lingkunganPembelajaran}</div>
                    <div><strong>Pemanfaatan Digital:</strong> {module.rpp.desainKlasikal.kerangkaPembelajaran.pemanfaatanDigital}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.1. Integrasi 7 Jurus BK Hebat */}
            <div className="space-y-4 pt-2">
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg border border-indigo-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider flex items-center space-x-1 shadow">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>7 JURUS BK HEBAT</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Integrasi 7 Jurus BK Hebat dalam Layanan BK</h3>
                    <p className="text-xs font-bold text-amber-300">Strategi Terpadu Bimbingan & Konseling Terintegrasi SMPN 7 Pasuruan</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pl-1">
                {get7JurusForModule(module).map((item, idx) => (
                  <div key={idx} className="p-4 bg-white border-2 border-indigo-200 hover:border-indigo-600 rounded-2xl space-y-2.5 transition-all shadow-sm">
                    <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-2">
                      <span className="px-2.5 py-1 bg-indigo-950 text-amber-300 font-black text-xs rounded-lg shadow-sm">
                        Jurus {item.jurusNo}
                      </span>
                      <span className="text-xs font-black text-slate-950">{item.namaJurus}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-indigo-900 uppercase block tracking-wider">Implementasi Layanan:</span>
                      <p className="text-xs font-bold text-slate-900 leading-relaxed mt-0.5">{item.implementasi}</p>
                    </div>
                    <div className="bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-200">
                      <span className="text-[11px] font-extrabold text-indigo-950 uppercase block">Bentuk / Media Layanan:</span>
                      <span className="text-xs font-bold text-slate-900">{item.mediaBentuk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Pelaksanaan & Pengalaman Belajar */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-indigo-900 flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span>4. Pelaksanaan & Pengalaman Belajar (3 Prinsip & 3 Pengalaman)</span>
              </h3>
              <div className="space-y-3 pl-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-800 block mb-1">🟢 Mindful (Berkesadaran)</span>
                    <p className="text-xs text-slate-700">{module.rpp.pelaksanaan.prinsipPembelajaran.berkesadaran}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-xs font-bold text-blue-800 block mb-1">🔵 Meaningful (Bermakna)</span>
                    <p className="text-xs text-slate-700">{module.rpp.pelaksanaan.prinsipPembelajaran.bermakna}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="text-xs font-bold text-amber-800 block mb-1">🟡 Joyful (Menggembirakan)</span>
                    <p className="text-xs text-slate-700">{module.rpp.pelaksanaan.prinsipPembelajaran.menggembirakan}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-600 uppercase block">3 Pengalaman Belajar:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div><strong>1. Memahami:</strong> {module.rpp.pelaksanaan.pengalamanBelajar.memahami}</div>
                    <div><strong>2. Mengaplikasi:</strong> {module.rpp.pelaksanaan.pengalamanBelajar.mengaplikasi}</div>
                    <div><strong>3. Merefleksi:</strong> {module.rpp.pelaksanaan.pengalamanBelajar.merefleksi}</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 space-y-1">
                  <span className="text-xs font-bold text-indigo-900 uppercase">Project Based Learning (PjBL):</span>
                  <p className="text-slate-800">{module.rpp.pelaksanaan.pjbl}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600 uppercase block">Langkah-Langkah Pembelajaran Mendalam:</span>
                  <div className="space-y-2">
                    {module.rpp.pelaksanaan.langkahLangkah.map((l, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                        <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold">{idx + 1}</span>
                        <div>
                          <strong className="text-xs text-indigo-900 block">{l.tahap}</strong>
                          <span className="text-xs text-slate-700">{l.aktivitas}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Asesmen, Indikator & Tindak Lanjut */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-indigo-900 flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <span>5. Asesmen, Indikator & Rencana Tindak Lanjut</span>
              </h3>
              <div className="space-y-3 pl-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase">Asesmen Pembelajaran Mendalam:</span>
                  <p className="text-slate-800">{module.rpp.asesmenIndikatorTindakLanjut.asesmen}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase">Indikator Keberhasilan:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-800">
                    {module.rpp.asesmenIndikatorTindakLanjut.indikatorKeberhasilan.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase">Rencana Tindak Lanjut:</span>
                  <p className="text-emerald-900 font-medium">{module.rpp.asesmenIndikatorTindakLanjut.rencanaTindakLanjut}</p>
                </div>
              </div>
            </div>

            {/* 6. Pengesahan (Guru BK & Kepala Sekolah) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🏢</span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    6. Pengesahan (Guru BK & Kepala Sekolah)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Guru Bimbingan Konseling */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase">
                        Guru Bimbingan Konseling (Konselor)
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsGuruBkModalOpen(true)}
                        className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl text-xs transition-all flex items-center space-x-1 border border-indigo-200"
                      >
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Pop-up Pilih Guru BK</span>
                      </button>
                    </div>

                    <select
                      value={selectedGuruBkIndex}
                      onChange={(e) => setSelectedGuruBkIndex(Number(e.target.value))}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    >
                      {guruBkList.map((g, idx) => (
                        <option key={idx} value={idx}>
                          {g.nama} (NIP. {g.nip})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Kepala Sekolah */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase block">
                      Kepala SMP Negeri 7 Pasuruan
                    </label>
                    <input
                      type="text"
                      value={kepalaSekolah.nama}
                      onChange={(e) => setKepalaSekolah({ ...kepalaSekolah, nama: e.target.value })}
                      placeholder="Nama Kepala Sekolah..."
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    />
                    <input
                      type="text"
                      value={kepalaSekolah.nip}
                      onChange={(e) => setKepalaSekolah({ ...kepalaSekolah, nip: e.target.value })}
                      placeholder="NIP Kepala Sekolah..."
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 2: KUISIONER / ASESMEN DIAGNOSTIK */}
      {activeSubTab === 'kuisioner' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Asesmen Diagnostik Interaktif</span>
              <h2 className="text-2xl font-black text-slate-900">Kuisioner Penilaian Diri: {module.judul}</h2>
              <p className="text-sm text-slate-500 mt-1">Jawablah pertanyaan di bawah ini dengan jujur sesuai keadaan dirimu saat ini.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openKuisionerModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openKuisionerModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
              <button 
                onClick={openKuisionerModal}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                <span>Unduh Excel (.xlsx)</span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {module.kuisioner.map((q, idx) => (
              <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-start space-x-3">
                  <span className="w-7 h-7 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
                  <span>{q.pertanyaan}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-10">
                  {q.pilihan.map((pil, pIdx) => {
                    const isSelected = kuisionerAnswers[q.id] === pil.skor;
                    return (
                      <button
                        key={pIdx}
                        onClick={() => setKuisionerAnswers(prev => ({ ...prev, [q.id]: pil.skor }))}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <span className="text-2xl">{pil.emoji}</span>
                        <span className="text-xs font-semibold leading-relaxed">{pil.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setKuisionerSubmitted(true)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-lg transition-all"
              >
                Kirim & Analisis Jawaban Kuisioner
              </button>
            </div>

            {kuisionerSubmitted && (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-2 animate-fadeIn">
                <h4 className="font-extrabold text-lg flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Analisis Diagnostik Selesai!</span>
                </h4>
                <p className="text-sm">
                  Terima kasih telah mengisi kuisioner diagnostik ini. Jawabanmu telah direkam untuk membantu Guru BK memberikan pendampingan dan layanan bimbingan yang paling tepat untukmu. Pertahankan semangat belajar positifmu! 🌟
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: VIDEO PEMBELAJARAN INTERAKTIF */}
      {activeSubTab === 'video' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Video Pembelajaran & Cerita Realistis Interaktif</span>
            <h2 className="text-2xl font-black text-slate-900">{module.video.judul}</h2>
            <p className="text-sm text-slate-500 mt-1">Durasi: {module.video.durasi} • Media interaktif animasi story, simulasi kasus, & YouTube embed</p>
          </div>

          <InteractiveVideoPlayer module={module} />
        </div>
      )}

      {/* SUB-TAB 4: MATERI ANIMASI */}
      {activeSubTab === 'materi' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Materi Pembelajaran Elegan</span>
              <h2 className="text-2xl font-black text-slate-900">Poin Utama Materi: {module.judul}</h2>
              <p className="text-sm text-slate-500 mt-1">Disusun dengan animasi kartu interaktif dan visual yang menarik.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openMateriModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openMateriModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {module.materiPoin.map((mat, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl border border-slate-200/80 hover:border-indigo-300 transition-all space-y-4 group">
                <div className="flex items-center space-x-3">
                  <span className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {mat.ikon}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase">Poin 0{idx + 1}</span>
                    <h3 className="text-lg font-bold text-slate-900">{mat.judul}</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {mat.isi}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CONTOH SOAL (30 SOAL) */}
      {activeSubTab === 'soal' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Bank Soal Evaluasi (30 Butir)</span>
              <h2 className="text-2xl font-black text-slate-900">Uji Pemahaman Materi: {module.judul}</h2>
              <p className="text-sm text-slate-500 mt-1">Terdiri dari berbagai bentuk soal: Pilihan Ganda, Pilihan Ganda Kompleks, Benar/Salah, & Studi Kasus.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openSoalModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openSoalModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
              <button 
                onClick={openSoalModal}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                <span>Unduh Excel (.xlsx)</span>
              </button>
            </div>
            {testSubmitted && (
              <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg flex items-center space-x-3">
                <Award className="w-6 h-6 text-amber-300" />
                <div>
                  <div className="text-xs uppercase font-bold text-indigo-200">Nilai Akhir Evaluasi</div>
                  <div className="text-2xl font-black">{score} / 100</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {module.soalEval.map((soal, idx) => (
              <div key={soal.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase">
                    Soal {idx + 1} • {soal.type.replace('_', ' ').toUpperCase()}
                  </span>
                  {testSubmitted && (
                    <span className="text-xs font-bold flex items-center space-x-1">
                      {selectedAnswers[soal.id] === soal.jawabanBenar ? (
                        <span className="text-emerald-600 flex items-center space-x-1"><CheckCircle2 className="w-4 h-4"/><span>Benar</span></span>
                      ) : (
                        <span className="text-rose-600 flex items-center space-x-1"><XCircle className="w-4 h-4"/><span>Kurang Tepat</span></span>
                      )}
                    </span>
                  )}
                </div>

                {soal.studiKasusTeks && (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 italic text-xs text-slate-700 leading-relaxed">
                    "{soal.studiKasusTeks}"
                  </div>
                )}

                <h4 className="text-base font-bold text-slate-900">
                  {soal.pertanyaan}
                </h4>

                {soal.pilihan && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.pilihan.map((pil, pIdx) => {
                      const isSelected = selectedAnswers[soal.id] === pil;
                      return (
                        <button
                          key={pIdx}
                          disabled={testSubmitted}
                          onClick={() => handleAnswerSelect(soal.id, pil)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {pil}
                        </button>
                      );
                    })}
                  </div>
                )}

                {soal.type === 'benar_salah' && (
                  <div className="flex space-x-4">
                    {[true, false].map((val) => {
                      const isSelected = selectedAnswers[soal.id] === val;
                      return (
                        <button
                          key={String(val)}
                          disabled={testSubmitted}
                          onClick={() => handleAnswerSelect(soal.id, val)}
                          className={`px-6 py-3 rounded-xl border text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {val ? 'BENAR' : 'SALAH'}
                        </button>
                      );
                    })}
                  </div>
                )}

                {testSubmitted && (
                  <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-1">
                    <span className="font-bold text-indigo-900">Pembahasan:</span>
                    <p className="text-slate-700">{soal.pembahasan}</p>
                  </div>
                )}
              </div>
            ))}

            {!testSubmitted ? (
              <div className="pt-6 flex justify-end">
                <button
                  onClick={handleTestSubmit}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Selesaikan & Periksa Jawaban</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setTestSubmitted(false)}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all flex items-center space-x-2 text-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Tes Evaluasi</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: LATIHAN MANDIRI */}
      {activeSubTab === 'latihan' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Latihan Mandiri Siswa (LKPD)</span>
              <h2 className="text-2xl font-black text-slate-900">Refleksi & Lembar Kerja Mandiri: {module.judul}</h2>
              <p className="text-sm text-slate-500 mt-1">Tuliskan pemahamanmu dalam bentuk jurnal refleksi singkat.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openLatihanModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openLatihanModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-700 uppercase block">Apa hal paling berharga yang kamu pelajari dari modul {module.judul}?</label>
            <textarea
              rows={5}
              placeholder="Tuliskan refleksimu di sini..."
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium"
            ></textarea>
            <button
              onClick={() => alert('Jurnal refleksi mandiri berhasil disimpan!')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Simpan Jurnal Latihan
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: KUIS (ULAR TANGGA & TTS HOTS) */}
      {activeSubTab === 'kuis' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Kuis Interaktif HOTS</span>
              <h2 className="text-2xl font-black text-slate-900">Ular Tangga & Teka-Teki Silang: {module.judul}</h2>
              <p className="text-sm text-slate-500 mt-1">Mainkan ular tangga edukatif untuk menguji penguasaan materimu.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={openKuisModal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button 
                onClick={openKuisModal}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Unduh Word (.doc)</span>
              </button>
            </div>
          </div>

          {/* Ular Tangga Simulation */}
          <div className="p-6 bg-gradient-to-br from-indigo-900 to-violet-900 rounded-3xl text-white space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
                  Mini Game Ular Tangga HOTS
                </span>
                <h3 className="text-xl font-black mt-2">Posisi Kamu Saat Ini: Kotak {playerPos} dari 30</h3>
              </div>
              <button
                onClick={rollDice}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-lg transition-all flex items-center space-x-2 text-sm"
              >
                <span>🎲 Lempar Dadu</span>
                {diceRoll && <span>(Angka: {diceRoll})</span>}
              </button>
            </div>

            {/* Board grid 30 boxes */}
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((box) => {
                const isCurrent = playerPos === box;
                return (
                  <div
                    key={box}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-900 scale-110 shadow-lg ring-4 ring-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>{box}</span>
                    {isCurrent && <span className="text-lg">🐧</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teka Teki Silang Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Teka-Teki Silang (TTS) HOTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-indigo-900 text-sm">Pertanyaan Mendatar:</h4>
                <ul className="space-y-2 text-xs font-medium text-slate-700">
                  {module.kuisTTS.pertanyaanMendatar.map((m, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="font-bold text-indigo-600">{m.no}.</span>
                      <span>{m.petunjuk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-indigo-900 text-sm">Pertanyaan Menurun:</h4>
                <ul className="space-y-2 text-xs font-medium text-slate-700">
                  {module.kuisTTS.pertanyaanMenurun.map((m, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="font-bold text-indigo-600">{m.no}.</span>
                      <span>{m.petunjuk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: PERMAINAN EDUKATIF */}
      {activeSubTab === 'permainan' && (
        <EducationalGame module={module} onScoreChange={(s) => setGameScore(s)} />
      )}

      {/* Pop-up Modal Pilih Guru BK */}
      {isGuruBkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-indigo-900 text-white p-5 flex items-center justify-between border-b border-indigo-800">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black">Pop-up Pilih / Tambah Guru BK</h3>
              </div>
              <button
                onClick={() => setIsGuruBkModalOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-indigo-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Existing Teachers List */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Pilih Guru Bimbingan Konseling Aktif:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {guruBkList.map((g, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedGuruBkIndex(idx);
                        setIsGuruBkModalOpen(false);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedGuruBkIndex === idx
                          ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{g.nama}</div>
                        <div className="text-xs text-slate-500">NIP. {g.nip}</div>
                      </div>
                      {selectedGuruBkIndex === idx && (
                        <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold">
                          Terpilih
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Tambah Guru BK Baru */}
              <form onSubmit={handleAddGuruBk} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black text-indigo-950 uppercase flex items-center space-x-1">
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tambah Guru BK Baru</span>
                </div>
                <div>
                  <input
                    type="text"
                    value={newGuruBk.nama}
                    onChange={(e) => setNewGuruBk({ ...newGuruBk, nama: e.target.value })}
                    placeholder="Nama Lengkap & Gelar Guru BK..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newGuruBk.nip}
                    onChange={(e) => setNewGuruBk({ ...newGuruBk, nip: e.target.value })}
                    placeholder="NIP Guru BK (opsional)..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan & Pilih Guru BK Ini</span>
                </button>
              </form>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsGuruBkModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print & Export Preview Modal */}
      <PrintPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ ...previewModal, isOpen: false })}
        title={previewModal.title}
        filename={previewModal.filename}
        htmlBody={previewModal.htmlBody}
        jsonDataForExcel={previewModal.jsonDataForExcel}
        guruBkName={guruBkList[selectedGuruBkIndex]?.nama}
        guruBkNip={guruBkList[selectedGuruBkIndex]?.nip}
        kepalaSekolahName={kepalaSekolah.nama}
        kepalaSekolahNip={kepalaSekolah.nip}
      />
    </div>
  );
};
