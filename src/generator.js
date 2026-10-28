const CLASSES = ["Sentinel", "Oracle", "Phantom", "Explorer", "Sovereign"];
const PALETTES = [
  { name: "Solar Ember", bg: "#261812", accent: "#ffa041", glow: "#ff4646", text: "#fff1d6" },
  { name: "Neon Abyss", bg: "#10152b", accent: "#69f0ff", glow: "#b15cff", text: "#eefaff" },
  { name: "Verdant Circuit", bg: "#10251f", accent: "#78f0a7", glow: "#e3ff63", text: "#effff4" },
  { name: "Violet Protocol", bg: "#21142e", accent: "#c69aff", glow: "#ff69b4", text: "#fff1ff" },
  { name: "Arctic Signal", bg: "#10242d", accent: "#91e8ff", glow: "#ffffff", text: "#f0fcff" }
];
const ARMORS = ["Carbon", "Quantum", "Chrome", "Obsidian", "Prismatic"];
const EYES = ["Amber", "Cyan", "Violet", "Crimson", "White"];
const SHAPES = ["Hex", "Halo", "Crown", "Orbit", "Shard"];

function hash32(n, salt = 0) {
  let x = (n ^ (salt * 0x9e3779b9)) >>> 0;
  x ^= x >>> 16; x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15; x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return x >>> 0;
}
function pick(arr, seed) { return arr[hash32(seed) % arr.length]; }
function rarityFor(id) {
  if (id === 1) return "Genesis";
  if (id <= 100) return "Legendary";
  if (id <= 500) return "Epic";
  if (id <= 1500) return "Rare";
  if (id <= 4000) return "Uncommon";
  return "Common";
}
function traitsFor(id) {
  const seed = hash32(id, 37);
  return {
    className: pick(CLASSES, seed + 1),
    palette: pick(PALETTES, seed + 2),
    armor: pick(ARMORS, seed + 3),
    eyes: pick(EYES, seed + 4),
    shape: pick(SHAPES, seed + 5),
    rarity: rarityFor(id)
  };
}

export function makeMetadata(id, origin) {
  const t = traitsFor(id);
  return {
    name: `Agent Genesis #${String(id).padStart(5, "0")}`,
    description: "A procedurally generated digital intelligence from the Agent Genesis collection.",
    image: `${origin}/api/image/${id}`,
    external_url: origin,
    attributes: [
      { trait_type: "Class", value: t.className },
      { trait_type: "Rarity", value: t.rarity },
      { trait_type: "Armor", value: t.armor },
      { trait_type: "Eyes", value: t.eyes },
      { trait_type: "Sigil", value: t.shape },
      { trait_type: "Palette", value: t.palette.name },
      { trait_type: "Generation", value: "Genesis" }
    ]
  };
}

