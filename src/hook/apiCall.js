import axios from 'axios';
import { LocalDate } from '../common/localDate';

const API_ENDPOINT ="http://ec2-3-97-8-159.ca-central-1.compute.amazonaws.com:3000/api/";

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




