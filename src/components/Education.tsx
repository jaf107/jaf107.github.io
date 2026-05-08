import React from 'react';
import { SectionHeader } from './Research';
import education from '../data/education.json';

interface Edu {
  school: string; degree: string; period: string;
  note?: string; gpa: string; current?: boolean;
}

export default function Education() {
  return (
    <section id="education" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <SectionHeader label="ACADEMICS" title="Education" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(education as Edu[]).map((e, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: e.current ? '1px solid var(--border)' : '1px solid var(--border)',
            borderLeft: e.current ? '3px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '10px', padding: '1.25rem 1.5rem',
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
          }}>
            <div>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                {e.school}
                {e.current && <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>IN PROGRESS</span>}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', color: 'var(--accent)', margin: '4px 0 0', fontSize: '0.88rem' }}>{e.degree}</p>
              {e.note && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>{e.note}</p>}
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>{e.period}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 700 }}>{e.gpa.split(' / ')[0]}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: 'var(--text-muted)' }}>GPA / {e.gpa.split(' / ')[1] || '4.00'}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
