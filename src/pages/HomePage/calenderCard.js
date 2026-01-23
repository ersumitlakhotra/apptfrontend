
import { Tag } from "antd";
import { get_Date, getDay, LocalDate } from "../../common/localDate"
import { IoIosCalendar,IoMdClose  } from "react-icons/io"; 
import { IoHourglassOutline  } from "react-icons/io5"; 
import { MdOutlineQuestionMark,MdDownloadDone ,MdPendingActions } from "react-icons/md";

const CalenderCard = () => {
    
 const listItems = ({ icon, lable, value, color }) => {
    return (
        <div class='flex flex-row items-center justify-between  p-1 rounded-lg cursor-pointer hover:bg-black hover:text-white duration-150 hover:shadow-md'>
            <div class={`flex flex-row items-center gap-2 text-xs`}  >
                {icon}
                {lable}
            </div>
            <Tag color={'#000000'}>{value}</Tag>
        </div>
    )
}
    return (
        <div class='w-full bg-gray-200 border rounded-3xl p-4 text-gray-800 flex gap-6  hover:shadow-md '>
            <div class='w-1/3 flex flex-col justify-between text-xs font-semibold font-sans  '>
                <div class='flex flex-col gap-0 hover:font-bold hover:underline duration-150 cursor-pointer'>
                    <div class='relative'>
                        <IoIosCalendar size={40} />
                        <span className="absolute top-4 left-3 text-xs">{getDay(LocalDate(), true)}</span>
                    </div>
                    <span>{get_Date(LocalDate(), 'MMMM DD, YYYY')}</span>
                </div>
                <span class='hover:font-bold hover:underline duration-150 cursor-pointer'>42 Calender events</span>
            </div>

            <div class='w-2/3 flex flex-col text-xs font-semibold font-sans  '>
                {listItems({ icon: <MdOutlineQuestionMark size={12} />, lable: 'Waiting for Response', value: 0, color: '#000000' })}
                {listItems({ icon: <MdPendingActions size={12} />, lable: 'Pending', value: 0 ,color: 'yellow'})}
                {listItems({ icon: <IoHourglassOutline size={12} />, lable: 'In Progress', value: 0 ,color: 'blue'})}
                {listItems({ icon: <MdDownloadDone  size={12}  />, lable: 'Completed', value: 0 ,color: 'green'})}
                {listItems({ icon: <IoMdClose size={12} />, lable: 'Cancelled', value: 0 , color: 'red'})}
            </div>
        </div>
    )
}

export default CalenderCard