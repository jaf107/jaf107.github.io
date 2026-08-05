import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { SectionHeader } from './Research';
import { TechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  category: string;
  year: string;
  badge?: string;
  summary: string;
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{ display: 'flex' }}>
      <Link to={`/project/${project.id}`}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: `opacity 0.5s ease ${idx * 0.05}s, transform 0.5s ease ${idx * 0.05}s, border-color 0.2s, box-shadow 0.2s`,
          background: 'var(--surface)',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '10px', padding: '1.5rem',
          position: 'relative', overflow: 'hidden', textDecoration: 'none',
          boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          display: 'flex', flexDirection: 'column', flex: 1,
        }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: hovered ? 'var(--accent)' : 'transparent', transition: 'background 0.2s' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)',
            background: 'var(--accent-bg)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{project.category}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{project.year}</span>
        </div>
        {project.badge && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>★ {project.badge}</div>
        )}
        <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', margin: '0 0 0.25rem' }}>{project.title}</h3>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.9rem' }}>{project.subtitle}</p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{project.summary}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 500,
              color: 'var(--text-mid)', background: 'var(--bg-alt)', padding: '3px 8px 3px 5px', borderRadius: '5px',
              border: '1px solid var(--border)', whiteSpace: 'nowrap', lineHeight: 1 }}>
              <TechIcon name={t} size={13} />
              <span>{t}</span>
            </span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem',
          color: hovered ? 'var(--accent)' : 'var(--text-dim)', letterSpacing: '0.04em' }}>
          READ MORE →
        </div>
      </Link>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const all = projects as Project[];
  const categories = ['All', ...Array.from(new Set(all.map(p => p.category)))];
  const filtered = filter === 'All' ? all : all.filter(p => p.category === filter);
  return (
    <section id="projects" className="sec">
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader title="Projects" />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.72rem',
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
        {filtered.map((p, i) => <ProjectCard key={p.id} project={p} idx={i} />)}
      </div>
    </section>
  );
}
