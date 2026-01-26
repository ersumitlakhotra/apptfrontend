
import { getStorage } from "../common/localStorage";
import { apiCalls } from "./apiCall";

const SaveData = async ({label,method,endPoint,id = null, body = null, logs = true, email = false})  => {
    const localStorage =await getStorage();
   try {
        const res = await apiCalls(method, endPoint, localStorage.cid, id, body);
        const message = res.status === 201 ? `The ${label} has been Created successfully.` : 
                        res.status === 200 ? `The ${label} has been Modified successfully.` : res.message;

        return {
            status:res.status, 
            message:message,
            isSuccess:res.status === 201 ||res.status === 200 ,
            data : res.data.data 
        }      
      }
      catch (e) {
         return {
            status:500, 
            message:'There is some issue while processing the request',
            isSuccess:false,
            data : [] }
      }
      
}
export default SaveData;

