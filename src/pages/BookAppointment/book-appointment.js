/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, Spin, Steps, theme, Modal, Radio, Input, Select, Space,Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Location from '../../components/BookAppointment/locations.js';
import Services from '../../components/BookAppointment/services.js';
import Employee from '../../components/BookAppointment/employee.js';
import Slot from '../../components/BookAppointment/slot.js';
import Details from '../../components/BookAppointment/detail.js';
import { apiCallsViaBooking, getCompanyViaStore } from '../../hook/apiCall';
import { get_Date, LocalDate } from '../../common/localDate.js';
import dayjs from 'dayjs';
import useAlert from '../../common/alert.js';
import { TextboxFlex } from '../../common/textbox.js';
import logo from '../../Images/logo.png'
import { isValidEmail } from '../../common/cellformat.js';
import { Tags } from '../../common/tags.js';

const BookAppointment = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { contextHolder, warning, error } = useAlert();
    const [modal, contextHolderModal] = Modal.useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isLocationValid, setIsLocationValid] = useState(true);
    const [companyList, setCompanyList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [trndate, setTrnDate] = useState(LocalDate());

    const [cid, setCid] = useState(0);
    const [bookingNo, setBookingNo] = useState('');
    const [orderId, setOrderId] = useState(0);
    const [storeName, setStoreName] = useState('');
    const [storeCell, setStoreCell] = useState('');
    const [service, setService] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [user, setUser] = useState(0);
    const [employeeName, setEmployeeName] = useState('');
    const [slot, setSlot] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    const [price, setPrice] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');

    const [btype, setBtype] = useState('New Appointment');
    const [isRescheduled, setIsRescheduled] = useState(false);
    const [bookedSlot, setBookedSlot] = useState('');
    const [bookedTrndate, setBookedTrndate] = useState('');
    
    const [orderStatus, setOrderStatus] = useState('Pending');
    const storeId = searchParams.get('store') || 'All';

    useEffect(() => {
        getLocations(setCompanyList, "company/booking", storeId);
    }, []);

    useEffect(() => {
        setCid(0);
        setService(0);
        setUser(0);
        setCurrent(0);
        setStoreName('');
        setStoreCell('');
        setServiceName('');
        setEmployeeName('');
        setSlot('');
        setCustomerName('');
        setCustomerPhone('');
        setCustomerEmail('');
        setPrice('0');
        setTotal('0');
        setCoupon('');
        setDiscount('0');
        setBookingNo('');
        setOrderId(0);
        setTrnDate(LocalDate());
        setBookedSlot('');
        setBookedTrndate('');
        setOrderStatus('Pending');
        setIsRescheduled(false);
    }, [btype]);

    useEffect(() => {
        getData(setServicesList, "GET", "services");
        getData(setEventList, "GET", "event", [], null, null, true);
        getData(setUserList, "GET", "user");
        getData(setOrderList, "GET", "order/booking", [], null, dayjs.utc(trndate, 'YYYY-MM-DD'), false);
    }, [cid]);

    useEffect(() => {
        if (trndate === '')
            setTrnDate(LocalDate());
        if (cid !== 0) {
            getData(setOrderList, "GET", "order/booking", [], null, dayjs.utc(trndate, 'YYYY-MM-DD'), false);
        }

        if (btype === 'New Appointment')
            setSlot('');
        else {
            if (isRescheduled && trndate !== bookedTrndate)
                setSlot('');

        }

    }, [trndate]);

    const getData = async (setList, method, endPoint, body = [], id = null, date = null, eventDate = false) => {
        setIsLoading(true);
        try {
            const res = await apiCallsViaBooking(method, endPoint, cid, body, id, date, eventDate);
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
            const res = await getCompanyViaStore("GET", endPoint, store);
            setList(res.data.data);
            if (res.data.data.length === 0)
                setIsLocationValid(false)
            else
                setIsLocationValid(true);
        }
        catch (e) {
            setList([])
            setIsLocationValid(false)
            //error(error.message)
        }
        setIsLoading(false);
    }


    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: storeName === '' ? 'Select Location' : storeName,
            content: <Location companyList={companyList} next={next} cid={cid} setCid={setCid} setStoreName={setStoreName} setStoreCell={setStoreCell} />,
        },
        {
            title: serviceName === '' ? 'Select Services' : serviceName,
            content: <Services
                servicesList={servicesList}
                eventList={eventList}
                next={next}
                service={service}
                setService={setService}
                setServiceName={setServiceName}
                setPrice={setPrice} setDiscount={setDiscount} setTotal={setTotal} setCoupon={setCoupon} />,
        },
        {
            title: employeeName === '' ? 'Select Employee' : employeeName,
            content: <Employee userList={userList} next={next} user={user} setUser={setUser} setEmployeeName={setEmployeeName} />,
        },
        {
            title: slot === '' ? 'Select Slot' : get_Date(trndate, 'DD MMM YYYY') + ' ' + slot,
            content: <Slot allCompany={companyList} cid={cid} trndate={trndate} setTrnDate={setTrnDate} orderList={orderList} assigned_to={user} userList={userList} employeeName={employeeName} next={next} slot={slot} setSlot={setSlot} />,
        },
        {
            title: customerName === '' ? 'Enter Details' : customerName,
            content: <Details customerName={customerName} setCustomerName={setCustomerName} customerPhone={customerPhone} setCustomerPhone={setCustomerPhone} customerEmail={customerEmail} setCustomerEmail={setCustomerEmail} />,
        },
    ];
    const items = steps.map(item => ({ key: item.title, title: item.title }));
    const contentStyle = {
        height: '400px',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        padding: 16,
        whiteSpace: 'nowrap',
        overflowX: 'auto'
    };


    const successModal = (order_no) => {
        modal.success({
            title: (<span class='font-semibold'>{storeName}</span>),
            content: (
                <div class='flex flex-col gap-4 p-4'>
                    <p class='font-bold'>Hi {customerName}</p>
                    <p>Your booking at <span class='font-semibold'>{storeName}</span> has been {isRescheduled && 'rescheduled and'} <span class='text-green-700'>Confirmed!</span></p>
                    <div class='w-full flex flex-col gap-2 p-2 bg-white rounded-lg shadow border border-green-700 border-s-green-700 border-s-8'>
                        <p class='font-bold'>Appointment Details</p>
                        <p>Booking #: <span class='font-semibold'>{order_no}</span></p>
                        <p>Booked with: <span class='font-semibold'>{employeeName}</span></p>
                        <p>Date: <span class='font-semibold'>{`${get_Date(trndate, 'DD MMM YYYY')} at ${slot}`}</span></p>
                    </div>
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
                </div>
            ),
            onOk() { window.location.reload() },
        });
    };


    const save = async (isCancelled = false) => {
        if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 && customerEmail !== '' && isValidEmail(customerEmail)) {
            const Body = JSON.stringify({
                customerinfo: [{
                    name: customerName,
                    cell: customerPhone,
                    email: customerEmail,
                }],
                serviceinfo: service.split(),
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
            if (isCancelled) {
                saveData("POST", "order/cancel", [], orderId);
            }
            else {
                if (isRescheduled)
                    saveData("PUT", "order", Body, orderId);
                else
                    saveData("POST", "order", Body, null);
            }
        }
        else {
            warning('Please, fill out the required fields !');
        }
    }
    const saveData = async (method, endPoint, body, id) => {
        setIsLoading(true);
        try {
            const result = await apiCallsViaBooking(method, endPoint, cid, body, id, null);
            if (result.status === 201 || result.status === 200) {
                const order_no = result.data.data.order_no;
                const message = 'Hi ' + customerName + '\n,This is a confirmation of your ' + storeName + ' booking for ' +
                    get_Date(trndate, 'DD MMM YYYY') + ' at ' + slot + '.\n\nBooking# : ' + order_no + ' \nBooked with: ' + employeeName + '\nIf you have any questions, please contact the business at ( ' + storeCell + ' ) \n\n' +
                    'Book again: ' + 'https://appointstack.com/book-appointment?store=' + storeId;
                //const res = await apiCallsViaBooking("POST", "twiliosms", cid, JSON.stringify({to: customerPhone.replaceAll('-','') ,message: message}), null, null);        
                successModal(order_no);
            }
            else if (result.status === 203) {
                const order_no = result.data.data.order_no;
                const message = 'Hi ' + customerName + '\n,This is a confirmation of your ' + storeName + ' booking for ' +
                    get_Date(trndate, 'DD MMM YYYY') + ' at ' + slot + '.\n\nBooking# : ' + order_no + ' \nBooked with: ' + employeeName + '\nIf you have any questions, please contact the business at ( ' + storeCell + ' ) \n\n' +
                    'Book again: ' + 'https://appointstack.com/book-appointment?store=' + storeId;
                //const res = await apiCallsViaBooking("POST", "twiliosms", cid, JSON.stringify({to: customerPhone.replaceAll('-','') ,message: message}), null, null);        
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

    const searchOrder = async () => {
        setIsRescheduled(false);
        if (cid !== 0 && bookingNo !== '' && customerEmail !== '') {
            setIsLoading(true);
            let isRecordFound = false;
            try {
                // getData(setOrderList, "GET", "order/booking", [], null, dayjs.utc(trndate, 'YYYY-MM-DD'), false);
                const Body = JSON.stringify({
                    order_no: bookingNo
                });
                const res = await apiCallsViaBooking("POST", "order/reschedule", cid, Body);
                if (res.data.data.length > 0) {
                    const editList = res.data.data[0];
                    if (editList.customerinfo !== null && editList.customerinfo[0].email === customerEmail) {
                        companyList.filter(a => a.id === cid).map(item => {
                            setStoreName(item.name);
                            setStoreCell(item.cell);
                        })

                        setOrderId(editList.id)
                        setService(editList.serviceinfo[0]);
                        let service = servicesList.filter(a => a.id === editList.serviceinfo[0])
                        setServiceName(service[0].name);

                        setUser(editList.assignedto);
                        let employee = userList.filter(a => a.id === editList.assignedto);
                        setEmployeeName(employee[0].fullname);
                        setTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'))
                        setBookedTrndate(get_Date(editList.trndate, 'YYYY-MM-DD'))

                        setSlot(editList.slot);
                        setBookedSlot(editList.slot);
                        if (editList.customerinfo !== null) {

                            setCustomerName(editList.customerinfo[0].name);
                            setCustomerPhone(editList.customerinfo[0].cell);
                        }

                        setPrice(editList.price);
                        setTotal(editList.total);
                        setCoupon(editList.coupon);
                        setDiscount(editList.discount);
                        setOrderStatus(editList.status);
                        setCurrent(4);
                        setIsRescheduled(true);
                        isRecordFound = true;
                    }
                }
                if (!isRecordFound)
                    error('No record found!');

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

    return (
        <div class='w-full p-4'>
            {/*<div class="relative max-w-xl mx-auto mt-8">
                <img class="h-64 w-full object-cover rounded-md"  alt="Random image" />
                <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <h2 class="text-white text-3xl font-bold">Book an Appointment</h2>
                </div>
            </div>*/}
            <div class='flex flex-col border-b w-full object-cover rounded-md gap-2 pb-4 '>
                <div class='w-full flex justify-center items-center mt-4 '>
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" >
                        <img class="w-10 h-8 mr-2" src={logo} alt="logo" />
                        {process.env.REACT_APP_PROJECT_NAME}
                    </a>
                </div>
                <Radio.Group options={['New Appointment', 'Reschedule/Cancel Appointment']} value={btype} onChange={(e) => setBtype(e.target.value)} />
            </div>

            {btype !== 'New Appointment' &&
                <div class='w-full p-8 flex flex-col gap-2 border rounded-md bg-gray-200 '>
                    <TextboxFlex mandatory={true} label={'Location'} input={
                        <Select
                            value={cid}
                            style={{ width: '100%' }}
                            status={cid === 0 ? 'error' : ''}
                            onChange={(value) => setCid(value)}
                            options={[{ value: 0, label: ' ' },
                            ...companyList.map(item => ({
                                value: item.id,
                                label: item.name
                            }))]}
                        />
                    } />
                    <TextboxFlex label={'Booking #'} mandatory={true} input={
                        <Input placeholder="1001" status={bookingNo === '' ? 'error' : ''} value={bookingNo} onChange={(e) => setBookingNo(e.target.value)} />
                    } />

                    <TextboxFlex label={'E-mail'} mandatory={true} input={
                        <Input placeholder="abcd@company.com" status={customerEmail === '' ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                    } />
                    <div class='my-4 flex justify-end items-center'>
                        <Button size='large' color="primary" variant="solid" onClick={searchOrder} >Search</Button>
                    </div>
                </div>
            }

            <div class='w-full mt-4 '>
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
                    isLocationValid ?
                        (btype === 'New Appointment' || isRescheduled) ?
                            <>
                                <Steps current={current} items={items} />
                                <div style={contentStyle}>{steps[current].content}</div>
                                {orderStatus !== 'Pending' ? 
                                <div class='w-full mt-2'>
                                    Order status is marked as {Tags(orderStatus)}. You can't reschedule or cancel the appointment.
                                </div>
                                :
                                <div style={{ marginTop: 24 }}>
                                    {/*current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )*/}
                                    {current > 0 && (
                                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                            Previous
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Space>
                                            <Button variant='solid' color="cyan" onClick={() => save()}>
                                                {isRescheduled ? 'Rescheduled' : 'Book Appointment'}
                                            </Button>
                                            {isRescheduled &&
                                                <Popconfirm
                                                    title="Cancel"
                                                    description="Are you sure to cancel the appointment? "
                                                    onConfirm={() => save(true)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button variant='solid' color="danger">
                                                        Cancel Appointment
                                                    </Button>
                                                </Popconfirm>
                                            }
                                        </Space>
                                    )}
                                </div>}
                            </> : <></>
                        :
                        <div class='flex flex-row justify-center items-center'>
                            <div class='flex flex-col gap-3 items-start'>
                                <p class='text-4xl font-sans font-semibold'> Page not found</p>
                                <p >Uh oh, we can't seem to find the page you're looking for.</p>
                                <p >Are you sure the website URL is correct ?</p>
                                <p >Get in touch with the site owner.</p>
                            </div>
                        </div>
                }
            </div>
            {contextHolder}
            {contextHolderModal}
        </div>
    );
}

export default BookAppointment;