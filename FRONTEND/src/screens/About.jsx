import Headermain from "../component/Headermain";

const AboutPage = () => {
    return (
      <div className="bg-gray-900">
        <Headermain/>
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg p-8 text-white">
          <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">About Us</h1>
          
          <p className="text-lg text-gray-300 mb-6 text-center">
            Welcome to <span className="text-red-400 font-semibold">Top News</span>, your go-to platform for the latest updates and breaking news from around the world.
          </p>
  
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6">
            At Top News, we aim to deliver accurate, up-to-date, and engaging news coverage. Whether it's global affairs, technology, entertainment, or sports, we bring the latest headlines directly to you.
          </p>
  
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-gray-300 mb-6">
            <li>Real-time news updates from trusted sources</li>
            <li>Comprehensive coverage on various topics</li>
            <li>Easy-to-navigate interface for seamless browsing</li>
            <li>Stay informed with notifications and personalized feeds</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Meet the Team</h2>
          <p className="text-gray-300 mb-6">
            Our team consists of passionate journalists, editors, and developers who strive to provide unbiased and fact-checked news to keep you informed.
          </p>
  
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Get in Touch</h2>
          <p className="text-gray-300">
            Have questions, suggestions, or feedback? Feel free to{" "}
            <a href="/contactUs" className="text-blue-400 hover:underline">
              contact us
            </a>
            . We’d love to hear from you!
          </p>
        </div>
      </div>
      </div>
    );
  };
  
  export default AboutPage;
  