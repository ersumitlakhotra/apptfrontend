import { Button, Select } from "antd";
import Heading from "../../../common/heading";
import {CarryOutFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";

const BookingDays = ({ companyList, saveData }) => {
    const [bookingdays, setBookingdays] = useState(0);


    useEffect(() => {
        if (companyList.length !== 0) {
            setBookingdays(companyList.bookingdays);
        }
    }, [companyList])

    const save = async () => {
        const Body = JSON.stringify({
            bookingdays: bookingdays,
        });
        saveData("Booking Horizons", "PUT", "company/bookingdays", null, Body,true,false);
    }
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={"Booking Horizons"} icon={<CarryOutFilled />} desc={`Appointment can be booked up to ${bookingdays} days in advance`} />
            <div class='ml-8 md:w-1/12'>
                <Select
                    value={bookingdays}
                    style={{ width: '100%' }}
                    onChange={(value) => setBookingdays(value)}
                    options={[
                        { value: 1, label: '1 day' },
                        { value: 2, label: '2 days' },
                        { value: 3, label: '3 days' },
                        { value: 4, label: '4 days' },
                        { value: 5, label: '5 days' },
                        { value: 7, label: '1 Week' },
                        { value: 14, label: '2 Weeks' },
                        { value: 21, label: '3 Weeks' },
                        { value: 28, label: '4 Weeks' },
                    ]}
                />
            </div>
            <div class='mx-6 flex justify-end '>
                <Button size='large' color="primary" variant="solid" onClick={save} >Save changes</Button>
            </div>

        </div>
    )
}
export default BookingDays;

