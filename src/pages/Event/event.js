/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Tabs, Tag,Modal } from "antd"
import {  MailOutlined } from '@ant-design/icons';
import { useEffect,  useState } from "react";
import { getTabItems } from "../../common/items.js";
import Events from '../../components/Event/event.js'
import dayjs from 'dayjs';
import { firstDateOfMonth, get_Date, lastDateOfMonth } from "../../common/localDate.js";
import PageHeader from "../../common/pages/pageHeader.js";
import { useOutletContext } from "react-router-dom";
import MassEmailUI from "../../components/Event/mass_email.js";
import Services from "../../common/services.js";

const customLabelTab = (label, tagColor, tagValue) => {
    return (
        <div class='flex flex-row gap-2 items-center'>
            <p>{label}</p>
            <Tag color={tagColor}>{tagValue}</Tag>
        </div>
    )
}

const Event = () => {
    const headingLabel = 'Event'

   const { saveData, refresh,
        eventList,getEvent,
        servicesList, getService,
        userList, getUser, editEvent,
     customerList, getCustomer, companyList ,getCompany} = useOutletContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));

    const [eventTotal, setEventTotal] = useState([]);
    const [liveList, setLiveList] = useState([]);
    const [upcomingList, setUpcomingList] = useState([]);
    const [pastList, setPastList] = useState([]);
    const [DiscountList, setDiscountList] = useState([]);
    const [exportList, setExportList] = useState([]);
    
    useEffect(() => {  
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true); 
        await getCompany();
        await getCustomer();
        await getService();
        await getUser(); 
        await getEvent();
        setIsLoading(false)
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

        let discountEvent=[];
        eventList.filter(a => a.case.toUpperCase() !== 'PAST').map(item => {
            discountEvent.push({
                name: <Services servicesItem={item.serviceinfo} servicesList={servicesList} />,
                start:item.startdate,
                end:item.enddate,
                price:item.price,
                newprice:item.total,
                percentage:parseInt((parseFloat(item.discount).toFixed(2) / parseFloat(item.price).toFixed(2)) * 100)
                    
            })
        })
        setDiscountList(discountEvent)


    }, [refresh, eventList, fromDate,toDate])

    const tabItems = [
        getTabItems('1', customLabelTab("All", "cyan", eventTotal.length), null, <Events eventList={eventTotal} servicesList={servicesList} btn_Click={editEvent}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('2', customLabelTab("Live", "green", liveList.length), null, <Events eventList={liveList} servicesList={servicesList} btn_Click={editEvent} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList} isLoading={isLoading} />),
        getTabItems('3', customLabelTab("Upcoming", "yellow", upcomingList.length), null, <Events eventList={upcomingList} servicesList={servicesList} btn_Click={editEvent} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList}  isLoading={isLoading}/>),
        getTabItems('4', customLabelTab("Past", "red", pastList.length), null, <Events eventList={pastList} servicesList={servicesList} btn_Click={editEvent}  fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} setExportList={setExportList}  isLoading={isLoading}/>)
    ];
    return (
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12">
            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => editEvent(0)} servicesList={servicesList} userList={userList}
            customButton={<Button type='default' icon={<MailOutlined />} size="large" onClick={() => setIsModalOpen(true)}>Send E-Mail</Button>} />
            <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />

            <Modal
                title=" "
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}       
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[]}
                width={'80%'}
            >
                <MassEmailUI
                    customerList={customerList}
                    sendFrom={companyList.emailuser || ''}
                    companyName={companyList.name}
                    storeId={companyList.store}
                    discountList={DiscountList}
                    setIsModalOpen={setIsModalOpen}
                     /> 
            </Modal>
        </div>
    )
}

export default Event;