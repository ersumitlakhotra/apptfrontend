import FetchData from "../hook/fetchData"
import { apiCalls } from "../hook/apiCall"
import ReactDOMServer from "react-dom/server";
import Template from './template.js'
import { get_Date } from "../common/localDate";

export const useEmail = () => {
    const AppointmentStatus = {
        CONFIRMED: "Confirmed",
        CANCELLED: "Cancelled",
        RESCHEDULED: "Rescheduled",
        REJECTED: "Rejected",
    } 
    const getDetail = async (id, userList, servicesList) => {
        const orderResponse = await FetchData({
            method: 'GET',
            endPoint: 'order', //
            id: id
        })
        const companyResponse = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })

        const bookedWith = userList.find(items => items.id === orderResponse.data.assignedto).fullname;
        let serviceNames = '';
        servicesList.filter(a => orderResponse.data.serviceinfo.some(b => b === a.id)).map(item =>
            serviceNames += item.name + ', '
        )
        let address = companyResponse.data.addressinfo[0] !== null ? companyResponse.data.addressinfo[0].street + ', ' + companyResponse.data.addressinfo[0].city : '';
        return {
            order_no: orderResponse.data.order_no,
            date: orderResponse.data.trndate,
            slot: orderResponse.data.slot,
            name: orderResponse.data.name,
            sendTo: orderResponse.data.email,
            sendFrom: companyResponse.data.emailuser,
            pass: companyResponse.data.emailpass,
            storeName: companyResponse.data.name,
            storeId: companyResponse.data.store,
            cid: companyResponse.data.id,
            address: address,
            employee: bookedWith,
            services: serviceNames
        }
    }

    const sendEmail = async ({ id,status,userList,servicesList }) => {
        const order = await getDetail(id, userList, servicesList);
   
        const Body = JSON.stringify({
            emailUser: order.sendFrom,
            emailPass: order.pass,
            storeName: order.storeName,
            to: order.sendTo,
            subject: "Appointment " + status,
            message: ReactDOMServer.renderToStaticMarkup(
                <Template 
                heading={status}
                 name={order.name} 
                 order_no={order.order_no} 
                 professional={order.employee} 
                 date={get_Date(order.date,'MMM DD,YYYY')}
                 slot={order.slot}
                 services={order.services}
                 store={order.storeName}
                 address={order.address}
                 storeId={order.storeId}/>
            ),
        });
        try {
           const res= await apiCalls("POST", "sendmail", order.cid, null, Body); 
            return {status:res.status,message:res.message}        
        }
        catch (e) {
            return { status: 500, message: e.message }   
        }
    }
    return { sendEmail, AppointmentStatus }
}



