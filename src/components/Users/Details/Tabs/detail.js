
import { Button, DatePicker, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const UserLoginDetail = ({ userList, id, Username, Password, Role , Status}) => {
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');
    const [passwordPrev, setPasswordPrev] = useState('');
    const [passwordEdit, setPasswordEdit] = useState(false);

    const [role, setRole] = useState('');
    const [rolePrev, setRolePrev] = useState('');
    const [roleEdit, setRoleEdit] = useState(false);

    const [status, setStatus] = useState('');
    const [statusPrev, setStatusPrev] = useState('');
    const [statusEdit, setStatusEdit] = useState(false);

    const [isNew, setIsNew] = useState(true);


    useEffect(() => {
        setUsername(userList.username);
        Username(userList.username);

        setPassword(userList.password);
        Password(userList.password);
        setPasswordPrev(userList.password);
        setPasswordEdit(false);

        setRole(userList.role);
        Role(userList.role);
        setRolePrev(userList.role);
        setRoleEdit(false);

        setStatus(userList.status);
        Status(userList.status);
        setStatusPrev(userList.status);
        setStatusEdit(false);

        if (id === 0)
            setIsNew(true);
        else
        setIsNew(false);
    }, [userList])

    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Login Details</p>

            {/*  Username */}
            <div class='flex items-center w-full gap-2 mb-1'>
                <p class="font-semibold w-32">Username</p>
                {isNew ?                 
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class="font-normal  text-red-500 w-full ">Username will be generated automatically</p>
                        </div>
                     :
                    <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                        <p class="font-normal  text-blue-500 w-full ">{username}</p>
                    </div>
                }
            </div>

            {/*  Password */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Password <span class='text-red-600'>*</span></p>
                {isNew ?
                    (
                        <input type="text" value={password}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password" onChange={(e) => { setPassword(e.target.value); Password(e.target.value); }} />

                    ) :
                    (passwordEdit ?
                        <div class='flex flex-row items-center justify-between gap-2 w-full'>
                            <input type="text" value={password}
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setPasswordPrev(password); Password(password); setPasswordEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setPassword(passwordPrev); Password(passwordPrev); setPasswordEdit(false) }} />
                        </div>

                        :
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class="font-normal  text-gray-500 w-full ">{password}</p>
                            <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setPasswordEdit(true)} />
                        </div>
                    )
                }
            </div>

            {/*  Role */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Role <span class='text-red-600'>*</span></p>
                {isNew ?
                    (
                        <Select
                            defaultValue={role}
                            style={{ width: '100%' }}
                            onChange={(value) => { setRole(value); Role(value)}}
                            options={[
                                { value: 'Administrator', label: 'Administrator' },
                                { value: 'Manager', label: 'Manager' },
                                { value: 'Employee', label: 'Employee' },
                                { value: 'Users', label: 'Users' },
                            ]}
                        />
                    ) :
                    (roleEdit ?
                        <div class='flex flex-row items-center justify-between gap-2 w-full'>
                            <Select
                                defaultValue={role}
                                style={{ width: '100%' }}
                                onChange={(value) => { setRole(value); Role(value) }}
                                options={[
                                    { value: 'Manager', label: 'Manager' },
                                    { value: 'Employee', label: 'Employee' },
                                    { value: 'Users', label: 'Users' },
                                    { value: 'Administrator', label: 'Administrator' },
                                ]}
                            />

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setRolePrev(role); Role(role); setRoleEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setRole(rolePrev); Role(rolePrev); setRoleEdit(false) }} />
                        </div>

                        :
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class="font-normal  text-gray-500 w-full ">{role}</p>
                            <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setRoleEdit(true)} />
                        </div>
                    )
                }
            </div>

            {/*  Active Inactive */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Status</p>
                {isNew ?
                    (
                        <div class='flex flex-row items-center gap-2 w-full'>
                            <Button color={`${status === 'Active' ? 'cyan':'default'}`} variant="outlined" icon={<CheckOutlined/>} onClick={() =>{setStatus('Active'); Status('Active')}} >Active</Button>
                            <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => { setStatus('Inactive'); Status('Inactive') }} >Inactive</Button>
                        </div>
                       

                    ) :
                    (statusEdit ?
                        <div class='flex flex-row items-center justify-between gap-2 w-full'>
                            <div class='flex flex-row items-center gap-2 w-full'>
                                <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => { setStatus('Active'); Status('Active') }} >Active</Button>
                                <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => { setStatus('Inactive'); Status('Inactive') }} >Inactive</Button>
                            </div>
                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setStatusPrev(status); Status(status); setStatusEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setStatus(statusPrev); Status(statusPrev); setStatusEdit(false) }} />
                        </div>

                        :
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class={`font-normal  ${status === 'Active' ? 'text-cyan-600':'text-red-600'} w-full `}>{status}</p>
                            <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setStatusEdit(true)} />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default UserLoginDetail;