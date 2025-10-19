/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Space, Tabs, Tag } from "antd";
import {  PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import OrderDetail from "../../components/Order/order_detail";
import OrderView from "../../components/Order/order_view";
import {  getTabItems } from "../../common/items.js";
import OrderTabs from "../../components/Order/tab.js";
import { LocalDate, get_Date } from "../../common/localDate.js";
import LogsView from "../../components/Logs/logs_view.js";
import ExportToExcel from "../../common/export.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Order = ({ orderList, servicesList, userList, companyList, eventList, logsList, saveData, fromDate, setFromDate, toDate, setToDate }) => {
    const ref = useRef();

    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openLogs, setOpenLogs] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [order_no, setOrderNo] = useState('');

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Order" : `Edit Order - ${order_no}`);
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }
    const btn_ViewClick = (id) => {
        setRefresh(refresh + 1);
        setId(id);
        setOpenView(true);
    }
    const btn_LogsClick = (id) => {
        setId(id);
        setOpenLogs(true);
    }

    const [ordersList, setOrdersList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
    const [exportList, setExportList] = useState([]);
   
    useEffect(() => {
        if (fromDate === '')
            setFromDate(LocalDate());

        if (toDate === '')
            setToDate(LocalDate());

        load();
    }, [orderList, fromDate, toDate])

    const load = async () => {
        const order = orderList.filter(a => get_Date(a.trndate,'YYYY-MM-DD') >= fromDate && get_Date(a.trndate,'YYYY-MM-DD') <= toDate);
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
        getTabItems('1', customLabelTab("All", "cyan", ordersList.length), null, <OrderTabs key={1} orderList={ordersList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('2', customLabelTab("Pending", "yellow", pendingList.length), null, <OrderTabs key={2} orderList={pendingList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('3', customLabelTab("InProgress", "blue", inprogressList.length), null, <OrderTabs key={3} orderList={inprogressList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('4', customLabelTab("Completed", "green", completedList.length), null, <OrderTabs key={4} orderList={completedList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('5', customLabelTab("Cancelled", "red", cancelledList.length), null, <OrderTabs key={5} orderList={cancelledList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} btn_ViewClick={btn_ViewClick} btn_LogsClick={btn_LogsClick} refresh={refresh} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
    ];
  

    const btnSave = async () => {
        await ref.current?.save();
    }


    return (
        <div class="flex flex-col gap-4 mb-12 w-full">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Order</span>
                <div class="flex gap-2">             
                    <ExportToExcel data={exportList} fileName="Order" servicesList={servicesList} userList={userList} />
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create order</Button>
                </div>
            </div>  

            <Tabs items={tabItems} defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
        
            {/* Drawer on Add/ Edit*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={refresh} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor:'#F9FAFB'}} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={refresh} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList}  setOpen={setOpen} />
            </Drawer>

            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Order'} logsList={logsList} orderList={orderList} userList={userList} servicesList={servicesList} />
            </Drawer>
        </div>
    )
}

export default Order;