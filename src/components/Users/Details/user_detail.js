
import { useEffect, useImperativeHandle, useState } from "react";
import { apiCalls } from "../../../hook/apiCall";
import { Avatar, message, Rate, Tabs } from "antd";
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import UserAbout from "./Tabs/about.js";
import UserLoginDetail from "./Tabs/detail.js";

function getTabItems(key, label, icon, children) {
    return {key,label,children,icon,};
}
const UserDetail = ({ id, reload, ref }) => {
    const emptyData={
        "username": "",
        "password": "",
        "role": "",
        "permission": "",
        "status": "Active",
        "profilepic": null,
        "email": "",
        "cell": "",
        "rating": "0",
        "fullname": "",
        "accounttype": "Basic"
    }
    const [userList, setUserList] = useState(emptyData);

    const [tabActiveKey, setTabActiveKey] = useState("1");

    const [fullname, setFullname] = useState('');
    const [cell, setCell] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Active');

    useEffect(() => {
        setTabActiveKey("1");
        getData();
    }, [reload]);

    const getData = async () => {     
        if (id !== 0) {
            const res = await apiCalls('GET', 'user', id, null);
            setUserList(res.data.data);
        }
        else
            setUserList(emptyData);
    }
    const btnSave_Click = async () =>
    {
         try{
                const Body= JSON.stringify( {
                  username:email,
                  password:password,
                  role:role,
                  permission:'YYYYYYYYYYYYYYYYYYYY',
                  email:email,
                  cell:cell,
                  rating:'0',
                  status:status,
                  accounttype:'Basic',
                  fullname:fullname
                }); 
             if (id !== 0) {
                 return await apiCalls('PUT', 'user', id, Body);      
             }       
             else
                 return await apiCalls('POST', 'user', null, Body);         
              }catch(error){
             return JSON.stringify({
                status:500,
                message:error.message
             });
             console.log(error)
              }
    }

    useImperativeHandle(ref, () => {
        return {
            btnSave_Click,
        };
    })
    const tabItems = [
        getTabItems('1', 'About', <UserOutlined />, <UserAbout 
            userList={userList} 
            id={id}
            FullName={(e) => setFullname(e)}
            Cell={(e) => setCell(e)}
            Email={(e) => setEmail(e)}
            Address={(e) => setAddress(e)}
            Birthday={(e) => setBirthday(e)}
            Gender={(e) => setGender(e)} 
            />),
        getTabItems('2', 'Detail', <EyeOutlined />, <UserLoginDetail 
            userList={userList}
            id={id}
            Username={(e) => setUsername(e)}
            Password={(e) => setPassword(e)}
            Role={(e) => setRole(e)}
            Status={(e) => setStatus(e)}
        />),
    ];

    return (
        <div class='p-2'>
            <div class='w-full flex gap-4 mb-6'>
                {userList.profilepic === null ?
                    <Avatar shape="square" size={128} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{(userList.fullname).charAt(0)}</Avatar> :
                    <Avatar shape="square" size={128} src={userList.profilepic} />
                }
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

        </div>
    )
}

export default UserDetail;