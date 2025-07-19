// reference : https://chakra-templates.vercel.app/navigation/sidebar

"use client";
import { useDisclosure } from "@chakra-ui/hooks";

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

const NavItem = ({ icon, children, ...rest }) => {
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

const MobileNav = ({ onOpen, ...rest }) => {
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

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                                bg="transparent"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.300"
                                )}
                                _hover={{
                                    bg: useColorModeValue(
                                        "gray.100",
                                        "gray.700"
                                    ),
                                }}
                            >
                                <HStack>
                                    <Avatar.Root size={"sm"}>
                                        <Avatar.Image
                                            src={
                                                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                            }
                                        />
                                    </Avatar.Root>
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text
                                            fontSize="sm"
                                            color={useColorModeValue(
                                                "gray.800",
                                                "white"
                                            )}
                                        >
                                            Justina Clark
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

                        <Menu.Content
                            bg={useColorModeValue("white", "gray.800")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.600"
                            )}
                            color={useColorModeValue("gray.800", "white")}
                            placement="bottom-end"
                            offset={[0, 8]}
                        >
                            <Menu.Item>Profile</Menu.Item>
                            <Menu.Item>Settings</Menu.Item>
                            <Menu.Item>Billing</Menu.Item>
                            <Menu.Separator />
                            <Menu.Item>Sign out</Menu.Item>
                        </Menu.Content>
                    </Menu.Root>
                </Flex>
            </HStack>
        </Flex>
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
                <MobileNav onOpen={onOpen} />
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
