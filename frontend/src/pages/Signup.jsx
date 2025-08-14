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
  const { setAuthCounter } = useContext(Context);
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }
  // , [navigate]);
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 mx-auto mb-4">
              <span className="text-white font-bold text-xl">TDP</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Join Us Today
            </h2>
            <p className="text-emerald-100/60">
              Create your account to start blogging
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={data.firstName}
                  className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
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
                className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
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
                className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
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
                className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="text-center mt-8">
            <p className="text-emerald-100/60">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth?mode=signin")}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
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
