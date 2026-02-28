import { useEffect, useState } from "react";
import {
    BarChartOutlined,
    ProductOutlined,
    NotificationOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    FallOutlined,
    FundOutlined,
    DollarOutlined,
    ContactsOutlined,
    HomeOutlined ,
    QrcodeOutlined
} from '@ant-design/icons';

import { FaHandHoldingUsd } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";

import { IoIosCalendar } from "react-icons/io";
import FetchData from "../../hook/fetchData";
import { getStorage } from "../localStorage";

function getItem(label, navigate, key, icon, isVisible = false, color, badge, btn, children, dropdown) {
    return {
        key,
        icon,
        children,
        label,
        dropdown,
        badge,
        btn,
        isVisible,
        color,
        navigate
    };
}

const AppIconsPermission = (size='50px',iconSize=54) => {
    const [dashboard, setDashboard] = useState(false);
    const [tasks, setTasks] = useState(false);
    const [order, setOrder] = useState(false);
    const [event, setEvent] = useState(false);
    const [payment, setPayment] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [services, setServices] = useState(false);
    const [users, setUsers] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [sales, setSales] = useState(false);
    const [collection, setCollection] = useState(false);
    const [setting, setSetting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const apps = [
        getItem('Home', '/home', 1, <HomeOutlined style={{ fontSize: size, color: 'white' }} />, true, 'bg-blue-500'),
        getItem('Appointment', '/appointment', 2, <ProductOutlined style={{ fontSize: size, color: 'white' }} />, order, 'bg-orange-300'),
        // getItem('Dashboard','', 1, <PieChartOutlined style={{ fontSize: size, color: 'white' }} />, dashboard, 'bg-blue-500'),
        getItem('Calender', '/calender', 3, <IoIosCalendar style={{ fontSize: size, color: 'white' }}/>, tasks, 'bg-blue-900'),
        getItem('Event', '/event', 4, <NotificationOutlined style={{ fontSize: size, color: 'white' }} />, event, 'bg-gradient-to-b from-[#8a2ce2] via-[#4a0080] to-[#1f8fff]'),
        getItem('Payment', '', 5, <DollarOutlined style={{ fontSize: size, color: 'white' }} />, false),
        getItem('Customers', '/customers', 6, <ContactsOutlined style={{ fontSize: size, color: 'white' }} />, customer, 'bg-gradient-to-r from-red-400 to-pink-800 '),
        getItem('Services', '/services', 7, <UnorderedListOutlined style={{ fontSize: size, color: 'white' }} />, services, 'bg-gradient-to-r from-[#D6B588] to-orange-600 '),
        getItem('Users', '/users', 8, <UserOutlined style={{ fontSize: size, color: 'white' }} />, users, 'bg-gradient-to-r from-red-900 to-purple-600'),
        getItem('Schedule', '/schedule', 9, <AiFillSchedule style={{ fontSize: size, color: 'white' }} />, schedule, 'bg-gradient-to-r from-green-500 to-green-900 '),
        getItem('Reports', '/reports', 10, <BarChartOutlined style={{ fontSize: size, color: 'white' }} />, sales, ' bg-fuchsia-600'),
        getItem('Collection', '', 11, <FaHandHoldingUsd style={{ fontSize: size, color: 'white' }} />, false),
        // getItem('Expenses','', 12, <FallOutlined style={{ fontSize: size, color: 'white' }} />),
        getItem('Help', '/help', 13, <CustomerServiceOutlined style={{ fontSize: size, color: 'white' }} />, true, 'bg-gradient-to-r from-cyan-400 to-cyan-900'),
        getItem('QR Code', '/scanQR', 14, <QrcodeOutlined style={{ fontSize: size, color: 'white' }} />, true, 'bg-gradient-to-b from-red-900 to-[#D6B588]'),
        getItem('Setting', '/setting', 15, <SettingOutlined style={{ fontSize: size, color: 'white' }} />, setting, 'bg-gray-500'),
    ]

    useEffect(() => {
        Init()
    }, [])

    const Init = async () => {
        setIsLoading(true);

        const localStorage = await getStorage();

        const userPermissionResponse = await FetchData({
            method: 'GET',
            endPoint: 'userpermission',
            id: localStorage.uid 
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
            setSchedule(b.schedule);

            setSales(b.sales);
            setCollection(b.collection);
            setSetting(b.setting);
        })
        setIsLoading(false);
    }

    return { apps, isLoading }
}

export default AppIconsPermission;