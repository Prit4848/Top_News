import Headermain from "../component/Headermain";

export const ContactUs = () => (
  <div className="bg-gray-900 h-screen">
    <Headermain />
    <div className="flex md:flex-row gap-8 justify-center align-middle h-screen mt-44 m-10">
      <form className="flex-1 bg-gray-800 p-8 rounded-xl shadow-md border border-gray-600 space-y-6 h-[45vh]">
        <input type="text" placeholder="Your Name" className="w-full p-4 rounded bg-gray-700 text-white border border-gray-500 focus:ring-2 focus:ring-red-500" required />
        <input type="email" placeholder="Your Email" className="w-full p-4 rounded bg-gray-700 text-white border border-gray-500 focus:ring-2 focus:ring-red-500" required />
        <textarea placeholder="Your Message" className="w-full p-4 rounded bg-gray-700 text-white border border-gray-500 h-40 focus:ring-2 focus:ring-red-500" required></textarea>
        <button className="w-full p-4 bg-red-600 rounded-lg hover:bg-red-700 font-bold text-lg transition duration-300">Send Message</button>
      </form>
      {/* Map of RNGPIT */}
      <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-md border border-gray-600 flex justify-center items-center h-[45vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.639145349299!2d72.8438!3d19.0712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzE1LjAiTiA3MsKwNTAnMzkuNCJF!5e0!3m2!1sen!2sin!4v1616082757033!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
);
