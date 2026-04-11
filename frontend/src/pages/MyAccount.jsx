import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
const sidebarLinks = [
  { icon: "🔍", label: "Discover" },
  { icon: "🔖", label: "Saved Listings" },
  { icon: "📄", label: "Applications" },
  { icon: "👤", label: "My Account", active: true },
];

const tags = ["Post-Grad", "Economics Major", "Quiet Study Seeker"];

const savedListings = [
  {
    id: 1,
    name: "The Heritage Attic",
    price: "₹14k",
    dist: "0.8 km from University",
    amenities: ["High Speed Wi-Fi", "Meal Plan"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    id: 2,
    name: "Oxford Square Villa",
    price: "₹18k",
    dist: "1.2 km from Campus",
    amenities: ["Quiet Zone", "Private Bath"],
    img: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=400&q=80",
  },
];

const applicationSteps = [
  {
    id: 1,
    label: "Application Submitted",
    date: "Aug 12, 2024",
    done: true,
  },
  {
    id: 2,
    label: "In Review",
    date: "Est. outcome in 2 days",
    active: true,
    note: "The curator is currently verifying your university enrollment documents.",
  },
  {
    id: 3,
    label: "Deposit Pending",
    date: "Stage 3 of 4",
  },
];

export default function MyAccount() {
  const [activeNav, setActiveNav] = useState("My Account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
    
  
    <Navbar/>
    <div style={{ minHeight: "100vh", backgroundColor: "#f0eeff", fontFamily: "sans-serif" }}>

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-sm">
        <button onClick={() => setSidebarOpen(true)}>☰</button>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex" }}>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          style={{
            width: 220,
            minWidth: 220,
            background: "#fff",
            borderRight: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "28px 16px 24px",
            minHeight: "100vh",
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
          }}
        >
          {/* Logo */}
          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#4338ca" }}>The Curator</div>
              <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.12em", marginTop: 2 }}>
                ACADEMIC HOUSING
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sidebarLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => setActiveNav(link.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: activeNav === link.label ? 600 : 400,
                    background: activeNav === link.label ? "#ede9fe" : "transparent",
                    color: activeNav === link.label ? "#4338ca" : "#6b7280",
                    textAlign: "left",
                    transition: "background 0.15s",
                    borderLeft: activeNav === link.label ? "3px solid #4338ca" : "3px solid transparent",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <button
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              marginTop: 32,
            }}
          >
            List a Property
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: "28px 32px", minWidth: 0 }}>

          {/* PROFILE CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "24px 28px",
              marginBottom: 28,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                style={{ width: 90, height: 90, borderRadius: 14, objectFit: "cover", display: "block" }}
                alt="Rahul Modak"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#10b981",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                }}
              >
                ✓ VERIFIED
              </div>
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#1f2937" }}>Rahul Modak</h1>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#6b7280" }}>
                🎓 University of Calcutta &nbsp;•&nbsp; 📍 Kolkata, WB
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 14px",
                      fontSize: 12,
                      borderRadius: 20,
                      background: "#ede9fe",
                      color: "#4338ca",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM GRID: Listings + Right Panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }}>

            {/* LEFT: Saved Listings */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1f2937" }}>Saved Listings</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
                    Properties you are tracking for the Fall semester.
                  </p>
                </div>
                <button style={{ background: "none", border: "none", color: "#6366f1", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                  View All
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
                {savedListings.map((listing) => (
                  <div
                    key={listing.id}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={listing.img}
                        style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                        alt={listing.name}
                      />
                      <button
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "#f97316",
                          border: "none",
                          borderRadius: 8,
                          width: 32,
                          height: 32,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          color: "#fff",
                        }}
                      >
                        🔖
                      </button>
                    </div>

                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>{listing.name}</span>
                        <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 14 }}>
                          {listing.price}<span style={{ fontSize: 11, fontWeight: 400 }}>/mo</span>
                        </span>
                      </div>

                      <p style={{ margin: "0 0 10px", fontSize: 12, color: "#9ca3af" }}>
                        ➤ {listing.dist}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {listing.amenities.map((a) => (
                          <span
                            key={a}
                            style={{
                              padding: "4px 10px",
                              fontSize: 11,
                              borderRadius: 20,
                              background: "#ede9fe",
                              color: "#4338ca",
                              fontWeight: 500,
                            }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Academic Fit Score */}
              <div
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  borderRadius: 18,
                  padding: "22px 22px 20px",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 8 }}>✦</div>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
                  Your Academic Fit<br />Score is 94%
                </div>
                <p style={{ fontSize: 12, opacity: 0.8, margin: "0 0 16px" }}>
                  Based on your proximity to the economics department and library hours preference.
                </p>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "underline",
                    opacity: 0.9,
                  }}
                >
                  View Curated Insights
                </a>
              </div>

              {/* Current Application */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: "20px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
                  Current Application
                </h3>

                {/* Property row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                    padding: "12px",
                    background: "#f8f7ff",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "#e0e7ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    🏢
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>The Scholar's Suite</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>App ID: #88219-BK</div>
                  </div>
                </div>

                {/* Steps */}
                <div style={{ position: "relative", paddingLeft: 28 }}>
                  {/* Vertical line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 9,
                      top: 10,
                      bottom: 10,
                      width: 2,
                      background: "#e5e7eb",
                      borderRadius: 2,
                    }}
                  />

                  {applicationSteps.map((step, i) => (
                    <div key={step.id} style={{ position: "relative", marginBottom: i < applicationSteps.length - 1 ? 20 : 0 }}>
                      {/* Step dot */}
                      <div
                        style={{
                          position: "absolute",
                          left: -28,
                          top: 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: step.done ? "#6366f1" : step.active ? "#fff" : "#f3f4f6",
                          border: step.active ? "2px solid #6366f1" : step.done ? "none" : "2px solid #d1d5db",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 1,
                        }}
                      >
                        {step.done && (
                          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                        )}
                        {step.active && (
                          <span style={{ fontSize: 8, color: "#6366f1" }}>●</span>
                        )}
                      </div>

                      <div style={{ fontWeight: step.active ? 700 : 500, fontSize: 13, color: step.active ? "#4338ca" : "#374151" }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{step.date}</div>

                      {step.note && (
                        <div
                          style={{
                            marginTop: 8,
                            padding: "10px 12px",
                            background: "#ede9fe",
                            borderRadius: 10,
                            fontSize: 12,
                            color: "#4338ca",
                            lineHeight: 1.5,
                          }}
                        >
                          {step.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    width: "100%",
                    marginTop: 20,
                    padding: "11px 0",
                    borderRadius: 12,
                    border: "1.5px solid #6366f1",
                    background: "#fff",
                    color: "#4338ca",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  View Application Details
                </button>
              </div>

              {/* Student Guarantee */}
              <div
                style={{
                  background: "#99f6e4",
                  borderRadius: 16,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>🛡</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", color: "#065f46", marginBottom: 4 }}>
                    STUDENT GUARANTEE
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#064e3b", lineHeight: 1.5 }}>
                    Your data is secured by University Partnerships Protocol.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #ddd8f0",
          marginTop: 48,
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          background: "#fff",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#4338ca" }}>The Academic Curator</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
            © 2024 THE ACADEMIC CURATOR. CURATING INTELLECTUAL GROWTH.
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 11, color: "#6b7280", letterSpacing: "0.05em" }}>
          {["PRIVACY POLICY", "TERMS OF SERVICE", "UNIVERSITY PARTNERSHIPS", "CONTACT SUPPORT"].map((link) => (
            <span key={link} style={{ cursor: "pointer" }}>{link}</span>
          ))}
        </div>
      </footer>
    </div>
      </>
  );
}