import { Tag } from "antd"
import { CalendarOutlined,  UnorderedListOutlined,  DollarOutlined } from '@ant-design/icons';
import { Tags } from "../../common/tags";
import dayjs from 'dayjs';
import { getBorder, getTag } from "../../common/items";
const Events = ({ eventList, servicesList, btn_Click }) => {
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            {eventList.length > 0 ?
                eventList.map(item => (
                    <div key={item.id} onClick={() => btn_Click(item.id)} class={`border-s-4 ${getBorder(item.case)}  p-2 mb-3 `}>
                        <div class="flex flex-row gap-4">
                            <div class="flex flex-col w-full">
                                <p class='text-lg font-semibold'>{item.title}</p>
                                <p class='text-sm italic '>{item.description} </p>
                                <p class='mt-2 flex items-center gap-1 text-gray-400 text-sm'>
                                    <UnorderedListOutlined />
                                    {
                                        item.serviceinfo !== null &&
                                        servicesList.filter(a =>
                                            item.serviceinfo.some(b => b === a.id)
                                        ).map(c => getTag(item.case, c.name))
                                    }
                                </p>
                                <p class='mt-1 flex items-center gap-3 text-gray-400 text-sm'>
                                    <DollarOutlined />
                                    {item.discount}
                                </p>
                                <p class='mt-1 flex items-center gap-3 text-gray-400 text-sm'>
                                    <CalendarOutlined />
                                    {dayjs(item.startdate).format('ddd, MMM DD')} - {dayjs(item.enddate).format('ddd, MMM DD')}
                                </p> 
                            </div>

                            <div>
                                {Tags(item.case)}
                            </div>
                        </div>
                    </div>
                )) :
                <div class='text-left p-4 text-sm font-medium text-gray-500'>No data found</div>
            }
        </div>
    )
}

export default Events

