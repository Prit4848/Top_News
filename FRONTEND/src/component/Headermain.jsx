import React from 'react';
import { useNavigate } from 'react-router-dom';

const Headermain = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full justify-between">
        {/* Centered Logo */}
        <h1 className="text-7xl text-center font-extrabold text-red-500 ml-52">
          Top<span className="text-blue-500">News</span>
        </h1>

        {/* Navigation Links */}
        <div className="w-full flex justify-end space-x-8 py-4 mr-36 gap-20">
          {["Home", "About", "ContactUs", "Connect"].map((category, index) => (
            <button
              onClick={() => navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`)}
              key={index}
              className="relative px-6 py-3 text-lg font-semibold text-white transition duration-300 rounded-full 
                         hover:bg-red-500 hover:text-white"
            >
              {category}
              <span className="absolute inset-0 border-2 border-red-500 rounded-lg transition-all duration-300 transform scale-100 hover:scale-110"></span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Headermain;
