/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, Badge, Button, DatePicker, Divider, Image, Input, Select, Tag } from "antd";
import dayjs from 'dayjs';
import { TextboxFlex } from "../../common/textbox";
import { isValidEmail, setCellFormat, setPriceNumberOnly } from "../../common/cellformat";
import { UserOutlined } from '@ant-design/icons';
import { generateTimeSlots } from "../../common/intervals";
import useAlert from "../../common/alert";
import { get_Date, LocalDate } from "../../common/localDate";

const OrderDetail = ({ id, refresh, ref, setOrderNo, orderList, servicesList, userList, companyList, eventList, customerList, saveData, setOpen }) => {


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
    const [trndate, setTrnDate] = useState(LocalDate());
    const [assigned_to, setAssignedTo] = useState('');
    const [employeeName, setEmployeeName] = useState('0');
    const [slot, setSlot] = useState('');
    const [servicesItem, setServicesItem] = useState([]);
    const [availableSlot, setAvailableSlot] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [liveList, setLiveList] = useState([]);

    const [prevTrnDate, setPrevTrnDate] = useState('');
    const [prevSlot, setPrevSlot] = useState('');
    const [prevAssigned_To, setPrevAssigned_To] = useState('');

    const [slotGap, setSlotGap] = useState(null);
    const [timingInfo, setTimingInfo] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isUserWorking, setUserWorking] = useState(false);

    const { contextHolder, warning } = useAlert();
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const [morningSlot, setMorningSlot] = useState([]);
    const [afternoonSlot, setAfternoonSlot] = useState([]);
    const [eveningSlot, setEveningSlot] = useState([]); 
      const options = [
        { key: 1, label: 'Morning', slotList: morningSlot },
        { key: 2, label: 'Afternoon', slotList: afternoonSlot },
        { key: 3, label: 'Evening', slotList: eveningSlot },
    ];

    const getDay = () => {
        const dayNum = dayjs(get_Date(trndate,'YYYY-MM-DD')).get('day');
        return weekdays[dayNum];
    }

    useEffect(() => {
        if (id === 0) {
            setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
            setStatus('Pending'); setPrice('0'); setTax('0'); setTotal('0'); setDiscount('0'); setCoupon(''); setTaxAmount('0'); setTrnDate(LocalDate());
            setAssignedTo('0'); setOrderNo(''); setServicesItem([]); setSlot(''); setPrevSlot(''); setPrevTrnDate('');
        }
        else {
            const editList = orderList.find(item => item.id === id);
            setOrderNo(editList.order_no);    
            setCustomerName(editList.name);
            setCustomerPhone(editList.cell);
            setCustomerEmail(editList.email); 
            setStatus(editList.status);
            setTrnDate(editList.trndate);
            setPrevTrnDate(editList.trndate);
            setServicesItem(editList.serviceinfo);
            setAssignedTo(editList.assignedto);
            setPrevAssigned_To(editList.assignedto);
            setPrice(editList.price);
            setTax(editList.tax);
            setTaxAmount(editList.taxamount);
            setTotal(editList.total);
            setCoupon(editList.coupon);
            setDiscount(editList.discount);
            setSlot(editList.slot);
            setPrevSlot(editList.slot);
        }
        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])
    }, [refresh])

    useEffect(() => {
        if (companyList.length !== 0) {
            setSlotGap(companyList.slot);
            setTimingInfo(companyList.timinginfo[0]);
        }
    }, [companyList])

    useEffect(() => {

        if (trndate === '')
            setTrnDate(LocalDate());

        if (userList.length !== 0 && slotGap !== null && timingInfo !== null) {
            
            let employeeSchedule = [];
            let orderListSlot = [];
            let inTime = '00:00:00';
            let outTime = '00:00:00';
            let isOpen = false;
            let isWorking = false;
            let employeeName='';
            switch (getDay().toLowerCase()) {
                case 'sunday':
                    { isOpen = timingInfo.sunday[2]; break; }
                case 'monday':
                    { isOpen = timingInfo.monday[2]; break; }
                case 'tuesday':
                    { isOpen = timingInfo.tuesday[2]; break; }
                case 'wednesday':
                    { isOpen = timingInfo.wednesday[2]; break; }
                case 'thursday':
                    { isOpen = timingInfo.thursday[2]; break; }
                case 'friday':
                    { isOpen = timingInfo.friday[2]; break; }
                case 'saturday':
                    { isOpen = timingInfo.saturday[2]; break; }
                default:
                    { isOpen = false;  break; }
            }

            if (assigned_to === "0") {
                isWorking = true;
                setAvailableSlot([]);
            }
            else {
                userList.filter(a => a.id === assigned_to).map(b =>
                    { employeeSchedule = b.scheduleinfo[0]; employeeName = b.fullname;});
                orderListSlot = orderList.filter(a => (a.trndate.includes(get_Date(trndate, 'YYYY-MM-DD')) && a.assignedto === assigned_to && a.status !== 'Cancelled'));

                switch (getDay().toLowerCase()) {
                    case 'sunday':
                        {
                            inTime = employeeSchedule.sunday[0];
                            outTime = employeeSchedule.sunday[1];
                            isWorking = employeeSchedule.sunday[2];
                            break;
                        }
                    case 'monday':
                        {
                            inTime = employeeSchedule.monday[0];
                            outTime = employeeSchedule.monday[1];
                            isWorking = employeeSchedule.monday[2];
                            break;
                        }
                    case 'tuesday':
                        {
                            inTime = employeeSchedule.tuesday[0];
                            outTime = employeeSchedule.tuesday[1];
                            isWorking = employeeSchedule.tuesday[2];
                            break;
                        }
                    case 'wednesday':
                        {
                            inTime = employeeSchedule.wednesday[0];
                            outTime = employeeSchedule.wednesday[1];
                            isWorking = employeeSchedule.wednesday[2];
                            break;
                        }
                    case 'thursday':
                        {
                            inTime = employeeSchedule.thursday[0];
                            outTime = employeeSchedule.thursday[1];
                            isWorking = employeeSchedule.thursday[2];
                            break;
                        }
                    case 'friday':
                        {
                            inTime = employeeSchedule.friday[0];
                            outTime = employeeSchedule.friday[1];
                            isWorking = employeeSchedule.friday[2];
                            break;
                        }
                    case 'saturday':
                        {
                            inTime = employeeSchedule.saturday[0];
                            outTime = employeeSchedule.saturday[1];
                            isWorking = employeeSchedule.saturday[2];
                            break;
                        }
                    default:
                        {
                            inTime = '00:00:00'; outTime = '00:00:00'; isWorking = false;
                            break;
                        }
                }
            }
            setIsOpen(isOpen);
            setUserWorking(isWorking);
            setEmployeeName(employeeName);

            let _slot = ''
            if (prevTrnDate === trndate && id !== 0 && prevAssigned_To === assigned_to) {
                _slot = prevSlot;
            }
            setSlot(_slot);

            if (isOpen && isWorking)
                setAvailableSlot(generateTimeSlots(inTime, outTime, slotGap, orderListSlot, _slot));
            else
                setAvailableSlot([]);

        }
    }, [trndate, assigned_to])

    useEffect(() => {
        const morning = availableSlot.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] < 12);
        const afternoon = availableSlot.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] >= 12 && dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] < 16);
        const evening = availableSlot.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] >= 16);
        setMorningSlot(morning)
        setAfternoonSlot(afternoon)
        setEveningSlot(evening)
    }, [availableSlot])

    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 && servicesItem.length !== 0 && 
            price !== '' && price !== '.' && trndate !== '' && customerEmail !== '' && isValidEmail(customerEmail) && 
            isOpen && isUserWorking && (assigned_to === '0' ? true : slot ==='' ? false:true)) {
            const Body = JSON.stringify({
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmail: customerEmail,
                serviceinfo: servicesItem,
                price: price,
                discount: discount,
                tax: tax,
                taxamount: taxamount,
                total: total,
                coupon: coupon,
                status: status,
                trndate: trndate,
                assignedto: assigned_to === '0' ? 0 : assigned_to,
                slot: slot,
                bookedvia: 'Walk-In',
            });
            
            saveData("Order", id !== 0 ? 'PUT' : 'POST', "order", id !== 0 ? id : null, Body);

            setOpen(false);
        }
        else {
            if (!isOpen)
                warning('Business is marked as closed . Please book an appointment for another day!');
            else if (!isUserWorking)
                warning(`The ${employeeName} has the DAY OFF.`);
            else if (slot === '' && assigned_to !=='0')
                warning(`Please select a valid slot !`);
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

    const onSearch = (value) => {
        const customer = customerList.find(a => a.cell === value)
        if (customer !== undefined && customer !== null ) {
            setCustomerName(customer.name);
            setCustomerEmail(customer.email);
            setCustomerPhone(customer.cell);
         }
    }

    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <TextboxFlex label={'Search'}  input={
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Search to Select"
                    value={''}
                    onChange={(value) => onSearch(value)}
                    options={customerList.map(item => ({
                        value: item.cell,
                        label: item.cell + ' ( ' + item.name + ' )'
                    }))}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    } />
            } />

            <p class="text-gray-400 mb-4">Customer Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />

          
            <TextboxFlex label={'E-mail'} mandatory={true} input={
                <Input placeholder="abcd@company.com" status={customerEmail === '' || !isValidEmail(customerEmail) ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
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
                <DatePicker status={trndate === '' ? 'error' : ''}
                    style={{ width: '100%' }}
                    value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')}
                    onChange={(date, dateString) => setTrnDate(dateString)} />
            } />

            <TextboxFlex label={'Employee'} input={
                <Select
                    value={assigned_to}
                    style={{ width: '100%' }}
                    onChange={(value) => setAssignedTo(value)}
                    options={[{ value: '0', label: 'None' }, ...userList.filter(a => !a.status.toLowerCase().includes('inactive')).map(item => ({
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
            <TextboxFlex label={''} input={
                <div class='w-full flex flex-row gap-6 text-xs'>
                    {(isOpen && isUserWorking && assigned_to !== '0') ?
                        options.map(opt =>
                            <div key={opt.key} class='flex flex-col gap-2'>
                                <p class='flex-row flex justify-center items-center'>{opt.label}</p>
                                {opt.slotList.length === 0 ? <p class='text-xs text-gray-500'>Empty</p> :
                                    opt.slotList.map(item => (
                                        <Button key={item.id} color={slot === item.id ? 'cyan' : 'default'}
                                            variant="outlined"
                                            disabled={item.disabled}
                                            onClick={() => { setSlot(item.id) }}>

                                            {item.id}
                                        </Button>
                                    ))}
                            </div>
                        )
                        :
                        (!isUserWorking && assigned_to !== '0')  ?
                            <Tag color='red'>The {employeeName} has the DAY OFF.</Tag>                          
                            :
                            !isOpen &&
                            <Tag color='red'>Business is closed . Please book an appointment for another day!</Tag>
                    }
                </div>
            } />
            {contextHolder}
        </div>
    )

}

export default OrderDetail;