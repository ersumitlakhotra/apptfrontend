import {  PieChartOutlined, CheckSquareOutlined, ProductOutlined, NotificationOutlined, UnorderedListOutlined, UserOutlined, SettingOutlined, CustomerServiceOutlined, FallOutlined, FundOutlined } from '@ant-design/icons';
import SideBarButton from '../sidebar_button';


function getItem(label, key, icon, badge, btn, children, dropdown) {
  return {
    key,
    icon,
    children,
    label,
    dropdown,
    badge,
    btn,
  };
}

const Sidebar = ({ screen, onSelected, content, open }) => {
 

  const overview=([
    getItem('Dashboard', 11, <PieChartOutlined />),
    getItem('Tasks', 12, <CheckSquareOutlined />, 5),
    getItem('Order', 13, <ProductOutlined />),
    getItem('Event', 14, <NotificationOutlined />),
  ]);

 
  const management = ([
    //getItem ('Inbox', 5, <MailFilled />,5),
    //  getItem ('Report', 6, <FileTextFilled />,null,<DownOutlined/>,[
    // getItem('Sales',61),
    // getItem('Purchase',62),
    // getItem('Accounting',63),
    //], false),
    getItem('Services', 21, <UnorderedListOutlined />),
    getItem('Users', 22, <UserOutlined />),
  ]);

  const report = ([
    getItem('Sales', 31, <FundOutlined />),
    getItem('Expenses', 32, <FallOutlined />),
  ]);

  const misc = ([
    getItem('Help', 41, <CustomerServiceOutlined />),
    getItem('Setting', 42, <SettingOutlined />),
  ]);

  return (
    <div class={` h-full relative duration-300 flex flex-col  ${open ? 'w-72' : 'w-14'}`}>
      <sidebar class='w-full flex flex-col' >

        <header class='h-16  p-3 flex items-center gap-3 cursor-pointer '>
          <img class="w-8 h-8 rounded-full bg-white" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Rounded avatar" />
          <span class={`text-lg font-semibold whitespace-nowrap duration-150 ${!open && ' scale-0'}`}>{process.env.REACT_APP_PROJECT_NAME}</span>
        </header>

        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} whitespace-nowrap`}>Overview</span>
        {overview.map(item => (<SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />))}
           
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} whitespace-nowrap`}>Management</span>
        {management.map(item => (<SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />))}
        
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} whitespace-nowrap`}>Report</span>
        {report.map(item => (<SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />))}
 
        <span class={` text-sm  px-5 mt-6 duration-150 ${!open && 'scale-0'} whitespace-nowrap`}>Misc</span>
        {misc.map(item => (<SideBarButton key={item.key} isOpen={open} icon={item.icon} label={item.label} badge={item.badge} content={content} onSelected={(e) => onSelected(e)} />))}
       
      </sidebar>
    </div>
  );
};

export default Sidebar;