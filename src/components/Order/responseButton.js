import { Button, Popconfirm, Tooltip } from "antd"

import { MdDownloadDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useEmail } from "../../email/email";
import { useOutletContext } from "react-router-dom";

export const useResponseButtons = (saveData) => {
    const { AppointmentStatus } = useEmail();
   // const { saveData } = useOutletContext();

    const onSave = (id, status, userList, servicesList) => {
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
    const Accept = ({ id, userList, servicesList,labelVisible=false ,size="middle"}) => {
        return (
            <Tooltip placement="top" title={'Accept'} >
                <Button color="cyan" variant="solid" icon={<MdDownloadDone size={12} />} size={size} onClick={(e) => {e.stopPropagation(); onSave(id, AppointmentStatus.CONFIRMED, userList, servicesList)}} >
                {labelVisible && 'Accept'}</Button>
            </Tooltip>
        )
    }

    const Reject = ({ id, userList, servicesList,labelVisible=false,size="middle" }) => {
        return (
            <Tooltip placement="top" title={'Reject'} >
                <Popconfirm
                    title="Reject"
                    description="Are you sure to Reject ? "
                    onConfirm={(e) =>{e?.stopPropagation();  onSave(id, AppointmentStatus.REJECTED,userList, servicesList)}}
                    onCancel={(e) =>{e?.stopPropagation();}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button color="red" variant="solid" icon={<IoMdClose size={12} />}  size={size} onClick={(e) => e.stopPropagation()}>
                    {labelVisible && 'Reject'}</Button>
                </Popconfirm>
            </Tooltip>
        )
    }

return {Accept,Reject}
}

