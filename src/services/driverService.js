const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/driver`;

const getDrivers = async () => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (data) {
            return data; // returns the drivers array
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch drivers");
    }
};

export { getDrivers };
