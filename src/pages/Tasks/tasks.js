/* eslint-disable react-hooks/exhaustive-deps */
import {  Button, Drawer } from "antd"
import { useEffect, useState } from "react";

import { RightOutlined, LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Calender from "../../components/Task/calender";
import OrderView from "../../components/Order/order_view";
import { get_Date, LocalDate } from "../../common/localDate";
import TaskCalender from "../../components/Task/taskcalender";

const Tasks = ({ orderList, servicesList, userList, companyList, customerList, eventList, saveData, reload, setReload }) => {
    const [date, setDate] = useState(LocalDate());
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [openView, setOpenView] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        setDate(dayjs());
         filterData();
    }, [])

    useEffect(() => {
        filterData();
    }, [date,orderList])

    const onReload = () => {
        setReload(reload + 1);
        filterData();
    }

    const filterData = () => {
    const order = orderList.filter(a => dayjs(date).format('YYYY-MM-DD') === get_Date(a.trndate,'YYYY-MM-DD'));
    setOrders(order.length > 0 ? order : []);
    }

    const btn_ViewClick = (id) => {
        setRefresh(refresh + 1);
        setId(id);
        setOpenView(true);
    }

    return (
        <div class="flex flex-col gap-4 mb-12  w-full h-full">
            
            <div class='flex  items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Task</span>
                <div class='flex flex-row items-center gap-4'>
                 <Button type="primary" icon={<ReloadOutlined />} size="large" onClick={() => onReload()}>Refresh</Button>
                
                <div class='flex flex-row items-center'>
                    <Button color="default" variant="outlined" icon={<LeftOutlined />} style={{ borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} onClick={()=>setDate(dayjs(date).add(-1, 'day'))} />
                    <p class='border border-gray-200 h-8 px-4  p-2 items-center flex text-sm font-normal bg-white'>{dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'Today' : dayjs(date).format('ddd, MMM DD')}</p>
                    <Button color="default" variant="outlined" icon={<RightOutlined/>} style={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} onClick={()=>setDate(dayjs(date).add(1, 'day'))} />
                </div>
                </div>
            </div>

            <div class={`w-full bg-white border rounded-lg overflow-auto`}>
                <TaskCalender orderList={orders} servicesList={servicesList} userList={userList} companyList={companyList} customerList={customerList} eventList={eventList} trndate={date} btn_ViewClick={btn_ViewClick} saveData={saveData} />            
            </div>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={refresh} orderList={orderList} servicesList={servicesList} userList={userList} setOpenView={setOpenView} saveData={saveData} />
             </Drawer>

        </div>
    )
}

export default Tasks