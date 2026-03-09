import { Button, Modal } from "antd";
import Heading from "../../../common/heading";
import { MailFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Textbox } from "../../../common/textbox";
import step2verification from '../../../Images/gif/2stepVerification.gif'
import apppassword from '../../../Images/gif/app_password.gif'
import apppasswordcreate from '../../../Images/gif/app_password_create.gif'
import { apiCalls } from "../../../hook/apiCall";
import { getStorage } from "../../../common/localStorage";
import useAlert from "../../../common/alert";
import { useOutletContext } from "react-router-dom";

const GmailSetup = ({ companyList, saveData }) => {
    const [businessName, setBusinessName] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [emailPass, setEmailPass] = useState('');
    const headingLabel = 'Gmail Notification';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { contextHolder, success,error} = useAlert();
    const {setIsLoading} = useOutletContext()

    useEffect(() => {
        if (companyList.length !== 0) {
            setBusinessName(companyList.name)
            if (companyList.emailuser !== null)
                setEmailUser(companyList.emailuser);

            if (companyList.emailpass !== null)
                setEmailPass(companyList.emailpass);
        }
    }, [companyList])

    const save = async () => {
        const Body = JSON.stringify({
            emailuser: emailUser,
            emailpass: emailPass.trim().replace(/\s+/g, ""),
        });
        saveData({
            label: headingLabel,
            method: "PUT",
            endPoint: "company/emailsetup",
            body: Body
        });
    }

    const sendEmail = async () => {
        setIsLoading(true)
        const localStorage = await getStorage();
        const Subject = `${process.env.REACT_APP_PROJECT_NAME} Gmail Connectivity Test`;

        let message = '<p>Hi ' + businessName + '</p>';
        message += '<p>This email serves as a test to confirm that connectivity was established successfully.</p><br/>';
        message += `<p>In case you were not trying to test your email connectivity & are seeing this email, please contact us at ${process.env.REACT_APP_SUPPORT_EMAIL}</p>`;

        const Body = JSON.stringify({ 
            emailUser: emailUser,
            emailPass: emailPass,
            storeName: businessName,
            to: emailUser,
            subject: Subject,
            message: message,
        });
        try {
            const res = await apiCalls("POST", "sendmail", localStorage.cid, null, Body);
            if (res.status===200)
                success("The test email was successfully sent to " + emailUser)
            else
                error(`Error when sending the test email to ${emailUser}; please refer to the tutorial.`)
        }
        catch (e) {
            error(`Error when sending the test email to ${emailUser}; please refer to the tutorial.`)
        }
        
        setIsLoading(false)
    }

    return (
        <div id="gmailsetup" class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={`${headingLabel} Setup`} Icon={<MailFilled />} desc={'Send Automatic e-mail notification to customers. '} />
            <div class='flex flex-col gap-6 mx-6 md:flex-row'>
                <div class='md:w-1/3'> <Textbox type={'text'} label={'E-Mail Id'} value={emailUser} setValue={setEmailUser} placeholder={'abc@gmail.com'} /></div>
                <div class='md:w-1/3'> <Textbox type={'password'} label={'App Password'} value={emailPass} setValue={setEmailPass} placeholder={'****'} /></div>
            </div>
            <div className="mx-6 flex flex-col md:flex-row  justify-between gap-2">
                <div className="flex gap-3">
                    <Button size='large' color="primary" variant="outlined" onClick={() => setIsModalOpen(true)}>Setup Tutorial</Button>
                    <Button size='large' color="primary" variant="outlined" onClick={() => sendEmail()} >Send Test Email</Button>
                </div>
                <div class='flex justify-end '>
                    <Button size='large' color="primary" variant="solid" onClick={save} >Save changes</Button>
                </div>
            </div>
            <Modal
                title="Gmail setup tutorial"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
                        OK
                    </Button>,
                ]}
            >
                <ol className="list-decimal list-inside space-y-4">
                    <li dangerouslySetInnerHTML={{ __html: `Login into <b>Gmail Account -> Manage Account -> Security & sign-in </b>` }} />
                    <li>
                        <span>Turn on <b>2 Step Verification.</b></span>
                        <img
                            draggable={false}
                            alt="2stepVerification.gif"
                            src={step2verification}
                        />
                    </li>
                    <li>
                        <span>Type <b>App Passwords</b> in search,click, and navigate to that page.</span>
                        <img
                            draggable={false}
                            alt="app_password.gif"
                            src={apppassword}
                        />
                    </li>
                    <li >
                        <span dangerouslySetInnerHTML={{ __html: `Type <b>App Name -> </b>click <b>CREATE</b> then copy , paste password in <b>App Password field and Save.</b>` }} />
                        <img
                            draggable={false}
                            alt="app_password_create.gif"
                            src={apppasswordcreate}
                        />
                    </li>
                </ol>
            </Modal>
            {contextHolder}
        </div>
    )
}
export default GmailSetup;



