import {Button } from "antd";

import { EditOutlined } from '@ant-design/icons';
import {dayjs} from 'dayjs';

function getHeaderItem(key, label) {
    return {
        key,
        label
    };
}

const ServicesTable = ({ dataSource, onEdit }) => {

    const headerItems = [
        getHeaderItem('1', 'TITLE'),
        getHeaderItem('2', 'PRICE'),
        getHeaderItem('3', 'TIMING'),
        getHeaderItem('4', 'STATUS'),
        getHeaderItem('5', 'CREATED AT'),
        getHeaderItem('6', 'MODIFIED AT'),
        getHeaderItem('7', 'ACTION'),
    ];

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headerItems.map(items => (
                            <th scope="col" id={items.key} class="px-6 py-3">
                                {items.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map(items => (
                        <tr key={items.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            
                            <td class="px-6 py-4">
                                <span class="text-base font-semibold">{items.title}</span>
                            </td>

                            <td class="px-6 py-4">
                                ${items.price}
                            </td>

                            <td class="px-6 py-4">
                                {items.timing} minutes
                            </td>

                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class={`h-2.5 w-2.5 rounded-full ${items.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {items.status}
                                </div>
                            </td>

                            <td class="px-6 py-4">
                                {items.createdat}
                                {/*{dayjs(items.createdat, 'YYYY-MM-DD')}*/}
                            </td>

                            <td class="px-6 py-4">
                                {items.modifiedat}
                              
                            </td>
                       
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

export default ServicesTable;
