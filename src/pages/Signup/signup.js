/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import {  Spin  } from 'antd';
import {  createAuth, createAdminUser } from "../../hook/apiCall.js";
import useAlert from "../../common/alert.js";
import { getPermission } from "../../common/cellformat.js";

export const Signup = () => {
  const [business_name, setBusinessName]= useState('');
  const [cell, setCell]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [loading, setLoading] = useState(false);
  const { contextHolder , success,error,warning} = useAlert();

const onSubmit = async() => {
  setLoading(true);
  
  try{
    const body= JSON.stringify( {
      name:business_name,
      email:email,
      cell:cell,
    }); 
    const res = await createAuth('POST','company',body);
    if(res.status === 201)
    {
      const cid =res.data.data.id;
      try{
        const userBody = JSON.stringify({
          fullname: business_name,
          cell: cell,
          email: email,
          gender: 'Male', 
          username: email,
          password: password,
          role: 'Administrator',
          rating: '5',
          permissioninfo: getPermission('Administrator'),
          status: 'Active', 
          accounttype: 'Basic'
        }); 
        const resUser = await createAdminUser('POST', 'user', userBody, cid); 
        if(resUser.status === 201)       
          success('Congratulation, your account has been successfully created.');       
        else        
          error(resUser.response.data.error)
      }catch(error){
          error(error.message)
      }
      
    }
    else
    {   
      if(String(res.response.data.error).toLocaleLowerCase().includes("duplicate key"))
        warning('An account with that information is already exists. Try again or create a new account with different details. ');
      else
       error(String(res.response.data.error))
    }
  }
  catch(err){
    error(String(err.message))
  }
  finally{
    setLoading(false);
  }
}

  const setCellFormat = (cellValue) => {
    let phoneNumber = cellValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (phoneNumber.length > 3) {
        phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
    }
    if (phoneNumber.length > 7) {
        phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
    }
    if (phoneNumber.length < 13)
    setCell(phoneNumber);
  }
  
  return (
    
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          {process.env.REACT_APP_PROJECT_NAME} 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up
              </h1>
                <p class="block mb-2 text-sm font-small text-gray-700 dark:text-white">
                   Create an account to start managing your appointments and build your remote team.                 
                </p>
              <form class="space-y-4 md:space-y-6" action={onSubmit}>
                  <div>
                      <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business name <span class='text-red-500'>*</span></label>
                      <input type="text" name="company" id="company" value={business_name}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="Business Name" required onChange={(e) => setBusinessName(e.target.value)} />
                  </div>
                  <div>
                      <label for="cell" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cell number <span class='text-red-500'>*</span></label>
                      <input type="tel" name="cell" id="cell"  value={cell}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="(111)-222-3333" required onChange={(e) => setCellFormat(e.target.value)} />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span class='text-red-500'>*</span></label>
                      <input type="email" name="email" id="email"  value={email}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span class='text-red-500'>*</span></label>
                      <input type="password" name="password" id="password" placeholder="••••••••"  value={password}
                             class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                             required onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                            </p>
                          </div>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  
              </form>
              <p class="block mb-2 text-center text-xs font-small text-gray-500 dark:text-white">
                   By signing up to create an account, you are accepting our terms of service and privacy policy
                </p>
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


export default Signup;