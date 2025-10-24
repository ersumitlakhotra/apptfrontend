/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button,  Spin, Steps, theme, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import  { useEffect, useState } from 'react';
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

const BookAppointment =()=> {
    const [searchParams, setSearchParams] = useSearchParams();

    const { contextHolder,warning } = useAlert();
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
    const [storeName, setStoreName] = useState('');
    const [storeCell, setStoreCell] = useState('');
    const [service, setService] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [user, setUser] = useState(0);
    const [employeeName, setEmployeeName] = useState('');
    const [slot, setSlot] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const [price, setPrice] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');

    const storeId = searchParams.get('store') || 'All';

  useEffect(() => {
      getLocations(setCompanyList, "company/booking", storeId);
     }, []);

    useEffect(() => {
        getData(setServicesList, "services");
        getData(setEventList, "event", null,true);
        getData(setUserList, "user");
        getData(setOrderList, "order/booking", dayjs.utc(trndate, 'YYYY-MM-DD'));
    }, [cid]); 
    
    useEffect(() => {
        if (trndate === '')
            setTrnDate(LocalDate());
        if (cid !== 0) {
            getData(setOrderList, "order/booking", dayjs.utc(trndate, 'YYYY-MM-DD'));
        }
    }, [trndate]);

    const getData = async (setList, endPoint, date=null,eventDate=false) => {
        setIsLoading(true);
        try {
            const res = await apiCallsViaBooking("GET", endPoint, cid, [], null, date, eventDate);
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
            title: storeName === '' ? 'Select Location':storeName,
            content: <Location companyList={companyList} next={next} cid={cid} setCid={setCid} setStoreName={setStoreName} setStoreCell={setStoreCell} />,
        },
        {
            title: serviceName === '' ? 'Select Services' : serviceName,
            content: <Services 
            servicesList={servicesList} 
            eventList={eventList} 
            next={next} 
            service={service}  setService={setService} 
            setServiceName={setServiceName}
            setPrice={setPrice} setDiscount={setDiscount} setTotal={setTotal} setCoupon={setCoupon}  />,
        },
        {
            title: employeeName === '' ? 'Select Employee' : employeeName,
            content: <Employee userList={userList} next={next} user={user} setUser={setUser} setEmployeeName={setEmployeeName} />,
        },
        {
            title: slot === '' ? 'Select Slot':get_Date(trndate,'DD MMM YYYY')+' '+ slot,
            content: <Slot allCompany={companyList} cid={cid} trndate={trndate} setTrnDate={setTrnDate} orderList={orderList} assigned_to={user} next={next} slot={slot} setSlot={setSlot} />,
        },
        {
            title: customerName === '' ? 'Enter Details' : customerName,
            content: <Details customerName={customerName} setCustomerName={setCustomerName} customerPhone={customerPhone} setCustomerPhone={setCustomerPhone} />,
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

    
    const successModal = () => {
        modal.success({
            title:(<span class='font-semibold'>{storeName}</span>),
            content: (
                <div class='flex flex-col gap-4 p-4'>
                    <p class='font-bold'>Hi {customerName}</p>
                    <p>Your booking at <span class='font-semibold'>{storeName}</span> has been <span class='text-green-700'>Confirmed!</span></p>
                    <div class='w-full flex flex-col gap-2 p-2 bg-white rounded-lg shadow border border-green-700 border-s-green-700 border-s-8'>
                         <p class='font-bold'>Appointment Details</p>
                         <p>Booked with: <span class='font-semibold'>{employeeName}</span></p>
                         <p>Date: <span class='font-semibold'>{`${get_Date(trndate,'DD MMM YYYY')} at ${slot}`}</span></p>
                    </div>
                </div>
            ),
             onOk() {window.location.reload()},
        });
    };
    const errorModal = () => {
        modal.error({
            title: (<span class='font-semibold'>{storeName}</span>),
            content: ( <div class='flex flex-col gap-4 p-4'>
                <p class='font-bold'>We sincerely apologize, but something went wrong with your booking!</p>
                <p class='text-xs'>We invite you to try again, or to contact the store at {`( ${storeCell} ) `} to get help</p>
            </div>),         
             onOk() {window.location.reload()},
        });
    };
    const save = async () => {     
         if (customerName !== '' && customerPhone !== '' && customerPhone.length === 12 ) {  
            const Body = JSON.stringify({
                customerinfo: [{
                    name: customerName,
                    cell: customerPhone,
                    email: '',
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
                assignedto: user ,
                slot: slot
            });
          saveData( Body);                  
        }
        else {        
                warning('Please, fill out the required fields !');
        }
    }
     const saveData = async ( body) => {
        setIsLoading(true);
        try {
            const result = await apiCallsViaBooking("POST", "order", cid, body, null, null);
            if (result.status === 201)
            {
                 const message='Hi '+customerName + ', this is a confirmation of your '+storeName+ ' booking for '+
                get_Date(trndate,'DD MMM YYYY')+' at ' + slot +', If you have any questions, please contact the business at ( '+storeCell+' ) \n\n'+
                'Book again: '+'https://appointstack.com/book-appointment?store='+storeId;
                const res = await apiCallsViaBooking("POST", "twiliosms", cid, JSON.stringify({to: customerPhone.replaceAll('-','') ,message: message}), null, null);        
                successModal();
            }
            else
                errorModal();
        }
        catch (e) {
            errorModal();
        }
        setIsLoading(false);
    }
    return (
        <div class='w-full'>
           {/*<div class="relative max-w-xl mx-auto mt-8">
                <img class="h-64 w-full object-cover rounded-md"  alt="Random image" />
                <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <h2 class="text-white text-3xl font-bold">Book an Appointment</h2>
                </div>
            </div>*/}
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
                isLocationValid ?
                    <>
                        <Steps current={current} items={items} />
                        <div style={contentStyle}>{steps[current].content}</div>
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
                                    <Button variant='solid' color="cyan" onClick={() => save()}>
                                        Book Appointment
                                    </Button>
                                )}
                            </div>
                    </>
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