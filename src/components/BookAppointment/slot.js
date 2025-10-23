/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, DatePicker, Popover, Row,Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { generateTimeSlots } from '../../common/intervals';

const Slot = ({ allCompany, cid, trndate, setTrnDate, orderList, assigned_to, next, slot, setSlot }) => {

    const [availableSlot, setAvailableSlot] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

       useEffect(() => {
           if (cid !== 0) {
               let selectedCompany = allCompany.filter(a => a.id === cid);
               if (selectedCompany[0].timinginfo !== null) {
                   if (trndate !== '') {
                       const dayOfWeekNumber = dayjs(trndate).get('day');
                       const dayName = weekdays[dayOfWeekNumber];
                       setOpeningHours(dayName, selectedCompany[0], selectedCompany[0].slot);
                   }
               }          
           }
       }, [cid, trndate])

    const setOpeningHours = (weekday, companyList, slotGap) => {
        let inTime = '00:00:00';
        let outTime ='00:00:00';
        let isOpen = false;
        switch (weekday.toLowerCase()) {
            case 'sunday':
                {
                    inTime = companyList.timinginfo[0].sunday[0]; outTime = companyList.timinginfo[0].sunday[1]; isOpen=companyList.timinginfo[0].sunday[2];
                    break;
                }
            case 'monday':
                {
                    inTime = companyList.timinginfo[0].monday[0]; outTime = companyList.timinginfo[0].monday[1]; isOpen = companyList.timinginfo[0].monday[2];
                    break;
                }
            case 'tuesday':
                {
                    inTime = companyList.timinginfo[0].tuesday[0]; outTime = companyList.timinginfo[0].tuesday[1]; isOpen = companyList.timinginfo[0].tuesday[2];
                    break;
                }
            case 'wednesday':
                {
                    inTime = companyList.timinginfo[0].wednesday[0]; outTime = companyList.timinginfo[0].wednesday[1]; isOpen = companyList.timinginfo[0].wednesday[2];
                    break;
                }
            case 'thursday':
                {
                    inTime = companyList.timinginfo[0].thursday[0]; outTime = companyList.timinginfo[0].thursday[1]; isOpen = companyList.timinginfo[0].thursday[2];
                    break;
                }
            case 'friday':
                {
                    inTime = companyList.timinginfo[0].friday[0]; outTime = companyList.timinginfo[0].friday[1]; isOpen = companyList.timinginfo[0].friday[2];
                    break;
                }
            case 'saturday':
                {
                    inTime = companyList.timinginfo[0].saturday[0]; outTime = companyList.timinginfo[0].saturday[1]; isOpen = companyList.timinginfo[0].saturday[2];
                    break;
                }
            default:
                {
                    inTime = '00:00:00'; outTime = '00:00:00'; isOpen = false;
                    break;
                }

        }
        let orderListSlot = [];
        orderListSlot = (orderList.filter(a => (a.trndate.includes(trndate) && a.assignedto === assigned_to)));
        setIsOpen(isOpen);
        if (isOpen)
            setAvailableSlot(generateTimeSlots(inTime, outTime, slotGap, orderListSlot, slot));
        else {
            setAvailableSlot([]);
        }
    }
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

            <div class='w-full md:w-1/4 mt-2 py-4 px-2'>
                {isOpen ?
                    <>
                        <p class='mb-4'> Available Slots</p>
                        <Row key={new Date()} gutter={[0, 16]} >
                            {availableSlot.map(item => (
                                <Col className="gutter-row" span={8}>
                                    <Button color={slot === item.id ? 'primary' : 'default'}
                                        variant="outlined"
                                        disabled={item.disabled}
                                        onClick={() => {setSlot(item.id);  next();} }>

                                        {item.id}
                                    </Button>
                                </Col>
                            ))}

                        </Row>
                    </>
                    :
                    <Tag color='red'>Business is closed . Please book an appointment for another day!</Tag>
                }
            </div>
        </div>
    )
}

export default Slot