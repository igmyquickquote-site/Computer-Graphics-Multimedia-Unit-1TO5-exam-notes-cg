const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

const octantDots = [
  [245, 62, "(x, y)"], [298, 115, "(y, x)"], [298, 185, "(y, −x)"], [245, 238, "(x, −y)"],
  [175, 238, "(−x, −y)"], [122, 185, "(−y, −x)"], [122, 115, "(−y, x)"], [175, 62, "(−x, y)"],
];

export const CircleOctantsDiagram = () => (
  <svg viewBox="0 0 420 300" className="w-full" role="img" aria-label="8-way circle symmetry">
    <line x1="210" y1="30" x2="210" y2="270" stroke="#d4d4d8" strokeDasharray="4 3" />
    <line x1="90" y1="150" x2="330" y2="150" stroke="#d4d4d8" strokeDasharray="4 3" />
    <circle cx="210" cy="150" r="95" fill="none" stroke="#71717a" strokeWidth="1.5" />
    <path d="M210,55 A95,95 0 0 1 277,83" fill="none" stroke="#dc2626" strokeWidth="4" />
    <T x={297} y={62} size={10.5} bold fill="#dc2626">compute only</T>
    <T x={297} y={75} size={10.5} bold fill="#dc2626">this 1/8</T>
    {octantDots.map(([x, y, label], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="4.5" fill="#18181b" />
        <T x={x + (x > 210 ? 14 : -14)} y={y + (y > 150 ? 16 : -10)} size={9.5} anchor={x > 210 ? "start" : "end"} fill="#52525b">{label}</T>
      </g>
    ))}
    <T x={210} y={292} size={10.5} bold>1 computed point → 8 circle points (mirror across both axes & y=x)</T>
  </svg>
);

export const ScanlineFillDiagram = () => (
  <svg viewBox="0 0 420 240" className="w-full" role="img" aria-label="Scan-line polygon fill">
    <polygon points="70,200 120,50 260,35 350,120 300,205" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    <line x1="107" y1="90" x2="318" y2="90" stroke="#d4d4d8" strokeWidth="1.5" />
    <line x1="100" y1="110" x2="335" y2="110" stroke="#d4d4d8" strokeWidth="1.5" />
    <line x1="87" y1="150" x2="332" y2="150" stroke="#d4d4d8" strokeWidth="1.5" />
    <line x1="83" y1="170" x2="321" y2="170" stroke="#d4d4d8" strokeWidth="1.5" />
    <line x1="30" y1="130" x2="400" y2="130" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5 4" />
    <line x1="93" y1="130" x2="344" y2="130" stroke="#dc2626" strokeWidth="4" />
    <circle cx="93" cy="130" r="5" fill="#dc2626" />
    <circle cx="344" cy="130" r="5" fill="#dc2626" />
    <T x={45} y={122} size={10} bold fill="#dc2626">y = k</T>
    <T x={210} y={228} size={10.5} bold>Find edge intersections on each scan line → fill between PAIRS</T>
  </svg>
);

export const Transforms2DDiagram = () => (
  <svg viewBox="0 0 620 210" className="w-full" role="img" aria-label="Translation, rotation, scaling">
    <defs>
      <marker id="atr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill="#dc2626" />
      </marker>
    </defs>
    <rect x="50" y="110" width="45" height="45" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x="110" y="55" width="45" height="45" fill="#e4e4e7" stroke="#27272a" strokeWidth="2" />
    <line x1="96" y1="128" x2="122" y2="90" stroke="#dc2626" strokeWidth="1.6" markerEnd="url(#atr)" />
    <T x={102} y={185} size={11} bold>Translate: slide (tx, ty)</T>
    <circle cx="270" cy="155" r="4" fill="#18181b" />
    <rect x="270" y="110" width="52" height="45" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x="270" y="110" width="52" height="45" fill="#e4e4e7" stroke="#27272a" strokeWidth="2" transform="rotate(-35 270 155)" />
    <path d="M336,140 A70,70 0 0 0 322,112" fill="none" stroke="#dc2626" strokeWidth="1.6" markerEnd="url(#atr)" />
    <T x={352} y={122} size={10.5} bold fill="#dc2626">θ</T>
    <T x={305} y={185} size={11} bold>Rotate: turn θ (origin)</T>
    <circle cx="465" cy="160" r="4" fill="#18181b" />
    <rect x="465" y="123" width="37" height="37" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x="465" y="88" width="72" height="72" fill="#e4e4e7" stroke="#27272a" strokeWidth="2" opacity="0.85" />
    <line x1="504" y1="121" x2="530" y2="96" stroke="#dc2626" strokeWidth="1.6" markerEnd="url(#atr)" />
    <T x={505} y={185} size={11} bold>Scale: zoom (sx, sy)</T>
  </svg>
);

