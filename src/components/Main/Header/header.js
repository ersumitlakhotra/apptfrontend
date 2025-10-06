/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Dropdown, Drawer, Button, Badge } from 'antd';
import { MenuUnfoldOutlined, SaveOutlined, BellOutlined, BookOutlined, ClockCircleOutlined, LockOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined, BellFilled } from '@ant-design/icons';

import { useEffect, useRef, useState } from 'react';
import AssignedTo from '../../../common/assigned_to.js';
import UserDetail from '../../Users/user_detail.js';

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
const Header = ({ onSignout, open, setOpen, getData, saveData, refresh, setPermissionInfo }) => {
  const ref = useRef();
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState('0');
  const [fullname, setFullname] = useState('');
  const [profilepic, setProfile] = useState(null);
  const [openAccount, setOpenAccount] = useState(false);

  const btnSave = async () => {
    await ref.current?.save();
  }
  const [items, setItems] = useState([]);

  useEffect(() => {
    setId(localStorage.getItem('uid'));
    getData(setUserList, "user");
  }, []);

  useEffect(() => {
    if (userList.length > 0) {
      userList.filter(a => a.id === id).map(b => {
        setFullname(b.fullname);
        setPermissionInfo(b.permissioninfo);
        setProfile(b.profilepic);
        setItems([
          getItem('1',
            <div class='flex flex-row gap-4'>
              <AssignedTo userId={id} userList={userList} imageWidth={40} imageHeight={40} AvatarSize={40} allowText={false} preview={false} />
              <div class='flex flex-col'>
                <p>{b.fullname} </p>
                <p>{b.cell} </p>      
              </div>
          </div> , null, null,true),
          { type: 'divider', },
          getItem('9', 'Sign Out', <LogoutOutlined />, null, null, true),
        ])
{/*
        setItems([
          getItem('1', b.fullname, null, null, true),
          { type: 'divider', },
          getItem('2', 'Account', <UserOutlined />),
          getItem('3', 'Settings', <SettingOutlined />, '⌘S'),
          getItem('4', 'Privacy', <LockOutlined />, '⌘P'),
          getItem('5', 'Notifications', <BellOutlined />),
          { type: 'divider', },
          getItem('6', 'Help Guide', <BookOutlined />),
          getItem('7', 'Help Center', <QuestionCircleOutlined />),
          { type: 'divider', },
          getItem('8', 'Limited Access', <ClockCircleOutlined />),
          { type: 'divider', },
          getItem('9', 'Sign Out', <LogoutOutlined />, null, null, true),
        ])*/}
      })   
    }
  }, [userList]);

  const handleMenuClick = e => {
    switch (e.key) {
      case '2': // Account
        {
          setOpenAccount(true);         
          break;
        }
      case '9': // Sign Out
        {
          localStorage.removeItem('cid');
          localStorage.removeItem('uid');
          onSignout();
          break;
        }
      default: {  break; }
    }

  };
  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  return (
    <div class='flex items-center justify-between p-3 pe-8 overflow-x-hidden '>
      <MenuUnfoldOutlined className='cursor-pointer' onClick={() => setOpen(!open)} />
      <div class='flex flex-row gap-6 mt-1 cursor-pointer'>
        <Badge count={5}>
          <BellFilled style={{ fontSize: '22px', marginTop:6, color: 'gray' }} />
        </Badge>
        <Dropdown menu={menuProps} overlayStyle={{ width: '250px', gap: 5 }}>
          <Space>
            <AssignedTo userId={id} userList={userList} imageWidth={30} imageHeight={30} AvatarSize={30} allowText={false} preview={false} />
          </Space>
        </Dropdown>
       
      </div>
     

      <Drawer title={"Account"} placement='right' width={500} onClose={() => setOpenAccount(false)} open={openAccount}
        extra={<Space><Button type="primary" icon={<SaveOutlined />} onClick={btnSave} >Save</Button></Space>}>
        <UserDetail id={id} refresh={refresh} ref={ref} userList={userList} saveData={saveData} setOpen={setOpenAccount} />
      </Drawer>
    </div>
  )
}
export default Header;