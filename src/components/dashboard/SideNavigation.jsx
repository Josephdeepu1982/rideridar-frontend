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
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiMenu,
    FiChevronDown,
} from "react-icons/fi";

const LinkItems = [
    { name: "Overview", icon: FiHome },
    { name: "Bookings", icon: FiTrendingUp },
    { name: "Drivers", icon: FiCompass },
    { name: "My Account", icon: FiStar },
];

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="0.3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
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
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
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
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
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
                                        <Text fontSize="sm">Justina Clark</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            Admin
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </Button>
                        </Menu.Trigger>

                        <Menu.Content
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
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
    // https://www.reactuse.com/state/usedisclosure/
    // useDisclosure is a custom hook that manages the open/close state of a component, typically used for modals or drawers.
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
                <Box ml={{ base: 0, md: 60 }} p="4">
                    {/* Content */}
                </Box>
            </Box>
        </>
    );
};

export default SideNavigation;
