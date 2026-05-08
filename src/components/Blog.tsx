import React from 'react';
import { SectionHeader } from './Research';
import blog from '../data/blog.json';

interface Post { id: string; title: string; excerpt: string; tag: string; date: string; readTime: string; }

export default function Blog() {
  return (
    <section id="blog" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <SectionHeader label="WRITING" title="Notes & Essays" />
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '640px', marginBottom: '2rem', lineHeight: 1.7 }}>
        A small backlog of essays I'm drafting — research notes from my thesis work, engineering retrospectives from Optimizely, and occasional career posts.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {(blog as Post[]).map(p => (
          <article key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.66rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em' }}>{p.tag}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{p.readTime}</span>
            </div>
            <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', margin: '0 0 0.5rem', lineHeight: 1.35 }}>{p.title}</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{p.excerpt}</p>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{p.date}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
