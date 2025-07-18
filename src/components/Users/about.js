import {  Input, Radio } from "antd";
import { setCellFormat } from "../../common/cellformat";
import { TextboxFlex } from "../../common/textbox";

const UserAbout = ({ fullname,setFullname,cell,setCell,email,setEmail,address,setAddress,gender,setGender }) => {
    
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Contact Information</p>

            <TextboxFlex label={'Fullname'} mandatory={true} input={
                <Input placeholder="Full name" status={fullname === '' ? 'error' : ''} value={fullname} onChange={(e) => setFullname(e.target.value)} />
            }/>

            <TextboxFlex label={'Cell #'} input={
                <Input placeholder="111-222-3333" value={cell} onChange={(e) => setCell(setCellFormat(e.target.value))} />
            } />

            <TextboxFlex label={'E-Mail'} input={
                <Input placeholder="abcd@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />  
            } />

            <TextboxFlex label={'Address'} input={
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            } />

            <TextboxFlex label={'Gender'} input={
                <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender} style={{ width: '100%' }}>
                    <Radio.Button value="Male">Male</Radio.Button>
                    <Radio.Button value="Female">Female</Radio.Button>
                </Radio.Group>
            } />

        </div>
    )
}

export default UserAbout;