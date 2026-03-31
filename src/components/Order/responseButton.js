import { Button, Popconfirm, Tooltip } from "antd"
import { MdDownloadDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useEmail } from "../../email/email";
import {CloseOutlined} from '@ant-design/icons';
import { showCancelRejectModal } from "./cancelrejectmodel";

export const useResponseButtons = (saveData) => {
    const { AppointmentStatus } = useEmail();

    const onSave = async(id, status,setOpenView) => {
        let reason = '';
        if( status === AppointmentStatus.REJECTED ||  status === AppointmentStatus.CANCELLED )  
              reason = await showCancelRejectModal();
        
        if(reason === 'cancel')
            return;
        
         saveData({
            label: "Appointment",
            method: 'POST',
            endPoint: status === AppointmentStatus.CONFIRMED ? "order/confirmed" : status === AppointmentStatus.REJECTED ? "order/rejected" : "order/cancel",
            id: id,
            logs: true,
            email: true,
            status: status,
            body:JSON.stringify({
                reason: reason,
            })
        })
        setOpenView !== null && setOpenView(false)
    }
    const Accept = ({ id, labelVisible = false, size = "middle", setOpenView =null}) => {
        return (
            <Tooltip placement="top" title={'Accept'} >
                <Button color="cyan" variant="solid" icon={<MdDownloadDone size={12} />} size={size} onClick={(e) => { e.stopPropagation(); onSave(id, AppointmentStatus.CONFIRMED,setOpenView);   }} >
                {labelVisible && 'Accept'}</Button>
            </Tooltip>
        )
    }

    const Reject = ({ id, labelVisible = false, size = "middle", setOpenView = null }) => {
        return (
            <Tooltip placement="top" title={'Reject'} >
                <Popconfirm
                    title="Reject"
                    description="Are you sure to Reject ? "
                    onConfirm={(e) => { e?.stopPropagation(); onSave(id, AppointmentStatus.REJECTED,setOpenView); }}
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
    const Cancel = ({ id, labelVisible = false, size = "middle", setOpenView = null }) => {
        return (
            <Tooltip placement="top" title={'Cancel'} >
                <Popconfirm
                    title="Cancel Appointment"
                    description="Are you sure to Cancel ? "
                    onConfirm={(e) => { e?.stopPropagation(); onSave(id, AppointmentStatus.CANCELLED,setOpenView);}}
                    onCancel={(e) =>{e?.stopPropagation();}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button color="red" variant="solid" icon={<CloseOutlined size={12} />}  size={size} onClick={(e) => e.stopPropagation()}>
                    {labelVisible && 'Cancelled'}</Button>
                </Popconfirm>
            </Tooltip>
        )
    }
return {Accept,Reject,Cancel}
}

