import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import site from '../data/site.json';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' });
  }
}

export default function Nav() {
  const { dark, toggleDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSection = (link: string) => {
    const id = link.toLowerCase();
    if (onHome) {
      scrollToId(id);
      return;
    }
    navigate('/', { state: { scrollTo: id } });
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px',
      padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--nav-bg)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'border-color 0.3s',
    }}>
      <a href="/" onClick={goHome} style={{
        fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.02rem',
        color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em',
      }}>{site.name}</a>

      <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
        <div className="navlinks">
          {site.navLinks.map(link => (
            <button key={link} onClick={() => goToSection(link)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '0.8rem',
              fontFamily: 'var(--sans)', padding: '4px 0', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >{link}</button>
          ))}
        </div>

        <a href={site.cv} target="_blank" rel="noreferrer" className="chip"
          style={{ border: '1px solid rgba(var(--accent-rgb),0.35)' }}>CV ↓</a>

        <button onClick={toggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border-md)',
            cursor: 'pointer', width: '32px', height: '32px', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text)', padding: 0,
          }}>
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
