// src/components/ProtectedRoute.js
import {  Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import AppIconsPermission from "../common/custom/appIconsPermission";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const { apps } = AppIconsPermission();
    const { pathname } = useLocation();

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

    const allowed = apps.find(item => item.navigate ===pathname)

    if (!allowed.isVisible) {
        return <Navigate to="/404" replace />;
  }

    return <Outlet/> ;
};

export default ProtectedRoute;
