
import { useEffect, useState } from "react";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';
import { getStorage } from '../../common/localStorage';
import { SortUpcomingAppointments } from '../../common/general';
import AppointmentCards from "./appointmentCard";
import { IoMdWarning } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
import { useEmail } from "../../email/email";

const WaitingApproval = () => {
    const { saveData, refresh } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const {AppointmentStatus} = useEmail();

    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();
        const isAdmin = localStorage.role === 'Administrator'

        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: !isAdmin ? 'orderPerUser' : 'order', //
            id: !isAdmin ? localStorage.uid : null
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user',
            id: !isAdmin ? localStorage.uid : null
        })
        const serviceResponse = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })

        let order = (orderResponse.data).filter(a => a.status.toUpperCase() === 'AWAITING');
    
        setUserList(userResponse.data);
        setServicesList(serviceResponse.data);
        setOrderList(SortUpcomingAppointments(order))
        setIsLoading(false);
    }

    const onSave = (id, status) => {
        saveData({
            label: "Appointment",
            method: 'POST',
            endPoint: status === AppointmentStatus.CONFIRMED ? "order/confirmed" : "order/rejected",
            id: id,
            logs: true,
            email: true,
            body: [],
            status: status,
            userList: userList,
            servicesList: servicesList
        })
    }

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2  shadow-md hover:shadow-xl ' style={{height:'390px'}}>
            <IsLoading isLoading={isLoading} rows={9} input={
                <>
                    <div class=' flex-1 overflow-auto w-full scroll-auto '>
                        <div class='flex flex-row gap-2 bg-white items-center text-gray-800  font-medium font-sans pb-4 sticky top-0 z-40'>
                            <IoMdWarning  style={{ fontSize: '28px',color:'orange' }} />
                            <span>Awaiting Request</span>
                        </div>

                        {orderList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any pending requests .</p> :
                            orderList.map(item => {
                            return (           
                                <AppointmentCards key={item.id} index={item.id} data={item} userList={userList} servicesList={servicesList} onSave={onSave} AppointmentStatus={AppointmentStatus} />
                            )
                        })}
                        
                    </div>
                </>
            } />
        </div>
    )
}

export default WaitingApproval