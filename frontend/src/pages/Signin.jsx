import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const signinMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/login`,
        userData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Welcome Again!");
      setData({
        username: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/blogs");
      }, 1000);
    },
    onError: (error) => {
      console.error("Error during sign-in:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during sign-in");
      }
    },
  });

  const handleSignin = (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    signinMutation.mutate(data);
  };
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 mx-auto mb-4">
              <span className="text-white font-bold text-xl">TDP</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-emerald-100/60">
              Sign in to continue to The Daily Post
            </p>
          </div>

          <form onSubmit={handleSignin} className="space-y-6">
            <div>
              <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-emerald-100/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-black/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all duration-300"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={signinMutation.isPending}
            >
              {signinMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-emerald-100/60">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
