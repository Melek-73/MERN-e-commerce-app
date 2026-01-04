import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const [verified, setVerified] = useState(null); // null = loading
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/verify", {
          credentials: "include", // send the httpOnly token
        });
        const data = await res.json();
        if (res.ok && data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setVerified(true);
      }
    };
    verify();
  }, []);

  if (!verified) return <div>Loading...</div>; // or a spinner
  if (!isAdmin) return <Navigate to="/login" replace />;

  return <Outlet />; // admin allowed
}

/*import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedAdminRoute() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  console.log("Hi , this is the token from ProtectedAdminRoute :", token);
  console.log("Hi , this is the role from ProtectedAdminRoute :", role);

  if (!token) return <Navigate to="/login" replace />; // not logged in
  if (role !== "admin") return <Navigate to="/" replace />; // not admin

  return <Outlet />; // admin allowed
}*/
