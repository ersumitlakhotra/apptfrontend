import Hours from "./hours.js";
import Deactivate from "./deactivate.js";
import BasicInfo from "./basicinfo.js";
import BookingDays from "./bookingdays.js";
import GmailSetup from "./gmailsetup.js";

const Account = ({ companyList, saveData, logoList, setRefresh,onSetSignout }) => {  
    return (
        <div class='flex flex-col gap-8'>
            <BasicInfo companyList={companyList} saveData={saveData} logoList={logoList} />
            <Hours companyList={companyList} saveData={saveData} setRefresh={setRefresh} />
            <BookingDays companyList={companyList} saveData={saveData} />
            <GmailSetup companyList={companyList} saveData={saveData} />   
            <Deactivate onSetSignout={onSetSignout} /> 
        </div>
    )

}

export default Account