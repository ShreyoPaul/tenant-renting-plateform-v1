import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const decodedToken = token ? jwtDecode(token) : null;

  if (!token) {
    return <Navigate to="/login"/>;
  }

  console.log("Decoded token:", decodedToken);

  // Don't redirect if already on /collectuserdata page
  if (decodedToken && !decodedToken.profileFilled && location.pathname !== "/collectuserdata") {
    return <Navigate to="/collectuserdata" />;
  }

  return children;
}