/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { get_Date, LocalDate } from "../../common/localDate";
import AssignedTo from "../../common/assigned_to";

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
            <li><AssignedTo userId={assigned_to} userList={userList} /></li>
            <li>{`${get_Date(fromdate,"MMM DD,YYYY")} - ${get_Date(todate,"MMM DD,YYYY")} `}</li>
            <li>${netamount} {ptype === 'Payroll' ? '-':'+'} ${taxamount} = ${grossamount}</li>
           
        </ul>
    )
}

export default PaymentLogs;