import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navigation from "./Navigation";
import BlogCard from "./BlogCard";
import { useQuery } from "@tanstack/react-query";
const AllBlogs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/getAllBlogs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Fetched all blogs:", response.data);
      toast.success("All blogs loaded successfully");
      return response.data;
    },
    staleTime: 1000 * 60 * 0.1,
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
  if (isError) {
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
          <p className="text-red-500">{isError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 pt-24 px-4 pb-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            All Blogs
          </h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
