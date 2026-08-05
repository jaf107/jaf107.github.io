import React from 'react';
import { Link } from 'react-router-dom';
import awards from '../data/awards.json';

interface Award {
  slug: string;
  title: string;
  org: string;
  year: string;
  photo?: string;
  image?: string | null;
}

export default function Awards() {
  const all = awards as Award[];
  const withPhoto = all.filter(a => a.photo);
  const rest = all.filter(a => !a.photo);
  return (
    <section id="awards" className="sec">
      <h2 className="sec-head">Awards &amp; Achievements</h2>
      <div className="awgrid">
        {withPhoto.map(a => (
          <div className="awcard" key={a.slug}>
            <div className="frame">
              {a.image
                ? <img src={a.image} alt={a.title} loading="lazy" />
                : <div className="placeholder-frame">{a.photo}</div>}
            </div>
            <h3><Link to={`/awards/${a.slug}`}>{a.title}</Link></h3>
            {a.org && <p className="sub">{a.org}</p>}
            <p className="yr">{a.year}</p>
          </div>
        ))}
      </div>
      <div className="awrows">
        {rest.map(a => (
          <Link className="r" key={a.slug} to={`/awards/${a.slug}`}>
            <span className="d">{a.year || '—'}</span>
            <span className="t">{a.title}{a.org ? ` — ${a.org}` : ''}</span>
            <span className="d">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
