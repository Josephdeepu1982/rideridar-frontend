import {
    Avatar,
    Box,
    Button,
    HStack,
    VStack,
    Text,
    Menu,
    Portal,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaAngleDown } from "react-icons/fa";
import { userProfileItems } from "./navigationConfig";

const UserProfileMenu = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: "none" }}
                    bg="transparent"
                    color={useColorModeValue("gray.600", "gray.300")}
                    _hover={{
                        bg: useColorModeValue("gray.100", "gray.700"),
                    }}
                >
                    <HStack>
                        <Avatar.Root size={"sm"}>
                            <Avatar.Image src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
                        </Avatar.Root>
                        <VStack
                            display={{ base: "none", md: "flex" }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2"
                        >
                            <Text
                                fontSize="sm"
                                color={useColorModeValue("gray.800", "white")}
                            >
                                Tester Name
                            </Text>
                            <Text
                                fontSize="xs"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Admin
                            </Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                            <FaAngleDown />
                        </Box>
                    </HStack>
                </Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content
                        bg={useColorModeValue("white", "gray.800")}
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                        color={useColorModeValue("gray.800", "white")}
                        // placement="bottom-end"
                        // offset={[0, 8]}
                    >
                        <Menu.ItemGroup>
                            {userProfileItems.map((link) => (
                                <Menu.Item
                                    key={link.href}
                                    asChild
                                    value={link.name}
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.name}
                                    </a>
                                </Menu.Item>
                            ))}
                        </Menu.ItemGroup>
                        <Menu.Separator />
                        <Menu.ItemGroup>
                            <Menu.Item value="signout">Sign Out</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default UserProfileMenu;
