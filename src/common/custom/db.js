import { useState } from "react";
import FetchData from "../../hook/fetchData";
import { getStorage } from "../localStorage";

const useDB = () => { 
    const [orderList, setOrderList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [servicesList, setServiceList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [companyList, setCompanyList] = useState([]); 

    const List = {
        APPOINTMENT: orderList,
        EVENT: eventList,
        CUSTOMER: customerList,
        SERVICES: servicesList,
        USER: userList,
        SCHEDULE: scheduleList,
        COMPANY: companyList,
    } 
    const init = async () => {
        order();
        event();
        customer();
        service();
        user();
        schedule();
        company();
    }

    const order = async () => {
        const localStorage =await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: !localStorage.isAdmin ? 'order' : 'order', //orderPerUser
            id: !localStorage.isAdmin ? localStorage.uid : null
        })
        setOrderList(response.data)
    }  
    
    const event = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'event',
            eventDate: true
        })
        setEventList(response.data)
    }    

    const customer = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'customer'
        })
        setCustomerList(response.data)
    }
    const service = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'services'
        })
        setServiceList(response.data)
    }
    const user = async () => {
        const localStorage =await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: 'users',
            id: !localStorage.isAdmin ? localStorage.uid : null
        }) 
        setUserList(response.data)
    }

    const schedule = async () => {
        const localStorage = await getStorage();
        const response = await FetchData({
            method: 'GET',
            endPoint: !localStorage.isAdmin ? 'schedule' : 'schedule',//schedulePerUser
            id: !localStorage.isAdmin ? localStorage.uid : null
        }) 
        setScheduleList(response.data)
    }
    const company = async () => {
        const response = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        setCompanyList(response.data)
    }

    return {List,init, order,event,customer,service,user,schedule,company}
}
export default useDB