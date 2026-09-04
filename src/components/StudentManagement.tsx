import React, { useState } from 'react';
import { Student } from '../types';
import {
  Users,
  UserPlus,
  Download,
  Upload,
  FileSpreadsheet,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  PlusCircle,
  FileText
} from 'lucide-react';

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onImportStudents: (newStudents: Student[]) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onImportStudents
}) => {
  const [selectedKelas, setSelectedKelas] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nisn: '',
    nama: '',
    kelas: '7A',
    jenisKelamin: 'L' as 'L' | 'P',
    noAbsen: 1
  });

  const rombelList = ['7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H'];

  const filteredStudents = students.filter(s => {
    const matchKelas = selectedKelas === 'Semua' || s.kelas === selectedKelas;
    const matchSearch =
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.kelas.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKelas && matchSearch;
  });

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        nisn: student.nisn,
        nama: student.nama,
        kelas: student.kelas,
        jenisKelamin: student.jenisKelamin,
        noAbsen: student.noAbsen
      });
    } else {
      setEditingStudent(null);
      setFormData({
        nisn: `008${Math.floor(1000000 + Math.random() * 9000000)}`,
        nama: '',
        kelas: selectedKelas !== 'Semua' ? selectedKelas : '7A',
        jenisKelamin: 'L',
        noAbsen: filteredStudents.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      alert('Mohon isi nama siswa!');
      return;
    }

    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,
        ...formData
      });
      showNotify(`Data siswa "${formData.nama}" berhasil diperbarui!`);
    } else {
      const newStudent: Student = {
        id: `S_${Date.now()}`,
        ...formData
      };
      onAddStudent(newStudent);
      showNotify(`Siswa baru "${formData.nama}" berhasil ditambahkan!`);
    }
    setIsModalOpen(false);
  };

  // Download Sample Excel/CSV Template
  const handleDownloadTemplate = () => {
    const templateContent = `NISN,Nama Siswa,Kelas,Jenis Kelamin (L/P),No Absen
0081234599,Budi Pratama,7A,L,1
0081234598,Siti Nurhaliza,7A,P,2
0071234597,Rizky Ananda,8A,L,1
0061234596,Anisa Rahma,9A,P,1`;

    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Template_Data_Siswa_SMPN7_Pasuruan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotify('Template CSV Data Siswa berhasil diunduh!');
  };

  // Export current student list to CSV
  const handleExportCSV = () => {
    if (students.length === 0) {
      alert('Tidak ada data siswa untuk diexport!');
      return;
    }

    const headers = 'NISN,Nama Siswa,Kelas,Jenis Kelamin,No Absen\n';
    const rows = students
      .map(s => `"${s.nisn}","${s.nama}","${s.kelas}","${s.jenisKelamin}",${s.noAbsen}`)
      .join('\n');

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_Siswa_BK_SMPN7_Pasuruan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotify('Export data siswa ke file CSV berhasil!');
  };

  // Import students from uploaded CSV file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        if (lines.length <= 1) {
          alert('File CSV kosong atau format tidak sesuai!');
          return;
        }

        const importedList: Student[] = [];
        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.replace(/^"(.*)"$/, '$1').trim());
          if (cols.length >= 3) {
            importedList.push({
              id: `IMP_${Date.now()}_${i}`,
              nisn: cols[0] || `008${Math.floor(1000000 + Math.random() * 9000000)}`,
              nama: cols[1],
              kelas: cols[2] || '7A',
              jenisKelamin: (cols[3]?.toUpperCase() === 'P' ? 'P' : 'L'),
              noAbsen: parseInt(cols[4]) || (i)
            });
          }
        }

        if (importedList.length > 0) {
          onImportStudents(importedList);
          showNotify(`Berhasil mengimpor ${importedList.length} data siswa baru!`);
        } else {
          alert('Format kolom file CSV tidak terbaca dengan benar.');
        }
      } catch (err) {
        alert('Gagal membaca file CSV. Pastikan format file sesuai template.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset file input
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

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Manajemen Data Siswa Layanan BK</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Database Siswa SMPN 7 Pasuruan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola daftar siswa 8 rombel (7A - 7H), unduh contoh template, serta import/export data.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadTemplate}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs flex items-center space-x-2 transition-colors border border-slate-200"
            title="Unduh Contoh Template CSV Data Siswa"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Download Template CSV</span>
          </button>

          <label className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold rounded-xl text-xs flex items-center space-x-2 cursor-pointer transition-colors border border-emerald-200">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Import CSV/Excel</span>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-extrabold rounded-xl text-xs flex items-center space-x-2 transition-colors border border-blue-200"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Siswa Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama siswa, NISN, atau kelas..."
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
            <option value="Semua">Filter Rombel: Semua Kelas 7 (7A - 7H)</option>
            {rombelList.map(r => (
              <option key={r} value={r}>Kelas {r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4 text-center w-16">Absen</th>
              <th className="py-3.5 px-4">NISN</th>
              <th className="py-3.5 px-4">Nama Siswa</th>
              <th className="py-3.5 px-4">Kelas Rombel</th>
              <th className="py-3.5 px-4 text-center">L/P</th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center font-bold text-slate-500">{s.noAbsen}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-600">{s.nisn}</td>
                  <td className="py-3 px-4 font-extrabold text-indigo-950 flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${s.jenisKelamin === 'L' ? 'bg-blue-500' : 'bg-pink-500'}`}></span>
                    <span>{s.nama}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-extrabold rounded-lg text-[11px] border border-indigo-100">
                      Kelas {s.kelas}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-black text-[10px] ${s.jenisKelamin === 'L' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                      {s.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(s)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 rounded-lg transition-colors"
                        title="Edit Data Siswa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data siswa "${s.nama}"?`)) {
                            onDeleteStudent(s.id);
                            showNotify(`Siswa "${s.nama}" telah dihapus.`);
                          }
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-lg transition-colors"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 text-xs font-semibold">
                  Tidak ditemukan data siswa untuk kriteria pencarian ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 pt-2 font-semibold">
        <span>Menampilkan {filteredStudents.length} dari total {students.length} siswa</span>
        <span className="text-indigo-600 font-bold">SMP Negeri 7 Pasuruan</span>
      </div>

      {/* Modal Add/Edit Student */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>{editingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">NISN / Nomor Induk</label>
                <input
                  type="text"
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rombel Kelas</label>
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">No Absen</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formData.noAbsen}
                  onChange={(e) => setFormData({ ...formData, noAbsen: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
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
                  {editingStudent ? 'Simpan Perubahan' : 'Tambah Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
