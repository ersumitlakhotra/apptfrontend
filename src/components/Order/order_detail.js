import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, Badge, DatePicker, Divider, Image, Input, Select } from "antd";
import dayjs from 'dayjs';
import { TextboxFlex } from "../../common/textbox";
import { setCellFormat } from "../../common/cellformat";

import {  UserOutlined } from '@ant-design/icons';
import {Slots} from "../../common/intervals";

const OrderDetail = ({ id, refresh, ref, orderList, servicesList, userList, saveData ,setOpen  }) => {
   

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [order_no, setOrderNo] = useState('');
    const [status, setStatus] = useState('Pending');
    const [price, setPrice] = useState('0');
    const [trndate, setTrnDate] = useState('');
    const [assigned_to, setAssignedTo] = useState('');
    const [modifiedat, setModifiedat] = useState(new Date());
    const [slot, setSlot] = useState('');
    const [servicesItem, setServicesItem] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));

    const [orderListSlot, setOrderListSlot] = useState([]);
    useEffect(() => {
        if (id === 0) {
            setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
            setStatus('Pending'); setPrice('0'); setTrnDate(''); setModifiedat(new Date());
            setAssignedTo(''); setOrderNo(''); setServicesItem([]); setOrderListSlot([]); setSlot('');
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
            setModifiedat(editList.modifiedat);
            setAssignedTo(editList.assignedto);
            setPrice(editList.price);
            setSlot(editList.slot);
        }
    }, [refresh])

 
    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && servicesItem.length !== 0 && price !== '' && price !== '.' && trndate !== '') {
            const Body = JSON.stringify({
                customerinfo: [{
                    name: customerName,
                    cell: customerPhone,
                    email: customerEmail,
                }],
                serviceinfo: servicesItem,
                price: price,
                status: status,
                trndate: trndate,
                assignedto: assigned_to === '' ? 0 : assigned_to,
                slot:slot
            });
            saveData("Order", id !== 0 ? 'PUT' : 'POST', "order", id !== 0 ? id : null, Body);
            setOpen(false);
        }
    }
    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })
    const setPriceNumberOnly = (event) => {
        const inputValue = event.target.value;
        const regex = /^\d*(\.\d*)?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setPrice(inputValue);
        }
    };
   
    const onChangeServicesItem = (value) => {
        let rate = 0;
        setServicesItem(value);
        servicesList.filter(a =>
            value.some(b => b === a.id)
        ).map(item => (rate = rate + parseFloat(item.price)))

        setPrice(parseFloat(rate).toFixed(2))
    }

    useEffect(() => {
        if (trndate !== '' && assigned_to !=='')
        {
            setOrderListSlot(orderList.filter(a => (a.trndate.includes(trndate) && a.assignedto === assigned_to))); 
        }
        else 
            setOrderListSlot([])
    }, [trndate, assigned_to])
    
    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <p class="text-gray-400 mb-4">Customer Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />

            <TextboxFlex label={'E-mail'} input={
                <Input placeholder="abcd@company.com"  value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            } />

            <Divider/>
            <p class="text-gray-400 mb-4">Order Information</p>

            <TextboxFlex label={'Services'} mandatory={true} input={
                <Select
                    status={servicesItem.length === 0 ? 'error':''}
                    placeholder='Select services'
                    mode="multiple"
                    value={servicesItem}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeServicesItem(value)}
                    options={servicesList.map(item => ({
                        value:item.id,
                        label:item.name
                    }))}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => {
                        var _a, _b;
                        return (
                            (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
                                _a !== void 0
                                ? _a
                                : ''
                        )
                            .toLowerCase()
                            .localeCompare(
                                ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
                                    _b !== void 0
                                    ? _b
                                    : ''
                                ).toLowerCase(),
                            );
                    }}
                />
            } />

            <TextboxFlex label={'Price ($)'} mandatory={true} input={
                <Input placeholder="Price" status={(price === '' || price === '.') ? 'error' : ''} value={price} onChange={setPriceNumberOnly} />
            } />

            <TextboxFlex label={'Status'} input={
                <Select
                    value={status}
                    style={{ width: '100%' }}
                    onChange={(value) => setStatus(value)}
                    options={[
                        { value: 'Pending', label: <Badge color={'yellow'} text={'Pending'} /> },
                        { value: 'In progress', label: <Badge color={'blue'} text={'In progress'} /> },
                        { value: 'Completed', label: <Badge color={'green'} text={'Completed'} /> },
                        { value: 'Cancelled', label: <Badge color={'red'} text={'Cancelled'} /> }
                    ]}
                />
            } />

            <Divider />
            <p class="text-gray-400 mb-4">Booking Details</p>

            <TextboxFlex label={'Date'} mandatory={true} input={
                <DatePicker status={trndate === '' ? 'error':''} style={{ width: '100%' }} value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')} onChange={(date, dateString) => setTrnDate(dateString)} />
            } />

            <TextboxFlex label={'Employee'} input={
                <Select
                    value={assigned_to}
                    style={{ width: '100%' }}
                    onChange={(value) => setAssignedTo(value)}
                    options={userList.map(item => ({
                        value: item.id,
                        label: 
                        <div class='flex flex-row gap-2 items-center'>
                            {item.profilepic !== null ?
                                <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                            }                         
                            <p>{item.fullname}</p>                       
                        </div>
                    }))}            
                />
            } />
            <TextboxFlex label={' '}  input={
                 <div class='flex flex-row w-full'>
                    {(trndate === '' || assigned_to === '') ?
                        <p class='w-full border p-4 rounded text-sm text-gray-400 outline-dotted'> Please select both ( Date and Employee ) to view the available time slots. </p> :
                    <Slots inTime={"10:00:00"} outTime={"21:50:00"} orderListSlot={orderListSlot} slot={slot} setSlot={setSlot}/>
                 }
                </div>
            } />
           

            {/*  booking
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Booking <span class='text-red-600'>*</span></p>
                    <DatePicker showTime onChange={(value, dateString) => { setBooking(dateString) }} style={{ width: '100%' }}
                    value={(booking !== '' && booking !== undefined && booking !== null) && dayjs(booking, 'YYYY-MM-DD HH:mm:ss')}/>

            </div> 
            

 const today = new Date();
    const dayOfWeekNumber = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Array to map day numbers to day names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = weekdays[dayOfWeekNumber];

            */}


            {/*  assignedTo 
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Assigned To </p>
                <Select placeholder="Assigned To" value={assigned_to} onChange={e => setAssignedto(e.id)} style={{ width: '100%' }}
                    options={userList.map(item => ({
                        value: item.id,
                        label: item.fullname,
                    }))}
                />
            </div>
            */}
            
        </div>
    )

}

export default OrderDetail;