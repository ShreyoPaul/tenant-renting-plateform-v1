import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { useParams } from "react-router-dom";
import axios from "axios";

const PROXIMITY = [
  { icon: "🚶", name: "St. Xavier's College", sub: "Main Campus Entrance", time: "4 mins walk" },
  { icon: "🚌", name: "Loreto College", sub: "Middleton Row", time: "12 mins walk" },
  { icon: "🚇", name: "Park Street Metro", sub: "North-South Corridor", time: "8 mins walk" },
];

const GUIDELINES = [
  { icon: "🔴", title: "11:00 PM Curfew", desc: "Late entry requires prior guardian notification via the app." },
  { icon: "👥", title: "Guest Policy", desc: "Day guests allowed in common areas. No overnight visitors." },
  { icon: "🚭", title: "Zero Tolerance", desc: "No smoking or alcohol permitted within the premises." },
  { icon: "📋", title: "Weekly Audit", desc: "Regular room maintenance checks for hygiene standards." },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
];

const AMENITY_ICONS = {
  "Gigabit Wi-Fi": "📶",
  "Full AC": "❄️",
  "Laundry Service": "🧺",
  "24/7 Security": "🛡",
};

export default function PropertyDetails() {
  const [emailVal, setEmailVal] = useState("");
  const [listing, setListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) {
    return <div style={{ padding: 40, fontFamily: "sans-serif" }}>Loading...</div>;
  }

  return (
    <>
    
      <Navbar />
    <div style={{ backgroundColor: "#f0edf8", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>

      {/* ── Breadcrumb + Badges ── */}
      <div style={{ padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop:0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7b78a0", fontFamily: "sans-serif" }}>
          <a href="/search" style={{ color: "#7b78a0", textDecoration: "none" }}>Listings</a>
          <span>›</span>
          <a href="#" style={{ color: "#7b78a0", textDecoration: "none" }}>Kolkata</a>
          <span>›</span>
          <span style={{ color: "#1a1740", fontWeight: 600 }}>{listing.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {listing.verified && (
            <span style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 999, fontSize: 12,
              fontWeight: 600, backgroundColor: "#4caf8e", color: "#fff",
              fontFamily: "sans-serif",
            }}>
              ✓ Verified Listing
            </span>
          )}
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "8px 18px", borderRadius: 999, fontSize: 12,
            fontWeight: 600, backgroundColor: "#ffe0d4", color: "#c0441a",
            fontFamily: "sans-serif",
          }}>
            Only 2 Rooms Left
          </span>
        </div>
      </div>

      {/* ── Photo Grid ── */}
      <div style={{ padding: "0 32px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, height: 380 }}>
        {/* Large left */}
        <div style={{ borderRadius: 16, overflow: "hidden", height: "100%" }}>
          <img src={PHOTOS[0]} alt="main" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {/* Right 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 }}>
          {PHOTOS.slice(1).map((p, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: "hidden", position: "relative" }}>
              <img src={p} alt={`photo-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {i === 2 && (
                <div style={{
                  position: "absolute", bottom: 10, right: 10,
                  backgroundColor: "rgba(255,255,255,0.92)", borderRadius: 8,
                  padding: "5px 10px", fontSize: 12, fontFamily: "sans-serif",
                  fontWeight: 600, color: "#1a1740", display: "flex",
                  alignItems: "center", gap: 5, cursor: "pointer",
                }}>
                  ⊞ View all 24 photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content + Sidebar ── */}
      <div style={{ padding: "0 32px 48px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

        {/* LEFT COLUMN */}
        <div>
          {/* Title */}
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#1a1740", letterSpacing: "-1.5px", lineHeight: 1.1, margin: "0 0 8px" }}>
            {listing.title}
          </h1>
          <p style={{ fontSize: 14, color: "#7b78a0", fontFamily: "sans-serif", margin: "0 0 28px", display: "flex", alignItems: "center", gap: 4 }}>
            📍 {listing.location}
          </p>

          {/* Amenities */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1740", margin: "0 0 14px" }}>
            Premium Student Amenities
          </h2>
          <div style={{
            backgroundColor: "#fff", border: "1px solid #e8e4f8", borderRadius: 14,
            padding: "16px", marginBottom: 28,
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
          }}>
            {listing.amenities?.map((item, index) => {
              const icon = item.slice(0, 2);
              const label = item.slice(2);
              return (
                <div key={index} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "14px 8px", borderRadius: 10,
                  backgroundColor: "#f8f6ff", cursor: "default",
                }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#3b3584", fontFamily: "sans-serif", textAlign: "center", lineHeight: 1.3 }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Academic Proximity */}
          <div style={{ backgroundColor: "#f8f6ff", border: "1px solid #e4e0f4", borderRadius: 14, padding: "20px", marginBottom: 28 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1740", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
              🎓 Academic Proximity
            </h3>
            {PROXIMITY.map((p, i) => (
              <div key={p.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: i < PROXIMITY.length - 1 ? "1px solid #e4e0f4" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", backgroundColor: "#e8e4f8",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                  }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1740" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#9b96b8", fontFamily: "sans-serif" }}>{p.sub}</div>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#5b54d4", fontFamily: "sans-serif" }}>
                  {p.time}
                </span>
              </div>
            ))}
          </div>

          {/* House Guidelines */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1740", margin: "0 0 14px" }}>
            House Guidelines
          </h2>
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e4f8", borderRadius: 14, padding: "20px", marginBottom: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
              {GUIDELINES.map((g) => (
                <div key={g.title} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1740", marginBottom: 3 }}>{g.title}</div>
                    <div style={{ fontSize: 12, color: "#7b78a0", fontFamily: "sans-serif", lineHeight: 1.5 }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Peace of Mind */}
          <div style={{
            backgroundColor: "#4cd9b0", borderRadius: 20, padding: "24px 28px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0a2e24", margin: "0 0 8px" }}>
                Academic Peace of Mind
              </h3>
              <p style={{ fontSize: 13, color: "#0f4035", fontFamily: "sans-serif", lineHeight: 1.6, maxWidth: 380, margin: 0 }}>
                This property is directly verified by The Academic Curator team. We've checked structural safety, Wi-Fi speeds, and local security measures.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: 20 }}>
              {["https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/45.jpg"].map((src, i) => (
                <img key={i} src={src} alt="" style={{
                  width: 40, height: 40, borderRadius: "50%", border: "2px solid #fff",
                  objectFit: "cover", marginLeft: i === 0 ? 0 : -8, display: "block",
                }} />
              ))}
              <div style={{
                width: 40, height: 40, borderRadius: "50%", backgroundColor: "#2a9d7a",
                border: "2px solid #fff", marginLeft: -8, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "sans-serif",
              }}>
                +45
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Pricing Card */}
          <div style={{
            backgroundColor: "#fff", border: "1px solid #e8e4f8", borderRadius: 20,
            padding: "24px", boxShadow: "0 4px 24px rgba(91,84,212,0.08)",
          }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#1a1740", letterSpacing: "-1px", fontFamily: "sans-serif" }}>
                ₹24,500
              </span>
              <span style={{ fontSize: 14, color: "#7b78a0", fontFamily: "sans-serif", marginLeft: 4 }}>
                /month
              </span>
            </div>

            <div style={{ borderBottom: "1px solid #e8e4f8", paddingBottom: 14, marginBottom: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "sans-serif" }}>
                <span style={{ color: "#7b78a0" }}>Security Deposit</span>
                <span style={{ color: "#1a1740", fontWeight: 500 }}>₹49,000 (2 months)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "sans-serif" }}>
                <span style={{ color: "#7b78a0" }}>Service Fee</span>
                <span style={{ color: "#1a1740", fontWeight: 500 }}>₹1,500</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 18 }}>
              <span style={{ color: "#1a1740" }}>Total Initial Payment</span>
              <span style={{ color: "#5b54d4", fontSize: 15 }}>₹75,000</span>
            </div>

            <button style={{
              width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #5b54d4, #4038b0)",
              color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
              fontFamily: "sans-serif", letterSpacing: 0.5, marginBottom: 8,
            }}>
              Reserve Now
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#9b96b8", fontFamily: "sans-serif", margin: 0 }}>
              No charges applied until owner approval
            </p>
          </div>

          {/* Property Curator Card */}
          <div style={{
            backgroundColor: "#fff", border: "1px solid #e8e4f8", borderRadius: 20,
            padding: "20px", boxShadow: "0 4px 24px rgba(91,84,212,0.08)",
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#9b96b8", fontFamily: "sans-serif", margin: "0 0 14px" }}>
              PROPERTY CURATOR
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="curator"
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", display: "block" }}
                />
                <span style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 12, height: 12, borderRadius: "50%",
                  backgroundColor: "#4caf8e", border: "2px solid #fff",
                }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1740" }}>
                  {listing.owner_name}
                </div>
                <div style={{ fontSize: 12, color: "#7b78a0", fontFamily: "sans-serif" }}>
                  Response rate: 98%
                </div>
              </div>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 13,
              backgroundColor: "#f8f6ff", padding: "10px 12px", borderRadius: 10,
              marginBottom: 12, color: "#4a4770", fontFamily: "sans-serif",
            }}>
              📞 {listing.owner_phone}
            </div>

            <button style={{
              width: "100%", padding: "10px 0", borderRadius: 12,
              backgroundColor: "#f0edf8", border: "1px solid #ddd8f0",
              color: "#3b3584", fontWeight: 600, fontSize: 13, cursor: "pointer",
              fontFamily: "sans-serif", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6,
            }}>
              💬 Connect with Owner
            </button>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
    </>
  );
}


{/* <footer
        className="mt-16 px-8 pt-10 pb-6"
        style={{ borderTop: "1px solid #ddd8f0", backgroundColor: "#f0edf8" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: 40 }} className="mb-8">
         
          <div>
            <div className="font-bold text-base mb-2" style={{ color: "#3b3584", letterSpacing: "-0.5px" }}>
              The Academic Curator
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
              Elevating student living standards across Kolkata's premier educational hubs. Quality, safety, and community at the core.
            </p>
          </div>

          
          <div>
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
              COMPANY
            </div>
            <div className="flex flex-col gap-2">
              {["About Us", "Verified Listings"].map((l) => (
                <a key={l} href="#" className="text-sm hover:text-indigo-600 transition-colors" style={{ color: "#4a4770", fontFamily: "sans-serif" }}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
              SUPPORT
            </div>
            <div className="flex flex-col gap-2">
              {["Safety Guidelines", "Contact Support"].map((l) => (
                <a key={l} href="#" className="text-sm hover:text-indigo-600 transition-colors" style={{ color: "#4a4770", fontFamily: "sans-serif" }}>
                  {l}
                </a>
              ))}
            </div>
          </div>

        
          <div>
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
              NEWSLETTER
            </div>
            <p className="text-sm mb-3" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
              Get early access to premium listings near your university.
            </p>
            <div className="flex gap-0" style={{ border: "1px solid #ddd8f0", borderRadius: 10, overflow: "hidden", backgroundColor: "#fff" }}>
              <input
                type="email"
                placeholder="Your edu email"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm outline-none"
                style={{ fontFamily: "sans-serif", color: "#1a1740", backgroundColor: "transparent" }}
              />
              <button
                className="px-4 flex items-center justify-center"
                style={{ backgroundColor: "#5b54d4", color: "#fff", fontFamily: "sans-serif" }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        <div
          className="text-center text-xs pt-6"
          style={{ color: "#9b96b8", fontFamily: "sans-serif", borderTop: "1px solid #ddd8f0" }}
        >
          © 2024 The Academic Curator. Premium Student Living in Kolkata.
        </div>
      </footer> */}