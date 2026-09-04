import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AttendanceRecord, Student, StudentGradeRecord } from '../types';
import { initialStudents, initialStudentGrades } from '../data/initialStudentData';

// Local storage keys
const LOCAL_ATTENDANCE_KEY = 'modul_bk_attendance_v1';
const LOCAL_STUDENTS_KEY = 'modul_bk_students_v1';
const LOCAL_GRADES_KEY = 'modul_bk_grades_v1';
const SUPABASE_CONFIG_KEY = 'modul_bk_supabase_credentials';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Get dynamic credentials from localStorage or environment variables
export function getSupabaseCredentials(): SupabaseConfig {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url, anonKey: parsed.anonKey };
      }
    }
  } catch (e) {
    console.error('Failed to parse saved Supabase credentials:', e);
  }

  return { url: envUrl, anonKey: envKey };
}

export function saveSupabaseCredentials(config: SupabaseConfig) {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
    supabaseInstance = null; // Reset instance
  } catch (e) {
    console.error('Failed to save Supabase config:', e);
  }
}

export function clearSupabaseCredentials() {
  try {
    localStorage.removeItem(SUPABASE_CONFIG_KEY);
    supabaseInstance = null;
  } catch (e) {
    console.error('Failed to clear Supabase config:', e);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const creds = getSupabaseCredentials();
  if (creds.url && creds.anonKey) {
    try {
      supabaseInstance = createClient(creds.url, creds.anonKey);
      return supabaseInstance;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      return null;
    }
  }

  return null;
}

export function isSupabaseConnected(): boolean {
  const creds = getSupabaseCredentials();
  return Boolean(creds.url && creds.anonKey);
}

// --- INITIAL LOCAL STORAGE LOADERS ---
const initialAttendanceData: AttendanceRecord[] = [
  { id: '1', nama: 'Ahmad Fauzan', rombel: '7A', status: 'Hadir', waktu: 'Senin, 08:00', catatan: 'Tepat waktu' },
  { id: '2', nama: 'Budi Santoso', rombel: '7B', status: 'Hadir', waktu: 'Senin, 08:05', catatan: 'Aktif diskusi' },
  { id: '3', nama: 'Rian Pratama', rombel: '7C', status: 'Sakit', waktu: 'Selasa, 09:10', catatan: 'Surat dokter terlampir' },
  { id: '4', nama: 'Dimas Anggara', rombel: '7D', status: 'Hadir', waktu: 'Rabu, 07:50', catatan: 'Sangat antusias' },
  { id: '5', nama: 'Intan Permata', rombel: '7E', status: 'Izin', waktu: 'Kamis, 08:15', catatan: 'Acara keluarga' },
  { id: '6', nama: 'Fajar Nugraha', rombel: '7F', status: 'Hadir', waktu: 'Jumat, 08:00', catatan: 'Hadir lengkap' },
  { id: '7', nama: 'Nabila Putri', rombel: '7G', status: 'Hadir', waktu: 'Sabtu, 08:10', catatan: 'Aktif kuis' },
  { id: '8', nama: 'Rizky Ramadhan', rombel: '7H', status: 'Hadir', waktu: 'Sabtu, 08:12', catatan: 'Sangat baik' }
];

export function getInitialAttendanceLocal(): AttendanceRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_ATTENDANCE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(LOCAL_ATTENDANCE_KEY, JSON.stringify(initialAttendanceData));
  return initialAttendanceData;
}

export function saveAttendanceLocal(records: AttendanceRecord[]) {
  try {
    localStorage.setItem(LOCAL_ATTENDANCE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error(e);
  }
}

export function getInitialStudentsLocal(): Student[] {
  try {
    const saved = localStorage.getItem(LOCAL_STUDENTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(initialStudents));
  return initialStudents;
}

export function saveStudentsLocal(students: Student[]) {
  try {
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {
    console.error(e);
  }
}

export function getInitialGradesLocal(): StudentGradeRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_GRADES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(LOCAL_GRADES_KEY, JSON.stringify(initialStudentGrades));
  return initialStudentGrades;
}

export function saveGradesLocal(grades: StudentGradeRecord[]) {
  try {
    localStorage.setItem(LOCAL_GRADES_KEY, JSON.stringify(grades));
  } catch (e) {
    console.error(e);
  }
}

// --- SUPABASE DATA API METHODS ---

// 1. ATTENDANCE
export async function fetchAttendanceCloud(): Promise<AttendanceRecord[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('attendance_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch attendance error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        nama: item.nama,
        rombel: item.rombel,
        status: item.status,
        waktu: item.waktu,
        catatan: item.catatan
      }));
    }
  } catch (e) {
    console.error('Supabase attendance catch error:', e);
  }
  return null;
}

