import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Nav from "../components/Nav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 1.5rem 0', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', marginBottom: '1.5rem' }}>Page not found</h1>
          <Link to="/" className="press" style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', fontWeight: 600, background: 'var(--accent)', color: 'var(--accent-fg)', padding: '10px 24px', borderRadius: '6px' }}>
            ← Back to home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
