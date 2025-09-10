/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LocalDate } from "../../common/localDate";
import dayjs from 'dayjs';

const PaymentLogs = ({ dataList, userList }) => {
    const [ptype, setPtype] = useState('Payroll');
    const [fromdate, setFromDate] = useState(LocalDate());
    const [todate, setToDate] = useState(LocalDate());
    const [assigned_to, setAssignedTo] = useState('');
    const [netamount, setNetAmount] = useState('0.00');
    const [taxamount, setTaxAmount] = useState('0.00');
    const [grossamount, setGrossAmount] = useState('0.00');

    useEffect(() => {
        const editList = dataList[0];
        setPtype(editList.ptype);
        setFromDate(editList.fromdate);
        setToDate(editList.todate);
        setAssignedTo(editList.assignedto);
        setNetAmount(editList.netamount);
        setTaxAmount(editList.taxamount);
        setGrossAmount(editList.grossamount);
    }, [])

    return (
        <ul class='list-disc ps-5'>
            <li>{ptype}</li>
            <li>{assigned_to === '0' ? '' :
                userList.filter(user => user.id === assigned_to).map(a =>                           
                        <p>{a.fullname}</p>
                )}</li>
            <li>{`${dayjs(fromdate).format("MMM DD,YYYY")} - ${dayjs(todate).format("MMM DD,YYYY")} `}</li>
            <li>${netamount} {ptype === 'Payroll' ? '-':'+'} ${taxamount} = ${grossamount}</li>
           
        </ul>
    )
}

export default PaymentLogs;