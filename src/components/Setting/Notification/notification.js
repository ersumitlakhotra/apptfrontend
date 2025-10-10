import { Divider, Switch } from "antd";
import Heading from "../../../common/heading"
import { MailFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Notification = () => {
    return (
        <div class='flex flex-col gap-8'>
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Email"} icon={<MailFilled />} />
                <div class='ml-8 my-4 flex flex-col gap-2'> 
                    <div class='flex justify-between'>              
                        <p class='font-medium text-gray-700'>Product updates </p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal'>News, announcements, and product updates.</p>
                    <Divider/>

                    <div class='flex justify-between'>
                        <p class='font-medium text-gray-700'>Security updates </p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal'>Important notifications about your account security.</p>         
                    
                </div>
            </div>

            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                <Heading label={"Phone"} icon={<MailFilled  />} />
                <div class='ml-8 my-4 flex flex-col gap-2'>                

                    <div class='flex justify-between'>
                        <p class='font-medium text-gray-700'>Security updates </p>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </div>
                    <p class='text-gray-400 text-sm font-normal'>Important notifications about your account security.</p>
                    
                </div>
            </div>
        </div>
    )

}

export default Notification