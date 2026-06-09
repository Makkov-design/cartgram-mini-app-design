// ---- Wireframe icons (thin line, sketch-friendly) ----
const WF_PATHS = {
  home:   'M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5',
  grid:   'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  cart:   'M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H6M9 21h.01M18 21h.01',
  heart:  'M12 20.5S4 14.8 4 9.3A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.3c0 5.5-8 11.2-8 11.2Z',
  user:   'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20c1-3.5 4-5 7-5s6 1.5 7 5',
  back:   'M15 5l-7 7 7 7',
  fwd:    'M9 5l7 7-7 7',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3',
  filter: 'M4 6h16M7 12h10M10 18h4',
  sliders:'M4 8h10M18 8h2M4 16h2M10 16h10M14 6v4M8 14v4',
  plus:   'M12 5v14M5 12h14',
  minus:  'M5 12h14',
  star:   'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z',
  x:      'M6 6l12 12M18 6 6 18',
  chev:   'M9 6l6 6-6 6',
  chevd:  'M6 9l6 6 6-6',
  check:  'M5 12.5l4.5 4.5L19 7',
  trash:  'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  share:  'M16 7l-4-4-4 4M12 3v13M5 12v7h14v-7',
  bell:   'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 21h4',
  pin:    'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  card:   'M3 6h18v12H3zM3 10h18M7 15h4',
  box:    'M21 8l-9-5-9 5 9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8',
  truck:  'M3 6h11v9H3zM14 9h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  clock:  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  tag:    'M3 12l8-8h7a2 2 0 0 1 2 2v7l-8 8zM16.5 8.5h.01',
  repeat: 'M4 9a8 8 0 0 1 13-3l3 3M20 15a8 8 0 0 1-13 3l-3-3M17 3v6h-6M7 21v-6h6',
  spark:  'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  headset:'M4 13v-1a8 8 0 0 1 16 0v1M4 13a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0zM20 13a2 2 0 0 0-4 0v3a2 2 0 0 0 4 0zM18 17v1a3 3 0 0 1-3 3h-3',
};

function WFIcon({ name, size = 22, stroke = 2, fill = false, style }) {
  const d = WF_PATHS[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" style={style}
      {...(fill ? { fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1 } : {})}>
      <path d={d} />
    </svg>
  );
}

// Dashed placeholder box with an abstract "device" glyph + optional label
function WFImg({ ratio = 1, label, glyph = 'device', radius = 14, style }) {
  return (
    <div className="wf-img" style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
      <svg viewBox="0 0 60 60" className="wf-img-glyph" aria-hidden="true">
        {glyph === 'device' && <>
          <rect x="24" y="10" width="12" height="40" rx="6" />
          <line x1="30" y1="16" x2="30" y2="20" />
          <circle cx="30" cy="44" r="2.2" />
        </>}
        {glyph === 'bottle' && <>
          <path d="M26 12h8v4l3 6v26a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V22l3-6z" />
          <line x1="26" y1="30" x2="34" y2="30" />
        </>}
        {glyph === 'box' && <>
          <path d="M30 12 46 20v20L30 48 14 40V20z" />
          <path d="M14 20l16 8 16-8M30 28v20" />
        </>}
      </svg>
      {label && <span className="wf-img-label">{label}</span>}
    </div>
  );
}

Object.assign(window, { WFIcon, WFImg });
