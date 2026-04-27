import { Divider, Switch } from "antd";
import Heading from "../../../common/heading"
import { MailFilled, CheckOutlined, CloseOutlined, PhoneFilled } from '@ant-design/icons';
import TextMessaging from "./textMessaging";
import { useEffect, useState } from "react";

const Notification = ({ companyList, logsList,billingList, saveData,viewOrder }) => {
 const headingLabel = 'Notifications';
    const [emailReminder,setEmailReminder]= useState(false)
    const [textReminder,setTextReminder]= useState(false)
    const [twillioCell,setTwillioCell]= useState('')
    const [credit,setCredit]= useState(0.00)

    useEffect(() => {
        if (companyList.length !== 0) {
            setEmailReminder(companyList.emailreminder);
            setTextReminder(companyList.textreminder);
            setTwillioCell(companyList.twilliocell);
            setCredit(companyList.credit);
        }
    }, [companyList])

    const save = async (email,text) => {
        const Body = JSON.stringify({
            emailReminder: email,
            textReminder: text,
        });
       saveData({
            label: headingLabel,
            method: "PUT",
            endPoint: "company/notification",
            body: Body
        });
    }
    return (
        <div class='flex flex-col gap-8'>
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Email"} Icon={<MailFilled />} />
                <div class='ml-8 my-4 flex flex-col gap-2'> 
                  {/*  <div class='flex justify-between'>              
                        <p class='font-medium text-gray-700'>Product updates </p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal'>News, announcements, and product updates.</p>
                    <Divider/>
                  */}

                    <div class='flex justify-between'>
                        <p class='font-medium text-gray-700'>Appointment Reminder</p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            value={emailReminder}
                            onChange={(e) => {setEmailReminder(e); save(e,textReminder)}}
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal'>Send a reminder via email one day prior to the appointment.</p>         
                    
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Text Messages"} Icon={<PhoneFilled style={{transform: 'rotate(180deg)'}} />} />
                <div class='ml-8 my-4 flex flex-col gap-2'>                

                    <div class='flex justify-between'>
                        <p class='font-medium text-gray-700'>Appointment Reminder </p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            value={textReminder}
                            onChange={(e) => {setTextReminder(e);save(emailReminder,e)}}
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal mb-4'>Send a reminder via text message one day prior to the appointment. $0.04 (4 cents) per text.</p>
                     
                    {textReminder && <TextMessaging twillioCell={twillioCell} companyList={companyList} billingList={billingList} credit={credit} logsList={logsList} saveData={saveData} viewOrder={viewOrder} />}
                </div>

               
            </div>
        </div>
    )

}

export default Notification