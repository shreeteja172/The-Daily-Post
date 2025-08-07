import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogDetails = async (_id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log("Response data:", response.data);
  if (!response.data) {
    throw new Error("Blog not found");
  }
  return response.data;
};

const BlogDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogDetails", _id],
    queryFn: () => fetchBlogDetails(_id),
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-100/70">Loading blog...</p>
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
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Blog
          </h2>
          <p className="text-emerald-100/70 mb-4">
            {error?.message || "Failed to load the blog. Please try again."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/blogs")}
              className="px-4 py-2 bg-black/30 border border-emerald-500/30 rounded-lg text-emerald-100/90 hover:bg-emerald-500/10 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-white mb-2">Blog Not Found</h2>
          <p className="text-emerald-100/70 mb-4">
            This blog post doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-100 hover:bg-emerald-500/30 transition-all duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
            <div className="flex items-center justify-center mb-4 text-emerald-100/80 text-sm">
              <span className="mr-2">
                By{" "}
                <span className="font-semibold">
                  {data.author?.username || "Unknown"}
                </span>
              </span>
              <span>•</span>
              <span className="ml-2">
                {new Date(data.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          {data.imageUrl && (
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl"></div>
              <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-2 border border-emerald-500/30">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-xl">
                  <img
                    src={data.imageUrl}
                    alt="Blog visual"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-2xl pointer-events-none"></div>
            </div>
          )}
          {data.content ? (
            <div
              className="text-white prose prose-invert prose-headings:text-white prose-headings:font-bold prose-p:text-emerald-100/90 prose-a:text-emerald-400 prose-strong:text-emerald-200 prose-em:text-emerald-100/80 prose-code:text-emerald-300 prose-pre:bg-black/50 prose-pre:border prose-pre:border-emerald-500/20 max-w-none text-lg"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <div className="text-center text-emerald-100/70 py-8">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-emerald-500/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>No content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
