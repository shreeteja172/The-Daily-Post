import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import BlogCard from "../components/BlogCard";
import { useMemo,useState } from "react";

const fetchAllBlogs = async ({ pageParam }) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/blogs/getAllBlogs?_limit=2&_page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  // console.log("Fetched all blogs:", response.data);
  if (response.status == 200) {
    toast.success("All blogs loaded successfully");
  }

  return response.data;
};

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-black/30 rounded-xl border border-emerald-500/10 p-4 animate-pulse"
      >
        <div className="w-full h-48 bg-gray-800/20 rounded-lg mb-4" />
        <div className="h-6 bg-gray-800/20 rounded-lg w-3/4 mb-2" />
        <div className="h-4 bg-gray-800/20 rounded-lg w-full mb-2" />
        <div className="h-4 bg-gray-800/20 rounded-lg w-2/3" />
      </div>
    ))}
  </div>
);

const InfiniteBlogsAll = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: ["allBlogs"],
    queryFn: fetchAllBlogs,
    initialPageParam: 1,
    getNextPageParam: (_lastpage, allpages) => {
      if (allpages.length === 0) return undefined;
      const nextPage = allpages.length + 1;
      return nextPage;
    },
    staleTime: 5000,
  });

  const handleReadMore = (blog) => {
    navigate(`/blogs/${blog._id}`);
  };
  console.log("All pages:", data?.pages);

  const uniqueBlogs = useMemo(() => {
    const seen = new Set();
    return data?.pages.flat().filter((blog) => {
      if (!blog || !blog._id) return false;
      if (seen.has(blog._id)) return false;
      seen.add(blog._id);
      return true;
    });
  }, [data]);

  console.log("Unique Blogs:", uniqueBlogs);

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
            <SkeletonLoader />
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
              Error loading blogs. Please try again.
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
              <h2 className="text-2xl font-bold text-white">All Blog Posts</h2>
              <span className="text-emerald-100/60 text-sm">
                {uniqueBlogs?.[0]?.length
                  ? `Showing ${uniqueBlogs?.flat().length} blogs`
                  : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueBlogs.slice(0, visibleCount).map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              {visibleCount < uniqueBlogs.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 font-medium"
                >
                  Show More
                </button>
              )}
            </div>

            {visibleCount >= uniqueBlogs.length && (
              <div className="text-center mt-8">
                <p className="text-emerald-100/60">
                  You've reached the end of all blogs!
                </p>
              </div>
            )}

            {(!uniqueBlogs || uniqueBlogs.flat().length === 0) && (
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-emerald-100/60 text-lg">
                  No blog posts available yet.
                </p>
                <p className="text-emerald-100/40 text-sm mt-2">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfiniteBlogsAll;
