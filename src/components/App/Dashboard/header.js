

import {LogoutOutlined,UserOutlined} from '@ant-design/icons';

import { Avatar, Image } from 'antd';

const Header = () => {
    const profilepic = null;
    return(
        <div class='w-full flex flex-row items-center justify-between '>
            <div class='flex flex-row gap-3 items-center'>
                {profilepic !== null ?
                    <Image width={50} height={50} src={''} style={{ borderRadius: 24 }} /> :
                    <Avatar size={50} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                }
                <div class='flex flex-col'>
                    <p class="font-semibold">Hi, Sumit Kumar</p>
                    <p class="text-xs italic text-gray-600">Welcome Back</p>

                </div>
            </div>
            <LogoutOutlined style={{color:'red', cursor:'pointer'}} />
        </div>
    )
}

export default Header;