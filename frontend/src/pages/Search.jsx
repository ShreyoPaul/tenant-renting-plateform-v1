import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AcademicCurator.css";
import { NavLink } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import { useEffect } from "react";
import axios from "axios";
import locationDataset from "../data/location-dataset.json";

const tagIcons = {
  "High Speed WiFi": "📶",
  "Bi-weekly Cleaning": "🧹",
  "Meal Plans": "🍽️",
  "Laundry Suite": "👕",
  "24/7 Concierge": "🔔",
  "Social Lounge": "🛋️",
  "Shared Pantry": "🥘",
  "In-house Gym": "💪",
  "Airport Shuttle": "🚌",
};

export default function Search() {
  const [priceMin] = useState(8000);
  const [priceMax] = useState(25000);
  const [sliderValue, setSliderValue] = useState(45);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [accommodationStyle, setAccommodationStyle] = useState("");
  const [roomStyle, setRoomStyle] = useState("");
  const [likedCards, setLikedCards] = useState({ 1: true });
  const [listings, setListings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);


  const applyFilters = () => {
    console.log("Selected locations:", selectedLocations);
    const filters = {};
    if (selectedLocations.length > 0) filters.location = selectedLocations.join("|");
    if (sliderValue > 0) filters.maxPrice = sliderValue;
    if (accommodationStyle) filters.style = accommodationStyle;
    if (roomStyle) filters.roomStyle = roomStyle;
    console.log("Filters sent:", filters);
    fetchListings(filters);
  };

  const handleLocationChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedLocations(selected);
  };

  const fetchListings = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/listings?${query}`);
      setListings(res.data.listings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/listings/getall");
        setListings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you store JWT
        const bookmarkRes = await axios.get("http://localhost:5000/api/bookmarks", {
          headers: {
            "Authorization": `Bearer ${token}`   // ✅ IMPORTANT
          }
        });
        setUserBookmarks(bookmarkRes.data.bookmarks.map(b => b._id));
      } catch (err) {
        console.error(err);
      }
      
    };
    fetchBookmarks();

  }, [likedCards]);

  // const toggleLike = (id) =>
  //   setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleLike = async (listingId) => {
  try {
    const token = localStorage.getItem("token"); // or wherever you store JWT

    const res = await fetch("http://localhost:5000/api/bookmarks/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // ✅ IMPORTANT
      },
      body: JSON.stringify({ listingId })
    });

    const data = await res.json();

    // update UI after success
    setLikedCards((prev) => ({
      ...prev,
      [listingId]: !prev[listingId]
    }));

    console.log(data)

  } catch (error) {
    console.error("Error toggling bookmark:", error);
  }
};

  const accommodationStyles = [
    "Single",
    "2-sharing",
    "3-sharing",
    "4-sharing",
    "Only for girls",
  ];

  const roomStyles = ["Premium", "Regular"];

  // const styleLabels = {
  //   "Single room": "Private Studio",
  //   "2-sharing room": "Twin Sharing",
  //   "3-sharing room": "Premium Dormitory",
  // };

  // const displayStyles = [
  //   { value: "Single room", label: "Private Studio" },
  //   { value: "2-sharing room", label: "Twin Sharing" },
  //   { value: "3-sharing room", label: "Premium Dormitory" },
  // ];

  console.log(likedCards);
  console.log("User bookmarks:", userBookmarks);

  return (
    <>
    
    <Navbar />
   
      <style>{`
        .curated-wrapper {
          min-height: 100vh;
          background: #f6f5fb;
          font-family: sans-serif;
        }
        .curated-layout {
          display: flex;
          flex-direction: row;
          gap: 24px;
          padding: 40px 24px 24px;
          align-items: flex-start;
        }
        .sidebar {
          width: 260px;
          flex-shrink: 0;
        }
        .sidebar-inner {
          background: #f3f2fb;
          border: 1px solid #e5e3f5;
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(99,102,241,0.08);
        }
        .main-content {
          flex: 1;
          min-width: 0;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .mobile-filter-btn {
          display: none;
          width: 100%;
          padding: 13px 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 16px;
        }
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 40;
        }
        .sidebar-drawer {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 290px;
          background: #f3f2fb;
          z-index: 50;
          overflow-y: auto;
          padding: 24px 20px;
          box-shadow: 4px 0 24px rgba(99,102,241,0.15);
        }
        .close-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 16px;
        }
        .close-btn button {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #4f46e5;
        }

        @media (max-width: 900px) {
          .curated-layout {
            padding: 24px 16px 16px;
            gap: 16px;
          }
          .sidebar {
            display: none;
          }
          .mobile-filter-btn {
            display: block;
          }
          .sidebar-overlay.open {
            display: block;
          }
          .sidebar-drawer.open {
            display: block;
          }
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 600px) {
          .curated-layout {
            padding: 16px 12px 12px;
          }
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .header-row {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start !important;
          }
          .banner-inner {
            flex-direction: column !important;
            gap: 16px !important;
            padding: 24px 20px !important;
          }
          .banner-btn {
            width: 100%;
          }
          .banner-title {
            font-size: 22px !important;
          }
        }

        @media (max-width: 400px) {
          .card-price {
            font-size: 14px !important;
          }
          .card-title {
            font-size: 14px !important;
          }
        }
          /* existing rules stay the same, just ADD these at the bottom */

