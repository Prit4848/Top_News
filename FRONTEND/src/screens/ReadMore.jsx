import React, { useEffect, useState } from "react";
import Headermain from "../component/Headermain";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReadMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newsData = location.state?.news;
  const [description, setdescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const token = localStorage.getItem("token");

  const getDescriptionHandller = async () => {
    try {
      const prompt_1 = newsData.description;
      const prompt = prompt_1.concat(
        "get more description of this news  100 lines pagraph form not in point wise and article formate"
      );

      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/news/moredescription`,
          { prompt },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((Response) => {
          if (Response.status == 200 || Response.status == 201) {
            setdescription(Response.data.result);
          } else {
            setdescription(prompt);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDescriptionHandller();
  }, []);

  const [loading, setLoading] = useState(false); // New loading state

  const handleConvert = async (prompt) => {
    if (!prompt) return;

    setLoading(true); 

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/news/texttospeech`,
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", 
        }
      );

      if (response.status === 200) {
        const url = URL.createObjectURL(response.data); 
        setAudioUrl(url);
      } else {
        console.error("Failed to fetch audio");
      }
    } catch (error) {
      console.error("Error fetching TTS audio:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [summary, setSummary] = useState(""); 
const [loadingSummary, setLoadingSummary] = useState(false); 

const handleGetSummary = async () => {
  if (!description) return; 

  setLoadingSummary(true); 

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ai/getsummery`,
      { prompt: description.concat("get summery in 2-3 lines") },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      setSummary(response.data.result);
    } else {
      setSummary("Failed to fetch summary.");
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    setSummary("Error generating summary.");
  } finally {
    setLoadingSummary(false);
  }
};


  return (
    <div className="bg-gray-900 min-h-screen pt-12 text-white">
      <Headermain />
      <div className="w-full mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-10 items-start">
        {/* Left Side - News Content Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full md:w-3/4">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            {newsData.title}
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Published on:{" "}
            <span className="text-white">
              {formatDate(newsData.publishedAt)}
            </span>
          </p>

          {/* Image Section */}
          <div className="w-full flex justify-center">
            <img
              src={newsData.urlToImage}
              alt="News"
              className="max-w-full max-h-[450px] rounded-lg border border-gray-700 object-cover shadow-lg"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mt-6 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right Side - Text to Speech, Summary, and Back Button */}
        <div className="flex flex-col gap-6 w-full md:w-1/4">
          {/* Text to Speech Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              Listen to Article
            </h2>
            <button
              onClick={() => handleConvert(description)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold transition-all duration-300 w-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                <>▶ Play Audio</>
              )}
            </button>

            {/* Styled Audio Player */}
            {audioUrl && (
              <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Listen Here:
                </h3>
                <audio controls autoPlay src={audioUrl} className="w-full" />
              </div>
            )}
          </div>

          {/* Summarize Article Section */}
<div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
  <h2 className="text-2xl font-semibold mb-4 text-red-500">Summary</h2>

  {summary ? (
    <p className="text-lg text-gray-300 leading-relaxed">{summary}</p>
  ) : (
    <p className="text-lg text-gray-300 leading-relaxed">
      Click the button to generate a summary.
    </p>
  )}

  {/* Get Summary Button */}
  <button
    onClick={handleGetSummary}
    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold transition-all duration-300 w-full flex justify-center items-center gap-2 mt-4"
    disabled={loadingSummary}
  >
    {loadingSummary ? (
      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    ) : (
      "Get Summary"
    )}
  </button>
</div>


          {/* Back Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg font-semibold transition-all duration-300 w-full"
            >
              ⬅ Back to News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
