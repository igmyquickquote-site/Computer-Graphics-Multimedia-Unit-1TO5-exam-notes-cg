const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

const spokes = [
  [240, 52, "Text"], [92, 105, "Image"], [388, 105, "Audio"], [128, 218, "Video"], [352, 218, "Animation"],
];

export const MMComponentsDiagram = () => (
  <svg viewBox="0 0 480 280" className="w-full" role="img" aria-label="Multimedia components">
    {spokes.map(([x, y], i) => (
      <line key={i} x1="240" y1="140" x2={x} y2={y} stroke="#71717a" strokeWidth="1.8" />
    ))}
    <rect x="170" y="118" width="140" height="44" rx="22" fill="#18181b" />
    <T x={240} y={145} bold fill="#fff" size={13}>MULTIMEDIA</T>
    {spokes.map(([x, y, label], i) => (
      <g key={label}>
        <rect x={x - 48} y={y - 16} width="96" height="32" rx="16" fill="#fff" stroke="#27272a" strokeWidth="1.6" />
        <T x={x} y={y + 4} bold size={11.5}>{label}</T>
      </g>
    ))}
    <T x={240} y={268} size={11} bold>2 or more of these together + interactivity = multimedia</T>
  </svg>
);

const bmpCells = [[4, 0], [3, 1], [4, 1], [2, 2], [3, 2], [1, 3], [2, 3], [0, 4], [1, 4], [0, 5]];

export const BitmapVectorDiagram = () => (
  <svg viewBox="0 0 620 230" className="w-full" role="img" aria-label="Bitmap vs vector">
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 6 }, (_, c) => (
        <rect key={`${r}-${c}`} x={70 + c * 28} y={30 + r * 28} width="28" height="28" fill={bmpCells.some(([cc, rr]) => cc === c && rr === r) ? "#27272a" : "#fff"} stroke="#d4d4d8" />
      ))
    )}
    <T x={154} y={222} size={11} bold>Bitmap: pixel grid — diagonal looks jagged</T>
    <path d="M390,190 C440,40 540,40 590,190" fill="none" stroke="#27272a" strokeWidth="3.5" />
    <line x1="390" y1="190" x2="440" y2="55" stroke="#a1a1aa" strokeWidth="1.2" strokeDasharray="4 3" />
    <line x1="590" y1="190" x2="540" y2="55" stroke="#a1a1aa" strokeWidth="1.2" strokeDasharray="4 3" />
    <circle cx="440" cy="55" r="4.5" fill="#fff" stroke="#18181b" strokeWidth="2" />
    <circle cx="540" cy="55" r="4.5" fill="#fff" stroke="#18181b" strokeWidth="2" />
    <circle cx="390" cy="190" r="4.5" fill="#18181b" />
    <circle cx="590" cy="190" r="4.5" fill="#18181b" />
    <T x={490} y={42} size={10} fill="#52525b">control points (maths)</T>
    <T x={490} y={222} size={11} bold>Vector: formula-drawn — smooth at any zoom</T>
  </svg>
);

const wavePts = [];
for (let x = 40; x <= 520; x += 10) {
  const y = 120 - 70 * Math.sin(((x - 40) / 160) * 2 * Math.PI);
  wavePts.push(`${x},${y.toFixed(1)}`);
}
const sampleXs = [40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520];

export const AudioSamplingDiagram = () => (
  <svg viewBox="0 0 620 240" className="w-full" role="img" aria-label="Audio sampling">
    <line x1="30" y1="120" x2="560" y2="120" stroke="#d4d4d8" strokeWidth="1" />
    <polyline points={wavePts.join(" ")} fill="none" stroke="#71717a" strokeWidth="2.2" />
    {sampleXs.map((x) => {
      const y = 120 - 70 * Math.sin(((x - 40) / 160) * 2 * Math.PI);
      return (
        <g key={x}>
          <line x1={x} y1="120" x2={x} y2={y} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx={x} cy={y} r="4.5" fill="#dc2626" />
        </g>
      );
    })}
    <T x={130} y={35} size={10.5} bold fill="#71717a">analog wave</T>
    <T x={330} y={35} size={10.5} bold fill="#dc2626">samples taken at fixed rate (Hz)</T>
    <T x={300} y={225} size={11.5} bold>Sampling = HOW OFTEN measured · Quantization = HOW MANY bits per sample</T>
  </svg>
);