@media (min-width: 1441px) {

  .sidebar {
    width: 300px;
  
  }
  .cards-grid {
    grid-template-columns: repeat(2, 500px);
  }
  
}

      `}</style>

      <div className="curated-wrapper">
        {/* Mobile sidebar overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Mobile drawer */}
        <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
          <div className="close-btn">
            <button onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <SidebarContent
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            locationDataset={locationDataset}
            accommodationStyle={accommodationStyle}
            setAccommodationStyle={setAccommodationStyle}
            accommodationStyles={accommodationStyles}
            roomStyle={roomStyle}
            setRoomStyle={setRoomStyle}
            roomStyles={roomStyles}
            applyFilters={applyFilters}
          />
        </div>

        <div style={{  margin: "0 auto", width: "100%" }}>

        <div className="curated-layout">
          {/* Desktop sidebar */}
          <div className="sidebar">
            <aside className="sidebar-inner">
              <SidebarContent
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                locationDataset={locationDataset}
                accommodationStyle={accommodationStyle}
                setAccommodationStyle={setAccommodationStyle}
                accommodationStyles={accommodationStyles}
                roomStyle={roomStyle}
                setRoomStyle={setRoomStyle}
                roomStyles={roomStyles}
                applyFilters={applyFilters}
              />
            </aside>
          </div>

          {/* Main */}
          <main className="main-content">
            {/* Mobile filter button */}
            <button className="mobile-filter-btn" onClick={() => setSidebarOpen(true)}>
              ⚙ Filter & Search
            </button>

            {/* Header */}
            <div
              className="header-row"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}
            >
              <div>
                <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#1f2937", letterSpacing: "-0.02em" }}>
                  Curated Findings
                </h1>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>
                  24 Academic residences matching your intellectual profile.
                </p>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button style={{ padding: "8px 10px", background: "#ede9fe", border: "none", borderRadius: 8, cursor: "pointer", color: "#4f46e5", fontSize: 16 }}>⊞</button>
                <button style={{ padding: "8px 10px", background: "#fff", border: "1px solid #e5e3f5", borderRadius: 8, cursor: "pointer", color: "#9ca3af", fontSize: 14 }}>☰</button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="cards-grid">
              {listings.map((listing, index) => {
                const price = listing.price || prices[index % prices.length];
                const isBookmarked = userBookmarks.includes(listing._id);

                if(userBookmarks.includes(listing._id)) {
                  console.log(listing.title, "is bookmarked");
                }

                return (
                  <div
                    key={listing._id}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      overflow: "hidden",
                      border: "1px solid #f0eeff",
                      boxShadow: "0 2px 12px rgba(99,102,241,0.06)",
                    }}
                  >
                    <div style={{ position: "relative", height: 200, overflow: "hidden" }} className="desktop_card">
                      <img
                        src="https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
                        //  src={listing.images[0]}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        alt={listing.title}
                      />
                      {listing.verified && (
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          background: "#0d9488", color: "#fff",
                          fontSize: 10, fontWeight: 700, padding: "5px 12px",
                          borderRadius: 20, letterSpacing: "0.06em",
                        }}>
                          VERIFIED
                        </div>
                      )}
                      {/* <button
                        onClick={() => toggleLike(listing._id)}
                        style={{
                          position: "absolute", top: 12, right: 12,
                          width: 34, height: 34, borderRadius: "50%",
                          background: "#fff", border: "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                          fontSize: 15, color: isLiked ? "#ef4444" : "#d1d5db",
                        }}
                      >
                        {isLiked ? "♥" : "♡"}
                      </button> */}
                      <button
                        onClick={() => toggleLike(listing._id)}
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                          fontSize: 15,
                          color: isBookmarked ? "#ef4444" : "#d1d5db",
                        }}
                      >
                        {isBookmarked  ? "♥" : "♡"}
                      </button>
                    </div>

                    <div style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <h3 className="card-title" style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#1f2937" }}>
                          {listing.title}
                        </h3>
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                          <span className="card-price" style={{ fontWeight: 800, fontSize: 16, color: "#4f46e5" }}>
                            ₹{Number(price).toLocaleString("en-IN")}
                          </span>
                          <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.05em" }}>PER MONTH</div>
                        </div>
                      </div>

                      <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280" }}>
                        {listing.description}
                      </p>

                      <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 12 }}>📍</span>
                        {listing.location}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                        {listing.amenities?.map((a) => (
                          <span
                            key={a}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              padding: "4px 10px", fontSize: 11,
                              background: "#f0eeff", color: "#4f46e5",
                              borderRadius: 20, fontWeight: 500,
                            }}
                          >
                            <span style={{ fontSize: 11 }}>{tagIcons[a] || "•"}</span>
                            {a}
                          </span>
                        ))}
                      </div>

                      <NavLink
                        to={`/propertydetails/${listing._id}`}
                        style={{
                          display: "block", textAlign: "center",
                          padding: "12px 0",
                          border: "1.5px solid #c7c3f8", borderRadius: 12,
                          color: "#4f46e5", fontSize: 12, fontWeight: 700,
                          letterSpacing: "0.08em", textDecoration: "none",
                          background: "#fff",
                        }}
                      >
                        VIEW CURATED DETAILS
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Banner */}
            <div
              className="banner-inner"
              style={{
                marginTop: 40, background: "#99f6e4", borderRadius: 20,
                padding: "36px 40px", display: "flex",
                alignItems: "center", justifyContent: "space-between", gap: 24,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 className="banner-title" style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 800, color: "#134e4a" }}>
                  Guaranteed Curated Living
                </h3>
                <p style={{ margin: 0, fontSize: 15, color: "#1f5a52", lineHeight: 1.6, maxWidth: 480 }}>
                  Every listing on our platform undergoes a 50-point quality check by academic consultants. We prioritize your study environment.
                </p>
              </div>
              <button
                className="banner-btn"
                style={{
                  flexShrink: 0, padding: "14px 28px",
                  background: "#0f766e", border: "none", borderRadius: 14,
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                Learn About Safety
              </button>
            </div>
          </main>
        </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}

function SidebarContent({
  sliderValue, setSliderValue,
  selectedLocations, setSelectedLocations,
  locationDataset,
  accommodationStyle, setAccommodationStyle,
  accommodationStyles, roomStyle, roomStyles, setRoomStyle,
  applyFilters,
}) {
  return (
    <>
      <h2 style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", margin: "0 0 20px" }}>
        Curate Search
      </h2>

      {/* Price Range */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          Price Range (Monthly)
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
            ₹2k
          </div>
          <span style={{ color: "#9ca3af", fontSize: 13 }}>—</span>
          <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
            ₹25k+
          </div>
        </div>
        <input
          type="range" min={2000} max={25000} value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#4f46e5", cursor: "pointer" }}
        />
      </div>

      {/* Locations */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          Strategic Locations
        </p>
        <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e5e3f5', borderRadius: 14, padding: 12, background: '#fff' }}>
          {locationDataset.map((area) => (
            <div key={area.area_id} style={{ marginBottom: 9 }}>
              <button
                onClick={() => {
                  if (selectedLocations.includes(area.area)) {
                    setSelectedLocations(selectedLocations.filter(loc => loc !== area.area));
                  } else {
                    setSelectedLocations([...selectedLocations, area.area]);
                  }
                }}
                style={{
                  width: '100%', textAlign: 'left', padding: '5px 14px', borderRadius: 12,
                  border: selectedLocations.includes(area.area) ? '1.5px solid #c7c3f8' : '1px solid transparent',
                  background: selectedLocations.includes(area.area) ? '#ede9fe' : 'transparent',
                  color: selectedLocations.includes(area.area) ? '#4f46e5' : '#6b7280',
                  fontSize: 13, fontWeight: selectedLocations.includes(area.area) ? 600 : 400,
                  cursor: 'pointer', marginBottom: 3,
                }}
              >
                {area.area}
              </button>
              {area.sub_areas.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    if (selectedLocations.includes(sub.name)) {
                      setSelectedLocations(selectedLocations.filter(loc => loc !== sub.name));
                    } else {
                      setSelectedLocations([...selectedLocations, sub.name]);
                    }
                  }}
                  style={{
                    width: '100%', textAlign: 'left', padding: '3px 14px', borderRadius: 10, marginLeft: 10,
                    border: selectedLocations.includes(sub.name) ? '1.5px solid #c7c3f8' : '1px solid transparent',
                    background: selectedLocations.includes(sub.name) ? '#ede9fe' : 'transparent',
                    color: selectedLocations.includes(sub.name) ? '#4f46e5' : '#6b7280',
                    fontSize: 12, fontWeight: selectedLocations.includes(sub.name) ? 600 : 400,
                    cursor: 'pointer', marginBottom: 2,
                  }}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation Style */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          Accommodation Style
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {accommodationStyles.map((style) => (
            <button
              key={style}
              onClick={() => setAccommodationStyle(style)}
              style={{
                textAlign: "left", padding: "9px 14px", borderRadius: 12,
                border: accommodationStyle === style ? "1.5px solid #c7c3f8" : "1px solid transparent",
                background: accommodationStyle === style ? "#ede9fe" : "transparent",
                color: accommodationStyle === style ? "#4f46e5" : "#6b7280",
                fontSize: 13, fontWeight: accommodationStyle === style ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Room Style */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          Room Style
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {roomStyles.map((style) => (
            <button 
              key={style}
              onClick={() => setRoomStyle(style)}
              style={{
                textAlign: "left", padding: "9px 14px", borderRadius: 12,
                border: roomStyle === style ? "1.5px solid #c7c3f8" : "1px solid transparent",
                background: roomStyle === style ? "#ede9fe" : "transparent",
                color: roomStyle === style ? "#4f46e5" : "#6b7280",
                fontSize: 13, fontWeight: roomStyle === style ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>


      {/* College Proximity */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          College Proximity
        </p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#fff", border: "1px solid #c9c6f5", borderRadius: 12,
          padding: "10px 14px", fontSize: 13, color: "#4f46e5", cursor: "pointer",
        }}>
          <span>Within 2km of Presidency University</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>▾</span>
        </div>
      </div>

      {/* Apply */}
      <button
        onClick={applyFilters}
        style={{
          width: "100%", padding: "13px 0",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          border: "none", borderRadius: 14,
          color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}
      >
        Apply Selection
      </button>

      {/* Map Widget */}
      <div style={{
        marginTop: 20, borderRadius: 16, overflow: "hidden",
        position: "relative", height: 120,
        background: "linear-gradient(135deg, #1a3a4a, #0d2b38)", cursor: "pointer",
      }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4dd9ac" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <ellipse cx="60" cy="55" rx="30" ry="18" fill="#2a5a4a" opacity="0.7" />
          <ellipse cx="130" cy="50" rx="40" ry="22" fill="#2a5a4a" opacity="0.7" />
          <ellipse cx="185" cy="48" rx="20" ry="15" fill="#2a5a4a" opacity="0.7" />
          <ellipse cx="155" cy="72" rx="15" ry="10" fill="#2a5a4a" opacity="0.6" />
          <ellipse cx="205" cy="65" rx="18" ry="22" fill="#2a5a4a" opacity="0.7" />
        </svg>
        <div style={{
          position: "absolute", bottom: 10, left: 12,
          background: "rgba(10,30,40,0.8)", borderRadius: 8,
          padding: "5px 12px", fontSize: 11, fontWeight: 700,
          color: "#e2e8f0", letterSpacing: "0.1em",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          INTERACTIVE MAP
          <span style={{ fontSize: 12, opacity: 0.7 }}>↗</span>
        </div>
      </div>
     </>
  );
}














// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/AcademicCurator.css";
// import { NavLink } from "react-router-dom";
// import MainFooter from "../components/MainFooter";
// import { useEffect } from "react";
// import axios from "axios";

// const tagIcons = {
//   "High Speed WiFi": "📶",
//   "Bi-weekly Cleaning": "🧹",
//   "Meal Plans": "🍽️",
//   "Laundry Suite": "👕",
//   "24/7 Concierge": "🔔",
//   "Social Lounge": "🛋️",
//   "Shared Pantry": "🥘",
//   "In-house Gym": "💪",
//   "Airport Shuttle": "🚌",
// };

// export default function Search() {
//   const [priceMin] = useState(8000);
//   const [priceMax] = useState(25000);
//   const [sliderValue, setSliderValue] = useState(45);
//   const [locations, setLocations] = useState({
//     "Salt Lake": true,
//     "Park Street": false,
//     "Jadavpur": false,
//   });
//   const [accommodationStyle, setAccommodationStyle] = useState("");
//   const [likedCards, setLikedCards] = useState({ 1: true });
//   const [listings, setListings] = useState([]);

//   const applyFilters = () => {
//     const selectedLocations = Object.keys(locations).filter((loc) => locations[loc]);
//     console.log("Selected locations:", selectedLocations);
//     const filters = {};
//     if (selectedLocations.length > 0) filters.location = selectedLocations.join("|");
//     if (sliderValue > 0) filters.maxPrice = sliderValue;
//     if (accommodationStyle) filters.style = accommodationStyle;
//     console.log("Filters sent:", filters);
//     fetchListings(filters);
//   };

//   const fetchListings = async (filters = {}) => {
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const res = await axios.get(`http://localhost:5000/api/listings?${query}`);
//       setListings(res.data.listings);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/listings/getall");
//         setListings(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const toggleLocation = (loc) => {
//     setLocations((prev) => ({ ...prev, [loc]: !prev[loc] }));
//   };

