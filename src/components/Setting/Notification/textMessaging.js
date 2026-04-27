import { useEffect, useRef, useState } from "react";
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

const TextMessaging = ({ twillioCell, companyList, credit, logsList, billingList,saveData, viewOrder, province, country }) => {
    const messageLabel = 'Messaging'; 
      const paymentLabel = 'Payments';
    const ref = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [fromDate, setFromDate] = useState(dayjs(firstDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(dayjs(lastDateOfMonth(new Date())).format("YYYY-MM-DD"));
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(20);
    
    const [exportListMessageLogs, setExportListMessageLogs] = useState([]);
    const [exportListPayment, setExportListPayment] = useState([]);

    const [tabActiveKey, setTabActiveKey] = useState("1");

    const handleCancel = () => {
        setIsOpen(false);
    };

      const handleOk = async () => {
        await ref.current?.checkoutHandle();
    }
    
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

            <Modal
                open={isOpen}
                title=" "
                onOk={handleOk}
                onCancel={handleCancel}
                okText={`Confirm Payment`}
                cancelText="Cancel"
                maskClosable={false}
                keyboard={false}
                width={'60%'}
            >
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between">

                    {/* LEFT SECTION */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-lg font-semibold mb-4">
                            How much would you like to add to your account balance today?
                        </h2>
                        {/* Amount Input */}
                        <label className="block text-sm font-medium mb-2">Amount</label>
                        <div className="relative w-40 mb-2">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={`w-full pl-7 pr-3 py-2 border rounded-md ${(amount < 20 || amount > 2000) && 'border-red-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            Enter an amount between $20 and $2000
                        </p>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6 border">
                        <Checkout ref={ref} amount={amount} title='Text_Message_Credit' urls='/setting?tab=3#textmessaging' companyList={companyList} />
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default TextMessaging;