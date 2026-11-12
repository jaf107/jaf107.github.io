import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout, type DetailLink, type DetailSection } from '../components/detail';
import projects from '../data/projects.json';
import profile from '../data/profile.json';

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
  description?: string;
  sections: DetailSection[];
  // Each project lists only some stack rows; JSON typing gives the rest as undefined.
  stack: Partial<Record<string, string>>;
  links: DetailLink[];
  listed?: boolean;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = (projects as Project[]).find(p => p.id === id);

  // The prerendered page already has this title; keep it in step on client-side navigation.
  useEffect(() => {
    if (!project) { return; }
    const previous = document.title;
    document.title = `${project.title}: ${project.subtitle} · ${profile.name}`;
    return () => { document.title = previous; };
  }, [project]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)', marginBottom: '1.5rem' }}>Project not found</h1>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
            className="press"
            style={{ fontFamily: 'var(--font-sans)', background: 'var(--accent)', color: 'var(--accent-fg)', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}
          >← Back to projects</button>
        </div>
      </div>
    );
  }

  const metaItems = Object.entries(project.stack)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([label, value]) => ({ label, value }));

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
      backLabel={project.listed === false ? 'BACK' : 'BACK TO PROJECTS'}
    />
  );
}
