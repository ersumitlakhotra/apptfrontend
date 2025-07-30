import DashHeaderItems from "../../components/Dashboard/HeaderItems/dashboard_header_Items";
import Cards from "../../components/Dashboard/cards";
import { Button, Flex } from "antd";
import { AreaChart } from "../../components/Dashboard/Charts/charts";
import { useEffect, useState } from "react";
import Statistics from "../../components/Dashboard/statistics";

import Chart from "react-apexcharts";
import dayjs from 'dayjs';
import { Sort } from "../../common/sort";
import Performance from "../../components/Dashboard/performance";
const handleButtonClick = e => {

    console.log('click left button', e);
};
const handleMenuClick = e => {

    console.log('click', e);
};
const items = [
    {
        label: 'Today',
        key: '1',
    },
    {
        label: 'This Week',
        key: '2',
    },
    {
        label: 'This Month',
        key: '3',
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};


const Dashboard = ({ orderList, servicesList, userList }) => {
    const dashHeaderItems = DashHeaderItems;
    const [areaChart, setAreaChart] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [performanceList, setPerformanceList] = useState([]);
    const [performanceMax, setPerformanceMax] = useState(0);

    const [totalList, setTotalList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
   
    useEffect(() => {
        const total = orderList.filter(a => dayjs().format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        const pending = total.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = total.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = total.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = total.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setTotalList(total.length > 0 ? total : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

        setAreaChart(<AreaChart />);
    }
    , [refresh])

    useEffect(() => {
        if (userList !== null) {
            const performance = userList.map(a => ({ key: a.id, fullname: a.fullname, count: totalList.filter(b => b.assignedto === a.id).length }))
            const sortedList = Sort('count', 'desc', performance);
            setPerformanceList(sortedList);
            if (sortedList.length > 0)
            setPerformanceMax(sortedList[0].count)
            else
                setPerformanceMax(0)
        }
    }, [userList])

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    return (
        <div class="flex flex-col gap-4 mb-12">
            <span class="text-lg font-semibold text-gray-800">Dashboard</span>
            {/* cards*/}
            <div class='flex flex-col gap-6 md:flex-row '>
                {dashHeaderItems.map(items => (
                    <Cards key={items.key} label={items.label} value={items.value} />
                ))}
            </div>

            <div class='flex flex-col gap-4 mt-4  md:flex-row'>

                <div class='flex flex-col  gap-4 w-full md:w-1/3'>
                    <span class="text-lg font-semibold text-gray-800">Statistics</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-6 '>
                        <Statistics key={1} label={"Total"} value={completedList.length + cancelledList.length} total={totalList.length} strokeColor={twoColors} />
                        <Statistics key={2} label={"Pending"} value={pendingList.length} total={totalList.length} strokeColor='#ffff99' />
                        <Statistics key={3} label={"In process"} value={inprogressList.length} total={totalList.length} strokeColor='#99c2ff' />
                        <Statistics key={4} label={"Completed"} value={completedList.length} total={totalList.length} strokeColor='#99ff99' />
                        <Statistics key={5} label={"Cancelled"} value={cancelledList.length} total={totalList.length} strokeColor='#ff9999' />

                    </div>
                </div>
                <div class='flex flex-col gap-4  w-full md:w-1/3'>
                    <span class="text-lg font-semibold text-gray-800">Performance</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-2 '>
                        <div class='flex flex-row items-center sticky z-10 top-0 bg-white mb-2'>
                                <span class="w-10/12 text-sm font-medium ">Name</span>
                                <span class="w-2/12 text-sm font-medium flex justify-center">Count</span>
                        </div>
                        <div class='flex h-[17rem] flex-col gap-2 overflow-y-auto'>
                            {performanceList.map(a => {
                                const width = (performanceMax !== 0 && a.count !== 0) ? `w-[${Math.round(a.count * 100 / performanceMax)}%]` : 'w-[0%]';
                                console.log(width)
                                return (
                                    <Performance key={a.id} label={a.fullname} value={a.count} width={width}/>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

            <div class='flex flex-col gap-4 mt-4 md:flex-row'>
                <div class='flex flex-col gap-4 w-full md:w-3/5'>
                    <div class='flex justify-between'>
                        <span class="text-lg font-semibold text-gray-800">Statistics</span>
                        <Flex gap="small" wrap>
                            <Button color="primary" variant="outlined" onClick={() =>setRefresh(refresh+1)}>
                                Month
                            </Button>
                            <Button color="default" variant="text" onClick={() => setRefresh(refresh + 1)}> 
                                Week
                            </Button>
                        </Flex>
                    </div>
                    <div class='w-full  bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                        {areaChart}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard;