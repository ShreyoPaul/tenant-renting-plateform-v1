import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { useParams } from "react-router-dom";
import axios from "axios";

const NAV_LINKS = ["Home", "Search", "Owners", "My Account"];

const AMENITIES = [
  { icon: "📶", label: "Gigabit Wi-Fi" },
  { icon: "❄️", label: "Full AC" },
  { icon: "🧺", label: "Laundry Service" },
  { icon: "🛡", label: "24/7 Security" },
];

const PROXIMITY = [
  { icon: "🚶", name: "St. Xavier's College", sub: "Main Campus Entrance", time: "4 mins walk" },
  { icon: "🚌", name: "Loreto College", sub: "Middleton Row", time: "12 mins walk" },
  { icon: "🚇", name: "Park Street Metro", sub: "North-South Corridor", time: "8 mins walk" },
];

const GUIDELINES = [
  {
    icon: "🔴",
    title: "11:00 PM Curfew",
    desc: "Late entry requires prior guardian notification via the app.",
  },
  {
    icon: "👥",
    title: "Guest Policy",
    desc: "Day guests allowed in common areas. No overnight visitors.",
  },
  {
    icon: "🚭",
    title: "Zero Tolerance",
    desc: "No smoking or alcohol permitted within the premises.",
  },
  {
    icon: "📋",
    title: "Weekly Audit",
    desc: "Regular room maintenance checks for hygiene standards.",
  },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
];

