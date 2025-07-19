import { Link, useLocation } from "react-router-dom";

import { Flex, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const NavigationItem = ({ icon, children, route, onClick, ...rest }) => {
    const location = useLocation();
    const isActive = location.pathname === route;

    const activeColor = useColorModeValue("cyan.400", "cyan.300");
    const inactiveColor = useColorModeValue("gray.600", "gray.300");
    const activeBg = useColorModeValue("cyan.50", "cyan.900");

    return (
        <Link to={route} style={{ textDecoration: "none" }} onClick={onClick}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? activeColor : inactiveColor}
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        color={isActive ? activeColor : inactiveColor}
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default NavigationItem;
