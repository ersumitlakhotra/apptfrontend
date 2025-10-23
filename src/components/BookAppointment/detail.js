
import { TextboxFlex } from "../../common/textbox";
import { setCellFormat } from "../../common/cellformat";
import { Input } from "antd";

const Details = ({ customerName, setCustomerName, customerPhone, setCustomerPhone }) => {
    return (
        <div class='flex flex-col font-normal gap-3 mt-2 w-full md:w-1/4' >
            <p class="text-gray-400 mb-4">Customer Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />
        </div>
    )
}

export default Details