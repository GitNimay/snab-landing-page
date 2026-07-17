import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputPath = resolve(root, "public/seo/pixel-tree-social-bg.png");
const logoPath = resolve(root, "public/logo.png");
const logo = readFileSync(logoPath).toString("base64");

const W = 1200;
const H = 630;
const px = 10;

function rect(x, y, w, h, fill, opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" opacity="${opacity}"/>`;
}

function block(x, y, w, h, fill, opacity = 1) {
  return rect(x * px, y * px, w * px, h * px, fill, opacity);
}

function blocks(items) {
  return items.map(([x, y, w, h, fill, opacity = 1]) => block(x, y, w, h, fill, opacity)).join("");
}

const leaves = [
  [15, 0, 3, 1, "#ffd76f"], [12, 1, 7, 1, "#f28a32"], [10, 2, 10, 2, "#c84824"],
  [8, 4, 15, 2, "#e7652d"], [6, 6, 19, 2, "#9b321f"], [5, 8, 21, 2, "#d34e26"],
  [3, 10, 24, 2, "#f29235"], [2, 12, 25, 2, "#b94023"], [4, 14, 22, 2, "#d95528"],
  [7, 16, 18, 2, "#f0a23d"], [10, 18, 12, 2, "#9a341f"],
  [9, 3, 4, 3, "#ffcb61"], [18, 3, 5, 3, "#ffcb61"], [5, 9, 6, 3, "#76291d"],
  [21, 9, 6, 3, "#7b2a1e"], [12, 7, 3, 2, "#ffd76f"], [23, 13, 3, 2, "#ffd76f"],
  [0, 11, 3, 2, "#7b2a1e"], [27, 11, 3, 2, "#ef7a31"], [6, 18, 4, 1, "#6a271c"],
  [21, 18, 5, 1, "#7a2b1d"], [13, 20, 8, 1, "#6c271c"],
];

const shadowLeaves = [
  [12, 4, 3, 2, "#160d0a"], [15, 5, 2, 4, "#20120d"], [18, 6, 2, 4, "#2d1711"],
  [10, 10, 2, 3, "#130c09"], [19, 10, 3, 2, "#21130f"], [14, 13, 5, 2, "#2a1711"],
  [8, 15, 4, 2, "#1b100c"], [20, 15, 3, 2, "#24130e"],
];

const trunk = [
  [14, 10, 2, 12, "#6d4329"], [16, 11, 2, 11, "#8b5733"], [18, 12, 1, 10, "#4a2d1e"],
  [12, 13, 2, 3, "#5f3824"], [10, 12, 2, 1, "#6f4429"], [8, 11, 2, 1, "#8b5733"],
  [18, 13, 3, 2, "#6d4329"], [21, 12, 3, 1, "#8b5733"],
  [13, 21, 2, 4, "#4b2d1f"], [15, 21, 3, 5, "#8b5733"], [18, 21, 1, 4, "#5d3825"],
  [12, 25, 8, 2, "#3b251a"], [9, 27, 5, 1, "#2c1c15"], [18, 27, 6, 1, "#2c1c15"],
];

const smallLeaves = [
  [31, 4, 1, 1, "#ffd76f", .55], [34, 7, 1, 1, "#f29235", .48], [30, 13, 1, 1, "#e35b29", .42],
  [35, 15, 1, 1, "#a83b23", .35], [-3, 10, 1, 1, "#d95528", .3], [-5, 14, 1, 1, "#f29235", .26],
  [27, 3, 1, 1, "#ffd76f", .36], [32, 11, 1, 1, "#b94023", .34],
];

const tree = `
  <g transform="translate(742 102)" shape-rendering="crispEdges">
    ${blocks(shadowLeaves)}
    ${blocks(leaves)}
    ${blocks(trunk)}
    ${blocks(smallLeaves)}
  </g>
`;

const circuitRoots = `
  <g opacity=".42" shape-rendering="crispEdges">
    ${rect(718, 498, 250, 2, "#d66a2b", .44)}
    ${rect(966, 476, 2, 24, "#d66a2b", .44)}
    ${rect(966, 476, 74, 2, "#d66a2b", .44)}
    ${rect(810, 532, 170, 2, "#f0a64b", .34)}
    ${rect(978, 512, 2, 22, "#f0a64b", .34)}
    ${rect(978, 512, 92, 2, "#f0a64b", .34)}
    ${rect(652, 552, 122, 2, "#4ed2da", .2)}
    ${rect(774, 552, 2, 36, "#4ed2da", .2)}
    ${rect(774, 586, 148, 2, "#4ed2da", .2)}
    ${rect(1036, 472, 8, 8, "#f0a64b", .52)}
    ${rect(1066, 508, 8, 8, "#f0a64b", .42)}
    ${rect(918, 582, 8, 8, "#4ed2da", .33)}
  </g>
`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="noise" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="1" height="1" fill="#ffffff" opacity=".55"/>
      <rect x="10" y="7" width="1" height="1" fill="#4ed2da" opacity=".25"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#030303"/>
  <rect width="${W}" height="${H}" fill="url(#noise)" opacity=".08"/>
  <g opacity=".18" shape-rendering="crispEdges">
    ${rect(64, 548, 412, 2, "#ffffff", .35)}
    ${rect(64, 548, 2, 18, "#ffffff", .35)}
    ${rect(476, 520, 2, 30, "#ffffff", .35)}
    ${rect(476, 520, 118, 2, "#ffffff", .35)}
  </g>
  <image href="data:image/png;base64,${logo}" x="64" y="66" width="66" height="66" preserveAspectRatio="xMidYMid meet"/>
  <text x="154" y="96" fill="#f4f4ef" font-family="'Courier New', monospace" font-size="30" font-weight="700" letter-spacing="0">SNAB Innovations</text>
  <text x="154" y="125" fill="#85857f" font-family="'Courier New', monospace" font-size="13" letter-spacing="2">AI PRODUCT STUDIO</text>
  <text x="64" y="306" fill="#fff8e8" font-family="'Courier New', monospace" font-size="42" font-weight="700" letter-spacing="0">Build useful AI.</text>
  <text x="66" y="354" fill="#b8b8ae" font-family="'Courier New', monospace" font-size="22" letter-spacing="0">Clean systems for real work.</text>
  <rect x="64" y="446" width="76" height="2" fill="#f05b2b"/>
  <text x="64" y="493" fill="#cfcfc6" font-family="'Courier New', monospace" font-size="16" letter-spacing="1.1">snab.co.in</text>
  ${circuitRoots}
  ${tree}
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outputPath);

const meta = await sharp(outputPath).metadata();
console.log(`Generated ${outputPath} (${meta.width}x${meta.height})`);
