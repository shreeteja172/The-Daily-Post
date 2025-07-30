import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import AllBlogs from "./components/AllBlogs";
import InfiniteBlogsAll from "./pages/InfiniteBlogsAll";
import InfiniteOwnBlogs from "./pages/InfiniteOwnBlogs";
import CreateBlogPage from "./pages/CreateBlogPage";
function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/all-blogs" element={<InfiniteBlogsAll />} />
        <Route path="/my-blogs" element={<InfiniteOwnBlogs />} />

      </Routes>
    </div>
  );
}

export default App;
