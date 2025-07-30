import React from "react";
import Navigation from "../components/Navigation";
import CreateBlog from "../components/CreateBlog";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/blogs"); 
  };

  const handleRefetch = () => {
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-black to-teal-600/5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.005)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.005)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>

      <Navigation />
      <main className="relative z-10 md:ml-24 pt-24 md:pt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/30 mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Create Your Story
            </h1>
            <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
              Share your thoughts, ideas, and experiences with the world. Every
              great story starts with a single word.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">

            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border-b border-emerald-500/20 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      New Blog Post
                    </h2>
                    <p className="text-emerald-100/60 text-sm">
                      Focus mode - distraction-free writing
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-full p-2 transition-all duration-300"
                  title="Close and go back"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              <CreateBlog onClose={handleClose} refetchPosts={handleRefetch} />
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-emerald-100/40 text-sm">
              Take your time. Great content is worth the wait. ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBlogPage;
