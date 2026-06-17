import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const sourcePath = resolve(root, "public/pixel-tree.svg");
const outputPath = resolve(root, "public/pixel-tree-wind.svg");

const source = readFileSync(sourcePath, "utf8");
const viewBox = source.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1113 479";
const width = source.match(/width="([^"]+)"/)?.[1] ?? "1113";
const height = source.match(/height="([^"]+)"/)?.[1] ?? "479";

const bandNames = [
  "crown-high",
  "crown-mid",
  "branch-high",
  "branch-low",
  "trunk-low",
  "roots"
];

const leafColors = [
  "#efd977",
  "#dc7f36",
  "#d74727",
  "#b13720",
  "#daae53"
];

const leafShapes = [
  "M0 0h4v4h-4zM4 4h3v3h-3z",
  "M1 0h5v3h-5zM0 3h3v3h-3z",
  "M0 1h3v3h-3zM3 0h4v4h-4zM6 4h2v2h-2z",
  "M0 0h3v3h-3zM2 3h5v3h-5z"
];

const leaves = [
  [62, 188, 0, 0, 0],
  [118, 224, 1, 1, 190],
  [182, 168, 2, 2, 420],
  [248, 96, 3, 0, 650],
  [304, 132, 4, 1, 880],
  [372, 112, 1, 2, 1110],
  [444, 64, 0, 0, 1340],
  [512, 98, 2, 1, 1570],
  [584, 154, 3, 2, 1800],
  [660, 136, 4, 0, 2030],
  [728, 94, 1, 1, 2260],
  [792, 72, 0, 2, 2490],
  [852, 116, 2, 0, 2720],
  [918, 52, 3, 1, 2950],
  [984, 86, 4, 2, 3180],
  [1042, 34, 1, 0, 3410],
  [94, 264, 3, 2, 3640],
  [214, 300, 4, 0, 3870],
  [338, 238, 0, 1, 4100],
  [468, 206, 2, 2, 4330],
  [596, 232, 1, 0, 4560],
  [724, 210, 3, 1, 4790],
  [858, 178, 4, 2, 5020],
  [1004, 152, 0, 0, 5250]
];

const bands = [
  { maxY: 96 },
  { maxY: 176 },
  { maxY: 268 },
  { maxY: 348 },
  { maxY: 420 },
  { maxY: Number.POSITIVE_INFINITY }
];

const rectPattern = /M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)h(-?\d+(?:\.\d+)?)v(-?\d+(?:\.\d+)?)h(-?\d+(?:\.\d+)?)z/g;
const paths = [...source.matchAll(/<path fill="([^"]+)" d="([^"]+)"\/>/g)];
const fills = [...new Set(paths.map(([, fill]) => fill))];

const grouped = new Map();

for (const [, fill, d] of paths) {
  for (const match of d.matchAll(rectPattern)) {
    const [, xRaw, yRaw, widthRaw, heightRaw, closeRaw] = match;
    const x = Number(xRaw);
    const y = Number(yRaw);
    const rectWidth = Number(widthRaw);
    const rectHeight = Number(heightRaw);
    const close = Number(closeRaw);
    const midpoint = y + rectHeight / 2;
    const band = bands.findIndex(({ maxY }) => midpoint <= maxY);
    const key = `${band}|${fill}`;
    const previous = grouped.get(key) ?? "";

    grouped.set(
      key,
      `${previous}M${x} ${y}h${rectWidth}v${rectHeight}h${close}z`
    );
  }
}

