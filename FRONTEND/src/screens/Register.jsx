import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [conformpassword, setconformpassword] = useState('')


    const RegisterHanddler = async (e)=>{
        e.preventDefault()
        try {
            if (!firstname || !lastname || !email || !password || !conformpassword) {
                toast.error("All fields are required ❌");
                return;
              }
            if(password != conformpassword){
             toast.error('Password And ConfromPassword Are Not Match ❌')
             return;
            }
            if(password.length < 6){
                toast.error('Password Must Be 6 Or Greater 6 Charecter ❌')
                return;
            }

            const data = {firstname:firstname,lastname:lastname,email:email,password:password};

            await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,data)
            .then((response)=>{
                if(response.status == 200 || response.status == 201){
                    toast.success("Registration successful ✅ -> Login");
                }else{
                  toast.error("Something Is Wrong Please Try Again ❌");
                }
            })
        } catch (error) {
            console.log(error.message)
            toast.error("Something Is Wrong Please Try Again ❌");
        }
    }
  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-12 text-white relative overflow-hidden"
    style={{ background: "linear-gradient(to right, #0a192f, #ff0000)" }}
  >
    <ToastContainer position="top-right" />
    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    
    <h1 className="text-6xl font-extrabold text-blue-500 drop-shadow-2xl z-10">
      <span className="text-red-600">Top</span> News
    </h1>

    <form onSubmit={(e)=>{RegisterHanddler(e)}} className="bg-[#0a192f] p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700 z-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-500">Register</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">First Name</label>
        <input
          value={firstname}
          onChange={(e)=>{setfirstname(e.target.value)}}
          type="text"
          name="firstName"
          required
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Last Name</label>
        <input
          value={lastname}
          onChange={(e)=>{setlastname(e.target.value)}}
          type="text"
          name="lastName"
          required
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          value={email}
          onChange={(e)=>{setemail(e.target.value)}}
          type="email"
          name="email"
          required
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
        value={password}
        onChange={(e)=>{setpassword(e.target.value)}}
          type="password"
          name="password"
          required
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
        <input
        value={conformpassword}
        onChange={(e)=>{setconformpassword(e.target.value)}}
          type="password"
          name="confirmPassword"
          required
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
      >
        Register
      </button>
      <div className="mt-2 text-xl">if you have an Account? <Link to={'/Login'} className="text-blue-500 border-b-2">Login</Link></div>
    </form>
  </div>
  )
}

export default Register