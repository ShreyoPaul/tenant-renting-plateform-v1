import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AcademicCurator.css";
import { NavLink } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import { useEffect } from "react";
import axios from "axios";

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
  const [locations, setLocations] = useState({
    "Salt Lake": true,
    "Park Street": false,
    "Jadavpur": false,
  });
  const [accommodationStyle, setAccommodationStyle] = useState("");
  const [likedCards, setLikedCards] = useState({ 1: true });
  const [listings, setListings] = useState([]);

  const applyFilters = () => {
    const selectedLocations = Object.keys(locations).filter((loc) => locations[loc]);
    console.log("Selected locations:", selectedLocations);
    const filters = {};
    if (selectedLocations.length > 0) filters.location = selectedLocations.join("|");
    if (sliderValue > 0) filters.maxPrice = sliderValue;
    if (accommodationStyle) filters.style = accommodationStyle;
    console.log("Filters sent:", filters);
    fetchListings(filters);
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
  }, []);

  const toggleLocation = (loc) => {
    setLocations((prev) => ({ ...prev, [loc]: !prev[loc] }));
  };

  const toggleLike = (id) =>
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const accommodationStyles = [
    "Single room",
    "Single AC room",
    "2-sharing room",
    "3-sharing room",
    "4-sharing room",
    "Only for girls",
  ];

  /* ── display labels matching the screenshot ── */
  const locationLabels = {
    "Salt Lake": "Salt Lake Sector V",
    "Park Street": "Park Street Area",
    "Jadavpur": "Jadavpur Precincts",
  };

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

  return (
    <>
    
    <Navbar />
   
    <div style={{ minHeight: "100vh", background: "#f6f5fb", fontFamily: "sans-serif" }}>

      <div style={{ display: "flex", flexDirection: "row", paddingTop: 0, gap: 24, padding: "40px 24px 24px", background: "#f6f5fb", alignItems: "flex-start" }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <aside
            style={{
              background: "#f3f2fb",
              border: "1px solid #e5e3f5",
              borderRadius: 24,
              padding: "28px 24px",
              boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", margin: "0 0 20px" }}>
              Curate Search
            </h2>

            {/* Price Range */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                Price Range (Monthly)
              </p>

              {/* Min / Max display */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
                  ₹8k
                </div>
                <span style={{ color: "#9ca3af", fontSize: 13 }}>—</span>
                <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e3f5", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "center" }}>
                  ₹25k+
                </div>
              </div>

              {/* Slider */}
              <div style={{ position: "relative", padding: "4px 0" }}>
                <input
                  type="range"
                  min={0}
                  max={25000}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#4f46e5", cursor: "pointer" }}
                />
              </div>
            </div>

            {/* Strategic Locations */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                Strategic Locations
              </p>
              {Object.entries(locations).map(([loc, checked]) => (
                <label key={loc} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 10, cursor: "pointer", color: "#374151" }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleLocation(loc)}
                    style={{ accentColor: "#4f46e5", width: 16, height: 16, borderRadius: 4 }}
                  />
                  {locationLabels[loc] || loc}
                </label>
              ))}
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
        textAlign: "left",
        padding: "9px 14px",
        borderRadius: 12,
        border:
          accommodationStyle === style
            ? "1.5px solid #c7c3f8"
            : "1px solid transparent",
        background:
          accommodationStyle === style
            ? "#ede9fe"
            : "transparent",
        color:
          accommodationStyle === style
            ? "#4f46e5"
            : "#6b7280",
        fontSize: 13,
        fontWeight: accommodationStyle === style ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  border: "1px solid #c9c6f5",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#4f46e5",
                  cursor: "pointer",
                }}
              >
                <span>Within 2km of Presidency University</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>▾</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              style={{
                width: "100%",
                padding: "13px 0",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: 14,
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Apply Selection
            </button>

            {/* Interactive Map Widget */}
            <div
              style={{
                marginTop: 20,
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                height: 120,
                background: "linear-gradient(135deg, #1a3a4a, #0d2b38)",
                cursor: "pointer",
              }}
            >
              {/* Map grid lines */}
              <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4dd9ac" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Continents simplified */}
                <ellipse cx="60" cy="55" rx="30" ry="18" fill="#2a5a4a" opacity="0.7" />
                <ellipse cx="130" cy="50" rx="40" ry="22" fill="#2a5a4a" opacity="0.7" />
                <ellipse cx="185" cy="48" rx="20" ry="15" fill="#2a5a4a" opacity="0.7" />
                <ellipse cx="155" cy="72" rx="15" ry="10" fill="#2a5a4a" opacity="0.6" />
                <ellipse cx="205" cy="65" rx="18" ry="22" fill="#2a5a4a" opacity="0.7" />
              </svg>

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  background: "rgba(10,30,40,0.8)",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#e2e8f0",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                INTERACTIVE MAP
                <span style={{ fontSize: 12, opacity: 0.7 }}>↗</span>
              </div>
            </div>
          </aside>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#1f2937", letterSpacing: "-0.02em" }}>
                Curated Findings
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>
                24 Academic residences matching your intellectual profile.
              </p>
            </div>
            {/* Grid/List toggle */}
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ padding: "8px 10px", background: "#ede9fe", border: "none", borderRadius: 8, cursor: "pointer", color: "#4f46e5", fontSize: 16 }}>⊞</button>
              <button style={{ padding: "8px 10px", background: "#fff", border: "1px solid #e5e3f5", borderRadius: 8, cursor: "pointer", color: "#9ca3af", fontSize: 14 }}>☰</button>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {listings.map((listing, index) => {
              const badges = [
                { label: "VERIFIED", color: "#0d9488", bg: "#0d9488" },
                // { label: "ONLY 2 LEFT", color: "#b45309", bg: "#b45309" },
                // { label: "BUDGET FRIENDLY", color: "#0d9488", bg: "#0d9488" },
                // { label: "PREMIUM PICK", color: "#1d4ed8", bg: "#1d4ed8" },
              ];
              const badge = badges[index % badges.length];

              // const amenitySets = [
              //   ["High Speed WiFi", "Bi-weekly Cleaning", "Meal Plans"],
              //   ["Laundry Suite", "24/7 Concierge"],
              //   ["Social Lounge", "Shared Pantry"],
              //   ["In-house Gym", "Airport Shuttle"],
              // ];
              // const amenities = amenitySets[index % amenitySets.length];

              const prices = [18500, 22000, 9500, 24000];
              const price = listing.price || prices[index % prices.length];

              const subtitles = [
                "Salt Lake, Sector V • 0.8km from Techno India",
                "Park Street • 0.3km from St. Xavier's",
                "Jadavpur • 1.2km from Jadavpur University",
                "Ballygunge • 1.5km from Calcutta University",
              ];
              const subtitle = subtitles[index % subtitles.length];

              const isLiked = likedCards[listing._id];

              return (
                <div
                  key={listing._id}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid #f0eeff",
                    boxShadow: "0 2px 12px rgba(99,102,241,0.06)",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img
                      src="https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      alt={listing.title}
                    />
                    {/* Badge top-left */}
          {listing.verified && (
  <div
    style={{
      position: "absolute",
      top: 14,
      left: 14,
      background: badge.bg,
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      padding: "5px 12px",
      borderRadius: 20,
      letterSpacing: "0.06em",
    }}
  >
    {badge.label}
  </div>
)}
                    {/* Like button top-right */}
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
                        color: isLiked ? "#ef4444" : "#d1d5db",
                      }}
                    >
                      {isLiked ? "♥" : "♡"}
                    </button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "16px 18px" }}>
                    {/* Title & Price */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#1f2937" }}>
                        {listing.title}
                      </h3>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: "#4f46e5" }}>
                          ₹{Number(price).toLocaleString("en-IN")}
                        </span>
                        <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.05em" }}>PER MONTH</div>
                      </div>
                    </div>

                        <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                      
                      {listing.description}
                    </p>
                    {/* Location */}
                    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 12 }}>📍</span>
                      {listing.location }
                    </p>

                    

                    {/* Amenity Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {listing.amenities?.map((a) => (
                        <span
                          key={a}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "4px 10px",
                            fontSize: 11,
                            background: "#f0eeff",
                            color: "#4f46e5",
                            borderRadius: 20,
                            fontWeight: 500,
                          }}
                        >
                          <span style={{ fontSize: 11 }}>{tagIcons[a] || "•"}</span>
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <NavLink
                      to={`/propertydetails/${listing._id}`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "12px 0",
                        border: "1.5px solid #c7c3f8",
                        borderRadius: 12,
                        color: "#4f46e5",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textDecoration: "none",
                        background: "#fff",
                        transition: "background 0.15s",
                      }}
                    >
                      VIEW CURATED DETAILS
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guaranteed Living Banner */}
          <div
            style={{
              marginTop: 40,
              background: "#99f6e4",
              borderRadius: 20,
              padding: "36px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 800, color: "#134e4a" }}>
                Guaranteed Curated Living
              </h3>
              <p style={{ margin: 0, fontSize: 15, color: "#1f5a52", lineHeight: 1.6, maxWidth: 480 }}>
                Every listing on our platform undergoes a 50-point quality check by academic consultants. We prioritize your study environment.
              </p>
            </div>
            <button
              style={{
                flexShrink: 0,
                padding: "14px 28px",
                background: "#0f766e",
                border: "none",
                borderRadius: 14,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.15s",
              }}
            >
              Learn About Safety
            </button>
          </div>
        </main>
      </div>

      <MainFooter />
    </div>
     </>
  );
}














// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/AcademicCurator.css";
// import { listings } from "../data/ListingData";
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
//   const [accommodationStyle, setAccommodationStyle] =
//     useState("");
//   const [likedCards, setLikedCards] = useState({ 1: true });
//   const [listings, setListings] = useState([]);


//   const applyFilters = () => {
//   const selectedLocations = Object.keys(locations).filter(
//     (loc) => locations[loc]
//   );
// console.log("Selected locations:", selectedLocations);
//   const filters = {};

//   if (selectedLocations.length > 0) {
//     filters.location = selectedLocations.join("|");
//   }

//   if (sliderValue > 0) {
//     filters.maxPrice = sliderValue;
//   }

//   if (accommodationStyle) {
//     filters.style = accommodationStyle;
//   }

//   console.log("Filters sent:", filters);

//   fetchListings(filters);
// };

//   const fetchListings = async (filters = {}) => {
//     try {
//       const query = new URLSearchParams(filters).toString();

//       const res = await axios.get(
//         `http://localhost:5000/api/listings?${query}`,
//       );

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
//         const res = await axios.get(
//           "http://localhost:5000/api/listings/getall",
//         ); // your API
//         setListings(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // const toggleLocation = (loc) =>
//   //   setLocations((prev) => ({ ...prev, [loc]: !prev[loc] }));

