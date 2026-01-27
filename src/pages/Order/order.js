/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Space, Tabs, Tag } from "antd";
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import OrderDetail from "../../components/Order/order_detail";
import OrderView from "../../components/Order/order_view";
import { getTabItems } from "../../common/items.js";
import OrderTabs from "../../components/Order/tab.js";
import { get_Date, LocalDate } from "../../common/localDate.js";
import IsLoading from "../../common/custom/isLoading.js";
import LogsView from "../../components/Logs/logs_view.js";
import ExportToExcel from "../../common/export.js";
import { getStorage } from "../../common/localStorage.js";
import FetchData from "../../hook/fetchData.js";
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
    const ref = useRef();
    const ranOnce = useRef(false);
    const headingLabel = 'Appointment'
    const { saveData, refresh } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [fromDate, setFromDate] = useState(LocalDate());
    const [toDate, setToDate] = useState(LocalDate());
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openLogs, setOpenLogs] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [order_no, setOrderNo] = useState('');

    const [servicesList, setServiceList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [logsList, setLogsList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const [ordersList, setOrdersList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
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

        let user = userResponse.data;
        if (localStorage.role === 'Employee') {
            user = user.filter(item => item.id === localStorage.uid)
        }

        setServiceList(serviceResponse.data);
        setUserList(user);
        setCompanyList(companyResponse.data);
        setCustomerList(customerResponse.data);
        setEventList(eventResponse.data);
    }

    const getAppointments = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();

        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: 'order'
        })

        let order = orderResponse.data;
        if (localStorage.role === 'Employee') {
            order = order.filter(item => item.assignedto === localStorage.uid)
        }
        setOrderList(order);
        load(order);
        setIsLoading(false);
    }

    useEffect(() => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel} - ${order_no}`);
    }, [order_no])

    const btn_Click = (id) => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel} - ${order_no}`);
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }

    const btn_ViewClick = (id) => {
        setReload(reload + 1);
        setId(id);
        setOpenView(true);
    }
    const btn_LogsClick = (id) => {
        setId(id);
        setOpenLogs(true);
    }


    useEffect(() => {
        load(orderList);
    }, [fromDate, toDate])



    const load = async (dataList) => {
        let order = dataList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') >= fromDate && get_Date(a.trndate, 'YYYY-MM-DD') <= toDate);

        const localStorage = await getStorage();
        if (localStorage.role === 'Employee') {
            order = order.filter(item => item.assignedto === localStorage.uid)
        }
        const pending = order.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = order.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = order.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = order.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setOrdersList(order.length > 0 ? order : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])
    }

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", ordersList.length), null, <OrderTabs key={1} index={1} orderList={ordersList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={reload} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('2', customLabelTab("Pending", "yellow", pendingList.length), null, <OrderTabs key={2} index={2} orderList={pendingList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={reload} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('3', customLabelTab("InProgress", "blue", inprogressList.length), null, <OrderTabs key={3} index={3} orderList={inprogressList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={reload} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('4', customLabelTab("Completed", "green", completedList.length), null, <OrderTabs key={4} index={4} orderList={completedList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={reload} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('5', customLabelTab("Cancelled", "red", cancelledList.length), null, <OrderTabs key={5} index={5} orderList={cancelledList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={reload} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
    ];


    const btnSave = async () => {
        await ref.current?.save();
    }


    return (
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12 w-full">
            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => btn_Click(0)} servicesList={servicesList} userList={userList} />
            <Tabs items={tabItems} defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />

            {/* Drawer on Add/ Edit*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={reload} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={reload} orderList={orderList} servicesList={servicesList} userList={userList} setOpenView={setOpenView} saveData={saveData} />
            </Drawer>

            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Order'} logsList={logsList} orderList={orderList} userList={userList} servicesList={servicesList} />
            </Drawer>
        </div>
    )
}

export default Order;