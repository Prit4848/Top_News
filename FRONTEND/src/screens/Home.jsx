import React from "react";
import Header from "../component/Header";
import Card from "../component/Card";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#0a192f] text-white px-6 py-4">
        <Header/>
        {/* News Cards Section */}
        <div className="mt-6">
          <Card/>
        </div>
        {/* Headline */}
      <div className="text-center py-6">
        <p className="text-2xl font-bold text-gray-300">
          Stay Updated with TrendyNews
        </p>
      </div>
      </div>
    </>
  );
};

export default Home;
