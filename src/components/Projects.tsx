import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useTheme } from '../context/ThemeContext';
import { SKILL_ICONS, resolveIconUrl } from '../data/skillIcons';
import projects from '../data/projects.json';

interface Project {
  id: string; title: string; subtitle: string; tech: string[];
  category: string; year: string; badge?: string; summary: string;
}

const CATEGORIES = ['All', 'Research', 'AI', 'Open Source', 'Full Stack', 'Distributed Systems'];

function getMonogram(name: string) {
  const compact = name
    .replace(/\b(API|SDK|UI|Core)\b/g, '')
    .trim()
    .split(/[\s./+-]+/)
    .filter(Boolean);

  if (compact.length > 1) {
    return compact.map(part => part[0]).join('').slice(0, 3).toUpperCase();
  }

  return name.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();
}

function TechIcon({ name }: { name: string }) {
  const { dark } = useTheme();
  const [failed, setFailed] = useState(false);
  const icon = SKILL_ICONS[name];
  const iconUrl = icon?.src && !failed ? resolveIconUrl(icon.src) : null;
  const iconFilter = icon?.invertOnDark && dark ? 'brightness(0) invert(1)' : undefined;

  return (
    <span
      title={name}
      aria-label={name}
      role="img"
      style={{
        width: '24px',
        height: '24px',
        flex: '0 0 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
      }}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ display: 'block', width: '24px', height: '24px', objectFit: 'contain', filter: iconFilter }}
        />
      ) : (
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.66rem', lineHeight: 1, letterSpacing: '0.02em' }}>
          {getMonogram(name)}
        </span>
      )}
    </span>
  );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div ref={ref}
      onClick={() => navigate(`/project/${project.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${idx * 0.05}s, transform 0.5s ease ${idx * 0.05}s`,
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '10px', padding: '1.5rem',
        position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        display: 'flex', flexDirection: 'column', cursor: 'pointer',
      }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: hovered ? 'var(--accent)' : 'transparent', transition: 'background 0.2s' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{project.category}</span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{project.year}</span>
      </div>

      {project.badge && (
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#c89b00', marginBottom: '0.5rem' }}>★ {project.badge}</div>
      )}

      <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', margin: '0 0 0.25rem' }}>{project.title}</h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.9rem' }}>{project.subtitle}</p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{project.summary}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', alignItems: 'center', marginBottom: '1rem' }}>
        {project.tech.map(t => (
          <TechIcon key={t} name={t} />
        ))}
      </div>

      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: hovered ? 'var(--accent)' : 'var(--text-dim)', letterSpacing: '0.04em' }}>
        READ MORE →
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg-alt)' }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease', marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>WORK & RESEARCH</p>
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', margin: '0 0 1.5rem' }}>Projects</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
              padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
              border: `1px solid ${filter === c ? 'var(--accent)' : 'var(--border-md)'}`,
              background: filter === c ? 'var(--accent-bg)' : 'transparent',
              color: filter === c ? 'var(--accent)' : 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}>{c}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((p, i) => <ProjectCard key={p.id} project={p as Project} idx={i} />)}
      </div>
    </section>
  );
}
