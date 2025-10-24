/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Input, Tag } from "antd";
import { IoSearchOutline } from "react-icons/io5";

const Services = ({ servicesList, eventList, next, service, setService ,setPrice,setDiscount,setTotal,setCoupon}) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(servicesList);
    const [liveList, setLiveList] = useState([]);

    useEffect(() => {
        const searchedList = servicesList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) && item.status.toLowerCase().includes('active')));
       
        if (searchInput === '')
            setFilteredList(servicesList);
        else
            setFilteredList(searchedList);

        const liveList = eventList.filter(a => a.case.toUpperCase() === 'LIVE');
        setLiveList(liveList.length > 0 ? liveList : [])

    }, [searchInput, servicesList, eventList])

    const onService_Select=(id,price) => {
        setService(id); 
        setPrice(price);
        setDiscount('0');
        setCoupon('');
        setTotal(price);  
        liveList.filter(b => b.serviceinfo[0] === id).map(c =>{
            setDiscount(c.discount);
            setCoupon(c.coupon);
            setPrice(c.price); 
            setTotal(c.total); 
        })
        next();
    }

    return (
        <div>
            <div class='mb-4'>
            <Input size="large" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {filteredList.map(a => (
                <div key={a.id} class={`w-full bg-white rounded-lg p-4 shadow cursor-pointer mb-4 ${a.id === service && 'border-green-500 bg-green-200 border'}`} onClick={() => onService_Select(a.id,a.price)}>
                    <div class='flex flex-col gap-3 text-gray-800 text-lg font-medium font-sans '>
                        <div class='flex flex-col'>
                            {a.name}
                            <p class='text-gray-400 text-sm font-normal'>{a.description}</p>
                        </div>
                        <div class='flex flex-row gap-1 items-center '>
                            <Tag color='orange'>{a.timing}</Tag>
                            
                            <div class='flex flex-row gap-1'>
                                <div class={`flex items-center ${liveList.filter(b => b.serviceinfo[0] === a.id).length > 0 && 'line-through'}`}>
                                    <Tag color={`${liveList.filter(b => b.serviceinfo[0] === a.id).length > 0 ? 'blue':'green'}`}>$ {a.price}</Tag>
                                </div>
                                {liveList.filter(b => b.serviceinfo[0] === a.id).map(c => <Tag color='green'>$ {c.total}</Tag> )}
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Services