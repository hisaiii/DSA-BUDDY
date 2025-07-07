import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
