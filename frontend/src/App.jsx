import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import InfiniteBlogsAll from "./pages/InfiniteBlogsAll";
import InfiniteOwnBlogs from "./pages/InfiniteOwnBlogs";
import CreateBlogPage from "./pages/CreateBlogPage";
import RequireAuth from "./components/RequireAuth";
import BlogDetails from "./pages/BlogDetails";
import Settings from "./pages/Settings";
import About from "./pages/About";
function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/all-blogs" element={<InfiniteBlogsAll />} />
          <Route path="/my-blogs" element={<InfiniteOwnBlogs />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/blogs/:_id" element={<BlogDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
