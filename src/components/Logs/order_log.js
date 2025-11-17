/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Tags } from "../../common/tags";
import AssignedTo from "../../common/assigned_to";
import Services from "../../common/services";
import { get_Date } from "../../common/localDate";

const OrderLogs = ({ dataList, id, orderList, servicesList, userList }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [status, setStatus] = useState('Pending');
    const [total, setTotal] = useState('0');
    const [assigned_to, setAssignedTo] = useState('0');
    const [order_no, setOrderNo] = useState('');
    const [trndate, setTrnDate] = useState('');
    const [slot, setSlot] = useState('');
    const [servicesItem, setServicesItem] = useState([]);

    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));

    useEffect(() => {
        const editList = dataList[0];
        setCustomerName(editList.customerName);
        setCustomerPhone(editList.customerPhone);
        setStatus(editList.status);
        setTrnDate(editList.trndate);
        setTotal(editList.total);
        setSlot(editList.slot);
        setAssignedTo(editList.assignedto);
        setServicesItem(editList.serviceinfo);
        orderList.filter(item => item.id === id).map(a => setOrderNo(a.order_no));
    }, [])

    return (
        <div class='flex flex-col font-normal gap-2 text-xs'>
            <ul class='list-disc ps-5'>
                <li class="text-blue-500 italic"># {order_no}</li>
                <li>{Tags(status)}</li>
                <li>${total}</li>
                <li>{customerName} ({customerPhone})</li>
                <li>{get_Date(trndate,'DD MMM YYYY')} {slot} </li>
                <li><Services servicesItem={servicesItem} servicesList={servicesList} /></li>
                <li><AssignedTo userId={assigned_to} userList={userList}/></li>
           </ul>

        </div>
    )
}

export default OrderLogs;