import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HomeOutlined,
    CalendarOutlined,
    ScheduleOutlined,
    DollarOutlined,
    SettingOutlined
} from '@ant-design/icons';

import AppDashboard from './dashboard.js'

const Home = () => {
    const navigate = useNavigate();
    const [signout, setSignout] = useState(false);

    useEffect(() => {
        const companyId = localStorage.getItem('compid');
        if (!companyId) {
            navigate("/app");
        }
    }, [navigate, signout]);

    const onSetSignout = () => {
        clearLocalStorage();
        setSignout(true);
    }
    const clearLocalStorage = () => {
        localStorage.removeItem('compid');
        localStorage.removeItem('userid');
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
                    break;
                }          
            default: { break }
        }
    }, [activeTab]);

    let displayedContent;
    if (activeTab === 'Dashboard') {
        displayedContent =
            <AppDashboard
            />;
    } 

    return (
        <div className="flex flex-col h-screen bg-gray-50  justify-between">
            {/* Content Area */}
            <div className="p-4 overflow-y-auto">
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-semibold text-gray-700"
                    >
                        {displayedContent}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Tab Bar */}
            <div className=" bg-white flex justify-between px-4 py-2 relative">
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