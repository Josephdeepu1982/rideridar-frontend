import { Heading } from "@chakra-ui/react";

import BookingList from "./booking/BookingList";

const Bookings = () => {
    return (
        <>
            {/* Booking list and card components can be imported and used here */}
            <Heading as="h1" textAlign="left" color="white" mb={5}>
                Bookings List
            </Heading>
            <BookingList />
        </>
    );
};

export default Bookings;
