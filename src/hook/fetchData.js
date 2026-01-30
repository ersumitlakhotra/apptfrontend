import { getStorage } from "../common/localStorage";
import { apiCalls } from "./apiCall";

const FetchData = async ({ method, endPoint, id = null, body = null, eventDate, cid = null }) => {
  const localStorage = await getStorage();
  try {
    const res = await apiCalls(method, endPoint, (cid === null ? localStorage.cid : cid), id, body, eventDate);
    return { data: res.data.data, status: res.status }
  }
  catch (e) {
    return { data: [], status: 500 }
    //error(error.message)
  }

}
export default FetchData;
