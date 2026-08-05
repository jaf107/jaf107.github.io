import React from 'react';
import site from '../data/site.json';

const ICONS: Record<string, React.ReactNode> = {
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  ),
  scholar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 24a7 7 0 1 1 6.32-10H22v3h-3v3h-3v-3h-1.1A7 7 0 0 1 12 24zm0-19L0 9l4 2.9V11l-2-1.4v3.9c1 .85 4.4 3 10 3s9-2.15 10-3V9.6L12 5z" />
    </svg>
  ),
  cv: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9 15 12 18 15 15" />
    </svg>
  ),
};

interface ProfileRailProps {
  open: boolean;
  onToggle: () => void;
}

export default function ProfileRail({ open, onToggle }: ProfileRailProps) {
  const { roleHtml } = site;
  return (
    <aside className="rail">
      <button className="railtoggle" onClick={onToggle} aria-expanded={open}
        title={open ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}>{open ? '‹' : '›'}</button>

      {!open && (
        <div className="minicol">
          <img className="minipic" src={site.portrait} alt="Expand profile sidebar" onClick={onToggle} title="Expand sidebar" />
          {site.socials.map(s => (
            <a key={s.lbl} href={s.href} title={s.label} aria-label={s.label}
              {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {ICONS[s.icon]}
            </a>
          ))}
          <a href={site.cv} target="_blank" rel="noreferrer" title="Download CV" aria-label="Download CV">{ICONS.cv}</a>
        </div>
      )}

      <div className="railbody">
        <img className="pic" src={site.portrait} alt={site.name} />
        <h1>{site.name}</h1>
        <p className="role"><b>{roleHtml.bold}</b>{roleHtml.rest}<br />{roleHtml.line2}</p>
        <p className="loc">{site.location}</p>
        <ul className="socs">
          {site.socials.map(s => (
            <li key={s.lbl}>
              <span className="lbl">{s.lbl}</span>
              <a href={s.href} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{s.text}</a>
            </li>
          ))}
        </ul>
        <a className="cvb" href={site.cv} target="_blank" rel="noreferrer">Download CV ↓</a>
        <p className="stat">{site.railStats.map((line, i) => (
          <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
        ))}</p>
      </div>
    </aside>
  );
}
