/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Services from "../../common/services";

const EventLogs = ({ dataList, servicesList }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [total, setTotal] = useState('0');
    const [servicesItem, setServicesItem] = useState([]);

    useEffect(() => {     
        const editList = dataList[0];
            setTitle(editList.title);
            setStartDate(editList.startdate);
            setEndDate(editList.enddate);
            setTotal(editList.total);
            setServicesItem(editList.serviceinfo);
    }, [])

    return (
        <div class='flex flex-col font-normal gap-2 text-xs'>
            <ul class='list-disc ps-5'>
                <li>{title}</li>
                <li>${total}</li>
                <li> <Services servicesItem={servicesItem} servicesList={servicesList} /></li>
                <li>{dayjs(startDate).format('ddd, MMM DD')} - {dayjs(endDate).format('ddd, MMM DD')} </li>
           </ul>

        </div>
    )
}

export default EventLogs;