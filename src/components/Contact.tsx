import React, { useState } from "react";
import { SectionHeader } from "./Research";

const EMAIL = "jafarmahin107@gmail.com";
const GOOGLE_SCHOLAR_URL =
  "https://scholar.google.com/scholar?q=%22Abu+Jafar+Saifullah%22";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@jaf107",
    href: "https://github.com/jaf107",
    color: "var(--text)",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "abu-jafar-saifullah",
    href: "https://linkedin.com/in/abu-jafar-saifullah",
    color: "#0A66C2",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
  },
  {
    label: "Google Scholar",
    handle: "Saifullah, A.J.",
    href: GOOGLE_SCHOLAR_URL,
    color: "#4285F4",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 24a7 7 0 1 1 6.32-10H22v3h-3v3h-3v-3h-1.1A7 7 0 0 1 12 24zm0-19L0 9l4 2.9V11l-2-1.4v3.9c1 .85 4.4 3 10 3s9-2.15 10-3V9.6L12 5z" />
      </svg>
    ),
  },
  {
    label: "CV / Résumé",
    handle: "Download PDF",
    href: "resume_industry.pdf",
    color: "var(--accent)",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const confirmCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
        background: "var(--bg-alt)",
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
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.72rem",
                  color: "var(--text-mid)",
                  letterSpacing: "0.08em",
                }}
              >
                AVAILABLE · PHD APPLICATIONS · COLLABS
              </span>
            </div>
            <h3
              style={{
                fontFamily: "DM Sans, sans-serif",
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
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Research collaborations, PhD program inquiries, or engineering
              opportunities — I read everything and reply within 48 hours.
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
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
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
                aria-label="Copy email"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  background: copied ? "var(--accent-bg)" : "transparent",
                  color: copied ? "var(--accent)" : "var(--text-mid)",
                  border: `1px solid ${copied ? "var(--accent)" : "var(--border-md)"}`,
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  padding: "0 1.1rem",
                  borderRadius: "8px",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s",
                }}
              >
                {copied ? "✓ Copied" : "Copy address"}
              </button>
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.85rem",
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
              style={{
                position: "relative",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.5rem 1.25rem 1.25rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.85rem",
                minHeight: "150px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "0.85rem",
                  right: "0.95rem",
                  color: "var(--text-dim)",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.8rem",
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
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.74rem",
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
                fontFamily: "DM Mono, monospace",
                fontSize: "0.65rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              {m.l}
            </div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
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
