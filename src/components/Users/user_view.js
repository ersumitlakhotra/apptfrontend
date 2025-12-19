/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, DatePicker,  Image,  Popover, Rate, Tooltip } from "antd";
import {  UserOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { firstDateOfMonth, get_Date, lastDateOfMonth, LocalDate, UTC_LocalDateTime } from "../../common/localDate";
import dayjs from 'dayjs';
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";

function convertTo12Hour(time24) {
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 → 12
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}
const UserView = ({ id, refresh, userList, scheduleListAll, setOpenView, saveData }) => {
    const [scheduleList, setScheduleList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    useEffect(() => {
        const list = scheduleListAll.filter(item => String(item.uid) === String(id) && new Date(get_Date(item.trndate, 'YYYY-MM-DDT09:00:00')) >= new Date(fromDate) && new Date(item.trndate) <= new Date(toDate));
        setScheduleList(list)
        setFilteredList(list);
        setExportList(list);
        setPage(1, 10, list);
    }, [id])

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
        getTableItem('4', 'Status'),
        getTableItem('5', 'Last Modified'),
        getTableItem('6', 'Action'),
    ];
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
                <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large">Add schedule</Button>
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 mt-4 '>
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

                <DataTable headerItems={headerItems} list={filteredList}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize);
                        setPage(page, pageSize, scheduleList)
                    }}
                    body={(
                        filteredList.map(item => (
                            <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                <td class="p-3 font-bold ">{get_Date(item.trndate, 'DD MMM YYYY')}</td>
                                <td class="p-3 ">{convertTo12Hour(item.startshift)}</td>
                                <td class="p-3 ">{convertTo12Hour(item.endshift)}</td>
                                <td class="p-3">{Tags(item.dayoff ? "Working":"Day off")}</td>
                                <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                                <td class="p-3">
                                    <Tooltip placement="top" title={'Edit'} >
                                        <Button type="link" icon={<EditOutlined />} />
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    )} />
            </div>
        </div>
    )
}

export default UserView;