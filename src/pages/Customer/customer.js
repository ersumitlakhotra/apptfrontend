/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Button, Drawer, Input, Select, Space, Tooltip } from "antd";
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";
import { Sort } from '../../common/sort.js'
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ExportToExcel from "../../common/export.js";
import { UTC_LocalDateTime } from "../../common/localDate.js";
import CustomerDetail from "../../components/Customer/customer_detail.js";
import { useOutletContext } from "react-router-dom";
import IsLoading from "../../common/custom/isLoading.js";
import FetchData from "../../hook/fetchData.js";
import PageHeader from "../../common/pages/pageHeader.js";

const Customer = () => {
    const ref = useRef();
    const headingLabel = 'Customers'
    const { saveData, refresh } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New');
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(0);

    const [customerList, setCustomerList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [sortAscDesc, setSortAscDesc] = useState('name asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [exportList, setExportList] = useState([]);

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true)
        const customerResponse = await FetchData({
            method: 'GET',
            endPoint: 'customer'
        })

        setCustomerList(customerResponse.data);
        setFilteredList(customerResponse.data);
        setList(customerResponse.data);
        setExportList(customerResponse.data);
        setPage(1, 10, customerResponse.data);

        setIsLoading(false)
    }

    const btn_Click = (id) => {
        setTitle(id === 0 ? `New ${headingLabel}` : `Edit ${headingLabel}`);
        setReload(reload + 1);
        setId(id);
        setOpen(true);
    }
    const btnSave = async () => {
        await ref.current?.save();
    }

    useEffect(() => {
        const searchedList = customerList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.cell.toLowerCase().includes(searchInput.toLowerCase())
        ));

        setExportList(searchedList);
        setList(searchedList);
        setCurrentPage(1);
        setPage(1, itemsPerPage, searchedList);
    }, [customerList, searchInput, sortAscDesc])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }

    const setSort = (value) => {
        const getValue = value.split(' ');
        setCustomerList(Sort(getValue[0], getValue[1], customerList))
        setSortAscDesc(value);
    }

    const headerItems = [
        getTableItem('1', 'Name'),
        getTableItem('2', 'E-Mail'),
        getTableItem('3', 'Cell'),
        getTableItem('4', 'Last Modified'),
        getTableItem('5', 'Action'),
    ];
    return (
        <div class="flex flex-col gap-4 md:px-7 py-4  mb-12">
            <PageHeader label={headingLabel} isExport={true} exportList={exportList} exportName={headingLabel} isCreate={true} onClick={() => btn_Click(0)} servicesList={[]} userList={[]} />
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

                <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div class='w-full md:w-1/3'>
                        <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <div class='w-full md:w-2/3 flex flex-row md:justify-end justify-start gap-4'>
                        <div class='flex flex-row gap-2 items-center'>
                            <p class='text-sm text-gray-500 whitespace-nowrap'>Sort by</p>
                            <Select
                                value={sortAscDesc}
                                style={{ width: 120 }}
                                onChange={(e) => setSort(e)}
                                options={[
                                    {
                                        label: <span class='flex flex-row justify-between items-center text-xs'>Ascending <FaSortAlphaDown /></span>,
                                        title: 'Ascending',
                                        options: [
                                            { label: "Name", value: 'name asc' },
                                        ],
                                    },
                                    {
                                        label: <span class='flex flex-row justify-between items-center text-xs'>Descending <FaSortAlphaUp /></span>,
                                        title: 'Descending',
                                        options: [
                                            { label: 'Name', value: 'name desc' },
                                        ],
                                    },
                                ]}
                            />
                        </div>

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
                            filteredList.map(item => (
                                <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                    <td class="p-3 font-semibold">{item.name}</td>
                                    <td class="p-3 ">{item.email}</td>
                                    <td class="p-3 ">{item.cell}</td>
                                    <td class="p-3">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                                    <td class="p-3">
                                        <Tooltip placement="top" title={'Edit'} >
                                            <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))
                        )} />} />
            </div>

            <Drawer title={title} placement='right' width={500} onClose={() => setOpen(false)} open={open}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>

                <CustomerDetail id={id} refresh={reload} ref={ref} customerList={customerList} saveData={saveData} setOpen={setOpen} />
            </Drawer>
        </div>
    )
}

export default Customer