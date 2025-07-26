const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/booking`;

const getBookings = async () => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, - to add token for later
            },
        });

        const data = await res.json();

        if (data) {
            // console.log(data);
            return data; // returns the bookings array
        }
    } catch (err) {
        // console.log(err);
        throw new Error("Failed to fetch bookings");
    }
};

const getBookingById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch booking");
        }

        const data = await res.json();
        // console.log("Booking data:", data);
        return data; // returns the booking object
    } catch (err) {
        // console.log(err);
        throw new Error("Failed to fetch booking by ID");
    }
};

const assignDriverToBooking = async (bookingId, driverId) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookingId}/assign-driver`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ driverId }),
        });

        if (!res.ok) {
            throw new Error(
                `Failed to assign driver: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();
        // console.log("Updated booking data:", data);
        return data;
    } catch (err) {
        // console.error("Error assigning driver:", err);
        throw new Error("Failed to assign driver");
    }
};

export { getBookings, getBookingById, assignDriverToBooking };
