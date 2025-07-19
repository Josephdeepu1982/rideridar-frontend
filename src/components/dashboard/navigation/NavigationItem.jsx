import { Box, Flex, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const NavigationItem = ({ icon, children, ...rest }) => {
    return (
        <Box
            as="a"
            href="#"
            textDecoration="none"
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color={useColorModeValue("gray.600", "gray.300")}
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
                        color={useColorModeValue("gray.600", "gray.300")}
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};

export default NavigationItem;
