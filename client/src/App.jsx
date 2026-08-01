import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machine";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alert";
import socket from "./socket/socket";
import { useEffect } from "react";

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/machines" element={<Machines />}/>
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/alerts" element={<Alerts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;