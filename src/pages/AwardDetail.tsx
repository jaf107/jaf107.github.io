import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import awards from '../data/awards.json';

interface Section { h: string; body: string; }
interface Award {
  slug: string; title: string; org?: string; year?: string; desc?: string;
  description?: string; sections?: Section[]; images?: string[];
}

export default function AwardDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const award = (awards as Award[]).find(a => a.slug === slug);

  if (!award) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', color: 'var(--accent)', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', marginBottom: '1.5rem' }}>Award not found</h1>
          <button onClick={() => navigate('/')} style={{ fontFamily: 'DM Sans, sans-serif', background: 'var(--accent)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 10vw, 12rem)', borderBottom: '1px solid var(--border)' }}>
        <button onClick={() => navigate(-1)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>
          ← BACK
        </button>
      </div>

      <div style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 10vw, 12rem)', maxWidth: '900px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#c89b00', fontSize: '1.2rem' }}>★</span>
            {award.year && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{award.year}</span>}
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>{award.title}</h1>
          {award.org && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>{award.org}</p>}
        </div>

        {award.description && (
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem' }}>{award.description}</p>
        )}

        {award.sections && award.sections.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {award.sections.map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', margin: '0 0 0.6rem' }}>{s.h}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        )}

        {award.images && award.images.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {award.images.map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)', objectFit: 'cover', aspectRatio: '4/3' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
