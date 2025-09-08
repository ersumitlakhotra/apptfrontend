import axios from 'axios';
import { LocalDate } from '../common/localDate';

const API_ENDPOINT="http://localhost:3000/api/";

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
export const apiCallsCrateCompany = async (method, endPoint, id = null, body = null, cidSpecified = true, cidValue = null) => {
    const companyId = localStorage.getItem('cid');
    const options = {
        method: method,
        url: API_ENDPOINT + `${endPoint}` + (cidSpecified ? (cidValue != null ? `/${cidValue}` : `/${companyId}`) : '') + (id != null ? `/${id}` : ''),
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