//   const toggleLike = (id) =>
//     setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));

//   const accommodationStyles = [
//     "Single room",
//     "Single AC room",
//     "2-sharing room",
//     "3-sharing room",
//     "4-sharing room",
//     "Only for girls",
//   ];

//   /* ── display labels matching the screenshot ── */
//   const locationLabels = {
//     "Salt Lake": "Salt Lake Sector V",
//     "Park Street": "Park Street Area",
//     "Jadavpur": "Jadavpur Precincts",
//   };

//   // const styleLabels = {
//   //   "Single room": "Private Studio",
//   //   "2-sharing room": "Twin Sharing",
//   //   "3-sharing room": "Premium Dormitory",
//   // };

//   // const displayStyles = [
//   //   { value: "Single room", label: "Private Studio" },
//   //   { value: "2-sharing room", label: "Twin Sharing" },
//   //   { value: "3-sharing room", label: "Premium Dormitory" },
//   // ];

//   return (
//     <>
    
//     <Navbar />
   
//     <div style={{ minHeight: "100vh", background: "#f6f5fb", fontFamily: "sans-serif" }}>

//       <div style={{ display: "flex", flexDirection: "row", paddingTop: 0, gap: 24, padding: "40px 24px 24px", background: "#f6f5fb", alignItems: "flex-start" }}>

