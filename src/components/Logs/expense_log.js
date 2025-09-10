/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UTC_LocalDateTime } from "../../common/localDate";

const ExpenseLogs = ({ dataList }) => {
    const [name, setName] = useState('');
    const [trndate, setTrndate] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        const editList = dataList[0];
        setName(editList.name);
        setTrndate(editList.trndate);
        setTotal(editList.grossamount);
    }, [])

    return (
        <ul class='list-disc ps-5'>
            <li>{name}</li>
            <li>{total}</li>
            <li>{UTC_LocalDateTime(trndate, "MMM DD,YYYY")}</li>
        </ul>
    )
}

export default ExpenseLogs;