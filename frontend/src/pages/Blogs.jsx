import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../lib/contextapi";
import CreateBlog from "../components/CreateBlog";

const Blogs = () => {
  const { token } = useContext(Context);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

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

  // Extract posts and current user from response
  const posts = responseData?.posts || [];
  const userPosts = responseData?.currentUser || []; // This is the data from fetchown/myBlogs

  const handleCreatePost = () => {
    setShowCreateBlog(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <Navigation />

      {showCreateBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Create New Blog Post
              </h2>
              <button
                onClick={() => setShowCreateBlog(false)}
                className="text-emerald-400 hover:text-emerald-300 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <CreateBlog
              onClose={() => setShowCreateBlog(false)}
              refetchPosts={refetch}
            />
          </div>
        </div>
      )}

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
                <h2 className="text-2xl font-bold text-white">Featured Post</h2>
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

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Blog Posts</h2>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-100/60 text-sm">
                  {userPosts.length} posts
                </span>
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium">
                  Manage All
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPosts?.length > 0 ? (
                  userPosts.map((post, index) => (
                    <div
                      key={post._id || index}
                      className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-5 hover:border-emerald-500/30 hover:bg-black/40 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors duration-300">
                          {post.title || "Untitled Post"}
                        </h3>
                        <div className="flex space-x-2">
                          <button className="text-emerald-400 hover:text-emerald-300 transition-colors p-1">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors p-1">
                            <svg
                              className="w-5 h-5"
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

                      <p className="text-emerald-100/70 mb-4">
                        {post.description || post.content
                          ? `${(post.description || post.content).substring(
                              0,
                              120
                            )}...`
                          : "No description available..."}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-emerald-100/40 text-sm">
                          Posted on{" "}
                          {post.date
                            ? new Date(post.date).toLocaleDateString()
                            : "Unknown date"}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-emerald-100/60 text-sm flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {post.views || 0}
                          </span>
                          <span className="text-emerald-100/60 text-sm flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                              />
                            </svg>
                            {post.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 rounded-full mb-4">
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
                    <p className="text-emerald-100/60 mb-3">
                      You haven't published any posts yet
                    </p>
                    <button
                      onClick={handleCreatePost}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30"
                    >
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">All Blog Posts</h2>
              <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium">
                View All
              </button>
            </div>

            {isLoading ? (
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
                {posts && posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div
                      key={post._id || index}
                      className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-500/10 p-4 hover:border-emerald-500/30 hover:bg-black/40 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-full h-32 bg-black/30 rounded-lg border border-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-emerald-100/60 text-sm">
                          No Image
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {post.title || "Untitled Post"}
                      </h3>
                      <p className="text-emerald-100/60 text-sm mb-2">
                        {post.description || post.content
                          ? `${(post.description || post.content).substring(
                              0,
                              60
                            )}...`
                          : "No description available..."}
                      </p>
                      <div className="text-emerald-100/40 text-xs">
                        By {post.author?.username || "Unknown Author"} on{" "}
                        {post.date
                          ? new Date(post.date).toLocaleDateString()
                          : "Unknown date"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-emerald-100/60">
                    No blog posts available yet. Click "Create Post" to get
                    started!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
