import React from 'react';
import { BellOutlined, BookOutlined, ClockCircleOutlined, LockOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

function getItem( key,label, icon,extra,disabled, danger) {
    return {
      key,
      label,
      icon,
      extra,
      disabled,
      danger,
    };
  }
const ProfileItems =[ 
    getItem('1','Sumit Kumar',null,null,true), 
    {type: 'divider',},
    getItem('2','Account',<UserOutlined />),  
    getItem('3','Settings',<SettingOutlined />,'⌘S'),  
    getItem('4','Privacy',<LockOutlined />,'⌘P'),  
    getItem('5','Notifications',<BellOutlined />),  
    {type: 'divider',},
    getItem('6','Help Guide',<BookOutlined />),  
    getItem('7','Help Center',<QuestionCircleOutlined />),     
    {type: 'divider',},
    getItem('8','Limited Access',<ClockCircleOutlined />),   
    {type: 'divider',},
    getItem('9','Sign Out',<LogoutOutlined />,null,null,true), 
  ];

export default ProfileItems;
