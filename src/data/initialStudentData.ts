import { Student, StudentGradeRecord } from '../types';

export const initialStudents: Student[] = [
  // Kelas 7 (7A - 7H)
  { id: 'S1', nisn: '0081234501', nama: 'Ahmad Fauzan', kelas: '7A', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S2', nisn: '0081234502', nama: 'Siti Aisyah', kelas: '7A', jenisKelamin: 'P', noAbsen: 2 },
  { id: 'S3', nisn: '0081234503', nama: 'Budi Santoso', kelas: '7B', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S4', nisn: '0081234504', nama: 'Dewi Lestari', kelas: '7B', jenisKelamin: 'P', noAbsen: 2 },
  { id: 'S5', nisn: '0081234505', nama: 'Rian Pratama', kelas: '7C', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S6', nisn: '0081234506', nama: 'Maya Sari', kelas: '7C', jenisKelamin: 'P', noAbsen: 2 },
  { id: 'S7', nisn: '0081234507', nama: 'Dimas Anggara', kelas: '7D', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S8', nisn: '0081234508', nama: 'Intan Permata', kelas: '7E', jenisKelamin: 'P', noAbsen: 1 },
  { id: 'S9', nisn: '0081234509', nama: 'Fajar Nugraha', kelas: '7F', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S10', nisn: '0081234510', nama: 'Nabila Putri', kelas: '7G', jenisKelamin: 'P', noAbsen: 1 },
  { id: 'S11', nisn: '0081234511', nama: 'Rizky Ramadhan', kelas: '7H', jenisKelamin: 'L', noAbsen: 1 },
  { id: 'S12', nisn: '0081234512', nama: 'Salma Zahra', kelas: '7H', jenisKelamin: 'P', noAbsen: 2 }
];

export const initialStudentGrades: StudentGradeRecord[] = [
  {
    id: 'G1',
    hari: 'Senin',
    tanggal: '2026-09-01',
    namaSiswa: 'Ahmad Fauzan',
    kelas: '7A',
    tugas1: 'Modul 1: Jurnal Ibadah Harian & Toleransi (Skor 95)',
    tugas2: 'Modul 2: Peta Konsep Etika Pergaulan (Skor 92)',
    tugasProyek: 'Proyek 1: Video Simulasi Sikap Asertif (Skor 96)',
    kriteriaNilai: 'A',
    catatanGuru: 'Tugas dikerjakan sangat tepat waktu dan analisis jawaban sangat tepat.'
  },
  {
    id: 'G2',
    hari: 'Senin',
    tanggal: '2026-09-01',
    namaSiswa: 'Siti Aisyah',
    kelas: '7A',
    tugas1: 'Modul 1: Poster Moderasi Beragama (Skor 88)',
    tugas2: 'Modul 2: Lembar Kerja Anti-Bullying (Skor 85)',
    tugasProyek: 'Proyek 2: Infografis Bahaya Cyberbullying (Skor 90)',
    kriteriaNilai: 'A',
    catatanGuru: 'Tugas diselesaikan sebelum tenggat waktu dengan refleksi mendalam.'
  },
  {
    id: 'G3',
    hari: 'Selasa',
    tanggal: '2026-09-02',
    namaSiswa: 'Budi Santoso',
    kelas: '7B',
    tugas1: 'Modul 3: Log Latihan Pernapasan Relaksasi (Skor 75)',
    tugas2: 'Modul 3: Matriks Regulasi Emosi (Skor 70)',
    tugasProyek: 'Proyek 3: Jurnal Refleksi Pengendalian Stres (Skor 78)',
    kriteriaNilai: 'B',
    catatanGuru: 'Tugas dikerjakan terlambat 2 hari dan terdapat beberapa poin jawaban kurang tepat.'
  },
  {
    id: 'G4',
    hari: 'Selasa',
    tanggal: '2026-09-02',
    namaSiswa: 'Dewi Lestari',
    kelas: '7B',
    tugas1: 'Modul 4: Kuesioner Gaya Belajar Visual/Auditori (Skor 94)',
    tugas2: 'Modul 4: Jadwal Belajar Pomodoro 25 Menit (Skor 90)',
    tugasProyek: 'Proyek 4: Mind Mapping Target Semester (Skor 95)',
    kriteriaNilai: 'A',
    catatanGuru: 'Kreativitas sangat baik dan pengerjaan tepat waktu.'
  },
  {
    id: 'G5',
    hari: 'Rabu',
    tanggal: '2026-09-03',
    namaSiswa: 'Rian Pratama',
    kelas: '7C',
    tugas1: 'Modul 5: Lembar Adaptasi Lingkungan SMP (Skor 78)',
    tugas2: 'Modul 5: Analisis Kasus Pergaulan Inklusif (Skor 72)',
    tugasProyek: 'Proyek 5: Laporan Kelompok Keberagaman (Skor 75)',
    kriteriaNilai: 'B',
    catatanGuru: 'Pengumpulan melebihi tenggat dan analisis tugas 2 perlu disempurnakan.'
  }
];
