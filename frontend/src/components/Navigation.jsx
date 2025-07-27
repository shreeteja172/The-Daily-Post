import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const navItems = [
    {
      id: "home",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      onClick: () => handleScrollToSection("hero"),
      title: "Home",
    },
    {
      id: "posts",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      ),
      onClick: () => navigate("/posts"),
      title: "Posts",
    },
    {
      id: "features",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      onClick: () => handleScrollToSection("features"),
      title: "Features",
    },
    {
      id: "about",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      onClick: () => handleScrollToSection("about"),
      title: "About",
    },
  ];

  return (
    <header className="fixed md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 top-4 left-1/2 transform -translate-x-1/2 md:translate-x-0 z-50">
      <div className="bg-black/50 backdrop-blur-xl rounded-full md:px-4 md:py-6 px-3 py-2 shadow-2xl border border-emerald-500/30 shadow-emerald-500/20">
        <nav className="flex md:flex-col flex-row items-center md:space-y-6 md:space-x-0 space-x-3 space-y-0">
          {/* Logo */}
          <div className="relative md:mb-2 mb-0">
            <div className="md:w-12 md:h-12 w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <span className="text-white font-bold md:text-sm text-xs">
                TDP
              </span>
            </div>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              title={item.title}
            >
              <svg
                className="md:w-5 md:h-5 w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
            </button>
          ))}

          <div className="md:w-8 md:h-px w-px h-6 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

          <button
            onClick={() => navigate("/signin")}
            className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
            title="Login"
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
              />
            </svg>
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-700 text-white md:p-3 p-2 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 group transform hover:scale-105"
            title="Sign Up"
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
  );
};

export default Navigation;
