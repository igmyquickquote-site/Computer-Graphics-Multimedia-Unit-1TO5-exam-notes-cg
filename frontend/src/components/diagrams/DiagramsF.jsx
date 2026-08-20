const T = ({ x, y, children, size = 11, anchor = "middle", bold, fill = "#27272a" }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontFamily="Inter, sans-serif" fontWeight={bold ? 700 : 500}>{children}</text>
);

const Arrow = ({ id }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
    <path d="M0,0 L7,3 L0,6 Z" fill="#27272a" />
  </marker>
);

const Box = ({ x, y, w, h, title, sub, dark }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill={dark ? "#18181b" : "#fff"} stroke="#27272a" strokeWidth="1.5" />
    <T x={x + w / 2} y={y + h / 2 - (sub ? 4 : -4)} bold size={11.5} fill={dark ? "#fff" : "#27272a"}>{title}</T>
    {sub && <T x={x + w / 2} y={y + h / 2 + 12} size={9} fill={dark ? "#d4d4d8" : "#52525b"}>{sub}</T>}
  </g>
);

export const JPEGPipelineDiagram = () => (
  <svg viewBox="0 0 640 150" className="w-full" role="img" aria-label="JPEG pipeline">
    <defs><Arrow id="ajp" /></defs>
    <Box x={8} y={40} w={100} h={56} title="RGB →" sub="YCbCr" />
    <Box x={128} y={40} w={95} h={56} title="8×8" sub="blocks" />
    <Box x={243} y={40} w={85} h={56} title="DCT" sub="frequencies" />
    <Box x={348} y={40} w={125} h={56} title="Quantization" sub="LOSSY step!" dark />
    <Box x={493} y={40} w={140} h={56} title="Zig-zag +" sub="RLE + Huffman" />
    {[108, 223, 328, 473].map((x) => (
      <line key={x} x1={x} y1="68" x2={x + 16} y2="68" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ajp)" />
    ))}
    <T x={320} y={128} size={11} bold>Only the dark box loses data — everything else is reversible</T>
  </svg>
);

const gop = [
  ["I", "#18181b", "#fff"], ["P", "#71717a", "#fff"], ["B", "#e4e4e7", "#27272a"], ["B", "#e4e4e7", "#27272a"],
  ["P", "#71717a", "#fff"], ["B", "#e4e4e7", "#27272a"], ["B", "#e4e4e7", "#27272a"], ["I", "#18181b", "#fff"],
];

export const MPEGFramesDiagram = () => (
  <svg viewBox="0 0 620 210" className="w-full" role="img" aria-label="MPEG GOP frames">
    <defs><Arrow id="amp" /></defs>
    {gop.map(([label, fill, tf], i) => (
      <g key={i}>
        <rect x={35 + i * 70} y={70} width="55" height="72" rx="4" fill={fill} stroke="#27272a" strokeWidth="1.5" />
        <T x={62 + i * 70} y={112} bold size={16} fill={tf}>{label}</T>
      </g>
    ))}
    <path d="M62,66 Q167,28 305,66" fill="none" stroke="#27272a" strokeWidth="1.4" markerEnd="url(#amp)" />
    <T x={185} y={30} size={9.5} bold>P predicted from previous I</T>
    <path d="M305,146 Q237,186 205,146" fill="none" stroke="#71717a" strokeWidth="1.4" markerEnd="url(#amp)" />
    <path d="M62,146 Q130,192 198,148" fill="none" stroke="#71717a" strokeWidth="1.4" markerEnd="url(#amp)" />
    <T x={185} y={200} size={9.5} bold fill="#52525b">B uses BOTH neighbours</T>
    <T x={470} y={185} size={10.5} bold>Sizes: I largest · P medium · B smallest</T>
  </svg>
);

export const HuffmanTreeDiagram = () => (
  <svg viewBox="0 0 480 310" className="w-full" role="img" aria-label="Huffman tree">
    <line x1="240" y1="50" x2="140" y2="125" stroke="#27272a" strokeWidth="1.6" />
    <line x1="240" y1="50" x2="340" y2="125" stroke="#27272a" strokeWidth="1.6" />
    <line x1="340" y1="125" x2="270" y2="205" stroke="#27272a" strokeWidth="1.6" />
    <line x1="340" y1="125" x2="405" y2="205" stroke="#27272a" strokeWidth="1.6" />
    <line x1="405" y1="205" x2="350" y2="272" stroke="#27272a" strokeWidth="1.6" />
    <line x1="405" y1="205" x2="452" y2="272" stroke="#27272a" strokeWidth="1.6" />
    <T x={175} y={78} size={11} bold fill="#dc2626">0</T>
    <T x={305} y={78} size={11} bold fill="#dc2626">1</T>
    <T x={290} y={160} size={11} bold fill="#dc2626">0</T>
    <T x={388} y={160} size={11} bold fill="#dc2626">1</T>
    <T x={363} y={238} size={11} bold fill="#dc2626">0</T>
    <T x={442} y={238} size={11} bold fill="#dc2626">1</T>
    <circle cx="240" cy="50" r="22" fill="#fff" stroke="#27272a" strokeWidth="2" />
    <T x={240} y={55} bold size={11}>1.0</T>
    <circle cx="340" cy="125" r="20" fill="#fff" stroke="#27272a" strokeWidth="2" />
    <T x={340} y={130} bold size={11}>0.6</T>
    <circle cx="405" cy="205" r="20" fill="#fff" stroke="#27272a" strokeWidth="2" />
    <T x={405} y={210} bold size={11}>0.3</T>
    <rect x="108" y="105" width="64" height="40" rx="6" fill="#18181b" />
    <T x={140} y={122} bold size={11} fill="#fff">A · 0.4</T>
    <T x={140} y={137} size={10} fill="#d4d4d8">code 0</T>
    <rect x="238" y="185" width="64" height="40" rx="6" fill="#18181b" />
    <T x={270} y={202} bold size={11} fill="#fff">B · 0.3</T>
    <T x={270} y={217} size={10} fill="#d4d4d8">code 10</T>
    <rect x="318" y="252" width="64" height="40" rx="6" fill="#18181b" />
    <T x={350} y={269} bold size={11} fill="#fff">C · 0.2</T>
    <T x={350} y={284} size={10} fill="#d4d4d8">code 110</T>
    <rect x="420" y="252" width="64" height="40" rx="6" fill="#18181b" />
    <T x={452} y={269} bold size={11} fill="#fff">D · 0.1</T>
    <T x={452} y={284} size={10} fill="#d4d4d8">code 111</T>
    <T x={120} y={230} size={10.5} bold>Read codes</T>
    <T x={120} y={245} size={10.5} bold>root → leaf</T>
  </svg>
);

