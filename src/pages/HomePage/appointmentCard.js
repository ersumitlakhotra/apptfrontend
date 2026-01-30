import { Button, Tooltip, Popconfirm } from "antd"
import AssignedTo from "../../common/assigned_to"
import { MdDownloadDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import Services from "../../common/services";
import FlexBoxRow from "../../common/custom/flexboxRow";
import { get_Date, getDay } from "../../common/localDate"; 
import { UnorderedListOutlined, ContactsOutlined } from '@ant-design/icons';
import { useResponseButtons } from "../../components/Order/responseButton";

const AppointmentCards = ({ index, data, userList, servicesList,onClick }) => {  
     const {Accept,Reject} = useResponseButtons();
    return (
        <div key={index} class={`border p-4 text-xs bg-gray-50 rounded-lg  mb-2 cursor-pointer hover:bg-gray-100 hover:shadow`}
        onClick={() => onClick(index)}>
            <div class='flex flex-row justify-between items-center mb-2'>
                <AssignedTo key={data.id} userId={data.assignedto} userList={userList} />
                <div class='flex flex-row gap-2 items-center justify-end sticky z-30'>
                    <Accept id={index} userList={userList} servicesList={servicesList} />
                    <Reject id={index} userList={userList} servicesList={servicesList} />
                </div>   
            </div>
            <FlexBoxRow icon={<FiClock size={12} />} label={`${getDay(data.trndate)} ${get_Date(data.trndate, 'MMMM DD, YYYY')} [ ${data.slot} ]`} />
            <FlexBoxRow icon={<ContactsOutlined size={12} />} label={`${data.name} : ${data.cell}`} />
            <FlexBoxRow icon={<UnorderedListOutlined size={12} />} label={<Services servicesItem={data.serviceinfo} servicesList={servicesList} />} />

        </div>
    )
}

export default AppointmentCards