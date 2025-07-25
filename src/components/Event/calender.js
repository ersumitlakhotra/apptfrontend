
import { useEffect, useState } from "react";
import { Avatar, Image, Tag } from "antd";

import { UserOutlined } from '@ant-design/icons';
import { generateTimeSlots } from "../../common/intervals";

import dayjs from 'dayjs';
import { getBorder, getTag } from "../../common/items";

const Calender = ({ orderList, servicesList, userList, companyList, trndate, refresh }) => {

    const [headerItems,setHeaderItems]= useState([])
    const [generateSlots, setGenerateSlots] = useState([]);

    const [inTime, setInTime] = useState('00:00:00');
    const [outTime, setOutTime] = useState('00:00:00');

    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    useEffect(() => {
        let i=0;
        setHeaderItems(userList.map(a => ({ key:i=i+1, label:a.fullname, id:a.id,profilepic:a.profilepic})))
    }, [refresh])

   useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.timinginfo !== null) {
                if (trndate !== '') {
                    const dayOfWeekNumber = dayjs(trndate).get('day');
                    const dayName = weekdays[dayOfWeekNumber];
                    setOpeningHours(dayName);
                }
            }
        }
   }, [companyList, trndate])

    useEffect(() => {
        setGenerateSlots(generateTimeSlots(inTime, outTime, 30, []));
    }, [inTime, outTime])

    const setOpeningHours = (weekday) => {
        switch (weekday) {
            case 'sunday':
                {
                    setInTime(companyList.timinginfo[0].sunday[0]); setOutTime(companyList.timinginfo[0].sunday[1]); 
                    break;
                }
            case 'monday':
                {
                    setInTime(companyList.timinginfo[0].monday[0]); setOutTime(companyList.timinginfo[0].monday[1]); 
                    break;
                }
            case 'tuesday':
                {
                    setInTime(companyList.timinginfo[0].tuesday[0]); setOutTime(companyList.timinginfo[0].tuesday[1]); 
                    break;
                }
            case 'wednesday':
                {
                    setInTime(companyList.timinginfo[0].wednesday[0]); setOutTime(companyList.timinginfo[0].wednesday[1]); 
                    break;
                }
            case 'thursday':
                {
                    setInTime(companyList.timinginfo[0].thursday[0]); setOutTime(companyList.timinginfo[0].thursday[1]); 
                    break;
                }
            case 'friday':
                {
                    setInTime(companyList.timinginfo[0].friday[0]); setOutTime(companyList.timinginfo[0].friday[1]); 
                    break;
                }
            case 'saturday':
                {
                    setInTime(companyList.timinginfo[0].saturday[0]); setOutTime(companyList.timinginfo[0].saturday[1]); 
                    break;
                }
            default:
                {
                    setInTime('00:00:00'); setOutTime('00:00:00'); 
                    break;
                }

        }
    }
    return (
        <div class="relative overflow-x-auto ">
            <table class={`w-full text-left  overflow-auto h-fit`}>
                <thead class="h-12 sticky top-0 z-40 text-gray-700  font-medium  bg-zinc-50">
                    <tr key={-1}>
                        <th scope="col" id={-1} key={-1} class='bg-white z-50 sticky top-0 left-0' > </th>
                        {headerItems.map(items => (
                            <th scope="col" id={items.key} key={items.key} class={`p-3  border-s border-zinc-100 `}>
                                <div class='flex flex-row items-center '>
                                    { items.profilepic !== null ?
                                        <Image width={40} height={31} src={items.profilepic} style={{ borderRadius: 15 }} /> :
                                        <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />                             
                                    }
                                    <p class='w-full px-3 text-sm whitespace-nowrap'>{items.label} </p>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {generateSlots.map(item => (
                        <tr key={item.id} class="bg-white border-t text-xs  whitespace-nowrap border-gray-100 hover:bg-zinc-50 ">
                            <td class="p-3 font-sans font-semibold text-gray-700 sticky left-0 z-10 bg-white">{item.id}</td>
                            {headerItems.map(a => (
                                <td class='p-1'>

                                    {orderList.filter(b => b.assignedto === a.id && b.slot === item.id).map(c => (
                                        <div key={c.id} class={`flex flex-col gap-1 border-s-4 p-2  ${getBorder(c.status)}`}>
                                            <div class='flex items-center justify-between font-medium'>
                                                <p ># {c.order_no}</p>
                                                <p>$ {c.price}</p>
                                            </div>
                                            <div>
                                            {c.serviceinfo !== null &&
                                                servicesList.filter(sl =>
                                                    c.serviceinfo.some(b => b === sl.id)
                                                ).map(d =>  getTag(c.status, d.name) )}
                                            </div>
                                        </div>
                                    ))}

                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Calender;


