import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';

interface Section { h: string; body: string; }
interface Link { label: string; href: string; }
interface Project {
  id: string; title: string; subtitle: string; tech: string[];
  category: string; year: string; badge?: string; summary: string;
  headline?: string; description: string; sections: Section[];
  stack: Record<string, string>; links: Link[];
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = (projects as Project[]).find(p => p.id === id);
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', color: 'var(--accent)', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', marginBottom: '1.5rem' }}>Project not found</h1>
          <button onClick={() => navigate('/')} style={{ fontFamily: 'DM Sans, sans-serif', background: 'var(--accent)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Back nav */}
      <div style={{ padding: '1.5rem clamp(1.5rem, 10vw, 12rem)', borderBottom: '1px solid var(--border)' }}>
        <button onClick={goBack} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>
          ← BACK
        </button>
      </div>

      <div style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 10vw, 12rem)', maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em' }}>{project.category}</span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{project.year}</span>
            {project.badge && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#c89b00' }}>★ {project.badge}</span>}
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>{project.title}</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>{project.subtitle}</p>
          {project.headline && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--text-mid)', margin: 0, lineHeight: 1.7 }}>{project.headline}</p>
            </div>
          )}
        </div>

        {/* Tech stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.5rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-alt)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem' }}>{project.description}</p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {project.sections.map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', margin: '0 0 0.6rem' }}>{s.h}</h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Stack table */}
        {Object.keys(project.stack).length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>STACK</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
              {Object.entries(project.stack).map(([k, v]) => (
                <div key={k} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.7rem 1rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '2px' }}>{k.toUpperCase()}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '8px 18px', borderRadius: '4px', textDecoration: 'none' }}>
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