export const VideoFramesDiagram = () => (
  <svg viewBox="0 0 620 200" className="w-full" role="img" aria-label="Video frames">
    <rect x="30" y="45" width="500" height="100" rx="6" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    {Array.from({ length: 12 }, (_, i) => (
      <g key={i}>
        <rect x={42 + i * 41} y={51} width="9" height="7" rx="1.5" fill="#d4d4d8" />
        <rect x={42 + i * 41} y={132} width="9" height="7" rx="1.5" fill="#d4d4d8" />
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={50 + i * 122} y={65} width="105" height="60" fill="#fff" stroke="#71717a" strokeWidth="1.5" />
        <circle cx={68 + i * 122 + i * 22} cy={107 - i * 9} r="9" fill="#27272a" />
        <T x={148 + i * 122} y={78} size={9} anchor="end" fill="#52525b" bold>frame {i + 1}</T>
      </g>
    ))}
    <T x={300} y={175} size={11.5} bold>Still frames shown fast (PAL 25 fps · NTSC 30 fps) → eye sees motion</T>
  </svg>
);

export const KeyframeTweenDiagram = () => (
  <svg viewBox="0 0 620 190" className="w-full" role="img" aria-label="Keyframes and tweening">
    <rect x="30" y="35" width="120" height="100" rx="6" fill="#fff" stroke="#27272a" strokeWidth="2.5" />
    <circle cx="65" cy="110" r="13" fill="#27272a" />
    <T x={90} y={158} size={10.5} bold>KEYFRAME 1 (artist)</T>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={165 + i * 100} y={35} width="85" height="100" rx="6" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="5 3" />
        <circle cx={195 + i * 100 + i * 8} cy={95 - i * 15} r="13" fill="none" stroke="#71717a" strokeWidth="2" strokeDasharray="4 3" />
      </g>
    ))}
    <T x={310} y={158} size={10.5} fill="#52525b">tweens — drawn by the COMPUTER</T>
    <rect x="470" y="35" width="120" height="100" rx="6" fill="#fff" stroke="#27272a" strokeWidth="2.5" />
    <circle cx="555" cy="60" r="13" fill="#27272a" />
    <T x={530} y={158} size={10.5} bold>KEYFRAME 2 (artist)</T>
    <T x={310} y={182} size={11.5} bold>Artist sets key poses → software generates the in-betweens (tweening)</T>
  </svg>
);

export const CompressionTreeDiagram = () => (
  <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label="Compression classification">
    <rect x="190" y="10" width="180" height="34" rx="6" fill="#18181b" />
    <T x={280} y={31} bold fill="#fff" size={13}>Data Compression</T>
    <line x1="280" y1="44" x2="145" y2="82" stroke="#27272a" strokeWidth="1.5" />
    <line x1="280" y1="44" x2="420" y2="82" stroke="#27272a" strokeWidth="1.5" />
    <rect x="60" y="82" width="170" height="34" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={145} y={103} bold size={12}>Lossless</T>
    <rect x="335" y="82" width="170" height="34" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={420} y={103} bold size={12}>Lossy</T>
    <rect x="45" y="136" width="200" height="56" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={145} y={156} size={11} bold>RLE · Huffman</T>
    <T x={145} y={172} size={10} fill="#52525b">PNG, GIF, ZIP</T>
    <T x={145} y={186} size={10} fill="#52525b">exact recovery, 2–4×</T>
    <rect x="320" y="136" width="200" height="56" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={420} y={156} size={11} bold>JPEG · MP3 · MPEG</T>
    <T x={420} y={172} size={10} fill="#52525b">photos, audio, video</T>
    <T x={420} y={186} size={10} fill="#52525b">detail discarded, 10–100×</T>
    <T x={280} y={222} size={11.5} bold>Text/programs need LOSSLESS · media can afford LOSSY</T>
  </svg>
);
