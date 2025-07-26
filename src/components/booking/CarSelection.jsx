import React, { useState } from "react";
import "../../assets/css/booking/CarSelection.css";
import { useLocation, useNavigate } from "react-router-dom";
import sedanImage from "../../assets/images/booking/BMW5.jpg";
import mpvImage from "../../assets/images/booking/Alphard.png";
import luxurySedanImage from "../../assets/images/booking/BMW7.png";

const CarSelection = () => {
    const location = useLocation(); // Retrieves data passed from the previous page
    const navigate = useNavigate(); //helps us navigate to and from other pages

    const [selectedCar, setSelectedCar] = useState(null); //tracks which car the user selects

    const bookingData = location.state || {}; //saves booking data passed from the previous page

    const carOptions = [
        {
            id: "sedan",
            name: "Business Class Sedan",
            seats: 3,
            luggage: 2,
            image: sedanImage,
            description: "Comfortable sedan with professional driver",
        },
        {
            id: "mpv",
            name: "Business Multi Purpose Vehicle",
            seats: 5,
            luggage: 4,
            image: mpvImage,
            description: "Spacious MPV for groups or families",
        },
        {
            id: "luxury",
            name: "First Class Luxury Limousine",
            seats: 3,
            luggage: 2,
            image: luxurySedanImage,
            description: "Premium luxury ride with chauffeur",
        },
    ];

    //Updates the selected car state when a user clicks a card.
    const handleCarSelect = (id) => {
        setSelectedCar(id);
    };

    const handleSubmit = () => {
        if (!selectedCar) {
            return;
        }
        //searched carOptions array for the car id that was selected
        const selectedCarDetails = carOptions.find((carOption) => {
            return carOption.id === selectedCar;
        });

        //navigates to next page passing the vehicle type (id), vehicle details and original booking data
        navigate("/booking-details", {
            state: {
                vehicleType: selectedCar,
                vehicleDetails: selectedCarDetails, //the vehicle object
                tripData: bookingData,
            },
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="car-selection-container">
            <h2>Select Your Vehicle</h2>

            {/* displays each car as a clickable card. highlights the selected card with a special CSS class */}
            <div className="car-grid">
                {carOptions.map((carOption) => {
                    return (
                        <div
                            key={carOption.id}
                            className={
                                selectedCar === carOption.id
                                    ? "car-card selected"
                                    : "car-card"
                                //highlights card once card is selected
                            }
                            onClick={() => handleCarSelect(carOption.id)} //updates the selectedCar state to the car that was chosen.
                        >
                            <img
                                src={carOption.image}
                                alt={carOption.name}
                                className="car-image"
                            />
                            <h3>{carOption.name}</h3>
                            <p>{carOption.description}</p>
                            <div className="car-specs">
                                <span>👥 {carOption.seats} seats</span>
                                <span>🧳 {carOption.luggage} luggage</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="car-selection-btn">
                <button onClick={handleBack} className="back-btn">
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="next-btn"
                    disabled={selectedCar === null}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CarSelection;
