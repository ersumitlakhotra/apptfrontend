import { Button, Drawer, Space, Tabs, Tag } from "antd";
import { DownloadOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import OrderDetail from "../../components/Order/order_detail";
import { getTabItems } from "../../common/items.js";
import Heading from "../../common/heading.js";
import dayjs from 'dayjs';
import { SiTicktick } from "react-icons/si";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { AvailableCard, WorkingCard } from "../../components/Order/card.js";
import OrderTabs from "../../components/Order/tab.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Order1 = ({ orderList, servicesList, userList, companyList, tabActiveKey, setTabActiveKey, saveData }) => {
    const ref = useRef();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Order" : "Edit Order");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }

    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);

    useEffect(() => {
        const pending = orderList.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = orderList.filter(a => a.status.toUpperCase() === 'IN PROGRESS' && dayjs().format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        const completed = orderList.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = orderList.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

    }
        , [refresh])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "blue", orderList.length), null, <OrderTabs key={1} orderList={orderList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} />),
        getTabItems('2', customLabelTab("Pending", "yellow", pendingList.length), null, <OrderTabs key={2} orderList={pendingList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} />),
        getTabItems('3', customLabelTab("Completed", "green", completedList.length), null, <OrderTabs key={3} orderList={completedList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} />),
        getTabItems('4', customLabelTab("Cancelled", "red", cancelledList.length), null, <OrderTabs key={4} orderList={cancelledList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} />),
    ];


    const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="flex flex-col gap-4 mb-12 w-full">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Order</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create order</Button>
                </div>
            </div>



            <div class='flex flex-col gap-2 border md:flex-row '>

                <div class='w-full bg-white border rounded p-2 overflow-hidden'>
                    <Heading label={"Working"} desc={`${inprogressList.length} order is in progress `} icon={<SiTicktick size={26} />} />
                    <div class={`mx-8 my-2  overflow-x-scroll overflow-y-hidden flex flex-row gap-3 p-2 pb-8`}>
                        {inprogressList.map((a) => (
                            <WorkingCard key={a.id} order_no={a.order_no} slot={a.slot} assignedto={a.assignedto} serviceinfo={a.serviceinfo} userList={userList} servicesList={servicesList} />
                        ))}
                    </div>
                </div>

                <div class='w-full bg-white border rounded p-2 overflow-hidden '>
                    <Heading label={"Available"} desc={"Sort of ready and able to take on new tasks"} icon={<MdOutlineAssignmentInd size={26} />} />
                    <div class={`mx-8 my-2  overflow-x-scroll overflow-y-hidden flex flex-row gap-3 p-2 pb-8`}>
                        <AvailableCard key={1} />
                        <AvailableCard key={2} />
                        <AvailableCard key={3} />
                        <AvailableCard key={4} />
                    </div>
                </div>
            </div>

            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={refresh} ref={ref} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

        </div>
    )
}

export default Order1;