import React from "react";
import { Context } from "../lib/contextapi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Settings = () => {
  const { userData, setToken } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <Navigation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-emerald-100/60">
              Manage your account and preferences
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">

            <div className="p-8 border-b border-emerald-500/20">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <span className="text-white font-bold text-2xl">
                    {userData?.firstName?.[0]}
                    {userData?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    User Profile
                  </h2>
                  <p className="text-emerald-100/60">
                    Your account information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-emerald-400 text-sm font-medium">
                      First Name
                    </label>
                    <p className="text-white text-lg">
                      {userData?.firstName || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-emerald-400 text-sm font-medium">
                      Last Name
                    </label>
                    <p className="text-white text-lg">
                      {userData?.lastName || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-emerald-400 text-sm font-medium">
                      Email
                    </label>
                    <p className="text-white text-lg">
                      {userData?.email || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-emerald-400 text-sm font-medium">
                      Username
                    </label>
                    <p className="text-white text-lg">
                      {userData?.username || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Account Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/blogs")}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
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
                    <span>Go to Dashboard</span>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 font-medium rounded-lg hover:bg-red-500/30 hover:border-red-500/50 hover:text-red-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
