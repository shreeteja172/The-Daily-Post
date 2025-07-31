import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import BlogCard from "../components/BlogCard";

const fetchAllBlogs = async ({ pageParam }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/myBlogs?_limit=8&_page=${
      pageParam || 1
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  // console.log("Fetched my blogs:", response.data);
  toast.success("My blogs loaded successfully");
  return response.data;
};

const InfiniteOwnBlogs = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["myBlogs"],
    queryFn: fetchAllBlogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.length ? nextPage : undefined;
    },
    staleTime: 1000,
  });

  const handleReadMore = (blog) => {
    navigate(`/blog/${blog._id}`);
  };

  if (isLoading) {
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
            <div className="text-center text-white text-xl">
              Loading your blogs...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
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
            <div className="text-center text-red-400 text-xl">
              Error loading your blogs. Please try again.
            </div>
          </div>
        </main>
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

      <main className="relative z-10 md:ml-24 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Blog Posts</h2>
              <span className="text-emerald-100/60 text-sm">
                {data?.pages?.[0]?.length
                  ? `Showing ${data.pages.flat().length} of your blogs`
                  : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.pages.map((page) =>
                page.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onReadMore={handleReadMore}
                  />
                ))
              )}
            </div>

            {hasNextPage && (
              <div className="text-center mt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 font-medium"
                >
                  {isFetchingNextPage
                    ? "Loading More..."
                    : "Load More of My Blogs"}
                </button>
              </div>
            )}

            {!hasNextPage && data?.pages?.flat().length > 0 && (
              <div className="text-center mt-8">
                <p className="text-emerald-100/60">
                  You've reached the end of your blog posts!
                </p>
              </div>
            )}

            {(!data?.pages || data.pages.flat().length === 0) && (
              <div className="text-center py-12">
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
                <p className="text-emerald-100/60 text-lg">
                  You haven't created any blog posts yet.
                </p>
                <p className="text-emerald-100/40 text-sm mt-2">
                  Start sharing your thoughts with the world!
                </p>
                <button
                  onClick={() => navigate("/blogs")}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfiniteOwnBlogs;
