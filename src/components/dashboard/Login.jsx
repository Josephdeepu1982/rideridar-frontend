import { Link } from "react-router-dom";
import { Box, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

import LoginForm from "./login/LoginForm";

const Login = () => {
    return (
        <Box
            transition="0.3s ease"
            bg={useColorModeValue("white", "gray.800")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.600")}
            w="full"
            h="full"
            pos="fixed"
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
            </Flex>
            <Flex
                direction={"column"}
                w={{ base: "80%", md: "auto" }}
                h={"80vh"}
                textAlign={"center"}
                placeSelf={"center"}
                justifyContent={"center"}
            >
                <Heading as="h1" color={"palegoldenrod"} mb={"50px"}>
                    Welcome to Ridevanta Dashboard
                </Heading>
                <LoginForm />
                <Text color={"gray.500"} mt={5}>
                    For account creation, please reach out to admin@example.com
                    separately.
                </Text>
            </Flex>
        </Box>
    );
};

export default Login;
