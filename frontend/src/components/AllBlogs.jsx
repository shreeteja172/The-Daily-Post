import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navigation from "./Navigation";
import { useQuery } from "@tanstack/react-query";
const AllBlogs = () => {
    const {data, isLoading,isError} = useQuery({
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
            console.log("Fetched all blogs:", response.data);
            toast.success("All blogs loaded successfully");
            return response.data;
        },
        staleTime: 1000 * 60 * 0.1, 
    });

    if(isLoading) {
        return <div>Loading...</div>;
    }
    if(isError) {
        return <div>Error loading blogs</div>;
    }

  return (
    <div>
        <Navigation />
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">All Blogs</h2>
            <ul className="space-y-4">
            {data.map((blog) => (
                <li key={blog._id} className="border p-4 rounded shadow-sm bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-2">{blog.description}</p>
                <p className="text-gray-500 text-sm">By {blog.author.username} on {new Date(blog.date).toLocaleDateString()}</p>
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
};

export default AllBlogs;
