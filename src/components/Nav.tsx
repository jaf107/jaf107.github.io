import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = ['Research', 'Publications', 'News', 'Projects', 'Experience', 'Contact'];

export default function Nav() {
  const { dark, toggleDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const goToSection = (link: string) => {
    setMenuOpen(false);
    const id = link.toLowerCase();
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    navigate('/', { state: { scrollTo: id } });
  };

  const solid = scrolled || menuOpen;

  return (
    <nav aria-label="Main" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 clamp(1.5rem, 5vw, 4rem)', height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: solid ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: solid ? 'blur(12px)' : 'none',
      borderBottom: solid ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <Link to="/" style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-base)',
        color: 'var(--accent)', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap',
      }}>{'<AJS />'}</Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => goToSection(link)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: 'var(--fs-sm)',
              fontFamily: 'var(--font-sans)', letterSpacing: '0.02em',
              padding: '4px 0', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >{link}</button>
          ))}
        </div>

        <button onClick={toggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border-md)',
            cursor: 'pointer', width: '34px', height: '34px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text)', padding: 0,
          }}>
          {dark ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <a href="https://github.com/jaf107" target="_blank" rel="noreferrer" style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)',
          color: 'var(--accent)', border: '1px solid var(--accent)',
          padding: '6px 14px', borderRadius: '4px', textDecoration: 'none',
        }}>GitHub</a>

        <button ref={menuButton} className="nav-menu-button" onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} aria-controls="nav-menu" aria-label="Menu"
          style={{
            background: 'var(--surface)', border: '1px solid var(--border-md)',
            cursor: 'pointer', width: '34px', height: '34px', borderRadius: '8px',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text)', padding: 0,
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={menuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div id="nav-menu" className="nav-menu" style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: 'var(--surface)', borderBottom: '1px solid var(--border-md)',
          padding: '0.25rem clamp(1.5rem, 5vw, 4rem) 0.75rem',
          display: 'flex', flexDirection: 'column',
        }}>
          {NAV_LINKS.map((link, i) => (
            <button key={link} onClick={() => goToSection(link)} style={{
              background: 'none', border: 'none', borderTop: i ? '1px solid var(--border)' : 'none',
              cursor: 'pointer', textAlign: 'left', padding: '0.8rem 0',
              color: 'var(--text)', fontSize: 'var(--fs-md)', fontFamily: 'var(--font-sans)',
            }}>{link}</button>
          ))}
        </div>
      )}

      <style>{`
        .nav-menu-button { display: none; }
        @media (max-width: 960px) {
          .nav-links { display: none !important; }
          .nav-menu-button { display: flex; }
        }
        @media (min-width: 961px) {
          .nav-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
