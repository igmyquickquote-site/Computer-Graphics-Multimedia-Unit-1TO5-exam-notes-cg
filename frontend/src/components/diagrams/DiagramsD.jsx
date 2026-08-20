const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

const Arrow = ({ id, color = "#27272a" }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
    <path d="M0,0 L7,3 L0,6 Z" fill={color} />
  </marker>
);

export const Axes3DDiagram = () => (
  <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="3D coordinate axes">
    <defs><Arrow id="ax3" /></defs>
    <line x1="180" y1="170" x2="350" y2="170" stroke="#27272a" strokeWidth="2" markerEnd="url(#ax3)" />
    <line x1="180" y1="170" x2="180" y2="35" stroke="#27272a" strokeWidth="2" markerEnd="url(#ax3)" />
    <line x1="180" y1="170" x2="75" y2="242" stroke="#27272a" strokeWidth="2" markerEnd="url(#ax3)" />
    <circle cx="180" cy="170" r="4" fill="#18181b" />
    <T x={366} y={175} size={13} bold>+x</T>
    <T x={180} y={24} size={13} bold>+y</T>
    <T x={60} y={256} size={13} bold>+z (towards you)</T>
    <T x={205} y={192} size={10.5} fill="#52525b">origin (0,0,0)</T>    <rect x="245" y="60" width="60" height="52" fill="#fafafa" stroke="#71717a" strokeWidth="1.4" />
    <polygon points="245,60 265,44 325,44 305,60" fill="#e4e4e7" stroke="#71717a" strokeWidth="1.4" />
    <polygon points="305,60 325,44 325,96 305,112" fill="#d4d4d8" stroke="#71717a" strokeWidth="1.4" />
    <T x={285} y={135} size={10.5} fill="#52525b">3D object = vertices + edges + faces</T>
    <T x={270} y={244} size={12} bold>Right-handed: curl fingers x → y, thumb = +z</T>
  </svg>
);

export const ProjectionTreeDiagram = () => (
  <svg viewBox="0 0 560 250" className="w-full" role="img" aria-label="Projection classification">
    <rect x="220" y="10" width="120" height="32" rx="6" fill="#18181b" />
    <T x={280} y={30} bold fill="#fff" size={13}>Projections</T>
    <line x1="280" y1="42" x2="145" y2="78" stroke="#27272a" strokeWidth="1.5" />
    <line x1="280" y1="42" x2="420" y2="78" stroke="#27272a" strokeWidth="1.5" />
    <rect x="75" y="78" width="140" height="30" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={145} y={97} bold size={12}>Parallel</T>
    <rect x="350" y="78" width="140" height="30" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={420} y={97} bold size={12}>Perspective</T>
    <line x1="145" y1="108" x2="85" y2="148" stroke="#27272a" strokeWidth="1.2" />
    <line x1="145" y1="108" x2="205" y2="148" stroke="#27272a" strokeWidth="1.2" />
    <rect x="25" y="148" width="120" height="44" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={85} y={166} size={11} bold>Orthographic</T>
    <T x={85} y={182} size={9.5} fill="#52525b">90° · top/front/side</T>
    <rect x="155" y="148" width="110" height="44" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={210} y={166} size={11} bold>Oblique</T>
    <T x={210} y={182} size={9.5} fill="#52525b">Cavalier · Cabinet</T>
    <line x1="420" y1="108" x2="420" y2="148" stroke="#27272a" strokeWidth="1.2" />
    <rect x="335" y="148" width="170" height="44" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={420} y={166} size={11} bold>1 / 2 / 3 point</T>
    <T x={420} y={182} size={9.5} fill="#52525b">by vanishing points</T>
    <T x={280} y={230} size={12} bold>Parallel = true size (CAD) · Perspective = realistic (eye view)</T>
  </svg>
);

