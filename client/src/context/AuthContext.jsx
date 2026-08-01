import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedAdmin = localStorage.getItem("admin");

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }

        setLoading(false);

    }, []);

    const login = (adminData, token) => {

        localStorage.setItem("token", token);
        localStorage.setItem(
            "admin",
            JSON.stringify(adminData)
        );

        socket.connect();

        setAdmin(adminData);

    };

    const logout = () => {

        socket.disconnect();

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        setAdmin(null);

    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);