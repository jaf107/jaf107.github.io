import React from 'react';
import site from '../data/site.json';
import { Md } from './Md';

export default function Intro() {
  return (
    <p className="intro">
      <Md s={site.intro} />
    </p>
  );
}
