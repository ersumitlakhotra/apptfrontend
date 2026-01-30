/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useState } from "react";
import { DatePicker,  Select, Switch, TimePicker } from "antd";
import useAlert from "../../common/alert.js";
import { TextboxFlex } from "../../common/textbox.js";
import { get_Date } from "../../common/localDate.js";
import dayjs from 'dayjs';
import { userSchedule } from "../../common/general.js";
import AssignedTo from "../../common/assigned_to.js";
const { RangePicker } = TimePicker;


const ScheduleDetail = ({ id, refresh, ref, date, scheduleList, userList, saveData, setOpen, userId = null,userDisable=false,dateDisable=false,isAdmin }) => {
    const [trnDate, setTrnDate] = useState(date);
    const [startTime, setStartTime] = useState('00:00:00');
    const [endTime, setEndTime] = useState('00:00:00');
    const [breakStart, setBreakStart] = useState('00:00:00');
    const [breakEnd, setBreakEnd] = useState('00:00:00');
    const [isWorking, setIsWorking] = useState(true);
    const [uid, setUid] = useState('');
    const { contextHolder, error, warning } = useAlert();

    useEffect(() => {
        if (id === 0) {
            setTrnDate(date);   
            setUid(userId === null ? '' : userId);
            userId !== null && setUserDefault(date, userId)
        }
        else {
            const editList = scheduleList.find(item => item.id === id)
            setTrnDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
            setStartTime(editList.startshift);
            setEndTime(editList.endshift);
            setIsWorking(editList.dayoff);
            setBreakStart(editList.breakstart);
            setBreakEnd(editList.breakend);
            setUid(editList.uid);
        }
    }, [refresh])

    const setUserDefault = (date, id) => {
        const user = userList.find(item => item.id === id)
        const timing = userSchedule(date, user.timinginfo[0], id, scheduleList);
        setStartTime(timing[0].inTime);
        setEndTime(timing[0].outTime);
        setIsWorking(timing[0].isOpen);
        setBreakStart(timing[0].breakStart);
        setBreakEnd(timing[0].breakEnd);
    }

    useEffect(() => {
        if(uid !== '')     
            setUserDefault(trnDate, uid)
    }, [trnDate, uid])

    const save = async () => {
        if (uid !== '') {
            let res = undefined;
            if (id === 0)
                res = scheduleList.find(item => item.uid === uid && get_Date(item.trndate, 'YYYY-MM-DD') === get_Date(trnDate, 'YYYY-MM-DD'))
            if (res === undefined) {
                const Body = JSON.stringify({
                    uid: uid,
                    trndate: trnDate,
                    startshift: startTime,
                    endshift: endTime,
                    breakstart: breakStart,
                    breakend: breakEnd,
                    dayoff: isWorking
                });

                saveData({
                    label: "Schedule",
                    method: id !== 0 ? 'PUT' : 'POST',
                    endPoint: "schedule",
                    id: id !== 0 ? id : null,
                    body: Body
                });
                setOpen(false);
            }
            else {
                warning(`The Schedule for ${get_Date(trnDate, 'MMMM DD,YYYY')} already exists.`);
            }
        }
        else {
            warning('Please, fill out the required fields !')
        }
    }

    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })
    
    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            <p class="text-gray-400 mb-4">TimeSheet Information</p>

           <TextboxFlex label={'User'} mandatory={true} input={
                <Select
                    value={uid}
                    placeholder="Select User"
                    status={uid === '' ? 'error' : ''}
                    style={{ width: 300 }}
                    size="large"
                    disabled={userDisable || id !==0 || !isAdmin}
                    onChange={(value) => setUid(value)}
                    options={[{ value: '', label: '' }, ...userList.filter(a => !a.status.toLowerCase().includes('inactive')).map(item => ({
                        value: item.id,
                        label: <AssignedTo key={item.id} userId={item.id} userList={userList} />
                    }))]}
                />
            } />


            <TextboxFlex label={'Date'} mandatory={true} input={       
                <DatePicker
                    disabled={dateDisable || id !== 0}
                    allowClear={false}
                    value={trnDate === '' ? trnDate : dayjs(trnDate, 'YYYY-MM-DD')}
                    onChange={(date, dateString) => setTrnDate(dateString)} />     
            } />
            

            <TextboxFlex label={'Timing'} mandatory={true} input={
                <RangePicker placeholder={['Start', 'End']}
                    allowClear={false}
                    use12Hours
                    showSecond={false}
                    format={"h:mm a"}
                    value={[dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]}
                    onChange={(time, timeString) => {
                        setStartTime(dayjs(timeString[0], 'h:mm a').format('HH:mm:ss'));
                        setEndTime(dayjs(timeString[1], 'h:mm a').format('HH:mm:ss'));
                    }} />
            } />
            <TextboxFlex label={'Break'} mandatory={true} input={
                <RangePicker placeholder={['Start', 'End']}
                    allowClear={false}
                    use12Hours
                    showSecond={false}
                    format={"h:mm a"}
                    value={[dayjs(breakStart, 'HH:mm'), dayjs(breakEnd, 'HH:mm')]}
                    onChange={(time, timeString) => {
                        setBreakStart(dayjs(timeString[0], 'h:mm a').format('HH:mm:ss'));
                        setBreakEnd(dayjs(timeString[1], 'h:mm a').format('HH:mm:ss'));
                    }} />
            } />

            <TextboxFlex label={'Working'} mandatory={true} input={
                <Switch checkedChildren={'Working'} unCheckedChildren={'Day off'} value={isWorking} onChange={(e) => setIsWorking(e)} />
            } />

            {contextHolder}
        </div>
    )
}

export default ScheduleDetail;