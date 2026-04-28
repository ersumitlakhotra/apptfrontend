import { useEffect, useMemo, useRef, useState } from "react";
import { Button, DatePicker, Divider, Input, Modal, Popover, Tabs, Tag } from "antd";
import { DollarCircleOutlined, EditOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { customLabelTab, getTabItems, getTableItem } from "../../../common/items";
import IsLoading from "../../../common/custom/isLoading";
import { IoSearchOutline } from "react-icons/io5";
import dayjs from 'dayjs';
import { firstDateOfMonth, get_Date, lastDateOfMonth, UTC_LocalDateTime } from "../../../common/localDate";
import DataTable from "../../../common/datatable";
import PageHeader from "../../../common/pages/pageHeader";
import { Tags } from "../../../common/tags";
import FetchData from "../../../hook/fetchData";
import Checkout from "../../Checkout/checkout";
import MessageLogs from "./messageLogs";
import PaymentLogs from "./payments";
import ModalCheckout from "../../Checkout/modal_Checkout";

const TextMessaging = ({ twillioCell, companyList, credit, logsList, billingList,saveData, viewOrder, province, country }) => {
    const messageLabel = 'Messaging'; 
    const paymentLabel = 'Payments';
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [amount, setAmount] = useState(20);
    const [isOpen, setIsOpen] = useState(false);

    const [exportListMessageLogs, setExportListMessageLogs] = useState([]);
    const [exportListPayment, setExportListPayment] = useState([]);

    const [tabActiveKey, setTabActiveKey] = useState("1");

    const tabItems = [
        getTabItems('1', "Message Logs", <MessageOutlined/>, <MessageLogs companyList={companyList} billingList={billingList} logsList={logsList} fromDate={fromDate} toDate={toDate} searchInput={searchInput} viewOrder={viewOrder} isLoading={isLoading} setExportList={setExportListMessageLogs} />),
        getTabItems('2', "Payments", <DollarCircleOutlined/>, <PaymentLogs companyList={companyList} billingList={billingList} fromDate={fromDate} toDate={toDate} searchInput={searchInput} isLoading={isLoading} setExportList={setExportListPayment} />),
    ];

   

    return (
        <div id="textmessaging" className="w-full">
            <PageHeader label={<div class='flex flex-col gap-2 '>
                <span class="text-2xl font-bold text-gray-800">{twillioCell}</span>
                <span class="flex text-xs text-gray-500"><Tag variant="outlined" color='green' >{`Balance : $${credit}`}</Tag></span>
            </div>}
                isExport={true} exportList={tabActiveKey === '1' ? exportListMessageLogs : exportListPayment} exportName={tabActiveKey === '1' ? messageLabel : paymentLabel} isCreate={true} onClick={() => setIsOpen(true)} servicesList={[]} userList={[]}
                btnLabel={'Add Credit'} />

            <Divider />

            <div class='w-full bg-white  rounded-lg flex flex-col gap-4 '>
                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full md:w-1/2'>
                        <Input size="large" style={{ fontSize: 16 }} placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <div class='w-full md:w-1/2'>
                        <div class='flex flex-col md:flex-row md:justify-end gap-4 '>
                            <Popover placement="bottom" title={"Filter by From Date"} content={
                                <div>
                                    <DatePicker
                                        style={{ width: '100%', fontSize: 16 }}
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
                                        style={{ width: '100%', fontSize: 16 }}
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
                <Tabs items={tabItems} defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />


            </div>

            <ModalCheckout
                from={'twillio'}
                amount={amount}
                setAmount={setAmount}
                discount={0}
                isOpen={isOpen} 
                setIsOpen={setIsOpen}             
                title='Text_Message_Credit' 
                urls='/setting?tab=3#textmessaging' 
                companyList={companyList}
            />          
        </div>
    )
}

export default TextMessaging;