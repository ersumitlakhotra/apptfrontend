import { Button, Divider, Select } from "antd";
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import OrderHeaderItems from "../../components/Order/OrderItems/order_header_items";
import Cards from "../../components/Order/Cards/cards";
import OrderTable from "../../components/Order/Table/order_table"; 

const Order=()=> {
    return(
        <div class='bg-white border rounded-md w-full p-4 '>
            <div class='flex items-center justify-between'>
                <p class='text-xl font-semibold text-gray-600'>List of orders </p>  
                <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large">Create order</Button>
                    <Button type='default' icon={<DownloadOutlined />} size="large">Export</Button>
                </div>
            </div>
            <Divider/>

            <div class='flex flex-col gap-2 lg:flex-row '>
            {OrderHeaderItems.map (items => (
                <Cards key={items.key} label={items.label} value={items.value} icon={items.icon} color={items.color} />
            ))}
            </div>
            <Divider/>

            <div class='flex items-center justify-between mb-6'>
                <input type="text" name="search" id="search" 
                             class="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="Search. . ."/>
                <div class="flex gap-2">
                    <Select
                        defaultValue="15"
                        style={{ width: 70 , height:40 }}
                        options={[
                            { value: '15', label: '15' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' },
                        ]}
                        />
                    <p class='flex items-center justify-center text-gray-600 '>entries per page</p>
                </div>               
            </div>

            <OrderTable/>
        </div>
    )
}

export default Order;