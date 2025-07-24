import { useState } from "react";
import { Heading, Button, Dialog, Portal, CloseButton } from "@chakra-ui/react";
import DriverList from "./driver/DriverList";
import DriverForm from "./driver/DriverForm"; 

const Drivers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDriverData, setNewDriverData] = useState({
        name: "",
        phone: "",
        email: "",
        vehicle: {
            plateNumber: "",
            model: "",
            vehicleType: "sedan", // default value
        },
    });

    const handleAddDriverClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form data when closing modal
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
    };

    return (
        <>
            <Heading as="h1" textAlign="left" color="white" mb={5}>
                Drivers List
            </Heading>

            {/* Add Driver Button with Modal */}
            <Dialog.Root
                open={isModalOpen}
                onOpenChange={(e) => setIsModalOpen(e.open)}
            >
                <Dialog.Trigger asChild>
                    <Button
                        onClick={handleAddDriverClick}
                        colorScheme="blue"
                        mb={4}
                    >
                        Add Driver
                    </Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW="600px" color="white">
                            <Dialog.Header>
                                <Dialog.Title as="h3">Add New Driver</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <DriverForm
                                    newDriverData={newDriverData}
                                    setNewDriverData={setNewDriverData}
                                    onSuccess={handleCloseModal}
                                />
                            </Dialog.Body>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            <DriverList />
        </>
    );
};

export default Drivers;
