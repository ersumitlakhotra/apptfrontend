import { Button, Input, Radio, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { setCellFormat } from "../../common/cellformat";
import { TextboxFlex } from "../../common/textbox";
import { useEffect } from "react";
import { getStorage } from "../../common/localStorage";

const UserAbout = ({ fullname, setFullname, cell, setCell, email, setEmail, address, setAddress, gender, setGender, password, setPassword, role, setRole, status, setStatus, appschedule, setAppSchedule, isAdmin, adminEmail }) => {
    const Checked = 'On'; const Unchecked = 'Off';
    
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Contact Information</p>

            <TextboxFlex label={'Fullname'} mandatory={true} input={
                <Input placeholder="Full name" status={fullname === '' ? 'error' : ''} value={fullname} onChange={(e) => setFullname(e.target.value)} />
            } />

            {isAdmin  && <TextboxFlex label={'Role'} input={
                <Select
                    defaultValue={role}
                    value={role}
                    style={{ width: '100%' }}
                    onChange={(value) => setRole(value)}
                    options={[
                        { value: 'User', label: 'User' },
                        { value: 'Employee', label: 'Employee' }
                    ]}
                />
            } />}

            <TextboxFlex label={'E-Mail'}  input={
                <Input placeholder="abcd@company.com" value={email} disabled={adminEmail} onChange={(e) => setEmail(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" value={cell} status={cell === '' ? 'error' : ''} onChange={(e) => setCell(setCellFormat(e.target.value))} />
            } />

            <TextboxFlex label={'Password'} mandatory={true} input={
                <Input placeholder="password" status={password === '' ? 'error' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
            } />

            {/*<TextboxFlex label={'Schedule'} input={
                <div class='flex flex-row gap-2 w-full'>
                    <div class='flex-1 justify-start'>
                        <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} value={appschedule} onChange={(e) => setAppSchedule(e)} />
                    </div>
                    <p class='text-sm italic text-gray-500'>This option will allow user to add/modify the TimeSheet via app.</p>
                </div>
            } />*/}

            <TextboxFlex label={'Address'} input={
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            } />

            <TextboxFlex label={'Gender'} input={
                <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender} style={{ width: '100%' }}>
                    <Radio.Button value="Male">Male</Radio.Button>
                    <Radio.Button value="Female">Female</Radio.Button>
                </Radio.Group>
            } />

            {isAdmin &&  <TextboxFlex label={'Status'} input={
                <div class='flex flex-row items-center gap-2 w-full'>
                    <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => setStatus('Active')} >Active</Button>
                    <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => setStatus('Inactive')} >Inactive</Button>
                </div>
            } />}



        </div>
    )
}

export default UserAbout;