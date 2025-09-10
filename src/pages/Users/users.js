/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button,  Select, Drawer, Space, Input, Tooltip, Rate, Avatar, Image } from "antd";
import { DownloadOutlined, EditOutlined, PlusOutlined, SaveOutlined, UserOutlined, ContainerOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import UserDetail from "../../components/Users/user_detail";
import { IoSearchOutline } from "react-icons/io5";
import DataTable from "../../common/datatable";
import { getDate, getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";
import LogsView from "../../components/Logs/logs_view.js";


const Users = ({ userList, logsList, saveData }) => {
    const ref= useRef();


    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New')
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const [openLogs, setOpenLogs] = useState(false);
    const [filteredList, setFilteredList] = useState(userList);

    const [searchInput, setSearchInput] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setFilteredList(userList)
        setPage(1, 10, userList);
    }, [])

    useEffect(() => {
        const searchedList = userList.filter(item =>
        (item.fullname.toLowerCase().includes(searchInput.toLowerCase()) &&
            (sortStatus !== '' ? item.status.toLowerCase() === (sortStatus.toLowerCase()) : item.status.toLowerCase().includes('active')
            )));
        if (searchInput === '' && sortStatus === '')
            setPage(currentPage, itemsPerPage, searchedList)
        else
            setPage(1, itemsPerPage, searchedList)
    }, [searchInput, sortStatus])
    
    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
   
    const btn_Click = (id) => {
        setTitle(id === 0 ? "New User" : "Edit User");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }
    const btn_LogsClick = (id) => {
        setId(id);
        setOpenLogs(true);
    }

    const btnSave = async () => {
        await ref.current?.save();
    }

    const headerItems = [
        getTableItem('1', 'User'),
        getTableItem('2', 'Role'),
        getTableItem('3', 'Username'),
        getTableItem('4', 'Account'),
        getTableItem('5', 'Rating'),
        getTableItem('6', 'Status'),
        getTableItem('7', 'Last Modified'),
        getTableItem('8', 'Action'),
    ];
    return (
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Users</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create user</Button>
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full md:w-1/3'>
                        <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <div class='w-full md:w-2/3 flex flex-row md:justify-end justify-start gap-4'>                       
                        <div class='flex flex-row gap-2 items-center'>
                            <p class='text-sm text-gray-500 whitespace-nowrap'>Filter by</p>
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
                </div>

                <DataTable headerItems={headerItems} list={(searchInput === '' && sortStatus === '') ? userList : filteredList}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize);
                        setPage(page, pageSize, userList)
                    }}
                    body={(
                        filteredList.map(item => (
                            <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                <td class="p-3">
                                    <div class='flex flex-row gap-2 items-center'>                                                    
                                        {item.profilepic !== null ?
                                            <Image width={40} height={40} src={item.profilepic} style={{ borderRadius: 20 }} /> :
                                            <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <div class='flex flex-col'>
                                            <p class="text-sm font-semibold">{item.fullname}</p>
                                            <p class="text-gray-500">{item.email}</p>
                                        </div>  
                                    </div>
                                </td>
                                <td class="p-3 ">{item.role}</td>
                                <td class="p-3 ">{item.username}</td>
                                <td class="p-3 ">{item.accounttype}</td>
                                <td class="p-3 "><Rate disabled value={item.rating} /></td>
                                <td class="p-3 ">{Tags(item.status)}</td>
                                <td class="p-3 ">{getDate(item.modifiedat)}</td>
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

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <UserDetail id={id} refresh={refresh} ref={ref} userList={userList} saveData={saveData} setOpen={setOpen} />
            </Drawer>
            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Users'} logsList={logsList} userList={userList} servicesList={[]} />
            </Drawer>
        </div>
    )
}

export default Users;

