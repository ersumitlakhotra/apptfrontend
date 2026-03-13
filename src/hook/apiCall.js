import axios from 'axios';
import { LocalDate } from '../common/localDate';
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@aws-sdk/protocol-http";

//const API_ENDPOINT = "http://localhost:3000/api/";
const PRODUCTION =true
const API_ENDPOINT =PRODUCTION ? "https://volmz5lsitlia26lmzkjjt537m0umece.lambda-url.ca-central-1.on.aws/api/" :"http://localhost:3000/api/";

const signer = new SignatureV4({
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey:  process.env.REACT_APP_AWS_SECRET_KEY,
    },
    region: "ca-central-1", // change if needed
    service: "lambda", 
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




