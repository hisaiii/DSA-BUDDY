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
    
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Login to continue your DSA journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-500 mt-6">
        Don’t have an account?{" "}
        <span
          onClick={handleRegisterNavigation}
          className="text-blue-500 cursor-pointer font-medium hover:underline"
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
};

export default Login;
