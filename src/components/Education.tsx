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
    <div style={{ minWidth: '160px', textAlign: 'right' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '0.3rem', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{value.toFixed(2)}</span>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)' }}>/ {max.toFixed(2)}</span>
      </div>
      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: '2px' }} />
      </div>
    </div>
  );
}

export default function Education() {
  const entries = education as Edu[];

  return (
    <section id="education" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <SectionHeader label="ACADEMICS" title="Education" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {entries.map((e, i) => (
          <div
            key={i}
            style={{
              borderLeft: `2px solid ${e.current ? 'var(--accent)' : 'var(--border-md)'}`,
              paddingLeft: '2rem',
              paddingBottom: i < entries.length - 1 ? '3rem' : 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
              {/* Left: school info */}
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text)', margin: 0 }}>{e.school}</h3>
                  {e.current && (
                    <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.63rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>IN PROGRESS</span>
                  )}
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', color: 'var(--accent)', margin: '0 0 0.3rem', fontSize: '0.92rem' }}>{e.degree}</p>
                {e.note && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.25rem' }}>{e.note}</p>}
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0 }}>{e.period}</p>
              </div>

              {/* Right: GPA */}
              <GpaBar gpa={e.gpa} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
