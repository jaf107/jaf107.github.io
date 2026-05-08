import React from 'react';
import { SectionHeader } from './Research';
import beyond from '../data/beyond.json';

export default function Beyond() {
  return (
    <section id="beyond" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="OFF-DUTY" title="Beyond Code" />
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: 'var(--text-mid)', maxWidth: '680px', margin: '0 0 2.5rem', lineHeight: 1.75, fontWeight: 300 }}>{beyond.statement}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {beyond.pursuits.map(p => (
          <div key={p.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>{p.icon}</span>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.98rem', color: 'var(--text)', margin: 0 }}>{p.title}</h3>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '1.25rem 1.5rem', maxWidth: '680px' }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>CURRENTLY READING</p>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {beyond.reading.map((r, i) => (
            <li key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{r}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
