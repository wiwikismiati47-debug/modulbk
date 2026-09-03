import * as XLSX from 'xlsx';

export const generateKopSuratHtml = () => `
<div class="kop-surat" style="width: 100%; margin-bottom: 15px; page-break-inside: avoid;">
  <table style="width: 100%; border-collapse: collapse; border: none; margin: 0; padding: 0;">
    <tr style="border: none;">
      <td style="width: 15%; text-align: center; vertical-align: middle; border: none; padding: 0;">
        <img src="https://i.ibb.co.com/C3Y7JXkN/logo-dinas.png" alt="Logo Dinas" style="max-height: 85px; width: auto; max-width: 80px; object-fit: contain;" />
      </td>
      <td style="width: 70%; text-align: center; vertical-align: middle; border: none; padding: 0 5px; font-family: 'Times New Roman', Times, serif;">
        <div style="font-size: 13pt; font-weight: bold; letter-spacing: 0.5px; color: #000000; margin-bottom: 2px;">
          PEMERINTAH KOTA PASURUAN
        </div>
        <div style="font-size: 18pt; font-weight: bold; letter-spacing: 1px; color: #000000; margin-bottom: 3px;">
          UPT SMP NEGERI 7
        </div>
        <div style="font-size: 9.5pt; color: #000000; line-height: 1.3;">
          Jalan Simpang Slamet Riadi Nomor 2, Kota Pasuruan, Jawa Timur, 67139<br/>
          Telepon (0343) 426845<br/>
          Pos-el <i style="font-family: 'Times New Roman', Times, serif;">smp7pas@yahoo.co.id</i>, Laman <i style="font-family: 'Times New Roman', Times, serif;">www.smpn7pasuruan.sch.id</i>
        </div>
      </td>
      <td style="width: 15%; text-align: center; vertical-align: middle; border: none; padding: 0;">
        <img src="https://iili.io/KDFk4fI.png" alt="Logo SMPN 7 Pasuruan" style="max-height: 85px; width: auto; max-width: 80px; object-fit: contain;" />
      </td>
    </tr>
  </table>
  <div style="border-top: 3px solid #000000; border-bottom: 1px solid #000000; height: 2px; margin-top: 5px; margin-bottom: 18px;"></div>
</div>
`;

export const generateSignatureHtml = (
  dateStr?: string,
  guruBkName: string = 'WIWIK ISMIATI, S.Pd',
  guruBkNip: string = '19831116 200904 2 003',
  kepalaSekolahName: string = 'NUR FADILAH, S.Pd., M.Pd',
  kepalaSekolahNip: string = '19860410 201001 2 030'
) => {
  const date = dateStr || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  return `
<div class="signature-section" style="width: 100%; margin-top: 35px; page-break-inside: avoid; font-family: 'Times New Roman', Times, serif;">
  <table style="width: 100%; border-collapse: collapse; border: none; margin: 0;">
    <tr style="border: none;">
      <td style="width: 50%; text-align: center; vertical-align: top; border: none; padding: 0 10px;">
        <p style="margin: 0; font-size: 11pt; color: #000000;">Mengetahui,</p>
        <p style="margin: 0; font-size: 11pt; font-weight: bold; color: #000000;">Kepala SMP Negeri 7 Pasuruan</p>
        
        <div style="height: 60px; margin: 6px auto; width: 130px; border: 1px dashed #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 8pt; font-style: italic;">
          ✒️ Klik untuk TTD
        </div>
        
        <p style="margin: 0; font-size: 11pt; font-weight: bold; color: #000000; text-decoration: underline;">
          ${kepalaSekolahName}
        </p>
        <p style="margin: 2px 0 0 0; font-size: 10pt; color: #000000;">
          NIP. ${kepalaSekolahNip}
        </p>
      </td>

      <td style="width: 50%; text-align: center; vertical-align: top; border: none; padding: 0 10px;">
        <p style="margin: 0; font-size: 11pt; color: #000000;">Pasuruan, ${date}</p>
        <p style="margin: 0; font-size: 11pt; font-weight: bold; color: #000000;">Guru Bimbingan dan Konseling</p>
        
        <div style="height: 60px; margin: 6px auto; width: 130px; border: 1px dashed #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 8pt; font-style: italic;">
          ✒️ Klik untuk TTD
        </div>
        
        <p style="margin: 0; font-size: 11pt; font-weight: bold; color: #000000; text-decoration: underline;">
          ${guruBkName}
        </p>
        <p style="margin: 2px 0 0 0; font-size: 10pt; color: #000000;">
          NIP. ${guruBkNip}
        </p>
      </td>
    </tr>
  </table>
</div>
`;
};

