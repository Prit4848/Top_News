import { useState } from "react";
import Headermain from "../component/Headermain";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const ContactUs = () =>{
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')

  const HanddleContactUs =async (e)=>{
    e.preventDefault()
    try {
      if(!name || !email || !message){
        return toast.warning("all fields are require")
      }
      
      const data = {name,message,email}

      await axios.post(`${import.meta.env.VITE_BASE_URL}/user/contactus`,data,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then((response)=>{
        if(response.status == 200 || response.status == 201){
          toast.success("Message Send Success ✅")
        }
      })
    } catch (error) {
      toast.error("something was Wrong Please Check")
    }
  }
  return(
  <div className="bg-gray-900 min-h-screen space-y-6 pt-16">
    <ToastContainer position="top-right" />
    <Headermain />
    <div className="flex flex-wrap gap-10 justify-center items-center px-8 py-24">
      {/* Contact Form */}
      <form onSubmit={(e)=>{HanddleContactUs(e)}} className="flex-1 max-w-2xl bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Contact Us</h2>
        <input
           value={name}
           onChange={(e)=>{setname(e.target.value)}}
          type="text"
          placeholder="Your Name"
          className="w-full p-5 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-4 focus:ring-red-500 transition-all text-lg"
          required
        />
        <input
          value={email}
          onChange={(e)=>{setemail(e.target.value)}}
          type="email"
          placeholder="Your Email"
          className="w-full p-5 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-4 focus:ring-red-500 transition-all text-lg"
          required
        />
        <textarea
           value={message}
           onChange={(e)=>{setmessage(e.target.value)}}
          placeholder="Your Message"
          className="w-full p-5 rounded-lg bg-gray-700 text-white border border-gray-600 h-48 focus:ring-4 focus:ring-red-500 transition-all text-lg"
          required
        ></textarea>
        <button className="w-full p-5 bg-red-600 rounded-xl hover:bg-red-700 font-bold text-xl transition duration-300 transform hover:scale-105 shadow-md">
          Send Message
        </button>
      </form>

      {/* Map Section */}
      <div className="flex-1 max-w-2xl bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-700 flex justify-center items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.639145349299!2d72.8438!3d19.0712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzE1LjAiTiA3MsKwNTAnMzkuNCJF!5e0!3m2!1sen!2sin!4v1616082757033!5m2!1sen!2sin"
          width="100%"
          height="550"
          style={{ border: 0, borderRadius: "15px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
)};

export default ContactUs;