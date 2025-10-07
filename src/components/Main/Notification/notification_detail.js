/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {  Tabs } from "antd";
import { customLabelTab, getTabItems } from "../../../common/items";
import NotificationTabs from "./notification_tabs";

const NotificationDetail = ({ refresh, notificationList, setUnreadUpdate, tabActiveKey ,setTabActiveKey }) => {
    const [unreadNotification, setUnreadNotification] = useState([]);
   

    useEffect(() => {
        const unread = notificationList.filter(a => a.read === '1');
        setUnreadNotification(unread.length > 0 ? unread : [])
    }, [refresh,notificationList])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", notificationList.length), null, <NotificationTabs notification={notificationList} />),
        getTabItems('2', customLabelTab("Unread", "blue", unreadNotification.length), null, <NotificationTabs notification={unreadNotification}  />),
        ];

    return (
        <div class='flex flex-col font-normal'>           
            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e); if(e ==='2'){setUnreadUpdate(true)}; }} />           
        </div>
    )
}

export default NotificationDetail;