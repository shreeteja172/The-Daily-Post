import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../lib/contextapi";
import { UploadDropzone } from "../lib/uploadthing";

const CreateBlog = ({ onClose, refetchPosts }) => {
  const { token } = useContext(Context);
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        content: data.content,
        date: new Date(data.date).toISOString(),
        visibility: "public",
        imageUrl: uploadedImageUrl || data.imageUrl, // Use uploaded image or fallback to manual URL
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
          <label className="block mb-1 font-medium text-white">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-emerald-500/20 rounded-lg p-4">
            {uploadedImageUrl ? (
              <div className="space-y-2">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded preview"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImageUrl("")}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="image"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setUploadedImageUrl(res[0].url);
                    toast.success("Image uploaded successfully!");
                  }
                }}
                onUploadError={(error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  container: "border-emerald-500/20",
                  uploadIcon: "text-emerald-500",
                  label: "text-white",
                  allowedContent: "text-gray-300",
                }}
              />
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block mb-1 font-medium text-white"
          >
            Or Enter Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={data.imageUrl}
            onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
            className="w-full p-2 bg-black/30 border border-emerald-500/20 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="https://example.com/image.jpg"
            disabled={!!uploadedImageUrl} 
          />
          {uploadedImageUrl && (
            <p className="text-sm text-gray-400 mt-1">
              Image upload takes priority over URL input
            </p>
          )}
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

export default CreateBlog;
