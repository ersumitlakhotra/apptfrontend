/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Avatar,  Button,  Image,  Rate, Tabs } from "antd";
import { CloudUploadOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import UserAbout from "./about.js";
import useAlert from "../../common/alert.js";
import UserLoginPermissions from "./permissions.js";
import ScheduleN from "./scheduleN.js";

function getTabItems(key, label, icon, children) {
    return {key,label,children,icon,};
}
const UserDetail = ({ id, refresh, ref, userList, userPermissionList, companyList, saveData, setOpen, isAdmin,adminEmail =false }) => {
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [fullname, setFullname] = useState('');
    const [cell, setCell] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Male');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [rating, setRating] = useState(0);
    const [accounttype, setAccountType] = useState('Basic');
    const [profilepic, setProfile] = useState(null);
    const [appschedule, setAppSchedule] = useState(true);
    const [status, setStatus] = useState('Active');


    const [dashboard, setDashboard] = useState(false);
    const [order, setOrder] = useState(false);
    const [tasks, setTasks] = useState(false);
    const [event, setEvent] = useState(false);
    const [payment, setPayment] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [services, setServices] = useState(false);
    const [users, setUsers] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [sales, setSales] = useState(false);
    const [collection, setCollection] = useState(false);
    const [setting, setSetting] = useState(false);

    const [monday, setMonday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [tuesday, setTuesday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [wednesday, setWednesday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [thursday, setThursday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [friday, setFriday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [saturday, setSaturday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);
    const [sunday, setSunday] = useState(['09:00:00', '21:00:00', true, '14:00:00', '14:30:00']);

    const { contextHolder, error, warning } = useAlert();
    let refimage=useRef();

    useEffect(() => {
        setTabActiveKey("1"); 
        if (id === 0) {
            setFullname('');
            setCell(''); setEmail(''); setAddress('');
            setUsername(''); 
            setPassword(''); setRole('Employee'); setRating(0);
            setAccountType('Basic'); setProfile(null);
            setGender('Male'); setStatus('Active');setAppSchedule(true);

            setOrder(false); setTasks(false); setEvent(false);setCustomer(false); setServices(false); setUsers(false); setSchedule(false); setSetting(false); 
            
            if (companyList.timinginfo !== null) {
                setMonday([...companyList.timinginfo[0].monday,'14:00:00', '14:30:00']);
                setTuesday([...companyList.timinginfo[0].tuesday, '14:00:00', '14:30:00']);
                setWednesday([...companyList.timinginfo[0].wednesday, '14:00:00', '14:30:00']);
                setThursday([...companyList.timinginfo[0].thursday, '14:00:00', '14:30:00']);
                setFriday([...companyList.timinginfo[0].friday, '14:00:00', '14:30:00']);
                setSaturday([...companyList.timinginfo[0].saturday, '14:00:00', '14:30:00']);
                setSunday([...companyList.timinginfo[0].sunday, '14:00:00', '14:30:00']);
            }  
        }
        else {
            const editList = userList.find(item => item.id === id)
            setFullname(editList.fullname);
            setCell(editList.cell);
            setEmail(editList.email);
            setAddress(editList.address);
            setGender(editList.gender);
            setUsername(editList.username);
            setPassword(editList.password);
            setRole(editList.role);
            setRating(editList.rating);
            setAccountType(editList.accounttype);
            setProfile(editList.profilepic);
            setStatus(editList.status);
            setAppSchedule(Boolean(editList.appschedule));

            userPermissionList.map(b => {
                setDashboard(b.dashboard);
                setTasks(b.tasks);
                setOrder(b.order);
                setEvent(b.event);
                setPayment(b.payment);

                setCustomer(b.customer);
                setServices(b.services);
                setUsers(b.users);
                setSchedule(b.schedule)

                setSales(b.sales);
                setCollection(b.collection);
                setSetting(b.setting);
            })
            if (editList.timinginfo !== null) {
                setMonday(editList.timinginfo[0].monday);
                setTuesday(editList.timinginfo[0].tuesday);
                setWednesday(editList.timinginfo[0].wednesday);
                setThursday(editList.timinginfo[0].thursday);
                setFriday(editList.timinginfo[0].friday);
                setSaturday(editList.timinginfo[0].saturday);
                setSunday(editList.timinginfo[0].sunday);
            }  


        }
    }, [refresh])

    useEffect(() => {
        if (role === 'Employee')
        {
            setOrder(true); setTasks(true); setEvent(false); setCustomer(false); setServices(false); setUsers(false); setSchedule(true); setSetting(false);
        }
        else if (role === 'User' && id === 0 )
        {
            setOrder(true); setTasks(true); setEvent(false); setCustomer(false); setServices(false); setUsers(false); setSchedule(true); setSetting(false);
        }
        else if (role === 'User' && id !== 0)
        {
            userPermissionList.filter(a => a.uid === id).map(b => {
                setDashboard(b.dashboard);
                setTasks(b.tasks);
                setOrder(b.order);
                setEvent(b.event);
                setPayment(b.payment);

                setCustomer(b.customer);
                setServices(b.services);
                setUsers(b.users);
                setSchedule(b.schedule)

                setSales(b.sales);
                setCollection(b.collection);
                setSetting(b.setting);
            })
        }

    },[role])
  
    
    const save = async () => {
        if (fullname !== '' &&  password !== ''  && cell.length === 12 && cell !== '' ) {
            const Body = JSON.stringify({
                fullname: fullname,
                cell: cell,
                email: email,
                username: cell.replace(/\D/g, ""),
                address: address,
                gender: gender,
                password: password,
                role: role,
                rating: rating,
                appschedule: appschedule,
                status: status,
                accounttype: accounttype,
                profilepic: profilepic,
                dashboard: dashboard,
                tasks: tasks,
                order: order,
                event: event,
                payment: payment,
                customer: customer,
                services: services,
                users: users,
                schedule: schedule,
                sales: sales,
                collection:collection,
                setting: setting,
                timinginfo: [{
                    monday: monday,
                    tuesday: tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday,
                    saturday: saturday,
                    sunday: sunday,
                }]
            }); 
            saveData({
                label: "Users",
                method: id !== 0 ? 'PUT' : 'POST',
                endPoint: "user",
                id: id !== 0 ? id : null,
                body: Body
            });
            setOpen(false);
        }
        else{
           // if (!isValidEmail(email))
               // warning('Please, fill out the valid email address !');
            //else
            warning('Please, fill out the required fields !');
        }
    }
    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })
    const tabItems = [
        getTabItems('1', 'About', <UserOutlined />, <UserAbout 
            fullname={fullname}
            setFullname={setFullname}
            cell={cell}
            setCell={setCell}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            gender={gender}
            setGender={setGender} 
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            appschedule={appschedule}
            setAppSchedule={setAppSchedule}
            isAdmin={isAdmin}
            adminEmail={adminEmail}
            />),
        ((role === 'User' && isAdmin) && 
        getTabItems('2', 'Permissions', <EyeOutlined />, <UserLoginPermissions
            dashboard={dashboard}
            setDashboard={setDashboard}
            tasks={tasks}
            setTasks={setTasks}
            order={order}
            setOrder={setOrder}
            event={event}
            setEvent={setEvent}
            payment={payment}
            setPayment={setPayment}
            customer={customer}
            setCustomer={setCustomer}
            services={services}
            setServices={setServices}
            users={users}
            setUsers={setUsers}
            schedule={schedule}
            setSchedule={setSchedule}
            sales={sales}
            setSales={setSales}
            collection={collection}
            setCollection={setCollection}
            setting={setting}
            setSetting={setSetting}
        />)),
        getTabItems('3', 'Schedule', <UserOutlined />, <ScheduleN
            monday={monday}
            setMonday={setMonday}
            tuesday={tuesday}
            setTuesday={setTuesday}
            wednesday={wednesday}
            setWednesday={setWednesday}
            thursday={thursday}
            setThursday={setThursday}
            friday={friday}
            setFriday={setFriday}
            saturday={saturday}
            setSaturday={setSaturday}
            sunday={sunday}
            setSunday={setSunday}
           
        />),
    ];
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Access the first selected file
        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJpgOrPng) {
                error('You can only upload JPG/PNG file!');
            }
            else if (!isLt2M) {
                error('Image must smaller than 2MB!');
            }
            else {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // reader.result will contain the data URL (e.g., data:image/jpeg;base64,...)
                    const base64String = reader.result;
                    setProfile(base64String);                  
                };

                reader.onerror = (error) => {
                    error("Error reading file:", error);
                };

                reader.readAsDataURL(file);
            }
        }
    };
    return (
        <div class='p-2'>
            <div class='w-full flex mb-6'>     
                <div class='flex flex-col gap-2'>
                    {profilepic !== null ?
                        <Image width={128} height={128} src={profilepic} style={{ borderRadius: 10 }} /> :
                        <Avatar shape="square" size={128} style={{ backgroundColor: '#f9fafb', border: 'solid', width: 120, height: 120 }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }
                    <Button type="primary" shape="default" icon={<CloudUploadOutlined />} size={24} style={{ width: '100px' }} onClick={() => {
                        refimage.current.click();
                    }}>Change</Button>
                    <input type="file" ref={refimage} style={{ display: 'none' }} onChange={handleFileChange} />
                    <p class='text-gray-400 text-xs'>Allowed *.jpeg, *.jpg, *.png</p>
                </div>
                <div class='flex flex-col'>
                    <p class='text-2xl font-semibold text-gray-600'>{fullname}</p>
                    <p class="font-normal text-blue-500 ">{userList.role}</p>
                    <p class="font-normal text-gray-400 mt-5 mb-2">Rating</p>
                    <Rate disabled value={userList.rating} />
                    
                </div>
            </div>

            <Tabs
                defaultActiveKey="1"
                items={tabItems}  
                activeKey={tabActiveKey}
                onChange={(e) => { setTabActiveKey(e)}}
            />
            {contextHolder}
        </div>
    )
}

export default UserDetail;