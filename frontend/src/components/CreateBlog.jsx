import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../lib/contextapi";
import EnhancedUploadDropzone from "./EnhancedUploadDropzone";
import RichEditor from "./RichEditor";

const CreateBlog = ({ onClose, refetchPosts, blog }) => {
  const { token } = useContext(Context);
  const [data, setData] = useState(() => {
    if (blog) {
      return {
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
        imageUrl: blog.imageUrl || "",
        date: blog.date
          ? new Date(blog.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        visibility: blog.visibility || "public",
        _id: blog._id,
      };
    }
    return {
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
      visibility: "public",
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    blog?.imageUrl || ""
  );

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        description: data.description,
        content: data.content,
        date: new Date(data.date).toISOString(),
        visibility: data.visibility,
        imageUrl: uploadedImageUrl || data.imageUrl,
      };
      let response;
      if (data._id) {
        // Edit mode
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${data._id}`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create mode
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs/createblogs`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 201 || response.status === 200) {
        toast.success(
          data._id ? "Post updated successfully!" : "Post created successfully!"
        );
        setData({
          title: "",
          description: "",
          content: "",
          imageUrl: "",
          date: new Date().toISOString().split("T")[0],
          visibility: "public",
        });
        setUploadedImageUrl("");
        if (refetchPosts) refetchPosts();
        if (onClose) onClose();
      } else {
        toast.error(
          data._id ? "Failed to update post" : "Failed to create post"
        );
      }
    } catch (error) {
      console.error(
        data._id ? "Error updating post:" : "Error creating post:",
        error
      );
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting the post");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-black to-gray-900 rounded-3xl shadow-2xl">
      <form
        onSubmit={handleCreatePost}
        className="flex flex-col min-h-[85vh] gap-6"
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
          <div className="flex flex-col space-y-6 bg-black/30 p-6 md:p-8 rounded-3xl border border-emerald-500/20 backdrop-blur-md shadow-xl shadow-emerald-900/20 transition-all duration-300 hover:shadow-emerald-900/40">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-emerald-400 mb-2 flex items-center gap-3">
                  📋 Blog Details
                </h2>
                <p className="text-gray-300 text-sm">
                  Provide the essentials for your captivating blog post
                </p>
              </div>
              <div className="min-w-[200px]">
                <label className="block mb-2 font-medium text-emerald-300 text-sm">
                  Visibility
                </label>
                <div className="flex items-center bg-black/70 backdrop-blur-2xl border border-emerald-500/30 rounded-full p-1 shadow-lg shadow-emerald-500/20 relative overflow-hidden transition-all duration-300 hover:shadow-emerald-500/40">
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
                      data.visibility === "public"
                        ? "translate-x-0 bg-gradient-to-r from-emerald-600/40 to-teal-600/40"
                        : "translate-x-full bg-gradient-to-r from-red-600/40 to-pink-600/40"
                    }`}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setData({ ...data, visibility: "public" })}
                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      data.visibility === "public"
                        ? "bg-emerald-600/80 text-white shadow-md shadow-emerald-600/50"
                        : "text-emerald-200 hover:bg-emerald-500/10 hover:text-white"
                    }`}
                  >
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setData({ ...data, visibility: "private" })}
                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      data.visibility === "private"
                        ? "bg-red-600/80 text-white shadow-md shadow-red-600/50"
                        : "text-emerald-200 hover:bg-red-500/10 hover:text-white"
                    }`}
                  >
                    Private
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full p-3 bg-black/50 border border-emerald-500/30 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                  placeholder="Craft an engaging title..."
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
                  className="w-full p-3 bg-black/50 border border-emerald-500/30 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
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
                className="w-full p-3 bg-black/50 border border-emerald-500/30 rounded-xl text-white placeholder-gray-500 resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                placeholder="Tease your readers with a compelling summary..."
                rows="4"
                required
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-3 font-medium text-emerald-300 text-sm flex items-center gap-2">
                  📸 Featured Image
                </label>
                <EnhancedUploadDropzone
                  onUploadComplete={(url) => setUploadedImageUrl(url)}
                  onUploadError={(error) =>
                    console.error("Upload error:", error)
                  }
                  uploadedImageUrl={uploadedImageUrl}
                  onRemoveImage={() => setUploadedImageUrl("")}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="imageUrl"
                  className="flex items-center gap-2 mb-2 font-medium text-emerald-300 text-sm"
                >
                  🔗 Or Paste Image URL
                  <span className="text-xs text-gray-400">
                    (Optional fallback)
                  </span>
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={data.imageUrl}
                  onChange={(e) =>
                    setData({ ...data, imageUrl: e.target.value })
                  }
                  className={`w-full p-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 transition-all duration-200 ${
                    uploadedImageUrl
                      ? "border-gray-600/50 opacity-60 cursor-not-allowed"
                      : "border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
                  }`}
                  placeholder="https://example.com/your-image.jpg"
                  disabled={!!uploadedImageUrl}
                />
                {uploadedImageUrl && (
                  <div className="mt-3 p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl text-emerald-300 text-sm shadow-inner">
                    <span className="font-medium">Note:</span> Uploaded image
                    overrides URL input for priority.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing Your Masterpiece...
                  </div>
                ) : (
                  "✨ Publish Blog Post"
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-black/30 p-6 md:p-8 rounded-3xl border border-emerald-500/20 backdrop-blur-md shadow-xl shadow-emerald-900/20 transition-all duration-300 hover:shadow-emerald-900/40">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-emerald-400 mb-2 flex items-center gap-3">
                📝 Content Canvas
              </h2>
              <p className="text-gray-300 text-sm">
                Unleash your creativity in this powerful rich text editor
              </p>
            </div>
            <div className="flex-1 min-h-0 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-inner">
              <RichEditor
                value={data.content}
                onChange={(content) => setData({ ...data, content })}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
