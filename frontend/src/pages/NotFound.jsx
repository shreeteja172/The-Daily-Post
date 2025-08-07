import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = React.useState(false);

  const handleNavigation = (path) => {
    setIsNavigating(true);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-500/20">
          <h1 className="text-[150px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 animate-gradient-x mb-4">
            404
          </h1>

          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin-slow opacity-20"></div>
            <div className="absolute inset-2 bg-black rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-emerald-100/70 text-lg mb-8">
            Oops! Looks like you've ventured into the void. Let's get you back
            on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavigation("/")}
              disabled={isNavigating}
              className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className={`flex items-center justify-center gap-2 ${
                  isNavigating ? "opacity-0" : ""
                }`}
              >
                Return Home
              </span>
              {isNavigating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
            <button
              onClick={() => handleNavigation("/blogs")}
              disabled={isNavigating}
              className="group relative px-6 py-3 bg-black/30 border border-emerald-500/30 text-emerald-100 rounded-xl font-medium hover:bg-emerald-500/10 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className={`flex items-center justify-center gap-2 ${
                  isNavigating ? "opacity-0" : ""
                }`}
              >
                View Blogs
              </span>
              {isNavigating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>

          <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-2xl"></div>
          <div className="absolute inset-[1px] border border-emerald-500/20 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