export const CDDVDDiagram = () => (
  <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label="CD DVD spiral and pits">
    <defs><Arrow id="acd" /></defs>
    <circle cx="130" cy="115" r="88" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    <circle cx="130" cy="115" r="60" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="130" cy="115" r="40" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="130" cy="115" r="14" fill="#fff" stroke="#27272a" strokeWidth="1.5" />
    <T x={130} y={225} size={10.5} bold>One long SPIRAL track (centre → edge)</T>
    <rect x="290" y="70" width="240" height="26" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.5" />
    {[[300, 26], [346, 14], [376, 34], [428, 20], [464, 30]].map(([x, w], i) => (
      <rect key={i} x={x} y={70} width={w} height="26" fill="#27272a" />
    ))}
    <T x={315} y={58} size={10} bold>pit</T>
    <T x={415} y={58} size={10} bold fill="#52525b">land</T>
    <line x1="410" y1="150" x2="410" y2="100" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acd)" />
    <T x={410} y={168} size={10.5} bold fill="#dc2626">laser reads reflection → 0s & 1s</T>
    <T x={410} y={196} size={10.5} bold>CD 700 MB (780 nm laser)</T>
    <T x={410} y={212} size={10.5} bold>DVD 4.7 GB (650 nm, smaller pits)</T>
  </svg>
);

export const StreamingDiagram = () => (
  <svg viewBox="0 0 640 170" className="w-full" role="img" aria-label="Streaming pipeline">
    <defs><Arrow id="ast" /></defs>
    <Box x={10} y={35} w={130} h={62} title="Server" sub="video file" />
    <ellipse cx="235" cy="66" rx="62" ry="34" fill="#fafafa" stroke="#27272a" strokeWidth="1.5" />
    <T x={235} y={70} bold size={11.5}>Internet</T>
    <Box x={340} y={35} w={130} h={62} title="Buffer" sub="few seconds stored" />
    <rect x="352" y="80" width="106" height="9" rx="4" fill="#e4e4e7" />
    <rect x="352" y="80" width="66" height="9" rx="4" fill="#27272a" />
    <Box x={500} y={35} w={130} h={62} title="Player" sub="plays instantly" />
    <line x1="140" y1="66" x2="169" y2="66" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ast)" />
    <line x1="297" y1="66" x2="336" y2="66" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ast)" />
    <line x1="470" y1="66" x2="496" y2="66" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#ast)" />
    <T x={320} y={140} size={11} bold>Playback starts once the buffer has a few seconds — rest keeps arriving</T>
  </svg>
);

export const VRSetupDiagram = () => (
  <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label="VR setup loop">
    <defs><Arrow id="avr" /></defs>
    <circle cx="120" cy="85" r="26" fill="#fafafa" stroke="#27272a" strokeWidth="2" />
    <rect x="92" y="72" width="46" height="20" rx="4" fill="#18181b" />
    <T x={175} y={62} anchor="start" size={10.5} bold>HMD (stereo screens)</T>
    <line x1="120" y1="111" x2="120" y2="175" stroke="#27272a" strokeWidth="2.5" />
    <line x1="120" y1="130" x2="78" y2="158" stroke="#27272a" strokeWidth="2.5" />
    <line x1="120" y1="130" x2="162" y2="158" stroke="#27272a" strokeWidth="2.5" />
    <rect x="156" y="150" width="24" height="18" rx="5" fill="#e4e4e7" stroke="#27272a" strokeWidth="1.6" />
    <T x={168} y={196} size={10.5} bold>Data glove</T>
    <T x={120} y={210} size={10.5} bold>User</T>
    <rect x="370" y="70" width="160" height="72" rx="8" fill="#fff" stroke="#27272a" strokeWidth="2" />
    <T x={450} y={100} bold size={12}>Computer</T>
    <T x={450} y={118} size={9.5} fill="#52525b">renders the 3D world</T>
    <path d="M205,95 Q290,60 366,90" fill="none" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#avr)" />
    <T x={287} y={52} size={9.5} bold>head + hand movements</T>
    <path d="M366,130 Q290,168 205,125" fill="none" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#avr)" />
    <T x={300} y={178} size={9.5} bold fill="#dc2626">stereo images + sound</T>
    <T x={280} y={226} size={11} bold>Continuous loop = immersion (the world reacts as you move)</T>
  </svg>
);
