import DashHeaderItems from "../../components/Dashboard/HeaderItems/dashboard_header_Items";
import Cards from "../../components/Dashboard/Cards/cards";
import Chart from "react-apexcharts";
import { Button,  Dropdown, Flex, Space, Tag } from "antd";
import { DownOutlined } from '@ant-design/icons';

const handleButtonClick = e => {

    console.log('click left button', e);
};
const handleMenuClick = e => {

    console.log('click', e);
};
const items = [
    {
        label: 'Today',
        key: '1',
    },
    {
        label: 'This Week',
        key: '2',
    },
    {
        label: 'This Month',
        key: '3',
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
const Dashboard = ({orderList, servicesList}) => {
    const dashHeaderItems = DashHeaderItems;
    return (
        <div class="flex flex-col gap-4 mb-12">
            <span class="text-lg font-semibold text-gray-800">Dashboard</span>
            {/* cards*/}
            <div class='flex flex-col gap-6 md:flex-row '>
                {dashHeaderItems.map(items => (
                    <Cards key={items.key} label={items.label} value={items.value} />
                ))}
            </div>

            {/* statics and income*/}
            
            <div class='flex flex-col gap-8 mt-4 md:flex-row'>
                {/* statics with apex charts*/}
                <div class='flex flex-col gap-4 w-full md:w-3/5'>
                    <div class='flex justify-between'>
                        <span class="text-lg font-semibold text-gray-800">Statistics</span>
                        <Flex gap="small" wrap>
                            <Button color="primary" variant="outlined">
                                Month
                            </Button>
                            <Button color="default" variant="text">
                                Week
                            </Button>
                        </Flex>
                    </div>
                    <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                        <Chart
                            options={{

                                xaxis: {
                                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                                },
                                stroke: {
                                    curve: 'smooth',
                                },
                                dataLabels: {
                                    enabled: false
                                },
                            }}
                            series={[{
                                name: 'series1',
                                data: [31, 40, 28, 51, 42, 109, 100]
                            }, {
                                name: 'series2',
                                data: [11, 32, 45, 32, 34, 52, 41]
                            }]}
                            type="area"
                            height={500}
                        />
                    </div>
                </div>
                {/* income*/}
                <div class='flex flex-col gap-4 w-full md:w-2/5'>
                    <span class="text-lg font-semibold text-gray-800">Income Overview</span>
                    <div class='w-full bg-white border rounded p-5 text-gray-500 flex flex-col gap-6'>
                        <span class="text-sm text-gray-500">This Week Statistics</span>
                        <Chart
                            options={{
                                xaxis: {
                                    categories: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                },
                                stroke: {
                                    curve: 'smooth',
                                },
                                dataLabels: {
                                    enabled: false
                                }, grid: {
                                    show: false
                                }
                            }}
                            series={[{
                                name: 'Income',
                                data: [31, 40, 28, 51, 42, 109, 100]
                            }]}
                            type="bar"
                            height={460}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Orders*/}
            <div class='flex flex-col gap-4 mt-4'>           
                <div class='flex justify-between'>
                    <span class="text-lg font-semibold text-gray-800">Pending Orders</span>
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                Today
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                 {/*<OrderTable dataSource={orderList} serviceList={servicesList} />*/}
            </div>


            {/*Daily sales ,users, transaction*/}
            <div class='flex flex-col gap-8 mt-4 md:flex-row'>
                {/* statics*/}
                <div class='flex flex-col gap-4 w-full md:w-1/4'>
                    <span class="text-lg font-semibold text-gray-800">Order Statistics</span>
                    <div class='w-full bg-white border rounded p-5 gap-2 text-gray-500 flex flex-col'>
                        <Chart
                            options={{  
                                labels: [ 'Pending','Completed', 'Cancelled'],                           
                                stroke: {
                                    curve: 'smooth',
                                },
                                dataLabels: {
                                    enabled: true
                                }, grid: {
                                    show: false
                                },
                                fill: {
                                    colors: ['#FFD580', '#90EE90', '#ff6666']
                                },
                                plotOptions: {
                                    pie: {
                                        expandOnClick: false,
                                    },
                                }
                            }}
                            series={[40, 28, 51]}
                            type="donut"
                            height={200}
                            width={'100%'}
                        />
                        
                        <div class='flex justify-between border-b pb-2'>
                            <span class="font-semibold text-gray-400">Total Orders</span>
                            <Tag color="blue" className='text-center'> 100 </Tag>
                        </div>

                        <div class='flex justify-between border-b pb-2'>
                            <span class="font-semibold text-gray-400">Pending</span>
                            <Tag color="#FFD580" className='text-center '> 10 </Tag>
                        </div>

                        <div class='flex justify-between border-b pb-2'>
                            <span class="font-semibold text-gray-400">Completed</span>
                            <Tag color="#90EE90" className='text-center'> 75 </Tag>
                        </div>

                        <div class='flex justify-between  pb-2'>
                            <span class="font-semibold text-gray-400">Cancelled</span>
                            <Tag color="#ff6666" className='text-center'> 15 </Tag>
                        </div>
                    </div>
                </div>

                {/* user*/}
                <div class='flex flex-col gap-4 w-full md:w-2/4'>                   
                    <div class='flex justify-between'>
                        <span class="text-lg font-semibold text-gray-800">Team Overview</span>
                        <Dropdown menu={menuProps}>
                            <Button>
                                <Space>
                                    Today
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div class='w-full bg-white border rounded p-5 gap-2 text-gray-500 flex flex-col'>
                        <Chart
                            options={{   
                                labels: ['Sumit', 'Sandeep', 'Harman','Darsh', 'Gurpreet', 'Parminder'],                                   
                                stroke: {
                                    curve: 'smooth',
                                },
                                dataLabels: {
                                    enabled: true,                                    
                                }, grid: {
                                    show: false
                                },
                                fill: {
                                    colors: ['#FFD580', '#90EE90', '#ff6666']
                                },                         
                                plotOptions: {
                                    bar: {
                                        horizontal: true,
                                        dataLabels: {
                                            total: {
                                                enabled: true,
                                                style: {
                                                    fontWeight: 700,
                                                    color: 'lightblue',
                                                    
                                                }
                                            }
                                        }
                                    }
                                },
                                chart:{
                                    stacked:true
                                }
                            }}
                            series={[
                                {
                                    name: 'Pending',
                                    data: [10, 55, 41, 67, 22, 43]
                                },
                                {
                                    name: 'Completed',
                                    data: [44, 55, 41, 67, 22, 43]
                                },
                                {
                                    name: 'Cancelled',
                                    data: [44, 55, 41, 67, 22, 43]
                                }
                            ]}
                            type="bar"
                            chart="stacked"
                            height={350}
                        />
                   
                    </div>
                </div>

                {/* TransAction*/}
                <div class='flex flex-col gap-4  w-full md:w-1/4'>
                   
                    <div class='flex justify-between'>
                        <span class="text-lg font-semibold text-gray-800">Transaction History</span>
                        <Button color="primary" variant="outlined">
                            View all 
                        </Button>
                    </div>
                    <div class='w-full bg-white border rounded text-gray-500 flex flex-col'>
                        <div class='p-5 border-b text-gray-500 flex flex-col hover:bg-gray-50 cursor-pointer'>
                            <div class='flex items-center justify-between font-semibold text-gray-600'>
                                <span> Order <span class='text-blue-400'>#12</span></span>
                                <span>+ $40</span>
                            </div>
                            <div class='flex items-center justify-between text-xs text-gray-500'>
                                <span>Today, 2:00 AM</span>
                                <span>Sandeep</span>
                            </div>
                        </div>
                        <div class='p-5 border-b text-gray-500 flex flex-col hover:bg-gray-50 cursor-pointer'>
                            <div class='flex items-center justify-between font-semibold text-gray-600'>
                                <span> Order <span class='text-blue-400'>#15</span></span>
                                <span>+ $25</span>
                            </div>
                            <div class='flex items-center justify-between text-xs text-gray-500'>
                                <span>7 hours ago</span>
                                <span>Sumit</span>
                            </div>
                        </div>
                        <div class='p-5 border-b text-gray-500 flex flex-col hover:bg-gray-50 cursor-pointer'>
                            <div class='flex items-center justify-between font-semibold text-gray-600'>
                                <span> Order <span class='text-blue-400'>#15</span></span>
                                <span>+ $25</span>
                            </div>
                            <div class='flex items-center justify-between text-xs text-gray-500'>
                                <span>7 hours ago</span>
                                <span>Sumit</span>
                            </div>
                        </div>
                        <div class='p-5 border-b text-gray-500 flex flex-col hover:bg-gray-50 cursor-pointer'>
                            <div class='flex items-center justify-between font-semibold text-gray-600'>
                                <span> Order <span class='text-blue-400'>#15</span></span>
                                <span>+ $25</span>
                            </div>
                            <div class='flex items-center justify-between text-xs text-gray-500'>
                                <span>7 hours ago</span>
                                <span>Sumit</span>
                            </div>
                        </div>
                        <div class='p-5 border-b text-gray-500 flex flex-col hover:bg-gray-50 cursor-pointer'>
                            <div class='flex items-center justify-between font-semibold text-gray-600'>
                                <span> Order <span class='text-blue-400'>#15</span></span>
                                <span>+ $25</span>
                            </div>
                            <div class='flex items-center justify-between text-xs text-gray-500'>
                                <span>7 hours ago</span>
                                <span>Sumit</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Dashboard;