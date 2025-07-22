import React, { useState } from "react";
import "../../assets/css/booking/CarSelection.css";
import { useLocation, useNavigate } from "react-router-dom";
import sedanImage from "../../assets/images/booking/BMW7.png";
import mpvImage from "../../assets/images/booking/Alphard.png";
import luxurySedanImage from "../../assets/images/booking/BMW7.png";

const CarSelection = () => {
    const location = useLocation(); //tells us where we are in the app
    const navigate = useNavigate(); //helps us navigate to and from other pages

    const [selectedCar, setSelectedCar] = useState(null);

    const bookingData = location.state || {}; //saves booking data passed from the previous page using navigate() function

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

    const handleCarSelect = (id) => {
        setSelectedCar(id);
    };

    const handleSubmit = () => {
        if (!selectedCar) {
            return;
        }
        const selectedCarDetails = carOptions.find((carOption) => {
            return carOption.id === selectedCar;
        });

        navigate("/booking-details", {
            state: {
                vehicleType: selectedCar,
                vehicleDetails: selectedCarDetails,
                tripData: bookingData,
            },
        });
    };

    const handleBack = () => {
        navigate("/booking");
    };

    return (
        <div className="car-selection-container">
            <h2>Select Your Vehicle</h2>
            <div className="car-grid">
                {carOptions.map((carOption) => {
                    return (
                        <div
                            key={carOption.id}
                            className={
                                selectedCar === carOption.id
                                    ? "car-card selected"
                                    : "car-card"
                            } //hihglights card once card is selected
                            onClick={() => handleCarSelect(carOption.id)} //updates the selectedCar state to remember which car was chosen.
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
            <div>
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
