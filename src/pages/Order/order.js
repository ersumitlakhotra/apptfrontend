import { Button, DatePicker, Divider, Drawer, Input, Select, Space, Tabs, Tag } from "antd";
import { DownloadOutlined, PlusOutlined, SearchOutlined, SaveOutlined, ClockCircleOutlined } from '@ant-design/icons';
import OrderTable from "../../components/Order/order_table.js"
import { useEffect, useRef, useState } from "react";
import useAlert from "../../common/alert";
import { apiCalls } from "../../hook/apiCall";
import OrderDetail from "../../components/Order/order_detail";
import { getTabItems } from "../../common/items.js";
import Heading from "../../common/heading.js";

import Chart from "react-apexcharts";
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

const Order = ({ orderList, servicesList, userList, tabActiveKey, setTabActiveKey, saveData }) => {
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

    const tabItems = [
        getTabItems('1', customLabelTab("All", "blue", "5"), null, <OrderTabs orderList={orderList} servicesList={servicesList} userList={userList} btn_Click={btn_Click} />),
        getTabItems('2', customLabelTab("Pending", "yellow", "10"), null, <OrderTabs orderList={orderList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} />),
        getTabItems('3', customLabelTab("Completed", "green", "10"), null, <OrderTabs orderList={orderList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} />),
        getTabItems('4', customLabelTab("Cancelled", "red", "10"), null, <OrderTabs orderList={orderList} servicesList={servicesList} userList={userList}  btn_Click={btn_Click} />),
    ];
  

    const btnSave = async () => {
        await ref.current?.save();
    }
    
    return (
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Order</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create order</Button>
                </div>
            </div>

            <div class='flex flex-col gap-2 md:flex-row '>
                <div class='w-full bg-white border rounded p-2'>
                    <Heading label={"Working"} desc={"4 order is in progress "} icon={<SiTicktick size={26}/>} />
                    <div class='mx-8 my-2 overflow-scroll overflow-y-hidden flex flex-row gap-4 p-2'>
                        <WorkingCard key={1} />
                    </div>
                </div>
                <div class='w-full bg-white border rounded p-2'>
                    <Heading label={"Available"} desc={"Sort of ready and able to take on new tasks"} icon={<MdOutlineAssignmentInd size={26} />} />
                    <div class='mx-8 my-2 overflow-scroll overflow-y-hidden flex flex-row gap-4 p-2 pb-14'>
                        <AvailableCard key={1} />
                    </div>
                </div>
            </div>

            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
        
            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <OrderDetail id={id} refresh={refresh} ref={ref} orderList={orderList} servicesList={servicesList} userList={userList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

        </div>
    )
}

export default Order;