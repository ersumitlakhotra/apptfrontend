/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, Spin, Modal, Drawer, Image, Avatar, Input } from 'antd';
import { LoadingOutlined, ArrowLeftOutlined, CloseOutlined, UpCircleOutlined, UserOutlined, CalendarOutlined, ContactsOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Services from '../../components/BookAppointment/services.js';
import Employee from '../../components/BookAppointment/employee.js';
import Slot from '../../components/BookAppointment/slot.js';
import Details from '../../components/BookAppointment/detail.js';
import { apiCalls } from '../../hook/apiCall';
import { get_Date, LocalDate, LocalTime } from '../../common/localDate.js';
import dayjs from 'dayjs';
import useAlert from '../../common/alert.js';
import { isValidEmail } from '../../common/cellformat.js';
import FirstPage from '../../components/BookAppointment/first_page.js';
import BookingOption from '../../components/BookAppointment/book_reschedule.js';
import { generateTimeSlots } from '../../common/intervals.js';
import ViewBooking from '../../components/BookAppointment/view_booking.js';
import { TextboxFlexCol } from '../../common/textbox.js';
import { useIdleTimer } from 'react-idle-timer';

const BookAppointment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { contextHolder, warning, error } = useAlert();
    const [modal, contextHolderModal] = Modal.useModal();
    const [isLoading, setIsLoading] = useState(false);

    const [content, setContent] = useState(0);

    const [cid, setCid] = useState(0);
    const [storeName, setStoreName] = useState('');
    const [storeCell, setStoreCell] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [emailPass, setEmailPass] = useState('');
    const [daysAdvance, setDaysAdvance] = useState(0);
    const [slotGap, setSlotGap] = useState(60);
    const [storeSchedule, setStoreSchedule] = useState(null);

    const [bookingType, setBookingType] = useState(0);

    const [user, setUser] = useState(0);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeSchedule, setEmployeeSchedule] = useState(null);

    const [servicesItem, setServicesItem] = useState([]);
    const [price, setPrice] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');

    const [trndate, setTrnDate] = useState(LocalDate());
    const [slot, setSlot] = useState('');
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


    const [order_no, setOrder_no] = useState('');
    const [order_id, setOrder_Id] = useState(0);

    const [openExit, setOpenExit] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const storeId = searchParams.get('store') || 'All';
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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
        getLocations(setCompanyList, "company/booking", storeId);
    }, []);

    useEffect(() => {
        companyList.filter(a => a.id === cid).map(item => {
            setStoreName(item.name);
            setStoreCell(item.cell);
            setEmailUser(item.emailuser);
            setEmailPass(item.emailpass);
            setDaysAdvance(item.bookingdays);
            setSlotGap(item.slot);
            setStoreSchedule(item.timinginfo[0]);
            if (item.addressinfo !== null) {
                let address = `${item.addressinfo[0].street}, ${item.addressinfo[0].city}, ${item.addressinfo[0].province} ${item.addressinfo[0].postal} `;
                setStoreAddress(address);
            }
        })
        getData(setServicesList, "GET", "services");
        getData(setUserList, "GET", "user");
    }, [cid]);

    useEffect(() => {
        userList.filter(a => a.id === user).map(item => { setEmployeeName(item.fullname); setEmployeeSchedule(item.scheduleinfo[0]); }
        )
    }, [user]);

    useEffect(() => {
        let price = 0
        servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item => (price = price + parseFloat(item.price)));
        setPrice(price);
        setTotal(price);
        setDiscount(discount);
        setCoupon(coupon);
    }, [servicesItem]);

    useEffect(() => {
        if (employeeSchedule !== null && cid !== 0) {
            onTrnDateChange();          
        }
        }, [trndate, employeeSchedule]);

    const onTrnDateChange = async () => {
        const body = JSON.stringify({ date: get_Date(trndate, 'YYYY-MM-DD').toString(), uid: parseInt(user) });
        let orderList=[];
        setIsLoading(true);
        try {
            const res = await apiCalls("POST", "order/booking", cid, null, body, false);
            orderList=res.data.data;
        }
        catch (e) {
            orderList=[];
            //error(error.message)
        }
        setIsLoading(false);
        if (prevTrnDate === trndate && bookingType > 1) {
            setSlot(prevSlot);
        } else
            setSlot('')

        const dayNum = dayjs(trndate).get('day');
        const weekday = weekdays[dayNum];

        let inTime = '00:00:00';
        let outTime = '00:00:00';
        let isOpen = false;
        let isWorking = false;

        switch (weekday.toLowerCase()) {
            case 'sunday':
                {
                    inTime = employeeSchedule.sunday[0];
                    outTime = employeeSchedule.sunday[1];
                    isWorking = employeeSchedule.sunday[2];
                    isOpen = storeSchedule.sunday[2];
                    break;
                }
            case 'monday':
                {
                    inTime = employeeSchedule.monday[0];
                    outTime = employeeSchedule.monday[1];
                    isWorking = employeeSchedule.monday[2];
                    isOpen = storeSchedule.monday[2];
                    break;
                }
            case 'tuesday':
                {
                    inTime = employeeSchedule.tuesday[0];
                    outTime = employeeSchedule.tuesday[1];
                    isWorking = employeeSchedule.tuesday[2];
                    isOpen = storeSchedule.tuesday[2];
                    break;
                }
            case 'wednesday':
                {
                    inTime = employeeSchedule.wednesday[0];
                    outTime = employeeSchedule.wednesday[1];
                    isWorking = employeeSchedule.wednesday[2];
                    isOpen = storeSchedule.wednesday[2];
                    break;
                }
            case 'thursday':
                {
                    inTime = employeeSchedule.thursday[0];
                    outTime = employeeSchedule.thursday[1];
                    isWorking = employeeSchedule.thursday[2];
                    isOpen = storeSchedule.thursday[2];
                    break;
                }
            case 'friday':
                {
                    inTime = employeeSchedule.friday[0];
                    outTime = employeeSchedule.friday[1];
                    isWorking = employeeSchedule.friday[2];
                    isOpen = storeSchedule.friday[2];
                    break;
                }
            case 'saturday':
                {
                    inTime = employeeSchedule.saturday[0];
                    outTime = employeeSchedule.saturday[1];
                    isWorking = employeeSchedule.saturday[2];
                    isOpen = storeSchedule.saturday[2];
                    break;
                }
            default:
                {
                    inTime = '00:00:00'; outTime = '00:00:00'; isOpen = false;
                    isWorking = false;
                    break;
                }
        }
        setIsOpen(isOpen);
        setUserWorking(isWorking);
        setAvailableSlot([]);
        if (isOpen && isWorking) {
            if (trndate === LocalDate())
                inTime = LocalTime();
            setAvailableSlot(generateTimeSlots(inTime, outTime, slotGap, orderList, slot));
        }
    }

    const getData = async (setList, method, endPoint, id = null, body = [], eventDate = false) => {
       
        setIsLoading(true);
        try {
            const res = await apiCalls(method, endPoint, cid, id, body, eventDate);
            setList(res.data.data);
        }
        catch (e) {
            setList([])
            //error(error.message)
        }
        setIsLoading(false);
    }    
    
    const getLocations = async (setList, endPoint, store) => {
        setIsLoading(true);
        try {
            const res = await apiCalls("GET", endPoint, store);
            if (res.data.data.length > 0)
                setIsURL(true);
            setList(res.data.data);
        }
        catch (e) {
            setList([])
            setIsURL(false)
        }
        setIsLoading(false);
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
                    break;
                }
            case 2:
                {
                    if (user === 0) {
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
                    if (customerName === '' || customerPhone === '' || customerPhone.length !== 12 || customerEmail === '' || !isValidEmail(customerEmail)) {
                        isNext = false;
                        message = "Please fill the contact details. "
                    }
                    else {
                        save();
                    }
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


    const successModal = (order_no) => {
        modal.success({
            title: (<span class='font-semibold'>{storeName}</span>),
            content: (
                <div class='flex flex-col gap-4 p-4'>
                    <p class='font-bold'>Hi {customerName}</p>
                    <p>Your booking at <span class='font-semibold'>{storeName}</span> has been {bookingType === 2 && 'rescheduled and'} <span class='text-green-700'>Confirmed!</span></p>
                    <div class='w-full flex flex-col gap-2 p-2 bg-white rounded-lg shadow border border-green-700 border-s-green-700 border-s-8'>
                        <p class='font-bold'>Appointment Details</p>
                        <p>Booking #: <span class='font-semibold'>{order_no}</span></p>
                        <p>Booked with: <span class='font-semibold'>{employeeName}</span></p>
                        <p>Date: <span class='font-semibold'>{`${get_Date(trndate, 'DD MMM YYYY')} at ${slot}`}</span></p>
                    </div>

                    <p>You will shortly receive an email regarding booking confirmation.</p>
                </div>
            ),
            onOk() { window.location.reload() },
        });
    };
    const errorModal = () => {
        modal.error({
            title: (<span class='font-semibold'>{storeName}</span>),
            content: (<div class='flex flex-col gap-4 p-4'>
                <p class='font-bold'>We sincerely apologize, but something went wrong with your booking!</p>
                <p class='text-xs'>We invite you to try again, or to contact the store at {`( ${storeCell} ) `} to get help</p>
            </div>),
            onOk() { window.location.reload() },
        });
    };
    const cancelModal = (order_no) => {
        modal.success({
            title: (<span class='font-semibold'>{storeName}</span>),
            content: (
                <div class='flex flex-col gap-4 p-4'>
                    <p class='font-bold'>Hi {customerName}</p>
                    <p>Your booking at <span class='font-semibold'>{storeName}</span> has been  <span class='text-red-700'>Cancelled!</span></p>
                    <div class='w-full flex flex-col gap-2 p-2 bg-white rounded-lg shadow border border-red-700 border-s-red-700 border-s-8'>
                        <p class='font-bold'>Appointment Details</p>
                        <p>Booking #: <span class='font-semibold'>{order_no}</span></p>
                        <p>Booked with: <span class='font-semibold'>{employeeName}</span></p>
                        <p>Date: <span class='font-semibold'>{`${get_Date(trndate, 'DD MMM YYYY')} at ${slot}`}</span></p>
                    </div>
                    <p>You will shortly receive an email regarding booking cancellation.</p>
                </div>
            ),
            onOk() { window.location.reload() },
        });
    };


    const save = async () => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 && customerEmail !== '' && isValidEmail(customerEmail)) {
            const Body = JSON.stringify({
                customerinfo: [{
                    name: customerName,
                    cell: customerPhone,
                    email: customerEmail,
                }],
                serviceinfo: servicesItem,
                price: price,
                discount: discount,
                tax: '0',
                taxamount: '0',
                total: total,
                coupon: coupon,
                status: 'Pending',
                trndate: trndate,
                assignedto: user,
                slot: slot,
                bookedvia: 'Appointment',
            });

            if (bookingType === 1) {
                saveData("POST", "order", Body, null);
            }
            if (bookingType === 2) {
                saveData("PUT", "order", Body, order_id);
            }
            if (bookingType === 3) {//message, read, cancelled             
                saveData("POST", "order/cancel", [], order_id);
            }
        }
        else {
            warning('Please, fill out the required fields !');
        }
    }
    const saveData = async (method, endPoint, body, id) => {
        setIsLoading(true);
        try {
            const result = await apiCalls(method, endPoint, cid, id, body, null);
            if (result.status === 201 || result.status === 200) {
                const order_no = result.data.data.order_no;
                sendEmail(id, order_no, false);
                successModal(order_no);
            }
            else if (result.status === 203) {
                const order_no = result.data.data.order_no;
                sendEmail(id, order_no, true);
                const notifyBody = JSON.stringify({
                    message: '# ' + order_no + ' is cancelled by ' + customerName + ' : ' + customerPhone,
                    cancelled: '1',
                });
                await apiCalls("POST", "notification", cid, null, notifyBody, null);
                cancelModal(order_no);
            }
            else
                errorModal();
        }
        catch (e) {
            errorModal();
        }
        setIsLoading(false);
    }

    const sendEmail = async (id, order_no, isCancelled) => {
        const Subject = isCancelled ? 'Booking Cancellation' : id === null ? "Booking Confirmation" : "Re-Schedule Confirmation";
        const link = 'https://appointstack.com/book-appointment?store=' + storeId;
        let serviceNames = '';
        servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item =>
            serviceNames += item.name + ', '
        )

        let message = '<p>Hi ' + customerName + '</p>';
        message += `<p>This is a ${isCancelled ? 'cancellation' : 'confirmation'} of your <b>` + serviceNames + ' </b> booking on ' + get_Date(trndate, 'DD MMM YYYY') + ' at ' + slot + '.</p>';
        message += '<p>Your <b>Booking# :</b> ' + order_no + ' and <b>Booked With : </b>' + employeeName + '</p>';
        message += '<p>If you have any questions, please contact the business at ( ' + storeCell + ' )</p>';
        message += '<p>In case for New booking/Rescheduling/Cancellation, please click on this link:</p><a href="' + link + '">' + link + '</a>';

        const Body = JSON.stringify({
            emailUser: emailUser,
            emailPass: emailPass,
            storeName: storeName,
            to: customerEmail,
            subject: Subject,
            message: message,
        });
        setIsLoading(true);
        try {
            await apiCalls("POST", "sendmail", cid, null, Body);
        }
        catch (e) {

        }
        setIsLoading(false);
    }

    const searchOrder = async () => {
        if (order_no !== '' && customerEmail !== '') {
            setIsLoading(true);
            let result = false;
            let message = 'No record found.';
            try {
                const Body = JSON.stringify({
                    order_no: order_no
                });
                const res = await apiCalls("POST", "order/reschedule", cid, null, Body);
                if (res.data.data.length > 0) {
                    const editList = res.data.data[0];
                    if (editList.customerinfo !== null && editList.customerinfo[0].email.toLowerCase() === customerEmail.toLowerCase()) {

                        const bookDate = dayjs(`${get_Date(editList.trndate, 'YYYY-MM-DD')} ${dayjs(editList.slot, 'hh:mm A').format('HH:mm:ss')}`, `YYYY-MM-DDTHH:mm:ss`);
                        const localDate = dayjs(`${LocalDate()} ${LocalTime()}`, `YYYY-MM-DDTHH:mm:ss`);
                        const date1 = new Date(bookDate);
                        const date2 = new Date(localDate);
                        if (date1 < date2) {
                            result = false;
                            message = `Past order can't be rescheduled or cancel.`;
                        }
                        else if (editList.status !== 'Pending') {
                            result = false;
                            message = `Order is already marked as ${editList.status}.`;
                        }
                        else {
                            result = true;
                            message = '';
                            setOrder_Id(editList.id)
                            setUser(editList.assignedto);
                            setServicesItem(editList.serviceinfo);
                            setSlot(editList.slot);
                            setPrevSlot(editList.slot);
                            setPrevTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
                            setTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'));

                            if (editList.customerinfo !== null) {

                                setCustomerName(editList.customerinfo[0].name);
                                setCustomerPhone(editList.customerinfo[0].cell);
                            }

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
                        error(message);
                }
                else
                    error(message);
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

    let displayedContent;
    if (content === 0) {
        displayedContent = <FirstPage companyList={companyList} setCid={setCid} next={next} />
    } else if (content === 1) {
        displayedContent = <BookingOption bookingType={bookingType} setBookingType={setBookingType} />
    } else if (content === 2) {
        displayedContent = <Employee userList={userList} next={next} user={user} setUser={setUser} setEmployeeName={setEmployeeName} />
    } else if (content === 3) {
        displayedContent = <Services
            servicesList={servicesList}
            next={next}
            servicesItem={servicesItem}
            setServicesItem={setServicesItem}
            setPrice={setPrice} setDiscount={setDiscount} setTotal={setTotal} setCoupon={setCoupon} />
    } else if (content === 4) {
        displayedContent = <Slot
            daysAdvance={daysAdvance}
            trndate={trndate}
            setTrnDate={setTrnDate}
            slot={slot}
            setSlot={setSlot}
            isOpen={isOpen}
            isUserWorking={isUserWorking}
            availableSlot={availableSlot}
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

                    <TextboxFlexCol label={'E-mail'} mandatory={true} input={
                        <Input placeholder="Enter your e-mail address . ." size="large" status={customerEmail === '' || !isValidEmail(customerEmail) ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
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

                    {user !== 0 && <ViewBooking title={'Professional'} content={2} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={
                        <div class='flex flex-row gap-4  items-center'>
                            {userList.filter(f => f.id === user).map(item =>
                                <div key={item.id}>
                                    {item.profilepic !== null ?
                                        <Image width={24} height={24} src={item.profilepic} style={{ borderRadius: 10 }} /> :
                                        <Avatar size={24} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                    }
                                    <p class="text-xs font-medium">{item.fullname}</p>
                                </div>)}
                        </div>
                        } />
                    }

                    {servicesItem.length !== 0 && <ViewBooking title={'Services'} content={3} setContent={setContent} setOpenOrder={setOpenOrder}
                        value={<div class='flex flex-col gap-2'>
                            {servicesList.filter(a => servicesItem.some(b => b === a.id)).map(item =>
                                <div key={item.id} class='flex flex-row items-center text-gray-700'>
                                    <p class='bg-gray-50 w-10 p-1 text-xs text-gray-600 font-medium font-sans border-r shadow-md rounded-r-md'>
                                        $ {item.price}
                                    </p>
                                    <p style={{ fontSize: 11, fontWeight: 500, marginLeft: 8 }}>{item.name}</p>
                                </div>
                            )}
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