import { createListCollection } from "@chakra-ui/react";

// create vehicle type collection for Select
export const vehicleTypes = createListCollection({
    items: [
        { label: "Sedan", value: "sedan" },
        { label: "MPV", value: "mpv" },
        { label: "Luxury", value: "luxury" },
    ],
});
