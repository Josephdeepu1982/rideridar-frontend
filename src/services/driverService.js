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
        // console.log(err);
        throw new Error("Failed to fetch drivers");
    }
};

const getDriverById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch driver");
        }

        const data = await res.json();
        console.log("Driver data:", data);
        return data; // returns the driver object
    } catch (err) {
        // console.log(err);
        throw new Error("Failed to fetch driver by ID");
    }
};

const addDriver = async (driverData) => {
    // console.log("Driver data form: ", driverData);
    try {
        const res = await fetch(`${BASE_URL}/register`, {
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
        // console.log(err);
        throw new Error("Failed to add driver");
    }
};

const getFilteredDrivers = async (type, status) => {
    try {
        // build query parameters array
        const queryParams = [];

        if (type) {
            queryParams.push(`type=${encodeURIComponent(type)}`);
        }

        if (status) {
            queryParams.push(`status=${encodeURIComponent(status)}`);
        }

        // construct URL - only add ? if there are query params
        const queryString =
            queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
        const url = `${BASE_URL}/filter${queryString}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(
                `Failed to fetch drivers: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();
        // console.log("Filtered drivers data:", data);
        return data;
    } catch (err) {
        console.error("Error fetching filtered drivers:", err);
        throw new Error("Failed to fetch filtered drivers");
    }
};

export { getDrivers, getDriverById, addDriver, getFilteredDrivers };
