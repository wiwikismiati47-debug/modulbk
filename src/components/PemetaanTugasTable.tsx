import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, Upload, FileSpreadsheet, Plus, Trash2, Edit2, Save, X, Search, CheckCircle2, Printer, FileText, Users, UserCheck } from 'lucide-react';
import { exportToDoc, exportToTxt, printDocumentContent } from '../utils/exportUtils';
import { PrintPreviewModal } from './PrintPreviewModal';

export interface TugasPerkembanganRow {
  no: number;
  tugasPerkembangan: string;
  bidangLayanan: string;
  rumusanKompetensi: string;
  materiPengembangan: string;
  indikatorKetercapaian: string;
  integrasiJurus: string;
  bentukMedia: string;
}

const initialPemetaanData: TugasPerkembanganRow[] = [
  {
    no: 1,
    tugasPerkembangan: 'Landasan Hidup Religius',
    bidangLayanan: 'Pribadi',
    rumusanKompetensi: 'Mencapai kematangan dalam beriman dan bertakwa kepada Tuhan Yang Maha Esa.',
    materiPengembangan: '• K7: Pengenalan tata cara ibadah & pembentukan akhlak mulia.\n• K8: Toleransi antarumat beragama & pergaulan Islami/santun.\n• K9: Istiqamah dalam ibadah & integritas moral remaja.',
    indikatorKetercapaian: 'Siswa aktif menjalankan ibadah harian dan menunjukkan sikap toleransi serta menghormati perbedaan norma agama di sekolah.',
    integrasiJurus: '• Jurus 1 (Asesmen Kebutuhan/AKPD)\n• Jurus 2 (Bimbingan Klasikal)\n• Jurus 4 (Kolaborasi Guru Agama/Orang Tua)',
    bentukMedia: 'Jurnal Pembiasaan Ibadah, Bimbingan Klasikal, Google Form Asesmen Spiritual'
  },
  {
    no: 2,
    tugasPerkembangan: 'Landasan Perilaku Etis',
    bidangLayanan: 'Pribadi',
    rumusanKompetensi: 'Mencapai kematangan dalam menunjukkan sikap dan perilaku etis dalam kehidupan bermasyarakat.',
    materiPengembangan: '• K7: Etika pergaulan di sekolah baru & pencegahan bullying.\n• K8: Etika berkomunikasi di media sosial & norma kesopanan.\n• K9: Tanggung jawab sosial & penyelesaian konflik pertemanan.',
    indikatorKetercapaian: 'Siswa dapat membedakan perilaku baik/buruk, tidak terlibat perundungan, dan menerapkan etika berkomunikasi yang santun.',
    integrasiJurus: '• Jurus 2 (Bimbingan Klasikal/Kelompok)\n• Jurus 6 (Intervensi Kritis/Layanan Responsif)\n• Jurus 7 (Poster/Kampanye Digital)',
    bentukMedia: 'Role Play / Sosrodrama, Kampanye Anti-Bullying via Canva/Ig, Konseling Kelompok'
  },
  {
    no: 3,
    tugasPerkembangan: 'Kematangan Emosional',
    bidangLayanan: 'Pribadi',
    rumusanKompetensi: 'Mencapai kematangan dalam mengpresikan dan mengendalikan emosi secara sehat.',
    materiPengembangan: '• K7: Mampu mengenali jenis emosi & adaptasi stres sekolah.\n• K8: Regulasi emosi, regulasi stres, & manajemen amarah (anger management).\n• K9: Mengelola kecemasan menghadapi ujian & ketidakpastian masa depan.',
    indikatorKetercapaian: 'Siswa mampu mengendalikan emosi negatif, tidak melakukan tindakan impulsif/agresif, dan memiliki coping stress yang positif.',
    integrasiJurus: '• Jurus 1 (Pemetaan Masalah Emosi)\n• Jurus 3 (Konseling Individual/Kelompok)\n• Jurus 7 (Aplikasi Mood Tracker/Digital)',
    bentukMedia: 'Teknik Relaksasi/Mindfulness, Konseling Individual, Lembar Kerja Refleksi Emosi'
  },
  {
    no: 4,
    tugasPerkembangan: 'Kematangan Intelektual',
    bidangLayanan: 'Belajar',
    rumusanKompetensi: 'Mencapai kematangan dalam mengambil keputusan, memecahkan masalah, dan mengoptimalkan cara belajar.',
    materiPengembangan: '• K7: Pemetaan gaya belajar (Visual/Auditori/Kinestetik) & manajemen waktu.\n• K8: Berpikir kritis, kreativitas, & pencegahan kejenuhan belajar.\n• K9: Strategi belajar efektif menghadapi ujian & pengambilan keputusan karir.',
    indikatorKetercapaian: 'Siswa memahami gaya belajar pribadinya, mampu mengatur waktu belajar mandiri, dan terlatih mengambil keputusan secara rasional.',
    integrasiJurus: '• Jurus 1 (Tes Gaya Belajar)\n• Jurus 2 (Bimbingan Klasikal Belajar)\n• Jurus 5 (Perencanaan Belajar Individual)',
    bentukMedia: 'Tes Online Gaya Belajar, Workshop Time Management, Kartu Keputusan Karir'
  },
  {
    no: 5,
    tugasPerkembangan: 'Kesadaran Tanggung Jawab Sosial',
    bidangLayanan: 'Sosial',
    rumusanKompetensi: 'Mencapai kematangan dalam memerankan diri dan bekerja sama dalam kelompok sosial.',
    materiPengembangan: '• K7: Penyesuaian diri dengan teman sebaya & kerja sama tim.\n• K8: Kepekaan sosial, empati, & komunikasi asertif.\n• K9: Kepemimpinan, kontribusi positif dalam organisasi/ekstrakurikuler.',
    indikatorKetercapaian: 'Siswa menunjukkan sikap empati, aktif berpartisipasi dalam kegiatan kelompok, serta mampu berkomunikasi secara asertif.',
    integrasiJurus: '• Jurus 1 (Sosiometri Hubungan Sebaya)\n• Jurus 2 (Bimbingan Kelompok)\n• Jurus 4 (Kolaborasi Wali Kelas/Masyarakat)',
    bentukMedia: 'Dinamika Kelompok, Analisis Sosiogram, Project Bakti Sosial/Gotong Royong'
  },
  {
    no: 6,
    tugasPerkembangan: 'Kesadaran Gender & Peran Sosial',
    bidangLayanan: 'Sosial',
    rumusanKompetensi: 'Mencapai kematangan dalam menghargai kesetaraan gender dan menjaga kesehatan reproduksi.',
    materiPengembangan: '• K7: Pengenalan perubahan fisik/pubertas & kebersihan diri.\n• K8: Batasan pergaulan lawan jenis, pergaulan sehat, & edukasi seksualitas.\n• K9: Pemahaman peran gender dalam karir dan kehidupan masyarakat.',
    indikatorKetercapaian: 'Siswa memahami perubahan fisik pubertas, menjaga batasan pergaulan lawan jenis, dan terhindar dari perilaku seks bebas.',
    integrasiJurus: '• Jurus 2 (Bimbingan Klasikal)\n• Jurus 4 (Kemitraan dengan Puskesmas/Tenaga Kesehatan)\n• Jurus 6 (Layanan Responsif)',
    bentukMedia: 'Seminar Kesehatan Reproduksi, Video Edukasi Pergaulan Sehat, Diskusi Interaktif'
  },
  {
    no: 7,
    tugasPerkembangan: 'Pengembangan Pribadi & Kemandirian',
    bidangLayanan: 'Pribadi',
    rumusanKompetensi: 'Mencapai kemandirian dalam bertindak dan mengaktualisasikan potensi diri.',
    materiPengembangan: '• K7: Mengenali kelebihan & kekurangan diri (Self-Awareness).\n• K8: Pembentukan rasa percaya diri & kemandirian bertindak.\n• K9: Formulasi konsep diri positif & kesiapan menjadi remaja mandiri.',
    indikatorKetercapaian: 'Siswa memiliki rasa percaya diri yang proporsional, mampu mengambil keputusan pribadi, dan menerima keadaan dirinya secara positif.',
    integrasiJurus: '• Jurus 1 (Asesmen Potensi Diri)\n• Jurus 3 (Konseling Konseling Diri)\n• Jurus 5 (Perencanaan Individual)',
    bentukMedia: 'Lembar Kerja SWAT Diri, Portofolio Prestasi, Konseling Self-Concept'
  },
  {
    no: 8,
    tugasPerkembangan: 'Wawasan & Kesiapan Karir',
    bidangLayanan: 'Karir',
    rumusanKompetensi: 'Mencapai kematangan dalam merencanakan pilihan sekolah lanjutan dan eksplorasi dunia kerja.',
    materiPengembangan: '• K7: Pengenalan beragam profesi & hubungan hobi dengan cita-cita.\n• K8: Pemetaan peminatan ekstrakurikuler & pengenalan dunia kerja.\n• K9: Analisis jalur SMA/SMK/MA, persiapan Tes Bakat Minat, & penetapan sekolah tujuan.',
    indikatorKetercapaian: 'Siswa dapat membedakan karakteristik SMA dan SMK, memahami bakat/minat pribadinya, serta memiliki pilihan sekolah lanjutan yang jelas.',
    integrasiJurus: '• Jurus 1 (Tes Bakat Minat/Psikotes)\n• Jurus 2 (Bimbingan Klasikal Karir)\n• Jurus 4 (Career Day/Expo Sekolah)\n• Jurus 5 (Pohon Karir & Rencana Studi Lanjutan)',
    bentukMedia: 'Pohon Karir Digital, Edu-Expo, Game Mitos vs Fakta SMA/SMK, Konsultasi Orang Tua'
  }
];

