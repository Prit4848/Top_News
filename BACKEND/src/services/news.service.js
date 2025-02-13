import axios from "axios";
import config from "../config/config.js";
import Gtts from 'gtts'

export const NewsApiResult = async ({ prompt }) => {
  if (!prompt) {
    throw new Error("Prompt is required.");
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      prompt
    )}&from=${Date.now}&sortBy=popularity&apiKey=${config.NEWS_API_KEY}`;

    const response = await axios.get(url);

    if (!response.data || response.data.status !== "ok") {
      throw new Error("News not found or API request failed.");
    }

    return response.data.articles; 
  } catch (error) {
    console.error("Error fetching news:", error.message);
    throw new Error("Failed to fetch news. Please try again later.");
  }
};

export const gtts = async (prompt) => {
  return new Promise((resolve, reject) => {
    const text = prompt || 'Hello';
    const lang = 'hi';
    const gtts = new Gtts(text, lang);
    const filePath = 'output.mp3';

    gtts.save(filePath, (err) => {
      if (err) {
        console.error('Error:', err);
        return reject('Error generating speech');
      }
      resolve(filePath);
    });
  });
};
