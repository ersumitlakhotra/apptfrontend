/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Drawer, Space } from "antd"
import { useEffect, useRef, useState } from "react";

import { RightOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import OrderView from "../../components/Order/order_view";
import { get_Date, LocalDate } from "../../common/localDate";
import FetchData from "../../hook/fetchData";
import PageHeader from "../../common/pages/pageHeader";
import { useOutletContext } from "react-router-dom";
import CalenderHeader from "./calenderHeader";
import CalenderBody from "./calenderBody";
import { isOpenForWork } from "../../common/general";
import { generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";
import OrderDetail from "../../components/Order/order_detail";
import { getStorage } from "../../common/localStorage";

const Tasks = () => {
    const { saveData, isLoading, refresh, setIsLoading } = useOutletContext();

    const ref = useRef();
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const syncScroll = (source, target) => {
        target.scrollTop = source.scrollTop;
        target.scrollLeft = source.scrollLeft;
    };
    const [date, setDate] = useState(LocalDate());
    const [orders, setOrders] = useState([]);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');

    const [order_no, setOrderNo] = useState('');
    const [openView, setOpenView] = useState(false);
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);

    const [servicesList, setServiceList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        Init();
    }, [])

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();
        const serviceResponse = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user'
        })
        const companyResponse = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        const customerResponse = await FetchData({
            method: 'GET',
            endPoint: 'customer'
        })
        const eventResponse = await FetchData({
            method: 'GET',
            endPoint: 'event',
            eventDate: true
        })
        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: 'order'
        })

        let order = orderResponse.data;
        let user = userResponse.data;
        if (localStorage.role === 'Employee')
        {
            order = order.filter(item => item.assignedto === localStorage.uid)
            user = user.filter(item => item.id === localStorage.uid)
        }
        setServiceList(serviceResponse.data);
        setUserList(user);
        setCompanyList(companyResponse.data);
        setCustomerList(customerResponse.data);
        setEventList(eventResponse.data);
        setOrderList(order);

        handleCalender(order, companyResponse.data, date);
        setIsLoading(false);
    }

    const handleCalender = (orderData, companyData, dateValue) => {
        const order = orderData.filter(a => dayjs(dateValue).format('YYYY-MM-DD') === get_Date(a.trndate, 'YYYY-MM-DD'));
        const business = isOpenForWork(dateValue, companyData.timinginfo[0]);
        let outTime = toMinutes(business[0].outTime) + 15;
        setSlots(generateTimeSlotsWithDate(dateValue, business[0].inTime, toHHMM(outTime), 15, []));
        setOrders(order.length > 0 ? order : []);
    }

    const onDateChange = (dateValue) => {
        setDate(dateValue);
        handleCalender(orderList, companyList, dateValue)
    }
    const onEdit = (id, order_no) => {
        setOrderNo(order_no);
        setTitle(id === 0 ? "New Order" : `Edit Order - ${order_no}`);  
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }
    const onView = (id) => {
        setReload(reload + 1);
        setId(id);
        setOpenView(true);
    }

 const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="md:px-7 mb-12 min-h-screen">

            <div class='flex flex-col gap-2 sticky top-14 z-50 bg-white'>
                <div class='flex flex-row items-center  justify-between py-4 '>
                    <PageHeader label={'Calender'} isExport={false} isCreate={false} />
                    <div class='flex flex-row items-start justify-end'>
                        <Button color="default" variant="outlined" icon={<LeftOutlined />} style={{ borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} onClick={() => onDateChange(dayjs(date).add(-1, 'day'))} />
                        <DatePicker
                            style={{ width: '60%' }}
                            allowClear={false}
                            format={dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '[Today]' : 'ddd, MMM DD, YYYY'}
                            value={date === '' ? date : dayjs(date, 'YYYY-MM-DD')}
                            onChange={(date, dateString) => onDateChange(date)} />

                        <Button color="default" variant="outlined" icon={<RightOutlined />} style={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} onClick={() => onDateChange(dayjs(date).add(1, 'day'))} />
                    </div>
                </div>
                <div class='overflow-auto w-full' ref={leftRef} onScroll={() => syncScroll(leftRef.current, rightRef.current)}>
                    <CalenderHeader userList={userList} />
                </div>
            </div>

            <div class='overflow-auto w-full' ref={rightRef} onScroll={() => syncScroll(rightRef.current, leftRef.current)}>
                <CalenderBody slots={slots} orderList={orders} servicesList={servicesList} userList={userList} onView={onView} onEdit={onEdit} />
            </div>

            {/* Drawer on Edit*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={reload} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={reload} orderList={orderList} servicesList={servicesList} userList={userList} setOpenView={setOpenView} saveData={saveData} />
            </Drawer>

        </div>
    )
}

export default Tasks