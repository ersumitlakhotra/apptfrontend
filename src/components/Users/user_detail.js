/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Avatar,  Button,  Image,  Rate, Tabs } from "antd";
import { CloudUploadOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import UserAbout from "./about.js";
import useAlert from "../../common/alert.js";
import UserLoginPermissions from "./permissions.js";

function getTabItems(key, label, icon, children) {
    return {key,label,children,icon,};
}
const UserDetail = ({ id, refresh, ref, userList,  saveData ,setOpen}) => {
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
    const [status, setStatus] = useState('Active');


    const [dashboard, setDashboard] = useState(false);
    const [tasks, setTasks] = useState(false);
    const [order, setOrder] = useState(false);
    const [event, setEvent] = useState(false);
    const [payment, setPayment] = useState(false);
    const [services, setServices] = useState(false);
    const [users, setUsers] = useState(false);
    const [sales, setSales] = useState(false);
    const [setting, setSetting] = useState(false);

    const { contextHolder, error, warning } = useAlert();
    let refimage=useRef();

    useEffect(() => {
        if (id === 0) {
            setFullname('');
            setCell(''); setEmail(''); setAddress('');
            setUsername(''); setPassword(''); setRole('Employee'); setRating(0); 
           setAccountType('Basic'); setProfile(null);
            setGender('Male'); setStatus('Active'); setTabActiveKey("1"); 
            setDashboard(false); setTasks(false); setOrder(false); setEvent(false); setPayment(false);
            setServices(false); setUsers(false); setSales(false); setSetting(false); 
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
            setProfile(editList.profilepic)
            setStatus(editList.status);
            if (editList.permissioninfo !== null) {
                setDashboard(editList.permissioninfo[0].dashboard);
                setTasks(editList.permissioninfo[0].tasks);
                setOrder(editList.permissioninfo[0].order);
                setEvent(editList.permissioninfo[0].event);
                setPayment(editList.permissioninfo[0].payment);
                setServices(editList.permissioninfo[0].services);
                setUsers(editList.permissioninfo[0].users);
                setSales(editList.permissioninfo[0].sales);
                setSetting(editList.permissioninfo[0].setting);
            }
            else { setDashboard(false); setTasks(false); setOrder(false); setEvent(false); setPayment(false); 
                setServices(false); setUsers(false); setSales(false); setSetting(false); }
        }
    }, [refresh])

    function getPermission (){
        if (role === 'Employee') {
            return [{
                dashboard: false,
                tasks: false,
                order: false,
                event: false,
                payment: false,
                services: false,
                users: false,
                sales: false,
                setting: false,
            }]
        } if (role === 'Administrator') {
            return [{
                dashboard: true,
                tasks: true,
                order: true,
                event: true,
                payment: true,
                services: true,
                users: true,
                sales: true,
                setting: true,
            }]
        }  
        if (role === 'User') {
            return [{
                dashboard: dashboard,
                tasks: tasks,
                order: order,
                event: event,
                payment: payment,
                services: services,
                users: users,
                sales: sales,
                setting: setting,
            }]
        }
    }
    const save = async () => {
        if (fullname !== '' && password !== '') {
            const Body = JSON.stringify({
                fullname: fullname,
                cell: cell,
                email: email,
                address: address,
                gender: gender,
                password: password,
                role: role,
                rating: rating,
                permissioninfo: getPermission(),
                status: status,
                accounttype: accounttype,
                profilepic: profilepic
            }); 
            saveData("Users", id !== 0 ? 'PUT' : 'POST', "user", id !== 0 ? id : null, Body);
            setOpen(false);
        }
        else{
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
            setGender={setGender} username={username}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            />),
            (role === 'User' &&
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
            services={services}
            setServices={setServices}
            users={users}
            setUsers={setUsers}
            sales={sales}
            setSales={setSales}
            setting={setting}
            setSetting={setSetting}
        />))
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