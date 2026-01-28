
import Search from '../../common/custom/search'
import logo from '../../Images/logo.png'
import { SlEarphonesAlt } from "react-icons/sl";
import { Badge, Drawer, Dropdown, Space } from 'antd';
import { BellFilled, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AssignedTo from '../../common/assigned_to';
import FetchData from '../../hook/fetchData';
import NotificationDetail from '../../components/Main/Notification/notification_detail';
import { getStorage } from '../../common/localStorage';
import { useAuth } from '../../auth/authContext';

function getItem(key, label, icon, extra, disabled, danger) {
    return {
        key,
        label,
        icon,
        extra,
        disabled,
        danger,
    };
}
const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [search, setSearch] = useState('');
    const [uid, setUid] = useState(0);
    const [fullname, setFullname] = useState('');
    const [cell, setCell] = useState('');
    const [userList, setUserList] = useState([]);
    const [unread, setUnread] = useState([])
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        const localStorage = await getStorage();
       

        const notificationResponse = await FetchData({
            method: 'GET',
            endPoint: 'notification'
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'users'
        })
        setUid(localStorage.uid);
        const userFind=userResponse.data.find(item => item.id ===localStorage.uid);
        setFullname(userFind.fullname)
        setCell(userFind.cell)
        setUserList(userResponse.data)

        const unread = notificationResponse.data.filter(a => a.read === '1');
        setUnread(unread.length > 0 ? unread : [])
        setNotificationList(notificationResponse.data);
    }

    const handleMenuClick = e => {
        switch (e.key) {
            case '2': // Sign Out
                {
                     window.open('https://www.ischedule.ca/support', '_blank', 'noopener noreferrer');
                    //openExtendedLink('https://appointstack.com/support')
                    break;
                }
            case '9': // Sign Out
                {
                    logout();
                    break;
                }
            default: { break; }
        }
    };

    const menuProps = {
        items: [
            getItem('1',
                <div class='flex flex-row gap-4'>
                    <AssignedTo userId={uid} userList={userList} imageWidth={40} imageHeight={40} AvatarSize={40} allowText={false} preview={false} />
                    <div class='flex flex-col'>
                        <p>{fullname} </p>
                        <p>{cell} </p>
                    </div>
                </div>, null, null, true),
            { type: 'divider', },
            getItem('2', 'Help Center', <SlEarphonesAlt />),
            { type: 'divider', },
            getItem('9', 'Sign Out', <LogoutOutlined />, null, null, true),
        ],
        onClick: handleMenuClick
    };

    return (
        <header class="p-2 bg-blue-500 border-b shadow-sm flex flex-row gap-2 sticky  z-50 top-0">

            {/* logo */}
            <div class={`w-1/12 md:w-3/12  flex items-center gap-2  cursor-pointer`} onClick={() => navigate("/home")} >
                <img class="w-10 h-10 rounded-full bg-white" src={logo} alt="Rounded avatar" />
                <span class={`font-medium font-sans text-white text-lg whitespace-nowrap duration-150 scale-0 md:scale-100`}>{process.env.REACT_APP_PROJECT_NAME}</span>
            </div>

            {/* Search */}
            <div class='w-8/12 md:w-6/12 flex flex-row items-center'>
                <Search value={search} onChange={setSearch} />
            </div>

            {/* notification and profile */}
            <div class='w-3/12 pr-4 flex flex-row gap-4 justify-end items-center '>
                <Badge count={unread.length}>
                    <BellFilled style={{ fontSize: '23px',  color: 'white', cursor: 'pointer' }} />
                </Badge>

                <Dropdown menu={menuProps} overlayStyle={{ width: '200px', gap: 4, color: 'white',cursor:'pointer' }}>
                    <Space style={{cursor:'pointer'}}>
                  <AssignedTo userId={uid} userList={userList} imageWidth={28} imageHeight={28} AvatarSize={24} allowText={false} preview={false} />
                </Space>
                </Dropdown>
            </div>

            {/*
            <Drawer title={"Notification"} placement='right' width={500} onClose={() => updateOnClose()} open={openNotification}
                >

                <NotificationDetail refresh={refresh} currentOption={currentOption} notificationList={notificationList} setUnreadUpdate={setUnreadUpdate} tabActiveKey={tabActiveKey} setTabActiveKey={setTabActiveKey} />
            </Drawer>
            */}
        </header>
    )
}

export default Header

// npx update-browserslist-db@latest