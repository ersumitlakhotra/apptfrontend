import { getStorage } from "../common/localStorage";
import { apiCalls } from "./apiCall";

const FetchData = async ({method,endPoint,id=null,body=null,eventDate})  => {
    const localStorage =await getStorage();
   try {
        const res = await apiCalls(method, endPoint, localStorage.cid, id, body, eventDate);
        return {data :res.data.data, status:res.status }      
      }
      catch (e) {
         return {data :[] , status:500}
        //error(error.message)
      }
      
}
export default FetchData;
