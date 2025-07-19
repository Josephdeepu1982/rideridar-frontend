import React from "react";
import { Link } from "react-router-dom";
import "../CSS/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-overlay">
          <h1>
            Executive Rides, <span>Reimagined.</span>
          </h1>
          <p>Submit your exclusive ride request. We'll handle the rest. </p>
          <Link to="/booking" className="cta-btn">
            Request a Ride
          </Link>
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">Premium Services</h2>
        <div className="services">
          <div className="service-card">
            <h3>Airport Transfers</h3>
            <p>Seamless door-to-door service with meet & greet options.</p>
          </div>
          <div className="service-card">
            <h3>Corporate Events</h3>
            <p>
              Professional chauffeur service for meetings, conferences, and
              business events.
            </p>
          </div>
          <div className="service-card">
            <h3>City Tours</h3>
            <p>
              Curated luxury experiences showcasing Singapore's finest
              destinations.
            </p>
          </div>
        </div>
      </section>

      <section className="fleet-section">
        <h2 className="section-title">Luxury Fleet</h2>
        <p className="fleet-intro">
          Select from our curated collection of premium vehicles, each
          maintained to the highest standards.
        </p>
        <div className="fleet-cards">
          <div className="fleet-card">
            <h3>Luxury Sedan</h3>
            <h4>Executive Sedan</h4>
            <p>
              Premium comfort for executive guests. Ideal for business meetings
              and airport transfers.
            </p>
            <div className="fleet-meta">
              <span>3 Passengers</span>
              <Link to="/booking" className="reserve-btn">
                Reserve
              </Link>
            </div>
          </div>

          <div className="fleet-card">
            <h3>Luxury Limousine</h3>
            <h4>luxury multi-purpose vehicle</h4>
            <p>
              The ultimate in luxury transportation. Featuring premium amenities
              and dedicated service.
            </p>
            <div className="fleet-meta">
              <span>6 Passengers</span>
              <Link to="/booking" className="reserve-btn">
                Reserve
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
