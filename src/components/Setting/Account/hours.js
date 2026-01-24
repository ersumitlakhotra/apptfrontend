import { Button, Space, Switch, TimePicker } from "antd";
import Heading from "../../../common/heading"

import { ClockCircleFilled, CloseOutlined, EditOutlined } from '@ant-design/icons';
import Accordion from "../../../common/accordion";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
const { RangePicker } = TimePicker;
var localizedFormat = require("dayjs/plugin/localizedFormat");

const Hours = ({ companyList, saveData, setRefresh }) => {
    dayjs.extend(localizedFormat);
    const today = new Date();
    const dayOfWeekNumber = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Array to map day numbers to day names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = weekdays[dayOfWeekNumber];
    const headingLabel = 'Weekly Schedule';
    const [isEdit, setIsEdit] = useState(false);
    const [monday, setMonday] = useState(['00:00:00', '00:00:00', true]);
    const [tuesday, setTuesday] = useState(['00:00:00', '00:00:00', true]);
    const [wednesday, setWednesday] = useState(['00:00:00', '00:00:00', true]);
    const [thursday, setThursday] = useState(['00:00:00', '00:00:00', true]);
    const [friday, setFriday] = useState(['00:00:00', '00:00:00', true]);
    const [saturday, setSaturday] = useState(['00:00:00', '00:00:00', true]);
    const [sunday, setSunday] = useState(['00:00:00', '00:00:00', true]);

    useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.timinginfo !== null) {
                setMonday(companyList.timinginfo[0].monday);
                setTuesday(companyList.timinginfo[0].tuesday);
                setWednesday(companyList.timinginfo[0].wednesday);
                setThursday(companyList.timinginfo[0].thursday);
                setFriday(companyList.timinginfo[0].friday);
                setSaturday(companyList.timinginfo[0].saturday);
                setSunday(companyList.timinginfo[0].sunday);
            }
        }
    }, [companyList])

    const save = async () => {
        const Body = JSON.stringify({
            timinginfo: [{
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
            }]
        });
        saveData({
            label:headingLabel,
            method: "PUT", 
            endPoint:"company/timing",
            body: Body
        });
        setIsEdit(false);
    }

    const timeChange = (time, timeString, day, setDay) => {
        if (timeString[0] === '' && timeString[1] === '')
            setDay(['00:00:00', '00:00:00', day[2]])
        else
            setDay([dayjs(timeString[0], 'h:mm a').format('HH:mm:ss'), dayjs(timeString[1], 'h:mm a').format('HH:mm:ss'), day[2]])
    };
    
    const update = (day, setDay, OpenClosed) => {
        const updatedItems = [...day]
        updatedItems[2] = OpenClosed;
        setDay(updatedItems);
    };
    const convertTime = (day) => {
        if (day[2]) {
            const formatter = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            const start = formatter.format(new Date(`2000-01-01T${day[0]}`));
            const end = formatter.format(new Date(`2000-01-01T${day[1]}`));
            return `${start} - ${end}`
        }
        else {
            return 'Closed'
        }
    };


    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <div class='flex items-center justify-between'>
                <Heading label={headingLabel} Icon={<ClockCircleFilled />} />

                {isEdit ?
                    <Space>
                        <Button color="primary" variant="solid" onClick={save} >Save changes</Button>
                        <Button color="default" variant="filled" icon={<CloseOutlined />} onClick={() => { setIsEdit(false); setRefresh(0); }} >Cancel</Button>
                    </Space> :
                    <Button color="default" variant="filled" icon={<EditOutlined />} onClick={() => setIsEdit(true)} >Edit</Button>
                }
            </div>

            <div class='border rounded-lg ml-6 flex flex-col mb-6'> {isEdit ?
                <>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Monday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(monday[0], 'HH:mm'), dayjs(monday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, monday, setMonday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={monday[2]}
                            onChange={(e) => update(monday, setMonday, e)} />
                    </div>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Tuesday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(tuesday[0], 'HH:mm'), dayjs(tuesday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, tuesday, setTuesday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={tuesday[2]}
                            onChange={(e) => update(tuesday, setTuesday, e)} />
                    </div>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Wednesday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(wednesday[0], 'HH:mm'), dayjs(wednesday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, wednesday, setWednesday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={wednesday[2]}
                            onChange={(e) => update(wednesday, setWednesday, e)} />
                    </div>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Thursday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(thursday[0], 'HH:mm'), dayjs(thursday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, thursday, setThursday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={thursday[2]}
                            onChange={(e) => update(thursday, setThursday, e)} />
                    </div>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Friday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(friday[0], 'HH:mm'), dayjs(friday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, friday, setFriday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={friday[2]}
                            onChange={(e) => update(friday, setFriday, e)} />
                    </div>
                    <div class={`border-b p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Saturday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(saturday[0], 'HH:mm'), dayjs(saturday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, saturday, setSaturday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={saturday[2]}
                            onChange={(e) => update(saturday, setSaturday, e)} />
                    </div>
                    <div class={`p-4 ps-6 flex flex-row gap-4  items-center`}>
                        <p class='w-28 font-medium text-gray-500'>Sunday</p>
                        <RangePicker placeholder={['Start', 'End']}
                            allowClear={false}
                            use12Hours
                            showSecond={false}
                            format={"h:mm a"}
                            value={[dayjs(sunday[0], 'HH:mm'), dayjs(sunday[1], 'HH:mm')]}
                            onChange={(time, timeString) => timeChange(time, timeString, sunday, setSunday)} />
                        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={sunday[2]}
                            onChange={(e) => update(sunday, setSunday, e)} />
                    </div>
                </> :
                <>
                    <Accordion label={'Monday'} value={convertTime(monday)} current={dayName === "Monday"} />
                    <Accordion label={'Tuesday'} value={convertTime(tuesday)} current={dayName === "Tuesday"} />
                    <Accordion label={'Wednesday'} value={convertTime(wednesday)} current={dayName === "Wednesday"} />
                    <Accordion label={'Thursday'} value={convertTime(thursday)} current={dayName === "Thursday"} />
                    <Accordion label={'Friday'} value={convertTime(friday)} current={dayName === "Friday"} />
                    <Accordion label={'Saturday'} value={convertTime(saturday)} current={dayName === "Saturday"} />
                    <Accordion label={'Sunday'} value={convertTime(sunday)} current={dayName === "Sunday"} border_bottom={false} />
                </>
            }
            </div>
        </div>
    )
}
export default Hours;

