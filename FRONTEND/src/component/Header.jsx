import React from "react";

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="flex flex-col items-center py-6 border-b border-gray-700 space-y-4">
        <div className="flex w-full justify-between">
          {/* Centered Logo */}
          <h1 className="text-7xl text-center font-extrabold text-red-500 ml-52">
            Top<span className="text-blue-500">News</span>
          </h1>

          {/* Navigation Links */}
          <div className="w-full flex justify-end space-x-8 py-4 mr-36 gap-20">
            {["Home", "About", "Contact Us", "Connect"].map(
              (category, index) => (
                <button
                  key={index}
                  className="relative px-6 py-3 text-lg font-semibold text-white transition duration-300 rounded-full 
                           hover:bg-red-500 hover:text-white"
                >
                  {category}
                  <span className="absolute inset-0 border-2 border-red-500 rounded-lg transition-all duration-300 transform scale-100 hover:scale-110"></span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Category & Search Bar Section */}
        <div className="w-full flex justify-between items-center px-12 mt-4">
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center ml-20 gap-32">
            {[
              "All News",
              "Trending",
              "Sports",
              "Politics",
              "Entertainment",
              "Health",
              "Fitness",
            ].map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 text-lg font-medium text-white  rounded-lg
                             hover:bg-red-500 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md w-80 mr-20">
            <input
              type="text"
              placeholder="Search News"
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-400 px-2"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300">
              Search
            </button>
          </div>
        </div>
      </nav>

      
    </>
  );
};

export default Header;
