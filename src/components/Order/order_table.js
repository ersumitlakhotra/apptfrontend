import { Button, Pagination, Tag, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import { Tags } from "../../common/tags";
function getHeaderItem(key, label) {
    return {
        key,
        label
    };
}

const OrderTable = ({ orderList ,  onEdit, serviceList} ) => {

    const headerItems = [
        getHeaderItem('1', 'Order'),
        getHeaderItem('2', 'Customer'),
        getHeaderItem('3', 'Date'),
        getHeaderItem('4', 'Service'),
        getHeaderItem('5', 'Price'),
        getHeaderItem('6', 'Status'),
        getHeaderItem('7', 'Booked'),
        getHeaderItem('8', 'Action'),
    ];
 
    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-left  ">
                <thead class="h-12 border-b text-gray-700 bg-zinc-50 ">
                    <tr>
                        {headerItems.map(items => (
                            <th scope="col" id={items.key} key={items.key} class={`py-3 font-medium `}>
                                <p class='border-e w-full px-3'>{items.label}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orderList.length === 0 ?
                    <tr>
                            <td colSpan={headerItems.length} class='text-left border-b p-4 text-sm font-medium text-gray-500'>
                                No data found
                            </td>
                    </tr>
                    :
                        orderList.map(items => (
                            <tr key={items.id} class="bg-white border-b text-sm  border-gray-200 hover:bg-zinc-50 ">
                            
                                <td class="p-3 text-blue-500 italic hover:underline cursor-pointer"># {items.order_no}</td>
                              
                                <td class="p-3">
                                    {items.customerinfo !== null && 
                                    <>
                                        <p class="font-semibold">{items.customerinfo[0].name}</p>
                                        <p class="text-xs font-medium text-gray-400">{items.customerinfo[0].cell}</p>  
                                    </>
                                    }         
                                </td>

                                <td class="p-3">
                                    {(items.trndate !== null || items.trndate !== '') && <>
                                        <p class="font-semibold">{dayjs(items.trndate).format('DD MMM YYYY')}</p>
                                        <p class="text-xs font-medium text-gray-400">{dayjs(items.trndate).format('h:mm A')}</p>
                                    </>}
                                </td>

                                <td class="p-3">
                                    {items.serviceinfo !== null &&
                                        items.serviceinfo[0].map(service => (
                                            Tags(service.name)
                                        ))
                                    }
                                </td>

                                <td class="p-3 font-semibold">$ {items.price}</td>

                                <td class="p-3">
                                    {Tags(items.status)}
                                </td>

                                <td class="p-3">{items.assignedto}</td>

                                <td class="p-3">
                                    <Tooltip placement="top" title={'Edit'} >
                                        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(items.id)}/>
                                    </Tooltip>
                                    <Tooltip placement="top" title={'View'} >
                                    <Button type="link" icon={<EyeOutlined />} onClick={() => onEdit(items.id)}/>
                                    </Tooltip>
                                </td>


                                {/*  (companyList.addressinfo !== null) {setStreet(companyList.addressinfo[0].street) }

                            <td class="px-4">
                                <Tag color={items.status.toUpperCase() === "PENDING" ? 'yellow' : 'green'}>
                                    {items.status.toUpperCase()}
                                </Tag>
                            </td>

                            <td class="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{items.customer_name}</div>
                                    <div class="font-normal text-gray-500">{items.customer_phone}</div>
                                </div>
                            </td>
                            <td class="px-4">
                                <div class="ps-3">
                                    {
                                        (items.services === null || String(items.services).trim() === '')
                                            ? []
                                            : String(items.services).split(',').map(item => (
                                                <div class="font-normal text-gray-500 italic">
                                                    {serviceList.find(service => service.id === item).title}
                                                </div>
                                            ))
                                    }
                                </div>
                            </td>

                            <td class="px-6 py-4 font-bold">
                                <span>$ </span>{items.price}
                            </td>

                            <td class="px-6 py-4">


                            </td>

                            <td class="px-6 py-4">
                                {items.clients}
                            </td>

                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{items.assignedto}</div>
                                    <Tag color={
                                        `${items.assignedto} === "null" ? "yellow" : "green`}>
                                        {items.assignedto}
                                    </Tag>
                                </div>
                            </th>

                            <td class="px-6 py-4">
                                {items.modifiedat}
                            </td>

                            <td class="px-6 py-4">
                                <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(items.id)}>Edit</Button>
                            </td>
                           */}

                        </tr>
                    ))
                    }
                </tbody>
                <tfoot >  
                    <td align="right" colSpan={headerItems.length} class='p-1 place-items-start md:place-items-end'>         
                    <Pagination
                        total={orderList.length}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        defaultPageSize={20}
                        defaultCurrent={1}
                        
                    />
                    </td>           
                </tfoot>
            </table>
        </div>
    )
}

export default OrderTable;
