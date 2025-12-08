/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import useAlert from "../../common/alert.js";
import { Spin } from 'antd';
import {  userLoginAuth } from "../../hook/apiCall.js";
import { useNavigate } from "react-router-dom";
import { setLocalStorageWithExpiry } from "../../common/localStorage.js";
import { setCellFormat } from "../../common/cellformat.js";


export const AppLogin = ({ logo }) => {
    const navigate = useNavigate();
    const [cell, setCell] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { contextHolder, error } = useAlert();

    useEffect(() => {
        localStorage.removeItem('compid');
        localStorage.removeItem('userid');
    }, []);

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await userLoginAuth(cell, password);
            if (res.status === 200) {
                if (res.data.data.length === 1)
                {                         
                    setLocalStorageWithExpiry('compid', res.data.data.cid);
                    setLocalStorageWithExpiry('userid', res.data.data.id);
                    // setLocalStorageWithExpiry('password', password, 720);
                    navigate("/home"); //success('Login Successfully');   
                }
                else if (res.data.data.length > 1)
                    error('You cant use the same password for all of your login IDs; either update the password for the most recent one or declare the others as inactive.')
                else
                    error('Login Failed. Invalid username or password.')           
            }
            else
                error('Login Failed. Invalid username or password.')
        }
        catch (err) {
            error(String(err.message))
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-10 h-8 mr-2" src={logo} alt="logo" />
                    {process.env.REACT_APP_PROJECT_NAME}
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <div>
                            <label for="cell" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cell # <span class='text-red-500'>*</span></label>
                            <input type="tel" name="cell" id="cell" value={cell}
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="(111)-222-3333" required onChange={(e) => setCell(setCellFormat(e.target.value))} />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span class='text-red-500'>*</span></label>
                            <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} value={password}
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>                      
                        <button type="submit" onClick={() => onSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        
                    </div>
                </div>
            </div>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999, // Ensure it's on top
                    }}
                >
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            )}
            {contextHolder}
        </section>
    );
};


export default AppLogin;