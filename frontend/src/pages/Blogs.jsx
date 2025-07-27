// import React, { useState} from "react";
import Navigation from "../components/Navigation";

const Blogs = () => {
  const handleCreatePost = () => {
    console.log("Create new post");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <Navigation />

      <main className="relative z-10 md:ml-24 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Share Your Thoughts
              </h2>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div
                      onClick={handleCreatePost}
                      className="w-full bg-black/20 border border-emerald-500/20 rounded-xl p-4 text-emerald-100/60 cursor-pointer hover:border-emerald-500/40 hover:bg-black/30 transition-all duration-300 min-h-[120px] flex items-center"
                    >
                      Input interface for blog writing with all styles (bold,
                      italic, colorful, etc.)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-emerald-100/40 text-sm">
                    Support for rich text, images, and code snippets
                  </div>
                  <button
                    onClick={handleCreatePost}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Title</h2>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-20 bg-black/30 rounded-lg border border-emerald-500/10 flex items-center justify-center">
                    <span className="text-emerald-100/60 text-sm">Img</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-emerald-100/70 text-lg leading-relaxed">
                      Short description of the featured post with engaging
                      content that draws readers in.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-emerald-100/50 text-sm">
                  <span>By Featured Author</span>
                  <span>•</span>
                  <span>Jan 15, 2024</span>
                </div>

                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30">
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 mb-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Own Blogs</h2>
              <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium">
                View All
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-4 animate-pulse"
                  >
                    <div className="h-32 bg-emerald-500/10 rounded-lg mb-4"></div>
                    <div className="h-4 bg-emerald-500/10 rounded mb-2"></div>
                    <div className="h-3 bg-emerald-500/10 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPosts.slice(0, 4).map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-4 hover:border-emerald-500/30 hover:bg-black/40 transition-all duration-300 cursor-pointer group"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-white font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {index === 0
                        ? "A title and short description"
                        : post.title}
                    </h3>
                    <p className="text-emerald-100/60 text-sm">
                      {index === 0
                        ? "Same content format as others..."
                        : `${post.shortDescription.substring(0, 60)}...`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Third Row - Other People's Blogs */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Other People's Blog
              </h2>
              <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium">
                View All
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-4 animate-pulse"
                  >
                    <div className="h-32 bg-emerald-500/10 rounded-lg mb-4"></div>
                    <div className="h-4 bg-emerald-500/10 rounded mb-2"></div>
                    <div className="h-3 bg-emerald-500/10 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-4 hover:border-emerald-500/30 hover:bg-black/40 transition-all duration-300 cursor-pointer group"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-white font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {index === 0
                        ? "A title and short description"
                        : post.title}
                    </h3>
                    <p className="text-emerald-100/60 text-sm mb-2">
                      {index === 0
                        ? "Same content format..."
                        : `${post.shortDescription.substring(0, 60)}...`}
                    </p>
                    <div className="text-emerald-100/40 text-xs">
                      By {post.author}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
