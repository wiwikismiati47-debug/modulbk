import React, { useState } from 'react';
import { AttendanceRecord } from '../types';
import { Users, UserPlus, CheckCircle2, Clock, Calendar, Search, Trash2, Filter } from 'lucide-react';

interface KehadiranSiswaProps {
  records: AttendanceRecord[];
  onAddRecord: (record: AttendanceRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const KehadiranSiswa: React.FC<KehadiranSiswaProps> = ({
  records,
  onAddRecord,
  onDeleteRecord
}) => {
  const [nama, setNama] = useState('');
  const [rombel, setRombel] = useState('7.1');
  const [status, setStatus] = useState<'Hadir' | 'Izin' | 'Sakit' | 'Alpa'>('Hadir');
  const [catatan, setCatatan] = useState('');
  const [filterRombel, setFilterRombel] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const rombelList = ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Mohon masukkan nama lengkap siswa.');
      return;
    }

    const newRec: AttendanceRecord = {
      id: Date.now().toString(),
      nama: nama.trim(),
      rombel,
      status,
      waktu: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      catatan: catatan.trim()
    };

    onAddRecord(newRec);
    setNama('');
    setCatatan('');
    alert('Kehadiran berhasil disimpan! Terima kasih.');
  };

  const filteredRecords = records.filter((r) => {
    const matchRombel = filterRombel === 'Semua' || r.rombel === filterRombel;
    const matchName = r.nama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRombel && matchName;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
          <Users className="w-3.5 h-3.5" />
          <span>Sistem Absensi Mandiri Kelas 7</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Kehadiran Siswa (8 Rombel)</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Silakan isi daftar kehadiranmu sesuai dengan kelas (rombel) masing-masing (7.1 sampai 7.8) pada setiap sesi layanan BK.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Input Kehadiran oleh Siswa */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Form Absen Siswa</h3>
              <p className="text-xs text-slate-500">Isi data dirimu dengan benar</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Nama Lengkap Siswa</label>
              <input
                type="text"
                placeholder="Contoh: Muhammad Rizki"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Pilih Rombel / Kelas (7.1 - 7.8)</label>
              <select
                value={rombel}
                onChange={(e) => setRombel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-semibold bg-white"
              >
                {rombelList.map((r) => (
                  <option key={r} value={r}>
                    Kelas 7.{r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Keterangan Kehadiran</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hadir', 'Izin', 'Sakit', 'Alpa'] as const).map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setStatus(st)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      status === st
                        ? st === 'Hadir'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : st === 'Izin'
                          ? 'bg-blue-600 text-white shadow-md'
                          : st === 'Sakit'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Catatan (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Datang tepat waktu / Izin dokter"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Kirim Kehadiran Saya</span>
            </button>
          </form>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Daftar Kehadiran Masuk</h3>
              <p className="text-xs text-slate-500">Total tercatat: {filteredRecords.length} siswa</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-36 sm:w-44"
                />
              </div>

              <select
                value={filterRombel}
                onChange={(e) => setFilterRombel(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Semua">Semua Rombel</option>
                {rombelList.map((r) => (
                  <option key={r} value={r}>
                    Kelas 7.{r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[480px] overflow-y-auto pr-1">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="text-4xl">📭</div>
                <p className="text-slate-500 text-sm font-semibold">Belum ada data kehadiran yang tercatat.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-3 px-4">Nama Siswa</th>
                    <th className="py-3 px-4">Rombel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Waktu</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{rec.nama}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                          Kelas 7.{rec.rombel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            rec.status === 'Hadir'
                              ? 'bg-emerald-100 text-emerald-700'
                              : rec.status === 'Izin'
                              ? 'bg-blue-100 text-blue-700'
                              : rec.status === 'Sakit'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 flex items-center space-x-1 pt-4">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{rec.waktu}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onDeleteRecord(rec.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
