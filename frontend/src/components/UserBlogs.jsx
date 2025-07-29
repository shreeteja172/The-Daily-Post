import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Context } from "../lib/contextapi";
import { useContext } from "react";
const UserBlogs = () => {
  const { token } = useContext(Context);

  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/blogs/`
  //       );
  //       setBlogs(response.data);
  //       setLoading(false);
  //       console.log("Fetched blogs:", response.data);
  //       toast.success("Blogs loaded successfully");
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //       toast.error("Failed to load blogs");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user:", response);
      toast.success("Blogs loaded successfully");
      return response.data;
    },
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Blogs</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>

              {blog.imageUrl && (
                <div className="my-3">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              <p className="text-gray-600 mb-2">
                {blog.content.substring(0, 200)}...
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  By {blog.author.username}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBlogs;
