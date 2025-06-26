
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState } from "react";

const events = [
    {
        title: 'Spring Semester Begins',
        start: new Date(2025, 3, 10),
        end: new Date(2025, 3, 10),
    },
    {
        title: 'Orientation for New Students',
        start: new Date(2025, 3, 12, 9, 0),
        end: new Date(2025, 3, 12, 12, 0),
    },
    {
        title: 'Final Exams Week',
        start: new Date(2025, 5, 2),
        end: new Date(2025, 5, 6),
    },
    {
        title: 'Graduation Day 🎓',
        start: new Date(2025, 5, 10, 10, 0),
        end: new Date(2025, 5, 10, 10, 15),
    },
    {
        title: 'Graduation Day 2 🎓',
        start: new Date(2025, 5, 10, 10, 0),
        end: new Date(2025, 5, 10, 10, 15),
        className: 'red'
    },
    {
        title: 'Graduation Day 2 🎓',
        start: new Date(2025, 5, 10, 10, 0),
        end: new Date(2025, 5, 10, 10, 15),
    },
  ]

const localizer = momentLocalizer(moment)

//const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const Calender = ({ setLoading }) => {
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState('month')

    const onNavigate = useCallback((newDate) => {
        setDate(newDate)
    }, [])

    const onView = useCallback((newView) => {
        setView(newView)
    }, [])

    return (
        <div class="flex flex-col gap-4 mb-12">
        <span class="text-lg font-semibold text-gray-800">Calendar</span>
            <div class='w-full h-screen bg-white border rounded p-5 text-gray-500 flex flex-col gap-2'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    date={date}
                    onNavigate={onNavigate}                   
                    view={view}
                    onView={onView}
                    views={['month', 'week', 'day', 'agenda']}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
        </div>
    )
}

export default Calender