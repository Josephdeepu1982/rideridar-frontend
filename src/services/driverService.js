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

const addDriver = async (driverData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(driverData),
        });
        const data = await res.json();
        if (data) {
            return { ok: res.ok, data }; // returns the newly created driver and the response
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add driver");
    }
};

export { getDrivers, addDriver };
