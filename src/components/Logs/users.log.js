/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Tags } from "../../common/tags";

const UsersLogs = ({ dataList }) => {
    const [name, setName] = useState('');
    const [cell, setCell] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('0');

    useEffect(() => {
        const editList = dataList[0];
        setName(editList.fullname);
        setCell(editList.cell);
        setRole(editList.role);
        setStatus(editList.status);
    }, [])

    return (
        <ul class='list-disc ps-5'>
            <li>{name} ({role})</li>
            <li>{cell}</li>
            <li>{Tags(status)}</li>
        </ul>
    )
}

export default UsersLogs;