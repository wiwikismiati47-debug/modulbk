import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Beranda } from './components/Beranda';
import { Dashboard } from './components/Dashboard';
import { KehadiranSiswa } from './components/KehadiranSiswa';
import { ModuleDetail } from './components/ModuleDetail';
import { SupabaseModal } from './components/SupabaseModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallModal } from './components/PWAInstallModal';
import { modulesData } from './data/modulesData';
import { AttendanceRecord, Student, StudentGradeRecord } from './types';
import {
  getInitialAttendanceLocal,
  saveAttendanceLocal,
  getInitialStudentsLocal,
  saveStudentsLocal,
  getInitialGradesLocal,
  saveGradesLocal,
  fetchAttendanceCloud,
  syncAttendanceToCloud,
  deleteAttendanceFromCloud,
  fetchStudentsCloud,
  syncStudentToCloud,
  syncBulkStudentsToCloud,
  deleteStudentFromCloud,
  fetchGradesCloud,
  syncGradeToCloud,
  deleteGradeFromCloud,
  isSupabaseConnected
} from './lib/supabase';
import { Database, Home, LayoutDashboard, Users, Cloud, CloudCheck, Download } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'local'>('idle');

  // Local first state initialization
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(getInitialAttendanceLocal);
  const [students, setStudents] = useState<Student[]>(getInitialStudentsLocal);
  const [gradeRecords, setGradeRecords] = useState<StudentGradeRecord[]>(getInitialGradesLocal);

  // Load Cloud Data if Supabase is connected
  const loadCloudData = async () => {
    if (!isSupabaseConnected()) {
      setSyncStatus('local');
      return;
    }

    setSyncStatus('syncing');
    try {
      const [cloudAttendance, cloudStudents, cloudGrades] = await Promise.all([
        fetchAttendanceCloud(),
        fetchStudentsCloud(),
        fetchGradesCloud()
      ]);

      if (cloudAttendance && cloudAttendance.length > 0) {
        setAttendanceRecords(cloudAttendance);
        saveAttendanceLocal(cloudAttendance);
      }
      if (cloudStudents && cloudStudents.length > 0) {
        setStudents(cloudStudents);
        saveStudentsLocal(cloudStudents);
      }
      if (cloudGrades && cloudGrades.length > 0) {
        setGradeRecords(cloudGrades);
        saveGradesLocal(cloudGrades);
      }
      setSyncStatus('synced');
    } catch (e) {
      console.error('Failed loading cloud data:', e);
      setSyncStatus('local');
    }
  };

  useEffect(() => {
    loadCloudData();
  }, []);

  // Attendance Handlers
  const handleAddAttendance = (record: AttendanceRecord) => {
    const updated = [record, ...attendanceRecords];
    setAttendanceRecords(updated);
    saveAttendanceLocal(updated);
    syncAttendanceToCloud(record);
  };

  const handleDeleteAttendance = (id: string) => {
    const updated = attendanceRecords.filter(r => r.id !== id);
    setAttendanceRecords(updated);
    saveAttendanceLocal(updated);
    deleteAttendanceFromCloud(id);
  };

  // Student Handlers
  const handleAddStudent = (student: Student) => {
    const updated = [student, ...students];
    setStudents(updated);
    saveStudentsLocal(updated);
    syncStudentToCloud(student);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updated);
    saveStudentsLocal(updated);
    syncStudentToCloud(updatedStudent);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    saveStudentsLocal(updated);
    deleteStudentFromCloud(id);
  };

  const handleImportStudents = (newStudents: Student[]) => {
    const updated = [...newStudents, ...students];
    setStudents(updated);
    saveStudentsLocal(updated);
    syncBulkStudentsToCloud(newStudents);
  };

  // Student Grade Handlers
  const handleAddGrade = (record: StudentGradeRecord) => {
    const updated = [record, ...gradeRecords];
    setGradeRecords(updated);
    saveGradesLocal(updated);
    syncGradeToCloud(record);
  };

  const handleUpdateGrade = (updatedRecord: StudentGradeRecord) => {
    const updated = gradeRecords.map(g => g.id === updatedRecord.id ? updatedRecord : g);
    setGradeRecords(updated);
    saveGradesLocal(updated);
    syncGradeToCloud(updatedRecord);
  };

  const handleDeleteGrade = (id: string) => {
    const updated = gradeRecords.filter(g => g.id !== id);
    setGradeRecords(updated);
    saveGradesLocal(updated);
    deleteGradeFromCloud(id);
  };

  const selectedModule = modulesData.find(m => m.id === selectedModuleId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] pb-16 sm:pb-0">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedModuleId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedModuleId={selectedModuleId}
        setSelectedModuleId={setSelectedModuleId}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Cloud Sync Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400">Penyimpanan Otomatis HP & Laptop:</span>
            <span className="text-slate-300 hidden sm:inline">
              {isSupabaseConnected() ? 'Terhubung ke Supabase Cloud (Tersimpan Secara Realtime)' : 'Penyimpanan Perangkat Aktif (Tersimpan di HP & Laptop)'}
            </span>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(true)}
            className="text-[11px] font-bold underline hover:text-white flex items-center space-x-1"
          >
            <Database className="w-3 h-3 text-indigo-400" />
            <span>{isSupabaseConnected() ? 'Pengaturan Cloud' : 'Sambungkan Supabase'}</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pb-16">
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
            students={students}
            gradeRecords={gradeRecords}
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            onImportStudents={handleImportStudents}
            onAddGrade={handleAddGrade}
            onUpdateGrade={handleUpdateGrade}
            onDeleteGrade={handleDeleteGrade}
          />
        ) : currentTab === 'kehadiran' ? (
          <KehadiranSiswa
            records={attendanceRecords}
            onAddRecord={handleAddAttendance}
            onDeleteRecord={handleDeleteAttendance}
          />
        ) : null}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile HP View */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => { setCurrentTab('beranda'); setSelectedModuleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center space-y-1 p-1 ${currentTab === 'beranda' && !selectedModuleId ? 'text-indigo-600 font-extrabold' : 'text-slate-500 font-semibold'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </button>
        <button
          onClick={() => { setCurrentTab('dashboard'); setSelectedModuleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center space-y-1 p-1 ${currentTab === 'dashboard' && !selectedModuleId ? 'text-indigo-600 font-extrabold' : 'text-slate-500 font-semibold'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>
        <button
          onClick={() => { setCurrentTab('kehadiran'); setSelectedModuleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center space-y-1 p-1 ${currentTab === 'kehadiran' && !selectedModuleId ? 'text-indigo-600 font-extrabold' : 'text-slate-500 font-semibold'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Kehadiran</span>
        </button>
        <button
          onClick={() => setIsSupabaseModalOpen(true)}
          className="flex flex-col items-center space-y-1 p-1 text-emerald-600 font-semibold"
        >
          <Database className="w-5 h-5" />
          <span className="text-[10px]">Cloud Data</span>
        </button>
        <button
          onClick={() => setIsInstallModalOpen(true)}
          className="flex flex-col items-center space-y-1 p-1 text-indigo-700 font-semibold"
          title="Pasang di HP / Laptop"
        >
          <Download className="w-5 h-5 text-indigo-600" />
          <span className="text-[10px]">Install</span>
        </button>
      </nav>

      {/* Modal Setup Supabase */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onSyncRefresh={loadCloudData}
      />

      {/* Modal PWA Install Guide */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Offline Status Indicator */}
      <OfflineIndicator />

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2 mb-12 sm:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-indigo-900">MODUL BK KELAS 7</span>
            <span>• Media Pembelajaran Interaktif & Kurikulum Merdeka</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors border border-indigo-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install di Laptop & HP</span>
            </button>
            <p>© 2026 SMP Negeri 7 Pasuruan. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

