/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Avatar, Image, Input, Tag } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { UserOutlined } from '@ant-design/icons';

const Employee = ({ userList,next , user , setUser }) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(userList);

    useEffect(() => {
        const searchedList = userList.filter(item =>
            (item.fullname.toLowerCase().includes(searchInput.toLowerCase()) && item.status.toLowerCase().includes('active')));

        if (searchInput === '')
            setFilteredList(userList);
        else
            setFilteredList(searchedList);

    }, [searchInput])

    return (
        <div>
            <div class='mb-4'>
                <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {filteredList.map(a => (
                <div key={a.id} class={`w-full bg-white rounded-lg p-4 shadow cursor-pointer mb-4 ${a.id === user && 'border-green-500 bg-green-200 border'}`} onClick={() => { setUser(a.id); next(); }}>
                    <div class='flex flex-col gap-3 text-gray-800 text-lg font-medium font-sans '>
                        <div class='flex flex-row gap-2 items-center'>
                            {a.profilepic !== null ?
                                <Image width={40} height={40} src={a.profilepic} style={{ borderRadius: 20 }} /> :
                                <Avatar size={40} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                            }
                            <p class="text-sm font-semibold">{a.fullname}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Employee