import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

import TabBookingForm from "./components/booking/TabBookingForm";
import CarSelection from "./components/booking/CarSelection";
import BookingDetails from "./components/booking/BookingDetails";
import BookingReview from "./components/booking/BookingReview";
import Confirmation from "./components/booking/Confirmation";
import BookingStatus from "./components/booking/BookingStatus";

import Dashboard from "./components/dashboard/Dashboard";
import Overview from "./components/dashboard/Overview";
import Bookings from "./components/dashboard/Bookings";
import Drivers from "./components/dashboard/Drivers";
import Account from "./components/dashboard/Account";
import DriverDetail from "./components/dashboard/driver/DriverDetail";

const Layout = ({ children }) => {
    const location = useLocation();

    // don't show header and footer on the dashboard
    const hideHeaderFooter = location.pathname.startsWith("/dashboard");

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
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/booking" element={<TabBookingForm />} />
                    <Route path="/car-selection" element={<CarSelection />} />
                    <Route
                        path="/booking-details"
                        element={<BookingDetails />}
                    />
                    <Route path="/booking-review" element={<BookingReview />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/booking-status" element={<BookingStatus />} />

                    {/* Dashboard routes with nested structure */}
                    <Route path="/dashboard" element={<Dashboard />}>
                        {/* Default dashboard route - redirects to overview */}
                        <Route
                            index
                            element={<Navigate to="overview" replace />}
                        />
                        <Route path="overview" element={<Overview />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="drivers" element={<Drivers />} />
                        <Route path="drivers/:id" element={<DriverDetail />} />
                        <Route path="my-account" element={<Account />} />
                    </Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
