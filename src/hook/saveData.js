
import { getStorage } from "../common/localStorage";
import { apiCalls } from "./apiCall";

const SaveData = async ({ label, method, endPoint, id = null, body = null, logs = true,cid=null }) => {
    const localStorage = await getStorage();
    try {
        const res = await apiCalls(method, endPoint, cid === null ? localStorage.cid : cid , id, body);
        const message = res.status === 201 ? `The ${label} has been Created successfully.` :
            res.status === 200 ? `The ${label} has been Modified successfully.` :
                res.status === 203 ? `The ${label} has been Deleted successfully.` :
                    res.status === 204 ? `The ${label} has been Cancelled.` :
                        res.status === 205 ? `The ${label} has been Rejected.` :
                            res.status === 206 ? `The ${label} has been Confirmed.` : res.message;

        return {
            status: res.status,
            message: message,
            isSuccess: res.status === 201 || res.status === 200 || res.status === 203 || res.status === 204 || res.status === 205 || res.status === 206,
            data: res.data.data
        }
    }
    catch (e) {
        return {
            status: 500,
            message: 'There is some issue while processing the request',
            isSuccess: false,
            data: []
        }
    }

}
export default SaveData;

