// reference : https://chakra-templates.vercel.app/navigation/sidebar

"use client";
import { useDisclosure } from "@chakra-ui/hooks";
import NavItem from "./navigation/NavigationItem";

import {
    IconButton,
    Avatar,
    Box,
    Button,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    Text,
    Drawer,
    Menu,
} from "@chakra-ui/react";

import { useColorModeValue } from "@/components/ui/color-mode";

import {
    FaHome,
    FaRegCalendarAlt,
    FaRegAddressCard,
    FaRegUser,
    FaBars,
    FaAngleDown,
} from "react-icons/fa";
import UserProfileMenu from "./navigation/UserProfileMenu";

const LinkItems = [
    { name: "Overview", icon: FaHome },
    { name: "Bookings", icon: FaRegCalendarAlt },
    { name: "Drivers", icon: FaRegAddressCard },
    { name: "My Account", icon: FaRegUser },
];

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="0.3s ease"
            bg={useColorModeValue("white", "gray.800")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.600")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    className="logo"
                    fontSize="2xl"
                    fontWeight="bold"
                    color={useColorModeValue("gray.800", "white")}
                >
                    Ridevanta
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                    color={useColorModeValue("gray.600", "gray.300")}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

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
