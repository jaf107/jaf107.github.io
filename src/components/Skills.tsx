import React from 'react';
import skills from '../data/skills.json';
import { SectionHeader } from './Research';
import { TechIcon } from './TechIcon';

export default function Skills() {
  return (
    <section id="skills" className="sec">
      <SectionHeader title="Skills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {Object.entries(skills as Record<string, string[]>).map(([cat, items]) => (
          <div key={cat} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem 1.2rem' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', margin: '0 0 0.8rem' }}>{cat.toUpperCase()}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {items.map(item => (
                <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.76rem', color: 'var(--text-mid)', background: 'var(--bg-alt)',
                  padding: '4px 9px 4px 6px', borderRadius: '5px', border: '1px solid var(--border)', lineHeight: 1 }}>
                  <TechIcon name={item} size={13} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
