import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = ['Experience', 'Projects', 'Research', 'Publications', 'Contact'];

function scrollTo(id: string) {
  const el = document.getElementById(id.toLowerCase());
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Nav() {
  const { dark, toggleDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 clamp(1.5rem, 5vw, 4rem)', height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <a href="#hero" style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.85rem',
        color: 'var(--accent)', letterSpacing: '0.05em', textDecoration: 'none',
      }}>{'<AJS />'}</a>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => scrollTo(link)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '0.82rem',
            fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.04em',
            padding: '4px 0', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >{link}</button>
        ))}

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
          fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
          color: 'var(--accent)', border: '1px solid var(--accent)',
          padding: '6px 14px', borderRadius: '4px', textDecoration: 'none',
        }}>GitHub</a>
      </div>
    </nav>
  );
}
