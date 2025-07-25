import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/booking/BookingDetails.css";
import { useState } from "react";

const BookingDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const bookingData = location.state || {}; //Retrives data passed from the previous page (ride type, car selection, booking info)
    const isAirportTransfer = bookingData.tripData.ridePurpose === "airport"; //Determines whether the booking is for an airport transfer (ridePurpose is defined in TabBookingForm) and conditoanlly show airport specific fields (Flight number, terminal, gate).

    // console.log("Booking Data:", bookingData);
    // console.log("Ride Purpose:", bookingData.ridePurpose);

    //modal is a type of popup window that appears on top of main content
    //when user clicks the link the showTerms Modal is 'true' and the modal is rendered.
    const [showTermsModal, setShowTermsModal] = useState(false);
    const openTermsModal = () => {
        setShowTermsModal(true);
    };
    const closeTermsModal = () => {
        setShowTermsModal(false);
    };

    //state to store user input
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        paxNumber: "1",
        bookingForOthers: false,
        guestName: "",
        guestPhone: "",
        flightNumber: bookingData.flightNumber || "",
        terminal: "",
        gate: "",
        luggageNumber: "0",
        gatePickup: false,
        specialRequests: "",
        depositTerms: false,
        generalTerms: false,
    });

    const paxArray = [1, 2, 3, 4, 5, 6, 7];
    const luggageArray = [0, 1, 2, 3, 4, 5];

    //updates formData state
    const handleChange = (event) => {
        const name = event.target.name;
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value; //as our onChange handler is reused for all inputs, .checked gives true or false for checkboxes && .value gives text/numeric values for other inputs.

        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    //form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        //combines previous bookingdata with new user input (formData)
        const finalBooking = {
            ...bookingData,
            contact: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
            },
            paxNumber: parseInt(formData.paxNumber), //converts string to a number for Mongoose schema
            specialRequests: formData.specialRequests,
            agreement: {
                isDepositTncChecked: formData.depositTerms,
                isAdminTncChecked: formData.generalTerms,
            },
        };
        //conditonal data
        if (formData.bookingForOthers) {
            finalBooking.guest = {
                name: formData.guestName,
                phone: formData.guestPhone,
            };
        }
        //conditional data for airport
        if (isAirportTransfer) {
            finalBooking.flight = {
                number: formData.flightNumber,
                terminal: formData.terminal,
                gate: formData.gate,
                luggageNumber: parseInt(formData.luggageNumber),
                isGatePickupRequested: formData.gatePickup,
            };
        }
        // console.log("Final booking submitted:", finalBooking);
        navigate("/booking-review", {
            state: finalBooking, //passes all booking data to final page
        });
    };

    return (
        <div className="booking-details-container">
            <h2>Booking Details</h2>
            <form className="booking-details-form" onSubmit={handleSubmit}>
                <h3>Contact Information</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number*</label>
                        <input
                            type="tel" // "tel" is an HTML input type for telephone numbers.
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Whatsapp number"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Passengers*</label>
                        <select
                            name="paxNumber"
                            value={formData.paxNumber}
                            onChange={handleChange}
                            required
                        >
                            {paxArray.map((num) => {
                                return (
                                    <option key={num} value={num}>
                                        {num} Pax
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="bookingForOthers"
                        name="bookingForOthers"
                        checked={formData.bookingForOthers}
                        onChange={handleChange}
                    />
                    <label htmlFor="bookingForOthers">
                        Booking for someone else?
                    </label>
                </div>
                {/* If checked, reveals additional fields: Guest Name &Guest Contact */}
                {formData.bookingForOthers && (
                    <>
                        <div className="guest-card">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Guest Name</label>
                                    <input
                                        type="text"
                                        name="guestName"
                                        value={formData.guestName}
                                        onChange={handleChange}
                                        placeholder="Guest's Full Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Guest Contact</label>
                                    <input
                                        type="text"
                                        name="guestPhone"
                                        value={formData.guestPhone}
                                        onChange={handleChange}
                                        placeholder="+65 8123 4567"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* only shown if ride is airport transfer => isAirportTRansfer is true */}
                {isAirportTransfer && (
                    <>
                        <div className="guest-card">
                            <h3>Flight Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Flight Number</label>
                                    <input
                                        type="text"
                                        name="flightNumber"
                                        value={formData.flightNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Terminal</label>
                                    <input
                                        type="text"
                                        name="terminal"
                                        value={formData.terminal}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gate</label>
                                    <input
                                        type="text"
                                        name="gate"
                                        value={formData.gate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Number of Luggage</label>
                                    <select
                                        name="luggageNumber"
                                        value={formData.luggageNumber}
                                        onChange={handleChange}
                                    >
                                        {luggageArray.map((num) => {
                                            return (
                                                <option key={num} value={num}>
                                                    {num} pieces
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="checkbox-group">
                                    <input
                                        id="gatePickup"
                                        type="checkbox"
                                        name="gatePickup"
                                        checked={formData.gatePickup}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="gatePickup">
                                        Gate Pickup / Meet & Greet
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-group full-width">
                    <label>Special Requests</label>
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                    ></textarea>
                </div>

                <div className="terms-section">
                    <div className=" checkbox-group">
                        <input
                            type="checkbox"
                            id="depositTerms"
                            name="depositTerms"
                            checked={formData.depositTerms}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="depositTerms">
                            I agree to the 30% deposit policy.
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="generalTerms"
                            name="generalTerms"
                            checked={formData.generalTerms}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="generalTerms">
                            I agree to the{" "}
                            <span
                                className="terms-link"
                                onClick={openTermsModal}
                            >
                                general terms and conditions
                            </span>
                        </label>
                    </div>
                    {showTermsModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-content">
                                    <h3>General Terms & Conditions</h3>
                                    <ul>
                                        <li>
                                            <strong>
                                                Booking and Cancellation Policy:
                                            </strong>
                                            <br />
                                            - 50% deposit required to confirm
                                            booking.
                                            <br />- Cancellations within 24
                                            hours result in forfeiture of
                                            deposit. Full refund if cancelled
                                            more than 24 hours before pickup.
                                        </li>

                                        <li>
                                            <strong>
                                                Airport Pickup Policy:
                                            </strong>
                                            <br />- Driver will wait up to 60
                                            minutes after actual landing time.
                                            Additional waiting: SGD 20 per 30
                                            minutes.
                                        </li>

                                        <li>
                                            <strong>
                                                Meet & Greet Service:
                                            </strong>
                                            <br />- Available for SGD 30 extra.
                                            Driver meets at arrival gate with a
                                            name sign.
                                        </li>

                                        <li>
                                            <strong>Luggage Policy:</strong>
                                            <br />- Each vehicle has a specified
                                            luggage capacity. Extra luggage may
                                            incur additional charges.
                                        </li>

                                        <li>
                                            <strong>Payment:</strong>
                                            <br />- Remaining balance must be
                                            paid before journey start. Accepted:
                                            Cash, PayNow, Bank Transfer.
                                        </li>

                                        <li>
                                            <strong>Liability:</strong>
                                            <br />
                                            -Ridevanta is not liable for delays
                                            due to traffic, weather, or
                                            unforeseen events.
                                        </li>
                                    </ul>
                                    <button
                                        onClick={closeTermsModal}
                                        className="modal-close"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button onClick={() => navigate(-1)} className="back-btn">
                        Back
                    </button>
                    <button type="submit" className="submit-button">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingDetails;
