import React from 'react';
import beyond from '../data/beyond.json';

export default function Beyond() {
  return (
    <section id="beyond" className="sec">
      <h2 className="sec-head">Beyond Code</h2>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', maxWidth: '64ch', margin: '0 0 1.75rem', lineHeight: 1.75 }}>
        {beyond.statement}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.25rem' }}>
        {beyond.pursuits.map(p => (
          <div key={p.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.15rem 1.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.55rem' }}>
              <span style={{ fontSize: '1.15rem', color: 'var(--accent)' }}>{p.icon}</span>
              <h3 style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text)', margin: 0 }}>{p.title}</h3>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.9rem' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.12em', margin: 0 }}>FRAMES</p>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{beyond.framesNote}</span>
      </div>
      <div className="photogrid">
        {beyond.photos.map(ph => (
          <figure key={ph.id}>
            <div className="pframe">
              {ph.src
                ? <img src={ph.src} alt={ph.caption} loading="lazy" />
                : <div className="placeholder-frame">{ph.caption}</div>}
            </div>
            <figcaption>{ph.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
