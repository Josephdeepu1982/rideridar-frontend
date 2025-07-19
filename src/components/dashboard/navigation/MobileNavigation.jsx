import { useLocation } from "react-router-dom";

import { Flex, IconButton, Text, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaBars } from "react-icons/fa";

import UserProfileMenu from "./UserProfileMenu";
import { navigationItems } from "./navigationConfig";

const MobileNavigation = ({ onOpen, ...rest }) => {
    const location = useLocation();

    // Find current page name based on route
    const getCurrentPageName = () => {
        const currentItem = navigationItems.find(
            (item) => item.route === location.pathname
        );
        return currentItem?.name || "Dashboard";
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.600")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FaBars />}
                color={useColorModeValue("gray.600", "gray.300")}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                className="logo"
                color={useColorModeValue("gray.800", "white")}
            >
                Ridevanta
            </Text>

            {/* Show current page name on desktop */}
            <Text
                display={{ base: "none", md: "block" }}
                fontSize="lg"
                fontWeight="medium"
                color={useColorModeValue("gray.800", "white")}
            >
                {getCurrentPageName()}
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <UserProfileMenu />
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNavigation;
