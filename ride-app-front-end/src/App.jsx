import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Header from "./components/booking/Header";
import Footer from "./components/booking/Footer";
import LandingPage from "./components/booking/LandingPage";
import TabBookingForm from "./components/booking/TabBookingForm";
import Confirmation from "./components/booking/Confirmation";
import CarSelection from "./components/booking/CarSelection";
import BookingDetails from "./components/booking/BookingDetails";
import BookingReview from "./components/booking/BookingReview";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<TabBookingForm />} />
          <Route path="/car-selection" element={<CarSelection />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/booking-review" element={<BookingReview />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
