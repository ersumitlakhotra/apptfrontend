
import { TextboxFlex } from "../../common/textbox";
import { isValidEmail, setCellFormat } from "../../common/cellformat";
import { Input } from "antd";

const Details = ({ customerName, setCustomerName, customerPhone, setCustomerPhone,customerEmail, setCustomerEmail }) => {
    return (
        <div class='flex flex-col font-normal gap-3 mt-2 w-full md:w-1/4' >
            <p class="text-gray-400 mb-4">Customer Detail</p>

            <TextboxFlex label={'Name'} mandatory={true} input={
                <Input placeholder="Name" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

            <TextboxFlex label={'Cell #'} mandatory={true} input={
                <Input placeholder="111-222-3333" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />
            
            <TextboxFlex label={'E-mail'} mandatory={true} input={
                <Input placeholder="abcd@company.com" status={customerEmail === '' && isValidEmail(customerEmail) ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            } />


            
        </div>
    )
}

export default Details