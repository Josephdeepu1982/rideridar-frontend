import { createListCollection } from "@chakra-ui/react";

// create vehicle type collection for Select
export const userTypes = createListCollection({
    items: [
        { label: "Driver", value: "driver" },
        { label: "Admin", value: "admin" },
    ],
});
