import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { AttendanceRecord, Student, StudentGradeRecord } from '../types';
import { StudentManagement } from './StudentManagement';
import { StudentGradeTable } from './StudentGradeTable';
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  CheckCircle,
  Award,
  Sparkles,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

interface DashboardProps {
  attendanceRecords: AttendanceRecord[];
  students: Student[];
  gradeRecords: StudentGradeRecord[];
  onSelectModule: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onImportStudents: (newStudents: Student[]) => void;
  onAddGrade: (record: StudentGradeRecord) => void;
  onUpdateGrade: (record: StudentGradeRecord) => void;
  onDeleteGrade: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  attendanceRecords,
  students,
  gradeRecords,
  onSelectModule,
  onNavigateTab,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onImportStudents,
  onAddGrade,
  onUpdateGrade,
  onDeleteGrade
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ringkasan' | 'nilai' | 'siswa'>('ringkasan');
  const rombels = ['7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H'];

  // Calculate attendance per rombel
  const rombelStats = rombels.map((r) => {
    const list = attendanceRecords.filter((rec) => rec.rombel === r);
    const hadir = list.filter((l) => l.status === 'Hadir').length;
    const izin = list.filter((l) => l.status === 'Izin').length;
    const sakit = list.filter((l) => l.status === 'Sakit').length;
    const alpa = list.filter((l) => l.status === 'Alpa').length;
    return { rombel: r, total: list.length, hadir, izin, sakit, alpa };
  });

  const totalAbsen = attendanceRecords.length;

  return (
    <div className="space-y-8 pb-16">
      {/* Dashboard Top Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-indigo-200 border border-white/10">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Guru & Layanan BK SMPN 7 Pasuruan</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            Pusat Informasi & Penilaian Layanan BK Kelas 7 (7A - 7H)
          </h1>
          <p className="text-indigo-200 text-sm max-w-2xl leading-relaxed">
            Kelola rekapitulasi nilai tugas (Tugas 1, Tugas 2, Tugas Proyek), manajemen data siswa 8 rombel (7A s.d 7H), dan pantau grafik kehadiran siswa.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('kehadiran')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-lg transition-all flex items-center space-x-2 text-sm shrink-0"
        >
          <Users className="w-4 h-4" />
          <span>Kelola Absensi Rombel</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('ringkasan')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'ringkasan'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-transparent text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Ringkasan & Kehadiran</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nilai')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'nilai'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-transparent text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Daftar Nilai Tugas BK ({gradeRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('siswa')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'siswa'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-transparent text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Manajemen Siswa ({students.length})</span>
        </button>
      </div>

      {/* Sub-Tab Content Rendering */}
      {activeSubTab === 'ringkasan' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Modul Aktif</p>
                <h4 className="text-3xl font-black text-slate-900">8 Modul</h4>
                <p className="text-xs text-emerald-600 font-semibold">100% Siap Layanan</p>
              </div>
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                📚
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Siswa</p>
                <h4 className="text-3xl font-black text-slate-900">{students.length} Siswa</h4>
                <p className="text-xs text-indigo-600 font-semibold">Terdaftar di 8 Rombel (7A - 7H)</p>
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                👥
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tugas Terlayani</p>
                <h4 className="text-3xl font-black text-slate-900">{gradeRecords.length} Penilaian</h4>
                <p className="text-xs text-amber-600 font-semibold">Tugas 1, 2, & Proyek</p>
              </div>
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                📝
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Absensi Input</p>
                <h4 className="text-3xl font-black text-slate-900">{totalAbsen} Record</h4>
                <p className="text-xs text-rose-600 font-semibold">Hadir / Izin / Sakit / Alpa</p>
              </div>
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                📊
              </div>
            </div>
          </div>

          {/* Rombel Attendance Summary Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Rekap Kehadiran Siswa per Rombel (8 Kelas)</h3>
                <p className="text-sm text-slate-500">Data kehadiran mandiri yang diisi oleh siswa kelas 7A sampai 7H.</p>
              </div>
              <button
                onClick={() => onNavigateTab('kehadiran')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"
              >
                Buka Buku Absensi Lengkap &rarr;
              </button>
            </div>

            <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 z-10">
                  <tr className="text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Rombel Kelas</th>
                    <th className="py-3 px-4">Total Input</th>
                    <th className="py-3 px-4 text-emerald-600">Hadir</th>
                    <th className="py-3 px-4 text-blue-600">Izin</th>
                    <th className="py-3 px-4 text-amber-600">Sakit</th>
                    <th className="py-3 px-4 text-rose-600">Alpa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {rombelStats.map((stat) => (
                    <tr key={stat.rombel} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-indigo-900 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        <span>Kelas {stat.rombel}</span>
                      </td>
                      <td className="py-3 px-4">{stat.total} siswa</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">{stat.hadir}</td>
                      <td className="py-3 px-4 font-bold text-blue-600">{stat.izin}</td>
                      <td className="py-3 px-4 font-bold text-amber-600">{stat.sakit}</td>
                      <td className="py-3 px-4 font-bold text-rose-600">{stat.alpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modules Quick List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Status 8 Modul Pembelajaran BK Kelas 7</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modulesData.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      {m.emoji}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {m.nomor}. {m.judul}
                      </h4>
                      <p className="text-xs text-slate-500">RPP Tabel • Kuis • Video • 30 Soal</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-xl shadow-sm">
                    Buka
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Daftar Nilai Tugas BK */}
      {activeSubTab === 'nilai' && (
        <div className="animate-fadeIn">
          <StudentGradeTable
            gradeRecords={gradeRecords}
            studentsList={students}
            onAddGrade={onAddGrade}
            onUpdateGrade={onUpdateGrade}
            onDeleteGrade={onDeleteGrade}
          />
        </div>
      )}

      {/* Sub-Tab 3: Manajemen Siswa */}
      {activeSubTab === 'siswa' && (
        <div className="animate-fadeIn">
          <StudentManagement
            students={students}
            onAddStudent={onAddStudent}
            onUpdateStudent={onUpdateStudent}
            onDeleteStudent={onDeleteStudent}
            onImportStudents={onImportStudents}
          />
        </div>
      )}
    </div>
  );
};
