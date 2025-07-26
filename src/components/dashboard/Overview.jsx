import { Heading } from "@chakra-ui/react";
import OverviewLayout from "./overview/OverviewLayout";

const Overview = () => {
    // console.log("Overview component is rendering"); // Debug log
    return (
        <>
            <Heading as="h1" textAlign="left" color="white" mb={5}>
                Overview
            </Heading>
            {/* Additional components or content related to the overview can be added here */}
            <OverviewLayout />
        </>
    );
};

export default Overview;
