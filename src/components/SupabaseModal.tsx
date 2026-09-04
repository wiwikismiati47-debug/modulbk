import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, Copy, Check, RefreshCw, X, Shield, Smartphone, Laptop, Key, ExternalLink } from 'lucide-react';
import { getSupabaseCredentials, saveSupabaseCredentials, clearSupabaseCredentials, isSupabaseConnected, SUPABASE_SQL_SETUP, getSupabaseClient } from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncRefresh?: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose, onSyncRefresh }) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials();
      setUrl(creds.url);
      setAnonKey(creds.anonKey);
      setIsConnected(isSupabaseConnected());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();

    if (!cleanUrl || !cleanKey) {
      setTestResult({ success: false, message: 'Harap isi URL Supabase dan Anon Key.' });
      setTesting(false);
      return;
    }

    // Save and test connection
    saveSupabaseCredentials({ url: cleanUrl, anonKey: cleanKey });

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('attendance_records').select('id').limit(1);
        if (error && !error.message.includes('0 rows')) {
          setTestResult({
            success: false,
            message: `Koneksi berhasil ke URL, tetapi tabel belum siap: ${error.message}. Harap jalankan Skrip SQL di Supabase Editor.`
          });
          setIsConnected(true);
        } else {
          setTestResult({
            success: true,
            message: 'Koneksi Supabase Berhasil! Data tersambung dan akan tersimpan secara otomatis.'
          });
          setIsConnected(true);
          if (onSyncRefresh) onSyncRefresh();
        }
      } catch (err: any) {
        setTestResult({
          success: false,
          message: `Gagal terhubung ke Supabase: ${err?.message || 'Periksa URL & Key'}`
        });
      }
    } else {
      setTestResult({ success: false, message: 'Format URL Supabase tidak valid.' });
    }
    setTesting(false);
  };

  const handleDisconnect = () => {
    clearSupabaseCredentials();
    setUrl('');
    setAnonKey('');
    setIsConnected(false);
    setTestResult({ success: true, message: 'Supabase terputus. Menggunakan penyimpanan lokal HP/Laptop.' });
    if (onSyncRefresh) onSyncRefresh();
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isConnected ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Penyimpanan Otomatis (Supabase Cloud)</h2>
              <p className="text-xs text-slate-500">
                Data sinkron otomatis agar tidak hilang saat ditutup & dibuka di HP / Laptop.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className={`p-4 rounded-2xl flex items-center justify-between border ${isConnected ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
          <div className="flex items-center space-x-3">
            {isConnected ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-amber-600" />}
            <div>
              <div className="font-bold text-sm">
                Status: {isConnected ? 'Terhubung ke Supabase Cloud' : 'Penyimpanan Lokal Aktif (localStorage)'}
              </div>
              <p className="text-xs opacity-80">
                {isConnected 
                  ? 'Input data absen, siswa, dan nilai akan langsung tersimpan di Cloud Supabase.'
                  : 'Data tersimpan di perangkat ini. Sambungkan Supabase URL & Key agar data tersimpan online di HP & Laptop.'
                }
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
            <span>+</span>
            <Laptop className="w-3.5 h-3.5 text-indigo-600" />
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Project URL Supabase
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://xyzxyz.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
              <span>Anon Key / API Key Supabase</span>
              <span className="text-[10px] text-slate-400 font-normal">Aman digunakan di Web / HP</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-start space-x-2 border ${testResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {isConnected ? (
              <button
                type="button"
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold rounded-xl transition-all"
              >
                Putuskan Koneksi Supabase
              </button>
            ) : <div />}

            <div className="flex items-center space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                Tutup
              </button>
              <button
                type="submit"
                disabled={testing}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-2 shadow-md shadow-emerald-600/20"
              >
                {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                <span>Simpan & Tes Koneksi</span>
              </button>
            </div>
          </div>
        </form>

        {/* SQL Setup Instructions */}
        <div className="border-t border-slate-100 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>Skrip Pembuatan Tabel di Supabase (SQL Editor)</span>
            </h4>
            <button
              onClick={handleCopySQL}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin SQL'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Jika ini pertama kali membuat project di <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline inline-flex items-center">Supabase.com <ExternalLink className="w-3 h-3 ml-0.5" /></a>, buka menu <strong>SQL Editor</strong> lalu tempelkan perintah di bawah ini dan tekan <strong>Run</strong>:
          </p>

          <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto max-h-40 border border-slate-800 leading-snug">
            {SUPABASE_SQL_SETUP}
          </pre>
        </div>

      </div>
    </div>
  );
};
