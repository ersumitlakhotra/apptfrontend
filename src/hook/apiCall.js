import axios from 'axios';
import { LocalDate } from '../common/localDate';
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@aws-sdk/protocol-http";

const PRODUCTION =true 
const API_ENDPOINT = PRODUCTION ? process.env.REACT_APP_ENDPOINT : process.env.REACT_APP_ENDPOINT_LOCAL;
const AWS_ACCESS_KEY= process.env.REACT_APP_AWS_ACCESS_KEY
const AWS_SECRET_KEY= process.env.REACT_APP_AWS_SECRET_KEY
const AWS_REGION=process.env.REACT_APP_AWS_REGION
const AWS_SERVICE=process.env.REACT_APP_AWS_SERVICE

const signer = new SignatureV4({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey:AWS_SECRET_KEY,
    },
    region:AWS_REGION, // change if needed
    service: AWS_SERVICE, 
    sha256: Sha256,
});

const aws_auth_headers = async (url, method, body) => {
    const endpoint = new URL(url);

    const request = new HttpRequest({
        method: method,
        protocol: endpoint.protocol,
        hostname: endpoint.hostname,
        path: endpoint.pathname + endpoint.search,
        headers: {
            "Content-Type": "application/json",
            host: endpoint.hostname,
        },
        body: body || undefined,
    });
    const signedRequest = await signer.sign(request);
    delete signedRequest.headers.host;

    return signedRequest.headers;
}

export const apiCalls = async (method, endPoint,companyId = null, id = null, body = null, eventDate = false) => {
    const url = API_ENDPOINT + `${endPoint}` + (companyId != null ? `/${companyId}` : '') + (id != null ? `/${id}` : '') + (eventDate ? `/${LocalDate()}` : '');
    const options = {
        method: method,
        url: url,
        headers: PRODUCTION ? await aws_auth_headers(url,method,body):{'content-Type': 'application/json' },
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
    const url = API_ENDPOINT + `user/auth/${username}/${password}`;
    const options = {
        method: "GET",
        url: url,
        headers: PRODUCTION ? await aws_auth_headers(url, "GET", '') : { 'content-Type': 'application/json' },
        data:null

    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};

export const userLoginAuth = async (username, password) => {
    const url =API_ENDPOINT + `userLogin/auth/${username}/${password}`;
    const options = {
        method: "GET",
        url: url,
        headers: PRODUCTION ? await aws_auth_headers(url, "GET", '') : { 'content-Type': 'application/json' },
        data:null
    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};
export const connectToGoogle = async () => {
    const url = API_ENDPOINT + `google/auth`;
    const options = {
        method: "GET",
        url: url,
        headers: PRODUCTION ? await aws_auth_headers(url, "GET", '') : {},
        //{ 'content-Type': 'application/json' },
        data: null

    };
    try {
        return await axios.request(options);
    } catch (error) {
        return error;
    }
    // api calls
};




