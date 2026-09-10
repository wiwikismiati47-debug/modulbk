import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { Sparkles, BookOpen, Users, Award, PlayCircle, ArrowRight, ShieldCheck, HeartPulse, CheckCircle2, Filter } from 'lucide-react';
import { PemetaanTugasTable } from './PemetaanTugasTable';
import { PWAInstallButton } from './PWAInstallButton';

interface BerandaProps {
  onSelectModule: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const Beranda: React.FC<BerandaProps> = ({ onSelectModule, onNavigateTab }) => {
  const [selectedKelasFilter, setSelectedKelasFilter] = useState<'all' | '7' | '8' | '9'>('all');

  const filteredModules = modulesData.filter((m) => {
    if (selectedKelasFilter === 'all') return true;
    return m.kelasTarget?.includes(selectedKelasFilter) ?? true;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.3),transparent_50%)]"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-indigo-200 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Kurikulum Merdeka & Pembelajaran Mendalam (Deep Learning)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Media Pembelajaran Interaktif <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">MODUL BK KELAS 7, 8, 9</span>
          </h1>

          <p className="text-lg sm:text-xl text-indigo-100 font-normal leading-relaxed">
            Platform bimbingan dan konseling digital terpadu untuk mendampingi masa perkembangan peserta didik kelas 7, 8, dan 9 SMP/MTs (Fase D SMPN 7 Pasuruan). Dilengkapi RPP Mendalam, Asesmen Diagnostik, Video Interaktif, Bank Soal Evaluasi HOTS, Kuis TTS & Game Edukasi, serta Dashboard Presensi Terpadu.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onSelectModule(modulesData[0].id)}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl transition-all flex items-center space-x-2"
            >
              <Users className="w-5 h-5 text-indigo-300" />
              <span>Dashboard & Presensi Rombel</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Emojis */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-9xl opacity-20 select-none pointer-events-none animate-pulse">
          📚🧠💡
        </div>
      </section>

      {/* PWA Install Banner for Laptop & Smartphone */}
      <PWAInstallButton variant="banner" />

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{modulesData.length} Modul</div>
            <div className="text-xs font-semibold text-slate-500">Kelas 7, 8 & 9</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">Fase D</div>
            <div className="text-xs font-semibold text-slate-500">Kelas 7, 8, 9 SMP</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">300+ Soal</div>
            <div className="text-xs font-semibold text-slate-500">Evaluasi & Latihan</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">100% Interaktif</div>
            <div className="text-xs font-semibold text-slate-500">Video & Game HOTS</div>
          </div>
        </div>
      </section>

      {/* Pemetaan Tugas Perkembangan Excel Table Section */}
      <PemetaanTugasTable />

      {/* Modules Grid */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Daftar Modul Layanan Klasikal BK
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Pilih modul berdasarkan jenjang kelas atau akses semua modul untuk mempelajari RPP Mendalam, Video, Kuisioner, dan Evaluasi.
            </p>
          </div>

          {/* Grade Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 self-start md:self-auto">
            <div className="flex items-center px-2 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5 mr-1" />
              <span>Filter:</span>
            </div>
            {(
              [
                { key: 'all', label: 'Semua (7, 8, 9)' },
                { key: '7', label: 'Kelas 7' },
                { key: '8', label: 'Kelas 8' },
                { key: '9', label: 'Kelas 9' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedKelasFilter(filter.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedKelasFilter === filter.key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            >
              <div className={`h-3 bg-gradient-to-r ${m.warnaAesthetic}`}></div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {m.emoji}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {m.kelasTarget ? (
                        m.kelasTarget.map((k) => (
                          <span
                            key={k}
                            className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${
                              k === '7'
                                ? 'bg-indigo-100 text-indigo-800'
                                : k === '8'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            Kelas {k}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-black tracking-wider uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          Modul {m.nomor}
                        </span>
                      )}
                      <span className="text-xs font-black tracking-wider uppercase bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg">
                        M{m.nomor}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {m.judul}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {m.deskripsiSingkat}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>RPP, Video & Soal Lengkap</span>
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
