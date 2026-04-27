/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../pages/HomePage/header";
import useAlert from "../common/alert";
import SaveData from "../hook/saveData";
import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Modal, Popconfirm, Space, Spin, Tooltip } from "antd";
import { DeleteOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import Footer from "../pages/HomePage/footer";
import { useEmail } from "../email/email";
import { initNotification } from "../Firebase/requestPermission";
import OrderView from "../components/Order/order_view";
import { getStorage } from "../common/localStorage";
import FetchData from "../hook/fetchData";
import OrderDetail from "../components/Order/order_detail";
import UserDetail from "../components/Users/user_detail";
import ScheduleDetail from "../components/Schedule/schedule_detail";
import { LocalDate } from "../common/localDate";
import { checkPlanStatus } from "../pages/HomePage/general";
import NetworkBanner from "../common/isinternet";
import IsSetupComplete from "../pages/HomePage/isSetupComplete";
import EventDetail from "../components/Event/event_detail";
import CustomerDetail from "../components/Customer/customer_detail";
import ServiceDetail from "../components/Services/service_detail";
import CustomerView from "../components/Customer/customer_view";

const ProtectedLayout = () => {
    const ranOnce = useRef(false);
    const ref = useRef();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { contextHolder, success, error, notifications } = useAlert();
    const { sendEmail } = useEmail()

    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [uid, setUid] = useState(0);
    const [expired, setExpired] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(true);

    /*  Lists */
    const [orderList, setOrderList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [servicesList, setServiceList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [userListWithAdmin, setUserListWithAdmin] = useState([]);
    const [userPermissionList, setUserPermissionList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [billingList, setBillingList] = useState([]);
    const [billingTwilioList, setBillingTwilioList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [loyaltyList, setLoyaltyList] = useState([]);
    const [logoList, setLogoList] = useState([]);
    const [logsList, setLogsList] = useState([]);

    /*  Order */
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('New');
    const [order_no, setOrderNo] = useState('');

    /*  Event */
    const [openEvent, setOpenEvent] = useState(false);
    const [eventTitle, setEventTitle] = useState('New');
    const [eventId, setEventId] = useState(0);   
    
    /*  Customer */
    const [openCustomer, setOpenCustomer] = useState(false);
    const [openCustomerView, setOpenCustomerView] = useState(false);
    const [customerTitle, setCustomerTitle] = useState('New');
    const [customerId, setCustomerId] = useState(0);    

    /*  Service */
    const [openService, setOpenService] = useState(false);
    const [serviceTitle, setServiceTitle] = useState('New');
    const [serviceId, setServiceId] = useState(0);

    /*  user */
    const [openUser, setOpenUser] = useState(false);
    const [userTitle, setUserTitle] = useState('New');
    const [userId, setUserId] = useState(0);

    /*  schedule */
    const [openSchedule, setOpenSchedule] = useState(false);
    const [scheduleId, setScheduleId] = useState(0);
    const [scheduleTitle, setScheduleTitle] = useState("New");
    const [scheduleDate, setScheduleDate] = useState(LocalDate());
    const [scheduleUserId, setScheduleUserId] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    useEffect(() => {
        if (ranOnce.current) return;
        ranOnce.current = true;
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js")
                .then(registration => initNotification(registration, saveData, onNotification))
                .catch(console.error);
        };
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data?.type === 'DATA_REFRESH') {
                    setRefresh(refresh + 1);
                }
            });
        }
        Init();
    }, []);

    useEffect(() => {
        if (companyList.length !== 0) {
            setIsLoading(true)
            const checkPlan = checkPlanStatus(companyList.plan, companyList.createdat)
            setExpired(pathname === '/setting' ? false : checkPlan.expired)
            setIsSetupComplete(companyList.issetupcomplete);

            setIsLoading(false)
        }
        
    }, [companyList]);
    

    const Init = async () => {
        setIsLoading(true)
        const localStorage = await getStorage();
        setIsAdmin(localStorage.isAdmin)
        setUid(localStorage.uid)       
        await getOrder();
        await getEvent();
        await getCustomer();
        await getService();
        await getUser();
        await getUserPermission();
        await getUserListWithAdmin();
        await getSchedule();
        await getCompany();
        await getBilling();
        await getBillingTwilio();
        await getNotification();
        await getLoyalty();
        await getLogo();
        await getLogs();
        setIsLoading(false)
    }

    const getOrder = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: !localStorage.isAdmin ? 'orderPerUser' : 'order', //orderPerUser
            id: !localStorage.isAdmin ? localStorage.uid : null
        })
        setOrderList(response.data)
        return response.data;
    }

    const getEvent = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'event',
            eventDate: true
        })
        setEventList(response.data)
        return response.data;
    }

    const getCustomer = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'customer'
        })
        setCustomerList(response.data)
        return response.data;
    }
    const getService = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })
        setServiceList(response.data)
        return response.data;
    }
    const getUser = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: 'user',
            id: !localStorage.isAdmin ? localStorage.uid : null
        })
        setUserList(response.data)
        return response.data;
    }
    const getUserPermission = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: 'userpermission',
            id: localStorage.uid
        })
        setUserPermissionList(response.data)
        return response.data;
    }

    const getSchedule = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: !localStorage.isAdmin ? 'schedulePerUser' : 'schedule',//schedulePerUser
            id: !localStorage.isAdmin ? localStorage.uid : null
        })
        setScheduleList(response.data)
        return response.data;
    }
    const getCompany = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        setCompanyList(response.data)
        return response.data;
    }
    const getBilling = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'billing'
        })
        setBillingList(response.data)
        return response.data;
    }
    const getBillingTwilio = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'billing/twilio'
        })
        setBillingTwilioList(response.data)
        return response.data;
    }
    const getUserListWithAdmin = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'users'
        })
        setUserListWithAdmin(response.data)
        return response.data;
    }
    const getNotification = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: !localStorage.isAdmin ? 'notificationPerUser' : 'notification',//schedulePerUser
            id: !localStorage.isAdmin ? localStorage.uid : null
        })
        setNotificationList(response.data)
        return response.data;
    }
    const getLoyalty = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'loyalty'
        })
        setLoyaltyList(response.data)
        return response.data;
    }
    const getLogo = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'logo'
        })
        setLogoList(response.data)
        return response.data;
    }
    const getLogs = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'logs'
        })
        setLogsList(response.data)
        return response.data;
    }

    const onNotification = ({ title, description }) => {
        notifications({ title: `${title} Appointment`, description: description, cancel: title === 'Cancel' });
        setRefresh(refresh + 1);
    }

    const saveData = async ({ label, method, endPoint, id = null, body = null, notify = true, logs = true, email = false, status = null }) => {
        setIsLoading(true)
        const res = await SaveData({
            label: label,
            method: method,
            endPoint: endPoint,
            id: id,
            body: body
        })
        if (email)
            sendEmail({ id: res.data.id, status: status, userList, servicesList })

        setIsLoading(false)

        if (res.isSuccess) {
            notify && success(res.message);
            setRefresh(prev => prev + 1);
        }
        else
            notify && error(res.message)

        return res;
    }

    useEffect(() => {
        setTitle(id === 0 ? `New Appointment` : `Edit Appointment - ${order_no}`);
    }, [order_no])

    const btnSave = async () => {
        await ref.current?.save();
    }

    const editOrder = (id) => {
        setTitle(id === 0 ? `New Appointment` : `Edit Appointment - ${order_no}`);
        setReload(reload + 1);
        setId(id);
        setOpenEdit(true);
    }

    const viewOrder = (id) => {
        setReload(reload + 1);
        setId(id);
        setOpenView(true);
    }
    const editEvent = (id) => {
        setEventTitle((id === 0 ? `New Event` : `Edit Event`));
        setReload(reload + 1);
        setEventId(id);
        setOpenEvent(true);
    }   
    
    const editCustomer = (id) => {
        setCustomerTitle((id === 0 ? `New Customer` : `Edit Customer`));
        setReload(reload + 1);
        setCustomerId(id);
        setOpenCustomer(true);
    }   
       const viewCustomer  = (id) => {
        setReload(reload + 1);
        setCustomerId(id);
        setOpenCustomerView(true);
    }
    const editService = (id) => {
        setServiceTitle((id === 0 ? `New Service` : `Edit Service`));
        setReload(reload + 1);
        setServiceId(id);
        setOpenService(true);
    }

    const editUser = (id, customTitle = false) => {
        setUserTitle(customTitle ? "Account" : (id === 0 ? `New User` : `Edit User`));
        setReload(reload + 1);
        setUserId(id);
        setOpenUser(true);
    }
    const editSchedule = (id, date, scheduleUserId = '', customTitle = false) => {
        setScheduleDate(date);
        setScheduleTitle(customTitle ? "Schedule" : (id === 0 ? `New Schedule` : `Edit Schedule`));
        setScheduleUserId(scheduleUserId);
        setReload(reload + 1);
        setScheduleId(id);
        setOpenSchedule(true);
    }
    //"https://embed.tawk.to/69b8b3b92c788c1c3c2391e1/1jjsns31t";
    return (
        <div class='min-h-screen w-full flex flex-col  '>
            <NetworkBanner/>
            <Header
                saveData={saveData}
                refresh={refresh}
                setRefresh={setRefresh}
                orderList={orderList}
                notificationList={notificationList}
                getNotification={getNotification}
                getUserListWithAdmin={getUserListWithAdmin}
                servicesList={servicesList}
                editOrder={editOrder}
                viewOrder={viewOrder}
                getOrder={getOrder}
                editUser={editUser}
                editEvent={editEvent}
                editCustomer={editCustomer}
                editService={editService}
                editSchedule={editSchedule}
                uid={uid} />

            <main class="flex-1 p-3 md:px-8 scroll-auto">
                <Outlet context={{
                    saveData, refresh, setRefresh,
                    isLoading, setIsLoading,
                    orderList, getOrder,
                    eventList, getEvent,
                    customerList, setCustomerList, getCustomer,
                    servicesList, setServiceList, getService,
                    userList, getUser,
                    userPermissionList, getUserPermission,
                    userListWithAdmin, getUserListWithAdmin,
                    scheduleList, getSchedule,
                    companyList, getCompany,
                    logsList, getLogs,
                    billingList, setBillingList, getBilling,
                    billingTwilioList,getBillingTwilio,
                    loyaltyList, setLoyaltyList, getLoyalty,
                    viewOrder, editOrder,editEvent, editCustomer, viewCustomer, editService, editUser, editSchedule,
                    isAdmin, uid
                }} />
            </main>

            {pathname !== '/home' && <Footer />}

            {isLoading &&
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
            }

            {/* Drawer on Add/ Edit order*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpenEdit(false)} open={openEdit}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <OrderDetail id={id} refresh={reload} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} scheduleList={scheduleList} loyaltyList={loyaltyList} saveData={saveData} setOpen={setOpenEdit} isAdmin={isAdmin} uid={uid} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={reload} servicesList={servicesList} userList={userList} customerList={customerList} loyaltyList={loyaltyList} setOpenView={setOpenView} saveData={saveData} />
            </Drawer>

             {/* Drawer on event edit*/}
            <Drawer title={eventTitle} placement='right' width={500} onClose={() => setOpenEvent(false)} open={openEvent}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                 <EventDetail id={eventId} refresh={reload} ref={ref} eventList={eventList} servicesList={servicesList} saveData={saveData} setOpen={setOpenEvent} />
            </Drawer>
            
            {/* Drawer on customer edit*/}
            <Drawer title={customerTitle} placement='right' width={500} onClose={() => setOpenCustomer(false)} open={openCustomer}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <CustomerDetail id={customerId} refresh={reload} ref={ref} saveData={saveData} customerList={customerList} setOpen={setOpenCustomer} />
            </Drawer>

            {/* Drawer on customer view*/}
             <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenCustomerView(false)} open={openCustomerView}>
                <CustomerView id={customerId} refresh={reload} orderList={orderList} servicesList={servicesList} userList={userList} customerList={customerList} loyaltyList={loyaltyList} setOpenView={setOpenCustomerView} saveData={saveData} viewOrder={viewOrder} editOrder={editOrder} />
            </Drawer>

             {/* Drawer on service edit*/}
            <Drawer title={serviceTitle} placement='right' width={500} onClose={() => setOpenService(false)} open={openService}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <ServiceDetail id={serviceId} refresh={reload} ref={ref} servicesList={servicesList} saveData={saveData} setOpen={setOpenService} />
             </Drawer>

            {/* Drawer on user edit*/}
            <Drawer title={userTitle} placement='right' width={500} onClose={() => setOpenUser(false)} open={openUser}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <UserDetail id={userId} refresh={reload} ref={ref} companyList={companyList} saveData={saveData} setOpen={setOpenUser} isAdmin={isAdmin} adminEmail={userId === uid && isAdmin} />
            </Drawer>

            {/* Drawer on schedule edit*/}
            <Drawer title={scheduleTitle} placement='right' width={500} onClose={() => setOpenSchedule(false)} open={openSchedule}
                extra={
                    <Space>
                        <Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button>
                        {scheduleId !== 0 && <Tooltip placement="top" title={'Delete'} >
                            <Popconfirm
                                title="Delete "
                                description="Are you sure to delete?"
                                onConfirm={(e) => {
                                    saveData({
                                        label: "Schedule",
                                        method: 'DELETE',
                                        endPoint: "schedule",
                                        id: scheduleId,
                                        body: []
                                    }); setOpenSchedule(false);
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger variant="outlined" icon={<DeleteOutlined />} > Delete</Button>
                            </Popconfirm>
                        </Tooltip>}
                    </Space>}>
                <ScheduleDetail id={scheduleId} refresh={reload} ref={ref} date={scheduleDate} scheduleList={scheduleList} userList={userList} userId={!isAdmin ? uid : scheduleUserId} saveData={saveData} setOpen={setOpenSchedule} isAdmin={isAdmin} />
            </Drawer>

            <Modal
                open={expired}
                closable={false}
                maskClosable={false}
                keyboard={false}
                footer={[
                    isAdmin && <Button
                        type="primary"
                        key="upgrade"
                        onClick={() => navigate('/setting?tab=2#plans')}
                    >
                        Upgrade Plan
                    </Button>
                ]}
            >
                <div className="text-center py-6">

                    <h2 className="text-xl font-semibold mb-2">
                        Your app free trial has ended !
                    </h2>

                    <p className="text-gray-500 mt-4">
                        Your free trial of {process.env.REACT_APP_PROJECT_NAME} has ended. To keep using this app, Administrator must choose a subsciption plan that works for your team.
                    </p>

                </div>
            </Modal>

             <Modal
                open={!isSetupComplete && isAdmin}
                width={'90%'}
                closable={false}
                maskClosable={false}
                keyboard={false}
                footer={[]}
            >
                <IsSetupComplete companyList={companyList} loyaltyList={loyaltyList} saveData={saveData} logoList={logoList}  setIsSetupComplete={setIsSetupComplete} getCompany={getCompany}/>
            </Modal>

           

            {contextHolder}
        </div>
    );
};

export default ProtectedLayout;