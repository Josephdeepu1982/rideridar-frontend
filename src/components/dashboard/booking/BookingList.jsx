import { getBookings } from "@/services/bookingService";
import { useEffect, useState } from "react";

const BookingList = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [bookingsData, setbookingsData] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookings = await getBookings();
                console.log("Bookings fetched:", bookings);
                setbookingsData(bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setErrorMessage(
                    "Failed to fetch bookings. Please try again later."
                );
            }
        };

        fetchBookings();

        const timeoutId = setTimeout(() => {}, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div>
            {bookingsData.length > 0 ? (
                <div>
                    {bookingsData.map((booking, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <p>Booking ID: Temorary ID {index}</p>
                                <p>Ride: {booking.trip.vehicleType}</p>
                                <p>Status: {booking.status}</p>
                                {/* Add more booking details as needed */}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>No bookings found</div>
            )}
        </div>
    );
};

export default BookingList;
