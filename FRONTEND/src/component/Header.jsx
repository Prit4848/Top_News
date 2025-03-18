import React, { useContext, useEffect, useState } from "react";
import Headermain from "./Headermain";
import NewsContext from "../context/NewsContext"; 
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const { setallNews } = useContext(NewsContext);
  const [search, setSearch] = useState("");

  // ✅ Fetch News Based on Category
  const GetNewsByCategory = async (category) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      console.log("Token being sent:", token);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/news/getnews`,  
        { prompt: category }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setallNews(response.data.result);
      } else {
        toast.error("Something went wrong. Please try again ❌");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error("Something went wrong. Please try again ❌");
    }
  };

  // ✅ Fetch News Based on Search Input
  const GetNewsBySearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!search.trim()) {
      toast.warning("Please enter a search term 🔍");
      return;
    }

    await GetNewsByCategory(search);
  };

  // Fetch default news when the component mounts
  useEffect(() => {
    GetNewsByCategory("wold");
  }, []);

  return (
    <>
      <nav className="flex flex-col items-center py-6 border-b border-gray-700 space-y-4">
        <ToastContainer position="top-right" />
        <Headermain />

        <div className="w-full flex justify-between items-center px-12 mt-4">
          {/* 🔹 News Category Buttons */}
          <div className="flex flex-wrap justify-center ml-20 gap-32">
            {["All News", "Trending", "Sports", "Politics", "Entertainment", "Health", "Fitness"].map((category, index) => (
              <button
                onClick={() => GetNewsByCategory(category)}
                key={index}
                className="px-6 py-2 text-lg font-medium text-white rounded-lg hover:bg-red-500 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* 🔹 Search Bar */}
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md w-80 mr-20">
            <form onSubmit={GetNewsBySearch} className="flex w-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search News"
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-400 px-2"
              />
              <button 
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
