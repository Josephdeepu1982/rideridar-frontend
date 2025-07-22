import React, { useState } from "react";
import "../../CSS/booking/TabBookingForm.css";
import { useNavigate } from "react-router-dom";

const TabBookingForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("airport");
  const [airportFormData, setAirportFormData] = useState({
    flightNumber: "",
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
  });

  const [localFormData, setLocalFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
  });

  const handleAirportChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAirportFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleLocalChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLocalFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formDataToSend;
    let ridePurpose;

    if (activeTab === "airport") {
      formDataToSend = airportFormData;
      ridePurpose = "airport";
    } else {
      formDataToSend = localFormData;
      ridePurpose = "local";
    }
    //passing data to the car selection page.
    navigate("/car-selection", {
      state: {
        ...formDataToSend,
        ridePurpose: ridePurpose,
      },
    });
    console.log(`Form submitted ${activeTab}:`, formDataToSend);

    //send to backend
  };

  return (
    <div className="tab-booking-form">
      <div className="tab-header">
        <button
          className={activeTab === "airport" ? "active" : ""}
          onClick={() => setActiveTab("airport")}
        >
          Airport Transfer
        </button>
        <button
          className={activeTab === "local" ? "active" : ""}
          onClick={() => setActiveTab("local")}
        >
          Local Ride
        </button>
      </div>
      <form className="tab-form" onSubmit={handleSubmit}>
        {activeTab === "airport" && (
          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={airportFormData.flightNumber}
              onChange={handleAirportChange}
              placeholder="e.g. SQ123"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={
              activeTab === "airport"
                ? airportFormData.pickupLocation
                : localFormData.pickupLocation
            }
            onChange={
              activeTab === "airport" ? handleAirportChange : handleLocalChange
            }
            placeholder="e.g. Terminal 1"
            required
          />
        </div>

        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={
              activeTab === "airport"
                ? airportFormData.destination
                : localFormData.destination
            }
            onChange={
              activeTab === "airport" ? handleAirportChange : handleLocalChange
            }
            placeholder="e.g. Marina Bay Sands Hotel"
            required
          />
        </div>
        <div className="form-group-grouped">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={
                activeTab === "airport"
                  ? airportFormData.date
                  : localFormData.date
              }
              onChange={
                activeTab === "airport"
                  ? handleAirportChange
                  : handleLocalChange
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={
                activeTab === "airport"
                  ? airportFormData.time
                  : localFormData.time
              }
              onChange={
                activeTab === "airport"
                  ? handleAirportChange
                  : handleLocalChange
              }
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Continue to Car Selection
        </button>
      </form>
    </div>
  );
};

export default TabBookingForm;
