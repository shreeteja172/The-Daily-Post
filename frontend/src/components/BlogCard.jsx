import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../lib/contextapi";

const BlogCard = ({ blog, onReadMore }) => {
  const { _id, title, content, imageUrl, author, createdAt, date } = blog;
  const { userData } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="relative bg-black/60 backdrop-blur-lg border border-emerald-500/20 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 group hover:scale-101 hover:shadow-emerald-500/20">
      {userData?._id === author?._id && (
        <button
          className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-emerald-700 text-emerald-400 p-2 rounded-full shadow-lg transition"
          title="Edit Blog"
          aria-label="Edit Blog"
          onClick={() => navigate("/create-blog", { state: { blog } })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z"
            />
          </svg>
        </button>
      )}
      {imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={title || "Blog image"}
            className="w-full h-full object-cover rounded-t-xl shadow transition-transform duration-200 group-hover:scale-102"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x225?text=Image+Not+Found";
              e.target.classList.add("opacity-50");
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      <div className="p-6 relative z-10">
        <h3
          className="text-2xl font-bold mb-3 line-clamp-2 text-white"
          title={title}
        >
          {title || "Untitled Blog"}
        </h3>
        <div className="text-emerald-100/80 text-base mb-4 line-clamp-3 leading-relaxed">
          {content ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  content.slice(0, 150) + (content.length > 150 ? "..." : ""),
              }}
            />
          ) : (
            <p>No description available</p>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-emerald-100/70 mb-5">
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-400/70"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {author?.username || "Anonymous"}
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-400/70"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <time dateTime={createdAt || date}>
              {new Date(createdAt || date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </span>
        </div>

        <button
          onClick={() => onReadMore && onReadMore(blog)}
          className="relative w-full bg-emerald-600 hover:bg-teal-600 text-white py-2.5 px-5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 focus:ring-offset-black/70 cursor-pointer"
          aria-label={`Read full article: ${title || "Untitled Blog"}`}
        >
          Read Full Article
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
