import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HomeOutlined,
    CalendarOutlined,
    ScheduleOutlined,
    DollarOutlined,
    SettingOutlined,
    LoadingOutlined
} from '@ant-design/icons';

import AppDashboard from './dashboard.js'
import { apiCalls } from "../../hook/apiCall.js";
import { Spin } from "antd";
import AppBooking from "./bookings.js";

const Home = () => {
    const navigate = useNavigate();
    const [signout, setSignout] = useState(false);
    const [cid, setCid] = useState(0);
    const [uid, setUid] = useState(0);

    const [refresh, setRefresh] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const companyId = localStorage.getItem('companyId');
        setCid(companyId);
        setUid(localStorage.getItem('userId'));
        if (!companyId) {
            navigate("/app");
        }
    }, [navigate, signout]); 
    
    useEffect(() => {
        if(uid > 0)
        {
            getData(setUserList,"user");
        }
    }, [uid]);

    const onSetSignout = () => {
        clearLocalStorage();
        setSignout(true);
    }
    const clearLocalStorage = () => {
        localStorage.removeItem('companyId');
        localStorage.removeItem('userId');
    }

    const getData = async (setList, endPoint,eventDate = false) => {
        setIsLoading(true);
        try {
            const companyId = localStorage.getItem('companyId');
            const userId = localStorage.getItem('userId'); 
            const res = await apiCalls("GET", endPoint, companyId, userId, null, eventDate);
            setList(res.data.data);
        }
        catch (e) {
            setList([])
            //error(error.message)
        }
        setIsLoading(false);
    }

    const tabs = [
        { name: "Dashboard", icon: HomeOutlined },
        { name: "Bookings", icon: CalendarOutlined },
        { name: "Schedule", icon: ScheduleOutlined },
        { name: "Salary", icon: DollarOutlined },
        { name: "Profile", icon: SettingOutlined },
    ];


    const [activeTab, setActiveTab] = useState("Dashboard");

    useEffect(() => {
        switch (activeTab) {
            case "Dashboard":
                {
                    getData(setOrderList, "order/user");
                    break;
                }
            case "Bookings":
                {
                    getData(setOrderList, "order/user");
                    break;
                }          
            default: { break }
        }
    }, [activeTab]);

    let displayedContent;
    if (activeTab === 'Dashboard') {
        displayedContent =
            <AppDashboard 
                signout={onSetSignout}
                orderList={orderList}
                userList={userList}
            />;
    } else if (activeTab === 'Bookings') {
        displayedContent =
            <AppBooking
                signout={onSetSignout}
                orderList={orderList}
                userList={userList}
            />;
    } else if (activeTab === 'Schedule') {
        displayedContent = '';
    } else if (activeTab === 'Salary') {
        displayedContent = '';
    } else if (activeTab === 'Profile') {
        displayedContent ='';
    }

    return (
        <div className="flex flex-col h-screen justify-between bg-gray-50  ">
            {/* Content Area */}
            <div className="overflow-y-auto">
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-semibold text-gray-700"
                    >
                        {isLoading ? (
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
                        ) :
                            displayedContent
                        }
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Tab Bar */}
            <div className="bg-white flex justify-between px-4 py-2 relative">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.name;
                    return (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className="flex-1 flex flex-col items-center justify-center relative py-2 focus:outline-none"
                        >
                            <Icon
                                className={`h-6 w-6 p-1  ${isActive ? "text-blue-500" : "text-gray-400"}`}
                            />
                            
                            <span className={`text-xs mt-1 ${isActive ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                                {tab.name}
                            </span>

                            {/* Animated underline indicator */}
                            {isActive && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute bottom-0 left-1/4 right-1/4 h-0.5  bg-blue-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default Home;