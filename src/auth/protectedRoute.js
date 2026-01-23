// src/components/ProtectedRoute.js
import {  Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // Ensure it's on top
            }}
        >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet/> ;
};

export default ProtectedRoute;
