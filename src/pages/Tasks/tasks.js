/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, DatePicker,  Select } from "antd"
import { useEffect, useRef, useState } from "react";

import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { get_Date, LocalDate } from "../../common/localDate";
import PageHeader from "../../common/pages/pageHeader";
import { useLocation, useOutletContext } from "react-router-dom";
import CalenderHeader from "./calenderHeader";
import CalenderBody from "./calenderBody";
import { isOpenForWork } from "../../common/general";
import { generateTimeSlotsWithDate, toHHMM, toMinutes } from "../../common/generateTimeSlots";

const Tasks = () => {
    const ranOnce = useRef(false); 
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const { refresh,
        orderList, getOrder,
        getEvent,
        getCustomer,
        getService,
        getUser,
        getSchedule,
        companyList, getCompany } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const state = location.state;
    const syncScroll = (source, target) => {
        target.scrollTop = source.scrollTop;
        target.scrollLeft = source.scrollLeft;
    };

    const [date, setDate] = useState(LocalDate());
    const [filter, setFilter] = useState('');
    const [orders, setOrders] = useState([]);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (ranOnce.current) return;
        ranOnce.current = true;
        Init();
    }, [])

    useEffect(() => {
        getAppointments();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        await getService();
        await getUser();    
        await getCustomer();
        await getEvent();
        await getSchedule();    
        setIsLoading(false);
    }
    const getAppointments = async () => {
        setIsLoading(true);
        const orderResponse = await getOrder();
        const companyResponse = await getCompany();
        const filterValue = state?.searchParams === undefined ? '' : state?.searchParams;
        setFilter(filterValue)
        handleCalender(orderResponse, companyResponse, date, filterValue);
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
 
    return (
        <div class="md:px-7 mb-12 min-h-screen">

            <div class='flex flex-col gap-2 sticky top-14 z-40 bg-white'>
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
                    <CalenderHeader/>
                </div>
            </div>

            <div class='overflow-auto w-full' ref={rightRef} onScroll={() => syncScroll(rightRef.current, leftRef.current)}>
                <CalenderBody slots={slots} orderList={orders} isLoading={isLoading} />
            </div>    

        </div>
    )
}

export default Tasks