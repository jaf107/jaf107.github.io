import React from 'react';
import { SectionHeader } from './Research';
import publications from '../data/publications.json';

interface Pub {
  id: string; authors: string; title: string; venue: string;
  status: string; year: string; doi?: string; method?: string;
  keyResults: string[];
  links: { label: string; href: string }[];
}

export default function Publications() {
  return (
    <section id="publications" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <SectionHeader label="PEER-REVIEWED" title="Publications" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {(publications as Pub[]).map(p => (
          <article key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '10px', padding: '1.5rem 1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{p.year} · {p.status.toUpperCase()}</div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--fs-xl)', color: 'var(--text)', margin: '0 0 0.4rem', lineHeight: 1.4 }}>{p.title}</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-mid)', margin: '0 0 0.5rem' }}>{p.authors}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', fontStyle: 'italic', color: 'var(--text-muted)', margin: p.doi ? '0 0 0.4rem' : '0 0 1rem' }}>{p.venue}</p>
            {p.doi && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0 0 1rem' }}>
                DOI: <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{p.doi}</a>
              </p>
            )}
            <div style={{ background: 'var(--bg-alt)', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
              {p.method && (
                <>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.08em', margin: '0 0 0.35rem' }}>METHOD</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 0.75rem' }}>{p.method}</p>
                </>
              )}
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>RESULTS</p>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.keyResults.map((k, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-muted)', lineHeight: 1.6 }}>{k}</li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {p.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="press" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '4px', textDecoration: 'none' }}>{l.label} →</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
