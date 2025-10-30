
import {  TextboxFlexCol } from "../../common/textbox";
import { isValidEmail, setCellFormat } from "../../common/cellformat";
import { Input } from "antd";

const Details = ({ customerName, setCustomerName, customerPhone, setCustomerPhone,customerEmail, setCustomerEmail }) => {
    return (
        <div class='flex flex-col font-normal gap-4 w-full' >
            <p class='text-2xl font-sans font-bold mb-4'> Enter contact details</p>

              <TextboxFlexCol label={'Name'} mandatory={true} input={
                <Input placeholder="Enter your fullname here . ." size="large" status={customerName === '' ? 'error' : ''} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            } />

             <TextboxFlexCol label={'Cell #'} mandatory={true} input={
                <Input placeholder="Enter your 10 digit phone number . ." size="large" status={customerPhone === '' ? 'error' : ''} value={customerPhone} onChange={(e) => setCustomerPhone(setCellFormat(e.target.value))} />
            } />
   
            <TextboxFlexCol label={'E-mail'} mandatory={true} input={
                <Input placeholder="Enter your e-mail address . ." size="large" status={customerEmail === '' || !isValidEmail(customerEmail) ? 'error' : ''} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            } />
            
        </div>
    )
}

export default Details