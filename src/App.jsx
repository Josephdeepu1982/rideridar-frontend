import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/booking/Footer";
import LandingPage from "./components/booking/LandingPage";
import Confirmation from "./components/booking/Confirmation";
// import TabBookingForm from "./components/booking/TabBookingForm";
// import CarSelection from "./components/booking/CarSelection";
// import BookingDetails from "./components/booking/BookingDetails";
// import BookingReview from "./components/booking/BookingReview";
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
