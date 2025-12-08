import axios from 'axios';
import { LocalDate } from '../common/localDate';

//const API_ENDPOINT = "http://localhost:3000/api/";
const API_ENDPOINT = "https://volmz5lsitlia26lmzkjjt537m0umece.lambda-url.ca-central-1.on.aws/api/";

export const apiCalls = async (method, endPoint,companyId = null, id = null, body = null, eventDate = false,date = null) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}`+(companyId != null ? `/${companyId}` : '') + (id != null ? `/${id}` : '') + (eventDate ? `/'${LocalDate()}'` : ''),
        headers: {
            'content-Type': 'application/json'        
        },
        data: body
    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};

export const loginAuth = async (username, password) => {
    const options = {
        method: "GET",
        url: API_ENDPOINT + `user/auth/${username}/${password}`,
        headers: {
            'content-Type': 'application/json'
        },
    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};

export const userLoginAuth = async ( username, password) => {
    const options = {
        method: "GET",
        url: API_ENDPOINT + `userLogin/auth/${username}/${password}`,
        headers: {
            'content-Type': 'application/json'
        },
    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};



