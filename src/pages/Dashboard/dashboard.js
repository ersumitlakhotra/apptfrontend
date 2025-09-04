import DashHeaderItems from "../../components/Dashboard/HeaderItems/dashboard_header_Items";
import Cards from "../../components/Dashboard/cards";
import { Avatar, Badge, Button, Card, Dropdown, Flex, Image, Space, Tag } from "antd";
import { AreaChart, BarChart, PieChart } from "../../components/Dashboard/Charts/charts";
import { useEffect, useState } from "react";
import Statistics from "../../components/Dashboard/statistics";

import { firstDateOfMonth, lastDateOfMonth, LocalDate } from "../../common/localDate.js";
import { DownloadOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Chart from "react-apexcharts";
import dayjs from 'dayjs';
import { Sort } from "../../common/sort";
import Performance from "../../components/Dashboard/performance";
import OrderTabs from "../../components/Order/tab";
import { getBorder } from "../../common/items.js";
import { Tags } from "../../common/tags.js";


const Dashboard = ({ orderList, expensesList, servicesList, userList, eventList, onSelected }) => {
    const dashHeaderItems = DashHeaderItems;

    const [areaChart, setAreaChart] = useState(null);
    const [currentYearArea, setCurrentYearArea] = useState(new Date().getFullYear());

    const [barChart, setBarChart] = useState(null);
    const [currentYearBar, setCurrentYearBar] = useState(new Date().getFullYear());

    const [pieChart, setPieChart] = useState(null);
    const [pieChartOption, setPieChartOption] = useState('Today');

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const [refresh, setRefresh] = useState(0);
    const [performanceList, setPerformanceList] = useState([]);
    const [performanceMax, setPerformanceMax] = useState(0);

    const [totalList, setTotalList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
    const [liveList, setLiveList] = useState([]);

    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    useEffect(() => {
        const total = orderList.filter(a => dayjs().format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        const pending = total.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = total.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = total.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = total.filter(a => a.status.toUpperCase() === 'CANCELLED');
        const sortedTotal = [...total].sort((a, b) => new Date(b.modifiedat) - new Date(a.modifiedat));

        setTotalList(sortedTotal.length > 0 ? sortedTotal : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

        if (userList !== null) {
            const performance = userList.map(a => ({ key: a.id, fullname: a.fullname, count: total.filter(b => b.assignedto === a.id).length }))
            const sortedList = Sort('count', 'desc', performance);
            setPerformanceList(sortedList);
            if (sortedList.length > 0)
                setPerformanceMax(sortedList[0].count)
            else
                setPerformanceMax(0)
        }

        const dates = [];
        const todayNumber = dayjs().get('day');
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - todayNumber + i); // Subtract 'i' days from the current date
            const dayOfWeekNumber = dayjs(d).get('day');
            dates.push({ key: i, day: weekdays[dayOfWeekNumber], count: orderList.filter(a => dayjs(d).format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD')).length }); // Format as desired

        }// Reverse to get chronological order
        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])
    }, [refresh, userList])

    useEffect(() => {
        let dataArray = [];
        months.map((a, index) => {
            let date = currentYearBar + '-' + String(index + 1).padStart(2, '0') + '-02T00:00:00';
            let frm = dayjs(firstDateOfMonth(new Date(date))).format("YYYY-MM-DD");
            let to = dayjs(lastDateOfMonth(new Date(date))).format("YYYY-MM-DD");
           
            const order = orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to);        
            dataArray.push({ month: a, count: order.length });
        })
       
        setBarChart(<BarChart dataArray={dataArray} />)          
    }, [currentYearBar])

    useEffect(() => {
        let salesArray = [];
        let expenseArray = [];
        months.map((a, index) => {
            let date = currentYearArea + '-' + String(index + 1).padStart(2, '0') + '-02T00:00:00';
            let frm = dayjs(firstDateOfMonth(new Date(date))).format("YYYY-MM-DD");
            let to = dayjs(lastDateOfMonth(new Date(date))).format("YYYY-MM-DD");
            let totalSale = 0; let totalExpense = 0;
            const order = orderList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b => {
                totalSale += parseFloat(b.total);
            });
            const expense = expensesList.filter(a => dayjs(a.trndate).format('YYYY-MM-DD') >= frm && dayjs(a.trndate).format('YYYY-MM-DD') <= to).map(b => {
                totalExpense += parseFloat(b.grossamount);
            });
            salesArray.push(totalSale);
            expenseArray.push(totalExpense);
        })

        setAreaChart(<AreaChart sales={salesArray} expense={expenseArray} categoriesArray={months} />);
        setPieChart(<PieChart series={[12, 25, 66, 36]} />)
    }, [ currentYearArea])

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const items = [
        { key: '2025', label: '2025' },
        { key: '2026', label: '2026' },
        { key: '2027', label: '2027' },
        { key: '2028', label: '2028' },
    ];
    const setBarGraphYear = e => {
        setCurrentYearBar(e.key)
    };
    const setAreaGraphYear = e => {
        setCurrentYearArea(e.key)
    };
    const menuPropsBar = {
        items,
        onClick: setBarGraphYear,
    };
    const menuPropsArea = {
        items,
        onClick: setAreaGraphYear,
    };

    const itemsPie = [
        { key: 'Today', label: 'Today' },
        { key: 'This Month', label: 'This Month' },
        { key: 'This Year', label: 'This Year' },
    ];
    const setPieChartOpt = e => {
        setPieChartOption(e.key)
    };
    const menuPropsPie = {
        items:itemsPie,
        onClick: setPieChartOpt,
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

            <div class='flex flex-col gap-4 mt-4  w-full md:flex-row'>

                <div class='flex flex-col gap-4 w-full md:w-4/6'>
                    <div class='flex flex-col gap-4 w-full'>
                        <div class='flex justify-between items-center'>
                            <span class="text-lg font-semibold text-gray-800">Appointments</span>
                            <Dropdown menu={menuPropsBar}>
                                <Button>
                                    <Space>
                                        {currentYearBar}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {barChart}
                        </div>
                    </div>
                    <div class='flex flex-col gap-4 w-full'>
                        <div class='flex justify-between items-center'>
                            <span class="text-lg font-semibold text-gray-800">Annual Report</span>
                            <Dropdown menu={menuPropsArea}>
                                <Button>
                                    <Space>
                                        {currentYearArea}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {areaChart}
                        </div>
                    </div>

                    <div class='flex flex-col gap-4 w-full'>
                        <div class='flex justify-between items-center'>
                            <span class="text-lg font-semibold text-gray-800">Tasks</span>
                            <Dropdown menu={menuPropsPie}>
                                <Button>
                                    <Space>
                                        {pieChartOption}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {pieChart}
                        </div>
                    </div>
                </div>

                <div class='flex flex-col gap-4 w-full md:w-2/6'>

                    <div class='flex flex-col gap-4 w-full'>  
                        <div class='flex justify-between items-center'>
                            <Badge count={liveList.length} color="#52c41a" offset={[15, 10]}>
                                <span class="text-lg font-semibold text-gray-800">Live Events</span>
                            </Badge>
                            <Button color="primary" variant="outlined" onClick={() => onSelected('Event')} >
                                View all
                            </Button>
                        </div>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto'>
                            <div class=' flex flex-col gap-4 mb-4'>
                                {liveList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any live events going on right now.</p>:  
                                liveList.map(item =>
                                    <div key={item.id} class={` text-xs flex flex-col gap-1 border-s-4 p-2 border-s-green-300 bg-green-50  text-green-500`}>
                                        <div class='flex items-center justify-between font-medium'>
                                            <p class='text-sm' > {item.title}</p>
                                            <p>$ {item.total}</p>
                                        </div>
                                        <div class='flex items-center justify-between font-medium'>
                                            <span class="text-gray-500">{dayjs(item.startdate).format('ddd, MMM DD')} - {dayjs(item.enddate).format('ddd, MMM DD')}</span>
                                            <p>{item.coupon}</p>
                                        </div>
                                        <div class='flex flex-col overflow-hidden whitespace-nowrap'>
                                            {item.serviceinfo !== null &&
                                                servicesList.filter(a =>
                                                    item.serviceinfo.some(b => b === a.id)
                                                ).map(c => <Tag key={c.id} color="green" bordered={false}>{c.name}</Tag>)
                                            }
                                        </div>
                                    </div>
                                )}
                                
                            </div>                   
                        </div>
                    </div>
                    <div class='flex flex-col gap-4 w-full'>
                        <span class="text-lg font-semibold text-gray-800">Recent Activities </span>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto flex flex-col gap-2'>
                            <div class=' flex flex-col gap-4 mb-4'>
                                {totalList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any activity to show right now.</p> :
                                   totalList.map(item =>
                                    <>                                      
                                        <Badge.Ribbon 
                                            text={new Date(item.modifiedat) === new Date(item.createdat) ?"Created":"Modified"} 
                                               color={new Date(item.modifiedat) === new Date(item.createdat) ? "yellow" : "blue"} >
                                               <Card title={
                                                   item.assignedto === '0' ? '' :
                                                       userList.filter(user => user.id === item.assignedto).map(a =>
                                                           <div key={a.id} class='flex flex-row gap-2 items-center text-sm'>
                                                               {a.profilepic !== null ?
                                                                   <Image width={24} height={24} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                                                   <Avatar size={24} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                                               }
                                                               <span class='text-xs  text-gray-500'>{a.fullname}</span>
                                                           </div>
                                                       )
                                               } 
                                               size="small" backgroundColor='gray'>
                                               <div class='flex flex-col gap-2'>
                                                       <div class='flex items-center justify-between'>
                                                           <span class="text-blue-500 italic hover:underline cursor-pointer"  ># {item.order_no}</span>
                                                           <span class="">{Tags(item.status)}</span>
                                                       </div>
                                               </div>
                                                   
                                            </Card>
                                        </Badge.Ribbon>
                                    </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='flex flex-col gap-4 mt-4  md:flex-row'>

                <div class='flex flex-col  gap-4 w-full md:w-1/3'>
                    <span class="text-lg font-semibold text-gray-800">Statistics</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-6 '>
                        <Statistics key={1} label={"Total"} value={completedList.length + cancelledList.length} total={totalList.length} strokeColor={twoColors} />
                        <Statistics key={2} label={"Pending"} value={pendingList.length} total={totalList.length} strokeColor='#ffff66' />
                        <Statistics key={3} label={"In process"} value={inprogressList.length} total={totalList.length} strokeColor='#66a3ff' />
                        <Statistics key={4} label={"Completed"} value={completedList.length} total={totalList.length} strokeColor='#66ff66' />
                        <Statistics key={5} label={"Cancelled"} value={cancelledList.length} total={totalList.length} strokeColor='#ff6666' />

                    </div>
                </div>

                <div class='flex flex-col gap-4  w-full md:w-1/3'>
                    <span class="text-lg font-semibold text-gray-800">Performance</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-2 '>
                        <div class='flex flex-row items-center sticky z-10  bg-white mb-2'>
                                <span class="w-10/12 text-sm font-medium ">Name</span>
                                <span class="w-2/12 text-sm font-medium flex justify-center">Count</span>
                        </div>
                        <div class='flex h-[17rem] flex-col gap-2 overflow-y-auto'>
                            {performanceList.map(a => {
                                const width = (performanceMax !== 0 && a.count !== 0) ? `w-[${Math.round(a.count * 100 / performanceMax)}%]` : 'w-[0%]';
                                return (
                                    <Performance key={a.id} label={a.fullname} value={a.count} width={width}/>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div class='flex flex-col  gap-4 w-full md:w-1/3'>
                    <span class="text-lg font-semibold text-gray-800">7d Records</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-6 '>
                        {barChart}
                    </div>
                </div>
            </div>     

        </div>
    )
}

export default Dashboard;