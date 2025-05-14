import { useState, useEffect } from "react";
import axios from 'axios';

const useApi = (method, endPoint) => {
const [data, setData] = useState([]);
const [isLoading, setIsLoading]= useState(false);
const [error, setError] = useState(null);

const options = {
method:method,
url:`http://localhost:3000/api/${endPoint}`
};

const fetchApi = async () => {
    setIsLoading(true);

    try {
        const response = await axios.request(options);
        setData(response);
        setIsLoading(false);
    } catch (error) {
        setError(error);
    }finally{
        setIsLoading(false);
    }

}

useEffect(() => {
    fetchApi();
},[])

const refetchApi = () => {
    setIsLoading(true);
    fetchApi();
}

return {data,isLoading,error,refetchApi}
}

export default useApi;

