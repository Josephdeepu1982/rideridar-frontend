const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const signIn = async (formData) => {
    try {
        const url = `${BASE_URL}/${formData.userType}/login`;
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to login");
        }

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            return JSON.parse(atob(data.token.split(".")[1])).payload;
        }

        throw new Error("Invalid response from server.");
    } catch (err) {
        throw new Error("Failed to reach server.");
    }
};

const signOut = async (userData) => {
    try {
        const token = localStorage.getItem("token");

        const url = `${BASE_URL}/${userData.userType}/logout`;
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to logout");
        }

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error("Failed to reach server.");
    }
};

export { signIn, signOut };
