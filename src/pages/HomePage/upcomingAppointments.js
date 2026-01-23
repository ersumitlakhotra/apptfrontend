
import { useEffect, useState } from "react";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';
import { getStorage } from '../../common/localStorage';
import { get_Date, LocalDate } from '../../common/localDate';
import { SortUpcomingAppointments } from '../../common/general';
import AppointmentCards from "./appointmentCard";

const UpcomingAppointments = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);

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

        setOrderList(SortUpcomingAppointments(order))

        setIsLoading(false);
    }

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2 cursor-pointer shadow-md hover:shadow-xl ' style={{height:'370px'}}>
            <IsLoading isLoading={isLoading} rows={9} input={
                <>
                    <div class=' flex-1 overflow-auto border w-full scroll-auto '>
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                        <AppointmentCards />
                    </div>
                </>
            } />
        </div>
    )
}

export default UpcomingAppointments