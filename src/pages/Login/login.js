/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import useAlert from "../../common/alert.js";
import { Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, handleAuth } from "../../auth/auth.js";
import { useAuth } from "../../auth/authContext.js";

export const Login = ({ logo }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { contextHolder, error } = useAlert();
  const { login } = useAuth();

  useEffect(() => {
    clearLocalStorage();
  }, [])
   
  {/*const onSubmit = async () => {
    setLoading(true);
    const res = await handleAuth(username, password);
    if (res.status === 200) {
      navigate("/main"); //success('Login Successfully'); 
    }
    else
      error(res.message);
    setLoading(false);
  }*/}

  const onSubmit = async () => {
    setLoading(true);
    const res = await login(username, password);
    if (res.status) {
      navigate("/home"); //success('Login Successfully'); 
      
    }
    else
      error(res.message);

    setLoading(false);
  }


  return (
    <div class="bg-gray-50 h-screen py-4">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img class="w-20 h-20 mb-2" src={logo} alt="logo" />
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
              <div>
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email or Cell #</label>
              <input type="text" name="text" id="text" onChange={(e) => setUsername(e.target.value)} value={username}
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com" required />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} value={password}
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="/resetpassword" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" onClick={() => onSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <div>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Feel free to  <a href="/support" target="_blank" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Contact us</a>
              </p>
            </div>
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
    </div>
  );
};


export default Login;