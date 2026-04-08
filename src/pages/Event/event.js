/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Space, Tabs, Tag,Modal } from "antd"
import {  MailOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import EventDetail from "../../components/Event/event_detail.js";
import { getTabItems } from "../../common/items.js";
import Events from '../../components/Event/event.js'
import dayjs from 'dayjs';
import { firstDateOfMonth, get_Date, lastDateOfMonth } from "../../common/localDate.js";
import PageHeader from "../../common/pages/pageHeader.js";
import { useOutletContext } from "react-router-dom";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Event = () => {
    const ref = useRef(); 
    const headingLabel = 'Event'

   const { saveData, refresh,
        eventList,getEvent,
        servicesList, getService,
        userList, getUser,
     customerList, getCustomer } = useOutletContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    const [eventTotal, setEventTotal] = useState([]);
    const [liveList, setLiveList] = useState([]);
    const [upcomingList, setUpcomingList] = useState([]);
    const [pastList, setPastList] = useState([]);
    const [exportList, setExportList] = useState([]);
    
    useEffect(() => {  
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true); 
        await getCustomer();
        await getService();
        await getUser(); 
        await getEvent();
        setIsLoading(false)
    }

    const btn_Click = (id) => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel}`);
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }

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
        getTabItems('1', customLabelTab("All", "cyan", eventTotal.length), null, <Events eventList={eventTotal} servicesList={servicesList} btn_Click={btn_Click}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('2', customLabelTab("Live", "green", liveList.length), null, <Events eventList={liveList} servicesList={servicesList} btn_Click={btn_Click} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('3', customLabelTab("Upcoming", "yellow", upcomingList.length), null, <Events eventList={upcomingList} servicesList={servicesList} btn_Click={btn_Click} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList}  isLoading={isLoading}/>),
        getTabItems('4', customLabelTab("Past", "red", pastList.length), null, <Events eventList={pastList} servicesList={servicesList} btn_Click={btn_Click}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList}  isLoading={isLoading}/>)
    ];

    const btnSave = async () => {
        await ref.current?.save();
    }

    return (
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12">
            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => btn_Click(0)} servicesList={servicesList} userList={userList}
            customButton={<Button type='default' icon={<MailOutlined />} size="large" onClick={() => setIsModalOpen(true)}>Send E-Mail</Button>} />
            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />


            {/* Drawer on right*/}
            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave}  >Save</Button></Space>}>
                <EventDetail id={id} refresh={reload} ref={ref} eventList={eventList} servicesList={servicesList} saveData={saveData} setOpen={setOpen} />
            </Drawer>

            <Modal
                title="Gmail setup tutorial"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
                        OK
                    </Button>,
                ]}
            >
                <ol className="list-decimal list-inside space-y-4">
                    <li dangerouslySetInnerHTML={{ __html: `Login into <b>Gmail Account -> Manage Account -> Security & sign-in </b>` }} />
                   
                    <li>
                        <span>Type <b>App Passwords</b> in search,click, and navigate to that page.</span>
                      
                    </li>
                    <li >
                        <span dangerouslySetInnerHTML={{ __html: `Type <b>App Name -> </b>click <b>CREATE</b> then copy , paste password in <b>App Password field.</b>` }} />
                       
                    </li>
                    <li dangerouslySetInnerHTML={{ __html: `<b>Save Changes -> </b>Click on <b> Send Test Email</b> to verify that the setup is finished and functioning properly.` }} />

                </ol>
            </Modal>
        </div>
    )
}

export default Event;