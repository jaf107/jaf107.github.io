import React from 'react';
import research from '../data/research.json';

export function SectionHeader({ title }: { title: string }) {
  return <h2 className="sec-head">{title}</h2>;
}

export default function Research() {
  return (
    <section id="research" className="sec">
      <SectionHeader title="Research" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {research.interests.map(k => (
          <span key={k} style={{
            fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-mid)',
            background: 'var(--bg-alt)', padding: '5px 13px', borderRadius: '20px',
            border: '1px solid var(--border)',
          }}>{k}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {research.affiliations.map((a, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.2rem 1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)', margin: 0 }}>{a.lab}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  <span style={{ color: 'var(--accent)' }}>{a.role}</span> · {a.advisors}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{a.period}</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: '0.6rem 0 0' }}>{a.work}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
