/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Tags } from "../../common/tags";
import { Tag } from "antd";

const OrderLogs = ({ dataList, servicesList }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [status, setStatus] = useState('Pending');
    const [total, setTotal] = useState('0');
    const [trndate, setTrnDate] = useState('');
    const [slot, setSlot] = useState('');
    const [servicesItem, setServicesItem] = useState([]);

    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));

    useEffect(() => {
        const editList = dataList[0];
        if (editList.customerinfo !== null) {
            setCustomerName(editList.customerinfo[0].name);
            setCustomerPhone(editList.customerinfo[0].cell);
        }
        else { setCustomerName('');  setCustomerPhone(''); }
        setStatus(editList.status);
        setTrnDate(editList.trndate);
        setTotal(editList.total);
        setSlot(editList.slot);      
        setServicesItem(editList.serviceinfo);
    }, [])
    return (
        <div class='flex flex-col font-normal gap-2 text-xs'>
            <ul class='list-disc ps-5'>
                <li>{Tags(status)}</li>
                <li>${total}</li>
                <li>{customerName} ({customerPhone})</li>
                <li>{dayjs(trndate).format('DD MMM YYYY')} {slot} </li>
                <li> {servicesItem !== null &&
                    servicesList.filter(a =>
                        servicesItem.some(b => b === a.id)
                    ).map(c => <Tag key={c.id} color="cyan" bordered={false}>{c.name}</Tag>)
                }
                </li>
           </ul>

        </div>
    )
}

export default OrderLogs;