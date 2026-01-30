/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, Badge, Button, DatePicker, Divider, Dropdown, Flex, Image, Input, Radio, Select, Tag } from "antd";
import dayjs from 'dayjs';
import { TextboxFlex } from "../../common/textbox";
import { isValidEmail, setCellFormat, setNumberAndDot } from "../../common/cellformat";
import { UserOutlined,  CreditCardOutlined, DownOutlined } from '@ant-design/icons';
import { BsCash } from "react-icons/bs";
import useAlert from "../../common/alert";
import { get_Date, LocalDate, LocalTime } from "../../common/localDate";
import { generateTimeSlotsWithDate, toMinutes } from "../../common/generateTimeSlots";
import { compareTimes, isOpenForWork, userSchedule } from "../../common/general";
import { apiCalls } from "../../hook/apiCall";
import { TbTransfer } from "react-icons/tb";
import { useEmail } from "../../email/email";

function disabledDate(current) {
  // Can not select days before today and today
  return current < dayjs().startOf('day');
}

const OrderDetail = ({ id, refresh, ref, setOrderNo, orderList, servicesList, userList, companyList, eventList, customerList, scheduleList, saveData, setOpen, isAdmin ,uid}) => {
    const {AppointmentStatus} = useEmail()
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [sendEmail, setSendEmail] = useState('no');
    const [status, setStatus] = useState('');
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
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const [received, setReceived] = useState(0);
    const [tip, setTip] = useState(0);
    const [mode, setMode] = useState('Cash');
    const [servicesItem, setServicesItem] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));
    const [liveList, setLiveList] = useState([]);

    const [prevTrnDate, setPrevTrnDate] = useState('');
    const [prevSlot, setPrevSlot] = useState('');
    const [prevAssigned_To, setPrevAssigned_To] = useState('');
    const [prevServicesItem, setPrevServicesItem] = useState([]);

    const [timingInfo, setTimingInfo] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isUserWorking, setUserWorking] = useState(false);

    const {contextHolder, warning } = useAlert();
    const [morningSlot, setMorningSlot] = useState([]);
    const [afternoonSlot, setAfternoonSlot] = useState([]);
    const [eveningSlot, setEveningSlot] = useState([]);
    const options = [
        { key: 1, label: 'Morning', slotList: morningSlot },
        { key: 2, label: 'Afternoon', slotList: afternoonSlot },
        { key: 3, label: 'Evening', slotList: eveningSlot },
    ];

    const onSearch = (value) => {
        const customer = customerList.find(a => a.cell === value)
        if (customer !== undefined && customer !== null) {
            setCustomerName(customer.name);
            setCustomerEmail(customer.email);
            setCustomerPhone(customer.cell);
        }
    }


   const items = [
        { key: 'no', label: 'Do not send e-mail' },
        { key: 'yes', label: 'Send e-mail ' },
    ];
    const onItemChanged = e => {  setSendEmail(e.key)  };
    const menuProps = { items, onClick: onItemChanged };

    useEffect(() => {
        if (id === 0) {
            setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
            setStatus('Pending'); setPrice('0'); setTax('0'); setTotal('0'); setDiscount('0'); setCoupon(''); setTaxAmount('0'); setTrnDate(LocalDate());

            setAssignedTo(!isAdmin ? uid :'0');
            
            setOrderNo(''); setServicesItem([]); setSlot(''); setPrevSlot(''); setPrevTrnDate(''); setPrevServicesItem([]);
            setStart(''); setEnd(''); setReceived(0); setMode('Cash'); setTip(0);
            
        }
        else {
            const editList = orderList.find(item => item.id === id);
            setOrderNo(editList.order_no);
            setCustomerName(editList.name);
            setCustomerPhone(editList.cell);
            setCustomerEmail(editList.email);
            setTrnDate(editList.trndate);
            setPrevTrnDate(editList.trndate);
            setServicesItem(editList.serviceinfo);
            setPrevServicesItem(editList.serviceinfo);
            setAssignedTo(editList.assignedto);
            setPrevAssigned_To(editList.assignedto);
            setPrice(editList.price);
            setTax(editList.tax);
            setTaxAmount(editList.taxamount);           
            setTotal(editList.total);
            setCoupon(editList.coupon);       
            setSlot(editList.slot);
            setPrevSlot(editList.slot);
            setStart(editList.start);
            setEnd(editList.end);
            setStatus(editList.status);
            setReceived(editList.received);
            setMode(editList.mode);
            setTip(editList.tip);
            setDiscount(editList.discount);
        }
        setSendEmail('no');
        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])
    }, [refresh])

    useEffect(() => {
        if (companyList.length !== 0) {
            setTimingInfo(companyList.timinginfo[0]);
        }
    }, [companyList])

   

    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 && servicesItem.length !== 0 &&
            price !== '' && price !== '.' && trndate !== '' && customerEmail !== '' && isValidEmail(customerEmail) &&
            isOpen && isUserWorking && (assigned_to === '0' ? true : slot === '' ? false : true)) {
        
            if ((received === '' || received <= 0 || parseFloat(received).toFixed(2) < parseFloat(total).toFixed(2)) && status === 'Completed') {
                if (received === '')
                warning('Please, fill out the required fields !') 
                else if (received <= 0)
                warning('Please, Payment received amount can not be Zero! ')
                else if (parseFloat(received).toFixed(2) < parseFloat(total).toFixed(2))
                warning('Payment received can not be less than total amount!')
            }
            else {
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
                    start: start,
                    end: end,
                    received: status ==='Completed' ? received : '0',
                    mode: mode,
                    tip: status === 'Completed' ? tip : '0' ,// received > total ? parseFloat(received - total).toFixed(2) : '0',
                    bookedvia: 'Walk-In',
                });
                saveData({
                    label: "Appointment",
                    method: id !== 0 ? 'PUT' : 'POST',
                    endPoint: "order",
                    id:id !== 0 ? id : null,
                    logs:true,
                    email:sendEmail === 'yes',
                    status: id !== 0 ? status ==='Cancelled'? AppointmentStatus.CANCELLED : AppointmentStatus.RESCHEDULED : AppointmentStatus.CONFIRMED,
                    body: Body,
                    userList:userList,
                    servicesList:servicesList
                });
                setOpen(false);
            }
        }
        else {
            if (!isOpen)
                warning('Business is marked as closed . Please book an appointment for another day!')
            else if (!isUserWorking)
                warning(`The ${employeeName} has the DAY OFF.`)
            else if (slot === '' && assigned_to !== '0')
                warning(`Please select a valid slot !`)
            else
                warning('Please, fill out the required fields !') 
        }
    }

    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })

    const CalculatePrice = (items) => {
        let rate = 0;
        servicesList.filter(a => items.some(b => b === a.id)).map(item => (rate = rate + parseFloat(item.price)));
        setPrice(parseFloat(rate).toFixed(2));
      
    }

    useEffect(() => {
        if (status === 'Cancelled' || status === 'Rejected') {
            setPrice(0.00);
            setDiscount(0)
            setTax(0);
            setTaxAmount(0);
            setCoupon('');
            setTotal(0.00);
            setTip(0);
            setReceived(0);
        }
        else {
           
            let _price = price;
            let _discount = discount;
            let _tax = tax;

            let _subTotal = _price - _discount;
            let _total = _tax > 0 ? parseFloat((_subTotal * _tax) + _subTotal).toFixed(2) : _subTotal;
            let _taxAmount = _tax > 0 ? parseFloat(_subTotal * _tax).toFixed(2) : 0.00;
            
           
            setTaxAmount(_taxAmount);
            setTotal(_total);

        }
    }, [status, price, discount, tax])

    const calculateTip = (value) => {
        let _value = setNumberAndDot(value) // _tax > 0 ? parseFloat((_subTotal * _tax) + _subTotal).toFixed(2) : _subTotal;
        setReceived(_value);
        let tip = parseFloat(_value).toFixed(2) - parseFloat(total).toFixed(2);
        if (tip > 0)
            setTip(parseFloat(tip).toFixed(2));
        else
            setTip(0);
    }
    const calculateDiscount = (items,date=trndate) => {
        let _discount = 0;
        liveList.filter(item =>
            get_Date(date, 'YYYY-MM-DD') >= get_Date(item.startdate, 'YYYY-MM-DD') &&
            get_Date(date, 'YYYY-MM-DD') <= get_Date(item.enddate, 'YYYY-MM-DD') &&
            items.some(b => b === item.serviceinfo[0])
        ).map(event => {
            _discount += parseFloat(event.discount);
        })
        setDiscount(parseFloat(_discount).toFixed(2))
    }

    useEffect(() => {
        if(parseFloat(received).toFixed(2) > 0)
            calculateTip(received)
    }, [total])

    useEffect(() => {
        onTrnDateChange();
    }, [trndate, assigned_to,servicesItem])

    const onTrnDateChange = async () => {
        if (userList.length !== 0 && timingInfo !== null) {
            const business = isOpenForWork(trndate, timingInfo);
            let appointments = [];
            setSlot('');
            if (business[0].isOpen) {
                setIsOpen(true);
                if (assigned_to !== "0") {
                    const user = userList.find(item => item.id === assigned_to);
                    setEmployeeName(user.fullname);                  
                    const timing = userSchedule(trndate, user.timinginfo[0], user.id, scheduleList);
                    if (timing[0].isOpen) {
                        setUserWorking(true);
                        appointments = orderList.filter(a => (a.trndate.includes(get_Date(trndate, 'YYYY-MM-DD')) && a.assignedto === assigned_to && a.status !== 'Cancelled' && a.status !== 'Rejected' && a.id !== id));
                        appointments = [...appointments, { start: timing[0].breakStart, end: timing[0].breakEnd }]
                        let minutes = 0;
                        servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item => { minutes += item.minutes; });

                        let loginTime = compareTimes(business[0].inTime, timing[0].inTime);
                        let logoutTime = compareTimes(business[0].outTime, timing[0].outTime);
                        let inTime = loginTime === -1 ? timing[0].inTime : (loginTime === 1 || loginTime === 0) && business[0].inTime;
                        let outTime = logoutTime === -1 ? business[0].outTime : (logoutTime === 1 || logoutTime === 0) && timing[0].outTime;

                        let availableSlots = generateTimeSlotsWithDate(trndate, inTime, outTime, minutes === 0 ? 30 : minutes, appointments, assigned_to);
                        let localTime = toMinutes(LocalTime('HH:mm'));
                        if (trndate === LocalDate()) {
                            availableSlots = availableSlots.filter(item => toMinutes(item.start) >= localTime);
                        }
                        
                        setMorningSlot(availableSlots.filter(item => item.category === 'Morning'));
                        setAfternoonSlot(availableSlots.filter(item => item.category === 'Afternoon'));
                        setEveningSlot(availableSlots.filter(item => item.category === 'Evening'));

                        if (prevTrnDate === trndate && id !== 0 && prevAssigned_To === assigned_to && prevServicesItem === servicesItem) {
                            setSlot(prevSlot);
                        }

                    }
                    else
                        setUserWorking(false);

                }
                else {
                    setUserWorking(true);
                    setEmployeeName('');
                }
            }
            else
                setIsOpen(false);
        }
    }
    
    return (
        <div class='flex flex-col font-normal gap-3 '>
            <TextboxFlex label={'Search'} input={
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

            <p class="text-gray-400 my-4">Customer Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />


            <TextboxFlex label={'E-mail'} mandatory={true} input={
                <Input placeholder="abcd@company.com" status={customerEmail === '' || !isValidEmail(customerEmail) ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            } /> 
            
            <TextboxFlex label={'Notification'}  input={
               <Dropdown menu={menuProps} className="flex flex-row items-center justify-start" >
                    <Button size="large" style={{width:'100%'}} >
                        <div class="w-full text-sm flex flex-row items-center justify-between">
                            {items.filter(item => item.key === sendEmail).map( res => res.label)}
                            <DownOutlined />
                        </div>
                    </Button>
              </Dropdown>
            } />

            <Divider />
            <p class="text-gray-400 mb-4">Information</p>

            <TextboxFlex label={'Status'} input={
                <Select
                    value={status}
                    style={{ width: '100%' }}
                    onChange={(value) => { CalculatePrice(servicesItem) ;setStatus(value);}}
                    options={[
                        { value: 'Pending', label: <Badge color={'yellow'} text={'Pending'} /> },
                        { value: 'In progress', label: <Badge color={'blue'} text={'In progress'} /> },
                        { value: 'Completed', label: <Badge color={'green'} text={'Completed'} /> },
                        { value: 'Cancelled', label: <Badge color={'red'} text={'Cancelled'} /> },
                        { value: 'Rejected', label: <Badge color={'red'} text={'Rejected'} /> },
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
                    onChange={(value) => { setServicesItem(value); CalculatePrice(value); calculateDiscount(value,trndate) }}
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

            <TextboxFlex label={'Price ($)'}  input={
                <Input placeholder="Price" value={price} status={price === '' ? 'error' : ''} readOnly={true} style={{ backgroundColor: '#FAFAFA' }} onChange={(e) => setPrice(setNumberAndDot(e.target.value))} />
            } />

            <TextboxFlex label={'Discount'} input={
                <Input placeholder="Discount" value={discount} readOnly={coupon !== ''} onChange={(e) => setDiscount(setNumberAndDot(e.target.value))} />
            } />
            <TextboxFlex label={'Tax (%)'}  input={
                <Select
                    value={tax}
                    mode="single"
                    style={{ width: '100%' }}
                    onChange={(value) => setTax(value)}
                    options={[
                        { value: '0.0', label: '0%' },
                        { value: '0.05', label: '5%' },
                        { value: '0.13', label: '13%' },
                        { value: '0.15', label: '15%' }
                    ]}
                />
            } />

            <TextboxFlex label={'Total'} input={
                <Input placeholder="Total" style={{ backgroundColor: '#FAFAFA' }} status={parseFloat(total).toFixed(2) < 0  ? 'error' : ''} readOnly={true} value={total} />
            } />

           {false &&
            <TextboxFlex label={'Event'} input={
                <Select
                    value={coupon}
                    style={{ width: '100%' }}
                    onChange={(value) => { setCoupon(value); value === '' && setDiscount(0.00)}}
                    options={[{ value: '', label: '' },
                    ...liveList.map(item => ({
                        value: item.coupon,
                        label: item.title
                    }))]}
                />
            } />
           }
            {status === 'Completed' && <>
                <p class="text-gray-400 ">Payment Detail </p>

                <TextboxFlex label={'Type'}  input={
                    <Radio.Group onChange={(e) => setMode(e.target.value)} value={mode} style={{ width: '100%' }}>
                        <Radio.Button value="Cash">
                            <Flex gap="small" justify="center" align="center"  >
                                <BsCash style={{ fontSize: 14 }} />
                                Cash
                            </Flex>
                        </Radio.Button>
                        <Radio.Button value="Interac">
                            <Flex gap="small" justify="center" align="center"  >
                                 <TbTransfer style={{ fontSize: 14 }} />
                                E-Transfer
                            </Flex>
                        </Radio.Button>
                        <Radio.Button value="Card">
                            <Flex gap="small" justify="center" align="center"  >
                                <CreditCardOutlined style={{ fontSize: 14 }} />
                                By Card
                            </Flex>
                        </Radio.Button>
                    </Radio.Group>
                } />


                <TextboxFlex label={'Received'} mandatory={status === 'Completed'} input={
                    <Input placeholder="Received" value={received} 
                        status={received === ''   ? 'error' : ''}
                        onChange={(e) =>calculateTip(e.target.value)} />
                } />

                <TextboxFlex label={'Tip'} input={
                    <Input placeholder="Total" style={{ backgroundColor: '#FAFAFA' }} readOnly={true} value={tip} />
                } />
            </>
            }

            <Divider />
            <p class="text-gray-400 mb-4">Booking Details</p>

            <TextboxFlex label={'Date'} mandatory={true} input={
                <DatePicker status={trndate === '' ? 'error' : ''}
                    style={{ width: '100%' }}
                    allowClear={false}
                    disabledDate={id===0 && disabledDate}
                    value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')}
                    onChange={(date, dateString) => { setTrnDate(dateString); calculateDiscount(servicesItem, dateString) }} />
            } />

            <TextboxFlex label={'Employee'} input={
                <Select
                    value={assigned_to}
                    style={{ width: '100%' }}
                    onChange={(value) => setAssignedTo(value)}
                    disabled={!isAdmin}
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
                <div class='w-full flex flex-row gap-2 text-xs'>
                    {
                        isOpen ? isUserWorking ? assigned_to !== '0' ?
                            options.map(opt =>
                                <div key={opt.key} class='flex flex-col gap-2'>
                                    <p class='flex-row flex justify-center items-center '>{opt.label}</p>
                                    {opt.slotList.length === 0 ? <p class='text-xs text-gray-500'>Empty</p> :
                                        opt.slotList.map(item => (
                                            <Button key={item.slot} color={slot === item.slot ? 'cyan' : 'default'}
                                                variant="outlined"
                                               // disabled={item.disabled}
                                                onClick={() => {
                                                    setSlot(item.slot); 
                                                    setStart(item.start);
                                                    setEnd(item.end); 
                                                    }}>

                                                {item.slot}
                                            </Button>
                                        ))}
                                </div>
                            )
                            : <Tag color='red'>Please select an employee to see the available slots!</Tag>
                            : <Tag color='red'>The {employeeName} has the DAY OFF.</Tag>
                            : <Tag color='red'>Business is closed . Please book an appointment for another day!</Tag>
                    }
                </div>
            } />

            {contextHolder}
        </div>
    )

}

export default OrderDetail;