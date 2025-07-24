import React, { useEffect, useState } from "react";
import "../../assets/css/booking/Confirmation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const bookingData = location.state || {}; //Retrieves the full booking object passed from the review page.

  const pin = bookingData.confirmationPin;

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmed</h2>
      <p>Thankyou for choosing Ridevanta</p>
      <div className="reference-box">
        <h4>Your 4-digit Confirmation PIN:</h4>
        <p className="ref-number">{pin}</p>

        <div className="next-steps">
          <strong>What happens next:</strong>
          <ol>
            <li>Our admin will contact you via WhatsApp within 1-2 hours</li>
            <li>A booking fee (deposit) will be requested</li>
            <li>Once payment is received, your booking will be confirmed</li>
            <li>You'll receive driver details before your scheduled pickup</li>
          </ol>
        </div>
      </div>

      <div className="button-row">
        <Link to="/" className="return-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
