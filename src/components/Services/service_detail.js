
import { useEffect, useImperativeHandle, useState } from "react";
import { Button, Input, Select } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import useAlert from "../../common/alert";

const ServiceDetail = ({ id, refresh, ref, servicesList, saveData, setOpen }) => {

    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState('error');

    const [price, setPrice] = useState('');
    const [isPriceValid, setIsPriceValid] = useState('error');

    const [timing, setTiming] = useState('30 Minute');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');

    const { contextHolder, error } = useAlert();

    useEffect(() => {
        if (id === 0) {
            setName(''); setIsNameValid('error'); setPrice(''); setIsPriceValid('error');setDescription(''); setTiming('30 Minute'); setStatus('Active');
        }
        else {
            const editList = servicesList.find(item => item.id === id)
            setName(editList.name);
            setIsNameValid(editList.name === '' ? 'error':'')
            setPrice(editList.price);
            setIsPriceValid(editList.price === '' ? 'error' : '')
            setTiming(editList.timing);
            setStatus(editList.status);
            setDescription(editList.description);
        }
    }, [refresh])

    const save = async () => {      
        if(isNameValid ==='' && isPriceValid ==='')
        {
            const Body = JSON.stringify({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                price: price,
                timing: timing,
                status: status,
                description: description,
            });
           saveData("Services", id !== 0 ? 'PUT' : 'POST', "services", id !== 0 ? id : null, Body);
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
            setPrice(inputValue);
            setIsPriceValid(inputValue === '' ? 'error' : '')
        }
    };
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Service Information</p>

            {/*  title */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Name <span class='text-red-600'>*</span></p>
                <Input placeholder="Name" status={isNameValid} value={name} onChange={(e) => { setName(e.target.value); setIsNameValid(e.target.value === '' ? 'error' : '') }} />
            </div>

            {/*  price */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Price ($)<span class='text-red-600'>*</span> </p>
                <Input placeholder="Price" status={isPriceValid} value={price} onChange={setPriceNumberOnly} />              
            </div>

            {/*  timing */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Time <span class='text-red-600'>*</span> </p>
                <Select
                    value={timing}
                    style={{ width: '100%' }}
                    onChange={(e) => setTiming(e)}
                    options={[
                        { value: '15 Minute', label: '15 Minute' },
                        { value: '30 Minute', label: '30 Minute' },
                        { value: '45 Minute', label: '45 Minute' },
                        { value: '1 Hour', label: '1 Hour' },
                        { value: '2 Hour', label: '2 Hour' },
                    ]}
                />
            </div>

            {/*  desc */}
            <div class='flex w-full gap-2'>
                <p class="font-semibold w-32 ">Description</p>
                <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>

            {/*  Active Inactive */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Status</p>
                <div class='flex flex-row items-center gap-2 w-full'>
                    <Button color={`${status === 'Active' ? 'cyan' : 'default'}`} variant="outlined" icon={<CheckOutlined />} onClick={() => setStatus('Active')} >Active</Button>
                    <Button color={`${status === 'Inactive' ? 'danger' : 'default'}`} variant="outlined" icon={<CloseOutlined />} onClick={() => setStatus('Inactive')} >Inactive</Button>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default ServiceDetail;