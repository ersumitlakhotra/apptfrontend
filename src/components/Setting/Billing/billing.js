import Heading from "../../../common/heading"
import { CloseOutlined, CreditCardFilled, EditOutlined, WalletFilled, DownloadOutlined, EyeOutlined,DatabaseFilled } from '@ant-design/icons';
import { Button, Divider, Drawer,  Space, Tooltip } from "antd";
import DataTable from "../../../common/datatable";
import { getTableItem } from "../../../common/items.js";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Tags } from "../../../common/tags.js";
import InvoiceView from "./invoice_view.js";
import InvoicePDF from "./invoiceN.js";
import PaymentCard from "./paymentcard.js";
import useAlert from "../../../common/alert.js";
import { useOutletContext } from "react-router-dom";
import { get_Date } from "../../../common/localDate.js";
import Pricing from "./pricingcard.js";

const Billing = ({ companyList,billingList, saveData }) => {
   
    const { refresh, setRefresh } = useOutletContext();
   const {contextHolder, warning } = useAlert();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCVV] = useState('');
    const [expiry, setExpiry] = useState("");
    const [isCardExpired, setIsCardExpired] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [openView, setOpenView] = useState(false);

    useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.billinginfo !== null) {
                setName(companyList.billinginfo[0].name);
                setNumber(companyList.billinginfo[0].number);
                setMonth(companyList.billinginfo[0].month);
                setYear(companyList.billinginfo[0].year);
                setCVV(companyList.billinginfo[0].cvv);
                setExpiry(`${companyList.billinginfo[0].month}/${companyList.billinginfo[0].year}`)
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
        if (!isCardExpired && number.length === 19 && cvv.length === 3 && name !== '') {
            const Body = JSON.stringify({
                billinginfo: [{
                    name: name,
                    number: number,
                    month: month,
                    year: year,
                    cvv: cvv
                }]

            });
            saveData({
                label: "Billing Details",
                method: "PUT",
                endPoint: "company/billing",
                body: Body
            });
            setIsEdit(false);
        }
        else
            warning(`Please, fill out the required fields ! `);
    }  

    const headerItems = [
        getTableItem('1', 'Invoice #'),
        getTableItem('2', 'Invoice Date'),
        getTableItem('3', 'Due Date'),
        getTableItem('4', 'Total'),
        getTableItem('5', 'Status'),
        getTableItem('6', 'Action'),
    ];
    const btn_ViewClick = (id) => {
        setReload(reload + 1);
        setId(id);
        setOpenView(true);
    }
    return (
        <div class='flex flex-col gap-8'>

            <div id="plans"  class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <Heading label={"Change plan"} desc={'You can upgrade or downgrade whenever you want.'} Icon={<WalletFilled  />} />
                <Pricing/>
                <Divider id="billingdetail"/>

                <div class='flex items-center justify-between'>
                    <Heading label={"Billing details"} Icon={< CreditCardFilled />} />
                    {isEdit ?
                        <Space>
                            <Button color="primary" variant="solid" onClick={saveBillingDetails} >Save changes</Button>
                            <Button color="default" variant="filled" icon={<CloseOutlined />} onClick={() =>  {setIsEdit(false); setRefresh(refresh+1); }} >Cancel</Button>
                        </Space> :
                        <Button color="default" variant="filled" icon={<EditOutlined />} onClick={() => setIsEdit(true)} >Edit</Button>
                    }
                </div>

                <div  class=' ml-6 flex flex-col mb-6'>
                    <PaymentCard
                        isEdit={isEdit} onClick={()=>setIsEdit(true)}
                        name={name} setName={setName}
                        cardNumber={number} setCardNumber={setNumber}
                        month={month} setMonth={setMonth}
                        year={year} setYear={setYear}
                        cvv={cvv} setCvv={setCVV}
                        expiry={expiry} setExpiry={setExpiry}
                        isCardExpired={isCardExpired} setIsCardExpired={setIsCardExpired}
                    />
                </div>
            </div>

            <div id="invoice" class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Invoice history"} desc={"If you've just made a payment, it may take a few hours for it to appear in the table below."} Icon={<DatabaseFilled  />} />
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
                                    <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" onClick={() => btn_ViewClick(item.id)} ># {item.invoice}</td>
                                    <td class="p-3">{get_Date(item.trndate,'DD MMM YYYY')}</td>
                                    <td class="p-3">{get_Date(item.duedate,'DD MMM YYYY')}</td>
                                    <td class="p-3 font-semibold">$ {item.totalamount}</td>
                                     <td class="p-3">{Tags(item.status)}</td>
                                    <td class="p-3">
                                        <Tooltip placement="top" title={'View'} >
                                            <Button type="link" icon={<EyeOutlined />} onClick={() => btn_ViewClick(item.id)} />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'Download'} >
                                            <PDFDownloadLink document={<InvoicePDF id={item.id} refresh={reload} billingList={billingList} />} fileName="invoice.pdf">
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
            {contextHolder}
        </div>
    )

}

export default Billing