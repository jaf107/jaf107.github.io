// Fails when resume/cv.tex was changed after the published PDF was last rebuilt, so a
// CV edit can't ship while the site still serves the old PDF. Fix: run scripts/sync-cv.sh
// and commit the PDF. Needs full git history (actions/checkout with fetch-depth: 0).
import { execFileSync } from 'node:child_process';

const TEX = 'resume/cv.tex';
const PDF = 'public/Abu_Jafar_Saifullah_CV.pdf';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const lastCommit = (path) => git('log', '-1', '--format=%H', '--', path);

const tex = lastCommit(TEX);
const pdf = lastCommit(PDF);
if (!tex || !pdf) {
  console.error(`check-cv: no git history for ${tex ? PDF : TEX}; is this a shallow clone?`);
  process.exit(1);
}

// The PDF is current when its last update is the same commit as, or a descendant of,
// the last change to the .tex source.
try {
  execFileSync('git', ['merge-base', '--is-ancestor', tex, pdf]);
} catch {
  console.error(`check-cv: ${TEX} changed in ${tex.slice(0, 7)} after ${PDF} was last updated (${pdf.slice(0, 7)}).`);
  console.error('Rebuild it with scripts/sync-cv.sh and commit the PDF.');
  process.exit(1);
}
console.log(`check-cv: ${PDF} is up to date with ${TEX}.`);
