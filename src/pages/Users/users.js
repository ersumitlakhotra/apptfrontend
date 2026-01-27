/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Select, Drawer, Space, Input, Tooltip, Rate, Avatar, Image } from "antd";
import { EditOutlined, PlusOutlined, SaveOutlined, UserOutlined, ContainerOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import UserDetail from "../../components/Users/user_detail";
import { IoSearchOutline } from "react-icons/io5";
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";
import LogsView from "../../components/Logs/logs_view.js";
import ExportToExcel from "../../common/export.js";
import { UTC_LocalDateTime } from "../../common/localDate.js";
import { useOutletContext } from "react-router-dom";
import PageHeader from "../../common/pages/pageHeader.js";
import IsLoading from "../../common/custom/isLoading.js";
import FetchData from "../../hook/fetchData.js";


const Users = () => {
    const ref = useRef();
    const headingLabel = 'Users'
    const { saveData, refresh } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New')
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [openLogs, setOpenLogs] = useState(false);

    const [logsList, setLogsList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [userPermissionList, setUserPermissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [sortStatus, setSortStatus] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true)

        const companyResponse = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user'
        })
        const userPermissionResponse = await FetchData({
            method: 'GET',
            endPoint: 'userpermission'
        })
        setCompanyList(companyResponse.data)
        setUserPermissionList(userPermissionResponse.data);
        setUserList(userResponse.data);

        setFilteredList(userResponse.data);
        setList(userResponse.data);
        setExportList(userResponse.data);
        setPage(1, 10, userResponse.data);

        setIsLoading(false)
    }


    useEffect(() => {
        const searchedList = userList.filter(item =>
        (item.fullname.toLowerCase().includes(searchInput.toLowerCase()) &&
            (sortStatus !== '' ? item.status.toLowerCase() === (sortStatus.toLowerCase()) : item.status.toLowerCase().includes('active')
            )));
        setList(searchedList);
        setExportList(searchedList);
        setCurrentPage(1)
        setPage(1, itemsPerPage, searchedList)
    }, [userList, searchInput, sortStatus])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }

    const btn_Click = (id) => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel}`);
        setReload(reload + 1);
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
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12">

            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => btn_Click(0)} servicesList={[]} userList={userList} />

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
                <IsLoading isLoading={isLoading} rows={10} input={
                    <DataTable headerItems={headerItems} current={currentPage} list={list}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setItemsPerPage(pageSize);
                            setPage(page, pageSize, list)
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
                                    <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                                    <td class="p-3">
                                        <Tooltip placement="top" title={'Edit'} >
                                            <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                        </Tooltip>
                                        {/*
                                        <Tooltip placement="top" title={'Logs'} >
                                            <Button type="link" icon={<ContainerOutlined />} onClick={() => btn_LogsClick(item.id)} />
                                        </Tooltip>*/}
                                    </td>
                                </tr>
                            ))
                        )} />
                } />
            </div>

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <UserDetail id={id} refresh={reload} ref={ref} userList={userList} userPermissionList={userPermissionList} companyList={companyList} saveData={saveData} setOpen={setOpen} />
            </Drawer>



            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Users'} logsList={logsList} userList={userList} servicesList={[]} />
            </Drawer>
        </div>
    )
}

export default Users;

