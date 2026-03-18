import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const { updateUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://dsa-buddy-1je4.onrender.com/api/v1/auth/login", {
        email,
        password
      });
      
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      updateUser(response.data.user); 

      navigate("/questions");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
        console.error("Server error:", error.response.data.message);
      } else if (error.request) {
        toast.error("Network error: No response received");
        console.error("Network error: No response received");
      } else {
        toast.error("An unexpected error occurred");
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

      <h2 className="text-2xl font-semibold text-center mb-6">
        Login to DSA Buddy
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={handleRegisterNavigation}
          className="text-blue-500 cursor-pointer"
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
};

export default Login;
