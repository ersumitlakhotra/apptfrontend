/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Tooltip,  Popover, DatePicker } from "antd";
import { EditOutlined, ContainerOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Tags } from "../../common/tags";
import dayjs from 'dayjs';
import { getTableItem } from "../../common/items";
import DataTable from "../../common/datatable";
import { useEffect, useState } from "react";
import Services from "../../common/services";
import { get_Date, UTC_LocalDateTime } from "../../common/localDate";

const Events = ({ eventList, servicesList, btn_Click, btn_LogsClick, fromDate, setFromDate, toDate, setToDate, setExportList }) => {
    const [searchInput, setSearchInput] = useState('');

    const [filteredList, setFilteredList] = useState(eventList);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    

    useEffect(() => {
        setFilteredList(eventList)
        setExportList(eventList);
        setPage(1, 10, eventList);
    }, [eventList])

    useEffect(() => {
        const searchedList = eventList.filter(item =>
            (item.title.toLowerCase().includes(searchInput.toLowerCase())));
        setExportList(searchedList);
        if (searchInput === '')
            setPage(currentPage, itemsPerPage, searchedList)
        else
            setPage(1, itemsPerPage, searchedList)
    }, [searchInput])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
    const headerItems = [
        getTableItem('1', 'Name'),
        getTableItem('2', 'Description'),
        getTableItem('3', 'Services'),
        getTableItem('4', 'Coupon'),
        getTableItem('5', 'Amount'),
        getTableItem('6', 'Date'),
        getTableItem('7', 'Status'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/3'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
               </div>
                <div class='w-full md:w-2/3'>
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
                    {/**/}
                </div>
            </div>
            <DataTable headerItems={headerItems} list={searchInput === '' ? eventList : filteredList}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, eventList)
                }}
                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 text-sm font-semibold">{item.title}</td>
                            <td class="p-3 text-gray-500">{item.description}</td>
                            <td class="p-3"><Services servicesItem={item.serviceinfo} servicesList={servicesList} /></td>
                            <td class="p-3 font-medium ">{item.coupon}</td>
                            <td class="p-3 ">$ {item.total}</td>
                            <td class="p-3 ">{get_Date(item.startdate,'ddd, MMM DD')} - {get_Date(item.enddate,'ddd, MMM DD')}</td>
                            <td class="p-3 "> {Tags(item.case)}</td>
                            <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'Logs'} >
                                    <Button type="link" icon={<ContainerOutlined />} onClick={() => btn_LogsClick(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />
        </div>
    )
}

export default Events