export const ParallelVsPerspectiveDiagram = () => (
  <svg viewBox="0 0 620 230" className="w-full" role="img" aria-label="Parallel vs perspective projection">
    <defs><Arrow id="app" /><Arrow id="appr" color="#dc2626" /></defs>
    <line x1="200" y1="30" x2="200" y2="180" stroke="#27272a" strokeWidth="2.5" />
    <T x={200} y={200} size={10.5} bold>View plane</T>
    <line x1="60" y1="55" x2="60" y2="145" stroke="#71717a" strokeWidth="4" />
    <T x={60} y={165} size={10} fill="#52525b">object</T>
    <line x1="60" y1="55" x2="194" y2="55" stroke="#27272a" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#app)" />
    <line x1="60" y1="100" x2="194" y2="100" stroke="#27272a" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#app)" />
    <line x1="60" y1="145" x2="194" y2="145" stroke="#27272a" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#app)" />
    <line x1="200" y1="55" x2="200" y2="145" stroke="#dc2626" strokeWidth="4" />
    <T x={130} y={222} size={11} bold>Parallel: same size image</T>
    <line x1="440" y1="30" x2="440" y2="180" stroke="#27272a" strokeWidth="2.5" />
    <T x={440} y={200} size={10.5} bold>View plane</T>
    <line x1="360" y1="55" x2="360" y2="145" stroke="#71717a" strokeWidth="4" />
    <T x={360} y={165} size={10} fill="#52525b">object</T>
    <circle cx="565" cy="100" r="5" fill="#18181b" />
    <T x={565} y={122} size={10} bold>COP (eye)</T>
    <line x1="360" y1="55" x2="565" y2="100" stroke="#27272a" strokeWidth="1.3" strokeDasharray="5 3" />
    <line x1="360" y1="145" x2="565" y2="100" stroke="#27272a" strokeWidth="1.3" strokeDasharray="5 3" />
    <line x1="440" y1="72.5" x2="440" y2="127.5" stroke="#dc2626" strokeWidth="4" />
    <T x={462} y={68} size={9.5} bold fill="#dc2626">smaller</T>
    <T x={462} y={80} size={9.5} bold fill="#dc2626">image</T>
    <T x={455} y={222} size={11} bold>Perspective: far object shrinks (÷ z)</T>
  </svg>
);

export const ZBufferDiagram = () => (
  <svg viewBox="0 0 480 240" className="w-full" role="img" aria-label="Z-buffer depth comparison">
    <rect x="180" y="70" width="200" height="120" fill="#d4d4d8" stroke="#27272a" strokeWidth="2" />
    <T x={315} y={100} size={11} bold>Surface B · z = 5 (far)</T>
    <rect x="90" y="40" width="190" height="110" fill="#fafafa" stroke="#27272a" strokeWidth="2.5" />
    <T x={165} y={72} size={11} bold>Surface A · z = 3 (close)</T>
    <circle cx="235" cy="112" r="6" fill="#dc2626" />
    <line x1="235" y1="118" x2="235" y2="168" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
    <T x={237} y={185} size={10.5} bold fill="#dc2626">overlap pixel: 3 &lt; 5 → A wins</T>
    <T x={240} y={222} size={12} bold>Depth buffer keeps the smallest z seen so far at every pixel</T>
  </svg>
);

export const BezierDiagram = () => (
  <svg viewBox="0 0 480 270" className="w-full" role="img" aria-label="Cubic Bezier curve">
    <polyline points="60,220 150,60 330,60 420,220" fill="none" stroke="#a1a1aa" strokeWidth="1.4" strokeDasharray="5 4" />
    <path d="M60,220 C150,60 330,60 420,220" fill="none" stroke="#27272a" strokeWidth="3" />
    {[[60, 220, "P0 (0,0)"], [150, 60, "P1 (2,4)"], [330, 60, "P2 (6,4)"], [420, 220, "P3 (8,0)"]].map(([x, y, l], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="5.5" fill={i === 0 || i === 3 ? "#18181b" : "#fff"} stroke="#18181b" strokeWidth="2" />
        <T x={x} y={y < 100 ? y - 12 : y + 22} size={10.5} bold>{l}</T>
      </g>
    ))}
    <circle cx="240" cy="100" r="6" fill="#dc2626" />
    <T x={240} y={126} size={10.5} bold fill="#dc2626">B(0.5) = (4, 3)</T>
    <T x={240} y={255} size={12} bold>Touches P0 &amp; P3 · pulled by P1 &amp; P2 · stays inside dashed convex hull</T>
  </svg>
);
