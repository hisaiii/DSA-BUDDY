import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("https://dsa-buddy-1je4.onrender.com/api/v1/auth/register", {
  fullName,
  email,
  password
});

toast.success("Registration successful! Logging you in...");

const loginRes = await axios.post("https://dsa-buddy-1je4.onrender.com/api/v1/auth/login", {
  email,
  password
});
localStorage.setItem("token", loginRes.data.token);
navigate("/questions");

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Network error");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    
    <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8">

      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-white">Create Account</h2>
        <p className="text-gray-300 text-sm mt-1">
          Start your DSA journey today
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500/90 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200 backdrop-blur-md"
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-300 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-400 cursor-pointer font-medium hover:underline"
        >
          Login
        </span>
      </p>

    </div>
  </div>
);
};

export default Register;
