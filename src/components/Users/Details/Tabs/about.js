import {  Input, Radio } from "antd";
import { setCellFormat } from "../../../../common/cellformat";

const UserAbout = ({ fullname,setFullname,isFullnameValid,setIsFullnameValid ,cell,setCell,email,setEmail,address,setAddress,gender,setGender }) => {
    
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Contact Information</p>

            {/*  fullname */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Fullname <span class='text-red-600'>*</span></p>
                <Input placeholder="Full name" status={isFullnameValid} value={fullname} onChange={(e) => { setFullname(e.target.value); setIsFullnameValid(e.target.value === '' ? 'error' : '') }} />
            </div>

            {/*  Phone number */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Cell #</p>
                <Input placeholder="111-222-3333" value={cell} onChange={(e) => setCell(setCellFormat(e.target.value))} />   
            </div>

            {/*  Email */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">E-Mail</p>
                <Input placeholder="abcd@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />   
            </div>

            {/*  Address */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Address</p>
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />   
            </div>

            {/*  Gender */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Gender</p>
                <Radio.Group onChange={(e) =>  setGender(e.target.value)} value={gender} style={{ width: '100%' }}>
                    <Radio.Button value="Male">Male</Radio.Button>
                    <Radio.Button value="Female">Female</Radio.Button>
                </Radio.Group>
            </div>


        </div>
    )
}

export default UserAbout;