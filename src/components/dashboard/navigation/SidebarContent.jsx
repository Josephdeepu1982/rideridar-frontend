import { Link } from "react-router-dom";

import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import NavigationItem from "./NavigationItem";

import { navigationItems } from "./navigationConfig";

// onCLose prop needed when in mobile view to close the sidebar
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
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Text
                        className="logo"
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.800", "white")}
                        cursor="pointer"
                        _hover={{ opacity: 0.8 }}
                    >
                        Ridevanta
                    </Text>
                </Link>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                    color={useColorModeValue("gray.600", "gray.300")}
                />
            </Flex>
            {navigationItems.map((link) => (
                <NavigationItem
                    key={link.name}
                    icon={link.icon}
                    route={link.route}
                    onClick={onClose}
                >
                    {link.name}
                </NavigationItem>
            ))}
        </Box>
    );
};

export default SidebarContent;
