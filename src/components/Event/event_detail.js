import { useEffect, useImperativeHandle, useState } from "react";
import { apiCalls } from "../../hook/apiCall";
import { Button, DatePicker, Flex, Radio, Select, Space } from "antd";
import dayjs from 'dayjs';
import { CheckOutlined, CloseOutlined, LineChartOutlined } from '@ant-design/icons';

const EventDetail = ({ id, reload, ref }) => {
     const emptyData = {
            "title": "",
            "price": "",
            "timing": "",
            "status": "Active",
            "createdat": "",
            "modifiedat": "",
            "id": "0"
        }
        const [dataList, setDataList] = useState(emptyData);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Active');
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState(1);

    const [servicesList, setServicesList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));


        useEffect(() => {
            getData();
        }, [reload]);
    
        const getData = async () => {
            if (id !== 0) {
                const res = await apiCalls('GET', 'event', id, null);
                setDataList(res.data.data);
            }
            else
                setDataList(emptyData);
        }

    const getServices = async () => {
        try {
            const res = await apiCalls('GET', 'services', null, null);
            setServicesList(res.data.data);
        }
        catch (e) {
            setServicesList([]);
        }
        }
    
        useEffect(() => {
            setTitle(dataList.title);
            getServices();
        }, [dataList])
    
    
        const btnSave_Click = async () => {
            try {
                const Body = JSON.stringify({
                    title: title,
                    description:description,
                    startdate:startDate,
                    enddate:endDate,
                    services: `${selectedItems.join(',')}`,
                    discounttype:discountType,
                    discount:discount,
                    status:status
                });
                if (id !== 0) {
                    return await apiCalls('PUT', 'event', id, Body);
                }
                else
                    return await apiCalls('POST', 'event', null, Body);
            } catch (error) {
                return JSON.stringify({
                    status: 500,
                    message: error.message
                });
            }
        }
    
        useImperativeHandle(ref, () => {
            return {
                btnSave_Click,
            };
        })
return(
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <p class="text-gray-400 mb-4">Event Information</p>

        {/*  title */}
        <div class='flex items-center w-full gap-2'>
            <p class="font-semibold w-32">Event Title <span class='text-red-600'>*</span></p>
            <input type="text" name="title" id="title" value={title}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/*  description */}
        <div class='flex items-center w-full gap-2'>
            <p class="font-semibold w-32">Description <span class='text-red-600'>*</span></p>
            <textarea name="description" id="description" value={description}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/*  date */}
        <div class='flex items-center w-full gap-2'>
            <p class="font-semibold w-32">Date <span class='text-red-600'>*</span></p>
                <DatePicker placeholder="Start" onChange={(value, dateString) => { setStartDate(dateString) }} style={{ width: '48%' }}
                    value={(startDate !== '' && startDate !== undefined && startDate !== null) && dayjs(startDate, 'YYYY-MM-DD')} />
            <DatePicker placeholder="End" onChange={(value, dateString) => { setEndDate(dateString) }} style={{ width: '48%' }}
                    value={(endDate !== '' && endDate !== undefined && endDate !== null) && dayjs(endDate, 'YYYY-MM-DD')} />
        </div>
     
        {/*  services */}
        <div class='flex items-center w-full gap-2'>
            <p class="font-semibold w-32">Services <span class='text-red-600'>*</span></p>
            <Select mode="multiple" placeholder="Services" value={selectedItems} onChange={e => { setSelectedItems(e); console.log(e) }} style={{ width: '100%' }}
                options={filteredOptionsServices.map(item => ({
                    value: item.id,
                    label: item.title,
                }))}
            />
        </div>

        {/*  discount */}
        <div class='flex w-full gap-2'>
            <p class="font-semibold w-32">Discount <span class='text-red-600'>*</span></p>
            <div class="flex flex-col w-full gap-3">               
            <Radio.Group style={{ width: '100%' }}
                value={discountType}
                onChange={e => setDiscountType(e.target.value)}
                options={[
                    { value: 1, label: 'Flat Price' },
                    { value: 2, label: 'Percentage' },                 
                ]}
            />

            <input type="number" name="price" id="price" value={discount}
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0" onChange={(e) => setDiscount(e.target.value)} />

            </div>
        </div>


       

        {/*  Active Inactive */}
        <div class='flex items-center w-full gap-2'>
            <p class="font-semibold w-32">Status</p>
            <div class='flex flex-row items-center gap-2 w-full'>
                <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => setStatus('Active')} >Active</Button>
                <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => setStatus('Inactive')} >Inactive</Button>
            </div>
        </div>

        </div>
    )
}


export default EventDetail;