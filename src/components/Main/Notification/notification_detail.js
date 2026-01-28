/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {  Tabs } from "antd";
import { customLabelTab, getTabItems } from "../../../common/items";
import NotificationTabs from "./notification_tabs";
import dayjs from 'dayjs';
import { firstDateOfMonth, lastDateOfMonth, LocalDate, UTC_LocalDateTime } from "../../../common/localDate";

const NotificationDetail = ({ refresh, currentOption, notificationList, setUnreadUpdate, tabActiveKey, setTabActiveKey }) => {
    const [unreadNotification, setUnreadNotification] = useState([]);
    const [cancelNotification, setCancelNotification] = useState([]);
    const [notificationPerFilter, setNotificationPerFilter] = useState([]);
   

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

        const unread = notification.filter(a => a.read === '1');
        const cancelled = notification.filter(a => a.cancelled === '1');
        setNotificationPerFilter(notification.length > 0 ? notification : [])
        setUnreadNotification(unread.length > 0 ? unread : [])
        setCancelNotification(cancelled.length > 0 ? cancelled : [])
    }, [refresh, currentOption, notificationList])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", notificationPerFilter.length), null, <NotificationTabs notification={notificationPerFilter} />),
        getTabItems('2', customLabelTab("Unread", "blue", unreadNotification.length), null, <NotificationTabs notification={unreadNotification} />),
        getTabItems('3', customLabelTab("Cancelled", "red", cancelNotification.length), null, <NotificationTabs notification={cancelNotification} />),
        ];

 
    return (
        <div class='flex flex-col font-normal'>           
            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e); if(e ==='2'){setUnreadUpdate(true)}; }} />           
        </div>
    )
}

export default NotificationDetail;