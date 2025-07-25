import { useState } from "react";
import {
    Button,
    Stack,
    Text,
    Input,
    Field,
    Select,
    VStack,
    InputGroup,
} from "@chakra-ui/react";
import { withMask } from "use-mask-input";

import { vehicleTypes } from "./driverConfig";
import { passwordGenerator } from "../utils/passwordGenerator";
import { addDriver } from "@/services/driverService";

const DriverForm = ({ newDriverData, setNewDriverData, onSuccess }) => {
    // add loading and error states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        let cleanedValue = value;

        if (name === "phone") {
            // remove all non-numeric characters (hyphens, spaces, etc.)
            cleanedValue = value.replace(/\D/g, "");
        }

        // handle nested vehicle object
        if (name.includes("vehicle.")) {
            const vehicleProperty = name.split(".")[1];
            setNewDriverData({
                ...newDriverData,
                vehicle: {
                    ...newDriverData.vehicle,
                    [vehicleProperty]: cleanedValue,
                },
            });
        } else {
            setNewDriverData({
                ...newDriverData,
                [name]: cleanedValue,
            });
        }

        // clear error when user starts typing
        if (submitError) setSubmitError(null);
    };

    const handleSubmit = async (event) => {
        // stopping the default form submission action
        event.preventDefault();

        // prevent multiple submissions
        if (isSubmitting) return;

        // clear any previous error
        setSubmitError(null);

        // do not store empty input or whitespace
        if (
            !newDriverData.phone?.trim() ||
            !newDriverData.email?.trim() ||
            !newDriverData.vehicle?.plateNumber?.trim() ||
            !newDriverData.vehicle?.vehicleType?.trim()
        ) {
            setSubmitError("Please fill in all required fields");
            return;
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newDriverData.email)) {
            setSubmitError("Please enter a valid email address");
            return;
        }

        // set the current submit state after previous checks
        setIsSubmitting(true);

        try {
            const response = await addDriver({
                ...newDriverData,
                password: passwordGenerator(),
            });

            if (response.ok) {
                // handle successful driver creation
                console.log("Driver created successfully.");

                // reset form after successful submission
                setNewDriverData({
                    name: "",
                    phone: "",
                    email: "",
                    vehicle: {
                        plateNumber: "",
                        model: "",
                        vehicleType: "sedan",
                    },
                });

                // close modal and show success message
                if (onSuccess) onSuccess();
                alert("Driver added successfully!");
            } else {
                // set the error message received from server
                setSubmitError("Failed to create driver");
            }
        } catch (err) {
            // handle unexpected errors
            setSubmitError(err.message || "An unexpected error occurred");
        } finally {
            // once all cases are handled
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack p={0} align="stretch" gap={3}>
                {/* Driver Name */}
                <Field.Root p={0} required>
                    <Field.Label label="Driver Name" color="white" mb={0}>
                        Full Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        name="name"
                        value={newDriverData.name || ""}
                        onChange={handleInputChange}
                        placeholder="Enter driver's full name"
                    />
                </Field.Root>

                {/* Phone Number */}
                <Field.Root p={0} required>
                    <Field.Label label="Phone Number" color="white" mb={0}>
                        Phone Number <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startAddon="+65">
                        <Input
                            name="phone"
                            type="tel"
                            value={newDriverData.phone || ""}
                            onChange={handleInputChange}
                            placeholder="9999-9999"
                            ref={withMask("9999-9999")}
                        />
                    </InputGroup>
                </Field.Root>

                {/* Email */}
                <Field.Root p={0} required>
                    <Field.Label label="Email Address" color="white" mb={0}>
                        Email Address <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        name="email"
                        type="email"
                        value={newDriverData.email || ""}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                    />
                    <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>

                {/* Vehicle Details Section */}
                <Stack gap={3}>
                    <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        mt={10}
                        color={"palegoldenrod"}
                    >
                        Vehicle Details
                    </Text>

                    {/* Plate Number */}
                    <Field.Root p={0} required>
                        <Field.Label label="Plate Number" color="white" mb={0}>
                            Plate Number <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="vehicle.plateNumber"
                            value={newDriverData.vehicle?.plateNumber || ""}
                            onChange={handleInputChange}
                            placeholder="Enter vehicle plate number"
                        />
                    </Field.Root>

                    {/* Vehicle Model */}
                    <Field.Root p={0} required>
                        <Field.Label label="Vehicle Model" color="white" mb={0}>
                            Vehicle Model <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="vehicle.model"
                            value={newDriverData.vehicle?.model || ""}
                            onChange={handleInputChange}
                            placeholder="Enter vehicle model (e.g., Toyota Camry)"
                        />
                    </Field.Root>

                    {/* Vehicle Type */}
                    <Field.Root required>
                        <Field.Label label="Vehicle Type" color="white" mb={0}>
                            Vehicle Type <Field.RequiredIndicator />
                        </Field.Label>
                        <Select.Root
                            collection={vehicleTypes}
                            m={0}
                            value={[newDriverData.vehicle?.vehicleType || ""]}
                            onValueChange={(details) => {
                                const event = {
                                    target: {
                                        name: "vehicle.vehicleType",
                                        value: details.value[0] || "",
                                    },
                                };
                                handleInputChange(event);
                            }}
                        >
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger
                                    bg="whiteAlpha.100"
                                    color="white"
                                >
                                    <Select.ValueText placeholder="Select vehicle type" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                                <Select.Content>
                                    {vehicleTypes.items.map((type) => (
                                        <Select.Item
                                            item={type}
                                            key={type.value}
                                        >
                                            {type.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Root>
                    </Field.Root>
                </Stack>

                {/* Submit Button */}
                <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText="Adding Driver..."
                    mt={4}
                >
                    Add Driver
                </Button>

                {/* Error message */}
                {submitError && (
                    <Text color="red.500" textAlign="center">
                        {submitError}
                    </Text>
                )}
            </VStack>
        </form>
    );
};

export default DriverForm;
