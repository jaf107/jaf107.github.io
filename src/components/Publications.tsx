import React from 'react';
import { SectionHeader } from './Research';
import publications from '../data/publications.json';

interface Pub {
  id: string; authors: string; title: string; venue: string;
  status: string; year: string; keyResults: string[];
  links: { label: string; href: string }[];
}

export default function Publications() {
  return (
    <section id="publications" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <SectionHeader label="PEER-REVIEWED" title="Publications" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {(publications as Pub[]).map(p => (
          <article key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '1.5rem 1.75rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{p.year} · {p.status.toUpperCase()}</div>
            <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', margin: '0 0 0.4rem', lineHeight: 1.4 }}>{p.title}</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)', margin: '0 0 0.5rem' }}>{p.authors}</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', margin: '0 0 1rem' }}>{p.venue}</p>
            <div style={{ background: 'var(--bg-alt)', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>KEY RESULTS</p>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.keyResults.map((k, i) => (
                  <li key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{k}</li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {p.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '4px', textDecoration: 'none' }}>{l.label} →</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
