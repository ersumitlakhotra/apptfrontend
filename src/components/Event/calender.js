
import { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Sort } from "../../common/sort";
import { Avatar, Image, Tag } from "antd";

import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { generateTimeSlots } from "../../common/intervals";

const getBorder = (value) => {
    switch (value.toUpperCase()) {
        case 'PENDING':
            return 'border-s-yellow-500 bg-yellow-100 text-yellow-600';
        case 'IN PROGRESS':
            return 'border-s-blue-500 bg-blue-100 text-blue-600 ';
        case 'COMPLETED':
            return 'border-s-green-500 bg-green-100  text-green-600';
        case 'CANCELLED':
            return 'border-s-red-500 bg-red-100 text-red-600';
        default:
            return 'border-s-gray-400 bg-grey-100 text-gray-600';
    }
}
const getTag = (value,name) => {
    switch (value.toUpperCase()) {
        case 'PENDING':
            return <Tag color='Yellow' bordered={false}>{name}</Tag>;
        case 'IN PROGRESS':
            return <Tag color='Blue' bordered={false}>{name}</Tag>;
        case 'COMPLETED':
            return <Tag color='Green' bordered={false}>{name}</Tag>;
        case 'CANCELLED':
            return <Tag color='Red' bordered={false}>{name}</Tag>;
        default:
            return <Tag color='Gray' bordered={false}>{name}</Tag>;
    }
}
const Calender = ({ orderList, servicesList, userList, refresh }) => {

    const [headerItems,setHeaderItems]= useState([])
    const [generateSlots, setGenerateSlots] = useState([]);

    useEffect(() => {
        let i=0;
        setHeaderItems(userList.map(a => ({ key:i=i+1, label:a.fullname, id:a.id,profilepic:a.profilepic})))
        setGenerateSlots(generateTimeSlots("10:00:00", "21:50:00", 30, []));
    }, [refresh])

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

{/*
    
     const order = orderList.filter(b => b.assignedto === a.id && b.slot === item.id);
                                if (order.length > 0) {
                                    order.map(c => (
                                        <td class="p-3 font-sans font-semibold text-gray-700">{c.order_n0}</td>
                                    ))
                                }
                                else {
                                    <td></td>
                                }
    */}
