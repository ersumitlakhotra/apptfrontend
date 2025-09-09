/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useState } from "react";
import { Avatar, DatePicker, Image, Input, Radio, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { TextboxFlex } from "../../common/textbox";
import { LocalDate } from "../../common/localDate";

import dayjs from 'dayjs';
import useAlert from "../../common/alert";

const PaymentsDetail = ({ id, refresh, ref, expensesList, userList, saveData, setOpen }) => {

    const [etype, setEtype] = useState('Payment');
    const [ptype, setPtype] = useState('Payroll');
    const [fromdate, setFromDate] = useState(LocalDate());
    const [todate, setToDate] = useState(LocalDate());
    const [assigned_to, setAssignedTo] = useState('');
    const [netamount, setNetAmount] = useState('0.00');
    const [taxamount, setTaxAmount] = useState('0.00');
    const [grossamount, setGrossAmount] = useState('0.00');
    const [notes, setNotes] = useState('');

    const { contextHolder, warning } = useAlert();
    useEffect(() => {
        if (id === 0) {
            setEtype('Payment'); setPtype('Payroll'); setFromDate(LocalDate()); setToDate(LocalDate()); setAssignedTo(''); setNetAmount('0.00'); setTaxAmount('0.00'); setGrossAmount('0.00'); setNotes('');
        }
        else {
            const editList = expensesList.find(item => item.id === id)
            setEtype(editList.etype);
            setPtype(editList.ptype);
            setFromDate(editList.fromdate);
            setToDate(editList.todate);
            setAssignedTo(editList.assignedto);
            setNetAmount(editList.netamount);
            setTaxAmount(editList.taxamount);
            setGrossAmount(editList.grossamount);
            setNotes(editList.notes);
        }
    }, [refresh])

    const save = async () => {    
        const result = expensesList.filter(a => a.assignedto === assigned_to.toString() && a.etype.toUpperCase() === 'PAYMENT' &&
                ((fromdate >= dayjs(a.fromdate).format('YYYY-MM-DD') &&  fromdate <= dayjs(a.todate).format('YYYY-MM-DD') ) ||
                (todate >= dayjs(a.fromdate).format('YYYY-MM-DD') && todate <= dayjs(a.todate).format('YYYY-MM-DD')))
        )
        if (fromdate !== '' && todate !== '' && netamount !== '.' && netamount !== '' && taxamount !== '.' && taxamount !== '' && grossamount !== '.' && grossamount !== '' && result.length === 0 ) {
            const Body = JSON.stringify({
                etype: etype,
                ptype: ptype,
                trndate: fromdate,
                fromdate: fromdate,
                todate: todate,
                assignedto:assigned_to,
                netamount: netamount,
                taxamount: taxamount,
                grossamount: grossamount,
                notes: notes
            });
            saveData("Payment", id !== 0 ? 'PUT' : 'POST', "payment", id !== 0 ? id : null, Body);
            setOpen(false);
        }
        else if (result.length > 0 && fromdate !== '' && todate !== '' ){
                warning('Payment have already been made for this time period!');      
        }
    }


    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })

    const setPriceNumberOnly = (event, setPrice) => {
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
    useEffect(() => {
        let net = 0; let tax = 0; let total = 0
        net = parseFloat(netamount);
        tax = parseFloat(taxamount);
        if (ptype === "Payroll")
        total = net - tax;
        else if (ptype === "Corporation")
            total = net + tax;

        if (isNaN(total))
            setGrossAmount(0);
        else
            setGrossAmount(total.toFixed(2));
    }, [ptype,netamount, taxamount])

    const pTypeChange = ({ target: { value } }) => {
    setPtype(value);
  };
  
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Payment Information</p>

            <TextboxFlex label={'Type'} mandatory={true} input={
                <Radio.Group options={['Payroll', 'Corporation']}  value={ptype} onChange={pTypeChange} />
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


            <TextboxFlex label={'From'} mandatory={true} input={
                <DatePicker status={fromdate === '' ? 'error' : ''} style={{ width: '100%' }} value={fromdate === '' ? fromdate : dayjs(fromdate, 'YYYY-MM-DD')} onChange={(date, dateString) => setFromDate(dateString)} />
            } />
            <TextboxFlex label={'To'} mandatory={true} input={
                <DatePicker status={todate === '' ? 'error' : ''} style={{ width: '100%' }} value={todate === '' ? todate : dayjs(todate, 'YYYY-MM-DD')} onChange={(date, dateString) => setToDate(dateString)} />
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

            {contextHolder}
        </div>
    )
}

export default PaymentsDetail;