import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0eef8;
    --card-bg: #fafaf8;
    --primary: #3d3899;
    --accent: #6b64d8;
    --accent-light: #8b85e0;
    --text-dark: #1e1b4b;
    --text-mid: #4b4880;
    --text-soft: #7c7aaa;
    --input-bg: #eeecf9;
    --radius-card: 20px;
    --radius-btn: 14px;
    --radius-input: 12px;
    --shadow-card: 0 8px 40px rgba(61,56,153,0.10);
    --shadow-btn: 0 4px 18px rgba(107,100,216,0.35);
  }

  .page {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 16px;
    position: relative;
    overflow: hidden;
  }

  /* subtle background blobs */
  .page::before, .page::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    pointer-events: none;
  }
  .page::before {
    width: 480px; height: 480px;
    background: radial-gradient(circle, #a09be8, transparent);
    top: -100px; left: -60px;
  }
  .page::after {
    width: 360px; height: 360px;
    background: radial-gradient(circle, #c4b5f4, transparent);
    bottom: -80px; right: -40px;
  }

  .container {
    width: 100%;
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  /* ── LEFT PANEL ── */
  .left {
    display: flex;
    flex-direction: column;
    gap: 28px;
    animation: fadeUp 0.6s ease both;
  }

  .logo-wrap {
    width: 64px; height: 64px;
    background: white;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(61,56,153,0.12);
  }
  .logo-wrap svg { width: 30px; height: 30px; color: var(--primary); }

  .headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.75rem);
    line-height: 1.15;
    color: var(--text-dark);
    letter-spacing: -0.5px;
  }
  .headline .accent-word { color: var(--accent); }

  .sub {
    font-size: 0.975rem;
    line-height: 1.65;
    color: var(--text-soft);
    max-width: 340px;
    font-weight: 300;
  }

  .hero-image {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 4/3;
    max-width: 440px;
  }
  .hero-image img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: saturate(0.4) brightness(0.88) hue-rotate(210deg);
  }
  .hero-image::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(107,100,216,0.25) 0%, transparent 70%);
  }
  .key-badge {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 72px; height: 72px;
    background: white;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 24px rgba(61,56,153,0.22);
    z-index: 2;
  }
  .key-badge svg { width: 32px; height: 32px; color: var(--primary); }

  /* ── RIGHT PANEL (card) ── */
  .card {
    background: var(--card-bg);
    border-radius: var(--radius-card);
    padding: 44px 40px 36px;
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeUp 0.6s 0.15s ease both;
  }

  .brand-label {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--text-dark);
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .card-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-soft);
    font-weight: 300;
    margin-bottom: 16px;
  }

  .field-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-dark);
    letter-spacing: 0.02em;
    margin-bottom: 8px;
    display: block;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 20px;
  }
  .input-icon {
    position: absolute;
    left: 16px; top: 50%; transform: translateY(-50%);
    color: var(--text-soft);
    width: 18px; height: 18px;
    pointer-events: none;
  }
  .email-input {
    width: 100%;
    padding: 14px 16px 14px 46px;
    background: var(--input-bg);
    border: 2px solid transparent;
    border-radius: var(--radius-input);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .email-input::placeholder { color: var(--text-soft); }
  .email-input:focus {
    border-color: var(--accent);
    background: #f4f2fc;
  }

  .btn-primary {
    width: 100%;
    padding: 15px 20px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-btn);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.97rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: var(--shadow-btn);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-bottom: 24px;
  }
  .btn-primary:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(107,100,216,0.42);
  }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
  .btn-primary svg { width: 18px; height: 18px; transition: transform 0.2s; }
  .btn-primary:hover:not(:disabled) svg { transform: translateX(3px); }

  .back-link {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    color: var(--text-mid);
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    border: none; background: none;
    text-decoration: none;
    transition: color 0.2s;
  }
  .back-link:hover { color: var(--primary); }
  .back-link svg { width: 15px; height: 15px; transition: transform 0.2s; }
  .back-link:hover svg { transform: translateX(-3px); }

  /* ── SUCCESS STATE ── */
  .success-state {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    padding: 24px 0;
    animation: fadeUp 0.4s ease both;
  }
  .success-icon {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow-btn);
  }
  .success-icon svg { width: 30px; height: 30px; color: white; }
  .success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--text-dark);
  }
  .success-desc {
    font-size: 0.9rem;
    color: var(--text-soft);
    text-align: center;
    line-height: 1.6;
    max-width: 280px;
    font-weight: 300;
  }

  /* ── FOOTER ── */
  .footer {
    position: fixed;
    bottom: 20px; left: 0; right: 0;
    text-align: center;
    font-size: 0.78rem;
    color: var(--text-soft);
    font-weight: 300;
  }

  /* ── HELP BUBBLE ── */
  .help-btn {
    position: fixed;
    bottom: 24px; right: 24px;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: white;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(61,56,153,0.16);
    color: var(--text-soft);
    transition: box-shadow 0.2s, color 0.2s;
  }
  .help-btn:hover { color: var(--accent); box-shadow: 0 6px 24px rgba(107,100,216,0.22); }
  .help-btn svg { width: 18px; height: 18px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 720px) {
    .container { grid-template-columns: 1fr; gap: 32px; }
    .left { align-items: center; text-align: center; }
    .sub { max-width: 100%; }
    .hero-image { max-width: 100%; }
    .card { padding: 32px 24px 28px; }
  }
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="container">

          {/* ── LEFT ── */}
          <div className="left">
            <div className="logo-wrap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>

            <h1 className="headline">
              Securing Your<br/>
              <span className="accent-word">Intellectual</span> Journey.
            </h1>

            <p className="sub">
              Academic Curator employs university-grade encryption to ensure your curated research and personal data remain strictly yours.
            </p>

            <div className="hero-image">
              {/* Fallback gradient if no image loads */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #b8b0f0 0%, #8880d8 50%, #c4b5f4 100%)"
              }}/>
              <div className="key-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── RIGHT CARD ── */}
          <div className="card">
            <p className="brand-label">Academic Curator</p>

            {!sent ? (
              <>
                <h2 className="card-title">Recover Your Access</h2>
                <p className="card-desc">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>

                <label className="field-label" htmlFor="uni-email">University Email</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="3"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                  <input
                    id="uni-email"
                    type="email"
                    className="email-input"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  />
                </div>

                <button className="btn-primary" onClick={handleSubmit} disabled={loading || !email.trim()}>
                  {loading ? "Sending…" : "Send Reset Link"}
                  {!loading && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>

                <button className="back-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Back to Sign In
                </button>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 className="success-title">Check Your Inbox</h2>
                <p className="success-desc">
                  We've sent a reset link to <strong>{email}</strong>. It expires in 15 minutes.
                </p>
                <button className="back-link" style={{marginTop: 8}} onClick={() => { setSent(false); setEmail(""); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="footer">© 2024 Academic Curator. All rights reserved.</footer>

        <button className="help-btn" title="Help">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
          </svg>
        </button>
      </div>
    </>
  );
}