
import { Tag } from "antd";
import { get_Date, getDay, LocalDate } from "../../common/localDate"
import { IoIosCalendar, IoMdClose } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineQuestionMark, MdDownloadDone, MdPendingActions } from "react-icons/md";
import { useEffect, useState } from "react";
import FetchData from "../../hook/fetchData";
import { getStorage } from "../../common/localStorage";
import IsLoading from "../../common/custom/isLoading";

const CalenderCard = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [inprogressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();
        const res = await FetchData({
            method: 'GET',
            endPoint: 'order'
        })

        let order = (res.data).filter(a => get_Date(a.trndate, 'YYYY-MM-DD') === LocalDate());
        if (localStorage.role === 'Employee')
            order = order.filter(item => item.assignedto === localStorage.uid)

        const pending = order.filter(a => a.status.toUpperCase() === 'PENDING');
        const inprogress = order.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = order.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = order.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setOrdersList(order.length > 0 ? order : [])
        setPendingList(pending.length > 0 ? pending : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

        setIsLoading(false);
    }

    const listItems = ({ icon, label, value, color }) => {
        return (
            <div class='flex flex-row items-center justify-between  p-1 rounded-lg cursor-pointer hover:bg-black hover:text-white duration-150  hover:shadow-md'>
                <div class={`flex flex-row items-center gap-2 text-xs`}  >
                    {icon}
                    {label}
                </div>
                <Tag color={'#000000'}>{value}</Tag>
            </div>
        )
    }
    return (
        <div class='w-full bg-gray-200 border rounded-3xl p-4 text-gray-800 flex gap-6  shadow-md   hover:shadow-lg '>
            <IsLoading isLoading={isLoading} input={
                <>
                    <div class='w-1/3 flex flex-col justify-between text-xs font-semibold font-sans  '>
                        <div class='flex flex-col gap-0 hover:font-bold hover:underline duration-150 cursor-pointer'>
                            <div class='relative'>
                                <IoIosCalendar size={40} />
                                <span className="absolute top-4 left-3 text-xs">{getDay(LocalDate(), true)}</span>
                            </div>
                            <span>{get_Date(LocalDate(), 'MMMM DD, YYYY')}</span>
                        </div>
                        <span class='hover:font-bold hover:underline duration-150 cursor-pointer'>{ordersList.length} Calender events</span>
                    </div>

                    <div class='w-2/3 flex flex-col text-xs font-semibold font-sans  '>
                        {listItems({ icon: <MdOutlineQuestionMark size={12} />, label: 'Waiting for Response', value: 0, color: '#000000' })}
                        {listItems({ icon: <MdPendingActions size={12} />, label: 'Pending', value: pendingList.length, color: 'yellow' })}
                        {listItems({ icon: <IoHourglassOutline size={12} />, label: 'In Progress', value: inprogressList.length, color: 'blue' })}
                        {listItems({ icon: <MdDownloadDone size={12} />, label: 'Completed', value: completedList.length, color: 'green' })}
                        {listItems({ icon: <IoMdClose size={12} />, label: 'Cancelled', value: cancelledList.length, color: 'red' })}
                    </div>
                </>} />
        </div>
    )
}

export default CalenderCard