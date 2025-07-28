import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../lib/contextapi";

const CreatePost = ({ onClose, refetchPosts }) => {
  const { token } = useContext(Context);
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    img: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        content: data.content,
        date: new Date(data.date).toISOString(),
        visibility: "public",
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/createblogs`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Post created successfully!");
        setData({
          title: "",
          description: "",
          content: "",
          img: "",
          date: new Date().toISOString().split("T")[0],
        });
        if (refetchPosts) {
          refetchPosts();
        }
        if (onClose) {
          onClose();
        }
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
    <div className="w-full">
      <form onSubmit={handleCreatePost} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block mb-1 font-medium text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white h-40 resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="img" className="block mb-1 font-medium text-white">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="img"
            value={data.img}
            onChange={(e) => setData({ ...data, img: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
