import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Ridevanta</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
