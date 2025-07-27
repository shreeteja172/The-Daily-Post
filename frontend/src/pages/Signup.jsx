import React from 'react'
import { useState } from 'react';

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSignin = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Sign-up data:", data);
  }
  return (
    <form className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign Up
      </h2>
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, firstName: e.target.value
        })}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
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
        Sign Up
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600">
          Sign In
        </a>
      </p>
    </form>
  )
}

export default Signup