//   const toggleLocation = (loc) => {
//   setLocations((prev) => ({
//     ...prev,
//     [loc]: !prev[loc],
//   }));
// };

//   const toggleLike = (id) =>
//     setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));

//   return (
//    <div className="min-h-screen bg-gray-50 font-sans">
//   <Navbar />

//   <div className="flex flex-col lg:flex-row pt-20 px-4 sm:px-6 lg:px-10 gap-6 bg-[#f6f5fb]">

//     {/* ── SIDEBAR ── */}
//     <div className="w-full lg:w-[280px] xl:w-[300px]">
//       <aside className="bg-[#f3f2fb] border border-[#e5e3f5] rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">

//         <h2 className="text-lg font-bold text-gray-900 mb-5">
//           Curate Search
//         </h2>

//         {/* Price */}
//         <div className="mb-6">
//           <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
//             Price Range
//           </p>

//           <p className="font-bold text-sm mb-2">
//             ₹{sliderValue}
//           </p>

//           <input
//             type="range"
//             min={0}
//             max={25000}
//             value={sliderValue}
//             onChange={(e) => setSliderValue(Number(e.target.value))}
//             className="w-full accent-indigo-600 cursor-pointer"
//           />
//         </div>

//         {/* Locations */}
//         <div className="mb-6">
//           <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
//             Locations
//           </p>

//           {Object.entries(locations).map(([loc, checked]) => (
//             <label key={loc} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 onChange={() => toggleLocation(loc)}
//                 className="accent-indigo-600"
//               />
//               {loc}
//             </label>
//           ))}
//         </div>

//         {/* Style */}
//         <div className="mb-6">
//           <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
//             Accommodation Style
//           </p>

//           <div className="flex flex-col gap-2">
//             {[
//               "Single room",
//               "2-sharing room",
//               "Single AC room",
//               "3-sharing room",
//               "4-sharing room",
//               "Only for girls",
//             ].map((style) => (
//               <button
//                 key={style}
//                 onClick={() => setAccommodationStyle(style)}
//                 className={`w-full text-sm text-left rounded-xl border h-10 px-3 transition ${
//                   accommodationStyle === style
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "hover:bg-indigo-50 text-gray-600"
//                 }`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           onClick={applyFilters}
//           className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold"
//         >
//           Apply Selection
//         </button>
//       </aside>
//     </div>

//     {/* ── MAIN CONTENT ── */}
//     <main className="flex-1 min-w-0 overflow-hidden">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold">
//             Curated Findings
//           </h1>
//           <p className="text-sm text-gray-500">
//             24 Academic residences matching your profile
//           </p>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:w-fit">

