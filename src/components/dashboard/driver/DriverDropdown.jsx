import { useState } from "react";
import { Select } from "@chakra-ui/react";

import { getFilteredDrivers } from "@/services/driverService";

const DriverDropdown = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);

    const fetchAvailableDrivers = async () => {
        try {
            const data = await getFilteredDrivers(null, "active");
            setDrivers(data.data || data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await getBookingById(id);
                setBooking(data);

                // Fetch drivers if no driver assigned
                if (!data.driver) {
                    await fetchAvailableDrivers();
                }
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };

        fetchBooking();
        // ... rest of useEffect
    }, [id]);
};
