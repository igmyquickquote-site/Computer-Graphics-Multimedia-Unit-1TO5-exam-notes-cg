const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

export const RGBDiagram = () => (
  <svg viewBox="0 0 440 330" className="w-full" role="img" aria-label="RGB additive mixing">
    <rect x="30" y="10" width="380" height="270" rx="10" fill="#09090b" />
    <g style={{ mixBlendMode: "screen", isolation: "isolate" }}>
      <circle cx="220" cy="105" r="72" fill="#ff0000" style={{ mixBlendMode: "screen" }} />
      <circle cx="176" cy="180" r="72" fill="#00ff00" style={{ mixBlendMode: "screen" }} />
      <circle cx="264" cy="180" r="72" fill="#0000ff" style={{ mixBlendMode: "screen" }} />
    </g>
    <T x={220} y={62} bold size={14} fill="#fff">R</T>
    <T x={132} y={212} bold size={14} fill="#fff">G</T>
    <T x={308} y={212} bold size={14} fill="#000">B</T>
    <T x={181} y={140} bold size={11} fill="#000">Yellow</T>
    <T x={260} y={140} bold size={11} fill="#000">Magenta</T>
    <T x={220} y={215} bold size={11} fill="#000">Cyan</T>
    <T x={220} y={162} bold size={11} fill="#000">White</T>
    <T x={220} y={303} size={11} bold>Dark screen + ADDING lights: R+G=Yellow · G+B=Cyan · R+B=Magenta</T>
    <T x={220} y={320} size={11} bold>R+G+B = WHITE · no light = BLACK</T>
  </svg>
);

export const CMYDiagram = () => (
  <svg viewBox="0 0 440 330" className="w-full" role="img" aria-label="CMY subtractive mixing">
    <rect x="30" y="10" width="380" height="270" rx="10" fill="#ffffff" stroke="#27272a" strokeWidth="1.5" />
    <g style={{ isolation: "isolate" }}>
      <circle cx="220" cy="105" r="72" fill="#00ffff" style={{ mixBlendMode: "multiply" }} />
      <circle cx="176" cy="180" r="72" fill="#ff00ff" style={{ mixBlendMode: "multiply" }} />
      <circle cx="264" cy="180" r="72" fill="#ffff00" style={{ mixBlendMode: "multiply" }} />
    </g>
    <T x={220} y={62} bold size={14} fill="#000">C</T>
    <T x={132} y={212} bold size={14} fill="#000">M</T>
    <T x={308} y={212} bold size={14} fill="#000">Y</T>
    <T x={181} y={140} bold size={11} fill="#fff">Blue</T>
    <T x={261} y={140} bold size={11} fill="#000">Green</T>
    <T x={220} y={215} bold size={11} fill="#000">Red</T>
    <T x={220} y={166} bold size={10} fill="#fff">Black</T>
    <T x={220} y={303} size={11} bold>White paper + inks SUBTRACT light: C+M=Blue · C+Y=Green · M+Y=Red</T>
    <T x={220} y={320} size={11} bold>C+M+Y = BLACK (muddy) → add K ink · no ink = WHITE</T>
  </svg>
);

const wheelPoints = [
  [225, 150], [213.6, 107.5], [182.5, 76.4], [140, 65], [97.5, 76.4], [66.4, 107.5],
  [55, 150], [66.4, 192.5], [97.5, 223.6], [140, 235], [182.5, 223.6], [213.6, 192.5],
];

