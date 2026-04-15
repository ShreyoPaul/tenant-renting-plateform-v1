import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
const [showPassword, setShowPassword] = useState(false);

  const getStrength = (password) => {
    if (password.length > 8) return "Strong";
    if (password.length > 5) return "Medium";
    return "Weak";
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 const navigate=useNavigate();
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert("Signup successful 🎉");

      // store token
      localStorage.setItem("token", res.data.token);
      navigate("/collectuserdata");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

    const inputStyle = {
    width: "100%",
    padding: "11px 14px 11px 38px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    background: "#f9fafb",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0f1f8" }}>
      
      <main style={{ display: "flex", flex: 1 }}>

        {/* ── LEFT PANEL ── */}
        <section style={{ width: "50%", position: "relative", overflow: "hidden", display: "flex" }}>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&q=80"
            alt="library"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,40,0.52)" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff", maxWidth: 520 }}>
            
            <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 999, padding: "6px 18px", width: "fit-content", marginBottom: 28, color: "rgba(255,255,255,0.8)" }}>
              Excellence in Housing
            </span>

            <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
              Your Academic<br />Journey<br />
              <em style={{ color: "#2dd4bf", fontStyle: "italic" }}>Defined.</em>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.65, marginBottom: 36 }}>
              Join an elite community of scholars and property curators. Secure high-end housing tailored for intellectual growth.
            </p>

            {/* Social Proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", objectFit: "cover", marginLeft: i === 0 ? 0 : -10 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                + 2,400 Academics already joined
              </span>
            </div>
          </div>
        </section>

        {/* ── RIGHT PANEL ── */}
        <section style={{ width: "50%", background: "#f0f1f8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          
          <div style={{ width: "100%", maxWidth: 460, background: "#fff", borderRadius: 24, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", padding: "36px 40px" }}>

            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, background: "#4f46e5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 9l10-6 10 6-10 6-10-6z" /><path d="M2 17l10 6 10-6" /><path d="M2 13l10 6 10-6" />
                </svg>
              </div>
              <span style={{ color: "#3730a3", fontWeight: 700, fontSize: 14 }}>The Academic Curator</span>
            </div>

            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#1e1b4b", marginBottom: 4 }}>Join the Community</h2>
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 22 }}>Start your journey toward curated living today.</p>

            {/* Error */}
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 16 }}>
                {error}
              </div>
            )}

            {/* SSO */}
            {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 12, background: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.5 }}>
                  <span style={{ color: "#4285F4" }}>G</span>
                  <span style={{ color: "#EA4335" }}>o</span>
                  <span style={{ color: "#FBBC05" }}>o</span>
                  <span style={{ color: "#4285F4" }}>g</span>
                  <span style={{ color: "#34A853" }}>l</span>
                  <span style={{ color: "#EA4335" }}>e</span>
                </span>
                Google
              </button>
              <button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 12, background: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div> */}

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#9ca3af", textTransform: "uppercase", whiteSpace: "nowrap" }}> sign up with email</span>
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Full Name */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="8" r="4" /><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Julian Moore" required style={inputStyle} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 }}>University Email</label>
                <div style={{ position: "relative" }}>
                  <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                  </svg>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="julian@university.edu" required style={inputStyle} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 }}>Create Password</label>
                <div style={{ position: "relative" }}>
                  <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={inputStyle} />
                </div>
              </div>

              {/* Role */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 8 }}>I am a...</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { value: "student", label: "Student", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6M2 10l10-5 10 5-10 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c3 3 9 3 12 0v-5" /></svg> },
                    { value: "owner", label: "Owner", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                  ].map(({ value, label, icon }) => (
                    <label key={value} style={{ cursor: "pointer", padding: "11px 12px", borderRadius: 12, textAlign: "center", border: formData.role === value ? "2px solid #6366f1" : "1.5px solid #e5e7eb", background: formData.role === value ? "#eef2ff" : "#f9fafb", color: formData.role === value ? "#4f46e5" : "#6b7280", fontWeight: formData.role === value ? 700 : 500, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s" }}>
                      <input type="radio" name="role" value={value} checked={formData.role === value} onChange={handleChange} style={{ display: "none" }} />
                      {icon}
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#6b7280" }}>
                <input type="checkbox" required style={{ marginTop: 2, accentColor: "#6366f1" }} />
                <span>
                  I agree to the{" "}
                  <span style={{ color: "#6366f1", cursor: "pointer", fontWeight: 500 }}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={{ color: "#6366f1", cursor: "pointer", fontWeight: 500 }}>Privacy Policy</span>.
                </span>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                {loading ? "Creating..." : "Create Account"}
              </button>

              {/* Sign in */}
              <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
                Already have an account?{" "}
                <NavLink to="/login" style={{ color: "#6366f1", fontWeight: 700, textDecoration: "none" }}>Sign In</NavLink>
              </p>

            </form>
          </div>
        </section>
      </main>

      {/* ── FEATURE BAR ── */}
      <div style={{ background: "#2dd4bf", padding: "18px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap", padding: "0 24px" }}>
          {[
            { label: "Verified University Listings", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#134e4a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
            { label: "Legally Protected Leases", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#134e4a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
            { label: "Dedicated Academic Concierge", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#134e4a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "#134e4a" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {icon}
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b" }}>The Academic Curator</span>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Service", "Support", "Institutional Partners"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>© 2024 The Academic Curator. All rights reserved.</span>
      </footer>

    </div>
  );
}





// import { useState } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";

// export default function SignupPage() {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student"
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // handle input
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         formData
//       );

//       alert("Signup successful 🎉");

//       // store token
//       localStorage.setItem("token", res.data.token);

//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
      
//       <main className="flex-grow flex flex-col md:flex-row">

//         {/* LEFT SIDE (UNCHANGED) */}
//         <section className="hidden md:flex md:w-1/2 bg-surface-container-low relative overflow-hidden items-center justify-center p-12">
//           <div className="absolute inset-0 z-0">
//             <img
//               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJOSptC5hM9A2UGJN0MZ5Fxr3UyC0y51amUhZCdh6B6vmk4NrceCZgk8pAl_36AdEEQvjUl6Zsfa-XQU93Obq701GPkxzIjnqR-5QHwzJMdW3hrGvBjyS3f_uHQkoGaZsKa-JXyRJkCznALNGQm6z0LwA6PT4YT2MfRdl9hsbgjGk9bThF_y76Rf2YjOr3fzlLlzhRNr9V0ai4Rn6PD4xxkpQJQ70dl1AqI7CpfxiRcJg7vqmw12fzFf1-NXaQgGeQVgh2gbHgGsf1"
//               className="w-full h-full object-cover opacity-90 mix-blend-multiply grayscale-[20%] brightness-110"
//             />
//             <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
//           </div>

//           <div className="relative z-10 max-w-lg space-y-8">
//             <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm tracking-widest uppercase">
//               Excellence in Housing
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
//               Your Academic <br />
//               Journey <span className="text-tertiary-fixed italic">Defined.</span>
//             </h1>

//             <p className="text-xl text-white/90 max-w-md">
//               Join an elite community of scholars and property curators.
//             </p>
//           </div>
//         </section>

//         {/* RIGHT SIDE */}
//         <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface-bright">
          
//         <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-200">
//             {/* HEADER */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="material-symbols-outlined text-primary text-4xl">
//                   school
//                 </span>
//                 <span className="text-2xl font-bold text-primary">
//                   The Academic Curator
//                 </span>
//               </div>

//               <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
//                 Join the Community
//               </h2>

//               <p className="text-gray-500">
//                 Start your journey today.
//               </p>
//             </div>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}

//             {/* FORM */}
//             <form className="space-y-6" onSubmit={handleSubmit}>

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 
// focus:border-indigo-500 transition-all duration-300"
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 
// focus:border-indigo-500 transition-all duration-300"
//                 required
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 
// focus:border-indigo-500 transition-all duration-300"
//                 required
//               />

//               {/* RADIO */}
//               <div className="grid grid-cols-2 gap-4">
//                 <label className="p-4 bg-gray-100 rounded-2xl text-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="student"
//                     checked={formData.role === "student"}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 
// focus:border-indigo-500 transition-all duration-300"
//                   />
//                   Student
//                 </label>

//                 <label className="p-4 bg-gray-100 rounded-2xl text-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="owner"
//                     onChange={handleChange}
//                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 
// focus:outline-none focus:ring-2 focus:ring-indigo-500 
// focus:border-indigo-500 transition-all duration-300"
//                   />
//                   Owner
//                 </label>
//               </div>

//               {/* CHECKBOX */}
//               <div className="flex gap-2">
//                 <input type="checkbox" required />
//                 <span className="text-sm">
//                   I agree to Terms & Privacy
//                 </span>
//               </div>

//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold"
//               >
//                 {loading ? "Creating..." : "Create Account"}
//               </button>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <NavLink to={"/login"} className="text-indigo-600 font-bold cursor-pointer">
//                   Sign In
//                 </NavLink>
//               </p>
//             </form>
//           </div>
//         </section>
//       </main>

//       {/* FOOTER */}
//       <footer className="py-8 text-center text-gray-500">
//         © 2024 The Academic Curator
//       </footer>
//     </div>
//   );
// }