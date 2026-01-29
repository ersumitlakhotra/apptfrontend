import { Button, Tooltip, Popconfirm } from "antd"
import AssignedTo from "../../common/assigned_to"
import { MdDownloadDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import Services from "../../common/services";
import FlexBoxRow from "../../common/custom/flexboxRow";
import { get_Date, getDay } from "../../common/localDate"; 
import { UnorderedListOutlined, ContactsOutlined } from '@ant-design/icons';
import { useEmail } from "../../email/email";

const AppointmentCards = ({ index, data, userList, servicesList, onSave }) => {  
     const {AppointmentStatus} = useEmail();
    return (
        <div key={index} class={`border p-4  text-xs bg-gray-50 rounded-lg  mb-2 cursor-pointer hover:bg-gray-100 hover:shadow`}>
            <div class='flex flex-row justify-between items-center mb-2'>
                <AssignedTo key={data.id} userId={data.assignedto} userList={userList} />
                <div class='flex flex-row gap-2 items-center justify-end'>
                    <Tooltip placement="top" title={'Accept'} >
                        <Button color="cyan" variant="solid" icon={<MdDownloadDone size={12} />} size="middle" onClick={() => onSave(index, AppointmentStatus.CONFIRMED)} />
                    </Tooltip>
                    <Tooltip placement="top" title={'Reject'} >
                    <Popconfirm
                        title="Reject"
                            description="Are you sure to Reject ? "
                        onConfirm={() => onSave(index, AppointmentStatus.REJECTED)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button color="red" variant="solid" icon={<IoMdClose size={12} />} size="middle" />
                    </Popconfirm>
                    </Tooltip>
                    
                </div>   
            </div>
            <FlexBoxRow icon={<FiClock size={12} />} label={`${getDay(data.trndate)} ${get_Date(data.trndate, 'MMMM DD, YYYY')} [ ${data.slot} ]`} />
            <FlexBoxRow icon={<ContactsOutlined size={12} />} label={`${data.name} : ${data.cell}`} />
            <FlexBoxRow icon={<UnorderedListOutlined size={12} />} label={<Services servicesItem={data.serviceinfo} servicesList={servicesList} />} />
            
            <div class='flex flex-col gap-1'>
            {/*
                <FlexBoxRow icon={<Octicons name='clock' size={16} />} text={<Text className='font-semibold'>{orderList.slot}</Text>} />
                <FlexBoxRow icon={<AntDesign name='user-add' size={16} />} text={<Text className='font-medium'>{orderList.customername}</Text>} />
                <FlexBoxRow icon={<Feather name='phone-call' size={16} />} text={<Text className='font-medium'>{orderList.customercell}</Text>} />
                */}
            </div>

        </div>
    )
}

export default AppointmentCards