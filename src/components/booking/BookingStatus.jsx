import React, { useState } from "react";
import "../../assets/css/booking/BookingStatus.css";

const BookingStatus = () => {
  const [pin, setPin] = useState("");
  const [booking, setBooking] = useState(null); //stores the booking data if a booking is found.
  const [error, setError] = useState(""); //stores any error messages (invalid PIN, server issue, etc.).

  const handleCheckStatus = async () => {
    try {
      const res = await fetch(`http://localhost:3000/book/status/${pin}`); //fetches data from backend using pin
      const data = await res.json();
      if (res.ok) {
        setBooking(data);
        setError(""); //If successful, it updates the booking state and clears errors.
      } else {
        setError(data.message || "Booking not found");
      }
    } catch (error) {
      setError("Server error. Try again later");
    }
  };

  return (
    <div className="booking-status-wrapper">
      <div className="booking-status-container">
        <h2>Check your booking status</h2>
        <input
          type="text"
          value={pin}
          onChange={(event) => {
            setPin(event.target.value);
          }}
          maxLength={4}
          placeholder="Enter 4-digit PIN"
        />
        <button onClick={handleCheckStatus}>Check Status</button>

        {error && <p className="error">{error}</p>}

        {booking && (
          <div className="status-details">
            <h3>Status: {booking.status}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingStatus;
