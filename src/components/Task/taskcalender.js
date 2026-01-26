/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Drawer, Image, Space, Tooltip } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import {  getBorder, getTag } from "../../common/items";
import { isOpenForWork } from "../../common/general";
import { convertTo12Hour, generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";
import OrderDetail from "../Order/order_detail";

function getHeight (start, end)  {
    let startMinutes = toMinutes(start);
    let endMinutes = toMinutes(end);
    let heightInt = (endMinutes - startMinutes) / 15;
    let setHeight = `${(heightInt * 48) - 4}px`
    return setHeight;
};
const TaskCalender = ({ orderList, servicesList, userList, companyList, customerList, eventList, trndate, btn_ViewClick, saveData }) => {
 const ref = useRef();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [order_no, setOrderNo] = useState('');
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (companyList.length !== 0) {
            const business = isOpenForWork(trndate, companyList.timinginfo[0]);
            let outTime = toMinutes(business[0].outTime) + 15;
            setSlots(generateTimeSlotsWithDate(trndate, business[0].inTime, toHHMM(outTime), 15, []));
        }
    }, [companyList, trndate])

    const btn_Click = (id, order_no) => {
        setOrderNo(order_no);
        setTitle(id === 0 ? "New Order" : `Edit Order - ${order_no}`);
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }
    const btnSave = async () => {
        await ref.current?.save();
    }
    return (
        <div className='min-h-screen w-max min-w-full overflow-auto px-2'>

            <div class='w-max min-w-full h-16 p-2 sticky top-0 border-b z-40 text-gray-700 font-medium bg-zinc-50 inline-flex gap-3'>
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
                    <div key={index} class='border-b h-12  p-2 text-sm w-max min-w-full inline-flex gap-3 '   >
                        <div class='w-20  p-1'>{convertTo12Hour(item.start)}</div>
                        {userList.map(a => (
                            <div key={a.id} class=' w-44'>
                                {orderList.filter(b => b.assignedto === a.id && b.start === item.start).map(c => (
                                    <div
                                        key={c.id}

                                        style={{ height: getHeight(c.start, c.end), cursor: 'pointer' }}
                                        class={`flex flex-col gap-2 px-2 mt-4 border rounded-md text-xs border-s-4 ${getBorder(c.status)}`}>
                                        <div class='flex items-center justify-between  font-medium'>
                                            <p class='underline' onClick={() => btn_ViewClick(c.id)}  ># {c.order_no}</p>
                                            <Tooltip placement="top" title={'Edit'} >
                                                <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(c.id, c.order_no)} />
                                            </Tooltip>
                                        </div>
                                        <div class='flex flex-col overflow-hidden whitespace-nowrap ' onClick={() => btn_ViewClick(c.id)}>
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
            
            <Drawer title={title} placement='right' width={600} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={refresh} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} saveData={saveData} setOpen={setOpen} />
            </Drawer>
        </div>

    )
}

export default TaskCalender;


