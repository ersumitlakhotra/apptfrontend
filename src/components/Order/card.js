import { Avatar, Image, Progress, Tag, Tooltip } from "antd";

import { UserOutlined, ClockCircleOutlined, BorderlessTableOutlined } from '@ant-design/icons';

const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const WorkingCard = ({ key, order_no,slot, assignedto, userList, serviceinfo, servicesList }) => {
    return (
        <div key={key} class='border shadow p-3 '>
            <div class='flex flex-row gap-2'>
                {assignedto === '0' ? 
                <>
                        <Avatar size={44} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} /> 
                        <div class='flex flex-col items-start w-full  whitespace-nowrap overflow-hidden'>
                            <span class='text-gray-800 font-medium font-sans'> Not Assigned</span>
                            <div class='flex-row flex'>
                                {serviceinfo !== null &&
                                    servicesList.filter(a =>
                                        serviceinfo.some(b => b === a.id)
                                    ).map(c => <Tag color="cyan" bordered={false}>{c.name}</Tag>)
                                }
                            </div>                       
                        </div>
                </> :
                    userList.filter(user => user.id === assignedto).map(a => <>
                        {a.profilepic !== null ?
                            <Image width={50} height={42} src={a.profilepic} style={{ borderRadius: 4 }} /> :
                            <Avatar size={44} shape="square" style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                        }
                        
                        <div class='flex flex-col w-full  whitespace-nowrap overflow-hidden'>
                            <p class='text-gray-800 text-sm font-semibold font-sans'> {a.fullname}</p>
                            <div class='flex-row flex'>
                            {serviceinfo !== null &&
                                servicesList.filter(a =>
                                    serviceinfo.some(b => b === a.id)
                                ).map(c => <Tag color="cyan" bordered={false} >{c.name}</Tag>)
                            }  
                            </div> 
                        </div>
                    </>
                    )}
            </div>
            {/*  <div class='flex flex-row justify-between  mt-2' >

                <div class='flex flex-row gap-1 text-xs font-normal text-blue-400'>
                    <BorderlessTableOutlined />
                    <span class='cursor-pointer underline italic '>
                        <Tooltip placement="top" title={'View Order'}>
                            {order_no}
                        </Tooltip>
                    </span>
                </div>
                <div class='flex flex-row gap-1 text-gray-400 text-xs font-normal'>
                    <ClockCircleOutlined /><p>{slot}</p>
                </div>
            </div>

            <Progress percent={99.9} strokeColor={twoColors} />
*/}
        </div>
    )
}
const AvailableCard = ({ key }) => {
    return (
        <div key={key} class=' border shadow p-3 '>

            <div class='flex flex-row gap-2'>
                <Image width={42} height={42} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{ borderRadius: 4 }} />
                <div class='flex flex-col items-start  whitespace-nowrap overflow-hidden'>
                    <span class='text-gray-800 font-medium font-sans'> Paramvir singh randhawa</span>
                    <p class='text-gray-400 text-xs  font-normal'>Next appointment : 03:00 PM</p>
                </div>
            </div>

        </div>
    )
}
export  {WorkingCard,AvailableCard};