//         {/* ── SIDEBAR ── */}
//         <div style={{ width: 260, flexShrink: 0 }}>
//           <aside
//             style={{
//               background: "#f3f2fb",
//               border: "1px solid #e5e3f5",
//               borderRadius: 24,
//               padding: "28px 24px",
//               boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
//             }}
//           >
//             <h2 style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", margin: "0 0 20px" }}>
//               Curate Search
//             </h2>

//             {/* Price Range */}
//             <div style={{ marginBottom: 24 }}>
//               <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
//                 Price Range (Monthly)
//               </p>

//               {/* Min / Max display */}
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
//                 <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
//                   ₹8k
//                 </div>
//                 <span style={{ color: "#9ca3af", fontSize: 13 }}>—</span>
//                 <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
//                   ₹25k+
//                 </div>
//               </div>

//               {/* Slider */}
//               <div style={{ position: "relative", padding: "4px 0" }}>
//                 <input
//                   type="range"
//                   min={0}
//                   max={25000}
//                   value={sliderValue}
//                   onChange={(e) => setSliderValue(Number(e.target.value))}
//                   style={{ width: "100%", accentColor: "#4f46e5", cursor: "pointer" }}
//                 />
//               </div>
//             </div>

//             {/* Strategic Locations */}
//             <div style={{ marginBottom: 24 }}>
//               <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
//                 Strategic Locations
//               </p>
//               {Object.entries(locations).map(([loc, checked]) => (
//                 <label key={loc} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 10, cursor: "pointer", color: "#374151" }}>
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     onChange={() => toggleLocation(loc)}
//                     style={{ accentColor: "#4f46e5", width: 16, height: 16, borderRadius: 4 }}
//                   />
//                   {locationLabels[loc] || loc}
//                 </label>
//               ))}
//             </div>

