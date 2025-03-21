import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

const Register = () => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [conformpassword, setconformpassword] = useState('');

  const RegisterHanddler = async (e) => {
    e.preventDefault();
    try {
      if (!firstname || !lastname || !email || !password || !conformpassword) {
        toast.error("All fields are required ❌");
        return;
      }
      if (password !== conformpassword) {
        toast.error('Password and Confirm Password do not match ❌');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be 6 or more characters ❌');
        return;
      }

      const data = { firstname, lastname, email, password };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, data);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful ✅ -> Login");
      } else {
        toast.error("Something went wrong. Please try again ❌");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong. Please try again ❌");
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <ToastContainer position="top-right" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ff0000_0%,_transparent_25%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#0000ff_0%,_transparent_25%)] blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
              Top
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              News
            </span>
          </h1>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={RegisterHanddler}
            className="bg-gray-800/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50"
          >
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
              Create Account
            </h2>

            {/* First Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={conformpassword}
                  onChange={(e) => setconformpassword(e.target.value)}
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              Create Account
            </motion.button>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold hover:opacity-80 transition-opacity duration-300"
              >
                Login Here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;