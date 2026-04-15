import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const sidebarLinks = [
  { icon: "🏠", label: "Dashboard", route: "/" },
  { icon: "🔍", label: "Search", route: "/search" },
  { icon: "🔖", label: "Saved", route: "/save" },
  { icon: "📋", label: "Applications", route: "/collectuserdata" },
  // { icon: "💬", label: "Messages" },
  // { icon: "⚙️", label: "Settings" },
];

const tags = [
  "Economics Major",
  "Fall 2024",
  "Budget: ₹12k/mo",
  "Quiet Environment",
];

const applicationSteps = [
  {
    id: 1,
    label: "Application Submitted",
    date: "Aug 3, 2024",
    done: true,
    active: false,
    note: null,
  },
  {
    id: 2,
    label: "Document Verification",
    date: "Aug 5, 2024",
    done: true,
    active: false,
    note: null,
  },
  {
    id: 3,
    label: "Landlord Review",
    date: "Aug 7, 2024",
    done: false,
    active: true,
    note: "The landlord has viewed your profile. A response is expected within 48 hours.",
  },
  {
    id: 4,
    label: "Agreement Signing",
    date: "Pending",
    done: false,
    active: false,
    note: null,
  },
  {
    id: 5,
    label: "Move-In Confirmed",
    date: "Pending",
    done: false,
    active: false,
    note: null,
  },
];

/* ─────────────────────────────────────────── */
/* Hook: tracks breakpoint via ResizeObserver  */
/* ─────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  return bp;
}

export default function CuratorDashboard() {
  const [activeNav, setActiveNav] = useState("Saved");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedListings, setSavedListings] = useState([]);
  const [likedCards, setLikedCards] = useState({ 1: true });
  const [form, setForm] = useState({
    fullName: "",
    university: "",
    profession:"",
    passoutYear: "",
    dob: "",
    location: "",
    phoneno:""
  });

  const [avatar, setAvatar] = useState(null);
  const [budget, setBudget] = useState(1200);

  const bp = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";

    const [userRole, setUserRole] = useState(null);
    
    useEffect(() => {
      const token = localStorage.getItem("token");
    
      if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUserRole(decoded.role);
      }
    }, []);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSavedListings(data.bookmarks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookmarks();
  }, []);

  const removeBookmark = async (listingId) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/bookmarks/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listingId }),
    });

    // remove from UI
    setSavedListings((prev) => prev.filter((item) => item._id !== listingId));
  };
  // Close sidebar when switching to desktop
  useEffect(() => {
    if (isDesktop) setSidebarOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setForm({
          fullName: data.data.fullName || "",
          university: data.data.universityName || "",
          profession:data.data.profession||"",
          passoutYear: data.data.passoutYear || "",
          dob: data.data.dob?.split("T")[0] || "",
          location: data.data.preferredLocation || "",
          phoneno:data.data.phoneno||""
        });

        setBudget(data.data.budget || 1200);
        setAvatar(data.data.profileImg || null);
      }
    };

    fetchProfile();
  }, []);
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const age = calculateAge(form.dob);
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .curator-root {
          min-height: 100vh;
          background: #f0eeff;
          font-family: 'Segoe UI', sans-serif;
        }

        /* ── Top bar (mobile/tablet only) ── */
        .topbar {
          display: none;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        @media (max-width: 1023px) {
          .topbar { display: flex; }
        }

        .topbar-logo { font-weight: 700; font-size: 15px; color: #4338ca; }
        .topbar-sub  { font-size: 9px; color: #9ca3af; letter-spacing: 0.1em; }

        .hamburger {
          background: none; border: none; cursor: pointer;
          padding: 6px; border-radius: 8px; font-size: 18px;
          color: #374151;
        }
        .hamburger:hover { background: #f3f4f6; }

        /* ── Layout wrapper ── */
        .layout {
          display: flex;
          width: 97%;
          margin: 0 auto;
        }
         

        /* ── Overlay ── */
        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 40;
        }
        .overlay.active { display: block; }

        /* ── Sidebar ── */
        .sidebar {
          width: 220px;
          min-width: 220px;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          padding: 28px 16px 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          align-self: flex-start;
          z-index: 50;
        }

        @media (max-width: 1023px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.28s ease;
            z-index: 50;
            overflow-y: auto;
            padding-top: 20px;
          }
          .sidebar.open { transform: translateX(0); }
        }

        .sidebar-logo-name { font-weight: 700; font-size: 16px; color: #4338ca; }
        .sidebar-logo-sub  { font-size: 10px; color: #9ca3af; letter-spacing: 0.12em; margin-top: 2px; }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          background: transparent;
          color: #6b7280;
          text-align: left;
          transition: background 0.15s;
          border-left: 3px solid transparent;
          width: 100%;
        }
        .nav-btn.active {
          background: #ede9fe;
          color: #4338ca;
          font-weight: 600;
          border-left: 3px solid #4338ca;
        }

        .list-btn {
          width: 100%;
          padding: 12px 0;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          margin-top: 32px;
        }

        /* ── Main ── */
  .main {
  flex: 1;
  padding: 28px 32px;
  min-width: 0;
  max-width: 100%;
}
@media (max-width: 767px) {
  .main { padding: 16px 14px; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .main { padding: 20px 20px; }
}
@media (min-width: 1440px) {
  .main { padding: 36px 48px; }
  /* ❌ Remove width: 63% — it was breaking the layout */
}

        /* ── Profile card ── */
        .profile-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px 28px;
          margin-bottom: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 24px;
        }
        @media (max-width: 375px) {
          .profile-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 16px;
            gap: 14px;
          }
        }

        .profile-name {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
        }
        @media (max-width: 639px) { .profile-name { font-size: 20px; } }
        @media (min-width: 640px) and (max-width: 1023px) { .profile-name { font-size: 22px; } }

        .profile-meta { margin: 6px 0 0; font-size: 13px; color: #6b7280; }
        @media (max-width: 639px) { .profile-meta { font-size: 11px; } }

     .profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.info-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ede9fe, #e0e7ff);
  color: #4338ca;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(99,102,241,0.15);
}
        @media (max-width: 639px) {
          .profile-tags { justify-content: center; }
        }

        .tag {
          padding: 5px 12px;
          font-size: 12px;
          border-radius: 20px;
          background: #ede9fe;
          color: #4338ca;
          font-weight: 500;
        }
        @media (max-width: 639px) { .tag { font-size: 10px; padding: 4px 10px; } }

        /* ── Bottom grid ── */
   /* ── Bottom grid: full width, single column on small screens ── */
/* ── Bottom grid ── */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
  width: 100%;
}

/* ── Listings header ── */
.listing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 12px;
  flex-wrap: wrap;
}

