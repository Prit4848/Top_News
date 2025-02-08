import React from "react";

const Card = () => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-12">
        {[
          {
            title: "Breaking: Major Tech Advancements in AI",
            description:
              "Artificial Intelligence is evolving rapidly, impacting various industries worldwide.",
            urlToImage: "https://source.unsplash.com/featured/?technology,ai",
            url: "https://example.com/news/ai-advancements",
          },
          {
            title: "Sports Update: Champions League Finals",
            description:
              "The much-awaited finals are here, with top teams competing for glory.",
            urlToImage: "https://source.unsplash.com/featured/?sports,football",
            url: "https://example.com/news/champions-league",
          },
          {
            title: "Politics: Election Results Announced",
            description:
              "The latest election results are in, reshaping the political landscape.",
            urlToImage: "https://source.unsplash.com/featured/?politics",
            url: "https://example.com/news/elections",
          },
          {
            title: "Entertainment: Blockbuster Movie Released",
            description:
              "A highly anticipated movie is now in theaters, attracting huge audiences.",
            urlToImage: "https://source.unsplash.com/featured/?movies,cinema",
            url: "https://example.com/news/movie-release",
          },
          {
            title: "Health: New Research on Heart Disease",
            description:
              "Scientists reveal groundbreaking research on heart disease prevention.",
            urlToImage: "https://source.unsplash.com/featured/?health,medical",
            url: "https://example.com/news/heart-disease",
          },
          {
            title: "Fitness: 10-Minute Workouts for a Healthy Life",
            description:
              "Short, effective workout routines to keep you fit and active.",
            urlToImage:
              "https://source.unsplash.com/featured/?fitness,exercise",
            url: "https://example.com/news/fitness-tips",
          },
          {
            title: "Trending: SpaceX's New Mission to Mars",
            description:
              "Elon Musk's SpaceX is planning another groundbreaking Mars mission.",
            urlToImage: "https://source.unsplash.com/featured/?space,rocket",
            url: "https://example.com/news/spacex-mars",
          },
        ].map((curItem, index) => {
          if (!curItem.urlToImage) {
            return null;
          } else {
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={curItem.urlToImage}
                  alt={curItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <a
                    href={curItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-white hover:text-red-500 transition-all duration-200"
                  >
                    {curItem.title}
                  </a>
                  <p className="text-gray-400 text-sm mt-2">
                    {curItem.description
                      ? curItem.description.slice(0, 100) + "..."
                      : "No description available."}
                  </p>
                  <button
                    onClick={() => window.open(curItem.url)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Card;
