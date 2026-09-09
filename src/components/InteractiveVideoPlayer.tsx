import React, { useState, useEffect, useRef } from 'react';
import { ModuleContent } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Tv,
  Film,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Award,
  ChevronRight,
  Info,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface InteractiveVideoPlayerProps {
  module: ModuleContent;
}

// Helper to extract 11-char YouTube ID from any format
const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

interface SceneData {
  id: number;
  judulAdegan: string;
  waktuStart: number; // in seconds
  narasi: string;
  karakter: string;
  dialog: string;
  latar: string;
  bgGradient: string;
  pilihanInteraktif?: {
    pertanyaan: string;
    opsi: { teks: string; dampak: string; isTerpuji: boolean }[];
  };
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({ module }) => {
  const [activeTab, setActiveTab] = useState<'animasi' | 'youtube'>('animasi');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration] = useState<number>(285); // 4m 45s = 285s
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeDecision, setActiveDecision] = useState<SceneData['pilihanInteraktif'] | null>(null);
  const [decisionOutcome, setDecisionOutcome] = useState<{ dampak: string; isTerpuji: boolean } | null>(null);
  const [completedDecisions, setCompletedDecisions] = useState<Record<number, string>>({});

  // YouTube link state
  const defaultYoutubeUrl = module.video.youtubeUrl || (module.video.youtubeId ? `https://youtu.be/${module.video.youtubeId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(`Bimbingan Konseling SMP ${module.judul}`)}`);

  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState<string>(defaultYoutubeUrl);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    setCurrentYoutubeUrl(defaultYoutubeUrl);
  }, [module.id, defaultYoutubeUrl]);

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentYoutubeUrl);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const getEmbedUrlFromUrl = (url: string) => {
    const extractedId = extractYoutubeId(url);
    if (extractedId) {
      return `https://www.youtube-nocookie.com/embed/${extractedId}?autoplay=1&rel=0`;
    }
    if (url.includes('youtube-nocookie.com/embed/') || url.includes('youtube.com/embed/')) {
      return url;
    }
    const query = encodeURIComponent(`Bimbingan Konseling SMP ${module.judul}`);
    return `https://www.youtube-nocookie.com/embed?listType=search&list=${query}`;
  };

  const getYoutubeEmbedUrl = () => {
    return getEmbedUrlFromUrl(currentYoutubeUrl);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate fallback scenes if not specified in module
  const getDefaultScenes = (): SceneData[] => {
    if (module.video.adegan && module.video.adegan.length > 0) {
      return module.video.adegan.map((ad, idx) => ({
        ...ad,
        bgGradient: idx % 2 === 0 ? 'from-indigo-950 via-slate-900 to-indigo-900' : 'from-slate-950 via-purple-950 to-indigo-950'
      }));
    }

    // Default rich scenes tailored to each module's ceritaRealistis
    return [
      {
        id: 1,
        judulAdegan: 'Adegan 1: Pengenalan Skenario Realistis',
        waktuStart: 0,
        narasi: `Kisah bermula di lingkungan SMPN 7 Pasuruan. ${module.video.ceritaRealistis.slice(0, 150)}...`,
        karakter: 'Siswa & Guru BK',
        dialog: '"Suatu hari di sekolah, tantangan kehidupan remaja mulai menghampiri..."',
        latar: 'Lingkungan SMPN 7 Pasuruan',
        bgGradient: 'from-slate-950 via-indigo-950 to-slate-900'
      },
      {
        id: 2,
        judulAdegan: 'Adegan 2: Konflik & Dilema Remaja',
        waktuStart: 70,
        narasi: module.video.ceritaRealistis.slice(150, 320) || 'Dalam situasi sosial dan akademik, muncul dilema yang memerlukan pemikiran jernih...',
        karakter: 'Siswa Utama',
        dialog: '"Apa yang sebaiknya saya lakukan dalam kondisi seperti ini?"',
        latar: 'Ruang Kelas & Kantin Sekolah',
        bgGradient: 'from-indigo-950 via-purple-950 to-slate-900',
        pilihanInteraktif: {
          pertanyaan: `Langkah terbaik apa yang sesuai dengan prinsip ${module.judul}?`,
          opsi: [
            {
              teks: 'Mengambil sikap asertif, tenang, dan menerapkan bimbingan moral BK',
              dampak: 'Langkah tepat! Masalah terselesaikan dengan damai dan karakter diri semakin tangguh.',
              isTerpuji: true
            },
            {
              teks: 'Mengikuti emosi sesaat atau ajaran tanpa pertimbangan matang',
              dampak: 'Tindakan ini memicu konflik lebih lanjut dan merugikan pertemanan.',
              isTerpuji: false
            }
          ]
        }
      },
      {
        id: 3,
        judulAdegan: 'Adegan 3: Pendampingan & Bimbingan Guru BK',
        waktuStart: 150,
        narasi: 'Melalui sesi konseling dan diskusi hangat bersama Guru BK, terbukalah jalan keluar yang bijaksana...',
        karakter: 'Guru BK & Sahabat',
        dialog: '"Ingatlah, setiap keputusan positif hari ini akan membentuk masa depan kalian yang mulia."',
        latar: 'Ruang Bimbingan Konseling (BK)',
        bgGradient: 'from-slate-950 via-indigo-900 to-purple-950'
      },
      {
        id: 4,
        judulAdegan: 'Adegan 4: Resolusi & Refleksi Pesan Moral',
        waktuStart: 220,
        narasi: module.video.resolusiMoral,
        karakter: 'Semua Karakter',
        dialog: `"${module.video.kutipanInspiratif.replace(/"/g, '')}"`,
        latar: 'Halaman Utama SMPN 7 Pasuruan',
        bgGradient: 'from-indigo-950 via-slate-900 to-emerald-950'
      }
    ];
  };

  const scenes = getDefaultScenes();

  // Find active scene based on currentTime
  const currentScene = scenes.reduce((prev, curr) => {
    if (currentTime >= curr.waktuStart) return curr;
    return prev;
  }, scenes[0]);

  // Video timer loop
  useEffect(() => {
    if (isPlaying && !activeDecision) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1 * playbackSpeed;
          if (next >= duration) {
            setIsPlaying(false);
            return duration;
          }

          // Check if hitting a decision point at current scene start + 10s
          const matchingScene = scenes.find(s => Math.floor(s.waktuStart + 10) === Math.floor(next));
          if (matchingScene && matchingScene.pilihanInteraktif && !completedDecisions[matchingScene.id]) {
            setIsPlaying(false);
            setActiveDecision(matchingScene.pilihanInteraktif);
          }

          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, activeDecision, duration, completedDecisions]);

  // Speech synthesis TTS narration
  useEffect(() => {
    if (isPlaying && !isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${currentScene.dialog}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else if (!isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentScene.id, isPlaying, isMuted]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      if (currentTime >= duration) setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setActiveDecision(null);
    setDecisionOutcome(null);
    setCompletedDecisions({});
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    setActiveDecision(null);
    setDecisionOutcome(null);
  };

  const handleSelectDecision = (opsi: { teks: string; dampak: string; isTerpuji: boolean }) => {
    setDecisionOutcome({ dampak: opsi.dampak, isTerpuji: opsi.isTerpuji });
    setCompletedDecisions(prev => ({ ...prev, [currentScene.id]: opsi.teks }));

    setTimeout(() => {
      setActiveDecision(null);
      setDecisionOutcome(null);
      setIsPlaying(true);
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Popup Trigger Bar */}
      <div className="flex flex-wrap items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('animasi');
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all ${
              activeTab === 'animasi'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>🎬 Pemutar Video Animasi & Simulasi Story</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('youtube');
              setIsPlaying(false);
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all ${
              activeTab === 'youtube'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>📺 Putar dari YouTube / Video Sumber</span>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-slate-500 pr-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Durasi: {module.video.durasi}</span>
        </div>
      </div>

      {/* TAUTAN LINK YOUTUBE RESMI PROMINENT BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-red-50 via-rose-50 to-indigo-50 border border-red-200/90 rounded-2xl p-3.5 sm:px-5 sm:py-3.5 gap-3 shadow-xs">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-red-500/30">
            <Tv className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-[11px] font-black uppercase text-red-700 tracking-wider">
                Tautan Link YouTube:
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                Video Edukasi BK
              </span>
            </div>
            <div className="mt-0.5 flex items-center space-x-1.5 min-w-0">
              <a
                href={currentYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-extrabold text-indigo-700 hover:text-red-600 underline underline-offset-2 flex items-center gap-1.5 truncate transition-colors"
                title={`Buka ${currentYoutubeUrl} di tab baru`}
              >
                <span className="truncate">{currentYoutubeUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 inline text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-extrabold flex items-center space-x-1.5 shadow-xs active:scale-95 transition-all"
            title="Salin Link YouTube ke Clipboard"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Salin Link</span>
              </>
            )}
          </button>

          <a
            href={currentYoutubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center space-x-1.5 shadow-md shadow-red-600/30 active:scale-95 transition-all"
          >
            <Tv className="w-4 h-4" />
            <span>Buka YouTube</span>
          </a>
        </div>
      </div>

      {/* MODE 1: ANIMATED INTERACTIVE STORY VIDEO PLAYER */}
      {activeTab === 'animasi' && (
        <div
          ref={containerRef}
          className="relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col text-white select-none"
        >
          {/* Main Display Canvas / Screen */}
          <div className={`relative aspect-video bg-gradient-to-br ${currentScene.bgGradient} flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 overflow-hidden`}>
            {/* Background Atmosphere Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.25),transparent_70%)] pointer-events-none"></div>

            {/* Top Bar Info */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-extrabold tracking-wider uppercase text-indigo-200">{currentScene.judulAdegan}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  📍 {currentScene.latar}
                </span>
              </div>
            </div>

            {/* Center Animated Scene Content */}
            <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto">
              {/* Play Overlay if Paused and Not in Decision */}
              {!isPlaying && !activeDecision && (
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group border-2 border-indigo-400/50"
                  title="Putar Video"
                >
                  <Play className="w-10 h-10 ml-1 fill-current" />
                </button>
              )}

              {/* Character Avatar & Animated Dialog Speech Bubble */}
              {isPlaying && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-full border border-indigo-400/30 text-indigo-200 text-xs font-extrabold">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pemeran: {currentScene.karakter}</span>
                  </div>

                  <div className="p-6 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/15 shadow-2xl relative max-w-2xl mx-auto transform transition-all hover:scale-[1.01]">
                    <p className="text-base sm:text-xl font-black text-amber-300 leading-relaxed italic">
                      {currentScene.dialog}
                    </p>
                    <div className="mt-3 text-xs text-slate-300 font-medium leading-relaxed border-t border-white/10 pt-3">
                      {currentScene.narasi}
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Decision Point Overlay */}
              {activeDecision && (
                <div className="p-6 sm:p-8 bg-slate-900/95 backdrop-blur-2xl rounded-3xl border-2 border-amber-400 shadow-2xl space-y-5 animate-scaleUp max-w-xl mx-auto text-left">
                  <div className="flex items-center space-x-3 text-amber-400">
                    <HelpCircle className="w-7 h-7 flex-shrink-0 animate-bounce" />
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-300">Simulasi Keputusan Interaktif BK</span>
                      <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">{activeDecision.pertanyaan}</h4>
                    </div>
                  </div>

                  {!decisionOutcome ? (
                    <div className="space-y-3 pt-2">
                      {activeDecision.opsi.map((opsi, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectDecision(opsi)}
                          className="w-full p-4 bg-slate-800/90 hover:bg-indigo-600 text-white rounded-2xl border border-slate-700 hover:border-indigo-400 text-xs sm:text-sm font-bold text-left transition-all hover:translate-x-1 flex items-center justify-between group shadow-md"
                        >
                          <span>{opsi.teks}</span>
                          <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`p-5 rounded-2xl border ${decisionOutcome.isTerpuji ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200' : 'bg-rose-950/90 border-rose-500 text-rose-200'} space-y-2 animate-fadeIn`}>
                      <div className="flex items-center space-x-2 font-extrabold text-sm">
                        <Award className="w-5 h-5" />
                        <span>{decisionOutcome.isTerpuji ? 'Pilihan Terpuji (+25 Poin BK)' : 'Refleksi Evaluasi BK'}</span>
                      </div>
                      <p className="text-xs leading-relaxed font-medium">{decisionOutcome.dampak}</p>
                      <p className="text-[10px] opacity-75 pt-1">Melanjutkan video dalam 4 detik...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subtitle / Caption Overlay */}
            {showSubtitles && !activeDecision && (
              <div className="relative z-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-center max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">
                  {isPlaying ? currentScene.narasi : `Klik tombol Putar (▶) untuk memulai animasi video: ${module.video.judul}`}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-6 space-y-4">
            {/* Seek Bar Progress Slider */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span className="text-indigo-400 font-bold">{currentScene.judulAdegan.split(':')[0]}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons Grid */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-lg transition-all active:scale-95 flex items-center space-x-2 text-xs font-extrabold"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  <span className="hidden sm:inline">{isPlaying ? 'Jeda' : 'Putar'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all"
                  title="Ulang dari Awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-2xl transition-all ${isMuted ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  title={isMuted ? 'Suara Narasi Mati' : 'Suara Narasi Aktif'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Playback Speed & Subtitle Controls */}
              <div className="flex items-center space-x-2">
                <select
                  value={playbackSpeed}
                  onChange={e => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-slate-800 text-slate-200 text-xs font-bold py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value={0.75}>0.75x (Lambat)</option>
                  <option value={1}>1.0x (Normal)</option>
                  <option value={1.25}>1.25x (Cepat)</option>
                  <option value={1.5}>1.5x (Sangat Cepat)</option>
                </select>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    showSubtitles ? 'bg-indigo-950 border-indigo-700 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Teks CC
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                  title="Layar Penuh"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Timeline Adegan Selector Buttons */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2">
              <span className="text-[11px] font-bold text-slate-400 flex items-center pr-2">Pilih Adegan:</span>
              {scenes.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentTime(s.waktuStart);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentScene.id === s.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Adegan {s.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: YOUTUBE EMBED PLAYER */}
      {activeTab === 'youtube' && (
        <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
            <iframe
              src={getYoutubeEmbedUrl()}
              title={module.video.judul}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3 text-white">
            <div>
              <h4 className="font-extrabold text-sm text-indigo-300">{module.video.judul}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pemutar Media YouTube Edukasi BK • Durasi: {module.video.durasi}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={currentYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center space-x-2 active:scale-95"
              >
                <Tv className="w-4 h-4" />
                <span>Buka di Aplikasi YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Video Content Overview & Moral Resolution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-6 bg-indigo-50/70 rounded-3xl border border-indigo-100 space-y-3">
          <h4 className="font-extrabold text-indigo-950 text-sm flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Alur Cerita Realistis</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {module.video.ceritaRealistis}
          </p>
        </div>

        <div className="p-6 bg-emerald-50/70 rounded-3xl border border-emerald-100 space-y-3">
          <h4 className="font-extrabold text-emerald-950 text-sm flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Resolusi & Pesan Moral</span>
          </h4>
          <p className="text-xs text-emerald-900 leading-relaxed font-extrabold">
            {module.video.resolusiMoral}
          </p>
        </div>

        <div className="p-6 bg-amber-50/70 rounded-3xl border border-amber-100 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="font-extrabold text-amber-950 text-sm flex items-center space-x-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Mutiara Hikmah BK</span>
            </h4>
            <p className="text-xs text-amber-900 italic leading-relaxed font-bold">
              {module.video.kutipanInspiratif}
            </p>
          </div>
          <div className="pt-2 text-[10px] text-amber-800 font-extrabold uppercase tracking-wider">
            SMP Negeri 7 Pasuruan
          </div>
        </div>
      </div>
    </div>
  );
};
