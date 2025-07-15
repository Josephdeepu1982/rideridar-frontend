import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">Rideridar</Link>
                </div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/booking">Book Now</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
