import { get_Date, LocalDate } from "../../../common/localDate";
import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Tags } from "../../../common/tags";
import { convertTo12Hour } from "../../../common/general";

const Schedule = ({ scheduleList, userList }) => {
    return (
        <div class='flex  flex-col gap-4 w-full'>
            <span class="text-lg font-semibold text-gray-800">Today Schedule</span>
            <div class='w-full bg-white border rounded p-5 flex flex-col gap-6  text-gray-500 max-h-[460px] h-[460px]  overflow-y-auto'>
                {userList.map(user => {
                    let start = '00:00:00';
                    let end = '00:00:00';
                    let isWorking = false;
                    scheduleList.filter(item => String(item.uid) === String(user.id) && get_Date(item.trndate, 'YYYY-MM-DD') === LocalDate()).map(
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