import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import TabBookingForm from "./components/booking/TabBookingForm";
import Confirmation from "./components/booking/Confirmation";
import CarSelection from "./components/booking/CarSelection";
import BookingDetails from "./components/booking/BookingDetails";
import BookingReview from "./components/booking/BookingReview";
import Dashboard from "./components/dashboard/Dashboard";

const Layout = ({ children }) => {
    const location = useLocation();

    // don't show header and footer on the dashboard
    const hideHeaderFooter = location.pathname === "/dashboard";

    return (
        <div>
            {!hideHeaderFooter && <Header />}
            {children}
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <div>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/booking" element={<TabBookingForm />} />
                        <Route
                            path="/car-selection"
                            element={<CarSelection />}
                        />
                        <Route
                            path="/booking-details"
                            element={<BookingDetails />}
                        />
                        <Route
                            path="/booking-review"
                            element={<BookingReview />}
                        />
                        <Route
                            path="/confirmation"
                            element={<Confirmation />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
