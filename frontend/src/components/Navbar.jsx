



// import { NavLink } from "react-router-dom";
// import { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios"

// import roommate from "../assets/RommateLogo.jpeg"
// import logo from "../assets/noBGRommateLogo.png"
// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [data, setData] = useState(null);

  
// const token=localStorage.getItem("token");
// const fetchData = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/user/profile`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     // ✅ axios gives data directly
//     setData(response.data.data);

//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(()=>{
//   fetchData();
// },[])
 

// const [userRole, setUserRole] = useState(null);

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     const decoded = jwtDecode(token);
//     console.log(decoded);
//     setUserRole(decoded.role);
//   }
// }, []);
// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Search", path: "/search" },

//   // ✅ show only if owner
//   ...(userRole === "owner"
//     ? [{ name: "Owners", path: "/owners" }]
//     : []),

//   { name: "My Account", path: "/account" },
// ];
// const navigate=useNavigate();
//   const handleLogout = () => {
//     const confirm = window.confirm("Are you sure you want to logout?");
//     if (confirm) {
//       localStorage.removeItem("token");
//       window.location.reload();
//       // navigate("/login");
//     }
//   };
//   return (
//     <nav className="ac-nav">
//       {/* Logo */}
//       {/* <div className="ac-nav-logo">The Academic Curator</div> */}
//       <img src={roommate} alt="" className="ac-nav-logo" >
      
//       </img>


//       {/* Desktop Links */}
//       <ul className="ac-nav-links">
//         {navLinks.map((link) => (
//           <li key={link.name}>
//             <NavLink
//               to={link.path}
//               className={({ isActive }) =>
//                 isActive ? "active" : ""
//               }
//             >
//               {link.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>

//       {/* Icons + Hamburger */}
//       <div className="ac-nav-icons">
//         {/* <span>🔔</span>
//         <span>♥</span> */}
//         {/* <NavLink to={"/signup"} className="ac-avatar">S</NavLink> */}
//          {/* <img src={data?.profileImg} className="ac-avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} /> */}
//          {
//   data?.profileImg ? (
//     <img
//       src={data.profileImg}
//       className="ac-avatar"
//       style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
//     />
//   ) : (
//     <div
//       className="ac-avatar"
//       style={{
//         width: 50,
//         height: 50,
//         borderRadius: "50%",
//         background: "#4f46e5",
//         color: "#fff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontWeight: "600",
//         fontSize: "18px"
//       }}
//     >
//       {data?.fullName?.charAt(0).toUpperCase() || "🧑‍🎓"}
//     </div>
//   )
// }
//         {/* <button
//           onClick={handleLogout}
//           className="w-20 sm:w-16 rounded-xl
//   text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 border-red-500 border text-center"
//         >
         
//           Logout
//         </button> */}

//         {
//   token ? (
//     <button
//       onClick={handleLogout}
//       className="w-20 sm:w-16 rounded-xl
//       text-red-500 hover:bg-red-500 hover:text-white
//       transition-all duration-200 border-red-500 border text-center"
//     >
//       Logout
//     </button>
//   ) : (
//     <button
//       onClick={() => navigate("/login")}
//       className="w-20 sm:w-16 rounded-xl
//       text-blue-500 hover:bg-blue-500 hover:text-white
//       transition-all duration-200 border-blue-500 border text-center"
//     >
//       Login
//     </button>
//   )
// }
//         {/* Hamburger */}
//         <div
//           className="ac-hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="ac-mobile-menu">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.name}
//               to={link.path}
//               onClick={() => setMenuOpen(false)}
//               className="ac-mobile-link"
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }






import { NavLink } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios"

import roommate from "../assets/RommateLogo.jpeg"
import logo from "../assets/noBGRommateLogo.png"
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);

  
const token=localStorage.getItem("token");
const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // ✅ axios gives data directly
    setData(response.data.data);

  } catch (error) {
    console.error(error);
  }
};

useEffect(()=>{
  fetchData();
},[])
 

const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    setUserRole(decoded.role);
  }
}, []);
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },

  // ✅ show only if owner
  ...(userRole === "owner"
    ? [{ name: "Owners", path: "/owners" }]
    : []),

  { name: "My Account", path: "/account" },
];
const navigate=useNavigate();
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      localStorage.removeItem("token");
      window.location.reload();
      // navigate("/login");
    }
  };
  return (
    <nav className="ac-nav">
      {/* Logo */}
      {/* <div className="ac-nav-logo">The Academic Curator</div> */}
      <img src={roommate} alt="" className="ac-nav-logo" >
      
      </img>


      {/* Desktop Links */}
      <ul className="ac-nav-links">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Icons + Hamburger */}
      <div className="ac-nav-icons">
        {/* <span>🔔</span>
        <span>♥</span> */}
        {/* <NavLink to={"/signup"} className="ac-avatar">S</NavLink> */}
         {/* <img src={data?.profileImg} className="ac-avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} /> */}
 {
  token ? (
    <>
      {
        data?.profileImg ? (
          <img
            src={data.profileImg}
            className="ac-avatar"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            className="ac-avatar"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#4f46e5",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "18px"
            }}
          >
            {data?.fullName?.charAt(0).toUpperCase() || "🧑‍🎓"}
          </div>
        )
      }

   <button
  onClick={handleLogout}
  className="flex items-center gap-1.5 px-4 h-9 rounded-lg text-sm  cursor-pointer font-semibold
             text-red-500 hover:bg-red-50 hover:text-red-700
             border border-transparent hover:border-red-200
             active:scale-95 transition-all duration-150"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
  Logout
</button>
    </>
  ) : (
<button
  onClick={() => navigate("/login")}
  className="flex items-center gap-1.5 px-5 h-9 rounded-sm text-sm w-20 justify-center font-semibold text-white
             bg-linear-to-br from-[#1a237e] to-[#283593]
             shadow-[0_2px_10px_rgba(26,35,126,0.3)]
             hover:from-[#283593] hover:to-[#3949ab] hover:-translate-y-px
             hover:shadow-[0_4px_16px_rgba(26,35,126,0.35)]
             active:scale-95 transition-all duration-150"
>
  Login 
</button>
  )
}
        {/* Hamburger */}
        <div
          className="ac-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="ac-mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="ac-mobile-link"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}