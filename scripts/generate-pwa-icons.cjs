const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC-32 Table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function generatePng(width, height, isMaskable = false) {
  // RGBA buffer: height rows, each row has 1 filter byte (0) followed by width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2;

  // Colors: Indigo theme #4f46e5 (79, 70, 229), Violet #7c3aed (124, 58, 237), Gold #fbbf24 (251, 191, 36), White (255, 255, 255)
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gradient background
      const t = (x + y) / (width + height);
      let rBg = Math.round(49 * (1 - t) + 99 * t);
      let gBg = Math.round(46 * (1 - t) + 102 * t);
      let bBg = Math.round(129 * (1 - t) + 241 * t);

      // Rounded rectangle / maskable background
      let isInside = true;
      if (!isMaskable) {
        // Rounded corners
        const cornerR = width * 0.22;
        const inLeft = x < cornerR;
        const inRight = x > width - cornerR;
        const inTop = y < cornerR;
        const inBottom = y > height - cornerR;

        if (inLeft && inTop) {
          isInside = Math.hypot(x - cornerR, y - cornerR) <= cornerR;
        } else if (inRight && inTop) {
          isInside = Math.hypot(x - (width - cornerR), y - cornerR) <= cornerR;
        } else if (inLeft && inBottom) {
          isInside = Math.hypot(x - cornerR, y - (height - cornerR)) <= cornerR;
        } else if (inRight && inBottom) {
          isInside = Math.hypot(x - (width - cornerR), y - (height - cornerR)) <= cornerR;
        }
      }

      if (!isInside) {
        // Transparent outside
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Inside app icon base
      let cr = rBg;
      let cg = gBg;
      let cb = bBg;
      let ca = 255;

      // Draw emblem / book icon in center
      const scale = isMaskable ? 0.65 : 0.85;
      const scDist = dist / (r * scale);

      // Center shield / badge
      if (scDist < 0.8) {
        // White open book / shield shape
        const nx = dx / (r * scale);
        const ny = dy / (r * scale);

        // Book pages
        if (ny > -0.2 && ny < 0.45 && Math.abs(nx) < 0.6) {
          // Book pages
          const curve = Math.sin((Math.abs(nx) + 0.1) * Math.PI) * 0.12;
          if (ny > 0.05 - curve && ny < 0.42 - curve) {
            cr = 255;
            cg = 255;
            cb = 255;
          }
        }

        // Gold guiding star / emblem circle on top
        const starDist = Math.hypot(dx, dy + r * scale * 0.35);
        if (starDist < r * scale * 0.22) {
          cr = 251;
          cg = 191;
          cb = 36;
        }

        // Inner wings / olive branch accents
        if (ny > -0.35 && ny < 0.1 && Math.abs(nx) > 0.35 && Math.abs(nx) < 0.7) {
          cr = 56;
          cg = 189;
          cb = 248;
        }
      }

      rawData[pxOffset] = cr;
      rawData[pxOffset + 1] = cg;
      rawData[pxOffset + 2] = cb;
      rawData[pxOffset + 3] = ca;
    }
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // Bit depth
  ihdrData.writeUInt8(6, 9); // Color type 6 (RGBA)
  ihdrData.writeUInt8(0, 10); // Compression
  ihdrData.writeUInt8(0, 11); // Filter
  ihdrData.writeUInt8(0, 12); // Interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. 192x192 standard PNG
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePng(192, 192, false));
console.log('Created pwa-192x192.png');

// 2. 512x512 standard PNG
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePng(512, 512, false));
console.log('Created pwa-512x512.png');

// 3. 512x512 maskable PNG (with full-bleed background and padded icon safe-zone)
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, true));
console.log('Created pwa-maskable-512x512.png');

// 4. apple-touch-icon 180x180 PNG
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, false));
console.log('Created apple-touch-icon.png');

// 5. favicon.ico
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePng(64, 64, false));
console.log('Created favicon.ico');
