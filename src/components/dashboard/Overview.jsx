import { Heading } from "@chakra-ui/react";

const Overview = () => {
    // console.log("Overview component is rendering"); // Debug log
    return (
        <>
            <Heading as="h1" textAlign="left" mb={5}>
                Overview
            </Heading>
            {/* Additional components or content related to the overview can be added here */}
        </>
    );
};

export default Overview;
