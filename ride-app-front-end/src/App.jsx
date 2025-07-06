// src/App.jsx

const App = () => {
  return <h1>Hello world!</h1>;
};

export default App;
App.jsx Ridar

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import BookingForm from "./components/BookingForm";
import Confirmation from "./components/Confirmation";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