//         {listings.map((listing) => (
//           <div
//             key={listing._id}
//             className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition"
//           >
//             {/* Image */}
//             <div className="relative h-40 sm:h-44 md:h-48  overflow-hidden rounded-t-2xl">
//               <img
//                 src="https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Info */}
//             <div className="p-4">
//               <h3 className="font-bold text-gray-900">
//                 {listing.title}
//               </h3>

//               <p className="text-sm text-indigo-600 font-bold">
//                 ₹{listing.price}
//               </p>

//               <p className="text-xs text-gray-500">
//                 📍 {listing.location}
//               </p>
//    <p className="text-xs text-gray-400 mb-4 line-clamp-2">
//                     {listing.description}
//                   </p>
//               <NavLink
//                 to={`/propertydetails/${listing._id}`}
//                 className="mt-3 block text-center bg-indigo-500 text-white py-10 rounded-lg text-xs"
//               >
//                 View Details
//               </NavLink>
//             </div>
//           </div>
//         ))}

//       </div>

//       {/* Banner */}
// <div className="mt-10 w-full ">
//   <div className="
//     bg-teal-100 rounded-2xl px-6 py-6 
//     flex flex-col 
//     items-center 
//     gap-6
//     lg:flex-row lg:items-center lg:justify-between
//     h-28
//   ">

//     {/* Text */}
//     <div className="text-center lg:text-left lg:flex-1">
//       <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
//         Guaranteed Curated Living
//       </h3>
//       <p className="text-sm sm:text-base text-gray-600">
//         Every listing undergoes quality check.
//       </p>
//     </div>

//     {/* Button */}
//     <button
//       className="
//         bg-teal-700 text-white 
//         px-6 py-3 
//         rounded-xl 
//         text-sm sm:text-base 
//         w-full sm:w-auto 
//         min-w-[160px]
//         flex-shrink-0
//         transition-all duration-300
//         hover:bg-teal-800 hover:scale-105
//       "
//     >
//       Learn More
//     </button>

//   </div>
// </div>
//     </main>
//   </div>

//   <MainFooter />
// </div>
//   );
// }






{
  /* College Proximity */
}
{
  /* <div className="mb-6">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
        College Proximity
      </p>

      <div className="w-full bg-gray-50 border border-[#c9c6f5] text-[#5b5bd6] hover:bg-[#5b5bd6] hover:text-white rounded-xl px-4 py-2.5 text-sm text-gray-700 flex justify-between items-center cursor-pointer hover:border-indigo-300 transition">
        Within 2km of Presidency University
        <span className="text-gray-400">▾</span>
      </div>
    </div> */
}

{
  /* Button */
}
{
  /* <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
      Apply Selection
    </button> */
}
{
  /* <div className="mt-12">
  <button
   onClick={() => {
  const selectedLocations = Object.keys(locations).filter(
    (loc) => locations[loc]
  );

  const filters = {};

  // Location
  if (selectedLocations.length > 0) {
    filters.location = selectedLocations.join("|");
  }

  // Price
  // const maxPriceValue = Math.floor((sliderValue / 100) * 25000);
 const maxPriceValue = sliderValue;
console.log("Max Price Sent:", maxPriceValue);
if (maxPriceValue > 0) {
  filters.maxPrice = maxPriceValue;
}

  // ❌ REMOVE THIS (always true)
  // filters.verified = true;

  // Style
  if (accommodationStyle) {
    filters.style = accommodationStyle;
  }

  fetchListings(filters);
}}
    className="w-full h-12 bg-gradient-to-r from-indigo-500 cursor-pointer to-purple-500 
    hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm 
    rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
  >
    Apply Selection
  </button>
</div> */
}


{/* 
             <button
  onClick={() => {
    const selectedLocations = Object.keys(locations).filter(
      (loc) => locations[loc]
    );

    const filters = {};

    // ✅ Location (multi-select supported)
    if (selectedLocations.length > 0) {
      filters.location = selectedLocations.join("|");
    }

    // ✅ Price (FIXED — no wrong formula)
    if (sliderValue > 0) {
      filters.maxPrice = sliderValue;
    }

    // ❌ REMOVE verified (was breaking results)

    // ✅ Style
    if (accommodationStyle) {
      filters.style = accommodationStyle;
    }

    console.log("Filters sent:", filters); // 🔥 debug

    fetchListings(filters);
  }}
  className="w-full h-12 mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 
  hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm 
  rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
>
  Apply Selection
</button> */}