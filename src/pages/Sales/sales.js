import { Avatar, Button, DatePicker, Flex, Image, Popover, Tag } from "antd";
import { DownloadOutlined, UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import { Bar,Pie } from '../../components/Sales/graph'
import DataTable from "../../common/datatable";
import { getTableItem } from "../../common/items";

import { LocalDate } from "../../common/localDate.js";
import dayjs from 'dayjs';
const Sales = ({ orderList ,userList }) => {
    const [barChart, setBarChart] = useState(null);
    const [PieChart, setPieChart] = useState(null);
    const [filteredList, setFilteredList] = useState([]);



    const [fromDate, setFromDate] = useState(LocalDate());
    const [toDate, setToDate] = useState(LocalDate());
    useEffect(() => {
        setBarChart(<Bar />)
        setPieChart(<Pie />)
    }, [])
    
        const headerItems = [
            getTableItem('1', 'User'),
            getTableItem('2', 'Sales'),
            getTableItem('3', 'Expense'),
            getTableItem('4', 'Amount')
        ];
    return(
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Sales Report</span>
                <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
            </div>

            <div class='flex flex-col gap-4 w-full md:flex-row'>

                <div class='flex flex-col gap-4 w-full md:w-1/2 '>
                    <div class='flex flex-col gap-4 w-full'>
                        <Flex gap="small" wrap justify="end">
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Year
                            </Button>
                        </Flex>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {barChart}
                        </div>
                    </div>
                    <div class='flex flex-col gap-4 w-full'>
                        <Flex gap="small" wrap justify="end">
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Year
                            </Button>
                        </Flex>
                        <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                            {PieChart}
                        </div>
                    </div>
                </div>

                <div class='flex flex-col gap-4 w-full bg-white border rounded p-5 text-gray-500 md:w-1/2 '>
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
                    <DataTable headerItems={headerItems} list={userList} isFooter={false}                
                        body={(
                            userList.map(item => (
                                <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                    <td class="p-3">
                                        <div key={item.id} class='flex flex-row gap-2 items-center'>
                                            {item.profilepic !== null ?
                                                <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                                <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                            }
                                            <p>{item.fullname}</p>
                                        </div>
                                    </td>
                                    <td class="p-3 font-semibold">$ 4000</td>
                                    <td class="p-3 font-semibold">$ 3000</td>
                                    <td class="p-3 "><Tag key={item.id} color="green" bordered={false}>$ 1000</Tag></td>

                                </tr>
                            ))
                        )} />   
                </div>
            </div>


            
        </div>
    )
}

export default Sales;