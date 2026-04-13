import Hours from "./hours.js";
import Deactivate from "./deactivate.js";
import BasicInfo from "./basicinfo.js";
import BookingDays from "./bookingdays.js";
import GmailSetup from "./gmailsetup.js";
import Loyalty from "./loyalty.js";

const Account = ({ companyList,loyaltyList, saveData, logoList}) => {  
    return (
        <div class='flex flex-col gap-8'>
            <BasicInfo companyList={companyList}  saveData={saveData} logoList={logoList} />
            <Hours companyList={companyList} saveData={saveData} />
            <BookingDays companyList={companyList} saveData={saveData} />
            <GmailSetup companyList={companyList} saveData={saveData} />     
            <Loyalty loyaltyList={loyaltyList} saveData={saveData} />  
            <Deactivate /> 
        </div>
    )

}

export default Account