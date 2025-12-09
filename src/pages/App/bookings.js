/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Image, Skeleton } from "antd";
import { BarChart } from "../../components/App/Dashboard/barchart";
import { CalendarOutlined, ClockCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { get_Date, LocalDate, LocalTime, UTC_LocalDateTime } from "../../common/localDate";
import { getFutureDates } from "../../common/general";
import { PieChart } from "../../components/App/Dashboard/piechart";
import { getBorder } from "../../common/items";
import { toMinutes } from "../../common/generateTimeSlots";

const AppBooking = ({ signout, orderList, userList }) => {

    const [totalBookings, setTotalBookings] = useState(0);
    const [todayBookings, setTodayBookings] = useState(0);
    const [filteredList, setFilteredList] = useState([]);
    const [dateAvailable, setDateAvailable] = useState([]);
    const [trnDate, setTrnDate] = useState(LocalDate());
    const [header, setHeader] = useState('');

    useEffect(() => {
        setDateAvailable(getFutureDates(15));   
        let today = orderList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') === LocalDate());
        const pending = today.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = today.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = today.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = today.filter(a => a.status.toUpperCase() === 'CANCELLED');
        setTodayBookings(today.length)
    }, [])

    useEffect(() => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date(trnDate);
        const yyyy = date.getFullYear();
        const mm = monthNames[date.getMonth()];
        setHeader(`${mm} ${yyyy}`);

        setFilteredList(orderList.filter(a => get_Date(a.trndate, 'YYYY-MM-DD') === get_Date(trnDate, 'YYYY-MM-DD') ));

    }, [trnDate])

    return (
        <div class='w-full flex flex-col gap-6 '>

            <div class='p-2 sticky top-0 border-b-2 shadow-md z-50 text-gray-500 bg-white font-medium flex flex-col gap-6'>
                <p class='flex flex-row justify-center items-center font-sans font-bold mt-2 '>{header}</p>
                <div class='overflow-x-auto flex flex-row gap-3 pb-4 text-sm [&::-webkit-scrollbar]:hidden'>
                    {dateAvailable.map(item =>
                        <div key={item.key} class='flex-col w-10 gap-2' onClick={() => setTrnDate(UTC_LocalDateTime(item.key, 'YYYY-MM-DD'))} >
                            <div class={`border w-10 h-12 rounded-xl flex justify-center items-center p-2 ${UTC_LocalDateTime(item.key, 'YYYY-MM-DD') === trnDate ? 'bg-cyan-400 text-white font-bold' : 'bg-gray-50'} shadow-sm cursor-pointer`} >{item.label}</div>
                            <p class='text-xs text-gray-400 flex justify-center items-center'>{item.weekday}</p>
                        </div>
                    )}
                </div>             
            </div>

            <div class='p-4 flex flex-col gap-4'>
                {filteredList.map((item) => (
                    <div class='flex flex-row gap-2'>
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
                    </div>
                ))}
            </div>



         

        </div>
    )
}

export default AppBooking;