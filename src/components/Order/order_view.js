import { Button, Divider } from "antd";

import dayjs from 'dayjs';
import { DownloadOutlined, MailOutlined, PlusOutlined, PrinterOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { UTC_LocalDateTime } from "../../common/localDate";
const OrderView = ({ id, refresh, ref, orderList, servicesList, userList }) => {
    
        const [customerName, setCustomerName] = useState('');
        const [customerEmail, setCustomerEmail] = useState('');
        const [customerPhone, setCustomerPhone] = useState('');
        const [order_no, setOrderNo] = useState('');
        const [status, setStatus] = useState('Pending');
        const [price, setPrice] = useState('0');
        const [trndate, setTrnDate] = useState('');
    const [assigned_to, setAssignedTo] = useState('');
    const [createdat, setCreatedat] = useState(new Date());
    const [modifiedat, setModifiedat] = useState(new Date());
        const [slot, setSlot] = useState('');
        const [servicesItem, setServicesItem] = useState([]);
        //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    
    
        const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
        useEffect(() => {
            if (id === 0) {
                setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
                setStatus('Pending'); setPrice('0'); setTrnDate(''); setModifiedat(new Date()); setCreatedat(new Date());
                setAssignedTo(''); setOrderNo(''); setServicesItem([]);setSlot('');
            }
            else {
                const editList = orderList.find(item => item.id === id)
                if (editList.customerinfo !== null) {
                    setCustomerName(editList.customerinfo[0].name);
                    setCustomerPhone(editList.customerinfo[0].cell);
                    setCustomerEmail(editList.customerinfo[0].email);
                }
                else
                { setCustomerName(''); setCustomerEmail(''); setCustomerPhone(''); }
    
                setOrderNo(editList.order_no);
                setStatus(editList.status);          
                setTrnDate(editList.trndate);              
                setServicesItem(editList.serviceinfo);
                setCreatedat(editList.createdat);
                setModifiedat(editList.modifiedat);
                setAssignedTo(editList.assignedto);
                setPrice(editList.price);
                setSlot(editList.slot);
            }
        }, [refresh])
    
    return(
        <div class="flex flex-col gap-4 mb-12 w-full">
            <div class='flex items-center justify-between'>
                <span class="text-2xl font-bold text-gray-800">Order #{order_no}</span>
                <div class="flex gap-2">
                    <Button type='default' icon={<PrinterOutlined />} size="middle">Print</Button>
                    <Button type='default' icon={<MailOutlined />} size="middle">Email</Button>
                    <Button type='default' icon={<DownloadOutlined />} size="middle">Export</Button>
                </div>
            </div>
            <div class='flex flex-col gap-1 text-xs'>
                <div class='flex flex-row '><p class=" text-gray-500 w-24">Ordered </p><span class=" text-black font-semibold"> Via Appointment </span></div>  
                <div class='flex flex-row '><p class=" text-gray-500 w-24">Order created </p><span class=" text-black font-semibold"> {UTC_LocalDateTime(createdat)} </span></div> 
            </div> 
        </div>
    )
}

export default OrderView;