/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {  Tabs } from "antd";
import { customLabelTab, getTabItems } from "../../../common/items";
import NotificationTabs from "./notification_tabs";
import dayjs from 'dayjs';
import { firstDateOfMonth, lastDateOfMonth, LocalDate, UTC_LocalDateTime } from "../../../common/localDate";

const NotificationDetail = ({ refresh, currentOption, notificationList, setUnreadUpdate, tabActiveKey, setTabActiveKey }) => {

    const [allNotification, setAllNotification] = useState([]);
    const [newNotification, setNewNotification] = useState([]);
    const [rescheduleNotification, setRescheduleNotification] = useState([]);
    const [cancelNotification, setCancelNotification] = useState([]);

    const [newUnread, setNewUnread] = useState([]);
    const [rescheduleUnread, setRescheduleUnread] = useState([]);
    const [cancelUnread, setCancelUnread] = useState([]);
   

    useEffect(() => {

        let frmMonth = dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD");
        let toMonth = dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD");
        let year = new Date().getFullYear();
        let jan = new Date(year, 0, 1);
        let dec = new Date(year, 11, 31);
       
        const notification = 
        (currentOption === 'Today' ? notificationList.filter(a => LocalDate() === UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD')) :
                currentOption === 'Last 7 Days' ? notificationList.filter(a => UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') >= UTC_LocalDateTime(dayjs().subtract(7, 'day'), 'YYYY-MM-DD') && UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') <= LocalDate()) :
                    currentOption === 'This Month' ? notificationList.filter(a => UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') >= frmMonth && UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') <= toMonth) :
                        notificationList.filter(a => notificationList.filter(a => UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') >= jan && UTC_LocalDateTime(a.createdat, 'YYYY-MM-DD') <= dec)))

        const newNotify = notification.filter(a => a.option === 'New');
        const rescheduleNotify = notification.filter(a => a.option === 'Reschedule');
        const cancelNotify = notification.filter(a => a.option === 'Cancel');
        setAllNotification(notification.length > 0 ? notification : [])
        setNewNotification(newNotify.length > 0 ? newNotify : [])
        setRescheduleNotification(rescheduleNotify.length > 0 ? rescheduleNotify : [])
        setCancelNotification(cancelNotify.length > 0 ? cancelNotify : [])

        const newunread = newNotify.filter(a => a.read === '0');
        const rescheduleunread = rescheduleNotify.filter(a => a.read === '0');
        const cancelunread = cancelNotify.filter(a => a.read === '0');
        setNewUnread(newunread.length > 0 ? newunread : []);
        setRescheduleUnread(rescheduleunread.length > 0 ? rescheduleunread : []);
        setCancelUnread(cancelunread.length > 0 ? cancelunread : []);
    }, [refresh, currentOption, notificationList])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", 0,false), null, <NotificationTabs notificationList={allNotification} />),
        getTabItems('2', customLabelTab("New", "green", newUnread.length,newUnread.length > 0 ), null, <NotificationTabs notificationList={newNotification} />),
        getTabItems('3', customLabelTab("Reschedule", "blue", rescheduleUnread.length,rescheduleUnread.length > 0 ), null, <NotificationTabs notificationList={rescheduleNotification} />),
        getTabItems('4', customLabelTab("Cancel", "red",  cancelUnread.length,cancelUnread.length > 0 ), null, <NotificationTabs notificationList={cancelNotification} />),
        ];
 
    return (
        <div class='flex flex-col font-normal'>           
            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e); //if(e ==='2'){setUnreadUpdate(true)};
             }} />           
        </div>
    )
}

export default NotificationDetail;