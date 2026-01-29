
import { getToken, onMessage } from "firebase/messaging";
import { messaging} from "../firebase.js";

// This function will request permission and get FCM token
export const initNotification=async (registration)=> {
    try {
        
        if (requestPermission()) {
         const token = await getToken(messaging, {
                vapidKey: "BE0_FiNfC14nhWlVxNiG36JJKdXq2PquIaYVFiNQK06IDS83tP35_wpjW12cYHLyiqUGC0HCWU11hUBiLcvMxJ4",
                serviceWorkerRegistration: registration,
            });
            console.log("FCM Token:", token);
        }
        // 👉 Send this token to your backend
    } catch (err) {
        console.error("Push init failed:", err);
    }

    // Optional: Listen to messages in foreground
    onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);
        alert(payload.notification.title);
    });
}

export async function requestPermission() {
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;

    const permission = await Notification.requestPermission();
    return permission === "granted";
}