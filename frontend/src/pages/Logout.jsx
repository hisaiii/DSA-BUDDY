import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // 👈 import your context

const Logout = () => {
  const { clearUser } = useContext(UserContext); // 👈 grab it from context

  useEffect(() => {
    localStorage.removeItem("token");
    clearUser(); // now it works ✅
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
