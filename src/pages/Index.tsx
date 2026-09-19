import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Publications from '../components/Publications';
import News from '../components/News';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Awards from '../components/Awards';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { scrollToSection } from '../lib/scroll';

// Layout effect in the browser so a cross-page jump lands before the first paint; plain effect
// during the prerender, where layout effects only warn.
const useBeforePaintEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  // Arriving from another page (nav link on a project page): jump straight to the section.
  // A glide from an offset the visitor never saw explains nothing and fires every reveal on the way.
  useBeforePaintEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!id || !document.getElementById(id)) {
      return;
    }
    scrollToSection(id, false);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Nav />
      <main className="home">
        <Hero />
        <Research />
        <Publications />
        <News />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