export const ReflectShearDiagram = () => (
  <svg viewBox="0 0 620 220" className="w-full" role="img" aria-label="Reflection and shear">
    <line x1="35" y1="110" x2="285" y2="110" stroke="#27272a" strokeWidth="1.5" />
    <T x={292} y={114} size={10} anchor="start">x-axis</T>
    <polygon points="100,102 150,45 210,102" fill="#e4e4e7" stroke="#27272a" strokeWidth="2" />
    <polygon points="100,118 150,175 210,118" fill="none" stroke="#71717a" strokeWidth="1.8" strokeDasharray="5 3" />
    <T x={155} y={35} size={10.5} bold>(x, y)</T>
    <T x={155} y={192} size={10.5} bold fill="#52525b">(x, −y) mirror</T>
    <T x={158} y={212} size={11} bold>Reflection about x-axis</T>
    <rect x="370" y="80" width="90" height="80" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 3" />
    <polygon points="370,160 460,160 500,80 410,80" fill="#e4e4e7" stroke="#27272a" strokeWidth="2" opacity="0.9" />
    <line x1="425" y1="70" x2="480" y2="70" stroke="#dc2626" strokeWidth="1.6" />
    <path d="M480,70 L473,66 L473,74 Z" fill="#dc2626" />
    <T x={452} y={58} size={10} bold fill="#dc2626">top slides right</T>
    <T x={448} y={212} size={11} bold>Shear-x: x&apos; = x + shx·y</T>
  </svg>
);

export const WindowViewportDiagram = () => (
  <svg viewBox="0 0 620 230" className="w-full" role="img" aria-label="Window to viewport mapping">
    <defs>
      <marker id="awv" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill="#27272a" />
      </marker>
    </defs>
    <rect x="20" y="30" width="260" height="170" fill="#fafafa" stroke="#71717a" strokeWidth="1.5" />
    <T x={150} y={22} size={10.5} bold>World coordinates</T>
    <rect x="90" y="75" width="125" height="95" fill="#fff" stroke="#27272a" strokeWidth="2" strokeDasharray="6 3" />
    <T x={152} y={68} size={10} bold>Window (WHAT)</T>
    <rect x="130" y="128" width="32" height="26" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <polygon points="124,128 146,105 168,128" fill="#d4d4d8" stroke="#27272a" strokeWidth="1.5" />
    <line x1="292" y1="115" x2="330" y2="115" stroke="#27272a" strokeWidth="2" markerEnd="url(#awv)" />
    <rect x="340" y="30" width="260" height="170" fill="#fafafa" stroke="#71717a" strokeWidth="1.5" />
    <T x={470} y={22} size={10.5} bold>Screen</T>
    <rect x="385" y="55" width="180" height="130" fill="#fff" stroke="#27272a" strokeWidth="2" />
    <T x={475} y={48} size={10} bold>Viewport (WHERE)</T>
    <rect x="445" y="125" width="52" height="42" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <polygon points="436,125 471,90 506,125" fill="#d4d4d8" stroke="#27272a" strokeWidth="1.5" />
    <T x={310} y={224} size={13} bold>Same relative position: xv = xvmin + (xw − xwmin)·sx</T>
  </svg>
);

const codes = [
  [90, 65, "1001"], [230, 65, "1000"], [370, 65, "1010"],
  [90, 145, "0001"], [370, 145, "0010"],
  [90, 225, "0101"], [230, 225, "0100"], [370, 225, "0110"],
];

export const RegionCodesDiagram = () => (
  <svg viewBox="0 0 460 300" className="w-full" role="img" aria-label="Cohen-Sutherland region codes">
    <line x1="150" y1="20" x2="150" y2="260" stroke="#a1a1aa" strokeWidth="1.2" />
    <line x1="310" y1="20" x2="310" y2="260" stroke="#a1a1aa" strokeWidth="1.2" />
    <line x1="30" y1="100" x2="430" y2="100" stroke="#a1a1aa" strokeWidth="1.2" />
    <line x1="30" y1="180" x2="430" y2="180" stroke="#a1a1aa" strokeWidth="1.2" />
    <rect x="150" y="100" width="160" height="80" fill="#fafafa" stroke="#27272a" strokeWidth="2.5" />
    <T x={230} y={135} bold size={12}>WINDOW</T>
    <T x={230} y={152} bold size={13} fill="#52525b">0000</T>
    {codes.map(([x, y, c], i) => (
      <T key={i} x={x} y={y} size={13} bold fill="#52525b">{c}</T>
    ))}
    <line x1="60" y1="118" x2="250" y2="108" stroke="#dc2626" strokeWidth="2" />
    <circle cx="150" cy="113.3" r="4.5" fill="#dc2626" />
    <T x={112} y={130} size={9.5} bold fill="#dc2626">clip here</T>
    <T x={230} y={285} size={12} bold>Bits = Top Bottom Right Left (TBRL) · OR = 0000 → accept · AND ≠ 0000 → reject</T>
  </svg>
);
