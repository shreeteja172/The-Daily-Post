import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/posts" element={<Blogs />} />
        <Route path="/create-blog" element={<Blogs />} />
        <Route path="/all-blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<Blogs />} />

        {/* <Route path="/blod/:id" element={<BlogsDetail />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/user/:id" element={<User />} /> */}
      </Routes>
    </div>
  );
}

export default App;