/* ── Listing cards grid ── */
.listing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
}

@media (min-width: 480px) {
  .listing-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

@media (min-width: 1024px) {
  .listing-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

/* ── Listing card ── */
.listing-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
  width: 100%;
  min-width: 0; /* prevents card from overflowing grid */
}

.listing-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* ── Listing image ── */
.listing-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

@media (max-width: 479px) {
  .listing-img { height: 160px; }
}

        /* ── Right panel ── */
        // .right-panel {
        //   display: flex;
        //   flex-direction: column;
        //   gap: 16px;
        // }

        /* ── Fit score card ── */
        // .fit-score-card {
        //   background: linear-gradient(135deg, #4f46e5, #7c3aed);
        //   border-radius: 18px;
        //   padding: 22px 22px 20px;
        //   color: #fff;
        //   box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        // }

        /* ── Application card ── */
        // .app-card {
        //   background: #fff;
        //   border-radius: 18px;
        //   padding: 20px;
        //   box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        // }

        // /* ── Guarantee card ── */
        // .guarantee-card {
        //   background: #99f6e4;
        //   border-radius: 16px;
        //   padding: 16px 18px;
        //   display: flex;
        //   align-items: flex-start;
        //   gap: 12px;
        // }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid #ddd8f0;
          margin-top: 48px;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          background: #fff;
        }
        @media (max-width: 639px) {
          .footer {
            padding: 20px 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 11px;
          color: #6b7280;
          letter-spacing: 0.05em;
        }
        @media (max-width: 639px) {
          .footer-links { gap: 12px; font-size: 10px; }
        }
        
      `}</style>

      <Navbar />
      <div className="curator-root">
        {/* ── Top Bar (mobile/tablet) ── */}
        <div className="topbar">
          <div>
            <div className="topbar-logo">The Curator</div>
            <div className="topbar-sub">ACADEMIC HOUSING</div>
          </div>
          <button
            className="hamburger"
            onClick={() => setSidebarOpen((p) => !p)}
          >
            {sidebarOpen ? "✖" : "☰"}
          </button>
        </div>

        <div className="layout">
          {/* Overlay */}
          <div
            className={`overlay ${sidebarOpen ? "active" : ""}`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* ── Sidebar ── */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div>
              <div style={{ marginBottom: 36 }}>
                <div className="sidebar-logo-name">The Curator</div>
                <div className="sidebar-logo-sub">ACADEMIC HOUSING</div>
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.route}
                    className={`nav-btn ${activeNav === link.label ? "active" : ""}`}
                    onClick={() => {
                      setActiveNav(link.label);
                      if (!isDesktop) setSidebarOpen(false);
                    }}
                  >
                    <span style={{ fontSize: 15 }}>{link.icon}</span>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <button className="list-btn">List a Property</button>
          </aside>

          {/* ── Main ── */}
          <main className="main">
            {/* Profile Card */}
            {
              userRole==="student"?(
                <>
                   <div className="profile-card">
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={
                    avatar || "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  style={{
                    width: isMobile ? 70 : 90,
                    height: isMobile ? 70 : 90,
                    borderRadius: 14,
                    objectFit: "cover",
                    display: "block",
                  }}
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
                  }}
                >
                  ✓ VERIFIED
                </div>
              </div>

              <div>
                <h1 className="profile-name">{form.fullName || "Your Name"}</h1>
                <p className="profile-meta">
                  🎓 {form.university || "University"}
                  &nbsp;•&nbsp; 🎓 Passout Year: {form.passoutYear || "--"}
                   &nbsp;•&nbsp; 🧑‍🎓 {form.profession || " "}
                  &nbsp;•&nbsp; 📍 {form.location || "Location"}
                </p>
                <div className="profile-tags">
                  <div className="info-pill">Age: 🎂 {age || "--"} yrs</div>

                  <div className="info-pill">
                    Budget: 💰₹{budget?.toLocaleString() || "--"} / mo
                  </div>
                </div>
              </div>
            </div>
                </>
              ):(
                <>
                   <div className="profile-card">
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={
                    avatar || "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  style={{
                    width: isMobile ? 70 : 90,
                    height: isMobile ? 70 : 90,
                    borderRadius: 14,
                    objectFit: "cover",
                    display: "block",
                  }}
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
                  }}
                >
                  ✓ VERIFIED
                </div>
              </div>

              <div>
                <h1 className="profile-name">{form.fullName || "Your Name"}</h1>
                <p className="profile-meta">
                  🎓 {form.phoneno || "Phone No"}
                  {/* &nbsp;•&nbsp; 🎓 Passout Year: {form.passoutYear || "--"} */}
                   &nbsp;•&nbsp; 🧑‍🎓 {form.profession || " "}
                  &nbsp;•&nbsp; 📍 {form.location || "Location"}
                </p>
                <div className="profile-tags">
                  <div className="info-pill">Age: 🎂 {age || "--"} yrs</div>

                  {/* <div className="info-pill">
                    Budget: 💰₹{budget?.toLocaleString() || "--"} / mo
                  </div> */}
                </div>
              </div>
            </div>
                </>
              )
            }
           

            {/* Bottom Grid */}
            <div className="bottom-grid">
              {/* LEFT — Saved Listings */}
              <div>
                <div className="listing-header">
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1f2937",
                      }}
                    >
                      Saved Listings
                    </h2>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: 13,
                        color: "#9ca3af",
                      }}
                    >
                      Properties you are tracking for the Fall semester.
                    </p>
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      fontSize: 13,
                      cursor: "pointer",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    View All
                  </button>
                </div>

                <div className="listing-grid">
                  {savedListings.map((listing) => (
                    <div key={listing._id} className="listing-card">
                      {/* IMAGE */}
                      <div style={{ position: "relative" }}>
                        <img
                          src={listing.images[0]}
                          className="listing-img"
                          alt={listing.title}
                        />

                        {/* ❤️ HEART (LEFT)
                        <button
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10, // 👈 LEFT SIDE
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#fff",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                            color: likedCards[listing._id]
                              ? "#ef4444"
                              : "#9ca3af",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          }}
                          onClick={() => toggleLike(listing._id)}
                        >
                          ❤️
                        </button> */}

                        {/* ❌ REMOVE (RIGHT) */}
                        <button
                          onClick={() => removeBookmark(listing._id)}
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10, // 👈 RIGHT SIDE
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#ef4444",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      {/* DETAILS */}
                      <div style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>
                            {listing.title}
                          </span>

                          <span style={{ color: "#ef4444", fontWeight: 700 }}>
                            ₹{listing.price}/mo
                          </span>
                        </div>

                        {/* LOCATION */}
                        <p style={{ fontSize: 12, color: "#9ca3af" }}>
                          📍 {listing.location}
                        </p>

                        {/* TAGS */}
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginBottom: 8,
                          }}
                        >
                          {listing.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: 10,
                                background: "#e0f2fe",
                                padding: "3px 8px",
                                borderRadius: 12,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* AMENITIES */}
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                        >
                          {listing.amenities.map((a) => (
                            <span
                              key={a}
                              style={{
                                padding: "4px 10px",
                                fontSize: 11,
                                borderRadius: 20,
                                background: "#ede9fe",
                                color: "#4338ca",
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
            </div>

          </main>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#4338ca" }}>
              The Academic Curator
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
              © 2024 THE ACADEMIC CURATOR. CURATING INTELLECTUAL GROWTH.
            </div>
          </div>
          <div className="footer-links">
            {[
              "PRIVACY POLICY",
              "TERMS OF SERVICE",
              "UNIVERSITY PARTNERSHIPS",
              "CONTACT SUPPORT",
            ].map((link) => (
              <span key={link} style={{ cursor: "pointer" }}>
                {link}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

//{/* RIGHT — Panel */}
{
  /* <div className="right-panel">

             
                <div className="fit-score-card">
                  <div style={{ fontSize: 18, marginBottom: 8 }}>✦</div>
                  <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
                    Your Academic Fit<br />Score is 94%
                  </div>
                  <p style={{ fontSize: 12, opacity: 0.8, margin: "0 0 16px" }}>
                    Based on your proximity to the economics department and library hours preference.
                  </p>
                  <a href="#" style={{ color: "#fff", fontSize: 13, fontWeight: 500, textDecoration: "underline", opacity: 0.9 }}>
                    View Curated Insights
                  </a>
                </div>

             
                <div className="app-card">
                  <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1f2937" }}>
                    Current Application
                  </h3>

                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    marginBottom: 20, padding: 12,
                    background: "#f8f7ff", borderRadius: 12,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "#e0e7ff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>
                      🏢
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1f2937" }}>The Scholar's Suite</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>App ID: #88219-BK</div>
                    </div>
                  </div>

                  <div style={{ position: "relative", paddingLeft: 28 }}>
                    <div style={{
                      position: "absolute", left: 9, top: 10, bottom: 10,
                      width: 2, background: "#e5e7eb", borderRadius: 2,
                    }} />

                    {applicationSteps.map((step, i) => (
                      <div key={step.id} style={{ position: "relative", marginBottom: i < applicationSteps.length - 1 ? 20 : 0 }}>
                        <div style={{
                          position: "absolute", left: -28, top: 2,
                          width: 20, height: 20, borderRadius: "50%",
                          background: step.done ? "#6366f1" : step.active ? "#fff" : "#f3f4f6",
                          border: step.active ? "2px solid #6366f1" : step.done ? "none" : "2px solid #d1d5db",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          zIndex: 1,
                        }}>
                          {step.done && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                          {step.active && <span style={{ fontSize: 8, color: "#6366f1" }}>●</span>}
                        </div>

                        <div style={{ fontWeight: step.active ? 700 : 500, fontSize: 13, color: step.active ? "#4338ca" : "#374151" }}>
                          {step.label}
                        </div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{step.date}</div>

                        {step.note && (
                          <div style={{
                            marginTop: 8, padding: "10px 12px",
                            background: "#ede9fe", borderRadius: 10,
                            fontSize: 12, color: "#4338ca", lineHeight: 1.5,
                          }}>
                            {step.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button style={{
                    width: "100%", marginTop: 20, padding: "11px 0",
                    borderRadius: 12, border: "1.5px solid #6366f1",
                    background: "#fff", color: "#4338ca",
                    fontWeight: 600, fontSize: 13, cursor: "pointer",
                  }}>
                    View Application Details
                  </button>
                </div>

                
                <div className="guarantee-card">
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

              </div> */
}
