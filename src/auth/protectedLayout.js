import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/HomePage/header";
import useAlert from "../common/alert";
import SaveData from "../hook/saveData";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Footer from "../pages/HomePage/footer";
import { useEmail } from "../email/email";
import { initNotification } from "../Firebase/requestPermission";

const ProtectedLayout = () => {
    const { pathname } = useLocation();
    const { contextHolder, success, error, notifications } = useAlert();
    const {sendEmail} = useEmail()
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [refreshNotifications, setRefreshNotifications] = useState(0);
   
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);     
    
    useEffect(() => {
         if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js")
                .then(registration => initNotification(registration,saveData,onNotification))
            .catch(console.error);
         };
    }, []);
    
    const onNotification = ({ title, body }) => {
         setRefresh(refresh + 1);
        notifications({ title: `${title} Appointment`, description: body })
    }

    const saveData = async ({ label, method, endPoint, id = null, body = null, notify = true, logs = true, email = false, status = null, userList = [], servicesList =[]}) => {
        setIsLoading(true)
        const res = await SaveData({
            label: label,
            method: method,
            endPoint: endPoint,
            id: id,
            body: body
        })
        if (email)
            sendEmail({ id: id, status: status, userList: userList, servicesList: servicesList })        
        setIsLoading(false)

        if (res.isSuccess) { 
           notify && success(res.message); 
            setRefresh(refresh + 1); }
        else 
             notify && error(res.message)
    }

    return (
        <div class='min-h-screen w-full flex flex-col  '>
            <Header saveData={saveData} refresh={refresh}  />

            <main class="flex-1 px-2 md:px-8 scroll-auto">
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