const style = `
    .wind-band {
      animation-duration: 1280ms;
      animation-iteration-count: infinite;
      animation-timing-function: steps(1, end);
      transform-box: fill-box;
      transform-origin: 50% 100%;
      will-change: transform;
    }

    .crown-high { animation-name: crown-high-sway; }
    .crown-mid { animation-name: crown-mid-sway; }
    .branch-high { animation-name: branch-high-sway; }
    .branch-low { animation-name: branch-low-sway; }
    .trunk-low { animation-name: trunk-low-sway; }
    .roots { animation-name: roots-sway; }

    @keyframes crown-high-sway {
      0%, 100% { transform: translate(0, 0); }
      12% { transform: translate(7px, 0); }
      25% { transform: translate(12px, 2px); }
      37% { transform: translate(9px, 0); }
      50% { transform: translate(2px, -1px); }
      62% { transform: translate(-6px, 0); }
      75% { transform: translate(-10px, 2px); }
      87% { transform: translate(-4px, 0); }
    }

    @keyframes crown-mid-sway {
      0%, 100% { transform: translate(0, 0); }
      12% { transform: translate(5px, 0); }
      25% { transform: translate(9px, 1px); }
      37% { transform: translate(7px, 1px); }
      50% { transform: translate(1px, 0); }
      62% { transform: translate(-4px, 0); }
      75% { transform: translate(-7px, 1px); }
      87% { transform: translate(-2px, 1px); }
    }

    @keyframes branch-high-sway {
      0%, 100% { transform: translate(0, 0); }
      12% { transform: translate(4px, 0); }
      25% { transform: translate(7px, 0); }
      37% { transform: translate(5px, 0); }
      50% { transform: translate(1px, 0); }
      62% { transform: translate(-3px, 0); }
      75% { transform: translate(-6px, 0); }
      87% { transform: translate(-2px, 0); }
    }

    @keyframes branch-low-sway {
      0%, 100% { transform: translate(0, 0); }
      12% { transform: translate(2px, 0); }
      25% { transform: translate(4px, 0); }
      37% { transform: translate(3px, 0); }
      50% { transform: translate(0, 0); }
      62% { transform: translate(-2px, 0); }
      75% { transform: translate(-4px, 0); }
      87% { transform: translate(-1px, 0); }
    }

    @keyframes trunk-low-sway {
      0%, 100% { transform: translate(0, 0); }
      25%, 37% { transform: translate(1px, 0); }
      75% { transform: translate(-1px, 0); }
    }

    @keyframes roots-sway {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(1px, 0); }
      75% { transform: translate(-1px, 0); }
    }

    .falling-leaves {
      transform-box: view-box;
      pointer-events: none;
    }

    .wind-leaf {
      animation-duration: 5600ms;
      animation-iteration-count: infinite;
      animation-timing-function: steps(1, end);
      transform-box: fill-box;
      will-change: opacity, transform;
    }

    .leaf-gust-a { animation-name: leaf-gust-a; }
    .leaf-gust-b { animation-name: leaf-gust-b; }
    .leaf-gust-c { animation-name: leaf-gust-c; }

    @keyframes leaf-gust-a {
      0% { opacity: 0; transform: translate(var(--leaf-x), var(--leaf-y)); }
      8% { opacity: 1; transform: translate(calc(var(--leaf-x) + 24px), calc(var(--leaf-y) + 10px)); }
      22% { opacity: 1; transform: translate(calc(var(--leaf-x) + 86px), calc(var(--leaf-y) + 38px)); }
      42% { opacity: 1; transform: translate(calc(var(--leaf-x) + 154px), calc(var(--leaf-y) + 84px)); }
      66% { opacity: 1; transform: translate(calc(var(--leaf-x) + 232px), calc(var(--leaf-y) + 142px)); }
      88% { opacity: 0; transform: translate(calc(var(--leaf-x) + 310px), calc(var(--leaf-y) + 206px)); }
      100% { opacity: 0; transform: translate(calc(var(--leaf-x) + 310px), calc(var(--leaf-y) + 206px)); }
    }

    @keyframes leaf-gust-b {
      0% { opacity: 0; transform: translate(var(--leaf-x), var(--leaf-y)); }
      10% { opacity: 1; transform: translate(calc(var(--leaf-x) - 18px), calc(var(--leaf-y) + 18px)); }
      28% { opacity: 1; transform: translate(calc(var(--leaf-x) + 58px), calc(var(--leaf-y) + 52px)); }
      48% { opacity: 1; transform: translate(calc(var(--leaf-x) + 132px), calc(var(--leaf-y) + 92px)); }
      70% { opacity: 1; transform: translate(calc(var(--leaf-x) + 214px), calc(var(--leaf-y) + 158px)); }
      90% { opacity: 0; transform: translate(calc(var(--leaf-x) + 284px), calc(var(--leaf-y) + 224px)); }
      100% { opacity: 0; transform: translate(calc(var(--leaf-x) + 284px), calc(var(--leaf-y) + 224px)); }
    }

    @keyframes leaf-gust-c {
      0% { opacity: 0; transform: translate(var(--leaf-x), var(--leaf-y)); }
      9% { opacity: 1; transform: translate(calc(var(--leaf-x) + 34px), calc(var(--leaf-y) + 6px)); }
      24% { opacity: 1; transform: translate(calc(var(--leaf-x) + 116px), calc(var(--leaf-y) + 46px)); }
      44% { opacity: 1; transform: translate(calc(var(--leaf-x) + 194px), calc(var(--leaf-y) + 88px)); }
      68% { opacity: 1; transform: translate(calc(var(--leaf-x) + 286px), calc(var(--leaf-y) + 148px)); }
      92% { opacity: 0; transform: translate(calc(var(--leaf-x) + 378px), calc(var(--leaf-y) + 218px)); }
      100% { opacity: 0; transform: translate(calc(var(--leaf-x) + 378px), calc(var(--leaf-y) + 218px)); }
    }

    @media (prefers-reduced-motion: reduce) {
      .wind-band,
      .wind-leaf {
        animation: none;
      }

      .wind-leaf {
        opacity: 0;
      }
    }
`;

const groups = bandNames
  .map((name, band) => {
    const children = fills
      .map((fill) => {
        const d = grouped.get(`${band}|${fill}`);
        return d ? `    <path fill="${fill}" d="${d}"/>` : "";
      })
      .filter(Boolean)
      .join("\n");

    return children
      ? `  <g class="wind-band ${name}" data-wind-band="${name}">\n${children}\n  </g>`
      : "";
  })
  .filter(Boolean)
  .join("\n\n");

const leafGroups = leaves
  .map(([x, y, colorIndex, shapeIndex, delay], index) => {
    const gust = ["a", "b", "c"][index % 3];
    const color = leafColors[colorIndex % leafColors.length];
    const shape = leafShapes[shapeIndex % leafShapes.length];
    return `    <g class="wind-leaf leaf-gust-${gust}" style="--leaf-x: ${x}px; --leaf-y: ${y}px; animation-delay: -${delay}ms;"><path fill="${color}" d="${shape}"/></g>`;
  })
  .join("\n");

const output = `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="${viewBox}"
  width="${width}"
  height="${height}"
  preserveAspectRatio="xMidYMid meet"
  shape-rendering="crispEdges"
  role="img"
  aria-labelledby="pixel-tree-wind-title pixel-tree-wind-desc">
  <title id="pixel-tree-wind-title">Animated pixel tree</title>
  <desc id="pixel-tree-wind-desc">Transparent pixel tree animation with stepped wind sway across the upper canopy and branches.</desc>
  <style><![CDATA[
${style}
  ]]></style>
${groups}
  <g class="falling-leaves" data-wind-layer="falling-leaves">
${leafGroups}
  </g>
</svg>
`;

writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${outputPath}`);
