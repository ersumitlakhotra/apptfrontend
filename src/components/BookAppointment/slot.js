/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { get_Date, LocalDate, LocalTime, UTC_LocalDateTime } from '../../common/localDate';
import dayjs from 'dayjs';

function getFutureDates(numberOfDays) {
    const dates = [];
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    for (let i = 1; i < numberOfDays; i++) {
        let today = new Date(LocalDate());
        const futureDate = new Date(today); // Create a new Date object to avoid modifying 'today'
        futureDate.setDate(today.getDate() + i);
        const dayName = weekdays[futureDate.getDay()];
        dates.push({ key: futureDate, label: futureDate.getDate(), weekday: dayName });
    }
    return dates;
}
const Slot = ({ daysAdvance, trndate, setTrnDate, slot, setSlot, isOpen, isUserWorking, availableSlot, employeeName }) => {

    const [dateAvailable, setDateAvailable] = useState([]);
    const [morningSlot, setMorningSlot] = useState([]);
    const [afternoonSlot, setAfternoonSlot] = useState([]);
    const [eveningSlot, setEveningSlot] = useState([]); 

    const options = [
        { key: 1, label: 'Morning', slotList: morningSlot },
        { key: 2, label: 'Afternoon', slotList: afternoonSlot },
        { key: 3, label: 'Evening', slotList: eveningSlot },
    ];

    useEffect(() => {
        setDateAvailable(getFutureDates(daysAdvance));
    }, [daysAdvance])

    useEffect(() => {
        let available=availableSlot;
        let localTime = LocalTime('HH:mm:ss');
        if (trndate === LocalDate()) {
            available = availableSlot.filter(item =>
                dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] > localTime.split(':')[0] ||
                (dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] === localTime.split(':')[0] &&
                dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[1] > localTime.split(':')[1] ));
        }
        const morning = available.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] < 12);
        const afternoon = available.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] >= 12 && dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] < 16 );
        const evening = available.filter(item => dayjs(item.id, 'hh:mm A').format('HH:mm:ss').split(':')[0] >=16 );
        setMorningSlot(morning)
        setAfternoonSlot(afternoon)
        setEveningSlot(evening)
    }, [availableSlot])

   
    return (
        <div class='flex flex-col font-normal mt-2 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Select a date</p>
            
            <div class='overflow-x-auto mb-2 flex flex-row gap-3 pb-4'>
                {dateAvailable.map(item =>
                    <div key={item.key} class='flex-col w-10 gap-2' onClick={() => setTrnDate(UTC_LocalDateTime(item.key, 'YYYY-MM-DD'))} >
                        <div class={`border w-10 h-12 rounded-xl flex justify-center items-center p-2 ${UTC_LocalDateTime(item.key, 'YYYY-MM-DD') === trndate ? 'bg-cyan-400 text-white font-bold' : 'bg-gray-50'} shadow-sm cursor-pointer`} >{item.label}</div>
                        <p class='text-xs text-gray-400 flex justify-center items-center'>{item.weekday}</p>
                    </div>
                )}
            </div>
            <p class='text-sm font-sans font-semibold mb-4'>Slots Availability : {get_Date(trndate, 'DD MMM YYYY') }</p>

            <div class='w-full flex flex-row gap-12 text-xs'>
                {(isOpen && isUserWorking) ?                 
                        options.map(opt =>
                            <div key={opt.key} class='flex flex-col gap-2'>
                                <p class='flex-row flex justify-center items-center'>{opt.label}</p>
                                {opt.slotList.length === 0 ? <p class='text-xs text-gray-500'>Empty</p> :
                                    opt.slotList.map(item => (
                                        <Button key={item.id} color={slot === item.id ? 'cyan' : 'default'}
                                            variant="outlined"
                                            disabled={item.disabled}
                                            onClick={() => { setSlot(item.id) }}>

                                            {item.id}
                                        </Button>
                                    ))}
                            </div>
                        )              
                    :
                        !isOpen ? <Tag color='red'>Business is closed . Please book an appointment for another day!</Tag>
                        :!isUserWorking ? <Tag color='red'>The {employeeName} has the DAY OFF.</Tag>
                        :<></>
                }
            </div>                   
        </div>
    )
}

export default Slot