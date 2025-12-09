import { Avatar, Button, Image, Skeleton } from "antd";
import { BarChart } from "../../components/App/Dashboard/barchart";
import { CalendarOutlined, ClockCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { get_Date, LocalDate, LocalTime, UTC_LocalDateTime } from "../../common/localDate";
import { getFutureDates } from "../../common/general";
import { PieChart } from "../../components/App/Dashboard/piechart";
import { getBorder } from "../../common/items";
import { toMinutes } from "../../common/generateTimeSlots";

const AppDashboard = ({ signout, orderList, userList }) => {

    const [barChart, setBarChart] = useState(null);
    const [pieChart, setPieChart] = useState(null);
    const [totalBookings, setTotalBookings] = useState(0);
    const [todayBookings, setTodayBookings] = useState(0);
    const [upcomingList, setUpcomingList] = useState([]);

    useEffect(() => {
        setBarChart(null);
        setPieChart(null);
        let dataArray = [];
        let totalBookings = 0;
        let futureDates = getFutureDates(7);
        futureDates.map((date) => {
            let order = orderList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') === get_Date(date.key, 'YYYY-MM-DD'));
            totalBookings += order.length;
            dataArray.push({ month: date.weekday, count: order.length });
        });
        setBarChart(<BarChart dataArray={dataArray} />)
        setTotalBookings(totalBookings)

        const upcoming = orderList.filter((item) => (toMinutes(item.start) >= toMinutes(LocalTime('HH:mm')) && get_Date(item.trndate, 'YYYY-MM-DD') === LocalDate()) || get_Date(item.trndate, 'YYYY-MM-DD') > LocalDate() );
        const sorted = upcoming.sort((a, b) => new Date(a.trndate) - new Date(b.trndate));
        setUpcomingList(sorted.slice(0, 5))

        let today = orderList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') === LocalDate());
        const pending = today.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = today.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = today.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = today.filter(a => a.status.toUpperCase() === 'CANCELLED');
        setTodayBookings(today.length)
        setPieChart(<PieChart series={[pending.length, inprogress.length, completed.length, cancelled.length]} />)
    }, [orderList])

    return (
        <div class='w-full p-4 flex flex-col gap-6 '>

            <div class='w-full flex flex-row items-center justify-between '>
                <div class='flex flex-row gap-3 items-center'>

                    {userList.profilepic !== null ?
                        <Image width={50} height={50} src={userList.profilepic} style={{ borderRadius: 24 }} /> :
                        <Avatar size={50} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }
                    <div class='flex flex-col'>
                        <p class="font-semibold">Hi, {userList.fullname}</p>
                        <p class="text-xs italic text-gray-600">Welcome Back</p>

                    </div>
                </div>
                <LogoutOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={() => signout()} />
            </div>

            <div class='h-[220px] bg-white border rounded text-gray-500'>
                {barChart === null ? <Skeleton active style={{ padding: '16px' }} /> :
                    <>
                        <div class='flex items-center justify-between px-4 '>
                            <p class='text-sm font-medium ' > Booking</p>
                            <p class='text-xl text-black font-semibold'># {totalBookings}</p>
                        </div>
                        {barChart}
                    </>
                }
            </div>

            <div class='h-[220px] bg-white border rounded text-gray-500'>
                {pieChart === null ? <Skeleton active style={{ padding: '16px' }} /> :
                    <>
                        <div class='flex items-center justify-between px-4 '>
                            <p class='text-sm font-medium ' > Today Statistics</p>
                            <p class='text-xl text-black font-semibold'># {todayBookings}</p>
                        </div>
                        {pieChart}                      
                    </>
                }
            </div>

            <div class='flex flex-col text-sm '>
                <div class='font-sans font-bold flex flex-row justify-between items-center'>
                    <p>Upcoming Tasks</p>
                    <Button color="default" variant="link" style={{ color: "gray", fontWeight: 500, fontSize: 12 }}>
                        See all
                    </Button>
                </div>
                <div class='flex overflow-x-auto [&::-webkit-scrollbar]:hidden space-x-4 py-2 ' >
                    {upcomingList.map((item) => (
                        <article
                            key={item.id}
                            role="listitem"
                            className={`flex-shrink-0 w-64 p-4 border-s-4 ${getBorder(item.status)} rounded-lg shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 ring-offset-2 ring-indigo-200`}
                            tabIndex={-1}
                        >
                            <div class='flex flex-row justify-between items-center'>
                                <h3 className="text-sm font-medium italic text-blue-400 "> # {item.order_no} </h3>
                                <p>$ {item.price}</p>
                            </div>
                            <div class='flex flex-col gap-1 mt-2 text-gray-500'>
                                <div class='inline-flex gap-2'>
                                    <ClockCircleOutlined color="black" />
                                    <p className="text-xs text-gray-500">{item.slot}</p>
                                </div>
                                <div class='inline-flex gap-2'>
                                    <CalendarOutlined />
                                    <p className="text-xs text-gray-500">{UTC_LocalDateTime(item.trndate, 'MMMM, DD YYYY')}</p>
                                </div>
                                <div class='inline-flex gap-2'>
                                    <UserOutlined />
                                    <p className="text-xs text-gray-500">{item.name} : {item.cell}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div class='flex flex-col text-sm '>
                <div class='font-sans font-bold flex flex-row justify-between items-center'>
                    <p>Your Schedule</p>
                    <Button color="default" variant="link" style={{ color: "gray", fontWeight: 500, fontSize: 12 }}>
                        See all
                    </Button>
                </div>
                <div class='flex overflow-x-auto space-x-4 py-2 '>
                    <article
                        key={1}
                        role="listitem"
                        className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 ring-offset-2 ring-indigo-200"
                        tabIndex={-1}
                    >
                        <h3 className="text-sm font-medium text-gray-800">08:00am - 02:00pm (6h) </h3>
                        <p className="text-xs text-gray-500">Dec 09, 2025 (Tuesday)</p>
                    </article>
                </div>
            </div>

        </div>
    )
}

export default AppDashboard;