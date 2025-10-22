/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, message, Spin, Steps, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Location from '../../components/BookAppointment/locations.js';
import Services from '../../components/BookAppointment/services.js';
import Employee from '../../components/BookAppointment/employee.js';
import Slot from '../../components/BookAppointment/slot.js';
import Details from '../../components/BookAppointment/detail.js';
import { apiCallsViaBooking, getCompanyViaStore } from '../../hook/apiCall';
import { LocalDate } from '../../common/localDate.js';

function BookAppointment() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isLocationValid, setIsLocationValid] = useState(true);
    const [companyList, setCompanyList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [trndate, setTrnDate] = useState(LocalDate());

    const [cid, setCid] = useState(0);
    const [service, setService] = useState(0);
    const [user, setUser] = useState(0);

    const storeId = searchParams.get('store') || 'All';

  useEffect(() => {
      getLocations(setCompanyList, "company/booking", storeId);
     }, []);

    useEffect(() => {
        getData(setServicesList, "services");
        getData(setUserList, "user");
    }, [cid]); 
    
    useEffect(() => {
        if (trndate === '')
            setTrnDate(LocalDate());
        if (cid !== 0) {
            getData(setOrderList, "order/booking");
        }
    }, [trndate]);

    const getData = async (setList, endPoint, date=null) => {
        setIsLoading(true);
        try {
            const res = await apiCallsViaBooking("GET", endPoint, cid, null,date);
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
            title: 'Location',
            content: <Location companyList={companyList} next={next} cid={cid} setCid={setCid} />,
        },
        {
            title: 'Services',
            content: <Services servicesList={servicesList} next={next} service={service} setService={setService}  />,
        },
        {
            title: 'Employee',
            content: <Employee userList={userList} next={next} user={user} setUser={setUser} />,
        },
        {
            title: 'Slot',
            content: <Slot trndate={trndate} setTrnDate={setTrnDate} orderList={orderList} setOrderList={setOrderList} assigned_to={user}/>,
        },
        {
            title: 'Details',
            content: <Details />,
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
    return (
        <div class='w-full'>
            <div class="relative max-w-xl mx-auto mt-8">
                <img class="h-64 w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1680725779155-456faadefa26" alt="Random image" />
                <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <h2 class="text-white text-3xl font-bold">Book an Appointment</h2>
                </div>
            </div>
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
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button variant='solid' color="cyan" onClick={() => message.success('Processing complete!')}>
                                    Complete
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                        </div>
                    </>
                    :
                    <div class='flex flex-row justify-center items-center'>
invalid location
                    </div>
                }
            </div>
        </div>
    );
}

export default BookAppointment;