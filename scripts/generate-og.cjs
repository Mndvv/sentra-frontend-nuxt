const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background linear gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070e"/>
      <stop offset="45%" stop-color="#070b16"/>
      <stop offset="100%" stop-color="#090e1f"/>
    </linearGradient>

    <!-- Celestial indigo glow -->
    <radialGradient id="indigoGlow" cx="85%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.18"/>
      <stop offset="50%" stop-color="#4f46e5" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#05070e" stop-opacity="0"/>
    </radialGradient>

    <!-- Warm amber glow bottom left -->
    <radialGradient id="amberGlow" cx="15%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#05070e" stop-opacity="0"/>
    </radialGradient>

    <!-- Pill background gradient -->
    <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.75"/>
    </linearGradient>
  </defs>

  <!-- 1. Background Layers -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  <rect width="1200" height="630" fill="url(#indigoGlow)"/>
  <rect width="1200" height="630" fill="url(#amberGlow)"/>

  <!-- Outer aesthetic border -->
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.5"/>
  <rect x="28" y="28" width="1144" height="574" rx="12" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- 2. Astronomical Coordinate Circles & Celestial Grid -->
  <g transform="translate(920, 240)">
    <!-- Concentric coordinate rings -->
    <circle cx="0" cy="0" r="100" fill="none" stroke="#6366f1" stroke-width="1" stroke-dasharray="3,5" opacity="0.25"/>
    <circle cx="0" cy="0" r="180" fill="none" stroke="#818cf8" stroke-width="1" stroke-dasharray="6,8" opacity="0.2"/>
    <circle cx="0" cy="0" r="260" fill="none" stroke="#38bdf8" stroke-width="0.75" stroke-dasharray="4,6" opacity="0.15"/>
    <circle cx="0" cy="0" r="340" fill="none" stroke="#64748b" stroke-width="0.75" stroke-dasharray="12,8" opacity="0.12"/>
    <circle cx="0" cy="0" r="420" fill="none" stroke="#475569" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.08"/>

    <!-- Coordinate axes -->
    <line x1="-460" y1="0" x2="300" y2="0" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="4,4" opacity="0.18"/>
    <line x1="0" y1="-300" x2="0" y2="350" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="4,4" opacity="0.18"/>
    <line x1="-300" y1="-173" x2="200" y2="115" stroke="#818cf8" stroke-width="0.5" stroke-dasharray="3,5" opacity="0.12"/>

    <!-- Starlight Cross Accents / Stars -->
    <path d="M 0,-28 Q 0,0 -28,0 Q 0,0 0,28 Q 0,0 28,0 Q 0,0 0,-28 Z" fill="#c7d2fe" opacity="0.75"/>
    <circle cx="0" cy="0" r="3.5" fill="#ffffff"/>

    <g transform="translate(140, -110)">
      <path d="M 0,-14 Q 0,0 -14,0 Q 0,0 0,14 Q 0,0 14,0 Q 0,0 0,-14 Z" fill="#fde68a" opacity="0.6"/>
      <circle cx="0" cy="0" r="2" fill="#ffffff"/>
    </g>

    <g transform="translate(-180, 150)">
      <path d="M 0,-12 Q 0,0 -12,0 Q 0,0 0,12 Q 0,0 12,0 Q 0,0 0,-12 Z" fill="#a5b4fc" opacity="0.5"/>
      <circle cx="0" cy="0" r="1.5" fill="#ffffff"/>
    </g>

    <!-- Faint star particles -->
    <circle cx="-130" cy="-90" r="1.5" fill="#ffffff" opacity="0.5"/>
    <circle cx="80" cy="160" r="1.2" fill="#fde68a" opacity="0.45"/>
    <circle cx="-220" cy="-40" r="1.8" fill="#ffffff" opacity="0.4"/>
    <circle cx="210" cy="70" r="1.5" fill="#c7d2fe" opacity="0.5"/>
    <circle cx="60" cy="-210" r="1.2" fill="#ffffff" opacity="0.35"/>
    <circle cx="-80" cy="240" r="1.5" fill="#ffffff" opacity="0.4"/>
  </g>

  <!-- Left Starlight particles -->
  <g opacity="0.4">
    <circle cx="160" cy="180" r="1.2" fill="#c7d2fe"/>
    <circle cx="580" cy="130" r="1.5" fill="#ffffff"/>
    <circle cx="480" cy="460" r="1" fill="#fde68a"/>
    <circle cx="230" cy="480" r="1.5" fill="#ffffff"/>
  </g>

  <!-- 3. Brand Header: Pill Badge -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="510" height="40" rx="20" fill="url(#badgeBg)" stroke="#334155" stroke-width="1"/>
    <!-- Amber status indicator dot with glow -->
    <circle cx="24" cy="20" r="5" fill="#f59e0b"/>
    <circle cx="24" cy="20" r="8" fill="#f59e0b" opacity="0.25"/>
    <!-- Pill Text -->
    <text x="42" y="25" fill="#cbd5e1" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="1.2">SMAN 2 JONGGOL · KABINET NAWASENA 2026/2027</text>
  </g>

  <!-- 4. Main Typography Group -->
  <!-- Title: SENTRA. with accent dot -->
  <g transform="translate(80, 248)">
    <text x="0" y="0" fill="#ffffff" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="96" font-weight="900" letter-spacing="-2">SENTRA<tspan fill="#f59e0b">.</tspan></text>
  </g>

  <!-- Subtitle -->
  <g transform="translate(82, 312)">
    <text x="0" y="0" fill="#a5b4fc" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="28" font-weight="700" letter-spacing="0.2">Portal Resmi OSIS &amp; MPK Nawasena</text>
  </g>

  <!-- Tagline / Description -->
  <g transform="translate(82, 368)">
    <text x="0" y="0" fill="#94a3b8" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="21" font-weight="400">Pusat kendali program kerja, agenda kegiatan, dokumentasi,</text>
    <text x="0" y="32" fill="#94a3b8" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="21" font-weight="400">dan arsip digital kepengurusan.</text>
  </g>

  <!-- 5. Footer Divider & Footer Bar -->
  <line x1="80" y1="500" x2="1120" y2="500" stroke="#1e293b" stroke-width="1.2" opacity="0.8"/>

  <!-- Footer Brand Emblem & Info -->
  <g transform="translate(80, 528)">
    <rect x="0" y="4" width="34" height="34" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.2"/>
    <path d="M 17,9 Q 17,21 11,21 Q 17,21 17,33 Q 17,21 23,21 Q 17,21 17,9 Z" fill="#f59e0b"/>
    <circle cx="17" cy="21" r="2" fill="#ffffff"/>

    <text x="46" y="27" fill="#f1f5f9" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="2">NAWASENA</text>
    <text x="180" y="27" fill="#475569" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="14" font-weight="500">|</text>
    <text x="196" y="27" fill="#64748b" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" font-size="14" font-weight="500">SMAN 2 JONGGOL</text>
  </g>

  <!-- Domain on right side of footer -->
  <g transform="translate(1120, 555)">
    <text x="0" y="0" text-anchor="end" fill="#818cf8" font-family="'Segoe UI', -apple-system, Roboto, monospace, sans-serif" font-size="18" font-weight="600" letter-spacing="1">nawasena.site</text>
  </g>
