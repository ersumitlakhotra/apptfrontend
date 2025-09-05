import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { firstDateOfMonth, lastDateOfMonth } from "../../../common/localDate";
import {  PieChart, StackedBarChart } from "../Charts/charts";

const Task = ({ orderList, userList, refresh }) => {
    const [chart, setChart] = useState(null);
    const [stackedchart, setStackedChart] = useState(null);
    const [currentOption, setCurrentOption] = useState('Today');
    const items = [
        { key: 'Today', label: 'Today' },
        { key: 'This Month', label: 'This Month' },
        { key: 'This Year', label: 'This Year' },
    ];
    const onItemChanged = e => { setCurrentOption(e.key) };
    const menuProps = { items, onClick: onItemChanged, };

    useEffect(() => {
        let frmMonth = dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD");
        let toMonth = dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD");
        let year = new Date().getFullYear();
        let jan = new Date(year, 0, 1);
        let dec = new Date(year, 11, 31);
        const total = (
            currentOption === 'Today' ? orderList.filter(a => dayjs().format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD')) :
                currentOption === 'This Month' ? orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frmMonth && dayjs(a.trndate).format('YYYY-MM-DD') <= toMonth) :
                    orderList.filter(a => orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= jan && dayjs(a.trndate).format('YYYY-MM-DD') <= dec )))

        const pending = total.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = total.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = total.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = total.filter(a => a.status.toUpperCase() === 'CANCELLED');  

        let categories = [], pendingStacked = [], inprocessStacked = [], completedStacked = [], cancelledStacked = [];
        userList.map(user => {
            categories.push(user.fullname);
            pendingStacked.push(pending.filter(a => a.assignedto === user.id).length)
            inprocessStacked.push(inprogress.filter(a => a.assignedto === user.id).length)
            completedStacked.push(completed.filter(a => a.assignedto === user.id).length)
            cancelledStacked.push(cancelled.filter(a => a.assignedto === user.id).length)
        })
        setChart(<PieChart series={[pending.length, inprogress.length, completed.length, cancelled.length]} />)
        setStackedChart(<StackedBarChart categories={categories} pending={pendingStacked} inprogress={inprocessStacked} completed={completedStacked} cancelled={cancelledStacked} />)
    }, [refresh, currentOption]) 

    return (
        <div class='flex flex-col gap-4 w-full'>
            <div class='flex justify-between items-center'>
                <span class="text-lg font-semibold text-gray-800">Tasks</span>
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            {currentOption}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
            <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2 md:flex-row'>
                <div class='w-full md:w-1/2'>
                    {stackedchart} 
                </div>  
                <div class='w-full md:w-1/2'>
                    {chart}
                </div>
                
            </div>
        </div>
    )
}
export default Task