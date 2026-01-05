/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useRef, useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Badge, Button,  Drawer, Input,  Select,  Space, Tooltip } from "antd";
import {  PlusOutlined, SaveOutlined, ContainerOutlined } from '@ant-design/icons';
import ServiceDetail from "../../components/Services/service_detail";
import DataTable from "../../common/datatable";
import {  getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";
import {Sort} from '../../common/sort.js'
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import LogsView from "../../components/Logs/logs_view.js";
import ExportToExcel from "../../common/export.js";
import { UTC_LocalDateTime } from "../../common/localDate.js";

const Services = ({ servicesList, setServicesList, logsList, userList, saveData }) => {
    const ref= useRef();
    const [open, setOpen] = useState(false);
    const [openLogs, setOpenLogs] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [filteredList, setFilteredList] = useState(servicesList);
    const [list, setList] = useState(servicesList);

    const [searchInput, setSearchInput] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [sortAscDesc, setSortAscDesc] = useState('name asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    useEffect(() => {
        setFilteredList(servicesList);
        setList(servicesList);
        setExportList(servicesList);
        setPage(1, 10, servicesList);
    }, [])

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Service" : "Edit Service");
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

    useEffect(() => {
        const searchedList = servicesList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) &&
            (sortStatus !== '' ? item.status.toLowerCase() === (sortStatus.toLowerCase()) : item.status.toLowerCase().includes('active')
            )));

        setList(searchedList);
        setExportList(searchedList);
        setCurrentPage(1);
            setPage(1, itemsPerPage, searchedList)
    }, [servicesList,searchInput, sortStatus,sortAscDesc])

    const setPage = (page, pageSize,list=[]) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
    
    const setSort = (value) => {
        const getValue = value.split(' ');
        setServicesList(Sort(getValue[0], getValue[1], servicesList)) 
        setSortAscDesc(value);
    }
 
    const headerItems = [
        getTableItem('1', 'Name'),
        getTableItem('2', 'Price'),
        getTableItem('3', 'Time'),
        getTableItem('4', 'Status'),
        getTableItem('5', 'Last Modified'),
        getTableItem('6', 'Action'),
    ];
    return(
        <div class="flex flex-col gap-4 mb-12">
           
            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Services</span>
                <div class="flex gap-2">
                    <ExportToExcel data={exportList} fileName="Services" servicesList={servicesList} userList={userList} />
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create service</Button>
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full md:w-1/3'>
                        <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) =>setSearchInput(e.target.value)} />
                    </div>
                    <div class='w-full md:w-2/3 flex flex-row md:justify-end justify-start gap-4'>
                        <div class='flex flex-row gap-2 items-center'>
                            <p class='text-sm text-gray-500 whitespace-nowrap'>Sort by</p>
                            <Select
                                value={sortAscDesc}
                                style={{ width: 120 }}
                                onChange={(e) => setSort(e)}
                                options={[
                                    {
                                        label: <span class='flex flex-row justify-between items-center text-xs'>Ascending <FaSortAlphaDown /></span>,
                                        title: 'Ascending',
                                        options: [
                                            { label:"Name", value: 'name asc' },
                                            { label: 'Price', value: 'price asc' },
                                        ],
                                    },
                                    {
                                        label: <span class='flex flex-row justify-between items-center text-xs'>Descending <FaSortAlphaUp /></span>,
                                        title: 'Descending',
                                        options: [
                                            { label: 'Name', value: 'name desc' },
                                            { label: 'Price', value: 'price desc' },
                                        ],
                                    },
                                ]}
                            />
                        </div>
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


                <DataTable headerItems={headerItems} current={currentPage} list={list} 
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize); 
                        setPage(page, pageSize, list)}} 

                    body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 font-semibold">{item.name}</td>
                            <td class="p-3 ">$ {item.price}</td>
                            <td class="p-3 ">{item.timing}</td>
                            <td class="p-3">{Tags(item.status)}</td>
                            <td class="p-3">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
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

            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ServiceDetail id={id} refresh={refresh} ref={ref} servicesList={servicesList} saveData={saveData} setOpen={setOpen} />
            </Drawer>
            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Services'} logsList={logsList} userList={userList} servicesList={servicesList} />
            </Drawer>
        </div>
    )
}

export default Services