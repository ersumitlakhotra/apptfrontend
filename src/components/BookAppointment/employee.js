/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Image } from "antd";
import { UserOutlined, CheckSquareFilled } from '@ant-design/icons';
import { useState ,useEffect} from "react";

const Employee = ({ userList, user, setUser }) => {
    const [filteredList, setFilteredList] = useState(userList);

    useEffect(() => {
        setFilteredList(userList);
    }, [userList])

    return (
        <div class='flex flex-col font-normal mt-2 mb-10 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Choose professional</p>

            {filteredList.filter(f => !f.status.toLowerCase().includes('inactive')).map(item => (
                <div key={item.id} class={`w-full border-b p-4 flex flex-row justify-between items-center`}>
                    <div class='flex flex-row gap-4 items-center'>
                        {item.profilepic !== null ?
                            <Image width={40} height={40} src={item.profilepic} style={{ borderRadius: 20 }} /> :
                            <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        <p class="text-sm font-semibold">{item.fullname}</p>
                    </div>
                    <div class='flex flex-row justify-center items-center w-20'>
                        {
                            item.id === user ?
                                <CheckSquareFilled style={{ color: 'green', fontSize: 24 }} /> :
                                <Button color="default" variant="outlined" onClick={() => setUser(item.id)}> Select </Button>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Employee