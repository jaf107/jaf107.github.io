import React from 'react';
import { SectionHeader } from './Research';
import education from '../data/education.json';

interface Edu {
  school: string; degree: string; period: string;
  note?: string; gpa: string; current?: boolean;
}

function GpaBar({ gpa }: { gpa: string }) {
  const [value, max] = gpa.split(' / ').map(Number);
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginTop: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>{value.toFixed(2)}</span>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: 'var(--text-dim)' }}>/ {max.toFixed(2)}</span>
      </div>
      <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export default function Education() {
  const entries = education as Edu[];

  return (
    <section id="education" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <SectionHeader label="ACADEMICS" title="Education" />
      <div style={{ position: 'relative', paddingLeft: '6rem' }}>
        {/* vertical connector line */}
        <div style={{ position: 'absolute', left: '3.5rem', top: '0.6rem', bottom: '0.6rem', width: '2px', background: 'var(--border)' }} />

        {entries.map((e, i) => {
          const startYear = e.period.split('–')[0].trim().split(' ').pop();
          return (
            <div key={i} style={{ position: 'relative', marginBottom: i < entries.length - 1 ? '3rem' : 0 }}>
              {/* dot on timeline */}
              <div style={{
                position: 'absolute',
                left: '-2.65rem',
                top: '0.35rem',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: e.current ? 'var(--accent)' : 'var(--border)',
                border: `2px solid ${e.current ? 'var(--accent)' : 'var(--text-dim)'}`,
                boxShadow: e.current ? '0 0 0 3px var(--accent-bg)' : 'none',
              }} />
              {/* year label */}
              <div style={{
                position: 'absolute',
                left: '-6rem',
                top: '0.15rem',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.04em',
                textAlign: 'right',
                width: '3rem',
              }}>{startYear}</div>

              {/* content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', margin: 0 }}>{e.school}</h3>
                  {e.current && (
                    <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.63rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>IN PROGRESS</span>
                  )}
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', color: 'var(--accent)', margin: '0 0 0.25rem', fontSize: '0.9rem' }}>{e.degree}</p>
                {e.note && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.2rem' }}>{e.note}</p>}
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text-dim)', margin: 0 }}>{e.period}</p>
                <div style={{ maxWidth: '260px' }}>
                  <GpaBar gpa={e.gpa} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
