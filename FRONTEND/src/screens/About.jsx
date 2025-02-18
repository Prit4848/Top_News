import Headermain from "../component/Headermain";

const AboutPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-15">
      <Headermain />
      <div className="flex items-center justify-center  h-[80vh] px-6">
        <div className="max-w-3xl w-full bg-gray-800 shadow-xl rounded-2xl p-10 text-white border border-gray-700">
          <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">About Us</h1>

          <p className="text-lg text-gray-300 mb-6 text-center">
            Welcome to <span className="text-red-400 font-semibold">Top News</span>, your go-to platform for the latest updates and breaking news from around the world.
          </p>

          <div className="space-y-6">
            {/* Mission Section */}
            <div>
              <h2 className="text-2xl font-semibold text-red-400 mb-2">Our Mission</h2>
              <p className="text-gray-300">
                At Top News, we aim to deliver accurate, up-to-date, and engaging news coverage. Whether it's global affairs, technology, entertainment, or sports, we bring the latest headlines directly to you.
              </p>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl font-semibold text-red-400 mb-2">Why Choose Us?</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Real-time news updates from trusted sources</li>
                <li>Comprehensive coverage on various topics</li>
                <li>Easy-to-navigate interface for seamless browsing</li>
                <li>Stay informed with notifications and personalized feeds</li>
              </ul>
            </div>

            {/* Meet the Team */}
            <div>
              <h2 className="text-2xl font-semibold text-red-400 mb-2">Meet the Team</h2>
              <p className="text-gray-300">
                Our team consists of passionate journalists, editors, and developers who strive to provide unbiased and fact-checked news to keep you informed.
              </p>
            </div>

            {/* Get in Touch */}
            <div>
              <h2 className="text-2xl font-semibold text-red-400 mb-2">Get in Touch</h2>
              <p className="text-gray-300">
                Have questions, suggestions, or feedback? Feel free to{" "}
                <a href="/contactUs" className="text-blue-400 hover:underline hover:text-blue-300 transition-all">
                  contact us
                </a>
                . We’d love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
