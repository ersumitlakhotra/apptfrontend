import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { PieChartFilled, ProductFilled, TagsFilled, MailFilled, FileTextFilled, SettingFilled, CustomerServiceFilled, NotificationFilled, ContactsFilled,DownOutlined,UpOutlined,LeftOutlined, PlusSquareFilled, DatabaseFilled, CalendarFilled } from '@ant-design/icons';


function getItem (label, key, icon,badge,btn, children,dropdown) {
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

const Sidebar = ({screen,onSelected}) => {
const [open, setOpen] = useState (true);
useEffect (
  () => {
    if ((screen === "md" || screen === "sm")) {
      setOpen(false)
    }
    else
    {
      setOpen(true)
    }
  },
  [screen]
);

const [MenuItems,setMenuItems] = useState( [
  getItem('Dashboard', 1, <PieChartFilled />),
  getItem('Tasks', 2, <CalendarFilled />),
   getItem ('Order', 3, <ProductFilled />),
  getItem('Event', 4, <NotificationFilled />),
   //getItem ('Inbox', 5, <MailFilled />,5),
 //  getItem ('Report', 6, <FileTextFilled />,null,<DownOutlined/>,[
   // getItem('Sales',61),
   // getItem('Purchase',62),
   // getItem('Accounting',63),
   //], false),
   getItem('Services', 7, <DatabaseFilled />),
   getItem('Users', 8, <ContactsFilled />),
   getItem ('Support', 9, <CustomerServiceFilled />),
   getItem ('Setting', 10, <SettingFilled />),
 ]);

 const onViewDropList = (index) => {
   const newItems = [...MenuItems];
   newItems[index] = {
      ...MenuItems[index],
      dropdown:!newItems[index].dropdown,
      btn:(!newItems[index].dropdown === true ?<UpOutlined/> : <DownOutlined/>)
   };
   setMenuItems(newItems);
 };

  return (
    <div class={`border border-gray-300 bg-white p-3 h-full relative duration-300 ${open ? 'w-72' : 'w-16'}`}>
     
      {MenuItems.map (item => (
         <ul class="space-y-2 font-medium" key={item.key} onClick={() => onSelected(item.label)}>
            <li>
               <Link href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 22 21">
                  {item.icon}
                  </span>
                  <span class={`flex-1 ms-3 whitespace-nowrap duration-150 ${!open && 'scale-0'}`}>{item.label}</span>
                  {item.badge != null &&
                     <span class={`inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-primary-100 rounded-full dark:bg-primary-500 dark:text-blue-300 duration-150 ${!open && 'scale-0'}`}>
                     {item.badge}</span>
                  } 
                  {item.btn != null &&
                     <span class={`inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium duration-150 ${!open && 'scale-0'}`} 
                     onClick={()=>onViewDropList(item.key)}>
                     {item.btn}</span>
                  }         
               </Link>
               {item.children !=null &&
                  <ul id="dropdown-example" class={`${item.dropdown === false ? 'hidden':''} py-2 space-y-2`}>
                  {item.children.map (childItem => (
                     <li key={childItem.key} class={`duration-150 ${!open && 'scale-0'}`}>
                        <Link href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        {childItem.label}</Link>
                     </li>
                  ))}
                     
                  </ul>
               }
            </li>
         </ul>
      ))}

      <div class='absolute text-center h-8 w-full left-0 bottom-16 border-t-2 '>

      <LeftOutlined 
      className={`cursor-pointer  ${!open && 'rotate-180'}`}
        onClick={() => setOpen (!open)}/>
      </div>
    </div>
  );
};

export default Sidebar;