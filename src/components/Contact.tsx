import { useRef, useState } from "react";
import { SectionHeader } from "./Research";
import { CvIcon, GitHubIcon, LinkedInIcon, OrcidIcon, ScholarIcon } from "./icons";
import profile from "../data/profile.json";

const EMAIL = profile.email;

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@jaf107",
    href: profile.links.github,
    color: "var(--text)",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    handle: "abu-jafar-saifullah",
    href: profile.links.linkedin,
    color: "#0A66C2",
    icon: <LinkedInIcon />,
  },
  {
    label: "Google Scholar",
    handle: profile.name,
    href: profile.links.scholar,
    color: "#4285F4",
    icon: <ScholarIcon />,
  },
  {
    label: "ORCID",
    handle: profile.orcidId,
    href: profile.links.orcid,
    color: "#A6CE39",
    icon: <OrcidIcon />,
  },
  {
    label: "Curriculum Vitae",
    handle: "Download PDF",
    href: "/cv",
    color: "var(--accent)",
    icon: <CvIcon />,
  },
];


export default function Contact() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const confirmCopied = () => {
    setCopied(true);
    // A second copy restarts the confirmation instead of cutting it short.
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const fallbackCopyEmail = () => {
    const textarea = document.createElement("textarea");
    textarea.value = EMAIL;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (successful) {
      confirmCopied();
    }
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(EMAIL).then(confirmCopied).catch(fallbackCopyEmail);
      return;
    }

    fallbackCopyEmail();
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)",
      }}
    >
      <SectionHeader label="REACH OUT" title="Let's Talk" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: "1.5rem",
        }}
        className="contact-grid"
      >
        {/* CTA card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "2rem 2.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 0 4px rgba(34,197,94,0.18)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-xs)",
                  color: "var(--text-mid)",
                  letterSpacing: "0.08em",
                }}
              >
                AVAILABLE · PHD APPLICATIONS · COLLABS
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "var(--text)",
                margin: "0 0 0.6rem",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              The fastest way to reach me is email.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-md)",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Research collaborations, PhD program inquiries, or engineering
              opportunities. I read everything and reply within 48 hours.
            </p>
          </div>
          <div style={{ marginTop: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href={`mailto:${EMAIL}`}
                className="press"
                style={{
                  flex: "1 1 auto",
                  minWidth: "200px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "var(--accent)",
                  color: "var(--accent-fg)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--fs-md)",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "8px",
                  letterSpacing: "0.01em",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send an email
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy address"
                className="copy-btn"
                data-copied={copied || undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-xs)",
                  cursor: "pointer",
                  padding: "0 1.1rem",
                  borderRadius: "8px",
                  letterSpacing: "0.02em",
                }}
              >
                <span className="copy-idle">Copy address</span>
                <span className="copy-done">✓ Copied</span>
              </button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-base)",
                color: "var(--text-muted)",
                marginTop: "0.85rem",
                padding: "0.65rem 0.9rem",
                background: "var(--bg-alt)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                wordBreak: "break-all",
              }}
            >
              {EMAIL}
            </div>
          </div>
        </div>

        {/* Socials grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.85rem",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="social-card"
              style={{
                position: "relative",
                background: "var(--surface)",
                borderRadius: "14px",
                padding: "1.5rem 1.25rem 1.25rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.85rem",
                minHeight: "150px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "0.85rem",
                  right: "0.95rem",
                  color: "var(--text-dim)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-sm)",
                }}
              >
                ↗
              </span>
              <span style={{ color: s.color, display: "inline-flex" }}>
                {s.icon}
              </span>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--fs-md)",
                    color: "var(--text)",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-xs)",
                    color: "var(--text-muted)",
                  }}
                >
                  {s.handle}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Meta strip */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem 2.25rem",
          padding: "1rem 1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          justifyContent: "space-around",
        }}
      >
        {[
          { l: "LOCATION", v: "Dhaka, Bangladesh" },
          { l: "TIMEZONE", v: "GMT+6 (BST)" },
          { l: "PHONE", v: "+880 1717 743519" },
          { l: "RESPONSE", v: "< 48 hours" },
        ].map((m) => (
          <div key={m.l}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-2xs)",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              {m.l}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-base)",
                color: "var(--text-mid)",
              }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <style>{`@media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
