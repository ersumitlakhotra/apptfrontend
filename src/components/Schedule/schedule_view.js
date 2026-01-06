/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Button, DatePicker, Drawer, Image, Popover, Rate, Space, Tooltip } from "antd";
import { UserOutlined, PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { firstDateOfMonth, get_Date, lastDateOfMonth, LocalDate, UTC_LocalDateTime } from "../../common/localDate";
import dayjs from 'dayjs';
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";
import { convertTo12Hour, calculateTime, getMinutes, convertMinutesIntoHours } from "../../common/general";

const ScheduleView = ({ id, refresh, userList, scheduleListAll }) => {
    const [scheduleList, setScheduleList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [startShift, setStartShift] = useState('00:00 AM');
    const [endShift, setEndShift] = useState('00:00 PM');
    const [todayHours, setTodayHours] = useState('0');
    const [isWorking, setIsWorking] = useState(false);
    const [workingDays, setWorkingDays] = useState(0);
    const [daysOff, setDayOff] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New')
    const [scheduleId, setScheduleId] = useState(0);
    const [refreshSchedule, setRefreshSchedule] = useState(0);

    useEffect(() => {
        const list = scheduleListAll.filter(item => String(item.uid) === String(id) && new Date(get_Date(item.trndate, 'YYYY-MM-DDT09:00:00')) >= new Date(fromDate) && new Date(item.trndate) <= new Date(toDate));
        setScheduleList(list)
        setFilteredList(list);
        setExportList(list);
        setPage(1, 10, list);
        setCurrentPage(1);
        setToday();
        scheduleSummary();
    }, [refresh, fromDate, toDate])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }

    const headerItems = [
        getTableItem('1', 'Date'),
        getTableItem('2', 'Start'),
        getTableItem('3', 'End'),
        getTableItem('4', 'Hours'),
        getTableItem('5', 'Status'),
        getTableItem('6', 'Last Modified')
    ];

    const setToday = () => {
        setStartShift('00:00 AM');
        setEndShift('00:00 PM');
        setTodayHours('0');
        setIsWorking(false);
        scheduleListAll.filter(item => String(item.uid) === String(id) && get_Date(item.trndate, 'YYYY-MM-DD') === LocalDate()).map(data => {
            setStartShift(convertTo12Hour(data.startshift));
            setEndShift(convertTo12Hour(data.endshift));
            const result = calculateTime(data.startshift, data.endshift);
            setTodayHours(`${result.hours}h ${result.minutes}m`);
            setIsWorking(Boolean(data.dayoff))
        })
    }
 const scheduleSummary = () => {   
     let list = scheduleListAll.filter(item => String(item.uid) === String(id) && get_Date(item.trndate, 'YYYY-MM-DD') >= fromDate && get_Date(item.trndate, 'YYYY-MM-DD') <= toDate);
        
        const workingList = list.filter(item => item.dayoff);
        setWorkingDays(workingList.length);
        setDayOff(list.filter(item => !item.dayoff).length);
        let hours=0
        workingList.map((item,index) => {
            hours += getMinutes(item.startshift, item.endshift)
        }) 
        const result = convertMinutesIntoHours(hours);
        setTotalHours(`${result.hours}h ${result.minutes}m`)
    }


    return (
        <div class="flex flex-col gap-2 mb-12  w-full">

            <div class='flex items-center justify-between'>
                <div>
                    {id === '0' ? '' :
                        userList.filter(user => user.id === id).map(a =>
                            <div key={a.id} class='flex flex-row gap-4 '>
                                {a.profilepic !== null ?
                                    <Image width={50} height={50} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                    <Avatar size={50} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                }
                                <div class='flex flex-col '>
                                    <span class="text-lg font-semibold text-gray-800 ps-1">{a.fullname}</span>
                                    <Rate disabled value={a.rating} />
                                </div>

                            </div>
                        )}
                </div>
            </div>
            <div class='flex flex-col md:flex-row gap-4 mt-6'>
                <div class='w-full md:w-9/12 bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                       
                        <div class='flex flex-col md:flex-row md:justify-end gap-4 '>
                            <Popover placement="bottom" title={"Filter by From Date"} content={
                                <div>
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        allowClear={false}
                                        value={fromDate === '' ? fromDate : dayjs(fromDate, 'YYYY-MM-DD')}
                                        onChange={(date, dateString) => setFromDate(dateString)} />
                                </div>
                            }>
                                <Button className="text-xs"><span class='font-medium'>From Date :  </span><span class='text-blue-500'> {fromDate}  </span></Button>
                            </Popover>
                            <Popover placement="bottom" title={"Filter by To Date"} content={
                                <div>
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        allowClear={false}
                                        value={toDate === '' ? toDate : dayjs(toDate, 'YYYY-MM-DD')}
                                        onChange={(date, dateString) => setToDate(dateString)} />
                                </div>
                            }>
                                <Button className="text-xs"><span class='font-medium'>To Date :  </span><span class='text-blue-500'> {toDate}  </span></Button>
                            </Popover>

                        </div>

                    <DataTable headerItems={headerItems} current={currentPage} list={scheduleList}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setItemsPerPage(pageSize);
                            setPage(page, pageSize, scheduleList)
                        }}
                        body={(
                            filteredList.map(item => {
                                const result = calculateTime(item.startshift, item.endshift);
                                return (
                                    <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                        <td class="p-3 font-bold ">{get_Date(item.trndate, 'DD MMM YYYY')}</td>
                                        <td class="p-3 ">{convertTo12Hour(item.startshift)}</td>
                                        <td class="p-3 ">{convertTo12Hour(item.endshift)}</td>
                                        <td class="p-3 font-body ">{`${result.hours}h ${result.minutes}m`}</td>
                                        <td class="p-3">{Tags(item.dayoff ? "Working" : "Day off")}</td>
                                        <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>                                     
                                    </tr>
                                )
                            })
                        )} />
                </div>

                <div class='w-full md:w-3/12  flex flex-col gap-4 '>
                    <div class='border rounded bg-white p-4 flex flex-col gap-4'>
                        <div class='flex flex-row items-center justify-between'>
                            <div class='flex flex-col'>
                                <span class="text-lg font-bold text-gray-800">Today</span>
                                <span class="text-xs text-gray-400">{UTC_LocalDateTime(LocalDate(), 'MMM DD YYYY')}</span>
                            </div>
                            {Tags(isWorking ? "Working" : "Day off")}
                        </div>

                        <div class='border rounded bg-gray-100 flex flex-col gap-2 p-4 px-8'>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Start</span>
                                <span class="font-semibold text-black">{startShift}</span>
                            </div>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">End</span>
                                <span class="font-semibold text-black">{endShift}</span>
                            </div>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Hours</span>
                                <span class="font-semibold text-black">{todayHours}</span>
                            </div>
                        </div>
                    </div>

                    <div class='border rounded bg-white p-4 flex flex-col gap-4'>
                        <div class='flex flex-row items-center justify-between'>
                            <div class='flex flex-col'>
                                <span class="text-lg font-bold text-gray-800">Schedule Summary</span>
                                <span class="text-xs text-gray-400">{`${UTC_LocalDateTime(fromDate, 'MMM DD YYYY')} - ${UTC_LocalDateTime(toDate, 'MMM DD YYYY')}`}</span>
                            </div>
                        </div>

                        <div class='border rounded bg-gray-100 flex flex-col gap-2 p-4 px-8'>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Working Days</span>
                                <span class="font-semibold text-black">{workingDays}</span>
                            </div>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Day Off</span>
                                <span class="font-semibold text-black">{daysOff}</span>
                            </div>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Total Hours</span>
                                <span class="font-semibold text-black">{totalHours}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleView;