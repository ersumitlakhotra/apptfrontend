/* eslint-disable react-hooks/exhaustive-deps */

import { Badge } from "antd"
import { UTC_LocalDateTime_relative } from "../../../common/localDate"


const NotificationTabs = ({ notification}) => {
    return (
        <div class='w-full bg-white  flex flex-col gap-2'>
            {notification.map(item =>
                <div key={item.id} class={`w-full flex flex-col p-2 bg-gray-50 mb-2 border-b `}>
                    <div class='flex flex-row gap-4 '>
                        {item.read === '0' ? <Badge key={item.id} color={'cyan'} /> : <Badge key={item.id} color={'blue'} />}
                        <div class='flex flex-col w-full'>
                            <p class='text-left font-medium text-gray-500'> {item.message}</p>
                            <span class='text-xs  text-gray-500'>{UTC_LocalDateTime_relative(item.createdat, 'MMM, DD YYYY - hh:mm A ')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationTabs

