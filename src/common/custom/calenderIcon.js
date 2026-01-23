
import { IoIosCalendar } from "react-icons/io";
import { getDay, LocalDate } from "../localDate";
const CalenderIcon = ({ size, color, position ='top-4 left-3'}) => {
    return (
        <div class={`relative ${color}`}>
            <IoIosCalendar size={size} />
            <span className={`absolute ${position} text-xs`}>{getDay(LocalDate(), true)}</span>
        </div>
    )
}
export default CalenderIcon