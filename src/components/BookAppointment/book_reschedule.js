
import { Button } from "antd";
import { CheckSquareFilled } from '@ant-design/icons';

const BookingOption = ({ bookingType, setBookingType, setCid, next }) => {

    const option = [
        { key: 1, label: 'Book an appointment', description: '' },
        { key: 2, label: 'Re-schedule an appointment', description: '' },
        { key: 3, label: 'Cancel an appointment', description: '' },
    ]

    return (
        <div class='flex flex-col font-normal gap-3 mt-2 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Choose an option</p>
            { option.map(item => (
                    <div key={item.key} class='w-full border rounded-md border-gray-200 p-4 flex flex-row justify-between items-center gap-2 shadow-md' >
                        <p class='text-sm font-medium text-gray-700'>{item.label}</p>
                        <div class='flex flex-row justify-center items-center w-20'>
                            {
                                item.key === bookingType ?
                                    <CheckSquareFilled style={{ color: 'green', fontSize: 24 }} /> :
                                    <Button color="default" variant="outlined" onClick={() => setBookingType(item.key)}> Select </Button>
                            }
                        </div>
                    </div>
                ))

            }
        </div>
    )
}

export default BookingOption