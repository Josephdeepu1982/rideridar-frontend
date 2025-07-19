import BookingList from "./booking/BookingList";

const Bookings = () => {
    return (
        <div>
            {/* Booking list and card components can be imported and used here */}
            {/* Example: <BookingList /> <BookingCard /> */}
            <h1>Bookings Page</h1>
            <p>View bookings below</p>
            <BookingList />
        </div>
    );
};

export default Bookings;
