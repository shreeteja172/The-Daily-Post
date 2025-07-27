import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="absolute inset-0 bg-black/20"></div>

      <header className="fixed md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 top-4 left-1/2 transform -translate-x-1/2 md:translate-x-0 z-50">
        <div className="bg-black/50 backdrop-blur-xl rounded-full md:px-4 md:py-6 px-3 py-2 shadow-2xl border border-emerald-500/30 shadow-emerald-500/20">
          <nav className="flex md:flex-col flex-row items-center md:space-y-6 md:space-x-0 space-x-3 space-y-0">
            <div className="relative md:mb-2 mb-0">
              <div className="md:w-12 md:h-12 w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <span className="text-white font-bold md:text-sm text-xs">
                  TDP
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const heroSection = document.getElementById("hero");
                heroSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              title="Home"
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
                const featuresSection = document.getElementById("features");
                featuresSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              title="Features"
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
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/80 hover:text-white transition-all duration-300 md:p-3 p-2 rounded-full hover:bg-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/30 group"
              title="About"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-700 text-white md:p-3 p-2 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 group transform hover:scale-105"
              title="Get Started"
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

      <section
        id="hero"
        className="min-h-screen flex items-center relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:pl-32 py-20 pt-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2 shadow-lg shadow-orange-500/20">
                <span className="text-orange-100/90 text-sm font-medium">
                  New Platform Launch
                </span>
              </div> */}

              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  Share your
                  <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                    stories
                  </span>
                  <br />
                  with the world
                </h1>
                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Join thousands of writers and readers on the modern blogging
                  platform that puts your creativity first.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="group relative bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Start Writing Today</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <button
                  onClick={() => navigate("/posts")}
                  className="group text-white border border-emerald-500/30 hover:border-emerald-500/60 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <span>Explore Posts</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* <div className="flex items-center space-x-8 pt-8 border-t border-orange-500/20">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
                    1K+
                  </div>
                  <div className="text-white/60 text-sm">Writers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    5K+
                  </div>
                  <div className="text-white/60 text-sm">Stories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-white/60 text-sm">Readers</div>
                </div>
              </div> */}
            </div>

            <div className="relative lg:block hidden">
              <div className="relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full shadow-lg shadow-emerald-500/30"></div>
                    {/* above is for dp or profile pic normal logo lagadenge */}
                    <div>
                      <div className="text-white font-semibold">
                        Walter White
                      </div>
                      <div className="text-emerald-200/60 text-sm">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-lg font-semibold">
                    Story of a High School Teacher
                  </div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    In the heart of the New Mexico desert, I found my calling.
                    Chemistry wasn't just a subject I taught anymore—it became
                    my art. The crystallization process is delicate: precise
                    measurements of pseudoephedrine, careful temperature
                    regulation, and the patience of a scientist. The blue
                    color—my signature—comes from an exceptional level of
                    purity. When the crystals form, there's a moment of perfect
                    clarity. This isn't just cooking; it's transformation. From
                    an ordinary high school teacher to something else entirely.
                    Sometimes the most unexpected journeys begin with a simple
                    chemical reaction.
                  </div>
                  <div className="flex items-center space-x-4 text-emerald-200/60 text-sm">
                    {/* <span>5 min read</span> */}
                    {/* <span>•</span> */}
                    {/* <span>124 likes</span> */}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-black/20 backdrop-blur-xl border border-emerald-500/10 rounded-3xl p-6 shadow-xl -rotate-6 -z-10">
                <div className="w-48 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-black/20 backdrop-blur-xl border border-emerald-500/10 rounded-3xl p-6 shadow-xl rotate-6 -z-10">
                <div className="w-48 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-emerald-500/30 rounded-full px-4 py-2 mb-6 shadow-lg shadow-emerald-500/20">
              <span className="text-emerald-100/90 text-sm font-medium">
                Platform Features
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                create & share
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Our platform provides all the tools and features you need to
              write, publish, and grow your audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 hover:bg-black/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-teal-600/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Intuitive Editor
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  Write with our modern, distraction-free editor. Rich
                  formatting, real-time preview, and seamless publishing
                  workflow.
                </p>

                <div className="flex items-center text-emerald-200/60 text-sm">
                  <span>Rich text • Auto-save • Preview</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 hover:bg-black/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-emerald-500/5 to-emerald-400/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/30 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Community Driven
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  Connect with fellow writers and readers. Build your audience,
                  engage with comments, and discover new voices.
                </p>

                <div className="flex items-center text-emerald-200/60 text-sm">
                  <span>Profiles • Comments • Following</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 hover:bg-black/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-600/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Secure & Private
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  Your content is protected with enterprise-grade security. JWT
                  authentication, encrypted data, and privacy controls.
                </p>

                <div className="flex items-center text-emerald-200/60 text-sm">
                  <span>JWT Auth • Encryption • Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-12 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-teal-600/10 rounded-3xl"></div>

            <div className="relative">
              {/* <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-emerald-500/30 rounded-full px-4 py-2 mb-8 shadow-lg shadow-emerald-500/20"> */}
              {/* <span className="text-emerald-100/90 text-sm font-medium">
                  Join Our Community
                </span> */}
              {/* </div> */}

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to share your
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                  story?
                </span>
                <span className="block mt-2 text-lg sm:text-xl text-emerald-200/60">
                  Daily...
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of writers and readers in our vibrant community.
                Start your blogging journey today and connect with people who
                share your passion for storytelling.
              </p>

              <button
                onClick={() => navigate("/signup")}
                className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 transform hover:-translate-y-2 overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10">Start Writing Now</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* <div className="flex items-center justify-center space-x-8 mt-12 pt-8 border-t border-orange-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
                    1K+
                  </div>
                  <div className="text-orange-200/60 text-sm">
                    Active Writers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    5K+
                  </div>
                  <div className="text-orange-200/60 text-sm">
                    Published Stories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-orange-200/60 text-sm">
                    Monthly Readers
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-500/20 py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-600 rounded flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-bold text-xs">DP</span>
              </div>
              <span className="text-white font-semibold">The Daily Post</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-emerald-200/60">
              <button
                onClick={() => navigate("/privacy")}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
