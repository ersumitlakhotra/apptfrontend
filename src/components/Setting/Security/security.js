import { Button } from "antd";
import Heading from "../../../common/heading"
import { MailFilled } from '@ant-design/icons';
import { Textbox } from "../../../common/textbox";
import { useEffect, useState } from "react";
import useAlert from "../../../common/alert";

const Security = ({ companyList, saveData }) => {
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { contextHolder, error } = useAlert();
    const headingLabel='Security'
    useEffect(() => {
        if (companyList.length !== 0) {          
            setPassword(companyList.password);
        }
    }, [companyList])

    const save = async () => {
        if (password === currentPassword) {
            const Body = JSON.stringify({
                password: newPassword,
                id:Number(localStorage.getItem('uid')),
            });
            saveData({
            label:headingLabel,
            method: "PUT", 
            endPoint:"company/security",
            body: Body
        }); 
        }
        else {
            error("Your Current password is missing or incorrect. It's required to change the password.")
        }

    }
    return (
        <div class='flex flex-col gap-8'>
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={headingLabel} Icon={<MailFilled />} />

                <div class='ml-8 my-4 flex flex-col gap-4'>
                    <div class='flex flex-col gap-6  md:flex-row'>
                        <div class='md:w-1/3'> <Textbox type={'text'} label={'Current Password'} value={currentPassword} setValue={setCurrentPassword} /></div>
                    </div>
                    <div class='flex flex-col gap-6  md:flex-row'>
                        <div class='md:w-1/3'> <Textbox type={'text'} label={'New Password'} value={newPassword} setValue={setNewPassword} /></div>
                    </div>
                </div>
                <div class='my-4 flex justify-end items-center'>
                    <Button size='large' color="primary" variant="solid" onClick={() => save()} >Save changes</Button>
                </div>
            </div>
            {contextHolder}
        </div>
    )

}

export default Security