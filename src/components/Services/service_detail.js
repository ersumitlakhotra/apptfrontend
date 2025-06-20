
import { useEffect, useImperativeHandle, useState } from "react";
import { apiCalls } from "../../hook/apiCall";
import { Button } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const ServiceDetail = ({ id, reload, ref }) => {
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
    const [price, setPrice] = useState('');
    const [timing, setTiming] = useState('');
    const [status, setStatus] = useState('Active');

    useEffect(() => {
        getData();
    }, [reload]);

    const getData = async () => {
        if (id !== 0) {
            const res = await apiCalls('GET', 'services', id, null);
            setDataList(res.data.data);
        }
        else
            setDataList(emptyData);
    }

    useEffect(() => {
        setTitle(dataList.title);
        setPrice(dataList.price);
        setTiming(dataList.timing);
        setStatus(dataList.status);

    }, [dataList])


    const btnSave_Click = async () => {
        try {
            const Body = JSON.stringify({
                title: title,
                price: price,
                timing: timing,
                status: status
            });
            if (id !== 0) {
                return await apiCalls('PUT', 'services', id, Body);
            }
            else
                return await apiCalls('POST', 'services', null, Body);
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


    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Service Information</p>

            {/*  title */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Title <span class='text-red-600'>*</span></p>
                <input type="text" name="fullname" id="fullname" value={title}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/*  price */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Price ($) </p>
                <input type="text" name="price" id="price" value={price}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="price" onChange={(e) => setPrice(e.target.value)} />
            </div>

            {/*  timing */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Time (Min) </p>
                <input type="text" name="timing" id="timing" value={timing}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="time in minutes" onChange={(e) => setTiming(e.target.value)} />
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

export default ServiceDetail;