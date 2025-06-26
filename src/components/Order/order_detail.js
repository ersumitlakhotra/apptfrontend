import { useEffect, useImperativeHandle, useState } from "react";
import { apiCalls } from "../../hook/apiCall";
import { DatePicker, Divider, Select } from "antd";
import dayjs from 'dayjs';

const OrderDetail = ({ id, reload, ref }) => {
    const emptyData = {
        "customer_name": "",
        "customer_email": "",
        "customer_phone": "",
        "status": "PENDING",
        "services": "",
        "price": "0",
        "trndate":"",
        "clients": "1",
        "assignedto": "",
        "id": "0"
    }
    const options_status = [{ value: 'PENDING', color: 'yellow' }, { value: 'CONFIRMED', color: 'success' }, { value: 'CANCELLED', color: 'warning' }];
    
    const [dataList, setDataList] = useState(emptyData);

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [price, setPrice] = useState('0');

    const [servicesList, setServicesList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));

    const [booking, setBooking] = useState('');
    const [clients, setClients] = useState('1');

    const [userList, setUserList] = useState([]);
    const [assigned_to, setAssignedto] = useState('');

    useEffect(() => {
        getData();
    }, [reload]);

    const getData = async () => {
        if (id !== 0) {
            const res = await apiCalls('GET', 'order', id, null);
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
    const getUsers = async () => {
        try {
            const res = await apiCalls('GET', 'user', null, null);
            setUserList(res.data.data);
        }
        catch (e) {
            setUserList([]);
        }
    }

    useEffect(() => {
        setCustomerName(dataList.customer_name);
        setCustomerPhone(dataList.customer_phone);
        setCustomerEmail(dataList.customer_email);
        setStatus(dataList.status);
        setPrice(dataList.price);
        getServices();  
        const services_Array = (dataList.services === null || String(dataList.services).trim() === '')? [] : String(dataList.services).split(',');
        setSelectedItems(
            services_Array.map(item => ({
            value: item,
            label: servicesList.find(service => service.id === Number(item)).title
            }))
        )
        setBooking(dataList.trndate);
        setClients(dataList.clients);
        getUsers();

    }, [dataList])

    const btnSave_Click = async () => {
        try {
            const Body = JSON.stringify({
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                status: status,
                services: `${selectedItems.join(',')}`,
                price: price,
                trndate: booking,
                clients: clients,
                assignedto: assigned_to,
            });
            if (id !== 0) {
                return await apiCalls('PUT', 'order', id, Body);
            }
            else
                return await apiCalls('POST', 'order', null, Body);
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
    const setCellFormat = (cellValue) => {
        let phoneNumber = cellValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (phoneNumber.length > 3) {
            phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
        }
        if (phoneNumber.length > 7) {
            phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
        }
        if (phoneNumber.length < 13)
        setCustomerPhone(phoneNumber);
    }

    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <p class="text-gray-400 mb-4">Customer Information</p>

            {/*  customer_name */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Name <span class='text-red-600'>*</span></p>
                <input type="text" name="customer_name" id="customer_name" value={customerName}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Customer's Name" onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            {/*  customer_phone */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Phone <span class='text-red-600'>*</span> </p>
                <input type="tel" name="customer_email" id="customer_email" value={customerPhone}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Customer's Phone " onChange={(e) => setCellFormat(e.target.value)} />
            </div>

            {/*  customer_email */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Email </p>
                <input type="text" name="customer_email" id="customer_email" value={customerEmail}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Customer's Email (Optional)" onChange={(e) => setCustomerEmail(e.target.value)} />
            </div>

            <Divider/>
            <p class="text-gray-400 mb-4">Order Information</p>
            
            {/*  status */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Status <span class='text-red-600'>*</span></p>
                <Select defaultValue={status} style={{ width: '100%' }} options={options_status}/>
            </div>

            {/*  services */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Services <span class='text-red-600'>*</span></p>
                <Select mode="multiple" placeholder="Services" value={selectedItems} onChange={e => {setSelectedItems(e); console.log(e)}} style={{ width: '100%' }}
                    options={filteredOptionsServices.map(item => ({
                        value: item.id,
                        label: item.title,
                    }))}
                />
            </div>

              {/*  price */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Price ($) <span class='text-red-600'>*</span> </p>
                <input type="text" name="price" id="price" value={price}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            </div>

            {/*  booking */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Booking <span class='text-red-600'>*</span></p>
                    <DatePicker showTime onChange={(value, dateString) => { setBooking(dateString) }} style={{ width: '100%' }}
                    value={(booking !== '' && booking !== undefined && booking !== null) && dayjs(booking, 'YYYY-MM-DD HH:mm:ss')}/> 
               
            </div>

            {/*  clients */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Clients <span class='text-red-600'>*</span></p>
                <input type="text" name="clients" id="clients" value={clients}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Clients" onChange={(e) => setClients(e.target.value)} />
            </div>

            {/*  assignedTo */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Assigned To </p>
                <Select placeholder="Assigned To" value={assigned_to} onChange={e => setAssignedto(e.id)} style={{ width: '100%' }}
                    options={userList.map(item => ({
                        value: item.id,
                        label: item.fullname,
                    }))}
                />
            </div>
            
        </div>
    )

}

export default OrderDetail;