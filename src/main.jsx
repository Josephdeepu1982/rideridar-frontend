import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider>
            <UserProvider>
                <App />
            </UserProvider>
        </Provider>
    </StrictMode>
);
