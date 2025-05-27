import { Image } from "antd";
import { Link } from "react-router-dom";

function getHeaderItem( key,label,icon,color, value) {
    return {
      key,
      label   
    };
  }
  function getDatasourceItem( key,image,name,role,email,accountType,rating,status) {
    return {
      key,
      image,
      name,
      role,
      email,
      accountType,
      rating,
      status,
      action:[
        {
            key:key,
            label:'Edit',
        }
      ]
    };
  }
const UserTable = () => {
    
    const headerItems =[ 
        getHeaderItem('1','USER'), 
        getHeaderItem('2','USER ROLE'), 
        getHeaderItem('3','EMAIL'), 
        getHeaderItem('4','ACCOUNT TYPE'), 
        getHeaderItem('5','RATING'), 
        getHeaderItem('6','STATUS'), 
        getHeaderItem('7','ACTIONS'), 
      ];
      const dataSourceItems =[ 
        getDatasourceItem('1','https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg','Sumit Kumar','Administrator','ersumit@gmail.com','PRO','4.7','Active'), 
        getDatasourceItem('2','https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg','Sandeep','Moderator','erSandeepKailay@gmail.com','Basic','2.0','Inactive'),  
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
        {dataSourceItems.map(items => (                 
            <tr key={items.key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">               
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <Image class="w-10 h-10 rounded-full" src={items.image} alt="Profile"/>
                    <div class="ps-3">
                        <div class="text-base font-semibold">{items.name}</div>
                        <div class="font-normal text-gray-500">{items.email}</div>
                    </div>  
                </th>

                <td class="px-6 py-4">
                    {items.role}
                </td>

                <td class="px-6 py-4">
                    {items.email}
                </td>

                <td class="px-6 py-4">
                    {items.accountType}
                </td>

                <td class="px-6 py-4">
                    {items.rating}
                </td>
                
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class={`h-2.5 w-2.5 rounded-full ${items.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {items.status}
                    </div>
                </td>

                <td class="px-6 py-4">
                    <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</Link>
                </td>
            </tr> 
            ))}                       
        </tbody>
    </table>
</div>
)}

export default UserTable;
