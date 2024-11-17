import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to create a separate CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/admin" className="navbar-item">
          Admin
        </Link>
        <Link to="/news" className="navbar-item">
          News bar
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
