import { Badge, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const LiveEvent = ({ eventList, userList, servicesList, refresh, onSelected }) => {
    const [liveList, setLiveList] = useState([]);

    useEffect(() => {
        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])
    }, [refresh])

    return (
        <div class='flex flex-col gap-4 w-full'>
            <div class='flex justify-between items-center'>
                <Badge count={liveList.length} color="#52c41a" offset={[15, 10]}>
                    <span class="text-lg font-semibold text-gray-800">Live Events</span>
                </Badge>
                <Button color="primary" variant="outlined" onClick={() => onSelected('Event')} >
                    View all
                </Button>
            </div>
            <div class='w-full bg-white border rounded p-5 text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto'>
                <div class=' flex flex-col gap-4 mb-4'>
                    {liveList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any live events going on right now.</p> :
                        liveList.map(item =>
                            <div key={item.id} class={` text-xs flex flex-col gap-1 border-s-4 p-2 border-s-green-300 bg-green-50  text-green-500`}>
                                <div class='flex items-center justify-between font-medium'>
                                    <p class='text-sm' > {item.title}</p>
                                    <p>$ {item.total}</p>
                                </div>
                                <div class='flex items-center justify-between font-medium'>
                                    <span class="text-gray-500">{dayjs(item.startdate).format('ddd, MMM DD')} - {dayjs(item.enddate).format('ddd, MMM DD')}</span>
                                    <p>{item.coupon}</p>
                                </div>
                                <div class='flex flex-col overflow-hidden whitespace-nowrap'>
                                    {item.serviceinfo !== null &&
                                        servicesList.filter(a =>
                                            item.serviceinfo.some(b => b === a.id)
                                        ).map(c => <Tag key={c.id} color="green" bordered={false}>{c.name}</Tag>)
                                    }
                                </div>
                            </div>
                        )}

                </div>
            </div>
        </div>
    )
}
export default LiveEvent