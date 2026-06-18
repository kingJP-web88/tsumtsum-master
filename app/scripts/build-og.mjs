// OGP画像（1200x630）をSVG→PNGで生成して public/og-image.png に保存
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public");
const OUT_PATH = join(OUT_DIR, "og-image.png");

const W = 1200;
const H = 630;

const logo = [
  { c: "ツ", color: "#FF2D8A" },
  { c: "ム", color: "#FFB400" },
  { c: "ツ", color: "#2BB673" },
  { c: "ム", color: "#4FB6E6" },
  { c: "完売", color: "#E63946" },
  { c: "マスター", color: "#003B6F" },
];

// 各セグメントの幅（描画上の参考値）
const FONT = `'Yu Gothic UI', 'Meiryo', 'Hiragino Sans', sans-serif`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="#FFD5E5"/>
      <stop offset="25%" stop-color="#FFE9C2"/>
      <stop offset="50%" stop-color="#FFF6B3"/>
      <stop offset="75%" stop-color="#C7F0DA"/>
      <stop offset="100%" stop-color="#C5E8F8"/>
    </linearGradient>
    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#FF2D8A"/>
      <stop offset="25%"  stop-color="#FFB400"/>
      <stop offset="50%"  stop-color="#2BB673"/>
      <stop offset="75%"  stop-color="#4FB6E6"/>
      <stop offset="100%" stop-color="#E63946"/>
    </linearGradient>
    <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="0" flood-color="rgba(0,0,0,0.18)"/>
    </filter>
    <style>
      .logo {
        font-family: ${FONT};
        font-weight: 900;
        font-size: 132px;
        letter-spacing: -0.01em;
        paint-order: stroke fill;
        stroke: #ffffff;
        stroke-width: 8;
        stroke-linejoin: round;
      }
      .sub {
        font-family: ${FONT};
        font-weight: 700;
        font-size: 36px;
        fill: #2A4A6E;
      }
      .feature {
        font-family: ${FONT};
        font-weight: 700;
        font-size: 28px;
        fill: #3A5A7C;
      }
      .url {
        font-family: ${FONT};
        font-weight: 700;
        font-size: 24px;
        fill: #6B7B8C;
        letter-spacing: 0.02em;
      }
    </style>
  </defs>

  <!-- 背景 -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- 上下のレインボーライン -->
  <rect x="0" y="0" width="${W}" height="8" fill="url(#rainbow)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#rainbow)"/>

  <!-- 中央の白カード -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" rx="36" fill="#ffffff" fill-opacity="0.86"/>

  <!-- ジャンルドット -->
  <g transform="translate(600, 180)">
    <circle cx="-150" cy="0" r="14" fill="#4FB6E6"/>
    <circle cx="-50"  cy="0" r="14" fill="#FF2D8A"/>
    <circle cx="50"   cy="0" r="14" fill="#7BD0FF"/>
    <circle cx="150"  cy="0" r="14" fill="#FFB400"/>
  </g>

  <!-- メインロゴ「ツムツム完売マスター」 -->
  <g filter="url(#logoShadow)">
    <text x="600" y="360" text-anchor="middle" class="logo">
      <tspan fill="${logo[0].color}">${logo[0].c}</tspan><tspan fill="${logo[1].color}">${logo[1].c}</tspan><tspan fill="${logo[2].color}">${logo[2].c}</tspan><tspan fill="${logo[3].color}">${logo[3].c}</tspan><tspan fill="${logo[4].color}">${logo[4].c}</tspan><tspan fill="${logo[5].color}">${logo[5].c}</tspan>
    </text>
  </g>

  <!-- サブテキスト -->
  <text x="600" y="430" text-anchor="middle" class="sub">完売進捗・必要コイン/メダル数を自動算出</text>

  <!-- 4機能の説明 -->
  <text x="600" y="490" text-anchor="middle" class="feature">ハピネス／プレミアム／プレミアム＋ ＆ 効率計算</text>

  <!-- URL -->
  <text x="600" y="560" text-anchor="middle" class="url">tsumtsum-master.vercel.app</text>
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });
const tmpSvgPath = join(OUT_DIR, "og-image.svg");
writeFileSync(tmpSvgPath, svg);

await sharp(Buffer.from(svg))
  .png()
  .toFile(OUT_PATH);

console.log("Wrote", OUT_PATH);
