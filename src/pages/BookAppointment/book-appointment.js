/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, Spin,  Drawer, Input, Modal, notification } from 'antd';
import { LoadingOutlined, ArrowLeftOutlined, CloseOutlined, UpCircleOutlined, UserOutlined, CalendarOutlined, ContactsOutlined } from '@ant-design/icons';
import { useEffect,  useState } from 'react';
import {  useSearchParams } from 'react-router-dom';
import Services from '../../components/BookAppointment/services.js';
import Employee from '../../components/BookAppointment/employee.js';
import Slot from '../../components/BookAppointment/slot.js';
import Details from '../../components/BookAppointment/detail.js';
import { get_Date, LocalDate, LocalTime } from '../../common/localDate.js';
import useAlert from '../../common/alert.js';
import { isValidEmail, setCellFormat } from '../../common/cellformat.js';
import FirstPage from '../../components/BookAppointment/first_page.js';
import BookingOption from '../../components/BookAppointment/book_reschedule.js';
import ViewBooking from '../../components/BookAppointment/view_booking.js';
import { TextboxFlexCol } from '../../common/textbox.js';
import { useIdleTimer } from 'react-idle-timer';
import { compareTimes, isOpenForWork, userSchedule } from '../../common/general.js';
import { generateTimeSlotsWithDate, toMinutes } from '../../common/generateTimeSlots.js';
import AssignedTo from '../../common/assigned_to.js';
import FetchData from '../../hook/fetchData.js';
import SaveData from '../../hook/saveData.js'
import { useEmail } from '../../email/email.js';

