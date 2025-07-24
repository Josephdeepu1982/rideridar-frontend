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

export { getBookings };
