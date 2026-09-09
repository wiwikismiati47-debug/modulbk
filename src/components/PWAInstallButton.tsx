import React, { useState } from 'react';
import { Download, Laptop, Smartphone, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'banner' | 'floating';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'navbar', 
  className = '' 
}) => {
  const { isInstallable, isInstalled, isDesktop, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  // If already running in standalone mode (installed app)
  if (isInstalled) {
    if (variant === 'floating') return null;
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors ${className}`}
          title="Aplikasi Terpasang (Klik untuk info)"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Terpasang</span>
        </button>
        <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  if (variant === 'banner') {
    return (
      <>
        <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-700/50 ${className}`}>
          <div className="flex items-center space-x-3.5 text-left w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shrink-0">
              {isDesktop ? (
                <Laptop className="w-6 h-6 text-amber-300" />
              ) : (
                <Smartphone className="w-6 h-6 text-emerald-300" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-[10px] font-black uppercase text-emerald-200">
                  Dapat Diinstall
                </span>
                <span className="text-[11px] text-indigo-200 font-semibold">
                  {isDesktop ? 'Laptop & Komputer' : 'Handphone (Android/iOS)'}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                Pasang MODUL BK KELAS 7 di Perangkat Anda
              </h4>
              <p className="text-xs text-indigo-200">
                Akses cepat langsung dari layar utama tanpa repot ketik link, hemat kuota dan bisa offline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={handleClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-indigo-900 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>{isDesktop ? 'Install di Laptop' : 'Install di HP'}</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20"
              title="Lihat Petunjuk Lengkap"
            >
              Petunjuk
            </button>
          </div>
        </div>

        <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  // Default navbar button
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black shadow-md shadow-indigo-600/20 active:scale-95 transition-all border border-indigo-400/30 ${className}`}
        title="Pasang aplikasi di Laptop atau Handphone"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {isDesktop ? 'Install di Laptop' : 'Install di HP'}
        </span>
        <span className="sm:hidden">Install</span>
      </button>

      <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
