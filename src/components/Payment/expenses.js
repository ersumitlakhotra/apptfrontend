/* eslint-disable react-hooks/exhaustive-deps */
import {  Button, DatePicker, Input,  Popconfirm,  Popover,  Tooltip} from "antd"
import { IoSearchOutline } from "react-icons/io5";
import {  getTableItem } from "../../common/items";
import DataTable from "../../common/datatable";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, ContainerOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { UTC_LocalDateTime } from "../../common/localDate";


const Expenses = ({ key, expensesData, btn_Click, btn_LogsClick, fromDate, setFromDate, toDate, setToDate, saveData, setExportList }) => {
  
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(expensesData);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setFilteredList(expensesData)
        setExportList(expensesData)
        setPage(1, 10, expensesData);
    }, [expensesData])

  useEffect(() => {
      const searchedList = expensesData.filter(item => 
            item.name.toLowerCase().includes(searchInput.toLowerCase()));
      setExportList(searchedList);
        if (searchInput === '')
            setPage(currentPage, itemsPerPage, searchedList)
        else
            setPage(1, itemsPerPage, searchedList)
    }, [searchInput])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
 
    const headerItems = [
        getTableItem('1', 'Date'),
        getTableItem('2', 'Name'),
        getTableItem('3', 'Quantity'),
        getTableItem('4', 'Price'),
        getTableItem('5', 'Tax'),
        getTableItem('6', 'Amount'),
        getTableItem('7', 'Notes'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    const deleted = (id) => {
        const Body = JSON.stringify({});
        saveData("Expense", 'DELETE', "payment", id, Body);
    };

    return (
        <div key={key} class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/3'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div class='w-full md:w-2/3'>
                    <div class='flex flex-col md:flex-row md:justify-end gap-4 '>
                        <Popover placement="bottom" title={"Filter by From Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    value={fromDate === '' ? fromDate : dayjs(fromDate, 'YYYY-MM-DD')}
                                    onChange={(date, dateString) => setFromDate(dateString)} />
                            </div>
                        }>
                            <Button className="text-xs"><span class='font-medium'>From Date :  </span><span class='text-blue-500'> {fromDate}  </span></Button>
                        </Popover>
                        <Popover placement="bottom" title={"Filter by To Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
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
            <DataTable headerItems={headerItems} list={(searchInput === '') ? expensesData : filteredList}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, expensesData)
                }}

                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 ">{UTC_LocalDateTime(item.trndate, "MMM DD,YYYY")}</td>
                            <td class="p-3 font-semibold">{item.name}</td>
                            <td class="p-3 ">{item.quantity}</td>

                            <td class="p-3 ">$ {item.netamount}</td>
                            <td class="p-3 ">$ {item.taxamount}</td>
                            <td class="p-3 ">$ {item.grossamount}</td>
                            <td class="p-3 ">{item.notes}</td>
                            <td class="p-3">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'Logs'} >
                                    <Button type="link" icon={<ContainerOutlined />} onClick={() => btn_LogsClick(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'Delete'} >
                                    <Popconfirm
                                        title="Delete "
                                        description="Are you sure to delete?"
                                        onConfirm={(e) => deleted(item.id) }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger type="link" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} /> 
        </div>
    )

}

export default Expenses