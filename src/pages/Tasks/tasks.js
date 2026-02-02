/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, DatePicker, Drawer, Select, Space } from "antd"
import { useEffect, useRef, useState } from "react";

import { RightOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import OrderView from "../../components/Order/order_view";
import { get_Date, LocalDate } from "../../common/localDate";
import FetchData from "../../hook/fetchData";
import PageHeader from "../../common/pages/pageHeader";
import { useLocation, useOutletContext } from "react-router-dom";
import CalenderHeader from "./calenderHeader";
import CalenderBody from "./calenderBody";
import { isOpenForWork } from "../../common/general";
import { generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";
import OrderDetail from "../../components/Order/order_detail";
import { getStorage } from "../../common/localStorage";

const Tasks = () => {
    const { saveData, refresh, setIsLoading, viewOrder } = useOutletContext();
    const [isAdmin, setIsAdmin] = useState(false);
    const [uid, setUid] = useState(0);
    const location = useLocation();
    const state = location.state;
    const ref = useRef();
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const syncScroll = (source, target) => {
        target.scrollTop = source.scrollTop;
        target.scrollLeft = source.scrollLeft;
    };

    const [date, setDate] = useState(LocalDate());
    const [filter, setFilter] = useState('');
    const [orders, setOrders] = useState([]);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');

    const [order_no, setOrderNo] = useState('');
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);

    const [servicesList, setServiceList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();
        const isAdmin = localStorage.role === 'Administrator'
        setIsAdmin(isAdmin)
        setUid(localStorage.uid)

        const serviceResponse = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user',
            id: !isAdmin ? localStorage.uid : null
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
            endPoint: !isAdmin ? 'orderPerUser' : 'order', //
            id: !isAdmin ? localStorage.uid : null
        })
        const scheduleResponse = await FetchData({
            method: 'GET',
            endPoint: 'schedule'
        })
        let schedule = scheduleResponse.data;
        if (!isAdmin) {
            schedule = scheduleResponse.data.filter(item => item.uid === localStorage.uid);
        }

        setScheduleList(schedule);
        setServiceList(serviceResponse.data);
        setUserList(userResponse.data);
        setCompanyList(companyResponse.data);
        setCustomerList(customerResponse.data);
        setEventList(eventResponse.data);
        setOrderList(orderResponse.data);
        const filterValue = state?.searchParams === undefined ? '' : state?.searchParams;
        setFilter(filterValue)
        handleCalender(orderResponse.data, companyResponse.data, date, filterValue);
        setIsLoading(false);
    }

    const handleCalender = (orderData, companyData, dateValue, filterBy) => {
        let order = orderData.filter(a => dayjs(dateValue).format('YYYY-MM-DD') === get_Date(a.trndate, 'YYYY-MM-DD'));
        if (filterBy !== '')
            order = order.filter(a => a.status.toUpperCase() === filterBy.toString().toUpperCase());

        const business = isOpenForWork(dateValue, companyData.timinginfo[0]);
        let outTime = toMinutes(business[0].outTime) + 15;
        setSlots(generateTimeSlotsWithDate(dateValue, business[0].inTime, toHHMM(outTime), 15, []));
        setOrders(order.length > 0 ? order : []);
    }

    const onDateChange = (dateValue) => {
        setDate(dateValue);
        handleCalender(orderList, companyList, dateValue, filter)
    }
    const onFilterChange = (value) => {
        setFilter(value);
        handleCalender(orderList, companyList, date, value)
    }
    const onEdit = (id, order_no) => {
        setOrderNo(order_no);
        setTitle(id === 0 ? "New Order" : `Edit Order - ${order_no}`);
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }


    const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="md:px-7 mb-12 min-h-screen">

            <div class='flex flex-col gap-2 sticky top-14 z-50 bg-white'>
                <div class='flex flex-row items-center  justify-between py-4 '>
                    <PageHeader label={'Calender'} isExport={false} isCreate={false} />

                    <div class='flex flex-row gap-2 items-start justify-end  w-80 md:w-96'>
                        <Select
                            value={filter}
                            style={{ width: '60%' }}
                            onChange={(value) => onFilterChange(value)}
                            options={[
                                { value: '', label: <Badge color={'cyan'} text={'All'} /> },
                                { value: 'Awaiting', label: <Badge color={'silver'} text={'Awaiting'} /> },
                                { value: 'Pending', label: <Badge color={'yellow'} text={'Pending'} /> },
                                { value: 'In progress', label: <Badge color={'blue'} text={'In progress'} /> },
                                { value: 'Completed', label: <Badge color={'green'} text={'Completed'} /> },
                                { value: 'Cancelled', label: <Badge color={'red'} text={'Cancelled'} /> },
                                { value: 'Rejected', label: <Badge color={'red'} text={'Rejected'} /> }
                            ]}
                        />
                        <div class='flex flex-row items-start justify-end'>
                            <Button color="default" variant="outlined" icon={<LeftOutlined />} style={{ borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} onClick={() => onDateChange(dayjs(date).add(-1, 'day'))} />
                            <DatePicker
                                style={{ width: '100%' }}
                                allowClear={false}
                                format={dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '[Today]' : 'ddd, MMM DD, YYYY'}
                                value={date === '' ? date : dayjs(date, 'YYYY-MM-DD')}
                                onChange={(date, dateString) => onDateChange(date)} />

                            <Button color="default" variant="outlined" icon={<RightOutlined />} style={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} onClick={() => onDateChange(dayjs(date).add(1, 'day'))} />
                        </div>

                    </div>
                </div>
                <div class='overflow-auto w-full' ref={leftRef} onScroll={() => syncScroll(leftRef.current, rightRef.current)}>
                    <CalenderHeader userList={userList} />
                </div>
            </div>

            <div class='overflow-auto w-full' ref={rightRef} onScroll={() => syncScroll(rightRef.current, leftRef.current)}>
                <CalenderBody slots={slots} orderList={orders} servicesList={servicesList} userList={userList} onView={viewOrder} onEdit={onEdit} saveData={saveData} />
            </div>

            {/* Drawer on Edit*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={reload} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} scheduleList={scheduleList} saveData={saveData} setOpen={setOpen} isAdmin={isAdmin} uid={uid} />
            </Drawer>

        </div>
    )
}

export default Tasks