import { Avatar, Button, Image, Input, Table, Tag, Tooltip} from "antd"
import { IoSearchOutline } from "react-icons/io5";
import OrderTable from "./order_table"
import { getDate, getTableItem } from "../../common/items";
import DataTable from "../../common/datatable";
import { useEffect, useState } from "react";

import { DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Tags } from "../../common/tags";

const dataSource = Array.from({ length: 100 }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
}));
const OrderTabs = ({ orderList, servicesList , userList , btn_Click }) => {
  
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(orderList);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setFilteredList(orderList)
        setPage(1, 10, orderList);
    }, [])

    const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList)
    }
 

    const headerItems = [
        getTableItem('1', 'Order'),
        getTableItem('2', 'Customer'),
        getTableItem('3', 'Date'),
        getTableItem('4', 'Services'),
        getTableItem('5', 'Rate'),
        getTableItem('6', 'Status'),
        getTableItem('7', 'Booked'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    return (
        <div  class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex flex-col md:flex-row gap-2 items-center justify-between'>
                <div class='w-full md:w-1/3'>
                    <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
            </div>
            <DataTable headerItems={headerItems} list={(searchInput === '') ? orderList : filteredList}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setItemsPerPage(pageSize);
                    setPage(page, pageSize, orderList)
                }}
                body={(
                    filteredList.map(item => (
                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                            <td class="p-3 text-blue-500 italic hover:underline cursor-pointer"># {item.order_no}</td>

                            <td class="p-3">
                                {item.customerinfo !== null &&
                                    <>
                                        <p class="font-semibold">{item.customerinfo[0].name}</p>
                                        <p class="text-xs font-medium text-gray-400">{item.customerinfo[0].cell}</p>
                                    </>
                                }
                            </td>

                            <td class="p-3">
                                {(item.trndate !== null && item.trndate !== '') && <>
                                    <p class="font-semibold">{dayjs(item.trndate).format('DD MMM YYYY')}</p>
                                    <p class="text-xs font-medium text-gray-400">{item.slot}</p>
                                </>}
                            </td>

                            <td class="p-3">
                                {item.serviceinfo !== null &&
                                    servicesList.filter(a =>
                                        item.serviceinfo.some(b => b === a.id)
                                ).map(c => <Tag color="cyan" bordered={false}>{c.name}</Tag>)
                                }
                            </td>

                            <td class="p-3 font-semibold">$ {item.price}</td>
                            <td class="p-3">{Tags(item.status)}</td>

                            <td class="p-3">{item.assignedto === '0' ? '' :
                                userList.filter(user => user.id === item.assignedto).map(a =>
                                    <div class='flex flex-row gap-2 items-center'>
                                        {a.profilepic !== null ?
                                            <Image width={31} height={31} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                            <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <p>{a.fullname}</p>
                                    </div>
                                )}
                            </td>

                            <td class="p-3 ">{getDate(item.modifiedat)}</td>
                            <td class="p-3">
                                <Tooltip placement="top" title={'Edit'} >
                                    <Button type="link" icon={<EditOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                                <Tooltip placement="top" title={'View'} >
                                    <Button type="link" icon={<EyeOutlined />} onClick={() => btn_Click(item.id)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                )} />   
        </div>
    )

}

export default OrderTabs