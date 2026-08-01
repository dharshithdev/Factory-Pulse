import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { admin, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

export default ProtectedRoute;