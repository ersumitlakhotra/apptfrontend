
import { useEffect, useState } from "react";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';
import { getStorage } from '../../common/localStorage';
import { AiFillSchedule } from "react-icons/ai";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, DatePicker } from "antd";
import dayjs from 'dayjs';
import { LocalDate } from "../../common/localDate";
import ScheduleCard from "./scheduleCard";

const UserSchedule = () => {
    const [date, setDate] = useState(LocalDate());
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();

        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user'
        })
        const scheduleResponse = await FetchData({
            method: 'GET',
            endPoint: 'schedule'
        })

        let user = userResponse.data;
        let schedule = scheduleResponse.data;
        if (localStorage.role === 'Employee')
        {
            user = user.filter(item => item.id === localStorage.uid)
        }

        setUserList(user);
        setScheduleList(schedule);
        setIsLoading(false);
    }

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2  shadow-md hover:shadow-xl ' style={{height:'370px'}}>
            <IsLoading isLoading={isLoading} rows={9} input={
                <>
                    <div class=' flex-1 overflow-auto w-full scroll-auto '>
                        <div class='flex w-full flex-row justify-between pr-2 sticky top-0 z-40 bg-white pb-4 '>
                            <div class='flex flex-row gap-2 items-center  text-gray-800  font-medium font-sans  '>
                                <AiFillSchedule style={{ fontSize: '28px', color: '#008B8B' }} />
                                <span>Schedule</span>
                            </div>
                            <div class='flex flex-row items-start justify-end'>
                                <Button color="default" variant="outlined" icon={<LeftOutlined />} style={{ borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} onClick={() => setDate(dayjs(date).add(-1, 'day'))} />
                                <DatePicker
                                    style={{ width: '60%' }}
                                    allowClear={false}
                                    format={dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '[Today]' :'ddd, MMM DD, YYYY'}
                                    value={date === '' ? date : dayjs(date, 'YYYY-MM-DD')}
                                    onChange={(date, dateString) => setDate(date)} />

                                <Button color="default" variant="outlined" icon={<RightOutlined />} style={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} onClick={() => setDate(dayjs(date).add(1, 'day'))} />
                            </div>
                        </div>

                        {userList.map((item,index) => {
                            return (
                                <ScheduleCard key={index} index={index} data={item} userList={userList} />
                            )
                        })}
                        
                    </div>
                </>
            } />
        </div>
    )
}

export default UserSchedule