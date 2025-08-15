import React from "react";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/Landing";
import Blogs from "./pages/Blogs";
import InfiniteBlogsAll from "./pages/InfiniteBlogsAll";
import InfiniteOwnBlogs from "./pages/InfiniteOwnBlogs";
import CreateBlogPage from "./pages/CreateBlogPage";
import RequireAuth from "./components/RequireAuth";
import BlogDetails from "./pages/BlogDetails";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import CompulsoryAuth from "./pages/CompulsoryAuth";
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
          <Route path="/edit-blog/:id" element={<CreateBlogPage />} />
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/requireauth" element={<CompulsoryAuth />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
