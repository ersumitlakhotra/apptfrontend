import { Button, Tooltip } from "antd";
import { convertTo12Hour } from "../../common/general"
import { getBorder, getTag } from "../../common/items";
import {  EditOutlined } from '@ant-design/icons';
import { toMinutes } from "../../common/generateTimeSlots";

function getHeight (start, end)  {
    let startMinutes = toMinutes(start);
    let endMinutes = toMinutes(end);
    let heightInt = (endMinutes - startMinutes) / 15;
    let setHeight = `${(heightInt * 48) - 4}px`
    return setHeight;
};

const CalenderBody = ({slots, userList,orderList,servicesList, onView,onEdit }) => {
    return (
        <div class='flex flex-col py-2 '>
            {slots.map((item, index) =>
            (
                <div key={index} class='border-b h-12  text-sm  w-max min-w-full inline-flex gap-3  '   >
                    <div class='w-20 whitespace-nowrap p-3 sticky left-0 z-40 bg-white'>{convertTo12Hour(item.start)}</div>
                    {userList.map(a => (
                        <div key={a.id} class=' w-44  p-2'>
                            {orderList.filter(b => b.assignedto === a.id && b.start === item.start).map(c => (
                                <div
                                    key={c.id}
                                    style={{ height: getHeight(c.start, c.end), cursor: 'pointer' }}
                                    class={`flex flex-col gap-2 px-2 mt-4 border rounded-md text-xs border-s-4 ${getBorder(c.status)}`}>
                                    <div class='flex items-center justify-between  font-medium'>
                                        <p class='underline' onClick={() => onView(c.id)}  ># {c.order_no}</p>
                                        <Tooltip placement="top" title={'Edit'} >
                                            <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(c.id, c.order_no)} />
                                        </Tooltip>
                                    </div>
                                    <div class='flex flex-col overflow-hidden whitespace-nowrap ' onClick={() => onView(c.id)}>
                                        {c.serviceinfo !== null &&
                                            servicesList.filter(sl =>
                                                c.serviceinfo.some(b => b === sl.id)
                                            ).map(d => getTag(c.status, d.name))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default CalenderBody