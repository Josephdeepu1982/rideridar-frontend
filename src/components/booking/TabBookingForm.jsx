
import React, { useState } from "react";
import "../../assets/css/booking/TabBookingForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const TabBookingForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("airport");
  //Controls which form is shown: "airport" or "local".

  //States to manage input for "airport" and "local"
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

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const fetchSuggestions = async (query, setSuggestions) => {
    if (query.length < 3) return;

    const encodedQuery = encodeURIComponent(query);
    const authToken = import.meta.env.VITE_ONEMAP_AUTH_TOKEN;
    const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodedQuery}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await res.json();
      console.log("OneMap response:", data);

      if (data.results && data.results.length > 0) {
        setSuggestions(data.results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  };

  //event hanldlers for "airport" & "local"
  const handleAirportChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    //extracts name ("flightNumber") and value {"SQ123"} from event
    //copies the exisitng form data and add in the specific field that changed [name]: value
    setAirportFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });

    if (name === "pickupLocation") {
      fetchSuggestions(value, setPickupSuggestions);
    } else if (name === "destination") {
      fetchSuggestions(value, setDestinationSuggestions);
    }
  };

  const handleLocalChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLocalFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });

    if (name === "pickupLocation") {
      fetchSuggestions(value, setPickupSuggestions);
    } else if (name === "destination") {
      fetchSuggestions(value, setDestinationSuggestions);
    }
  };

  //determines which form data to send based on active tab
  const handleSubmit = (event) => {
    event.preventDefault();

    let formDataToSend;
    let ridePurpose;

    if (activeTab === "airport") {
      formDataToSend = airportFormData;
      ridePurpose = "airport";
      //ridepurpose lets subsequent pages know "airport" or "local"
    } else {
      formDataToSend = localFormData;
      ridePurpose = "local";
    }
    //passing data to the car selection page.
    //state: { ... } Passes data to the destination route using React Router's location.state.
    navigate("/car-selection", {
      state: {
        ...formDataToSend,
        ridePurpose: ridePurpose,
      },
    });
    console.log(`Form submitted ${activeTab}:`, formDataToSend);
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

        {/* value toggles between "airport" and "local" using terenary operator for active tab */}
        <div className="form-group">
          <label>Pickup Location</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="pickupLocation"
              value={
                activeTab === "airport"
                  ? airportFormData.pickupLocation
                  : localFormData.pickupLocation
              }
              onChange={
                activeTab === "airport"
                  ? handleAirportChange
                  : handleLocalChange
              }
              placeholder="e.g. Terminal 1"
              required
            />
            <ul className="suggestions-list">
              {pickupSuggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const selected = item.ADDRESS;
                    if (activeTab === "airport") {
                      setAirportFormData((prev) => ({
                        ...prev,
                        pickupLocation: selected,
                      }));
                    } else {
                      setLocalFormData((prev) => ({
                        ...prev,
                        pickupLocation: selected,
                      }));
                    }
                    setPickupSuggestions([]);
                  }}
                >
                  {item.ADDRESS}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label>Destination</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="destination"
              value={
                activeTab === "airport"
                  ? airportFormData.destination
                  : localFormData.destination
              }
              onChange={
                activeTab === "airport"
                  ? handleAirportChange
                  : handleLocalChange
              }
              placeholder="e.g. Marina Bay Sands Hotel"
              required
            />
            <ul className="suggestions-list">
              {destinationSuggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const selected = item.ADDRESS;
                    if (activeTab === "airport") {
                      setAirportFormData((prev) => ({
                        ...prev,
                        destination: selected,
                      }));
                    } else {
                      setLocalFormData((prev) => ({
                        ...prev,
                        destination: selected,
                      }));
                    }
                    setDestinationSuggestions([]);
                  }}
                >
                  {item.ADDRESS}
                </li>
              ))}
            </ul>
          </div>
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

