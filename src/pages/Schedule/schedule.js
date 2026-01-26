/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, Drawer, Space, Tooltip, Popover, DatePicker } from "antd";
import { EditOutlined, PlusOutlined, SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { Tags } from "../../common/tags";
import ExportToExcel from "../../common/export.js";
import { get_Date, LocalDate, UTC_LocalDateTime } from "../../common/localDate.js";
import { convertTo12Hour, calculateTime } from "../../common/general";
import AssignedTo from "../../common/assigned_to.js";
import dayjs from 'dayjs';
import { Sort } from "../../common/sort.js";
import ScheduleDetail from "../../components/Schedule/schedule_detail.js";
import ScheduleView from "../../components/Schedule/schedule_view.js";
import { useOutletContext } from "react-router-dom";
import IsLoading from "../../common/custom/isLoading.js";
import PageHeader from "../../common/pages/pageHeader.js";
import FetchData from "../../hook/fetchData.js";


const Schedule = () => {
    const ref = useRef();
    const headingLabel = 'Schedule'
    const { saveData, refresh } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);

    const [fromDate, setFromDate] = useState(LocalDate());
    const [toDate, setToDate] = useState(LocalDate());
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [title, setTitle] = useState('New')
    const [id, setId] = useState(0);
    const [uid, setUid] = useState(0);
    const [reload, setReload] = useState(0);

    const [assigned_to, setAssignedTo] = useState('');

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true)

        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user'
        })
        const scheduleResponse = await FetchData({
            method: 'GET',
            endPoint: 'schedule'
        })

        setScheduleList(scheduleResponse.data);
        setUserList(userResponse.data);

        setFilteredList(scheduleResponse.data);
        setList(scheduleResponse.data);
        setExportList(scheduleResponse.data);
        setPage(1, 10, scheduleResponse.data);

        setIsLoading(false)
    }

    useEffect(() => {
        let searchedList = scheduleList.filter(item => get_Date(item.trndate, 'YYYY-MM-DD') >= fromDate && get_Date(item.trndate, 'YYYY-MM-DD') <= toDate);

        if (assigned_to !== '')
            searchedList = searchedList.filter(item => item.uid === assigned_to)

        searchedList = Sort('trndate', 'desc', searchedList)

        setList(searchedList);
        setExportList(searchedList);
        setCurrentPage(1)
        setPage(1, itemsPerPage, searchedList)
    }, [assigned_to, fromDate, toDate])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }

    const headerItems = [
        getTableItem('1', 'Date'),
        getTableItem('2', 'User'),
        getTableItem('3', 'Start'),
        getTableItem('4', 'End'),
        getTableItem('5', 'Hours'),
        getTableItem('6', 'Status'),
        getTableItem('7', 'Last Modified'),
        getTableItem('8', 'Action'),
    ];

    const btn_Click = (id) => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel}`);
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }
    const btn_ViewClick = (id) => {
        setReload(reload + 1);
        setUid(id);
        setOpenView(true);
    }
    const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="flex flex-col gap-4 px-7 py-4  mb-12">

            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => btn_Click(0)} servicesList={[]} userList={userList} />

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full flex flex-row gap-2 items-center md:w-1/3'>
                        <p class='text-sm text-gray-500 whitespace-nowrap'>Filter user</p>
                        <Select
                            value={assigned_to}
                            style={{ width: 300 }}
                            size="large"
                            onChange={(value) => setAssignedTo(value)}
                            options={[{ value: '', label: 'All Users' }, ...userList.filter(a => !a.status.toLowerCase().includes('inactive')).map(item => ({
                                value: item.id,
                                label: <AssignedTo key={item.id} userId={item.id} userList={userList} />
                            }))]}
                        />
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

                <IsLoading isLoading={isLoading} rows={10} input={
                    <DataTable headerItems={headerItems} current={currentPage} list={list}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setItemsPerPage(pageSize);
                            setPage(page, pageSize, list)
                        }}
                        body={(
                            filteredList.map(item => {
                                const result = calculateTime(item.startshift, item.endshift);
                                return (
                                    <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                        <td class="p-3 font-bold ">{get_Date(item.trndate, 'DD MMM YYYY')}</td>
                                        <td class="p-3"><AssignedTo userId={item.uid} userList={userList} /></td>
                                        <td class="p-3 ">{convertTo12Hour(item.startshift)}</td>
                                        <td class="p-3 ">{convertTo12Hour(item.endshift)}</td>
                                        <td class="p-3 font-body ">{`${result.hours}h ${result.minutes}m`}</td>
                                        <td class="p-3">{Tags(item.dayoff ? "Working" : "Day off")}</td>
                                        <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                                        <td class="p-3">
                                            <Tooltip placement="top" title={'Edit'} >
                                                <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                            </Tooltip>
                                            <Tooltip placement="top" title={'View'} >
                                                <Button type="link" icon={<EyeOutlined />} onClick={() => btn_ViewClick(item.uid)} />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                        )} />
                } />
            </div>

            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <ScheduleDetail id={id} refresh={reload} ref={ref} scheduleList={scheduleList} userList={userList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'95%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <ScheduleView id={uid} refresh={reload} userList={userList} scheduleListAll={scheduleList} />
            </Drawer>
        </div>
    )
}

export default Schedule;

