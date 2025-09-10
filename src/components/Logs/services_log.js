/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Tags } from "../../common/tags";

const ServicesLogs = ({ dataList }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [timing, setTiming] = useState('');
    const [status, setStatus] = useState('0');

    useEffect(() => {
        const editList = dataList[0];
        setName(editList.name);
        setPrice(editList.price);
        setTiming(editList.timing);
        setStatus(editList.status);
    }, [])

    return (
        <div class='flex flex-col font-normal gap-2 text-xs'>
            <ul class='list-disc ps-5'>
                <li>{name}</li>
                <li>$ {price}</li>
                <li>{timing}</li>
                <li>{Tags(status)}</li>
            </ul>

        </div>
    )
}

export default ServicesLogs;