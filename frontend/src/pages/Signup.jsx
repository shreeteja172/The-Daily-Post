import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Context } from "../lib/contextapi";
import { useContext } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const { setToken, setAuthCounter } = useContext(Context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const signupMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/register`,
        userData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthCounter((prev) => prev + 1);
      toast.success("Signup successful! Redirecting to dashboard...");
      setData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      });
      navigate("/blogs");
    },
    onError: (error) => {
      console.error("Error during sign-up:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration");
      }
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.email ||
      !data.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    signupMutation.mutate(data);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-4 sm:py-8 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-0 z-50 pt-4 md:pt-0">
        <div className="bg-black/50 backdrop-blur-xl rounded-full md:px-4 md:py-6 px-3 py-2 shadow-2xl border border-emerald-500/30 shadow-emerald-500/20">
          <nav className="flex md:flex-col flex-row items-center md:space-y-6 md:space-x-0 space-x-2 sm:space-x-3 space-y-0">
            <div className="relative md:mb-2 mb-0">
              <div className="md:w-12 md:h-12 w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <span className="text-white font-bold md:text-sm text-xs">
                  TDP
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/");
                scrollToSection("home");
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              aria-label="Home"
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                navigate("/");
                scrollToSection("features");
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              aria-label="Features"
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                navigate("/");
                scrollToSection("blogs");
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              aria-label="Blogs"
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </button>
            <div className="md:w-8 md:h-px w-px h-6 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <button
              onClick={() => navigate("/auth?mode=signin")}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              aria-label="Login"
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-700 text-white md:p-3 p-2 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 group transform hover:scale-105"
              aria-label="Get Started"
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 mt-20 md:mt-0">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6 sm:p-8 shadow-2xl shadow-emerald-500/10">
          {/* Logo/Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 mx-auto mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">
                TDP
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Join Us Today
            </h2>
            <p className="text-emerald-100/60 text-sm sm:text-base">
              Create your account to start blogging
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={data.firstName}
                  className="w-full px-3 sm:px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300 text-sm sm:text-base"
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={data.lastName}
                  className="w-full px-3 sm:px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300 text-sm sm:text-base"
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={data.username}
                className="w-full px-3 sm:px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={data.email}
                className="w-full px-3 sm:px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={data.password}
                className="w-full px-3 sm:px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#10B981"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-90"
                      fill="#10B981"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-emerald-400">Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-emerald-100/60 text-sm sm:text-base">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth?mode=signin")}
                className="cursor-pointer text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
