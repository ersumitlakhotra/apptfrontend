import { useEffect, useImperativeHandle, useState } from "react";
import {  DatePicker,  Input,  Select } from "antd";
import dayjs from 'dayjs';
import { TextboxFlex } from "../../common/textbox";
import TextArea from "antd/es/input/TextArea";

const EventDetail = ({ id, refresh, ref, eventList, servicesList, saveData, setOpen }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discount, setDiscount] = useState(0);
    const [servicesItem, setServicesItem] = useState([]);

    useEffect(() => {
        if (id === 0) {
            setTitle(''); setDescription(''); setStartDate(''); setEndDate('');
             setDiscount('0');  setServicesItem([]);
        }
        else {
            const editList = eventList.find(item => item.id === id)
            setTitle(editList.title); 
            setDescription(editList.description); 
            setStartDate(editList.startdate); 
            setEndDate(editList.enddate);
            setDiscount(editList.discount);
            setServicesItem(editList.serviceinfo);
        }
    }, [refresh])

    const setPriceNumberOnly = (event) => {
        const inputValue = event.target.value;
        const regex = /^\d*(\.\d*)?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setDiscount(inputValue);
        }
    };
    const save = async () => {
        if (title !== '' && startDate !== '' && servicesItem.length !== 0 && endDate !== '' && discount !== '' && discount !== '.') {
            const Body = JSON.stringify({
                title: title,
                description: description,
                startdate: startDate,
                enddate: endDate,
                serviceinfo: servicesItem,
                discount: discount
            });
            saveData("Event", id !== 0 ? 'PUT' : 'POST', "event", id !== 0 ? id : null, Body);
            setOpen(false);
        }
    }

    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })


    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <p class="text-gray-400 mb-4">Event Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={title === '' ? 'error' : ''} value={title} onChange={(e) => setTitle(e.target.value)} />
            } />
            
            <TextboxFlex label={'Description'} input={
                <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} minLength={3} />
            } />

            <TextboxFlex label={'Start Date'} mandatory={true} input={
                <DatePicker status={startDate === '' ? 'error' : ''} style={{ width: '100%' }} value={startDate === '' ? startDate : dayjs(startDate, 'YYYY-MM-DD')} onChange={(date, dateString) => setStartDate(dateString)} />
            } />

            <TextboxFlex label={'End Date'} mandatory={true} input={
                <DatePicker status={endDate === '' ? 'error' : ''} style={{ width: '100%' }} value={endDate === '' ? endDate : dayjs(endDate, 'YYYY-MM-DD')} onChange={(date, dateString) => setEndDate(dateString)} />
            } />

            <TextboxFlex label={'Services'} mandatory={true} input={
                <Select
                    status={servicesItem.length === 0 ? 'error' : ''}
                    placeholder='Select services'
                    mode="multiple"
                    value={servicesItem}
                    style={{ width: '100%' }}
                    onChange={(value) => setServicesItem(value)}
                    options={servicesList.map(item => ({
                        value: item.id,
                        label: item.name
                    }))}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => {
                        var _a, _b;
                        return (
                            (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
                                _a !== void 0
                                ? _a
                                : ''
                        )
                            .toLowerCase()
                            .localeCompare(
                                ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
                                    _b !== void 0
                                    ? _b
                                    : ''
                                ).toLowerCase(),
                            );
                    }}
                />
            } />

            <TextboxFlex label={'Discount $'} mandatory={true} input={
                <Input placeholder="Price" status={(discount === '' || discount === '.') ? 'error' : ''} value={discount} onChange={setPriceNumberOnly} />
            } />

        </div>
    )
}


export default EventDetail;