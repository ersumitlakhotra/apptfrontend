/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useState } from "react";
import { Input } from "antd";
import { TextboxFlex } from "../../common/textbox";
import { isValidEmail, setCellFormat } from "../../common/cellformat";
import { useOutletContext } from "react-router-dom";

const CustomerDetail = ({ id, refresh, ref, setOpen }) => {
    const { saveData, customerList} = useOutletContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');

    useEffect(() => {
        if (id === 0) {
            setName(''); setEmail(''); setCell('');
        }
        else {       
            const editList = customerList.find(item => item.id === id)
            setName(editList.name);
            setEmail(editList.email);
            setCell(editList.cell);
        }
    }, [refresh])

    const save = async () => {
        if (name !== '' && email !== '' && cell !== '' && cell.length === 12 && isValidEmail(email)) {
            const Body = JSON.stringify({
                name: name,
                email: email,
                cell: cell,
            });
            saveData({
                label: "Customers",
                method: id !== 0 ? 'PUT' : 'POST',
                endPoint: "customer",
                id: id !== 0 ? id : null,
                body: Body
            });
            setOpen(false);
        }
    }


    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })


    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Customer Information</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={name === '' ? 'error' : ''} value={name} onChange={(e) => setName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={cell === '' ? 'error' : ''} value={cell} onChange={(e) => setCell(setCellFormat(e.target.value))} />
            } />


            <TextboxFlex label={'E-mail'} mandatory={true} input={
                <Input placeholder="abcd@company.com" status={email === '' || !isValidEmail(email) ? 'error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} />
            } />


        </div>
    )
}

export default CustomerDetail;