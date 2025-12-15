import { Navigate } from "react-router-dom";
import { getAuth } from "../app/auth.js";

export default function ProtectedRoute({ children }) {
    const { isAuthed } = getAuth();

    if (!isAuthed) {
        return <Navigate to="/" replace />;
    }

    return children;
}