const BookAppointment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { contextHolder, warning, error } = useAlert();
    const [modal, contextHolderModal] = Modal.useModal();
   
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(0);
    const { sendEmail,AppointmentStatus} = useEmail();
    
    const [scheduleList, setScheduleList] = useState([]);

    const [cid, setCid] = useState(0);
    const [storeName, setStoreName] = useState('');
    const [storeCell, setStoreCell] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [daysAdvance, setDaysAdvance] = useState(0);
    const [autoAccept, setAutoAccept] = useState(false);
    const [storeSchedule, setStoreSchedule] = useState(null);

    const [bookingType, setBookingType] = useState(0);
    const [assigned_to, setAssignedTo] = useState(0);
    const [prevAssigned_To, setPrevAssigned_To] = useState(0);
    const [activeEmployee, setActiveEmployee]=useState([])
    
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState(0);

    const [servicesItem, setServicesItem] = useState([]);
    const [prevServicesItem, setPrevServicesItem] = useState([]);
    const [price, setPrice] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');

    const [trndate, setTrnDate] = useState(LocalDate());
    const [slot, setSlot] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [prevTrnDate, setPrevTrnDate] = useState('');
    const [prevSlot, setPrevSlot] = useState('');
    const [availableSlot, setAvailableSlot] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isUserWorking, setUserWorking] = useState(false);

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    const [isURL, setIsURL] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [eventList, setEventList] = useState([]);


    const [order_no, setOrder_no] = useState('');
    const [order_id, setOrder_Id] = useState(0);

    const [openExit, setOpenExit] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const storeId = searchParams.get('store') || 'All';

    const onIdle = () => {
        window.location.reload();
    };

    useIdleTimer({
        onIdle,
        timeout: 1000 * 60 * 5, // 10 minutes in milliseconds
        promptTimeout: 0, // No warning prompt
        crossTab: true, // Optional: Sync state across browser tabs
    });

    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            const locationsResponse = await FetchData({
                method: 'GET',
                endPoint: 'company/booking',
                cid: storeId
            })
            setIsURL(locationsResponse.data.length > 0);
            setCompanyList(locationsResponse.data);
            setIsLoading(false)
        };
          init(); 
    }, []);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            const serviceResponse = await FetchData({ method: 'GET', endPoint: 'services', cid: cid })
            const userResponse = await FetchData({ method: 'GET', endPoint: 'user', cid: cid })
            const eventResponse = await FetchData({ method: 'GET', endPoint: 'event', eventDate: true, cid: cid })
            const scheduleResponse = await FetchData({ method: 'GET', endPoint: 'schedule', cid: cid })
            companyList.filter(a => a.id === cid).map(item => {
                setStoreName(item.name);
                setStoreCell(item.cell);
                setDaysAdvance(item.bookingdays);
                setAutoAccept(item.autoaccept);
                setStoreSchedule(item.timinginfo[0]);
                if (item.addressinfo !== null) {
                    let address = `${item.addressinfo[0].street}, ${item.addressinfo[0].city}, ${item.addressinfo[0].province} ${item.addressinfo[0].postal} `;
                    setStoreAddress(address);
                }
            });
            setScheduleList(scheduleResponse.data);
            setServicesList(serviceResponse.data);
            setUserList(userResponse.data);
            setEventList(eventResponse.data);
            setIsLoading(false)
        };  
        init(); 
    }, [cid]);

    useEffect(() => {
        setIsLoading(true)
        let active = [];
        const user = assigned_to > 0 ? userList.filter(item => item.id === assigned_to) : userList;
        user.map(item => {
            const timing = userSchedule(trndate, item.timinginfo[0], item.id,scheduleList);
            if (timing[0].isOpen) {
                active.push({
                    id: item.id,
                    name: item.fullname,   // <-- date included here
                    inTime: timing[0].inTime,
                    outTime: timing[0].outTime,
                    isOpen: timing[0].isOpen,
                    breakStart: timing[0].breakStart,
                    breakEnd: timing[0].breakEnd
                });
            }
        })
        setActiveEmployee(active);
        setIsLoading(false)
    }, [assigned_to]);

    useEffect(() => {
        if (employeeId > 0)
            userList.filter(a => a.id === employeeId).map(item => setEmployeeName(item.fullname))     
    }, [employeeId]);

    useEffect(() => {
        let _price = 0
        let _discount = 0
        let _total = 0
        servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item => {
            let list = eventList.filter(event => event.case.toUpperCase() !== 'PAST' && event.serviceinfo[0] === item.id &&
                get_Date(trndate, 'YYYY-MM-DD') >= get_Date(event.startdate, 'YYYY-MM-DD') &&
                get_Date(trndate, 'YYYY-MM-DD') <= get_Date(event.enddate, 'YYYY-MM-DD'));
            let _isDiscountApplied = false;
            let _eventTotal = 0
            let _eventDiscount = 0
            if (list.length > 0) {
                _isDiscountApplied = true;
                _eventTotal = list[0].total;
                _eventDiscount = list[0].discount;
            }
            _price += parseFloat(item.price);
            _discount += (_isDiscountApplied ? parseFloat(_eventDiscount) : 0)
            _total += (_isDiscountApplied ? parseFloat(_eventTotal) : parseFloat(item.price))
        });
        setPrice(_price);
        setTotal(_total);
        setDiscount(_discount);
        setCoupon(coupon);
    }, [servicesItem,trndate]);

    useEffect(() => {
        if (cid !== 0 && trndate !== '') {
            onTrnDateChange();          
        }
        }, [trndate]);

    const onTrnDateChange = async () => {
        //setSlot(prevTrnDate === trndate && bookingType > 1 ? prevSlot :'' );
        setSlot('');
        const business = isOpenForWork(trndate, storeSchedule); 
         if (business[0].isOpen) {
                setIsOpen(true);
                if (assigned_to > 0) {
                    const user = userList.find(item => item.id === assigned_to);
                    setEmployeeName(user.fullname);          
                    const employee = userSchedule(trndate, user.timinginfo[0],assigned_to,scheduleList);   
                   
                    if (employee[0].isOpen) {
                        setUserWorking(true);
                        let orderList =await getOrderList(assigned_to);
                        let appointments = orderList.filter(a => (a.trndate.includes(get_Date(trndate, 'YYYY-MM-DD')) && a.assignedto === assigned_to && a.status !== 'Cancelled' && a.status !== 'Rejected' && a.id !== order_id));
                        appointments = [...appointments, { start: employee[0].breakStart ,end:employee[0].breakEnd}]
                        let minutes = 0;
                        servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item => { minutes += item.minutes; });

                        let loginTime = compareTimes(business[0].inTime, employee[0].inTime);
                        let logoutTime = compareTimes(business[0].outTime, employee[0].outTime);
                        let inTime = loginTime === -1 ? employee[0].inTime : (loginTime === 1 || loginTime === 0) && business[0].inTime;
                        let outTime = logoutTime === -1 ? business[0].outTime : (logoutTime === 1 || logoutTime === 0) && employee[0].outTime;
                        setAvailableSlot(generateTimeSlotsWithDate(trndate, inTime, outTime, minutes === 0 ? 30 : minutes, appointments,assigned_to));
                       
                        if (prevTrnDate === trndate && order_id !== 0 && prevAssigned_To === assigned_to && prevServicesItem === servicesItem) {
                            setSlot(prevSlot);
                        }

                    }
                    else
                        setUserWorking(false);

                }
                else if (assigned_to === -1)
                {
                    setUserWorking(true);
                    let minutes = 0;
                    servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item => { minutes += item.minutes; });
                    let orderList = [];
                    let appointments = [];
                    let data = [];
                    activeEmployee.map(async (employee,index) => {
                        orderList =await getOrderList(employee.id);
                        appointments = orderList.filter(a => (a.trndate.includes(get_Date(trndate, 'YYYY-MM-DD')) && a.assignedto === employee.id && a.status !== 'Cancelled' && a.status !== 'Rejected' && a.id !== order_id));
                        appointments = [...appointments, { start: employee.breakStart ,end:employee.breakEnd}]
                       
                        let loginTime = compareTimes(business[0].inTime, employee.inTime);
                        let logoutTime = compareTimes(business[0].outTime, employee.outTime);
                        let inTime = loginTime === -1 ? employee.inTime : (loginTime === 1 || loginTime === 0) && business[0].inTime;
                        let outTime = logoutTime === -1 ? business[0].outTime : (logoutTime === 1 || logoutTime === 0) && employee.outTime;
                        let slots = generateTimeSlotsWithDate(trndate, inTime, outTime, minutes === 0 ? 30 : minutes, appointments, employee.id);   
                        data.push(slots);

                        if(index === activeEmployee.length -1)
                        {
                            let distinctSlotObjects = [
                                ...new Map(
                                    data.flat().map(item => [item.slot, item])
                                ).values()
                            ];
                            setAvailableSlot(distinctSlotObjects) 
                        }
                    })  
                    
                    if (prevTrnDate === trndate && order_id !== 0 && prevAssigned_To === assigned_to && prevServicesItem === servicesItem) {
                        setSlot(prevSlot);
                    }
                }
                else {
                    setUserWorking(true);
                    setEmployeeName('');
                }
            }
            else
                setIsOpen(false);

    }

    const getOrderList = async (uid) => {
        setIsLoading(true);
        const body = JSON.stringify({  date: get_Date(trndate, 'YYYY-MM-DD').toString(), uid: parseInt(uid) }); 
        const orderResponse = await FetchData({ method: 'POST', endPoint: 'order/booking',cid:cid,body:body })
        setIsLoading(false);
        return orderResponse.data;
    }
   
 
    const isSlotAvailable = async () => {
        if (bookingType === 3)
            return true

        setIsLoading(true);
        const body = JSON.stringify({ date: get_Date(trndate, 'YYYY-MM-DD').toString(), uid: parseInt(employeeId) });
        const orderResponse = await FetchData({ method: 'POST', endPoint: 'order/booking', cid: cid, body: body });
        let orderList = orderResponse.data.filter(a => a.status !== "Cancelled" && a.slot === slot);
        if (bookingType === 2 && orderList.length === 1) {
            if (orderList[0].slot === prevSlot)
                orderList = [];
        }
        setIsLoading(false);
        return orderList.length === 0;
    }

    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 && customerEmail !== '' && isValidEmail(customerEmail) ) {
            const Body = JSON.stringify({
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmail: customerEmail,
                serviceinfo: servicesItem,
                price: price,
                discount: discount,
                tax: '0',
                taxamount: '0',
                total: total,
                coupon: coupon,
                status: autoAccept ? 'Pending':'Awaiting',
                trndate: trndate,
                assignedto: employeeId,
                slot: slot,
                start: start,
                end: end,
                received: '0',
                mode: 'Cash',
                tip: '0',
                bookedvia: 'Appointment',
                sendnotification:true
            });

            if (isSlotAvailable())
            {
                const res=await SaveData({
                    label: "Appointment",
                    method: bookingType === 2 ? 'PUT' : 'POST',
                    endPoint: bookingType === 3 ? 'order/cancel' :"order",
                    id: bookingType === 1 ? null : order_id ,  
                    cid:cid,
                    body: Body // [] on cancel
                }); 
                
                if (res.isSuccess) {
                    const id = res.data.id;
                    const order_no = res.data.order_no;

                    sendEmail({
                        id: id,
                        cid:cid,
                        status: autoAccept ?
                            bookingType === 1 ? AppointmentStatus.CONFIRMED : bookingType === 2 ? AppointmentStatus.RESCHEDULED : AppointmentStatus.CANCELLED
                            : AppointmentStatus.AWAITING,
                        userList: userList, 
                        servicesList: servicesList
                    })
                    
                    modal.success({
                        title:(<span class='font-semibold'>{storeName}</span>),
                        onOk() { window.location.reload()},
                        content: (
                            <div class='flex flex-col gap-4 p-4'>
                                <p class='font-bold'>Hi {customerName}</p>
                                <p>Your appointment at <span class='font-semibold'>{storeName}</span> has been 
                                    <strong>
                                        {autoAccept ? ' ' +
                                            bookingType === 1 ? AppointmentStatus.CONFIRMED : bookingType === 2 ? AppointmentStatus.RESCHEDULED : AppointmentStatus.CANCELLED
                                            : ' Waiting for approval.'}
                                    </strong>
                                </p>
                                <div class='w-full flex flex-col gap-2 p-2 bg-white rounded-lg shadow border border-green-700 border-s-green-700 border-s-8'>
                                    <p class='font-bold'>Appointment Details</p>
                                    <p>Booking #: <span class='font-semibold'>{order_no}</span></p>
                                    <p>Booked with: <span class='font-semibold'>{employeeName}</span></p>
                                    <p>Date: <span class='font-semibold'>{`${get_Date(trndate, 'DD MMM YYYY')} at ${slot}`}</span></p>
                                </div>
                                <p>You will shortly receive an email shortly.</p>
                            </div>
                        ),
                    })

                }
                else 
                    error(`We sincerely apologize, but something went wrong with your appointment. We invite you to try again, or to contact the store at ${storeCell} to get help!`)    
            }
            else
                warning(`The time slot (${slot}) on ${trndate} has been reserved by another party and is no longer available`);          
        }
        else {
            warning('Please, fill out the required fields !');
        }
    }

    const searchOrder = async () => {
        if (order_no !== '' && customerPhone !== '' && customerPhone.length === 12) {
            setIsLoading(true);
            setTrnDate('');
            let result = false;
            let message = 'Either Booking# or Cell # is incorrect!';
            try {
                const Body = JSON.stringify({order_no: order_no});
                const orderResponse = await FetchData({ method: 'POST', endPoint: 'order/reschedule', cid: cid ,body:Body})
               
                if (orderResponse.data.length > 0) {
                    const editList = orderResponse.data[0];
                    if (editList.cell === customerPhone) {

                        const date1 = new Date(editList.trndate);
                        const date2 = new Date(LocalDate());
                        if (date1 < date2 || (get_Date(editList.trndate,'YYYY-MM-DD') === LocalDate() && toMinutes(editList.start) < toMinutes(LocalTime('HH:mm')))) {
                            result = false;
                            message = `Past order can't be rescheduled or cancel.`;
                        }
                        else if (editList.status === 'Completed' || editList.status === 'Cancelled' || editList.status === 'Rejected' ) {
                            result = false;
                            message = `Order is already marked as ${editList.status}.`;
                        }
                        else {
                            result = true;
                            message = '';
                            setOrder_Id(editList.id)
                            setAssignedTo(editList.assignedto);
                            setEmployeeId(editList.assignedto);
                            setPrevAssigned_To(editList.assignedto);
                            setServicesItem(editList.serviceinfo);
                            setPrevServicesItem(editList.serviceinfo);
                            setSlot(editList.slot);
                            setStart(editList.start);
                            setEnd(editList.end);
                            setPrevSlot(editList.slot);
                            setPrevTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
                            setTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
                            setCustomerName(editList.name);
                            setCustomerEmail(editList.email);
                            setPrice(editList.price);
                            setTotal(editList.total);
                            setCoupon(editList.coupon);
                            setDiscount(editList.discount);

                        }
                    }

                    if (result) {
                        setContent(5);
                        bookingType === 2 && setOpenOrder(true)
                        setOpenSearch(false);

                    }
                    else
                        warning(message);
                }
                else
                    warning(message);
            }
            catch (e) {
                // setList([])
                error(e.message)
            }
            setIsLoading(false);
        }
        else
            warning('Please, fill out the required fields !');
    }

    const next = () => {
        let isNext = true;
        let message = '';
        switch (content) {
            case 1:
                {
                    if (bookingType > 1 && order_id === 0) {
                        isNext = false;
                        setOpenSearch(true);
                    }
                    if (bookingType < 2)
                        setTrnDate(LocalDate())
                    break;
                }
            case 2:
                {
                    if (assigned_to === 0) {
                        isNext = false;
                        message = "Please select a professional from list. "
                    }
                    break;
                }
            case 3:
                {

                    if (servicesItem.length === 0) {
                        isNext = false;
                        message = "Minimum one service is required to book an appointment. "
                    }
                    onTrnDateChange();
                    break;
                }
            case 4:
                {

                    if (slot === '') {
                        isNext = false;
                        message = "Please select a slot as per professional availability. "
                    }
                    break;
                }
            case 5:
                {
                    isNext = false;
                    if (customerName === '' || customerPhone === '' || customerPhone.length !== 12 || customerEmail === '' || !isValidEmail(customerEmail))
                        message = "Please fill the contact details. "
                    else
                        save();
                    break;
                }
            default: { break }
        }
        if (isNext)
            setContent(content + 1);
        else if (message !== '')
            warning(message);

    };

    const prev = () => {
        setContent(content - 1);
    };

    let displayedContent;
    if (content === 0) {
        displayedContent = <FirstPage companyList={companyList} setCid={setCid} next={next} />
    } else if (content === 1) {
        displayedContent = <BookingOption bookingType={bookingType} setBookingType={setBookingType} />
    } else if (content === 2) {
        displayedContent = <Employee userList={userList} next={next} user={assigned_to} setUser={setAssignedTo} setEmployeeName={setEmployeeName} />
    } else if (content === 3) {
        displayedContent = <Services
            servicesList={servicesList}
            eventList={eventList}
            next={next}
            servicesItem={servicesItem}
            setServicesItem={setServicesItem}
            setPrice={setPrice} 
            setDiscount={setDiscount} 
            setTotal={setTotal} 
            setCoupon={setCoupon} />
    } else if (content === 4) {
        displayedContent = <Slot
            daysAdvance={daysAdvance}
            trndate={trndate}
            setTrnDate={setTrnDate}
            slot={slot}
            setSlot={setSlot}
            setStart={setStart}
            setEnd={setEnd}
            setEmployeeId={setEmployeeId}
            isOpen={isOpen}
            isUserWorking={isUserWorking}
            availableSlots={availableSlot}
            employeeName={employeeName} />
    } else if (content === 5) {
        displayedContent = <Details
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail} />
    }

    return (
        <div class='w-full p-8'>
            {isLoading ? (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999, // Ensure it's on top
                    }}
                >
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            ) :
                isURL ?
                    <>
                        {cid > 0 &&
                            <div class='w-full flex flex-row justify-between items-center mb-2'>
                                {content > 2 ? <ArrowLeftOutlined style={{ fontSize: 20 }} onClick={() => prev()} /> : <p></p>}
                                <CloseOutlined style={{ fontSize: 20 }} onClick={() => setOpenExit(true)} />
                            </div>
                        }
                        <div class='overflow-x-auto'>
                            {displayedContent}
                        </div>

                        {
                            bookingType > 0 &&
                            <div class="fixed bottom-2 left-6 right-6 z-20 p-2 border rounded-md bg-black text-white border-gray-200 shadow-md ">
                                <div class='flex flex-row justify-between items-center  p-2'>
                                    <div class='flex flex-row items-center gap-4'>
                                        <UpCircleOutlined style={{ fontSize: 20, color: 'white' }} onClick={() => setOpenOrder(true)} />
                                        <div class='flex flex-col text-xs'>
                                            <p class='font-medium text-gray-300'>Price : ${total}</p>
                                            <p class='text-gray-600'>Services : {servicesItem.length} </p>
                                        </div>
                                    </div>
                                    <Button
                                        color={bookingType === 3 && content === 5 ? "danger" : "default"}
                                        variant="outlined"
                                        style={{ fontWeight: 'bold' }}
                                        onClick={() => next()}>
                                        {content === 5 ? (bookingType === 3 ? "Cancel Booking" : "Complete") : 'Next'}
                                    </Button>

                                </div>
                            </div>

                        }
                    </> :
                    <div class='flex flex-row justify-center items-center'>
                        <div class='flex flex-col gap-3 items-start'>
                            <p class='text-4xl font-sans font-semibold'> Page not found</p>
                            <p >Uh oh, we can't seem to find the page you're looking for.</p>
                            <p >Are you sure the website URL is correct ?</p>
                            <p >Get in touch with the site owner.</p>
                        </div>
                    </div>

            }

            {/* Exit Drawer*/}
            <Drawer title={"Are you sure you want to exit ?"} placement='bottom' height={'20%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenExit(false)} open={openExit}>
                <div class='w-full flex flex-row gap-2 items-center'>
                    <div class='w-1/2'>
                        <Button color="default" variant="outlined" style={{ width: '100%', borderRadius: 24 }} onClick={() => setOpenExit(false)}> No </Button>
                    </div>
                    <div class='w-1/2'>
                        <Button color="danger" variant="solid" style={{ width: '100%', borderRadius: 24 }} onClick={() => window.location.reload()}> Yes, Exit </Button>
                    </div>
                </div>
            </Drawer>

            {/* Search Drawer*/}
            <Drawer title={""} placement='bottom' height={'70%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenSearch(false)} open={openSearch}>
                <div class='flex flex-col font-normal gap-4 w-full' >
                    <TextboxFlexCol label={'Booking#'} mandatory={true} input={
                        <Input placeholder="Enter your booking #" size="large" status={order_no === '' ? 'error' : ''} value={order_no} onChange={(e) => setOrder_no(e.target.value)} />
                    } />

                    <TextboxFlexCol label={'Cell #'} mandatory={true} input={
                        <Input placeholder="Enter your 10 digit phone number . ." size="large" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
                    } />
                       
                    <div class='my-4 flex justify-end items-center'>
                        <Button size='large' color='default' variant="solid" onClick={() => searchOrder()}  >Submit</Button>
                    </div>
                </div>
            </Drawer>

            {/* View Order*/}
            <Drawer title={
                <div class='flex flex-col'>
                    <p class='font-medium text-sm text-gray-600'>{storeName} </p>
                    <p class='text-gray-400 text-xs'>{storeAddress}</p>
                </div>}
                placement='bottom' height={'90%'} style={{ backgroundColor: '#f9fafb' }} onClose={() => setOpenOrder(false)} open={openOrder}>
                <div class='w-full flex flex-col  gap-6 items-center p-3'>

                    {assigned_to !== 0 && <ViewBooking title={'Professional'} content={2} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={
                            <div class='flex flex-row gap-4 w-full items-center'>
                                {
                                    assigned_to === -1 ? 
                                        <AssignedTo key={-1} userId={-1} userList={userList} />
                                    :                            
                                    userList.filter(f => f.id === assigned_to).map(item =>
                                    <AssignedTo key={item.id} userId={item.id} userList={userList}  />
                                )}
                            </div>
                        } />
                    }

                    {servicesItem.length !== 0 && <ViewBooking title={'Services'} content={3} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={<div class='flex flex-col gap-2'>
                            {servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item =>
                            {
                                let list = eventList.filter(event => event.case.toUpperCase() !== 'PAST' && event.serviceinfo[0] === item.id && 
                                    get_Date(trndate, 'YYYY-MM-DD') >= get_Date(event.startdate, 'YYYY-MM-DD') &&
                                    get_Date(trndate, 'YYYY-MM-DD') <= get_Date(event.enddate, 'YYYY-MM-DD'));
                                let _isDiscountApplied = false;
                                let _price = 0;
                                if (list.length > 0) {
                                    _isDiscountApplied = true;
                                    _price = list[0].total;
                                }

                                return(
                                <div key={item.id} class='flex flex-row items-center text-gray-700'>
                                        <div class='bg-gray-100 py-1 px-2  text-gray-600 font-semibold font-sans border-r shadow-md rounded-r-md flex items-center gap-2'>
                                            {_isDiscountApplied ?
                                                <>
                                                    <span class="relative text-sm font-bold text-black  before:absolute before:inset-0 before:top-1/2 before:h-[2px] before:bg-red-500 before:rotate-[-15deg]">
                                                        $ {parseFloat(item.price).toFixed(2)}
                                                    </span>
                                                    <span class="text-sm font-bold text-black">$ {parseFloat(_price).toFixed(2)}</span>
                                                </>
                                                : <>
                                                    <span class="relative text-sm font-bold text-black  ">
                                                        $ {parseFloat(item.price).toFixed(2)}
                                                    </span>
                                                </>
                                            }
                                        </div>   
                                    <p style={{ fontSize: 11, fontWeight: 500, marginLeft: 8 }}>{item.name}</p>
                                </div>
                           )})}
                        </div>
                        } />
                    }

                    {slot !== '' && <ViewBooking title={'Date/Time'} content={4} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={<div class='flex flex-row gap-4 items-center'>
                            <CalendarOutlined style={{ fontSize: 16, color: 'gray', marginLeft: 2 }} />
                            <div class='flex flex-col text-xs'>
                                <p class='font-sans font-semibold'>{get_Date(trndate, 'DD MMM YYYY')}</p>
                                <p class='text-gray-400'>{slot}</p>
                            </div>
                        </div>
                        } />
                    }

                    {customerName !== '' && <ViewBooking title={'Contact details'} content={5} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={<div class='flex flex-row gap-4 items-center'>
                            <ContactsOutlined style={{ fontSize: 20, color: 'gray', marginLeft: 2 }} />
                            <div class='flex flex-col text-xs'>
                                <p class='font-sans font-semibold'>{customerName}</p>
                                <p class='text-gray-400'>{customerPhone}</p>
                                <p class='text-gray-400'>{customerEmail}</p>
                            </div>
                        </div>
                        } />
                    }

                </div>
            </Drawer>


            {contextHolder}
            {contextHolderModal}
        </div>
    );
}

export default BookAppointment;