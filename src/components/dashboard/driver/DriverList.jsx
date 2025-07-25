import { getDrivers } from "@/services/driverService";

import { Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import DriverCard from "./DriverCard";

const DriverList = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [driversData, setDriversData] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const drivers = await getDrivers();
                // console.log("Drivers fetched:", drivers);
                setDriversData(drivers);
            } catch (error) {
                // console.error("Error fetching drivers:", error);
                setErrorMessage(
                    "Failed to fetch drivers. Please try again later."
                );
            }
        };

        fetchDrivers();

        const timeoutId = setTimeout(() => {}, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div>
            {driversData.length > 0 ? (
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="3"
                >
                    {driversData.map((driver, index) => {
                        return (
                            <DriverCard data={driver} key={`driver-${index}`} />
                        );
                    })}
                </Grid>
            ) : (
                <Text>No drivers found.</Text>
            )}
        </div>
    );
};

export default DriverList;
