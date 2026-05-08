import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '2rem clamp(1.5rem, 10vw, 12rem)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg)' }}>
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: 'var(--text-dim)' }}>© 2026 Abu Jafar Saifullah</span>
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)', opacity: 0.7 }}>{'{ engineer · researcher · builder }'}</span>
    </footer>
  );
}
