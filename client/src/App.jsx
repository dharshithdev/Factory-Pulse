import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machine";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/machines" element={<Machines />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;