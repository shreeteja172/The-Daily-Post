import { useState } from "react";
import { Context } from "../lib/contextapi";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const gettoken = () => {
  return localStorage.getItem("token");
};
const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(gettoken());

  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", token],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/getAllBlogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    enabled: !!token,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;



  return (
    <Context.Provider
      value={{ token, setToken, posts, isError, isLoading, error }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
