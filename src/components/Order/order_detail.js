/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, Badge, DatePicker, Divider, Image, Input, Select } from "antd";
import dayjs from 'dayjs';
import { TextboxFlex } from "../../common/textbox";
import { setCellFormat, setPriceNumberOnly } from "../../common/cellformat";

import { UserOutlined } from '@ant-design/icons';
import { generateTimeSlots } from "../../common/intervals";
import useAlert from "../../common/alert";
import { LocalDate } from "../../common/localDate";

const OrderDetail = ({ id, refresh, ref, setOrderNo, orderList, servicesList, userList, companyList, eventList, saveData, setOpen }) => {


    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [status, setStatus] = useState('Pending');
    const [price, setPrice] = useState('0');
    const [tax, setTax] = useState('0');
    const [taxamount, setTaxAmount] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');
    const [discountEdit, setDiscountEdit] = useState('0');
    const [trndate, setTrnDate] = useState(LocalDate());
    const [assigned_to, setAssignedTo] = useState('0');
    const [slot, setSlot] = useState('');
    const [servicesItem, setServicesItem] = useState([]);
    const [availableSlot, setAvailableSlot] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [liveList, setLiveList] = useState([]);

    const [slotGap, setSlotGap] = useState(30);
    const [inTime, setInTime] = useState('00:00:00');
    const [outTime, setOutTime] = useState('00:00:00');
    const [isOpen, setIsOpen] = useState(false);

    const { contextHolder, warning } = useAlert();
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    useEffect(() => {
        if (id === 0) {
            setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
            setStatus('Pending'); setPrice('0'); setTax('0'); setTotal('0'); setDiscount('0'); setCoupon(''); setTaxAmount('0'); setTrnDate(LocalDate());
            setAssignedTo('0'); setOrderNo(''); setServicesItem([]); setSlot('');
        }
        else {
            const editList = orderList.find(item => item.id === id)
            if (editList.customerinfo !== null) {
                setCustomerName(editList.customerinfo[0].name);
                setCustomerPhone(editList.customerinfo[0].cell);
                setCustomerEmail(editList.customerinfo[0].email);
            }
            else { setCustomerName(''); setCustomerEmail(''); setCustomerPhone(''); }

            setOrderNo(editList.order_no);
            setStatus(editList.status);
            setTrnDate(editList.trndate);
            setServicesItem(editList.serviceinfo);
            setAssignedTo(editList.assignedto);
            setPrice(editList.price);
            setTax(editList.tax);
            setTaxAmount(editList.taxamount);
            setTotal(editList.total);
            setCoupon(editList.coupon);
            setDiscount(editList.discount);
            setDiscountEdit(editList.discount)
            setSlot(editList.slot);
        }
        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])
    }, [refresh])


    useEffect(() => {
        let orderListSlot = [];
        if (trndate !== '' && assigned_to !== '') {
            orderListSlot = (orderList.filter(a => (a.trndate.includes(trndate) && a.assignedto === assigned_to)));
        }
        if (isOpen)
            setAvailableSlot(generateTimeSlots(inTime, outTime, slotGap, orderListSlot, slot));
        else
        {
            setAvailableSlot([{ id: 'Business Closed' }]);
        }
    }, [refresh,isOpen, trndate, assigned_to])


    useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.timinginfo !== null) {
                if (trndate !== '') {
                    const dayOfWeekNumber = dayjs(trndate).get('day');
                    const dayName = weekdays[dayOfWeekNumber];
                    setOpeningHours(dayName);
                }
            }          
            setSlotGap(companyList.slot)
        }

    }, [companyList, trndate])

    const setOpeningHours = (weekday) => {
        switch (weekday.toLowerCase()) {
            case 'sunday':
                {
                    setInTime(companyList.timinginfo[0].sunday[0]); setOutTime(companyList.timinginfo[0].sunday[1]); setIsOpen(companyList.timinginfo[0].sunday[2]);
                    break;
                }
            case 'monday':
                {
                    setInTime(companyList.timinginfo[0].monday[0]); setOutTime(companyList.timinginfo[0].monday[1]); setIsOpen(companyList.timinginfo[0].monday[2]);
                    break;
                }
            case 'tuesday':
                {
                    setInTime(companyList.timinginfo[0].tuesday[0]); setOutTime(companyList.timinginfo[0].tuesday[1]); setIsOpen(companyList.timinginfo[0].tuesday[2]);
                    break;
                }
            case 'wednesday':
                {
                    setInTime(companyList.timinginfo[0].wednesday[0]); setOutTime(companyList.timinginfo[0].wednesday[1]); setIsOpen(companyList.timinginfo[0].wednesday[2]);
                    break;
                }
            case 'thursday':
                {
                    setInTime(companyList.timinginfo[0].thursday[0]); setOutTime(companyList.timinginfo[0].thursday[1]); setIsOpen(companyList.timinginfo[0].thursday[2]);
                    break;
                }
            case 'friday':
                {
                    setInTime(companyList.timinginfo[0].friday[0]); setOutTime(companyList.timinginfo[0].friday[1]); setIsOpen(companyList.timinginfo[0].friday[2]);
                    break;
                }
            case 'saturday':
                {
                    setInTime(companyList.timinginfo[0].saturday[0]); setOutTime(companyList.timinginfo[0].saturday[1]); setIsOpen(companyList.timinginfo[0].saturday[2]);
                    break;
                }
            default:
                {
                    setInTime('00:00:00'); setOutTime('00:00:00'); setIsOpen(false);
                    break;
                }

        }
    }

    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length ===12  && servicesItem.length !== 0 && price !== '' && price !== '.' && trndate !== '' && isOpen) {
            const Body = JSON.stringify({
                customerinfo: [{
                    name: customerName,
                    cell: customerPhone,
                    email: customerEmail,
                }],
                serviceinfo: servicesItem,
                price: price,
                discount: discount,
                tax: tax,
                taxamount: taxamount,
                total: total,
                coupon: coupon,
                status: status,
                trndate: trndate,
                assignedto: assigned_to === '' ? 0 : assigned_to,
                slot: slot, 
                bookedvia:'Walk-In',
            });
            saveData("Order", id !== 0 ? 'PUT' : 'POST', "order", id !== 0 ? id : null, Body);
            setOpen(false);
        }
        else {
            if (!isOpen && trndate !== '')
                warning('Business is marked as closed . Please book an appointment for another day!');
            else
                warning('Please, fill out the required fields !');
        }
    }
    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })

    useEffect(() => {
        let rate = 0;
        let discount = 0;
        servicesList.filter(a =>
            servicesItem.some(b => b === a.id)
        ).map(item => (rate = rate + parseFloat(item.price)));

        if (coupon !== '') {
            const couponServices = eventList.filter(a => a.coupon === coupon);
            let ApplyDiscount = true;
            for (let i = 0; i < couponServices[0].serviceinfo.length; i++) {
                if (servicesItem.includes(couponServices[0].serviceinfo[i])) {
                    ApplyDiscount = true;
                }
                else {
                    ApplyDiscount = false;
                    break;
                }
            }
            if (Boolean(ApplyDiscount)) {
                discount = parseFloat(couponServices[0].discount);
                setDiscount(parseFloat(discount));
            }
            else {
                setDiscount(0);
            }
        }
        else {
            setDiscount(0);
        }

        setPrice(parseFloat(rate).toFixed(2))
        onApplyTaxandCoupon(parseFloat(rate).toFixed(2), parseFloat(discount).toFixed(2), parseInt(tax))

        if (status === 'Cancelled') {
            setPrice(0.00);
            setDiscount(0)
            setTax(0);
            setCoupon('');
            setTotal(0.00);
        }
    }, [status, servicesItem, tax, coupon])

    const onApplyTaxandCoupon = (priceValue, discountValue, taxPercentage) => {
        const subTotal = parseFloat(priceValue - discountValue).toFixed(2);

        if (taxPercentage === 0) {
            setTotal(subTotal)
            setTaxAmount(0)
        }
        else {
            if (taxPercentage === 5) {
                setTotal(parseFloat(subTotal * 1.05).toFixed(2))
                setTaxAmount(parseFloat(subTotal * 0.05).toFixed(2))
            }

            if (taxPercentage === 13) {
                setTotal(parseFloat(subTotal * 1.13).toFixed(2))
                setTaxAmount(parseFloat(subTotal * 0.13).toFixed(2))
            }

            if (taxPercentage === 15) {
                setTotal(parseFloat(subTotal * 1.15).toFixed(2))
                setTaxAmount(parseFloat(subTotal * 0.15).toFixed(2))
            }

        }
    }

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
                <Input placeholder="abcd@company.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            } />

            <Divider />
            <p class="text-gray-400 mb-4">Order Information</p>

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

            <TextboxFlex label={'Services'} mandatory={true} input={
                <Select
                    status={servicesItem.length === 0 ? 'error' : ''}
                    placeholder='Select services'
                    mode="multiple"
                    value={servicesItem}
                    style={{ width: '100%' }}
                    onChange={(value) => setServicesItem(value)}
                    options={servicesList.filter(a => !a.status.toLowerCase().includes('inactive')).map(item => ({
                        value: item.id,
                        label: item.name
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

            <TextboxFlex label={'Price ($)'} input={
                <Input placeholder="Price" style={{ backgroundColor: '#FAFAFA' }} readOnly={true} value={price} onChange={(e) => setPrice(setPriceNumberOnly(e.target.value))} />
            } />

            <TextboxFlex label={'Discount'} input={
                <Input placeholder="Discount" style={{ backgroundColor: '#FAFAFA' }} readOnly={true} value={-discount} />
            } />
            <TextboxFlex label={'Tax (%)'} mandatory={true} input={
                <Select
                    value={tax}
                    style={{ width: '100%' }}
                    onChange={(value) => setTax(value)}
                    options={[
                        { value: 0, label: '0%' },
                        { value: 5, label: '5%' },
                        { value: 13, label: '13%' },
                        { value: 15, label: '15%' }
                    ]}
                />
            } />

            <TextboxFlex label={'Total'} input={
                <Input placeholder="Total" style={{ backgroundColor: '#FAFAFA' }} readOnly={true} value={total} />
            } />

            <TextboxFlex label={'Event'} input={
                <Select
                    value={coupon}
                    style={{ width: '100%' }}
                    onChange={(value) => setCoupon(value)}
                    options={[{ value: '', label: '' },
                    ...liveList.map(item => ({
                        value: item.coupon,
                        label: item.title
                    }))]}
                />
            } />



            <Divider />
            <p class="text-gray-400 mb-4">Booking Details</p>

            <TextboxFlex label={'Date'} mandatory={true} input={
                <DatePicker status={trndate === '' ? 'error' : ''} style={{ width: '100%' }} value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')} onChange={(date, dateString) => setTrnDate(date)} />
            } />

            <TextboxFlex label={'Employee'} input={
                <Select
                    value={assigned_to}
                    style={{ width: '100%' }}
                    onChange={(value) => setAssignedTo(value)}
                    options={[{value:'0',label:'None'},...userList.filter(a =>!a.status.toLowerCase().includes('inactive')).map(item => ({
                        value: item.id,
                        label:
                            <div class='flex flex-row gap-2 items-center'>
                                {item.profilepic !== null ?
                                    <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                    <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                }
                                <p>{item.fullname}</p>
                            </div>
                    }))]}
                />
            } />
            <TextboxFlex label={'Slot'} mandatory={true} input={
                <Select
                    value={slot}
                    style={{ width: '100%' }}
                    onChange={(value) => setSlot(value)}
                    options={availableSlot.map(item => ({ value: item.id, label: item.id }))}
                />
            } />
            {contextHolder}      
        </div>
    )

}

export default OrderDetail;