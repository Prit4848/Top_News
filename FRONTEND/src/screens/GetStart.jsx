import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import bg from "../assets/bg.jpg"; // Import the background image
import { Link } from "react-router-dom";

export default function GetStartPage() {
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-12 text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Logo */}
      <h1 className="text-6xl font-extrabold text-blue-500 drop-shadow-2xl z-10">
        <span className="text-red-600">Top</span> News
      </h1>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 z-10"
      >
        {[{
          title: "Breaking News",
          desc: "Stay updated with real-time breaking news from around the world.",
        }, {
          title: "Live Updates",
          desc: "Get continuous live updates on trending topics and events.",
        }, {
          title: "Personalized Feed",
          desc: "Customize your news feed based on your interests and preferences.",
        }].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-blue-900 p-8 rounded-2xl shadow-2xl text-center transition-all transform hover:scale-105 hover:shadow-blue-900/50 border border-transparent hover:border-blue-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
            <p className="mt-2 text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Get Started Button */}
      <motion.button
        className="mt-12 px-12 py-5 bg-blue-600 text-white text-3xl font-semibold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 z-10"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
       <Link to={"/Login"}>Get Started</Link> 
      </motion.button>

      {/* Subscription Form */}
      <div
        ref={formRef}
        className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 p-12 rounded-3xl w-full max-w-lg shadow-2xl text-center border border-blue-900 transform hover:scale-105 transition-transform z-10"
      >
        <h3 className="text-3xl font-bold mb-6 text-white tracking-wide">Subscribe for Updates</h3>
        <p className="text-lg text-gray-300 mb-6">
          Stay up to date with the latest news and offers. Enter your email below!
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-5 rounded-xl text-black border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 bg-white transition-all duration-300 ease-in-out"
        />
        <button className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-all duration-300 transform hover:translate-y-1">
          Subscribe
        </button>
        <p className="mt-4 text-sm text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
