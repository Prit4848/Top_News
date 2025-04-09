import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import Header from "../component/Header";
import Card from "../component/Card";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Home = () => {
  const [email, setemail] = useState('')

  const SubscribeHandller = async (e)=>{
    e.preventDefault()
    if(!email){
      toast.error('email is required')
    }
    try {
      const data = {email};

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/subscribe`,data,{
        headers:{Authorization:`Bearer ${localStorage.getItem("toeken")}`}
      });

      if(response.status == 200 || response.status == 201){
     toast.success("Subscription Successfully✅")
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-[#0a192f] text-white px-6 py-4">
      <ToastContainer position="top-right" />
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
       {/* Subscription Form */}
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16 max-w-xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Stay Updated
            </h3>
            <form onSubmit={(e)=>{SubscribeHandller(e)}} className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{setemail(e.target.value)}}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                Subscribe Now
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
