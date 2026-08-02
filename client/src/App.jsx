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
import NotFound from "./pages/404";
import Settings from "./pages/Settings";
import Production from "./pages/Production";
import System from "./pages/System";

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
                path="/"
                element={<Home />}
            />

            <Route
                path="/dashboard"
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
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/production"
                element={
                    <ProtectedRoute>
                        <Production />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/system"
                element={
                    <ProtectedRoute>
                        <System />
                    </ProtectedRoute>
                }
            />
            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;