
import { Tag } from "antd";
import { get_Date, LocalDate } from "../../common/localDate"
import { IoMdClose } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineQuestionMark, MdDownloadDone, MdPendingActions } from "react-icons/md";
import { useEffect, useState } from "react";
import FetchData from "../../hook/fetchData";
import { getStorage } from "../../common/localStorage";
import IsLoading from "../../common/custom/isLoading";
import CalenderIcon from "../../common/custom/calenderIcon"; 
import { IoMdWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CalenderCard = () => {
    const navigate = useNavigate();
    const [ordersList, setOrdersList] = useState([]);
    const [draftList, setDraftList] = useState([]);
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
        const draft = order.filter(a => a.status.toUpperCase() === 'DRAFT');
        const inprogress = order.filter(a => a.status.toUpperCase() === 'IN PROGRESS');
        const completed = order.filter(a => a.status.toUpperCase() === 'COMPLETED');
        const cancelled = order.filter(a => a.status.toUpperCase() === 'CANCELLED');

        setOrdersList(order.length > 0 ? order : [])
        setPendingList(pending.length > 0 ? pending : [])
        setDraftList(draft.length > 0 ? draft : [])
        setInprogressList(inprogress.length > 0 ? inprogress : [])
        setCompletedList(completed.length > 0 ? completed : [])
        setCancelledList(cancelled.length > 0 ? cancelled : [])

        setIsLoading(false);
    }

    const listItems = ({ icon, label, value,filterBy }) => {
        return (
            <div class='flex flex-row items-center justify-between text-white  p-1 rounded-lg cursor-pointer hover:bg-white hover:text-blue-900 duration-150  hover:shadow-md'
                onClick={() => navigate('/calender', {
                    state: { searchParams: filterBy }
                })}>
                <div class={`flex flex-row items-center gap-2 text-xs`}  >
                    {icon}
                    {label}
                </div>
                <Tag >{value}</Tag>
            </div>
        )
    }
    return (
        <div class='w-full bg-blue-900 border rounded-3xl p-4 text-gray-800 flex gap-6  shadow-md   hover:shadow-lg '>
            <IsLoading isLoading={isLoading} input={
                <>
                    <div class='w-1/3 flex flex-col justify-between text-xs font-semibold font-sans  text-white ' onClick={() => navigate('/calender') }>
                        <div class='flex flex-col gap-0 hover:font-bold hover:underline duration-150 cursor-pointer'>
                            <CalenderIcon size={40}/>
                            <span>{get_Date(LocalDate(), 'MMMM DD, YYYY')}</span>
                        </div>
                        <span class='hover:font-bold hover:underline duration-150 cursor-pointer'>{ordersList.length} Calender events</span>
                    </div>

                    <div class='w-2/3 flex flex-col text-xs font-semibold font-sans  '>
                        {listItems({ icon: <IoMdWarning size={12} />, label: 'Awaiting Request', filterBy:'Draft', value: draftList.length })}
                        {listItems({ icon: <MdPendingActions size={12} />, label: 'Pending', filterBy: 'Pending' ,value: pendingList.length})}
                        {listItems({ icon: <IoHourglassOutline size={12} />, label: 'In Progress', filterBy: 'In progress', value: inprogressList.length })}
                        {listItems({ icon: <MdDownloadDone size={12} />, label: 'Completed', filterBy: 'Completed', value: completedList.length })}
                        {listItems({ icon: <IoMdClose size={12} />, label: 'Cancelled', filterBy: 'Cancelled', value: cancelledList.length })}
                    </div>
                </>} />
        </div>
    )
}

export default CalenderCard