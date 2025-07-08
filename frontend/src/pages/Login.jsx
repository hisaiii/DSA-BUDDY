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
      const response = await axios.post("https://dsa-buddy.onrender.com/api/v1/auth/login", {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating DSA symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-white/10 text-2xl font-mono animate-float">Array[i]</div>
        <div className="absolute top-32 right-32 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '1s' }}>O(n)</div>
        <div className="absolute bottom-40 left-1/4 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '2s' }}>Tree</div>
        <div className="absolute bottom-20 right-20 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '3s' }}>Stack</div>
        <div className="absolute top-1/2 left-10 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '4s' }}>Graph</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl mb-4 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DSA Buddy</h1>
          <p className="text-slate-300 text-lg">Learn from your mistakes, grow stronger</p>
          <p className="text-slate-400 text-sm mt-2">Track • Analyze • Improve</p>
        </div>

        {/* Login card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative">
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          
          <div className="text-center mb-8 relative">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-300">Continue your DSA learning journey</p>
            <div className="flex items-center justify-center mt-3 space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm">Mistakes → Lessons → Mastery</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Start Learning</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              New to DSA Buddy?{" "}
              <button
                onClick={handleRegisterNavigation}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors hover:underline"
              >
                Create your learning profile
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <p className="text-slate-300 text-sm italic">
                "Every mistake is a stepping stone to mastery"
              </p>
              <p className="text-slate-400 text-xs mt-1">- DSA Buddy Philosophy</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
