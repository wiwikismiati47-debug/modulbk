import React from 'react';
import { modulesData } from '../data/modulesData';
import { Sparkles, BookOpen, Users, Award, PlayCircle, ArrowRight, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { PemetaanTugasTable } from './PemetaanTugasTable';

interface BerandaProps {
  onSelectModule: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const Beranda: React.FC<BerandaProps> = ({ onSelectModule, onNavigateTab }) => {
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
            Media Pembelajaran Interaktif <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">MODUL BK KELAS 7</span>
          </h1>

          <p className="text-lg sm:text-xl text-indigo-100 font-normal leading-relaxed">
            Platform bimbingan dan konseling digital terpadu untuk mendampingi masa transisi peserta didik kelas 7 SMP/MTs. Dilengkapi RPP Mendalam, Asesmen Diagnostik, Materi Animasi, 30 Soal Evaluasi, Kuis TTS & Ular Tangga, serta Absensi 8 Rombel (7A s.d 7H).
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
              <span>Dashboard & Kehadiran (8 Rombel)</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Emojis */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-9xl opacity-20 select-none pointer-events-none animate-pulse">
          📚🧠💡
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">8 Topik</div>
            <div className="text-xs font-semibold text-slate-500">Modul BK Kelas 7</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">8 Rombel</div>
            <div className="text-xs font-semibold text-slate-500">Kelas 7A s.d 7H</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">240+ Soal</div>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Daftar Modul Layanan Klasikal BK
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Pilih salah satu modul di bawah ini untuk mengakses RPP Mendalam, Kuisioner, Video, Materi Animasi, dan Evaluasi Lengkap.
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full w-fit">
            Semester Ganjil 2026/2027
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.map((m) => (
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
                    <span className="text-xs font-black tracking-wider uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      Modul {m.nomor}
                    </span>
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
                    <span>RPP & 30 Soal Tersedia</span>
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
