import { Button, Tag } from "antd";
import { EditOutlined } from '@ant-design/icons';

function getHeaderItem(key, label) {
    return {
        key,
        label
    };
}

const OrderTable = ({dataSource,  onEdit, serviceList} ) => {

    const headerItems = [
        getHeaderItem('1', 'ORDER'),
        getHeaderItem('2', 'STATUS'),
        getHeaderItem('3', 'CUSTOMER'),
        getHeaderItem('4', 'SERVICES'),
        getHeaderItem('5', 'PRICE'),
        getHeaderItem('6', 'SCHEDULED'),
        getHeaderItem('7', 'CLIENTS'),
        getHeaderItem('8', 'EMPLOYEE'),
        getHeaderItem('9', 'LAST MODIFIED'),
        getHeaderItem('10', 'ACTIONS'),
    ];
 
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headerItems.map(items => (
                            <th scope="col" id={items.key} key={items.key} class="px-6 py-3">
                                {items.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map(items => (
                        <tr key={items.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {/* order_no*/}
                            <td class="px-6 text-blue-500">
                                <span># </span>{items.order_no}
                            </td>

                            {/* status*/}
                            <td class="px-4">
                                <Tag color={items.status.toUpperCase() === "PENDING" ? 'yellow' : 'green'}>
                                    {items.status.toUpperCase()}
                                </Tag>
                            </td>

                            {/* customer*/}
                            <td class="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{items.customer_name}</div>
                                    <div class="font-normal text-gray-500">{items.customer_phone}</div>
                                </div>
                            </td>

                            {/* Services */}
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

                            {/* Price */}
                            <td class="px-6 py-4 font-bold">
                                <span>$ </span>{items.price}
                            </td>

                            {/* scheduled */}
                            <td class="px-6 py-4">


                            </td>

                            {/* clients */}
                            <td class="px-6 py-4">
                                {items.clients}
                            </td>

                            {/* employeee*/}
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{items.assignedto}</div>
                                    <Tag color={
                                        `${items.assignedto} === "null" ? "yellow" : "green`}>
                                        {items.assignedto}
                                    </Tag>
                                </div>
                            </th>

                            {/* last modified */}
                            <td class="px-6 py-4">
                                {items.modifiedat}
                            </td>

                            {/* Action */}
                            <td class="px-6 py-4">
                                <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(items.id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable;
