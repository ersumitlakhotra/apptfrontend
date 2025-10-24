import Heading from "../../../common/heading"
import { CloseOutlined, CreditCardFilled, EditOutlined, WalletFilled, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import PricingCard from "./pricing_card";
import { Button, Divider, Drawer, Input, Select, Space, Tooltip } from "antd";
import Accordion from "../../../common/accordion.js";
import DataTable from "../../../common/datatable";
import { getTableItem } from "../../../common/items.js";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { Tags } from "../../../common/tags.js";
import InvoiceView from "./invoice_view.js";
import Invoice from "./invoice.js";

function YearDisplay() {
    const years = [];
    for (let i = 0; i < 10; i++) {
        years.push(
            { value: new Date().getFullYear() + i, label: new Date().getFullYear() + i }
        );
    }
    return years;
}
const Billing = ({ companyList,billingList, saveData, setRefresh }) => {
   
    const [plan, setPlan] = useState('');
    const [pricing, setPricing] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCVV] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [openView, setOpenView] = useState(false);

    useEffect(() => {
        if (companyList.length !== 0) {
            setPlan(companyList.plan);
            setPricing(companyList.pricing);
            if (companyList.billinginfo !== null) {
                setName(companyList.billinginfo[0].name);
                setNumber(companyList.billinginfo[0].number);
                setMonth(companyList.billinginfo[0].month);
                setYear(companyList.billinginfo[0].year);
                setCVV(companyList.billinginfo[0].cvv);
            }
        }
    }, [companyList])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setPage(1, 10, billingList);
    }, [billingList])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
    }

    const saveBillingDetails = async () => {
        const Body = JSON.stringify({
            billinginfo: [{
                name: name,
                number: number,
                month: month,
                year: year,
                cvv: cvv
            }]

        });
        saveData("Billing Details", "PUT", "company/billing", null, Body);
        setIsEdit(false);
    }

    const setCardFormat = (Value) => {
        let textValue = Value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (textValue.length > 4) {
            textValue = textValue.substring(0, 4) + '-' + textValue.substring(4);
        }
        if (textValue.length > 9) {
            textValue = textValue.substring(0, 9) + '-' + textValue.substring(9);
        }
        if (textValue.length > 14) {
            textValue = textValue.substring(0, 14) + '-' + textValue.substring(14);
        }
        if (textValue.length > 19) {
            textValue = textValue.substring(0, 19) + '-' + textValue.substring(19);
        }
        if (textValue.length < 20)
            setNumber(textValue);

    }

    const headerItems = [
        getTableItem('1', 'Invoice #'),
        getTableItem('2', 'Date'),
        getTableItem('3', 'Due'),
        getTableItem('4', 'Sub Total'),
        getTableItem('5', 'Tax'),
        getTableItem('6', 'Total'),
        getTableItem('7', 'Status'),
        getTableItem('8', 'Action'),
    ];
    const btn_ViewClick = (id) => {
        setReload(reload + 1);
        setId(id);
        setOpenView(true);
    }
    return (
        <div class='flex flex-col gap-8'>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <Heading label={"Change plan"} desc={'You can upgrade or downgrade whenever you want.'} icon={<CreditCardFilled  />} />

                <div class='mx-6 flex flex-col gap-16 md:flex-row '>
                    <PricingCard key={1} title={'STARTUP'} price={'0.00'} current={plan === 'STARTUP'} />
                    <PricingCard key={2} title={'STANDARD'} price={'120.00'} current={plan === 'STANDARD'} />
                    <PricingCard key={3} title={'ENTERPRISE'} price={'150.00'} current={plan === 'ENTERPRISE'} />
                </div>
                <div class='mx-6 mt-4 flex justify-end items-center'>
                    <Tooltip placement="top" title={'Click to upgrade or downgrade your plan.'}>
                        <Button size='large' color="primary" variant="solid"  >Upgrade plan</Button>
                    </Tooltip>
                </div>
                <Divider />

                <div class='flex items-center justify-between'>
                    <Heading label={"Billing details"} icon={<WalletFilled  />} />
                    {isEdit ?
                        <Space>
                            <Button color="primary" variant="solid" onClick={saveBillingDetails} >Save changes</Button>
                            <Button color="default" variant="filled" icon={<CloseOutlined />} onClick={() => { setIsEdit(false); setRefresh(0); }} >Cancel</Button>
                        </Space> :
                        <Button color="default" variant="filled" icon={<EditOutlined />} onClick={() => setIsEdit(true)} >Edit</Button>
                    }
                </div>

                <div class='border rounded-lg ml-6 flex flex-col mb-6'>
                    {isEdit ?
                        <>
                            <div class={`border-b p-4 ps-6 flex flex-row  items-center`}>
                                <p class='w-28 font-medium text-gray-500'>Name</p>
                                <Input placeholder="Name on card" size="small" value={name} onChange={(e) => setName(e.target.value)} style={{ backgroundColor: '#f9fafb', width: 180 }} />
                            </div>
                            <div class={`border-b p-4 ps-6 flex flex-row  items-center`}>
                                <p class='w-28 font-medium text-gray-500'>Card Number</p>
                                <Input placeholder="1111-2222-3333-4444" size="small" value={number} onChange={(e) => setCardFormat(e.target.value)} style={{ backgroundColor: '#f9fafb', width: 180 }} />
                            </div>
                            <div class={`border-b p-4 ps-6 flex flex-row  items-center`}>
                                <p class='w-28 font-medium text-gray-500'>Expiry</p>
                                <Select
                                    value={month}
                                    style={{ width: 90 }}
                                    size="small"
                                    onChange={(e) => setMonth(e)}
                                    options={[
                                        { value: '01', label: 'January' },
                                        { value: '02', label: 'February' },
                                        { value: '03', label: 'March' },
                                        { value: '04', label: 'April' },
                                        { value: '05', label: 'May' },
                                        { value: '06', label: 'June' },
                                        { value: '07', label: 'July' },
                                        { value: '08', label: 'August' },
                                        { value: '09', label: 'September' },
                                        { value: '10', label: 'October' },
                                        { value: '11', label: 'November' },
                                        { value: '12', label: 'December' },
                                    ]} />

                                <Select
                                    value={year}
                                    style={{ width: 90 }}
                                    size="small"
                                    onChange={(e) => setYear(e)}
                                    options={YearDisplay()} />
                            </div>
                            <div class={`p-4 ps-6 flex flex-row  items-center`}>
                                <p class='w-28 font-medium text-gray-500'>CVV</p>
                                <Input placeholder="123" size="small" value={cvv} onChange={(e) => setCVV(e.target.value)} style={{ backgroundColor: '#f9fafb', width: 180 }} />
                            </div>
                        </> :
                        <>
                            <Accordion label={'Name'} value={name} />
                            <Accordion label={'Card Number'} value={number} />
                            <Accordion label={'Expiry'} value={`${month} / ${year}`} />
                            <Accordion label={'CVV'} value={cvv} border_bottom={false} />
                        </>
                    }
                </div>
            </div>
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Invoice history"} desc={"If you've just made a payment, it may take a few hours for it to appear in the table below."} icon={<CreditCardFilled  />} />
                <div class='ml-6 mb-6'>
                    <DataTable headerItems={headerItems} list={billingList}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setItemsPerPage(pageSize);
                            setPage(page, pageSize, billingList)
                        }}
                        body={(
                            billingList.map(item => (
                                <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                    <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" ># {item.invoice}</td>
                                    <td class="p-3">{dayjs(item.trndate).format('DD MMM YYYY')}</td>
                                    <td class="p-3">{dayjs(item.duedate).format('DD MMM YYYY')}</td>
                                    <td class="p-3 font-semibold">$ {item.subtotal}</td>
                                    <td class="p-3 font-semibold">$ {item.taxamount}</td>
                                    <td class="p-3 font-semibold">$ {item.totalamount}</td>
                                     <td class="p-3">{Tags(item.status)}</td>
                                    <td class="p-3">
                                        <Tooltip placement="top" title={'View'} >
                                            <Button type="link" icon={<EyeOutlined />} onClick={() => btn_ViewClick(item.id)} />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'Download'} >
                                            <PDFDownloadLink document={<Invoice id={item.id} refresh={reload} billingList={billingList} companyList={companyList} />} fileName="invoice.pdf">
                                                {({ blob, url, loading, error }) =>
                                                    loading ? 'Loading document...' : <Button type="link" icon={<DownloadOutlined />} />
                                                }
                                            </PDFDownloadLink>
                                            
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))
                        )} />                 
                </div>
            </div>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <InvoiceView id={id} refresh={reload} billingList={billingList} companyList={companyList}/>
            </Drawer>
        </div>
    )

}

export default Billing