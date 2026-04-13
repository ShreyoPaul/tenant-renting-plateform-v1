import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { NavLink } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
];

const properties = [
  {
    id: 1,
    name: "Salt Lake Regency Studio",
    location: "Block CA, Salt Lake City, Kolkata",
    rent: "₹18,500",
    status: "Active",
    inquiries: 42,
    inquiryBadge: "+5 new",
    inquiryBadgeClass: "text-teal-600 font-bold",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhlCo1f0WGsyp1zSu7N5mChLWdAr0zlQN4fURgoFG3sjPAZsIk1W0g17Q0BSqtkp08Ecmg513VxjYGczo6kRWjxRzJMcYGbojTeir6BYDO3ca4frkYZyMPmPi7SV707CLqnNO9SYEaKbV1jI9KELyeMhK3bIyioQ6pxDZkrY2z2Q4Od1PcfaM_S0pE6lHeLf05B0erFqWnVC_PSbUnXXJcDXyxXpBrWFk7h4maLVQTsxWwmttmd0-E_Z6OrbccIDM9z7SS_gD9Z5o0",
  },
  {
    id: 2,
    name: "The Scholar's Suite - Heritage",
    location: "College Street, North Kolkata",
    rent: "₹12,000",
    status: "Inactive",
    inquiries: 89,
    inquiryBadge: "Paused",
    inquiryBadgeClass: "text-gray-400 font-medium",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJWTN6gsgLfrF7Q3ZHEFeWeGjKvK9wo1yhw_EtmMDxYHWBh275mudQnylj9Ir5lBRIjHT2xvlUHiF1m4lvvaOAAmLweWJTFyz6L7n2URx5sgXjPShNZQKrBbGCsI-5w9DxJcmdfKLV_JA_fs-CTUkDX5lfwQ6JM21Cx8W0stRqw5K8PnIoYLxenc09RlPGrlM9J0c6Fw6RXsLhtbwdatkmtyxfBoV613vi9LkaY2NcKdkKspDidTb0E8QATJYYToCsizxnL9rzTM7O",
  },
  {
    id: 3,
    name: "Park Street Creative Loft",
    location: "Park Street, Central Kolkata",
    rent: "₹24,000",
    status: "Active",
    inquiries: 17,
    inquiryBadge: "Stable",
    inquiryBadgeClass: "text-gray-400 font-medium",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2n_0OB4nBcdpTAeWpMunbO3C014OREsdhfgMIhB3LfUE9EF1PychBtMqZUYnUIizDmTdcb1t-EMtw5cEW79n0cCGqEWxcFfKgE7HULVkQRPx7_s9ymRR_Kc5R3xXtuGD4XbphM0p_EAYWvio7cTEJs8RGDDNZYEGFopiNanDi29upCCukyBfyRVZT1t7qQcfSwTPUAU6y798YNyD8nMDza4sEcJ1B33xs8-Cwl9QvTQ2ev-Blt0yfAaVnhsluzkdmuqCeaRkCREHy",
  },
];

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 10,
        backgroundColor: isActive ? "#ccfbf1" : "#f3f4f6",
        color: isActive ? "#0f766e" : "#6b7280",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: isActive ? "#0d9488" : "#9ca3af",
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
}

