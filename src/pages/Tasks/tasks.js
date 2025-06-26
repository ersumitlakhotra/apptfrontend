import {Button, Dropdown,  Tag } from "antd"

import { EllipsisOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

const handleMenuClick = e => {

    console.log('click', e);
};
const items = [
    {
        label: 'Assigned To',
        key: '1',
        children: [
            {
                key: '11',
                label: 'Sandeep',
            },
            {
                key: '12',
                label: 'Sumit',
            },
        ],
    }
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
const Tasks = ({ setLoading }) => {
    return(
        <div class="flex flex-col gap-4 mb-12">
            <div class='p-2 text-gray-500 flex md:flex-row flex-col gap-6'>
                <div class='flex flex-col gap-4 w-full md:w-1/5'>
                    <div class='flex justify-between items-center'>
                        <span class="font-semibold text-gray-600">UNASSIGNED</span>
                        <Tag color="yellow" className='text-center'> 75 </Tag>
                    </div>
                    <div class='w-full bg-white border rounded text-gray-500'>
                        <div class='border-b h-12 flex items-center justify-between px-2'>
                            <div class='flex flex-col'>
                                <span class="font-semibold text-sm text-gray-600">Sumit Kumar</span>
                                <span class="text-xs text-gray-600">647-680-0045</span>
                            </div>
                            <Dropdown menu={menuProps}>
                                <Button color="default" variant="link">
                                    <EllipsisOutlined/>
                                </Button>
                            </Dropdown>

                        </div>
                        <div class='flex flex-col gap-2 p-2 text-xs'>
                            <div class='flex flex-row items-center gap-2 '>
                                <UnorderedListOutlined />
                                <p>Cutting</p>
                                <p>Beard</p>
                            </div>
                            <div class='flex flex-row items-center gap-2 '>
                                <ClockCircleOutlined />
                                <p>02:00 PM - 02:30 PM</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Tasks