import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/`);
                setBlogs(response.data);
                setLoading(false);
                console.log("Fetched blogs:", response.data);
                toast.success("Blogs loaded successfully");

            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Failed to load blogs");
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog._id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p>{blog.content}</p>
              <p className="text-sm text-gray-500">By {blog.author.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserBlogs