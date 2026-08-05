import React from 'react';
import site from '../data/site.json';

export default function Footer() {
  return (
    <footer className="pagefoot">
      <span>{site.footer.left}</span>
      <span>{site.footer.right}</span>
    </footer>
  );
}