export default function PropertyDetails() {
  const [emailVal, setEmailVal] = useState("");
  const [listing,setListing]=useState(null);
const {id}=useParams();
useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/listings/${id}`
        );
        setListing(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div className="p-10">Loading...</div>;
  }
  return (
    <div style={{ backgroundColor: "#f0edf8", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      {/* ── Navbar ── */}
    <Navbar/>
      {/* ── Breadcrumb + Badges ── */}
      <div className="px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
          <a href="/search" className="hover:underline">Listings</a>
          <span>›</span>
          <a href="#" className="hover:underline">Kolkata</a>
          <span>›</span>
          <span style={{ color: "#1a1740", fontWeight: 600 }}>St. Xavier's Luxury Residency</span>
        </div>
        <div className="flex items-center gap-3 h-20 w-80">
         {listing.verified && (
  <span
    className="flex items-center gap-1.5 px-3  py-1.5 h-10 w-44 justify-center rounded-full text-xs font-semibold"
    style={{
      backgroundColor: "#4caf8e",
      color: "#fff",
      fontFamily: "sans-serif"
    }}
  >
    ✓ Verified Listing
  </span>
)}
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold h-10 w-44 flex items-center justify-between ml-10"
            style={{ backgroundColor: "#ffe0d4", color: "#c0441a", fontFamily: "sans-serif" }}
          >
            Only 2 Rooms Left
          </span>
        </div>
      </div>

      {/* ── Photo Grid ── */}
      <div className="px-8 mb-8" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, height: 380 }}>
        {/* Large left */}
        <div style={{ borderRadius: 16, overflow: "hidden", height: "100%" }}>
          <img src={PHOTOS[0]} alt="main" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Right 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 }}>
          {PHOTOS.slice(1).map((p, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img src={p} alt={`photo-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {i === 2 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: 8,
                    padding: "5px 10px",
                    fontSize: 12,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    color: "#1a1740",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                >
                  ⊞ View all 24 photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content + Sidebar ── */}
      <div className="px-8" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Title */}
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#1a1740", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 8 }}>
            {/* St. Xavier's Luxury Residency */}
            {listing.title}
          </h1>
          <p className="text-sm mb-8 flex items-center gap-1.5" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
            {/* 📍 Short Street, Park Street Area, Kolkata */}
            {listing.location}
          </p>

          {/* Amenities */}
          <h2 className="font-bold text-lg mb-4" style={{ color: "#1a1740" }}>
            Premium Student Amenities
          </h2>
          <div
            className="mb-8 rounded-xl p-4 h-20 "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              backgroundColor: "#fff",
              border: "1px solid #e8e4f8",
              
            }}
          >
          {listing.amenities?.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f8f6ff] hover:bg-indigo-50 transition justify-center"
      >
        <span className="text-lg">{item.slice(0, 2)}</span>

        <span className="text-lg font-semibold text-[#3b3584]">
          {item.slice(2)}
        </span>
      </div>
    ))}
          </div>
          {/* <div>
            <p className="text-2xl font-bold">{listing.description}</p>
          </div> */}

          {/* Academic Proximity */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: "#f8f6ff", border: "1px solid #e4e0f4" }}
          >
            <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: "#1a1740" }}>
              🎓 Academic Proximity
            </h3>
            <div className="flex flex-col gap-0">
              {PROXIMITY.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between py-4"
                  style={{
                    borderBottom: i < PROXIMITY.length - 1 ? "1px solid #e4e0f4" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: "#e8e4f8" }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#1a1740" }}>
                        {p.name}
                      </div>
                      <div className="text-xs" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
                        {p.sub}
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#5b54d4", fontFamily: "sans-serif" }}
                  >
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* House Guidelines */}
          <h2 className="font-bold text-lg mb-4" style={{ color: "#1a1740" }}>
            House Guidelines
          </h2>
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: "#fff", border: "1px solid #e8e4f8" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
              {GUIDELINES.map((g) => (
                <div key={g.title} className="flex gap-3">
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{g.icon}</span>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: "#1a1740" }}>
                      {g.title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
                      {g.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Peace of Mind */}
          <div
            className="rounded-2xl p-6 flex justify-between items-center mb-2"
            style={{ backgroundColor: "#4cd9b0" }}
          >
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: "#0a2e24" }}>
                Academic Peace of Mind
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#0f4035", maxWidth: 380, fontFamily: "sans-serif" }}>
                This property is directly verified by The Academic Curator team. We've checked structural safety, Wi-Fi speeds, and local security measures.
              </p>
            </div>
            <div className="flex items-center" style={{ flexShrink: 0 }}>
              {["https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/45.jpg"].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                />
              ))}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                style={{ backgroundColor: "#2a9d7a", marginLeft: -8 }}
              >
                +45
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-4" style={{ position: "sticky", top: 72 }}>
          {/* Pricing Card */}
          {/* <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#fff", border: "1px solid #e8e4f8", boxShadow: "0 4px 24px rgba(91,84,212,0.08)" }}
          >
            <div className="mb-4">
              <span style={{ fontSize: 32, fontWeight: 800, color: "#1a1740", letterSpacing: "-1px" }}>
                ₹24,500
              </span>
              <span className="text-sm ml-1" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
                /month
              </span>
            </div>

            <div className="flex flex-col gap-2 mb-4 pb-4" style={{ borderBottom: "1px solid #e8e4f8" }}>
              <div className="flex justify-between text-sm" style={{ fontFamily: "sans-serif" }}>
                <span style={{ color: "#7b78a0" }}>Security Deposit</span>
                <span style={{ color: "#1a1740", fontWeight: 500 }}>₹49,000 (2 months)</span>
              </div>
              <div className="flex justify-between text-sm" style={{ fontFamily: "sans-serif" }}>
                <span style={{ color: "#7b78a0" }}>Service Fee</span>
                <span style={{ color: "#1a1740", fontWeight: 500 }}>₹1,500</span>
              </div>
            </div>

            <div className="flex justify-between text-sm font-bold mb-5" style={{ fontFamily: "sans-serif" }}>
              <span style={{ color: "#1a1740" }}>Total Initial Payment</span>
              <span style={{ color: "#5b54d4", fontSize: 15 }}>₹75,000</span>
            </div>

            <button
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm mb-2 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #5b54d4, #4038b0)", fontFamily: "sans-serif", letterSpacing: 0.5 }}
            >
              Reserve Now
            </button>
            <p className="text-center text-xs" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
              No charges applied until owner approval
            </p>
          </div> */}

          {/* Property Curator Card */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#fff", border: "1px solid #e8e4f8", boxShadow: "0 4px 24px rgba(91,84,212,0.08)" }}
          >
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "#9b96b8", fontFamily: "sans-serif" }}>
              PROPERTY CURATOR
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="Rajesh"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: "#4caf8e" }}
                />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#1a1740" }}>
                  {/* Rajesh Chatterjee */}
                  {listing.owner_name}
                </div>
                <div className="text-xs" style={{ color: "#7b78a0", fontFamily: "sans-serif" }}>
                  Response rate: 98%
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-2 text-sm mb-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "#f8f6ff", fontFamily: "sans-serif", color: "#4a4770" }}
            >
              📞 {listing.owner_phone}
            </div>

            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
              style={{ backgroundColor: "#f0edf8", color: "#3b3584", fontFamily: "sans-serif", border: "1px solid #ddd8f0" }}
            >
              💬 Connect with Owner
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <MainFooter/>
    </div>
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