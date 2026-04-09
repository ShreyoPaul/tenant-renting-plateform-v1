import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import "../styles/AcademicCurator.css";
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
  {
    id: 3,
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
    icon: "✓",
  },
  {
    id: 2,
    label: "In Review",
    date: "Est. outcome in 2 days",
    active: true,
    icon: "●",
    note: "The curator is currently verifying your university enrollment documents.",
  },
  {
    id: 3,
    label: "Deposit Pending",
    date: "Stage 3 of 4",
    icon: "◎",
  },
];

export default function MyAccount() {
  const [activeNav, setActiveNav] = useState("My Account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f7ff]">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-sm">
          <button onClick={() => setSidebarOpen(true)}>☰</button>
          {/* <h1 className="font-bold text-lg">Dashboard</h1> */}
        </div>

        <div className="max-w-[1400px] mx-auto flex overflow-hidden">
          {/* Overlay (IMPORTANT) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* SIDEBAR */}
          <aside
            className={`
    fixed top-0 left-0 h-72 w-[260px] bg-white z-50
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static
    border-r border-gray-200
    flex flex-col justify-between p-5
  `}
          >
            {/* Close button (mobile) */}
            <button
              className="lg:hidden mb-4 caret-amber-700"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>

            {/* Logo */}
            <div>
              <div className="mb-10">
                <h2 className="font-bold text-lg text-indigo-700">
                  The Curator
                </h2>
                <p className="text-xs text-gray-400 tracking-widest">
                  ACADEMIC HOUSING
                </p>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-2">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setActiveNav(link.label)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      activeNav === link.label
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* CTA */}
            <button className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
              List a Property
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center gap-5">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Rahul Modak
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  🎓 University of Calcutta • 📍 Kolkata
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

           {/* GRID */}
<div className="w-full">
  
  {/* HEADER */}
  <div className="flex justify-between items-center mb-4 px-6 lg:px-10">
    <h2 className="text-xl font-bold">Saved Listings</h2>
    <button className="text-indigo-600 text-sm">View All</button>
  </div>

  {/* LISTINGS */}
  <div className="w-full px-6 lg:px-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedListings.map((listing) => (
        <div
          key={listing.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group flex flex-col"
        >
          <img
            src={listing.img}
            className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-sm truncate">
                {listing.name}
              </h3>
              <span className="text-red-500 font-bold text-sm">
                {listing.price}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-2">
              📍 {listing.dist}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {listing.amenities.map((a) => (
                <span
                  key={a}
                  className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600"
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
        <MainFooter />
      </div>
    </>
  );
}

// right side

{
  /* <div className="flex flex-col gap-4">

          
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-5 shadow-md">
                <h3 className="font-bold text-lg mb-2">
                  Academic Fit Score: 94%
                </h3>
                <p className="text-xs opacity-80">
                  Based on your preferences and proximity.
                </p>
              </div>

             
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold mb-4">Application Status</h3>

                {applicationSteps.map((step) => (
                  <div key={step.id} className="mb-3 text-sm">
                    <div className="font-semibold">{step.label}</div>
                    <div className="text-xs text-gray-400">
                      {step.date}
                    </div>
                  </div>
                ))}

                <button className="w-full mt-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm">
                  View Details
                </button>
              </div>

         
              <div className="bg-teal-100 rounded-xl p-4 flex gap-3">
                <span>🛡</span>
                <p className="text-sm">
                  Your data is secured by University Protocol.
                </p>
              </div>

            </div> */
}

{
  /* Footer */
}
{
  /* <footer
          className="mt-12 pt-6 flex justify-between items-start"
          style={{
            borderTop: "1px solid #ddd8f0",
            fontFamily: "sans-serif",
          }}
        >
          <div>
            <div
              className="font-semibold text-sm"
              style={{ color: "#3b3584" }}
            >
              The Academic Curator
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#9b96b8" }}>
              © 2024 THE ACADEMIC CURATOR. CURATING INTELLECTUAL GROWTH.
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#7b78a0" }}>
            <span className="cursor-pointer hover:text-indigo-600">PRIVACY POLICY</span>
            <span className="cursor-pointer hover:text-indigo-600">TERMS OF SERVICE</span>
            <span className="cursor-pointer hover:text-indigo-600">UNIVERSITY PARTNERSHIPS</span>
            <span className="cursor-pointer hover:text-indigo-600">CONTACT SUPPORT</span>
          </div>
        </footer> */
}
