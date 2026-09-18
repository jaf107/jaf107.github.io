import React from 'react';
import { useInView } from '../hooks/useInView';
import research from '../data/research.json';
import { Md } from './Md';

interface Affiliation {
  lab: string; url?: string; role: string; advisors: string; period: string;
  work: string[];
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease', marginBottom: '2.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{label}</p>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', margin: 0 }}>{title}</h2>
    </div>
  );
}

export { SectionHeader };

export default function Research() {
  return (
    <section id="research" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <SectionHeader label="ACADEMIC" title="Research" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '1.5rem 2rem', marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>RESEARCH INTERESTS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {research.interests.map(k => (
            <span key={k} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text)', background: 'var(--bg-alt)', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--border-md)' }}>{k}</span>
          ))}
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--fs-xl)', color: 'var(--text)', marginBottom: '1rem' }}>Research Affiliations</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(research.affiliations as Affiliation[]).map((a, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--text)', margin: 0 }}>
                  {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--accent)', textUnderlineOffset: '3px' }}>{a.lab}</a> : a.lab}
                </h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', color: 'var(--accent)', margin: '3px 0 0', fontSize: 'var(--fs-md)' }}>
                  {a.role} <span style={{ fontStyle: 'normal', color: 'var(--text-muted)' }}>· {a.advisors}</span>
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{a.period}</span>
            </div>
            <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {a.work.map((w, j) => (
                <li key={j} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-muted)', lineHeight: 1.6 }}><Md s={w} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
