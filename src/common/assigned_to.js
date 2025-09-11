import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';

const AssignedTo = ({ userId, userList,style='',imageWidth=31,imageHeight=31,AvatarSize=30 }) => {
    if (userId === '0') {
        return '';
    }
    else {
        return (
            userList.filter(user => user.id === userId).map(a =>
                <div key={a.id} class='flex flex-row gap-2 items-center'>
                    {a.profilepic !== null ?
                        <Image width={imageWidth} height={imageHeight} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                        <Avatar size={AvatarSize} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }
                    <span class={`${style}`}>{a.fullname}</span>
                </div>
            ))
    }
}
export default AssignedTo;