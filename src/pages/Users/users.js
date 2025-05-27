import { Badge, Button, Divider,Select } from "antd";
import {  PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from "react";
import UserTable from "../../components/Users/Table/user_table";

const ROLES_OPTIONS = ['Administrator', 'Manager', 'Employee', 'Users'];
const STATUS_OPTIONS = ['Active', 'In Active'];

const Users=()=> {
    const [selectedRolesItems, setSelectedRolesItems] = useState([]);
    const rolesOptions = ROLES_OPTIONS.filter(o => !selectedRolesItems.includes(o));

    const [selectedStatusItems, setSelectedStatusItems] = useState([]);
    const statusOptions = STATUS_OPTIONS.filter(o => !selectedStatusItems.includes(o));

    return(
        <div class='bg-white border rounded-md w-full p-4'>
            <div class='flex items-center justify-between mb-8'>
                <p class='text-xl font-semibold text-gray-600'>All Users </p>  
                <div class="flex gap-2">
                    <Button type="primary" icon={<PlusOutlined />} size="large">Add new user</Button>
                </div>
            </div>

            <div class='flex flex-col gap-2 lg:flex-row '>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <SearchOutlined/>
                    </div>
                    <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                </div>
                
                <Select mode="multiple" size="middle" placeholder="User Roles" value={selectedRolesItems} onChange={setSelectedRolesItems} style={{ width: '100%', height:40}}
                    options={rolesOptions.map(item => ({
                        value: item,
                        label: item,
                    }))}
                />

                <Select mode="multiple" size="middle" placeholder="Status" value={selectedStatusItems} onChange={setSelectedStatusItems} style={{ width: '100%', height:40}}
                    options={statusOptions.map(item => ({
                        value: item,
                        label: <Badge key={item} color={( item==='Active' ? 'green':'red')} text={item} />,
                    }))}
                />
                <Select defaultValue="1" style={{ width: '100%', height:40}}  prefix="Rating"
                 options={[
                        { value: '5', label: '5' },
                        { value: '4', label: '4+' },
                        { value: '3', label: '3+' },
                        { value: '2', label: '2+' },
                        { value: '1', label: '0>' }
                    ]}/>
            </div>
            <Divider/>

            <UserTable/>
        </div>
    )
}

export default Users;