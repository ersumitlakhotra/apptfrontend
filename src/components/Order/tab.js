/* eslint-disable react-hooks/exhaustive-deps */
import {   Button, DatePicker,    Input,  Popover,   Select,   Skeleton,   Tooltip} from "antd"
import { IoSearchOutline } from "react-icons/io5";
import {  getTableItem } from "../../common/items";
import DataTable from "../../common/datatable";
import { useEffect, useState } from "react";
import { ContainerOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Tags } from "../../common/tags";
import Services from "../../common/services";
import AssignedTo from "../../common/assigned_to";
import { UTC_LocalDateTime, get_Date } from "../../common/localDate";


const OrderTabs = ({ index, orderList, servicesList, userList, btn_Click, btn_ViewClick, btn_LogsClick, refresh, fromDate, setFromDate, toDate, setToDate ,setExportList }) => {
  
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(orderList);
    const [list, setList] = useState(orderList);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [assigned_to, setAssignedTo] = useState('');

    useEffect(() => {
        setFilteredList(orderList);
        setList(orderList);
        setExportList(orderList);
        setSearchInput('');
        setAssignedTo('');
        setPage(1, 10, orderList);
    }, [refresh, orderList])

    useEffect(() => {
        let searchedList = orderList.filter(item => 
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.order_no.toString().includes(searchInput.toLowerCase()));
        if (assigned_to !== '')
            searchedList = searchedList.filter(item => item.assignedto === assigned_to)

        setExportList(searchedList);
        setList(searchedList);
        setCurrentPage(1)
        setPage(1, itemsPerPage, searchedList)
    }, [searchInput, assigned_to])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList);   
    }
 

    const headerItems = [
        getTableItem('1', 'Order'),
        getTableItem('2', 'Customer'),
        getTableItem('3', 'Date'),
        getTableItem('4', 'Services'),
        getTableItem('5', 'Rate'),
        getTableItem('6', 'Status'),
        getTableItem('7', 'Booked'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    return (
        <div key={index} class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/4'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div class='w-full md:w-1/4'>
                    <Select
                        value={assigned_to}
                        style={{ width: '100%' }}
                        size="large"
                        onChange={(value) => setAssignedTo(value)}
                        options={[{ value: '', label: 'All Users' },{ value: '0', label: 'None' }, ...userList.map(item => ({
                            value: item.id,
                            label: <AssignedTo key={item.id} userId={item.id} userList={userList} />                                                                     
                        }))]}
                    />
                </div>
                <div class='w-full md:w-2/4'>
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
            <DataTable headerItems={headerItems} current={currentPage} list={list}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, list)
                }}
                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" onClick={() => btn_ViewClick(item.id)} ># {item.order_no}</td>

                            <td class="p-3">
                                <>
                                    <p class="font-semibold">{item.name}</p>
                                    <p class="text-xs font-medium text-gray-400">{item.cell}</p>
                                </>
                            </td>

                            <td class="p-3">
                                {(item.trndate !== null && item.trndate !== '') && <>
                                    <p class="font-semibold">{get_Date(item.trndate,'DD MMM YYYY')}</p>
                                    <p class="text-xs font-medium text-gray-400">{item.slot}</p>
                                </>}
                            </td>

                            <td class="p-3"><Services servicesItem={item.serviceinfo} servicesList={servicesList} /></td>
                            <td class="p-3 font-semibold">$ {item.total}</td>
                            <td class="p-3">{Tags(item.status)}</td>
                            <td class="p-3"><AssignedTo userId={item.assignedto} userList={userList} /></td>
                            <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'View'} >
                                    <Button type="link" icon={<EyeOutlined />} onClick={() => btn_ViewClick(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'Logs'} >
                                    <Button type="link" icon={<ContainerOutlined /> } onClick={() => btn_LogsClick(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />   
        </div>
    )

}

export default OrderTabs