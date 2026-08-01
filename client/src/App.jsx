import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machine";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alert";

function App() {
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