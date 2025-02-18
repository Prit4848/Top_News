import { useNavigate } from "react-router-dom";

const GetStartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center px-6 py-10">
      {/* Logo and Title */}
      <div className="animate-fade text-center mb-10">
        {/* Centered Logo */}
        <h1 className="text-7xl text-center font-extrabold text-red-500 ">
          Top<span className="text-blue-500">News</span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-300 mt-3">
          Stay Informed with Real-Time News
        </p>
      </div>

      {/* Features Section */}
      <div className="animate-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 ">
        {[
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJOEuf-jK1ufVV541lVyXGCwGhA9Kw6qURIQ&s",
            title: "Live News",
            desc: "Get real-time updates on breaking news.",
          },
          {
            img: "https://www.researchgate.net/publication/360878166/figure/fig1/AS:1160107857580059@1653602675277/Three-different-types-of-news-media.jpg",
            title: "News Categories",
            desc: "Browse news by different categories.",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmKs_XkNYe0vKql7oVZ-1DDmP9yEoi7V6oDQ&s",
            title: "translate Language",
            desc: "Set alerts for your favorite topics.",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1SESVTCDmysFwSPD7y1KrqhxQPVHQd1_iw&s",
            title: "Summerize news",
            desc: "Set alerts for your favorite topics.",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSielLGbXXQQ9de0H3i_f22BMo1kU5ghT9oIg&s",
            title: "Text to speech Translation",
            desc: "Set alerts for your favorite topics.",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShy5jEYSp9krnpYjzKSQFE0cDlyVDEwP-6uw&s",
            title: "Subscribe and updated wich Top News",
            desc: "Set alerts for your favorite topics.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-8 rounded-2xl text-center shadow-xl hover:scale-105 transition transform duration-300 w-80 sm:w-96"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-24 h-24 mx-auto mb-5 rounded-full border-4 border-red-500 shadow-md"
            />
            <h3 className="text-2xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300 mt-3 text-lg">{feature.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/Login")}
        className="animate-fade  bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-4xl font-bold rounded-lg mt-10 w-[50vw] shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-between text-center"
      >
        <span className="flex-1 text-center">Get Started</span>
        <i className="ri-arrow-right-wide-fill text-4xl"></i>
      </button>

      {/* Subscription Form */}
      <div className="animate-fade bg-gray-800 p-8 rounded-2xl mt-12 w-full max-w-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-center text-white">
          Subscribe for Updates
        </h3>
        <form className="mt-5 flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-4 rounded-md bg-gray-600 text-white text-lg border-none focus:ring-2 focus:ring-red-500 outline-none border border-red-600"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg text-lg font-semibold shadow-md transform hover:scale-105 transition-all duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetStartPage;
