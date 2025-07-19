import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Dashboard = () => {
    return (
        <Navigation>
            {/* This will render matching child route */}
            <Outlet />
        </Navigation>
    );
};

export default Dashboard;
