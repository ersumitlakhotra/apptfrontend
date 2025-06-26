import { Tag } from "antd"
import { CalendarOutlined } from '@ant-design/icons';

const EventAll = () => {
return(
    <div class="mt-4">
        <div class="border rounded-md border-gray-100 p-2 mb-3 bg-gray-50">
            <div class="flex flex-row gap-4">
                

                <div class="flex flex-col w-full">                 
                    <p class='text-lg font-semibold'>25% Discount on Services @Threading</p>              
                    <p class='text-sm italic text-gray-400'>Description </p>
                    <p class='mt-2 flex items-center gap-3 text-gray-400 text-sm'>
                        <CalendarOutlined/>
                        Fri, Nov 25 - Sat, Nov 26                     
                    </p>
                </div>

                <div>
                    <Tag color="green" className="flex items-center justify-end">Live</Tag>
                </div>    
            </div>
        </div>      
    </div>
)
}

export default EventAll