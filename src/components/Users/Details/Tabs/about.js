import { Button } from "antd";
import { useEffect, useState } from "react";
import {  CheckOutlined, CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const UserAbout =({userList}) => {
    const [cell,setCell]=useState('');
    const [cellEdit,setCellEdit]=useState(true);
    const [email, setEmail]= useState('');


    useEffect(()=>{
        setCell(userList.cell);
        setEmail(userList.email);
    },[])

    const setCellFormat = (cellValue) => {
        let phoneNumber = cellValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (phoneNumber.length > 3) {
            phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
        }
        if (phoneNumber.length > 7) {
            phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
        }
        setCell(phoneNumber);
      }

    return(
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Contact Information</p>

            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Phone</p>
                {cellEdit ?
                <div class='flex flex-row items-center justify-between gap-2 w-full'> 
                    <input type="tel" name="cell" id="cell"  value={cell}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="(111)-222-3333" onChange={(e) => setCellFormat(e.target.value)} />
                    <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined/>} onClick={()=>setCellEdit(false)} />
                    <Button variant="filled" danger shape="circle" icon={<CloseOutlined/>} onClick={()=>setCellEdit(false)} />
                </div>
                    
                :
                <div class='flex flex-row items-center justify-between gap-2 w-full'>
                  <p class="font-normal text-blue-500 w-full ">{cell}</p>
                  <Button color="primary"  variant="filled" icon={<EditOutlined/>} onClick={()=>setCellEdit(true)} />
                </div>
                }
            </div>

            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Email</p>
                <input type="email" name="email" id="email"  value={email}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
        </div>
    )
}

export default UserAbout;