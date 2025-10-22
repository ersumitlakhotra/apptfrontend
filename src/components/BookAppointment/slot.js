import { Button, DatePicker, Popover, Select } from 'antd';
import dayjs from 'dayjs';
import { TextboxFlex } from '../../common/textbox';
import { useEffect, useState } from 'react';
import { generateTimeSlots } from '../../common/intervals';

const Slot = ({ trndate, setTrnDate, orderList, setOrderList, assigned_to }) => {

    const [availableSlot, setAvailableSlot] = useState([]);

    const [slot, setSlot] = useState('');
    useEffect(() => {
        let orderListSlot = [];
        if (trndate !== '' && assigned_to !== '') {
            orderListSlot = (orderList.filter(a => (a.trndate.includes(trndate) && a.assignedto === assigned_to)));
        }
        //setAvailableSlot(generateTimeSlots(inTime, outTime, slotGap, orderListSlot, slot));
        
    }, [trndate])

    return (
        <div>
            <Popover placement="bottom" title={"Select Booking Date"} content={
                <div>
                    <DatePicker
                        style={{ width: '100%' }}
                        value={trndate === '' ? trndate : dayjs(trndate, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => setTrnDate(dateString)} />
                </div>
            }>
                <Button className="text-xs"><span class='font-medium'>Booking Date :  </span><span class='text-blue-500'> {trndate}  </span></Button>
            </Popover>

            <TextboxFlex label={'Slot'} mandatory={true} input={
                <Select
                    value={slot}
                    style={{ width: '100%' }}
                    onChange={(value) => setSlot(value)}
                    options={availableSlot.map(item => ({ value: item.id, label: item.id }))}
                />
            } />
        </div>
    )
}

export default Slot