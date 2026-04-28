
import { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Drawer, Input, Modal, Popover, Tabs, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
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
import InvoiceView from "../Billing/invoice_view";

const MessageLogs = ({companyList,billingList,logsList, fromDate, toDate, searchInput, viewOrder, isLoading, setExportList }) => {
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);
    const [openView, setOpenView] = useState(false);
    useEffect(() => {
        const logs = logsList.filter(a => (get_Date(a.createdat, 'YYYY-MM-DD') >= fromDate && get_Date(a.createdat, 'YYYY-MM-DD') <= toDate));
        setList(logs);
        setExportList(logs);
        setPage(1, 10, logs);
    }, [logsList, fromDate, toDate])

    useEffect(() => {
        const query = (searchInput || "").toLowerCase();
        let searchedList = logsList.filter(item =>
            (item.message || "").toLowerCase().includes(query) ||
            (item.order_no || "").toString().includes(query) ||
            (item.to || "").toString().replace(/-/g, "").includes(query)
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
        getTableItem('1', 'Date'),
        getTableItem('2', 'To'),
        getTableItem('3', 'Order #'),
        getTableItem('4', 'Message'),
        getTableItem('5', 'Status'),
        getTableItem('6', 'Remaining_Credit')
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
                            <tr key={item.id} class={`${item.type === 'TwillioCredit' ? 'bg-green-200  ' : 'bg-white hover:bg-zinc-50 '} border-b text-xs  whitespace-nowrap border-gray-200   `}>
                                <td class="p-3 ">{UTC_LocalDateTime(item.createdat, 'DD MMM YYYY h:mm A')}</td>
                                <td class="p-3 ">{item.to}</td>
                                <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" onClick={() => {item.type === 'TwillioCredit' ? btn_ViewClick(item.oid) : viewOrder(item.oid)}} > # {item.order_no}</td>
                                <td class="p-3 ">{item.message}</td>
                                <td class="p-3 ">{Tags(item.status)}</td>
                                <td class="p-3 ">{item.credit}</td>

                            </tr>
                        ))
                    )} />
            } />

            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <InvoiceView id={id} refresh={reload} billingList={billingList} companyList={companyList} />
            </Drawer>
        </div>
    )
}

export default MessageLogs