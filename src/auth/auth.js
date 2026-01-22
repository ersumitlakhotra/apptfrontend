import { setLocalStorageWithExpiry } from "../common/localStorage";
import { loginAuth } from "../hook/apiCall";

export const isAuthenticated = async() => {
  if (localStorage.getItem('cid') === null || !localStorage.getItem('cid'))
    return false;
  else
  {
    let isValid=false;
    const now = new Date();
    const itemString = localStorage.getItem('username');
    if (itemString) {
      const item = JSON.parse(itemString);
      if (now.getTime() > item.expiry) {
        const username = JSON.parse(localStorage.getItem('username')).value;
        const password = JSON.parse(localStorage.getItem('password')).value;
        clearLocalStorage();
        const result = await handleAuth(username, password);
        isValid =result.status === 200;
      }
      else
        isValid = true;
    }
    return isValid;
  } 
};


export const handleAuth = async (username,password) => {
    try {
      const res = await loginAuth(username, password);
      if (res.status === 200 && res.data.data.length === 1) {
        if (Boolean(res.data.data[0].active)) {
          setLocalStorageWithExpiry('cid', res.data.data[0].cid);
          setLocalStorageWithExpiry('uid', res.data.data[0].id);
          setLocalStorageWithExpiry('role', res.data.data[0].role);
          setLocalStorageWithExpiry('username', username, 60);
          setLocalStorageWithExpiry('password', password, 60); 
          return { status: res.status, data: res.data.data[0], message: 'Login Successful'};       
        }
        else
          return { status: 404, data: null, message: 'Your account is deactivated and cannot access the application. Please contact our help desk!' };
      }
      else if(res.data.data.length > 1)
        return { status: 404, data: null, message: 'The username is allocated to a separate potal. Ensure that each account has a unique password.' };
      else
        return { status: 404, data: null, message: 'Login Failed. Invalid username or password.' };
    }
    catch (err) {
      return { status: 500, data: null, message: String(err.message) };
    }
  }

export const clearLocalStorage = () => {
  localStorage.removeItem('cid');
  localStorage.removeItem('uid');
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('role');
}
