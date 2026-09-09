import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-amber-600/95 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white shadow-xl border border-amber-400/40 animate-fadeIn">
      <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Mode Offline Aktif — Modul & materi tersimpan dapat tetap diakses.</span>
    </div>
  );
};
