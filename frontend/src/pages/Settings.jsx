import React from 'react'
import { Context } from '../lib/contextapi'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
const Settings = () => {
    const { userData, setToken } = useContext(Context);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <p><strong>First Name:</strong> {userData?.firstName}</p>
        <p><strong>Last Name:</strong> {userData?.lastName}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Username:</strong> {userData?.username}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>

  )
}

export default Settings