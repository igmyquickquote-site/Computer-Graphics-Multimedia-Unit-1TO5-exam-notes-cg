const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

const Arrow = ({ id }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
    <path d="M0,0 L7,3 L0,6 Z" fill="#27272a" />
  </marker>
);

const FlowBox = ({ x, y, w, h, title, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={x + w / 2} y={y + h / 2 - 4} bold size={12}>{title}</T>
    <T x={x + w / 2} y={y + h / 2 + 12} size={9.5} fill="#52525b">{sub}</T>
  </g>
);

export const IntroFlowDiagram = () => (
  <svg viewBox="0 0 640 110" className="w-full" role="img" aria-label="Graphics pipeline">
    <defs><Arrow id="af1" /></defs>
    <FlowBox x={10} y={25} w={140} h={60} title="User + Input" sub="mouse, keyboard" />
    <FlowBox x={175} y={25} w={150} h={60} title="CPU / GPU" sub="graphics software" />
    <FlowBox x={350} y={25} w={140} h={60} title="Frame Buffer" sub="pixel values" />
    <FlowBox x={515} y={25} w={115} h={60} title="Screen" sub="final image" />
    <line x1="150" y1="55" x2="171" y2="55" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#af1)" />
    <line x1="325" y1="55" x2="346" y2="55" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#af1)" />
    <line x1="490" y1="55" x2="511" y2="55" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#af1)" />
  </svg>
);

export const DisplayTreeDiagram = () => (
  <svg viewBox="0 0 560 250" className="w-full" role="img" aria-label="Display devices classification">
    <rect x="205" y="10" width="150" height="34" rx="6" fill="#18181b" />
    <T x={280} y={31} bold fill="#fff" size={13}>Display Devices</T>
    <line x1="280" y1="44" x2="140" y2="80" stroke="#27272a" strokeWidth="1.5" />
    <line x1="280" y1="44" x2="420" y2="80" stroke="#27272a" strokeWidth="1.5" />
    <rect x="65" y="80" width="150" height="30" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={140} y={99} bold size={12}>CRT-based</T>
    <rect x="345" y="80" width="150" height="30" rx="5" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={420} y={99} bold size={12}>Flat Panel</T>
    <line x1="140" y1="110" x2="60" y2="150" stroke="#27272a" strokeWidth="1.2" />
    <line x1="140" y1="110" x2="140" y2="150" stroke="#27272a" strokeWidth="1.2" />
    <line x1="140" y1="110" x2="220" y2="150" stroke="#27272a" strokeWidth="1.2" />
    <rect x="15" y="150" width="90" height="28" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={60} y={168} size={11}>Raster Scan</T>
    <rect x="110" y="150" width="95" height="28" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={157} y={168} size={11}>Random Scan</T>
    <rect x="210" y="150" width="60" height="28" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={240} y={168} size={11}>DVST</T>
    <line x1="420" y1="110" x2="365" y2="150" stroke="#27272a" strokeWidth="1.2" />
    <line x1="420" y1="110" x2="480" y2="150" stroke="#27272a" strokeWidth="1.2" />
    <rect x="300" y="150" width="125" height="42" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={362} y={166} size={11} bold>Emissive</T>
    <T x={362} y={182} size={10} fill="#52525b">LED, Plasma</T>
    <rect x="435" y="150" width="115" height="42" rx="5" fill="#fafafa" stroke="#71717a" />
    <T x={492} y={166} size={11} bold>Non-Emissive</T>
    <T x={492} y={182} size={10} fill="#52525b">LCD (backlight)</T>
    <T x={280} y={230} size={10} fill="#52525b">Emissive = makes its own light · Non-emissive = blocks/passes outside light</T>
  </svg>
);

export const CRTDiagram = () => (
  <svg viewBox="0 0 620 290" className="w-full" role="img" aria-label="CRT cross-section">
    <defs><Arrow id="acrt" /></defs>
    <path d="M30,110 L220,110 L490,45 L490,245 L220,180 L30,180 Z" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    <rect x="490" y="45" width="12" height="200" fill="#d4d4d8" stroke="#27272a" strokeWidth="1.5" />
    <T x={556} y={140} size={11} bold>Phosphor</T>
    <T x={556} y={154} size={11} bold>Screen</T>
    <rect x="42" y="130" width="38" height="30" rx="3" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <T x={61} y={218} size={10.5} bold>Electron Gun</T>
    <T x={61} y={231} size={9.5} fill="#52525b">(heater + cathode)</T>
    <line x1="61" y1="162" x2="61" y2="204" stroke="#71717a" strokeDasharray="3 2" />
    <rect x="96" y="122" width="8" height="46" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={100} y={95} size={10.5} bold>Control Grid</T>
    <T x={100} y={107} size={9.5} fill="#52525b">(brightness)</T>
    <line x1="100" y1="122" x2="100" y2="111" stroke="#71717a" strokeDasharray="3 2" />
    <rect x="122" y="122" width="8" height="46" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <rect x="138" y="122" width="8" height="46" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={134} y={218} size={10.5} bold>Focusing +</T>
    <T x={134} y={231} size={10.5} bold>Accelerating</T>
    <T x={134} y={243} size={9.5} fill="#52525b">anodes</T>
    <line x1="134" y1="168" x2="134" y2="204" stroke="#71717a" strokeDasharray="3 2" />
    <rect x="165" y="112" width="46" height="9" rx="2" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <rect x="165" y="169" width="46" height="9" rx="2" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <T x={188} y={95} size={10.5} bold>Vertical Deflection</T>
    <T x={188} y={107} size={9.5} fill="#52525b">plates</T>
    <line x1="188" y1="112" x2="188" y2="111" stroke="#71717a" strokeDasharray="3 2" />
    <rect x="222" y="118" width="9" height="54" rx="2" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <rect x="248" y="118" width="9" height="54" rx="2" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    <T x={241} y={218} size={10.5} bold>Horizontal Deflection</T>
    <T x={241} y={231} size={9.5} fill="#52525b">plates</T>
    <line x1="241" y1="172" x2="241" y2="204" stroke="#71717a" strokeDasharray="3 2" />
    <line x1="80" y1="145" x2="480" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#acrt)" />
    <circle cx="490" cy="99" r="6" fill="#dc2626" opacity="0.85" />
    <T x={410} y={78} size={10.5} bold fill="#dc2626">Electron beam</T>
    <T x={310} y={272} size={10} fill="#52525b">Vacuum glass tube — beam bends via deflection plates, spot glows on phosphor</T>
  </svg>
);

export const RasterDiagram = () => (
  <svg viewBox="0 0 520 300" className="w-full" role="img" aria-label="Raster scan pattern">
    <defs><Arrow id="aras" /></defs>
    <rect x="40" y="30" width="380" height="220" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    {[55, 95, 135, 175, 215].map((y, i) => (
      <g key={y}>
        <line x1="55" y1={y} x2="400" y2={y} stroke="#27272a" strokeWidth="2" markerEnd="url(#aras)" />
        {i < 4 && <line x1="405" y1={y + 2} x2="55" y2={y + 38} stroke="#71717a" strokeWidth="1.2" strokeDasharray="5 4" />}
      </g>
    ))}
    <line x1="405" y1="218" x2="52" y2="52" stroke="#27272a" strokeWidth="1.2" strokeDasharray="2 3" />
    <T x={440} y={60} anchor="start" size={11} bold>Scan line</T>
    <T x={440} y={74} anchor="start" size={9.5} fill="#52525b">(beam ON →)</T>
    <T x={440} y={110} anchor="start" size={11} bold>Horizontal</T>
    <T x={440} y={124} anchor="start" size={11} bold>retrace</T>
    <T x={440} y={138} anchor="start" size={9.5} fill="#52525b">(dashed, OFF)</T>
    <line x1="437" y1="105" x2="330" y2="108" stroke="#71717a" strokeDasharray="3 2" />
    <T x={230} y={278} size={11} bold>Vertical retrace: bottom-right → top-left (dotted), then next frame</T>
  </svg>
);

export const RandomDiagram = () => (
  <svg viewBox="0 0 520 300" className="w-full" role="img" aria-label="Random scan triangle">
    <defs><Arrow id="aran" /></defs>
    <rect x="60" y="20" width="400" height="240" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    <line x1="260" y1="55" x2="153" y2="212" stroke="#27272a" strokeWidth="2.5" markerEnd="url(#aran)" />
    <line x1="160" y1="220" x2="352" y2="220" stroke="#27272a" strokeWidth="2.5" markerEnd="url(#aran)" />
    <line x1="360" y1="212" x2="266" y2="63" stroke="#27272a" strokeWidth="2.5" markerEnd="url(#aran)" />
    <circle cx="263" cy="58" r="5" fill="#18181b" />
    <circle cx="157" cy="217" r="5" fill="#18181b" />
    <circle cx="357" cy="217" r="5" fill="#18181b" />
    <T x={263} y={45} bold size={13}>A</T>
    <T x={141} y={234} bold size={13}>B</T>
    <T x={373} y={234} bold size={13}>C</T>
    <T x={178} y={125} size={11} bold fill="#dc2626">1. A→B</T>
    <T x={258} y={241} size={11} bold fill="#dc2626">2. B→C</T>
    <T x={343} y={125} size={11} bold fill="#dc2626">3. C→A</T>
    <T x={260} y={286} size={10.5} fill="#52525b">Beam draws ONLY the 3 edges — empty screen areas are never touched</T>
  </svg>
);

export const ScanFlowDiagram = () => (
  <svg viewBox="0 0 640 130" className="w-full" role="img" aria-label="Scan conversion pipeline">
    <defs><Arrow id="ascf" /></defs>
    <FlowBox x={8} y={30} w={140} h={64} title="Primitive" sub="line, circle, polygon" />
    <FlowBox x={172} y={30} w={160} h={64} title="Algorithm" sub="DDA / Bresenham" />
    <FlowBox x={356} y={30} w={140} h={64} title="Frame Buffer" sub="pixel intensities" />
    <FlowBox x={520} y={30} w={112} h={64} title="Screen" sub="glowing pixels" />
    <line x1="148" y1="62" x2="168" y2="62" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ascf)" />
    <line x1="332" y1="62" x2="352" y2="62" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ascf)" />
    <line x1="496" y1="62" x2="516" y2="62" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ascf)" />
    <T x={320} y={118} size={10.5} fill="#52525b">Continuous geometry → discrete pixels (jagged edges = aliasing)</T>
  </svg>
);
