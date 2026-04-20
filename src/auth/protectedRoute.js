// src/components/ProtectedRoute.js
import {  Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const routePermissions = {
    "/calender": "tasks",
    "/appointment": "order",
    "/event": "event",
    "/customers": "customer",
    "/services": "services",
    "/users": "users",
    "/schedule": "schedule",
    "/reports": "sales",
    "/setting":"setting"
};

const publicRoutes = ["/home","/help", "/scanQR"];

const ProtectedRoute = () => {
    const { isAuthenticated, permissions, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading ) {
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


    if (!isAuthenticated) return <Navigate to="login" replace />;; // prevent rendering

     const currentPath = location.pathname;

    // ✅ Skip permission check
    if (publicRoutes.includes(currentPath)) {
        return <Outlet />;
    }

    const requiredPermission = routePermissions[currentPath];

    if (
        requiredPermission &&
        !permissions.includes(requiredPermission)
    ) { return <Navigate to="/404" replace />;}
       
    
   //  if (requiredPermission && !permission.includes(requiredPermission)) {
    //   return <Navigate to="/404" replace />;
    //}

    return <Outlet/> ;
};

export default ProtectedRoute;
