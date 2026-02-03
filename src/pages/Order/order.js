/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { getTabItems } from "../../common/items.js";
import OrderTabs from "../../components/Order/tab.js";
import { get_Date, LocalDate } from "../../common/localDate.js";
import { useOutletContext } from "react-router-dom";
import PageHeader from "../../common/pages/pageHeader.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Order = () => {
    const ranOnce = useRef(false);
    const { refresh,  editOrder,
        orderList, getOrder,
        getEvent,
        getCustomer,
        servicesList, getService,
        userList, getUser,
        getSchedule,
        getCompany } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [fromDate, setFromDate] = useState(LocalDate());
    const [toDate, setToDate] = useState(LocalDate());
    const [tabActiveKey, setTabActiveKey] = useState("1");

    const [ordersList, setOrdersList] = useState([]);
    const [awaitingList, setAwaitingList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
    const [rejectedList, setRejectedList] = useState([]);
    const [exportList, setExportList] = useState([]);

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
        await getCompany();
        await getCustomer();
        await getEvent();
        await getSchedule();
        setIsLoading(false);
    }

    const getAppointments = async () => {
        setIsLoading(true);
        const response=await getOrder();
        load(response);
        setIsLoading(false);
    }

    useEffect(() => {
        load(orderList);
    }, [fromDate, toDate])

    const load = async (dataList) => {
        let order = dataList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') >= fromDate && get_Date(a.trndate, 'YYYY-MM-DD') <= toDate);

        const awaiting = order.filter(a => a.status.toUpperCase() === 'AWAITING');
        const pending = order.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = order.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = order.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = order.filter(a => a.status.toUpperCase() === 'CANCELLED');
        const rejected = order.filter(a => a.status.toUpperCase() === 'REJECTED');

        setOrdersList(order.length > 0 ? order : [])
        setAwaitingList(awaiting.length > 0 ? awaiting : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])
        setRejectedList(rejected.length > 0 ? rejected : [])
    }

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", ordersList.length), null, <OrderTabs key={1} index={1} orderList={ordersList}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading}  />),
        getTabItems('2', customLabelTab("Awaiting", "silver", awaitingList.length), null, <OrderTabs key={2} index={2} orderList={awaitingList} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading}  />),
        getTabItems('3', customLabelTab("Pending", "yellow", pendingList.length), null, <OrderTabs key={3} index={3} orderList={pendingList}   fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading}  />),
        getTabItems('4', customLabelTab("InProgress", "blue", inprogressList.length), null, <OrderTabs key={4} index={4} orderList={inprogressList}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('5', customLabelTab("Completed", "green", completedList.length), null, <OrderTabs key={5} index={5} orderList={completedList}   fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('6', customLabelTab("Cancelled", "red", cancelledList.length), null, <OrderTabs key={6} index={6} orderList={cancelledList}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('7', customLabelTab("Rejected", "red", rejectedList.length), null, <OrderTabs key={7} index={7} orderList={rejectedList}   fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading}  />),
    ];

    return (
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12 w-full ">
            <PageHeader label={'Appointment'} isExport={true} exportList={exportList} exportName={'Appointment'} isCreate={true} onClick={() => editOrder(0)} servicesList={servicesList} userList={userList} />
            <Tabs items={tabItems} defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />

            {/* Drawer on logs
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Order'} logsList={logsList} orderList={orderList} userList={userList} servicesList={servicesList} />
            </Drawer> */}
        </div>
    )
}

export default Order;