import React, { useState } from 'react';
import { 
  X, Printer, FileText, FileSpreadsheet, Copy, Check, ExternalLink, Sparkles 
} from 'lucide-react';
import { 
  exportToDoc, exportToExcel, printDocumentContent, openInNewTab, generateFullDocumentHtml,
  generateKopSuratHtml, generateSignatureHtml 
} from '../utils/exportUtils';

export interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
  htmlBody: string;
  jsonDataForExcel?: { sheetName: string; data: any[] };
  guruBkName?: string;
  guruBkNip?: string;
  kepalaSekolahName?: string;
  kepalaSekolahNip?: string;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  filename,
  htmlBody,
  jsonDataForExcel,
  guruBkName,
  guruBkNip,
  kepalaSekolahName,
  kepalaSekolahNip
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    printDocumentContent(title, htmlBody, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  };

  const handleDownloadWord = () => {
    exportToDoc(title, htmlBody, filename, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  };

  const handleDownloadExcel = () => {
    if (jsonDataForExcel) {
      exportToExcel(filename, jsonDataForExcel.sheetName, jsonDataForExcel.data);
    }
  };

  const handleOpenNewTab = () => {
    openInNewTab(title, htmlBody, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  };

  const handleCopyText = () => {
    // Convert htmlBody to plain text for easy copying
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlBody;
    const textContent = tempDiv.innerText || tempDiv.textContent || '';
    
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl font-black shadow-md flex items-center space-x-1">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">{title}</h3>
              <p className="text-xs text-amber-300 font-bold">Dokumen Resmi Layanan BK • SMP Negeri 7 Pasuruan</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="bg-indigo-50 border-b border-indigo-100 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-black rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-md hover:scale-105"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-md hover:scale-105"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Unduh Word (.doc)</span>
            </button>

            {jsonDataForExcel && (
              <button
                onClick={handleDownloadExcel}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-md hover:scale-105"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                <span>Unduh Excel (.xlsx)</span>
              </button>
            )}

            <button
              onClick={handleOpenNewTab}
              className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 shadow-sm"
              title="Buka dokumen bersih di tab baru"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Buka Tab Baru</span>
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-1.5 shadow-sm ${
              copied ? 'bg-emerald-600 text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Teks Disalin!' : 'Salin Teks'}</span>
          </button>
        </div>

        {/* Live Document Preview Box */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-300 space-y-6 text-slate-900 text-sm leading-relaxed">
            
            {/* Official Kop Surat Header */}
            <div dangerouslySetInnerHTML={{ __html: generateKopSuratHtml() }} />

            {/* Document Body */}
            <div 
              className="prose max-w-none space-y-4 print-content text-slate-900"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />

            {/* Official Signatures Footer */}
            <div dangerouslySetInnerHTML={{ __html: generateSignatureHtml(undefined, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip) }} />

            <div className="text-center pt-4 text-[11px] text-slate-400 border-t border-slate-200">
              Dokumen Resmi Layanan Bimbingan dan Konseling UPT SMP Negeri 7 Pasuruan • Diunduh dari Sistem Digital BK
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-900 text-slate-400 text-xs p-3 px-6 flex justify-between items-center border-t border-slate-800">
          <span>Tekan tombol <b>Cetak / Simpan PDF</b> atau <b>Unduh Word (.doc)</b> di atas.</span>
          <button 
            onClick={onClose}
            className="text-amber-400 font-bold hover:underline"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
