/* eslint-disable react-hooks/exhaustive-deps */
import { get_Date, LocalDate } from "../../../common/localDate";
import { Avatar, Button, Dropdown, Image, Space } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Tags } from "../../../common/tags";
import { convertTo12Hour } from "../../../common/general";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const Schedule = ({ scheduleList, userList }) => {
    const [currentOption, setCurrentOption] = useState('Today');
    const [filteredList,setFilteredList]= useState([]);
    const items = [
        { key: 'Today', label: 'Today' },
        { key: 'Tomorrow', label: 'Tomorrow' },
        { key: 'The Next Day', label: 'The Next Day' },
    ];
    const onItemChanged = e => { setCurrentOption(e.key) };
    const menuProps = { items, onClick: onItemChanged, };

    useEffect(() => {
        filterSchedule();
    }, [currentOption, scheduleList])

    const filterSchedule=() => {
        let editList = [];
        if (currentOption === 'Today')
            editList = scheduleList.filter(item => get_Date(item.trndate, 'YYYY-MM-DD') === LocalDate())
        else if (currentOption === 'Tomorrow') {
            editList = scheduleList.filter(item => get_Date(item.trndate, 'YYYY-MM-DD') === dayjs(LocalDate()).add(1, 'day').format('YYYY-MM-DD'))
        }
        else {
            editList = scheduleList.filter(item => get_Date(item.trndate, 'YYYY-MM-DD') === dayjs(LocalDate()).add(2, 'day').format('YYYY-MM-DD'))
        }

        if (editList.length === 0)
            setFilteredList([]);
        else
            setFilteredList(editList);
    }

    return (
        <div class='flex  flex-col gap-4 w-full'>
            <div class='flex justify-between items-center'>
                <span class="text-lg font-semibold text-gray-800">Schedule</span>
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            {currentOption}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
            <div class='w-full bg-white border rounded p-5 flex flex-col gap-6  text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto'>
                {userList.map(user => {
                    let start = '00:00:00';
                    let end = '00:00:00';
                    let isWorking = false;
                    filteredList.filter(item => String(item.uid) === String(user.id)
                        //currentOption === 'Tomorrow' ? get_Date(item.trndate, 'YYYY-MM-DD') === current.add(1, 'day').format('YYYY-MM-DD') : get_Date(item.trndate, 'YYYY-MM-DD') === LocalDate() 
                    ).map(
                        sch => {
                            start = sch.startshift;
                            end = sch.endshift;
                            isWorking = sch.dayoff;
                        }
                    )
                    return (
                        <div class='flex flex-row justify-between'>
                            <div class='flex flex-row gap-3 text-gray-800  font-medium font-sans'>
                                {user.profilepic !== null ?
                                    <Image width={30} height={30} src={user.profilepic} style={{ borderRadius: 15 }} /> :
                                    <Avatar size={30} style={{ backgroundColor: 'whitesmoke' }} icon={<UserOutlined style={{ color: 'black' }} />} />
                                }
                                <div class='flex flex-col'>
                                    {user.fullname}
                                    <p class='text-gray-400 text-xs font-normal'>{`${convertTo12Hour(start)} - ${convertTo12Hour(end)}`}</p>
                                </div>
                            </div>
                            <p>{Tags(isWorking ? "Working" : "Day off")}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
export default Schedule