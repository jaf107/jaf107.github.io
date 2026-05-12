import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Awards from '../components/Awards';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!id) {
      return;
    }
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navigate(location.pathname, { replace: true, state: null });
      }
    };
    requestAnimationFrame(tryScroll);
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Research />
        <Publications />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
