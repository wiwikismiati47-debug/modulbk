export interface JurusBKItem {
  jurusNo: number;
  namaJurus: string;
  implementasi: string;
  mediaBentuk: string;
}

export interface RPPData {
  identitas: {
    satuanPendidikan: string;
    mataPelajaran: string;
    kelasSemester: string;
    waktu: string;
    materiPokok: string;
    bidangBimbingan: string;
    modelPembelajaran: string;
  };
  identifikasi: {
    kesiapanMurid: string;
    karakteristikMateri: string;
    dimensiPancasila: { dimensi: string; keterangan: string }[];
  };
  desainKlasikal: {
    skkpd: string;
    topikKontekstual: string;
    lintasDisiplin: string;
    tujuanLayanan: string[];
    kerangkaPembelajaran: {
      praktikPedagogis: string;
      kemitraanPembelajaran: string;
      lingkunganPembelajaran: string;
      pemanfaatanDigital: string;
    };
  };
  integrasi7Jurus?: JurusBKItem[];
  pelaksanaan: {
    prinsipPembelajaran: {
      berkesadaran: string;
      bermakna: string;
      menggembirakan: string;
    };
    pengalamanBelajar: {
      memahami: string;
      mengaplikasi: string;
      merefleksi: string;
    };
    pjbl: string;
    langkahLangkah: { tahap: string; aktivitas: string }[];
  };
  asesmenIndikatorTindakLanjut: {
    asesmen: string;
    indikatorKeberhasilan: string[];
    rencanaTindakLanjut: string;
  };
}

export interface Question {
  id: number;
  type: 'pg_tunggal' | 'pg_kompleks' | 'benar_salah' | 'menjodohkan' | 'studi_kasus';
  pertanyaan: string;
  pilihan?: string[];
  jawabanBenar: string | string[] | boolean;
  pembahasan: string;
  pasangan?: { kiri: string; kanan: string }[];
  studiKasusTeks?: string;
}

export interface KuisionerItem {
  id: number;
  pertanyaan: string;
  pilihan: { label: string; skor: number; emoji: string }[];
}

export interface ModuleContent {
  id: string;
  nomor: number;
  judul: string;
  subjudul: string;
  emoji: string;
  warnaAesthetic: string;
  deskripsiSingkat: string;
  rpp: RPPData;
  kuisioner: KuisionerItem[];
  video: {
    judul: string;
    durasi: string;
    ceritaRealistis: string;
    resolusiMoral: string;
    kutipanInspiratif: string;
    youtubeId?: string;
    adegan?: {
      id: number;
      judulAdegan: string;
      waktuStart: number; // in seconds
      narasi: string;
      karakter: string;
      dialog: string;
      latar: string;
      pilihanInteraktif?: {
        pertanyaan: string;
        opsi: { teks: string; dampak: string; isTerpuji: boolean }[];
      };
    }[];
  };
  materiPoin: { judul: string; isi: string; ikon: string }[];
  soalEval: Question[];
  kuisTTS: {
    pertanyaanMendatar: { no: number; petunjuk: string; jawaban: string; x: number; y: number }[];
    pertanyaanMenurun: { no: number; petunjuk: string; jawaban: string; x: number; y: number }[];
  };
  permainanType: 'sorting' | 'puzzle' | 'pencocokan' | 'kuis_kecepatan' | 'pohon_keputusan';
}

export interface AttendanceRecord {
  id: string;
  nama: string;
  rombel: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
  waktu: string;
  catatan?: string;
}
