import { useEffect, useState } from "react";
import {
    PieChartOutlined,
    ProductOutlined,
    NotificationOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    FallOutlined,
    FundOutlined,
    DollarOutlined,
    ContactsOutlined
} from '@ant-design/icons';

import { FaHandHoldingUsd } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import CalenderIcon from "../../common/custom/calenderIcon";
import IsLoading from "./isLoading";
import FetchData from "../../hook/fetchData";
import { getStorage } from "../localStorage";

function getItem(label,navigate, key, icon, isVisible = false, color, badge, btn, children, dropdown) {
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

const AppIconsPermission = () => {
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
        getItem('Dashboard','', 1, <PieChartOutlined style={{ fontSize: '50px', color: 'white' }} />, dashboard, 'bg-blue-500'),
        getItem('Calender','/calender', 2, <CalenderIcon size={54} color={'text-white'} position="top-6 left-5" />, tasks, 'bg-blue-900'),
        getItem('Appointment','/appointment', 3, <ProductOutlined style={{ fontSize: '50px', color: 'white' }} />, order, 'bg-orange-300'),
        getItem('Event', '',4, <NotificationOutlined style={{ fontSize: '50px', color: 'white' }} />, event),
        getItem('Payment','', 5, <DollarOutlined style={{ fontSize: '50px', color: 'white' }} />, payment),
        getItem('Customers','', 6, <ContactsOutlined style={{ fontSize: '50px', color: 'white' }} />, customer),
        getItem('Services', '',7, <UnorderedListOutlined style={{ fontSize: '50px', color: 'white' }} />, services),
        getItem('Users','', 8, <UserOutlined style={{ fontSize: '50px', color: 'white' }} />, users, 'bg-gradient-to-r from-red-900 to-purple-600'),
        getItem('Schedule', '',9, <AiFillSchedule style={{ fontSize: '50px', color: 'white' }} />, schedule, 'bg-green-800'),
        getItem('Sales', '',10, <FundOutlined style={{ fontSize: '50px', color: 'white' }} />, sales),
        getItem('Collection', '',11, <FaHandHoldingUsd style={{ fontSize: '50px', color: 'white' }} />, collection),
        // getItem('Expenses','', 12, <FallOutlined style={{ fontSize: '50px', color: 'white' }} />),
        getItem('Help','', 13, <CustomerServiceOutlined style={{ fontSize: '50px', color: 'white' }} />, true),
        getItem('Setting','/setting', 14, <SettingOutlined style={{ fontSize: '50px', color: 'white' }} />, setting, 'bg-gray-500'),
    ]

    useEffect(() => {
        Init()
    }, [])

    const Init = async () => {
        setIsLoading(true);

        const userPermissionResponse = await FetchData({
            method: 'GET',
            endPoint: 'userpermission'
        })
         const localStorage =await getStorage();
        const permissionList = userPermissionResponse.data;
        permissionList.filter(a => a.uid === localStorage.uid).map(b => {
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