export async function syncAttendanceToCloud(record: AttendanceRecord) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('attendance_records').upsert({
      id: record.id,
      nama: record.nama,
      rombel: record.rombel,
      status: record.status,
      waktu: record.waktu,
      catatan: record.catatan || ''
    });
  } catch (e) {
    console.error('Failed to sync attendance to cloud:', e);
  }
}

export async function deleteAttendanceFromCloud(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('attendance_records').delete().eq('id', id);
  } catch (e) {
    console.error('Failed to delete attendance from cloud:', e);
  }
}

// 2. STUDENTS
export async function fetchStudentsCloud(): Promise<Student[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('no_absen', { ascending: true });

    if (error) {
      console.warn('Supabase fetch students error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        nisn: item.nisn,
        nama: item.nama,
        kelas: item.kelas,
        jenisKelamin: item.jenis_kelamin,
        noAbsen: item.no_absen
      }));
    }
  } catch (e) {
    console.error('Supabase students catch error:', e);
  }
  return null;
}

export async function syncStudentToCloud(student: Student) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('students').upsert({
      id: student.id,
      nisn: student.nisn,
      nama: student.nama,
      kelas: student.kelas,
      jenis_kelamin: student.jenisKelamin,
      no_absen: student.noAbsen
    });
  } catch (e) {
    console.error('Failed to sync student to cloud:', e);
  }
}

export async function syncBulkStudentsToCloud(students: Student[]) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    const records = students.map(s => ({
      id: s.id,
      nisn: s.nisn,
      nama: s.nama,
      kelas: s.kelas,
      jenis_kelamin: s.jenisKelamin,
      no_absen: s.noAbsen
    }));
    await supabase.from('students').upsert(records);
  } catch (e) {
    console.error('Failed to bulk sync students to cloud:', e);
  }
}

export async function deleteStudentFromCloud(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('students').delete().eq('id', id);
  } catch (e) {
    console.error('Failed to delete student from cloud:', e);
  }
}

// 3. GRADES
export async function fetchGradesCloud(): Promise<StudentGradeRecord[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('grade_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch grades error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        hari: item.hari,
        tanggal: item.tanggal,
        namaSiswa: item.nama_siswa,
        kelas: item.kelas,
        tugas1: item.tugas1,
        tugas2: item.tugas2,
        tugasProyek: item.tugas_proyek,
        kriteriaNilai: item.kriteria_nilai,
        catatanGuru: item.catatan_guru
      }));
    }
  } catch (e) {
    console.error('Supabase grades catch error:', e);
  }
  return null;
}

export async function syncGradeToCloud(grade: StudentGradeRecord) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('grade_records').upsert({
      id: grade.id,
      hari: grade.hari,
      tanggal: grade.tanggal,
      nama_siswa: grade.namaSiswa,
      kelas: grade.kelas,
      tugas1: grade.tugas1,
      tugas2: grade.tugas2,
      tugas_proyek: grade.tugasProyek,
      kriteria_nilai: grade.kriteriaNilai,
      catatan_guru: grade.catatanGuru || ''
    });
  } catch (e) {
    console.error('Failed to sync grade to cloud:', e);
  }
}

export async function deleteGradeFromCloud(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.from('grade_records').delete().eq('id', id);
  } catch (e) {
    console.error('Failed to delete grade from cloud:', e);
  }
}

// SQL helper string to display in UI for quick copy
export const SUPABASE_SQL_SETUP = `-- JALANKAN SQL INI DI SUPABASE SQL EDITOR UNTUK SKEMA TABEL KELAS BK

-- 1. Tabel Kehadiran Siswa
create table if not exists attendance_records (
  id text primary key,
  nama text not null,
  rombel text not null,
  status text not null,
  waktu text not null,
  catatan text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Tabel Database Siswa
create table if not exists students (
  id text primary key,
  nisn text,
  nama text not null,
  kelas text not null,
  jenis_kelamin text,
  no_absen integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Tabel Nilai Tugas BK
create table if not exists grade_records (
  id text primary key,
  hari text,
  tanggal text,
  nama_siswa text not null,
  kelas text not null,
  tugas1 text,
  tugas2 text,
  tugas_proyek text,
  kriteria_nilai text,
  catatan_guru text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Mengaktifkan akses Publik (Row Level Security Disable / Enable Policy)
alter table attendance_records disable row level security;
alter table students disable row level security;
alter table grade_records disable row level security;
`;
