import {
    BarChartOutlined,
    ProductOutlined,
    NotificationOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    DollarOutlined,
    ContactsOutlined,
    HomeOutlined ,
    QrcodeOutlined
} from '@ant-design/icons';

import { FaHandHoldingUsd } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";

import { IoIosCalendar } from "react-icons/io";
import { useAuth } from "../../auth/authContext";



const AppIconsPermission = (size='50px',iconSize=54) => {
     const { permissions } = useAuth();

    const Item = ({ label, navigate, key, icon, isVisible = false, color, badge, btn, children, dropdown }) => ({
        key,icon,children,label,dropdown,badge,btn,isVisible,color,navigate
    })
    
    const apps = [
        Item({
            key:1, 
            label:'Home',       
            navigate:'/home',
            isVisible:true,
            color:'bg-blue-500',
            icon:<HomeOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:2, 
            label:'Appointment',       
            navigate:'/appointment',
            isVisible:permissions.includes('order'),
            color:'bg-orange-300',
            icon:<ProductOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:3, 
            label:'Calender',       
            navigate:'/calender',
            isVisible:permissions.includes('tasks'),
            color:'bg-blue-900',
            icon:<IoIosCalendar style={{ fontSize: size, color: 'white' }}/>
        }),
        Item({
            key:4, 
            label:'Event',       
            navigate:'/event',
            isVisible:permissions.includes('event'),
            color:'bg-gradient-to-b from-[#8a2ce2] via-[#4a0080] to-[#1f8fff]',
            icon:<NotificationOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:5, 
            label:'Customers',       
            navigate:'/customers',
            isVisible:permissions.includes('customer'),
            color:'bg-gradient-to-r from-red-400 to-pink-800 ',
            icon:<ContactsOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:6, 
            label:'Services',       
            navigate:'/services',
            isVisible:permissions.includes('services'),
            color:'bg-gradient-to-r from-[#D6B588] to-orange-600',
            icon: <UnorderedListOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:7, 
            label:'Users',       
            navigate:'/users',
            isVisible:permissions.includes('users'),
            color:'bg-gradient-to-r from-red-900 to-purple-600',
            icon: <UserOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:8, 
            label:'Schedule',       
            navigate:'/schedule',
            isVisible:permissions.includes('schedule'),
            color:'bg-gradient-to-r from-green-500 to-green-900',
            icon: <AiFillSchedule style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:9, 
            label:'Reports',       
            navigate:'/reports',
            isVisible:permissions.includes('sales'),
            color:'bg-fuchsia-600',
            icon:<BarChartOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:10, 
            label:'Help',       
            navigate:'/help',
            isVisible:true,
            color:'bg-gradient-to-r from-cyan-400 to-cyan-900',
            icon:<CustomerServiceOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:11, 
            label:'QR Code',       
            navigate:'/scanQR',
            isVisible:true,
            color:'bg-gradient-to-b from-red-900 to-[#D6B588]',
            icon:<QrcodeOutlined style={{ fontSize: size, color: 'white' }} />
        }),
        Item({
            key:12, 
            label:'Setting',       
            navigate:'/setting',
            isVisible:permissions.includes('setting'),
            color:'bg-gray-500',
            icon:<SettingOutlined style={{ fontSize: size, color: 'white' }} />
        })
    ]
    return { apps }
}

export default AppIconsPermission;