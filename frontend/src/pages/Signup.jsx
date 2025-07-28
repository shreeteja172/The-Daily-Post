import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }
  // , [navigate]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/register`,
        data
      );
      localStorage.setItem("token", response.data.token);
      // console.log("Response:", response);
      if (response.status === 201) {
        toast.success("Signup successful! Redirecting.......");
        setData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/blogs");
        }, 2000);
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded"
      onSubmit={handleSignup}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={data.firstName}
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={data.lastName}
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={data.username}
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, username: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600">
          Sign In
        </a>
      </p>
    </form>
  );
};

export default Signup;
