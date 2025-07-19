// components/navigation/navigationConfig.js
import {
    FaHome,
    FaRegCalendarAlt,
    FaRegAddressCard,
    FaRegUser,
} from "react-icons/fa";

export const navigationItems = [
    { name: "Overview", icon: FaHome, route: "/dashboard" },
    { name: "Bookings", icon: FaRegCalendarAlt, route: "/dashboard/bookings" },
    { name: "Drivers", icon: FaRegAddressCard, route: "/dashboard/drivers" },
    { name: "My Account", icon: FaRegUser, route: "/dashboard/my-account" },
];

export const userProfileItems = [
    { name: "Profile", href: "" },
    { name: "Settings", href: "" },
];
