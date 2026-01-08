import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';

const AssignedTo = ({ userId, userList, style = 'font-bold', imageWidth = 31, imageHeight = 31, AvatarSize = 30, allowText = true, preview = true }) => {
    if (userId === '0') {
        return '';
    }
    else if (userId === -1)
    {
        return (
        <div key={userId} class='flex flex-row gap-2 items-center'>
            <Avatar size={AvatarSize} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />   
            {allowText && <span class={`text-sm  text-nowrap whitespace-nowrap ${style} `}>Any</span>}
        </div> 
        )
    }
    else {
        return (
            userList.filter(user => user.id === userId).map(a =>
                <div key={a.id} class='flex flex-row gap-2 items-center'>
                    {a.profilepic !== null ?
                        <Image width={imageWidth} height={imageHeight} src={a.profilepic} style={{ borderRadius: 15 }} preview={preview} /> :
                        <Avatar size={AvatarSize} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }
                    {allowText && <span class={`text-sm  text-nowrap whitespace-nowrap ${style} `}>{a.fullname}</span>}
                </div>
            ))
    }
}
export default AssignedTo;