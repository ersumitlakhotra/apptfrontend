import {  useEffect, useRef, useState } from "react";
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Avatar, Badge, Button,  Drawer, Image, Input,  Select,  Space, Tooltip } from "antd";
import { DownloadOutlined,  PlusOutlined, SaveOutlined } from '@ant-design/icons';
import ExpenseDetail from "../../components/Expense/expense_detail.js";
import DataTable from "../../common/datatable";
import {  getTableItem,getDate } from "../../common/items";
import { Tags } from "../../common/tags";
import {Sort} from '../../common/sort.js'
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { UTC_LocalDateTime } from "../../common/localDate.js";

const Expenses = ({ expensesList, userList, saveData }) => {
    const ref= useRef();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [filteredList, setFilteredList] = useState(expensesList);

    const [searchInput, setSearchInput] = useState('');
    const [sortStatus, setSortStatus] = useState('');

    const [assigned_to, setAssignedTo] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const monthes = ['All','January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December' ]

    useEffect(() => {
        setFilteredList(expensesList)
        setPage(1, 10, expensesList);
    }, [expensesList])

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Expense" : "Edit Expense");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }

    const btnSave = async () => {
        await ref.current?.save(); 
     }
{/*
    useEffect(() => {
        const searchedList = expensesList.filter(item =>
        (item.id.toLowerCase().includes(searchInput.toLowerCase()) &&
            (sortStatus !== '' ? item.status.toLowerCase() === (sortStatus.toLowerCase()) : item.status.toLowerCase().includes('active')
            )));
        if (searchInput === '' && sortStatus === '')
            setPage(currentPage, itemsPerPage, searchedList)
        else
            setPage(1, itemsPerPage, searchedList)
    }, [searchInput, sortStatus,sortAscDesc])*/}

    const setPage = (page, pageSize,list=[]) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
    

    const headerItems = [
        getTableItem('1', 'Date'),
        getTableItem('2', 'User'),
        getTableItem('3', 'Amount'),
        getTableItem('4', 'Notes'),
        getTableItem('5', 'Last Modified'),
        getTableItem('6', 'Action'),
    ];
    return(
        <div class="flex flex-col gap-4 mb-12">
           
            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Expenses</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create expense</Button>
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <div class='flex flex-col md:flex-row  gap-2 justify-between'>
                    <div class='flex flex-row gap-2 items-center'>
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
                    <div class='flex flex-row gap-2 items-center'>
                        <p class='text-sm text-gray-500 whitespace-nowrap'>Filter date</p>
                        <Select
                            value={sortStatus}
                            style={{ width: 120 }}
                            onChange={(e) => setSortStatus(e)}
                            options={[
                                { value: '', label: <Badge color={'blue'} text={'Both'} /> },
                                { value: 'Active', label: <Badge color={'green'} text={'Active'} /> },
                                { value: 'Inactive', label: <Badge color={'red'} text={'Inactive'} /> }
                            ]}
                        />
                        <Select
                            value={sortStatus}
                            style={{ width: 120 }}
                            onChange={(e) => setSortStatus(e)}
                            options={[
                                { value: '', label: <Badge color={'blue'} text={'Both'} /> },
                                { value: 'Active', label: <Badge color={'green'} text={'Active'} /> },
                                { value: 'Inactive', label: <Badge color={'red'} text={'Inactive'} /> }
                            ]}
                        />
                    </div>
                </div>


                <DataTable headerItems={headerItems} list={(searchInput === '' && sortStatus === '') ? expensesList : filteredList} 
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize); 
                        setPage(page, pageSize, expensesList)}} 

                    body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 ">{UTC_LocalDateTime(item.trndate,"MMM DD,YYYY")}</td>
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
                            <td class="p-3 font-semibold">$ {item.amount}</td>
                            <td class="p-3 ">{item.notes}</td>
                            <td class="p-3">{getDate(item.modifiedat)}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />
            </div>

            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ExpenseDetail id={id} refresh={refresh} ref={ref} expensesList={expensesList} userList={userList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

        </div>
    )
}

export default Expenses