/* eslint-disable react-hooks/exhaustive-deps */
import {  
  PieChartOutlined, 
  CheckSquareOutlined, 
  ProductOutlined, 
  NotificationOutlined, 
  UnorderedListOutlined, 
  UserOutlined, 
  SettingOutlined, 
  CustomerServiceOutlined,
   FallOutlined, 
   FundOutlined, DollarOutlined} from '@ant-design/icons';
import SideBarButton from '../sidebar_button';
import { useEffect, useState } from 'react';
import logo from '../../../Images/logo.png';


function getItem(label, key, icon,isVisible, badge, btn, children, dropdown) {
  return {
    key,
    icon,
    children,
    label,
    dropdown,
    badge,
    btn,
    isVisible
  };
}

const Sidebar = ({ onSelected, content, open, permissioninfo }) => {

  const [dashboard, setDashboard] = useState(false);
  const [tasks, setTasks] = useState(false);
  const [order, setOrder] = useState(false);
  const [event, setEvent] = useState(false);
  const [payment, setPayment] = useState(false);
  const [services, setServices] = useState(false);
  const [users, setUsers] = useState(false);
  const [sales, setSales] = useState(false);
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    if (permissioninfo !== null) {
      setDashboard(permissioninfo[0].dashboard);
      setTasks(permissioninfo[0].tasks);
      setOrder(permissioninfo[0].order);
      setEvent(permissioninfo[0].event);
      setPayment(permissioninfo[0].payment);
      setServices(permissioninfo[0].services);
      setUsers(permissioninfo[0].users);
      setSales(permissioninfo[0].sales);
      setSetting(permissioninfo[0].setting);    
    }
    else {
      setDashboard(false); setTasks(false); setOrder(false); setEvent(false); setPayment(false);
      setServices(false); setUsers(false); setSales(false); setSetting(false);
    }
  }, [permissioninfo]);


  const overview=([
    getItem('Dashboard', 11, <PieChartOutlined />, dashboard),
    getItem('Tasks', 12, <CheckSquareOutlined />,tasks),
    getItem('Order', 13, <ProductOutlined />,order),
    getItem('Event', 14, <NotificationOutlined />,event),
    getItem('Payment', 15, <DollarOutlined />,payment),
  ]);

 
  const management = ([
    //getItem ('Inbox', 5, <MailFilled />,5),
    //  getItem ('Report', 6, <FileTextFilled />,null,<DownOutlined/>,[
    // getItem('Sales',61),
    // getItem('Purchase',62),
    // getItem('Accounting',63),
    //], false),
    getItem('Services', 21, <UnorderedListOutlined />,services),
    getItem('Users', 22, <UserOutlined />,users),
  ]);

  const report = ([
    getItem('Sales', 31, <FundOutlined />,sales),
    getItem('Expenses', 32, <FallOutlined />),
  ]);

  const misc = ([
    getItem('Help', 41, <CustomerServiceOutlined />),
    getItem('Setting', 42, <SettingOutlined />,setting),
  ]);

  return (
    <div class={` h-full  duration-300 ${open ? 'w-72' : 'w-14'}`}>
      <sidebar class='w-full flex flex-col ' >

        <header class='h-16  p-3 flex items-center gap-1 cursor-pointer '>
          <img class="w-10 h-8 rounded-full bg-white" src={logo} alt="Rounded avatar" />
          <span class={`font-semibold whitespace-nowrap duration-150 ${!open && ' scale-0'}`}>{process.env.REACT_APP_PROJECT_NAME}</span>
        </header>

        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'}  ${overview.filter(item => item.isVisible === true).length === 0 && 'hidden'} whitespace-nowrap`}>Overview</span>
        {overview.map(item => item.isVisible && <SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />)}
           
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} ${management.filter(item => item.isVisible === true).length === 0 && 'hidden'} whitespace-nowrap`}>Management</span>
        {management.map(item => item.isVisible && <SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />)}
        
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} ${report.filter(item => item.isVisible === true).length === 0 && 'hidden'} whitespace-nowrap`}>Report</span>
        {report.map(item => item.isVisible && <SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />)}
 
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} ${misc.filter(item => item.isVisible === true).length === 0 && 'hidden'} whitespace-nowrap`}>Misc</span>
        {misc.map(item => item.isVisible && <SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />)}
       
      </sidebar>
    </div>
  );
};

export default Sidebar;