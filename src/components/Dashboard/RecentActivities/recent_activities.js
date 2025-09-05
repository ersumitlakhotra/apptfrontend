import { Avatar, Badge, Card, Image } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Tags } from "../../../common/tags";

const RecentActivities = ({ orderList, userList }) => {
    const [totalList, setTotalList] = useState([]);

    useEffect(() => {
        const total = orderList.filter(a => dayjs().format('YYYY-MM-DD') === dayjs(a.trndate).format('YYYY-MM-DD'));
        const sortedTotal = [...total].sort((a, b) => new Date(b.modifiedat) - new Date(a.modifiedat));
        setTotalList(sortedTotal.length > 0 ? sortedTotal : [])
    }, [orderList])

    return (
        <div class='flex flex-col gap-4 w-full'>
            <span class="text-lg font-semibold text-gray-800">Recent Activities </span>
            <div class='w-full bg-white border rounded p-5 text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto flex flex-col gap-2'>
                <div class=' flex flex-col gap-4 mb-4'>
                    {totalList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any activity to show right now.</p> :
                        totalList.map(item =>
                            <>
                                <Badge.Ribbon
                                    text={new Date(item.modifiedat) === new Date(item.createdat) ? "Created" : "Modified"}
                                    color={new Date(item.modifiedat) === new Date(item.createdat) ? "yellow" : "blue"} >
                                    <Card title={
                                        item.assignedto === '0' ? '' :
                                            userList.filter(user => user.id === item.assignedto).map(a =>
                                                <div key={a.id} class='flex flex-row gap-2 items-center text-sm'>
                                                    {a.profilepic !== null ?
                                                        <Image width={24} height={24} src={a.profilepic} style={{ borderRadius: 15 }} /> :
                                                        <Avatar size={24} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                                    }
                                                    <span class='text-xs  text-gray-500'>{a.fullname}</span>
                                                </div>
                                            )
                                    }
                                        size="small" backgroundColor='gray'>
                                        <div class='flex flex-col gap-2'>
                                            <div class='flex items-center justify-between'>
                                                <span class="text-blue-500 italic hover:underline cursor-pointer"  ># {item.order_no}</span>
                                                <span class="">{Tags(item.status)}</span>
                                            </div>
                                        </div>

                                    </Card>
                                </Badge.Ribbon>
                            </>)}
                </div>
            </div>
        </div>
    )
}
export default RecentActivities