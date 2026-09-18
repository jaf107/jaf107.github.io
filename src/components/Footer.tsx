import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '2rem clamp(1.5rem, 10vw, 12rem)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-dim)' }}>© 2026 Abu Jafar Saifullah</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)' }}>{'{ engineer · researcher · builder }'}</span>
    </footer>
  );
}
