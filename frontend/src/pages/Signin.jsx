import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signin = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      // console.log("Response:", response);
      if (response.status === 200) {
        toast.success("Welcome Again!");
        setData({
          username: "",
          password: "",
        });
        // Redirect to home or dashboard
      } else {
        toast.error("Failed to sign in");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during sign-in");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded"
      onSubmit={handleSignin}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border rounded mb-3"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-3"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
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
