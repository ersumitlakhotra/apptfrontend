import { Avatar,  Rate, Button } from "antd";

import {  EditOutlined} from '@ant-design/icons';
function getHeaderItem( key,label) {
    return {
      key,
      label   
    };
  }
const UserTable = ({dataSource,onEdit}) => {
    
    const headerItems =[ 
        getHeaderItem('1','USER'), 
        getHeaderItem('2','USER ROLE'), 
        getHeaderItem('3','USERNAME'), 
        getHeaderItem('4','ACCOUNT TYPE'), 
        getHeaderItem('5','RATING'), 
        getHeaderItem('6','STATUS'), 
        getHeaderItem('7','ACTIONS'), 
      ];

    return (
<div class="relative overflow-x-auto shadow-md sm:rounded-lg"> 
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headerItems.map(items => (
                    <th scope="col" id={items.key} class="px-6 py-3">
                    {items.label}
                </th>
                ))}
            </tr>
        </thead>
        <tbody>
        {dataSource.map(items => (                 
            <tr key={items.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">               
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {/*<Image class="w-10 h-10 rounded-full" src={items.image} alt="Profile"/>*/}
                    
                    {items.profilepic === null ?
                     <Avatar size={40} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{(items.fullname).charAt(0)}</Avatar>:    
                    <Avatar size={40} src={items.profilepic} />
                    }

                    <div class="ps-3">
                        <div class="text-base font-semibold">{items.fullname}</div>
                        <div class="font-normal text-gray-500">{items.email}</div>
                    </div>  
                </th>

                <td class="px-6 py-4">
                    {items.role}
                </td>

                <td class="px-6 py-4">
                    {items.username}
                </td>

                <td class="px-6 py-4">
                    {items.accounttype}
                </td>

                <td class="px-6 py-4">
                    <Rate disabled defaultValue={items.rating} />
                </td>
                
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class={`h-2.5 w-2.5 rounded-full ${items.status ==='Active' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {items.status}
                    </div>
                </td>

                <td class="px-6 py-4">
                    <Button type="link" icon={<EditOutlined />} onClick={()=>onEdit(items.id)}>Edit</Button>
                </td>
            </tr> 
            ))}                       
        </tbody>
    </table>
</div>
)}

export default UserTable;