//             {/* Accommodation Style */}
//             <div style={{ marginBottom: 24 }}>
//               <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
//                 Accommodation Style
//               </p>
//            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//   {accommodationStyles.map((style) => (
//     <button
//       key={style}
//       onClick={() => setAccommodationStyle(style)}
//       style={{
//         textAlign: "left",
//         padding: "9px 14px",
//         borderRadius: 12,
//         border:
//           accommodationStyle === style
//             ? "1.5px solid #c7c3f8"
//             : "1px solid transparent",
//         background:
//           accommodationStyle === style
//             ? "#ede9fe"
//             : "transparent",
//         color:
//           accommodationStyle === style
//             ? "#4f46e5"
//             : "#6b7280",
//         fontSize: 13,
//         fontWeight: accommodationStyle === style ? 600 : 400,
//         cursor: "pointer",
//         transition: "all 0.15s",
//       }}
//     >
//       {style}
//     </button>
//   ))}
// </div>
//             </div>

//             {/* College Proximity */}
//             <div style={{ marginBottom: 24 }}>
//               <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
//                 College Proximity
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   background: "#fff",
//                   border: "1px solid #c9c6f5",
//                   borderRadius: 12,
//                   padding: "10px 14px",
//                   fontSize: 13,
//                   color: "#4f46e5",
//                   cursor: "pointer",
//                 }}
//               >
//                 <span>Within 2km of Presidency University</span>
//                 <span style={{ fontSize: 11, color: "#9ca3af" }}>▾</span>
//               </div>
//             </div>

