import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import Header from "../pages/HomePage/header";
import useAlert from "../common/alert";
import SaveData from "../hook/saveData";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Footer from "../pages/HomePage/footer";

const ProtectedLayout = () => {
    const { logout } = useAuth();
    const { pathname } = useLocation();
    const { contextHolder, success, error } = useAlert();
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    const saveData = async ({ label, method, endPoint, id = null, body = null, notify = true, logs = true, email = false }) => {

        setIsLoading(true)
        const res = await SaveData({
            label: label,
            method: method,
            endPoint: endPoint,
            id: id,
            body: body,
            notify: notify,
            logs: logs,
            email: email
        })
        setIsLoading(false)

        if (res.isSuccess) { success(res.message); setRefresh(refresh + 1); }
        else error(res.message)
    }

    return (
        <div class='min-h-screen w-full flex flex-col  '>
            <Header />

            <main class="flex-1 px-8 scroll-auto">
                <Outlet context={{ saveData, isLoading, setIsLoading, refresh }} />
            </main>

            {pathname !== '/home' && <Footer/>}

            {isLoading &&
                <div
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

            {contextHolder}
        </div>
    );
};

export default ProtectedLayout;