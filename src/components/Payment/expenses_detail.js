
import { useEffect, useImperativeHandle, useState } from "react";
import { DatePicker,  Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TextboxFlex } from "../../common/textbox";
import { LocalDate } from "../../common/localDate";

import dayjs from 'dayjs';

const ExpensesDetail = ({ id, refresh, ref, expensesList, saveData, setOpen }) => {

    const [etype, setEtype] = useState('Expense');
    const [trndate, setTrnDate] = useState(LocalDate());
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [netamount, setNetAmount] = useState('0.00');
    const [taxamount, setTaxAmount] = useState('0.00');
    const [grossamount, setGrossAmount] = useState('0.00');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (id === 0) {
            setEtype('Expense'); setName(''); setQuantity('1'); setTrnDate(LocalDate()); setNetAmount('0.00'); setTaxAmount('0.00'); setGrossAmount('0.00'); setNotes('');
        }
        else {
            const editList = expensesList.find(item => item.id === id)
            setEtype(editList.etype);
            setTrnDate(editList.trndate);
            setName(editList.name);
            setQuantity(editList.quantity);
            setNetAmount(editList.netamount);
            setTaxAmount(editList.taxamount);
            setGrossAmount(editList.grossamount);
            setNotes(editList.notes);
        }
    }, [refresh])

    const save = async () => {
        if (trndate !== '' && name !== '' && quantity !== '.' && quantity !== '' && netamount !== '.' && netamount !== '' && taxamount !== '.' && taxamount !== '' && grossamount !== '.' && grossamount !== '' ) {
            const Body = JSON.stringify({
                etype: etype,
                trndate: trndate,
                name: name,
                quantity: quantity,
                netamount: netamount,
                taxamount: taxamount,
                grossamount: grossamount,
                notes: notes
            });
            saveData("Expense", id !== 0 ? 'PUT' : 'POST', "payment", id !== 0 ? id : null, Body);
            setOpen(false);
        }
    }


    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })

    const setPriceNumberOnly = (event,setPrice) => {
        const inputValue = event.target.value;
        // Regex to allow numbers and a single decimal point
        // It matches:
        // ^\d*$: zero or more digits at the beginning
        // (\.\d*)?$: optionally a decimal point followed by zero or more digits at the end
        const regex = /^\d*(\.\d*)?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setPrice(inputValue);
        }
    };
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Expense Information</p>

            <TextboxFlex label={'Date'} mandatory={true} input={
                <DatePicker status={trndate === '' ? 'error' : ''} style={{ width: '100%' }} value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')} onChange={(date, dateString) => setTrnDate(dateString)} />
            } />

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={name === '' ? 'error' : ''} value={name} onChange={(e) => setName(e.target.value)} />
            } />

            <TextboxFlex label={'Quantity'} mandatory={true} input={
                <Input placeholder="Quantity" status={quantity === '' ? 'error' : ''} value={quantity} onChange={(e) => setPriceNumberOnly(e, setQuantity)} />
            } />

            <TextboxFlex label={'Price ($)'} mandatory={true} input={
                <Input placeholder="Price" status={(netamount === '' || netamount === '.') ? 'error' : ''} value={netamount} onChange={(e) => setPriceNumberOnly(e, setNetAmount)} />
            } />
            <TextboxFlex label={'Tax ($)'} mandatory={true} input={
                <Input placeholder="Tax" status={(taxamount === '' || taxamount === '.') ? 'error' : ''} value={taxamount} onChange={(e) => setPriceNumberOnly(e, setTaxAmount)} />
            } />
            <TextboxFlex label={'Total ($)'} mandatory={true} input={
                <Input placeholder="Total" status={(grossamount === '' || grossamount === '.') ? 'error' : ''} value={grossamount} onChange={(e) => setPriceNumberOnly(e, setGrossAmount)} />
            } />
            <TextboxFlex label={'Notes'} input={
                <TextArea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            } />


        </div>
    )
}

export default ExpensesDetail;