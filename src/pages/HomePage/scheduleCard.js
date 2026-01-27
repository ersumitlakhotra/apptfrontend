import AssignedTo from "../../common/assigned_to"
import FlexBoxRow from "../../common/custom/flexboxRow";
import { convertTo12Hour, userDefaultSchedule } from "../../common/general"
import { get_Date } from "../../common/localDate";
import { Tags } from "../../common/tags"
import { FiClock } from "react-icons/fi";
import { GiHotMeal } from "react-icons/gi";

const ScheduleCard = ({ index, date, user, userList, scheduleList,onClick }) => {

    let start = '00:00:00';
    let end = '00:00:00';
    let isWorking = false;
    let id=0;
    const defaultTimingEmployee = userDefaultSchedule(date, user.timinginfo[0]);
    let breakStartEmployee = defaultTimingEmployee[0].breakStart;
    let breakEndEmployee = defaultTimingEmployee[0].breakEnd;
    const res = scheduleList.find(item => item.uid === user.id && get_Date(item.trndate, 'YYYY-MM-DD') === get_Date(date, 'YYYY-MM-DD'))
    if (res === undefined) {
        start = defaultTimingEmployee[0].inTime;
        end = defaultTimingEmployee[0].outTime;
        isWorking = Boolean(defaultTimingEmployee[0].isOpen);
    }
    else {
        id=res.id
        start = res.startshift;
        end = res.endshift;
        isWorking = Boolean(res.dayoff);
    }

    return (
        userList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any active users .</p> :
            <div key={index} onClick={() => onClick(id, user.id)} class={`border p-4  text-xs bg-gray-50 rounded-lg  mb-2 cursor-pointer hover:bg-gray-100 hover:shadow`} >
                <div class='flex flex-row  items-center justify-between text-gray-800  font-medium font-sans mb-2'>
                    <AssignedTo key={user.id} userId={user.id} userList={userList} />
                    {Tags(isWorking ? "Working" : "Day off")}
                </div>
                <FlexBoxRow icon={<FiClock size={12} />} label={`${convertTo12Hour(start)} - ${convertTo12Hour(end)}`} />
                <FlexBoxRow icon={<GiHotMeal size={12} />} label={`${convertTo12Hour(breakStartEmployee)} - ${convertTo12Hour(breakEndEmployee)} [ Lunch Break ]`} />        
            </div>
    )
}

export default ScheduleCard