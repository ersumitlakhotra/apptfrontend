
import { Avatar, Button, Image } from "antd";
import { EditOutlined, UserOutlined } from '@ant-design/icons';

const ViewBooking = ({ title, value,content,setContent,setOpenOrder}) => {
    return (
        <div class='flex flex-col font-normal gap-1 w-full text-xs' >
           <p class='font-medium ms-1'>{title}</p>
           <div class={`flex flex-row justify-between items-center p-2 bg-white shadow-md border rounded-md`}>
            {value}
            <Button color="default" variant="solid"  shape="circle" icon={<EditOutlined />} onClick={() => {setContent(content);setOpenOrder(false);}} />
           </div>
        </div>
    )
}

export default ViewBooking