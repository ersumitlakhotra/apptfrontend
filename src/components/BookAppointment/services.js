/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { CheckSquareFilled } from '@ant-design/icons';

const Services = ({ servicesList, servicesItem, setServicesItem}) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredList, setFilteredList] = useState(servicesList);

    useEffect(() => {
        const searchedList = servicesList.filter(item =>
        (item.name.toLowerCase().includes(searchInput.toLowerCase()) && !item.status.toLowerCase().includes('inactive')));
           
            setFilteredList(searchedList);


    }, [searchInput, servicesList])

    const addService = (id) => {
        setServicesItem([...servicesItem, id]);
    }
    const removeService = (id) => {
        setServicesItem(prevItems => prevItems.filter(item => item !== id));
    }

    // setItems(prevItems => prevItems.filter(item => item !== itemToRemove));
    return (
        <div class='flex flex-col font-normal mt-2 mb-10 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Add services to your appointment</p>
            <div class='mb-4'>
            <Input size="middle" placeholder="Search" prefix={<IoSearchOutline />} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {filteredList.map(item => (
                <div key={item.id} class={`w-full border-t p-2 flex flex-row justify-between items-center`}>
                    <div class='flex flex-col items-start gap-1 w-9/12 '>
                        <p class="text-sm font-semibold">{item.name}</p>
                        <p class='text-xs text-gray-400  '>{item.description}</p>
                       
                        <div class='flex flex-row mt-1 gap-1 items-center  text-gray-700'>
                            <p class='bg-gray-100 w-10 p-1 text-xs text-gray-600 font-semibold font-sans border-r shadow-md rounded-r-md'>
                                $ {item.price}
                            </p>
                            <p style={{ fontSize: 11, fontWeight: 500, marginLeft: 8 }}>{item.timing}</p>
                        </div>                                      
                    </div>
                    <div class='flex flex-row justify-center items-center w-20'>
                        {
                            servicesItem.filter(b => b === item.id).length > 0 ?
                                <CheckSquareFilled style={{ color: 'green', fontSize: 24 }} onClick={() => removeService(item.id)} /> :
                                <Button color="default" variant="outlined" onClick={() => addService(item.id)}> Select </Button>
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Services

{/*
    <div class='flex flex-row gap-1 items-center '>
                            
                            <div class='flex flex-row gap-1'>
                                <div class={`flex items-center ${liveList.filter(b => b.serviceinfo[0] === a.id).length > 0 && 'line-through'}`}>
                                    <Tag color={`${liveList.filter(b => b.serviceinfo[0] === a.id).length > 0 ? 'blue':'green'}`}>$ {a.price}</Tag>
                                </div>
                                {liveList.filter(b => b.serviceinfo[0] === a.id).map(c => <Tag color='green'>$ {c.total}</Tag> )}
                            </div>
                        </div>
                         const onService_Select=(id,name,price) => {
        setService(id); 
        setServiceName(name);
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
    }
                        
                        
                        */}