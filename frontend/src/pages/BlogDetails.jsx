import React, { memo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiShare2, FiArrowLeft } from "react-icons/fi";

const fetchBlogDetails = async (_id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.data) throw new Error("Blog not found");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blog"
    );
  }
};

const SkeletonLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="w-full max-w-6xl space-y-6">
      <div className="w-full h-96 bg-gray-800/20 rounded-2xl animate-pulse" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-800/20 rounded-lg w-3/4 mx-auto animate-pulse" />
        <div className="h-6 bg-gray-800/20 rounded-lg w-1/2 mx-auto animate-pulse" />
      </div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-800/20 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="bg-black/50 backdrop-blur-2xl rounded-2xl border border-red-500/30 shadow-2xl p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Error Loading Blog</h2>
      <p className="text-emerald-100/80 mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-100 hover:bg-emerald-500/30 transition-all duration-300"
          aria-label="Retry loading blog"
        >
          Retry
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-emerald-100 hover:bg-emerald-500/10 transition-all duration-300"
          aria-label="Go back to blogs"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

const BlogDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogDetails", _id],
    queryFn: () => fetchBlogDetails(_id),
    retry: 1,
    staleTime: 5 * 60 * 1000, 
    enabled: !!_id,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progressPercent = (scrollPosition / totalHeight) * 100;
      setProgress(Math.min(progressPercent, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title || "Blog Post",
        url: window.location.href,
      }).catch(() => alert("Failed to share blog post"));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
    }
  };

  if (isLoading) return <SkeletonLoader />;

  if (isError) return <ErrorDisplay message={error.message} onRetry={refetch} />;

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-black/50 backdrop-blur-2xl rounded-2xl border border-emerald-500/30 shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Blog Not Found</h2>
          <p className="text-emerald-100/80 mb-6">
            This blog post doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-100 hover:bg-emerald-500/30 transition-all duration-300"
            aria-label="Back to blogs"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.015)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="fixed top-0 left-0 h-1 bg-emerald-500/50 z-50 transition-all duration-300" style={{ width: `${progress}%` }} />

      <div className="relative z-10 pb-16">
        <header className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate("/blogs")}
            className="p-2 bg-black/50 rounded-full border border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 transition-all duration-300"
            aria-label="Back to blogs"
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-black/50 rounded-full border border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 transition-all duration-300"
            aria-label="Share blog post"
          >
            <FiShare2 size={24} />
          </button>
        </header>

        {data.imageUrl && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-16">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
              <img
                src={data.imageUrl}
                alt={`${data.title} visual`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 mt-10">
          <div className="text-center mb-8">
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight"
              role="heading"
              aria-level="1"
            >
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-emerald-200 text-sm">
              <span>
                By <span className="font-semibold">{data.author?.username || "Unknown"}</span>
              </span>
              <span aria-hidden="true">•</span>
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {data.content ? (
            <article
              className="text-lg prose prose-invert prose-xl sm:prose-2xl max-w-none text-white bg-black/50 backdrop-blur-lg p-8 sm:p-10 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/20"
              style={{
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                lineHeight: "1.75",
              }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-center text-emerald-100/80 text-xl sm:text-2xl">
              No content available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(BlogDetails);