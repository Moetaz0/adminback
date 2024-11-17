import React, { useState, useEffect } from "react";
import axios from "axios"; // Install axios: npm install axios
import "./AdminPage.css";

const API_BASE_URL = "https://freshscope-bend-1.onrender.com/api/articles"; // Replace with your API base URL

const AdminPage = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    categorie: "",
    nomauteur: "",
    content: "",
    imageUrl: "",
    isPopular: false,
    inSlide: false,
    isLie: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update article
        await axios.put(`${API_BASE_URL}/${editingId}`, formData);
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new article
        await axios.post(API_BASE_URL, formData);
      }
      fetchArticles();
      setFormData({
        title: "",
        categorie: "",
        nomauteur: "",
        content: "",
        imageUrl: "",
        isPopular: false,
        inSlide: false,
        isLie: false,
      });
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    setFormData({
      title: articleToEdit.title,
      categorie: articleToEdit.categorie,
      nomauteur: articleToEdit.nomauteur,
      content: articleToEdit.content,
      imageUrl: articleToEdit.imageUrl,
      isPopular: articleToEdit.isPopular,
        inSlide: articleToEdit.inSlide,
        isLie: articleToEdit.isLie,
    });
    setIsEditing(true);
    setEditingId(id);
  };

  return (
    <div className="admin-container">
      <h2>Admin - Manage Articles</h2>

      <form onSubmit={handleSubmit} className="article-form">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categorie"
          value={formData.categorie}
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nomauteur"
          value={formData.nomauteur}
          placeholder="Author"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          placeholder="Content"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <label>
          Is Popular
          <input
            type="checkbox"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
          />
        </label>
        <label>
          Is in Slide
          <input
            type="checkbox"
            name="inSlide"
            checked={formData.inSlide}
            onChange={handleChange}
          />
        </label>
        <label>
          Is Lie
          <input
            type="checkbox"
            name="inLie"
            checked={formData.isLie}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          {isEditing ? "Update Article" : "Add Article"}
        </button>
      </form>

      <div className="articles-list">
        <h3>Articles</h3>
        <ul>
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              <h4>{article.title}</h4>
              <p>
                {article.categorie} | By {article.nomauteur} |{" "}
                {article.dateAdded}
              </p>
              <p>{article.content}</p>
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-image"
              />
              <div>
                <button onClick={() => handleEdit(article._id)}>Edit</button>
                <button onClick={() => handleDelete(article._id)}>Delete</button>
              </div>
              <p>
                {article.isPopular
                  ? "This article is popular!"
                  : "This article is not popular."}
              </p>
              <p>
                {article.inSlide
                  ? "This article is in slide!"
                  : "This article is not in slide."}
              </p>
              <p>
                {article.isLie
                  ? "This article is Lie!"
                  : "This article is Lie."}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
