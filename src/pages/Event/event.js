/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Space, Tabs, Tag } from "antd"
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import EventDetail from "../../components/Event/event_detail.js";
import { getTabItems } from "../../common/items.js";
import Events from '../../components/Event/event.js'
import LogsView from "../../components/Logs/logs_view.js";
import dayjs from 'dayjs';
import { firstDateOfMonth, get_Date, lastDateOfMonth } from "../../common/localDate.js";
import ExportToExcel from "../../common/export.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Event = ({ eventList, servicesList, logsList, userList, saveData }) => {
    const ref = useRef();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [openLogs, setOpenLogs] = useState(false);
    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    const btn_Click = (id) => {
        setTitle(id === 0 ? "New Event" : "Edit Event");
        setRefresh(refresh + 1);
        setId(id);
        setOpen(true);
    }
    const btn_LogsClick = (id) => {
        setId(id);
        setOpenLogs(true);
    }
    const [eventTotal, setEventTotal] = useState([]);
    const [liveList, setLiveList] = useState([]);
    const [upcomingList, setUpcomingList] = useState([]);
    const [pastList, setPastList] = useState([]);
    const [exportList, setExportList] = useState([]);

    useEffect(() => {
        const event = eventList.filter(a => (get_Date(a.startdate,'YYYY-MM-DD') >= fromDate && get_Date(a.startdate,'YYYY-MM-DD') <= toDate) || 
            (get_Date(a.enddate,'YYYY-MM-DD') >= fromDate && get_Date(a.enddate,'YYYY-MM-DD') <= toDate));
        const liveList = event.filter(a => a.case.toUpperCase() === 'LIVE');
        const upcoming = event.filter(a => a.case.toUpperCase() === 'UPCOMING');
        const past = event.filter(a => a.case.toUpperCase() === 'PAST');

        setEventTotal(event.length > 0 ? event : [])
        setLiveList(liveList.length > 0 ? liveList : [])
        setUpcomingList(upcoming.length > 0 ? upcoming : [])
        setPastList(past.length > 0 ? past : [])

    }, [refresh, eventList, fromDate,toDate])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", eventTotal.length), null, <Events eventList={eventTotal} servicesList={servicesList} btn_Click={btn_Click} btn_LogsClick={btn_LogsClick} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('2', customLabelTab("Live", "green", liveList.length), null, <Events eventList={liveList} servicesList={servicesList} btn_Click={btn_Click} btn_LogsClick={btn_LogsClick} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('3', customLabelTab("Upcoming", "yellow", upcomingList.length), null, <Events eventList={upcomingList} servicesList={servicesList} btn_Click={btn_Click} btn_LogsClick={btn_LogsClick} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />),
        getTabItems('4', customLabelTab("Past", "red", pastList.length), null, <Events eventList={pastList} servicesList={servicesList} btn_Click={btn_Click} btn_LogsClick={btn_LogsClick} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} />)
    ];

    const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Events</span>
                <div class="flex gap-2">
                    <ExportToExcel data={exportList} fileName="Event" servicesList={servicesList} userList={userList} />
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => btn_Click(0)}>Create event</Button>
                </div>
            </div>

            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />


            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave}  >Save</Button></Space>}>
                <EventDetail id={id} refresh={refresh} ref={ref} eventList={eventList} servicesList={servicesList} saveData={saveData} setOpen={setOpen} />
            </Drawer>
            {/* Drawer on logs */}
            <Drawer title={"Logs Detail"} placement='right' width={500} onClose={() => setOpenLogs(false)} open={openLogs}>
                <LogsView id={id} ltype={'Event'} logsList={logsList} userList={userList} servicesList={servicesList} />
            </Drawer>
        </div>
    )
}

export default Event;