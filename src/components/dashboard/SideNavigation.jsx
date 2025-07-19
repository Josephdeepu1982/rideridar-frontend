// reference : https://chakra-templates.vercel.app/navigation/sidebar

"use client";
import { useDisclosure } from "@chakra-ui/hooks";
import UserProfileMenu from "./navigation/UserProfileMenu";
import SidebarContent from "./navigation/SidebarContent";

import { Box, Text, Drawer } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const SideNavigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
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
                <UserProfileMenu onOpen={onOpen} />
                <Box
                    ml={{ base: 0, md: 60 }}
                    p="4"
                    bg={useColorModeValue("white", "gray.800")}
                    minH="calc(100vh - 80px)"
                    color={useColorModeValue("gray.800", "white")}
                >
                    <Text>Main page</Text>
                </Box>
            </Box>
        </>
    );
};

export default SideNavigation;
