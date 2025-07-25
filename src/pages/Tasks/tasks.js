import {  Button } from "antd"
import { useEffect, useState } from "react";

import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Calender from "../../components/Event/calender";

const Tasks = ({ orderList, servicesList, userList, companyList }) => {
    const [date, setDate] = useState(null);
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setDate(dayjs());
        setRefresh(refresh + 1);
    }, [])

    useEffect(() => {
        const order = orderList.filter(a => dayjs(date).format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        setOrders(order.length > 0 ? order : []);
        setRefresh(refresh + 1);
    }, [date])

    return (
        <div class="flex flex-col gap-4 mb-12">
            <div class='flex  items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Task</span>
                <div class='flex flex-row items-center'>
                    <Button color="default" variant="outlined" icon={<LeftOutlined />} style={{ borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} onClick={()=>setDate(dayjs(date).add(-1, 'day'))} />
                    <p class='border border-gray-200 h-8 px-4  p-2 items-center flex text-sm font-normal bg-white'>{dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'Today' : dayjs(date).format('ddd, MMM DD')}</p>
                    <Button color="default" variant="outlined" icon={<RightOutlined/>} style={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} onClick={()=>setDate(dayjs(date).add(1, 'day'))} />
                </div>
            </div>
            <div class={`w-full bg-white border rounded-lg p-4 flex flex-col gap-4 max-h-[700px]`}>
                <Calender orderList={orders} servicesList={servicesList} userList={userList} companyList={companyList} trndate={date} refresh={refresh}/>            
            </div>


        </div>
    )
}

export default Tasks