//             {/* Apply Button */}
//             <button
//               onClick={applyFilters}
//               style={{
//                 width: "100%",
//                 padding: "13px 0",
//                 background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//                 border: "none",
//                 borderRadius: 14,
//                 color: "#fff",
//                 fontWeight: 700,
//                 fontSize: 14,
//                 cursor: "pointer",
//                 letterSpacing: "0.02em",
//               }}
//             >
//               Apply Selection
//             </button>

//             {/* Interactive Map Widget */}
//             <div
//               style={{
//                 marginTop: 20,
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 position: "relative",
//                 height: 120,
//                 background: "linear-gradient(135deg, #1a3a4a, #0d2b38)",
//                 cursor: "pointer",
//               }}
//             >
//               {/* Map grid lines */}
//               <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
//                 <defs>
//                   <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
//                     <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4dd9ac" strokeWidth="0.5" />
//                   </pattern>
//                 </defs>
//                 <rect width="100%" height="100%" fill="url(#grid)" />
//                 {/* Continents simplified */}
//                 <ellipse cx="60" cy="55" rx="30" ry="18" fill="#2a5a4a" opacity="0.7" />
//                 <ellipse cx="130" cy="50" rx="40" ry="22" fill="#2a5a4a" opacity="0.7" />
//                 <ellipse cx="185" cy="48" rx="20" ry="15" fill="#2a5a4a" opacity="0.7" />
//                 <ellipse cx="155" cy="72" rx="15" ry="10" fill="#2a5a4a" opacity="0.6" />
//                 <ellipse cx="205" cy="65" rx="18" ry="22" fill="#2a5a4a" opacity="0.7" />
//               </svg>

