/* eslint-disable react-hooks/exhaustive-deps */

import { Avatar, Badge } from "antd"
import { UTC_LocalDateTime_relative, UTC_LocalDateTime } from "../../../common/localDate"


const NotificationTabs = ({ notificationList}) => {
    return (
        <div class='w-full bg-white  flex flex-col gap-2'>
            {notificationList.map(item =>
                <div key={item.id} class={`w-full flex flex-row p-2 gap-2 border-b-2 `}>
                    <Avatar style={{ backgroundColor: item.option === 'New' ? '#4ade80' : item.option === 'Reschedule' ? '#60a5fa' : '#fb7185' }} size="large">
                        {item.option.charAt(0)}
                    </Avatar>
                    <div class='flex flex-col w-3/5 '>
                        <p class='text-xs'>{item.message}</p>

                       {/* {item.cancelled === '1' ? <Badge key={item.id} color={'red'} /> : item.read === '0' ? <Badge key={item.id} color={'cyan'} /> : <Badge key={item.id} color={'blue'} />}
                        <div class='flex flex-col w-full'>
                            <p class='text-left font-medium text-gray-500'> {item.message}</p>
                            <span class='text-xs  text-gray-500'>{UTC_LocalDateTime_relative(item.createdat, "MMM, DD YYYY - hh:mm A ")}</span>
                        </div>
                        */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationTabs

