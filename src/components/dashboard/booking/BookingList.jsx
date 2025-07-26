import { getBookings } from "@/services/bookingService";

import { Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BookingCard from "./BookingCard";

const BookingList = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookings = await getBookings();
                // console.log("Bookings fetched:", bookings);
                setBookingsData(bookings);
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
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="3"
                >
                    {bookingsData.map((booking, index) => {
                        return (
                            <BookingCard
                                data={booking}
                                index={index}
                                key={`booking-${index}`}
                            />
                        );
                    })}
                </Grid>
            ) : (
                <Text>No bookings found.</Text>
            )}
        </div>
    );
};

export default BookingList;