//               {/* Label */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 10,
//                   left: 12,
//                   background: "rgba(10,30,40,0.8)",
//                   borderRadius: 8,
//                   padding: "5px 12px",
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#e2e8f0",
//                   letterSpacing: "0.1em",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                 }}
//               >
//                 INTERACTIVE MAP
//                 <span style={{ fontSize: 12, opacity: 0.7 }}>↗</span>
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* ── MAIN CONTENT ── */}
//         <main style={{ flex: 1, minWidth: 0 }}>

//           {/* Header */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
//             <div>
//               <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#1f2937", letterSpacing: "-0.02em" }}>
//                 Curated Findings
//               </h1>
//               <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>
//                 24 Academic residences matching your intellectual profile.
//               </p>
//             </div>
//             {/* Grid/List toggle */}
//             <div style={{ display: "flex", gap: 6 }}>
//               <button style={{ padding: "8px 10px", background: "#ede9fe", border: "none", borderRadius: 8, cursor: "pointer", color: "#4f46e5", fontSize: 16 }}>⊞</button>
//               <button style={{ padding: "8px 10px", background: "#fff", border: "1px solid #e5e3f5", borderRadius: 8, cursor: "pointer", color: "#9ca3af", fontSize: 14 }}>☰</button>
//             </div>
//           </div>

//           {/* Cards Grid */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
//             {listings.map((listing, index) => {
//               const badges = [
//                 { label: "VERIFIED", color: "#0d9488", bg: "#0d9488" },
//                 // { label: "ONLY 2 LEFT", color: "#b45309", bg: "#b45309" },
//                 // { label: "BUDGET FRIENDLY", color: "#0d9488", bg: "#0d9488" },
//                 // { label: "PREMIUM PICK", color: "#1d4ed8", bg: "#1d4ed8" },
//               ];
//               const badge = badges[index % badges.length];

//               // const amenitySets = [
//               //   ["High Speed WiFi", "Bi-weekly Cleaning", "Meal Plans"],
//               //   ["Laundry Suite", "24/7 Concierge"],
//               //   ["Social Lounge", "Shared Pantry"],
//               //   ["In-house Gym", "Airport Shuttle"],
//               // ];
//               // const amenities = amenitySets[index % amenitySets.length];

//               const prices = [18500, 22000, 9500, 24000];
//               const price = listing.price || prices[index % prices.length];

//               const subtitles = [
//                 "Salt Lake, Sector V • 0.8km from Techno India",
//                 "Park Street • 0.3km from St. Xavier's",
//                 "Jadavpur • 1.2km from Jadavpur University",
//                 "Ballygunge • 1.5km from Calcutta University",
//               ];
//               const subtitle = subtitles[index % subtitles.length];

//               const isLiked = likedCards[listing._id];

