/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { Avatar, Image } from "antd";

import { UserOutlined } from '@ant-design/icons';
import { generateTimeSlots } from "../../common/intervals";

import dayjs from 'dayjs';
import { getBorder, getTag } from "../../common/items";
import { isOpenForWork } from "../../common/general";
import { convertTo12Hour, generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";
import AssignedTo from "../../common/assigned_to";

const TaskCalender = ({ orderList, servicesList, userList, companyList, trndate, btn_ViewClick }) => {
    const refs = useRef([]);
    const [slots, setSlots] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (companyList.length !== 0) {
            const business = isOpenForWork(trndate, companyList.timinginfo[0]);
            let outTime = toMinutes(business[0].outTime) + 15;
            setSlots(generateTimeSlotsWithDate(trndate, business[0].inTime, toHHMM(outTime), 15, []));
            setAppointments(orderList.filter(item => item.trndate === trndate))
        }
    }, [companyList, trndate])

    function getWidth(index) {
        if (refs.current[index]) {
        // Option 1: Using getBoundingClientRect()
            const rect = refs.current[index]?.getBoundingClientRect();
       // console.log("Width using getBoundingClientRect():", rect.top);

        // Option 2: Using offsetWidth
        // console.log("Width using offsetWidth:", divRef.current.offsetWidth);
            return `${rect.top}px`;
        }
    };
    return (
        <div className='relative h-full w-max min-w-full overflow-auto px-2'>

            <div class='w-max min-w-full h-16 p-2 sticky top-0 border-b  z-50 text-gray-700 font-medium bg-zinc-50 inline-flex gap-3'>
                <p class='w-20 text-sm p-4'>Slots</p>
                {userList.filter(item => !item.status.toLowerCase().includes('inactive')).map(a => (
                    <div key={a.id}  class='flex flex-row gap-2 items-center px-3 w-48 border text-nowrap whitespace-nowrap '>
                        {a.profilepic !== null ?
                            <Image width={30} height={30} src={a.profilepic} style={{ borderRadius: 15 }} preview={true} /> :
                            <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        <span class='text-sm font-bold '>{a.fullname}</span>
                    </div>
                ))}
                
            </div>

            <div class='flex flex-col py-2 '>
                {slots.map((item, index) =>
                (<>
                    <div key={index} ref={(el) => (refs.current[index] = el)} class='h-12 border-b p-2 text-sm  '>{convertTo12Hour(item.start)}</div>
                    <div class={`absolute top-[${80 + 5}px] left-28 h-12 w-48 p-2 bg-white border rounded z-10`}>
                        {getWidth(index)}
                    </div></>
                ))}

            </div>
            
            
        </div>

    )
}

export default TaskCalender;


