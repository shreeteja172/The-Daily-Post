import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
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
        
        {/* <Route path="/posts" element={<Posts />} /> */}
        {/* <Route path="/post/:id" element={<PostDetail />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/user/:id" element={<User />} /> */}
      </Routes>
    </div>
  );
}

export default App;
