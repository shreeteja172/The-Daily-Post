import Navigation from "../components/Navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../lib/contextapi";
import CreateBlog from "../components/CreateBlog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Blogs = () => {
  const { userData, token } = useContext(Context);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const navigate = useNavigate();

  const fetchOthers = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/getAllBlogs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  const fetchown = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/myBlogs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const {
    data: responseData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const [othersResponse, ownResponse] = await Promise.all([
        fetchOthers(),
        fetchown(),
      ]);
      return {
        posts: othersResponse,
        currentUser: ownResponse,
        username: ownResponse.username,
      };
    },
    staleTime: 1000 * 60 * 0.1,
    enabled: !!token,
  });

  const posts = responseData?.posts || [];
  const userPosts = responseData?.currentUser || [];

  const handleCreatePost = () => {
    navigate("/create-blog");
  };

  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId) => {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      alert("Failed to delete blog. Please try again.");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-100/70">Loading blogs...</p>
        </div>
      </div>
    );
  }
  if (error) {
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <Navigation />

      {/* Create Blog Modal */}
      {showCreateBlog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-black/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-black/60 backdrop-blur-xl border-b border-emerald-500/20 px-4 sm:px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Create New Blog Post
                  </h2>
                  <p className="text-emerald-100/60 text-sm">
                    Share your thoughts with the world
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateBlog(false)}
                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-full p-2 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
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
            <div className="px-4 sm:px-8 py-6">
              <CreateBlog
                onClose={() => setShowCreateBlog(false)}
                refetchPosts={refetch}
              />
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 md:ml-24 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            <div className="lg:col-span-2">
              <div
                className="group relative bg-black/50 backdrop-blur-sm rounded-3xl border border-emerald-500/20 overflow-hidden cursor-pointer transition-all duration-400 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/10"
                onClick={handleCreatePost}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-600/5"></div>

                <div className="relative z-10 p-7">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="text-emerald-100/50 text-sm font-medium">
                      New Story
                    </div>
                    <div className="w-16"></div>
                  </div>

                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-400/20">
                      <svg
                        className="w-7 h-7 text-white drop-shadow-sm"
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
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                        What's on your mind?
                      </h2>
                      <p className="text-emerald-100/70 text-base leading-relaxed">
                        Share something interesting, ask a question, or just say
                        hello 👋
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-full px-3 py-1.5 text-emerald-300 text-xs font-medium">
                        ✨ Rich Editor
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/35 rounded-2xl border border-emerald-500/15 p-6 shadow-inner">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">
                          You
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-black/25 border border-emerald-500/20 rounded-xl p-5 min-h-[110px] text-emerald-100/85 group-hover:border-emerald-400/30 group-hover:bg-black/35 transition-all duration-300">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-emerald-400 text-lg">✍️</span>
                            <span className="text-lg">Start typing...</span>
                            <div className="ml-auto w-0.5 h-6 bg-emerald-400 animate-pulse rounded-sm"></div>
                          </div>
                          <div className="text-emerald-100/65 leading-relaxed space-y-2">
                            <p className="text-sm">
                              Make it{" "}
                              <strong className="text-white font-bold">
                                bold
                              </strong>
                              , make it{" "}
                              <em className="text-emerald-300 italic">
                                beautiful
                              </em>
                            </p>
                            <p className="text-sm">
                              Add photos 📸, share code{" "}
                              <code className="bg-emerald-900/40 px-2 py-1 rounded text-emerald-200 font-mono text-xs">
                                like this
                              </code>
                            </p>
                            <p className="text-sm text-emerald-200/80">
                              Or just write from the heart ❤️
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-6 pt-5 border-t border-emerald-500/10">
                      <div className="flex flex-wrap gap-2.5">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-2 rounded-full text-sm font-medium">
                          📷 <span>Photos</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm font-medium">
                          💻 <span>Code</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm font-medium">
                          📊 <span>Charts</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-pink-500/20 text-pink-300 px-3 py-2 rounded-full text-sm font-medium">
                          🎨 <span>Style</span>
                        </span>
                      </div>

                      <button
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/25 border border-emerald-400/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreatePost();
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span>Let's Create!</span>
                          <span className="text-lg">🚀</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 text-sm text-emerald-100/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400/70 rounded-full animate-pulse"></div>
                      <span>Ready to go whenever you are</span>
                    </div>
                    <span className="hidden sm:inline">
                      Take your time, no rush 😊
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-black/60 via-black/50 to-emerald-950/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 h-full">
                <div className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-white">
                      Featured Post
                    </h2>
                  </div>

                  {userPosts && userPosts.length > 0 ? (
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="aspect-video w-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 mb-4 overflow-hidden">
                          {userPosts[0].imageUrl ? (
                            <img
                              src={userPosts[0].imageUrl}
                              alt={userPosts[0].title || "Blog Image"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-emerald-100/60">
                              <svg
                                className="w-12 h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <h3 className="text-white font-bold text-lg lg:text-xl mb-2 line-clamp-2">
                          {userPosts[0].title || "Untitled Post"}
                        </h3>

                        <div
                          className="text-emerald-100/70 text-sm lg:text-base leading-relaxed mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              userPosts[0].content?.slice(0, 150) + "..." ||
                              "<p>No content available...</p>",
                          }}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-100/50 text-xs lg:text-sm">
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {userPosts[0].author?.username?.charAt(0) || "U"}
                            </span>
                          </div>
                          <span>
                            By {userPosts[0].author?.username || "Unknown"}
                          </span>
                          <span>•</span>
                          <span>
                            {userPosts[0].date
                              ? new Date(userPosts[0].date).toLocaleDateString()
                              : "Recent"}
                          </span>
                        </div>

                        <button
                          className="w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium"
                          onClick={() => navigate(`/blogs/${userPosts[0]._id}`)}
                        >
                          Read Full Post
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-emerald-400/70"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-emerald-100/60 mb-4 text-sm lg:text-base">
                        Write your first blog to see it featured here
                      </p>
                      <button
                        onClick={handleCreatePost}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black/50 via-black/40 to-emerald-950/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-emerald-500/30 p-6 lg:p-8 shadow-2xl shadow-emerald-500/10 mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  My Blog Posts
                </h2>
                <p className="text-emerald-100/60 text-sm lg:text-base">
                  Your published stories and articles
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-100/60 text-sm lg:text-base">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>{userPosts.length} posts</span>
                </div>
                <button
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium text-sm lg:text-base"
                  onClick={() => navigate("/my-blogs")}
                >
                  View All →
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-xl border border-emerald-500/10 p-4 animate-pulse"
                  >
                    <div className="h-32 lg:h-40 bg-emerald-500/10 rounded-lg mb-4"></div>
                    <div className="h-4 bg-emerald-500/10 rounded mb-2"></div>
                    <div className="h-3 bg-emerald-500/10 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {userPosts?.length > 0 ? (
                  userPosts.slice(0, 8).map((post, index) => (
                    <div
                      key={post._id || index}
                      className="group bg-gradient-to-br from-black/60 to-black/40 rounded-xl lg:rounded-2xl border border-emerald-500/20 overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-emerald-500/5">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title || "Blog Post Image"}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-emerald-100/40">
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-lg font-medium">
                          {post.author?.username || "You"}
                        </div>
                        <div className="absolute top-2 right-2 lg:top-3 lg:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-1">
                            <button
                              className="bg-black/50 text-emerald-400 hover:text-emerald-300 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                              title="Edit Blog"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/create-blog", {
                                  state: { blog: post },
                                });
                              }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z"
                                />
                              </svg>
                            </button>
                            <button
                              className="bg-black/50 text-red-400 hover:text-red-300 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                              title="Delete Blog"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this blog?"
                                  )
                                ) {
                                  deleteBlogMutation.mutate(post._id);
                                  toast.success("Blog deleted successfully", {
                                    duration: 2000,
                                  });
                                }
                              }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 lg:p-5">
                        <h3 className="text-white font-semibold text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300">
                          {post.title || "Untitled Post"}
                        </h3>
                        <div className="text-emerald-100/80 text-sm leading-relaxed mb-2 line-clamp-2">
                          {post.description
                            ? post.description
                            : post.content?.slice(0, 120) ||
                              "No description available..."}
                        </div>
                        <div
                          className="text-emerald-100/70 text-sm leading-relaxed line-clamp-3 mb-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              (post.content?.slice(0, 120) ||
                                "<p>No description available...</p>") + "...",
                          }}
                        />
                        <div className="flex items-center justify-between text-emerald-100/50 text-xs">
                          <span>
                            {post.date
                              ? new Date(post.date).toLocaleDateString()
                              : "Recent"}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              className="w-3 h-3"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
                      <svg
                        className="w-10 h-10 text-emerald-400/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg lg:text-xl mb-2">
                      No posts yet
                    </h3>
                    <p className="text-emerald-100/60 mb-6 text-sm lg:text-base">
                      Start sharing your thoughts with the world
                    </p>
                    <button
                      onClick={handleCreatePost}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30"
                    >
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-black/50 via-black/40 to-emerald-950/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-emerald-500/30 p-6 lg:p-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Discover Stories
                </h2>
                <p className="text-emerald-100/60 text-sm lg:text-base">
                  Explore posts from our community
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-100/60 text-sm lg:text-base">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span>{posts.length} posts</span>
                </div>
                <button
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium text-sm lg:text-base"
                  onClick={() => navigate("/all-blogs")}
                >
                  View All →
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-xl border border-emerald-500/10 p-4 animate-pulse"
                  >
                    <div className="h-32 lg:h-40 bg-emerald-500/10 rounded-lg mb-4"></div>
                    <div className="h-4 bg-emerald-500/10 rounded mb-2"></div>
                    <div className="h-3 bg-emerald-500/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-emerald-500/10 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {posts && posts.length > 0 ? (
                  posts.slice(0, 12).map((post, index) => (
                    <div
                      key={post._id || index}
                      onClick={() => navigate(`/blogs/${post._id}`)}
                      className="group bg-gradient-to-br from-black/60 to-black/40 rounded-xl lg:rounded-2xl border border-emerald-500/20 overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-emerald-500/5">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title || "Blog Post Image"}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-emerald-100/40">
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full shadow-lg font-medium">
                          {post.author?.username || "Anonymous"}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-4 lg:p-5">
                        <h3 className="text-white font-semibold text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300">
                          {post.title || "Untitled Post"}
                        </h3>
                        <div
                          className="text-emerald-100/70 text-sm leading-relaxed line-clamp-3 mb-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              (post.content?.slice(0, 120) ||
                                "<p>No description available...</p>") + "...",
                          }}
                        />
                        <div className="flex items-center justify-between text-emerald-100/50 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-[8px]">
                                {post.author?.username?.charAt(0) || "A"}
                              </span>
                            </div>
                            <span>
                              {post.date
                                ? new Date(post.date).toLocaleDateString()
                                : "Recent"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              className="w-3 h-3"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500/10 rounded-full mb-6">
                      <svg
                        className="w-10 h-10 text-teal-400/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg lg:text-xl mb-2">
                      No stories yet
                    </h3>
                    <p className="text-emerald-100/60 text-sm lg:text-base">
                      Be the first to share your story with the community!
                    </p>
                  </div>
                )}
              </div>
            )}

            {posts.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate("/all-blogs")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 px-6 py-3 rounded-xl transition-all duration-300 font-medium"
                >
                  <span>Explore All Stories</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
