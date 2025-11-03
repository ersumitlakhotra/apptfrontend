/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Divider, Image,  Rate, Steps } from "antd";
import { CheckOutlined, CloseOutlined, CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { UTC_LocalDateTime } from "../../common/localDate";
import Services from "../../common/services";
const OrderView = ({ id, refresh, orderList, servicesList, userList,setOpenView, saveData }) => {

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [order_no, setOrderNo] = useState('');
    const [status, setStatus] = useState('Pending');
    const [price, setPrice] = useState('0');
    const [tax, setTax] = useState('0');

    const [taxamount, setTaxAmount] = useState('0');
    const [total, setTotal] = useState('0');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('0');
    const [trndate, setTrnDate] = useState('');
    const [assigned_to, setAssignedTo] = useState('');
    const [createdat, setCreatedat] = useState(new Date());
    const [slot, setSlot] = useState('');
    const [bookedvia, setBookedVia] = useState('Walk-In');
    const [servicesItem, setServicesItem] = useState([]);
    //const filteredOptionsServices = servicesList.filter(o => !selectedItems.includes(o));

    useEffect(() => {
        if (id === 0) {
            setCustomerName(''); setCustomerEmail(''); setCustomerPhone('');
            setStatus('Pending'); setPrice('0'); setTax('0'); setTotal('0'); setDiscount('0'); setCoupon(''); setTaxAmount('0'); setTrnDate(''); setCreatedat(new Date());
            setAssignedTo(''); setOrderNo(''); setServicesItem([]); setSlot(''); setBookedVia('Walk-In')
        }
        else {
            const editList = orderList.find(item => item.id === id)
            if (editList.customerinfo !== null) {
                setCustomerName(editList.customerinfo[0].name);
                setCustomerPhone(editList.customerinfo[0].cell);
                setCustomerEmail(editList.customerinfo[0].email);
            }
            else { setCustomerName(''); setCustomerEmail(''); setCustomerPhone(''); }

            setOrderNo(editList.order_no);
            setStatus(editList.status);
            setTrnDate(editList.trndate);
            setServicesItem(editList.serviceinfo);
            setCreatedat(editList.createdat);
            setAssignedTo(editList.assignedto);
            setPrice(editList.price);
            setTax(editList.tax);
            setTaxAmount(editList.taxamount); 
            setTotal(editList.total);
            setCoupon(editList.coupon);
            setDiscount(editList.discount);
            setSlot(editList.slot);
            setBookedVia(editList.bookedvia);
        }
    }, [refresh])

    const updateStatus = (isCancel = false) => {
        if(isCancel)
            saveData("Order","POST", "order/cancel",id, [],true,false);
        else
            saveData("Order","POST", "order/complete",id, [],true,false);

        setOpenView(false);
    }

    return (
        <div class="flex flex-col gap-2 mb-12  w-full">
            <div class='flex items-center justify-between'>
                <span class="text-2xl font-bold text-gray-800">Order #{order_no}</span>
                {(status === 'Pending' || status === 'In progress') &&
                    <div class="flex gap-2">
                        <Button color="cyan" variant="solid" icon={<CheckOutlined />} size="large" onClick={() => updateStatus()}>Completed</Button>
                        <Button color="danger" variant="solid" icon={<CloseOutlined />} size="large" onClick={() => updateStatus(true)}>Cancelled</Button>

                        {/*<Button type='default' icon={<PrinterOutlined />} size="middle">Print</Button>*/}
                    </div>
                }
            </div>
            <div class='flex text-xs text-gray-500'>
                <p>Order History / Via {bookedvia} / #{order_no} - {UTC_LocalDateTime(createdat, 'MMMM, DD YYYY - hh:mm A ')}</p>
            </div>

            <div class='flex flex-col md:flex-row gap-4 mt-6'>

                <div class='w-full md:w-9/12  flex flex-col gap-4 '>

                    <div class='border rounded bg-white p-4 flex flex-col '>
                        <span class="text-lg font-bold text-gray-800">Progress</span>
                        <span class="text-xs text-gray-400">Current Order Status</span>
                        <div class='mt-4'>
                            <Steps
                                current={status === 'Pending' ? 0 : (status === 'In progress' ? 1 : 2)} 
                                percent={60}
                                labelPlacement="vertical" 
                                size="small" 
                                status={status === 'Cancelled' ? "error" : (status === 'Completed' ? "finish" : "process")}
                                items={[
                                    { title: 'Pending' }, { title: 'In Progress' }, { title: status === 'Cancelled' ? 'Cancelled' : 'Completed' }
                                ]} />                      

                        </div>
                    </div>

                    <div class='border rounded bg-white p-4 flex flex-col '>
                        <div>
                            {assigned_to === '0' ? '' :
                                userList.filter(user => user.id === assigned_to).map(a =>
                                    <div key={a.id} class='flex flex-row gap-4 '>
                                        {a.profilepic !== null ?
                                            <Image width={50} height={50} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                            <Avatar size={50} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <div class='flex flex-col '>
                                            <span class="text-lg font-semibold text-gray-800 ps-1">{a.fullname}</span>
                                            <Rate disabled value={a.rating} />
                                        </div>

                                    </div>
                                )}
                        </div>
                        <div class='mt-4 p-4'>
                            <div class='border border-s-4 border-s-cyan-600 p-4 flex flex-col gap-3'>
                                <span class="text-xs text-gray-400">Working info</span>
                               {/* <Progress percent={50} size='small' status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />*/}
                                <div class='flex flex-row gap-2'>
                                    <CalendarOutlined />
                                    <span class="text-xs font-medium text-black">Appointment - {UTC_LocalDateTime(trndate, 'MMMM, DD YYYY')}</span>
                                </div>
                                <div class='flex flex-row gap-2'>
                                    <ClockCircleOutlined />
                                    <span class="text-xs font-medium text-black">Slot - {slot}</span>
                                </div>
                                <div class='flex flex-row gap-2'>
                                    <UnorderedListOutlined />
                                    <Services servicesItem={servicesItem} servicesList={servicesList} />       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='w-full md:w-3/12  flex flex-col gap-4 '>
                    <div class='border rounded bg-white p-4 flex flex-col gap-4'>
                        <div class='flex flex-row items-center justify-between'>
                            <div class='flex flex-col'>
                                <span class="text-lg font-bold text-gray-800">Payment</span>
                                <span class="text-xs text-gray-400">Final Payment Amount</span>
                            </div>
                            {/*<Button type='default' icon={<DownloadOutlined />} size="middle">Download Invoice</Button>*/}
                        </div>

                        <div class='border rounded bg-gray-100 flex flex-col gap-2 p-4 px-8'>
                            <div class='flex items-start justify-between text-xs'>
                                <span class=" text-gray-600">Subtotal</span>
                                <span class="font-semibold text-black">${price}</span>
                            </div>
                            <div class='flex items-start justify-between  text-xs'>
                                <span class="  text-gray-600">Discount {coupon !== '' && `- ${coupon}`}</span>
                                <span class={`font-semibold text-black ${parseFloat(discount).toFixed(2) > 0 && "text-red-400"} `}>
                                    {parseFloat(discount).toFixed(2) <= 0 ? '$0' : `-$${discount}`}
                                </span>
                            </div>
                            <div class='flex items-start justify-between  text-xs'>
                                <span class=" text-gray-600">Tax ({tax}%)</span>
                                <span class="font-semibold text-black">${taxamount}</span>
                            </div>
                            <Divider className="my-2" />

                            <div class='flex items-start justify-between text-xs font-semibold text-black'>
                                <span >Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>

                    <div class='border rounded bg-white p-4 flex flex-col'>
                        <span class="text-lg font-bold text-gray-800">Customer</span>
                        <span class="text-xs text-gray-400">Information Detail</span>

                        <div class='border rounded flex flex-col gap-1 p-2  mt-4'>
                            <p class='flex flex-row gap-2'><UserOutlined size={26} /> <span class='text-xs font-semibold'>General Information</span></p>
                            <ul class='text-xs text-gray-400 ps-10 list-disc'>
                                <li> {customerName}</li>
                                <li> {customerPhone}</li>
                                <li> {customerEmail}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderView;