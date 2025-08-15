/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  const blogPosts = [
    {
      id: 6,
      image:
        "https://utfs.io/f/regTE8JMDHCEO0eVvHmCBNbhKf4lQeRqvJ9I7rcusoHazTVi",
      username: "Harsha Bhogle",
      time: "2022-10-24T00:00:00.000Z",
      title: "Virat Kohli's MCG Masterclass: A Game for the Ages",
      excerpt:
        "A Chilling Start India's chase of 160 seemed daunting, especially after a top-order collapse...",
    },
    {
      id: 11,
      image: "https://wallpapercave.com/wp/wp11298754.jpg",
      username: "Shreeteja M",
      time: "2025-08-13T00:00:00.000Z",
      title: "Nacho Varga: The Quiet Storm",
      excerpt:
        "From the very beginning, Nacho stood out as the man in the shadows — sharp-dressed, sharp-minded...",
    },
    {
      id: 9,
      image:
        "https://utfs.io/f/regTE8JMDHCEgHvvgxOYXD3bh4qVOr0j1psFKWkQxi2vMABm",
      username: "Dinesh Karthik",
      time: "2025-06-03T00:00:00.000Z",
      title: "The Dream Finally Realized: RCB Are Champions!",
      excerpt:
        "The Journey Was Never Easy Let's be honest — being an RCB player comes with its own set of problems...",
    },
    {
      id: 3,
      image:
        "https://media.gettyimages.com/id/1161187990/photo/manchester-england-ms-dhoni-of-india-walks-as-he-is-run-out-by-martin-guptill-of-new-zealand.jpg?s=612x612&w=0&k=20&c=FAy_7OADRByM0Mvzn3Z8f_3mScH2NyRUv0cG6iX8wsc=",
      username: "M S Dhoni",
      time: "2019-07-10T00:00:00.000Z",
      title: "A Step Short",
      excerpt:
        "The English summer sky was calm, but the air was thick with pressure. We were chasing 240 in a World...",
    },
    {
      id: 5,
      image:
        "https://wallpaperbat.com/img/872635-4k-hd-wallpaper-ab-de-villiers-latest-photo-hd-wallpaper-free-download-2018-abdevilliers-abdevilliershdimage-abdevilliersphotogallery-abdevilliersphotos-abdevillierswallpaper-twitter.jpg",
      username: "Isa Guha",
      time: "2025-02-17T00:00:00.000Z",
      title: "AB de Villiers: The Man Who Redefined the Game",
      excerpt:
        "The Ultimate Challenge As a fast bowler, you want to face the best. Someone who pushes you to...",
    },
    {
      id: 4,
      image: "https://wallpaperaccess.com/full/7258488.jpg",
      username: "Dale Steyn",
      time: "2014-02-23T00:00:00.000Z",
      title: "I Didn't Just Want Wickets.. I Wanted to Break Spirits.",
      excerpt:
        "There's something deeply personal about fast bowling. You don't just run in and bowl. You charge in...",
    },
  ];

  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const blogControls = useAnimation();
  const [blogRef, blogInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const featuresControls = useAnimation();
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const aboutControls = useAnimation();
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const ctaControls = useAnimation();
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (heroInView) {
      heroControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
    if (blogInView) {
      blogControls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
      }));
    }
    if (featuresInView) {
      featuresControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
    if (aboutInView) {
      aboutControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
    if (ctaInView) {
      ctaControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [
    heroInView,
    blogInView,
    featuresInView,
    aboutInView,
    ctaInView,
    heroControls,
    blogControls,
    featuresControls,
    aboutControls,
    ctaControls,
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
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
              onClick={() => scrollToSection("hero")}
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
              onClick={() => scrollToSection("features")}
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
              onClick={() => scrollToSection("blogs")}
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

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-black to-teal-600/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center pt-20 relative z-10"
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={heroControls}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
              >
                Share Your
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-500 bg-clip-text text-transparent">
                  Stories
                </span>
                <br />
                with the World
              </motion.h1>
              <motion.p
                className="text-lg text-white/70 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.4, duration: 0.6 },
                }}
              >
                Join a vibrant community of writers and readers on a platform
                that celebrates your creativity.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.6, duration: 0.6 },
                }}
              >
                <button
                  onClick={() => navigate("/auth?mode=signup")}
                  className="group relative bg-gradient-to-r from-emerald-400 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
                  aria-label="Start writing today"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Writing</span>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => scrollToSection("blogs")}
                  className="group text-white border border-emerald-500/30 hover:border-emerald-500/60 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-500/10 transition-all duration-300"
                  aria-label="Explore posts"
                >
                  <span className="flex items-center space-x-2">
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
                  </span>
                </button>
              </motion.div>
            </div>
            <motion.div
              className="relative hidden lg:block max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.8, duration: 0.6 },
              }}
            >
              <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-xl shadow-emerald-500/20 transform transition-transform duration-500 hover:scale-105">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-sm">
                        {blogPosts[0].username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {blogPosts[0].username}
                      </div>
                      <div className="text-emerald-200/60 text-sm">
                        {formatDate(blogPosts[0].time)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+Not+Found";
                      }}
                    />
                  </div>
                  <div className="text-white text-lg font-semibold">
                    {blogPosts[0].title}
                  </div>
                  <p className="text-white/70 text-sm line-clamp-3">
                    {blogPosts[0].excerpt.replace(/<[^>]+>/g, "")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        id="features"
        ref={featuresRef}
        className="py-24 relative z-10 overflow-hidden"
      >
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresControls}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 relative">
              Powerful{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-500 bg-clip-text text-transparent">
                Features
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full opacity-50"></span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover the tools that empower you to create, share, and grow
              your blog with ease.
            </p>
          </div>

          {(() => {
            const items = [
              {
                key: "editor",
                title: "Rich Editor",
                description:
                  "Craft stunning posts with our intuitive, feature‑rich text editor (React Quill).",
                image:
                  "https://i.pinimg.com/1200x/97/94/5a/97945a74bb692a7849a3c4e01e0dc234.jpg",
                iconPath:
                  "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
              },
              {
                key: "image-upload",
                title: "Image Uploads",
                description:
                  "Upload images to your posts with seamless Uploadthing integration.",
                image: "https://uploadthing-beta.vercel.app/og.png",
                iconPath:
                  "M4 16l4-4a3 3 0 014 0l4 4M2 20h20M16 8a4 4 0 11-8 0 4 4 0 018 0z",
              },
              {
                key: "infinite-scroll",
                title: "Infinite Scrolling",
                description:
                  "Browse blogs with seamless infinite loading and smooth transitions.",
                image:
                  "https://assets.justinmind.com/wp-content/uploads/2025/03/infinite-scroll-design-header-768x492.png",
                iconPath: "M17 1l4 4-4 4M7 23l-4-4 4-4M3 5v6a4 4 0 004 4h10",
              },
              {
                key: "crud",
                title: "Blog CRUD",
                description:
                  "Create, read, update, and delete posts with a RESTful API.",
                image:
                  "https://www.atatus.com/glossary/content/images/2021/07/CRUD.jpeg",
                iconPath: "M5 13l4 4L19 7",
              },
              {
                key: "profiles",
                title: "Author Profiles",
                description:
                  "Display author info, avatars, and track post dates automatically.",
                image:
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1600&auto=format&fit=crop",
                iconPath:
                  "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
              },
              {
                key: "modern-ui",
                title: "Modern UI & Animations",
                description:
                  "Beautiful, responsive design with Tailwind CSS, Radix UI, and Framer Motion.",
                image:
                  "https://img.freepik.com/free-vector/gradient-ui-kit-collection_23-2149203471.jpg?semt=ais_hybrid&w=740&q=80",
                iconPath: "M4 6h16M4 10h16M4 14h16M4 18h16",
              },
            ];

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [selected, setSelected] = useState(items[0]);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: selectable rows */}
                <div className="lg:col-span-5 space-y-3">
                  {items.map((it) => {
                    const isActive = it.key === selected.key;
                    return (
                      <button
                        key={it.key}
                        onClick={() => setSelected(it)}
                        className={[
                          "w-full text-left rounded-2xl p-4 border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60",
                          isActive
                            ? "border-emerald-400/40 bg-emerald-400/10"
                            : "border-emerald-500/20 hover:bg-white/5",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={[
                              "w-12 h-12 rounded-xl overflow-hidden shrink-0",
                              isActive
                                ? "ring-2 ring-emerald-400/50"
                                : "ring-1 ring-white/10",
                            ].join(" ")}
                          >
                            <img
                              src={it.image}
                              alt={it.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-white font-semibold">
                              {it.title}
                            </div>
                            <div className="text-white/60 text-sm">
                              {it.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right: image-decorated preview (no theme swatches) */}
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-black/40 via-black/20 to-emerald-950/10 backdrop-blur-xl group">
                    {/* Image-driven decorative background */}
                    <div
                      className="absolute inset-0 opacity-25 scale-125 blur-3xl [mask-image:radial-gradient(520px_320px_at_70%_30%,black,transparent)] transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${selected.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0b172033_1px,transparent_1px),linear-gradient(to_bottom,#0b172033_1px,transparent_1px)] bg-[size:28px_28px]" />

                    <div className="relative p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-xl">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={selected.iconPath}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-white">
                              {selected.title}
                            </h3>
                            <p className="text-white/70">
                              {selected.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <motion.div
                          whileHover={{ rotate: -1.5, y: -4 }}
                          className="col-span-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20"
                        >
                          <img
                            src={selected.image}
                            alt={selected.title}
                            className="w-full h-64 sm:h-72 object-cover"
                          />
                        </motion.div>

                        <div className="space-y-4">
                          <motion.div
                            whileHover={{ rotate: 1.5, y: -3 }}
                            className="rounded-xl overflow-hidden border border-white/10"
                          >
                            <img
                              src={
                                items[
                                  (items.indexOf(selected) + 1) % items.length
                                ].image
                              }
                              alt="alt-1"
                              className="w-full h-32 object-cover"
                            />
                          </motion.div>
                          <motion.div
                            whileHover={{ rotate: -1.5, y: -3 }}
                            className="rounded-xl overflow-hidden border border-white/10"
                          >
                            <img
                              src={
                                items[
                                  (items.indexOf(selected) + 2) % items.length
                                ].image
                              }
                              alt="alt-2"
                              className="w-full h-32 object-cover"
                            />
                          </motion.div>
                        </div>
                      </div>

                      <div className="mt-6 relative">
                        <div className="pointer-events-none absolute -inset-x-4 -top-4 -bottom-4 bg-gradient-to-b from-emerald-400/0 via-emerald-400/5 to-transparent rounded-3xl" />
                        <div className="flex items-center gap-3 overflow-hidden">
                          {[0, 1, 2, 3, 4, 5].map((i) => {
                            const selectedIndex = items.findIndex(
                              (it) => it.key === selected.key
                            );
                            const img =
                              items[(selectedIndex + i) % items.length]?.image;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 * i }}
                                className="h-16 w-28 rounded-lg overflow-hidden border border-white/10 shrink-0"
                              >
                                <img
                                  src={img}
                                  alt={`strip-${i}`}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.05),transparent_50%)] opacity-50 pointer-events-none"></div>
      </section>

      <section id="blogs" ref={blogRef} className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Explore the latest posts from our passionate community of writers.
            </p>
          </div>
          <div className="relative">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={blogControls}
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="group relative bg-black/30 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden hover:bg-black/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/20 cursor-pointer"
                  custom={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={blogControls}
                  onClick={() => navigate("/requireauth")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold text-sm">
                            {post.username
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">
                            {post.username}
                          </div>
                          <div className="text-emerald-200/60 text-xs">
                            {formatDate(post.time)}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {post.title.replace(/<[^>]+>/g, "")}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-3">
                        {post.excerpt.replace(/<[^>]+>/g, "")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/requireauth")}
                className="group text-white border border-emerald-500/30 hover:border-emerald-500/60 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-500/10 transition-all duration-300"
                aria-label="View all posts"
              >
                <span className="flex items-center space-x-2">
                  <span>View All Posts</span>
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
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
