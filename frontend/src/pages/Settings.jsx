import React from "react";
import { Context } from "../lib/contextapi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const Settings = () => {
  const { userData, setToken } = useContext(Context);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    password: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating profile");
      }
    },
  });

  const handleUpdateProfile = () => {
    const updateData = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    };

    if (profileData.password.trim()) {
      updateData.password = profileData.password;
    }

    updateProfileMutation.mutate(updateData);
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
                    {userData?.firstName?.[0]?.toUpperCase() || "U"}
                    {userData?.lastName?.[0]?.toUpperCase() || ""}
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
                    <label className="text-emerald-400 text-sm font-medium mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-black/50 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all duration-300"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-emerald-400 text-sm font-medium mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-black/50 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all duration-300"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-gray-400 text-sm font-medium mb-2 block">
                      Username
                    </label>
                    <input
                      type="text"
                      value={userData?.username || ""}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-500/30 rounded-lg text-gray-400 cursor-not-allowed transition-all duration-300"
                      placeholder="Username cannot be changed"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Username cannot be modified for security reasons
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <label className="text-gray-400 text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData?.email || ""}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-500/30 rounded-lg text-gray-400 cursor-not-allowed transition-all duration-300"
                      placeholder="Email cannot be changed"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Email cannot be modified for security reasons
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                  <label className="text-emerald-400 text-sm font-medium mb-2 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={profileData.password}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-black/50 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-100/40 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all duration-300"
                    placeholder="Enter new password (leave blank to keep current)"
                  />
                  <p className="text-emerald-300 text-xs mt-1">
                    Leave blank to keep your current password
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Account Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleUpdateProfile}
                  disabled={updateProfileMutation.isPending}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {updateProfileMutation.isPending ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    ) : (
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    )}
                    <span>
                      {updateProfileMutation.isPending
                        ? "Updating..."
                        : "Update Profile"}
                    </span>
                  </div>
                </button>
                
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
