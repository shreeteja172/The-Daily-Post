import { useState } from "react";
import { Context } from "../lib/contextapi";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const gettoken = () => {
  return localStorage.getItem("token");
};

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(gettoken());
  const [authCounter, setAuthCounter] = useState(0);

  const queryClient = useQueryClient();

  const handleLogout = () => {
    setToken(null);
    setAuthCounter((prev) => prev + 1);
    queryClient.clear();
  };

  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", token, authCounter],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/getAllBlogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    enabled: !!token,
  });

  const {
    data: userData,
    isLoading: Loading,
    isError: UserError,
  } = useQuery({
    queryKey: ["userData", token, authCounter],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-100/70">Loading user data...</p>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }
  if (Loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-100/70">Loading user data...</p>
        </div>
      </div>
    );
  }
  if (UserError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading User Data
          </h2>
          <p className="text-red-500">{UserError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        userData,
        Loading,
        UserError,
        posts,
        isError,
        isLoading,
        error,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
