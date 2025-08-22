
import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, Button, DatePicker, Image, Input, Select } from "antd";
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { TextboxFlex } from "../../common/textbox";
import { LocalDate } from "../../common/localDate";

import dayjs from 'dayjs';

const ExpenseDetail = ({ id, refresh, ref, expensesList, userList, saveData, setOpen }) => {

    const [etype, setEtype] = useState('Pay');
    const [trndate, setTrnDate] = useState(LocalDate());
    const [assigned_to, setAssignedTo] = useState('');
    const [amount, setAmount] = useState('0.00');
    const [notes, setNotes] = useState('');


    useEffect(() => {
        if (id === 0) {
            setEtype('Pay'); setTrnDate(LocalDate()); setAssignedTo(''); setAmount('0.00'); setNotes('');
        }
        else {
            const editList = expensesList.find(item => item.id === id)
            setEtype(editList.etype);
            setTrnDate(editList.trndate);
            setAssignedTo(editList.assignedto);
            setAmount(editList.amount);
            setNotes(editList.notes);
        }
    }, [refresh])

    const save = async () => {
        if (trndate !== '' && amount !== '' && amount !== '.' && assigned_to !== '') {
            const Body = JSON.stringify({
                etype: etype,
                trndate: trndate,
                assignedto: assigned_to,
                amount: amount,
                notes: notes
            });
            saveData("Expense", id !== 0 ? 'PUT' : 'POST', "expense", id !== 0 ? id : null, Body);
            setOpen(false);
        }
    }


    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })

    const setPriceNumberOnly = (event) => {
        const inputValue = event.target.value;
        // Regex to allow numbers and a single decimal point
        // It matches:
        // ^\d*$: zero or more digits at the beginning
        // (\.\d*)?$: optionally a decimal point followed by zero or more digits at the end
        const regex = /^\d*(\.\d*)?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setAmount(inputValue);
        }
    };
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Expense Information</p>

          

            <TextboxFlex label={'Date'} mandatory={true} input={
                <DatePicker status={trndate === '' ? 'error' : ''} style={{ width: '100%' }} value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')} onChange={(date, dateString) => setTrnDate(dateString)} />
            } />

            <TextboxFlex label={'Employee'} mandatory={true} input={
                <Select
                    value={assigned_to}
                    style={{ width: '100%' }}
                    status={assigned_to === '' ? 'error' : ''}
                    onChange={(value) => setAssignedTo(value)}
                    options={userList.map(item => ({
                        value: item.id,
                        label:
                            <div class='flex flex-row gap-2 items-center'>
                                {item.profilepic !== null ?
                                    <Image width={31} height={31} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                    <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                }
                                <p>{item.fullname}</p>
                            </div>
                    }))}
                />
            } />
            <TextboxFlex label={'Amount ($)'} mandatory={true} input={
                <Input placeholder="Amount" status={(amount === '' || amount === '.') ? 'error' : ''} value={amount} onChange={setPriceNumberOnly} />
            } />
            <TextboxFlex label={'Notes'} input={
                <TextArea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            } />


        </div>
    )
}

export default ExpenseDetail;