function PropertyRow({ property }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#f3eeff" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={property.img}
            alt={property.name}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div>
            <p style={{ fontWeight: 700, color: "#2e2a50", fontSize: 14, margin: 0 }}>
              {property.name}
            </p>
            <p style={{ fontSize: 12, color: "#5c5680", margin: "3px 0 0", fontFamily: "sans-serif" }}>
              {property.location}
            </p>
          </div>
        </div>
      </td>

      <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
        <span style={{ fontWeight: 600, color: "#2e2a50", fontSize: 14 }}>{property.rent}</span>
        <span style={{ fontSize: 12, color: "#5c5680", fontFamily: "sans-serif" }}> /month</span>
      </td>

      <td style={{ padding: "14px 16px" }}>
        <StatusBadge status={property.status} />
      </td>

      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700, color: "#2e2a50", fontSize: 14 }}>{property.inquiries}</span>
          <span style={{ fontSize: 12 }} className={property.inquiryBadgeClass}>{property.inquiryBadge}</span>
        </div>
      </td>

      <td style={{ padding: "14px 16px", textAlign: "right" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 6,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s",
          }}
        >
          <button style={{ padding: "6px 8px", color: "#4953ac", background: "none", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 18 }}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button style={{ padding: "6px 8px", color: "#5c5680", background: "none", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 18 }}>
            <span className="material-symbols-outlined">analytics</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function OwnerDashboard() {
  const [email, setEmail] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
        body { font-family: 'Inter', sans-serif; }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
        tr { border-bottom: 1px solid #ebe5ff; }
        tr:last-child { border-bottom: none; }

        /* ── Dashboard layout ── */
        .dash-main {
          // max-width: 80%;
          margin: 0 auto;
          padding: 20px 32px 48px;
        }

        /* ── Header ── */
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
          margin-top: 24px;
          gap: 16px;
        }
        .dash-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #2e2a50;
          margin: 0 0 8px;
        }
        .dash-add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 24px;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #4953ac, #929bfa);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(73,83,172,0.25);
          flex-shrink: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-decoration: none;
          white-space: nowrap;
        }

        /* ── Carousel ── */
        .carousel-section {
          margin-bottom: 40px;
        }
        .carousel-box {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          height: 340px;
          background: #1a1725;
          box-shadow: 0 1px 6px rgba(0,0,0,0.12);
        }

        /* ── Properties section header ── */
        .props-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
        }

        /* ── Banner ── */
        .banner-section {
          background-color: #81f3e5;
          border-radius: 24px;
          padding: 56px 64px;
          overflow: hidden;
          position: relative;
        }
        .banner-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .banner-shield {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background-color: rgba(0,90,83,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Large desktop (1441px+) ── */
        @media (min-width: 1441px) {
          .dash-main {
            // padding: 10px 10px 10px;
          width:100%
          }
          .carousel-box {
            height: 420px;
          }
            .carousel-section{
            width:73%
            }
            .property_main{
            width:73%;
            
            }
            .banner-section{
            width:73%
            }
          
        }

        /* ── Tablet (max 900px) ── */
        @media (max-width: 900px) {
          .dash-main {
            padding: 16px 20px 40px;
          }
          .dash-title {
            font-size: 28px;
          }
          .carousel-box {
            height: 260px;
          }
          .banner-section {
            padding: 36px 32px;
          }
          .banner-shield {
            width: 160px;
            height: 160px;
          }
          .banner-shield .material-symbols-outlined {
            font-size: 80px !important;
          }
        }

        /* ── Mobile (max 600px) ── */
        @media (max-width: 600px) {
          .dash-main {
            padding: 12px 14px 32px;
          }
          .dash-header {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 16px;
            margin-bottom: 24px;
          }
          .dash-title {
            font-size: 24px;
            letter-spacing: -0.5px;
          }
          .dash-add-btn {
            width: 100%;
            justify-content: center;
            height: 48px;
          }
          .carousel-box {
            height: 200px;
          }
          .props-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-section {
            padding: 28px 20px;
            border-radius: 16px;
          }
          .banner-inner {
            flex-direction: column;
            gap: 24px;
          }
          .banner-shield {
            width: 120px;
            height: 120px;
            align-self: center;
          }
          .banner-shield .material-symbols-outlined {
            font-size: 60px !important;
          }
          .banner-title {
            font-size: 22px !important;
          }
        }

        /* ── Extra small (max 400px) ── */
        @media (max-width: 400px) {
          .dash-title {
            font-size: 20px;
          }
          .banner-title {
            font-size: 19px !important;
          }
        }
      `}</style>

      <Navbar />

      <div style={{ backgroundColor: "#f9f4ff", color: "#2e2a50", minHeight: "100vh" }}>
        <main className="dash-main">

          {/* ── Header ── */}
          <header className="dash-header">
            <div>
              <h1 className="dash-title">Owner Dashboard</h1>
              <p style={{ fontSize: 14, color: "#5c5680", lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
                Manage your curated student residences and track your portfolio's performance across Kolkata.
              </p>
            </div>
            <NavLink to="/newlisting" className="dash-add-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_circle</span>
              Add New Listing
            </NavLink>
          </header>

          {/* ── Carousel ── */}
          <section className="carousel-section">
            <div
              className="carousel-box"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${src}?w=600&q=80)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              {/* Overlay */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(15,10,30,0.55) 30%, transparent 80%)",
                  pointerEvents: "none", zIndex: 1,
                }}
              />

              {/* Prev */}
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute", top: "50%", left: 10,
                  transform: "translateY(-50%)", zIndex: 3,
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.28)", borderRadius: "50%",
                  width: 32, height: 32, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", color: "#fff", padding: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>

              {/* Next */}
              <button
                onClick={nextSlide}
                style={{
                  position: "absolute", top: "50%", right: 10,
                  transform: "translateY(-50%)", zIndex: 3,
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.28)", borderRadius: "50%",
                  width: 32, height: 32, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", color: "#fff", padding: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>

              {/* Dots */}
              <div
                style={{
                  position: "absolute", bottom: 10, left: "50%",
                  transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 3,
                }}
              >
                {images.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: 6, height: 6, borderRadius: "50%", cursor: "pointer",
                      background: i === currentIndex ? "#fff" : "rgba(255,255,255,0.4)",
                      transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ── Your Properties ── */}
          <section style={{ marginBottom: 40 }} className="property_main">
            <div className="props-header">
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 22, fontWeight: 700, color: "#2e2a50", margin: 0,
                }}
              >
                Your Properties
              </h2>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  backgroundColor: "#f3eeff", padding: "8px 16px",
                  borderRadius: 10, cursor: "pointer", fontSize: 13,
                  color: "#5c5680", fontWeight: 500,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
                Filter by Status
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f3eeff" }}>
                      {["Property Details", "Monthly Rent", "Status", "Inquiries", "Actions"].map((h, i) => (
                        <th
                          key={i}
                          style={{
                            padding: "14px 16px",
                            textAlign: i === 4 ? "right" : "left",
                            fontSize: 13, fontWeight: 700, color: "#5c5680",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => (
                      <PropertyRow key={p.id} property={p} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Banner ── */}
          <section className="banner-section">
            <div className="banner-inner">
              <div style={{ maxWidth: 480 }}>
                <h3
                  className="banner-title"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 32, fontWeight: 800, color: "#005a53", margin: "0 0 16px",
                  }}
                >
                  Enhance Your Visibility
                </h3>
                <p style={{ fontSize: 15, color: "#005a53", opacity: 0.8, lineHeight: 1.7, margin: "0 0 28px", fontFamily: "sans-serif" }}>
                  Verified listings receive 4x more engagement from high-intent students. Schedule your verification visit today.
                </p>
                <button
                  style={{
                    backgroundColor: "#005a53", color: "#81f3e5",
                    padding: "14px 28px", borderRadius: 12, border: "none",
                    fontWeight: 700, fontSize: 15, cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Get Verified Now
                </button>
              </div>

              <div className="banner-shield">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 110, color: "#005a53", fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
              </div>
            </div>
          </section>

        </main>
        <MainFooter />
      </div>
    </>
  );
}
{
  /* <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20, marginBottom: 40 }}>

            
            <div style={{
              backgroundColor: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)", display: "flex",
              flexDirection: "column", justifyContent: "space-between", minHeight: 160,
              position: "relative", overflow: "hidden",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#5c5680", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                Total Property Views
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 16 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#4953ac", letterSpacing: "-2px", lineHeight: 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  12,482
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0d9488", display: "flex", alignItems: "center", gap: 3 }}>
                  +14%
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                </span>
              </div>
           
              <div style={{
                position: "absolute", right: 20, bottom: 12,
                width: 80, height: 80, borderRadius: "50%",
                backgroundColor: "#f3eeff",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.8,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 42, color: "#c4b8f8" }}>visibility</span>
              </div>
            </div>

           
            <div style={{
              backgroundColor: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              borderLeft: "4px solid #a83206",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 160,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#5c5680", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                Inquiries (Oct)
              </p>
              <span style={{ fontSize: 48, fontWeight: 800, color: "#2e2a50", letterSpacing: "-2px", lineHeight: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 16 }}>
                148
              </span>
              <p style={{ fontSize: 13, color: "#5c5680", margin: "auto 0 0", fontFamily: "sans-serif" }}>
                24 pending response
              </p>
            </div>

           
            <div style={{
              backgroundColor: "#81f3e5", borderRadius: 16, padding: "24px 28px",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 160,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#005a53", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                Avg. Response Time
              </p>
              <span style={{ fontSize: 48, fontWeight: 800, color: "#005a53", letterSpacing: "-2px", lineHeight: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 16 }}>
                2.4h
              </span>
              <div style={{ display: "flex", gap: 5, marginTop: "auto" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#005a53", display: "inline-block" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#005a53", display: "inline-block", opacity: 0.35 }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#005a53", display: "inline-block", opacity: 0.35 }} />
              </div>
            </div>
          </section> */
}

{
  /* <footer className="bg-[#f3eeff] w-full mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-16 w-full max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              <span className="text-lg font-extrabold text-[#4953ac] font-headline">
                The Academic Curator
              </span>
              <p className="text-[#5c5680] text-sm leading-relaxed max-w-xs">
                Elevating the student living experience through curated architecture and
                community-focused management.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline font-bold text-[#4953ac]">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {["About Us", "Verified Listings", "Safety Guidelines", "Contact Support"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#"
                      className="text-[#5c5680] hover:text-[#4953ac] text-sm hover:underline transition-all"
                    >
                      {l}
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline font-bold text-[#4953ac]">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  className="bg-[#f3eeff] border border-[#aea8d7] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4953ac]/40 w-full"
                />
                <button className="bg-[#4953ac] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#3d469f] transition-colors">
                  Join
                </button>
              </div>
              <p className="text-xs text-[#5c5680]">
                © 2024 The Academic Curator. Premium Student Living in Kolkata.
              </p>
            </div>
          </div>
        </footer> */
}
