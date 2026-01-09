/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { CheckSquareFilled, CalendarOutlined } from '@ant-design/icons';
import { get_Date, LocalDate } from "../../common/localDate";

const Services = ({ servicesList, eventList, servicesItem, setServicesItem}) => {
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
            {filteredList.map(item => {
                let list = eventList.filter(event => event.case.toUpperCase() !== 'PAST' && event.serviceinfo[0] === item.id); 
                let _isDiscountApplied =false;
                let _price = 0;
                let percentage=0;
                let start = LocalDate();
                let end = LocalDate();
                if (list.length > 0)
                {
                    _isDiscountApplied=true;
                    _price = list[0].total;
                    percentage = parseInt((parseFloat(list[0].discount).toFixed(2) / parseFloat(item.price).toFixed(2)) * 100);
                    start = list[0].startdate;
                    end = list[0].enddate;
                }
               
            return(      
                <div key={item.id} class={`w-full border-t p-2 flex flex-row justify-between items-center`}>
                    <div class='flex flex-col items-start gap-1 w-9/12 '>
                        <p class="text-sm font-semibold">{item.name}</p>
                        <p class='text-xs text-gray-400  '>{item.description}</p>
                       
                        <div class='flex flex-row mt-1 gap-1 items-center  text-gray-700'>                                      
                            <div class='bg-gray-100 py-1 px-2  text-gray-600 font-semibold font-sans border-r shadow-md rounded-r-md flex items-center gap-2'>
                                {_isDiscountApplied ?
                                    <>
                                        <span class="relative text-sm font-bold text-black  before:absolute before:inset-0 before:top-1/2 before:h-[2px] before:bg-red-500 before:rotate-[-15deg]">
                                            $ {parseFloat(item.price).toFixed(2)}
                                        </span>
                                        <span class="text-sm font-bold text-black">$ {parseFloat(_price).toFixed(2)}</span>
                                    </>
                                    : <>
                                        <span class="relative text-sm font-bold text-black  ">
                                            $ {parseFloat(item.price).toFixed(2)}
                                        </span>
                                    </>
                                }
                            </div>     
                            <p style={{ fontSize: 11, fontWeight: 500, marginLeft: 8 }}>{item.timing}</p>
                        </div>
                        {_isDiscountApplied &&
                            <div class='flex flex-row gap-2 items-center'>
                                <span class="text-xs text-white bg-red-500 px-2 py-0.5 rounded">
                                    -{percentage}%
                                </span>
                                <CalendarOutlined />
                                <span class="text-xs ">{get_Date(start, 'MMM, DD YYYY')} - {get_Date(end, 'MMM, DD YYYY')}</span>
                            </div>
                        }                              
                    </div>
                    <div class='flex flex-row justify-center items-center w-20'>
                        {
                            servicesItem.filter(b => b === item.id).length > 0 ?
                                <CheckSquareFilled style={{ color: 'green', fontSize: 24 }} onClick={() => removeService(item.id)} /> :
                                <Button color="default" variant="outlined" onClick={() => addService(item.id)}> Select </Button>
                        }
                    </div>

                </div>
            )})}
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