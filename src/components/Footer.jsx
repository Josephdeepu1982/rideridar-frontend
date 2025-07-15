import React from "react";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="brand">Riderridar</h3>
          <p className="tagline">
            Premium chauffeur services for discerning executives in Singapore
          </p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="?">Airport Transfers</a>
            </li>
            <li>
              <a href="?">Corporate Events</a>
            </li>
            <li>
              <a href="?">City Tours</a>
            </li>
            <li>
              <a href="?">Personal Travel</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            Marina Bay Financial Centre
            <br />
            Singapore 018983
          </p>
          <p>Email: contact@rideridar.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Rideridar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
