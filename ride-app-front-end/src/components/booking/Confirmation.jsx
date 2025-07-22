import React, { useEffect, useState } from "react";
import "../../CSS/booking/Confirmation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const Navigation = useNavigate();
  const bookingData = location.state || {};

  const [referenceNumber, setReferenceNumber] = useState("");

  //generate a refernce number when loaded
  useEffect(() => {
    const generateRef = () => {
      const timestamp = Date.now().toString().slice(-4); //Gets the current timestamp in milliseconds and slices the last 4 digits.
      const initials = bookingData.contact?.name
        ? bookingData.contact.name
            .split(" ")
            .map((n) => n[0])
            .join("")
        : "XX"; //Extracts initials from the contact’s name (e.g., "Jane Doe" → JD).
      return `RV-${initials.toUpperCase()}-${timestamp}`;
    };
    setReferenceNumber(generateRef());
  }, []);

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmed</h2>
      <p>Thankyou for choosing Ridevanta</p>
      <div className="reference-box">
        <h4>Your Reference Number:</h4>
        <p className="ref-number">{referenceNumber}</p>

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
