import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import ProfileRail from '../components/ProfileRail';
import Callout from '../components/Callout';
import Intro from '../components/Intro';
import News from '../components/News';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Awards from '../components/Awards';
import Talks from '../components/Talks';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Beyond from '../components/Beyond';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const [railOpen, setRailOpen] = useState(
    () => typeof window === 'undefined' || localStorage.getItem('ajs-rail') !== 'collapsed'
  );

  const toggleRail = () => setRailOpen(o => {
    localStorage.setItem('ajs-rail', o ? 'collapsed' : 'open');
    return !o;
  });

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!id) {
      return;
    }
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' });
        navigate(location.pathname, { replace: true, state: null });
      }
    };
    requestAnimationFrame(tryScroll);
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Nav />
      <div className="page" data-rail={railOpen ? 'open' : 'collapsed'}>
        <ProfileRail open={railOpen} onToggle={toggleRail} />
        <main>
          <Callout />
          <Intro />
          <News />
          <Research />
          <Publications />
          <Projects />
          <Experience />
          <Awards />
          <Talks />
          <Skills />
          <Education />
          <Beyond />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