export function makeSvg(id) {
  const t = traitsFor(id);
  const p = t.palette;
  const seed = hash32(id, 99);
  const cx = 256 + ((seed % 41) - 20);
  const cy = 245 + ((hash32(id, 101) % 41) - 20);
  const rotation = hash32(id, 111) % 360;
  const sides = 6 + (hash32(id, 112) % 3);
  const points = [];
  for (let i = 0; i < sides; i++) {
    const a = (Math.PI * 2 * i / sides) - Math.PI / 2;
    const r = 104 + (hash32(id, i + 200) % 29);
    points.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  const ringCount = 3 + (hash32(id, 115) % 5);
  let rings = "";
  for (let i = 0; i < ringCount; i++) {
    const inset = 18 + i * 15;
    rings += `<rect x="${inset}" y="${inset}" width="${512 - 2 * inset}" height="${512 - 2 * inset}" rx="${18 + i * 3}" fill="none" stroke="${p.accent}" stroke-opacity="${(0.07 + i * 0.025).toFixed(2)}" stroke-width="2"/>`;
  }
  let particles = "";
  for (let i = 0; i < 42; i++) {
    const h = hash32(id, 300 + i);
    const x = h % 512, y = hash32(id, 500 + i) % 512;
    const r = 1 + (h % 3);
    particles += `<circle cx="${x}" cy="${y}" r="${r}" fill="${p.glow}" opacity=".65"/>`;
  }
  const eyeY = cy - 6;
  const eyeGap = 37 + (hash32(id, 700) % 14);
  const eyeR = t.rarity === "Genesis" ? 17 : 11 + (hash32(id, 701) % 6);
  let sigil = "";
  if (t.shape === "Halo") {
    sigil = `<circle cx="${cx}" cy="${cy - 4}" r="137" fill="none" stroke="${p.glow}" stroke-width="5" stroke-opacity=".75"/>`;
  } else if (t.shape === "Crown") {
    sigil = `<path d="M ${cx-75} ${cy-100} l 22 -38 l 35 30 l 36 -48 l 36 48 l 35 -30 l 22 38 Z" fill="${p.accent}" fill-opacity=".85"/>`;
  } else if (t.shape === "Orbit") {
    sigil = `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="65" fill="none" stroke="${p.glow}" stroke-width="5" transform="rotate(${rotation} ${cx} ${cy})"/>`;
  } else if (t.shape === "Shard") {
    sigil = `<path d="M ${cx} ${cy-155} L ${cx+42} ${cy-28} L ${cx+118} ${cy+45} L ${cx+20} ${cy+115} L ${cx-65} ${cy+90} L ${cx-120} ${cy-25} Z" fill="${p.glow}" fill-opacity=".14" stroke="${p.glow}" stroke-width="3"/>`;
  } else {
    sigil = `<polygon points="${points.join(" ")}" fill="${p.accent}" fill-opacity=".12" stroke="${p.accent}" stroke-width="4"/>`;
  }
  const idText = String(id).padStart(5, "0");
  const eyeColor = t.eyes === "Amber" ? "#ffbf5a" : t.eyes === "Cyan" ? "#62f6ff" : t.eyes === "Violet" ? "#c49bff" : t.eyes === "Crimson" ? "#ff526a" : "#ffffff";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Agent Genesis #${idText}">
<defs><radialGradient id="bg"><stop offset="0%" stop-color="${p.bg}"/><stop offset="100%" stop-color="#070910"/></radialGradient><linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${p.accent}"/><stop offset="1" stop-color="${p.glow}"/></linearGradient></defs>
<rect width="512" height="512" fill="url(#bg)"/>
${rings}${particles}
<g>${sigil}
<path d="M ${cx-91} ${cy-52} Q ${cx} ${cy-125} ${cx+91} ${cy-52} L ${cx+77} ${cy+76} Q ${cx} ${cy+137} ${cx-77} ${cy+76} Z" fill="#090c16" stroke="url(#core)" stroke-width="5"/>
<path d="M ${cx-64} ${cy-39} L ${cx-27} ${eyeY} L ${cx-8} ${cy+16} L ${cx-53} ${cy+9} Z" fill="${p.accent}" fill-opacity=".35"/>
<path d="M ${cx+64} ${cy-39} L ${cx+27} ${eyeY} L ${cx+8} ${cy+16} L ${cx+53} ${cy+9} Z" fill="${p.accent}" fill-opacity=".35"/>
<circle cx="${cx-eyeGap}" cy="${eyeY}" r="${eyeR}" fill="${eyeColor}"/><circle cx="${cx+eyeGap}" cy="${eyeY}" r="${eyeR}" fill="${eyeColor}"/>
<circle cx="${cx-eyeGap}" cy="${eyeY}" r="${Math.max(2, eyeR/3)}" fill="#07101a"/><circle cx="${cx+eyeGap}" cy="${eyeY}" r="${Math.max(2, eyeR/3)}" fill="#07101a"/>
<path d="M ${cx-25} ${cy+54} L ${cx} ${cy+66} L ${cx+25} ${cy+54}" fill="none" stroke="${p.accent}" stroke-width="4"/>
<path d="M ${cx-42} ${cy+95} L ${cx} ${cy+115} L ${cx+42} ${cy+95}" fill="none" stroke="${p.glow}" stroke-opacity=".7" stroke-width="3"/>
</g>
<text x="256" y="452" font-family="monospace" font-size="17" letter-spacing="4" text-anchor="middle" fill="${p.text}">AGENT GENESIS</text>
<text x="256" y="480" font-family="monospace" font-size="12" letter-spacing="3" text-anchor="middle" fill="${p.accent}">INTELLIGENCE UNIT ${idText}</text>
</svg>`;
}
