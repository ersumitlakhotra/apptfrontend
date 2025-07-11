import Hours from "./hours.js";
import Deactivate from "./deactivate.js";
import BasicInfo from "./basicinfo.js";

const Account = ({ companyList, saveData, logoList, setRefresh }) => {  
    return (
        <div class='flex flex-col gap-8'>
            <BasicInfo companyList={companyList} saveData={saveData} logoList={logoList} />
            <Hours companyList={companyList}  saveData={saveData} setRefresh={setRefresh} />     
            <Deactivate/> 
        </div>
    )

}

export default Account