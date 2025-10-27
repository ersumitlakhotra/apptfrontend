/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import useAlert from "../../common/alert";
import { apiCallWithoutCid } from "../../hook/apiCall";

export const ResetPassword = ({logo}) => {
const { contextHolder, success, error, warning } = useAlert();
const [email, setEmail] = useState('');
const [code, setCode] = useState('');


const onSubmit = async () => {
    const min = 100000;
    const max = 999999;
    const newCode = Math.floor(Math.random() * (max - min + 1)) + min;
    setCode(newCode.toString()); // Convert to string for display
    try {
      const body = JSON.stringify({
        email: email,
        code: newCode.toString(),
      });

      const res = await apiCallWithoutCid('POST', 'verification', body);
      if (res.status === 201) 
      {
         console.log(newCode.toString())     

      }
      else {
          error(String(res.message))
      }
    }
    catch (err) {
      error(String(err.message))
    }
  }

  return (
  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-10 h-8 mr-2" src={logo} alt="logo"/>
          {process.env.REACT_APP_PROJECT_NAME}     
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password
              </h1>
              <p class="block mb-2 text-sm font-small text-gray-700 dark:text-white">
                   Please enter the admin email address and we'll send you a verification code to reset your password.                
                </p>
              <form class="space-y-4 md:space-y-6" action={onSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
                      <input type="email" name="email" id="email" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
                  </div>                 
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Request verification code</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  {contextHolder}
</section>
  );
};


export default ResetPassword;