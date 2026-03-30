import {  Modal } from "antd";
import { useEffect, useState } from "react";

function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}

const NetworkBanner = () => {
    const isOnline = useNetworkStatus();

    if (isOnline) return null;

    return (
        <Modal
            open={true}
            closable={false}
            maskClosable={false}
            keyboard={false}
            footer={null}
            centered
            styles={{
                content: {
                    background: "transparent",
                    boxShadow: "none",
                    padding: 0
                }
            }}
        >
            <div className="flex items-center justify-center">
                <div className="bg-slate-700 text-white rounded-2xl p-6 w-[300px] text-center shadow-xl">

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="text-cyan-400 text-5xl">
                            📡❌
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold mb-2">Whoops</h2>

                    {/* Message */}
                    <p className="text-sm text-gray-200 mb-6">
                        No Internet connection found <br /><br />
                        Check your connection.
                    </p>

                </div>
            </div>
        </Modal>
    );
};

export default NetworkBanner;

