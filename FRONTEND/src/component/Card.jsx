import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsContext from "../context/NewsContext";


const Card = () => {

  const {allNews} = useContext(NewsContext)
 
  const navigate = useNavigate()
  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-12">
        {
        allNews.map((curItem, index) => {
          if (!curItem.urlToImage) {
            return null;
          } else {
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={curItem.urlToImage}
                  alt={curItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <a
                    href={curItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-white hover:text-red-500 transition-all duration-200"
                  >
                    {curItem.title}
                  </a>
                  <p className="text-gray-400 text-sm mt-2">
                    {curItem.description
                      ? curItem.description.slice(0, 100) + "..."
                      : "No description available."}
                  </p>
                  <button
                  onClick={()=>{navigate('/home/readmore',{state:{news:curItem}})}}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Card;
