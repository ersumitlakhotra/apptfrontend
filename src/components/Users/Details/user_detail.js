
import { useEffect, useState } from "react";
import { apiCalls } from "../../../hook/apiCall";
import { Avatar, Rate, Tabs } from "antd";
import {EyeOutlined, UserOutlined } from '@ant-design/icons';
import UserAbout from "./Tabs/about.js";
import UserLoginDetail from "./Tabs/detail.js";

function getTabItems( key,label,icon,children) {
    return {
      key,
      label,
      children,
      icon,   
    };
  }
const UserDetail=({id,reload}) => {
    const [userList, setUserList] = useState([]);
    

    useEffect(() => {  
        getData();    
    },[reload]);

    const getData = async() => {
        if(id !== 0)
        {
            const res= await apiCalls('GET','user',id,null);
            setUserList(res.data.data);
        }
        else
            setUserList([]);
    }

    const tabItems =[ 
        getTabItems('1','About',<UserOutlined/>,<UserAbout userList={userList}/>), 
        getTabItems('2','Detail',<EyeOutlined/>,<UserLoginDetail/>), 
      ];
   
    return(
        <div class='p-2'>
            <div class='w-full flex gap-4 mb-6'>
                {userList.profilepic === null ?
                    <Avatar shape="square" size={128} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{(userList.fullname).charAt(0)}</Avatar>:    
                    <Avatar shape="square" size={128} src={userList.profilepic} />
                }
                <div class='flex flex-col'>
                    <p class='text-2xl font-semibold text-gray-600'>{userList.fullname}</p>
                    <p class="font-normal text-blue-500 ">{userList.role}</p>
                    <p class="font-normal text-gray-400 mt-5 mb-2">Rating</p>
                    <Rate disabled value={userList.rating} />
                    
                </div>
            </div>

            <Tabs
                defaultActiveKey="1"
                items={tabItems}
            />

        </div>
    )
}

export default UserDetail;