import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machine";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alert";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import socket from "./socket/socket";
import Home from "./pages/Home";


function App() {

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };

    }, []);

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/home"
                element={<Home />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/machines"
                element={
                    <ProtectedRoute>
                        <Machines />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/alerts"
                element={
                    <ProtectedRoute>
                        <Alerts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}

export default App;