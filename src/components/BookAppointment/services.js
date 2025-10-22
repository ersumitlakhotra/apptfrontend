/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Input, Tag } from "antd";
import { IoSearchOutline } from "react-icons/io5";

const Services = ({ servicesList, next, service, setService }) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(servicesList);

    useEffect(() => {
        const searchedList = servicesList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) && item.status.toLowerCase().includes('active')));
       
        if (searchInput === '')
            setFilteredList(servicesList);
        else
            setFilteredList(searchedList);

    }, [searchInput])

    return (
        <div>
            <div class='mb-4'>
            <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {filteredList.map(a => (
                <div key={a.id} class={`w-full bg-white rounded-lg p-4 shadow cursor-pointer mb-4 ${a.id === service && 'border-green-500 bg-green-200 border'}`} onClick={() => { setService(a.id); next(); }}>
                    <div class='flex flex-col gap-3 text-gray-800 text-lg font-medium font-sans '>
                        <div class='flex flex-col'>
                            {a.name}
                            <p class='text-gray-400 text-sm font-normal'>{a.description}</p>
                        </div>
                        <div class='flex flex-row gap-1'>
                            <Tag color='orange'>{a.timing}</Tag>
                            <Tag color='blue'>$ {a.price}</Tag>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Services