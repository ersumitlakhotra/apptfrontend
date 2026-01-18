import { setLocalStorageWithExpiry } from "../common/localStorage";
import { loginAuth } from "../hook/apiCall";

export const isAuthenticated = async() => {
  if (localStorage.getItem('cid') === null || !localStorage.getItem('cid'))
    return false;
  else
  {
    let isValid=false;
    const now = new Date();
    const itemString = localStorage.getItem('email');
    if (itemString) {
      const item = JSON.parse(itemString);
      if (now.getTime() > item.expiry) {
        const email = JSON.parse(localStorage.getItem('email')).value;
        const password = JSON.parse(localStorage.getItem('password')).value;
        clearLocalStorage();
        const result = await handleAuth(email, password);
        isValid =result.status === 200;
      }
      else
        isValid = true;
    }
    return isValid;
  } 
};


export const handleAuth = async (email,password) => {
    try {
      const res = await loginAuth(email, password);
      if (res.status === 200 && res.data.data.length === 1) {
        if (Boolean(res.data.data[0].active)) {
          setLocalStorageWithExpiry('cid', res.data.data[0].cid);
          setLocalStorageWithExpiry('uid', res.data.data[0].id);
          setLocalStorageWithExpiry('email', email, 60);
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
  localStorage.removeItem('email');
  localStorage.removeItem('password');
}
