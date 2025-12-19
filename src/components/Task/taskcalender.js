/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';
import {  getBorder, getTag } from "../../common/items";
import { isOpenForWork } from "../../common/general";
import { convertTo12Hour, generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";

function getHeight (start, end)  {
    let startMinutes = toMinutes(start);
    let endMinutes = toMinutes(end);
    let heightInt = (endMinutes - startMinutes) / 15;
    let setHeight = `${(heightInt * 48) - 4}px`
    return setHeight;
};
const TaskCalender = ({ orderList, servicesList, userList, companyList, trndate, btn_ViewClick }) => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (companyList.length !== 0) {
            const business = isOpenForWork(trndate, companyList.timinginfo[0]);
            let outTime = toMinutes(business[0].outTime) + 15;
            setSlots(generateTimeSlotsWithDate(trndate, business[0].inTime, toHHMM(outTime), 15, []));
        }
    }, [companyList, trndate])
    return (
        <div className='relative h-full w-max min-w-full overflow-auto px-2'>

            <div class='w-max min-w-full h-16 p-2 sticky top-0 border-b z-50 text-gray-700 font-medium bg-zinc-50 inline-flex gap-3'>
                <p class='w-20 text-sm p-4'>Slots</p>
                {userList.filter(item => !item.status.toLowerCase().includes('inactive')).map(a => (
                    <div key={a.id} class='inline-flex gap-2 items-center px-3 w-44 '>
                        {a.profilepic !== null ?
                            <Image width={30} height={30} src={a.profilepic} style={{ borderRadius: 15 }} preview={true} /> :
                            <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        <span class='text-sm overflow-x-hidden  '>{a.fullname}</span>
                    </div>
                ))}

            </div>

            <div class='flex flex-col py-2 '>
                {slots.map((item, index) =>
                (
                    <div class='border-b h-12  p-2 text-sm w-max min-w-full inline-flex gap-3'   >
                        <div class='w-20  p-1'>{convertTo12Hour(item.start)}</div>
                        {userList.map(a => (
                            <div class=' w-44'>
                                {orderList.filter(b => b.assignedto === a.id && b.start === item.start).map(c => (
                                    <div key={c.id} style={{ height: getHeight(c.start, c.end)}} class={`flex flex-col gap-2 px-2 mt-4 border rounded-md text-xs border-s-4 ${getBorder(c.status)}`}>
                                        <div class='flex items-center justify-between  font-medium'>
                                            <p class='underline cursor-pointer' onClick={() => btn_ViewClick(c.id)} ># {c.order_no}</p>
                                            <p>$ {c.price}</p>
                                        </div>
                                        <div class='flex flex-col overflow-hidden whitespace-nowrap'>
                                            {c.serviceinfo !== null &&
                                                servicesList.filter(sl =>
                                                    c.serviceinfo.some(b => b === sl.id)
                                                ).map(d => getTag(c.status, d.name))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                ))}

            </div>
            
            
        </div>

    )
}

export default TaskCalender;


