import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🎉");

      // redirect to dashboard
      navigate("/collectuserdata");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <>
    
    
     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
 
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f4fb;
        }
 
        /* ── LEFT PANEL ── */
        .left-panel {
          position: relative;
          overflow: hidden;
          display: none;
          flex-direction: column;
          justify-content: flex-end;
          padding: 48px;
          width: 50%;
          flex-shrink: 0;
        }
 
        @media (min-width: 768px) {
          .left-panel { display: flex; }
        }
 
        .left-bg {
          position: absolute;
          inset: 0;
          background: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJOSptC5hM9A2UGJN0MZ5Fxr3UyC0y51amUhZCdh6B6vmk4NrceCZgk8pAl_36AdEEQvjUl6Zsfa-XQU93Obq701GPkxzIjnqR-5QHwzJMdW3hrGvBjyS3f_uHQkoGaZsKa-JXyRJkCznALNGQm6z0LwA6PT4YT2MfRdl9hsbgjGk9bThF_y76Rf2YjOr3fzlLlzhRNr9V0ai4Rn6PD4xxkpQJQ70dl1AqI7CpfxiRcJg7vqmw12fzFf1-NXaQgGeQVgh2gbHgGsf1') center/cover no-repeat;
        }
 
        .left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 20, 60, 0.92) 0%,
            rgba(10, 30, 80, 0.70) 50%,
            rgba(10, 20, 60, 0.55) 100%
          );
        }
 
        /* Academic pattern overlay */
        .left-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          background-image:
            radial-gradient(circle at 25% 25%, #4fc3f7 0, transparent 40%),
            radial-gradient(circle at 75% 75%, #7c4dff 0, transparent 40%);
        }
 
        .left-content {
          position: relative;
          z-index: 10;
        }
 
        .left-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 16px;
        }
 
        .left-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          max-width: 340px;
          margin-bottom: 28px;
        }
 
        .left-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.55);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
        }
 
        .left-badge-line {
          width: 44px;
          height: 2px;
          background: #4fc3f7;
        }
 
        /* ── RIGHT PANEL ── */
        .main-layout {
          display: flex;
          flex: 1;
        }
 
        .right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f4f4fb;
        }
 
        .right-inner {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
 
        .form-card {
          width: 100%;
          max-width: 460px;
        }
 
        /* ── HEADER ── */
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
          line-height: 1.2;
        }
 
        .form-subtitle {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 32px;
          line-height: 1.5;
        }
 
        /* ── FORM FIELDS ── */
        .field-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }
 
        .field-group {
          margin-bottom: 20px;
        }
 
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }
 
        .input-wrapper:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
 
        .input-icon {
          padding: 0 14px 0 16px;
          color: #9ca3af;
          font-size: 18px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
 
        .input-field {
          flex: 1;
          padding: 14px 12px 14px 0;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #1f2937;
          min-width: 0;
        }
 
        .input-field::placeholder {
          color: #9ca3af;
          font-weight: 300;
        }
 
        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 14px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          font-size: 18px;
          transition: color 0.2s;
        }
 
        .eye-btn:hover { color: #6366f1; }
 
        /* ── REMEMBER / FORGOT ── */
        .remember-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 8px;
        }
 
        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #4b5563;
          cursor: pointer;
          user-select: none;
        }
 
        .custom-checkbox {
          width: 18px;
          height: 18px;
          border: 1.5px solid #d1d5db;
          border-radius: 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
 
        .custom-checkbox.checked {
          background: #6366f1;
          border-color: #6366f1;
        }
 
        .custom-checkbox svg { display: none; }
        .custom-checkbox.checked svg { display: block; }
 
        .forgot-link {
          font-size: 0.85rem;
          color: #6366f1;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
        }
 
        .forgot-link:hover { color: #4f46e5; text-decoration: underline; }
 
        /* ── SIGN IN BUTTON ── */
        .signin-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.35);
          margin-bottom: 24px;
        }
 
        .signin-btn:hover:not(:disabled) {
          opacity: 0.93;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.45);
        }
 
        .signin-btn:disabled { opacity: 0.7; cursor: not-allowed; }
 
        /* ── DIVIDER ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          color: #9ca3af;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }
 
        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }
 
        /* ── SOCIAL BUTTONS ── */
        .social-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
 
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 16px;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
 
        .social-btn:hover {
          border-color: #6366f1;
          box-shadow: 0 2px 8px rgba(99,102,241,0.1);
          background: #f9f9ff;
        }
 
        .social-icon {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
 
        /* ── SIGN UP PROMPT ── */
        .signup-prompt {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }
 
        .signup-link {
          color: #f97316;
          font-weight: 700;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
 
        .signup-link:hover { color: #ea6b00; text-decoration: underline; }
 
        /* ── ERROR ── */
        .error-msg {
          color: #ef4444;
          font-size: 0.82rem;
          margin-bottom: 12px;
          padding: 10px 14px;
          background: #fef2f2;
          border-radius: 8px;
          border-left: 3px solid #ef4444;
        }
 
        /* ── FOOTER ── */
        .site-footer {
          background: #fff;
          border-top: 1px solid #e5e7eb;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
 
        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a2e;
        }
 
        .footer-links {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
 
        .footer-link {
          font-size: 0.8rem;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
 
        .footer-link:hover { color: #6366f1; }
 
        .footer-copy {
          font-size: 0.78rem;
          color: #9ca3af;
        }
 
        /* ── RESPONSIVE ── */
        @media (max-width: 767px) {
          .site-footer {
            flex-direction: column;
            text-align: center;
            padding: 16px;
            gap: 10px;
          }
          .footer-links { justify-content: center; gap: 16px; }
        }
 
        @media (max-width: 480px) {
          .social-row { grid-template-columns: 1fr; }
          .right-inner { padding: 28px 16px; }
        }
      `}</style>
 
      <div className="login-root">
        <div className="main-layout">
 
          {/* ── LEFT PANEL ── */}
          <section className="left-panel">
            <div className="left-bg" />
            <div className="left-overlay" />
            <div className="left-pattern" />
            <div className="left-content">
              <h1 className="left-title">The Academic<br />Curator</h1>
              <p className="left-subtitle">
                Curating premium student housing experiences for the modern scholar in the heart of Kolkata.
              </p>
              <div className="left-badge">
                <span className="left-badge-line" />
                Excellence in Residency
              </div>
            </div>
          </section>
 
          {/* ── RIGHT PANEL ── */}
          <section className="right-panel">
            <div className="right-inner">
              <div className="form-card">
 
                {/* Header */}
                <h2 className="form-title">Sign In</h2>
                <p className="form-subtitle">
                  Welcome back. Please enter your academic credentials to continue.
                </p>
 
                {/* Error */}
                {error && <div className="error-msg">{error}</div>}
 
                {/* Email */}
                <div className="field-group">
                  <label className="field-label">Email or Username</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="scholar@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
 
                {/* Password */}
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
 
                {/* Remember Me + Forgot Password */}
                <div className="remember-row">
                  <label className="remember-label" onClick={() => setRememberMe(!rememberMe)}>
                    <div className={`custom-checkbox${rememberMe ? " checked" : ""}`}>
                      <svg width="11" height="8" fill="none" viewBox="0 0 11 8">
                        <path d="M1 4l3 3L10 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    Remember Me
                  </label>
                  <button className="forgot-link" type="button">Forgot Password?</button>
                </div>
 
                {/* Submit */}
                <button
                  className="signin-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
 
                {/* Divider */}
                <div className="divider">
                  <span className="divider-line" />
                  Or continue with
                  <span className="divider-line" />
                </div>
 
                {/* Social buttons */}
                <div className="social-row">
                  <button className="social-btn" type="button">
                    <div className="social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    Google
                  </button>
                  <button className="social-btn" type="button">
                    <div className="social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    LinkedIn
                  </button>
                </div>
 
                {/* Sign Up */}
                <div className="signup-prompt">
                  Not a member yet?{" "}
                  <button
                    className="signup-link"
                    type="button"
                    onClick={() => navigate("/signup")}
                  >
                    Apply Now
                  </button>
                </div>
 
              </div>
            </div>
          </section>
        </div>
 
        {/* ── FOOTER ── */}
        <footer className="site-footer">
          <span className="footer-brand">The Academic Curator</span>
          <div className="footer-links">
            {["Privacy Policy", "Terms of Service", "Support", "Institutional Partners"].map((l) => (
              <button key={l} className="footer-link" type="button">{l}</button>
            ))}
          </div>
          <span className="footer-copy">© 2024 The Academic Curator. All rights reserved.</span>
        </footer>
      </div>
    </>
  );
}