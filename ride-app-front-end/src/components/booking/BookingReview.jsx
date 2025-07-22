import React from "react";
import "../../CSS/booking/BookingReview.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../../services/rideService";

const BookingReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state || {}; //saves booking data passed from the previous page using navigate() function

  const handleConfirmation = async () => {
    try {
      const createBooking = await createBooking(booking);
      console.log("Booking created!", createBooking);
      navigate("/confirmation", { state: savedBooking });
    } catch (error) {
      alert("There was an error saving your booking. Please try again");
    }
  };

  const handleBack = () => {
    navigate("/booking-details", { state: booking }); //go back to BookingDetails
  };

  return (
    <div className="booking-review-container">
      <h2>Review Your Booking</h2>
      <div className="review-section">
        <h3>Trip Details</h3>
        <p>
          <strong>Pickup:</strong> {booking.tripData?.pickupLocation}
        </p>
        <p>
          <strong>Destination:</strong> {booking.tripData?.destination}
        </p>
        <p>
          <strong>Date:</strong> {booking.tripData?.date}
        </p>
        <p>
          <strong>Time:</strong> {booking.tripData?.time}
        </p>
        <p>
          <strong>Vehicle:</strong> {booking.vehicleDetails?.name}
        </p>
      </div>

      <div className="review-section">
        <h3>Contact</h3>
        <p>
          <strong>Name:</strong> {booking.contact?.name}
        </p>
        <p>
          <strong>Phone:</strong> {booking.contact?.phone}
        </p>
        <p>
          <strong>Email:</strong> {booking.contact?.email}
        </p>
        <p>
          <strong>Passengers:</strong> {booking.paxNumber}
        </p>
      </div>

      {booking.guest && ( //If booking.guest is truthy, then React renders the content inside the parentheses.
        <div className="review-section">
          <h3>Guest Info</h3>
          <p>
            <strong>Name:</strong> {booking.guest.name}
          </p>
          <p>
            <strong>Phone:</strong> {booking.guest.phone}
          </p>
        </div>
      )}

      {booking.flight && (
        <div className="review-section">
          <h3>Flight Info</h3>
          <p>
            <strong>Flight No:</strong> {booking.flight.number}
          </p>
          <p>
            <strong>Terminal:</strong> {booking.flight.terminal}
          </p>
          <p>
            <strong>Gate:</strong> {booking.flight.gate}
          </p>
          <p>
            <strong>Luggage:</strong> {booking.flight.lugaggeNumber}
          </p>
          <p>
            <strong>Gate Pickup:</strong>{" "}
            {booking.flight.isGatePickupRequested ? "Yes" : "No"}
          </p>
        </div>
      )}
      <div className="review-section">
        <h3>Special Requests</h3>
        <p>{booking.specialRequests || "None"}</p>
      </div>

      <div className="button-row">
        <button onClick={handleBack} className="back-btn">
          Back
        </button>
        <button onClick={handleConfirmation} className="confirm-btn">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingReview;
