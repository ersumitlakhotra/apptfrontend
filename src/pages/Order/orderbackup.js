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
import { useOutletContext } from "react-router-dom";
import { getStorage } from "../../common/localStorage.js";
import FetchData from "../../hook/fetchData.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const OrderB = () => {
    const ref = useRef();
    const headingLabel = 'Appointment'
    const { saveData, refresh  } = useOutletContext();

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

    const [searchInput, setSearchInput] = useState('');
    const [assigned_to, setAssignedTo] = useState('');
    const [dropDownVisible,setDropDownVisible] = useState(true)

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
        Init();
        getAppointments();
    }, [])

    useEffect(() => {
        getAppointments();
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

        let user = userResponse.data;
        if (localStorage.role === 'Employee') {
            user = user.filter(item => item.id === localStorage.uid)
        }
        setAssignedTo(localStorage.role === 'Employee' ? localStorage.uid : '' );
        setDropDownVisible(localStorage.role === 'Employee' ? false : true);

        setServiceList(serviceResponse.data);
        setUserList(user);
        setCompanyList(companyResponse.data);
        setCustomerList(customerResponse.data);
        setEventList(eventResponse.data);

        setIsLoading(false);
    }

    const getAppointments = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();
        const logsResponse = await FetchData({
            method: 'GET',
            endPoint: 'logs'
        })
        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: 'order'
        })

        let order = orderResponse.data;
        if (localStorage.role === 'Employee') {
            order = order.filter(item => item.assignedto === localStorage.uid)
        }
        setLogsList(logsResponse.data);
        setOrderList(order);
        load(order, fromDate, toDate);
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
        load(orderList, fromDate, toDate);
    }, [orderList, fromDate, toDate])

    const onSearch = (value) => {
        setSearchInput(value)
    }

    const load = async(data, frm, to) => {
        setIsLoading(true);

        let order = await data.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') >= frm && get_Date(a.trndate, 'YYYY-MM-DD') <= to);
        order = await order.filter(item =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.cell.toLowerCase().replace(/\D/g, "").includes(searchInput.toLowerCase().replace(/\D/g, "")) ||
            item.order_no.toString().includes(searchInput.toLowerCase()));

        if (assigned_to !== '')
            order = await order.filter(item => item.assignedto === assigned_to)

        const pending = order.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = order.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = order.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = order.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setOrdersList(order.length > 0 ? order : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

        setIsLoading(false);
    }

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", ordersList.length), null, <OrderTabs key={1} index={1} orderList={ordersList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} searchInput={searchInput} onSearch={onSearch} assigned_to={assigned_to} setAssignedTo={setAssignedTo} dropDownVisible={dropDownVisible}/>),
        getTabItems('2', customLabelTab("Pending", "yellow", pendingList.length), null, <OrderTabs key={2} index={2} orderList={pendingList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} searchInput={searchInput} onSearch={onSearch}  assigned_to={assigned_to} setAssignedTo={setAssignedTo} dropDownVisible={dropDownVisible} />),
        getTabItems('3', customLabelTab("InProgress", "blue", inprogressList.length), null, <OrderTabs key={3} index={3} orderList={inprogressList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} searchInput={searchInput} onSearch={onSearch} assigned_to={assigned_to} setAssignedTo={setAssignedTo} dropDownVisible={dropDownVisible} />),
        getTabItems('4', customLabelTab("Completed", "green", completedList.length), null, <OrderTabs key={4} index={4} orderList={completedList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} searchInput={searchInput} onSearch={onSearch} assigned_to={assigned_to} setAssignedTo={setAssignedTo} dropDownVisible={dropDownVisible} />),
        getTabItems('5', customLabelTab("Cancelled", "red", cancelledList.length), null, <OrderTabs key={5} index={5} orderList={cancelledList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} searchInput={searchInput} onSearch={onSearch}  assigned_to={assigned_to} setAssignedTo={setAssignedTo} dropDownVisible={dropDownVisible}/>),
    ];

    const btnSave = async () => {
        await ref.current?.save();
    }


    return (
        <div class="flex flex-col gap-4 px-7 py-4  mb-12 w-full">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Appointment</span>
                <div class="flex gap-2">
                    <ExportToExcel data={exportList} fileName="Appointment" servicesList={servicesList} userList={userList} />
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create Appointment</Button>
                </div>
            </div>
            <IsLoading isLoading={isLoading} input={
                <Tabs items={tabItems} defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
            } />
            {/* Drawer on Add/ Edit*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={refresh} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={refresh} orderList={orderList} servicesList={servicesList} userList={userList} setOpenView={setOpenView} saveData={saveData} />
            </Drawer>

            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Order'} logsList={logsList} orderList={orderList} userList={userList} servicesList={servicesList} />
            </Drawer>
        </div>
    )
}

export default OrderB;