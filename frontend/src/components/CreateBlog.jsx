import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../lib/contextapi";
import EnhancedUploadDropzone from "./EnhancedUploadDropzone";
import RichEditor from "./RichEditor";
const CreateBlog = ({ onClose, refetchPosts }) => {
  const { token } = useContext(Context);
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        content: data.content,
        date: new Date(data.date).toISOString(),
        visibility,
        imageUrl: uploadedImageUrl || data.imageUrl,
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
          imageUrl: "",
          date: new Date().toISOString().split("T")[0],
        });
        setUploadedImageUrl("");
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
    <div className="w-full mx-auto p-2">
      <form
        onSubmit={handleCreatePost}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[85vh]"
      >
        <div className="flex flex-col space-y-4 bg-black/20 p-6 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
              📋 Blog Details
            </h2>
            <p className="text-gray-400 text-sm">
              Fill in the basic information for your blog post
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 font-medium text-emerald-300 text-sm"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full p-3 bg-black/40 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-gray-400 transition-all duration-200"
                placeholder="Enter your blog title..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block mb-2 font-medium text-emerald-300 text-sm"
              >
                Publication Date *
              </label>
              <input
                type="date"
                id="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                className="w-full p-3 bg-black/40 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-emerald-300 text-sm"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="w-full p-3 bg-black/40 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-gray-400 transition-all duration-200 resize-none"
              placeholder="Brief description of your blog post..."
              rows="3"
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-3 font-medium text-emerald-300 text-sm">
                📸 Featured Image
              </label>
              <EnhancedUploadDropzone
                onUploadComplete={(url) => setUploadedImageUrl(url)}
                onUploadError={(error) => {
                  console.error("Upload error:", error);
                }}
                uploadedImageUrl={uploadedImageUrl}
                onRemoveImage={() => setUploadedImageUrl("")}
                className="mb-4"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="imageUrl"
                className="flex items-center gap-2 mb-2 font-medium text-emerald-300 text-sm"
              >
                🔗 Or Enter Image URL
                <span className="text-xs text-gray-500 font-normal">
                  (Alternative option)
                </span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="imageUrl"
                  value={data.imageUrl}
                  onChange={(e) =>
                    setData({ ...data, imageUrl: e.target.value })
                  }
                  className={`w-full p-3 bg-black/40 border rounded-lg focus:outline-none focus:ring-2 text-white pl-10 transition-all duration-200 placeholder-gray-400 ${
                    uploadedImageUrl
                      ? "border-gray-600 opacity-50 cursor-not-allowed"
                      : "border-emerald-500/30 focus:ring-emerald-500 focus:border-emerald-500 hover:border-emerald-500/50"
                  }`}
                  placeholder="https://example.com/image.jpg"
                  disabled={!!uploadedImageUrl}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
              {uploadedImageUrl && (
                <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-sm text-emerald-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Uploaded image takes priority over URL input
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg hover:shadow-emerald-500/40 hover:scale-105 transform"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Post...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  ✨ Create Blog Post
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-black/20 p-6 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
              📝 Content Editor
            </h2>
            <p className="text-gray-400 text-sm">
              Write your blog content using the rich text editor
            </p>
          </div>

          <div className="flex-1 min-h-0">
            <RichEditor
              value={data.content}
              onChange={(content) => setData({ ...data, content })}
              className="h-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
