/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Collapse } from "antd";
import { useEffect, useState } from "react";
import { UTC_LocalDateTime } from "../../common/localDate";
import OrderLogs from "./order_log";
import EventLogs from "./event_log";
import ServicesLogs from "./services_log";
import UsersLogs from "./users.log";
import ExpenseLogs from "./expense_log";
import PaymentLogs from "./payment_log";
import AssignedTo from "../../common/assigned_to";
const LogsView = ({ id, ltype, logsList, orderList, userList, servicesList }) => {
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        const editList = logsList.filter(item => item.lid === id && item.ltype === ltype);
        if (editList.length === 0)
            setLogsData([]);
        else
            setLogsData(editList);
    }, [id])

    return (
        <div class='flex flex-col font-normal gap-3 mt-2'>
            {logsData.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any history to show right now.</p> :
                logsData.map(item =>
                    <>
                        <Badge.Ribbon
                            text={item.status}
                            color={item.status.toUpperCase() === "CREATED" ? "yellow" : item.status.toUpperCase() === "MODIFIED" ? "blue" : "red"} >
                            <Collapse
                                items={[{
                                    key: item.id,
                                    label: (
                                        <div class='flex items-center justify-between pe-20 ' >
                                            <AssignedTo userId={item.userid} userList={userList} class='text-xs font-semibold text-gray-500' />
                                            <span class='text-xs  text-gray-500'>{UTC_LocalDateTime(item.createdat, 'MMM, DD YYYY - hh:mm A ')}</span>
                                        </div>),
                                    children:
                                        item.ltype.toUpperCase() === "ORDER" ? <OrderLogs key={item.id} id={item.lid} dataList={item.datainfo} orderList={orderList} userList={userList} servicesList={servicesList} /> :
                                            item.ltype.toUpperCase() === "EVENT" ? <EventLogs key={item.id} dataList={item.datainfo} servicesList={servicesList} /> :
                                                item.ltype.toUpperCase() === "SERVICES" ? <ServicesLogs key={item.id} dataList={item.datainfo} servicesList={servicesList} /> :
                                                    item.ltype.toUpperCase() === "USERS" ? <UsersLogs key={item.id} dataList={item.datainfo} servicesList={servicesList} /> :
                                                        item.ltype.toUpperCase() === "EXPENSE" ? <ExpenseLogs key={item.id} dataList={item.datainfo} servicesList={servicesList} /> :
                                                            item.ltype.toUpperCase() === "PAYMENT" ? <PaymentLogs key={item.id} dataList={item.datainfo} userList={userList} servicesList={servicesList} /> : <></>
                                }]}
                            />

                        </Badge.Ribbon>
                    </>)}

        </div>
    )
}

export default LogsView;