import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Beranda } from './components/Beranda';
import { Dashboard } from './components/Dashboard';
import { KehadiranSiswa } from './components/KehadiranSiswa';
import { ModuleDetail } from './components/ModuleDetail';
import { modulesData } from './data/modulesData';
import { AttendanceRecord } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', nama: 'Ahmad Fauzan', rombel: '7.1', status: 'Hadir', waktu: 'Senin, 08:00', catatan: 'Tepat waktu' },
    { id: '2', nama: 'Siti Aisyah', rombel: '7.2', status: 'Hadir', waktu: 'Senin, 08:05', catatan: 'Aktif diskusi' },
    { id: '3', nama: 'Budi Santoso', rombel: '7.3', status: 'Sakit', waktu: 'Selasa, 09:10', catatan: 'Surat dokter terlampir' },
    { id: '4', nama: 'Dewi Lestari', rombel: '7.4', status: 'Hadir', waktu: 'Rabu, 07:50', catatan: 'Sangat antusias' },
    { id: '5', nama: 'Rian Pratama', rombel: '7.5', status: 'Izin', waktu: 'Kamis, 08:15', catatan: 'Acara keluarga' },
    { id: '6', nama: 'Maya Sari', rombel: '7.6', status: 'Hadir', waktu: 'Jumat, 08:00', catatan: 'Hadir lengkap' },
    { id: '7', nama: 'Dimas Anggara', rombel: '7.7', status: 'Hadir', waktu: 'Sabtu, 08:10', catatan: 'Aktif kuis' },
    { id: '8', nama: 'Intan Permata', rombel: '7.8', status: 'Hadir', waktu: 'Sabtu, 08:12', catatan: 'Sangat baik' }
  ]);

  const handleAddAttendance = (record: AttendanceRecord) => {
    setAttendanceRecords(prev => [record, ...prev]);
  };

  const handleDeleteAttendance = (id: string) => {
    setAttendanceRecords(prev => prev.filter(r => r.id !== id));
  };

  const selectedModule = modulesData.find(m => m.id === selectedModuleId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedModuleId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedModuleId={selectedModuleId}
        setSelectedModuleId={setSelectedModuleId}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {selectedModule ? (
          <ModuleDetail
            module={selectedModule}
            onBack={() => {
              setSelectedModuleId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentTab === 'beranda' ? (
          <Beranda
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentTab === 'dashboard' ? (
          <Dashboard
            attendanceRecords={attendanceRecords}
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentTab === 'kehadiran' ? (
          <KehadiranSiswa
            records={attendanceRecords}
            onAddRecord={handleAddAttendance}
            onDeleteRecord={handleDeleteAttendance}
          />
        ) : null}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-indigo-900">MODUL BK KELAS 7</span>
            <span>• Media Pembelajaran Interaktif & Kurikulum Merdeka</span>
          </div>
          <p>© 2026 SMP Negeri 7 Pasuruan. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