export const HSVDiagram = () => (
  <svg viewBox="0 0 600 320" className="w-full" role="img" aria-label="HSV colour wheel and hexcone">
    {wheelPoints.map((p, i) => {
      const nxt = wheelPoints[(i + 1) % 12];
      return (
        <path key={i} d={`M140,150 L${p[0]},${p[1]} A85,85 0 0 0 ${nxt[0]},${nxt[1]} Z`} fill={`hsl(${i * 30 + 15}, 85%, 55%)`} stroke="#fff" strokeWidth="1" />
      );
    })}
    <circle cx="140" cy="150" r="20" fill="#fff" stroke="#a1a1aa" />
    <T x={250} y={154} anchor="start" size={11} bold>0° Red</T>
    <T x={140} y={52} size={11} bold>90°</T>
    <T x={30} y={154} size={11} bold>180°</T>
    <T x={140} y={258} size={11} bold>270°</T>
    <T x={196} y={70} size={10} fill="#52525b">60° Yellow</T>
    <T x={78} y={70} size={10} fill="#52525b">120° Green</T>
    <T x={62} y={250} size={10} fill="#52525b">240° Blue</T>
    <T x={212} y={250} size={10} fill="#52525b">300° Magenta</T>
    <T x={140} y={290} size={11} bold>HUE = angle (0°–360°)</T>
    <T x={140} y={306} size={10} fill="#52525b">SATURATION = centre (0) → edge (1)</T>
    <ellipse cx="445" cy="70" rx="95" ry="20" fill="#fafafa" stroke="#27272a" strokeWidth="1.8" />
    <line x1="350" y1="70" x2="445" y2="250" stroke="#27272a" strokeWidth="1.8" />
    <line x1="540" y1="70" x2="445" y2="250" stroke="#27272a" strokeWidth="1.8" />
    <circle cx="445" cy="250" r="5" fill="#18181b" />
    <line x1="445" y1="250" x2="445" y2="45" stroke="#71717a" strokeWidth="1.2" strokeDasharray="4 3" />
    <circle cx="445" cy="70" r="4" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <line x1="445" y1="70" x2="536" y2="70" stroke="#dc2626" strokeWidth="1.6" />
    <T x={490} y={60} size={10} bold fill="#dc2626">S: 0 → 1</T>
    <T x={445} y={30} size={11} bold>V = 1 (bright colours, White at centre)</T>
    <T x={445} y={278} size={11} bold>V = 0 → BLACK (tip)</T>
    <T x={385} y={165} size={10} fill="#52525b" anchor="end">Value ↑</T>
    <T x={445} y={306} size={11} bold>Inverted HEXCONE — height = Value</T>
  </svg>
);

const gx = (x) => 45 + x * 42;
const gy = (y) => 300 - y * 38;
const ddaPixels = [[2, 3], [3, 4], [4, 4], [5, 5], [6, 5], [7, 6], [8, 6]];

export const DDAGridDiagram = () => (
  <svg viewBox="0 0 480 340" className="w-full" role="img" aria-label="DDA pixel grid">
    {Array.from({ length: 10 }, (_, i) => (
      <line key={`v${i}`} x1={gx(i)} y1={gy(7.4)} x2={gx(i)} y2={gy(-0.4)} stroke="#e4e4e7" strokeWidth="1" />
    ))}
    {Array.from({ length: 8 }, (_, j) => (
      <line key={`h${j}`} x1={gx(-0.4)} y1={gy(j)} x2={gx(9.4)} y2={gy(j)} stroke="#e4e4e7" strokeWidth="1" />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <T key={`xl${i}`} x={gx(i)} y={gy(-0.4) + 16} size={10} fill="#52525b">{i}</T>
    ))}
    {Array.from({ length: 8 }, (_, j) => (
      <T key={`yl${j}`} x={gx(-0.4) - 12} y={gy(j) + 4} size={10} fill="#52525b">{j}</T>
    ))}
    {ddaPixels.map(([x, y]) => (
      <rect key={`${x}-${y}`} x={gx(x) - 14} y={gy(y) - 13} width="28" height="26" fill="#18181b" rx="2" opacity="0.9" />
    ))}
    <line x1={gx(2)} y1={gy(3)} x2={gx(8)} y2={gy(6)} stroke="#dc2626" strokeWidth="2.5" />
    <circle cx={gx(2)} cy={gy(3)} r="4" fill="#dc2626" />
    <circle cx={gx(8)} cy={gy(6)} r="4" fill="#dc2626" />
    <T x={gx(2) - 4} y={gy(3) + 26} size={10.5} bold fill="#dc2626">(2,3)</T>
    <T x={gx(8) + 4} y={gy(6) - 20} size={10.5} bold fill="#dc2626">(8,6)</T>
    <rect x={gx(0) - 10} y={16} width="20" height="16" fill="#18181b" rx="2" />
    <T x={gx(0) + 18} y={28} anchor="start" size={10.5}>= plotted pixel (7 total)</T>
    <line x1={gx(4)} y1={24} x2={gx(4) + 34} y2={24} stroke="#dc2626" strokeWidth="2.5" />
    <T x={gx(4) + 42} y={28} anchor="start" size={10.5}>= true line (2,3)→(8,6)</T>
  </svg>
);
