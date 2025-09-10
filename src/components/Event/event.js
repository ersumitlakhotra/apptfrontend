/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Tooltip, Tag } from "antd";
import { EditOutlined, ContainerOutlined } from '@ant-design/icons';
import { IoSearchOutline } from "react-icons/io5";
import { Tags } from "../../common/tags";
import dayjs from 'dayjs';
import { getDate, getTableItem } from "../../common/items";
import DataTable from "../../common/datatable";
import { useEffect, useState } from "react";

const Events = ({ eventList, servicesList, btn_Click, btn_LogsClick }) => {
    const [searchInput, setSearchInput] = useState('');

    const [filteredList, setFilteredList] = useState(eventList);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setFilteredList(eventList)
        setPage(1, 10, eventList);
    }, [eventList])

    useEffect(() => {
        const searchedList = eventList.filter(item =>
            (item.title.toLowerCase().includes(searchInput.toLowerCase())));
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
        getTableItem('1', 'Name'),
        getTableItem('2', 'Description'),
        getTableItem('3', 'Services'),
        getTableItem('4', 'Coupon'),
        getTableItem('5', 'Amount'),
        getTableItem('6', 'Date'),
        getTableItem('7', 'Status'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>

            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/3'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
            </div>

            <DataTable headerItems={headerItems} list={searchInput === '' ? eventList : filteredList}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, eventList)
                }}
                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 text-sm font-semibold">{item.title}</td>
                            <td class="p-3 text-gray-500">{item.description}</td>
                            <td class="p-3">
                                {item.serviceinfo !== null &&
                                    servicesList.filter(a =>
                                        item.serviceinfo.some(b => b === a.id)
                                    ).map(c => <Tag key={c.id} color="cyan" bordered={false}>{c.name}</Tag>)
                                }
                            </td>
                            <td class="p-3 font-medium ">{item.coupon}</td>
                            <td class="p-3 ">$ {item.total}</td>
                            <td class="p-3 ">{dayjs(item.startdate).format('ddd, MMM DD')} - {dayjs(item.enddate).format('ddd, MMM DD')}</td>
                            <td class="p-3 "> {Tags(item.case)}</td>
                            <td class="p-3 ">{getDate(item.modifiedat)}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'Logs'} >
                                    <Button type="link" icon={<ContainerOutlined />} onClick={() => btn_LogsClick(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />
        </div>
    )
}

export default Events

