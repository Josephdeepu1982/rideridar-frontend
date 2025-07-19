import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text, Drawer } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import SidebarContent from "./navigation/SidebarContent";
import MobileNavigation from "./navigation/MobileNavigation";

const SidebarNavigation = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
            <SidebarContent
                onClose={onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer.Root
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <Drawer.Content>
                    <SidebarContent onClose={onClose} />
                </Drawer.Content>
            </Drawer.Root>
            <MobileNavigation onOpen={onOpen} />
            <Box
                ml={{ base: 0, md: 60 }}
                p="4"
                bg={useColorModeValue("white", "gray.800")}
                minH="calc(100vh - 80px)"
                color={useColorModeValue("gray.800", "white")}
            >
                {children || <Text>Main page</Text>}
            </Box>
        </Box>
    );
};

export default SidebarNavigation;
