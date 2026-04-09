

import { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { NavLink } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
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
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl ${
        isActive
          ? "bg-teal-100 text-teal-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-teal-600" : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

function PropertyRow({ property }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      className="group transition-colors hover:bg-[#f3eeff]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <img
            src={property.img}
            alt={property.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-bold text-[#2e2a50]">{property.name}</p>
            <p className="text-xs text-[#5c5680]">{property.location}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="font-medium text-[#2e2a50]">{property.rent}</span>
        <span className="text-xs text-[#5c5680]">/month</span>
      </td>
      <td className="px-8 py-6">
        <StatusBadge status={property.status} />
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <span className="text-[#2e2a50] font-bold">{property.inquiries}</span>
          <span className={`text-xs ${property.inquiryBadgeClass}`}>
            {property.inquiryBadge}
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <div
          className={`flex items-center justify-end gap-2 transition-opacity ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-2 text-[#4953ac] hover:bg-[#4953ac]/10 rounded-lg">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="p-2 text-[#5c5680] hover:bg-[#dfd8ff] rounded-lg">
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

// Auto slide (pause on hover)
useEffect(() => {
  if (isHovered) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, [isHovered]);

// Manual controls
const nextSlide = () => {
  setCurrentIndex((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  );
};
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
        body { font-family: 'Inter', sans-serif; }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

     <Navbar/>
      <div className="bg-[#f9f4ff] text-[#2e2a50] antialiased">
  <main className="px-4 sm:px-6 lg:px-10 xl:px-16 2xl:w-[73vw] xl:w-[100%]  mx-auto py-6">

    {/* Header */}
    <header className="flex flex-col w-auto sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 mt-6 sm:mt-10 lg:mt-16">
      <div className="w-auto">
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#2e2a50] mb-2">
          Owner Dashboard
        </h1>
        <p className="text-[#5c5680] text-sm leading-relaxed">
          Manage your curated student residences and track your portfolio's performance across Kolkata.
        </p>
      </div>
      <button className="bg-gradient-to-br from-[#4953ac] to-[#929bfa] text-white w-full sm:w-52 h-10 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4953ac]/20 active:scale-95 transition-transform hover:scale-105 flex-shrink-0">
        <span className="material-symbols-outlined text-base">add_circle</span>
        Add New Listing
      </button>
    </header>

    {/* Analytics Bento Grid */}
 {/* <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-12"> */}

  {/* Total Views */}
  {/* <div className="sm:col-span-2 lg:col-span-2 bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[180px] relative overflow-hidden">
    <p className="text-[#5c5680] uppercase tracking-widest text-xs font-bold">
      Total Property Views
    </p>

    <div className="flex items-baseline gap-2 mt-4">
      <span className="text-4xl xl:text-5xl font-extrabold text-[#4953ac]">
        12,482
      </span>
      <span className="text-teal-600 font-bold text-sm flex items-center gap-1">
        +14%
        <span className="material-symbols-outlined text-xs">trending_up</span>
      </span>
    </div>
  </div> */}

  {/* Inquiries */}
  {/* <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[180px] border-l-4 border-[#a83206]">
    <p className="text-[#5c5680] uppercase tracking-widest text-xs font-bold">
      Inquiries (Oct)
    </p>

    <span className="text-4xl font-extrabold text-[#2e2a50] mt-4">
      148
    </span>

    <p className="text-[#5c5680] text-sm mt-auto">
      24 pending response
    </p>
  </div> */}

  {/* Avg Response Time */}
  {/* <div className="bg-[#81f3e5] p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[180px]">
    <p className="text-[#005a53] uppercase tracking-widest text-xs font-bold">
      Avg. Response Time
    </p>

    <span className="text-4xl font-extrabold text-[#005a53] mt-4">
      2.4h
    </span>

    <div className="flex gap-1 mt-auto">
      <span className="w-2 h-2 rounded-full bg-[#005a53]" />
      <span className="w-2 h-2 rounded-full bg-[#005a53] opacity-40" />
      <span className="w-2 h-2 rounded-full bg-[#005a53] opacity-40" />
    </div>
  </div> */}

{/* </section>  */}

{/* Hero Image Banner */}
{/* Premium Hero Banner */}
<section className="w-full mb-10 lg:mb-14">
  <div
    className="
      relative w-full 
      min-h-[280px] sm:min-h-[340px] md:min-h-[400px] 
      lg:min-h-[480px] xl:min-h-[560px] 2xl:min-h-[650px]
      rounded-3xl overflow-hidden shadow-2xl group
    "
  >

    {/* Image */}
    <img
      src={images[currentIndex]}
      alt="Room"
      className="
        absolute inset-0 w-full h-full 
        object-cover object-center 
        transition-all duration-1000 ease-in-out
        group-hover:scale-105
      "
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

    {/* LEFT ARROW */}
    <button
      onClick={prevSlide}
      className="
        absolute left-3 sm:left-5 top-1/2 -translate-y-1/2
        bg-white/20 backdrop-blur-md border border-white/30
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full flex items-center justify-center
        text-white text-xl
        hover:bg-white/40 transition-all duration-300
      "
    >
      ‹
    </button>

    {/* RIGHT ARROW */}
    <button
      onClick={nextSlide}
      className="
        absolute right-3 sm:right-5 top-1/2 -translate-y-1/2
        bg-white/20 backdrop-blur-md border border-white/30
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full flex items-center justify-center
        text-white text-xl
        hover:bg-white/40 transition-all duration-300
      "
    >
      ›
    </button>

    {/* Content */}
    <div
      className="
        absolute bottom-4 left-4 right-4 
        sm:left-10 sm:max-w-lg
        backdrop-blur-xl bg-white/10 border border-white/20
        rounded-2xl p-5 sm:p-6 shadow-lg text-white
      "
    >
      <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/80">
        ✨ Verified Listings
      </span>

      <h2 className="text-lg sm:text-2xl lg:text-4xl font-extrabold mb-2 leading-tight">
        Curated Living for Smart Students
      </h2>

      <p className="text-xs sm:text-sm lg:text-base opacity-90 mb-4">
        Discover premium PGs near your college with comfort & safety.
      </p>
      <div className="flex justify-center">

      <NavLink to={"/search"}>

      
      <button className="
        bg-gradient-to-r from-indigo-500 to-purple-500
        px-5 py-5 rounded-xl text-sm font-semibold
        hover:scale-105 transition
        w-full sm:w-40
        h-10
        text-center
      ">
        Explore Now
      </button>
      </NavLink>
      </div>
    </div>

    {/* Dots */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {images.map((_, i) => (
        <div
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
            i === currentIndex ? "bg-white scale-125" : "bg-white/40"
          }`}
        />
      ))}
    </div>

  </div>
</section>
    {/* Listings Section */}
    <section className="mb-8 lg:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#2e2a50]">
          Your Properties
        </h2>
        <div className="bg-[#f3eeff] px-4 py-2 rounded-lg flex items-center gap-2 text-[#5c5680] cursor-pointer hover:bg-[#ebe5ff] transition-colors self-start sm:self-auto">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          <span className="text-sm font-medium">Filter by Status</span>
        </div>
      </div>

      {/* Table — scrollable on small screens */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#f3eeff] text-[#5c5680] text-sm font-bold">
              {["Property Details", "Monthly Rent", "Status", "Inquiries", ""].map((h, i) => (
                <th
                  key={i}
                  className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-5 font-headline whitespace-nowrap ${i === 4 ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ebe5ff]">
            {properties.map((p) => (
              <PropertyRow key={p.id} property={p} />
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Trust Banner */}
    <section className="mt-8 lg:mt-16 bg-[#81f3e5] rounded-2xl lg:rounded-3xl p-8 sm:p-10 lg:p-16 overflow-hidden relative">

      {/* Mobile & Tablet: stacked centered */}
      <div className="flex flex-col items-center text-center gap-6 lg:hidden">
        <div className="w-24 h-24 bg-[#005a53]/10 rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[#005a53] text-6xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
        </div>
        <div className="max-w-md">
          <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#005a53] mb-3">
            Enhance Your Visibility
          </h3>
          <p className="text-[#005a53] opacity-80 mb-6 leading-relaxed text-sm sm:text-base">
            Verified listings receive 4x more engagement from high-intent students.
            Schedule your verification visit today.
          </p>
          <button className="bg-[#005a53] text-[#81f3e5] px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
            Get Verified Now
          </button>
        </div>
      </div>

      {/* Desktop: side by side */}
      <div className="hidden lg:flex lg:flex-row items-center gap-12">
        <div className="relative z-10 max-w-xl">
          <h3 className="font-headline text-3xl font-extrabold text-[#005a53] mb-4">
            Enhance Your Visibility
          </h3>
          <p className="text-[#005a53] opacity-80 mb-8 leading-relaxed">
            Verified listings receive 4x more engagement from high-intent students.
            Schedule your verification visit today.
          </p>
          <button className="bg-[#005a53] text-[#81f3e5] px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95">
            Get Verified Now
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 bg-[#005a53]/10 rounded-full flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[#005a53] text-9xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
        </div>
      </div>

    </section>
  </main>

  <MainFooter />
</div>
    </>
  );
}



    {/* <footer className="bg-[#f3eeff] w-full mt-auto">
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
        </footer> */}