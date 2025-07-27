import React, { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const UsersPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/getAllBlogs`);
                setPosts(response.data);
                setLoading(false);
                toast.success("Posts loaded successfully");
                console.log("Fetched posts:", response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                toast.error("Failed to load posts");
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    
return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Posts</h2>
        
        {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length > 0 ? (
            <div className="mt-6 space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="border p-4 rounded shadow-sm">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.description.substring(0, 100)}...</p>
                        <div className="mt-3 text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="mt-6">
                <p className="text-center text-gray-500">
                    No posts available yet. Start creating your posts!
                </p>
            </div>
        )}
    </div>
)
}

export default UsersPosts