
import {jwtDecode} from "jwt-decode";

export const getStorage = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(localStorage.getItem("token"));
        return {
            cid: decoded.cid,
            uid: decoded.uid,
            isAdmin: Boolean(decoded.isAdmin)
        }
    }
    else
        return {cid:null,uid:null,isAdmin:false}
};