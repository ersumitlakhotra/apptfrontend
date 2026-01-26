/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useImperativeHandle, useState } from "react";
import { Button, DatePicker, Popover, Radio, Select, Switch, TimePicker } from "antd";
import { CloudUploadOutlined, EyeOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import useAlert from "../../common/alert.js";
import { TextboxFlex } from "../../common/textbox.js";
import { get_Date, LocalDate } from "../../common/localDate.js";
import dayjs from 'dayjs';
import { createDateSeries } from "../../common/general.js";
import { apiCalls } from "../../hook/apiCall.js";
import AssignedTo from "../../common/assigned_to.js";
const { RangePicker } = TimePicker;


const ScheduleDetail = ({ id, refresh, ref, scheduleList, userList, saveData, setOpen, userId = null, frmDate = LocalDate() }) => {
    const [fromDate, setFromDate] = useState(LocalDate());
    const [toDate, setToDate] = useState(LocalDate());
    const [startTime, setStartTime] = useState('09:00:00');
    const [endTime, setEndTime] = useState('21:00:00');
    const [isWorking, setIsWorking] = useState(true);
    const [value, setValue] = useState('Single');
    const [uid, setUid] = useState('');
    const { contextHolder, error, warning } = useAlert();

    useEffect(() => {
        if (id === 0) {
            setFromDate(frmDate); setToDate(LocalDate());
            setStartTime('09:00:00'); setEndTime('21:00:00');
            setIsWorking(true); setValue('Single');
            setUid(userId === null ? '' : userId);
        }
        else {
            const editList = scheduleList.find(item => item.id === id)
            setFromDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
            setToDate(get_Date(editList.trndate, 'YYYY-MM-DD'));
            setStartTime(editList.startshift);
            setEndTime(editList.endshift);
            setIsWorking(editList.dayoff);
            setValue('Single');
            setUid(editList.uid);
        }
    }, [refresh])

    useEffect(() => {
        if (isWorking) {
            if (startTime === '00:00:00')
                setStartTime('09:00:00');
            if (endTime === '00:00:00')
                setEndTime('21:00:00');
        }
    }, [isWorking])

    const save = async () => {
        if (id === 0) {
            if (uid === '') {
                warning('Please, fill out the required fields !')
            }
            else {
                if (value === 'Single')
                    createSingleSchedule();
                else
                    createMultipleSchedule();
            }

        }
        else {
            updateSchedule();
        }
    }

    const createSingleSchedule = async () => {
        try {
            const ScheduleBody = JSON.stringify({
                cid: localStorage.getItem('cid'),
                uid: uid,
                trndate: fromDate
            });
            const isValid = await apiCalls("POST", 'app/schedule/date', null, null, ScheduleBody);
            if (isValid.status === 500) {

                const Body = JSON.stringify({
                    uid: uid,
                    trndate: fromDate,
                    startshift: isWorking ? startTime : '00:00:00',
                    endshift: isWorking ? endTime : '00:00:00',
                    dayoff: isWorking
                });
                saveData({
                    label: "Schedule",
                    method: 'POST',
                    endPoint: "schedule",
                    id: null,
                    body: Body
                });
                setOpen(false);
            }
            else {
                warning(`The TimeSheet for ${get_Date(fromDate, 'MMMM DD,YYYY')} already exists.`);
            }
        }
        catch (err) {
            error(err)
        }
    }
    const createMultipleSchedule = async () => {
        try {
            const dates = createDateSeries(fromDate, toDate);
            dates.map(async (date, index) => {
                const ScheduleBody = JSON.stringify({
                    cid: localStorage.getItem('cid'),
                    uid: uid,
                    trndate: date
                });
                const isValid = await apiCalls("POST", 'app/schedule/date', null, null, ScheduleBody);
                if (isValid.status === 500) {

                    const Body = JSON.stringify({
                        uid: uid,
                        trndate: date,
                        startshift: isWorking ? startTime : '00:00:00',
                        endshift: isWorking ? endTime : '00:00:00',
                        dayoff: isWorking
                    });
                    saveData({
                        label: "Schedule",
                        method: 'POST',
                        endPoint: "schedule",
                        id: null,
                        body: Body
                    });
                }
            })
            setOpen(false);
        }
        catch (err) {
            error(err)
        }
    }
    const updateSchedule = async () => {
        try {

            const Body = JSON.stringify({
                uid: uid,
                trndate: fromDate,
                startshift: isWorking ? startTime : '00:00:00',
                endshift: isWorking ? endTime : '00:00:00',
                dayoff: isWorking
            });
            saveData({
                label: "Schedule",
                method: 'PUT',
                endPoint: "schedule",
                id: id,
                body: Body
            });
            setOpen(false);
        }
        catch (err) {
            error(err)
        }
    }

    useImperativeHandle(ref, () => {
        return {
            save,
        };
    })
    const plainOptions = ['Single', 'Multiple'];
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
                    disabled={id !== 0}
                    onChange={(value) => setUid(value)}
                    options={[{ value: '', label: '' }, ...userList.filter(a => !a.status.toLowerCase().includes('inactive')).map(item => ({
                        value: item.id,
                        label: <AssignedTo key={item.id} userId={item.id} userList={userList} />
                    }))]}
                />
            } />

            <TextboxFlex label={'Option'} mandatory={true} input={
                <Radio.Group options={plainOptions} onChange={(e) => setValue(e.target.value)} value={value} disabled={id !== 0} />
            } />

            <TextboxFlex label={'Date'} mandatory={true} input={
                <div class='flex flex-col md:flex-row md:justify-end gap-2 '>
                    <Popover placement="bottom" title={"Filter by From Date"} content={
                        <div>
                            <DatePicker
                                style={{ width: '100%' }}
                                disabled={id !== 0}
                                allowClear={false}
                                value={fromDate === '' ? fromDate : dayjs(fromDate, 'YYYY-MM-DD')}
                                onChange={(date, dateString) => setFromDate(dateString)} />
                        </div>
                    }>
                        <Button className="text-xs"><span class='font-medium'> {value === 'Multiple' ? 'From' : 'Date'} :  </span><span class='text-blue-500'> {fromDate}  </span></Button>
                    </Popover>
                    {value === 'Multiple' &&
                        <Popover placement="bottom" title={"Filter by To Date"} content={
                            <div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    allowClear={false}
                                    value={toDate === '' ? toDate : dayjs(toDate, 'YYYY-MM-DD')}
                                    onChange={(date, dateString) => setToDate(dateString)} />
                            </div>
                        }>
                            <Button className="text-xs"><span class='font-medium'>To :   </span><span class='text-blue-500'> {toDate}  </span></Button>
                        </Popover>
                    }

                </div>
            } />

            <TextboxFlex label={'Time'} mandatory={true} input={
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

            <TextboxFlex label={'Working'} mandatory={true} input={
                <Switch checkedChildren={'Working'} unCheckedChildren={'Day off'} value={isWorking} onChange={(e) => setIsWorking(e)} />
            } />

            {contextHolder}
        </div>
    )
}

export default ScheduleDetail;