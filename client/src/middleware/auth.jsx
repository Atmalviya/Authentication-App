import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizedUser = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Please login first");
        return <Navigate to="/" replace={true} />;
    }
    return children;
};

export const ProtectedRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;

    if (!username) {
        return <Navigate to="/" replace={true} />;
    }
    return children;
}