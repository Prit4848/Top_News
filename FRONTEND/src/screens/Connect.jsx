import { FaFacebook, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Headermain from "../component/Headermain";

export const ConnectPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-15">
      <Headermain />
      <div className="flex items-center justify-center  w-full h-[80vh]">
        <div className="max-w-2xl w-full bg-gray-800 shadow-2xl rounded-3xl p-10 text-center border border-gray-700">
          <h1 className="text-4xl font-extrabold text-white mb-6">Connect with Us</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Follow us on social media for the latest updates and support.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center space-x-10">
            <a
              href="https://www.facebook.com/profile.php?id=61563746221726"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-all transform hover:scale-125"
            >
              <FaFacebook size={60} className="drop-shadow-lg" />
            </a>
            <a
              href="https://github.com/Prit4848"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-400 transition-all transform hover:scale-125"
            >
              <FaGithub size={60} className="drop-shadow-lg" />
            </a>
            <a
              href="https://youtube.com/@studyplanner123?si=bzpppnMgiFQ-cl19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-all transform hover:scale-125"
            >
              <FaYoutube size={60} className="drop-shadow-lg" />
            </a>
            <a
              href="https://www.instagram.com/studyplanner753/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-all transform hover:scale-125"
            >
              <FaInstagram size={60} className="drop-shadow-lg" />
            </a>
          </div>

          {/* Email Section */}
          <div className="mt-8">
            <a
              href="mailto:studyplanner12233@gmail.com"
              className="text-blue-400 text-xl font-semibold hover:underline"
            >
              studyplanner12233@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
