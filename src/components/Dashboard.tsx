import React from 'react';
import { modulesData } from '../data/modulesData';
import { AttendanceRecord } from '../types';
import { LayoutDashboard, Users, BookOpen, CheckCircle, TrendingUp, Sparkles, Award } from 'lucide-react';

interface DashboardProps {
  attendanceRecords: AttendanceRecord[];
  onSelectModule: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  attendanceRecords,
  onSelectModule,
  onNavigateTab
}) => {
  const rombels = ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8'];

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
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-violet-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-indigo-200">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Guru & Siswa BK</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Ringkasan Aktivitas & Kehadiran Kelas 7
          </h1>
          <p className="text-indigo-200 text-sm max-w-2xl">
            Pantau perkembangan materi bimbingan klasikal, status kehadiran dari 8 rombel (7.1 s.d 7.8), serta pencapaian asesmen diagnostik secara real-time.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('kehadiran')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-lg transition-all flex items-center space-x-2 text-sm"
        >
          <Users className="w-4 h-4" />
          <span>Kelola Kehadiran Rombel</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Modul Aktif</p>
            <h4 className="text-3xl font-black text-slate-900">8 Modul</h4>
            <p className="text-xs text-emerald-600 font-semibold">100% Siap Diakses</p>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            📚
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kehadiran Masuk</p>
            <h4 className="text-3xl font-black text-slate-900">{totalAbsen} Siswa</h4>
            <p className="text-xs text-indigo-600 font-semibold">Dari 8 Rombel Kelas 7</p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            👥
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bank Soal Evaluasi</p>
            <h4 className="text-3xl font-black text-slate-900">240+ Soal</h4>
            <p className="text-xs text-amber-600 font-semibold">Pilihan Ganda, Kompleks, Studi Kasus</p>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            📝
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kuis & Game</p>
            <h4 className="text-3xl font-black text-slate-900">16 Game</h4>
            <p className="text-xs text-rose-600 font-semibold">Ular Tangga & TTS HOTS</p>
          </div>
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            🎮
          </div>
        </div>
      </div>

      {/* Rombel Attendance Summary Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Rekap Kehadiran Siswa per Rombel (8 Kelas)</h3>
            <p className="text-sm text-slate-500">Data kehadiran mandiri yang diisi oleh siswa kelas 7.1 sampai 7.8.</p>
          </div>
          <button
            onClick={() => onNavigateTab('kehadiran')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl transition-colors"
          >
            Buka Buku Absensi Lengkap &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
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
                    <span>Kelas 7.{stat.rombel}</span>
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
  );
};
