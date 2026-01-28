
import { useEffect, useState } from "react";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';
import { getStorage } from '../../common/localStorage';
import { SortUpcomingAppointments } from '../../common/general';
import AppointmentCards from "./appointmentCard";
import { IoMdWarning } from "react-icons/io";
const WaitingApproval = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [servicesList, setServicesList] = useState([]);

    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();

        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: 'order'
        })
        const userResponse = await FetchData({
            method: 'GET',
            endPoint: 'user'
        })
        const serviceResponse = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })

        let order = (orderResponse.data).filter(a => a.status.toUpperCase() === 'DRAFT');
        let user = userResponse.data;
        if (localStorage.role === 'Employee')
        {
            order = order.filter(item => item.assignedto === localStorage.uid)
            user = user.filter(item => item.id === localStorage.uid)
        }

        setUserList(user);
        setServicesList(serviceResponse.data);
        setOrderList(SortUpcomingAppointments(order))
        setIsLoading(false);
    }

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2  shadow-md hover:shadow-xl ' style={{height:'370px'}}>
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
                                <AppointmentCards key={item.id} index={item.id} data={item} userList={userList} servicesList={servicesList} />
                            )
                        })}
                        
                    </div>
                </>
            } />
        </div>
    )
}

export default WaitingApproval