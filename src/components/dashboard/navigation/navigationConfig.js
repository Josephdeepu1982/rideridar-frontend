// components/navigation/navigationConfig.js
import {
    FaHome,
    FaRegCalendarAlt,
    FaRegAddressCard,
    FaRegUser,
} from "react-icons/fa";

export const getNavigationItems = (userType) => {
    const items = [
        { name: "Overview", icon: FaHome, route: "/dashboard/overview" },
        {
            name: "Bookings",
            icon: FaRegCalendarAlt,
            route: "/dashboard/bookings",
        },
        { name: "My Account", icon: FaRegUser, route: "/dashboard/my-account" },
    ];

    // Add "Drivers" only if admin
    if (userType === "admin") {
        items.splice(2, 0, {
            name: "Drivers",
            icon: FaRegAddressCard,
            route: "/dashboard/drivers",
        });
    }

    return items;
};

export const userProfileItems = [
    { name: "Profile", href: "/dashboard/my-account" },
    // { name: "Settings", href: "" },
];
