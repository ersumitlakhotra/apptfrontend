import Card from "../../components/Dashboard/Header/card.js";
import { useEffect, useState } from "react";
import Statistics from "../../components/Dashboard/statistics";
import dayjs from 'dayjs';
import {  getItem } from "../../common/items.js";
import Appointment from "../../components/Dashboard/Appointments/appointment.js";
import { YearsList } from "../../common/yearslist.js";
import AnnualReport from "../../components/Dashboard/AnnualReport/annual_report.js";
import Task from "../../components/Dashboard/Task/task.js";
import LiveEvent from "../../components/Dashboard/LiveEvent/live_event.js";
import RecentActivities from "../../components/Dashboard/RecentActivities/recent_activities.js";


const Dashboard = ({ orderList, expensesList, servicesList, userList, eventList, onSelected }) => {  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
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
        const sortedTotal = [...total].sort((a, b) => new Date(b.modifiedat) - new Date(a.modifiedat));

        setTotalList(sortedTotal.length > 0 ? sortedTotal : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])  
    }, [orderList])  

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    }; 

    const dashHeaderItems = [
        getItem('1', 'Total Page Views', '4,500'),
        getItem('2', 'Revenue Over Time', '51,000'),
        getItem('3', '7d Task Completed', '96'),
        getItem('4', 'Task By Users', '563'),
    ];
    return (
        <div class="flex flex-col gap-4 mb-12">

            {/* cards*/}
            <span class="text-lg font-semibold text-gray-800">Dashboard</span>         
            <div class='flex flex-col gap-6 md:flex-row '>
                {dashHeaderItems.map(items => (
                    <Card key={items.key} title={items.label} value={items.value} />
                ))}
            </div>

            <div class='flex flex-col gap-4 mt-4  w-full md:flex-row'>
                <div class='flex flex-col gap-4 w-full md:w-4/6'>
                    <Appointment orderList={orderList} yearList={YearsList(2023)} months={months} />
                    <AnnualReport orderList={orderList} expensesList={expensesList} yearList={YearsList(2023)} months={months} />   
                    <Task orderList={orderList} userList={userList} />                   
                </div>
                <div class='flex flex-col gap-4 w-full md:w-2/6'>
                    <LiveEvent eventList={eventList} servicesList={servicesList} onSelected={onSelected} />
                    <RecentActivities orderList={orderList} userList={userList} />  

                    <span class="text-lg font-semibold text-gray-800">Statistics</span>
                    <div class='w-full h-96  bg-white border rounded p-5 text-gray-500 flex flex-col gap-6 '>
                        <Statistics key={1} label={"Total"} value={completedList.length + cancelledList.length} total={totalList.length} strokeColor={twoColors} />
                        <Statistics key={2} label={"Pending"} value={pendingList.length} total={totalList.length} strokeColor='#ffff66' />
                        <Statistics key={3} label={"In process"} value={inprogressList.length} total={totalList.length} strokeColor='#66a3ff' />
                        <Statistics key={4} label={"Completed"} value={completedList.length} total={totalList.length} strokeColor='#66ff66' />
                        <Statistics key={5} label={"Cancelled"} value={cancelledList.length} total={totalList.length} strokeColor='#ff6666' />

                    </div>           
                </div>
            </div>   

        </div>
    )
}

export default Dashboard;