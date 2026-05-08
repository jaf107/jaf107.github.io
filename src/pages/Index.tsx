import React from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Awards from '../components/Awards';
import Beyond from '../components/Beyond';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Research />
        <Publications />
        <Skills />
        <Education />
        <Awards />
<Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
