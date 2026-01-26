import { Avatar, Image } from "antd"
import { UserOutlined } from '@ant-design/icons';

const CalenderHeader = ({userList}) => {
    return (
        <div class='w-max min-w-full h-16 p-2 border-b font-medium bg-blue-900 text-white inline-flex gap-3'>
                <p class='w-20 text-sm p-4 sticky left-0 z-50 bg-blue-900 '>Slots</p>
                {userList.filter(item => !item.status.toLowerCase().includes('inactive')).map(a => (
                    <div key={a.id} class='inline-flex gap-2 items-center px-3 w-44 '>
                        {a.profilepic !== null ?
                            <Image width={40} height={40} src={a.profilepic} style={{ borderRadius: 20 }} preview={true} /> :
                            <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        <span class='text-sm overflow-x-hidden  '>{a.fullname}</span>
                    </div>
                ))}

            </div>
    )
}

export default CalenderHeader