import { useNavigate } from "react-router-dom";
import ProfileCard from "../Setting/profileCard";
import CalenderCard from "./calenderCard";
import AppIcons from "../../common/custom/appIcons";
import {
    PieChartOutlined,
    ProductOutlined,
    NotificationOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    FallOutlined,
    FundOutlined, DollarOutlined,
    SolutionOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import CalenderIcon from "../../common/custom/calenderIcon";
import WaitingApproval from "./waitingApproval";
import UserSchedule from "./userSchedule";

function getItem(label, key, icon, isVisible,color, badge, btn, children, dropdown) {
    return {
        key,
        icon,
        children,
        label,
        dropdown,
        badge,
        btn,
        isVisible,
        color
    };
}
const Homepage = () => {
    const navigate = useNavigate();
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
    const apps = [
        getItem('Dashboard', 11, <PieChartOutlined style={{ fontSize: '50px', color: 'white' }} />, dashboard,'bg-blue-500'),
        getItem('Calender', 12, <CalenderIcon size={54} color={'text-white'} position="top-6 left-5" />, tasks,'bg-blue-900'),
        getItem('Appointment', 13, <ProductOutlined style={{ fontSize: '50px', color: 'white' }} />, order,'bg-orange-300'),
        getItem('Event', 14, <NotificationOutlined style={{ fontSize: '50px', color: 'white' }} />, event),
        getItem('Payment', 15, <DollarOutlined style={{ fontSize: '50px', color: 'white' }} />, payment),
        getItem('Customers', 21, <ContactsOutlined style={{ fontSize: '50px', color: 'white' }} />, customer),
        getItem('Services', 22, <UnorderedListOutlined style={{ fontSize: '50px', color: 'white' }} />, services),
        getItem('Users', 23, <UserOutlined style={{ fontSize: '50px', color: 'white' }} />, users,'bg-gradient-to-r from-red-900 to-purple-600'),
        getItem('Schedule', 24, <AiFillSchedule style={{ fontSize: '50px', color: 'white' }} />, schedule,'bg-green-800'), 
        getItem('Sales', 31, <FundOutlined style={{ fontSize: '50px', color: 'white' }} />, sales),
        getItem('Collection', 32, <FaHandHoldingUsd style={{ fontSize: '50px', color: 'white' }} />, collection),
        getItem('Expenses', 33, <FallOutlined style={{ fontSize: '50px', color: 'white' }} />),
        getItem('Help', 41, <CustomerServiceOutlined style={{ fontSize: '50px', color: 'white' }} />),
        getItem('Setting', 42, <SettingOutlined style={{ fontSize: '50px', color: 'white' }} />, setting),
    ]
    return (
        <div class='flex flex-col gap-8 p-4 '>

            <div class='w-full flex flex-col md:flex-row gap-8 '>
                <div class='w-full md:w-4/12 flex flex-col gap-8'>
                    <ProfileCard />
                    <CalenderCard />
                </div>
                <div class='w-full md:w-4/12'>
                   <WaitingApproval/>
                </div>
                <div class='w-full md:w-4/12'>
                    <UserSchedule/>
                </div>

            </div>
            <div class="w-full flex flex-wrap justify-center gap-8 mt-4 ">
                {apps.map((items,index) => {
                    return (
                        <AppIcons key={index} icon={items.icon} label={items.label} backgroundColor={items.color}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }