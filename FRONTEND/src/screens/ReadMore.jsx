import React from "react";
import Headermain from "../component/Headermain";
import { useLocation, useNavigate } from "react-router-dom";

const ReadMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newsData = location.state?.news; 
  console.log(newsData);

  return (
    <div className="bg-gray-900 min-h-screen pt-12 text-white">
      <Headermain />
      <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-10 items-start">
        
        {/* Left Side - News Content Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full md:w-3/5">
          <h1 className="text-4xl font-bold text-red-500 mb-4">{newsData.title}</h1>
          <p className="text-gray-400 text-sm mb-4">
            Published on: <span className="text-white">{newsData.publishedAt}</span>
          </p>

          {/* Image Section */}
          <div className="w-full flex justify-center">
            <img
              src={newsData.urlToImage}
              alt="News"
              className="max-w-full max-h-[450px] rounded-lg border border-gray-700 object-cover shadow-lg"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mt-6 leading-relaxed">
            {newsData.description}
          </p>
        </div>

        {/* Right Side - Text to Speech, Summary, and Back Button */}
        <div className="flex flex-col gap-6 w-full md:w-2/5">
          
          {/* Text to Speech Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Listen to Article</h2>
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold transition-all duration-300 w-full">
              ▶ Play Audio
            </button>
          </div>

          {/* Summarize Article Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Summary</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              This section will contain a short summary of the article.
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg font-semibold transition-all duration-300 w-full"
            >
              ⬅ Back to News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
