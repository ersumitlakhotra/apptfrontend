
import { Button, Input,  Select } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const UserLoginDetail = ({ username, password, setPassword, role, setRole, status, setStatus,isPasswordValid,setIsPasswordValid }) => {

    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Login Details</p>

            {/*  Username */}
            <div class='flex items-center w-full gap-2 mb-1'>
                <p class="font-semibold w-32">Username</p> 
                {username ==='' ?                 
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class="font-normal  text-red-500 w-full ">Username will be generated automatically</p>
                        </div>
                    :<p class="font-normal  w-full ">{username}</p>
                }
            </div>

            {/*  Password */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Password <span class='text-red-600'>*</span></p>
                <Input placeholder="password" status={isPasswordValid} value={password} onChange={(e) => { setPassword(e.target.value); setIsPasswordValid(e.target.value === '' ? 'error' : '') }} />   
            </div>

            {/*  Role */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Role <span class='text-red-600'>*</span></p>
                <Select
                    defaultValue={role}
                    style={{ width: '100%' }}
                    onChange={(value) => setRole(value)}
                    options={[
                        { value: 'Administrator', label: 'Administrator' },
                        { value: 'Manager', label: 'Manager' },
                        { value: 'Employee', label: 'Employee' }
                    ]}
                />
            </div>

            {/*  Active Inactive */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Status</p>
                <div class='flex flex-row items-center gap-2 w-full'>
                    <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => setStatus('Active')} >Active</Button>
                    <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => setStatus('Inactive')} >Inactive</Button>
                </div>
            </div>

        </div>
    )
}

export default UserLoginDetail;