//               return (
//                 <div
//                   key={listing._id}
//                   style={{
//                     background: "#fff",
//                     borderRadius: 20,
//                     overflow: "hidden",
//                     border: "1px solid #f0eeff",
//                     boxShadow: "0 2px 12px rgba(99,102,241,0.06)",
//                     transition: "box-shadow 0.2s",
//                   }}
//                 >
//                   {/* Image */}
//                   <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
//                     <img
//                       src="https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
//                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//                       alt={listing.title}
//                     />
//                     {/* Badge top-left */}
//           {listing.verified && (
//   <div
//     style={{
//       position: "absolute",
//       top: 14,
//       left: 14,
//       background: badge.bg,
//       color: "#fff",
//       fontSize: 10,
//       fontWeight: 700,
//       padding: "5px 12px",
//       borderRadius: 20,
//       letterSpacing: "0.06em",
//     }}
//   >
//     {badge.label}
//   </div>
// )}
//                     {/* Like button top-right */}
//                     <button
//                       onClick={() => toggleLike(listing._id)}
//                       style={{
//                         position: "absolute",
//                         top: 12,
//                         right: 12,
//                         width: 34,
//                         height: 34,
//                         borderRadius: "50%",
//                         background: "#fff",
//                         border: "none",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: "pointer",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//                         fontSize: 15,
//                         color: isLiked ? "#ef4444" : "#d1d5db",
//                       }}
//                     >
//                       {isLiked ? "♥" : "♡"}
//                     </button>
//                   </div>

//                   {/* Info */}
//                   <div style={{ padding: "16px 18px" }}>
//                     {/* Title & Price */}
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
//                       <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#1f2937" }}>
//                         {listing.title}
//                       </h3>
//                       <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
//                         <span style={{ fontWeight: 800, fontSize: 16, color: "#4f46e5" }}>
//                           ₹{Number(price).toLocaleString("en-IN")}
//                         </span>
//                         <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.05em" }}>PER MONTH</div>
//                       </div>
//                     </div>

//                         <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                      
//                       {listing.description}
//                     </p>
//                     {/* Location */}
//                     <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
//                       <span style={{ fontSize: 12 }}>📍</span>
//                       {listing.location }
//                     </p>

                    

//                     {/* Amenity Tags */}
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
//                       {listing.amenities?.map((a) => (
//                         <span
//                           key={a}
//                           style={{
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: 4,
//                             padding: "4px 10px",
//                             fontSize: 11,
//                             background: "#f0eeff",
//                             color: "#4f46e5",
//                             borderRadius: 20,
//                             fontWeight: 500,
//                           }}
//                         >
//                           <span style={{ fontSize: 11 }}>{tagIcons[a] || "•"}</span>
//                           {a}
//                         </span>
//                       ))}
//                     </div>

//                     {/* CTA Button */}
//                     <NavLink
//                       to={`/propertydetails/${listing._id}`}
//                       style={{
//                         display: "block",
//                         textAlign: "center",
//                         padding: "12px 0",
//                         border: "1.5px solid #c7c3f8",
//                         borderRadius: 12,
//                         color: "#4f46e5",
//                         fontSize: 12,
//                         fontWeight: 700,
//                         letterSpacing: "0.08em",
//                         textDecoration: "none",
//                         background: "#fff",
//                         transition: "background 0.15s",
//                       }}
//                     >
//                       VIEW CURATED DETAILS
//                     </NavLink>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Guaranteed Living Banner */}
//           <div
//             style={{
//               marginTop: 40,
//               background: "#99f6e4",
//               borderRadius: 20,
//               padding: "36px 40px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 24,
//             }}
//           >
//             <div style={{ flex: 1 }}>
//               <h3 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 800, color: "#134e4a" }}>
//                 Guaranteed Curated Living
//               </h3>
//               <p style={{ margin: 0, fontSize: 15, color: "#1f5a52", lineHeight: 1.6, maxWidth: 480 }}>
//                 Every listing on our platform undergoes a 50-point quality check by academic consultants. We prioritize your study environment.
//               </p>
//             </div>
//             <button
//               style={{
//                 flexShrink: 0,
//                 padding: "14px 28px",
//                 background: "#0f766e",
//                 border: "none",
//                 borderRadius: 14,
//                 color: "#fff",
//                 fontWeight: 700,
//                 fontSize: 15,
//                 cursor: "pointer",
//                 whiteSpace: "nowrap",
//                 transition: "background 0.15s",
//               }}
//             >
//               Learn About Safety
//             </button>
//           </div>
//         </main>
//       </div>

//       <MainFooter />
//     </div>
//      </>
//   );
// }