export const generateFullDocumentHtml = (
  title: string, 
  htmlBody: string,
  guruBkName?: string,
  guruBkNip?: string,
  kepalaSekolahName?: string,
  kepalaSekolahNip?: string
) => {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <style>
    @media print {
      @page { margin: 15mm; size: A4; }
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .no-print { display: none !important; }
    }
    body { font-family: 'Times New Roman', 'Arial', sans-serif; font-size: 11pt; color: #000000; line-height: 1.4; padding: 20px; background: #ffffff; }
    h1 { font-size: 16pt; color: #000000; text-align: center; font-weight: bold; margin-bottom: 4px; }
    h2 { font-size: 12pt; color: #000000; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-top: 16px; font-weight: bold; text-transform: uppercase; }
    h3 { font-size: 11pt; color: #000000; margin-top: 10px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; }
    th, td { border: 1px solid #000000; padding: 6px 8px; font-size: 10pt; text-align: left; vertical-align: top; }
    th { background-color: #f1f5f9 !important; color: #000000 !important; font-weight: bold; text-align: center; }
    ul, ol { margin-left: 20px; margin-top: 4px; margin-bottom: 8px; }
    li { margin-bottom: 3px; }
    .footer { text-align: center; margin-top: 25px; font-size: 8.5pt; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 8px; }
  </style>
</head>
<body>
  ${generateKopSuratHtml()}

  ${htmlBody}

  ${generateSignatureHtml(undefined, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip)}

  <div class="footer">
    Dokumen Resmi Layanan Bimbingan dan Konseling UPT SMP Negeri 7 Pasuruan • Diunduh dari Sistem Digital BK
  </div>
</body>
</html>`;
};

export const exportToDoc = (
  title: string, 
  htmlBody: string, 
  filename: string,
  guruBkName?: string,
  guruBkNip?: string,
  kepalaSekolahName?: string,
  kepalaSekolahNip?: string
) => {
  const fullContent = generateFullDocumentHtml(title, htmlBody, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  
  try {
    const blob = new Blob(['\ufeff', fullContent], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.doc`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error('Blob download error:', err);
    try {
      const link = document.createElement('a');
      link.href = 'data:application/msword;charset=utf-8,' + encodeURIComponent(fullContent);
      link.download = `${filename}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e2) {
      console.error('Data URI download error:', e2);
    }
  }
};

export const exportToTxt = (filename: string, content: string) => {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error(err);
  }
};

export const exportToExcel = (filename: string, sheetName: string, jsonArray: any[]) => {
  try {
    const ws = XLSX.utils.json_to_sheet(jsonArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  } catch (err) {
    console.error('Excel export error:', err);
  }
};

export const printDocumentContent = (
  title: string, 
  htmlBody: string,
  guruBkName?: string,
  guruBkNip?: string,
  kepalaSekolahName?: string,
  kepalaSekolahNip?: string
) => {
  const fullContent = generateFullDocumentHtml(title, htmlBody, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  
  // Try opening popup first
  try {
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(fullContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        try {
          printWin.print();
        } catch (e) {
          console.error(e);
        }
      }, 500);
      return;
    }
  } catch (err) {
    console.warn('Popup blocked, falling back to hidden iframe printing', err);
  }

  // Fallback: Invisible iframe
  try {
    let iframe = document.getElementById('printIframeHidden') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'printIframeHidden';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(fullContent);
      doc.close();
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.error('Iframe print error:', e);
          window.print();
        }
      }, 500);
    } else {
      window.print();
    }
  } catch (err) {
    console.error('Print fallback failed:', err);
    window.print();
  }
};

export const openInNewTab = (
  title: string, 
  htmlBody: string,
  guruBkName?: string,
  guruBkNip?: string,
  kepalaSekolahName?: string,
  kepalaSekolahNip?: string
) => {
  const fullContent = generateFullDocumentHtml(title, htmlBody, guruBkName, guruBkNip, kepalaSekolahName, kepalaSekolahNip);
  const win = window.open('', '_blank');
  if (win) {
    win.document.open();
    win.document.write(fullContent);
    win.document.close();
  } else {
    // If popups blocked, download html file directly
    const blob = new Blob([fullContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
