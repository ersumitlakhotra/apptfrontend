import axios from 'axios';
import { LocalDate } from '../common/localDate';

//const API_ENDPOINT = "http://localhost:3000/api/";
const API_ENDPOINT = "https://volmz5lsitlia26lmzkjjt537m0umece.lambda-url.ca-central-1.on.aws/api/";

export const apiCalls = async (method, endPoint, id = null, body = null, eventDate = false) => {
    const companyId = localStorage.getItem('cid'); 
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}/${companyId}` + (id != null ? `/${id}` : '') + (eventDate ? `/'${LocalDate()}'` : ''),
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

export const loginAuth = async (username,password) => {
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
export const createCompany = async (method, endPoint, body) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}`,
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
export const createAdminUser = async (method, endPoint, body, companyId) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}/${companyId}`,
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
};
export const getCompanyViaStore = async (method, endPoint, store) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}/${store}`,
        headers: {
            'content-Type': 'application/json'
        },
        data: []
    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};
export const apiCallsViaBooking = async (method, endPoint, companyId, body = [], id = null, date = null, eventDate = false ) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}/${companyId}` + (id != null ? `/${id}` : '') + (date != null ? `/${date}` : '')+ (eventDate ? `/'${LocalDate()}'` : ''),
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
export const apiCallWithoutCid = async (method, endPoint, body = [] ) => {
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}`,
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



