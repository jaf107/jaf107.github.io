import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout, type DetailMetaItem, type DetailSection } from '../components/detail';
import awards from '../data/awards.json';

interface Award {
  slug: string;
  title: string;
  org?: string;
  year?: string;
  desc?: string;
  description?: string;
  sections?: DetailSection[];
  images?: string[];
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
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'awards' } })}
            style={{ fontFamily: 'DM Sans, sans-serif', background: 'var(--accent)', color: 'var(--accent-fg)', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}
          >← Back to awards</button>
        </div>
      </div>
    );
  }

  const metaItems: DetailMetaItem[] = [];
  if (award.org) {
    metaItems.push({ label: 'Organization', value: award.org });
  }
  if (award.year) {
    metaItems.push({ label: 'Year', value: award.year });
  }

  return (
    <DetailLayout
      category="AWARD"
      year={award.year}
      title={award.title}
      subtitle={award.org}
      headline={award.desc}
      description={award.description}
      sections={award.sections}
      images={award.images}
      metaItems={metaItems}
      backLabel="BACK TO AWARDS"
    />
  );
}
