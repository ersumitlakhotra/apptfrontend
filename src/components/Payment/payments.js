import {  useEffect,  useState } from "react";
import { EditOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar,  Button,  DatePicker,  Image,   Popconfirm,   Popover,  Select,  Tooltip } from "antd";
import DataTable from "../../common/datatable";
import {  getTableItem,getDate } from "../../common/items";

import dayjs from 'dayjs';
const Payments = ({ key, expensesList, userList, btn_Click, fromDate, setFromDate, toDate, setToDate, saveData }) => {

    const [filteredList, setFilteredList] = useState(expensesList);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [assigned_to, setAssignedTo] = useState('');

    useEffect(() => {
        setFilteredList(expensesList)
        setPage(1, 10, expensesList);
    }, [expensesList])

    useEffect(() => {
        

        if (assigned_to === '')
            setPage(currentPage, itemsPerPage, expensesList)
        else
        {
            const searchedList = expensesList.filter(item =>item.assignedto === assigned_to);
            setPage(1, itemsPerPage, searchedList)
        }
    }, [assigned_to])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }

    const headerItems = [
        getTableItem('1', 'Date'),
        getTableItem('2', 'User'),
        getTableItem('3', 'Type'),
        getTableItem('4', 'Net Pay'),
        getTableItem('5', 'Tax'),
        getTableItem('6', 'Gross Pay'),
        getTableItem('7', 'Notes'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    const deleted = (id) => {
        const Body = JSON.stringify({});
        saveData("Expense", 'DELETE', "payment", id, Body);
    };
    return (
        <div key={key} class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full flex flex-row gap-2 items-center md:w-1/3'>
                        <p class='text-sm text-gray-500 whitespace-nowrap'>Filter user</p>
                        <Select
                            value={assigned_to}
                            style={{ width: 300 }}
                            size="middle"
                            onChange={(value) => setAssignedTo(value)}
                            options={[{ value: '', label: 'All Users' }, ...userList.map(item => ({
                                value: item.id,
                                label:
                                    <div class='flex flex-row gap-2 items-center'>
                                        {item.profilepic !== null ?
                                            <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                            <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <p>{item.fullname}</p>
                                    </div>
                            }))]}
                        />
                </div>
                <div class='w-full md:w-2/3'>
                    <div class='flex flex-col md:flex-row md:justify-end gap-4 '>
                        <Popover placement="bottom" title={"Filter by From Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
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
            <DataTable headerItems={headerItems} list={(assigned_to === '') ? expensesList : filteredList}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, expensesList)
                }}

                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="ps-3 w-44">{`${dayjs(item.fromdate).format("MMM DD,YYYY")} - ${dayjs(item.todate).format("MMM DD,YYYY")} `}</td>
                            <td class="p-3">{item.assignedto === '0' ? '' :
                                userList.filter(user => user.id === item.assignedto).map(a =>
                                    <div key={a.id} class='flex flex-row gap-2 items-center'>
                                        {a.profilepic !== null ?
                                            <Image width={31} height={31} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                            <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <p>{a.fullname}</p>
                                    </div>
                                )}
                            </td>
                            <td class="p-3 ">{item.ptype}</td>
                            <td class="p-3 ">$ {item.netamount}</td>
                            <td class="p-3 ">$ {item.taxamount}</td>
                            <td class="p-3 ">$ {item.grossamount}</td>
                            <td class="p-3 ">{item.notes}</td>
                            <td class="p-3">{getDate(item.modifiedat)}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip> <Tooltip placement="top" title={'Delete'} >
                                    <Popconfirm
                                        title="Delete "
                                        description="Are you sure to delete?"
                                        onConfirm={(e) => deleted(item.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger type="link" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />
        </div>
    )
}

export default Payments