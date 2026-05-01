/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Button, Divider, Flex, Image, Input, Modal, Radio, Rate, Select, Steps, Tooltip } from "antd";
import { CheckOutlined, CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, UserOutlined, CreditCardOutlined, SaveOutlined, FormOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { get_Date, UTC_LocalDateTime } from "../../common/localDate";
import Services from "../../common/services";
import { TextboxFlex } from "../../common/textbox";
import { BsCash } from "react-icons/bs";
import { setNumberAndDot } from "../../common/cellformat";
import useAlert from "../../common/alert";
import { TbTransfer } from "react-icons/tb";
import FetchData from "../../hook/fetchData";
import IsLoading from "../../common/custom/isLoading";
import StarBadge from "../../common/starbadge";
import { PiMedalLight } from "react-icons/pi";
import { LuSmilePlus } from "react-icons/lu";
import { TbBrandStackshare } from "react-icons/tb";
import OrderTabs from "../Order/tab";
import DataTable from "../../common/datatable";
import { useResponseButtons } from "../Order/responseButton";
import { Tags } from "../../common/tags";
import { getTableItem } from "../../common/items";
import AssignedTo from "../../common/assigned_to";
import { Sort } from "../../common/sort";

const CustomerView = ({ id, refresh, orderList, servicesList, userList, customerList, loyaltyList, setOpenView, saveData, viewOrder,editOrder }) => {
    const { contextHolder, warning } = useAlert();
     const { Accept, Reject } = useResponseButtons(saveData);
    const [isLoading, setIsLoading] = useState(false);
    const [searchDropdown, setSearchDropdown] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [badge, setBadge] = useState('');
    const [points, setPoints] = useState(0);
    const [referral, setReferral] = useState(0);
    const [createdat, setCreatedat] = useState('2026-01-01');

    const [customerOrderList, setCustomerOrderList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        if (id === 0) { setName(''); setEmail(''); setCell(''); setBadge(''); setPoints(0);setReferral(0); setCreatedat('2026-01-01') }
        else {
            load();
        }
    }, [refresh])

    const load = async () => {
        setIsLoading(true)
        const customerResponse = await FetchData({
            method: 'GET',
            endPoint: 'customer', //
            id: id
        })
        const editList = customerResponse.data
        setName(editList.name);
        setCell(editList.cell);
        setEmail(editList.email);
        setBadge(editList.badge);
        setPoints(editList.points);
        setCreatedat(editList.createdat);
        const referral = orderList.filter(item => item.referral === editList.cell);
        setReferral(referral.length || 0)

        const customerOrders=orderList.filter(item => item.cell ===editList.cell).sort((a, b) => new Date(b.trndate) - new Date(a.trndate));
       
        setCustomerOrderList(customerOrders);    
        setList(customerOrders);
        setIsLoading(false)
        setPage(1, 10, customerOrders);
    }
    const onSearchDropdownChange = (value) => {
        setSearchDropdown(value)
        let sortList = customerOrderList;
        if (value !== '')
            sortList = customerOrderList.filter(item => item.status === value)

        setList(sortList);
        setPage(1, 10, sortList);

    }

   const setPage = (page, pageSize, list = []) => {
        const indexOfLastItem = page * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        const searchedList = list.slice(indexOfFirstItem, indexOfLastItem);
        setFilteredList(searchedList);
    }
    const headerItems = [
        getTableItem('1', '# No.'),
        getTableItem('2', 'Customer'),
        getTableItem('3', 'Date'),
        getTableItem('4', 'Services'),
        getTableItem('5', 'Rate'),
        getTableItem('6', 'Status'),
        getTableItem('7', 'Booked'),
        getTableItem('8', 'Last Modified'),
        getTableItem('9', 'Action'),
    ];
    return (
        <div class="flex flex-col gap-2 mb-12  w-full">
            <IsLoading isLoading={isLoading} rows={10} input={
                <>
                    <div class='flex flex-row gap-4 items-center '>
                        <StarBadge name={badge} size="sm" />
                        <div >
                            <span class="text-2xl font-bold text-gray-800">{name}</span>
                            <span class="flex text-xs text-gray-500">{cell} / {email}</span>
                        </div>
                    </div>

                    <div class='flex flex-col gap-4 mt-6'>

                        <div class='border border-s-4 border-s-cyan-600 bg-white p-4 flex flex-col gap-2'>
                            <span class="text-xs text-gray-400">Current status</span>
                            <div class='flex flex-row gap-2'>
                                <PiMedalLight />
                                <span class="text-xs text-gray-800">{badge} Badge</span>
                            </div>
                            <div class='flex flex-row gap-2'>
                                <LuSmilePlus />
                                <span class="text-xs text-gray-800">{points} Rewards Points</span>
                            </div>
                            <div class='flex flex-row gap-2'>
                                <TbBrandStackshare />
                                <span class="text-xs text-gray-800">{referral} Referral</span>
                            </div>
                            <div class='flex flex-row gap-2'>
                                <CalendarOutlined />
                                <span class="text-xs text-gray-800">Joined - {UTC_LocalDateTime(createdat, 'MMMM, DD YYYY')}</span>
                            </div>
                        </div>

                        <div className="w-full md:w-1/5">
                            <Select
                                value={searchDropdown}
                                style={{ width: '100%' }}
                                onChange={(value) => onSearchDropdownChange(value)}
                                options={[
                                    { value: '', label: <Badge color={'cyan'} text={'All'} /> },
                                    { value: 'Awaiting', label: <Badge color={'silver'} text={'Awaiting'} /> },
                                    { value: 'Pending', label: <Badge color={'yellow'} text={'Pending'} /> },
                                    { value: 'In progress', label: <Badge color={'blue'} text={'In progress'} /> },
                                    { value: 'Completed', label: <Badge color={'green'} text={'Completed'} /> },
                                    { value: 'Cancelled', label: <Badge color={'red'} text={'Cancelled'} /> },
                                    { value: 'Rejected', label: <Badge color={'red'} text={'Rejected'} /> }
                                ]}
                            />
                        </div>
                        <IsLoading isLoading={isLoading} rows={10} input={
                            <DataTable headerItems={headerItems} current={currentPage} list={list}
                                onChange={(page, pageSize) => {
                                    setCurrentPage(page);
                                    setItemsPerPage(pageSize);
                                    setPage(page, pageSize, list)
                                }}
                                body={(
                                    filteredList.map(item => (
                                        <tr key={item.id} class="bg-white border-b text-xs  whitespace-nowrap border-gray-200 hover:bg-zinc-50 ">
                                            <td class="p-3 text-blue-500 italic hover:underline cursor-pointer" onClick={() => viewOrder(item.id)} ># {item.order_no}</td>

                                            <td class="p-3">
                                                <>
                                                    <p class="font-semibold">{item.name}</p>
                                                    <p class="text-xs font-medium text-gray-400">{item.cell}</p>
                                                </>
                                            </td>

                                            <td class="p-3">
                                                {(item.trndate !== null && item.trndate !== '') && <>
                                                    <p class="font-semibold">{get_Date(item.trndate, 'DD MMM YYYY')}</p>
                                                    <p class="text-xs font-medium text-gray-400">{item.slot}</p>
                                                </>}
                                            </td>

                                            <td class="p-3"><Services servicesItem={item.serviceinfo} servicesList={servicesList} /></td>
                                            <td class="p-3 font-semibold">$ {item.total}</td>
                                            <td class="p-3">{Tags(item.status)}</td>
                                            <td class="p-3"><AssignedTo userId={item.assignedto} userList={userList} /></td>
                                            <td class="p-3 ">{UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A')}</td>
                                            <td class="p-3">
                                                {item.status !== 'Awaiting' ?
                                                    <>
                                                        <Tooltip placement="top" title={'Edit'} >
                                                            <Button type="link" icon={<EditOutlined />} onClick={() => editOrder(item.id)} />
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={'View'} >
                                                            <Button type="link" icon={<EyeOutlined />} onClick={() => viewOrder(item.id)} />
                                                        </Tooltip>
                                                        {/*(item.status === 'Pending' || item.status === 'In progress') &&  <Cancel id={item.id}/>*/}
                                                    </>
                                                    :
                                                    <div class='flex flex-row gap-2 items-center '>
                                                        <Accept id={item.id} />
                                                        <Reject id={item.id} />
                                                    </div>
                                                }
                                                {/*
                                    <Tooltip placement="top" title={'Logs'} >
                                        <Button type="link" icon={<ContainerOutlined />} onClick={() => btn_LogsClick(item.id)} />
                                    </Tooltip>*/}
                                            </td>
                                        </tr>
                                    ))
                                )} />
                        } />



                    </div>

                </>
            } />

            {contextHolder}
        </div>
    )
}

export default CustomerView;