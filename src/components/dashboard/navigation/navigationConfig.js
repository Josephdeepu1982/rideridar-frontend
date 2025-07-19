// components/navigation/navigationConfig.js
import {
    FaHome,
    FaRegCalendarAlt,
    FaRegAddressCard,
    FaRegUser,
} from "react-icons/fa";
import { href } from "react-router-dom";

export const navigationItems = [
    { name: "Overview", icon: FaHome },
    { name: "Bookings", icon: FaRegCalendarAlt },
    { name: "Drivers", icon: FaRegAddressCard },
    { name: "My Account", icon: FaRegUser },
];

export const userProfileItems = [
    { name: "Profile", href: "" },
    { name: "Settings", href: "" },
];
