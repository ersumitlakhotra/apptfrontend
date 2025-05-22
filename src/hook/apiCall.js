import axios from 'axios';

const API_ENDPOINT='http://localhost:3000/api/';

export const apiCalls =async (method ,endPoint, id = null, body = null) => {
    const options = { 
        method:method , 
        url:API_ENDPOINT+`${endPoint}`+ (id !=null ? `/${id}` :''),
        headers:{
            'content-Type':'application/json'
        },
        data:body
    };
    try {
       return await axios.request(options);
    } catch (error) {
        return error;
    } 
    // api calls
};




