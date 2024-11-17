import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./news.css";

const API_BASE_URL = "https://freshscope-bend-1.onrender.com/api/articles/news"; // Replace with your API URL

const AddNewsPage = () => {
  // State for holding the list of news
  const [newsList, setNewsList] = useState([]);

  // State for holding the new news input text
  const [newNews, setNewNews] = useState("");

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch news from the backend
  const fetchNews = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setNewsList(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewNews(e.target.value);
  };

  // Handle adding news to the list and backend
  const handleAddNews = async () => {
    if (newNews.trim()) {
      try {
        const response = await axios.post(API_BASE_URL, { content: newNews });
        setNewsList([...newsList, response.data]); // Add new news to the list
        setNewNews(""); // Clear input after adding
      } catch (error) {
        console.error("Error adding news:", error);
      }
    }
  };

  // Handle deleting news from the list and backend
  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      const updatedList = newsList.filter((news) => news._id !== id);
      setNewsList(updatedList); // Remove news from list after deletion
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="add-news-page">
      <h1>Add News</h1>

      {/* Form to add news */}
      <div className="news-form">
        <input
          type="text"
          value={newNews}
          onChange={handleInputChange}
          placeholder="Enter news"
        />
        <button onClick={handleAddNews}>Add News</button>
      </div>

      {/* List of news */}
      <div className="news-list">
        <ul>
          {newsList.map((news) => (
            <li key={news._id} className="news-item">
              <p>{news.content}</p>
              <button onClick={() => handleDeleteNews(news._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddNewsPage;
