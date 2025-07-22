import React from "react";
import TabBookingForm from "../booking/TabBookingForm";
import "../../CSS/booking/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-hero">
      <div className="landing-content">
        <div className="hero-text">
          <h1>Premium Ride Service in Singapore</h1>
          <p>
            Experience the ultimate in comfort and style with our exclusive
            private transportation service. <br />
            Professional drivers, luxury vehicles, and exceptional service.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>
{/* imports the TabBookingForm  */}
        <div className="hero-form">
          <TabBookingForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

