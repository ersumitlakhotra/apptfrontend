/* eslint-disable react-hooks/exhaustive-deps */

import Search from '../../common/custom/search'
import logo from '../../Images/logo.png'
import { SlEarphonesAlt } from "react-icons/sl";
import { Badge, Button,  Drawer, Dropdown,  Space } from 'antd';
import { BellFilled, LogoutOutlined, DownOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AssignedTo from '../../common/assigned_to';
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
const Header = ({ saveData, refresh, setRefresh, viewOrder, editUser, uid, notificationList, getNotification, getUserListWithAdmin,servicesList
 }) => {
    const navigate = useNavigate();
    const ranOnce = useRef(false);
    const { logout } = useAuth();
    const [search, setSearch] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState([]);
    const [unread, setUnread] = useState([])  
    const [openNotification, setOpenNotification] = useState(false);
    const [tabActiveKey,setTabActiveKey]= useState(1)
    const [reload, setReload] = useState(0);

    useEffect(() => {
        if (ranOnce.current) return;
        ranOnce.current = true;
        Init();
    }, [])

    useEffect(() => {
        refreshNotification();
    }, [refresh])

    const Init = async () => {
        const localStorage = await getStorage();
        const userListWithAdminResponse = await getUserListWithAdmin();
        setUserList(userListWithAdminResponse)
        const userFind = userListWithAdminResponse.find(item => item.id === localStorage.uid);
        setFullname(userFind.fullname)
        setUsername(userFind.username)
    }

    const refreshNotification = async () => {
        const notificationResponse = await getNotification();
        const unread = notificationResponse.filter(a => a.read === '0');
        setUnread(unread.length > 0 ? unread : [])
    }

    const handleMenuClick = e => {
        switch (e.key) {
            case '1':
            case '2': // Account
                {
                    editUser(uid,true)
                    break;
                }
            case '3': // Notifications
                {
                    setTabActiveKey('1');
                    setReload(reload + 1);
                    setOpenNotification(true);           
                    break;
                }
            case '4': // Help
                {
                    navigate('/help');
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
                <div class='flex flex-row gap-2 p-2 bg-blue-50 border rounded-lg overflow-auto'>
                    <AssignedTo userId={uid} userList={userList} imageWidth={34} imageHeight={34} AvatarSize={34} allowText={false} preview={false} />
                    <div class='flex flex-col text-xs px-3 text-blue-800 font-medium'>
                        <p>{fullname} </p>
                        <p>{username} </p>
                    </div>
                </div>, null, null,true),
            { type: 'divider', }, 
            getItem('2', 'Account', <UserOutlined />, '⌘A'),
            getItem('3', 'Notifications', <BellOutlined />),
            getItem('4', 'Help Center', <SlEarphonesAlt />),
            { type: 'divider', },
            getItem('9', 'Sign Out', <LogoutOutlined />, null, null, true),
        ],
        onClick: handleMenuClick
    };

    const [currentOption, setCurrentOption] = useState('Last 7 Days');
    const itemsNotification = [
        { key: 'Today', label: 'Today' },
        { key: 'Last 7 Days', label: 'Last 7 Days' },
        { key: 'This Month', label: 'This Month' },
       // { key: 'This Year', label: 'This Year' },
    ];

    const onItemChanged = e => { setCurrentOption(e.key) };
    const menuPropsNotification = { items: itemsNotification, onClick: onItemChanged };


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
                    <BellFilled style={{ fontSize: '23px', color: 'white', cursor: 'pointer' }} onClick={() => { setOpenNotification(true); setTabActiveKey('1'); }} />
                </Badge>

                <Dropdown menu={menuProps} trigger={['click']} overlayStyle={{  gap: 4, color: 'white', cursor: 'pointer' }}>
                    <Space style={{ cursor: 'pointer' }}>
                        <AssignedTo userId={uid} userList={userList} imageWidth={28} imageHeight={28} AvatarSize={24} allowText={false} preview={false} />
                    </Space>
                </Dropdown>


            </div>

            <Drawer title={"Notification"} placement='right' width={500} open={openNotification} onClose={() => {setOpenNotification(false); setRefresh(refresh+1)}} 
                extra={<Dropdown menu={menuPropsNotification}>
                    <Button>
                        <Space>
                            {currentOption}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>}>

                <NotificationDetail refresh={refresh} currentOption={currentOption} notificationList={notificationList} tabActiveKey={tabActiveKey} setTabActiveKey={setTabActiveKey}  userList={userList} servicesList={servicesList} saveData={saveData} viewOrder={viewOrder}/>
            </Drawer>

        </header>
    )
}

export default Header

// npx update-browserslist-db@latest