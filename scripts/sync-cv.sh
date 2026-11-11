#!/usr/bin/env bash
# Build the Curriculum Vitae and publish it to the two places it lives:
#   1. public/Abu_Jafar_Saifullah_CV.pdf   (served at jaf107.github.io/cv)
#   2. Google Drive: My Drive/Curriculum Vitae/{Curriculum Vitae.pdf, Curriculum Vitae.tex}
#
# resume/cv.tex is the master. The Drive .tex is a copy to tailor per application
# (copy it into Drive's "Tailored" folder first, so the master copy stays clean).
#
# Usage: scripts/sync-cv.sh [--force]
#   --force  overwrite the Drive .tex even if it differs from resume/cv.tex
# Drive folder: auto-detected; override with CV_DRIVE_DIR=/path/to/folder.
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
force=0; [[ "${1:-}" == "--force" ]] && force=1

# Archive the previous PDF so before/after can be compared.
mkdir -p "$repo/resume/archive"
[[ -f "$repo/public/Abu_Jafar_Saifullah_CV.pdf" ]] &&
  cp "$repo/public/Abu_Jafar_Saifullah_CV.pdf" "$repo/resume/archive/cv-$(date +%Y%m%d-%H%M).pdf"

(cd "$repo/resume" && latexmk -pdf -interaction=nonstopmode -quiet cv.tex >/dev/null)
cp "$repo/resume/cv.pdf" "$repo/public/Abu_Jafar_Saifullah_CV.pdf"
echo "built: public/Abu_Jafar_Saifullah_CV.pdf ($(pdfinfo "$repo/resume/cv.pdf" | awk '/Pages/{print $2}') pages)"

drive="${CV_DRIVE_DIR:-}"
if [[ -z "$drive" ]]; then
  for d in "$HOME"/Library/CloudStorage/GoogleDrive-*/"My Drive/Curriculum Vitae"; do
    [[ -d "$d" ]] && drive="$d" && break
  done
fi
if [[ -z "$drive" || ! -d "$drive" ]]; then
  echo "Drive folder not found; set CV_DRIVE_DIR. Skipped Drive sync." >&2; exit 0
fi

tex="$drive/Curriculum Vitae.tex"
# Last version this script put on Drive; if Drive no longer matches it, someone edited it there.
synced="$repo/resume/archive/last-synced.tex"
[[ -f "$synced" ]] || synced="$repo/resume/cv.tex"
if [[ -f "$tex" && $force -eq 0 ]] && ! cmp -s "$tex" "$synced"; then
  echo "Drive .tex was edited since the last sync. Changes made in Drive:" >&2
  diff -u "$synced" "$tex" | head -40 >&2 || true
  echo "Copy them into resume/cv.tex, or rerun with --force to overwrite." >&2
  exit 1
fi
cp "$repo/resume/cv.tex" "$tex"
cp "$repo/resume/cv.tex" "$repo/resume/archive/last-synced.tex"
cp "$repo/resume/cv.pdf" "$drive/Curriculum Vitae.pdf"
mkdir -p "$drive/Tailored"
echo "synced: $drive"
