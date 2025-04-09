import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/sendupdates`,formData,{
        headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,"Content-Type" : "multipart/form-data"}
      })

      if(response.status == 200 || response.status == 201){
        toast.success("🚀 Send Update -> user")
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
       <ToastContainer position="top-right" />
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-12">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-10 border-b-2 pb-4">
          🛠 Admin Panel – Update Info
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-8 text-lg"
        >
          <div>
            <label className="block text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-base bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full text-base bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              required
              className="block w-full text-base bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl p-4"
            />
          </div>

          <button
            type="submit"
            className="w-full text-xl bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300"
          >
            🚀 Send Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
