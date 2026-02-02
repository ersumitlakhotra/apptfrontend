/* eslint-disable react-hooks/exhaustive-deps */

import { Avatar, Badge } from "antd"
import { UTC_LocalDateTime_relative, UTC_LocalDateTime } from "../../../common/localDate"
import { useResponseButtons } from "../../Order/responseButton";
import { useEffect } from "react";
import SaveData from "../../../hook/saveData";


const NotificationTabs = ({ notificationList,  unread,userList,servicesList,saveData, viewOrder,activeKey }) => { 
    
    const { Accept,Reject} = useResponseButtons(saveData);

    useEffect(() => {
        if (activeKey > 1 && unread.length > 0) {
            let ids = [];
            unread.map(item => {
                ids.push(item.id)
            })
            markAsRead(ids)
        }
    }, [activeKey])
    const markAsRead = (ids) => {
        SaveData({
            label: "Notification",
            method: 'POST',
            endPoint: "notificationread",
            id: null,
            body: JSON.stringify({id:ids})
        });
    }

    return (
        <div class='w-full bg-white  flex flex-col gap-2'>
            {notificationList.map(item =>
                <div key={item.id} class={`w-full flex flex-row p-2 gap-2 border-b-2 cursor-pointer ${item.read ==='0' ? 'bg-orange-200 hover:bg-orange-200':'hover:bg-gray-100'}  hover:shadow `} onClick={() =>  viewOrder(item.oid)}>
                    <Avatar style={{ backgroundColor: item.option === 'New' ? '#4ade80' : item.option === 'Reschedule' ? '#60a5fa' : '#fb7185' }} size="large">
                        {item.option.charAt(0)}
                    </Avatar>
                    <div class='flex flex-col gap-1 w-11/12 '>
                        <p class='text-xs'>{item.message}</p>
                        <div class='flex flex-row text-xs text-gray-500 items-center justify-between'>
                            <span> {UTC_LocalDateTime(item.createdat, "dddd MMM, DD YYYY - hh:mm A ")}</span>
                            <span >{UTC_LocalDateTime_relative(item.createdat, "MMM, DD YYYY - hh:mm A ")}</span>
                        </div>
                        {item.status === 'Awaiting' && // item.is_latest &&
                            <div class='flex gap-2 mt-2'>
                                <Accept id={item.oid} userList={userList} servicesList={servicesList} labelVisible={true} />
                                <Reject id={item.oid} userList={userList} servicesList={servicesList} labelVisible={true} />
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationTabs

