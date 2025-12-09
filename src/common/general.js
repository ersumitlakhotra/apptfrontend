import dayjs from 'dayjs';
import { get_Date, LocalDate } from './localDate';

const getDay = (date) => {
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayNum = dayjs(get_Date(date, 'YYYY-MM-DD')).get('day');
    return weekdays[dayNum];
}

export const isOpenForWork = (date, info ) => {
    const _result = [];
    let inTimeString = '00:00:00';
    let outTimeString = '00:00:00';
    let isOpenString = false;
    switch (getDay(date).toLowerCase()) {
        case 'sunday':
            {
                inTimeString = info.sunday[0]; outTimeString = info.sunday[1]; isOpenString = info.sunday[2];
                break;
            }
        case 'monday':
            {
                inTimeString = info.monday[0];
                outTimeString = info.monday[1];
                isOpenString = info.monday[2];
                break;
            }
        case 'tuesday':
            {
                inTimeString = info.tuesday[0];
                outTimeString = info.tuesday[1];
                isOpenString = info.tuesday[2];
                break;
            }
        case 'wednesday':
            {
                inTimeString = info.wednesday[0];
                outTimeString = info.wednesday[1];
                isOpenString = info.wednesday[2];
                break;
            }
        case 'thursday':
            {
                inTimeString = info.thursday[0];
                outTimeString = info.thursday[1];
                isOpenString = info.thursday[2];
                break;
            }
        case 'friday':
            {
                inTimeString = info.friday[0];
                outTimeString = info.friday[1];
                isOpenString = info.friday[2];
                break;
            }
        case 'saturday':
            {
                inTimeString = info.saturday[0];
                outTimeString = info.saturday[1];
                isOpenString = info.saturday[2];
                break;
            }
        default:
            {
                inTimeString = '00:00:00'; outTimeString = '00:00:00'; isOpenString = false;
                break;
            }
    }

    _result.push({
        date,               // <-- date included here
        inTime: inTimeString,
        outTime: outTimeString,
        isOpen: isOpenString,
    });
    return _result;
} 


export const compareTimes=(time1, time2)=> {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);

    if (h1 > h2 || (h1 === h2 && m1 > m2)) return 1;   // time1 is later
    if (h1 < h2 || (h1 === h2 && m1 < m2)) return -1;  // time1 is earlier
    return 0;                                          // times are equal
}

export const getFutureDates=(numberOfDays)=> {
    const dates = [];
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    for (let i = 1; i <= numberOfDays; i++) {
        let today = new Date(LocalDate());
        const futureDate = new Date(today); // Create a new Date object to avoid modifying 'today'
        futureDate.setDate(today.getDate() + i);
        const dayName = weekdays[futureDate.getDay()];
        
        
        const date = new Date(futureDate);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");


        dates.push({ key: `${yyyy}-${mm}-${dd}`, label: futureDate.getDate(), weekday: dayName });
    }
    return dates;
}