export const PemetaanTugasTable: React.FC = () => {
  const [data, setData] = useState<TugasPerkembanganRow[]>(initialPemetaanData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TugasPerkembanganRow | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newRow, setNewRow] = useState<TugasPerkembanganRow>({
    no: data.length + 1,
    tugasPerkembangan: '',
    bidangLayanan: 'Pribadi',
    rumusanKompetensi: '',
    materiPengembangan: '',
    indikatorKetercapaian: '',
    integrasiJurus: '',
    bentukMedia: ''
  });

  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    title: string;
    filename: string;
    htmlBody: string;
    jsonDataForExcel?: { sheetName: string; data: any[] };
  }>({
    isOpen: false,
    title: '',
    filename: '',
    htmlBody: ''
  });

  // Pengesahan (Guru BK & Kepala Sekolah) State
  const [guruBkList, setGuruBkList] = useState([
    { nama: 'WIWIK ISMIATI, S.Pd', nip: '19831116 200904 2 003' },
    { nama: 'EKI FEBRIANI, S.Pd', nip: '19940214 202221 2 014' }
  ]);
  const [selectedGuruBkIndex, setSelectedGuruBkIndex] = useState(0);

  const [kepalaSekolah, setKepalaSekolah] = useState({
    nama: 'NUR FADILAH, S.Pd., M.Pd',
    nip: '19860410 201001 2 030'
  });

  const [isGuruBkModalOpen, setIsGuruBkModalOpen] = useState(false);
  const [newGuruBk, setNewGuruBk] = useState({ nama: '', nip: '' });

  const handleAddGuruBk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuruBk.nama.trim()) return;
    const updated = [...guruBkList, { nama: newGuruBk.nama.trim(), nip: newGuruBk.nip.trim() || '-' }];
    setGuruBkList(updated);
    setSelectedGuruBkIndex(updated.length - 1);
    setNewGuruBk({ nama: '', nip: '' });
    setIsGuruBkModalOpen(false);
  };

  const getPemetaanHtml = () => {
    let rowsHtml = data.map(item => `
      <tr>
        <td><b>${item.no}</b></td>
        <td><b>${item.tugasPerkembangan}</b></td>
        <td><span class="badge">${item.bidangLayanan}</span></td>
        <td>${item.rumusanKompetensi}</td>
        <td>${item.materiPengembangan.replace(/\n/g, '<br/>')}</td>
        <td>${item.indikatorKetercapaian}</td>
        <td>${item.integrasiJurus.replace(/\n/g, '<br/>')}</td>
        <td>${item.bentukMedia}</td>
      </tr>
    `).join('');

    return `
      <h2>PEMETAAN TUGAS PERKEMBANGAN (SKKPD), RUMUSAN KOMPETENSI, MATERI & INDIKATOR BK</h2>
      <p><b>Sekolah:</b> SMP Negeri 7 Pasuruan | <b>Integrasi:</b> 7 Jurus BK Hebat & Kurikulum Merdeka</p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tugas Perkembangan (SKKPD)</th>
            <th>Bidang</th>
            <th>Rumusan Kompetensi</th>
            <th>Materi Pengembangan (K7, K8, K9)</th>
            <th>Indikator Ketercapaian BK</th>
            <th>Integrasi 7 Jurus BK Hebat</th>
            <th>Bentuk / Media Layanan</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  };

  const openPemetaanModal = () => {
    const excelData = data.map(item => ({
      No: item.no,
      'Tugas Perkembangan (SKKPD)': item.tugasPerkembangan,
      'Bidang Layanan': item.bidangLayanan,
      'Rumusan Kompetensi (Standar Kemandirian)': item.rumusanKompetensi,
      'Materi Pengembangan (Kelas 7, 8, 9)': item.materiPengembangan,
      'Indikator Ketercapaian BK': item.indikatorKetercapaian,
      'Integrasi 7 Jurus BK Hebat': item.integrasiJurus,
      'Bentuk / Media Layanan': item.bentukMedia
    }));

    setPreviewModal({
      isOpen: true,
      title: 'Pemetaan Tugas Perkembangan (SKKPD) BK SMPN 7 Pasuruan',
      filename: 'Pemetaan_Tugas_Perkembangan_SKKPD_BK',
      htmlBody: getPemetaanHtml(),
      jsonDataForExcel: {
        sheetName: 'Pemetaan SKKPD',
        data: excelData
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json<any>(ws);

        const formattedData: TugasPerkembanganRow[] = rawData.map((row, idx) => ({
          no: row.No || idx + 1,
          tugasPerkembangan: row['Tugas Perkembangan (SKKPD)'] || row['tugasPerkembangan'] || '',
          bidangLayanan: row['Bidang Layanan'] || row['bidangLayanan'] || 'Pribadi',
          rumusanKompetensi: row['Rumusan Kompetensi (Standar Kemandirian)'] || row['rumusanKompetensi'] || '',
          materiPengembangan: row['Materi Pengembangan (Kelas 7, 8, 9)'] || row['materiPengembangan'] || '',
          indikatorKetercapaian: row['Indikator Ketercapaian BK'] || row['indikatorKetercapaian'] || '',
          integrasiJurus: row['Integrasi 7 Jurus BK Hebat'] || row['integrasiJurus'] || '',
          bentukMedia: row['Bentuk / Media Layanan'] || row['bentukMedia'] || ''
        }));

        if (formattedData.length > 0) {
          setData(formattedData);
          alert('Berhasil mengimpor data Pemetaan Tugas Perkembangan dari Excel!');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file Excel. Pastikan format sesuai template.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...data[index] });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editForm) {
      const updated = [...data];
      updated[editingIndex] = editForm;
      setData(updated);
      setEditingIndex(null);
      setEditForm(null);
    }
  };

  const handleDelete = (index: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus baris pemetaan ini?')) {
      const updated = data.filter((_, i) => i !== index);
      setData(updated);
    }
  };

  const handleAddRow = () => {
    if (!newRow.tugasPerkembangan) {
      alert('Nama Tugas Perkembangan harus diisi!');
      return;
    }
    setData([...data, { ...newRow, no: data.length + 1 }]);
    setNewRow({
      no: data.length + 2,
      tugasPerkembangan: '',
      bidangLayanan: 'Pribadi',
      rumusanKompetensi: '',
      materiPengembangan: '',
      indikatorKetercapaian: '',
      integrasiJurus: '',
      bentukMedia: ''
    });
    setIsAdding(false);
  };

  const filteredData = data.filter(item => 
    item.tugasPerkembangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bidangLayanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rumusanKompetensi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.materiPengembangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Kurikulum Merdeka & 7 Jurus BK Hebat</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Pemetaan Tugas Perkembangan, Rumusan Kompetensi, Materi & Indikator BK
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Matriks SKKPD SMP Negeri 7 Pasuruan lengkap dengan integrasi 7 Jurus BK Hebat dan bentuk layanan. Dapat diunduh atau diimpor via Excel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={openPemetaanModal}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-sm hover:scale-105"
            title="Cetak atau Simpan PDF"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Cetak / Simpan PDF</span>
          </button>

          <button
            onClick={openPemetaanModal}
            className="px-3.5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-sm hover:scale-105"
            title="Unduh sebagai dokumen Word"
          >
            <FileText className="w-4 h-4 text-blue-200" />
            <span>Unduh Word (.doc)</span>
          </button>

          <button
            onClick={openPemetaanModal}
            className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-sm hover:scale-105"
            title="Download sebagai Excel"
          >
            <Download className="w-4 h-4" />
            <span>Download Excel</span>
          </button>

          <label className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer shadow-sm">
            <Upload className="w-4 h-4" />
            <span>Import Excel</span>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 max-w-md">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Cari tugas perkembangan, bidang, atau materi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-sm text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Add New Row Inline Form */}
      {isAdding && (
        <div className="bg-indigo-50/60 border-2 border-indigo-200 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-indigo-900 text-base">Tambah Tugas Perkembangan Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tugas Perkembangan (SKKPD)</label>
              <input
                type="text"
                value={newRow.tugasPerkembangan}
                onChange={e => setNewRow({...newRow, tugasPerkembangan: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm"
                placeholder="Contoh: Kematangan Karier"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bidang Layanan</label>
              <select
                value={newRow.bidangLayanan}
                onChange={e => setNewRow({...newRow, bidangLayanan: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm"
              >
                <option value="Pribadi">Pribadi</option>
                <option value="Sosial">Sosial</option>
                <option value="Belajar">Belajar</option>
                <option value="Karir">Karir</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Rumusan Kompetensi</label>
              <input
                type="text"
                value={newRow.rumusanKompetensi}
                onChange={e => setNewRow({...newRow, rumusanKompetensi: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm"
                placeholder="Standar Kemandirian..."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Materi Pengembangan (K7, K8, K9)</label>
              <textarea
                value={newRow.materiPengembangan}
                onChange={e => setNewRow({...newRow, materiPengembangan: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm h-20"
                placeholder="• K7: ...&#10;• K8: ...&#10;• K9: ..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Indikator Ketercapaian BK</label>
              <textarea
                value={newRow.indikatorKetercapaian}
                onChange={e => setNewRow({...newRow, indikatorKetercapaian: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm h-20"
                placeholder="Indikator siswa..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Integrasi 7 Jurus & Bentuk Media</label>
              <textarea
                value={newRow.bentukMedia}
                onChange={e => setNewRow({...newRow, bentukMedia: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm h-20"
                placeholder="Media layanan..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm"
            >
              Batal
            </button>
            <button
              onClick={handleAddRow}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm"
            >
              Simpan Baris
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-slate-950 text-white text-xs sm:text-sm uppercase tracking-wider font-black">
              <th className="p-4 text-center w-12 border-r border-slate-800">No</th>
              <th className="p-4 border-r border-slate-800">Tugas Perkembangan (SKKPD)</th>
              <th className="p-4 w-28 border-r border-slate-800">Bidang</th>
              <th className="p-4 border-r border-slate-800">Rumusan Kompetensi (Standar Kemandirian)</th>
              <th className="p-4 border-r border-slate-800">Materi Pengembangan (Kelas 7, 8, 9)</th>
              <th className="p-4 border-r border-slate-800">Indikator Ketercapaian BK</th>
              <th className="p-4 border-r border-slate-800">Integrasi 7 Jurus BK Hebat</th>
              <th className="p-4 border-r border-slate-800">Bentuk / Media Layanan</th>
              <th className="p-4 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-200 text-sm">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                {editingIndex === index && editForm ? (
                  /* Edit Mode */
                  <>
                    <td className="p-4 text-center font-bold">{editForm.no}</td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={editForm.tugasPerkembangan}
                        onChange={e => setEditForm({...editForm, tugasPerkembangan: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm"
                      />
                    </td>
                    <td className="p-4">
                      <select
                        value={editForm.bidangLayanan}
                        onChange={e => setEditForm({...editForm, bidangLayanan: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm"
                      >
                        <option value="Pribadi">Pribadi</option>
                        <option value="Sosial">Sosial</option>
                        <option value="Belajar">Belajar</option>
                        <option value="Karir">Karir</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <textarea
                        value={editForm.rumusanKompetensi}
                        onChange={e => setEditForm({...editForm, rumusanKompetensi: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm h-20"
                      />
                    </td>
                    <td className="p-4">
                      <textarea
                        value={editForm.materiPengembangan}
                        onChange={e => setEditForm({...editForm, materiPengembangan: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm h-20"
                      />
                    </td>
                    <td className="p-4">
                      <textarea
                        value={editForm.indikatorKetercapaian}
                        onChange={e => setEditForm({...editForm, indikatorKetercapaian: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm h-20"
                      />
                    </td>
                    <td className="p-4">
                      <textarea
                        value={editForm.integrasiJurus}
                        onChange={e => setEditForm({...editForm, integrasiJurus: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm h-20"
                      />
                    </td>
                    <td className="p-4">
                      <textarea
                        value={editForm.bentukMedia}
                        onChange={e => setEditForm({...editForm, bentukMedia: e.target.value})}
                        className="w-full border border-indigo-300 rounded-lg p-1.5 text-sm h-20"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                          title="Simpan"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="p-1.5 bg-slate-400 text-white rounded-lg hover:bg-slate-500"
                          title="Batal"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  /* Display Mode */
                  <>
                    <td className="p-4 text-center font-extrabold text-slate-900 text-sm">{item.no}</td>
                    <td className="p-4 font-bold text-slate-950 text-sm leading-snug">{item.tugasPerkembangan}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${
                        item.bidangLayanan === 'Pribadi' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                        item.bidangLayanan === 'Sosial' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                        item.bidangLayanan === 'Belajar' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                        'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {item.bidangLayanan}
                      </span>
                    </td>
                    <td className="p-4 text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">{item.rumusanKompetensi}</td>
                    <td className="p-4 text-slate-900 text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans">{item.materiPengembangan}</td>
                    <td className="p-4 text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">{item.indikatorKetercapaian}</td>
                    <td className="p-4 text-indigo-950 text-xs sm:text-sm whitespace-pre-line leading-relaxed font-semibold">{item.integrasiJurus}</td>
                    <td className="p-4 text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">{item.bentukMedia}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => handleStartEdit(index)}
                          className="p-2 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors font-bold"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors font-bold"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. Pengesahan (Guru BK & Kepala Sekolah) Section */}
      <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🏢</span>
          <h3 className="text-base font-extrabold text-slate-900">
            Pengesahan Dokumen Pemetaan (Guru BK & Kepala Sekolah)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guru Bimbingan Konseling */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Guru Bimbingan Konseling (Konselor)
              </label>
              <button
                type="button"
                onClick={() => setIsGuruBkModalOpen(true)}
                className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl text-xs transition-all flex items-center space-x-1 border border-indigo-200"
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Pop-up Pilih Guru BK</span>
              </button>
            </div>

            <select
              value={selectedGuruBkIndex}
              onChange={(e) => setSelectedGuruBkIndex(Number(e.target.value))}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            >
              {guruBkList.map((g, idx) => (
                <option key={idx} value={idx}>
                  {g.nama} (NIP. {g.nip})
                </option>
              ))}
            </select>
          </div>

          {/* Kepala Sekolah */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase block">
              Kepala SMP Negeri 7 Pasuruan
            </label>
            <input
              type="text"
              value={kepalaSekolah.nama}
              onChange={(e) => setKepalaSekolah({ ...kepalaSekolah, nama: e.target.value })}
              placeholder="Nama Kepala Sekolah..."
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
            <input
              type="text"
              value={kepalaSekolah.nip}
              onChange={(e) => setKepalaSekolah({ ...kepalaSekolah, nip: e.target.value })}
              placeholder="NIP Kepala Sekolah..."
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Pop-up Modal Pilih Guru BK */}
      {isGuruBkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-indigo-900 text-white p-5 flex items-center justify-between border-b border-indigo-800">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black">Pop-up Pilih / Tambah Guru BK</h3>
              </div>
              <button
                onClick={() => setIsGuruBkModalOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-indigo-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Existing Teachers List */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Pilih Guru Bimbingan Konseling Aktif:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {guruBkList.map((g, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedGuruBkIndex(idx);
                        setIsGuruBkModalOpen(false);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedGuruBkIndex === idx
                          ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{g.nama}</div>
                        <div className="text-xs text-slate-500">NIP. {g.nip}</div>
                      </div>
                      {selectedGuruBkIndex === idx && (
                        <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold">
                          Terpilih
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Tambah Guru BK Baru */}
              <form onSubmit={handleAddGuruBk} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black text-indigo-950 uppercase flex items-center space-x-1">
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tambah Guru BK Baru</span>
                </div>
                <div>
                  <input
                    type="text"
                    value={newGuruBk.nama}
                    onChange={(e) => setNewGuruBk({ ...newGuruBk, nama: e.target.value })}
                    placeholder="Nama Lengkap & Gelar Guru BK..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newGuruBk.nip}
                    onChange={(e) => setNewGuruBk({ ...newGuruBk, nip: e.target.value })}
                    placeholder="NIP Guru BK (opsional)..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan & Pilih Guru BK Ini</span>
                </button>
              </form>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsGuruBkModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview & Export Modal */}
      <PrintPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ ...previewModal, isOpen: false })}
        title={previewModal.title}
        filename={previewModal.filename}
        htmlBody={previewModal.htmlBody}
        jsonDataForExcel={previewModal.jsonDataForExcel}
        guruBkName={guruBkList[selectedGuruBkIndex]?.nama}
        guruBkNip={guruBkList[selectedGuruBkIndex]?.nip}
        kepalaSekolahName={kepalaSekolah.nama}
        kepalaSekolahNip={kepalaSekolah.nip}
      />
    </div>
  );
};
