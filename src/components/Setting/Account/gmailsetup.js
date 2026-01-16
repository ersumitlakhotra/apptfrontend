import { Button } from "antd";
import Heading from "../../../common/heading";
import {MailFilled} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Textbox } from "../../../common/textbox";

const GmailSetup = ({ companyList, saveData }) => {
    const [emailUser, setEmailUser] = useState('');
    const [emailPass, setEmailPass] = useState('');

    useEffect(() => {
        if (companyList.length !== 0) {
            if(companyList.emailuser !== null)
            setEmailUser(companyList.emailuser);
        
            if(companyList.emailpass !== null)
            setEmailPass(companyList.emailpass);
        }
    }, [companyList])

    const save = async () => {
        const Body = JSON.stringify({
            emailuser: emailUser,
            emailpass: emailPass,
        });
        saveData("Gmail Notification", "PUT", "company/emailsetup", null, Body,true,false);
    }
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={"Gmail Notification Setup"} Icon={<MailFilled />} desc={'Send Automatic e-mail notification to customers. '} />
            <div class='flex flex-col gap-6 mx-6 md:flex-row'>
                <div class='md:w-1/3'> <Textbox type={'text'} label={'E-Mail Id'} value={emailUser} setValue={setEmailUser} placeholder={'abc@gmail.com'} /></div>
                <div class='md:w-1/3'> <Textbox type={'password'} label={'App Password'} value={emailPass} setValue={setEmailPass} placeholder={'****'} /></div>              
            </div>
            <div class='mx-6 flex justify-end '>
                <Button size='large' color="primary" variant="solid" onClick={save} >Save changes</Button>
            </div>

        </div>
    )
}
export default GmailSetup;

