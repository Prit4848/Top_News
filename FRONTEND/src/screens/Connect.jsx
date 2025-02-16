import { FaFacebook, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Headermain from "../component/Headermain";

export const ConnectPage = () => {
  return (
    <div className="bg-gray-900">
        <Headermain/>
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">Connect with Us</h1>
        <p className="text-gray-400 mb-6">
          Follow us on social media for the latest updates and support.
        </p>

        <div className="flex justify-center space-x-6">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61563746221726"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <FaFacebook size={48} />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/Prit4848"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400 transition-transform transform hover:scale-110"
          >
            <FaGithub size={48} />
          </a>
          {/* YouTube */}
          <a
            href="https://youtube.com/@studyplanner123?si=bzpppnMgiFQ-cl19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 transition-transform transform hover:scale-110"
          >
            <FaYoutube size={48} />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/studyplanner753/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-transform transform hover:scale-110"
          >
            <FaInstagram size={48} />
          </a>
        </div>

        <div className="mt-6">
          <a
            href="mailto:studyplanner12233@gmail.com"
            className="text-blue-400 hover:underline"
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
