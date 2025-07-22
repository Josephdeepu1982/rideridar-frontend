import { Heading } from "@chakra-ui/react";
import DriverList from "./driver/DriverList";

const Drivers = () => {
    return (
        <>
            <Heading as="h1" textAlign="left" mb={5}>
                Drivers List
            </Heading>
            {/* Additional components or content related to drivers can be added here */}
            <DriverList />
        </>
    );
};

export default Drivers;
