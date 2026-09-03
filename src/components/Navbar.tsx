import React from 'react';
import { Home, LayoutDashboard, Users, BookOpen, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedModuleId: string | null;
  setSelectedModuleId: (id: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedModuleId,
  setSelectedModuleId
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setCurrentTab('beranda'); setSelectedModuleId(null); }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                <img 
                  src="https://iili.io/KDFk4fI.png" 
                  alt="Logo BK" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-ext500 uppercase tracking-widest bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                  SMPN 7 Pasuruan
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-900 via-indigo-700 to-violet-800 bg-clip-text text-transparent tracking-tight">
                MODUL BK KELAS 7
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => { setCurrentTab('beranda'); setSelectedModuleId(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'beranda' && !selectedModuleId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => { setCurrentTab('dashboard'); setSelectedModuleId(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'dashboard' && !selectedModuleId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setCurrentTab('kehadiran'); setSelectedModuleId(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'kehadiran' && !selectedModuleId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Kehadiran Siswa</span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <div className="flex items-center space-x-1 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="text-xs font-bold text-indigo-900">8 Modul Mendalam</span>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => { setCurrentTab('beranda'); setSelectedModuleId(null); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold ${
              currentTab === 'beranda' && !selectedModuleId ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => { setCurrentTab('dashboard'); setSelectedModuleId(null); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold ${
              currentTab === 'dashboard' && !selectedModuleId ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => { setCurrentTab('kehadiran'); setSelectedModuleId(null); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold ${
              currentTab === 'kehadiran' && !selectedModuleId ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Kehadiran Siswa (8 Rombel)</span>
          </button>
        </div>
      )}
    </header>
  );
};
