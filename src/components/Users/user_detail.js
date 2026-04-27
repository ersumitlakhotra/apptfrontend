/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Avatar, Button, Image, Rate, Tabs } from "antd";
import { CloudUploadOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import UserAbout from "./about.js";
import useAlert from "../../common/alert.js";
import UserLoginPermissions from "./permissions.js";
import ScheduleN from "./scheduleN.js";
import FetchData from "../../hook/fetchData.js";
import IsLoading from "../../common/custom/isLoading.js";
import { getStorage } from "../../common/localStorage.js";
import { getExtension } from "../../common/general.js";

function getTabItems(key, label, icon, children) {
    return { key, label, children, icon, };
}
const UserDetail = ({ id, refresh, ref, companyList, saveData, setOpen, isAdmin, adminEmail = false }) => {
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [fullname, setFullname] = useState('');
    const [cell, setCell] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [rating, setRating] = useState(0);
    const [accounttype, setAccountType] = useState('Basic');
    const [profilepic, setProfile] = useState(null);
    const [appschedule, setAppSchedule] = useState(true);
    const [status, setStatus] = useState('Active');
    const [isLoading, setIsLoading] = useState(false);

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

    
    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileType, setFileType] = useState('');


    const { contextHolder, error, warning } = useAlert();
    let refimage = useRef();

    useEffect(() => {
        setTabActiveKey("1");
        if (id === 0) {
            setFullname('');
            setCell(''); setEmail(''); setAddress('');
            setPassword(''); setRole('Employee'); setRating(0);
            setAccountType('Basic'); setProfile(null);
            setGender('Male'); setStatus('Active'); setAppSchedule(true);

            setOrder(false); setTasks(false); setEvent(false); setCustomer(false); setServices(false); setUsers(false); setSchedule(false); setSetting(false); setSales(false);

            if (companyList.timinginfo !== null) {
                setMonday([...companyList.timinginfo[0].monday, '14:00:00', '14:30:00']);
                setTuesday([...companyList.timinginfo[0].tuesday, '14:00:00', '14:30:00']);
                setWednesday([...companyList.timinginfo[0].wednesday, '14:00:00', '14:30:00']);
                setThursday([...companyList.timinginfo[0].thursday, '14:00:00', '14:30:00']);
                setFriday([...companyList.timinginfo[0].friday, '14:00:00', '14:30:00']);
                setSaturday([...companyList.timinginfo[0].saturday, '14:00:00', '14:30:00']);
                setSunday([...companyList.timinginfo[0].sunday, '14:00:00', '14:30:00']);
            }
        }
        else {
            load();
        }
       setFileType('');setFileToUpload(null);
    }, [refresh])

    const load = async () => {

        setIsLoading(true)
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user', //
            id: id
        })

        const editList = userResponse.data[0];
        setFullname(editList.fullname);
        setCell(editList.cell);
        setEmail(editList.email);
        setAddress(editList.address);
        setGender(editList.gender);
        setPassword(editList.password);
        setRole(editList.role);
        onRoleChange(editList.role);
        setRating(editList.rating);
        setAccountType(editList.accounttype);
        setProfile(editList.profilepic);
        setStatus(editList.status);
        setAppSchedule(Boolean(editList.appschedule));

        if (editList.timinginfo !== null) {
            setMonday(editList.timinginfo[0].monday);
            setTuesday(editList.timinginfo[0].tuesday);
            setWednesday(editList.timinginfo[0].wednesday);
            setThursday(editList.timinginfo[0].thursday);
            setFriday(editList.timinginfo[0].friday);
            setSaturday(editList.timinginfo[0].saturday);
            setSunday(editList.timinginfo[0].sunday);
        }

        setIsLoading(false)
    }
    
    const onRoleChange = async (role) => {
        if (role === 'User' && id === 0) {
            setDashboard(false); setOrder(true); setTasks(true); setEvent(false); setPayment(false); setCustomer(false); setServices(false); setUsers(false); setSchedule(true); setSales(false); setCollection(false); setSetting(false);
        }
        else if (role === 'User' && id !== 0) {
            setIsLoading(true);
            const userPermissionResponse = await FetchData({
                method: 'GET',
                endPoint: 'userpermission',
                id: id
            })
            userPermissionResponse.data.map(b => {
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
            setIsLoading(false)

        }

    }

    const uploadToS3 =async(Id) => {
         const Body = JSON.stringify({
            folder:"user",
            name:`${Id}.${getExtension(fileToUpload.name)}`,
            type:fileType
         })
        const response = await FetchData({
            method: 'POST',
            endPoint: 'uploadtos3',
            body:Body
        })
        const url = response.data.url;
        const success = response.data.success;
        const path = response.data.path;
        const message = response.data.message;
        if(Boolean(success))
        {
           const result= await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": fileType,
                },
                body: fileToUpload, 
            });
            if (result.ok)
                return `${process.env.REACT_APP_AWS_BUCKET_URL}${path}`;

            if (!result.ok) {
               error(`Upload failed with error ${message}`);
            }
        }
        return '';
    }

    const save = async () => {
        if (fullname !== '' && password !== '' && cell.length === 12 && cell !== '') {
            const Body = JSON.stringify({
                fullname: fullname,
                cell: cell,
                email: email,
                username: adminEmail ? email : cell.replace(/\D/g, ""),
                address: address,
                gender: gender,
                password: password,
                role: role,
                rating: rating,
                appschedule: appschedule,
                status: status,
                accounttype: accounttype,
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
                collection: collection,
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
            const res=await saveData({
                label: "Users",
                method: id !== 0 ? 'PUT' : 'POST',
                endPoint: "user",
                id: id !== 0 ? id : null,
                body: Body
            });

            if (fileToUpload !== null) {
                const Id=res.data.id;
                const path = await uploadToS3(Id);
                const ProfilePicBody = JSON.stringify({
                    id: Id,
                    profilepic: path
                });
                await saveData({
                    label: "Users",
                    method: 'POST',
                    endPoint: "user/profile",
                    id: null,
                    body: ProfilePicBody,
                    notify: false
                });
            }

            setOpen(false);
        }
        else {
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
            onRoleChange={onRoleChange}
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
            const isLt2M = file.size / 1024 / 1024 < 4;
            if (!isJpgOrPng) {
                error('You can only upload JPG/PNG file!');
            }
            else if (!isLt2M) {
                error('Image must smaller than 4MB!');
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

                setFileToUpload(file);
                setFileType(file.type);
            }
        }
    };
    return (
        <div class='p-2'>
            <IsLoading isLoading={isLoading} rows={20} input={<>
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
                        <p class="font-normal text-blue-500 ">{role}</p>
                        <p class="font-normal text-gray-400 mt-5 mb-2">Rating</p>
                        <Rate disabled value={rating} />

                    </div>
                </div>

                <Tabs
                    defaultActiveKey="1"
                    items={tabItems}
                    activeKey={tabActiveKey}
                    onChange={(e) => { setTabActiveKey(e) }}
                />
            </>
            } />
            {contextHolder}
        </div>
    )
}

export default UserDetail;