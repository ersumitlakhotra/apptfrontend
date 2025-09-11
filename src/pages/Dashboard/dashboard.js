import Card from "../../components/Dashboard/Header/card.js";
import Statistics from "../../components/Dashboard/Statistics/statistics.js";
import {  getItem } from "../../common/items.js";
import Appointment from "../../components/Dashboard/Appointments/appointment.js";
import { YearsList } from "../../common/yearslist.js";
import AnnualReport from "../../components/Dashboard/AnnualReport/annual_report.js";
import Task from "../../components/Dashboard/Task/task.js";
import LiveEvent from "../../components/Dashboard/LiveEvent/live_event.js";
import RecentActivities from "../../components/Dashboard/RecentActivities/recent_activities.js";


const Dashboard = ({ orderList, expensesList, servicesList, userList, eventList, logsList, onSelected }) => {  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
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
                    <RecentActivities orderList={orderList} userList={userList} eventList={eventList} servicesList={servicesList} expensesList={expensesList} logsList={logsList} />  
                    <Statistics orderList={orderList} />                        
                </div>
            </div>   

        </div>
    )
}

export default Dashboard;