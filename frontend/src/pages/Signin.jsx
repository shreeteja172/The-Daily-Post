import React from "react";
import { useState } from "react";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignin = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Sign-in data:", data);
  }
  return (
    <form className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleSignin}
      >
        Sign In
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600">
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default Signin;
