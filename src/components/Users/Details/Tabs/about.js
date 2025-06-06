import { Button, DatePicker, Radio } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const UserAbout = ({ userList,key, id, FullName, Cell, Email, Address, Birthday, Gender }) => {
    const [fullname, setFullname] = useState('');
    const [fullnamePrev, setFullnamePrev] = useState('');
    const [fullnameEdit, setFullnameEdit] = useState(false);

    const [cell, setCell] = useState('');
    const [cellPrev, setCellPrev] = useState('');
    const [cellEdit, setCellEdit] = useState(false);

    const [email, setEmail] = useState('');
    const [emailPrev, setEmailPrev] = useState('');
    const [emailEdit, setEmailEdit] = useState(false);

    const [address, setAddress] = useState('');
    const [addressPrev, setAddressPrev] = useState('');
    const [addressEdit, setAddressEdit] = useState(false);

    const [birthday, setBirthday] = useState('');
    const [birthdayPrev, setBirthdayPrev] = useState('');
    const [birthdayEdit, setBirthdayEdit] = useState(false);

    const [gender, setGender] = useState('');
    const [genderPrev, setGenderPrev] = useState('');
    const [genderEdit, setGenderEdit] = useState(false);

    const [isNew, setIsNew] = useState(true);


    useEffect(() => {
        setFullname(userList.fullname);
        FullName(userList.fullname);
        setFullnamePrev(userList.fullname);
        setFullnameEdit(false);

        setCell(userList.cell);
        Cell(userList.cell);
        setCellPrev(userList.cell);
        setCellEdit(false);

        setEmail(userList.email);
        Email(userList.email);
        setEmailPrev(userList.email);
        setEmailEdit(false);

        setAddress(userList.address);
        Address(userList.address);
        setAddressPrev(userList.address);
        setAddressEdit(false);

        setBirthday(userList.birthday);
        Birthday(userList.birthday);
        setBirthdayPrev(userList.birthday);
        setBirthdayEdit(false);

        setGender(userList.gender);
        Gender(userList.gender);
        setGenderPrev(userList.gender);
        setGenderEdit(false);

        if (id === 0)
            setIsNew(true);
        else
        setIsNew(false);
    }, [userList])

    const setCellFormat = (cellValue) => {
        let phoneNumber = cellValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (phoneNumber.length > 3) {
            phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
        }
        if (phoneNumber.length > 7) {
            phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
        }
        setCell(phoneNumber);
        Cell(phoneNumber);
    }

    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <p class="text-gray-400 mb-4">Contact Information</p>

            {/*  fullname */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Fullname <span class='text-red-600'>*</span></p>
                {isNew ?
                    (
                        <input type="text" name="fullname" id="fullname" value={fullname}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Fullname" onChange={(e) => { setFullname(e.target.value); FullName(e.target.value); }} />

                    ) :
                    (fullnameEdit ?
                        <div class='flex flex-row items-center justify-between gap-2 w-full'>
                            <input type="text" name="fullname" id="fullname" value={fullname}
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Fullname" onChange={(e) => setFullname(e.target.value)} />

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setFullnamePrev(fullname); FullName(fullname); setFullnameEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setFullname(fullnamePrev); FullName(fullnamePrev); setFullnameEdit(false) }} />
                        </div>

                        :
                        <div class='flex flex-row  items-center justify-between gap-2 w-full'>
                            <p class="font-normal  text-gray-500 w-full ">{fullname}</p>
                            <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setFullnameEdit(true)} />
                        </div>
                    )
                }
            </div>

            {/*  Phone number */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Phone</p>
                {isNew ?
                    (
                        <input type="tel" name="cell" id="cell" value={cell}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="(111)-222-3333" onChange={(e) => { setCellFormat(e.target.value); Cell(e.target.value);}} />

                    ) :
                    (cellEdit ?
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <input type="tel" name="cell" id="cell" value={cell}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="(111)-222-3333" onChange={(e) => setCellFormat(e.target.value)} />
                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setCellPrev(cell); Cell(cell); setCellEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setCell(cellPrev); Cell(cellPrev); setCellEdit(false) }} />
                    </div>

                    :
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <p class="font-normal text-blue-500 w-full ">{cell}</p>
                        <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setCellEdit(true)} />
                    </div>
                    )}
            </div>

            {/*  Email */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">E-Mail</p>
                {isNew ?
                    (
                        <input type="email" name="email" id="email" value={email}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com" onChange={(e) => { setEmail(e.target.value); Email(e.target.value)}} />

                    ) :
                    (emailEdit ?
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <input type="email" name="email" id="email" value={email}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setEmailPrev(email); Email(email); setEmailEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setEmail(emailPrev); Email(emailPrev); setEmailEdit(false) }} />
                    </div>

                    :
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <p class="font-normal text-blue-500 w-full ">{email}</p>
                        <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setEmailEdit(true)} />
                    </div>
                )}
            </div>

            {/*  Address */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Address</p>
                {isNew ?
                    (
                        <input type="text" name="address" id="address" value={address}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="street address" onChange={(e) => { setAddress(e.target.value); Address(e.target.value)}} />

                    ) :
                    (addressEdit ?
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <input type="text" name="address" id="address" value={address}
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="street address" onChange={(e) => setAddress(e.target.value)} />

                        <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setAddressPrev(address); Address(address); setAddressEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setAddress(addressPrev); Address(addressPrev); setAddressEdit(false) }} />
                    </div>

                    :
                    <div class='flex flex-row justify-between gap-2 w-full'>
                        <p class="font-normal  text-gray-500 w-full ">{address}</p>
                        <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setAddressEdit(true)} />
                    </div>
                )}
            </div>


            <p class="text-gray-400 mt-5 mb-4">General Information</p>
            {/*  Birthday */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Birthday</p>
                {isNew ?
                    (
                        <DatePicker onChange={(value, dateString) => { setBirthday(dateString); Birthday(dateString); }} style={{ width: '100%' }}
                            value={(birthday !== '' && birthday !== undefined && birthday !== null) && dayjs(birthday, 'YYYY-MM-DD')} />

                    ) :
                    (birthdayEdit ?
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <DatePicker onChange={(value, dateString) => { setBirthday(dateString) }} style={{ width: '100%' }}
                            value={(birthday !== '' && birthday !== undefined && birthday !== null) && dayjs(birthday, 'YYYY-MM-DD')} />

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setBirthdayPrev(birthday); Birthday(birthday); setBirthdayEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setBirthday(birthdayPrev); Birthday(birthdayPrev); setBirthdayEdit(false) }} />
                    </div>

                    :
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <p class="font-normal text-gray-500 w-full ">{(birthday !== '' && birthday !== undefined && birthday !== null) && dayjs(birthday).format('MMM DD, YYYY')}</p>
                        <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setBirthdayEdit(true)} />
                    </div>
                )}
            </div>

            {/*  Gender */}
            <div class='flex items-center w-full gap-2'>
                <p class="font-semibold w-32">Gender</p>
                {isNew ?
                    (
                        <Radio.Group onChange={(e) => { setGender(e.target.value); Gender(e.target.value)}} value={gender} style={{ width: '100%' }}>
                            <Radio.Button value="Male">Male</Radio.Button>
                            <Radio.Button value="Female">Female</Radio.Button>
                        </Radio.Group>

                    ) :
                    (genderEdit ?
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender} style={{ width: '100%' }}>
                            <Radio.Button value="Male">Male</Radio.Button>
                            <Radio.Button value="Female">Female</Radio.Button>
                        </Radio.Group>

                            <Button color="primary" variant="filled" shape="circle" icon={<CheckOutlined />} onClick={() => { setGenderPrev(gender); Gender(gender); setGenderEdit(false) }} />
                            <Button variant="filled" danger shape="circle" icon={<CloseOutlined />} onClick={() => { setGender(genderPrev); Gender(genderPrev); setGenderEdit(false) }} />
                    </div>

                    :
                    <div class='flex flex-row items-center justify-between gap-2 w-full'>
                        <p class="font-normal text-gray-500 w-full ">{gender}</p>
                        <Button color="primary" variant="filled" icon={<EditOutlined />} onClick={() => setGenderEdit(true)} />
                    </div>
                )}
            </div>


        </div>
    )
}

export default UserAbout;