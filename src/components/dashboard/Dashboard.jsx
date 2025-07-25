import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "@/contexts/UserContext";

import Navigation from "./Navigation";
import Login from "./Login";

const Dashboard = () => {
    const login = true;
    const { user } = useContext(UserContext);

    return (
        <>
            {user ? (
                <Navigation>
                    {/* This will render matching child route */}
                    <Outlet />
                </Navigation>
            ) : (
                <Login />
            )}
        </>
    );
};

export default Dashboard;
