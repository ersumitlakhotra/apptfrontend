import { Input, DatePicker, Select, Image, Avatar, Row, Col, Tag } from "antd"
import { TextboxFlexCol } from "../../common/textbox"
import { useEffect, useState } from "react";

import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { generateTimeSlots } from "../../common/intervals";

const Tasks = ({ orderList,servicesList,userList }) => {
    const [date, setDate] = useState(dayjs());
    const [slots, setSlots] = useState([]);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const [generateSlots, setGenerateSlots] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const order = orderList.filter(a => dayjs(date).format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        setOrders(order.length > 0 ? order : []);
        setGenerateSlots(generateTimeSlots("10:00:00", "21:50:00", 30, []));

    }, [refresh])
    
    return(
        <div class="flex flex-col gap-4 mb-12">

            <div class='flex items-center justify-between'>
                <span class="text-lg font-semibold text-gray-800">Task</span>
                <div class="flex gap-2  w-1/2">
                    <TextboxFlexCol label={'Date'} input={
                        <DatePicker style={{ width: '100%' }} value={date === '' ? date : dayjs(date, 'YYYY-MM-DD')} onChange={(date, dateString) => setDate(dateString)} />

                    } />
                    
                    <TextboxFlexCol label={'Slots'}  input={
                        <Select
                            placeholder='Filter slots'
                            mode="multiple"
                            maxCount={1}
                            value={slots}
                            style={{ width: '100%' }}
                            onChange={(value) => setSlots(value)}
                            options={generateSlots.map(item => ({
                                value: item.id,
                                label: item.id
                            }))}                          
                        />
                    } />

                    <TextboxFlexCol label={'Employee'} input={
                        <Select
                            value={users}
                            mode="multiple"
                            maxCount={1}
                            placeholder='Select Employee'
                            style={{ width: '100%' }}
                            onChange={(value) => setUsers(value)}
                            options={userList.map(item => ({
                                value: item.id,
                                label:
                                    <div class='flex flex-row gap-1 items-center'>
                                        {item.profilepic !== null ?
                                            <Image width={24} height={24} src={item.profilepic} style={{ borderRadius: 15 }} /> :
                                            <Avatar size={24} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                        }
                                        <p>{item.fullname}</p>
                                    </div>
                            }))}
                        />
                    } />
                    

                </div>
            </div>
            <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
                {generateSlots.map((item) => (
                    <div class='mt-2 w-full flex flex-col gap-2'>
                        <p class='text-lg'>{item.id}</p>
                        <Row key={item.id} gutter={[12, 12]}>
                            {orders.filter(o => o.slot === item.id).map(a => (
                                <Col className="gutter-row " span={6}>
                                    <div class='flex flex-row border gap-2 w-72'>
                                        {a.assignedto !== '0' &&
                                            userList.filter(user => user.id === a.assignedto).map(a => <>
                                                {a.profilepic !== null ?
                                                    <Image width={50} height={42} src={a.profilepic} style={{ borderRadius: 4 }} /> :
                                                    <Avatar size={44} shape="square" style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                                }

                                                <div class='flex flex-col w-full  whitespace-nowrap overflow-hidden'>
                                                    <p class='text-gray-800 text-sm font-semibold font-sans'> {a.fullname}</p>
                                                    <div class='flex-row flex'>
                                                        
                                                    </div>
                                                </div>
                                            </>
                                            )
                                        }
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Tasks