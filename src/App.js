import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './admin';
import Navbar from './navbar';  // The Navbar component we created earlier
import AddNewsPage from "./news"; // Import the AddNewsPage component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Include Navbar in your App */}
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/news" element={<AddNewsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
