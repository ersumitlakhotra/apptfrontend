
import { Button, Col, Row } from 'antd';
const Slots = ({ inTime, outTime, orderListSlot,slot, setSlot }) => {
    const slots = generateTimeSlots(inTime, outTime, 30,orderListSlot);

    return (
        <Row key={new Date()} gutter={[16, 16]}>
            {slots.map(item => (
                <Col className="gutter-row" span={8}>                      
                    <Button color={slot === item.id ? 'primary' : 'default'} 
                        variant="outlined" 
                        disabled={item.disabled} 
                        onClick={() =>  setSlot(item.id) }>

                        {item.id}
                    </Button>
                </Col>
            ))}

        </Row>

    )
}

const generateTimeSlots = (startHour, endHour, intervalMinutes, orderListSlot) => {
    const slots = [];
    let currentTime = new Date();
    let startHourSplit = startHour.split(':')
    if (Number(startHourSplit[1]) > 0 && Number(startHourSplit[1]) < 30 )
        startHourSplit[1]='30';
    else if (Number(startHourSplit[1]) > 30 && Number(startHourSplit[1]) < 60)
    {
        startHourSplit[0] = Number(startHourSplit[0]) + 1;
        startHourSplit[1] = '00';
    }

    currentTime.setHours(startHourSplit[0], startHourSplit[1],0,0); // Set to start of the day

    const endTime = new Date();
    const endHourSplit = endHour.split(':')
    endTime.setHours(endHourSplit[0], endHourSplit[1],0,0);

    while (currentTime < endTime) {
        const slotTime = currentTime;

        slots.push({
            id: `${slotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
            startTime: slotTime,
            disabled: orderListSlot.some(item => item.slot === `${slotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)
        });

        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }
    return slots;
};

export default Slots;