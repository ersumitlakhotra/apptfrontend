// src/components/ProtectedRoute.js
import {  Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
