import { useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import {
  NewspaperIcon,
  GlobeAltIcon,
  LanguageIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const GetStartPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('')

  const features = [
    {
      icon: NewspaperIcon,
      title: "Live News",
      desc: "Get instant updates on breaking news as they happen around the globe.",
      color: "from-red-500 to-red-600",
      bgColor: "group-hover:bg-red-500/10"
    },
    {
      icon: GlobeAltIcon,
      title: "News Categories",
      desc: "Explore diverse news categories tailored to your interests.",
      color: "from-blue-500 to-blue-600",
      bgColor: "group-hover:bg-blue-500/10"
    },
    {
      icon: LanguageIcon,
      title: "Language Translation",
      desc: "Break language barriers with instant news translation.",
      color: "from-green-500 to-green-600",
      bgColor: "group-hover:bg-green-500/10"
    },
    {
      icon: DocumentTextIcon,
      title: "News Summary",
      desc: "Get concise summaries of lengthy articles in seconds.",
      color: "from-purple-500 to-purple-600",
      bgColor: "group-hover:bg-purple-500/10"
    },
    {
      icon: SpeakerWaveIcon,
      title: "Text to Speech",
      desc: "Listen to news articles with natural voice synthesis.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "group-hover:bg-yellow-500/10"
    },
    {
      icon: StarIcon,
      title: "Premium Updates",
      desc: "Get exclusive access to premium news content and features.",
      color: "from-pink-500 to-pink-600",
      bgColor: "group-hover:bg-pink-500/10"
    },
  ];

  const SubscribeHandller = async (e)=>{
    e.preventDefault()
    if(!email){
      toast.error('email is required')
    }
    try {
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <ToastContainer position="top-right" />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-8xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
              Top
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              News
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Your gateway to real-time news coverage, delivering the latest stories with cutting-edge features
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 transition-colors duration-300 rounded-2xl ${feature.bgColor}`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${feature.color} p-3 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={() => navigate("/Login")}
          className="group relative w-full max-w-2xl mx-auto mt-16 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl w-full flex items-center justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <span className="text-3xl font-bold">Get Started</span>
            <i className="ri-arrow-right-wide-fill text-3xl group-hover:translate-x-2 transition-transform duration-300"></i>
          </div>
        </motion.button>

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
    </div>
  );
};

export default GetStartPage;
