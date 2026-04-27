
import { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Drawer, Input, Modal, Popover, Tabs, Tag, Tooltip } from "antd";
import { DownloadOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
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
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from "../Billing/invoiceN";
import InvoiceView from "../Billing/invoice_view";

const PaymentLogs = ({companyList, billingList, fromDate, toDate, searchInput,  isLoading, setExportList }) => {
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [openView, setOpenView] = useState(false);

    useEffect(() => {
        const logs = billingList.filter(a => (get_Date(a.createdat, 'YYYY-MM-DD') >= fromDate && get_Date(a.createdat, 'YYYY-MM-DD') <= toDate) );
        setList(logs);
        setExportList(logs);
        setPage(1, 10, logs);
    }, [billingList, fromDate, toDate])

    useEffect(() => {
        const query = (searchInput || "").toLowerCase();
        let searchedList = billingList.filter(item => item.category === 'twilio' &&(
            (item.message || "").toLowerCase().includes(query) ||
            (item.order_no || "").toString().includes(query) ||
            (item.to || "").toString().replace(/-/g, "").includes(query))
        );

        setExportList(searchedList);
        setList(searchedList);
        setCurrentPage(1)
        setPage(1, itemsPerPage, searchedList)
    }, [searchInput])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList);
    }

    const headerItems = [
        getTableItem('1', 'Invoice #'),
        getTableItem('2', 'Title'),
        getTableItem('3', 'Date'),
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
        <div>
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
                                <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" onClick={() => btn_ViewClick(item.id)} ># {item.invoice}</td>
                                <td class="p-3 font-semibold">{item.title}</td>
                                <td class="p-3">{get_Date(item.trndate, 'DD MMM YYYY')}</td>
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
            } />
            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <InvoiceView id={id} refresh={reload} billingList={billingList} companyList={companyList} />
            </Drawer>

        </div>

    )
}

export default PaymentLogs