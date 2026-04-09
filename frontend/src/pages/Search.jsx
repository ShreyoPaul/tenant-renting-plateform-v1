import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AcademicCurator.css";
import { listings } from "../data/ListingData";
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
  const [accommodationStyle, setAccommodationStyle] =
    useState("");
  const [likedCards, setLikedCards] = useState({ 1: true });
  const [listings, setListings] = useState([]);


  const applyFilters = () => {
  const selectedLocations = Object.keys(locations).filter(
    (loc) => locations[loc]
  );
console.log("Selected locations:", selectedLocations);
  const filters = {};

  if (selectedLocations.length > 0) {
    filters.location = selectedLocations.join("|");
  }

  if (sliderValue > 0) {
    filters.maxPrice = sliderValue;
  }

  if (accommodationStyle) {
    filters.style = accommodationStyle;
  }

  console.log("Filters sent:", filters);

  fetchListings(filters);
};

  const fetchListings = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();

      const res = await axios.get(
        `http://localhost:5000/api/listings?${query}`,
      );

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
        const res = await axios.get(
          "http://localhost:5000/api/listings/getall",
        ); // your API
        setListings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // const toggleLocation = (loc) =>
  //   setLocations((prev) => ({ ...prev, [loc]: !prev[loc] }));

  const toggleLocation = (loc) => {
  setLocations((prev) => ({
    ...prev,
    [loc]: !prev[loc],
  }));
};

  const toggleLike = (id) =>
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
   <div className="min-h-screen bg-gray-50 font-sans">
  <Navbar />

  <div className="flex flex-col lg:flex-row pt-20 px-4 sm:px-6 lg:px-10 gap-6 bg-[#f6f5fb]">

    {/* ── SIDEBAR ── */}
    <div className="w-full lg:w-[280px] xl:w-[300px]">
      <aside className="bg-[#f3f2fb] border border-[#e5e3f5] rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">

        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Curate Search
        </h2>

        {/* Price */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Price Range
          </p>

          <p className="font-bold text-sm mb-2">
            ₹{sliderValue}
          </p>

          <input
            type="range"
            min={0}
            max={25000}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Locations */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Locations
          </p>

          {Object.entries(locations).map(([loc, checked]) => (
            <label key={loc} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleLocation(loc)}
                className="accent-indigo-600"
              />
              {loc}
            </label>
          ))}
        </div>

        {/* Style */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Accommodation Style
          </p>

          <div className="flex flex-col gap-2">
            {[
              "Single room",
              "2-sharing room",
              "Single AC room",
              "3-sharing room",
              "4-sharing room",
              "Only for girls",
            ].map((style) => (
              <button
                key={style}
                onClick={() => setAccommodationStyle(style)}
                className={`w-full text-sm text-left rounded-xl border h-10 px-3 transition ${
                  accommodationStyle === style
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={applyFilters}
          className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold"
        >
          Apply Selection
        </button>
      </aside>
    </div>

    {/* ── MAIN CONTENT ── */}
    <main className="flex-1 min-w-0 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Curated Findings
          </h1>
          <p className="text-sm text-gray-500">
            24 Academic residences matching your profile
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:w-fit">

        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative h-40 sm:h-44 md:h-48  overflow-hidden rounded-t-2xl">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900">
                {listing.title}
              </h3>

              <p className="text-sm text-indigo-600 font-bold">
                ₹{listing.price}
              </p>

              <p className="text-xs text-gray-500">
                📍 {listing.location}
              </p>
   <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {listing.description}
                  </p>
              <NavLink
                to={`/propertydetails/${listing._id}`}
                className="mt-3 block text-center bg-indigo-500 text-white py-10 rounded-lg text-xs"
              >
                View Details
              </NavLink>
            </div>
          </div>
        ))}

      </div>

      {/* Banner */}
<div className="mt-10 w-full ">
  <div className="
    bg-teal-100 rounded-2xl px-6 py-6 
    flex flex-col 
    items-center 
    gap-6
    lg:flex-row lg:items-center lg:justify-between
    h-28
  ">

    {/* Text */}
    <div className="text-center lg:text-left lg:flex-1">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Guaranteed Curated Living
      </h3>
      <p className="text-sm sm:text-base text-gray-600">
        Every listing undergoes quality check.
      </p>
    </div>

    {/* Button */}
    <button
      className="
        bg-teal-700 text-white 
        px-6 py-3 
        rounded-xl 
        text-sm sm:text-base 
        w-full sm:w-auto 
        min-w-[160px]
        flex-shrink-0
        transition-all duration-300
        hover:bg-teal-800 hover:scale-105
      "
    >
      Learn More
    </button>

  </div>
</div>
    </main>
  </div>

  <MainFooter />
</div>
  );
}





















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