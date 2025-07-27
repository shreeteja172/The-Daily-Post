import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/createblogs`,
        data
      );
      if (response.status === 201) {
        toast.success("Post created successfully!");
        setData({
          title: "",
          description: "",
          content: "",
        });
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the post");
      }
    }
    setIsLoading(false);
  };


  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
      <form onSubmit={handleCreatePost} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 h-40"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
