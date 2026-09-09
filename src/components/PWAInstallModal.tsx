import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Apple, 
  Download, 
  X, 
  CheckCircle2, 
  Share, 
  PlusSquare, 
  Monitor, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isDesktop, install } = usePWAInstall();
  
  // Default tab based on device
  const [activeTab, setActiveTab] = useState<'laptop' | 'android' | 'ios'>(() => {
    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    return 'laptop';
  });

  const [installing, setInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    setInstalling(true);
    const success = await install();
    setInstalling(false);
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-md">
              <img src="/pwa-192x192.png" alt="Icon" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-300 mr-1" />
                PWA Siap Dipasang
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                Install MODUL BK KELAS 7
              </h3>
              <p className="text-xs text-indigo-200">
                Pasang di Laptop dan Handphone untuk akses belajar cepat, tanpa kuota berlebih!
              </p>
            </div>
          </div>

          {/* Quick Benefit Chips */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-[11px] text-indigo-100">
            <div className="flex items-center space-x-1.5 bg-white/5 rounded-xl px-2.5 py-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-semibold truncate">Cepat & Ringan</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/5 rounded-xl px-2.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="font-semibold truncate">Offline Mode</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/5 rounded-xl px-2.5 py-1.5">
              <Monitor className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span className="font-semibold truncate">Layar Penuh</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 p-2 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('laptop')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'laptop'
                ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-4 h-4 text-indigo-600" />
            <span>Laptop / PC</span>
            {isDesktop && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'android'
                ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>HP Android</span>
            {isAndroid && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'ios'
                ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Apple className="w-4 h-4 text-slate-700" />
            <span>iPhone / iPad</span>
            {isIOS && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-700 text-xs sm:text-sm">
          {/* Status Alert if Already Installed */}
          {isInstalled && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-extrabold text-xs sm:text-sm">Aplikasi Sudah Terpasang!</p>
                <p className="text-[11px] text-emerald-700">Anda saat ini sedang membuka aplikasi dalam mode native standalone.</p>
              </div>
            </div>
          )}

          {installSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center space-x-3 shadow-lg">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">Pemasangan Berhasil!</p>
                <p className="text-xs text-emerald-100">Ikon aplikasi telah ditambahkan ke perangkat Anda.</p>
              </div>
            </div>
          )}

          {/* Direct Install Button if Browser Supports beforeinstallprompt */}
          {isInstallable && !isInstalled && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="font-black text-xs text-indigo-900 flex items-center space-x-1.5">
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>Dukungan Instalasi 1-Klik Otomatis</span>
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Browser Anda mendukung pemasangan instan ke sistem operasi.
                </p>
              </div>
              <button
                onClick={handleDirectInstall}
                disabled={installing}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{installing ? 'Memproses...' : 'Pasang Sekarang'}</span>
              </button>
            </div>
          )}

          {/* TAB 1: LAPTOP / PC */}
          {activeTab === 'laptop' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-sm">
                <Laptop className="w-4 h-4 text-indigo-600" />
                <span>Panduan Pemasangan di Laptop / Komputer (Windows, Mac, Linux, Chromebook):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Buka di Browser</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Gunakan browser modern seperti <strong>Google Chrome</strong> atau <strong>Microsoft Edge</strong> di laptop Anda.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Klik Ikon Install</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Perhatikan pojok kanan <strong>Address Bar (kolom URL)</strong>, klik ikon komputer kecil 💻 atau tombol <strong>Pasang / Install</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Siap Digunakan</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Klik <strong>Install</strong>. Aplikasi kini ada di Desktop dan menu Start laptop, bisa dibuka kapan saja layaknya aplikasi native!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start space-x-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tips Tambahan:</strong> Anda juga dapat menekan menu Chrome (ikon titik tiga ⋮ di kanan atas) &gt; pilih <strong>"Simpan dan bagikan"</strong> &gt; <strong>"Pasang halaman sebagai aplikasi..."</strong>.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: HP ANDROID */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-sm">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Panduan Pemasangan di Smartphone Android:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Buka Chrome di HP</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Buka tautan website media pembelajaran ini di browser <strong>Google Chrome</strong> Android.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Pilih Menu Chrome</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Tekan ikon <strong>titik tiga (⋮)</strong> di pojok kanan atas browser Chrome HP Anda.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Pasang ke Layar Utama</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Pilih opsi <strong>"Pasang aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>. Ikon MODUL BK 7 akan otomatis muncul di layar HP.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Setelah terpasang di HP, siswa dan guru dapat belajar dengan tampilan penuh (tanpa bilah browser), sangat ringan dan hemat memori!
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: IPHONE / IPAD */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-sm">
                <Apple className="w-4 h-4 text-slate-900" />
                <span>Panduan Pemasangan di iPhone & iPad (Safari iOS):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Buka di Safari</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Pastikan Anda membuka website menggunakan browser <strong>Safari</strong> di perangkat Apple Anda.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                    <span>Tekan Share</span>
                    <Share className="w-3.5 h-3.5 text-indigo-600 inline" />
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Ketuk tombol <strong>Bagikan / Share</strong> (ikon kotak dengan panah ke atas) di bagian bawah layar Safari.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                    <span>Add to Home Screen</span>
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Gulir ke bawah, pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> lalu tekan <strong>Tambah (Add)</strong> di kanan atas.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-900 flex items-start space-x-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Ikon aplikasi akan tampil langsung di Home Screen iPhone/iPad Anda dan berjalan lancar dalam mode fullscreen.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Aman, tidak memerlukan izin khusus & hemat penyimpanan</span>
          </div>

          <div className="flex items-center space-x-2">
            {isInstallable && !isInstalled && (
              <button
                onClick={handleDirectInstall}
                disabled={installing}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold transition-all shadow-md flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{installing ? 'Memasang...' : 'Install Sekarang'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
