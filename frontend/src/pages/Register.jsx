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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-40 h-40 bg-yellow-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating DSA symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-white/10 text-2xl font-mono animate-float">Queue</div>
        <div className="absolute top-32 right-32 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '1s' }}>DP</div>
        <div className="absolute bottom-40 left-1/4 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '2s' }}>Set</div>
        <div className="absolute bottom-20 right-20 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '3s' }}>Map</div>
        <div className="absolute top-1/2 left-10 text-white/10 text-2xl font-mono animate-float" style={{ animationDelay: '4s' }}>Greedy</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl mb-4 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-slate-300 text-lg">Start mastering your DSA journey</p>
          <p className="text-slate-400 text-sm mt-2">Track • Analyze • Improve</p>
        </div>

        {/* Register card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative">
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          
          <div className="text-center mb-8 relative">
            <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-slate-300">Unlock your DSA performance dashboard</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-4 4m4-4l-4-4" />
                  </svg>
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-400 hover:text-pink-300 font-semibold transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <p className="text-slate-300 text-sm italic">
                "Your journey starts with one step"
              </p>
              <p className="text-slate-400 text-xs mt-1">- DSA Buddy</p>
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

export default Register;
