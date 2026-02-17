import { Badge, Collapse, TimePicker, Switch } from "antd"
import dayjs from 'dayjs';
const { RangePicker } = TimePicker;

const ScheduleN = ({ sunday, setSunday, monday, setMonday, tuesday, setTuesday, wednesday, setWednesday,
    thursday, setThursday, friday, setFriday, saturday, setSaturday } ) => {
    
    const Weekday = ({ title, start, end,breakStart,breakEnd, isWorking,day,setDay }) => {
        return (
            <Badge.Ribbon
                text={title}
                color={isWorking ? 'green' : 'red'} >
                <Collapse
                    items={[{
                        key: 0,
                        label: (
                            <div class='flex flex-col  pe-20 text-xs ' >
                                <p>{convertTime(day)}</p>
                                <p>{convertBreakTime(day)}</p>
                            </div>),
                        children:
                            <div class='flex flex-col gap-1 '>
                                <div class={` flex flex-row gap-4  items-center`}>
                                    <p class='w-28 font-medium text-gray-500'>Timing</p>
                                    <RangePicker placeholder={['Start', 'End']}
                                        allowClear={false}
                                        use12Hours
                                        showSecond={false}
                                        format={"h:mm a"}
                                        value={[dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')]}
                                        onChange={(time, timeString) => timeChange(time, timeString, day, setDay, 'Timing')} />
                                    
                                </div>
                                <div class={` flex flex-row gap-4  items-center`}>
                                    <p class='w-28 font-medium text-gray-500'>Lunch Break</p>
                                    <RangePicker placeholder={['Start', 'End']}
                                        allowClear={false}
                                        use12Hours
                                        showSecond={false}
                                        format={"h:mm a"}
                                        value={[dayjs(breakStart, 'HH:mm'), dayjs(breakEnd, 'HH:mm')]}
                                        onChange={(time, timeString) => timeChange(time, timeString, day, setDay,'LunchBreak')} />
                                </div>
                                <div class={` flex flex-row gap-4  items-center`}>
                                    <p class='w-28 font-medium text-gray-500'>Status</p>
                                    <Switch checkedChildren="Working" unCheckedChildren="Day off" defaultChecked={isWorking}
                                        onChange={(e) => update(day, setDay, e)} />
                                </div>
                            </div>
                    }]}
                />

            </Badge.Ribbon>
        )
    }
     const timeChange = (time, timeString, day, setDay,option) => {
         if (option === 'Timing')
             setDay([dayjs(timeString[0], 'h:mm a').format('HH:mm:ss'), dayjs(timeString[1], 'h:mm a').format('HH:mm:ss'), day[2], day[3], day[4]])
         else
             setDay([day[0], day[1], day[2], dayjs(timeString[0], 'h:mm a').format('HH:mm:ss'), dayjs(timeString[1], 'h:mm a').format('HH:mm:ss')])
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
            return 'Day Off'
        }
    };
    const convertBreakTime = (day) => {
        if (day[2]) {
            const formatter = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            const start = formatter.format(new Date(`2000-01-01T${day[3]}`));
            const end = formatter.format(new Date(`2000-01-01T${day[4]}`));
            return `${start} - ${end} ( Lunch Break )`
        }
        else {
            return ''
        }
    };

    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>
            <Weekday
                title={'Monday'}
                start={monday[0]}
                end={monday[1]}
                isWorking={Boolean(monday[2])}
                breakStart={monday[3]}
                breakEnd={monday[4]}
                day={monday}
                setDay={setMonday} />
            <Weekday
                title={'Tuesday'}
                start={tuesday[0]}
                end={tuesday[1]}
                isWorking={Boolean(tuesday[2])}
                breakStart={tuesday[3]}
                breakEnd={tuesday[4]}
                day={tuesday}
                setDay={setTuesday} />
            <Weekday
                title={'Wednesday'}
                start={wednesday[0]}
                end={wednesday[1]}
                isWorking={Boolean(wednesday[2])}
                breakStart={wednesday[3]}
                breakEnd={wednesday[4]}
                day={wednesday}
                setDay={setWednesday} />
            <Weekday
                title={'Thursday'}
                start={thursday[0]}
                end={thursday[1]}
                isWorking={Boolean(thursday[2])}
                breakStart={thursday[3]}
                breakEnd={thursday[4]}
                day={thursday}
                setDay={setThursday} />
            <Weekday
                title={'Friday'}
                start={friday[0]}
                end={friday[1]}
                isWorking={Boolean(friday[2])}
                breakStart={friday[3]}
                breakEnd={friday[4]}
                day={friday}
                setDay={setFriday} />
            <Weekday
                title={'Saturday'}
                start={saturday[0]}
                end={saturday[1]}
                isWorking={Boolean(saturday[2])}
                breakStart={saturday[3]}
                breakEnd={saturday[4]}
                day={saturday}
                setDay={setSaturday} />
            <Weekday
                title={'Sunday'}
                start={sunday[0]}
                end={sunday[1]}
                isWorking={Boolean(sunday[2])}
                breakStart={sunday[3]}
                breakEnd={sunday[4]}
                day={sunday}
                setDay={setSunday} />
        </div>
    )
}
export default ScheduleN