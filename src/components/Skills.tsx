import React from 'react';
import { SectionHeader } from './Research';
import skills from '../data/skills.json';

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="TECHNICAL" title="Skills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.1rem 1.4rem' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.8rem' }}>{cat.toUpperCase()}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {(items as string[]).map(item => (
                <span key={item} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-mid)', background: 'var(--bg-alt)', padding: '3px 9px', borderRadius: '5px', border: '1px solid var(--border)' }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
