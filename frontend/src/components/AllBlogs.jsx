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
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading blogs</div>;
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
