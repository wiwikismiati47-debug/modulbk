import React, { useState } from 'react';
import { StudentGradeRecord, Student } from '../types';
import {
  FileText,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Printer,
  Download,
  X,
  Calendar,
  Award,
  BookOpen,
  CheckSquare,
  HelpCircle,
  Filter
} from 'lucide-react';

interface StudentGradeTableProps {
  gradeRecords: StudentGradeRecord[];
  studentsList: Student[];
  onAddGrade: (record: StudentGradeRecord) => void;
  onUpdateGrade: (record: StudentGradeRecord) => void;
  onDeleteGrade: (id: string) => void;
}

export const StudentGradeTable: React.FC<StudentGradeTableProps> = ({
  gradeRecords,
  studentsList,
  onAddGrade,
  onUpdateGrade,
  onDeleteGrade
}) => {
  const [selectedKelas, setSelectedKelas] = useState<string>('Semua');
  const [selectedKriteria, setSelectedKriteria] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<StudentGradeRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const rombelList = [
    '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H',
    '8A', '8B', '8C', '8D', '8E', '8F', '8G', '8H',
    '9A', '9B', '9C', '9D', '9E', '9F', '9G', '9H'
  ];
  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Form state
  const [formData, setFormData] = useState({
    hari: 'Senin',
    tanggal: new Date().toISOString().split('T')[0],
    namaSiswa: '',
    kelas: '7A',
    tugas1: '',
    tugas2: '',
    tugasProyek: '',
    kriteriaNilai: 'A' as 'A' | 'B' | 'C',
    catatanGuru: ''
  });

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredGrades = gradeRecords.filter(r => {
    const matchKelas = selectedKelas === 'Semua' || r.kelas === selectedKelas;
    const matchKriteria = selectedKriteria === 'Semua' || r.kriteriaNilai === selectedKriteria;
    const matchSearch =
      r.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tugas1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tugas2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tugasProyek.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKelas && matchKriteria && matchSearch;
  });

  const handleOpenModal = (record?: StudentGradeRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        hari: record.hari,
        tanggal: record.tanggal,
        namaSiswa: record.namaSiswa,
        kelas: record.kelas,
        tugas1: record.tugas1,
        tugas2: record.tugas2,
        tugasProyek: record.tugasProyek,
        kriteriaNilai: record.kriteriaNilai,
        catatanGuru: record.catatanGuru || ''
      });
    } else {
      setEditingRecord(null);
      const defaultStudent = studentsList[0];
      setFormData({
        hari: getDayName(new Date().toISOString().split('T')[0]),
        tanggal: new Date().toISOString().split('T')[0],
        namaSiswa: defaultStudent ? defaultStudent.nama : '',
        kelas: defaultStudent ? defaultStudent.kelas : '7A',
        tugas1: 'Modul 1: Lembar Kerja & Refleksi Mandiri (Skor 90)',
        tugas2: 'Modul 2: Peta Pikiran / Diagram Karakter (Skor 88)',
        tugasProyek: 'Proyek Utama: Video Simulasi / Infografis (Skor 92)',
        kriteriaNilai: 'A',
        catatanGuru: 'Tugas diselesaikan dengan sangat baik dan tepat waktu.'
      });
    }
    setIsModalOpen(true);
  };

  const getDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayIndex = d.getDay();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[dayIndex] || 'Senin';
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const day = getDayName(newDate);
    setFormData(prev => ({
      ...prev,
      tanggal: newDate,
      hari: day !== 'Minggu' ? day : 'Senin'
    }));
  };

  const handleSelectStudentFromDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const found = studentsList.find(s => s.nama === selectedName);
    if (found) {
      setFormData(prev => ({
        ...prev,
        namaSiswa: found.nama,
        kelas: found.kelas
      }));
    } else {
      setFormData(prev => ({ ...prev, namaSiswa: selectedName }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaSiswa.trim()) {
      alert('Mohon isi nama siswa!');
      return;
    }

    if (editingRecord) {
      onUpdateGrade({
        ...editingRecord,
        ...formData
      });
      showNotify(`Nilai tugas siswa "${formData.namaSiswa}" berhasil diperbarui!`);
    } else {
      const newRecord: StudentGradeRecord = {
        id: `G_${Date.now()}`,
        ...formData
      };
      onAddGrade(newRecord);
      showNotify(`Penilaian tugas "${formData.namaSiswa}" berhasil ditambahkan!`);
    }
    setIsModalOpen(false);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (gradeRecords.length === 0) {
      alert('Belum ada data nilai tugas.');
      return;
    }

    const headers = 'Hari,Tanggal,Nama Siswa,Kelas,Tugas 1 (Materi),Tugas 2 (Materi),Tugas Proyek (Materi),Nilai (Kriteria),Catatan Guru\n';
    const rows = gradeRecords.map(r =>
      `"${r.hari}","${r.tanggal}","${r.namaSiswa}","Kelas ${r.kelas}","${r.tugas1}","${r.tugas2}","${r.tugasProyek}","Kriteria ${r.kriteriaNilai}","${r.catatanGuru || '-'}"`
    ).join('\n');

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Daftar_Nilai_Tugas_BK_SMPN7_Pasuruan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotify('Daftar nilai tugas berhasil diexport ke file CSV!');
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Header Title */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Rekapitulasi Penilaian Layanan Bimbingan Konseling</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Daftar Nilai Tugas Layanan BK Kelas 7, 8, 9
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            SMP Negeri 7 Pasuruan • Penilaian Tugas 1, Tugas 2, dan Tugas Proyek Layanan BK Fase D.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold rounded-xl text-xs flex items-center space-x-2 border border-emerald-200 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs flex items-center space-x-2 border border-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak / Print</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Input Nilai Tugas Baru</span>
          </button>
        </div>
      </div>

      {/* Kriteria Penilaian Explanation Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 p-5 rounded-2xl border border-indigo-100 space-y-3">
        <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Panduan Kriteria Penilaian Tugas BK:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/90 rounded-xl border border-emerald-200 space-y-1 shadow-sm">
            <div className="flex items-center space-x-2 font-black text-emerald-800">
              <span className="w-5 h-5 bg-emerald-600 text-white rounded-md flex items-center justify-center text-xs">A</span>
              <span>Kriteria Nilai A</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Tugas dikerjakan <strong>tepat waktu</strong> dan <strong>jawaban benar & reflektif</strong>.
            </p>
          </div>

          <div className="p-3 bg-white/90 rounded-xl border border-amber-200 space-y-1 shadow-sm">
            <div className="flex items-center space-x-2 font-black text-amber-800">
              <span className="w-5 h-5 bg-amber-500 text-white rounded-md flex items-center justify-center text-xs">B</span>
              <span>Kriteria Nilai B</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Tugas dikerjakan <strong>tidak tepat waktu</strong> dan <strong>jawaban ada yang kurang tepat/salah</strong>.
            </p>
          </div>

          <div className="p-3 bg-white/90 rounded-xl border border-slate-200 space-y-1 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 font-black text-slate-700">
              <span className="w-5 h-5 bg-slate-500 text-white rounded-md flex items-center justify-center text-xs">C</span>
              <span>Kriteria Nilai C</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Tugas <strong>belum lengkap</strong> / memerlukan bimbingan remedial khusus Guru BK.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama siswa atau nama materi tugas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="Semua">Filter Kelas: Semua Rombel (7, 8, 9)</option>
            {rombelList.map(r => (
              <option key={r} value={r}>Kelas {r}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedKriteria}
            onChange={(e) => setSelectedKriteria(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="Semua">Filter Nilai: Semua Kriteria</option>
            <option value="A">Kriteria A (Tepat Waktu & Benar)</option>
            <option value="B">Kriteria B (Terlambat / Ada Salah)</option>
            <option value="C">Kriteria C (Perlu Bimbingan)</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4 w-32">Hari & Tanggal</th>
              <th className="py-3.5 px-4 w-44">Nama Siswa & Kelas</th>
              <th className="py-3.5 px-4">Tugas 1 (Materi)</th>
              <th className="py-3.5 px-4">Tugas 2 (Materi)</th>
              <th className="py-3.5 px-4">Tugas Proyek (Materi)</th>
              <th className="py-3.5 px-4 text-center w-28">Nilai Kriteria</th>
              <th className="py-3.5 px-4 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
            {filteredGrades.length > 0 ? (
              filteredGrades.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-indigo-900">{r.hari}</div>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{r.tanggal}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900">{r.namaSiswa}</div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold rounded text-[10px] border border-indigo-100">
                      Kelas {r.kelas}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-indigo-900 block mb-0.5">Tugas 1:</span>
                      {r.tugas1}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-purple-900 block mb-0.5">Tugas 2:</span>
                      {r.tugas2}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="p-2 bg-amber-50/50 rounded-xl border border-amber-200/60 text-[11px] text-slate-700 leading-snug">
                      <span className="font-bold text-amber-900 block mb-0.5">Tugas Proyek:</span>
                      {r.tugasProyek}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {r.kriteriaNilai === 'A' ? (
                      <div className="inline-flex flex-col items-center p-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <span className="w-7 h-7 bg-emerald-600 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-sm">
                          A
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 mt-1">Tepat & Benar</span>
                      </div>
                    ) : r.kriteriaNilai === 'B' ? (
                      <div className="inline-flex flex-col items-center p-2 bg-amber-50 rounded-2xl border border-amber-200">
                        <span className="w-7 h-7 bg-amber-500 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-sm">
                          B
                        </span>
                        <span className="text-[10px] font-bold text-amber-800 mt-1">Terlambat/Salah</span>
                      </div>
                    ) : (
                      <div className="inline-flex flex-col items-center p-2 bg-slate-100 rounded-2xl border border-slate-300">
                        <span className="w-7 h-7 bg-slate-600 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-sm">
                          C
                        </span>
                        <span className="text-[10px] font-bold text-slate-700 mt-1">Perlu Bimbingan</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => handleOpenModal(r)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 rounded-lg transition-colors"
                        title="Edit Nilai Tugas"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus rekap nilai tugas "${r.namaSiswa}"?`)) {
                            onDeleteGrade(r.id);
                            showNotify(`Nilai tugas "${r.namaSiswa}" telah dihapus.`);
                          }
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-lg transition-colors"
                        title="Hapus Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-xs font-semibold">
                  Belum ada rekapitulasi nilai tugas yang sesuai kriteria filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 pt-2 font-semibold">
        <span>Menampilkan {filteredGrades.length} dari total {gradeRecords.length} data nilai tugas</span>
        <span className="text-indigo-600 font-bold">Tim Bimbingan Konseling SMPN 7 Pasuruan</span>
      </div>

      {/* Modal Form Input / Edit Nilai Tugas */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>{editingRecord ? 'Edit Nilai Tugas Layanan BK' : 'Input Nilai Tugas Layanan BK Baru'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Hari & Tanggal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hari</label>
                  <select
                    value={formData.hari}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    {hariList.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal (Kalender)</label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={handleDateChange}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Row 2: Nama Siswa & Kelas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Siswa (Pilih dari Database / Isi Manual)
                  </label>
                  <select
                    value={formData.namaSiswa}
                    onChange={handleSelectStudentFromDropdown}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold focus:outline-none focus:border-indigo-500 mb-1"
                  >
                    <option value="">-- Pilih Siswa dari Database --</option>
                    {studentsList.map(s => (
                      <option key={s.id} value={s.nama}>{s.nama} (Kelas {s.kelas})</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Atau ketik nama siswa manual..."
                    value={formData.namaSiswa}
                    onChange={(e) => setFormData({ ...formData, namaSiswa: e.target.value })}
                    required
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kelas Rombel</label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    {rombelList.map(r => (
                      <option key={r} value={r}>Kelas {r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Tugas 1 (Materi) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tugas 1 (Materi & Nilai) - Isi Manual</label>
                <input
                  type="text"
                  placeholder="Contoh: Modul 1: Jurnal Ibadah Harian & Toleransi (Skor 95)"
                  value={formData.tugas1}
                  onChange={(e) => setFormData({ ...formData, tugas1: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Row 4: Tugas 2 (Materi) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tugas 2 (Materi & Nilai) - Isi Manual</label>
                <input
                  type="text"
                  placeholder="Contoh: Modul 2: Peta Konsep Etika Pergaulan (Skor 90)"
                  value={formData.tugas2}
                  onChange={(e) => setFormData({ ...formData, tugas2: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Row 5: Tugas Proyek (Materi) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tugas Proyek (Materi & Nilai) - Isi Manual</label>
                <input
                  type="text"
                  placeholder="Contoh: Proyek 1: Video Simulasi Sikap Asertif (Skor 94)"
                  value={formData.tugasProyek}
                  onChange={(e) => setFormData({ ...formData, tugasProyek: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Row 6: Kriteria Penilaian Dropdown */}
              <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-2">
                <label className="block text-xs font-extrabold text-indigo-900">
                  Pilih Nilai Kriteria Penilaian:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    onClick={() => setFormData({ ...formData, kriteriaNilai: 'A' })}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start space-x-2 transition-all ${
                      formData.kriteriaNilai === 'A'
                        ? 'bg-emerald-600 text-white border-emerald-700 font-extrabold shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-black">A =</span>
                    <span>Tugas dikerjakan <strong>tepat waktu</strong> dan <strong>jawaban benar</strong>.</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, kriteriaNilai: 'B' })}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start space-x-2 transition-all ${
                      formData.kriteriaNilai === 'B'
                        ? 'bg-amber-500 text-white border-amber-600 font-extrabold shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-black">B =</span>
                    <span>Tugas dikerjakan <strong>tidak tepat waktu</strong> dan <strong>jawaban ada yang salah</strong>.</span>
                  </label>
                </div>
              </div>

              {/* Catatan Guru */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Guru BK (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Catatan perkembangan khusus siswa..."
                  value={formData.catatanGuru}
                  onChange={(e) => setFormData({ ...formData, catatanGuru: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md"
                >
                  {editingRecord ? 'Simpan Perubahan' : 'Simpan Penilaian'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
