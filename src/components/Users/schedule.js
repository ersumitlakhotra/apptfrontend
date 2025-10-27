
import { Button, Space, Switch, TimePicker } from "antd";
import Heading from "../../common/heading";

import { ClockCircleFilled, CloseOutlined, EditOutlined } from '@ant-design/icons';
import Accordion from "../../common/accordion";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
const { RangePicker } = TimePicker;
var localizedFormat = require("dayjs/plugin/localizedFormat");

const UserSchedule = ({ sunday, setSunday, monday, setMonday, tuesday, setTuesday, wednesday, setWednesday,
    thursday, setThursday, friday, setFriday, saturday, setSaturday }) => {

    dayjs.extend(localizedFormat);
    const [isEdit, setIsEdit] = useState(true);
    const Checked = 'Working'; const Unchecked = 'off';

    const today = new Date();
    const dayOfWeekNumber = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Array to map day numbers to day names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = weekdays[dayOfWeekNumber];

    const timeChange = (time, timeString, day, setDay) => {
        if (timeString[0] === '' && timeString[1] === '')
            setDay(['00:00:00', '00:00:00', day[2]])
        else
            setDay([timeString[0], timeString[1], day[2]])
    };

    const update = (day, setDay, OpenClosed) => {
        const updatedItems = [...day]
        updatedItems[2] = OpenClosed;
        setDay(updatedItems);
    };
    
    return (
        <div class='border rounded-lg w-full flex flex-col mb-6'>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4   items-center`}>
                <p class='w-24 font-medium text-gray-500'>Monday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(monday[0], 'HH:mm:ss'), dayjs(monday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, monday, setMonday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={monday[2]}
                    onChange={(e) => update(monday, setMonday, e)} />
            </div>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Tuesday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(tuesday[0], 'HH:mm:ss'), dayjs(tuesday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, tuesday, setTuesday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={tuesday[2]}
                    onChange={(e) => update(tuesday, setTuesday, e)} />
            </div>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Wednesday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(wednesday[0], 'HH:mm:ss'), dayjs(wednesday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, wednesday, setWednesday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={wednesday[2]}
                    onChange={(e) => update(wednesday, setWednesday, e)} />
            </div>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Thursday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(thursday[0], 'HH:mm:ss'), dayjs(thursday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, thursday, setThursday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={thursday[2]}
                    onChange={(e) => update(thursday, setThursday, e)} />
            </div>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Friday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(friday[0], 'HH:mm:ss'), dayjs(friday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, friday, setFriday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={friday[2]}
                    onChange={(e) => update(friday, setFriday, e)} />
            </div>
            <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Saturday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(saturday[0], 'HH:mm:ss'), dayjs(saturday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, saturday, setSaturday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={saturday[2]}
                    onChange={(e) => update(saturday, setSaturday, e)} />
            </div>
            <div class={`p-4 ps-6 flex flex-row gap-4  items-center`}>
                <p class='w-24 font-medium text-gray-500'>Sunday</p>
                <RangePicker placeholder={['Start', 'End']}
                    value={[dayjs(sunday[0], 'HH:mm:ss'), dayjs(sunday[1], 'HH:mm:ss')]}
                    onChange={(time, timeString) => timeChange(time, timeString, sunday, setSunday)} />
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked}  defaultChecked={sunday[2]}
                    onChange={(e) => update(sunday, setSunday, e)} />
            </div>
        </div>
    )
}

export default UserSchedule;