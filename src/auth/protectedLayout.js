/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/HomePage/header";
import useAlert from "../common/alert";
import SaveData from "../hook/saveData";
import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Popconfirm, Space, Spin, Tooltip } from "antd";
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

const ProtectedLayout = () => {
    const ranOnce = useRef(false);
    const ref = useRef();
    const { pathname } = useLocation();
    const { contextHolder, success, error, notifications } = useAlert();
    const { sendEmail } = useEmail()
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const [refresh, setRefresh] = useState(0); 
    const [isAdmin, setIsAdmin] = useState(false);
    const [uid, setUid] = useState(0);

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
    const [notificationList, setNotificationList] = useState([]); 

    /*  Order */
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('New');
    const [order_no, setOrderNo] = useState('');

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
        Init();
    }, []);

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
        await getNotification();
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

    const onNotification = ({ title, description }) => {
        setRefresh(refresh + 1);
        notifications({ title: `${title} Appointment`, description: description, cancel: title === 'Cancel' })
    }

    const saveData = async ({ label, method, endPoint, id = null, body = null, notify = true, logs = true, email = false, status = null, userList = [], servicesList = [] }) => {
        setIsLoading(true)
        const res = await SaveData({
            label: label,
            method: method,
            endPoint: endPoint,
            id: id,
            body: body
        })
        if (email)
            sendEmail({ id: id, status: status, userList: userList, servicesList: servicesList })
        setIsLoading(false)

        if (res.isSuccess) {
            notify && success(res.message);
            setRefresh(refresh + 1);
        }
        else
            notify && error(res.message)
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
        setReload(reload +1);
        setId(id);
        setOpenView(true);
    }

    const editUser = (id,customTitle=false) => {
        setUserTitle(customTitle? "Account" : (id === 0 ? `New User` : `Edit User`) );
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
    return (
        <div class='min-h-screen w-full flex flex-col  '>
            <Header
                saveData={saveData}
                refresh={refresh}
                setRefresh={setRefresh}
                notificationList={notificationList}
                getNotification={getNotification}
                getUserListWithAdmin={getUserListWithAdmin}
                servicesList={servicesList}
                viewOrder={viewOrder}
                editUser={editUser}
                uid={uid} />

            <main class="flex-1 px-2 md:px-8 scroll-auto">
                <Outlet context={{
                    saveData, refresh,
                    isLoading, setIsLoading,
                    orderList, getOrder,
                    eventList, getEvent,
                    customerList,setCustomerList, getCustomer,
                    servicesList, setServiceList, getService,
                    userList, getUser,
                    userPermissionList, getUserPermission,
                    scheduleList, getSchedule,
                    companyList, getCompany,
                    viewOrder, editOrder, editUser, editSchedule,
                    isAdmin,uid
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

            {/* Drawer on Add/ Edit*/}
            <Drawer title={title} placement='right' width={600} onClose={() => setOpenEdit(false)} open={openEdit}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <OrderDetail id={id} refresh={reload} ref={ref} setOrderNo={setOrderNo} orderList={orderList} servicesList={servicesList} userList={userList} companyList={companyList} eventList={eventList} customerList={customerList} scheduleList={scheduleList} saveData={saveData} setOpen={setOpenEdit} isAdmin={isAdmin} uid={uid} />
            </Drawer>

            {/* Drawer on View*/}
            <Drawer title={""} placement='bottom' height={'90%'} style={{ backgroundColor: '#F9FAFB' }} onClose={() => setOpenView(false)} open={openView}>
                <OrderView id={id} refresh={reload} servicesList={servicesList} userList={userList} setOpenView={setOpenView} saveData={saveData} />
            </Drawer>

            {/* Drawer on user edit*/}
            <Drawer title={userTitle} placement='right' width={500} onClose={() => setOpenUser(false)} open={openUser}
                extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
                <UserDetail id={userId} refresh={reload} ref={ref} userList={userListWithAdmin} userPermissionList={userPermissionList} companyList={companyList} saveData={saveData} setOpen={setOpenUser} isAdmin={isAdmin} adminEmail={userId === uid && isAdmin} />
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
                                onConfirm={(e) => {saveData({
                                    label: "Schedule",
                                    method: 'DELETE',
                                    endPoint: "schedule",
                                    id: scheduleId,
                                    body: []
                                }); setOpenSchedule(false); }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger variant="outlined" icon={<DeleteOutlined />} > Delete</Button>
                            </Popconfirm>
                        </Tooltip>}
                    </Space>}>
                <ScheduleDetail id={scheduleId} refresh={reload} ref={ref} date={scheduleDate} scheduleList={scheduleList} userList={userList} userId={!isAdmin ? uid:scheduleUserId} saveData={saveData} setOpen={setOpenSchedule} isAdmin={isAdmin} />
            </Drawer>

            {contextHolder}
        </div>
    );
};

export default ProtectedLayout;