</svg>`;

async function main() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outDefault = path.join(publicDir, 'og-default.png');
  const outImage = path.join(publicDir, 'og-image.png');

  console.log('Rendering 1200x630 OpenGraph PNG assets via sharp...');

  const buffer = await sharp(Buffer.from(svgContent), { density: 150 })
    .resize(1200, 630)
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: 90,
    })
    .toBuffer();

  fs.writeFileSync(outDefault, buffer);
  fs.writeFileSync(outImage, buffer);

  const meta = await sharp(buffer).metadata();
  const statDefault = fs.statSync(outDefault);
  const statImage = fs.statSync(outImage);

  console.log(`Generated: ${outDefault}`);
  console.log(`  Resolution: ${meta.width}x${meta.height}`);
  console.log(`  Size: ${(statDefault.size / 1024).toFixed(2)} KB`);

  console.log(`Generated: ${outImage}`);
  console.log(`  Resolution: ${meta.width}x${meta.height}`);
  console.log(`  Size: ${(statImage.size / 1024).toFixed(2)} KB`);

  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`Unexpected dimensions: ${meta.width}x${meta.height}, expected 1200x630`);
  }

  if (statDefault.size > 250 * 1024) {
    throw new Error(`Image size ${(statDefault.size / 1024).toFixed(2)} KB exceeds 250 KB limit`);
  }

  console.log('OpenGraph image generation succeeded and verified under 250 KB.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
