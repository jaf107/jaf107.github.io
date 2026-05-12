import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout, type DetailLink, type DetailSection } from '../components/detail';
import projects from '../data/projects.json';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  category: string;
  year: string;
  badge?: string;
  summary: string;
  headline?: string;
  description: string;
  sections: DetailSection[];
  stack: Record<string, string>;
  links: DetailLink[];
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = (projects as Project[]).find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', color: 'var(--accent)', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', marginBottom: '1.5rem' }}>Project not found</h1>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
            style={{ fontFamily: 'DM Sans, sans-serif', background: 'var(--accent)', color: 'var(--accent-fg)', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}
          >← Back to projects</button>
        </div>
      </div>
    );
  }

  const metaItems = Object.entries(project.stack).map(([label, value]) => ({ label, value }));

  return (
    <DetailLayout
      category={project.category}
      year={project.year}
      badge={project.badge}
      title={project.title}
      subtitle={project.subtitle}
      headline={project.headline}
      description={project.description}
      sections={project.sections}
      techIcons={project.tech}
      metaItems={metaItems}
      links={project.links}
      backLabel="BACK TO PROJECTS"
    />
  );
}
