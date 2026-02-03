import { Button, Tooltip } from "antd";
import { convertTo12Hour } from "../../common/general"
import { getBorder, getTag } from "../../common/items";
import { EditOutlined } from '@ant-design/icons';
import { toMinutes } from "../../common/generateTimeSlots";
import { useResponseButtons } from "../../components/Order/responseButton";
import { useOutletContext } from "react-router-dom";
import IsLoading from "../../common/custom/isLoading";

function getHeight(start, end) {
    let startMinutes = toMinutes(start);
    let endMinutes = toMinutes(end);
    let heightInt = (endMinutes - startMinutes) / 15;
    let setHeight = `${(heightInt * 48) - 4}px`
    return setHeight;
};

const CalenderBody = ({ slots, orderList,isLoading }) => {

    const { saveData, viewOrder, editOrder, servicesList, userList } = useOutletContext();
    const { Accept, Reject } = useResponseButtons(saveData)

    const Card = ({ id, startTime }) => {
        let order = orderList.filter(b => b.assignedto === id && b.start === startTime);
        if (order.length > 1) {
            let searchFilter = order.filter(item => item.status.toUpperCase() !== 'REJECTED' && item.status.toUpperCase() !== 'CANCELLED')
            if (searchFilter.length > 0)
                order = searchFilter.slice(0, 1);
            else
                order = order.slice(0, 1);
        }
        return (
            order.map(c =>
                <div
                    key={c.id}
                    style={{ height: getHeight(c.start, c.end), cursor: 'pointer' }}
                    class={`flex flex-col  px-2 mt-4 border rounded-md text-xs border-s-4 sticky ${getBorder(c.status)}`}>
                    <div class='flex items-center  justify-between  font-medium '>
                        <p class='underline' onClick={() => viewOrder(c.id)}  ># {c.order_no}</p>
                        {c.status !== 'Awaiting' ?
                            <Tooltip placement="top" title={'Edit'} >
                                <Button type="link" icon={<EditOutlined />} size="small" onClick={() => editOrder(c.id, c.order_no)} />
                            </Tooltip> :
                            <div class='flex flex-row gap-2 items-center '>
                                <Accept id={c.id} userList={userList} servicesList={servicesList} size="small" />
                                <Reject id={c.id} userList={userList} servicesList={servicesList} size="small" />
                            </div>
                        }
                    </div>
                    <div class='flex flex-col overflow-hidden whitespace-nowrap  ' onClick={() => viewOrder(c.id)}>
                        {c.serviceinfo !== null &&
                            servicesList.filter(sl =>
                                c.serviceinfo.some(b => b === sl.id)
                            ).map(d => getTag(c.status, d.name))}
                    </div>
                </div>
            ))
    }

    return (
        <div class='flex flex-col py-2 '>
        <IsLoading isLoading={isLoading} rows={20} input={
            slots.map((item, index) =>
            (
                <div key={index} class='border-b h-12  text-sm  w-max min-w-full inline-flex gap-3  hover:bg-gray-50 '   >
                    <div class='w-20 whitespace-nowrap p-3 sticky left-0 z-40 bg-white'>{convertTo12Hour(item.start)}</div>
                    {userList.map(a => (
                        <div key={a.id} class=' w-44  p-2'>
                            <Card id={a.id} startTime={item.start} />
                        </div>
                    ))}
                </div>
            ))}
        />

        </div>
    )
}

export default CalenderBody