import AssignedTo from "../../common/assigned_to"
import { convertTo12Hour } from "../../common/general"

const ScheduleCard = ({ index, data, userList }) => {
    return (
        <div key={index} class={`border p-4  text-xs bg-gray-50 rounded-lg  mb-2 cursor-pointer hover:bg-gray-100 hover:shadow`}>
            {userList.length === 0 ? <p class='text-left p-4 text-sm font-medium text-gray-500'> There aren't any active users .</p> :

                <div class='flex flex-row justify-between items-center mb-2'>
                    <AssignedTo key={data.id} userId={data.id} userList={userList} />
                    <div class='flex flex-row gap-2 items-center justify-end'>

                    </div>
                </div>

            }
        </div>
    )
}

export default ScheduleCard