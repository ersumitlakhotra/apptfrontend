
import { Button, Input,  Select } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TextboxFlex } from "../../common/textbox";

const UserLoginDetail = ({ username, password, setPassword, role, setRole, status, setStatus }) => {

    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Login Details</p>

            <TextboxFlex label={'Username'} input={
                username === '' ?
                    <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                        <p class="font-normal  text-red-500 w-full ">Username will be generated automatically</p>
                    </div>
                    : <p class="font-normal  w-full ">{username}</p>       
            } />

            <TextboxFlex label={'Password'} mandatory={true} input={
                <Input placeholder="password" status={password === '' ? 'error' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
            } />

            <TextboxFlex label={'Role'} input={
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
            } />

            <TextboxFlex label={'Status'} input={
                <div class='flex flex-row items-center gap-2 w-full'>
                    <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => setStatus('Active')} >Active</Button>
                    <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => setStatus('Inactive')} >Inactive</Button>
                </div>
            } />      

        </div>
    )
}

export default UserLoginDetail;