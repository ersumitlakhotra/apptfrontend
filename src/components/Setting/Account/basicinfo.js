import { Avatar, Button, Image } from "antd";
import { CloudUploadOutlined, UserOutlined } from '@ant-design/icons';
import { setCellFormat } from "../../../common/cellformat.js"
import Heading from "../../../common/heading.js";
import {Textbox} from "../../../common/textbox.js";
import { FcInfo } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import useAlert from "../../../common/alert.js";

const BasicInfo = ({ companyList, saveData, logoList }) => {

    const ref = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');

    const [logo, setLogo] = useState(null);
    const [logoId, setLogoId] = useState(0);

    useEffect(() => {
        if (companyList.length !== 0) {
            setName(companyList.name);
            setCell(companyList.cell);
            setEmail(companyList.email);
            if (companyList.addressinfo !== null) {
                setStreet(companyList.addressinfo[0].street);
                setCity(companyList.addressinfo[0].city);
                setPostal(companyList.addressinfo[0].postal);
                setProvince(companyList.addressinfo[0].province);
                setCountry(companyList.addressinfo[0].country);
            }
        }
    }, [companyList])

    useEffect(() => {
        if (logoList.length !== 0) {
            setLogo(logoList.logo);
            setLogoId(logoList.id)
        }
    }, [logoList])

    const setCellValue = (cellValue) => {
        setCell(setCellFormat(cellValue));
    }

    const save = async () => {
        const Body = JSON.stringify({
            name:name,
            cell:cell,
            addressinfo: [{
                street: street,
                city: city,
                province: province,
                country: country,
                postal: postal
            }]
        });
        saveData("Basic Information", "PUT", "company/address", null, Body,true,false);
    }

    const { contextHolder, error } = useAlert();

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Access the first selected file
        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJpgOrPng) {
                error('You can only upload JPG/PNG file!');
            }
            else if (!isLt2M) {
                error('Image must smaller than 2MB!');
            }
            else {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // reader.result will contain the data URL (e.g., data:image/jpeg;base64,...)
                    const base64String = reader.result;
                    const Body = JSON.stringify({
                        logo: base64String
                    });
                    saveData("Logo", logoId === 0 ? "POST" : "PUT", "logo", logoId === 0 ? null : logoId, Body);
                };

                reader.onerror = (error) => {
                    error("Error reading file:", error);
                };

                reader.readAsDataURL(file);
            }
        }
    };
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={"Basic information"} icon={<FcInfo size={26} />} />
            <div class='ml-8'>
                <div class='my-6 text-gray-500 flex gap-6'>
                    {logo !== null ?
                        <Image width={140} height={120} src={logo} style={{ borderRadius: 10 }} /> :
                        <Avatar shape='square' style={{ backgroundColor: '#f9fafb', border: 'solid', width: 140, height: 140 }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }
                    <div class='flex flex-col  justify-center gap-2'>
                        <Button type="primary" shape="default" icon={<CloudUploadOutlined />} size={24} style={{ width: '100px' }} onClick={() => {
                            ref.current.click();
                        }}>Change</Button>
                        <input type="file" ref={ref} style={{ display: 'none' }} onChange={handleFileChange} />
                        <p class='text-gray-400 text-xs'>Allowed *.jpeg, *.jpg, *.png</p>
                    </div>
                </div>

                <div class='flex flex-col gap-6  md:flex-row'>
                    <div class='md:w-1/3'> <Textbox type={'text'} label={'Name'} value={name} setValue={setName} placeholder={'Business name'} /></div>
                    <div class='md:w-1/3'> <Textbox type={'tel'} label={'Cell'} value={cell} setValue={setCellValue} placeholder={'(111)-222-3333'} /></div>
                    <div class='md:w-1/3'> <Textbox type={'email'} label={'E-Mail'} value={email} setValue={setEmail} placeholder={'name@company.com'} isDisable={true} footer="Please contact us to change your email" /></div>
                </div>

                <Textbox type={'text'} label={'Street'} value={street} setValue={setStreet} placeholder={'123 Street name'} />

                <div class='flex flex-col gap-6 mt-6 md:flex-row'>
                    <div class='md:w-1/4'> <Textbox type={'text'} label={'City'} value={city} setValue={setCity} placeholder={'City name'} /></div>
                    <div class='md:w-1/4'><Textbox type={'text'} label={'Province'} value={province} setValue={setProvince} placeholder={'Province'} /></div>
                    <div class='md:w-1/4'> <Textbox type={'text'} label={'Country'} value={country} setValue={setCountry} placeholder={'Country'} /></div>
                    <div class='md:w-1/4'> <Textbox type={'text'} label={'Postal'} value={postal} setValue={setPostal} placeholder={'Postal code'} /></div>
                </div>
            </div>

            <div class='my-4 flex justify-end items-center'>
                <Button size='large' color="primary" variant="solid" onClick={save} >Save changes</Button>
            </div>
            {contextHolder}
        </div>
    )
}

export default BasicInfo